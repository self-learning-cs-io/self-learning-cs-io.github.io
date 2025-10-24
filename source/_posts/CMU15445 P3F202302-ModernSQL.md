---
title: CMU15445 P3F202302 ModernSQL
---

1
00:00:00,000 --> 00:00:14,320
Ponadznimo

2
00:00:14,320 --> 00:00:23,780
ова

3
00:00:23,780 --> 00:00:35,980
All right, let me make sure I do backup recording.

4
00:00:35,980 --> 00:00:42,820
All right, so some quick things, administrative things from last class.

5
00:00:42,820 --> 00:00:46,260
It's only been one day we already got emails.

6
00:00:46,260 --> 00:00:49,340
So the first thing is that I made a mistake last class.

7
00:00:49,340 --> 00:00:52,100
I said Ted Cobb got his PhD at Penn.

8
00:00:52,100 --> 00:00:53,740
He got his PhD at Michigan.

9
00:00:53,740 --> 00:00:56,700
We're all the great data he got to their PhDs.

10
00:00:56,700 --> 00:00:59,579
So my extrobreaker got his PhD there.

11
00:00:59,579 --> 00:01:00,620
Ted Cobb got his PhD there.

12
00:01:00,620 --> 00:01:02,260
David DeWitt, another famous David's guy.

13
00:01:02,260 --> 00:01:03,179
So he was not Penn.

14
00:01:03,179 --> 00:01:05,060
It was Michigan.

15
00:01:05,060 --> 00:01:08,700
All right, the other thing is people complain about the audio.

16
00:01:08,700 --> 00:01:10,340
Do you're Andy, the audio for your class sucks.

17
00:01:10,340 --> 00:01:11,939
Why can't seem you afford a sound engineer?

18
00:01:11,939 --> 00:01:12,700
Do it right.

19
00:01:12,700 --> 00:01:14,180
Andy, I love the course, but I can't listen to it

20
00:01:14,180 --> 00:01:15,099
because the audio is messed up.

21
00:01:15,099 --> 00:01:15,659
What happened?

22
00:01:15,659 --> 00:01:16,379
Why are you doing this?

23
00:01:16,379 --> 00:01:18,219
I lost the will to live.

24
00:01:18,219 --> 00:01:20,579
So that was my fault last time.

25
00:01:20,579 --> 00:01:21,579
So we're double recordings.

26
00:01:21,579 --> 00:01:25,579
So hopefully we won't have any issues with posting it this time.

27
00:01:25,579 --> 00:01:27,980
And then we actually got emails about you.

28
00:01:27,980 --> 00:01:30,179
Which is surprising, right?

29
00:01:30,179 --> 00:01:34,140
I saw DJ2PL last month performing at the bridge, 21

30
00:01:34,140 --> 00:01:35,379
and overshoot on Pittsburgh.

31
00:01:35,379 --> 00:01:36,579
Is that true?

32
00:01:36,579 --> 00:01:37,459
All right.

33
00:01:37,459 --> 00:01:38,900
You're very lucky to get a DJ like that.

34
00:01:38,900 --> 00:01:40,900
He is expensive.

35
00:01:40,900 --> 00:01:43,259
Seemies have a lot of money.

36
00:01:43,259 --> 00:01:44,259
Even does not have a lot of money.

37
00:01:44,259 --> 00:01:45,299
OK.

38
00:01:45,299 --> 00:01:48,420
Yo, DJ2PL is ridiculous.

39
00:01:48,420 --> 00:01:49,299
Is he single?

40
00:01:49,299 --> 00:01:50,299
I'm asking for my friend.

41
00:01:54,219 --> 00:01:56,979
And then she's like Taylor Swift without any thumbs.

42
00:01:56,979 --> 00:01:57,979
I don't know what that means.

43
00:02:00,859 --> 00:02:02,099
Are you single?

44
00:02:02,099 --> 00:02:03,259
I'm not important.

45
00:02:03,259 --> 00:02:04,259
OK.

46
00:02:04,259 --> 00:02:05,859
I'm not important.

47
00:02:05,859 --> 00:02:06,299
All right.

48
00:02:06,299 --> 00:02:10,900
So anyway, that's their problem.

49
00:02:10,900 --> 00:02:12,060
All right.

50
00:02:12,060 --> 00:02:15,300
So today's class we're going to talk about SQL.

51
00:02:15,300 --> 00:02:18,340
The last class we spent time talking about the relational model,

52
00:02:18,340 --> 00:02:20,140
we talked about how, in my opinion,

53
00:02:20,140 --> 00:02:23,340
that it's a superior data model for every possible database

54
00:02:23,340 --> 00:02:24,939
you can think of.

55
00:02:24,939 --> 00:02:28,740
The relational data model can be used to represent,

56
00:02:28,740 --> 00:02:31,699
produce all the different schemes that are out there.

57
00:02:31,699 --> 00:02:32,980
And then we showed how relational algebra

58
00:02:32,980 --> 00:02:35,980
was the building block for how we would execute queries

59
00:02:35,980 --> 00:02:41,060
or define queries to operate over on a relational database.

60
00:02:41,060 --> 00:02:43,460
So today's class is really now to talk about SQL,

61
00:02:43,460 --> 00:02:47,020
which is a declarative or non-procedural language

62
00:02:47,020 --> 00:02:50,700
for interacting with a database system.

63
00:02:50,700 --> 00:02:53,100
And what we'll see over time is that SQL

64
00:02:53,100 --> 00:02:56,180
has evolved where, in the beginning in the 1970s,

65
00:02:56,180 --> 00:02:59,100
when it was first defined, it was very strict about what

66
00:02:59,100 --> 00:03:01,020
a relational database should look like.

67
00:03:01,020 --> 00:03:04,020
But in the last 40 years, it's expanded

68
00:03:04,020 --> 00:03:06,820
to support things that don't look relational, like JSON,

69
00:03:06,820 --> 00:03:08,700
for example.

70
00:03:08,700 --> 00:03:09,740
So let's start at the beginning.

71
00:03:09,740 --> 00:03:10,900
Talk about how SQL got started.

72
00:03:10,900 --> 00:03:14,980
And then we'll talk about the sort of more interesting things

73
00:03:14,979 --> 00:03:17,859
you can do in modern versions of it.

74
00:03:17,859 --> 00:03:22,859
So the SQL goes back to the 1970s.

75
00:03:22,859 --> 00:03:25,979
And again, for Ted Cobb, when he wrote that first paper,

76
00:03:25,979 --> 00:03:27,819
he didn't define a programming language

77
00:03:27,819 --> 00:03:29,379
for operating relational databases.

78
00:03:29,379 --> 00:03:31,019
It was all mathematical.

79
00:03:31,019 --> 00:03:35,979
People said, oh, the paper was so inscrutable,

80
00:03:35,979 --> 00:03:37,819
never can understand it.

81
00:03:37,819 --> 00:03:39,379
If you actually read it, it's actually pretty easily

82
00:03:39,379 --> 00:03:40,219
understandable.

83
00:03:40,219 --> 00:03:43,179
It's just people who didn't like math back in the day, I guess.

84
00:03:43,180 --> 00:03:46,740
So then he, some people at IBM,

85
00:03:46,740 --> 00:03:49,180
saw his paper and tried to start building

86
00:03:49,180 --> 00:03:51,180
experimental relational databases to see whether they

87
00:03:51,180 --> 00:03:53,420
can actually take his mathematical ideas

88
00:03:53,420 --> 00:03:55,540
and put it out, put it into practice.

89
00:03:55,540 --> 00:03:58,300
And so the very first relational database language,

90
00:03:58,300 --> 00:04:01,740
as far as I know, was this thing called Square,

91
00:04:01,740 --> 00:04:05,300
that IBM invented in 1971.

92
00:04:05,300 --> 00:04:07,300
And this was for an earlier project

93
00:04:07,300 --> 00:04:10,340
that IBM was developing for one of the first relational database

94
00:04:10,340 --> 00:04:12,740
systems, I'd probably be first one,

95
00:04:12,740 --> 00:04:15,420
which sounds like a weird experimental rock band.

96
00:04:15,420 --> 00:04:18,100
It's called the Peter Lee relational test vehicle.

97
00:04:18,100 --> 00:04:20,980
But that was the first thing they built as an early prototype

98
00:04:20,980 --> 00:04:23,019
to show that you could take Ted Cobb's ideas

99
00:04:23,019 --> 00:04:25,579
and actually put it into a real system.

100
00:04:25,579 --> 00:04:28,699
The problem with Square, though, is that you can never actually

101
00:04:28,699 --> 00:04:31,860
reuse it because you had to write in weird notation

102
00:04:31,860 --> 00:04:35,540
and vertically, which you can't really do.

103
00:04:35,540 --> 00:04:39,500
So this is from one of the virtual papers.

104
00:04:39,500 --> 00:04:42,540
You would write, this is how to do a scan

105
00:04:42,900 --> 00:04:44,500
on the sales table by department.

106
00:04:44,500 --> 00:04:46,500
You would write in this weird vertical way

107
00:04:46,500 --> 00:04:48,420
with characters that you wouldn't have on the keyboard,

108
00:04:48,420 --> 00:04:49,580
even today.

109
00:04:49,580 --> 00:04:51,660
So no one actually ever did this.

110
00:04:51,660 --> 00:04:54,900
So then IBM threw that away and they started

111
00:04:54,900 --> 00:05:00,300
building a new query language called SQL, spelled S-E-Q-E-L,

112
00:05:00,300 --> 00:05:02,379
for the system R project, which is a system

113
00:05:02,379 --> 00:05:03,980
we'll talk about throughout the semester.

114
00:05:03,980 --> 00:05:06,259
But this was the second relational database system

115
00:05:06,259 --> 00:05:09,780
that IBM started building to try to show that Ted Cobb's work

116
00:05:09,780 --> 00:05:10,660
could actually done.

117
00:05:10,900 --> 00:05:12,580
The Peter Lee one, that was in the UK,

118
00:05:12,580 --> 00:05:13,620
that was a small team.

119
00:05:13,620 --> 00:05:17,620
The system R project was in San Jose at IBM Research

120
00:05:17,620 --> 00:05:19,500
and that was a major, major undertaking.

121
00:05:20,580 --> 00:05:22,940
So they defined SQL back in 1972.

122
00:05:22,940 --> 00:05:25,940
This was Don Chamberlain and Voice.

123
00:05:25,940 --> 00:05:27,140
They work in this query language.

124
00:05:28,180 --> 00:05:31,860
And the idea was to be the structured English query language.

125
00:05:31,860 --> 00:05:35,340
But in the 1980s, when IBM put out a commercial

126
00:05:35,340 --> 00:05:38,700
relational database system, they got sued for the term SQL,

127
00:05:38,700 --> 00:05:39,940
like the name SQL.

128
00:05:40,300 --> 00:05:43,019
There was some other system, or some other piece of software

129
00:05:43,019 --> 00:05:43,899
that was using it.

130
00:05:43,899 --> 00:05:48,500
So then they just reverted it back to SQL,

131
00:05:48,500 --> 00:05:50,980
just the letters, the structured query language.

132
00:05:52,699 --> 00:05:56,060
There was another very famous project at the same time

133
00:05:56,060 --> 00:05:59,699
at a Berkeley in the 1970s when system R was getting started

134
00:05:59,699 --> 00:06:00,980
called Ingress.

135
00:06:00,980 --> 00:06:02,339
Who here has heard of Ingress?

136
00:06:03,860 --> 00:06:04,779
Nobody.

137
00:06:04,779 --> 00:06:06,139
Who here has heard of Postgres?

138
00:06:07,300 --> 00:06:08,980
Everyone know why Postgres is called Postgres

139
00:06:08,980 --> 00:06:10,860
because it's Post-Ingress.

140
00:06:10,860 --> 00:06:13,740
The guy that built Stonebreak, when he built Ingress,

141
00:06:13,740 --> 00:06:16,379
he commercialized it in the late 1970s

142
00:06:16,379 --> 00:06:18,060
and then went back to Berkeley in 1980s

143
00:06:18,060 --> 00:06:21,259
to build their new system that was supposed to be Post-Ingress.

144
00:06:21,259 --> 00:06:22,540
That's why it's called Postgres.

145
00:06:23,620 --> 00:06:25,700
So they Postgres, sorry Ingress,

146
00:06:25,700 --> 00:06:28,700
had this other query language called Quail.

147
00:06:28,700 --> 00:06:30,500
And so SQL, the plan in the words,

148
00:06:30,500 --> 00:06:33,100
is that it's supposed to be the SQL to Quail.

149
00:06:33,100 --> 00:06:35,060
Because the IBM guys knew up with the Berkeley people

150
00:06:35,060 --> 00:06:37,540
were doing and they were trying to build a better query language.

151
00:06:37,540 --> 00:06:40,260
Stonebreak would argue that Quail is better,

152
00:06:40,260 --> 00:06:42,540
but of course no one uses that today.

153
00:06:42,540 --> 00:06:44,860
IBM released a couple of,

154
00:06:44,860 --> 00:06:49,540
in the 1970s IBM was making a lot of money off of IMS,

155
00:06:49,540 --> 00:06:51,100
which is a non-relational system,

156
00:06:51,100 --> 00:06:52,340
not didn't support SQL.

157
00:06:52,340 --> 00:06:54,980
And then they realized that SQL was gonna go somewhere,

158
00:06:54,980 --> 00:06:56,340
a relational data, so we're gonna go somewhere.

159
00:06:56,340 --> 00:06:57,900
So they released a much early prototypes,

160
00:06:57,900 --> 00:07:00,780
like System 38, SQL DS.

161
00:07:00,780 --> 00:07:04,340
But the big one that really took off was DB2,

162
00:07:04,340 --> 00:07:05,660
which is still around today.

163
00:07:06,620 --> 00:07:09,340
Again, IBM was the big juggernaut in the computing world.

164
00:07:09,340 --> 00:07:11,540
So whatever IBM said they were gonna do,

165
00:07:11,540 --> 00:07:13,700
that sort of became the de facto standard.

166
00:07:13,700 --> 00:07:15,540
So when IBM came out with a relational database

167
00:07:15,540 --> 00:07:16,780
that supported SQL,

168
00:07:16,780 --> 00:07:19,100
even though they were competing languages like Quail,

169
00:07:19,100 --> 00:07:22,940
everyone coalesced around SQL.

170
00:07:24,500 --> 00:07:27,060
So SQL became a standard in an anti-standard,

171
00:07:27,060 --> 00:07:29,860
it was an American standard's body in 1986,

172
00:07:29,860 --> 00:07:33,060
and then it became a international standard in 1987.

173
00:07:33,939 --> 00:07:38,939
And so even though it's a 56 year old language now,

174
00:07:39,180 --> 00:07:41,699
it has evolved and expanded over time.

175
00:07:41,699 --> 00:07:43,699
So the latest version of the SQL standard

176
00:07:43,699 --> 00:07:46,180
actually came out in March this year in 2023.

177
00:07:47,220 --> 00:07:48,180
And you see sort of lists here,

178
00:07:48,180 --> 00:07:49,699
the history of all the updates,

179
00:07:49,699 --> 00:07:52,060
the various features they've added over time.

180
00:07:52,060 --> 00:07:55,259
And the main takeaway from this listing here is that,

181
00:07:57,060 --> 00:07:59,060
as programs evolve, applications evolve,

182
00:07:59,060 --> 00:08:02,459
or the trends in development, software development has evolved,

183
00:08:02,459 --> 00:08:06,579
SQL has moved along with it and adopted the ideas

184
00:08:06,579 --> 00:08:08,939
and adopted new capabilities.

185
00:08:08,939 --> 00:08:12,299
So in 2023, the big two features that have come out

186
00:08:12,299 --> 00:08:16,740
is now you can do property graph queries directly in SQL.

187
00:08:16,740 --> 00:08:19,459
So so many brought up Neo4j last class,

188
00:08:19,459 --> 00:08:24,219
that's a special purpose graph data model database system.

189
00:08:24,219 --> 00:08:25,379
But now you don't need that anymore,

190
00:08:25,379 --> 00:08:28,259
because now you can run graph queries directly in SQL,

191
00:08:28,259 --> 00:08:30,219
because the SQL standard supports it.

192
00:08:30,220 --> 00:08:33,259
You also add a support for multi-dimensional arrays.

193
00:08:33,259 --> 00:08:35,340
So I said before that a lot of machine learning stuff

194
00:08:35,340 --> 00:08:37,460
is based on arrays or matrices.

195
00:08:37,460 --> 00:08:40,220
Now you can operate directly on SQL, these things.

196
00:08:40,220 --> 00:08:42,500
Now just because the standard has defined it doesn't mean

197
00:08:42,500 --> 00:08:44,899
every system is going to support it, right?

198
00:08:44,899 --> 00:08:47,220
I don't think any system really supports

199
00:08:47,220 --> 00:08:49,580
the multi-dimensional array stuff.

200
00:08:49,580 --> 00:08:51,180
But Oracle supports the property graph stuff,

