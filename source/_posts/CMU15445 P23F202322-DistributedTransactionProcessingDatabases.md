---
title: CMU15445 P23F202322 DistributedTransactionProcessingDatabases
---

1
00:00:00,000 --> 00:00:27,960
DGGPL is not here.

2
00:00:28,460 --> 00:00:52,520
The veteran'

3
00:00:52,520 --> 00:00:54,780
is

4
00:00:54,780 --> 00:00:57,679
single store talk about their distributed database system.

5
00:00:57,679 --> 00:00:59,579
And again, it'll cover a lot of the co-ideas.

6
00:00:59,579 --> 00:01:02,300
We've been talking about this entire semester.

7
00:01:02,300 --> 00:01:03,780
And then you realize, oh, Andy's not crazy.

8
00:01:03,780 --> 00:01:05,780
And this may be up like this is what

9
00:01:05,780 --> 00:01:08,579
healthy will really build systems.

10
00:01:08,579 --> 00:01:10,299
And then as I post it on Piotr yesterday,

11
00:01:10,299 --> 00:01:11,140
please go vote.

12
00:01:11,140 --> 00:01:12,980
We'll do a speed run in the last day of class.

13
00:01:12,980 --> 00:01:16,219
We'll start off with the final review for the final exam.

14
00:01:16,219 --> 00:01:18,780
And then we'll just plow through as many systems as you guys

15
00:01:18,780 --> 00:01:20,780
want to learn about.

16
00:01:20,780 --> 00:01:22,700
And again, instead of having a giant drop down

17
00:01:22,700 --> 00:01:24,379
of 900 different databases, because nobody

18
00:01:24,379 --> 00:01:27,140
would click that, just copying paste URLs in.

19
00:01:27,140 --> 00:01:30,699
And that way, I can sort by uniqueness, right?

20
00:01:30,699 --> 00:01:33,780
Just do a group by it, right?

21
00:01:33,780 --> 00:01:34,859
Again, there's a person, Piotr, that

22
00:01:34,859 --> 00:01:35,899
takes you to the Google form.

23
00:01:35,899 --> 00:01:37,259
And then vote as many times as you want.

24
00:01:37,259 --> 00:01:38,420
I don't care.

25
00:01:38,420 --> 00:01:44,899
The number one vote as this morning was redis.

26
00:01:44,899 --> 00:01:45,979
The interesting system.

27
00:01:45,979 --> 00:01:48,060
All right, final exam will be Tuesday, December 12.

28
00:01:48,060 --> 00:01:49,699
Somewhere will announce it.

29
00:01:49,699 --> 00:01:51,579
It'll be 8.30 in the morning, because it's early.

30
00:01:51,579 --> 00:01:52,379
And that sucks.

31
00:01:52,379 --> 00:01:55,859
We'll do coffee donuts and cigarettes for everyone in the morning.

32
00:01:55,859 --> 00:01:59,299
And then Jake Nash is teaching this class by himself in the fall.

33
00:01:59,299 --> 00:02:01,699
So if you want more databases, I'm

34
00:02:01,699 --> 00:02:03,579
going to go even deeper into bus tub.

35
00:02:03,579 --> 00:02:05,219
Please sign up for the VTA.

36
00:02:05,219 --> 00:02:05,719
OK?

37
00:02:05,719 --> 00:02:08,099
And we'll post on Piotr to how to make that happen.

38
00:02:08,099 --> 00:02:10,060
All right?

39
00:02:10,060 --> 00:02:11,300
There's a lot here, any questions?

40
00:02:11,300 --> 00:02:12,300
Run this dump and answer, master.

41
00:02:15,659 --> 00:02:16,419
OK.

42
00:02:16,419 --> 00:02:18,340
Let's go through it.

43
00:02:18,340 --> 00:02:20,900
So last class, we started off talking about distributed database

44
00:02:20,900 --> 00:02:21,419
systems.

45
00:02:21,739 --> 00:02:24,179
It was a high level introduction to the key concepts

46
00:02:24,179 --> 00:02:26,819
about how people think about and reason

47
00:02:26,819 --> 00:02:29,139
and design these database systems.

48
00:02:29,139 --> 00:02:30,979
And again, unfortunately, there's no distributed

49
00:02:30,979 --> 00:02:34,099
database system course at Carnegie Mellon.

50
00:02:34,099 --> 00:02:35,819
Eventually, maybe we'll teach you, but right now it's just

51
00:02:35,819 --> 00:02:36,859
just to connect myself.

52
00:02:36,859 --> 00:02:37,539
So we can't do that.

53
00:02:37,539 --> 00:02:40,500
So this last lecture and this week's lecture,

54
00:02:40,500 --> 00:02:42,500
it's really much all you'll be able to get

55
00:02:42,500 --> 00:02:46,459
out of distributed databases in low-level detail

56
00:02:46,459 --> 00:02:49,219
at Carnegie Mellon.

57
00:02:49,219 --> 00:02:52,780
But again, the ideas just sort of give you a lit

58
00:02:52,780 --> 00:02:56,060
of different concepts and ideas and techniques.

59
00:02:56,060 --> 00:02:57,939
And then that way when you go out in the real world,

60
00:02:57,939 --> 00:02:59,340
you'll see these ideas come up.

61
00:02:59,340 --> 00:03:01,020
And then you can reason about what

62
00:03:01,020 --> 00:03:02,659
help people describe their systems.

63
00:03:02,659 --> 00:03:04,259
So we started off talking about the different system

64
00:03:04,259 --> 00:03:04,819
architectures.

65
00:03:04,819 --> 00:03:07,219
We said shared everything is basically what bus tub is.

66
00:03:07,219 --> 00:03:10,060
It's a single node system where everyone can communicate.

67
00:03:10,060 --> 00:03:12,699
The processes are workers can communicate very quickly.

68
00:03:12,699 --> 00:03:14,139
And then shared disk and shared nothing

69
00:03:14,139 --> 00:03:18,020
are the two major distributed database architectures

70
00:03:18,020 --> 00:03:18,939
where shared disk was.

71
00:03:18,939 --> 00:03:24,099
There's a single repository or a single storage device

72
00:03:24,099 --> 00:03:27,699
that all the worker nodes can read and write to.

73
00:03:27,699 --> 00:03:29,579
And then shared nothing is where each worker node,

74
00:03:29,579 --> 00:03:32,900
each node, and the system has some portion of the database.

75
00:03:32,900 --> 00:03:34,539
And you have the same messages and pass

76
00:03:34,539 --> 00:03:36,379
data between the nodes directly.

77
00:03:36,379 --> 00:03:38,539
Then we talked about how to do partitioning or sharding,

78
00:03:38,539 --> 00:03:40,219
simple range partitioning, hash partitioning,

79
00:03:40,219 --> 00:03:43,259
again splitting the database up into disjointed subsets,

80
00:03:43,259 --> 00:03:46,900
and distributing them across different nodes.

81
00:03:46,900 --> 00:03:48,460
And then we talked about how to do transaction

82
00:03:48,460 --> 00:03:49,900
condition at a high level.

83
00:03:49,900 --> 00:03:52,659
Is there a centralized coordinator that's in charge

84
00:03:52,659 --> 00:03:55,340
of taking all the queries, figuring out what locks or what

85
00:03:55,340 --> 00:03:57,500
data they're going to touch, and communicating

86
00:03:57,500 --> 00:03:59,980
to the different nodes, or is it decentralized,

87
00:03:59,980 --> 00:04:03,300
meaning the nodes are free to decide on their own

88
00:04:03,300 --> 00:04:07,420
how they're going to commit and order transactions.

89
00:04:07,420 --> 00:04:10,540
So today's class, we're going to focus on transaction

90
00:04:10,540 --> 00:04:11,700
processing.

91
00:04:11,700 --> 00:04:15,460
When's this class will be about analytical processing

92
00:04:15,460 --> 00:04:17,740
or decision support systems?

93
00:04:17,740 --> 00:04:19,420
And again, we've talked about this many times.

94
00:04:19,420 --> 00:04:21,019
I just want to bring up the distinction between the two

95
00:04:21,019 --> 00:04:26,139
workloads today, again, because then that'll help us understand

96
00:04:26,139 --> 00:04:28,500
what are the different design trade-offs or things

97
00:04:28,500 --> 00:04:31,699
we're going to care about in one sort of category of a system

98
00:04:31,699 --> 00:04:33,460
versus another.

99
00:04:33,460 --> 00:04:36,740
Think of something like Postgres is meant to be

100
00:04:36,740 --> 00:04:38,660
like a general purpose database system.

101
00:04:38,660 --> 00:04:41,540
It is a row store, and it can use transactions.

102
00:04:41,540 --> 00:04:44,620
Primarily people use it for OTP, but there are some aspects

103
00:04:44,620 --> 00:04:48,340
of that you would see in OLAP system.

104
00:04:48,340 --> 00:04:50,379
But there are certain things that Postgres does that you

105
00:04:50,379 --> 00:04:52,139
wouldn't want to use in a snowflake system,

106
00:04:52,139 --> 00:04:55,180
because they're not worried about running transactions.

107
00:04:55,180 --> 00:04:57,819
So the two rough categories can be sort of broken

108
00:04:57,819 --> 00:05:00,899
between these characteristics.

109
00:05:00,899 --> 00:05:03,060
So for OTP workloads, these transactions

110
00:05:03,060 --> 00:05:05,259
are going to be short-lived, and there

111
00:05:05,259 --> 00:05:07,699
going to be a combination of read-write queries.

112
00:05:07,699 --> 00:05:11,620
Short-lived means less than 100 milliseconds,

113
00:05:11,620 --> 00:05:12,620
even that's a long time.

114
00:05:12,620 --> 00:05:14,300
50 milliseconds is considered the max.

115
00:05:14,540 --> 00:05:16,699
You want to have for a transaction.

116
00:05:16,699 --> 00:05:18,939
Anything along with them, that is considered

117
00:05:18,939 --> 00:05:20,780
a longer run transaction.

118
00:05:20,780 --> 00:05:22,860
And that number comes from, that 50 milliseconds

119
00:05:22,860 --> 00:05:26,900
is like the conventional wisdom in internet advertising.

120
00:05:26,900 --> 00:05:28,460
Like when you go visit a website,

121
00:05:28,460 --> 00:05:29,900
so you don't have an abloc or turned on.

122
00:05:29,900 --> 00:05:31,980
If you don't, please do that.

123
00:05:31,980 --> 00:05:33,900
When you go visit a website, there's an abloc or turned on.

124
00:05:33,900 --> 00:05:34,580
Sorry.

125
00:05:34,580 --> 00:05:37,620
If you go visit a website, the ad-serving company

126
00:05:37,620 --> 00:05:39,939
has an auction that it sends out information

127
00:05:39,939 --> 00:05:43,139
to all the people that want to potentially put out ads

128
00:05:43,139 --> 00:05:44,220
to do a bid on it.

129
00:05:44,220 --> 00:05:45,820
They say, here's the information about this person visiting

130
00:05:45,820 --> 00:05:46,500
website.

131
00:05:46,500 --> 00:05:48,380
And you have to give back a response roughly

132
00:05:48,380 --> 00:05:49,820
in 50 milliseconds.

133
00:05:49,820 --> 00:05:51,980
So roughly, that's where this number comes from.

134
00:05:51,980 --> 00:05:54,300
It might be down to 30 milliseconds nowadays.

135
00:05:54,300 --> 00:05:55,380
If you're doing high-frequency trading,

136
00:05:55,380 --> 00:05:56,940
those guys are freaks, and they want things less

137
00:05:56,940 --> 00:05:58,700
than a millisecond.

138
00:05:58,700 --> 00:06:00,740
But the workload basically still looks the same.

139
00:06:00,740 --> 00:06:03,300
It's a lot of small gets and sets.

140
00:06:03,300 --> 00:06:05,580
And then these operations are going to be very repetitive.

141
00:06:05,580 --> 00:06:07,300
Again, think of going through a website,

142
00:06:07,300 --> 00:06:09,300
you can only do certain many things on a website.

143
00:06:09,300 --> 00:06:10,580
You're not sitting at a raw terminal,

144
00:06:10,580 --> 00:06:11,900
putting in a SQL query.

145
00:06:11,900 --> 00:06:13,340
So you're running application code that's

146
00:06:13,339 --> 00:06:15,459
going to be running the same queries over and over again.

147
00:06:15,459 --> 00:06:16,979
And there's certain oppositions you can do

148
00:06:16,979 --> 00:06:18,459
if you know you're going to be running the same queries over

149
00:06:18,459 --> 00:06:19,659
and over again.

150
00:06:19,659 --> 00:06:22,739
In other lab, we're going to focus this, focus more on this workload

151
00:06:22,739 --> 00:06:24,219
on Wednesday.

152
00:06:24,219 --> 00:06:25,859
But these are your long running queries,

153
00:06:25,859 --> 00:06:28,459
typically read only, doing a lot of joins.

154
00:06:28,459 --> 00:06:32,939
And oftentimes, they'll be one off ad-hot queries.

155
00:06:32,939 --> 00:06:34,579
Because someone sitting in that dashboard,

156
00:06:34,579 --> 00:06:36,500
clicking a bunch of buttons to form a query,

157
00:06:36,500 --> 00:06:38,859
they click go to generate the visualization.

158
00:06:38,859 --> 00:06:41,339
And maybe the first time that the database system has

159
00:06:41,339 --> 00:06:42,500
ever seen that query.

160
00:06:42,500 --> 00:06:44,180
And it may never see it again.

161
00:06:44,180 --> 00:06:46,939
So that limits what sort of optimizations

162
00:06:46,939 --> 00:06:49,500
you can do.

163
00:06:49,500 --> 00:06:53,139
So this is the setup that we sort of care about today.

164
00:06:53,139 --> 00:06:54,740
We have some application server that

165
00:06:54,740 --> 00:06:56,939
wants to run a transaction that's going to touch data

166
00:06:56,939 --> 00:06:58,899
these three partitions.

167
00:06:58,899 --> 00:07:02,300
I'm not saying whether it's shared disk or shared nothing

168
00:07:02,300 --> 00:07:04,379
for our purposes right now, it doesn't matter.

169
00:07:04,379 --> 00:07:07,980
So somehow, we've elected this one first partition here

170
00:07:07,980 --> 00:07:09,379
to be the primary node.

171
00:07:09,379 --> 00:07:12,300
So to begin request where the transaction goes to this node,

172
00:07:12,300 --> 00:07:14,460
and let's say there's a node-centralized coordinator,

173
00:07:14,460 --> 00:07:16,780
and the application is allowed to send queries directly

174
00:07:16,780 --> 00:07:19,900
to the various nodes.

175
00:07:19,900 --> 00:07:21,100
And then when it comes time to commit,

176
00:07:21,100 --> 00:07:22,939
it goes to the primary node, said, hey, can I commit?

177
00:07:22,939 --> 00:07:25,780
And the primary node is responsible for fitting out

178
00:07:25,780 --> 00:07:28,500
amongst the nodes that participate in the transaction,

179
00:07:28,500 --> 00:07:31,259
whether this thing's allowed to commit.

180
00:07:31,259 --> 00:07:34,900
So our focus relates to today is, is this sort of safe commit

181
00:07:34,900 --> 00:07:38,540
step, and how to get everyone to agree that yes, this transaction

182
00:07:38,540 --> 00:07:39,460
is safe to commit.

183
00:07:39,460 --> 00:07:41,900
And then if they all say yes, it's going to commit

184
00:07:41,899 --> 00:07:45,739
that we commit it.

185
00:07:45,739 --> 00:07:50,419
And all the stuff we talked about for two-phase locking,

186
00:07:50,419 --> 00:07:52,739
a multi-virtual control, or OCC, all of that

187
00:07:52,739 --> 00:07:54,819
is still happening here.

188
00:07:54,819 --> 00:07:58,539
That's still the mechanism that's going to use to determine

189
00:07:58,539 --> 00:08:01,179
is this thing allowed to commit on each individual node.

190
00:08:01,179 --> 00:08:03,259
And then there's a high little process above that

191
00:08:03,259 --> 00:08:06,060
that's trying to get everyone to agree that it's now time

192
00:08:06,060 --> 00:08:08,099
to commit this transaction.

193
00:08:08,099 --> 00:08:11,859
So that's the big picture what we're trying to do today.

194
00:08:12,139 --> 00:08:14,699
And so again, even though my last example,

195
00:08:14,699 --> 00:08:16,340
I showed the application going directly

196
00:08:16,340 --> 00:08:18,220
to different partitions, ignored that for now.

197
00:08:18,220 --> 00:08:21,540
But the big picture what we're trying to achieve today

198
00:08:21,540 --> 00:08:24,259
is that, and as you would want in any distributed data

199
00:08:24,259 --> 00:08:27,540
system, is that you would have a multi,

200
00:08:27,540 --> 00:08:29,780
or you wouldn't have a single logical view

201
00:08:29,780 --> 00:08:31,540
against a single database system,

202
00:08:31,540 --> 00:08:33,259
even though underneath the covers, it's comprised

203
00:08:33,259 --> 00:08:37,060
by multiple physical servers or multiple physical resources.

204
00:08:37,060 --> 00:08:39,300
And so we haven't talked about how, again,

205
00:08:39,300 --> 00:08:41,379
we're going to get a transaction, or to her node

206
00:08:41,379 --> 00:08:43,500
to agree that we committed a transaction.

207
00:08:43,500 --> 00:08:45,500
And then if we decide that it is going to commit,

208
00:08:45,500 --> 00:08:47,860
how do we make sure that it does commit?

209
00:08:47,860 --> 00:08:50,220
And if there's a crash, there's a failure

210
00:08:50,220 --> 00:08:52,659
that when this system comes back up,

211
00:08:52,659 --> 00:08:54,620
that if we set, we told the outside world

212
00:08:54,620 --> 00:08:57,820
that a transaction committed, we have to make that guarantee.

213
00:08:58,899 --> 00:09:03,860
That's the de-in-asset, the durability guarantee.

214
00:09:03,860 --> 00:09:06,059
But then if the whole thing is down, come back up,

215
00:09:06,059 --> 00:09:07,259
then that's one thing.

216
00:09:07,259 --> 00:09:10,379
But what happens if one node goes down, which will happen?

217
00:09:11,100 --> 00:09:12,259
How do we do with that?

218
00:09:12,259 --> 00:09:13,500
Well, what happens if we send a message

219
00:09:13,500 --> 00:09:16,620
of committed transaction, and then the message

220
00:09:16,620 --> 00:09:18,379
can disappear somehow?

221
00:09:18,379 --> 00:09:20,820
Because someone tripped over the cable,

222
00:09:20,820 --> 00:09:23,779
there's a weird hiccup in the network or something.

223
00:09:23,779 --> 00:09:25,939
And then now our message to commit this transaction

224
00:09:25,939 --> 00:09:27,299
shows up late.

225
00:09:27,299 --> 00:09:28,139
What do we do?

226
00:09:28,139 --> 00:09:30,259
What does the node do in that setting?

227
00:09:31,220 --> 00:09:32,779
And then what happens if every node,

228
00:09:34,139 --> 00:09:35,419
sorry, what happens if the system,

229
00:09:35,419 --> 00:09:38,620
we don't want to wait for everyone to read a commit,

230
00:09:38,620 --> 00:09:40,179
but we still want to commit in some cases,

231
00:09:40,179 --> 00:09:41,819
or we don't want to block everything in case

232
00:09:41,819 --> 00:09:42,939
a one node goes down.

233
00:09:46,459 --> 00:09:48,859
So one very, very important assumption

234
00:09:48,859 --> 00:09:50,779
that we're going to make in today's discussion

235
00:09:51,899 --> 00:09:54,099
is that we're going to assume that all the nodes

236
00:09:54,099 --> 00:09:55,739
in our distributed database system

237
00:09:55,739 --> 00:09:57,539
are going to be well behaved

238
00:09:57,539 --> 00:09:59,899
and under the same administrative domain.

239
00:09:59,899 --> 00:10:01,299
And what I mean by that is,

240
00:10:01,299 --> 00:10:03,659
these are nodes that if you're the database system operator,

241
00:10:03,659 --> 00:10:06,500
these are nodes you control, you own, or you're renting,

242
00:10:06,500 --> 00:10:08,979
or whatever, and it's running software

243
00:10:08,980 --> 00:10:12,899
that it's expected to run as part of the database server.

244
00:10:15,019 --> 00:10:20,019
So that does mean that we're not in this weird untrusted world

245
00:10:21,420 --> 00:10:24,180
where there's some nodes in our distributed database

246
00:10:24,180 --> 00:10:25,860
that we don't control and we're renting,

247
00:10:25,860 --> 00:10:28,980
or like that people are running altruistically or something,

248
00:10:28,980 --> 00:10:31,580
and it's not going to be the case

249
00:10:31,580 --> 00:10:32,700
that we go commit a transaction

250
00:10:32,700 --> 00:10:34,580
and one node's going to be nefarious

251
00:10:34,580 --> 00:10:36,019
and starts trying to screw with us and say,

252
00:10:36,019 --> 00:10:37,659
no, no, no, no, we're not going to commit that.

253
00:10:37,659 --> 00:10:39,459
Or like if everyone agrees that it commits,

254
00:10:39,459 --> 00:10:42,299
this other node isn't going to come back later on say,

255
00:10:42,299 --> 00:10:44,259
hey, you know, I lied,

256
00:10:44,259 --> 00:10:45,659
I'm reading a commit that transaction

257
00:10:45,659 --> 00:10:48,699
and start trying to change the state of things, right?

258
00:10:49,699 --> 00:10:51,379
So that kind of tolerance,

259
00:10:51,379 --> 00:10:54,899
or that property is called Byzantine fault tolerance,

260
00:10:54,899 --> 00:10:57,219
right, and that's what you get if you get a blockchain,

261
00:10:58,740 --> 00:11:00,779
blockchain basically is just a database,

262
00:11:00,779 --> 00:11:03,500
a distributed ledger, a distributed write-able.

263
00:11:03,500 --> 00:11:06,259
And in that world because something like a Bitcoin

264
00:11:06,259 --> 00:11:08,220
where it's a bunch of people running

