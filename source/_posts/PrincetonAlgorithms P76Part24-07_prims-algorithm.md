---
title: PrincetonAlgorithms P76Part24 07_prims Algorithm
---

1
00:00:00,000 --> 00:00:10,380
Next we'll look at another classic algorithm for computing the MST called Prims algorithm.

2
00:00:10,380 --> 00:00:18,120
It's also an extremely simple algorithm to state what we're going to do now is start with

3
00:00:18,120 --> 00:00:24,900
Vertex 0 and we're going to grow the tree one edge at a time always keeping it connected.

4
00:00:24,899 --> 00:00:31,339
The way we're going to do that is add to the tree the minimum weight edge that has exactly

5
00:00:31,339 --> 00:00:34,379
one endpoint in the tree computed so far.

6
00:00:34,379 --> 00:00:39,219
And we'll keep doing that until we've grown the whole V-1 edge tree.

7
00:00:39,219 --> 00:00:42,820
Let's look at a demo to see how that works.

8
00:00:42,820 --> 00:00:47,939
So we start with Vertex 0 and we're supposed to add the min-weight edge that's connected to

9
00:00:47,939 --> 00:00:48,939
0.

10
00:00:48,939 --> 00:00:53,460
So that's 0, 7.

11
00:00:53,460 --> 00:00:57,380
Out of all the edges connected to 0 that's the one of minimum weight.

12
00:00:57,380 --> 00:01:03,140
So now we have one edge two vertices on the tree and so now we want to add the min-weight

13
00:01:03,140 --> 00:01:05,819
edge that connects to the tree.

14
00:01:05,819 --> 00:01:11,859
In this case that's 7-1 out of all the edges that connect to the tree, 1-7 is the shortest

15
00:01:11,859 --> 00:01:13,780
one so that's the one that we add.

16
00:01:13,780 --> 00:01:17,540
So now we have two edges on the tree.

17
00:01:17,540 --> 00:01:23,300
Now the min-weight edge that connects to the tree is 0, 2.

18
00:01:23,300 --> 00:01:25,300
So we add that one.

19
00:01:25,300 --> 00:01:29,020
So now we have three edges four vertices on the tree.

20
00:01:29,020 --> 00:01:34,580
Closest edge, closest vertex to the tree or the smallest edge coming out of the tree is

21
00:01:34,580 --> 00:01:35,580
two-three.

22
00:01:35,580 --> 00:01:37,620
So we add that one.

23
00:01:37,620 --> 00:01:39,820
So now we have three more vertices to go.

24
00:01:39,820 --> 00:01:43,620
And you can see that the next one that's going to come is five.

25
00:01:43,620 --> 00:01:47,620
It's closer to the tree than four or six.

26
00:01:47,620 --> 00:01:49,340
So we do that.

27
00:01:49,340 --> 00:01:50,340
Add five.

28
00:01:50,340 --> 00:01:52,980
Now there's two more.

29
00:01:52,980 --> 00:02:00,420
And so out of all those edges, the closest one to the tree is four-five.

30
00:02:00,420 --> 00:02:03,620
It's a little shorter than four-seven and zero-four.

31
00:02:03,620 --> 00:02:05,900
So that's the one that gets added.

32
00:02:05,900 --> 00:02:10,180
And then finally six gets added to the tree by the shortest edge that connects it to

33
00:02:10,180 --> 00:02:12,819
the tree which is six-two.

34
00:02:12,819 --> 00:02:16,459
So start with vertex zero.

35
00:02:16,459 --> 00:02:18,699
Add an edge at a time to the tree.

36
00:02:18,699 --> 00:02:23,659
It's the shortest edge that goes from a tree vertex to a non-tree vertex.

37
00:02:23,659 --> 00:02:25,419
That's prims algorithm.

38
00:02:25,419 --> 00:02:30,979
Now let's look at prims algorithm running on the same huge graph that we went for cross-gross

39
00:02:30,979 --> 00:02:32,299
scales.

40
00:02:32,299 --> 00:02:39,419
This also is a fascinating dynamic process.

41
00:02:39,419 --> 00:02:46,219
Actually the new edge is close to the last edge added but every once in a while it gets

42
00:02:46,219 --> 00:02:47,219
stuck.

43
00:02:47,219 --> 00:02:52,259
And so jumps to a new place to add edges to the MST.

44
00:02:52,259 --> 00:02:55,779
This algorithm is a little bit easier to follow.

45
00:02:55,779 --> 00:03:03,459
But it's a very interesting dynamic process.

46
00:03:03,459 --> 00:03:08,099
You can see that when it's easy, it just sticks where it was.

47
00:03:08,099 --> 00:03:13,500
When it runs into some long edges, it gets stuck and tries somewhere else.

48
00:03:13,500 --> 00:03:18,659
Always adding to the tree the shortest edge that connects a non-tree vertex to a tree