201
00:08:51,180 --> 00:08:52,460
post-gressal eventually if there are ducty-b,

202
00:08:52,460 --> 00:08:54,540
ducty-b has a prototype for it.

203
00:08:54,540 --> 00:08:56,460
But because it's in the standard,

204
00:08:56,460 --> 00:08:59,180
not everyone's going to actually be able to support it.

205
00:08:59,179 --> 00:09:00,859
So I would say in my opinion,

206
00:09:00,859 --> 00:09:03,259
the minimum support you need for SQL

207
00:09:03,259 --> 00:09:05,139
to say that your database support SQL

208
00:09:05,139 --> 00:09:07,899
is defined in the SQL 92 standard, right?

209
00:09:07,899 --> 00:09:10,620
That's like select, insert, update, delete, create tables.

210
00:09:10,620 --> 00:09:13,259
That's the basic functionality.

211
00:09:13,259 --> 00:09:15,339
So again, even though SQL is over 50 years old,

212
00:09:15,339 --> 00:09:18,339
it's not a dead language and those updates all the time.

213
00:09:18,339 --> 00:09:20,739
And of course every 10 years or every five years,

214
00:09:20,739 --> 00:09:23,179
some new technology comes out and people say

215
00:09:23,179 --> 00:09:27,179
that SQL is dead and it's about to be replaced.

216
00:09:27,179 --> 00:09:28,939
10 years ago it was no SQL.

217
00:09:28,940 --> 00:09:33,060
And the hot thing now is chat GBT or vector databases.

218
00:09:33,060 --> 00:09:35,180
So you see a lot of these kind of things on Twitter

219
00:09:35,180 --> 00:09:38,500
or social media where they claim SQL is going to die

220
00:09:38,500 --> 00:09:40,700
because chat GBT is going to replace it

221
00:09:40,700 --> 00:09:42,860
or natural language is going to replace it, right?

222
00:09:42,860 --> 00:09:45,860
This is all a bunch of hype.

223
00:09:45,860 --> 00:09:48,260
It's interesting, but it's not going to replace SQL.

224
00:09:48,260 --> 00:09:50,060
Like SQL was here before you were born,

225
00:09:50,060 --> 00:09:52,140
and SQL be here when you die, OK?

226
00:09:52,140 --> 00:09:57,300
And I've made public statements to basically about this.

227
00:09:57,299 --> 00:10:01,299
So there's an article they quoted me in last year

228
00:10:01,299 --> 00:10:03,379
and some magazines and something.

229
00:10:03,379 --> 00:10:04,819
I basically said, you need to know SQL

230
00:10:04,819 --> 00:10:07,740
if you want to do anything in computer science.

231
00:10:07,740 --> 00:10:09,579
All right.

232
00:10:09,579 --> 00:10:12,620
So in a relational language like SQL,

233
00:10:12,620 --> 00:10:15,019
it's going to have sort of three parts.

234
00:10:15,019 --> 00:10:17,979
There's going to be the DML, the data manipulation language.

235
00:10:17,979 --> 00:10:20,179
That's how we're going to, that's

236
00:10:20,179 --> 00:10:21,620
our select, insert, update, delete queries

237
00:10:21,620 --> 00:10:23,620
that interact within our database.

238
00:10:23,620 --> 00:10:25,539
The D to L, the data definition language.

239
00:10:25,539 --> 00:10:27,779
That's the create table statements, the create views,

240
00:10:27,779 --> 00:10:32,019
to create the entities, the objects in our database.

241
00:10:32,019 --> 00:10:33,139
And then they'll be, we're not really

242
00:10:33,139 --> 00:10:35,299
going to cover this, but they'll be the DCL, the data control

243
00:10:35,299 --> 00:10:35,980
language.

244
00:10:35,980 --> 00:10:38,419
That's for like security and access control.

245
00:10:38,419 --> 00:10:40,579
Some systems allow you have like, you

246
00:10:40,579 --> 00:10:43,019
can specify what users are allowed to see what rows

247
00:10:43,019 --> 00:10:44,860
or what columns or what tables and so forth.

248
00:10:44,860 --> 00:10:48,339
I said the SQL standards specifies for these things.

249
00:10:48,339 --> 00:10:50,500
Another big thing we'll see later in the semester

250
00:10:50,500 --> 00:10:52,980
is definition of transactions.

251
00:10:52,980 --> 00:10:55,019
How do you define a bunch of SQL statements

252
00:10:55,179 --> 00:10:58,419
you want to happen automatically in an isolated way?

253
00:10:58,419 --> 00:11:00,939
And again, the SQL standards supports this.

254
00:11:00,939 --> 00:11:02,579
So again, we'll see bits and pieces of this

255
00:11:02,579 --> 00:11:03,779
as we go without the semester.

256
00:11:03,779 --> 00:11:05,699
But for today's lecture, we're really

257
00:11:05,699 --> 00:11:08,579
going to focus on the first one, the DML.

258
00:11:08,579 --> 00:11:11,860
And in reminder from picking up where we were all left,

259
00:11:11,860 --> 00:11:14,939
we talked about last class, SQL is going to be based on bags,

260
00:11:14,939 --> 00:11:18,139
meaning there could be duplicates, whereas

261
00:11:18,139 --> 00:11:20,340
relational algebra was based on sets.

262
00:11:20,340 --> 00:11:22,220
And we see some cases where we'll have

263
00:11:22,220 --> 00:11:28,660
to add extra stuff in our SQL statements to deal with that.

264
00:11:28,660 --> 00:11:31,580
So today again, it's just to be a crash course on modern SQL.

265
00:11:31,580 --> 00:11:34,300
I'm assuming everyone, whether or not you know it or not,

266
00:11:34,300 --> 00:11:37,139
you know enough from the SQL 92 standard, right?

267
00:11:37,139 --> 00:11:38,779
Select insert update leads.

268
00:11:38,779 --> 00:11:43,820
And I want to talk about the more sophisticated things

269
00:11:43,820 --> 00:11:46,060
you can do with them.

270
00:11:46,060 --> 00:11:48,100
But the overarching theme also will be

271
00:11:48,100 --> 00:11:49,820
is that we will open up the terminal,

272
00:11:49,820 --> 00:11:52,500
we'll try a bunch of these queries in different database systems.

273
00:11:52,500 --> 00:11:55,420
And we will see that even though there is a SQL standard,

274
00:11:55,420 --> 00:11:58,340
there is an internationally recognized document that says,

275
00:11:58,340 --> 00:12:00,420
here's what SQL should look like.

276
00:12:00,420 --> 00:12:03,540
Nobody implements it exactly that way, right?

277
00:12:03,540 --> 00:12:05,540
Everyone's going to have these weird nuances and quirks,

278
00:12:05,540 --> 00:12:08,180
whether they have different features or different nomenclature

279
00:12:08,180 --> 00:12:10,900
or syntax to do certain things.

280
00:12:10,900 --> 00:12:12,660
And in some cases, different semantics

281
00:12:12,660 --> 00:12:16,660
of different operations, where even though there's a SQL standard,

282
00:12:16,660 --> 00:12:19,780
it's going to be different form one system to the next.

283
00:12:19,779 --> 00:12:24,179
Who do you think is the biggest offender for the worst SQL implementation?

284
00:12:24,179 --> 00:12:25,100
Worst is not the right word.

285
00:12:25,100 --> 00:12:28,939
But the one that deviates from the standard the most.

286
00:12:28,939 --> 00:12:31,860
Let me take a guess.

287
00:12:31,860 --> 00:12:34,699
All right, to top four out of the, yes, in the back, yes.

288
00:12:34,699 --> 00:12:35,899
My SQL, he got it right, yes.

289
00:12:35,899 --> 00:12:39,019
My SQL is going to be the **** out of all these,

290
00:12:39,019 --> 00:12:41,539
where they're going to do all sorts of weird ****.

291
00:12:41,539 --> 00:12:44,819
More recently, they now have a flag where you can make it be more strict

292
00:12:44,819 --> 00:12:48,299
and try to be more closer to the SQL standard.

293
00:12:48,299 --> 00:12:50,339
But for the longest time, they do a bunch of weird things.

294
00:12:50,339 --> 00:12:53,179
And my problem is that I first started using the 80 basis,

295
00:12:53,179 --> 00:12:56,099
or relational basis, when I was in high school in the 90s,

296
00:12:56,099 --> 00:12:57,779
and we were using my SQL 3.

297
00:12:57,779 --> 00:13:00,939
So I have all these bad habits that I picked up from my SQL.

298
00:13:00,939 --> 00:13:02,419
And I'm like, oh, yeah, this is what SQL is.

299
00:13:02,419 --> 00:13:04,459
Then you realize when you start playing other systems,

300
00:13:04,459 --> 00:13:05,819
like, this is **** crazy.

301
00:13:05,819 --> 00:13:07,779
They're doing some weird stuff.

302
00:13:07,779 --> 00:13:08,939
But it's gotten better.

303
00:13:08,939 --> 00:13:12,019
And my SQL 8 has certainly improved a lot.

304
00:13:12,019 --> 00:13:14,379
All right, so we'll go through all of these aggregations,

305
00:13:14,379 --> 00:13:17,059
group eyes, the string date time operations.

306
00:13:17,059 --> 00:13:19,099
That's going to be the one where we see all the problems.

307
00:13:19,099 --> 00:13:20,379
And then a bunch of other different ways

308
00:13:20,379 --> 00:13:22,939
to interact with SQL queries.

309
00:13:22,939 --> 00:13:25,059
And then another theme about what we'll talk about

310
00:13:25,059 --> 00:13:28,059
is the goal of writing SQL statement oftentimes

311
00:13:28,059 --> 00:13:32,099
is to try to do all the computation on the database server

312
00:13:32,099 --> 00:13:35,699
itself within one overarching SQL query.

313
00:13:35,699 --> 00:13:37,459
I mean, we don't want to have to do a select,

314
00:13:37,459 --> 00:13:39,899
get some data back into a Python program or something,

315
00:13:39,899 --> 00:13:42,939
then operate on it, and then push it back and do more queries.

316
00:13:42,939 --> 00:13:46,899
We want to try to do everything we can on the server side.

317
00:13:46,899 --> 00:13:48,579
That's the database system because we

318
00:13:48,579 --> 00:13:50,379
want to be able to push the query to the data,

319
00:13:50,379 --> 00:13:54,019
not pull the data to the query.

320
00:13:54,019 --> 00:13:57,620
Again, this makes more sense as we go along.

321
00:13:57,620 --> 00:14:01,419
So for today, we're using a simple example database like this.

322
00:14:01,419 --> 00:14:04,579
It has three tables, student enrolled in course.

323
00:14:04,579 --> 00:14:06,939
It's basically trying to mimic a university.

324
00:14:06,939 --> 00:14:10,379
There are students that take classes and they're enrolled

325
00:14:10,379 --> 00:14:13,379
and they get grades in the various courses that are there.

326
00:14:13,379 --> 00:14:18,580
So we'll use this as the sample database as we go along.

327
00:14:18,580 --> 00:14:20,259
First things, aggregations.

328
00:14:20,259 --> 00:14:26,939
So aggregate functions are a way to compute some mathematical

329
00:14:26,939 --> 00:14:32,019
computation on a sequence of data or a bag of tuples.

330
00:14:32,019 --> 00:14:33,899
And you're basically going to call us it down

331
00:14:33,899 --> 00:14:35,580
into a single value.

332
00:14:35,580 --> 00:14:41,580
So the classic things would be average min max some account.

333
00:14:41,580 --> 00:14:46,180
And you're trying to compute the min value of a column

334
00:14:46,180 --> 00:14:50,620
across all tuples within a relation.

335
00:14:50,620 --> 00:14:51,740
So a next simple example like this is

336
00:14:51,740 --> 00:14:53,580
say we want to get off for the students.

337
00:14:53,580 --> 00:14:55,940
We want to count the number of students

338
00:14:55,940 --> 00:15:01,100
who have a login where the login ends with atcs.

339
00:15:01,100 --> 00:15:04,020
Like you have an atcs email address.

340
00:15:04,020 --> 00:15:07,460
And so we just put the account function here.

341
00:15:07,460 --> 00:15:09,500
And then the inside of it actually doesn't matter for account.

342
00:15:09,659 --> 00:15:11,700
We're just going to count the logins.

343
00:15:11,700 --> 00:15:13,220
And then we have a where call specifying

344
00:15:13,220 --> 00:15:17,019
when or what tuples should qualify.

345
00:15:17,019 --> 00:15:19,460
So again, my example here I'm putting login.

346
00:15:19,460 --> 00:15:20,700
You don't actually have to do that.

347
00:15:20,700 --> 00:15:22,659
You could put a star.

348
00:15:22,659 --> 00:15:23,820
That's equivalent.

349
00:15:23,820 --> 00:15:26,940
Because again, it's just counting the number of entries.

350
00:15:26,940 --> 00:15:28,460
You can actually put one.

351
00:15:28,460 --> 00:15:29,940
Again, also equivalent.

352
00:15:29,940 --> 00:15:31,460
It doesn't matter.

353
00:15:31,460 --> 00:15:32,940
Inside you can really put anything.

354
00:15:32,940 --> 00:15:35,220
You can put one plus one plus one.

355
00:15:35,220 --> 00:15:37,299
And the deity system should be smart up to realize that,

356
00:15:37,819 --> 00:15:40,379
in this last example here, I don't

357
00:15:40,379 --> 00:15:42,779
care what the expression is inside of the account.

358
00:15:42,779 --> 00:15:44,379
And I won't actually do that math.

359
00:15:44,379 --> 00:15:49,500
Because I didn't care about what's the count tuples that I have.

360
00:15:49,500 --> 00:15:52,099
You can have multiple aggregates in a single select output.

361
00:15:52,099 --> 00:15:55,019
So here now we're going to compute the average GPA

362
00:15:55,019 --> 00:15:58,339
and the counting the number of students.

363
00:15:58,339 --> 00:16:03,099
Again, that have the atcs login.

364
00:16:03,099 --> 00:16:06,539
And you would get back a single entry or single record

365
00:16:06,539 --> 00:16:10,059
in the output result for the two computations.

366
00:16:13,179 --> 00:16:14,139
Poor thing don't stand though.

367
00:16:14,139 --> 00:16:17,299
With aggregations, since you're trying to coalesce down

368
00:16:17,299 --> 00:16:21,539
a multiple tuples to a single scalar value,

369
00:16:21,539 --> 00:16:25,819
you can't reference anything in the select output

370
00:16:25,819 --> 00:16:29,099
that isn't part of the aggregate.

371
00:16:29,099 --> 00:16:30,179
So I can't do something like this.

372
00:16:30,179 --> 00:16:34,019
I can't go select the average GPA after you join the student

373
00:16:34,019 --> 00:16:36,059
table, the enroll table, and then also

374
00:16:36,059 --> 00:16:42,659
spit out the course ID of the enroll table.

375
00:16:42,659 --> 00:16:43,579
Because this is not defined.

376
00:16:43,579 --> 00:16:46,419
This doesn't make any sense.

377
00:16:46,419 --> 00:16:49,619
There isn't, again, you're taking multiple rows,

378
00:16:49,619 --> 00:16:51,859
you're can nesting it down, closing it down,

379
00:16:51,859 --> 00:16:54,019
collapsing it down for the average.

380
00:16:54,019 --> 00:16:57,299
What is the course ID in this context?

381
00:16:57,299 --> 00:16:59,019
It's nothing.

382
00:16:59,019 --> 00:17:02,059
So in this case here, what you sort of look at this,

383
00:17:02,059 --> 00:17:03,419
what you're really trying to do is you're

384
00:17:03,419 --> 00:17:08,059
trying to get for each course ID get the average GPA.

385
00:17:08,059 --> 00:17:09,539
So what you need to do is use this what

386
00:17:09,539 --> 00:17:12,059
is called a group-wide clause, where you're

387
00:17:12,059 --> 00:17:16,259
going to project tuples into buckets based on whatever

388
00:17:16,259 --> 00:17:18,940
the parameters are in the group-wide clause,

389
00:17:18,940 --> 00:17:23,220
and then compute the aggregate on each individual bucket.

390
00:17:23,220 --> 00:17:24,139
So you sort of think it like this.

391
00:17:24,139 --> 00:17:27,700
If I first do the join between the enroll table

392
00:17:27,700 --> 00:17:31,379
and the student table, I have all possible combinations

393
00:17:31,379 --> 00:17:32,779
based on the join.

394
00:17:32,779 --> 00:17:35,339
And then now I'm going to split them up based on the course

395
00:17:35,339 --> 00:17:39,579
ID, because that's what I have in my group-wide clause.

396
00:17:39,579 --> 00:17:43,299
And then now I compute the average for the GPA

397
00:17:43,299 --> 00:17:46,940
for each of those buckets.

398
00:17:46,940 --> 00:17:47,420
Does that sense?

399
00:17:50,899 --> 00:17:53,700
And this matches up like this.

400
00:17:53,700 --> 00:17:55,059
So again, the main takeaway this game,

