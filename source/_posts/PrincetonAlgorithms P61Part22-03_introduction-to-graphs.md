---
title: PrincetonAlgorithms P61Part22 03_introduction To Graphs
---

1
00:00:00,000 --> 00:00:09,300
Welcome back. Our topic today is algorithms for processing undirected graphs, which are

2
00:00:09,300 --> 00:00:15,820
a model that are widely used for many, many applications. We'll see plenty of examples.

3
00:00:15,820 --> 00:00:21,620
And then we'll look at three fundamental algorithms for processing undirected graphs and consider

4
00:00:21,620 --> 00:00:28,179
some of the challenges of developing algorithms for this kind of structure.

5
00:00:28,179 --> 00:00:36,619
So as introduction, we'll take a look at the basic ideas behind undirected graphs and applications.

6
00:00:36,619 --> 00:00:42,280
What is an undirected graph? The definition is very simple. It's a set of vertices connected

7
00:00:42,280 --> 00:00:49,739
pairwise by edges. So this is an example of an undirected graph that describes the peris

8
00:00:49,739 --> 00:00:56,340
metro. You've got stations, and if there's a rail line between the stations, there's an edge.

9
00:00:56,340 --> 00:01:02,140
So why do we study graphs and graph algorithms? Well, there are literally thousands of practical

10
00:01:02,140 --> 00:01:07,020
applications where graphs are an appropriate model. And we'll take a look at a few others

11
00:01:07,020 --> 00:01:12,460
in just a minute. Because there are so many applications, there's literally hundreds of

12
00:01:12,460 --> 00:01:19,379
graphs, algorithms, and known. And these are sometimes quite sophisticated, as we'll see.

13
00:01:19,379 --> 00:01:26,020
And also very important in understanding what's going on in an application.

14
00:01:26,019 --> 00:01:33,340
And without the applications, graph is really interesting and broadly useful abstraction to

15
00:01:33,340 --> 00:01:39,619
try to understand. It's so simple to describe, but leads to quite complex and difficult

16
00:01:39,619 --> 00:01:45,340
to understand structures. And in general, graph theory and graph algorithms is a very challenging

17
00:01:45,340 --> 00:01:51,819
branch of computer science and discrete math that we're just introducing now.

18
00:01:51,819 --> 00:02:01,939
So here's an example of a graph in genetics or genomics where it's a network where the

19
00:02:01,939 --> 00:02:08,859
nodes are proteins and the edges are interactions among the proteins. And genomesists are trying

20
00:02:08,859 --> 00:02:17,180
to understand how these biological processes work need to understand the nature of connections

21
00:02:17,180 --> 00:02:24,580
like this. Here's another example, the internet itself, where every node is a computer and

22
00:02:24,580 --> 00:02:34,620
every edge is a node, a computer or a communications device, and every edge is a connection. And of

23
00:02:34,620 --> 00:02:39,420
course, the internet is grown by leaps and bounds, so this is a huge graph. And there's a

24
00:02:39,419 --> 00:02:49,299
lot of need and a lot of interest to understanding properties of this graph. This is a social graph

25
00:02:49,299 --> 00:03:01,219
having to do with the way science is carried out. So it's the nodes are scientists websites

26
00:03:01,219 --> 00:03:07,099
and the edges are clicks connecting one to another. And this one shows how scientists and different

27
00:03:07,099 --> 00:03:13,340
fields are interacting. And again, interesting and important to understand properties of this graph.

28
00:03:13,340 --> 00:03:24,219
You're certainly familiar with Facebook. That's one of the biggest graphs. It's absolutely huge. And

29
00:03:24,219 --> 00:03:30,939
it's always changing and it's very dynamic and people want to understand its property. This is

30
00:03:30,939 --> 00:03:40,300
an example of a graph that was used in litigation where people were trying to understand exactly precisely

31
00:03:40,300 --> 00:03:48,860
the communications patterns in a particular corporate culture that was of great interest to many people.

32
00:03:48,860 --> 00:03:58,620
Another similar example, this is people lobbying the FCC and how are they connected. So from the

33
00:03:58,620 --> 00:04:05,819
breadth and variety of these examples, you can see that number one graphs a very general model in

34
00:04:05,819 --> 00:04:13,099
number two graphs can be huge. This is another one showing the Framingham Heart Study and Connections

35
00:04:14,140 --> 00:04:24,699
among people in the study and how it relates to obesity. So those examples in this list shows that

36
00:04:24,699 --> 00:04:33,180
it's a graph that's very flexible and very dynamic model and that the graphs involved can be huge.

37
00:04:33,180 --> 00:04:37,980
They can have complex properties. And so our challenge is to try to figure out

38
00:04:39,180 --> 00:04:45,819
efficient algorithms that can give us some insight into the structure of graphs like this.

39
00:04:45,819 --> 00:04:49,259
That's what we're going to be talking about for the rest of this lecture.

