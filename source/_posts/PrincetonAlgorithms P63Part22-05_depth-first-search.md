---
title: PrincetonAlgorithms P63Part22 05_depth First Search
---

1
00:00:00,000 --> 00:00:08,560
Now we're going to look at depth first search, which is a classical graph processing algorithm.

2
00:00:08,560 --> 00:00:15,000
It's actually maybe one of the oldest algorithms that we study surprisingly.

3
00:00:15,000 --> 00:00:18,800
One way to think about depth first search is in terms of mazes.

4
00:00:18,800 --> 00:00:22,240
It's a pretty familiar way to look at it.

5
00:00:22,240 --> 00:00:29,280
And so if you have a maze like the one drawn on the left, you can model it with a graph

6
00:00:29,280 --> 00:00:36,000
by creating a vertex for every intersection in the maze and an edge for every passage

7
00:00:36,000 --> 00:00:39,480
connecting to intersection.

8
00:00:39,480 --> 00:00:45,439
And so if you're at the entrance of this maze and you want to find a pot of gold somewhere,

9
00:00:45,439 --> 00:00:52,680
what you're going to need to do is explore every intersection or explore every edge in the

10
00:00:52,680 --> 00:00:53,680
maze.

11
00:00:53,679 --> 00:00:59,560
And so we're going to talk about the explorer every intersection option.

12
00:00:59,560 --> 00:01:00,560
So that's our goal.

13
00:01:00,560 --> 00:01:03,719
Have an algorithm for doing that.

14
00:01:03,719 --> 00:01:09,799
By the way, this is a famous graph that some of you might recognize.

15
00:01:09,799 --> 00:01:14,039
That's the graph for the Pac-Man game.

16
00:01:14,039 --> 00:01:15,039
Okay.

17
00:01:15,040 --> 00:01:23,760
So one method, classic method that predates computers for exploring a maze is called

18
00:01:23,760 --> 00:01:27,240
the Tremo maze exploration algorithm.

19
00:01:27,240 --> 00:01:31,880
The idea is to think about having a ball of string.

20
00:01:31,880 --> 00:01:43,120
And what you do is when you walk down a passage, you unroll the string behind you, and you

21
00:01:43,120 --> 00:01:47,359
also mark every place that you've been.

22
00:01:47,359 --> 00:01:50,480
So we actually have a ball of string and some chalk maybe.

23
00:01:50,480 --> 00:01:53,120
So in this case, maybe we walk down this passage here.

24
00:01:53,120 --> 00:01:56,200
And now we have some choices about where we might go.

25
00:01:56,200 --> 00:02:01,880
So say we go down here, so we unroll our ball of string and mark it.

26
00:02:01,880 --> 00:02:07,680
And so now the next time at this intersection, we have no choice but to go up here.

27
00:02:07,680 --> 00:02:10,599
We go up here and we see, oh, we've already been there.

28
00:02:10,599 --> 00:02:13,199
So we're not going to go there.

29
00:02:13,199 --> 00:02:18,240
And we come back and we have our ball of string so we can unroll it to figure out where we

30
00:02:18,240 --> 00:02:19,560
were.

31
00:02:19,560 --> 00:02:25,599
And we go back until we have some other choice, which is this place now.

32
00:02:25,599 --> 00:02:28,519
And we mark that we've been these other places.

33
00:02:28,519 --> 00:02:32,159
And so now we take another option and say go down this way.

34
00:02:32,159 --> 00:02:35,319
And here we take another option and go that way.

35
00:02:35,319 --> 00:02:40,159
And then finally, again, we go up this way and we see that we've been there.

36
00:02:40,159 --> 00:02:43,159
So we back up and take the last option.

37
00:02:43,159 --> 00:02:48,719
And then that gets us to the last vertex in the graph.

38
00:02:48,719 --> 00:02:54,719
So mark each visited intersection and each visited passage in retrace our steps when

39
00:02:54,719 --> 00:02:57,639
there's no unvisited option.

40
00:02:57,639 --> 00:03:04,960
Again, this is a classical algorithm that was studied centuries ago.

41
00:03:04,960 --> 00:03:11,360
In fact, some argue the first use was when Thesius entered the lab room and was trying

42
00:03:11,360 --> 00:03:14,400
to find a minute or.

43
00:03:14,400 --> 00:03:21,080
And Ariadne didn't want him to get lost in the maze.

44
00:03:21,080 --> 00:03:27,080
So she instructed Thesius to use a ball of string to find his way back out.

