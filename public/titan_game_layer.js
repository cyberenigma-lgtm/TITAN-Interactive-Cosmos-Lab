/**
 * ============================================================================
 * TITAN RPG ENGINE — EXPANSION: OGAME & SPACECRAFT
 * Módulos integrados: SpacecraftModule, GameProgressionModule, SpaceEconomyModule
 * ============================================================================
 */

window.TITAN = window.TITAN || {};
window.TITAN.GameLayer = window.TITAN.GameLayer || {};

// ============================================================================
// 1. GAME PROGRESSION MODULE
// ============================================================================
window.TITAN.GameLayer.Progression = {
    level: 1,
    xp: 0,
    discoveredPlanets: new Set(),
    discoveredSystems: new Set(),
    unlockedShips: [1], // Niveles de naves desbloqueados
    
    initProgression: function() {
        console.log("[TITAN RPG] Iniciando motor de progresión...");
        this.updateUI();
    },
    
    addXP: function(amount) {
        this.xp += amount;
        if(window.logTitan) window.logTitan(`[RPG] Has ganado +${amount} XP.`);
        this.checkLevelUp();
        this.updateUI();
        
        // Sincronización con el Ránking Global (Firebase)
        if (window.TITAN && window.TITAN.Leaderboard) {
            window.TITAN.Leaderboard.updateScore(this.level, this.xp);
        }
    },
    
    checkLevelUp: function() {
        const threshold = this.level * 1000;
        if (this.xp >= threshold) {
            this.level++;
            if(window.logTitan) window.logTitan(`[RPG] ¡SUBIDA DE NIVEL! Nivel actual: ${this.level}`);
            this.unlockShip(this.level);
        }
    },
    
    unlockShip: function(level) {
        if (!this.unlockedShips.includes(level)) {
            this.unlockedShips.push(level);
            if(window.logTitan) window.logTitan(`[RPG] 🚀 ¡NUEVA NAVE DESBLOQUEADA! Nivel de Nave: ${level}`);
            window.TITAN.GameLayer.Spacecraft.upgradeShip(level);
        }
    },
    
    discoverPlanet: function(planetName, planetType) {
        if (!this.discoveredPlanets.has(planetName)) {
            this.discoveredPlanets.add(planetName);
            let xpGained = 50;
            if (planetType === 'GasGiant') xpGained = 75;
            if (planetType === 'Moon') xpGained = 25;
            
            if(window.logTitan) window.logTitan(`[DESCUBRIMIENTO] Has descubierto el planeta: ${planetName} (+${xpGained} XP)`);
            
            // Añadir recursos por descubrimiento
            window.TITAN.GameLayer.Economy.addResource('AstronomicalData', 100);
            
            this.addXP(xpGained);
            this.updateUI();
            
            // Mostrar etiqueta visual (requiere inyección en space_engine.js)
            window.dispatchEvent(new CustomEvent('titanPlanetDiscovered', { detail: planetName }));
        }
    },
    
    updateUI: function() {
        const ui = document.getElementById('rpg-xp-ui');
        if (ui) {
            ui.innerText = `NIVEL: ${this.level} | XP: ${this.xp}`;
        }
    },
    
    updateProgressionPhysics: function(cameraPos) {
        if (typeof THREE === 'undefined' || !window.scene) return;
        
        // 1. Radar de Proximidad: Detectar planetas/estrellas no descubiertos
        const discoveryRadius = 150.0; // Rango del radar
        window.scene.traverse((obj) => {
            if (obj.isMesh && obj.userData && obj.userData.name) {
                const name = obj.userData.name;
                if (!this.discoveredPlanets.has(name)) {
                    const worldPos = new THREE.Vector3();
                    obj.getWorldPosition(worldPos);
                    
                    if (cameraPos.distanceTo(worldPos) < discoveryRadius) {
                        // Descubrimiento!
                        this.discoveredPlanets.add(name);
                        
                        let xpGained = 50;
                        if (obj.userData.isStar) xpGained = 150;
                        if (name.includes("Agujero Negro") || obj.userData.isBlackHole) xpGained = 500;
                        
                        if(window.logTitan) window.logTitan(`[RADAR] 🪐 ¡NUEVO DESCUBRIMIENTO! Has escaneado: ${name} (+${xpGained} XP)`);
                        
                        // Añadir recursos pasivos por mapeo
                        if (window.TITAN.GameLayer.Economy) {
                            window.TITAN.GameLayer.Economy.addResource('AstronomicalData', 200);
                        }
                        
                        this.addXP(xpGained);
                        this.updateUI();
                    }
                }
            }
        });
        
        // 2. Niebla de Guerra: Ocultar etiquetas de objetos NO descubiertos
        const labels = document.querySelectorAll('.planet-label, .star-label');
        const isGameActive = window.TITAN.GameLayer.Spacecraft && window.TITAN.GameLayer.Spacecraft.isActive;
        
        labels.forEach(label => {
            // Extraer el nombre puro limpiando posibles etiquetas HTML internas
            const rawText = label.textContent || label.innerText;
            
            let isDiscovered = false;
            // Verificar si alguna parte del texto coincide con un nombre descubierto
            this.discoveredPlanets.forEach(discName => {
                if (rawText.includes(discName)) {
                    isDiscovered = true;
                }
            });
            
            // Si el juego está activo y NO está descubierto, forzar ocultación
            // El motor base intentará mostrarlo, así que lo sobreescribimos con !important si hace falta
            // o simplemente manipulamos el display.
            if (isGameActive && !isDiscovered) {
                label.style.visibility = 'hidden';
            } else {
                label.style.visibility = 'visible'; // Deja que el motor decida el opacity/display real
            }
        });
    }
};

