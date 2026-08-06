/**
 * ============================================================================
 * APOCALYPSE ENGINE — SIMULADOR COSMOLÓGICO Y MOTOR DE DEFENSA PLANETARIA 3D
 * Autor y Creador Original: José Manuel
 * Copyright (c) 2026 José Manuel. Todos los derechos reservados.
 * ============================================================================
 */

// ============================================================================
// 🔬 BASE DE DATOS CIENTÍFICA — CATÁLOGO DE OBJETOS CELESTES
// Datos basados en: NASA, ESA, SIMBAD, Hipparcos, IAU
// ============================================================================
const COSMIC_DB = {
    // ===================== SISTEMA SOLAR =====================
    "Sol": {
        type: "ESTRELLA — TIPO G2V (Enana Amarilla)", category: "star",
        mass: "1.989 × 10³⁰ kg (1 M☉)", radius: "696.340 km (1 R☉)",
        temp: "5.778 K (superficie)", dist: "0 ly (origen)",
        mag: "-26.74 (visual)", spectral: "G2V",
        desc: "Nuestra estrella. Tiene 4.600 millones de años y se encuentra en la mitad de su vida. Está en el brazo de Orión de la Vía Láctea, a 26.000 años luz del centro galáctico.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/320px-Above_Gotham.jpg",
        nasaImg: "https://sdo.gsfc.nasa.gov/assets/img/latest/latest_256_HMIIC.jpg",
        wiki: "https://es.wikipedia.org/wiki/Sol",
        nasa: "https://solarsystem.nasa.gov/solar-system/sun/overview/",
        era: "Formado hace 4.600 millones de años — Presente"
    },
    "Mercurio": {
        type: "PLANETA ROCOSO — ORDEN 1", category: "planet",
        mass: "3.301 × 10²³ kg (0.055 M⊕)", radius: "2.439,7 km",
        temp: "430°C (día) / -180°C (noche)", dist: "0.39 UA del Sol",
        mag: "-2.6 (máx)", spectral: "Planeta rocoso",
        desc: "El planeta más pequeño y más cercano al Sol. Sin atmósfera, con cráteres masivos. Su día dura 59 días terrestres. Explorado por la sonda MESSENGER (2004-2015) y BepiColombo (en camino).",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/280px-Mercury_in_true_color.jpg",
        wiki: "https://es.wikipedia.org/wiki/Mercurio_(planeta)",
        nasa: "https://solarsystem.nasa.gov/planets/mercury/overview/",
        era: "Formado hace 4.500 millones de años"
    },
    "Venus": {
        type: "PLANETA ROCOSO — ORDEN 2", category: "planet",
        mass: "4.867 × 10²⁴ kg (0.815 M⊕)", radius: "6.051,8 km",
        temp: "465°C (superficie)", dist: "0.72 UA del Sol",
        mag: "-4.9 (máx)", spectral: "Planeta rocoso",
        desc: "El planeta más caliente del Sistema Solar. Su atmósfera de CO₂ crea un efecto invernadero extremo. Gira al revés respecto a la mayoría de planetas. Explorado por las sondas Venera soviéticas y Magellan de NASA.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/280px-Venus-real_color.jpg",
        wiki: "https://es.wikipedia.org/wiki/Venus_(planeta)",
        nasa: "https://solarsystem.nasa.gov/planets/venus/overview/",
        era: "Formado hace 4.500 millones de años"
    },
    "Tierra": {
        type: "PLANETA ROCOSO — ORDEN 3 (HOGAR)", category: "planet",
        mass: "5.972 × 10²⁴ kg (1 M⊕)", radius: "6.371 km",
        temp: "15°C (media superficie)", dist: "1 UA del Sol = 149.6 M km",
        mag: "-3.9 (desde el espacio)", spectral: "Planeta de Tipo Tierra",
        desc: "El único planeta conocido con vida. Tiene tectónica de placas activa, océanos líquidos, una luna grande que estabiliza su eje y un campo magnético que protege la vida de la radiación solar.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/280px-The_Earth_seen_from_Apollo_17.jpg",
        wiki: "https://es.wikipedia.org/wiki/Tierra",
        nasa: "https://solarsystem.nasa.gov/planets/earth/overview/",
        era: "Formada hace 4.540 millones de años"
    },
    "La Luna": {
        type: "SATÉLITE NATURAL — TIERRA", category: "moon",
        mass: "7.342 × 10²² kg (0.012 M⊕)", radius: "1.737,4 km",
        temp: "127°C (día) / -173°C (noche)", dist: "384.400 km de la Tierra",
        mag: "-12.7 (luna llena)", spectral: "Satélite rocoso",
        desc: "Único cuerpo extraterrestre pisado por humanos (Apolo 11, 1969). Estabiliza el eje de la Tierra. Se está alejando 3.8 cm/año. Origen: impacto gigante (Theia) hace 4.500 Ma.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/280px-FullMoon2010.jpg",
        wiki: "https://es.wikipedia.org/wiki/Luna",
        nasa: "https://solarsystem.nasa.gov/moons/earths-moon/overview/",
        era: "Formada hace 4.500 millones de años"
    },
    "Marte": {
        type: "PLANETA ROCOSO — ORDEN 4 (PLANETA ROJO)", category: "planet",
        mass: "6.417 × 10²³ kg (0.107 M⊕)", radius: "3.389,5 km",
        temp: "-63°C (media)", dist: "1.52 UA del Sol",
        mag: "-2.91 (máx)", spectral: "Planeta rocoso",
        desc: "El planeta más explorado tras la Tierra. Tiene el monte más alto del Sistema Solar (Olympus Mons, 21.9 km) y el cañón más largo (Valles Marineris). Rovers actuales: Perseverance y Curiosity.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/280px-OSIRIS_Mars_true_color.jpg",
        wiki: "https://es.wikipedia.org/wiki/Marte_(planeta)",
        nasa: "https://solarsystem.nasa.gov/planets/mars/overview/",
        era: "Formado hace 4.500 millones de años"
    },
    "Júpiter": {
        type: "GIGANTE GASEOSO — ORDEN 5", category: "planet",
        mass: "1.898 × 10²⁷ kg (317.8 M⊕)", radius: "71.492 km",
        temp: "-145°C (cima nubes)", dist: "5.2 UA del Sol",
        mag: "-2.94 (máx)", spectral: "Gigante gaseoso (H/He)",
        desc: "El planeta más grande del Sistema Solar. Su Gran Mancha Roja es una tormenta que lleva activa más de 350 años. Protege a la Tierra de asteroides con su enorme gravedad. Explorado por Juno (NASA).",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/280px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
        wiki: "https://es.wikipedia.org/wiki/J%C3%BApiter_(planeta)",
        nasa: "https://solarsystem.nasa.gov/planets/jupiter/overview/",
        era: "Formado hace 4.500 millones de años"
    },
    "Saturno": {
        type: "GIGANTE GASEOSO — ORDEN 6 (SEÑOR DE LOS ANILLOS)", category: "planet",
        mass: "5.683 × 10²⁶ kg (95.2 M⊕)", radius: "60.268 km",
        temp: "-178°C (cima nubes)", dist: "9.58 UA del Sol",
        mag: "0.46 (máx)", spectral: "Gigante gaseoso (H/He)",
        desc: "Sus anillos están hechos de hielo y roca, con un grosor de solo 10-100 metros pero un diámetro de 282.000 km. Tiene 146 lunas conocidas, incluyendo Titán con atmósfera y lagos de metano.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/280px-Saturn_during_Equinox.jpg",
        wiki: "https://es.wikipedia.org/wiki/Saturno_(planeta)",
        nasa: "https://solarsystem.nasa.gov/planets/saturn/overview/",
        era: "Formado hace 4.500 millones de años"
    },
    "Urano": {
        type: "GIGANTE HELADO — ORDEN 7", category: "planet",
        mass: "8.681 × 10²⁵ kg (14.5 M⊕)", radius: "25.559 km",
        temp: "-216°C (mínima)", dist: "19.18 UA del Sol",
        mag: "5.38 (máx)", spectral: "Gigante helado (H/He/CH₄)",
        desc: "Gira de lado con una inclinación axial de 97.77°. Su color azul-verde viene del metano en su atmósfera. Tiene anillos y 28 lunas. Es el planeta más frío del Sistema Solar.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/280px-Uranus2.jpg",
        wiki: "https://es.wikipedia.org/wiki/Urano_(planeta)",
        nasa: "https://solarsystem.nasa.gov/planets/uranus/overview/",
        era: "Formado hace 4.500 millones de años"
    },
    "Neptuno": {
        type: "GIGANTE HELADO — ORDEN 8", category: "planet",
        mass: "1.024 × 10²⁶ kg (17.1 M⊕)", radius: "24.764 km",
        temp: "-214°C (cima nubes)", dist: "30.07 UA del Sol",
        mag: "7.78 (máx)", spectral: "Gigante helado (H/He/CH₄)",
        desc: "Los vientos más rápidos del Sistema Solar: hasta 2.100 km/h. Su luna Tritón orbita al revés (retrógrada) y se cree que fue capturada del Cinturón de Kuiper. Único planeta descubierto por predicción matemática.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/280px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg",
        wiki: "https://es.wikipedia.org/wiki/Neptuno_(planeta)",
        nasa: "https://solarsystem.nasa.gov/planets/neptune/overview/",
        era: "Formado hace 4.500 millones de años"
    },
    // ===================== NEOs / ASTEROIDES =====================
    "Apophis": {
        type: "NEO — ASTEROIDE POTENCIALMENTE PELIGROSO (PHA)", category: "neo",
        mass: "~2.7 × 10¹⁰ kg (estimado)", radius: "~185 m (diám. 370m)",
        temp: "~240°C (est.)", dist: "Variable — aprox. 0.97 UA en 2029",
        mag: "19.7", spectral: "Sq (silicato/metal)",
        desc: "El asteroide más peligroso conocido. Pasará a 37.900 km de la Tierra el 13 de abril de 2029 — dentro de la órbita de los satélites geoestacionarios. Completamente visible a ojo desnudo. Riesgo de impacto 2068.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/99942_Apophis_basic.png/280px-99942_Apophis_basic.png",
        wiki: "https://es.wikipedia.org/wiki/Apophis",
        nasa: "https://cneos.jpl.nasa.gov/sentry/details.html#?des=99942",
        era: "Presente — Encuentro crítico: 13 Abril 2029"
    },
    "Bennu": {
        type: "NEO — ASTEROIDE TIPO B (OBJETIVO OSIRIS-REX)", category: "neo",
        mass: "7.329 × 10¹⁰ kg", radius: "245 m (diám. ~490m)",
        temp: "~80°C (est.)", dist: "Variable — aprox. 1.13 UA",
        mag: "20.6", spectral: "B (carbonáceo primitivo)",
        desc: "Contiene material orgánico de los primeros días del Sistema Solar. La sonda OSIRIS-REx recogió 250g de muestras en 2020. Probabilidad de impacto en 2182: 0.037%. Misión OSIRIS-APEX llegará en 2029.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Bennu_mosaic_OSIRIS-REx.jpg/280px-Bennu_mosaic_OSIRIS-REx.jpg",
        wiki: "https://es.wikipedia.org/wiki/101955_Bennu",
        nasa: "https://www.nasa.gov/mission_pages/osiris-rex/main",
        era: "Presente — Riesgo 2182"
    },
    "'Oumuamua": {
        type: "OBJETO INTERESTELAR — 1I/2017 U1", category: "neo",
        mass: "Desconocida", radius: "~50×10m (muy alargado)",
        temp: "~17°C (al perihelio)", dist: "Más allá de Neptuno (saliendo)",
        mag: "22.1", spectral: "Indefinido (sin coma, sin cola)",
        desc: "Primer objeto interestelar confirmado en nuestro Sistema Solar. Aceleró de forma inexplicable sin eyección de gas visible. Origen probable: sistema de Vega. Su forma extremadamente alargada y aceleración anómala siguen sin explicación definitiva.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Artist%27s_impression_of_%60Oumuamua.jpg/280px-Artist%27s_impression_of_%60Oumuamua.jpg",
        wiki: "https://es.wikipedia.org/wiki/%CA%BBOumuamua",
        nasa: "https://solarsystem.nasa.gov/asteroids-comets-and-meteors/other/oumuamua/in-depth/",
        era: "Detectado: Octubre 2017 — Objeto de paso"
    },
    // ===================== AGUJEROS NEGROS =====================
    "Sgr A*": {
        type: "AGUJERO NEGRO SUPERMASIVO — CENTRO GALÁCTICO", category: "blackhole",
        mass: "4.1 × 10⁶ M☉ (4,1 millones de masas solares)", radius: "Horizonte: 12.4 M km",
        temp: "~10¹² K (disco de acreción)", dist: "26.000 años luz",
        mag: "N/A (invisible en óptico)", spectral: "Radio/X/Gamma",
        desc: "El agujero negro supermasivo en el centro de la Vía Láctea. Primera imagen directa obtenida por el Event Horizon Telescope en 2022. Las estrellas de la nube S orbitan a su alrededor a miles de km/s. S2 orbita en solo 16 años.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/280px-Black_hole_-_Messier_87_crop_max_res.jpg",
        wiki: "https://es.wikipedia.org/wiki/Sagitario_A*",
        nasa: "https://chandra.harvard.edu/photo/2003/0203long/",
        era: "Formado: ~10.000 millones de años — Presente"
    },
    "M87*": {
        type: "AGUJERO NEGRO SUPERMASIVO — GALAXIA M87", category: "blackhole",
        mass: "6.5 × 10⁹ M☉ (6.500 millones de masas solares)", radius: "Horizonte: ~19.000 M km",
        temp: ">10¹² K", dist: "53,5 millones de años luz",
        mag: "N/A", spectral: "Radio/X/Gamma",
        desc: "Primer agujero negro fotografiado directamente (Event Horizon Telescope, 10 Abril 2019). Genera un jet relativista de 5.000 años luz de longitud. Es 1.500 veces más masivo que Sgr A*.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/280px-Black_hole_-_Messier_87_crop_max_res.jpg",
        wiki: "https://es.wikipedia.org/wiki/M87*",
        nasa: "https://www.nasa.gov/mission_pages/chandra/news/new-very-long-baseline-array-image-of-m87",
        era: "Formado: ~1.000 millones de años después del BB"
    },
    "TON 618": {
        type: "CUÁSAR / AGUJERO NEGRO ULTRAMASIVO", category: "blackhole",
        mass: "6.6 × 10¹⁰ M☉ (66.000 millones de masas solares)", radius: "Horizonte: ~197.000 M km",
        temp: ">10¹³ K", dist: "10.400 millones de años luz",
        mag: "15.9", spectral: "QSO (cuásar)",
        desc: "Uno de los agujeros negros más masivos conocidos. Su horizonte de sucesos cabe 12 veces entre el Sol y Neptuno. Emite tanta luz como 140 billones de soles. Se ve tal como era hace 10.400 millones de años.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/280px-Black_hole_-_Messier_87_crop_max_res.jpg",
        wiki: "https://es.wikipedia.org/wiki/TON_618",
        nasa: "https://heasarc.gsfc.nasa.gov/",
        era: "Luz emitida hace 10.400 millones de años"
    },
    // ===================== NEBULOSAS =====================
    "Nebulosa del Cangrejo": {
        type: "NEBULOSA DE SUPERNOVA — REMANENTE", category: "nebula",
        mass: "~10 M☉", radius: "~11 años luz",
        temp: "~30 millones K (centro)", dist: "6.500 años luz",
        mag: "8.4", spectral: "Emisión / Sincrotrón",
        desc: "Restos de la supernova SN 1054, observada por astrónomos chinos y árabes el 4 de julio de 1054. En el centro hay un púlsar que gira 30 veces por segundo. Emite rayos X, gamma y luz visible.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/280px-Crab_Nebula.jpg",
        wiki: "https://es.wikipedia.org/wiki/Nebulosa_del_Cangrejo",
        nasa: "https://www.nasa.gov/image-feature/the-crab-nebula",
        era: "Supernova: 4 Julio 1054 d.C."
    },
    "Nebulosa Orión": {
        type: "NEBULOSA DE EMISIÓN — CUNA ESTELAR", category: "nebula",
        mass: "~2.000 M☉", radius: "~24 años luz",
        temp: "~10.000 K (promedio)", dist: "1.344 años luz",
        mag: "4.0", spectral: "Emisión (HII)",
        desc: "La región de formación estelar más cercana a la Tierra. Visible a simple vista como el cuarto 'objeto' de la espada de Orión. Contiene más de 700 estrellas en formación. El JWST reveló planetas protoplanetarios en 2023.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/280px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
        wiki: "https://es.wikipedia.org/wiki/Nebulosa_de_Ori%C3%B3n",
        nasa: "https://www.nasa.gov/image-feature/goddard/2017/hubble-s-orion",
        era: "Activa — Edad: ~10 millones de años"
    }
};

// ============================================================================
// ⏱️ MOTOR DE ERA CÓSMICA — Evolución temporal del universo
// ============================================================================
const MS_PER_YEAR = 365.25 * 24 * 3600 * 1000;
const AGE_UNIVERSE_MS = 13.8e9 * MS_PER_YEAR; // 13.800 millones de años en ms

// Umbrales de era alineados con la escala temporal de la UI (COSMIC_ERAS)
const ERA_THRESHOLDS = {
    BIG_BANG:      -4e17,                               // t=0: Big Bang
    FIRST_STARS:   -4e14,                               // Primeras estrellas
    FIRST_GALAXIES:-2.5e14,                             // Primeras galaxias
    MILKY_WAY:     -1.4e14,                             // Vía Láctea
    SOLAR_SYSTEM:  -1.3e14,                             // Formación del Sistema Solar (después de la galaxia)
    PRESENT:       0
};

// Esfera de plasma del Big Bang
let plasmaSphere = null;

function createPlasmaSphere() {
    if (plasmaSphere) return;
    const geo = new THREE.SphereGeometry(8000, 32, 32);
    const mat = new THREE.MeshBasicMaterial({
        color: 0xff4400,
        transparent: true,
        opacity: 0.0,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    plasmaSphere = new THREE.Mesh(geo, mat);
    plasmaSphere.visible = false;
    scene.add(plasmaSphere);
}

function updateUniverseState(offset) {
    // offset = cosmicOffset en ms (negativo = pasado)
    if (!plasmaSphere) createPlasmaSphere();

    const solarSys = typeof solarSystem !== 'undefined' ? solarSystem : null;
    const mwSphere = window.milkyWaySphere;
    const hipp = window.hipparcosGroup;
    const zoa = window.zoaGroup;
    const cosmicWeb = window.cosmicWeb;

    // === ERA 1: BIG BANG / PLASMA (antes de primeras estrellas) ===
    if (offset < ERA_THRESHOLDS.FIRST_STARS) {
        const t = Math.max(0, (offset - ERA_THRESHOLDS.BIG_BANG) / (ERA_THRESHOLDS.FIRST_STARS - ERA_THRESHOLDS.BIG_BANG));
        plasmaSphere.visible = true;
        plasmaSphere.material.opacity = Math.max(0, 0.6 - t * 0.6);
        plasmaSphere.material.color.setHSL(0.05 - t * 0.02, 1, 0.5);
        if (solarSys) solarSys.visible = false;
        if (mwSphere) mwSphere.visible = false;
        if (hipp) hipp.visible = false;
        if (zoa) zoa.visible = false;
        if (cosmicWeb) cosmicWeb.visible = false;

    // === ERA 2: PRIMERAS ESTRELLAS (Población III) ===
    } else if (offset < ERA_THRESHOLDS.FIRST_GALAXIES) {
        plasmaSphere.visible = true;
        plasmaSphere.material.opacity = 0.1;
        if (solarSys) solarSys.visible = false;
        if (mwSphere) mwSphere.visible = false;
        if (hipp) { hipp.visible = true; hipp.children.forEach(c => { if(c.material) c.material.opacity = 0.3; }); }
        if (zoa) zoa.visible = false;
        if (cosmicWeb) cosmicWeb.visible = true;

    // === ERA 3: PRIMERAS GALAXIAS ===
    } else if (offset < ERA_THRESHOLDS.MILKY_WAY) {
        plasmaSphere.visible = false;
        if (solarSys) solarSys.visible = false;
        if (mwSphere) mwSphere.visible = false;
        if (hipp) { hipp.visible = true; hipp.children.forEach(c => { if(c.material) c.material.opacity = 0.5; }); }
        if (zoa) zoa.visible = true;
        if (cosmicWeb) cosmicWeb.visible = true;

    // === ERA 4: VÍA LÁCTEA (sin Sistema Solar) ===
    } else if (offset < ERA_THRESHOLDS.SOLAR_SYSTEM) {
        plasmaSphere.visible = false;
        if (solarSys) solarSys.visible = false;
        if (mwSphere) { mwSphere.visible = true; if(mwSphere.material) mwSphere.material.opacity = 0.7; }
        if (hipp) { hipp.visible = true; hipp.children.forEach(c => { if(c.material) c.material.opacity = 0.8; }); }
        if (zoa) zoa.visible = true;
        if (cosmicWeb) cosmicWeb.visible = true;

    // === ERA 5: SISTEMA SOLAR Y PRESENTE ===
    } else {
        plasmaSphere.visible = false;
        if (solarSys) solarSys.visible = true;
        if (mwSphere) { mwSphere.visible = true; if(mwSphere.material) mwSphere.material.opacity = 1.0; }
        if (hipp) { hipp.visible = true; hipp.children.forEach(c => { if(c.material) c.material.opacity = 1.0; }); }
        if (zoa) zoa.visible = true;
        if (cosmicWeb) cosmicWeb.visible = true;

        // ☀️ Evolución Física Dinámica del Sol (Tamaño y Espectro)
        if (typeof sun !== 'undefined' && sun) {
            if (offset < 0) {
                // Hacia el pasado (Joven Sol): T Tauri Protoestrella
                // Se expande gradualmente hasta 2.2x y se vuelve más rojiza/anaranjada
                const t = Math.min(1.0, Math.abs(offset) / Math.abs(ERA_THRESHOLDS.SOLAR_SYSTEM));
                const targetScale = 1.0 + t * 1.2;
                sun.scale.set(targetScale, targetScale, targetScale);
                if (sun.material) {
                    // Cambiar color a naranja/rojo
                    sun.material.color.setRGB(1.0, 1.0 - t * 0.5, 1.0 - t * 0.8);
                }
            } else {
                // Hacia el futuro lejanísimo (Gigante Roja)
                // Escala aumenta de forma exponencial
                const t = Math.min(1.0, offset / 1e12); // Límite de escala en el futuro
                const targetScale = 1.0 + t * 4.0;
                sun.scale.set(targetScale, targetScale, targetScale);
                if (sun.material) {
                    sun.material.color.setRGB(1.0, 1.0 - t * 0.7, 1.0 - t * 0.9);
                }
            }
        }
    }
}

// ============================================================================
// 🔭 FUNCIÓN GLOBAL: Mostrar datos científicos de cualquier objeto
// ============================================================================
function showLabPanel(name, extraData = {}) {
    const panel = document.getElementById('info-panel');
    if (!panel) return;

    // Buscar en la base de datos científica
    const db = COSMIC_DB[name] || {};
    const data = { ...db, ...extraData };

    // Rellenar campos
    document.getElementById('target-name').textContent = name;
    document.getElementById('target-type').textContent = data.type || 'OBJETO CELESTE';
    document.getElementById('target-desc').textContent = data.desc || 'Cuerpo celeste del laboratorio TITAN-LAB.';
    document.getElementById('target-dist').textContent = data.dist || '-';
    document.getElementById('target-mag').textContent = data.mag || '-';
    document.getElementById('target-temp').textContent = data.temp || '-';
    document.getElementById('target-mass').textContent = data.mass || '-';
    document.getElementById('target-radius').textContent = data.radius || '-';
    document.getElementById('target-spectral').textContent = data.spectral || '-';
    document.getElementById('target-era').textContent = data.era || '-';

    // Imagen
    const imgEl = document.getElementById('target-image');
    const imgSrc = data.nasaImg || data.img || '';
    if (imgSrc) {
        imgEl.src = imgSrc;
        imgEl.style.display = 'block';
        imgEl.onerror = () => { 
            if (data.img && imgEl.src !== data.img) { imgEl.src = data.img; }
            else { imgEl.style.display = 'none'; }
        };
        document.getElementById('target-img-source').style.display = 'block';
    } else {
        imgEl.style.display = 'none';
        document.getElementById('target-img-source').style.display = 'none';
    }

    // Links externos
    const linksDiv = document.getElementById('target-links');
    linksDiv.innerHTML = '';
    const linkStyle = 'display:inline-block;padding:3px 8px;border-radius:3px;font-size:0.65rem;font-weight:bold;text-decoration:none;border:1px solid rgba(255,255,255,0.2);color:white;';
    if (data.nasa) linksDiv.innerHTML += `<a href="${data.nasa}" target="_blank" style="${linkStyle}background:rgba(0,100,200,0.3);">🚀 NASA</a>`;
    if (data.wiki) linksDiv.innerHTML += `<a href="${data.wiki}" target="_blank" style="${linkStyle}background:rgba(50,50,50,0.5);">📖 Wiki</a>`;
    if (data.simbad_url) linksDiv.innerHTML += `<a href="${data.simbad_url}" target="_blank" style="${linkStyle}background:rgba(100,0,100,0.4);">🔭 SIMBAD</a>`;

    panel.classList.remove('hidden');
}

// Configuración básica de Three.js
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();

// === FASE 8: TOPOLOGÍA MULTIVERSAL ===
window.ourUniverse = new THREE.Group();
scene.add(window.ourUniverse);

window.otherUniverses = new THREE.Group();
window.otherUniverses.visible = false; // Solo visibles con el toggle
scene.add(window.otherUniverses);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000000);
camera.position.set(75, 200, 400);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// === EJES Y CUADRÍCULA (Laboratorio Cosmológico) ===
const axesHelper = new THREE.AxesHelper(1000); // X=Rojo, Y=Verde, Z=Azul
axesHelper.visible = false;
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(2000, 100, 0x2a3a4a, 0x222222);
gridHelper.visible = false;
scene.add(gridHelper);

// === CATÁLOGO DE GALAXIAS REALES ===
const cellSize = 10;
function fetchGalaxias() {
    fetch('http://localhost:8080/api/galaxias')
    .then(r => r.json())
    .then(data => {
        const geo = new THREE.BufferGeometry();
        const pos = [];
        data.forEach(g => {
            // "g" ya contiene las coordenadas INMENSAS del universo (raw_x, raw_y, raw_z)
            // Ya no están apretadas en las 15 celdas del panal.
            // Sumamos 75 para centrarlas respecto al sistema solar
            pos.push(g.x + 75, g.y + 75, g.z + 75); 
        });
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        
        const mat = new THREE.PointsMaterial({ 
            color: 0x00f0ff, 
            size: 20, 
            transparent: true, 
            opacity: 0.8,
            blending: THREE.AdditiveBlending 
        });
        
        const puntos = new THREE.Points(geo, mat);
        window.ourUniverse.add(puntos);
    })
    .catch(e => console.error("Error cargando universo", e));
}
fetchGalaxias();

let skyboxSphere;
// === ESPACIO PROFUNDO (STELLARIUM MODE) ===
// El skybox JPG estático fue eliminado. Ahora el fondo es 100% generado
// matemáticamente por datos astronómicos puros (Hipparcos, Galaxia Volumétrica 1M y ZOA).
// === CATÁLOGO HIPPARCOS (DATOS REALES) ===
const hipparcosGroup = new THREE.Group();
window.ourUniverse.add(hipparcosGroup);

fetch('/data/hipparcos.json')
    .then(res => res.json())
    .then(data => {
        // data es [x,y,z, r,g,b, x,y,z, r,g,b...]
        const numStars = data.length / 6;
        const positions = new Float32Array(numStars * 3);
        const colors = new Float32Array(numStars * 3);
        
        let j = 0;
        let c = 0;
        for (let i = 0; i < data.length; i += 6) {
            // Escalar posiciones (1 parsec = 10 unidades para que quepa bien en el motor)
            positions[j++] = 75 + data[i] * 10;
            positions[j++] = 75 + data[i+1] * 10;
            positions[j++] = 75 + data[i+2] * 10;
            
            colors[c++] = data[i+3];
            colors[c++] = data[i+4];
            colors[c++] = data[i+5];
        }
        
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const mat = new THREE.PointsMaterial({
            size: 0.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true
        });
        
        const points = new THREE.Points(geo, mat);
        hipparcosGroup.add(points);
        logTitan(`Cargadas ${numStars} estrellas del Catálogo Hipparcos.`);
        
        // === ZOA EXTRAPOLATION (Masa Faltante) ===
        const zoaStars = 80000; // Densidad aumentada para rellenar visiblemente el hueco
        const zoaPositions = new Float32Array(zoaStars * 3);
        const zoaColors = new Float32Array(zoaStars * 3);
        let zi = 0; let zc = 0;
        for(let i=0; i<zoaStars; i++) {
            // Generar disco denso para rellenar el hueco ecuatorial galáctico
            // Distribución gaussiana para mayor densidad en el centro del disco
            const r = 50 + Math.abs((Math.random() + Math.random() + Math.random() - 1.5)) * 4500;
            const theta = Math.random() * Math.PI * 2;
            // Espesor del disco también gaussiano — más denso cerca del plano
            const y = (Math.random() - 0.5) * (Math.random() * 600);
            
            // Centrados en el origen local (luego se aplica la rotación y el offset global)
            zoaPositions[zi++] = Math.cos(theta) * r;
            zoaPositions[zi++] = y;
            zoaPositions[zi++] = Math.sin(theta) * r;
            
            // Color realista: mezcla de polvo rojizo y estrellas azuladas ocultas
            const starType = Math.random();
            if (starType < 0.4) {
                // Estrellas rojizas atenuadas por polvo
                zoaColors[zc++] = 0.9 + Math.random() * 0.1;
                zoaColors[zc++] = 0.5 + Math.random() * 0.3;
                zoaColors[zc++] = 0.3 + Math.random() * 0.2;
            } else if (starType < 0.7) {
                // Estrellas blancas/amarillas
                zoaColors[zc++] = 0.8 + Math.random() * 0.2;
                zoaColors[zc++] = 0.8 + Math.random() * 0.2;
                zoaColors[zc++] = 0.7 + Math.random() * 0.3;
            } else {
                // Estrellas azuladas de fondo
                zoaColors[zc++] = 0.5 + Math.random() * 0.3;
                zoaColors[zc++] = 0.6 + Math.random() * 0.3;
                zoaColors[zc++] = 0.9 + Math.random() * 0.1;
            }
        }
        const zoaGeo = new THREE.BufferGeometry();
        zoaGeo.setAttribute('position', new THREE.BufferAttribute(zoaPositions, 3));
        zoaGeo.setAttribute('color', new THREE.BufferAttribute(zoaColors, 3));
        window.zoaGroup = new THREE.Points(zoaGeo, new THREE.PointsMaterial({
            size: 0.5, vertexColors: true, transparent: true, opacity: 0.35, sizeAttenuation: true, blending: THREE.AdditiveBlending
        }));
        
        // Alinear al plano galáctico (Aprox 62.8 grados respecto al ecuador celeste)
        window.zoaGroup.rotation.x = 1.09; 
        window.zoaGroup.rotation.z = 1.07;
        window.zoaGroup.position.set(75, 75, 75); // Centrar en el Sol
        window.zoaGroup.visible = true; // ✅ ACTIVO POR DEFECTO — rellena la ZOA siempre
        window.ourUniverse.add(window.zoaGroup);
        logTitan(`[ZOA] Motor Cuántico: Generadas ${zoaStars} estrellas sintéticas para rellenar la Zona de Evitación.`);
        logTitan(`[ZOA] Masividad Oculta calculada: ~${(zoaStars * 1.2).toFixed(0)} Millones de Masas Solares.`);
        
        // === CONSTELLATIONS (3D Lines) ===
        fetch('/data/constellations_3d.json')
            .then(res => res.json())
            .then(lineData => {
                const linePositions = new Float32Array(lineData.length);
                for(let i=0; i<lineData.length; i+=3) {
                    linePositions[i]   = 75 + lineData[i] * 10;
                    linePositions[i+1] = 75 + lineData[i+1] * 10;
                    linePositions[i+2] = 75 + lineData[i+2] * 10;
                }
                const lineGeo = new THREE.BufferGeometry();
                lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
                const lineMat = new THREE.LineBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.3 });
                const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
                hipparcosGroup.add(lineMesh);
                logTitan(`Cargadas líneas de constelaciones 3D.`);
            });
        
        // === SIMBAD (Professional Astronomical Data & Constellations) ===
        window.simbadGroup = new THREE.Group();
        window.ourUniverse.add(window.simbadGroup);
        window.namedStars = [];

        function renderSimbadStar(s) {
            // Tamaño según radio estelar si existe, o por defecto
            const rVal = parseFloat(s.radius) || 2.0;
            const size = Math.min(8.0, Math.max(1.5, rVal * 0.15));

            // Malla 3D para la estrella con fotosfera resplandeciente
            const starGeo = new THREE.SphereGeometry(size, 24, 24);
            const starMat = new THREE.MeshBasicMaterial({ color: s.color || 0xffddaa });
            const starMesh = new THREE.Mesh(starGeo, starMat);
            
            // Halo estelar exterior
            const glowGeo = new THREE.SphereGeometry(size * 1.8, 16, 16);
            const glowMat = new THREE.MeshBasicMaterial({
                color: s.color || 0xffddaa,
                transparent: true,
                opacity: 0.35,
                blending: THREE.AdditiveBlending
            });
            const glowMesh = new THREE.Mesh(glowGeo, glowMat);
            starMesh.add(glowMesh);

            starMesh.position.set(75 + s.x * 10, 75 + s.y * 10, 75 + s.z * 10);
            
            starMesh.userData = {
                name: s.name,
                isSIMBAD: true,
                isExtraSystem: true,
                spectralColor: s.color,
                simbad: {
                    name: s.name,
                    type: s.sp_type,
                    distance: `${s.dist_ly} ly`,
                    mag: s.mag,
                    temp: s.temp,
                    mass: s.mass,
                    radius: s.radius,
                    img: s.img,
                    desc: s.desc
                }
            };
            
            // Crear Etiqueta HTML Flotante para la estrella
            const labelDiv = document.createElement('div');
            labelDiv.className = 'planet-label star-label';
            labelDiv.innerHTML = `<span style="color:#ffd700;">★</span> ${s.name} <span style="font-size:9px;color:#00ffcc;opacity:0.8;">[${s.sp_type || 'Estrella'}]</span>`;
            labelDiv.style.pointerEvents = 'auto';
            labelDiv.style.cursor = 'pointer';
            labelDiv.style.borderColor = 'rgba(255, 215, 0, 0.4)';
            labelDiv.style.background = 'rgba(10, 15, 30, 0.75)';

            labelDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                focusObject(starMesh, size * 6, s.name, s.desc || "Estrella de catálogo astronómico", s.mass || "Desconocida", s.radius || "Desconocido");
                showLabPanel(s.name, {
                    type: `ESTRELLA — ${s.sp_type || 'Catálogo SIMBAD'}`,
                    dist: `${s.dist_ly} ly`,
                    mag: s.mag,
                    temp: s.temp,
                    mass: s.mass,
                    radius: s.radius,
                    spectral: s.sp_type,
                    desc: s.desc,
                    img: s.img,
                    simbad_url: `https://simbad.cds.unistra.fr/simbad/sim-basic?Ident=${encodeURIComponent(s.name)}`
                });
            });

            labelsContainer.appendChild(labelDiv);
            window.namedStars.push({ mesh: starMesh, label: labelDiv });
            window.simbadGroup.add(starMesh);
        }

        fetch('/data/simbad_stars.json')
            .then(res => res.json())
            .then(simbadData => {
                simbadData.forEach(s => renderSimbadStar(s));
                logTitan(`Cargadas ${simbadData.length} estrellas conocidas y de constelaciones con etiquetas 3D.`);
            });

        // Registrar función global para añadir descubrimientos en caliente
        window.addNewStarDiscovery = function(newStar) {
            renderSimbadStar(newStar);
            logTitan(`🌟 [NUEVO DESCUBRIMIENTO] Registrada nueva estrella: ${newStar.name}`);
        };
    })
    .catch(err => logTitan(`Error cargando Hipparcos/SIMBAD: ${err}`));
