---
title: PrincetonAlgorithms P64Part22 06_breadth First Search
---

1
00:00:00,000 --> 00:00:08,560
Next we're going to talk about breadth first search, which is a completely different way

2
00:00:08,560 --> 00:00:12,200
to process all the vertices connected to a given vertex.

3
00:00:12,200 --> 00:00:17,679
It'll get the job done, but it has totally different properties that are useful in different

4
00:00:17,679 --> 00:00:21,359
ways for different applications.

5
00:00:21,359 --> 00:00:27,280
So to understand breadth first search, we'll start right out with a demo.

6
00:00:27,280 --> 00:00:30,480
So breadth first search is not a recursive algorithm.

7
00:00:30,480 --> 00:00:34,800
It uses a queue as an auxiliary data structure.

8
00:00:34,800 --> 00:00:39,439
And it's also quite simple to explain.

9
00:00:39,439 --> 00:00:45,359
So what we're going to do is we're going to put the source vertex on a queue and then repeat

10
00:00:45,359 --> 00:00:48,840
the following until the queue is empty.

11
00:00:48,840 --> 00:00:56,840
Remove the next vertex from the queue in a faithful order, then add to the queue all unmarked

12
00:00:56,840 --> 00:01:00,320
vertices that are adjacent to the end mark them.

13
00:01:00,320 --> 00:01:02,720
I just keep doing that until the queue is empty.

14
00:01:02,720 --> 00:01:05,280
Let's see how that works on our example.

15
00:01:05,280 --> 00:01:12,760
This is a smaller example, just a six vertex graph with eight edges.

16
00:01:12,760 --> 00:01:15,439
So add zero to the queue.

17
00:01:15,439 --> 00:01:19,480
So we just take zero and put it on the queue, that's where we start.

18
00:01:19,480 --> 00:01:24,640
And now go into repeating until queue is empty, remove a vertex, add all unmarked vertex

19
00:01:24,640 --> 00:01:26,480
adjacent to mark them.

20
00:01:26,480 --> 00:01:30,000
So we deque zero.

21
00:01:30,000 --> 00:01:36,079
And then in order to process zero, we need to check all of adjacent vertices.

22
00:01:36,079 --> 00:01:38,640
So in this case, it's 2, 1, and 5.

23
00:01:38,640 --> 00:01:45,320
And again, the order depends on how the bag was constructed for vertices adjacent to

24
00:01:45,320 --> 00:01:48,240
zero.

25
00:01:48,240 --> 00:01:51,040
So we check two.

26
00:01:51,040 --> 00:01:53,600
And that is not marked.

27
00:01:53,599 --> 00:01:56,559
So we have to add it to the queue.

28
00:01:56,559 --> 00:01:59,319
We check, then we check one.

29
00:01:59,319 --> 00:02:00,319
That's not marked.

30
00:02:00,319 --> 00:02:02,919
So we add it to the queue.

31
00:02:02,919 --> 00:02:04,479
Then we check five.

32
00:02:04,479 --> 00:02:05,759
And that's not marked.

33
00:02:05,759 --> 00:02:07,959
So we add it to the queue.

34
00:02:07,959 --> 00:02:13,599
So that's, we finished processing zero, zero done.

35
00:02:13,599 --> 00:02:17,159
So now we removed the next vertex from the queue.

36
00:02:17,159 --> 00:02:18,560
In this case, it's 2.

37
00:02:18,560 --> 00:02:23,920
We're going to take two off the queue and process it by adding to the queue all the unmarked

38
00:02:23,920 --> 00:02:26,520
vertices there adjacent.

39
00:02:26,520 --> 00:02:32,759
So to process two, we have to check zero, one, three, and four.

40
00:02:32,759 --> 00:02:33,759
We check zero.

41
00:02:33,759 --> 00:02:34,759
That's already marked.

42
00:02:34,759 --> 00:02:36,240
So we're going to do anything.

43
00:02:36,240 --> 00:02:38,680
We checked one.

44
00:02:38,680 --> 00:02:40,000
That's also already marked.

45
00:02:40,000 --> 00:02:41,000
So we don't do anything.

46
00:02:41,000 --> 00:02:44,199
That's the fact that it's on the queue.

47
00:02:44,199 --> 00:02:45,960
We check three.

48
00:02:45,960 --> 00:02:47,599
And that one is unmarked.

49
00:02:47,599 --> 00:02:51,000
So we mark it and add it to the queue.

50
00:02:51,000 --> 00:02:52,719
And then we check four.

