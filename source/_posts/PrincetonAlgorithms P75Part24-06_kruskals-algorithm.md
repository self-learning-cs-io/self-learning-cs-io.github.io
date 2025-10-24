---
title: PrincetonAlgorithms P75Part24 06_kruskals Algorithm
---

1
00:00:00,000 --> 00:00:11,480
Now we'll look at Crusco's algorithm for computing the MST.

2
00:00:11,480 --> 00:00:16,760
This is an old algorithm that dates back over 50 years, but it's an effective way to solve

3
00:00:16,760 --> 00:00:18,320
the problem.

4
00:00:18,320 --> 00:00:20,160
The idea is very simple.

5
00:00:20,160 --> 00:00:24,800
We're going to take the edges and we're going to sort them by weight and we're going to

6
00:00:24,800 --> 00:00:28,280
consider a main order of ascending weight.

7
00:00:28,280 --> 00:00:35,439
And the algorithm is simply add the next edge to the tree unless that edge would create

8
00:00:35,439 --> 00:00:36,439
a cycle.

9
00:00:36,439 --> 00:00:40,679
If the edge creates a cycle, ignore it and go on to the next one.

10
00:00:40,679 --> 00:00:43,120
Let's look at a demo of Crusco's algorithm.

11
00:00:43,120 --> 00:00:46,960
Okay, so we have the edges sorted by weight and we're going to take them in ascending order

12
00:00:46,960 --> 00:00:47,960
of weight.

13
00:00:47,960 --> 00:00:54,480
The smallest edge is in the MST and so we add that to the tree.

14
00:00:54,480 --> 00:00:56,920
Doesn't create a cycle.

15
00:00:56,920 --> 00:00:59,600
The smallest edge is 2, 3.

16
00:00:59,600 --> 00:01:01,840
That doesn't create a cycle.

17
00:01:01,840 --> 00:01:04,359
Next one is 1, 7.

18
00:01:04,359 --> 00:01:06,040
That's fine.

19
00:01:06,040 --> 00:01:09,240
Next one is 0, 2.

20
00:01:09,240 --> 00:01:11,159
Next one, 5, 7.

21
00:01:11,159 --> 00:01:14,960
Now when we get to 1, 3, that one creates a cycle.

22
00:01:14,960 --> 00:01:19,719
The algorithm says, creates a cycle, just ignore it.

23
00:01:19,719 --> 00:01:20,799
Next one is 1, 5.

24
00:01:20,799 --> 00:01:23,400
That one also creates a cycle, 1, 5, 7.

25
00:01:23,400 --> 00:01:25,799
Again, just ignore it.

26
00:01:25,799 --> 00:01:29,280
2, 7 creates a cycle, not in the MST.

27
00:01:29,280 --> 00:01:36,640
4, 5, the next smallest edge does not create a cycle, so we add it to the MST.

28
00:01:36,640 --> 00:01:43,400
1, 2 creates a cycle, 4, 7 creates a cycle, 0, 4 creates a cycle.

29
00:01:43,400 --> 00:01:47,120
And finally, we get to 6, 2, which does not create a cycle.

30
00:01:47,120 --> 00:01:49,239
So we add that to the tree.

31
00:01:49,239 --> 00:01:51,840
At this point, we have an MST.

32
00:01:51,840 --> 00:01:57,560
We could check that we have V-1 edges and stop, or we can just keep going and see that

33
00:01:57,560 --> 00:02:02,200
the other edges in the graph create a cycle.

34
00:02:02,200 --> 00:02:07,840
And when we're done considering all the edges, then we have computed the minimum spanning tree.

35
00:02:07,840 --> 00:02:10,000
That's with cross-coals algorithm.

36
00:02:10,000 --> 00:02:14,280
Consider the edges in a sending order of weight, add the next edge to T, unless doing so

37
00:02:14,280 --> 00:02:15,680
would create a cycle.

38
00:02:15,680 --> 00:02:20,439
Now, let's look at what cross-coals algorithm does on a very large graph.

39
00:02:20,439 --> 00:02:25,079
You get a good feeling for what it's doing.

40
00:02:25,079 --> 00:02:31,639
It's taking the small edges, and they coalesce together in little clusters, and eventually

41
00:02:31,639 --> 00:02:38,800
the edges get longer and longer, and they connect together the clusters.

42
00:02:38,800 --> 00:02:43,479
But initially, it's broken up into the very small edges.

43
00:02:43,959 --> 00:02:51,159
And after a while, if you look at the larger clusters, eventually an edge will come that'll

44
00:02:51,159 --> 00:02:52,959
connect them together.

45
00:02:52,959 --> 00:02:58,479
It's not going to be so easy to see how they outweigh the men.

46
00:02:58,479 --> 00:03:05,239
There's some long edge there that's the longest edge in the MST that'll finally connect

47
00:03:05,239 --> 00:03:09,439
the graph.

48
00:03:09,439 --> 00:03:15,319
This simulation really gives a good feeling for cross-coals algorithm.

49
00:03:15,319 --> 00:03:22,159
In fact, when we first had personal computers, I was fortunate enough to be at Xerox Park,

