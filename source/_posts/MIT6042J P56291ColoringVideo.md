---
title: MIT6042J P56291ColoringVideo
---

1
00:00:00,000 --> 00:00:07,500
Graph coloring is the abstract version of a problem that arises from a bunch of conflict scheduling

2
00:00:07,500 --> 00:00:08,500
situations.

3
00:00:08,500 --> 00:00:12,660
So let's look at an example first and then define the problem.

4
00:00:12,660 --> 00:00:18,780
So let's think about a bunch of aircraft that have to be scheduled on the ground, jet

5
00:00:18,780 --> 00:00:20,500
ports or gates.

6
00:00:20,500 --> 00:00:24,740
Now if two flights are on the ground at the same time, they need to be assigned to different

7
00:00:24,740 --> 00:00:27,660
gates since the gate serves one airplane.

8
00:00:27,660 --> 00:00:32,700
And what we'd like to do is try to figure out how many different gates do we need to be

9
00:00:32,700 --> 00:00:36,780
able to service all the planes that might be on the ground.

10
00:00:36,780 --> 00:00:38,060
How many gates are needed?

11
00:00:38,060 --> 00:00:40,100
So let's look at a sample schedule.

12
00:00:40,100 --> 00:00:44,000
There are six flights here, number 122, 145 through 99.

13
00:00:44,000 --> 00:00:49,960
And the horizontal bar is, say, times during the day.

14
00:00:49,960 --> 00:00:56,719
And this blue block indicates that flight 122 is on the ground from, let's say, 3am to

15
00:00:56,719 --> 00:01:02,879
7am and flight 145 is on the ground at a completely different, disjoint time interval.

16
00:01:02,879 --> 00:01:03,879
So 67.

17
00:01:03,879 --> 00:01:10,280
257 is on the ground from midnight until about 6am, it does overlap with 122 and so on.

18
00:01:10,280 --> 00:01:16,480
So this is the information we have and what we're trying to figure out is how many gates do

19
00:01:16,480 --> 00:01:17,480
we need.

20
00:01:17,480 --> 00:01:23,759
Well, it's easy to see here that the worst case, if you just think of this vertical green

21
00:01:23,760 --> 00:01:30,160
line sliding across the bar and you look at the maximum number of blue intervals that

22
00:01:30,160 --> 00:01:33,080
the green line ever crosses, it's three.

23
00:01:33,080 --> 00:01:38,040
The largest number of planes that are on the gate at any given moment is three, which

24
00:01:38,040 --> 00:01:40,760
means we can get by with three gates.

25
00:01:40,760 --> 00:01:42,760
So we have to cope with that conflict.

26
00:01:42,760 --> 00:01:49,240
So abstractly, what we're going to do is assign each aircraft to be a vertex of a graph.

27
00:01:49,239 --> 00:01:55,439
And we're going to put an edge in to indicate not compatibility, but conflict.

28
00:01:55,439 --> 00:01:59,560
Compatibility was what we were looking at previously with our examples of matching.

29
00:01:59,560 --> 00:02:05,079
Now this line means that 306 and 145 are on the ground at the same time.

30
00:02:05,079 --> 00:02:06,199
They conflict.

31
00:02:06,199 --> 00:02:10,479
They need the same gate and we have to serve them with different gates.

32
00:02:10,479 --> 00:02:14,479
And likewise, 99 and 145 are on the ground, 306 and 99.

33
00:02:14,479 --> 00:02:18,799
This was the three flights that were on the ground at the same time.

34
00:02:18,799 --> 00:02:23,599
And then if I fill in the graph with all the other vertices and draw an edge when two

35
00:02:23,599 --> 00:02:27,479
flights are on the ground at the same time, I wind up with this little graph.

36
00:02:27,479 --> 00:02:28,479
Okay.

37
00:02:28,479 --> 00:02:33,519
Now we can talk abstractly about the coloring problem, which is let's assign colors to the