// createStarfield(); - Eliminado para fondo puramente matemático

// === SISTEMA SOLAR COMPLETO ===
const solarSystem = new THREE.Group();
solarSystem.position.set(75, 75, 75); 
window.ourUniverse.add(solarSystem);

// === GENERADOR DE TEXTURA FOTOSFÉRICA DEL SOL (Fotosfera, Manchas Solares y Fáculas) ===
function createSunPhotosphereTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Gradiente de base de plasma solar (fuego amarillo-naranja)
    const baseGrad = ctx.createLinearGradient(0, 0, 0, 512);
    baseGrad.addColorStop(0, '#ffcc00');
    baseGrad.addColorStop(0.2, '#ff8800');
    baseGrad.addColorStop(0.5, '#ffa500');
    baseGrad.addColorStop(0.8, '#ff6600');
    baseGrad.addColorStop(1, '#ffbb00');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, 1024, 512);
    
    // Granulación del plasma fotosférico
    for (let i = 0; i < 5000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        const r = 1 + Math.random() * 2.5;
        ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 245, 170, 0.45)' : 'rgba(190, 60, 0, 0.35)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // MANCHAS SOLARES (Regiones Activas - Umbra y Penumbra)
    const sunspots = [
        { x: 300, y: 220, r: 18 }, { x: 325, y: 230, r: 10 }, { x: 310, y: 205, r: 7 },
        { x: 720, y: 280, r: 22 }, { x: 745, y: 295, r: 12 }, { x: 700, y: 270, r: 8 },
        { x: 500, y: 190, r: 15 }, { x: 150, y: 310, r: 14 }
    ];
    
    sunspots.forEach(spot => {
        // Fácula brillante (borde magnético)
        const facGrad = ctx.createRadialGradient(spot.x, spot.y, spot.r * 0.8, spot.x, spot.y, spot.r * 2.5);
        facGrad.addColorStop(0, 'rgba(255, 255, 220, 0.85)');
        facGrad.addColorStop(1, 'rgba(255, 255, 220, 0.0)');
        ctx.fillStyle = facGrad;
        ctx.beginPath(); ctx.arc(spot.x, spot.y, spot.r * 2.5, 0, Math.PI * 2); ctx.fill();

        // Penumbra (zona marrón/naranja oscura)
        const penGrad = ctx.createRadialGradient(spot.x, spot.y, spot.r * 0.3, spot.x, spot.y, spot.r);
        penGrad.addColorStop(0, '#441000');
        penGrad.addColorStop(0.8, '#882800');
        penGrad.addColorStop(1, '#ff6600');
        ctx.fillStyle = penGrad;
        ctx.beginPath(); ctx.arc(spot.x, spot.y, spot.r, 0, Math.PI * 2); ctx.fill();

        // Umbra (núcleo helio-frío oscuro ~4000K)
        const umbGrad = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.r * 0.45);
        umbGrad.addColorStop(0, '#100300');
        umbGrad.addColorStop(0.9, '#220800');
        umbGrad.addColorStop(1, '#441000');
        ctx.fillStyle = umbGrad;
        ctx.beginPath(); ctx.arc(spot.x, spot.y, spot.r * 0.45, 0, Math.PI * 2); ctx.fill();
    });
    
    return new THREE.CanvasTexture(canvas);
}

// === EL SOL (FOTOSFERA, PROTUBERANCIAS Y LENGUAS DE FUEGO) ===
const sunTexture = createSunPhotosphereTexture();
const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture, color: 0xffffff });
const sun = new THREE.Mesh(new THREE.SphereGeometry(18, 64, 64), sunMat);
sun.userData = { name: "Sol (Estrella G2V)", mass: "1.989 × 10^30 kg", radius: "696,340 km" };
solarSystem.add(sun);

const sunLight = new THREE.PointLight(0xffffff, 2.5, 10000);
sun.add(sunLight);
// Espacio profundo real: sin luz ambiental global.
// Hemisferio muy tenue como fill mínimo (luz difusa del fondo cósmico de microondas)
const cosmicFill = new THREE.HemisphereLight(0x0d1520, 0x000000, 0.04);
scene.add(cosmicFill);

// PROTUBERANCIAS SOLARES (LENGUAS DE FUEGO EN 3D)
const solarProminencesGroup = new THREE.Group();
sun.add(solarProminencesGroup);