40
00:04:49,980 --> 00:04:59,420
So now back to a starting point which is we need some simple and clear and specific definitions

41
00:05:00,779 --> 00:05:07,180
about basic terms that we're talking about and then we'll look at algorithms that work for

42
00:05:07,180 --> 00:05:13,259
small examples but also the same algorithms do what we need for big graphs of the type that we

43
00:05:13,259 --> 00:05:23,339
just considered. So this is the terminology that we use for graph processing. So we have a vertex

44
00:05:23,339 --> 00:05:27,899
which is a black dot in this graph and an edge which is a black line connecting two vertices

45
00:05:29,019 --> 00:05:37,019
and then a few more concepts that are important in many applications. So one is the idea of a path.

46
00:05:37,099 --> 00:05:43,419
That's just a sequence of vertices connected by edges. And the idea of a cycle which is a path

47
00:05:43,419 --> 00:05:49,419
whose first and last vertices are the same. So over on the left you can see a cycle of length 5

48
00:05:49,979 --> 00:05:54,620
that connects these five vertices and where we start to get back to the same place.

49
00:05:57,019 --> 00:06:04,459
So we say the two vertices are connected if there's a path between them and then that definition

50
00:06:05,099 --> 00:06:10,219
leads us to the idea of a graph dividing up into connected components which is

51
00:06:11,180 --> 00:06:17,339
subsets of the graph where each pair of vertices is connected. So one of the algorithms that we're

52
00:06:17,339 --> 00:06:22,620
going to look at today is one for identifying connected components in a graph.

53
00:06:23,979 --> 00:06:30,779
So that's just one example. So here's some examples of problems that might arise in graph

54
00:06:30,779 --> 00:06:36,779
processing that are easily understood just giving these basic definitions. So very first one is

55
00:06:36,779 --> 00:06:41,500
given two vertices is there a path connecting those two vertices like in the internet graph you

56
00:06:41,500 --> 00:06:48,379
want to know can I get from where I am to where I want to get or maybe you want the shortest path

57
00:06:48,379 --> 00:06:54,379
the most efficient way to get between two vertices. You might want to know is there a cycle in the

58
00:06:54,379 --> 00:07:01,019
graph if the graph maybe represents electrical connectivity a cycle might represent a short circuit

59
00:07:01,019 --> 00:07:07,740
you would want to check for that or maybe you want to systematically go everywhere in the graph. So

60
00:07:07,740 --> 00:07:14,300
this two related problems called the Euler tour and the Hamilton tour. Euler tour is is there a cycle

61
00:07:14,300 --> 00:07:20,860
that uses each edge exactly once can I go around the graph and touch every edge in it or one

62
00:07:20,860 --> 00:07:25,420
called the Hamilton tour which says well I'm really just interested in getting to the vertices is

63
00:07:25,420 --> 00:07:34,139
there a cycle that uses each vertex exactly once or basic connectivity problems. So you want to know

64
00:07:34,139 --> 00:07:38,699
is there some way to connect all the vertices is there a path between each pair of vertices in the

65
00:07:38,699 --> 00:07:45,100
graph or not or you might want to know what's called the minimal spanning tree which is the

66
00:07:45,660 --> 00:07:52,379
shortest set of edges of the best way to connect all of the vertices and then various processing

67
00:07:52,379 --> 00:07:58,060
issues related to connectivity for example is there a vertex whose removal disconnects the graph

68
00:08:00,860 --> 00:08:06,939
drawing the graph can you draw the graph in the plane with no edges crossing some of the graphs the

69
00:08:06,939 --> 00:08:14,460
nodes are correspond to places in the plane or cities on the earth or whatever but some of the other

70
00:08:14,459 --> 00:08:19,899
graphs are very abstract the mate and I have nothing to do with geometry you might want to know can

71
00:08:19,899 --> 00:08:27,099
you draw it with no crossing edges or you might have two graphs in the vertex names are different do

72
00:08:27,099 --> 00:08:33,819
they represent the same graph. So one of the biggest challenges in graph processing that will address

73
00:08:33,819 --> 00:08:41,899
today in this lecture somewhat is just to decide how difficult are these problems

74
00:08:41,980 --> 00:08:50,220
some of them are very easy some of them are very difficult and some of them actually is unknown how

75
00:08:50,220 --> 00:08:57,419
difficult they are there's such a broad variety of problems that are simply stated one of the first

76
00:08:57,419 --> 00:09:05,899
things that we have to be aware of when doing graph processing is that we are entering into a forest

77
00:09:06,860 --> 00:09:14,779
of all different possibilities and we have to be careful that we're working on a problem that we

78
00:09:14,779 --> 00:09:20,379
can solve and we'll try to give some insights into that during the lectures that we give on graph

79
00:09:20,379 --> 00:09:26,459
processing so that's our introduction to graph processing.

