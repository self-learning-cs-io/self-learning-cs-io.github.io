---
title: PrincetonAlgorithms P11Part13 06_theory Of Algorithms
---

1
00:00:00,000 --> 00:00:07,240
In fact, order of growth classifications are so important they've led to an enormous

2
00:00:07,240 --> 00:00:12,439
amount of research in recent years and we'll just talk briefly about that now.

3
00:00:12,439 --> 00:00:20,519
So life is a little bit more complicated than pointed out in the last example.

4
00:00:20,519 --> 00:00:28,560
One problem is that the inputs can cause the performance, the algorithm to vary widely.

5
00:00:28,559 --> 00:00:35,439
So often we have to think about different ways of analyzing the algorithm depending on the input.

6
00:00:35,439 --> 00:00:40,560
So the running time is going to be somewhere between the best case and the worst case.

7
00:00:40,560 --> 00:00:43,359
Best case is a lower bound on cost.

8
00:00:43,359 --> 00:00:52,439
It provides something that the running time is going to be bigger than that always or less than that.

9
00:00:52,439 --> 00:00:56,159
And then there's the worst case which is the most difficult input.

10
00:00:56,159 --> 00:01:03,159
If we analyze that then we can guarantee that the running time of the algorithm is not going to be bigger than that.

11
00:01:03,159 --> 00:01:10,159
And then in a lot of situations we might consider our input to be random.

12
00:01:10,159 --> 00:01:16,159
Well we need to, some way to model what we mean by random for the problem that we're solving.

13
00:01:16,159 --> 00:01:23,159
But there's a lot of situations where we can do that and then we have a way to predict performance.

14
00:01:23,159 --> 00:01:28,159
Even when the input might vary widely.

15
00:01:28,159 --> 00:01:35,159
So for example for three sum it's kind of always the same.

16
00:01:35,159 --> 00:01:42,159
With the tilde notation the only variability in that algorithm is the number of times the counter is incremented.

17
00:01:42,159 --> 00:01:48,159
And that's in lower term so it doesn't even show up in our analysis.

18
00:01:48,159 --> 00:01:57,159
For binary search it might, you might find the thing right away in which case is constant time.

19
00:01:57,159 --> 00:02:04,159
And we can show that the average in the worst case are both log, log base two of n.

20
00:02:04,159 --> 00:02:11,159
And there's other, in another examples there be much more variability even.

21
00:02:11,159 --> 00:02:19,159
So we have these different types of analyses depending on the input.

22
00:02:19,159 --> 00:02:24,159
But the question is what about the actual problem that the client is trying to solve?

23
00:02:24,159 --> 00:02:30,159
So we have to understand that too in order to be able to understand performance of the algorithm.

24
00:02:30,159 --> 00:02:35,159
And there's two approaches that are successful in this.

25
00:02:35,159 --> 00:02:38,159
One is to design for the worst case.

26
00:02:38,159 --> 00:02:42,159
And just make sure your algorithm always runs quickly.

27
00:02:42,159 --> 00:02:45,159
And that's definitely ideal.

28
00:02:45,159 --> 00:02:52,159
Another is to, if you can't do that, is to randomize and then depend on some kind of probabilistic guarantee.

29
00:02:52,159 --> 00:02:58,159
And we'll see examples of both of these as we go through the course.

30
00:02:58,159 --> 00:03:07,159
Now those kinds of considerations and the idea of order of growth leads to a discussion of what's called what I call the first.

31
00:03:07,159 --> 00:03:10,159
What's called what I call the theory of algorithms.

32
00:03:10,159 --> 00:03:15,159
And here our goals are we have a problem to solve, like solve the three-sum problem.

33
00:03:15,159 --> 00:03:17,159
And we want to know how difficult it is.

34
00:03:17,159 --> 00:03:21,159
We want to find the best algorithm for solving that problem.

35
00:03:21,159 --> 00:03:31,159
Now the approach that computer scientists use for this is to try to suppress as many details as possible in the analysis.

36
00:03:31,159 --> 00:03:35,159
And so just to analyze the running time too within a constant factor.

37
00:03:35,159 --> 00:03:38,159
That's what order of growth is getting at.

38
00:03:38,159 --> 00:03:44,159
And also we want to not worry about the input model at all.

39
00:03:44,159 --> 00:03:47,159
And so we focus on worst case design.

40
00:03:47,159 --> 00:03:53,159
Then we can talk about performance of algorithms just in terms of the order of growth.

