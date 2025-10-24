---
title: CMU15721 P19S202419 SnowflakeDataWarehouseInternalsCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Carnegie Mellon University's Advanced Database Systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:15,000 --> 00:00:18,000
So today, again, we're continuing down the path of

4
00:00:18,000 --> 00:00:21,000
discussing about real world systems that are implementing

5
00:00:21,000 --> 00:00:24,000
the concept and ideas that we've talked about.

6
00:00:24,000 --> 00:00:27,000
So before we jump into today's lecture,

7
00:00:27,000 --> 00:00:30,000
again, some administrators that I posted some of this on

8
00:00:30,000 --> 00:00:33,000
Piazza, but I'm going to put it all in one place now.

9
00:00:33,000 --> 00:00:36,000
So the final presentations for the project is going to be when we have

10
00:00:36,000 --> 00:00:38,000
our scheduled final exam.

11
00:00:38,000 --> 00:00:40,000
I think it's in this room.

12
00:00:40,000 --> 00:00:43,000
It's scheduled to start on Thursday morning at 8.30am.

13
00:00:43,000 --> 00:00:45,000
That's f***ing we're not doing that.

14
00:00:45,000 --> 00:00:50,000
Let's start at 9am and we'll do donuts and bagels.

15
00:00:50,000 --> 00:00:52,000
We can decide what we want to do.

16
00:00:52,000 --> 00:00:55,000
And then the written final exam, that will be given out

17
00:00:55,000 --> 00:00:58,000
on April 24th, which I think is next week, next Wednesday.

18
00:00:58,000 --> 00:01:06,000
Again, that'll be a prompt to asking you a question about the

19
00:01:06,000 --> 00:01:09,000
treason encompass all the ideas that we've talked about

20
00:01:09,000 --> 00:01:10,000
throughout the entire semester.

21
00:01:10,000 --> 00:01:12,000
So it's not like multiple choice questions like,

22
00:01:12,000 --> 00:01:13,000
what does this paper say?

23
00:01:13,000 --> 00:01:14,000
What does that paper say?

24
00:01:14,000 --> 00:01:15,000
Because that's f***ing you.

25
00:01:15,000 --> 00:01:16,000
You can go figure that stuff out.

26
00:01:16,000 --> 00:01:20,000
It's more about synthesizing the ideas, again, that we've evolved

27
00:01:20,000 --> 00:01:23,000
the various things we've talked about and applying it to a new

28
00:01:23,000 --> 00:01:24,000
situation.

29
00:01:24,000 --> 00:01:27,000
Which is again, the main thing you want to get away, get out of this

30
00:01:27,000 --> 00:01:30,000
course, in addition to all development stuff you guys doing for the

31
00:01:30,000 --> 00:01:33,000
project, you can how to take all these ideas and see how they fit

32
00:01:33,000 --> 00:01:37,000
into the bigger picture of some data processing or data

33
00:01:37,000 --> 00:01:38,000
system.

34
00:01:38,000 --> 00:01:40,000
Okay?

35
00:01:40,000 --> 00:01:43,000
And again, that'll be due when we, the same day we have the final

36
00:01:43,000 --> 00:01:45,000
exam, you just show up and hand it to me.

37
00:01:45,000 --> 00:01:48,000
And then we'll do what we did a lot last year.

38
00:01:48,000 --> 00:01:51,000
You can use that TPP to help you answer the question.

39
00:01:51,000 --> 00:01:54,000
But obviously, if you're stupid and copy the prompt, you know,

40
00:01:54,000 --> 00:01:58,000
copy the output and put it right into your response without

41
00:01:58,000 --> 00:02:00,000
checking it, you're going to cause problems.

42
00:02:00,000 --> 00:02:01,000
This will be problems.

43
00:02:01,000 --> 00:02:03,000
At least last year when we put the question in, it said,

44
00:02:03,000 --> 00:02:05,000
I invented stuff which is not true.

45
00:02:05,000 --> 00:02:07,000
I'm sure you're not true.

46
00:02:07,000 --> 00:02:09,000
So be mindful of that.

47
00:02:09,000 --> 00:02:10,000
Okay?

48
00:02:10,000 --> 00:02:14,000
And then we'll also do what we did last year is you can, again,

49
00:02:14,000 --> 00:02:17,000
you won't, you're not penalized for this, you should have to

50
00:02:17,000 --> 00:02:18,000
do that.

51
00:02:18,000 --> 00:02:19,000
Because why wouldn't you?

52
00:02:19,000 --> 00:02:22,000
And it's the way things are going.

53
00:02:22,000 --> 00:02:27,000
But we'll do a, William will set up a, a, a, a Google

54
00:02:27,000 --> 00:02:30,000
form that I can't see and you just tell us whether you use

55
00:02:30,000 --> 00:02:32,000
chat GPD or not and then I'll try to predict whether you did

56
00:02:32,000 --> 00:02:33,000
it or not.

57
00:02:33,000 --> 00:02:34,000
Okay?

58
00:02:34,000 --> 00:02:35,000
Wow, that's fun.

59
00:02:35,000 --> 00:02:36,000
Okay?

60
00:02:36,000 --> 00:02:37,000
Any questions?

61
00:02:37,000 --> 00:02:40,000
Okay.

62
00:02:40,000 --> 00:02:45,000
So, do you know what's s*** is?

63
00:02:46,000 --> 00:02:48,000
You ever heard a s*** struggling language?

64
00:02:48,000 --> 00:02:49,000
Okay.

65
00:02:49,000 --> 00:02:50,000
All right.

66
00:02:50,000 --> 00:02:52,000
Let's check in.

67
00:02:52,000 --> 00:02:53,000
All right.

68
00:02:53,000 --> 00:02:55,000
I'll explain afterwards.

69
00:02:55,000 --> 00:02:56,000
All right.

70
00:02:56,000 --> 00:02:58,000
So again, last class we were talking about Databricks for

71
00:02:58,000 --> 00:02:59,000
Oton.

72
00:02:59,000 --> 00:03:00,000
Again, that wasn't a full-fledged system.

73
00:03:00,000 --> 00:03:03,000
That was an extension library that you would add that they,

74
00:03:03,000 --> 00:03:06,000
that the Databricks people added into Spark that the,

75
00:03:06,000 --> 00:03:09,000
the Java code running Spark SQL would then invoke through

76
00:03:09,000 --> 00:03:14,000
J&I and that was a C++ extra, C++ vectorized engine.

77
00:03:14,000 --> 00:03:17,000
That would try to offload the competition expensive tasks in

78
00:03:17,000 --> 00:03:20,000
when you're running a query in Spark SQL and push that it down to

79
00:03:20,000 --> 00:03:23,000
C++ and they showed pretty significant performance gains.

80
00:03:23,000 --> 00:03:26,000
So today again, when we talk about snowflake and, um,

81
00:03:26,000 --> 00:03:29,000
and we'll see this also in redshift, you know, these are going to be,

82
00:03:29,000 --> 00:03:32,000
you know, full-fledged systems that are going to look and smell

83
00:03:32,000 --> 00:03:34,000
a lot like a Dremel and other systems we've talked about throughout

84
00:03:34,000 --> 00:03:38,000
the entire semester and yellow brick as well.

85
00:03:38,000 --> 00:03:39,000
All right.

86
00:03:39,000 --> 00:03:42,000
So, just like before, before we jump into snowflake,

87
00:03:42,000 --> 00:03:45,000
uh, it's important to sort of, again, to take a step back and

88
00:03:45,000 --> 00:03:48,000
understand what the, what the, sort of, the landscape and the database

89
00:03:48,000 --> 00:03:52,000
will look like at the time that snowflake came on the scene.

90
00:03:52,000 --> 00:03:55,000
Um, and a lot of this, she gives repeating the things that we talked

91
00:03:55,000 --> 00:03:57,000
about throughout the entire semester.

92
00:03:57,000 --> 00:04:00,000
Um, so again, the, in the 2000s, that's when we saw the,

93
00:04:00,000 --> 00:04:04,000
the, these, these special purpose of specialized O-Lap systems

94
00:04:04,000 --> 00:04:07,000
that were built just around O-Lap, kind of O-Lap queries,

95
00:04:07,000 --> 00:04:09,000
we talked about in the entire semester, that they sort of came on the

96
00:04:09,000 --> 00:04:12,000
scene, uh, and for the most part, a lot of them were pushing this idea

97
00:04:12,000 --> 00:04:14,000
of, of a column store.

98
00:04:14,000 --> 00:04:18,000
Uh, it's a little before, I mean, vector wise came along in the

99
00:04:18,000 --> 00:04:21,000
later 2010s, but, you know, everyone sort of, operating column

100
00:04:21,000 --> 00:04:24,000
stores compressed data and then vectorized showed how to do vectorized

101
00:04:24,000 --> 00:04:26,000
processing on these things.

102
00:04:26,000 --> 00:04:29,000
So, of all these Vertica and Green Plum are probably the two biggest

103
00:04:29,000 --> 00:04:30,000
ones.

104
00:04:30,000 --> 00:04:33,000
Um, Moneti, we've talked about, and we'll talk about the scan amount of

105
00:04:33,000 --> 00:04:34,000
ducty-b.

106
00:04:34,000 --> 00:04:38,000
Right, ducty-b, the, the early version of ducty-b was Moneti-b light,

107
00:04:38,000 --> 00:04:41,000
which is a fork of this system, and we talked a little bit about that.

108
00:04:41,000 --> 00:04:43,000
Vector wise recovered in early semester.

109
00:04:43,000 --> 00:04:46,000
Park cell, we'll see again when we talk about redshift,

110
00:04:46,000 --> 00:04:48,000
because redshift wasn't written for that scratch on Amazon.

111
00:04:48,000 --> 00:04:51,000
They bought a license to the park, the park cell source code.

112
00:04:51,000 --> 00:04:54,000
Uh, and we'll see the transition that going from a shared nothing system

113
00:04:54,000 --> 00:04:58,000
that park cell was into, uh, into what redshift is today.

114
00:04:58,000 --> 00:05:02,000
So, of all of these except for vector wise Moneti-b, these are all forks

115
00:05:02,000 --> 00:05:04,000
of postgres.

116
00:05:04,000 --> 00:05:07,000
Uh, and they've ripped out the, you know, the storage layer and rewrote a lot

117
00:05:07,000 --> 00:05:11,000
of stuff to make it, you know, operate it on, uh, analytical workloads.

118
00:05:11,000 --> 00:05:13,000
And at the same time, this is all going on.

119
00:05:13,000 --> 00:05:17,000
Hadoop became popular, everybody was trying to shove a lot of data on

120
00:05:17,000 --> 00:05:22,000
HDFS, and it's data lakes before data lakes, uh, before, uh, that term came to

121
00:05:22,000 --> 00:05:23,000
prominence.

122
00:05:23,000 --> 00:05:25,000
Right, Hive, we talked about Presto and Paul and Stinger.

123
00:05:25,000 --> 00:05:29,000
So actually Stinger, written, it's basically Sting is in Paula, or actually,

124
00:05:29,000 --> 00:05:31,000
Sting is Hive.

125
00:05:31,000 --> 00:05:34,000
It's Seek on top of, uh, MapReduce and Hadoop.

126
00:05:34,000 --> 00:05:38,000
So all these systems at the time, right, in the various form, there's

127
00:05:38,000 --> 00:05:44,000
supporting analytical systems, but their primary, uh, uh, distribution model, like, the company,

128
00:05:44,000 --> 00:05:48,000
the vendor selling the data system, the primary way that you got access to these

129
00:05:48,000 --> 00:05:52,000
various data systems was by downloading it and running it on prem.

130
00:05:52,000 --> 00:05:55,000
So meaning you would buy a license to the source code, or sorry, buy a license to, to,

131
00:05:55,000 --> 00:05:59,000
the data system, but then you would provision the hardware and you would

132
00:05:59,000 --> 00:06:03,000
just want to run it on your local machines, right?

133
00:06:03,000 --> 00:06:07,000
And this, you know, pretty much how many of your RAM data systems were, for decades,

134
00:06:07,000 --> 00:06:09,000
prior to this.

135
00:06:09,000 --> 00:06:14,000
So as we talked about last, last week, the Dremel paper comes out in 2011, uh, and shows

136
00:06:14,000 --> 00:06:19,000
that, okay, you know, you can build something in a cloud sort of a native environment to run on

137
00:06:19,000 --> 00:06:22,000
a bunch of files that are sitting on these object stores, right?

138
00:06:22,000 --> 00:06:26,000
It's no longer native, uh, natively, the storage is no longer natively managed by the

139
00:06:26,000 --> 00:06:27,000
database system.

140
00:06:27,000 --> 00:06:30,000
Facebook also starts building Presto in 2012.

141
00:06:30,000 --> 00:06:34,000
Uh, again, Park Sales, we said this will discuss this next week, we talk about Redshift,

142
00:06:34,000 --> 00:06:41,000
but AWS buys a license to Park Sales in 2011 and then releases it in 2013 as Redshift.

143
00:06:41,000 --> 00:06:47,000
They actually beat Snowflake to the market, uh, by a couple of months, uh, where it's, but Snowflake,

144
00:06:47,000 --> 00:06:52,000
so I think it was written to scratch, uh, and Redshift was, again, was, was based on Park Sales.

145
00:06:52,000 --> 00:06:56,000
Park, I mean, I'll cover this next week. Park Sales basically going bankrupt, and they were

146
00:06:56,000 --> 00:07:00,000
hoping that Amazon was going to acquire them. Amazon does acquired the source of the license,

147
00:07:00,000 --> 00:07:05,000
and I forget who, I think, actually, and bought, uh, in a blind park sale.

148
00:07:05,000 --> 00:07:08,000
So it's still around, but like it's basically a zombie database.

149
00:07:08,000 --> 00:07:14,000
So around this same time, uh, there's a VC firm out of, uh, out of Silicon Valley,

150
00:07:14,000 --> 00:07:19,000
it's called Sutter Hill, um, when they, they decided to, hey, we're going to build a new cloud

151
00:07:19,000 --> 00:07:27,000
native database startup. Um, so they got these two guys that were, uh, you know, very prominent engineers

152
00:07:27,000 --> 00:07:33,000
at Oracle, and then the vector wise developer, uh, from the paper you guys read, Marzen Sikowski,

153
00:07:33,000 --> 00:07:37,000
from, you know, vector wise going under at the time. So they got him, they just got binding

154
00:07:37,000 --> 00:07:42,000
three together, gave him a ton of money and said, go build, you know, go build a cloud-dated cloud

155
00:07:42,000 --> 00:07:46,000
native warehouse, you know, we'll call it Snowflake. Sutter Hill is different than most of the

156
00:07:46,000 --> 00:07:50,000
VC firms you've probably been familiar with, like the, and Jason Horowitz, the Kleiner Perkins,

157
00:07:50,000 --> 00:07:56,000
Greylock and so forth. Right? That, their models is, or like, I have an idea, and you go to them,

158
00:07:56,000 --> 00:08:00,000
and you pitch them, and say, hey, give me money to go build a startup. Sutter Hill is basically

159
00:08:00,000 --> 00:08:04,000
like putting together a boy band at a record label. You say, let's get some good-looking people

160
00:08:04,000 --> 00:08:07,000
together, get them in a room, or give them money, and then they put out the almonds, right?

161
00:08:07,000 --> 00:08:11,000
So they're dictating what we should build. So that, that's how Snowflake sort of came about.

162
00:08:11,000 --> 00:08:15,000
Um, and so again, obviously Snowflake was super successful, because here we are talking

163
00:08:15,000 --> 00:08:21,000
about it, you know, 12 years later. So again, all these guys are super nice.

164
00:08:21,000 --> 00:08:27,000
So, uh, Marcin is, um, it's much younger than these two French guys here, but this is just

165
00:08:27,000 --> 00:08:30,000
really how hardcore they are about databases. Probably just, just hardcore as I am.

166
00:08:30,000 --> 00:08:36,000
So this is actually Marcin's leg. Uh, he has a Snowflake tattoo after they went IPO, right?

167
00:08:36,000 --> 00:08:40,000
That's, that's dedication to databases. I, I don't even know how that form.

168
00:08:41,000 --> 00:08:46,000
Alright, so what is Snowflake? Snowflake is going to be a managed OLAP database system written

169
00:08:46,000 --> 00:08:52,000
into a plus that is only going to run on in the cloud. And again, like this seems obvious today,

170
00:08:52,000 --> 00:08:59,000
but back then, 10 years ago, 12 years ago, this was, this was sort of unheard of for, for, for database systems, right?

171
00:08:59,000 --> 00:09:02,000
And certainly, you know, the, the Snowflake guys have told me they got a lot of pressure in the early days.

172
00:09:02,000 --> 00:09:07,000
Like, hey, we, great system, you know, can we download and run it on prem? We don't want to run in the cloud,

173
00:09:07,000 --> 00:09:12,000
and they, they said no. And then eventually everyone just, you know, moved to the cloud. And that's where, you know,

174
00:09:12,000 --> 00:09:18,000
if you're a new database startup today and you don't have a cloud, you know, a cloud offering with some exceptions,

175
00:09:18,000 --> 00:09:23,000
like DuckDB, then, although we'll see Mother Duck next class as well, like, it doesn't, you know,

176
00:09:23,000 --> 00:09:30,000
it's very hard to gain traction, right? So everything's, everything's been written from scratch.

177
00:09:30,000 --> 00:09:35,000
Uh, and the paper guys talk about like they were, you know, they considered like, oh, should we go tapings from like

178
00:09:35,000 --> 00:09:40,000
a do proco, do you think they think things from postgres, like other systems that have done? And they decided that

179
00:09:40,000 --> 00:09:45,000
in order to have complete control of everything, they wanted to write everything from scratch.

180
00:09:45,000 --> 00:09:52,000
They're going to be doing a shared disarchitecture as we talked about before. And then one thing that's going to be different than we saw in Dremel,

181
00:09:52,000 --> 00:09:56,000
and I think the photon paper doesn't really talk about this, but Spark SQL doesn't really do this,

182
00:09:56,000 --> 00:10:01,000
um, is that they're going to do aggressive compute side caching on the worker nodes themselves.

183
00:10:01,000 --> 00:10:07,000
Right? So, since, again, they're not the cloud vendor, it costs them real money to go get things from S3,

184
00:10:07,000 --> 00:10:12,000
which is obviously also very slow as well. They want to do as much caching as they can on their side,

185
00:10:12,000 --> 00:10:18,000
and it notes that they're already paying for to avoid those, those look up suit to S3. Right?

186
00:10:18,000 --> 00:10:25,000
Uh, the, the other interesting thing is that, rather than doing what most people do today, like taking the,

187
00:10:25,000 --> 00:10:31,000
the postgres SQL dialect, the grammar file, and using that as the basis to start your, you know,

188
00:10:31,000 --> 00:10:35,000
what kind of SQL you're going to support, they wrote everything from scratch.

189
00:10:35,000 --> 00:10:39,000
And it kind of looks, if you ever look at the documentation of Synophilic, it kind of looks a little orically orically,

190
00:10:39,000 --> 00:10:45,000
a little enterprisey, right? And I think that's, that's sort of the lineage of coming from,

191
00:10:45,000 --> 00:10:48,000
um, you know, the two wrench guys coming from Oracle.

192
00:10:48,000 --> 00:10:52,000
So, I just, I always had to say this, obviously there's not any impropriety,

193
00:10:52,000 --> 00:10:56,000
but, Snowflake actually sponsored this class in 721 before they went IPO.

194
00:10:56,000 --> 00:10:59,000
A lot of my best students went there and still worked there.

195
00:10:59,000 --> 00:11:05,000
Um, so like a she stood literally here and presented, uh, presented the Snowflake architecture back in the day.

196
00:11:05,000 --> 00:11:08,000
Um, so if you want, you can watch the guest lecture from, from back then.

197
00:11:08,000 --> 00:11:12,000
Um, and last year when I was putting this, this, uh, this lecture together,

198
00:11:12,000 --> 00:11:15,000
I had a bunch of questions like, could it, you know, it's a close-source system,

199
00:11:15,000 --> 00:11:18,000
you can't always infer exactly what they're doing based on the, the blogs and the documentation.

200
00:11:19,000 --> 00:11:21,000
Uh, so I actually had a phone call with the C-ish.

201
00:11:21,000 --> 00:11:25,000
This is Sunday night, but the day before the lecture, while he was like cooking in his kitchen,

202
00:11:25,000 --> 00:11:27,000
he's answering all my snowflake questions.

203
00:11:27,000 --> 00:11:30,000
So, the combination of what we're talking about today is from documentation,

204
00:11:30,000 --> 00:11:33,000
the paper you guys read, there's another paper as well,

205
00:11:33,000 --> 00:11:37,000
some blog articles and then well, they're asking a sheesh while he's cooking spaghetti,

206
00:11:37,000 --> 00:11:41,000
uh, what does Snowflake do? Um, these are good dude.

207
00:11:41,000 --> 00:11:45,000
Okay, so again, here's that high level, uh, bowl of points of all,

208
00:11:45,000 --> 00:11:48,000
everything that we care about in Snowflake that, you know, related to other systems,

209
00:11:48,000 --> 00:11:50,000
right? Again, not surprising.

210
00:11:50,000 --> 00:11:52,000
Share this, just add good storage.