45
00:03:27,080 --> 00:03:30,960
That's the basic algorithm that we're going to use.

46
00:03:30,960 --> 00:03:37,640
And it's been studied by many, many scientists in the time since Thesius.

47
00:03:37,640 --> 00:03:44,520
And in fact, Claude Shannon, the founder of information theory, did experiments on mazes

48
00:03:44,520 --> 00:03:49,879
with mice to see if they might understand maze exploration.

49
00:03:49,879 --> 00:03:52,240
This might help.

50
00:03:52,240 --> 00:03:58,520
Okay, so here's what it looks like in a typical maze.

51
00:03:58,520 --> 00:04:05,800
Now, one of the things to remember is in a computer representation, normally we're just

52
00:04:05,800 --> 00:04:11,760
looking at the vertices in the set of associated edges, we don't see anything other than that.

53
00:04:11,760 --> 00:04:15,600
So it's sometimes frustrating watching these.

54
00:04:15,600 --> 00:04:19,280
You know that it turned the wrong way and it's going to get trapped here, but the computer

55
00:04:19,280 --> 00:04:21,280
doesn't really know that.

56
00:04:21,280 --> 00:04:24,280
So it has to back up along here now.

57
00:04:24,279 --> 00:04:33,479
And it continues to back up to find another option until it gets free again and finds some

58
00:04:33,479 --> 00:04:35,199
place to go.

59
00:04:35,199 --> 00:04:37,199
And sometimes it's very frustrating.

60
00:04:37,199 --> 00:04:42,679
It seems to be quite close to the goal like up here and it turns the wrong way.

61
00:04:42,679 --> 00:04:48,559
So we can see it's going to take a long way, but no way the program could really know that.

62
00:04:49,040 --> 00:04:57,280
Again, all the programs working with is vertex instead of edges associated with that vertex

63
00:04:57,280 --> 00:05:00,280
and there it finally gets to the goal.

64
00:05:00,280 --> 00:05:03,280
Here's a bigger one going faster.

65
00:05:09,560 --> 00:05:15,040
Now, the key thing is not so much getting lost and going the wrong way.

66
00:05:15,040 --> 00:05:19,000
The key thing is not going anywhere twice.

67
00:05:19,000 --> 00:05:20,000
That's the whole thing.

68
00:05:20,000 --> 00:05:25,080
We have to have the string to know to go back where we came from and we have to be able to

69
00:05:25,080 --> 00:05:27,600
mark where we've been.

70
00:05:27,600 --> 00:05:34,879
And with those two things we are, the algorithm is able to avoid going the same place twice.

71
00:05:34,879 --> 00:05:38,680
If you weren't marking, if you try to do this randomly or some other way, it might take

72
00:05:38,680 --> 00:05:40,920
you a while to get to the goal.

73
00:05:40,920 --> 00:05:48,520
So it doesn't seem like much of accomplishment maybe for a maze, but actually to be able

74
00:05:48,520 --> 00:05:57,120
to get there without going any place twice is sort of a profound idea and leads to an

75
00:05:57,120 --> 00:05:59,120
efficient algorithm.

76
00:05:59,120 --> 00:06:08,400
Okay, so our idea is given in this medicode to do depth for search.

77
00:06:08,399 --> 00:06:13,959
That is to visit all the places you can get to from a vertex V.

78
00:06:13,959 --> 00:06:17,679
What we're going to do is this simple recursive algorithm.

79
00:06:17,679 --> 00:06:24,560
Mark the vertex is visited and then recursively visit all on mark versus W that are adjacent

80
00:06:24,560 --> 00:06:30,479
to V. That's a very simple description and it leads to very simple code.

81
00:06:30,479 --> 00:06:37,959
It's so simple actually it really belies the profound idea underneath this algorithm.

82
00:06:38,839 --> 00:06:45,799
So again, there's lots of applications and for example, this is one way to find whether

83
00:06:45,799 --> 00:06:51,560
there exists a path between two vertices or to find all the vertices connected to a given

84
00:06:51,560 --> 00:06:52,560
source vertex.

85
00:06:52,560 --> 00:06:58,279
And we'll consider some less abstract applications once we've looked at the code.

86
00:06:58,279 --> 00:07:01,279
So how to implement.

87
00:07:01,279 --> 00:07:07,120
Well, here's what we're going to do for our design pattern for graph processing.

88
00:07:07,199 --> 00:07:09,879
Our first example.