50
00:03:22,159 --> 00:03:25,960
and I remember very well in the late 70s.

51
00:03:25,960 --> 00:03:31,719
This was one of the first algorithms that I wanted to see visualized on a personal computer.

52
00:03:31,719 --> 00:03:36,360
And I wrote a program at that time that produced pretty much this image.

53
00:03:36,360 --> 00:03:43,160
It's a very interesting way to look at MST algorithms.

54
00:03:43,160 --> 00:03:45,600
All right, so it's easy to implement.

55
00:03:45,600 --> 00:03:50,600
We have to prove that it computes the MST, of course.

56
00:03:50,600 --> 00:03:54,560
And we've done a lot of work setting that up.

57
00:03:54,560 --> 00:04:01,640
And we do so just by proving that it's a special case of the greedy MST algorithm.

58
00:04:01,640 --> 00:04:03,440
So what does that mean?

59
00:04:03,439 --> 00:04:11,319
Well, suppose that cross-coals algorithm colors a given edge black.

60
00:04:11,319 --> 00:04:14,120
So it's VW.

61
00:04:14,120 --> 00:04:22,120
So we'll define a cut that is the set of vertices that are connected to V.

62
00:04:22,120 --> 00:04:30,159
So it might be just V, but if there's any black edges connecting V to other vertices, we

63
00:04:30,159 --> 00:04:32,800
put all of those in the cut.

64
00:04:32,800 --> 00:04:41,240
So for that cut, there's no black crossing edge because it's a component.

65
00:04:41,240 --> 00:04:49,040
And the other thing is that there's no crossing edge with lower weight than VW.

66
00:04:49,040 --> 00:04:50,920
And why is that?

67
00:04:50,920 --> 00:04:55,480
Well, we haven't examined any of those edges yet, and they're all longer because we're

68
00:04:55,480 --> 00:05:00,120
considering the edges in increasing order of their weight.

69
00:05:00,120 --> 00:05:05,920
So this new edge that connects V somewhere else is a crossing edge of minimal weight.

70
00:05:05,920 --> 00:05:14,000
And so therefore, the algorithm always finds a cut and colors a crossing edge of minimal

71
00:05:14,000 --> 00:05:16,480
weight for that cut black.

72
00:05:16,480 --> 00:05:20,600
And it's an instance of the greedy algorithm.

73
00:05:20,600 --> 00:05:27,480
Now we still have a bit away from having an implementation of cross-coals algorithm.

74
00:05:27,480 --> 00:05:36,000
So the question is, how do we know whether adding a new edge to the tree will cause a cycle?

75
00:05:36,000 --> 00:05:38,960
So you might think about how difficult that is.

76
00:05:38,960 --> 00:05:48,240
I've got a tree that's represented as a set of edges, or however, and I have a new edge.

77
00:05:48,240 --> 00:05:50,400
And I want to know whether it creates a cycle or not.

78
00:05:50,400 --> 00:05:53,439
How difficult is that going to be?

79
00:05:53,439 --> 00:06:01,639
Well, it turns out way back in the first lecture of algorithms part one, we had a way.

80
00:06:01,639 --> 00:06:06,720
Well, one thing we could do is just run DFS to check if we can get to W from V.

81
00:06:06,720 --> 00:06:09,839
That would take time proportional to V.

82
00:06:09,839 --> 00:06:15,600
But the union-fine data structure that we did in the first lecture absolutely does the job.

83
00:06:15,600 --> 00:06:25,640
It's just testing whether this edge connects anybody in the equivalence class corresponding to V

84
00:06:25,640 --> 00:06:29,960
with anybody in the equivalence class corresponding to Y for W.

85
00:06:29,960 --> 00:06:31,960
And if it did, it creates a cycle.

86
00:06:31,960 --> 00:06:37,120
So union-fine is exactly what we need.

87
00:06:37,120 --> 00:06:44,240
So what we're going to do is maintain a set for each of the connected components in the spanish tree

88
00:06:44,240 --> 00:06:47,000
that we've built up so far.

89
00:06:47,000 --> 00:06:57,879
And so if the new edge connects vertices that are in the same set, then that means it would create a cycle.

90
00:06:57,879 --> 00:07:02,759
And otherwise, we're going to be adding the edge to the tree.

91
00:07:02,759 --> 00:07:09,319
So then we just do the union operation and merge the set containing V with the set containing W.

92
00:07:09,379 --> 00:07:12,240
So that's what we're going to do.

93
00:07:12,240 --> 00:07:17,480
So this is a very complex implementation of the cross-cold algorithm.

94
00:07:17,480 --> 00:07:23,399
Now, to consider the edges in order, we'll use a prior to queue a modern data structure.

95
00:07:23,399 --> 00:07:29,759
So let's take a look at every line in this implementation of cross-cold algorithm.

96
00:07:29,759 --> 00:07:33,800
We're going to have a queue.

97
00:07:33,800 --> 00:07:37,720
That's how we're going to represent the MST.

98
00:07:37,720 --> 00:07:42,800
It could be a stack or a bag, but we'll use a queue.

