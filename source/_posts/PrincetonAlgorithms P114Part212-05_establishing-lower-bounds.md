---
title: PrincetonAlgorithms P114Part212 05_establishing Lower Bounds
---

1
00:00:00,000 --> 00:00:09,720
There's another very important reason to use reduction, and that gets us closer to our goal

2
00:00:09,720 --> 00:00:16,039
of being able to classify the difficulty of problems, and that's to establish lower bounds.

3
00:00:16,039 --> 00:00:18,080
So let's take a look at that.

4
00:00:18,080 --> 00:00:24,000
So what we want to do is come up with a proof that a problem requires a certain number

5
00:00:24,000 --> 00:00:27,000
of computational steps.

6
00:00:27,000 --> 00:00:33,299
When we had an example of that for sorting, we showed that in the decision tree model,

7
00:00:33,299 --> 00:00:40,640
any compare-based sorting algorithm has to use at least in-log-in compares in the worst case.

8
00:00:40,640 --> 00:00:46,320
And we showed that by showing that no matter what the algorithm is, it has to distinguish

9
00:00:46,320 --> 00:00:54,120
between all the possible cases of sorting, and that led us to, in fact, a tree that has

10
00:00:54,119 --> 00:00:58,679
in fact, a real leaves on the bottom and the height of the tree has to be at least log

11
00:00:58,679 --> 00:01:00,479
of that, which is then log-in.

12
00:01:00,479 --> 00:01:04,799
And you can go back to the sorting lecture and look at that.

13
00:01:04,799 --> 00:01:12,359
Now that's a complicated argument that certainly took you a little while to understand.

14
00:01:12,359 --> 00:01:19,400
And in general, it's extremely difficult to establish lower bounds because it generally

15
00:01:19,400 --> 00:01:21,640
requires a complicated argument like that.

16
00:01:21,640 --> 00:01:28,719
You have to be arguing about all possible algorithms, and that's very often tough to do.

17
00:01:28,719 --> 00:01:34,520
Initially, there was a lot of optimism that would be able to have lower bounds as researchers

18
00:01:34,520 --> 00:01:37,480
work more and more and would be able to classify problems.

19
00:01:37,480 --> 00:01:44,000
It's actually worked out pretty difficult to get non-Turvia lower bounds for all kinds

20
00:01:44,000 --> 00:01:48,400
of computational problems where people thought it would be easy.

21
00:01:48,400 --> 00:01:55,400
But the good news is that reduction allows us to take the ones that we have and spread

22
00:01:55,400 --> 00:01:59,960
the lower bounds.

23
00:01:59,960 --> 00:02:10,800
So, if we can reduce sorting to a new problem without too high a cost of reduction, that gives

24
00:02:10,800 --> 00:02:13,879
us an end log-in lower bound on that problem.

25
00:02:13,879 --> 00:02:17,759
So, let's see how that works.

26
00:02:17,759 --> 00:02:22,079
So we have to make sure the cost of the reduction is not high.

27
00:02:22,079 --> 00:02:23,079
That's key.

28
00:02:23,079 --> 00:02:29,359
So, in actually most of the time, like in the examples that we've looked at, we use linear

29
00:02:29,359 --> 00:02:30,879
time reduction.

30
00:02:30,879 --> 00:02:38,479
So, that is we only use a constant number of calls to Y.

31
00:02:38,479 --> 00:02:41,239
And we use just a linear number of steps.

32
00:02:41,239 --> 00:02:46,759
So usually we're going through everything in the input the output to do some kind of conversion.

33
00:02:46,759 --> 00:02:53,479
And that's what we've done in all the examples that we've seen so far.

34
00:02:53,479 --> 00:03:05,959
So then the idea is if there's a lower bound for X and you reduce X to Y, that establishes

35
00:03:05,959 --> 00:03:07,560
a lower bound on Y.

36
00:03:07,560 --> 00:03:09,879
So, why is that?

37
00:03:09,879 --> 00:03:15,799
If I could solve Y more quickly, then I could use the reduction to solve X more quickly.

38
00:03:16,520 --> 00:03:21,240
So if I have a reduction from X to Y, and there's a lower bound of end log-in, and X, I

