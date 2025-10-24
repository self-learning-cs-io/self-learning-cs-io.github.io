---
title: MIT6824 P3Lecture3GFS
---

1
00:00:00,000 --> 00:00:03,680
Okay, so the plan for today is talking about GFS.

2
00:00:03,680 --> 00:00:06,000
I'm going to do the in sort of multiple steps.

3
00:00:06,879 --> 00:00:09,880
One, I'm going to talk a little bit about storage in general

4
00:00:09,880 --> 00:00:13,280
and why it's so important

5
00:00:14,160 --> 00:00:18,039
and why we'll spend a lot of time in this class talking about it.

6
00:00:18,039 --> 00:00:22,320
Then I'm going to talk a little bit about,

7
00:00:22,320 --> 00:00:26,080
I'm sure, intro to GFS and that's made in design.

8
00:00:26,080 --> 00:00:27,679
We'll focus on consistency,

9
00:00:27,679 --> 00:00:30,719
which will be the main theme through this lecture.

10
00:00:31,600 --> 00:00:33,359
As part of the consistency,

11
00:00:33,359 --> 00:00:36,159
we probably do a couple of this still time,

12
00:00:36,159 --> 00:00:38,359
do a breakout room and talk a little bit about,

13
00:00:38,359 --> 00:00:41,320
in the breakout rooms about the lecture,

14
00:00:41,320 --> 00:00:43,240
the question that was posed for lecture

15
00:00:43,240 --> 00:00:49,239
and then we'll resume a discussion of consistency.

16
00:00:51,000 --> 00:00:56,240
Okay, so we'll talk a little bit about storage systems in general

17
00:00:56,240 --> 00:01:01,679
and why they so feature so prominently in 6824.

18
00:01:02,280 --> 00:01:06,799
And the main reason is it's a fantastic building block

19
00:01:07,519 --> 00:01:11,920
for false-along systems.

20
00:01:13,840 --> 00:01:18,280
And so the basic idea is that if you can build

21
00:01:18,280 --> 00:01:21,879
a durable storage system,

22
00:01:21,879 --> 00:01:23,920
then you can structure sort of your application

23
00:01:23,920 --> 00:01:28,920
as the app is basically stateless

24
00:01:31,799 --> 00:01:35,640
and then the storage holds all the persistent state.

25
00:01:39,760 --> 00:01:42,719
And that simplifies the design of the app tremendously.

26
00:01:43,879 --> 00:01:48,840
Because the app basically doesn't really have any stable storage

27
00:01:48,840 --> 00:01:50,240
that it has to maintain itself.

28
00:01:50,240 --> 00:01:53,159
In fact, it sort of factored it all out to the storage system.

29
00:01:53,159 --> 00:01:56,799
So you can start up a new application very quickly.

30
00:01:56,799 --> 00:01:58,079
It crashed doesn't really matter

31
00:01:58,079 --> 00:02:01,039
because it only has soft state, not any hard state.

32
00:02:01,039 --> 00:02:03,039
You start up again and then you start up again,

33
00:02:03,039 --> 00:02:06,439
you just reach the state from the distributed storage system.

34
00:02:06,439 --> 00:02:07,759
And you can see this quickly.

35
00:02:07,759 --> 00:02:09,280
You look at any website,

36
00:02:09,280 --> 00:02:10,800
basically it's structured in that way.

37
00:02:10,800 --> 00:02:14,479
There's a storage backend that links the state

38
00:02:14,479 --> 00:02:18,479
and then there's the application middle tier

39
00:02:18,479 --> 00:02:20,400
that does the application-specific computation

40
00:02:20,400 --> 00:02:23,599
or whatever runs JavaScript, Go, or whatever.

41
00:02:23,599 --> 00:02:28,599
And it firmens that out to clients on the internet.

42
00:02:28,599 --> 00:02:32,800
And so storage is just this like this fantastic building block.

43
00:02:32,800 --> 00:02:34,000
And I think this is one reason

44
00:02:34,000 --> 00:02:37,120
that we're gonna see this over and over in this class.

45
00:02:38,599 --> 00:02:40,560
That means that the storage system itself,

46
00:02:40,560 --> 00:02:42,520
of course, has to be highly fault tolerance

47
00:02:42,520 --> 00:02:44,719
and that turns out to be very tricky thing to do.

48
00:02:44,719 --> 00:02:49,319
And so that is the other side, the flip side of it.

49
00:02:49,319 --> 00:02:51,000
It will make life with the application easy

50
00:02:51,000 --> 00:02:53,239
but the designing and actually fault tolerance

51
00:02:53,239 --> 00:02:55,759
system storage system is not easy.

52
00:02:55,759 --> 00:02:56,879
And so why is it hard?

53
00:03:00,560 --> 00:03:05,159
And basically come down to one reason

54
00:03:05,159 --> 00:03:07,240
that drives these designs,

55
00:03:07,240 --> 00:03:10,079
which is like we generally want high performance.

56
00:03:10,079 --> 00:03:12,599
When you think about the storage system for today,

57
00:03:12,599 --> 00:03:15,680
GFS, it's main goal is to basically support

58
00:03:15,680 --> 00:03:17,199
map-produced types of applications.

59
00:03:18,079 --> 00:03:20,719
And so it really needs high performance.

60
00:03:20,719 --> 00:03:22,119
Well, what does that mean?

61
00:03:22,119 --> 00:03:23,959
Well, it means it could typically have to

62
00:03:23,959 --> 00:03:28,959
short data across servers.

63
00:03:30,759 --> 00:03:34,359
So you can use one server, you have to use multiple servers.

64
00:03:34,359 --> 00:03:37,079
And then you're gonna reason you wanna read from the disk

65
00:03:37,079 --> 00:03:40,599
and often, particularly machine has a limited throughput.

66
00:03:40,599 --> 00:03:43,280
If you wanna read more than actually a single disk

67
00:03:43,280 --> 00:03:44,959
and sustain, you have to use multiple disks

68
00:03:44,959 --> 00:03:46,560
and you have to use multiple network cards.

69
00:03:46,680 --> 00:03:49,000
And so you can immediately get into the sort of

70
00:03:49,000 --> 00:03:51,800
large scale systems as in the GFS papers,

71
00:03:51,800 --> 00:03:53,479
where you have thousands of machines.

72
00:03:54,719 --> 00:03:56,159
But if you have many servers,

73
00:03:58,159 --> 00:03:59,159
so I'm not gonna fail.

74
00:04:00,920 --> 00:04:02,920
You're gonna get failures.

75
00:04:02,920 --> 00:04:04,800
Maybe you just can save more explicitly

76
00:04:04,800 --> 00:04:06,159
if constant faults.

77
00:04:10,360 --> 00:04:13,240
Let's assume that a computer crashes once a year.

78
00:04:14,240 --> 00:04:17,120
Now let's say you have a thousand machines

79
00:04:17,120 --> 00:04:19,680
like in the GFS paper, or actually many more

80
00:04:19,680 --> 00:04:20,960
in a thousand machines, but at the minimum,

81
00:04:20,960 --> 00:04:22,439
all the five of the machines.

82
00:04:22,439 --> 00:04:24,600
And how many failures are you gonna see per day?

83
00:04:24,600 --> 00:04:25,439
Roughly.

84
00:04:29,720 --> 00:04:30,800
Around three?

85
00:04:30,800 --> 00:04:31,920
Yeah, around three.

86
00:04:31,920 --> 00:04:35,680
My job means that the sort of a failure of a computer

87
00:04:35,680 --> 00:04:38,319
and like my laptop at the beginning of the lecture

88
00:04:38,319 --> 00:04:41,400
is just a common scenario.

89
00:04:41,399 --> 00:04:44,079
And so if you're gonna move up to more than a thousand machines,

90
00:04:44,079 --> 00:04:46,560
10,000 machines, you know, 100,000 machines,

91
00:04:46,560 --> 00:04:47,519
and you run the application,

92
00:04:47,519 --> 00:04:49,239
you're using that kind of number of computers,

93
00:04:49,239 --> 00:04:50,159
you're gonna get faults.

94
00:04:50,159 --> 00:04:53,599
And so that means that you want a fault-hull of design.

95
00:05:01,359 --> 00:05:03,239
And you know, the get fault-hulls,

96
00:05:03,239 --> 00:05:05,000
you're gonna at least in the case with your storage chips

97
00:05:05,000 --> 00:05:06,560
or the typical approach to the way to go,

98
00:05:06,560 --> 00:05:08,120
is gonna go with replications.

99
00:05:09,120 --> 00:05:11,920
You know, it's tapping the data on multiple disks,

100
00:05:11,920 --> 00:05:13,360
you know, so that they want this fail,

101
00:05:13,360 --> 00:05:16,120
it's, you know, the other disk hopefully have the data.

102
00:05:17,879 --> 00:05:20,439
But if you go into replication,

103
00:05:20,439 --> 00:05:23,399
and so the data is in multiple places,

104
00:05:23,399 --> 00:05:25,519
that runs into the challenge that, you know,

105
00:05:25,519 --> 00:05:27,160
the data may be out of sync.

106
00:05:27,160 --> 00:05:29,800
And so you actually get into inconsistent potential

107
00:05:29,800 --> 00:05:30,879
inconsistencies.

108
00:05:39,120 --> 00:05:42,920
You know, to avoid these inconsistencies, you know,

109
00:05:42,920 --> 00:05:45,000
then if you desire strong consistency,

110
00:05:45,000 --> 00:05:47,959
basically your replicated system behaves as if it's,

111
00:05:47,959 --> 00:05:50,920
you know, has the same behavior as an unreplicated system,

112
00:05:52,160 --> 00:05:55,399
then, you know, you will need some consistency protocol.

113
00:05:57,720 --> 00:06:00,160
And that, you know, requires some maybe sending messages

114
00:06:00,160 --> 00:06:02,439
and may you lower performance.

115
00:06:03,439 --> 00:06:08,240
And maybe the message itself is not really huge,

116
00:06:08,240 --> 00:06:09,680
you know, performance overhead, but you know,

117
00:06:09,680 --> 00:06:11,000
tip bill as we'll see,

118
00:06:11,000 --> 00:06:12,680
you might actually have to read,

119
00:06:12,680 --> 00:06:15,800
or write to durable storage as part of that protocol.

120
00:06:15,800 --> 00:06:17,519
And you know, reading a writing to storage in 10

121
00:06:17,519 --> 00:06:19,839
or we tend to be, you know, quite expensive.

122
00:06:19,839 --> 00:06:21,519
And so here sort of we see this conundrum,

123
00:06:21,519 --> 00:06:24,079
like, you know, we want high performance,

124
00:06:24,079 --> 00:06:26,720
we want fault tolerance because we have many servers.

125
00:06:26,720 --> 00:06:27,879
We want high performance,

126
00:06:27,879 --> 00:06:29,800
so we want many servers, we have many servers

127
00:06:29,800 --> 00:06:31,360
who mean fault tolerance.

128
00:06:31,400 --> 00:06:33,920
That means replication, that means, you know,

129
00:06:33,920 --> 00:06:37,319
inconsistencies because we have data in multiple places,

130
00:06:37,319 --> 00:06:38,560
you know, to fix the inconsistencies,

131
00:06:38,560 --> 00:06:40,280
we need to, you know, to basically get a protocol

132
00:06:40,280 --> 00:06:41,759
that might lower performance.

133
00:06:41,759 --> 00:06:44,240
And so here sort of this fundamental challenge,

134
00:06:44,240 --> 00:06:46,480
you know, in designing these distributed storage systems

135
00:06:46,480 --> 00:06:49,840
that you just struggle between consistency

136
00:06:49,840 --> 00:06:51,199
and this new performance.

137
00:06:51,199 --> 00:06:53,720
And we'll see that throughout the turn.

138
00:06:55,920 --> 00:06:58,280
So let me talk a little bit about consistency.

139
00:07:02,360 --> 00:07:03,800
And it's sort of very high level.

140
00:07:03,800 --> 00:07:06,480
I know I promised you for a direct sleep test,

141
00:07:06,480 --> 00:07:09,800
we're going to go in more detail as we go.

142
00:07:09,800 --> 00:07:13,319
So first let's talk again about the ideal consistency.

143
00:07:13,319 --> 00:07:16,040
An ideal consistency, the way the simplest way to think about it

144
00:07:16,040 --> 00:07:17,879
is that basically the machine behaves

145
00:07:17,879 --> 00:07:19,720
as if it's a single system.

146
00:07:29,000 --> 00:07:30,600
That's where the desired behavior

147
00:07:30,680 --> 00:07:34,480
and the sort of two things that make that desired behavior