// ============================================================================
// 2. SPACE ECONOMY MODULE (OGame Style)
// ============================================================================
window.TITAN.GameLayer.Economy = {
    resources: {
        Metal: 0,
        Crystals: 0,
        Deuterium: 0,
        RecycledJunk: 0,
        AstronomicalData: 0
    },
    stationLevel: 0,
    activeDebris: [], // Almacena la basura espacial física
    stationMesh: null,
    
    // Variables de Mecánicas Avanzadas
    resourceMultiplier: 1,
    multiplierTimer: 0, // Segundos restantes
    drainTimer: 0, // Temporizador para el Drain (Mantenimiento Warp)
    lastTime: performance.now(),
    
    getMaxCapacity: function() {
        const shipType = (window.TITAN.GameLayer.Spacecraft && window.TITAN.GameLayer.Spacecraft.currentShipType) || 'MULE';
        const shipLvl = (window.TITAN.GameLayer.Spacecraft && window.TITAN.GameLayer.Spacecraft.shipLevel) || 1;
        
        let baseCapacity = 5000;
        if (shipType === 'MULE') baseCapacity = 25000; // Pasiva: Capacidad Masiva
        if (shipType === 'VOYAGER') baseCapacity = 2500;
        if (shipType === 'CORSAIR') baseCapacity = 1500;
        
        return shipLvl * baseCapacity;
    },
    
    getTotalCargo: function() {
        return this.resources.Metal + this.resources.Crystals + this.resources.RecycledJunk;
    },
    
    initEconomy: function() {
        console.log("[TITAN RPG] Iniciando motor de economía y astilleros...");
        this.buildOrbitalStation();
        this.updateUI();
    },
    
    addResource: function(type, amount) {
        if (this.resources[type] !== undefined) {
            // Comprobar límite de bóveda para metales, cristales y chatarra
            if (['Metal', 'Crystals', 'RecycledJunk'].includes(type)) {
                const spaceLeft = this.getMaxCapacity() - this.getTotalCargo();
                if (spaceLeft <= 0) return false; // Bóveda Llena
                if (amount > spaceLeft) amount = spaceLeft; // Llenar al ras
            }
            this.resources[type] += amount;
            this.updateUI();
            return true;
        }
        return false;
    },
    
    spawnSpaceDebris: function(position) {
        if (typeof THREE === 'undefined') return;
        
        const rand = Math.random();
        const isAnomaly = rand < 0.05; // 5% de que sea una Mina de Oro
        const isHazard = rand >= 0.05 && rand < 0.20; // 15% Amenaza (Pirata / Asteroide Denso)
        
        const size = isAnomaly ? 3 : (isHazard ? 5 : (Math.random() * 2 + 1));
        const geo = new THREE.DodecahedronGeometry(size, 0);
        
        let mat;
        if (isAnomaly) {
            mat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 1.0, roughness: 0.1, emissive: 0xffaa00, emissiveIntensity: 0.5 });
        } else if (isHazard) {
            mat = new THREE.MeshStandardMaterial({ color: 0xaa2222, metalness: 0.5, roughness: 0.8, emissive: 0x550000, emissiveIntensity: 0.8 });
        } else {
            mat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.4 });
        }
        
        const mesh = new THREE.Mesh(geo, mat);
        
        if (isAnomaly) {
            const light = new THREE.PointLight(0xffd700, 2, 50);
            mesh.add(light);
            mesh.userData.isAnomaly = true;
        } else if (isHazard) {
            const light = new THREE.PointLight(0xff0000, 2, 20);
            mesh.add(light);
            mesh.userData.isHazard = true;
        }
        
        mesh.position.copy(position);
        mesh.position.x += (Math.random() - 0.5) * 50;
        mesh.position.y += (Math.random() - 0.5) * 50;
        mesh.position.z += (Math.random() - 0.5) * 50;
        
        mesh.userData.rotX = Math.random() * 0.05;
        mesh.userData.rotY = Math.random() * 0.05;
        mesh.userData.isDebris = true;
        
        if (window.scene) window.scene.add(mesh);
        this.activeDebris.push(mesh);
    },
    
    updateDebrisPhysics: function(cameraPos) {
        // Actualizar temporizador del multiplicador
        const now = performance.now();
        const dtSec = (now - this.lastTime) / 1000;
        this.lastTime = now;
        
        if (this.multiplierTimer > 0) {
            this.multiplierTimer -= dtSec;
            if (this.multiplierTimer <= 0) {
                this.multiplierTimer = 0;
                this.resourceMultiplier = 1;
                if(window.logTitan) window.logTitan("[ECONOMÍA] El pulso del Multiplicador ha expirado.");
                this.updateUI();
            }
        }
        
        const isVaultFull = this.getTotalCargo() >= this.getMaxCapacity();
        
        const shipType = (window.TITAN.GameLayer.Spacecraft && window.TITAN.GameLayer.Spacecraft.currentShipType) || 'MULE';
        
        // DRAIN (Quema / Mantenimiento)
        // Consumir CHR pasivamente como "Combustible Warp" cuando la nave se mueve a alta velocidad
        if (window.TITAN.GameLayer.Spacecraft && window.TITAN.GameLayer.Spacecraft.isActive && Math.abs(window.TITAN.GameLayer.Spacecraft.velocity) > 0.1) {
            let drainThreshold = 10.0;
            if (shipType === 'CORSAIR') drainThreshold = 20.0; // Pasiva: 50% menos consumo Warp
            
            this.drainTimer += dtSec;
            if (this.drainTimer > drainThreshold) { // Cada X segundos de vuelo
                this.drainTimer = 0;
                if (window.TITAN.TokenomicsLayer) {
                    window.TITAN.TokenomicsLayer.burnCHR(1, "Mantenimiento Warp");
                }
            }
        }
        
        // Venta Automática en la Estación Orbital (Tierra / [0,0,0]) - FAUCET
        const distToBase = cameraPos.length(); // Distancia al origen
        if (distToBase < 200.0 && this.getTotalCargo() > 0) {
            // Calcular valor en CHR (10% del valor ponderado del cargamento)
            const valueTotal = (this.resources.Metal * 2) + (this.resources.Crystals * 3) + (this.resources.RecycledJunk * 1);
            const chrGained = Math.floor(valueTotal * 0.1);
            
            // Vaciar bóveda
            this.resources.Metal = 0;
            this.resources.Crystals = 0;
            this.resources.RecycledJunk = 0;
            
            if (chrGained > 0 && window.TITAN.TokenomicsLayer) {
                window.TITAN.TokenomicsLayer.mintCHR(chrGained);
                if(window.TITAN.GameLayer.Progression) {
                    window.TITAN.GameLayer.Progression.addXP(Math.floor(chrGained * 0.5));
                }
            }
            this.updateUI();
        }
        
        for (let i = this.activeDebris.length - 1; i >= 0; i--) {
            let debris = this.activeDebris[i];
            debris.rotation.x += debris.userData.rotX;
            debris.rotation.y += debris.userData.rotY;
            
            let collectRadius = 20.0;
            if (shipType === 'MULE') collectRadius = 60.0; // Pasiva: Imán de basura
            
            // Detección colisión LÁSERES
            if (window.TITAN.GameLayer.Spacecraft && window.TITAN.GameLayer.Spacecraft.lasers) {
                let laserHit = false;
                for (let j = window.TITAN.GameLayer.Spacecraft.lasers.length - 1; j >= 0; j--) {
                    const laser = window.TITAN.GameLayer.Spacecraft.lasers[j];
                    if (laser.position.distanceTo(debris.position) < (debris.geometry.parameters.radius || 5) * 1.5) {
                        // HIT!
                        if (window.scene) window.scene.remove(laser);
                        window.TITAN.GameLayer.Spacecraft.lasers.splice(j, 1);
                        
                        if (debris.userData.isHazard) {
                            if(window.logTitan) window.logTitan("💥 ¡AMENAZA DESTRUIDA! Recompensa: +100 CHR");
                            if (window.TITAN.TokenomicsLayer) window.TITAN.TokenomicsLayer.mintCHR(100);
                        } else if (debris.userData.isAnomaly) {
                             if(window.logTitan) window.logTitan("❌ Has destruido una anomalía científica con los láseres...");
                        } else {
                             if(window.logTitan) window.logTitan("💥 Basura espacial vaporizada.");
                        }
                        
                        this.removeDebris(debris, i);
                        laserHit = true;
                        break;
                    }
                }
                if (laserHit) continue;
            }
            
            // Detección de colisión (Nave)
            if (cameraPos.distanceTo(debris.position) < collectRadius) {
                if (debris.userData.isHazard) {
                     // Daño al escudo o casco
                     if (window.TITAN.GameLayer.Spacecraft) {
                         window.TITAN.GameLayer.Spacecraft.shield -= 25;
                         if (window.TITAN.GameLayer.Spacecraft.shield < 0) {
                             window.TITAN.GameLayer.Spacecraft.hull += window.TITAN.GameLayer.Spacecraft.shield;
                             window.TITAN.GameLayer.Spacecraft.shield = 0;
                         }
                         if(window.logTitan) window.logTitan("⚠️ ¡IMPACTO! Escudos dañados.");
                         if (window.TITAN.GameLayer.Spacecraft.hull <= 0) {
                             if(window.logTitan) window.logTitan("💀 FALLO ESTRUCTURAL CRÍTICO. SISTEMAS OFFLINE.");
                         }
                     }
                     this.removeDebris(debris, i);
                } else if (debris.userData.isAnomaly) {
                    // Recoger anomalía SIEMPRE (ignora la bóveda temporalmente o da un plus masivo)
                    this.resources.Metal += 1000; // Bonus duro
                    this.resources.Crystals += 500;
                    if (window.TITAN.TokenomicsLayer) {
                        let oikReward = 50;
                        if (shipType === 'VOYAGER') oikReward = 150; // Pasiva: Escáner profundo (x3 OIK)
                        window.TITAN.TokenomicsLayer.mintOIK(oikReward);
                    }
                    this.resourceMultiplier = 2; // Multiplicador x2
                    this.multiplierTimer = 300; // 5 Minutos (300 segundos)
                    
                    this.removeDebris(debris, i);
                } else {
                    // Basura normal
                    if (!isVaultFull) {
                        const junkAmt = Math.floor((10 + Math.random()*20) * this.resourceMultiplier);
                        const metAmt = Math.floor((5 + Math.random()*15) * this.resourceMultiplier);
                        
                        let collected1 = this.addResource('RecycledJunk', junkAmt);
                        let collected2 = this.addResource('Metal', metAmt);
                        
                        if (collected1 || collected2) {
                            // if(window.logTitan) window.logTitan("[ECONOMÍA] Basura espacial recolectada.");
                            this.removeDebris(debris, i);
                        }
                    } else {
                        // Bóveda Llena: Los asteroides rebotan gráficamente
                        debris.position.add(cameraPos.clone().sub(debris.position).normalize().multiplyScalar(-2)); 
                    }
                }
            }
        }
    },
    
    removeDebris: function(debris, index) {
        if (window.scene) window.scene.remove(debris);
        if (window.disposeHierarchy) window.disposeHierarchy(debris);
        this.activeDebris.splice(index, 1);
        this.updateUI();
    },
    
    updateUI: function() {
        const ui = document.getElementById('economy-ui');
        if (ui) {
            const vaultClass = this.getTotalCargo() >= this.getMaxCapacity() ? "color:#f00; animation: blink 1s infinite;" : "color:#fff;";
            let multiHtml = this.resourceMultiplier > 1 ? `<span style="color:#ffd700; font-weight:bold; margin-left:15px; border:1px solid gold; padding:2px 5px; border-radius:3px;">⚡ x${this.resourceMultiplier} (${Math.ceil(this.multiplierTimer)}s)</span>` : "";
            
            let chrBal = window.TITAN.TokenomicsLayer ? window.TITAN.TokenomicsLayer.wallet.CHR : 0;
            let oikBal = window.TITAN.TokenomicsLayer ? window.TITAN.TokenomicsLayer.wallet.OIK : 0;
            
            ui.innerHTML = `
                <style>@keyframes blink { 50% { opacity: 0.3; } }</style>
                <span style="color:#00ffff; font-weight:bold; font-size:16px;">CHR: ${Math.floor(chrBal)}</span> |
                <span style="color:#ff00aa; font-weight:bold; font-size:16px;">OIK: ${Math.floor(oikBal)}</span> |
                <span style="color:#a8b2c1">MET:</span> ${Math.floor(this.resources.Metal)} |
                <span style="color:#4cc9f0">CRI:</span> ${Math.floor(this.resources.Crystals)} |
                <span style="color:#888888">CHAT:</span> ${Math.floor(this.resources.RecycledJunk)} 
                <br>
                <span style="${vaultClass} font-size: 12px;">CARGA BÓVEDA: ${Math.floor(this.getTotalCargo())} / ${this.getMaxCapacity()}</span>
                ${multiHtml}
            `;
        }
    },
    
    buildOrbitalStation: function() {
        if (typeof THREE === 'undefined') return;
        
        // Crear la Mega-Estación Orbital basada en el concepto de Biodomo Dodecaédrico
        this.stationMesh = new THREE.Group();
        
        // 1. Estructura Externa (Exoesqueleto Dodecaédrico)
        const frameGeo = new THREE.DodecahedronGeometry(100, 1);
        const frameMat = new THREE.MeshStandardMaterial({
            color: 0x223344,
            metalness: 0.9,
            roughness: 0.1,
            wireframe: true // Usamos wireframe para hacer las grandes vigas
        });
        const exoFrame = new THREE.Mesh(frameGeo, frameMat);
        
        // 2. Paneles de Cristal (Ventanas del Biodomo)
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0x88ccff,
            metalness: 0.1,
            roughness: 0.1,
            transmission: 0.9,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const glassDome = new THREE.Mesh(frameGeo, glassMat);
               // 3. Ecosistema Interno (Ciudad / Naturaleza)
        const coreGeo = new THREE.IcosahedronGeometry(60, 2);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x113322, metalness: 0.2, roughness: 0.8
        });
        const innerCore = new THREE.Mesh(coreGeo, coreMat);
        
        // 4. Mejoras Dinámicas por Nivel
        if (this.stationLevel >= 1) {
            // Nivel 1: Radar de Largo Alcance
            const radarGeo = new THREE.CylinderGeometry(40, 10, 20, 16);
            const radarMat = new THREE.MeshStandardMaterial({ color: 0x88aaee, wireframe: true });
            const radar = new THREE.Mesh(radarGeo, radarMat);
            radar.position.set(0, 100, 0);
            this.stationMesh.add(radar);
        }
        
        if (this.stationLevel >= 2) {
            // Nivel 2: Refinería Pasiva (Núcleo brillante)
            const refineryGeo = new THREE.SphereGeometry(30, 32, 32);
            const refineryMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, wireframe: true });
            const refinery = new THREE.Mesh(refineryGeo, refineryMat);
            const glowLight = new THREE.PointLight(0xffaa00, 5, 200);
            refinery.add(glowLight);
            this.stationMesh.add(refinery);
        }
        
        this.stationMesh.add(exoFrame);
        this.stationMesh.add(glassDome);
        this.stationMesh.add(innerCore);
        // 3. Ecosistema Interno (Ciudad / Naturaleza)
        // Simulamos el núcleo verde y urbano dentro del dodecaedro
        const coreGeoOld = new THREE.IcosahedronGeometry(75, 2);
        const coreMatOld = new THREE.MeshStandardMaterial({
            color: 0x2d5a27, // Verde vegetación
            metalness: 0.2,
            roughness: 0.8
        });
        const ecoCore = new THREE.Mesh(coreGeoOld, coreMatOld);
        
        // Luces internas de la ciudad
        const cityLights = new THREE.PointLight(0xffddaa, 2, 200);
        
        this.stationMesh.add(ecoCore);
        this.stationMesh.add(cityLights);
        
        // Posicionar la estación cerca de la Tierra (asumiendo que la Tierra está cerca del origen o en una coordenada fija)
        // La pondremos en una órbita alta visible (X: 200, Y: 100, Z: -300)
        this.stationMesh.position.set(200, 100, -300);
        this.stationMesh.visible = false; // Oculta por defecto fuera del modo juego
        
        if (window.scene) {
            window.scene.add(this.stationMesh);
        }
    }
};

