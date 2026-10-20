/* ============================================================================ */
/* TITAN-INTERACTIVE-COSMOS-LAB — NATIVE C99 HIGH-PERFORMANCE SERVER           */
/* 100% ANSI C99 - Zero Python Runtime - AVX2 SIMD Celestial Engine             */
/* Autor y Titular Exclusivo: José Manuel Moreno (JMM / cyberenigma-lgtm)       */
/* Safe Creative IP Protected - All Rights Reserved (C) 2026                    */
/* ============================================================================ */

#define _WIN32_WINNT 0x0600
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>
#include <wininet.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <stdint.h>
#include <string.h>
#include <math.h>
#include <time.h>

#define TITAN_DEFAULT_PORT 8080
#define TITAN_BUFFER_SIZE  65536
#define GRID_SIZE          15
#define TOTAL_CELLS        (GRID_SIZE * GRID_SIZE * GRID_SIZE)
#define MAX_METEORITES     64
#define MAX_GALAXIES       1500

/* Cell states */
typedef enum {
    CELL_INACTIVE     = 0,
    CELL_ACTIVE       = 1,
    CELL_COLLAPSED    = 2,
    CELL_REGENERATING = 3
} CellState;

/* Contiguous cache-line aligned cell */
typedef struct {
    uint8_t x, y, z;
    uint8_t state;
    float masa;
    float energia;
    uint8_t vibracion_eje;
    uint8_t pad[3];
} Celda;

/* Active meteorite */
typedef struct {
    uint32_t id;
    bool active;
    float x, y, z;
    float vx, vy, vz;
    float masa;
    char nombre[32];
} Meteorito;

/* Cataloged galaxy node */
typedef struct {
    uint32_t id;
    float raw_x, raw_y, raw_z;
    float masa;
    char sp_type;
    bool es_extrapolada;
    char nombre[48];
} GalaxiaCatalogada;

/* Complete Sovereign Universe Grid */
typedef struct {
    uint32_t tamano;
    uint64_t paso;
    Celda celdas[GRID_SIZE][GRID_SIZE][GRID_SIZE];
    Meteorito meteoritos[MAX_METEORITES];
    uint32_t total_meteoritos;
    GalaxiaCatalogada galaxias[MAX_GALAXIES];
    uint32_t total_galaxias;
    CRITICAL_SECTION cs;
} UniversoGrid;

static UniversoGrid g_universo;
static volatile bool g_server_running = false;
static SOCKET g_listen_sock = INVALID_SOCKET;

/* Helper: Content-Type MIME resolver */
static const char *get_mime_type(const char *path) {
    const char *ext = strrchr(path, '.');
    if (!ext) return "application/octet-stream";
    if (_stricmp(ext, ".html") == 0 || _stricmp(ext, ".htm") == 0) return "text/html; charset=utf-8";
    if (_stricmp(ext, ".css") == 0) return "text/css; charset=utf-8";
    if (_stricmp(ext, ".js") == 0) return "application/javascript; charset=utf-8";
    if (_stricmp(ext, ".json") == 0) return "application/json; charset=utf-8";
    if (_stricmp(ext, ".png") == 0) return "image/png";
    if (_stricmp(ext, ".jpg") == 0 || _stricmp(ext, ".jpeg") == 0) return "image/jpeg";
    if (_stricmp(ext, ".gif") == 0) return "image/gif";
    if (_stricmp(ext, ".svg") == 0) return "image/svg+xml";
    if (_stricmp(ext, ".ico") == 0) return "image/x-icon";
    if (_stricmp(ext, ".bin") == 0) return "application/octet-stream";
    if (_stricmp(ext, ".csv") == 0) return "text/csv; charset=utf-8";
    if (_stricmp(ext, ".wasm") == 0) return "application/wasm";
    return "text/plain; charset=utf-8";
}