148
00:07:34,480 --> 00:07:39,480
or two hazards that make that this desired behavior

149
00:07:40,160 --> 00:07:45,160
hard to achieve, or at least, you know, requires some thinking.

150
00:07:45,160 --> 00:07:47,800
And one is concurrency and second thing is failure.

151
00:07:48,840 --> 00:07:50,520
So let me start with a certain concurrency

152
00:07:50,520 --> 00:07:54,280
because even if you have a single machine,

153
00:07:54,280 --> 00:07:56,240
with multiple clients, so if concurrency

154
00:07:56,240 --> 00:07:57,439
within the single machine,

155
00:07:57,439 --> 00:07:59,560
you actually have to think about consistency.

156
00:07:59,560 --> 00:08:01,399
And this course is quite obvious.

157
00:08:01,399 --> 00:08:05,079
And let's say we have one machine, one disk,

158
00:08:05,079 --> 00:08:08,639
multiple requests come in from multiple different clients.

159
00:08:08,639 --> 00:08:10,240
And if the machine is a multi-prousing machine,

160
00:08:10,240 --> 00:08:12,920
they might actually run these requests

161
00:08:12,920 --> 00:08:14,560
to truly imperil.

162
00:08:14,560 --> 00:08:17,079
So let's think a little bit about it,

163
00:08:17,079 --> 00:08:17,920
what does it mean?

164
00:08:17,920 --> 00:08:21,759
So let's say we have a client one,

165
00:08:21,759 --> 00:08:26,759
it does a right operation to a key X and the right one.

166
00:08:27,759 --> 00:08:30,680
And at the same time, there's a quest coming in,

167
00:08:30,680 --> 00:08:34,080
it writes to X2, but it actually writes the value too.

168
00:08:35,159 --> 00:08:38,279
Right now, if you want to specify or state

169
00:08:38,279 --> 00:08:40,480
like consistency means, we need some rule

170
00:08:40,480 --> 00:08:42,559
in about what will happen.

171
00:08:42,559 --> 00:08:43,879
And the rule is typically phrased

172
00:08:43,879 --> 00:08:45,240
from the perspective of the reader.

173
00:08:45,240 --> 00:08:48,039
So let's say there's another reader coming in,

174
00:08:48,039 --> 00:08:50,279
or another request coming in from an client,

175
00:08:50,279 --> 00:08:51,799
and it actually reads X.

176
00:08:53,600 --> 00:08:55,120
And the question is like, what is the value

177
00:08:55,120 --> 00:08:58,560
that actually that reader or adapt this client on zeroes?

178
00:08:58,560 --> 00:09:00,080
And like a little bit more complicated,

179
00:09:00,080 --> 00:09:02,440
or more interesting, let's say we have a fourth client,

180
00:09:02,440 --> 00:09:03,279
which we're going to bring out

181
00:09:03,279 --> 00:09:05,960
to issue a consistency definitions in more clearly.

182
00:09:05,960 --> 00:09:07,720
And it also does a read of X.

183
00:09:07,720 --> 00:09:11,200
Well, after the client free, actually red X.

184
00:09:12,679 --> 00:09:13,919
So now we have such a state,

185
00:09:13,919 --> 00:09:15,279
like what does the desired outcomes

186
00:09:15,279 --> 00:09:16,519
and what are incorrect outcomes?

187
00:09:16,519 --> 00:09:19,840
And that's really what defines consistency.

188
00:09:19,840 --> 00:09:23,279
So let's take the first case, see free.

189
00:09:23,279 --> 00:09:28,279
There's going to be a reasonable outcome for the read,

190
00:09:28,519 --> 00:09:30,399
what is a reasonable outcome for the read of C for you

191
00:09:30,399 --> 00:09:32,519
to return, or values.

192
00:09:34,079 --> 00:09:35,319
What value would make you happy

193
00:09:35,319 --> 00:09:37,279
or would make an application programmer happy?

194
00:09:39,000 --> 00:09:40,240
To?

195
00:09:40,240 --> 00:09:42,240
To you be very reasonable?

196
00:09:42,240 --> 00:09:45,079
Any other reasonable values?

197
00:09:45,079 --> 00:09:45,919
One.

198
00:09:45,919 --> 00:09:47,639
Yeah, one reasonable,

199
00:09:47,639 --> 00:09:49,240
because the operating system happened concurrently,

200
00:09:49,240 --> 00:09:51,079
so maybe we don't really know which one,

201
00:09:51,079 --> 00:09:52,240
we don't really want to restrict

202
00:09:52,240 --> 00:09:53,759
and what particular order they go.

203
00:09:53,759 --> 00:09:55,639
So we do not necessarily say like either one is fine,

204
00:09:55,639 --> 00:09:57,480
because they're not concurrently.

205
00:09:57,480 --> 00:09:59,560
What are some values that we would like not to see

206
00:10:00,720 --> 00:10:02,519
for the C free read?

207
00:10:02,519 --> 00:10:03,480
Seven.

208
00:10:03,480 --> 00:10:05,120
Yeah, seven, any other value, okay?

209
00:10:05,120 --> 00:10:06,480
Because there's nobody wrote that.

210
00:10:06,480 --> 00:10:08,320
So that would be undesirable.

211
00:10:08,320 --> 00:10:09,159
Okay, so good.

212
00:10:09,159 --> 00:10:12,279
So like we agreed that probably the reasonable outcome

213
00:10:12,279 --> 00:10:14,480
for C free would be either one or two.

214
00:10:14,480 --> 00:10:15,600
Okay, how about C for?

215
00:10:17,639 --> 00:10:19,680
The same as C for C three.

216
00:10:19,680 --> 00:10:20,519
Really?

217
00:10:20,519 --> 00:10:21,360
Exactly the same.

218
00:10:23,240 --> 00:10:25,240
So let's say C free, you return one.

219
00:10:25,240 --> 00:10:27,480
What do we expect C for to return?

220
00:10:28,639 --> 00:10:30,360
Whatever C three so?

221
00:10:30,360 --> 00:10:32,759
Yeah, because it ran well after C free.

222
00:10:32,759 --> 00:10:35,600
So we hope that if one is returned,

223
00:10:35,600 --> 00:10:37,759
we expect one here to the graph.

224
00:10:37,759 --> 00:10:40,120
If two was returned, we expect two here.

225
00:10:41,919 --> 00:10:43,080
Does that make sense?

226
00:10:45,600 --> 00:10:49,720
Okay, so there's like a super brief introduction

227
00:10:49,720 --> 00:10:50,680
of saying like now,

228
00:10:50,679 --> 00:10:52,759
how can we define consistency?

229
00:10:52,759 --> 00:10:55,120
And in a typical way, we do this using sort of traces.

230
00:10:55,120 --> 00:10:57,000
And we argue about like what correctness

231
00:10:57,000 --> 00:10:58,159
for particular traces.

232
00:10:58,159 --> 00:11:00,039
And we'll see more of that.

233
00:11:00,039 --> 00:11:02,639
And of course, you know, the sort of beginning for this kind

234
00:11:02,639 --> 00:11:05,159
of consistency by example, using locks.

235
00:11:05,159 --> 00:11:06,359
If you have done it,

236
00:11:06,359 --> 00:11:07,479
as you do in that producer,

237
00:11:07,479 --> 00:11:09,479
or in sort of any concurrent node program,

238
00:11:09,479 --> 00:11:10,319
that you're right.

239
00:11:10,319 --> 00:11:11,919
So just to stand up to technique, you know,

240
00:11:11,919 --> 00:11:14,839
to enforce consistency in terms of,

241
00:11:14,839 --> 00:11:18,039
in the presence of concurrency is to use locks.

242
00:11:19,039 --> 00:11:22,559
Now, in a distributed system,

243
00:11:22,559 --> 00:11:24,199
in the ideal consistency,

244
00:11:24,199 --> 00:11:25,879
either sort of as a set of two hazards,

245
00:11:25,879 --> 00:11:28,120
the second hazard is basically failure.

246
00:11:28,120 --> 00:11:29,639
So it's replication in general.

247
00:11:29,639 --> 00:11:31,879
And we have two servers now assembly.

248
00:11:31,879 --> 00:11:35,159
We use S1, we use S2,

249
00:11:36,559 --> 00:11:38,599
and we're gonna both have a disk.

250
00:11:39,959 --> 00:11:42,719
And we have our same clients as before,

251
00:11:42,719 --> 00:11:46,679
and C1 and C2, and they write two X.

252
00:11:48,439 --> 00:11:51,719
And let's say, you know, just to illustrate

253
00:11:51,719 --> 00:11:52,879
like what kind of complications,

254
00:11:52,879 --> 00:11:54,159
what kind of, you know,

255
00:11:54,159 --> 00:11:56,399
just to illustrate that we actually have to do something.

256
00:11:56,399 --> 00:11:58,599
Let's start with like the most, you know,

257
00:11:58,599 --> 00:12:01,279
dumb replication plan.

258
00:12:01,279 --> 00:12:03,719
So like very bad replication plan.

259
00:12:11,439 --> 00:12:13,439
So in this particular bad replication can find

260
00:12:13,439 --> 00:12:14,439
what we're gonna do is like,

261
00:12:14,439 --> 00:12:16,279
oh, we're gonna allow a client,

262
00:12:16,279 --> 00:12:18,240
you know, when a client actually wants to update,

263
00:12:18,240 --> 00:12:21,759
we're right, we're gonna tell it to basically,

264
00:12:21,759 --> 00:12:23,039
the protocol that we're gonna follow

265
00:12:23,039 --> 00:12:25,360
is to client write to to both search

266
00:12:25,360 --> 00:12:26,759
in, you know, whatever,

267
00:12:26,759 --> 00:12:30,039
then we're gonna coordinate out to just write it to both.

268
00:12:30,039 --> 00:12:32,360
And so, for example, if we have client one

269
00:12:32,360 --> 00:12:33,480
and client two running,

270
00:12:34,759 --> 00:12:37,639
then you're gonna maybe client two does the same thing.

271
00:12:39,639 --> 00:12:44,120
And then we're gonna ask ourselves the same question,

272
00:12:44,399 --> 00:12:45,879
what this gonna see three,

273
00:12:45,879 --> 00:12:48,840
see one that actually reads.

274
00:12:48,840 --> 00:12:50,240
And let's assume that for reading,

275
00:12:50,240 --> 00:12:52,440
we're gonna say like, ah, we're in either way.

276
00:12:53,639 --> 00:12:55,159
We're gonna read from any other replica.

277
00:12:55,159 --> 00:12:57,279
As I said, this is a very bad replication plan.

278
00:12:57,279 --> 00:12:58,960
Basically, there's no restrictions.

279
00:13:00,159 --> 00:13:02,720
So what are the possible outcomes?

280
00:13:02,720 --> 00:13:06,759
So this guy writes one, this guy writes two,

281
00:13:06,759 --> 00:13:08,680
and you know, we now we see three.

282
00:13:10,240 --> 00:13:12,360
What are the possible outcomes for each read?

283
00:13:15,039 --> 00:13:16,560
One and two again.

284
00:13:16,560 --> 00:13:17,840
Yeah, one and two.

285
00:13:17,840 --> 00:13:20,039
Nothing really that bad happened, right?

286
00:13:20,039 --> 00:13:21,039
And let's see four.

287
00:13:22,639 --> 00:13:23,679
We do a read of X,

288
00:13:23,679 --> 00:13:25,320
we're gonna well after see for your X,

289
00:13:25,320 --> 00:13:28,720
like this is the previous board.

290
00:13:28,720 --> 00:13:30,759
Also one and two.

291
00:13:30,759 --> 00:13:33,159
Yeah, one and two again.

292
00:13:33,159 --> 00:13:34,360
But what happens?

293
00:13:34,360 --> 00:13:35,720
He three reads one.

294
00:13:37,759 --> 00:13:40,039
What does see three, see four made in terms?

295
00:13:41,279 --> 00:13:42,279
One or two.

296
00:13:43,120 --> 00:13:44,959
And it's not what we want or not.

297
00:13:45,919 --> 00:13:46,919
No.

298
00:13:46,919 --> 00:13:48,399
No, I mean, you know, again,

299
00:13:48,399 --> 00:13:50,079
it'd be difficult for an application writer

300
00:13:50,079 --> 00:13:51,399
to actually reason about this.

301
00:13:53,480 --> 00:13:55,000
Particularly even if see three and see four,

302
00:13:55,000 --> 00:13:55,839
we're the same thing.

303
00:13:55,839 --> 00:13:56,959
You first read to a teacher one.

304
00:13:56,959 --> 00:13:58,159
No modification made.

