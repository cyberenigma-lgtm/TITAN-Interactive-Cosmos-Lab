// ============================================================================
// TITAN BENCHMARK - TECH DEMO MODE (Stress Test)
// ============================================================================

window.TITAN = window.TITAN || {};
window.TITAN.Benchmark = {
    isActive: false,
    asteroidCount: 50000,
    instancedMesh: null,
    blackHoleMesh: null,
    dummy: null,
    stats: null,
    
    init: function() {
        console.log("[BENCHMARK] Inicializando Tech Demo...");
        
        // Add Stats.js UI
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js';
        script.onload = () => {
            this.stats = new Stats();
            this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            this.stats.dom.style.position = 'absolute';
            this.stats.dom.style.right = '0px';
            this.stats.dom.style.top = '0px';
            this.stats.dom.style.left = 'auto'; // Override default left
            this.stats.dom.style.display = 'none';
            this.stats.dom.id = 'benchmark-stats';
            document.body.appendChild(this.stats.dom);
        };
        document.head.appendChild(script);
        
        if (typeof THREE !== 'undefined') {
            this.dummy = new THREE.Object3D();
        }
        
        const btn = document.getElementById('btn-benchmark');
        if (btn) {
            btn.addEventListener('click', () => {
                if (this.isActive) this.stop();
                else this.start();
            });
        }
    },
    
    start: function() {
        if (!window.scene || !window.renderer) return;
        this.isActive = true;
        
        // Hide standard UI
        const uiElements = document.querySelectorAll('.glass-header nav ul li');
        uiElements.forEach(el => {
            if (!el.contains(document.getElementById('btn-benchmark'))) {
                el.style.display = 'none';
            }
        });
        const hudContainer = document.getElementById('craft-hud-container');
        if (hudContainer) hudContainer.style.display = 'none';
        const infoPanel = document.getElementById('info-panel');
        if (infoPanel) infoPanel.style.display = 'none';
        
        if (this.stats && this.stats.dom) this.stats.dom.style.display = 'block';
        
        // Enable high-end shadows in renderer
        window.renderer.shadowMap.enabled = true;
        window.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Clear normal universe
        if (window.TITAN.GameLayer && window.TITAN.GameLayer.UniverseGenerator) {
            window.TITAN.GameLayer.UniverseGenerator.activeChunks.forEach((group, key) => {
                window.scene.remove(group);
            });
            window.TITAN.GameLayer.UniverseGenerator.activeChunks.clear();
        }
        
        if (window.sunMesh) window.sunMesh.visible = false;
        if (window.pointLight) window.pointLight.intensity = 0;
        if (window.TITAN.GameLayer && window.TITAN.GameLayer.Spacecraft) {
            window.TITAN.GameLayer.Spacecraft.deactivate();
        }
        
        this.buildScene();
        
        // Position camera
        window.camera.position.set(0, 150, 400);
        window.camera.lookAt(0, 0, 0);
        if (window.controls) {
            window.controls.target.set(0, 0, 0);
            window.controls.update();
        }
        
        document.getElementById('btn-benchmark').innerHTML = '🛑 DETENER BENCHMARK';
        document.getElementById('btn-benchmark').style.color = '#ff3333';
        
        // Hook the render loop
        this.originalAnimate = window.requestAnimationFrame;
        this.benchmarkLoop();
    },
    
    stop: function() {
        this.isActive = false;
        location.reload(); // Quickest way to restore full state
    },
    
    buildScene: function() {
        // 1. Agujero Negro Central (Shader Gravitacional Básico)
        const bhGeo = new THREE.SphereGeometry(30, 64, 64);
        const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.blackHoleMesh = new THREE.Mesh(bhGeo, bhMat);
        window.scene.add(this.blackHoleMesh);
        
        // Disco de Acreción (Luz direccional fuerte que proyecta sombras)
        const accretionLight = new THREE.PointLight(0xff7700, 5, 2000);
        accretionLight.castShadow = true;
        accretionLight.shadow.mapSize.width = 2048;
        accretionLight.shadow.mapSize.height = 2048;
        accretionLight.shadow.bias = -0.001;
        this.blackHoleMesh.add(accretionLight);
        
        const ringGeo = new THREE.TorusGeometry(50, 8, 2, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        this.blackHoleMesh.add(ring);
        
        // 2. InstancedMesh de 50,000 Asteroides (El test real de GPU/NPU)
        const astGeo = new THREE.DodecahedronGeometry(2, 1);
        const astMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8, metalness: 0.2 });
        
        this.instancedMesh = new THREE.InstancedMesh(astGeo, astMat, this.asteroidCount);
        this.instancedMesh.castShadow = true;
        this.instancedMesh.receiveShadow = true;
        
        const radiusMin = 80;
        const radiusMax = 400;
        
        for (let i = 0; i < this.asteroidCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = radiusMin + Math.random() * (radiusMax - radiusMin);
            const height = (Math.random() - 0.5) * (radius * 0.1); // Forma de disco
            
            this.dummy.position.set(
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
            );
            
            this.dummy.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            const scale = 0.5 + Math.random() * 1.5;
            this.dummy.scale.set(scale, scale, scale);
            
            this.dummy.updateMatrix();
            this.instancedMesh.setMatrixAt(i, this.dummy.matrix);
        }
        
        this.instancedMesh.instanceMatrix.needsUpdate = true;
        window.scene.add(this.instancedMesh);
    },
    
    benchmarkLoop: function() {
        if (!this.isActive) return;
        
        requestAnimationFrame(() => this.benchmarkLoop());
        
        if (this.stats) this.stats.begin();
        
        const time = performance.now() * 0.0005;
        
        // Rotar el enjambre de asteroides masivamente
        if (this.instancedMesh) {
            this.instancedMesh.rotation.y = time * 0.1;
        }
        
        if (window.controls) window.controls.update();
        
        if (window.renderer && window.scene && window.camera) {
            window.renderer.render(window.scene, window.camera);
        }
        
        if (this.stats) this.stats.end();
    }
};

// Auto-init on load
window.addEventListener('load', () => {
    setTimeout(() => {
        if(window.TITAN && window.TITAN.Benchmark) window.TITAN.Benchmark.init();
    }, 1500);
});
