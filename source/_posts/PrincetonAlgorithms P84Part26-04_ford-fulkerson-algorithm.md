---
title: PrincetonAlgorithms P84Part26 04_ford Fulkerson Algorithm
---

1
00:00:00,000 --> 00:00:07,560
To get started, we're going to look at a general scheme for solving max-low min-cut problems

2
00:00:07,560 --> 00:00:10,560
known as the Ford Focus and Algorithm.

3
00:00:10,560 --> 00:00:13,800
Dates back to the 1950s.

4
00:00:13,800 --> 00:00:19,320
And the idea is to start with no flow anywhere.

5
00:00:19,320 --> 00:00:24,800
So we initialize all edges to have capacity zero.

6
00:00:24,800 --> 00:00:33,359
And then find any path from S to T so that you can increase the flow along that path.

7
00:00:33,359 --> 00:00:41,040
Now the simplest case is when bugment along an edge, we're preserving the vertex equilibrium,

8
00:00:41,040 --> 00:00:43,719
local equilibrium at a vertex property.

9
00:00:43,719 --> 00:00:47,719
We're putting some flow in and taking the same amount of flow out.

10
00:00:47,719 --> 00:00:51,880
So here's another augmenting path.

11
00:00:51,880 --> 00:00:55,000
Now this one has what's called a backward edge.

12
00:00:55,000 --> 00:01:03,400
So notice that the path going from S to T goes backwards along that edge.

13
00:01:03,400 --> 00:01:10,000
And the idea is that you can augment flow through the whole network by removing flow in

14
00:01:10,000 --> 00:01:11,439
that path.

15
00:01:11,439 --> 00:01:17,879
That is if we add five units of flow from S to this vertex and five units of flow from S to

16
00:01:17,879 --> 00:01:21,840
this vertex, then what we can do is remove five units of flow.

17
00:01:21,840 --> 00:01:24,760
Units of flow along this edge.

18
00:01:24,760 --> 00:01:27,320
That's to preserve the local equilibrium.

19
00:01:27,320 --> 00:01:31,159
Essentially that five units of flow gets transferred right through.

20
00:01:31,159 --> 00:01:36,840
So after we remove five units, we add five here, that's five coming in.

21
00:01:36,840 --> 00:01:41,439
We remove five here, that's five coming in, there's still ten going out.

22
00:01:41,439 --> 00:01:45,159
And then for the forward edges we add the flow.

23
00:01:45,159 --> 00:01:51,799
That is we can augment the flow along an augmenting path by adding flow to forward edges

24
00:01:51,799 --> 00:01:54,879
and subtracting flow from backward edges.

25
00:01:54,879 --> 00:02:00,479
The maximum amount of flow that we can push through is the remaining capacity in forward

26
00:02:00,479 --> 00:02:03,239
edges and the amount of flow in backward edges.

27
00:02:03,239 --> 00:02:06,079
You can't remove more flow than is there.

28
00:02:06,079 --> 00:02:10,639
In this case we can augment the flow in the network by five.

29
00:02:10,639 --> 00:02:14,240
That fills up the first edge.

30
00:02:14,240 --> 00:02:18,960
So now we've got twenty five units of flow in the network.

31
00:02:18,960 --> 00:02:22,760
And again the idea of removing flow from a backward edge is very simple.

32
00:02:22,760 --> 00:02:29,120
It's just a way to ensure that the local equilibrium condition always remains satisfied as we move

33
00:02:29,120 --> 00:02:30,920
along the path.

34
00:02:30,920 --> 00:02:35,280
In this case there's one more augmenting path.

35
00:02:35,280 --> 00:02:41,760
Okay.

36
00:02:41,759 --> 00:02:52,039
And that's forward forward forward forward forward backwards along that one again and then forward forward.

37
00:02:52,039 --> 00:02:55,599
So and then what's the maximum amount of we can push through.

38
00:02:55,599 --> 00:03:04,799
In this case this one's got five in it and it's got a capacity of eight so we can put three more units of flow through this network.

39
00:03:04,799 --> 00:03:11,159
And we get a now we have twenty eight units of flow going through the network.

40
00:03:11,159 --> 00:03:18,560
And the algorithm terminates when there's no way to find an augmenting path from S to T.

41
00:03:18,560 --> 00:03:19,759
And what's that mean?

42
00:03:19,759 --> 00:03:33,199
That means that every augmenting path, every every path from S to T contains either a full forward edge or an empty backwards edge.

43
00:03:33,199 --> 00:03:39,719
We can't put more flow through a forward edge and we can't remove flow from an empty backward edge.

44
00:03:39,719 --> 00:03:48,120
So when there's no more augmenting paths, the algorithm terminates.

45
00:03:48,120 --> 00:03:49,639
And so that's the algorithm.

46
00:03:49,639 --> 00:03:51,560
We start with no flow.

47
00:03:51,560 --> 00:04:07,639
As long as there's an augmenting path, we find that path and look through the path to find the amount of capacity left in the most full forward edge and the amount of flow left in the most empty backwards edge.

48
00:04:07,639 --> 00:04:10,799
And we increase the flow on the path by that amount.

49
00:04:10,799 --> 00:04:13,799
If we can't find an augmenting path, we're done.

50
00:04:13,799 --> 00:04:17,240
Now there's a few questions about this.

51
00:04:17,240 --> 00:04:20,000
So that solves the maximum flow problem.

52
00:04:20,000 --> 00:04:23,680
We have to look at how to compute a min cut.

53
00:04:23,680 --> 00:04:27,879
We have to figure out a way to find an augmenting path.

54
00:04:27,879 --> 00:04:28,839
That's not too hard.

55
00:04:28,839 --> 00:04:33,800
That's similar to many other graph processing problems that we've already solved.

56
00:04:33,800 --> 00:04:43,000
And we have to ensure that, or at least show that, it always computes a max flow.

57
00:04:43,000 --> 00:04:45,920
And there's even a question of does it actually terminate?

58
00:04:45,920 --> 00:04:54,199
Maybe you could get stuck in some kind of situation where it removes flow on an edge in one path and adds it in another.

59
00:04:54,199 --> 00:05:01,199
And so even analyzing how many times it does augmentation, this is actually not so straightforward.

60
00:05:01,199 --> 00:05:04,639
So we'll take a look at these questions.

61
00:05:04,639 --> 00:05:09,360
That's the Ford Fulcrumson algorithm, the general scheme for solving max flow.

