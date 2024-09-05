#include <stdio.h>
#include <stdlib.h>
#include <string.h>


typedef struct {
    char Lname[12];
    char Fname[12];
    float grade;
} Student;

//grade distribution
char *letterGrade(double grade){
    if(grade <= 100 && grade >= 93){
        return "A";
    }
    else if(grade <= 92 && grade >= 90){
        return "A-";
    }
    else if(grade <= 89 && grade >= 87){
        return "B+";
    }
    else if(grade <= 86 && grade >= 83){
        return "B";
    }
    else if(grade <= 82 && grade >= 80){
        return "B-";
    }
    else if(grade <= 79 && grade >= 77){
        return "C+";
    }
    else if(grade <= 76 && grade >= 73){
        return "C";
    }
    else if(grade <= 72 && grade >= 70){
        return "C-";
    }
    else if(grade <= 69 && grade >= 67){
        return "D+";
    }
    else if(grade <= 66 && grade >= 63){
        return "D";
    }
    else if(grade <= 62 && grade >= 60){
        return "D-";
    }
    else if(grade <= 59){
        return "F";
    }
    return NULL;
}


void gradeBook(){
    int response;
    Student students[10];
    char *letter[10];
    double sum = 0;
    int num = 1;
    double average = 0;

for(int i = 0; i <= 10; i++){
    printf("Enter Student %d", num);
    printf("\nLast Name: ");
    scanf("%s", students[i].Lname);
    printf("\nFirst Name: ");
    scanf("%s", students[i].Fname);
    printf("\nGrade: ");
    scanf("%f", &students[i].grade);

    letter[i] = letterGrade(students[i].grade);
    sum += students[i].grade;
    num++;
    printf("\n");
}

average = sum / 10;

//sorts largest to smallest
for (int i = 0; i < 10; i++) {
        for (int j = i+1; j < 10; j++) {
            if (students[j].grade > students[i].grade) {
                Student temp = students[i];
                students[i] = students[j];
                students[j] = temp;
            }
        }
    }
printf("Output Visual Gradebook (1) or Print Statements (2): ");
scanf("%d", &response);

if(response == 1){
for(int i = 0; i <= 10; i++){
    printf("\n%s %s recieved a %2.2f%c on the midterm exam which is a %s\n", students[i].Fname, students[i].Lname, students[i].grade, 37, letter[i]);
}

printf("The Group received an average of %2.2f%c on the midterm exam which is a %s.", average, 37, letterGrade(average));


}else if (response == 2){

    printf("Name\t\tGrade\t\t Letter Grade\n");
    for(int i = 0; i <= 10; i++){
    printf("\n%s %s\t\t%2.2f%c\t\t%s", students[i].Fname, students[i].Lname, students[i].grade, 37, letter[i]);
}
printf("\nGroup Average\t\t%2.2f%c\t\t%s", average, 37, letterGrade(average));
}
}

int main(int argc, char *argv[]) {
    gradeBook();
    
    printf("\n");
    
    return 0;
}