#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

int main(void) {
    FILE *f = fopen("public/data/hygdata_v3.csv", "r");
    if (!f) {
        printf("Error opening hygdata_v3.csv\n");
        return 1;
    }

    char line[1024];
    // Read header
    if (!fgets(line, sizeof(line), f)) return 1;

    // Search for Polaris, Sirius, Betelgeuse
    while (fgets(line, sizeof(line), f)) {
        if (strstr(line, "Polaris") || strstr(line, "Betelgeuse") || strstr(line, "Sirius") || strstr(line, "Vega")) {
            printf("%s", line);
        }
    }
    fclose(f);
    return 0;
}