211
00:11:52,000 --> 00:11:58,000
Again, they were the one of the first systems, uh, to, to, to commercialize this and pursue this.

212
00:11:58,000 --> 00:12:02,000
But again, that's, that's burning off a dream all done, burning off a wood, um,

213
00:12:02,000 --> 00:12:06,000
uh, you know, what HGFs and the dude were doing at the time.

214
00:12:06,000 --> 00:12:09,000
They're new push-based vectorized query processing, uh,

215
00:12:09,000 --> 00:12:13,000
they're relying on, uh, pre-compile primitives, similar to vector-wise X100.

216
00:12:13,000 --> 00:12:15,000
Again, not surprising.

217
00:12:15,000 --> 00:12:18,000
Marcin was the guy who built vector-wise.

218
00:12:18,000 --> 00:12:22,000
Uh, they're not going to do any cogen, except for, uh, for,

219
00:12:22,000 --> 00:12:26,000
serializing, deserializing the moon of data from workers or the another.

220
00:12:26,000 --> 00:12:29,000
They're using LAM for this, it's very limited thing like,

221
00:12:29,000 --> 00:12:32,000
I had some, some data I need to, to serialize, to a binary format,

222
00:12:32,000 --> 00:12:35,000
ship that over the wire, send it to another node.

223
00:12:35,000 --> 00:12:37,000
Again, this is like 2013, 2014.

224
00:12:37,000 --> 00:12:39,000
This is a four Apache arrow.

225
00:12:39,000 --> 00:12:43,000
So, to make this work fast, they would, they would have this little cogen piece that could,

226
00:12:43,000 --> 00:12:46,000
that you could compile it to send data over.

227
00:12:46,000 --> 00:12:50,000
It's somewhat, somewhat similar to like, what Protoboff would,

228
00:12:50,000 --> 00:12:52,000
would actually do for you as well.

229
00:12:52,000 --> 00:12:55,000
Uh, they're gonna make, they're gonna separate the table data from the met,

230
00:12:55,000 --> 00:12:57,000
the metadata, and we'll talk a little bit about this,

231
00:12:57,000 --> 00:13:00,000
because that opens up some opportunities for other organizations,

232
00:13:00,000 --> 00:13:04,000
um, and certainly different than, oh, I mean, now it's sort of commonplace,

233
00:13:04,000 --> 00:13:06,000
can you run something like hive catalog or whatever,

234
00:13:06,000 --> 00:13:08,000
or Databricks says they're a unique catalog.

235
00:13:08,000 --> 00:13:11,000
Uh, but this is certainly different from a single node system.

236
00:13:11,000 --> 00:13:14,000
There's not gonna be an explicit buffer pool in every single node.

237
00:13:14,000 --> 00:13:16,000
Uh, they're basically have ALRU cache aside,

238
00:13:16,000 --> 00:13:18,000
when things, move things in and out.

239
00:13:18,000 --> 00:13:21,000
But nothing really, uh, nothing fancy.

240
00:13:21,000 --> 00:13:24,000
Like everyone else, they can use packs, uh, clumb in our storage.

241
00:13:24,000 --> 00:13:26,000
Because again, they started before, like,

242
00:13:26,000 --> 00:13:29,000
Parkane or, or like, a, like a big thing,

243
00:13:29,000 --> 00:13:33,000
that, that they are now, they're gonna have the RIMPA Pireterage Storage format,

244
00:13:33,000 --> 00:13:35,000
that they'll have for, for managed data,

245
00:13:35,000 --> 00:13:38,000
but now, since the last five years or so,

246
00:13:38,000 --> 00:13:42,000
they're supporting all the, the open source file formats that we'd expect.

247
00:13:42,000 --> 00:13:44,000
I think they can use SortMars, John, but primarily,

248
00:13:44,000 --> 00:13:46,000
most of the time they're gonna pick cache join,

249
00:13:46,000 --> 00:13:48,000
as we talked about, it was always me better,

250
00:13:48,000 --> 00:13:50,000
and then they have a Cascade style query optimizer

251
00:13:50,000 --> 00:13:53,000
that, again, tries to leverage the depth of the optimizations that we talked about before.

252
00:13:53,000 --> 00:13:56,000
So, we're gonna mostly focus on these things,

253
00:13:56,000 --> 00:14:00,000
but I'll sprinkle in discussions as we go along for, for the other topics.

254
00:14:01,000 --> 00:14:04,000
So, the first thing is, what does the architecture look like?

255
00:14:04,000 --> 00:14:07,000
So, they are, obviously, again, they're gonna run on,

256
00:14:07,000 --> 00:14:09,000
uh, to say I got into storage,

257
00:14:09,000 --> 00:14:12,000
so this is just using an object store, uh, to leverage that.

258
00:14:12,000 --> 00:14:14,000
And again, the paper talks about how they,

259
00:14:14,000 --> 00:14:17,000
they made this decision early on when, when designing Snowflake,

260
00:14:17,000 --> 00:14:20,000
should they actually spend time building the storage layer,

261
00:14:20,000 --> 00:14:23,000
or should they just, uh, give up control and let, you know,

262
00:14:23,000 --> 00:14:27,000
just use S3 and let Amazon, uh, handle that for them.

263
00:14:27,000 --> 00:14:29,000
And part of that decision was, you know,

264
00:14:29,000 --> 00:14:30,000
it's from an engineering effort,

265
00:14:30,000 --> 00:14:33,000
you can only do so many things when you first start building a new system.

266
00:14:33,000 --> 00:14:36,000
They decided they would rather focus on, uh,

267
00:14:36,000 --> 00:14:38,000
the, you know, the execution engine,

268
00:14:38,000 --> 00:14:42,000
and leverage client-side caching, or sorry, worker-side caching,

269
00:14:42,000 --> 00:14:45,000
or compute-side caching, to speed things up,

270
00:14:45,000 --> 00:14:49,000
and just, you know, just let Amazon handle all the, you know,

271
00:14:49,000 --> 00:14:52,000
the replication and storage, uh,

272
00:14:52,000 --> 00:14:54,000
durability guarantees you would need.

273
00:14:54,000 --> 00:14:56,000
Um, because I think that turned out to be a smart choice.

274
00:14:56,000 --> 00:14:58,000
I think originally version, the original version,

275
00:14:58,000 --> 00:15:01,000
the only one is S3, and now this is what all the other major cloud

276
00:15:01,000 --> 00:15:03,000
vendors for their storage.

277
00:15:03,000 --> 00:15:07,000
So they're going to have this notion of, uh, yes.

278
00:15:07,000 --> 00:15:10,000
Um, some of the, you know, they're using Amazon

279
00:15:10,000 --> 00:15:12,000
and all these other companies that have their own databases,

280
00:15:12,000 --> 00:15:14,000
and would there be sort of a conflict of interest

281
00:15:14,000 --> 00:15:17,000
like they can do something to Snowflake, right?

282
00:15:17,000 --> 00:15:19,000
His question, the statement is, uh,

283
00:15:19,000 --> 00:15:22,000
if you're running on Amazon, Amazon has a competing product.

284
00:15:22,000 --> 00:15:23,000
Yeah.

285
00:15:23,000 --> 00:15:26,000
Like, are you, should you be afraid of Amazon,

286
00:15:26,000 --> 00:15:28,000
like trying to like do something to screw you over?

287
00:15:28,000 --> 00:15:31,000
It's a big company that's something.

288
00:15:31,000 --> 00:15:33,000
But I mean Snowflake's a big company too, right?

289
00:15:33,000 --> 00:15:35,000
I think they love business from Snowflake.

290
00:15:35,000 --> 00:15:41,000
Yeah, they make up, so, um, how to say this?

291
00:15:41,000 --> 00:15:43,000
Think about from a publicity standpoint,

292
00:15:43,000 --> 00:15:45,000
how terrible that would be for Amazon, be like,

293
00:15:45,000 --> 00:15:48,000
hey, we just like screwed over our biggest competitor,

294
00:15:48,000 --> 00:15:50,000
one of our biggest competitors, um,

295
00:15:50,000 --> 00:15:52,000
then like that would immediately panic all the other companies

296
00:15:52,000 --> 00:15:54,000
that are, you know, relying having an Amazon

297
00:15:54,000 --> 00:15:56,000
and make them go elsewhere.

298
00:15:56,000 --> 00:15:59,000
From a business standpoint, like a short-term gain,

299
00:15:59,000 --> 00:16:03,000
short-term benefit for long-term, you know, problems,

300
00:16:03,000 --> 00:16:05,000
it's just not worth it.

301
00:16:05,000 --> 00:16:07,000
Now, there are some companies we've talked to,

302
00:16:07,000 --> 00:16:09,000
at least in the start-up, where like, they should have told us,

303
00:16:09,000 --> 00:16:11,000
we don't run on Amazon because, you know,

304
00:16:11,000 --> 00:16:13,000
we can see, consider them a competitor,

305
00:16:13,000 --> 00:16:16,000
and so they have to run on GCP or something else.

306
00:16:16,000 --> 00:16:18,000
But again, Amazon's not stupid.

307
00:16:18,000 --> 00:16:21,000
They're not going to let, you know, I don't think they would,

308
00:16:21,000 --> 00:16:24,000
I like to think they would not make decisions like that.

309
00:16:24,000 --> 00:16:27,000
Now, so, I will say though, the way Amazon's going to get around this,

310
00:16:27,000 --> 00:16:31,000
so even though they may not make, um,

311
00:16:31,000 --> 00:16:34,000
you know, they may not make S3 slower,

312
00:16:34,000 --> 00:16:37,000
because they recognize it's a snowflake query or something.

313
00:16:37,000 --> 00:16:38,000
That would be terrible, right?

314
00:16:38,000 --> 00:16:39,000
It's not scalable.

315
00:16:39,000 --> 00:16:41,000
Though they can do other things like,

316
00:16:41,000 --> 00:16:44,000
not so much for, well, actually for RetroFullSeeders,

317
00:16:44,000 --> 00:16:46,000
they can add hardware accelerators

318
00:16:46,000 --> 00:16:49,000
and other things above S3, right?

319
00:16:49,000 --> 00:16:51,000
That's running on the same data center that, you know,

320
00:16:51,000 --> 00:16:54,000
maybe snowflake can't easily do to accelerate certain things.

321
00:16:54,000 --> 00:16:56,000
And they do this for Aurora as well, right?

322
00:16:56,000 --> 00:16:59,000
They push down, they have a layer above EDS

323
00:16:59,000 --> 00:17:02,000
that does transactional, uh, transaction uppropagations

324
00:17:02,000 --> 00:17:05,000
to replicas for, you know, post-gust in my SQL

325
00:17:05,000 --> 00:17:06,000
and you just can't get if you run it,

326
00:17:06,000 --> 00:17:08,000
if you're an external to Amazon.

327
00:17:08,000 --> 00:17:12,000
So there's other organizations you can do.

328
00:17:12,000 --> 00:17:15,000
Uh, with regard to adding support for AzureStore

329
00:17:15,000 --> 00:17:17,000
and the cost for it later, is that right?

330
00:17:17,000 --> 00:17:18,000
Yes.

331
00:17:18,000 --> 00:17:21,000
That something, then you're referring to like internally

332
00:17:21,000 --> 00:17:25,000
that we're using S3 to store all this troll image storage

333
00:17:25,000 --> 00:17:27,000
and then they switched over to a mix of the three

334
00:17:27,000 --> 00:17:31,000
or you're saying something more like they add a support

335
00:17:31,000 --> 00:17:34,000
to actually add a support to 19 views and give views.

336
00:17:34,000 --> 00:17:36,000
This question is like, when I say they add a support

337
00:17:36,000 --> 00:17:38,000
for like, say Google Cloud Storage, or Azure,

338
00:17:38,000 --> 00:17:42,000
does that mean that like, like if you're a new customer

339
00:17:42,000 --> 00:17:44,000
you show up and you start storing data into snowflake,

340
00:17:44,000 --> 00:17:47,000
that little spread of the cross-different data centers?

341
00:17:47,000 --> 00:17:49,000
No, I think you tell them when you sign up,

342
00:17:49,000 --> 00:17:51,000
like I want to run an AWS, I want to run on this.

343
00:17:51,000 --> 00:17:54,000
But it's still managed to do that.

344
00:17:54,000 --> 00:17:56,000
Who's them?

345
00:17:56,000 --> 00:17:58,000
So it still makes managed storage.

346
00:17:58,000 --> 00:17:59,000
Yes.

347
00:17:59,000 --> 00:18:01,000
So you're just saying like, do this other one?

348
00:18:01,000 --> 00:18:04,000
But the library here, which is to use one of the other?

349
00:18:04,000 --> 00:18:06,000
Uh, like why would you use the other cloud vendors?

350
00:18:06,000 --> 00:18:08,000
Yeah, there's companies that, like,

351
00:18:08,000 --> 00:18:12,000
we've talked to like a, they were a Canadian grocery store

352
00:18:12,000 --> 00:18:14,000
but like, we see Amazon as competitive.

353
00:18:14,000 --> 00:18:17,000
We don't run on Amazon, we run on Google, right?

354
00:18:17,000 --> 00:18:19,000
People have various reasons.

355
00:18:19,000 --> 00:18:23,000
But you can't like integrate it with existing data on an object store

356
00:18:23,000 --> 00:18:25,000
because it's going to manage.

357
00:18:25,000 --> 00:18:26,000
No, we'll get to that in a second.

358
00:18:26,000 --> 00:18:28,000
They, in the, like, we're leading up to it.

359
00:18:28,000 --> 00:18:30,000
Like the original version of snowflake was like,

360
00:18:30,000 --> 00:18:33,000
okay, we're going to store things on S3,

361
00:18:33,000 --> 00:18:36,000
but the data we're storing, actually inside the buckets in S3,

362
00:18:36,000 --> 00:18:38,000
it's our proprietary data format.

363
00:18:38,000 --> 00:18:41,000
Because at the time, that's how everyone built these data warehouses.

364
00:18:41,000 --> 00:18:44,000
Now Dremel was doing its own thing, right?

365
00:18:44,000 --> 00:18:47,000
Uh, but, you know, it wasn't,

366
00:18:47,000 --> 00:18:50,000
it wasn't until like, Parkay and other things came along.

367
00:18:50,000 --> 00:18:52,000
People, people, people, people, people, people, oh yeah.

368
00:18:52,000 --> 00:18:54,000
Like, I can have my disparate system generate a bunch of these files

369
00:18:54,000 --> 00:18:56,000
and I want to be able to scan it with my database system.

370
00:18:56,000 --> 00:18:59,000
That precipitated them having to support external tables

371
00:18:59,000 --> 00:19:02,000
or other things to, to be able to read data from,

372
00:19:02,000 --> 00:19:04,000
from S3 that are, you know, that, that wasn't ingested

373
00:19:04,000 --> 00:19:06,000
through the front of the data system.

374
00:19:06,000 --> 00:19:09,000
Right, so it's going to go through the same transformation as well.

375
00:19:15,000 --> 00:19:17,000
So the question is, at this point,

376
00:19:17,000 --> 00:19:20,000
why does snowflake not build their S3?

377
00:19:20,000 --> 00:19:23,000
Above my pay grade, I don't know.

378
00:19:23,000 --> 00:19:24,000
Like,

379
00:19:24,000 --> 00:19:27,000
Yeah, the data center is.

380
00:19:27,000 --> 00:19:29,000
Yeah, you have to have done data centers.

381
00:19:29,000 --> 00:19:31,000
I'll be excessive.

382
00:19:31,000 --> 00:19:32,000
What that?

383
00:19:32,000 --> 00:19:33,000
And like,

384
00:19:33,000 --> 00:19:34,000
I mean, they're not stupid.

385
00:19:34,000 --> 00:19:36,000
I guarantee they did the back of the envelope calculations.

386
00:19:36,000 --> 00:19:39,000
Like, does this actually make sense or not, right?

387
00:19:39,000 --> 00:19:41,000
I think next Netflix did something similar.

388
00:19:41,000 --> 00:19:43,000
They realized that like,

389
00:19:43,000 --> 00:19:45,000
I think they were running on-prem and then they went,

390
00:19:45,000 --> 00:19:46,000
they switched to the data centers.

391
00:19:46,000 --> 00:19:48,000
Like, the big company is always trying to figure out,

392
00:19:48,000 --> 00:19:49,000
is it cheaper to do this?

393
00:19:49,000 --> 00:19:51,000
But think of it, if you're like snowflakes,

394
00:19:51,000 --> 00:19:52,000
snowflakes is a huge company, right?

395
00:19:52,000 --> 00:19:53,000
But it's not as big as Amazon.

396
00:19:53,000 --> 00:19:56,000
And how many data centers is snowflake building?

397
00:19:56,000 --> 00:19:58,000
One a year maybe, I don't know.

398
00:19:58,000 --> 00:20:02,000
Amazon's probably spinning up a new one, like every, every few months.

399
00:20:02,000 --> 00:20:07,000
Right? So, at economies of scale, they can just do way more efficiently than anyone else.

400
00:20:07,000 --> 00:20:10,000
So, the interesting data between the two virtual warehouses,

401
00:20:10,000 --> 00:20:12,000
is that being sent to,

402
00:20:12,000 --> 00:20:14,000
I know there's no in-memory in-memory shopper.

403
00:20:14,000 --> 00:20:17,000
Is the reason for that, that they don't have control over,

404
00:20:17,000 --> 00:20:19,000
they can't have the app, the hardware accelerator,

405
00:20:19,000 --> 00:20:20,000
and so they'll say,

406
00:20:20,000 --> 00:20:22,000
hey, they're all needs to do instances.

407
00:20:22,000 --> 00:20:25,000
Might work even memory in the shared data.

408
00:20:25,000 --> 00:20:26,000
The question is,

409
00:20:26,000 --> 00:20:27,000
I mean, we haven't got there yet.

410
00:20:27,000 --> 00:20:28,000
The question is,

411
00:20:28,000 --> 00:20:30,000
why are they going to allow worker nodes to talk to each other,

412
00:20:30,000 --> 00:20:31,000
rather than going through their shopper phase?

413
00:20:31,000 --> 00:20:32,000
Yeah.

414
00:20:32,000 --> 00:20:39,000
I think it's just from a,

415
00:20:39,000 --> 00:20:41,000
it's just a philosophical decision that, like,

416
00:20:41,000 --> 00:20:43,000
that's how they want to build it.

417
00:20:43,000 --> 00:20:44,000
Right?

418
00:20:44,000 --> 00:20:47,000
It's, there's pros and cons of both of them.

419
00:20:47,000 --> 00:20:48,000
Right?

420
00:20:48,000 --> 00:20:49,000
And actually, this is a good discussion.

421
00:20:49,000 --> 00:20:50,000
We can have this now.

422
00:20:50,000 --> 00:20:51,000
Like, you know, the shopper phase, it's nice,

423
00:20:51,000 --> 00:20:54,000
because here's this abstraction layer that I can just write things too.

424
00:20:54,000 --> 00:20:58,000
You know, it has some fault tolerant guarantees that they're not going to be able to do.

425
00:20:58,000 --> 00:20:59,000
Right.

426
00:20:59,000 --> 00:21:02,000
So, that's why I think it's not going to be able to do that.

427
00:21:02,000 --> 00:21:05,000
But now there's a whole other service I got to run with additional nodes,

428
00:21:05,000 --> 00:21:08,000
and essentially now making another copy of data.

429
00:21:08,000 --> 00:21:09,000
Right?

430
00:21:09,000 --> 00:21:10,000
So there's pros and cons,

431
00:21:10,000 --> 00:21:11,000
there's no free lunch.

432
00:21:11,000 --> 00:21:12,000
That's why I know, like,

433
00:21:12,000 --> 00:21:14,000
obviously it's no place only around the top.

434
00:21:14,000 --> 00:21:16,000
But there's companies up there that actually also want,

435
00:21:16,000 --> 00:21:18,000
maybe have some database on-prem,

436
00:21:18,000 --> 00:21:21,000
or maybe move workloads between the cloud and on-prem.

437
00:21:21,000 --> 00:21:23,000
Is there a big market to prevent,

438
00:21:23,000 --> 00:21:25,000
or is it just every cloud to change?

439
00:21:25,000 --> 00:21:27,000
I mean, this is not exactly the same as like,

440
00:21:27,000 --> 00:21:30,000
this is a big market where people are running on-prem databases.

441
00:21:30,000 --> 00:21:31,000
Yes.

442
00:21:33,000 --> 00:21:34,000
But like,

443
00:21:35,000 --> 00:21:37,000
the sales cycle is for those things,

444
00:21:37,000 --> 00:21:38,000
which is way different.

445
00:21:38,000 --> 00:21:41,000
Because you've got to, like, you know, go out and have, like,

446
00:21:41,000 --> 00:21:43,000
go fly out there and talk to the customer,

447
00:21:43,000 --> 00:21:45,000
like, you know, take them out to dinner,

448
00:21:45,000 --> 00:21:47,000
and that kind of crap, go golfing, you know,

449
00:21:47,000 --> 00:21:49,000
like, f***ing things in the 80s.

450
00:21:49,000 --> 00:21:50,000
Whereas, like, snowflake,

451
00:21:50,000 --> 00:21:51,000
and the data service model, like,

