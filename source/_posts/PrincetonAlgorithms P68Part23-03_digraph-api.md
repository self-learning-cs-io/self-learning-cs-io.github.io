---
title: PrincetonAlgorithms P68Part23 03_digraph Api
---

1
00:00:00,000 --> 00:00:09,240
To develop die graph processing algorithms, we're going to need an API. We'll use the same

2
00:00:09,240 --> 00:00:15,839
design pattern that we use for undirected graphs where we develop an API for building graphs

3
00:00:15,839 --> 00:00:23,039
that can serve as a client for all our graph processing algorithms. And it's very similar.

4
00:00:23,039 --> 00:00:29,839
It's not close to identical to the undirected graph API except the class's name,

5
00:00:29,839 --> 00:00:37,240
die graph. And other than that, it's got add edge where we add a directed edge, but now

6
00:00:37,240 --> 00:00:44,239
we're saying it's an edge from V to W. And then an iterator that gives the vertices that

7
00:00:44,239 --> 00:00:48,719
point from the given vertex. So we're getting those of the edges that we can travel along

8
00:00:48,719 --> 00:00:55,920
to get around the graph. We have V and E. And another new method that is not relevant

9
00:00:55,920 --> 00:01:04,400
for undirected graphs is the reverse. So that's a method that returns a die graph where all

10
00:01:04,400 --> 00:01:09,680
the edges are reversed. And we'll see that's actually an important method to have for one

11
00:01:09,680 --> 00:01:15,640
of the algorithms that we'll talk about today. So here's a typical client, very similar

12
00:01:15,640 --> 00:01:21,319
to the one that we did for undirected graphs where we read a die graph from input stream.

13
00:01:21,319 --> 00:01:31,159
So that's pairs of vertices that represent an edge from one first vertex to the second

14
00:01:31,159 --> 00:01:38,560
one. And then for every vertex, we print out for every edge that you can get to from

15
00:01:38,560 --> 00:01:43,640
that vertex. For every other vertex you get to from that vertex, we put out a little

16
00:01:43,640 --> 00:01:50,760
graphical representation of the edge V to W where the little arrow we use with a minus sign

17
00:01:50,760 --> 00:01:59,000
and greater than. So for example, with the input file tiny dg.dex for directed graph,

18
00:01:59,960 --> 00:02:06,359
this one's got 13 vertices, 22 edges. It's got an edge from 4 to 2, from 2 to 3, 3 to 2,

19
00:02:06,920 --> 00:02:16,919
and so forth. And if we execute this sample client, we get the edges printed out. It builds the

20
00:02:16,919 --> 00:02:22,759
graph and then prints out the edges. And the way in order in which they come out is in order of

21
00:02:22,759 --> 00:02:29,079
vertex and the order in which each edge comes out depends on the representation just as four graphs.

22
00:02:29,080 --> 00:02:37,080
We'll skip through the possibilities of keeping a list of edges or using a matrix for

23
00:02:37,640 --> 00:02:43,720
die graphs because again, in practical problems, the graphs are huge and sparse. So the average

24
00:02:44,600 --> 00:02:53,400
vertex degree, indegree, and out degree is low. And we can't afford to keep space proportional to

25
00:02:53,480 --> 00:02:59,159
the number of possible vertices that a vertex could connect to for each vertex.

26
00:03:00,200 --> 00:03:06,200
So it's very similar to exactly the same, really, to the one that we use for

27
00:03:06,200 --> 00:03:15,240
indirect graphs. We keep a vertex index to ray, where for each vertex, we can keep a bag of all

28
00:03:15,240 --> 00:03:23,080
the vertices that you can get to from that vertex. So vertex 6 has out degree 4 and there's

29
00:03:23,080 --> 00:03:29,640
four vertices on its list, 9, 4, 8, and 0. And when we process the graph, we're going to visit those

30
00:03:29,640 --> 00:03:37,800
vertices in that order, which is just determined by the order in which they appeared in the input.

31
00:03:38,680 --> 00:03:48,360
So here's the implementation that we used for undirected graphs last time. And you'll see that

32
00:03:48,360 --> 00:03:54,600
the only difference for die graphs is we change graph to die graph and we only have one

33
00:03:54,600 --> 00:04:02,520
representation of each edge. V goes to w. For undirected graphs, we had w goes to v as well.

34
00:04:03,160 --> 00:04:07,640
Otherwise, the code's exactly the same. We have an iterator for the vertices adjacent to v,

35
00:04:08,680 --> 00:04:12,680
but that's the difference between directed graphs and undirected graphs.

36
00:04:12,840 --> 00:04:24,199
So again, the reason we do that is that we can get a basic graph processing process in a

37
00:04:24,199 --> 00:04:31,800
reasonable amount of time, where every time we deal with a vertex, we can get to its neighbors or

38
00:04:31,800 --> 00:04:37,639
the places you can get to from that vertex in time proportional to the number of vertices.

39
00:04:37,639 --> 00:04:44,519
You simply can't afford to do that with other representations. So that's the die graph API,

40
00:04:44,519 --> 00:04:47,639
which is virtually identical to the graph API.