305
00:13:58,159 --> 00:13:59,919
And the next second read returns another value.

306
00:13:59,919 --> 00:14:01,319
How's that possible?

307
00:14:01,319 --> 00:14:04,679
You know, it makes application program much difficult to write.

308
00:14:04,679 --> 00:14:06,759
And so, you know, and the reason, of course,

309
00:14:06,759 --> 00:14:09,120
that this inconsistency shows up here,

310
00:14:09,120 --> 00:14:10,919
is because we basically have no protocol,

311
00:14:10,919 --> 00:14:13,719
you know, to coordinate kind of declines,

312
00:14:13,719 --> 00:14:14,639
the readers and the writers.

313
00:14:14,639 --> 00:14:16,959
So we need some form and the system typically,

314
00:14:16,959 --> 00:14:19,159
we need some form of a protocol to fix these.

315
00:14:20,439 --> 00:14:22,120
To get the desired to enforce that,

316
00:14:22,120 --> 00:14:23,839
we get the desired consistency.

317
00:14:23,839 --> 00:14:24,959
Okay.

318
00:14:24,959 --> 00:14:26,759
And so what we're gonna see in this investment semester,

319
00:14:26,759 --> 00:14:28,319
in a whole bunch of different types of protocols,

320
00:14:28,319 --> 00:14:30,519
they have different trade-offs in terms of fault tolerance

321
00:14:30,519 --> 00:14:31,360
and the consistency.

322
00:14:32,519 --> 00:14:33,360
Okay.

323
00:14:34,079 --> 00:14:38,439
And the fact, you know, to get our head in that kind of thinking,

324
00:14:39,440 --> 00:14:44,040
we're gonna use a whole bunch of different case studies.

325
00:14:44,040 --> 00:14:47,440
And the case study for today is GFS.

326
00:14:55,040 --> 00:14:57,040
And this is an instant case study, you know,

327
00:14:57,040 --> 00:14:59,240
why we wouldn't have signed it.

328
00:14:59,240 --> 00:15:00,920
And one reason it's an instant case study,

329
00:15:00,920 --> 00:15:04,000
because it brings out sort of all these core issues,

330
00:15:04,000 --> 00:15:07,880
correct, DFS, you know, is designed to get high performance.

331
00:15:09,440 --> 00:15:14,040
Yeah, that means that actually uses replication

332
00:15:18,160 --> 00:15:19,480
and fault tolerance.

333
00:15:22,920 --> 00:15:25,640
And, you know, struggles with this consistency.

334
00:15:25,640 --> 00:15:27,360
So it's like the few four sort of themes

335
00:15:27,360 --> 00:15:29,880
that we're gonna be consistently seeing in throughout the semester,

336
00:15:29,880 --> 00:15:31,800
and it'll show up in this one paper.

337
00:15:34,080 --> 00:15:36,200
The other side of this why is an instant case study,

338
00:15:36,200 --> 00:15:37,840
because it's a successful system.

339
00:15:39,440 --> 00:15:43,440
Google doesn't actually use GFS, at least at this point,

340
00:15:46,160 --> 00:15:49,760
in my understanding, there's a successor file system called Colossus,

341
00:15:49,760 --> 00:15:51,760
but it's inspired by DFS.

342
00:15:53,040 --> 00:15:57,640
And, but there are other sort of these cluster-based file systems

343
00:15:57,640 --> 00:16:00,800
that are for like, do type of use, like HDS,

344
00:16:00,800 --> 00:16:03,720
you know, there was very much inspired by the design of GFS.

345
00:16:04,720 --> 00:16:08,560
And, you know, one thing that is actually interesting,

346
00:16:08,560 --> 00:16:12,680
at the point that this paper was written in the sort of late,

347
00:16:12,680 --> 00:16:14,800
or in 2000, you know, it was pretty, you know,

348
00:16:14,800 --> 00:16:17,320
distributed files, and were well understood to get in topics.

349
00:16:17,320 --> 00:16:18,680
So people knew about fault tolerance,

350
00:16:18,680 --> 00:16:20,200
but they knew about their application,

351
00:16:20,200 --> 00:16:22,040
they knew about their consistency,

352
00:16:22,040 --> 00:16:24,800
all the kind of stuff is pretty well understood.

353
00:16:26,160 --> 00:16:28,399
However, you know, nobody actually sort of built,

354
00:16:28,399 --> 00:16:31,879
you know, a system, you know, at the scale of thousands of computers.

355
00:16:31,879 --> 00:16:36,720
And, and that sure brings out a number of challenges

356
00:16:36,720 --> 00:16:38,759
that an approved system have to not address.

357
00:16:38,759 --> 00:16:42,600
And the fact that the design is not completely standard.

358
00:16:43,639 --> 00:16:45,720
So the end design that we're reading about,

359
00:16:45,720 --> 00:16:48,039
it's not sort of the standard design

360
00:16:48,039 --> 00:16:51,000
that you would see in academic papers at that time.

361
00:16:51,000 --> 00:16:54,000
And there were sort of two aspects that make it non-standard,

362
00:16:54,000 --> 00:16:56,919
over which we'll get more time.

363
00:16:56,919 --> 00:16:59,279
One is, you know, there's actually a single master,

364
00:16:59,279 --> 00:17:02,240
the master is not replicated.

365
00:17:02,240 --> 00:17:04,240
You know, there's a single machine that is sort of a charge

366
00:17:04,240 --> 00:17:08,879
of like almost all the coordination in the system.

367
00:17:08,879 --> 00:17:11,319
And so that is unusual, you know,

368
00:17:11,319 --> 00:17:13,279
the good old why would you build a file,

369
00:17:13,279 --> 00:17:14,839
a sort of a fault tolerance system

370
00:17:14,839 --> 00:17:16,200
which has a single point of failure?

371
00:17:16,200 --> 00:17:17,399
Right, that would be sort of not something

372
00:17:17,399 --> 00:17:20,359
that people in the academic literature were doing at that time.

373
00:17:21,759 --> 00:17:25,160
And the second thing is that it actually has,

374
00:17:25,160 --> 00:17:28,399
it's not consistent, you know, can have inconsistencies.

375
00:17:30,279 --> 00:17:35,680
And again, you know, mostly in the literature,

376
00:17:35,680 --> 00:17:38,359
in that particular time, you know, people were really sweating

377
00:17:38,359 --> 00:17:40,399
actually to build, you know, the shivit systems

378
00:17:40,399 --> 00:17:42,559
that actually have strong consistency.

379
00:17:42,559 --> 00:17:44,319
And you know, don't have the non-melese

380
00:17:44,319 --> 00:17:46,119
that, you know, we saw in the previous book.

381
00:17:48,279 --> 00:17:51,920
And so, you know, like a lot of the core techniques,

382
00:17:51,920 --> 00:17:53,879
you know, where well known, you know,

383
00:17:53,879 --> 00:17:55,319
the way that we're putting together,

384
00:17:55,319 --> 00:17:56,839
are actually quite different.

385
00:17:57,839 --> 00:17:59,639
And so that makes it interesting.

386
00:17:59,639 --> 00:18:01,639
And particularly, you know, the scale, you know,

387
00:18:01,639 --> 00:18:03,319
which, you know, the system actually operates

388
00:18:03,319 --> 00:18:05,240
is, I mean, it's impressive.

389
00:18:05,240 --> 00:18:07,119
And pretty common there, even for today, you know,

390
00:18:07,119 --> 00:18:11,599
so this issue of struggle between fault tolerance,

391
00:18:12,639 --> 00:18:16,399
replication, performance, and consistency is,

392
00:18:16,399 --> 00:18:17,399
is a standard problem.

393
00:18:17,399 --> 00:18:19,000
Rooker and problems should almost any

394
00:18:19,000 --> 00:18:20,319
distributed storage systems, you know,

395
00:18:20,319 --> 00:18:21,559
that people build today.

396
00:18:22,799 --> 00:18:23,679
And changes over time.

397
00:18:23,679 --> 00:18:25,279
So like S3 for a while, you know,

398
00:18:25,399 --> 00:18:27,319
we have to have that strong consistency,

399
00:18:27,319 --> 00:18:29,319
you know, lit me has gotten much stronger consistency.

400
00:18:31,079 --> 00:18:32,559
Okay.

401
00:18:32,559 --> 00:18:35,720
So one of, since the paper's really written

402
00:18:35,720 --> 00:18:37,920
and the design is written by a,

403
00:18:37,920 --> 00:18:39,639
a hotel over there by performance,

404
00:18:39,639 --> 00:18:44,639
I want to go back to the MapReduce paper for a second.

405
00:18:44,639 --> 00:18:47,639
And this is a graph, you know, of the MapReduce paper.

406
00:18:47,639 --> 00:18:52,639
And one way to think about GFS is that it's the file system

407
00:18:53,640 --> 00:18:55,400
for MapReduce.

408
00:19:00,640 --> 00:19:03,440
So the goal is to actually run many MapReduce jobs

409
00:19:03,440 --> 00:19:05,360
and get high performance.

410
00:19:05,360 --> 00:19:07,400
And we know that basically from the,

411
00:19:07,400 --> 00:19:09,200
we can tell from the MapReduce paper already

412
00:19:09,200 --> 00:19:11,080
that, you know, this sort of GFS

413
00:19:11,080 --> 00:19:14,080
is impressive in that matter in terms of performance.

414
00:19:14,080 --> 00:19:18,080
So if you look at the, you know, this side of this graph,

415
00:19:18,080 --> 00:19:20,600
this is straight out of the MapReduce paper,

416
00:19:20,599 --> 00:19:24,719
this is the normal execution of one of the MapReduce jobs.

417
00:19:24,719 --> 00:19:27,799
And it has in a free sort of parks to it.

418
00:19:27,799 --> 00:19:29,159
One is the first part is input,

419
00:19:29,159 --> 00:19:30,879
like reading the input files,

420
00:19:30,879 --> 00:19:33,519
the inputs to the map from the file system.

421
00:19:33,519 --> 00:19:35,359
And in case, you know, that they didn't say much about it,

422
00:19:35,359 --> 00:19:38,119
but those are written, Rhett from GFS.

423
00:19:39,439 --> 00:19:41,399
There's the internal shuffle that we know really care about.

424
00:19:41,399 --> 00:19:42,759
And then, you know, at the end,

425
00:19:42,759 --> 00:19:44,559
you know, the Reduce jobs right back

426
00:19:44,559 --> 00:19:46,519
in results into GFS.

427
00:19:47,359 --> 00:19:51,680
And so the performance, you know, part of the performance

428
00:19:51,680 --> 00:19:54,160
of the GFS MapReduce task is determined by, you know,

429
00:19:54,160 --> 00:19:57,920
the rate at which the MAPRs can actually read data

430
00:19:57,920 --> 00:20:00,480
from the GFS file system, right?

431
00:20:00,480 --> 00:20:02,680
So we're running many, many MAPRs at the same time.

432
00:20:02,680 --> 00:20:05,039
In fact, some MAPRs from different jobs,

433
00:20:05,039 --> 00:20:07,319
nobody reading the same files.

434
00:20:07,319 --> 00:20:09,759
So we look at the input, like this, this,

435
00:20:09,759 --> 00:20:14,599
this top, you know, graph shows the input,

436
00:20:14,599 --> 00:20:16,439
the internal megabytes per second,

437
00:20:16,439 --> 00:20:17,719
at the rate at which, you know,

438
00:20:17,719 --> 00:20:19,919
the map is actually jointly collectively

439
00:20:19,919 --> 00:20:21,240
for one particular job, you know,

440
00:20:21,240 --> 00:20:23,319
can read from the file system.

441
00:20:23,319 --> 00:20:24,199
As you can see, you know,

442
00:20:24,199 --> 00:20:26,959
it goes over well over a thousand,

443
00:20:26,959 --> 00:20:28,719
or 10,000 megabyte per second.

444
00:20:30,879 --> 00:20:33,079
And you know, the first question to ask you is maybe like,

445
00:20:33,079 --> 00:20:34,399
is that an impressive number?

446
00:20:38,159 --> 00:20:39,519
Yeah, should we be impressed with that number

447
00:20:39,519 --> 00:20:41,839
or are we thinking, well, you know,

448
00:20:41,839 --> 00:20:43,399
give me one this, can I do it too?

449
00:20:45,599 --> 00:20:46,599
Okay.

450
00:20:50,599 --> 00:20:51,919
Anybody?

451
00:20:51,919 --> 00:20:54,959
I think because it's older, maybe yes.

452
00:20:56,439 --> 00:20:57,439
Okay.

453
00:20:57,439 --> 00:20:58,959
How much can you write?

