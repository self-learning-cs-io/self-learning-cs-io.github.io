---
title: PrincetonAlgorithms P20Part15 03_selection Sort
---

1
00:00:00,000 --> 00:00:08,000
The first elementary sorting method that we're going to take a look at is an easy method known as selection sort.

2
00:00:08,000 --> 00:00:16,000
The idea of selection sort is to start out with an unsorted array and we'll use these playing cards as an example.

3
00:00:16,000 --> 00:00:25,000
In the Ith iteration, we go through the array to try to find the smallest remaining entry, in this case the twos, the smallest remaining entry.

4
00:00:26,000 --> 00:00:32,000
And then we'll swap that with the first entry in the array and then we know we've got one step done.

5
00:00:32,000 --> 00:00:35,000
Selection sort is based on iterating that idea.

6
00:00:35,000 --> 00:00:47,000
Okay, so the basic selection sort method is to, in the Ith iteration, find the smallest remaining entry to the right of I or bigger index in I and then swap that with I.

7
00:00:47,000 --> 00:00:54,000
So when we start out, I's at the left end and then the remaining, all the remaining entries are to the right.

8
00:00:54,000 --> 00:00:59,000
We scan through and the smallest one is the two, three entries from the right.

9
00:00:59,000 --> 00:01:03,000
So we swap that. So that's the first step.

10
00:01:03,000 --> 00:01:10,000
Now that part of the array to the left of I is in its final order and we simply continue.

11
00:01:10,000 --> 00:01:16,000
So now the smallest is the three, swap that with I, increment I.

12
00:01:16,000 --> 00:01:20,000
So now we have the two and three in order and continue in that way.

13
00:01:20,000 --> 00:01:26,000
Find the smallest, the four, swap that one with I, increment I.

14
00:01:26,000 --> 00:01:36,000
Find the smallest, it's five, swap that with I, increment I. Find the smallest, swap that with I, increment I.

15
00:01:36,000 --> 00:01:42,000
Each time we have to scan through all the remaining entries in order to find the smallest.

16
00:01:42,000 --> 00:01:46,000
But then once we found it, we only have to swap two cards.

17
00:01:46,000 --> 00:01:50,000
Those are both key properties of selection sort.

18
00:01:50,000 --> 00:01:53,000
Now the eight's the smallest and we swap.

19
00:01:53,000 --> 00:01:57,000
Now we know they're in order but the program doesn't.

20
00:01:57,000 --> 00:02:09,000
So it has to look and decide that I and men are the same and then it swaps it with itself and does the same thing for the last.

21
00:02:09,000 --> 00:02:16,000
And so after that process then we know that the entire array is in its final order.

22
00:02:16,000 --> 00:02:18,000
All sorted.

23
00:02:18,000 --> 00:02:26,000
All right, so let's one way to understand the way that an algorithm works is to think about invariance.

24
00:02:26,000 --> 00:02:32,000
So for the selection sort, we have a pointer that was our variable I that scans from left to right.

25
00:02:32,000 --> 00:02:37,000
That's indicated by a little red arrow in this representation.

26
00:02:37,000 --> 00:02:45,000
The variants are that the entries on and to the left of the arrow are never change and they're in ascending order.

27
00:02:45,000 --> 00:02:51,000
No entry to the right of the arrow is smaller than any entry to the left of it.

28
00:02:51,000 --> 00:02:54,000
That's the way that we set it up.

29
00:02:54,000 --> 00:03:03,000
In the algorithm maintains those invariance by finding the smallest entry to the right and exchanging it with the next one.

30
00:03:03,000 --> 00:03:07,000
So the code implements the invariance.

31
00:03:07,000 --> 00:03:10,000
So to move the pointer to the right we increment i.

32
00:03:10,000 --> 00:03:14,000
So now the invariant might be violated.

33
00:03:14,000 --> 00:03:15,000
So we have to fix it.

34
00:03:15,000 --> 00:03:20,000
It might be violated because you might have an element to the right of the pointer.

35
00:03:20,000 --> 00:03:25,000
That is smaller than some the element on the pointer.

36
00:03:25,000 --> 00:03:31,000
So what we have to do is identify the index of that minimum entry and exchange it.

37
00:03:31,000 --> 00:03:35,000
Then once we've exchanged it again we've preserved our invariant.

38
00:03:35,000 --> 00:03:44,000
After that point no element to the left of the pointer is going to change and all the element is no smaller element to the right.

39
00:03:44,000 --> 00:03:51,000
And that gives us immediately our code for the selection sort implementation.

40
00:03:51,000 --> 00:03:56,000
We identify the length of the ray that's in in.

41
00:03:56,000 --> 00:04:01,000
Then we have a for loop that goes through every element in the array.

42
00:04:01,000 --> 00:04:03,000
We keep a variable min.

43
00:04:03,000 --> 00:04:09,000
That is the index of the, going to be the index of the smallest element to the right of pointer i.

44
00:04:09,000 --> 00:04:15,000
We have an inner for loop that for j, if it finds a smaller one, resets min.

45
00:04:15,000 --> 00:04:22,000
And then once we've looked at all the elements to the right of i, we exchange the smallest one with i.

46
00:04:22,000 --> 00:04:27,000
That's a complete implementation of selection sort.

47
00:04:27,000 --> 00:04:35,000
Now it's easy to develop a mathematical model for the cost of selection sort.

48
00:04:35,000 --> 00:04:46,000
And here's the proposition that describes that selection sort uses about n squared over two compares and exactly in exchanges.

49
00:04:46,000 --> 00:04:55,000
And just looking at this trace of selection sort in operation really is a visual proof of this proposition.

50
00:04:55,000 --> 00:05:05,000
In this diagram the entries in black are the ones that are examined in order to find the minimum each time with the minimum in red.

51
00:05:05,000 --> 00:05:09,000
Entries in gray are not touched. They're in their final position.

52
00:05:09,000 --> 00:05:21,000
Well, you can see that this is going to be in general an n by n squared in about half of the elements in the square or black or about n squared over two.

53
00:05:21,000 --> 00:05:30,000
And you can see also the exact formula n minus 1 plus n minus 2 and so forth is the total number of compares used.

54
00:05:30,000 --> 00:05:42,000
And then on each of the n values of the variable i, there's an exchange. So that's the cost in terms of the number of exchanges.

55
00:05:42,000 --> 00:05:52,000
Now what's interesting about this proposition about selection sort is that it doesn't matter what order the input is.

56
00:05:52,000 --> 00:06:00,000
Selection sort is going to use quadratic time because it always has to go through the whole thing to look for the minimum.

57
00:06:00,000 --> 00:06:12,000
Another property is that you can't sort moving less data because selection sort does just a linear number of exchanges.

58
00:06:12,000 --> 00:06:19,000
Every item is put into its final position with just one exchange.

59
00:06:19,000 --> 00:06:24,000
You can see that the look and animation of selection sort in operation.

60
00:06:24,000 --> 00:06:35,000
You can see our pointer moving from right to left. Every time it finds the smallest element to the right it exchanges it into position.

61
00:06:35,000 --> 00:06:42,000
Now if the array is partially sorted doesn't matter to selection sort.

62
00:06:42,000 --> 00:06:49,000
It still has to go through even if it's totally sorted. It still has to go through to decide where that minimum element is.

63
00:06:49,000 --> 00:06:54,000
That selection sort, our first elementary sorting method.