452
00:21:51,000 --> 00:21:52,000
hey, here's our website,

453
00:21:52,000 --> 00:21:55,000
gives you credit card and you're up and running.

454
00:21:55,000 --> 00:21:56,000
Right?

455
00:21:56,000 --> 00:21:58,000
So again, like, for small startups,

456
00:21:58,000 --> 00:21:59,000
sure, you can do that.

457
00:21:59,000 --> 00:22:00,000
But like, yeah, obviously, no banks can be like,

458
00:22:00,000 --> 00:22:02,000
oh, here's the credit card, just do it.

459
00:22:02,000 --> 00:22:05,000
Yeah, no, there is a huge market.

460
00:22:05,000 --> 00:22:06,000
I think that,

461
00:22:09,000 --> 00:22:11,000
I mean, just, there's everybody,

462
00:22:12,000 --> 00:22:15,000
I think the market of people going to the cloud

463
00:22:15,000 --> 00:22:17,000
is that percentage,

464
00:22:17,000 --> 00:22:19,000
that pie is growing at a martial-ledger rate

465
00:22:19,000 --> 00:22:21,000
than people spinning up stuff on-prem.

466
00:22:23,000 --> 00:22:25,000
Again, it's not just from terms of, like,

467
00:22:25,000 --> 00:22:27,000
don't think of this, like, the cost of, like,

468
00:22:27,000 --> 00:22:29,000
oh, if I ran it on-prem,

469
00:22:29,000 --> 00:22:31,000
I certainly can run it cheaper than what Amazon

470
00:22:31,000 --> 00:22:33,000
would charge me for machines, right?

471
00:22:33,000 --> 00:22:35,000
But then, like, then you've got to pay for humans

472
00:22:35,000 --> 00:22:37,000
to go actually and manage those things.

473
00:22:37,000 --> 00:22:39,000
So there's, like, pros and cons of all these.

474
00:22:39,000 --> 00:22:40,000
All right.

475
00:22:42,000 --> 00:22:43,000
Okay, so,

476
00:22:44,000 --> 00:22:46,000
right, so the abstraction, they're going to have data storage,

477
00:22:46,000 --> 00:22:49,000
they're going to have this notion of a virtual warehouse.

478
00:22:49,000 --> 00:22:52,000
Again, this is how they first designed it,

479
00:22:52,000 --> 00:22:55,000
where you basically say, I want to,

480
00:22:55,000 --> 00:22:57,000
you don't say exactly on our node,

481
00:22:57,000 --> 00:22:59,000
say I want to do this compute capacity,

482
00:22:59,000 --> 00:23:01,000
you say, here's some virtual data warehouse

483
00:23:01,000 --> 00:23:03,000
that I can have, give me an endpoint

484
00:23:03,000 --> 00:23:05,000
where I can start sending data into and run queries on.

485
00:23:05,000 --> 00:23:06,000
Right?

486
00:23:06,000 --> 00:23:09,000
They then, and so when you turn on a virtual data warehouse,

487
00:23:09,000 --> 00:23:11,000
whether or not you're running queries,

488
00:23:11,000 --> 00:23:13,000
you're always paying for it. Right?

489
00:23:13,000 --> 00:23:15,000
And we'll see how, to know if they could leverage that

490
00:23:15,000 --> 00:23:16,000
when they do the flexible compute,

491
00:23:16,000 --> 00:23:19,000
because they can steal all your cycles from these warehouses.

492
00:23:20,000 --> 00:23:22,000
In 2022, they added support for serverless deployments.

493
00:23:22,000 --> 00:23:25,000
So now basically the virtual data warehouse spins itself down

494
00:23:25,000 --> 00:23:27,000
if you're not running any queries,

495
00:23:27,000 --> 00:23:29,000
but obviously they charge a premium for that.

496
00:23:29,000 --> 00:23:31,000
Because now you're using more shared infrastructure

497
00:23:31,000 --> 00:23:35,000
at the cloud service's layer instead of spinning that up yourself.

498
00:23:35,000 --> 00:23:38,000
And then the cloud service's layer is just the catch-all phrase

499
00:23:38,000 --> 00:23:42,000
for the front end of the system that encompasses all the things

500
00:23:42,000 --> 00:23:44,000
that we've been talking about in the entire semester.

501
00:23:44,000 --> 00:23:46,000
Some coordinator, scheduler, the catalog, the query optimizer,

502
00:23:47,000 --> 00:23:49,000
all that is the entry point for queries.

503
00:23:49,000 --> 00:23:52,000
And let's see at the end of the semester, or sorry, in the class,

504
00:23:52,000 --> 00:23:55,000
the catalog is interesting because they're going to be built

505
00:23:55,000 --> 00:23:57,000
on another data system called FoundationDB

506
00:23:57,000 --> 00:24:01,000
that provides them transaction semantics for doing updates.

507
00:24:04,000 --> 00:24:07,000
All right, so now within a, at the compute layer,

508
00:24:07,000 --> 00:24:10,000
they have a notion of team, a worker node, and a worker process.

509
00:24:10,000 --> 00:24:13,000
And again, this is from 2012, 2013,

510
00:24:14,000 --> 00:24:17,000
so a worker node, at least in the original version,

511
00:24:17,000 --> 00:24:19,000
is just an EC2 instance.

512
00:24:19,000 --> 00:24:20,000
Right?

513
00:24:20,000 --> 00:24:22,000
This is for Docker, this is for Kubernetes.

514
00:24:22,000 --> 00:24:25,000
Docker is 2012, Kubernetes is 2014,

515
00:24:25,000 --> 00:24:30,000
but in 2012, you know, you had all EC2 instances.

516
00:24:30,000 --> 00:24:33,000
And so on that instance, this is where they're going to maintain

517
00:24:33,000 --> 00:24:38,000
the local cache on the attached storage device of that instance.

518
00:24:38,000 --> 00:24:40,000
So not reading and writing to EBS,

519
00:24:41,000 --> 00:24:44,000
it's always running on a local, or now the local SSD.

520
00:24:44,000 --> 00:24:45,000
Right?

521
00:24:46,000 --> 00:24:49,000
And this cache is going to be a combination of

522
00:24:49,000 --> 00:24:53,000
intermediate results that you're generating for a query-wise running,

523
00:24:53,000 --> 00:24:56,000
as well as some of the persistent files that you may be retrieving from S3.

524
00:24:57,000 --> 00:24:59,000
So the idea is that if another query shows up,

525
00:24:59,000 --> 00:25:01,000
it reads the same data that you just read from S3,

526
00:25:01,000 --> 00:25:03,000
I can read it from my local cache,

527
00:25:03,000 --> 00:25:06,000
which would be faster and cheaper than having to go

528
00:25:07,000 --> 00:25:11,000
to a round trip lookup on over S3 or whatever the object store is.

529
00:25:11,000 --> 00:25:12,000
Right?

530
00:25:12,000 --> 00:25:14,000
Again, we'll see this in a second.

531
00:25:14,000 --> 00:25:15,000
The way they're going to manage this,

532
00:25:15,000 --> 00:25:16,000
keep this everything consistent,

533
00:25:16,000 --> 00:25:19,000
or keep spread data out evenly,

534
00:25:19,000 --> 00:25:21,000
and be able to scale up and scale down

535
00:25:21,000 --> 00:25:25,000
without having to reshuffle everything as you would in a shared nothing architecture,

536
00:25:25,000 --> 00:25:27,000
is that they're going to rely on consistent hash,

537
00:25:27,000 --> 00:25:30,000
and to keep track of what worker node is responsible for,

538
00:25:30,000 --> 00:25:34,000
what persistent data on in their own cache.

539
00:25:36,000 --> 00:25:39,000
And then within the worker node, when a query shows up,

540
00:25:39,000 --> 00:25:42,000
the fire off a whole new worker process,

541
00:25:42,000 --> 00:25:46,000
literally like a spawn of a new process in the OS,

542
00:25:46,000 --> 00:25:50,000
and that's going to be executing whatever the task are for this query,

543
00:25:50,000 --> 00:25:54,000
and it can read write data to inmate results and other workers

544
00:25:54,000 --> 00:25:56,000
or out the S3,

545
00:25:56,000 --> 00:26:00,000
and then when the query is done, the process ends and goes away.

546
00:26:01,000 --> 00:26:02,000
Yes?

547
00:26:02,000 --> 00:26:04,000
It's like a tangential question,

548
00:26:04,000 --> 00:26:07,000
but you can have the EBS volume as the root device.

549
00:26:07,000 --> 00:26:09,000
So is that not like a low-oh,

550
00:26:09,000 --> 00:26:11,000
you mean the low-oh-reconnected?

551
00:26:11,000 --> 00:26:13,000
This question is, on ECT,

552
00:26:13,000 --> 00:26:15,000
you can have an EBS volume mounted as the root device.

553
00:26:15,000 --> 00:26:16,000
Yes, you have to, anyway,

554
00:26:16,000 --> 00:26:18,000
because if the AMI image has to spin up,

555
00:26:18,000 --> 00:26:21,000
but you still kind of locally attached SSD,

556
00:26:21,000 --> 00:26:23,000
that you can then use NVMe or whatever,

557
00:26:23,000 --> 00:26:25,000
2012 before that,

558
00:26:25,000 --> 00:26:26,000
that you can then read right locally.

559
00:26:26,000 --> 00:26:29,000
That's just another mountain of file system.

560
00:26:29,000 --> 00:26:31,000
And that's going to be way faster than EBS.

561
00:26:34,000 --> 00:26:35,000
Okay.

562
00:26:36,000 --> 00:26:40,000
Actually, so I don't know whether they've switched over to Kubernetes now.

563
00:26:40,000 --> 00:26:43,000
We'll see it in, we'll tell you what, yellow brick, the paper,

564
00:26:43,000 --> 00:26:44,000
they're all in on Kubernetes,

565
00:26:44,000 --> 00:26:47,000
and they make a big deal about how they're designed to run in the,

566
00:26:47,000 --> 00:26:52,000
in the sort of the Kubernetes infrastructure.

567
00:26:52,000 --> 00:26:54,000
I assume, now, they're not dumb,

568
00:26:54,000 --> 00:26:56,000
they're doing something very similar these days.

569
00:26:56,000 --> 00:26:58,000
Whether it's exactly Kubernetes or something else.

570
00:26:59,000 --> 00:27:01,000
It doesn't matter.

571
00:27:02,000 --> 00:27:03,000
All right.

572
00:27:03,000 --> 00:27:05,000
So when it actually starts running,

573
00:27:05,000 --> 00:27:07,000
they're going to be doing a push-based vectorized execution,

574
00:27:07,000 --> 00:27:09,000
again, using the pre-compiled primitives,

575
00:27:09,000 --> 00:27:11,000
with template and C++,

576
00:27:11,000 --> 00:27:13,000
based on the different data types that we've talked about.

577
00:27:13,000 --> 00:27:15,000
We've already mentioned that they're only doing code gen

578
00:27:15,000 --> 00:27:17,000
for when they serialized, and de-serialized data,

579
00:27:17,000 --> 00:27:19,000
going from one worker node to another.

580
00:27:19,000 --> 00:27:21,000
And as he mentioned,

581
00:27:21,000 --> 00:27:24,000
they're not going to do explicit shuffle between stages,

582
00:27:24,000 --> 00:27:26,000
and instead, the worker processes are going to be allowed

583
00:27:26,000 --> 00:27:28,000
to send data directly to,

584
00:27:28,000 --> 00:27:30,000
push the data directly to the next node,

585
00:27:30,000 --> 00:27:32,000
who's going to process it,

586
00:27:32,000 --> 00:27:34,000
or they keep it locally and keep processing it,

587
00:27:34,000 --> 00:27:36,000
if they're going up the pipeline as further,

588
00:27:36,000 --> 00:27:38,000
as needed.

589
00:27:38,000 --> 00:27:40,000
Right?

590
00:27:40,000 --> 00:27:42,000
So that means now,

591
00:27:42,000 --> 00:27:47,000
when if the worker node has all the intimate results,

592
00:27:47,000 --> 00:27:49,000
if it crashes, or there's a failure,

593
00:27:49,000 --> 00:27:51,000
there now isn't a,

594
00:27:51,000 --> 00:27:53,000
there isn't, it's not replicated,

595
00:27:53,000 --> 00:27:56,000
it's not being stored as an external service

596
00:27:56,000 --> 00:27:58,000
from the worker node.

597
00:27:58,000 --> 00:28:01,000
So that means the computation is lost.

598
00:28:01,000 --> 00:28:04,000
And unlike in Dremel and Spark,

599
00:28:04,000 --> 00:28:06,000
where if one worker goes down,

600
00:28:06,000 --> 00:28:09,000
then the coordinator then just invokes a new owner,

601
00:28:09,000 --> 00:28:11,000
hands off that task to another worker,

602
00:28:11,000 --> 00:28:13,000
which snowflake will do,

603
00:28:13,000 --> 00:28:15,000
which is kill the entire query,

604
00:28:15,000 --> 00:28:18,000
and then to restart it from the beginning.

605
00:28:18,000 --> 00:28:20,000
And that's actually how the people build

606
00:28:20,000 --> 00:28:22,000
their systems back in the day.

607
00:28:22,000 --> 00:28:23,000
I mentioned this before,

608
00:28:23,000 --> 00:28:24,000
with MapReduce,

609
00:28:24,000 --> 00:28:28,000
they were storing things on disk as they went along,

610
00:28:28,000 --> 00:28:31,000
but they had the ability to kill tasks,

611
00:28:31,000 --> 00:28:33,000
and re-exude things,

612
00:28:33,000 --> 00:28:36,000
and do basically partial retry.

613
00:28:36,000 --> 00:28:38,000
And in the snowflake world,

614
00:28:38,000 --> 00:28:41,000
they're not going to add any of that infrastructure,

615
00:28:41,000 --> 00:28:43,000
because that's additional engineering complexity.

616
00:28:43,000 --> 00:28:45,000
They're just going to make the decision,

617
00:28:45,000 --> 00:28:47,000
okay, well one worker failed,

618
00:28:47,000 --> 00:28:49,000
okay, just kill the whole thing and restart.

619
00:28:49,000 --> 00:28:51,000
Cosmer.

620
00:28:51,000 --> 00:28:52,000
Right?

621
00:28:52,000 --> 00:28:53,000
So obviously, you know,

622
00:28:53,000 --> 00:28:56,000
they're not killing nodes randomly, right?

623
00:28:56,000 --> 00:28:58,000
They have a blog article when they discussed like,

624
00:28:58,000 --> 00:29:00,000
okay, like, if a worker dies,

625
00:29:00,000 --> 00:29:01,000
they have to identify,

626
00:29:01,000 --> 00:29:02,000
is this something that we did,

627
00:29:02,000 --> 00:29:04,000
or is this a transit network failure?

628
00:29:04,000 --> 00:29:05,000
Right?

629
00:29:05,000 --> 00:29:08,000
In some cases, they can actually automatically roll you back

630
00:29:08,000 --> 00:29:10,000
to a previous version of snowflake,

631
00:29:10,000 --> 00:29:12,000
and rerun that query,

632
00:29:12,000 --> 00:29:15,000
rerun the query, see whether that solves the problem.

633
00:29:15,000 --> 00:29:16,000
The tricky thing also too is,

634
00:29:16,000 --> 00:29:18,000
like, if now you're ingesting new data,

635
00:29:18,000 --> 00:29:20,000
you want to make sure that the query winner reruns,

636
00:29:20,000 --> 00:29:23,000
like, is it seeing the same data that I had before?

637
00:29:23,000 --> 00:29:24,000
Question or?

638
00:29:24,000 --> 00:29:27,000
How often you query these queries fails?

639
00:29:27,000 --> 00:29:28,000
Is this the only way you say it?

640
00:29:28,000 --> 00:29:29,000
This question is how often queries fail?

641
00:29:29,000 --> 00:29:31,000
I mean, not that often.

642
00:29:31,000 --> 00:29:32,000
Right?

643
00:29:32,000 --> 00:29:35,000
Actually, they have a blog article I should link.

644
00:29:35,000 --> 00:29:37,000
I don't know if you have that number,

645
00:29:37,000 --> 00:29:39,000
but it's not like, you know, one out of ten.

646
00:29:39,000 --> 00:29:43,000
It's some way smaller fraction.

647
00:29:43,000 --> 00:29:44,000
Again, cos it's like,

648
00:29:44,000 --> 00:29:46,000
you're not running,

649
00:29:46,000 --> 00:29:47,000
again, just going back to the map-reduce world,

650
00:29:47,000 --> 00:29:49,000
like, her dude was talking about,

651
00:29:49,000 --> 00:29:51,000
okay, we're going to run this query,

652
00:29:51,000 --> 00:29:53,000
or this map-reduce job,

653
00:29:53,000 --> 00:29:55,000
1,000 of, like, cheap pizza box machines,

654
00:29:55,000 --> 00:29:57,000
like, the one-unit rack machines.

655
00:29:57,000 --> 00:29:59,000
And in that environment, yeah,

656
00:29:59,000 --> 00:30:01,000
one of them is going to go down.

657
00:30:01,000 --> 00:30:03,000
If a query is going to run for an hour,

658
00:30:03,000 --> 00:30:05,000
certainly one is going to go down.

659
00:30:05,000 --> 00:30:07,000
But, like, now, only these queries running so fast,

660
00:30:07,000 --> 00:30:10,000
you know, they're running on a small number of machines anyway.

661
00:30:10,000 --> 00:30:14,000
So, the likelihood of a failure is quite low.

662
00:30:14,000 --> 00:30:15,000
Yes?

663
00:30:15,000 --> 00:30:17,000
Does that come with scale?

664
00:30:17,000 --> 00:30:19,000
It doesn't come with scale, I mean, terms of what?

665
00:30:19,000 --> 00:30:21,000
I don't know what you can,

666
00:30:21,000 --> 00:30:22,000
I can't even know it.

667
00:30:22,000 --> 00:30:24,000
Yeah, so the question is, like,

668
00:30:24,000 --> 00:30:26,000
statement is like,

669
00:30:26,000 --> 00:30:28,000
statement is like, okay,

670
00:30:28,000 --> 00:30:30,000
if I'm saying, like, the more machines you have,

671
00:30:30,000 --> 00:30:32,000
the more likely one's going to fail,

672
00:30:32,000 --> 00:30:34,000
does that have some upper bound how many machines you would need?

673
00:30:34,000 --> 00:30:37,000
Again, it's so fast that I don't think you need

674
00:30:37,000 --> 00:30:40,000
thousands of machines to process petabytes of data.

675
00:30:40,000 --> 00:30:41,000
The problem is,

676
00:30:41,000 --> 00:30:42,000
because it wasn't slow.

677
00:30:42,000 --> 00:30:45,000
It was so slow that, like, because, right?

678
00:30:45,000 --> 00:30:47,000
Because it wasn't an query optimizer,

679
00:30:47,000 --> 00:30:49,000
and it was just doing this dumb-mat-produced shuffle,

680
00:30:49,000 --> 00:30:51,000
a map shuffle thing over and over again,

681
00:30:51,000 --> 00:30:53,000
no matter what the query actually was doing,

682
00:30:53,000 --> 00:30:55,000
it had no notion of, like, pipelines,

683
00:30:55,000 --> 00:30:57,000
unless someone wrote everything inside of, you know,

684
00:30:57,000 --> 00:30:59,000
this single map job.

685
00:30:59,000 --> 00:31:00,000
Again, I think it's,

686
00:31:00,000 --> 00:31:01,000
whereas, like, at the time,

687
00:31:01,000 --> 00:31:03,000
other parallel data systems, like,

688
00:31:03,000 --> 00:31:05,000
the verticals of the world,

689
00:31:05,000 --> 00:31:07,000
you know, they were running on,

690
00:31:07,000 --> 00:31:09,000
they need fewer nodes to compute the same amount of,

691
00:31:09,000 --> 00:31:10,000
you know, the same results,

692
00:31:10,000 --> 00:31:11,000
and less time.

693
00:31:11,000 --> 00:31:18,000
So one thing sort of like does do,

694
00:31:18,000 --> 00:31:21,000
even though on the shuffle phase,

695
00:31:21,000 --> 00:31:23,000
they can do work-stealing,

696
00:31:23,000 --> 00:31:25,000
and it's similar to the morsel stuff that we saw before,

697
00:31:25,000 --> 00:31:27,000
where, instead of a coordinator,

698
00:31:27,000 --> 00:31:29,000
like, in Dremel, recognizing that this guy's running slow,

699
00:31:29,000 --> 00:31:30,000
this task is running slow,

700
00:31:30,000 --> 00:31:33,000
let me kill him and let it fire up the task ourselves,

701
00:31:33,000 --> 00:31:36,000
the workers themselves, the worker processes, excuse me,

702
00:31:36,000 --> 00:31:39,000
they're looking for work to do,

703
00:31:39,000 --> 00:31:41,000
and so they recognize that for all the input files,

704
00:31:41,000 --> 00:31:42,000
they were told at the beginning of,

705
00:31:42,000 --> 00:31:45,000
here you need a process for this stage of the query plan.

706
00:31:45,000 --> 00:31:47,000
If it runs out of stuff to do,

707
00:31:47,000 --> 00:31:52,000
then they can go do quick lookups on other workers,