401
00:17:55,059 --> 00:17:58,899
you have to have anything that's in a,

402
00:17:58,899 --> 00:18:01,259
anything that's not part of an aggregation

403
00:18:01,259 --> 00:18:03,140
has to appear in the group-wide clause.

404
00:18:03,140 --> 00:18:05,579
So again, in this case here, I don't have the student name.

405
00:18:05,579 --> 00:18:07,379
I can't put that there.

406
00:18:07,379 --> 00:18:10,500
I'd have to put it in the group-wide clause.

407
00:18:10,500 --> 00:18:11,700
We can open the terminal if you want.

408
00:18:11,700 --> 00:18:13,740
My SQL used to let you do this in some cases.

409
00:18:16,700 --> 00:18:20,940
Or we can actually list this, try this, if it happens.

410
00:18:20,940 --> 00:18:23,779
I hate typing on my surface.

411
00:18:23,779 --> 00:18:25,980
I'm going to use this laptop here.

412
00:18:25,980 --> 00:18:26,579
I'll log into it.

413
00:18:32,259 --> 00:18:35,579
All right, so we want to do this.

414
00:18:35,579 --> 00:18:37,299
Sorry, I have Postgres.

415
00:18:37,299 --> 00:18:39,019
I have a bunch of data sets of running.

416
00:18:39,019 --> 00:18:41,140
So the query we were trying to do was,

417
00:18:45,900 --> 00:18:51,140
essentially this, select average GPA, course ID from a rule,

418
00:18:51,140 --> 00:18:53,980
joining a rule table and student name.

419
00:18:53,980 --> 00:18:55,299
So Postgres doesn't let you do this,

420
00:18:55,299 --> 00:18:58,700
because it says the course ID has appear in the group-wide clause.

421
00:18:58,700 --> 00:18:59,379
That's good.

422
00:18:59,379 --> 00:19:01,059
That's what we expect.

423
00:19:01,059 --> 00:19:03,779
Let's go over to my SQL.

424
00:19:03,779 --> 00:19:06,299
My SQL doesn't let you do it.

425
00:19:06,299 --> 00:19:09,259
But let me see if I put it in the right mode by default.

426
00:19:12,619 --> 00:19:19,579
But there's a way to, it's enforcing the what mode it sends.

427
00:19:19,579 --> 00:19:24,779
If I go to traditional, then now from the same query,

428
00:19:24,779 --> 00:19:26,460
it lets me do it.

429
00:19:26,460 --> 00:19:29,539
And it spits out course ID 15445.

430
00:19:29,539 --> 00:19:32,579
Is that correct?

431
00:19:32,579 --> 00:19:33,899
No, right, because what does that mean?

432
00:19:33,899 --> 00:19:35,740
It's the average GPA for all courses,

433
00:19:35,740 --> 00:19:37,539
but it's spitting out one of them.

434
00:19:37,539 --> 00:19:39,619
So that's bad.

435
00:19:39,619 --> 00:19:41,779
So let's go now, take the same query,

436
00:19:41,779 --> 00:19:45,259
and we'll go over to SQLite.

437
00:19:45,259 --> 00:19:50,220
All right, who thinks it's going to work?

438
00:19:50,220 --> 00:19:52,099
Raise your hand if you say yes.

439
00:19:52,099 --> 00:19:54,379
And the man work meaning it'll actually run the query.

440
00:19:54,379 --> 00:19:57,500
I'm not saying the result's correct.

441
00:19:57,500 --> 00:19:58,980
We have one yes, two yeses.

442
00:19:58,980 --> 00:20:01,299
Who says no?

443
00:20:01,299 --> 00:20:03,579
Who says no?

444
00:20:03,579 --> 00:20:06,299
You did it.

445
00:20:06,299 --> 00:20:08,220
And I also spit out 15445.

446
00:20:08,220 --> 00:20:10,500
Is that the same value as my SQL?

447
00:20:10,500 --> 00:20:16,180
Yeah, GPA looks the same.

448
00:20:16,180 --> 00:20:17,339
All right, let's go to Oracle.

449
00:20:20,420 --> 00:20:21,700
Oracle doesn't like it.

450
00:20:21,700 --> 00:20:22,500
It's got to duck DB.

451
00:20:25,339 --> 00:20:26,339
Duck DB didn't like it.

452
00:20:26,339 --> 00:20:27,899
So my SQL, you can do it.

453
00:20:27,899 --> 00:20:31,259
If you make it be more like my SQL 5.7.8,

454
00:20:31,259 --> 00:20:32,819
but SQLite will do it.

455
00:20:32,819 --> 00:20:35,659
So again, this is the first example.

456
00:20:35,659 --> 00:20:37,459
We'll see it many times.

457
00:20:37,459 --> 00:20:40,579
SQL says one thing, but different systems

458
00:20:40,579 --> 00:20:41,339
are doing different things.

459
00:20:45,099 --> 00:20:46,659
All right, next thing you do is you

460
00:20:46,659 --> 00:20:47,779
have a having clause.

461
00:20:47,779 --> 00:20:49,379
Like say, if you want to start filtering

462
00:20:49,379 --> 00:20:53,819
on the aggregate commissary generating,

463
00:20:53,819 --> 00:20:57,299
you can add a having clause to specify

464
00:20:57,299 --> 00:21:00,299
whether what two-pool should match

465
00:21:00,299 --> 00:21:02,379
after you complete the aggregation.

466
00:21:02,379 --> 00:21:05,899
So say I want to get only the students that

467
00:21:05,899 --> 00:21:10,539
have an average GPA, that's greater than 3.9.

468
00:21:10,539 --> 00:21:13,339
So in this case here, I'm computing the aggregation,

469
00:21:13,339 --> 00:21:16,419
select average GPA as a standard GPA.

470
00:21:16,419 --> 00:21:19,939
And I'm trying to reference it here inside of my wear clause.

471
00:21:19,939 --> 00:21:22,859
I can't do that because at this point, when the system

472
00:21:22,859 --> 00:21:24,899
is actually calculating the query,

473
00:21:24,899 --> 00:21:27,099
it's computing the aggregation as it goes along.

474
00:21:27,099 --> 00:21:30,979
It doesn't know what the final result is.

475
00:21:30,979 --> 00:21:34,299
So the easy fix for this is to have a having clause, which

476
00:21:34,299 --> 00:21:35,859
is basically telling the system, OK,

477
00:21:35,859 --> 00:21:39,259
performative aggregation is produce the output that's

478
00:21:39,259 --> 00:21:41,539
defined in the select statement, and then

479
00:21:41,539 --> 00:21:43,539
apply this additional filter for having.

480
00:21:46,500 --> 00:21:48,539
This is actually not correct either, in some cases.

481
00:21:48,539 --> 00:21:50,859
I don't think the SQL student lets you do this either,

482
00:21:50,859 --> 00:21:52,500
because even though I have an alias

483
00:21:52,500 --> 00:21:56,579
appear for average GPA, the data system can say,

484
00:21:56,579 --> 00:21:58,819
I don't know what this is.

485
00:21:58,819 --> 00:22:01,219
My SQL lets you do it.

486
00:22:01,219 --> 00:22:02,059
Postgres does not.

487
00:22:02,059 --> 00:22:05,939
So instead, you have to basically write the aggregation

488
00:22:05,939 --> 00:22:07,459
clause again.

489
00:22:07,459 --> 00:22:08,939
And again, the data system should be smarter

490
00:22:08,939 --> 00:22:11,619
if they recognize that this average from the GPA

491
00:22:11,619 --> 00:22:13,299
is the same as that average GPA up there,

492
00:22:13,299 --> 00:22:15,379
and therefore compute the same computation.

493
00:22:15,379 --> 00:22:17,500
Don't perform the same computation twice.

494
00:22:18,019 --> 00:22:20,859
So essentially just doing this.

495
00:22:20,859 --> 00:22:23,220
Again, compute the aggregation and then do the additional

496
00:22:23,220 --> 00:22:26,660
filter throughout things you don't.

497
00:22:26,660 --> 00:22:29,660
Does that sense?

498
00:22:29,660 --> 00:22:31,420
All right.

499
00:22:31,420 --> 00:22:36,220
Strings and timestamps are dates are when things get really

500
00:22:36,220 --> 00:22:40,539
weird, not weird, but really inconsistent.

501
00:22:40,539 --> 00:22:46,500
So for string data types, the SQL standard specifies

502
00:22:46,579 --> 00:22:49,900
that the case of the strings within the values,

503
00:22:49,900 --> 00:22:51,420
that I mean the strings and the select statements,

504
00:22:51,420 --> 00:22:53,460
I mean like the actual data you're storing,

505
00:22:53,460 --> 00:22:55,460
that they should be case sensitive,

506
00:22:55,460 --> 00:22:58,700
and that when you want to have in your SQL statement

507
00:22:58,700 --> 00:23:02,380
constant strings, you want to use single quotes.

508
00:23:02,380 --> 00:23:05,819
Postgres, SQL server, and Oracle follow the standard.

509
00:23:05,819 --> 00:23:11,819
My SQL is, by default, case insensitive.

510
00:23:11,819 --> 00:23:14,859
And then they both SQLite and my SQL support,

511
00:23:14,859 --> 00:23:18,459
but single and double quotation marks

512
00:23:18,459 --> 00:23:21,299
to represent constants and strings.

513
00:23:21,299 --> 00:23:25,299
So let's see what my SQL does and see how weird this is.

514
00:23:25,299 --> 00:23:26,339
So let's go back here.

515
00:23:30,539 --> 00:23:35,339
Right, so you can represent a constant like this.

516
00:23:35,339 --> 00:23:39,500
Right, so you can have a select statement without a from clause

517
00:23:39,500 --> 00:23:42,419
in my SQL, right, and I can represent,

518
00:23:42,419 --> 00:23:44,219
it basically takes whatever the input is,

519
00:23:44,220 --> 00:23:45,539
and it'll spit it out.

520
00:23:45,539 --> 00:23:52,220
So I put a comma, I can do like one, two, three, like that.

521
00:23:52,220 --> 00:23:55,299
It'll make columns for all the things in the output.

522
00:23:55,299 --> 00:24:00,740
So for strings, I can have it as double quotes

523
00:24:00,740 --> 00:24:03,299
and single quotes.

524
00:24:03,299 --> 00:24:06,940
In the case of postgres, it won't let me do double quotes.

525
00:24:09,900 --> 00:24:11,860
Can't do that because it's trying to look for a column name

526
00:24:12,259 --> 00:24:14,939
that's the way you sort of escape columns names.

527
00:24:14,939 --> 00:24:18,699
But it'll support single quotes.

528
00:24:19,699 --> 00:24:22,419
So in SQLite, they support both.

529
00:24:24,219 --> 00:24:26,019
So I can go two-pock like this,

530
00:24:27,019 --> 00:24:30,099
and I can go with single quotes, like that.

531
00:24:30,099 --> 00:24:35,099
In Oracle, it's single quotes,

532
00:24:36,979 --> 00:24:39,219
but it doesn't like queries without a from clause.

533
00:24:40,220 --> 00:24:44,220
So in Oracle, they have this weird thing called the dual table,

534
00:24:44,220 --> 00:24:47,940
and this is a fake table that comes with Oracle,

535
00:24:47,940 --> 00:24:49,940
to allow you to write these kind of queries

536
00:24:49,940 --> 00:24:52,980
that against tables that don't actually exist.

537
00:24:52,980 --> 00:24:54,980
Right, so then I can get that.

538
00:24:54,980 --> 00:24:57,980
If you try to do like select star from from dual,

539
00:25:01,380 --> 00:25:03,380
right, you just get like an X.

540
00:25:04,660 --> 00:25:06,380
I think the newer version they got rid of the dual,

541
00:25:06,380 --> 00:25:08,860
you don't need any more of this is, this is Oracle 21,

542
00:25:09,139 --> 00:25:11,379
so it's a rather newer version, right?

543
00:25:13,019 --> 00:25:17,740
So like you can't do this, but like in Postgres,

544
00:25:17,740 --> 00:25:20,859
any other data system, you can treat SQL as like a calculator,

545
00:25:20,859 --> 00:25:24,459
you can put whatever you want and call it like that, right?

546
00:25:24,459 --> 00:25:26,339
So, all right, let's go back to my SQL,

547
00:25:27,740 --> 00:25:30,179
and let's look at some string functions.

548
00:25:30,179 --> 00:25:34,379
So I can call now.

549
00:25:35,220 --> 00:25:38,380
I can do like select star from student,

550
00:25:38,380 --> 00:25:41,820
where name equals two-pock with, you know, weird casing,

551
00:25:41,820 --> 00:25:46,020
and then it matched on the string two-pock, right?

552
00:25:46,020 --> 00:25:48,860
Because internally my SQL is treating the varchard

553
00:25:48,860 --> 00:25:50,380
as case insensitive.

554
00:25:51,620 --> 00:25:53,300
So if you want to now,

555
00:25:56,300 --> 00:26:00,140
if you want to treat it like any other database system

556
00:26:00,140 --> 00:26:01,740
where it actually is actually looking at the case

557
00:26:01,740 --> 00:26:04,340
as a true varchar, you can add this binary flag,

558
00:26:04,339 --> 00:26:08,379
in front of the keyword in front of the column name,

559
00:26:08,379 --> 00:26:11,019
and that'll treat it as like a binary string,

560
00:26:11,019 --> 00:26:12,819
like any other system.

561
00:26:12,819 --> 00:26:14,179
In this case here, now it doesn't match,

562
00:26:14,179 --> 00:26:16,539
but now it doesn't have a warning.

563
00:26:16,539 --> 00:26:18,740
So now I gotta go now call show warnings,

564
00:26:18,740 --> 00:26:20,980
and this is again, this is my SQL specific.

565
00:26:20,980 --> 00:26:24,980
So now they tell me that the binary expression is deprecated

566
00:26:24,980 --> 00:26:27,980
and be removed, and they tell me at least how to write it

567
00:26:27,980 --> 00:26:28,500
correctly.

568
00:26:29,459 --> 00:26:33,980
So now I have to cast the name as a binary,

569
00:26:33,980 --> 00:26:35,579
and then I can call it.

570
00:26:35,579 --> 00:26:38,420
So if I change the casing again, then I get two-pock.

571
00:26:39,860 --> 00:26:40,940
So this burns a lot of people,

572
00:26:40,940 --> 00:26:42,620
because you end up like thinking,

573
00:26:42,620 --> 00:26:47,220
oh, if you don't know that your varchar is case insensitive,

574
00:26:47,220 --> 00:26:49,420
you could store things multiple times,

575
00:26:49,420 --> 00:26:52,940
and thinking that it's gonna be different,

576
00:26:52,940 --> 00:26:54,099
because the case is different,

577
00:26:54,099 --> 00:26:56,700
but then my SQL says they're the same.

578
00:26:56,700 --> 00:26:57,860
Again, this is only my SQL.

579
00:26:57,860 --> 00:27:00,500
I don't know any other database system that actually does this.

580
00:27:00,500 --> 00:27:01,539
So that's a weird one.

581
00:27:02,220 --> 00:27:03,220
Yes?

582
00:27:03,220 --> 00:27:04,059
Yes?

583
00:27:04,059 --> 00:27:07,899
Why is the name house in the database is capitalized?

584
00:27:07,899 --> 00:27:10,379
So what you've for is the database.

585
00:27:10,379 --> 00:27:11,539
Is it the case?

586
00:27:11,539 --> 00:27:14,180
The question is, why is the name capitalized?

587
00:27:14,180 --> 00:27:15,019
Yeah.

588
00:27:15,019 --> 00:27:15,859
Yes.

589
00:27:15,859 --> 00:27:17,379
If I wanted to answer your questions,

590
00:27:17,379 --> 00:27:18,940
I thought it was really capitalized

591
00:27:18,940 --> 00:27:20,899
and I was working out over writing,

592
00:27:20,899 --> 00:27:22,420
or working out.

593
00:27:22,420 --> 00:27:23,420
So this question is,

594
00:27:25,500 --> 00:27:28,259
I'm telling you, so there's the data is being stored

595
00:27:28,259 --> 00:27:29,819
with the case sensitivity.

596
00:27:29,819 --> 00:27:33,299
The comparison operator when actually exudes the wear clause

597
00:27:33,299 --> 00:27:34,539
is ignoring case.

598
00:27:35,859 --> 00:27:38,659
Right? So it's not calling whenever string compare

599
00:27:38,659 --> 00:27:40,659
that you'd have in live C,

600
00:27:40,659 --> 00:27:42,659
it's calling either their own version of it

601
00:27:42,659 --> 00:27:44,740
or the case insensitive version of it.

602
00:27:45,779 --> 00:27:47,419
Because that was some decision that somebody made

603
00:27:47,419 --> 00:27:50,059
in the 1990s that kids carried over today.

604
00:27:51,299 --> 00:27:52,139
Yes?

605
00:27:53,299 --> 00:27:54,500
Why did they make the decision?

606
00:27:57,379 --> 00:27:58,779
Ask me that question at the very end,