49
00:03:18,659 --> 00:03:21,259
vertex.

50
00:03:21,259 --> 00:03:27,780
And you can see the last few things to be added where the vertices in the upper left corner.

51
00:03:27,780 --> 00:03:31,780
That's a visualization of prims algorithm, completely different character but it comes

52
00:03:31,780 --> 00:03:38,780
out to the same tree as cross-grossalism as long as the edge weights are distinct.

53
00:03:38,780 --> 00:03:42,979
So we need to prove prims algorithm correct.

54
00:03:42,979 --> 00:03:53,340
And this one has been rediscovered a few times depending on how you cast the data structure

55
00:03:53,340 --> 00:03:56,259
for implementing, finding the minimum.

56
00:03:56,259 --> 00:04:02,419
But the basic algorithm has been known since at least 1930 and it's a proof that it

57
00:04:02,419 --> 00:04:09,379
computes the MST again comes because it's a special case of the greedy MST algorithm.

58
00:04:09,379 --> 00:04:18,339
So let's suppose that E is the men-want weight edge connecting a vertex on the tree to a vertex

59
00:04:18,339 --> 00:04:20,300
not on the tree.

60
00:04:20,300 --> 00:04:28,020
Well you take as you cut the tree vertices, there's no black crossing edge from the tree

61
00:04:28,020 --> 00:04:30,300
vertices to non-tree vertex.

62
00:04:30,300 --> 00:04:33,900
That's the definition, it's not on the tree.

63
00:04:33,900 --> 00:04:40,220
And there's no crossing edge of low weight because that's the minimum one that's we picked

64
00:04:40,220 --> 00:04:41,220
by design.

65
00:04:41,220 --> 00:04:46,220
So it's a special case of the greedy algorithm where you take as the cut the set of vertices

66
00:04:46,220 --> 00:04:47,819
currently on the tree.

67
00:04:47,819 --> 00:04:50,019
That's prims algorithm.

68
00:04:50,019 --> 00:04:54,019
Now how are we going to implement prims algorithm?

69
00:04:54,019 --> 00:04:59,219
How are we going to find the minimum weight edge with exactly one point in T?

70
00:04:59,219 --> 00:05:06,219
Well one thing that we could do is just try all the edges and maybe some early implementations

71
00:05:06,219 --> 00:05:08,620
that would do that.

72
00:05:08,620 --> 00:05:13,579
But what we're going to do is use a modern data structure, a priority queue.

73
00:05:13,579 --> 00:05:20,539
So we're going to keep the edges on a priority queue, have exactly one end point in T and

74
00:05:20,539 --> 00:05:24,339
then we can just pick out the minimum weight one.

75
00:05:24,339 --> 00:05:27,699
That's the so-called lazy implementation of prims algorithm.

76
00:05:27,699 --> 00:05:32,139
We'll look at another one called the eager implementation afterwards.

77
00:05:32,139 --> 00:05:36,939
So what we need to do is find the minimum weight edge with exactly one end point in the

78
00:05:36,939 --> 00:05:37,939
tree.

79
00:05:38,019 --> 00:05:43,899
So the solution is to make a priority queue of the edges that have at least one end point

80
00:05:43,899 --> 00:05:45,459
in the tree.

81
00:05:45,459 --> 00:05:50,980
And then we're using as priority the keys the edge and the priorities the weight of the

82
00:05:50,980 --> 00:05:52,620
edge.

83
00:05:52,620 --> 00:06:00,379
And so we're going to use delete min to find the next edge to add to the tree.

84
00:06:00,379 --> 00:06:08,219
And then we have to update the priority queue when we consider that edge.

85
00:06:08,219 --> 00:06:13,819
Now there's going to be some edges on the priority queue that are obsolete and we've already

86
00:06:13,819 --> 00:06:16,259
found better ways to connect them.

87
00:06:16,259 --> 00:06:22,980
So we'll just disregard an edge that has both end points in the tree.

88
00:06:22,980 --> 00:06:27,139
We've already found a way to connect them.

89
00:06:27,139 --> 00:06:32,459
We don't need that edge for the minimum spanning tree.

90
00:06:32,459 --> 00:06:34,860
That's why it's called a lazy implementation.

91
00:06:34,860 --> 00:06:39,899
We allow stuff to be on the priority queue that we know is obsolete.

92
00:06:39,899 --> 00:06:44,579
And then when we pull it off the queue we test whether it belongs in the tree or not.

93
00:06:44,579 --> 00:06:50,979
But then the key step in the algorithm is to assume what do you do when you get a new

94
00:06:50,979 --> 00:06:54,500
vertex for the minimum spanning tree in a new edge.

95
00:06:54,500 --> 00:06:58,420
So that means that one of the vertices is on the tree.

96
00:06:58,420 --> 00:07:01,540
Let's say that's v and the other one is not on the tree.