41
00:03:53,159 --> 00:04:02,159
And it's actually possible to do that in a very rigorous way that has taught us a lot about the difficulty of solving problems.

42
00:04:03,159 --> 00:04:16,159
And our goal is to find an optimal algorithm where we can guarantee within a constant factor certain performance for any input because we discovered worst case.

43
00:04:16,159 --> 00:04:22,159
But we also can have a proof that no algorithm can provide a better performance guarantee.

44
00:04:22,159 --> 00:04:25,159
I'll give a couple of easy examples of this.

45
00:04:26,160 --> 00:04:37,160
Now in order to do this, there are these commonly used notations called the big theta big O and big O made Omega notations.

46
00:04:37,160 --> 00:04:43,160
So the definitions are given here.

47
00:04:44,160 --> 00:04:48,160
So the big theta notation is just a way to describe the order of growth.

48
00:04:48,160 --> 00:04:55,160
Theta of n squared is kind of short hand for anything times n squared.

49
00:04:55,160 --> 00:04:59,160
It's bounded above and below by constant times n squared.

50
00:04:59,160 --> 00:05:02,160
And that's what we really use to classify algorithms.

51
00:05:02,160 --> 00:05:07,160
And then there's big O notation which is upper bounds on performance.

52
00:05:08,160 --> 00:05:14,160
And we say big O of n squared, we mean that it's less than some constant times n squared as n grows.

53
00:05:14,160 --> 00:05:21,160
And big O mega is used for lower bounds, we mean it's greater than some constant times n squared as n grows.

54
00:05:21,160 --> 00:05:30,160
So those three notations were able to use to classify algorithms and I'll show in the following.

55
00:05:31,160 --> 00:05:37,160
Examples from our 1, 2, 7, and 3 sum are easy to articulate.

56
00:05:37,160 --> 00:05:42,160
So our goals are to establish the difficulty of the problem and develop an optimal algorithm.

57
00:05:42,160 --> 00:05:46,160
So the 1, 7 problem is there a zero in the array.

58
00:05:46,160 --> 00:05:52,160
Well an upper bound on the difficulty of the problem is some specific algorithm.

59
00:05:52,160 --> 00:05:59,160
So for example, the brute force algorithm that looks at every array entry is a specific algorithm.

60
00:06:00,160 --> 00:06:08,160
And it means that and that takes O of n time, you have to look at every, it's less than a constant times n for some constant.

61
00:06:08,160 --> 00:06:13,160
So the running time of the optimal algorithm has to be O of n.

62
00:06:13,160 --> 00:06:20,160
That is that specific algorithm provides an upper bound on the running time of the optimal algorithm.

63
00:06:20,160 --> 00:06:25,160
But in this case it's also easy to develop a lower bound.

64
00:06:25,160 --> 00:06:28,160
That's a proof that no algorithm can do better.

65
00:06:28,160 --> 00:06:36,160
So for one sum, you have to examine all entries in the array if you miss one, then that one might be zero.

66
00:06:36,160 --> 00:06:46,160
So that means that the optimal algorithm has to have a running time at least some constant times n, or we say the running time is O of n.

67
00:06:46,160 --> 00:06:51,160
Now in this case the upper bound and the lower bound match.

68
00:06:51,160 --> 00:06:59,160
So to within a constant factor, so that's a proof that the brute force algorithm for one sum is optimal.

69
00:06:59,160 --> 00:07:02,160
It's running time is theta of n.

70
00:07:02,160 --> 00:07:05,160
It's both omega and N of n.

71
00:07:05,160 --> 00:07:12,160
For that simple problem, it was okay to get the optimal algorithm for more complicated problems.

72
00:07:12,160 --> 00:07:19,160
It's going to be more difficult to get upper bounds and lower bounds, and particularly upper bounds and lower bounds that match.

73
00:07:19,160 --> 00:07:22,160
For example, let's look at three sum.

74
00:07:22,160 --> 00:07:35,160
So upper bound for three sum, say our first brute force algorithm said that the proof was approved that the running time of the optimal algorithm is O of n cubed.

75
00:07:35,160 --> 00:07:42,160
But we found a better improved algorithm whose running time is O of n squared log n.

76
00:07:42,160 --> 00:07:45,160
So that's a better upper bound.

77
00:07:45,160 --> 00:07:53,160
Lower bound? Well, we have to examine all entries because again we might miss one that makes three sum equals zero.

78
00:07:53,160 --> 00:07:59,160
And that's a proof that the running time of the optimal algorithm is O of n.