51
00:02:52,719 --> 00:02:53,799
That one's unmarked.

52
00:02:53,799 --> 00:02:57,400
So we mark it and add it to the queue.

53
00:02:57,400 --> 00:03:08,680
So by the way, I didn't mention, but we're also keeping track of two auxiliary data structures

54
00:03:08,680 --> 00:03:10,639
for this.

55
00:03:10,639 --> 00:03:14,359
One is the edge to array, which is the same as before.

56
00:03:14,360 --> 00:03:19,200
The edge did we use to get to this so four.

57
00:03:19,200 --> 00:03:21,640
We got to four from two.

58
00:03:21,640 --> 00:03:23,520
And two, we got to two from zero.

59
00:03:23,520 --> 00:03:28,880
So again, that's going to be a tree that gives us a path back to the source.

60
00:03:28,880 --> 00:03:36,720
And instead of marked, we also keep a more detailed information, which is the length of the

61
00:03:36,720 --> 00:03:37,720
path.

62
00:03:37,720 --> 00:03:40,560
We do it because it's easy to do it.

63
00:03:40,560 --> 00:03:46,439
So four, we check four and add it to the queue.

64
00:03:46,439 --> 00:03:48,159
And now we're done with two.

65
00:03:48,159 --> 00:03:52,560
So now we have one, five, three, and four are all in the queue.

66
00:03:52,560 --> 00:03:56,360
And we're going to process them.

67
00:03:56,360 --> 00:04:03,640
And since we've marked everything, all we're going to be doing now is checking vertices

68
00:04:03,640 --> 00:04:04,640
that are marked.

69
00:04:04,640 --> 00:04:06,640
So for one, we check zero.

70
00:04:06,640 --> 00:04:07,640
And that's marked.

71
00:04:07,640 --> 00:04:08,640
And we check two.

72
00:04:08,640 --> 00:04:09,640
And that's marked.

73
00:04:09,879 --> 00:04:11,679
So then we're done with one.

74
00:04:11,679 --> 00:04:14,599
Next thing off the queue is five.

75
00:04:14,599 --> 00:04:16,360
And we check three.

76
00:04:16,360 --> 00:04:17,120
And that's marked.

77
00:04:17,120 --> 00:04:17,959
And we check zero.

78
00:04:17,959 --> 00:04:18,719
And that's marked.

79
00:04:18,719 --> 00:04:20,759
So we're done with five.

80
00:04:20,759 --> 00:04:24,879
And then three, we got to check five.

81
00:04:24,879 --> 00:04:26,800
And then four.

82
00:04:26,800 --> 00:04:27,560
And then two.

83
00:04:27,560 --> 00:04:28,479
And they're all marked.

84
00:04:28,479 --> 00:04:30,319
And now we're done with three.

85
00:04:30,319 --> 00:04:34,319
And then finally, the last one, always the last one, everybody else is marked.

86
00:04:34,319 --> 00:04:35,800
We're connected.

87
00:04:35,800 --> 00:04:37,800
Check three.

88
00:04:37,800 --> 00:04:39,040
Check two.

89
00:04:39,040 --> 00:04:41,800
It's marked and we're done.

90
00:04:41,800 --> 00:04:50,360
So this process, the result of this computation, again, is a tree rooted at the source.

91
00:04:50,360 --> 00:04:57,719
And we can follow back through the tree to get passed from each node to the source.

92
00:04:57,719 --> 00:05:03,519
And not only that, we can get the distance, the number of edges on the path from each

93
00:05:03,519 --> 00:05:05,919
node to the source.

94
00:05:05,919 --> 00:05:08,519
So that's a demo of breadth-first search.

95
00:05:08,519 --> 00:05:11,759
And next, we'll take a look at properties of this algorithm.

96
00:05:11,759 --> 00:05:12,759
All right.

97
00:05:12,759 --> 00:05:18,039
So now we've considered two different methods for processing all vertices in a graph.

98
00:05:18,039 --> 00:05:23,560
And actually, they're quite closely related, even though the competitions are quite different.

99
00:05:23,560 --> 00:05:26,359
Essentially, depth-first search uses recursion.

100
00:05:26,359 --> 00:05:30,199
So it corresponds to putting unvisited vertices on a stack.

101
00:05:30,199 --> 00:05:35,519
In breadth-first search, explicitly, we put the unvisited vertices on the queue.

102
00:05:35,519 --> 00:05:40,719
And actually, breadth-first search solves another problem that, and often we want to solve,

