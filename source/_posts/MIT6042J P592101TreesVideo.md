---
title: MIT6042J P592101TreesVideo
---

1
00:00:00,000 --> 00:00:07,000
Trees are about the most basic data structure that you're ever going to come across.

2
00:00:07,000 --> 00:00:10,000
They provide computer science and other subjects.

3
00:00:10,000 --> 00:00:12,000
So let's talk about them.

4
00:00:12,000 --> 00:00:17,000
And the simplest definition of a tree is that a tree is a connected graph with no cycles.

5
00:00:17,000 --> 00:00:22,000
This setting we're talking about simple graphs and trees with undirected edges.

6
00:00:22,000 --> 00:00:26,000
Well, in order to make sense of that, we better have a definition of a cycle.

7
00:00:26,000 --> 00:00:29,000
There's a picture of a typical tree.

8
00:00:29,000 --> 00:00:32,000
But to be precise, what's a cycle in a simple graph?

9
00:00:32,000 --> 00:00:37,000
Well, it's a closed walk of length greater than two that doesn't cross itself.

10
00:00:37,000 --> 00:00:43,000
So not crossing itself is the standard definition of a cycle that we were using in a directed graph.

11
00:00:43,000 --> 00:00:49,000
It simply means that it's a path except that the beginning and end vertex are the same.

12
00:00:49,000 --> 00:00:54,000
So it looks like you start someplace at V and then you go around to A and to W.

13
00:00:54,000 --> 00:01:01,000
And it's all distinct vertices as you go around in this path, except that the path ends where it starts at V,

14
00:01:01,000 --> 00:01:04,000
which is what keeps it from being a path and makes it a cycle.

15
00:01:04,000 --> 00:01:12,000
Now, the length greater than two is what is the difference between the definition of cycle between simple graphs and directed graphs.

16
00:01:12,000 --> 00:01:19,000
In a directed graph, it's perfectly possible to have a self-loop of length one that is an interesting and important kind of cycle to have.

17
00:01:20,000 --> 00:01:26,000
But we forbid them in simple graphs because there's no way to avoid having a cycle of length two

18
00:01:26,000 --> 00:01:30,000
because you always have the ability to go back and forth across an edge.

19
00:01:30,000 --> 00:01:31,000
That's not interesting.

20
00:01:31,000 --> 00:01:34,000
And so we don't consider that to be a cycle.

21
00:01:34,000 --> 00:01:37,000
A cycle then has to be of length greater than two.

22
00:01:37,000 --> 00:01:43,000
It also rules out the cycle of length zero, which you get by taking a vertex or by itself.

23
00:01:44,000 --> 00:01:50,000
With that technical definition, we now know what a cycle is in the simple graph and we understand the definition of tree.

24
00:01:50,000 --> 00:01:55,000
Here are some more pictures of trees, simple graphs with no cycles.

25
00:01:55,000 --> 00:01:59,000
Now, they really come up all the time and why is that?

26
00:01:59,000 --> 00:02:06,000
Well, there are family trees, which you may be familiar with where you're drawing a picture of the descendants of a given person

27
00:02:06,000 --> 00:02:11,000
and they keep branching out in a tree structure as traditionally displayed.

28
00:02:12,000 --> 00:02:19,000
There are search trees which come up the whole time in computer science where you branch on the answer to some question

29
00:02:19,000 --> 00:02:21,000
which tells you which way to search next.

30
00:02:21,000 --> 00:02:27,000
There are game trees which we've already discussed in this class which are used to define games and strategies.

31
00:02:27,000 --> 00:02:33,000
There are parse trees that come up in compiler technology and in language theory.

32
00:02:33,000 --> 00:02:38,000
And then there are spanning trees which we're going to be talking about some today.

33
00:02:39,000 --> 00:02:44,000
Now, in addition to these places where trees come up, there are a lot of different kinds of trees.

34
00:02:44,000 --> 00:02:53,000
There's rooted trees where there's some designated vertex called the root and you think of getting to all the other vertices from the root.

35
00:02:53,000 --> 00:03:06,000
There are ordered trees where when you're at a given vertex, there's a distinct order in which you are going to be in which the exit edges from a vertex.

36
00:03:06,000 --> 00:03:11,000
There's a first one and the second one and the third one or the left one and the next left most and so on.

37
00:03:11,000 --> 00:03:15,000
So that there's an order in which you can choose to leave the vertex.

38
00:03:15,000 --> 00:03:24,000
There are binary trees in which each vertex has sort of two ways out, exactly, or no ways out if it's a so-called leaf.