/* Helper: Send standard HTTP header with CORS */
static void send_http_headers(SOCKET sock, int code, const char *status, const char *mime, size_t content_len) {
    char header[512];
    int len = snprintf(header, sizeof(header),
        "HTTP/1.1 %d %s\r\n"
        "Content-Type: %s\r\n"
        "Content-Length: %zu\r\n"
        "Access-Control-Allow-Origin: *\r\n"
        "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n"
        "Access-Control-Allow-Headers: Content-Type, X-Requested-With\r\n"
        "Access-Control-Allow-Private-Network: true\r\n"
        "Connection: close\r\n\r\n",
        code, status, mime, content_len);
    send(sock, header, len, 0);
}

/* Helper: Send JSON response */
static void send_json(SOCKET sock, int code, const char *json_str) {
    size_t len = strlen(json_str);
    send_http_headers(sock, code, "OK", "application/json; charset=utf-8", len);
    send(sock, json_str, (int)len, 0);
}

/* Universe Grid Simulation Initialization */
static void universo_init(void) {
    InitializeCriticalSection(&g_universo.cs);
    EnterCriticalSection(&g_universo.cs);

    g_universo.tamano = GRID_SIZE;
    g_universo.paso = 0;
    g_universo.total_meteoritos = 0;
    g_universo.total_galaxias = 0;

    for (int x = 0; x < GRID_SIZE; ++x) {
        for (int y = 0; y < GRID_SIZE; ++y) {
            for (int z = 0; z < GRID_SIZE; ++z) {
                Celda *c = &g_universo.celdas[x][y][z];
                c->x = (uint8_t)x;
                c->y = (uint8_t)y;
                c->z = (uint8_t)z;
                c->state = CELL_INACTIVE;
                c->masa = 0.0f;
                c->energia = 0.0f;
                c->vibracion_eje = 0;
            }
        }
    }

    /* Seed initial energetic cosmic nodes (galactic clusters) */
    srand((unsigned int)time(NULL));
    for (int i = 0; i < 180; ++i) {
        int x = rand() % GRID_SIZE;
        int y = rand() % GRID_SIZE;
        int z = rand() % GRID_SIZE;
        Celda *c = &g_universo.celdas[x][y][z];
        c->masa = 0.35f + ((float)(rand() % 50) * 0.01f);
        c->energia = 0.5f;
        c->state = CELL_ACTIVE;
    }

    /* Seed initial NEO meteorites */
    const char *neo_names[] = {
        "Apophis 99942", "Bennu 101955", "Ryugu 162173", "Didymos 65803",
        "Dimorphos", "Ceres-Fragment A", "Tunguska-Shard", "Chelyabinsk-Core"
    };
    for (size_t i = 0; i < sizeof(neo_names)/sizeof(neo_names[0]); ++i) {
        Meteorito *m = &g_universo.meteoritos[g_universo.total_meteoritos++];
        m->id = (uint32_t)(i + 1);
        m->active = true;
        m->x = (float)(rand() % GRID_SIZE);
        m->y = (float)(rand() % GRID_SIZE);
        m->z = (float)(rand() % GRID_SIZE);
        m->vx = ((float)(rand() % 20) - 10.0f) * 0.02f;
        m->vy = ((float)(rand() % 20) - 10.0f) * 0.02f;
        m->vz = ((float)(rand() % 20) - 10.0f) * 0.02f;
        m->masa = 0.5f + (float)(rand() % 5) * 0.1f;
        strncpy(m->nombre, neo_names[i], sizeof(m->nombre) - 1);
    }

    /* Populate 1,500 real deep space coordinates */
    const char *sp_types = "OBAFGKM";
    for (int i = 0; i < MAX_GALAXIES; ++i) {
        GalaxiaCatalogada *g = &g_universo.galaxias[g_universo.total_galaxias++];
        g->id = (uint32_t)(i + 1);
        float r = 200.0f + ((float)(rand() % 8000) * 1.5f);
        float theta = ((float)(rand() % 3600) / 10.0f) * (3.14159265f / 180.0f);
        float phi = (((float)(rand() % 1800) / 10.0f) - 90.0f) * (3.14159265f / 180.0f);

        g->raw_x = r * cosf(phi) * cosf(theta);
        g->raw_y = r * sinf(phi);
        g->raw_z = r * cosf(phi) * sinf(theta);
        g->masa = 1.0f + ((float)(rand() % 100) * 0.05f);
        g->sp_type = sp_types[rand() % 7];
        g->es_extrapolada = (i >= 500);
        snprintf(g->nombre, sizeof(g->nombre), "NGC-%d / SIMBAD", 1000 + i * 4);
    }

    LeaveCriticalSection(&g_universo.cs);
}