607
00:27:58,779 --> 00:28:00,500
every get through all the b****.

608
00:28:00,500 --> 00:28:04,059
Again, it's probably because somebody did it the one way,

609
00:28:04,059 --> 00:28:05,700
they started out to do it.

610
00:28:05,700 --> 00:28:08,059
Or my sequel of the guy was actually,

611
00:28:08,059 --> 00:28:10,859
many cases trying to follow what Oracle did in some cases,

612
00:28:10,859 --> 00:28:12,180
but Oracle doesn't do this.

613
00:28:12,180 --> 00:28:13,180
I have no idea.

614
00:28:14,619 --> 00:28:15,779
We can email the guy.

615
00:28:16,700 --> 00:28:17,539
He's still alive.

616
00:28:21,299 --> 00:28:25,180
So yeah, I mean, there's a lot of times where people just did stuff

617
00:28:25,180 --> 00:28:26,940
because like one person did it without like thinking

618
00:28:26,940 --> 00:28:28,500
through the implications of it.

619
00:28:29,980 --> 00:28:31,500
Or they're trying to copy some other system,

620
00:28:31,500 --> 00:28:32,660
or they liked some other,

621
00:28:32,660 --> 00:28:35,059
you know, a particular feature of functionality.

622
00:28:35,059 --> 00:28:35,900
Right?

623
00:28:39,460 --> 00:28:40,779
Another question.

624
00:28:42,340 --> 00:28:43,620
I will see many examples where like,

625
00:28:43,620 --> 00:28:44,900
why would anyone ever do this?

626
00:28:44,900 --> 00:28:46,299
So do it this way.

627
00:28:47,620 --> 00:28:49,580
All right, so I think I showed a query like this before,

628
00:28:49,580 --> 00:28:50,660
just make sure you see it.

629
00:28:50,660 --> 00:28:52,500
So there's this like,

630
00:28:52,500 --> 00:28:54,460
like operation in in sequel,

631
00:28:54,460 --> 00:28:57,380
and you use this for sort of really primitive string matching

632
00:28:57,380 --> 00:28:58,860
and pattern matching.

633
00:28:58,860 --> 00:29:00,940
So you would use a, you call it like,

634
00:29:00,940 --> 00:29:04,819
and then you would say you would have a percent sign

635
00:29:04,819 --> 00:29:05,819
to represent a wild card.

636
00:29:05,819 --> 00:29:08,460
So instead of, if you're coming from like the Unix World star,

637
00:29:08,460 --> 00:29:09,259
or regular expression,

638
00:29:09,259 --> 00:29:12,579
you shouldn't mean match anything or dot.

639
00:29:12,579 --> 00:29:15,299
In sequel, it's the percent sign,

640
00:29:15,299 --> 00:29:17,980
and that'll match any substring,

641
00:29:17,980 --> 00:29:19,180
including empty strings.

642
00:29:19,180 --> 00:29:20,819
But if you just want to match one character,

643
00:29:20,819 --> 00:29:22,940
you would use the underscore.

644
00:29:22,940 --> 00:29:24,900
And there is support for regular expressions.

645
00:29:24,900 --> 00:29:27,460
I forget whether that is in the sequel standard,

646
00:29:27,460 --> 00:29:29,980
but everyone does it slightly different.

647
00:29:29,980 --> 00:29:34,500
You can write more complex string matching pattern.

648
00:29:36,220 --> 00:29:37,140
There's a bunch of string functions

649
00:29:37,140 --> 00:29:38,460
that also come in the sequel standard.

650
00:29:38,460 --> 00:29:39,940
To do things you would expect,

651
00:29:39,940 --> 00:29:40,940
like if you're familiar with Python,

652
00:29:40,940 --> 00:29:43,420
there's like all the Python functions,

653
00:29:43,420 --> 00:29:46,820
uppercase, lowercase, substrings, replacing strings,

654
00:29:46,820 --> 00:29:48,980
all that, all that's in the sequel standard.

655
00:29:48,980 --> 00:29:50,100
And for the most part,

656
00:29:50,100 --> 00:29:51,660
these are gonna be pretty consistent

657
00:29:51,660 --> 00:29:54,620
across the various systems.

658
00:29:55,940 --> 00:29:58,100
Where things go wrong is,

659
00:29:58,100 --> 00:29:58,779
what you would think would be

660
00:29:58,779 --> 00:30:01,300
the most simple operation, concatenating two strings,

661
00:30:01,300 --> 00:30:02,580
that's where everyone likes to do something

662
00:30:02,580 --> 00:30:03,940
slightly different.

663
00:30:03,940 --> 00:30:08,019
So the sequel standard says the double bar

664
00:30:08,019 --> 00:30:09,500
is the way you can catch strings.

665
00:30:10,820 --> 00:30:14,620
In sequel server, they use the plus sign.

666
00:30:15,980 --> 00:30:18,779
And then in my sequel, they don't have,

667
00:30:18,779 --> 00:30:21,139
these under the default mode,

668
00:30:21,139 --> 00:30:22,660
they don't have the double bar.

669
00:30:22,660 --> 00:30:23,940
They don't sort the plus sign.

670
00:30:23,940 --> 00:30:26,339
You have to use the concaten function.

671
00:30:28,180 --> 00:30:29,500
You can see that real quickly.

672
00:30:30,740 --> 00:30:33,019
So, going back to my sequel.

673
00:30:38,220 --> 00:30:39,099
So,

674
00:30:42,420 --> 00:30:44,899
I'm gonna do something like this, right?

675
00:30:44,899 --> 00:30:46,980
I get another warning, I share warnings.

676
00:30:49,619 --> 00:30:53,099
And it tells me, it doesn't like my syntax, right?

677
00:30:54,740 --> 00:30:57,139
Oh my goodness, that was the first warning, sorry.

678
00:30:57,139 --> 00:30:58,379
Boom.

679
00:30:58,379 --> 00:30:59,460
I got two warnings.

680
00:30:59,460 --> 00:31:02,779
Says the double bar is synonym for the OR,

681
00:31:02,779 --> 00:31:04,619
and therefore it's been to be deprecated.

682
00:31:05,619 --> 00:31:10,339
And they didn't like the way I was sending along

683
00:31:10,339 --> 00:31:12,460
the app sign in CS.

684
00:31:12,460 --> 00:31:14,700
So, we now try to call,

685
00:31:14,700 --> 00:31:17,700
we change the sequel mode in my sequel

686
00:31:17,700 --> 00:31:19,940
to follow the sequel standard.

687
00:31:19,940 --> 00:31:23,100
Now I can get the concatenation that I want.

688
00:31:26,259 --> 00:31:27,860
So again, it's concatenation,

689
00:31:27,860 --> 00:31:29,259
I think it would be super, super,

690
00:31:29,259 --> 00:31:31,180
it would be everyone should do the same thing,

691
00:31:31,180 --> 00:31:33,500
but again, it's some, in case of my sequel,

692
00:31:33,500 --> 00:31:35,059
it's some legacy thing from the 90s

693
00:31:35,059 --> 00:31:36,900
that they're trying to slowly undo.

694
00:31:39,380 --> 00:31:43,700
All right, date and time is probably the worst one.

695
00:31:43,700 --> 00:31:46,059
So, the sequel standard defines a bunch of ways

696
00:31:46,059 --> 00:31:50,179
to define date types, time types,

697
00:31:50,179 --> 00:31:52,299
also time with time stamps,

698
00:31:53,339 --> 00:31:54,339
different calendar types,

699
00:31:54,339 --> 00:31:56,579
Julian calendar, Gugorian calendar,

700
00:31:56,579 --> 00:32:00,019
but again, how the syntax is going to vary

701
00:32:00,019 --> 00:32:02,299
is going to be pretty annoying.

702
00:32:02,299 --> 00:32:04,539
So I want to give it now a demo where,

703
00:32:04,539 --> 00:32:07,779
try to do what would seem like a simple calculation,

704
00:32:07,779 --> 00:32:09,059
a simple computation.

705
00:32:09,059 --> 00:32:11,579
We just want to count the number days

706
00:32:11,579 --> 00:32:14,940
since from today to the beginning of the year.

707
00:32:14,940 --> 00:32:17,420
It's like 230 something, 247, right?

708
00:32:17,420 --> 00:32:20,500
Just the total number of calendar days.

709
00:32:20,500 --> 00:32:22,820
So I'm going to do this first in Postgres,

710
00:32:22,820 --> 00:32:26,180
and then we'll do this in my sequel,

711
00:32:26,180 --> 00:32:28,539
I do this in SQL Server.

712
00:32:28,539 --> 00:32:29,820
So the first thing we need to do is figure out

713
00:32:29,820 --> 00:32:33,539
how to get the current date, the current time.

714
00:32:34,820 --> 00:32:39,420
Well, there's in Postgres, there's a function called now,

715
00:32:39,420 --> 00:32:40,500
and that'll give you,

716
00:32:42,580 --> 00:32:44,900
you'll get back a time stamp with the current date.

717
00:32:45,460 --> 00:32:50,460
In my sequel, you can do the same thing in SQL Lite.

718
00:32:55,059 --> 00:32:58,100
You don't have a now function in DuckDB.

719
00:32:58,100 --> 00:33:00,340
DuckDB is going to follow up pretty much Postgres

720
00:33:00,340 --> 00:33:05,019
for a lot of things because they use the same SQL grammar.

721
00:33:05,019 --> 00:33:07,180
So they have a now function,

722
00:33:07,180 --> 00:33:08,180
I'm going to Oracle.

723
00:33:10,140 --> 00:33:12,380
Oracle does not have a now function.

724
00:33:12,380 --> 00:33:14,420
All right, so there's another way you can get the time stamp.

725
00:33:14,460 --> 00:33:15,940
So in the SQL standard,

726
00:33:15,940 --> 00:33:19,380
there's something called a function called current time stamp.

727
00:33:20,860 --> 00:33:24,100
All right, except it's not a function, it's a keyword.

728
00:33:25,820 --> 00:33:29,100
And then in my sequel, they have the function,

729
00:33:30,140 --> 00:33:33,340
they have the keyword in SQL Lite,

730
00:33:35,380 --> 00:33:36,380
they don't have the function,

731
00:33:38,420 --> 00:33:40,900
they have the keyword, and an Oracle

732
00:33:41,900 --> 00:33:44,900
doesn't give us a weird error,

733
00:33:44,900 --> 00:33:46,900
about that one, come back to that in a second,

734
00:33:46,900 --> 00:33:48,660
and then on the keyword.

735
00:33:48,660 --> 00:33:51,100
So they have the function, but we're getting this other weird error.

736
00:33:51,100 --> 00:33:53,900
Date time interval precision at a range.

737
00:33:53,900 --> 00:33:55,900
Okay, so what's that?

738
00:33:55,900 --> 00:33:58,900
So now we got to go back, maybe,

739
00:33:58,900 --> 00:34:00,900
oh, it's great, it's Oracle.

740
00:34:00,900 --> 00:34:03,900
It doesn't like having a select clause without a front,

741
00:34:03,900 --> 00:34:05,900
a select statement without a front clause.

742
00:34:05,900 --> 00:34:07,900
So let's add our fake table, dual,

743
00:34:07,900 --> 00:34:09,900
all right, then we get it, right?

744
00:34:10,460 --> 00:34:14,460
But it's the keyword, and not the timestamp, all right?

745
00:34:15,260 --> 00:34:18,420
All right, so now we can get the current time stamp,

746
00:34:18,420 --> 00:34:20,260
the current day.

747
00:34:21,619 --> 00:34:22,820
And so what we can do is now,

748
00:34:22,820 --> 00:34:27,660
we can start casting strings or varcharis into date types,

749
00:34:27,660 --> 00:34:29,740
and then there's this extract function in the SQL standard

750
00:34:29,740 --> 00:34:33,460
that allows us to extract some part of that data timestamp.

751
00:34:33,460 --> 00:34:35,940
So this is saying extract the day from,

752
00:34:35,940 --> 00:34:40,940
and then today's date as a string cast it into a date type,

753
00:34:42,139 --> 00:34:44,940
right? And again, there's syntactic sugar

754
00:34:44,940 --> 00:34:47,420
for all these different systems that are like non-standard.

755
00:34:47,420 --> 00:34:50,659
So in Postgres, if I try to just give the string,

756
00:34:50,659 --> 00:34:51,420
it's gonna throw an error,

757
00:34:51,420 --> 00:34:53,300
because it says I can't, I need to operate,

758
00:34:53,300 --> 00:34:54,659
the extract function needs to operate on the date,

759
00:34:54,659 --> 00:34:56,420
or you're giving me a varchar,

760
00:34:56,420 --> 00:34:58,980
but I can add these two columns at the end,

761
00:34:58,980 --> 00:35:00,740
and then put date at the end,

762
00:35:00,740 --> 00:35:04,659
and then that's gonna cast it to a date type.

763
00:35:05,379 --> 00:35:07,500
Can you see that or no, sorry?

764
00:35:07,500 --> 00:35:08,339
Yeah.

765
00:35:10,940 --> 00:35:11,779
Shoot, sorry.

766
00:35:14,219 --> 00:35:15,539
You do this, yeah.

767
00:35:17,819 --> 00:35:19,940
I know it's wrong, sorry, let's try it again.

768
00:35:23,019 --> 00:35:24,019
All right, so here,

769
00:35:25,940 --> 00:35:27,139
I can give it a string,

770
00:35:27,139 --> 00:35:28,779
and then I put colon colon date,

771
00:35:28,779 --> 00:35:31,420
and that converts it to a date,

772
00:35:31,420 --> 00:35:35,260
but that's only in Postgres,

773
00:35:36,220 --> 00:35:38,700
I can't do this in any other system,

774
00:35:38,700 --> 00:35:39,539
except for duct Db,

775
00:35:39,539 --> 00:35:41,579
because they follow the same standard, right?

776
00:35:41,579 --> 00:35:45,420
So if I go to my SQL, try to do the same thing,

777
00:35:45,420 --> 00:35:48,019
doesn't like that, go to SQLite,

778
00:35:48,019 --> 00:35:49,659
doesn't like that,

779
00:35:49,659 --> 00:35:52,900
go to duct Db, or Oracle's not gonna like that from dual.

780
00:35:55,260 --> 00:35:57,420
Doesn't know what a date is,

781
00:35:57,420 --> 00:35:59,940
and this duct Db should do it, right?

782
00:35:59,940 --> 00:36:01,780
Cause again, duct Db follows the same grammar.

783
00:36:01,780 --> 00:36:03,700
Okay, so we can use the distract function,

784
00:36:03,700 --> 00:36:08,780
and maybe extract what the current date is,

785
00:36:08,780 --> 00:36:11,059
or try to figure out how many days since,

786
00:36:11,059 --> 00:36:13,260
from now until the beginning of the year.

787
00:36:13,260 --> 00:36:14,659
So let's start with Postgres.

788
00:36:15,860 --> 00:36:18,860
So it turns out it's pretty simple with Postgres.

789
00:36:19,940 --> 00:36:24,460
So we can just cast the string of today's current date

790
00:36:25,460 --> 00:36:27,980
to a date type,

791
00:36:28,219 --> 00:36:31,460
and then subtract it from the string of the current,

792
00:36:33,539 --> 00:36:35,300
of the beginning of the year.

793
00:36:35,300 --> 00:36:37,579
And we could use the, if we wanted to,

794
00:36:37,579 --> 00:36:39,659
we could go back here and use current timestamp,

795
00:36:39,659 --> 00:36:44,740
or maybe use the now function, this should work, right?

796
00:36:44,740 --> 00:36:48,059
So that gets today, so cast it as a date,

797
00:36:48,059 --> 00:36:51,460
subtracting the, taking the tays date,

798
00:36:51,460 --> 00:36:53,340
and subtracting by the beginning of the year,

799
00:36:53,340 --> 00:36:55,860
and we get 241, which I assume is correct.

800
00:36:58,460 --> 00:37:03,460
So let's try the same thing now in my SQL.

801
00:37:04,699 --> 00:37:06,780
So again, since they don't have the now function,

802
00:37:06,780 --> 00:37:09,539
we'll do it with casting, right?

803
00:37:09,539 --> 00:37:11,579
So now we get a weird number, we get 729.

804
00:37:13,659 --> 00:37:14,500
What's that?

805
00:37:16,340 --> 00:37:18,300
And surprisingly, actually, somebody on YouTube,

806
00:37:18,300 --> 00:37:21,619
in a comment of all places, told me what it was.

807
00:37:21,619 --> 00:37:23,260
It's the, and this is weird.

808
00:37:23,260 --> 00:37:27,420
So the first number is, today's current month,

809
00:37:27,420 --> 00:37:31,740
subtracted by January, so eight minus one is seven.

810
00:37:32,659 --> 00:37:36,300
Then it's, today's what, the 30th?

811
00:37:36,300 --> 00:37:38,619
So then it's the, today's day,

812
00:37:38,619 --> 00:37:41,659
subtracted by January 1st, plus 29.

