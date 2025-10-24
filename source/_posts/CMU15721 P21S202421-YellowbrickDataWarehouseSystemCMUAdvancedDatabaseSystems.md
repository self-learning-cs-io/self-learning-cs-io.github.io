---
title: CMU15721 P21S202421 YellowbrickDataWarehouseSystemCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Kaniki Melon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio board.

3
00:00:09,000 --> 00:00:11,000
I don't want to know what kind of club.

4
00:00:11,000 --> 00:00:13,000
I don't want to know what kind of club.

5
00:00:13,000 --> 00:00:14,000
They're watching.

6
00:00:14,000 --> 00:00:17,000
I don't want to know what kind of club.

7
00:00:17,000 --> 00:00:20,000
All right, so today we're going to talk about Yellowbrick.

8
00:00:20,000 --> 00:00:24,000
And to me, this is a very, very fascinating system.

9
00:00:24,000 --> 00:00:27,000
You know, I probably recognize that they're not a really

10
00:00:27,000 --> 00:00:29,000
well-known company.

11
00:00:29,000 --> 00:00:32,000
You might have come give a talk two years ago.

12
00:00:32,000 --> 00:00:34,000
And then I told the CTO, like, you guys got to write a paper

13
00:00:34,000 --> 00:00:37,000
with all this great stuff, and being the cider paper you guys

14
00:00:37,000 --> 00:00:39,000
are reading.

15
00:00:39,000 --> 00:00:41,000
And it's just, it's wild, right?

16
00:00:41,000 --> 00:00:43,000
It does bunch of stuff that nobody else does.

17
00:00:43,000 --> 00:00:46,000
And I think it's a good way to think about, like, you know,

18
00:00:46,000 --> 00:00:49,000
like, for you guys to say, oh, like, yeah, you can just write

19
00:00:49,000 --> 00:00:52,000
your own PCIe driver, right?

20
00:00:52,000 --> 00:00:53,000
Like insane things like that.

21
00:00:53,000 --> 00:00:55,000
And so from a system perspective, I think it's super

22
00:00:55,000 --> 00:00:57,000
fascinating.

23
00:00:57,000 --> 00:00:59,000
But before we jump into that, again, for the administrative

24
00:00:59,000 --> 00:01:01,000
stuff, this is the last week, last week classes.

25
00:01:01,000 --> 00:01:03,000
Again, the final presentations for the project.

26
00:01:03,000 --> 00:01:06,000
So be next Thursday in this room at 9 a.m.

27
00:01:06,000 --> 00:01:09,000
And then if you go to this post on the outside that I put out

28
00:01:09,000 --> 00:01:13,000
last night, there's a poll there, select what you want for breakfast

29
00:01:13,000 --> 00:01:15,000
on Thursday.

30
00:01:15,000 --> 00:01:17,000
And there'll be information that'll link to the course

31
00:01:17,000 --> 00:01:19,000
website that says what's expected or what the deliverables

32
00:01:19,000 --> 00:01:24,000
are required for when you show up on that day.

33
00:01:24,000 --> 00:01:26,000
OK?

34
00:01:26,000 --> 00:01:28,000
And the presentations will be 10 minutes.

35
00:01:28,000 --> 00:01:30,000
It's supposed to be like a lighthearted thing.

36
00:01:30,000 --> 00:01:32,000
We meant to have fun.

37
00:01:32,000 --> 00:01:36,000
And then the final exam, I'll give it out in class this Wednesday.

38
00:01:36,000 --> 00:01:43,000
And then it'll be due the same day on the final presentation.

39
00:01:43,000 --> 00:01:46,000
I haven't decided whether I should do show with the PDF or email me

40
00:01:46,000 --> 00:01:48,000
PDF or print it out.

41
00:01:48,000 --> 00:01:49,000
I'll probably do PDFs.

42
00:01:49,000 --> 00:01:51,000
But I'll clarify on Wednesday.

43
00:01:51,000 --> 00:01:53,000
OK?

44
00:01:53,000 --> 00:01:56,000
Any questions about any of this?

45
00:01:56,000 --> 00:01:57,000
Yes?

46
00:01:57,000 --> 00:01:58,000
How long is the final exam?

47
00:01:58,000 --> 00:02:00,000
Questions, how long is the final exam?

48
00:02:00,000 --> 00:02:05,000
It's take home, right?

49
00:02:05,000 --> 00:02:08,000
So if you do it while you're watching TV, maybe it takes longer.

50
00:02:08,000 --> 00:02:10,000
I know.

51
00:02:10,000 --> 00:02:13,000
But again, it's not questions like, what does this paper say?

52
00:02:13,000 --> 00:02:14,000
What does that paper say?

53
00:02:14,000 --> 00:02:16,000
Because that's just wrote memorization.

54
00:02:16,000 --> 00:02:19,000
It's really internalizing the various things we've talked about

55
00:02:19,000 --> 00:02:22,000
and then seeing in different contexts and then applying

56
00:02:22,000 --> 00:02:23,000
to new situations.

57
00:02:23,000 --> 00:02:25,000
That's what I care about.

58
00:02:25,000 --> 00:02:28,000
Any other questions?

59
00:02:28,000 --> 00:02:29,000
All right.

60
00:02:29,000 --> 00:02:31,000
So, right.

61
00:02:31,000 --> 00:02:34,000
In the last class, last Wednesday, we talked about duct-DB,

62
00:02:34,000 --> 00:02:36,000
which is a fascinating system that's been widely used.

63
00:02:36,000 --> 00:02:40,000
But it's obviously not a sort of scale-out,

64
00:02:40,000 --> 00:02:44,000
overlap system as we talked about this entire semester.

65
00:02:44,000 --> 00:02:47,000
And then someone suggested, oh, can't they,

66
00:02:47,000 --> 00:02:50,000
or the mother-duck stuff, can't they take the fragments

67
00:02:50,000 --> 00:02:52,000
and scale it out across multiple nodes?

68
00:02:52,000 --> 00:02:54,000
Again, looking back on mother-duck, as far as they can tell,

69
00:02:54,000 --> 00:02:55,000
they're not doing that.

70
00:02:55,000 --> 00:02:58,000
They rather scale vertically than horizontally

71
00:02:58,000 --> 00:03:02,000
for duct-DB running on the cloud.

72
00:03:02,000 --> 00:03:03,000
All right.

73
00:03:03,000 --> 00:03:08,000
So today to sort of lead us into the discussion about yellow brick,

74
00:03:08,000 --> 00:03:13,000
we haven't really talked about specialized holograms for databases.

75
00:03:13,000 --> 00:03:16,000
There are databases that are run on GPUs,

76
00:03:16,000 --> 00:03:18,000
databases that are run on FPGAs.

77
00:03:18,000 --> 00:03:20,000
Yellow brick is actually one of them.

78
00:03:20,000 --> 00:03:22,000
And then we'll see in Redshift next week,

79
00:03:22,000 --> 00:03:24,000
they'll have their own, because this Amazon,

80
00:03:24,000 --> 00:03:26,000
they've fad their own hardware called Aqua,

81
00:03:26,000 --> 00:03:28,000
where they have custom silicon that they're using.

82
00:03:28,000 --> 00:03:31,000
At least, I think they've discontinued it, though,

83
00:03:31,000 --> 00:03:33,000
to accelerate queries.

84
00:03:33,000 --> 00:03:35,000
And we'll see how they're doing that.

85
00:03:35,000 --> 00:03:40,000
But there's a long history for databases going back to the 1970s,

86
00:03:40,000 --> 00:03:45,000
where vendors have tried to rely on hardware accelerators

87
00:03:45,000 --> 00:03:48,000
to make the database system go faster.

88
00:03:48,000 --> 00:03:52,000
In the 1970s and the 80s, these were called the 80s machines.

89
00:03:52,000 --> 00:03:57,000
Think of, again, custom chips to make queries run faster

90
00:03:57,000 --> 00:03:59,000
or network communication run faster.

91
00:03:59,000 --> 00:04:02,000
The challenge in the 1980s was that if you built custom hardware,

92
00:04:02,000 --> 00:04:04,000
by the time you designed it, fad it,

93
00:04:04,000 --> 00:04:09,000
and put it out for customers, the next version of the Motorola 680,000

94
00:04:09,000 --> 00:04:12,000
or Intel's next CPU came out,

95
00:04:12,000 --> 00:04:14,000
and all the benefits you got from custom hardware

96
00:04:14,000 --> 00:04:16,000
were defeated.

97
00:04:16,000 --> 00:04:18,000
And so people haven't really tried custom,

98
00:04:18,000 --> 00:04:20,000
another in the major cloud vendors,

99
00:04:20,000 --> 00:04:22,000
there's not a lot of people fadding custom hardware today.

100
00:04:22,000 --> 00:04:26,000
Typically, you see people leveraging FPGAs and GPUs,

101
00:04:26,000 --> 00:04:29,000
commodity hardware accelerators.

102
00:04:29,000 --> 00:04:34,000
But another way that people sort of put together databases

103
00:04:34,000 --> 00:04:37,000
and sold them on a prem are what are called appliances.

104
00:04:37,000 --> 00:04:40,000
And basically, the thing of like, you're buying rack units

105
00:04:40,000 --> 00:04:43,000
where, even though maybe using off-the-shelf hardware,

106
00:04:43,000 --> 00:04:45,000
like SSDs, or CPUs, and so forth,

107
00:04:45,000 --> 00:04:48,000
but it's set up and tuned and configured such a way

108
00:04:48,000 --> 00:04:52,000
that the data is designed to be optimized for it.

109
00:04:52,000 --> 00:04:55,000
So as a bunch of vendors that I'll sell you big rack units

110
00:04:55,000 --> 00:04:58,000
that look like this, Oracle's pie the strongest one in this game

111
00:04:58,000 --> 00:05:02,000
with something like X-Data or their data's appliance.

112
00:05:02,000 --> 00:05:04,000
And again, it's like, you buy the hardware from them

113
00:05:04,000 --> 00:05:07,000
and the data system has been optimized and tuned specifically

114
00:05:07,000 --> 00:05:09,000
for the machine-ger running one.

115
00:05:09,000 --> 00:05:11,000
Versus like, just downloading the binary, setting it up

116
00:05:11,000 --> 00:05:15,000
and you can configure it correctly on whatever

117
00:05:15,000 --> 00:05:17,000
your running one.

118
00:05:17,000 --> 00:05:19,000
So this is how Yellowbrick started.

119
00:05:19,000 --> 00:05:22,000
Yellowbrick was an appliance.

120
00:05:22,000 --> 00:05:25,000
So this is from the TTO, the author of the paper you guys read.

121
00:05:25,000 --> 00:05:28,000
He had to talk with us, CMU, a few years ago,

122
00:05:28,000 --> 00:05:30,000
and he's had a screenshot here of like,

123
00:05:30,000 --> 00:05:33,000
this is the Yellowbrick appliance, obviously,

124
00:05:33,000 --> 00:05:34,000
the things with the yellow.

125
00:05:34,000 --> 00:05:36,000
So a bunch of SSDs and a bunch of CPUs,

126
00:05:36,000 --> 00:05:39,000
and the system was designed to be statistically around it.

127
00:05:39,000 --> 00:05:42,000
And one of the things they did that was really fastening,

128
00:05:42,000 --> 00:05:44,000
again, it wasn't just off the shelf,

129
00:05:44,000 --> 00:05:47,000
or it was all off the shelf hardware,

130
00:05:47,000 --> 00:05:49,000
but it wasn't just like CPU disk and memory.

131
00:05:49,000 --> 00:05:52,000
They actually used FPGA accelerations,

132
00:05:52,000 --> 00:05:54,000
built inside of it to do things like,

133
00:05:54,000 --> 00:05:59,000
do hashing for bloom filters,

134
00:05:59,000 --> 00:06:02,000
do decompression of the data coming off the disk,

135
00:06:02,000 --> 00:06:07,000
to do transposing from the data from rows and columns.

136
00:06:08,000 --> 00:06:13,000
So in the paper you guys read, that was the cloud version.

137
00:06:13,000 --> 00:06:15,000
And the reason why I'm bringing this up,

138
00:06:15,000 --> 00:06:17,000
I think you can still buy this on-prem hardware,

139
00:06:17,000 --> 00:06:19,000
this appliance from Yellowbrick,

140
00:06:19,000 --> 00:06:21,000
the reason why I'm bringing this up,

141
00:06:21,000 --> 00:06:23,000
because the motivation of the paper,

142
00:06:23,000 --> 00:06:26,000
why they did all the insane engineering stuff that they did,

143
00:06:26,000 --> 00:06:30,000
was they were trying to transition their system

144
00:06:30,000 --> 00:06:34,000
from an on-prem custom hardware to a cloud setting

145
00:06:35,000 --> 00:06:37,000
and still get all the benefits of acceleration

146
00:06:37,000 --> 00:06:39,000
that they were getting when they were running

147
00:06:39,000 --> 00:06:41,000
their own silicon.

148
00:06:41,000 --> 00:06:44,000
So that's the background of what Yellowbrick is.

149
00:06:44,000 --> 00:06:48,000
So even though, again, the company and the product started in 2014,

150
00:06:48,000 --> 00:06:52,000
I think the cloud version came out in 2020 or 2021.

151
00:06:52,000 --> 00:06:55,000
So again, I find this system very, very fast-sating.

152
00:06:55,000 --> 00:06:59,000
To me, when I first started learning about it,

153
00:06:59,000 --> 00:07:02,000
Yellowbrick, when they came out of stealth,

154
00:07:02,000 --> 00:07:05,000
it reminded me also when I first saw a click house,

155
00:07:05,000 --> 00:07:07,000
when you read the things that they were like,

156
00:07:07,000 --> 00:07:09,000
oh, we do this, this, this, this, this, this, this.

157
00:07:09,000 --> 00:07:10,000
And it's like, this is insane.

158
00:07:10,000 --> 00:07:12,000
They're doing so many different things.

159
00:07:12,000 --> 00:07:14,000
And that was back when they were just doing FPGA stuff.

160
00:07:14,000 --> 00:07:17,000
And then when the cloud version came out

161
00:07:17,000 --> 00:07:19,000
and they were like, oh yeah, we're doing kernel bypass with this

162
00:07:19,000 --> 00:07:22,000
and custom device drivers for that,

163
00:07:22,000 --> 00:07:24,000
that's insane.

164
00:07:24,000 --> 00:07:26,000
You almost wonder sometimes whether it's actually true

165
00:07:26,000 --> 00:07:29,000
and then you meet the people, understand what's actually going on.

166
00:07:29,000 --> 00:07:33,000
And then you see that it is actually all real.

167
00:07:33,000 --> 00:07:38,000
And it's unclear whether the other major database vendors,

168
00:07:38,000 --> 00:07:42,000
particularly the Amazon, the Oracle, the Microsoft,

169
00:07:42,000 --> 00:07:46,000
whether they're doing the same kind of low-level system

170
00:07:46,000 --> 00:07:48,000
optimizations that Yellowbrick is doing.

171
00:07:48,000 --> 00:07:50,000
For some things, I know that Microsoft makes heavy use

172
00:07:50,000 --> 00:07:56,000
of running FPGA's or down on the Nix to do filtering and other things.

173
00:07:56,000 --> 00:07:59,000
But again, I don't know whether anybody else is doing

174
00:07:59,000 --> 00:08:01,000
the amount of work that they've done.

175
00:08:01,000 --> 00:08:03,000
And certainly it's risky.

176
00:08:03,000 --> 00:08:05,000
Like if you're looking at brand new database startup

177
00:08:05,000 --> 00:08:08,000
to say, hey, I'm going to write my own PCIU drivers.

178
00:08:08,000 --> 00:08:10,000
It's not something I would actually recommend,

179
00:08:10,000 --> 00:08:12,000
but they pulled it off.

180
00:08:12,000 --> 00:08:14,000
All right, so it's an O-Lap database system.

181
00:08:14,000 --> 00:08:18,000
That was originally designed for a sort of classic shared

182
00:08:18,000 --> 00:08:19,000
nothing architecture.

183
00:08:19,000 --> 00:08:21,000
And then when they transitioned to the cloud,