103
00:05:40,719 --> 00:05:43,279
called the shortest path problem.

104
00:05:43,279 --> 00:05:49,240
Actually the path that you get back from breadth-first search is the path from the source to the

105
00:05:49,240 --> 00:05:53,560
given vertex that uses the fewest number of edges.

106
00:05:53,560 --> 00:05:56,360
And we'll look at that in just a minute.

107
00:05:56,360 --> 00:06:02,000
And the idea is that the breadth-first search examines the vertices in the graph in increasing

108
00:06:02,000 --> 00:06:04,879
distance from the source.

109
00:06:04,879 --> 00:06:09,240
So let's take a look at that.

110
00:06:09,240 --> 00:06:13,360
So breadth-first search computes shortest paths.

111
00:06:13,360 --> 00:06:17,360
That is, it builds the data structure that we can answer shortest path queries from the

112
00:06:17,360 --> 00:06:23,840
source width, from S to all other vertices in the graph in time proportional to E plus V

113
00:06:23,839 --> 00:06:27,519
than a revvedged plus an irreversive.

114
00:06:27,519 --> 00:06:30,679
And so let's look at why that's the case.

115
00:06:30,679 --> 00:06:37,039
So the first thing is, how do we know that it computes shortest paths?

116
00:06:37,039 --> 00:06:46,479
Well the intuition is, and you can fill in the details, the queue always contains some

117
00:06:46,480 --> 00:06:54,080
vertices of distance k from the source, followed by some vertices of distance k plus 1.

118
00:06:54,080 --> 00:07:00,400
So there on a queue, we're processing them in first and first out order.

119
00:07:00,400 --> 00:07:07,200
So say we're at a state when all of these vertices are on the queue.

120
00:07:07,200 --> 00:07:10,160
We're going to have process vertex 0.

121
00:07:10,160 --> 00:07:14,680
As soon as we get this one, we'll delete vertex 0 from the queue.

122
00:07:14,680 --> 00:07:16,840
And then we're putting these adjacent ones on.

123
00:07:16,840 --> 00:07:19,079
We're adding the ones of distance 2.

124
00:07:19,079 --> 00:07:23,680
But we're not going to process any of those until we're done with the ones of distance 1 and so forth.

125
00:07:23,680 --> 00:07:31,800
So it's not hard to show that always you have either one of the two distances from the source on the

126
00:07:31,800 --> 00:07:32,079
queue.

127
00:07:32,079 --> 00:07:38,800
And that means the first time we get to a vertex, that's the shortest path to that vertex.

128
00:07:38,800 --> 00:07:45,280
And again, the running time, we only visit vertices once because we mark them.

129
00:07:45,280 --> 00:07:51,639
So it's time proportional to the number of vertices plus the number of edges in the graph.

130
00:07:51,639 --> 00:07:54,120
So that's breadth for search properties.

131
00:07:54,120 --> 00:08:06,120
And then here's the implementation, which is simply code for the basic method that we outlined in pseudo code.

132
00:08:06,120 --> 00:08:17,000
So our private instance variables are marked or in the demo we used this 2, but just for simplicity let's use marked.

133
00:08:17,000 --> 00:08:23,040
Edge 2 then is how we get to the first vertex and then the source.

134
00:08:23,040 --> 00:08:30,480
And so you have a constructor that builds those arrays same way as before and then calls BFS.

135
00:08:30,480 --> 00:08:33,519
So BFS builds a queue.

136
00:08:33,519 --> 00:08:35,279
That's what it's going to use.

137
00:08:35,279 --> 00:08:38,720
It anchves the source and marks the source.

138
00:08:38,720 --> 00:08:42,639
And then this is just in code what we said in words before.

139
00:08:42,639 --> 00:08:49,879
While the queue is not empty, we pull off the next vertex from the queue, call it V.

140
00:08:49,879 --> 00:09:00,319
For everybody adjacent to V, we go ahead and check if it's marked, we ignore it and move to the next.

141
00:09:00,320 --> 00:09:08,760
If it's not marked, then we put it on the queue, mark it and remember the edge.

142
00:09:08,760 --> 00:09:18,480
And again, this is an example of the power of abstraction and the utility of our design pattern.

143
00:09:18,480 --> 00:09:25,600
All we're doing in terms of graph data type is being a client to go through all the adjacent vertices.

144
00:09:25,600 --> 00:09:33,279
But it allows us to implement this completely different algorithm in really inaccessible way.

145
00:09:33,279 --> 00:09:37,040
So that's the implementation of breadth for search.