// ============================================================================
// 3. UNIVERSE GENERATOR (INFINITE PROCEDURAL CHUNKS)
// ============================================================================
window.TITAN.GameLayer.UniverseGenerator = {
    chunkSize: 10000.0, // Tamaño de cada cuadrícula cósmica
    activeChunks: new Map(), // key: 'X_Y_Z', value: THREE.Group
    
    // Función hash pseudo-aleatoria determinista
    pseudoRandom: function(seed) {
        let x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    },
    
    update: function(cameraPos) {
        if (typeof THREE === 'undefined' || !window.scene) return;
        
        // Calcular en qué Chunk estamos
        const cx = Math.floor(cameraPos.x / this.chunkSize);
        const cy = Math.floor(cameraPos.y / this.chunkSize);
        const cz = Math.floor(cameraPos.z / this.chunkSize);
        
        // Radio de carga: 1 chunk adyacente (3x3x3 = 27 chunks máximo activos)
        const renderDistance = 1;
        const requiredChunks = new Set();
        
        for (let dx = -renderDistance; dx <= renderDistance; dx++) {
            for (let dy = -renderDistance; dy <= renderDistance; dy++) {
                for (let dz = -renderDistance; dz <= renderDistance; dz++) {
                    // Evitar poblar la zona central (nuestro sistema solar base del laboratorio)
                    if (Math.abs(cx+dx) < 2 && Math.abs(cy+dy) < 2 && Math.abs(cz+dz) < 2) continue;
                    
                    const chunkKey = `${cx+dx}_${cy+dy}_${cz+dz}`;
                    requiredChunks.add(chunkKey);
                    
                    if (!this.activeChunks.has(chunkKey)) {
                        this.generateChunk(cx+dx, cy+dy, cz+dz, chunkKey);
                    }
                }
            }
        }
        
        // Garbage Collection: Descargar cuadrantes lejanos de la GPU y RAM
        for (let [key, group] of this.activeChunks.entries()) {
            if (!requiredChunks.has(key)) {
                window.scene.remove(group);
                if (window.disposeHierarchy) window.disposeHierarchy(group);
                this.activeChunks.delete(key);
                // if(window.logTitan) window.logTitan(`[MEMORIA] Cuadrante lejano ${key} descargado.`);
            }
        }
    },
    
    generateChunk: function(cx, cy, cz, key) {
        // Semilla matemática basada en coordenadas
        let seed = (cx * 73856093) ^ (cy * 19349663) ^ (cz * 83492791);
        
        // 50% de que el cuadrante esté completamente vacío
        if (this.pseudoRandom(seed++) > 0.5) {
            this.activeChunks.set(key, new THREE.Group()); 
            return;
        }
        
        const group = new THREE.Group();
        const baseX = cx * this.chunkSize;
        const baseY = cy * this.chunkSize;
        const baseZ = cz * this.chunkSize;
        
        // 1 a 3 sistemas solares por chunk habitado
        const numSystems = 1 + Math.floor(this.pseudoRandom(seed++) * 3);
        const starColors = [0xffaa00, 0xff3333, 0x88ccff, 0xffffff, 0x00ffff];
        
        for(let i=0; i<numSystems; i++) {
            const sColor = starColors[Math.floor(this.pseudoRandom(seed++) * starColors.length)];
            const sSize = 200 + this.pseudoRandom(seed++) * 800; // Estrellas masivas
            
            const sGeo = new THREE.SphereGeometry(sSize, 32, 32);
            const sMat = new THREE.MeshBasicMaterial({ color: sColor });
            const sMesh = new THREE.Mesh(sGeo, sMat);
            
            // Distribuir de forma pseudoaleatoria dentro del cuadrante
            const rx = (this.pseudoRandom(seed++) - 0.5) * this.chunkSize * 0.9;
            const ry = (this.pseudoRandom(seed++) - 0.5) * this.chunkSize * 0.9;
            const rz = (this.pseudoRandom(seed++) - 0.5) * this.chunkSize * 0.9;
            
            sMesh.position.set(baseX + rx, baseY + ry, baseZ + rz);
            
            // Corona/Halo brillante
            const spriteMat = new THREE.SpriteMaterial({ 
                map: new THREE.TextureLoader().load('./textures/lensflare0.png'), // Si existe, o degradará suave
                color: sColor, transparent: true, blending: THREE.AdditiveBlending 
            });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(sSize*4, sSize*4, 1);
            sMesh.add(sprite);
            
            const light = new THREE.PointLight(sColor, 3, 50000);
            sMesh.add(light);
            
            sMesh.userData = { 
                name: `X-Sys [${cx},${cy},${cz}]-${i}`, 
                isStar: true 
            };
            
            group.add(sMesh);
            
            // Generar planetas procedimentales orbitando
            const numPlanets = Math.floor(this.pseudoRandom(seed++) * 6);
            for(let p=0; p<numPlanets; p++) {
                const pColor = new THREE.Color().setHSL(this.pseudoRandom(seed++), 0.8, 0.4);
                const pSize = 10 + this.pseudoRandom(seed++) * 50;
                const pDist = sSize * 2.5 + this.pseudoRandom(seed++) * 3000;
                
                const pGeo = new THREE.SphereGeometry(pSize, 16, 16);
                const pMat = new THREE.MeshStandardMaterial({ color: pColor, roughness: 0.8, metalness: 0.2 });
                const pMesh = new THREE.Mesh(pGeo, pMat);
                
                const angle = this.pseudoRandom(seed++) * Math.PI * 2;
                pMesh.position.set(
                    sMesh.position.x + Math.cos(angle) * pDist,
                    sMesh.position.y + (this.pseudoRandom(seed++) - 0.5) * 400,
                    sMesh.position.z + Math.sin(angle) * pDist
                );
                
                pMesh.userData = {
                    name: `Exomundo ${p+1} (${sMesh.userData.name})`,
                    isPlanet: true
                };
                
                group.add(pMesh);
            }
        }
        
        window.scene.add(group);
        this.activeChunks.set(key, group);
        if(window.logTitan) window.logTitan(`[UNIVERSO] Cuadrante profundo explorado: ${key}`);
    }
};

