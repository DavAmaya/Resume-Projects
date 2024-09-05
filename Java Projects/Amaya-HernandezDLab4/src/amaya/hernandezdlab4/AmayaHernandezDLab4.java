/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package amaya.hernandezdlab4;

/**
 *
 * @author davidamaya
 */
import java.util.Scanner;

public class AmayaHernandezDLab4 {

    /**
     * My words and actions will reflect Academic Integrity.
     * I will not cheat or lie or steal in academic matters.
     * I will promote integrity in the UNCG community.
     * David Amaya Hernandez 03/10/2021
     * @param args
     */
    public static void main(String[] args) {

        /*
        David Amaya Hernandez
        CSC 130, Sec 3
        Lab Four
         */
        System.out.println("David Amaya Hernandez");
        System.out.println("CSC 130, Sec 3");
        System.out.println("Lab Four");

        System.out.println(" ");

        //creating variables and initialized empty
        String IDNumber;
        String fullName;
        String firstName;
        String Initial;
        String lastName;
        String ID;
        String convertedID;
        int IDLength;
        int WhereIsSpace;
        int nameLength;
        int playingNumber;
        double anotherPlayNumber;

        //creating varibels and initializing values
        int firstNumber = 58;
        int secondNumber = 46;
        double thirdNumber = 87;

        //promting user to eneter ID number
        Scanner input = new Scanner(System.in);

        System.out.print("Enter your ID number, please."
                + " An ID must start with a letter: ");

        IDNumber = input.nextLine();

        System.out.println(" ");

        /* 
        initializing the variable IDLength with the length of the
        string IDNumber.
         */
        IDLength = IDNumber.length();

        /*
        prompting the user that their ID is invalid and
        to re-enter their ID, if the IDNUmber is greater or less than 6.
         */
        if (IDLength < 6 || IDLength > 6) {
            System.out.print("Your ID number is invalid."
                    + " Please re-enter the ID: ");

            IDNumber = input.nextLine();

            System.out.println(" ");
        }

        /* 
        initializing the variable convertedID with the IDNumber to be 
        capitalized and printing
         */
        convertedID = IDNumber.toUpperCase();

        System.out.println("Your ID number is " + convertedID);

        System.out.println("\n");

        //promting user to eneter their full name
        System.out.print("Enter your full name including the middle initial,"
                + " separated by spaces (Sue B. Smith): ");

        fullName = input.nextLine();

        /*
        finding the first space in user input and the the string fullName 
        length. Also initializing the varibles firstName, Initial, lastName
        with the name the user input and printed.
         */
        WhereIsSpace = fullName.indexOf(' ');

        firstName = fullName.substring(0, WhereIsSpace);

        nameLength = fullName.length();

        Initial = fullName.substring(WhereIsSpace + 1,
                nameLength - (WhereIsSpace + 1));

        lastName = fullName.substring(WhereIsSpace + 4);

        System.out.println("Your name is: " + firstName + " "
                + Initial + lastName);
        /*
        created three extra strings to used the string concatenation to
        print out "Your first name is firstName" same with Initial and LastName
         */
        String s1 = "Your first name is ";
        String s2 = "Your middle initial is ";
        String s3 = "Your last name is ";

        System.out.println(s1 + firstName);
        System.out.println(s2 + Initial);
        System.out.println(s3 + lastName);

        System.out.println(" ");

        //multiplied firstNumbver and secondNumber and formatted when printed
        playingNumber = firstNumber * secondNumber;

        System.out.print("playingNumber is ");
        System.out.printf("%,4d\n", playingNumber);

        ///divided thirdtNumbver and secondNumber and formatted when printed
        anotherPlayNumber = thirdNumber / secondNumber;

        System.out.print("anotherPlayNumber is ");
        System.out.printf("%1.3f\n", anotherPlayNumber);

        /*
        added /multiplied firstNumbver, secondNumber, thirdNumber and 
        mutiplied the result with 10000 and formatted when printed
         */
        anotherPlayNumber = (firstNumber + secondNumber + thirdNumber) * 10000;

        System.out.print("anotherPlayNumber is");
        System.out.printf("\t%1.4e", anotherPlayNumber);
    }

}