708
00:31:52,000 --> 00:31:53,000
running the same, you know,

709
00:31:53,000 --> 00:31:55,000
the same stages they are,

710
00:31:55,000 --> 00:31:56,000
and see whether they're falling behind

711
00:31:56,000 --> 00:31:58,000
and go steal files from them.

712
00:31:58,000 --> 00:32:03,000
But, and avoid, to avoid burdening the other worker nodes

713
00:32:03,000 --> 00:32:05,000
with sending the data from, you know,

714
00:32:05,000 --> 00:32:07,000
from their local locash data

715
00:32:08,000 --> 00:32:11,000
to the guy that's gonna do the steal the task from them,

716
00:32:11,000 --> 00:32:13,000
they always go out to S3,

717
00:32:13,000 --> 00:32:15,000
because the idea is that,

718
00:32:15,000 --> 00:32:17,000
if the node is already running behind,

719
00:32:17,000 --> 00:32:19,000
because it's slow for some reason,

720
00:32:19,000 --> 00:32:20,000
if now another node says,

721
00:32:20,000 --> 00:32:21,000
okay, yeah, you're running too slow,

722
00:32:21,000 --> 00:32:22,000
give me the data that you have,

723
00:32:22,000 --> 00:32:24,000
that's just gonna make it even slower,

724
00:32:24,000 --> 00:32:25,000
make things worse.

725
00:32:25,000 --> 00:32:28,000
So they make the conscientious decision that the node's gonna go out to S3,

726
00:32:28,000 --> 00:32:29,000
even though they pay for it,

727
00:32:29,000 --> 00:32:31,000
even though they have a local cache version,

728
00:32:31,000 --> 00:32:32,000
they'll go out to S3,

729
00:32:32,000 --> 00:32:36,000
because that avoids slowing things down even further.

730
00:32:37,000 --> 00:32:41,000
And then when this, this, the stealing worker goes against the data from S3,

731
00:32:41,000 --> 00:32:44,000
it can put any results in its local storage,

732
00:32:44,000 --> 00:32:45,000
just like before,

733
00:32:45,000 --> 00:32:46,000
but it's not gonna maintain the,

734
00:32:46,000 --> 00:32:48,000
the persistent files in its cache,

735
00:32:50,000 --> 00:32:52,000
beyond the, you know, the worker to stole,

736
00:32:52,000 --> 00:32:55,000
because, again, there's some high level organization through this consistent hashing

737
00:32:55,000 --> 00:32:57,000
that's deciding what worker node is responsible for,

738
00:32:57,000 --> 00:33:00,000
what file on, on S3.

739
00:33:00,000 --> 00:33:02,000
So, you know, the next time the query runs,

740
00:33:02,000 --> 00:33:03,000
it meets the same data,

741
00:33:03,000 --> 00:33:04,000
it wouldn't go to this,

742
00:33:04,000 --> 00:33:05,000
that node anyway,

743
00:33:05,000 --> 00:33:07,000
it would go back to the original one.

744
00:33:07,000 --> 00:33:08,000
Yes.

745
00:33:08,000 --> 00:33:11,000
So you said that the intermediate results are stored in local displays,

746
00:33:11,000 --> 00:33:12,000
how can you get from S3,

747
00:33:12,000 --> 00:33:15,000
unless you send it to it?

748
00:33:15,000 --> 00:33:16,000
So, it's at the end, what?

749
00:33:16,000 --> 00:33:19,000
So, when your work's seen from other nodes,

750
00:33:19,000 --> 00:33:21,000
I'm, that node's working on,

751
00:33:21,000 --> 00:33:23,000
so, the intermediate results,

752
00:33:23,000 --> 00:33:25,000
that were already on that local list,

753
00:33:25,000 --> 00:33:27,000
so, how can you get from S3?

754
00:33:27,000 --> 00:33:29,000
I say it is, like, if you're,

755
00:33:29,000 --> 00:33:32,000
if it's processing data from,

756
00:33:32,000 --> 00:33:34,000
it's not processing, like, the visual persistent files,

757
00:33:34,000 --> 00:33:37,000
instead, it's, it's reading from,

758
00:33:37,000 --> 00:33:40,000
it's reading from the intermediate results,

759
00:33:40,000 --> 00:33:42,000
how can you go to S3 and get it?

760
00:33:42,000 --> 00:33:43,000
Because you, you couldn't go to the other,

761
00:33:43,000 --> 00:33:45,000
the worker node that it got from, right?

762
00:33:45,000 --> 00:33:47,000
I remember, I treated the data.

763
00:33:47,000 --> 00:33:50,000
So then, you do set the start from the data,

764
00:33:50,000 --> 00:33:51,000
do you want to do that?

765
00:33:51,000 --> 00:33:53,000
No, no, no, no, so, like, so, like, though,

766
00:33:53,000 --> 00:33:55,000
if the worker node got, you know,

767
00:33:55,000 --> 00:33:57,000
worker node, and I'm slides here, or diagrams,

768
00:33:57,000 --> 00:33:59,000
if worker node X is running behind,

769
00:33:59,000 --> 00:34:02,000
but it got its data from worker node Y.

770
00:34:02,000 --> 00:34:04,000
Now, worker node Z is going to steal that data,

771
00:34:04,000 --> 00:34:06,000
it can go to worker node Y,

772
00:34:06,000 --> 00:34:08,000
and get those intermediate results.

773
00:34:08,000 --> 00:34:10,000
Or, if it's, again, if it's reading from persistent files,

774
00:34:10,000 --> 00:34:11,000
it would go to S3.

775
00:34:11,000 --> 00:34:14,000
I think the worker node can also spill to S3, as well.

776
00:34:14,000 --> 00:34:16,000
Like, if you just run it, it's facing entirely,

777
00:34:16,000 --> 00:34:18,000
then, the last case, let, you know,

778
00:34:18,000 --> 00:34:21,000
the fallback is to store things in S3, as well.

779
00:34:21,000 --> 00:34:25,000
All the workers know the problem,

780
00:34:25,000 --> 00:34:28,000
and they both cost the cost for the

781
00:34:28,000 --> 00:34:31,000
user and the user to use it,

782
00:34:31,000 --> 00:34:32,000
as a student.

783
00:34:32,000 --> 00:34:34,000
His question is, how can a worker know

784
00:34:34,000 --> 00:34:35,000
the progress of another worker,

785
00:34:35,000 --> 00:34:37,000
and identify that they're running behind?

786
00:34:37,000 --> 00:34:39,000
I don't know whether they talked to the coordinator,

787
00:34:39,000 --> 00:34:42,000
or they talked to the other worker, right?

788
00:34:42,000 --> 00:34:44,000
But, like, I don't, it's not broadcast,

789
00:34:44,000 --> 00:34:47,000
because, like, there'll be, there'll be, like, a heartbeat

790
00:34:47,000 --> 00:34:49,000
that, that, that, that, that, that, that, that,

791
00:34:49,000 --> 00:34:51,000
that broadcast, every so often, is, hey, look, I'm still alive,

792
00:34:51,000 --> 00:34:53,000
but he wouldn't say, like, I'm, here's my progress,

793
00:34:53,000 --> 00:34:54,000
I'm going along.

794
00:34:54,000 --> 00:34:57,000
So, it's either the coordinator, or the worker, you say,

795
00:34:57,000 --> 00:35:00,000
you know, give me something to do.

796
00:35:03,000 --> 00:35:05,000
Okay, so, okay, so, so, it's, so, it's,

797
00:35:05,000 --> 00:35:07,000
it's going to work-stealing, and, again,

798
00:35:07,000 --> 00:35:09,000
what I like about this paper is, like, they, they describe,

799
00:35:09,000 --> 00:35:11,000
like, here's why we did it this way,

800
00:35:11,000 --> 00:35:14,000
and they go a bit more details than, than, Dremel,

801
00:35:14,000 --> 00:35:17,000
and, uh, data for it's too.

802
00:35:18,000 --> 00:35:20,000
The other interesting thing they can support as well,

803
00:35:20,000 --> 00:35:22,000
is they, what they call, flexible compute.

804
00:35:22,000 --> 00:35:26,000
And, the idea here is that, because the, you know,

805
00:35:26,000 --> 00:35:28,000
the original model of Snow-Thick, was like,

806
00:35:28,000 --> 00:35:30,000
you, you define this virtual, what, data warehouse,

807
00:35:30,000 --> 00:35:32,000
that sort of sets up the number of compute nodes

808
00:35:32,000 --> 00:35:35,000
you're going to have, um, at the beginning,

809
00:35:35,000 --> 00:35:38,000
and that, those, unless you're using serverless,

810
00:35:38,000 --> 00:35:41,000
those, those machines are always running.

811
00:35:41,000 --> 00:35:44,000
So, maybe the case that, for any, some query shows up,

812
00:35:44,000 --> 00:35:45,000
you're actually under-provisioned,

813
00:35:45,000 --> 00:35:47,000
you don't have as much, uh, compute capacity,

814
00:35:47,000 --> 00:35:50,000
you actually need to run the query in a, in a timely manner.

815
00:35:50,000 --> 00:35:52,000
So, what they'll do is, they'll recognize,

816
00:35:52,000 --> 00:35:55,000
prior to running, they'll look at the query plan and identify,

817
00:35:55,000 --> 00:35:58,000
is there any part where, I think, the query plan,

818
00:35:58,000 --> 00:36:00,000
this, this portion of the query plan,

819
00:36:00,000 --> 00:36:03,000
is going to take a longer time than, than I, I would want.

820
00:36:03,000 --> 00:36:07,000
And, can I then, uh, hand off those, the tasks,

821
00:36:07,000 --> 00:36:09,000
for that part of the query plan, to other nodes,

822
00:36:09,000 --> 00:36:12,000
that I actually, the customer is actually not paying for,

823
00:36:12,000 --> 00:36:14,000
basically, think of, like, other, other idle customers,

824
00:36:14,000 --> 00:36:16,000
that, that have compute nodes that aren't using.

825
00:36:16,000 --> 00:36:18,000
And, if I can farm out part of the query plan,

826
00:36:18,000 --> 00:36:21,000
to those of those nodes, it's a win-win situation for everyone,

827
00:36:21,000 --> 00:36:23,000
because the query runs faster,

828
00:36:23,000 --> 00:36:25,000
snowflake is not spending any more money,

829
00:36:25,000 --> 00:36:27,000
because the customer is already paying for the,

830
00:36:27,000 --> 00:36:30,000
the, the, the, the, the, the, the, the, the customer,

831
00:36:30,000 --> 00:36:31,000
that you're borrowing machines from,

832
00:36:31,000 --> 00:36:35,000
they don't even know that, their machines are being used in this way,

833
00:36:35,000 --> 00:36:38,000
and that, when they run queries, they can leverage the same,

834
00:36:38,000 --> 00:36:41,000
uh, uh, spare capacity as well.

835
00:36:41,000 --> 00:36:43,000
So, let's say, again, so, say we have them,

836
00:36:43,000 --> 00:36:46,000
this side of the query plan here, uh, on the probe side of this join,

837
00:36:46,000 --> 00:36:48,000
it's wants to do with some large scan.

838
00:36:48,000 --> 00:36:52,000
So, snowflake can then split this up into two,

839
00:36:52,000 --> 00:36:56,000
uh, sort of, subplans that are going to be combined together

840
00:36:56,000 --> 00:36:57,000
with the union all.

841
00:36:57,000 --> 00:37:00,000
And so, here we have the, the, the, the portion of the query,

842
00:37:00,000 --> 00:37:03,000
uh, that's going to run on, on the, the customers,

843
00:37:03,000 --> 00:37:06,000
the customer initiate the query on their,

844
00:37:06,000 --> 00:37:08,000
data warehouse, their, their, their compute nodes.

845
00:37:08,000 --> 00:37:09,000
But this, this piece over here,

846
00:37:09,000 --> 00:37:12,000
this is going to run on, on the spare hardware.

847
00:37:12,000 --> 00:37:15,000
Again, item machines running in, you know,

848
00:37:15,000 --> 00:37:19,000
running in, running in the snowflake, uh, you know, ecosystem.

849
00:37:19,000 --> 00:37:22,000
So, but because these machines are controlled by the,

850
00:37:22,000 --> 00:37:24,000
the customer that's invoking the query,

851
00:37:24,000 --> 00:37:27,000
you can't write any, any, any results to the local disk,

852
00:37:27,000 --> 00:37:29,000
because at any moment, the customer could,

853
00:37:29,000 --> 00:37:32,000
the customer who owns these machines could start running the query,

854
00:37:32,000 --> 00:37:34,000
and you got to, Victor, all this right away.

855
00:37:34,000 --> 00:37:36,000
Right? It doesn't look good if like, hey, you know,

856
00:37:36,000 --> 00:37:38,000
you're a similar query. Uh, give me, give me 20 seconds,

857
00:37:38,000 --> 00:37:40,000
I got to finish up, you know, Joe's, Joe's query.

858
00:37:40,000 --> 00:37:42,000
Like, could, could people get pissed, right?

859
00:37:42,000 --> 00:37:46,000
So, what they'll do is, instead of writing the data to the local storage,

860
00:37:46,000 --> 00:37:51,000
they'll instead insert it as if it was a table back into S3.

861
00:37:51,000 --> 00:37:55,000
And then now, when I, when I, when I'm going to retrieve it again,

862
00:37:55,000 --> 00:37:58,000
uh, you know, the, the, the, the query operator above it,

863
00:37:58,000 --> 00:38:02,000
is just reading from S3 like it, like it was a regular table.

864
00:38:02,000 --> 00:38:04,000
Right?

865
00:38:04,000 --> 00:38:06,000
Actually going back here, this is actually,

866
00:38:06,000 --> 00:38:08,000
this is actually from, it's not like,

867
00:38:08,000 --> 00:38:11,000
so this is another example of the S3 information passion stuff we talked before.

868
00:38:11,000 --> 00:38:13,000
So they have this, you build the hash join, uh,

869
00:38:13,000 --> 00:38:15,000
sorry, you build the hash equal to the join,

870
00:38:15,000 --> 00:38:17,000
and they have this operator kind of a join filter.

871
00:38:17,000 --> 00:38:21,000
That's passing over the Bloom filter from, from the build side to the probe side.

872
00:38:21,000 --> 00:38:25,000
Right? It is, it's, they explicitly call it out as a separate operator called join filter.

873
00:38:25,000 --> 00:38:30,000
Right? Again, so, so this is just,

874
00:38:30,000 --> 00:38:32,000
because it's a manager's service,

875
00:38:32,000 --> 00:38:34,000
you're not running on prem, right?

876
00:38:34,000 --> 00:38:37,000
There's elasticity to the, the resources that are available,

877
00:38:37,000 --> 00:38:39,000
and again, they smartly recognize,

878
00:38:39,000 --> 00:38:43,000
okay, these machines are idle, uh, right now,

879
00:38:43,000 --> 00:38:46,000
we'll need to use them to make queries run faster.

880
00:38:46,000 --> 00:38:51,000
And this is all, again, all transparent to, to the customer.

881
00:38:51,000 --> 00:38:55,000
You can also use this for the, for basically, basically query result caching.

882
00:38:55,000 --> 00:38:57,000
Almost like, not exactly like a materialized view,

883
00:38:57,000 --> 00:38:59,000
because it's not going to automatically refresh,

884
00:38:59,000 --> 00:39:03,000
but you're, you're writing out the output of this query plan fragment

885
00:39:03,000 --> 00:39:06,000
into s3, you can then update the catalog and say,

886
00:39:06,000 --> 00:39:10,000
okay, we receive this query plan fragment again on, on these, these files.

887
00:39:10,000 --> 00:39:14,000
Here's some materialized result for it that you can then reuse.

888
00:39:14,000 --> 00:39:15,000
Yes?

889
00:39:16,000 --> 00:39:18,000
So, you have to be concerning the customers,

890
00:39:18,000 --> 00:39:21,000
but if the customers don't want to do that anywhere,

891
00:39:21,000 --> 00:39:24,000
then you have to do another customer, right?

892
00:39:24,000 --> 00:39:27,000
Let's go ahead and write the query,

893
00:39:27,000 --> 00:39:29,000
and you can just use it.

894
00:39:29,000 --> 00:39:30,000
Stay with us.

895
00:39:30,000 --> 00:39:31,000
Isn't this, um,

896
00:39:31,000 --> 00:39:34,000
wouldn't this be concerning for customers?

897
00:39:34,000 --> 00:39:37,000
Because they don't want, they're dated in the mix with any of data.

898
00:39:37,000 --> 00:39:38,000
Well, one is they have,

899
00:39:38,000 --> 00:39:40,000
they have sort of compute isolation,

900
00:39:40,000 --> 00:39:41,000
because, as I said before,

901
00:39:41,000 --> 00:39:43,000
the worker process gets killed after the query.

902
00:39:43,000 --> 00:39:46,000
You know, you're whatever task you run for this query,

903
00:39:46,000 --> 00:39:49,000
wakes up and can now start seeing the next customer's data, right?

904
00:39:49,000 --> 00:39:51,000
It's a managed service,

905
00:39:51,000 --> 00:39:53,000
so it's not running arbitrary code,

906
00:39:53,000 --> 00:39:54,000
it's all snowflake code.

907
00:39:54,000 --> 00:39:56,000
So, if you're trusting snowflake with your data anyway,

908
00:39:56,000 --> 00:39:59,000
you could trust them to write the compute side of things.

909
00:39:59,000 --> 00:40:00,000
Um,

910
00:40:02,000 --> 00:40:03,000
okay?

911
00:40:03,000 --> 00:40:04,000
Ah.

912
00:40:07,000 --> 00:40:09,000
Yeah, it's not, it's not that big of a secret.

913
00:40:09,000 --> 00:40:10,000
And again,

914
00:40:10,000 --> 00:40:11,000
to your original point,

915
00:40:11,000 --> 00:40:12,000
I don't think it's not,

916
00:40:12,000 --> 00:40:14,000
I don't think it's a video concern, right?

917
00:40:14,000 --> 00:40:16,000
And if you really, I think you can opt out of this and say,

918
00:40:16,000 --> 00:40:17,000
like, I want to run in a,

919
00:40:17,000 --> 00:40:18,000
you know,

920
00:40:18,000 --> 00:40:20,000
I don't think it's anything that's in the mix.

921
00:40:20,000 --> 00:40:23,000
No, no, no, no, no, no.

922
00:40:23,000 --> 00:40:25,000
Right? This is not, this is not,

923
00:40:25,000 --> 00:40:26,000
this is not controversial.

924
00:40:26,000 --> 00:40:27,000
It's not in snowflake code,

925
00:40:27,000 --> 00:40:28,000
it should be.

926
00:40:28,000 --> 00:40:29,000
Yeah, it's running snowflake code,

927
00:40:29,000 --> 00:40:30,000
and you should be,

928
00:40:30,000 --> 00:40:31,000
no one,

929
00:40:31,000 --> 00:40:32,000
yeah, there's other,

930
00:40:32,000 --> 00:40:34,000
there's other things to be word out.

931
00:40:34,000 --> 00:40:35,000
And again, it's like,

932
00:40:35,000 --> 00:40:36,000
it's like,

933
00:40:36,000 --> 00:40:37,000
it's like the, the,

934
00:40:37,000 --> 00:40:38,000
the give of pen,

935
00:40:38,000 --> 00:40:39,000
right?

936
00:40:39,000 --> 00:40:40,000
So like, right now,

937
00:40:40,000 --> 00:40:41,000
my, my data warehouses,

938
00:40:41,000 --> 00:40:42,000
I'd also, yeah,

939
00:40:42,000 --> 00:40:44,000
if you could someone else take advantage of it, sure.

940
00:40:44,000 --> 00:40:45,000
But then went, you know,

941
00:40:45,000 --> 00:40:46,000
and when I need it,

942
00:40:46,000 --> 00:40:50,000
then I can leverage somebody else's.

943
00:40:50,000 --> 00:40:52,000
And it all works out.

944
00:40:52,000 --> 00:40:53,000
Yes.

945
00:40:53,000 --> 00:40:54,000
This is not unique to snowflake,

946
00:40:54,000 --> 00:40:55,000
right?

947
00:40:55,000 --> 00:40:56,000
Is it other than,

948
00:40:56,000 --> 00:40:57,000
other than some of these?

949
00:40:57,000 --> 00:40:58,000
It's question, this is not,

950
00:40:58,000 --> 00:40:59,000
you need to,

951
00:40:59,000 --> 00:41:00,000
I mean,

952
00:41:00,000 --> 00:41:01,000
it's like,

953
00:41:01,000 --> 00:41:02,000
you need to,

954
00:41:02,000 --> 00:41:03,000
I don't know.

955
00:41:03,000 --> 00:41:04,000
It's like,

956
00:41:04,000 --> 00:41:05,000
I think of examples,

957
00:41:05,000 --> 00:41:06,000
I feel like,

958
00:41:06,000 --> 00:41:07,000
I mean,

959
00:41:07,000 --> 00:41:08,000
there was a,

960
00:41:08,000 --> 00:41:10,000
there was a system out of the 80s that actually I worked on,

961
00:41:10,000 --> 00:41:11,000
it's called my pre-doc,

962
00:41:11,000 --> 00:41:12,000
this thing called Condor.