97
00:07:01,540 --> 00:07:03,180
That means w.

98
00:07:03,180 --> 00:07:06,819
And so what we want to do is add w to the tree.

99
00:07:06,819 --> 00:07:12,899
But then we also want to add to the priority queue any edge that's incident to w.

100
00:07:12,899 --> 00:07:17,660
So that's got the possibility as long as this other end point is not in the tree.

101
00:07:17,660 --> 00:07:24,380
So those edges have the possibility of being minimum spanning tree edges in the future

102
00:07:24,380 --> 00:07:30,900
unless some better way to connect their incident vertex to the tree is found before they come

103
00:07:30,900 --> 00:07:32,500
off the queue.

104
00:07:32,500 --> 00:07:36,580
That's the algorithm, the lazy solution of prims algorithm.

105
00:07:36,580 --> 00:07:38,820
So let's take a demo of that.

106
00:07:38,820 --> 00:07:43,300
So what we're going to do is start with a vertex and really grow the tree.

107
00:07:43,300 --> 00:07:47,580
Add to the T the min-weight edge with exactly one endpoint in the tree.

108
00:07:47,579 --> 00:07:49,419
That's prims algorithm.

109
00:07:49,419 --> 00:07:55,139
But now we're going to show the data structure of the priority queue that allows us to do this

110
00:07:55,139 --> 00:08:00,579
by keeping all the edges that we know about the connect that possibly could be that edge

111
00:08:00,579 --> 00:08:02,860
on a priority queue.

112
00:08:02,860 --> 00:08:06,659
So let's look at what happens for our sample graph.

113
00:08:06,659 --> 00:08:08,139
So we start it vertex zero.

114
00:08:08,139 --> 00:08:09,779
That's fine.

115
00:08:09,779 --> 00:08:16,219
Now we're going to add that to the tree, vertex zero to the tree.

116
00:08:16,220 --> 00:08:21,580
We're going to put on the priority queue all the edges that are incident to zero.

117
00:08:21,580 --> 00:08:27,260
And just for the demo, we'll just show the edges sorted by weight with the understanding

118
00:08:27,260 --> 00:08:32,060
that we have a heap data structure or something under there to give us the smallest one.

119
00:08:32,060 --> 00:08:36,220
But for the demo, it's easiest to see them sorted by weight.

120
00:08:36,220 --> 00:08:37,220
Okay.

121
00:08:37,220 --> 00:08:43,899
So then to greenly grow the tree, we have to pick zero seven off the priority queue.

122
00:08:43,899 --> 00:08:49,419
So we'll show that one on the MST.

123
00:08:49,419 --> 00:08:57,419
And then the vertex that's not on the tree at that point is seven.

124
00:08:57,419 --> 00:09:01,059
So we're going to add seven to the tree.

125
00:09:01,059 --> 00:09:04,259
So first we add zero seven to be an MST edge.

126
00:09:04,259 --> 00:09:09,939
And then we add to the priority queue all the edges that are incident to seven.

127
00:09:09,940 --> 00:09:17,780
That all the edges incident to seven that point to places the vertices that are not on the tree

128
00:09:17,780 --> 00:09:19,620
that are connected to vertices that are not on the tree.

129
00:09:19,620 --> 00:09:23,940
So we don't put zero seven back on because zero is already on the tree.

130
00:09:23,940 --> 00:09:32,540
So we put all those on the priority queue and again keep them sorted by weight.

131
00:09:32,540 --> 00:09:36,100
So now let's continue.

132
00:09:36,100 --> 00:09:38,180
So smallest thing is one seven.

133
00:09:38,180 --> 00:09:46,820
That's the smallest edge from a tree edge to a non-tree edge.

134
00:09:46,820 --> 00:09:52,180
And so that's the delete one seven from the priority queue and add it to the MST.

135
00:09:52,180 --> 00:09:54,019
So we do that.

136
00:09:54,019 --> 00:09:55,740
And now that takes us to one.

137
00:09:55,740 --> 00:10:05,259
And so now we have to add to the priority queue all the edges that connect one to non-tree edges.

138
00:10:05,259 --> 00:10:09,460
So that's what the asteris are, the new edges on the priority queue.

139
00:10:09,460 --> 00:10:12,700
And again we keep them sorted by weight.

140
00:10:12,700 --> 00:10:19,460
So now what we want on the priority queue is a subset of the,

141
00:10:19,460 --> 00:10:24,379
I want to be sure that every edge that connects a tree edge to a non-tree edge is on the priority queue.

142
00:10:24,379 --> 00:10:29,259
We might have a few others as well and we'll see that in a second.

143
00:10:29,259 --> 00:10:30,899
So now zero twos is the smallest.

144
00:10:30,899 --> 00:10:35,220
So we take zero two and add it to the MST.

145
00:10:35,220 --> 00:10:44,899
So notice now that once we add two to the MST, this edge between one and two becomes obsolete.

