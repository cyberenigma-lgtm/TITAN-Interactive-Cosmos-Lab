/**
 * TITAN PLANETARIUM MODULE
 * Lógica matemática para Street View del Cielo y Posicionamiento Global.
 */

window.Planetarium = {
    // Diccionario social de ubicaciones
    locations: [
        { name: "Sede Central TITAN (Berriosuso, Navarra)", lat: 42.858111, lon: -1.686611 }, // Tu ubicación!
        { name: "Pamplona, España", lat: 42.81687, lon: -1.64323 },
        { name: "Galicia (Santiago), España", lat: 42.8782, lon: -8.5448 },
        { name: "Madrid, España", lat: 40.4168, lon: -3.7038 },
        { name: "Amigo (Calle la Rioja, Valdemoro)", lat: 40.188521, lon: -3.685902 },
        { name: "Buenos Aires, Argentina", lat: -34.6037, lon: -58.3816 },
        { name: "CDMX, México", lat: 19.4326, lon: -99.1332 },
        { name: "Tokio, Japón", lat: 35.6762, lon: 139.6503 }
    ],

    active: false,
    cameraCache: null,
    controlsCache: null,
    
    // Variables para mirar alrededor con el ratón
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    lon: 0,
    lat: 0,

    initUI: function() {
        const container = document.createElement('div');
        container.id = 'planetarium-ui';
        container.className = 'glass-card panel-draggable lab-panel';
        container.style.position = 'absolute';
        container.style.top = '140px';
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';
        container.style.width = '350px';
        container.style.zIndex = '150';
        container.style.padding = '15px';
        container.style.display = 'none';

        let html = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0, 255, 204, 0.4); padding-bottom:10px; margin-bottom:12px;">
                <h3 class="drag-handle" style="color:#00ffcc; font-family:'Outfit', sans-serif; margin:0; font-size:14px; text-transform:uppercase; letter-spacing:1px;">🌍 STREET VIEW DEL CIELO</h3>
                <button id="btn-close-planetarium" style="background:none; border:none; color:#00ffcc; font-size:18px; cursor:pointer; transition:transform 0.2s;">✕</button>
            </div>
            <div style="font-size:11px; color:#aaa; margin-bottom:10px;">Selecciona una ubicación para aterrizar y ver el cielo real.</div>
            <select id="planetarium-select" style="width:100%; background:rgba(0,0,0,0.5); border:1px solid #4cc9f0; color:#fff; padding:6px; margin-bottom:10px; font-family:'Outfit', sans-serif;">
                <option value="-1">-- Selecciona un Destino --</option>
        `;

        this.locations.forEach((loc, idx) => {
            html += `<option value="${idx}">${loc.name}</option>`;
        });

        html += `
            </select>
            <button id="btn-land-surface" style="width:100%; background:rgba(0,255,204,0.15); border:1px solid #00ffcc; color:#00ffcc; padding:10px; font-weight:bold; cursor:pointer; font-family:'Outfit', sans-serif; border-radius:6px; margin-bottom:10px; transition:all 0.3s ease; box-shadow: 0 0 10px rgba(0,255,204,0.2);">
                🚀 ATERRIZAR EN LA SUPERFICIE
            </button>
            <button id="btn-leave-surface" style="display:none; width:100%; background:rgba(255,51,102,0.15); border:1px solid #ff3366; color:#ff3366; padding:10px; font-weight:bold; cursor:pointer; font-family:'Outfit', sans-serif; border-radius:6px; margin-top:10px; transition:all 0.3s ease; box-shadow: 0 0 10px rgba(255,51,102,0.2);">
                🛰️ VOLVER A ÓRBITA (SALIR)
            </button>
            <div id="planetarium-info" style="margin-top:12px; font-size:11px; color:#00ffcc; font-family:monospace; white-space:pre-wrap; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;"></div>
        `;

        container.innerHTML = html;
        document.body.appendChild(container);

        document.getElementById('btn-close-planetarium').addEventListener('click', () => {
            container.style.display = 'none';
        });

        document.getElementById('btn-land-surface').addEventListener('click', () => this.landOnSurface());
        document.getElementById('btn-leave-surface').addEventListener('click', () => this.leaveSurface());
        
        // Manejo de cámara local (Mouselook)
        document.addEventListener('mousedown', (e) => {
            if (this.active && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SELECT') {
                this.isDragging = true;
            }
        });
        document.addEventListener('mouseup', () => { this.isDragging = false; });
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    },

    togglePanel: function() {
        const p = document.getElementById('planetarium-ui');
        if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';
    },

    landOnSurface: function() {
        const select = document.getElementById('planetarium-select');
        const idx = parseInt(select.value);
        if (idx === -1) return;

        const loc = this.locations[idx];
        const earthObj = planets.find(p => p.data && p.data.name === "Tierra");
        
        if (!earthObj || !earthObj.mesh) {
            if(typeof logTitan !== 'undefined') logTitan("[PLANETARIUM ERROR] No se encontró el objeto Tierra.");
            return;
        }

        // Cachear estado anterior
        if (!this.active) {
            this.cameraCache = {
                parent: camera.parent,
                position: camera.position.clone(),
                rotation: camera.rotation.clone()
            };
            if (typeof controls !== 'undefined') {
                this.controlsCache = controls.enabled;
                controls.enabled = false;
            }
        }

        this.active = true;
        document.getElementById('btn-land-surface').style.display = 'none';
        document.getElementById('btn-leave-surface').style.display = 'block';

        const info = document.getElementById('planetarium-info');
        info.innerHTML = `LAT: ${loc.lat}° | LON: ${loc.lon}°<br>Geolocalizando...`;

        // Reverse Geocoding para obtener la calle y población
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${loc.lat}&lon=${loc.lon}&zoom=18&addressdetails=1`)
            .then(res => res.json())
            .then(data => {
                const address = data.address || {};
                const street = address.road || address.pedestrian || "Calle desconocida";
                const city = address.city || address.town || address.village || address.municipality || "Población desconocida";
                info.innerHTML = `LAT: ${loc.lat}° | LON: ${loc.lon}°<br><span style="color:#00ffcc">📍 ${street}, ${city}</span><br>Calculando bóveda celeste...`;
            })
            .catch(e => {
                info.innerHTML = `LAT: ${loc.lat}° | LON: ${loc.lon}°<br>Calculando bóveda celeste...`;
            });

        // 2. Calcular posición en la superficie de la esfera
        const earthRadius = earthObj.data.radius || 4.5;
        const radius = earthRadius * 1.005; // Ligeramente por encima de la superficie para evitar clipping
        
        // Conversión Esférica -> Cartesiana (Alineado con mapa UV estándar de ThreeJS)
        const phi = (90 - loc.lat) * (Math.PI / 180);
        const theta = (loc.lon + 90) * (Math.PI / 180);

        camera.position.x = radius * Math.sin(phi) * Math.cos(theta);
        camera.position.y = radius * Math.cos(phi);
        camera.position.z = radius * Math.sin(phi) * Math.sin(theta);

        // Crear una máscara de horizonte (suelo oscuro) anclada a la cámara
        if (!this.horizonMask) {
            // Plano gigante que actúa como suelo opaco (horizonte)
            const hGeo = new THREE.CircleGeometry(5000, 64);
            const hMat = new THREE.MeshBasicMaterial({ color: 0x020813, side: THREE.DoubleSide });
            this.horizonMask = new THREE.Mesh(hGeo, hMat);
            
            // Rotarlo para que esté horizontal
            this.horizonMask.rotation.x = -Math.PI / 2;

            // Añadir una cuadrícula para que el suelo sea visible y no se confunda con el espacio
            const grid = new THREE.GridHelper(5000, 100, 0x00ffcc, 0x113344);
            grid.rotation.x = Math.PI / 2;
            grid.position.z = 0.1; // Ligeramente encima del plano para evitar z-fighting
            this.horizonMask.add(grid);
            
            // Creamos un grupo para la cámara que mantenga el horizonte
            this.cameraRig = new THREE.Group();
            this.cameraRig.add(this.horizonMask);
            
            // El horizonte debe estar justo debajo de la vista de la cámara
            this.horizonMask.position.set(0, -0.5, 0); 
        }

        // IMPORTANTE: Siempre añadir la cámara al rig en cada aterrizaje
        this.cameraRig.add(camera);

        // 1. Añadir el rig completo como hijo de la Tierra
        earthObj.mesh.add(this.cameraRig);

        // Copiar posición calculada al Rig
        this.cameraRig.position.copy(camera.position);
        
        // La cámara debe estar en el centro del Rig
        camera.position.set(0,0,0);
        
        // Orientar el rig para que el eje Y local del rig apunte HACIA ARRIBA (lejos del centro de la Tierra)
        this.cameraRig.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            this.cameraRig.position.clone().normalize()
        );

        // 3. Configurar vista inicial hacia el horizonte / cenit
        this.lat = 0; // Mirando al horizonte inicialmente
        this.lon = loc.lon; // Apuntando hacia afuera
        this.updateCameraLook();

        if (typeof logTitan !== 'undefined') logTitan(`[PLANETARIUM] Aterrizaje exitoso en: ${loc.name}`);
    },

    leaveSurface: function() {
        if (!this.active) return;
        this.active = false;

        document.getElementById('btn-land-surface').style.display = 'block';
        document.getElementById('btn-leave-surface').style.display = 'none';
        document.getElementById('planetarium-info').innerHTML = '';

        // Restaurar estado de cámara
        if (this.cameraCache) {
            if (this.cameraCache.parent) {
                this.cameraCache.parent.add(camera);
            } else {
                scene.add(camera); // Fallback
            }
            camera.position.copy(this.cameraCache.position);
            camera.rotation.copy(this.cameraCache.rotation);
        }
        
        if (this.cameraRig && this.cameraRig.parent) {
            this.cameraRig.parent.remove(this.cameraRig);
        }

        if (typeof controls !== 'undefined') {
            controls.enabled = this.controlsCache;
        }

        if (typeof logTitan !== 'undefined') logTitan(`[PLANETARIUM] Vuelta a Órbita (Modo Libre).`);
    },

    onMouseMove: function(event) {
        if (!this.active || !this.isDragging) return;

        const deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        // Sensibilidad
        this.lon -= deltaX * 0.2;
        this.lat -= deltaY * 0.2;

        // Limitar la inclinación para no romper el cuello
        this.lat = Math.max(-85, Math.min(85, this.lat));

        this.updateCameraLook();
    },

    updateCameraLook: function() {
        // En base a this.lon y this.lat, rotamos LA CÁMARA (no el rig)
        const phi = THREE.MathUtils.degToRad(this.lat); // pitch (arriba/abajo)
        const theta = THREE.MathUtils.degToRad(this.lon); // yaw (izquierda/derecha)
        
        // Orden YXZ para simular casco First Person
        camera.rotation.order = 'YXZ';
        camera.rotation.y = theta;
        camera.rotation.x = phi;
    }
};

// Auto-inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        Planetarium.initUI();
    }, 1000); // Esperar a que la UI principal se monte
});
