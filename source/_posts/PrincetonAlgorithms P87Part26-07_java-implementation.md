---
title: PrincetonAlgorithms P87Part26 07_java Implementation
---

1
00:00:00,000 --> 00:00:09,240
Next, we're going to look at Java code for solving the Maxwellot problem.

2
00:00:09,240 --> 00:00:15,759
This is the most complex graph processing algorithm we've seen so far, but it's a relatively

3
00:00:15,759 --> 00:00:23,240
small amount of code that builds upon the mechanisms that we've been studying for the last

4
00:00:23,240 --> 00:00:25,600
couple of lectures.

5
00:00:25,600 --> 00:00:32,200
So now the graphs that we're working with are a little more complicated because we have

6
00:00:32,200 --> 00:00:38,200
to associate with each edge not just a capacity but also a flow.

7
00:00:38,200 --> 00:00:44,960
So we'll build a slightly more complicated data type for edges called a flow edge where

8
00:00:44,960 --> 00:00:48,719
for each edge we can keep track of that information.

9
00:00:48,719 --> 00:00:55,679
So we not only have to keep the from vertex v and the two vertex w, the weight or the

10
00:00:55,679 --> 00:01:00,719
capacity c associated with the edge but and also the flow.

11
00:01:00,719 --> 00:01:03,000
So that's a flow edge.

12
00:01:03,000 --> 00:01:10,879
And then the flow network, since we're going to go through edges in the wrong direction,

13
00:01:10,879 --> 00:01:15,960
we're going to have to put every flow edge kind of like an undirected graph in both the

14
00:01:15,959 --> 00:01:20,919
adjacency list and then we're going to test whether we're going which direction we're

15
00:01:20,919 --> 00:01:22,119
going through an edge.

16
00:01:22,119 --> 00:01:29,719
It's kind of like using an undirected graph but the flow network anyway has to have edges

17
00:01:29,719 --> 00:01:34,000
in both places so it can do backward edges.

18
00:01:34,000 --> 00:01:41,519
A simple way to arrange for this is to compute for the edges of what's called the residual

19
00:01:41,519 --> 00:01:42,919
capacity.

20
00:01:42,920 --> 00:01:49,180
And that's just what we're going to use to compute the bottleneck value of the maximum

21
00:01:49,180 --> 00:01:51,719
out of flow we can pull through.

22
00:01:51,719 --> 00:01:58,719
So for a backward edge we'll assign the residual capacity to be the amount of flow and for

23
00:01:58,719 --> 00:02:02,480
a forward edge it'll be the capacity minus the flow.

24
00:02:02,480 --> 00:02:07,359
So that's the maximum amount of stuff we can get for the edge when we're augmenting

25
00:02:07,359 --> 00:02:10,599
that's residual capacity.

26
00:02:10,599 --> 00:02:17,599
So and to actually do the augmentation you'll have a value which is your maximum amount

27
00:02:17,599 --> 00:02:20,759
you're going to augment.

28
00:02:20,759 --> 00:02:24,560
And so if you're on a forward edge you add it and if you're on a backward edge you subtract

29
00:02:24,560 --> 00:02:26,039
it.

30
00:02:26,039 --> 00:02:31,039
So that's the basic idea and it's just quite natural from the graph representations we've

31
00:02:31,039 --> 00:02:36,560
been using and the way that the forward focus in algorithm works.

32
00:02:36,560 --> 00:02:44,439
So one way to think of this is to a little bit closer to the representation that we're

33
00:02:44,439 --> 00:02:52,960
using is to consume otherwise it's kind of similar to our undirected graph representation.

34
00:02:52,960 --> 00:02:57,920
But when we're processing the graph we use residual capacity to make it kind of work

35
00:02:57,920 --> 00:03:02,319
in the residual graph in the natural way.

36
00:03:02,319 --> 00:03:10,879
So this is the implementation of the forward focus in algorithm and again pretty straightforward

37
00:03:10,879 --> 00:03:16,919
to given the description that we've done in the graph processing code that we've written

38
00:03:16,919 --> 00:03:19,599
up to this time.

39
00:03:19,599 --> 00:03:25,639
So it's got a have an array of vertices that we've been to.

40
00:03:25,639 --> 00:03:34,000
This got an edge to array which is how do we get to each vertex so we can provide the

41
00:03:34,000 --> 00:03:42,719
client with the flow so that we can process paths in the graph and then it's got the value

42
00:03:42,719 --> 00:03:43,719
of the flow.

