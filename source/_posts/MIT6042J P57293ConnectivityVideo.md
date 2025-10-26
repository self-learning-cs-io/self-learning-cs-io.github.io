---
title: MIT6042J P57293ConnectivityVideo
---

1
00:00:00,000 --> 00:00:04,240
The point of switching from relational language to graph

2
00:00:04,240 --> 00:00:08,320
theorem, radical language is really so that we can talk about paths and connections.

3
00:00:08,320 --> 00:00:12,080
So let's look at the topic of graph connectivity in general.

4
00:00:12,080 --> 00:00:18,719
Two vertices in a simple graph or for that matter, a directed graph, are said to be connected

5
00:00:18,719 --> 00:00:20,839
if and only if there's a path between them.

6
00:00:20,839 --> 00:00:23,679
In a directed graph, the path would have a direction.

7
00:00:23,679 --> 00:00:28,760
In a simple graph, it, paths don't have directions, so A is connected to B if and only if B is

8
00:00:28,760 --> 00:00:32,200
connected to A. It's a symmetric relation.

9
00:00:32,200 --> 00:00:35,840
So two vertices are connected if and only if there's a path between them.

10
00:00:35,840 --> 00:00:39,359
That's equivalent, of course, to saying if and only if there's a walk between them.

11
00:00:39,359 --> 00:00:44,600
We include length zero paths and length zero walks, so every vertex is considered to be connected

12
00:00:44,600 --> 00:00:45,600
to itself.

13
00:00:45,600 --> 00:00:52,200
A whole graph is said to be connected if all of its vertex are connected to each other.

14
00:00:52,200 --> 00:01:00,120
Now, so every graph you can think of as broken up into the mutually connected pieces or subgraphs,

15
00:01:00,120 --> 00:01:02,520
which are called its connected components.

16
00:01:02,520 --> 00:01:05,079
So let's look at a simple example.

17
00:01:05,079 --> 00:01:09,400
Let's look at the connections between MIT buildings where we draw an edge between building

18
00:01:09,400 --> 00:01:13,640
10 and building 13 if there's a door between them or a corridor between them.

19
00:01:13,640 --> 00:01:18,040
So there's a corridor between building 10 and building 4 but not between building 10 and

20
00:01:18,040 --> 00:01:22,480
building 12 to get to 12 you have to go through 4.

21
00:01:22,480 --> 00:01:26,320
That's the main building numbers of the MIT Infinite corridor.

22
00:01:26,320 --> 00:01:31,080
East Campus, of course, isn't connected to anything, so it's a single isolated vertex.

23
00:01:31,080 --> 00:01:37,880
And then there's the medical center in E17 and E25, which are a sequence of four buildings

24
00:01:37,880 --> 00:01:42,719
that are connected as indicated, but not connected at all to East Campus or the Infinite

25
00:01:42,719 --> 00:01:43,719
corridor.

26
00:01:43,719 --> 00:01:47,679
That is you have to go outside to get from East Campus to the Infinite corridor or from

27
00:01:47,679 --> 00:01:52,439
the Infinite corridor to the medical center, unless you sneak through the basement, which

28
00:01:52,439 --> 00:01:54,760
and other restricted areas.

29
00:01:54,760 --> 00:01:56,760
So this is one graph.

30
00:01:56,760 --> 00:01:57,840
It's not three graphs.

31
00:01:57,840 --> 00:02:01,359
This is one graph which has three parts.

32
00:02:01,359 --> 00:02:04,879
And so it has three connected components.

33
00:02:04,879 --> 00:02:09,639
In general, the more connected components a graph has, the more broken up it is.

34
00:02:09,639 --> 00:02:11,240
That's a way to remember it.

35
00:02:11,240 --> 00:02:17,340
A formal definition of the connected component of a vertex V is simply all of the vertices

36
00:02:17,340 --> 00:02:20,159
W that are connected to V.

37
00:02:20,159 --> 00:02:25,560
And if you look at these connected components, they define an equivalence relation on the

38
00:02:25,560 --> 00:02:31,480
vertices, of course, because a connected component is a block of the equivalence relation.

39
00:02:31,480 --> 00:02:37,560
It's a block of the partition associated with the equivalence relation.

40
00:02:37,560 --> 00:02:43,879
Another way to define this set of W that are connected to V is simply it's taking the

41
00:02:43,879 --> 00:02:50,319
image of V under the greater than or equal to zero walk relation.

42
00:02:50,319 --> 00:02:56,879
He's star, we is our notation for the walk relation in the graph whose edges are E, including

43
00:02:56,879 --> 00:03:00,759
walks of length zero.

44
00:03:00,759 --> 00:03:06,199
So a graph is connected then means it really has only one connected component.

