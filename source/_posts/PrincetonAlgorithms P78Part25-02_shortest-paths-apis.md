---
title: PrincetonAlgorithms P78Part25 02_shortest Paths Apis
---

1
00:00:00,000 --> 00:00:05,000
Today we're going to talk about shortest path algorithm.

2
00:00:05,000 --> 00:00:10,000
This is another problem on graphs that's very easy to state.

3
00:00:10,000 --> 00:00:14,000
We use again a slightly different graph model.

4
00:00:14,000 --> 00:00:19,000
Last time we had educated graphs for computing minimum spanning trees.

5
00:00:19,000 --> 00:00:23,000
Now we're going to have educated directed graphs.

6
00:00:23,000 --> 00:00:26,000
So now the edges are directed but they're weighted.

7
00:00:26,000 --> 00:00:33,000
And the problem that we're going to be looking at is to find the shortest path from one vertex to another.

8
00:00:33,000 --> 00:00:40,000
So in this example we've got a directed graph with a variety of edges, the directed edges.

9
00:00:40,000 --> 00:00:49,000
And our goal is to find given two vertices, say 0 to 6, what's the shortest path that takes us from 0 to 6?

10
00:00:49,000 --> 00:00:51,000
Where the length of the path is the sum of its weights.

11
00:00:51,000 --> 00:00:58,000
And in this case the shortest is from 0 to 2 to 7, 7 to 3 and 3 to 6.

12
00:00:58,000 --> 00:01:03,000
Now the algorithms that we're going to look at for this are classic algorithms.

13
00:01:03,000 --> 00:01:15,000
And this is an example where years ago we would teach these algorithms and say, well they will be important someday when people have devices with maps on them and we'll want to get around.

14
00:01:15,000 --> 00:01:20,000
Nowadays of course everyone's familiar with these kinds of devices.

15
00:01:20,000 --> 00:01:30,000
When you have a map and you want to get from one place to another or you have a device in your car that gives you directions to get from one place to another.

16
00:01:30,000 --> 00:01:36,000
These devices are implementing the classic algorithms that we're going to talk about today.

17
00:01:36,000 --> 00:01:44,000
Not only that and even more important shortest paths is a really interesting and important problem solving model.

18
00:01:44,000 --> 00:01:51,000
There's all kinds of important practical problems that can be recast as shortest paths problems.

19
00:01:51,000 --> 00:02:03,000
And because we have efficient solutions to the shortest path, efficient algorithms for finding shortest paths, we have efficient solutions to all these kinds of problems.

20
00:02:03,000 --> 00:02:13,000
All around us, from texture mapping to network routing protocols to pipelining, to trucks, to traffic planning.

21
00:02:13,000 --> 00:02:23,000
We find shortest paths applications. And we'll look at a couple surprising examples later on today.

22
00:02:23,000 --> 00:02:33,000
So one thing to think about is let's specify really what the problem is all about and there's all different variants similar to many other problems we've studied.

23
00:02:33,000 --> 00:02:45,000
One thing is what vertices are we talking about? So of course the most familiar is so-called source sync. What's the shortest path from one vertex to another.

24
00:02:45,000 --> 00:02:54,000
But actually more useful often is so-called single source shortest paths, which is all the paths from one vertex to every other.

25
00:02:54,000 --> 00:03:00,000
And this is the one, for example, that the navigation system in your car might use.

26
00:03:00,000 --> 00:03:06,000
The source is where you are and it'll compute the shortest paths to every place else.

27
00:03:06,000 --> 00:03:15,000
And then when you ask for someplace, it'll just pick the one that you want. And a man are very similar to the API that we're going to talk about.

28
00:03:15,000 --> 00:03:32,000
Another thing that you might do if you didn't have that many vertices is compute all pairs shortest paths. So pre-compute the paths between all pairs of vertices and then immediately be able to direct answer a client query.

29
00:03:32,000 --> 00:03:37,000
This is the type of thing that was used on old maps, for example.

30
00:03:37,000 --> 00:03:50,000
Another thing is the edge weights. Usually we think of it in terms of positive edge weights because the maps are geometric. And so the length of an edge is proportional to its distance in the plane.

31
00:03:50,000 --> 00:04:05,000
But actually for many problems, there may be much more arbitrary. And actually one of the big issues that we'll see is whether the edge weights are positive or negative.

32
00:04:05,000 --> 00:04:11,000
And those types of restrictions are going to give rise to different types of algorithms.

33
00:04:11,000 --> 00:04:21,000
Another issue that arises, and it's particularly important in the presence of negative weights, as we'll see at the end, is whether or not the graph has directed cycles.

34
00:04:21,000 --> 00:04:28,000
And particularly whether the total length of a cycle is negative or not. And we'll get to that at the end.

35
00:04:28,000 --> 00:04:42,000
So, and also just to reduce some clutter in our code in the slides, we'll throughout the lecture make the simplifying assumption that there are paths from the source to every vertex.

