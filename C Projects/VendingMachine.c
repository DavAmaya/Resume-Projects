/*David Amaya Hernandez
CSC 362*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>


//prints vending machine
void print_machine(char snack [3][3][10], char code [3][3][3]){
printf("\nAvailable Items:\n");
    for(int i = 0; i < 3; i++){
        for(int k = 0; k < 3; k++){
            printf("%s) %s\t", code[i][k], snack[i][k]);
            if(k == 2){
                printf("\n\n");
            }
            
        }
    }
}


//gets prices of items
double snack(char choice[2], double prices[3][3]){
    if(strcmp(choice, "E7") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[0][0]);
        return prices[0][0];

    }else if(strcmp(choice, "B2") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[0][1]);
        return prices[0][1];

    }else if(strcmp(choice, "G4") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[0][2]);
        return prices[0][2];

    }else if(strcmp(choice, "C3") == 0){
       printf("Item 1: %s", choice);
       printf("\nPrice: $%2.2f", prices[1][0]);
       return prices[1][0];

    }else if(strcmp(choice, "T5") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[1][1]);
        return prices[1][1];

    }else if(strcmp(choice, "D9") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[1][2]);
        return prices[1][2];

    }else if(strcmp(choice, "K5") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[2][0]);
        return prices[2][0];

    }else if(strcmp(choice, "R6") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[2][1]);
        return prices[2][1];

    }else if(strcmp(choice, "Q8") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[2][2]);
        return prices[2][2];
    }
    return 0;
}

double drink(char items [3][3][10], char code[3][3][3], char choice[2], double prices[3][3]){
    if(strcmp(choice, "E7") == 0){
        printf("Item 1: %s", choice);
        printf("\nItem chosen not a drink, choose again.");
        print_machine(items, code);
        printf("\nPlease Select a drink: ");
        scanf("%s", choice);
        drink(items,code,  choice, prices);

    }else if(strcmp(choice, "B2") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[0][1]);
        return prices[0][1];

    }else if(strcmp(choice, "G4") == 0){
        printf("Item 1: %s", choice);
        printf("\nItem chosen not a drink, choose again.");
        print_machine(items, code);
        printf("\nPlease Select a drink: ");
        scanf("%s", choice);
        drink(items, code, choice, prices);

    }else if(strcmp(choice, "C3") == 0){
       printf("Item 1: %s", choice);
       printf("\nItem chosen not a drink, choose again.");
       print_machine(items, code);
        printf("\nPlease Select a drink: ");
        scanf("%s", choice);
        drink(items, code, choice, prices);

    }else if(strcmp(choice, "T5") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[1][1]);
        return prices[1][1];

    }else if(strcmp(choice, "D9") == 0){
        printf("Item 1: %s", choice);
        printf("\nItem chosen not a drink, choose again.");
        print_machine(items, code);
        printf("\nPlease Select a drink: ");
        scanf("%s", choice);
        drink(items, code, choice, prices);

    }else if(strcmp(choice, "K5") == 0){
        printf("Item 1: %s", choice);
        printf("\nItem chosen not a drink, choose again.");
        print_machine(items, code);
        printf("\nPlease Select a drink: ");
        scanf("%s", choice);
        drink(items, code, choice, prices);

    }else if(strcmp(choice, "R6") == 0){
        printf("Item 1: %s", choice);
        printf("\nPrice: $%2.2f", prices[2][1]);
        return prices[2][1];

    }else if(strcmp(choice, "Q8") == 0){
        printf("Item 1: %s", choice);
        printf("\nItem chosen not a drink, choose again.");
        print_machine(items, code);
        printf("\nPlease Select a drink: ");
        scanf("%s", choice);
        drink(items, code, choice, prices);
    }
    return 0;
}

char *savedItem(char choice[2], char items [3][3][10]){
    if(strcmp(choice, "E7") == 0){
        return items[0][0];
    }else if(strcmp(choice, "B2") == 0){
        return items[0][1];
    }else if(strcmp(choice, "G4") == 0){
        return items[0][2];
    }else if(strcmp(choice, "C3") == 0){
        return items[1][0];
    }else if(strcmp(choice, "T5") == 0){
        return items[1][1];
    }else if(strcmp(choice, "D9") == 0){
        return items[1][2];
    }else if(strcmp(choice, "K5") == 0){
        return items[3][0];
    }else if(strcmp(choice, "R6") == 0){
        return items[3][1];
    }else if(strcmp(choice, "Q8") == 0){
        return items[3][2];
    }
    return NULL;
}



void vendngMachine(){
    char items [3][3][10] = {
        {"Pop-Tart", "Coffee", "S&V Lays"},
        {"M&Ms ", "Purelife ", "Cheetos"},
        {"BBQ Lays", "Pepsi", "Granola"}
    };

    char code [3][3][3] = {
        {"E7", "B2", "G4"},
        {"C3", "T5", "D9"},
        {"K5", "R6", "Q8"}
    };

    double prices [3][3] = {
        {1.63, 2.76, 1.49},
        {1.72, 1.88, 1.59},
        {1.72, 2.29, 1.17}
    };

    char choice[2];
    char response;

    int pennies = 0, nickels = 0, dimes= 0, quarters = 0, dollars;
    double change, purchase, purchase2, wallet, total;

    char *item1;
    char *item2;

 //prints vending machine
 print_machine(items, code);


 //ask for snack
    printf("\nPlease Select a snack: ");
    scanf("%s", choice);


    //gets price and print
    purchase = snack(choice, prices);

 //Y/N question
    printf("\nAre You Sure? [Y/N]: ");
    scanf(" %c", &response);

    while(response == 'N'){
        print_machine(items, code);
        printf("\nPlease Select a snack: ");
        scanf("%s", choice);
        purchase = snack(choice, prices);
        printf("\nAre You Sure? [Y/N]: ");
        scanf(" %c", &response);
    }
    if(response == 'Y'){

        item1 = savedItem(choice, items);

    print_machine(items, code);


 //ask for drink
    printf("\nPlease Select a drink: ");
    scanf("%s", choice);

    purchase2 = drink(items, code, choice, prices);

    printf("\nAre You Sure? [Y/N]: ");
    scanf(" %c", &response);

    while(response == 'N'){
        print_machine(items, code);
        printf("\nPlease Select a drink: ");
        scanf("%s", choice);
        purchase2 = drink(items, code, choice, prices);
        printf("\nAre You Sure? [Y/N]: ");
        scanf(" %c", &response);
    }
     if(response == 'Y'){
        printf("\n\nPlease enter a Currency (5 = $5.00): ");
        scanf("%lf", &wallet);

        item2 = savedItem(choice, items);

        total = purchase + purchase2;

        change = wallet - total;
        

        //gets change to return
    dollars = floor(change);

    change = change - floor(change);

    


 //calculate exact change to return
    while (change >= 0.01){ 
        if(change >= 0.25){
            quarters += 1;
            change = change - 0.25;
        }
        else if( change >= 0.10){
            dimes += 1;
            change = change - 0.10;
        }
        else if( change  >=  0.05){
            nickels += 1;    
            change = change - 0.05;
        }
        else if(wallet >= 0.01){
            pennies += 1;
            change = change - 0.01;
        }
    }
    }


    printf("\nYou selected %s and %s. Your change is %d dollar(s), %d quarter(s), %d dime(s), %d nickel(s), %d pennies.", item1, item2, dollars, quarters, dimes, nickels, pennies);

 }
}


 
int main() {

    vendngMachine();
    
    printf("\n");
    

    return 0;
}
