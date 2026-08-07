/**
 * MÓDULO FX PARA DVTRGAS26
 * Capa de post-procesado, cinemática y shaders volumétricos físicos.
 * Diseñado para aislar la capa visual de la matemática DVTRGAS26.
 */

window.FX = {
    composer: null,
    bloomPass: null,
    scene: null,
    camera: null,
    renderer: null,
    time: 0,
    
    // Lista de materiales personalizados para animar en el bucle
    animatedMaterials: [],
    
    // Textura generada por código para que las partículas sean esféricas y no cuadradas
    starTexture: null,

    createStarTexture: function() {
        if (this.starTexture) return this.starTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Gradiente radial para un brillo suave (centro opaco, bordes transparentes)
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        
        this.starTexture = new THREE.CanvasTexture(canvas);
        return this.starTexture;
    },

    createFlareSpikeTexture: function() {
        if (this.flareSpikeTexture) return this.flareSpikeTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const cx = 128, cy = 128;
        
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 128);
        gradient.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        
        // Dibujar picos de luz (Anamorphic / Starburst spikes)
        ctx.beginPath();
        ctx.moveTo(cx, 0); ctx.lineTo(cx + 4, cy); ctx.lineTo(cx, 256); ctx.lineTo(cx - 4, cy); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0, cy); ctx.lineTo(cx, cy + 4); ctx.lineTo(256, cy); ctx.lineTo(cx, cy - 4); ctx.fill();
        
        this.flareSpikeTexture = new THREE.CanvasTexture(canvas);
        return this.flareSpikeTexture;
    },

    createFlareGhostTexture: function() {
        if (this.flareGhostTexture) return this.flareGhostTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 128; canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        ctx.beginPath();
        ctx.arc(64, 64, 60, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.stroke();
        
        this.flareGhostTexture = new THREE.CanvasTexture(canvas);
        return this.flareGhostTexture;
    },

    init: function(scene, camera, renderer) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        // Configuración Física del Renderizador
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.9;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // Pipeline de Post-Procesado a máxima resolución (Supersampling)
        const renderScene = new THREE.RenderPass(scene, camera);
        
        const pixelRatio = renderer.getPixelRatio();
        // Efecto Bloom Físico (HDR) a resolución escalada
        this.bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio), 
            1.2, // Fuerza (reducida para que el sol no parezca una supernova gigante)
            0.4, // Radio
            0.85 // Umbral (Solo brillan las estrellas puras y fuentes de luz directa)
        );

        this.composer = new THREE.EffectComposer(renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(this.bloomPass);
        
        // Efecto Cinemático (Grano de película y sutiles scanlines para dar aspecto de cámara espacial)
        const filmPass = new THREE.FilmPass(
            0.15,   // noiseIntensity (grano de película)
            0.05,  // scanlinesIntensity (apenas visible)
            648,    // scanlinesCount
            false   // grayscale
        );
        filmPass.renderToScreen = true;
        this.composer.addPass(filmPass);
    },

    ApplyPostProcessing: function() {
        if (!this.composer) {
            this.renderer.render(this.scene, this.camera);
            return;
        }
        
        this.time += 0.016;
        
        // Animar Shaders Volumétricos
        this.animatedMaterials.forEach(mat => {
            if (mat.uniforms && mat.uniforms.uTime) {
                mat.uniforms.uTime.value = this.time;
            }
        });

        this.composer.render();
    },

    ApplyCameraInertia: function(controls) {
        if (!controls) return;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
    },

    ApplyStarHDR: function(mesh, colorHex, intensity = 2.0) {
        if (!mesh) return;
        
        // Si es un InstancedMesh o Points
        if (mesh.isInstancedMesh || mesh.isPoints) {
            if (mesh.material) {
                // Hacemos que brille para que interactúe con el Bloom
                mesh.material.color = new THREE.Color(colorHex || 0xffffff);
                // PointsMaterial no tiene emissive nativo, pero al subir el color por encima de 1 en WebGL 
                // con ToneMapping puede saturar y hacer Bloom si superamos el umbral
                mesh.material.color.multiplyScalar(intensity); 
                
                // Si es un sistema de partículas (puntos), le ponemos la textura esférica para que no sean cuadrados
                if (mesh.isPoints && !mesh.material.map) {
                    mesh.material.map = this.createStarTexture();
                    mesh.material.alphaTest = 0.01;
                    mesh.material.transparent = true;
                }
                
                mesh.material.needsUpdate = true;
            }
            return;
        }

        // Si es una malla normal (Ej: El Sol)
        if (mesh.material && mesh.material.isMeshStandardMaterial) {
            mesh.material.emissive = new THREE.Color(colorHex || mesh.material.color.getHex());
            mesh.material.emissiveIntensity = intensity;
            mesh.material.needsUpdate = true;
        }
    },

    ApplyVolumetric: function(pointsMesh, size = 1.0, colorHex = 0xffffff) {
        if (!pointsMesh) return;
        
        if (pointsMesh.material) {
            pointsMesh.material.size = size;
            
            // Si la malla ya tiene colores por vértice, respetarlos e intensificarlos
            if (pointsMesh.geometry && pointsMesh.geometry.attributes.color) {
                pointsMesh.material.vertexColors = true;
                pointsMesh.material.color = new THREE.Color(0xffffff); // El blanco multiplica los vertexColors puros
                // Boost artificial de la intensidad general
                pointsMesh.material.color.multiplyScalar(2.5);
            } else {
                pointsMesh.material.color = new THREE.Color(colorHex);
                pointsMesh.material.color.multiplyScalar(2.0); // Boost HDR
            }
            
            if (pointsMesh.isPoints && !pointsMesh.material.map) {
                pointsMesh.material.map = this.createStarTexture();
                pointsMesh.material.alphaTest = 0.01;
            }
            
            pointsMesh.material.transparent = true;
            pointsMesh.material.opacity = 0.8;
            pointsMesh.material.blending = THREE.AdditiveBlending;
            pointsMesh.material.depthWrite = false;
            pointsMesh.material.sizeAttenuation = true;
            pointsMesh.material.needsUpdate = true;
        }
    },

    ApplyBlackHoleParticles: function(disk, jet) {
        // Boost específico para hacer que el motor de partículas del agujero negro genere un bloom brutal
        if (disk) {
            this.ApplyVolumetric(disk, disk.material.size * 1.5);
            disk.material.opacity = 1.0;
        }
        if (jet) {
            this.ApplyVolumetric(jet, jet.material.size * 2.0);
            jet.material.opacity = 0.6;
            jet.material.color.multiplyScalar(4.0); // Jet extra brillante
        }
    },

    ApplyCosmicDust: function(pointsMesh) {
        this.ApplyVolumetric(pointsMesh, 30.0, 0x443322); // Partículas gigantes difusas
        if (pointsMesh.material) {
            pointsMesh.material.opacity = 0.3;
        }
    },

    ApplyAccretionDisk: function(mesh, colorStr) {
        if (!mesh) return;
        
        // Shader Volumétrico Fractal para Discos de Acreción
        const vertexShader = `
            varying vec2 vUv;
            varying vec3 vPosition;
            void main() {
                vUv = uv;
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        
        const fragmentShader = `
            uniform float uTime;
            uniform vec3 uColor;
            varying vec2 vUv;
            varying vec3 vPosition;
            
            float random (in vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            float noise (in vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);
                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }

            float fbm (in vec2 st) {
                float value = 0.0;
                float amplitude = 0.5;
                for (int i = 0; i < 5; i++) {
                    value += amplitude * noise(st);
                    st *= 2.0;
                    amplitude *= 0.5;
                }
                return value;
            }

            void main() {
                vec2 uv = vUv;
                vec2 center = vec2(0.5);
                float dist = distance(uv, center);
                
                // Agujero negro en el centro
                float blackHole = smoothstep(0.0, 0.15, dist);
                
                // Borde suave del disco
                float edgeFade = smoothstep(0.5, 0.4, dist);
                
                // Ruido turbulento rotatorio
                vec2 rotatedUv = vec2(
                    cos(uTime * 0.2) * (uv.x - 0.5) - sin(uTime * 0.2) * (uv.y - 0.5) + 0.5,
                    sin(uTime * 0.2) * (uv.x - 0.5) + cos(uTime * 0.2) * (uv.y - 0.5) + 0.5
                );
                
                float turbulence = fbm(rotatedUv * 10.0 + uTime);
                
                // HDR Color
                vec3 finalColor = uColor * turbulence * 3.0 * edgeFade;
                
                float alpha = turbulence * edgeFade * 2.0;
                
                gl_FragColor = vec4(finalColor, alpha * blackHole);
            }
        `;

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(colorStr) }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        mesh.material = mat;
        this.animatedMaterials.push(mat);
    },

    ApplySunFlare: function(light, hexColor) {
        if (typeof THREE.Lensflare === 'undefined') {
            console.warn("[TITAN FX] THREE.Lensflare no está disponible.");
            return;
        }

        const spikeTex = this.createFlareSpikeTexture();
        const ghostTex = this.createFlareGhostTexture();
        const color = new THREE.Color(hexColor);

        const lensflare = new THREE.Lensflare();
        
        // Elemento central brillante y cruz
        lensflare.addElement(new THREE.LensflareElement(spikeTex, 500, 0, color));
        
        // Elementos fantasma de la lente (Hexágonos/Círculos secundarios rebotando)
        lensflare.addElement(new THREE.LensflareElement(ghostTex, 60, 0.2, color));
        lensflare.addElement(new THREE.LensflareElement(ghostTex, 90, 0.4, color));
        lensflare.addElement(new THREE.LensflareElement(ghostTex, 120, 0.6, color));
        lensflare.addElement(new THREE.LensflareElement(ghostTex, 70, 0.8, color));

        light.add(lensflare);
    },

    ApplyRelativisticJet: function(mesh, colorStr) {
        if (!mesh) return;
        
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        
        const fragmentShader = `
            uniform float uTime;
            uniform vec3 uColor;
            varying vec2 vUv;
            
            float random(vec2 p) { return fract(sin(dot(p,vec2(12.9898,78.233))) * 43758.5453); }

            void main() {
                // Efecto de dispersión pulsante rápida a lo largo del cono (eje Y = vUv.y)
                float pulse = sin(vUv.y * 50.0 - uTime * 30.0) * 0.5 + 0.5;
                float noiseVal = random(vUv * 50.0 + uTime);
                
                // El jet brilla más en la base (vUv.y = 0) y se desvanece en la punta
                float fade = 1.0 - vUv.y;
                
                vec3 finalColor = uColor * (pulse + noiseVal * 0.5) * fade * 4.0; // HDR boost
                float alpha = fade * (pulse * 0.8 + 0.2);
                
                gl_FragColor = vec4(finalColor, alpha);
            }
        `;

        const mat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(colorStr) }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide
        });

        mesh.material = mat;
        this.animatedMaterials.push(mat);
    },
    
    ApplyAtmosphere: function(mesh) {
        if (!mesh || !mesh.material) return;
        if (mesh.material.isMeshStandardMaterial) {
            mesh.material.roughness = 0.3;
            mesh.material.metalness = 0.1;
        }
    }
};
