---
title: PrincetonAlgorithms P72Part24 03_introduction To Msts
---

1
00:00:00,000 --> 00:00:07,000
Today we're going to talk about minimum spanning trees.

2
00:00:07,000 --> 00:00:13,160
This is a terrific topic for this course because it combines a number of classic algorithms

3
00:00:13,160 --> 00:00:20,760
with modern data structures to solve a variety of huge problems that are important in practical

4
00:00:20,760 --> 00:00:22,760
applications nowadays.

5
00:00:22,760 --> 00:00:26,280
We'll start with a brief introduction.

6
00:00:26,280 --> 00:00:28,359
What is a minimum spanning tree?

7
00:00:28,359 --> 00:00:32,039
Well, it's a defined on a graph.

8
00:00:32,039 --> 00:00:37,719
Now we generalize the idea of a graph one more time to allow weights on the edges.

9
00:00:37,719 --> 00:00:42,200
So these are positive numbers associated with each edge.

10
00:00:42,200 --> 00:00:43,920
And let's say the graph is connected.

11
00:00:43,920 --> 00:00:47,239
So we have a connected graph with weighted edges.

12
00:00:47,239 --> 00:00:55,359
Now a spanning tree of a graph is a subgraph that is connected and has no cycles.

13
00:00:55,359 --> 00:01:02,039
So out of all the spanning trees we want to find one that has minimum weight.

14
00:01:02,039 --> 00:01:08,120
So that's not a spanning tree because it's not connected.

15
00:01:08,120 --> 00:01:14,079
This set of black edges is not a spanning tree because it's not a cyclic.

16
00:01:14,079 --> 00:01:16,599
But here's one that is a spanning tree.

17
00:01:16,599 --> 00:01:22,599
And if you add up the weights of all the edges, 4 plus 6 plus 8 plus 5 plus 11 plus 9 plus

18
00:01:22,599 --> 00:01:25,159
7, that's 50.

19
00:01:25,159 --> 00:01:30,799
And you could see maybe you could get another spanning tree by removing this edge and adding

20
00:01:30,799 --> 00:01:34,479
that edge that it have slightly higher weight.

21
00:01:34,479 --> 00:01:38,919
And so the goal is to find a spanning tree of minimum weight.

22
00:01:38,919 --> 00:01:47,679
Now there is a brute force algorithm that is impractical and probably would be difficult

23
00:01:47,679 --> 00:01:48,679
even to go up.

24
00:01:48,679 --> 00:01:52,159
And that is let's try all possible spanning trees.

25
00:01:52,159 --> 00:01:55,799
But certainly we want to do better than that.

26
00:01:55,799 --> 00:02:03,319
Here's some examples of some huge spanning trees that are being worked on in practice

27
00:02:03,319 --> 00:02:04,319
nowadays.

28
00:02:04,319 --> 00:02:07,679
This is the bicycle roots in Seattle.

29
00:02:07,679 --> 00:02:14,159
And it kind of gives a quick way to get from downtown out to the suburbs, you can see.

30
00:02:14,159 --> 00:02:20,359
This is the idea of an MST as a model of natural phenomenon.

31
00:02:20,360 --> 00:02:26,360
And there are many observed natural phenomenon that seem to be well modeled by spanning trees.

32
00:02:26,360 --> 00:02:33,400
This is a purely random graph and a minimal spanning tree of that random graph.

33
00:02:33,400 --> 00:02:40,920
And this is the image that came up in cancer research having to do with the arrangement

34
00:02:40,920 --> 00:02:43,680
of nuclei in the epithelium.

35
00:02:43,680 --> 00:02:51,680
And you can see that this tree that's observed in nature is quite similar in character to

36
00:02:51,680 --> 00:02:55,280
the MST of the random graph.

37
00:02:55,280 --> 00:02:58,120
So that's another example.

38
00:02:58,120 --> 00:03:00,960
This is an example from image processing.

39
00:03:00,960 --> 00:03:09,760
The process known as dithering to remove fuzziness in medical and other images and computing

40
00:03:09,759 --> 00:03:16,319
the MST of a huge graph built from such images is here another application.

41
00:03:16,319 --> 00:03:21,959
So it's a bottom line for this introduction as an MST is easily defined.

42
00:03:21,959 --> 00:03:27,599
It's the minimum weight set of edges that connect the vertices in a way to graph.

43
00:03:27,599 --> 00:03:35,239
And it's got diverse applications from dithering and face verification to road networks and satellite

44
00:03:35,240 --> 00:03:44,480
imagery to ethernet networks and to network designs of all kind.

45
00:03:44,480 --> 00:03:53,920
And it goes back a long way to the even early 20th century for electrical and hydraulic networks.

46
00:03:53,920 --> 00:03:56,920
So that's an introduction to the idea of a minimum spanning tree.