184
00:08:21,000 --> 00:08:25,000
they obviously had to switch to a shared disk architecture.

185
00:08:25,000 --> 00:08:28,000
And they're going to employ a client-side caching mechanism

186
00:08:28,000 --> 00:08:30,000
similar to what we saw in Snowflake.

187
00:08:30,000 --> 00:08:32,000
So everything's in C++.

188
00:08:32,000 --> 00:08:35,000
It's Sarah Luff as a fork of Postgres 9.5.

189
00:08:35,000 --> 00:08:37,000
So they're still going to use the Postgres front end

190
00:08:37,000 --> 00:08:40,000
for the ODBC, GDBC, Wire Protocol.

191
00:08:40,000 --> 00:08:42,000
They're still going to use the Postgres parser

192
00:08:42,000 --> 00:08:45,000
and the catalog, and basically handle all the incoming

193
00:08:45,000 --> 00:08:46,000
SQL queries.

194
00:08:46,000 --> 00:08:50,000
But then once you get past the parser,

195
00:08:50,000 --> 00:08:53,000
you still use remnants of the Postgres query optimizer,

196
00:08:53,000 --> 00:08:56,000
but they're going to inject their own optimization

197
00:08:56,000 --> 00:09:00,000
passes in there to handle the yellow brick specific things.

198
00:09:00,000 --> 00:09:02,000
And then they hand it off to the query app,

199
00:09:02,000 --> 00:09:06,000
the compiler, we'll get to that in a second.

200
00:09:06,000 --> 00:09:09,000
So the other thing about it in this paper is that,

201
00:09:09,000 --> 00:09:12,000
and we sort of speculated before we talked about Dremel

202
00:09:12,000 --> 00:09:15,000
or Snowflake, like, oh, I went over there using Kubernetes

203
00:09:15,000 --> 00:09:18,000
or how they're actually running the actual worker nodes themselves,

204
00:09:18,000 --> 00:09:22,000
they're heavily based on Kubernetes.

205
00:09:22,000 --> 00:09:25,000
Like, at all the components in running inside of the system,

206
00:09:25,000 --> 00:09:32,000
I'm going to set up as services running in Kubernetes.

207
00:09:32,000 --> 00:09:34,000
And again, the paper talks about how they were surprised

208
00:09:34,000 --> 00:09:36,000
to see that even though they were running containers,

209
00:09:36,000 --> 00:09:39,000
they still could have the load level control over the system hardware

210
00:09:39,000 --> 00:09:42,000
to do the kind of optimizations that they want to do,

211
00:09:42,000 --> 00:09:44,000
that they'll still all available to them,

212
00:09:44,000 --> 00:09:48,000
even though it was running in containers.

213
00:09:48,000 --> 00:09:50,000
So again, everything we'll talk about today

214
00:09:50,000 --> 00:09:51,000
will be the cloud version.

215
00:09:51,000 --> 00:09:53,000
So we're not going to talk about the FBGA,

216
00:09:53,000 --> 00:09:58,000
we're not going to talk about the custom stuff they were doing

217
00:09:58,000 --> 00:10:00,000
on the on-prem version.

218
00:10:00,000 --> 00:10:04,000
It just be all about the cloud.

219
00:10:04,000 --> 00:10:05,000
All right, so here's again,

220
00:10:05,000 --> 00:10:07,000
a high level overview of the key aspects of it,

221
00:10:07,000 --> 00:10:10,000
going similar to the text on what we've used for the other systems

222
00:10:10,000 --> 00:10:12,000
we talked about so far.

223
00:10:12,000 --> 00:10:14,000
So as I said, start off as shared nothing,

224
00:10:14,000 --> 00:10:16,000
but now as a shared disk system,

225
00:10:16,000 --> 00:10:18,000
which is, we're going to compute and storage,

226
00:10:18,000 --> 00:10:21,000
there will be a push-based vectorized query processing.

227
00:10:21,000 --> 00:10:23,000
They're going to make heavy use,

228
00:10:23,000 --> 00:10:27,000
or the entirely code generation of query compilation

229
00:10:27,000 --> 00:10:30,000
using the transpiration method we talked about with HIGHQ,

230
00:10:30,000 --> 00:10:32,000
so they're going to take the query plan and convert it into

231
00:10:32,000 --> 00:10:35,000
SQL++ code and then go ahead and compile that.

232
00:10:35,000 --> 00:10:37,000
They're going to compute side caching,

233
00:10:37,000 --> 00:10:40,000
similar to we saw on Snowflake.

234
00:10:40,000 --> 00:10:44,000
They're going to have a separate row and column storage opponent.

235
00:10:45,000 --> 00:10:48,000
This is a lot of them to do ingestion of new rights,

236
00:10:48,000 --> 00:10:49,000
in a row-oriented manner,

237
00:10:49,000 --> 00:10:51,000
and then the background process is going to convert them

238
00:10:51,000 --> 00:10:54,000
into a Pax columnar format.

239
00:10:54,000 --> 00:10:56,000
There will be short merge joins, hash joins,

240
00:10:56,000 --> 00:10:58,000
the also support nested loop joins.

241
00:10:58,000 --> 00:11:00,000
And as I said, they're going to rely heavily still

242
00:11:00,000 --> 00:11:01,000
on the post-corti-aprimerser,

243
00:11:01,000 --> 00:11:06,000
but in POS or install their own additional optimization passes

244
00:11:06,000 --> 00:11:13,000
for, you know, for, you know, for the yellow brick stuff.

245
00:11:13,000 --> 00:11:16,000
And, and then, you know, say this multiple times,

246
00:11:16,000 --> 00:11:19,000
like co-king level and seeing system engineering

247
00:11:19,000 --> 00:11:21,000
from the optimizations.

248
00:11:21,000 --> 00:11:23,000
So we're going to talk about all of these,

249
00:11:23,000 --> 00:11:26,000
but I think these two ones are probably the most interesting ones,

250
00:11:26,000 --> 00:11:28,000
these are the ones we can talk about the most,

251
00:11:28,000 --> 00:11:31,000
but what's most publicly available.

252
00:11:31,000 --> 00:11:33,000
All right, so the nomically,

253
00:11:33,000 --> 00:11:37,000
they're going to use it, say, that there'll be a data warehouse instance,

254
00:11:37,000 --> 00:11:41,000
and that'll be the front end service of the database system

255
00:11:41,000 --> 00:11:44,000
that's going to manage all the, you sort of have the complete purview

256
00:11:44,000 --> 00:11:46,000
of the worker nodes and the,

257
00:11:46,000 --> 00:11:50,000
and other additional services running for a single customer.

258
00:11:50,000 --> 00:11:53,000
So the, the, the front end piece is going to have, again,

259
00:11:53,000 --> 00:11:58,000
that, that, that, that portion of Postgres that's going to take incoming connections,

260
00:11:58,000 --> 00:12:00,000
do the parsing, the plan, the optimization.

261
00:12:00,000 --> 00:12:03,000
It also is where they're going to run the,

262
00:12:03,000 --> 00:12:05,000
the Rostro portion of the system,

263
00:12:05,000 --> 00:12:08,000
but then they're still going to use Postgres for the catalogs.

264
00:12:08,000 --> 00:12:12,000
They're just going to use PG catalog inside of the,

265
00:12:12,000 --> 00:12:14,000
Postgres keeps track of where, what data is available,

266
00:12:14,000 --> 00:12:17,000
where, you know, we're, how to map the shards to,

267
00:12:17,000 --> 00:12:19,000
the files to, to different nodes.

268
00:12:19,000 --> 00:12:22,000
They're going to make heavy use of caching for this and other nodes

269
00:12:22,000 --> 00:12:25,000
because they hit up PG catalog for every single time we want to do a request,

270
00:12:25,000 --> 00:12:27,000
would be too slow,

271
00:12:27,000 --> 00:12:29,000
and for transaction management as well,

272
00:12:29,000 --> 00:12:31,000
which we're not really talking about,

273
00:12:31,000 --> 00:12:32,000
but they try to mimic,

274
00:12:32,000 --> 00:12:37,000
or try to follow Postgres' style at MVCC to do, to do transactions.

275
00:12:38,000 --> 00:12:40,000
The worker nodes are going to be single containers,

276
00:12:40,000 --> 00:12:43,000
and this is, they're, they're, as he, as he describes it,

277
00:12:43,000 --> 00:12:45,000
they're pretty lightweight or dumb.

278
00:12:45,000 --> 00:12:48,000
There's, you know, they just, given the task of, here's Kapal query,

279
00:12:48,000 --> 00:12:49,000
and they go ahead and run it,

280
00:12:49,000 --> 00:12:51,000
and know how to move the data back and forth between,

281
00:12:51,000 --> 00:12:53,000
between the hardware and the different nodes.

282
00:12:53,000 --> 00:12:57,000
But they're also going to maintain their own local cache using,

283
00:12:57,000 --> 00:13:01,000
you know, MVME drives to write things out as,

284
00:13:01,000 --> 00:13:02,000
as needed if they have this built to it.

285
00:13:02,000 --> 00:13:04,000
And we'll talk about that in a second.

286
00:13:04,000 --> 00:13:06,000
And then there's separate additional services

287
00:13:06,000 --> 00:13:08,000
that are running background tasks or maintenance tasks.

288
00:13:08,000 --> 00:13:13,000
This is for compilation, they run analyze in these background tasks,

289
00:13:13,000 --> 00:13:16,000
bulk loading, they actually do a bypass of the row store,

290
00:13:16,000 --> 00:13:18,000
so you can just take, you know, large files and dump them directly,

291
00:13:18,000 --> 00:13:19,000
a column store.

292
00:13:21,000 --> 00:13:23,000
So the high level architecture looks like this,

293
00:13:23,000 --> 00:13:25,000
right, again, so this is the front end,

294
00:13:25,000 --> 00:13:26,000
and then you have the worker nodes,

295
00:13:26,000 --> 00:13:29,000
and then the object store is just s3, or whatever Azure has.

296
00:13:29,000 --> 00:13:32,000
Query shows up, it's going to go through this Postgres front layer,

297
00:13:32,000 --> 00:13:35,000
again, through all the parsing and planning there,

298
00:13:35,000 --> 00:13:37,000
and then it's going to hand things off to the scheduler,

299
00:13:37,000 --> 00:13:40,000
and the compiler service, we'll talk about each of these in a second,

300
00:13:40,000 --> 00:13:43,000
but they have a centralized scheduler that then is going to hand out

301
00:13:43,000 --> 00:13:45,000
the tasks to the different worker nodes,

302
00:13:45,000 --> 00:13:47,000
and then every 100 milliseconds they're going to coordinate

303
00:13:47,000 --> 00:13:50,000
and synchronize and say what task should we work on next.

304
00:13:50,000 --> 00:13:52,000
And these guys are all going to run as co-routines.

305
00:13:52,000 --> 00:13:54,000
Compiler service, we'll see in a second,

306
00:13:54,000 --> 00:13:56,000
and it's just converting the query plan into

307
00:13:56,000 --> 00:13:58,000
C++ and go ahead and compile it,

308
00:13:58,000 --> 00:14:03,000
but they'll do some tricks to make this run faster in parallel with the LLVM.

309
00:14:04,000 --> 00:14:06,000
Schedule hands out the tasks to the worker nodes,

310
00:14:06,000 --> 00:14:09,000
assuming that the worker nodes' caches are empty,

311
00:14:09,000 --> 00:14:12,000
if they need any data that go out to the object store and get it stored

312
00:14:12,000 --> 00:14:17,000
in its local cache, they'll do an approximate version of LLVK,

313
00:14:17,000 --> 00:14:21,000
which we'll cover in a second, to decide when to evict things from memory,

314
00:14:21,000 --> 00:14:25,000
or things from the cache, and then they can also move data

315
00:14:25,000 --> 00:14:28,000
back and forth between different worker nodes.

316
00:14:28,000 --> 00:14:31,000
And then as I said, if you're doing a bulk loading of like,

317
00:14:31,000 --> 00:14:34,000
I have terabytes of files, I don't want to go through the row store,

318
00:14:34,000 --> 00:14:37,000
and then have it get compacted to the object store,

319
00:14:37,000 --> 00:14:40,000
you can have this bulk load of service just right directly out to

320
00:14:40,000 --> 00:14:43,000
the object store all in a transactional manner.

321
00:14:44,000 --> 00:14:45,000
Yes?

322
00:14:45,000 --> 00:14:48,000
So the paper says that the old brick is shared nothing.

323
00:14:48,000 --> 00:14:50,000
Yeah, that parts a little bit confusing.

324
00:14:50,000 --> 00:14:53,000
So again, historically it was a shared nothing system.

325
00:14:53,000 --> 00:14:58,000
And I think they're incorrect because like,

326
00:14:58,000 --> 00:15:01,000
these things are caches, right?

327
00:15:01,000 --> 00:15:04,000
The primary location of the database at rest is over here.

328
00:15:04,000 --> 00:15:07,000
Now, ignoring the row store, but it doesn't really make a difference.

329
00:15:07,000 --> 00:15:10,000
And then they talk about how, okay, if any time I need to get data,

330
00:15:10,000 --> 00:15:12,000
I go fetch it from the object store, right?

331
00:15:12,000 --> 00:15:17,000
So it's like a, it's a right back caches that are right through cache,

332
00:15:17,000 --> 00:15:20,000
meaning I get data and I want to get it to the object store,

333
00:15:20,000 --> 00:15:24,000
and then I pull in and then I fill my caches as needed when I run queries.

334
00:15:25,000 --> 00:15:28,000
If it was shared nothing, then I would not never have to do that,

335
00:15:28,000 --> 00:15:30,000
because I would always populate this stuff here.

336
00:15:30,000 --> 00:15:33,000
Is it like, would the decision be that like,

337
00:15:33,000 --> 00:15:35,000
whatever we take the data from the object store,

338
00:15:35,000 --> 00:15:37,000
will all the queries running and never go back?

339
00:15:37,000 --> 00:15:39,000
So that could be seen as something like fill,

340
00:15:39,000 --> 00:15:43,000
they'll use the industry as like intermediate.

341
00:15:43,000 --> 00:15:47,000
So his comment is like,

342
00:15:47,000 --> 00:15:49,000
is it the case where they will never have,

343
00:15:49,000 --> 00:15:51,000
like, is it the case that they have to spill the disk,

344
00:15:51,000 --> 00:15:54,000
if they run out of disk space on the worker nodes,

345
00:15:54,000 --> 00:15:56,000
then they don't write to the object store.

346
00:15:56,000 --> 00:15:59,000
As far as I can know from the paper, they don't write to the object store.

347
00:15:59,000 --> 00:16:01,000
And then it'll do back pressure to say,

348
00:16:01,000 --> 00:16:03,000
okay, we can't process this as fast as possible,

349
00:16:03,000 --> 00:16:06,000
so everyone sort of slows down that way.

350
00:16:06,000 --> 00:16:11,000
Again, like, historically it was a shared nothing system when it was on prem,

351
00:16:11,000 --> 00:16:13,000
but what they described in the paper,

352
00:16:13,000 --> 00:16:16,000
smells like snowflake and snowflake is a shared disk system.

353
00:16:16,000 --> 00:16:18,000
So I think that's incorrect.

354
00:16:21,000 --> 00:16:25,000
All right, so again, the insane parts of here for these guys is that

355
00:16:25,000 --> 00:16:28,000
all of this, like, these lines are drawing here.

356
00:16:28,000 --> 00:16:32,000
This is all being custom stuff, either custom drivers or custom API limitations,

357
00:16:32,000 --> 00:16:37,000
custom protocols to talk to either internally between the client,

358
00:16:37,000 --> 00:16:39,000
internally between the network nodes,

359
00:16:39,000 --> 00:16:42,000
and also within the object store itself.

360
00:16:42,000 --> 00:16:46,000
But the outbound stuff going back to the client,

361
00:16:46,000 --> 00:16:49,000
that's just going to be the regular GDBC wire protocol,

362
00:16:49,000 --> 00:16:52,000
the ODPC wire protocol that Postgres has.

363
00:16:54,000 --> 00:16:56,000
So I've said some of this already.

364
00:16:56,000 --> 00:17:00,000
They're going to be heavily based on Kubernetes.