265
00:11:08,220 --> 00:11:10,100
these peer-to-bear networks where you don't control,

266
00:11:10,100 --> 00:11:11,980
no, no, no, there's no single authority controlling

267
00:11:11,980 --> 00:11:16,980
all the different nodes, you need a BFT protocol.

268
00:11:17,740 --> 00:11:18,860
We don't care about that shit, right?

269
00:11:18,860 --> 00:11:22,500
That's a bunch of overhead that we don't have to deal with.

270
00:11:22,500 --> 00:11:25,460
And be honest, if you wanted to run transactions at scale,

271
00:11:25,460 --> 00:11:27,379
you wouldn't want to use a blockchain anyway,

272
00:11:27,379 --> 00:11:30,500
because they measure their latencies in like seconds,

273
00:11:31,539 --> 00:11:33,700
right, if you go to a website and make an order on Amazon

274
00:11:33,700 --> 00:11:36,500
and takes like 20 seconds to commit that transaction,

275
00:11:36,500 --> 00:11:38,980
you're gonna give up, right?

276
00:11:38,980 --> 00:11:42,300
So nobody runs a real database system

277
00:11:42,300 --> 00:11:44,379
doing transactions on a blockchain.

278
00:11:44,379 --> 00:11:46,980
This is stupid, the real one doesn't work this way,

279
00:11:46,980 --> 00:11:48,900
we can ignore that entirely, okay?

280
00:11:50,100 --> 00:11:52,220
So now, another mean of node won't crash,

281
00:11:52,220 --> 00:11:53,980
disappear, come back and try to say,

282
00:11:53,980 --> 00:11:55,860
hey guys, I missed, what's going on?

283
00:11:55,860 --> 00:11:58,300
I missed, I missed all the updates.

284
00:11:58,300 --> 00:11:59,860
And then you gotta go ahead and update.

285
00:11:59,860 --> 00:12:03,100
But again, that's just a, that's a hardware failure,

286
00:12:03,100 --> 00:12:05,980
and we will have mechanisms to deal with that.

287
00:12:05,980 --> 00:12:07,620
And we're still not worried about whether,

288
00:12:07,620 --> 00:12:10,500
the node is nefarious or not, okay?

289
00:12:10,500 --> 00:12:12,460
So it makes our lives a lot easier,

290
00:12:12,460 --> 00:12:14,820
if we don't worry about visiting fault tolerance.

291
00:12:16,860 --> 00:12:20,899
All right, so today's lecture is really me,

292
00:12:20,899 --> 00:12:22,460
again, attempting to try to cadence

293
00:12:22,460 --> 00:12:24,820
a year's worth of material and distributed databases

294
00:12:24,820 --> 00:12:26,740
into like one or two lectures.

295
00:12:26,740 --> 00:12:28,779
So we can't cover everything into detail,

296
00:12:28,779 --> 00:12:29,740
where to go through like these

297
00:12:29,740 --> 00:12:33,019
the most important things that you need to be aware of that exists.

298
00:12:33,179 --> 00:12:34,699
And the challenge you have faced when you have

299
00:12:34,699 --> 00:12:36,419
a distributed database system.

300
00:12:36,419 --> 00:12:39,179
So we're gonna first talk about how,

301
00:12:39,179 --> 00:12:41,860
what replication looks like in this environment.

302
00:12:41,860 --> 00:12:44,100
So for most people, like, you know,

303
00:12:44,100 --> 00:12:46,100
when they say, oh, my database can't scale,

304
00:12:46,100 --> 00:12:48,539
the very first step you actually should do is replication.

305
00:12:48,539 --> 00:12:49,500
You should probably be doing this anyway

306
00:12:49,500 --> 00:12:52,100
for a high availability and durability.

307
00:12:52,100 --> 00:12:56,059
But you can actually offload some reads to replicas

308
00:12:56,059 --> 00:12:57,819
to, depending on your workload,

309
00:12:57,819 --> 00:12:58,980
to alleviate some of the load

310
00:12:58,980 --> 00:13:00,419
and start scaling things out.

311
00:13:00,419 --> 00:13:02,419
So even though most people don't need

312
00:13:02,620 --> 00:13:05,139
some massive distributed database system like a spanner,

313
00:13:06,620 --> 00:13:08,699
you're gonna need replication, almost always,

314
00:13:08,699 --> 00:13:10,339
right, if you care about your data.

315
00:13:10,339 --> 00:13:12,019
Then we'll talk about time of commit protocols,

316
00:13:12,019 --> 00:13:13,339
two-page commit, Paxos, RAP,

317
00:13:13,339 --> 00:13:14,979
to how to actually get everyone to agree.

318
00:13:14,979 --> 00:13:17,139
And again, I realized there's a distributed systems course

319
00:13:17,139 --> 00:13:18,860
at CMU that does a better job

320
00:13:18,860 --> 00:13:20,620
and spends more time talking about these things.

321
00:13:20,620 --> 00:13:23,500
But we just wanna describe it in the context of databases.

322
00:13:23,500 --> 00:13:25,099
And then we'll talk about consistency issues

323
00:13:25,099 --> 00:13:27,980
in the context of the cat theorem or Pacellic,

324
00:13:27,980 --> 00:13:29,379
which the fall up to it.

325
00:13:29,379 --> 00:13:31,059
Again, in the context of databases.

326
00:13:31,059 --> 00:13:31,899
And then if you have time,

327
00:13:32,179 --> 00:13:34,019
you can finish up just talking about spanner real quickly,

328
00:13:34,019 --> 00:13:36,659
just because it encapsulates a lot of the ideas

329
00:13:36,659 --> 00:13:38,100
we'll talk about today.

330
00:13:38,100 --> 00:13:41,059
And I consider this a state of the art system.

331
00:13:41,059 --> 00:13:44,179
Even though Google put it out over 10 years ago,

332
00:13:44,179 --> 00:13:46,459
it does a lot of really interesting things.

333
00:13:46,459 --> 00:13:48,579
And then you do this one thing that nobody else does,

334
00:13:48,579 --> 00:13:51,539
which is you can do if you're Google and have Google money.

335
00:13:52,579 --> 00:13:53,419
Let me take a guess what that is.

336
00:13:53,419 --> 00:13:54,259
You know what that is?

337
00:13:54,259 --> 00:13:56,179
If you're from the rich spanner,

338
00:13:56,179 --> 00:13:57,019
what's one?

339
00:13:57,019 --> 00:13:59,899
Time of clocks, yes, we'll get there in a second.

340
00:13:59,899 --> 00:14:02,779
So spoiler, Google basically puts satellite hookups,

341
00:14:02,779 --> 00:14:05,459
gets the time from satellites, from GPS satellites,

342
00:14:05,459 --> 00:14:07,459
and has a time of clocks in every data center.

343
00:14:07,459 --> 00:14:12,459
And that doesn't make things magically always in sync,

344
00:14:12,459 --> 00:14:13,459
but it reduces the bounds.

345
00:14:13,459 --> 00:14:15,459
You have to, how much time you have to spend waiting

346
00:14:15,459 --> 00:14:17,740
for new transactions to show up.

347
00:14:17,740 --> 00:14:19,819
Again, we'll get there in a second.

348
00:14:19,819 --> 00:14:20,899
But there's still gonna new packs of us.

349
00:14:20,899 --> 00:14:22,059
There's still gonna new phase commit.

350
00:14:22,059 --> 00:14:25,419
There's still gonna do MVC, all these other stuff.

351
00:14:25,419 --> 00:14:29,860
Okay, so with replication, the idea is that we wanna replicate

352
00:14:29,899 --> 00:14:32,580
the database, either a portion of it or all of it,

353
00:14:32,580 --> 00:14:34,779
across multiple nodes.

354
00:14:34,779 --> 00:14:36,539
And we wanna do this to increase availability

355
00:14:36,539 --> 00:14:37,940
and in some cases, scalability.

356
00:14:37,940 --> 00:14:40,060
Not always, but in some cases, yes.

357
00:14:40,060 --> 00:14:42,139
And again, we wanna do this whether it's partition or not.

358
00:14:42,139 --> 00:14:44,340
So partition would be, if I split my database up

359
00:14:44,340 --> 00:14:47,740
into disjoint sets, I still wanna have multiple copies

360
00:14:47,740 --> 00:14:49,139
of those disjoint subsets.

361
00:14:49,139 --> 00:14:50,659
So again, if one node goes down,

362
00:14:50,659 --> 00:14:54,659
I can still potentially serve the serve queries.

363
00:14:54,659 --> 00:14:57,580
Or if it's not partition, which is most database systems,

364
00:14:57,580 --> 00:14:59,860
then I wanna be able to use the replicas

365
00:14:59,860 --> 00:15:02,660
for off-loading these read-only queries.

366
00:15:03,780 --> 00:15:05,460
Right, so the idea is again, we wanna make multiple copies

367
00:15:05,460 --> 00:15:07,100
of data so that if any node goes down,

368
00:15:07,100 --> 00:15:09,259
we can still potentially remain online.

369
00:15:10,780 --> 00:15:12,820
So there's much design history at the side,

370
00:15:12,820 --> 00:15:16,139
put in our system, if we wanna add replication.

371
00:15:16,139 --> 00:15:18,540
So what the sort of overall configuration

372
00:15:18,540 --> 00:15:20,780
of the architectures look like,

373
00:15:20,780 --> 00:15:22,580
how we're gonna propagate the updates,

374
00:15:22,580 --> 00:15:24,420
when should we propagate the updates,

375
00:15:24,419 --> 00:15:27,500
and then the method in which we propagate those updates?

376
00:15:30,219 --> 00:15:31,539
So at a high level, basically,

377
00:15:31,539 --> 00:15:33,699
there's two approaches to do replication.

378
00:15:33,699 --> 00:15:36,219
You have what it's called primary replica and multi-primary.

379
00:15:36,219 --> 00:15:38,099
So primary replica is the most common one.

380
00:15:39,899 --> 00:15:42,500
Sometimes you'll see this as later follower.

381
00:15:42,500 --> 00:15:45,299
The order terms use master slave.

382
00:15:45,299 --> 00:15:46,699
We obviously don't say that anymore.

383
00:15:46,699 --> 00:15:49,379
Problem is like a lot of the literature that describes

384
00:15:49,379 --> 00:15:52,980
this configuration is gonna be bit order,

385
00:15:52,980 --> 00:15:54,940
so you have the Google master slave,

386
00:15:54,940 --> 00:15:57,980
but usually the newer stuff will refer to as primary replica.

387
00:15:58,820 --> 00:16:00,980
The idea here is that all updates

388
00:16:00,980 --> 00:16:04,420
are gonna go to a single node, primary node,

389
00:16:04,420 --> 00:16:06,980
in the database, right?

390
00:16:06,980 --> 00:16:09,180
And it's the V, that primary's responsibility

391
00:16:09,180 --> 00:16:12,500
to then propagate those updates to any replicas, right?

392
00:16:12,500 --> 00:16:14,580
And later follower primary replica.

393
00:16:15,539 --> 00:16:17,500
And in some cases, depending on the system,

394
00:16:17,500 --> 00:16:20,460
how they expose this capability,

395
00:16:20,460 --> 00:16:22,740
you'll allow read only transactions

396
00:16:22,740 --> 00:16:26,620
to run queries on those replicas.

397
00:16:26,620 --> 00:16:31,620
And you can do this because if everything's all transactional,

398
00:16:31,620 --> 00:16:35,220
meaning if I do a transactional update on the primary,

399
00:16:35,220 --> 00:16:36,700
then I'd propagate that transactional update

400
00:16:36,700 --> 00:16:40,379
to the replica and that update is atomic,

401
00:16:40,379 --> 00:16:42,860
then any read query will see a consistent view

402
00:16:42,860 --> 00:16:46,460
of the database on the replica.

403
00:16:47,420 --> 00:16:49,259
It may not be the most up to date version,

404
00:16:49,259 --> 00:16:50,740
depending on how we propagate the updates,

405
00:16:50,740 --> 00:16:52,980
but it'll be least consistent.

406
00:16:52,980 --> 00:16:54,500
And of course, you can relax that

407
00:16:54,500 --> 00:16:59,220
and see partial updates if you want, right?

408
00:16:59,220 --> 00:17:01,179
So then what happens is if the,

409
00:17:02,139 --> 00:17:04,259
in the event the primary goes down,

410
00:17:04,259 --> 00:17:06,140
will hold some kind of election process,

411
00:17:06,140 --> 00:17:08,779
which will be Paxos or something,

412
00:17:08,779 --> 00:17:11,859
and one of the replicas become a new primary,

413
00:17:11,859 --> 00:17:14,619
and then now all the rights will go to that,

414
00:17:14,619 --> 00:17:16,980
to that new primary, right?

415
00:17:16,980 --> 00:17:18,740
And at the old primary, it becomes back up,

416
00:17:18,740 --> 00:17:22,700
it'll get relegated to be a replica.

417
00:17:22,700 --> 00:17:25,140
Again, we'll handle that in a second.

418
00:17:25,140 --> 00:17:26,700
All right, so this is the, the top one here

419
00:17:26,700 --> 00:17:28,299
is what most people are gonna do.

420
00:17:29,700 --> 00:17:31,660
The bottom one, the bottom one, multi primary,

421
00:17:31,660 --> 00:17:33,579
sometimes called multi-home,

422
00:17:33,579 --> 00:17:37,460
this is where the, the replica, every object

423
00:17:37,460 --> 00:17:39,819
we replicated in cross-mortal nodes,

424
00:17:39,819 --> 00:17:42,859
and any transaction can update that object,

425
00:17:42,859 --> 00:17:46,460
like a record table, whatever, at any possible node.

426
00:17:46,460 --> 00:17:47,859
And then when you go to commit,

427
00:17:47,859 --> 00:17:50,099
now the replicas need to synchronize amongst each other,

428
00:17:50,099 --> 00:17:52,299
because they're all considered leaders,

429
00:17:52,299 --> 00:17:55,099
or the primary, they need to coordinate

430
00:17:55,099 --> 00:17:56,500
with each other to figure out, okay,

431
00:17:56,500 --> 00:17:58,859
like who's allowed to commit,

432
00:17:58,859 --> 00:17:59,979
who has the most latest version,

433
00:17:59,979 --> 00:18:02,740
and how to reconcile any changes, right?

434
00:18:04,299 --> 00:18:06,659
So those are the two visualizations of this.

435
00:18:06,659 --> 00:18:09,459
So again, primary replica, we have a single primary,

436
00:18:09,459 --> 00:18:10,979
and then the two replicas,

437
00:18:10,979 --> 00:18:13,539
all the read and write queries will go to the primary,

438
00:18:13,539 --> 00:18:16,819
and then the rights will get propagated to the replicas.

439
00:18:16,819 --> 00:18:19,139
And this is typically just sending the right head log,

440
00:18:21,419 --> 00:18:22,700
that we talked about before,

441
00:18:22,700 --> 00:18:23,859
because you're just sending the right head log

442
00:18:23,859 --> 00:18:25,539
of all the changes that come out of the primary,

443
00:18:25,539 --> 00:18:28,259
and the replicas are more or less in recovery mode,

444
00:18:28,259 --> 00:18:29,939
and as if they're reading like this,

445
00:18:29,939 --> 00:18:31,619
this never ending file from disk,

446
00:18:31,619 --> 00:18:33,579
and they're replaying the, the right head log

447
00:18:33,579 --> 00:18:34,619
to apply the changes.

448
00:18:35,859 --> 00:18:38,059
Again, the right head log could be physiological, physical,

449
00:18:38,059 --> 00:18:39,779
like here's the deltas of the,

450
00:18:39,779 --> 00:18:41,700
or the diffs I'm making on single pages,

451
00:18:41,700 --> 00:18:42,899
or it could be the queries.

452
00:18:44,220 --> 00:18:45,700
If you send the queries, things get tricky,

453
00:18:45,700 --> 00:18:47,380
because now there's things in the query,

454
00:18:47,380 --> 00:18:50,220
like timestamps, or random,

455
00:18:50,220 --> 00:18:52,140
that you gotta make sure that the replicas

456
00:18:52,140 --> 00:18:56,779
execute the exact same values for those functions when they run,

457
00:18:56,779 --> 00:19:00,420
and there's tricks to handle that, right?

458
00:19:00,420 --> 00:19:01,700
And as I said, in some systems,

459
00:19:01,700 --> 00:19:05,100
though, I run read only queries on the replicas.

460
00:19:05,100 --> 00:19:07,140
Now, how you actually find these replicas,

461
00:19:07,140 --> 00:19:09,740
that's that coordinator, middleware stuff we talked about before,

462
00:19:09,740 --> 00:19:10,580
right?

463
00:19:10,580 --> 00:19:12,100
You can either explicitly in your application say,

464
00:19:12,100 --> 00:19:14,059
oh, I know, here's the IP address of some replica,

465
00:19:14,059 --> 00:19:15,779
let me go send my query there,

466
00:19:15,779 --> 00:19:17,220
or you send it to a middleware and says,

467
00:19:17,220 --> 00:19:20,740
oh, this is read only, let me send it to the replica, right?

468
00:19:21,740 --> 00:19:24,980
And so, if you can offload all the reads to the replicas,

469
00:19:24,980 --> 00:19:27,019
then this thing's just doing nothing but rights,

470
00:19:27,019 --> 00:19:29,740
which are gonna always typically be slower.

471
00:19:29,740 --> 00:19:31,500
So this allows you a lot of take over head

472
00:19:31,500 --> 00:19:34,019
in the burden of a running read queries,

473
00:19:34,019 --> 00:19:35,299
and put it on the replicas.

474
00:19:36,460 --> 00:19:37,899
Some cases, this is okay.

475
00:19:37,899 --> 00:19:41,019
Again, if you don't really care about having the most up-to-date

476
00:19:41,019 --> 00:19:43,339
view of the database, which will be re-encouraged theme

477
00:19:43,339 --> 00:19:45,740
throughout the entire lecture, then this is fine.

478
00:19:45,740 --> 00:19:47,980
If you need to have exactly, here's the most latest version,

479
00:19:48,939 --> 00:19:50,859
then you have to run the primary.

480
00:19:50,859 --> 00:19:53,500
Because I haven't said yet, how long is this gonna take?

481
00:19:54,500 --> 00:19:55,859
We'll get there in a second.

482
00:19:56,980 --> 00:19:58,819
So in multi-primary, you have, again,

483
00:19:58,819 --> 00:20:02,779
the every node is considered the primary,

484
00:20:02,779 --> 00:20:06,179
and can take reads and writes.

485
00:20:06,179 --> 00:20:09,699
So now what happens if you have two transactions

486
00:20:09,699 --> 00:20:13,259
that do rights, one down here, one down here,

487
00:20:13,259 --> 00:20:15,980
you get to propagate those updates across these guys,

488
00:20:15,980 --> 00:20:19,420
and then decide, coordinate who's allowed to commit,

489
00:20:19,420 --> 00:20:20,460
see the latest version.

490
00:20:23,099 --> 00:20:25,180
So this is less common, because this is hard to do.

491
00:20:27,299 --> 00:20:30,740
And a lot of times, people will start with something like this,

492
00:20:30,740 --> 00:20:32,339
and then if this thing becomes the bottleneck,

493
00:20:32,339 --> 00:20:35,299
the right node, then you gotta switch to something like this.

494
00:20:36,259 --> 00:20:37,940
Actually, it doesn't necessarily have to be a bottleneck,

495
00:20:37,940 --> 00:20:40,819
could just be that the geographical distance

496
00:20:40,819 --> 00:20:44,579
between the primary and the replicas are really far.

497
00:20:45,779 --> 00:20:48,419
So example I was like to use was Facebook.

498
00:20:48,419 --> 00:20:51,819
Like in the old days, 2010ish,

499
00:20:51,819 --> 00:20:53,379
I'd say, yeah, over a decade ago,

500
00:20:54,379 --> 00:20:56,859
Facebook used this model.

501
00:20:56,859 --> 00:20:58,939
So the data center for summer in California,

502
00:20:58,939 --> 00:21:01,259
for the primary, but then all the replicas

503
00:21:01,259 --> 00:21:03,139
are all across the world, right?

504
00:21:03,139 --> 00:21:06,179
So if you were down in Brazil and did update to your timeline,

505
00:21:06,179 --> 00:21:07,859
whatever it's called now, right?

506
00:21:07,859 --> 00:21:09,539
That would again get sent back up,

507
00:21:09,539 --> 00:21:11,379
shipped up to California,

508
00:21:11,379 --> 00:21:12,659
sort of in that data center,

509
00:21:12,659 --> 00:21:15,939
and then eventually we get propagated down to the replicas,

510
00:21:15,939 --> 00:21:18,500
like down in Brazil and whatever other countries, right?

511
00:21:19,500 --> 00:21:21,899
Of course, what's the problem with that?

512
00:21:21,899 --> 00:21:24,299
Okay, you have to go geographical distance

513
00:21:24,299 --> 00:21:26,579
and get propagated back.

514
00:21:26,579 --> 00:21:28,099
And then so if someone like,

515
00:21:28,099 --> 00:21:31,139
post a cat picture on their timeline,

516
00:21:31,139 --> 00:21:34,179
clicks submit, then refreshes the page,

517
00:21:34,179 --> 00:21:36,899
that page refresh is gonna pull the data from the database,

518
00:21:36,900 --> 00:21:39,340
but it's gonna pull from its local replica,

519
00:21:39,340 --> 00:21:40,340
and it's not gonna see the updates.

520
00:21:40,340 --> 00:21:43,060
So people aren't gonna see their own timeline updates.

521
00:21:43,060 --> 00:21:44,460
So Facebook played a little game

522
00:21:44,460 --> 00:21:46,900
by putting something in a cookie in your browser,

523
00:21:46,900 --> 00:21:49,180
so that when you refresh, you saw your own rights

524
00:21:49,180 --> 00:21:52,660
locally, not actually from the database, right?

525
00:21:52,660 --> 00:21:54,220
So they hid that all that from you.

526
00:21:54,220 --> 00:21:56,340
But eventually they had to switch to this model,

527
00:21:56,340 --> 00:21:59,980
because for doing, for things were doing updates,

