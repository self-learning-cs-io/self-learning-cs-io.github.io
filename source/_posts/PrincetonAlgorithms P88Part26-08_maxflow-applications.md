---
title: PrincetonAlgorithms P88Part26 08_maxflow Applications
---

1
00:00:00,000 --> 00:00:10,480
Let's finish up by looking at some applications of max flow.

2
00:00:10,480 --> 00:00:16,600
Like shortest paths, max flow is a very widely applicable problem solving model.

3
00:00:16,600 --> 00:00:19,960
This is really important to recognize at this stage.

4
00:00:19,960 --> 00:00:23,960
We've looked at a lot of algorithms for solving specific problems and they're important

5
00:00:23,960 --> 00:00:27,920
problems and it's important to have efficient algorithms for solving them.

6
00:00:27,920 --> 00:00:34,640
But when you have something like max flow or shortest paths, the importance that we attach

7
00:00:34,640 --> 00:00:41,560
to them is really magnified by the idea that they have this property that if they're a

8
00:00:41,560 --> 00:00:49,240
very general way to state a problem and we have many, many practical situations that we

9
00:00:49,240 --> 00:00:53,079
can cast in terms of these problems.

10
00:00:53,079 --> 00:00:59,039
We looked at arbitrage, reducing down to a shortest paths problem and we'll look at a

11
00:00:59,039 --> 00:01:03,599
bunch of problems that don't seem to be related at all that can be modeled as max flow

12
00:01:03,599 --> 00:01:04,879
problems.

13
00:01:04,879 --> 00:01:12,159
So they're extremely important because they're problem solving models that work for a broad

14
00:01:12,159 --> 00:01:14,439
variety of important applications.

15
00:01:14,439 --> 00:01:19,359
Number one, that wouldn't be any good if we didn't have efficient algorithms for solving them.

16
00:01:19,359 --> 00:01:24,319
But we do have efficient algorithms for solving them and so that magnifies their importance.

17
00:01:24,319 --> 00:01:30,280
And that's why people work so hard on finding efficient algorithms for solving these problems

18
00:01:30,280 --> 00:01:33,359
and we'll talk about that as well in a minute.

19
00:01:33,359 --> 00:01:41,640
So these are again just a few of the many, many algorithms applications of max flow.

20
00:01:41,640 --> 00:01:47,319
We saw an image processing algorithm called seam carving for shortest paths.

21
00:01:47,319 --> 00:01:51,279
There's another one called segmentation for max flow.

22
00:01:51,279 --> 00:01:58,280
Again, if you have an image and you have one vertex per pixel, you have a huge, huge graph.

23
00:01:58,280 --> 00:02:04,639
And you have many explicit, huge graphs and we talked about those types of things.

24
00:02:04,639 --> 00:02:12,719
But there are other things where the graph is an abstraction that it gets involved in the

25
00:02:12,719 --> 00:02:19,319
model of the abstract graph and the max flow problem is maybe a bit surprising at first.

26
00:02:19,319 --> 00:02:23,960
And we'll look at a couple examples of that to illustrate the point.

27
00:02:23,960 --> 00:02:28,000
Over here is a medical example having to do with it.

28
00:02:28,000 --> 00:02:31,280
That's the image processing one on a medical example.

29
00:02:31,280 --> 00:02:35,639
Help identify some important part of a medical image.

30
00:02:35,639 --> 00:02:42,319
So we'll look at a couple of examples to emphasize the idea of a general problem solving

31
00:02:42,319 --> 00:02:49,159
model that once we have an efficient algorithm, then we can think about using the problem solving

32
00:02:49,159 --> 00:02:50,159
model.

33
00:02:50,159 --> 00:02:57,079
And later on, we'll see that this concept of a general problem solving model has really

34
00:02:57,079 --> 00:03:01,759
profound implications and we'll be looking at that later on.

35
00:03:01,759 --> 00:03:04,560
So let's just look at a couple of examples.

36
00:03:04,560 --> 00:03:09,639
Here's one called the bipartite matching problem.

37
00:03:09,639 --> 00:03:16,919
So you have this is a bit of an idealized situation but it works in more messy real life situations

38
00:03:16,919 --> 00:03:17,919
too.

39
00:03:17,919 --> 00:03:22,159
So there's N jobs out there and N students apply for them.

40
00:03:22,159 --> 00:03:27,239
And we'll use a small example where there's five students and five jobs but of course in

