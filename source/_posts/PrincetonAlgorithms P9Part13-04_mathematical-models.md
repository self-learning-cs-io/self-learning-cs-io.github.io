---
title: PrincetonAlgorithms P9Part13 04_mathematical Models
---

1
00:00:00,000 --> 00:00:08,839
Observing what's happening as we did in the last section is gives us a way to predict performance,

2
00:00:08,839 --> 00:00:12,960
but it really doesn't help us understand what the algorithm is doing.

3
00:00:12,960 --> 00:00:19,600
So next we're going to look at mathematical model a way to get a better concept of what's really happening.

4
00:00:20,600 --> 00:00:30,600
Again, this concept was really developed and popularized by Don Canou starting in the late 60s.

5
00:00:30,600 --> 00:00:36,600
At that time, computer systems were really becoming complicated for the first time.

6
00:00:36,600 --> 00:00:44,600
And computer scientists were concerned about whether we really were going to be able to understand what's going on.

7
00:00:45,600 --> 00:00:52,600
And Canou was very direct in saying that this is something that we certainly can do.

8
00:00:52,600 --> 00:01:00,600
We can calculate the total running time of a program by identifying all the basic operations,

9
00:01:00,600 --> 00:01:08,599
figuring out the cost, figuring out the frequency of execution, and summing up the cost times frequency for all the operations.

10
00:01:08,599 --> 00:01:18,599
You have to analyze the program to determine what set of operations and the cost depends on the machine and the computer in the system as what we talked about before.

11
00:01:18,599 --> 00:01:24,599
The frequency leads us to mathematics because it depends on the algorithm and the input data.

12
00:01:24,599 --> 00:01:35,599
Canou has written a series of books that give very detailed and exact analyses within a particular computer model for a wide range of algorithms.

13
00:01:36,599 --> 00:01:47,599
So from Canou, we know that in principle, we can get accurate mathematical models for the performance of algorithms or programs in operation.

14
00:01:47,599 --> 00:01:51,599
All right, so what does this process look like?

15
00:01:51,599 --> 00:01:56,599
Well, if you want, run experiments.

16
00:01:56,599 --> 00:02:07,599
In ancient times, we would actually look at the computer manual and every computer came with a manual that said precisely how long each instruction would take.

17
00:02:07,599 --> 00:02:11,599
Nowadays, it's a little more complicated, so we run experiments.

18
00:02:11,599 --> 00:02:18,599
And you can go ahead and do a billion ads and figure out that maybe in your computer an ad takes 2.1 nanoseconds.

19
00:02:18,599 --> 00:02:27,599
Or you can do more complicated functions like computer sign or an arch tangent, although that's already getting close to the analysis of algorithms.

20
00:02:27,599 --> 00:02:33,599
So there's some way to determine the cost of the basic operations.

21
00:02:33,599 --> 00:02:42,599
And so in most of the cases, we'll just postulate that it's some constant and you can figure out what the constant is.

22
00:02:43,599 --> 00:02:51,599
Although when we're working with a collection of objects of n objects, there's some things that take time proportional to n.

23
00:02:51,599 --> 00:03:06,599
Like if you're going to allocate a array of size n, it takes time proportional to n because in Java, the default is that all the elements in the array are initialized to zero.

24
00:03:07,599 --> 00:03:12,599
In other operations, it depends on the system implementation.

25
00:03:12,599 --> 00:03:21,599
And an important one is string concatenation. If you concatenate two strings, the running time is proportional to the length of the string.

26
00:03:21,599 --> 00:03:30,599
In many novices, programming in Java make the mistake of assuming that that's a constant time operation when it's not.

27
00:03:30,599 --> 00:03:34,599
All right, so that's the cost of each operation.

28
00:03:34,599 --> 00:03:41,599
More interesting is the frequency of operation, of execution of the operations.

29
00:03:41,599 --> 00:03:52,599
So this is a very simple variant of the three-sum problem. That's the one-sum problem. That's how many numbers are actually equal to zero. How many single numbers add up to zero?

30
00:03:52,599 --> 00:03:59,599
So that one is just one for loop and we go through and we test the number zero in increment or count.

31
00:03:59,599 --> 00:04:10,599
And by analyzing that code, you can see that an i and count have to be declared. Then they have to be assigned to zero.