146
00:10:44,899 --> 00:10:47,379
It's never going to be added to the MST.

147
00:10:47,379 --> 00:10:50,860
At the time that we put one on we thought maybe that was a good way to get to two.

148
00:10:50,860 --> 00:10:53,379
But now we know there's a better way to get the two.

149
00:10:53,379 --> 00:10:56,620
So that edge becomes obsolete.

150
00:10:56,620 --> 00:11:01,139
And the lazy implementation just leaves that edge on the priority queue.

151
00:11:01,139 --> 00:11:02,379
So now let's continue.

152
00:11:05,580 --> 00:11:11,779
So we added two to the zero two to the MST.

153
00:11:11,779 --> 00:11:15,740
And we have to add everybody incident to two.

154
00:11:15,740 --> 00:11:20,019
That is not on the tree to the priority queue.

155
00:11:20,019 --> 00:11:22,620
So in this case it's two, three and six, two.

156
00:11:22,620 --> 00:11:26,940
We don't have to add one, two and two, seven because they go to three edges.

157
00:11:26,940 --> 00:11:28,220
We don't add them back on.

158
00:11:30,179 --> 00:11:33,220
Okay, so now the smallest is two, three.

159
00:11:33,220 --> 00:11:41,019
So take that, add it to the MST and add all the edges incident to three to non-tree vertices.

160
00:11:41,019 --> 00:11:44,139
In this case it's just three, six.

161
00:11:44,139 --> 00:11:45,620
And that's a long one.

162
00:11:45,620 --> 00:11:50,259
So now the next edge for the MST is five, seven.

163
00:11:50,259 --> 00:11:53,819
Take that off the priority queue, put on the MST.

164
00:11:53,819 --> 00:12:01,019
And so now all edges incident to five that go to non-tree vertices.

165
00:12:01,019 --> 00:12:03,100
So it's just five, four, add that one.

166
00:12:04,580 --> 00:12:10,019
So now the next edge that will come off the priority queue is one, three.

167
00:12:10,019 --> 00:12:11,419
But that's an obsolete edge.

168
00:12:11,419 --> 00:12:17,299
We already have one, three connected in the MST because we were lazy.

169
00:12:17,299 --> 00:12:19,620
We left that one on the priority queue.

170
00:12:19,620 --> 00:12:25,980
So now we just pull it off and discard it because it connects two tree vertices.

171
00:12:25,980 --> 00:12:31,620
And same with one five, that connects two tree vertices where we already have a better way to connect them.

172
00:12:31,620 --> 00:12:34,060
Two, seven connects two tree vertices.

173
00:12:34,060 --> 00:12:36,379
And finally we get to four, five.

174
00:12:36,379 --> 00:12:41,139
Four, five now gets deleted from the priority queue and added to the MST.

175
00:12:42,139 --> 00:12:46,940
Everybody connected to four, that's just six and that's a long one goes on.

176
00:12:46,940 --> 00:12:51,100
Now we have some obsolete edges when we get to that one two.

177
00:12:51,100 --> 00:12:55,860
And then four, seven is obsolete and zero, four is obsolete.

178
00:12:55,860 --> 00:13:00,580
And finally the last edge to get added to the MST is six two.

179
00:13:00,580 --> 00:13:06,660
And after deleting six two from the priority queue and adding the MST,

180
00:13:06,660 --> 00:13:09,460
we have computed the MST.

181
00:13:09,460 --> 00:13:12,420
We have the minus one edges on v vertices.

182
00:13:12,419 --> 00:13:18,299
And that's implementation of the lazy version of Prims algorithm.

183
00:13:18,299 --> 00:13:24,699
And it's just a version of Prims algorithm what we showed was the underlying data structure,

184
00:13:24,699 --> 00:13:34,179
the priority queue, that ensures that we always get the shortest edge connecting a tree vertex to a non-tree vertex.

185
00:13:34,179 --> 00:13:37,379
So let's look at the code for Prims algorithm.

186
00:13:37,379 --> 00:13:50,139
Again, the data structures that we build up in part one of this course give us a very compact implementation of this MST algorithm.

187
00:13:50,139 --> 00:13:55,139
So we're going to need three instance variables.

188
00:13:55,139 --> 00:14:04,139
One is a existence array, vertex indexed array of bullions that for each vertex,

189
00:14:04,139 --> 00:14:07,699
we'll tell us whether or not it's on the MST.

190
00:14:07,699 --> 00:14:18,500
Then we have the list of edges on the MST that is going to be returned to the client after the MST is computed for iterable.

191
00:14:18,500 --> 00:14:26,059
And then we'll have the priority queue of edges that connect tree vertices with non-tree vertices.

192
00:14:26,059 --> 00:14:30,179
As a superset of the edges, it connect tree vertices and non-tree vertices.