454
00:20:58,959 --> 00:21:01,559
How much, like, what rates can you write?

455
00:21:01,559 --> 00:21:02,399
Read.

456
00:21:08,399 --> 00:21:10,399
Okay, let me tell you this.

457
00:21:10,399 --> 00:21:13,319
Roughly the throughput of a single disk,

458
00:21:13,599 --> 00:21:15,599
at the time that this paper,

459
00:21:15,599 --> 00:21:17,679
it was around like 30 megabytes per second,

460
00:21:17,679 --> 00:21:20,919
like somewhere in the tens of megabytes per second.

461
00:21:20,919 --> 00:21:22,799
So here we're looking at, you know,

462
00:21:22,799 --> 00:21:25,159
well over 10,000 megabytes per second.

463
00:21:26,799 --> 00:21:29,679
Correct? And so that is an impressive number.

464
00:21:29,679 --> 00:21:30,960
And you have to do work.

465
00:21:30,960 --> 00:21:31,799
As you know, the,

466
00:21:31,799 --> 00:21:34,919
we'll see in the GFS design that allows that kind of throughput.

467
00:21:36,359 --> 00:21:37,720
And of course, the disk technology,

468
00:21:37,720 --> 00:21:39,079
in the case of the GFS, of course,

469
00:21:39,079 --> 00:21:40,799
if the disk technology was faster,

470
00:21:40,799 --> 00:21:41,799
you know, it would be, you know,

471
00:21:41,799 --> 00:21:43,039
what the real goal here, correct?

472
00:21:43,039 --> 00:21:44,799
Is like we have a thousand machines,

473
00:21:44,799 --> 00:21:46,159
maybe each one has a disk,

474
00:21:46,159 --> 00:21:48,359
and each one can read a 30 megabyte per second,

475
00:21:48,359 --> 00:21:50,519
which is one of thousand times 30 megabytes per second

476
00:21:50,519 --> 00:21:52,000
to get out of it.

477
00:21:52,000 --> 00:21:53,500
Okay?

478
00:21:53,500 --> 00:21:55,919
And so I sort of, you know,

479
00:21:55,919 --> 00:21:57,359
drives a lot of this design,

480
00:21:57,359 --> 00:21:59,480
it's through maybe a lot of these nappers

481
00:21:59,480 --> 00:22:02,200
to reach the parallel from the file system,

482
00:22:02,200 --> 00:22:05,079
for this, you know, just join file system.

483
00:22:05,079 --> 00:22:05,919
Okay?

484
00:22:07,000 --> 00:22:08,200
So let me say a little bit,

485
00:22:08,200 --> 00:22:09,039
you know, more about this,

486
00:22:09,039 --> 00:22:12,720
but what are the key properties that GFS has?

487
00:22:12,720 --> 00:22:13,799
You know, one big,

488
00:22:16,879 --> 00:22:18,920
large data set with that,

489
00:22:18,920 --> 00:22:19,759
I mean, that.

490
00:22:24,000 --> 00:22:25,319
And so in the thing with the data set,

491
00:22:25,319 --> 00:22:27,440
you should think about this like the map-produced data sets.

492
00:22:27,440 --> 00:22:28,440
You know, so for example,

493
00:22:28,440 --> 00:22:31,519
you join the whole end of the complete crawl

494
00:22:31,519 --> 00:22:32,359
of the worldwide web,

495
00:22:32,359 --> 00:22:33,200
you're stored in this,

496
00:22:33,200 --> 00:22:34,759
you know, the stupid file system.

497
00:22:36,279 --> 00:22:38,319
Has to be fast as we can talk about.

498
00:22:38,319 --> 00:22:40,519
And you're going to get the way they get like high performance

499
00:22:40,519 --> 00:22:42,000
is to do automatic sharding.

500
00:22:43,839 --> 00:22:45,879
Shard to files across multiple disk,

501
00:22:45,879 --> 00:22:47,759
you're allowed multiple clients to read

502
00:22:47,759 --> 00:22:49,679
from those disks in parallel.

503
00:22:49,679 --> 00:22:50,519
All right?

504
00:22:51,799 --> 00:22:52,879
Now it goes global.

505
00:22:55,720 --> 00:22:57,039
And without meaning,

506
00:22:57,039 --> 00:22:57,879
again, it's shared,

507
00:22:57,879 --> 00:22:59,159
we're going to all apps.

508
00:23:01,559 --> 00:23:02,839
Csync file system.

509
00:23:06,279 --> 00:23:07,279
And that's convenient.

510
00:23:07,279 --> 00:23:10,160
Like if you have multiple map-produced jobs

511
00:23:10,160 --> 00:23:13,799
that operate on the same set of files,

512
00:23:13,799 --> 00:23:16,079
they can, first of all, read all the same set of files,

513
00:23:16,079 --> 00:23:17,480
but they can produce new files

514
00:23:17,480 --> 00:23:19,119
and then other map-produced can use those,

515
00:23:19,119 --> 00:23:20,119
you know, files again.

516
00:23:20,119 --> 00:23:22,319
So is it a very convenient to get a live sharing

517
00:23:22,319 --> 00:23:23,480
between applications?

518
00:23:23,480 --> 00:23:24,879
So it's very convenient to have.

519
00:23:26,119 --> 00:23:26,720
And of course, you know,

520
00:23:26,720 --> 00:23:28,119
GFS has to be fault-hulled.

521
00:23:33,879 --> 00:23:35,399
And it's likely that we're going to be failures.

522
00:23:35,400 --> 00:23:38,080
And so we want automatic,

523
00:23:38,080 --> 00:23:40,000
close to automatic fault-hulled, as possible.

524
00:23:40,000 --> 00:23:42,120
And we'll see GFS doesn't provide completely automatic,

525
00:23:42,120 --> 00:23:43,240
but these are pretty good jobs

526
00:23:43,240 --> 00:23:45,519
for actually getting high-proof fault-hulled.

527
00:23:48,280 --> 00:23:51,000
Okay, any questions about the,

528
00:23:51,000 --> 00:23:52,560
this part so far?

529
00:23:52,560 --> 00:23:55,120
I'm going to run intro to this topic

530
00:23:55,120 --> 00:23:57,640
and to a few intro,

531
00:23:57,640 --> 00:23:59,240
we're going to go to GFS.

532
00:23:59,240 --> 00:24:01,240
Okay, let's now talk about the design.

533
00:24:14,039 --> 00:24:16,880
So here's the design,

534
00:24:16,880 --> 00:24:21,440
the scene from the figure one, I think, in the paper.

535
00:24:21,440 --> 00:24:23,440
And there's a couple of things I wanted to point out

536
00:24:23,440 --> 00:24:25,559
to talk a little bit more in detail about.

537
00:24:25,559 --> 00:24:27,359
So first of all, we have an application

538
00:24:27,359 --> 00:24:30,719
and the application, again, might be MapReduceDoc,

539
00:24:30,719 --> 00:24:34,759
just in multiple ReducedTask, multiple MapTask,

540
00:24:34,759 --> 00:24:37,199
and they link with the GFS like you.

541
00:24:37,199 --> 00:24:40,359
And so it's not a Linux file system.

542
00:24:40,359 --> 00:24:41,959
This is not the file system you do

543
00:24:41,959 --> 00:24:46,240
through whatever, edit your files or compile.

544
00:24:46,240 --> 00:24:50,159
It is really intended as a special for the Gris file system

545
00:24:50,159 --> 00:24:52,519
for these large computations.

546
00:24:53,919 --> 00:24:56,119
And as I said before, again, our real goal, correct,

547
00:24:56,119 --> 00:24:58,159
is to achieve that impressive number,

548
00:24:58,159 --> 00:24:59,959
or like, you know, we want the number of megabytes,

549
00:24:59,959 --> 00:25:01,919
you know, from a single disk times the number of machines

550
00:25:01,919 --> 00:25:04,919
and single applications should be able to exploit that.

551
00:25:04,919 --> 00:25:09,119
And so the way they arranged that is to have a master

552
00:25:09,119 --> 00:25:12,279
that is basically in charge of actually no number things are.

553
00:25:12,279 --> 00:25:14,119
And the client just periodically, you know,

554
00:25:14,119 --> 00:25:17,679
talks to the master to, you know,

555
00:25:17,679 --> 00:25:18,759
to retrieve information.

556
00:25:18,759 --> 00:25:20,839
So for example, it opens a file,

557
00:25:20,839 --> 00:25:23,879
and the open call will result in a message, you know,

558
00:25:23,880 --> 00:25:28,880
to the master and the master will respond back and say,

559
00:25:28,880 --> 00:25:30,920
like all the four digital file name,

560
00:25:30,920 --> 00:25:34,680
the chunks that you need are here,

561
00:25:34,680 --> 00:25:36,640
or these are the chunks that you need.

562
00:25:36,640 --> 00:25:38,360
And there's a chunk handles,

563
00:25:38,360 --> 00:25:40,000
and it's identified for the particular chunks

564
00:25:40,000 --> 00:25:41,800
that constitute a file.

565
00:25:41,800 --> 00:25:45,160
And here are the servers that sure that chunk.

566
00:25:45,160 --> 00:25:47,440
So you get back, you know, a chunk handle,

567
00:25:47,440 --> 00:25:49,680
as well as, you know, a bunch of chunk locations.

568
00:25:50,720 --> 00:25:52,280
And one file might, you know,

569
00:25:52,279 --> 00:25:53,680
basically file consists, you know,

570
00:25:53,680 --> 00:25:55,839
if you think about a big file,

571
00:25:55,839 --> 00:25:57,559
it consists of many, many chunks.

572
00:25:59,440 --> 00:26:01,879
Chunk zero, chunk one,

573
00:26:01,879 --> 00:26:03,720
chunk two, et cetera.

574
00:26:03,720 --> 00:26:05,519
Jump three, blah, blah, blah.

575
00:26:05,519 --> 00:26:06,599
Et cetera, et cetera.

576
00:26:06,599 --> 00:26:09,799
Any check, chunk is pretty big, 64 megabytes.

577
00:26:12,119 --> 00:26:13,639
Next one, really, the application wants to be,

578
00:26:13,639 --> 00:26:15,039
you know, the second second,

579
00:26:15,039 --> 00:26:18,839
second 64 megabyte goes through the divestances,

580
00:26:18,959 --> 00:26:21,119
like hey, I wanna read, you know,

581
00:26:21,119 --> 00:26:24,519
the second chunk, you know, of this particular file,

582
00:26:24,519 --> 00:26:26,599
and then the div answer will answer back

583
00:26:26,599 --> 00:26:28,959
with the handle for chunk one,

584
00:26:28,959 --> 00:26:31,439
as well as the servers that actually hold chunk one.

585
00:26:33,599 --> 00:26:37,159
And so in multiple applications might ask,

586
00:26:37,159 --> 00:26:39,359
you know, for chunks from the same file,

587
00:26:39,359 --> 00:26:41,679
and they will get, you know,

588
00:26:41,679 --> 00:26:44,000
we've got one application might be reading chunk zero,

589
00:26:44,000 --> 00:26:46,240
another application might be already at chunk two,

590
00:26:46,240 --> 00:26:47,920
then we'll get different lists back

591
00:26:47,920 --> 00:26:49,120
for each of these chunks.

592
00:26:50,519 --> 00:26:51,799
So then the GFS client, you know,

593
00:26:51,799 --> 00:26:53,720
wants to know some chunks from chunk locations,

594
00:26:53,720 --> 00:26:56,440
and basically straight talks to the chunk servers.

595
00:26:58,240 --> 00:27:02,000
And you know, basically read, you know, the data,

596
00:27:02,000 --> 00:27:04,319
you know, at the speed of the network,

597
00:27:04,319 --> 00:27:05,960
and you know, maybe whatever disk, you know,

598
00:27:05,960 --> 00:27:08,519
that sits behind this particular chunk server,

599
00:27:08,519 --> 00:27:10,559
directly to the application.

600
00:27:10,559 --> 00:27:12,799
And here you can see where we're gonna get the big win,

601
00:27:12,799 --> 00:27:14,720
right, because we're gonna be able to read, you know,

602
00:27:14,720 --> 00:27:17,440
for multiple, you know, multiple clients

603
00:27:17,440 --> 00:27:19,920
can be reading for multiple disks at the same time,

604
00:27:19,920 --> 00:27:22,480
and we're gonna get like tremendous amount of performance,

605
00:27:22,480 --> 00:27:25,839
right, so for example, you'd like to use a map task running,

606
00:27:25,839 --> 00:27:27,480
use another map task running,

607
00:27:27,480 --> 00:27:29,200
and also use a client, you know,

