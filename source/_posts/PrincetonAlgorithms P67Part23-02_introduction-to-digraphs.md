---
title: PrincetonAlgorithms P67Part23 02_introduction To Digraphs
---

1
00:00:00,000 --> 00:00:08,599
Today we're going to look at directed graphs, which is another graph processing model that's

2
00:00:08,599 --> 00:00:10,679
very useful in many applications.

3
00:00:10,679 --> 00:00:15,919
It's very similar to the undirected graph model that we looked at last time, but there

4
00:00:15,919 --> 00:00:19,000
are some really profound differences.

5
00:00:19,000 --> 00:00:24,160
After introducing the concept and looking at the API, we'll look at three important classic

6
00:00:24,160 --> 00:00:27,679
algorithms for processing directed graphs.

7
00:00:27,679 --> 00:00:33,359
The introduction has to do with just explaining the concept and seeing what it does to our graph

8
00:00:33,359 --> 00:00:39,920
processing problems like the ones that we talked about for undirected graphs last time.

9
00:00:39,920 --> 00:00:43,359
So the idea is that the edges now have direction.

10
00:00:43,359 --> 00:00:49,039
A directed graph or a die graph is a set of vertices that are connected pairwise by directed

11
00:00:49,039 --> 00:00:50,359
edges.

12
00:00:50,359 --> 00:00:57,320
So it's a list of pairs of vertices where the order of the pair matters.

13
00:00:57,320 --> 00:01:03,960
So an edge, we say an edge goes from one vertex to another one.

14
00:01:03,960 --> 00:01:07,560
Whereas undirected graphs, we just talked about connections.

15
00:01:07,560 --> 00:01:13,319
When we're processing such graphs or traveling around them, we have to follow edges in the

16
00:01:13,319 --> 00:01:14,760
given direction.

17
00:01:14,760 --> 00:01:20,519
So for example, if we talk about a path in a die graph, there's, looks like there's a

18
00:01:20,519 --> 00:01:24,240
connection between two and zero, but only goes from two to zero.

19
00:01:24,239 --> 00:01:29,039
If you want to go from zero to two, you have to follow the edges in direction going from

20
00:01:29,039 --> 00:01:32,519
zero to five to four and then to two.

21
00:01:32,519 --> 00:01:37,959
In a directed graph, in this die graph, you can't see two directly from zero.

22
00:01:37,959 --> 00:01:43,799
Similarly, a directed cycle follows the edges around the direction to get back to the original

23
00:01:43,799 --> 00:01:45,799
vertex.

24
00:01:45,799 --> 00:01:50,519
Also vertices have in degree and out degree in die graphs.

25
00:01:50,679 --> 00:01:55,079
The out degree obviously is the number of arrows leaving the vertex and the

26
00:01:55,079 --> 00:01:59,239
end degrees, the number of arrows coming into the vertex.

27
00:01:59,239 --> 00:02:01,920
Those are the basic definitions.

28
00:02:01,920 --> 00:02:04,799
Let's look at a couple of applications.

29
00:02:04,799 --> 00:02:10,079
One obvious one is road networks where we put a vertex, according to the

30
00:02:10,079 --> 00:02:14,199
intersection, in an edge for roads.

31
00:02:14,199 --> 00:02:20,319
And we look at a situation where the roads are one way or can be one way.

32
00:02:20,319 --> 00:02:25,919
So if you've driven in lower Manhattan, you're very familiar with this map, which has

33
00:02:25,919 --> 00:02:31,120
lots of one way streets, and it's not always clear how to get from one place to another.

34
00:02:31,120 --> 00:02:35,879
You can have some two way streets that have edges in both directions, but with die graphs,

35
00:02:35,879 --> 00:02:41,240
we allow the abstraction of one way streets.

36
00:02:41,240 --> 00:02:43,599
Here's another more abstract example.

37
00:02:43,599 --> 00:02:48,799
This is the political blogosphere with connections.

38
00:02:48,799 --> 00:02:54,439
If blogs have links to one another, as you can see, most of the links go from blue to blue

39
00:02:54,439 --> 00:02:56,479
or from red to red.

40
00:02:56,479 --> 00:03:00,919
Although there are some orange links that go from blue to red, and a few purple ones that

41
00:03:00,919 --> 00:03:02,879
go from red to blue.

42
00:03:02,879 --> 00:03:10,719
And this gives some insight to the communications in the political blogosphere, at least in 2004.

43
00:03:10,719 --> 00:03:11,560
Here's another one.

44
00:03:11,560 --> 00:03:19,240
This is the study of the crash in 2008, and it was a directed graph that showed the

45
00:03:19,240 --> 00:03:22,960
structure of banks lending to one another.

46
00:03:22,960 --> 00:03:28,360
An edge corresponds to an overnight loan and a vertex corresponds to the bank.

47
00:03:28,360 --> 00:03:34,120
And from studying this diagram, experts could see how the banks divided into groups and

48
00:03:34,120 --> 00:03:38,960
were therefore vulnerable in these groups.

49
00:03:38,960 --> 00:03:44,719
And we'll look at more detailed definitions of how these groups are defined a little

50
00:03:44,719 --> 00:03:45,719
later on.

51
00:03:45,719 --> 00:03:49,360
This is just an example of the use of a die graph.

52
00:03:49,360 --> 00:03:50,360
And it's a die graph.

53
00:03:50,360 --> 00:03:52,800
The bank, one bank, lends money to another.

54
00:03:52,800 --> 00:03:58,159
That's not the same as the banks being connected, as in an undirected graph.