89
00:07:09,879 --> 00:07:20,199
So what we did when we defined an API for graphs was to decouple the graph data type from

90
00:07:20,199 --> 00:07:22,319
graph processing.

91
00:07:22,319 --> 00:07:27,800
The idea is we're going to create a graph object using that API which we know allows us

92
00:07:27,800 --> 00:07:32,759
to represent a big graph within the computer and gives us the basic operations that we're

93
00:07:32,759 --> 00:07:35,159
going to need for graph processing.

94
00:07:35,159 --> 00:07:39,719
And then we use that API within a graph processing routine.

95
00:07:39,719 --> 00:07:45,159
And the basic idea is that that graph processing routine will go through the graph and collect

96
00:07:45,159 --> 00:07:53,920
some information and then a client of that routine will query its API to get information

97
00:07:53,920 --> 00:07:55,639
about the graph.

98
00:07:55,639 --> 00:08:04,639
So in the case of depth first search, here's a potential possible API.

99
00:08:04,639 --> 00:08:12,639
So the idea is that what we're going to implement is a program that can find paths in a graph

100
00:08:12,639 --> 00:08:14,800
from a given source.

101
00:08:14,800 --> 00:08:22,079
So we give a graph and a vertex and that constructor is going to do what it needs in order to be

102
00:08:22,079 --> 00:08:26,319
able to answer these two queries.

103
00:08:26,319 --> 00:08:34,679
First one is give a vertex, final give a vertex, is there a path in the graph from the source

104
00:08:34,679 --> 00:08:35,679
to that vertex?

105
00:08:35,679 --> 00:08:40,319
You want to be able to answer that efficiently.

106
00:08:40,319 --> 00:08:44,799
And then the other thing is to just give the path, what's the path from S to V giving

107
00:08:44,799 --> 00:08:49,759
me all the vertices on the path in time proportional to its length.

108
00:08:49,759 --> 00:08:55,120
So here's a client of this API.

109
00:08:55,120 --> 00:09:03,439
So it's going to take a source vertex S and it's going to build a pathfinder or a path's

110
00:09:03,439 --> 00:09:04,840
object.

111
00:09:04,840 --> 00:09:11,439
And that object is going to do the processing it needs to be able to efficiently implement

112
00:09:11,439 --> 00:09:13,240
has path to.

113
00:09:13,240 --> 00:09:19,519
And then what this does is for every vertex in the graph, if there's a path from S to

114
00:09:19,519 --> 00:09:22,360
that vertex, it'll print it out.

115
00:09:22,360 --> 00:09:25,399
So that prints out all the vertices connected to X.

116
00:09:25,399 --> 00:09:30,799
And that's just one client of this data type.

117
00:09:30,799 --> 00:09:35,680
You could print out the paths or whatever else you might.

118
00:09:35,680 --> 00:09:41,519
So that's our design pattern that we're going to use over and over again for a graph processing

119
00:09:41,519 --> 00:09:42,519
routine.

120
00:09:42,519 --> 00:09:47,960
And it's important to understand why we use a design pattern like this.

121
00:09:47,960 --> 00:09:52,679
We're decoupling the graph representation from the processing of it.

122
00:09:52,679 --> 00:09:57,360
As I mentioned, there's hundreds of routines for algorithms that have been developed for

123
00:09:57,360 --> 00:09:59,159
processing graphs.

124
00:09:59,159 --> 00:10:03,559
An alternative might be to put all those algorithms in one big data type.

125
00:10:03,559 --> 00:10:08,120
That's a so-called fat interface.

126
00:10:08,120 --> 00:10:13,960
And that would be a bad plan because these things maybe are not so well related to each

127
00:10:13,960 --> 00:10:20,480
other and actually all of them really are just iterating through the graph and doing different

128
00:10:20,480 --> 00:10:22,320
types of processing.

129
00:10:22,320 --> 00:10:29,360
With this way, we're able to separate out and articulate what the graph processing

130
00:10:29,360 --> 00:10:30,919
clients are doing.

131
00:10:30,919 --> 00:10:37,000
And then the real applications can be clients of these graph processing routines.

132
00:10:37,000 --> 00:10:43,200
And everybody's taking advantage of an efficient representation that we already took care of.

133
00:10:43,200 --> 00:10:50,360
OK, so now let's look at a demo of how depth research is going to work and then we'll take

134
00:10:50,360 --> 00:10:53,399
a look at the implementation.

135
00:10:53,399 --> 00:10:59,600
OK, so here's a demo of depth research in operation on our sample graph.