365
00:17:00,000 --> 00:17:02,000
So all the different pieces that I'm showing here,

366
00:17:02,000 --> 00:17:04,000
they're going to run separate microservices.

367
00:17:04,000 --> 00:17:06,000
When I think of microservices,

368
00:17:06,000 --> 00:17:09,000
I think that like something like a Lambda function comes in and comes out,

369
00:17:09,000 --> 00:17:11,000
like, you know, does some processing goes away.

370
00:17:11,000 --> 00:17:13,000
These things are always running, so,

371
00:17:13,000 --> 00:17:15,000
but they're using the term microservices.

372
00:17:15,000 --> 00:17:19,000
Basically, they've broken up and things are running separately.

373
00:17:19,000 --> 00:17:23,000
And so they're going to leverage Kubernetes to do all the state management,

374
00:17:23,000 --> 00:17:25,000
of like, what machines are up, when one goes down,

375
00:17:25,000 --> 00:17:28,000
how to do failover, how to provision new machines.

376
00:17:28,000 --> 00:17:30,000
All of that's going to be done through Kubernetes.

377
00:17:30,000 --> 00:17:34,000
So that sort of control plane of the backbone of the system itself.

378
00:17:34,000 --> 00:17:36,000
They don't write from scratch the way, like,

379
00:17:36,000 --> 00:17:38,000
snowflake and others had to do.

380
00:17:38,000 --> 00:17:42,000
There's an leverage Kubernetes for all of this.

381
00:17:43,000 --> 00:17:47,000
And as far as I know, I mean, I'm not saying that they're the only system running Kubernetes,

382
00:17:47,000 --> 00:17:51,000
but there's only these paper that publicly talks about how they're using Kubernetes

383
00:17:51,000 --> 00:17:54,000
to organize a scale-out system like this.

384
00:17:54,000 --> 00:17:57,000
But if you ever use Kubernetes,

385
00:17:57,000 --> 00:18:00,000
it's depending on how to set up.

386
00:18:00,000 --> 00:18:03,000
And so you'd have to write the Helm chart to figure out how to,

387
00:18:03,000 --> 00:18:05,000
you know, solve the puzzle and whatnot.

388
00:18:05,000 --> 00:18:09,000
So they're going to hide all of the Kubernetes operations behind SQL,

389
00:18:09,000 --> 00:18:11,000
which is fantastic.

390
00:18:11,000 --> 00:18:14,000
So you can call it create cluster or create instance or whatever,

391
00:18:14,000 --> 00:18:17,000
and not all done through SQL, and then it's translating that into the Kubernetes commands

392
00:18:17,000 --> 00:18:20,000
to apply the changes.

393
00:18:20,000 --> 00:18:21,000
It's nice.

394
00:18:21,000 --> 00:18:29,000
Obviously not groundbreakingly, but it's a quality of life feature that I like.

395
00:18:29,000 --> 00:18:34,000
The other thing they're going to do that sort of goes against the way you're expected

396
00:18:34,000 --> 00:18:38,000
to run or operate Kubernetes is that when the worker pods come up,

397
00:18:38,000 --> 00:18:41,000
they want to make sure they have a one-to-one mapping between a worker pod and a worker node

398
00:18:41,000 --> 00:18:44,000
because when a worker pod lands on the node,

399
00:18:44,000 --> 00:18:47,000
they want to take over everything.

400
00:18:47,000 --> 00:18:52,000
And again, this is why I'm saying it's not truly like a microservice where,

401
00:18:52,000 --> 00:18:54,000
because this worker pod,

402
00:18:54,000 --> 00:18:56,000
it's going to allocate all the memory that it wants,

403
00:18:56,000 --> 00:19:01,000
you just want to run forever because you don't want to have the spin-up cost

404
00:19:01,000 --> 00:19:05,000
of starting a stopping worker pod over and over again.

405
00:19:05,000 --> 00:19:08,000
And again, the paper talks about how they thought to be trouble,

406
00:19:08,000 --> 00:19:10,000
they have troubles with the worker node,

407
00:19:10,000 --> 00:19:14,000
starting to work on pod, taking control of all the hardware,

408
00:19:14,000 --> 00:19:17,000
at least through the container, and that seemed to work,

409
00:19:17,000 --> 00:19:19,000
but if you had two containers running at the same node,

410
00:19:19,000 --> 00:19:21,000
then they would conflict and try to get to the hardware,

411
00:19:21,000 --> 00:19:23,000
and that would break things.

412
00:19:23,000 --> 00:19:29,000
So that's why they have a one-to-one mapping for the worker pod and the worker node.

413
00:19:29,000 --> 00:19:32,000
All right, so the execution engine is the push-based model we've talked about before.

414
00:19:32,000 --> 00:19:34,000
They're doing vectorized query processing,

415
00:19:34,000 --> 00:19:36,000
when they're operating on a clonear data,

416
00:19:36,000 --> 00:19:38,000
but as I said, in some cases,

417
00:19:38,000 --> 00:19:41,000
they're actually going to convert things into row store,

418
00:19:41,000 --> 00:19:46,000
row-oriented data, essentially doing early materialization in some cases.

419
00:19:46,000 --> 00:19:50,000
So like, all the scans we vectorized based on clonear data,

420
00:19:50,000 --> 00:19:52,000
but then if you feed that up into a join,

421
00:19:52,000 --> 00:19:55,000
they're going to convert it to a row store,

422
00:19:55,000 --> 00:19:58,000
right, they call it a transpose operator,

423
00:19:58,000 --> 00:20:01,000
they're going to convert, they have a injector transpose operator in the query plan

424
00:20:01,000 --> 00:20:05,000
to convert it, but fully pass it up into the hash join.

425
00:20:05,000 --> 00:20:08,000
And likewise, when they send data from one node to the next,

426
00:20:08,000 --> 00:20:12,000
they're going to convert it into a row-oriented manner

427
00:20:12,000 --> 00:20:17,000
because they want to send smaller chunks to make sure that the data you're sending over

428
00:20:17,000 --> 00:20:20,000
all sits in L3 cache on the other side,

429
00:20:20,000 --> 00:20:22,000
and you can process things very efficiently.

430
00:20:22,000 --> 00:20:25,000
And then when the overarching themes we'll see over and over again,

431
00:20:25,000 --> 00:20:28,000
is that the goal of the system that they designed it,

432
00:20:29,000 --> 00:20:32,000
is that you want to, everything sitting in L3 is much as possible.

433
00:20:32,000 --> 00:20:36,000
Right? It's not like when we talk about other systems like,

434
00:20:36,000 --> 00:20:38,000
oh yeah, you know, keep things in memory, don't go to disk,

435
00:20:38,000 --> 00:20:41,000
these guys are insane, they want to keep everything in L3.

436
00:20:41,000 --> 00:20:45,000
And so that's why they're doing all the custom optimizations that they're doing,

437
00:20:45,000 --> 00:20:48,000
and their architect of the system says that,

438
00:20:48,000 --> 00:20:50,000
you know, by converting to a row store,

439
00:20:50,000 --> 00:20:54,000
you know that all the data you can need to process a single tuple before you can move on to the next tuple,

440
00:20:54,000 --> 00:20:56,000
is going to sit in L3.

441
00:21:00,000 --> 00:21:02,000
As I said before, they're going to do holistic query compilation,

442
00:21:02,000 --> 00:21:05,000
doing source search translation of generating into the C++.

443
00:21:06,000 --> 00:21:08,000
And this is going to be done through a separate service.

444
00:21:08,000 --> 00:21:11,000
Now, it's debating whether we should be read shift first versus this paper,

445
00:21:11,000 --> 00:21:14,000
because read shift is basically going to do the same thing.

446
00:21:14,000 --> 00:21:16,000
Right? They're going to do code gen into C++,

447
00:21:16,000 --> 00:21:19,000
and they're going to have a separate service that's compiler service

448
00:21:19,000 --> 00:21:23,000
that you send queries to, and then you get back the binary.

449
00:21:24,000 --> 00:21:29,000
But I wanted to cover the yellow bit optimizations first before we took out a read shift.

450
00:21:30,000 --> 00:21:34,000
So this idea is not novel, again, what they're doing is standalone service.

451
00:21:34,000 --> 00:21:36,000
This is what read shift is going to do.

452
00:21:37,000 --> 00:21:40,000
But one of the things that's interesting about this is that they talk about,

453
00:21:40,000 --> 00:21:45,000
if you have a query plan and use generate, you know, a plan fragment as like a giant,

454
00:21:45,000 --> 00:21:52,000
just one giant file, then the core compiler component inside L of the M is single thread.

455
00:21:53,000 --> 00:21:57,000
Like you can compile multiple files at the same time in parallel,

456
00:21:57,000 --> 00:22:02,000
but within a single thread it can only compile a single, you know, single piece of code.

457
00:22:02,000 --> 00:22:09,000
So they're going to artificially break up a query plan into different fragments,

458
00:22:09,000 --> 00:22:13,000
let them be compiled separately into multiple threads,

459
00:22:13,000 --> 00:22:18,000
and then they're going to stitch things back together doing just dynamic linking.

460
00:22:19,000 --> 00:22:23,000
It's similar to the plan stitching stuff we talked about when we talked about a depth of query optimization,

461
00:22:23,000 --> 00:22:28,000
they're sort of breaking things up into the smaller chunks that may not be a single pipeline,

462
00:22:28,000 --> 00:22:31,000
but again, you can compile those in parallel and then put things back together.

463
00:22:33,000 --> 00:22:38,000
The compiler service is also going to maintain a cache so that they recognize that I've seen this fragment before.

464
00:22:38,000 --> 00:22:44,000
I have a cache version of it, and it's the right version of the run time of the database system

465
00:22:45,000 --> 00:22:48,000
and the right hardware and the other dependencies you may have,

466
00:22:48,000 --> 00:22:52,000
then it can reuse that, give you that shared object, instead of compiling from scratch.

467
00:22:52,000 --> 00:22:55,000
Again, we'll see this again in redshift. Redshift's insane.

468
00:22:55,000 --> 00:22:58,000
They have a, it's not the same, it's amazing.

469
00:22:58,000 --> 00:23:02,000
They have a cache for your database, so they see the same plan,

470
00:23:02,000 --> 00:23:05,000
plan, plan, plan, open over again for within your database, they'll reuse that,

471
00:23:05,000 --> 00:23:10,000
but they can also have a shared cache across the entire fleet.

472
00:23:11,000 --> 00:23:16,000
If some other customer has a table that has integer column and a string column that are,

473
00:23:16,000 --> 00:23:21,000
and then you're doing a less than on it, their query, they might have a compile version

474
00:23:21,000 --> 00:23:25,000
of a plan fragment that processes that data and you have the same basic layout.

475
00:23:25,000 --> 00:23:28,000
The name of the top columns may be different, or the distribution might be different,

476
00:23:28,000 --> 00:23:33,000
but who cares? They actually data itself, the underlying physical representation of the data is the same,

477
00:23:33,000 --> 00:23:35,000
so I can reuse that plan cache.

478
00:23:35,000 --> 00:23:38,000
So we'll talk about what Amazon does in X-Class,

479
00:23:38,000 --> 00:23:44,000
but in this version, because they don't talk about whether they can cache things across different customers,

480
00:23:44,000 --> 00:23:48,000
I think everything is still isolated to a single customer,

481
00:23:48,000 --> 00:23:51,000
but Amazon will be more aggressive when reusing things.

482
00:23:56,000 --> 00:24:01,000
So the optimizer itself, again, they're just going to rely on the Postgres stratified optimizer,

483
00:24:01,000 --> 00:24:05,000
a bunch of rules to do predicate pushdown and other optimizations and rewriting,

484
00:24:05,000 --> 00:24:08,000
then you switch into the dynamic programming section where they're doing the join ordering,

485
00:24:08,000 --> 00:24:12,000
and then at least in Postgres they have to pop out of that, they do some final cleanup.

486
00:24:12,000 --> 00:24:19,000
But they're going to inject, they're going to have their own cost model extensions to Postgres

487
00:24:19,000 --> 00:24:23,000
and some additional passes they'll do to do additional optimizations based on,

488
00:24:23,000 --> 00:24:25,000
again, the yellow brick architecture.

489
00:24:25,000 --> 00:24:30,000
And one of the things they're going to introduce is more aggressive file filtering,

490
00:24:30,000 --> 00:24:34,000
or data file filtering from the object store, by doing lookups and zone maps and other things like that.

491
00:24:35,000 --> 00:24:41,000
Identifying these are the files I know I never need to read because my predicate can't, can never be satisfied.

492
00:24:43,000 --> 00:24:47,000
The other thing though that's going to be different than all the other systems we've talked about before is that

493
00:24:47,000 --> 00:24:51,000
they're going to have their own managed storage.

494
00:24:51,000 --> 00:24:57,000
So unlike in Dremel and Databricks and Snowflake, at Icebroke,

495
00:24:57,000 --> 00:25:03,000
they're not going to let you just have a bunch of arbitrary files in S3

496
00:25:03,000 --> 00:25:06,000
and then write whatever SQL queries you want to top of them.

497
00:25:06,000 --> 00:25:10,000
You have to bulk load them and import them into the yellow brick system

498
00:25:10,000 --> 00:25:12,000
and be managed by yellow brick.

499
00:25:12,000 --> 00:25:18,000
And then at that point yellow brick can then run analyze on it and collect statistics as if it was a regular database system.

500
00:25:18,000 --> 00:25:20,000
Not a lake house.

501
00:25:20,000 --> 00:25:24,000
So again, so the current version can't take arbitrary files in your data lake.

502
00:25:24,000 --> 00:25:29,000
Everything's got to be loaded into the system, then at which point you can collect statistics.

503
00:25:29,000 --> 00:25:33,000
Now when you're block loading too, you can collect some basic things like some zone maps and whatnot.

504
00:25:33,000 --> 00:25:41,000
But they'll do a heavyweight analyze pass, like a single node system to go get histograms, heavy hitter listings.

505
00:25:41,000 --> 00:25:45,000
They make heavy use of hyper log log, number of null values or sync values.

506
00:25:45,000 --> 00:25:50,000
All these things they're going to maintain, store that in the Postgres catalog on the front end service.

507
00:25:50,000 --> 00:25:56,000
And then their extensions to the query optimizer will be able to use them in their cost model estimates.

508
00:25:57,000 --> 00:26:00,000
Again, that's different than everything we've seen so far.

509
00:26:00,000 --> 00:26:07,000
And as far as they can tell, they don't have any adaptive optimizations that we've seen in Dremel and Snowflake and Databricks.

510
00:26:07,000 --> 00:26:13,000
They're going to assume everything is going to be whatever the plan that you get out from the query optimizer, that's it.

511
00:26:13,000 --> 00:26:16,000
I'm not going to adapt them to fly.

512
00:26:16,000 --> 00:26:19,000
They're going to do the classic optimization we've seen many times before.

513
00:26:20,000 --> 00:26:25,000
Through the sideways information passing for the Bloomfotters on the build side of the hash join.

514
00:26:25,000 --> 00:26:30,000
So as in building hash table, build a Bloomfotter and then send that over on the probe side to do early filtering that way.

515
00:26:33,000 --> 00:26:43,000
So that part again, other than the, from a non-Lakeout system, this is sort of a textbook implementation of how to collect statistics in your query optimizer.

516
00:26:44,000 --> 00:26:53,000
I think I asked them to when you get, they gave a talk of like, sort of related what you, what you were bringing up.

517
00:26:53,000 --> 00:27:08,000
I was like, well, how good, you know, how good is your query optimizer and how often do you make changes because there's things that's missing because, you know, the Postgres optimizer doesn't know about yellow brick stuff versus like the Postgres optimizer just does something stupid.

518
00:27:09,000 --> 00:27:17,000
And you got to add rules in or add changes to the, to the optimizer's logic to account for, you know, to avoid bad plans.

519
00:27:17,000 --> 00:27:22,000
And they mentioned that what they're doing is basically adding hard coded rules per customer.

520
00:27:22,000 --> 00:27:25,000
That's their ideal situation.

521
00:27:25,000 --> 00:27:31,000
And that they, as far as I know, they haven't pushed any changes back into the Postgres mainline branch.