193
00:14:30,179 --> 00:14:39,459
So given a graph, we'll build the priority queue, we'll initialize all the data structures.

194
00:14:39,459 --> 00:14:48,779
And then we'll show what the visit routine does.

195
00:14:48,779 --> 00:14:53,779
That's the one that processes each vertex when it gets added to the tree.

196
00:14:53,779 --> 00:14:56,259
We'll look at that in the next slide.

197
00:14:56,259 --> 00:15:05,779
So the main loop is while the priority queue is not empty, we pull off the minimum edge from the priority queue.

198
00:15:05,779 --> 00:15:09,100
We get its constituent vertices.

199
00:15:09,100 --> 00:15:12,819
If they're both marked, then we just ignore it.

200
00:15:12,819 --> 00:15:15,860
They're already on the MST.

201
00:15:15,860 --> 00:15:24,819
Otherwise, we put the edge on the MST in whichever vertex was not on the tree.

202
00:15:24,820 --> 00:15:27,220
We visit and put on the tree.

203
00:15:27,220 --> 00:15:36,620
And the visit routine is the one that puts the vertex on the tree and puts all its incident edges onto the priority queue.

204
00:15:36,620 --> 00:15:44,820
So to visit a vertex, we set its entry, corresponding entry in the marked array to be true.

205
00:15:44,820 --> 00:15:47,620
So it's added to the tree.

206
00:15:47,620 --> 00:15:59,179
And then for every edge that's adjacent to that, we're going to, if its other edge is not marked, we're going to put it on the priority queue.

207
00:15:59,179 --> 00:16:04,860
So if it's an edge that goes from a tree vertex to a non-tree vertex, we'll put it on the priority queue.

208
00:16:04,860 --> 00:16:14,500
And then we have the client query method to get the MST once the MST is built.

209
00:16:14,500 --> 00:16:24,899
Again, the data structures that we've used give a very compact and complete implementation of Prims algorithm.

210
00:16:24,899 --> 00:16:27,179
What's the running time of the algorithm?

211
00:16:27,179 --> 00:16:34,580
Well, it's correct because it implements Prims algorithm as we showed.

212
00:16:34,580 --> 00:16:36,700
It's an instance of the greedy algorithm.

213
00:16:36,700 --> 00:16:44,860
And it's easy to see that the running time is always going to be proportional to E log E in the worst case.

214
00:16:44,860 --> 00:16:54,540
And that's because you could put all the edges on the priority queue.

215
00:16:54,540 --> 00:16:59,180
So every edge might, might have to month the priority queue.

216
00:16:59,180 --> 00:17:06,660
So that's E times and then the cost would be proportional to E for inserting and deleting every edge off the path.

217
00:17:06,660 --> 00:17:09,100
So the priority queue.

218
00:17:09,100 --> 00:17:17,060
So E log E is a fine running time.

219
00:17:17,060 --> 00:17:26,660
The extra space proportional to E is, you know, might be considered annoying or elegant or inefficient.

220
00:17:26,660 --> 00:17:33,940
So there's a more efficient version of Prims algorithm where we clear off that dead weight on the priority queue.

221
00:17:33,940 --> 00:17:39,660
And that's the eager implementation of Prims algorithm that we'll look at next.

222
00:17:39,660 --> 00:17:47,220
In practice, the lazy implementation works pretty well, but the eager implementation is also a very elegant and efficient algorithm.

223
00:17:47,220 --> 00:17:50,299
And it's worth learning both.

224
00:17:50,299 --> 00:17:57,380
So for the eager solution, what we're going to do is the priority queue is going to have vertices.

225
00:17:57,380 --> 00:18:02,340
And it's going to have at most one entry per vertex.

226
00:18:02,339 --> 00:18:09,779
And so those are the vertices that are not on the tree, but are connected by an edge to the tree.

227
00:18:09,779 --> 00:18:18,539
And the priority of a given vertex is going to be the weight of the shortest edge connecting that vertex to the tree.

228
00:18:18,539 --> 00:18:24,459
So if we look at this little example here,

229
00:18:24,460 --> 00:18:29,340
where we've built the tree for 0, 7 and 1,

230
00:18:29,340 --> 00:18:39,860
then the black entries in this are the edges that are on the MST.

231
00:18:39,860 --> 00:18:42,940
So that's 0, 7 and 1, 7.

232
00:18:42,940 --> 00:18:53,819
And the red ones are the ones that are on the priority queue because they're connected by an edge to some vertex that's on the tree.

233
00:18:53,819 --> 00:19:03,659
And for each one of them, there's a particular edge that's the shortest that connects that vertex to the tree.

234
00:19:03,659 --> 00:19:08,619
And so that's the key for the priority queue.

235
00:19:08,619 --> 00:19:15,339
So that's what we're going to want for at any time during the execution of the algorithm.

