---
title: PrincetonAlgorithms P10Part13 05_order Of Growth Classifications
---

1
00:00:00,000 --> 00:00:10,000
Now fortunately when we analyze algorithms actually not too many different functions arise

2
00:00:10,000 --> 00:00:16,000
and actually that property allows us to really classify algorithms

3
00:00:16,000 --> 00:00:20,000
according to their performance as the problem size grows.

4
00:00:20,000 --> 00:00:23,000
So that's what we'll talk about next.

5
00:00:23,000 --> 00:00:28,000
So the good news is there's only these few functions turn up about the algorithms

6
00:00:28,000 --> 00:00:30,000
that we're interested in.

7
00:00:30,000 --> 00:00:34,000
We can craft things that have other functions and there are counter examples to this.

8
00:00:34,000 --> 00:00:41,000
But really a great number of the algorithms that we consider are described by these few functions

9
00:00:41,000 --> 00:00:44,000
that are plotted here.

10
00:00:44,000 --> 00:00:53,000
And when we're talking about order of growth, we're not talking about the leading constant.

11
00:00:54,000 --> 00:01:00,000
Normally we'll say the running time of the algorithm is proportional to N log N.

12
00:01:00,000 --> 00:01:07,000
That means we think that our hypothesis is that the running time is till the C log N log N

13
00:01:07,000 --> 00:01:10,000
where C is some constant.

14
00:01:10,000 --> 00:01:16,000
And in these plots, these are log log plots that really give a good idea of what's going on.

15
00:01:16,000 --> 00:01:20,000
If an order of growth is logarithmic or constant,

16
00:01:20,000 --> 00:01:25,000
no matter how big the thing is, it's going to be fast.

17
00:01:25,000 --> 00:01:33,000
The running time is T for, say, a thousand, then for a half a million, it'll be pretty close to T.

18
00:01:33,000 --> 00:01:40,000
If it's linear, if the order of growth is proportional to N, then as the running time,

19
00:01:40,000 --> 00:01:46,000
as the size increases, the running time increases correspondingly.

20
00:01:46,000 --> 00:01:50,000
And the same is true almost if it's N log N.

21
00:01:50,000 --> 00:01:53,000
So those are the algorithms that we strive for.

22
00:01:53,000 --> 00:01:55,000
They scale with the input size.

23
00:01:55,000 --> 00:01:59,000
As the input grows, so grows the running time.

24
00:01:59,000 --> 00:02:03,000
And that's a reasonable situation to be in.

25
00:02:03,000 --> 00:02:07,000
As we talked about, we talked about union find, if it's quadratic,

26
00:02:07,000 --> 00:02:11,000
the running time grows much faster than the input size.

27
00:02:11,000 --> 00:02:15,000
And it's not feasible to use such an algorithm for large inputs.

28
00:02:15,000 --> 00:02:29,000
So what we find is, for many algorithms, our first task is really simply make sure it's not quadratic or qubit.

29
00:02:29,000 --> 00:02:39,000
And these order of growth classifications actually come from kind of simple patterns in terms of the code that we write.

30
00:02:39,000 --> 00:02:45,000
So if our code has no loops in it, then the order of growth is going to be constant.

31
00:02:45,000 --> 00:02:52,000
If our code has some kind of loop where the inputs divided in half,

32
00:02:52,000 --> 00:02:58,000
and so binary search algorithms, an example of that, then our order of growth will be logarithmic.

33
00:02:58,000 --> 00:03:02,000
And we'll take a look at that analysis.

34
00:03:02,000 --> 00:03:07,000
But if you do the doubling test, it grows almost linearly.

35
00:03:07,000 --> 00:03:16,000
If you have a huge input and you double the size, it's still going to be, I'm sorry, not linearly, constant, just like if it's constant.

36
00:03:16,000 --> 00:03:20,000
You'll hardly notice that log in.

37
00:03:20,000 --> 00:03:28,000
If you have a loop where you touch everything in your input, then the running time is linear proportional to n.

38
00:03:28,000 --> 00:03:39,000
So what typical example of that would be find the maximum or count the number of zeros or one sum problem.

39
00:03:39,000 --> 00:03:46,000
A very interesting category is a so-called in-log-in algorithms or linear rhythmic algorithms.

40
00:03:46,000 --> 00:03:53,000
And those are the ones that arise from a particular algorithm design technique called divide and conquer.

41
00:03:53,000 --> 00:04:00,000
And the merge sort algorithm, which we'll talk about in a couple of weeks, is a prime example of that.