522
00:27:32,000 --> 00:27:39,000
Again, when you're a small startup, actually, I don't know how big they are. Medium size startup.

523
00:27:39,000 --> 00:27:45,000
Yeah, I pick and choose your battles and they chose to optimize in low level OS stuff versus the query optimizer.

524
00:27:45,000 --> 00:27:49,000
Although, again, they claim that this is what they're focusing on now the most.

525
00:27:49,000 --> 00:27:54,000
Now that they've gotten sort of the OS level stuff taken care of.

526
00:27:55,000 --> 00:28:07,000
All right. So the, as I said before, the yellow brick, even though it's a shared disk system, it is going to have its own managed storage.

527
00:28:07,000 --> 00:28:10,000
So you tell it, here's my S3 bucket so I can store stuff.

528
00:28:10,000 --> 00:28:16,000
And then yellow bricks is going to be in charge of, you know, writing, writing, reading, writing data into those files.

529
00:28:16,000 --> 00:28:20,000
And they're going to be using their own proprietary format.

530
00:28:21,000 --> 00:28:26,000
I know they're doing dictionary encoding. I don't know what other additional optimizations that they're doing.

531
00:28:26,000 --> 00:28:33,000
And when you load a file or sorry, load a table and start adding data to it, you can specify the charting key or the partitioning key.

532
00:28:33,000 --> 00:28:39,000
In anticipation of doing joins, you're also going to do local sorting attributes.

533
00:28:39,000 --> 00:28:43,000
So within the file itself, you can have them sort of on a single column.

534
00:28:43,000 --> 00:28:48,000
So they won't be globally sort across all the files, but within the file it'll be sorted.

535
00:28:48,000 --> 00:28:53,000
So the files themselves, they'll be roughly 100 megabytes with two megabyte chunks.

536
00:28:53,000 --> 00:29:00,000
And there's two megabyte numbers going to be special for us later on. So we'll just keep that in the back of your mind.

537
00:29:00,000 --> 00:29:07,000
So you sort of think of like the row groups are two megabytes for these guys.

538
00:29:07,000 --> 00:29:11,000
They do, again, they say they do support bulk loading, parquet files.

539
00:29:11,000 --> 00:29:14,000
And I don't think they support ORC or other formats.

540
00:29:14,000 --> 00:29:20,000
But you can't take the, how does this?

541
00:29:20,000 --> 00:29:23,000
They can't support all possible variations of the things you can do in parquet.

542
00:29:23,000 --> 00:29:26,000
Like I know they claim they can't do nested data.

543
00:29:26,000 --> 00:29:30,000
They say they can't break up your JSON information and store that as columns that we saw in Dremel.

544
00:29:30,000 --> 00:29:35,000
And there's certain data types that they don't support.

545
00:29:35,000 --> 00:29:39,000
And again, there's going to be this row store, which the original version was just Postgres.

546
00:29:39,000 --> 00:29:43,000
So when you inserted new data, landed in this Postgres version, they were running the front end.

547
00:29:43,000 --> 00:29:46,000
That turned it too slow, they got rid of that.

548
00:29:46,000 --> 00:29:48,000
And now they have their own custom row store.

549
00:29:48,000 --> 00:29:52,000
And then every cell wall from the background task is going to go through, pull things out of the row store,

550
00:29:52,000 --> 00:29:58,000
put it into a columnar format, and then write that out to S3.

551
00:29:58,000 --> 00:30:03,000
They also like you to do transactional updates on the column store data as well,

552
00:30:03,000 --> 00:30:06,000
which is something we haven't really seen in the other systems.

553
00:30:06,000 --> 00:30:13,000
This is what iceberg and hoodie can handle for you in the front, as well as Delta Lake, or yeah, that's the big data version.

554
00:30:13,000 --> 00:30:20,000
You can do, you know, update, insert update deletes on those data if you use those front ends,

555
00:30:20,000 --> 00:30:24,000
but in yellow brick you can go directly and just call insert update lead.

556
00:30:24,000 --> 00:30:33,000
And then they maintain a, basically a log record of like here's all the changes that were made to change your data file,

557
00:30:34,000 --> 00:30:37,000
so that when you read in, you know, a data potentially need to skip.

558
00:30:37,000 --> 00:30:44,000
And then periodically they'll go through and do compaction of combined multiple model files together and try to produce,

559
00:30:44,000 --> 00:30:51,000
print out the old data and reduce it down to smaller file sources.

560
00:30:51,000 --> 00:31:00,000
So the technique they're going to use to assign files to workers is when we different than what we saw in snowflake.

561
00:31:01,000 --> 00:31:11,000
We're going to call that snowflake was using consistent hashing basically the ring approach to figure out what file belongs to what worker node for the local cache.

562
00:31:11,000 --> 00:31:26,000
And then when the number of worker node changed, the node goes down, you add a new node, you could reorganize the mapping of files to worker nodes without having to shuffle everything as you numerally with sort of naive hashing.

563
00:31:27,000 --> 00:31:31,000
So yellow brick is going to use another technique that's very similar called run of you hashing.

564
00:31:31,000 --> 00:31:38,000
Who here is, I don't think we teach run, do they teach run of you hashing and distributed it is or not distributed systems.

565
00:31:41,000 --> 00:31:45,000
It's a variation of consistent hashing that actually came up before.

566
00:31:45,000 --> 00:31:47,000
It's a lot simpler.

567
00:31:47,000 --> 00:31:52,000
It's just consistent hashing is more well known, more popular than run of you hashing.

568
00:31:52,000 --> 00:31:59,000
So the system is like druid or patchy ignite, which is a key value store in memory store that do use this.

569
00:31:59,000 --> 00:32:04,000
The idea is really simple. The basic idea is like you have whatever you want to hash.

570
00:32:04,000 --> 00:32:07,000
So it would say for us it's either files like the file name.

571
00:32:07,000 --> 00:32:10,000
And then you have the worker node you want to assign them to.

572
00:32:10,000 --> 00:32:21,000
So all you need to do is just hash each file by some key multiple times and then come up with a rank list of the assignment of a file to a worker.

573
00:32:22,000 --> 00:32:26,000
And then you just pick whatever one has the comes first based on some leading.

574
00:32:26,000 --> 00:32:31,000
So say I have three files and say I have three workers.

575
00:32:31,000 --> 00:32:38,000
So I'll take the first file here and as I say I pick the file name and then I pen the worker identifier to it.

576
00:32:38,000 --> 00:32:42,000
And I hashed that and I can come up with some number.

577
00:32:42,000 --> 00:32:52,000
Again, it's somehow the number it corresponds to how important it is for this file to be on this worker worker to be random.

578
00:32:52,000 --> 00:32:58,000
So now I have a rank list of the workers and then I'm picking whatever the first one is.

579
00:32:58,000 --> 00:33:00,000
And then I do the same thing for the other ones.

580
00:33:00,000 --> 00:33:07,000
They rank ordering and then the first one is the one I'm going to assign them to.

581
00:33:07,000 --> 00:33:20,000
So for this I don't need to maintain any sort of immediate global state or routing information between the different nodes because along with everyone has the same hash function and the same hash and protocol.

582
00:33:20,000 --> 00:33:22,000
Everyone can everyone can compute this.

583
00:33:22,000 --> 00:33:26,000
Why is this different that there's a fashion?

584
00:33:26,000 --> 00:33:31,000
Fashion the file name and then the module number of workers.

585
00:33:31,000 --> 00:33:33,000
What if I add a new worker?

586
00:33:33,000 --> 00:33:38,000
It's the same reason why it's solving the same problem as this and hashing.

587
00:33:38,000 --> 00:33:42,000
New file comes along, do the same thing, hash it, come on the list.

588
00:33:42,000 --> 00:33:47,000
But now to his point what if I come along with the new worker node?

589
00:33:47,000 --> 00:33:51,000
Because I want to scale out or worker node goes down, I got to take one away.

590
00:33:51,000 --> 00:33:59,000
So say I had a new worker worker for and so if I hashed it for the first one, it just ends up being on the end of the rank list.

591
00:33:59,000 --> 00:34:05,000
So nothing changes because it was assigned to worker one that's still at highest priority so it stays there.

592
00:34:05,000 --> 00:34:09,000
Say for this one worker four ends up between three and one.

593
00:34:09,000 --> 00:34:11,000
Again, nothing changes to stays there.

594
00:34:11,000 --> 00:34:13,000
For this one a worker four is here.

595
00:34:13,000 --> 00:34:18,000
These guys slide over nothing changes but for this one here it becomes the this has the highest priority.

596
00:34:18,000 --> 00:34:25,000
So now when I add this new node, I need to transfer file for his ownership to from where it was two to four.

597
00:34:25,000 --> 00:34:28,000
And I didn't have to reshuffle everything.

598
00:34:28,000 --> 00:34:31,000
Same idea as assistant hashing, yes.

599
00:34:31,000 --> 00:34:34,000
So I can call off in this check.

600
00:34:34,000 --> 00:34:37,000
So question how often is this check for each individual node?

601
00:34:37,000 --> 00:34:40,000
Well if the topology of the cluster never changes, you don't need to rerun it.

602
00:34:40,000 --> 00:34:43,000
Right? Because the hash function is not going to change.

603
00:34:43,000 --> 00:34:48,000
So it's only when like it's only my membership changes in the cluster.

604
00:34:48,000 --> 00:34:54,000
So what's the drawback of using this or is this assistant hashing?

605
00:34:54,000 --> 00:34:57,000
So consistent hashing is going to have faster lookups.

606
00:34:57,000 --> 00:34:59,000
It's going to be a log n.

607
00:34:59,000 --> 00:35:00,000
Right?

608
00:35:00,000 --> 00:35:03,000
Versus this is o n because I got a hash, we're n's the number of nodes.

609
00:35:03,000 --> 00:35:05,000
I got a hash for each one.

610
00:35:05,000 --> 00:35:07,000
All right, well that's a hash function.

611
00:35:07,000 --> 00:35:08,000
It's not that expensive.

612
00:35:08,000 --> 00:35:11,000
When you're doing a profile, that's not in a big of a deal.

613
00:35:11,000 --> 00:35:15,000
You know, this is simpler, this is much simpler to to implement than consistent hashing.

614
00:35:15,000 --> 00:35:20,000
And consistent hashing is going to have a slower initialization and a slower rebalancing.

615
00:35:20,000 --> 00:35:21,000
Right?

616
00:35:21,000 --> 00:35:28,000
Depends on the number of nodes I would have in the ring for consistent hashing.

617
00:35:28,000 --> 00:35:29,000
Right?

618
00:35:29,000 --> 00:35:31,000
This is simple and easy.

619
00:35:31,000 --> 00:35:38,000
And it's consistent hashing is better for I think also if the topology is more volatile.

620
00:35:38,000 --> 00:35:40,000
Like people come and go in all the time.

621
00:35:40,000 --> 00:35:44,000
Which again for distributed database system where people paying thousands of dollars.

622
00:35:44,000 --> 00:35:47,000
The nodes aren't flipping, flipping one and off all the time.

623
00:35:47,000 --> 00:35:49,000
So this is fine.

624
00:35:49,000 --> 00:35:50,000
Yes.

625
00:35:50,000 --> 00:35:53,000
How many files can you assign to a single node?

626
00:35:53,000 --> 00:36:07,000
So this gets that to this weight thing here, not really talking about, but like you could have the weight be based on the capacity of a node.

627
00:36:07,000 --> 00:36:14,000
So if these are heterogeneous nodes, one machine has more compute capacity or storage capacity than others.

628
00:36:14,000 --> 00:36:23,000
You would you could skew it such that it's given maybe a higher priority sometimes versus more likely to give a higher priority than the other times.

629
00:36:23,000 --> 00:36:24,000
Right?

630
00:36:24,000 --> 00:36:33,000
So like another way to handle that is you could have virtual nodes and say like everybody gets one, but if you are a big machine then you'll get two virtual nodes.

631
00:36:33,000 --> 00:36:36,000
So I'm more likely to get assigned to that larger node.

632
00:36:36,000 --> 00:36:39,000
There's various schemes you can use to balance things out.

633
00:36:40,000 --> 00:36:49,000
This question is what happens if you have two different files that are actually the same worker?

634
00:36:49,000 --> 00:36:50,000
That's not a problem.

635
00:36:50,000 --> 00:36:51,000
It cares.

636
00:36:51,000 --> 00:36:54,000
They're going to have thousands of files and like 10 workers.

637
00:36:54,000 --> 00:36:57,000
So of course you can have workers multiple files that sound the same worker.

638
00:36:57,000 --> 00:37:01,000
Same thing we saw in snowflake.

639
00:37:01,000 --> 00:37:03,000
Right? There are files or 100 megabytes.

640
00:37:03,000 --> 00:37:07,000
So if I have a 10 petabyte database, then I have a lot of files.

641
00:37:07,000 --> 00:37:12,000
Right?

642
00:37:12,000 --> 00:37:14,000
Again, it's a nice easy trick.

643
00:37:14,000 --> 00:37:15,000
It's from the 90s.

644
00:37:15,000 --> 00:37:21,000
It's a simpler implementation than consistent hashing.

645
00:37:21,000 --> 00:37:23,000
It just surprised me when I read this.

646
00:37:23,000 --> 00:37:24,000
I'm like, oh, okay, yeah.

647
00:37:24,000 --> 00:37:28,000
Because most systems would do consistent hashing as we saw in snowflake.

648
00:37:28,000 --> 00:37:36,000
And I think this is because it's just a similar hell like for distributed consensus protocols people pick raft or packs those over a view stamp river.

649
00:37:36,000 --> 00:37:38,000
And they're all fundamentally equivalent.

650
00:37:38,000 --> 00:37:39,000
Yes.

651
00:37:39,000 --> 00:37:46,000
I think the hash function in the Qt change any bit in the age of knowing where you're going to be messed up the up with.

652
00:37:46,000 --> 00:37:48,000
You're going to change it drastically.

653
00:37:48,000 --> 00:37:49,000
Yes.

654
00:37:49,000 --> 00:37:56,000
So that kind of ensures that you kind of have an even distribution when you're just doing regular hashing.

655
00:37:56,000 --> 00:38:01,000
It's not here at like like pre-bending like this worker in the fire.

656
00:38:01,000 --> 00:38:05,000
How do you make your most, not going to be as cute and like like maybe one more time.

657
00:38:05,000 --> 00:38:12,000
Like maybe one worker gets a time to like more and more files on the other.

658
00:38:12,000 --> 00:38:19,000
His question is like how do you ensure that the hash function doesn't introduce skew?

659
00:38:19,000 --> 00:38:22,000
I mean the hash function like hashing.

660
00:38:22,000 --> 00:38:28,000
Putting the the worker ID as a suffix to like the file name.

661
00:38:28,000 --> 00:38:32,000
That's not going to introduce skew in any meaningful way.

662
00:38:32,000 --> 00:38:35,000
We're not hashing in the contents of the file.

663
00:38:35,000 --> 00:38:38,000
We're hashing in the name identifier.

664
00:38:38,000 --> 00:38:44,000
So that string itself with the good hash function to be low, low collocologians.

665
00:38:44,000 --> 00:38:47,000
And again, think of like thousands and thousands of files.

666
00:38:47,000 --> 00:38:50,000
It'll be okay.

667
00:38:50,000 --> 00:38:53,000
The thing that they care about again was solving the problem.

668
00:38:53,000 --> 00:38:55,000
The classic trap he walked into.

669
00:38:55,000 --> 00:38:58,000
Like okay, well like if I had a new note, if I'm assuming naive hashing,

670
00:38:58,000 --> 00:39:03,000
I got to rebalance everything, this avoids that problem.

671
00:39:03,000 --> 00:39:07,000
And then obviously if you drop in a worker goes down, you got to re-sign things.

672
00:39:07,000 --> 00:39:10,000
It's just the reverse of this.

673
00:39:10,000 --> 00:39:12,000
Okay?

674
00:39:12,000 --> 00:39:14,000
So that's the core architecture of yellow brick.

675
00:39:14,000 --> 00:39:18,000
As I said, it basically looks a lot like what we talked about so far.