528
00:21:59,980 --> 00:22:01,860
and you can't put the browser cookie trick in,

529
00:22:02,699 --> 00:22:06,299
you know, they had to, they had to be scale this way.

530
00:22:09,819 --> 00:22:12,099
All right, so next thing you've gotta consider is K safety.

531
00:22:13,139 --> 00:22:15,299
And this is a, I think this is primarily a database term,

532
00:22:15,299 --> 00:22:19,099
but the idea here is that it's the number of failures

533
00:22:19,099 --> 00:22:21,859
that your distributed database has been allowed to have

534
00:22:21,859 --> 00:22:26,179
before it decides that it doesn't wanna proceed any further,

535
00:22:26,179 --> 00:22:28,419
because it may end up losing data

536
00:22:28,419 --> 00:22:31,579
if there's more failures, right?

537
00:22:31,579 --> 00:22:33,139
It's a sort of like, you know, thing that look like a quorum

538
00:22:33,139 --> 00:22:35,059
right, same kind of ideas we talked about before,

539
00:22:35,059 --> 00:22:36,980
but it's basically saying, how many times,

540
00:22:36,980 --> 00:22:39,220
how many nodes can go down for a,

541
00:22:40,419 --> 00:22:43,220
for all the replicas I have of a given object in my database

542
00:22:43,220 --> 00:22:46,859
before I decide that this is enough, right?

543
00:22:46,859 --> 00:22:48,859
And we'll see this in a second when we talk about the cat theorem,

544
00:22:48,859 --> 00:22:51,460
but like in a distributed relational database,

545
00:22:51,460 --> 00:22:55,099
like I'll say traditional, but like in the relational database

546
00:22:55,099 --> 00:22:57,899
world, we typically, we don't like losing data,

547
00:22:57,899 --> 00:23:00,819
we care about acid, and so we don't wanna have

548
00:23:00,819 --> 00:23:04,539
a bunch of nodes go down and say there's like one last copy

549
00:23:04,539 --> 00:23:09,460
of an object, we do a write to it, but then we crash,

550
00:23:09,460 --> 00:23:13,179
and then now that portion of the database is not missing.

551
00:23:14,019 --> 00:23:15,819
So sometimes you would say, I'll,

552
00:23:15,819 --> 00:23:19,659
I need to have at least two copies of every object in my database

553
00:23:19,659 --> 00:23:20,899
for my database to consider online.

554
00:23:20,899 --> 00:23:25,659
And if I go below that threshold, then the system just stops.

555
00:23:25,659 --> 00:23:27,099
It doesn't accept any new requests.

556
00:23:28,099 --> 00:23:31,219
There's self-healing models, there's other tricks like that,

557
00:23:31,219 --> 00:23:33,219
you can say, all right, I've gone along the threshold,

558
00:23:33,219 --> 00:23:36,099
so let me make a copy of this data now before I run any queries,

559
00:23:36,099 --> 00:23:39,980
so that, you know, I can start running more queries after

560
00:23:39,980 --> 00:23:42,219
I make another copy to go above the threshold,

561
00:23:43,219 --> 00:23:45,539
but again, there's different ways to handle that.

562
00:23:47,819 --> 00:23:49,539
All right, so I've already alluded this as well,

563
00:23:49,539 --> 00:23:51,419
the next is the propagation scheme.

564
00:23:51,419 --> 00:23:55,899
So this is how we're gonna decide when and how we will propagate

565
00:23:55,900 --> 00:23:59,140
the changes from a primary to a replica.

566
00:23:59,140 --> 00:24:01,500
And this is whether it's the primary replica model

567
00:24:01,500 --> 00:24:05,180
or the multi-home multi-primary model, right?

568
00:24:05,180 --> 00:24:06,420
And there's basically two approaches,

569
00:24:06,420 --> 00:24:11,580
and there's obviously there's different degrees of propagation

570
00:24:11,580 --> 00:24:13,860
or strength you wanna have between these different,

571
00:24:13,860 --> 00:24:18,860
these two approaches, but we'll just take the two major ones,

572
00:24:18,860 --> 00:24:20,940
the two extremes.

573
00:24:20,940 --> 00:24:22,700
The first is synchronous commits,

574
00:24:22,700 --> 00:24:24,140
or what is called strong consistency

575
00:24:24,140 --> 00:24:25,500
in the distributed data world,

576
00:24:25,500 --> 00:24:27,020
or a distributed systems world.

577
00:24:27,020 --> 00:24:30,860
And yeah, here is that if I do an update to an object

578
00:24:30,860 --> 00:24:33,540
that may have multiple copies of multiple replicas,

579
00:24:33,540 --> 00:24:36,140
then I don't get an acknowledgement back my application

580
00:24:36,140 --> 00:24:38,500
that my change has been committed or saved

581
00:24:38,500 --> 00:24:41,380
into all the replicas have been updated

582
00:24:41,380 --> 00:24:43,380
and agreed to have been updated,

583
00:24:43,380 --> 00:24:46,300
or they agreed that transaction has committed.

584
00:24:46,300 --> 00:24:48,700
Eventually consistency means that if I do it right,

585
00:24:49,980 --> 00:24:52,060
I'd eventually get propagated to the replicas,

586
00:24:52,059 --> 00:24:55,500
but I'll get a response back potentially before they get updated.

587
00:24:57,139 --> 00:24:59,259
So if you have, yes, question.

588
00:25:05,779 --> 00:25:06,619
Right, so this question is,

589
00:25:06,619 --> 00:25:07,579
how do you make sure you're eventually,

590
00:25:07,579 --> 00:25:08,460
you'll be eventually consistent

591
00:25:08,460 --> 00:25:10,619
if there's no guarantee that you're getting a response,

592
00:25:10,619 --> 00:25:12,740
we'll get that earned a second, yes.

593
00:25:12,740 --> 00:25:14,700
The answer is, yeah, right?

594
00:25:14,700 --> 00:25:18,019
Like, you'll get there eventually, but when?

595
00:25:19,659 --> 00:25:20,500
Other questions?

596
00:25:21,460 --> 00:25:22,460
Yes.

597
00:25:22,460 --> 00:25:24,660
So in a multi-fine research,

598
00:25:24,660 --> 00:25:27,220
how do we prevent simultaneous

599
00:25:27,220 --> 00:25:29,059
updates to the model,

600
00:25:29,059 --> 00:25:31,059
how do we make a consistent vehicle?

601
00:25:31,059 --> 00:25:34,180
You allow rights when both the primary and also.

602
00:25:34,180 --> 00:25:35,819
Yeah, go ahead, so question is,

603
00:25:35,819 --> 00:25:38,779
in multi-primer, how do I prevent rights

604
00:25:38,779 --> 00:25:40,740
from occurring on the same object?

605
00:25:40,740 --> 00:25:41,740
Yeah.

606
00:25:41,740 --> 00:25:43,779
To vase locking, OCC, all that.

607
00:25:43,779 --> 00:25:46,740
It distributed across two nodes.

608
00:25:46,740 --> 00:25:49,779
So you basically run two vase locking across multiple nodes.

609
00:25:49,779 --> 00:25:50,859
Right?

610
00:25:50,859 --> 00:25:53,420
Again, it's just the same protocols,

611
00:25:53,420 --> 00:25:54,379
it's just now where distributed,

612
00:25:54,379 --> 00:25:57,099
and now like someone's not the build the weight

613
00:25:57,099 --> 00:25:59,099
to a graph assuming it's two vase locking.

614
00:25:59,099 --> 00:25:59,940
And someone's having to decide,

615
00:25:59,940 --> 00:26:00,940
okay, there's a deadlock,

616
00:26:00,940 --> 00:26:02,339
let me go ahead and kill it.

617
00:26:02,339 --> 00:26:06,019
And that could be either the central-like coordinator

618
00:26:06,019 --> 00:26:07,740
or it could be amongst the nodes,

619
00:26:07,740 --> 00:26:09,139
they say, okay, well, I'm waiting for this

620
00:26:09,139 --> 00:26:11,059
and you have this, but you update it.

621
00:26:11,059 --> 00:26:12,779
And then the two nodes decide,

622
00:26:12,779 --> 00:26:14,579
okay, yeah, there's a deadlock here.

623
00:26:14,579 --> 00:26:16,819
And then there's some other ordering scene to decide,

624
00:26:16,819 --> 00:26:19,740
you know, determine the priority of who gets killed.

625
00:26:20,779 --> 00:26:23,579
So all of this that we talked about before is still here.

626
00:26:23,579 --> 00:26:25,579
So we don't worry about the network traffic

627
00:26:25,579 --> 00:26:27,579
and the network security number.

628
00:26:27,579 --> 00:26:29,099
We don't worry about the network traffic.

629
00:26:29,099 --> 00:26:31,779
So the latency in terms of updating any data

630
00:26:31,779 --> 00:26:35,180
is actually how to keep the counter the lock.

631
00:26:35,180 --> 00:26:39,460
So that would not be the same as the network.

632
00:26:39,460 --> 00:26:41,220
Yeah, so it's what David is, and he's correct,

633
00:26:41,220 --> 00:26:43,139
that like, the internet distributed system,

634
00:26:43,139 --> 00:26:44,139
and we said this before,

635
00:26:44,139 --> 00:26:46,180
but being parallel systems and distributed systems,

636
00:26:46,180 --> 00:26:47,339
and the internet distributed system,

637
00:26:47,339 --> 00:26:49,500
the communication latency is much higher.

638
00:26:49,500 --> 00:26:51,059
The cost is much higher.

639
00:26:51,059 --> 00:26:52,819
We do worry about it, but like we can't,

640
00:26:52,819 --> 00:26:54,940
there's no magic wand to make it go away.

641
00:26:54,940 --> 00:26:57,380
We're kind of limited by the speed of light.

642
00:26:57,380 --> 00:27:02,380
So we will see this in Spanner in a second.

643
00:27:02,980 --> 00:27:06,420
Like the trick they basically do is say,

644
00:27:06,420 --> 00:27:08,779
well, I'll wait to see, I'll wait for a certain mountain

645
00:27:08,779 --> 00:27:11,220
on a bound of time to see whether someone shows up,

646
00:27:11,220 --> 00:27:13,339
they may conflict with my transaction.

647
00:27:13,339 --> 00:27:15,619
And if that, they don't show up in that time,

648
00:27:15,619 --> 00:27:17,660
then I'm allowed to commit, right?

649
00:27:17,660 --> 00:27:21,460
But there's no way to get around that.

650
00:27:21,460 --> 00:27:22,460
Yeah.

651
00:27:23,460 --> 00:27:26,860
Like there's no magic two-phase locking you can do,

652
00:27:26,860 --> 00:27:29,420
because you're going to get the wide-area network.

653
00:27:29,420 --> 00:27:32,500
It's going to be basically the stuff we talked about before.

654
00:27:34,620 --> 00:27:35,900
And the tricks, the games they play is like,

655
00:27:35,900 --> 00:27:38,100
how much hints can you pass along to say,

656
00:27:38,100 --> 00:27:39,100
okay, yeah, by the way,

657
00:27:39,100 --> 00:27:42,180
like I'm going to, instead of saying one message at a time,

658
00:27:42,180 --> 00:27:43,820
here's all the locked-in require.

659
00:27:43,820 --> 00:27:45,380
It's like, here's the locked-in required,

660
00:27:45,380 --> 00:27:47,180
here's the locked-in, I think I'm going to go wire,

661
00:27:47,180 --> 00:27:49,180
and maybe you do more pessimistic things like that.

662
00:27:49,180 --> 00:27:51,180
That's really all you really can do.

663
00:27:54,259 --> 00:27:56,259
Okay.

664
00:27:56,259 --> 00:27:57,259
It's going back.

665
00:28:00,220 --> 00:28:01,460
Right, propagation team.

666
00:28:01,460 --> 00:28:04,900
So, synchronous commit or synchronous propagation.

667
00:28:04,900 --> 00:28:09,740
So the idea here is that when the primary sends a,

668
00:28:10,620 --> 00:28:13,420
when the application sends a commit request to the primary,

669
00:28:13,420 --> 00:28:18,420
the primary, we'll send that request to all its replicas,

670
00:28:19,300 --> 00:28:21,779
and it has to wait until they come back and say,

671
00:28:21,779 --> 00:28:25,380
yes, I've got this change, I've go ahead and committed,

672
00:28:25,380 --> 00:28:26,900
I flushed the changes to the disk,

673
00:28:27,900 --> 00:28:32,060
and then once it gets acknowledgement from all its replicas

674
00:28:32,060 --> 00:28:33,940
that things are durable and safe,

675
00:28:33,940 --> 00:28:35,580
or there's just actions a lot of commit,

676
00:28:36,580 --> 00:28:38,220
then and only then can it propagate

677
00:28:38,220 --> 00:28:41,019
the acknowledgement back to the application.

678
00:28:41,019 --> 00:28:42,300
Right, it's just like before,

679
00:28:42,299 --> 00:28:44,700
when we commit transactions with the right-of-head log,

680
00:28:44,700 --> 00:28:46,579
except now we've got to wait for somebody else

681
00:28:46,579 --> 00:28:49,619
over the network to come back and say they got it too.

682
00:28:49,619 --> 00:28:52,700
Right, a synchronous commit is,

683
00:28:52,700 --> 00:28:54,299
and a highlight was basically,

684
00:28:54,299 --> 00:28:56,299
all right, commit message shows up.

685
00:28:56,299 --> 00:28:59,460
I'll send the request to my replicas,

686
00:28:59,460 --> 00:29:01,659
but I'm not going to wait for them to come back.

687
00:29:01,659 --> 00:29:04,099
I'll immediately say, yep, I got it, commit.

688
00:29:04,099 --> 00:29:07,299
Right, and what I was saying before that there's sort of,

689
00:29:07,299 --> 00:29:10,019
like, these are two extremes,

690
00:29:10,019 --> 00:29:14,460
there's a bunch of games you can play about how much can you

691
00:29:14,460 --> 00:29:17,019
really wait for how much should you wait.

692
00:29:17,019 --> 00:29:20,900
Right, so going back here to the one at the top,

693
00:29:22,420 --> 00:29:24,619
so say there was four replicas,

694
00:29:25,579 --> 00:29:27,940
but instead of waiting for acknowledgement from all four,

695
00:29:27,940 --> 00:29:30,660
maybe I waited for two out of four or one out of four,

696
00:29:30,660 --> 00:29:33,700
so at least know it's propagated on least one.

697
00:29:33,700 --> 00:29:37,220
Right, same thing for the asynchronous one.

698
00:29:37,220 --> 00:29:38,700
Right, so I send my,

699
00:29:38,700 --> 00:29:39,940
I send my requests out,

700
00:29:39,940 --> 00:29:42,140
maybe I wait for some of them.

701
00:29:42,140 --> 00:29:46,019
We saw this with consistent hashing in Kansandra,

702
00:29:46,019 --> 00:29:47,460
right, they do quorum rights.

703
00:29:47,460 --> 00:29:49,460
You could say, all right,

704
00:29:49,460 --> 00:29:53,140
every tuple is replicated three times,

705
00:29:53,140 --> 00:29:56,019
all right, for two out of three responses from my replicas

706
00:29:56,019 --> 00:30:00,180
before I say, tell the outside world that my data's been saved.

707
00:30:01,299 --> 00:30:04,500
I don't want to use the term transaction committed in Kansandra

708
00:30:04,500 --> 00:30:05,500
because they don't,

709
00:30:05,900 --> 00:30:08,740
is new versions maybe supported,

710
00:30:08,740 --> 00:30:10,019
but not the older versions,

711
00:30:10,019 --> 00:30:12,059
they didn't support multi object updates,

712
00:30:12,059 --> 00:30:13,380
they didn't support transactions,

713
00:30:13,380 --> 00:30:15,500
they definitely didn't support multi node transactions.

714
00:30:16,500 --> 00:30:17,900
For our purposes, assume that like,

715
00:30:17,900 --> 00:30:20,500
we're updating things just on to some of the single node.

716
00:30:22,819 --> 00:30:26,700
So again, there's pros and cons to all of these, right?

717
00:30:26,700 --> 00:30:30,339
And there isn't one scheme that's gonna be universal for everyone,

718
00:30:30,339 --> 00:30:33,380
it depends on the tolerance of the organization

719
00:30:33,380 --> 00:30:34,500
of the company running your database

720
00:30:34,500 --> 00:30:36,460
and the company's gonna be the application is.

721
00:30:36,460 --> 00:30:39,819
If it's like post on Reddit and Twitter and hack our news,

722
00:30:40,779 --> 00:30:42,500
then like, you know, if I lose something,

723
00:30:42,500 --> 00:30:44,500
yeah, maybe no big deal, right?

724
00:30:45,619 --> 00:30:47,299
But if it's your bank,

725
00:30:47,299 --> 00:30:48,339
then you don't wanna lose anything

726
00:30:48,339 --> 00:30:52,259
and you wanna make sure everything is fully committed.

727
00:30:52,259 --> 00:30:54,500
And so the no-stinkle guys are saying,

728
00:30:54,500 --> 00:30:56,819
yeah, you don't wanna be, to be web-scale,

729
00:30:56,819 --> 00:30:59,579
support online applications, a lot of users,

730
00:30:59,579 --> 00:31:01,420
you wanna use asynchronous commit,

731
00:31:01,420 --> 00:31:02,740
a eventual consistency.

732
00:31:03,539 --> 00:31:05,140
And then the traditional database people say,

733
00:31:05,140 --> 00:31:06,900
oh, you don't wanna lose any data

734
00:31:06,900 --> 00:31:08,099
and you wanna, you know,

735
00:31:08,099 --> 00:31:09,660
when you want fully-asseted transactions,

736
00:31:09,660 --> 00:31:11,140
even though you're cross-mobile nodes.

737
00:31:13,019 --> 00:31:14,660
And so the answer is,

738
00:31:14,660 --> 00:31:16,779
the correct answer is it's somewhere in between.

739
00:31:16,779 --> 00:31:19,299
So, notifications, yes, some applications, no.

740
00:31:19,299 --> 00:31:20,380
The difference with the no-stinkle guys,

741
00:31:20,380 --> 00:31:22,980
they said, should have no, and they never had it

742
00:31:22,980 --> 00:31:23,779
in the least in the beginning,

743
00:31:23,779 --> 00:31:25,859
and they eventually had it at a back.

744
00:31:25,859 --> 00:31:28,059
Whereas the relational database system started off

745
00:31:28,059 --> 00:31:31,740
adding transactions and then they eventually relaxed it

746
00:31:31,740 --> 00:31:33,099
a little bit.

747
00:31:33,099 --> 00:31:34,779
And I would argue, it's better off starting with a,

748
00:31:34,779 --> 00:31:38,099
you know, full transactional drunk-assisting support

749
00:31:38,099 --> 00:31:39,339
and then dial it back as needed,

750
00:31:39,339 --> 00:31:40,940
rather than like trying to shoehorn

751
00:31:40,940 --> 00:31:42,620
and after you've already built the system.

752
00:31:45,420 --> 00:31:46,819
All right, the next is when,

753
00:31:46,819 --> 00:31:49,660
when are the changes actually propagating?

754
00:31:49,660 --> 00:31:51,539
So, again, a mind example here,

755
00:31:51,539 --> 00:31:53,380
I just showed like on-combit,

756
00:31:53,380 --> 00:31:55,819
tell the other replica I wanna go ahead

757
00:31:55,819 --> 00:31:57,019
and apply my changes.

758
00:31:57,019 --> 00:31:59,220
But let's say that I'm doing a transaction,

759
00:31:59,220 --> 00:32:00,700
it updates a lot of data,

760
00:32:00,700 --> 00:32:02,860
and it's a lot around trips to the application server

761
00:32:02,860 --> 00:32:03,700
and the data server,

762
00:32:03,700 --> 00:32:06,460
because like do one update, do another update, and so forth.

763
00:32:07,460 --> 00:32:09,340
Do I wanna wait for the,

764
00:32:09,340 --> 00:32:11,660
I get the commit message before I propagate those changes

765
00:32:11,660 --> 00:32:14,860
to the replica?

766
00:32:14,860 --> 00:32:15,700
Maybe not, right?

767
00:32:15,700 --> 00:32:17,980
Because maybe like as the updates come in,

768
00:32:17,980 --> 00:32:21,059
I can start sending them piecemeal to the replicas

769
00:32:21,059 --> 00:32:23,819
so that when I go ahead and commit,

770
00:32:23,819 --> 00:32:25,460
you know, they don't apply a bunch of those changes,

771
00:32:25,460 --> 00:32:27,860
they've already seen a bunch of these things.

772
00:32:27,860 --> 00:32:30,660
But then that now means that if I roll back

773
00:32:30,700 --> 00:32:31,900
into the transaction,

774
00:32:31,900 --> 00:32:33,100
they've already applied a bunch of changes

775
00:32:33,100 --> 00:32:34,580
that I have to reverse.

776
00:32:35,420 --> 00:32:37,180
But again, this is sort of like what I was saying before,

777
00:32:37,180 --> 00:32:39,460
the replicas are more or less in recovery mode,

778
00:32:39,460 --> 00:32:41,660
ignoring multi-home,

779
00:32:41,660 --> 00:32:44,460
because they're just replaying these log messages

780
00:32:44,460 --> 00:32:46,900
and they're maintaining the on-new state,

781
00:32:46,900 --> 00:32:47,740
or on-new buffer,

782
00:32:47,740 --> 00:32:50,019
just as you would during regular recovery.

783
00:32:51,019 --> 00:32:52,820
So, those systems do the top one.

784
00:32:53,820 --> 00:32:57,019
If you do the bottom one, it does make it easier to implement,

785
00:32:57,019 --> 00:33:00,340
but again, it just, it makes the commit process

786
00:33:00,339 --> 00:33:03,619
a bit longer because now you bash up a bunch of updates,

787
00:33:03,619 --> 00:33:04,459
you have to apply.

788
00:33:07,659 --> 00:33:08,699
All right, this one's a bit nuanced

789
00:33:08,699 --> 00:33:10,220
and always confused with students.

790
00:33:10,220 --> 00:33:12,699
So, ask questions if just to make sense.