236
00:19:15,339 --> 00:19:19,379
We're going to want the vertices that are connected to the tree by one vertex.

237
00:19:19,380 --> 00:19:24,060
And we're going to know the shortest edge connecting that vertex to the tree.

238
00:19:24,060 --> 00:19:29,180
So then the algorithm is, again, delete the minimum vertex.

239
00:19:29,180 --> 00:19:32,020
And it's got an associated edge that connects it to the tree.

240
00:19:32,020 --> 00:19:34,460
And we put that one on the tree.

241
00:19:34,460 --> 00:19:38,460
And then we have to update the priority queue.

242
00:19:38,460 --> 00:19:41,220
So what do we have to update the priority queue?

243
00:19:41,220 --> 00:19:44,260
So we have this vertex that's not on the tree.

244
00:19:44,259 --> 00:19:49,339
We consider all the edges that are incident to that vertex.

245
00:19:49,339 --> 00:19:53,420
If they point to a tree vertex, then we're going to ignore it.

246
00:19:53,420 --> 00:19:55,460
There's no problem.

247
00:19:55,460 --> 00:20:01,660
If it's not already on the priority queue, we're going to put that new vertex on the priority queue.

248
00:20:01,660 --> 00:20:06,740
And then the other thing is, if the vertex is on the priority queue,

249
00:20:06,740 --> 00:20:09,579
and we just found a shorter way to get to it,

250
00:20:09,579 --> 00:20:15,619
then we're going to have to decrease the priority of that vertex.

251
00:20:15,619 --> 00:20:19,740
So let's look at how that works in a demo.

252
00:20:19,740 --> 00:20:23,699
So again, it's just an implementation of prim's algorithm.

253
00:20:23,699 --> 00:20:28,500
It's just how do we get the min-weight edge that connects to the tree.

254
00:20:28,500 --> 00:20:31,699
And this is a more efficient way to do it.

255
00:20:31,699 --> 00:20:34,500
So again, we start out with our graph.

256
00:20:34,500 --> 00:20:36,980
Start at zero.

257
00:20:36,980 --> 00:20:38,899
And let's get going.

258
00:20:38,900 --> 00:20:43,980
So now the priority queue has vertices.

259
00:20:43,980 --> 00:20:48,740
And so there's four vertices that are just one edge away from the tree.

260
00:20:48,740 --> 00:20:55,220
And we keep them on the priority queue in order of their distance to the tree.

261
00:20:55,220 --> 00:21:00,019
And we also keep the edge two vertex index arrays.

262
00:21:00,019 --> 00:21:06,380
One is the edge that takes us to the tree, and the other is the length of that edge.

263
00:21:06,380 --> 00:21:12,020
And again, we'll keep them sorted on the priority queue just to make the demo easier to follow.

264
00:21:12,020 --> 00:21:16,220
So the next vertex to go to the tree is seven.

265
00:21:16,220 --> 00:21:22,300
The next edge to get added to the tree is edge two of seven.

266
00:21:22,300 --> 00:21:25,980
And then we go from there.

267
00:21:25,980 --> 00:21:27,340
So that's the smallest one.

268
00:21:27,340 --> 00:21:29,620
We take that for the tree.

269
00:21:29,620 --> 00:21:32,340
And now we have to update the priority queue.

270
00:21:32,340 --> 00:21:34,540
So how do we update the priority queue?

271
00:21:34,539 --> 00:21:39,339
Well, we have to look at everybody incident to seven.

272
00:21:39,339 --> 00:21:45,740
And so let's look at, for example, seven two.

273
00:21:45,740 --> 00:21:51,819
We don't need to put seven two on the priority queue since we already have a better way to connect two to the tree.

274
00:21:51,819 --> 00:21:52,740
That's two zero.

275
00:21:52,740 --> 00:21:55,019
So we don't have to change anything.

276
00:21:55,019 --> 00:21:58,259
Same with seven four.

277
00:21:58,259 --> 00:22:03,139
And about seven five and seven one, one and five are not on the priority queue.

278
00:22:03,140 --> 00:22:12,740
So we have to put them on the priority queue and then save the edges and length that get them to seven, which will get them to the tree.

279
00:22:12,740 --> 00:22:16,540
So now on our priority queue, we have our current tree.

280
00:22:16,540 --> 00:22:25,220
And we have all vertices that were within one edge of the tree and the edge that gets them to the tree and their length.

281
00:22:25,220 --> 00:22:28,460
So we're ready for another step of the algorithm.

282
00:22:28,460 --> 00:22:36,980
So now one seven is the smallest thing in the priority queue.

283
00:22:36,980 --> 00:22:41,740
And so we put that on the MST.

284
00:22:41,740 --> 00:22:46,700
And now we look at everybody connected to one.

285
00:22:46,700 --> 00:22:53,259
And again, once one seven, we can throw it because it's on a tree.