136
00:10:59,600 --> 00:11:05,440
Again, to visit a vertex, we're going to mark it and then recursively visit all unmarked

137
00:11:05,440 --> 00:11:08,640
vertices that are adjacent.

138
00:11:08,640 --> 00:11:11,360
So this is our sample graph.

139
00:11:11,360 --> 00:11:20,880
And so the first thing we do is realize that we're going to need a vertex indexed array to keep track of which

140
00:11:20,880 --> 00:11:22,360
vertices are marked.

141
00:11:22,360 --> 00:11:29,040
So that'll just be array of Boolean and we'll initialize that with all false.

142
00:11:29,039 --> 00:11:38,480
We're also going to keep another data structured a vertex indexed array of ints that for every vertex

143
00:11:38,480 --> 00:11:43,039
gives us the vertex that took us there.

144
00:11:43,039 --> 00:11:46,919
So let's get started and you'll see how it works.

145
00:11:46,919 --> 00:11:52,000
So this is the depth research starting at vertex 0.

146
00:11:52,000 --> 00:11:56,440
So now to visit vertex 0, we want to mark it.

147
00:11:56,440 --> 00:12:03,080
So that's mark 0 is true and that's the starting point for you know anything with edge 2.

148
00:12:03,080 --> 00:12:09,559
And now what we're going to do is we're going to need to check all the vertices that are adjacent to 0.

149
00:12:09,559 --> 00:12:12,600
So that's 6, 2, 1, and 5.

150
00:12:12,600 --> 00:12:18,360
The order in which their check depends on the representation in the bag,

151
00:12:18,360 --> 00:12:22,800
we don't really necessarily care about that.

152
00:12:22,800 --> 00:12:25,159
Most of the algorithms are going to check them all.

153
00:12:25,159 --> 00:12:27,240
It doesn't matter that much about the order.

154
00:12:27,240 --> 00:12:36,960
Although in some cases it's wise to be mindful and maybe use a bag that takes them out in random order.

155
00:12:36,960 --> 00:12:41,399
OK, so to visit 0, we have to check 6, 2, 1, and 5.

156
00:12:41,399 --> 00:12:43,879
So let's go ahead and do that.

157
00:12:43,879 --> 00:12:49,200
So in this case, 6 is the first thing to get checked.

158
00:12:49,200 --> 00:12:58,799
And so now we mark 6 as visited and now we're going to recursively do a search starting from 6.

159
00:12:58,799 --> 00:13:07,399
The other difference when we visit 6 from 0, we're going to put a 0 in this edge 2 entry to say that

160
00:13:07,399 --> 00:13:12,879
when we first got to 6, the way we got there was from 0.

161
00:13:12,879 --> 00:13:24,720
And that's going to be the data structure that will help us implement the client query to give us the path back to 0 from any path from any vertex.

162
00:13:24,720 --> 00:13:27,279
OK, so what do we have to do to visit 6?

163
00:13:27,279 --> 00:13:33,360
Well, 6 has 2 adjacent vertices, 0 and 4, so we're going to have to check them.

164
00:13:33,360 --> 00:13:37,039
So first we check 0 and that's already marked.

165
00:13:37,039 --> 00:13:39,079
So we don't have to do anything.

166
00:13:39,079 --> 00:13:43,240
We're only supposed to recursively visit unmarked vertices.

167
00:13:43,240 --> 00:13:45,679
And then we check 4.

168
00:13:45,679 --> 00:13:52,079
And 4 is unmarked, so we're going to have to recursively visit it.

169
00:13:52,079 --> 00:14:02,639
So next thing we do is visit 4, mark 4 as having been visited with a true in the marked array, fourth entry of the marked array.

170
00:14:02,639 --> 00:14:07,519
And we fill an edge 2 saying we got to 4 from 6.

171
00:14:07,519 --> 00:14:15,000
And so now to visit 4, we have to recursively check 5, 6, and 3.

172
00:14:15,000 --> 00:14:18,840
And again, that order is where they happen to be in our bag.

173
00:14:18,840 --> 00:14:20,759
So first we check 5.

174
00:14:20,759 --> 00:14:24,240
5 is not marked, so we're going to visit 5.

175
00:14:24,240 --> 00:14:31,720
We're going to mark it, say we got there from 4, and then go ahead and visit 3, 4, and 0 in that order.

176
00:14:31,720 --> 00:14:36,800
From first we visit 3, that one also is not yet marked.

