/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package amaya.hernandezdlab5;

import java.util.Scanner;

/**
 *
 * @author davidamaya
 */
public class AmayaHernandezDLab5 {

    /**
     * My words and actions will reflect Academic Integrity. I will not cheat or
     * lie or steal in academic matters. I will promote integrity in the UNCG
     * community. David Amaya Hernandez 03/17/2021
     *
     * @param args
     */
    // naming the constatnt PI
    static final double PI = 3.14159;

    public static void main(String[] args) {

        /*
        David Amaya Hernandez
        CSC 130, Sec 3
        Lab Four
         */
        System.out.println("David Amaya Hernandez");
        System.out.println("CSC 130, Sec 3");
        System.out.println("Lab Five");

        System.out.println(" ");

//prompting user of the program
        System.out.println("This program will show the user a menu that allows him to have");
        System.out.println("the program calculate the area of a square, rectangle, or circle");
        System.out.println("or the user may choose to play with random numbers.");

        System.out.println("");

        /* 
        Strings and Character for later when we prompt user if 
        they want to go back to the menu
         */
        String display;
        String menu;
        char letter;

        //the do of the do-while loop for the menu 
        do {
            System.out.println("************************************************************");

            System.out.println("    Menu");

            System.out.println("1 - Square");

            System.out.println("2 - Rectangle");

            System.out.println("3 - Circle");

            System.out.println("4 - Play with Random Numbers");

            System.out.println("************************************************************");

            System.out.println("");
            System.out.println("");

            // declaring variables
            int choice;

            double area;

            double side;

            double length;

            double width;

            double radius;

            //appling scanner so user can input an interger
            Scanner input = new Scanner(System.in);

            //prompting user to make choice
            System.out.print("Please make your choice from the menu: ");
            choice = input.nextInt();

            /*
            while loop if user choses a number greater than 4 or less than 1
            until the choses 1,2,3, or 4
             */
            while (choice < 1 || choice > 4) {
                System.out.print("Invalid choice. Please select 1,2,3, or 4: ");
                choice = input.nextInt();
            }

            //select statement that prompts by the choices they chose from the menu
            switch (choice) {
                case 1:
                    System.out.println(" ");
                    System.out.println("You chose to calculate the area of a square.");
                    System.out.print("What is the length of one side of the square? ");
                    length = input.nextDouble();
                    side = length;
                    area = side * side;
                    System.out.println("");
                    System.out.printf("The area is %1.2f\n", area);
                    break;
                case 2:
                    System.out.println(" ");
                    System.out.println("You chose to calculate the area of a rectangle.");
                    System.out.print("What is the length of the rectangle? ");
                    length = input.nextDouble();
                    System.out.print("What is the width of the rectangle? ");
                    width = input.nextDouble();
                    area = length * width;
                    System.out.println("");
                    System.out.printf("The area is %2.2f\n", area);
                    break;
                case 3:
                    System.out.println(" ");
                    System.out.println("You chose to calculate the area of a circle.");
                    System.out.print("What is the radius of the circle? ");
                    radius = input.nextDouble();
                    area = PI * radius * radius;
                    System.out.println("");
                    System.out.printf("The area is %1.2f\n", area);
                    break;
                case 4:
                    /*
                    prompts another menu to display two random number.
                    The do of the do-while loop for the display menu for choice 4
                    from the main menu.
                     */
                    do {
                        /*
                        creating double variable to generate random number and 
                        for later when format is needed
                         */
                        double randomNum = 1000 + (double) (Math.random() * 4002);
                        double randomNum2 = 1000 + (double) (Math.random() * 4002);

                        //prompting the user the display menu
                        System.out.println("");
                        System.out.println("You have selected to display two random numbers.");
                        System.out.println("************************************************************");

                        System.out.println("    Display Numbers Menu");

                        System.out.println("1 - Display as integers with a comma showing if needed");

                        System.out.println("2 - Display as real numbers with a comma showing if needed "
                                + "and set to 2 decimal places");

                        System.out.println("3 - Display as real numbers with a comma showing if needed "
                                + "and set to 4 decimal places");

                        System.out.println("4 - Display as Scientific numbers set to 3 decimal places");

                        System.out.println("************************************************************");

                        System.out.println("");
                        System.out.println("");

                        //prompting the use to enter a number 1 - 4 from the display menu
                        System.out.print("Please make your choice from the Display Numbers menu: ");
                        choice = input.nextInt();

                        /*
                        while loop if user choses a number greater than 4 or less than 1
                        until the choses 1,2,3, or 4
                         */
                        while (choice < 1 || choice > 4) {
                            System.out.print("Invalid choice. Please select 1,2,3, or 4: ");
                            choice = input.nextInt();
                        }

                        //select statement that prompts by the choices they chose from the display menu
                        switch (choice) {
                            case 1:
                                System.out.printf("The first number is %,4.0f ", randomNum);
                                System.out.printf(" and the second number is %,4.0f\n", randomNum2);
                                break;
                            case 2:
                                System.out.printf("The first number is %,4.2f ", randomNum);
                                System.out.printf(" and the second number is %,4.2f\n", randomNum2);
                                break;
                            case 3:
                                System.out.printf("The first number is %,4.4f ", randomNum);
                                System.out.printf(" and the second number is %,4.4f\n", randomNum2);
                                break;
                            case 4:
                                System.out.printf("The first number is %4.3e ", randomNum);
                                System.out.printf(" and the second number is %4.3e\n", randomNum2);
                                break;
                        }

                        System.out.println(" ");

                        /*
                        Prompting the user if the want to see the Display menu again
                        and to press Y for yes and N for no.
                         */
                        System.out.print("Do you want to see the Display Numbers menu again? "
                                + "Type a Y for yes or N for no: ");
                        /*
                        One of the Strings that we declared in the beginning of
                        the code for the user input of "Y' or "N". Also 
                        I created a new scanner to fix user String input problem.
                         */
                        Scanner DM = new Scanner(System.in);
                        display = DM.nextLine();

                        /*
                        The character that we declared earlier is used to capitalize
                        the user input if they input "y" or "n" and converts the 
                        user String into char
                         */
                        letter = Character.toUpperCase(display.charAt(0));

                        /*
                        the while from the do-while loop is declaring if the 
                        user input String is the ASCII of "Y" which is 89.
                         */
                    } while (letter == 89);
                    break;
            }

            System.out.println("");

            /*
            Prompting the user if the want to see the main menu again
            and to press Y for yes and N for no.
             */
            System.out.print("Do you want to see the main menu again? "
                    + "Type a Y for yes or N for no: ");
            /*
            One of the Strings that we declared in the beginning of
            the code for the user input of "Y' or "N". Also
            I created a new scanner to fix user String input problem.
             */
            Scanner MM = new Scanner(System.in);
            menu = MM.nextLine();

            /*
            The character that we declared earlier is used to capitalize
            the user input if they input "y" or "n" and converts the
            user String into char
             */
            letter = Character.toUpperCase(menu.charAt(0));

            /*
            the while from the do-while loop is declaring if the
            user String is the ASCII of "Y" which is 89.
             */
        } while (letter == 89);

        System.out.println("");

        System.out.println("Thank you for using my program!");
    }

}