38
00:02:33,519 --> 00:02:42,159
vertices in such a way that no two adjacent vertices have the same color.

39
00:02:42,159 --> 00:02:45,199
The adjacent vertices should have different colors.

40
00:02:45,199 --> 00:02:51,280
And it should be clear from the description of how we derive this graph from the airline

41
00:02:51,280 --> 00:02:58,439
aircraft schedules that the minimum number of distinct colors needed to color the graph

42
00:02:58,439 --> 00:03:03,479
corresponds to the minimum number of gates needed to serve the aircraft.

43
00:03:03,479 --> 00:03:04,919
So let's try coloring this graph.

44
00:03:04,919 --> 00:03:11,280
I'll start with coloring for 257 red and 122 yellow and 99 green.

45
00:03:11,280 --> 00:03:14,599
There's no loss of generality here because these are the three that are on the ground at

46
00:03:14,599 --> 00:03:18,120
the same time reflected by the fact that they're in a triangle.

47
00:03:18,120 --> 00:03:21,400
And I'm going to have to use three different colors since each one is adjacent to the other

48
00:03:21,400 --> 00:03:22,400
two.

49
00:03:22,400 --> 00:03:23,400
Okay.

50
00:03:23,400 --> 00:03:24,400
What next?

51
00:03:24,400 --> 00:03:25,400
Well, let's color 145 yellow.

52
00:03:25,400 --> 00:03:30,439
I might as well reuse it since it's not adjacent to a yellow vertex.

53
00:03:30,439 --> 00:03:34,560
And then here I've got another triangle.

54
00:03:34,560 --> 00:03:38,800
So if I'm not going to use an extra color, the sensible thing to do would be to color that

55
00:03:38,800 --> 00:03:39,800
red.

56
00:03:39,800 --> 00:03:40,800
But oops, I didn't do that.

57
00:03:40,800 --> 00:03:44,960
And here there's another triangle, I guess, that allows me to color.

58
00:03:44,960 --> 00:03:48,439
And then I color this black because here I'm stuck.

59
00:03:48,439 --> 00:03:53,760
I'm adjacent to both a yellow, a black and a green vertex.

60
00:03:53,760 --> 00:03:56,439
So I have to come up with a fourth color.

61
00:03:56,439 --> 00:03:57,439
All right.

62
00:03:57,439 --> 00:03:58,439
We did with four colors.

63
00:03:58,439 --> 00:04:03,720
It means that we could have gotten away with four gates and the colors tell us which aircraft

64
00:04:03,720 --> 00:04:04,920
to assign to which gates.

65
00:04:04,920 --> 00:04:10,439
So 257 and 67 can both be assigned to the red gate because they are not on the ground

66
00:04:10,439 --> 00:04:11,879
at the same time.

67
00:04:11,879 --> 00:04:13,520
There's no edge between them.

68
00:04:13,520 --> 00:04:17,600
122 and 145 can be assigned to yellow gate and so on.

69
00:04:17,600 --> 00:04:20,360
Now this was not the smartest way to color.

70
00:04:20,360 --> 00:04:21,879
A better coloring is shown here.

71
00:04:21,879 --> 00:04:25,439
You can check that every two adjacent vertices have different colors.

72
00:04:25,439 --> 00:04:30,360
And now I've done it with only three colors, red, yellow and green.

73
00:04:30,360 --> 00:04:34,319
So now there are three gates and I get a better schedule.

74
00:04:34,319 --> 00:04:39,000
Another example of this kind of conflict problem comes up with scheduling final exams.

75
00:04:39,000 --> 00:04:43,759
Two subjects conflict if a student is taking both.

76
00:04:43,759 --> 00:04:47,800
Because if a student is taking both, I can't have the final exams at the same time.

77
00:04:47,800 --> 00:04:53,759
And so I need to assign different time slots during exam period to subjects that overlap

78
00:04:53,759 --> 00:04:55,759
that have a student in common.

79
00:04:55,759 --> 00:05:02,079
And then the question is given this data about which pairs of subjects have a student in

