/**
 * ====================================================================
 *   TITAN-INTERACTIVE-COSMOS-LAB — ASTRONOMY CATALOG BUILDER (ANSI C99)
 *   Generador de Catálogo Celestial Hipparcos, Estrellas SIMBAD y 
 *   Sistemas Especiales (T CrB, Abell 370 JWST, Púlsar 716 Hz,
 *   JADES-GS-z14-0, Cha 1107-7626, Enjambre Ofiuco-Escorpión).
 *   Autor: José Manuel Moreno (JMM / cyberenigma-lgtm)
 * ====================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <stdbool.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

/* Transformación de Coordenadas Ecuatoriales a Three.js:
 * En Three.js: +Y es el Polo Norte Celeste (Dec = +90°).
 * X y Z forman el plano del ecuador celeste (Dec = 0°).
 *   ra_rad: Ascensión Recta en radianes
 *   dec_rad: Declinación en radianes
 *   dist_pc: Distancia en parsecs
 */
static void eq_to_three(double ra_rad, double dec_rad, double dist_pc, double *x, double *y, double *z) {
    *y = dist_pc * sin(dec_rad);
    *x = dist_pc * cos(dec_rad) * cos(ra_rad);
    *z = -dist_pc * cos(dec_rad) * sin(ra_rad);
}

static double bv_to_temperature(double bv) {
    if (bv < -0.40) bv = -0.40;
    if (bv > 2.00) bv = 2.00;
    double term1 = 1.0 / (0.92 * bv + 1.7);
    double term2 = 1.0 / (0.92 * bv + 0.62);
    return 4600.0 * (term1 + term2);
}

static void temp_to_rgb(double temp_k, double *r, double *g, double *b) {
    double t = temp_k / 100.0;
    double red, green, blue;

    // Red
    if (t <= 66.0) {
        red = 255.0;
    } else {
        red = t - 60.0;
        red = 329.698727446 * pow(red, -0.1332047592);
        if (red < 0.0) red = 0.0;
        if (red > 255.0) red = 255.0;
    }

    // Green
    if (t <= 66.0) {
        green = t;
        green = 99.4708025861 * log(green) - 161.1195681661;
        if (green < 0.0) green = 0.0;
        if (green > 255.0) green = 255.0;
    } else {
        green = t - 60.0;
        green = 288.1221695283 * pow(green, -0.0755148492);
        if (green < 0.0) green = 0.0;
        if (green > 255.0) green = 255.0;
    }

    // Blue
    if (t >= 66.0) {
        blue = 255.0;
    } else if (t <= 19.0) {
        blue = 0.0;
    } else {
        blue = t - 10.0;
        blue = 138.5177312231 * log(blue) - 305.0447927307;
        if (blue < 0.0) blue = 0.0;
        if (blue > 255.0) blue = 255.0;
    }

    *r = red / 255.0;
    *g = green / 255.0;
    *b = blue / 255.0;
}