79
00:07:59,160 --> 00:08:04,160
But nobody knows a higher lower bound for three sum.

80
00:08:04,160 --> 00:08:11,160
So there's a gap between the upper bound and the lower bound and open problems.

81
00:08:11,160 --> 00:08:15,160
Is there an optimal algorithm for three sum? We don't know what it is.

82
00:08:15,160 --> 00:08:23,160
We don't even know if there's an algorithm whose running time is less than O of n squared.

83
00:08:23,160 --> 00:08:26,160
Or we don't know a higher lower bound than linear.

84
00:08:26,160 --> 00:08:30,160
So that's an example of an open problem in the theory of algorithms.

85
00:08:30,160 --> 00:08:35,160
We don't know how difficult it is to solve the three sum problem.

86
00:08:35,159 --> 00:08:41,159
So this point of view has been extremely successful in recent decades.

87
00:08:41,159 --> 00:08:46,159
We have a new problem. Develop some algorithm. Prove some lower bound.

88
00:08:46,159 --> 00:08:51,159
If there's a gap, we look for a new algorithm that will lower the upper bound.

89
00:08:51,159 --> 00:08:54,159
Or we try to find a way to raise the lower bound.

90
00:08:54,159 --> 00:08:58,159
Usually it's very difficult to prove non-trivial lower bounds.

91
00:08:58,159 --> 00:09:02,159
Trivial lower bound, like look at every input item, it's not so hard.

92
00:09:02,159 --> 00:09:10,159
Non-trivial lower bounds, like for example the proof that we talked about for the union fine problem,

93
00:09:10,159 --> 00:09:13,159
are much more difficult.

94
00:09:13,159 --> 00:09:21,159
And in the last several decades, people have learned about the computational difficulty of problems

95
00:09:21,159 --> 00:09:26,159
by examining steadily decreasing upper bounds.

96
00:09:26,159 --> 00:09:31,159
So algorithms with better worst case running times for lots and lots of important problems.

97
00:09:31,159 --> 00:09:36,159
In plenty of optimal algorithms, when plenty of gaps still remain,

98
00:09:36,159 --> 00:09:41,159
it's a fascinating field of research that many people are engaged in.

99
00:09:41,159 --> 00:09:47,159
Now there's a couple of caveats on this in the context of this course.

100
00:09:47,159 --> 00:09:53,159
And the first one is maybe it's overly pessimistic to be focusing on the worst case.

101
00:09:53,159 --> 00:09:58,159
We've got data out there, we've got problems to solve. Maybe it's not worst case data

102
00:09:58,159 --> 00:10:03,159
in lots of fields of engineering and science. We don't focus on the worst case.

103
00:10:03,159 --> 00:10:08,159
The worst case for this course would be for lightning to strike and it would be over.

104
00:10:08,159 --> 00:10:13,159
So we don't plan for that. And similar is true for algorithms.

105
00:10:13,159 --> 00:10:20,159
Maybe we should be focusing on understanding properties of the input and finding algorithms that are efficient for that input.

106
00:10:20,159 --> 00:10:25,159
And the other thing is in order to really predict performance and compare algorithms,

107
00:10:25,159 --> 00:10:31,159
we need to do a closer analysis than to within a constant factor.

108
00:10:31,159 --> 00:10:38,159
So we talked about the Tilda notation in the big theta, big O'Neill,

109
00:10:38,159 --> 00:10:41,159
and big O'Neill that are used in the theory of algorithms.

110
00:10:41,159 --> 00:10:47,159
And really there's so much published research in the theory of algorithms

111
00:10:47,159 --> 00:10:53,159
that a lot of people make the mistake of interpreting the big O results

112
00:10:53,159 --> 00:10:58,159
that are supposed to give improved upper bounds on the difficulty of the problem

113
00:10:58,159 --> 00:11:02,159
as approximate models for the running time. And that's really a mistake.

114
00:11:02,159 --> 00:11:09,159
So in this course, we're going to focus on approximate models by making sure that we use the Tilda notation.

115
00:11:09,159 --> 00:11:14,159
And we'll try to give specific results for certain quantities of interest

116
00:11:14,159 --> 00:11:19,159
in any unspecified constant in the running time,

117
00:11:19,159 --> 00:11:22,159
we'll have to do with properties of the machine and the system.

118
00:11:22,159 --> 00:11:29,159
So that we'll be able to use these results to predict performance into compare algorithms.