80
00:05:02,079 --> 00:05:06,680
common, we want to know how short an exam period can we get away with.

81
00:05:06,680 --> 00:05:10,600
Again, it becomes a simple graph model and a coloring problem.

82
00:05:10,600 --> 00:05:13,879
So here we've drawn a graph with some sample subjects.

83
00:05:13,879 --> 00:05:17,959
6042 and 1802 have a student in common.

84
00:05:17,959 --> 00:05:19,400
That's what that edge means.

85
00:05:19,400 --> 00:05:23,000
They need to have final exam scheduled at different times.

86
00:05:23,000 --> 00:05:27,160
Likewise, 802 and 6042 have a student in common.

87
00:05:27,160 --> 00:05:29,480
So they need to be scheduled at different times.

88
00:05:29,480 --> 00:05:37,319
On the other hand, 6042 and 1802, sorry, what are some two that are not adjacent?

89
00:05:37,319 --> 00:05:44,680
3091 and 1802 have no edge between them, which means that they can be scheduled at the same

90
00:05:44,680 --> 00:05:45,680
time.

91
00:05:45,680 --> 00:05:51,640
There's no student who's taking both 3091 and 1802, at least according to the data in this

92
00:05:51,640 --> 00:05:52,640
graph.

93
00:05:52,640 --> 00:05:54,040
So let's try coloring it.

94
00:05:54,040 --> 00:05:55,800
And again, there's a triangle.

95
00:05:55,800 --> 00:05:59,439
I'm going to have to use three different colors for a triangle.

96
00:05:59,439 --> 00:06:01,600
And here's another triangle.

97
00:06:01,600 --> 00:06:06,879
And to be economical, let's just reuse green.

98
00:06:06,879 --> 00:06:13,040
Now here I've got another vertex that's adjacent to three different color vertices.

99
00:06:13,040 --> 00:06:15,879
And so it's going to have to be colored with a fourth color.

100
00:06:15,879 --> 00:06:18,480
This time it turns out that the four colors are best possible.

101
00:06:18,480 --> 00:06:19,639
You can check that.

102
00:06:19,639 --> 00:06:27,480
And it corresponds to a schedule in which the 6042 is scheduled on Monday morning at 9.

103
00:06:27,480 --> 00:06:31,800
And 6.001 is scheduled on Monday at 1.

104
00:06:31,800 --> 00:06:36,319
But 802 and 3091 can both be scheduled for Tuesday 9 am.

105
00:06:36,319 --> 00:06:41,960
And finally, 1802 is scheduled on Tuesday at 1 pm.

106
00:06:41,960 --> 00:06:48,560
OK, so this kind of a conflict modeling situation comes up all the time.

107
00:06:48,560 --> 00:06:52,800
Another place where you get these kind of compatibility graphs or incompatibility graphs

108
00:06:52,800 --> 00:06:56,000
that you want to color would be if you were running a zoo.

109
00:06:56,000 --> 00:07:01,360
And you had to have separate habitats for certain kinds of species of animals that you don't

110
00:07:01,360 --> 00:07:03,360
want to mix together.

111
00:07:03,360 --> 00:07:04,639
Big fish eat little fish.

112
00:07:04,639 --> 00:07:06,959
It's a truism in the aquarium world.

113
00:07:06,959 --> 00:07:10,879
And so you need to keep big fish separate from little fish.

114
00:07:10,879 --> 00:07:15,360
And you don't want the tigers living together with the chimpanzees.

115
00:07:15,360 --> 00:07:20,160
So we could, again, model this problem as how many cages do we need?

116
00:07:20,160 --> 00:07:25,480
We create a vertex for each species and put an arrow between an edge between two species

117
00:07:25,480 --> 00:07:30,560
that mustn't share a habitat or share a cage.

118
00:07:30,560 --> 00:07:35,080
Another one would be assigning different frequencies to radio stations.