41
00:03:27,239 --> 00:03:29,919
the real world this can be huge.

42
00:03:29,919 --> 00:03:35,679
Now during hiring season, the students go out and apply for the jobs and they each get

43
00:03:35,679 --> 00:03:38,000
a bunch of offers.

44
00:03:38,000 --> 00:03:43,479
So looking at it from the student's point of view, Alice gets offers from Adobe Amazon

45
00:03:43,479 --> 00:03:45,680
and Google.

46
00:03:45,680 --> 00:03:49,319
Adobe makes offers to Alice Bob and Carol and like that.

47
00:03:49,319 --> 00:03:56,599
So this association between students and jobs, everybody gets several offers.

48
00:03:56,599 --> 00:04:04,159
And the question is, well, would be good if everybody got a job, right?

49
00:04:04,159 --> 00:04:09,240
And the question is, is there some way for everybody to get a job?

50
00:04:09,240 --> 00:04:17,560
That's called the bipartite matching problem and it comes up in lots of forms directly related

51
00:04:17,560 --> 00:04:19,240
to graph processing.

52
00:04:19,240 --> 00:04:29,000
Now we could study and people do study algorithms for explicitly solving this particular problem.

53
00:04:29,000 --> 00:04:33,759
But what I want to emphasize is that actually max lows are reasonable model for it.

54
00:04:33,759 --> 00:04:37,839
So we can use our efficient max low implementation to get it solved.

55
00:04:37,839 --> 00:04:43,399
We don't have to come up with a specialized algorithm for this problem.

56
00:04:43,399 --> 00:04:48,579
So in terms of graphs, it's called a bipartite matching problem, given a bipartite graph

57
00:04:48,579 --> 00:04:50,800
find a perfect matching.

58
00:04:50,800 --> 00:04:57,480
And a bipartite graph is one where you have two sets of vertices, in this case one corresponding

59
00:04:57,480 --> 00:05:01,159
to students and another corresponding to companies.

60
00:05:01,160 --> 00:05:06,640
And you have every edge in the graph goes from one type of vertex to the other type of

61
00:05:06,640 --> 00:05:08,280
vertex.

62
00:05:08,280 --> 00:05:17,720
And a matching in the graph is a set of edges that are disjoint that just connect two vertices.

63
00:05:17,720 --> 00:05:20,760
But that's it.

64
00:05:20,760 --> 00:05:24,200
And so in this case, there's a perfect matching.

65
00:05:24,200 --> 00:05:28,960
Works out that if Alice takes the Google job and Bob takes the Adobe job and Carol takes

66
00:05:28,959 --> 00:05:33,959
a Facebook job and like that, then everybody gets a job.

67
00:05:33,959 --> 00:05:36,359
So that's a perfect matching.

68
00:05:36,359 --> 00:05:41,839
But you can also have a situation where that's not possible.

69
00:05:41,839 --> 00:05:45,319
So let's look at how to formulate.

70
00:05:45,319 --> 00:05:48,000
The one thing is how do we find the matching?

71
00:05:48,000 --> 00:05:51,560
And then the other thing is is there one.

72
00:05:51,560 --> 00:05:54,599
So this is easy to formulate as a network flow problem.

73
00:05:54,599 --> 00:05:57,039
That's what this diagram shows.

74
00:05:57,040 --> 00:06:00,720
So what we'll do is we'll create our source and target vertices.

75
00:06:00,720 --> 00:06:07,480
We'll have one vertex for each student, one vertex for each company in the flow network.

76
00:06:07,480 --> 00:06:13,280
And we'll add a capacity one edge from S to each student.

77
00:06:13,280 --> 00:06:19,000
And a capacity one edge from T to T, from each company to T.

78
00:06:19,000 --> 00:06:26,000
And then it doesn't matter what the capacity will add an infinite capacity edge from each

79
00:06:26,000 --> 00:06:29,519
student to each job offered.

80
00:06:29,519 --> 00:06:33,160
And then we'll ask for a maximum flow in this graph.

81
00:06:33,160 --> 00:06:44,160
So you can see that the flow every augmenting path has to go from S to a student to a company

82
00:06:44,160 --> 00:06:46,160
to T.

83
00:06:46,160 --> 00:06:52,560
And so the flow will give us the matching.

84
00:06:52,560 --> 00:06:55,319
Let's see how it works.

