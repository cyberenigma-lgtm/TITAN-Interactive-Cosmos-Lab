/*
 * ==============================================================================
 * TITAN COSMOS ENGINE — GENERADOR CÓSMICO DETERMINISTA C99 (AVX2/FMA READY)
 * Reemplazo 100% Nativo en ANSI C99 de generate_cosmic_web.py
 * Arquitectura: UPL / Silicio Nativo (Cero Dependencias Python)
 * Autor: Jose Manuel Moreno | TITAN Engine UPL+
 * ==============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <stdint.h>
#include <time.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

#define NUM_GALAXIES_PER_QUADRANT 62500
#define MACRO_RADIUS 8000000.0f
#define LOCAL_VOID_RADIUS 200000.0f
#define FREQ 0.000005f
#define OUTPUT_FILE "public/data/cosmic_web.bin"

typedef struct {
    float x, y, z;
} GalaxyPoint;

static inline float randf01() {
    return (float)rand() / (float)RAND_MAX;
}

static inline float randf_range(float a, float b) {
    return a + (b - a) * randf01();
}

int main(void) {
    printf("[TITAN C99] 🌌 Generador Nativo de Red Cósmica (500.000 Galaxias Filamentosas)...\n");
    printf("[TITAN C99] 🛡️  Cero dependencias de Python. Compilación pura ANSI C99.\n");

    srand(1054); // Semilla determinista astrofísica

    GalaxyPoint *base = (GalaxyPoint*)malloc(NUM_GALAXIES_PER_QUADRANT * sizeof(GalaxyPoint));
    if (!base) {
        fprintf(stderr, "Error: No se pudo asignar memoria para cuadrante base.\n");
        return 1;
    }

    size_t count = 0;
    while (count < NUM_GALAXIES_PER_QUADRANT) {
        float theta = randf_range(0.0f, (float)(M_PI / 2.0));
        float phi = acosf(randf_range(0.0f, 1.0f));
        float r = LOCAL_VOID_RADIUS + (MACRO_RADIUS - LOCAL_VOID_RADIUS) * powf(randf01(), 1.5f);

        float x = r * sinf(phi) * cosf(theta);
        float y = r * sinf(phi) * sinf(theta);
        float z = r * cosf(phi);

        float qx = x * FREQ;
        float qy = y * FREQ;
        float qz = z * FREQ;

        float density = sinf(qx) * cosf(qy) + sinf(qy) * cosf(qz) + sinf(qz) * cosf(qx);
        if (density > 0.6f) {
            base[count].x = x + randf_range(-10000.0f, 10000.0f);
            base[count].y = y + randf_range(-10000.0f, 10000.0f);
            base[count].z = z + randf_range(-10000.0f, 10000.0f);
            count++;
        }
    }

    FILE *f = fopen(OUTPUT_FILE, "wb");
    if (!f) {
        fprintf(stderr, "Error: No se pudo abrir %s para escritura binaria.\n", OUTPUT_FILE);
        free(base);
        return 1;
    }

    // 8 Cuadrantes por simetría cuántica
    float signs[8][3] = {
        { 1.0f,  1.0f,  1.0f}, {-1.0f,  1.0f,  1.0f}, { 1.0f, -1.0f,  1.0f}, {-1.0f, -1.0f,  1.0f},
        { 1.0f,  1.0f, -1.0f}, {-1.0f,  1.0f, -1.0f}, { 1.0f, -1.0f, -1.0f}, {-1.0f, -1.0f, -1.0f}
    };

    size_t total_written = 0;
    for (int s = 0; s < 8; s++) {
        float sx = signs[s][0];
        float sy = signs[s][1];
        float sz = signs[s][2];
        for (size_t i = 0; i < count; i++) {
            float p[3] = { base[i].x * sx, base[i].y * sy, base[i].z * sz };
            fwrite(p, sizeof(float), 3, f);
            total_written++;
        }
    }

    // Galaxias Ancla del Grupo Local
    float anclas[4][3] = {
        { 2500000.0f,  100000.0f, -500000.0f}, // Andrómeda
        {-160000.0f,  -50000.0f, -100000.0f}, // Gran Nube de Magallanes
        {-200000.0f,  -80000.0f,  -50000.0f}, // Pequeña Nube de Magallanes
        { 3000000.0f, -200000.0f,  800000.0f}  // Galaxia del Triángulo
    };

    for (int a = 0; a < 4; a++) {
        fwrite(anclas[a], sizeof(float), 3, f);
        total_written++;
    }

    fclose(f);
    free(base);

    printf("[TITAN C99] 🚀 ¡Éxito! %zu galaxias grabadas en %s (Tamaño: %.2f MB)\n",
           total_written, OUTPUT_FILE, (total_written * 3 * sizeof(float)) / (1024.0 * 1024.0));
    return 0;
}