43
00:03:43,719 --> 00:03:48,759
So let's look at the code it's kind of self-documenting.

44
00:03:48,759 --> 00:03:54,199
So what we'll do is we set the value of the flow to zero.

45
00:03:54,199 --> 00:04:02,199
So we're going to find out if it has an augmenting path and we'll look at that method in a minute

46
00:04:02,199 --> 00:04:06,679
as long as it has an augmenting path.

47
00:04:06,679 --> 00:04:15,079
Then when we call has augmenting path basically what that's going to do is that's going to do

48
00:04:15,079 --> 00:04:21,240
a graph search and mark the vertices that it visits and if it gets to this target it's

49
00:04:21,240 --> 00:04:27,519
going to leave that path in the edge to array in the standard way.

50
00:04:27,519 --> 00:04:36,240
The edge to of t contains the edge that contains the vertex that took us to t and so forth

51
00:04:36,240 --> 00:04:45,000
and so we'll use that edge to go back through the path and to figure out the bottleneck capacity

52
00:04:45,000 --> 00:04:51,199
which is the minimum of the bottleneck capacity and the residual capacity in the edge that

53
00:04:51,199 --> 00:04:53,079
we're processing.

54
00:04:53,079 --> 00:05:01,800
So that's the maximum amount of flow that we can push through the network is go through

55
00:05:01,800 --> 00:05:09,879
the path and find the minimum of either the unused capacity in some forward edge or the

56
00:05:09,879 --> 00:05:13,079
available flow in some backward edge.

57
00:05:13,079 --> 00:05:17,439
So then once we have the bottleneck capacity then we just go back through the path again

58
00:05:17,439 --> 00:05:23,680
and add residual flow to every edge in that path.

59
00:05:23,680 --> 00:05:30,680
So that's augment the flow and then once we've augment the flow then we update the value.

60
00:05:30,680 --> 00:05:41,039
Notice that when this terminates it terminates because we couldn't find an augmenting path

61
00:05:41,040 --> 00:05:46,800
and we couldn't find an augmenting path meant that essentially we did a graph search that

62
00:05:46,800 --> 00:05:53,960
got stuck with finding all full forward edges or empty backward edges before getting to

63
00:05:53,960 --> 00:06:01,879
the target and that's precisely the computation that we needed to do to compute the cut.

64
00:06:01,879 --> 00:06:08,640
So to tell whether vertex is reachable for mess we just check Mark V and so we can tell

65
00:06:08,639 --> 00:06:18,680
the client which vertices are in the cut and then we can find the edges that leave that

66
00:06:18,680 --> 00:06:22,319
vertex with the edges that comprise the cut.

67
00:06:22,319 --> 00:06:28,919
So now we have to do to finish is to look at has augmenting path which is the graph search

68
00:06:28,919 --> 00:06:31,240
in the residual network.

69
00:06:31,240 --> 00:06:37,759
And for this example we'll use breadth first search although the other search algorithms

70
00:06:37,759 --> 00:06:44,879
that we've studied can be adapted in the same way depth first search or using a priority

71
00:06:44,879 --> 00:06:49,039
queue as in Prims algorithm or Dijkstra's algorithm.

72
00:06:49,039 --> 00:07:00,839
So we have our standard edge two in marked arrays and so we're going to have a queue which

73
00:07:00,839 --> 00:07:04,839
is not going to contain the vertices that we've encountered.

74
00:07:04,839 --> 00:07:12,439
We'll put the source on there while the queue's not empty we'll take a vertex off and so

75
00:07:12,439 --> 00:07:21,439
we'll go through everybody associated that's connected to that vertex it's a flow edge

76
00:07:21,439 --> 00:07:30,479
and then you check the residual capacity and if it's bigger than zero that means you have

77
00:07:30,480 --> 00:07:35,560
a way to get to W and if it's not marked you haven't been there yet then you go ahead

78
00:07:35,560 --> 00:07:42,720
and go there and mark it it's essentially breadth first search.

79
00:07:42,720 --> 00:07:49,680
So that's the code for has augmenting path and that essentially completes the implementation

80
00:07:49,680 --> 00:07:52,360
of breadth first search.

81
00:07:52,360 --> 00:08:02,520
And mark T tells the returns true or false if you can get from T to S after that search

82
00:08:02,520 --> 00:08:09,600
is gone then T will be marked and you can return true this method can return true.

83
00:08:09,600 --> 00:08:12,120
That's a Java implementation of the max flow.