676
00:39:18,000 --> 00:39:23,000
And you see bits and pieces from snowflake, bits and pieces from Dremel.

677
00:39:23,000 --> 00:39:25,000
And the other systems.

678
00:39:26,000 --> 00:39:28,000
And they're doing like the high q query compilation.

679
00:39:28,000 --> 00:39:33,000
They're doing the vector wise vector wise query processing, the hyper push based model.

680
00:39:33,000 --> 00:39:36,000
You can see again, all the papers we talked about through the semester,

681
00:39:36,000 --> 00:39:39,000
just seeing these patterns repeated over and over again.

682
00:39:39,000 --> 00:39:40,000
Yes.

683
00:39:40,000 --> 00:39:42,000
Oh, the other system is not running on containers, right?

684
00:39:42,000 --> 00:39:46,000
The other system is not running on containers.

685
00:39:46,000 --> 00:39:48,000
That you know about.

686
00:39:48,000 --> 00:39:49,000
Like so hyper no, right?

687
00:39:49,000 --> 00:39:53,000
Because hyper was a single node system, high q with before containers are invented.

688
00:39:54,000 --> 00:39:56,000
But like is Dremel running on containers?

689
00:39:56,000 --> 00:39:57,000
Yes.

690
00:39:57,000 --> 00:39:58,000
Oh, the other.

691
00:39:58,000 --> 00:39:59,000
Yeah.

692
00:39:59,000 --> 00:40:02,000
It's running on board.

693
00:40:02,000 --> 00:40:03,000
Right?

694
00:40:03,000 --> 00:40:04,000
But the paper doesn't like talk about that.

695
00:40:04,000 --> 00:40:06,000
Is snowflake running on containers?

696
00:40:06,000 --> 00:40:07,000
I don't know.

697
00:40:07,000 --> 00:40:08,000
We'd have to go email.

698
00:40:08,000 --> 00:40:09,000
They ask them.

699
00:40:09,000 --> 00:40:11,000
I don't think they're running on their own systems.

700
00:40:11,000 --> 00:40:14,000
Like they have their own machine.

701
00:40:14,000 --> 00:40:16,000
Is it snowflake?

702
00:40:16,000 --> 00:40:19,000
No snowflakes running on the AWS or whatever cloud plumber.

703
00:40:19,000 --> 00:40:21,000
They're like, they have.

704
00:40:22,000 --> 00:40:30,000
Yeah, so like you can get bare mental instances, but like do you want to have again, like going back to.

705
00:40:30,000 --> 00:40:31,000
The same before.

706
00:40:37,000 --> 00:40:39,000
Like there's a bunch of stuff Kubernetes is going to do for you.

707
00:40:39,000 --> 00:40:42,000
Like fault tolerance, provisioning, system state management.

708
00:40:42,000 --> 00:40:44,000
What nodes are up?

709
00:40:44,000 --> 00:40:49,000
If you don't use Kubernetes, you got to roll that all yourself using like LCD or bookkeeper or zookeeper or whatever, right?

710
00:40:49,000 --> 00:40:52,000
Kubernetes, like Kubernetes, just runs the LCD, right?

711
00:40:52,000 --> 00:40:55,000
Like it just does it for you.

712
00:40:55,000 --> 00:40:58,000
So like all of that, you don't have to write if you just run Kubernetes.

713
00:40:58,000 --> 00:41:04,000
And the big thing that paper talks about is for all the low-level optimizations that they implemented, which we'll talk about next,

714
00:41:04,000 --> 00:41:08,000
the containers did actually not impose a problem.

715
00:41:10,000 --> 00:41:15,000
Which to me, that was that was that was surprising.

716
00:41:16,000 --> 00:41:18,000
Okay.

717
00:41:20,000 --> 00:41:29,000
So I've said this many, many times that the entire semester that the operating system is not our friend, it is our enemy, right?

718
00:41:29,000 --> 00:41:33,000
Every day when you're data system, you wake up and you're like, oh man, I hope I don't talk about operating systems.

719
00:41:33,000 --> 00:41:36,000
It's always going to cause problem, right?

720
00:41:37,000 --> 00:41:51,000
So if now we want to build a data system where we avoid the operating system as much as possible, in the extreme case, in the way that we haven't really talked about before,

721
00:41:51,000 --> 00:42:00,000
and we basically want to just, our data process is to boot up, maybe tell the OS, like, oh yeah, give us some of this, give us that,

722
00:42:00,000 --> 00:42:08,000
and push it aside, like, and drive off without it, and not, you know, not ever talk to it again, what do we need to do to actually achieve that?

723
00:42:08,000 --> 00:42:11,000
And that's what this paper shows describes how to do this.

724
00:42:11,000 --> 00:42:23,000
So what they are basically built a unicernal for their data system, where upon boot up, the data based system talks to the OS a little bit, makes six to ten system calls,

725
00:42:23,000 --> 00:42:29,000
gets some memory, gets some allocation to talk to the hardware, yadda yadda, installs whatever drivers it needs, and then that's it.

726
00:42:29,000 --> 00:42:38,000
And no point, will we ever have to go back and talk to the operating system for anything, which is the way it should be in life.

727
00:42:38,000 --> 00:42:49,000
And so they list a bunch of things that they do, which again, some of these things you probably would not do now, like, build on custom memory allocator, we can talk about that a little bit.

728
00:42:50,000 --> 00:43:01,000
But like, all the other stuff, again, it's basically had interact with hardware, and manage our own runtime environment of the system, we don't want to use the opposite system for any of that.

729
00:43:01,000 --> 00:43:17,000
And they'll talk about in the paper, or another public service that they've given, about the performance benefit that they're getting by re-implementing a bunch of the stuff that the operating system is trying to, you know, sort of a general purpose in the notation, but they're going to have something that's highly tuned for their database system.

730
00:43:18,000 --> 00:43:35,000
And the reoccurring pattern, I'm going to say the word overnight in custom, because they custom this, custom that, custom this, and again, they're trying to avoid the OS, they end up re-implementing a bunch of the OS functionality inside of their database system, but if you want to get the extreme performance numbers that they're going to get, you have to do this.

731
00:43:35,000 --> 00:43:43,000
So they're going to lie, they're making heavy use on asynchronous architecture using covert teams, and they want to do this because they want to maximize the hardware utilization.

732
00:43:43,000 --> 00:43:54,000
At no point do they want any thread to stall, like I said, because it's got to get something from memory, they want to keep everything in CPU caches, which is not easy to do, it's very impressive.

733
00:43:54,000 --> 00:44:05,000
You see this kind of architecture also too, alpha databases, this is all what the high-future trading guys are doing, like the quants and things like that.

734
00:44:05,000 --> 00:44:19,000
Those guys are super hardcore about performance, and they're basically doing the same kind of thing, whatever the trading system they're building, you know, for event notifications or triggers or all that is going to run in user space, and they don't want the colonel, the OS to do anything.

735
00:44:19,000 --> 00:44:28,000
So they're applying a lot of the tricks that are being done in like the Wall Street world and the FinTech world, but for a database system.

736
00:44:28,000 --> 00:44:32,000
All right, so the first thing you're going to do is build a memory allocator.

737
00:44:32,000 --> 00:44:42,000
So they have a custom newerware allocator that sometimes they say they say it was latch or lock free, other times they say, I think the paper says it does minimal locks.

738
00:44:42,000 --> 00:45:11,000
I would assume they're taking some locks in there or some latches in there, but what's going to happen is when you boot up the operating boot up the the Davis system, it goes to the OS doesn't, doesn't, doesn't use an M app for malloc, like the allocator, all the memory they're ever going to want, and then manage all that in user space, and they're going to M lock it in the kernel to vent it from getting evicted and written out the disk, because they keep all the memory pages pin pin in memory and never written back to disk.

739
00:45:11,000 --> 00:45:32,000
And then when they hand out allocations to queries, whether running, they're going to do one trick to make sure that like, well, they're only going to run one query at a time, the entire cluster, we'll talk about that why in a second, but they're going to make sure that the chunks that they're allocating are, are contiguous as much as possible to avoid fragmentation.

740
00:45:32,000 --> 00:45:43,000
So you don't want to have like, you know, one query allocated, one big bit chunk, and then start freeing up little bits and pieces inside of it, because then you can't reuse it without, to the query finishes.

741
00:45:43,000 --> 00:45:47,000
So you're going to hand things out in larger chunks and try to keep things aligned nicely.

742
00:45:47,000 --> 00:45:53,000
So they claimed that their allocator is a 100x faster than the Libsy malloc. That's not surprising.

743
00:45:53,000 --> 00:46:05,000
When I asked them when they gave a talk, like, what if you compare against like, G email or TC malloc, I forgot the other one is from Microsoft, it's called me malloc, which is especially better than the G emailoc now.

744
00:46:05,000 --> 00:46:16,000
And they haven't done experiments, but when they were building this in 2016, they were getting, you know, 100x faster than the Libsy malloc.

745
00:46:17,000 --> 00:46:26,000
In addition to this memory allocator, every worker is also going to have its own bufferable manager using all the techniques that we talked about in the interclass.

746
00:46:26,000 --> 00:46:39,000
But for their eviction policy, they're going to use basically a primitive version of LUK where it's basically two cues, two linked lists.

747
00:46:39,000 --> 00:46:44,000
And this is the basic, the same technique that MySQL is doing. Yes.

748
00:46:44,000 --> 00:46:48,000
Is this a specific, do we know allocations, like a lot of work, like, what does that mean?

749
00:46:48,000 --> 00:46:52,000
It's a question, is this a rena allocation? Yes, where the rena is a query.

750
00:46:52,000 --> 00:46:59,000
Postgres calls it a pool, like a memory pool where the query, same idea.

751
00:46:59,000 --> 00:47:05,000
But the key thing is like, when it boots up, it gets all the memory. Whereas like, G malloc and other ones, I think they do it come out.

752
00:47:06,000 --> 00:47:10,000
Which are your questions? What's our, sorry?

753
00:47:10,000 --> 00:47:12,000
It's only doing it once in the beginning.

754
00:47:12,000 --> 00:47:15,000
You know, it's a question, like, it's a question, why do I care about how fast it is if it's only doing once in the beginning?

755
00:47:15,000 --> 00:47:25,000
It's a 100x faster at runtime. So I do the giant memory allocation in the beginning, and then they, their own custom allocators, like when you call, say you called new, whatever, right?

756
00:47:25,000 --> 00:47:31,000
And then you get some chuckle memory. It's going through their code getting from this giant chunk of memory that they've already pre-allocated. Yes.

757
00:47:31,000 --> 00:47:39,000
So, I remember you saying that all of the queries, sorry, like each of the clusters, like, running one query? Yes.

758
00:47:39,000 --> 00:47:45,000
So, like, that's one query at a time, but they can be like, concurrently doing a cluster of them.

759
00:47:45,000 --> 00:47:53,000
So the paper says that, either, I'm conflating papers and talks in the way they're, as they have.

760
00:47:53,000 --> 00:47:57,000
At some point, they're saying that they're only around one query at a time in a cluster.

761
00:47:57,000 --> 00:48:03,000
But they talk about the memory allocator that, like, they keep track of memory on a per-query lifetime.

762
00:48:03,000 --> 00:48:10,000
So that part's sort of confusing, I agree, that, like, if there's only one query running, then, like, you just give all the memory back when the query is done.

763
00:48:10,000 --> 00:48:16,000
Right? And this is what they said, sort of says. So I don't know exactly what they're doing.

764
00:48:16,000 --> 00:48:22,000
Similar question or Patrick or no? Oh, no. Okay. Right.

765
00:48:22,000 --> 00:48:28,000
So, I want to go back to this thing, huge pages. Who are you here? Sorry, yes.

766
00:48:28,000 --> 00:48:32,000
The technology is happening from the OS at the beginning to when you need to use more of these questions?

767
00:48:32,000 --> 00:48:41,000
You don't get more. The machine has, say, a machine has 100 gigs. You take 99 gigs. That's it.

768
00:48:41,000 --> 00:48:51,000
So, I say, this idea is not novel to them. So the embedded, some of the embedded data is that run on the stream hardware.

769
00:48:51,000 --> 00:48:57,000
I think we, I think I mentioned ExtremeDB. They're running on, like, low-level embedded devices.

770
00:48:57,000 --> 00:49:05,000
Like, for, in those real-time environments, real-time operating systems, when you boot up, you have to get all your memory at the very beginning.

771
00:49:05,000 --> 00:49:10,000
You can never go ask for more again to the OS. The OS actually doesn't allow you to do that. Right?

772
00:49:10,000 --> 00:49:16,000
Because they don't want, like, you know, the missile will be flying and then you try to do malloc and malloc fails and you have to handle that.

773
00:49:16,000 --> 00:49:22,000
So they allocate all the memory in the beginning. There's another system out of South Africa called Tiger Beetle. They do the same thing.

774
00:49:22,000 --> 00:49:31,000
System boots up to get all the memory in the beginning. They never call malloc again. Everything's happening in Deuserspace.

775
00:49:31,000 --> 00:49:46,000
So from a system design structure, it's actually a good idea. Like, taking how many times you call, you know, how many times you, if you called malloc or new inside your code, C++ or C code, you're not checking with the memory allocation fails.

776
00:49:46,000 --> 00:49:49,000
Right?

777
00:49:49,000 --> 00:49:53,000
Yes? You're laughing. Yes.

778
00:49:53,000 --> 00:50:06,000
Again, like, a lot of code is written like that. If you're trying to make something super fault-ton, and resilient, especially for embedded devices, you don't want your car calling malloc and failing and then drive you off the highway.

779
00:50:06,000 --> 00:50:14,000
Right? So they do all, for safety reasons, they do all this allocation up front. And they're doing this for performance reasons.

780
00:50:15,000 --> 00:50:29,000
Right? So now, when you, when I call, you know, I want to get memory from this allocator, if the allocations going to fail, you know, you, you, you could have the allocator implement something to like, okay, I know I'm running this query. It's asked for this memory.

781
00:50:29,000 --> 00:50:35,000
I can't get the memory that it needs. You know, you could alert another part of the system to start spilling other things up the disk.

782
00:50:36,000 --> 00:50:49,000
Okay, we saw something similar in photon, right? We're photon had essentialized allocators sitting in the Java that could in spark sequel that could then recognize that you can't allocate, you know, you know, you know, you need to decide who to start freeing.

783
00:50:49,000 --> 00:50:53,000
You could do the same thing here.

784
00:50:53,000 --> 00:50:56,000
Okay, so quick show of hands. Who here knows what the huge pages are?

785
00:50:57,000 --> 00:51:07,000
Okay, so that's not bad. So less than half, but more than I thought, but okay. So this is quick diverges. I don't think we teach us in the intro class.

786
00:51:07,000 --> 00:51:20,000
We probably should. So, you know, when we talk about pages in a data system, we said that there's like, there's a horror page that's simply four kilobytes. That's the smallest size that you can guarantee or the larger size, you can guarantee the hardware to write out something atomically.

787
00:51:21,000 --> 00:51:34,000
Then the OS has its own page size and the database system has its page size. And in an OTP system like Postgres and SQL item, I SQL, you know, we're worried about, you know, making changes in the page and writing it out. So we don't want our pages to be really big.

788
00:51:34,000 --> 00:51:38,000
But now in the read only system.

789
00:51:39,000 --> 00:51:47,000
You know, the four kilobytes page size is actually kind of small, especially if we're processing, you know, terabytes of data.

790
00:51:47,000 --> 00:52:04,000
So the reason why this is going to be bad for us is because the CPU is going to main its own translation, local side buffer using some portion of the URL one cache that basically is a mapping from a, like a virtual memory page to a physical page.

791
00:52:04,000 --> 00:52:16,000
And so if I have all these four kilobyte pages as I'm ripping through, I'm getting a large chunk of data, then that TLB is going to have a bunch of misses because it has to go fetch things that then aren't going to fit.

792
00:52:16,000 --> 00:52:18,000
Right.

793
00:52:18,000 --> 00:52:30,000
So with huge pages, you can tell the operating system that instead of allocating things in four kilobytes, I want to allocate memory in larger chunks.

794
00:52:30,000 --> 00:52:35,000
So in Linux, it's going to be two megabytes or one gigabyte.