39
00:03:24,000 --> 00:03:31,000
And then there are complete trees whose definition is not important to us because we're not going to consider any of these.

40
00:03:31,000 --> 00:03:40,000
There's also, by the way, directed trees in which edges have a direction as a digraph tree but we're not considering any of these.

41
00:03:40,000 --> 00:03:48,000
We're going to focus on so-called pure trees which are unordered, unrooted, undirected and that's what we're talking about.

42
00:03:48,000 --> 00:03:52,000
So let's examine some more properties of trees and equivalent definitions of trees.

43
00:03:52,000 --> 00:03:59,000
It will be important for theoretical reasons and convenience to know lots of different characterizations of trees.

44
00:03:59,000 --> 00:04:08,000
So we've starting off with a definition which says it's a connected simple graph with no cycles but there's other ways to characterize it.

45
00:04:08,000 --> 00:04:17,000
So an edge in a simple graph is called a cut edge if when you remove it from the graph two vertices that used to be connected.

46
00:04:17,000 --> 00:04:21,000
That is used to have a path between them, ceased to have a path between them.

47
00:04:21,000 --> 00:04:31,000
So here's a simple graph illustration and that edge E is a cut edge because if I delete it then there are now two components.

48
00:04:31,000 --> 00:04:38,000
There used to be two vertices, actually any of the vertices here, used to be connected to any of the vertices there via that edge.

49
00:04:38,000 --> 00:04:47,000
But once I've deleted that edge, all of those vertices here and there that used to be connected no longer are so that makes E a cut edge.

50
00:04:47,000 --> 00:05:00,000
F is not a cut edge because even if I delete edge, there is in fact still a path from every vertex to every other vertex here so that F is not disconnecting anything.

51
00:05:00,000 --> 00:05:03,000
And as I say it's still connected after you delete it.

52
00:05:03,000 --> 00:05:13,000
So now we get a simple way to characterize trees in terms of cut edges because an edge is not a cut edge if and only if it's on a cycle.

53
00:05:13,000 --> 00:05:24,000
If you think about that, if it's on a cycle and you cut an edge out of a cycle then everything on the cycle is still connected by going the other way around the cycle that doesn't use that edge.

54
00:05:24,000 --> 00:05:41,000
And if it's not on a cycle then in fact you can think through that deleting it means that there's not going to be two paths between two things at its end points and so it will separate them.

55
00:05:41,000 --> 00:05:55,000
Okay, so another way then to define a tree is to say a tree is a connected graph where every edge is a cut edge that as soon as you cut any edge out of a tree it stops being connected.

56
00:05:55,000 --> 00:06:12,000
That yields another way to say that something is a tree. A tree is a simple graph that is connected and is edge minimal which again means that if you remove any edge it stops having that property of being connected so it's an edge minimal connected graph.

57
00:06:12,000 --> 00:06:24,000
That's kind of the reason why trees are so important because if you're trying to figure out a way to get a whole bunch of things, a whole bunch of vertices connected, a tree is going to have the minimum number of edges that are connected.

58
00:06:24,000 --> 00:06:49,000
So that's the reason why it's so important is that our sufficient to get them all connected. If you think about different nodes in a network that need to communicate with each other and you want to know how many direct connections do there have to be between these communication centers in order for everybody to talk to everybody else, the answer is it's got to be a tree on end vertices and a tree on end vertices is going to have exactly n minus one edges.

59
00:06:49,000 --> 00:07:00,000
As you, still another equivalent definition of a tree, a tree is a connected graph that has n vertices and n minus one edges.

60
00:07:00,000 --> 00:07:13,000
So a kind of dual way to think about it is that a tree is an acyclic graph that has as many edges as it possibly could without having any cycles.

61
00:07:13,000 --> 00:07:22,000
So typically an acyclic graph might not be connected but as long as it's not connected you can keep adding edges that will connect things up without creating cycles.

62
00:07:22,000 --> 00:07:33,000
But the minute you get a tree so that everything's connected you can't add another edge. So an edge maximal, an edge maximal acyclic graph is still another way to characterize trees.

63
00:07:33,000 --> 00:07:43,000
And maybe the most useful way is to say that a graph in which there is a unique path between any two vertices is a tree.

64
00:07:43,000 --> 00:07:54,000
So of course if there's a unique path in particular is a path so all the vertices have to be connected but what makes it a tree is that there aren't two different ways to connect between two vertices.

65
00:07:54,000 --> 00:08:06,000
Because as soon as it were there would be a cycle. And those are some of the basic ways that trees can be formulated equivalently and in fact there's lots more but this is enough for today.

