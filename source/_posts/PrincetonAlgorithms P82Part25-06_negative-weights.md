---
title: PrincetonAlgorithms P82Part25 06_negative Weights
---

1
00:00:00,000 --> 00:00:10,720
So finally, we're going to take a look at the implications of having negative weights in

2
00:00:10,720 --> 00:00:14,880
directed weighted graphs.

3
00:00:14,880 --> 00:00:21,000
So the first thing to notice is that the easy solutions don't work at all.

4
00:00:21,000 --> 00:00:25,679
Dijkstra's algorithm just doesn't work in the presence of negative weights.

5
00:00:25,679 --> 00:00:31,000
So say this weight from 2 to 3 is minus 9.

6
00:00:31,000 --> 00:00:38,519
What Dijkstra's algorithm will do is just immediately select vertex 3 and never revisit

7
00:00:38,519 --> 00:00:44,760
that decision saying the shortest way to get from 0 to 3 is to take this edge 0, 3, which

8
00:00:44,760 --> 00:00:46,399
has weight 2.

9
00:00:46,399 --> 00:00:52,719
But the actual shortest path goes over to 4 and then over to 1 and down to 2 for a way to

10
00:00:52,719 --> 00:00:55,000
10 and then the minus 9 makes it 1.

11
00:00:55,000 --> 00:01:02,159
So there's a way to get from 0 to 3 with a path weight just 1 because of the minus 9.

12
00:01:02,159 --> 00:01:05,200
But Dijkstra's algorithm won't find that.

13
00:01:05,200 --> 00:01:06,560
So that's not going to work.

14
00:01:06,560 --> 00:01:12,400
And you might think, well, why don't we just make all the weights positive by adding 9 to

15
00:01:12,400 --> 00:01:14,400
everything?

16
00:01:14,400 --> 00:01:20,359
Well, that's not going to work because a longer path will have 9 added to it a lot of time.

17
00:01:20,359 --> 00:01:26,560
So it's just not any relation between shortest paths in this graph and shortest paths in

18
00:01:26,560 --> 00:01:28,400
that graph.

19
00:01:28,400 --> 00:01:37,319
So those easy attempts just don't work for dealing with negative weights in general graphs.

20
00:01:37,319 --> 00:01:41,879
So the conclusion is we need some different algorithm.

21
00:01:41,879 --> 00:01:45,519
In the topological sort one isn't going to work because the graph might have a cycle in

22
00:01:45,519 --> 00:01:46,519
it.

23
00:01:46,519 --> 00:01:48,799
So there's no topological sort.

24
00:01:48,799 --> 00:01:51,679
So we need some different algorithm.

25
00:01:51,679 --> 00:02:01,319
And the main thing to think about in terms of weighted, directed graphs that might have cycles

26
00:02:01,319 --> 00:02:06,359
is that you can have this situation called a negative cycle.

27
00:02:06,359 --> 00:02:08,439
This is a graph that all looks fine.

28
00:02:08,439 --> 00:02:17,840
It's just got this one negative edge from 5 to 4 of weight minus 0.66.

29
00:02:17,840 --> 00:02:22,599
And these other ones are point three assemblies to 8 to this plus 0.65.

30
00:02:22,599 --> 00:02:35,240
But if you go from 5 to 4 to 7 to 5, then the distance around that is minus 0.01.

31
00:02:35,240 --> 00:02:41,920
And if we're trying to find, say, a shortest path from 0 to 6, well, as soon as you hit this

32
00:02:41,920 --> 00:02:47,680
cycle, if you really want the shortest path, what you could do is spin around this, well,

33
00:02:47,680 --> 00:02:49,480
an infinite number of times.

34
00:02:49,480 --> 00:02:53,159
You can make the path as short as you want if you hit an infinite, if you hit a negative

35
00:02:53,159 --> 00:02:54,640
cycle.

36
00:02:54,640 --> 00:03:05,640
So negative cycles definitely can get in a way of trying to solve the shortest path problem.

37
00:03:05,640 --> 00:03:10,000
It may get somewhat ill-specified.

38
00:03:10,000 --> 00:03:17,520
So the first thing is if there's no negative cycles, then there's a shortest path

39
00:03:17,520 --> 00:03:18,520
tree.

40
00:03:18,520 --> 00:03:21,680
And if there's a shortest path tree, there's no negative cycles.

