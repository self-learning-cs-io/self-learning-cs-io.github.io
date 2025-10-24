---
title: PrincetonAlgorithms P113Part212 04_designing Algorithms
---

1
00:00:00,000 --> 00:00:09,000
Now we'll look at a couple of more interesting examples that show how useful reductions are

2
00:00:09,000 --> 00:00:12,200
for designing new algorithms.

3
00:00:12,200 --> 00:00:20,480
So again, that's the basic definition and the implication of the definition is that in

4
00:00:20,480 --> 00:00:28,199
order to design an algorithm for a problem x, we can go ahead and use some existing algorithm

5
00:00:28,199 --> 00:00:29,480
for y.

6
00:00:29,480 --> 00:00:35,399
And here's some of the many examples that we've already seen in this course.

7
00:00:35,399 --> 00:00:41,960
Finding the median and the element distinctness, I just talked about the scheduling problem

8
00:00:41,960 --> 00:00:44,200
reduces the topological sort.

9
00:00:44,200 --> 00:00:46,439
We saw that in the shortest path lecture.

10
00:00:46,439 --> 00:00:55,000
Also the arbitrage problem involves building a digraph for currency exchange.

11
00:00:55,000 --> 00:01:00,000
We reduced that to shortest path on several other examples.

12
00:01:00,000 --> 00:01:04,000
So it's an important and useful technique.

13
00:01:04,000 --> 00:01:09,640
So just the general mentality is if I know how to solve y and I have a new problem, can

14
00:01:09,640 --> 00:01:11,920
I use that to solve x?

15
00:01:11,920 --> 00:01:18,159
In every programmer does that saying, well, I've got some code that solves y or I've got a

16
00:01:18,159 --> 00:01:21,480
library function that does y, can I use that to solve x?

17
00:01:21,480 --> 00:01:23,079
That's reduction.

18
00:01:23,079 --> 00:01:28,560
So our first example is the convex hull problem that we looked at briefly back in the sorting

19
00:01:28,560 --> 00:01:29,560
lecture.

20
00:01:29,560 --> 00:01:33,079
And that's where you're given end points in the plane.

21
00:01:33,079 --> 00:01:37,920
And what you want to do is identify the points on the periphery.

22
00:01:37,920 --> 00:01:41,359
That's called the extreme points of the convex hull.

23
00:01:41,359 --> 00:01:50,719
You can imagine a bunch of points on a big range and a rancher wants to use the cheapest

24
00:01:50,719 --> 00:01:53,560
amount of fence to surround them all.

25
00:01:53,560 --> 00:01:58,840
So it's the minimum perimeter way to draw line that surrounds all the points at the convex

26
00:01:58,840 --> 00:01:59,840
hull.

27
00:01:59,840 --> 00:02:02,359
And there's many other ways to define it.

28
00:02:02,359 --> 00:02:08,060
That doesn't seem to be all that closely related to sorting, but it's actually true that

29
00:02:08,060 --> 00:02:11,479
convex hull reduces the sorting.

30
00:02:11,479 --> 00:02:15,759
That is if you can sort, you can compute the convex hull and that's an algorithm known

31
00:02:15,759 --> 00:02:20,240
as the gram scan algorithm that we'll look at in the next slide.

32
00:02:20,240 --> 00:02:27,240
The cost of a convex hull is the cost of the sort and log n plus the cost of the reduction

33
00:02:27,240 --> 00:02:31,879
and that gram scan algorithm just uses linear time.

34
00:02:31,879 --> 00:02:37,560
So with sorting, we get an in log n algorithm for convex hull, which is a nice algorithm

35
00:02:37,560 --> 00:02:40,200
design technique.

36
00:02:40,200 --> 00:02:47,200
And this is a diagram that shows the gram scan algorithm.

37
00:02:47,199 --> 00:02:52,079
Which won't go through in detail, but it's pretty intuitive.

38
00:02:52,079 --> 00:03:00,839
What we do is we pick a point one over in the corner, maybe the smallest y coordinate point.

39
00:03:00,839 --> 00:03:06,759
And then sort the points by polar angle swept out by that coordinate.

40
00:03:06,759 --> 00:03:12,759
So think of a line sweeping through and just picking out the points by polar angle centered

41
00:03:12,759 --> 00:03:14,159
at that point.

42
00:03:14,159 --> 00:03:18,359
Then we get the points in order along this polygon.

43
00:03:18,359 --> 00:03:22,560
And because we're doing it by polar angle, the lines don't intersect.

44
00:03:22,560 --> 00:03:27,240
It's a simple polygon, which I would know intersecting lines.

45
00:03:27,240 --> 00:03:34,719
And then the gram scan algorithm is just to proceed along, over here, is to proceed along

46
00:03:34,719 --> 00:03:36,879
that polygon.

47
00:03:36,879 --> 00:03:44,039
But if you ever come to a point where you're going to make a right turn or clockwise turn,

48
00:03:44,039 --> 00:03:46,519
throw out the points that would have caused that.

49
00:03:46,519 --> 00:03:50,280
So in this case, this point would cause us to make a right turn.

50
00:03:50,280 --> 00:03:51,280
So we throw it out.

51
00:03:51,280 --> 00:03:53,680
And now our most recent points are D3.

52
00:03:53,680 --> 00:03:55,079
And again, that's the right point.

53
00:03:55,079 --> 00:04:00,959
So we throw that one out and puts us in this position here.