39
00:03:21,240 --> 00:03:23,400
can't have a linear algorithm on Y.

40
00:03:23,400 --> 00:03:28,240
Because if I did, and I have a linear time reduction, that would give me a linear time algorithm

41
00:03:28,240 --> 00:03:29,240
for X.

42
00:03:29,240 --> 00:03:33,760
Same way, if I have a lower bound of n squared for X, I can't have an end log-in algorithm

43
00:03:33,760 --> 00:03:34,760
for Y.

44
00:03:34,760 --> 00:03:41,520
Because if I did, since I reduce X to Y, then that would give me a linear time algorithm

45
00:03:41,520 --> 00:03:42,520
for Y.

46
00:03:42,520 --> 00:03:47,520
So the reduction allows us to propagate the lower bound.

47
00:03:47,520 --> 00:03:52,240
If I could solve Y, then I could easily solve X. But I know I can't easily solve X. So

48
00:03:52,240 --> 00:03:55,680
therefore, I can't easily solve Y.

49
00:03:55,680 --> 00:04:02,680
It's a very powerful technique and really where most of our lower bounds come from.

50
00:04:02,680 --> 00:04:10,040
So just for an example, let's look at lower bound for the convex whole algorithm.

51
00:04:10,759 --> 00:04:15,759
And it's again convex whole and sorting, don't seem so related.

52
00:04:15,759 --> 00:04:26,959
But it's actually the case that in any algorithm for convex whole is going to take end log-in.

53
00:04:26,959 --> 00:04:32,079
So we start with a more general statement about sorting.

54
00:04:32,079 --> 00:04:36,480
It's a so-called quadratic decision tree model.

55
00:04:36,480 --> 00:04:43,720
And this is just a detail about the model of computation that makes the idea of comparing

56
00:04:43,720 --> 00:04:47,560
a sorting algorithm to a convex whole algorithm.

57
00:04:47,560 --> 00:04:50,640
It makes them both use the same operation.

58
00:04:50,640 --> 00:04:56,120
So quadratic decision tree, you get not just to use comparisons, but you can use tests

59
00:04:56,120 --> 00:05:00,759
like the product of the difference of two numbers.

60
00:05:00,759 --> 00:05:04,280
Are they less than zero or not?

61
00:05:04,279 --> 00:05:11,919
And those are the basic kinds of operations that you're going to use in the geometric algorithms.

62
00:05:11,919 --> 00:05:18,119
And so the proposition is that under this model, sorting linear time reduces the convex

63
00:05:18,119 --> 00:05:20,119
whole.

64
00:05:20,119 --> 00:05:27,359
So that says, if I can compute the convex whole, then I can sort.

65
00:05:27,359 --> 00:05:33,559
Since I can't sort faster than end log-in, I can't do convex whole faster than end log-in.

66
00:05:34,279 --> 00:05:37,159
In the proof of that, it's not terribly difficult.

67
00:05:37,159 --> 00:05:40,839
But the implication is really important.

68
00:05:40,839 --> 00:05:48,239
So convex whole algorithms, it was just based on that idea, am I making a right turn?

69
00:05:48,239 --> 00:05:52,159
That's called a CCW test in computational geometry.

70
00:05:52,159 --> 00:05:53,479
I have three points.

71
00:05:53,479 --> 00:05:58,279
And going from first to second and third, is that a counterclockwise turn?

72
00:05:58,279 --> 00:06:02,839
And then you can implement that test with these kind of quadratic things.

73
00:06:02,839 --> 00:06:05,719
It's just testing the slopes of two lines in comparing them.

74
00:06:05,719 --> 00:06:08,719
So it's kind of like a comparison.

75
00:06:08,719 --> 00:06:15,919
And the implication of the fact of sorting reduces the convex whole means that it can't

76
00:06:15,919 --> 00:06:19,120
solve convex whole fast.

77
00:06:19,120 --> 00:06:24,120
And so how do we do the reduction between sorting in convex whole?

78
00:06:24,120 --> 00:06:25,919
And again, I have a sorting instance.

79
00:06:25,919 --> 00:06:28,479
I have some numbers to sort.

