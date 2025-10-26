---
title: MIT6042J P612105SpanningTreesVideo
---

1
00:00:00,000 --> 00:00:06,540
One of the multiple definitions of trees that we saw is that it's a minimum edge

2
00:00:06,540 --> 00:00:09,919
a simple graph that connects up a bunch of vertices.

3
00:00:09,919 --> 00:00:17,440
And that leads to the idea of finding a spanning tree within a simple graph that maintains the same connections.

4
00:00:17,440 --> 00:00:19,960
So let's begin with a precise technical definition.

5
00:00:19,960 --> 00:00:25,560
A spanning subgraph of a graph G is simply a subgraph that has all the vertices of G.

6
00:00:25,559 --> 00:00:31,640
So again a subgraph of a graph means it's got a subset of the vertices and a subset of the edges.

7
00:00:31,640 --> 00:00:37,239
Spanning subgraph is that it has all of the vertices but a subset of the edges.

8
00:00:37,239 --> 00:00:43,079
And the definition of a spanning tree is a spanning subgraph that is a tree.

9
00:00:43,079 --> 00:00:51,239
Now, not all graphs are going to have a spanning tree because the tree has to be connected if the original graph is not connected.

10
00:00:51,240 --> 00:00:55,960
There's no way you can find a spanning tree using only the edges that are there already.

11
00:00:55,960 --> 00:01:00,480
But it's going to turn out that if the graph is connected it's guaranteed to have a spanning tree.

12
00:01:00,480 --> 00:01:01,800
Let's look at an example.

13
00:01:01,800 --> 00:01:14,799
Here's a simple graph and what I want then is a spanning tree, a selection of edges that connect up all the vertices such that we're only using edges in the original graph and they form a tree.

14
00:01:14,799 --> 00:01:16,320
There it is.

15
00:01:16,399 --> 00:01:21,039
So if you check on these magenta edges that I've highlighted they define a tree.

16
00:01:21,039 --> 00:01:25,039
I haven't used three of the edges in the original graph.

17
00:01:25,039 --> 00:01:28,000
Now this particular choice of spanning tree is kind of arbitrary in general.

18
00:01:28,000 --> 00:01:29,280
There's lots of spanning trees.

19
00:01:29,280 --> 00:01:31,719
Here's another one this time with green edges.

20
00:01:31,719 --> 00:01:34,399
Again, I'm using only edges from the original graph.

21
00:01:34,399 --> 00:01:39,560
I've left out three different ones and used a different set of edges to form the tree.

22
00:01:39,560 --> 00:01:40,759
But there it is.

23
00:01:40,760 --> 00:01:47,520
It's got no cycles and it spans the graph because every vertex in the graph is part of it.

24
00:01:47,520 --> 00:01:51,000
And of course it's connected since it's a tree.

25
00:01:51,000 --> 00:01:51,520
Okay.

26
00:01:51,520 --> 00:01:59,680
There's actually some lovely combinatorial theory which enables you to calculate the number of spanning trees in a simple graph without too much difficulty.

27
00:01:59,680 --> 00:02:04,439
Just given its adjacency matrix, but we're not going to go into that for now.

28
00:02:04,439 --> 00:02:06,200
Okay.

29
00:02:06,200 --> 00:02:13,000
First remark is that every connected graph is going to have a spanning tree and the reason is you just pick a minimal edge tree.

30
00:02:13,000 --> 00:02:17,479
So a minimal edge connected spanning subgraph rather.

31
00:02:17,479 --> 00:02:25,240
So G itself if it's connected is by definition a spanning graph of itself because it's got all its own vertices.

32
00:02:25,240 --> 00:02:32,319
That means by the well-ordering principle there's going to be a connected spanning subgraph with a minimum number of edges.

33
00:02:32,319 --> 00:02:40,079
And that one given that it has a minimum number of edges it's guaranteed to be a spanning tree.

34
00:02:40,079 --> 00:02:41,079
Okay.

35
00:02:41,079 --> 00:02:52,159
Now the problem gets more interesting when it has a little more structure of instead of just trying to find a spanning tree that has a minimum number of edges.

36
00:02:52,159 --> 00:02:57,879
It's quite typical in applications that the edges have weights and we want to find a minimum weight spanning tree.

37
00:02:57,879 --> 00:03:06,840
So here's an example where we have a simple graph with a bunch of edges and a bunch of vertices and the edges are all assigned in this case an integer weight.

38
00:03:06,840 --> 00:03:25,680
Now the motivation for this kind of graph is you could think of these weights on the graph as indicating the cost of transporting some quantity commodity from this vertex to that vertex directly by a road or the time it takes to transmit a signal over this channel.

39
00:03:25,680 --> 00:03:35,319
There are lots of ways that simple graphs are used to model issues of communication among various locations.

40
00:03:35,319 --> 00:03:41,719
And it's quite typical that the channels and connections between them have different costs.

41
00:03:41,719 --> 00:03:55,640
And it's a natural question to say, okay, what's the minimum cost overall tree structure that will enable me to have everything connected to everything else in the same way but that I can tolerate some of my edges going down.