791
00:33:12,699 --> 00:33:15,699
So then there's the question of what are the transactions,

792
00:33:15,699 --> 00:33:17,899
or what are the nodes actually doing

793
00:33:17,899 --> 00:33:21,220
that are involved in, say, like a multi-new transaction?

794
00:33:21,220 --> 00:33:24,539
And so the two ideas are active, active, active, passive.

795
00:33:24,539 --> 00:33:27,339
Active passive is what I've been sort of describing so far,

796
00:33:27,339 --> 00:33:29,579
where there's some primary,

797
00:33:29,579 --> 00:33:31,259
the queries go there, they do updates,

798
00:33:31,259 --> 00:33:34,539
and then they get propagated to the replicas.

799
00:33:34,539 --> 00:33:35,659
And the replicas are eventually,

800
00:33:35,659 --> 00:33:36,740
they're not really running the queries

801
00:33:36,740 --> 00:33:38,699
of doing the work, there's replaying the updates

802
00:33:38,699 --> 00:33:39,980
that occurred on the primer.

803
00:33:41,179 --> 00:33:43,939
With active, active, the idea is that,

804
00:33:43,939 --> 00:33:45,139
when I actually have a transaction,

805
00:33:45,139 --> 00:33:47,259
it's gonna, it's gonna actually execute the logic

806
00:33:47,259 --> 00:33:49,460
of that transaction at every replica.

807
00:33:50,379 --> 00:33:52,059
And that when you go to now commit,

808
00:33:52,059 --> 00:33:52,899
you don't need to send like,

809
00:33:52,899 --> 00:33:55,099
hey, here's my updates from the right-of-head log,

810
00:33:55,099 --> 00:33:57,379
because they all did the same thing.

811
00:33:57,379 --> 00:33:59,299
I think of like, I have an update query,

812
00:33:59,299 --> 00:34:02,539
ignoring random, ignoring times and all that other stuff,

813
00:34:02,539 --> 00:34:05,659
that like, assuming I can execute it deterministically,

814
00:34:05,659 --> 00:34:07,779
I send it to the two nodes,

815
00:34:07,779 --> 00:34:09,460
and they both execute it in the exact same order

816
00:34:09,460 --> 00:34:10,860
and produce the exact same result.

817
00:34:10,860 --> 00:34:13,259
So now when they go to commit, they just need to agree,

818
00:34:13,259 --> 00:34:16,579
yep, I did this, yep, you did that, and you're done.

819
00:34:18,659 --> 00:34:20,179
So most systems do this bottom one,

820
00:34:20,179 --> 00:34:21,059
because this is easier,

821
00:34:21,059 --> 00:34:23,900
because again, you're just picking back off of the,

822
00:34:26,059 --> 00:34:27,380
you're picking back off of the,

823
00:34:27,460 --> 00:34:28,579
the right-of-load mechanism,

824
00:34:30,019 --> 00:34:32,700
but the top one is, if you can do it,

825
00:34:32,700 --> 00:34:34,460
it's way more efficient,

826
00:34:34,460 --> 00:34:36,380
because you're just sending less data.

827
00:34:36,380 --> 00:34:37,740
It's similar to that, the push versus,

828
00:34:37,740 --> 00:34:39,460
pushing the data, sorry,

829
00:34:39,460 --> 00:34:42,220
pushing the query to the data versus pulling data to query, yes.

830
00:34:42,220 --> 00:34:44,260
So I could also turn the data to the reference

831
00:34:44,260 --> 00:34:48,019
of the, you know, the D3 and the D3.

832
00:34:48,019 --> 00:34:50,140
The question is, does active active defeat the purpose

833
00:34:50,140 --> 00:34:52,780
of being able to run a lot of re-cories on replicas?

834
00:34:52,780 --> 00:34:53,619
Yes.

835
00:34:57,539 --> 00:35:00,140
And when would you add the key?

836
00:35:02,019 --> 00:35:04,099
Question is, when do you want to do this?

837
00:35:04,099 --> 00:35:07,940
If the, if the amount of data you have to send

838
00:35:07,940 --> 00:35:11,420
to say here's the transaction is gonna be less than,

839
00:35:11,420 --> 00:35:13,740
like here's the, here's the right-of-load updates,

840
00:35:13,740 --> 00:35:15,420
then it may potentially use better.

841
00:35:17,420 --> 00:35:21,660
It also reduces the window of the synchronization time as well,

842
00:35:21,660 --> 00:35:24,140
because now like, again, assuming the two nodes

843
00:35:24,140 --> 00:35:26,820
have the same speed, send requests,

844
00:35:26,820 --> 00:35:29,180
they rip through it, and then you just commit.

845
00:35:29,180 --> 00:35:32,660
Whereas like, seeing the other, the, in the,

846
00:35:32,660 --> 00:35:35,180
the active passive, I got to run the query,

847
00:35:35,180 --> 00:35:36,500
generate the right-head log messages,

848
00:35:36,500 --> 00:35:38,740
after around the query, then send the updates

849
00:35:38,740 --> 00:35:39,900
that then get propagated,

850
00:35:39,900 --> 00:35:40,940
whereas the other two can potentially have

851
00:35:40,940 --> 00:35:41,820
an exact same time.

852
00:35:47,180 --> 00:35:48,660
This question is, if you do active active,

853
00:35:48,660 --> 00:35:51,500
and don't end up with exact same result, what do you do?

854
00:35:51,500 --> 00:35:54,180
You have to abort the transaction.

855
00:35:54,180 --> 00:35:55,700
That's why I'm assuming I'm doing it.

856
00:35:55,699 --> 00:35:56,539
Yeah.

857
00:35:59,699 --> 00:36:00,539
Yes.

858
00:36:00,539 --> 00:36:03,259
The answer is, what do you mean you spend a lot more

859
00:36:03,259 --> 00:36:04,939
about the form and the method?

860
00:36:04,939 --> 00:36:06,819
Questions with active active, wouldn't you need to send

861
00:36:06,819 --> 00:36:11,659
a lot more, a lot more data with the network?

862
00:36:11,659 --> 00:36:12,659
Why?

863
00:36:12,659 --> 00:36:14,460
So for each,

864
00:36:14,460 --> 00:36:17,500
where would you know how to send a message

865
00:36:17,500 --> 00:36:19,059
and instead where it's not the problem,

866
00:36:19,059 --> 00:36:20,659
you send a whole lot of,

867
00:36:20,659 --> 00:36:21,779
a whole rabbit thing on?

868
00:36:21,779 --> 00:36:25,059
So the same it is, and the answer is,

869
00:36:25,579 --> 00:36:26,860
of course, in data, it depends.

870
00:36:26,860 --> 00:36:29,340
Save it is, with active active,

871
00:36:29,340 --> 00:36:31,139
you would have to send the query,

872
00:36:31,139 --> 00:36:32,699
with active password, you'd have to send a right-head log,

873
00:36:32,699 --> 00:36:34,219
and couldn't the right-head log,

874
00:36:34,219 --> 00:36:36,820
the records be large in the query?

875
00:36:36,820 --> 00:36:37,659
Well, it depends.

876
00:36:37,659 --> 00:36:40,500
I have a single update query that updates the billion tuples,

877
00:36:40,500 --> 00:36:42,059
and I could just send that single string,

878
00:36:42,059 --> 00:36:45,219
and that's enough to be a billion things, right?

879
00:36:45,219 --> 00:36:46,500
So I want to go too much into this,

880
00:36:46,500 --> 00:36:47,739
but the,

881
00:36:49,219 --> 00:36:50,699
the handle the,

882
00:36:52,099 --> 00:36:53,019
all of these problems,

883
00:36:53,019 --> 00:36:55,139
if you can run your transactions as store procedures,

884
00:36:55,139 --> 00:36:56,019
which we haven't really talked about,

885
00:36:56,019 --> 00:36:57,460
but think of like an RPC,

886
00:36:57,460 --> 00:36:59,340
like I literally have a function that I can put

887
00:36:59,340 --> 00:37:01,500
on my database system that has, you know,

888
00:37:01,500 --> 00:37:02,259
if and else statements,

889
00:37:02,259 --> 00:37:04,099
things you can't easily do in SQL,

890
00:37:04,099 --> 00:37:04,980
for loops and all that,

891
00:37:04,980 --> 00:37:06,099
it's procedural code,

892
00:37:06,099 --> 00:37:08,500
that then makes invocations of SQL queries.

893
00:37:08,500 --> 00:37:09,460
Now the application,

894
00:37:09,460 --> 00:37:10,659
once you run a transaction,

895
00:37:10,659 --> 00:37:11,500
doesn't say,

896
00:37:11,500 --> 00:37:13,340
okay, begin a transaction, update this query,

897
00:37:13,340 --> 00:37:14,699
get a response, update an explorer,

898
00:37:14,699 --> 00:37:15,460
and so forth, right?

899
00:37:15,460 --> 00:37:16,739
You literally say, you know,

900
00:37:16,739 --> 00:37:19,059
execute this function with this input parameters,

901
00:37:19,059 --> 00:37:21,579
and then that runs on the database server.

902
00:37:21,659 --> 00:37:23,739
This is very common in enterprise systems,

903
00:37:24,739 --> 00:37:26,380
in order systems.

904
00:37:26,380 --> 00:37:28,940
And so if you can run everything as store procedures,

905
00:37:28,940 --> 00:37:29,779
now you,

906
00:37:29,779 --> 00:37:31,900
the database server actually can look inside the code

907
00:37:31,900 --> 00:37:33,380
and figure out what's going on,

908
00:37:33,380 --> 00:37:34,420
and flag anything,

909
00:37:34,420 --> 00:37:35,659
oh, there's a timestamp call,

910
00:37:35,659 --> 00:37:38,059
there's a random function and so forth, right?

911
00:37:38,059 --> 00:37:39,219
And then you can play a bunch of games,

912
00:37:39,219 --> 00:37:41,179
like making sure that like,

913
00:37:41,179 --> 00:37:42,819
when you send the,

914
00:37:42,819 --> 00:37:44,860
that function request to the different servers

915
00:37:44,860 --> 00:37:46,420
that do active active replication,

916
00:37:46,420 --> 00:37:49,299
it's guaranteed execute in the exact same order, right?

917
00:37:49,299 --> 00:37:50,900
Actually, the way you handle random and timestamp

918
00:37:50,900 --> 00:37:55,099
is you basically piggyback on the request

919
00:37:55,099 --> 00:37:57,579
as to go to one server that are server and signs like,

920
00:37:57,579 --> 00:37:58,740
hey, if you ever called timestamp,

921
00:37:58,740 --> 00:37:59,740
here's the timestamp,

922
00:37:59,740 --> 00:38:00,579
you ever call random,

923
00:38:00,579 --> 00:38:01,579
here's the starting seed,

924
00:38:01,579 --> 00:38:03,619
and then that way you send that information along

925
00:38:03,619 --> 00:38:06,220
with the request to any other server,

926
00:38:06,220 --> 00:38:07,059
so when they execute it,

927
00:38:07,059 --> 00:38:09,579
they'll get things running in the exact same order.

928
00:38:09,579 --> 00:38:11,660
That assumes though you're running transaction requests

929
00:38:11,660 --> 00:38:12,980
in the exact same order,

930
00:38:12,980 --> 00:38:14,900
which you can do with serialized ability,

931
00:38:14,900 --> 00:38:16,619
and that's why we care about that.

932
00:38:17,619 --> 00:38:18,619
Okay.

933
00:38:18,619 --> 00:38:20,619
Okay.

934
00:38:20,619 --> 00:38:21,619
Okay.

935
00:38:21,619 --> 00:38:25,779
Again, most of them will be active passive,

936
00:38:25,779 --> 00:38:28,659
but there's active activity that you can do it,

937
00:38:28,659 --> 00:38:30,500
not all systems can,

938
00:38:30,500 --> 00:38:31,699
provides a lot of benefits.

939
00:38:33,699 --> 00:38:35,219
All right, so now we gotta talk about how we actually

940
00:38:35,219 --> 00:38:36,819
wanna get everyone to agree

941
00:38:36,819 --> 00:38:38,420
that we wanna commit transactions.

942
00:38:39,900 --> 00:38:40,500
Now, to curiosity,

943
00:38:40,500 --> 00:38:41,980
who here is taking a distributed system's course,

944
00:38:41,980 --> 00:38:43,819
either CMU or some results?

945
00:38:43,819 --> 00:38:45,339
All right, so more than half, okay.

946
00:38:45,340 --> 00:38:47,460
So some of this will be somewhat redundant,

947
00:38:47,460 --> 00:38:49,380
but again, I wanna focus on the things we care about

948
00:38:49,380 --> 00:38:51,460
in the context of databases.

949
00:38:51,460 --> 00:38:52,780
And so the,

950
00:38:53,980 --> 00:38:55,260
in the distributed systems literature,

951
00:38:55,260 --> 00:38:58,740
they'll call this state machine replication

952
00:38:58,740 --> 00:39:00,860
or log replication,

953
00:39:00,860 --> 00:39:03,340
and the way to think about the context of databases,

954
00:39:03,340 --> 00:39:05,500
the thing we're trying to get around the coordinate on

955
00:39:05,500 --> 00:39:10,260
is the order in which transactions are committed.

956
00:39:10,260 --> 00:39:12,460
And that's essentially our state machine, right?

957
00:39:12,460 --> 00:39:13,300
This transaction committed,

958
00:39:13,300 --> 00:39:15,940
I'll tell you this transaction and this transaction, right?

959
00:39:15,940 --> 00:39:20,300
And it's not so much like here's the changes that they made,

960
00:39:20,300 --> 00:39:21,300
we know what these changes are,

961
00:39:21,300 --> 00:39:22,860
because that's part of our log,

962
00:39:22,860 --> 00:39:24,940
but like the higher level thing that we're trying to order

963
00:39:24,940 --> 00:39:26,620
is the commit order.

964
00:39:26,620 --> 00:39:29,180
Because if you say here's the commit order

965
00:39:29,180 --> 00:39:30,500
of my transactions,

966
00:39:30,500 --> 00:39:33,180
along with that is the metadata that says,

967
00:39:33,180 --> 00:39:35,260
here's the changes that they made.

968
00:39:35,260 --> 00:39:37,180
So if you get the commit order right,

969
00:39:37,180 --> 00:39:39,700
and you piggyback the changes that the transactions made,

970
00:39:39,700 --> 00:39:42,019
then you can propagate that to all the nodes,

971
00:39:42,019 --> 00:39:46,340
and then everyone will be synchronized in order, right?

972
00:39:47,420 --> 00:39:48,500
So for thing we'll talk about now,

973
00:39:48,500 --> 00:39:50,940
is this doesn't matter whether the database system

974
00:39:50,940 --> 00:39:53,579
is gonna be partitioned or replicated.

975
00:39:53,579 --> 00:39:55,380
We still wanna do this to get everyone to agree

976
00:39:55,380 --> 00:39:58,300
that this is the order that transactions are gonna commit.

977
00:39:59,780 --> 00:40:02,340
So there's a bunch of different, actually I take the back,

978
00:40:02,340 --> 00:40:03,780
there's not a lot of protocols to do this,

979
00:40:03,780 --> 00:40:04,860
because it's really hard.

980
00:40:05,820 --> 00:40:09,259
These are the main ones that show up in databases.

981
00:40:09,260 --> 00:40:11,900
Two-phase commit is the original one,

982
00:40:12,660 --> 00:40:16,780
and this was originally thought to be invented by Jim Gray

983
00:40:16,780 --> 00:40:19,420
at IBM, he won the Tournament 1 in Davis in the 90s,

984
00:40:19,420 --> 00:40:21,020
but there's a famous transaction book

985
00:40:21,020 --> 00:40:23,940
where he actually trippes it to this other dude in Italy

986
00:40:23,940 --> 00:40:26,820
who implemented Two-phase commit for like,

987
00:40:26,820 --> 00:40:28,420
one of the early databases that they built

988
00:40:28,420 --> 00:40:32,020
for the Italian social security system in the early 1970s.

989
00:40:32,020 --> 00:40:33,740
But even then the idea of Two-phase commit

990
00:40:33,740 --> 00:40:36,220
comes from the real world, comes from contract law,

991
00:40:37,179 --> 00:40:40,059
between legal arrangements between humans, right?

992
00:40:40,059 --> 00:40:42,739
So the idea of Two-phase commit is sort of,

993
00:40:43,579 --> 00:40:45,059
it's implemented in a database system,

994
00:40:45,059 --> 00:40:46,539
there are different distributed systems,

995
00:40:46,539 --> 00:40:49,379
but the idea predates computing.

996
00:40:50,500 --> 00:40:51,579
Then there's three-phase commit,

997
00:40:51,579 --> 00:40:54,019
that's from Stonebreaker, nobody actually does this.

998
00:40:54,019 --> 00:40:55,299
We can ignore it.

999
00:40:55,299 --> 00:40:57,619
ViewStamp replication is considered to be the first

1000
00:40:59,739 --> 00:41:03,299
consensus protocol that shouldn't be correct.

1001
00:41:03,299 --> 00:41:05,299
I can handle a live in this issues,

1002
00:41:05,460 --> 00:41:07,220
and that was invented by Barbara Liskov

1003
00:41:07,220 --> 00:41:11,140
who won the Tournament Award a few years ago at MIT in 1988.

1004
00:41:11,140 --> 00:41:13,380
Pax is probably one of everyone that also heard about,

1005
00:41:13,380 --> 00:41:14,940
this was invented a year later,

1006
00:41:16,180 --> 00:41:18,900
but the paper itself didn't come out to the 90s,

1007
00:41:18,900 --> 00:41:20,220
I'll explain why in a second.

1008
00:41:20,220 --> 00:41:23,580
Zab is from the Apache Zookeeper people,

1009
00:41:23,580 --> 00:41:26,019
the Zookeeper Atomic Broadcast Protocol,

1010
00:41:26,019 --> 00:41:27,019
that's roughly 2008,

1011
00:41:27,019 --> 00:41:28,620
and then RAPT is another popular one

1012
00:41:30,019 --> 00:41:31,860
that was invented at Stanford in 2013,

1013
00:41:31,860 --> 00:41:32,660
and this is the one that,

1014
00:41:33,659 --> 00:41:35,940
you know, it's sort of invoked now,

1015
00:41:35,940 --> 00:41:37,460
if you're building a distributed database system,

1016
00:41:37,460 --> 00:41:39,420
you often have to do it with use RAPT.

1017
00:41:40,460 --> 00:41:43,019
But for this lecture, we're only gonna focus

1018
00:41:43,019 --> 00:41:44,500
on two-phase commit and Paxos.

1019
00:41:45,739 --> 00:41:47,899
RAPT is considered to be a more readable,

1020
00:41:47,899 --> 00:41:49,980
understandable version of Paxos,

1021
00:41:49,980 --> 00:41:51,539
and the sort of key difference is that

1022
00:41:51,539 --> 00:41:54,940
there's fewer node types or participant types

1023
00:41:54,940 --> 00:41:58,059
in the network, and then when you do a leader election,

1024
00:41:59,059 --> 00:42:03,420
you only have the nodes that have the most updated law,

1025
00:42:03,420 --> 00:42:04,420
they're allowed to go for election,

1026
00:42:04,420 --> 00:42:06,299
where Paxos anybody can, right?

1027
00:42:07,299 --> 00:42:08,820
Use different replication of VSR,

1028
00:42:08,820 --> 00:42:10,380
again, this is a server-coming popular now,

1029
00:42:10,380 --> 00:42:12,299
because there's a distributed database

1030
00:42:12,299 --> 00:42:14,900
out of South Africa, a tiger beetle,

1031
00:42:14,900 --> 00:42:16,059
that's written in ZIG,

1032
00:42:16,059 --> 00:42:19,139
which is like Ross, but more rare,

1033
00:42:19,139 --> 00:42:21,099
and then you'll see VSR for that.

1034
00:42:23,579 --> 00:42:25,820
Okay, so here's two-phase commit.

1035
00:42:25,820 --> 00:42:28,140
Basic idea is that there's an application server,

1036
00:42:28,140 --> 00:42:29,620
again, we can ignore whether this is actually

1037
00:42:29,620 --> 00:42:33,019
going through middleware or whatever, it doesn't matter.

1038
00:42:33,019 --> 00:42:35,380
That they made a much update to the database,

1039
00:42:35,380 --> 00:42:37,180
we don't care whether it's partitioned or replicated,

1040
00:42:37,180 --> 00:42:38,660
it doesn't matter, and they wanna say,

1041
00:42:38,660 --> 00:42:41,059
okay, I wanna commit my transaction.

1042
00:42:41,059 --> 00:42:44,820
And so the commit request is gonna be going to some node,

1043
00:42:44,820 --> 00:42:46,019
we said it was the primary,

1044
00:42:46,019 --> 00:42:47,380
but in the two-phase commit,

1045
00:42:47,380 --> 00:42:49,860
Paxolance it'd be called the coordinator.

1046
00:42:49,860 --> 00:42:51,740
And then the other nodes that were involved

1047
00:42:51,740 --> 00:42:54,820
in the transaction, those would be called participants.

1048
00:42:54,820 --> 00:42:56,460
So two-phase commit sounds like,

1049
00:42:56,460 --> 00:42:58,019
it is what it sounds like, right?

1050
00:42:58,019 --> 00:42:59,019
It's two phases.

1051
00:42:59,019 --> 00:43:01,059
So in the first phase is called prepare phase,

1052
00:43:01,059 --> 00:43:02,820
you send a message, the coordinator sends a message

1053
00:43:02,820 --> 00:43:04,420
to all the nodes, the participants and say,

1054
00:43:04,420 --> 00:43:07,260
hey, there's this transaction, it's got this ID,

1055
00:43:07,260 --> 00:43:11,140
whatever metadata or identification you wanna use,

1056
00:43:11,140 --> 00:43:13,019
go ahead and prepare to commit.

1057
00:43:13,019 --> 00:43:15,380
And they come back and they vote and say, yes.

1058
00:43:15,380 --> 00:43:17,100
Okay, yes, we wanna commit this.

1059
00:43:17,100 --> 00:43:20,420
And then once you get all the okays from all the participants,