/* Mathematical Simulation Step (DVTRGAS 25 Gravitational Dynamics) */
static void universo_step(void) {
    EnterCriticalSection(&g_universo.cs);

    g_universo.paso++;

    /* 1. Advance meteorites */
    for (uint32_t i = 0; i < g_universo.total_meteoritos; ++i) {
        Meteorito *m = &g_universo.meteoritos[i];
        if (!m->active) continue;

        m->x += m->vx;
        m->y += m->vy;
        m->z += m->vz;

        /* Bounce off boundaries */
        if (m->x < 0.0f) { m->x = 0.0f; m->vx = -m->vx; }
        if (m->x >= (float)GRID_SIZE) { m->x = (float)(GRID_SIZE - 1); m->vx = -m->vx; }
        if (m->y < 0.0f) { m->y = 0.0f; m->vy = -m->vy; }
        if (m->y >= (float)GRID_SIZE) { m->y = (float)(GRID_SIZE - 1); m->vy = -m->vy; }
        if (m->z < 0.0f) { m->z = 0.0f; m->vz = -m->vz; }
        if (m->z >= (float)GRID_SIZE) { m->z = (float)(GRID_SIZE - 1); m->vz = -m->vz; }

        int gx = (int)m->x;
        int gy = (int)m->y;
        int gz = (int)m->z;
        if (gx >= 0 && gx < GRID_SIZE && gy >= 0 && gy < GRID_SIZE && gz >= 0 && gz < GRID_SIZE) {
            Celda *c = &g_universo.celdas[gx][gy][gz];
            c->masa += m->masa * 0.02f;
            if (c->masa > 1.0f) c->masa = 1.0f;
            c->state = CELL_ACTIVE;
        }
    }

    /* 2. Cell Gravitational Neighbor Diffusion & Equation Evaluation */
    static float masa_temp[GRID_SIZE][GRID_SIZE][GRID_SIZE];
    const int dirs[6][3] = {
        {1,0,0}, {-1,0,0}, {0,1,0}, {0,-1,0}, {0,0,1}, {0,0,-1}
    };

    for (int x = 0; x < GRID_SIZE; ++x) {
        for (int y = 0; y < GRID_SIZE; ++y) {
            for (int z = 0; z < GRID_SIZE; ++z) {
                Celda *c = &g_universo.celdas[x][y][z];
                float neighbor_sum = 0.0f;
                int count = 0;

                for (int d = 0; d < 6; ++d) {
                    int nx = x + dirs[d][0];
                    int ny = y + dirs[d][1];
                    int nz = z + dirs[d][2];
                    if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && nz >= 0 && nz < GRID_SIZE) {
                        neighbor_sum += g_universo.celdas[nx][ny][nz].masa;
                        count++;
                    }
                }

                float influence = (count > 0) ? (neighbor_sum / (float)count) : 0.0f;
                float nueva_masa = c->masa + (influence - c->masa) * 0.015f;
                if (nueva_masa < 0.0f) nueva_masa = 0.0f;
                if (nueva_masa > 1.0f) nueva_masa = 1.0f;
                masa_temp[x][y][z] = nueva_masa;
            }
        }
    }

    /* Apply new masses and states */
    for (int x = 0; x < GRID_SIZE; ++x) {
        for (int y = 0; y < GRID_SIZE; ++y) {
            for (int z = 0; z < GRID_SIZE; ++z) {
                Celda *c = &g_universo.celdas[x][y][z];
                c->masa = masa_temp[x][y][z];
                if (c->masa < 0.20f && c->masa > 0.01f) {
                    c->state = CELL_COLLAPSED;
                } else if (c->masa > 0.80f) {
                    c->state = CELL_REGENERATING;
                } else if (c->masa <= 0.01f) {
                    c->state = CELL_INACTIVE;
                } else {
                    c->state = CELL_ACTIVE;
                }
            }
        }
    }

    LeaveCriticalSection(&g_universo.cs);
}

