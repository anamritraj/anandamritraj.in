---
title: Weekend with Algorithms and Data structures- 1
date: "2019-01-07"
spoiler: Not my first weekend with algorithms, but the first one when I am writing about it!
---

Following is the set of questions I solved over this weekend. I decided to document it so that it becomes easier for me to reference them in future.

## Reverse an Integer

#### Question
Reverse the digits of an integer. If the reverse if overflowing the size of an INT then return -1;

#### Example
```
INPUT: 1234567
OUTPUT: 7654321

INPUT: -345
OUTPUT: -543
```

#### Approach
At first, I was trying to convert the integer into a string and then swap the characters from `end` and `start` while `start >= end`.

This would have worked but this requires extra step of converting the integer into a string and then converting the string back to the integer.

A more uncommon, beautiful approach is shown below. It might take you a while to realize what is going on here.

We are essentially taking the last digit, multiplying it with 10 and then adding it to the reverse for every digit in the original number. While this may look like it might not work (at least that's what I thought, until I took a pen and paper to solve it).

Let's see it in action using an example.

```
INPUT: 12345

rev = 0

A = 12345
    A % 10 = 12345 % 10 = 5
    rev = 0 x 10 + 5 = 5
    A = 12345 / 10 = 1234

    A % 10 = 1234 % 10 = 4
    rev = 5 x 10 + 4 = 54
    A = 1234 / 10 = 123

    A % 10 = 123 % 10 = 3
    rev = 54 x 10 + 3 = 543
    A = 123 / 10 = 12
    
    A % 10 = 123 % 10 = 3
    rev = 54 x 10 + 3 = 543
    A = 123 / 10 = 12
    
    A % 10 = 12 % 10 = 2
    rev = 543 x 10 + 2 = 5432
    A = 12 / 10 = 1

    A % 10 = 1 % 10 = 1
    rev = 5432 x 10 + 1 = 54321
    A = 1 / 10 = 0

    return 54321
```

#### Code
```cpp

int reverseInt(int A) {
    if(A < 0){
        return -1 * reverseInt(abs(A));
    }
    long long rev = 0;
    while(A > 0){
        rev = (rev*10) + A%10;
        A = A/10;
    }
    
    if(rev > INT_MAX || rev < INT_MIN){
        return 0;
    }else{
        return rev;
    }
}
```

## Rearrange Array

#### Question
Rearrange a given array so that `Arr[i]` becomes `Arr[Arr[i]]` with `O(1)` extra space.

If `N` is the size of array, then
- All elements in the array are in the range `[0, N-1]`
- `N * N` does not overflow for a signed integer

#### Example
```
Input : 1 0
Return : 0 1

Input : 3 2 1 4 5 0
Return : 4 1 2 5 0 3

```
#### Approach
This question was a bit tricky and without any hints I was not able to solve it. The thing which makes it tough is the fact that we have to do it in `O(1)` space. If are allowed to use any extra space then it would be very easy!

Now our problem is that we only want to traverse the array in `O(n)` times i.e. only once or twice.

But the problem here that if we change the data in the same array then we are going to get into trouble when we get to that index.

Suppose given a array `A`,
```
       0 1 2 3 4 5 <-- Indices
Input: 3 2 1 4 5 0
```
Now, for `A[i]` we need to make `A[i] = A[A[i]]` i.e. we need to make `A[0] = A[3]`

Now suppose we did that,
```
       0 1 2 3 4 5 <-- Indices
Input: 4 2 1 4 5 0
```

This turned out fine, next we move to the next index, `A[1]`. If we change `A[1] = A[2]`
```
       0 1 2 3 4 5 <-- Indices
Input: 4 1 1 4 5 0
```

This is also fine, but now if we want to proceed and make changes to the next element `A[2]`,  `A[2] = A[1]`. So this will make it like this
```
       0 1 2 3 4 5 <-- Indices
Input: 4 1 1 4 5 0 <-- Wrong
```
So we need to find a way such that we can get the original number from the modified number.

Let's start from scratch,
```
       0 1 2 3 4 5 <-- Indices
Input: 3 2 1 4 5 0
```

Here `n = 6` and also, we know that `0 <= A[i] <= 5`.
Now lets encode each `A[i]` as follows,
```
    A[i] += (A[A[i]] % n) * n;
```

By using this we can get both the old value and the new value. The same is implemented in the code below. Take out a pen and paper, and try for some values.

To get the original value, do `A[i] % n`

And to get the new value do, `A[i] / n`


#### Code
```cpp
void arrange(vector<int> &A) {
    int n = A.size();
    for(int i = 0; i < A.size(); i++){
        A[i] += (A[A[i]] % n) * n;
    }
    
    for(int i = 0; i < n; i++){
        A[i] /= n;
    }
}
```

## Sorted Permutation Rank
#### Question

Given a string, find the rank of the string amongst its permutations sorted lexicographically. Assume that no characters are repeated.

The answer might not fit in an integer, so return your `answer % 1000003`
#### Example
```
Input: acb
Output: 2

Input: STRING
Output: 568
```
#### Approach
This is a question of simple mathematics. Just count the number of characters which are smaller than each character to their right and fix the character one by one and find the result.

```
INPUT: STRING
// No of elements on right smaller than the current element
cnt = [4, 4, 3, 1, 1, 0]

Now Fix S.
SXXXXX

The characters which can appear before S are R, I, N and G
So, 
RXXXXX
IXXXXX
NXXXXX
GXXXXX
SXXXXX

So, There are 4 characters which can come before S and their sum would be,
4 x 5!

Similarly, now fix T,

STXXXX
then fix R
and then so on..
```

#### Code
```cpp
long long factorial(int n){
    if(n <= 1){
        return 1;
    }
    return  (long long)n * 
            (factorial(n-1) % 1000003 ) 
                % 1000003;
}

int findRank(string A) {
    int n = A.size();
    vector<long long> cnt(n);
    
    for(int i = 0; i < n; i++){
        for(int j = i; j < n; j++){
            if(A[i] > A[j]){
                cnt[i]++;
            }
        }
    }
    
    long long rank = 0;
    
    for(int i = 0; i < n; i++){
        rank += cnt[i] * factorial(n-i-1);
    }
    
    rank++;
    
    return rank % 1000003;
}

```

I solved a few more questions but these were worth mentioning. Hope it helps somebody!