177
00:14:36,800 --> 00:14:39,639
So we're going to recursively visit it.

178
00:14:39,639 --> 00:14:43,480
So that's mark 3, say we got there from 5.

179
00:14:43,480 --> 00:14:51,639
And then go ahead and to visit 3 recursively, we have to check 5 and 4.

180
00:14:51,639 --> 00:14:54,360
Check 5, while we just came there, it's marked.

181
00:14:54,360 --> 00:14:55,920
So we don't have to do anything.

182
00:14:55,920 --> 00:15:01,080
Check 4, that's also been marked, so we don't have to do anything.

183
00:15:01,120 --> 00:15:06,320
So now finally, this is the first time in the recursive calls that we're ready to return.

184
00:15:06,320 --> 00:15:09,639
We're done with that first search from 3.

185
00:15:09,639 --> 00:15:13,400
So now we're done with 3, and we can unwinding the recursion.

186
00:15:13,400 --> 00:15:18,520
We can now continue our search from 5.

187
00:15:18,520 --> 00:15:22,680
And the next thing we have to do from 5, we've already checked 3.

188
00:15:22,680 --> 00:15:25,040
So now we're going to check 4.

189
00:15:25,040 --> 00:15:28,440
And we've already visited 4, so we don't have to do anything.

190
00:15:28,440 --> 00:15:30,120
That's already marked.

191
00:15:30,120 --> 00:15:32,400
And we check 0, and that one's already marked.

192
00:15:32,400 --> 00:15:37,360
So now we're done with 5, and we can back one more level up in the recursion.

193
00:15:37,360 --> 00:15:43,400
So now for 4, we have to go through and look at 6 and 3.

194
00:15:43,400 --> 00:15:46,280
6 is marked, so we don't have to do anything.

195
00:15:46,280 --> 00:15:49,760
3 is marked, so we don't have to do anything.

196
00:15:49,760 --> 00:15:52,600
And so we're going to be done with 4.

197
00:15:52,600 --> 00:15:57,840
So after finishing 4, we're done with 6.

198
00:15:57,840 --> 00:16:02,480
And so now we're in the recursion back at 0.

199
00:16:02,480 --> 00:16:04,240
We've already checked 6.

200
00:16:04,240 --> 00:16:06,480
So now we've got to check 2 next.

201
00:16:06,480 --> 00:16:11,440
We check 2, and so we recurse and go there, marked 2.

202
00:16:11,440 --> 00:16:14,160
And then say we got there from 0.

203
00:16:14,160 --> 00:16:18,080
And now to visit 2, all we check is 0, and that's marked.

204
00:16:18,080 --> 00:16:19,200
So we don't have to do anything.

205
00:16:19,200 --> 00:16:21,240
And we're done with 2.

206
00:16:21,240 --> 00:16:23,000
And then check 1.

207
00:16:23,000 --> 00:16:24,360
Visit 1.

208
00:16:24,360 --> 00:16:26,160
That's the last vertex we're visiting.

209
00:16:28,440 --> 00:16:29,960
Check 0.

210
00:16:29,960 --> 00:16:32,440
It's already marked, so we don't do anything.

211
00:16:32,440 --> 00:16:34,080
We returned.

212
00:16:34,080 --> 00:16:38,600
And now we're at the last step is from 0.

213
00:16:38,600 --> 00:16:39,720
5 is on its list.

214
00:16:39,720 --> 00:16:41,840
We have to check if we've been there.

215
00:16:41,840 --> 00:16:44,480
We can see that it's marked, and we have been there.

216
00:16:44,480 --> 00:16:47,360
So we're done with 0.

217
00:16:47,360 --> 00:16:53,080
So that's a depth first search from vertex 0.

218
00:16:53,080 --> 00:16:56,560
And we have visited all the vertices that

219
00:16:56,560 --> 00:16:59,040
are reachable from 0.

220
00:16:59,040 --> 00:17:02,720
Number 1, and number 2, for each one of those vertices,

221
00:17:02,720 --> 00:17:07,200
we kept track of how we got there from 0.

222
00:17:07,200 --> 00:17:10,319
So if we now want to know for any one of those vertices,

223
00:17:10,319 --> 00:17:14,200
how to get back to 0, we have the information that we need.

224
00:17:14,200 --> 00:17:20,319
For example, say we want to find the path from 5 back to 0.

225
00:17:20,319 --> 00:17:22,480
We know we got to 5 from 4.

226
00:17:22,480 --> 00:17:24,519
We know we got to 4 from 6.