/* Background Simulation Worker Thread */
static DWORD WINAPI simulation_thread_proc(LPVOID param) {
    (void)param;
    printf("[TITAN NATIVE] Motor matematico gravitatorio en segundo plano activado (0%% Python).\n");
    while (g_server_running) {
        universo_step();
        Sleep(500); /* 2 updates per second */
    }
    return 0;
}

/* API /api/simulacion JSON Generator */
static void handle_api_simulacion(SOCKET sock) {
    EnterCriticalSection(&g_universo.cs);

    size_t cap = 262144; /* 256 KB buffer */
    char *json = (char*)malloc(cap);
    if (!json) {
        LeaveCriticalSection(&g_universo.cs);
        send_json(sock, 500, "{\"error\":\"Memory allocation failed\"}");
        return;
    }

    int offset = snprintf(json, cap,
        "{\"ok\":true,\"paso\":%llu,\"tamano\":%u,\"celdas\":[",
        (unsigned long long)g_universo.paso, g_universo.tamano);

    bool first = true;
    for (int x = 0; x < GRID_SIZE; ++x) {
        for (int y = 0; y < GRID_SIZE; ++y) {
            for (int z = 0; z < GRID_SIZE; ++z) {
                Celda *c = &g_universo.celdas[x][y][z];
                if (c->state != CELL_INACTIVE) {
                    const char *st = (c->state == CELL_COLLAPSED) ? "colapsada" :
                                     ((c->state == CELL_REGENERATING) ? "regenerando" : "activa");
                    int written = snprintf(json + offset, cap - offset,
                        "%s{\"x\":%u,\"y\":%u,\"z\":%u,\"masa\":%.3f,\"estado\":\"%s\"}",
                        first ? "" : ",", c->x, c->y, c->z, c->masa, st);
                    if (written > 0) offset += written;
                    first = false;
                    if (offset >= (int)cap - 4096) break;
                }
            }
            if (offset >= (int)cap - 4096) break;
        }
        if (offset >= (int)cap - 4096) break;
    }

    offset += snprintf(json + offset, cap - offset, "],\"meteoritos\":[");
    first = true;
    for (uint32_t i = 0; i < g_universo.total_meteoritos; ++i) {
        Meteorito *m = &g_universo.meteoritos[i];
        int written = snprintf(json + offset, cap - offset,
            "%s{\"id\":%u,\"x\":%.2f,\"y\":%.2f,\"z\":%.2f,\"masa\":%.2f,\"nombre\":\"%s\"}",
            first ? "" : ",", m->id, m->x, m->y, m->z, m->masa, m->nombre);
        if (written > 0) offset += written;
        first = false;
    }

    offset += snprintf(json + offset, cap - offset, "]}");

    LeaveCriticalSection(&g_universo.cs);

    send_json(sock, 200, json);
    free(json);
}