1060
00:43:20,420 --> 00:43:21,620
then you go through the second phase and say,

1061
00:43:21,620 --> 00:43:23,420
okay guys, go ahead and commit.

1062
00:43:23,420 --> 00:43:25,820
You send that message to them,

1063
00:43:25,820 --> 00:43:27,220
they come back with okay.

1064
00:43:27,220 --> 00:43:30,380
And once you get all them from the participants,

1065
00:43:30,380 --> 00:43:32,659
then you're allowed to go until the application

1066
00:43:32,659 --> 00:43:34,820
that this transaction has committed.

1067
00:43:34,820 --> 00:43:38,380
Now what I'm not showing here is that,

1068
00:43:38,380 --> 00:43:40,059
on every node, we're actually recording

1069
00:43:40,059 --> 00:43:41,220
in our right-of-head log,

1070
00:43:41,220 --> 00:43:43,700
here's all the messages that we got,

1071
00:43:43,700 --> 00:43:46,099
and here's our response to them.

1072
00:43:46,099 --> 00:43:47,500
And we flush that to disk.

1073
00:43:48,500 --> 00:43:51,260
So that way, if there's a crash and we come back,

1074
00:43:51,260 --> 00:43:52,500
the doke and look on the log and say,

1075
00:43:52,500 --> 00:43:54,380
well, I was involved in this transaction, not.

1076
00:43:54,380 --> 00:43:56,500
So, at least knows about it.

1077
00:43:56,500 --> 00:43:58,820
And it knows that it voted a certain way.

1078
00:44:00,260 --> 00:44:01,940
So that, again, if there's no failure,

1079
00:44:01,940 --> 00:44:05,099
we can come back and reason about what was the state

1080
00:44:05,099 --> 00:44:06,019
of the system,

1081
00:44:07,059 --> 00:44:08,539
when we were committing transactions,

1082
00:44:08,539 --> 00:44:10,860
and at the time of the failure.

1083
00:44:12,860 --> 00:44:15,579
So another key thing about the two-phase commit,

1084
00:44:15,579 --> 00:44:19,500
is that we have to wait for all the okays to come back

1085
00:44:19,500 --> 00:44:22,739
from all the participants before we enter the next phase,

1086
00:44:22,739 --> 00:44:25,940
or before we tell the outside word of transactions committed.

1087
00:44:25,940 --> 00:44:27,099
That's gonna be different than Paxos.

1088
00:44:27,099 --> 00:44:30,059
Paxos has to wait for majority, wrapped as well.

1089
00:44:31,900 --> 00:44:33,059
And I'll talk about this in a second,

1090
00:44:33,059 --> 00:44:36,860
but basically two-phase commit is a gendered case of Paxos.

1091
00:44:39,219 --> 00:44:40,820
But it has this live-niss issue

1092
00:44:40,820 --> 00:44:43,500
where anyone know can take the whole thing down,

1093
00:44:43,500 --> 00:44:45,900
because you're waiting for it, until you time out.

1094
00:44:46,740 --> 00:44:50,740
All right, so this is success.

1095
00:44:50,740 --> 00:44:55,340
For a board, say the application service says commit request,

1096
00:44:55,340 --> 00:44:58,300
we send the prepare message out to everyone.

1097
00:44:58,300 --> 00:45:00,220
One of them, for whatever reason, we don't care.

1098
00:45:00,220 --> 00:45:02,820
We don't know why, comes back and says a board.

1099
00:45:02,820 --> 00:45:06,460
And if one participant in the network

1100
00:45:06,460 --> 00:45:08,220
says we wanna board this transaction,

1101
00:45:08,220 --> 00:45:10,300
then immediately we can tell the outside world

1102
00:45:10,300 --> 00:45:12,099
that our transaction has aborted,

1103
00:45:12,099 --> 00:45:13,940
and then we enter the abort phase,

1104
00:45:13,940 --> 00:45:15,820
and we send all the abort messages to everyone.

1105
00:45:16,660 --> 00:45:17,580
And even though one note might have said,

1106
00:45:17,580 --> 00:45:18,900
oh, yeah, I really wanna commit this transaction,

1107
00:45:18,900 --> 00:45:20,580
I love it, whatever, really.

1108
00:45:20,580 --> 00:45:23,380
If we get one abort, we have to kill the whole thing.

1109
00:45:23,380 --> 00:45:26,300
If the coordinator tells us we have to fail,

1110
00:45:26,300 --> 00:45:27,660
we have to fail, right?

1111
00:45:29,220 --> 00:45:30,380
And then they send back their analogy,

1112
00:45:30,380 --> 00:45:31,460
and we log all of this.

1113
00:45:33,700 --> 00:45:34,700
Pretty simple, right?

1114
00:45:38,019 --> 00:45:38,860
Yes.

1115
00:45:38,860 --> 00:45:41,700
So this is for active active?

1116
00:45:41,700 --> 00:45:43,019
Swaychan, is this for active active?

1117
00:45:43,019 --> 00:45:44,300
Why would it be only for active active?

1118
00:45:44,300 --> 00:45:48,060
Because we're like checking the other nodes,

1119
00:45:48,060 --> 00:45:49,580
it's okay, then I'm quite dealing with it.

1120
00:45:49,580 --> 00:45:51,860
It's a little bit running, do you agree?

1121
00:45:51,860 --> 00:45:54,220
The statement is, because we're checking the other nodes

1122
00:45:55,460 --> 00:45:56,660
when it's okay to commit,

1123
00:45:56,660 --> 00:45:59,380
that assume they're running the other query,

1124
00:45:59,380 --> 00:46:00,220
there's a matter.

1125
00:46:01,300 --> 00:46:02,620
You have to have someone be the coordinator.

1126
00:46:02,620 --> 00:46:04,380
Someone has to say, okay guys, we're committing.

1127
00:46:04,380 --> 00:46:07,260
It doesn't matter how node and two got,

1128
00:46:08,700 --> 00:46:10,700
we're propagating to the updates.

1129
00:46:10,700 --> 00:46:13,580
Active passive, active active doesn't matter.

1130
00:46:13,579 --> 00:46:16,500
Okay, so I guess in what case does it send the board

1131
00:46:16,500 --> 00:46:18,619
then it's the only propagating update?

1132
00:46:18,619 --> 00:46:21,019
Swaychan, in what case does it send a board?

1133
00:46:22,179 --> 00:46:24,579
So there could be another coordinator

1134
00:46:24,579 --> 00:46:25,860
committing another transaction,

1135
00:46:26,860 --> 00:46:29,139
and node three is involved in it,

1136
00:46:29,139 --> 00:46:31,699
and for whatever reason, it can commit the,

1137
00:46:31,699 --> 00:46:33,579
that guy's transaction, but not this one.

1138
00:46:40,539 --> 00:46:41,380
Yes.

1139
00:46:41,380 --> 00:46:42,980
So, the participants are limited,

1140
00:46:42,980 --> 00:46:44,300
about the first 30 minutes.

1141
00:46:44,300 --> 00:46:45,300
Your statement is,

1142
00:46:45,300 --> 00:46:49,059
participants are not limited to replicas, correct, yes.

1143
00:46:50,380 --> 00:46:53,140
So it could be multi-home, the multi-primary.

1144
00:46:53,140 --> 00:46:54,660
It's just again, when interest actually commits,

1145
00:46:54,660 --> 00:46:57,180
someone has to be in charge, right?

1146
00:47:01,300 --> 00:47:04,579
Okay, so as I said, all the inbound and outbound messages,

1147
00:47:04,579 --> 00:47:07,660
we have to store and disk, and we have to flush them,

1148
00:47:07,660 --> 00:47:08,940
like the red head log,

1149
00:47:09,860 --> 00:47:11,860
and then when we crash, we come back.

1150
00:47:12,740 --> 00:47:16,300
If we see that, if we go look at our log,

1151
00:47:16,300 --> 00:47:19,579
and we see that we were in this prepared state,

1152
00:47:19,579 --> 00:47:21,059
meaning like we got it, we got a request,

1153
00:47:21,059 --> 00:47:23,139
to prepare the transaction,

1154
00:47:23,139 --> 00:47:25,139
and we said, yeah, go ahead and prepare it,

1155
00:47:25,139 --> 00:47:26,980
but then we didn't see whether that,

1156
00:47:26,980 --> 00:47:28,940
the vote was successful or not,

1157
00:47:28,940 --> 00:47:30,260
then when the node comes back,

1158
00:47:30,260 --> 00:47:32,900
it contacts the coordinator to get the updates for the log.

1159
00:47:32,900 --> 00:47:34,780
I forgot what it missed.

1160
00:47:34,780 --> 00:47:38,099
If the transaction was not in the prepared state,

1161
00:47:38,099 --> 00:47:39,659
then we assume that it was aborted,

1162
00:47:40,659 --> 00:47:43,380
because if I was involved in the transaction,

1163
00:47:43,380 --> 00:47:45,420
under a two-base commit, and then I crashed,

1164
00:47:45,420 --> 00:47:47,460
clearly couldn't have committed.

1165
00:47:47,460 --> 00:47:51,380
So I'm gonna correctly assume that it was aborted.

1166
00:47:54,099 --> 00:47:57,779
If the transaction was committing,

1167
00:47:57,779 --> 00:48:00,579
and the node that fails as the coordinator,

1168
00:48:02,739 --> 00:48:05,099
then when I come back up, I just send out again,

1169
00:48:05,099 --> 00:48:08,299
hey guys, you may have missed this,

1170
00:48:08,299 --> 00:48:09,500
but I'm pretty sure you just get this,

1171
00:48:09,500 --> 00:48:10,940
this transaction was committed.

1172
00:48:10,940 --> 00:48:12,259
Of course, now again, I have to,

1173
00:48:12,259 --> 00:48:13,699
the other nodes have to wait for that coordinator

1174
00:48:13,699 --> 00:48:16,699
to come back up and come back online.

1175
00:48:16,699 --> 00:48:19,139
Or at some point, they'll be a timeout,

1176
00:48:19,139 --> 00:48:20,500
and they say, oh, when that coordinator's dead,

1177
00:48:20,500 --> 00:48:22,980
he's never coming back, this transaction is aborted.

1178
00:48:22,980 --> 00:48:24,539
Right?

1179
00:48:24,539 --> 00:48:27,380
But again, one node going down can take down the whole thing.

1180
00:48:30,659 --> 00:48:32,699
So, all right, what happens if the coordinator crashes

1181
00:48:32,699 --> 00:48:35,059
or they set this, they have to decide what to do,

1182
00:48:35,059 --> 00:48:37,539
after timeout, and again, the system is not available

1183
00:48:37,539 --> 00:48:38,980
during this time, and available means like,

1184
00:48:38,980 --> 00:48:41,139
I can't take any new queries.

1185
00:48:42,179 --> 00:48:44,340
I could take read queries, and I'm okay for things

1186
00:48:44,340 --> 00:48:47,019
being a little loosey-goosey if you don't want

1187
00:48:47,019 --> 00:48:48,659
that strong consistency guarantee,

1188
00:48:50,259 --> 00:48:52,019
but I can't take any rights,

1189
00:48:52,900 --> 00:48:54,940
because I can't propagate those rights,

1190
00:48:54,940 --> 00:48:57,139
because until I find out what the transaction is before

1191
00:48:57,139 --> 00:48:58,940
for me actually did.

1192
00:49:00,619 --> 00:49:01,900
And then the participant crashes,

1193
00:49:01,900 --> 00:49:04,980
the coordinators are gonna assume that it just hasn't responded

1194
00:49:04,980 --> 00:49:08,900
and it's gonna be abort, and then we just timeout

1195
00:49:08,900 --> 00:49:10,059
and say, okay, this guy's dead,

1196
00:49:10,059 --> 00:49:12,300
and then we just abort the transaction.

1197
00:49:12,300 --> 00:49:13,139
Right?

1198
00:49:15,740 --> 00:49:18,699
So, there are two optimizations we can do in two phase commit.

1199
00:49:18,699 --> 00:49:20,460
The first is called early prepare voting,

1200
00:49:20,460 --> 00:49:22,260
which is actually very rare,

1201
00:49:22,260 --> 00:49:26,500
and you can only do this with the active approach I talked about

1202
00:49:26,500 --> 00:49:28,300
for, and with store procedures.

1203
00:49:30,420 --> 00:49:31,340
Yeah, I think that's true.

1204
00:49:32,340 --> 00:49:35,700
Now, sorry to be about you could do with the JDBC,

1205
00:49:35,700 --> 00:49:38,660
but the wire protocol of the database system

1206
00:49:38,660 --> 00:49:40,980
doesn't support this technique,

1207
00:49:40,980 --> 00:49:42,579
but you can do this, some systems can do this

1208
00:49:42,579 --> 00:49:43,900
if you do store procedures.

1209
00:49:43,900 --> 00:49:45,140
And then the one that's more common

1210
00:49:45,140 --> 00:49:47,220
is early acknowledgement after prepare.

1211
00:49:47,220 --> 00:49:48,620
So, early prepare voting is,

1212
00:49:49,579 --> 00:49:52,780
if I'm sending a query request to another node,

1213
00:49:52,780 --> 00:49:54,660
and I know this is the last time,

1214
00:49:54,660 --> 00:49:56,539
the last query I'm ever gonna execute on that node

1215
00:49:56,539 --> 00:49:59,140
for this transaction, then I piggyback on my message

1216
00:49:59,139 --> 00:50:01,539
and say, hey, execute this query, and oh by the way,

1217
00:50:01,539 --> 00:50:03,099
I'm gonna commit, you're pretty soon,

1218
00:50:03,099 --> 00:50:05,980
I'm never gonna come back and ask you to run another query.

1219
00:50:05,980 --> 00:50:07,819
So, go tell me what your vote's gonna be

1220
00:50:07,819 --> 00:50:09,019
for two phase commit.

1221
00:50:09,019 --> 00:50:10,339
So, you get the query response back,

1222
00:50:10,339 --> 00:50:12,900
and actually the vote on the prepare phase,

1223
00:50:12,900 --> 00:50:14,299
all of them one round trip.

1224
00:50:15,940 --> 00:50:18,859
Early acknowledgement after prepare is basically,

1225
00:50:18,859 --> 00:50:21,139
if I get the acknowledgement on the coordinator

1226
00:50:21,139 --> 00:50:23,059
from all of the participants,

1227
00:50:23,059 --> 00:50:24,980
that this transaction is gonna commit,

1228
00:50:24,980 --> 00:50:27,299
then I don't wait until the,

1229
00:50:27,300 --> 00:50:30,940
I get the acknowledgments from the commit phase.

1230
00:50:30,940 --> 00:50:33,980
I immediately send back the commit message

1231
00:50:33,980 --> 00:50:34,980
to the application,

1232
00:50:34,980 --> 00:50:37,019
the acknowledge it back to the application.

1233
00:50:37,019 --> 00:50:39,780
Because at that point, I assume that if there's a crash

1234
00:50:39,780 --> 00:50:43,380
and I come back, then the coordinator or the nodes

1235
00:50:43,380 --> 00:50:44,700
will look in the log and say, okay,

1236
00:50:44,700 --> 00:50:46,660
we all agree to commit this transaction.

1237
00:50:46,660 --> 00:50:49,539
So, let's go ahead and actually apply the change.

1238
00:50:49,539 --> 00:50:51,780
So, there's a small window where like,

1239
00:50:53,420 --> 00:50:56,220
sorry, there is not a window where you could crash

1240
00:50:56,219 --> 00:50:58,779
and lose data, but they're able to take,

1241
00:50:58,779 --> 00:51:00,459
we'll make recovery a little bit longer.

1242
00:51:02,219 --> 00:51:03,179
So, it looks like that's right.

1243
00:51:03,179 --> 00:51:05,059
So, I get my commitment crest,

1244
00:51:05,059 --> 00:51:07,339
I do my prepare phase, they all come back and say,

1245
00:51:07,339 --> 00:51:09,779
okay, go ahead and commit.

1246
00:51:09,779 --> 00:51:11,899
And then immediately once I get back all the okay,

1247
00:51:11,899 --> 00:51:13,419
I can send back the success.

1248
00:51:14,859 --> 00:51:17,419
And then I still then have to do the commit phase

1249
00:51:17,419 --> 00:51:19,179
and get that round trip.

1250
00:51:19,179 --> 00:51:20,980
Again, all of this is written to the log,

1251
00:51:20,980 --> 00:51:22,459
which not everyone always does,

1252
00:51:23,460 --> 00:51:26,019
or no one ever always flushes it,

1253
00:51:27,780 --> 00:51:29,340
but most systems doing two phase commit

1254
00:51:29,340 --> 00:51:31,699
are gonna do this simple optimization.

1255
00:51:31,699 --> 00:51:34,220
Because the fairytale window is pretty small.

1256
00:51:35,260 --> 00:51:36,099
Yes.

1257
00:51:36,099 --> 00:51:37,740
So, important to do two phase,

1258
00:51:37,740 --> 00:51:39,619
if we're doing phase commit?

1259
00:51:39,619 --> 00:51:42,780
This question is, do we still need to do two phase commit

1260
00:51:42,780 --> 00:51:44,579
if we're doing asynchronous commits?

1261
00:51:48,579 --> 00:51:50,820
You should, because you want everyone to say,

1262
00:51:50,820 --> 00:51:53,539
okay, we all agree this is the update that happened.

1263
00:51:56,340 --> 00:51:58,940
You don't have to though, it makes,

1264
00:52:00,500 --> 00:52:02,180
you'd have to do more work on recovery,

1265
00:52:03,380 --> 00:52:05,660
but you could potentially not use two phase commit.

1266
00:52:07,940 --> 00:52:09,900
I think that's true, yes.

1267
00:52:09,900 --> 00:52:11,260
Yeah, I think a lot of the new SQL systems,

1268
00:52:11,260 --> 00:52:12,260
when they did that propagation,

1269
00:52:12,260 --> 00:52:14,059
they weren't using two phase commit.

1270
00:52:18,100 --> 00:52:18,940
All right.

1271
00:52:20,980 --> 00:52:24,940
So, Paxos, as I said, is considered a super set

1272
00:52:24,940 --> 00:52:29,059
to two phase commit, and this was the,

1273
00:52:29,059 --> 00:52:30,980
I think this was the first crack protocol

1274
00:52:30,980 --> 00:52:34,140
that was presumably resilient in the face

1275
00:52:34,140 --> 00:52:35,460
of asynchronous networks,

1276
00:52:35,460 --> 00:52:37,260
but again, it wasn't the first one

1277
00:52:37,260 --> 00:52:39,140
that actually could do this,

1278
00:52:39,140 --> 00:52:41,100
ViewStamp replication came before it.

1279
00:52:42,500 --> 00:52:47,500
And so, the idea is basically that we're gonna send out

1280
00:52:48,019 --> 00:52:49,420
votes just like before,

1281
00:52:51,019 --> 00:52:54,660
but instead of having all the participants come back

1282
00:52:54,660 --> 00:52:57,660
and acknowledge that this transaction not commit,

1283
00:52:57,660 --> 00:52:59,740
you just need a majority.

1284
00:52:59,740 --> 00:53:02,180
And then for the ones that are in the minority,

1285
00:53:02,180 --> 00:53:05,580
they basically are treated as failures or failing,

1286
00:53:05,580 --> 00:53:08,380
and they have to basically crash, pseudo crash,

1287
00:53:08,380 --> 00:53:11,420
and then replay the law to get that back up the,

1288
00:53:11,420 --> 00:53:14,500
up the, the correct state.

1289
00:53:14,500 --> 00:53:16,019
And this is going back to what I was saying before,

1290
00:53:16,019 --> 00:53:18,260
this is why we don't care about visiting fault tolerance

1291
00:53:18,260 --> 00:53:21,580
in the real world, well, in this world,

1292
00:53:21,580 --> 00:53:23,900
because it's not like someone's gonna vote no

1293
00:53:23,900 --> 00:53:26,420
because they wanna be, right?

1294
00:53:26,420 --> 00:53:28,060
Whenever an else is going to commit,

1295
00:53:28,060 --> 00:53:30,740
there's something really wrong with it,

1296
00:53:31,740 --> 00:53:34,460
or the network, but when it comes back,

1297
00:53:34,460 --> 00:53:38,260
it can get back up the date, right?

1298
00:53:38,260 --> 00:53:40,940
Assuming that there's no massive hardware failures.

1299
00:53:40,940 --> 00:53:43,980
So, the original Paxos paper, I think,

1300
00:53:43,980 --> 00:53:44,980
is there a date on this?

1301
00:53:45,980 --> 00:53:47,980
Yeah, 1998.

1302
00:53:47,980 --> 00:53:52,980
The land port actually wrote the paper in 89,

1303
00:53:54,980 --> 00:53:56,980
but who here has ever read the Paxos paper?

1304
00:53:57,980 --> 00:53:59,179
One, two.

1305
00:53:59,179 --> 00:54:00,179
The wild reed, right?

1306
00:54:00,179 --> 00:54:01,179
Yeah.

1307
00:54:01,179 --> 00:54:02,380
So, it's crazy.

1308
00:54:03,380 --> 00:54:06,579
It's basically, he's trying to be very illustrative

1309
00:54:06,579 --> 00:54:10,780
and not poetic, but he was trying to,

1310
00:54:10,780 --> 00:54:12,179
instead of saying, here's the protocol,

1311
00:54:12,179 --> 00:54:13,780
like, does this, this, this, this, this,

1312
00:54:13,780 --> 00:54:16,140
he describes it as if he's like archaeologists

1313
00:54:16,140 --> 00:54:19,340
finding this ancient Greek tribe in the island of Paxos

1314
00:54:19,340 --> 00:54:21,340
and how they would do voting by throwing tablets

1315
00:54:21,340 --> 00:54:24,900
in a hole and then coming back later to read them, right?

1316
00:54:24,900 --> 00:54:28,460
Like, it's just, I mean, it's amusing,

1317
00:54:29,580 --> 00:54:31,700
but like, if you really try to read and understand

1318
00:54:31,700 --> 00:54:34,500
what the hell is actually trying to do, you can't.

1319
00:54:34,500 --> 00:54:36,420
And so, the story goes is that,

