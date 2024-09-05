#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char Manufacturer[12];
    char make[12];
    char model[20];
    float price;
} Cars;

//sort struct 
void sort(Cars brand[10]){
    int i, j, min;
    Cars temp;

    for (i = 0; i < 10 - 1; i++) {
        min = i;
        for(j = i + 1; j < 10; j++){
            if(brand[j].price < brand[i].price){
                min = j;
                if(min != i){
                    temp = brand[min];
                    brand[min] = brand[i];
                    brand[i] = temp;
                }
            }
        }
    }
}

//calc monhly payments
double monthly(float interest, double principle){
    double payment;
    payment = principle + (principle * interest * 5);
    payment = payment / 60;
    return payment;
}


//prompts models after manufactor select
void car(Cars car[10], int idx, double interest, double down){
    int choice;
    int place[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    printf("Available Make/Model:\n");
    for(int i = 0; i < idx; i++){
            printf("%d)%s %s - $%5.2f\n", place[i], car[i].make, car[i].model, car[i].price);
        
    }
    printf("\nSelect Make/Model: ");
    scanf("%d", &choice);
    double payment;

    int j = 1;
    for(int i = 0; i < 10; i++){
            if(choice == j){
            int p = car[i].price - down;
            payment = monthly(interest, p);
            printf("You sleceted the %s %s. Your monthly payment is $%6.2f\n", car[i].make, car[i].model, payment);
            }
            j += 1;
    }
}

//calc affordable model
int affordable(Cars car[10], float interest, double down, double max){
    int i = 0;
    while(i < 10){
    double principle, payment;
    principle = car[i].price - down;
    payment = monthly(interest, principle);
    if (payment > max){
        return i;
    }
    i++;
    }
    return i;
}

int main(int argc, char *argv[]){

    Cars toyota[10] = {
        {"Toyota", "Toyota", "Corolla", 21550 }, 
        {"Toyota", "Toyota", "Camry", 25945 },
        {"Toyota", "Toyota", "Avalon", 36825 },
        {"Toyota", "Toyota", "Mirai", 49500 },
        {"Toyota", "Toyota", "Sequoia", 58300 },
        {"Toyota", "Toyota", "Tacoma", 27250 },
        {"Toyota", "Toyota", "Tundra", 36965 },
        {"Toyota", "Lexus", "IS", 40585 },
        {"Toyota", "Lexus", "ES", 42490 },
        {"Toyota", "Lexus", "GX", 57575 }
        };
    Cars chevrolet[10] = {
        {"Chevrolet", "Chevy", "Trailblazer", 22100 }, 
        {"Chevrolet", "Chevy", "Camaro", 26100 },
        {"Chevrolet", "Chevy", "Equinox", 26600 },
        {"Chevrolet", "Chevy", "Traverse", 34520 },
        {"Chevrolet", "Chevy", "Tahoe", 54200 },
        {"Chevrolet", "Chevy", "Suburban", 56900 },
        {"Chevrolet", "toyota", "Corvette", 64500 },
        {"Chevrolet", "Chevy", "Spark", 13600 },
        {"Chevrolet", "Chevy", "Trax", 21700 },
        {"Chevrolet", "Chevy", "Malibu", 23400 }
        };
    Cars nissan[10] = {
        {"Nissan", "Nissan", "Versa", 18990 }, 
        {"Nissan", "Nissan", "Sentra", 22700 },
        {"Nissan", "Nissan", "Altima", 35385 },
        {"Nissan", "Nissan", "Maxima", 43300 },
        {"Nissan", "Nissan", "Pathfinder", 50660 },
        {"Nissan", "Nissan", "Rogue", 38640 },
        {"Nissan", "Nissan", "Murano", 46910 },
        {"Nissan", "Infiniti", "Q50", 49150 },
        {"Nissan", "Infiniti", "QX55", 49150 },
        {"Nissan", "Infiniti", "QX80", 72700 }
        };
    Cars BMW[10] = {
        {"BMW", "BMW", "2 Series Coupe", 38050 }, 
        {"BMW", "BMW", "3 Series Sedan", 48220 },
        {"BMW", "BMW", "4 Series Convertible", 59320 },
        {"BMW", "BMW", "5 Series Sedan", 55175 },
        {"BMW", "BMW", "7 Series Sedan", 93400 },
        {"BMW", "BMW", "X1", 39700 },
        {"BMW", "BMW", "X3", 46050 },
        {"BMW", "BMW", "X4", 54050 },
        {"BMW", "BMW", "X5", 75400 },
        {"BMW", "BMW", "X7", 77850 }
        };
    Cars volkswagen[10] = {
        {"Volkswagen", "VW", "Jetta", 18995 }, 
        {"Volkswagen", "VW", "Passat", 23995 },
        {"Volkswagen", "VW", "Arteon", 36995 },
        {"Volkswagen", "Audi", "Q5", 43500 },
        {"Volkswagen", "Audi", "Q3", 38700 },
        {"Volkswagen", "Audi", "S6", 73700 },
        {"Volkswagen", "Audi", "A5", 55900 },
        {"Volkswagen", "Porsche", "Panamera", 132760 },
        {"Volkswagen", "Porsche", "Macan", 69480 },
        {"Volkswagen", "Porsche", "Cayenne", 92960 }
        };
    
    double down;
    char *wage = argv[1];
    float salary = atoi(wage);
    float interest = 0, max;
    //index
    int idx1 = 0, idx2 = 0, idx3 = 0, idx4 = 0, idx5 = 0;

    //sort struct array in ascention order
    sort(toyota);
    sort(chevrolet);
    sort(nissan);
    sort(BMW);
    sort(volkswagen);

    max = (salary/12) * .15;

    //interest rate
    if(salary > 125000){
        interest = 0.0479;
    }else if(salary > 80000){
        interest = 0.0655;
    }else if(salary > 45000){
        interest = 0.0949;
    }else if(salary <= 45000){
        interest = 0.1328;
    }

//prompt
    printf("Enter down payment: ");
    scanf("%lf", &down);

    //checks for affordable cars
    idx1 = affordable(toyota, interest, down, max);
    idx2 = affordable(chevrolet, interest, down, max);
    idx3 = affordable(nissan, interest, down, max);
    idx4 = affordable(BMW, interest, down, max);
    idx5 = affordable(volkswagen, interest, down, max);

//prints available Cars
    int choice;
    printf("\nAvailable Manufacturers:\n" );

    //prints manufactor based on affordable
    if(idx1 != 0 && idx2 != 0 && idx3 != 0 && idx4 != 0 && idx5 != 0){
        printf("1)Toyota\t2)Chervolet\t3)Nissan\t4)BMW\t\t5)Volkswagen\n");
        printf("Select Manufactor: ");
        scanf("%d", &choice);
        switch (choice){
            case 1 :
            car(toyota, idx1, interest, down);
            break;
            case 2 :
            car(chevrolet, idx2, interest, down);
            break;
            case 3 :
            car(nissan, idx3, interest, down);
            break;
            case 4 :
            car(BMW, idx4, interest, down);
            break;
            case 5 :
            car(volkswagen, idx5, interest, down);
            break;
        }
    }else if(idx1 == 0 && idx2 != 0 && idx3 != 0 && idx4 != 0 && idx5 != 0){
        printf("1)Chervolet\t2)Nissan\t3)BMW\t4)Volkswagen\n");
        printf("Select Manufactor: ");
        scanf("%d", &choice);
        switch (choice){
            case 1 :
            car(chevrolet, idx2, interest, down);
            break;
            case 2 :
            car(nissan, idx3, interest, down);
            break;
            case 3 :
            car(BMW, idx4, interest, down);
            break;
            case 4 :
            car(volkswagen, idx5, interest, down);
            break;
        }
    }else if(idx1 != 0 && idx2 == 0 && idx3 != 0 && idx4 != 0 && idx5 != 0){
        printf("1)Toyota\t2)Nissan\t3)BMW\t\t4)Volkswagen\n");
        printf("Select Manufactor: ");
        scanf("%d", &choice);
        switch (choice){
            case 1 :
            car(toyota, idx1, interest, down);
            break;
            case 2 :
            car(nissan, idx3, interest, down);
            break;
            case 3 :
            car(BMW, idx4, interest, down);
            break;
            case 4 :
            car(volkswagen, idx5, interest, down);
            break;
        }
    }else if(idx1 != 0 && idx2 != 0 && idx3 == 0 && idx4 != 0 && idx5 != 0){
        printf("1)Toyota\t2)Chervolet\t3)BMW\t\t4)Volkswagen\n");
        printf("Select Manufactor: ");
        scanf("%d", &choice);
        switch (choice){
            case 1 :
            car(toyota, idx1, interest, down);
            break;
            case 2 :
            car(chevrolet, idx2, interest, down);
            break;
            case 3 :
            car(BMW, idx4, interest, down);
            break;
            case 4 :
            car(volkswagen, idx5, interest, down);
            break;
        }
    }else if(idx1 != 0 && idx2 != 0 && idx3 != 0 && idx4 == 0 && idx5 != 0){
        printf("1)Toyota\t2)Chervolet\t3)Nissan\t4)Volkswagen\n");
        printf("Select Manufactor: ");
        scanf("%d", &choice);
        switch (choice){
            case 1 :
            car(toyota, idx1, interest, down);
            break;
            case 2 :
            car(chevrolet, idx2, interest, down);
            break;
            case 3 :
            car(nissan, idx3, interest, down);
            break;
            case 4 :
            car(volkswagen, idx5, interest, down);
            break;
        }
    }else if(idx1 != 0 && idx2 != 0 && idx3 != 0 && idx4 != 0 && idx5 == 0){
        printf("1)Toyota\t2)Chervolet\t3)Nissan\t4)BMW\n");
        printf("Select Manufactor: ");
        scanf("%d", &choice);
        switch (choice){
            case 1 :
            car(toyota, idx1, interest, down);
            break;
            case 2 :
            car(chevrolet, idx2, interest, down);
            break;
            case 3 :
            car(nissan, idx3, interest, down);
            break;
            case 4 :
            car(BMW, idx4, interest, down);
            break;
        }
    }


    printf("\n");
    

    return 0;
}