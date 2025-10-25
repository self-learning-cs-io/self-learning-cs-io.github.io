---
title: CS143 P103Week815 03 Analysis Of Loops
---

1
00:00:00,000 --> 00:00:08,560
In this video, we're going to continue our discussion of analysis of control flow graphs by

2
00:00:08,560 --> 00:00:13,560
focusing on what is undoubtedly the most interesting aspect of the whole problem, the analysis

3
00:00:13,560 --> 00:00:17,440
of loops.

4
00:00:17,440 --> 00:00:20,240
Here's an example of control flow graph with a loop in it.

5
00:00:20,240 --> 00:00:26,359
And it turns out that the need for the special element bottom in our analysis is intimately

6
00:00:26,359 --> 00:00:28,719
tied to the analysis of loops.

7
00:00:28,719 --> 00:00:34,799
And so let's just think about how we would do our constant propagation example analysis

8
00:00:34,799 --> 00:00:38,000
with this particular control flow graph.

9
00:00:38,000 --> 00:00:40,799
So what do we know about x?

10
00:00:40,799 --> 00:00:43,039
So initially we don't know anything.

11
00:00:43,039 --> 00:00:48,120
So before we enter the control flow graph, its value is top.

12
00:00:48,120 --> 00:00:52,480
And after the assignment to three, we'll know that x has the value three.

13
00:00:52,480 --> 00:00:57,480
The conditional branch here, the predicate, won't affect the value of x.

14
00:00:57,479 --> 00:01:01,519
So it'll be three on both branches, the assignment to y won't affect it, so it'll be three

15
00:01:01,519 --> 00:01:03,679
here as well.

16
00:01:03,679 --> 00:01:05,640
And now we come here.

17
00:01:05,640 --> 00:01:08,799
And let's focus on this statement right here.

18
00:01:08,799 --> 00:01:16,039
So the rule is that the analysis of x at y equals zero.

19
00:01:16,039 --> 00:01:23,959
Okay, so with the value of x right here before the assignment to y is a function of all the

20
00:01:23,959 --> 00:01:24,959
predecessors.

21
00:01:24,959 --> 00:01:28,039
We need to know what the value of x is on both of the incoming edges.

22
00:01:28,039 --> 00:01:30,159
Okay, well we don't have a value down here yet.

23
00:01:30,159 --> 00:01:35,759
So the question is, what is the value of x here on this edge?

24
00:01:35,759 --> 00:01:38,000
And in order to figure that out, we'd have to look at its predecessors.

25
00:01:38,000 --> 00:01:39,399
Okay, well what are its predecessors?

26
00:01:39,399 --> 00:01:42,319
Well, there's this point here after the predicate.

27
00:01:42,319 --> 00:01:44,839
There's this point here between the two statements.

28
00:01:44,839 --> 00:01:47,639
And then there's this point here after the execution of y.

29
00:01:47,639 --> 00:01:52,599
We're just following the edges backwards here, looking at where we need to know information

30
00:01:52,599 --> 00:01:53,599
for x.

31
00:01:53,599 --> 00:01:58,319
So here we need to know it here and we need to know it here.

32
00:01:58,319 --> 00:02:03,719
All right, and then because of this edge, that means we again need to know it at both

33
00:02:03,719 --> 00:02:06,119
of the predecessors of y equals to zero.

34
00:02:06,119 --> 00:02:09,159
So now we're in the loop and this isn't too surprising.

35
00:02:09,159 --> 00:02:14,319
I mean, if you have, if information about x depends on the predecessors of a statement and

36
00:02:14,319 --> 00:02:18,959
you do follow that recursively, then you're going to wind up going around loops like this.

37
00:02:19,680 --> 00:02:26,159
And there's no good way, at least it's not in a particularly immediately obvious way,

38
00:02:26,159 --> 00:02:27,159
to solve this problem.

39
00:02:27,159 --> 00:02:33,439
So how do we get information about the predecessor, the predecessors of y equals zero,

40
00:02:33,439 --> 00:02:34,879
when they depend on themselves?

41
00:02:36,879 --> 00:02:41,000
So I'd be more precise looking at that particular statement again, in order to compute

42
00:02:41,000 --> 00:02:46,920
whether x is constant at the point right before the statement y equals zero,

43
00:02:46,919 --> 00:02:52,399
we need to know whether x is constant at the two predecessors and that information depends

44
00:02:52,399 --> 00:02:55,399
on his predecessors, which include y equals to zero.

45
00:02:55,399 --> 00:02:56,919
Okay, so this is the conundrum.

46
00:02:56,919 --> 00:03:02,079
So how are we to solve this recursive problem?

47
00:03:04,079 --> 00:03:10,239
And there's a standard solution that is actually used in many areas of mathematics,

48
00:03:10,239 --> 00:03:13,560
not just in the analysis of loops.

49
00:03:13,560 --> 00:03:18,039
When you have these kinds of recurrence relationships or recursive equations.

50
00:03:18,039 --> 00:03:24,039
And the standard solution is to break the cycle by starting with some initial guess.

51
00:03:24,039 --> 00:03:31,879
So you have some initial approximation that is really not perhaps even expected to be the final result,

52
00:03:31,879 --> 00:03:33,319
but allows you to get going.

53
00:03:33,319 --> 00:03:36,840
So, and so what we're going to do is that because of the cycles, all the points,

54
00:03:36,840 --> 00:03:40,520
all the program points have to have values at all times.

55
00:03:40,520 --> 00:03:44,360
And so we're going to assign an initial value and that is what bottom is for.

56
00:03:44,360 --> 00:03:48,879
And the initial value bottom means so far as we know, control never reaches this point.

57
00:03:48,879 --> 00:03:52,840
Remember, we said this quite a while ago several videos ago.