55
00:03:58,159 --> 00:04:01,200
The direction really matters.

56
00:04:01,200 --> 00:04:08,200
This is another one from Logic, where the vertices correspond to Boolean variables, and

57
00:04:08,199 --> 00:04:12,119
the edges correspond to implication.

58
00:04:12,119 --> 00:04:20,319
And people use graphs like this to study in logical verification and also studying electric

59
00:04:20,319 --> 00:04:21,800
circuits.

60
00:04:21,800 --> 00:04:28,480
Electric circuits, some selves, can be die graphs, where circuit elements have input and output.

61
00:04:28,480 --> 00:04:33,519
And so the edge, of course, takes the output of one element to the input of another, trying

62
00:04:33,519 --> 00:04:40,159
to understand the behavior of such a circuit involves processing a die graph.

63
00:04:40,159 --> 00:04:47,919
Here's another abstraction, so-called word-net graph, where vertices correspond to what's

64
00:04:47,919 --> 00:04:55,519
called syn-sets and edges correspond to hyper-nim relationships, where word is an instance of

65
00:04:55,519 --> 00:04:56,519
another one.

66
00:04:56,519 --> 00:05:02,319
So there's a lot of different events like a miracle or human activity and so forth.

67
00:05:02,319 --> 00:05:09,560
And graphs of this type are very useful in studying applications involving meanings

68
00:05:09,560 --> 00:05:12,319
in human languages.

69
00:05:12,319 --> 00:05:14,639
Here's a famous one.

70
00:05:14,639 --> 00:05:20,480
General Macrystal said that once we understand this graph, the war in Afghanistan will be

71
00:05:20,480 --> 00:05:23,159
over.

72
00:05:23,159 --> 00:05:30,639
So with all these types of applications, and there's many, many others just as with graph processing,

73
00:05:30,639 --> 00:05:36,279
the die graph as a model distinct from graph processing is important.

74
00:05:36,279 --> 00:05:43,719
There's many direct applications where we have connections between objects, but the direction

75
00:05:43,719 --> 00:05:46,159
of the connection matters.

76
00:05:46,159 --> 00:05:49,360
So what about die graph processing algorithms?

77
00:05:49,360 --> 00:05:53,759
Well, we're going to look at many problems that are very similar to the ones that we looked

78
00:05:53,759 --> 00:06:00,560
at for undirected graphs, but you can see that there are going to be a bit more complicated.

79
00:06:00,560 --> 00:06:06,240
Even a human has trouble looking at a die graph trying to figure out a simple problem like,

80
00:06:06,240 --> 00:06:10,399
is there a path from estity in this die graph?

81
00:06:10,399 --> 00:06:15,319
Seems like there's quite a few possibilities to consider, to convince yourself whether or

82
00:06:15,319 --> 00:06:17,560
not there's a path.

83
00:06:17,560 --> 00:06:22,560
And for the huge die graphs examples that I looked at before, obviously we're going to

84
00:06:22,560 --> 00:06:27,120
need a computer program and we're going to have a bit of a challenge figuring out what's

85
00:06:27,120 --> 00:06:28,120
going on.

86
00:06:28,360 --> 00:06:33,439
Of course, you might want to know the shortest directed path from estity.

87
00:06:33,439 --> 00:06:38,439
For example, if you're driving around lower Manhattan, I certainly want to have a solution

88
00:06:38,439 --> 00:06:40,879
to that problem.

89
00:06:40,879 --> 00:06:46,800
Then there's another problem called the topological sort problem, which is a general model that's

90
00:06:46,800 --> 00:06:53,600
useful in all kinds of applications where we're scheduling events that involve precedence

91
00:06:53,600 --> 00:06:55,160
constraints.

92
00:06:55,160 --> 00:07:00,800
In the graph abstraction, or the die graph abstraction, it amounts to the problem of trying to draw

93
00:07:00,800 --> 00:07:07,040
the die graph so that all the edges point up, that's called topological sorting.

94
00:07:07,040 --> 00:07:13,480
And then connectivity is more complicated for die graphs than for undirected graphs.

95
00:07:13,480 --> 00:07:18,879
There's the concept of strong connectivity, which means for any given pair of vertices

96
00:07:18,879 --> 00:07:24,279
you and V, you want to know, is there going to be a directed path from U to V and another

97
00:07:24,279 --> 00:07:27,000
directed path from V to U?

98
00:07:27,000 --> 00:07:33,600
That's a much more complicated problem than connectivity in undirected graphs.

99
00:07:33,600 --> 00:07:41,319
And a generalization of that or a query related to strong connectivity is so-called transitive

100
00:07:41,319 --> 00:07:43,040
closure.

101
00:07:43,040 --> 00:07:48,560
And for that, you just want to be able to answer the query given vertices V and W, is there

102
00:07:48,560 --> 00:07:53,760
a path from W to V, that's transitive closure?

103
00:07:53,760 --> 00:08:00,879
And actually, you're familiar with the web as a gigantic directed graph.

104
00:08:00,879 --> 00:08:05,200
If there's a link from page A to page B, that's a directed edge.

105
00:08:05,199 --> 00:08:13,680
The die graph processing is used in a famous page rank algorithm to determine the importance

106
00:08:13,680 --> 00:08:15,839
of a web page.

107
00:08:15,839 --> 00:08:21,279
Those are just a couple of examples of die graph processing problems that introduce the

108
00:08:21,279 --> 00:08:21,800
idea.