80
00:06:28,480 --> 00:06:33,439
And what I want to do is create a convex whole instance that gives me the sorting.

81
00:06:33,439 --> 00:06:38,640
Well, all we do is we take the numbers that were supposed to be sorted, and we convert

82
00:06:38,640 --> 00:06:41,800
them into points on a parabola.

83
00:06:41,800 --> 00:06:46,800
So we just take x1 and x1 squared and x2 and x2 squared.

84
00:06:46,800 --> 00:06:50,960
And like that, those are points on a parabola.

85
00:06:50,960 --> 00:06:56,160
Now there's no points, and we give that to the convex whole algorithm.

86
00:06:56,160 --> 00:07:00,680
Now all of those points are on the convex whole.

87
00:07:00,680 --> 00:07:06,880
In the convex whole algorithm, it's supposed to return them in clockwise order.

88
00:07:06,880 --> 00:07:13,720
And you can see with just finding the smallest, that gives us the points in sorted order.

89
00:07:13,720 --> 00:07:16,040
So the convex whole algorithm does its job.

90
00:07:16,040 --> 00:07:17,560
However, it does it.

91
00:07:17,560 --> 00:07:21,640
We can take the solution of the convex whole algorithm and get a solution to the sorting

92
00:07:21,640 --> 00:07:22,960
algorithm.

93
00:07:22,960 --> 00:07:26,080
Sorting reduces the convex whole.

94
00:07:26,079 --> 00:07:31,719
Therefore, convex whole can't be easy because that would make sorting easy.

95
00:07:31,719 --> 00:07:34,800
This kind of thinking is really profound.

96
00:07:34,800 --> 00:07:41,560
And it has really done a lot to enhance our understanding of the difficulty of different

97
00:07:41,560 --> 00:07:43,839
algorithmic problems.

98
00:07:43,839 --> 00:07:48,120
So that's the proof that I just explained.

99
00:07:48,120 --> 00:07:52,399
This parabola thing is definitely going to be convex, and all the things are on the

100
00:07:52,399 --> 00:07:53,399
hall.

101
00:07:53,399 --> 00:07:57,679
So we just get the point that's got the most negative x coordinate, and you've got the

102
00:07:57,679 --> 00:08:02,239
integers in order.

103
00:08:02,239 --> 00:08:08,039
So establishing lower bounds through reduction is really important.

104
00:08:08,039 --> 00:08:12,000
We have a big convex whole problem to solve.

105
00:08:12,000 --> 00:08:15,199
And we're wondering, do we have a linear time algorithm for this?

106
00:08:15,199 --> 00:08:18,719
It's a quite natural thing to wonder.

107
00:08:18,720 --> 00:08:22,400
And so how are you going to convince yourself that there's no linear time convex whole

108
00:08:22,400 --> 00:08:24,080
algorithm?

109
00:08:24,080 --> 00:08:29,000
One thing you can do, and believe me, a lot of people did this, is just try to find a linear

110
00:08:29,000 --> 00:08:30,000
time algorithm.

111
00:08:30,000 --> 00:08:31,000
Keep working at it.

112
00:08:31,000 --> 00:08:33,120
Keep working at it.

113
00:08:33,120 --> 00:08:39,399
You're going to use algorithms that are based on this simple comparison between points.

114
00:08:39,399 --> 00:08:42,240
This doesn't seem like it should take in log in.

115
00:08:42,240 --> 00:08:46,200
It seems like we should be able to find a linear time algorithm.

116
00:08:46,200 --> 00:08:47,879
Well, that's the hard way.

117
00:08:47,879 --> 00:08:53,560
The easy way is to know that reduction from sorting, and that means there's no point

118
00:08:53,560 --> 00:08:58,920
in trying to put in our effort to try to improve on the grand scan.

119
00:08:58,920 --> 00:09:00,560
Grand scan gets it done in analog in.

120
00:09:00,560 --> 00:09:03,560
We can't do better than analog in.

121
00:09:03,560 --> 00:09:08,600
So we might as well call it a day and move on to some other problem.

122
00:09:08,600 --> 00:09:13,520
That's an example of reduction for proving lower bounds to help us guide our algorithm

123
00:09:13,520 --> 00:09:14,240
design effort.