42
00:04:00,000 --> 00:04:10,000
And then if you have double four loops, like our two sum algorithm, that's going to be time proportional to n squared, as we saw, that's quadratic.

43
00:04:10,000 --> 00:04:18,000
Or triple four loop, like our three sum algorithm, that's going to be cubic or time proportional to n cubed.

44
00:04:18,000 --> 00:04:31,000
For a quadratic algorithm or a cubic algorithm, the doubling factor is four or eight, as the input size double for a cubic algorithm, the running time goes up by a factor of eight.

45
00:04:31,000 --> 00:04:37,000
And that's the kind of calculation you can do in your head while waiting for a program to finish.

46
00:04:37,000 --> 00:04:42,000
There's also a category of algorithms whose running time is exponential.

47
00:04:42,000 --> 00:04:50,000
And those algorithms n doesn't get very large at all, and we'll talk about those at the end of part two of the course.

48
00:04:50,000 --> 00:04:55,000
So these are some practical implications of the order of growth.

49
00:04:55,000 --> 00:05:09,000
And won't really dwell on this too much, except to come back to the point that the algorithms that we're really interested in that can solve huge problems are the linear and in log n algorithms.

50
00:05:09,000 --> 00:05:23,000
Because even now, a quadratic algorithm on a typical fast computer could only solve problems in saying the tens of thousands and a cubic algorithm only in the size of thousands.

51
00:05:23,000 --> 00:05:33,000
And nowadays, those are just not useful because the amount of data that we have is more like the millions, billions or trillions.

52
00:05:33,000 --> 00:05:39,000
That fact is becoming more and more evident as time wears on.

53
00:05:39,000 --> 00:05:51,000
In ancient times, we'd have some discussion about whether a quadratic algorithm might be useful, but the situation gets worse this time gets on. So we need better algorithms.

54
00:05:51,000 --> 00:06:02,000
To illustrate the process of developing a mathematical model for describing a performance of an algorithm, we'll look at a familiar algorithm called binary search.

55
00:06:02,000 --> 00:06:19,000
The goal is that you have a sorted array of integers say, and you're given a key, and what you want to know is that key in the array. And if it is, what's its index on a fast algorithm for doing this is known as binary search where we compare the key against the middle entry.

56
00:06:19,000 --> 00:06:32,000
In this case, if we're looking for 33, we compare it against 53. If it's smaller, we know it's in the left half of the array. If it's larger, we know it's in the right half of the array. If it's equal, we found it.

57
00:06:32,000 --> 00:06:40,000
And then we apply the same algorithm recursively. So let's quickly look at a demo.

58
00:06:40,000 --> 00:06:49,000
So we're looking for 33 in this array, compare it against the middle entry in the array, 53, and it's less so we go left.

59
00:06:49,000 --> 00:06:58,000
So now we can concentrate just on the left half of the array. Now we look in the middle of this half, that's 25, 33 is bigger, so we go right.

60
00:06:58,000 --> 00:07:08,000
Now we concentrate on the right half of the left half, and we have a smaller sub array. Look at the middle, 33 is less, so we go left.

61
00:07:08,000 --> 00:07:17,000
And now we have only the one element to look at, and we found our key 33 in the array, and we return that index 4.

62
00:07:17,000 --> 00:07:29,000
If we're looking for something that's not in the array, we do the same process, so say we're looking for 34, it's going to be the same, looking the left half, looking the right half, look to the left of the 43.

63
00:07:29,000 --> 00:07:40,000
Now there's only one key to look at, and it's not 34, so we say it's not there. So that's binary search.

64
00:07:40,000 --> 00:07:54,000
So here's the code for binary search. Actually, binary search, although it's a simple algorithm, it's notoriously tricky to get every detail right.

65
00:07:54,000 --> 00:08:06,000
In fact, one paper claimed that the first bug-free binary search was in published until 1962, and even in 2006, bug was found in Java's implementation of binary search.

66
00:08:06,000 --> 00:08:15,000
Just an indication of the care that we have to take in developing algorithms, especially for libraries that are going to be used by millions of people.

67
00:08:16,000 --> 00:08:30,000
So here's an implementation. It's not recursive, although often we can implement this recursively, and it's just a reflexion code, what I described in words.

68
00:08:30,000 --> 00:08:45,000
If we have to find a key-weather-key's in an array, we use two pointers low and high to indicate the part of the array that we're interested in.

69
00:08:45,000 --> 00:08:59,000
As long as low is less than or equal to high, we compute the middle, and then we compare our key against the middle. Actually, it's a three-way compare. It's either less or it's greater, or if it's equal, we return that mid-index.