963
00:41:12,000 --> 00:41:14,000
And it was, it was called a cycle scavenger.

964
00:41:14,000 --> 00:41:15,000
It's basically,

965
00:41:15,000 --> 00:41:17,000
if you had a bunch of machines in your computer science department,

966
00:41:17,000 --> 00:41:18,000
at night,

967
00:41:18,000 --> 00:41:20,000
it would recognize that no one would touch the keyboard or the mouse.

968
00:41:20,000 --> 00:41:22,000
And then it would start running, you know,

969
00:41:22,000 --> 00:41:24,000
compute heavy jobs on the machines.

970
00:41:24,000 --> 00:41:25,000
And then when you,

971
00:41:25,000 --> 00:41:26,000
you came back the next morning,

972
00:41:26,000 --> 00:41:27,000
when you started using the mouse,

973
00:41:27,000 --> 00:41:29,000
there was a little small pause,

974
00:41:29,000 --> 00:41:30,000
like,

975
00:41:30,000 --> 00:41:31,000
it addicted to the jobs,

976
00:41:31,000 --> 00:41:32,000
but then like, you know,

977
00:41:32,000 --> 00:41:33,000
you got additional resources.

978
00:41:33,000 --> 00:41:34,000
So that,

979
00:41:34,000 --> 00:41:35,000
the idea of like,

980
00:41:35,000 --> 00:41:37,000
a cycle scavenging is not new.

981
00:41:37,000 --> 00:41:39,000
Specific for databases,

982
00:41:39,000 --> 00:41:43,000
again, I think what's different about this is because it's in the cloud,

983
00:41:43,000 --> 00:41:48,000
it's a single giant pool of all this compute capacity, right?

984
00:41:48,000 --> 00:41:54,000
That, that Snowflake has, has under its control that you can do this.

985
00:41:54,000 --> 00:41:56,000
Amazon does it differently, right?

986
00:41:56,000 --> 00:41:57,000
Amazon has spare EC2 resources,

987
00:41:57,000 --> 00:41:58,000
they try to sell them off as,

988
00:41:58,000 --> 00:41:59,000
as, as,

989
00:41:59,000 --> 00:42:00,000
as spot instances,

990
00:42:00,000 --> 00:42:01,000
at a low price.

991
00:42:01,000 --> 00:42:02,000
But of course,

992
00:42:02,000 --> 00:42:04,000
any time you could get evicted,

993
00:42:04,000 --> 00:42:06,000
because someone else wants to pay higher price.

994
00:42:06,000 --> 00:42:08,000
Um,

995
00:42:08,000 --> 00:42:10,000
in terms of databases that,

996
00:42:10,000 --> 00:42:12,000
doing something similar, um,

997
00:42:12,000 --> 00:42:16,000
uh,

998
00:42:16,000 --> 00:42:18,000
I'll have to cut this, right?

999
00:42:18,000 --> 00:42:20,000
Not exactly the same, but like,

1000
00:42:20,000 --> 00:42:23,000
yeah, taking advantage of idle resources is a different thing.

1001
00:42:23,000 --> 00:42:24,000
Oh, Carl, also too, like,

1002
00:42:24,000 --> 00:42:25,000
thinking of the data system,

1003
00:42:25,000 --> 00:42:27,000
like, you know, maybe not so much for the,

1004
00:42:27,000 --> 00:42:28,000
oh, that's, I can't,

1005
00:42:28,000 --> 00:42:29,000
we'll see some micro partitions.

1006
00:42:29,000 --> 00:42:31,000
Like, there's all background jobs,

1007
00:42:31,000 --> 00:42:32,000
you want to run anyway,

1008
00:42:32,000 --> 00:42:33,000
and you do this when you have downtime.

1009
00:42:33,000 --> 00:42:34,000
Right?

1010
00:42:34,000 --> 00:42:36,000
So it's, the idea is not far fetched.

1011
00:42:36,000 --> 00:42:37,000
Because again,

1012
00:42:37,000 --> 00:42:38,000
because they're in a cloud,

1013
00:42:38,000 --> 00:42:39,000
this opens up opportunity to,

1014
00:42:39,000 --> 00:42:42,000
you would not be able to get, uh,

1015
00:42:42,000 --> 00:42:45,000
uh, easily otherwise.

1016
00:42:48,000 --> 00:42:49,000
Okay.

1017
00:42:49,000 --> 00:42:50,000
So as I said before,

1018
00:42:50,000 --> 00:42:51,000
the,

1019
00:42:51,000 --> 00:42:53,000
they're going to rely on some object store,

1020
00:42:53,000 --> 00:42:55,000
typically, originally S3.

1021
00:42:55,000 --> 00:42:56,000
Um, but of course,

1022
00:42:56,000 --> 00:42:57,000
you know, there's downsides of this,

1023
00:42:57,000 --> 00:42:58,000
because this can be slower.

1024
00:42:58,000 --> 00:43:00,000
You have to go make requests over,

1025
00:43:00,000 --> 00:43:01,000
you know,

1026
00:43:02,000 --> 00:43:03,000
you can't do kernel bypass,

1027
00:43:03,000 --> 00:43:04,000
you got to go over the network,

1028
00:43:04,000 --> 00:43:05,000
make a HGPS recall,

1029
00:43:05,000 --> 00:43:07,000
call to their API.

1030
00:43:07,000 --> 00:43:08,000
That's got to get encrypted,

1031
00:43:08,000 --> 00:43:10,000
and decrypt it when it comes back.

1032
00:43:10,000 --> 00:43:11,000
Right?

1033
00:43:11,000 --> 00:43:12,000
That's expensive.

1034
00:43:12,000 --> 00:43:13,000
We'll see next week,

1035
00:43:13,000 --> 00:43:14,000
we talked about a yellow brick

1036
00:43:14,000 --> 00:43:15,000
that they're super hardcore about this,

1037
00:43:15,000 --> 00:43:17,000
and they wrote their own S3 drivers

1038
00:43:17,000 --> 00:43:18,000
that use kernel bypass

1039
00:43:18,000 --> 00:43:19,000
to go as fast as possible,

1040
00:43:19,000 --> 00:43:20,000
talking to S3.

1041
00:43:20,000 --> 00:43:22,000
I don't know whether S3 does it,

1042
00:43:22,000 --> 00:43:23,000
does something similar,

1043
00:43:23,000 --> 00:43:25,000
but you can imagine they have a lot of money that they could.

1044
00:43:25,000 --> 00:43:27,000
So instead of what they're going to do,

1045
00:43:27,000 --> 00:43:29,000
uh, in Snowflake is that,

1046
00:43:30,000 --> 00:43:32,000
instead of having to build their own,

1047
00:43:32,000 --> 00:43:33,000
uh, again, in their,

1048
00:43:33,000 --> 00:43:34,000
in their novice store,

1049
00:43:34,000 --> 00:43:35,000
or their own storage layer,

1050
00:43:35,000 --> 00:43:37,000
they're just going to build their own cache layer,

1051
00:43:37,000 --> 00:43:38,000
caching layer on the worker nodes,

1052
00:43:38,000 --> 00:43:39,000
uh,

1053
00:43:39,000 --> 00:43:41,000
and make that as fast as possible,

1054
00:43:41,000 --> 00:43:42,000
because now the benefit is,

1055
00:43:42,000 --> 00:43:44,000
if they do a really good job caching,

1056
00:43:44,000 --> 00:43:47,000
they end up paying less money to Amazon

1057
00:43:47,000 --> 00:43:49,000
because they're making fewer requests to S3,

1058
00:43:49,000 --> 00:43:51,000
but it also makes the queries run faster

1059
00:43:51,000 --> 00:43:52,000
because now you're,

1060
00:43:52,000 --> 00:43:53,000
you're not going to S3.

1061
00:43:53,000 --> 00:43:55,000
So it's like a winning-bearing situation for everyone,

1062
00:43:55,000 --> 00:43:57,000
uh, except maybe Amazon,

1063
00:43:57,000 --> 00:43:58,000
but like,

1064
00:43:58,000 --> 00:43:59,000
they have enough money.

1065
00:43:59,000 --> 00:44:00,000
Like, you know,

1066
00:44:00,000 --> 00:44:02,000
so I think this was a smart engineering,

1067
00:44:02,000 --> 00:44:03,000
uh, decision for them to do.

1068
00:44:03,000 --> 00:44:07,000
So it's a separate layer of nodes that are just like the cache?

1069
00:44:07,000 --> 00:44:08,000
No, the, the, the,

1070
00:44:08,000 --> 00:44:09,000
the question is,

1071
00:44:09,000 --> 00:44:10,000
is it a separate layer of nodes that are extra cached?

1072
00:44:10,000 --> 00:44:11,000
No, the worker nodes themselves,

1073
00:44:11,000 --> 00:44:12,000
have,

1074
00:44:12,000 --> 00:44:13,000
each have a,

1075
00:44:13,000 --> 00:44:14,000
have a local cache,

1076
00:44:14,000 --> 00:44:15,000
right?

1077
00:44:15,000 --> 00:44:16,000
And then if that cache fills,

1078
00:44:16,000 --> 00:44:18,000
they can then spill to S3,

1079
00:44:18,000 --> 00:44:20,000
if it's like an e-mere result,

1080
00:44:20,000 --> 00:44:21,000
right?

1081
00:44:21,000 --> 00:44:23,000
And then they're going to prioritize,

1082
00:44:23,000 --> 00:44:24,000
this paper talks about it,

1083
00:44:24,000 --> 00:44:25,000
I don't think the paper you guys read

1084
00:44:25,000 --> 00:44:26,000
talks about it,

1085
00:44:26,000 --> 00:44:28,000
they prioritize the persistent files,

1086
00:44:28,000 --> 00:44:31,000
sorry, they're going to prioritize the enemy results,

1087
00:44:31,000 --> 00:44:33,000
uh, keeping that local

1088
00:44:33,000 --> 00:44:35,000
versus going out to,

1089
00:44:35,000 --> 00:44:37,000
uh, versus maintaining,

1090
00:44:37,000 --> 00:44:39,000
uh, maintaining their persistent files.

1091
00:44:39,000 --> 00:44:40,000
Because the enemy results are a femoral,

1092
00:44:40,000 --> 00:44:42,000
you want to be able to get the map really quickly,

1093
00:44:42,000 --> 00:44:43,000
make the,

1094
00:44:43,000 --> 00:44:44,000
make the equation faster,

1095
00:44:44,000 --> 00:44:45,000
uh,

1096
00:44:45,000 --> 00:44:47,000
and so you want to use as much as your local storage,

1097
00:44:47,000 --> 00:44:49,000
and, and your local cache,

1098
00:44:49,000 --> 00:44:50,000
for those enemy results.

1099
00:44:50,000 --> 00:44:52,000
And they're not doing anything fancy,

1100
00:44:52,000 --> 00:44:54,000
they just talk about how they're using this LRU

1101
00:44:54,000 --> 00:44:55,000
to do cache from the present policy,

1102
00:44:55,000 --> 00:44:57,000
and that's good enough for,

1103
00:44:57,000 --> 00:44:59,000
for the work, their environment.

1104
00:44:59,000 --> 00:45:00,000
Yes.

1105
00:45:00,000 --> 00:45:02,000
So it's not like, let's say traditional local manager,

1106
00:45:02,000 --> 00:45:03,000
but like it's still like,

1107
00:45:03,000 --> 00:45:04,000
sort of a local manager,

1108
00:45:04,000 --> 00:45:06,000
but instead of like local engineers testing.

1109
00:45:06,000 --> 00:45:08,000
It's question, same it is,

1110
00:45:08,000 --> 00:45:10,000
like it's,

1111
00:45:10,000 --> 00:45:11,000
it's not like a pure,

1112
00:45:11,000 --> 00:45:12,000
not a traditional local manager,

1113
00:45:12,000 --> 00:45:13,000
where it's two layers,

1114
00:45:13,000 --> 00:45:15,000
either in memory or on disk.

1115
00:45:15,000 --> 00:45:16,000
It's multi-leared, yes.

1116
00:45:16,000 --> 00:45:17,000
It's either in memory,

1117
00:45:17,000 --> 00:45:18,000
on disk,

1118
00:45:18,000 --> 00:45:20,000
or S3.

1119
00:45:20,000 --> 00:45:21,000
And I think they talk about,

1120
00:45:21,000 --> 00:45:23,000
at least in this paper,

1121
00:45:24,000 --> 00:45:26,000
on 2020, this is before,

1122
00:45:26,000 --> 00:45:29,000
there was this sort of persistent memory work,

1123
00:45:29,000 --> 00:45:31,000
or devices that Intel was putting out,

1124
00:45:31,000 --> 00:45:32,000
and that was sort of seen as,

1125
00:45:32,000 --> 00:45:34,000
as another layer, like you had,

1126
00:45:34,000 --> 00:45:35,000
you had, you had,

1127
00:45:35,000 --> 00:45:36,000
DRAM memory,

1128
00:45:36,000 --> 00:45:38,000
then you would have persistent memory,

1129
00:45:38,000 --> 00:45:39,000
like Optane,

1130
00:45:39,000 --> 00:45:40,000
then you had SSD,

1131
00:45:40,000 --> 00:45:41,000
you know, you would have,

1132
00:45:41,000 --> 00:45:43,000
and then the S3.

1133
00:45:43,000 --> 00:45:44,000
Intel kept off the Optane,

1134
00:45:44,000 --> 00:45:45,000
so that's not a thing anymore,

1135
00:45:45,000 --> 00:45:47,000
but they talk about how like, you know,

1136
00:45:47,000 --> 00:45:50,000
having sort of a holistic view

1137
00:45:50,000 --> 00:45:52,000
of a multi-level cache,

1138
00:45:52,000 --> 00:45:54,000
is something that they're thinking about doing.

1139
00:45:59,000 --> 00:46:00,000
Okay, so again,

1140
00:46:00,000 --> 00:46:01,000
the original version of,

1141
00:46:01,000 --> 00:46:02,000
of snowflake,

1142
00:46:02,000 --> 00:46:03,000
or I guess by default,

1143
00:46:03,000 --> 00:46:05,000
when you put, when you put data in snowflake,

1144
00:46:05,000 --> 00:46:06,000
they're going to be using their own

1145
00:46:06,000 --> 00:46:08,000
proprietary storage format.

1146
00:46:08,000 --> 00:46:10,000
And again, this is before,

1147
00:46:10,000 --> 00:46:11,000
before, before, orc,

1148
00:46:11,000 --> 00:46:12,000
but at a high load,

1149
00:46:12,000 --> 00:46:13,000
it's going to look,

1150
00:46:13,000 --> 00:46:15,000
I've had students tell me that

1151
00:46:15,000 --> 00:46:17,000
it looks basically equivalent to Parquet and Orc.

1152
00:46:17,000 --> 00:46:18,000
Right?

1153
00:46:18,000 --> 00:46:19,000
It's using packs,

1154
00:46:19,000 --> 00:46:20,000
it's columnar storage,

1155
00:46:20,000 --> 00:46:21,000
you know,

1156
00:46:21,000 --> 00:46:22,000
it's doing dictionary encoding,

1157
00:46:22,000 --> 00:46:23,000
I think they're doing,

1158
00:46:23,000 --> 00:46:24,000
run length encoding.

1159
00:46:24,000 --> 00:46:25,000
Right? So that,

1160
00:46:25,000 --> 00:46:26,000
there's nothing dramatically different,

1161
00:46:26,000 --> 00:46:28,000
or special about what they're doing there,

1162
00:46:28,000 --> 00:46:29,000
other than it's proprietary to them.

1163
00:46:29,000 --> 00:46:30,000
Like, you couldn't,

1164
00:46:30,000 --> 00:46:31,000
you, they're not going to give you,

1165
00:46:31,000 --> 00:46:32,000
like, a binary file in the format,

1166
00:46:32,000 --> 00:46:33,000
because they wouldn't have,

1167
00:46:33,000 --> 00:46:35,000
there's no readers externally for these things.

1168
00:46:35,000 --> 00:46:37,000
But then one thing they're going to do

1169
00:46:37,000 --> 00:46:38,000
is, for any data that shows up,

1170
00:46:38,000 --> 00:46:39,000
they're going to break it up

1171
00:46:39,000 --> 00:46:40,000
into what they call micropartitions,

1172
00:46:40,000 --> 00:46:43,000
and I think this is roughly like a,

1173
00:46:43,000 --> 00:46:46,000
I'm just equivalent to like a row group

1174
00:46:46,000 --> 00:46:48,000
that we talked about in,

1175
00:46:48,000 --> 00:46:49,000
in Parquet.

1176
00:46:50,000 --> 00:46:52,000
And so the original data for micropartition

1177
00:46:52,000 --> 00:46:54,000
range up to 50 to 500 megs,

1178
00:46:54,000 --> 00:46:56,000
but after doing all of the compression stuff,

1179
00:46:56,000 --> 00:46:59,000
including, I think they run like a block-based compression,

1180
00:46:59,000 --> 00:47:00,000
like snappy or,

1181
00:47:00,000 --> 00:47:01,000
as the standard,

1182
00:47:01,000 --> 00:47:02,000
they'll get each,

1183
00:47:02,000 --> 00:47:05,000
each micropartition down to 16 megabytes.

1184
00:47:05,000 --> 00:47:07,000
Then in the background,

1185
00:47:07,000 --> 00:47:10,000
they're going to,

1186
00:47:10,000 --> 00:47:13,000
they're going to periodically check to see whether the,

1187
00:47:13,000 --> 00:47:16,000
the clustering of these micropartitions

1188
00:47:16,000 --> 00:47:17,000
is actually ideal,

1189
00:47:17,000 --> 00:47:19,000
and they can reorganize and,

1190
00:47:19,000 --> 00:47:21,000
and resort them based on how,

1191
00:47:21,000 --> 00:47:22,000
what, what,

1192
00:47:22,000 --> 00:47:23,000
what, what, what,

1193
00:47:23,000 --> 00:47:24,000
access key people,

1194
00:47:24,000 --> 00:47:26,000
people are using for queries.

1195
00:47:26,000 --> 00:47:27,000
So there's, there's,

1196
00:47:27,000 --> 00:47:28,000
there's, there's,

1197
00:47:28,000 --> 00:47:30,000
extra work that they're doing in the background

1198
00:47:30,000 --> 00:47:31,000
to, to optimize the,

1199
00:47:31,000 --> 00:47:32,000
the, the, the,

1200
00:47:32,000 --> 00:47:33,000
the storage,

1201
00:47:33,000 --> 00:47:35,000
when it's in the proprietary format.

1202
00:47:35,000 --> 00:47:37,000
And that's different than we talked about in Databricks

1203
00:47:37,000 --> 00:47:38,000
and Spark,

1204
00:47:38,000 --> 00:47:39,000
Spark SQL and,

1205
00:47:39,000 --> 00:47:40,000
and Dremel,

1206
00:47:40,000 --> 00:47:42,000
where they just assume that people

1207
00:47:42,000 --> 00:47:45,000
are putting random files on S3,

1208
00:47:45,000 --> 00:47:48,000
and they don't have the ability to go and rewrite them

1209
00:47:48,000 --> 00:47:50,000
and modify them and reorganize them.

1210
00:47:50,000 --> 00:47:51,000
And they just had to, you know,

1211
00:47:51,000 --> 00:47:54,000
run the query on directly as the files as they existed,

1212
00:47:54,000 --> 00:47:55,000
whereas in, in Snowflake,

1213
00:47:55,000 --> 00:47:57,000
again, using their internal format,

1214
00:47:57,000 --> 00:47:59,000
they can use the extra cycles to,

1215
00:47:59,000 --> 00:48:02,000
to this, this be things up.

1216
00:48:02,000 --> 00:48:03,000
But we'll see how they can,

1217
00:48:03,000 --> 00:48:05,000
you know,

1218
00:48:05,000 --> 00:48:06,000
they had to support external tables

1219
00:48:06,000 --> 00:48:08,000
and things where they can't do this.

1220
00:48:08,000 --> 00:48:09,000
I'll talk a little bit about how they,

1221
00:48:09,000 --> 00:48:12,000
how they handle that.

1222
00:48:12,000 --> 00:48:14,000
So now, one thing that is interesting

1223
00:48:14,000 --> 00:48:17,000
about Snowflake's proprietary format

1224
00:48:17,000 --> 00:48:20,000
is how they want to handle semi-structured data.

1225
00:48:20,000 --> 00:48:24,000
And so they have three types that are specific

1226
00:48:24,000 --> 00:48:26,000
or unique to Snowflake,

1227
00:48:26,000 --> 00:48:28,000
variant array and object.

1228
00:48:28,000 --> 00:48:30,000
Variant basically means anything,

1229
00:48:30,000 --> 00:48:32,000
like any kind of JSON hierarchy or something

1230
00:48:32,000 --> 00:48:33,000
that wrecks the smell,

1231
00:48:33,000 --> 00:48:35,000
think of like that.

1232
00:48:35,000 --> 00:48:36,000
Arrays as the sounds,

1233
00:48:36,000 --> 00:48:40,000
it's just an array of values of a arbitrary length.

1234
00:48:40,000 --> 00:48:41,000
And an object,

1235
00:48:41,000 --> 00:48:42,000
I think, is,

1236
00:48:42,000 --> 00:48:46,000
equivalent to the gender of a case of variant