813
00:37:41,659 --> 00:37:43,980
So you get 729, all right?

814
00:37:45,260 --> 00:37:46,659
So that's wrong, can't do that.

815
00:37:48,460 --> 00:37:50,900
So what we can do instead is we can,

816
00:37:54,380 --> 00:37:55,220
I'm sorry.

817
00:37:56,219 --> 00:37:57,899
We can get the,

818
00:38:00,299 --> 00:38:02,059
sorry, 20, 20, sorry.

819
00:38:04,939 --> 00:38:06,339
All right, there we go, sorry.

820
00:38:06,339 --> 00:38:09,299
So what we're doing here now is we're getting the,

821
00:38:09,299 --> 00:38:12,059
the units, we're getting the date of today

822
00:38:12,059 --> 00:38:15,459
and beginning of the year, converting it to a unit's timestamp.

823
00:38:15,459 --> 00:38:18,179
A unit's timestamp is the, it's a number of seconds

824
00:38:18,179 --> 00:38:21,539
since the unit's epochs, like January 1st, 1970.

825
00:38:22,539 --> 00:38:24,779
So we're converting it now to the number of seconds

826
00:38:24,779 --> 00:38:28,380
from today, since 1970.

827
00:38:28,380 --> 00:38:30,860
And then we subtract that from the number of seconds

828
00:38:30,860 --> 00:38:34,860
since January 1st, and we divide that by 60 seconds

829
00:38:34,860 --> 00:38:36,980
times 60 minutes times 24 hours.

830
00:38:38,259 --> 00:38:39,259
And we get 241.

831
00:38:40,659 --> 00:38:43,380
So this is my original idea.

832
00:38:43,380 --> 00:38:46,500
And then turns out there's a date diff function

833
00:38:46,500 --> 00:38:50,179
in my state of that you can do this.

834
00:38:50,179 --> 00:38:53,099
But, Postgres doesn't have it,

835
00:38:54,179 --> 00:38:56,299
if the DB doesn't have it, see if Oracle has it.

836
00:38:58,619 --> 00:38:59,460
I'm dual.

837
00:38:59,460 --> 00:39:01,940
All right, they don't have it.

838
00:39:01,940 --> 00:39:05,779
All right, all right, so that's my, that's my SQL thing.

839
00:39:05,779 --> 00:39:09,179
All right, so now let's try in SQLite.

840
00:39:09,179 --> 00:39:11,500
So SQLite doesn't have date diff.

841
00:39:11,500 --> 00:39:14,619
We can't do that subtraction that we did in Postgres.

842
00:39:14,619 --> 00:39:17,899
The best solution I can come up with

843
00:39:17,900 --> 00:39:21,980
is the convert the timestamp for today,

844
00:39:21,980 --> 00:39:24,180
beginning of year, to the Julian calendar,

845
00:39:24,180 --> 00:39:27,180
which is the number of days since Julian Caesar's birthday

846
00:39:27,180 --> 00:39:28,420
in whatever you see.

847
00:39:29,700 --> 00:39:31,360
You laugh, but a lot of the banks ran off that

848
00:39:31,360 --> 00:39:33,900
s*** up until the 80s, right?

849
00:39:35,180 --> 00:39:37,059
And then you get 241.

850
00:39:37,059 --> 00:39:39,180
But of course, we're getting it as a,

851
00:39:40,180 --> 00:39:43,139
as a floating point number, so we can cast it as an integer,

852
00:39:43,139 --> 00:39:44,500
and then we get 241.

853
00:39:44,500 --> 00:39:45,579
All right.

854
00:39:46,579 --> 00:39:48,259
I'm not, I forget how to do this in Oracle.

855
00:39:48,259 --> 00:39:49,340
We're not gonna do an Oracle.

856
00:39:50,340 --> 00:39:54,299
But the main point again, it seems like it could be a simple thing,

857
00:39:54,299 --> 00:39:57,179
but all these timestamp stuff is, is, is,

858
00:39:57,179 --> 00:39:58,179
woefully different.

859
00:39:59,259 --> 00:40:01,539
All right, any questions about this or far?

860
00:40:01,539 --> 00:40:02,380
Yes.

861
00:40:02,380 --> 00:40:04,380
So when you know like one of the lower functions,

862
00:40:04,380 --> 00:40:07,139
when I do people do that, it's taking some of these.

863
00:40:07,139 --> 00:40:08,699
Why would you want a lower function?

864
00:40:09,419 --> 00:40:10,259
Um,

865
00:40:14,419 --> 00:40:15,259
good question.

866
00:40:16,099 --> 00:40:17,699
I mean, you might need it for like data cleaning.

867
00:40:19,299 --> 00:40:21,059
You might want it for,

868
00:40:22,939 --> 00:40:23,779
yeah, it's good question.

869
00:40:23,779 --> 00:40:26,460
It makes it in the standard, right?

870
00:40:26,460 --> 00:40:28,099
It could be, I mean, it doesn't have to be for,

871
00:40:28,099 --> 00:40:30,579
also in the wear clause, you can have it in the from clause.

872
00:40:30,579 --> 00:40:31,419
Right?

873
00:40:31,419 --> 00:40:33,699
So if I go back to my SQL, right?

874
00:40:33,699 --> 00:40:37,259
So select star from students.

875
00:40:39,539 --> 00:40:41,619
Where a name equals two-pock, right?

876
00:40:43,699 --> 00:40:45,859
Student, singular, right?

877
00:40:45,859 --> 00:40:47,379
So maybe I want to do this though.

878
00:40:49,659 --> 00:40:51,019
In my output, right?

879
00:40:51,019 --> 00:40:53,179
Get a little case like that, right?

880
00:40:55,299 --> 00:40:56,379
Yes, sorry, yes.

881
00:40:56,379 --> 00:40:57,779
Hey, here, using like,

882
00:40:57,779 --> 00:41:00,980
up to the size of the size of the memory is dial that.

883
00:41:00,980 --> 00:41:04,259
So, you know, if they are all your relational,

884
00:41:04,259 --> 00:41:06,179
uh, messages and like,

885
00:41:06,179 --> 00:41:07,179
their logic,

886
00:41:10,379 --> 00:41:11,779
yeah, so her question is,

887
00:41:12,539 --> 00:41:15,659
why do people have all these weird idioms in their,

888
00:41:15,659 --> 00:41:16,779
in their SQL?

889
00:41:18,379 --> 00:41:20,179
When at a high level, they seem to be all,

890
00:41:20,179 --> 00:41:21,179
so doing the same thing,

891
00:41:21,179 --> 00:41:22,859
but it's these one off things are different.

892
00:41:22,859 --> 00:41:23,980
And that's a related to his question.

893
00:41:23,980 --> 00:41:25,219
Why do, why are all these,

894
00:41:25,859 --> 00:41:27,980
why are all these different nuances for these different systems?

895
00:41:28,460 --> 00:41:31,219
Because somebody was writing in thought of was cool, right?

896
00:41:31,739 --> 00:41:33,139
And then they showed their friends like,

897
00:41:33,139 --> 00:41:34,019
yeah, that's cool, right?

898
00:41:34,019 --> 00:41:35,419
So that the double colon and postgres,

899
00:41:35,420 --> 00:41:37,180
I agree, that's cool, that casting thing,

900
00:41:37,180 --> 00:41:39,579
but they only do it, right?

901
00:41:40,940 --> 00:41:42,619
The dual table, I don't know what,

902
00:41:43,780 --> 00:41:44,619
I went up.

903
00:41:45,659 --> 00:41:46,500
The,

904
00:41:47,820 --> 00:41:49,619
yeah, so like, give another example.

905
00:41:49,619 --> 00:41:52,860
So like, there's a shortcut in SQL

906
00:41:52,860 --> 00:41:54,659
to do basically select star, right?

907
00:41:54,659 --> 00:41:57,820
So select star from student,

908
00:41:59,099 --> 00:42:00,500
gives you all the two goals, right?

909
00:42:00,500 --> 00:42:01,740
But in Postgres,

910
00:42:01,740 --> 00:42:03,019
which I think is also in the SQL standard,

911
00:42:03,019 --> 00:42:05,380
I can just write table and get that, right?

912
00:42:06,340 --> 00:42:11,059
In my SQL, I can do that.

913
00:42:11,059 --> 00:42:12,420
That's cool.

914
00:42:12,420 --> 00:42:13,260
SQL light.

915
00:42:15,860 --> 00:42:17,420
Yep, doesn't like it.

916
00:42:17,420 --> 00:42:18,820
In duckDB,

917
00:42:21,579 --> 00:42:23,220
they do it, but they also have another one.

918
00:42:23,220 --> 00:42:24,539
I think you just go,

919
00:42:25,740 --> 00:42:27,700
I think you just go fetch, now where is it?

920
00:42:30,860 --> 00:42:33,140
From, right?

921
00:42:33,140 --> 00:42:34,019
You can just do that.

922
00:42:35,820 --> 00:42:37,539
So they all had their weird idioms.

923
00:42:37,539 --> 00:42:38,660
I mean, so some of these things

924
00:42:38,660 --> 00:42:41,140
where are based on customer feedback,

925
00:42:41,140 --> 00:42:43,260
like the customer says, I need functions

926
00:42:43,260 --> 00:42:44,420
that operate on JSON, right?

927
00:42:44,420 --> 00:42:45,900
So it's so many ads that.

928
00:42:45,900 --> 00:42:48,460
And a lot of times these features get added

929
00:42:48,460 --> 00:42:51,300
before they show up in the standard, right?

930
00:42:51,300 --> 00:42:53,420
So like the JSON XML stuff is a good example of this.

931
00:42:53,420 --> 00:42:56,780
They, that got out of the SQL standard like 2006,

932
00:42:56,780 --> 00:42:58,660
but a lot of relational databases at the time,

933
00:42:58,660 --> 00:43:01,940
they were the 2000s, had some support for XML.

934
00:43:01,940 --> 00:43:03,380
And so what happens is like,

935
00:43:03,380 --> 00:43:06,380
the standard body is, it's not much of a randos,

936
00:43:06,380 --> 00:43:08,099
it's the people at different companies.

937
00:43:08,099 --> 00:43:09,220
So in the SQL standard body,

938
00:43:09,220 --> 00:43:10,380
there's somebody from Oracle,

939
00:43:10,380 --> 00:43:11,860
there's somebody from Sybase,

940
00:43:11,860 --> 00:43:14,380
somebody from IBM.

941
00:43:14,380 --> 00:43:16,300
And they show up at the standards committee

942
00:43:16,300 --> 00:43:17,820
and they all try to get whatever they have,

943
00:43:17,820 --> 00:43:19,260
proprietary thing that they have,

944
00:43:19,260 --> 00:43:22,140
they try to get that into the standard, right?

945
00:43:22,140 --> 00:43:24,420
Oracle probably do this more,

946
00:43:24,420 --> 00:43:25,460
the best of people more recently,

947
00:43:25,460 --> 00:43:28,940
Oracle got their version of property graph queries

948
00:43:28,940 --> 00:43:30,500
in the SQL standard, right?

949
00:43:30,500 --> 00:43:31,860
They base theirs on Cypher,

950
00:43:31,860 --> 00:43:33,380
which is in Neo4j,

951
00:43:33,380 --> 00:43:37,660
that's now the PGQ stuff in the SQL standard.

952
00:43:37,660 --> 00:43:41,420
And so they got their extensions for graph queries

953
00:43:41,420 --> 00:43:42,380
in the SQL standard,

954
00:43:42,380 --> 00:43:44,460
because they were sort of almost ahead of the time.

955
00:43:44,460 --> 00:43:46,140
So that's how these things show up in the SQL standard.

956
00:43:46,140 --> 00:43:48,820
And so if everybody has competing ideas

957
00:43:48,820 --> 00:43:50,340
for how something should be done,

958
00:43:50,340 --> 00:43:51,740
you end up with the lowest common denominator,

959
00:43:51,740 --> 00:43:52,820
somebody could try to support everyone,

960
00:43:52,820 --> 00:43:56,140
but then no one exactly supports the standard.

961
00:43:57,860 --> 00:43:58,900
I'm not saying it's a good thing,

962
00:43:58,900 --> 00:44:00,500
but like, it's,

963
00:44:00,739 --> 00:44:02,059
we live in a different time also too,

964
00:44:02,059 --> 00:44:05,699
where there's so many different database companies,

965
00:44:05,699 --> 00:44:07,300
and there's not one,

966
00:44:07,300 --> 00:44:09,500
there isn't one company I say that owns the market

967
00:44:09,500 --> 00:44:13,860
and can bend people according to the will, right?

968
00:44:13,860 --> 00:44:15,820
So I said before,

969
00:44:15,820 --> 00:44:18,539
in the 1980s, IBM was the huge company, right?

970
00:44:18,539 --> 00:44:20,659
IBM was the computer company.

971
00:44:20,659 --> 00:44:21,659
So whatever IBM said,

972
00:44:21,659 --> 00:44:24,659
that was considered the de facto standard.

973
00:44:24,659 --> 00:44:28,300
And so that's sort of how we end up with SQL today.

974
00:44:28,300 --> 00:44:30,099
But there isn't a company like that now.

975
00:44:30,099 --> 00:44:33,339
Like the closest thing would be Google put out

976
00:44:33,339 --> 00:44:35,579
their standard of SQL called Zeta SQL,

977
00:44:35,579 --> 00:44:36,659
internally it's called something else,

978
00:44:36,659 --> 00:44:38,460
but they open source a parser

979
00:44:39,420 --> 00:44:44,420
and the grammar fountain and the spec for their version of SQL.

980
00:44:44,779 --> 00:44:48,299
Nobody uses it, and Google's huge, right?

981
00:44:48,299 --> 00:44:50,099
The closest you're gonna get today is Postgres.

982
00:44:50,099 --> 00:44:51,819
A lot of these database companies, when you start out,

983
00:44:51,819 --> 00:44:54,219
instead of building like the grammar file from scratch,

984
00:44:54,219 --> 00:44:55,460
you go take the Postgres one,

985
00:44:55,460 --> 00:44:57,940
hack it up and inject in your system.

986
00:44:57,940 --> 00:45:00,659
That's a we did, and then DuckDB took our code

987
00:45:00,659 --> 00:45:02,500
and they put it in DuckDB, right?

988
00:45:02,500 --> 00:45:05,059
This bunch of systems are based on Postgres grammar

989
00:45:05,059 --> 00:45:07,099
because they, because this open source may use it.

990
00:45:07,099 --> 00:45:08,179
That's the closest you're gonna get

991
00:45:08,179 --> 00:45:09,780
to your universal standard today.

992
00:45:09,780 --> 00:45:13,780
But again, I just showed you how there's from in DuckDB,

993
00:45:13,780 --> 00:45:18,179
but that's not in Postgres, right?

994
00:45:18,179 --> 00:45:19,500
They've adapted it.

995
00:45:22,380 --> 00:45:23,220
Yes.

996
00:45:23,219 --> 00:45:30,219
What's the point of having a standard if no one's gonna follow it?

997
00:45:31,899 --> 00:45:33,099
I mean, there's a speed limit,

998
00:45:33,099 --> 00:45:34,899
and everyone drives over it, right?

999
00:45:34,899 --> 00:45:39,899
Like, no, so, so, I showed you what's the select statements

1000
00:45:41,139 --> 00:45:44,059
like the, and they were slightly different

1001
00:45:44,059 --> 00:45:45,459
from one system to the next,

1002
00:45:45,459 --> 00:45:48,379
but you understood what it was doing basically, right?

1003
00:45:48,379 --> 00:45:49,939
The nuances of different systems,

1004
00:45:49,939 --> 00:45:51,299
yeah, you may have to go read the documentation

1005
00:45:51,299 --> 00:45:53,099
or ask chat to BT what to do,

1006
00:45:53,099 --> 00:45:57,579
but like, at a high level, the concepts are the same, right?

1007
00:46:00,460 --> 00:46:02,259
Just, you know, the, the, the, the, the,

1008
00:46:02,259 --> 00:46:04,579
the specifics, these systems gonna be different.

1009
00:46:06,619 --> 00:46:07,739
Snowflake is a good outlier.

1010
00:46:07,739 --> 00:46:09,819
Actually, Snowflake started from scratch in 2013.

1011
00:46:09,819 --> 00:46:10,819
They didn't take Postgres.

1012
00:46:10,819 --> 00:46:12,339
They said, they just came up with their own grammar.

1013
00:46:12,339 --> 00:46:14,339
So there's now a Snowflake SQL grammar

1014
00:46:14,339 --> 00:46:17,139
that has things that other systems don't support.

1015
00:46:17,139 --> 00:46:19,500
If I was, if I was building a new data system scratch today,

1016
00:46:19,500 --> 00:46:21,579
I would not do it Snowflake did.

1017
00:46:21,579 --> 00:46:22,739
It was a different time.

1018
00:46:22,739 --> 00:46:24,299
I would start with Postgres,

1019
00:46:24,299 --> 00:46:26,339
and then expand upon the way DuckDB did.

