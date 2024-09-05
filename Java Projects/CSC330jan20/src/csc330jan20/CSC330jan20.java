/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package csc330jan20;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

/**
 *
 * @author davidamaya
 */
public class CSC330jan20 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        //Set<Student> studentSet = new TreeSet<>();
        //hashset
        
        
        //studentSet.add(new Student(1));
        //studentSet.add(new Student(2));
        //studentSet.add(new Student(3));
        //studentSet.add(new Student(4));
        //studentSet.add(new Student(5));
        //printCollection(studentSet);
        
        Map<Student, Integer>  studentMap = new HashMap<>();
        //treemap
        
        studentMap.put(new Student(1), 1);
        studentMap.put(new Student(2), 2);
        studentMap.put(new Student(3), 3);
        studentMap.put(new Student(4), 4);
        studentMap.put(new Student(5), 5);
        printCollection(studentMap.keySet());

    }

    public static void printCollection(Collection c) {
        c.forEach(element -> {
            System.out.println(element);
        });
    }
}