85
00:06:55,319 --> 00:07:01,719
This is a one-to-one correspondence between perfect matchings of bipartite graphs and

86
00:07:01,719 --> 00:07:04,920
integer value max flows.

87
00:07:04,920 --> 00:07:15,120
So in this case, there's a flow of value 5 and that flow gives us the matching immediately.

88
00:07:15,120 --> 00:07:21,319
So what the min cut tells us if there's a no perfect matching, explain why.

89
00:07:21,319 --> 00:07:28,639
So here's an example that maybe could have happened with the job offers.

90
00:07:28,639 --> 00:07:42,519
And when the algorithm terminates with a cut, where a cut of the bipartite graph, which

91
00:07:42,519 --> 00:07:46,319
separates 2, 4, 5 from 7 and 10.

92
00:07:46,319 --> 00:07:53,560
And essentially the cut tells us that students in 2, 4, 5 can only be matched to companies

93
00:07:53,560 --> 00:07:54,560
7 and 10.

94
00:07:54,560 --> 00:07:59,159
You can see all the edges from 2, 4, 5 go to 7 and 10.

95
00:07:59,159 --> 00:08:01,560
So you have two companies in three students.

96
00:08:01,560 --> 00:08:06,199
So there's no way that everybody can be matched.

97
00:08:06,199 --> 00:08:09,159
Somebody's going to be left out.

98
00:08:09,160 --> 00:08:14,080
So that's the students.

99
00:08:14,080 --> 00:08:18,439
So there'll be a min cut and the s will be the students on the s side and t will be the

100
00:08:18,439 --> 00:08:20,600
companies on the s side.

101
00:08:20,600 --> 00:08:25,440
And if it's bigger than s is bigger than t, then you can't have a matching.

102
00:08:25,440 --> 00:08:32,360
So in this case, there's only four jobs and somebody's going to be left out.

103
00:08:32,360 --> 00:08:38,440
It's also interesting to trace through what happens with the max flow algorithm on bipartite

104
00:08:38,440 --> 00:08:41,120
graphs like this.

105
00:08:41,120 --> 00:08:47,200
Essentially augmenting paths or usually forward edges makes some matchings.

106
00:08:47,200 --> 00:08:55,000
And then if it's possible to find a path that undoes some matching, it zigzags through

107
00:08:55,000 --> 00:09:01,840
undoing matchings and trying other ones to find a way through to the target.

108
00:09:01,840 --> 00:09:09,000
But if there's no perfect matching, there'll be a min cut and that one will explain why.

109
00:09:09,000 --> 00:09:15,240
So that's a problem, the bipartite matching problem, that we can model as a max flow algorithm

110
00:09:15,240 --> 00:09:19,960
and just use our existing code to solve it.

111
00:09:19,960 --> 00:09:22,160
Here's another one that's even further away.

112
00:09:22,160 --> 00:09:27,360
It doesn't seem to have a graph at all, but it does.

113
00:09:27,360 --> 00:09:31,000
It's called a baseball elimination problem.

114
00:09:31,000 --> 00:09:40,639
This is again, just to show the breadth of applicability of the max flow model.

115
00:09:40,639 --> 00:09:45,960
And it's interesting at certain times you're getting near the end of the baseball season.

116
00:09:45,960 --> 00:09:52,240
And often you'll hear on the news, you see in the paper or see on the web that your team

117
00:09:52,240 --> 00:09:56,080
is mathematically eliminated.

118
00:09:56,080 --> 00:10:01,879
Usually most of the time they don't really get that right because they don't do the

119
00:10:01,879 --> 00:10:05,440
computation that we're going to talk about next.

120
00:10:05,440 --> 00:10:06,879
Sometimes it's easy.

121
00:10:06,879 --> 00:10:09,840
This is an example where it's easy.

122
00:10:09,840 --> 00:10:12,680
So we've got four teams.

123
00:10:12,680 --> 00:10:15,879
They already have this win-loss record.

124
00:10:15,879 --> 00:10:19,400
And this is the number of games to play.

125
00:10:19,399 --> 00:10:27,360
So in this case, Montréal has only three games to play.

126
00:10:27,360 --> 00:10:32,720
So the best they could do is win 80.

127
00:10:32,720 --> 00:10:36,919
But Atlanta's already got 83 wins, so there's no way Montréal is going to win.

128
00:10:36,919 --> 00:10:41,079
So that's a mathematical elimination that anyone can figure out.

