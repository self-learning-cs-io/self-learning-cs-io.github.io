---
title: PrincetonAlgorithms P51Part111 06_rectangle Intersection
---

1
00:00:00,000 --> 00:00:05,679
To finish up, we're going to look at the rectangle intersection problem.

2
00:00:05,679 --> 00:00:10,359
It's got important practical applications and uses the techniques that we've been studying

3
00:00:10,359 --> 00:00:12,560
so far.

4
00:00:12,560 --> 00:00:16,839
And it's a simple generalization of our line intersection problem.

5
00:00:16,839 --> 00:00:19,080
So now we have a bunch of rectangles.

6
00:00:19,080 --> 00:00:22,679
They're all oriented horizontal or vertical.

7
00:00:22,679 --> 00:00:29,440
And what we need to do is find all the intersections in that set of rectangles.

8
00:00:29,440 --> 00:00:35,560
And again, N could be huge in applications, as we'll talk about in a second.

9
00:00:35,560 --> 00:00:45,600
And the naive root force algorithm involves checking each pair of rectangles for intersection.

10
00:00:45,600 --> 00:00:49,719
And what we want is more efficient algorithm than that as usual.

11
00:00:49,719 --> 00:00:54,560
And again, to keep the code simple, we're going to assume that all the coordinates are distinct.

12
00:00:54,560 --> 00:01:00,800
We don't have any equal lines we have to worry about, whether we consider rectangles

13
00:01:00,800 --> 00:01:03,800
that touch to be intersecting and so forth.

14
00:01:03,800 --> 00:01:08,640
So that's the problem, rectangle intersection search.

15
00:01:08,640 --> 00:01:14,359
And this is historically an extremely important problem.

16
00:01:14,359 --> 00:01:22,320
In the 1970s, when we switched to very large-scale integration for computers, we were switching

17
00:01:22,319 --> 00:01:28,639
from a situation where we were wiring physical devices together to a situation where we're

18
00:01:28,639 --> 00:01:32,000
essentially drawing the computer.

19
00:01:32,000 --> 00:01:40,039
And there were machines that would take drawings and return from those drawings like this,

20
00:01:40,039 --> 00:01:45,679
make physical things that implemented computers with different layers and different physical

21
00:01:45,679 --> 00:01:48,799
materials interacting in different ways.

22
00:01:48,799 --> 00:01:55,200
Some things are wires, some things are switches that are used to implement memory bits and

23
00:01:55,200 --> 00:01:56,679
computer logic.

24
00:01:56,679 --> 00:02:03,280
But the key point about it is that designing a computer became a geometric problem.

25
00:02:03,280 --> 00:02:12,000
And so people to design new computers would make huge drawings that just showed the lines

26
00:02:12,000 --> 00:02:16,840
that corresponded to the materials that had to be created to make the computer.

27
00:02:16,840 --> 00:02:17,840
Now it's very expensive.

28
00:02:17,840 --> 00:02:21,360
You don't want to have any bugs when you're making a chip.

29
00:02:21,360 --> 00:02:26,960
And there were various rules about what you can do on these drawings.

30
00:02:26,960 --> 00:02:34,800
And basically, these rules had to do with doing this orthogonal rectangle intersection search.

31
00:02:34,800 --> 00:02:38,520
You can't have lines that come too close to other lines.

32
00:02:38,520 --> 00:02:41,960
Certain types of lines can't intersect.

33
00:02:41,960 --> 00:02:45,199
Needs spacing between certain types of wires.

34
00:02:45,199 --> 00:02:50,239
And you wanted to, before you tried to make the physical circuit, to do this checking,

35
00:02:50,239 --> 00:02:54,239
which involved this orthogonal rectangle intersection search.

36
00:02:54,239 --> 00:03:00,639
And it was actually the case that the progress of faster and faster processors with more and

37
00:03:00,639 --> 00:03:07,679
more components was slowed because people were using the naive quadratic algorithm to do

38
00:03:07,679 --> 00:03:10,560
this design rule checking.

39
00:03:10,560 --> 00:03:14,079
And it's an example of Moore's law.

40
00:03:14,080 --> 00:03:24,320
So as we built a faster computer, say in 1970X, we needed to check in rectangles.

41
00:03:24,320 --> 00:03:31,480
But now maybe a year and a half later, you have a computer that's two times faster, but

42
00:03:31,480 --> 00:03:36,680
you also want to build bigger computers so you have twice as many rectangles to check.

43
00:03:36,680 --> 00:03:41,040
So you have two in rectangles to check now and your computer's twice as fast.

44
00:03:41,039 --> 00:03:47,680
So we get to use the faster and bigger computer to build faster and bigger circuits.

45
00:03:47,680 --> 00:03:51,639
But that doesn't help if you're using a quadratic algorithm.

46
00:03:51,639 --> 00:03:58,159
If you're using a quadratic algorithm and it takes you M days to check your design rules

47
00:03:58,159 --> 00:04:04,879
and people were running these things on the order of days, then for the next computer,

48
00:04:04,879 --> 00:04:06,039
it would take two M days.

49
00:04:06,039 --> 00:04:08,439
It would take twice as long.