1320
00:54:38,180 --> 00:54:41,060
if you go to, actually, if you go to Leslie Lamport's website,

1321
00:54:41,060 --> 00:54:42,980
and you go look at his, his, maybe theography,

1322
00:54:42,980 --> 00:54:45,219
which is kind of cool, he lists, like, for every single paper,

1323
00:54:45,219 --> 00:54:47,420
at least for the major ones,

1324
00:54:47,420 --> 00:54:49,460
he lists like what he was doing in his daily life

1325
00:54:49,460 --> 00:54:51,780
when he wrote the paper, like, what he was eating,

1326
00:54:51,780 --> 00:54:53,260
who he's dating, and so forth, right?

1327
00:54:53,260 --> 00:54:54,940
And so, he talks about in the Paxos paper,

1328
00:54:54,940 --> 00:54:56,940
when he submitted it with this Greek archaeology story

1329
00:54:56,940 --> 00:54:59,740
inside of it, it got rejected.

1330
00:54:59,740 --> 00:55:01,500
And he says, oh, the reviewers were stupid,

1331
00:55:01,500 --> 00:55:03,019
because like, they couldn't appreciate my genius

1332
00:55:03,019 --> 00:55:04,019
or whatever.

1333
00:55:04,019 --> 00:55:05,820
And so, when I was in grad school,

1334
00:55:05,820 --> 00:55:07,099
I took a distributor, it says, it was course,

1335
00:55:07,099 --> 00:55:08,820
and I presented the Paxos paper,

1336
00:55:08,820 --> 00:55:10,420
and I started going on about like, oh, yeah,

1337
00:55:10,420 --> 00:55:12,219
this paper is brilliant, and like,

1338
00:55:12,219 --> 00:55:13,859
the reviewers were stupid, they were stupid

1339
00:55:13,859 --> 00:55:16,099
for rejecting his, you know, he was a genius.

1340
00:55:16,099 --> 00:55:17,500
Turns out though, the professor teaching it,

1341
00:55:17,500 --> 00:55:20,019
this is back at Brown, was Maurice Hurley,

1342
00:55:20,019 --> 00:55:22,659
who used to be here at CMU, and he's like,

1343
00:55:22,659 --> 00:55:25,139
yeah, I actually was one of the reviewers on this paper.

1344
00:55:25,139 --> 00:55:30,659
And the story goes is that they were okay with,

1345
00:55:30,659 --> 00:55:32,739
he says they were okay with all the Greek stuff,

1346
00:55:32,739 --> 00:55:35,059
they just wanted him to have an appendix with like,

1347
00:55:35,059 --> 00:55:37,699
you know, with an algorithm and like a proof,

1348
00:55:37,699 --> 00:55:39,459
showing that what the thing actually was,

1349
00:55:39,459 --> 00:55:41,980
and Leslie Lamport was apparently super stubborn,

1350
00:55:41,980 --> 00:55:43,340
didn't want to change anything in the paper,

1351
00:55:43,340 --> 00:55:44,860
because he thought it was perfect as is.

1352
00:55:44,860 --> 00:55:47,860
So, got rejected, they put it in his filing camera,

1353
00:55:47,860 --> 00:55:51,139
put it in his shelf, and didn't do anything with it

1354
00:55:51,139 --> 00:55:53,139
for like 10 years, and then over the 90s,

1355
00:55:53,139 --> 00:55:54,539
people started publishing papers that sort of like,

1356
00:55:54,539 --> 00:55:56,780
dancing around the problem that he already saw

1357
00:55:56,780 --> 00:55:59,219
back in 89, he actually was not aware

1358
00:55:59,219 --> 00:56:02,219
of view stamp replication, which came out in 88.

1359
00:56:03,179 --> 00:56:05,340
But then once he saw enough papers,

1360
00:56:05,340 --> 00:56:08,099
trying to kind of bark him up the same tree as Paxos,

1361
00:56:08,099 --> 00:56:10,179
then he put the original Paxos paper out,

1362
00:56:10,179 --> 00:56:11,340
along with another paper called,

1363
00:56:11,340 --> 00:56:13,780
Paxos Made Simple, which is not simple,

1364
00:56:13,780 --> 00:56:16,620
which is, but actually the one paper,

1365
00:56:16,620 --> 00:56:18,180
if you want to read a Paxos paper,

1366
00:56:18,180 --> 00:56:20,059
the Google one Paxos Made Live,

1367
00:56:20,059 --> 00:56:21,860
that's the one that like, for me, clicked,

1368
00:56:21,860 --> 00:56:23,860
and I was like, okay, now I understand what they're doing.

1369
00:56:23,860 --> 00:56:25,820
But then once you know that it's actually just

1370
00:56:25,820 --> 00:56:28,100
a degenerative case of two-faced commit,

1371
00:56:28,100 --> 00:56:29,460
these for me coming from the database world,

1372
00:56:29,460 --> 00:56:30,860
then it makes sense.

1373
00:56:30,860 --> 00:56:34,900
So there's this paper here, this is 2003 or 2005,

1374
00:56:34,900 --> 00:56:37,300
2006 from Jim Gray, and Leslie Lamport,

1375
00:56:37,300 --> 00:56:39,620
this is right before Jim Gray got lost at C,

1376
00:56:39,619 --> 00:56:41,980
where they basically show, they prove that two-faced commit

1377
00:56:41,980 --> 00:56:44,819
is a subset of Paxos.

1378
00:56:45,980 --> 00:56:48,460
Right, so again, and Raff is gonna be basically

1379
00:56:48,460 --> 00:56:52,139
the same idea here, it's just gonna have fewer node types.

1380
00:56:52,139 --> 00:56:53,259
And actually, I'm not even gonna show,

1381
00:56:53,259 --> 00:56:55,739
there's another node type in Paxos called Learners.

1382
00:56:55,739 --> 00:56:58,059
We can ignore that, nobody does that.

1383
00:56:59,299 --> 00:57:03,019
Or the nodes have multiple roles, it doesn't matter.

1384
00:57:03,019 --> 00:57:05,339
But again, in Paxos, when they do a leader election,

1385
00:57:05,339 --> 00:57:08,059
any node can be a leader, but in Raff,

1386
00:57:08,059 --> 00:57:10,179
they choose the ones that have the most updates logs,

1387
00:57:10,179 --> 00:57:12,340
that's sort of the major distinction.

1388
00:57:12,340 --> 00:57:13,380
So going back to our example here,

1389
00:57:13,380 --> 00:57:16,619
now we have three nodes, our transaction goes ahead and commit.

1390
00:57:17,820 --> 00:57:19,779
The Paxos instead of calling them coordinators

1391
00:57:19,779 --> 00:57:22,820
and participants, they can all propose her and accept her.

1392
00:57:22,820 --> 00:57:25,619
Again, there's a Learners, we can ignore that.

1393
00:57:26,539 --> 00:57:29,299
We send out proposed that we wanna commit this transaction,

1394
00:57:29,299 --> 00:57:31,699
say there's one node three here, goes down,

1395
00:57:31,699 --> 00:57:33,420
for whatever reason, it doesn't matter.

1396
00:57:33,420 --> 00:57:36,739
And then we get back the agreements from the other two nodes,

1397
00:57:36,739 --> 00:57:39,739
and since we got two out of three of the nodes agreed

1398
00:57:39,739 --> 00:57:41,379
that we can commit this transaction,

1399
00:57:41,379 --> 00:57:44,739
this transaction is allowed, well, we do the commit phase,

1400
00:57:44,739 --> 00:57:47,699
and then the transaction is allowed to commit.

1401
00:57:47,699 --> 00:57:49,979
And eventually, when node three comes back up,

1402
00:57:49,979 --> 00:57:54,099
it can learn about the changes that it missed.

1403
00:57:59,259 --> 00:58:01,339
So another way to look at it is often

1404
00:58:01,339 --> 00:58:05,179
this sort of timeline graph here, where you have a poser,

1405
00:58:05,179 --> 00:58:09,299
says I wanna commit transaction, you have a timestamp n, right?

1406
00:58:09,299 --> 00:58:11,500
Again, think of the log as just an order list,

1407
00:58:11,500 --> 00:58:12,619
but here's the transaction that I wanna commit.

1408
00:58:12,619 --> 00:58:15,579
So the first guy who says, I wanna commit transaction n.

1409
00:58:16,579 --> 00:58:19,179
So all the acceptors get that, they agree to do it.

1410
00:58:19,179 --> 00:58:20,899
But during this time, another proposer comes along,

1411
00:58:20,899 --> 00:58:23,619
says I wanna, I propose commit transaction n plus one.

1412
00:58:23,619 --> 00:58:26,980
And then soon the acceptors see a new timestamp value

1413
00:58:26,980 --> 00:58:29,980
that's greater than anyone has seen the pass.

1414
00:58:29,980 --> 00:58:33,059
Anything that comes after that is automatically rejected.

1415
00:58:33,059 --> 00:58:34,940
So the log is always sort of moving forward.

1416
00:58:34,940 --> 00:58:36,460
You never move backwards.

1417
00:58:36,460 --> 00:58:39,380
So now when this other guy says I wanna go ahead and commit,

1418
00:58:39,380 --> 00:58:43,500
and assuming we're not doing the early acknowledgement optimization,

1419
00:58:43,500 --> 00:58:47,780
go ahead and commit because these acceptors already saw n,

1420
00:58:47,780 --> 00:58:49,780
they rejected and say, I can't take n,

1421
00:58:49,780 --> 00:58:51,579
because I've seen n plus one.

1422
00:58:51,579 --> 00:58:54,220
So now they can go ahead and agree to commit n plus one,

1423
00:58:55,340 --> 00:58:57,300
commit that, and then this other guy here,

1424
00:58:57,300 --> 00:59:02,460
he can re-submit his request to commit that transaction.

1425
00:59:03,460 --> 00:59:06,659
So in this world, we have multiple proposers

1426
00:59:06,659 --> 00:59:08,699
proposing commit transactions.

1427
00:59:08,699 --> 00:59:11,260
And obviously that's gonna be problematic

1428
00:59:11,260 --> 00:59:13,579
because you're gonna have this contention

1429
00:59:13,579 --> 00:59:15,740
of everyone trying to clover each other.

1430
00:59:17,019 --> 00:59:17,860
Yes.

1431
00:59:17,860 --> 00:59:19,139
This example looks like,

1432
00:59:19,139 --> 00:59:20,900
would 2PC actually be the same?

1433
00:59:20,900 --> 00:59:22,139
Because it looks like,

1434
00:59:23,099 --> 00:59:24,980
like you said that this is a majority,

1435
00:59:24,980 --> 00:59:25,820
it makes it be right,

1436
00:59:25,820 --> 00:59:28,500
but it looks like here they're all responding at the same time

1437
00:59:28,500 --> 00:59:30,059
and they're working for the same.

1438
00:59:30,059 --> 00:59:31,659
So the statement is,

1439
00:59:31,659 --> 00:59:33,500
would 2PC have the same problem

1440
00:59:34,900 --> 00:59:36,340
if you have multiple coordinators?

1441
00:59:36,340 --> 00:59:37,179
Yes.

1442
00:59:38,460 --> 00:59:43,460
So again, the way we're gonna handle this is through leases,

1443
00:59:44,259 --> 00:59:45,420
to limit the number of,

1444
00:59:45,420 --> 00:59:49,500
or limit which node can propose commit transactions.

1445
00:59:49,500 --> 00:59:52,259
Basically, how do I know which one's gonna be

1446
00:59:52,259 --> 00:59:56,619
the primary, which one's gonna be the coordinator

1447
00:59:56,619 --> 00:59:59,259
or the proposer for a distributed database system?

1448
01:00:00,139 --> 01:00:02,980
So this came from a Google paper called multi-paxos.

1449
01:00:03,980 --> 01:00:06,539
The idea here is that you run leader election

1450
01:00:06,539 --> 01:00:08,059
every so often to say, okay,

1451
01:00:08,059 --> 01:00:10,820
this node here is anointed as the proposer.

1452
01:00:10,820 --> 01:00:13,779
And then in some cases now you can skip the proposed phase

1453
01:00:13,779 --> 01:00:15,940
because now the coordinator or the proposer can say,

1454
01:00:15,940 --> 01:00:17,299
here's the transaction I wanna go out to commit,

1455
01:00:17,299 --> 01:00:20,460
everyone agree that we're all gonna commit this.

1456
01:00:20,460 --> 01:00:22,219
And then if at any time there's a failure,

1457
01:00:22,219 --> 01:00:25,659
either like the leader goes down or some node goes down,

1458
01:00:25,659 --> 01:00:27,779
then you just run the leader election all over again.

1459
01:00:27,780 --> 01:00:30,100
Which is gen, just running Paxos.

1460
01:00:30,100 --> 01:00:32,300
Again, think of the state machine is,

1461
01:00:32,300 --> 01:00:34,460
here's the order in which transactions commit.

1462
01:00:34,460 --> 01:00:35,420
And as part of that state machine,

1463
01:00:35,420 --> 01:00:39,140
here's the, which node is the proposer for the coordinator.

1464
01:00:40,500 --> 01:00:41,740
Right?

1465
01:00:41,740 --> 01:00:45,540
So you would send heartbeats out between the different nodes

1466
01:00:45,540 --> 01:00:46,860
to figure out who's actually alive

1467
01:00:46,860 --> 01:00:48,820
and responding to requests.

1468
01:00:48,820 --> 01:00:50,220
And if you don't get a heartbeat when it's certain

1469
01:00:50,220 --> 01:00:53,100
out of time, then you say, okay, this node is down

1470
01:00:53,100 --> 01:00:55,300
and run, rerun leader election, right?

1471
01:00:56,300 --> 01:00:58,580
And then you set the least time out to be like,

1472
01:00:58,580 --> 01:01:00,700
okay, every 10 minutes or so,

1473
01:01:00,700 --> 01:01:04,260
then I automatically run leader election all over again.

1474
01:01:04,260 --> 01:01:06,380
And maybe the case, I'd re-elect the same leader,

1475
01:01:06,380 --> 01:01:09,620
which is ideal, but at least you're running that

1476
01:01:09,620 --> 01:01:11,260
election over and over again.

1477
01:01:11,260 --> 01:01:12,980
And different systems are gonna run that leader election

1478
01:01:12,980 --> 01:01:14,420
at different time intervals.

1479
01:01:14,420 --> 01:01:16,420
Spanner runs at every 10 seconds,

1480
01:01:16,420 --> 01:01:18,500
you go by it is every like 30 seconds,

1481
01:01:18,500 --> 01:01:22,340
and I think cockroach in the source code is like every five minutes.

1482
01:01:22,340 --> 01:01:25,019
And it depends on how reactive you wanna be

1483
01:01:25,860 --> 01:01:27,099
to the failures.

1484
01:01:30,300 --> 01:01:31,699
You go by it is two seconds,

1485
01:01:31,699 --> 01:01:33,659
you go by it is less than Spanner, it's two seconds.

1486
01:01:36,059 --> 01:01:37,820
But again, generally this technique

1487
01:01:37,820 --> 01:01:41,019
is falls on the umbrella called multi-packsis.

1488
01:01:41,019 --> 01:01:42,980
So most people say they're running packsis,

1489
01:01:42,980 --> 01:01:45,619
they're most often running multi-packsis.

1490
01:01:48,099 --> 01:01:49,739
All right, again, I've already covered this already,

1491
01:01:49,739 --> 01:01:52,619
but that the main idea is the main difference between

1492
01:01:52,619 --> 01:01:54,259
two base commit packsis and raft,

1493
01:01:54,260 --> 01:01:56,300
is there two base commit that if the coordinator fails

1494
01:01:56,300 --> 01:01:58,220
or any node fails, we have the block until the coordinator

1495
01:01:58,220 --> 01:02:01,180
comes back, in packsis, along with the majority of our

1496
01:02:01,180 --> 01:02:04,980
participants are alive, and we waited long enough

1497
01:02:04,980 --> 01:02:08,500
to make sure that there's no further failures.

1498
01:02:08,500 --> 01:02:10,500
They've been going ahead to commit, and raft, as I said,

1499
01:02:10,500 --> 01:02:13,740
is basically the same thing, fewer node roles.

1500
01:02:13,740 --> 01:02:15,940
And when you do a leader election,

1501
01:02:15,940 --> 01:02:18,460
you choose the ones that have the most updated logs.

1502
01:02:18,460 --> 01:02:19,300
Yes.

1503
01:02:20,500 --> 01:02:23,700
Packsis has proposers, acceptors,

1504
01:02:23,699 --> 01:02:26,500
and then there's learners, which are just

1505
01:02:26,500 --> 01:02:28,219
down stream from the acceptors to say,

1506
01:02:28,219 --> 01:02:31,179
hey, here's the changes, here's what we just committed.

1507
01:02:31,179 --> 01:02:32,019
We can ignore that.

1508
01:02:35,739 --> 01:02:36,259
Okay.

1509
01:02:37,259 --> 01:02:40,179
So most of the modern, just you get a data systems,

1510
01:02:40,179 --> 01:02:42,259
they're gonna be running packsis or rafts.

1511
01:02:42,259 --> 01:02:44,859
Rapt is probably way more common than packsis,

1512
01:02:44,859 --> 01:02:47,939
just because when it came out in 2013,

1513
01:02:47,939 --> 01:02:49,379
a bunch of people took the protocol

1514
01:02:49,379 --> 01:02:51,579
and they re-implemented it in different languages.

1515
01:02:51,579 --> 01:02:53,860
So for a long time, there wasn't a lib pack so,

1516
01:02:53,860 --> 01:02:54,699
so you could download and just like,

1517
01:02:54,699 --> 01:02:56,779
oh, let me put this in my distributed areas.

1518
01:02:56,779 --> 01:03:01,059
But in raft, there was a bunch of correct implementations

1519
01:03:01,059 --> 01:03:03,179
in rust or rust wasn't around.

1520
01:03:03,179 --> 01:03:05,900
In go, in Python, in C++,

1521
01:03:05,900 --> 01:03:07,619
there were a bunch of libraries that you could just

1522
01:03:07,619 --> 01:03:10,179
plop in and get raft, because sense of saturday.

1523
01:03:10,179 --> 01:03:13,219
So I think that helped evangelize a bit more.

1524
01:03:13,219 --> 01:03:14,059
Yes.

1525
01:03:14,059 --> 01:03:16,219
What's the difference between multi-packsis and rafts?

1526
01:03:16,219 --> 01:03:17,699
It's questions, what's the difference between multi-packsis

1527
01:03:17,699 --> 01:03:18,539
and rafts?

1528
01:03:18,539 --> 01:03:19,539
Same thing.

1529
01:03:19,539 --> 01:03:20,779
You run leader election.

1530
01:03:21,900 --> 01:03:24,900
What do you think about multi-packsis?

1531
01:03:24,900 --> 01:03:27,980
Multi-packsis, like, 2004 or five-ish?

1532
01:03:27,980 --> 01:03:31,019
What do you think about multi-packsis?

1533
01:03:31,019 --> 01:03:35,539
I mean, the question is, what did rafts invent?

1534
01:03:35,539 --> 01:03:38,860
Oh, so again, they don't have...

1535
01:03:38,860 --> 01:03:42,500
Rap is meant to be a more understandable version of packsis,

1536
01:03:42,500 --> 01:03:43,099
right?

1537
01:03:43,099 --> 01:03:45,299
At a high level, they're the same, right?

1538
01:03:45,299 --> 01:03:47,739
But in terms of implementation,

1539
01:03:47,739 --> 01:03:49,980
you don't have to have these learners,

1540
01:03:50,260 --> 01:03:52,940
either participants or proposers.

1541
01:03:52,940 --> 01:03:54,860
So there's only two no types.

1542
01:03:54,860 --> 01:04:00,340
When you do a leader election, then you choose the one

1543
01:04:00,340 --> 01:04:02,460
that has the most up-to-date log versus packsis.

1544
01:04:02,460 --> 01:04:04,940
Anybody can be the leader.

1545
01:04:04,940 --> 01:04:07,059
And I think packsis had, or sorry, in raft,

1546
01:04:07,059 --> 01:04:09,300
there's explicit like timeouts for our beats

1547
01:04:09,300 --> 01:04:11,019
and things like that, where in packsis, people add them,

1548
01:04:11,019 --> 01:04:11,980
but I don't think the original protocol

1549
01:04:11,980 --> 01:04:13,340
talks about those things.

1550
01:04:14,340 --> 01:04:15,179
Yes.

1551
01:04:15,179 --> 01:04:16,860
So I'm going to look at these on multi-packsis,

1552
01:04:16,860 --> 01:04:17,780
which is packsis.

1553
01:04:17,780 --> 01:04:19,940
Is the main difference that multi-packsis will carry

1554
01:04:19,940 --> 01:04:21,980
out of any shuffle with a leader?

1555
01:04:21,980 --> 01:04:23,460
They're the main difference in multi-packsis.

1556
01:04:23,460 --> 01:04:25,100
Yeah.

1557
01:04:25,100 --> 01:04:30,700
Yes, but in packsis, anybody can be reposed,

1558
01:04:30,700 --> 01:04:32,500
anybody can be a leader.

1559
01:04:32,500 --> 01:04:34,140
To propose changes, to updates.

1560
01:04:34,140 --> 01:04:34,980
Oh, I see.

1561
01:04:34,980 --> 01:04:35,980
Yeah.

1562
01:04:35,980 --> 01:04:39,700
And so it's the last one, and then all the changes get

1563
01:04:39,700 --> 01:04:41,019
set there to be for a leader.

1564
01:04:41,019 --> 01:04:41,820
Yes.

1565
01:04:41,820 --> 01:04:43,180
Because otherwise, anybody's proposing,

1566
01:04:43,180 --> 01:04:45,860
and you just clobber each other,

1567
01:04:45,860 --> 01:04:47,220
and so you have to do back-off, just like,

1568
01:04:47,219 --> 01:04:52,139
OK, my transaction, I got overwritten, I couldn't commit it.

1569
01:04:52,139 --> 01:04:55,059
So maybe wait a certain amount of time, and commit another one.

1570
01:04:55,059 --> 01:04:58,259
So instead of back and forth, they say, OK, you're the leader.