227
00:17:24,519 --> 00:17:27,559
We know we got to 6 from 0.

228
00:17:27,559 --> 00:17:31,839
So we can go back through using that edge to array

229
00:17:31,839 --> 00:17:33,839
to find the path.

230
00:17:33,839 --> 00:17:35,980
So the depth first search calculation

231
00:17:35,980 --> 00:17:37,599
built these data structures.

232
00:17:37,599 --> 00:17:43,120
And now clients, these data structures built in the constructor

233
00:17:43,120 --> 00:17:49,640
serve as the basis for being able to efficiently answer

234
00:17:49,640 --> 00:17:51,319
client queries.

235
00:17:51,319 --> 00:17:54,119
That's a depth first search demo.

236
00:17:54,119 --> 00:17:56,879
So this is just a summary of the things

237
00:17:56,879 --> 00:17:59,679
I talked about during that demo.

238
00:17:59,679 --> 00:18:02,759
Our goal is to find all the vertices connected

239
00:18:02,759 --> 00:18:07,000
to a given vertex s and also a path

240
00:18:07,000 --> 00:18:09,879
in order to be able to answer client query.

241
00:18:09,879 --> 00:18:11,679
And the algorithm we're going to use

242
00:18:11,679 --> 00:18:16,679
is based on like maze exploration, where we use recursion.

243
00:18:16,679 --> 00:18:19,119
Mark each vertex, keep track of the edge.

244
00:18:19,119 --> 00:18:24,039
We took to visit it and return when there's no unvisited option.

245
00:18:24,039 --> 00:18:28,599
We're using two data structures to implement this.

246
00:18:28,599 --> 00:18:32,239
Both vertex indexed arrays, one named

247
00:18:32,239 --> 00:18:35,959
marked that will tell us which vertices we've been to.

248
00:18:35,959 --> 00:18:41,519
And another one, edge two, that maintains the tree of path,

249
00:18:41,519 --> 00:18:46,039
where edge two w equals v means the vw was taken

250
00:18:46,039 --> 00:18:48,559
the first time that we went to w.

251
00:18:48,559 --> 00:18:49,879
So now let's look at the code.

252
00:18:49,879 --> 00:18:53,480
Given all this background, the code for implementing depth

253
00:18:53,480 --> 00:18:57,039
for search is remarkably compact.

254
00:18:57,039 --> 00:18:59,639
So here's our private instance variables,

255
00:18:59,639 --> 00:19:03,200
the marked an edge two vertex indexed arrays in the source

256
00:19:03,200 --> 00:19:04,559
s.

257
00:19:04,559 --> 00:19:08,919
And the constructor just goes through and creates the arrays

258
00:19:08,919 --> 00:19:10,319
and initializes them.

259
00:19:10,319 --> 00:19:12,919
We won't repeat that code.

260
00:19:12,919 --> 00:19:17,839
And so here's the last thing the constructor does

261
00:19:17,839 --> 00:19:22,159
after it creates the arrays is does a DFS on the graph

262
00:19:22,159 --> 00:19:24,439
from the given source.

263
00:19:24,439 --> 00:19:29,119
And it's a remarkably compact implementation

264
00:19:29,119 --> 00:19:33,359
to do depth for search from a vertex v.

265
00:19:33,359 --> 00:19:36,959
What we do is mark v, that's it marked to true.

266
00:19:36,959 --> 00:19:42,039
And for everybody adjacent to v, we check if it's marked.

267
00:19:42,039 --> 00:19:46,359
If it's not marked, then we do a recursive call.

268
00:19:46,359 --> 00:19:50,879
And we set edge to w equals v.

269
00:19:50,879 --> 00:19:55,479
Again, remarkably compact code that gets the job done.

270
00:19:58,479 --> 00:20:00,759
So now let's look at some of the properties of depth

271
00:20:00,759 --> 00:20:02,000
for search.

272
00:20:02,000 --> 00:20:06,279
So first thing is we want to be sure

273
00:20:06,279 --> 00:20:11,319
that convinced ourselves that it marks all the vertices connected

274
00:20:11,319 --> 00:20:15,279
to s in time proportional to some of their degrees,

275
00:20:15,279 --> 00:20:18,559
which first bar is graph is going to be small.

276
00:20:18,559 --> 00:20:23,119
So first thing is convince yourself

277
00:20:23,119 --> 00:20:25,599
that if you mark the vertex, then there

278
00:20:25,599 --> 00:20:29,799
has to be a way to get to that vertex from s.