119
00:07:35,080 --> 00:07:40,480
And again, if two radio stations are close to each other, they will interfere.

120
00:07:40,480 --> 00:07:44,120
And so they have to be assigned to different colors or different frequencies.

121
00:07:44,120 --> 00:07:49,800
So now we would be using radio stations as vertices and radio stations that were near

122
00:07:49,800 --> 00:07:54,360
enough to interfere with each other would get connected by an edge indicating that they

123
00:07:54,360 --> 00:07:57,960
needed to be assigned different color frequencies.

124
00:07:57,960 --> 00:08:03,480
And one of the classic ones is literally to color a map if you were trying to take, say,

125
00:08:03,480 --> 00:08:10,520
a map of the US and assign colors to it in such a way that you never had two states that

126
00:08:10,520 --> 00:08:13,639
shared a border with the same color.

127
00:08:13,639 --> 00:08:17,240
And this is an illustration of doing it with four colors.

128
00:08:17,240 --> 00:08:21,040
The question is if I give you some kind of a planar map like this, what's the minimum

129
00:08:21,040 --> 00:08:22,639
number of colors that will work?

130
00:08:22,639 --> 00:08:29,079
Now you're allowed to have two vertices with the two countries, rather share the color

131
00:08:29,079 --> 00:08:33,799
if they only share a meat at one point.

132
00:08:33,799 --> 00:08:39,439
But if they have a positive length boundary, they have to be different colors.

133
00:08:39,439 --> 00:08:48,720
Okay, the way that this turns into a vertex coloring problem is if you take a planar graph

134
00:08:48,720 --> 00:08:50,919
like this, here's just an arbitrary one.

135
00:08:50,919 --> 00:08:55,399
What I can do is I'm interested in coloring the regions, the countries with different colors,

136
00:08:55,399 --> 00:08:58,159
but I'll just replace each region by a vertex.

137
00:08:58,159 --> 00:09:00,879
So I'm going to stick a vertex in the middle of each of the regions.

138
00:09:00,879 --> 00:09:03,719
Notice there's an outer region here too that gets a vertex.

139
00:09:03,719 --> 00:09:07,759
So one, two, three, four, five, six regions for six vertices.

140
00:09:07,759 --> 00:09:15,039
And then I'll simply connect two vertices when there is a positive length edge that their

141
00:09:15,039 --> 00:09:16,399
regions share.

142
00:09:16,399 --> 00:09:20,559
So there's that vertex, that edge corresponds to the fact that there's this boundary that's

143
00:09:20,559 --> 00:09:24,319
shared between this region and this region.

144
00:09:24,319 --> 00:09:31,120
If you look at this same triangular shaped region, it has a boundary with the outside region.

145
00:09:31,120 --> 00:09:35,279
So there's going to be an edge from here to the vertex that represents the outside.

146
00:09:35,279 --> 00:09:37,439
And there's the rest of the edges.

147
00:09:37,439 --> 00:09:43,600
And edge appears when between two regions that share a boundary.

148
00:09:43,600 --> 00:09:49,639
Now the question is coloring the countries corresponds to coloring the vertices.

149
00:09:49,639 --> 00:09:53,320
And we'd like to color the graph with as few colors as possible.

150
00:09:53,320 --> 00:09:58,680
Well, a famous result that was proved in the seven days is that every planar graph is

151
00:09:58,680 --> 00:10:01,200
in fact for colorable.

152
00:10:01,200 --> 00:10:05,000
Now this was first proved, claimed to be proved in the 1850s, but in fact the published

153
00:10:05,000 --> 00:10:09,720
proof was wrong, it sat around in the journal literature for a decade before somebody found

154
00:10:09,720 --> 00:10:10,720
a bug.

155
00:10:11,120 --> 00:10:13,680
And that is to say that the proof was wrong, not the result.

156
00:10:13,680 --> 00:10:18,759
There was a big hole in the proof that that had not been adequately justified.

157
00:10:18,759 --> 00:10:23,519
The proof did give a correct argument for five coloring and the four color problem was