795
00:52:35,000 --> 00:52:43,000
And so now the, on the actual physical hardware, these blocks have to be contiguous.

796
00:52:43,000 --> 00:52:56,000
But now I can address a block in my, or page in my TLB, which is, you know, a single, single virtual memory address can now point to two megabytes instead of four kilobytes.

797
00:52:56,000 --> 00:53:04,000
So that's less pressure on my TLB. And that means I'm going to have fewer L1 cache misses in my TLB. And I can rip through things much, much faster.

798
00:53:04,000 --> 00:53:12,000
So you don't get this by default in Linux. Right. By Linux default, again, you call, you call Malik, about allocate something in an MAP, you're going to get four kilobytes.

799
00:53:12,000 --> 00:53:17,000
But you can pass flags and say, I want this to be using, using huge pages.

800
00:53:18,000 --> 00:53:35,000
So there's a paper from Google, which I think is two years ago, for their custom memory allocator that found that when they switched over to huge pages for Spanner, you know, you got a 65, 6.5% improvement just for switching to huge pages.

801
00:53:35,000 --> 00:53:47,000
And again, Spanner is an OTP system. So it's not like you're doing huge massive table scans. It's still doing, you know, point-query lookups. But it's, you know, that's a pretty big win for just changing this flag in the US and Linux.

802
00:53:47,000 --> 00:53:54,000
So huge pages are going to make a lot of sense for an MLB system like yellow brick and others that we've talked about.

803
00:53:55,000 --> 00:54:07,000
And so that's why they were setting the page size within a file to be two megabytes, because that aligns with the two megabyte size you would get with huge pages in the US.

804
00:54:07,000 --> 00:54:15,000
And also to its small enough where it could sit around in your L3 cache, because that's going to be tens or dozens of megabytes.

805
00:54:15,000 --> 00:54:22,000
So these chunks can sit in your L3 cache and your CPU, and you can process it very quickly without going out to memory.

806
00:54:23,000 --> 00:54:31,000
So for this reason, that's why they're using two megabytes size, and they're going to turn on huge pages for in your operating system.

807
00:54:31,000 --> 00:54:37,000
And the other papers don't talk about this, but I guarantee other systems are doing something very similar.

808
00:54:38,000 --> 00:54:44,000
Okay, so half of you have heard of huge pages. How many of you have heard of transparent huge pages?

809
00:54:45,000 --> 00:54:48,000
Nobody. Good. Excellent.

810
00:54:48,000 --> 00:54:55,000
Okay, so do not do this. I'm putting this warning here, so you don't forget to remember this.

811
00:54:55,000 --> 00:54:59,000
Okay? This is the worst thing you can do for databases for memory. Do not do this.

812
00:54:59,000 --> 00:55:04,000
Okay? If you do this, and I'm dead, I'll haunt you or I'll figure something out.

813
00:55:05,000 --> 00:55:16,000
So Linux had this feature called transparent huge pages. I came out in, I think, 2007, but it wasn't on default for a while.

814
00:55:16,000 --> 00:55:28,000
And what this does is the OS in the background starts looking at your pages in memory and says, oh, I see that these guys are being accessed together very frequently, and they're both four kilobytes.

815
00:55:28,000 --> 00:55:33,000
So we find a bunch of ones that I can stick together for your process and to make a two megabyte page.

816
00:55:33,000 --> 00:55:43,000
And then on the other covers, I'll make a hide that from you that now the virtual memory address, you know, now points to this two megabyte pages to a bunch of four kilobytes pages.

817
00:55:43,000 --> 00:55:51,000
And then it goes even bigger, like, you find a bunch of two megabyte pages, it'll try to put them into one gigabyte pages.

818
00:55:52,000 --> 00:56:20,000
So they turn this on my default at some point in the 2010s, and then they revert it back and a bunch of things, because this is a terrible thing to do, because what happens is, when it's trying to do this realization, if you do a look up now on that address in memory, it's going to block your process because it's doing this reorganization and reorganizing things.

819
00:56:20,000 --> 00:56:38,000
Now further also more, like, if now that if you're doing a bunch of small rights into these files, which again for O-Lapso, we're not really doing, now you're going to have invalidation of the memory across this one gigabyte file, even though I may have done a small change.

820
00:56:39,000 --> 00:56:46,000
So this is a classic example of like the operating system getting in the way from the database system, you definitely don't want to do this.

821
00:56:46,000 --> 00:56:51,000
But they thought, okay, for most applications this is okay, but from a database perspective, this is actually terrible.

822
00:56:51,000 --> 00:56:57,000
Now for O-Lap, if everything's read-only, maybe it might be okay.

823
00:56:58,000 --> 00:57:06,000
Vertica's an O-Lap system, they say you can turn it along, if you have run newer Linux distros, because the stalling has gotten much less.

824
00:57:06,000 --> 00:57:11,000
But pretty much every single database is not there, it will tell you to make sure you turn this off.

825
00:57:12,000 --> 00:57:23,000
So if you just Google Transparent Huge Pages, so here, here's what it is, here's how to turn it along.

826
00:57:23,000 --> 00:57:35,000
But in the scroll pass all this, then here's all the database vendors saying, hey, don't do this, long it to be, disable trans- Huge Pages, pincap or tidy B, why we disable it, oracle, disable it, splunk, disable it, right?

827
00:57:35,000 --> 00:57:41,000
So this is terrible, do not do this, right?

828
00:57:41,000 --> 00:57:44,000
This is, as I said, this is cancer for databases.

829
00:57:44,000 --> 00:57:48,000
But for regular Huge Pages, that's okay, because we can control that.

830
00:57:48,000 --> 00:57:59,000
And again, we know that the access pattern, the query that we're running for this particular data, we might be fetching from the object store, that can be in two megabytes chunks, and that's fine.

831
00:57:59,000 --> 00:58:02,000
And we'll get the win from it, okay?

832
00:58:02,000 --> 00:58:09,000
Yeah, this is kind of like, you know, read NC17, so we can probably don't want to teach it to the undergrad, but for you guys, it's okay.

833
00:58:09,000 --> 00:58:11,000
But don't do it, okay?

834
00:58:11,000 --> 00:58:20,000
So going back to the Ruffle Manager, as I was saying, they're doing an approximate LUK, and they don't say this explicitly, but it looks from their description, it smells a lot like what my Seaco does.

835
00:58:20,000 --> 00:58:33,000
So in the way my Seaco does the eviction policy, they actually just maintain a single link list of pages as they're being accessed, going from news to odys.

836
00:58:33,000 --> 00:58:37,000
But they're actually going to maintain two heads into this link list.

837
00:58:37,000 --> 00:58:40,000
They'll have a young list, and then the old list.

838
00:58:40,000 --> 00:58:48,000
So the young list would be the ones that are like, are, are, are, are, have recently been added and recently being accessed over and over again.

839
00:58:48,000 --> 00:58:56,000
And then the old list are ones where once you access it the first time, you put it in this old list, so that's more likely to get evicted.

840
00:58:56,000 --> 00:59:10,000
The idea is that if I read it once, but then never read it again, like what happened in the Scantral Scantral Scam flood, then it'll get evicted more quickly than it would otherwise with a regular LRU.

841
00:59:10,000 --> 00:59:17,000
But then when, if it gets access to the game when it's in the old list, then it gets promoted to the young list, right? Because it's more likely to be accessed again.

842
00:59:17,000 --> 00:59:25,000
So here, query one touches page one. Page one is not in our, in our buffer pool. So we go ahead and put it here at the, the head of the old list.

843
00:59:25,000 --> 00:59:28,000
Evict page eight, everything slides over and that's fine.

844
00:59:28,000 --> 00:59:32,000
Query one goes away, the queue two shows up, query two shows up, it accesses page one again.

845
00:59:32,000 --> 00:59:41,000
We recognize that it is in our old list, so go, we go ahead and now promote it to the front of the new list, right? And everything's sort of slides over.

846
00:59:41,000 --> 00:59:48,000
So then I don't think they're, they're not, I don't know whether maintaining the old list in the young list, but this is basically what they say.

847
00:59:48,000 --> 00:59:57,000
Like every time you access the file the first time in the cache, then it's put in this sort of special place where it's more likely to get evicted.

848
00:59:57,000 --> 01:00:04,000
But then if it's accessed again while still in the cache, then it gets promoted to, to the regular LRU.

849
01:00:04,000 --> 01:00:11,000
Right? Pretty, you know, pretty standard check is, and it's, and it's simple.

850
01:00:11,000 --> 01:00:17,000
All right, so the next thing that we also implement is given to the OS is the task scheduler, the thread scheduler.

851
01:00:17,000 --> 01:00:31,000
So everything's based on covert teams. And they're going to do basically in crop to multitasking with non-pimter threading where the, the task or the thread can go get something, you know, test execute.

852
01:00:31,000 --> 01:00:41,000
If it needs something, then it'll just, the language control of it and return back to the, you know, get the next task to work on for that particular query.

853
01:00:41,000 --> 01:00:50,000
So for this, it smells a lot like the Microsoft SQL server or SQL OS, but in that world they were doing like, I think five or 10 millisecond quantum's.

854
01:00:50,000 --> 01:01:00,000
And this one, I think they're doing 100 millisecond quantum's where they have this centralized scheduler for the cross the entire cluster that they have to then do a heartbeat and synchronize with every 100 milliseconds.

855
01:01:00,000 --> 01:01:07,000
So every 100 milliseconds, say, are we all doing the right thing, or you know, the right set of tasks, the right operations right now.

856
01:01:07,000 --> 01:01:15,000
And as I said before, they want to have all the work, all the, the only one query can run out of time in, in the cluster.

857
01:01:15,000 --> 01:01:29,000
And that all of the threads on a single worker node will be executing the same task, just on different pieces of the data at the same time, so that all the, the code, you know,

858
01:01:29,000 --> 01:01:36,000
the code space, the code memory for the actual program instructions, all that's going to reside in the cache and you're not ping-ponging back and forth by running different tasks.

859
01:01:36,000 --> 01:01:45,000
They're all basically running the same code, just in different pieces of data and you're going to maximize your, your cache usage.

860
01:01:45,000 --> 01:01:52,000
The, right, this is basically what I said before, because again, they want to have everything be able to process on L, L3. Yes.

861
01:01:52,000 --> 01:02:06,000
So, like, good question. So this goes back to like the having multiple queries on the same thing. So like, are the, sorry, are the tasks, like, let's say, one from one with queries or like, the query had multiple tasks?

862
01:02:06,000 --> 01:02:13,000
So actually, like, our tasks one in one query are queries on multiple tasks. They can have multiple tasks, sort of, like different fragments on it, you know.

863
01:02:13,000 --> 01:02:23,000
So, yeah, the second thing, what, what's part of this is cooperating? Does this seem like an interrupt your event scheduler, right? So every 100 seconds, I'm just going to push to a different query.

864
01:02:23,000 --> 01:02:39,000
Like, it's not every 100 milliseconds, I switch another query, every 100 milliseconds. Right, but it may be like the, I have, I have 10, 100, 100 milliseconds chunks or, our, cues of data.

865
01:02:39,000 --> 01:02:52,000
So I could still be working the same task as in processing a query, right? So every 100 milliseconds, you go back and you go back to the, the essential schedule and say, you know, what's the next thing I should do?

866
01:02:52,000 --> 01:02:59,000
Right? And it may be like, oh yeah, keep running the same task, we're just running, but here's the next set of follow, you should process on. Right?

867
01:02:59,000 --> 01:03:07,000
So that's not like, that sounds like a normal, like, interrupt your event scheduler.

868
01:03:07,000 --> 01:03:16,000
I think if there's something you need that's not there, you you'll yield back and get the next task for yourself. I think that's the difference.

869
01:03:16,000 --> 01:03:25,000
And it goes back to like how do you keep all the memory like on the same worker? I'm sorry, all the data on the same worker.

870
01:03:25,000 --> 01:03:28,000
What kind of context would happen?

871
01:03:28,000 --> 01:03:30,000
Like a...

872
01:03:30,000 --> 01:03:32,000
OS level context switch or query.

873
01:03:32,000 --> 01:03:34,000
Like how does a context switch, query context switch?

874
01:03:34,000 --> 01:03:36,000
Do you need like grab data from somewhere else?

875
01:03:36,000 --> 01:03:41,000
Or is it just like five sets of query data on a single worker?

876
01:03:41,000 --> 01:03:43,000
I'm not sure what you're asking.

877
01:03:43,000 --> 01:03:46,000
So it seems like we have like, look at we have four tasks here.

878
01:03:46,000 --> 01:03:50,000
Let's say they're different queries on the same worker.

879
01:03:50,000 --> 01:03:54,000
Again, from what they say, I think it's the same query.

880
01:03:54,000 --> 01:03:57,000
But it could be different fragments of the same query plan.

881
01:03:57,000 --> 01:04:00,000
Right.

882
01:04:00,000 --> 01:04:05,000
So how can you execute one query at once if you want to maximize?

883
01:04:05,000 --> 01:04:08,000
Right, so to say it's correct.

884
01:04:08,000 --> 01:04:12,000
Like why would you only want to execute one query at a time in the cluster?

885
01:04:12,000 --> 01:04:20,000
If you want to maximize your research utilization because there's points where I need to call us a bunch of data.

886
01:04:20,000 --> 01:04:23,000
And I'm not going to have all the query, you know, all...

887
01:04:23,000 --> 01:04:25,000
And that's a run as a single thread.

888
01:04:25,000 --> 01:04:27,000
I don't know, I don't know how to handle that.

889
01:04:27,000 --> 01:04:30,000
So I think that...

890
01:04:30,000 --> 01:04:32,000
I think what they probably do is...

891
01:04:32,000 --> 01:04:34,000
Actually, I'm speculating, I don't know.

892
01:04:34,000 --> 01:04:39,000
But you can imagine like, I know at the last stage I'm going to just combine the results back to it's...

893
01:04:39,000 --> 01:04:42,000
Because combine the results back to a single...

894
01:04:42,000 --> 01:04:45,000
You know, result set from multiple threads.

895
01:04:45,000 --> 01:04:48,000
That single thread in...

896
01:04:48,000 --> 01:04:52,000
I have my work or start running out the next query.

897
01:04:52,000 --> 01:04:55,000
But I don't know.

898
01:04:55,000 --> 01:04:58,000
Is it not my two or three long tryout?

899
01:04:58,000 --> 01:05:01,000
Like what if you install a...

900
01:05:01,000 --> 01:05:03,000
Is it 100 milliseconds a long time?

901
01:05:03,000 --> 01:05:05,000
Yes.

902
01:05:05,000 --> 01:05:06,000
But I think...

903
01:05:06,000 --> 01:05:10,000
Again, they don't talk about this, but I think the centralized schedule could be like, here's task 1, 2, 3.

904
01:05:10,000 --> 01:05:13,000
And then each task might take, you know, some 10 milliseconds,

905
01:05:13,000 --> 01:05:16,000
some subset of the 100 milliseconds.

906
01:05:16,000 --> 01:05:18,000
It's not like every 100 milliseconds.

907
01:05:18,000 --> 01:05:20,000
Okay, we're all noticing things.

908
01:05:20,000 --> 01:05:22,000
You could say, you know, here's enough work to do for 100 milliseconds.

909
01:05:22,000 --> 01:05:25,000
I don't know, the paper doesn't specify.

910
01:05:28,000 --> 01:05:29,000
Okay.

911
01:05:29,000 --> 01:05:36,000
So they claim that with not the centralized schedule part, but the thread schedule on the node itself,

912
01:05:36,000 --> 01:05:40,000
that it's 500x faster than the Linux thread schedule.

913
01:05:40,000 --> 01:05:43,000
Again, doesn't surprise me.

914
01:05:43,000 --> 01:05:45,000
But it's...

915
01:05:45,000 --> 01:05:48,000
Again, 500x faster than what?

916
01:05:48,000 --> 01:05:50,000
Like the...

917
01:05:50,000 --> 01:05:53,000
The query is not going to run 500x faster.

918
01:05:53,000 --> 01:05:56,000
It's more like the portion that you're spending...