41
00:03:21,680 --> 00:03:25,680
Assuming that you can actually get to the vertices.

42
00:03:25,680 --> 00:03:32,840
So what we'll want is graphs that have no negative cycles.

43
00:03:32,840 --> 00:03:35,719
And then we can work with those.

44
00:03:35,719 --> 00:03:41,680
And there's an algorithm, an old algorithm known as the Bellman Ford algorithm that does

45
00:03:41,680 --> 00:03:42,879
the job.

46
00:03:42,879 --> 00:03:49,000
It's only slightly more specific than the generic algorithm that we gave before.

47
00:03:49,000 --> 00:03:58,799
It just says, if you have v vertices, for just v times, all you do is go through all the

48
00:03:58,799 --> 00:04:01,639
edges in the graph and relax each edge.

49
00:04:01,639 --> 00:04:08,199
So you make v passes through, relaxing all the edges in the graph.

50
00:04:08,199 --> 00:04:15,439
And that's an algorithm that finds shortest paths in graphs that don't have any negative

51
00:04:15,439 --> 00:04:16,439
cycles.

52
00:04:16,439 --> 00:04:22,399
If there's negative cycles, we'll talk about what happens in a minute.

53
00:04:22,399 --> 00:04:27,120
So let's look at that one in terms of a demo.

54
00:04:27,120 --> 00:04:30,800
So we'll just take the list of edges in the graph.

55
00:04:30,800 --> 00:04:36,199
It could be in any order and just relax them all.

56
00:04:36,199 --> 00:04:44,800
So to start out, we set the distance to the source 0 and everybody else's distance infinity

57
00:04:44,800 --> 00:04:46,719
as usual.

58
00:04:46,719 --> 00:04:48,480
And then here's the list of edges.

59
00:04:48,480 --> 00:04:50,759
So we'll relax.

60
00:04:50,759 --> 00:04:56,480
In this case, we start out with the edges, sort of in the order that you'd get them by

61
00:04:56,480 --> 00:04:57,800
walking through the whole graph.

62
00:04:57,800 --> 00:05:00,759
So you get all the edges associated with each vertex together.

63
00:05:00,759 --> 00:05:04,639
So we relax 0, 1, we relax 0, 4, we relax 0, 7.

64
00:05:04,639 --> 00:05:08,240
That's kind of the way a dikester would start out.

65
00:05:08,240 --> 00:05:14,159
And then we go ahead and relax the edges that come out from 1.

66
00:05:14,159 --> 00:05:19,240
So 1, 2 takes us to 2 for the first time.

67
00:05:19,240 --> 00:05:22,639
1, 3 takes us to 3 for the first time.

68
00:05:22,639 --> 00:05:26,199
1, 7 is no help.

69
00:05:26,199 --> 00:05:27,759
So we ignore it.

70
00:05:27,759 --> 00:05:30,480
Now we relax, sorry, I went too far.

71
00:05:30,480 --> 00:05:33,680
2, 3, and 2, 6.

72
00:05:33,680 --> 00:05:39,839
And that one takes us to 6 for the first time.

73
00:05:39,839 --> 00:05:43,959
And now 3, 6, that does not give us a better way to 6.

74
00:05:43,959 --> 00:05:46,000
So we ignore it.

75
00:05:46,000 --> 00:05:47,480
Now we go to 4, 5.

76
00:05:47,480 --> 00:05:50,399
That takes us to 5 for the first time.

77
00:05:50,399 --> 00:05:52,079
4, 6.

78
00:05:52,079 --> 00:05:54,959
Well, we could get to 4 and 9 and then 20 to 6.

79
00:05:54,959 --> 00:05:57,120
So that's no help.

80
00:05:57,120 --> 00:06:01,039
4, 5, that's no help.

81
00:06:01,039 --> 00:06:03,719
Now we do the ones from 5, 5, 2.

82
00:06:03,719 --> 00:06:05,439
That's going to give a better way to 2.

83
00:06:05,439 --> 00:06:08,039
So there we improve that.

84
00:06:08,039 --> 00:06:11,199
And 5, 6 is going to give a better way to 6.

85
00:06:11,199 --> 00:06:14,120
Now 7, 5, that's no help.

86
00:06:14,120 --> 00:06:16,679
And 7, 2 is no help.

87
00:06:16,679 --> 00:06:19,079
So I've completed the first pass.

88
00:06:19,079 --> 00:06:22,399
And now we're just going to go through and relax all the edges again.

