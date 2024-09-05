//David Amaya
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// sorts the the time and name by greatest to smallest
int time_Sort(double x[], char y[4][12]) {
    int i, j;
    double temp;
    char *temp2;

    for (i = 0; i < 10; i++) {
        for (j = i + 1; j < 10; j++) {
            if (x[i] > x[j]) {
                temp = x[i];
                x[i] = x[j];
                x[j] = temp;


                for (int t = 0; t < 12; t++) {
                    char temp;
                    temp = *(y[i] + t);
                    *(y[i] + t) = *(y[j] + t);
                    *(y[j] + t) = temp;
                }
            }
        }
    }
}

int main(int argc, char *argv[]) {
    char name[10][12];
    double x[10];
    double y;
    int rank;

    // prompt
    for (int i = 0; i < 10; i++) {
        printf("\n\n#%d\nEnter Name:\n", i + 1);
        scanf("%s", name[i]);

        printf("Enter Finish Time:\n");
        scanf("%lf", &y);

        x[i] = y;
    }

    // sort function
    time_Sort(x, name);

    printf("\n\nRanking: ");
    scanf("%d", &rank);

    // Ranking output
    printf("\nRace Rankings\n\n");

    int place[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    for (int i = 0; i < rank; i++) {
        printf("%d) %s - %2.2fs\n\n", place[i], name[i], x[i]);
    }

    return 0;
}