129
00:10:41,079 --> 00:10:46,159
Usually in Newspaper we'll get that one right.

130
00:10:46,159 --> 00:10:49,039
But sometimes it's more complicated.

131
00:10:49,039 --> 00:10:51,319
Phil, let's say this case.

132
00:10:51,319 --> 00:10:56,959
So Philly has 80 wins, three games to play.

133
00:10:56,959 --> 00:11:00,519
So the best they can do is 83 wins.

134
00:11:00,519 --> 00:11:02,959
So that's interesting.

135
00:11:02,959 --> 00:11:11,799
But the thing is that Atlanta has a bunch of games against, it's got six games against

136
00:11:11,799 --> 00:11:13,720
the mats.

137
00:11:13,720 --> 00:11:19,279
And either Atlanta wins one of them, which would give Atlanta 84 wins, or the mats win

138
00:11:19,279 --> 00:11:25,240
all of them, in which case they get 84 wins, either way Philly, Dalfias mathematically

139
00:11:25,240 --> 00:11:26,879
eliminated.

140
00:11:26,879 --> 00:11:33,519
That's a bit more complicated decision about which team wins.

141
00:11:33,519 --> 00:11:39,200
The thing is, and there's many more complicated situations that show up.

142
00:11:39,200 --> 00:11:45,160
And the observation just from these two easy examples is that you can't figure out who's

143
00:11:45,160 --> 00:11:50,920
mathematically eliminated without knowing the full schedule of games.

144
00:11:50,920 --> 00:11:55,280
It depends not only on how many games have already won, how many are left to play, but

145
00:11:55,280 --> 00:11:59,879
it depends on the schedule and who's playing who.

146
00:11:59,879 --> 00:12:06,600
And usually your average sports writer is not going to do that computation without a computer.

147
00:12:06,600 --> 00:12:12,840
I hope that one of you becomes a sports writer and puts us in for the future for us.

148
00:12:12,840 --> 00:12:16,240
So let's look at a more complicated situation.

149
00:12:16,240 --> 00:12:24,519
So this is the American League East a while ago, near the end of the season.

150
00:12:24,519 --> 00:12:31,440
The question is, which teams are mathematically eliminated and which ones aren't?

151
00:12:31,440 --> 00:12:41,160
Now in this case, it turns out that this is pretty far from the end of the season actually,

152
00:12:41,160 --> 00:12:44,320
this 27 games to finish.

153
00:12:44,320 --> 00:12:52,640
And this is a proof here that Detroit is mathematically eliminated, but it's a pretty complicated

154
00:12:52,639 --> 00:12:53,639
argument.

155
00:12:53,639 --> 00:13:00,679
And well, you can reason it out with arithmetic.

156
00:13:00,679 --> 00:13:07,319
The tough part is to figure out the set of teams here are.

157
00:13:07,319 --> 00:13:11,960
So what we're going to see is that you can do a max low computation to figure out this

158
00:13:11,960 --> 00:13:12,960
set of teams.

159
00:13:12,960 --> 00:13:16,559
And let's just look at it for this example.

160
00:13:16,559 --> 00:13:21,120
So at this point, Detroit is mathematically eliminated.

161
00:13:21,120 --> 00:13:31,840
And so it's got 27 games to play, so it could, in theory, win 76 of the games.

162
00:13:31,840 --> 00:13:40,519
Now the logic that will convince you that they are eliminated is that if you take the four

163
00:13:40,519 --> 00:13:50,320
teams, the other four teams and add up all their wins, there's 278 of them.

164
00:13:50,320 --> 00:13:56,280
When you look at the remaining games, there's 27, so somebody's got to win every one of those

165
00:13:56,280 --> 00:13:57,600
games.

166
00:13:57,600 --> 00:14:05,960
The total number of games won for that set of teams is 305.

167
00:14:05,960 --> 00:14:11,280
And if you divide by four, it means the average is 76.25.

168
00:14:11,280 --> 00:14:17,920
And right there is a proof that one of them has got to win 77 games.

169
00:14:17,919 --> 00:14:24,159
That takes a little thought, but if you have the four teams, then from the remaining games,

170
00:14:24,159 --> 00:14:28,319
you can figure out that Detroit is mathematically eliminated.

171
00:14:28,319 --> 00:14:31,559
But the key is how do we find those four teams?

