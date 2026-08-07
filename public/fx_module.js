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
        this.renderer.toneMappingExposure = 1.2;
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
             mesh.material.onBeforeCompile = function (shader) {
            shader.uniforms.time = FX.volumetricUniforms.time;
            // ... Mantiene el resto del código inalterado ...
            shader.vertexShader = `
                uniform float time;
                ${shader.vertexShader}
            `.replace(
                `#include <begin_vertex>`,
                `
                #include <begin_vertex>
                
                // Ruido Simplex Básico para FBM
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                float snoise(vec3 v) { 
                    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
                    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
                    vec3 i  = floor(v + dot(v, C.yyy) );
                    vec3 x0 = v - i + dot(i, C.xxx) ;
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min( g.xyz, l.zxy );
                    vec3 i2 = max( g.xyz, l.zxy );
                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x
                    vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x
                    i = mod289(i); 
                    vec4 p = permute( permute( permute( 
                                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
                    float n_ = 0.142857142857;
                    vec3  ns = n_ * D.wyz - D.xzx;
                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_ );
                    vec4 x = x_ *ns.x + ns.yyyy;
                    vec4 y = y_ *ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);
                    vec4 b0 = vec4( x.xy, y.xy );
                    vec4 b1 = vec4( x.zw, y.zw );
                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));
                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                    p0 *= norm.x;
                    p1 *= norm.y;
                    p2 *= norm.z;
                    p3 *= norm.w;
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                                dot(p2,x2), dot(p3,x3) ) );
                }
                
                float fbm(vec3 x) {
                    float v = 0.0;
                    float a = 0.5;
                    vec3 shift = vec3(100.0);
                    for (int i = 0; i < 4; ++i) {
                        v += a * snoise(x);
                        x = x * 2.0 + shift;
                        a *= 0.5;
                    }
                    return v;
                }
                
                // Animación turbulenta 
                float noiseVal = fbm(position * 0.02 + time * 0.5);
                transformed += normal * noiseVal * 15.0; // Desplaza los vértices como si hirvieran
                `
            );
        };
    },

    /**
     * Aplica Lens Flares a fuentes de luz intensas.
     * @param {THREE.Light} light - La fuente de luz (PointLight, etc.)
     * @param {number} hexColor - Color de la luz (0xffffff)
     */
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
    }
};             
                // HDR Color
                vec3 finalColor = uColor * turbulence * 3.0 * edgeFade;
                
                float alpha = turbulence * edgeFade * 2.0;
                
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