89
00:06:22,399 --> 00:06:25,000
Now a lot of them are really just what we did before.

90
00:06:25,000 --> 00:06:26,519
And they're not going to improve anything,

91
00:06:26,519 --> 00:06:31,120
like the ones at the beginning are not going to improve anything.

92
00:06:31,120 --> 00:06:36,399
But before too long, so still no improvement.

93
00:06:36,399 --> 00:06:40,519
But here, now the second time we relax 2, 3,

94
00:06:40,519 --> 00:06:46,319
we have, it gives us a better way to get to 3.

95
00:06:46,319 --> 00:06:50,319
And for the first pass, it didn't help us, but second pass,

96
00:06:50,319 --> 00:06:54,120
we relax 2, 3 to get us to 3 and 17.

97
00:06:54,120 --> 00:06:56,920
Now that's going to change things for 3.

98
00:06:56,920 --> 00:07:03,159
If we had already been through 3, it wouldn't matter.

99
00:07:03,159 --> 00:07:05,480
And this wouldn't take another pass to deal with.

100
00:07:05,480 --> 00:07:10,120
But in this case, we're going to be coming through 3 later.

101
00:07:10,120 --> 00:07:12,360
There's another 2 to 6 gets better.

102
00:07:12,360 --> 00:07:18,079
And then 3 to 6, well, 2 to 6 beat it so it doesn't help.

103
00:07:18,079 --> 00:07:24,719
And now I think there's nothing else that helps in this example.

104
00:07:24,719 --> 00:07:27,519
And in fact, there's no further changes.

105
00:07:27,519 --> 00:07:32,599
Once we have the shortest pass tree, which we know from this example,

106
00:07:32,599 --> 00:07:36,159
because it's similar to when we did before,

107
00:07:36,159 --> 00:07:39,360
then there's going to be no changes to it.

108
00:07:39,360 --> 00:07:43,279
You're not going to find any edges that successfully relax.

109
00:07:43,279 --> 00:07:47,119
And so go through and try them all.

110
00:07:47,119 --> 00:07:50,039
And in the end, we have a shortest pass tree.

111
00:07:50,039 --> 00:07:53,239
So that's an example of the Bellman Ford algorithm

112
00:07:53,239 --> 00:07:57,479
on a simple sample graph.

113
00:07:57,479 --> 00:08:01,359
Here's the visualization of the Bellman Ford algorithm

114
00:08:01,359 --> 00:08:03,199
running on a bigger graph.

115
00:08:03,199 --> 00:08:09,199
And here's what it looks like after four passes, 7, 10, 13.

116
00:08:09,199 --> 00:08:12,879
This graph has 100 sum vertices.

117
00:08:12,879 --> 00:08:17,680
And it finds the tree in a relatively small number of passes.

118
00:08:17,680 --> 00:08:22,000
And we'll talk about the performance in a second.

119
00:08:22,000 --> 00:08:26,599
One thing is to be sure that the algorithm works.

120
00:08:26,599 --> 00:08:30,519
And there's a couple of ways to prove it.

121
00:08:30,519 --> 00:08:36,240
And again, the reason the proof has to be done with care

122
00:08:36,240 --> 00:08:41,279
is that there could be edges with negative weights,

123
00:08:41,279 --> 00:08:43,279
but no negative cycles.

124
00:08:43,279 --> 00:08:47,960
The idea of the proof is that after you've done the ice pass,

125
00:08:47,960 --> 00:08:53,000
you've found the shortest paths containing at most i edges.

126
00:08:53,000 --> 00:08:59,320
And we'll leave that proof for the book.

127
00:08:59,320 --> 00:09:03,879
Now, there is a couple of ways to improve the Bellman

128
00:09:03,879 --> 00:09:06,559
Ford algorithm in practice.

129
00:09:06,559 --> 00:09:10,320
And the most important one is that if you

130
00:09:10,320 --> 00:09:14,879
didn't change the distance to a vertex during one pass,

131
00:09:14,879 --> 00:09:18,840
then you don't have to worry about it in the next path.

132
00:09:18,840 --> 00:09:22,159
You don't have to worry about its edges in the next path.

133
00:09:22,159 --> 00:09:25,559
And so what we do in practice is to just

134
00:09:25,559 --> 00:09:30,360
maintain a queue of the vertices that we found shorter paths

135
00:09:30,360 --> 00:09:32,440
to in each pass.