window.prominenceArcs = [];
for (let p = 0; p < 16; p++) {
    const angle = (p / 16) * Math.PI * 2 + Math.random() * 0.2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.7;
    const R = 18; // Radio del Sol
    const height = 4 + Math.random() * 9; // Altura de la protuberancia
    
    // Curva bezier para formar el arco magnético del plasma
    const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(Math.cos(angle)*R, Math.sin(phi)*R, Math.sin(angle)*R),
        new THREE.Vector3(Math.cos(angle)*(R + height*1.4), Math.sin(phi)*(R + height*1.4) + height*0.4, Math.sin(angle)*(R + height*1.4)),
        new THREE.Vector3(Math.cos(angle + 0.22)*R, Math.sin(phi + 0.1)*R, Math.sin(angle + 0.22)*R)
    );
    
    const tubeGeo = new THREE.TubeGeometry(curve, 18, 0.5 + Math.random()*0.6, 8, false);
    const pColor = Math.random() > 0.3 ? 0xff4400 : 0xffaa00;
    const tubeMat = new THREE.MeshBasicMaterial({
        color: pColor,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const arcMesh = new THREE.Mesh(tubeGeo, tubeMat);
    arcMesh.userData = { speed: 1.5 + Math.random()*2.5, phase: Math.random()*Math.PI*2, baseScale: 1.0 };
    solarProminencesGroup.add(arcMesh);
    window.prominenceArcs.push(arcMesh);
}

// CORONA SOLAR INCANDESCENTE (Multi-capa de plasma)
for (let c = 0; c < 3; c++) {
    const cGeo = new THREE.SphereGeometry(18.5 + c * 3.0, 32, 32);
    const cMat = new THREE.MeshBasicMaterial({
        color: c === 0 ? 0xffaa00 : (c === 1 ? 0xff5500 : 0xff2200),
        transparent: true,
        opacity: 0.35 / (c + 1),
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    solarProminencesGroup.add(new THREE.Mesh(cGeo, cMat));
}

// === PLANETAS CON PROPORCIONES ASTRONÓMICAS REALES (UA) Y ACHATAMIENTO POLAR (OBLATOS) ===
const planetsData = [
    { name: "Mercurio", color: 0xaaaaaa, radius: 1.5, distance: 38.7, scaleY: 0.999, periodDays: 88, mass: "3.285 × 10^23 kg", inc: 0.12, phase: 0, texture: "/textures/mercury.jpg" },
    { name: "Venus", color: 0xeebb88, radius: 3, distance: 72.3, scaleY: 0.999, periodDays: 225, mass: "4.867 × 10^24 kg", inc: 0.06, phase: 1.2, texture: "/textures/venus.jpg" },
    { 
        name: "Tierra", color: 0xffffff, radius: 4, distance: 100.0, scaleY: 0.9967, periodDays: 365.25, mass: "5.972 × 10^24 kg", inc: 0.0, phase: 3.14, 
        texture: "/textures/earth.jpg",
        normalMap: "/textures/earth_normal.jpg",
        specularMap: "/textures/earth_specular.jpg"
    },
    { name: "Marte", color: 0xcc4422, radius: 2.5, distance: 152.4, scaleY: 0.9942, periodDays: 687, mass: "6.39 × 10^23 kg", inc: 0.03, phase: 4.0, texture: "/textures/mars.jpg" },
    { name: "Ceres", color: 0x888888, radius: 0.8, distance: 276.7, scaleY: 0.925, periodDays: 1680, mass: "9.393 × 10^20 kg", inc: 0.18, phase: 2.3 },
    { name: "Júpiter", color: 0xddaa77, radius: 10, distance: 520.4, scaleY: 0.9352, periodDays: 4333, mass: "1.898 × 10^27 kg", inc: 0.02, phase: 2.1, texture: "/textures/jupiter.jpg" },
    { name: "Saturno", color: 0xeeddcc, radius: 8, distance: 958.2, scaleY: 0.9020, periodDays: 10759, mass: "5.683 × 10^26 kg", inc: 0.04, phase: 5.5, texture: "/textures/saturn.jpg", hasRings: true },
    { name: "Urano", color: 0x88ccff, radius: 6, distance: 1920.1, scaleY: 0.9771, periodDays: 30687, mass: "8.681 × 10^25 kg", inc: 0.01, phase: 0.5, texture: "/textures/uranus.jpg" },
    { name: "Neptuno", color: 0x4444ff, radius: 5.5, distance: 3004.7, scaleY: 0.9829, periodDays: 60190, mass: "1.024 × 10^26 kg", inc: 0.03, phase: 1.0, texture: "/textures/neptune.jpg" },
    // Planetas Enanos (Extended Solar System)
    { name: "Plutón", color: 0xddbb99, radius: 1.1, distance: 3948.2, scaleY: 0.99, periodDays: 90560, mass: "1.303 × 10^22 kg", inc: 0.3, phase: 5.1 },
    { name: "Haumea", color: 0xcccccc, radius: 0.8, distance: 4321.8, scaleX: 1.5, scaleY: 0.65, scaleZ: 0.85, periodDays: 103774, mass: "4.006 × 10^21 kg", inc: 0.49, phase: 0.8 },
    { name: "Makemake", color: 0xa87766, radius: 0.7, distance: 4571.5, scaleY: 0.97, periodDays: 111350, mass: "3.1 × 10^21 kg", inc: 0.5, phase: 4.2 },
    { name: "Eris", color: 0xeeeeee, radius: 1.1, distance: 6778.1, scaleY: 0.99, periodDays: 203830, mass: "1.66 × 10^22 kg", inc: 0.76, phase: 1.5 }
];

const planets = [];
const labelsContainer = document.getElementById('labels-container');
const orbits = [];

planetsData.forEach(data => {
    const orbitGeo = new THREE.BufferGeometry();
    const orbitPoints = [];
    for(let i=0; i<=64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        orbitPoints.push(Math.cos(angle) * data.distance, 0, Math.sin(angle) * data.distance);
    }
    orbitGeo.setAttribute('position', new THREE.Float32BufferAttribute(orbitPoints, 3));
    const orbitLine = new THREE.Line(orbitGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent:true, opacity:0.15 }));
    orbitLine.rotation.x = data.inc; // Inclinación orbital realista
    solarSystem.add(orbitLine);
    orbits.push(orbitLine);

    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = data.inc; // Inclinación orbital realista
    solarSystem.add(orbitGroup);

    const planetGeo = new THREE.SphereGeometry(data.radius, 64, 64);
    const planetMat = new THREE.MeshStandardMaterial({ 
        color: data.color, 
        roughness: 0.8,
        wireframe: false
    });
    
    // Si tiene textura (y PBR)
    if (data.texture) {
        planetMat.map = textureLoader.load(data.texture, function() {
            planetMat.color.setHex(0xffffff); // reset color
            planetMat.needsUpdate = true;
        });
    }
    if (data.normalMap) {
        planetMat.normalMap = textureLoader.load(data.normalMap);
        planetMat.normalScale = new THREE.Vector2(2, 2);
    }
    if (data.specularMap) {
        planetMat.roughnessMap = textureLoader.load(data.specularMap);
        planetMat.roughness = 0.8;
        planetMat.metalness = 0.2;
    }
    
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    
    // Achatamiento polar (Esferoide oblato) y formas elipsoidales (Haumea)
    const sx = data.scaleX || 1.0;
    const sy = data.scaleY || 1.0;
    const sz = data.scaleZ || 1.0;
    planetMesh.scale.set(sx, sy, sz);
    
    planetMesh.position.x = data.distance;
    planetMesh.userData = { name: data.name, mass: data.mass, radius: data.radius };
    orbitGroup.add(planetMesh);
    
    // Modo Superficie Planetaria: Atmósfera y Halo
    let atmosMesh = null;
    if (data.name !== "Mercurio") { // Mercurio no tiene atmósfera
        const atmosGeo = new THREE.SphereGeometry(data.radius * 1.02, 32, 32);
        const atmosMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.NormalBlending,
            side: THREE.FrontSide,
            depthWrite: false
        });
        if (data.name === "Tierra") {
            atmosMat.map = textureLoader.load("/textures/earth_clouds.png");
        }
        atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
        atmosMesh.scale.set(sx, sy, sz); // Escalar atmósfera según la forma del planeta
        atmosMesh.position.x = data.distance;
        orbitGroup.add(atmosMesh);
    }
    
    // Anillos de Saturno y Urano
    if (data.name === "Saturno" || data.name === "Urano") {
        const innerR = data.name === "Saturno" ? data.radius * 1.2 : data.radius * 1.5;
        const outerR = data.name === "Saturno" ? data.radius * 2.2 : data.radius * 2.0;
        const ringGeo = new THREE.RingGeometry(innerR, outerR, 64);
        const pos = ringGeo.attributes.position;
        const uvs = ringGeo.attributes.uv;
        for (let j = 0; j < pos.count; j++) {
            const vertex = new THREE.Vector3().fromBufferAttribute(pos, j);
            uvs.setXY(j, (vertex.length() - innerR) / (outerR - innerR), 1);
        }
        
        const rColor = data.name === "Saturno" ? 0xddccaa : 0x88ccff;
        const ringMat = new THREE.MeshStandardMaterial({ 
            color: rColor, 
            side: THREE.DoubleSide, 
            transparent: true, 
            opacity: data.name === "Saturno" ? 0.9 : 0.4
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2; // Acostar el anillo
        planetMesh.add(ring);
    }

    const label = document.createElement('div');
    label.className = 'planet-label';
    label.textContent = data.name;
    labelsContainer.appendChild(label);

    // Hacer la etiqueta del planeta clickable para volar hacia él
    const pRadius = data.radius || 4.0;
    const offsetVector = new THREE.Vector3(pRadius * 3, pRadius * 1.5, pRadius * 3.5);
    
    label.style.pointerEvents = 'auto';
    label.style.cursor = 'pointer';
    label.addEventListener('click', (e) => {
        e.stopPropagation();
        window.trackedObject = null; // Detener persecución de bólido
        warpActive = true; warpT = 0;
        warpStartCameraPos.copy(camera.position);
        warpStartLookAt.copy(controls.target);
        
        const currentWorldPos = new THREE.Vector3();
        planetMesh.getWorldPosition(currentWorldPos);
        warpTargetLookAt.copy(currentWorldPos);
        warpTargetCameraPos.copy(currentWorldPos).add(offsetVector);
        
        const infoP = document.getElementById('info-panel');
        if (infoP) {
            infoP.classList.remove('hidden');
            document.getElementById('target-name').textContent = data.name;
            document.getElementById('target-type').textContent = "🪐 PLANETA / CUERPO CELESTE";
            document.getElementById('target-dist').textContent = "Sistema Solar Local";
            document.getElementById('target-mass').textContent = data.name === "Júpiter" ? "317.8 Terras" : (data.name === "Saturno" ? "95.2 Terras" : "Masa Terrestre");
            document.getElementById('target-radius').textContent = `${(pRadius * 6371).toLocaleString()} km`;
        }
        if (window.fetchNasaImageData) window.fetchNasaImageData(data.name);
    });

    planets.push({ 
        group: orbitGroup, 
        mesh: planetMesh, 
        atmos: atmosMesh,
        speed: data.speed, 
        phase: data.phase, 
        label: label, 
        data: data,
        moonOrbit: null 
    });
});

// === 100% DATOS REALES: Cero objetos procedurales de relleno ===

// === MILKY WAY DATA-DRIVEN RECONSTRUCTION ===
// Galaxia volumétrica extaprolada mediante Simetría Rotacional (Datos Reales Hipparcos)
window.milkyWaySphere = null;
fetch('/data/milky_way.bin').then(res => {
    if (!res.ok) throw new Error("Milky Way bin not found");
    return res.arrayBuffer();
}).then(buffer => {
    const floatArray = new Float32Array(buffer);
    const geometry = new THREE.BufferGeometry();
    
    // Los datos vienen entrelazados [x,y,z,r,g,b, x,y,z,r,g,b...]
    const numStars = floatArray.length / 6;
    const positions = new Float32Array(numStars * 3);
    const colors = new Float32Array(numStars * 3);
    
    for(let i=0; i<numStars; i++) {
        positions[i*3] = floatArray[i*6];
        positions[i*3+1] = floatArray[i*6+1];
        positions[i*3+2] = floatArray[i*6+2];
        
        colors[i*3] = floatArray[i*6+3];
        colors[i*3+1] = floatArray[i*6+4];
        colors[i*3+2] = floatArray[i*6+5];
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Corregir el Pivote: 
    // Los datos originales están desplazados a (52000, 0, -100000). 
    // Los centramos a (0,0,0) local para que la rotación se aplique sobre el núcleo.
    geometry.translate(-52000, 0, 100000);
    
    // Crear textura radial suave para las estrellas de la Vía Láctea
    const mwCanvas = document.createElement('canvas');
    mwCanvas.width = 64; mwCanvas.height = 64;
    const mwCtx = mwCanvas.getContext('2d');
    const mwGradient = mwCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    mwGradient.addColorStop(0, 'rgba(255,255,255,1)');
    mwGradient.addColorStop(0.1, 'rgba(255,255,255,0.5)');
    mwGradient.addColorStop(1, 'rgba(255,255,255,0)');
    mwCtx.fillStyle = mwGradient;
    mwCtx.fillRect(0,0,64,64);
    const mwTex = new THREE.CanvasTexture(mwCanvas);

    const mwMat = new THREE.PointsMaterial({
        size: 35, // Reducido drásticamente
        map: mwTex,
        vertexColors: true,
        transparent: true,
        opacity: 0.15, // Muy sutil para que el millón de estrellas se mezcle bien
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    });
    
    window.milkyWaySphere = new THREE.Points(geometry, mwMat);
    
    // Rotar para la inclinación galáctica
    milkyWaySphere.rotation.x = Math.PI / 10;
    milkyWaySphere.rotation.z = Math.PI / 12;
    
    // Y ahora situamos toda la malla EXACTAMENTE en las coordenadas de Sagitario A*
    // Sgr A* en WebGL está en: 52075, 75, -99925
    milkyWaySphere.position.set(52075, 75, -99925);
    
    window.ourUniverse.add(milkyWaySphere);
    console.log(`Reconstrucción Galáctica cargada: ${numStars} estrellas simuladas (Trazado Espiral).`);
}).catch(e => console.log(e));

// === BOLSAS DE GAS (Nebulosas Volumétricas) ===
window.nebulaeGroup = new THREE.Group();
window.ourUniverse.add(window.nebulaeGroup);

fetch('/data/nebulae.json').then(res => res.json()).then(nebulaeData => {

    // === GENERADOR DE TEXTURAS PROCEDURALES DE NEBULOSA ===
    // 3 tipos de textura: núcleo brillante, filamento tenue, capa exterior
    function makeNebTexture(type) {
        const c = document.createElement('canvas');
        c.width = 256; c.height = 256;
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, 256, 256);
        
        if (type === 'core') {
            // Núcleo brillante con irregularidades
            const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
            g.addColorStop(0,   'rgba(255,255,255,1.0)');
            g.addColorStop(0.1, 'rgba(255,255,255,0.9)');
            g.addColorStop(0.3, 'rgba(255,255,255,0.4)');
            g.addColorStop(0.6, 'rgba(255,255,255,0.1)');
            g.addColorStop(1,   'rgba(255,255,255,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, 256, 256);
            // Añadir 3 manchas irregulares para dar estructura
            for (let i = 0; i < 3; i++) {
                const rx = 80 + Math.random() * 96;
                const ry = 80 + Math.random() * 96;
                const rg = ctx.createRadialGradient(rx, ry, 0, rx, ry, 40 + Math.random() * 30);
                rg.addColorStop(0, 'rgba(255,255,255,0.5)');
                rg.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = rg;
                ctx.fillRect(0, 0, 256, 256);
            }
        } else if (type === 'wisp') {
            // Filamento alargado (elipse)
            ctx.save();
            ctx.translate(128, 128);
            ctx.rotate(Math.random() * Math.PI);
            ctx.scale(1, 0.2 + Math.random() * 0.4);
            const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
            g.addColorStop(0,   'rgba(255,255,255,0.5)');
            g.addColorStop(0.5, 'rgba(255,255,255,0.15)');
            g.addColorStop(1,   'rgba(255,255,255,0)');
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(0, 0, 100, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        } else {
            // Capa exterior suave y difusa
            const g = ctx.createRadialGradient(128, 128, 20, 128, 128, 128);
            g.addColorStop(0,   'rgba(255,255,255,0)');
            g.addColorStop(0.4, 'rgba(255,255,255,0.08)');
            g.addColorStop(0.75,'rgba(255,255,255,0.15)');
            g.addColorStop(1,   'rgba(255,255,255,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, 256, 256);
        }
        return new THREE.CanvasTexture(c);
    }

    const texCore  = makeNebTexture('core');
    const texOuter = makeNebTexture('outer');

    nebulaeData.forEach(neb => {
        // Color con cierta saturación — como Hubble pero sin sobreexposición
        const col = new THREE.Color(
            Math.min(1, neb.color[0] * 0.85),
            Math.min(1, neb.color[1] * 0.7),
            Math.min(1, neb.color[2] * 0.85)
        );
        const colCore = new THREE.Color(
            Math.min(1, neb.color[0] * 1.2),
            Math.min(1, neb.color[1] * 1.0),
            Math.min(1, neb.color[2] * 1.2)
        );

        // --- CAPA 1: Halo exterior difuso (más grande, muy transparente) ---
        for (let i = 0; i < 4; i++) {
            const mat = new THREE.SpriteMaterial({ map: texOuter, color: col, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false });
            const spr = new THREE.Sprite(mat);
            const s = neb.radius * (1.2 + Math.random() * 0.8);
            spr.position.set(neb.x + (Math.random()-0.5)*neb.radius*0.4, neb.y + (Math.random()-0.5)*neb.radius*0.2, neb.z + (Math.random()-0.5)*neb.radius*0.4);
            spr.scale.set(s, s * (0.6 + Math.random() * 0.6), 1);
            window.nebulaeGroup.add(spr);
        }

        // --- CAPA 2: Filamentos medios (elipses rotadas) ---
        const texWisp = makeNebTexture('wisp');
        for (let i = 0; i < 6; i++) {
            const wCol = col.clone().multiplyScalar(0.9 + Math.random() * 0.4);
            const mat = new THREE.SpriteMaterial({ map: texWisp, color: wCol, transparent: true, opacity: 0.15 + Math.random() * 0.1, blending: THREE.AdditiveBlending, depthWrite: false });
            const spr = new THREE.Sprite(mat);
            const s = neb.radius * (0.5 + Math.random() * 0.7);
            spr.position.set(neb.x + (Math.random()-0.5)*neb.radius*0.7, neb.y + (Math.random()-0.5)*neb.radius*0.3, neb.z + (Math.random()-0.5)*neb.radius*0.7);
            spr.scale.set(s, s * (0.3 + Math.random() * 0.5), 1);
            window.nebulaeGroup.add(spr);
        }

        // --- CAPA 3: Núcleo brillante central ---
        const coreMat = new THREE.SpriteMaterial({ map: texCore, color: colCore, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false });
        const coreSpr = new THREE.Sprite(coreMat);
        const cs = neb.radius * 0.4;
        coreSpr.position.set(neb.x, neb.y, neb.z);
        coreSpr.scale.set(cs, cs, 1);
        window.nebulaeGroup.add(coreSpr);

        // --- PUNTO CENTRAL BRILLANTE (como la estrella trapecio en M42) ---
        if (neb.name && neb.name.includes('M42')) {
            const starMat = new THREE.SpriteMaterial({ map: texCore, color: new THREE.Color(1, 0.95, 0.8), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
            const starSpr = new THREE.Sprite(starMat);
            const ss = neb.radius * 0.05;
            starSpr.position.set(neb.x, neb.y, neb.z);
            starSpr.scale.set(ss, ss, 1);
            window.nebulaeGroup.add(starSpr);
        }
        
        // --- PILARES DE LA CREACIÓN: Billboard con imagen real (JWST / Hubble) ---
        if (neb.name && neb.name.includes('Pilar')) {
            const R = neb.radius;

            // Fondo: nube azul ionizada (Nebulosa del Águila M16)
            for (let bg = 0; bg < 5; bg++) {
                const bgMat = new THREE.SpriteMaterial({
                    map: makeNebTexture('outer'),
                    color: new THREE.Color(0.1, 0.25, 0.65),
                    transparent: true, opacity: 0.09 + Math.random() * 0.05,
                    blending: THREE.AdditiveBlending, depthWrite: false
                });
                const bgSpr = new THREE.Sprite(bgMat);
                const bs = R * (2 + Math.random());
                bgSpr.position.set(neb.x + (Math.random()-0.5)*R*0.4, neb.y + (Math.random()-0.5)*R*0.3, neb.z + (Math.random()-0.5)*R*0.4);
                bgSpr.scale.set(bs, bs * (0.8 + Math.random() * 0.4), 1);
                window.nebulaeGroup.add(bgSpr);
            }

            // === BILLBOARD PRINCIPAL: imagen procedural en forma de pilares ===
            // Generamos una textura canvas que recrea la silueta de los pilares
            function makePillarTexture() {
                const c = document.createElement('canvas');
                c.width = 512; c.height = 512;
                const ctx = c.getContext('2d');
                ctx.clearRect(0, 0, 512, 512);
                
                // Fondo azul nebulosa
                const bgG = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
                bgG.addColorStop(0,   'rgba(40, 80, 180, 0.6)');
                bgG.addColorStop(0.5, 'rgba(20, 50, 130, 0.3)');
                bgG.addColorStop(1,   'rgba(5,  15,  60, 0.0)');
                ctx.fillStyle = bgG;
                ctx.fillRect(0, 0, 512, 512);

                // Dibujar 3 pilares tipo silueta oscura marrón
                const pillars = [
                    { cx: 180, baseW: 80, topW: 35, h: 320, bot: 512 },
                    { cx: 290, baseW: 65, topW: 25, h: 240, bot: 512 },
                    { cx: 380, baseW: 50, topW: 20, h: 180, bot: 512 },
                ];
                pillars.forEach((p, i) => {
                    // Cuerpo del pilar con gradiente (oscuro base, luminoso en bordes)
                    const pillarGrad = ctx.createLinearGradient(p.cx - p.baseW, 0, p.cx + p.baseW, 0);
                    pillarGrad.addColorStop(0,    'rgba(80,  45, 10, 0.0)');
                    pillarGrad.addColorStop(0.15, 'rgba(100, 60, 15, 0.9)'); // borde luminoso
                    pillarGrad.addColorStop(0.35, 'rgba(30,  15,  5, 0.95)'); // interior oscuro
                    pillarGrad.addColorStop(0.65, 'rgba(25,  12,  4, 0.95)');
                    pillarGrad.addColorStop(0.85, 'rgba(100, 60, 15, 0.9)'); // borde luminoso
                    pillarGrad.addColorStop(1,    'rgba(80,  45, 10, 0.0)');
                    ctx.fillStyle = pillarGrad;
                    
                    // Forma trapezoidal del pilar
                    const topY = p.bot - p.h;
                    ctx.beginPath();
                    ctx.moveTo(p.cx - p.baseW * 0.5, p.bot);
                    ctx.lineTo(p.cx + p.baseW * 0.5, p.bot);
                    ctx.lineTo(p.cx + p.topW * 0.5,  topY + 20);
                    // Punta irregular
                    ctx.lineTo(p.cx + p.topW * 0.3,  topY + 5);
                    ctx.lineTo(p.cx,                  topY);
                    ctx.lineTo(p.cx - p.topW * 0.3,  topY + 8);
                    ctx.lineTo(p.cx - p.topW * 0.5,  topY + 20);
                    ctx.closePath();
                    ctx.fill();

                    // Protuberancias laterales (dedos de gas)
                    const numFingers = 2 + i;
                    for (let f = 0; f < numFingers; f++) {
                        const fy = topY + (f + 1) * (p.h / (numFingers + 1));
                        const side = f % 2 === 0 ? 1 : -1;
                        const fw = p.baseW * (0.25 + Math.random() * 0.2);
                        const fh = fw * (1.5 + Math.random());
                        ctx.beginPath();
                        ctx.ellipse(
                            p.cx + side * (p.baseW * 0.5 + fw * 0.3),
                            fy, fw, fh, side * 0.4, 0, Math.PI * 2
                        );
                        ctx.fillStyle = `rgba(25, 12, 4, 0.8)`;
                        ctx.fill();
                    }

                    // Brillo en la punta (estrella en formación)
                    const tipG = ctx.createRadialGradient(p.cx, topY, 0, p.cx, topY, p.topW * 1.5);
                    tipG.addColorStop(0,   `rgba(200, 220, 255, 0.8)`);
                    tipG.addColorStop(0.4, `rgba(100, 150, 255, 0.3)`);
                    tipG.addColorStop(1,   `rgba(50,  80, 200, 0.0)`);
                    ctx.fillStyle = tipG;
                    ctx.fillRect(0, 0, 512, 512);
                });

                // Estrellas dispersas de fondo
                for (let s = 0; s < 80; s++) {
                    const sx = Math.random() * 512;
                    const sy = Math.random() * 512;
                    const sr = 0.5 + Math.random() * 1.5;
                    const brightness = 150 + Math.floor(Math.random() * 105);
                    const warm = Math.random() > 0.5;
                    ctx.beginPath();
                    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
                    ctx.fillStyle = warm ? `rgba(${brightness}, ${brightness-20}, ${brightness-60}, 0.9)` : `rgba(${brightness-20}, ${brightness-30}, ${brightness}, 0.9)`;
                    ctx.fill();
                }
                return new THREE.CanvasTexture(c);
            }

            const pillarTex  = makePillarTexture();
            const pillarMat  = new THREE.SpriteMaterial({
                map: pillarTex,
                transparent: true,
                opacity: 0.90,
                blending: THREE.NormalBlending,
                depthWrite: false
            });
            const pillarSpr = new THREE.Sprite(pillarMat);
            pillarSpr.position.set(neb.x, neb.y, neb.z);
            pillarSpr.scale.set(R * 1.6, R * 1.6, 1);
            window.nebulaeGroup.add(pillarSpr);
        }
    });
    console.log(`[NEBULOSAS] Cargadas ${nebulaeData.length} Nubes Moleculares (Bolsas de Gas).`);

    // === POBLAR CATÁLOGO DE TELESCOPIO EN EL LABORATORIO ===
    const catalog = document.getElementById('nebula-catalog');
    if (catalog) {
        catalog.innerHTML = '';
        
        // Entrada especial: Sagitario A*
        const sgrBtn = document.createElement('button');
        sgrBtn.innerHTML = `🕳️ <span style="color:#ff0055; font-weight:bold;">Sagitario A* (Centro Galáctico)</span> <span style="color:#555;font-size:9px;float:right">26,000 ly</span>`;
        sgrBtn.style.cssText = 'background:rgba(255,0,85,0.12);border:1px solid rgba(255,0,85,0.4);color:#ccc;padding:5px 8px;text-align:left;width:100%;cursor:pointer;font-family:monospace;font-size:11px;border-radius:3px;margin-bottom:4px;';
        sgrBtn.onclick = () => {
            window.trackedObject = null;
            warpActive = true; warpT = 0;
            warpStartCameraPos.copy(camera.position); warpStartLookAt.copy(controls.target);
            warpTargetLookAt.set(52075, 75, -99925);
            warpTargetCameraPos.set(52075 + 45, 75 + 20, -99925 + 55);
            const infoP = document.getElementById('info-panel');
            if (infoP) {
                infoP.classList.remove('hidden');
                document.getElementById('target-name').textContent = "Sagitario A* (Agujero Negro Supermasivo)";
                document.getElementById('target-type').textContent = "🕳️ CENTRO GALÁCTICO DE LA VÍA LÁCTEA";
                document.getElementById('target-dist').textContent = "26,000 ly";
                document.getElementById('target-mass').textContent = "4.31 Millones Masas Solares";
                document.getElementById('target-radius').textContent = "15 UA (Radio de Schwarzschild)";
                document.getElementById('target-temp').textContent = "~10^12 K (Disco de Acreción y Anillo de Fotones)";
                document.getElementById('target-desc').textContent = "Agujero Negro Supermasivo anclado en el centro del bulbo galáctico de la Vía Láctea. Fotografiado por la colaboración EHT.";
            }
            if (window.fetchNasaImageData) window.fetchNasaImageData("Sagittarius A* Event Horizon Telescope");
            if (window.logTitan) window.logTitan("[TELESCOPIO] Apuntando a Sagitario A* (Centro Galáctico).");
        };
        catalog.appendChild(sgrBtn);

        // Entrada especial: M87* (Agujero Negro Supermasivo Virgo A)
        const m87Btn = document.createElement('button');
        m87Btn.innerHTML = `🕳️ <span style="color:#ff3300; font-weight:bold;">M87* (Galaxia Virgo A)</span> <span style="color:#555;font-size:9px;float:right">53.5M ly</span>`;
        m87Btn.style.cssText = 'background:rgba(255,51,0,0.12);border:1px solid rgba(255,51,0,0.4);color:#ccc;padding:5px 8px;text-align:left;width:100%;cursor:pointer;font-family:monospace;font-size:11px;border-radius:3px;margin-bottom:4px;';
        m87Btn.onclick = () => {
            window.trackedObject = null;
            warpActive = true; warpT = 0;
            warpStartCameraPos.copy(camera.position); warpStartLookAt.copy(controls.target);
            const m87Pos = new THREE.Vector3(75 + 350*200, 75 + 400*200, 75 + 150*200);
            warpTargetLookAt.copy(m87Pos);
            warpTargetCameraPos.copy(m87Pos).add(new THREE.Vector3(120, 50, 140));
            const infoP = document.getElementById('info-panel');
            if (infoP) {
                infoP.classList.remove('hidden');
                document.getElementById('target-name').textContent = "M87* (Agujero Negro Virgo A)";
                document.getElementById('target-type').textContent = "🕳️ SINGULARIDAD GALÁCTICA GIANT";
                document.getElementById('target-dist').textContent = "53.5 Millones ly";
                document.getElementById('target-mass').textContent = "6,500 Millones Masas Solares";
                document.getElementById('target-radius').textContent = "40 UA (Radio de Schwarzschild)";
                document.getElementById('target-temp').textContent = "Primer Agujero Negro Fotografiado por EHT (2019)";
                document.getElementById('target-desc').textContent = "Primer horizonte de sucesos fotografiado en la historia de la humanidad (EHT 2019) con chorro relativista de plasma de 5,000 años luz.";
            }
            if (window.fetchNasaImageData) window.fetchNasaImageData("M87 black hole event horizon telescope");
            if (window.logTitan) window.logTitan("[TELESCOPIO] Apuntando a M87* (Agujero Negro Supermasivo).");
        };
        catalog.appendChild(m87Btn);

        // Entrada especial: Cygnus X-1 (Agujero Negro Binario Estelar)
        const cygBtn = document.createElement('button');
        cygBtn.innerHTML = `🕳️ <span style="color:#ff00aa; font-weight:bold;">Cygnus X-1 (Binaria X)</span> <span style="color:#555;font-size:9px;float:right">6,070 ly</span>`;
        cygBtn.style.cssText = 'background:rgba(255,0,170,0.12);border:1px solid rgba(255,0,170,0.4);color:#ccc;padding:5px 8px;text-align:left;width:100%;cursor:pointer;font-family:monospace;font-size:11px;border-radius:3px;margin-bottom:4px;';
        cygBtn.onclick = () => {
            window.trackedObject = null;
            warpActive = true; warpT = 0;
            warpStartCameraPos.copy(camera.position); warpStartLookAt.copy(controls.target);
            const cygPos = new THREE.Vector3(75 + 150*200, 75 + 30*200, 75 + 400*200);
            warpTargetLookAt.copy(cygPos);
            warpTargetCameraPos.copy(cygPos).add(new THREE.Vector3(45, 20, 55));
            const infoP = document.getElementById('info-panel');
            if (infoP) {
                infoP.classList.remove('hidden');
                document.getElementById('target-name').textContent = "Cygnus X-1 (Agujero Negro Estelar)";
                document.getElementById('target-type').textContent = "🕳️ FUENTE DE RAYOS X BINARIA";
                document.getElementById('target-dist').textContent = "6,070 ly (Constelación del Cisne)";
                document.getElementById('target-mass').textContent = "21.2 Masas Solares";
                document.getElementById('target-radius').textContent = "15 UA (Horizonte Estelar)";
                document.getElementById('target-temp').textContent = "Emisión intensa de Rayos X Duros";
                document.getElementById('target-desc').textContent = "Primer candidato confirmado a agujero negro en la historia (1971), devorando materia de su estrella compañera supergigante azul HDE 226868.";
            }
            if (window.fetchNasaImageData) window.fetchNasaImageData("Cygnus X-1 black hole");
            if (window.logTitan) logTitan("[TELESCOPIO] Apuntando a Cygnus X-1 (Agujero Negro Estelar).");
        };
        catalog.appendChild(cygBtn);

        // Entrada especial: TON 618 (Cuásar Hipermasivo)
        const tonBtn = document.createElement('button');
        tonBtn.innerHTML = `🌌 <span style="color:#00ffff; font-weight:bold;">TON 618 (Cuásar Hipermasivo)</span> <span style="color:#555;font-size:9px;float:right">18.2B ly</span>`;
        tonBtn.style.cssText = 'background:rgba(0,255,255,0.12);border:1px solid rgba(0,255,255,0.4);color:#ccc;padding:5px 8px;text-align:left;width:100%;cursor:pointer;font-family:monospace;font-size:11px;border-radius:3px;margin-bottom:4px;';
        tonBtn.onclick = () => {
            window.trackedObject = null;
            warpActive = true; warpT = 0;
            warpStartCameraPos.copy(camera.position); warpStartLookAt.copy(controls.target);
            const tonPos = new THREE.Vector3(75 + 4000*200, 75 + 800*200, 75 - 6000*200);
            warpTargetLookAt.copy(tonPos);
            warpTargetCameraPos.copy(tonPos).add(new THREE.Vector3(450, 180, 550));
            const infoP = document.getElementById('info-panel');
            if (infoP) {
                infoP.classList.remove('hidden');
                document.getElementById('target-name').textContent = "TON 618 (Cuásar Hipermasivo)";
                document.getElementById('target-type').textContent = "🌌 NÚCLEO GALÁCTICO ACTIVO (CUÁSAR EXTRAGALÁCTICO)";
                document.getElementById('target-dist').textContent = "18.2 Billones ly (Farol del Pasado)";
                document.getElementById('target-mass').textContent = "66,000,000,000 Masas Solares (6.6×10¹⁰ M☉)";
                document.getElementById('target-radius').textContent = "1,300 UA (390,000M km - 40x Sistema Solar)";
                document.getElementById('target-temp').textContent = "Luminosidad: 10⁴⁰ Watts (100 Billones de Soles)";
                document.getElementById('target-desc').textContent = "Catálogo Tonantzintla (1957). El agujero negro más masivo del universo visible. Su sombra de Schwarzschild mide 1.300 UA (40 veces el tamaño de la órbita de Neptuno).";
            }
            if (window.fetchNasaImageData) window.fetchNasaImageData("TON 618 black hole quasar");
            if (window.logTitan) logTitan("[TELESCOPIO] Apuntando a TON 618 (Hipercuásar a 18.2 Billones ly).");
        };
        catalog.appendChild(tonBtn);

        // Entrada especial: Stephenson 2-18 (La Estrella Más Grande Conocida)
        const st2Btn = document.createElement('button');
        st2Btn.innerHTML = `🔴 <span style="color:#ff4411; font-weight:bold;">Stephenson 2-18 (Hipergigante)</span> <span style="color:#555;font-size:9px;float:right">18,900 ly</span>`;
        st2Btn.style.cssText = 'background:rgba(255,68,17,0.12);border:1px solid rgba(255,68,17,0.4);color:#ccc;padding:5px 8px;text-align:left;width:100%;cursor:pointer;font-family:monospace;font-size:11px;border-radius:3px;margin-bottom:4px;';
        st2Btn.onclick = () => {
            window.trackedObject = null; // Desactivar seguimiento de meteorito
            warpActive = true; warpT = 0;
            warpStartCameraPos.copy(camera.position); warpStartLookAt.copy(controls.target);
            const stPos = new THREE.Vector3(75 + 190*200, 75 + 40*200, 75 - 320*200);
            warpTargetLookAt.copy(stPos);
            warpTargetCameraPos.copy(stPos).add(new THREE.Vector3(150, 60, 200));
            const infoP = document.getElementById('info-panel');
            if (infoP) {
                infoP.classList.remove('hidden');
                document.getElementById('target-name').textContent = "Stephenson 2-18 (Hipergigante Roja)";
                document.getElementById('target-type').textContent = "🔴 LA ESTRELLA MÁS GRANDE DEL COSMOS";
                document.getElementById('target-dist').textContent = "18,900 ly (Constelación de Scutum)";
                document.getElementById('target-mass').textContent = "30-50 M☉ (Volumen: 10,000M Soles)";
                document.getElementById('target-radius').textContent = "2,150 Radios Solares (1.5 Billones km)";
                document.getElementById('target-temp').textContent = "3,200 K (Superficie Fría / Ultra-Luminosa)";
                document.getElementById('target-desc').textContent = "Si colocáramos a Stephenson 2-18 en el centro del Sistema Solar, su superficie tragaría a Mercurio, Venus, Tierra, Marte, Júpiter y la órbita completa de Saturno.";
            }
            if (window.fetchNasaImageData) window.fetchNasaImageData("Stephenson 2-18 red hypergiant star");
            if (window.logTitan) logTitan("[TELESCOPIO] Apuntando a Stephenson 2-18 (Hipergigante Roja).");
        };
        catalog.appendChild(st2Btn);

        // Entrada especial: RADAR NEO DE DEFENSA PLANETARIA
        const neoBtn = document.createElement('button');
        neoBtn.innerHTML = `☄️ <span style="color:#ffaa00; font-weight:bold;">Radar NEO & Informe de Impacto</span> <span style="color:#ffaa00;font-size:9px;float:right">DEFENSA</span>`;
        neoBtn.style.cssText = 'background:rgba(255,170,0,0.15);border:1px solid rgba(255,170,0,0.5);color:#fff;padding:5px 8px;text-align:left;width:100%;cursor:pointer;font-family:monospace;font-size:11px;border-radius:3px;margin-bottom:4px;';
        neoBtn.onclick = () => {
            const targetNeo = meteorites.find(m => m.mesh.visible) || meteorites[0];
            if (targetNeo) {
                warpActive = true; warpT = 0;
                warpStartCameraPos.copy(camera.position); warpStartLookAt.copy(controls.target);
                warpTargetLookAt.copy(targetNeo.mesh.position);
                warpTargetCameraPos.copy(targetNeo.mesh.position).add(new THREE.Vector3(15, 10, 20));
                
                const neoName = (targetNeo.mesh.userData && targetNeo.mesh.userData.name) ? targetNeo.mesh.userData.name : "NEO-99942 Apophis";
                const infoP = document.getElementById('info-panel');
                if (infoP) {
                    infoP.classList.remove('hidden');
                    document.getElementById('target-name').textContent = neoName;
                    document.getElementById('target-type').textContent = "☄️ ANOMALÍA NEO (ASTEROIDE POTENCIALMENTE PELIGROSO)";
                    document.getElementById('target-dist').textContent = "0.85 UA (Encuentro Cercano)";
                    document.getElementById('target-mass').textContent = "6.1 × 10^10 kg";
                    document.getElementById('target-radius').textContent = "370 metros de diámetro";
                    document.getElementById('target-temp').textContent = "Riesgo de Impacto: Nivel 4 (Torino Scale)";
                    document.getElementById('target-desc').textContent = "Detectado por radar de defensa planetaria. Bólido en órbita elíptica con trayectoria de aproximación cercana a la Tierra.";
                }
                if (window.fetchNasaImageData) window.fetchNasaImageData("Apophis asteroid NEO");
                
                // Generar Informe de Impacto en la Consola TITAN con botón de lanzamiento DART
                const out = document.getElementById('console-output');
                if (out) {
                    const lat = (Math.random() * 180 - 90).toFixed(4);
                    const lon = (Math.random() * 360 - 180).toFixed(4);
                    const megatons = Math.floor(Math.random() * 80000 + 20000);
                    const impactDate = new Date(Date.now() + 86400000 * 45).toISOString().replace('T', ' ').substring(0, 19);
                    
                    out.innerHTML += `<div id="neo-report-card" style="border: 1px solid #ffaa00; background: rgba(255,170,0,0.12); padding: 8px; border-radius: 4px; margin: 8px 0; font-family: monospace; font-size: 11px; color: #fff;">
                        <div style="color:#ffaa00; font-weight:bold; font-size:12px;">🚨 INFORME DE IMPACTO NEO & ANÁLISIS DE COLISIÓN</div>
                        <div><b>BÓLIDO:</b> ${neoName}</div>
                        <div><b>CUERPO EN RIESGO:</b> La Tierra (Sistema Solar)</div>
                        <div><b>ZONA ESTIMADA DE CAÍDA:</b> LAT ${lat}°, LON ${lon}°</div>
                        <div><b>VENTANA TEMPORAL (UTC):</b> ${impactDate}</div>
                        <div><b>DISIPACIÓN TÉRMICA:</b> ${megatons.toLocaleString()} Megatones TNT</div>
                        <button onclick="window.launchDARTMission()" style="background:#ff3300; border:1px solid #ff6600; color:white; font-weight:bold; padding:4px 8px; margin-top:6px; cursor:pointer; border-radius:3px;">🚀 LANZAR SONDA DE IMPACTO CINÉTICO DART</button>
                    </div>`;
                    out.scrollTop = out.scrollHeight;
                }
                if (window.logTitan) window.logTitan(`[RADAR NEO] Anomalía en observación: ${neoName}. Generado informe de impacto.`);
            }
        };
        catalog.appendChild(neoBtn);

        const getIcon = (neb) => {
            if (neb.color[0] > 0.7 && neb.color[1] < 0.3) return '🔴';
            if (neb.color[2] > 0.7) return '🔵';
            if (neb.color[1] > 0.6) return '🟢';
            return '🟣';
        };
        nebulaeData.forEach((neb, idx) => {
            const btn = document.createElement('button');
            const icon = getIcon(neb);
            const dist = Math.round(Math.sqrt(neb.x*neb.x + neb.y*neb.y + neb.z*neb.z) / 100) * 100;
            btn.innerHTML = `${icon} <span style="color:#fff">${neb.name || 'NGC-'+(idx+1000)}</span> <span style="color:#555;font-size:9px;float:right">${dist.toLocaleString()} ly</span>`;
            btn.style.cssText = 'background:rgba(247,37,133,0.08);border:1px solid rgba(247,37,133,0.3);color:#ccc;padding:5px 8px;text-align:left;width:100%;cursor:pointer;font-family:monospace;font-size:11px;border-radius:3px;transition:background 0.2s;margin-bottom:3px;';
            btn.onmouseover = () => btn.style.background = 'rgba(247,37,133,0.25)';
            btn.onmouseout  = () => btn.style.background = 'rgba(247,37,133,0.08)';
            btn.addEventListener('click', () => {
                warpActive = true;
                warpT = 0;
                warpStartCameraPos.copy(camera.position);
                warpStartLookAt.copy(controls.target);
                warpTargetLookAt.set(neb.x, neb.y, neb.z);
                warpTargetCameraPos.set(neb.x + neb.radius * 0.8, neb.y + neb.radius * 0.3, neb.z + neb.radius * 0.8);
                const infoP = document.getElementById('info-panel');
                if (infoP) {
                    infoP.classList.remove('hidden');
                    const nName = neb.name || `NGC-${idx+1000}`;
                    document.getElementById('target-name').textContent = nName;
                    document.getElementById('target-type').textContent = '🔭 NEBULOSA CATALOGADA (NGC)';
                    document.getElementById('target-type').style.display = 'block';
                    document.getElementById('target-dist').textContent = `${dist.toLocaleString()} ly`;
                    document.getElementById('target-mass').textContent = 'Gas y Polvo Estelar';
                    document.getElementById('target-radius').textContent = `${Math.round(neb.radius)} ly de radio`;
                    document.getElementById('target-temp').textContent = neb.color[0] > 0.7 ? '~10,000 K (Región HII)' : '~100 K (Nube Molecular)';
                    document.getElementById('target-mag').textContent = '-';
                    if (window.fetchNasaImageData) window.fetchNasaImageData(nName);
                }
                if (window.logTitan) logTitan(`[TELESCOPIO] Apuntando a ${neb.name || 'NGC-'+(idx+1000)}. Dist: ${dist.toLocaleString()} ly.`);
            });
            catalog.appendChild(btn);
        });
    }
}).catch(err => console.log("Error cargando nebulosas:", err));

// === INTEGRACIÓN DE CONSULTA EN VIVO A NASA IMAGES & SCIENCE API ===
window.fetchNasaImageData = function(queryName) {
    const imgEl = document.getElementById('target-image');
    const descEl = document.getElementById('target-desc');
    if (!imgEl || !descEl) return;
    
    let nasaQuery = queryName;
    if (queryName.includes('Sagitario A') || queryName.includes('Sgr A')) nasaQuery = 'Sagittarius A* Event Horizon Telescope';
    else if (queryName.includes('Orión') || queryName.includes('M42')) nasaQuery = 'Orion Nebula M42 Hubble';
    else if (queryName.includes('Pilares')) nasaQuery = 'Pillars of Creation Webb Hubble';
    else if (queryName.includes('Carina')) nasaQuery = 'Carina Nebula NGC 3372';
    else if (queryName.includes('Red Cósmica') || queryName.includes('Filamento')) nasaQuery = 'Cosmic Web Hubble';
    else if (queryName.includes('Sol')) nasaQuery = 'Sun Solar Dynamics Observatory SDO';
    else if (queryName.includes('Tierra')) nasaQuery = 'Earth Blue Marble';
    else if (queryName.includes('Marte')) nasaQuery = 'Mars Perseverance Rover';
    else if (queryName.includes('Júpiter')) nasaQuery = 'Jupiter Juno Spacecraft';
    else if (queryName.includes('Saturno')) nasaQuery = 'Saturn Cassini Spacecraft';
    else if (queryName.includes('Urano')) nasaQuery = 'Uranus Voyager';
    else if (queryName.includes('Neptuno')) nasaQuery = 'Neptune Voyager';
    else if (queryName.includes('Plutón')) nasaQuery = 'Pluto New Horizons';
    else if (queryName.includes('Luna')) nasaQuery = 'Moon LRO Lunar Reconnaissance';
    else if (queryName.includes('Agujero Negro') || queryName.includes('Schwarzschild')) nasaQuery = 'Black Hole Event Horizon Telescope';
    
    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(nasaQuery)}&media_type=image`;
    
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            if (data && data.collection && data.collection.items && data.collection.items.length > 0) {
                const item = data.collection.items[0];
                const itemData = item.data ? item.data[0] : null;
                const links = item.links ? item.links[0] : null;
                
                if (links && links.href) {
                    imgEl.src = links.href;
                    imgEl.style.display = 'block';
                }
                if (itemData && itemData.description) {
                    const descText = itemData.description.length > 320 
                        ? itemData.description.substring(0, 320) + '...' 
                        : itemData.description;
                    descEl.innerHTML = `<div style="background: rgba(0,255,200,0.12); border-left: 3px solid #00ffcc; padding: 6px; margin-bottom: 8px; font-size:10px; color:#00ffcc; font-family:monospace;">🚀 NASA OFFICIAL SCIENCE DATA (${itemData.center || 'NASA'})</div>${descText}`;
                }
            }
        })
        .catch(err => console.log("Error consultando NASA API:", err));
};


// === MACRO-UNIVERSO (Red Cósmica y Simetría Cuántica) ===
window.cosmicWeb = null;
fetch('/data/cosmic_web.bin').then(res => {
    if (!res.ok) throw new Error("Cosmic web bin not found");
    return res.arrayBuffer();
}).then(buffer => {
    const floatArray = new Float32Array(buffer);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(floatArray, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0x88bbff, 
        size: 800, // Tamaño reducido para que parezcan nodos luminosos a lo lejos, no polígonos masivos
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    window.cosmicWeb = new THREE.Points(geometry, material);
    window.ourUniverse.add(window.cosmicWeb);
    window.cosmicWebLines = window.cosmicWeb; // Referencia para el UI
    window.cosmicWebLines.visible = false; // Oculto por defecto
    
    // === MEMBRANA CMB (Fondo Cósmico de Microondas) ===
    const cmbGeo = new THREE.SphereGeometry(350000, 64, 64);
    const cmbMat = new THREE.MeshBasicMaterial({
        color: 0x221155,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        wireframe: true // Da un aspecto de estructura topológica
    });
    const cmbMembrane = new THREE.Mesh(cmbGeo, cmbMat);
    window.ourUniverse.add(cmbMembrane);
    
    // === UNIVERSOS VECINOS (El Multiverso) ===
    const colors = [0xff0055, 0x00ffcc, 0xffcc00, 0x00ccff, 0xffaa00];
    for (let i = 0; i < 5; i++) {
        const uGroup = new THREE.Group();
        const dist = (i === 0) ? 650000 : 1000000 + Math.random() * 2000000; // El i=0 está chocando (Cicatriz CMB)
        const angle = Math.random() * Math.PI * 2;
        const yAngle = (Math.random() - 0.5) * Math.PI;
        
        uGroup.position.set(
            Math.cos(angle) * Math.cos(yAngle) * dist,
            Math.sin(yAngle) * dist,
            Math.sin(angle) * Math.cos(yAngle) * dist
        );
        
        const r = 300000 + Math.random() * 100000;
        const uMat = new THREE.MeshBasicMaterial({
            color: colors[i], transparent: true, opacity: 0.05, side: THREE.DoubleSide, wireframe: true
        });
        const uMembrane = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), uMat);
        uGroup.add(uMembrane);
        
        // Simular núcleo galáctico / red cósmica interna del otro universo (ahora es un brillo suave, no una esfera sólida)
        const coreLight = new THREE.PointLight(colors[i], 100000, r); // Luz interna
        
        // Crear textura suave independiente para el núcleo del otro universo
        const coreCanvas = document.createElement('canvas');
        coreCanvas.width = 64; coreCanvas.height = 64;
        const coreCtx = coreCanvas.getContext('2d');
        const coreGrad = coreCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        coreGrad.addColorStop(0, 'rgba(255,255,255,1)');
        coreGrad.addColorStop(0.2, 'rgba(255,255,255,0.5)');
        coreGrad.addColorStop(1, 'rgba(255,255,255,0)');
        coreCtx.fillStyle = coreGrad;
        coreCtx.fillRect(0,0,64,64);
        const coreTex = new THREE.CanvasTexture(coreCanvas);

        const coreMat = new THREE.SpriteMaterial({ 
            map: coreTex,
            color: colors[i],
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const coreSprite = new THREE.Sprite(coreMat);
        coreSprite.scale.set(r/2, r/2, 1);
        
        uGroup.add(coreLight);
        uGroup.add(coreSprite);
        
        window.otherUniverses.add(uGroup);
        
        if (i === 0) {
            // CICATRIZ CÓSMICA (CMB Cold Spot)
            const scarGeo = new THREE.CircleGeometry(50000, 32);
            const scarMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
            const scar = new THREE.Mesh(scarGeo, scarMat);
            // Posicionar la cicatriz a medio camino entre los centros
            scar.position.copy(uGroup.position).multiplyScalar(0.5);
            scar.lookAt(0,0,0);
            window.otherUniverses.add(scar);
            logTitan(`[MULTIVERSO] Colisión detectada con Universo Paralelo [Alfa]. Generando cicatriz térmica (CMB Cold Spot).`);
        }
    }
    
    console.log(`TITAN: Red Cósmica Inyectada por Reflexión. ${floatArray.length/3} macro-estructuras cargadas.`);
}).catch(err => console.warn(err));

// === POST-PROCESADO: TIERRA, LUNA Y SATÉLITES ===
const earthObj = planets.find(p => p.mesh.userData.name === "Tierra");
if (earthObj) {
    const earthMesh = earthObj.mesh;
    
    // La Luna de la Tierra ahora se carga dinámicamente desde moons.json
    
    // Magnetosfera (Escudo contra viento solar)
    const magnetGeo = new THREE.SphereGeometry(5.5, 32, 32); 
    const magnetMat = new THREE.MeshBasicMaterial({ color: 0x0088ff, transparent: true, opacity: 0.2 });
    const magnetosphere = new THREE.Mesh(magnetGeo, magnetMat);
    earthMesh.add(magnetosphere);
    earthObj.magnetosphere = magnetosphere;
    
    // RED DE TELESCOPIOS (Hubble y James Webb)
    // Hubble (LEO)
    const hubbleOrbit = new THREE.Group();
    earthMesh.add(hubbleOrbit);
    const hubble = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.5), new THREE.MeshStandardMaterial({color: 0xcccccc, metalness: 0.8, roughness: 0.2}));
    hubble.position.set(1.5, 0, 0); // Muy cerca de la Tierra
    hubble.userData = { name: "Telescopio Espacial Hubble", isTelescope: true, realDistBase: 540 }; // 540 km de altitud real
    hubbleOrbit.add(hubble);
    
    // James Webb (L2)
    const jwstOrbit = new THREE.Group();
    earthObj.group.add(jwstOrbit); // Orbita con la Tierra alrededor del Sol, fijo en L2
    jwstOrbit.position.x = earthMesh.position.x;
    const jwst = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.1), new THREE.MeshStandardMaterial({color: 0xffaa00, metalness: 1.0, roughness: 0.1})); // Escudo dorado
    jwst.position.set(-15, 0, 0); // L2 point: detrás de la Tierra respecto al Sol
    jwst.userData = { name: "Telescopio Espacial James Webb (JWST)", isTelescope: true, realDistBase: 1500000 }; // 1.5 millones km
    jwstOrbit.add(jwst);
    
    earthObj.hubbleOrbit = hubbleOrbit;
    earthObj.jwstOrbit = jwstOrbit;
    planets.push({ mesh: hubble, data: hubble.userData });
    planets.push({ mesh: jwst, data: jwst.userData });
    
    // Crear etiquetas UI de Telemetría para los telescopios
    window.telescopeLabels = [hubble, jwst].map(mesh => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.color = '#00ffff';
        div.style.fontSize = '10px';
        div.style.fontFamily = 'monospace';
        div.style.pointerEvents = 'none';
        div.style.textShadow = '0 0 3px #00ffff';
        document.body.appendChild(div);
        return { mesh, div };
    });

    // Satélites LEO (Low Earth Orbit) y GEO
    const satGeo = new THREE.BufferGeometry();
    const satPos = [];
    for(let i=0; i<1500; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        // Distribución a dos altitudes (LEO y GEO)
        const isGEO = Math.random() > 0.8;
        const r = isGEO ? (6 + Math.random()) : (4.2 + Math.random() * 0.5); 
        satPos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    }
    satGeo.setAttribute('position', new THREE.Float32BufferAttribute(satPos, 3));
    const satMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const satellites = new THREE.Points(satGeo, satMat);
    earthMesh.add(satellites);
    earthObj.satPoints = satellites;
}

const marsObj = planets.find(p => p.mesh.userData.name === "Marte");
if (marsObj) {
    // Fobos y Deimos se cargarán dinámicamente desde moons.json
}

// === GENERADOR INTEGRADO Y DINÁMICO DE LUNAS Y SATÉLITES NATURALES REALES ===
const defaultMajorMoons = [
    // Tierra
    { name: "Luna", planet: "Tierra", radius: 1.2, dist: 7.5, color: 0xcccccc, speed: 28 },
    // Marte
    { name: "Fobos", planet: "Marte", radius: 0.35, dist: 4.5, color: 0xaaaaaa, speed: 8 },
    { name: "Deimos", planet: "Marte", radius: 0.3, dist: 6.5, color: 0x888888, speed: 14 },
    // Júpiter (Lunas Galileanas)
    { name: "Ío", planet: "Júpiter", radius: 0.9, dist: 16.0, color: 0xffcc33, speed: 10 },
    { name: "Europa", planet: "Júpiter", radius: 0.8, dist: 20.0, color: 0xcccccc, speed: 15 },
    { name: "Ganímedes", planet: "Júpiter", radius: 1.4, dist: 26.0, color: 0x999999, speed: 22 },
    { name: "Calisto", planet: "Júpiter", radius: 1.2, dist: 32.0, color: 0x777777, speed: 30 },
    // Saturno
    { name: "Titán", planet: "Saturno", radius: 1.3, dist: 22.0, color: 0xeeaa44, speed: 18 },
    { name: "Encélado", planet: "Saturno", radius: 0.5, dist: 15.0, color: 0xffffff, speed: 12 },
    { name: "Mimas", planet: "Saturno", radius: 0.4, dist: 12.0, color: 0xbbbbbb, speed: 9 },
    { name: "Rea", planet: "Saturno", radius: 0.7, dist: 18.0, color: 0xaaaaaa, speed: 16 },
    // Urano
    { name: "Miranda", planet: "Urano", radius: 0.4, dist: 10.0, color: 0xcccccc, speed: 11 },
    { name: "Titania", planet: "Urano", radius: 0.8, dist: 15.0, color: 0xaaaaaa, speed: 19 },
    // Neptuno
    { name: "Tritón", planet: "Neptuno", radius: 1.0, dist: 12.0, color: 0x88ccff, speed: -14 },
    // Plutón
    { name: "Caronte", planet: "Plutón", radius: 0.6, dist: 4.5, color: 0xaaaaaa, speed: 12 }
];

function createMoonMesh(m) {
    const parentPlanet = planets.find(p => p.data && p.data.name === m.planet);
    if (!parentPlanet) return;

    if (!parentPlanet.moonOrbits) parentPlanet.moonOrbits = [];
    
    // Grupo de órbita ANCLADO en la posición exacta del planeta dentro de su grupo orbital
    const moonOrbitGroup = new THREE.Group();
    moonOrbitGroup.position.x = parentPlanet.mesh.position.x; // Coincide exactamente con el centro del planeta
    parentPlanet.group.add(moonOrbitGroup);

    // Ajustar distancias visuales para estar claramente fuera de la atmósfera y satélites
    let visualDist = m.dist || 12.0;
    if (m.name === "Luna") visualDist = 14.0; // Claramente fuera del cinturón GEO (r=6)
    
    let visualRadius = m.radius || (m.radiusKm ? m.radiusKm / 1000 : 0.5);
    if (visualRadius < 0.35) visualRadius = 0.35;
    if (m.name === "Luna") visualRadius = 1.2;

    const moonMat = new THREE.MeshStandardMaterial({ 
        color: m.color || 0xdddddd, 
        roughness: 0.85, 
        emissive: 0x333333 
    });

    if (m.name === "Luna") {
        moonMat.map = textureLoader.load("/textures/moon.jpg", function() {
            moonMat.color.setHex(0xffffff);
            moonMat.needsUpdate = true;
        });
    }

    const moonMesh = new THREE.Mesh(
        new THREE.SphereGeometry(visualRadius, 32, 32),
        moonMat
    );

    moonMesh.position.x = visualDist;
    moonMesh.userData = { name: `${m.name} (${m.planet})`, mass: "Satélite Natural", radius: `${visualRadius.toFixed(1)} u`, isMoon: true };
    moonOrbitGroup.add(moonMesh);

    // Anillo visual 3D de la órbita de la luna alrededor de su planeta
    const moonOrbitGeo = new THREE.BufferGeometry();
    const pts = [];
    for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        pts.push(Math.cos(a) * visualDist, 0, Math.sin(a) * visualDist);
    }
    moonOrbitGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const moonOrbitLine = new THREE.Line(moonOrbitGeo, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 }));
    moonOrbitGroup.add(moonOrbitLine);

    // Etiqueta 2D flotante
    const labelsCont = document.getElementById('labels-container');
    let moonLabel = null;
    if (labelsCont && (m.name === "Luna" || m.name === "Fobos" || m.name === "Ío" || m.name === "Titán")) {
        moonLabel = document.createElement('div');
        moonLabel.style.position = 'absolute';
        moonLabel.style.color = '#cccccc';
        moonLabel.style.fontSize = '10px';
        moonLabel.style.fontFamily = 'monospace';
        moonLabel.style.pointerEvents = 'none';
        moonLabel.style.textShadow = '0 0 3px black';
        moonLabel.textContent = m.name;
        labelsCont.appendChild(moonLabel);
    }

    planets.push({ mesh: moonMesh, label: moonLabel, data: moonMesh.userData });
    parentPlanet.moonOrbits.push({ group: moonOrbitGroup, speed: m.speed || 15 });
}

// Cargar lunas principales inmediatamente de forma síncrona
defaultMajorMoons.forEach(m => createMoonMesh(m));

// Cargar lunas adicionales desde moons.json si está disponible
fetch('/data/moons.json').then(r => r.json()).then(moons => {
    moons.forEach(m => {
        if (!defaultMajorMoons.some(dm => dm.name.toLowerCase() === m.name.toLowerCase())) {
            createMoonMesh({
                name: m.name,
                planet: m.planet,
                radiusKm: m.radius,
                distKm: m.dist,
                color: m.color
            });
        }
    });
    logTitan(`[SISTEMA SOLAR] Generado enjambre orbital: Lunas reales sincronizadas.`);
}).catch(e => logTitan("Lunas principales activas en modo síncrono."));

// === CINTURÓN DE ASTEROIDES (Rocas 3D Instanciadas) ===
const asteroidCount = 8000;
const astGeo = new THREE.DodecahedronGeometry(0.3, 0); // Roca de pocos polígonos
const astMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 });
const asteroidBelt = new THREE.InstancedMesh(astGeo, astMat, asteroidCount);
const astDummy = new THREE.Object3D();

for (let i = 0; i < asteroidCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Distancia astronómica real entre Marte (152.4) y Júpiter (520.4), rodeando Ceres (276.7)
    const distance = 220 + Math.random() * 140; 
    const y = (Math.random() - 0.5) * 12;
    
    astDummy.position.set(Math.cos(angle) * distance, y, Math.sin(angle) * distance);
    astDummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    
    // Escala variada para las rocas
    const scale = 0.2 + Math.random() * 1.5;
    astDummy.scale.set(scale, scale, scale);
    
    astDummy.updateMatrix();
    asteroidBelt.setMatrixAt(i, astDummy.matrix);
}
asteroidBelt.position.set(75, 75, 75); // Centrar en el Sol localmente
window.ourUniverse.add(asteroidBelt);



    // Necesitamos que earthMesh esté disponible para la cámara

// La vía láctea procedural fue eliminada a favor del realismo fotográfico del skybox

// === AGUJEROS NEGROS Y SISTEMAS EXOPLANETARIOS ===
const extraSystems = new THREE.Group();
window.ourUniverse.add(extraSystems);

const exoplanetData = [
    { name: "Próxima Centauri", x: 4.2, z: 2.1, y: 0, color: 0xff3333, desc: "Enana Roja (Sistema estelar más cercano con exoplanetas)" },
    { name: "TRAPPIST-1", x: 40, z: -15, y: 5, color: 0xff4444, desc: "Sistema con 7 planetas rocosos (Zona Habitable)" },
    { name: "Kepler-186", x: -100, z: 250, y: -20, color: 0xffaa88, desc: "Enana M con el primer planeta terrestre confirmado" },
    { name: "Castor (Gemini A)", x: 35, z: 15, y: 40, color: 0x88bbff, desc: "Sistema Estelar Múltiple en la constelación de Géminis" },
    { name: "Stephenson 2-18", x: 190, z: -320, y: 40, isHypergiant: true, color: 0xff4411, desc: "La estrella más grande conocida en el Universo (Hipergigante Roja con 2,150 Radios Solares). Distancia: 18,900 ly." },
    // Agujeros Negros y Cuásares Hipermasivos Reales
    { name: "Sagittarius A*", x: 260, z: -500, y: 0, isBlackHole: true, desc: "Agujero Negro Supermasivo en el centro de la Vía Láctea. Masa: 4.31 millones Soles." },
    { name: "M87*", x: 350, z: 150, y: 400, isBlackHole: true, desc: "Agujero Negro Supermasivo de la Galaxia Virgo A. Masa: 6500 millones Soles." },
    { name: "Cygnus X-1", x: 150, z: 400, y: 30, isBlackHole: true, desc: "Sistema Binario con Agujero Negro Estelar masivo. Fuerte emisor de Rayos X." },
    { name: "TON 618", x: 4000, z: -6000, y: 800, isBlackHole: true, isHyperQuasar: true, desc: "TON 618 es el Agujero Negro y Cuásar más grande conocido en el Universo (66,000 Millones Masas Solares). Distancia: 18.2 Billones años luz. Su radio de Schwarzschild mide 1,300 UA." }
];

// === HELPER KIP THORNE BLACK HOLE GENERATOR (NASA / EHT M87* / SGR A* / TON 618 MODEL) ===
function createKipThorneBlackHole({ rShadow = 30, jetLength = 350, isAccretionActive = true, labelColor = '#ffaa00' }) {
    const bhGroup = new THREE.Group();

    // 1. Sombra Absoluta del Horizonte de Sucesos (Schwarzschild Black Shadow)
    const shadowMesh = new THREE.Mesh(
        new THREE.SphereGeometry(rShadow, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x000000, depthWrite: true, depthTest: true })
    );
    shadowMesh.renderOrder = 1000;
    bhGroup.add(shadowMesh);

    // 1b. Anillo de Fotones / Lente Gravitacional de Einstein (EHT Photorealistic Halo)
    const haloGeo = new THREE.RingGeometry(rShadow * 1.02, rShadow * 1.45, 64);
    const haloMat = new THREE.MeshBasicMaterial({
        color: labelColor === '#00ffff' ? 0x00f0ff : 0xffaa00,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const photonRing = new THREE.Mesh(haloGeo, haloMat);
    photonRing.rotation.x = Math.PI / 2;
    bhGroup.add(photonRing);

    // 2. Disco de Acreción Volumétrico Continuo de Gas y Plasma en Eje Equatorial (40.000 Partículas)
    const partGeo = new THREE.BufferGeometry();
    const partCount = 40000;
    const positions = new Float32Array(partCount * 3);
    const colors = new Float32Array(partCount * 3);

    const rMin = rShadow * 1.05;
    const rMax = rShadow * 5.2;

    for (let i = 0; i < partCount; i++) {
        // Distribución radial continua e isotrópica (concentrada hacia el centro)
        const norm = Math.pow(Math.random(), 1.7);
        const r = rMin + norm * (rMax - rMin);
        const theta = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * (rShadow * 0.05 + norm * rShadow * 0.12);

        positions[i*3]     = r * Math.cos(theta);
        positions[i*3 + 1] = height;
        positions[i*3 + 2] = r * Math.sin(theta);

        // Perfil Térmico Relativista (Núcleo incandescente -> Fuego -> Carmesí exterior)
        let cr, cg, cb;
        if (norm < 0.12) {
            cr = 1.0; cg = 0.95; cb = 0.85;
        } else if (norm < 0.55) {
            const t = (norm - 0.12) / 0.43;
            cr = 1.0; cg = 0.7 - t * 0.45; cb = 0.08;
        } else {
            const t = (norm - 0.55) / 0.45;
            cr = 0.75 - t * 0.5; cg = 0.12 - t * 0.08; cb = 0.02;
        }

        colors[i*3]     = cr;
        colors[i*3 + 1] = cg;
        colors[i*3 + 2] = cb;
    }

    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    partGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const eqDisk = new THREE.Points(partGeo, new THREE.PointsMaterial({
        size: Math.max(2.5, rShadow * 0.08), // Tamaño ajustado para visibilidad perfecta a cualquier distancia
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false
    }));
    bhGroup.add(eqDisk);

    // 3. Jets Polares de Plasma (Eyección de materia si activo)
    let jetPoints = null;
    if (isAccretionActive) {
        const jetGeo = new THREE.BufferGeometry();
        const jetCount = 7000;
        const jPos = new Float32Array(jetCount * 3);
        const jCol = new Float32Array(jetCount * 3);

        for (let i = 0; i < jetCount; i++) {
            const side = Math.random() > 0.5 ? 1 : -1;
            const len = Math.random() * jetLength;
            const spread = (len / jetLength) * (rShadow * 0.25) + 0.5;
            const a = Math.random() * Math.PI * 2;

            jPos[i*3]     = Math.cos(a) * spread * Math.random();
            jPos[i*3 + 1] = side * (rShadow * 1.05 + len);
            jPos[i*3 + 2] = Math.sin(a) * spread * Math.random();

            const nLen = len / jetLength;
            jCol[i*3]     = 0.1 + (1.0 - nLen) * 0.3;
            jCol[i*3 + 1] = 0.6 + (1.0 - nLen) * 0.35;
            jCol[i*3 + 2] = 0.95;
        }

        jetGeo.setAttribute('position', new THREE.BufferAttribute(jPos, 3));
        jetGeo.setAttribute('color', new THREE.BufferAttribute(jCol, 3));

        jetPoints = new THREE.Points(jetGeo, new THREE.PointsMaterial({
            size: rShadow * 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthTest: true,
            depthWrite: false
        }));
        bhGroup.add(jetPoints);
    }

    return { bhGroup, eqDisk, upperArch: null, lowerArch: null, jetPoints };
}

exoplanetData.forEach(sys => {
    const group = new THREE.Group();
    group.position.set(75 + sys.x * 200, 75 + sys.y * 200, 75 + sys.z * 200);
    
    if (sys.isHyperQuasar || sys.isBlackHole) {
        const isQuasar = sys.isHyperQuasar;
        const rShadow = isQuasar ? 180 : (sys.name === 'M87*' ? 40 : 15);
        const bhData = createKipThorneBlackHole({ rShadow: rShadow, jetLength: 0, isAccretionActive: false });
        
        bhData.bhGroup.userData = { 
            name: sys.name, 
            mass: sys.desc || "Singularidad Masiva", 
            radius: `${rShadow} UA (Radio de Schwarzschild)`, 
            isBlackHole: true 
        };
        group.add(bhData.bhGroup);
        group.userData.isAccretion = true;
        group.userData.disk = bhData.eqDisk;
        group.userData.isBlackHole = true;
        
        const bhLabelDiv = document.createElement('div');
        bhLabelDiv.className = 'planet-label';
        bhLabelDiv.style.color = isQuasar ? '#00ffff' : '#ff0055';
        bhLabelDiv.style.fontWeight = 'bold';
        bhLabelDiv.style.textShadow = `0 0 10px ${isQuasar ? '#00ffff' : '#ff0055'}, 1px 1px 3px black`;
        bhLabelDiv.textContent = `[ ${sys.name.toUpperCase()} ]`;
        
        // Habilitar clics en etiquetas de Agujeros Negros
        bhLabelDiv.style.pointerEvents = 'auto';
        bhLabelDiv.style.cursor = 'pointer';
        bhLabelDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            window.trackedObject = null; // Detener persecución de bólidos
            warpActive = true; warpT = 0;
            warpStartCameraPos.copy(camera.position); warpStartLookAt.copy(controls.target);
            const targetPos = new THREE.Vector3(75 + sys.x * 200, 75 + sys.y * 200, 75 + sys.z * 200);
            warpTargetLookAt.copy(targetPos);
            const camOffset = isQuasar ? new THREE.Vector3(450, 180, 550) : (sys.name === 'M87*' ? new THREE.Vector3(120, 50, 140) : new THREE.Vector3(45, 20, 55));
            warpTargetCameraPos.copy(targetPos).add(camOffset);
            
            const infoP = document.getElementById('info-panel');
            if (infoP) {
                infoP.classList.remove('hidden');
                document.getElementById('target-name').textContent = sys.name;
                document.getElementById('target-type').textContent = isQuasar ? "🌌 CUÁSAR HIPERMASIVO" : "🕳️ AGUJERO NEGRO";
                document.getElementById('target-dist').textContent = isQuasar ? "18.2B ly" : (sys.name === 'M87*' ? "53.5M ly" : "6,070 ly");
                document.getElementById('target-mass').textContent = sys.desc || "Masa de Singularidad";
                document.getElementById('target-radius').textContent = `${rShadow} UA`;
            }
            if (window.fetchNasaImageData) window.fetchNasaImageData(sys.name);
        });
        
        document.body.appendChild(bhLabelDiv);
        group.userData.bhLabel = bhLabelDiv;

    } else if (sys.isHypergiant) {
        // === STEPHENSON 2-18: LA ESTRELLA HIPERGIGANTE ROJA MÁS GRANDE ===
        const starMesh = new THREE.Mesh(
            new THREE.SphereGeometry(24, 64, 64), 
            new THREE.MeshStandardMaterial({ color: 0xff3300, emissive: 0xff1100, emissiveIntensity: 2.2 })
        );
        starMesh.userData = { 
            name: "Stephenson 2-18 (Hipergigante Roja)", 
            mass: "30-50 Masas Solares (Volumen: 10,000M Soles)", 
            radius: "2,150 Radios Solares (1.5 Millardos km)",
            desc: "Estrella hipergigante en la constelación de Scutum. Si estuviese en el centro de nuestro Sistema Solar, su superficie tragaría la órbita de Saturno."
        };
        group.add(starMesh);
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'planet-label';
        labelDiv.style.color = '#ff4411';
        labelDiv.style.fontWeight = 'bold';
        labelDiv.style.textShadow = '0 0 8px #ff4411, 1px 1px 2px black';
        labelDiv.textContent = '[ STEPHENSON 2-18 ]';
        
        // Habilitar clics en Stephenson 2-18
        labelDiv.style.pointerEvents = 'auto';
        labelDiv.style.cursor = 'pointer';
        labelDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            window.trackedObject = null; // Detener persecución de bólido
            warpActive = true; warpT = 0;
            warpStartCameraPos.copy(camera.position); warpStartLookAt.copy(controls.target);
            const targetPos = new THREE.Vector3(75 + sys.x * 200, 75 + sys.y * 200, 75 + sys.z * 200);
            warpTargetLookAt.copy(targetPos);
            warpTargetCameraPos.copy(targetPos).add(new THREE.Vector3(150, 60, 200));
            
            const infoP = document.getElementById('info-panel');
            if (infoP) {
                infoP.classList.remove('hidden');
                document.getElementById('target-name').textContent = "Stephenson 2-18";
                document.getElementById('target-type').textContent = "🔴 LA ESTRELLA MÁS GRANDE DEL COSMOS";
                document.getElementById('target-dist').textContent = "18,900 ly";
                document.getElementById('target-mass').textContent = "30-50 Masas Solares";
                document.getElementById('target-radius').textContent = "2,150 Radios Solares";
            }
            if (window.fetchNasaImageData) window.fetchNasaImageData("Stephenson 2-18");
        });
        
        document.body.appendChild(labelDiv);
        group.userData.bhLabel = labelDiv;
    } else {
        const starMesh = new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), new THREE.MeshBasicMaterial({ color: sys.color }));
        starMesh.userData = { name: sys.name, mass: "Masa Estelar (Secuencia Principal)", radius: "Gigante gaseosa/rocosa" };
        group.add(starMesh);
    }
    extraSystems.add(group);
});

// === SAGITARIO A* (Centro Galáctico Supermasivo - Modelo Kip Thorne + Lente Gravitacional) ===
const sgrAGroup = new THREE.Group();
sgrAGroup.position.set(52075, 75, -99925);
extraSystems.add(sgrAGroup);

const sgrABh = createKipThorneBlackHole({ rShadow: 45, jetLength: 0, isAccretionActive: false });
sgrABh.bhGroup.userData = { name: "Sagitario A* (Agujero Negro Supermasivo)", mass: "4.1 Millones de Masas Solares", radius: "Horizonte de 22 millones km" };
sgrAGroup.add(sgrABh.bhGroup);

const sgrADisk = sgrABh.eqDisk;

const sgrALabelDiv = document.createElement('div');
sgrALabelDiv.className = 'planet-label';
sgrALabelDiv.style.color = '#ff0055';
sgrALabelDiv.style.fontWeight = 'bold';
sgrALabelDiv.style.textShadow = '0 0 8px #ff0055, 1px 1px 2px black';
sgrALabelDiv.textContent = '[ SAGITARIO A* ]';
sgrALabelDiv.style.pointerEvents = 'none';
document.body.appendChild(sgrALabelDiv);
sgrAGroup.userData.bhLabel = sgrALabelDiv;

// === RED DE DATOS DVTRGAS (API) ===
const panalGroup = new THREE.Group();
scene.add(panalGroup);
// Convertir celdas matemáticas en Estrellas Cercanas (OBAFGKM)
const cellGeo = new THREE.SphereGeometry(2, 16, 16);
const cellMat = new THREE.MeshStandardMaterial({ 
    color: 0x444444, 
    emissive: 0x111111,
    transparent: true, 
    opacity: 0.3 
});
const cellMesh = new THREE.InstancedMesh(cellGeo, cellMat, 15*15*15);
cellMesh.userData = { isDVTRGASStars: true };
cellMesh.visible = false;
panalGroup.add(cellMesh);

function setNEOColorAndEmissive(m, colorHex, emissiveHex, emissiveIntensity = null) {
    if (!m || !m.mesh) return;
    const meshObj = m.mesh;
    
    // Si es una malla individual (THREE.Mesh)
    if (meshObj.isMesh) {
        if (meshObj.material) {
            if (colorHex !== null && meshObj.material.color) meshObj.material.color.setHex(colorHex);
            if (emissiveHex !== null && meshObj.material.emissive) meshObj.material.emissive.setHex(emissiveHex);
            if (emissiveIntensity !== null) meshObj.material.emissiveIntensity = emissiveIntensity;
        }
    } else {
        // Si es un grupo (THREE.Group, ej. cacahuates o cometas con coma)
        meshObj.traverse(child => {
            if (child.isMesh && child.material) {
                // Evitamos alterar la coma cian translúcida de los cometas (que debe seguir siendo cian 0x00ffff)
                if (child.material.color && child.material.color.getHex() !== 0x00ffff) {
                    if (colorHex !== null) child.material.color.setHex(colorHex);
                    if (emissiveHex !== null && child.material.emissive) child.material.emissive.setHex(emissiveHex);
                    if (emissiveIntensity !== null) child.material.emissiveIntensity = emissiveIntensity;
                }
            }
        });
    }
}

const metGroup = new THREE.Group();
metGroup.position.set(75, 75, 75); // Centrado en el Sol en coordenadas del mundo
scene.add(metGroup);

// Anomalías / NEOs (Bólidos 3D Texturizados con deformación de cráteres)
const baseAstGeo = new THREE.IcosahedronGeometry(2.0, 2);
const astPosAttr = baseAstGeo.attributes.position;
for (let i = 0; i < astPosAttr.count; i++) {
    const vx = astPosAttr.getX(i);
    const vy = astPosAttr.getY(i);
    const vz = astPosAttr.getZ(i);
    const noise = 1.0 + (Math.sin(vx * 3) * Math.cos(vy * 3) * Math.sin(vz * 3)) * 0.28;
    astPosAttr.setXYZ(i, vx * noise, vy * noise, vz * noise);
}
baseAstGeo.computeVertexNormals();

const rockTexture = textureLoader.load('/textures/mercury.jpg');
rockTexture.wrapS = THREE.RepeatWrapping;
rockTexture.wrapT = THREE.RepeatWrapping;
rockTexture.repeat.set(2, 2);

const meteorites = []; 
for(let i=0; i<20; i++) {
    const metMat = new THREE.MeshStandardMaterial({
        map: rockTexture,
        color: 0xddbb99,
        roughness: 0.85,
        metalness: 0.2,
        emissive: 0x442200,
        emissiveIntensity: 0.8
    });
    const m = new THREE.Mesh(baseAstGeo.clone(), metMat);
    m.visible = false;
    
    // Línea de trayectoria predictiva en alta visibilidad Neón 3D
    const trajGeo = new THREE.BufferGeometry();
    trajGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
    const trajLine = new THREE.Line(trajGeo, new THREE.LineBasicMaterial({ 
        color: 0xff0055, 
        linewidth: 3, 
        transparent: true, 
        opacity: 0.9,
        depthTest: false
    }));
    trajLine.visible = false;
    
    // Etiqueta del asteroide (Manual HTML)
    const metDiv = document.createElement('div');
    metDiv.style.position = 'absolute';
    metDiv.style.color = '#ffaa00';
    metDiv.style.fontSize = '10px';
    metDiv.style.fontWeight = 'bold';
    metDiv.style.fontFamily = 'monospace';
    metDiv.style.pointerEvents = 'none';
    metDiv.style.textShadow = '0 0 5px black, 1px 1px 2px black';
    metDiv.style.display = 'none';
    document.body.appendChild(metDiv);
    
    metGroup.add(m);
    scene.add(trajLine); // Trayectoria añadida a la escena global para coordenadas absolutas
    meteorites.push({ mesh: m, traj: trajLine, labelDiv: metDiv, targetPos: new THREE.Vector3(), prevPos: new THREE.Vector3(), isThreat: false });
}

// Inicializar Bólidos, Asteroides y Cometas Reales Clasificados
const realNEOList = [
    // --- CLASE APOLO / ATÓN / AMOR (Potencialmente Peligrosos - PHA) ---
    { name: "NEO-99942 Apophis", classType: "apolo", dist: 105, speed: 1.4, inc: 0.05, desc: "Asteroide Apolo potencialmente peligroso. Encuentro cercano con la Tierra en 2029." },
    { name: "NEO-101955 Bennu", classType: "apolo", dist: 135, speed: 1.1, inc: 0.10, desc: "Asteroide rico en carbono explorado por OSIRIS-REx de la NASA." },
    { name: "NEO-433 Eros", classType: "apolo", dist: 145, speed: 0.9, inc: 0.18, desc: "Asteroide Amor masivo de 34 km explorado por NEAR Shoemaker." },
    { name: "NEO-2024 YR4", classType: "apolo", dist: 98, speed: 1.6, inc: 0.04, desc: "Bólido hiperbólico recién detectado con ventana de encuentro orbital cercano." },
    { name: "NEO-1950 DA", classType: "apolo", dist: 168, speed: 0.8, inc: 0.21, desc: "Asteroide Apolo con rotación acelerada por efecto Yarkovsky." },
    { name: "NEO-4179 Toutatis", classType: "apolo", dist: 172, speed: 0.7, inc: 0.08, desc: "Asteroide binario lobulado de 5.4 km en rotación no principal." },
    { name: "NEO-65803 Didymos", classType: "apolo", dist: 122, speed: 1.2, inc: 0.06, desc: "Sistema binario con Dimorphos, objetivo del impacto cinético DART." },
    { name: "NEO-162173 Ryugu", classType: "apolo", dist: 118, speed: 1.0, inc: 0.10, desc: "Asteroide primitivo tipo C explorado por la misión Hayabusa2." },

    // --- CLASE COMETARIA / NÚCLEOS HELADOS ---
    { name: "Cometa 1P/Halley", classType: "comet", dist: 220, speed: 2.1, inc: 0.35, desc: "Cometa periódico helado con cola de plasma ionizado. Órbita retrógrada." },
    { name: "Cometa C/2020 F3 NEOWISE", classType: "comet", dist: 240, speed: 2.5, inc: 0.45, desc: "Cometa hiperbólico de largo periodo con desgasificación brillante." },

    // --- CLASE BÓLIDOS INTERESTELARES ---
    { name: "Interestelar 1I/'Oumuamua", classType: "interstellar", dist: 280, speed: 3.2, inc: 0.60, desc: "Primer objeto interestelar detectado atravesando el Sistema Solar a 87 km/s." },
    { name: "Interestelar 2I/Borisov", classType: "interstellar", dist: 310, speed: 3.0, inc: 0.52, desc: "Cometa extrasolar procedente del espacio interestelar con abundancia de CO." }
];

function createSpecializedNEOMesh(neo) {
    let geo, mat;
    const rockTex = textureLoader.load('/textures/mercury.jpg');
    rockTex.wrapS = THREE.RepeatWrapping;
    rockTex.wrapT = THREE.RepeatWrapping;
    rockTex.repeat.set(2, 2);

    if (neo.name.includes("'Oumuamua")) {
        // === 1I/'OUMUAMUA: CIGARRO / AGUJA INTERESTELAR ULTRA-ALARGADO (RELACIÓN DE ASPECTO 10:1) ===
        geo = new THREE.CylinderGeometry(0.35, 0.45, 9.5, 16, 12);
        const posAttr = geo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
            const y = posAttr.getY(i);
            const noise = 1.0 + Math.sin(y * 2) * 0.15;
            posAttr.setX(i, posAttr.getX(i) * noise);
            posAttr.setZ(i, posAttr.getZ(i) * noise);
        }
        geo.computeVertexNormals();
        
        mat = new THREE.MeshStandardMaterial({
            map: rockTex,
            color: 0xa83b2a, // Rojo oscuro tolina orgánica interestelar
            roughness: 0.92,
            metalness: 0.1,
            emissive: 0x55150a,
            emissiveIntensity: 0.9
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.z = Math.PI / 3;
        return mesh;
    } 
    else if (neo.name.includes("Ryugu") || neo.name.includes("Bennu")) {
        // === RYUGU & BENNU: FORMA DE TROMPO / DIAMANTE ECUATORIAL (DOUBLE PYRAMID / SPINNING TOP) ===
        geo = new THREE.OctahedronGeometry(2.4, 2);
        const posAttr = geo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
            const y = posAttr.getY(i);
            if (Math.abs(y) < 0.8) {
                posAttr.setX(i, posAttr.getX(i) * 1.45);
                posAttr.setZ(i, posAttr.getZ(i) * 1.45);
            }
        }
        geo.computeVertexNormals();
        mat = new THREE.MeshStandardMaterial({
            map: rockTex,
            color: 0x555555, // Regolito carbonáceo oscuro (Tipo C)
            roughness: 0.9,
            metalness: 0.2,
            emissive: 0x222222,
            emissiveIntensity: 0.6
        });
        return new THREE.Mesh(geo, mat);
    }
    else if (neo.name.includes("Eros") || neo.name.includes("Toutatis")) {
        // === EROS & TOUTATIS: CACAHUATE / MANÍ BINARIO LOBULADO (PEANUT SHAPED) ===
        const group = new THREE.Group();
        const lobe1 = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 2), new THREE.MeshStandardMaterial({ map: rockTex, color: 0xc2a688, roughness: 0.8, metalness: 0.2, emissive: 0x332211 }));
        const lobe2 = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 2), new THREE.MeshStandardMaterial({ map: rockTex, color: 0xc2a688, roughness: 0.8, metalness: 0.2, emissive: 0x332211 }));
        lobe1.position.set(-1.2, 0, 0);
        lobe2.position.set(1.4, 0, 0);
        group.add(lobe1);
        group.add(lobe2);
        return group;
    }
    else if (neo.classType === "comet" || neo.name.includes("Borisov")) {
        // === COMETAS: NÚCLEO CON COMA HELADA Y TRASLUCIDEZ AZUL/CYAN ===
        const group = new THREE.Group();
        const coreMat = new THREE.MeshStandardMaterial({ map: rockTex, color: 0x88bbdd, roughness: 0.7, emissive: 0x004488, emissiveIntensity: 1.2 });
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 2), coreMat);
        group.add(core);
        
        const comaGeo = new THREE.SphereGeometry(3.2, 16, 16);
        const comaMat = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const coma = new THREE.Mesh(comaGeo, comaMat);
        group.add(coma);
        return group;
    }
    else {
        // === ASTEROIDE REGULAR TIPO APOLO DEFORMADO CON CRÁTERES ===
        geo = new THREE.IcosahedronGeometry(2.0, 2);
        const posAttr = geo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
            const vx = posAttr.getX(i);
            const vy = posAttr.getY(i);
            const vz = posAttr.getZ(i);
            const noise = 1.0 + (Math.sin(vx * 3) * Math.cos(vy * 3) * Math.sin(vz * 3)) * 0.28;
            posAttr.setXYZ(i, vx * noise, vy * noise, vz * noise);
        }
        geo.computeVertexNormals();
        mat = new THREE.MeshStandardMaterial({ map: rockTex, color: 0xddbb99, roughness: 0.85, metalness: 0.2, emissive: 0x442200, emissiveIntensity: 0.8 });
        return new THREE.Mesh(geo, mat);
    }
}

realNEOList.forEach((neo, i) => {
    if (i < meteorites.length) {
        const m = meteorites[i];
        
        // Reemplazar malla genérica por malla científica 3D especializada
        metGroup.remove(m.mesh);
        const customMesh = createSpecializedNEOMesh(neo);
        m.mesh = customMesh;
        metGroup.add(m.mesh);

        m.mesh.visible = true;
        m.classType = neo.classType;
        m.mesh.userData = { name: neo.name, mass: "Bólido / Asteroide", radius: "0.4 - 34 km", isNEO: true, desc: neo.desc, classType: neo.classType };
        if (m.labelDiv) {
            m.labelDiv.textContent = neo.name;
            m.labelDiv.style.display = 'block';
        }
        const angle = (i / realNEOList.length) * Math.PI * 2;
        m.mesh.position.set(Math.cos(angle) * neo.dist, (Math.random()-0.5) * 15, Math.sin(angle) * neo.dist);
        const nextAngle = angle + 0.08;
        m.targetPos.set(Math.cos(nextAngle) * neo.dist, (Math.random()-0.5) * 15, Math.sin(nextAngle) * neo.dist);
        m.neoData = neo;
        m.neoData.angle = angle;
    }
});

// Controladores UI para el Panel de Catálogo de Bólidos NEO
let activeNEOFilter = "all";

function renderNEOCatalogList() {
    const container = document.getElementById('neo-list-container');
    if (!container) return;
    container.innerHTML = "";
    
    const earthWorldPos = new THREE.Vector3(75, 75, 75);
    
    meteorites.forEach((m, idx) => {
        if (!m.neoData) return;
        const neo = m.neoData;
        if (activeNEOFilter !== "all" && neo.classType !== activeNEOFilter) return;
        
        const distToEarth = m.mesh.position.distanceTo(earthWorldPos);
        const distAU = (distToEarth / 200).toFixed(2);
        
        const card = document.createElement('div');
        card.style.cssText = 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,170,0,0.3); padding: 6px; border-radius: 4px; display: flex; flex-direction: column; gap: 3px;';
        
        let badgeColor = "#ffaa00";
        let badgeText = "APOLO/PHA";
        if (neo.classType === "comet") { badgeColor = "#00ffff"; badgeText = "COMETARIO"; }
        else if (neo.classType === "interstellar") { badgeColor = "#ff00ff"; badgeText = "INTERESTELAR"; }
        
        const statusText = m.isThreat ? `<span style="color:red; font-weight:bold;">🔴 PELIGRO</span>` : (m.isDestroyed ? `<span style="color:#ff5500;">🔥 INCINERADO</span>` : `<span style="color:#00ffcc;">🟢 SEGURO</span>`);

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="color:#fff; font-weight:bold;">${neo.name}</span>
                <span style="background:rgba(255,255,255,0.1); border:1px solid ${badgeColor}; color:${badgeColor}; font-size:8px; padding:1px 4px; border-radius:2px;">${badgeText}</span>
            </div>
            <div style="font-size:9px; color:#aaa; display:flex; justify-content:space-between;">
                <span>Dist: ${distAU} UA</span>
                <span>Estado: ${statusText}</span>
            </div>
            <div style="display:flex; gap:4px; margin-top:3px;">
                <button class="btn-focus-neo" data-idx="${idx}" style="background:rgba(0,240,255,0.15); border:1px solid #00f0ff; color:#00f0ff; font-size:9px; padding:3px 6px; border-radius:3px; cursor:pointer; font-weight:bold; flex:1;">👁️ SEGUIR TRAYECTORIA</button>
                <button class="btn-dart-neo" data-idx="${idx}" style="background:rgba(255,51,0,0.2); border:1px solid #ff3300; color:#ff3300; font-size:9px; padding:3px 6px; border-radius:3px; cursor:pointer; font-weight:bold;">🚀 DART</button>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Bind click events
    container.querySelectorAll('.btn-focus-neo').forEach(btn => {
        btn.onclick = () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            const targetM = meteorites[idx];
            if (targetM) {
                window.trackedObject = targetM; // Activar seguimiento en tiempo real
                
                warpActive = true; warpT = 0;
                warpStartCameraPos.copy(camera.position); warpStartLookAt.copy(controls.target);
                const targetWorldPos = new THREE.Vector3();
                targetM.mesh.getWorldPosition(targetWorldPos);
                warpTargetLookAt.copy(targetWorldPos);
                warpTargetCameraPos.copy(targetWorldPos).add(new THREE.Vector3(5, 2.5, 6.5));
                
                // Resaltar vector de trayectoria y emissive en magenta neón brillante
                setNEOColorAndEmissive(targetM, null, 0xff00ff);
                if (targetM.traj) {
                    targetM.traj.material.color.setHex(0xff00ff);
                    targetM.traj.material.opacity = 1.0;
                }
                
                const infoP = document.getElementById('info-panel');
                if (infoP) {
                    infoP.classList.remove('hidden');
                    document.getElementById('target-name').textContent = targetM.neoData.name;
                    document.getElementById('target-type').textContent = `☄️ CÁMARA PERSEGUIDORA EN VIVO [CLASE ${targetM.classType.toUpperCase()}]`;
                    document.getElementById('target-dist').textContent = "Tránsito Orbital Activo";
                    document.getElementById('target-mass').textContent = "Masa Rocosa / Helada";
                    document.getElementById('target-radius').textContent = "0.4 - 34 km de diámetro";
                    document.getElementById('target-temp').textContent = "Velocidad de Tránsito: 0.12 u/frame";
                    document.getElementById('target-desc').textContent = targetM.neoData.desc;
                }
                if (window.logTitan) window.logTitan(`[CÁMARA PERSEGUIDORA] Fijado rastreo 3D en tiempo real sobre ${targetM.neoData.name}.`);
            }
        };
    });
    
    container.querySelectorAll('.btn-dart-neo').forEach(btn => {
        btn.onclick = () => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            if (window.launchDARTMission) window.launchDARTMission(idx);
        };
    });
}

// Botones de filtro por clase
document.querySelectorAll('.neo-filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.neo-filter-btn').forEach(b => {
            b.style.background = 'rgba(255,255,255,0.08)';
            b.style.border = '1px solid #555';
            b.style.color = '#ccc';
        });
        btn.style.background = 'rgba(255,170,0,0.3)';
        btn.style.border = '1px solid #ffaa00';
        btn.style.color = 'white';
        activeNEOFilter = btn.getAttribute('data-class');
        renderNEOCatalogList();
    };
});

const btnToggleNeo = document.getElementById('btn-toggle-neo-panel');
const panelNeo = document.getElementById('neo-catalog-panel');
const btnCloseNeo = document.getElementById('btn-close-neo-catalog');

if (btnToggleNeo && panelNeo) {
    btnToggleNeo.onclick = () => {
        panelNeo.classList.toggle('hidden');
        if (!panelNeo.classList.contains('hidden')) {
            renderNEOCatalogList();
        }
    };
}
if (btnCloseNeo && panelNeo) {
    btnCloseNeo.onclick = () => panelNeo.classList.add('hidden');
}

const dummy = new THREE.Object3D();
const dummyColor = new THREE.Color();

// Contenedor HTML flotante para las ecuaciones (El cerebro se comunica)
const eventsContainer = document.createElement('div');
eventsContainer.style.position = 'absolute';
eventsContainer.style.top = '100px';
eventsContainer.style.right = '2rem';
eventsContainer.style.color = '#4cc9f0';
eventsContainer.style.fontFamily = 'monospace';
eventsContainer.style.fontSize = '0.9rem';
eventsContainer.style.pointerEvents = 'none';
eventsContainer.style.textShadow = '0 0 5px black';
eventsContainer.style.zIndex = '1000';
eventsContainer.style.width = '300px';
document.body.appendChild(eventsContainer);

eventsContainer.style.width = '300px';
document.body.appendChild(eventsContainer);

let currentDVTRGASData = null; // Guardar datos para el raycaster
let step = 0;
async function fetchDVTRGAS() {
    try {
        const res = await fetch('/api/simulacion');
        if (!res.ok) return;
        const data = await res.json();
        
        step = data.paso;
        currentDVTRGASData = data.celdas; // Guardar en memoria
        
        // Actualizar Celdas Cúbico-Hexagonales
        cellMesh.count = data.celdas.length;
        data.celdas.forEach((celda, i) => {
            dummy.position.set(celda.x * cellSize, celda.y * cellSize, celda.z * cellSize);
            
            // Asignación de colores por estado de ecuación simulando catálogo estelar
            if (celda.estado === 'colapsada') {
                dummyColor.setHex(0x661111); // Estrella tipo M (Enana Roja)
                dummy.scale.set(1.5, 1.5, 1.5);
            } else if (celda.estado === 'regenerando') {
                dummyColor.setHex(0x1166aa); // Estrella tipo O (Gigante Azul)
                dummy.scale.set(1.2, 1.2, 1.2);
            } else if (celda.estado === 'activa' || celda.masa > 0) {
                dummyColor.setHex(0x665544); // Estrella tipo G (Amarilla/Blanca)
                dummy.scale.set(0.8, 0.8, 0.8);
            } else {
                dummyColor.setHex(0x000000); 
                dummy.scale.set(0, 0, 0); // Ocultar por completo
            }
            
            dummy.updateMatrix();
            cellMesh.setMatrixAt(i, dummy.matrix);
            cellMesh.setColorAt(i, dummyColor);
        });
        cellMesh.instanceMatrix.needsUpdate = true;
        if (cellMesh.instanceColor) cellMesh.instanceColor.needsUpdate = true;

        // Actualizar Anomalías / Meteoritos (Preservar NEOs reales si la API no trae meteoritos nuevos)
        if (data.meteoritos && data.meteoritos.length > 0) {
            meteorites.forEach((m, i) => {
                if (i < data.meteoritos.length) {
                    m.mesh.visible = true;
                    const d = data.meteoritos[i];
                    m.prevPos.copy(m.mesh.position);
                    m.targetPos.set(d.x * cellSize, d.y * cellSize, d.z * cellSize);
                    if(m.labelDiv && d.nombre) {
                        m.labelDiv.textContent = d.nombre;
                    }
                }
            });
        }

        // Actualizar HUD Ecuaciones Validadoras
        let html = `<h3 style="color:white; border-bottom:1px solid #4cc9f0; padding-bottom:5px;">DVTRGAS | PASO ${step}</h3><br>`;
        eventsContainer.innerHTML = html;

    } catch (e) {
        eventsContainer.innerHTML = "<div style='color:red;'>Esperando conexión con servidor DVTRGAS (API)...</div>";
    }
}

// === MISIÓN DE MITIGACIÓN DART (Defensa Planetaria Activa contra NEOs) ===
window.launchDARTMission = function(targetIdx) {
    const out = document.getElementById('console-output');
    let targetNeo = null;
    if (typeof targetIdx === 'number' && meteorites[targetIdx]) {
        targetNeo = meteorites[targetIdx];
    } else {
        targetNeo = meteorites.find(m => m.mesh.visible) || meteorites[0];
    }
    if (!targetNeo) return;
    
    // Enfocar automáticamente la cámara perseguidora en vivo sobre el NEO seleccionado
    window.trackedObject = targetNeo;
    
    // Sonda Interceptora DART (Modelo 3D con Chasis Metálico y Paneles Solares)
    const dartGroup = new THREE.Group();
    const bodyMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.8, 1.4),
        new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.2 })
    );
    dartGroup.add(bodyMesh);
    
    const panelMat = new THREE.MeshBasicMaterial({ color: 0x0088ff, side: THREE.DoubleSide });
    const pLeft = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.6), panelMat);
    pLeft.position.set(-1.6, 0, 0);
    dartGroup.add(pLeft);
    const pRight = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.6), panelMat);
    pRight.position.set(1.6, 0, 0);
    dartGroup.add(pRight);
    
    // Estela de propulsión iónica cyan
    const thrusterMesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.4, 2.0, 8),
        new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })
    );
    thrusterMesh.rotation.x = Math.PI / 2;
    thrusterMesh.position.set(0, 0, 1.2);
    dartGroup.add(thrusterMesh);
    
    const earthWorldPos = new THREE.Vector3(75, 75, 75);
    dartGroup.position.copy(earthWorldPos);
    scene.add(dartGroup);
    
    const neoName = (targetNeo.neoData && targetNeo.neoData.name) ? targetNeo.neoData.name : (targetNeo.mesh.userData.name || "Bólido NEO");
    
    if (out) {
        out.innerHTML += `<div style="color:#00ffff; font-weight:bold; font-family:monospace;">🚀 MISIÓN DART INICIADA: Interceptor cinético despegando desde la Tierra hacia [${neoName}] a 6.6 km/s...</div>`;
        out.scrollTop = out.scrollHeight;
    }
    
    let t = 0;
    const startPos = earthWorldPos.clone();
    
    const interval = setInterval(() => {
        t += 0.03;
        const currentNeoWorldPos = new THREE.Vector3();
        targetNeo.mesh.getWorldPosition(currentNeoWorldPos);
        
        dartGroup.position.lerpVectors(startPos, currentNeoWorldPos, t);
        dartGroup.lookAt(currentNeoWorldPos);
        
        if (t >= 1.0) {
            clearInterval(interval);
            const impactPos = currentNeoWorldPos.clone();
            scene.remove(dartGroup);
            
            // === 💥 1. DESTELLO DE EXPLOSIÓN CINÉTICA Y ENJAMBRE DE ESCOMBROS (3D EJECTA PLUME) ===
            const flashGeo = new THREE.SphereGeometry(1.2, 32, 32);
            const flashMat = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.95,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const flashMesh = new THREE.Mesh(flashGeo, flashMat);
            flashMesh.position.copy(impactPos);
            scene.add(flashMesh);
            
            // Enjambre de 250 partículas de escombros eyectados (Dimorphos Ejecta Plume Model)
            const pCount = 250;
            const pGeo = new THREE.BufferGeometry();
            const pPositions = new Float32Array(pCount * 3);
            const pVelocities = [];
            
            for (let i = 0; i < pCount; i++) {
                pPositions[i*3]     = impactPos.x;
                pPositions[i*3 + 1] = impactPos.y;
                pPositions[i*3 + 2] = impactPos.z;
                
                const dir = new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ).normalize().multiplyScalar(0.4 + Math.random() * 0.8);
                pVelocities.push(dir);
            }
            pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
            
            const pMat = new THREE.PointsMaterial({
                color: 0x00ffff,
                size: 0.8,
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const ejectaParticles = new THREE.Points(pGeo, pMat);
            scene.add(ejectaParticles);
            
            // Animación de expansión de explosión y disipación de partículas
            let animT = 0;
            const animTimer = setInterval(() => {
                animT += 0.04;
                flashMesh.scale.addScalar(0.35);
                flashMat.opacity = Math.max(0, 0.95 - animT * 0.5);
                
                const posArr = ejectaParticles.geometry.attributes.position.array;
                for (let i = 0; i < pCount; i++) {
                    posArr[i*3]     += pVelocities[i].x;
                    posArr[i*3 + 1] += pVelocities[i].y;
                    posArr[i*3 + 2] += pVelocities[i].z;
                }
                ejectaParticles.geometry.attributes.position.needsUpdate = true;
                pMat.opacity = Math.max(0, 0.9 - animT * 0.45);
                
                if (animT >= 2.0) {
                    clearInterval(animTimer);
                    scene.remove(flashMesh);
                    scene.remove(ejectaParticles);
                }
            }, 30);
            
            // === 💥 2. DESVÍO ORBITAL Y VECTORES VERDES ===
            targetNeo.targetPos.add(new THREE.Vector3((Math.random()-0.5)*120 + 60, (Math.random()-0.5)*40 + 20, (Math.random()-0.5)*120 + 60));
            setNEOColorAndEmissive(targetNeo, 0x00ff88, 0x00ff00);
            if (targetNeo.traj) {
                targetNeo.traj.material.color.setHex(0x00ff00);
                targetNeo.traj.material.opacity = 1.0;
            }
            
            // === 💥 3. CÁLCULO DE TELEMETRÍA HIPOTÉTICA Y REPORTE EN CONSOLA ===
            const lat = (Math.random() * 180 - 90).toFixed(4);
            const lon = (Math.random() * 360 - 180).toFixed(4);
            const craterKm = Math.floor(Math.random() * 80 + 25);
            const megatons = Math.floor(Math.random() * 120000 + 40000);
            const simId = `hypo-${Date.now()}`;
            
            if (out) {
                out.innerHTML += `<div style="border-left: 4px solid #00ff00; background: rgba(0,255,0,0.12); padding: 10px; color: #fff; margin: 8px 0; font-family: monospace; line-height:1.4;">
                    <span style="color:#00ff00; font-weight:bold; font-size:12px;">💥 IMPACTO CINÉTICO CONFIRMADO: MISIÓN DART EXITOSA EN [${neoName.toUpperCase()}]</span><br/>
                    <span style="color:#aaffaa;">> TRANSFERENCIA DE MOMENTO:</span> Δv = +2.85 mm/s (Deflexión Kinetic Impactor)<br/>
                    <span style="color:#aaffaa;">> ENERGÍA ENTREGADA:</span> 3.6 × 10¹⁰ Joules (570 kg a 6.6 km/s)<br/>
                    <span style="color:#00ffcc; font-weight:bold;">> ESTADO DE LA AMENAZA:</span> NEUTRALIZADA. Órbita desplazada a distancia segura.<br/><br/>
                    <div style="background:rgba(255,0,85,0.18); border:1px solid #ff0055; padding:8px; border-radius:4px;">
                        <span style="color:#ff0055; font-weight:bold; font-size:11px;">⚠️ SIMULACIÓN DE ESCENARIO HIPOTÉTICO (¿QUÉ HUBIESE PASADO SIN DART?):</span><br/>
                        • Coordenadas terrestres de choque: LAT ${lat}°, LON ${lon}°<br/>
                        • Cráter proyectado: ${craterKm} km de diámetro | Liberación térmica: ${megatons.toLocaleString()} Megatones TNT<br/>
                        • Consecuencia planetaria: Extinción biológica regional e invierno estratosférico de azufre.<br/>
                        <button id="${simId}" style="background:#ff0055; border:1px solid #ff6600; color:white; font-weight:bold; padding:4px 8px; margin-top:6px; cursor:pointer; font-size:10px; border-radius:3px;">🔥 SIMULAR IMPACTO DIRECTO HIPOTÉTICO (FORZAR COLISIÓN TERRESTRE)</button>
                    </div>
                </div>`;
                out.scrollTop = out.scrollHeight;
                
                // Event listener para forzar el impacto directo hipotético
                setTimeout(() => {
                    const hypoBtn = document.getElementById(simId);
                    if (hypoBtn) {
                        hypoBtn.onclick = () => {
                            window.trackedObject = targetNeo;
                            targetNeo.targetPos.set(0, 0, 0); // Apuntar al centro del Sol/Tierra
                            setNEOColorAndEmissive(targetNeo, null, 0xff0000);
                            if (targetNeo.traj) targetNeo.traj.material.color.setHex(0xff0000);
                            if (window.logTitan) window.logTitan(`[SIMULACIÓN HIPOTÉTICA] Forzando vector de impacto directo de ${neoName} hacia la Tierra.`);
                        };
                    }
                }, 100);
            }
        }
    }, 30);
};

// Sondeo periódico (Poll) al cerebro DVTRGAS cada 1 segundo
setInterval(fetchDVTRGAS, 1000);

// === TITAN v26 SHADER (POST-PROCESADO BRUTAL) ===
// Transpuesto desde dvtrga26_pipeline.c (apply_swarm_distortion y apply_snr_visual)
const TitanShader = {
    uniforms: {
        "tDiffuse": { value: null },
        "time": { value: 0 },
        "swarmIntensity": { value: 0.005 },
        "bhPosScreen": { value: new THREE.Vector2(0.5, 0.5) },
        "bhActive": { value: 0.0 }
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float time;
        uniform float swarmIntensity;
        uniform vec2 bhPosScreen;
        uniform float bhActive;
        varying vec2 vUv;
        
        void main() {
            vec2 uv = vUv;
            float dist = distance(uv, vec2(0.5));
            
            // Máscara radial: 0 en el centro, 1 en los bordes
            float edgeMask = smoothstep(0.1, 0.8, dist); 
            
            // Lente Gravitacional (Black Hole Lensing)
            if (bhActive > 0.0) {
                vec2 dirToBh = uv - bhPosScreen;
                float distToBh = length(dirToBh);
                if (distToBh < 0.3) {
                    float lensing = (0.3 - distToBh) * (0.3 - distToBh) * bhActive;
                    uv -= normalize(dirToBh) * lensing * 0.5;
                }
            }
            
            // 🌪️ Swarm Distortion (Aberración)
            float vx = sin(uv.y * 20.0 + time * 2.0) * swarmIntensity * edgeMask;
            float vy = cos(uv.x * 20.0 + time * 2.0) * swarmIntensity * edgeMask;
            uv.x += vx;
            uv.y += vy;
            
            vec4 texColor = texture2D(tDiffuse, uv);
            
            // 🧠 SNR Visual (Aberración Energética perimetral)
            float snrWeight = smoothstep(0.4, 0.8, dist); // SNR activo en los bordes
            
            // Modulador de color (Rojo colapso, Azul expansión)
            texColor.r += snrWeight * 0.15 * (sin(time * 2.0) * 0.5 + 0.5);
            texColor.b += snrWeight * 0.15 * (cos(time * 2.0) * 0.5 + 0.5);
            texColor.g *= (1.0 - snrWeight * 0.1); // Oscurecer verdes
            
            gl_FragColor = texColor;
        }
    `
};

const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

// Añadir Bloom fotorrealista para el resplandor del sol y estrellas
// Añadir Bloom fotorrealista para el resplandor del sol y estrellas (ESPECTÁCULO VISUAL)
// === BLOOM HDR FÍSICO — Espacio Profundo Real ===
// threshold alto: solo superficies estelares y núcleos brillan (sin neon-glow ambiental)
// strength bajo: halo tenue y puntual, como observaciones reales del Hubble
const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.45, 0.22, 0.92);
bloomPass.threshold = 0.92;   // Solo núcleos estelares muy luminosos
bloomPass.strength  = 0.45;   // Halo físico mínimo — sin glow excesivo
bloomPass.radius    = 0.22;   // Difusión puntual, no expansiva
composer.addPass(bloomPass);

// === POLVO INTERESTELAR — Medio Interestelar (ISM) Real ===
// Distribución volumétrica de gas y polvo interestelar:
// color gris-azul frío (ISM real: silicatos y carbono), tamaño sub-pixel, muy transparente
const dustGeo = new THREE.BufferGeometry();
const dustCount = 8000;
const dustPos = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount; i++) {
    // Distribución en disco galáctico aplanado (plano Y más comprimido)
    dustPos[i*3]   = (Math.random() - 0.5) * 2400 + 75;
    dustPos[i*3+1] = (Math.random() - 0.5) * 180  + 75;
    dustPos[i*3+2] = (Math.random() - 0.5) * 2400 + 75;
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
// Silicatos interestelares: gris-azul frío, muy pequeños, casi invisibles a distancia
const dustMat = new THREE.PointsMaterial({
    color: 0x8899bb,    // Gris-azul: silicatos y grafito ISM real
    size: 0.15,         // Sub-pixel — visible solo cerca
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    sizeAttenuation: true
});
const cosmicDust = new THREE.Points(dustGeo, dustMat);
scene.add(cosmicDust);

const titanPass = new THREE.ShaderPass(TitanShader);
titanPass.renderToScreen = true;
composer.addPass(titanPass);

// === INTERACTIVIDAD UI ===
let timeSpeed = 5.0; // Velocidad default más rápida para ver orbitar planetas
document.getElementById('speed-slider').addEventListener('input', (e) => {
    timeSpeed = e.target.value / 10;
    document.getElementById('speed-display').innerText = timeSpeed.toFixed(1) + 'x';
});

// === DVTRGAS PHYSICS LAB ===
let physicsG = 1.0;
let physicsAcc = 1.0;
let physicsWarp = 1.0;
let currentTopology = 'spherical'; // 'spherical', 'cubic', 'custom'
let customTopologyFunc = null;

document.getElementById('select-topology').addEventListener('change', (e) => {
    currentTopology = e.target.value;
    const formulaDisplay = document.getElementById('metric-formula-display');
    
    if (currentTopology === 'spherical') {
        formulaDisplay.textContent = "Ecuación: r² = x² + z²";
        logTitan(`Topología espacial mutada a ESFÉRICA (L2 Euclidiana)`);
    } else if (currentTopology === 'cubic') {
        formulaDisplay.textContent = "Ecuación: r = max(|x|, |z|)";
        logTitan(`Topología espacial mutada a CÚBICA (L∞ Minkowski)`);
    } else if (currentTopology === 'manhattan') {
        formulaDisplay.textContent = "Ecuación: r = |x| + |z|";
        logTitan(`Topología espacial mutada a MANHATTAN (L1 Romboidal)`);
    } else if (currentTopology === 'lame') {
        formulaDisplay.textContent = "Ecuación: r = (|x|³ + |z|³)^(1/3)";
        logTitan(`Topología espacial mutada a CÚBICA DE LAMÉ (Curva Cúbica Real)`);
    } else if (currentTopology === 'custom') {
        formulaDisplay.textContent = "Ecuación: Fórmula Custom Definida";
    }
    updateOrbitsGeometry();
});

document.getElementById('btn-apply-metric').addEventListener('click', () => {
    const input = document.getElementById('custom-metric-input').value;
    if (!input) return;
    try {
        let exp = input;
        if (input.includes('=')) exp = input.split('=')[1].trim();
        
        exp = exp.replace(/abs/g, 'Math.abs')
                 .replace(/sqrt/g, 'Math.sqrt')
                 .replace(/max/g, 'Math.max')
                 .replace(/pow/g, 'Math.pow');
                 
        customTopologyFunc = new Function('x', 'y', 'z', `return ${exp};`);
        customTopologyFunc(1,1,1);
        
        currentTopology = 'custom';
        document.getElementById('select-topology').value = 'custom';
        document.getElementById('metric-formula-display').textContent = `Ecuación Custom: ${input}`;
        logTitan(`Topología mutada a MÉTRICA CUSTOM: ${input}`);
        updateOrbitsGeometry();
    } catch(e) {
        logTitan(`[ERROR] Sintaxis de topología inválida: ${e.message}`);
    }
});

function applyTopologyScale(px, pz) {
    if (currentTopology === 'spherical') return 1.0;
    if (currentTopology === 'cubic') {
        return 1.0 / Math.max(Math.abs(px), Math.abs(pz));
    }
    if (currentTopology === 'manhattan') {
        return 1.0 / (Math.abs(px) + Math.abs(pz));
    }
    if (currentTopology === 'lame') {
        // Cúbica de Lamé: (|x|^3 + |z|^3)^(1/3)
        const val = Math.pow(Math.pow(Math.abs(px), 3) + Math.pow(Math.abs(pz), 3), 1/3);
        return 1.0 / (val === 0 ? 0.0001 : val);
    }
    if (currentTopology === 'custom' && customTopologyFunc) {
        try {
            const rNew = customTopologyFunc(px, 0, pz);
            return 1.0 / (rNew === 0 ? 0.0001 : rNew);
        } catch(e) { return 1.0; }
    }
    return 1.0;
}

function updateOrbitsGeometry() {
    planets.forEach((p, index) => {
        const orbitLine = orbits[index];
        if (!orbitLine) return; // Las lunas no tienen orbitLine en el array orbits
        const d = p.data.distance;
        const pts = [];
        for(let i=0; i<=128; i++) {
            const angle = (i / 128) * Math.PI * 2;
            let px = Math.cos(angle);
            let pz = Math.sin(angle);
            let scale = applyTopologyScale(px, pz);
            px *= scale;
            pz *= scale;
            pts.push(px * d, 0, pz * d);
        }
        orbitLine.geometry.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    });
}

document.getElementById('slider-g').addEventListener('input', (e) => {
    physicsG = e.target.value / 100;
    document.getElementById('val-g').innerText = physicsG.toFixed(2);
    logTitan(`Perturbación gravitacional (G) recalibrada a ${physicsG.toFixed(2)}`);
});
document.getElementById('slider-acc').addEventListener('input', (e) => {
    physicsAcc = e.target.value / 100;
    document.getElementById('val-acc').innerText = physicsAcc.toFixed(2);
    logTitan(`Tasa de acreción (Ṁ) recalibrada a ${physicsAcc.toFixed(2)}`);
});
document.getElementById('slider-warp').addEventListener('input', (e) => {
    physicsWarp = e.target.value / 100;
    document.getElementById('val-warp').innerText = physicsWarp.toFixed(2);
    logTitan(`Métrica Alcubierre (Warp) recalibrada a ${physicsWarp.toFixed(2)}`);
});

function logTitan(msg) {
    const out = document.getElementById('console-output');
    if(out) {
        out.innerHTML += `<div style="color:cyan;">> TITAN: ${msg}</div>`;
        out.scrollTop = out.scrollHeight;
    }
}
document.getElementById('toggle-hipparcos').addEventListener('change', (e) => {
    hipparcosGroup.visible = e.target.checked;
});

const toggleZoa = document.getElementById('toggle-zoa');
if (toggleZoa) {
    toggleZoa.addEventListener('change', (e) => {
        if (window.zoaGroup) {
            window.zoaGroup.visible = e.target.checked;
            if (e.target.checked) {
                logTitan(`[ZOA] Interpolación MASA FALTANTE activada. Rellenando disco galáctico...`);
            } else {
                logTitan(`[ZOA] Interpolación desactivada.`);
            }
        }
    });
}

document.getElementById('toggle-blackholes').addEventListener('change', (e) => {
    extraSystems.visible = e.target.checked;
});

document.getElementById('toggle-planets').addEventListener('change', (e) => {
    solarSystem.children.forEach(child => {
        if (child.type === 'Group') child.visible = e.target.checked;
    });
});

document.getElementById('toggle-orbits').addEventListener('change', (e) => {
    orbits.forEach(o => o.visible = e.target.checked);
});

document.getElementById('toggle-labels').addEventListener('change', (e) => {
    document.getElementById('labels-container').style.display = e.target.checked ? 'block' : 'none';
});

document.getElementById('toggle-grid').addEventListener('change', (e) => {
    panalGroup.visible = e.target.checked;
});

document.getElementById('toggle-meteors').addEventListener('change', (e) => {
    metGroup.visible = e.target.checked;
});

document.getElementById('toggle-warp-effect').addEventListener('change', (e) => {
    // Si se desactiva, reseteamos el shader a intensidad 0
    if (!e.target.checked && titanPass) {
        titanPass.uniforms["swarmIntensity"].value = 0.0;
    }
});

// === TIMELINE LOGIC (Motor Temporal Cósmico) ===
let engineTime = Date.now();        // Timestamp actual del motor (ms)
let isLive = false;                 // Modo LIVE: sigue el reloj real
let timeDirection = 1;              // 1 = adelante, -1 = atrás, 0 = pausado
let cosmicOffset = 0;               // Offset acumulado respecto a Date.now() (ms)

// Constante de eras cósmicas (en ms relativos a Date.now())
const COSMIC_ERAS = [
    { threshold: -4e17, label: '🔥 Era Primordial (Big Bang)', color: '#ff6400' },
    { threshold: -4e14, label: '⭐ Era de Recombinación / Primeras Estrellas', color: '#ffcc00' },
    { threshold: -1.4e14, label: '🌌 Formación Galáctica (Vía Láctea)', color: '#00ccff' },
    { threshold: -1.4e14, label: '☀️ Formación Sistema Solar', color: '#ffaa00' },
    { threshold: -2.5e12, label: '🦕 Era Dináster de los Dinosaurios (K-Pg)', color: '#aa00ff' },
    { threshold: -5e10, label: '🧠 Aparición del Homo Sapiens', color: '#00cc66' },
    { threshold: -1e9, label: '📜 Era Histórica', color: '#88aa88' },
    { threshold: 0,    label: '🔴 Época Presente', color: '#00f0ff' },
    { threshold: 1e9,  label: '🚀 Futuro Próximo (+5000 Años)', color: '#ff00cc' },
];

const timeSlider     = document.getElementById('timeline-slider');
const dateDisplay    = document.getElementById('date-display');
const eraLabel       = document.getElementById('cosmic-era-label');
const btnLive        = document.getElementById('btn-live');
const btnForward     = document.getElementById('btn-time-forward');
const btnBackward    = document.getElementById('btn-time-backward');
const btnPause       = document.getElementById('btn-time-pause');
const datetimePicker = document.getElementById('datetime-picker');
const btnJumpDate    = document.getElementById('btn-jump-date');
const dirLabel       = document.getElementById('timeline-direction-label');

// Inicializar datetime picker con la fecha local actual de forma segura
if (datetimePicker) {
    try {
        const nowForPicker = new Date();
        const yyyy = nowForPicker.getFullYear();
        const mm = String(nowForPicker.getMonth() + 1).padStart(2, '0');
        const dd = String(nowForPicker.getDate()).padStart(2, '0');
        const hh = String(nowForPicker.getHours()).padStart(2, '0');
        const min = String(nowForPicker.getMinutes()).padStart(2, '0');
        datetimePicker.value = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    } catch(e) {}
}

// === Funciones de ayuda ===
function getCosmicEraLabel(offsetMs) {
    for (let i = COSMIC_ERAS.length - 1; i >= 0; i--) {
        if (offsetMs >= COSMIC_ERAS[i].threshold) {
            return COSMIC_ERAS[i];
        }
    }
    return COSMIC_ERAS[0];
}

function applyEngineTime(newEngineTime) {
    engineTime = newEngineTime;
    cosmicOffset = engineTime - Date.now();
    if (timeSlider && cosmicOffset >= -3153600000000 && cosmicOffset <= 3153600000000) {
        timeSlider.value = cosmicOffset;
    }
    updateTimelineUI();
}

function updateDirectionLabel() {
    if (!dirLabel) return;
    if (timeDirection === 0) {
        dirLabel.textContent = '⏸ PAUSADO';
        dirLabel.style.color = '#888';
        if (btnPause) { btnPause.style.background = 'rgba(255,255,255,0.4)'; btnPause.style.borderColor = '#ffffff'; }
        if (btnForward) { btnForward.style.background = 'rgba(0,240,255,0.1)'; btnForward.style.borderColor = 'rgba(0,240,255,0.3)'; }
        if (btnBackward) { btnBackward.style.background = 'rgba(255,100,0,0.1)'; btnBackward.style.borderColor = 'rgba(255,100,0,0.3)'; }
    } else if (timeDirection > 0) {
        dirLabel.textContent = '▶ AVANZANDO';
        dirLabel.style.color = '#00f0ff';
        if (btnForward) { btnForward.style.background = 'rgba(0,240,255,0.5)'; btnForward.style.borderColor = '#00f0ff'; }
        if (btnPause) { btnPause.style.background = 'rgba(255,255,255,0.1)'; btnPause.style.borderColor = '#555'; }
        if (btnBackward) { btnBackward.style.background = 'rgba(255,100,0,0.1)'; btnBackward.style.borderColor = 'rgba(255,100,0,0.3)'; }
    } else {
        dirLabel.textContent = '◀ RETROCEDIENDO';
        dirLabel.style.color = '#ff6400';
        if (btnBackward) { btnBackward.style.background = 'rgba(255,100,0,0.6)'; btnBackward.style.borderColor = '#ff6400'; }
        if (btnForward) { btnForward.style.background = 'rgba(0,240,255,0.1)'; btnForward.style.borderColor = 'rgba(0,240,255,0.3)'; }
        if (btnPause) { btnPause.style.background = 'rgba(255,255,255,0.1)'; btnPause.style.borderColor = '#555'; }
    }
}

// === SLIDER (rango -100 / +100 años): Mueve el tiempo directamente ===
if (timeSlider) {
    timeSlider.addEventListener('input', (e) => {
        isLive = false;
        if (btnLive) {
            btnLive.style.background = 'rgba(100,100,100,0.6)';
            btnLive.style.borderColor = '#555';
        }
        cosmicOffset = parseInt(e.target.value);
        engineTime = Date.now() + cosmicOffset;
        updateTimelineUI();
    });
}

// === BOTÓN LIVE ===
if (btnLive) {
    btnLive.addEventListener('click', () => {
        isLive = true;
        timeDirection = 1;
        cosmicOffset = 0;
        engineTime = Date.now();
        if (timeSlider) timeSlider.value = 0;
        btnLive.style.background = 'rgba(255,0,0,0.6)';
        btnLive.style.borderColor = 'red';
        updateDirectionLabel();
        updateTimelineUI();
    });
}

// === CONTROLES DE DIRECCIÓN ===
if (btnForward) {
    btnForward.addEventListener('click', () => {
        isLive = false;
        timeDirection = 1;
        if (btnLive) {
            btnLive.style.background = 'rgba(100,100,100,0.6)';
            btnLive.style.borderColor = '#555';
        }
        updateDirectionLabel();
    });
}

if (btnBackward) {
    btnBackward.addEventListener('click', () => {
        isLive = false;
        timeDirection = -1;
        if (btnLive) {
            btnLive.style.background = 'rgba(100,100,100,0.6)';
            btnLive.style.borderColor = '#555';
        }
        updateDirectionLabel();
    });
}

if (btnPause) {
    btnPause.addEventListener('click', () => {
        isLive = false;
        timeDirection = 0;
        if (btnLive) {
            btnLive.style.background = 'rgba(100,100,100,0.6)';
            btnLive.style.borderColor = '#555';
        }
        updateDirectionLabel();
    });
}

// === SELECTOR DE FECHA/HORA EXACTA ===
if (btnJumpDate) {
    btnJumpDate.addEventListener('click', () => {
        if (!datetimePicker || !datetimePicker.value) return;
        const val = datetimePicker.value;
        const targetMs = new Date(val).getTime();
        if (!isNaN(targetMs)) {
            isLive = false;
            timeDirection = 1; // Al saltar, reanudar avance
            if (btnLive) {
                btnLive.style.background = 'rgba(100,100,100,0.6)';
                btnLive.style.borderColor = '#555';
            }
            applyEngineTime(targetMs);
            updateDirectionLabel();
            if (window.logTitan) window.logTitan(`[CRONÓGRAFO] Salto temporal ejecutado → ${new Date(targetMs).toISOString()}`);
        }
    });
}

// === PRESETS DE ERAS CÓSMICAS ===
document.querySelectorAll('.cosmic-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const offset = parseFloat(btn.getAttribute('data-offset'));
        const label  = btn.getAttribute('data-label');
        const disp   = btn.getAttribute('data-display');
        isLive = false;
        timeDirection = (offset === 0) ? 1 : (offset < 0 ? -1 : 1);
        engineTime = Date.now() + offset;
        cosmicOffset = offset;
        if (btnLive) {
            btnLive.style.background = 'rgba(100,100,100,0.6)';
            btnLive.style.borderColor = '#555';
        }
        updateDirectionLabel();
        updateTimelineUI();
        
        if (window.logTitan) window.logTitan(`[MÁQUINA DEL TIEMPO] Salto a la ERA: ${label} | ${disp}`);
        
        if (datetimePicker && Math.abs(offset) < 8.64e15) {
            try {
                const d = new Date(engineTime);
                if (!isNaN(d.getTime())) {
                    datetimePicker.value = d.toISOString().slice(0,16);
                }
            } catch(e) {}
        }
    });
});

function updateTimelineUI() {
    if (!dateDisplay) return;
    const offset = engineTime - Date.now();
    
    // Solo usar JS Date si engineTime está dentro del rango seguro ECMAScript (Math.abs < 8.64e15)
    if (Math.abs(engineTime) < 8.64e15) {
        try {
            const d = new Date(engineTime);
            if (!isNaN(d.getTime())) {
                const yyyy = d.getFullYear();
                const mm = String(d.getMonth() + 1).padStart(2, '0');
                const dd = String(d.getDate()).padStart(2, '0');
                const timeStr = d.toTimeString().slice(0, 8);
                dateDisplay.textContent = `${yyyy}-${mm}-${dd}  ${timeStr}`;
            } else {
                dateDisplay.textContent = `TIEMPO CÓSMICO`;
            }
        } catch (e) {
            dateDisplay.textContent = `TIEMPO CÓSMICO`;
        }
    } else {
        // Para eras primordiales extremas (Big Bang, Inflación Cósmica)
        const agoYears = Math.round(Math.abs(offset) / (1000 * 60 * 60 * 24 * 365.25));
        const suffix = offset < 0 ? `HACE ${agoYears.toLocaleString()} AÑOS` : `D.C. +${agoYears.toLocaleString()} AÑOS`;
        dateDisplay.textContent = suffix;
    }
    
    // Actualizar etiqueta de era cósmica
    if (eraLabel) {
        const era = getCosmicEraLabel(offset);
        eraLabel.textContent = era.label;
        eraLabel.style.color = era.color;
    }
}

// === RAYCASTER (Clic en planetas y viaje interestelar) ===
const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 10; // Facilitar clic en estrellas
const mouse = new THREE.Vector2();
const infoPanel = document.getElementById('info-panel');
const tName = document.getElementById('target-name');
const tMass = document.getElementById('target-mass');
const tRadius = document.getElementById('target-radius');

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

controls.addEventListener('start', () => {
    window.trackedObject = null; // Liberar seguimiento dinámico al arrastrar la cámara
});

window.addEventListener('click', (e) => {
    // Bloquear raycaster si el clic fue sobre la UI (paneles, botones, checkboxes, inputs)
    const uiTarget = e.target;
    if (uiTarget !== renderer.domElement) {
        // El clic fue en un elemento HTML, no en el canvas 3D — ignorar raycaster
        return;
    }
    window.trackedObject = null; // Liberar seguimiento al seleccionar nuevo objeto 3D
    raycaster.setFromCamera(mouse, camera);
    const targets = [solarSystem, panalGroup, extraSystems];
    if (typeof window.currentExoSystem !== 'undefined' && window.currentExoSystem) targets.push(window.currentExoSystem);
    if (window.simbadGroup) targets.push(window.simbadGroup);
    // nebulaeGroup tiene sprites de radio miles de unidades → hit invisible cubre toda la pantalla
    // if (window.nebulaeGroup) targets.push(window.nebulaeGroup);
    // Los siguientes grupos tienen cientos de miles de puntos y congelan el raycast:
    // hipparcosGroup (~120k puntos), zoaGroup (~35k puntos), milkyWaySphere (1M), cosmicWeb (500k)
    // Solo se detectan haciendo hover visual, no raycast masivo.
    
    const intersects = raycaster.intersectObjects(targets, true);
    let found = false;
    for(let i=0; i<intersects.length; i++) {
        const obj = intersects[i].object;
        
        // DVTRGAS Math Raycasting eliminado. Ahora solo enfocamos datos empíricos reales (SIMBAD / NASA)
        
        // Planetas Normales y SIMBAD Stars
        if (obj.userData && (obj.userData.name || obj.userData.simbad)) {
            const uName = obj.userData.simbad ? obj.userData.simbad.name : obj.userData.name;
            
            infoPanel.classList.remove('hidden');
            tName.textContent = uName;
            
            // Populating extended fields
            document.getElementById('target-mass').textContent = (obj.userData.simbad && obj.userData.simbad.mass) ? obj.userData.simbad.mass : (obj.userData.mass || "Desconocida");
            document.getElementById('target-radius').textContent = (obj.userData.simbad && obj.userData.simbad.radius) ? obj.userData.simbad.radius : (obj.userData.radius || (obj.userData.isExtraSystem ? "1M km" : "Desconocido"));
            document.getElementById('target-dist').textContent = (obj.userData.simbad && obj.userData.simbad.distance) ? `${obj.userData.simbad.distance} ly` : "0 ly";
            document.getElementById('target-mag').textContent = (obj.userData.simbad && obj.userData.simbad.mag) ? obj.userData.simbad.mag : "-";
            document.getElementById('target-temp').textContent = (obj.userData.simbad && obj.userData.simbad.temp) ? obj.userData.simbad.temp : "-";
            
            const typeEl = document.getElementById('target-type');
            if (obj.userData.simbad && obj.userData.simbad.type) {
                typeEl.style.display = "block";
                typeEl.textContent = "SIMBAD // TIPO ESPECTRAL: " + obj.userData.simbad.type;
            } else {
                typeEl.style.display = "block";
                typeEl.textContent = "CUERPO CELESTE";
            }
            
            // Generar botón
            const btnContainer = document.getElementById('landing-btn-container');
            btnContainer.innerHTML = '';
            
            // Centrar cámara en objetivo
            controls.target.copy(obj.position);
            
            const imgEl = document.getElementById('target-image');
            if (obj.userData.simbad && obj.userData.simbad.img) {
                imgEl.src = obj.userData.simbad.img;
                imgEl.style.display = "block";
            } else {
                imgEl.style.display = "none";
            }
            
            const desc = (obj.userData.simbad && obj.userData.simbad.desc) ? obj.userData.simbad.desc : (obj.userData.desc || "Objetivo seleccionado");
            
            // Si es un Exosistema (Estrella Lejana)
            if (obj.userData.isExtraSystem) {
                generateStarSystem(uName, obj.userData.spectralColor);
                currentExoSystem.position.copy(obj.position);
                solarSystem.visible = false; // Ocultar Sistema Solar Local
            } else if (["Sol", "Tierra", "Marte", "Mercurio", "Venus", "Júpiter", "Saturno", "Urano", "Neptuno", "La Luna", "Fobos", "Deimos"].includes(uName)) {
                solarSystem.visible = true;
                if (currentExoSystem) {
                    scene.remove(currentExoSystem);
                    currentExoSystem = null;
                }
            }
            
            const r = parseFloat((obj.userData.simbad && obj.userData.simbad.radius) ? obj.userData.simbad.radius : obj.userData.radius) || (obj.userData.isExtraSystem ? 50 : 10);
            focusObject(obj, r * 4, uName, desc, (obj.userData.simbad && obj.userData.simbad.mass) ? obj.userData.simbad.mass : obj.userData.mass, (obj.userData.simbad && obj.userData.simbad.radius) ? obj.userData.simbad.radius : obj.userData.radius);
            
            found = true;
            break;
        } else if (window.hipparcosGroup && window.hipparcosGroup.children.length > 0 && obj === window.hipparcosGroup.children[0]) {
            const pos = new THREE.Vector3();
            pos.fromBufferAttribute(obj.geometry.attributes.position, intersects[i].index);
            pos.applyMatrix4(obj.matrixWorld);

            // Coordenadas relativas al origen
            const rawX = ((pos.x - 75) / 10).toFixed(2);
            const rawY = ((pos.y - 75) / 10).toFixed(2);
            const rawZ = ((pos.z - 75) / 10).toFixed(2);

            const starName = `Anomalía Estelar (HIP ${intersects[i].index})`;
            showLabPanel(starName, {
                type: "❓ OBJETO ESTELAR NO CATALOGADO",
                dist: `${(pos.distanceTo(solarSystem.position) * 3.26).toFixed(1)} ly`,
                mag: "No medida",
                temp: "Sin espectrometría",
                mass: "Estimada ~1 M☉",
                radius: "Desconocido",
                spectral: "Sin clasificar",
                desc: `Estrella registrada en el catálogo fotométrico Hipparcos (ID: ${intersects[i].index}). Requiere espectroscopía y registro oficial en el laboratorio.`
            });

            // Botón directo para catalogar esta estrella
            const btnContainer = document.getElementById('landing-btn-container');
            if (btnContainer) {
                btnContainer.innerHTML = `<button onclick="openCatalogModalForStar('${starName}', ${rawX}, ${rawY}, ${rawZ})" style="width:100%; margin-top:8px; background:linear-gradient(90deg, #ffd700, #ffaa00); border:none; color:#000; font-weight:bold; padding:8px; border-radius:4px; cursor:pointer; font-family:'Outfit',sans-serif;">🔬 CATALOGAR ESTA ESTRELLA (Añadir Nombre)</button>`;
            }

            controls.target.copy(pos);
            found = true;
            break;
        } else if (obj === window.milkyWaySphere) {
            const hitPoint = intersects[i].point;
            const rawX = ((hitPoint.x - 75) / 10).toFixed(2);
            const rawY = ((hitPoint.y - 75) / 10).toFixed(2);
            const rawZ = ((hitPoint.z - 75) / 10).toFixed(2);

            const starName = `Objeto Volumétrico (${rawX}, ${rawY}, ${rawZ})`;
            showLabPanel(starName, {
                type: "🌌 FUENTE GALÁCTICA NO CATALOGADA",
                dist: `${(hitPoint.distanceTo(solarSystem.position) * 3.26).toFixed(1)} ly`,
                mag: "-", temp: "-", mass: "Densidad local", radius: "-",
                desc: "Punto de emisión estelar no catalogado en la galaxia volumétrica. Puedes registrar este objeto e incorporarlo a la base de datos de descubrimientos del laboratorio."
            });

            const btnContainer = document.getElementById('landing-btn-container');
            if (btnContainer) {
                btnContainer.innerHTML = `<button onclick="openCatalogModalForStar('${starName}', ${rawX}, ${rawY}, ${rawZ})" style="width:100%; margin-top:8px; background:linear-gradient(90deg, #ffd700, #ffaa00); border:none; color:#000; font-weight:bold; padding:8px; border-radius:4px; cursor:pointer; font-family:'Outfit',sans-serif;">🔬 CATALOGAR / BAUTIZAR ESTA ESTRELLA</button>`;
            }
            found = true;
            break;
        } else if (obj === window.zoaGroup) {
            const hitPoint = intersects[i].point;
            const rawX = ((hitPoint.x - 75) / 10).toFixed(2);
            const rawY = ((hitPoint.y - 75) / 10).toFixed(2);
            const rawZ = ((hitPoint.z - 75) / 10).toFixed(2);

            const starName = `Anomalía ZOA (${rawX}, ${rawY}, ${rawZ})`;
            showLabPanel(starName, {
                type: "🔬 ESTRELLA SINTÉTICA (Zona de Evitación)",
                dist: `${(hitPoint.distanceTo(solarSystem.position) * 3.26).toFixed(1)} ly`,
                mag: "Oculta por polvo", temp: "-", mass: "Masa oculta extrapolada",
                desc: "Estrella extrapolada por el algoritmo cuántico DVTRGAS en la Zona de Evitación. Puedes asignarle un nombre e información formal."
            });

            const btnContainer = document.getElementById('landing-btn-container');
            if (btnContainer) {
                btnContainer.innerHTML = `<button onclick="openCatalogModalForStar('${starName}', ${rawX}, ${rawY}, ${rawZ})" style="width:100%; margin-top:8px; background:linear-gradient(90deg, #ffd700, #ffaa00); border:none; color:#000; font-weight:bold; padding:8px; border-radius:4px; cursor:pointer; font-family:'Outfit',sans-serif;">🔬 REGISTRAR ESTRELLA DE LA ZOA</button>`;
            }
            found = true;
            break;
        } else if (obj === window.cosmicWeb) {
            infoPanel.classList.remove('hidden');
            tName.textContent = `Macro-Estructura (Nodo ${intersects[i].index})`;
            document.getElementById('target-type').textContent = "RED CÓSMICA (MULTIVERSO)";
            document.getElementById('target-type').style.display = "block";
            document.getElementById('target-mass').textContent = "Súper-cúmulo Galáctico";
            document.getElementById('target-radius').textContent = "~100 Mly";
            document.getElementById('target-dist').textContent = "Escala Macroscópica";
            document.getElementById('target-mag').textContent = "-";
            document.getElementById('target-temp').textContent = "-";
            
            const pos = new THREE.Vector3();
            pos.fromBufferAttribute(obj.geometry.attributes.position, intersects[i].index);
            pos.applyMatrix4(obj.matrixWorld);
            controls.target.copy(pos);
            found = true;
            break;
        } else if (obj.parent === window.nebulaeGroup) {
            infoPanel.classList.remove('hidden');
            tName.textContent = `Nube Molecular (Bolsa de Gas)`;
            document.getElementById('target-type').textContent = "NEBULOSA VOLUMÉTRICA";
            document.getElementById('target-type').style.display = "block";
            document.getElementById('target-mass').textContent = "Gas y Polvo Estelar";
            document.getElementById('target-radius').textContent = "10 - 50 ly";
            document.getElementById('target-dist').textContent = "Dentro del Brazo Espiral";
            document.getElementById('target-mag').textContent = "-";
            document.getElementById('target-temp').textContent = "Gas Caliente";
            
            controls.target.copy(obj.position);
            found = true;
            break;
        }

        // SIMBAD Stars
        if (obj.userData && obj.userData.isSIMBAD && intersects[i].instanceId !== undefined) {
            const idx = intersects[i].instanceId;
            if (realStarsData && realStarsData[idx]) {
                const star = realStarsData[idx];
                infoPanel.classList.remove('hidden');
                
                // Calcular distancia en Años Luz (asumiendo sol en 75,75,75 y escala de 10 units = 1 ly)
                const sunPos = new THREE.Vector3(75, 75, 75);
                const starPos = new THREE.Vector3(star.x, star.y, star.z);
                const distUnits = sunPos.distanceTo(starPos);
                // Escala simulada para mostrar un número creíble en años luz
                const ly = (distUnits * 0.12).toFixed(1);
                
                tName.textContent = `${star.nombre} — ${ly} ly`;
                tMass.textContent = "Masa Estelar: " + star.masa.toFixed(2) + " M☉";
                
                let descType = "Estrella (Clasificación SIMBAD)";
                if (star.es_extrapolada) descType = "Anomalía Estelar Extrapolada (DVTRGAS Cuántico)";
                tRadius.textContent = "Clase Espectral: " + star.sp_type;

                const instMatrix = new THREE.Matrix4();
                obj.getMatrixAt(idx, instMatrix);
                const pos = new THREE.Vector3().setFromMatrixPosition(instMatrix);
                pos.applyMatrix4(obj.matrixWorld);
                
                const dummyTarget = new THREE.Object3D();
                dummyTarget.position.copy(pos);
                scene.add(dummyTarget);
                
                focusObject(dummyTarget, 50, star.nombre, descType, tMass.textContent, tRadius.textContent);
                found = true;
                break;
            }
        }
    }
    if (!found && !isLanded) infoPanel.classList.add('hidden');
});

// Terminal Console Logic
document.getElementById('console-input').addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        const cmd = e.target.value.toLowerCase().trim();
        const out = document.getElementById('console-output');
        out.innerHTML += `<div style="color:white;">TITAN$ ${cmd}</div>`;
        
        if (cmd === 'clear') {
            out.innerHTML = '';
        } else if (cmd.startsWith('speed')) {
            const num = parseFloat(cmd.split(' ')[1]);
            if(!isNaN(num)) {
                timeSpeed = num;
                document.getElementById('speed-slider').value = num * 10;
                document.getElementById('speed-display').innerText = num.toFixed(1) + 'x';
                out.innerHTML += `<div style="color:cyan;">> Time dilation set to ${num}x</div>`;
            }
        } else {
            out.innerHTML += `<div style="color:gray;">> ERR: Unknown kernel command</div>`;
        }
        
        out.scrollTop = out.scrollHeight;
        e.target.value = '';
    }
});

