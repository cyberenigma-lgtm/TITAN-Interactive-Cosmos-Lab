// ============================================================================
// APOCALYPSE ENGINE — TITAN TOKENOMICS LAYER
// Sistema Económico de Circulación (Simulado / Web3-Ready)
// ============================================================================

window.TITAN = window.TITAN || {};
window.TITAN.TokenomicsLayer = {
    // 1. BALANCES (Wallet del Jugador)
    wallet: {
        CHR: 0, // Space Nation Token (Moneda Fuerte)
        OIK: 0  // Ecosystem Token (Logros/Gobernanza)
    },
    
    // 2. DISTRIBUTION (Suministro Global)
    supply: {
        maxSupply: 1000000000, // 1 Billón
        pools: {
            gameplay: 500000000, // 50%
            ecosystem: 50000000, // 5%
            governance: 450000000 // 45% Bloqueado
        },
        circulating: 0
    },
    
    // 3. NFTs / ACTIVOS (Naves en Propiedad)
    ownedAssets: {
        'MULE': true, // Nave inicial (Carguero básico)
        'VOYAGER': false, // Requiere Mint
        'CORSAIR': false  // Requiere Mint
    },
    
    // Costes de MINT de nuevas Naves
    mintCosts: {
        'VOYAGER': { CHR: 1000, OIK: 500 },
        'CORSAIR': { CHR: 5000, OIK: 200 }
    },
    
    init: function() {
        console.log("[TOKENOMICS] Inicializando Capa Económica TITAN...");
        this.updateHUD();
    },
    
    // --- FAUCET (Emisión de Tokens) ---
    mintCHR: function(amount) {
        if (this.supply.pools.gameplay >= amount) {
            this.supply.pools.gameplay -= amount;
            this.supply.circulating += amount;
            this.wallet.CHR += amount;
            if(window.logTitan) window.logTitan(`💰 [FAUCET] +${Math.floor(amount)} CHR mintados (Pool Gameplay).`);
            this.updateHUD();
            return true;
        }
        return false; // Pool vacía
    },
    
    mintOIK: function(amount) {
        if (this.supply.pools.ecosystem >= amount) {
            this.supply.pools.ecosystem -= amount;
            this.supply.circulating += amount;
            this.wallet.OIK += amount;
            if(window.logTitan) window.logTitan(`🌟 [FAUCET] +${Math.floor(amount)} OIK mintados (Logro Científico).`);
            this.updateHUD();
            return true;
        }
        return false;
    },
    
    // --- DRAIN (Quema / Sumidero) ---
    burnCHR: function(amount, reason) {
        if (this.wallet.CHR >= amount) {
            this.wallet.CHR -= amount;
            // El Drain lo devuelve a la pool de Gameplay o lo destruye (Burn)
            // En este modelo, 50% se quema (deflación) y 50% vuelve a la pool
            this.supply.circulating -= amount;
            this.supply.pools.gameplay += amount * 0.5; 
            
            // if(window.logTitan) window.logTitan(`🔥 [DRAIN] -${amount} CHR consumidos (${reason}).`);
            this.updateHUD();
            return true;
        }
        return false; // No hay fondos
    },
    
    // --- MECÁNICA: MINT DE NAVES (NFTs) ---
    mintShip: function(shipType) {
        if (this.ownedAssets[shipType]) {
            if(window.logTitan) window.logTitan(`[MINT] Ya posees el modelo ${shipType}.`);
            return false;
        }
        
        const cost = this.mintCosts[shipType];
        if (!cost) return false;
        
        if (this.wallet.CHR >= cost.CHR && this.wallet.OIK >= cost.OIK) {
            // Pagar
            this.burnCHR(cost.CHR, `Minting ${shipType}`);
            this.wallet.OIK -= cost.OIK; // OIK se consume como Proof of Work
            
            // Mintear
            this.ownedAssets[shipType] = true;
            if(window.logTitan) window.logTitan(`🚀 [SMART CONTRACT] Transacción Exitosa. Has acuñado el Chasis [${shipType}].`);
            
            // Auto-equipar
            if (window.TITAN.GameLayer && window.TITAN.GameLayer.Spacecraft) {
                window.TITAN.GameLayer.Spacecraft.currentShipType = shipType;
                window.TITAN.GameLayer.Spacecraft.buildShipMesh();
                window.TITAN.GameLayer.Spacecraft.toggleCamera(); // Refresh HUD
                window.TITAN.GameLayer.Spacecraft.toggleCamera();
            }
            this.updateHUD();
            return true;
        } else {
            if(window.logTitan) window.logTitan(`❌ [RECHAZADO] Fondos Insuficientes para Mintear ${shipType}. Coste: ${cost.CHR} CHR | ${cost.OIK} OIK`);
            return false;
        }
    },
    
    // --- MEJORAS DE ESTACIÓN ---
    upgradeStation: function() {
        if (!window.TITAN.GameLayer || !window.TITAN.GameLayer.Economy) return false;
        
        const currentLvl = window.TITAN.GameLayer.Economy.stationLevel;
        if (currentLvl >= 3) {
            if(window.logTitan) window.logTitan("🏢 [ESTACIÓN] Nivel Máximo Alcanzado.");
            return false;
        }
        
        const cost = currentLvl === 0 ? 10000 : 50000;
        
        if (this.burnCHR(cost, `Upgrade Station Lvl ${currentLvl + 1}`)) {
            window.TITAN.GameLayer.Economy.stationLevel++;
            if(window.logTitan) window.logTitan(`🏢 [ESTACIÓN] ¡Mejora completada! Nivel ${window.TITAN.GameLayer.Economy.stationLevel} alcanzado.`);
            // Reconstruir malla
            window.TITAN.GameLayer.Economy.buildOrbitalStation();
            return true;
        } else {
            if(window.logTitan) window.logTitan(`❌ [RECHAZADO] Fondos Insuficientes para Mejorar Estación. Coste: ${cost} CHR`);
            return false;
        }
    },
    
    // --- INTERFAZ ---
    updateHUD: function() {
        const hud = document.getElementById('token-balances');
        if (hud) {
            hud.innerHTML = `CHR: ${Math.floor(this.wallet.CHR)} | OIK: ${Math.floor(this.wallet.OIK)}`;
        }
    }
};

window.addEventListener('load', () => {
    window.TITAN.TokenomicsLayer.init();
});
