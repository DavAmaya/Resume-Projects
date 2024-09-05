/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package teamprojectlab8;
import java.util.Scanner;
import java.util.Arrays;
import java.lang.Math;
public class TeamProjectLab8 {
    /**My words and actions will reflect Academic Integrity. 
     * I will not cheat or lie or steal in academic matters.
     * I will promote integrity in the UNCG community. Student’s Signature:
     * Maximilian Honeycutt Date: 4/14/21
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        /**
         * David Amaya-Hernandez
         * Maximilian Honeycutt
         * Saul Juarez
         * Shayan Zolnoun
         * CS 130, 03, Lab Eight
         */
        System.out.println("David Amaya-Hernandez, "
                + "Maximilian Honeycutt, "
                + "Saul Juarez, "
                + "Shayan Zolnoun\n"
                + "CS 130, 03, Lab Eight\n");
        System.out.println("You will enter 16 whole numbers from 1-100");
        System.out.println("Numbers can be repeated, and they do not need to be in order.");
        int[] myArray = createArray();
        System.out.println("\nThe array is:");
        printArray(myArray);
        searchArray(myArray);
        sortArray(myArray);
        System.out.println("\nThe sorted array is:");
        printArray(myArray);
        binarySearchArray(myArray);
        double mean =meanArray(myArray);
        double median= medianArray(myArray);
        double standardDev = standardDev(myArray,mean);
        printStatistics(mean,median,standardDev);
 
    }
    public static int[] createArray(){
        int[] array = new int[16];
        Scanner input = new Scanner(System.in);
        for(int i = 0;i < array.length; i++){
            System.out.print("Please enter a number: ");
            int userInput = input.nextInt();
            array[i] = userInput;
        }
        return array;
    }
    public static void printArray(int[] array){
        for (int i = 0; i <array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
    public static void searchArray(int[] array){
        Scanner input = new Scanner(System.in);
        System.out.print("\n\nWhich number would you like to search for? ");
        int userChoice = input.nextInt();
        int pos = 0;
        boolean found =false;
        while(pos <array.length && !found) {
            if(array[pos]== userChoice){
                found = true;
            }
            else{
                pos++;
            }
        }
        if(found){
            System.out.println("The "+userChoice+" was found at index "+pos+".");
        }
        else{
            System.out.println("The "+userChoice+" is not in this array.");
        }
    }
    public static void sortArray(int [] array){
        Arrays.sort(array, 0, array.length);
    }
    public static void binarySearchArray(int[] array){
        Scanner input = new Scanner(System.in);
        System.out.print("\n\nWhich number would you like to search for? ");
        int userChoice = input.nextInt();
        int result= Arrays.binarySearch(array, userChoice);
        if(result < 0){
            System.out.println("The "+userChoice+" is not in this array.");
        }
        else{
            System.out.println("The "+userChoice+" was found at index "+Arrays.binarySearch(array, userChoice)+".");
        }
    }
    public static double meanArray(int[] array){
        double mean = 0;
       for(int i = 0; i<array.length; i++){
           mean += array[i];
       }
       mean /= array.length;
        return mean;
    }
    public static double medianArray(int[] array){
        double median = 0;
        if(array.length %2 == 1){
            median = array[(array.length+1)/2-1];
        }
        else{
            median = (array[array.length/2-1]+array[array.length/2])/2;
        }
        return median;
    }
    public static double standardDev(int[] array,double mean){
        double sd = 0;
        double result = 0;
        for(int i = 0; i<array.length; i++){
           result +=Math.pow(array[i] - mean, 2);
       }
        sd = Math.sqrt(result/array.length);
        return sd;
    }
    public static void printStatistics(double mean,double median, double sd){
        System.out.println("\nThe statistics for the array are as follows:\n");
        System.out.printf("Mean\t\t Median\t\t Standard Deviation:\n%.2f\t\t %.2f\t\t %.2f",mean,median,sd);
    }
}