1237
00:48:46,000 --> 00:48:49,000
where like it's a single level hierarchy,

1238
00:48:49,000 --> 00:48:54,000
whereas variant can go any arbitrary length or depth, right?

1239
00:48:54,000 --> 00:48:57,000
So in the case of the Dremel paper,

1240
00:48:57,000 --> 00:48:59,000
they talked about how they were trying to process

1241
00:48:59,000 --> 00:49:02,000
all these protobuff files that were internal to Google.

1242
00:49:02,000 --> 00:49:03,000
Well, if it's a protobuff file,

1243
00:49:03,000 --> 00:49:04,000
you have the schema.

1244
00:49:04,000 --> 00:49:07,000
You know the data types of the data,

1245
00:49:07,000 --> 00:49:09,000
the fields that are inside of them,

1246
00:49:09,000 --> 00:49:11,000
so they know how to convert them

1247
00:49:11,000 --> 00:49:13,000
into the proper binary format.

1248
00:49:13,000 --> 00:49:15,000
And doing this shredding or breaking out the separate columns

1249
00:49:15,000 --> 00:49:16,000
as we talked about.

1250
00:49:16,000 --> 00:49:18,000
In the case of Databricks and Photon,

1251
00:49:18,000 --> 00:49:21,000
they didn't have the schema for these files.

1252
00:49:21,000 --> 00:49:23,000
So the way they would handle that is

1253
00:49:23,000 --> 00:49:25,000
while the query was running,

1254
00:49:25,000 --> 00:49:27,000
that they would do this runtime at activity

1255
00:49:27,000 --> 00:49:30,000
where they would switch what version of a,

1256
00:49:30,000 --> 00:49:33,000
of a primitive they would use to say,

1257
00:49:33,000 --> 00:49:35,000
oh, I know processing, you know,

1258
00:49:35,000 --> 00:49:37,000
unicode data or ASCII data or date data

1259
00:49:37,000 --> 00:49:38,000
versus, you know,

1260
00:49:38,000 --> 00:49:40,000
there's random numbers, right?

1261
00:49:40,000 --> 00:49:43,000
And so they were trying to learn why they were running the query,

1262
00:49:43,000 --> 00:49:46,000
what the data type actually was for these different fields.

1263
00:49:46,000 --> 00:49:48,000
What Snowflick is going to do,

1264
00:49:48,000 --> 00:49:50,000
it's different, is that they're going to try to figure things out

1265
00:49:50,000 --> 00:49:51,000
upon ingestion.

1266
00:49:51,000 --> 00:49:55,000
And again, this is when you use their proprietary format,

1267
00:49:55,000 --> 00:49:59,000
you're calling insert into the database

1268
00:49:59,000 --> 00:50:01,000
or you're bulk loading some file.

1269
00:50:01,000 --> 00:50:03,000
So as they're processing it and putting it into

1270
00:50:03,000 --> 00:50:05,000
their internal format,

1271
00:50:05,000 --> 00:50:07,000
they're going to figure out what is the data type

1272
00:50:07,000 --> 00:50:09,000
for the different fields.

1273
00:50:09,000 --> 00:50:12,000
And so they'll do things like,

1274
00:50:12,000 --> 00:50:14,000
you know, if you identify your string,

1275
00:50:14,000 --> 00:50:17,000
like, you know, a year, a month, and the day,

1276
00:50:17,000 --> 00:50:19,000
well, they would parse that and recognize,

1277
00:50:19,000 --> 00:50:21,000
oh, this is actually in the proper date format,

1278
00:50:21,000 --> 00:50:23,000
so then they'll convert it automatically into,

1279
00:50:23,000 --> 00:50:26,000
you know, whatever the binary date format or time stamp format is.

1280
00:50:26,000 --> 00:50:28,000
But they're always going to maintain

1281
00:50:28,000 --> 00:50:30,000
the original unparsed version of all the strings

1282
00:50:30,000 --> 00:50:32,000
in your JSON file or whatever it is,

1283
00:50:32,000 --> 00:50:34,000
in case they get it wrong,

1284
00:50:34,000 --> 00:50:36,000
like if someone puts a poop emoji in there

1285
00:50:36,000 --> 00:50:38,000
and you're processing it and you've got to fall back

1286
00:50:38,000 --> 00:50:41,000
and say, okay, this is actually not what I thought it was.

1287
00:50:41,000 --> 00:50:42,000
Right?

1288
00:50:42,000 --> 00:50:44,000
So again, this is interesting.

1289
00:50:44,000 --> 00:50:47,000
This is, now you start to see the difference

1290
00:50:47,000 --> 00:50:49,000
between the different systems.

1291
00:50:49,000 --> 00:50:52,000
You know, Dremel is doing it in one way,

1292
00:50:52,000 --> 00:50:54,000
photon does another way, snowflakes are going to do it

1293
00:50:54,000 --> 00:50:55,000
upon ingestion.

1294
00:50:55,000 --> 00:50:57,000
And, you know, in a high level,

1295
00:50:57,000 --> 00:50:59,000
they're all doing vectorized query execution upon,

1296
00:50:59,000 --> 00:51:01,000
you know, on an object store,

1297
00:51:01,000 --> 00:51:03,000
but the low-level details and the nuances of them

1298
00:51:03,000 --> 00:51:05,000
are going to be slightly different.

1299
00:51:05,000 --> 00:51:07,000
So I'm not saying that this is a good idea or a bad idea.

1300
00:51:07,000 --> 00:51:10,000
I think it's for, if it's proprietary storage

1301
00:51:10,000 --> 00:51:12,000
and you can get the data as it comes in,

1302
00:51:12,000 --> 00:51:14,000
yeah, she should definitely do this because now you don't need,

1303
00:51:14,000 --> 00:51:16,000
like, you don't need to redo this over and over again

1304
00:51:16,000 --> 00:51:19,000
to figure out what the data type is while you're running the query.

1305
00:51:19,000 --> 00:51:21,000
And so you just do this parsing once

1306
00:51:21,000 --> 00:51:23,000
and you get all the advantages of compression and coding

1307
00:51:23,000 --> 00:51:25,000
that we talked about before.

1308
00:51:25,000 --> 00:51:26,000
Yes?

1309
00:51:26,000 --> 00:51:28,000
So, this is a Dremel question,

1310
00:51:28,000 --> 00:51:30,000
which now is in Dremel lecture,

1311
00:51:30,000 --> 00:51:32,000
which is that they were doing it to do it with expensive,

1312
00:51:32,000 --> 00:51:34,000
because that's what you do.

1313
00:51:34,000 --> 00:51:36,000
Is performance games maybe because this,

1314
00:51:36,000 --> 00:51:39,000
that they have this conversion done for the semi-future,

1315
00:51:39,000 --> 00:51:40,000
so I'm already...

1316
00:51:40,000 --> 00:51:43,000
So, your question, the Dremel one was what, that, sorry?

1317
00:51:43,000 --> 00:51:45,000
Was that in Dremel,

1318
00:51:45,000 --> 00:51:47,000
that they could take up,

1319
00:51:47,000 --> 00:51:50,000
that storage place could be anywhere,

1320
00:51:50,000 --> 00:51:53,000
that it didn't have to be in a specific format.

1321
00:51:53,000 --> 00:51:56,000
It could be from S3,

1322
00:51:56,000 --> 00:51:57,000
and I was like,

1323
00:51:57,000 --> 00:51:59,000
that there's extra cost and slope,

1324
00:51:59,000 --> 00:52:00,000
like, where's the result over here?

1325
00:52:00,000 --> 00:52:01,000
And this is the benefit?

1326
00:52:01,000 --> 00:52:03,000
Yeah, so his question is,

1327
00:52:03,000 --> 00:52:04,000
when we talk about Dremel,

1328
00:52:04,000 --> 00:52:06,000
Dremel talked about how,

1329
00:52:06,000 --> 00:52:11,000
rather than have people put data into a proper scheme of form,

1330
00:52:11,000 --> 00:52:13,000
where you know these data types,

1331
00:52:13,000 --> 00:52:17,000
and set all that up ahead of time when you load the data,

1332
00:52:17,000 --> 00:52:19,000
and then that way the query runs faster,

1333
00:52:19,000 --> 00:52:21,000
from an engineering and time perspective,

1334
00:52:21,000 --> 00:52:22,000
from a human side,

1335
00:52:22,000 --> 00:52:24,000
they were better to just people to store whatever follows they want,

1336
00:52:24,000 --> 00:52:26,000
and at runtime, the query engine will figure out

1337
00:52:26,000 --> 00:52:27,000
what the data type is.

1338
00:52:27,000 --> 00:52:28,000
Yes.

1339
00:52:28,000 --> 00:52:29,000
So, this is the opposite.

1340
00:52:29,000 --> 00:52:30,000
This is like,

1341
00:52:30,000 --> 00:52:31,000
you've got to give the data,

1342
00:52:31,000 --> 00:52:32,000
actually, it's not exactly the same,

1343
00:52:32,000 --> 00:52:33,000
because it's JSON,

1344
00:52:33,000 --> 00:52:35,000
you could throw any JSON you want in,

1345
00:52:35,000 --> 00:52:37,000
but then they're going to figure out

1346
00:52:37,000 --> 00:52:38,000
when you load it,

1347
00:52:38,000 --> 00:52:39,000
what the data type is.

1348
00:52:39,000 --> 00:52:40,000
So, at a high load,

1349
00:52:40,000 --> 00:52:41,000
they're achieving the same thing.

1350
00:52:41,000 --> 00:52:42,000
They're going to be saying,

1351
00:52:42,000 --> 00:52:43,000
like, okay, throw a word of data out,

1352
00:52:43,000 --> 00:52:44,000
we'll figure it out.

1353
00:52:44,000 --> 00:52:45,000
Snowflake's going to figure it out,

1354
00:52:45,000 --> 00:52:47,000
when it's inserted,

1355
00:52:47,000 --> 00:52:50,000
Dremel figures it out while it's running.

1356
00:52:50,000 --> 00:52:51,000
But again,

1357
00:52:51,000 --> 00:52:54,000
if it's parquet files or whatever,

1358
00:52:54,000 --> 00:52:56,000
random JSON files in S3,

1359
00:52:56,000 --> 00:52:57,000
and it's not in your proprietary format,

1360
00:52:57,000 --> 00:52:59,000
then you've got to do what Dremel does,

1361
00:52:59,000 --> 00:53:00,000
or photon is.

1362
00:53:00,000 --> 00:53:02,000
You kind of need,

1363
00:53:02,000 --> 00:53:03,000
ideally, both.

1364
00:53:03,000 --> 00:53:04,000
But if you know,

1365
00:53:04,000 --> 00:53:05,000
most of your data is not going to be

1366
00:53:05,000 --> 00:53:07,000
inserted directly into your file format,

1367
00:53:07,000 --> 00:53:09,000
you need to do what Dremel does.

1368
00:53:13,000 --> 00:53:14,000
All right, so the cases

1369
00:53:14,000 --> 00:53:15,000
that I mentioned before,

1370
00:53:15,000 --> 00:53:17,000
again, this is how they're going to use to,

1371
00:53:17,000 --> 00:53:19,000
this is how they're going to organize

1372
00:53:19,000 --> 00:53:21,000
this system to figure out what worker nodes are,

1373
00:53:21,000 --> 00:53:22,000
you know, quote unquote,

1374
00:53:22,000 --> 00:53:23,000
responsible,

1375
00:53:23,000 --> 00:53:28,000
or the owners of a micropartition file for a table.

1376
00:53:29,000 --> 00:53:31,000
I recovered consistent hashing in the,

1377
00:53:31,000 --> 00:53:32,000
in the intro class.

1378
00:53:32,000 --> 00:53:36,000
The basic idea is that it's a ring of a bunch of nodes,

1379
00:53:36,000 --> 00:53:39,000
and you can insert a new entry into the ring,

1380
00:53:39,000 --> 00:53:42,000
and only move the files from its predecessor,

1381
00:53:42,000 --> 00:53:45,000
and not reshuffle everything as if you were just doing,

1382
00:53:45,000 --> 00:53:47,000
sort of naive hashing.

1383
00:53:47,000 --> 00:53:49,000
So that means that when it query shows up,

1384
00:53:49,000 --> 00:53:51,000
the catalog is going to look at this,

1385
00:53:51,000 --> 00:53:52,000
this hash table,

1386
00:53:52,000 --> 00:53:54,000
figure out what file,

1387
00:53:54,000 --> 00:53:55,000
what workers or sounds for,

1388
00:53:55,000 --> 00:53:56,000
what files,

1389
00:53:56,000 --> 00:53:58,000
and then when it hands up the task,

1390
00:53:58,000 --> 00:53:59,000
it tells them,

1391
00:53:59,000 --> 00:54:00,000
okay, here's the files you need to process,

1392
00:54:00,000 --> 00:54:01,000
and it knows which ones,

1393
00:54:01,000 --> 00:54:03,000
you know, which ones, you know,

1394
00:54:03,000 --> 00:54:04,000
can compute that data,

1395
00:54:04,000 --> 00:54:06,000
and it knows that the likelihood that they'll have

1396
00:54:06,000 --> 00:54:07,000
locally cache data,

1397
00:54:07,000 --> 00:54:09,000
because the worker node,

1398
00:54:09,000 --> 00:54:11,000
that's responsible for some persistent file,

1399
00:54:11,000 --> 00:54:13,000
is the only one that can maintain

1400
00:54:13,000 --> 00:54:16,000
a long-term cache of that data.

1401
00:54:18,000 --> 00:54:19,000
And then you compute nodes,

1402
00:54:19,000 --> 00:54:21,000
which they say their customers do all the time,

1403
00:54:21,000 --> 00:54:23,000
then you don't have to,

1404
00:54:23,000 --> 00:54:24,000
you know,

1405
00:54:24,000 --> 00:54:26,000
you don't have to get everything,

1406
00:54:26,000 --> 00:54:28,000
get everything all over again from S3,

1407
00:54:28,000 --> 00:54:30,000
or pass every work on all their files around,

1408
00:54:30,000 --> 00:54:32,000
you can just go retrieve things,

1409
00:54:32,000 --> 00:54:35,000
and a more fine grain manner.

1410
00:54:35,000 --> 00:54:37,000
So this part is unique to Snowflake.

1411
00:54:37,000 --> 00:54:38,000
I think this part is clever,

1412
00:54:38,000 --> 00:54:39,000
and this is the right way to do this,

1413
00:54:39,000 --> 00:54:40,000
if you're going to build a,

1414
00:54:40,000 --> 00:54:41,000
you know, sort of,

1415
00:54:41,000 --> 00:54:43,000
a no-level system like this.

1416
00:54:45,000 --> 00:54:46,000
All right, so the query optimizer,

1417
00:54:46,000 --> 00:54:48,000
it's going to be a unified cascade style,

1418
00:54:48,000 --> 00:54:50,000
doing top-down optimization.

1419
00:54:51,000 --> 00:54:52,000
If you go read,

1420
00:54:52,000 --> 00:54:53,000
I think in the paper you guys read,

1421
00:54:53,000 --> 00:54:55,000
and if you go read the documentation,

1422
00:54:55,000 --> 00:54:57,000
they're going to refer to the query optimizer

1423
00:54:57,000 --> 00:54:58,000
as the compiler.

1424
00:54:58,000 --> 00:54:59,000
And as I said before,

1425
00:54:59,000 --> 00:55:01,000
that's a remnant of, like,

1426
00:55:01,000 --> 00:55:03,000
the vernacular from the 1970s,

1427
00:55:03,000 --> 00:55:05,000
because when people sort of built a first-seq compiler,

1428
00:55:05,000 --> 00:55:07,000
it was taking a high-level language like C

1429
00:55:07,000 --> 00:55:08,000
and converting it to assembly.

1430
00:55:08,000 --> 00:55:09,000
Same idea.

1431
00:55:09,000 --> 00:55:10,000
And in SQL,

1432
00:55:10,000 --> 00:55:11,000
you're taking a high-level language like SQL,

1433
00:55:11,000 --> 00:55:13,000
and converting it to the machine code

1434
00:55:13,000 --> 00:55:16,000
or the executable code of a database system.

1435
00:55:16,000 --> 00:55:18,000
So for, you know,

1436
00:55:18,000 --> 00:55:19,000
for historical reasons,

1437
00:55:20,000 --> 00:55:21,000
oracle, sorry,

1438
00:55:21,000 --> 00:55:23,000
still looks and call their thing a compiler.

1439
00:55:23,000 --> 00:55:26,000
So, they're not going to rely on,

1440
00:55:26,000 --> 00:55:30,000
just like Dremel and Databricks and Photon,

1441
00:55:30,000 --> 00:55:31,000
like, they're not,

1442
00:55:31,000 --> 00:55:33,000
they're soon they're not going to have GoSys 6.

1443
00:55:33,000 --> 00:55:35,000
Either because, I mean,

1444
00:55:35,000 --> 00:55:36,000
in the paper you guys read,

1445
00:55:36,000 --> 00:55:37,000
is before they had external tables,

1446
00:55:37,000 --> 00:55:38,000
but like,

1447
00:55:38,000 --> 00:55:40,000
if it's external tables,

1448
00:55:40,000 --> 00:55:42,000
you know nothing about potentially about the files.

1449
00:55:42,000 --> 00:55:43,000
But even if you,

1450
00:55:43,000 --> 00:55:44,000
if it's data been sorted

1451
00:55:44,000 --> 00:55:45,000
and you're in proprietary storage,

1452
00:55:45,000 --> 00:55:47,000
they assume that all the stats are going to be garbage,

1453
00:55:48,000 --> 00:55:50,000
and it can be changing and become stale over time,

1454
00:55:50,000 --> 00:55:52,000
that they're going to have their optimizer

1455
00:55:52,000 --> 00:55:54,000
try to operate as much as possible,

1456
00:55:54,000 --> 00:55:55,000
make decisions as much as possible,

1457
00:55:56,000 --> 00:55:59,000
without relying on high-quality statistics.

1458
00:55:59,000 --> 00:56:01,000
So they use some of the heuristic-based techniques

1459
00:56:01,000 --> 00:56:02,000
we talked about before,

1460
00:56:02,000 --> 00:56:03,000
like,

1461
00:56:03,000 --> 00:56:04,000
if it's a star schema,

1462
00:56:04,000 --> 00:56:05,000
do certain things,

1463
00:56:05,000 --> 00:56:07,000
versus other organizations,

1464
00:56:07,000 --> 00:56:08,000
of the schema.

1465
00:56:09,000 --> 00:56:10,000
But the optimizer's big,

1466
00:56:10,000 --> 00:56:13,000
the big goal that it's trying to achieve in the beginning,

1467
00:56:13,000 --> 00:56:15,000
is trying to decide which micro-partitions are files

1468
00:56:16,000 --> 00:56:17,000
that it can throw away,

1469
00:56:17,000 --> 00:56:18,000
as soon as possible,

1470
00:56:18,000 --> 00:56:20,000
before it even starts running.

1471
00:56:20,000 --> 00:56:22,000
And again, if you have some basic stats,

1472
00:56:22,000 --> 00:56:23,000
like some zone maps,

1473
00:56:23,000 --> 00:56:24,000
that'll scroll up in the catalog,

1474
00:56:24,000 --> 00:56:25,000
you can say,

1475
00:56:25,000 --> 00:56:26,000
well, I can look at my query plan,

1476
00:56:26,000 --> 00:56:27,000
I can look at my predicates and decide,

1477
00:56:27,000 --> 00:56:28,000
these are the files that I know

1478
00:56:28,000 --> 00:56:30,000
could never have the data that I'm actually needing,

1479
00:56:30,000 --> 00:56:31,000
I could ever need,

1480
00:56:31,000 --> 00:56:34,000
and therefore go ahead and skip it.

1481
00:56:34,000 --> 00:56:36,000
And like the other systems we talked about,

1482
00:56:36,000 --> 00:56:37,000
they're not staying rely on,

1483
00:56:37,000 --> 00:56:39,000
runtime activity to adjust their query plans,

1484
00:56:39,000 --> 00:56:40,000
as needed.

1485
00:56:40,000 --> 00:56:42,000
And we'll look at one example,

1486
00:56:42,000 --> 00:56:43,000
what they're doing.

1487
00:56:45,000 --> 00:56:48,000
So if you go through and insert data to snowflake

1488
00:56:48,000 --> 00:56:49,000
using the, again,

1489
00:56:49,000 --> 00:56:50,000
that ends up in the proprietary format,

1490
00:56:50,000 --> 00:56:52,000
they are going to have some basic stats,

1491
00:56:52,000 --> 00:56:55,000
but it's going to be simple things like zone maps,

1492
00:56:55,000 --> 00:56:56,000
minmax,

1493
00:56:56,000 --> 00:56:58,000
and ranges within the,

1494
00:56:58,000 --> 00:57:00,000
within each column.

1495
00:57:00,000 --> 00:57:02,000
They're not going to maintain any histograms,

1496
00:57:02,000 --> 00:57:05,000
and they're not going to maintain any sketches.

1497
00:57:05,000 --> 00:57:06,000
Right?

1498
00:57:06,000 --> 00:57:08,000
And the, the data is,

1499
00:57:08,000 --> 00:57:10,000
you only get this when you're using there,