42
00:03:55,639 --> 00:03:59,639
And I still would like to have the cheapest kind of tree that spans them all.

43
00:03:59,639 --> 00:04:07,639
All right, well, there's a fairly simple way to construct such a minimum weight spanning tree and that's what we're going to talk about now.

44
00:04:07,639 --> 00:04:13,639
How do you find it? Well, the idea is to build it using gray edges.

45
00:04:13,639 --> 00:04:22,639
So what that means is that starting off with the vertices, we're going to start building a tree.

46
00:04:22,639 --> 00:04:28,639
And at any point we will have a bunch of edges that are going to be part of our spanning tree.

47
00:04:28,639 --> 00:04:31,639
That means that the edges don't have any cycles among them.

48
00:04:31,639 --> 00:04:34,639
They're so called forest, but they're not yet connected.

49
00:04:34,639 --> 00:04:46,639
And at each stage in this procedure, we're going to look at the connected components of the graph that we have at this moment and color them black or white.

50
00:04:46,639 --> 00:04:49,639
And then look at the gray edges.

51
00:04:49,639 --> 00:04:57,639
So a gray edge is defined to be an edge where one endpoint is black and the other endpoint is white.

52
00:04:57,639 --> 00:05:09,639
And what I'm going to do at any stage in the procedure as I'm growing my spanning, minimum white spanning tree is, I'm going to look at all the gray edges and pick a minimum white gray edge.

53
00:05:09,639 --> 00:05:12,639
Well, let's do an example to get this clear.

54
00:05:12,639 --> 00:05:15,639
So to begin with, I don't have any edges.

55
00:05:15,639 --> 00:05:17,639
Well, I have the isolated vertices.

56
00:05:17,639 --> 00:05:23,639
So it means that I have six connected components, each of which is a single vertex with no edges.

57
00:05:23,639 --> 00:05:29,639
Okay. That says that I'm allowed to color them black and white in any way I choose.

58
00:05:29,639 --> 00:05:31,639
And I will do that.

59
00:05:31,639 --> 00:05:36,639
The only constraint on the coloring is there has to be at least one black component and one white component.

60
00:05:37,639 --> 00:05:42,639
So there's an arbitrary coloring. I've colored two of the vertices white and the other four black.

61
00:05:42,639 --> 00:05:46,639
Now in this particular coloring, I could have chosen anyone, but I chose this one.

62
00:05:46,639 --> 00:05:51,639
Where are the gray edges? Well, I've highlighted them by seconding them.

63
00:05:51,639 --> 00:05:54,639
So this is a gray edge because it's black and white.

64
00:05:54,639 --> 00:05:58,639
This is a gray edge because it's black and white, black and white, black and white.

65
00:05:58,639 --> 00:06:01,639
This is not a gray edge because it's white and white.

66
00:06:01,639 --> 00:06:03,639
This is not a gray edge because it's black and black.

67
00:06:03,639 --> 00:06:05,639
So that's a simple enough idea.

68
00:06:05,639 --> 00:06:09,639
And now what I'm supposed to do is, among my gray edges, pick the one with a minimum weight.

69
00:06:09,639 --> 00:06:15,639
Well, if you look at the weights of the gray edges, I got a four, a four, a nine, a seven, and a two.

70
00:06:15,639 --> 00:06:18,639
The two is the minimum weight gray edge.

71
00:06:18,639 --> 00:06:21,639
I'm going to choose that to start building my tray.

72
00:06:21,639 --> 00:06:22,639
Okay.

73
00:06:22,639 --> 00:06:32,639
So at this moment, once I've committed to that magenta edge, what I now have is a graph with five components, namely the component defined by this edge with two vertices.

74
00:06:32,639 --> 00:06:44,639
And the other four isolated vertices, which still don't have any edges connecting them in the structure of magenta edges that I'm building to be my minimum spanning tree.

75
00:06:44,639 --> 00:06:48,639
So according to the rules now with these five components, I can recolor them.

76
00:06:48,639 --> 00:06:54,639
And as long as I recolor them in a way that this component gets the same color, there's a recoloring.

77
00:06:54,639 --> 00:06:57,639
I've made both of those vertices in this component black.

78
00:06:57,639 --> 00:07:02,639
And the other four vertices, which are isolated components, I can color arbitrarily.

79
00:07:02,639 --> 00:07:04,639
So here's my new coloring.

80
00:07:04,639 --> 00:07:09,639
Now again, once I have this coloring, I can proceed to identify the gray edges.

81
00:07:09,639 --> 00:07:11,639
There they are.

82
00:07:11,639 --> 00:07:15,639
And this time there are only two gray edges, because I chose to have only one white vertex.

83
00:07:15,639 --> 00:07:17,639
There's a gray edge.

84
00:07:17,639 --> 00:07:18,639
And there's a gray edge.

85
00:07:18,639 --> 00:07:21,639
And of course, the minimum weight among the two gray edges is three.

86
00:07:21,639 --> 00:07:26,639
So that's going to be my next edge in my minimum weight spanning tree.

87
00:07:26,639 --> 00:07:28,639
That I'm growing. What's next?