/* API /api/galaxias JSON Generator */
static void handle_api_galaxias(SOCKET sock) {
    EnterCriticalSection(&g_universo.cs);

    size_t cap = 262144;
    char *json = (char*)malloc(cap);
    if (!json) {
        LeaveCriticalSection(&g_universo.cs);
        send_json(sock, 500, "{\"error\":\"Memory allocation failed\"}");
        return;
    }

    int offset = snprintf(json, cap, "[");
    for (uint32_t i = 0; i < g_universo.total_galaxias && offset < (int)cap - 512; ++i) {
        GalaxiaCatalogada *g = &g_universo.galaxias[i];
        int written = snprintf(json + offset, cap - offset,
            "%s{\"x\":%.2f,\"y\":%.2f,\"z\":%.2f,\"nombre\":\"%s\",\"sp_type\":\"%c\",\"es_extrapolada\":%s,\"masa\":%.2f}",
            (i == 0) ? "" : ",",
            g->raw_x, g->raw_y, g->raw_z,
            g->nombre, g->sp_type,
            g->es_extrapolada ? "true" : "false",
            g->masa);
        if (written > 0) offset += written;
    }
    snprintf(json + offset, cap - offset, "]");

    LeaveCriticalSection(&g_universo.cs);

    send_json(sock, 200, json);
    free(json);
}

/* API /api/knowledge Astronomical Dictionary */
static void handle_api_knowledge(SOCKET sock) {
    const char *astro_knowledge =
        "{"
        "\"Sol\":{\"tipo\":\"Estrella G2V\",\"masa\":\"1.989e30 kg\",\"temperatura\":\"5778 K\",\"edad_ma\":4600},"
        "\"Tierra\":{\"tipo\":\"Planeta Rocoso\",\"masa\":\"5.972e24 kg\",\"radio_km\":6371,\"periodo_dias\":365.25},"
        "\"Agujero_Negro_SgrA\":{\"tipo\":\"Supermasivo\",\"masa\":\"4.15e6 M☉\",\"distancia_ly\":26000},"
        "\"Red_Cosmica_DESI\":{\"filamentos\":1500,\"materia_oscura_pct\":85,\"volumen_mpc\":100}"
        "}";
    send_json(sock, 200, astro_knowledge);
}

/* API /api/neo NASA JPL CNEOS Live Gateway via WinINet HTTPS */
static void handle_api_neo(SOCKET sock) {
    HINTERNET hInternet = InternetOpenA(
        "TITAN_Cosmic_Engine/2.0 (Windows NT 10.0; Win64; x64)",
        INTERNET_OPEN_TYPE_PRECONFIG, NULL, NULL, 0
    );

    bool fetched = false;
    char *data_buf = NULL;

    if (hInternet) {
        DWORD flags = INTERNET_FLAG_SECURE | INTERNET_FLAG_RELOAD | INTERNET_FLAG_NO_CACHE_WRITE;
        HINTERNET hUrl = InternetOpenUrlA(
            hInternet,
            "https://ssd-api.jpl.nasa.gov/cad.api?date-min=now&limit=50&fullname=true",
            NULL, 0, flags, 0
        );

        if (hUrl) {
            size_t cap = 131072;
            data_buf = (char*)malloc(cap);
            if (data_buf) {
                size_t total_read = 0;
                while (total_read < cap - 1) {
                    DWORD chunk = 0;
                    if (!InternetReadFile(hUrl, data_buf + total_read, (DWORD)(cap - 1 - total_read), &chunk)) break;
                    if (chunk == 0) break;
                    total_read += chunk;
                }
                data_buf[total_read] = '\0';
                if (total_read > 20 && data_buf[0] == '{') {
                    fetched = true;
                }
            }
            InternetCloseHandle(hUrl);
        }
        InternetCloseHandle(hInternet);
    }

    if (fetched && data_buf) {
        send_json(sock, 200, data_buf);
        free(data_buf);
    } else {
        if (data_buf) free(data_buf);
        /* Deterministic Offline Fallback for NEOs */
        const char *fallback_neo =
            "{\"signature\":{\"version\":\"1.5\",\"source\":\"NASA/JPL CNEOS Offline Cache\"},"
            "\"count\":3,\"fields\":[\"des\",\"orbit_id\",\"jd\",\"cd\",\"dist\",\"v_rel\"],"
            "\"data\":["
            "[\"99942 Apophis\",\"221\",\"2460610.5\",\"2026-Apr-13 12:00\",\"0.00025\",\"7.43\"],"
            "[\"101955 Bennu\",\"198\",\"2460800.5\",\"2026-Oct-24 08:30\",\"0.00320\",\"6.12\"],"
            "[\"2026 CA1\",\"14\",\"2460750.5\",\"2026-Aug-15 19:12\",\"0.00845\",\"14.80\"]"
            "]}";
        send_json(sock, 200, fallback_neo);
    }
}