286
00:22:53,259 --> 00:22:57,380
One five, we don't need because we have a shorter way to get to the tree.

287
00:22:57,380 --> 00:22:58,860
But we haven't seen three yet.

288
00:22:58,860 --> 00:23:05,820
So we add vertex three to the priority queue and say we get to the tree by one, one three distance point two nine.

289
00:23:05,820 --> 00:23:14,300
Every all the vertices within one edge of the tree and the edge and the length of the shortest edge that gets to the tree from that vertex.

290
00:23:14,300 --> 00:23:17,860
That's what we're maintaining at every step.

291
00:23:17,860 --> 00:23:22,860
Okay, so next vertex to come to the tree is two.

292
00:23:22,859 --> 00:23:29,859
And so we put that on the tree and now we look at everybody that connected the two.

293
00:23:29,859 --> 00:23:34,859
So now we have our first example of decreased key.

294
00:23:34,859 --> 00:23:38,859
But let's check them all.

295
00:23:38,859 --> 00:23:42,859
So two zero, two seven and two one.

296
00:23:42,859 --> 00:23:47,859
Take us two vertices that are already on the tree.

297
00:23:47,859 --> 00:23:51,859
So it's two three and two six.

298
00:23:51,859 --> 00:23:59,859
So what we need to do for three, we have thought that the best way to get to the tree from three was to go to one.

299
00:23:59,859 --> 00:24:05,859
But adding this new edge two means we now know a better way to get from three to the tree.

300
00:24:05,859 --> 00:24:10,859
So we have to update the priority, update the edge two and the priority.

301
00:24:10,859 --> 00:24:13,859
We have to decrease the key of the priority.

302
00:24:13,859 --> 00:24:18,859
So that's an operation that we're going to need from our priority queue.

303
00:24:18,859 --> 00:24:23,859
And it's something that has to be factored into our priority queue implementation.

304
00:24:23,859 --> 00:24:26,859
And the same thing for six.

305
00:24:26,859 --> 00:24:31,859
We thought we had a good way to get to the tree from zero, but two brings six closer to the tree.

306
00:24:31,859 --> 00:24:37,859
So we have to update that information and say now the best way to get from six to the tree is six two.

307
00:24:37,859 --> 00:24:40,859
And that it's linked. We have to decrease the key.

308
00:24:40,859 --> 00:24:48,859
And this definitely involves some reshuffling in the priority queue in our implementation is going to take that into account.

309
00:24:48,859 --> 00:24:52,859
So with those changes, now we have the following situation.

310
00:24:52,859 --> 00:24:58,859
And we've got four edges on the tree.

311
00:24:58,859 --> 00:25:02,859
Three edges on the tree. Now we're going to add the fourth, which is two three.

312
00:25:02,859 --> 00:25:05,859
That's the smallest thing on the priority queue.

313
00:25:05,859 --> 00:25:08,859
So we had two three to the MST.

314
00:25:08,859 --> 00:25:13,859
And now we have to go to the things connected to three.

315
00:25:13,859 --> 00:25:17,859
And well, there's nothing to add since we already have a better way to six.

316
00:25:17,859 --> 00:25:20,859
So next one that gets added is five seven.

317
00:25:20,859 --> 00:25:22,859
And check.

318
00:25:22,859 --> 00:25:26,859
So edges from five seven.

319
00:25:26,859 --> 00:25:30,859
So we have to add two.

320
00:25:30,859 --> 00:25:42,859
We, from five, we're going to decrease the key of four from point three eight to point five.

321
00:25:42,859 --> 00:25:48,859
Because the best way to get from four to the tree is no longer four zero.

322
00:25:48,859 --> 00:25:50,859
It's four five.

323
00:25:50,859 --> 00:25:56,859
So again, decrease the key and discard the longer edge to the tree.

324
00:25:56,859 --> 00:25:59,859
And in fact, that's the next edge that we pick.

325
00:25:59,859 --> 00:26:06,859
And we don't bother putting four six on because we already have a better way to get from six to the tree.

326
00:26:06,859 --> 00:26:09,859
And then the last edge that we had is six two.

327
00:26:09,859 --> 00:26:17,859
So again, it's the eager version of Prams algorithm is an implementation that always connects to the tree.

328
00:26:17,859 --> 00:26:20,859
The vertex that's closest to the tree.

329
00:26:20,859 --> 00:26:33,859
But we use a more efficient data structure to do it that can only have one at most one entry per vertex, as opposed to one entry per edge.

330
00:26:33,859 --> 00:26:36,859
So that's the eager version of Prams algorithm.

331
00:26:36,859 --> 00:26:44,859
Okay, rather than focus on the code for the eager version, which is quite similar to the code for the lazy version,

332
00:26:44,859 --> 00:26:51,859
we're going to talk briefly about the key data structure that we need to implement this.