919
01:05:56,000 --> 01:06:01,000
The time you spent on scheduling itself, they've reduced that down by 500 milliseconds.

920
01:06:01,000 --> 01:06:02,000
But...

921
01:06:02,000 --> 01:06:04,000
Is the context switched at the 100 milliseconds?

922
01:06:04,000 --> 01:06:05,000
The context...

923
01:06:05,000 --> 01:06:09,000
So the normal, the West context switch would take easily less than...

924
01:06:10,000 --> 01:06:11,000
Yeah.

925
01:06:11,000 --> 01:06:12,000
...100 nanoseconds.

926
01:06:12,000 --> 01:06:13,000
Yeah.

927
01:06:13,000 --> 01:06:16,000
But again, like that's like a...

928
01:06:16,000 --> 01:06:19,000
...head of citizen.

929
01:06:19,000 --> 01:06:21,000
It's Omnus Law, right?

930
01:06:21,000 --> 01:06:24,000
The slowest part of your query isn't the context switch.

931
01:06:24,000 --> 01:06:25,000
Right?

932
01:06:25,000 --> 01:06:27,000
It can be if you're flipping around all the time, but like...

933
01:06:27,000 --> 01:06:29,000
It wouldn't be that bad.

934
01:06:31,000 --> 01:06:32,000
All right.

935
01:06:32,000 --> 01:06:34,000
So the other crazy thing they're doing again is that they're going to run their own...

936
01:06:34,000 --> 01:06:36,000
They build their own device drivers.

937
01:06:36,000 --> 01:06:39,000
So they're going to have custom NMVME and custom Nick drivers...

938
01:06:39,000 --> 01:06:42,000
That are all going to run in user space using their memory allocator.

939
01:06:42,000 --> 01:06:44,000
And they want to do this because they want to reduce the...

940
01:06:44,000 --> 01:06:48,000
The kernel copying of a memory going in from the hardware...

941
01:06:48,000 --> 01:06:51,000
From the hardware to the device to the OS...

942
01:06:51,000 --> 01:06:53,000
To the...

943
01:06:53,000 --> 01:06:55,000
You know, to user space.

944
01:06:55,000 --> 01:06:58,000
So everything's going to be running down...

945
01:06:58,000 --> 01:07:00,000
Running on their own custom drivers.

946
01:07:00,000 --> 01:07:04,000
And then they have their own custom network protocol that they build.

947
01:07:04,000 --> 01:07:06,000
And there's a byproduct of...

948
01:07:06,000 --> 01:07:08,000
The reason they had to do this is because when it was on-prem...

949
01:07:08,000 --> 01:07:11,000
They were running with a Finneban using RDMA.

950
01:07:11,000 --> 01:07:15,000
And they were getting insane numbers because it's a Finneban, but it's expensive.

951
01:07:15,000 --> 01:07:17,000
But you don't get...

952
01:07:17,000 --> 01:07:20,000
I don't think you can now, but at the time when they were switching to cloud...

953
01:07:20,000 --> 01:07:21,000
I don't think...

954
01:07:21,000 --> 01:07:23,000
I don't think you could get that on Amazon.

955
01:07:23,000 --> 01:07:24,000
I don't know.

956
01:07:24,000 --> 01:07:25,000
But...

957
01:07:25,000 --> 01:07:27,000
So instead of relying on TCP, which they found was too slow...

958
01:07:27,000 --> 01:07:30,000
That they built their own network protocol based on UDP...

959
01:07:30,000 --> 01:07:34,000
And did all the reliability checks themselves in their driver...

960
01:07:34,000 --> 01:07:38,000
And to get things from the NIC up into user space as fast as possible...

961
01:07:38,000 --> 01:07:40,000
They're going to be using the DVDK.

962
01:07:40,000 --> 01:07:42,000
Where they're actually going to maintain the...

963
01:07:42,000 --> 01:07:45,000
The queues on the hardware themselves...

964
01:07:45,000 --> 01:07:47,000
Every thread...

965
01:07:47,000 --> 01:07:49,000
Worker thread is going to have its own receive and transmit queue...

966
01:07:49,000 --> 01:07:52,000
They're going to pull asynchronously to see whether it's any work to be done.

967
01:07:52,000 --> 01:07:54,000
And then this part is bit confusing...

968
01:07:54,000 --> 01:07:58,000
But they talk about how they have what I'll call partners CPU thread...

969
01:07:58,000 --> 01:08:01,000
Or partner thread CPU running in another worker...

970
01:08:01,000 --> 01:08:04,000
That if that thread ever needs to send...

971
01:08:04,000 --> 01:08:07,000
If I'm a thread and need to send data to another worker...

972
01:08:07,000 --> 01:08:11,000
I can't send it to any generic mailbox on the other side...

973
01:08:11,000 --> 01:08:15,000
I'm only sending it directly to that CPU.

974
01:08:15,000 --> 01:08:17,000
Some orchestration has to be done...

975
01:08:17,000 --> 01:08:19,000
A coordination has to be done to recognize that...

976
01:08:19,000 --> 01:08:21,000
Okay, this data press was this CPU on this worker...

977
01:08:21,000 --> 01:08:24,000
And it needs to get processed by that worker on that CPU on that worker...

978
01:08:24,000 --> 01:08:28,000
And so they wrap things in the correct way.

979
01:08:28,000 --> 01:08:32,000
They talk about how they can introduce a distribution operator...

980
01:08:32,000 --> 01:08:35,000
This is basically a shuffle stuff we talked about before...

981
01:08:35,000 --> 01:08:38,000
And in that case, again, I think it's...

982
01:08:38,000 --> 01:08:42,000
I don't know how that's going to fit into this model...

983
01:08:42,000 --> 01:08:45,000
Unless you're doing the shuffle locally to read issue with things...

984
01:08:45,000 --> 01:08:49,000
And because you know that the memory address for this worker...

985
01:08:49,000 --> 01:08:52,000
That's going to be responsible for some portion of the data...

986
01:08:52,000 --> 01:08:55,000
It's going to then be sent to the other worker...

987
01:08:55,000 --> 01:08:58,000
The other thread on the other node that I know is going to be able to process it...

988
01:08:58,000 --> 01:09:02,000
So there's a little extra work they have to do to make this guarantee...

989
01:09:02,000 --> 01:09:06,000
But now, if you have this where you know that my CPU can only write to the...

990
01:09:06,000 --> 01:09:10,000
To the other worker on its one queue...

991
01:09:10,000 --> 01:09:15,000
Then that can reduce the amount of latching or locking up the do on the hover device itself.

992
01:09:17,000 --> 01:09:19,000
They also built their own client side...

993
01:09:19,000 --> 01:09:22,000
Their custom client side S3 library...

994
01:09:22,000 --> 01:09:25,000
Because the one Amazon gave them was too slow...

995
01:09:25,000 --> 01:09:27,000
Again, they used the DVDK for that...

996
01:09:27,000 --> 01:09:30,000
And they said it was 3x faster than when Amazon did.

997
01:09:30,000 --> 01:09:33,000
So again, when they gave a talk...

998
01:09:33,000 --> 01:09:35,000
With us a few years ago...

999
01:09:35,000 --> 01:09:37,000
I don't think they showed these numbers...

1000
01:09:37,000 --> 01:09:39,000
And I asked them about it...

1001
01:09:39,000 --> 01:09:42,000
How much better are you getting if you use DVDK?

1002
01:09:42,000 --> 01:09:46,000
And so this is running the TPCDS workload...

1003
01:09:46,000 --> 01:09:48,000
On different cluster sizes...

1004
01:09:48,000 --> 01:09:50,000
And they're showing...

1005
01:09:50,000 --> 01:09:53,000
If you use regular TCP versus their optimized DVDK version...

1006
01:09:53,000 --> 01:09:57,000
It's around roughly about 20% improvement...

1007
01:09:57,000 --> 01:10:01,000
Overrego TCP.

1008
01:10:01,000 --> 01:10:06,000
You know, that's not like mind-blowingly faster...

1009
01:10:06,000 --> 01:10:09,000
But I think in the paper talk about...

1010
01:10:09,000 --> 01:10:11,000
There was one query that was 70% faster...

1011
01:10:11,000 --> 01:10:13,000
Because it was transferring a lot of data.

1012
01:10:13,000 --> 01:10:15,000
It depends on the workload...

1013
01:10:15,000 --> 01:10:17,000
How much does cash, of course...

1014
01:10:17,000 --> 01:10:21,000
But again, these guys really care about performance...

1015
01:10:21,000 --> 01:10:23,000
And it's 20% matters.

1016
01:10:23,000 --> 01:10:25,000
I also asked them to...

1017
01:10:25,000 --> 01:10:27,000
Between the custom S3...

1018
01:10:27,000 --> 01:10:29,000
All the PCIe drivers...

1019
01:10:29,000 --> 01:10:31,000
The custom drivers...

1020
01:10:31,000 --> 01:10:33,000
The allocator...

1021
01:10:33,000 --> 01:10:35,000
Which one has the biggest win...

1022
01:10:35,000 --> 01:10:37,000
And they didn't have an answer...

1023
01:10:37,000 --> 01:10:39,000
You're going to build a new company...

1024
01:10:39,000 --> 01:10:41,000
And pick one of those techniques...

1025
01:10:41,000 --> 01:10:42,000
Which one should you target...

1026
01:10:42,000 --> 01:10:44,000
A lot of the stuff they built...

1027
01:10:44,000 --> 01:10:46,000
2015, 2016...

1028
01:10:46,000 --> 01:10:48,000
And they haven't really...

1029
01:10:48,000 --> 01:10:50,000
Going back and revisited it...

1030
01:10:50,000 --> 01:10:52,000
And I think other things like the memory allocator...

1031
01:10:52,000 --> 01:10:54,000
Like Jemal or Memeal or TC Mal...

1032
01:10:54,000 --> 01:10:56,000
They've gotten a lot better...

1033
01:10:56,000 --> 01:10:58,000
And they're not going to be worth it to build it from scratch now...

1034
01:10:58,000 --> 01:11:00,000
Yes?

1035
01:11:00,000 --> 01:11:02,000
You said they used to use them...

1036
01:11:02,000 --> 01:11:04,000
And what would it cost a lot of money...

1037
01:11:04,000 --> 01:11:06,000
So is this really...

1038
01:11:06,000 --> 01:11:08,000
Do you think like...

1039
01:11:08,000 --> 01:11:10,000
Smoker than Fanyback would be interested in cost saving money?

1040
01:11:10,000 --> 01:11:12,000
But you can only get that on prem...

1041
01:11:12,000 --> 01:11:14,000
Is UDP...

1042
01:11:14,000 --> 01:11:18,000
Is this UDP thing they're doing?

1043
01:11:18,000 --> 01:11:22,000
Are they doing this because it's cheaper?

1044
01:11:22,000 --> 01:11:26,000
I think no, I think they're doing this because if you just use like...

1045
01:11:26,000 --> 01:11:28,000
Out of the box OS networking stack...

1046
01:11:28,000 --> 01:11:30,000
It's going to be slower.

1047
01:11:30,000 --> 01:11:32,000
So like by building something custom...

1048
01:11:32,000 --> 01:11:34,000
They get better performance.

1049
01:11:34,000 --> 01:11:36,000
I don't think it achieves the incentive end performance...

1050
01:11:36,000 --> 01:11:38,000
But it moves you closer to it.

1051
01:11:38,000 --> 01:11:42,000
Because 20% best on TCP doesn't sound like...

1052
01:11:42,000 --> 01:11:44,000
Crazy at all.

1053
01:11:44,000 --> 01:11:46,000
How slow DCP is?

1054
01:11:46,000 --> 01:11:48,000
It doesn't sound like crazy...

1055
01:11:48,000 --> 01:11:50,000
You think you could do better or...

1056
01:11:50,000 --> 01:11:52,000
Well DCP does like so much stuff in this communication...

1057
01:11:52,000 --> 01:11:54,000
Like UDP would be basically just blasting fights in a wire...

1058
01:11:54,000 --> 01:11:56,000
Like you would think that...

1059
01:11:56,000 --> 01:11:58,000
It would be much higher.

1060
01:11:58,000 --> 01:12:00,000
Plus the DPDK did doing kernel bypass anyway.

1061
01:12:00,000 --> 01:12:02,000
I mean it depends on the query.

1062
01:12:02,000 --> 01:12:04,000
Again there's one query in the TPCDS workload...

1063
01:12:04,000 --> 01:12:06,000
Where they were getting a 77% improvement...

1064
01:12:06,000 --> 01:12:08,000
Because I think transfer to a ton of data.

1065
01:12:08,000 --> 01:12:10,000
On average it's 20%.

1066
01:12:12,000 --> 01:12:22,000
So your question is...

1067
01:12:22,000 --> 01:12:24,000
Can we take a little bit to show that...

1068
01:12:24,000 --> 01:12:26,000
Yeah so it's quite...

1069
01:12:26,000 --> 01:12:28,000
So your question is...

1070
01:12:28,000 --> 01:12:30,000
How do you show a reliable delivery...

1071
01:12:30,000 --> 01:12:32,000
Do you still do sequence numbers?

1072
01:12:32,000 --> 01:12:34,000
Yes, but...

1073
01:12:34,000 --> 01:12:36,000
I can't say how they do it...

1074
01:12:36,000 --> 01:12:38,000
But you can imagine like...

1075
01:12:38,000 --> 01:12:40,000
Okay, I know I need to send 10 packets...

1076
01:12:40,000 --> 01:12:42,000
So when I start sending you data...

1077
01:12:42,000 --> 01:12:44,000
Here's one of 10...

1078
01:12:44,000 --> 01:12:46,000
Two of 10, three of 10...

1079
01:12:46,000 --> 01:12:48,000
If I don't see four of 10...

1080
01:12:48,000 --> 01:12:50,000
I go back and ask where back.

1081
01:12:50,000 --> 01:12:54,000
Yes, they are re-implementing something that looks like TCP...

1082
01:12:54,000 --> 01:12:58,000
But TCP sends acts for everything.

1083
01:12:58,000 --> 01:13:00,000
Here's a packet.

1084
01:13:00,000 --> 01:13:02,000
Did you get it?

1085
01:13:02,000 --> 01:13:04,000
Yes, I got it.

1086
01:13:04,000 --> 01:13:06,000
And this is like...

1087
01:13:06,000 --> 01:13:08,000
Okay, I should have sent you 10.

1088
01:13:08,000 --> 01:13:10,000
Did you get 10? Yes.

1089
01:13:10,000 --> 01:13:12,000
Yeah, I don't know...

1090
01:13:12,000 --> 01:13:14,000
You know, simple ways to do it...

1091
01:13:14,000 --> 01:13:16,000
Like some...

1092
01:13:16,000 --> 01:13:18,000
Just try and see if you can see...

1093
01:13:18,000 --> 01:13:20,000
Like just moving everything you got...

1094
01:13:20,000 --> 01:13:22,000
Like that.

1095
01:13:22,000 --> 01:13:24,000
Hey...

1096
01:13:24,000 --> 01:13:26,000
Because like...

1097
01:13:26,000 --> 01:13:28,000
What they just do...

1098
01:13:28,000 --> 01:13:30,000
You need the best moment in time...

1099
01:13:30,000 --> 01:13:32,000
In five years ago was the only choice...

1100
01:13:32,000 --> 01:13:34,000
It's for EPBF.

1101
01:13:34,000 --> 01:13:36,000
Right?

1102
01:13:36,000 --> 01:13:40,000
Or say you can go back to like 2016-2017.

1103
01:13:40,000 --> 01:13:44,000
I think there's papers around...

1104
01:13:44,000 --> 01:13:46,000
Even 2020, the show like...

1105
01:13:46,000 --> 01:13:48,000
In like the Linux networking stack...

1106
01:13:48,000 --> 01:13:50,000
We just hammered the hell out of it...

1107
01:13:50,000 --> 01:13:52,000
Fifty percent of the time it spent men copying in the kernel.

1108
01:13:52,000 --> 01:13:54,000
So DBDK will avoid that.

1109
01:13:54,000 --> 01:13:56,000
So now if you want to reduce them on round trips...

1110
01:13:56,000 --> 01:13:58,000
I have to do...