158
00:10:23,519 --> 00:10:26,080
opened for over a hundred years.

159
00:10:26,080 --> 00:10:35,720
Then in the 1970s two mathematicians came up with a proof of the four color theorem that

160
00:10:35,720 --> 00:10:41,680
was very controversial because a lot of their proof required a computer program to crank

161
00:10:41,680 --> 00:10:46,879
through several thousand sample graphs that needed to be verified for four colorability.

162
00:10:46,879 --> 00:10:52,360
They had an argument that showed that there could only be a few thousand counter examples

163
00:10:52,360 --> 00:10:56,000
if there was any graph that couldn't be four colored.

164
00:10:56,000 --> 00:11:00,600
It would be one of these several thousand graphs and then they went to work on coloring

165
00:11:00,600 --> 00:11:05,080
these several thousand graphs which were generated with the age of a computer and then

166
00:11:05,080 --> 00:11:08,480
colored with the age of a computer and also by hand.

167
00:11:08,480 --> 00:11:13,279
This did not make the mathematical community happy because a proof like that is essentially

168
00:11:13,279 --> 00:11:15,120
uncheckable.

169
00:11:15,120 --> 00:11:20,279
A much improved version was developed in the 1990s, but it still requires in the end a

170
00:11:20,279 --> 00:11:25,279
computer program to generate about 600 maps and verify their colorability.

171
00:11:25,279 --> 00:11:30,360
So it remains to find a proof of the four color theorem that you could say is humanly

172
00:11:30,360 --> 00:11:33,399
comprehensible without the age of a computer.

173
00:11:33,399 --> 00:11:41,720
But there's no longer any doubt really about this theorem in the mathematical community.

174
00:11:41,720 --> 00:11:47,039
In general, if I take an arbitrary graph and I ask what's the minimum number of colors

175
00:11:47,039 --> 00:11:50,800
to color it, that's called the chromatic number of the graph.

176
00:11:50,800 --> 00:11:56,440
So chi of g is the minimum number of colors to color g and let's look at some chi's for

177
00:11:56,440 --> 00:11:58,279
different kinds of graphs.

178
00:11:58,279 --> 00:12:03,159
So here we have a simple cycle of length four and it's obvious that that can be colored

179
00:12:03,159 --> 00:12:04,600
with two colors.

180
00:12:04,600 --> 00:12:06,360
Just alternate the colors.

181
00:12:06,360 --> 00:12:13,759
On the other hand, so what and if that generalizes, by the way, to any even length cycle, the

182
00:12:13,759 --> 00:12:19,360
chromatic number of an even length cycle is simply two, you color the vertices alternately.

183
00:12:19,360 --> 00:12:24,879
On the other hand, if the cycle is of odd length, you're going to need a third color.

184
00:12:24,879 --> 00:12:27,919
There's no way around it because even if you try to get by with two colors, then your

185
00:12:27,919 --> 00:12:29,639
color things alternately.

186
00:12:29,639 --> 00:12:34,199
And then when you wrap around, you discover that you can't alternately color.

187
00:12:34,199 --> 00:12:37,439
You're going to need a third color in order to avoid a clash.

188
00:12:37,439 --> 00:12:45,120
So in general, the chromatic number of an odd length cycle is three.

189
00:12:45,120 --> 00:12:49,719
The complete graph on five vertices is shown here.

190
00:12:49,719 --> 00:12:55,799
This is a five vertex graph in which every vertex is adjacent to the other four.

191
00:12:55,799 --> 00:13:01,159
And since every vertex is adjacent to the other four, you're going to need five colors.

192
00:13:01,159 --> 00:13:02,159
You can't do any better.

193
00:13:02,159 --> 00:13:05,519
They have to all have different colors.

194
00:13:05,519 --> 00:13:11,000
And so the chromatic number of the complete graph on n vertices where every vertex is adjacent

195
00:13:11,000 --> 00:13:15,959
to the other n minus one is n.

