#include <stdio.h>
#include <stdlib.h>

void menu(double x[]){
    for(int i = 0; i < 4; i++){
        printf("\t$%2.2f", x[i]);
    }
}

int main(int argc, char *argv[]) {
    double cheese[] = {8.99, 10.99, 12.99, 15.49};

    double veggie[] = {10.99, 12.99, 14.99, 16.49};

    double hawaiian[] = {11.99, 13.79, 15.49, 17.79};

    double chicken_club[] = {12.29, 13.99, 15.99, 18.49};

    double chicken_bacon_ranch[] = {12.29, 13.99, 15.99, 18.49};

    double bbq_chicken[] = {12.59, 14.29, 16.49, 18.99};

    double the_deluxe[] = {12.99, 14.79, 16.99, 19.49};

    double meat_lover[] = {12.99, 14.79, 16.99, 19.49};


    printf("PIZZA SPECIALTIES\n");

    printf("\t\t\t\tSM\tMD\tLG\tXLG");

    printf("\nCheese\t\t\t");
    menu(cheese);
    printf("\n~the classic and the best~");

    printf("\n\nVeggie\t\t\t");
    menu(veggie);
    printf("\n~any (5) veggie toppings~");

    printf("\n\nHawaiian\t\t");
    menu(hawaiian);
    printf("\n~pineapple & ham~");

    printf("\n\nChicken Club\t\t");
    menu(chicken_club);
    printf("\n~chicken, tomatoes, & cheese~");

    printf("\n\nChicken Bacon Ranch\t");
    menu(chicken_bacon_ranch);
    printf("\n~chicken, tomatoes, & ranch~");

    printf("\n\nBBQ Chicken\t\t");
   menu(bbq_chicken);
    printf("\n~chicken & bbq sauce~");

    printf("\n\nThe Deluxe\t\t");
    menu(the_deluxe);
    printf("\n~any three (3) meat plus any three (3) veggie toppings~");

    printf("\n\nMeat Lover\t\t");
    menu(meat_lover);
    printf("\n~pepperoni, sausage, bacon, ham~");

    printf("\n\nMENU PROVIDED BY %s, %s\n", argv[2], argv[1]);

    return 0;
}