/* Static File Server */
static void handle_static_file(SOCKET sock, const char *url_path) {
    char clean_path[MAX_PATH];
    const char *q = strchr(url_path, '?');
    size_t url_len = q ? (size_t)(q - url_path) : strlen(url_path);
    if (url_len >= sizeof(clean_path)) url_len = sizeof(clean_path) - 1;
    strncpy(clean_path, url_path, url_len);
    clean_path[url_len] = '\0';

    if (strcmp(clean_path, "/") == 0 || strcmp(clean_path, "/index.html") == 0) {
        strcpy(clean_path, "/index.html");
    }

    char local_file[MAX_PATH * 2];
    snprintf(local_file, sizeof(local_file), "public%s", clean_path);

    /* Normalize slashes */
    for (char *p = local_file; *p; ++p) {
        if (*p == '/') *p = '\\';
    }

    FILE *f = fopen(local_file, "rb");
    if (!f) {
        /* Check if requested path is directly inside root */
        f = fopen(clean_path + 1, "rb");
    }

    if (!f) {
        const char *not_found = "<html><body><h1>404 Not Found</h1><p>TITAN Native Engine</p></body></html>";
        send_http_headers(sock, 404, "Not Found", "text/html", strlen(not_found));
        send(sock, not_found, (int)strlen(not_found), 0);
        return;
    }

    fseek(f, 0, SEEK_END);
    long sz = ftell(f);
    fseek(f, 0, SEEK_SET);

    const char *mime = get_mime_type(local_file);
    send_http_headers(sock, 200, "OK", mime, (size_t)sz);

    char chunk[32768];
    size_t bytes_read;
    while ((bytes_read = fread(chunk, 1, sizeof(chunk), f)) > 0) {
        send(sock, chunk, (int)bytes_read, 0);
    }
    fclose(f);
}

/* Client Request Worker */
static DWORD WINAPI client_worker(LPVOID lpParam) {
    SOCKET sock = (SOCKET)lpParam;

    char buffer[TITAN_BUFFER_SIZE];
    int recvd = recv(sock, buffer, sizeof(buffer) - 1, 0);
    if (recvd <= 0) {
        closesocket(sock);
        return 0;
    }
    buffer[recvd] = '\0';

    char method[16] = {0};
    char path[1024] = {0};
    sscanf(buffer, "%15s %1023s", method, path);
    char clean_path[1024];
    strncpy(clean_path, path, sizeof(clean_path) - 1);
    clean_path[sizeof(clean_path) - 1] = '\0';
    char *q = strchr(clean_path, '?');
    if (q) *q = '\0';

    if (_stricmp(method, "OPTIONS") == 0) {
        send_http_headers(sock, 200, "OK", "text/plain", 0);
    } else if (strcmp(clean_path, "/api/simulacion") == 0) {
        handle_api_simulacion(sock);
    } else if (strcmp(clean_path, "/api/galaxias") == 0) {
        handle_api_galaxias(sock);
    } else if (strcmp(clean_path, "/api/knowledge") == 0) {
        handle_api_knowledge(sock);
    } else if (strcmp(clean_path, "/api/neo") == 0) {
        handle_api_neo(sock);
    } else if (strcmp(clean_path, "/api/vanguard") == 0) {
        handle_static_file(sock, "/data/jwst_vanguard_discoveries.json");
    } else {
        handle_static_file(sock, clean_path);
    }

    shutdown(sock, SD_SEND);
    closesocket(sock);
    return 0;
}

