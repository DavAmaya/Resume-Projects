/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package csc330jan20;

/**
 *
 * @author davidamaya
 */
public class Student implements Comparable<Student> {

    private int Student;

    public Student(int Student) {
        this.Student = Student;
    }

    public int getStudent() {
        return Student;
    }

    public void setStudent(int Student) {
        this.Student = Student;
    }

    @Override
    public String toString() {
        return "Student{" + "Student=" + Student + '}';
    }

    @Override
    public int compareTo(Student o) {
        return (new Integer(o.getStudent()).compareTo(this.getStudent()));
                }
    
    

}