32
00:04:10,599 --> 00:04:19,600
There's compares of i against n and there's n plus one of them. There's compares of a of i against zero. There's n of those, n array accesses.

33
00:04:19,600 --> 00:04:31,600
In the number incremented is number of times as an increment is variable. i's incremented n times but count could be incremented any number from zero to n times.

34
00:04:31,600 --> 00:04:37,600
And so that frequency is dependent on the input data.

35
00:04:37,600 --> 00:04:46,600
We might need a model for describing that or maybe there's other operations that are more expensive and we won't need to worry about that.

36
00:04:46,600 --> 00:04:59,600
So let's look at next more complicated problem is what about the frequency of execution of instructions in this program which is the two-sum problem. How many pairs of integers sum to zero?

37
00:04:59,600 --> 00:05:24,600
Well, in this case you have to do a little bit of math to see that when we when i goes from zero to n and j goes from i plus one to n, the number of compares that we do or let's say array accesses that we do is two for each time the if statement is executed for a i and a j.

38
00:05:24,600 --> 00:05:48,600
And that time is thing is executed n minus one times the first time through the loop and n minus two the second and so forth. It's the sum of the integers from zero up to n minus one which is a simple discrete sum one half n times n minus one and since we're doing it twice the number of array accesses is n minus one.

39
00:05:48,600 --> 00:05:57,600
So we can go ahead and get these actual exact counts but already it's getting a little bit tedious to do that.

40
00:05:57,600 --> 00:06:09,600
And as far back as touring who also knew that as well as beverage did that we want to have a measure of the amount of work involved in the process.

41
00:06:09,600 --> 00:06:18,600
He recognized that you didn't want to necessarily go through and do it in full detail. It's still helpful to have a crew estimate.

42
00:06:18,600 --> 00:06:26,600
So you could count up the number of times that every operation is applied, give it weights and count the subtract and so forth.

43
00:06:26,600 --> 00:06:35,600
But maybe we should just count the ones that are most expensive. That's what touring said in 1947.

44
00:06:35,600 --> 00:06:40,600
And realistically that's what we do nowadays.

45
00:06:40,600 --> 00:06:56,600
So rather than going in and counting every little detail we take some basic operation that's maybe the most expensive and or and or the one that's executed the most often.

46
00:06:56,600 --> 00:07:02,600
The one that cost times frequency is the highest and use that as a proxy for the running time.

47
00:07:02,600 --> 00:07:09,600
Essentially making the hypothesis that the running time is going to grow like a constant times that.

48
00:07:09,600 --> 00:07:13,600
So in this case we're going to pick array accesses.

49
00:07:13,600 --> 00:07:15,600
So that's the first simplification.

50
00:07:15,600 --> 00:07:22,600
And the second simplification is that we're going to ignore low order terms in the formulas that we derive.

51
00:07:22,600 --> 00:07:27,600
And there's an easy way to do that. It's called the tilde notation.

52
00:07:27,600 --> 00:07:33,600
And the idea is when N is large in a formula like this.

53
00:07:33,600 --> 00:07:39,600
The N cubed term is much much higher than the N term or 16.

54
00:07:39,600 --> 00:07:45,600
In fact so much so that we wouldn't even hardly notice these low order terms.

55
00:07:45,600 --> 00:07:50,600
So all of these formulas are tilde 16 and cubed.

56
00:07:50,600 --> 00:07:56,600
And that's a fine representative or approximate approximation to these quantities.

57
00:07:56,600 --> 00:08:02,600
And it greatly simplifies the calculations to throw away the low order terms like this.

58
00:08:02,600 --> 00:08:09,600
So by focusing on one operation and throwing away the tildes the low order terms.

59
00:08:09,600 --> 00:08:12,600
And this is the technical definition of tilde.

60
00:08:12,600 --> 00:08:17,600
It just effigente tilde g of N means the limit as fn or gn equals 1.

61
00:08:17,600 --> 00:08:24,600
And you can check that that's going to hold in these kinds of situations.

62
00:08:24,600 --> 00:08:27,600
So that greatly simplifies the frequency counts.

63
00:08:27,600 --> 00:08:32,600
And if we're only picking one thing we're just talking about tilde N squared.