608
00:27:29,200 --> 00:27:31,759
they, you know, are all gonna be talking to the set of servers,

609
00:27:31,759 --> 00:27:32,880
you know, that whole, you know,

610
00:27:32,880 --> 00:27:35,160
the chunks of all the collection, the data set,

611
00:27:35,160 --> 00:27:36,880
and this is gonna read in parallel

612
00:27:36,880 --> 00:27:39,319
from all those different chunks here.

613
00:27:39,319 --> 00:27:43,360
And that's gonna give us like the high throughput number.

614
00:27:45,200 --> 00:27:46,039
Does that make sense?

615
00:27:46,039 --> 00:27:48,120
Does that sort of be overall plan clear here?

616
00:27:52,720 --> 00:27:54,960
Just to use, sort of completed, like,

617
00:27:54,960 --> 00:27:57,240
the chunk server is nothing really else,

618
00:27:57,240 --> 00:27:58,920
and it's sort of a Linux box,

619
00:27:58,920 --> 00:28:01,360
you know, Linux computer with, you know, disk dudes,

620
00:28:01,360 --> 00:28:03,440
and in fact, the 64 megabyte chunk,

621
00:28:03,440 --> 00:28:06,839
each store there's a Linux file in the Linux file system.

622
00:28:07,839 --> 00:28:08,680
Not good?

623
00:28:12,200 --> 00:28:14,559
Okay, so I wanna zoom in on the different pieces,

624
00:28:14,559 --> 00:28:16,039
and I'll start with the master,

625
00:28:16,039 --> 00:28:20,879
because masters are really the control center around here.

626
00:28:20,879 --> 00:28:22,919
So I'm talking a little bit about the state

627
00:28:22,919 --> 00:28:24,480
that actually the master maintains.

628
00:28:29,480 --> 00:28:32,480
Okay, so first of all, you know,

629
00:28:32,480 --> 00:28:34,839
that has the mapping from filing

630
00:28:37,759 --> 00:28:42,440
to an array of chunk handles.

631
00:28:44,559 --> 00:28:49,559
And as you saw in the paper, one of the goals of actually

632
00:28:52,079 --> 00:28:54,159
is to maintain all this memory

633
00:28:54,159 --> 00:28:56,319
of most of the information actually directly available

634
00:28:56,319 --> 00:28:59,079
in memory, so that the master can respond

635
00:28:59,079 --> 00:29:00,960
to clients very quickly.

636
00:29:00,960 --> 00:29:02,599
And the reason why in reason to do that is

637
00:29:02,599 --> 00:29:05,720
because now there's one master, many clients,

638
00:29:05,720 --> 00:29:08,039
you wanna execute every client operation as efficient

639
00:29:08,039 --> 00:29:10,200
as possible so that you can scale the master

640
00:29:10,200 --> 00:29:12,319
to at least a reasonable number of clients.

641
00:29:13,319 --> 00:29:15,559
And then for every chunk handle,

642
00:29:19,240 --> 00:29:21,399
the master maintains some additional,

643
00:29:21,399 --> 00:29:22,480
if you make it particular,

644
00:29:22,480 --> 00:29:23,720
maintains a version number.

645
00:29:28,759 --> 00:29:33,759
And then a list of chunk servers

646
00:29:35,119 --> 00:29:38,119
that hold a copy of that chunk.

647
00:29:40,000 --> 00:29:41,159
And as we'll see in a second,

648
00:29:41,640 --> 00:29:45,120
one of them is named one of those servers is a primary

649
00:29:46,120 --> 00:29:48,040
and the other one's on it to have secondaries.

650
00:29:50,360 --> 00:29:53,320
And the typical number that a chunk of store tab

651
00:29:53,320 --> 00:29:54,759
is a free search.

652
00:29:54,759 --> 00:29:56,560
And we can maybe talk a little bit later about like,

653
00:29:56,560 --> 00:29:58,160
why free?

654
00:29:58,160 --> 00:30:02,360
And then there is a lease associated with each primary.

655
00:30:02,360 --> 00:30:04,519
So there's a lease time maintained as well.

656
00:30:06,200 --> 00:30:10,040
Then there's two sort of other big sort of storage components

657
00:30:10,039 --> 00:30:13,000
and these are sort of the file system level things

658
00:30:13,000 --> 00:30:14,799
and then the terms of implementation,

659
00:30:14,799 --> 00:30:18,639
there is a log and there are checkpoints.

660
00:30:23,799 --> 00:30:25,639
And since the master is the crucial

661
00:30:25,639 --> 00:30:28,079
in the control center,

662
00:30:28,079 --> 00:30:31,879
whenever there's a change through the name space,

663
00:30:31,879 --> 00:30:35,480
there's generally created a new file in the GFS

664
00:30:35,480 --> 00:30:39,519
where the mapping for filing into junk locks changes,

665
00:30:39,519 --> 00:30:41,639
all those operations are written to this lock

666
00:30:41,639 --> 00:30:44,480
and the lock sits on stable storage.

667
00:30:49,279 --> 00:30:52,639
And the basic idea is that we were,

668
00:30:52,639 --> 00:30:55,839
before we're filing to decline that the change actually has been named

669
00:30:55,839 --> 00:30:58,720
the master writes it to stable storage first

670
00:30:58,720 --> 00:31:00,160
and then responds to decline.

671
00:31:00,160 --> 00:31:04,119
And so this means that if the master fails or crashes,

672
00:31:04,119 --> 00:31:06,920
then later comes back up and it can replay the lock

673
00:31:06,920 --> 00:31:09,880
and reconstruct the state of its internal state.

674
00:31:10,960 --> 00:31:13,400
And by writing it first to store it to the four

675
00:31:13,400 --> 00:31:14,600
response to the client,

676
00:31:14,600 --> 00:31:17,320
the client will never have jurisdiction results.

677
00:31:17,320 --> 00:31:19,320
You could do the other way around correct

678
00:31:19,320 --> 00:31:21,800
and that result in a problem because the client will think

679
00:31:21,800 --> 00:31:23,640
that the file has be created, serve a crash,

680
00:31:23,640 --> 00:31:26,360
it will be back up and then the file doesn't exist.

681
00:31:26,360 --> 00:31:30,200
So these are of another consistency point.

682
00:31:31,560 --> 00:31:33,840
Now replaying always from all the operations

683
00:31:33,840 --> 00:31:36,400
from the beginning of time to the log is of course undesirable

684
00:31:36,519 --> 00:31:39,400
means that if the master crashes and we're probably one of them

685
00:31:39,400 --> 00:31:41,240
will be down for a long time.

686
00:31:41,240 --> 00:31:42,440
So in this you do not,

687
00:31:42,440 --> 00:31:45,400
it actually keeps checkpoints in stable storage.

688
00:31:47,360 --> 00:31:50,400
So periodically the master makes a checkpoint

689
00:31:50,400 --> 00:31:52,880
of its internal state and the mapping fulfillment

690
00:31:52,880 --> 00:31:57,880
to re-chunk on those and stores that on stable storage.

691
00:31:58,960 --> 00:32:01,680
And so then they only have to replay the last part

692
00:32:01,680 --> 00:32:03,519
of basically all the operations in the log

693
00:32:03,519 --> 00:32:05,080
after the last checkpoints.

694
00:32:05,079 --> 00:32:06,559
So the recovery is actually quickly.

695
00:32:08,279 --> 00:32:09,679
So there's another couple of interesting questions

696
00:32:09,679 --> 00:32:12,199
that we can ask ourselves like what state does need

697
00:32:12,199 --> 00:32:15,279
to end up in stable storage for the master

698
00:32:15,279 --> 00:32:17,240
to actually function correctly.

699
00:32:17,240 --> 00:32:19,919
And so the first question to ask is how about this array

700
00:32:19,919 --> 00:32:23,759
of chunk handles, the mapping for file name to chunk handles

701
00:32:23,759 --> 00:32:26,399
was that need to be stable storage

702
00:32:27,399 --> 00:32:28,919
or can it be only memory?

703
00:32:35,919 --> 00:32:38,919
If the master crashes,

704
00:32:38,919 --> 00:32:42,919
I think you can like get that information from the servers,

705
00:32:42,919 --> 00:32:47,919
chunk servers, so maybe only main memory.

706
00:32:49,919 --> 00:32:51,679
Yeah, well, let's do some questions.

707
00:32:51,679 --> 00:32:52,919
What other people think?

708
00:32:52,919 --> 00:32:55,559
So it can be reconstructed from the log.

709
00:32:55,559 --> 00:32:58,879
So when the server crashes, only the log needs to be

710
00:32:58,879 --> 00:33:02,079
in the hard storage and then it can reload it

711
00:33:02,079 --> 00:33:03,079
from the log.

712
00:33:03,079 --> 00:33:05,079
So we read that there's a rate of check homeless

713
00:33:05,079 --> 00:33:07,079
basically has to be in stable storage.

714
00:33:11,079 --> 00:33:13,079
Otherwise we lose, like we create a file

715
00:33:13,079 --> 00:33:15,079
and we didn't write the stable storage,

716
00:33:15,079 --> 00:33:16,079
which is lose to file, right?

717
00:33:16,079 --> 00:33:19,079
And so this mapping for file name to chunk handles

718
00:33:19,079 --> 00:33:21,079
needs to be in stable storage.

719
00:33:21,079 --> 00:33:25,079
How about this chunk handle to a list of chunk for our servers?

720
00:33:27,079 --> 00:33:29,119
Is that actually the number of cases that we have

721
00:33:29,119 --> 00:33:30,119
in the server?

722
00:33:31,119 --> 00:33:33,119
Is that actually need to be in the log?

723
00:33:35,119 --> 00:33:40,119
I think in the paper they say that when the master reboots,

724
00:33:41,119 --> 00:33:46,119
it asks the servers to tell the master what the chunks

725
00:33:46,119 --> 00:33:48,119
that they have are.

726
00:33:48,119 --> 00:33:49,119
Yeah, great.

727
00:33:49,119 --> 00:33:52,119
So this is not actually, this is basically just volatile state,

728
00:33:52,119 --> 00:33:55,119
not stable storage.

729
00:33:55,119 --> 00:33:59,119
So in the same is the true of the primary and the secondaries,

730
00:34:00,119 --> 00:34:03,119
and two of the least time, how about the version number?

731
00:34:11,119 --> 00:34:14,119
Is the master need to remember on stable storage

732
00:34:14,119 --> 00:34:16,119
the version number or not?

733
00:34:16,119 --> 00:34:22,119
Yes, because it needs to know if the chunks in the other servers

734
00:34:22,119 --> 00:34:23,119
are scale or not.

735
00:34:23,119 --> 00:34:24,119
Yeah, exactly.

736
00:34:24,119 --> 00:34:25,119
Exactly.

737
00:34:25,119 --> 00:34:26,119
Exactly right.

738
00:34:26,119 --> 00:34:31,119
So the master must remember the version number because if it

739
00:34:31,119 --> 00:34:36,119
doesn't and like the whole system went down and the term servers came back up

740
00:34:36,119 --> 00:34:40,119
and maybe the chunk server actually with the most recent data does not come up about

741
00:34:40,119 --> 00:34:43,119
and older guy goes out with like version number 14,

742
00:34:43,119 --> 00:34:46,119
then the master has to be able to tell that, you know, that chunk server

743
00:34:46,119 --> 00:34:51,119
with version number 14 was not the most recent chunk server.

744
00:34:51,119 --> 00:34:54,119
And so it needs to maintain, you know, the version number on disk

745
00:34:54,119 --> 00:34:58,119
and the next one can tell which chunk server actually have the most updated information

746
00:34:58,119 --> 00:35:00,119
and which ones don't.

747
00:35:00,119 --> 00:35:01,119
Okay.

748
00:35:01,119 --> 00:35:03,119
I have a question here.

749
00:35:03,119 --> 00:35:04,119
Yeah.

750
00:35:04,119 --> 00:35:09,119
If, well, I mean, if the master failed and then it has to come up,

751
00:35:09,119 --> 00:35:15,119
it's anyway going to connect to all of the chunk servers and it will find out

752
00:35:15,119 --> 00:35:18,119
what the largest version is.

753
00:35:18,119 --> 00:35:20,119
Yeah, server right.

754
00:35:20,119 --> 00:35:24,119
Does the ability to find out what the last, first of all,

755
00:35:24,119 --> 00:35:26,119
will try to talk to all chunk servers, right?

756
00:35:26,119 --> 00:35:28,119
And some chunk servers might be down.

757
00:35:28,119 --> 00:35:29,119
Okay.

758
00:35:29,119 --> 00:35:34,119
And that may be just the chunk server actually has the most recent version.

