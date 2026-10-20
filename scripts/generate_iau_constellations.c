/* ============================================================================ */
/* TITAN-INTERACTIVE-COSMOS-LAB — GENERADOR DE CONSTELACIONES OFICIALES UAI    */
/* 100% ANSI C99 - Asterismos Reconocibles del Cielo Terrestre (Stellarium / IAU)*/
/* Autor y Titular: José Manuel Moreno (JMM / cyberenigma-lgtm)                 */
/* ============================================================================ */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

typedef struct {
    double ra_deg;
    double dec_deg;
} StarCoord;

typedef struct {
    StarCoord a;
    StarCoord b;
} ConstellationLine;

static void eq_to_cartesian(double ra_deg, double dec_deg, double r, double *x, double *y, double *z) {
    double ra_rad = (ra_deg * M_PI) / 180.0;
    double dec_rad = (dec_deg * M_PI) / 180.0;
    *x = r * cos(dec_rad) * sin(ra_rad);
    *y = r * sin(dec_rad);
    *z = -r * cos(dec_rad) * cos(ra_rad);
}

int main(void) {
    printf("[TITAN C99] 🌟 Generando Constelaciones Oficiales UAI para public/data/constellations_3d.json...\n");

    ConstellationLine lines[] = {
        /* === 1. OSA MAYOR (URSA MAJOR / EL CARRO) === */
        {{165.93, 61.75}, {165.46, 56.38}}, /* Dubhe - Merak */
        {{165.46, 56.38}, {178.46, 53.69}}, /* Merak - Phecda */
        {{178.46, 53.69}, {183.86, 57.03}}, /* Phecda - Megrez */
        {{183.86, 57.03}, {165.93, 61.75}}, /* Megrez - Dubhe (Cazo) */
        {{183.86, 57.03}, {193.51, 55.96}}, /* Megrez - Alioth (Mango) */
        {{193.51, 55.96}, {200.98, 54.92}}, /* Alioth - Mizar */
        {{200.98, 54.92}, {206.88, 49.31}}, /* Mizar - Alkaid */

        /* === 2. ORIÓN (ORION / EL CAZADOR Y CINTURÓN) === */
        {{88.79, 7.41},  {81.28, 6.35}},   /* Betelgeuse - Bellatrix */
        {{81.28, 6.35},  {78.63, -8.20}},  /* Bellatrix - Rigel */
        {{78.63, -8.20}, {86.94, -9.67}},  /* Rigel - Saiph */
        {{86.94, -9.67}, {88.79, 7.41}},   /* Saiph - Betelgeuse */
        {{85.19, -1.94}, {84.05, -1.20}},  /* Alnitak - Alnilam (Cinturón) */
        {{84.05, -1.20}, {83.00, -0.30}},  /* Alnilam - Mintaka */

        /* === 3. CASIOPEA (CASSIOPEIA / LA 'W') === */
        {{2.29, 59.15},   {10.13, 56.54}},  /* Caph - Schedar */
        {{10.13, 56.54},  {14.18, 60.72}},  /* Schedar - Gamma Cas (Navi) */
        {{14.18, 60.72},  {20.93, 60.23}},  /* Gamma Cas - Ruchbah */
        {{20.93, 60.23},  {26.54, 63.67}},  /* Ruchbah - Segin */

        /* === 4. OSA MENOR (URSA MINOR / POLARIS) === */
        {{37.95, 89.26},  {262.70, 86.58}}, /* Polaris - Yildun */
        {{262.70, 86.58}, {250.70, 77.79}}, /* Yildun - Anwar */
        {{250.70, 77.79}, {222.70, 74.16}}, /* Anwar - Kochab */
        {{222.70, 74.16}, {234.30, 71.83}}, /* Kochab - Pherkad */
        {{234.30, 71.83}, {250.70, 77.79}}, /* Pherkad - Anwar (Cazo Menor) */

        /* === 5. CISNE (CYGNUS / LA CRUZ DEL NORTE) === */
        {{292.68, 27.96}, {305.56, 40.26}}, /* Albireo - Sadr */
        {{305.56, 40.26}, {310.36, 45.28}}, /* Sadr - Deneb */
        {{311.55, 33.97}, {305.56, 40.26}}, /* Gienah - Sadr */
        {{305.56, 40.26}, {296.24, 45.13}}, /* Sadr - Rukh (Delta Cyg) */

        /* === 6. CRUZ DEL SUR (CRUX) === */
        {{186.65, -63.10}, {187.80, -57.11}}, /* Acrux - Gacrux */
        {{191.93, -59.69}, {183.79, -58.75}}, /* Mimosa - Delta Crucis */

        /* === 7. TAURO (TAURUS) === */
        {{68.98, 16.51},  {67.15, 19.18}},  /* Aldebaran - Ain (Híades) */
        {{68.98, 16.51},  {81.57, 28.61}},  /* Aldebaran - Elnath */
        {{67.15, 19.18},  {84.41, 21.14}},  /* Ain - Tianguan */

        /* === 8. CAN MAYOR (CANIS MAJOR / SIRIO) === */
        {{101.29, -16.72}, {95.67, -17.96}},  /* Sirius - Mirzam */
        {{101.29, -16.72}, {107.10, -26.39}}, /* Sirius - Wezen */
        {{107.10, -26.39}, {104.66, -28.97}}, /* Wezen - Adhara */
        {{107.10, -26.39}, {110.16, -29.30}}, /* Wezen - Aludra */

        /* === 9. LEO (EL LEÓN) === */
        {{152.09, 11.97}, {154.99, 19.84}}, /* Regulus - Algieba */
        {{154.99, 19.84}, {154.17, 23.42}}, /* Algieba - Adhafera */
        {{154.99, 19.84}, {168.53, 20.52}}, /* Algieba - Zosma */
        {{168.53, 20.52}, {177.26, 14.57}}, /* Zosma - Denebola */
        {{177.26, 14.57}, {169.55, 15.43}}, /* Denebola - Chertan */
        {{169.55, 15.43}, {152.09, 11.97}}, /* Chertan - Regulus */

        /* === 10. ESCORPIO (SCORPIUS) === */
        {{241.36, -19.80}, {240.08, -22.62}}, /* Graffias - Dschubba */
        {{240.08, -22.62}, {247.35, -26.43}}, /* Dschubba - Antares */
        {{247.35, -26.43}, {252.54, -34.29}}, /* Antares - Wei */
        {{252.54, -34.29}, {264.33, -42.99}}, /* Wei - Sargas */
        {{264.33, -42.99}, {263.40, -37.10}}, /* Sargas - Shaula */

        /* === 11. GÉMINIS (GEMINI / CÁSTOR Y PÓLUX) === */
        {{113.65, 31.89}, {116.33, 28.03}}, /* Castor - Pollux */
        {{113.65, 31.89}, {100.98, 25.13}}, /* Castor - Mebsuta */
        {{100.98, 25.13}, {95.74, 22.51}},  /* Mebsuta - Tejat */
        {{116.33, 28.03}, {110.21, 21.98}}, /* Pollux - Wasat */
        {{110.21, 21.98}, {99.43, 16.40}},  /* Wasat - Alhena */

        /* === 12. PEGASO (PEGASUS — CABALLO ALADO Y GRAN CUADRADO) === */
        {{346.18, 15.21}, {346.19, 28.08}}, /* Markab - Scheat (Cuerpo) */
        {{346.19, 28.08}, {2.10, 29.09}},   /* Scheat - Alpheratz (Espalda) */
        {{2.10, 29.09},   {2.30, 15.18}},   /* Alpheratz - Algenib (Grupa) */
        {{2.30, 15.18},   {346.18, 15.21}}, /* Algenib - Markab (Vientre) */
        {{346.18, 15.21}, {338.45, 10.83}}, /* Markab - Homam (Cuello) */
        {{338.45, 10.83}, {330.00, 6.20}},  /* Homam - Baham (Cabeza) */
        {{330.00, 6.20},  {326.05, 9.87}},  /* Baham - Enif (Hocico del Caballo Alado) */
        {{346.19, 28.08}, {340.75, 30.22}}, /* Scheat - Matar (Pata Delantera) */

        /* === 13. LIRA (LYRA / VEGA) === */
        {{279.23, 38.78}, {282.52, 33.36}}, /* Vega - Sheliak */
        {{282.52, 33.36}, {284.74, 32.69}}, /* Sheliak - Sulafat */
        {{284.74, 32.69}, {283.67, 36.90}}, /* Sulafat - Delta Lyrae */
        {{283.67, 36.90}, {279.23, 38.78}}, /* Delta Lyrae - Vega */

        /* === 14. BOYERO (BOOTES / ARTURO) === */
        {{213.92, 19.18}, {208.67, 18.39}}, /* Arcturus - Muphrid */
        {{213.92, 19.18}, {221.25, 27.07}}, /* Arcturus - Izar */
        {{221.25, 27.07}, {218.02, 38.31}}  /* Izar - Seginus */
    };

    int num_lines = sizeof(lines) / sizeof(lines[0]);
    double R_vault = 1000.0; /* Radio unitario normalizado */

    FILE *f = fopen("public/data/constellations_3d.json", "w");
    if (!f) {
        printf("[ERROR] No se pudo abrir public/data/constellations_3d.json para escritura.\n");
        return 1;
    }

    fprintf(f, "[\n");
    for (int i = 0; i < num_lines; i++) {
        double ax, ay, az;
        double bx, by, bz;
        eq_to_cartesian(lines[i].a.ra_deg, lines[i].a.dec_deg, R_vault, &ax, &ay, &az);
        eq_to_cartesian(lines[i].b.ra_deg, lines[i].b.dec_deg, R_vault, &bx, &by, &bz);

        fprintf(f, "  %.3f, %.3f, %.3f,\n  %.3f, %.3f, %.3f%s\n",
            ax, ay, az,
            bx, by, bz,
            (i == num_lines - 1) ? "" : ","
        );
    }
    fprintf(f, "]\n");
    fclose(f);

    printf("[TITAN C99] 🚀 ¡Éxito! %d segmentos de constelaciones IAU reales generados en public/data/constellations_3d.json.\n", num_lines);
    return 0;
}