1500
00:57:10,000 --> 00:57:12,000
and they're in proprietary format.

1501
00:57:12,000 --> 00:57:13,000
So they have some,

1502
00:57:13,000 --> 00:57:15,000
some really basic information,

1503
00:57:15,000 --> 00:57:17,000
and instead at runtime,

1504
00:57:17,000 --> 00:57:18,000
they're going to have triggers that decide,

1505
00:57:18,000 --> 00:57:20,000
should they adjust things,

1506
00:57:20,000 --> 00:57:23,000
as needed.

1507
00:57:23,000 --> 00:57:25,000
But one of the challenges that they're going to face is that,

1508
00:57:25,000 --> 00:57:27,000
and this, this is,

1509
00:57:27,000 --> 00:57:28,000
a bit of a nuanced topic,

1510
00:57:28,000 --> 00:57:31,000
that only comes out if you're actually building a query optimizer,

1511
00:57:31,000 --> 00:57:33,000
is that,

1512
00:57:33,000 --> 00:57:36,000
if you need to figure out what micro-partitions you need to,

1513
00:57:36,000 --> 00:57:38,000
skip,

1514
00:57:38,000 --> 00:57:40,000
based on the statistics that you do have,

1515
00:57:40,000 --> 00:57:42,000
then now you've got to start reasing about

1516
00:57:42,000 --> 00:57:44,000
what your expressions look like to decide,

1517
00:57:44,000 --> 00:57:46,000
whether they satisfy or not,

1518
00:57:46,000 --> 00:57:48,000
the, you know,

1519
00:57:48,000 --> 00:57:50,000
whether micro-partition could,

1520
00:57:50,000 --> 00:57:52,000
potentially satisfy any data

1521
00:57:52,000 --> 00:57:54,000
that may be used by this query.

1522
00:57:54,000 --> 00:57:55,000
Right?

1523
00:57:55,000 --> 00:57:56,000
So simple things like, you know,

1524
00:57:56,000 --> 00:57:57,000
where column,

1525
00:57:57,000 --> 00:57:58,000
greater than 1, 2, 3, 4,

1526
00:57:58,000 --> 00:57:59,000
so single column by itself,

1527
00:57:59,000 --> 00:58:02,000
yeah, you could use the minmax ranges within your zone maps,

1528
00:58:02,000 --> 00:58:04,000
and each, each micro-partition to figure that out.

1529
00:58:04,000 --> 00:58:07,000
But when you start doing more complex expressions,

1530
00:58:07,000 --> 00:58:10,000
the column 1 plus column 2 is greater than 1, 2, 3, 4.

1531
00:58:10,000 --> 00:58:14,000
Now you've got kind of to evaluate this thing and figure out what it actually is.

1532
00:58:14,000 --> 00:58:16,000
Right?

1533
00:58:16,000 --> 00:58:18,000
Or if you have, like, a function like this,

1534
00:58:18,000 --> 00:58:20,000
truncate the date, extract the year,

1535
00:58:20,000 --> 00:58:22,000
and see whether it equals 2024,

1536
00:58:22,000 --> 00:58:25,000
if you're just looking blindly at, you know,

1537
00:58:25,000 --> 00:58:28,000
without understanding the semantics of what this is actually doing,

1538
00:58:28,000 --> 00:58:31,000
like, how could you actually ever reason about this?

1539
00:58:31,000 --> 00:58:34,000
We've got to go execute this function.

1540
00:58:34,000 --> 00:58:35,000
Right? So that you,

1541
00:58:35,000 --> 00:58:37,000
would you really want to do with,

1542
00:58:37,000 --> 00:58:38,000
would you really want to do with,

1543
00:58:38,000 --> 00:58:41,000
would you write it into something like this?

1544
00:58:41,000 --> 00:58:46,000
So they talk about how they have,

1545
00:58:46,000 --> 00:58:47,000
rather than having sort of,

1546
00:58:47,000 --> 00:58:48,000
sort of, two separate code bases,

1547
00:58:48,000 --> 00:58:52,000
one for, like, expression evaluation that's abused at runtime for,

1548
00:58:52,000 --> 00:58:53,000
you know, from your own queries,

1549
00:58:53,000 --> 00:58:55,000
an expression evaluation within the,

1550
00:58:55,000 --> 00:58:56,000
the optimizer itself,

1551
00:58:56,000 --> 00:58:59,000
they try to leverage that same code base

1552
00:58:59,000 --> 00:59:02,000
to be able to reuse them,

1553
00:59:02,000 --> 00:59:04,000
so that you always have,

1554
00:59:04,000 --> 00:59:05,000
guaranteed to have the same semantics.

1555
00:59:05,000 --> 00:59:09,000
Except that you need to be mindful that you're not actually processing real data,

1556
00:59:09,000 --> 00:59:10,000
or even sampled data,

1557
00:59:10,000 --> 00:59:13,000
you're trying to reason about what's actually inside of,

1558
00:59:13,000 --> 00:59:16,000
you know, what the expression actually could possibly do.

1559
00:59:16,000 --> 00:59:18,000
And again, this seems like,

1560
00:59:18,000 --> 00:59:20,000
it seems like a true one matter,

1561
00:59:20,000 --> 00:59:21,000
but from engineering perspective,

1562
00:59:21,000 --> 00:59:22,000
it's actually quite difficult,

1563
00:59:22,000 --> 00:59:23,000
because you have to deal with, like,

1564
00:59:23,000 --> 00:59:27,000
you know, the null semantics of what data actually could be.

1565
00:59:27,000 --> 00:59:28,000
Right?

1566
00:59:28,000 --> 00:59:30,000
Like, in the case of,

1567
00:59:30,000 --> 00:59:34,000
I know, once it's like my sequel,

1568
00:59:34,000 --> 00:59:37,000
what they do is when they see, like, a nested query,

1569
00:59:37,000 --> 00:59:41,000
in some cases, if it's a nested query that should produce a scalar,

1570
00:59:41,000 --> 00:59:43,000
though inside of the query optimizer,

1571
00:59:43,000 --> 00:59:45,000
the little stop query optimization,

1572
00:59:45,000 --> 00:59:48,000
go run that query, right?

1573
00:59:48,000 --> 00:59:49,000
Like, one plus one equals two.

1574
00:59:49,000 --> 00:59:51,000
Run that query in the execution engine,

1575
00:59:51,000 --> 00:59:52,000
get back the result,

1576
00:59:52,000 --> 00:59:55,000
and then inject that back in the query plan.

1577
00:59:55,000 --> 00:59:58,000
And then you don't, then you have the constant value.

1578
00:59:58,000 --> 00:59:59,000
That's an extreme case,

1579
00:59:59,000 --> 01:00:00,000
but again, that's,

1580
01:00:00,000 --> 01:00:01,000
because they don't have a way to,

1581
01:00:01,000 --> 01:00:03,000
to evaluate expressions directly within the query,

1582
01:00:03,000 --> 01:00:06,000
at least, these are a few years ago,

1583
01:00:06,000 --> 01:00:08,000
directly in the query optimizer,

1584
01:00:08,000 --> 01:00:11,000
you can only use the execution engine within, you know,

1585
01:00:11,000 --> 01:00:12,000
within my sequel itself.

1586
01:00:12,000 --> 01:00:13,000
So, again,

1587
01:00:13,000 --> 01:00:15,000
to avoid having to go run some queries,

1588
01:00:15,000 --> 01:00:17,000
go figure out how to plan this query,

1589
01:00:17,000 --> 01:00:18,000
they have a way to,

1590
01:00:18,000 --> 01:00:22,000
to, to repackage the expression evaluation engine,

1591
01:00:22,000 --> 01:00:25,000
to something that can be leveraged on top of, uh,

1592
01:00:25,000 --> 01:00:26,000
statistics.

1593
01:00:31,000 --> 01:00:32,000
Again, I don't, again,

1594
01:00:32,000 --> 01:00:34,000
I'm being, but the hand wave here, like,

1595
01:00:34,000 --> 01:00:35,000
this is hard.

1596
01:00:35,000 --> 01:00:36,000
Trust me.

1597
01:00:36,000 --> 01:00:37,000
Um,

1598
01:00:37,000 --> 01:00:40,000
and the cosmodel team should surely tell you this.

1599
01:00:40,000 --> 01:00:42,000
Okay, so the one-up,

1600
01:00:42,000 --> 01:00:44,000
adaption optimization that they're going to do,

1601
01:00:44,000 --> 01:00:46,000
uh, that I don't think is unique to snowflake,

1602
01:00:46,000 --> 01:00:47,000
but they, they make a big deal about it.

1603
01:00:47,000 --> 01:00:48,000
Um, that's kind of cool.

1604
01:00:48,000 --> 01:00:51,000
It's able to do, uh, aggregation push down.

1605
01:00:51,000 --> 01:00:54,000
So, after they figure out the join order,

1606
01:00:54,000 --> 01:00:56,000
uh, using some basic heuristics,

1607
01:00:56,000 --> 01:00:59,000
uh, basic cosmodel estimates in,

1608
01:00:59,000 --> 01:01:01,000
in, uh, in the query optimizer,

1609
01:01:01,000 --> 01:01:04,000
they then want to decide when is it appropriate

1610
01:01:04,000 --> 01:01:07,000
to push down aggregations below the joints.

1611
01:01:07,000 --> 01:01:10,000
And you want to do this when you recognize things that,

1612
01:01:10,000 --> 01:01:12,000
the, the amount of data that I,

1613
01:01:12,000 --> 01:01:14,000
I may be processing for the join, uh,

1614
01:01:14,000 --> 01:01:16,000
could be reduced significantly,

1615
01:01:16,000 --> 01:01:18,000
if I do look a partial aggregation right below,

1616
01:01:18,000 --> 01:01:20,000
the, uh, uh,

1617
01:01:20,000 --> 01:01:21,000
uh, right below the join,

1618
01:01:21,000 --> 01:01:23,000
and then some things up again, down below.

1619
01:01:23,000 --> 01:01:25,000
So in this case here,

1620
01:01:25,000 --> 01:01:27,000
they could recognize that this aggregation could actually be,

1621
01:01:27,000 --> 01:01:29,000
partially computed on the,

1622
01:01:29,000 --> 01:01:30,000
on this side here,

1623
01:01:30,000 --> 01:01:31,000
on the probe side of this join.

1624
01:01:31,000 --> 01:01:33,000
And then now when I do the join,

1625
01:01:33,000 --> 01:01:35,000
I'm just joining on the aggregation key,

1626
01:01:35,000 --> 01:01:37,000
rather than all possible keys that,

1627
01:01:37,000 --> 01:01:39,000
that, that, that are coming out of this table scan.

1628
01:01:39,000 --> 01:01:40,000
So in this case here,

1629
01:01:40,000 --> 01:01:42,000
I pushed down the table scan,

1630
01:01:42,000 --> 01:01:43,000
aggregation child,

1631
01:01:43,000 --> 01:01:46,000
and then update the top one to aggregation parent.

1632
01:01:46,000 --> 01:01:48,000
And you do this for some things very easily,

1633
01:01:48,000 --> 01:01:49,000
like if the mid and max,

1634
01:01:49,000 --> 01:01:50,000
you know, in that case,

1635
01:01:50,000 --> 01:01:51,000
like there's not,

1636
01:01:51,000 --> 01:01:52,000
you know, word about duplicates,

1637
01:01:52,000 --> 01:01:53,000
but for some,

1638
01:01:53,000 --> 01:01:54,000
and counts and averages,

1639
01:01:54,000 --> 01:01:55,000
you need, you need to count for that.

1640
01:01:55,000 --> 01:01:56,000
And so the aggregation is,

1641
01:01:56,000 --> 01:01:57,000
at the top,

1642
01:01:57,000 --> 01:01:58,000
the parent one,

1643
01:01:58,000 --> 01:02:00,000
is, is, is a, is a bit more tricky to do.

1644
01:02:00,000 --> 01:02:02,000
And so the, what are they going to do?

1645
01:02:02,000 --> 01:02:03,000
This is that they're always,

1646
01:02:03,000 --> 01:02:04,000
under the right conditions,

1647
01:02:04,000 --> 01:02:05,000
the query optimizer is going to,

1648
01:02:05,000 --> 01:02:07,000
you inject these,

1649
01:02:07,000 --> 01:02:08,000
uh,

1650
01:02:08,000 --> 01:02:10,000
these special push down aggregation operators

1651
01:02:10,000 --> 01:02:11,000
into the query plan,

1652
01:02:11,000 --> 01:02:13,000
but they're going to be disabled by default.

1653
01:02:13,000 --> 01:02:15,000
And then just like before,

1654
01:02:15,000 --> 01:02:16,000
when we talked about adaptive query optimization,

1655
01:02:16,000 --> 01:02:18,000
they're going to have trigger mechanisms to say,

1656
01:02:18,000 --> 01:02:20,000
if the amount of data coming up through me

1657
01:02:20,000 --> 01:02:22,000
is larger than I anticipated,

1658
01:02:22,000 --> 01:02:23,000
or, or, then it should be,

1659
01:02:23,000 --> 01:02:24,000
based on some cost model that,

1660
01:02:24,000 --> 01:02:25,000
that they've generated.

1661
01:02:25,000 --> 01:02:27,000
Then it'll go ahead and just,

1662
01:02:27,000 --> 01:02:28,000
enable that aggregation,

1663
01:02:28,000 --> 01:02:29,000
uh,

1664
01:02:29,000 --> 01:02:30,000
plan node,

1665
01:02:30,000 --> 01:02:32,000
instead of just being a pass-through.

1666
01:02:32,000 --> 01:02:33,000
Yes?

1667
01:02:33,000 --> 01:02:34,000
Two questions.

1668
01:02:34,000 --> 01:02:35,000
Yes.

1669
01:02:35,000 --> 01:02:37,000
Why do we not always want to do this?

1670
01:02:37,000 --> 01:02:38,000
So, why didn't,

1671
01:02:38,000 --> 01:02:39,000
why do you not always want to do this?

1672
01:02:39,000 --> 01:02:40,000
Because the aggregation may be,

1673
01:02:40,000 --> 01:02:41,000
computing may be expensive, right?

1674
01:02:41,000 --> 01:02:42,000
It depends on the number of join key,

1675
01:02:42,000 --> 01:02:43,000
or, or, or,

1676
01:02:43,000 --> 01:02:44,000
the group by keys.

1677
01:02:44,000 --> 01:02:46,000
Okay.

1678
01:02:46,000 --> 01:02:47,000
Right, group by key,

1679
01:02:47,000 --> 01:02:48,000
group by key,

1680
01:02:48,000 --> 01:02:49,000
food, or,

1681
01:02:49,000 --> 01:02:50,000
in a table,

1682
01:02:50,000 --> 01:02:51,000
or column one,

1683
01:02:51,000 --> 01:02:52,000
and, uh,

1684
01:02:52,000 --> 01:02:53,000
the number of sync values,

1685
01:02:53,000 --> 01:02:54,000
column one is,

1686
01:02:54,000 --> 01:02:55,000
you know, is,

1687
01:02:55,000 --> 01:02:56,000
is,

1688
01:02:56,000 --> 01:02:57,000
is whatever,

1689
01:02:57,000 --> 01:02:58,000
equal to the number of,

1690
01:02:58,000 --> 01:02:59,000
of two pulls.

1691
01:02:59,000 --> 01:03:02,000
And your second question was,

1692
01:03:02,000 --> 01:03:04,000
you also did the same thing.

1693
01:03:04,000 --> 01:03:05,000
Okay.

1694
01:03:05,000 --> 01:03:07,000
Um, what other database is used to this?

1695
01:03:07,000 --> 01:03:08,000
So, question one of those data is,

1696
01:03:08,000 --> 01:03:09,000
I think, uh,

1697
01:03:09,000 --> 01:03:11,000
Dremel might do this.

1698
01:03:11,000 --> 01:03:12,000
Um,

1699
01:03:12,000 --> 01:03:14,000
the, the blog article mentions this,

1700
01:03:14,000 --> 01:03:15,000
so, so, when it's like,

1701
01:03:15,000 --> 01:03:16,000
yes.

1702
01:03:16,000 --> 01:03:17,000
How does a D determine the point order,

1703
01:03:17,000 --> 01:03:19,000
and you say you don't have a strategy?

1704
01:03:19,000 --> 01:03:21,000
It's good.

1705
01:03:21,000 --> 01:03:23,000
So, question, how did a Dermen join,

1706
01:03:23,000 --> 01:03:24,000
or they don't have sketches,

1707
01:03:24,000 --> 01:03:25,000
or, or details,

1708
01:03:25,000 --> 01:03:26,000
or decisions?

1709
01:03:26,000 --> 01:03:27,000
Um,

1710
01:03:27,000 --> 01:03:29,000
again, I think it's,

1711
01:03:29,000 --> 01:03:31,000
you, you have a rough estimate of the,

1712
01:03:31,000 --> 01:03:33,000
you have a rough estimate of the,

1713
01:03:33,000 --> 01:03:36,000
the, the data might be coming out of the,

1714
01:03:36,000 --> 01:03:38,000
the,

1715
01:03:38,000 --> 01:03:39,000
the table scans,

1716
01:03:39,000 --> 01:03:41,000
based on the number of micro partitions you can prune,

1717
01:03:41,000 --> 01:03:42,000
and statistics.

1718
01:03:42,000 --> 01:03:43,000
Now, how they do,

1719
01:03:43,000 --> 01:03:44,000
calls,

1720
01:03:44,000 --> 01:03:45,000
estimations,

1721
01:03:45,000 --> 01:03:46,000
you're on the output of the join,

1722
01:03:46,000 --> 01:03:47,000
that I don't know.

1723
01:03:47,000 --> 01:03:48,000
Like I said, they might,

1724
01:03:48,000 --> 01:03:49,000
they probably do what Dremel does,

1725
01:03:49,000 --> 01:03:50,000
is like,

1726
01:03:50,000 --> 01:03:51,000
oh, I recognize I have a star schema.

1727
01:03:51,000 --> 01:03:52,000
Let me have the,

1728
01:03:52,000 --> 01:03:53,000
all the, the,

1729
01:03:53,000 --> 01:03:54,000
the dimension tables be like,

1730
01:03:54,000 --> 01:03:56,000
the, the build side of a hash join,

1731
01:03:56,000 --> 01:03:57,000
and write up the fact table as,

1732
01:03:57,000 --> 01:03:58,000
as the last pipeline.

1733
01:03:58,000 --> 01:04:01,000
Like a simple, like, trick like that would be,

1734
01:04:01,000 --> 01:04:03,000
you provide these benefits.

1735
01:04:03,000 --> 01:04:06,000
But I don't think they're reordering the joins at runtime.

1736
01:04:06,000 --> 01:04:08,000
I don't think anybody does that.

1737
01:04:08,000 --> 01:04:11,000
I thought they were doing distinct value estimations.

1738
01:04:11,000 --> 01:04:13,000
I think that's what it says with people.

1739
01:04:13,000 --> 01:04:14,000
It says,

1740
01:04:14,000 --> 01:04:15,000
I think they're doing distinct value estimations.

1741
01:04:15,000 --> 01:04:16,000
But like,

1742
01:04:16,000 --> 01:04:17,000
after the join,

1743
01:04:17,000 --> 01:04:18,000
like,

1744
01:04:18,000 --> 01:04:19,000
like,

1745
01:04:19,000 --> 01:04:20,000
the stats are all garbage.

1746
01:04:20,000 --> 01:04:22,000
So,

1747
01:04:22,000 --> 01:04:25,000
it's no like,

1748
01:04:25,000 --> 01:04:27,000
loves talking about this optimization that they do.

1749
01:04:27,000 --> 01:04:30,000
And there's a blog article about it,

1750
01:04:30,000 --> 01:04:32,000
from, from last year,

1751
01:04:32,000 --> 01:04:33,000
and actually written by Boway,

1752
01:04:33,000 --> 01:04:34,000
who was my student,

1753
01:04:34,000 --> 01:04:35,000
who took 721,

1754
01:04:35,000 --> 01:04:38,000
by 2016, 2017,

1755
01:04:38,000 --> 01:04:40,000
and went off and built this piece in,

1756
01:04:40,000 --> 01:04:41,000
in,

1757
01:04:41,000 --> 01:04:42,000
in,

1758
01:04:42,000 --> 01:04:43,000
in,

1759
01:04:43,000 --> 01:04:44,000
in,

1760
01:04:44,000 --> 01:04:45,000
in,

1761
01:04:45,000 --> 01:04:46,000
in,

1762
01:04:46,000 --> 01:04:47,000
in,

1763
01:04:47,000 --> 01:04:48,000
in,

1764
01:04:48,000 --> 01:04:50,000
in,

1765
01:04:50,000 --> 01:04:51,000
in,

1766
01:04:51,000 --> 01:04:52,000
in,

1767
01:04:52,000 --> 01:04:53,000
in,

1768
01:04:53,000 --> 01:04:54,000
in,

1769
01:04:54,000 --> 01:04:56,000
notwithstanding essentially,

1770
01:04:56,000 --> 01:04:58,000
or solution systems that do this.

1771
01:04:58,000 --> 01:04:59,000
I don't,

1772
01:04:59,000 --> 01:05:00,000
I don't know what name names names.

1773
01:05:00,000 --> 01:05:01,000
Okay,