70
00:08:59,000 --> 00:09:07,000
If it's less, we reset the high pointer, if it's greater, we reset the low pointer, and we keep going until the pointers are equal.

71
00:09:07,000 --> 00:09:18,000
If you're equal and we haven't found it, then we return minus one. And it's easy to persuade ourselves that this program works as advertised by thinking about this invariant.

72
00:09:18,000 --> 00:09:24,000
If the key's in the array, then it's between low and high in the array.

73
00:09:25,000 --> 00:09:33,000
That's a program that you're probably familiar with. Let's look at the mathematical analysis of that program.

74
00:09:33,000 --> 00:09:42,000
This is a theorem that we're going to prove. Usually, we won't do a lot of proofs, but this one's worth doing.

75
00:09:42,000 --> 00:09:51,000
It says that a binary search uses at most one plus log base two of n compares to complete a search in a sort of array of size n.

76
00:09:51,000 --> 00:10:02,000
We do that set up the problem by defining a variable T of n, which is the number of compares that binary search is going to need for a array of size n.

77
00:10:03,000 --> 00:10:28,000
Then we write down a recurrence relation that is reflects the code. And what the code does is it divides the problem size in half so that a T of n is lesser than T of n over two, plus depending on how you count what the compare is, we think of it as really a two-way compare.

78
00:10:28,000 --> 00:10:37,000
So divided in half by doing one compare, and that's true as long as n is bigger than one, it's equal to one. The solution is one.

79
00:10:37,000 --> 00:10:43,000
So that's a recurrence relation describing the computation.

80
00:10:43,000 --> 00:10:56,000
So we can go ahead and solve this recurrence by applying the recurrence itself to the first term on the right. That's called telescoping.

81
00:10:56,000 --> 00:11:12,000
So if this is true, then we can apply the same thing to T of n over two and throw out another one. And if this is true, it can apply the same thing to n over four and throw another one and so forth until we get down to just one,

82
00:11:12,000 --> 00:11:30,000
in which case we have log n ones left. Now this is a proof sketch. You might have noticed that this proof actually only holds if n is a power of two, because we didn't really specify in this recurrence what we mean if n is odd.

83
00:11:30,000 --> 00:11:49,000
But it's possible to go ahead and sorry, possible to go ahead and take care of that detail as well and show that binary search running time is logarithmic always.

84
00:11:49,000 --> 00:12:04,000
All right, so given that fact, we can develop a faster algorithm for three. So it's a sorting based algorithm. And so what we're going to do is we're going to take the numbers that we have as input and sort them.

85
00:12:04,000 --> 00:12:15,000
We'll talk about sorting algorithms next week. And we can get that done in time proportional to n log n, but that's not the main part of the computation.

86
00:12:15,000 --> 00:12:37,000
The main part of the computation is to after the numbers are sorted, we'll go through and for each pair of numbers, AI and AJ, we'll do a binary search for minus AI plus IJ. If we find it, then we have three numbers that sum to zero.

87
00:12:37,000 --> 00:12:54,000
So we sort our numbers and then go through for each pair, do a binary search to see if it's there. So minus 40 zero, minus that is 40. We do a binary search that's in there.

88
00:12:54,000 --> 00:13:06,000
So we have one solution to the three sum problem and do that for all pairs of numbers. Then a quick analysis says the order of growth of the running time is going to be n log n, and we have one solution to the three sum problem.

89
00:13:06,000 --> 00:13:24,000
It's going to be n squared log n. You don't even need a good sort. Well, you could use the elementary insertion sort the first one we talk about. But the running time of the binary search for each of the pairs, each of the n squared pairs are in squared over two pairs.

90
00:13:24,000 --> 00:13:43,000
So we're going to do a binary search so we get an n squared log n running time. So it's a quick example of how we can improve the performance. We can find an improved algorithm to solve a problem n squared log n is much less than n cubed for large n.

91
00:13:43,000 --> 00:14:07,000
And so we're implicitly making the hypothesis that if we do this, do this sort based thing and use binary search, we're going to have a faster program. And sure enough, we can go ahead and run some experiments and find that where it took us 50 seconds to solve the problem for 8,000 numbers before taking less than a second now.

92
00:14:07,000 --> 00:14:27,000
In 50 seconds, we can solve up to 64,000. So typically we expect that better order of growth means faster in practice. But when it comes to examining the algorithms in detail, we can go ahead and do the tests and figure out which algorithm is faster.

93
00:14:27,000 --> 00:14:34,000
And certainly going from n cubed n squared log n, we're going to expect that we're going to have a much better algorithm.