1020
00:46:30,299 --> 00:46:31,139
Okay.

1021
00:46:32,500 --> 00:46:34,339
Keep going, it's still a lot to cover.

1022
00:46:36,299 --> 00:46:39,419
In the sake of time, I'm gonna skip output redirection,

1023
00:46:41,259 --> 00:46:44,219
because you're not really gonna need that for the homework.

1024
00:46:44,219 --> 00:46:46,019
Let's jump ahead to window functions.

1025
00:46:47,779 --> 00:46:50,419
All right, so before we showed aggregations,

1026
00:46:51,260 --> 00:46:56,260
they were computing sort of sort of one shot calculation

1027
00:46:56,260 --> 00:46:59,380
across the entire input set to,

1028
00:46:59,380 --> 00:47:02,500
or the relation that was being inputted to the,

1029
00:47:06,220 --> 00:47:07,860
for the aggregate function that you're operating

1030
00:47:07,860 --> 00:47:09,260
on the front clause.

1031
00:47:09,260 --> 00:47:11,700
But there's also times where you may need one

1032
00:47:11,700 --> 00:47:14,019
of what is called a sliding calculation,

1033
00:47:14,019 --> 00:47:17,460
where I think it would like a rolling tally,

1034
00:47:17,460 --> 00:47:19,300
as you go from one to both of the next

1035
00:47:19,300 --> 00:47:20,620
as you're scanning along,

1036
00:47:20,620 --> 00:47:23,780
you wanna update some kind of aggregate function

1037
00:47:23,780 --> 00:47:27,460
so that for every single tuple that you're outputting

1038
00:47:27,460 --> 00:47:30,700
from your select statement, the aggregate is sort of a snapshot

1039
00:47:30,700 --> 00:47:33,060
in time of when that tuple was processed.

1040
00:47:33,980 --> 00:47:35,700
All right, so it's like an aggregate function

1041
00:47:35,700 --> 00:47:38,460
where you're not grouping them to a single output

1042
00:47:38,460 --> 00:47:40,980
for every single final output.

1043
00:47:40,980 --> 00:47:43,700
For every single tuple, it's gonna have its own computation

1044
00:47:43,700 --> 00:47:44,620
for that aggregation.

1045
00:47:45,620 --> 00:47:49,260
So the way this works is you would have like a function here,

1046
00:47:49,260 --> 00:47:50,300
this would be all your aggregate functions,

1047
00:47:50,300 --> 00:47:53,940
minmax, count average, as we saw before,

1048
00:47:53,940 --> 00:47:56,020
as well as some additional ones.

1049
00:47:56,020 --> 00:47:59,540
And then you're gonna specify what is the sort of scope

1050
00:47:59,540 --> 00:48:02,060
or the range that you're going to compute

1051
00:48:02,060 --> 00:48:03,580
this calculation for, right?

1052
00:48:03,580 --> 00:48:05,140
Basically sort of how to slice up the data

1053
00:48:05,140 --> 00:48:07,060
and source it and sort it.

1054
00:48:09,220 --> 00:48:11,620
So let's look at some examples like this.

1055
00:48:11,620 --> 00:48:13,700
So I can have all the aggregation functions

1056
00:48:13,700 --> 00:48:17,820
that I have before, minmax, count, and so forth.

1057
00:48:17,820 --> 00:48:19,140
And then I have these additional ones,

1058
00:48:19,140 --> 00:48:22,340
like the row number that tell me what row my tuples

1059
00:48:22,340 --> 00:48:26,820
is in my output, as well as a rank if I'm sorting them.

1060
00:48:26,820 --> 00:48:29,019
So if I have like an order by clause,

1061
00:48:29,019 --> 00:48:31,140
like the order students by GPA,

1062
00:48:31,140 --> 00:48:32,900
I can tell you what your position is

1063
00:48:32,900 --> 00:48:35,380
using the rank function, right?

1064
00:48:35,380 --> 00:48:37,340
You couldn't do that with the aggregate

1065
00:48:37,340 --> 00:48:38,780
or the aggregation function because there's

1066
00:48:38,780 --> 00:48:40,380
things that get collapsed down.

1067
00:48:41,580 --> 00:48:43,220
All right, so in this case here, this example here,

1068
00:48:43,220 --> 00:48:45,700
I can do select star from row number over,

1069
00:48:45,699 --> 00:48:49,299
and then the empty parentheses, because I'm not partitioning it.

1070
00:48:49,299 --> 00:48:51,980
And that'll give me output like this, what it'll tell me,

1071
00:48:51,980 --> 00:48:53,939
again, for all my output tuples,

1072
00:48:53,939 --> 00:48:56,419
where do I appear in the list for that?

1073
00:49:02,419 --> 00:49:04,059
If you have the over clause, you can specify

1074
00:49:04,059 --> 00:49:06,619
how you want to group tables together,

1075
00:49:06,619 --> 00:49:07,939
I'm sorry, group tuples together,

1076
00:49:07,939 --> 00:49:09,619
like if you didn't win a function.

1077
00:49:09,619 --> 00:49:12,819
And then you can use the partition by like a group by

1078
00:49:12,819 --> 00:49:15,179
of how to group them up.

1079
00:49:15,179 --> 00:49:17,819
So for this query here, we're doing select the course ID

1080
00:49:17,819 --> 00:49:19,779
and the student ID from the roll table.

1081
00:49:19,779 --> 00:49:24,019
And I want to get the row number of each student record

1082
00:49:24,019 --> 00:49:25,619
or in the roll table.

1083
00:49:26,779 --> 00:49:28,859
But then I want to partition it by course ID.

1084
00:49:28,859 --> 00:49:31,859
So I would get an output like this for every single course.

1085
00:49:31,859 --> 00:49:34,899
It would tell me for every student ID,

1086
00:49:34,899 --> 00:49:38,379
what position they are in that group.

1087
00:49:38,379 --> 00:49:40,980
All right, this is sort of a cluster like this.

1088
00:49:42,980 --> 00:49:44,219
Then if you have an order by clause,

1089
00:49:44,219 --> 00:49:46,939
you can then control how the tuples will be sorted

1090
00:49:46,939 --> 00:49:50,699
within either a partition or within the window.

1091
00:49:50,699 --> 00:49:54,339
So in this case here, now I can order the students by

1092
00:49:55,579 --> 00:49:57,539
by the roll table based on the course ID.

1093
00:49:59,059 --> 00:50:00,379
So I have a more complicated example here.

1094
00:50:00,379 --> 00:50:02,500
So we're going to find the student with the second highest

1095
00:50:02,500 --> 00:50:05,539
grade for each course.

1096
00:50:05,539 --> 00:50:07,939
So for this one here, we're going to have a nested query,

1097
00:50:07,939 --> 00:50:09,459
which we'll discuss in a second.

1098
00:50:09,459 --> 00:50:13,379
But basically I have a select statement that has a from clause

1099
00:50:13,380 --> 00:50:16,140
and the side that from clause I have another query.

1100
00:50:16,140 --> 00:50:20,500
And inside this inner query, I can reference,

1101
00:50:21,780 --> 00:50:24,500
actually this here, I'm doing a look up on the roll table

1102
00:50:24,500 --> 00:50:26,460
and then the outer query can just do filtering

1103
00:50:26,460 --> 00:50:29,260
based on the output of this nested query.

1104
00:50:29,260 --> 00:50:32,059
Gonna cover nested queries in a second.

1105
00:50:32,059 --> 00:50:32,860
So the first thing we're going to do is

1106
00:50:32,860 --> 00:50:37,380
group the tuples by the course ID and then sort them

1107
00:50:37,380 --> 00:50:40,059
by the grade and then we'll get the rank would be,

1108
00:50:40,059 --> 00:50:43,900
what is their position in the sort of list of grades?

1109
00:50:45,219 --> 00:50:47,259
And then in my where clause here, I can reference now

1110
00:50:47,259 --> 00:50:52,259
the window function calculation for column.

1111
00:50:55,500 --> 00:50:57,179
Any questions about this?

1112
00:50:57,179 --> 00:50:58,019
Yes.

1113
00:50:58,019 --> 00:51:01,500
Can you do this to a group by and also,

1114
00:51:01,500 --> 00:51:06,179
basically can you make up with a function to do the group by?

1115
00:51:06,179 --> 00:51:08,900
So actually, can I make a window function using group eyes?

1116
00:51:08,900 --> 00:51:13,900
Like you do by the, let's try it, so just say.

1117
00:51:17,460 --> 00:51:18,300
All right, so.

1118
00:51:26,099 --> 00:51:29,180
All right, so we'll do this in Postgres.

1119
00:51:31,139 --> 00:51:34,380
Right, so again, select star from the roll table

1120
00:51:34,380 --> 00:51:36,900
and then we'll get the row number of,

1121
00:51:37,500 --> 00:51:39,579
where each student appears, right?

1122
00:51:41,700 --> 00:51:45,139
And then the second, the second example was,

1123
00:51:45,139 --> 00:51:48,019
we got a course ID, student ID, and then the row number

1124
00:51:48,019 --> 00:51:50,539
but then partition it by the course ID.

1125
00:51:50,539 --> 00:51:53,220
So then we're just gonna order them and the output

1126
00:51:53,220 --> 00:51:55,740
by the course ID, right?

1127
00:51:55,740 --> 00:51:59,300
So in this case here, we see that we have for each course,

1128
00:51:59,300 --> 00:52:02,139
1545, 721, and 826, right?

1129
00:52:02,139 --> 00:52:03,820
Here's the students that are rolling them,

1130
00:52:03,820 --> 00:52:06,460
and then this is their position within each group.

1131
00:52:07,900 --> 00:52:10,340
And then my last example was like this,

1132
00:52:10,340 --> 00:52:13,340
and this is where you were asking whether you can do a group by.

1133
00:52:15,099 --> 00:52:17,780
We're now here again, so I can get the first,

1134
00:52:17,780 --> 00:52:21,579
the inner query is gonna give me the rank position

1135
00:52:21,579 --> 00:52:24,059
of every record, the rank is just where you are

1136
00:52:24,059 --> 00:52:25,300
in the sorting output.

1137
00:52:26,380 --> 00:52:29,380
Let me remove the part here first.

1138
00:52:31,139 --> 00:52:34,539
Right, so here's the output of the inner query,

1139
00:52:34,539 --> 00:52:36,059
of the select rank.

1140
00:52:36,059 --> 00:52:40,099
So for every course, I'm gonna get the grades

1141
00:52:40,099 --> 00:52:42,259
and then order them by the grades.

1142
00:52:42,259 --> 00:52:44,659
And then the rank is just where their position is

1143
00:52:44,659 --> 00:52:48,860
in the, within the sort of the grades.

1144
00:52:48,860 --> 00:52:51,059
And the rank can have repeat, so if I say,

1145
00:52:51,059 --> 00:52:52,699
I'm sort of another record here,

1146
00:52:52,699 --> 00:52:57,699
so I insert them to enrolled, values,

1147
00:52:57,699 --> 00:53:01,259
when you have student ID, let's do,

1148
00:53:03,539 --> 00:53:04,619
have two pop take.

1149
00:53:07,059 --> 00:53:11,059
The values, of course, ID would be 15, 7, 21,

1150
00:53:12,259 --> 00:53:17,259
and let's say he got a, it's given me, he's dead.

1151
00:53:23,739 --> 00:53:26,739
That's order by rank thing.

1152
00:53:27,739 --> 00:53:31,739
Well, that screws up the partition, let me give it that,

1153
00:53:37,739 --> 00:53:38,739
sorry.

1154
00:53:39,739 --> 00:53:43,739
Right, so here what we're doing is,

1155
00:53:43,739 --> 00:53:46,939
everything goes, of course, again, we're getting the grade

1156
00:53:46,939 --> 00:53:48,859
and then with the sort in the rank.

1157
00:53:48,859 --> 00:53:51,579
And so we inserted this record here, two pop,

1158
00:53:51,579 --> 00:53:54,139
we gave an A, but there was also another student

1159
00:53:54,139 --> 00:53:55,739
who got an A in the same class,

1160
00:53:55,739 --> 00:53:58,579
and therefore they both have the same rank position of one.

1161
00:53:58,579 --> 00:54:00,899
And then for the student that got the C,

1162
00:54:00,899 --> 00:54:02,500
their rank position is three.

1163
00:54:02,500 --> 00:54:05,139
So rank you can have duplicates, row numbers will not.

1164
00:54:07,419 --> 00:54:09,299
So yeah, so you're proposing to do what,

1165
00:54:09,299 --> 00:54:10,259
much of random group,

1166
00:54:10,259 --> 00:54:12,819
group by the, where?

1167
00:54:12,819 --> 00:54:17,819
Like, sorry, in the interquery or what, sorry.

1168
00:54:18,619 --> 00:54:19,619
Do you have a,

1169
00:54:19,619 --> 00:54:24,619
is it possible to recreate this thing very easily by?

1170
00:54:24,619 --> 00:54:26,059
The question is, is it possible to recreate the same query

1171
00:54:26,059 --> 00:54:27,059
using group by?

1172
00:54:29,380 --> 00:54:32,460
You wouldn't, you wouldn't be able to get the rank, right?

1173
00:54:32,460 --> 00:54:33,659
Because you wouldn't be able to get,

1174
00:54:33,659 --> 00:54:34,900
what is my sort of position?

1175
00:54:34,900 --> 00:54:39,900
There isn't a concept of that in, in, in, in SQL, right?

1176
00:54:42,299 --> 00:54:45,259
So row, row number is interesting because it is,

1177
00:54:47,139 --> 00:54:48,460
let's do that row number.

1178
00:54:55,460 --> 00:54:59,299
Right, make the point, switch to row number, row number.

1179
00:55:01,139 --> 00:55:03,139
So row number is interesting because,

1180
00:55:03,139 --> 00:55:06,299
I'm, it's calling it rank, but trust me, it's row number.

1181
00:55:06,299 --> 00:55:09,059
It's cause, again, it's bag algebra.

1182
00:55:09,059 --> 00:55:11,420
There is no sort order in, in these relations.

1183
00:55:11,420 --> 00:55:12,739
That's sort of weird concept,

1184
00:55:12,739 --> 00:55:14,339
we think about programming, like what do you mean,

1185
00:55:14,339 --> 00:55:15,779
there's, there's not an ordering.

1186
00:55:15,779 --> 00:55:17,859
Like, we're used to programming in like, on X86,

1187
00:55:17,859 --> 00:55:19,659
where there's a, you know, the ordering,

1188
00:55:19,659 --> 00:55:21,219
how memory operations occur.

1189
00:55:21,219 --> 00:55:22,420
Right, there isn't any of that here,

1190
00:55:22,420 --> 00:55:23,819
everything can be unordered.

1191
00:55:23,860 --> 00:55:26,580
So, in, without a window function,

1192
00:55:26,580 --> 00:55:29,420
you can't get a row number because there's no way to say,

1193
00:55:29,420 --> 00:55:31,539
where do I exist in this position,

1194
00:55:31,539 --> 00:55:33,180
you know, in my position on my output.

1195
00:55:35,300 --> 00:55:37,580
Oracle does have row number, they hide it from you,

1196
00:55:37,580 --> 00:55:40,500
you can get it, but like, it's, it's, that's just an

1197
00:55:40,500 --> 00:55:41,340
Oracle thing.

1198
00:55:42,860 --> 00:55:45,220
So, so the window function is allow you to,

1199
00:55:45,220 --> 00:55:47,100
in addition to doing the averages and all the other

1200
00:55:47,100 --> 00:55:51,140
aggregates, allows you to, to get the order of things

1201
00:55:51,140 --> 00:55:53,380
in a way that you would not be able to get otherwise.

1202
00:55:54,820 --> 00:55:55,820
Okay.

1203
00:55:56,820 --> 00:55:57,820
Okay.

1204
00:56:03,300 --> 00:56:04,900
All right, so I should have showed nested queries before,

1205
00:56:04,900 --> 00:56:06,860
but this is going through in more detail.

1206
00:56:06,860 --> 00:56:08,980
So a nested query, nested queries are really powerful

1207
00:56:08,980 --> 00:56:11,220
concept, sometimes called subqueries,

1208
00:56:11,220 --> 00:56:14,420
where it allows you to have a query inside of a query,

1209
00:56:14,420 --> 00:56:15,740
inside of, like, inside of a query.

1210
00:56:15,740 --> 00:56:17,500
Like, you have multiple queries inside of sort of

1211
00:56:17,500 --> 00:56:19,220
overarching calling queries.

1212
00:56:19,220 --> 00:56:20,780
And you would need this because you want to be able to

1213
00:56:20,780 --> 00:56:23,180
express certain computations,

1214
00:56:23,179 --> 00:56:26,339
without these nested queries, without taking the data out,

1215
00:56:26,339 --> 00:56:28,539
doing some computation, and then putting it back in the

1216
00:56:28,539 --> 00:56:29,539
database system.

1217
00:56:29,539 --> 00:56:32,539
So it allows us to put these things together to, to create