1774
01:05:01,000 --> 01:05:03,000
all right so,

1775
01:05:03,000 --> 01:05:04,000
that's the,

1776
01:05:04,000 --> 01:05:06,000
that's the highlight level.

1777
01:05:06,000 --> 01:05:08,000
Overview of what slope Richard does.

1778
01:05:08,000 --> 01:05:09,000
And again,

1779
01:05:09,000 --> 01:05:11,000
the idea here is that you can compare and contrast.

1780
01:05:11,000 --> 01:05:13,000
Some of the nuances they're doing

1781
01:05:13,000 --> 01:05:14,000
that are going to be different than,

1782
01:05:14,000 --> 01:05:15,000
than Dremo,

1783
01:05:15,000 --> 01:05:16,000
and,

1784
01:05:16,000 --> 01:05:23,000
So I want to go back to this thing I mentioned at the end of last class about how

1785
01:05:23,000 --> 01:05:27,000
you know, Databricks came out with photon and made a big announcement.

1786
01:05:27,000 --> 01:05:30,000
It had the Sigma paper and then they also announced that they had,

1787
01:05:30,000 --> 01:05:37,000
that they had, they had audited TBC DS numbers and they were the fastest implementation ever.

1788
01:05:37,000 --> 01:05:42,000
So in addition with this, they put out a blog article announcing the paper,

1789
01:05:42,000 --> 01:05:48,000
an announcing that they have the, the new world record in audited TBC DS.

1790
01:05:48,000 --> 01:05:56,000
And in, in this, in this blog article, they include this graph here where they compare

1791
01:05:56,000 --> 01:06:04,000
Databricks against snowflake and this is, this is being run by researchers at the Barcelona Super Computing Center

1792
01:06:04,000 --> 01:06:09,000
and running on a, what was called the power set of, of TBC DS.

1793
01:06:09,000 --> 01:06:15,000
So I think it like is a, so selected subset of the TBC, you know, the 100 TBC DS queries

1794
01:06:15,000 --> 01:06:19,000
that it meant be, you know, representative like pushing a database to the really hard, right?

1795
01:06:19,000 --> 01:06:24,000
So this blog article came out with November 2021 and then two or three weeks later,

1796
01:06:24,000 --> 01:06:30,000
the snowflake skies came out and they started going on about how the database guys

1797
01:06:30,000 --> 01:06:34,000
didn't run snowflake correctly, that they're, that results are a garbage and don't,

1798
01:06:34,000 --> 01:06:35,000
don't trust what they're saying.

1799
01:06:35,000 --> 01:06:38,000
Snowflake is actually faster and not as expensive as what Databricks are saying.

1800
01:06:38,000 --> 01:06:42,000
Like that, Databricks ran on the enterprise version of snowflake,

1801
01:06:42,000 --> 01:06:44,000
but because they weren't using any of the enterprise features,

1802
01:06:44,000 --> 01:06:48,000
they could have run on the regular version of snowflake and cut down the cost quite significantly, right?

1803
01:06:48,000 --> 01:06:52,000
And these are the two founders, the two French guys that I mentioned in the beginning, right?

1804
01:06:52,000 --> 01:06:54,000
The two guys that came from Oracle.

1805
01:06:54,000 --> 01:06:58,000
So they came out and take it, all the, all the Databricks numbers are garbage.

1806
01:06:58,000 --> 01:07:02,000
Well, two days later, snowflake, oh sorry, the Databricks guys came out again

1807
01:07:02,000 --> 01:07:08,000
and they go, now we stand by our numbers and that the snowflake guys are being disingenuous

1808
01:07:08,000 --> 01:07:16,000
and that what's really going on is that these are results that snowflake is publishing for their, for their data set.

1809
01:07:16,000 --> 01:07:20,000
So like in the snowflake blog article, they gave you, like, here's how to go, you know,

1810
01:07:20,000 --> 01:07:24,000
sign up for a snowflake account and go access the TPCDS data set and run this experiment

1811
01:07:24,000 --> 01:07:27,000
exactly yourself to see why the Databricks numbers are garbage.

1812
01:07:27,000 --> 01:07:29,000
So that's what this result is here.

1813
01:07:30,000 --> 01:07:39,000
But what they're, what the Databricks guys are saying though is the, the data set, the data that they're actually running on

1814
01:07:39,000 --> 01:07:44,000
and the snowflake results are when you use their internal proprietary storage format

1815
01:07:44,000 --> 01:07:49,000
and when they've already run that micro partition rebalancing optimization that we talked about before.

1816
01:07:49,000 --> 01:07:55,000
So the data has been, not cooked but prepared because it's been ingested through the system

1817
01:07:55,000 --> 01:08:00,000
and they've done the extra steps to getting to a form that is ideal for them.

1818
01:08:00,000 --> 01:08:08,000
And that if you just take the raw data set that you're given from the TPCDS data generator

1819
01:08:08,000 --> 01:08:12,000
and then run that without any additional preparation on snowflake, this is the result that you're getting

1820
01:08:12,000 --> 01:08:15,000
and this is what they reported from the Barcelona data center.

1821
01:08:15,000 --> 01:08:20,000
Whereas in Databricks if you don't do any preparation, this is what you get.

1822
01:08:21,000 --> 01:08:30,000
Right? So in the official TPCDS documentation, you actually have to include the preparation time of the data

1823
01:08:30,000 --> 01:08:34,000
in your time measurements.

1824
01:08:34,000 --> 01:08:40,000
So like if you think about this like, if my query is going to run for a minute but I spent 24 hours compressing the hell out of them

1825
01:08:40,000 --> 01:08:44,000
and re-optimizing as much as possible, I have to report the 24 hours plus the one minute.

1826
01:08:44,000 --> 01:08:50,000
And so that's what the Databricks guys are arguing that like this time here doesn't include whatever that preparation is

1827
01:08:50,000 --> 01:08:54,000
and that if you throw all files at it, this is actually what you get.

1828
01:08:54,000 --> 01:09:00,000
Right? So I like to be the Switzerland, what you call for me.

1829
01:09:00,000 --> 01:09:05,000
I like to be the Switzerland update basis. I want to get along with everyone.

1830
01:09:05,000 --> 01:09:13,000
So when this came out, this off the cut as well.

1831
01:09:14,000 --> 01:09:20,000
You know, I would say for Databricks, they, for this was a big win for them because prior to this,

1832
01:09:20,000 --> 01:09:27,000
certainly Spark SQL was not as sophisticated and as advanced, you know, compared to photon and other systems at the time.

1833
01:09:27,000 --> 01:09:34,000
But this showed them, put them in a different light, you know, you can use Databricks as a high performance data warehouse

1834
01:09:34,000 --> 01:09:42,000
and put some of the same equal footing in a sort of competitive market space against snowflake and other systems around at the time.

1835
01:09:42,000 --> 01:09:45,000
So this was a win for Databricks, I think.

1836
01:09:45,000 --> 01:09:51,000
21? This is 2021, yes. During the pandemic.

1837
01:09:51,000 --> 01:09:52,000
Okay.

1838
01:09:52,000 --> 01:09:55,000
Have you come out with any comparison since then?

1839
01:09:55,000 --> 01:09:58,000
These questions have they come out with any comparison since then? No, I don't think so.

1840
01:09:58,000 --> 01:10:05,000
There's always been some kind of like, for these guys fought, then like the time series data people fought over benchmarks, right?

1841
01:10:05,000 --> 01:10:09,000
There's always some battle between these various systems.

1842
01:10:09,000 --> 01:10:16,000
Why is it hard to learn Databricks? Like why don't we just learn the numbers in benchmark Databricks?

1843
01:10:16,000 --> 01:10:20,000
So I should why, like, why is it hard to run the Databricks ones?

1844
01:10:20,000 --> 01:10:27,000
I mean, like, just put the TPCDS data there and just run it.

1845
01:10:27,000 --> 01:10:36,000
Yeah, so like if there's role files on parquet and if you say zero preparation, that would be an app of the opposite comparison, right?

1846
01:10:36,000 --> 01:10:48,000
But here's where things get weird, like, not weird, but like, it's a well-known fact that over the years, the various data's vendors have various optimization tricks that are specific to the TPC benchmarks.

1847
01:10:48,000 --> 01:10:53,000
So if you recognize, yes, well-known thing, recognize it. Oh, in TPC, this is a very common thing.

1848
01:10:53,000 --> 01:10:58,000
Oh, you're accessing the new orders table or the warehouse table? I know a benchmark you're running.

1849
01:10:58,000 --> 01:11:04,000
And they'll do, like, they'll give you certain query plans or new certain conversations that you would not normally get.

1850
01:11:04,000 --> 01:11:06,000
Right?

1851
01:11:06,000 --> 01:11:14,000
Oh, he's like the Volkswagen one. It's not that bad because like, that was polluting the environment. That's worse.

1852
01:11:14,000 --> 01:11:17,000
This is more like the speed test. Speed test your engine.

1853
01:11:17,000 --> 01:11:21,000
Yeah, like, yes. Actually, no, they're going to be the Volkswagen one.

1854
01:11:21,000 --> 01:11:27,000
That's, I've been like polluting. Like, yeah, like, Volkswagen, their cars would recognize, oh, I know I'm running the emissions test.

1855
01:11:27,000 --> 01:11:33,000
So they ran at a more optimized manner. But then when it was out in the real world, they was polluting a lot more.

1856
01:11:33,000 --> 01:11:37,000
Like, there's tricks you can do in TPCC. I don't know all the tricks or the analytical workloads.

1857
01:11:37,000 --> 01:11:42,000
On TPCC, for example, like, the, you know, you call, create index on the warehouse table.

1858
01:11:42,000 --> 01:11:46,000
But like, there's only on a warehouse. So you don't need a full, flash B plus tree.

1859
01:11:46,000 --> 01:11:55,000
Just do a sort of sort of sort of array asking way faster than the, because the number of warehouses don't increase when you run that benchmark.

1860
01:11:55,000 --> 01:11:59,000
So you make a static array and do really fast lookups. Right?

1861
01:11:59,000 --> 01:12:06,000
But like, if anybody else would not give that optimization, so there's, there's well-known tricks like this.

1862
01:12:06,000 --> 01:12:13,000
Okay, so let's finish up. This we talked about, I mentioned many times, again,

1863
01:12:13,000 --> 01:12:20,000
it's snowflake sort of off of being proprietary storage. The world of data lakes has evolved or has expanded.

1864
01:12:20,000 --> 01:12:27,000
And so over the years, they've added support for accessing data that's not directly in their proprietary format.

1865
01:12:27,000 --> 01:12:32,000
It's first of all, with this thing called Snowpipe, with basically, it was a Kafka endpoint that led you in just data,

1866
01:12:32,000 --> 01:12:38,000
that in Apache, or in Aero format, they then actually did get written to their proprietary format.

1867
01:12:38,000 --> 01:12:43,000
But in 2021, they added external tables. I actually don't know what this actually looks like,

1868
01:12:43,000 --> 01:12:46,000
because the definition say, oh, it's this data format or whatever.

1869
01:12:46,000 --> 01:12:50,000
So I don't actually know what they're doing other than I knew they could read from the high metadata catalog.

1870
01:12:50,000 --> 01:12:54,000
But then to read parquet files, they've added support for iceberg in 2022,

1871
01:12:55,000 --> 01:13:01,000
which we talked about last class. It's basically parquet files with additional metadata to keep track of the scheme information,

1872
01:13:01,000 --> 01:13:07,000
and you can do simple updates and insert updates to leads on those files.

1873
01:13:07,000 --> 01:13:14,000
And then in 2022, they also announced support for, they call hybrid tables.

1874
01:13:14,000 --> 01:13:20,000
And this is a service that I think is still called Unistore. And it's basically a full-flash transaction database system.

1875
01:13:21,000 --> 01:13:27,000
That's a row store. It's running inside the Snowpipe ecosystem that you can do queries,

1876
01:13:27,000 --> 01:13:31,000
SQL queries on, and run TPC and other transactional workloads.

1877
01:13:31,000 --> 01:13:36,000
And what will happen is the data will get inserted in a log structure format as a row,

1878
01:13:36,000 --> 01:13:46,000
and then in the background, they'll then run compaction and convert it to a columnar data stored in the Snowpipe proprietary format.

1879
01:13:47,000 --> 01:13:51,000
And so when you now run an OLAP query, it's basically the Fracture Mirrors approach,

1880
01:13:51,000 --> 01:13:56,000
where query shows up, you have a table as being cleared as a hybrid table,

1881
01:13:56,000 --> 01:14:01,000
and the executioner has to recognize, oh, some of the data I can get from the column store side,

1882
01:14:01,000 --> 01:14:04,000
but I'll seem to merge with some data that I have on the row store side.

1883
01:14:04,000 --> 01:14:07,000
And it provides a single viewpoint for all of this.

1884
01:14:07,000 --> 01:14:13,000
So again, this is in response to Delta Lake, actually I think these support Delta Lake now as well,

1885
01:14:13,000 --> 01:14:20,000
but the idea of ingesting data from different sources is if it's one additional thing a way to access,

1886
01:14:20,000 --> 01:14:25,000
put data into Snowpipe, you're not going to run your transactional application on top of this.

1887
01:14:25,000 --> 01:14:30,000
So Snowpipe is a great OLAP system.

1888
01:14:30,000 --> 01:14:37,000
How can they build a transactional system that's just equally as hard, that's fault-tolerant, reliable, and safe?

1889
01:14:37,000 --> 01:14:41,000
How can they build a transactional database system at the same time?

1890
01:14:41,000 --> 01:14:47,000
Well, let's just say you have a transactional data system you're already using for other things

1891
01:14:47,000 --> 01:14:52,000
that you can then start using it for other parts of your system.

1892
01:14:52,000 --> 01:14:56,000
So famously, Snowpipe runs their catalog on this thing called FoundationDB.

1893
01:14:56,000 --> 01:14:59,000
Who here is sort of FoundationDB before, this class?

1894
01:14:59,000 --> 01:15:01,000
Three, four, five, all right, small.

1895
01:15:01,000 --> 01:15:10,000
Basically, in the NoSQL days, in the early 2010s, there's all these NoSQL systems that were doing key value source that didn't do any transactions,

1896
01:15:10,000 --> 01:15:16,000
and FoundationDB said, well, we're going to be a transactional key value store.

1897
01:15:16,000 --> 01:15:23,000
And I think they were backed also by Sutter Hill, and so basically, they got the two boy bands to put out, you know, work together,

1898
01:15:23,000 --> 01:15:27,000
and Snowpipe decided to use FoundationDB early on as their catalog.

1899
01:15:27,000 --> 01:15:31,000
It's one less thing they'd have to build because you need a transactional catalog.

1900
01:15:31,000 --> 01:15:38,000
So, the challenge though is that FoundationDB got bought by Apple in 2015,

1901
01:15:38,000 --> 01:15:46,000
and it was always closed source. So what happens is, Snowpipe had in their contract with FoundationDB that if they get acquired or go under,

1902
01:15:46,000 --> 01:15:52,000
they get the source code in the SQL service, they get access to the source code, because again, by this point, 2015, Snowpipe was huge,

1903
01:15:52,000 --> 01:15:56,000
not as big as it is now, but it was growing quite rapidly.

1904
01:15:56,000 --> 01:16:01,000
So, you know, Apple buying the main thing that runs, you know, you're trying to catalog service to be a huge problem.

1905
01:16:01,000 --> 01:16:07,000
So they got access to the source code, and they kept maintaining that over the years.

1906
01:16:07,000 --> 01:16:15,000
And then when Apple then opened source FoundationDB, they then had a spend time to get it merged back together and follow the open source version.

1907
01:16:15,000 --> 01:16:21,000
And now right now, the number one contributor to FoundationDB, I think, is Apple. The number two is Snowpipe.

1908
01:16:21,000 --> 01:16:31,000
But for legal reasons, the Snowpipe people can't commit code directly into FoundationDB. Only Apple employees have to do that, but they literally should be like on Slack, they say, hey, commit this to the Apple people.

1909
01:16:31,000 --> 01:16:36,000
And the people, they'll do it for me. I don't know whether that's changed, but that's what it was a few years ago.

1910
01:16:36,000 --> 01:16:42,000
FoundationDB, we don't have to cover this, it's a very fascinating system. Their testing infrastructure was insane.

1911
01:16:42,000 --> 01:16:53,000
They had this basically deterministic testing infrastructure where they could introduce faults, or like the disk, the network, and whatever, and show that thing, because fault was, could fail over it, and it was fault tolerant.

1912
01:16:53,000 --> 01:17:04,000
The guys that built FoundationDB have a new startup called Antithesis, but now they're trying to sell the infrastructure that they built for FoundationDB, new testing for distributed data disks.

1913
01:17:04,000 --> 01:17:12,000
How do you make a key value source transactional?

1914
01:17:12,000 --> 01:17:18,000
It doesn't matter. Your view statement is how do I make a key value source transactional?

1915
01:17:18,000 --> 01:17:33,000
I have to go look, I don't remember, but like, the fact that it's a key value source versus relational database doesn't matter.

1916
01:17:33,000 --> 01:17:46,000
It doesn't matter. Begin, put, put, put, commit. It's all the same. That's basically what NODB is doing underneath the covers. NODB is a key value interface, and a B plus tree. My SQL does the higher level stuff, but it's doing transactional of that.

1917
01:17:46,000 --> 01:17:54,000
WireTiger, ROXDB, it's all the same. It doesn't matter what's key value store now.

1918
01:17:54,000 --> 01:18:06,000
This is a crash course on what Snowflake is. I think it's a very fascinating system. Even though, again, it's 12 years old now, I still consider it to be a very much state of the art.

1919
01:18:06,000 --> 01:18:12,000
Yellow brick guys are going to go way overboard with some of the applications that they're going to do. We'll see that next week.

1920
01:18:12,000 --> 01:18:26,000
But again, in terms of a disaggregated storage, the lake house system that does vectorized query execution, what Snowflake provides or did back then is common now, but it's still state of the art.

1921
01:18:26,000 --> 01:18:35,000
Although you can see, not cracks in it, but you can see how there's aspects of it that are remnants of being designed 12 years ago.

1922
01:18:35,000 --> 01:18:48,000
Whereas, again, whether or not they're going to be using these two images, I don't know, but adding support for external tables after you've already had this prior to your storage, that's not how you would build a system today.

1923
01:18:48,000 --> 01:18:56,000
If you want to do lake houses or data lakes. But again, it's still a very fast and very good system.

1924
01:18:56,000 --> 01:19:05,000
The other challenge that gets from Snowflake Effective, like you look at Velox, look at Data Fusion, the core engine itself has become commoditized.

1925
01:19:05,000 --> 01:19:14,000
So it's all the stuff above that Snowflake does, the Snowpark, the Snowpipe stuff, all that separates them from the competitors. That's the user experience.

1926
01:19:14,000 --> 01:19:21,000
And the adaptivity of runtime, it's going to matter rather than just like how fast can you do your vectorized scan.

1927
01:19:21,000 --> 01:19:31,000
So next class on Wednesday, when we read the ducty B paper, I think the paper I read you had to go to sign is like, it's the demo paper, so it's like two pages or four.

1928
01:19:31,000 --> 01:19:38,000
Okay, yeah, so there isn't a canonical ducty B paper out there. That's the best we can do.

1929
01:19:38,000 --> 01:19:45,000
Well, we'll cover the mother duct paper that came out this year, but I don't think that one discusses the core architecture.

1930
01:19:45,000 --> 01:19:53,000
But I'll go through like, hear what ducty B's, like the internal ducts actually look like. And that's based on public talks and other documentation that they've given.

1931
01:19:53,000 --> 01:19:59,000
And this is going to be slightly different than everything we talked about before, because like we're making a big deal about these OLAP systems that are running on Lake Houses.

1932
01:19:59,000 --> 01:20:07,000
And now we're talking about embedded in process database system. But again, we'll see how they can read data from S3 and other things as well.

1933
01:20:07,000 --> 01:20:11,000
Okay? All right guys, see ya.

1934
01:20:11,000 --> 01:20:12,000
Hey, you know, you ready?

1935
01:20:12,000 --> 01:20:17,000
I ain't got a belt to get the 40M bar. Get a grip, take a sip, and you'll be picking up bottles.

1936
01:20:17,000 --> 01:20:22,000
Ain't ain't no puzzle, I'll go through some more, man. I'm down in the 40M, I sure ain't got four cans.

1937
01:20:22,000 --> 01:20:26,000
Stack some sick packs on a table, and I'm able to see St. John's on the label.

1938
01:20:26,000 --> 01:20:31,000
No sure, put the fuck you know what got them. I take off the cap, my friends are tapped on the bottom.

1939
01:20:31,000 --> 01:20:35,000
Throw my green and freezer, throw my utility. Careful with the bottle, baby, you can still spill it.

1940
01:20:35,000 --> 01:20:40,000
Cause St. John's been saved, the paint lots wet. You drink it down with the gauze, hit the bar head.

1941
01:20:40,000 --> 01:20:44,000
Take back the pack of drugs. You gon' get your soul saved now, so drink it till it's flush.

1942
01:20:44,000 --> 01:20:49,000
Billie Danes, the utility takes you down with the weak gauze. Be a man to get a can of St. John.