172
00:14:31,559 --> 00:14:36,919
And the answer, as I've already said, is it's max flow.

173
00:14:36,919 --> 00:14:45,439
And so this is a max flow network that can be used to solve the baseball elimination problem.

174
00:14:45,440 --> 00:14:54,520
So the intuition is that you have a source vertex, and you have what happens in the remaining

175
00:14:54,520 --> 00:15:01,280
games flowing from the source to the target.

176
00:15:01,280 --> 00:15:08,140
So here we're trying to prove that team four is, we're trying to decide if team four is

177
00:15:08,140 --> 00:15:09,140
eliminated or not.

178
00:15:09,140 --> 00:15:11,720
That's Detroit in this case.

179
00:15:11,720 --> 00:15:17,960
And so what we need is a vertex for each pair of vertices that are not the team we're interested

180
00:15:17,960 --> 00:15:19,460
in.

181
00:15:19,460 --> 00:15:26,160
And so that's going to relate to all the remaining games between the other pairs of teams.

182
00:15:26,160 --> 00:15:32,279
And then you have an edge from the source to each one of those vertices.

183
00:15:32,279 --> 00:15:38,480
And the capacity of the edge is the number of games left between those two.

184
00:15:38,480 --> 00:15:41,000
So that's on one end.

185
00:15:41,000 --> 00:15:44,679
And then you have a vertex for each team.

186
00:15:44,679 --> 00:15:51,399
And then what we do for each one of these pair vertices, we put infinite capacity edges

187
00:15:51,399 --> 00:15:54,000
to the two teams involved.

188
00:15:54,000 --> 00:15:58,360
So the flow is going to be an integer flow, and some of it will go one way, and some of

189
00:15:58,360 --> 00:16:00,559
it will go the other way.

190
00:16:00,559 --> 00:16:06,759
But then for each of the teams, what we're going to do is make sure that they don't win

191
00:16:06,759 --> 00:16:11,960
more games than team four that team we're interested in.

192
00:16:11,960 --> 00:16:17,480
So we'll put this upper bound on the flow here that we will let the number of wins get

193
00:16:17,480 --> 00:16:24,039
better than what our team of interest team four can do.

194
00:16:24,039 --> 00:16:33,480
And the fact is that if you compute a max flow of this, you can convince yourself that if

195
00:16:33,480 --> 00:16:42,039
you can fill this network up going from S in the max flow, then team four is not going

196
00:16:42,039 --> 00:16:43,560
to be eliminated.

197
00:16:43,560 --> 00:16:47,399
Nobody's going to get more wins than team four.

198
00:16:47,399 --> 00:16:54,800
And so the way to solve the baseball elimination problem is to run max flow on this network.

199
00:16:54,800 --> 00:17:01,240
And the men cut will give the set of teams, sorry, men cut will give the set of teams that

200
00:17:01,240 --> 00:17:07,720
you needed in this calculation to figure out, to prove to a friend or to a sports writer

201
00:17:07,720 --> 00:17:12,319
that the team you're interested in is eliminated.

202
00:17:12,319 --> 00:17:14,960
An interesting application of max flow.

203
00:17:14,960 --> 00:17:20,400
And again, we just take our problem, use it to build a network, solve the problem on

204
00:17:20,400 --> 00:17:28,400
the network using our existing code, and translate that solution to our original problem.

205
00:17:28,400 --> 00:17:32,240
This is called reduction and it's a very important technique that we're going to use.

206
00:17:32,240 --> 00:17:37,160
I'm going to talk about in some detail later on.

207
00:17:37,160 --> 00:17:42,519
So now we come to the theory of max flow algorithms.

208
00:17:42,519 --> 00:17:50,519
This is an even hotter area than minimum spanish, short as fast that we've looked at before

209
00:17:50,519 --> 00:17:56,880
in that it's a very frustrating situation for theoretical computer scientists in that

210
00:17:56,880 --> 00:18:01,960
we have this relatively straightforward to state algorithm.

211
00:18:01,960 --> 00:18:06,520
And we have this all designed freedom, the forward focus in algorithm is lots and lots

212
00:18:06,520 --> 00:18:10,600
of ways that we could try to find augmenting paths.

213
00:18:10,600 --> 00:18:18,360
And there's even other methods that don't use forward focus in that are almost as simple.

214
00:18:18,360 --> 00:18:24,120
And the question is how difficult is it to solve the max flow problem?