333
00:26:51,859 --> 00:26:58,859
And it's an implementation of the priority queue that allows us to decrease keys.

334
00:26:58,859 --> 00:27:10,859
And so this is an advanced version of the priority queue that we talked about in part one of the course, but it's necessary for algorithms like this.

335
00:27:10,859 --> 00:27:26,859
So what we're going to do is the problem is that we have keys that the priority queue algorithm doesn't really needs to know when we change values of keys.

336
00:27:26,859 --> 00:27:30,859
And so we have to do that through the API.

337
00:27:30,859 --> 00:27:40,859
And so what we're going to do is allow the client to change the key by specifying the index and the new key.

338
00:27:40,859 --> 00:27:48,859
And then the implementation will take care of changing the value and updating its data structures to reflect the change values.

339
00:27:48,859 --> 00:27:56,859
You can't have the client changing values without informing the implementation, the priority queue implementation.

340
00:27:56,859 --> 00:28:00,859
That's the basic challenge for this data structure.

341
00:28:00,859 --> 00:28:24,859
So since we are working with vertex indexed arrays and graphs and the priority queue implementation might do the same, we'll just associate an index kind of past that idea on to the priority queue to make it allow it to implement these operations efficiently.

342
00:28:24,859 --> 00:28:34,859
So the constructor gets to know how many indices or how many keys there are going to be at most ever in the priority queue.

343
00:28:34,859 --> 00:28:42,859
And so it can make use of that to implement efficient data structures for the operations.

344
00:28:42,859 --> 00:28:54,859
And so in search, just associates a key with a given index. Decrease key allows to decrease the key associated with a given index.

345
00:28:54,859 --> 00:29:02,859
We can check whether that's a bug should be intk is an index on the priority queue.

346
00:29:02,859 --> 00:29:10,859
We can remove a minimal key and give its associated index and check whether it's empty and get the size.

347
00:29:10,859 --> 00:29:23,859
It's pretty much a topic for part one of the course, but we'll give just one slide here to show how these indices kind of help things go around.

348
00:29:23,859 --> 00:29:30,859
We're basically going to use the same code, the heat based implementation of minpq.

349
00:29:30,859 --> 00:29:38,859
We'll keep parallel arrays that allow us to access quickly all the information that we need.

350
00:29:38,859 --> 00:29:49,859
So things on the queue are accessed by index. And so we'll keep the values in keys. So that's where the keys are.

351
00:29:49,859 --> 00:29:57,859
So pq of i will give the index of the key that's in heap position i and qpi is the heap position of the key with index i.

352
00:29:57,859 --> 00:30:18,859
So that is the information that you need when the client changes of value, you need to get to the, you have to actually first of all change the value, but then you may need to adjust the heap to reflect the changed value.

353
00:30:18,859 --> 00:30:27,859
So instead of a swim with an index, we use the, we get the heap position of the given index and so forth.

354
00:30:27,859 --> 00:30:47,859
So if you look in the book, you'll see the code for index priority queue and it's definitely a confusing, confusing topic for a lecture, but it's important to realize that it's possible to implement this decreased key operation in log rune time without ever having to search through everything for anything.

355
00:30:47,859 --> 00:31:05,859
Using the idea of indexing. So with that change, we get for all the operations, we get time proportional to log v and what do we have to do for the eager version of prims algorithm.

356
00:31:05,859 --> 00:31:16,859
We have to, might have to insert every vertex once and delete min every vertex one and we might do as many as e decrease key operations.

357
00:31:16,859 --> 00:31:30,859
So that gives us a total running time of e log v, but the main thing is that the amount of space for the priority queue is only v not e and that can make a difference for a huge graph.

358
00:31:30,859 --> 00:31:48,859
So there are modifications that you can make to this to give a more efficient running time. For example, one easy thing to do is to use since the operation we're performing most often is the decrease key.

359
00:31:48,859 --> 00:32:05,859
If we use a multi-way heap, like say a four-way heap or in general a d-way heap, then that reduces the cost of that operation and it slightly increases the cost for insert and delete min, but there's not many of those.

360
00:32:05,859 --> 00:32:17,859
So we can get the running time to log base e over v of v and that if you do the math for various types of graphs, that's going to be faster.

361
00:32:17,859 --> 00:32:35,859
And in fact, a data structure called the Fibonacci heap was invented in the 80s that actually gets the running time down to e plus v log v, although that data structure is too complicated to actually use in practice.

362
00:32:35,859 --> 00:32:55,859
If you have a dense graph, then you wouldn't even use a heap, you just use an array and find the minimum by going through everything since every vertex has lots of connected vertices. So we didn't consider that one because the huge graphs that we find in practice are sparse and binary heap is going to be much faster.

363
00:32:55,859 --> 00:33:07,859
And if you really have a performance critical situation, it's worthwhile to do a four-way heap. That's the basic bottom line in the running time of Prem's algorithm.