50
00:04:08,439 --> 00:04:14,719
And so people that were using quadratic algorithms were definitely held back.

51
00:04:14,719 --> 00:04:21,480
And it was Ed McRite at Xerox Park who discovered interval search trees and the logarithmic

52
00:04:21,480 --> 00:04:29,600
algorithm that allowed us to sustain Moore's law and keep building bigger and bigger computers

53
00:04:29,600 --> 00:04:35,639
by changing this quadratic algorithm to a linear of the Macalgorithm and let's see how it

54
00:04:35,639 --> 00:04:37,120
works.

55
00:04:37,120 --> 00:04:43,920
Really, it's a modification of the sweetline algorithm that we looked at for intersecting

56
00:04:43,920 --> 00:04:45,399
lines.

57
00:04:45,399 --> 00:04:52,079
But now we're going to use that for intersecting rectangles rather than using range search

58
00:04:52,079 --> 00:04:54,439
as our basic operation.

59
00:04:54,439 --> 00:04:56,720
We're going to use interval search.

60
00:04:56,720 --> 00:05:02,360
So now every time the line sweep hits a rectangle, that corresponds to an interval.

61
00:05:02,360 --> 00:05:07,520
If it's the left part of a rectangle, then we put that interval into our interval search

62
00:05:07,520 --> 00:05:08,920
tree.

63
00:05:08,920 --> 00:05:15,800
So in this case, we put on zero and then we put on one and then we put on two.

64
00:05:15,800 --> 00:05:21,439
And that'll give us now three rectangles on our sweep line.

65
00:05:21,439 --> 00:05:30,439
And so now the question is when we hit a new rectangle, we want to do an interval search

66
00:05:30,439 --> 00:05:31,439
tree algorithm.

67
00:05:31,439 --> 00:05:37,439
If we're at the left to check which ones intersect and the interval search tree algorithm is

68
00:05:37,439 --> 00:05:41,279
going to tell us which intersections there are right away.

69
00:05:41,279 --> 00:05:45,360
When we reach the right, then we remove integrals and so forth.

70
00:05:45,360 --> 00:05:51,360
But with the basic interval search tree algorithm and the sweep line process that we've talked

71
00:05:51,360 --> 00:05:59,159
about, you can get the orthogonal rectangle intersection search problem solved in time

72
00:05:59,160 --> 00:06:04,520
proportional to n log n plus r log n, where r is the number of intersections.

73
00:06:04,520 --> 00:06:09,480
And typically in design rule checking, you wouldn't expect too many intersections.

74
00:06:09,480 --> 00:06:16,760
So again, just as with line intersection search, using a priority queue or a sort is only

75
00:06:16,760 --> 00:06:20,920
n log n for processing the x coordinates.

76
00:06:20,920 --> 00:06:26,120
And because interval search trees take log n for every operation, the insert and delete

77
00:06:26,120 --> 00:06:29,120
intervals is n log n total.

78
00:06:29,120 --> 00:06:32,519
And the searches is n log n plus r log n.

79
00:06:32,519 --> 00:06:38,680
So the bottom line is that the sweep line algorithm takes this rectangle intersection problem

80
00:06:38,680 --> 00:06:41,680
and reduces it to 1D interval search.

81
00:06:41,680 --> 00:06:44,480
And we have an efficient algorithm for that problem.

82
00:06:44,480 --> 00:06:49,160
And that enables us to solve the problem in linear rhythmic time instead of a quadratic

83
00:06:49,160 --> 00:06:50,160
time.

84
00:06:50,160 --> 00:06:53,120
And that definitely enabled new progress in technology.

85
00:06:53,519 --> 00:06:58,040
And it's a fine example of the importance of algorithmic technology.

86
00:06:58,040 --> 00:07:03,360
So here's our summary of applications of binary search trees for geometric problems.

87
00:07:03,360 --> 00:07:08,079
We started with one dimensional range search and just used a regular binary search tree

88
00:07:08,079 --> 00:07:11,879
to compute ranks to get the answer.

89
00:07:11,879 --> 00:07:17,199
But that as the basis, we were able to solve the two dimensional line segment intersection

90
00:07:17,199 --> 00:07:20,480
search using the sweep line algorithm.

91
00:07:20,480 --> 00:07:27,200
And then we looked at range search and other operations using KD trees.

92
00:07:27,200 --> 00:07:31,080
Again, a modification of binary search trees.

93
00:07:31,080 --> 00:07:34,960
And then the interval search tree to solve the one dimensional interval search problem

94
00:07:34,960 --> 00:07:41,800
and then how that corresponds to the basic algorithm that you get to if you use the sweep

95
00:07:41,800 --> 00:07:46,280
line algorithm to solve rectangle intersection.

96
00:07:46,279 --> 00:07:51,759
Many of these problems are the basis for geometric processing and huge amounts of data that

97
00:07:51,759 --> 00:07:54,439
we see all over the web.

98
00:07:54,439 --> 00:08:00,359
And our basic search tree mentality and APIs and binary search tree data structure give

99
00:08:00,359 --> 00:08:03,719
us efficient solutions to these important practical problems.