1111
01:13:58,000 --> 01:14:00,000
You have to use something...

1112
01:14:00,000 --> 01:14:02,000
Like with the UDP thing.

1113
01:14:02,000 --> 01:14:04,000
And you can only do this for...

1114
01:14:04,000 --> 01:14:06,000
In a network communication...

1115
01:14:06,000 --> 01:14:08,000
Like obviously Amazon is not going to know your funky UDP protocol...

1116
01:14:08,000 --> 01:14:10,000
When you start having S3...

1117
01:14:10,000 --> 01:14:12,000
You have to use what they want for that...

1118
01:14:12,000 --> 01:14:16,000
But you can use DBDK to get that data up...

1119
01:14:16,000 --> 01:14:18,000
Quickly as possible...

1120
01:14:18,000 --> 01:14:20,000
On the client side.

1121
01:14:22,000 --> 01:14:24,000
So, as David is...

1122
01:14:24,000 --> 01:14:26,000
He's skeptical...

1123
01:14:26,000 --> 01:14:28,000
He's thinking...

1124
01:14:28,000 --> 01:14:30,000
Three more slides...

1125
01:14:30,000 --> 01:14:32,000
We can revisit this.

1126
01:14:32,000 --> 01:14:34,000
Yes.

1127
01:14:34,000 --> 01:14:36,000
Other questions.

1128
01:14:36,000 --> 01:14:38,000
Alright, so as I said, I like to pay it because they actually have benchmark results...

1129
01:14:38,000 --> 01:14:40,000
Which I think there are other ones that actually do...

1130
01:14:40,000 --> 01:14:42,000
With absolute numbers, not relative numbers.

1131
01:14:42,000 --> 01:14:46,000
And so for this, they're running all TPC-DS scale factor 1...

1132
01:14:46,000 --> 01:14:48,000
So it's not that big...

1133
01:14:48,000 --> 01:14:50,000
But TPC-DS has 100 queries...

1134
01:14:50,000 --> 01:14:52,000
And they show the total runtime of the workload...

1135
01:14:52,000 --> 01:14:54,000
And so you can see...

1136
01:14:54,000 --> 01:14:56,000
In the Paragons, Yellowbricks, Snowflick, Redshift,

1137
01:14:56,000 --> 01:14:58,000
BigQuery, Synapse, and Databricks...

1138
01:14:58,000 --> 01:15:02,000
Again, Redshift will cover on Wednesday...

1139
01:15:02,000 --> 01:15:06,000
Synapse is from Microsoft and Azure...

1140
01:15:06,000 --> 01:15:08,000
We were supposed to cover that...

1141
01:15:08,000 --> 01:15:10,000
And then...

1142
01:15:10,000 --> 01:15:12,000
Whatever...

1143
01:15:12,000 --> 01:15:14,000
Diaria...

1144
01:15:14,000 --> 01:15:16,000
Anyway...

1145
01:15:16,000 --> 01:15:18,000
So off the bat, you see that again...

1146
01:15:18,000 --> 01:15:20,000
For this workload, they're the fastest...

1147
01:15:20,000 --> 01:15:22,000
But again...

1148
01:15:22,000 --> 01:15:26,000
All these systems abstract away what the hardware actually is...

1149
01:15:26,000 --> 01:15:28,000
You say, I want 10...

1150
01:15:28,000 --> 01:15:30,000
You know, my data warehouse has 10 units...

1151
01:15:30,000 --> 01:15:32,000
What does that mean?

1152
01:15:32,000 --> 01:15:34,000
What is the disk?

1153
01:15:34,000 --> 01:15:36,000
What is the CPU? What is the memory?

1154
01:15:36,000 --> 01:15:38,000
So all that subtraction away...

1155
01:15:38,000 --> 01:15:40,000
So you can say, what's the cost to actually run this per hour...

1156
01:15:40,000 --> 01:15:42,000
For these queries...

1157
01:15:42,000 --> 01:15:44,000
And then you divide that time...

1158
01:15:44,000 --> 01:15:46,000
It takes them on the workload by the cost per hour...

1159
01:15:46,000 --> 01:15:48,000
And you can get what...

1160
01:15:48,000 --> 01:15:50,000
What is actually the cost of actually running this thing?

1161
01:15:50,000 --> 01:15:54,000
The memory of the network is significantly cheaper than the others...

1162
01:15:54,000 --> 01:15:56,000
And yeah, we're talking like $2...

1163
01:15:56,000 --> 01:16:00,000
But like, this is like for a workload that took 900 seconds...

1164
01:16:00,000 --> 01:16:02,000
Think of like in a real enterprise system...

1165
01:16:02,000 --> 01:16:04,000
These queries are running all the time...

1166
01:16:04,000 --> 01:16:06,000
Your thing is running all the time...

1167
01:16:06,000 --> 01:16:10,000
And you know, this was certainly start to add up...

1168
01:16:10,000 --> 01:16:12,000
And like I said, SkeelFactor 1 is not that big of a wearer...

1169
01:16:12,000 --> 01:16:14,000
Big of a size we do...

1170
01:16:14,000 --> 01:16:16,000
Alright, so do we trust these numbers...

1171
01:16:16,000 --> 01:16:18,000
As much as we like looking at them...

1172
01:16:18,000 --> 01:16:22,000
No, maybe...

1173
01:16:22,000 --> 01:16:24,000
Maybe? Why maybe?

1174
01:16:24,000 --> 01:16:26,000
What's TPCD?

1175
01:16:26,000 --> 01:16:28,000
Is it TPCDS?

1176
01:16:28,000 --> 01:16:30,000
I know, well, what would it look like?

1177
01:16:30,000 --> 01:16:32,000
Oh, with TPCH numbers?

1178
01:16:32,000 --> 01:16:34,000
Similar? That's not the thing he is that maybe...

1179
01:16:34,000 --> 01:16:36,000
TPCDS is more complicated.

1180
01:16:36,000 --> 01:16:38,000
Exactly, right? So...

1181
01:16:38,000 --> 01:16:40,000
It's simpler...

1182
01:16:40,000 --> 01:16:46,000
Yeah, so I was thinking maybe they chose the TPCDS strategically to really display...

1183
01:16:46,000 --> 01:16:48,000
What there is can be better...

1184
01:16:48,000 --> 01:16:50,000
But when it comes to maybe like...

1185
01:16:50,000 --> 01:16:54,000
Every day and a load of queries that are probably simpler than TPCDS...

1186
01:16:54,000 --> 01:16:58,000
Perhaps it's across the internet.

1187
01:16:58,000 --> 01:17:00,000
Okay.

1188
01:17:02,000 --> 01:17:04,000
Yes.

1189
01:17:04,000 --> 01:17:06,000
Maybe they didn't account for uploading the data.

1190
01:17:06,000 --> 01:17:08,000
I said maybe they didn't account for loading the data...

1191
01:17:08,000 --> 01:17:10,000
Look, we saw with Snowflake.

1192
01:17:10,000 --> 01:17:12,000
That one I'm less worried about...

1193
01:17:12,000 --> 01:17:14,000
I don't think they would be that...

1194
01:17:14,000 --> 01:17:16,000
About...

1195
01:17:16,000 --> 01:17:18,000
What did I mean by?

1196
01:17:18,000 --> 01:17:22,000
I don't think they would be that naive.

1197
01:17:22,000 --> 01:17:26,000
So, like...

1198
01:17:26,000 --> 01:17:30,000
Yeah, this is TPCDS for a different workload...

1199
01:17:30,000 --> 01:17:32,000
But we just said they're a query optimizer...

1200
01:17:32,000 --> 01:17:34,000
You know, they inject rules...

1201
01:17:34,000 --> 01:17:36,000
And make sure they generate the right query plan, right?

1202
01:17:36,000 --> 01:17:38,000
Okay, I'm not saying they play tricks...

1203
01:17:38,000 --> 01:17:40,000
But like...

1204
01:17:40,000 --> 01:17:42,000
You don't know what the query plan looks like...

1205
01:17:42,000 --> 01:17:44,000
Maybe for whatever reason...

1206
01:17:44,000 --> 01:17:46,000
Redshift or Synapse...

1207
01:17:46,000 --> 01:17:48,000
Just picked a crappy query plan, right?

1208
01:17:48,000 --> 01:17:50,000
Or in this case here...

1209
01:17:50,000 --> 01:17:52,000
Synapse is $6 an hour...

1210
01:17:52,000 --> 01:17:54,000
Maybe this is...

1211
01:17:54,000 --> 01:17:56,000
You know, it's just running on fewer machines...

1212
01:17:56,000 --> 01:17:58,000
Because maybe the next one...

1213
01:17:58,000 --> 01:18:00,000
Up won't $12 an hour...

1214
01:18:00,000 --> 01:18:02,000
But maybe that will cut the time down to what Ellibor can do.

1215
01:18:02,000 --> 01:18:04,000
So, the main takeaway from all of this is that...

1216
01:18:04,000 --> 01:18:06,000
There's so many different factors in databases...

1217
01:18:06,000 --> 01:18:08,000
That it's really hard to be able to say like...

1218
01:18:08,000 --> 01:18:10,000
You know, from one workload...

1219
01:18:10,000 --> 01:18:12,000
And the thing that I made fun of before...

1220
01:18:12,000 --> 01:18:14,000
That solves this problem...

1221
01:18:14,000 --> 01:18:16,000
Because that can guarantee you...

1222
01:18:16,000 --> 01:18:18,000
Have a...

1223
01:18:18,000 --> 01:18:20,000
A level playing field...

1224
01:18:20,000 --> 01:18:22,000
But that accounts for just like...

1225
01:18:22,000 --> 01:18:24,000
Are you running the process correctly...

1226
01:18:24,000 --> 01:18:26,000
It doesn't explain why things are actually better than another...

1227
01:18:26,000 --> 01:18:28,000
Right? Because again, yellow brick is going to do...

1228
01:18:28,000 --> 01:18:30,000
High-cue style,

1229
01:18:30,000 --> 01:18:32,000
Seaple-Slow compilation of query plans...

1230
01:18:32,000 --> 01:18:34,000
Well, guess what? Redshift does the same thing...

1231
01:18:34,000 --> 01:18:36,000
Right?

1232
01:18:36,000 --> 01:18:38,000
Snowflake and BigQuery...

1233
01:18:38,000 --> 01:18:40,000
And you're running Spark SQL...

1234
01:18:40,000 --> 01:18:42,000
Or how do you know that this was running photon...

1235
01:18:42,000 --> 01:18:44,000
And not...

1236
01:18:44,000 --> 01:18:46,000
Not regular Spark SQL.

1237
01:18:46,000 --> 01:18:48,000
So, again, it's nice to look at it...

1238
01:18:48,000 --> 01:18:50,000
It doesn't necessarily tell the whole story...

1239
01:18:50,000 --> 01:18:52,000
And obviously, the end of the day...

1240
01:18:52,000 --> 01:18:54,000
You really only care about not TPCDS numbers...

1241
01:18:54,000 --> 01:18:56,000
Like what your workload actually can do.

1242
01:18:56,000 --> 01:19:00,000
And so, what leads me to my...

1243
01:19:00,000 --> 01:19:02,000
Finishing comment...

1244
01:19:02,000 --> 01:19:04,000
Like, the...

1245
01:19:04,000 --> 01:19:06,000
It's very impressive what they did...

1246
01:19:06,000 --> 01:19:07,000
Right? And insane.

1247
01:19:07,000 --> 01:19:09,000
And so, you know, it's a system that does all these optimizations...

1248
01:19:09,000 --> 01:19:11,000
That the way they have.

1249
01:19:11,000 --> 01:19:13,000
And if you were like a brand new startup today...

1250
01:19:13,000 --> 01:19:15,000
And say, hey, I'm going to build a brand new system...

1251
01:19:15,000 --> 01:19:17,000
And you would...

1252
01:19:17,000 --> 01:19:19,000
You know, I would not go the path that they went down...

1253
01:19:19,000 --> 01:19:21,000
To like...

1254
01:19:21,000 --> 01:19:23,000
You know, implement all this low-level hardware stuff that they did.

1255
01:19:23,000 --> 01:19:25,000
But again, it's fascinating.

1256
01:19:25,000 --> 01:19:27,000
Some things you wouldn't do anymore...

1257
01:19:27,000 --> 01:19:29,000
I don't think you would want to use DBDK...

1258
01:19:29,000 --> 01:19:31,000
I think you'd want to use BPF...

1259
01:19:31,000 --> 01:19:33,000
And that could give you most of the same benefit...

1260
01:19:33,000 --> 01:19:35,000
Either you ring my help in other situations as well...

1261
01:19:35,000 --> 01:19:37,000
And I don't think when the gatekeepers talked to us...

1262
01:19:37,000 --> 01:19:39,000
They were doing that.

1263
01:19:39,000 --> 01:19:41,000
But the key thing that matters...

1264
01:19:41,000 --> 01:19:43,000
And related to the last slide is...

1265
01:19:43,000 --> 01:19:45,000
All of this...

1266
01:19:45,000 --> 01:19:47,000
All these optimizations...

1267
01:19:47,000 --> 01:19:49,000
These OS-level stuff they're doing...

1268
01:19:49,000 --> 01:19:51,000
Does not matter if you pick crappy quarter plants.

1269
01:19:51,000 --> 01:19:53,000
If your join orders are just wrong...

1270
01:19:53,000 --> 01:19:55,000
Then who cares that you're doing kernel bypass...

1271
01:19:55,000 --> 01:19:57,000
With custom PCIe drivers.

1272
01:19:57,000 --> 01:19:59,000
Because your join...

1273
01:19:59,000 --> 01:20:01,000
Your query plant...

1274
01:20:01,000 --> 01:20:03,000
Is going to be absolutely terrible.

1275
01:20:03,000 --> 01:20:05,000
Okay?

1276
01:20:05,000 --> 01:20:07,000
Alright, so next class is the last lecture...

1277
01:20:07,000 --> 01:20:09,000
We'll do Amazon Redshift...

1278
01:20:09,000 --> 01:20:13,000
And then, like I said, I'll give out the final exam...

1279
01:20:13,000 --> 01:20:15,000
For you guys to take home...

1280
01:20:15,000 --> 01:20:17,000
And that'll be due next week...

1281
01:20:17,000 --> 01:20:19,000
And then I have office hours today...

1282
01:20:19,000 --> 01:20:21,000
But not on Wednesday...

1283
01:20:21,000 --> 01:20:23,000
Because I got a flight for Seattle for legal stuff.

1284
01:20:23,000 --> 01:20:25,000
Okay? Yeah, I can't talk about it.

1285
01:20:25,000 --> 01:20:29,000
You know, I'm glad you had a belt to get the 40M bar.

1286
01:20:29,000 --> 01:20:31,000
Get a grip, take a sip, and you'll be picking up bottles.

1287
01:20:31,000 --> 01:20:33,000
Ain't ain't no puzzle, I'll go through some more man.

1288
01:20:33,000 --> 01:20:35,000
I'm telling the 40M I saw these glass floor cans.

1289
01:20:35,000 --> 01:20:37,000
Slaps and sticks, and packs on a table.

1290
01:20:37,000 --> 01:20:39,000
And I'm able to see St. I was on a label.

1291
01:20:39,000 --> 01:20:41,000
No sure, put the fuck you know what got them.

1292
01:20:41,000 --> 01:20:43,000
I take off the cap, my first attack on the bottle.

1293
01:20:43,000 --> 01:20:45,000
Throw my green and freezer, throw my utility.

1294
01:20:45,000 --> 01:20:47,000
Careful with the bottle, baby, you can still spill it.

1295
01:20:47,000 --> 01:20:49,000
Cause St. I was insane, the paint last wet.

1296
01:20:49,000 --> 01:20:51,000
You drink it down with the guys, little bottle head.

1297
01:20:51,000 --> 01:20:53,000
Take back the pack of drugs.

1298
01:20:53,000 --> 01:20:55,000
You gon' get your suicide now, so drink it till it floods.

1299
01:20:55,000 --> 01:20:57,000
Billy Dan's the utility teacher, tell me good week guys.

1300
01:20:57,000 --> 01:20:59,000
Be a man and get a can of faith, huh?

