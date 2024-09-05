/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package amaya.hernandezdlab3;

/**
 *
 * David Amaya Hernandez CSC 130 Sec 3 Lab 3
 */
/*
My words and actions will reflect Academic Integrity.
I will not cheat or lie or steal in academic matters.
I will promote integrity in the UNCG community.
 David Amaya Hernandez  02/10/2021
 */
import java.util.Scanner;
import java.lang.Math;

public class AmayaHernandezDLab3 {

// naming the constatnt PI
    static final double PI = 3.14159;

    public static void main(String[] args) {

        System.out.println("David Amaya Hernandez");
        System.out.println("CSC 130 Sec 3");
        System.out.println("Lab 3");

        System.out.println("");

//prompting user
        System.out.println("This program will show the user a menu that allows him to have");
        System.out.println("the program calculate the area of a square, rectangle, or circle.");

        System.out.println("");

        System.out.println("************************************************************");

        System.out.println("    Menu");

        System.out.println("1 - Square");

        System.out.println("2 - Rectangle");

        System.out.println("3 - Circle");

        System.out.println("4 - Quit");

        System.out.println("************************************************************");

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
        System.out.println("Please make your choice from the menu:");
        choice = input.nextInt();

        //if choice is bigger than 4 and lower than 1, user is prompt to try again
        if (choice < 1 || choice > 4) {
            System.out.println("Invalid choice. Please select 1,2,3, or 4:");
            choice = input.nextInt();
            System.out.println("What is the length of one side of the square?");
            length = input.nextDouble();
            side = length;
            area = side * side;
            System.out.print("The area is " + area);
            
        //if user choice is 1 prompts user to find the are a of a square
        } else if (choice == 1) {
            System.out.println("What is the length of one side of the square?");
            length = input.nextDouble();
            side = length;
            area = side * side;
            System.out.print("The area is " + area);
            
         //if user choice is 2 prompts user to find the are a of a rectangle
        } else if (choice == 2) {
            System.out.println("What is the length of the rectangle?");
            length = input.nextDouble();
            System.out.print("What is the width of the rectangle?");
            width = input.nextDouble();
            area = length * width;
            System.out.println("The area is " + area);
                     
        //if user choice is 3 prompts user to find the are a of a cirlce
        } else if (choice == 3) {
            System.out.println("What is the radius of the circle?");
            radius = input.nextDouble();
            area = PI * radius * radius;
            System.out.println("The area is " + area);
        
        //if user choice is 4 it thanks the user for using the program 
        } else if (choice == 4) {
            System.out.println("Thank you for using my program!");
        }
        

    }
}