759
00:35:34,119 --> 00:35:35,119
Yeah, okay.

760
00:35:35,119 --> 00:35:46,119
So you can't take the max of the life chunk servers that we incorrect.

761
00:35:46,119 --> 00:35:52,119
And the other questions about this.

762
00:35:52,119 --> 00:35:57,119
Okay, let's look at the two major basic operations to really get down to consistency.

763
00:35:57,119 --> 00:36:00,119
And of course, you know, that's going to be reading and writing.

764
00:36:00,119 --> 00:36:02,119
So reading a file.

765
00:36:02,119 --> 00:36:04,119
And then we'll talk about writing a file.

766
00:36:04,119 --> 00:36:07,119
So reading file in some sense is straightforward.

767
00:36:07,119 --> 00:36:11,119
We talked about it basically client, since message to.

768
00:36:11,119 --> 00:36:14,119
With the file name plus offsets.

769
00:36:14,119 --> 00:36:16,119
To the master.

770
00:36:16,119 --> 00:36:20,119
And basically ask, you know, please give me, you know, the.

771
00:36:20,119 --> 00:36:25,119
chunk servers and the chunk handle that.

772
00:36:25,119 --> 00:36:30,119
That hold that hold the data at that offset.

773
00:36:30,119 --> 00:36:33,119
And so it ends up the chunk handle.

774
00:36:33,119 --> 00:36:37,119
So like I read by it, you know, whatever, zero, you know, it's pretty clear.

775
00:36:37,119 --> 00:36:43,119
Right, that has to be the first entry in the list, you know, from filing to.

776
00:36:43,119 --> 00:36:46,119
To chunk handle.

777
00:36:46,119 --> 00:36:51,119
So I am putting a master find to chunk handle basically replies, you know, with the.

778
00:36:51,119 --> 00:36:57,119
Master replies to the client with, you know, the chunk handle.

779
00:36:57,119 --> 00:37:01,119
And list of chunk servers.

780
00:37:01,119 --> 00:37:03,119
For that.

781
00:37:03,119 --> 00:37:09,119
For that handle in version of.

782
00:37:09,119 --> 00:37:15,119
So basically the client gets back and message saying, you know, that's chunk, you know, 221.

783
00:37:15,119 --> 00:37:20,119
And here are the free machines with the IP address with the free machines that actually have it.

784
00:37:20,119 --> 00:37:26,119
And the version number is like version of 10.

785
00:37:26,119 --> 00:37:35,119
Then the client catches this list.

786
00:37:35,119 --> 00:37:40,119
And then I basically sends a message to the closest.

787
00:37:40,119 --> 00:37:45,119
Reach from closest.

788
00:37:45,119 --> 00:37:52,119
Sure.

789
00:37:52,119 --> 00:37:58,119
And so why does the client actually read cash this information.

790
00:37:58,119 --> 00:38:01,119
We see later correct that actually costs some problems.

791
00:38:01,119 --> 00:38:04,119
So it doesn't have to contact the master for some time.

792
00:38:04,119 --> 00:38:09,119
If it wants to read again or write to that.

793
00:38:09,119 --> 00:38:12,119
Yeah, and why is that important.

794
00:38:12,119 --> 00:38:16,119
To like reduce the, I guess, a traffic.

795
00:38:16,119 --> 00:38:21,119
And in general, it takes less time if you have less communication with the master.

796
00:38:21,119 --> 00:38:27,119
Yeah, and then you know, the same with aspect, correct, this design is that the master actually is a single machine.

797
00:38:27,119 --> 00:38:32,119
And single machine can just ask a limit amount of memory and a limit of network interface.

798
00:38:32,119 --> 00:38:36,119
And so you have too many clients talking to it, you know, we'll be able to serve.

799
00:38:36,119 --> 00:38:37,119
Right.

800
00:38:37,119 --> 00:38:42,119
And so client cash was important to reduce the load of this single machine.

801
00:38:42,119 --> 00:38:47,119
Okay, why read from the closest server.

802
00:38:47,119 --> 00:38:49,119
Minimize network traffic.

803
00:38:49,119 --> 00:38:50,119
Yeah, minimize network traffic.

804
00:38:50,119 --> 00:38:56,119
Yeah, so the whole goal of right is to pump as much data, you know, to the client is possible of the highest throughput.

805
00:38:56,119 --> 00:39:01,119
And, you know, we have to have to have to, you know, two problems that we have to cross with the data center network.

806
00:39:01,119 --> 00:39:08,119
One, you know, there's probably some topology and maybe swung like the top links of that apology.

807
00:39:08,119 --> 00:39:13,119
And they actually increased latency, you know, to actually get to the other side.

808
00:39:13,119 --> 00:39:25,119
Right. So it's important to be able to read to the close site again to basically maximize, you know, the throughput, you know, that joint set of compliance, you know, can sort of experience from the reading and parallel from many, many chunk servers.

809
00:39:25,119 --> 00:39:28,119
Okay.

810
00:39:28,119 --> 00:39:35,119
So the chunk server, you know, S, you know, check the version number.

811
00:39:35,119 --> 00:39:42,119
And the version numbers, okay, you know, then send data.

812
00:39:42,119 --> 00:39:44,119
Okay.

813
00:39:44,119 --> 00:39:50,119
Why is the check with the version number there?

814
00:39:50,119 --> 00:39:53,119
The check if it's to stay.

815
00:39:53,119 --> 00:39:56,119
Yeah.

816
00:39:56,119 --> 00:39:59,119
You know, we usually do our best to avoid reading scale data.

817
00:39:59,119 --> 00:40:10,119
You know, as we're seeing second, we don't do, you know, do a perfect job at me, and we try hard to minimize, you know, the occurrences of the claims reading, scale data.

818
00:40:10,119 --> 00:40:12,119
Okay.

819
00:40:12,119 --> 00:40:15,119
That's reading, reasonable straightforward.

820
00:40:15,119 --> 00:40:19,119
So let's look at the writing.

821
00:40:19,119 --> 00:40:25,119
So this is the picture from the paper.

822
00:40:25,119 --> 00:40:41,119
And so let's say you climb once the, you know, let's focus on the pen.

823
00:40:41,119 --> 00:40:47,119
And so the, the argument that they're common operation for them is to depend on a record to the file.

824
00:40:47,119 --> 00:41:02,119
And can you see why you're given what you guys know from, you know, sort of map deduces and, you know, Google, just that makes sense that why I've had to show important.

825
00:41:02,119 --> 00:41:05,119
Because largely in doing map produce.

826
00:41:05,119 --> 00:41:16,119
You need to, or as the map function spits out information, it's largely just adding on information rather than changing previously spit out the operations.

827
00:41:16,119 --> 00:41:17,119
Yeah.

828
00:41:17,119 --> 00:41:23,119
Maybe the map is not the best example, but we're going to write it to local file system, not to gfs, but the reducer does.

829
00:41:23,119 --> 00:41:26,119
Same argument also the addition.

830
00:41:26,119 --> 00:41:36,119
So we're going to be in the work list that are writing is basically consume a lot of information and, you know, end records to the file with the result in competition with result of the competition.

831
00:41:36,119 --> 00:41:37,119
Okay.

832
00:41:37,119 --> 00:41:41,119
Good. So, you know, step one, you know, we have a client.

833
00:41:41,119 --> 00:41:45,119
It will talk to the master to figure out like where to write.

834
00:41:45,119 --> 00:41:57,119
And then the master looks in its, you know, table or the file main to chunk handles.

835
00:41:57,119 --> 00:42:06,119
And find some of the chunk handles and then you know looks at this table of chunk, chunk handles.

836
00:42:06,119 --> 00:42:08,119
To servers.

837
00:42:08,119 --> 00:42:14,119
To find the list of servers that it has that half a particular thing that have that particular chunk.

838
00:42:14,119 --> 00:42:16,119
Okay, so what happens next?

839
00:42:16,119 --> 00:42:17,119
So there's two cases.

840
00:42:17,119 --> 00:42:23,119
When there is already a primary in the second case, the first case, well, the two cases, having a primary or not a crime.

841
00:42:23,119 --> 00:42:31,119
So let's say this is the very first time that this particular client contacts the master for this particular chunk nobody else has done it so far.

842
00:42:31,119 --> 00:42:32,119
So there's no primary.

843
00:42:32,119 --> 00:42:40,119
So that case, you know, we need to do the master needs to pick a primary, right? How does it do that?

844
00:42:40,119 --> 00:42:45,119
I think the master just picks any of the available chunk servers, right?

845
00:42:45,119 --> 00:42:46,119
Yep.

846
00:42:46,119 --> 00:42:51,119
So pick one. So pick one of those primary and the other ones are the secondary.

847
00:42:51,119 --> 00:42:54,119
What other steps are involved in this sort of.

848
00:42:54,119 --> 00:42:58,119
Yeah, and then subsequently the master grants a lease.

849
00:42:58,119 --> 00:43:04,119
To that primary and that lease has a certain like a date of expiry.

850
00:43:04,119 --> 00:43:10,119
Yeah, what else does it have? One more other piece of crucial information.

851
00:43:10,119 --> 00:43:12,119
Even.

852
00:43:12,119 --> 00:43:14,119
It increments the version number.

853
00:43:14,119 --> 00:43:15,119
Yeah, increment.

854
00:43:15,119 --> 00:43:19,119
Oh, yeah, step one is increment the version number.

855
00:43:19,119 --> 00:43:29,119
Because you're going to make a new primary and whenever time you make a new primary, you go to like one of a think about this like a new epoch in the end of the file system.

856
00:43:29,119 --> 00:43:35,119
This particular file is you create the version of you can have a new mutator.

857
00:43:35,119 --> 00:43:38,119
So basically the master increases the version number.

858
00:43:38,119 --> 00:43:48,119
Yeah, it sends to the primary, the new version over in the secondaries and saying like, hey guys, we're going to start a new.

859
00:43:48,119 --> 00:43:49,119
We understood a new mutation.

860
00:43:49,119 --> 00:43:57,119
You guys are forming a replica group and your replica group with this particular version of whatever version number 12.

861
00:43:57,119 --> 00:44:07,119
And the primary is in the second there's stored a version of what to do is they store that version number.

862
00:44:07,119 --> 00:44:16,119
They sort of down disk on their disks were in memory or.

863
00:44:16,119 --> 00:44:19,119
I don't know.

864
00:44:19,119 --> 00:44:22,119
What do we, what do we think?

865
00:44:22,119 --> 00:44:24,119
Okay, let's first do memory.

866
00:44:24,119 --> 00:44:29,119
Let's say it's the storage of the memory would that be good design?

867
00:44:29,119 --> 00:44:32,119
No, sorry.

868
00:44:32,119 --> 00:44:39,119
You know, I guess it wouldn't because if the chance server goes down and then it comes back up, it.

869
00:44:39,119 --> 00:44:41,119
It should know what version it has.

870
00:44:41,119 --> 00:44:48,119
Yeah, because otherwise it couldn't convince the primary that it has the most recent one right otherwise the prime of the short of the master could pick the chart with the most recent data.

871
00:44:48,119 --> 00:44:58,119
So it has to be on this. So basically this version number lives on this bove at the chunk servers and at master.

872
00:44:58,119 --> 00:45:05,119
So when the chunch when the master gets back, you know, the acknowledgements from the primary and the secondary that they.

873
00:45:05,119 --> 00:45:17,119
Written the version number to a disk and that the primary actually has received the least, then you know the master also think rights its version number to disk and then response to the client.

874
00:45:17,119 --> 00:45:20,119
Okay.

875
00:45:20,119 --> 00:45:30,119
So to back to the client that responds with the list of servers, then it's primary plus the secondaries plus the version number.

876
00:45:30,119 --> 00:45:32,119
Okay.

877
00:45:32,119 --> 00:45:44,119
Then you know the next step and again here we see the whole goal is to fight a lot of data through the network is the client actually just sends the data that wants right to the primary and the secondaries.

878
00:45:44,119 --> 00:45:53,119
And the way it actually does it is sort of an interesting way and basically context the closest secondary knows of, you know, out of this list and since the data there.

879
00:45:53,119 --> 00:46:01,119
And that secondary you know move the data over to the next, you know, personally, the list and then to the next server in the list.

880
00:46:01,119 --> 00:46:08,119
And so this way, you know, the data sort of pumped, you know, from the client, you know, to the pipeline to all the replicas.

881
00:46:08,119 --> 00:46:17,119
And you know, and you know, when the secondary receives the first secondary receives some of the data immediately starts actually pushing the data to the further down the pipeline.

882
00:46:17,119 --> 00:46:19,119
Okay.