54
00:04:00,959 --> 00:04:05,639
So in the idea is that any point that would cause a right hand turn is not going to be in

55
00:04:05,639 --> 00:04:06,639
the convex hull.

56
00:04:06,639 --> 00:04:14,000
It's kind of a proof that the points inside just by the end of the line.

57
00:04:14,000 --> 00:04:16,839
So the fact that it would make us do a right turn.

58
00:04:16,839 --> 00:04:19,120
So we throw this one out and that leaves that.

59
00:04:19,120 --> 00:04:20,920
And we go here.

60
00:04:20,920 --> 00:04:23,079
And that would be a right turn on our path.

61
00:04:23,079 --> 00:04:24,560
So throw that one out.

62
00:04:24,560 --> 00:04:26,639
And we're here another one.

63
00:04:26,639 --> 00:04:31,240
And continuing in this way, when we finally get back to the beginning, how we've computed

64
00:04:31,240 --> 00:04:34,160
the points on the convex hull.

65
00:04:34,160 --> 00:04:38,120
So the cost of the algorithm is the cost of the sort, which is then log in it.

66
00:04:38,120 --> 00:04:40,680
But the cost of this scan is only linear.

67
00:04:40,680 --> 00:04:43,639
Every point only gets considered once.

68
00:04:43,639 --> 00:04:47,479
That's an excellent example of a reduction to get a new algorithm.

69
00:04:47,479 --> 00:04:52,919
If you didn't have the fast sort, this wouldn't be so effective.

70
00:04:52,919 --> 00:04:57,839
Here's another example of a reduction.

71
00:04:57,839 --> 00:05:03,000
We implemented and looked at shortest path for die graphs.

72
00:05:03,000 --> 00:05:05,560
What about shortest path on undirected graphs?

73
00:05:05,560 --> 00:05:06,959
It still makes sense.

74
00:05:06,959 --> 00:05:12,560
So I have a weighted undirected graph with non-negative weights.

75
00:05:12,560 --> 00:05:20,120
And I want to find the shortest path from a given source vertex, S to a given target vertex

76
00:05:20,120 --> 00:05:25,679
T. And that's just the lowest weight path from S to T. So how we're going to solve that

77
00:05:25,679 --> 00:05:28,799
when we have shortest path that works for die graphs.

78
00:05:28,799 --> 00:05:35,120
Well, if we just replace each undirected edge by two directed edges, then the shortest path

79
00:05:35,120 --> 00:05:38,560
algorithm for die graphs works.

80
00:05:38,560 --> 00:05:44,920
In fact, with our graph representation, it's just running that algorithm because our undirected

81
00:05:44,920 --> 00:05:49,199
graphs are represented with edges going in both directions.

82
00:05:49,199 --> 00:05:53,480
So they're actually represented as die graphs.

83
00:05:53,480 --> 00:05:58,280
And again, what's the cost?

84
00:05:58,280 --> 00:06:04,439
This time is the cost of pre-processing to just take the graph in its undirected form

85
00:06:04,439 --> 00:06:06,399
and convert it to directed form.

86
00:06:06,399 --> 00:06:11,879
And then the cost of shortest path of die graph is e log v. So that gives us an algorithm

87
00:06:11,879 --> 00:06:16,000
for shortest paths in undirected graphs.

88
00:06:16,000 --> 00:06:23,159
Notice that it doesn't work if there's negative weights in the undirected graph because the

89
00:06:23,159 --> 00:06:26,879
reduction creates a negative cycle.

90
00:06:26,879 --> 00:06:32,279
It is possible to find shortest paths in these graphs, but you need a much more sophisticated

91
00:06:32,279 --> 00:06:36,239
algorithm to do it.

92
00:06:36,239 --> 00:06:43,839
So just continuing in this way, we've considered quite a few problems that involve reductions.

93
00:06:43,839 --> 00:06:50,479
So I just talked about finding median and element distinctness and convex hull reducing to sorting.

94
00:06:50,479 --> 00:06:55,479
And there were a bunch of other problems that we considered as exercises when we talked

95
00:06:55,479 --> 00:07:00,079
about applications to applications of sorting.

96
00:07:00,079 --> 00:07:03,639
So application of sorting really means problem reduces to sorting.

97
00:07:03,639 --> 00:07:10,439
So shortest processing time scheduling and lots of other problems that reduce to sorting.

98
00:07:10,439 --> 00:07:15,879
And in the graph world, we looked at some pretty complicated problems, arbitrage.

99
00:07:15,879 --> 00:07:19,719
We looked at a parallel scheduling or CPM method.

100
00:07:19,719 --> 00:07:22,399
And I just talked about shortest paths in undirected graphs.

101
00:07:22,399 --> 00:07:27,919
And those all reduce to shortest paths in die graphs.

102
00:07:27,920 --> 00:07:35,240
We looked at problems that reduce to max flow, bipartite matching reduces to max flow.

103
00:07:35,240 --> 00:07:39,360
And the linear programming problem that we'll talk about next time, actually both max flow

104
00:07:39,360 --> 00:07:45,439
and shortest paths in die graphs reduce to linear programming.

105
00:07:45,439 --> 00:07:53,480
So this is a pretty diverse set of problems that all through the set of reduction, we found

106
00:07:53,480 --> 00:07:59,879
ways to solve them using some core kinds of problem solving models.

107
00:07:59,879 --> 00:08:04,439
And so reduction is an extremely important algorithm design technique.