int main(void) {
    printf("============================================================\n");
    printf("  TITAN COSMOS LAB — GENERADOR DE BASES DE DATOS CELESTES   \n");
    printf("============================================================\n\n");

    /* 1. Generar public/data/hipparcos.json desde hygdata_v3.csv */
    FILE *f_in = fopen("public/data/hygdata_v3.csv", "r");
    if (!f_in) {
        printf("[ERROR] No se pudo abrir public/data/hygdata_v3.csv\n");
        return 1;
    }

    FILE *f_out = fopen("public/data/hipparcos.json", "w");
    if (!f_out) {
        printf("[ERROR] No se pudo crear public/data/hipparcos.json\n");
        fclose(f_in);
        return 1;
    }

    char line[2048];
    if (!fgets(line, sizeof(line), f_in)) {
        fclose(f_in);
        fclose(f_out);
        return 1;
    }

    fputc('[', f_out);
    bool first = true;
    long star_count = 0;

    while (fgets(line, sizeof(line), f_in)) {
        char *p = line;
        char *fields[35];
        int field_idx = 0;

        fields[field_idx++] = p;
        while (*p && field_idx < 35) {
            if (*p == ',') {
                *p = '\0';
                fields[field_idx++] = p + 1;
            }
            p++;
        }

        if (field_idx < 17) continue;

        double ra_hours = atof(fields[7]);
        double dec_deg = atof(fields[8]);
        double dist_pc = atof(fields[9]);
        double mag = atof(fields[13]);
        double ci = atof(fields[16]);

        if (dist_pc <= 0.001) continue;
        if (mag > 8.5) continue; // Filtro de brillo: estrellas visibles a simple vista y binoculares

        double ra_rad = (ra_hours / 24.0) * (2.0 * M_PI);
        double dec_rad = (dec_deg * M_PI) / 180.0;

        /* Proyección uniforme en la Bóveda Celeste (R = 45.000 unidades)
         * Todas las estrellas del firmamento residen en la esfera celeste exterior,
         * garantizando 0 colisiones con órbitas planetarias y perspectiva astronómica real */
        double x, y, z;
        eq_to_three(ra_rad, dec_rad, 45000.0, &x, &y, &z);

        // Color RGB físico termodinámico según radiación de Planck (Ballesteros & CIE sRGB)
        double teff = bv_to_temperature(ci);
        double r, g, b;
        temp_to_rgb(teff, &r, &g, &b);

        if (!first) fputc(',', f_out);
        first = false;

        fprintf(f_out, "%.2f,%.2f,%.2f,%.2f,%.2f,%.2f", x, y, z, r, g, b);
        star_count++;
    }

    fputc(']', f_out);
    fclose(f_in);
    fclose(f_out);
    printf("[EXITO] Generado public/data/hipparcos.json con %ld estrellas reales (Mag <= 8.5)\n", star_count);

    /* 2. Coordenadas de los Objetos Especiales de Vanguardia */

    // 1) T Coronae Borealis (Nova Recurrente)
    // RA = 239.8757°, DEC = +25.9202°, Dist = 2986 ly (Profundo: 25.000 u)
    double tcrb_ra = (239.8757 * M_PI) / 180.0;
    double tcrb_dec = (25.9202 * M_PI) / 180.0;
    double tcrb_x, tcrb_y, tcrb_z;
    eq_to_three(tcrb_ra, tcrb_dec, 25000.0, &tcrb_x, &tcrb_y, &tcrb_z);

    // 2) Abell 370 (Fondo 44 Estrellas JWST Lente Gravitacional)
    // RA = 39.9605°, DEC = -1.5855°
    double abell_ra = (39.9605 * M_PI) / 180.0;
    double abell_dec = (-1.5855 * M_PI) / 180.0;
    double abell_x, abell_y, abell_z;
    eq_to_three(abell_ra, abell_dec, 55000.0, &abell_x, &abell_y, &abell_z);

    // 3) Púlsar 716 Hz (Centro Galáctico / Sgr A*)
    double pulsar_x = 52000.0;
    double pulsar_y = 0.0;
    double pulsar_z = -100000.0;

    // 4) JADES-GS-z14-0 (Galaxia más lejana del universo, z=14.32)
    // RA = 53.1537°, DEC = -27.7804°, Constelación Fornax
    double jades_ra = (53.1537 * M_PI) / 180.0;
    double jades_dec = (-27.7804 * M_PI) / 180.0;
    double jades_x, jades_y, jades_z;
    eq_to_three(jades_ra, jades_dec, 75000.0, &jades_x, &jades_y, &jades_z); // Macro-escala profunda

    // 5) Cha 1107-7626 (Planeta errante más activo del universo)
    // RA = 166.7820°, DEC = -76.4424°, Dist = 620 ly (Profundo: 18.000 u)
    double cha_ra = (166.7820 * M_PI) / 180.0;
    double cha_dec = (-76.4424 * M_PI) / 180.0;
    double cha_x, cha_y, cha_z;
    eq_to_three(cha_ra, cha_dec, 18000.0, &cha_x, &cha_y, &cha_z);

    // 6) Cúmulo de Planetas Errantes Ofiuco-Escorpión (~115 planetas flotantes)
    // RA = 246.2500°, DEC = -24.0000°, Dist = 420 ly (Profundo: 15.000 u)
    double ofi_ra = (246.2500 * M_PI) / 180.0;
    double ofi_dec = (-24.0000 * M_PI) / 180.0;
    double ofi_x, ofi_y, ofi_z;
    eq_to_three(ofi_ra, ofi_dec, 15000.0, &ofi_x, &ofi_y, &ofi_z);

    // 7) Galaxia NGC 4380 (Espiral en Cúmulo de Virgo)
    // RA = 12h 25m 34.6s = 186.3942°, DEC = +10° 01' 01" = +10.0169°, Dist = 52.000.000 ly (16 Mpc)
    double ngc_ra = (186.3942 * M_PI) / 180.0;
    double ngc_dec = (10.0169 * M_PI) / 180.0;
    double ngc_x, ngc_y, ngc_z;
    eq_to_three(ngc_ra, ngc_dec, 45000.0, &ngc_x, &ngc_y, &ngc_z);

    // 8) Nebulosa del Cangrejo (Messier 1 / NGC 1952 — Remanente de Supernova SN 1054)
    // RA = 05h 34m 31.97s = 83.6330°, DEC = +22° 00' 52.1" = +22.0145°, Dist = 6,500 ly
    double crab_ra = (83.6330 * M_PI) / 180.0;
    double crab_dec = (22.0145 * M_PI) / 180.0;
    double crab_x, crab_y, crab_z;
    eq_to_three(crab_ra, crab_dec, 35000.0, &crab_x, &crab_y, &crab_z);

    /* 3. Escribir public/data/simbad_stars.json con Catálogo Completo */
    FILE *f_simbad = fopen("public/data/simbad_stars.json", "w");
    if (!f_simbad) {
        printf("[ERROR] No se pudo abrir public/data/simbad_stars.json para escritura\n");
        return 1;
    }

    fprintf(f_simbad, "[\n");

    // 1. T Coronae Borealis
    fprintf(f_simbad,
        "  {\n"
        "    \"name\": \"T Coronae Borealis (Nova Recurrente)\",\n"
        "    \"designation\": \"T CrB / Blaze Star\",\n"
        "    \"type\": \"binary_nova\",\n"
        "    \"x\": %.2f, \"y\": %.2f, \"z\": %.2f,\n"
        "    \"ra_deg\": 239.8757, \"dec_deg\": 25.9202,\n"
        "    \"dist_ly\": 2986.0, \"dist_pc\": 915.8,\n"
        "    \"mag_quiescent\": 10.8, \"mag_eruption\": 2.0,\n"
        "    \"sp_type\": \"M3III + Enana Blanca\",\n"
        "    \"radial_vel_kms\": -27.79,\n"
        "    \"constellation\": \"Corona Borealis\",\n"
        "    \"color\": 16737843,\n"
        "    \"desc\": \"Sistema binario cataclísmico compuesto por una gigante roja y una enana blanca masiva. Erupciones termonucleares periódicas (~80 años) que elevan su brillo de magnitud +10.8 a +2.0 (visible a simple vista).\",\n"
        "    \"is_special\": true,\n"
        "    \"pulse_rate\": 0.05\n"
        "  },\n",
        tcrb_x, tcrb_y, tcrb_z
    );

    // 2. Abell 370 (JWST 44 Estrellas)
    fprintf(f_simbad,
        "  {\n"
        "    \"name\": \"Abell 370 (Campo 44 Estrellas JWST)\",\n"
        "    \"designation\": \"Abell 370 / JWST Gravitational Lens\",\n"
        "    \"type\": \"gravitational_lens_cluster\",\n"
        "    \"x\": %.2f, \"y\": %.2f, \"z\": %.2f,\n"
        "    \"ra_deg\": 39.9605, \"dec_deg\": -1.5855,\n"
        "    \"dist_ly\": 6500000000.0,\n"
        "    \"redshift_z\": 0.375,\n"
        "    \"constellation\": \"Cetus (La Ballena)\",\n"
        "    \"star_count_lensed\": 44,\n"
        "    \"color\": 65535,\n"
        "    \"desc\": \"Cúmulo colosal de galaxias cuya curvatura del espacio-tiempo actúa como lente gravitacional cósmica, revelando 44 estrellas individuales primigenias a 6.500 millones de años luz descubiertas por el JWST.\",\n"
        "    \"is_special\": true,\n"
        "    \"is_deep_field\": true\n"
        "  },\n",
        abell_x, abell_y, abell_z
    );

    // 3. Púlsar 716 Hz
    fprintf(f_simbad,
        "  {\n"
        "    \"name\": \"Púlsar Milisegundo 716 Hz (Centro Galáctico)\",\n"
        "    \"designation\": \"PSR J1748-2446ad Type / Sgr A* Core\",\n"
        "    \"type\": \"ultrafast_pulsar\",\n"
        "    \"x\": %.2f, \"y\": %.2f, \"z\": %.2f,\n"
        "    \"dist_ly\": 26000.0,\n"
        "    \"rotation_hz\": 716.0,\n"
        "    \"period_sec\": 0.001395,\n"
        "    \"equatorial_speed_c\": 0.24,\n"
        "    \"constellation\": \"Sagittarius\",\n"
        "    \"color\": 10092543,\n"
        "    \"desc\": \"Estrella de neutrones ultradensa girando a 716 vueltas por segundo (0.00139 s por revolución). Su superficie se desplaza a un cuarto de la velocidad de la luz emitiendo haces sincrotrón relativistas colimados.\",\n"
        "    \"is_special\": true,\n"
        "    \"beam_active\": true\n"
        "  },\n",
        pulsar_x, pulsar_y, pulsar_z
    );

    // 4. JADES-GS-z14-0 (Galaxia más lejana del universo)
    fprintf(f_simbad,
        "  {\n"
        "    \"name\": \"JADES-GS-z14-0 (Galaxia Más Lejana del Universo)\",\n"
        "    \"designation\": \"JADES-GS-z14-0 / JWST Record Breaker\",\n"
        "    \"type\": \"primordial_galaxy\",\n"
        "    \"x\": %.2f, \"y\": %.2f, \"z\": %.2f,\n"
        "    \"ra_deg\": 53.1537, \"dec_deg\": -27.7804,\n"
        "    \"dist_ly\": 13428000000.0, \"comoving_dist_ly\": 33844000000.0,\n"
        "    \"redshift_z\": 14.32,\n"
        "    \"constellation\": \"Fornax (El Horno)\",\n"
        "    \"radius_ly\": 1600.0,\n"
        "    \"color\": 16711782,\n"
        "    \"desc\": \"La galaxia confirmada más distante y antigua del cosmos descubierta por el Telescopio James Webb (JWST). Su luz fue emitida solo 290 millones de años tras el Big Bang durante el Amanecer Cósmico.\",\n"
        "    \"is_special\": true,\n"
        "    \"is_ancient_galaxy\": true\n"
        "  },\n",
        jades_x, jades_y, jades_z
    );

    // 5. Cha 1107-7626 (Planeta errante más activo)
    fprintf(f_simbad,
        "  {\n"
        "    \"name\": \"Cha 1107-7626 (Planeta Errante Hiperactivo)\",\n"
        "    \"designation\": \"Cha 1107-7626 / ESO Rogue Giant\",\n"
        "    \"type\": \"rogue_planet\",\n"
        "    \"x\": %.2f, \"y\": %.2f, \"z\": %.2f,\n"
        "    \"ra_deg\": 166.7820, \"dec_deg\": -76.4424,\n"
        "    \"dist_ly\": 620.0, \"dist_pc\": 190.1,\n"
        "    \"mass_jupiter\": 7.5,\n"
        "    \"accretion_rate_tons_sec\": 6000000000.0,\n"
        "    \"age_myr\": 1.5,\n"
        "    \"constellation\": \"Chamaeleon (El Camaleón)\",\n"
        "    \"color\": 16750848,\n"
        "    \"desc\": \"Planeta huérfano sin estrella madre descubierto por el ESO, devorando gas y polvo de su disco circumplanetario a un ritmo récord de 6.000 millones de toneladas por segundo. Masa de 5 a 10 Júpiteres.\",\n"
        "    \"is_special\": true,\n"
        "    \"has_accretion_disk\": true\n"
        "  },\n",
        cha_x, cha_y, cha_z
    );

    // 6. Enjambre de Planetas Errantes Ofiuco-Escorpión
    fprintf(f_simbad,
        "  {\n"
        "    \"name\": \"Población de Planetas Errantes (Ofiuco-Escorpión)\",\n"
        "    \"designation\": \"Ophiuchus-Scorpius Rogue Planet Swarm\",\n"
        "    \"type\": \"rogue_planet_swarm\",\n"
        "    \"x\": %.2f, \"y\": %.2f, \"z\": %.2f,\n"
        "    \"ra_deg\": 246.2500, \"dec_deg\": -24.0000,\n"
        "    \"dist_ly\": 420.0, \"dist_pc\": 128.8,\n"
        "    \"population_count\": 115,\n"
        "    \"constellation\": \"Ophiuchus / Scorpius\",\n"
        "    \"color\": 13421823,\n"
        "    \"desc\": \"La mayor colección de planetas errantes de masa joviana descubierta en la Vía Láctea: entre 70 y 170 mundos gigantes vagando juntos libremente por el medio interestelar sin ligadura gravitatoria a ninguna estrella.\",\n"
        "    \"is_special\": true,\n"
        "    \"is_swarm\": true\n"
        "  },\n",
        ofi_x, ofi_y, ofi_z
    );

    // 7. NGC 4380 (Galaxia Espiral en Cúmulo de Virgo)
    fprintf(f_simbad,
        "  {\n"
        "    \"name\": \"NGC 4380 (Galaxia Espiral en Virgo)\",\n"
        "    \"designation\": \"NGC 4380 / Virgo Cluster Spiral\",\n"
        "    \"type\": \"spiral_galaxy_ngc4380\",\n"
        "    \"x\": %.2f, \"y\": %.2f, \"z\": %.2f,\n"
        "    \"ra_deg\": 186.3942, \"dec_deg\": 10.0169,\n"
        "    \"dist_ly\": 52000000.0, \"dist_mpc\": 16.0,\n"
        "    \"mag\": 11.7,\n"
        "    \"constellation\": \"Virgo (La Virgen)\",\n"
        "    \"color\": 16763989,\n"
        "    \"desc\": \"Galaxia espiral compacta y limpia en el Cúmulo de Virgo a 52M al. Núcleo central esférico masivo con radiación térmica amarillenta (estrellas K y M) rodeado de brazos espirales suaves concéntricos con líneas oscuras de polvo interestelar.\",\n"
        "    \"is_special\": true,\n"
        "    \"is_spiral_galaxy\": true\n"
        "  },\n",
        ngc_x, ngc_y, ngc_z
    );

    // 8. Nebulosa del Cangrejo (Messier 1 / NGC 1952)
    fprintf(f_simbad,
        "  {\n"
        "    \"name\": \"Nebulosa del Cangrejo (Messier 1 / NGC 1952)\",\n"
        "    \"designation\": \"M1 / Taurus Supernova Remnant SN 1054\",\n"
        "    \"type\": \"supernova_remnant_m1\",\n"
        "    \"x\": %.2f, \"y\": %.2f, \"z\": %.2f,\n"
        "    \"ra_deg\": 83.6330, \"dec_deg\": 22.0145,\n"
        "    \"dist_ly\": 6500.0,\n"
        "    \"radius_ly\": 5.5,\n"
        "    \"pulsar_rpm\": 1800.0,\n"
        "    \"constellation\": \"Taurus (El Toro)\",\n"
        "    \"color\": 43775,\n"
        "    \"desc\": \"Remanente de la supernova observada en el año 1054 d.C. En su núcleo alberga un púlsar girando a 30.2 vueltas/seg que energiza filamentos de hidrógeno y azufre con emisión sincrotrón azul turquesa.\",\n"
        "    \"is_special\": true,\n"
        "    \"is_crab_nebula\": true\n"
        "  },\n",
        crab_x, crab_y, crab_z
    );

    // 9. Estrellas Guía del Firmamento y Bóveda Celeste (R = 45.000 unidades en la Bóveda Celeste)
    fprintf(f_simbad,
        "  {\n"
        "    \"name\": \"Polaris (Alfa Ursae Minoris)\",\n"
        "    \"designation\": \"Estrella Polar / Stella Polaris\",\n"
        "    \"x\": 366.10, \"y\": 44997.60, \"z\": -285.50,\n"
        "    \"dist_ly\": 433.0, \"mag\": 1.97, \"sp_type\": \"F7:Ib-IIv\",\n"
        "    \"constellation\": \"Ursa Minor\", \"color\": 16777181,\n"
        "    \"desc\": \"Estrella Polar del hemisferio norte terrestre. Marca con exactitud el Polo Norte Celeste (+Y) y el eje de rotación de la Tierra.\"\n"
        "  },\n"
        "  {\n"
        "    \"name\": \"Sirius A (Alfa Canis Majoris)\",\n"
        "    \"designation\": \"Sirio\",\n"
        "    \"x\": -8407.40, \"y\": -12942.30, \"z\": -42289.40,\n"
        "    \"dist_ly\": 8.6, \"mag\": -1.46, \"sp_type\": \"A1V\",\n"
        "    \"constellation\": \"Canis Major\", \"color\": 12644351,\n"
        "    \"desc\": \"La estrella más brillante de toda la bóveda celeste terrestre nocturna. Situada en Canis Major, brilla con resplandor azulado.\"\n"
        "  },\n"
        "  {\n"
        "    \"name\": \"Betelgeuse (Alfa Orionis)\",\n"
        "    \"designation\": \"Betelgeuse\",\n"
        "    \"x\": 939.90, \"y\": 5798.80, \"z\": -44616.40,\n"
        "    \"dist_ly\": 642.5, \"mag\": 0.5, \"sp_type\": \"M2Ib\",\n"
        "    \"constellation\": \"Orion\", \"color\": 16733504,\n"
        "    \"desc\": \"Supergigante roja pulsante en el hombro de Orión. En sus fases terminales de fusión de silicio antes de estallar en supernova.\"\n"
        "  },\n"
        "  {\n"
        "    \"name\": \"Rigel (Beta Orionis)\",\n"
        "    \"designation\": \"Rigel\",\n"
        "    \"x\": 8781.90, \"y\": -6419.00, \"z\": -43672.30,\n"
        "    \"dist_ly\": 860.0, \"mag\": 0.13, \"sp_type\": \"B8Iab\",\n"
        "    \"constellation\": \"Orion\", \"color\": 11591423,\n"
        "    \"desc\": \"Supergigante azul luminosa en el pie de Orión. Con una luminosidad 120.000 veces superior a la del Sol.\"\n"
        "  },\n"
        "  {\n"
        "    \"name\": \"Vega (Alfa Lyrae)\",\n"
        "    \"designation\": \"Vega\",\n"
        "    \"x\": 5624.80, \"y\": 28188.30, \"z\": 34636.30,\n"
        "    \"dist_ly\": 25.0, \"mag\": 0.03, \"sp_type\": \"A0Vvar\",\n"
        "    \"constellation\": \"Lyra\", \"color\": 13428223,\n"
        "    \"desc\": \"Vértice del Triángulo de Verano. Históricamente la estrella de calibración fotométrica (magnitud cero).\"\n"
        "  },\n"
        "  {\n"
        "    \"name\": \"Arcturus (Alfa Bootis)\",\n"
        "    \"designation\": \"Arturo\",\n"
        "    \"x\": -35293.40, \"y\": 14786.10, \"z\": 23789.20,\n"
        "    \"dist_ly\": 36.7, \"mag\": -0.05, \"sp_type\": \"K1.5IIIFe-0.5\",\n"
        "    \"constellation\": \"Bootes\", \"color\": 16755260,\n"
        "    \"desc\": \"Gigante naranja luminosa del hemisferio boreal, con alta velocidad propia perteneciente al halo galáctico.\"\n"
        "  },\n"
        "  {\n"
        "    \"name\": \"Aldebaran (Alfa Tauri)\",\n"
        "    \"designation\": \"Aldebarán\",\n"
        "    \"x\": 15477.50, \"y\": 12788.10, \"z\": -40274.60,\n"
        "    \"dist_ly\": 65.3, \"mag\": 0.85, \"sp_type\": \"K5III\",\n"
        "    \"constellation\": \"Taurus\", \"color\": 16744448,\n"
        "    \"desc\": \"El Ojo del Toro en Tauro. Gigante roja brillante situada visualmente frente al cúmulo de las Híades.\"\n"
        "  },\n"
        "  {\n"
        "    \"name\": \"Antares (Alfa Scorpii)\",\n"
        "    \"designation\": \"Antares\",\n"
        "    \"x\": -15518.70, \"y\": -20032.50, \"z\": 37174.50,\n"
        "    \"dist_ly\": 550.0, \"mag\": 1.06, \"sp_type\": \"M1.5Iab-Ib\",\n"
        "    \"constellation\": \"Scorpius\", \"color\": 16724530,\n"
        "    \"desc\": \"El Corazón del Escorpión. Supergigante roja monumental con un radio superior a 680 veces el del Sol.\"\n"
        "  }\n"
    );

    fprintf(f_simbad, "]\n");
    fclose(f_simbad);

    printf("[EXITO] Registrados todos los nuevos sistemas especiales en public/data/simbad_stars.json.\n");
    return 0;
}
