#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <string.h>
#include <time.h>


#define ARRAY_SIZE 10

int RandArray[ARRAY_SIZE];
pthread_mutex_t mutex;

//mergeSort function with mutex lock when RandArray is accessed
void merge(int low, int mid, int high)
{
    int i, j, k;
    int n1 = mid - low + 1;
    int n2 = high - mid;

    //array's to split main array
    int *L = (int *)malloc(n1 * sizeof(int));
    int *R = (int *)malloc(n2 * sizeof(int));

    // sorting left side
    for (i = 0; i < n1; i++){
    pthread_mutex_lock(&mutex);
        L[i] = RandArray[low + i];
    pthread_mutex_unlock(&mutex);
}

    // sorting right side
    for (j = 0; j < n2; j++){
    pthread_mutex_lock(&mutex);
        R[j] = RandArray[mid + 1 + j];
    pthread_mutex_unlock(&mutex);
    }

    i = 0;
    j = 0;
    k = low;

    // merge both array
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            pthread_mutex_lock(&mutex);
            RandArray[k] = L[i];
            i++;
            pthread_mutex_unlock(&mutex);
        }
        else
        {
            pthread_mutex_lock(&mutex);
            RandArray[k] = R[j];
            j++;
            pthread_mutex_unlock(&mutex);
        }
        k++;
    }

//copy remaining index from the L array and R array
    while (i < n1)
    {
        pthread_mutex_lock(&mutex);
        RandArray[k] = L[i];
        i++;
        k++;
        pthread_mutex_unlock(&mutex);
    }


    while (j < n2)
    {
        pthread_mutex_lock(&mutex);
        RandArray[k] = R[j];
        j++;
        k++;
        pthread_mutex_unlock(&mutex);
    }
    free(L);
    free(R);
    
}

void *parallelMS(void *param)
{
    int *params = (int *)param;
    int low = params[0];
    int high = params[1];

    if (low < high)
    {
        int mid = low + (high - low) / 2;

        pthread_t Th1, Th2;
        int left[2] = {low, mid};
        int right[2] = {mid + 1, high};

        pthread_create(&Th1, NULL, parallelMS, (void *)left);
        pthread_create(&Th2, NULL, parallelMS, (void *)right);

        pthread_join(Th1, NULL);
        pthread_join(Th2, NULL);

        merge(low, mid, high);
    }

    pthread_exit(0);
}

void swap(int i, int j)
{
    pthread_mutex_lock(&mutex);
    int temp = RandArray[i];
    RandArray[i] = RandArray[j];
    RandArray[j] = temp;
    pthread_mutex_unlock(&mutex);
}

int partition(int low, int high)
{
    
    // choose the pivot
    int randPivot = rand() % (high - low + 1) + low;

    swap(randPivot, high);
    pthread_mutex_lock(&mutex);
    int pivot = RandArray[high];
    pthread_mutex_unlock(&mutex);
    int i = (low - 1);

    for (int j = low; j <= high; j++)
    {
        // If current element is smaller than the pivot
        if (RandArray[j] < pivot)
        {
            i++;
            swap(i, j);
        }
    }
    swap(i + 1, high);
    return (i + 1);
}

void *parallelQS(void *param)
{
    int *params = (int *)param;
    int low = params[0];
    int high = params[1];

    if (low < high)
    {
        int pi = partition(low, high);

        pthread_t Th1, Th2;

        int left[2] = {low, pi - 1};
        int right[2] = {pi + 1, high};
//create thread to sort array
        pthread_create(&Th1, NULL, parallelQS, (void *)left);
        pthread_create(&Th2, NULL, parallelQS, (void *)right);

        pthread_join(Th1, NULL);
        pthread_join(Th2, NULL);
    }

    pthread_exit(0);
}

int main()
{
    char user_response;
    pthread_t sort_thread;
    int params[2] = {0, ARRAY_SIZE - 1};

    srand(time(NULL));

    for (int i = 0; i < ARRAY_SIZE; i++)
    {
        RandArray[i] = rand() % 101;
    }

    printf("Generated array: ");
    for (int i = 0; i < ARRAY_SIZE; i++)
    {
        printf("%d ", RandArray[i]);
    }
    printf("\n");

    printf("Would you like to MergeSort(M) or QuickSort(Q) this array? (Enter M or Q): ");
    scanf("%c", &user_response);

    if (user_response == 'M')
    {
        pthread_create(&sort_thread, NULL, parallelMS, (void *)params);
        pthread_join(sort_thread, NULL);
    }
    else if (user_response == 'Q')
    {
        pthread_create(&sort_thread, NULL, parallelQS, (void *)params);
        pthread_join(sort_thread, NULL);
    }

    printf("The sorted array: ");
    for (int i = 0; i < ARRAY_SIZE; i++)
    {
        printf("%d ", RandArray[i]);
    }
    printf("\n");
}

