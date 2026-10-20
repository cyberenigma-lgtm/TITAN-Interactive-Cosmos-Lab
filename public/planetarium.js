/**
 * ====================================================================
 *   TITAN-INTERACTIVE-COSMOS-LAB — PLANETARIUM STREET VIEW 2.0
 *   Módulo Matemático de Teletransportación a Superficie Terrestre
 *   y Observación Astronómica en Bóveda Celeste 360° (0% Fallos de Matriz)
 *   Autor: José Manuel Moreno (JMM / cyberenigma-lgtm)
 *   Propiedad Intelectual Protegida (Safe Creative / GPLv3)
 * ====================================================================
 */

window.Planetarium = {
    // Catálogo de ubicaciones geográficas de precisión
    locations: [
        { 
            name: "Casa Cuartel General TITAN (Berriosuso, Navarra)", 
            lat: 42.858111, 
            lon: -1.686611,
            desc: "Casa Cuartel General & Laboratorio de Astrofísica (Berriosuso, Navarra) — Base Central JMM"
        },
        { 
            name: "Pamplona (Plaza del Castillo), España", 
            lat: 42.81687, 
            lon: -1.64323,
            desc: "Pamplona, Navarra (España)"
        },
        { 
            name: "Santiago de Compostela, Galicia", 
            lat: 42.8782, 
            lon: -8.5448,
            desc: "Praza do Obradoiro, Santiago (España)"
        },
        { 
            name: "Madrid (Puerta del Sol), España", 
            lat: 40.4168, 
            lon: -3.7038,
            desc: "Madrid, Comunidad de Madrid (España)"
        },
        { 
            name: "Amigo (Calle la Rioja, Valdemoro)", 
            lat: 40.188521, 
            lon: -3.685902,
            desc: "Calle la Rioja, Valdemoro, Madrid (España)"
        },
        { 
            name: "Buenos Aires (Obelisco), Argentina", 
            lat: -34.6037, 
            lon: -58.3816,
            desc: "Av. 9 de Julio, Buenos Aires (Argentina)"
        },
        { 
            name: "CDMX (Zócalo), México", 
            lat: 19.4326, 
            lon: -99.1332,
            desc: "Ciudad de México (México)"
        },
        { 
            name: "Tokio (Shinjuku), Japón", 
            lat: 35.6762, 
            lon: 139.6503,
            desc: "Tokio, Región de Kanto (Japón)"
        }
    ],

    active: false,
    currentLoc: null,
    
    // Ángulos de vista esférica (Mouselook)
    // lat = elevación / pitch (-85° suelo a +88° cénit)
    // lon = acimut / yaw (0° Norte, 90° Este, 180° Sur, 270° Oeste)
    lat: 15.0,
    lon: 0.0,
    targetLat: 15.0,
    targetLon: 0.0,
    
    // Zoom / FOV
    fov: 60.0,
    originalFov: 60.0,
    
    // Estado de interacción con el ratón
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    
    // Objetos 3D auxiliares (Suelo / Horizonte / Marcadores Cardinales / Atmósfera)
    groundMesh: null,
    compassGroup: null,
    skyDomeMesh: null,
    atmosphereEnabled: false, // Por defecto en Modo Stellarium para ver todas las estrellas de día
    
    // Cache de restauración orbital
    orbitCache: {
        position: null,
        target: null,
        fov: 60.0
    },

    toggleAtmosphere: function() {
        this.atmosphereEnabled = !this.atmosphereEnabled;
        const btn = document.getElementById('btn-toggle-atmosphere');
        if (btn) {
            if (this.atmosphereEnabled) {
                btn.innerHTML = '☀️ ATMÓSFERA: [ ACTIVADA (CIELO DIURNO) ] (Tecla A)';
                btn.style.background = 'rgba(76,201,240,0.25)';
                btn.style.borderColor = '#4cc9f0';
                btn.style.color = '#4cc9f0';
            } else {
                btn.innerHTML = '✨ ATMÓSFERA: [ MODO STELLARIUM — VER ESTRELLAS DE DÍA ] (Tecla A)';
                btn.style.background = 'rgba(255,200,0,0.2)';
                btn.style.borderColor = '#ffcc00';
                btn.style.color = '#ffd700';
            }
        }
        if (typeof logTitan !== 'undefined') {
            logTitan(this.atmosphereEnabled ? '[STELLARIUM] Atmósfera diurna activada (dispersión Rayleigh).' : '[STELLARIUM] Atmósfera desactivada: Estrellas visibles en pleno día.');
        }
    },

    initUI: function() {
        if (document.getElementById('planetarium-ui')) return;

        const container = document.createElement('div');
        container.id = 'planetarium-ui';
        container.className = 'glass-card panel-draggable lab-panel';
        container.style.position = 'absolute';
        container.style.top = '120px';
        container.style.left = '50%';
        container.style.transform = 'translateX(-50%)';
        container.style.width = '380px';
        container.style.zIndex = '999';
        container.style.padding = '18px';
        container.style.display = 'none';
        container.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 255, 204, 0.3)';
        container.style.border = '1px solid rgba(0, 255, 204, 0.5)';
        container.style.backdropFilter = 'blur(12px)';
        container.style.borderRadius = '10px';

        let html = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0, 255, 204, 0.3); padding-bottom:10px; margin-bottom:12px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:18px;">🌍</span>
                    <h3 style="color:#00ffcc; font-family:'Outfit', sans-serif; margin:0; font-size:14px; text-transform:uppercase; letter-spacing:1.2px; font-weight:700;">
                        STREET VIEW DEL CIELO 360°
                    </h3>
                </div>
                <button id="btn-close-planetarium" style="background:none; border:none; color:#00ffcc; font-size:20px; cursor:pointer; line-height:1;">✕</button>
            </div>
            
            <div style="font-size:11.5px; color:#c0d0e0; margin-bottom:12px; line-height:1.4;">
                Aterriza en cualquier punto geográfico de la Tierra para ver las estrellas, constelaciones y el Sol en tiempo real desde la superficie.
            </div>

            <div style="margin-bottom:10px;">
                <label style="font-size:11px; color:#4cc9f0; text-transform:uppercase; font-weight:600; display:block; margin-bottom:4px;">
                    Destino Geográfico:
                </label>
                <select id="planetarium-select" style="width:100%; background:rgba(10, 18, 30, 0.85); border:1px solid #4cc9f0; color:#ffffff; padding:8px; font-family:'Outfit', sans-serif; font-size:12px; border-radius:5px; outline:none;">
        `;

        this.locations.forEach((loc, idx) => {
            html += `<option value="${idx}">${loc.name}</option>`;
        });

        html += `
                </select>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:12px;">
                <div>
                    <label style="font-size:10px; color:#888; display:block;">LATITUD (°):</label>
                    <input type="number" id="planetarium-custom-lat" step="0.0001" value="42.8581" style="width:100%; background:rgba(0,0,0,0.6); border:1px solid rgba(76,201,240,0.4); color:#00ffcc; padding:5px 7px; font-family:monospace; font-size:11px; border-radius:4px; box-sizing:border-box;">
                </div>
                <div>
                    <label style="font-size:10px; color:#888; display:block;">LONGITUD (°):</label>
                    <input type="number" id="planetarium-custom-lon" step="0.0001" value="-1.6866" style="width:100%; background:rgba(0,0,0,0.6); border:1px solid rgba(76,201,240,0.4); color:#00ffcc; padding:5px 7px; font-family:monospace; font-size:11px; border-radius:4px; box-sizing:border-box;">
                </div>
            </div>

            <button id="btn-land-surface" style="width:100%; background:linear-gradient(135deg, rgba(0,255,204,0.25), rgba(76,201,240,0.25)); border:1px solid #00ffcc; color:#00ffcc; padding:11px; font-weight:bold; cursor:pointer; font-family:'Outfit', sans-serif; border-radius:6px; font-size:12.5px; transition:all 0.2s; box-shadow:0 0 12px rgba(0,255,204,0.3); text-transform:uppercase; letter-spacing:0.8px;">
                🚀 ATERRIZAR EN LA SUPERFICIE
            </button>

            <button id="btn-leave-surface" style="display:none; width:100%; background:linear-gradient(135deg, rgba(255,51,102,0.3), rgba(255,0,85,0.2)); border:1px solid #ff3366; color:#ff6688; padding:11px; font-weight:bold; cursor:pointer; font-family:'Outfit', sans-serif; border-radius:6px; font-size:12.5px; transition:all 0.2s; box-shadow:0 0 12px rgba(255,51,102,0.35); text-transform:uppercase; letter-spacing:0.8px;">
                🛰️ VOLVER A ÓRBITA (SALIR)
            </button>

            <button id="btn-toggle-atmosphere" style="display:none; width:100%; margin-top:8px; background:rgba(255,200,0,0.18); border:1px solid #ffcc00; color:#ffd700; padding:9px; font-weight:bold; cursor:pointer; font-family:'Outfit', sans-serif; border-radius:6px; font-size:11.5px; transition:all 0.2s; box-shadow:0 0 10px rgba(255,200,0,0.2); text-transform:uppercase; letter-spacing:0.6px;">
                ✨ ATMÓSFERA: [ MODO STELLARIUM — VER ESTRELLAS DE DÍA ] (Tecla A)
            </button>

            <!-- Controles Rápidos de Orientación Cardinal -->
            <div id="planetarium-quick-look" style="display:none; margin-top:12px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.1);">
                <div style="font-size:10px; color:#888; text-transform:uppercase; margin-bottom:6px; text-align:center;">Mirada Cardinal Rápida:</div>
                <div style="display:flex; justify-content:center; gap:6px;">
                    <button class="btn-cardinal" data-yaw="0" data-pitch="10" style="background:rgba(0,255,204,0.1); border:1px solid #00ffcc; color:#00ffcc; padding:4px 8px; font-size:10px; border-radius:3px; cursor:pointer;">NORTE (N)</button>
                    <button class="btn-cardinal" data-yaw="90" data-pitch="10" style="background:rgba(0,255,204,0.1); border:1px solid #00ffcc; color:#00ffcc; padding:4px 8px; font-size:10px; border-radius:3px; cursor:pointer;">ESTE (E)</button>
                    <button class="btn-cardinal" data-yaw="180" data-pitch="10" style="background:rgba(0,255,204,0.1); border:1px solid #00ffcc; color:#00ffcc; padding:4px 8px; font-size:10px; border-radius:3px; cursor:pointer;">SUR (S)</button>
                    <button class="btn-cardinal" data-yaw="270" data-pitch="10" style="background:rgba(0,255,204,0.1); border:1px solid #00ffcc; color:#00ffcc; padding:4px 8px; font-size:10px; border-radius:3px; cursor:pointer;">OESTE (O)</button>
                    <button class="btn-cardinal" data-yaw="0" data-pitch="85" style="background:rgba(255,170,0,0.15); border:1px solid #ffaa00; color:#ffaa00; padding:4px 8px; font-size:10px; border-radius:3px; cursor:pointer;">CÉNIT 90°</button>
                </div>
            </div>

            <!-- Telemetría en Tiempo Real -->
            <div id="planetarium-info" style="margin-top:12px; font-size:11px; color:#00ffcc; font-family:monospace; line-height:1.5; border-top:1px solid rgba(255,255,255,0.1); padding-top:10px;"></div>
        `;

        container.innerHTML = html;
        document.body.appendChild(container);

        // Eventos de selección de ubicación
        const select = document.getElementById('planetarium-select');
        const customLat = document.getElementById('planetarium-custom-lat');
        const customLon = document.getElementById('planetarium-custom-lon');
        
        select.addEventListener('change', () => {
            const idx = parseInt(select.value);
            if (idx >= 0 && idx < this.locations.length) {
                const loc = this.locations[idx];
                customLat.value = loc.lat.toFixed(4);
                customLon.value = loc.lon.toFixed(4);
            }
        });

        document.getElementById('btn-close-planetarium').addEventListener('click', () => {
            container.style.display = 'none';
        });

        document.getElementById('btn-land-surface').addEventListener('click', () => this.landOnSurface());
        document.getElementById('btn-leave-surface').addEventListener('click', () => this.leaveSurface());
        document.getElementById('btn-toggle-atmosphere').addEventListener('click', () => this.toggleAtmosphere());

        // Botones cardinales
        container.querySelectorAll('.btn-cardinal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const yaw = parseFloat(btn.dataset.yaw);
                const pitch = parseFloat(btn.dataset.pitch);
                this.targetLon = yaw;
                this.targetLat = pitch;
                this.lon = yaw;
                this.lat = pitch;
            });
        });

        // Eventos de ratón para Mouselook (360° Panorama)
        this.bindMouseLook();
    },

    bindMouseLook: function() {
        const onDown = (e) => {
            if (!this.active) return;
            // No capturar si se hace clic en botones o selects de la UI
            if (e.target.closest('#planetarium-ui') || e.target.closest('#nav-bar') || e.target.closest('.panel-draggable')) {
                return;
            }
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        };

        const onUp = () => {
            this.isDragging = false;
        };

        const onMove = (e) => {
            if (!this.active || !this.isDragging) return;
            const dx = e.clientX - this.lastMouseX;
            const dy = e.clientY - this.lastMouseY;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;

            // Sensibilidad suave
            const sensitivity = 0.22;
            this.lon -= dx * sensitivity;
            this.lat -= dy * sensitivity;

            // Normalizar acimut (0 a 360)
            this.lon = (this.lon % 360 + 360) % 360;

            // Clampar elevación para evitar romper la orientación vertical
            this.lat = Math.max(-85.0, Math.min(88.0, this.lat));
        };

        const onWheel = (e) => {
            if (!this.active) return;
            // Si el cursor está sobre la UI del planetario, no hacer zoom de cámara
            if (e.target.closest('#planetarium-ui')) return;

            e.preventDefault();
            const cam = window.camera;
            if (!cam) return;

            // Zoom óptico suave (FOV de 30° a 80°)
            this.fov = Math.max(30.0, Math.min(80.0, this.fov + (e.deltaY * 0.04)));
            cam.fov = this.fov;
            cam.updateProjectionMatrix();
        };

        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('wheel', onWheel, { passive: false });

        // Tecla A para alternar atmósfera diurna / Modo Stellarium
        window.addEventListener('keydown', (e) => {
            if (this.active && (e.key === 'a' || e.key === 'A') && !['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) {
                this.toggleAtmosphere();
            }
        });
    },

    togglePanel: function() {
        const p = document.getElementById('planetarium-ui');
        if (!p) {
            this.initUI();
            const pNew = document.getElementById('planetarium-ui');
            if (pNew) pNew.style.display = 'block';
            return;
        }
        p.style.display = (p.style.display === 'none' || p.style.display === '') ? 'block' : 'none';
    },

    landOnSurface: function() {
        const select = document.getElementById('planetarium-select');
        const customLat = document.getElementById('planetarium-custom-lat');
        const customLon = document.getElementById('planetarium-custom-lon');

        const latVal = parseFloat(customLat.value);
        const lonVal = parseFloat(customLon.value);

        let locName = "Coordenadas Personalizadas";
        let locDesc = `Lat: ${latVal.toFixed(4)}°, Lon: ${lonVal.toFixed(4)}°`;

        const idx = parseInt(select.value);
        if (idx >= 0 && idx < this.locations.length) {
            const loc = this.locations[idx];
            if (Math.abs(loc.lat - latVal) < 0.01 && Math.abs(loc.lon - lonVal) < 0.01) {
                locName = loc.name;
                locDesc = loc.desc;
            }
        }

        this.executeLanding({
            name: locName,
            lat: latVal,
            lon: lonVal,
            desc: locDesc
        });
    },

    executeLanding: function(loc) {
        const planetsList = window.planets || [];
        const earthObj = planetsList.find(p => p.data && p.data.name === "Tierra");

        if (!earthObj || !earthObj.mesh) {
            if (typeof logTitan !== 'undefined') logTitan("[PLANETARIUM ERROR] Objeto Tierra no encontrado en la simulación.");
            return;
        }

        const cam = window.camera;
        const ctrl = window.controls;
        if (!cam) return;

        // Guardar estado orbital para cuando volvamos
        if (!this.active) {
            this.orbitCache.position = cam.position.clone();
            this.orbitCache.target = ctrl ? ctrl.target.clone() : new THREE.Vector3(0, 0, 0);
            this.orbitCache.fov = cam.fov || 60.0;
        }

        this.active = true;
        this.currentLoc = loc;
        this.lat = 15.0; // Mirando hacia el horizonte / cielo bajo
        this.lon = 0.0;  // Mirando hacia el Norte
        this.fov = 60.0;
        cam.fov = 60.0;
        cam.updateProjectionMatrix();

        // Desactivar OrbitControls de forma tajante para evitar tirones de matriz
        if (ctrl) ctrl.enabled = false;

        // Crear Suelo de Horizonte realista con marcas cardinales
        this.buildHorizonGround(earthObj);

        // Actualizar UI
        const btnLand = document.getElementById('btn-land-surface');
        const btnLeave = document.getElementById('btn-leave-surface');
        const quickLook = document.getElementById('planetarium-quick-look');
        const info = document.getElementById('planetarium-info');
        const btnAtmos = document.getElementById('btn-toggle-atmosphere');

        if (btnLand) btnLand.style.display = 'none';
        if (btnLeave) btnLeave.style.display = 'block';
        if (quickLook) quickLook.style.display = 'block';
        if (btnAtmos) btnAtmos.style.display = 'block';

        if (info) {
            info.innerHTML = `
                <div style="color:#00ffcc; font-weight:bold; margin-bottom:4px;">📍 ${loc.name}</div>
                <div style="color:#aaa; font-size:10px;">${loc.desc || ''}</div>
                <div style="color:#4cc9f0; margin-top:4px;">LAT: ${loc.lat.toFixed(4)}° | LON: ${loc.lon.toFixed(4)}°</div>
                <div id="planetarium-live-bearing" style="color:#ffaa00; margin-top:2px;">ACIMUT: 000° (N) | ELEV: +15°</div>
            `;
        }

        // Ejecutar primer frame de posicionamiento inmediato
        this.update();

        if (typeof logTitan !== 'undefined') {
            logTitan(`[PLANETARIUM] Aterrizaje exitoso en superficie: ${loc.name}`);
        }
    },

    buildHorizonGround: function(earthObj) {
        const scene = window.scene;
        if (!scene) return;

        // Limpiar suelo anterior si existía
        if (this.groundMesh) {
            scene.remove(this.groundMesh);
            if (this.groundMesh.geometry) this.groundMesh.geometry.dispose();
            if (this.groundMesh.material) this.groundMesh.material.dispose();
            this.groundMesh = null;
        }
        if (this.compassGroup) {
            scene.remove(this.compassGroup);
            this.compassGroup = null;
        }
        if (this.skyDomeMesh) {
            scene.remove(this.skyDomeMesh);
            if (this.skyDomeMesh.geometry) this.skyDomeMesh.geometry.dispose();
            if (this.skyDomeMesh.material) this.skyDomeMesh.material.dispose();
            this.skyDomeMesh = null;
        }

        // Bóveda Atmosférica Volumétrica (Cúpula Celeste Rayleigh / Stellarium)
        const domeGeo = new THREE.SphereGeometry(3200, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.52);
        const domeMat = new THREE.MeshBasicMaterial({
            color: 0x3a88e9,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.0,
            depthWrite: false
        });
        this.skyDomeMesh = new THREE.Mesh(domeGeo, domeMat);
        scene.add(this.skyDomeMesh);

        // Radio del disco de suelo (un plano colosal que cubre 100% el hemisferio inferior)
        const groundRadius = 3500;
        const groundGeo = new THREE.CircleGeometry(groundRadius, 64);
        // IMPORTANTE: Rotar la geometría de forma nativa para que su vector normal sea exactamente (0, 1, 0)
        groundGeo.rotateX(-Math.PI / 2);
        
        // Material del suelo terrestre oscuro con textura de tierra nocturna
        const groundMat = new THREE.MeshBasicMaterial({
            color: 0x05070e,
            side: THREE.FrontSide,
            depthWrite: true
        });

        this.groundMesh = new THREE.Mesh(groundGeo, groundMat);
        scene.add(this.groundMesh);

        // Crear anillo de horizonte y marcadores cardinales (N, S, E, O)
        this.compassGroup = new THREE.Group();
        
        // Anillo de horizonte brillante tenue
        const ringGeo = new THREE.RingGeometry(groundRadius * 0.98, groundRadius, 64);
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x00ffcc,
            transparent: true,
            opacity: 0.35,
            side: THREE.FrontSide
        });
        // Balizas cardinales holográficas en el horizonte (Norte, Este, Sur, Oeste)
        const createCompassCanvas = (text, color) => {
            const canvas = document.createElement('canvas');
            canvas.width = 256; canvas.height = 64;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'rgba(5, 12, 24, 0.85)';
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(32, 32, 16, 0, Math.PI * 2);
            ctx.stroke();
            ctx.font = 'bold 24px monospace';
            ctx.fillStyle = color;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 58, 32);
            return new THREE.CanvasTexture(canvas);
        };

        const cardinals = [
            { label: "NORTE (0°)", color: "#00ffcc", x: 0, z: -1 },
            { label: "ESTE (90°)", color: "#4cc9f0", x: 1, z: 0 },
            { label: "SUR (180°)", color: "#ffaa00", x: 0, z: 1 },
            { label: "OESTE (270°)", color: "#ff66cc", x: -1, z: 0 }
        ];

        cardinals.forEach(c => {
            const spriteMat = new THREE.SpriteMaterial({
                map: createCompassCanvas(c.label, c.color),
                transparent: true,
                opacity: 0.95,
                depthWrite: false
            });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(70, 18, 1);
            sprite.position.set(c.x * 600, 15, c.z * 600);
            this.compassGroup.add(sprite);
        });

        scene.add(this.compassGroup);
    },

    update: function() {
        if (!this.active || !this.currentLoc) return;

        const planetsList = window.planets || [];
        const earthObj = planetsList.find(p => p.data && p.data.name === "Tierra");
        const cam = window.camera;
        if (!earthObj || !earthObj.mesh || !cam) return;

        // 1. Obtener Matriz Mundial y Posición de la Tierra
        const earthWorldPos = new THREE.Vector3();
        earthObj.mesh.getWorldPosition(earthWorldPos);

        const earthWorldQuat = new THREE.Quaternion();
        earthObj.mesh.getWorldQuaternion(earthWorldQuat);

        // 2. Coordenadas esféricas estándar UV en esfera Three.js
        const latRad = THREE.MathUtils.degToRad(this.currentLoc.lat);
        const lonRad = THREE.MathUtils.degToRad(this.currentLoc.lon);

        const localNorm = new THREE.Vector3(
            -Math.cos(latRad) * Math.sin(lonRad),
            Math.sin(latRad),
            Math.cos(latRad) * Math.cos(lonRad)
        ).normalize();

        // 3. Transformar normal a coordenadas mundiales aplicando la rotación actual de la Tierra
        const worldUp = localNorm.clone().applyQuaternion(earthWorldQuat).normalize();

        // Radio de la Tierra en el motor
        const earthRadius = (earthObj.data && earthObj.data.radius) ? earthObj.data.radius : 4.5;
        // Altura del observador (nivel de los ojos)
        const eyeElevation = earthRadius + 0.035;

        // Posición mundial final de la cámara
        const camPos = earthWorldPos.clone().add(worldUp.clone().multiplyScalar(eyeElevation));
        cam.position.copy(camPos);

        // 4. Calcular la Base Tangencial Local (Norte, Este, Arriba)
        const worldPolarAxis = new THREE.Vector3(0, 1, 0).applyQuaternion(earthWorldQuat).normalize();
        
        let worldNorth = worldPolarAxis.clone().sub(worldUp.clone().multiplyScalar(worldPolarAxis.dot(worldUp)));
        if (worldNorth.lengthSq() < 0.0001) {
            worldNorth = new THREE.Vector3(0, 0, 1).applyQuaternion(earthWorldQuat);
        } else {
            worldNorth.normalize();
        }

        const worldEast = new THREE.Vector3().crossVectors(worldNorth, worldUp).normalize();

        // 5. Dirección de la mirada (Yaw / Pitch)
        const yawRad = THREE.MathUtils.degToRad(this.lon);
        const pitchRad = THREE.MathUtils.degToRad(this.lat);

        const horizDir = worldNorth.clone().multiplyScalar(Math.cos(yawRad))
            .add(worldEast.clone().multiplyScalar(Math.sin(yawRad)))
            .normalize();

        const finalLookDir = horizDir.clone().multiplyScalar(Math.cos(pitchRad))
            .add(worldUp.clone().multiplyScalar(Math.sin(pitchRad)))
            .normalize();

        // 6. Configurar Cámara en Escena
        cam.up.copy(worldUp);
        cam.lookAt(camPos.clone().add(finalLookDir));

        // 7. Mantener el suelo de horizonte justo debajo del observador
        if (this.groundMesh) {
            this.groundMesh.position.copy(camPos).sub(worldUp.clone().multiplyScalar(0.015));
            this.groundMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), worldUp);
        }
        if (this.compassGroup) {
            this.compassGroup.position.copy(camPos).sub(worldUp.clone().multiplyScalar(0.012));
            const compassMatrix = new THREE.Matrix4().makeBasis(
                worldEast,
                worldUp,
                worldNorth.clone().negate()
            );
            this.compassGroup.quaternion.setFromRotationMatrix(compassMatrix);
        }
        if (this.skyDomeMesh) {
            this.skyDomeMesh.position.copy(camPos);
            this.skyDomeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), worldUp);
        }

        // 8. Cálculo de Elevación Solar y Dispersión Atmosférica en Tiempo Real (Stellarium)
        const sunWorldPos = new THREE.Vector3(75, 75, 75); // Posición central del Sol
        const toSunDir = sunWorldPos.clone().sub(camPos).normalize();
        const sunElevation = worldUp.dot(toSunDir); // > 0 = de día, < 0 = de noche
        const sunElevDeg = Math.round(Math.asin(Math.max(-1, Math.min(1, sunElevation))) * (180 / Math.PI));

        let solarStateStr = "🌙 NOCHE";
        let solarColor = "#88bbff";
        if (sunElevDeg > 3) {
            solarStateStr = "☀️ DÍA";
            solarColor = "#ffd700";
        } else if (sunElevDeg >= -6 && sunElevDeg <= 3) {
            solarStateStr = "🌅 CREPÚSCULO";
            solarColor = "#ff7744";
        }

        if (this.skyDomeMesh) {
            if (this.atmosphereEnabled) {
                if (sunElevDeg > 3) {
                    // Atmósfera diurna azul cielo (Rayleigh)
                    this.skyDomeMesh.material.color.setHex(0x3a88e9);
                    this.skyDomeMesh.material.opacity = Math.min(0.95, Math.max(0.35, sunElevation * 1.3));
                } else if (sunElevDeg >= -6 && sunElevDeg <= 3) {
                    // Resplandor crepuscular al atardecer / amanecer
                    this.skyDomeMesh.material.color.setHex(0xd45020);
                    this.skyDomeMesh.material.opacity = 0.65;
                } else {
                    // Noche: cielo estrellado limpio
                    this.skyDomeMesh.material.opacity = 0.0;
                }
            } else {
                // Modo Stellarium: 0% atmósfera para ver toda la bóveda celeste en pleno día
                this.skyDomeMesh.material.opacity = 0.0;
            }
        }

        // 9. Actualizar HUD en vivo
        const liveBearing = document.getElementById('planetarium-live-bearing');
        if (liveBearing) {
            const compassBearing = Math.round(this.lon);
            let dirStr = "Norte";
            if (compassBearing >= 23 && compassBearing < 68) dirStr = "Noreste";
            else if (compassBearing >= 68 && compassBearing < 113) dirStr = "Este";
            else if (compassBearing >= 113 && compassBearing < 158) dirStr = "Sureste";
            else if (compassBearing >= 158 && compassBearing < 203) dirStr = "Sur";
            else if (compassBearing >= 203 && compassBearing < 248) dirStr = "Suroeste";
            else if (compassBearing >= 248 && compassBearing < 293) dirStr = "Oeste";
            else if (compassBearing >= 293 && compassBearing < 338) dirStr = "Noroeste";

            liveBearing.innerHTML = `<span style="color:${solarColor}; font-weight:bold;">${solarStateStr} (${sunElevDeg >= 0 ? '+' : ''}${sunElevDeg}°)</span> | ACIMUT: ${compassBearing.toString().padStart(3, '0')}° (${dirStr}) | ELEV: ${this.lat >= 0 ? '+' : ''}${Math.round(this.lat)}° | FOV: ${Math.round(this.fov)}°`;
        }
    },

    leaveSurface: function() {
        if (!this.active) return;
        this.active = false;

        const cam = window.camera;
        const ctrl = window.controls;
        const scene = window.scene;

        // Limpiar objetos de suelo y atmósfera
        if (this.groundMesh && scene) {
            scene.remove(this.groundMesh);
            if (this.groundMesh.geometry) this.groundMesh.geometry.dispose();
            if (this.groundMesh.material) this.groundMesh.material.dispose();
            this.groundMesh = null;
        }
        if (this.compassGroup && scene) {
            scene.remove(this.compassGroup);
            this.compassGroup = null;
        }
        if (this.skyDomeMesh && scene) {
            scene.remove(this.skyDomeMesh);
            if (this.skyDomeMesh.geometry) this.skyDomeMesh.geometry.dispose();
            if (this.skyDomeMesh.material) this.skyDomeMesh.material.dispose();
            this.skyDomeMesh = null;
        }

        // Restaurar Cámara y Controles
        if (cam) {
            cam.up.set(0, 1, 0);
            cam.fov = this.orbitCache.fov || 60.0;
            cam.updateProjectionMatrix();

            // Ubicar cámara en órbita terrestre estable
            const planetsList = window.planets || [];
            const earthObj = planetsList.find(p => p.data && p.data.name === "Tierra");
            if (earthObj && earthObj.mesh) {
                const eWorld = new THREE.Vector3();
                earthObj.mesh.getWorldPosition(eWorld);
                cam.position.copy(eWorld).add(new THREE.Vector3(12, 8, 14));
                if (ctrl) {
                    ctrl.target.copy(eWorld);
                    ctrl.enabled = true;
                    ctrl.update();
                }
            } else if (this.orbitCache.position && ctrl) {
                cam.position.copy(this.orbitCache.position);
                ctrl.target.copy(this.orbitCache.target);
                ctrl.enabled = true;
                ctrl.update();
            }
        }

        // Restaurar UI
        const btnLand = document.getElementById('btn-land-surface');
        const btnLeave = document.getElementById('btn-leave-surface');
        const quickLook = document.getElementById('planetarium-quick-look');
        const info = document.getElementById('planetarium-info');
        const btnAtmos = document.getElementById('btn-toggle-atmosphere');

        if (btnLand) btnLand.style.display = 'block';
        if (btnLeave) btnLeave.style.display = 'none';
        if (quickLook) quickLook.style.display = 'none';
        if (btnAtmos) btnAtmos.style.display = 'none';
        if (info) info.innerHTML = '<span style="color:#888;">Modo orbital reanudado.</span>';

        if (typeof logTitan !== 'undefined') {
            logTitan("[PLANETARIUM] Regreso a Órbita exitoso.");
        }
    },

    updateCameraLook: function() {
        // Compatibilidad para módulos externos (eclipses, etc.)
        this.update();
    }
};

// Inicialización automática cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        Planetarium.initUI();
    }, 800);
});