279
00:20:29,799 --> 00:20:33,440
And so well, that's easy to see because the only way

280
00:20:33,440 --> 00:20:37,200
to mark a vertex is get there through a sequence of recursive

281
00:20:37,200 --> 00:20:40,039
calls and every recursive call corresponds

282
00:20:40,039 --> 00:20:43,639
to an edge on a path from s to w.

283
00:20:43,640 --> 00:20:45,360
But you also have to be able to show

284
00:20:45,360 --> 00:20:50,040
that you get to every vertex that's connected to s.

285
00:20:50,040 --> 00:20:51,680
And that's a little more intricate.

286
00:20:51,680 --> 00:20:55,240
And this diagram is supposed to help you out

287
00:20:55,240 --> 00:20:57,680
in understanding that.

288
00:20:57,680 --> 00:21:04,360
If you had some unmarked vertex, then maybe there's

289
00:21:04,360 --> 00:21:07,040
a bunch of unmarked vertices.

290
00:21:07,040 --> 00:21:11,000
And so in its connected s and it's not marked,

291
00:21:11,000 --> 00:21:16,839
that means there has to be an edge on a path from s to w

292
00:21:16,839 --> 00:21:20,960
that goes from a marked vertex to an unmarked one.

293
00:21:20,960 --> 00:21:24,680
But the design of the algorithm says that there's no such edge.

294
00:21:24,680 --> 00:21:27,200
If you're on a marked vertex, then you're

295
00:21:27,200 --> 00:21:29,599
going to go through and look at all the adjacent ones.

296
00:21:29,599 --> 00:21:32,079
And if it's not marked, you're going to mark it.

297
00:21:32,079 --> 00:21:39,240
So that's an outline of the proof that DFS marks all the vertices.

298
00:21:39,240 --> 00:21:42,640
And in the running time, it only visits each marked vertex

299
00:21:42,640 --> 00:21:44,880
once or each vertex connected to s once.

300
00:21:44,880 --> 00:21:48,400
And so for each one of them, it goes

301
00:21:48,400 --> 00:21:49,880
through all the adjacent vertices.

302
00:21:49,880 --> 00:21:56,200
So that's the basic properties of depth research.

303
00:21:56,200 --> 00:22:00,960
So now the other thing that is important

304
00:22:00,960 --> 00:22:08,400
is that a client who uses this algorithm

305
00:22:08,400 --> 00:22:10,840
after the depth research, after the constructor

306
00:22:10,840 --> 00:22:14,160
has done the depth research and built these data structures,

307
00:22:14,160 --> 00:22:17,080
client can find the vertices connected

308
00:22:17,080 --> 00:22:22,560
to the source in constant time and can find a path to s

309
00:22:22,560 --> 00:22:25,519
if one exists in time proportion to its length.

310
00:22:25,519 --> 00:22:29,040
Well, the marked array provides the first part.

311
00:22:29,040 --> 00:22:37,680
And the second part is just a property of the edge

312
00:22:37,680 --> 00:22:39,720
to array.

313
00:22:39,720 --> 00:22:43,160
It's a what's called a parent-length representation

314
00:22:43,160 --> 00:22:45,960
of a tree rooted at s.

315
00:22:45,960 --> 00:22:49,400
So if a vertex is connected to s, then it's

316
00:22:49,400 --> 00:22:52,759
edge to its parent in the tree.

317
00:22:52,759 --> 00:22:59,080
So this code here is going to for a given well-haz path

318
00:22:59,080 --> 00:23:02,200
to, so that's just returned marked as the first part.

319
00:23:02,200 --> 00:23:06,640
And then to actually get the path to a given vertex.

320
00:23:06,640 --> 00:23:09,680
So here's the code for doing that.

321
00:23:09,680 --> 00:23:12,880
We actually use a stack to keep track of the path

322
00:23:12,880 --> 00:23:15,680
because we get it in reverse order.

323
00:23:15,680 --> 00:23:18,840
If there's no path, we return null.

324
00:23:18,840 --> 00:23:21,640
Otherwise, we keep a variable x.

325
00:23:21,640 --> 00:23:25,960
And we just follow up through the edge to array,

326
00:23:25,960 --> 00:23:30,160
pushing the vertex onto the stack,

327
00:23:30,160 --> 00:23:33,560
and then moving up the tree in the array,

328
00:23:33,560 --> 00:23:36,160
then finally push s itself onto the path.

