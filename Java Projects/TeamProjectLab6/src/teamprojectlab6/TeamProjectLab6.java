/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package teamprojectlab6;

import java.util.Scanner;
import java.lang.Math;
public class TeamProjectLab6 {
 
    /**
     * My words and actions will reflect Academic Integrity. 
     * I will not cheat or lie or steal in academic matters.
     * I will promote integrity in the UNCG community. Student’s Signature:
     * Maximilian Honeycutt Date: 3/24/21
     */
    public static void main(String[] args) {
        /**
         * David Amaya-Hernandez
         * Maximilian Honeycutt
         * Saul Juarez
         * Shayan Zolnoun
         * CS 130, 03, Lab Six
         */
        System.out.println("David Amaya-Hernandez, "
                + "Maximilian Honeycutt, "
                + "Saul Juarez, "
                + "Shayan Zolnoun\n"
                + "CS 130, 03, Lab Six\n");
        System.out.println("Welcome to the GUESSING GAME! \n \n" + "I am "
                + " thinking of a number from 1-100. You will try to guess the "
                + "number.");
 
        playGame(seedRand(),namePlay(),readGuess());
 
    }
    public static int seedRand(){
        int numRand = 1 + (int)(Math.random()*99);
        return numRand;
    }
     public static int readGuess() {
        Scanner input = new Scanner(System.in);
 
        System.out.print("Please select a number 1-100: ");
        int choice = input.nextInt();
        while (choice < 1 || choice > 100) {
            System.out.println("Invalid choice. Please select a number 1-100");
            System.out.print("Please select a number 1-100: ");
            choice = input.nextInt();
        }
    return(choice);  
    }
     public static String namePlay() {
        Scanner input = new Scanner(System.in);
        System.out.print("To play, enter your first name: ");
        String name = input.nextLine();
        System.out.println("\nHi " + name + ". Take your first guess.\n" 
                + "I’ll tell you whether to guess higher or lower.\n");
        return name;
    }
 
    public static void playGame(int randNum,String nameOfUser,int guessNum){
        Scanner input = new Scanner(System.in);
        int i =0;
        while(guessNum != randNum){
            if (guessNum > randNum) {
                System.out.println("Guess Lower.\n");
 
            } else if (guessNum < randNum) {
                System.out.println("Guess Higher.\n");
 
            }
            i++;
            System.out.print("Enter a guess: ");
            guessNum = input.nextInt();
 
      }
        System.out.println("\nCongratulations " + nameOfUser + "! You guessed it in "+i+" tries!");
    }
 
}