// Seguimiento de objetivo dinámico
let currentTarget = null;
let lastTargetPos = new THREE.Vector3();
let isLanded = false;
let landedTarget = null;
let landedTargetName = "";

// === SISTEMA DE VUELO Y CURVATURA (MASTER PLAN) ===
const debugDiv = document.createElement('div');
debugDiv.id = "debug-cam";
debugDiv.style.position = "absolute";
debugDiv.style.top = "10px";
debugDiv.style.left = "350px"; // Moverlo a la derecha de la consola para evitar solapamiento
debugDiv.style.color = "#00ff00";
debugDiv.style.fontFamily = "monospace";
debugDiv.style.pointerEvents = "none";
debugDiv.style.textShadow = "1px 1px 2px black";
document.body.appendChild(debugDiv);

const keys = { w: false, a: false, s: false, d: false, shift: false };
window.addEventListener('keydown', e => {
    if (e.key === 'w' || e.key === 'W') keys.w = true;
    if (e.key === 'a' || e.key === 'A') keys.a = true;
    if (e.key === 's' || e.key === 'S') keys.s = true;
    if (e.key === 'd' || e.key === 'D') keys.d = true;
    if (e.key === 'Shift') keys.shift = true;
});
window.addEventListener('keyup', e => {
    if (e.key === 'w' || e.key === 'W') keys.w = false;
    if (e.key === 'a' || e.key === 'A') keys.a = false;
    if (e.key === 's' || e.key === 'S') keys.s = false;
    if (e.key === 'd' || e.key === 'D') keys.d = false;
    if (e.key === 'Shift') keys.shift = false;
});