329
00:23:36,160 --> 00:23:39,040
And then we have a stack, which is interval, which

330
00:23:39,040 --> 00:23:41,480
will give us our path.

331
00:23:41,480 --> 00:23:46,840
So that's in time proportional to the length of the path.

332
00:23:46,840 --> 00:23:49,720
And it's worthwhile to check your understanding

333
00:23:49,720 --> 00:23:52,800
of how stacks and iterator works, iterator's work,

334
00:23:52,800 --> 00:23:58,120
to take a look at this code to see that it does the job.

335
00:23:58,120 --> 00:24:00,800
So that's depth for search.

336
00:24:00,799 --> 00:24:06,039
Now, it's not the optimal graph searching method

337
00:24:06,039 --> 00:24:08,119
for all applications.

338
00:24:08,119 --> 00:24:12,000
And here's an amusing representation

339
00:24:12,000 --> 00:24:16,759
of how depth for search can maybe create problems sometimes.

340
00:24:16,759 --> 00:24:18,639
So I'm getting ready for a date.

341
00:24:18,639 --> 00:24:21,519
What situations do I prepare for?

342
00:24:21,519 --> 00:24:24,000
Well, medical emergency, dancing, food,

343
00:24:24,000 --> 00:24:25,759
too expensive.

344
00:24:25,759 --> 00:24:28,519
OK, what kind of medical emergencies could happen?

345
00:24:28,519 --> 00:24:31,160
Well, it could be snake bite or a lightning strike

346
00:24:31,160 --> 00:24:32,960
or fall from a chair.

347
00:24:32,960 --> 00:24:34,639
Well, what about snakes?

348
00:24:34,639 --> 00:24:37,079
I have to worry about cornstakes or garter

349
00:24:37,079 --> 00:24:39,200
snakes or crop or head.

350
00:24:39,200 --> 00:24:41,240
And then, well, I would have better make a strut

351
00:24:41,240 --> 00:24:44,000
and I would have better study snakes.

352
00:24:44,000 --> 00:24:46,400
And then the date says, I'm here to pick you up.

353
00:24:46,400 --> 00:24:48,440
You're not dressed.

354
00:24:48,440 --> 00:24:53,720
And well, so I really need to stop using depth for search.

355
00:24:53,720 --> 00:24:57,400
So we're going to look at other graph searching algorithms.

356
00:24:57,400 --> 00:25:02,040
But if you always try to expand the next thing

357
00:25:02,040 --> 00:25:04,120
that you come to, that's depth for search.

358
00:25:04,120 --> 00:25:06,560
And there's a lot of natural situations

359
00:25:06,560 --> 00:25:09,759
where that naturally comes to mind.

360
00:25:09,759 --> 00:25:11,360
Here's another example.

361
00:25:11,360 --> 00:25:14,440
I took this photo of the Taj Mahal a couple of years ago.

362
00:25:14,440 --> 00:25:17,920
And I didn't like the color of the sky.

363
00:25:17,920 --> 00:25:23,280
So I used Photoshop's magic wand to make it more blue

364
00:25:23,280 --> 00:25:24,920
in the implementation.

365
00:25:24,920 --> 00:25:26,519
Now, this is a huge graph.

366
00:25:26,519 --> 00:25:29,480
The pictures got millions of pixels.

367
00:25:29,480 --> 00:25:34,279
And the way that the flood filled the magic wand works

368
00:25:34,279 --> 00:25:37,799
is to build from a photo, what's called a grid graph,

369
00:25:37,799 --> 00:25:40,599
where every vertex is a pixel.

370
00:25:40,599 --> 00:25:44,319
And every edge connects to pixels

371
00:25:44,319 --> 00:25:47,519
that are the same color or approximately the same color.

372
00:25:47,519 --> 00:25:50,359
And it builds a blob of all the pixels that

373
00:25:50,359 --> 00:25:53,039
have the same color as a given pixel.

374
00:25:53,039 --> 00:25:55,759
So when I click on one, it does a depth for search

375
00:25:55,759 --> 00:25:59,079
to find all the connected pixels.

376
00:25:59,079 --> 00:26:02,759
And there are four change them to the new color.

377
00:26:02,759 --> 00:26:05,279
That's a fine example of depth for search

378
00:26:05,279 --> 00:26:09,640
on a huge graph that people use every day.

379
00:26:09,640 --> 00:26:12,079
So that's our first non-trivial graph processing

380
00:26:12,079 --> 00:26:14,720
algorithm, depth for search.