58
00:03:52,840 --> 00:03:55,640
And this will allow us to make progress.

59
00:03:57,080 --> 00:04:04,480
And to see that, let's go ahead and analyze this control flow graph now,

60
00:04:04,480 --> 00:04:08,520
where we assume that all points, at all points initially,

61
00:04:08,520 --> 00:04:10,840
x has a value bottom except at the entry point.

62
00:04:10,840 --> 00:04:12,159
So the entry point is special.

63
00:04:12,159 --> 00:04:17,960
Here we assume that we don't know anything about x because we know the control reaches the initial point.

64
00:04:17,960 --> 00:04:23,040
But initially, we're going to just say, well, x is bottom everywhere else.

65
00:04:23,040 --> 00:04:27,079
Okay, so let's put the bottom there.

66
00:04:27,079 --> 00:04:28,960
Let's put the bottom there.

67
00:04:28,960 --> 00:04:31,680
I'm just going to fill in all the values.

68
00:04:31,680 --> 00:04:38,519
And I'm just writing it everywhere here.

69
00:04:38,519 --> 00:04:45,120
And there's really another one right here after the merge of these two paths.

70
00:04:45,120 --> 00:04:46,280
So I'll indicate that.

71
00:04:46,280 --> 00:04:47,519
All right, so there.

72
00:04:47,519 --> 00:04:50,000
Now we have our initial setup.

73
00:04:50,000 --> 00:04:52,040
And now remember what the procedure is.

74
00:04:52,040 --> 00:04:55,519
We go and look where the information is inconsistent and we update it.

75
00:04:55,519 --> 00:04:57,680
So where's the place where the information is inconsistent?

76
00:04:57,680 --> 00:05:00,319
Well, clearly it's not correct here.

77
00:05:00,319 --> 00:05:04,800
All right, because we know that after if control reaches the point before x equals three,

78
00:05:04,800 --> 00:05:08,759
then after the assignment, x will be equal to three.

79
00:05:08,759 --> 00:05:12,600
Again, the predicate will not change the value of x.

80
00:05:12,600 --> 00:05:17,240
So we have to update the results on the two branches after the predicate.

81
00:05:17,240 --> 00:05:21,120
And after it's assignment that doesn't affect x to make that information consistent, we have that.

82
00:05:21,120 --> 00:05:24,439
Now, let's come back to our interesting case here.

83
00:05:24,439 --> 00:05:29,319
We know that x is equal to three on this branch coming into y equals zero.

84
00:05:29,319 --> 00:05:34,599
And so far as we know, control never reaches the other predecessor.

85
00:05:34,599 --> 00:05:38,839
So we're going to start out by assuming that that part that path is never taken.

86
00:05:38,839 --> 00:05:41,519
And if that path is never taken, then it won't contribute anything.

87
00:05:41,519 --> 00:05:45,519
And so at this point in the program, we will know that x is equal to three.

88
00:05:45,519 --> 00:05:50,800
So assuming that all this information is correct, we will be able to conclude that x is equal to three at this point.

89
00:05:50,800 --> 00:05:54,000
And notice how we've been able to break the cycle here and get started.

90
00:05:54,000 --> 00:05:59,159
So we just assume that the this last edge in the cycle never executes.

91
00:05:59,160 --> 00:06:01,439
And if that's not correct, we'll find out later.

92
00:06:01,439 --> 00:06:04,360
And this value down here will become something other than bottom.

93
00:06:04,360 --> 00:06:06,640
And then we'll update the assignment again.

94
00:06:06,640 --> 00:06:09,480
All right, so let's continue on.

95
00:06:09,480 --> 00:06:14,400
So we have x is equal to three before y is assigned zero.

96
00:06:14,400 --> 00:06:17,040
So the assignment to y will not affect the value of x.

97
00:06:17,040 --> 00:06:19,400
So make the information afterwards consistent.

98
00:06:19,400 --> 00:06:21,640
We'll have to make x equal to three there.

99
00:06:21,640 --> 00:06:23,879
Now we have a merge of two paths.

100
00:06:23,879 --> 00:06:28,520
Okay, so at this point here before the execution of this assignment,

101
00:06:28,560 --> 00:06:30,959
we will also know that x is equal to three.

102
00:06:30,959 --> 00:06:32,839
The assignment to a will not affect x.

103
00:06:32,839 --> 00:06:35,000
We'll update that point there.

104
00:06:35,000 --> 00:06:37,240
And the predicate will not affect the value of x.

105
00:06:37,240 --> 00:06:40,319
So we'll know that x is equal to three on this back edge.

106
00:06:40,319 --> 00:06:42,359
And now this information has changed.

107
00:06:42,359 --> 00:06:47,079
We now know the control can reach this edge because we followed a control path all the way to here.

108
00:06:47,079 --> 00:06:49,560
We have some new information about x.

109
00:06:49,560 --> 00:06:52,799
And so now we have to double check that everything is still okay.

110
00:06:52,799 --> 00:06:56,599
So here we have x is equal to three on this edge, x is equal to three on this edge.

111
00:06:56,600 --> 00:07:02,560
And our previous conclusion was that x was equal to three on entry to the statement y equals zero.

112
00:07:02,560 --> 00:07:04,200
Well, that's all still consistent.

113
00:07:04,200 --> 00:07:07,879
There are no places left in the control flow graph that are inconsistent.

114
00:07:07,879 --> 00:07:10,920
So all the information is consistent with all the rules.

115
00:07:10,920 --> 00:07:11,600
And so we're done.

116
00:07:11,600 --> 00:07:13,000
And this is the final analysis.

117
00:07:13,000 --> 00:07:16,520
We're able to conclude that all of these points here,

118
00:07:16,520 --> 00:07:20,720
like say every point except the entry point that x is in fact the constant three.