1571
01:04:58,259 --> 01:05:01,299
Everything goes to you, and you don't

1572
01:05:01,299 --> 01:05:02,819
worry about conflicting proposals coming in.

1573
01:05:05,819 --> 01:05:06,819
Yes.

1574
01:05:06,819 --> 01:05:08,139
So what do you think of the sub-proposar?

1575
01:05:08,139 --> 01:05:10,819
And you technically have one proposal

1576
01:05:10,819 --> 01:05:16,819
within some boundary in multi-packsis, yes.

1577
01:05:16,820 --> 01:05:19,700
So whether that boundary is like a rack of machines

1578
01:05:19,700 --> 01:05:22,780
or like a data center, depends on the representation.

1579
01:05:27,460 --> 01:05:29,220
All right, let's finish up.

1580
01:05:29,220 --> 01:05:30,500
So cap there.

1581
01:05:30,500 --> 01:05:33,300
This was the hot thing in distributed systems.

1582
01:05:33,300 --> 01:05:35,700
The buzzword everyone used in the 2000s

1583
01:05:35,700 --> 01:05:37,740
to describe the distributed data systems.

1584
01:05:37,740 --> 01:05:44,140
And it was a way to characterize what the system could handle

1585
01:05:44,139 --> 01:05:47,139
in the face of failures.

1586
01:05:47,139 --> 01:05:50,379
So the cap theorem, the C, is consistent.

1587
01:05:50,379 --> 01:05:52,779
So basically, the strong consistent,

1588
01:05:52,779 --> 01:05:54,059
the A is always available.

1589
01:05:54,059 --> 01:05:56,219
So if there's a failure or a network partition,

1590
01:05:56,219 --> 01:05:59,659
you can still run any possible query.

1591
01:05:59,659 --> 01:06:01,659
And that's sort of tied to the network partition

1592
01:06:01,659 --> 01:06:02,379
tolerant.

1593
01:06:02,379 --> 01:06:04,139
What happens when there's a network partition

1594
01:06:04,139 --> 01:06:06,420
can you handle updates in that environment?

1595
01:06:06,420 --> 01:06:10,699
So it was proven to be correct the way to describe systems.

1596
01:06:10,699 --> 01:06:13,819
The idea is you can pick two out of three.

1597
01:06:13,820 --> 01:06:15,300
The way to think of a boyfriend and girlfriend,

1598
01:06:15,300 --> 01:06:18,860
are they good looking, crazy, or smart, picked two out of three?

1599
01:06:18,860 --> 01:06:21,420
Same thing for your chip at a database.

1600
01:06:21,420 --> 01:06:23,019
And so this is proven to be correct.

1601
01:06:23,019 --> 01:06:25,019
But a very important aspect of this

1602
01:06:25,019 --> 01:06:28,180
is that the cap theorem describes what happens if there's

1603
01:06:28,180 --> 01:06:31,780
a failure, but most of the time there is an failure.

1604
01:06:31,780 --> 01:06:33,980
So what happens when you're running no operations?

1605
01:06:33,980 --> 01:06:38,700
So it got extended by Dan Abadi, who did a lot of the early

1606
01:06:38,700 --> 01:06:43,019
column store stuff in MIT and just now professor at Maryland.

1607
01:06:43,699 --> 01:06:45,780
The first part is the cap theorem.

1608
01:06:45,780 --> 01:06:47,820
Partition tolerant always available consistent.

1609
01:06:47,820 --> 01:06:49,300
But then during no more operations,

1610
01:06:49,300 --> 01:06:52,300
you have this trade-off between your latency tolerance

1611
01:06:52,300 --> 01:06:55,019
and your consistency tolerance.

1612
01:06:55,019 --> 01:06:57,139
And we'll see what that looks like in a second.

1613
01:07:00,380 --> 01:07:02,739
So let's go through some examples.

1614
01:07:02,739 --> 01:07:06,860
So with consistency, the idea is that if I do a commit

1615
01:07:06,860 --> 01:07:09,699
or a change to a copy of an object in my database,

1616
01:07:09,699 --> 01:07:13,219
and there's replicas, when do I tell the outside world

1617
01:07:13,219 --> 01:07:15,659
that my change has been propagated?

1618
01:07:15,659 --> 01:07:19,619
And can anybody see an intermediate state?

1619
01:07:19,619 --> 01:07:20,779
So we talked about this before, between

1620
01:07:20,779 --> 01:07:22,939
venture-criticism, trunk consistency, same idea.

1621
01:07:22,939 --> 01:07:25,619
So if I do an update to A here, this is the primary,

1622
01:07:25,619 --> 01:07:28,779
this is the replica, I make the change to the primary,

1623
01:07:28,779 --> 01:07:30,819
I then propagate the update to the replica

1624
01:07:30,819 --> 01:07:32,859
or if it's active-active, they both run at the same time.

1625
01:07:32,859 --> 01:07:34,179
It doesn't matter.

1626
01:07:34,179 --> 01:07:36,059
And then once I get the acknowledgement

1627
01:07:36,059 --> 01:07:39,259
from the replica that the change is durable and safe,

1628
01:07:39,260 --> 01:07:40,500
then I can tell the outside world

1629
01:07:40,500 --> 01:07:41,940
my transaction has committed.

1630
01:07:41,940 --> 01:07:44,300
So now if any other application comes along

1631
01:07:44,300 --> 01:07:46,260
and does a read on A, they're guaranteed

1632
01:07:46,260 --> 01:07:48,740
to see the update from the committed transaction.

1633
01:07:51,500 --> 01:07:55,460
So for single objects, this is doable.

1634
01:07:55,460 --> 01:07:57,820
Really, it starts to matter when you have multiple objects.

1635
01:07:57,820 --> 01:08:00,660
If I update A and B at the same time,

1636
01:08:00,660 --> 01:08:02,860
can I guarantee that I'll see a consistent view

1637
01:08:02,860 --> 01:08:03,700
of the database?

1638
01:08:06,700 --> 01:08:08,540
Availability determines what happens

1639
01:08:08,619 --> 01:08:11,460
if there's a failure to the overall system.

1640
01:08:11,460 --> 01:08:14,380
So say this node goes down here for whatever reason.

1641
01:08:14,380 --> 01:08:17,819
So my application server here, they can read the copy

1642
01:08:17,819 --> 01:08:19,460
of the primary that's just fine.

1643
01:08:19,460 --> 01:08:23,019
But what happens with this application server over there?

1644
01:08:23,019 --> 01:08:26,340
Well, assuming they can connect to this other replica,

1645
01:08:26,340 --> 01:08:28,579
then they can still access this content

1646
01:08:28,579 --> 01:08:30,260
and read the database over there.

1647
01:08:30,260 --> 01:08:33,779
Like, assuming the network has a min7.

1648
01:08:34,779 --> 01:08:38,300
And no matter how many nodes go down.

1649
01:08:40,939 --> 01:08:44,739
Partition tolerance says, if the network gets severed

1650
01:08:44,739 --> 01:08:48,059
and now these two nodes can't talk to each other.

1651
01:08:48,059 --> 01:08:50,659
So what's going to happen here on their paxes?

1652
01:08:52,619 --> 01:08:54,659
This guy is the primary, right?

1653
01:08:54,659 --> 01:08:56,340
He's holding lease on that.

1654
01:08:56,340 --> 01:08:58,539
And now that there's a, there's a,

1655
01:08:58,539 --> 01:09:00,099
the network gets severed.

1656
01:09:00,099 --> 01:09:02,099
So the replica can't call it this guy.

1657
01:09:02,100 --> 01:09:03,940
So he says, oh, well, this guy's down.

1658
01:09:03,940 --> 01:09:05,060
So let me run a leader election.

1659
01:09:05,060 --> 01:09:06,579
Up, look at that.

1660
01:09:06,579 --> 01:09:08,660
I'm not a leader, right?

1661
01:09:08,660 --> 01:09:10,380
So it becomes the primary.

1662
01:09:10,380 --> 01:09:11,420
What's the problem here?

1663
01:09:12,539 --> 01:09:16,180
So now the first application send updates to A.

1664
01:09:17,220 --> 01:09:19,780
Both of them think they're the primary.

1665
01:09:19,780 --> 01:09:20,900
And they said, okay, yeah, great.

1666
01:09:20,900 --> 01:09:22,180
We'll go ahead and commit your changes.

1667
01:09:22,180 --> 01:09:23,780
That's fine, all right?

1668
01:09:23,780 --> 01:09:25,180
And they get, you get back acknowledged

1669
01:09:25,180 --> 01:09:27,140
that those changes got persisted.

1670
01:09:27,140 --> 01:09:29,460
But then now the network comes back up

1671
01:09:29,460 --> 01:09:31,260
and now there's a problem.

1672
01:09:31,260 --> 01:09:32,820
Where they both think they're the primary

1673
01:09:32,820 --> 01:09:34,460
and they both think they have the latest version

1674
01:09:34,460 --> 01:09:38,579
of the object, but who's correct?

1675
01:09:40,659 --> 01:09:43,699
So this is called split brain, right?

1676
01:09:43,699 --> 01:09:48,659
And in most systems, when you have this problem,

1677
01:09:48,659 --> 01:09:50,100
like this goes back to the key safety thing.

1678
01:09:50,100 --> 01:09:54,940
Once I don't have enough copies of my data,

1679
01:09:54,940 --> 01:09:56,619
I'm gonna stop the system.

1680
01:09:58,860 --> 01:10:01,020
A small number of no-seical systems back in the day

1681
01:10:01,020 --> 01:10:03,300
used were to call vector clocks,

1682
01:10:03,300 --> 01:10:05,540
and then it by Leslie Lamport was basically,

1683
01:10:05,540 --> 01:10:06,620
it's almost like multi-version.

1684
01:10:06,620 --> 01:10:08,380
And you're keeping track of the different versions

1685
01:10:08,380 --> 01:10:10,420
of the object over time.

1686
01:10:10,420 --> 01:10:13,980
So now when the network gets connected up again,

1687
01:10:13,980 --> 01:10:15,900
you said, okay, well, you have these changes

1688
01:10:15,900 --> 01:10:16,900
and I have these changes this time

1689
01:10:16,900 --> 01:10:19,780
and you merge the two vector clocks together.

1690
01:10:19,780 --> 01:10:21,540
But then now you several bunch of different copies

1691
01:10:21,540 --> 01:10:24,540
of different versions in your database for these objects.

1692
01:10:24,540 --> 01:10:25,780
So now in your application code,

1693
01:10:25,780 --> 01:10:27,980
you have to write stuff to go reason about

1694
01:10:27,980 --> 01:10:29,660
what is actually the correct version.

1695
01:10:30,659 --> 01:10:31,979
So like you as the application,

1696
01:10:31,979 --> 01:10:33,139
but we have to write a bunch of sh** here

1697
01:10:33,139 --> 01:10:35,619
that people always get wrong.

1698
01:10:35,619 --> 01:10:37,420
It's super hard, right?

1699
01:10:38,420 --> 01:10:40,420
So in the no-seical world,

1700
01:10:40,420 --> 01:10:44,699
they would, in some cases, they would actually still allow

1701
01:10:44,699 --> 01:10:48,420
this to happen, but then when the network gets,

1702
01:10:48,420 --> 01:10:49,819
connect it back up again,

1703
01:10:49,819 --> 01:10:52,420
they'll just pick what everyone has the latest timestamp

1704
01:10:52,420 --> 01:10:54,699
and say that's the latest version.

1705
01:10:54,699 --> 01:10:56,539
And whether or not that's the right or wrong,

1706
01:10:56,539 --> 01:10:58,300
depends on whether the application cares or not.

1707
01:10:58,300 --> 01:11:00,420
Oh, someone will notice.

1708
01:11:00,420 --> 01:11:01,260
Yes.

1709
01:11:01,260 --> 01:11:02,579
Why would that be wrong?

1710
01:11:02,579 --> 01:11:04,619
So I should, why would that be wrong?

1711
01:11:04,619 --> 01:11:06,779
My bank account has $100.

1712
01:11:06,779 --> 01:11:08,539
This guy pulls out $100.

1713
01:11:08,539 --> 01:11:10,140
This guy pulls out $100.

1714
01:11:10,140 --> 01:11:13,020
I now come back and now I have negative $100.

1715
01:11:13,020 --> 01:11:13,900
That's definitely wrong.

1716
01:11:18,699 --> 01:11:20,180
But I already give it out,

1717
01:11:20,180 --> 01:11:22,180
but you give out $100 twice.

1718
01:11:23,619 --> 01:11:24,460
All right.

1719
01:11:25,539 --> 01:11:26,460
You're happy.

1720
01:11:26,460 --> 01:11:27,619
Bank's not happy.

1721
01:11:27,779 --> 01:11:28,460
All right.

1722
01:11:30,739 --> 01:11:31,739
Or think about it.

1723
01:11:31,739 --> 01:11:33,140
It's the, it's the,

1724
01:11:33,140 --> 01:11:34,939
whether the, the, the,

1725
01:11:35,939 --> 01:11:37,779
the tuition payment, they take it out twice.

1726
01:11:37,779 --> 01:11:39,579
You definitely would care, all right.

1727
01:11:43,180 --> 01:11:45,180
All right. So in, again, in the cap there,

1728
01:11:45,180 --> 01:11:46,819
you kind of, going back here quickly,

1729
01:11:46,819 --> 01:11:48,220
you can kind of see why like,

1730
01:11:48,220 --> 01:11:51,140
you can't get all three of those properties, right?

1731
01:11:52,140 --> 01:11:55,739
I can't do, I can't guarantee consistency

1732
01:11:55,739 --> 01:11:57,579
if I'm gonna start doing things like,

1733
01:11:57,579 --> 01:11:59,460
allowing both sides to get updated.

1734
01:11:59,460 --> 01:12:02,539
Because that's not a consistent view of the database, right?

1735
01:12:02,539 --> 01:12:05,819
And so what typical happen is like, say,

1736
01:12:05,819 --> 01:12:08,699
you know, say even odd number of, of, of, of, of,

1737
01:12:08,699 --> 01:12:10,539
replicas, I have three.

1738
01:12:10,539 --> 01:12:12,300
So in this case here, maybe two is over here,

1739
01:12:12,300 --> 01:12:13,420
and one's over here.

1740
01:12:13,420 --> 01:12:15,340
It knew that there was three before,

1741
01:12:15,340 --> 01:12:17,420
but it says now I don't, I can't get a majority at it,

1742
01:12:17,420 --> 01:12:18,539
you know, two out of three.

1743
01:12:18,539 --> 01:12:21,100
So this guy then just says, okay, I'm not available.

1744
01:12:21,100 --> 01:12:22,140
And then this guy, you know,

1745
01:12:22,140 --> 01:12:23,859
could run the election just fine.

1746
01:12:23,859 --> 01:12:28,859
Right, so, okay, this is all what happens when there's a failure.

1747
01:12:30,500 --> 01:12:32,779
But again, on our normal operations,

1748
01:12:33,859 --> 01:12:35,979
even if we have these different properties

1749
01:12:35,979 --> 01:12:38,539
under the cap theorem, there's this trade-off

1750
01:12:38,539 --> 01:12:42,579
between how long we wanna wait for changes to get propagated

1751
01:12:42,579 --> 01:12:47,299
and acknowledge from our replicas versus guaranteeing

1752
01:12:47,299 --> 01:12:49,019
that everything's gonna be consistent.

1753
01:12:50,579 --> 01:12:53,699
And so again, so say my application would say an update on A,

1754
01:12:53,699 --> 01:12:55,579
it's gonna set it to two,

1755
01:12:55,579 --> 01:12:58,460
but then it's gonna propagate those changes to the replicas.

1756
01:12:58,460 --> 01:13:00,979
And say these replicas are in different data centers,

1757
01:13:00,979 --> 01:13:02,619
like, you know, one's going across the country,

1758
01:13:02,619 --> 01:13:05,099
one's going over the ocean to Europe.

1759
01:13:05,099 --> 01:13:07,220
And now the question is how long do we wanna wait

1760
01:13:07,220 --> 01:13:11,300
for the acknowledgments from those other replicas

1761
01:13:11,300 --> 01:13:15,179
before we tell the application server we, we got those changes.

1762
01:13:16,019 --> 01:13:17,739
Again, this goes back to that strong consistency

1763
01:13:17,739 --> 01:13:18,739
versus eventual consistency.

1764
01:13:18,739 --> 01:13:21,019
And I was saying that somewhere in the middle.

1765
01:13:21,020 --> 01:13:25,460
So maybe just waiting for the update from,

1766
01:13:25,460 --> 01:13:30,460
or the acknowledgment from US West, maybe that's good enough.

1767
01:13:30,460 --> 01:13:32,460
Because now if I crash and come back,

1768
01:13:32,460 --> 01:13:36,180
I can make sure that the,

1769
01:13:36,180 --> 01:13:38,860
I at least pull the change from one of the locations.

1770
01:13:38,860 --> 01:13:41,460
But depending on how much I really care about my data,

1771
01:13:41,460 --> 01:13:44,700
which is actually not something the data system can reason about.

1772
01:13:44,700 --> 01:13:46,740
Because depends on the application, depends on the organization,

1773
01:13:46,740 --> 01:13:49,380
depends on whether you're a bank and it's financial things,

1774
01:13:49,380 --> 01:13:52,340
or it's like, you know, some, some massacron website,

1775
01:13:52,340 --> 01:13:54,500
for who care, to be loose and stuff, right?

1776
01:13:55,460 --> 01:13:58,380
So there's no hard and fast rules saying, okay,

1777
01:13:58,380 --> 01:14:00,500
this is the right way to do this no matter what.

1778
01:14:00,500 --> 01:14:02,539
It really depends for a human to decide

1779
01:14:02,539 --> 01:14:05,020
what the, what the tolerance actually is.

1780
01:14:05,020 --> 01:14:07,060
But you can clearly see how there's this trade up between,

1781
01:14:07,060 --> 01:14:08,900
I can make sure everything's strong and consistent,

1782
01:14:08,900 --> 01:14:10,659
but I'm gonna wait for that.

1783
01:14:10,659 --> 01:14:12,420
Because there's, there's the speed of light issues

1784
01:14:12,420 --> 01:14:15,020
of sending and propagating messages that I can't,

1785
01:14:15,020 --> 01:14:17,460
you know, there's no magic wand to make that go away.

1786
01:14:18,460 --> 01:14:21,539
And then if, but if, but if I don't wait,

1787
01:14:21,539 --> 01:14:23,260
then I could have inconsistent data.

1788
01:14:25,980 --> 01:14:26,819
Right?

1789
01:14:27,739 --> 01:14:31,460
So as I said, most distributed relational database systems,

1790
01:14:31,460 --> 01:14:34,460
both the traditional ones like, the ones from the 1980s,

1791
01:14:34,460 --> 01:14:36,939
like DB2 and Oracle RAC and others,

1792
01:14:36,939 --> 01:14:41,939
they will, they will lean heavily towards strong consistency

1793
01:14:42,659 --> 01:14:46,060
and over availability and partition tolerance.

1794
01:14:46,060 --> 01:14:47,300
Meaning a bunch of nodes go down,

1795
01:14:47,300 --> 01:14:49,659
they're just gonna stop the world until those nodes

1796
01:14:49,659 --> 01:14:52,940
come back up because they don't wanna have inconsistent data,

1797
01:14:52,940 --> 01:14:56,500
they don't wanna cause you to, you know, integrity issues.

1798
01:14:56,500 --> 01:14:58,579
Whereas the noticeable guys in the original,

1799
01:14:58,579 --> 01:15:00,180
a lot of the original versions,

1800
01:15:00,180 --> 01:15:02,380
they would not support multi-node consistency

1801
01:15:02,380 --> 01:15:05,180
because they were trying to support high availability

1802
01:15:05,180 --> 01:15:07,340
and be able to scale out.

1803
01:15:07,340 --> 01:15:08,420
And they would do something really simple

1804
01:15:08,420 --> 01:15:10,260
like last update wins.

1805
01:15:10,260 --> 01:15:12,140
And this last one here, these are the vector clocks

1806
01:15:12,140 --> 01:15:14,220
and as I said, this is pretty rare.

1807
01:15:14,220 --> 01:15:15,659
Very few systems do this.

1808
01:15:18,140 --> 01:15:18,980
Right?

1809
01:15:21,699 --> 01:15:22,699
All right, in the last five minutes,

1810
01:15:22,699 --> 01:15:26,820
let's go through a very complicated database system

1811
01:15:26,820 --> 01:15:29,020
that Google has spent years and years working on,

1812
01:15:29,020 --> 01:15:29,739
called Spanner.

1813
01:15:30,739 --> 01:15:34,100
So the background is, Google was one of the biggest

1814
01:15:34,100 --> 01:15:37,100
proponents of no SQL systems in the day, right?

1815
01:15:37,100 --> 01:15:40,659
They wrote this paper called Bigtable in 2004

1816
01:15:40,659 --> 01:15:42,739
where they said, transactions, we don't need them,

1817
01:15:42,739 --> 01:15:44,100
SQL, we don't need that.

1818
01:15:44,100 --> 01:15:45,260
They didn't explicitly call no SQL,

1819
01:15:45,260 --> 01:15:47,180
but a bunch of people read those papers

1820
01:15:47,380 --> 01:15:48,619
and said, oh yeah, let's build the same things,

1821
01:15:48,619 --> 01:15:50,460
Google's building, because Google's making a lot of money,

1822
01:15:50,460 --> 01:15:51,460
we want to make a lot of money,

1823
01:15:51,460 --> 01:15:53,060
and it's clearly because of their database.

1824
01:15:53,060 --> 01:15:57,020
So a lot of people re-implemented what Google

1825
01:15:57,020 --> 01:15:58,140
talked about in their papers.

1826
01:15:59,659 --> 01:16:03,260
But then, so Bigtable came out in 2004

1827
01:16:03,260 --> 01:16:04,060
and didn't have transactions.

1828
01:16:04,060 --> 01:16:06,980
I think a lot of their stuff had vector clocks

1829
01:16:06,980 --> 01:16:08,579
where you had to reason about inconsistent data