136
00:09:32,520 --> 00:09:35,840
We want to make sure that we keep at most one copy of each vertex

137
00:09:35,840 --> 00:09:37,280
on the queue.

138
00:09:37,280 --> 00:09:39,880
Otherwise, you could wind up with situations

139
00:09:39,880 --> 00:09:44,200
where the size of the queue blows up.

140
00:09:44,200 --> 00:09:48,400
But that's easy to do with a vertex index to rate

141
00:09:48,400 --> 00:09:50,920
and keep track of that.

142
00:09:50,920 --> 00:09:53,440
And so in the worst case, you could

143
00:09:53,440 --> 00:09:57,600
have all the vertices on the queue and then

144
00:09:57,600 --> 00:10:02,320
therefore all the edges relaxed in every one of the V passes.

145
00:10:02,320 --> 00:10:08,200
But in practice, not too many vertices really get relaxed.

146
00:10:08,200 --> 00:10:14,640
So this is a quick summary of the algorithms

147
00:10:14,640 --> 00:10:18,360
that we've looked for for shortest paths.

148
00:10:18,360 --> 00:10:21,280
And we didn't do the code for Bellman Ford.

149
00:10:21,280 --> 00:10:22,600
We've done enough code today.

150
00:10:22,600 --> 00:10:24,600
It's a quite simple code that you find in the book

151
00:10:24,600 --> 00:10:27,280
or on the book site.

152
00:10:27,280 --> 00:10:30,120
So probably the simplest algorithm

153
00:10:30,120 --> 00:10:32,919
is when there are no directed cycles.

154
00:10:32,919 --> 00:10:35,120
And that's when we just topologically

155
00:10:35,120 --> 00:10:37,799
sort the vertices and then go through that list

156
00:10:37,799 --> 00:10:39,879
and relax every edge.

157
00:10:39,879 --> 00:10:42,279
So that's linear time.

158
00:10:42,279 --> 00:10:46,480
Relax all the edges in the graph, and that works,

159
00:10:46,480 --> 00:10:49,639
even if there are negative weights.

160
00:10:49,639 --> 00:10:52,840
If there's no negative weights, but there may be cycles,

161
00:10:52,840 --> 00:10:55,120
then dikeschers algorithm works.

162
00:10:55,120 --> 00:10:57,399
And then we looked at e-log v-alruisms

163
00:10:57,399 --> 00:11:02,120
where slightly faster depending on what kind of heat you use.

164
00:11:02,120 --> 00:11:06,399
Bellman Ford algorithm, which works with negative weights

165
00:11:06,399 --> 00:11:11,399
as long as there's no negative cycles,

166
00:11:11,399 --> 00:11:15,319
if you do the queue, you can get the in practice.

167
00:11:15,319 --> 00:11:18,439
It turns out to be linear time for the kinds of graphs

168
00:11:18,439 --> 00:11:20,159
that arise in practice.

169
00:11:20,159 --> 00:11:22,439
Although in principle, in the worst case,

170
00:11:22,439 --> 00:11:26,960
it could be e times v, which is much too slow.

171
00:11:26,960 --> 00:11:30,080
So directed cycles makes the problem harder.

172
00:11:30,080 --> 00:11:33,320
You need a dikestra instead of topological sort.

173
00:11:33,320 --> 00:11:37,320
Negative weights definitely make the problem harder,

174
00:11:37,320 --> 00:11:43,920
because you might need to get the worst case of Bellman Ford.

175
00:11:43,920 --> 00:11:47,000
And negative cycles, in the presence of negative cycles,

176
00:11:47,000 --> 00:11:49,920
it actually makes the problem intractable.

177
00:11:49,920 --> 00:11:54,320
And we'll talk about that a little bit at the end of the course.

178
00:11:54,320 --> 00:11:59,400
One thing that you can do with the Bellman Ford algorithm

179
00:11:59,400 --> 00:12:04,200
is to at least find out if there's a negative cycle.

180
00:12:04,200 --> 00:12:08,000
And one practical reason to do that is maybe it

181
00:12:08,000 --> 00:12:14,160
has something to do with something else specified in the problem.

182
00:12:14,160 --> 00:12:18,240
And so if you can detect a negative cycle and deal with it,

183
00:12:18,240 --> 00:12:21,280
that would be useful.

184
00:12:21,280 --> 00:12:24,000
And we'll look at another important practical reason