196
00:13:15,959 --> 00:13:21,519
Another simple example that comes up is if I take the cycle and I put an axis, an axle

197
00:13:21,519 --> 00:13:32,360
in the middle, call it a wheel then, a wheel with a cycle of length five around the outside,

198
00:13:32,360 --> 00:13:36,240
a perimeter of length five is called W five.

199
00:13:36,240 --> 00:13:40,240
And we can color it with four colors.

200
00:13:40,240 --> 00:13:47,639
And in general, the argument for the chromatic number for an odd length wheel is four is that

201
00:13:47,639 --> 00:13:50,759
I know I'm going to need three colors to color the rim.

202
00:13:50,759 --> 00:13:55,000
And since the axle is adjacent to everything on the rim, I'm going to need a fourth color

203
00:13:55,000 --> 00:13:56,000
for it.

204
00:13:56,000 --> 00:14:02,600
On the other hand, again, if the perimeter is even, then I can get by with three colors.

205
00:14:02,600 --> 00:14:07,720
One more remark about chromatic numbers is there's an easy argument that shows that if

206
00:14:07,720 --> 00:14:17,159
you have a graph, every one of whose vertices is at most degree k, there are at most k other

207
00:14:17,159 --> 00:14:22,360
vertices adjacent to any given vertex, then that implies that the graph is k plus one

208
00:14:22,360 --> 00:14:23,360
colorable.

209
00:14:23,360 --> 00:14:25,759
And the proof is really constructive and trivial.

210
00:14:25,759 --> 00:14:30,839
Basically, you just start coloring the vertices any way you like.

211
00:14:30,839 --> 00:14:34,879
Subject to the constraint that when you color a vertex, it's supposed to not be the same

212
00:14:34,879 --> 00:14:37,439
color as any of the vertices around it.

213
00:14:37,439 --> 00:14:43,399
But that's easy to do because when it's time to color some vertex, even if all the vertices

214
00:14:43,399 --> 00:14:45,840
around that are colored, there's only k of them.

215
00:14:45,840 --> 00:14:50,840
And so I will always be able to find a k plus first color to assign it without and get

216
00:14:50,840 --> 00:14:52,759
a satisfactory coloring.

217
00:14:52,759 --> 00:14:57,360
So I can get by with k plus one colors.

218
00:14:57,360 --> 00:15:02,720
Now the general setup with colorability is that to check whether a graph is two colorable

219
00:15:02,720 --> 00:15:04,679
is actually very easy.

220
00:15:04,679 --> 00:15:11,159
And we may talk about that in some class problems.

221
00:15:11,159 --> 00:15:15,519
But three colorability dramatically changes.

222
00:15:15,519 --> 00:15:19,240
We're back in the realm of NP-complete problems.

223
00:15:19,240 --> 00:15:25,079
In fact, a result of a student of mine almost 40 years ago was that even if a graph is

224
00:15:25,079 --> 00:15:29,799
planar, where you know it can definitely be colored with four colors, determining whether

225
00:15:29,799 --> 00:15:35,559
or not it can be colored with three colors is as hard as satisfiability.

226
00:15:35,559 --> 00:15:38,720
And it is in fact an NP-complete problem.

227
00:15:38,720 --> 00:15:46,680
In fact, a proof of how you reduce satisfiability to colorability appears in a problem in the

228
00:15:46,680 --> 00:15:51,800
text, which we may assign as a problem, set problem.

229
00:15:51,800 --> 00:15:56,800
So in general, finding k of g is hard.

230
00:15:56,800 --> 00:16:03,560
Even for three colors, now it's not any worse, again, from a theoretical point of view,

231
00:16:03,559 --> 00:16:09,559
or checking what k of g is, even if it's a very large number, or the pragmatically

232
00:16:09,559 --> 00:16:14,759
three color will be easier to check than n colorability.

233
00:16:14,759 --> 00:16:17,959
And that is our story about colorability.

