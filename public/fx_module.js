/**
 * ============================================================================
 * MÓDULO FX CINEMATOGRÁFICO Y 3D ESTEREOSCÓPICO PARA TITAN APOCALYPSE ENGINE
 * Post-procesado físico, Shaders Volumétricos, Flares JWST/Hubble y Dubois 3D.
 * ============================================================================
 */

window.FX = {
    composer: null,
    bloomPass: null,
    filmPass: null,
    scene: null,
    camera: null,
    renderer: null,
    time: 0,
    
    // Lista de materiales personalizados para animar en el bucle
    animatedMaterials: [],
    
    // Texturas de alta fidelidad
    starTexture: null,
    jwstFlareTexture: null,
    hubbleFlareTexture: null,
    flareSpikeTexture: null,
    flareGhostTexture: null,

    // === MOTOR 3D ESTEREOSCÓPICO (ANAGLIFO DUBOIS PARA GAFAS 3D ROJO/CIAN) ===
    is3DActive: false,
    stereoDepthMultiplier: 1.0,
    stereoCamera: null,
    anaglyphTargetL: null,
    anaglyphTargetR: null,
    anaglyphScene: null,
    anaglyphCamera: null,
    anaglyphMaterial: null,
    _toastTimeout: null,

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

    // Generador de Textura de Difracción James Webb (6 Picos Primarios a 60° + 2 Horizontales)
    createJWSTFlareTexture: function() {
        if (this.jwstFlareTexture) return this.jwstFlareTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const cx = 256, cy = 256;

        // 1. Núcleo central Airy Disk y Corona
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256);
        grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
        grad.addColorStop(0.04, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.12, 'rgba(210, 235, 255, 0.55)');
        grad.addColorStop(0.35, 'rgba(180, 210, 255, 0.12)');
        grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // 2. Seis Picos Primarios del Espejo Hexagonal del JWST (a 0°, 60°, 120°)
        ctx.save();
        ctx.translate(cx, cy);
        for (let i = 0; i < 3; i++) {
            ctx.save();
            ctx.rotate((i * 60) * Math.PI / 180);
            
            // Halo del pico
            const haloGrad = ctx.createLinearGradient(-256, 0, 256, 0);
            haloGrad.addColorStop(0.0, 'rgba(180, 220, 255, 0.0)');
            haloGrad.addColorStop(0.35, 'rgba(210, 235, 255, 0.35)');
            haloGrad.addColorStop(0.48, 'rgba(255, 255, 255, 0.9)');
            haloGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
            haloGrad.addColorStop(0.52, 'rgba(255, 255, 255, 0.9)');
            haloGrad.addColorStop(0.65, 'rgba(210, 235, 255, 0.35)');
            haloGrad.addColorStop(1.0, 'rgba(180, 220, 255, 0.0)');
            ctx.fillStyle = haloGrad;
            ctx.fillRect(-256, -2.5, 512, 5.0);

            // Núcleo agudo hiperbrillante
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            ctx.fillRect(-220, -0.75, 440, 1.5);
            ctx.restore();
        }

        // 3. Dos Picos Secundarios Horizontales (Soporte del Espejo Secundario del JWST)
        ctx.save();
        ctx.rotate(90 * Math.PI / 180);
        const strutGrad = ctx.createLinearGradient(-256, 0, 256, 0);
        strutGrad.addColorStop(0.0, 'rgba(255, 210, 170, 0.0)');
        strutGrad.addColorStop(0.38, 'rgba(255, 225, 190, 0.22)');
        strutGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
        strutGrad.addColorStop(0.62, 'rgba(255, 225, 190, 0.22)');
        strutGrad.addColorStop(1.0, 'rgba(255, 210, 170, 0.0)');
        ctx.fillStyle = strutGrad;
        ctx.fillRect(-256, -1.2, 512, 2.4);
        ctx.restore();

        ctx.restore();

        this.jwstFlareTexture = new THREE.CanvasTexture(canvas);
        return this.jwstFlareTexture;
    },

    // Generador de Textura de Difracción Hubble (Cruz de 4 Picos Ortogonales)
    createHubbleFlareTexture: function() {
        if (this.hubbleFlareTexture) return this.hubbleFlareTexture;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        const cx = 256, cy = 256;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256);
        grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
        grad.addColorStop(0.05, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.18, 'rgba(220, 235, 255, 0.4)');
        grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        ctx.save();
        ctx.translate(cx, cy);
        for (let i = 0; i < 2; i++) {
            ctx.save();
            ctx.rotate((i * 90) * Math.PI / 180);
            const spikeGrad = ctx.createLinearGradient(-256, 0, 256, 0);
            spikeGrad.addColorStop(0.0, 'rgba(200, 230, 255, 0.0)');
            spikeGrad.addColorStop(0.4, 'rgba(220, 240, 255, 0.4)');
            spikeGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
            spikeGrad.addColorStop(0.6, 'rgba(220, 240, 255, 0.4)');
            spikeGrad.addColorStop(1.0, 'rgba(200, 230, 255, 0.0)');
            ctx.fillStyle = spikeGrad;
            ctx.fillRect(-256, -2.0, 512, 4.0);
            ctx.restore();
        }
        ctx.restore();

        this.hubbleFlareTexture = new THREE.CanvasTexture(canvas);
        return this.hubbleFlareTexture;
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
        
        // Picos anamórficos
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

        // Configuración Física del Renderizador (ACES Filmic Tone Mapping + sRGB)
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        // Pipeline de Post-Procesado a máxima resolución (Supersampling)
        const renderScene = new THREE.RenderPass(scene, camera);
        
        const pixelRatio = renderer.getPixelRatio() || 1;
        // Efecto Bloom Físico (HDR)
        this.bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio), 
            1.15, // Intensidad calibrada
            0.45, // Radio
            0.82  // Umbral
        );

        this.composer = new THREE.EffectComposer(renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(this.bloomPass);
        
        // Efecto Cinemático (Grano analógico espacial)
        this.filmPass = new THREE.FilmPass(
            0.12,  // noiseIntensity (grano fino cinematográfico)
            0.04,  // scanlinesIntensity (apenas visible)
            648,   // scanlinesCount
            false  // grayscale
        );
        this.composer.addPass(this.filmPass);

        // Inicializar Sistema 3D Estereoscópico (Dubois)
        this.initAnaglyph(renderer, window.innerWidth, window.innerHeight);

        // Listener de Redimensionamiento
        window.addEventListener('resize', () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (this.composer) this.composer.setSize(w, h);
            this.resizeAnaglyph(w, h);
        });

        // Atajo de teclado: Tecla '3' para alternar Modo 3D Estereoscópico
        window.addEventListener('keydown', (e) => {
            if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
            if (e.key === '3') {
                this.toggle3D();
            }
        });
    },

    // Inicializador del Pipeline Anaglifo Dubois
    initAnaglyph: function(renderer, width, height) {
        if (typeof THREE.StereoCamera === 'undefined') {
            console.warn("[TITAN FX] THREE.StereoCamera no está disponible.");
            return;
        }

        this.stereoCamera = new THREE.StereoCamera();
        this.stereoCamera.aspect = 0.5;

        const pixelRatio = renderer.getPixelRatio() || 1;
        const w = Math.floor(width * pixelRatio);
        const h = Math.floor(height * pixelRatio);

        const params = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat
        };

        this.anaglyphTargetL = new THREE.WebGLRenderTarget(w, h, params);
        this.anaglyphTargetR = new THREE.WebGLRenderTarget(w, h, params);

        // Matriz Dubois Matemáticamente Calibrada para Gafas 3D Rojo/Cian
        this.anaglyphMaterial = new THREE.ShaderMaterial({
            uniforms: {
                mapLeft: { value: this.anaglyphTargetL.texture },
                mapRight: { value: this.anaglyphTargetR.texture },
                colorMatrixLeft: { value: new THREE.Matrix3().fromArray([
                    0.456100, -0.0400822, -0.0152161,
                    0.500484, -0.0378246, -0.0205971,
                    0.176381, -0.0157589, -0.00546858
                ]) },
                colorMatrixRight: { value: new THREE.Matrix3().fromArray([
                    -0.0434706, 0.378476, -0.0721527,
                    -0.0879388, 0.733640, -0.112961,
                    -0.00155529, -0.0184503, 1.226400
                ]) }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D mapLeft;
                uniform sampler2D mapRight;
                uniform mat3 colorMatrixLeft;
                uniform mat3 colorMatrixRight;
                varying vec2 vUv;
                void main() {
                    vec4 colL = texture2D(mapLeft, vUv);
                    vec4 colR = texture2D(mapRight, vUv);
                    vec3 finalCol = clamp(colorMatrixLeft * colL.rgb + colorMatrixRight * colR.rgb, 0.0, 1.0);
                    gl_FragColor = vec4(finalCol, 1.0);
                }
            `,
            depthWrite: false,
            depthTest: false
        });

        this.anaglyphScene = new THREE.Scene();
        this.anaglyphCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.anaglyphMaterial);
        this.anaglyphScene.add(quad);
    },

    resizeAnaglyph: function(width, height) {
        if (!this.anaglyphTargetL || !this.renderer) return;
        const pixelRatio = this.renderer.getPixelRatio() || 1;
        const w = Math.floor(width * pixelRatio);
        const h = Math.floor(height * pixelRatio);
        this.anaglyphTargetL.setSize(w, h);
        this.anaglyphTargetR.setSize(w, h);
    },

    toggle3D: function(forcedState) {
        this.is3DActive = (typeof forcedState === 'boolean') ? forcedState : !this.is3DActive;
        const btn = document.getElementById('btn-anaglyph-3d');
        if (btn) {
            if (this.is3DActive) {
                btn.style.background = 'linear-gradient(135deg, rgba(255,0,85,0.4), rgba(0,255,255,0.4))';
                btn.style.borderColor = '#00ffff';
                btn.style.boxShadow = '0 0 20px rgba(0,255,255,0.8), 0 0 10px rgba(255,0,85,0.8)';
                btn.innerHTML = '🕶️ 3D CINEMATOGRÁFICO: [ ON ]';
            } else {
                btn.style.background = 'linear-gradient(135deg, rgba(255,0,85,0.15), rgba(0,255,255,0.15))';
                btn.style.borderColor = '#ff0055';
                btn.style.boxShadow = '0 0 10px rgba(255,0,85,0.3)';
                btn.innerHTML = '👓 MODO 3D (GAFAS 3D)';
            }
        }
        
        this.show3DNotification(this.is3DActive);
        if (typeof logTitan !== 'undefined') {
            logTitan(this.is3DActive ? 
                '🕶️ [3D ESTEREOSCÓPICO] Modo Cinemático 3D activado (Filtro Rojo/Cian Dubois). Ponte tus gafas 3D.' : 
                '🕶️ [3D ESTEREOSCÓPICO] Modo estándar 2D restaurado.'
            );
        }
    },

    show3DNotification: function(active) {
        let toast = document.getElementById('titan-3d-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'titan-3d-toast';
            toast.style.position = 'fixed';
            toast.style.bottom = '85px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '8px';
            toast.style.fontFamily = "'Outfit', sans-serif";
            toast.style.fontSize = '14px';
            toast.style.fontWeight = 'bold';
            toast.style.zIndex = '999999';
            toast.style.pointerEvents = 'none';
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            document.body.appendChild(toast);
        }

        if (active) {
            toast.style.background = 'rgba(10, 15, 30, 0.96)';
            toast.style.border = '2px solid #00ffff';
            toast.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.6), 0 0 15px rgba(255, 0, 85, 0.6)';
            toast.style.color = '#ffffff';
            toast.innerHTML = '👓 <span style="color:#ff3366">MODO 3D REAL ACTIVADO</span> — <span style="color:#00ffff">Ponte tus gafas 3D (Rojo/Cian)</span> para experimentar la profundidad física.';
        } else {
            toast.style.background = 'rgba(15, 20, 30, 0.9)';
            toast.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            toast.style.boxShadow = 'none';
            toast.style.color = '#aaaaaa';
            toast.innerHTML = 'Modo Estereoscópico 3D desactivado (Render 2D estándar).';
        }

        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(this._toastTimeout);
        this._toastTimeout = setTimeout(() => {
            if (toast) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(15px)';
            }
        }, 4000);
    },

    // === MODO CINEMATOGRÁFICO IMAX / PROFUNDIDAD 3D SIN GAFAS ===
    isCinematicActive: true,
    _cinToastTimeout: null,
    setCinematicMode: function(active) {
        this.isCinematicActive = active;
        const btn = document.getElementById('btn-cinematic-mode');

        if (active) {
            // === MODO CINEMATOGRÁFICO IMAX / INTERSTELLAR (FOTORREALISTA DRAMÁTICO) ===
            this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
            this.renderer.toneMappingExposure = 1.28; // Gran realce lumínico y rango dinámico
            if (this.bloomPass) {
                this.bloomPass.strength = 1.75; // Bloom radiante en coronas estelares, Sol y núcleos galácticos
                this.bloomPass.radius = 0.60;   // Halo difuso suave
                this.bloomPass.threshold = 0.80; // Resplandor exclusivo en altas energías y discos de acreción
            }
            if (this.filmPass) {
                this.filmPass.uniforms.nIntensity.value = 0.09; // Grano orgánico Kodak 70mm
                this.filmPass.uniforms.sIntensity.value = 0.03;
            }
            if (window.titanPass && window.titanPass.uniforms && window.titanPass.uniforms["cinematicActive"]) {
                window.titanPass.uniforms["cinematicActive"].value = 1.0; // Aberración anamórfica + curva S Kodak + viñeteado óptico
            }
            if (window.controls) {
                window.controls.autoRotate = true;
                window.controls.autoRotateSpeed = 0.25; // Paralaje de movimiento orbital continuo para percepción 3D
                window.controls.dampingFactor = 0.035; // Inercia fílmica pesada
            }
            if (window.constellationLineMesh && window.constellationLineMesh.material) {
                window.constellationLineMesh.material.opacity = 0.16; // Filamentos etéreos cósmicos
            }
            if (btn) {
                btn.style.background = 'linear-gradient(135deg, rgba(255,180,0,0.4), rgba(255,80,0,0.4))';
                btn.style.borderColor = '#ffb400';
                btn.style.boxShadow = '0 0 22px rgba(255,180,0,0.9), 0 0 10px #ff5000';
                btn.innerHTML = '🎬 3D CINEMATOGRÁFICO: [ ON ]';
            }
            this.showCinematicToast(true);
        } else {
            // === MODO NORMAL / OBSERVATORIO TÉCNICO CIENTÍFICO ===
            this.renderer.toneMapping = THREE.LinearToneMapping;
            this.renderer.toneMappingExposure = 0.82; // Exposición técnica neutra
            if (this.bloomPass) {
                this.bloomPass.strength = 0.0; // BLOOM TOTALMENTE NULO: Cero destellos borrosos, precisión científica pura
                this.bloomPass.radius = 0.0;
                this.bloomPass.threshold = 1.0;
            }
            if (this.filmPass) {
                this.filmPass.uniforms.nIntensity.value = 0.0;
                this.filmPass.uniforms.sIntensity.value = 0.0;
            }
            if (window.titanPass && window.titanPass.uniforms && window.titanPass.uniforms["cinematicActive"]) {
                window.titanPass.uniforms["cinematicActive"].value = 0.0; // Desactiva efectos de lente y curva S
            }
            if (window.controls) {
                window.controls.autoRotate = false; // Cámara completamente estática y manual
                window.controls.dampingFactor = 0.08;
            }
            if (window.constellationLineMesh && window.constellationLineMesh.material) {
                window.constellationLineMesh.material.opacity = 0.60; // Líneas vectoriales técnicas nítidas y sólidas
            }
            if (btn) {
                btn.style.background = 'rgba(255,255,255,0.06)';
                btn.style.borderColor = 'rgba(255,255,255,0.2)';
                btn.style.boxShadow = 'none';
                btn.innerHTML = '🎬 3D CINEMATOGRÁFICO: [ OFF ]';
            }
            this.showCinematicToast(false);
        }

        if (window.logTitan) {
            window.logTitan(active ? 
                '🎬 [CINEMATOGRÁFICO] Post-procesado IMAX activado: Bloom HDR x5, Curva S Kodak, Aberración Anamórfica y Paralaje 3D.' : 
                '🔬 [OBSERVATORIO] Modo técnico estándar restaurado (Render plano sin post-procesado fílmico).'
            );
        }
    },

    showCinematicToast: function(active) {
        let toast = document.getElementById('titan-cinematic-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'titan-cinematic-toast';
            toast.style.position = 'fixed';
            toast.style.bottom = '85px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '8px';
            toast.style.fontFamily = "'Outfit', sans-serif";
            toast.style.fontSize = '14px';
            toast.style.fontWeight = 'bold';
            toast.style.zIndex = '999999';
            toast.style.pointerEvents = 'none';
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            document.body.appendChild(toast);
        }

        if (active) {
            toast.style.background = 'rgba(10, 15, 30, 0.96)';
            toast.style.border = '2px solid #ffb400';
            toast.style.boxShadow = '0 0 25px rgba(255, 180, 0, 0.6), 0 0 10px rgba(255, 80, 0, 0.5)';
            toast.style.color = '#ffffff';
            toast.innerHTML = '🎬 <span style="color:#ffb400">MODO CINEMATOGRÁFICO IMAX [ACTIVO]</span> — <span style="color:#fff">Bloom HDR x4, Curva S Kodak, Aberración Anamórfica y Paralaje 3D directo.</span>';
        } else {
            toast.style.background = 'rgba(15, 20, 30, 0.92)';
            toast.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            toast.style.boxShadow = 'none';
            toast.style.color = '#cccccc';
            toast.innerHTML = '🔬 <span style="color:#4cc9f0">MODO OBSERVATORIO TÉCNICO [ACTIVO]</span> — Render plano neutral sin post-procesado fílmico.';
        }

        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(this._cinToastTimeout);
        this._cinToastTimeout = setTimeout(() => {
            if (toast) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(15px)';
            }
        }, 3500);
    },

    renderAnaglyph: function(scene, camera) {
        if (!this.stereoCamera || !this.anaglyphTargetL || !this.anaglyphTargetR) {
            this.composer.render();
            return;
        }

        // Animar Shaders Volumétricos
        this.time += 0.016;
        this.animatedMaterials.forEach(mat => {
            if (mat.uniforms && mat.uniforms.uTime) {
                mat.uniforms.uTime.value = this.time;
            }
        });

        // Separación interocular adaptativa según la distancia al objetivo focal
        let focalDist = 100.0;
        if (window.controls && window.controls.target) {
            focalDist = camera.position.distanceTo(window.controls.target);
        }
        
        // eyeSep dinámico: suave y natural cerca de planetas, más amplio en el espacio exterior
        const baseEyeSep = Math.max(0.064, focalDist * 0.015 * this.stereoDepthMultiplier);
        this.stereoCamera.eyeSep = baseEyeSep;
        this.stereoCamera.update(camera);

        const currentAutoClear = this.renderer.autoClear;
        this.renderer.autoClear = false;

        // Ojo Izquierdo (Filtro Rojo Dubois)
        this.renderer.setRenderTarget(this.anaglyphTargetL);
        this.renderer.clear();
        this.renderer.render(scene, this.stereoCamera.cameraL);

        // Ojo Derecho (Filtro Cian Dubois)
        this.renderer.setRenderTarget(this.anaglyphTargetR);
        this.renderer.clear();
        this.renderer.render(scene, this.stereoCamera.cameraR);

        // Mezcla Dubois hacia pantalla
        this.renderer.setRenderTarget(null);
        this.anaglyphMaterial.uniforms.mapLeft.value = this.anaglyphTargetL.texture;
        this.anaglyphMaterial.uniforms.mapRight.value = this.anaglyphTargetR.texture;
        this.renderer.render(this.anaglyphScene, this.anaglyphCamera);

        this.renderer.autoClear = currentAutoClear;
    },

    ApplyPostProcessing: function() {
        if (this.is3DActive) {
            this.renderAnaglyph(this.scene, this.camera);
            return;
        }

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
                mesh.material.color = new THREE.Color(colorHex || 0xffffff);
                mesh.material.color.multiplyScalar(intensity); 
                
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
            
            if (pointsMesh.geometry && pointsMesh.geometry.attributes.color) {
                pointsMesh.material.vertexColors = true;
                pointsMesh.material.color = new THREE.Color(0xffffff);
                pointsMesh.material.color.multiplyScalar(2.5);
            } else {
                pointsMesh.material.color = new THREE.Color(colorHex);
                pointsMesh.material.color.multiplyScalar(2.0);
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
        if (disk) {
            this.ApplyVolumetric(disk, disk.material.size * 1.5);
            disk.material.opacity = 1.0;
        }
        if (jet) {
            this.ApplyVolumetric(jet, jet.material.size * 2.0);
            jet.material.opacity = 0.6;
            jet.material.color.multiplyScalar(4.0);
        }
    },

    ApplyCosmicDust: function(pointsMesh) {
        this.ApplyVolumetric(pointsMesh, 30.0, 0x443322);
        if (pointsMesh.material) {
            pointsMesh.material.opacity = 0.3;
        }
    },

    ApplyAccretionDisk: function(mesh, colorStr) {
        if (!mesh) return;
        
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
                
                float blackHole = smoothstep(0.0, 0.15, dist);
                float edgeFade = smoothstep(0.5, 0.4, dist);
                
                vec2 rotatedUv = vec2(
                    cos(uTime * 0.2) * (uv.x - 0.5) - sin(uTime * 0.2) * (uv.y - 0.5) + 0.5,
                    sin(uTime * 0.2) * (uv.x - 0.5) + cos(uTime * 0.2) * (uv.y - 0.5) + 0.5
                );
                
                float turbulence = fbm(rotatedUv * 10.0 + uTime);
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
        
        lensflare.addElement(new THREE.LensflareElement(spikeTex, 500, 0, color));
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
                float pulse = sin(vUv.y * 50.0 - uTime * 30.0) * 0.5 + 0.5;
                float noiseVal = random(vUv * 50.0 + uTime);
                float fade = 1.0 - vUv.y;
                
                vec3 finalColor = uColor * (pulse + noiseVal * 0.5) * fade * 4.0;
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
