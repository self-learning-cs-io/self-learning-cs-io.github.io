---
title: PrincetonAlgorithms P27Part16 05_sorting Complexity
---

1
00:00:00,000 --> 00:00:07,320
With MerchSource, a good opportunity to take a look at the intrinsic difficulty of the

2
00:00:07,320 --> 00:00:08,320
sorting problem.

3
00:00:08,320 --> 00:00:11,919
Now, that's called complexity, and we'll look at that next.

4
00:00:11,919 --> 00:00:17,280
The idea of complexity is it's a framework for studying the efficiency of all the algorithms

5
00:00:17,280 --> 00:00:21,000
for solving a particular problem.

6
00:00:21,000 --> 00:00:23,400
That's called computational complexity.

7
00:00:23,400 --> 00:00:28,359
In order to do this sensibly, we need what's called a model of computation.

8
00:00:28,359 --> 00:00:31,679
The operations that the algorithms are allowed to perform.

9
00:00:31,679 --> 00:00:34,359
For sorting, that's kind of straightforward.

10
00:00:34,359 --> 00:00:39,119
What we're going to do is have a cost model where we count the comparisons.

11
00:00:39,119 --> 00:00:45,280
Now, in framing the difficulty of problems, we'll need two things.

12
00:00:45,280 --> 00:00:50,719
One is what's called an upper bound, which is a cost guarantee that's provided by some

13
00:00:50,719 --> 00:00:53,920
algorithm for solving the problem.

14
00:00:53,920 --> 00:00:56,679
That's an upper bound on how difficult it is to solve the problem.

15
00:00:56,679 --> 00:00:58,920
You have an algorithm that can solve it.

16
00:00:58,920 --> 00:01:00,479
It's at least that easy.

17
00:01:00,479 --> 00:01:05,239
All the data that's in, and we'll look at a better lower bound and see that MerchSource is

18
00:01:05,239 --> 00:01:07,760
optimal.

19
00:01:07,760 --> 00:01:13,799
Here's the basic idea for proving a lower bound for sorting.

20
00:01:13,799 --> 00:01:17,799
Let's say we have three different items, a boarderings.

21
00:01:17,799 --> 00:01:22,120
This tree has to have at least the infectorial leaves.

22
00:01:22,120 --> 00:01:30,200
If the tree is of height H, it has at most 2 to the H leaves.

23
00:01:30,200 --> 00:01:35,280
The tree that has the most leaves of height H is totally complete.

24
00:01:35,280 --> 00:01:37,760
That one has 2 to the H leaves.

25
00:01:37,760 --> 00:01:42,360
In those observations, give us the lower bound.

26
00:01:42,360 --> 00:01:45,800
2 to the H has to be greater than or equal to the number of leaves.

27
00:01:45,800 --> 00:01:51,240
Then, around fine, optimal algorithms for the problems that we need to solve.

28
00:01:51,239 --> 00:01:54,679
Now you have to take these results in context.

29
00:01:54,679 --> 00:02:01,119
Really what we proved is that MerchSource is optimal with respect to the number of compares.

30
00:02:01,119 --> 00:02:05,919
We already know that it's not optimal with respect to space usage.

31
00:02:05,919 --> 00:02:13,799
MerchSource uses twice as extra space proportional to the size of the array it has to sort.

32
00:02:13,799 --> 00:02:16,759
Simple algorithms like insertion sort don't.

33
00:02:16,759 --> 00:02:21,199
What it tells us, what the theory tells us is don't try to design a sorting algorithm

34
00:02:21,239 --> 00:02:26,519
that guarantees to use substantially fewer compares than MerchSource.

35
00:02:26,519 --> 00:02:28,879
Say half in log n compares.

36
00:02:28,879 --> 00:02:31,679
Is there a method that uses half log n compares?

37
00:02:31,679 --> 00:02:33,679
The lower bound says no.

38
00:02:33,679 --> 00:02:39,679
And that's a very useful thing because otherwise we might try to define such an algorithm.

39
00:02:39,679 --> 00:02:44,519
On the other hand, maybe there is an algorithm that uses in log n compares.

40
00:02:44,519 --> 00:02:50,079
And also uses optimal for the particular model of computation being studied.

41
00:02:50,080 --> 00:02:51,960
This case compares.

42
00:02:51,960 --> 00:02:56,240
It might not hold if the algorithm has more information about the keys.

43
00:02:56,240 --> 00:02:59,960
For example, if it's known that the input is almost ordered,

44
00:02:59,960 --> 00:03:06,120
we saw that insertion sort can be linear time for files that are almost ordered.

45
00:03:06,120 --> 00:03:09,760
Or if something about the distribution of key values,

46
00:03:09,760 --> 00:03:15,160
if there are a lot of equal keys, we can get it sort of faster than n log n.

47
00:03:15,160 --> 00:03:18,320
And maybe the way the keys are represented will look at different methods

48
00:03:18,319 --> 00:03:21,000
that take advantage of such properties.

49
00:03:21,000 --> 00:03:27,039
So partial ordered arrays, we may not need n log n compares.

50
00:03:27,039 --> 00:03:31,199
Duplicate keys, we may not need n compares.

51
00:03:31,199 --> 00:03:37,240
We're going to look at a method that I guess that done in linear time in a lot of situations.

52
00:03:37,240 --> 00:03:40,439
And later on, we'll look at digital properties of keys

53
00:03:40,439 --> 00:03:44,639
where we can use digital character compares instead of whole key compares

54
00:03:44,639 --> 00:03:51,719
and get a faster sort for certain practical applications.

55
00:03:51,719 --> 00:03:55,399
Computational complexity is a very useful way to help us understand

56
00:03:55,399 --> 00:03:58,479
properties of algorithm and help guide our design decisions.

