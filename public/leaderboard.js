// public/leaderboard.js
// Configuración de Firebase y lógica del Ranking Global

const firebaseConfig = {
    apiKey: "AIzaSyDwmRsOR8XedNvSPwuOapaoZaifsVATr-E",
    authDomain: "titan-cosmos.firebaseapp.com",
    projectId: "titan-cosmos",
    storageBucket: "titan-cosmos.firebasestorage.app",
    messagingSenderId: "196134202631",
    appId: "1:196134202631:web:350c6f71da4513148869a2",
    measurementId: "G-XC13ZHHRV0"
};

let db = null;
let playerName = localStorage.getItem('titan_pilot_name');

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Firebase
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("[LEADERBOARD] Firebase conectado.");
    } catch (e) {
        console.error("[LEADERBOARD] Error al iniciar Firebase:", e);
    }

    // Pedir nombre del piloto si no existe
    if (!playerName) {
        setTimeout(() => {
            let name = prompt("🚀 BIENVENIDO A TITAN-CRAFT\nIntroduce tu Callsign (Nombre de Piloto) para el Ranking Global:", "Piloto_" + Math.floor(Math.random() * 9999));
            if (name && name.trim().length > 0) {
                playerName = name.trim().substring(0, 15);
                localStorage.setItem('titan_pilot_name', playerName);
            } else {
                playerName = "Piloto_Anónimo";
            }
        }, 1000);
    }
});

window.TITAN = window.TITAN || {};
window.TITAN.Leaderboard = {
    // Función que se llamará al subir de nivel o vaciar la bóveda
    updateScore: function(level, xp) {
        if (!db || !playerName) return;
        if (firebaseConfig.apiKey === "PENDIENTE") return; // Evitar fallos si no hay config
        
        db.collection("leaderboard").doc(playerName).set({
            name: playerName,
            level: level,
            xp: xp,
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }).then(() => {
            console.log(`[LEADERBOARD] Puntuación de ${playerName} actualizada (Lvl ${level}, XP: ${xp})`);
        }).catch(err => {
            console.error("[LEADERBOARD] Error al actualizar puntuación:", err);
        });
    },
    
    // Función para mostrar la UI
    showRankingModal: function() {
        if (!db || firebaseConfig.apiKey === "PENDIENTE") {
            alert("El Ranking Global aún se está configurando en los servidores de Firebase. ¡Inténtalo de nuevo en unos minutos!");
            return;
        }
        
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.width = '600px';
        modal.style.background = 'rgba(0, 5, 15, 0.95)';
        modal.style.border = '1px solid #00ffff';
        modal.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
        modal.style.color = '#fff';
        modal.style.zIndex = '99999';
        modal.style.padding = '30px';
        modal.style.fontFamily = "'Outfit', sans-serif";
        modal.style.borderRadius = '8px';
        
        let html = `
            <h2 style="color: #00ffff; text-align: center; margin-top: 0; text-transform: uppercase; letter-spacing: 2px;">🏆 Ránking Global (Top Pilotos)</h2>
            <div id="ranking-list" style="margin-top: 20px; max-height: 400px; overflow-y: auto;">
                <p style="text-align: center; color: #888;">📡 Sincronizando con la red estelar...</p>
            </div>
            <div style="text-align: center; margin-top: 25px;">
                <button id="btn-close-ranking" style="background: rgba(255,0,85,0.2); border: 1px solid #ff0055; color: #ff0055; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-weight: bold; font-family: 'Outfit', sans-serif; letter-spacing: 1px;">CERRAR</button>
            </div>
        `;
        modal.innerHTML = html;
        document.body.appendChild(modal);
        
        document.getElementById('btn-close-ranking').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Descargar Top 10
        db.collection("leaderboard")
          .orderBy("xp", "desc")
          .limit(10)
          .get()
          .then(snapshot => {
              const listDiv = document.getElementById('ranking-list');
              listDiv.innerHTML = '';
              
              if (snapshot.empty) {
                  listDiv.innerHTML = '<p style="text-align: center; color: #888;">El universo está vacío. ¡Sé el primero en farmear chatarra!</p>';
                  return;
              }
              
              let rank = 1;
              snapshot.forEach(doc => {
                  const data = doc.data();
                  const isMe = data.name === playerName;
                  const bg = isMe ? 'rgba(0, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.02)';
                  const border = isMe ? '1px solid #00ffff' : '1px solid #333';
                  
                  listDiv.innerHTML += `
                      <div style="display: flex; justify-content: space-between; background: ${bg}; border: ${border}; margin-bottom: 8px; padding: 12px; border-radius: 4px;">
                          <div style="font-weight: bold; font-size: 16px;">
                              <span style="color: #00ffff; display: inline-block; width: 30px;">#${rank}</span> 
                              ${data.name} ${isMe ? '<span style="color:#00ffff; font-size:12px;">(TÚ)</span>' : ''}
                          </div>
                          <div style="text-align: right;">
                              <span style="color: #ffaa00; font-weight: bold;">NIVEL ${data.level}</span>
                              <span style="color: #888; font-size: 12px; margin-left: 10px;">${data.xp} XP</span>
                          </div>
                      </div>
                  `;
                  rank++;
              });
          })
          .catch(err => {
              document.getElementById('ranking-list').innerHTML = `<p style="text-align: center; color: #ff0055;">Error de conexión: ${err.message}</p>`;
          });
    }
};
