#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <string.h>
#include <stdbool.h>

void commandLoop(char *prompt)
{
    char *cmd = NULL;
    size_t buffersize = 0;
    size_t userInput;
    char *token;
    int status;
    pid_t child;
    int index = 0;
    size_t size = 12;
    char **input;
    bool background;

    do
    {
        // resets index and waiting to base case
        index = 0;
        background = false;
        input = (char **)calloc(size, sizeof(char *));

        // prompt and use getline() read user input
        printf("%s", prompt);

        userInput = getline(&cmd, &buffersize, stdin);

        // tokenize user input
        token = strtok(cmd, " \n");

        // check if user input is EOF or exit
        if (strcmp(cmd, "exit") == 0)
        {
            // free deallocate memory for the arrays
            free(cmd);
            free(input);
            exit(0);
        }
        else if (strchr(cmd, EOF) == 0 && strlen(cmd) == 0)
        {
            printf("\n");
            free(cmd);
            free(input);
            exit(0);
        }
        else if (strcmp(cmd, "\n") == 0)
        {
            //handle the enter input properly
            continue;
        }
        else if (cmd[0] != '\0' && cmd[0] != '\n' && cmd[0] != ' ' && cmd[0] != '&')
        {
            // realloc memory for the input array and double the size.
            if (index >= size)
            {
                size *= 2;
                input = (char **)realloc(input, size * sizeof(char *));
            }
        }else if(strcmp(cmd, prompt) == 0){
            index = 1;
        }

        // use strdup to copy array and null the token after the string is copy
        while (token != NULL)
        {
            input[index] = strdup(token);
            index++;

            token = strtok(NULL, " \n");
        }

        /*
        check if the end of the user input array ends with
        '&' and Nulls the end of the array to notify
        the array reached it's end.
        */
        if (strcmp(input[index - 1], "&") == 0)
        {
            background = true;
            input[index - 1] = NULL;
        }
        else
        {
            input[index] = NULL;
        }

        // fork call
        child = fork();

        /*
         * checks if the fork fails
         * and if fork is successfull call execvp() and its error
         * for the parent if waiting is true then wait else continue
         */
        if (child == -1)
        {
            perror("failed fork");
            free(cmd);
            free(input);
            exit(1);
        }
        else if (child == 0)
        {
            execvp(input[0], input);
            perror(input[0]);
            exit(1);
        }
        else
        {
            if (!background)
        {
            //waits for processes to finish before proceeding if not background proc.
            while (wait(&status) > 0);
        }
        }

        
    } while (1);

    // deallocate memory for array
    free(cmd);
    free(input);
}

int main(int argc, char *argv[])
{
    // base case prompt
    char *prompt = "jsh: ";

    /*
     * argc = 1, prompt base case
     * argc = 2, checks if arv[1] is '-' to prompt nothing
     * else use argv[1] as the prompt
     */
    if (argc == 1)
    {
        commandLoop(prompt);
    }
    else if (argc == 2)
    {
        if (strcmp(argv[1], "-") == 0)
        {
            prompt = "";
            commandLoop(prompt);
        }
        else
        {
            prompt = argv[1];
            commandLoop(prompt);
        }
    }
}