let warpActive = false;
let warpTargetCameraPos = new THREE.Vector3();
let warpTargetLookAt = new THREE.Vector3();
let warpStartCameraPos = new THREE.Vector3();
let warpStartLookAt = new THREE.Vector3();
let warpT = 0;
// timeSpeed ya fue declarada en la línea 634, no usamos let
timeSpeed = 5.0; 
let originalTimeSpeed = 5.0;
let time = 0;

let astroKnowledge = {};
let realStarsData = [];

// Fetch Knowledge Base
fetch('/api/knowledge').then(r => r.json()).then(data => {
    astroKnowledge = data;
}).catch(e => console.log("Knowledge fetch error", e));

const starsInstancedMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const starsInstancedGeo = new THREE.SphereGeometry(0.15, 4, 4);
let starsInstancedMesh = null;

// Fetch Galaxias/Estrellas Reales SIMBAD
fetch('/api/galaxias').then(r => r.json()).then(data => {
    realStarsData = data;
    starsInstancedMesh = new THREE.InstancedMesh(starsInstancedGeo, starsInstancedMat, data.length);
    const dmy = new THREE.Object3D();
    const c = new THREE.Color();
    
    for(let i=0; i<data.length; i++) {
        const star = data[i];
        dmy.position.set(star.x, star.y, star.z);
        
        let scale = 1.0;
        if (star.sp_type.includes('O')) { c.setHex(0x5555ff); scale = 2.5; }
        else if (star.sp_type.includes('B')) { c.setHex(0xaaaaff); scale = 1.8; }
        else if (star.sp_type.includes('A')) { c.setHex(0xffffff); scale = 1.5; }
        else if (star.sp_type.includes('F')) { c.setHex(0xffffcc); scale = 1.2; }
        else if (star.sp_type.includes('G')) { c.setHex(0xffff00); scale = 1.0; }
        else if (star.sp_type.includes('K')) { c.setHex(0xffaa00); scale = 0.8; }
        else if (star.sp_type.includes('M')) { c.setHex(0xff4400); scale = 0.5; }
        else { c.setHex(0xffffff); }
        
        dmy.scale.set(scale, scale, scale);
        dmy.updateMatrix();
        starsInstancedMesh.setMatrixAt(i, dmy.matrix);
        starsInstancedMesh.setColorAt(i, c);
    }
    starsInstancedMesh.instanceMatrix.needsUpdate = true;
    if (starsInstancedMesh.instanceColor) starsInstancedMesh.instanceColor.needsUpdate = true;
    
    starsInstancedMesh.userData = { isSIMBAD: true };
    scene.add(starsInstancedMesh);
}).catch(e => console.log("Galaxias fetch error", e));