88
00:07:28,639 --> 00:07:32,639
Well, now I have four components left.

89
00:07:32,639 --> 00:07:34,639
Here's one component defined by that edge.

90
00:07:34,639 --> 00:07:37,639
Here's another connected component defined by that edge.

91
00:07:37,639 --> 00:07:41,639
And these two vertices are isolated still, so that components all by themselves.

92
00:07:41,639 --> 00:07:48,639
And the rule is recolor in such a way that both of these vertices in that component have the same color.

93
00:07:48,639 --> 00:07:51,639
All the vertices in this component have the same color.

94
00:07:51,639 --> 00:07:53,639
I could switch them from black to white.

95
00:07:53,639 --> 00:07:54,639
In fact, I will.

96
00:07:54,639 --> 00:07:56,639
And those can be colored arbitrarily.

97
00:07:56,639 --> 00:07:57,639
Let's do that.

98
00:07:57,639 --> 00:07:59,639
There's a recoloring.

99
00:07:59,639 --> 00:08:01,639
Now this component is all white.

100
00:08:01,639 --> 00:08:03,639
That component is all white.

101
00:08:03,639 --> 00:08:07,639
These two separate components happen both to be black.

102
00:08:07,639 --> 00:08:11,639
And as long as I had, I could have colored one of them white and one of them black.

103
00:08:11,639 --> 00:08:16,639
I need to have one black given the other commitment to colors.

104
00:08:16,639 --> 00:08:17,639
Okay.

105
00:08:17,639 --> 00:08:20,639
So now again, we could find the minimum white edge.

106
00:08:20,639 --> 00:08:23,639
A gray edge, I guess it would be.

107
00:08:23,639 --> 00:08:27,639
There are two ties for minimum, both of those ones.

108
00:08:27,639 --> 00:08:29,639
And I proceed in this way.

109
00:08:29,639 --> 00:08:32,639
And I wind up with this minimum white spanning tree.

110
00:08:32,639 --> 00:08:33,639
That's the procedure.

111
00:08:33,639 --> 00:08:35,639
I haven't discussed why it works yet.

112
00:08:35,639 --> 00:08:37,639
And that is explained in the notes.

113
00:08:37,639 --> 00:08:44,639
But we're going to hold off on that and just examine applying this algorithm.

114
00:08:44,639 --> 00:08:49,639
So there are a bunch of ways now to grow a minimum white spanning tree.

115
00:08:49,639 --> 00:08:53,639
One way is to start at any vertex.

116
00:08:53,639 --> 00:08:57,639
And then start, keep building around that vertex.

117
00:08:57,639 --> 00:09:02,639
So you start with that vertex and color it black and everything else white.

118
00:09:02,639 --> 00:09:06,639
And that means that all the gray edges are going to be connected to that vertex.

119
00:09:06,639 --> 00:09:08,639
So pick a minimum white one.

120
00:09:08,639 --> 00:09:12,639
Now you have a component with two vertices.

121
00:09:12,639 --> 00:09:14,639
Color it black and everything else white.

122
00:09:14,639 --> 00:09:18,639
And in that way, you keep working on one component that you're going to grow

123
00:09:18,639 --> 00:09:21,639
by always coloring it one color and everything else, the other color.

124
00:09:21,639 --> 00:09:26,639
This is a method known as prim's algorithm for growing a minimum white spanning tree.

125
00:09:26,639 --> 00:09:33,639
Another one is to globally among all the different connected components,

126
00:09:33,639 --> 00:09:36,639
find a minimum white edge among them.

127
00:09:36,639 --> 00:09:43,639
So what that means is that you find the minimum white edge among all the connected components

128
00:09:43,639 --> 00:09:46,639
and then having identified where that minimum white edge is,

129
00:09:46,639 --> 00:09:49,639
you can color one of its components black and the other one white.

130
00:09:49,639 --> 00:09:53,639
And that will have it conform to our procedure for picking a minimum white edge

131
00:09:53,639 --> 00:09:55,639
between different colored components.

132
00:09:55,639 --> 00:09:57,639
That's cross-calls algorithm.

133
00:09:57,639 --> 00:10:01,639
And finally, you can grow the tree's in parallel.

134
00:10:01,639 --> 00:10:06,639
You can just start choosing the minimum white edge around each connected component

135
00:10:06,639 --> 00:10:10,639
because you can always take a connected component, color it one color,

136
00:10:10,639 --> 00:10:13,639
and color all the other edges, another color.

137
00:10:13,639 --> 00:10:18,639
And so all of the edges touching a given component will be gray in that color.

138
00:10:18,639 --> 00:10:21,639
And you can choose the minimum one and grow that component.

139
00:10:21,639 --> 00:10:25,639
And if they're not too close to each other so that your choice of edges doesn't conflict,

140
00:10:25,639 --> 00:10:27,639
you can grow these trees in parallel.

141
00:10:27,639 --> 00:10:30,639
So I call that jokingly Myers procedure.

142
00:10:30,639 --> 00:10:36,639
And that is the application of this coloring approach to finding minimum white spanning trees.