// ============================================================================
// 4. SPACECRAFT MODULE (TITAN-CRAFT)
// ============================================================================
window.TITAN.GameLayer.Spacecraft = {
    isActive: false,
    autoPilot: false, // Control de Crucero
    shipLevel: 1,
    
    // SISTEMA DE FLOTA (Naves Múltiples)
    currentShipType: 'MULE',
    shipProfiles: {
        'MULE': { name: 'CARGUERO PESADO (MULE)', maxSpeed: 2.0, turnSpeed: 0.002, cargoBase: 5000, turboEff: 1.0, color: 0xffaa00 },
        'VOYAGER': { name: 'SONDA CIENTÍFICA (VOYAGER)', maxSpeed: 9.0, turnSpeed: 0.006, cargoBase: 100, turboEff: 1.0, color: 0x00ffff },
        'CORSAIR': { name: 'CAZA LIGERO (CORSAIR)', maxSpeed: 5.0, turnSpeed: 0.004, cargoBase: 1500, turboEff: 0.5, color: 0xff0055 }
    },
    
    velocity: 0,
    maxSpeed: 2.0, // Se actualizará al cambiar de nave
    acceleration: 0.02,
    rotationSpeed: 0.002, // Se actualizará al cambiar de nave
    
    // Vectores direccionales
    pitch: 0,
    yaw: 0,
    
    // Sistema Dual de Cámara y Malla
    cameraMode: '1st', // '1st' o '3rd'
    
    // Combate y Defensa
    shield: 100,
    hull: 100,
    lasers: [],
    
    cockpitOverlay: null,
    
    keys: { W:false, A:false, S:false, D:false, Shift:false, Space:false, V:false, P:false },
    
    initSpacecraft: function() {
        console.log("[TITAN-CRAFT] Inicializando sistemas de vuelo y chasis...");
        
        this.buildShipMesh();
        this.buildCockpitOverlay();
        
        // Listeners de teclado
        window.addEventListener('keydown', (e) => this.handleKey(e, true));
        window.addEventListener('keyup', (e) => this.handleKey(e, false));
        
        // Mouse look (Arrastre / FPS)
        document.addEventListener('mousemove', (e) => {
            if (!this.isActive || document.pointerLockElement !== document.body) return;
            this.yaw -= e.movementX * this.rotationSpeed;
            this.pitch -= e.movementY * this.rotationSpeed;
            // Limitar pitch para no dar vueltas de campana excesivas
            this.pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.pitch));
        });
        
        document.addEventListener('mousedown', () => {
            if (this.isActive && document.pointerLockElement !== document.body) {
                document.body.requestPointerLock();
            }
        });
        
        // Botón de activación en UI
        const btn = document.getElementById('btn-titan-craft');
        if (btn) {
            btn.addEventListener('click', () => {
                if (this.isActive) this.deactivate();
                else this.activate();
            });
        }
    },
    
    activate: function() {
        this.isActive = true;
        if (window.controls) {
            window.controls.enabled = false; // Desactivar OrbitControls
        }
        
        const canvas = document.querySelector('canvas');
        if (canvas) canvas.requestPointerLock();
        
        const ui = document.getElementById('craft-hud-container');
        if (ui) ui.style.display = 'block';
        
        if (this.shipMesh) this.shipMesh.visible = true;
        if (this.cameraMode === '1st' && this.cockpitOverlay) {
            this.cockpitOverlay.style.display = 'block';
            if (this.shipMesh) this.shipMesh.visible = false; // No renderizar la nave si estamos dentro
        }
        
        // Sincronizar posición de la nave con la cámara actual al activar
        if (this.shipMesh && window.camera) {
            this.shipMesh.position.copy(window.camera.position);
            this.shipMesh.quaternion.copy(window.camera.quaternion);
        }
        
        // Ocultar Interfaz Científica del Laboratorio
        const labPanels = document.querySelectorAll('.lab-panel, .obs-panel, .glass-header, #info-panel');
        labPanels.forEach(p => p.style.opacity = '0');
        labPanels.forEach(p => p.style.pointerEvents = 'none');
        
        // Forzar motor a modo LIVE a velocidad 0.1 para que el universo no gire de forma descontrolada
        const liveBtn = document.getElementById('live-btn');
        if (liveBtn) liveBtn.click();
        const speedSlider = document.getElementById('speed-slider');
        if (speedSlider) { 
            speedSlider.value = 1; 
            speedSlider.dispatchEvent(new Event('input')); 
        }
        
        // Mostrar la Estación Orbital
        if (window.TITAN.GameLayer.Economy.stationMesh) {
            window.TITAN.GameLayer.Economy.stationMesh.visible = true;
        }
        
        if(window.logTitan) window.logTitan("[TITAN-CRAFT] Sistemas en línea. Mando manual activado.");
    },
    
    deactivate: function() {
        this.isActive = false;
        if (window.controls) {
            window.controls.enabled = true; // Reactivar OrbitControls
        }
        if (document.exitPointerLock) document.exitPointerLock();
        
        const ui = document.getElementById('craft-hud-container');
        if (ui) ui.style.display = 'none';
        
        if (this.shipMesh) this.shipMesh.visible = false;
        if (this.cockpitOverlay) this.cockpitOverlay.style.display = 'none';
        
        // Restaurar Interfaz Científica del Laboratorio
        const labPanels = document.querySelectorAll('.lab-panel, .obs-panel, .glass-header, #info-panel');
        labPanels.forEach(p => p.style.opacity = '1');
        labPanels.forEach(p => p.style.pointerEvents = 'auto');
        
        // Ocultar la Estación Orbital
        if (window.TITAN.GameLayer.Economy.stationMesh) {
            window.TITAN.GameLayer.Economy.stationMesh.visible = false;
        }
        
        if(window.logTitan) window.logTitan("[TITAN-CRAFT] Piloto Automático activado. Mando manual desactivado.");
    },
    
    upgradeShip: function(level) {
        this.shipLevel = level;
        this.maxSpeed = 5.0 * level;
        this.acceleration = 0.2 * level;
    },
    
    handleKey: function(e, isDown) {
        if (!this.isActive) return;
        
        const k = e.code;
        if (k === 'KeyW') { 
            this.keys.W = isDown; 
            if (isDown) this.autoPilot = false; // Desactivar crucero al tocar el acelerador
        }
        if (k === 'KeyS') this.keys.S = isDown;
        if (k === 'KeyA') this.keys.A = isDown;
        if (k === 'KeyD') this.keys.D = isDown;
        if (k === 'ShiftLeft' || k === 'ShiftRight') this.keys.Shift = isDown;
        if (k === 'Space') { 
            this.keys.Space = isDown; 
            if (isDown) this.autoPilot = false; // Freno desactiva crucero
        }
        
        if (k === 'KeyP' && isDown) {
            this.autoPilot = !this.autoPilot;
            if(window.logTitan) window.logTitan(this.autoPilot ? "🟢 Control de Crucero ACTIVADO" : "🔴 Control de Crucero DESACTIVADO");
            this.updateUI(); // Forzar refesco
        }
        
        // Disparar Láser (Solo CORSAIR)
        if (k === 'KeyF' && isDown) {
            this.fireLaser();
        }
        
        if (k === 'KeyV' && isDown) {
            // Toggle Cámara
            this.cameraMode = this.cameraMode === '1st' ? '3rd' : '1st';
            if (this.cameraMode === '1st') {
                this.cockpitOverlay.style.display = 'block';
                this.shipMesh.visible = false;
            } else {
                this.cockpitOverlay.style.display = 'none';
                this.shipMesh.visible = true;
            }
        }
    },
    
    fireLaser: function() {
        if (!this.isActive || !this.shipMesh || this.currentShipType !== 'CORSAIR') {
            if (this.currentShipType !== 'CORSAIR') {
                if(window.logTitan) window.logTitan("⚠️ [SISTEMA] Armas inoperativas. Se requiere chasis CORSAIR.");
            }
            return;
        }
        if (typeof THREE === 'undefined') return;
        
        const laserGeo = new THREE.CylinderGeometry(0.2, 0.2, 8, 8);
        laserGeo.rotateX(Math.PI / 2);
        const laserMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
        const laser = new THREE.Mesh(laserGeo, laserMat);
        
        laser.position.copy(this.shipMesh.position);
        
        const forward = new THREE.Vector3(0, 0, -1);
        forward.applyQuaternion(this.shipMesh.quaternion);
        laser.quaternion.copy(this.shipMesh.quaternion);
        
        laser.position.addScaledVector(forward, 2);
        laser.userData.velocity = forward.multiplyScalar(this.maxSpeed * 4.0);
        laser.userData.life = 100;
        
        if (window.scene) window.scene.add(laser);
        this.lasers.push(laser);
        
        if(window.logTitan) window.logTitan("💥 Pew! Pew!");
    },
    
    buildShipMesh: function() {
        if (typeof THREE === 'undefined') return;
        
        // Limpiar malla anterior
        if (this.shipMesh && window.scene) {
            window.scene.remove(this.shipMesh);
        }
        
        this.shipMesh = new THREE.Group();
        const profile = this.shipProfiles[this.currentShipType];
        
        const hullMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.3 });
        const accentMat = new THREE.MeshStandardMaterial({ color: profile.color, metalness: 0.5, roughness: 0.2 });
        const glowMat = new THREE.MeshBasicMaterial({ color: profile.color });
        const engineGlowMat = new THREE.MeshBasicMaterial({ color: 0xff4400 });
        
        if (this.currentShipType === 'MULE') {
            const body = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 8), accentMat);
            const containers = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.5, 6), hullMat);
            containers.position.y = 1;
            const engine1 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 2, 16), hullMat);
            engine1.rotation.x = Math.PI/2; engine1.position.set(-1.5, 0, 4);
            const engine2 = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 2, 16), hullMat);
            engine2.rotation.x = Math.PI/2; engine2.position.set(1.5, 0, 4);
            const nozzle1 = new THREE.Mesh(new THREE.SphereGeometry(0.7), engineGlowMat);
            nozzle1.position.set(-1.5, 0, 5);
            const nozzle2 = new THREE.Mesh(new THREE.SphereGeometry(0.7), engineGlowMat);
            nozzle2.position.set(1.5, 0, 5);
            this.shipMesh.add(body, containers, engine1, engine2, nozzle1, nozzle2);
        } 
        else if (this.currentShipType === 'VOYAGER') {
            const body = new THREE.Mesh(new THREE.ConeGeometry(2, 10, 16), hullMat);
            body.rotation.x = Math.PI/2;
            const ring = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.2, 16, 32), glowMat);
            ring.position.z = 2;
            const engine = new THREE.Mesh(new THREE.SphereGeometry(1.2), engineGlowMat);
            engine.position.z = 5;
            const dish = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16, 0, Math.PI), accentMat);
            dish.position.set(0, 1.5, -2); dish.rotation.x = -Math.PI/2;
            this.shipMesh.add(body, ring, engine, dish);
        }
        else if (this.currentShipType === 'CORSAIR') {
            const body = new THREE.Mesh(new THREE.TetrahedronGeometry(4), hullMat);
            body.scale.set(1, 0.3, 1.5);
            const wing1 = new THREE.Mesh(new THREE.BoxGeometry(5, 0.2, 2), accentMat);
            wing1.position.set(-3, 0, 1); wing1.rotation.y = Math.PI/4;
            const wing2 = new THREE.Mesh(new THREE.BoxGeometry(5, 0.2, 2), accentMat);
            wing2.position.set(3, 0, 1); wing2.rotation.y = -Math.PI/4;
            const engine = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 1), engineGlowMat);
            engine.position.z = 3;
            this.shipMesh.add(body, wing1, wing2, engine);
        }
        
        // Faros delanteros
        const headLight1 = new THREE.PointLight(0xffffff, 2, 50);
        headLight1.position.set(-2, 0, -5);
        const headLight2 = new THREE.PointLight(0xffffff, 2, 50);
        headLight2.position.set(2, 0, -5);
        this.shipMesh.add(headLight1, headLight2);
        
        if (window.scene) {
            window.scene.add(this.shipMesh);
        }
    },
    
    buildCockpitOverlay: function() {
        if (document.getElementById('cockpit-overlay')) {
            this.cockpitOverlay = document.getElementById('cockpit-overlay');
            return;
        }
        
        const overlay = document.createElement('div');
        overlay.id = 'cockpit-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '990';
        overlay.style.display = 'none';
        
        // Estilos avanzados de cabina
        overlay.innerHTML = `
            <!-- Marco perimetral y cristal templado tintado -->
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; box-shadow: inset 0 0 100px rgba(0,0,0,0.9);"></div>
            <div style="position:absolute; top:0; left:0; width:100%; height:15%; background: linear-gradient(to bottom, #050a10, transparent); display:flex; justify-content:center;">
                <!-- Panel superior de estado -->
                <div style="width:40%; height:60px; background:rgba(10,20,30,0.8); border-bottom-left-radius:30px; border-bottom-right-radius:30px; border:2px solid #2980b9; border-top:none; box-shadow: 0 5px 20px rgba(41,128,185,0.4); display:flex; justify-content:space-around; align-items:center; padding:0 20px;">
                    <div style="color:#2ecc71; font-family:'Courier New',monospace; font-size:10px; font-weight:bold; letter-spacing:1px; text-shadow:0 0 5px #2ecc71;">DEF: ONLINE</div>
                    <div style="color:#e74c3c; font-family:'Courier New',monospace; font-size:10px; font-weight:bold; letter-spacing:1px; text-shadow:0 0 5px #e74c3c;">WPN: OFFLINE</div>
                    <div style="color:#f1c40f; font-family:'Courier New',monospace; font-size:10px; font-weight:bold; letter-spacing:1px; text-shadow:0 0 5px #f1c40f;">COM: SCANNING</div>
                </div>
            </div>
            
            <!-- Pilares A (Estructura de la cabina) -->
            <div style="position:absolute; top:0; left:12%; width:8%; height:100%; background: linear-gradient(to right, #0a0a0a, #2a2a2a, #0a0a0a); transform: skewX(-25deg); border-right:2px solid #1a1a1a; box-shadow: 10px 0 30px rgba(0,0,0,0.8);"></div>
            <div style="position:absolute; top:0; right:12%; width:8%; height:100%; background: linear-gradient(to left, #0a0a0a, #2a2a2a, #0a0a0a); transform: skewX(25deg); border-left:2px solid #1a1a1a; box-shadow: -10px 0 30px rgba(0,0,0,0.8);"></div>
            
            <!-- Tablero Principal Inferior -->
            <div style="position:absolute; bottom:0; left:0; width:100%; height:30%; background: linear-gradient(to top, rgba(5,10,15,1) 50%, transparent); display:flex; justify-content:center; align-items:flex-end;">
                
                <!-- Consola Central -->
                <div style="position:relative; width:65%; height:90%; background: linear-gradient(135deg, rgba(15,25,35,0.95), rgba(5,10,20,0.95)); border-top-left-radius:80px; border-top-right-radius:80px; border: 2px solid #34495e; border-bottom:none; box-shadow: 0 -15px 40px rgba(0,200,255,0.15); display:flex; justify-content:space-between; padding:20px 40px; overflow:hidden;">
                    
                    <!-- Textura de rejilla hexagonal (Fondo del panel) -->
                    <div style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0.05; background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px; z-index:0;"></div>
                    
                    <!-- Pantalla Izquierda: Escudos e Integridad -->
                    <div style="width:30%; height:100%; z-index:1; border-right: 1px solid rgba(0,255,255,0.2); padding-right:15px;">
                        <h4 style="color:#0ff; font-family:'Outfit',sans-serif; margin:0 0 10px 0; font-size:12px; letter-spacing:2px; text-shadow:0 0 5px #0ff;">SHIELD DYNAMICS</h4>
                        <div style="width:100%; height:8px; background:#112; border-radius:4px; margin-bottom:5px; overflow:hidden; border:1px solid #055;">
                            <div id="shield-bar-ui" style="width:100%; height:100%; background:#0ff; box-shadow:0 0 10px #0ff; transition: width 0.3s;"></div>
                        </div>
                        <div id="integrity-text-ui" style="font-family:monospace; color:#88a; font-size:10px;">INTEGRITY: 100%</div>
                        <div style="font-family:monospace; color:#88a; font-size:10px;">GRAV-PLATING: ONLINE</div>
                    </div>
                    
                    <!-- Radar Central / Holograma -->
                    <div style="width:35%; height:100%; z-index:1; display:flex; flex-direction:column; align-items:center;">
                        <div id="radar-screen" style="width:100px; height:100px; border-radius:50%; border:2px dashed rgba(0,255,255,0.3); position:relative; box-shadow:inset 0 0 20px rgba(0,255,255,0.1); overflow:hidden;">
                            <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
                            <!-- Línea de escáner rotativa -->
                            <div style="position:absolute; top:50%; left:50%; width:50%; height:2px; background:linear-gradient(to right, rgba(0,255,255,0), rgba(0,255,255,0.8)); transform-origin:left center; animation: spin 4s linear infinite; z-index:1;"></div>
                            <!-- Centro de la nave -->
                            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:4px; height:4px; background:#fff; border-radius:50%; box-shadow:0 0 8px #fff; z-index:2;"></div>
                            <!-- Contenedor dinámico de blips -->
                            <div id="radar-dots" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:3;"></div>
                        </div>
                        <div style="color:#0ff; font-family:monospace; font-size:10px; margin-top:10px; letter-spacing:2px;">SYS RADAR</div>
                    </div>
                    
                    <!-- Pantalla Derecha: Motor y Reactor -->
                    <div style="width:30%; height:100%; z-index:1; border-left: 1px solid rgba(0,255,255,0.2); padding-left:15px; text-align:right;">
                        <h4 style="color:#ffaa00; font-family:'Outfit',sans-serif; margin:0 0 10px 0; font-size:12px; letter-spacing:2px; text-shadow:0 0 5px #ffaa00;">WARP REACTOR</h4>
                        <div style="width:100%; height:8px; background:#112; border-radius:4px; margin-bottom:5px; overflow:hidden; border:1px solid #530;">
                            <div style="width:85%; height:100%; background:#f90; box-shadow:0 0 10px #f90;"></div>
                        </div>
                        <div style="font-family:monospace; color:#88a; font-size:10px;">CORE TEMP: 3400K</div>
                        <div style="font-family:monospace; color:#88a; font-size:10px;">DEUTERIUM FLOW: NOMINAL</div>
                    </div>
                    
                </div>
            </div>
            
            <!-- Brackets de HUD Holográfico en el centro de la visión -->
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:300px; height:200px; border:1px solid rgba(0,255,255,0.1); border-radius:20px; display:flex; justify-content:space-between; padding:10px;">
                <div style="width:20px; height:20px; border-top:2px solid #0ff; border-left:2px solid #0ff;"></div>
                <div style="width:20px; height:20px; border-top:2px solid #0ff; border-right:2px solid #0ff;"></div>
            </div>
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:300px; height:200px; display:flex; justify-content:space-between; align-items:flex-end; padding:10px;">
                <div style="width:20px; height:20px; border-bottom:2px solid #0ff; border-left:2px solid #0ff;"></div>
                <div style="width:20px; height:20px; border-bottom:2px solid #0ff; border-right:2px solid #0ff;"></div>
            </div>
        `;
        document.body.appendChild(overlay);
        this.cockpitOverlay = overlay;
    },
    
    updateSpacecraftPhysics: function(dt, camera) {
        if (!this.isActive || !camera) return;
        
        // 0. Homing Auto-Pilot (Búsqueda inteligente o Retorno a Base)
        if (this.autoPilot && this.shipMesh) {
            const isVaultFull = window.TITAN.GameLayer.Economy.getTotalCargo() >= window.TITAN.GameLayer.Economy.getMaxCapacity();
            let targetPosition = null;
            
            if (isVaultFull) {
                // Retorno automático a base
                targetPosition = new THREE.Vector3(0, 0, 0);
            } else if (window.TITAN.GameLayer.Economy.activeDebris.length > 0) {
                // Buscar la chatarra o anomalía más cercana
                let minDist = Infinity;
                for (let debris of window.TITAN.GameLayer.Economy.activeDebris) {
                    const dist = this.shipMesh.position.distanceTo(debris.position);
                    if (dist < minDist) {
                        minDist = dist;
                        targetPosition = debris.position;
                    }
                }
            }
            
            if (targetPosition) {
                // Calcular orientación hacia el recurso o la base
                const m = new THREE.Matrix4();
                m.lookAt(this.shipMesh.position, targetPosition, new THREE.Vector3(0,1,0));
                const targetDirQuat = new THREE.Quaternion().setFromRotationMatrix(m);
                const euler = new THREE.Euler().setFromQuaternion(targetDirQuat, 'YXZ');
                
                // Suavizar Yaw (evitando el salto polar)
                let dy = euler.y - this.yaw;
                while (dy > Math.PI) dy -= Math.PI * 2;
                while (dy < -Math.PI) dy += Math.PI * 2;
                
                this.yaw += dy * 0.02; // Velocidad de giro del piloto
                this.pitch += (euler.x - this.pitch) * 0.02;
            }
        }
        
        // 1. Calcular orientaciones
        const qYaw = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.yaw);
        const qPitch = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.pitch);
        const targetQuat = qYaw.multiply(qPitch);
        
        // Suavizado de rotación (inercia visual de la cámara)
        camera.quaternion.slerp(targetQuat, 0.1);
        
        // 2. Dinámica de Aceleración y Turbo de Consumo
        let currentMaxSpeed = this.maxSpeed;
        const forwardIntention = this.keys.W || this.autoPilot;
        
        if (this.keys.Shift) {
            // El turbo consume Chatarra (RecycledJunk)
            if (window.TITAN.GameLayer.Economy.resources.RecycledJunk > 0) {
                currentMaxSpeed = this.maxSpeed * 3;
                window.TITAN.GameLayer.Economy.resources.RecycledJunk -= 0.5; // Consumo continuo por fotograma
                if (window.TITAN.GameLayer.Economy.resources.RecycledJunk < 0) {
                    window.TITAN.GameLayer.Economy.resources.RecycledJunk = 0;
                }
                window.TITAN.GameLayer.Economy.updateUI(); // Refrescar UI rápido
            } else {
                // Sin combustible para turbo
                currentMaxSpeed = this.maxSpeed;
            }
        }
        
        if (forwardIntention) {
            this.velocity += this.acceleration;
            if (this.velocity > currentMaxSpeed) this.velocity -= this.acceleration * 2; // Freno aerodinámico/suave
        } else if (this.keys.S) {
            this.velocity -= this.acceleration;
            if (this.velocity < -this.maxSpeed) this.velocity = -this.maxSpeed;
        } else {
            // Fricción inercial lenta en el espacio vacío
            if (this.velocity > 0) this.velocity -= this.acceleration * 0.1;
            if (this.velocity < 0) this.velocity += this.acceleration * 0.1;
            if (Math.abs(this.velocity) < 0.01) this.velocity = 0;
        }
        
        // Freno inercial fuerte
        if (this.keys.Space) {
            this.velocity *= 0.90;
        }
        
        // --- 3. MOVIMIENTO TRASLACIONAL DE LA NAVE ---
        if (this.shipMesh) {
            this.shipMesh.quaternion.copy(targetQuat);
        }
        
        const forward = new THREE.Vector3(0, 0, -1);
        forward.applyQuaternion(targetQuat);
        
        const right = new THREE.Vector3(1, 0, 0);
        right.applyQuaternion(targetQuat);
        
        const up = new THREE.Vector3(0, 1, 0);
        up.applyQuaternion(targetQuat);
        
        // Mover la nave
        if (this.shipMesh) {
            this.shipMesh.position.addScaledVector(forward, this.velocity);
            if (this.keys.A) this.shipMesh.position.addScaledVector(right, -this.maxSpeed * 0.2);
            if (this.keys.D) this.shipMesh.position.addScaledVector(right, this.maxSpeed * 0.2);
        }
        
        // --- 3.5. ACOPLAMIENTO DE LA CÁMARA ---
        if (this.cameraMode === '1st') {
            // Cabina: Cámara en el centro de la nave mirando adelante
            camera.position.copy(this.shipMesh.position);
            camera.quaternion.copy(this.shipMesh.quaternion);
        } else {
            // 3ª Persona: Cámara orbitando detrás (Chasing camera)
            
            // Distancia y altura de la cámara dinámica (se aleja al acelerar)
            const lagDistance = 15 + (Math.abs(this.velocity) * 0.5);
            const height = 4;
            
            const desiredCamPos = this.shipMesh.position.clone()
                                  .addScaledVector(forward, -lagDistance)
                                  .addScaledVector(up, height);
                                  
            camera.position.lerp(desiredCamPos, 0.2); // Seguimiento suave (momentum inercial)
            
            // Hacer que la cámara apunte a un punto por delante de la nave
            const targetPos = this.shipMesh.position.clone().addScaledVector(forward, 20);
            camera.lookAt(targetPos);
        }
        
        // Actualizar centro de los controles para cuando desactivemos el PointerLock
        if (window.controls && this.shipMesh) {
            window.controls.target.copy(this.shipMesh.position).addScaledVector(forward, 10);
        }
        
        // --- 4. ACTUALIZAR LÁSERES ---
        if (this.lasers) {
            for (let i = this.lasers.length - 1; i >= 0; i--) {
                const laser = this.lasers[i];
                laser.position.add(laser.userData.velocity);
                laser.userData.life--;
                if (laser.userData.life <= 0) {
                    if (window.scene) window.scene.remove(laser);
                    this.lasers.splice(i, 1);
                }
            }
        }
        
        // --- 5. INTEGRACIÓN DE ECONOMÍA Y DESCUBRIMIENTOS ---
        const scanPos = this.shipMesh ? this.shipMesh.position : camera.position;
        window.TITAN.GameLayer.Economy.updateDebrisPhysics(scanPos);
        
        // Probabilidad aleatoria de spawnear basura en el vacío (simulada localmente alrededor de la nave)
        if (Math.random() < 0.01) { 
            const spawnPos = camera.position.clone();
            // Aparece delante de la nave a cierta distancia
            spawnPos.addScaledVector(forward, 200 + Math.random()*200);
            window.TITAN.GameLayer.Economy.spawnSpaceDebris(spawnPos);
        }
        
        // --- 6. INTEGRACIÓN RPG (RADAR, NIEBLA Y UNIVERSO INFINITO) ---
        window.TITAN.GameLayer.Progression.updateProgressionPhysics(scanPos);
        window.TITAN.GameLayer.UniverseGenerator.update(scanPos);
        
        this.updateUI(camera);
    },
    
    updateUI: function(camera) {
        const ui = document.getElementById('craft-hud-ui');
        if (ui && camera) {
            const apStatus = this.autoPilot ? `<span style="color:#0f0; margin-left:10px; animation: blink 2s infinite;">[AUTO-PILOT ON]</span>` : '';
            
            let passiveText = '';
            if (this.currentShipType === 'MULE') passiveText = 'PASIVA: Radio Recolección x3, Carga x5';
            else if (this.currentShipType === 'VOYAGER') passiveText = 'PASIVA: Warp x2, Escáner Anomalías x3';
            else if (this.currentShipType === 'CORSAIR') passiveText = 'PASIVA: Combustible Warp -50% | ARMAS: [F]';

            ui.innerHTML = `
                VELOCIDAD: ${this.velocity.toFixed(2)} UA/s | 
                NIVEL DE NAVE: ${this.shipLevel} ${apStatus} <br>
                <span style="color:#ffd700; font-size:12px; font-weight:bold;">${passiveText}</span><br>
            <span style="color:#a8b2c1">CÁMARA:</span> ${this.cameraMode === '1st' ? '[1ª CABINA]' : '[3ª EXTERNA]'} (Tecla V)<br>
            COORDENADAS: [X: ${camera.position.x.toFixed(0)}, Y: ${camera.position.y.toFixed(0)}, Z: ${camera.position.z.toFixed(0)}]
            `;
            
            // Actualizar Cabina
            const shieldUi = document.getElementById('shield-bar-ui');
            if (shieldUi) {
                shieldUi.style.width = Math.max(0, this.shield) + '%';
                shieldUi.style.background = this.shield > 30 ? '#0ff' : '#f00';
            }
            const hullUi = document.getElementById('integrity-text-ui');
            if (hullUi) {
                hullUi.innerHTML = `INTEGRITY: ${Math.max(0, this.hull)}%`;
                hullUi.style.color = this.hull > 30 ? '#88a' : '#f00';
            }
        }
        
        // Actualizar SYS RADAR
        const radarDots = document.getElementById('radar-dots');
        if (radarDots && camera && window.TITAN.GameLayer.Economy.activeDebris) {
            radarDots.innerHTML = ''; // Limpiar blips antiguos
            const maxRadarDist = 600.0;
            
            // Dibujar cada pieza de chatarra espacial
            window.TITAN.GameLayer.Economy.activeDebris.forEach(debris => {
                const dist = camera.position.distanceTo(debris.position);
                if (dist < maxRadarDist) {
                    const dirToDebris = debris.position.clone().sub(camera.position).normalize();
                    
                    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
                    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
                    
                    // Proyectar coordenadas relativas
                    const x = dirToDebris.dot(right);
                    const y = dirToDebris.dot(forward); // Adelante es positivo
                    
                    // Mapear al círculo de 100x100 (radio 50)
                    const mapX = 50 + (x * (dist / maxRadarDist) * 50);
                    const mapY = 50 - (y * (dist / maxRadarDist) * 50); // Invertir Y (arriba es -Y en CSS)
                    
                    radarDots.innerHTML += `<div style="position:absolute; top:${mapY}px; left:${mapX}px; width:4px; height:4px; background:#f00; border-radius:50%; box-shadow:0 0 8px #f00;"></div>`;
                }
            });
            
            // Opcional: También pintar planetas descubiertos en verde
            if (window.TITAN.GameLayer.Progression && window.scene) {
                window.scene.traverse((obj) => {
                    if (obj.isMesh && obj.userData && obj.userData.name) {
                        if (window.TITAN.GameLayer.Progression.discoveredPlanets.has(obj.userData.name)) {
                            const worldPos = new THREE.Vector3();
                            obj.getWorldPosition(worldPos);
                            const dist = camera.position.distanceTo(worldPos);
                            if (dist < maxRadarDist) {
                                const dirToObj = worldPos.clone().sub(camera.position).normalize();
                                const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
                                const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
                                const x = dirToObj.dot(right);
                                const y = dirToObj.dot(forward);
                                const mapX = 50 + (x * (dist / maxRadarDist) * 50);
                                const mapY = 50 - (y * (dist / maxRadarDist) * 50);
                                radarDots.innerHTML += `<div style="position:absolute; top:${mapY}px; left:${mapX}px; width:3px; height:3px; background:#0f0; border-radius:50%; box-shadow:0 0 5px #0f0;"></div>`;
                            }
                        }
                    }
                });
            }
        }
    }
};

// Inicialización global al cargar el script
document.addEventListener('DOMContentLoaded', () => {
    window.TITAN.GameLayer.Progression.initProgression();
    window.TITAN.GameLayer.Economy.initEconomy();
    window.TITAN.GameLayer.Spacecraft.initSpacecraft();
});