// === ANIMACIÓN FLUIDA WEBGL ===
const tempV = new THREE.Vector3();

// Constantes de tiempo
const MS_PER_DAY = 86400000;

function animate() {
    requestAnimationFrame(animate);
    
    // Ejecutar tareas globales (ej. Animaciones DART)
    if (window.tasksToRun && window.tasksToRun.length > 0) {
        window.tasksToRun = window.tasksToRun.filter(task => task(0.016)); // approx 60fps delta
    }
    
    // Actualizar Reloj Cósmico (bidireccional: timeDirection = 1/-1/0)
    if (isLive) {
        engineTime = Date.now();
        cosmicOffset = 0;
    } else if (timeDirection !== 0) {
        // Avanza o retrocede a la velocidad seleccionada (timeSpeed) en la dirección correcta
        const msPerFrame = (1000 * 60 * 60 * 24) * timeSpeed * (1/60);
        engineTime += msPerFrame * timeDirection;
        cosmicOffset = engineTime - Date.now();
        // Actualizar slider si está en rango representable
        if (cosmicOffset >= -3153600000000 && cosmicOffset <= 3153600000000) {
            timeSlider.value = cosmicOffset;
        }
    }
    const daysSinceEpoch = engineTime / MS_PER_DAY;
    updateTimelineUI();
    
    // ⏱️ Actualizar estado evolutivo del universo según la era cósmica actual
    updateUniverseState(cosmicOffset);

    // === CÁMARA DE SEGUIMIENTO EN TIEMPO REAL A BÓLIDOS/OBJETOS EN MOVIMIENTO ===
    if (window.trackedObject && window.trackedObject.mesh && window.trackedObject.mesh.visible) {
        const worldPos = new THREE.Vector3();
        window.trackedObject.mesh.getWorldPosition(worldPos);
        controls.target.copy(worldPos);
        if (!warpActive) {
            const offset = new THREE.Vector3(5, 2.5, 6.5);
            const desiredCamPos = worldPos.clone().add(offset);
            camera.position.lerp(desiredCamPos, 0.15);
        }
    }

    // === TELEMETRÍA DINÁMICA DE DISTANCIA ESPACIAL EN VIVO ===
    const hudEarthPos = new THREE.Vector3(75, 75, 75);
    const targetPos = controls.target;
    const distEarthToTarget = hudEarthPos.distanceTo(targetPos);
    const distCamToTarget = camera.position.distanceTo(targetPos);

    const hudTargetName = document.getElementById('hud-target-name');
    const hudDistVal = document.getElementById('hud-dist-value');
    const hudCamVal = document.getElementById('hud-cam-dist-value');

    if (hudTargetName && hudDistVal && hudCamVal) {
        const targetTitle = document.getElementById('target-name');
        if (targetTitle && targetTitle.textContent && targetTitle.textContent !== "Objetivo") {
            hudTargetName.textContent = targetTitle.textContent;
        } else if (distEarthToTarget < 10) {
            hudTargetName.textContent = "Tierra / Sistema Solar";
        }

        // Formatear distancia real respecto a la Tierra
        let realDistStr = "";
        if (distEarthToTarget < 20) {
            realDistStr = "0.00 ly (0.00 UA)";
        } else if (distEarthToTarget < 2000) {
            const au = (distEarthToTarget / 200).toFixed(2);
            const km = ((distEarthToTarget / 200) * 149.6).toFixed(1);
            realDistStr = `${au} UA (${km}M km)`;
        } else {
            // Escala de Espacio Profundo / Galáctica
            const parsecs = distEarthToTarget / 10;
            const ly = parsecs * 3.26;
            if (ly >= 1000000) {
                realDistStr = `${(ly / 1000000000).toFixed(2)} Billones ly`;
            } else if (ly >= 1000) {
                realDistStr = `${(ly / 1000).toFixed(1)}k ly (${parsecs.toFixed(0)} pc)`;
            } else {
                realDistStr = `${ly.toFixed(1)} ly (${parsecs.toFixed(1)} pc)`;
            }
        }
        hudDistVal.textContent = realDistStr;
        hudCamVal.textContent = `${distCamToTarget.toFixed(0)} u`;
    }
    
    const delta = 0.002 * timeSpeed;
    time += delta;
    
    sun.rotation.y += 0.005 * timeSpeed;
    // Animación de Protuberancias Solares y Lenguas de Fuego 3D
    if (window.prominenceArcs && window.prominenceArcs.length > 0) {
        window.prominenceArcs.forEach((arc, idx) => {
            const pulse = 1.0 + Math.sin(time * arc.userData.speed + arc.userData.phase) * 0.25;
            arc.scale.set(pulse, pulse, pulse);
            if (arc.material) {
                arc.material.opacity = 0.5 + Math.sin(time * 3.5 + idx) * 0.35;
            }
        });
    }
    
    // Rotar Bóveda Celeste (Stellarium) según el Tiempo Sideral
    // Simulamos un giro galáctico muy lento + giro local
    if (skyboxSphere) {
        // Rotación lenta de fondo
        skyboxSphere.rotation.y = (engineTime / MS_PER_DAY) * 0.001;
    }
    
    // Rotar Discos de Acreción de Agujeros Negros en su plano ecuatorial
    if (sgrADisk) sgrADisk.rotation.y += 0.003 * timeSpeed * physicsAcc;
    extraSystems.children.forEach(sys => {
        if (sys.userData.isAccretion && sys.userData.disk) {
            sys.userData.disk.rotation.y += 0.003 * timeSpeed * physicsAcc;
        }
        if (sys.userData.bhLabel) {
            if (sys.visible && document.getElementById('toggle-blackholes').checked) {
                sys.getWorldPosition(tempV);
                tempV.project(camera);
                if (tempV.z < 1) {
                    const x = (tempV.x * 0.5 + 0.5) * window.innerWidth;
                    const y = (tempV.y * -0.5 + 0.5) * window.innerHeight;
                    sys.userData.bhLabel.style.left = (x + 15) + 'px';
                    sys.userData.bhLabel.style.top = (y - 15) + 'px';
                    sys.userData.bhLabel.style.display = 'block';
                } else {
                    sys.userData.bhLabel.style.display = 'none';
                }
            } else {
                sys.userData.bhLabel.style.display = 'none';
            }
        }
    });
    
    // Animar planetas y cometas (EPHEMÉRIDES KEPLERIANAS SIMPLIFICADAS)
    planets.forEach(p => {
        if (p.data && p.data.isMoon) return; // Las lunas orbitan dinámicamente dentro de p.moonOrbits en su planeta madre
        
        if (p.isComet) {
            // Órbita elíptica (cometa no está anclado a fecha real, usamos time para simplificar)
            const E = (time * p.speed) + p.phase;
            const x = p.a * (Math.cos(E) - p.e);
            const z = p.a * Math.sqrt(1 - p.e*p.e) * Math.sin(E);
            p.mesh.position.set(x, 0, z);
            
            // Generar cola apuntando lejos del Sol
            p.group.updateMatrix();
            const localPos = p.mesh.position.clone();
            localPos.applyMatrix4(p.group.matrix);
            
            const dir = localPos.clone().normalize();
            for(let i=0; i<300; i++) {
                const dist = Math.random() * 40;
                const spreadX = (Math.random()-0.5) * (dist * 0.1);
                const spreadY = (Math.random()-0.5) * (dist * 0.1);
                tailPoints[i*3] = localPos.x + dir.x * dist + spreadX;
                tailPoints[i*3+1] = localPos.y + dir.y * dist + spreadY;
                tailPoints[i*3+2] = localPos.z + dir.z * dist;
            }
            tailGeo.attributes.position.needsUpdate = true;
            
        } else {
            // PLANETAS: Posición Absoluta basada en engineTime y periodDays
            // 1 Año Terrestre = 365.25 días
            const orbitalAngle = (daysSinceEpoch / p.data.periodDays) * physicsG * Math.PI * 2 + p.data.phase;
            
            if (p.group) {
                p.group.rotation.y = orbitalAngle;
            }
            
            let px = Math.cos(orbitalAngle);
            let pz = Math.sin(orbitalAngle);
            let scale = applyTopologyScale(px, pz);
            
            // IMPORTANTE: El grupo "p.group" ya está rotando por 'orbitalAngle'.
            // Si ponemos x=cos y z=sin aquí, la doble rotación hace que Z siempre sea 0 (Alineación perfecta).
            // Por tanto, solo escalamos la X local y dejamos Z en 0, que es lo que hacía el código original.
            p.mesh.position.x = p.data.distance * scale;
            p.mesh.position.z = 0;
            if (p.atmos) {
                p.atmos.position.x = p.mesh.position.x;
                p.atmos.position.z = 0;
            }
            
            // Rotación sobre su propio eje (Día/Noche)
            // Asumimos un día estándar para simplificar, o giro rápido
            p.mesh.rotation.y = (daysSinceEpoch * Math.PI * 2) * (p.data.name === "Tierra" ? 1.0 : 0.5);
            
            if (p.atmos) p.atmos.rotation.y = p.mesh.rotation.y + (daysSinceEpoch * 0.1); // Nubes más rápidas
            
            // Rotar dinámicamente el enjambre de lunas
            if (p.moonOrbits) {
                p.moonOrbits.forEach(moon => {
                    moon.group.position.x = p.mesh.position.x;
                    moon.group.rotation.y = (daysSinceEpoch / moon.speed) * Math.PI * 2;
                });
            }
            
            // Planet Landing Mode: Detectar si la cámara entra en la atmósfera
            if (p.data) {
                const pWorld = new THREE.Vector3();
                p.mesh.getWorldPosition(pWorld);
                const distToCam = camera.position.distanceTo(pWorld);
                
                if (!isNaN(distToCam)) {
                    if (distToCam < p.data.radius * 4.0 && p.data.name !== "Mercurio") {
                        const fogDensity = Math.max(0, (p.data.radius * 4.0 - distToCam) / (p.data.radius * 4.0)) * 0.05;
                        if (!isNaN(fogDensity)) scene.fog = new THREE.FogExp2(p.data.color, fogDensity);
                        
                        if (!warpActive && distToCam < p.data.radius * 2.0) {
                            timeSpeed = originalTimeSpeed * 0.01; 
                        }
                    } else if (distToCam > p.data.radius * 4.0 && p.data.name === "Tierra") {
                        if (scene.fog) scene.fog.density = 0;
                    }
                }
            }
        }
        
        if (p.label) {
            p.mesh.getWorldPosition(tempV);
            tempV.project(camera);
            if (tempV.z > 1) {
                p.label.style.display = 'none'; // Detrás de la cámara
            } else {
                p.label.style.display = 'block';
                const x = (tempV.x * .5 + .5) * window.innerWidth;
                const y = (tempV.y * -.5 + .5) * window.innerHeight;
                p.label.style.transform = `translate(-50%, -150%) translate(${x}px,${y}px)`;
            }
        }

        if (p.satPoints) {
            p.satPoints.rotation.x += 0.005 * timeSpeed;
            p.satPoints.rotation.y += 0.02 * timeSpeed;
        }
        // Rotar telescopios
        if (p.hubbleOrbit) {
            p.hubbleOrbit.rotation.y += 0.2 * timeSpeed;
            p.hubbleOrbit.rotation.x += 0.1 * timeSpeed;
        }
        if (p.jwstOrbit) {
            // JWST orbita L2 muy lentamente
            p.jwstOrbit.rotation.y = (daysSinceEpoch / 180) * Math.PI * 2; 
        }
    });

    // Actualizar posiciones de etiquetas de Estrellas Nombradas (Constelaciones / SIMBAD)
    if (window.namedStars && window.namedStars.length > 0) {
        const starV = new THREE.Vector3();
        window.namedStars.forEach(s => {
            if (s.mesh && s.label) {
                s.mesh.getWorldPosition(starV);
                starV.project(camera);
                if (starV.z > 1) {
                    s.label.style.display = 'none';
                } else {
                    s.label.style.display = 'block';
                    const x = (starV.x * .5 + .5) * window.innerWidth;
                    const y = (starV.y * -.5 + .5) * window.innerHeight;
                    s.label.style.transform = `translate(-50%, -150%) translate(${x}px,${y}px)`;
                }
            }
        });
    }

    // Actualizar Telemetría de Telescopios
    if (window.telescopeLabels && earthObj) {
        const earthPos = new THREE.Vector3();
        earthObj.mesh.getWorldPosition(earthPos);
        window.telescopeLabels.forEach(t => {
            const pos = new THREE.Vector3();
            t.mesh.getWorldPosition(pos);
            const dist3D = pos.distanceTo(earthPos);
            // Simular perturbación orbital en km reales
            const orbitVariation = Math.sin(time) * (t.mesh.userData.realDistBase * 0.05); 
            const realKm = (t.mesh.userData.realDistBase + orbitVariation).toLocaleString('en-US', {maximumFractionDigits:0});
            
            t.div.innerHTML = `[${t.mesh.userData.name.split(' ')[0]}]<br/>Dist. a Tierra:<br/>${realKm} km`;
            
            const pos2D = pos.clone().project(camera);
            if (pos2D.z < 1) {
                const x = (pos2D.x * .5 + .5) * window.innerWidth;
                const y = (pos2D.y * -.5 + .5) * window.innerHeight;
                t.div.style.left = (x + 15) + 'px';
                t.div.style.top = (y - 15) + 'px';
                t.div.style.display = 'block';
            } else {
                t.div.style.display = 'none';
            }
        });
    }

    // Rotar el cinturón de asteroides muy lentamente
    if (window.asteroidBelt) {
        window.asteroidBelt.rotation.y = daysSinceEpoch / 2000;
    }

    // LERP Anomalías y Radar de Defensa Planetaria (NEOs reales)
    const earthPos = new THREE.Vector3();
    if (earthObj) earthObj.mesh.getWorldPosition(earthPos);
    
    meteorites.forEach(m => {
        if (m.mesh.visible && !m.isDestroyed) {
            // Mover a velocidad de deriva orbital constante hacia targetPos
            const dir = new THREE.Vector3().subVectors(m.targetPos, m.mesh.position);
            const dist = dir.length();
            if (dist > 1.0) {
                dir.normalize();
                const speed = 0.12 * timeSpeed * physicsAcc; // Velocidad dinámica de tránsito
                m.mesh.position.addScaledVector(dir, Math.min(speed, dist));
            } else {
                // Re-orientar vector de trayectoria a través del sistema solar
                const newDist = 80 + Math.random() * 160;
                const newAngle = Math.random() * Math.PI * 2;
                m.targetPos.set(Math.cos(newAngle) * newDist, (Math.random() - 0.5) * 40, Math.sin(newAngle) * newDist);
            }
            
            // Rotación tumboling sobre sus propios ejes 3D
            m.mesh.rotation.x += 0.015 * timeSpeed;
            m.mesh.rotation.y += 0.025 * timeSpeed;
            m.mesh.rotation.z += 0.008 * timeSpeed;
            
            // Actualizar etiqueta DOM proyectando coords 3D a 2D
            const mWorldPos = new THREE.Vector3();
            m.mesh.getWorldPosition(mWorldPos);
            
            if (m.labelDiv) {
                const pos2D = mWorldPos.clone().project(camera);
                if (pos2D.z < 1) { // Solo si está frente a la cámara
                    const x = (pos2D.x * .5 + .5) * window.innerWidth;
                    const y = (pos2D.y * -.5 + .5) * window.innerHeight;
                    m.labelDiv.style.left = (x + 10) + 'px';
                    m.labelDiv.style.top = (y - 10) + 'px';
                    m.labelDiv.style.display = 'block';
                } else {
                    m.labelDiv.style.display = 'none';
                }
            }
            
            // Línea de trayectoria predictiva Neón en coordenadas absolutas del mundo
            const targetWorldPos = m.targetPos.clone().add(new THREE.Vector3(75, 75, 75));
            const pts = new Float32Array([
                mWorldPos.x, mWorldPos.y, mWorldPos.z,
                targetWorldPos.x, targetWorldPos.y, targetWorldPos.z
            ]);
            m.traj.geometry.setAttribute('position', new THREE.BufferAttribute(pts, 3));
            m.traj.geometry.attributes.position.needsUpdate = true;
            m.traj.visible = true;
            
            // Encontrar el cuerpo celeste más cercano a la anomalía
            let closestBody = null;
            let minDistance = Infinity;
            
            // Chequear planetas
            planets.forEach(p => {
                if (p.data && p.data.name) {
                    const pWorld = new THREE.Vector3();
                    p.mesh.getWorldPosition(pWorld);
                    const dP = m.mesh.position.distanceTo(pWorld);
                    if (dP < minDistance) { minDistance = dP; closestBody = p.data.name; }
                }
            });
            // Chequear Sol
            const sunWorld = new THREE.Vector3();
            sun.getWorldPosition(sunWorld);
            const sunDist = m.mesh.position.distanceTo(sunWorld);
            if (sunDist < minDistance) { minDistance = sunDist; closestBody = "El Sol"; }

            // COLISIÓN E INCINERACIÓN EN EL SOL (Respawn automático en 3 segundos)
            if (sunDist < 22) {
                m.mesh.visible = false;
                m.traj.visible = false;
                if (m.labelDiv) m.labelDiv.style.display = 'none';
                if (!m.isDestroyed) {
                    const neoName = (m.mesh.userData && m.mesh.userData.name) ? m.mesh.userData.name : "Bólido NEO";
                    const out = document.getElementById('console-output');
                    if (out) {
                        out.innerHTML += `<div style="color:#ff5500; font-weight:bold; font-family:monospace; margin:4px 0;">> INCINERACIÓN SOLAR CONFIRMADA: El Bólido [${neoName}] ha colisionado contra la corona del Sol y se ha vaporizado.</div>`;
                        out.scrollTop = out.scrollHeight;
                    }
                    m.isDestroyed = true;
                    
                    // Respawn automático desprendiendo nuevo meteorito desde la nube exterior
                    setTimeout(() => {
                        const spawnDist = 180 + Math.random() * 80;
                        const spawnAngle = Math.random() * Math.PI * 2;
                        m.mesh.position.set(Math.cos(spawnAngle) * spawnDist, (Math.random() - 0.5) * 40, Math.sin(spawnAngle) * spawnDist);
                        m.targetPos.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 50);
                        m.mesh.visible = true;
                        m.isDestroyed = false;
                        m.isThreat = false;
                        setNEOColorAndEmissive(m, null, 0xffaa00);
                        if (m.traj) m.traj.material.color.setHex(0xffaa00);
                    }, 3000);
                }
                return;
            } else {
                m.isDestroyed = false;
            }

            // 1. Detección de Impacto Directo contra Planetas o Lunas
            let collidedPlanet = null;
            planets.forEach(p => {
                if (p.data && p.data.name && !collidedPlanet) {
                    const pWorld = new THREE.Vector3();
                    p.mesh.getWorldPosition(pWorld);
                    const dP = m.mesh.position.distanceTo(pWorld);
                    const planetR = p.data.radius || 4;
                    if (dP <= planetR * 1.5) {
                        collidedPlanet = { name: p.data.name, radius: planetR };
                    }
                }
            });

            if (collidedPlanet) {
                m.mesh.visible = false;
                m.traj.visible = false;
                if (m.labelDiv) m.labelDiv.style.display = 'none';
                if (!m.isDestroyed) {
                    const neoName = (m.mesh.userData && m.mesh.userData.name) ? m.mesh.userData.name : "Bólido NEO";
                    const craterKm = Math.floor(Math.random() * 120 + 15);
                    const megatons = Math.floor(Math.random() * 150000 + 30000);
                    const out = document.getElementById('console-output');
                    if (out) {
                        out.innerHTML += `<div style="border-left: 4px solid #ff0055; background: rgba(255,0,85,0.2); padding: 8px; margin: 8px 0; font-family: monospace; font-size: 11px; color: #fff;">
                            <span style="color:#ff0055; font-weight:bold; font-size:12px;">💥 IMPACTO PLANETARIO CONFIRMADO: [${neoName}] HA IMPACTADO CONTRA [${collidedPlanet.name.toUpperCase()}]</span><br/>
                            <span style="color:#ffaa88;">> ENERGÍA LIBERADA:</span> ${megatons.toLocaleString()} Megatones TNT<br/>
                            <span style="color:#ffaa88;">> CRÁTER DE IMPACTO FORMADO:</span> ${craterKm} km de diámetro<br/>
                            <span style="color:#ffaa88;">> EVALUACIÓN DE CONSECUENCIAS:</span> Inyección de aerosoles de azufre en la estratosfera, colapso de fotosíntesis y perturbación orbital sísmica.<br/>
                            <span style="color:#ff0055; font-weight:bold;">> ESTADO POST-IMPACTO:</span> EVENTO DE EXTINCIÓN CATACLÍSMICA NIVEL K-Pg REGISTRADO EN ${collidedPlanet.name.toUpperCase()}.
                        </div>`;
                        out.scrollTop = out.scrollHeight;
                    }
                    m.isDestroyed = true;
                    
                    // Respawn automático desprendiendo nuevo meteorito desde la nube exterior
                    setTimeout(() => {
                        const spawnDist = 180 + Math.random() * 80;
                        const spawnAngle = Math.random() * Math.PI * 2;
                        m.mesh.position.set(Math.cos(spawnAngle) * spawnDist, (Math.random() - 0.5) * 40, Math.sin(spawnAngle) * spawnDist);
                        m.targetPos.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 50);
                        m.mesh.visible = true;
                        m.isDestroyed = false;
                        m.isThreat = false;
                        setNEOColorAndEmissive(m, null, 0xffaa00);
                        if (m.traj) m.traj.material.color.setHex(0xffaa00);
                    }, 4000);
                }
                return;
            }

            // 2. Alarma de Proximidad e Intersección Orbital
            if (minDistance < 45) {
                setNEOColorAndEmissive(m, null, 0xff0000); // Peligro inminente
                m.traj.material.color.setHex(0xff0000);
                if (!m.isThreat) {
                    const neoName = (m.mesh.userData && m.mesh.userData.name) ? m.mesh.userData.name : "Bólido NEO";
                    const out = document.getElementById('console-output');
                    
                    // Cálculos de telemetría de impacto
                    const speed = 0.12 * timeSpeed;
                    const framesToImpact = minDistance / (speed > 0 ? speed : 0.12);
                    const simDaysToImpact = framesToImpact * (1/60);
                    const impactDate = new Date(engineTime + (simDaysToImpact * 24 * 60 * 60 * 1000));
                    const impactTimeStr = impactDate.toISOString().replace('T', ' ').substring(0, 19);
                    
                    const lat = (Math.random() * 180 - 90).toFixed(4);
                    const lon = (Math.random() * 360 - 180).toFixed(4);
                    const megatons = Math.floor(Math.random() * 80000 + 20000);
                    
                    if (out) {
                        out.innerHTML += `<div style="border-left: 3px solid red; padding: 6px; margin: 8px 0; background: rgba(255,0,0,0.15); font-family: monospace; font-size: 11px; line-height: 1.4; color:#fff;">
                            <span style="color:red; font-weight:bold; font-size: 12px;">> ALARMA CRÍTICA: [${neoName}] RUTA DE COLISIÓN INMINENTE CON [${closestBody.toUpperCase()}]</span><br/>
                            <span style="color:#ffaa88;">> ECUACIÓN DE INTERSECCIÓN:</span> <b>F = G(m₁m₂)/r² | Δv = ∫ a dt</b><br/>
                            <span style="color:#ffaa88;">> ZONA DE IMPACTO PROYECTADA:</span> LAT ${lat}°, LON ${lon}°<br/>
                            <span style="color:#ffaa88;">> HORARIO ESTIMADO DEL EVENTO (UTC):</span> ${impactTimeStr}<br/>
                            <span style="color:#ffaa88;">> ANÁLISIS DE IMPACTO Y CONSECUENCIAS:</span> Riesgo de Extinción Regional / Global. Disipación térmica: ${megatons.toLocaleString()} Megatones TNT.
                        </div>`;
                        out.scrollTop = out.scrollHeight;
                    }
                    m.isThreat = true;
                }
            } else {
                setNEOColorAndEmissive(m, null, 0xffaa00); // Naranja (Seguro)
                m.traj.material.color.setHex(0xffaa00);
                m.isThreat = false;
            }
        } else {
            m.traj.visible = false;
            if (m.labelDiv) m.labelDiv.style.display = 'none';
        }
    });

    // === MOTOR DE CURVATURA (WARP ENGINE) — Ease Cúbico Realista ===
    if (warpActive) {
        // Velocidad de avance del warp: 0.007 = ~2.2s a 60fps (cinemático)
        warpT = Math.min(1.0, warpT + 0.007);
        if (warpT >= 1.0) {
            warpActive = false;
            camera.fov = 75;
            camera.updateProjectionMatrix();
            timeSpeed = originalTimeSpeed;
        } else {
            // Ease-in-out cúbico: aceleración suave inicial, desaceleración suave al llegar
            const t = warpT;
            const ease = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
            
            // Compresión FOV mínima (distorsión de métrica Alcubierre leve)
            camera.fov = 75 + Math.sin(t * Math.PI) * 18;
            camera.updateProjectionMatrix();
            
            // Dilatación temporal (DVTRGAS)
            timeSpeed = originalTimeSpeed * (1 + Math.sin(t * Math.PI) * 12);
            
            // Interpolación de posición y target con curva cúbica
            camera.position.lerpVectors(warpStartCameraPos, warpTargetCameraPos, ease);
            controls.target.lerpVectors(warpStartLookAt, warpTargetLookAt, ease);
        }
    }

    // === ANIMACIÓN KEPLERIANA DE EXOPLANETAS ===
    // Orbita cada exoplaneta según su velocidad angular (T² ∝ a³)
    if (window.currentExoPlanets && window.currentExoPlanets.length > 0) {
        window.currentExoPlanets.forEach(p => {
            if (!p.parent) return; // Ya limpiado de la escena
            p.userData.orbitAngle += p.userData.orbitSpeed * timeSpeed;
            const a = p.userData.orbitAngle;
            const d = p.userData.orbitDist;
            p.position.set(Math.cos(a) * d, p.position.y, Math.sin(a) * d);
        });
    }
    // Animar lunas alrededor de sus planetas
    if (window.currentExoMoons && window.currentExoMoons.length > 0) {
        window.currentExoMoons.forEach(m => {
            if (!m.parent) return;
            m.userData.orbitAngle += m.userData.orbitSpeed * timeSpeed;
            const a = m.userData.orbitAngle;
            const d = m.userData.orbitDist;
            m.position.set(Math.cos(a) * d, m.position.y, Math.sin(a) * d);
        });
    }

    // Sistema de Vuelo Libre Desacoplado (WASD)
    let isMoving = keys.w || keys.a || keys.s || keys.d;
    if (isMoving && !warpActive) {
        controls.enabled = false; // Desacoplar cámara orbital
        currentTarget = null;
        let speed = keys.shift ? 80 : 15; // Velocidad sub-luz vs impulso
        if (document.getElementById('toggle-multiverse') && document.getElementById('toggle-multiverse').checked) {
            speed *= 50000; // Hyper-Warp: Velocidad multiversal absurda para cruzar vacíos entre burbujas
        }
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        
        const originalDir = dir.clone(); // Evitar mutar dir prematuramente
        
        if (keys.w) camera.position.addScaledVector(originalDir, speed);
        if (keys.s) camera.position.addScaledVector(originalDir, -speed);
        
        const right = new THREE.Vector3();
        right.crossVectors(originalDir, camera.up);
        if (right.lengthSq() > 0.0001) {
            right.normalize();
        } else {
            right.set(1, 0, 0);
        }
        
        if (keys.d) camera.position.addScaledVector(right, speed);
        if (keys.a) camera.position.addScaledVector(right, -speed);
        
        controls.target.copy(camera.position).add(originalDir.multiplyScalar(100));
    } else if (!warpActive) {
        controls.enabled = true; // Acoplamiento gravitatorio reanudado
        
        if (currentTarget) {
            const currentPos = new THREE.Vector3();
            currentTarget.getWorldPosition(currentPos);
            const deltaMove = new THREE.Vector3().subVectors(currentPos, lastTargetPos);
            camera.position.add(deltaMove);
            controls.target.copy(currentPos);
            lastTargetPos.copy(currentPos);
            
            if (isLanded && landedTarget) {
                // FÍSICA DE ATERRIZAJE (FPS Style Surface Camera)
                // Permitimos a OrbitControls gestionar la cámara con limits, aquí aplicamos solo FOG
                let surfaceRadius = 1;
                if (landedTarget.geometry && landedTarget.geometry.parameters.radius) {
                    surfaceRadius = landedTarget.geometry.parameters.radius;
                }
                const localSurfaceOffset = new THREE.Vector3(surfaceRadius + 0.1, 0, 0);
                localSurfaceOffset.applyEuler(landedTarget.rotation);
                const globalSurfacePos = currentPos.clone().add(localSurfaceOffset);
                
                const sunVec = new THREE.Vector3(0,0,0).sub(globalSurfacePos).normalize();
                const surfaceNormal = localSurfaceOffset.clone().normalize();
                const sunAngle = surfaceNormal.dot(sunVec);
                
                if (landedTargetName === "Marte") {
                    if (sunAngle > 0.1) { scene.fog = new THREE.FogExp2(0xcc6633, 0.08); scene.background = new THREE.Color(0xcc6633); if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(0xcc6633); }
                    else if (sunAngle > -0.1) { scene.fog = new THREE.FogExp2(0x3366cc, 0.05); scene.background = new THREE.Color(0x111122); if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(0x3366cc); }
                    else { scene.fog = null; scene.background = new THREE.Color(0x000000); if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(0x000000); }
                } else if (landedTargetName === "Tierra") {
                    if (sunAngle > 0.1) { scene.fog = new THREE.FogExp2(0x66aaff, 0.05); scene.background = new THREE.Color(0x66aaff); if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(0x66aaff); }
                    else if (sunAngle > -0.1) { scene.fog = new THREE.FogExp2(0xff8844, 0.06); scene.background = new THREE.Color(0xff8844); if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(0xff8844); }
                    else { scene.fog = null; scene.background = new THREE.Color(0x000000); if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(0x000000); }
                } else if (landedTargetName === "Venus") {
                    scene.fog = new THREE.FogExp2(0xffff88, 0.2);
                    scene.background = new THREE.Color(0xffff88);
                    if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(0xffff88);
                } else if (landedTarget && landedTarget.userData && landedTarget.userData.isExoplanet) {
                    const baseColor = landedTarget.userData.starColor || 0xffffff;
                    const r = (baseColor >> 16) & 255;
                    const g = (baseColor >> 8) & 255;
                    const b = baseColor & 255;
                    const sunsetColor = (r << 16) | (Math.floor(g*0.5) << 8) | Math.floor(b*0.5); 
                    
                    if (sunAngle > 0.1) { 
                        scene.fog = new THREE.FogExp2(baseColor, 0.05); 
                        scene.background = new THREE.Color(baseColor); 
                        if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(baseColor); 
                    } else if (sunAngle > -0.1) { 
                        scene.fog = new THREE.FogExp2(sunsetColor, 0.08); 
                        scene.background = new THREE.Color(sunsetColor); 
                        if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(sunsetColor); 
                    } else { 
                        scene.fog = null; 
                        scene.background = new THREE.Color(0x000000); 
                        if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(0x000000); 
                    }
                } else {
                    scene.fog = null;
                    scene.background = new THREE.Color(0x000000);
                    if(window.skyDome) window.skyDome.material.uniforms.bottomColor.value.setHex(0x000000);
                }
            }
        }
    }
    
    // SAFEGUARD: Si la cámara o el target es NaN, resetear
    if (isNaN(camera.position.x) || isNaN(camera.position.y) || isNaN(camera.position.z) ||
        isNaN(controls.target.x) || isNaN(controls.target.y) || isNaN(controls.target.z)) {
        camera.position.set(75, 20, 150);
        controls.target.set(0,0,0);
        if (scene.fog) scene.fog.density = 0;
    }
    
    // Transición suave entre Sistema Local (Skybox) y Macro-Universo (Red Cósmica)
    const distFromCenter = camera.position.length();
    if (window.milkyWaySphere) {
        if (distFromCenter > 50000) {
            // Fade out progresivo entre 50,000 y 90,000 unidades
            const fade = Math.max(0, 1.0 - (distFromCenter - 50000) / 40000);
            window.milkyWaySphere.material.opacity = fade * 0.7;
        } else {
            window.milkyWaySphere.material.opacity = 0.7;
        }
    }
    
    // Debug camera
    if (document.getElementById('debug-cam')) {
        document.getElementById('debug-cam').innerHTML = 
            `CAM: ${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)}<br>` +
            `TGT: ${controls.target.x.toFixed(1)}, ${controls.target.y.toFixed(1)}, ${controls.target.z.toFixed(1)}<br>` +
            `FOG: ${scene.fog ? scene.fog.density.toFixed(4) : 0}`;
    }
    
    
    // Calcular Lente Gravitacional si hay agujeros negros cerca
    let bhDetected = false;
    extraSystems.children.forEach(sys => {
        if (sys.userData.isBlackHole && !bhDetected) {
            const bhPos = new THREE.Vector3();
            sys.getWorldPosition(bhPos);
            const dist = camera.position.distanceTo(bhPos);
            if (dist < 300) {
                bhPos.project(camera);
                // Si está frente a la cámara
                if (bhPos.z < 1.0) {
                    bhDetected = true;
                    titanPass.uniforms["bhPosScreen"].value.set((bhPos.x + 1)/2, (bhPos.y + 1)/2);
                    // Intensidad aumenta al acercarse
                    const intensity = Math.max(0, 1.0 - (dist / 300));
                    titanPass.uniforms["bhActive"].value = intensity;
                    // Dilatación temporal de DVTRGAS (Ralentizar tiempo matemático)
                    if (dist < 100 && !warpActive) {
                        timeSpeed = originalTimeSpeed * (dist / 100);
                    }
                }
            }
        }
    });
    if (!bhDetected) titanPass.uniforms["bhActive"].value = 0.0;
    
    // Shader Uniforms de Tiempo y Física
    if (!isNaN(time)) titanPass.uniforms["time"].value = time * 5.0;
    else titanPass.uniforms["time"].value = 0.0;
    
    // Desactivar el efecto gelatina (Warp) si estamos en Street View o si el usuario lo apagó
    const warpToggle = document.getElementById('toggle-warp-effect');
    if (isLanded || (warpToggle && !warpToggle.checked)) {
        titanPass.uniforms["swarmIntensity"].value = 0.0;
    } else {
        titanPass.uniforms["swarmIntensity"].value = 0.005 * physicsWarp;
    }
    
    // Rotar sondas desplegadas
    if (window.deployedProbes) {
        window.deployedProbes.forEach(probe => {
            if (probe.mesh && probe.mesh.userData.isProbe) {
                probe.mesh.rotation.x += probe.mesh.userData.rotationSpeed.x * timeSpeed;
                probe.mesh.rotation.y += probe.mesh.userData.rotationSpeed.y * timeSpeed;
                probe.mesh.rotation.z += probe.mesh.userData.rotationSpeed.z * timeSpeed;
            }
        });
    }

    // SAFEGUARD: Desactivar TitanPass si falla
    try {
        if (controls.enabled) controls.update();
        composer.render();
    } catch (e) {
        renderer.render(scene, camera); // Fallback a render raw si composer falla
    }
}
animate();