99
00:07:42,800 --> 00:07:53,360
And then the cross-cold MST algorithm takes a graph and it's going to compute the MST in this MST.

100
00:07:53,360 --> 00:07:58,160
And to do that, it's going to use a priority queue, a min priority queue,

101
00:07:58,160 --> 00:08:03,160
a minimumorian a priority queue of edges.

102
00:08:03,160 --> 00:08:08,160
So we'll build that minimum priority queue.

103
00:08:08,160 --> 00:08:13,160
Now, edges are comparable. We had a compared to method.

104
00:08:13,160 --> 00:08:18,160
So our generic priority queue code is going to work fine.

105
00:08:18,160 --> 00:08:24,160
And so what we'll do is we'll put all the edges in the graph into the priority queue.

106
00:08:24,160 --> 00:08:29,160
So that's building a priority queue containing all the edges in the graph.

107
00:08:29,160 --> 00:08:34,160
Alternatively, we could put the edges in an array and sort the array,

108
00:08:34,160 --> 00:08:40,160
but priority queue is a more elegant way to express this.

109
00:08:40,160 --> 00:08:46,160
And it is a way to look at more efficient algorithms as well.

110
00:08:46,160 --> 00:08:48,160
Okay, so that's a priority queue.

111
00:08:48,160 --> 00:08:51,160
So that's a first data structure from part one.

112
00:08:51,159 --> 00:08:54,159
And then the second one is the union fine data structure.

113
00:08:54,159 --> 00:08:58,159
So we're going to build a union fine data structure for vertices

114
00:08:58,159 --> 00:09:07,159
because the spanning for us divides the vertices into equivalence classes.

115
00:09:07,159 --> 00:09:11,159
So then we go into the main loop.

116
00:09:11,159 --> 00:09:14,159
And the main loop stops in two conditions.

117
00:09:14,159 --> 00:09:17,159
We run out of edges as one,

118
00:09:17,159 --> 00:09:20,159
or would have a minimum spanning for us.

119
00:09:20,159 --> 00:09:25,159
Or the other condition is we get to V minus 1 edges in the MST.

120
00:09:25,159 --> 00:09:33,159
So as long as neither one of those is true, then we've got an edge in the priority queue.

121
00:09:33,159 --> 00:09:37,159
And we want to take the smallest one.

122
00:09:37,159 --> 00:09:42,159
We want to get its vertices V and W, either another.

123
00:09:42,159 --> 00:09:49,159
And then we want to check using the union fine algorithm if they're connected.

124
00:09:49,159 --> 00:09:53,159
If they're connected, we don't want to do anything.

125
00:09:53,159 --> 00:09:59,159
If they're not connected, then we want to merge them and put that edge onto the MST.

126
00:09:59,159 --> 00:10:02,159
That's it.

127
00:10:02,159 --> 00:10:06,159
And then that's the full implementation.

128
00:10:07,159 --> 00:10:13,159
And then we have the edges method for the client to return the MST.

129
00:10:13,159 --> 00:10:21,159
It's quite a compact implementation of a classic algorithm using the basic data structures

130
00:10:21,159 --> 00:10:29,159
that we built up in algorithm part one, data structures and algorithms of priority queue in union fine,

131
00:10:29,159 --> 00:10:35,159
gives a really fine implementation of this MST algorithm.

132
00:10:35,159 --> 00:10:39,159
So what about the running time of this algorithm?

133
00:10:39,159 --> 00:10:46,159
Well, it's not hard to see that it's going to compute the MST in time proportional to e log e.

134
00:10:46,159 --> 00:10:54,159
It's linear rhythmic in the number of edges, which means that we can use it for huge graphs.

135
00:10:54,159 --> 00:11:00,159
So this table is just a proof that summarizes the costs.

136
00:11:00,159 --> 00:11:11,159
We're going to first build the priority queue, and we can do that in linear time using bottom up construction method.

137
00:11:11,159 --> 00:11:15,159
We have to, every edge comes off the priority queue.

138
00:11:15,159 --> 00:11:20,159
So there's e of them, and it takes log e per operation.

139
00:11:20,159 --> 00:11:28,159
And then union operations, every vertex is involved in one, and connected operations, every edge is involved in one.

140
00:11:28,159 --> 00:11:38,159
So the total time is dominated by the e log e for the priority queue operations.

141
00:11:38,159 --> 00:11:47,159
One thing to note is that if the edges come in in sorted order for some reason, it's almost linear.

142
00:11:47,159 --> 00:11:51,159
The order of growth is e log star v.

143
00:11:51,159 --> 00:11:57,159
And actually, we don't have to always sort them.

144
00:11:57,159 --> 00:12:07,159
We can, in real life situations, we can stop when we get the v minus 1 edges in the MST.

145
00:12:07,159 --> 00:12:13,159
When we have those v minus 1 edges, we can stop, and usually that's for practical situations.

146
00:12:13,159 --> 00:12:17,159
That's way before we see all the edges in the graph.

147
00:12:17,159 --> 00:12:23,159
So that's cross-cals algorithm for computing the MST.