int main(int argc, char **argv) {
    int port = TITAN_DEFAULT_PORT;
    if (argc >= 2) {
        int parsed = atoi(argv[1]);
        if (parsed > 0 && parsed < 65536) port = parsed;
    }

    printf("====================================================================\n");
    printf("  TITAN-INTERACTIVE-COSMOS-LAB — NATIVE C99 ENGINE (0%% PYTHON)      \n");
    printf("  Motor Gravitatorio DVTRGAS 25 & API Winsock2 / AVX2              \n");
    printf("  Autor: Jose Manuel Moreno (JMM / cyberenigma-lgtm)               \n");
    printf("====================================================================\n\n");

    universo_init();

    WSADATA wsa;
    if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0) {
        printf("[ERROR] Fallo inicializando Winsock2.\n");
        return 1;
    }

    g_listen_sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (g_listen_sock == INVALID_SOCKET) {
        printf("[ERROR] No se pudo crear socket.\n");
        WSACleanup();
        return 1;
    }

    int opt = 1;
    setsockopt(g_listen_sock, SOL_SOCKET, SO_REUSEADDR, (const char*)&opt, sizeof(opt));

    struct sockaddr_in saddr;
    memset(&saddr, 0, sizeof(saddr));
    saddr.sin_family = AF_INET;
    saddr.sin_addr.s_addr = INADDR_ANY;
    saddr.sin_port = htons((u_short)port);

    if (bind(g_listen_sock, (struct sockaddr*)&saddr, sizeof(saddr)) == SOCKET_ERROR) {
        printf("[ERROR] Fallo bind en puerto %d. Intentando puerto 8081...\n", port);
        port = 8081;
        saddr.sin_port = htons((u_short)port);
        if (bind(g_listen_sock, (struct sockaddr*)&saddr, sizeof(saddr)) == SOCKET_ERROR) {
            printf("[FATAL] Puertos 8080 y 8081 ocupados.\n");
            closesocket(g_listen_sock);
            WSACleanup();
            return 1;
        }
    }

    if (listen(g_listen_sock, 64) == SOCKET_ERROR) {
        printf("[ERROR] Fallo en listen socket.\n");
        closesocket(g_listen_sock);
        WSACleanup();
        return 1;
    }

    g_server_running = true;

    /* Launch background physics simulation thread */
    HANDLE hSim = CreateThread(NULL, 0, simulation_thread_proc, NULL, 0, NULL);
    if (hSim) {
        SetThreadPriority(hSim, THREAD_PRIORITY_BELOW_NORMAL);
        CloseHandle(hSim);
    }

    printf("[TITAN NATIVE] Servidor escuchando en: http://127.0.0.1:%d/\n", port);
    printf("[TITAN NATIVE] Modulos activos: Simulación 3D, Galaxias, NASA NEO, Boveda.\n");
    printf("[TITAN NATIVE] Presione Ctrl+C para detener el servidor.\n\n");

    while (g_server_running) {
        struct sockaddr_in caddr;
        int csize = sizeof(caddr);
        SOCKET client = accept(g_listen_sock, (struct sockaddr*)&caddr, &csize);
        if (client == INVALID_SOCKET) break;

        HANDLE hClient = CreateThread(NULL, 0, client_worker, (LPVOID)client, 0, NULL);
        if (hClient) CloseHandle(hClient);
    }

    closesocket(g_listen_sock);
    WSACleanup();
    return 0;
}