883
00:46:19,119 --> 00:46:29,119
The reason that this design is this way, you sort of basically this network interface that the client has to go through the outside world usually use this is a full network interface to push the data down the pipeline.

884
00:46:29,119 --> 00:46:32,119
So this is high throughput.

885
00:46:32,119 --> 00:46:35,119
Okay.

886
00:46:35,119 --> 00:46:48,119
And you know, if this is all successful and the data has been pushed to all the servers, those servers don't store that information on this yet, you know, just sits there, you know, sort of on the site, you know, to be used in the next step.

887
00:46:48,119 --> 00:47:02,119
And so the next step is basically for the client to send a message like an append message to the primary and at that point, you know, the primary will check, you know, the version number right.

888
00:47:02,119 --> 00:47:10,119
Or actually version of corresponds to the version number and if it doesn't, you know, respond to each day, no match, and then the primary won't allow it.

889
00:47:10,119 --> 00:47:13,119
The primary checks is lease is the leases valid.

890
00:47:13,119 --> 00:47:23,119
Because the lease is not valid anymore, it cannot accept any rotation operations because it is leases not valid, there might be another primary now outside in the world.

891
00:47:23,119 --> 00:47:34,119
So it checks the lease and then if you know, basically the version of the match, the leases still valid and basically picks an offset to write it.

892
00:47:34,119 --> 00:47:41,119
And then the next step is basically write, you know, the data that just came in, you know, this record to stable storage.

893
00:47:41,119 --> 00:47:46,119
So the primary actually at this point, writes it to stable storage to data.

894
00:47:46,119 --> 00:47:51,119
And then sends messages to the secondary, saying, please write the data to.

895
00:47:51,119 --> 00:48:00,119
And since the primary picks the offsets, you know, the it tells the second there's word right, you know, that particular record into the file.

896
00:48:00,119 --> 00:48:12,119
So maybe like whatever it picks the offset, you know, 125 and it will tell the secondary, you know, all to write, you know, the data that came in earlier at cost at 125.

897
00:48:12,119 --> 00:48:28,119
And then, you know, if everything works out, you know, everybody, all the second areas and the primary successfully write their data back, you know, to this and actually responds back to the client saying like, OK, success, your appendix really has happened.

898
00:48:28,119 --> 00:48:36,119
And the way the, the right actually might be not successful or it might not be successful and namely, for example, the primary is written through its own disk.

899
00:48:36,119 --> 00:48:46,119
But it fails to write it, you know, it fails to connect to one of the secondary, maybe the secondary actually crashed or maybe the secondary just has a network connection that doesn't work.

900
00:48:46,119 --> 00:48:59,119
And in that case, the primary actually returns an error to the client. So error if one secondary didn't respond.

901
00:48:59,119 --> 00:49:22,119
And in that case, the client library, one of will do is usually try a retry. It will reissue the same append and we'll try again in the hope that the second time around, you know, that data actually wants to get through.

902
00:49:22,119 --> 00:49:31,119
And so this is what they recall, like you do the least once.

903
00:49:31,119 --> 00:49:37,119
If you retry, will the primary pick the same offset.

904
00:49:37,119 --> 00:49:38,119
I don't think so.

905
00:49:38,119 --> 00:49:39,119
No, no, right.

906
00:49:39,119 --> 00:49:53,119
And you write the, and write it at the disk, new particular offset. And so that means, right, if you look at sort of the disk of the, you know, the file on the free replica.

907
00:49:53,119 --> 00:50:07,119
And the primary S1 and S2, it might be the case of the new roots, like, you know, at 125, the data, we succeeded maybe in S212, but S2 actually doesn't have no data.

908
00:50:07,119 --> 00:50:15,119
Right. And then we retry again, then we might write the same data to X and maybe we'll succeed in all three.

909
00:50:15,119 --> 00:50:21,119
So you see here that basically replicate records can be duplicated.

910
00:50:21,119 --> 00:50:32,119
Is this something that can happen in a standard file system, like your Linux file system or your laptop for your computer.

911
00:50:32,119 --> 00:50:40,119
No, no, would it be surprised if this computer did this.

912
00:50:40,119 --> 00:50:43,119
I mean, yeah, this is not how standard file rates work.

913
00:50:43,119 --> 00:50:53,119
Yeah, and it would be inconvenient to have this property or is like, doesn't matter.

914
00:50:53,119 --> 00:50:56,119
I think it would be nice.

915
00:50:56,119 --> 00:51:02,119
Yeah, you know, you pretty bizarre, like, you know, presumably, like, you know, you could buy or you know, produce out boots in a file.

916
00:51:02,119 --> 00:51:07,119
And then maybe, you know, certain blocks are written twice. And then you can't run the program anymore.

917
00:51:07,119 --> 00:51:11,119
Like, you know, the whole thing is just garbage at that point.

918
00:51:11,119 --> 00:51:17,119
So it would just be weird, but like you're writing email message and basically the body of the email message shows your players.

919
00:51:17,119 --> 00:51:22,119
This is not what you typical files system would do. And so this is like a slightly bizarre.

920
00:51:22,119 --> 00:51:30,119
And you know, what is the justification? Why, why, why do you think this is a good idea?

921
00:51:30,119 --> 00:51:35,119
I'm not sure what's the secret idea, but I'm confused how that works for a map produced specifically.

922
00:51:35,119 --> 00:51:48,119
So if you run word count and you do that and like some files and you count, and they're like word A, it shows up once, but you do it twice because something failed.

923
00:51:48,119 --> 00:51:52,119
And now you have a one a one. So your account is going to be wrong.

924
00:51:52,119 --> 00:51:55,119
How, how do yeah, I'm confused.

925
00:51:55,119 --> 00:52:08,119
Yes, what do they work and seems like you don't do anything. Then this is really highly inconvenient or like, so it returns the application will complete the wrong result.

926
00:52:08,119 --> 00:52:16,119
They said, the use check some and unique ideas to check, you know, that every.

927
00:52:16,119 --> 00:52:20,119
Yeah, every record was like one.

928
00:52:20,119 --> 00:52:36,119
Additionally, when you do record append the response, which is returned from the primary to the client gives you the offset into the file where your data was actually written and the rest of it is assumed to be like undefined.

929
00:52:36,119 --> 00:52:49,119
Yeah, I think the key point here, correct is like the basically the application doesn't interact with the files directly interacts with your official library and the library basically if you write append records, the library sticks an idea in it.

930
00:52:49,119 --> 00:52:59,119
And so, and also you lose the library to read these records. And so you see a record that the same idea, you know, you skip the second one because it's clearly the same one.

931
00:52:59,119 --> 00:53:05,119
And, you know, they have a double extra thing and therefore check some to make sure that the record didn't get garbled.

932
00:53:05,119 --> 00:53:13,119
And basically to detect the changes in the bytes, but the idea basically helps them to site.

933
00:53:13,119 --> 00:53:19,119
Or allows the library to decide, well, this is the same record, I'm just not going to get to the application.

934
00:53:19,119 --> 00:53:22,119
Or the applications need to process it.

935
00:53:22,119 --> 00:53:24,119
Okay.

936
00:53:24,119 --> 00:53:35,119
So my question is instead of rewriting to every replica, we're going to be better to remember which replica is failing and to stop until it can be returned to that one.

937
00:53:35,119 --> 00:53:42,119
Yeah, there's a bunch of different designs possible when you let's return to that later.

938
00:53:42,119 --> 00:53:52,119
And I think one reason that they do this this way is like if there's a pray, you know, temporary failure, like a network disconnection or whatever, you know, the least the right will succeed and they will continue.

939
00:53:52,119 --> 00:53:59,119
And just have to be any reconfiguration and the rest of the nothing, you know, the right can just keep going.

940
00:53:59,119 --> 00:54:03,119
Right. And so the right doesn't have to fail.

941
00:54:03,119 --> 00:54:05,119
Okay.

942
00:54:05,119 --> 00:54:13,119
So the question in general, the all of these servers are trusted, right?

943
00:54:13,119 --> 00:54:14,119
Yes.

944
00:54:14,119 --> 00:54:15,119
Absolutely.

945
00:54:15,119 --> 00:54:16,119
This is actually an important point.

946
00:54:16,119 --> 00:54:23,119
This is not like, you know, your Linux file system where there's permissions and access control rights and all that kind of stuff.

947
00:54:23,119 --> 00:54:25,119
These servers are completely trusted.

948
00:54:25,119 --> 00:54:32,119
The clients are trusted, the master's trusted, the software written by Google is structured. The whole thing is trusted.

949
00:54:32,119 --> 00:54:35,119
And then you can see the internal file system.

950
00:54:35,119 --> 00:54:37,119
In fact, they're just sort of cool.

951
00:54:37,119 --> 00:54:42,119
It's like a little bit maybe surprising that we even know about this file system in search of on detail, right?

952
00:54:42,119 --> 00:54:49,119
Because some of the things I Google and one of the cool things is that you know that period of time and still they do.

953
00:54:49,119 --> 00:54:52,119
They wrote up the papers and describing actually how the system worked.

954
00:54:52,119 --> 00:54:54,119
And there's one reason we can we know that.

955
00:54:54,119 --> 00:54:59,119
And that's extremely cool that they did that.

956
00:54:59,119 --> 00:55:01,119
Okay.

957
00:55:01,119 --> 00:55:04,119
So, okay, so we don't understand how read works.

958
00:55:04,119 --> 00:55:05,119
We understand that right works.

959
00:55:05,119 --> 00:55:08,119
You know, there's some sort of interesting.

960
00:55:08,119 --> 00:55:09,119
The havers.

961
00:55:09,119 --> 00:55:13,119
Now, I want to talk a little bit more about the consistency correct. And that really comes down to.

962
00:55:13,119 --> 00:55:15,119
I get a.

963
00:55:15,119 --> 00:55:18,119
What those read of jurors after you know, you did a depend.

964
00:55:18,119 --> 00:55:21,119
And you know, the homework question.

965
00:55:21,119 --> 00:55:22,119
We got it to this.

966
00:55:22,119 --> 00:55:26,119
And so whatever I like to do now is I take a quick break out like five minutes.

967
00:55:26,119 --> 00:55:34,119
And so we can discuss the answer to this question and then come back and talk a little bit more in detail with consistency.

968
00:55:34,119 --> 00:55:36,119
Okay.

969
00:55:36,119 --> 00:55:40,119
So I'm going to.

970
00:55:40,119 --> 00:55:43,119
Make really.

971
00:55:43,119 --> 00:55:44,119
Okay.

972
00:55:44,119 --> 00:55:46,119
Everybody back.

973
00:55:46,119 --> 00:55:49,119
Everybody can you make double checking.

974
00:55:49,119 --> 00:55:50,119
Yeah, I hate to ask a question.

975
00:55:50,119 --> 00:55:55,119
And then you can go back to this slide with the.

976
00:55:55,119 --> 00:55:57,119
When we talked about the right side here.

977
00:55:57,119 --> 00:56:03,119
So you mentioned the master responds to the client with the version number.

978
00:56:03,119 --> 00:56:06,119
And if that is the keys, then is it possible?

979
00:56:06,119 --> 00:56:08,119
Is it even possible?

980
00:56:08,119 --> 00:56:14,119
Would it even have to be like his say data because the client has a version number and the chunk servers without the version number.

981
00:56:14,119 --> 00:56:16,119
So they can just compare those.

982
00:56:16,119 --> 00:56:18,119
If they don't match the cloud that.

983
00:56:18,119 --> 00:56:19,119
The chunks are chunks of chunks.

984
00:56:19,119 --> 00:56:23,119
Errors can just say I have a stability at so.

985
00:56:23,119 --> 00:56:25,119
You should not read this.

986
00:56:25,119 --> 00:56:26,119
Okay.

987
00:56:26,119 --> 00:56:27,119
Let's go for the snare.

988
00:56:27,119 --> 00:56:28,119
A little bit more detail.

989
00:56:28,119 --> 00:56:29,119
We actually did this.

990
00:56:29,119 --> 00:56:36,119
Well, no.

991
00:56:36,119 --> 00:56:37,119
Okay. Let's talk about it.

992
00:56:37,119 --> 00:56:39,119
So I think the snare that we're talking about.

993
00:56:39,119 --> 00:56:42,119
That leads into a problematic situation follows.

994
00:56:42,119 --> 00:56:44,119
We have a primary.

995
00:56:44,119 --> 00:56:46,119
We have a secondary to second.

996
00:56:46,119 --> 00:56:47,119
Secondary.

997
00:56:47,119 --> 00:56:50,119
One. Secondary to you.

998
00:56:50,119 --> 00:56:52,119
We have a client at this site.