64
00:08:32,600 --> 00:08:39,600
And maybe another tilde N squared for the increment for the two sum problems say.

65
00:08:39,600 --> 00:08:42,600
So again when N is large the terms are negligible.

66
00:08:42,600 --> 00:08:49,600
When N is really small they're not negligible but we don't really care because we're trying to estimate running times for large N.

67
00:08:49,600 --> 00:08:54,600
And running times for small N are going to be small no matter what.

68
00:08:54,600 --> 00:08:59,600
All right so now we're using both the cost model and the tilde notation.

69
00:08:59,600 --> 00:09:16,600
And we can simply say that this program uses tilde N squared array accesses and have implicit the hypothesis that we think the running time is going to be tilde a constant times N squared.

70
00:09:16,600 --> 00:09:20,600
Okay now what about three sum let's do our real problem.

71
00:09:20,600 --> 00:09:23,600
So now we have the triple loop.

72
00:09:23,600 --> 00:09:29,600
And then we have to do a more complicated common tutorial problem.

73
00:09:29,600 --> 00:09:32,600
And it's not that big a deal really.

74
00:09:32,600 --> 00:09:40,600
We're looking at the distinct number of ways you can choose three things out of N.

75
00:09:40,600 --> 00:09:43,600
And that's the binomial coefficient.

76
00:09:44,600 --> 00:09:50,600
And again doing the math and using the tilde it's just tilde 1, 6, N cubed.

77
00:09:50,600 --> 00:09:56,600
Three array accesses for each triple so we can say half N cubed.

78
00:09:56,600 --> 00:10:02,600
So we're not computing and summing the costs of all operations.

79
00:10:02,600 --> 00:10:03,600
That's too much work.

80
00:10:03,600 --> 00:10:15,600
We're picking the most expensive in terms of cost times frequency and approximating that and trying to get a good model for the running time.

81
00:10:15,600 --> 00:10:22,600
So now most we're not going to do a full discrete mathematics in this course.

82
00:10:22,600 --> 00:10:31,600
But there's some basic things that we'll want to use and are not that difficult to understand.

83
00:10:31,600 --> 00:10:40,600
So a lot of times we find out that we need to come up with an estimate of a discrete sun like we did for 1 plus 2 up to N,

84
00:10:40,600 --> 00:10:45,600
or some of the squares or other things like the three sum triple loop.

85
00:10:45,600 --> 00:10:53,600
And so actually if you've had a basic calculus one way to think of it is to just replace the sum with an integral.

86
00:10:53,600 --> 00:11:01,600
That usually works or we can do the math and use the so-called orlimic Lorentz summation formula to get a true approximation.

87
00:11:01,600 --> 00:11:12,600
But if you think of it this way, you'll believe us when we say that that thing is tilde half N squared or sum of 1 plus 1 half plus 1 third up to 1 over N.

88
00:11:12,600 --> 00:11:18,600
That's like integral from x equals 1 to N 1 over x and that's natural log of N.

89
00:11:18,600 --> 00:11:28,600
Even the three sum triple loop kind of if you're used to multiple integrals will quickly give you the 1 6th N cubed.

90
00:11:28,600 --> 00:11:34,600
There's many more and other techniques that we could use for this and we're not going to teach all that.

91
00:11:34,600 --> 00:11:39,600
But will sometimes refer to results of this type.

92
00:11:39,600 --> 00:11:47,600
Alright so in principle Knuth tells us that accurate mathematical models are available.

93
00:11:47,600 --> 00:11:51,600
In practice we can get really complicated formulas.

94
00:11:51,600 --> 00:12:04,600
We also might need some advanced mathematics that the theoretician will revel in but that maybe people learning algorithms for the first time might not be expected to know.

95
00:12:04,600 --> 00:12:12,600
So in the end careful exact models are best left for experts.

96
00:12:12,600 --> 00:12:15,600
There's really a lot of things that can go on.

97
00:12:15,600 --> 00:12:32,600
On the other hand approximate models are definitely worthwhile and for all the algorithms that we consider we'll try to communicate a reasonable approximate model that can be used to describe the running time.

98
00:12:32,600 --> 00:12:41,600
Sometimes we'll give the mathematical proofs and other times we'll have to just cite the work of some expert.