1218
00:56:32,539 --> 00:56:36,619
more complex logic than we would not be able to otherwise do.

1219
00:56:36,619 --> 00:56:40,179
And these inner queries can appear almost anywhere inside of

1220
00:56:40,179 --> 00:56:42,179
a, a select state, but are actually really animals,

1221
00:56:42,179 --> 00:56:43,179
any query.

1222
00:56:43,179 --> 00:56:44,779
Like, you have in the select output, the from clause,

1223
00:56:44,779 --> 00:56:47,179
the where clause, you can put in an update queries and delete

1224
00:56:47,179 --> 00:56:48,179
queries, right?

1225
00:56:49,179 --> 00:56:52,179
And they can now reference other tables within your own query,

1226
00:56:53,179 --> 00:56:55,179
like, it's a very powerful construct.

1227
00:56:55,179 --> 00:56:57,179
So the basic idea is something like this.

1228
00:56:57,179 --> 00:57:00,179
So here, we're doing select it from the name table,

1229
00:57:00,179 --> 00:57:04,179
and then I want to get the name of a student that is

1230
00:57:04,179 --> 00:57:06,179
at least enrolled in one course.

1231
00:57:06,179 --> 00:57:09,179
So you can think of this out, this selects the top part,

1232
00:57:09,179 --> 00:57:12,179
that's called the outer query, and then this inner part here,

1233
00:57:12,179 --> 00:57:14,179
we would call this inner query.

1234
00:57:14,179 --> 00:57:16,179
So nested queries are, they're

1235
00:57:16,179 --> 00:57:19,179
terribly difficult for database systems to optimize.

1236
00:57:19,179 --> 00:57:20,179
Right?

1237
00:57:21,179 --> 00:57:23,179
Because you think about the stupidest way to execute this query

1238
00:57:23,179 --> 00:57:26,179
would be for every single tuple in my student table,

1239
00:57:26,179 --> 00:57:28,179
rerun this thing.

1240
00:57:28,179 --> 00:57:29,179
Right?

1241
00:57:29,179 --> 00:57:32,179
Get the list of all the student IDs, then compute the int.

1242
00:57:32,179 --> 00:57:35,179
The way to really execute this, this is just a join for

1243
00:57:35,179 --> 00:57:37,179
this one example here.

1244
00:57:37,179 --> 00:57:38,179
Right?

1245
00:57:38,179 --> 00:57:41,179
This one's easy to do because, you know, you're looking for this,

1246
00:57:41,179 --> 00:57:44,179
this thing to match something here, so you can do,

1247
00:57:44,179 --> 00:57:46,179
like, convert that to a quality predicate.

1248
00:57:46,179 --> 00:57:49,179
Things get more complicated when there's non-trivial relations

1249
00:57:49,179 --> 00:57:51,179
between the inner query and the outer query.

1250
00:57:51,179 --> 00:57:54,179
We won't, we'll come into that later in the semester,

1251
00:57:54,179 --> 00:57:57,179
but this is something, this is something, again,

1252
00:57:57,179 --> 00:57:59,179
this is the hardest, the one of the hardest part of database

1253
00:57:59,179 --> 00:58:00,179
systems.

1254
00:58:00,179 --> 00:58:03,179
And the only system that does nested queries correctly

1255
00:58:03,179 --> 00:58:06,179
is the system called Umbra, which is a,

1256
00:58:06,179 --> 00:58:09,179
is an academic system out of Germany.

1257
00:58:09,179 --> 00:58:13,179
DuckDB does it correctly now for two reasons.

1258
00:58:13,179 --> 00:58:16,179
One, because they copied what Umbra did,

1259
00:58:16,179 --> 00:58:18,179
it's in papers, it's not like they stole the ideas.

1260
00:58:18,179 --> 00:58:21,179
And then we also sent them patches last semester at a 721.

1261
00:58:21,179 --> 00:58:24,179
So we fixed it for them, they can do some of these nested queries

1262
00:58:24,179 --> 00:58:27,179
correctly, with lateral joins.

1263
00:58:27,179 --> 00:58:29,179
So, duckDB is probably the best implementation of this.

1264
00:58:29,179 --> 00:58:32,179
A lot of times, there's a bunch of heuristics, hacks.

1265
00:58:32,179 --> 00:58:34,179
Again, we'll cover this later.

1266
00:58:34,179 --> 00:58:36,179
My SQL is always the worst.

1267
00:58:36,179 --> 00:58:38,179
It's gotten much better though.

1268
00:58:38,179 --> 00:58:40,179
Right, so the, so here's a query like this.

1269
00:58:40,179 --> 00:58:43,179
So we want to get the name of the students wrote in 1544-45.

1270
00:58:43,179 --> 00:58:46,179
So we have the outer query that we say, you know,

1271
00:58:46,179 --> 00:58:48,179
we want to get the name from the student table.

1272
00:58:48,179 --> 00:58:50,179
And then we want to have this wear clause,

1273
00:58:50,179 --> 00:58:53,179
we want to specify the logic that will get us the student ID,

1274
00:58:53,179 --> 00:58:55,179
the set of people that are taking 445.

1275
00:58:55,179 --> 00:58:58,179
So this is a way to sort of think about how you want to actually

1276
00:58:58,179 --> 00:59:00,179
construct this, start with the outer query,

1277
00:59:00,179 --> 00:59:03,179
or what the overarching computation of the output you want to be,

1278
00:59:03,179 --> 00:59:06,179
and then you figure out what the inner part needs to be separately.

1279
00:59:06,179 --> 00:59:09,179
So in this case here, we can convert this English part here

1280
00:59:09,179 --> 00:59:11,179
into a nested query like this.

1281
00:59:11,179 --> 00:59:13,179
But now we need to be able to reference it,

1282
00:59:13,179 --> 00:59:17,179
or do the check that we want in the wear clause of the outer query,

1283
00:59:17,179 --> 00:59:21,179
and we'd use that in clause that we had before.

1284
00:59:21,179 --> 00:59:25,179
And so in this case here, now we see that the student ID

1285
00:59:25,179 --> 00:59:28,179
in the wear clause here in the outer query,

1286
00:59:28,179 --> 00:59:31,179
that's referencing the student ID from the outer query.

1287
00:59:31,179 --> 00:59:33,179
But the second student ID in the inner query,

1288
00:59:33,179 --> 00:59:36,179
that's referencing the student ID in the enrolled table.

1289
00:59:36,179 --> 00:59:39,179
So the parser in the database system

1290
00:59:39,179 --> 00:59:41,179
is smart enough to recognize the context

1291
00:59:41,179 --> 00:59:46,179
of where a column is being referenced to know which table you're looking at.

1292
00:59:46,179 --> 00:59:50,179
In the cases where it doesn't know that it's two things have the same name,

1293
00:59:50,179 --> 00:59:54,179
it'll throw an error and make you qualify the table name

1294
00:59:54,179 --> 00:59:58,179
of where a column is coming from.

1295
00:59:58,179 --> 01:00:01,179
So there's a bunch of ways you can interact with nested queries

1296
01:00:01,179 --> 01:00:03,179
to do inside wear clauses.

1297
01:00:03,179 --> 01:00:06,179
So you can have things like an all command or all operator

1298
01:00:06,179 --> 01:00:10,179
that every row in the nested query has to satisfy some conical strain

1299
01:00:10,179 --> 01:00:14,179
or some sometimes called sum, as the alias,

1300
01:00:14,179 --> 01:00:19,179
SOME, where you can say at least one row must match my sub query.

1301
01:00:19,179 --> 01:00:24,179
The in clause that I showed before is the same thing as equals any.

1302
01:00:24,179 --> 01:00:27,179
And then exist, this means that I want to find something where I know

1303
01:00:27,179 --> 01:00:31,179
there's at least one match, sorry, there's just one row being returned,

1304
01:00:31,179 --> 01:00:35,179
but I don't actually care what's in it.

1305
01:00:35,179 --> 01:00:38,179
So I can rewrite the example I have before, instead of using in,

1306
01:00:38,179 --> 01:00:42,179
I can use equals any and it's considered equivalent.

1307
01:00:42,179 --> 01:00:46,179
And so we can show real quickly how Postgres picks different plans for this

1308
01:00:46,179 --> 01:00:50,179
and you see how it's actually being executed.

1309
01:00:57,179 --> 01:00:59,179
Right, so here's that query.

1310
01:00:59,179 --> 01:01:02,179
We have RISD and 2Pock taking the class.

1311
01:01:02,179 --> 01:01:05,179
So in SQL, you can put this explain keyword in front of it,

1312
01:01:06,179 --> 01:01:10,179
and have any query, and what that's going to do if the system supports it,

1313
01:01:10,179 --> 01:01:14,179
it'll come back with the query plan and tell you what operations

1314
01:01:14,179 --> 01:01:18,179
would execute if it actually tried to execute this thing.

1315
01:01:18,179 --> 01:01:23,179
Right, so when we run that, we get something like this that's going to tell us,

1316
01:01:23,179 --> 01:01:25,179
basically, think of this as a tree structure.

1317
01:01:25,179 --> 01:01:28,179
So these are the leaf nodes and then it builds up this is the final output.

1318
01:01:28,179 --> 01:01:32,179
So this is telling us that Postgres wants to do a sequential scan on the roll table

1319
01:01:32,179 --> 01:01:35,179
and then it's going to hash it because it's doing a hash drawing up there

1320
01:01:35,179 --> 01:01:37,179
which we'll cover on a hash drawing later on.

1321
01:01:37,179 --> 01:01:40,179
And then it does a sequential scan on the student table,

1322
01:01:40,179 --> 01:01:46,179
and then now it does my matching with the student ID with this enroll student ID.

1323
01:01:46,179 --> 01:01:51,179
So Postgres was smart enough to convert this nested query into a join,

1324
01:01:51,179 --> 01:01:56,179
which is always going to be the fastest way to execute something when you have these kind of references.

1325
01:01:56,179 --> 01:01:59,179
We can try the same thing in my SQL.

1326
01:02:02,179 --> 01:02:08,179
But they're explained output is terrible.

1327
01:02:08,179 --> 01:02:12,179
There's a way to get, I forget the syntax,

1328
01:02:12,179 --> 01:02:15,179
you got to put like an extender to something like that.

1329
01:02:15,179 --> 01:02:17,179
I forget how to do it in my SQL.

1330
01:02:17,179 --> 01:02:20,179
There's a way to get something a little bit better.

1331
01:02:20,179 --> 01:02:23,179
In SQL Lite, I don't think you can do this.

1332
01:02:23,179 --> 01:02:26,179
Oh, you can do this.

1333
01:02:26,179 --> 01:02:32,179
What's that?

1334
01:02:32,179 --> 01:02:34,179
What's that?

1335
01:02:34,179 --> 01:02:38,179
Oh, f***, is this?

1336
01:02:38,179 --> 01:02:43,179
All right, SQL Lite.

1337
01:02:43,179 --> 01:02:48,179
So they don't like the select statement.

1338
01:02:48,179 --> 01:02:50,179
They're surprising, right?

1339
01:02:50,179 --> 01:02:52,179
Why doesn't that work?

1340
01:02:52,179 --> 01:02:54,179
See if DuckDB does it.

1341
01:02:54,179 --> 01:03:04,179
DuckDB has very pretty, they give you nice little trees.

1342
01:03:04,179 --> 01:03:07,179
You guys are easily amused.

1343
01:03:07,179 --> 01:03:12,179
This impresses you with unicode output for explain.

1344
01:03:12,179 --> 01:03:17,179
But yeah, it shows you what the physical plan is.

1345
01:03:17,179 --> 01:03:22,179
And then we can try an Oracle.

1346
01:03:22,179 --> 01:03:28,179
Has it right output?

1347
01:03:28,179 --> 01:03:31,179
Well, we need another time.

1348
01:03:31,179 --> 01:03:34,179
Getting the plan out of Oracle and SQL Server is a huge pain.

1349
01:03:34,179 --> 01:03:38,179
But I'm just surprised that SQL Lite doesn't support this.

1350
01:03:38,179 --> 01:03:44,179
Select.

1351
01:03:44,179 --> 01:03:48,179
I'm not going to debug this live.

1352
01:03:48,179 --> 01:03:51,179
Yeah, I don't know why it doesn't like that.

1353
01:03:51,179 --> 01:03:55,179
Let's try it in.

1354
01:03:55,179 --> 01:03:56,179
Ah, there we go.

1355
01:03:56,179 --> 01:03:58,179
It didn't like egos and it looked in.

1356
01:03:58,179 --> 01:04:05,179
All right, so in SQL Lite, if I run explain,

1357
01:04:05,179 --> 01:04:09,179
I get this.

1358
01:04:09,179 --> 01:04:12,179
So the way SQL Lite does, which is,

1359
01:04:12,179 --> 01:04:17,179
the genius is that the way it actually took your query plan

1360
01:04:17,179 --> 01:04:23,179
into its own DSL, opcodes, and it has its own VM that runs the opcodes.

1361
01:04:23,179 --> 01:04:25,179
Think of like the JVM.

1362
01:04:25,179 --> 01:04:27,179
You take Java code, convert it into Java bytecode,

1363
01:04:27,179 --> 01:04:29,179
and then the JVM executes it or interprets it.

1364
01:04:29,179 --> 01:04:32,179
That's what SQL Lite does.

1365
01:04:32,179 --> 01:04:36,179
We'll discuss query compilation in the semester.

1366
01:04:36,179 --> 01:04:41,179
So you got to put explain plan.

1367
01:04:41,179 --> 01:04:45,179
There's some syntax to get the real plan.

1368
01:04:45,179 --> 01:04:48,179
Trust me, it's there.

1369
01:04:48,179 --> 01:04:51,179
All right, so.

1370
01:04:51,179 --> 01:04:54,179
So yeah, so they all do something slightly different.

1371
01:04:54,179 --> 01:04:56,179
And then if the system is smart,

1372
01:04:56,179 --> 01:04:59,179
it can try to convert it into a join.

1373
01:04:59,179 --> 01:05:05,179
All right, so skip this and say good time because we've got to get through.

1374
01:05:05,179 --> 01:05:09,179
We're going to get through lateral joins and.

1375
01:05:09,179 --> 01:05:10,179
And CTEs.

1376
01:05:10,179 --> 01:05:14,179
All right, so lateral joins are a newer concept,

1377
01:05:14,179 --> 01:05:15,179
but.

1378
01:05:15,179 --> 01:05:19,179
And not all systems are going to support it, but the basic idea is that.

1379
01:05:19,179 --> 01:05:22,179
It's going to allow you to have a.

1380
01:05:22,179 --> 01:05:31,179
A nested query reference data in a, in another query that is adjacent to it.

1381
01:05:31,179 --> 01:05:37,179
So normally in you have two nested queries, one nested query can't reference what's inside the other nested query.

1382
01:05:37,179 --> 01:05:39,179
Because it doesn't know about what's inside of it.

1383
01:05:39,179 --> 01:05:42,179
But with a lateral join allows you to do this.

1384
01:05:42,179 --> 01:05:47,179
You can almost think of like it's like a four loop, where one table for every single.

1385
01:05:47,179 --> 01:05:48,179
Every single.

1386
01:05:48,179 --> 01:05:52,179
Every single two in the out and out of four loop, you can do some,

1387
01:05:52,179 --> 01:05:55,179
you can run some query, do some competition here.

1388
01:05:55,179 --> 01:06:00,179
So in this simple example here, I have two, I have two nested queries.

1389
01:06:00,179 --> 01:06:02,179
I've a select one as, as X.

1390
01:06:02,179 --> 01:06:05,179
So this is turning back a single two has one column with a value one.

1391
01:06:05,179 --> 01:06:10,179
And then my lateral join here can now reference the,

1392
01:06:10,179 --> 01:06:14,179
the output of this first query here, and does do plus one on it.

1393
01:06:14,179 --> 01:06:17,179
Right? So I get, I get, I get one and two that way.

1394
01:06:17,179 --> 01:06:20,179
Right? Without lateral, you can't do this.

1395
01:06:20,179 --> 01:06:22,179
Right? Because these would be treated as,

1396
01:06:22,179 --> 01:06:28,179
completely two separate queries, which we can do this in post-gressant and see real quickly.

1397
01:06:28,179 --> 01:06:31,179
Right?

1398
01:06:31,179 --> 01:06:38,179
So select star from an inner query select one as.

1399
01:06:38,179 --> 01:06:41,179
Sorry.

1400
01:06:41,179 --> 01:06:43,179
Yep, yep, yep.

1401
01:06:43,179 --> 01:06:45,179
As X.

1402
01:06:45,179 --> 01:06:48,179
That's T1.

1403
01:06:48,179 --> 01:06:52,179
Right? So I can get back a single two, both it has, has one in it, right?

1404
01:06:52,179 --> 01:06:56,179
But if I try to put a nest, another nested query next to it, select,

1405
01:06:56,179 --> 01:07:00,179
say two, has Y,

1406
01:07:00,179 --> 01:07:03,179
as T2.

1407
01:07:03,179 --> 01:07:07,179
Right? I'm getting the Cartesian product up, but I can't reference inside of this thing.