// HUD NASA
const panel = document.getElementById('info-panel');
document.getElementById('view-sun').addEventListener('click', (e) => { 
    e.preventDefault(); 
    setDeepSpaceMode(false); // Restore layers
    focusObject(sun, 40, "El Sol", "Centro del Sistema", "1.989 × 10^30 kg", "696,340 km"); 
});
document.getElementById('view-earth').addEventListener('click', (e) => { 
    e.preventDefault(); 
    setDeepSpaceMode(false); // Restore layers
    const pTierra = planets.find(p => p.data && p.data.name === "Tierra");
    if(pTierra) focusObject(pTierra.mesh, 15, "Tierra", "Planeta habitado", "5.972 × 10^24 kg", "6,371 km"); 
});
document.getElementById('view-deepspace').addEventListener('click', (e) => {
    e.preventDefault();
    currentTarget = null;
    // Alejar muchísimo la cámara para ver la Vía Láctea completa
    // Enfocamos hacia el centro galáctico
    camera.position.set(75 - 2500, 6000, 75 - 1500 + 5000);
    controls.target.set(75 - 2500, 75, 75 - 1500);
    panel.classList.add('hidden');
    
    // Set Deep Space Mode
    setDeepSpaceMode(true);
});

function setDeepSpaceMode(active) {
    const setToggle = (id, checked) => {
        const el = document.getElementById(id);
        if (el && el.checked !== checked) {
            el.checked = checked;
            el.dispatchEvent(new Event('change'));
        }
    };
    
    if (active) {
        logTitan("Activando Modo Espacio Profundo Real: Apagando simulaciones matemáticas...");
        setToggle('toggle-orbits', false);
        setToggle('toggle-grid', false);
        setToggle('toggle-meteors', false);
        setToggle('toggle-warp-effect', false);
        
        if (typeof hipparcosGroup !== 'undefined') {
            hipparcosGroup.children.forEach(c => {
                if (c.type === "LineSegments") c.visible = false;
            });
        }
        if (typeof bloomPass !== 'undefined') bloomPass.strength = 0.05;
        document.getElementById('slider-warp').value = 0;
        physicsWarp = 0;
    } else {
        logTitan("Restaurando HUD de Laboratorio Físico...");
        setToggle('toggle-orbits', true);
        setToggle('toggle-grid', true);
        setToggle('toggle-meteors', true);
        setToggle('toggle-warp-effect', true);
        
        if (typeof hipparcosGroup !== 'undefined') {
            hipparcosGroup.children.forEach(c => {
                if (c.type === "LineSegments") c.visible = true;
            });
        }
        if (typeof bloomPass !== 'undefined') bloomPass.strength = 0.3;
        document.getElementById('slider-warp').value = 100;
        physicsWarp = 1.0;
    }
}

function focusObject(object, dist, name, desc, mass, rad) {
    currentTarget = object;
    
    // === FIX MATERIALIZACIÓN Y GESTIÓN DE CAPAS VISIBLES ===
    const systemNames = ["Sol", "Mercurio", "Venus", "Tierra", "La Luna", "Marte", "Ceres", "Júpiter", "Saturno", "Urano", "Neptuno", "Plutón", "Haumea", "Makemake", "Eris", "Apophis", "Bennu", "'Oumuamua"];
    
    if (systemNames.some(s => name.includes(s))) {
        if (typeof solarSystem !== 'undefined') solarSystem.visible = true;
        if (typeof currentExoSystem !== 'undefined' && currentExoSystem) {
            scene.remove(currentExoSystem);
            currentExoSystem = null;
        }
    } else if (object.userData && object.userData.isExtraSystem) {
        if (typeof generateStarSystem === 'function') {
            generateStarSystem(name, object.userData.spectralColor);
            if (currentExoSystem) currentExoSystem.position.copy(object.position);
        }
        if (typeof solarSystem !== 'undefined') solarSystem.visible = false;
    }

    // Forzar materialización del objeto 3D
    object.traverse((child) => {
        if (child.isMesh && child.material) {
            child.visible = true;
            child.material.needsUpdate = true;
        }
    });

    const pos = new THREE.Vector3();
    object.getWorldPosition(pos);
    lastTargetPos.copy(pos);
    
    // Motor de Curvatura (Warp Drive)
    warpActive = true;
    warpT = 0;
    warpStartCameraPos.copy(camera.position);
    warpStartLookAt.copy(controls.target);
    warpTargetCameraPos.copy(pos).add(new THREE.Vector3(dist, dist * 0.25, dist));
    warpTargetLookAt.copy(pos);
    originalTimeSpeed = document.getElementById('speed-slider').value / 10;
    
    const out = document.getElementById('console-output');
    if (out) {
        out.innerHTML += `<div style="color:#7a9e6a;">> TITAN: MOTOR WARP ACTIVADO. Materializando [${name}]</div>`;
        out.scrollTop = out.scrollHeight;
    }
    
    // Panel de Laboratorio Científico
    showLabPanel(name, { desc: desc, mass: mass, radius: rad });
    
    const dartBtn = document.getElementById('btn-launch-dart');
    if (dartBtn) {
        dartBtn.style.display = (name.includes('NEO-') || name === 'Apophis' || name === 'Bennu') ? 'block' : 'none';
    }
    
    // Datos NASA legacy (astroKnowledge)
    if (typeof astroKnowledge !== 'undefined' && astroKnowledge[name]) {
        const k = astroKnowledge[name];
        if (k.descripcion && !COSMIC_DB[name]) {
            document.getElementById('target-desc').textContent = k.descripcion;
        }
        if (k.imagen_url) {
            const imgEl = document.getElementById('target-image');
            if (imgEl && imgEl.style.display === 'none') {
                imgEl.src = k.imagen_url;
                imgEl.style.display = 'block';
            }
        }
    }

    // Consulta NASA Image API
    if (window.fetchNasaImageData) {
        window.fetchNasaImageData(name);
    }

    // Botón de Aterrizaje Planetario
    const btnContainer = document.getElementById('landing-btn-container');
    if (btnContainer) {
        if (["Tierra", "Marte", "Mercurio", "Venus", "Júpiter", "Saturno", "Urano", "Neptuno", "La Luna", "Fobos", "Deimos"].includes(name) || (object.userData && object.userData.isExoplanet)) {
            btnContainer.innerHTML = `<button id="btn-land" style="width:100%; padding:10px; background:rgba(0,255,0,0.4); border:1px solid lime; color:white; cursor:pointer; border-radius:5px; font-weight:bold; font-size:1.1rem; text-shadow:0 0 5px lime;">🔥 ATERRIZAR EN SUPERFICIE</button>`;
            document.getElementById('btn-land').addEventListener('click', () => landOn(object, name));
        } else {
            btnContainer.innerHTML = "";
        }
    }

    panel.classList.remove('hidden');
}

// ============================================================================
// 🚀 MOTOR DE TOURS GUIADOS COSMOLÓGICOS INTERACTIVOS
// ============================================================================
const COSMIC_TOURS = {
    solarsystem: {
        category: "🪐 TOUR SISTEMA SOLAR E INTERCEPTOR DART",
        steps: [
            { name: "Sol", dist: 50, desc: "El centro gravitacional de nuestro sistema. Estrella de secuencia principal tipo G2V." },
            { name: "Mercurio", dist: 12, desc: "El planeta más cercano al Sol. Superficie repleta de cráteres de impacto." },
            { name: "Venus", dist: 16, desc: "Efecto invernadero descontrolado con presiones superficiales aplastantes." },
            { name: "Tierra", dist: 18, desc: "Nuestro hogar planetario con océanos de agua líquida y atmósfera protectora." },
            { name: "Marte", dist: 15, desc: "El planeta rojo. Objetivo principal para la exploración humana y terraformación." },
            { name: "Júpiter", dist: 40, desc: "El gigante gaseoso más masivo del sistema con su Gran Mancha Roja." },
            { name: "Saturno", dist: 35, desc: "Espectacular sistema de anillos glaciales y lunas complejas." },
            { name: "Apophis", dist: 10, desc: "Asteroide NEO de defensa planetaria. Objetivo del interceptor DART." }
        ]
    },
    blackholes: {
        category: "🕳️ TOUR AGUJEROS NEGROS SUPERMASIVOS",
        steps: [
            { name: "Sgr A*", dist: 60, desc: "El agujero negro supermasivo en el corazón galáctico de la Vía Láctea (4.1M masas solares)." },
            { name: "M87*", dist: 80, desc: "El primer agujero negro fotografiado en la historia. Emite un jet relativista masivo." },
            { name: "TON 618", dist: 120, desc: "El monstruo del cosmos: agujero negro ultramasivo de 66.000 millones de masas solares." }
        ]
    },
    stars: {
        category: "🌟 TOUR ESTRELLAS Y CUNAS ESTELARES",
        steps: [
            { name: "Sirius A (Alfa Canis Majoris)", dist: 25, desc: "La estrella más brillante del cielo nocturno terrestre en la constelación del Can Mayor." },
            { name: "Betelgeuse (Alfa Orionis)", dist: 40, desc: "Supergigante roja moribunda en Orión a punto de convertirse en supernova." },
            { name: "Rigel (Beta Orionis)", dist: 35, desc: "Supergigante azul ultrapotente en el pie de Orión." },
            { name: "Vega (Alfa Lyrae)", dist: 25, desc: "Estrella blanca emblemática de la constelación de la Lira." },
            { name: "Nebulosa Orión", dist: 60, desc: "Región de formación estelar masiva y cuna de nuevos sistemas exoplanetarios." },
            { name: "Nebulosa del Cangrejo", dist: 50, desc: "Remanente de la supernova de 1054 d.C. con un púlsar girando en su interior." }
        ]
    }
};

let currentTour = null;
let currentTourIndex = 0;
let tourTimer = null;
let isTourPaused = false;

function startCosmicTour(tourKey) {
    if (!COSMIC_TOURS[tourKey]) return;
    currentTour = COSMIC_TOURS[tourKey];
    currentTourIndex = 0;
    isTourPaused = false;

    // Menú dropdown auto-hide
    const drop = document.getElementById('tours-dropdown');
    if (drop) drop.style.display = 'none';

    // HUD reproductor show
    const hud = document.getElementById('tour-hud-player');
    if (hud) hud.style.display = 'block';

    const btnPause = document.getElementById('btn-tour-pause');
    if (btnPause) btnPause.textContent = "⏸ Pausar";

    logTitan(`🚀 Iniciando ${currentTour.category}...`);
    executeTourStep();
}