1830
01:16:08,579 --> 01:16:10,180
in the application code.

1831
01:16:10,180 --> 01:16:11,539
But why everyone else in Silicon Valley

1832
01:16:11,539 --> 01:16:12,780
was re-implemented Google's papers,

1833
01:16:12,780 --> 01:16:14,940
Google was realizing, hey, which SQL transactions

1834
01:16:14,940 --> 01:16:16,659
are actually a good idea.

1835
01:16:16,659 --> 01:16:19,779
And they then, over five year period,

1836
01:16:19,779 --> 01:16:20,899
when no SQL was a hot thing,

1837
01:16:20,899 --> 01:16:24,539
they were building this thing called Spanner, right?

1838
01:16:24,539 --> 01:16:25,579
And what is Spanner?

1839
01:16:25,579 --> 01:16:28,619
It's a, the original version was not relational database

1840
01:16:28,619 --> 01:16:30,220
system, it was, it didn't support SQL,

1841
01:16:30,220 --> 01:16:31,300
they eventually added that.

1842
01:16:32,300 --> 01:16:34,500
But it's going to be a decentralized shared

1843
01:16:34,500 --> 01:16:35,619
disc architecture,

1844
01:16:35,619 --> 01:16:37,500
using log structure on this storage.

1845
01:16:37,500 --> 01:16:38,699
And for the concurrency tool,

1846
01:16:38,699 --> 01:16:40,019
it's going to hit all of our favorite buzzwords

1847
01:16:40,019 --> 01:16:41,500
where we talked about this semester.

1848
01:16:41,500 --> 01:16:42,779
They're going to do strict 2PL,

1849
01:16:42,779 --> 01:16:44,220
multi-versus-concurrency tool,

1850
01:16:44,220 --> 01:16:46,860
multi-paxos, and two-based commit.

1851
01:16:46,860 --> 01:16:49,180
Now, hopefully, at this point in the semester,

1852
01:16:49,180 --> 01:16:50,900
all these words just start clicking.

1853
01:16:50,900 --> 01:16:52,180
And you see, oh yeah, I know what those things are.

1854
01:16:52,180 --> 01:16:55,020
And you see now, when you see them in the context

1855
01:16:55,020 --> 01:16:57,180
of someone describing a database system,

1856
01:16:57,180 --> 01:16:59,420
you now can't get a big picture of what they're actually

1857
01:16:59,420 --> 01:17:03,420
doing, whether it actually makes sense, all right?

1858
01:17:03,420 --> 01:17:05,140
Now, the one thing Google does that is very

1859
01:17:05,140 --> 01:17:07,500
rad that most people don't do is that they're going to support

1860
01:17:07,500 --> 01:17:09,340
what is called external consistency

1861
01:17:09,340 --> 01:17:11,980
or strict or strong serialized ability,

1862
01:17:11,980 --> 01:17:13,940
which I think we might have talked about.

1863
01:17:13,939 --> 01:17:17,539
And the basic idea here is that the commit order transactions

1864
01:17:17,539 --> 01:17:20,299
is going to be equivalent to the arrival order

1865
01:17:20,299 --> 01:17:22,460
of transactions, which is not something

1866
01:17:22,460 --> 01:17:24,779
we talked about when we talked about serialized

1867
01:17:24,779 --> 01:17:26,899
ability on a single node.

1868
01:17:26,899 --> 01:17:28,779
We said, oh yeah, this transaction could

1869
01:17:28,779 --> 01:17:29,939
go right after this one, but could still

1870
01:17:29,939 --> 01:17:31,299
commit for the other one.

1871
01:17:31,299 --> 01:17:33,699
In their role, they need a guarantee that transactions

1872
01:17:33,699 --> 01:17:37,299
arrive and commit it in the same order that they arrive.

1873
01:17:37,299 --> 01:17:41,299
They claim in the papers because of something about ads.

1874
01:17:41,300 --> 01:17:44,340
They built Spanner for running their behemoth ad

1875
01:17:44,340 --> 01:17:46,820
infrastructure.

1876
01:17:46,820 --> 01:17:49,060
Very few people need this.

1877
01:17:49,060 --> 01:17:51,980
And very few systems actually support this.

1878
01:17:51,980 --> 01:17:54,539
We can ignore lock free transactions for now.

1879
01:17:54,539 --> 01:17:57,539
So the way it's going to work is that they're

1880
01:17:57,539 --> 01:18:01,340
going to guarantee the ordering of transactions

1881
01:18:01,340 --> 01:18:03,940
through globally unique timestamps that are going to be

1882
01:18:03,940 --> 01:18:06,619
generated through a combination of atomic clocks

1883
01:18:06,619 --> 01:18:10,340
and GPS receivers in every data center.

1884
01:18:10,340 --> 01:18:11,940
So they're going to have some satellite dish on top of every

1885
01:18:11,940 --> 01:18:15,020
single data center to pull down the timestamps coming out

1886
01:18:15,020 --> 01:18:17,060
of the GPS satellites.

1887
01:18:17,060 --> 01:18:21,380
Now, it's not going to guarantee that timestamps are good.

1888
01:18:21,380 --> 01:18:24,980
It's not going to guarantee that it knows the exact ordering

1889
01:18:24,980 --> 01:18:27,220
at any given time for any transaction,

1890
01:18:27,220 --> 01:18:30,060
but it's going to allow us to bound how long we have to wait

1891
01:18:30,060 --> 01:18:32,940
before we expect a transaction to show up with a lower time

1892
01:18:32,940 --> 01:18:36,860
stamp than an action transaction when we have to commit.

1893
01:18:36,860 --> 01:18:38,300
And that's the novel aspect about this.

1894
01:18:38,300 --> 01:18:42,779
Because otherwise, if you wanted to do this global ordering

1895
01:18:42,779 --> 01:18:45,020
across different data centers, across the wider network,

1896
01:18:45,020 --> 01:18:46,860
you're going to have to wait.

1897
01:18:46,860 --> 01:18:50,300
But because the clocks could be skewed,

1898
01:18:50,300 --> 01:18:52,539
slightly off from every one data center than other,

1899
01:18:52,539 --> 01:18:54,300
you might have to wait a little bit longer than you would,

1900
01:18:54,300 --> 01:18:56,820
otherwise, if you have this.

1901
01:18:56,820 --> 01:19:00,260
And as far as I know, I don't know of any other people.

1902
01:19:00,260 --> 01:19:01,260
I don't know any other company that

1903
01:19:01,260 --> 01:19:04,300
publicly talks about having this kind of infrastructure.

1904
01:19:04,300 --> 01:19:06,100
The high-frequency trading guys might,

1905
01:19:06,100 --> 01:19:07,340
but they don't write papers, and they don't

1906
01:19:07,340 --> 01:19:09,819
share what they're doing because they're too busy counting

1907
01:19:09,819 --> 01:19:10,819
their money.

1908
01:19:14,819 --> 01:19:18,340
Fun fact, when I was in grad school, one

1909
01:19:18,340 --> 01:19:20,699
I earlier was, I was sponsored by the research

1910
01:19:20,699 --> 01:19:22,819
funding was sponsored by this company

1911
01:19:22,819 --> 01:19:26,579
at Chicago, who their claim to fame was in the 90s.

1912
01:19:26,579 --> 01:19:28,340
They figured out if you put the database server

1913
01:19:28,340 --> 01:19:30,380
on the floor above the stock exchange,

1914
01:19:30,380 --> 01:19:32,500
you make money faster.

1915
01:19:32,500 --> 01:19:33,900
They obviously did a lot more stuff since then,

1916
01:19:33,900 --> 01:19:36,300
but this thing they were telling me they would do

1917
01:19:36,779 --> 01:19:37,779
was insane.

1918
01:19:37,779 --> 01:19:40,699
We're talking about digging trenches to run their own fiber

1919
01:19:40,699 --> 01:19:43,420
out to cables, because that'll get them five milliseconds less.

1920
01:19:43,420 --> 01:19:47,180
Because again, in their world, that matters a lot.

1921
01:19:47,180 --> 01:19:51,659
So the way Spain is going to do is going to break the database

1922
01:19:51,659 --> 01:19:53,060
up into what they call tablets.

1923
01:19:53,060 --> 01:19:54,539
These are just partitions.

1924
01:19:54,539 --> 01:19:56,420
And they're going to use Paxos to do leader election

1925
01:19:56,420 --> 01:19:57,539
in the tablet group.

1926
01:19:57,539 --> 01:20:01,980
But then if I have to update data across multiple tablets,

1927
01:20:01,980 --> 01:20:04,980
then it'll just use regular two-phase commit for this.

1928
01:20:04,979 --> 01:20:06,500
So visually it looks like this.

1929
01:20:06,500 --> 01:20:08,899
You like to leader within my data center.

1930
01:20:08,899 --> 01:20:11,500
So there's the tablet and there's

1931
01:20:11,500 --> 01:20:13,139
replicate across different data centers.

1932
01:20:13,139 --> 01:20:15,579
There's some data center that's a leader.

1933
01:20:15,579 --> 01:20:18,179
All reason rights have to go to this guy.

1934
01:20:18,179 --> 01:20:21,219
And then use Paxos to propagate them to everyone else.

1935
01:20:21,219 --> 01:20:23,379
And then any snapshot reads, which again,

1936
01:20:23,379 --> 01:20:25,539
think of like existing snapshot on time,

1937
01:20:25,539 --> 01:20:30,419
I can then run on the non-leader tablets

1938
01:20:30,419 --> 01:20:32,219
to read any data that they have.

1939
01:20:32,219 --> 01:20:33,299
But if I have a transaction that's

1940
01:20:33,300 --> 01:20:35,300
updated another tablet group, whether or not

1941
01:20:35,300 --> 01:20:37,140
send my same data center or not, and they're

1942
01:20:37,140 --> 01:20:39,180
well, they're replicating across multiple data centers,

1943
01:20:39,180 --> 01:20:41,980
I'm going to use two-phase commit to then do updates that

1944
01:20:41,980 --> 01:20:45,260
get propagated to those other tablets, which then go to their leader

1945
01:20:45,260 --> 01:20:48,820
who then propagates those changes using Paxos.

1946
01:20:48,820 --> 01:20:50,779
So this is a good example where the things

1947
01:20:50,779 --> 01:20:53,380
aren't mutually exclusive like Paxos and two-phase commit.

1948
01:20:53,380 --> 01:20:56,539
You can use a combination of both of them.

1949
01:20:56,539 --> 01:20:59,180
Those systems just do one or the other.

1950
01:20:59,940 --> 01:21:04,300
All right, I'm going to skip this slide.

1951
01:21:04,300 --> 01:21:07,460
This basically says how they guarantee

1952
01:21:07,460 --> 01:21:09,980
strict sterilized ability and due time sample.

1953
01:21:09,980 --> 01:21:12,420
So, all right, so there you go.

1954
01:21:12,420 --> 01:21:16,900
Three minutes to cover Paxos or sorry, to cover Spanner.

1955
01:21:16,900 --> 01:21:17,980
If you guys want to learn more about it,

1956
01:21:17,980 --> 01:21:18,940
we can vote for it.

1957
01:21:18,940 --> 01:21:22,220
We can cover it on the speed run at the end of the semester

1958
01:21:22,220 --> 01:21:23,060
next week.

1959
01:21:23,060 --> 01:21:27,659
All right, so the main takeaway from all this for this would

1960
01:21:27,979 --> 01:21:30,899
be that maintaining consistent view of the database

1961
01:21:30,899 --> 01:21:32,500
across multiple nodes is hard.

1962
01:21:33,619 --> 01:21:35,059
And it's important to get this right

1963
01:21:35,059 --> 01:21:37,139
because there will be failures.

1964
01:21:37,139 --> 01:21:39,579
Not just the machine goes down, but like weird things

1965
01:21:39,579 --> 01:21:41,220
that outside of your control, the purview of the data,

1966
01:21:41,220 --> 01:21:44,899
some like GC pauses or network hiccups that again,

1967
01:21:44,899 --> 01:21:47,500
so you have to prepare for all these things.

1968
01:21:47,500 --> 01:21:49,619
And then they said blockchains are waste of time

1969
01:21:49,619 --> 01:21:52,139
because most applications don't run in this world.

1970
01:21:52,139 --> 01:21:53,340
Bitcoin is the only really useful thing

1971
01:21:53,340 --> 01:21:54,779
you can use a blockchain for.

1972
01:21:54,779 --> 01:21:55,619
Right?

1973
01:21:56,460 --> 01:21:59,220
Most, you know, most people running transactions

1974
01:21:59,220 --> 01:22:01,340
are gonna trust people to, you know,

1975
01:22:01,340 --> 01:22:03,979
you're gonna trust the machines and trust the authority

1976
01:22:03,979 --> 01:22:05,340
because this is sort of how the real world works.

1977
01:22:05,340 --> 01:22:06,859
If you buy something, you give me your credit card number,

1978
01:22:06,859 --> 01:22:08,819
you trust them to go charge your credit card number.

1979
01:22:08,819 --> 01:22:11,260
All of those are to be trusted transactions.

1980
01:22:11,260 --> 01:22:12,619
And so you don't need blockchain.

1981
01:22:12,619 --> 01:22:14,939
So the overhead of gaining visiting fault tolerance

1982
01:22:14,939 --> 01:22:15,859
is unnecessary.

1983
01:22:16,819 --> 01:22:19,739
So, this self is super interesting to you.

1984
01:22:19,739 --> 01:22:23,579
There's a great blog article or blog from Skycow Kingsbury.

1985
01:22:23,619 --> 01:22:26,180
He has this thing called the Jepsen Project.

1986
01:22:26,180 --> 01:22:29,100
10 years ago at Stripe, he basically wrote a torture chamber

1987
01:22:30,220 --> 01:22:32,460
for distributed data bases to prove

1988
01:22:32,460 --> 01:22:35,859
that they don't achieve all the guarantees

1989
01:22:35,859 --> 01:22:36,979
that they're claiming.

1990
01:22:36,979 --> 01:22:38,460
They're not strong in the ecosystem,

1991
01:22:38,460 --> 01:22:40,100
they can't handle this kind of failure.

1992
01:22:40,100 --> 01:22:41,779
They can think of the context of the cap theorem.

1993
01:22:41,779 --> 01:22:45,140
Are they truly partitioned, tellin' or so forth?

1994
01:22:45,140 --> 01:22:47,059
And so his blog articles are fascinating.

1995
01:22:47,059 --> 01:22:48,140
They're very, very detailed

1996
01:22:48,140 --> 01:22:50,619
and they go into all the theories that occur.

1997
01:22:50,619 --> 01:22:52,659
He was really just doing this as a hobby,

1998
01:22:52,659 --> 01:22:54,579
but then now he's spun it off as a consultancy company.

1999
01:22:54,579 --> 01:22:56,819
So a bunch of the distributed data companies hire him

2000
01:22:56,819 --> 01:23:00,979
to then run his torture chamber on their data bases

2001
01:23:00,979 --> 01:23:03,300
and then he writes about all the failures.

2002
01:23:03,300 --> 01:23:05,300
And what's awesome is that a bunch of companies claim

2003
01:23:05,300 --> 01:23:07,539
that they could do this feature or that feature,

2004
01:23:07,539 --> 01:23:09,180
he comes in and destroys them.

2005
01:23:09,180 --> 01:23:10,899
And they have to change their marketing language

2006
01:23:10,899 --> 01:23:13,939
to reflect that like, oh yeah, we're not actually this

2007
01:23:13,939 --> 01:23:15,139
until they eventually actually fix it.

2008
01:23:15,139 --> 01:23:16,979
So again, this stuff is,

2009
01:23:18,539 --> 01:23:20,579
don't read this blog article.

2010
01:23:21,579 --> 01:23:22,739
You'll see why.

2011
01:23:22,739 --> 01:23:23,579
Okay.

2012
01:23:25,019 --> 01:23:26,659
Next week or sorry, next Wednesday,

2013
01:23:26,659 --> 01:23:27,659
oh, a lot of systems.

2014
01:23:27,659 --> 01:23:29,380
They ain't, we won't worry about transactions,

2015
01:23:29,380 --> 01:23:30,500
but the big problem we're gonna face now

2016
01:23:30,500 --> 01:23:32,739
is how do we do joins in a distributed environment?

2017
01:23:32,739 --> 01:23:33,739
Okay?

2018
01:23:33,739 --> 01:23:36,420
I wouldn't normally say hit it, he's not here, he's sick.

2019
01:23:37,260 --> 01:23:38,100
Yeah.

2020
01:23:38,100 --> 01:23:38,940
Yeah.

2021
01:23:38,940 --> 01:23:39,579
Now listen.

2022
01:23:39,579 --> 01:23:42,180
I'm the poppy with the motherfuckin hood up.

2023
01:23:42,180 --> 01:23:44,380
28th gram, depending on if it's cop-up.

2024
01:23:44,380 --> 01:23:45,739
You ain't hit a mob yet.

2025
01:23:45,739 --> 01:23:47,060
Still got your shut up.

2026
01:23:47,060 --> 01:23:49,340
I smack you with the bottom of the clip to tell you.

2027
01:23:49,340 --> 01:23:50,180
Look up.

2028
01:23:50,180 --> 01:23:51,779
Show me what it's safe set for.

2029
01:23:51,779 --> 01:23:53,420
I blow your finger up.

2030
01:23:53,420 --> 01:23:54,699
And I hit it, I hit it.

2031
01:23:54,699 --> 01:23:55,699
I hit it.

2032
01:23:55,699 --> 01:23:56,539
I hit it.

2033
01:23:56,539 --> 01:23:57,380
I hit it.

2034
01:23:57,380 --> 01:23:58,220
I hit it.

2035
01:23:58,220 --> 01:23:59,220
I hit it.

2036
01:23:59,220 --> 01:24:00,220
I hit it.

2037
01:24:00,220 --> 01:24:01,220
I hit it.

2038
01:24:01,220 --> 01:24:02,220
I hit it.

2039
01:24:02,220 --> 01:24:03,220
I hit it.

2040
01:24:03,220 --> 01:24:04,220
I hit it.

2041
01:24:04,220 --> 01:24:05,220
I hit it.

2042
01:24:05,220 --> 01:24:06,220
I hit it.

2043
01:24:06,220 --> 01:24:07,220
I hit it.

2044
01:24:07,220 --> 01:24:08,220
I hit it.

2045
01:24:08,220 --> 01:24:09,220
I hit it.

2046
01:24:09,220 --> 01:24:10,220
I hit it.

2047
01:24:10,220 --> 01:24:11,220
I hit it.

2048
01:24:11,220 --> 01:24:12,220
I hit it.

2049
01:24:12,220 --> 01:24:13,220
I hit it.

2050
01:24:13,220 --> 01:24:14,220
I hit it.

2051
01:24:14,220 --> 01:24:15,220
I hit it.

2052
01:24:15,220 --> 01:24:16,220
I hit it.

2053
01:24:16,220 --> 01:24:17,220
I hit it.

2054
01:24:17,220 --> 01:24:18,220
I hit it.

2055
01:24:18,220 --> 01:24:19,220
I hit it.

2056
01:24:19,220 --> 01:24:20,220
I hit it.

2057
01:24:20,220 --> 01:24:21,220
I hit it.

2058
01:24:21,220 --> 01:24:22,220
I hit it.

2059
01:24:22,220 --> 01:24:23,220
I hit it.

2060
01:24:23,220 --> 01:24:24,220
I hit it.

2061
01:24:24,220 --> 01:24:25,220
I hit it.

2062
01:24:25,220 --> 01:24:26,220
I hit it.

2063
01:24:26,220 --> 01:24:27,220
I hit it.

2064
01:24:27,220 --> 01:24:28,220
I hit it.

2065
01:24:28,220 --> 01:24:29,220
I hit it.

2066
01:24:29,220 --> 01:24:30,220
I hit it.

2067
01:24:30,220 --> 01:24:31,220
I hit it.

2068
01:24:31,220 --> 01:24:32,220
I hit it.

2069
01:24:32,220 --> 01:24:33,220
I hit it.

2070
01:24:33,220 --> 01:24:34,220
I hit it.

2071
01:24:34,220 --> 01:24:35,220
I hit it.

2072
01:24:35,220 --> 01:24:36,220
I hit it.

2073
01:24:36,220 --> 01:24:37,220
I hit it.

2074
01:24:37,220 --> 01:24:38,220
I hit it.

2075
01:24:38,220 --> 01:24:39,220
I hit it.

2076
01:24:39,220 --> 01:24:40,220
I hit it.

2077
01:24:40,220 --> 01:24:41,220
I hit it.

2078
01:24:41,220 --> 01:24:42,220
I hit it.

2079
01:24:42,220 --> 01:24:43,220
I hit it.

2080
01:24:43,220 --> 01:24:44,220
I hit it.

2081
01:24:44,220 --> 01:24:45,220
I hit it.

2082
01:24:45,220 --> 01:24:46,220
I hit it.

2083
01:24:46,220 --> 01:24:47,220
I hit it.

2084
01:24:47,220 --> 01:24:48,220
I hit it.

2085
01:24:48,220 --> 01:24:49,220
I hit it.

2086
01:24:49,220 --> 01:24:50,220
I hit it.

2087
01:24:50,220 --> 01:24:51,220
I hit it.

2088
01:24:51,220 --> 01:24:52,220
I hit it.

2089
01:24:52,220 --> 01:24:53,220
I hit it.

2090
01:24:53,220 --> 01:24:54,220
I hit it.

2091
01:24:54,220 --> 01:24:55,220
I hit it.

2092
01:24:55,220 --> 01:24:56,220
I hit it.

2093
01:24:56,220 --> 01:24:57,220
I hit it.

2094
01:24:57,220 --> 01:24:58,220
I hit it.

2095
01:24:58,220 --> 01:24:59,220
I hit it.

2096
01:24:59,220 --> 01:25:00,220
I hit it.

2097
01:25:00,220 --> 01:25:01,220
I hit it.

2098
01:25:01,220 --> 01:25:02,220
I hit it.

2099
01:25:02,220 --> 01:25:03,220
I hit it.

2100
01:25:03,220 --> 01:25:04,220
I hit it.