999
00:56:52,119 --> 00:56:55,119
We have a primary.

1000
00:56:55,119 --> 00:56:56,119
The client reached.

1001
00:56:56,119 --> 00:57:04,119
You know, it's back like a version of her say 10.

1002
00:57:04,119 --> 00:57:11,119
The later on, you know, the other primary will.

1003
00:57:11,119 --> 00:57:17,119
So.

1004
00:57:17,119 --> 00:57:18,119
Okay. So S2.

1005
00:57:18,119 --> 00:57:20,119
It gets some servers.

1006
00:57:20,119 --> 00:57:22,119
Then it's on point.

1007
00:57:22,119 --> 00:57:26,119
It's a disinformation is cash.

1008
00:57:26,119 --> 00:57:29,119
On the site, you know, maybe the.

1009
00:57:29,119 --> 00:57:33,119
One of the thing as secondary is like S2 crashes.

1010
00:57:33,119 --> 00:57:37,119
Or it appears to be disconnected from the network.

1011
00:57:37,119 --> 00:57:40,119
So what the master will do is increment the version numbers.

1012
00:57:40,119 --> 00:57:46,119
So that's a number of.

1013
00:57:46,119 --> 00:57:54,119
So that's.

1014
00:57:54,119 --> 00:57:56,119
That's a number of 11.

1015
00:57:56,119 --> 00:57:58,119
It's a message used 11 11.

1016
00:57:58,119 --> 00:58:01,119
And then, you know, another client may come wrong and start writing.

1017
00:58:01,119 --> 00:58:02,119
So, you know, right.

1018
00:58:02,119 --> 00:58:04,119
In a new value to S1 and S2.

1019
00:58:04,119 --> 00:58:05,119
For the file.

1020
00:58:05,119 --> 00:58:07,119
So the chunk has now been updated.

1021
00:58:07,119 --> 00:58:09,119
And there are two.

1022
00:58:09,119 --> 00:58:10,119
But the second client.

1023
00:58:10,119 --> 00:58:15,119
The first client can still talk to the secondary and it will read the version numbers match.

1024
00:58:15,119 --> 00:58:16,119
Right.

1025
00:58:16,119 --> 00:58:17,119
They're both 10.

1026
00:58:17,119 --> 00:58:18,119
And it will read.

1027
00:58:18,119 --> 00:58:22,119
And we'll send 10 back.

1028
00:58:22,119 --> 00:58:26,119
Right. So here we have the case where the right has completed.

1029
00:58:26,119 --> 00:58:28,119
And it's acknowledged to be okay.

1030
00:58:28,119 --> 00:58:32,119
And nevertheless there's a client that actually will read to still value back.

1031
00:58:32,119 --> 00:58:35,119
So why doesn't that 11 go back to the client?

1032
00:58:35,119 --> 00:58:38,119
The first client.

1033
00:58:38,119 --> 00:58:43,119
The reason is because the first client passes it for a longer period of time.

1034
00:58:43,119 --> 00:58:50,119
I mean, they know actually have anything to protocol that actually dust.

1035
00:58:50,119 --> 00:58:54,119
So does the version increments when the.

1036
00:58:54,119 --> 00:58:57,119
When the system tries to push an update to S2.

1037
00:58:57,119 --> 00:59:00,119
And it's not able to or.

1038
00:59:00,119 --> 00:59:04,119
And so there's only increment the version numbers maintained by the master.

1039
00:59:04,119 --> 00:59:13,119
Only increment when you select a new primary.

1040
00:59:13,119 --> 00:59:14,119
Not when you do it.

1041
00:59:14,119 --> 00:59:17,119
There's an also serial number that they talk about.

1042
00:59:17,119 --> 00:59:23,119
But that's different from the version or that's just order, you know, the rights.

1043
00:59:23,119 --> 00:59:24,119
Okay.

1044
00:59:24,119 --> 00:59:32,119
So how does the primary know which secondary is asked to check with before making before completing a right successfully?

1045
00:59:32,119 --> 00:59:34,119
The primary master tells us.

1046
00:59:34,119 --> 00:59:40,119
Master tells the primary here the second day as you update.

1047
00:59:40,119 --> 00:59:43,119
So when the master basically issues the leads to the primary.

1048
00:59:43,119 --> 00:59:53,119
And if one of the secondary is down at that moment, does the master considered a failure or does it just update the version number for the servers that are alive.

1049
00:59:53,119 --> 00:59:59,119
And it just forgets about the other one because it's going to have an outdated version of it anyway.

1050
00:59:59,119 --> 01:00:05,119
Yeah, you know, the papers, a little bit vague and then jack and you have the recovery part or sort of the.

1051
01:00:05,119 --> 01:00:07,119
Reconfiguration stuff or works.

1052
01:00:07,119 --> 01:00:13,119
But I imagine that you know, basically the primary actually does have a beach with P1 S1 and S2.

1053
01:00:13,119 --> 01:00:16,119
It's on point that the site's going to S2 is dead.

1054
01:00:16,119 --> 01:00:22,119
And at that point, it will point and the lose of the primary maybe runs out.

1055
01:00:22,119 --> 01:00:31,119
And then it will create a new primary and a new S1 and another S, you know, to actually hold, you know, or maybe just S1 because there's no.

1056
01:00:31,119 --> 01:00:37,119
No additional chunk server and that form the new replica group for that chunk.

1057
01:00:37,119 --> 01:00:41,119
Also, the lease doesn't run out yet.

1058
01:00:41,119 --> 01:00:46,119
Well, the primary can't point, okay, so usual, like some interesting cases.

1059
01:00:46,119 --> 01:00:50,119
So you guys are doing exactly the thing I want.

1060
01:00:50,119 --> 01:00:54,119
Based on this paper, which is you really start thinking about all the problem at a cases.

1061
01:00:54,119 --> 01:00:56,119
And this is exactly how you think about consistency.

1062
01:00:56,119 --> 01:01:01,119
You know, when you start thinking about consistency, you need to sort of consider all possible failures.

1063
01:01:01,119 --> 01:01:05,119
And argue whether you know, those favorites lead to inconsistencies.

1064
01:01:05,119 --> 01:01:12,119
So one thing, let's talk about this one case where we got a master, we got a primary.

1065
01:01:12,119 --> 01:01:17,119
And let's say the primary and the master are get disconnected.

1066
01:01:17,119 --> 01:01:21,119
Actually, let me draw a picture slightly differently.

1067
01:01:21,119 --> 01:01:24,119
Master in the middle.

1068
01:01:24,119 --> 01:01:28,119
And we got a server, we got the server here.

1069
01:01:28,119 --> 01:01:33,119
S1, S2, and let's say S2 is the primary.

1070
01:01:33,119 --> 01:01:39,119
And so, you know, whatever it may talk to some other servers out there.

1071
01:01:39,119 --> 01:01:42,119
So, you know, the master is the primary.

1072
01:01:42,119 --> 01:01:45,119
So, let's say it's a network petition.

1073
01:01:45,119 --> 01:01:53,119
So, the master sends messages, you know, heartbeat messages doesn't get a response.

1074
01:01:53,119 --> 01:01:59,119
When can the master point a new primary?

1075
01:01:59,119 --> 01:02:04,119
When the lease is over for us to.

1076
01:02:04,119 --> 01:02:07,119
Yeah, right. We give us.

1077
01:02:07,119 --> 01:02:12,119
The primary has to wait. The master has to wait until the lease has expired.

1078
01:02:12,119 --> 01:02:18,119
Because if the lease was not expired, then maybe we have two primaries at the same time.

1079
01:02:18,119 --> 01:02:22,119
With P1 and P2 staying at the same time.

1080
01:02:22,119 --> 01:02:27,119
And would that be bad?

1081
01:02:27,119 --> 01:02:30,119
Yeah, then I think.

1082
01:02:30,119 --> 01:02:32,119
Wait, would clients.

1083
01:02:32,119 --> 01:02:37,119
Clients wouldn't know where to send to and the master wouldn't know which one is primary rate.

1084
01:02:37,119 --> 01:02:41,119
Well, but you know, sometimes might be still talking to this primary work.

1085
01:02:41,119 --> 01:02:43,119
Yeah, clients might be talking to this primary.

1086
01:02:43,119 --> 01:02:48,119
And their primary for the same chunk.

1087
01:02:48,119 --> 01:02:51,119
So, I think you get very bizarre orderings, right?

1088
01:02:51,119 --> 01:02:55,119
Where like some rides will get lost, you know, you know, like it would be a mess.

1089
01:02:55,119 --> 01:02:58,119
And you know, you know, you know, you know, you know, you know, you know,

1090
01:02:58,119 --> 01:03:03,119
we're not a principal to get a argument where like one, you know, we're all right to happen in order.

1091
01:03:03,119 --> 01:03:05,119
And one at a time.

1092
01:03:05,119 --> 01:03:06,119
So this is bad situation.

1093
01:03:06,119 --> 01:03:09,119
And so this is the situation is avoided like the split brain syndrome.

1094
01:03:09,119 --> 01:03:14,119
This is sometimes called the split brain syndrome where you end up with system where you have two masters.

1095
01:03:14,119 --> 01:03:19,119
And this is from here is avoided because of like the lease.

1096
01:03:19,119 --> 01:03:24,119
And the master will not appoint any other primary until the lease of the first primary absolutely has.

1097
01:03:24,119 --> 01:03:30,119
And it knows even if the primary job, but not reachable to it, but they be reachable to other clients.

1098
01:03:30,119 --> 01:03:40,119
That primary won't accept any right messages anymore because it leaves has expired.

1099
01:03:40,119 --> 01:03:43,119
Does that make sense?

1100
01:03:43,119 --> 01:03:47,119
Okay, let me say one more thing before wrapping up and apologize.

1101
01:03:47,119 --> 01:04:01,119
And this is partly because you know, why I had some technical problems, but I wanted to make one more point and it came up in the discussion to in the breakout room, which is, you know, how can you do better?

1102
01:04:01,119 --> 01:04:06,119
How do you get strong for system.

1103
01:04:06,119 --> 01:04:08,119
Maybe just strong work.

1104
01:04:08,119 --> 01:04:16,119
I got pretty strong systems, but not, you know, not with some little issues.

1105
01:04:16,119 --> 01:04:18,119
And so there's a point of different ways you could do it.

1106
01:04:18,119 --> 01:04:26,119
And in fact, you know, the what we're going to be seeing.

1107
01:04:26,119 --> 01:04:37,119
And I think one issue that I was showing up here all the time is like you could instead of like updating the primary and then reporting of making rights visible incrementally is probably not a good idea.

1108
01:04:37,119 --> 01:04:41,119
So you probably want to do is like update all.

1109
01:04:41,119 --> 01:04:45,119
Secondary primary's or none.

1110
01:04:45,119 --> 01:04:53,119
But not as in this, you know, particular design where like somebody get updated and somebody not be get updated and that's actually visible to the client.

1111
01:04:53,119 --> 01:04:59,119
And so a bunch of like, you know, techniques or the protocol changes that you could do that will make this better.

1112
01:04:59,119 --> 01:05:06,119
And the fact, you know, we'll see in labs two and three, you know, you will build systems that actually have these stronger properties.

1113
01:05:06,119 --> 01:05:11,119
And a deal with the scenarios that you know, the curable your legal consistency.

1114
01:05:11,119 --> 01:05:20,119
And in fact, if you look at Google itself, you know, and we'll read some of these tables later, you know, Google built additional storage systems.

1115
01:05:20,119 --> 01:05:26,119
Other store systems that have stronger consistency.

1116
01:05:26,119 --> 01:05:34,119
And basically tailored also to a different application domain. So example, like in like halfway the term, we just pay a paper called Spanner.

1117
01:05:34,119 --> 01:05:41,119
And actually has a much stronger story for consistency and even have support for transactions.

1118
01:05:41,119 --> 01:05:52,119
But that's like the application domain is quite different, you know, like you can sort of see here the g as is really tailored, you know, to sort of the reduce running map of juice jobs.

1119
01:05:52,119 --> 01:05:58,119
So I hope this is a, you know, useful introduction sort of consistency and start thinking about these kinds of problems.

1120
01:05:58,119 --> 01:06:04,119
Because they will be recurring set of problems that will show up in the rest of the term.

1121
01:06:04,119 --> 01:06:08,119
And I apologize for running over a little bit late.

1122
01:06:08,119 --> 01:06:09,119
Thank you.

1123
01:06:09,119 --> 01:06:14,119
So people want to ask additional questions, you know, feel free to ask it.

1124
01:06:14,119 --> 01:06:18,119
And if you have to run to another class, you know, please run to another class.