185
00:12:24,000 --> 00:12:27,720
for finding negative cycles in just a second.

186
00:12:27,720 --> 00:12:30,759
So anyway, since it's a useful thing to do,

187
00:12:30,759 --> 00:12:34,799
we're going to add two methods to the API.

188
00:12:34,799 --> 00:12:39,080
And that is, does the graph have a negative cycle?

189
00:12:39,080 --> 00:12:42,159
And then an interval, if it does have a negative cycle,

190
00:12:42,159 --> 00:12:44,080
please give it to me.

191
00:12:44,080 --> 00:12:47,559
So for this graph, it would return true.

192
00:12:47,559 --> 00:12:50,039
And then it would give an interval that

193
00:12:50,039 --> 00:12:53,879
would have these three edges that give me the negative cycle.

194
00:12:53,879 --> 00:13:00,000
So the observation or the way to find a negative cycle

195
00:13:00,000 --> 00:13:04,080
is to realize that what will happen with Bellman Ford

196
00:13:04,080 --> 00:13:06,759
algorithm, if there's a negative cycle,

197
00:13:06,759 --> 00:13:09,919
is that it'll every pass through.

198
00:13:09,919 --> 00:13:12,639
It'll basically go around the cycle.

199
00:13:12,639 --> 00:13:15,080
Well, not every pass in length of the cycle.

200
00:13:15,080 --> 00:13:18,200
It'll get stuck in a loop going around the cycle,

201
00:13:18,200 --> 00:13:20,879
depending on the order of the vertices.

202
00:13:20,879 --> 00:13:25,879
And it'll update and just get stuck going around the cycle.

203
00:13:25,879 --> 00:13:29,879
So by testing what happens after Bellman Ford is done,

204
00:13:29,879 --> 00:13:33,240
even if there's negative cycles present,

205
00:13:33,240 --> 00:13:34,759
we can find the negative cycles.

206
00:13:34,759 --> 00:13:39,600
And in fact, if some vertex is updated

207
00:13:39,600 --> 00:13:43,559
in the last phase of the Bellman Ford algorithm,

208
00:13:43,559 --> 00:13:45,759
then there's a negative cycle.

209
00:13:45,759 --> 00:13:51,799
And not only that, edge 2v is the last edge on that cycle.

210
00:13:51,799 --> 00:13:53,439
That's the way you've got to v.

211
00:13:53,439 --> 00:13:56,000
And you can trace back to find the cycle.

212
00:13:56,000 --> 00:13:58,679
So just run the Bellman Ford algorithm.

213
00:13:58,679 --> 00:14:03,159
And if some vertex gets updated the last time through,

214
00:14:03,159 --> 00:14:06,200
it means that there's a negative cycle.

215
00:14:06,200 --> 00:14:07,559
In practice, actually, you don't have

216
00:14:07,559 --> 00:14:09,600
to wait till the last phase.

217
00:14:09,600 --> 00:14:13,639
You can check the dis2 entries for negative cycles more

218
00:14:13,639 --> 00:14:15,080
frequently.

219
00:14:15,080 --> 00:14:21,320
But anyway, it's possible to find a negative cycle.

220
00:14:21,320 --> 00:14:24,120
And let's look at an application.

221
00:14:24,120 --> 00:14:30,240
This is an application that really motivates some people

222
00:14:30,240 --> 00:14:34,720
to understand shortest paths out of them.

223
00:14:34,720 --> 00:14:38,680
And the idea is currency exchange.

224
00:14:38,680 --> 00:14:43,640
And so these are typical numbers that you might see

225
00:14:43,639 --> 00:14:46,159
in a newspaper table or nowadays in an app

226
00:14:46,159 --> 00:14:50,799
on your mobile device that gives the exchange rates

227
00:14:50,799 --> 00:14:53,720
for various currencies.

228
00:14:53,720 --> 00:15:00,960
So to convert $1 to euros, use a factor of 0.741,

229
00:15:00,960 --> 00:15:03,159
and compute euros to a rate of 10,000,

230
00:15:03,159 --> 00:15:05,039
0.888, and so forth.

231
00:15:05,039 --> 00:15:08,000
So this table is a table of exchange rates.

232
00:15:08,000 --> 00:15:12,559
And the problem is there an arbitrage opportunity.

233
00:15:12,559 --> 00:15:14,719
So what is arbitrage?