1408
01:07:07,179 --> 01:07:11,179
I can't go T1.X plus one.

1409
01:07:11,179 --> 01:07:13,179
Right?

1410
01:07:13,179 --> 01:07:17,179
Because it doesn't know about T1, because those two, those queries are running separately.

1411
01:07:17,179 --> 01:07:22,179
If I add the lateral keyword,

1412
01:07:22,179 --> 01:07:27,179
now my, my second nested query can, can, can reference with whatever's in the first one.

1413
01:07:27,179 --> 01:07:31,179
Right? And you can chain these things together,

1414
01:07:31,179 --> 01:07:34,179
at many times as you want.

1415
01:07:34,179 --> 01:07:37,179
So quickly, see what the query plan for this one would be.

1416
01:07:37,179 --> 01:07:40,179
The theory should convert this to a join.

1417
01:07:40,179 --> 01:07:43,179
Wow.

1418
01:07:43,179 --> 01:07:45,179
All right.

1419
01:07:45,179 --> 01:07:47,179
That, you had a shortcut, but you can order that.

1420
01:07:47,179 --> 01:07:48,179
Okay.

1421
01:07:48,179 --> 01:07:50,179
Because the, basically says, I, I know what the answer is.

1422
01:07:50,179 --> 01:07:52,179
I don't want to run anything and just spit out the answer.

1423
01:07:52,179 --> 01:07:53,179
That's what it did.

1424
01:07:53,179 --> 01:07:54,179
Like select one plus one.

1425
01:07:54,179 --> 01:07:57,179
It knows what, knows how to compute that without running a query.

1426
01:07:57,179 --> 01:07:59,179
It's quite, let's look at a more complicated example.

1427
01:07:59,179 --> 01:08:02,179
So say I want to calculate the number of students that enrolled in each course.

1428
01:08:02,179 --> 01:08:08,179
And then I also want to get all the, the average GPA of all the students in that course.

1429
01:08:08,179 --> 01:08:11,179
And so you, yes, you can write this without using a lateral join.

1430
01:08:11,179 --> 01:08:13,179
That's what I'm going to show you how to do this with a lateral join.

1431
01:08:13,179 --> 01:08:17,180
So there's two of them, two nested queries, where we had a select statement on the,

1432
01:08:17,180 --> 01:08:18,180
out, out part.

1433
01:08:18,180 --> 01:08:21,180
And then for every single two pull that's in the course table,

1434
01:08:21,180 --> 01:08:23,180
I want to then compute the number of enrolled students.

1435
01:08:23,180 --> 01:08:26,180
And then again, for every single student in the course table,

1436
01:08:26,180 --> 01:08:30,180
I want to compute the, the average GPA of all the enrolled students.

1437
01:08:30,180 --> 01:08:31,180
Right?

1438
01:08:31,180 --> 01:08:32,180
So we can write it as this.

1439
01:08:32,180 --> 01:08:36,180
We have two, and two nested queries that are, that are, with the lateral keyword.

1440
01:08:36,180 --> 01:08:41,180
Where they get the first one here, I compute the, the, the, the count.

1441
01:08:41,180 --> 01:08:45,180
Again, inside of it, I'm able to reference what's in the, the outer query here,

1442
01:08:45,180 --> 01:08:46,180
the, the, the, the, json query.

1443
01:08:46,180 --> 01:08:48,180
And then for this one down here, same thing.

1444
01:08:48,180 --> 01:08:50,180
I can have this one reference there.

1445
01:08:50,180 --> 01:08:53,180
Now, I'm not showing this example here, because they can try.

1446
01:08:53,180 --> 01:08:57,180
But like, in the second lateral query, I can also reference what was in the first one.

1447
01:08:57,180 --> 01:09:00,180
These things get changed, get, change together.

1448
01:09:00,180 --> 01:09:03,180
And again, this is a different concept when you think of SQL, because SQL is the unordered.

1449
01:09:03,180 --> 01:09:07,180
We're not specifying the, we don't want to specify the order in which the database system should,

1450
01:09:07,180 --> 01:09:08,180
should execute anything.

1451
01:09:08,180 --> 01:09:10,180
We're not really doing that.

1452
01:09:10,180 --> 01:09:14,180
We're just telling you that the order we, we want the computation to, to be performed,

1453
01:09:14,180 --> 01:09:16,180
to compute the answer that we want.

1454
01:09:16,180 --> 01:09:20,180
So the database system can decide, do I want to rewrite this as a bunch of joins

1455
01:09:20,180 --> 01:09:22,180
and just execute them all concurrently?

1456
01:09:22,180 --> 01:09:27,180
Or we're going to decide to do it one after another, which we can then test,

1457
01:09:27,180 --> 01:09:29,180
post-gust, or quickly, and see what it does.

1458
01:09:29,180 --> 01:09:30,180
I don't think I have copied here.

1459
01:09:30,180 --> 01:09:36,180
Yeah, I'm sorry.

1460
01:09:36,180 --> 01:09:38,180
I don't have copy-pasted, but quickly.

1461
01:09:38,180 --> 01:09:40,180
So, you can try it online later.

1462
01:09:40,180 --> 01:09:42,180
All right.

1463
01:09:42,180 --> 01:09:45,180
All right. The last thing I want to show you is commentable expressions.

1464
01:09:45,180 --> 01:09:50,180
And so, CTEs were added 10-ish, 20-ish years ago.

1465
01:09:50,180 --> 01:09:55,180
And this is a sort of similar to nested queries or similar to,

1466
01:09:56,180 --> 01:09:59,180
if you're writing data to a 10 table or something like that.

1467
01:09:59,180 --> 01:10:04,180
So, way for us to take, specify a query that we want to get materialized,

1468
01:10:04,180 --> 01:10:06,180
maybe I won't use that word.

1469
01:10:06,180 --> 01:10:12,180
We want to specify a query that could be stored in quotation marks at some virtual table.

1470
01:10:12,180 --> 01:10:16,180
And then we can have another query reference, whatever's inside of it.

1471
01:10:16,180 --> 01:10:18,180
Right?

1472
01:10:18,180 --> 01:10:22,180
So, in my really simple example here, I have a, this width clause.

1473
01:10:23,180 --> 01:10:27,180
I give my CTE a name, then I have my as statement.

1474
01:10:27,180 --> 01:10:30,180
And then, whatever's inside this parentheses, whatever select query here,

1475
01:10:30,180 --> 01:10:35,180
is going to get bound to this, this, this, this name here.

1476
01:10:35,180 --> 01:10:40,180
And then, editing that comes below after the width statement can then reference it

1477
01:10:40,180 --> 01:10:43,180
as if it was a table.

1478
01:10:45,180 --> 01:10:46,180
Right?

1479
01:10:46,180 --> 01:10:49,180
So, again, sort of, sort of, similar to something like this.

1480
01:10:50,180 --> 01:10:55,180
So, essentially, the as clause is binding things to names to whatever,

1481
01:10:55,180 --> 01:10:57,180
whatever's inside my, my with statement here.

1482
01:10:57,180 --> 01:11:01,180
So, I have again, a no table query selected one and two that's going to produce one two,

1483
01:11:01,180 --> 01:11:04,180
but it has a value of one column with one, one column with two.

1484
01:11:04,180 --> 01:11:08,180
But then, within my, with my with statement appear,

1485
01:11:08,180 --> 01:11:13,180
I can give now names to the columns, which then can be referenced down below in, in the query.

1486
01:11:14,180 --> 01:11:18,180
You can do weird things too, like you can actually, in Postgres,

1487
01:11:18,180 --> 01:11:21,180
we'll let you actually name the columns the same thing.

1488
01:11:21,180 --> 01:11:25,180
But then, when you actually try to reference it below, it'll throw an error.

1489
01:11:25,180 --> 01:11:30,180
So, again, this is, example, like the syntax is, is roughly the same,

1490
01:11:30,180 --> 01:11:34,180
but the semantics can be different across, across different systems.

1491
01:11:34,180 --> 01:11:36,180
Let's see how, so let's see how we actually want to use it.

1492
01:11:36,180 --> 01:11:40,180
So, for this one, we went again, when to find the student record that has the highest ID,

1493
01:11:40,180 --> 01:11:42,180
that's enrolled in the one course.

1494
01:11:42,180 --> 01:11:45,180
Again, we've showed how, for example, how to do this with, with Nested queries,

1495
01:11:45,180 --> 01:11:47,180
and we do the joins.

1496
01:11:47,180 --> 01:11:50,180
But now, we can do this with the CTE, where inside the CTE,

1497
01:11:50,180 --> 01:11:55,180
first thing I'm going to do is compute the, the max student ID from, from the enroll table.

1498
01:11:55,180 --> 01:11:58,180
And then, now, in my select statement down below,

1499
01:11:58,180 --> 01:12:04,180
I can as a reference, my CTE, get that max ID, and then do my, my join on that.

1500
01:12:06,180 --> 01:12:09,180
Again, the data decision should be smart enough to realize that,

1501
01:12:09,180 --> 01:12:13,180
oh, I only have to run this, the CTE once, materialize it,

1502
01:12:13,180 --> 01:12:20,180
and then now, I can reference it as if it was a, like, a temp table in, in any query below that, that calls it.

1503
01:12:23,180 --> 01:12:25,180
Any question about CTEs?

1504
01:12:27,180 --> 01:12:29,180
Okay.

1505
01:12:29,180 --> 01:12:30,180
Just to finish up.

1506
01:12:30,180 --> 01:12:33,180
So, again, hopefully the main takeaway from all of this is that SQL is not dead language.

1507
01:12:33,180 --> 01:12:35,180
There's a lot of cool things you can do with it.

1508
01:12:36,180 --> 01:12:40,180
You want to try to do as much computations you can with the inner single statement.

1509
01:12:40,180 --> 01:12:44,180
Now, it can be nested queries, you can do much more weird stuff inside of it.

1510
01:12:44,180 --> 01:12:48,180
We want to avoid the round trips going back and forth between the client and the server.

1511
01:12:48,180 --> 01:12:55,180
Because, again, the database system should, in theory, be smart enough to know what's the best way to execute the query that you're giving to it.

1512
01:12:55,180 --> 01:12:59,180
As soon as you take stuff out of the database, do some Python code on it.

1513
01:12:59,180 --> 01:13:02,180
That's obviously outside the, the, the purview of the database system.

1514
01:13:02,180 --> 01:13:05,180
So, if you can't optimize, it can't optimize that Python code.

1515
01:13:05,180 --> 01:13:10,180
If you keep everything inside of the database system, it should be able to make a good effort to how to optimize it first.

1516
01:13:10,180 --> 01:13:14,180
And again, also, the main takeaway from all of this is that there is a SQL standard.

1517
01:13:14,180 --> 01:13:15,180
Nobody follows it exactly.

1518
01:13:15,180 --> 01:13:18,180
Every single database system is going to be slightly different.

1519
01:13:19,180 --> 01:13:23,180
People claim that, oh, it's great to be, if you support SQL, because then you can go and be portable.

1520
01:13:23,180 --> 01:13:28,180
Like, if I write my application on my SQL, I can very easily just port it to Postgres.

1521
01:13:28,180 --> 01:13:30,180
That is not the case, right?

1522
01:13:30,180 --> 01:13:35,180
Often times, whatever data system you pick at the beginning, that's what you're going to be stuck with for a long time.

1523
01:13:35,180 --> 01:13:39,180
It's, it's, it's, it's not, non-trivial to move over.

1524
01:13:39,180 --> 01:13:42,180
All right, so, last thing, homework one, it'll be out today.

1525
01:13:42,180 --> 01:13:45,180
It's going to be writing SQL queries to basic data analysis.

1526
01:13:45,180 --> 01:13:49,180
This year, we're going to acquire you to do it on SQLite and DuckDB.

1527
01:13:49,180 --> 01:13:50,180
All right?

1528
01:13:53,180 --> 01:13:55,180
Reason-wise, because you're right, you're right, the same query.

1529
01:13:55,180 --> 01:13:57,180
The same query, the next one will be slightly different.

1530
01:13:57,180 --> 01:13:58,180
It won't be too bad.

1531
01:13:58,180 --> 01:14:03,180
But you'll run the same query in SQLite, then you run on DuckDB, and you'll see which one's faster.

1532
01:14:03,180 --> 01:14:04,180
Okay?

1533
01:14:04,180 --> 01:14:06,180
And then you'll have a sapiphany.

1534
01:14:06,180 --> 01:14:09,180
Oh, one of them is much faster than the other one.

1535
01:14:09,180 --> 01:14:11,180
You ever take a guess which one's we faster?

1536
01:14:11,180 --> 01:14:12,180
Why?

1537
01:14:12,180 --> 01:14:15,180
What's that?

1538
01:14:15,180 --> 01:14:18,180
You say there's more efficient nest queries.

1539
01:14:18,180 --> 01:14:20,180
Part of reason, maybe.

1540
01:14:20,180 --> 01:14:22,180
It's not based on Postgres.

1541
01:14:22,180 --> 01:14:25,180
DuckDB is not in turn, and that's not the answer either.

1542
01:14:25,180 --> 01:14:26,180
Okay.

1543
01:14:26,180 --> 01:14:27,180
So, yes, in the back.

1544
01:14:27,180 --> 01:14:28,180
One last shot.

1545
01:14:28,180 --> 01:14:30,180
DuckDB is compiled and has a bunch of data sources.

1546
01:14:30,180 --> 01:14:32,180
So, the other one's not in the same way.

1547
01:14:32,180 --> 01:14:33,180
That's all the reason.

1548
01:14:33,180 --> 01:14:35,180
Okay, so, you're on these queries.

1549
01:14:35,180 --> 01:14:36,180
DuckDB should be faster.

1550
01:14:36,180 --> 01:14:38,180
You'll be like, okay, why?

1551
01:14:38,180 --> 01:14:39,180
That's the rest of the semester.

1552
01:14:39,180 --> 01:14:40,180
Okay?

1553
01:14:40,180 --> 01:14:44,180
All right, so next, this will be it for SQL, next class.

1554
01:14:44,180 --> 01:14:46,180
We're actually starting talking how do you build a system, okay?

1555
01:14:46,180 --> 01:14:47,180
Hit it.

1556
01:14:47,180 --> 01:14:48,180
Okay?

1557
01:14:48,180 --> 01:14:49,180
How do you build a system?

1558
01:14:49,180 --> 01:14:50,180
Okay?

1559
01:14:50,180 --> 01:14:51,180
Hit it.

1560
01:14:51,180 --> 01:14:55,180
I'm going to pop you with the motherfucking hook up.

1561
01:14:55,180 --> 01:14:58,180
28 a gram, depending on if it's the pop.

1562
01:14:58,180 --> 01:15:00,180
You ain't hit the mob yet.

1563
01:15:00,180 --> 01:15:02,180
Still got you shut up, I smack you with the bottom.

1564
01:15:02,180 --> 01:15:04,180
I'm going to slap you.

1565
01:15:04,180 --> 01:15:05,180
Don't you worry about me.

1566
01:15:05,180 --> 01:15:07,180
I'm not going to slap you.

1567
01:15:07,180 --> 01:15:08,180
Yeah, yeah.

1568
01:15:08,180 --> 01:15:09,180
Now listen.

1569
01:15:09,180 --> 01:15:11,180
I'm the poppy with the motherfucking hook up.

1570
01:15:11,180 --> 01:15:12,180
28 a gram.

1571
01:15:12,180 --> 01:15:13,180
The pen and all if it's the pop.

1572
01:15:13,180 --> 01:15:15,180
You ain't hit the mob yet.

1573
01:15:15,180 --> 01:15:16,180
Still got you shut up.

1574
01:15:16,180 --> 01:15:18,020
I smack you with the bottom of the cliff

1575
01:15:18,020 --> 01:15:20,260
And tell you, look up, show me what it's safe set

1576
01:15:20,260 --> 01:15:22,460
For I blow your face back, I got a block

1577
01:15:22,460 --> 01:15:24,380
On taps, the fets can't trace that

1578
01:15:24,380 --> 01:15:25,940
Style is like Tampa proof

1579
01:15:25,940 --> 01:15:27,980
You can't lace that at the Dominican

1580
01:15:27,980 --> 01:15:30,460
Oh you the Chome Dominican Black Skelly

1581
01:15:30,460 --> 01:15:32,340
Black, another Black Swade Timberlands

1582
01:15:32,340 --> 01:15:35,340
My poor black 38, send you to the perigate

1583
01:15:35,340 --> 01:15:36,740
You get the zombie trying to skate

1584
01:15:36,740 --> 01:15:38,100
And that's your first mistake

1585
01:15:38,100 --> 01:15:39,820
I ain't lying for that cake, you're famous

1586
01:15:39,820 --> 01:15:41,659
See you, wait, my grandson's happy wait

1587
01:15:41,659 --> 01:15:42,900
The Rand through every state

1588
01:15:42,899 --> 01:15:45,379
When he acting how I'm living, I tell him I'm living great