146
00:09:37,040 --> 00:09:42,879
And then the client for getting the paths back is going to be same as for depth for search.

147
00:09:42,879 --> 00:09:50,920
So here's an old application of breadth for search in computer networks.

148
00:09:50,920 --> 00:09:52,639
It's very important.

149
00:09:52,639 --> 00:09:57,960
When you're communicating from one place to another, you want to get there in the fewest number of hops.

150
00:09:57,960 --> 00:10:06,279
This is the ARPANET, the predecessor of the internet as of July 1977.

151
00:10:06,279 --> 00:10:09,480
Things were slow and computers were small and slow.

152
00:10:09,480 --> 00:10:12,960
It's important to do these things in small number of hops.

153
00:10:12,960 --> 00:10:20,039
And with breadth for search, you could take this graph and figure out the shortest way to get from one place to another.

154
00:10:20,039 --> 00:10:27,039
That's a typical application of breadth for search.

155
00:10:27,039 --> 00:10:31,039
Here's another one, so-called Kevin Bacon numbers.

156
00:10:31,039 --> 00:10:37,799
Nowadays, actually, you can type bacon in an actor's name and get the answer to this.

157
00:10:37,799 --> 00:10:45,799
So if you're not familiar with it, you can become familiar with it by Kevin Bacon numbers.

158
00:10:45,799 --> 00:10:54,799
The idea is you have a graph where the vertices are actors in the edge.

159
00:10:54,799 --> 00:10:59,799
You think of an edge connecting two actors if they were in a movie together.

160
00:10:59,799 --> 00:11:10,799
And so what you want to find is, given an actor, what's the shortest way to get to Kevin Bacon connected by-

161
00:11:10,799 --> 00:11:17,799
So we have edges for actors and edges for movies in connection if the actor's in the movie.

162
00:11:17,799 --> 00:11:22,799
So Buzz Morrow and Tatina Ramirez were in sweet dreams together.

163
00:11:22,799 --> 00:11:26,799
And these two actors were in this movie together and so forth.

164
00:11:26,799 --> 00:11:31,799
And you get away to Kevin Bacon from any actor.

165
00:11:31,799 --> 00:11:36,799
And this is another pop culture application.

166
00:11:36,799 --> 00:11:43,799
This is so-called six degrees, which you can get to anyone with six steps in this way.

167
00:11:43,799 --> 00:11:50,799
So that's all implementation of breadth for search on the Kevin Bacon graph,

168
00:11:50,799 --> 00:11:55,799
where we include one vertex for each performer, one vertex for each movie,

169
00:11:55,799 --> 00:11:58,799
connect the movie to all forms that appear in the movie,

170
00:11:58,799 --> 00:12:02,799
and the shortest path from Kevin Bacon to every actor.

171
00:12:02,799 --> 00:12:08,799
If you follow through that path, you get to-

172
00:12:08,799 --> 00:12:14,799
you get the proof of the Kevin Bacon number for each actor.

173
00:12:14,799 --> 00:12:18,799
And we have an implementation of that on the book site.

174
00:12:18,799 --> 00:12:20,799
So that's another example.

175
00:12:20,799 --> 00:12:26,799
And actually there's a maybe even older or at least similar age example

176
00:12:26,799 --> 00:12:30,799
that mathematicians are fond of.

177
00:12:30,799 --> 00:12:33,799
And that's called the so-called Airdroche number.

178
00:12:33,799 --> 00:12:36,799
So in this one, it's mathematician.

179
00:12:36,799 --> 00:12:38,799
The nodes are mathematicians.

180
00:12:38,799 --> 00:12:44,799
And there's an edge if the two mathematicians have co-authored a paper.

181
00:12:44,799 --> 00:12:51,799
And Paul Airdroche was a very productive Hungarian mathematician

182
00:12:51,799 --> 00:12:55,799
who traveled the world co-authoring papers with people all over the world.

183
00:12:55,799 --> 00:13:02,799
A very interesting and prolific character who actually did quite a bit of research

184
00:13:02,799 --> 00:13:05,799
on properties of graphs.

185
00:13:05,799 --> 00:13:11,799
And maybe even more so than Kevin Bacon, the idea is he was so prolific

186
00:13:11,799 --> 00:13:17,799
that pretty much every mathematician has a pretty low Airdroche number.

187
00:13:17,799 --> 00:13:22,799
So that's our second example of a graph processing algorithm,

188
00:13:22,799 --> 00:13:25,799
breadth first search.