234
00:15:14,719 --> 00:15:21,000
Well, arbitrage is when just by making exchanges,

235
00:15:21,000 --> 00:15:26,719
according to the legal rates in the table,

236
00:15:26,719 --> 00:15:28,439
you can make money.

237
00:15:28,439 --> 00:15:32,559
So say we had $1,000, and then these are the going rates.

238
00:15:32,559 --> 00:15:40,039
Well, we can convert that $1,000 into $741 euros.

239
00:15:40,039 --> 00:15:44,399
So now if we take those $71 euros and convert them

240
00:15:44,399 --> 00:15:53,159
into Canadian dollars, it works out that we get $1,012.206

241
00:15:53,159 --> 00:15:54,679
Canadian dollars.

242
00:15:54,679 --> 00:15:56,639
And if we take those Canadian dollars

243
00:15:56,639 --> 00:15:58,759
and convert them back to US dollars,

244
00:15:58,759 --> 00:16:02,759
it works out that we have $1,07.

245
00:16:02,759 --> 00:16:06,599
Well, that's arbitrage, and that's interesting.

246
00:16:06,600 --> 00:16:10,480
If we could go ahead and do that for, well, let's say,

247
00:16:10,480 --> 00:16:14,360
$10,000, then it would make $70 on the deal.

248
00:16:14,360 --> 00:16:19,240
Or $100,000 would make $700,000, or maybe $1,000,000,

249
00:16:19,240 --> 00:16:22,519
would make $7,000, or maybe $1,000,000,

250
00:16:22,519 --> 00:16:25,560
would make $7,000,000, no reason to stop there.

251
00:16:25,560 --> 00:16:29,879
With arbitrage opportunity, you're making money off the system.

252
00:16:29,879 --> 00:16:32,240
So of course, there's intense interest

253
00:16:32,240 --> 00:16:36,480
in looking for opportunities like this.

254
00:16:36,480 --> 00:16:40,279
Of course, in modern financial markets,

255
00:16:40,279 --> 00:16:43,560
there's many more things you can trade than currencies.

256
00:16:43,560 --> 00:16:46,399
And these tables are big and complex.

257
00:16:46,399 --> 00:16:49,800
And the market is supposed to take care

258
00:16:49,800 --> 00:16:52,120
of eliminating these opportunities.

259
00:16:52,120 --> 00:16:55,000
But if you're using a computer and you've

260
00:16:55,000 --> 00:16:58,480
got a fast algorithm for finding negative cycles

261
00:16:58,480 --> 00:17:01,879
in directed graphs, then maybe you

262
00:17:01,879 --> 00:17:04,160
can find the opportunity and take advantage of it

263
00:17:04,160 --> 00:17:06,039
before the market.

264
00:17:06,039 --> 00:17:08,000
So let's look at how it works.

265
00:17:08,000 --> 00:17:13,720
What we do is, again, model the situation with a graph.

266
00:17:13,720 --> 00:17:20,879
So we're going to have a vertex for every currency.

267
00:17:20,879 --> 00:17:26,480
And then an edge corresponding to every transaction

268
00:17:26,480 --> 00:17:27,799
or every entry in the table.

269
00:17:27,799 --> 00:17:31,240
So this is actually a complete directed graph.

270
00:17:31,240 --> 00:17:34,720
And the weight is equal to the exchange rate

271
00:17:34,720 --> 00:17:38,759
and what we're trying to find is a directed cycle whose

272
00:17:38,759 --> 00:17:43,079
product of edge weights is greater than 1.

273
00:17:43,079 --> 00:17:47,920
So that doesn't look like a shortest path problem,

274
00:17:47,920 --> 00:17:49,440
although it's close.

275
00:17:49,440 --> 00:17:52,160
And actually, it's very close to convert this

276
00:17:52,160 --> 00:17:55,039
to a shortest path problem.

277
00:17:55,039 --> 00:18:00,600
What we want to do is just take logs.

278
00:18:00,599 --> 00:18:04,199
If instead of using the exchange rate,

279
00:18:04,199 --> 00:18:08,439
we take minus the log of the exchange rate.

280
00:18:08,439 --> 00:18:11,799
And then multiplying turns to addition.

281
00:18:11,799 --> 00:18:15,639
We're looking for multiplying the exchange rates.

282
00:18:15,639 --> 00:18:19,079
That's the same as summing the log.

283
00:18:19,079 --> 00:18:21,399
And we took minus log.