36
00:04:42,000 --> 00:04:49,000
We won't worry about driving to islands and other such issues.

37
00:04:49,000 --> 00:04:59,000
To get started, we have to develop our APIs. And this will be straightforward after, because this is the fourth variation of a graph API that we've done.

38
00:04:59,000 --> 00:05:09,000
We started with a regular undirected graphs, then we did digraphs, then we did weighted graphs, and now we're doing weighted digraphs.

39
00:05:09,000 --> 00:05:29,000
So, to begin, we're going to need a API for processing edges. And this is actually simpler for digraphs than it was for undirected graphs, because we have this concept of one of the vertices is where the edge goes from and the other vertex is where it goes to.

40
00:05:29,000 --> 00:05:41,000
So, we have a constructor that builds an edge from the vertex that's given us first argument to the vertex that's given us second argument. And then there's a double list of the weight.

41
00:05:41,000 --> 00:05:48,000
And then the client can ask for the from vertex or the two vertex or the weight or this is string representation.

42
00:05:48,000 --> 00:06:01,000
And always in our code, we'll use the idiom at the bottom of the slide for processing an edge. We'll pick out v which is e dot from and w which is e dot two and then our code will process the nw.

43
00:06:01,000 --> 00:06:16,000
The implementation of a weighted directed edge is very similar to the one for undirected graphs, but simpler, because the constructor simply sets the instance variables from its argument.

44
00:06:16,000 --> 00:06:29,000
And from and two are simply get our method as is weight. So, that's implementation of directed edge for directed weighted graphs.

45
00:06:29,000 --> 00:06:49,000
So, now what about the graph itself? So, edge weighted digraph. So, as usual, we have a constructor that takes the number of vertices in the graph so it can build data structures that are vertex index arrays or we can read from an input stream.

46
00:06:49,000 --> 00:07:05,000
And then the key methods are ad edge which takes an directed edge and adds it to the graph. And then the interval for adjacency lists which returns an interval of all the edges that point from a given vertex.

47
00:07:06,000 --> 00:07:21,000
So, since we're processing edges, we can have self loops and parallel edges and most of our code will simply use a dj method to iterate through the edges adjacent to vertices.

48
00:07:22,000 --> 00:07:32,000
Representation is very similar to the other representations that we've seen except simpler because there's only one representation of each edge.

49
00:07:32,000 --> 00:07:49,000
So, there's a verb, the instance variable for the adjacency list is a vertex index array. Each entry is a bag of directed edges actually references to directed edges.

50
00:07:50,000 --> 00:08:00,000
So, all the code for building and processing this is very straightforward version of code that we've seen before.

51
00:08:00,000 --> 00:08:15,000
Here's the implementation for educated digraphs. It's the same as our educated graph except we just replace graph with die graph everywhere.

52
00:08:16,000 --> 00:08:27,000
And when we add an edge, we only add it to the from vertices adjacency list. So, vz.from edge v equals add the edge to that.

53
00:08:27,000 --> 00:08:43,000
And then to get all the vertices adjacent to a given vertex, we just use the vertex index array to get its adjacency list and return that bag which is iterable so that the client can iterate through all those vertices.

54
00:08:44,000 --> 00:08:50,000
Very straightforward version of what we did for educated graphs.

55
00:08:50,000 --> 00:08:59,000
Okay, so now our client for that program is our single source shortest paths API.

56
00:09:00,000 --> 00:09:10,000
And so, it works in a manner very similar to others that we've done. Now we'll call it sp. The constructor takes a graph and a source vertex.

57
00:09:10,000 --> 00:09:28,000
And it'll go ahead and build the data structure. It'll find the shortest paths from the s vertex to every other vertex in the graph and build the data structure so that it can efficiently answer client queries of first what's the length of the shortest path from s to a given vertex.

58
00:09:29,000 --> 00:09:38,000
And second, what's the path given an iterable that gives the path from the source vertex from the source vertex to the given vertex.

59
00:09:38,000 --> 00:09:51,000
So, this test client here will print out all the shortest paths from the given vertex s to every other vertex in the graph.

60
00:09:51,000 --> 00:10:06,000
Go through all the vertices for every vertex. You print s to v in the distance from s to v. And then for every edge in the path, you simply print out the edge.

61
00:10:06,000 --> 00:10:13,000
So, it'll print for every vertex the distance from s to that vertex followed by the path.

62
00:10:13,000 --> 00:10:27,000
So, for example, for the sample graph that we gave with vertex 0 as the source, it'll print out the path from 0 to every vertex in the graph.

63
00:10:27,000 --> 00:10:35,000
So, that's a test client that we'll use to make sure to check and learn the operation of our algorithms.

64
00:10:35,000 --> 00:10:44,000
And this API is going to be effective even for huge graphs. So, that's an introduction to our shortest path API.