function executeTourStep() {
    if (!currentTour || !currentTour.steps[currentTourIndex]) return;
    const step = currentTour.steps[currentTourIndex];

    // Actualizar HUD reproductor
    document.getElementById('tour-category-title').textContent = currentTour.category;
    document.getElementById('tour-step-title').textContent = `Destino ${currentTourIndex + 1}/${currentTour.steps.length}: ${step.name}`;
    document.getElementById('tour-step-desc').textContent = step.desc;

    // Buscar objeto por nombre
    let targetMesh = null;
    
    // Buscar en Planetas
    const pFound = planets.find(p => p.data && p.data.name.includes(step.name));
    if (pFound) targetMesh = pFound.mesh;
    
    // Buscar en Sol
    if (!targetMesh && step.name === "Sol") targetMesh = typeof sun !== 'undefined' ? sun : null;

    // Buscar en Estrellas Nombradas / SIMBAD
    if (!targetMesh && window.namedStars) {
        const sFound = window.namedStars.find(s => s.mesh && s.mesh.userData && s.mesh.userData.name.includes(step.name));
        if (sFound) targetMesh = sFound.mesh;
    }

    // Buscar en Agujeros Negros o Nebulosas en COSMIC_DB
    if (!targetMesh) {
        // Crear dummy en posición o usar origen
        const dummy = new THREE.Object3D();
        if (step.name === "Sgr A*") dummy.position.set(75, 75, 75);
        else dummy.position.set(150, 75, -200);
        targetMesh = dummy;
    }

    // Saltar con el Motor Warp hacia el objetivo
    if (targetMesh) {
        focusObject(targetMesh, step.dist, step.name, step.desc, "-", "-");
    }

    // Reiniciar temporizador para avanzar automáticamente en 10 segundos si no está pausado
    clearTimeout(tourTimer);
    if (!isTourPaused) {
        tourTimer = setTimeout(() => {
            if (!isTourPaused) nextTourStep();
        }, 12000);
    }
}

function nextTourStep() {
    if (!currentTour) return;
    currentTourIndex++;
    if (currentTourIndex >= currentTour.steps.length) {
        currentTourIndex = 0; // Bucle continuo o final
    }
    executeTourStep();
}

function prevTourStep() {
    if (!currentTour) return;
    currentTourIndex--;
    if (currentTourIndex < 0) {
        currentTourIndex = currentTour.steps.length - 1;
    }
    executeTourStep();
}

function toggleTourPause() {
    isTourPaused = !isTourPaused;
    const btnPause = document.getElementById('btn-tour-pause');
    if (btnPause) {
        btnPause.textContent = isTourPaused ? "▶ Reanudar" : "⏸ Pausar";
        btnPause.style.background = isTourPaused ? "rgba(0,255,204,0.2)" : "rgba(255,215,0,0.2)";
        btnPause.style.borderColor = isTourPaused ? "#00ffcc" : "#ffd700";
        btnPause.style.color = isTourPaused ? "#00ffcc" : "#ffd700";
    }
    if (isTourPaused) {
        clearTimeout(tourTimer);
        logTitan("⏸ Tour pausado por el usuario.");
    } else {
        logTitan("▶ Reanudando Tour...");
        executeTourStep();
    }
}

function stopCosmicTour() {
    clearTimeout(tourTimer);
    currentTour = null;
    isTourPaused = false;
    const hud = document.getElementById('tour-hud-player');
    if (hud) hud.style.display = 'none';
    logTitan("✕ Tour guiado finalizado.");
}

// Toggle para el menú dropdown de tours en el navbar
document.addEventListener('DOMContentLoaded', () => {
    const btnToursMenu = document.getElementById('btn-tours-menu');
    const toursDropdown = document.getElementById('tours-dropdown');
    if (btnToursMenu && toursDropdown) {
        btnToursMenu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toursDropdown.style.display = toursDropdown.style.display === 'none' ? 'block' : 'none';
        });
        document.addEventListener('click', () => {
            toursDropdown.style.display = 'none';
        });
    }
});

let streetViewSphere = null;

// === PRNG (Pseudo-Random Number Generator) ===
function seededRandom(seed) {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

// === GENERADOR PROCEDURAL DE EXOSISTEMAS ===
let currentExoSystem = null;

function generateStarSystem(starID, spectralColor) {
    // Si ya existe un exosistema, lo limpiamos
    if (currentExoSystem) {
        scene.remove(currentExoSystem);
        currentExoSystem = null;
    }
    
    // Limpiar registro de exoplanetas animados
    window.currentExoPlanets = [];
    window.currentExoMoons = [];

    
    currentExoSystem = new THREE.Group();
    scene.add(currentExoSystem);
    
    // Semilla basada en el ID (hash simple si es string)
    let seed = 0;
    for(let i = 0; i < starID.toString().length; i++) seed += starID.toString().charCodeAt(i) * Math.pow(10, i);
    
    // 🌟 Crear la estrella central del exosistema en (0,0,0)
    const starColorHex = spectralColor || 0x4488ff;
    const centralStarGeo = new THREE.SphereGeometry(15, 32, 32);
    const centralStarMat = new THREE.MeshBasicMaterial({ color: starColorHex });
    const centralStarMesh = new THREE.Mesh(centralStarGeo, centralStarMat);
    centralStarMesh.userData = { name: starID, mass: "Estrella Central", radius: "Fotosfera Estelar" };
    currentExoSystem.add(centralStarMesh);

    // Halo luminoso exterior
    const glowGeo = new THREE.SphereGeometry(25, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({ color: starColorHex, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending });
    centralStarMesh.add(new THREE.Mesh(glowGeo, glowMat));

    // Luz puntual de la estrella
    const starLight = new THREE.PointLight(starColorHex, 2.5, 2000);
    currentExoSystem.add(starLight);
    
    // Cuántos planetas tendrá esta estrella? (2 a 6)
    let numPlanets = Math.floor(seededRandom(seed++) * 5) + 2;
    
    for (let i = 0; i < numPlanets; i++) {
        let isGasGiant = seededRandom(seed++) > 0.6; // 40% gigantes gaseosos
        let pRadius = isGasGiant ? (seededRandom(seed++) * 4 + 3) : (seededRandom(seed++) * 1.8 + 0.8);
        let pDist = 35 + (i + 1) * 25 + seededRandom(seed++) * 15;
        let pPeriod = pDist * (seededRandom(seed++) * 2 + 1);
        
        // Ángulo orbital inicial aleatorio para NO alinear los planetas en fila recta
        let initAngle = seededRandom(seed++) * Math.PI * 2;
        let orbitInc = (seededRandom(seed++) - 0.5) * 0.55; // Inclinación orbital variada (±31°)

        let rColor = Math.floor(seededRandom(seed++) * 200 + 55);
        let gColor = Math.floor(seededRandom(seed++) * 200 + 55);
        let bColor = Math.floor(seededRandom(seed++) * 200 + 55);
        let pColor = (rColor << 16) | (gColor << 8) | bColor;
        
        const orbitGroup = new THREE.Group();
        orbitGroup.rotation.x = orbitInc;
        currentExoSystem.add(orbitGroup);
        
        const pGeo = new THREE.SphereGeometry(pRadius, 32, 32);
        const pMat = new THREE.MeshStandardMaterial({ 
            color: pColor, 
            roughness: isGasGiant ? 0.3 : 0.85,
            metalness: 0.1
        });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        
        // Posicionar en su ángulo orbital único alrededor de la estrella
        pMesh.position.set(Math.cos(initAngle) * pDist, 0, Math.sin(initAngle) * pDist);
        
        pMesh.userData = { 
            name: `${starID} - Exoplaneta ${i+1}${isGasGiant ? ' (Gaseoso)' : ' (Rocoso)'}`,
            isExoplanet: true,
            isGasGiant: isGasGiant,
            dist: pDist,
            period: pPeriod,
            angle: initAngle,
            // === ANIMACIÓN KEPLERIANA ===
            orbitAngle: initAngle,
            orbitDist: pDist,
            // Ley de Kepler: T² ∝ a³ → velocidad ∝ 1/√a
            orbitSpeed: 0.00028 / Math.sqrt(pDist)
        };
        orbitGroup.add(pMesh);
        // Registrar para animación en el bucle animate()
        window.currentExoPlanets.push(pMesh);
        
        // Lunas ordenadas orbitando alrededor del propio planeta (como hijas de pMesh)
        let numMoons = isGasGiant ? Math.floor(seededRandom(seed++) * 3) + 1 : (seededRandom(seed++) > 0.7 ? 1 : 0);
        for(let m = 0; m < numMoons; m++) {
            let mRadius = pRadius * 0.25;
            let mDist = pRadius * 2.2 + m * 2.5;
            let mAngle = seededRandom(seed++) * Math.PI * 2;
            
            const mGeo = new THREE.SphereGeometry(mRadius, 16, 16);
            const mMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 });
            const mMesh = new THREE.Mesh(mGeo, mMat);
            
            // Posición relativa al planeta
            mMesh.position.set(Math.cos(mAngle) * mDist, 0, Math.sin(mAngle) * mDist);
            mMesh.userData = { 
                name: `${starID} - Exoplaneta ${i+1} Luna ${m+1}`,
                orbitAngle: mAngle,
                orbitDist: mDist,
                orbitSpeed: 0.0012 / Math.sqrt(mDist)
            };
            pMesh.add(mMesh);
            window.currentExoMoons.push(mMesh);
        }
        
        // Dibujar línea de órbita circular
        const oGeo = new THREE.BufferGeometry();
        const pts = [];
        for (let j = 0; j <= 64; j++) {
            let a = (j / 64) * Math.PI * 2;
            pts.push(Math.cos(a) * pDist, 0, Math.sin(a) * pDist);
        }
        oGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        const oMat = new THREE.LineBasicMaterial({ color: starColorHex, transparent: true, opacity: 0.15 });
        const oLine = new THREE.Line(oGeo, oMat);
        orbitGroup.add(oLine);
    }
}

function landOn(object, name) {
    isLanded = true;
    landedTarget = object;
    landedTargetName = name;
    
    // Calcular posición para situar la cámara en la superficie (Polo Norte del planeta para evitar rotación brusca)
    const pWorld = new THREE.Vector3();
    object.getWorldPosition(pWorld);
    
    // Radio del planeta
    const radius = object.geometry.parameters.radius;
    
    // Aislar la vista: Ya NO ocultamos el sistema solar, es un Planetario real.
    // Solo detenemos el seguimiento orbital estándar
    currentTarget = null; 
    
    // Configurar cámara 1ª Persona (sobre la superficie)
    // Usamos radius * 1.1 para asegurar que no clipeamos a través de la geometría del planeta
    const safeRadius = radius * 1.1; 
    camera.position.set(pWorld.x, pWorld.y + safeRadius, pWorld.z);
    
    // Fijar el objetivo de la cámara un poco hacia adelante (horizonte)
    controls.target.set(pWorld.x + 10, pWorld.y + safeRadius, pWorld.z);
    
    // Limitar el zoom para que el usuario solo pueda "mirar alrededor" (Mouse Look)
    controls.minDistance = 0.01;
    controls.maxDistance = 0.01;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.update();
    
    // Crear suelo planetario a escala (Horizonte curvo)
    if (window.surfaceGround) { scene.remove(window.surfaceGround); }
    
    // Esfera colosal para simular curvatura
    const gRadius = 4000;
    const geo = new THREE.SphereGeometry(gRadius, 128, 128);
    const posAttr = geo.attributes.position;
    
    // Generar relieve topográfico procedural (Montañas y cráteres)
    for (let i = 0; i < posAttr.count; i++) {
        const px = posAttr.getX(i);
        const py = posAttr.getY(i);
        const pz = posAttr.getZ(i);
        // Ruido fractal simple basado en posición (desplazamiento sobre el radio normalizado)
        const noise = Math.sin(px * 0.005) * Math.cos(pz * 0.005) * 40 + Math.sin(px * 0.02 + pz * 0.01) * 15;
        const vertex = new THREE.Vector3(px, py, pz).normalize().multiplyScalar(gRadius + noise);
        posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    
    const mat = new THREE.MeshStandardMaterial({ 
        color: (object.material && object.material.color) ? object.material.color : 0xaaaaaa, 
        roughness: 0.9,
        metalness: 0.1
    });
    
    window.surfaceGround = new THREE.Mesh(geo, mat);
    // Posicionar la enorme esfera justo debajo de la cámara para que el Polo Norte quede en los pies
    window.surfaceGround.position.set(pWorld.x, pWorld.y - gRadius, pWorld.z);
    scene.add(window.surfaceGround);
    
    // Cúpula atmosférica (SkyDome) dinámica
    if (window.skyDome) { scene.remove(window.skyDome); }
    
    let atmosColor = new THREE.Color(0x000000);
    let atmosAlpha = 0.0; // Vacío (Luna, asteroides) por defecto
    
    if (name === "Tierra") { atmosColor.setHex(0x55aaff); atmosAlpha = 1.0; }
    else if (name === "Marte") { atmosColor.setHex(0xcc6633); atmosAlpha = 0.95; }
    else if (name === "Venus") { atmosColor.setHex(0xeeaa55); atmosAlpha = 1.0; }
    else if (name === "Júpiter" || name === "Saturno") { atmosColor.setHex(0xccaabb); atmosAlpha = 1.0; }
    else if (name === "Urano" || name === "Neptuno") { atmosColor.setHex(0x4466ff); atmosAlpha = 1.0; }
    
    const skyGeo = new THREE.SphereGeometry(gRadius + 500, 32, 32);
    const skyMat = new THREE.ShaderMaterial({
        uniforms: {
            topColor: { value: new THREE.Color(0x000000) },
            bottomColor: { value: atmosColor },
            offset: { value: 33 },
            exponent: { value: 0.6 },
            maxAlpha: { value: atmosAlpha }
        },
        vertexShader: `
            varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            uniform float maxAlpha;
            varying vec3 vWorldPosition;
            void main() {
                float h = normalize(vWorldPosition + offset).y;
                float factor = max(pow(max(h, 0.0), exponent), 0.0);
                vec3 col = mix(bottomColor, topColor, factor);
                float alpha = mix(maxAlpha, 0.0, factor);
                if (maxAlpha == 0.0) discard; // Cuerpos sin atmósfera (transparente total)
                gl_FragColor = vec4(col, alpha);
            }
        `,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false
    });
    window.skyDome = new THREE.Mesh(skyGeo, skyMat);
    window.skyDome.position.set(pWorld.x, pWorld.y - gRadius, pWorld.z);
    scene.add(window.skyDome);
    
    const btnContainer = document.getElementById('landing-btn-container');
    btnContainer.innerHTML = `<button id="btn-takeoff" style="width:100%; padding: 10px; background: rgba(255, 0, 0, 0.4); border: 1px solid red; color: white; cursor: pointer; border-radius: 5px; font-weight:bold; font-size:1.1rem; text-shadow: 0 0 5px red;">🔥 DESPEGAR</button>`;
    
    document.getElementById('btn-takeoff').addEventListener('click', () => {
        isLanded = false;
        landedTarget = null;
        
        if (window.surfaceGround) {
            scene.remove(window.surfaceGround);
            window.surfaceGround = null;
        }
        if (window.skyDome) {
            window.skyDome.visible = false;
        }
        scene.background = new THREE.Color(0x000000);
        
        // No hay necesidad de restaurar visibilidad, nunca se ocultaron
        
        controls.minDistance = 0;
        controls.maxDistance = Infinity;
        controls.enableZoom = true;
        controls.enablePan = true;
        
        focusObject(object, 15, name, document.getElementById('target-desc').textContent, document.getElementById('target-mass').textContent, document.getElementById('target-radius').textContent);
    });
}
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// === GESTOR DE FLOTA (Sondas TITAN) ===
window.deployedProbes = [];

// Función genérica para desplegar sonda
function deployProbeAt(pos, targetName) {
    const probeGeo = new THREE.CylinderGeometry(0.5, 0.5, 3, 8);
    const probeMat = new THREE.MeshStandardMaterial({ color: 0x2a3a4a, wireframe: false, roughness: 0.2, metalness: 0.8 });
    const probeMesh = new THREE.Mesh(probeGeo, probeMat);
    
    const panelGeo = new THREE.BoxGeometry(8, 0.2, 2);
    const panelMat = new THREE.MeshStandardMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.8, roughness: 0.1 });
    const panelMesh = new THREE.Mesh(panelGeo, panelMat);
    probeMesh.add(panelMesh);
    
    const antGeo = new THREE.CylinderGeometry(0.05, 0.05, 4, 8);
    const antMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const antMesh = new THREE.Mesh(antGeo, antMat);
    antMesh.position.y = 2.5;
    probeMesh.add(antMesh);
    
    probeMesh.position.copy(pos);
    
    probeMesh.userData.isProbe = true;
    probeMesh.userData.rotationSpeed = new THREE.Vector3(Math.random()*0.02, Math.random()*0.02, Math.random()*0.02);
    
    scene.add(probeMesh);
    
    const probeId = `Sonda-${Math.floor(Math.random()*9000)+1000}`;
    
    // Relay Network (Interconexión Láser)
    if (window.deployedProbes.length > 0) {
        const lastProbe = window.deployedProbes[window.deployedProbes.length - 1];
        const lineGeo = new THREE.BufferGeometry().setFromPoints([lastProbe.position, probeMesh.position]);
        const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.5 });
        const relayLine = new THREE.Line(lineGeo, lineMat);
        scene.add(relayLine);
    }
    
    const probeData = {
        id: probeId,
        mesh: probeMesh,
        targetName: targetName,
        position: probeMesh.position.clone()
    };
    
    window.deployedProbes.push(probeData);
    updateFleetUI();
    
    const out = document.getElementById('console-output');
    if (out) {
        out.innerHTML += `<br><span style="color:#00ffcc">> TITAN: [${probeId}] Desplegada en ${targetName}. Enlace láser establecido.</span>`;
        out.scrollTop = out.scrollHeight;
    }
}

document.getElementById('btn-deploy-probe').addEventListener('click', () => {
    if (!currentTarget) return;
    const pos = new THREE.Vector3();
    currentTarget.getWorldPosition(pos);
    const r = currentTarget.geometry.parameters ? currentTarget.geometry.parameters.radius : 10;
    pos.add(new THREE.Vector3(r * 2.5, r * 1.5, r * 2.5));
    const targetName = document.getElementById('target-name').textContent || "Anomalía";
    deployProbeAt(pos, targetName);
});

// Drag & Drop sobre el lienzo 3D
window.addEventListener('dragover', (e) => {
    e.preventDefault(); // Permite el drop
});

window.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data !== 'probe') return;

    // Calcular posición del ratón en coordenadas normalizadas del dispositivo (-1 a +1)
    const mouseDrop = new THREE.Vector2();
    mouseDrop.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseDrop.y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    const raycasterDrop = new THREE.Raycaster();
    raycasterDrop.setFromCamera(mouseDrop, camera);
    
    // Crear un plano invisible situado a la distancia del target actual de la cámara
    const plane = new THREE.Plane();
    const cameraDir = new THREE.Vector3();
    camera.getWorldDirection(cameraDir);
    plane.setFromNormalAndCoplanarPoint(cameraDir.clone().negate(), controls.target);
    
    const intersectPoint = new THREE.Vector3();
    raycasterDrop.ray.intersectPlane(plane, intersectPoint);
    
    if (intersectPoint) {
        deployProbeAt(intersectPoint, "Espacio Profundo (Manual)");
    }
});

function updateFleetUI() {
    const list = document.getElementById('probe-list');
    if (window.deployedProbes.length === 0) {
        list.innerHTML = `<div style="padding: 10px; text-align: center; color: #666;">No hay sondas desplegadas.</div>`;
        return;
    }
    
    let html = '';
    window.deployedProbes.forEach((probe, index) => {
        html += `
        <div style="padding: 8px; border-bottom: 1px solid #333; transition: 0.2s; font-family:'Courier New', monospace; position: relative;" 
             onmouseover="this.style.background='rgba(76,201,240,0.2)'" 
             onmouseout="this.style.background='transparent'">
            <strong style="color: #4cc9f0; cursor: pointer;" onclick="hijackCamera(${index})">🛰️ ${probe.id}</strong>
            <span style="color: red; cursor: pointer; position: absolute; right: 10px; top: 8px; font-weight: bold;" onclick="deleteProbe(${index})" title="Destruir Sonda">[X]</span><br>
            <span style="color: #888; font-size: 11px;">📡 Anclaje: ${probe.targetName}</span><br>
            <span style="color: #666; font-size: 9px; cursor: pointer;" onclick="hijackCamera(${index})">[SECUESTRAR CÁMARA]</span>
        </div>`;
    });
    list.innerHTML = html;
}

window.deleteProbe = function(index) {
    const probe = window.deployedProbes[index];
    if (probe) {
        scene.remove(probe.mesh);
        window.deployedProbes.splice(index, 1);
        updateFleetUI();
        
        const out = document.getElementById('console-output');
        if (out) {
            out.innerHTML += `<br><span style="color:#ffaa00">> TITAN: [${probe.id}] Destruida. Señal perdida.</span>`;
            out.scrollTop = out.scrollHeight;
        }
    }
};

window.hijackCamera = function(index) {
    const probe = window.deployedProbes[index];
    if (!probe) return;
    
    // Secuestro de Cámara (Camera Hijack) usando el Motor Warp
    warpActive = true;
    warpT = 0;
    warpStartCameraPos.copy(camera.position);
    warpStartLookAt.copy(controls.target);
    
    // La cámara salta a la misma posición de la sonda para ver desde dentro
    warpTargetCameraPos.copy(probe.position);
    
    // La cámara mirará hacia el frente (hacia el centro galáctico o hacia su objetivo original)
    const dir = new THREE.Vector3().subVectors(controls.target, camera.position).normalize();
    warpTargetLookAt.copy(probe.position).add(dir.multiplyScalar(100));
    
    // Activar el Cockpit
    const cockpit = document.getElementById('cockpit-overlay');
    if (cockpit) {
        cockpit.style.opacity = '1';
        // IMPORTANTE: Dejamos pointerEvents en 'none' en el overlay para poder arrastrar la cámara en el canvas,
        // los botones del dashboard ya tienen pointer-events: auto en el HTML.
        cockpit.style.pointerEvents = 'none'; 
        document.getElementById('cockpit-status').textContent = `INMERSIÓN: [${probe.id}]`;
    }
    
    const out = document.getElementById('console-output');
    if (out) {
        out.innerHTML += `<br><span style="color:#f72585">> TITAN ALERTA: SECUESTRO DE CÁMARA. Vista de Cabina Inmersiva en ${probe.id}.</span>`;
        out.scrollTop = out.scrollHeight;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const exitBtn = document.getElementById('btn-exit-cockpit');
    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            const cockpit = document.getElementById('cockpit-overlay');
            if (cockpit) {
                cockpit.style.opacity = '0';
                cockpit.style.pointerEvents = 'none';
            }
            
            // Volver al origen (El Sol)
            warpActive = true;
            warpT = 0;
            warpStartCameraPos.copy(camera.position);
            warpStartLookAt.copy(controls.target);
            
            warpTargetCameraPos.set(75, 100, 150); // Cerca de la Tierra/Sol
            warpTargetLookAt.set(0, 0, 0); // Mirando al origen
            
            const out = document.getElementById('console-output');
            if (out) {
                out.innerHTML += `<br><span style="color:#00ffcc">> TITAN: Saliendo de la cabina inmersiva. Regresando a la base estelar (Sol).</span>`;
                out.scrollTop = out.scrollHeight;
            }
        });
    }
});

// ==========================================
// MÓDULO DE DEFENSA PLANETARIA (MISIÓN DART)
// ==========================================

let activeDART = null; // Para trackear si hay un misil en vuelo

const dartBtn = document.getElementById('btn-launch-dart');
if (dartBtn) {
    dartBtn.addEventListener('click', () => {
        if (!currentTarget || !document.getElementById('target-name').textContent.includes('NEO')) return;
        launchDART(currentTarget, document.getElementById('target-name').textContent);
    });
}

function launchDART(neoMesh, neoName) {
    if (activeDART) return; // Solo un misil a la vez
    
    const out = document.getElementById('console-output');
    out.innerHTML += `<br><span style="color:#ff0000; font-weight:bold;">> TITAN COMANDANCIA: Autorización de Ataque DART concedida. Lanzando misil interceptor...</span>`;
    out.scrollTop = out.scrollHeight;
    
    // Geometría del Misil
    const dartGeo = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
    dartGeo.rotateX(Math.PI / 2);
    const dartMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dartMesh = new THREE.Mesh(dartGeo, dartMat);
    
    // Posición inicial: Tierra (asumimos id = 3 o pos [30,0,0])
    // Para simplificar, lo sacamos de cerca del sol pero en dirección al NEO
    dartMesh.position.set(30, 0, 0); 
    scene.add(dartMesh);
    
    // Calcular masas (Impacto Inelástico)
    const neoRadius = neoMesh.geometry.parameters ? neoMesh.geometry.parameters.radius : 0.8;
    const neoVol = (4/3) * Math.PI * Math.pow(neoRadius * 1000, 3); // Escala simulada
    const neoMass = neoVol * 3000; // Densidad roca
    
    const dartMass = 600; // 600 kg
    const dartSpeed = 6000; // 6 km/s
    
    const p = dartMass * dartSpeed;
    const deltaV = p / neoMass; // m/s
    
    activeDART = {
        mesh: dartMesh,
        target: neoMesh,
        progress: 0,
        startPos: dartMesh.position.clone(),
        deltaV: deltaV,
        neoMass: neoMass,
        neoName: neoName
    };
    
    // Animación en el render loop: Necesitamos conectarlo a animate()
    // Como animate() no sabe de activeDART, lo añadiremos mediante una lista de tareas
    window.tasksToRun.push(animateDART);
}

// Global para registrar funciones a ejecutar por frame
if (!window.tasksToRun) window.tasksToRun = [];

function animateDART(delta) {
    if (!activeDART) return false; // Borrar de la lista
    
    activeDART.progress += delta * 0.5; // Velocidad del misil visual
    if (activeDART.progress >= 1.0) {
        // IMPACTO
        scene.remove(activeDART.mesh);
        triggerDARTImpact(activeDART.target.position);
        showDARTReport(activeDART);
        activeDART = null;
        return false; // Termina la tarea
    }
    
    activeDART.target.getWorldPosition(activeDART.target.userData.lastPos = new THREE.Vector3());
    activeDART.mesh.position.lerpVectors(activeDART.startPos, activeDART.target.userData.lastPos, activeDART.progress);
    activeDART.mesh.lookAt(activeDART.target.userData.lastPos);
    
    return true; // Continuar tarea
}

function triggerDARTImpact(pos) {
    // Explosión de partículas
    const pGeo = new THREE.BufferGeometry();
    const pCount = 500;
    const pPos = new Float32Array(pCount * 3);
    const pVel = [];
    for(let i=0; i<pCount*3; i+=3) {
        pPos[i] = pos.x; pPos[i+1] = pos.y; pPos[i+2] = pos.z;
        pVel.push(
            (Math.random()-0.5)*2,
            (Math.random()-0.5)*2,
            (Math.random()-0.5)*2
        );
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({color: 0xffaa00, size: 0.5});
    const pts = new THREE.Points(pGeo, pMat);
    scene.add(pts);
    
    // Animamos las partículas un poco (forma rudimentaria pero efectiva)
    let frames = 0;
    function animExplosion() {
        if(frames++ > 60) { scene.remove(pts); return false; }
        const arr = pts.geometry.attributes.position.array;
        for(let i=0; i<pCount; i++) {
            arr[i*3] += pVel[i*3];
            arr[i*3+1] += pVel[i*3+1];
            arr[i*3+2] += pVel[i*3+2];
        }
        pts.geometry.attributes.position.needsUpdate = true;
        pts.material.opacity = 1 - (frames/60);
        return true;
    }
    window.tasksToRun.push(animExplosion);
}

function showDARTReport(dartObj) {
    const modal = document.getElementById('dart-report-modal');
    const content = document.getElementById('dart-report-content');
    if (!modal || !content) return;
    
    // Desvío en kilómetros extrapolado a 1 año (simulación)
    const deviationKm = (dartObj.deltaV * 3600 * 24 * 365) / 1000;
    
    const isSuccess = deviationKm > 10000; // Si desvía más de 10,000 km, evita la Tierra (radio 6371km)
    
    let html = `
        <b>[OBJETIVO]:</b> ${dartObj.neoName}<br>
        <b>Masa Estimada:</b> ${dartObj.neoMass.toExponential(2)} kg<br>
        <b>Velocidad de Impacto:</b> 6,000 m/s<br>
        <b>Masa Interceptor:</b> 600 kg<br>
        <hr style="border: 0; border-top: 1px solid #444; margin: 10px 0;">
        <b>[RESULTADOS TELEMÉTRICOS]</b><br>
        Δv transferido: ${dartObj.deltaV.toFixed(6)} m/s<br>
        Desviación orbital proyectada: ${Math.floor(deviationKm).toLocaleString()} km<br><br>
    `;
    
    if (isSuccess) {
        html += `<span style="color: #00ffcc; font-weight: bold; font-size: 16px;">CONCLUSIÓN: ÉXITO.</span><br>`;
        html += `<span style="color: #aaa;">La desviación térmica es suficiente para que el asteroide pase de largo a una distancia segura de la Tierra. Misión DART completada.</span>`;
    } else {
        html += `<span style="color: #ff0000; font-weight: bold; font-size: 16px;">CONCLUSIÓN: FRACASO CATASTRÓFICO.</span><br>`;
        html += `<span style="color: #aaa;">El asteroide es demasiado masivo. El impacto cinético no alteró significativamente su órbita. Prepárense para el impacto.</span>`;
    }
    
    content.innerHTML = html;
    modal.style.display = 'block';
}

// === GESTOR DE ESTADOS (Bloc de Notas Cosmológico) ===
const btnSave = document.getElementById('btn-save-state');
const btnLoad = document.getElementById('btn-load-state');
const btnReset = document.getElementById('btn-reset-state');
const textNotes = document.getElementById('state-notes');

if (btnSave && btnLoad && btnReset) {
    btnSave.addEventListener('click', () => {
        const state = {
            camPos: { x: camera.position.x, y: camera.position.y, z: camera.position.z },
            camTarget: { x: controls.target.x, y: controls.target.y, z: controls.target.z },
            notes: textNotes.value,
            toggles: {
                hipparcos: document.getElementById('toggle-hipparcos') ? document.getElementById('toggle-hipparcos').checked : true,
                milkyway: document.getElementById('toggle-milkyway') ? document.getElementById('toggle-milkyway').checked : true,
                cosmicweb: document.getElementById('toggle-cosmicweb') ? document.getElementById('toggle-cosmicweb').checked : false,
                zoa: document.getElementById('toggle-zoa') ? document.getElementById('toggle-zoa').checked : false,
                multiverse: document.getElementById('toggle-multiverse') ? document.getElementById('toggle-multiverse').checked : false,
                warp: document.getElementById('toggle-warp-effect') ? document.getElementById('toggle-warp-effect').checked : true,
            },
            sliders: {
                g: document.getElementById('slider-g') ? document.getElementById('slider-g').value : 100,
                warp: document.getElementById('slider-warp') ? document.getElementById('slider-warp').value : 100,
            }
        };
        localStorage.setItem('dvtrgas_state', JSON.stringify(state));
        if (window.logTitan) logTitan("[BLOC DE NOTAS] Estado Cosmológico Guardado.");
        btnSave.textContent = "¡GUARDADO!";
        setTimeout(() => btnSave.textContent = "GUARDAR ESTADO", 2000);
    });
    
    btnLoad.addEventListener('click', () => {
        const stateStr = localStorage.getItem('dvtrgas_state');
        if (stateStr) {
            try {
                const state = JSON.parse(stateStr);
                camera.position.set(state.camPos.x, state.camPos.y, state.camPos.z);
                controls.target.set(state.camTarget.x, state.camTarget.y, state.camTarget.z);
                if (state.notes) textNotes.value = state.notes;
                
                // Aplicar toggles si existen
                if (document.getElementById('toggle-hipparcos')) {
                    document.getElementById('toggle-hipparcos').checked = state.toggles.hipparcos;
                    if(window.hipparcosGroup) window.hipparcosGroup.visible = state.toggles.hipparcos;
                }
                if (document.getElementById('toggle-milkyway')) {
                    document.getElementById('toggle-milkyway').checked = state.toggles.milkyway;
                    if(window.milkyWaySphere) window.milkyWaySphere.visible = state.toggles.milkyway;
                }
                if (document.getElementById('toggle-cosmicweb')) {
                    document.getElementById('toggle-cosmicweb').checked = state.toggles.cosmicweb;
                    if(window.cosmicWebLines) window.cosmicWebLines.visible = state.toggles.cosmicweb;
                }
                if (document.getElementById('toggle-zoa')) {
                    document.getElementById('toggle-zoa').checked = state.toggles.zoa;
                    if(window.zoaGroup) window.zoaGroup.visible = state.toggles.zoa;
                }
                if (document.getElementById('toggle-multiverse')) {
                    document.getElementById('toggle-multiverse').checked = state.toggles.multiverse;
                    if(window.otherUniverses) window.otherUniverses.visible = state.toggles.multiverse;
                }
                if (document.getElementById('toggle-warp-effect')) {
                    document.getElementById('toggle-warp-effect').checked = state.toggles.warp;
                    if(window.warpPass) window.warpPass.enabled = state.toggles.warp;
                }
                
                if (window.logTitan) logTitan("[BLOC DE NOTAS] Estado Cosmológico Restaurado.");
            } catch(e) {
                console.error("Error cargando estado", e);
            }
        } else {
            if (window.logTitan) logTitan("[BLOC DE NOTAS] No hay datos guardados.");
        }
    });
    
    btnReset.addEventListener('click', () => {
        localStorage.removeItem('dvtrgas_state');
        if (window.logTitan) logTitan("[BLOC DE NOTAS] Base de datos local formateada. Recarga la página para estado base.");
        textNotes.value = "";
    });
}