284
00:18:21,399 --> 00:18:23,639
It means that what we're looking for,

285
00:18:23,639 --> 00:18:26,599
and when we're trying to find product bigger than 1,

286
00:18:26,599 --> 00:18:29,759
we're looking for a directed cycle whose sum of edge weights

287
00:18:29,759 --> 00:18:31,160
is less than 0.

288
00:18:31,160 --> 00:18:36,240
Find a directed cycle whose sum of edge weights is less than 0

289
00:18:36,240 --> 00:18:38,920
in a complete die graph.

290
00:18:38,920 --> 00:18:41,559
That's the negative cycle detection problem.

291
00:18:41,559 --> 00:18:47,799
And we just saw that we can do that with the Bellman Ford

292
00:18:47,799 --> 00:18:49,440
algorithm.

293
00:18:49,440 --> 00:18:52,279
And again, in a huge directed graph

294
00:18:52,279 --> 00:18:56,920
in a modern trading situation, that's

295
00:18:56,920 --> 00:18:59,319
an extraordinarily valuable algorithm.

296
00:18:59,319 --> 00:19:02,839
And you can believe that there are people out there

297
00:19:02,839 --> 00:19:07,119
running these algorithms in order to detect and take advantage

298
00:19:07,119 --> 00:19:09,519
of arbitrage opportunity.

299
00:19:09,519 --> 00:19:11,559
And if you don't have a fast algorithm,

300
00:19:11,559 --> 00:19:13,439
if you're using a slow one, it'll

301
00:19:13,439 --> 00:19:15,720
be gone before you can take advantage of it.

302
00:19:15,720 --> 00:19:17,799
That's a fine example of the value

303
00:19:17,799 --> 00:19:23,279
of building efficient algorithms for practical problems.

304
00:19:23,279 --> 00:19:25,839
So here's our summary of shortest path today.

305
00:19:25,839 --> 00:19:28,240
We've seen some great classic algorithms

306
00:19:28,240 --> 00:19:31,720
that are important and extraordinarily useful.

307
00:19:31,720 --> 00:19:34,440
First one is digstress algorithm, which

308
00:19:34,440 --> 00:19:37,640
is a fine efficient workhorse algorithm

309
00:19:37,640 --> 00:19:40,720
that you see used every day.

310
00:19:40,720 --> 00:19:43,599
And it's a graph search algorithm that

311
00:19:43,599 --> 00:19:47,960
is similar to the depth research and breadth research

312
00:19:47,960 --> 00:19:49,039
that we've seen before.

313
00:19:49,039 --> 00:19:52,319
And we'll see again.

314
00:19:52,319 --> 00:19:55,960
If the graphs are have no cycles, which

315
00:19:55,960 --> 00:19:59,720
is a situation that arises in several important applications,

316
00:19:59,720 --> 00:20:01,880
we can do better than digstress algorithm.

317
00:20:01,880 --> 00:20:03,160
It's easier.

318
00:20:03,160 --> 00:20:05,519
And also negative weights are no problem, which

319
00:20:05,519 --> 00:20:10,319
enables us to solve scheduling problems in other examples.

320
00:20:10,319 --> 00:20:13,440
If there's negative weights and negative cycles,

321
00:20:13,440 --> 00:20:16,440
we can detect negative cycles.

322
00:20:16,440 --> 00:20:18,360
And if there aren't any negative cycles,

323
00:20:18,360 --> 00:20:21,880
we can find shortest paths.

324
00:20:21,880 --> 00:20:24,440
The general problem is intractable,

325
00:20:24,440 --> 00:20:26,720
and we'll come back to that.

326
00:20:26,720 --> 00:20:31,160
But the key point that I want people to remember from today's

327
00:20:31,160 --> 00:20:33,840
lecture is that shortest paths are first

328
00:20:33,840 --> 00:20:37,799
real example of a general problem solving model,

329
00:20:37,799 --> 00:20:41,200
where there's a lot of important practical problems

330
00:20:41,200 --> 00:20:45,039
that we can cast as shortest fast problems, number one.

331
00:20:45,039 --> 00:20:49,200
And number two, we have fast solutions to those problems

332
00:20:49,200 --> 00:20:51,840
with these classic algorithms that we've talked about today.

333
00:20:54,960 --> 00:20:56,200
See you next time.

334
00:20:56,200 --> 00:20:56,519
OK.

