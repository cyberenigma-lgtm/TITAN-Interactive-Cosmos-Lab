/**
 * TITAN LabOS - Scientific Applications Environment
 */

window.LabOS = {
    apps: ['app-nbody', 'app-astrometry'],
    anomalies: [],
    astrometryActive: false,
    measureActive: false,
    measurePointA: null,
    measurePointB: null,
    measureLine: null,
    raycaster: null,
    mouse: null,
    draggedAnomaly: null,
    dragPlane: null,
    intersection: null,
    offset: null,

    init: function() {
        if (typeof THREE !== 'undefined') {
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.dragPlane = new THREE.Plane();
            this.intersection = new THREE.Vector3();
            this.offset = new THREE.Vector3();
        }

        // Bind N-Body Buttons
        const btnInject = document.getElementById('btn-inject-bh');
        if (btnInject) {
            btnInject.addEventListener('click', () => this.injectBlackHole());
        }

        const btnClear = document.getElementById('btn-clear-masses');
        if (btnClear) {
            btnClear.addEventListener('click', () => this.clearAnomalies());
        }

        // Bind Events for Astrometry and Dragging
        window.addEventListener('click', (e) => this.onMouseClick(e));
        window.addEventListener('mousedown', (e) => this.onMouseDown(e), false);
        window.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
        window.addEventListener('mouseup', (e) => this.onMouseUp(e), false);

        // Start Physics Hook
        this.physicsLoop();
    },

    toggleApp: function(appId) {
        const app = document.getElementById(appId);
        if (app) {
            const isHidden = app.style.display === 'none';
            app.style.display = isHidden ? 'block' : 'none';
            
            if (appId === 'app-astrometry') {
                this.astrometryActive = isHidden;
                document.getElementById('astro-status').innerText = isHidden ? "Modo Selección Activo. Haz clic en una estrella o asteroide." : "Inactivo";
                if (isHidden) { this.measureActive = false; if (document.getElementById('app-measure')) document.getElementById('app-measure').style.display = 'none'; }
            }
            if (appId === 'app-measure') {
                this.measureActive = isHidden;
                if (isHidden) { 
                    this.astrometryActive = false; 
                    if (document.getElementById('app-astrometry')) document.getElementById('app-astrometry').style.display = 'none';
                    this.clearMeasurement();
                }
            }
        }
    },

    closeApp: function(appId) {
        const app = document.getElementById(appId);
        if (app) app.style.display = 'none';
        if (appId === 'app-astrometry') this.astrometryActive = false;
        if (appId === 'app-measure') { this.measureActive = false; this.clearMeasurement(); }
    },

    captureStudio: function() {
        if (!window.renderer) return;
        const canvas = window.renderer.domElement;
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `TITAN_Capture_${new Date().getTime()}.png`;
        link.href = dataURL;
        link.click();
        if (window.logTitan) window.logTitan("[ESTUDIO] Captura guardada en disco.");
    },

    clearMeasurement: function() {
        this.measurePointA = null;
        this.measurePointB = null;
        if (this.measureLine && window.scene) {
            window.scene.remove(this.measureLine);
            this.measureLine = null;
        }
        document.getElementById('measure-a').innerText = "N/A";
        document.getElementById('measure-b').innerText = "N/A";
        document.getElementById('measure-result').innerText = "0.00 UA";
        document.getElementById('measure-status').innerText = "Haz clic en el Punto A...";
    },

    spawnMatter: function() {
        if (!window.scene || !window.camera || typeof THREE === 'undefined') return;
        const typeSelect = document.getElementById('creator-type');
        const type = typeSelect ? typeSelect.value : 'planet';
        
        const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(window.camera.quaternion);
        const pos = window.camera.position.clone().add(dir.multiplyScalar(50));
        
        let geo, mat, mesh, massVal;
        
        if (type === 'planet' || type === 'gas_giant') {
            geo = new THREE.SphereGeometry(1.5, 32, 32);
            mat = new THREE.MeshLambertMaterial({ color: type === 'planet' ? 0x44aa44 : 0xccaacc });
            massVal = 10;
        } else {
            geo = new THREE.SphereGeometry(3, 32, 32);
            mat = new THREE.MeshBasicMaterial({ color: type === 'star_blue' ? 0x88bbff : 0xff4422 });
            massVal = 500;
        }
        
        mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        window.scene.add(mesh);
        
        if (!window.planets) window.planets = [];
        window.planets.push({
            mesh: mesh,
            data: { name: `Materia Experimental (${type})` },
            destroyed: false
        });
        
        if (massVal > 100) { // Act like an anomaly if massive (stars)
            const self = mesh; // capture ref for getter
            this.anomalies.push({ mesh: self, mass: massVal, get position() { return this.mesh.position; } });
        }
        
        if(window.logTitan) window.logTitan(`[FÁBRICA] Objeto ${type} inyectado en Z-50.`);
    },

    injectBlackHole: function() {
        if (!window.scene || !window.camera || typeof THREE === 'undefined') return;

        // Place BH 50 units in front of the camera
        const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(window.camera.quaternion);
        const pos = window.camera.position.clone().add(dir.multiplyScalar(50));

        // Visual representation
        const geo = new THREE.SphereGeometry(2, 32, 32);
        const mat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const mesh = new THREE.Mesh(geo, mat);
        
        // Accretion disk
        const ringGeo = new THREE.RingGeometry(3, 8, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
        const disk = new THREE.Mesh(ringGeo, ringMat);
        disk.rotation.x = Math.PI / 2;
        mesh.add(disk);

            mesh.position.copy(pos);
        window.scene.add(mesh);

        // NOTE: position is kept as a reference to mesh.position so dragging stays in sync
        this.anomalies.push({
            mesh: mesh,
            mass: 10000, // Arbitrary high mass
            get position() { return this.mesh.position; }
        });

        if(window.logTitan) window.logTitan(`[N-CUERPOS] Agujero Negro inyectado en (${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)})`);
    },

    clearAnomalies: function() {
        this.anomalies.forEach(a => {
            if (a.mesh && window.scene) window.scene.remove(a.mesh);
        });
        this.anomalies = [];
        if(window.logTitan) window.logTitan(`[N-CUERPOS] Anomalías eliminadas del tejido espaciotemporal.`);
    },

    physicsLoop: function() {
        if (this.anomalies.length > 0) {
            const G = 0.05; // Gravitational constant for the simulation
            let majorPerturbation = false;
            let perturbedObject = "";

            // Apply gravity to all meteorites (NEOs)
            if (window.meteorites) {
                window.meteorites.forEach(m => {
                    if (!m.mesh || !m.mesh.userData.isNEO) return;

                    // Reset visual effects if safe
                    if (m.mesh.scale.z > 1.01) m.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
                    if (m.mesh.material && m.mesh.material.emissiveIntensity > 0.05) {
                        m.mesh.material.emissiveIntensity *= 0.95;
                    }
                    
                    const mWorldPos = new THREE.Vector3();
                    m.mesh.getWorldPosition(mWorldPos);
                    
                    this.anomalies.forEach(anomaly => {
                        const distSq = mWorldPos.distanceToSquared(anomaly.position);
                        if (distSq > 1 && distSq < 10000 && !m.destroyed) { // Limit range to prevent infinity
                            const force = (G * anomaly.mass) / distSq;
                            const dir = new THREE.Vector3().subVectors(anomaly.position, mWorldPos).normalize();
                            
                            // Transform direction to local space for targetPos modification if needed
                            if (m.targetPos) {
                                m.targetPos.add(dir.multiplyScalar(force));
                            }

                            // Visual Consequence: Spaghettification (Espaguetización)
                            const stretch = 1.0 + (10000 / distSq) * 0.1;
                            
                            // Align Z axis towards black hole. To do this locally, we must convert anomaly to local space
                            const anomalyLocalPos = m.mesh.parent ? m.mesh.parent.worldToLocal(anomaly.position.clone()) : anomaly.position;
                            m.mesh.lookAt(anomalyLocalPos);
                            m.mesh.scale.set(1, 1, Math.min(stretch, 6)); // Stretch along Z
                            
                            // Visual Consequence: Fricción térmica (Calentamiento)
                            if (m.mesh.material) {
                                m.mesh.material.emissive = new THREE.Color(0xff3300); // Rojo/Naranja candente
                                m.mesh.material.emissiveIntensity = Math.min((10000 / distSq) * 0.3, 3.0);
                            }

                            // Visual Consequence: Chorros de Plasma (Plasma Jets)
                            if (!m.plasmaJet) {
                                const jetGeo = new THREE.CylinderGeometry(0.2, 0.05, 1, 8);
                                jetGeo.translate(0, 0.5, 0); // Origin at base
                                jetGeo.rotateX(Math.PI / 2); // Point along Z
                                const jetMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
                                m.plasmaJet = new THREE.Mesh(jetGeo, jetMat);
                                window.scene.add(m.plasmaJet);
                            }
                            
                            m.plasmaJet.visible = true;
                            m.plasmaJet.position.copy(mWorldPos);
                            m.plasmaJet.lookAt(anomaly.position);
                            m.plasmaJet.scale.set(1, 1, Math.sqrt(distSq)); // Reach the black hole
                            m.plasmaJet.material.opacity = Math.min((5000 / distSq), 1.0);
                            
                            // Logging continuously
                            if (Math.random() < 0.01 && window.logTitan) { // Menos spam que los planetas
                                const mName = m.mesh.userData.name || "Asteroide NEO";
                                window.logTitan(`[ALERTA N-CUERPOS] ${mName} atrapado. Fricción térmica y pérdida de masa.`);
                            }

                            // Event Horizon (Destrucción)
                            if (distSq < 150) {
                                m.mesh.visible = false;
                                m.destroyed = true;
                                if (m.plasmaJet) {
                                    m.plasmaJet.visible = false;
                                    window.scene.remove(m.plasmaJet);
                                }
                                if (window.logTitan) {
                                    window.logTitan(`[EVENTO CRÍTICO] ${m.mesh.userData.name || 'Asteroide'} cruzó el Horizonte de Sucesos y fue desintegrado.`);
                                }
                            }

                        } else if (m.plasmaJet) {
                            m.plasmaJet.visible = false;
                        }
                    });
                });
            }

            // Apply gravity to Planets
            if (window.planets) {
                window.planets.forEach(p => {
                    if (!p.mesh) return;

                    // Reset visual effects if safe
                    if (p.mesh.scale.z > 1.01) p.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
                    if (p.mesh.material && p.mesh.material.emissiveIntensity > 0.05) {
                        p.mesh.material.emissiveIntensity *= 0.95;
                    }
                    
                    const pWorldPos = new THREE.Vector3();
                    p.mesh.getWorldPosition(pWorldPos);

                    this.anomalies.forEach(anomaly => {
                        const distSq = pWorldPos.distanceToSquared(anomaly.position);
                        if (distSq > 1 && distSq < 40000 && !p.destroyed) { // Wider range for planets
                            const force = (G * anomaly.mass) / distSq;
                            // Planets are harder to move, but if close enough they get pulled
                            const dir = new THREE.Vector3().subVectors(anomaly.position, pWorldPos).normalize();
                            
                            const dirLocal = p.mesh.parent ? p.mesh.parent.worldToLocal(anomaly.position.clone()).sub(p.mesh.position).normalize() : dir;
                            p.mesh.position.add(dirLocal.multiplyScalar(force * 0.1)); // 0.1 resistance factor
                            
                            // Visual Consequence: Spaghettification (Espaguetización)
                            if (distSq < 10000) {
                                const stretch = 1.0 + (10000 / distSq) * 0.1;
                                const anomalyLocalPos = p.mesh.parent ? p.mesh.parent.worldToLocal(anomaly.position.clone()) : anomaly.position;
                                p.mesh.lookAt(anomalyLocalPos); // Align Z axis towards black hole
                                p.mesh.scale.set(1, 1, Math.min(stretch, 6)); // Stretch along Z
                                
                                // Visual Consequence: Fricción térmica (Calentamiento)
                                if (p.mesh.material) {
                                    p.mesh.material.emissive = new THREE.Color(0xff3300); // Rojo/Naranja candente
                                    p.mesh.material.emissiveIntensity = Math.min((10000 / distSq) * 0.3, 3.0);
                                }

                                // Visual Consequence: Chorros de Plasma (Plasma Jets)
                                if (!p.plasmaJet) {
                                    const jetGeo = new THREE.CylinderGeometry(0.5, 0.1, 1, 8);
                                    jetGeo.translate(0, 0.5, 0); // Origin at base
                                    jetGeo.rotateX(Math.PI / 2); // Point along Z
                                    const jetMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
                                    p.plasmaJet = new THREE.Mesh(jetGeo, jetMat);
                                    window.scene.add(p.plasmaJet);
                                }
                                
                                p.plasmaJet.visible = true;
                                p.plasmaJet.position.copy(pWorldPos);
                                p.plasmaJet.lookAt(anomaly.position);
                                p.plasmaJet.scale.set(1, 1, Math.sqrt(distSq)); // Reach the black hole
                                p.plasmaJet.material.opacity = Math.min((5000 / distSq), 1.0);
                                
                                // Logging continuously (with a chance to avoid spamming console)
                                if (Math.random() < 0.05 && window.logTitan) {
                                    const pName = p.data ? p.data.name : "Planeta";
                                    window.logTitan(`[ALERTA N-CUERPOS] ${pName} atrapado. Fricción térmica y pérdida de masa (Chorros de Plasma activos).`);
                                }
                            } else {
                                if (p.plasmaJet) p.plasmaJet.visible = false;
                            }

                            if (force > 5 && Math.random() < 0.01) {
                                majorPerturbation = true;
                                perturbedObject = p.data ? p.data.name : "Planeta";
                            }

                            // Event Horizon (Destrucción)
                            if (distSq < 150) {
                                p.mesh.visible = false;
                                p.destroyed = true;
                                if (p.plasmaJet) {
                                    p.plasmaJet.visible = false;
                                    window.scene.remove(p.plasmaJet);
                                }
                                if (window.logTitan) {
                                    window.logTitan(`[EVENTO CRÍTICO] ${p.data ? p.data.name : 'Un Planeta'} cruzó el Horizonte de Sucesos y fue desintegrado.`);
                                }
                            }
                        }
                    });
                });
            }

            // Log if a planet is suffering severe orbital decay
            if (majorPerturbation && window.logTitan) {
                window.logTitan(`[ALERTA GRAVITACIONAL] La órbita de ${perturbedObject} está sufriendo perturbaciones críticas por el Agujero Negro.`);
            }
        }
        
        requestAnimationFrame(() => this.physicsLoop());
    },

    updateMouseXY: function(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },

    onMouseDown: function(event) {
        if (event.button !== 0) return; // Only left click
        if (event.target.tagName === 'BUTTON' || event.target.closest('.lab-panel')) return;
        
        if (!this.raycaster || !window.camera || this.anomalies.length === 0) return;

        this.updateMouseXY(event);
        this.raycaster.setFromCamera(this.mouse, window.camera);

        const meshes = this.anomalies.map(a => a.mesh);
        const intersects = this.raycaster.intersectObjects(meshes, true);

        if (intersects.length > 0) {
            // Found an anomaly to drag
            if (window.controls) window.controls.enabled = false; // Disable orbit controls
            this.draggedAnomaly = this.anomalies.find(a => a.mesh === intersects[0].object || a.mesh.children.includes(intersects[0].object));
            
            // Set up drag plane parallel to camera
            this.dragPlane.setFromNormalAndCoplanarPoint(
                window.camera.getWorldDirection(this.dragPlane.normal),
                this.draggedAnomaly.mesh.position
            );

            if (this.raycaster.ray.intersectPlane(this.dragPlane, this.intersection)) {
                this.offset.copy(this.intersection).sub(this.draggedAnomaly.mesh.position);
            }
        }
    },

    onMouseMove: function(event) {
        if (!this.draggedAnomaly || !this.raycaster || !window.camera) return;
        
        this.updateMouseXY(event);
        this.raycaster.setFromCamera(this.mouse, window.camera);

        if (this.raycaster.ray.intersectPlane(this.dragPlane, this.intersection)) {
            const newPos = this.intersection.sub(this.offset);
            this.draggedAnomaly.mesh.position.copy(newPos);
            this.draggedAnomaly.position.copy(newPos);
        }
    },

    onMouseUp: function(event) {
        if (this.draggedAnomaly) {
            this.draggedAnomaly = null;
            if (window.controls) window.controls.enabled = true; // Re-enable orbit controls
            if(window.logTitan) window.logTitan(`[N-CUERPOS] Anomalía reposicionada.`);
        }
    },

    onMouseClick: function(event) {
        if ((!this.astrometryActive && !this.measureActive) || !this.raycaster || !window.camera || !window.scene) return;
        
        // Ignore clicks on UI
        if (event.target.tagName === 'BUTTON' || event.target.closest('.lab-panel')) return;

        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, window.camera);
        const intersects = this.raycaster.intersectObjects(window.scene.children, true);
        
        if (intersects.length === 0) return;

        if (this.astrometryActive) {
            let handled = false;
            for (let i = 0; i < intersects.length; i++) {
                const hit = intersects[i];
                const obj = hit.object;

                // Gaia Point Cloud star
                if (obj.userData && obj.userData.isGaiaCloud && hit.index !== undefined && window.gaiaStarsData) {
                    const s = window.gaiaStarsData[hit.index];
                    if (s) {
                        document.getElementById('astro-status').innerText = 'Análisis Espectral Completado.';
                        document.getElementById('astro-data').style.display = 'flex';
                        document.getElementById('astro-name').innerText = s.name;
                        document.getElementById('astro-class').innerText = `Clase Espectral: ${s.sp_class || '?'}`;
                        const tempMap = { O:'30000+ K', B:'10000-30000 K', A:'7500-10000 K', F:'6000-7500 K', G:'5200-6000 K', K:'3700-5200 K', M:'2400-3700 K' };
                        document.getElementById('astro-temp').innerText = `Temperatura: ${tempMap[s.sp_class] || 'Desconocida'}`;
                        document.getElementById('astro-mass').innerText = `Distancia: ${s.dist_ly} años luz`;
                        this.generateFakeSpectrum(s.sp_class ? s.sp_class.toLowerCase() : 'star');
                        if(window.logTitan) window.logTitan(`[ASTROMETRÍA] Estrella real identificada: ${s.name} (${s.sp_class}, ${s.dist_ly} ly)`);
                        handled = true;
                        break;
                    }
                }

                // Named objects (planets, SIMBAD)
                if (!handled && obj.userData && (obj.userData.name || obj.userData.isNEO)) {
                    this.displayAstrometryData(obj);
                    handled = true;
                    break;
                }
            }

            // Fallback: space coordinates
            if (!handled && intersects.length > 0) {
                const pt = intersects[0].point;
                document.getElementById('astro-status').innerText = 'Punto espacial capturado.';
                document.getElementById('astro-data').style.display = 'flex';
                document.getElementById('astro-name').innerText = `Coordenadas (${pt.x.toFixed(1)}, ${pt.y.toFixed(1)}, ${pt.z.toFixed(1)})`;
                document.getElementById('astro-class').innerText = 'Clase: Vacío Interestelar';
                document.getElementById('astro-temp').innerText = 'Temperatura: 2.7 K (CMB)';
                document.getElementById('astro-mass').innerText = 'Masa: 0';
                this.generateFakeSpectrum('star');
                if(window.logTitan) window.logTitan(`[ASTROMETRÍA] Punto en el vacío capturado.`);
            }
            const pt = intersects[0].point;
            const objName = (intersects[0].object.userData && intersects[0].object.userData.name) ? intersects[0].object.userData.name : "Punto Espacial";
            
            if (!this.measurePointA) {
                this.measurePointA = pt;
                document.getElementById('measure-a').innerText = objName;
                document.getElementById('measure-status').innerText = "Haz clic en el Punto B...";
            } else if (!this.measurePointB) {
                this.measurePointB = pt;
                document.getElementById('measure-b').innerText = objName;
                document.getElementById('measure-status').innerText = "Medición Láser Completada.";
                
                // Draw Line
                const mat = new THREE.LineBasicMaterial({ color: 0x00ff88, linewidth: 2 });
                const pts = [this.measurePointA, this.measurePointB];
                const geo = new THREE.BufferGeometry().setFromPoints(pts);
                this.measureLine = new THREE.Line(geo, mat);
                window.scene.add(this.measureLine);
                
                // Calculate Distance
                const distUnits = this.measurePointA.distanceTo(this.measurePointB);
                const distAU = (distUnits * 0.1).toFixed(3); // Escala arbitraria del lab para AU
                document.getElementById('measure-result').innerText = `${distAU} UA`;
                if (window.logTitan) window.logTitan(`[TELEMETRÍA] Enlace láser medido: ${distAU} UA.`);
            }
        }
    },

    displayAstrometryData: function(obj) {
        document.getElementById('astro-status').innerText = "Análisis Espectral Completado.";
        document.getElementById('astro-data').style.display = 'flex';
        
        const name = obj.userData.name || "Objeto Desconocido";
        document.getElementById('astro-name').innerText = name;
        
        if (obj.userData.isNEO) {
            document.getElementById('astro-class').innerText = `Clase: NEO (${obj.userData.classType || 'Rocoso'})`;
            document.getElementById('astro-temp').innerText = "Temperatura: ~200 K (Radiación Solar)";
            document.getElementById('astro-mass').innerText = `Masa Estimada: ${obj.userData.radius || 'Desconocida'}`;
            this.generateFakeSpectrum('rock');
        } else {
            // Assume Star
            const spType = obj.userData.sp_type || "G";
            document.getElementById('astro-class').innerText = `Clase Espectral: ${spType}`;
            
            // Map spectral type to temp roughly
            let temp = "5800 K";
            let type = "star";
            if (spType.startsWith("O")) { temp = "30000+ K"; type = "blue"; }
            else if (spType.startsWith("B")) { temp = "10000 - 30000 K"; type = "blue"; }
            else if (spType.startsWith("A")) { temp = "7500 - 10000 K"; type = "white"; }
            else if (spType.startsWith("F")) { temp = "6000 - 7500 K"; type = "yellow-white"; }
            else if (spType.startsWith("G")) { temp = "5200 - 6000 K"; type = "yellow"; }
            else if (spType.startsWith("K")) { temp = "3700 - 5200 K"; type = "orange"; }
            else if (spType.startsWith("M")) { temp = "2400 - 3700 K"; type = "red"; }
            
            document.getElementById('astro-temp').innerText = `Temperatura Superficial: ${temp}`;
            document.getElementById('astro-mass').innerText = `Masa Estimada: ${obj.userData.masa || '1.0'} M☉`;
            
            this.generateFakeSpectrum(type);
        }
        
        if(window.logTitan) window.logTitan(`[ASTROMETRÍA] Datos extraídos de: ${name}`);
    },

    generateFakeSpectrum: function(type) {
        const lines = document.getElementById('astro-spectral-lines');
        if (!lines) return;
        
        if (type === 'rock') {
            lines.style.background = "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.9) 20px, rgba(0,0,0,0.9) 25px)";
        } else if (type === 'blue') {
            lines.style.background = "repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.8) 10px, rgba(0,0,0,0.8) 12px, transparent 12px, transparent 40px, rgba(0,0,0,0.9) 40px, rgba(0,0,0,0.9) 45px)";
        } else if (type === 'red') {
            lines.style.background = "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(0,0,0,0.9) 30px, rgba(0,0,0,0.9) 32px, transparent 32px, transparent 50px, rgba(0,0,0,0.9) 50px, rgba(0,0,0,0.9) 54px)";
        } else {
            lines.style.background = "repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.8) 15px, rgba(0,0,0,0.8) 17px)";
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => { LabOS.init(); }, 1500);
});