215
00:18:24,119 --> 00:18:28,959
And there's literally hundreds of papers in the scientific literature that are oriented

216
00:18:28,959 --> 00:18:31,399
at trying to solve this problem.

217
00:18:31,399 --> 00:18:40,279
Now again, theoretical computer scientists are trying to find an algorithm that's guaranteed

218
00:18:40,279 --> 00:18:42,599
to work well in the worst case.

219
00:18:42,599 --> 00:18:48,279
So they're just counting the number of edges that the algorithms examine in the worst case.

220
00:18:48,680 --> 00:18:55,480
When related to practical graphs, these are very, very conservative upper bounds.

221
00:18:55,480 --> 00:18:58,279
And the real performance is going to be totally different.

222
00:18:58,279 --> 00:19:02,519
So you can't use these to compare the performance of given algorithms.

223
00:19:02,519 --> 00:19:08,319
The performance of given algorithms really depends on the characteristic of network.

224
00:19:08,319 --> 00:19:14,240
But still there's a huge gap between the best algorithms that we know.

225
00:19:14,240 --> 00:19:22,279
And the most recent one was discovered just this year that can guarantee e squared over log

226
00:19:22,279 --> 00:19:27,759
e number of edges examine to try to find the max flow.

227
00:19:27,759 --> 00:19:38,720
And so that's fine, but that's a huge gap between and very small compared to say shortest

228
00:19:38,720 --> 00:19:43,559
augmenting path, which is e cubed essentially.

229
00:19:43,559 --> 00:19:50,640
And that's fine, but actually in practice, the running time of many of the algorithms seems

230
00:19:50,640 --> 00:19:54,360
to be relatively small factor of e.

231
00:19:54,360 --> 00:19:58,559
And no one can prove that there might not exist an algorithm.

232
00:19:58,559 --> 00:20:04,559
No one has proved yet that there might not exist an algorithm that gets the job done in linear

233
00:20:04,559 --> 00:20:05,559
time.

234
00:20:05,559 --> 00:20:11,480
So I want to be exciting things about studying the field of algorithms is there's still room

235
00:20:11,480 --> 00:20:19,240
to find, to discover interesting and innovative algorithms that could have a huge practical impact.

236
00:20:19,240 --> 00:20:25,759
Because we have algorithms that one run well on practical networks, lots and lots of important

237
00:20:25,759 --> 00:20:27,639
practical applications use them.

238
00:20:27,639 --> 00:20:34,240
And if someone were to discover a fast practical guaranteed linear time algorithm,

239
00:20:34,240 --> 00:20:38,759
they would immediately have huge impact.

240
00:20:38,759 --> 00:20:44,319
So that's the first warning with the worst case sort of growth.

241
00:20:44,319 --> 00:20:48,240
You're not going to compare algorithms in practice.

242
00:20:48,240 --> 00:20:54,160
And there's plenty of research papers out there that have done empirical studies on the

243
00:20:54,160 --> 00:21:03,759
max flow algorithm for realistic networks in the so-called best so far in practice, as

244
00:21:03,759 --> 00:21:09,319
you've noticed, the push relabel method with gap relabeling, which runs in time e2v,

245
00:21:09,319 --> 00:21:11,279
where e is a number of edges.

246
00:21:11,279 --> 00:21:19,000
And again, even that in practical networks is going to run faster than that.

247
00:21:19,000 --> 00:21:24,359
So there's numerous research challenges still to be addressed in studying the max flow problem.

248
00:21:24,359 --> 00:21:30,640
There's plenty of practitioners that are using codes like the ones that we've shown and

249
00:21:30,640 --> 00:21:37,759
variations to try to solve huge real max flow and cut problems and try to get them done

250
00:21:37,759 --> 00:21:39,720
in linear time.

251
00:21:39,720 --> 00:21:45,520
There's many theoretical computer scientists that are trying to prove that there exists or

252
00:21:45,520 --> 00:21:51,200
not exists a max flow algorithm that is guaranteed to run in linear time, no matter what the

253
00:21:51,200 --> 00:21:52,200
input.

254
00:21:52,200 --> 00:21:57,680
There's many, many people doing research and there's still a great deal to be learned.

255
00:21:57,680 --> 00:22:02,880
So a fine example of why it's exciting to be working in the field of algorithms.

256
00:22:02,880 --> 00:22:10,480
There's opportunity for new knowledge still available and many people still working on them.

