---
title: CMU15445 P24F202323 DistributedDataWarehouseOLAPDatabases
---

1
00:00:00,000 --> 00:00:26,859
The

2
00:00:26,859 --> 00:00:28,699
Random applause for TTGPL.

3
00:00:30,899 --> 00:00:31,739
Back.

4
00:00:31,739 --> 00:00:32,420
You feel better?

5
00:00:32,420 --> 00:00:33,420
Yeah.

6
00:00:33,420 --> 00:00:36,060
And apparently your mom saw the video.

7
00:00:36,060 --> 00:00:37,820
It was concerned.

8
00:00:37,820 --> 00:00:39,299
I'm doing all the other.

9
00:00:39,299 --> 00:00:40,780
So your mom watches these videos?

10
00:00:40,780 --> 00:00:41,299
Yeah.

11
00:00:41,299 --> 00:00:41,780
Yeah.

12
00:00:41,780 --> 00:00:43,780
She just watches them to just make sure that my life is good.

13
00:00:43,780 --> 00:00:44,980
OK.

14
00:00:44,980 --> 00:00:47,700
But I mean, does she know everything is going on with you?

15
00:00:47,700 --> 00:00:50,980
I mean, I try to tell her the parts that she's

16
00:00:50,980 --> 00:00:52,859
I'm OK and she's OK with me, no?

17
00:00:52,859 --> 00:00:54,299
Does she know about the pregnancy scare?

18
00:00:54,299 --> 00:00:56,299
I'm 12.

19
00:00:56,299 --> 00:00:57,140
All right.

20
00:00:57,140 --> 00:00:57,979
All right.

21
00:00:57,979 --> 00:01:01,179
All right, guys.

22
00:01:01,179 --> 00:01:02,019
Let's get started.

23
00:01:02,019 --> 00:01:02,859
All right.

24
00:01:02,859 --> 00:01:04,739
Again, this is same as last time.

25
00:01:04,739 --> 00:01:06,939
And homework 5 is due on Sunday.

26
00:01:06,939 --> 00:01:07,859
homework project 4.

27
00:01:07,859 --> 00:01:09,299
We do the week following that.

28
00:01:09,299 --> 00:01:12,699
As a person piata on Monday's class will not be here.

29
00:01:12,699 --> 00:01:13,979
It'll be on Zoom.

30
00:01:13,979 --> 00:01:17,939
And that's the guest speaker from Singlestore.

31
00:01:17,939 --> 00:01:21,340
And then please go vote also to for the when

32
00:01:21,340 --> 00:01:24,060
we do the speed run on Wednesday next week.

33
00:01:24,060 --> 00:01:26,900
Some people are putting voting for Singlestore.

34
00:01:26,900 --> 00:01:28,340
We have a whole lecture on Singlestore.

35
00:01:28,340 --> 00:01:29,780
You don't need to vote for it again.

36
00:01:29,780 --> 00:01:30,980
We're not going to cover it.

37
00:01:30,980 --> 00:01:32,460
So put other systems.

38
00:01:32,460 --> 00:01:35,980
And then the final exam will be on the 12th.

39
00:01:35,980 --> 00:01:37,980
And then as always, we'll post on pets as well.

40
00:01:37,980 --> 00:01:40,460
We can sign up to be a TX.

41
00:01:40,460 --> 00:01:43,460
And then I'll also post for the faculty course evaluations.

42
00:01:43,460 --> 00:01:46,060
And I'll just say things to every year.

43
00:01:46,060 --> 00:01:47,540
Please be brutally honest.

44
00:01:47,540 --> 00:01:49,340
Tell us what sucks about the course, what you don't like,

45
00:01:49,340 --> 00:01:52,340
because we actually listen to it and incorporate your feedback

46
00:01:52,340 --> 00:01:54,420
and future versions of the course.

47
00:01:54,420 --> 00:01:57,140
So in previous semesters, Project 2 used to be like,

48
00:01:57,140 --> 00:01:58,820
hey, let's vote a concurrent B plus tree.

49
00:01:58,820 --> 00:02:00,740
And the students complained that that project was super hard

50
00:02:00,740 --> 00:02:02,820
in 3 and 4 for a competitive easier.

51
00:02:02,820 --> 00:02:05,100
So we sort of spread out the load throughout the entire semester.

52
00:02:05,100 --> 00:02:07,380
So that's a good example of something we listen to.

53
00:02:07,380 --> 00:02:09,099
One year, a student started to give me

54
00:02:09,099 --> 00:02:12,259
a psychological evaluation on myself.

55
00:02:12,259 --> 00:02:13,580
And that I did not listen to.

56
00:02:13,580 --> 00:02:18,180
But other things you don't like about me, please go for it.

57
00:02:18,180 --> 00:02:20,180
Any questions about what's remaining for you guys

58
00:02:20,180 --> 00:02:22,020
or expect for you guys for the rest of the semester?

59
00:02:24,980 --> 00:02:25,500
All right, awesome.

60
00:02:25,500 --> 00:02:27,180
Let's jump in this.

61
00:02:27,180 --> 00:02:28,340
All right, so today's class, we're

62
00:02:28,340 --> 00:02:30,819
going to talk about distributed database

63
00:02:30,819 --> 00:02:33,460
or distributed analytical database systems.

64
00:02:33,460 --> 00:02:34,819
So before we get into that, I want

65
00:02:34,819 --> 00:02:37,460
to talk a little bit about how these analytical databases

66
00:02:37,460 --> 00:02:41,659
are being used in modern application scenarios or setups.

67
00:02:41,659 --> 00:02:45,260
And then that'll then help motivate why we want to start using

68
00:02:45,260 --> 00:02:46,780
why we made the distributed database.

69
00:02:46,780 --> 00:02:47,300
Sorry, yes.

70
00:02:47,300 --> 00:02:47,819
Sorry.

71
00:02:48,099 --> 00:02:50,620
So finally, is that common sense of community?

72
00:02:50,620 --> 00:02:55,259
A question is, for the final exam, is a comprehensive no?

73
00:02:55,259 --> 00:02:57,419
But there's things you need to be obviously

74
00:02:57,419 --> 00:03:00,060
aware of in order to do is the questions.

75
00:03:00,060 --> 00:03:01,739
Like if you're brain dead and clearly forgot

76
00:03:01,739 --> 00:03:04,259
SQL, then you're in our problems, right?

77
00:03:04,259 --> 00:03:05,819
Or if you don't know what a buffer pool is used for,

78
00:03:05,819 --> 00:03:06,579
you're in our problems.

79
00:03:06,579 --> 00:03:10,180
But the core questions will be from the, whatever,

80
00:03:10,180 --> 00:03:12,900
the electrified midterm going forward.

81
00:03:12,900 --> 00:03:15,539
And we'll post a study guide app online.

82
00:03:17,900 --> 00:03:18,659
Yes.

83
00:03:18,659 --> 00:03:19,699
If there are any practices, it's there.

84
00:03:19,699 --> 00:03:21,060
There will be a practice of examples like the midterm.

85
00:03:21,060 --> 00:03:22,340
Yes.

86
00:03:22,340 --> 00:03:22,859
Yes.

87
00:03:22,859 --> 00:03:24,019
Is it full three hours?

88
00:03:24,019 --> 00:03:27,180
Question, is it a full three hours?

89
00:03:27,180 --> 00:03:29,180
What do you mean by that?

90
00:03:29,180 --> 00:03:31,539
It's supposed to be 8 or 11, so is it

91
00:03:31,539 --> 00:03:34,019
like a three hour exam or is it?

92
00:03:34,019 --> 00:03:34,659
Oh, it's a question.

93
00:03:34,659 --> 00:03:38,060
Is the, will it be twice as long as the midterm?

94
00:03:38,060 --> 00:03:38,819
No.

95
00:03:38,819 --> 00:03:41,659
Also, it's going to be an hour or a half.

96
00:03:41,659 --> 00:03:47,699
It'll be, so you can take up the three hours long as you need.

97
00:03:47,699 --> 00:03:50,739
But it's like, is it going to be double the number of questions

98
00:03:50,739 --> 00:03:51,259
on the midterm?

99
00:03:51,259 --> 00:03:52,060
No.

100
00:03:52,060 --> 00:03:52,899
Yeah.

101
00:03:55,379 --> 00:03:58,060
You know, we used to keep track of like the time

102
00:03:58,060 --> 00:03:59,899
with people who were turned in the final exam

103
00:03:59,899 --> 00:04:02,379
and their grade similar to the midterm.

104
00:04:02,379 --> 00:04:04,620
And it used to be like for previous years,

105
00:04:04,620 --> 00:04:07,539
like if you took the all three hours,

106
00:04:07,539 --> 00:04:10,739
you typically were in the lower end of the distribution curve.

107
00:04:10,739 --> 00:04:13,019
In recent years, people get like perfect scores.

108
00:04:13,019 --> 00:04:14,659
They take the whole three hours.

109
00:04:14,659 --> 00:04:20,060
So it's not meant to be twice as hard as long as the midterm.

110
00:04:20,060 --> 00:04:20,699
Other questions?

111
00:04:23,500 --> 00:04:24,300
All right, cool.

112
00:04:24,300 --> 00:04:24,500
All right.

113
00:04:24,500 --> 00:04:26,219
So again, what I want to talk about first

114
00:04:26,219 --> 00:04:29,100
is like what these OLAP systems sort of look like,

115
00:04:29,100 --> 00:04:33,860
how they're incorporated in your application environments.

116
00:04:33,860 --> 00:04:36,579
And then that'll then motivate why we want to be potentially

117
00:04:36,579 --> 00:04:38,819
built or need it to be a database system that

118
00:04:38,819 --> 00:04:41,259
do analytics on it.

119
00:04:41,259 --> 00:04:44,300
And in most cases, I'll say also to the,

120
00:04:44,300 --> 00:04:46,060
and this is purely a conjecture of mine,

121
00:04:46,060 --> 00:04:49,939
but like the most people are going to need

122
00:04:49,939 --> 00:04:52,339
a distributed analytical system because you're

123
00:04:52,339 --> 00:04:54,180
going to have potentially have a lot of data enriched

124
00:04:54,180 --> 00:04:55,579
with not just the data from your applications

125
00:04:55,579 --> 00:04:57,620
but from outside sources.

126
00:04:57,620 --> 00:05:01,740
And for those kind of things, a scaled architecture,

127
00:05:01,740 --> 00:05:04,180
like for an OLAP system makes more sense

128
00:05:04,180 --> 00:05:05,939
than maybe in an OLTP system.

129
00:05:05,939 --> 00:05:10,139
But again, as always, in databases, it depends.

130
00:05:10,139 --> 00:05:12,939
So this is a very common setup right here,

131
00:05:12,939 --> 00:05:15,379
where you have this separation in your application

132
00:05:15,379 --> 00:05:19,219
between the OLTP databases and the OLAP database.

133
00:05:19,219 --> 00:05:21,060
And I'm using OLAP database in a singular form

134
00:05:21,060 --> 00:05:24,300
because the term data warehouse is meant to be like,

135
00:05:24,300 --> 00:05:27,060
here's where all your data from your front end OLTP databases

136
00:05:27,060 --> 00:05:30,779
go, and you're going to run all your analytics on there.

137
00:05:30,779 --> 00:05:33,539
And even though I'm showing that the database drum,

138
00:05:33,539 --> 00:05:35,379
there's multilater drums here, and then one giant

139
00:05:35,379 --> 00:05:37,779
day drum for the OLAP system, again,

140
00:05:37,779 --> 00:05:39,539
these are just logical views.

141
00:05:39,540 --> 00:05:43,220
It could be spread across multiple nodes.

142
00:05:43,220 --> 00:05:46,700
So a very common setup is that you have your application

143
00:05:46,700 --> 00:05:48,980
running with these OLTP databases in the front end.

144
00:05:48,980 --> 00:05:50,980
And think of these as individual silos.

145
00:05:50,980 --> 00:05:53,780
Like there's one application writing data in this one,

146
00:05:53,780 --> 00:05:54,900
another application writing there,

147
00:05:54,900 --> 00:05:56,860
and they don't really talk to each other.

148
00:05:56,860 --> 00:05:58,220
And then you want to combine them together

149
00:05:58,220 --> 00:06:00,620
into your giant OLAP system, and you'll

150
00:06:00,620 --> 00:06:03,379
use a technique or a method called extract, transform,

151
00:06:03,379 --> 00:06:05,020
and load, or ETL.

152
00:06:05,020 --> 00:06:07,900
And the idea here is that you're going to extract data

153
00:06:07,899 --> 00:06:10,139
from your front end OLTP databases,

154
00:06:10,139 --> 00:06:12,099
transform it in some way to clean things up,

155
00:06:12,099 --> 00:06:14,339
to put it into a uniform schema, and then

156
00:06:14,339 --> 00:06:17,259
load it into your data warehouse.

157
00:06:17,259 --> 00:06:18,459
And the reason why you have to do this

158
00:06:18,459 --> 00:06:21,219
is because these applications could have

159
00:06:21,219 --> 00:06:23,579
been written by different people at different times

160
00:06:23,579 --> 00:06:25,979
and using different naming conventions.

161
00:06:25,979 --> 00:06:27,500
So maybe the one at the bottom, they

162
00:06:27,500 --> 00:06:31,099
have a table of users, and they're using somebody's first name.

163
00:06:31,099 --> 00:06:33,219
They'll use F name, or F underscore name.

164
00:06:33,219 --> 00:06:34,579
But then at another database, they'll

165
00:06:34,579 --> 00:06:36,620
use first underscore name.

166
00:06:36,620 --> 00:06:38,620
And as we as humans, we know they're

167
00:06:38,620 --> 00:06:40,100
corresponding to the same thing.

168
00:06:40,100 --> 00:06:43,220
But if you just look at the raw schema, they're different.

169
00:06:43,220 --> 00:06:44,300
So that's the transform phase.

170
00:06:44,300 --> 00:06:46,340
It's sort of you sort of clean things up.

171
00:06:46,340 --> 00:06:48,780
The example I always like to use is Zingga,

172
00:06:48,780 --> 00:06:51,500
think of like Farm Bill, about the data reference.

173
00:06:51,500 --> 00:06:55,740
But they would always buy these different game studios

174
00:06:55,740 --> 00:07:00,300
and buy their online applications, their online games.

175
00:07:00,300 --> 00:07:02,699
But then they would leave the front end database alone.

176
00:07:02,699 --> 00:07:03,939
So whatever the front end database was

177
00:07:03,939 --> 00:07:04,939
when they acquired these companies,

178
00:07:04,939 --> 00:07:06,819
they just let them do whatever they were doing.

179
00:07:06,819 --> 00:07:08,819
But then they obviously wanted to put it into a giant data

180
00:07:08,819 --> 00:07:09,540
warehouse.

181
00:07:09,540 --> 00:07:11,579
So they would do this ETL process to clean things up,

182
00:07:11,579 --> 00:07:13,420
because everyone would use sort of different naming

183
00:07:13,420 --> 00:07:14,779
conventions.

184
00:07:14,779 --> 00:07:16,939
So there's a bunch of tools that will help you do this.

185
00:07:16,939 --> 00:07:22,060
Informatica is probably the most famous one of all these.

186
00:07:22,060 --> 00:07:24,339
But then all the various database vendors,

187
00:07:24,339 --> 00:07:25,779
like Oracle and SQL Server, they all

188
00:07:25,779 --> 00:07:28,500
have their own various versions of this.

189
00:07:28,500 --> 00:07:29,740
So this is how traditionally people did

190
00:07:29,740 --> 00:07:33,220
data warehouses starting since maybe the 1990s.

191
00:07:33,220 --> 00:07:35,580
The current modern trend is a variation

192
00:07:35,580 --> 00:07:40,940
of this called, so the ETL, ELT, track load and transform.

193
00:07:40,940 --> 00:07:42,420
And the idea here is that you're still

194
00:07:42,420 --> 00:07:44,500
going to pull out data for your OTB databases,

195
00:07:44,500 --> 00:07:46,940
and then you're still going to load it into your OLAP system,

196
00:07:46,940 --> 00:07:49,500
but you're not actually going to transform it before you load it.

197
00:07:49,500 --> 00:07:52,620
You just load all the raw files into your data warehouse.

198
00:07:52,620 --> 00:07:53,980
And then the transform process actually

199
00:07:53,980 --> 00:07:56,780
really occurs inside the data warehouse itself,

200
00:07:56,780 --> 00:07:58,820
because there's going to be a bunch of SQL queries

201
00:07:58,820 --> 00:08:02,220
to convert it and then load it back into as more data files.

202
00:08:03,180 --> 00:08:05,820
DBT is probably the most famous one of all these.

203
00:08:05,820 --> 00:08:06,500
There's air bite.

204
00:08:06,500 --> 00:08:09,420
There's a bunch of other ones that can do this kind of stuff.

205
00:08:09,420 --> 00:08:11,700
And again, you think, OK, is it actually really different?

206
00:08:11,700 --> 00:08:14,860
If you do one versus the other, yeah.

207
00:08:14,860 --> 00:08:17,820
It depends on how the architecture is set up.

208
00:08:17,820 --> 00:08:21,020
But it's not to say that the ones at the top can't do ELT.

209
00:08:21,020 --> 00:08:22,460
It's just these ones of the bottom are still

210
00:08:22,460 --> 00:08:26,260
the design for doing those transformations.

211
00:08:26,260 --> 00:08:28,620
So again, now you can see why you could have a ton of database

212
00:08:28,620 --> 00:08:30,060
in your data warehouse, because you're

213
00:08:30,060 --> 00:08:31,700
getting data from all these other things.

214
00:08:31,699 --> 00:08:36,019
Or like things like 5Tran, and I think a bunch of the other ones,

215
00:08:36,019 --> 00:08:38,819
they can pull data from outside sources,

216
00:08:38,819 --> 00:08:40,659
like say getting weather information.

217
00:08:40,659 --> 00:08:43,740
You can have a pipeline that pipes that data into your data

218
00:08:43,740 --> 00:08:44,259
warehouse.

219
00:08:44,259 --> 00:08:45,460
You can enrich the data that you do have.

220
00:08:48,419 --> 00:08:51,580
So I'm going to use the term OLAP.

221
00:08:51,580 --> 00:08:53,340
Sometimes you'll see these kind of databases

222
00:08:53,340 --> 00:08:57,139
refer to as BI or business intelligence databases.

223
00:08:57,139 --> 00:08:59,340
Or sometimes you'll see them called decision support systems,

224
00:08:59,340 --> 00:09:01,220
DSS.

225
00:09:01,220 --> 00:09:02,820
They all pretty much mean the same thing.

226
00:09:02,820 --> 00:09:05,259
You're trying to extract new knowledge

227
00:09:05,259 --> 00:09:07,019
from the data you've already collected

228
00:09:07,019 --> 00:09:08,780
from your front end database system.

229
00:09:08,780 --> 00:09:12,379
You try to identify things like, here's the most,

230
00:09:12,379 --> 00:09:15,379
here's the item that most you will buy in the city of Pittsburgh

231
00:09:15,379 --> 00:09:19,379
in December when the weather goes below some temperature,

232
00:09:19,379 --> 00:09:21,180
some degree.

233
00:09:21,180 --> 00:09:25,139
Another famous example was Walmart, one of the figure out,

234
00:09:25,139 --> 00:09:26,340
this is like early 2000s.

235
00:09:26,340 --> 00:09:28,980
They wanted to figure out right before hurricane occurs

236
00:09:28,980 --> 00:09:31,340
and right after hurricane hits in the south,

237
00:09:31,340 --> 00:09:32,700
what does everyone go buy?

238
00:09:32,700 --> 00:09:36,379
So that they see this hurricane coming,

239
00:09:36,379 --> 00:09:38,539
they start stocking their warehouses

240
00:09:38,539 --> 00:09:41,420
near the stores in the south, but obviously

241
00:09:41,420 --> 00:09:44,100
outside of the danger zone of the hurricane.

242
00:09:44,100 --> 00:09:46,180
So then immediately after the hurricane hits,

243
00:09:46,180 --> 00:09:48,340
they then send in the trucks with all the supplies

244
00:09:48,340 --> 00:09:50,259
that they know people are going to buy.

245
00:09:50,259 --> 00:09:53,180
That's the idea of what we're trying to do here.

246
00:09:53,180 --> 00:09:56,860
We have the information from all our front end database.

247
00:09:56,860 --> 00:10:01,740
We're trying to then process it and then help us make decisions.

248
00:10:01,740 --> 00:10:07,300
So the way we're going to model our database

249
00:10:07,300 --> 00:10:09,340
is going to use potentially two different techniques

250
00:10:09,340 --> 00:10:12,300
in our O-Lapse system called a star schema and snowflake schema.

251
00:10:12,300 --> 00:10:15,060
And if everyone wants to know why snowflake is called snowflake,

252
00:10:15,060 --> 00:10:18,019
because they support snowflake schemas, right?

253
00:10:18,019 --> 00:10:22,860
Star schemas were bigger in the 90s.

254
00:10:22,860 --> 00:10:26,420
Star schema is a subset of what you can do in a snowflake schema

255
00:10:26,419 --> 00:10:28,500
is more general.

256
00:10:28,500 --> 00:10:31,099
But traditionally, doing joins is really expensive

257
00:10:31,099 --> 00:10:33,219
before column stores, before all these other acrylic

258
00:10:33,219 --> 00:10:35,339
acceleration stuff you can do.

259
00:10:35,339 --> 00:10:36,979
So you would say, I want to do star schemas.

260
00:10:36,979 --> 00:10:38,979
But nowadays, pretty much everyone does

261
00:10:38,979 --> 00:10:40,019
a snowflake schema.

262
00:10:40,019 --> 00:10:41,860
So there used to be some systems where you couldn't actually

263
00:10:41,860 --> 00:10:46,019
load a database unless you put it into a star schema form.

264
00:10:46,019 --> 00:10:48,620
Now, we don't really talk about data modeling in this class,

265
00:10:48,620 --> 00:10:50,219
because it's really about how to build a system.

266
00:10:50,219 --> 00:10:51,620
I think there's courses in Heinz College

267
00:10:51,620 --> 00:10:54,419
and the teachers of those things.

268
00:10:54,419 --> 00:10:55,699
And we don't teach about normal forms,

269
00:10:55,700 --> 00:10:57,420
because that's a waste of time, because nobody actually

270
00:10:57,420 --> 00:10:58,420
uses them in the real world.

271
00:10:58,420 --> 00:11:00,820
But I'm going to talk a little bit about what these two things

272
00:11:00,820 --> 00:11:01,340
look like.

273
00:11:01,340 --> 00:11:03,180
And then that'll help us motivate why we

274
00:11:03,180 --> 00:11:05,060
want to do efficient joins, or why we

275
00:11:05,060 --> 00:11:07,259
can use some things with joins that may not, maybe not

276
00:11:07,259 --> 00:11:09,820
others for certain tables.

277
00:11:09,820 --> 00:11:11,900
So this is what a star schema looks like.

278
00:11:11,900 --> 00:11:13,540
So the basic idea is that in the middle here,

279
00:11:13,540 --> 00:11:15,140
you have what is called the fact table.

280
00:11:15,140 --> 00:11:16,980
So this is modeling, say, again,

281
00:11:16,980 --> 00:11:18,780
do you think Walmart is an example?

282
00:11:18,780 --> 00:11:22,980
This fact table here is going to be the every item that anyone

283
00:11:22,980 --> 00:11:25,779
ever has ever bought at a store at Walmart.

284
00:11:25,779 --> 00:11:27,120
Like anything that was skinned along catch,

285
00:11:27,120 --> 00:11:29,779
or anything Amazon, anytime anybody bought something online,

286
00:11:29,779 --> 00:11:33,139
the fact table is going to have a single row for every single item.

287
00:11:33,139 --> 00:11:35,139
And so you would keep track of the price,

288
00:11:35,139 --> 00:11:37,740
and the quantity keeps those as attributes directly

289
00:11:37,740 --> 00:11:39,580
into the fact table.

290
00:11:39,580 --> 00:11:42,220
But then you're going to have all these foreign key references

291
00:11:42,220 --> 00:11:44,700
to what are called dimension tables that

292
00:11:44,700 --> 00:11:48,139
are going to be around the outside of the fact table.

293
00:11:48,139 --> 00:11:50,100
So this should be sort of obvious.

294
00:11:50,100 --> 00:11:52,300
For every single item ever has ever bought,

295
00:11:52,299 --> 00:11:54,779
I don't want to store the name, the description of that item

296
00:11:54,779 --> 00:11:55,899
over and over again.

297
00:11:55,899 --> 00:11:58,259
I want to put it into a dimension table

298
00:11:58,259 --> 00:12:00,219
so that anytime I need to get it,

299
00:12:00,219 --> 00:12:03,859
I just have a foreign key look up to this.

300
00:12:03,859 --> 00:12:06,019
And then now when you're doing a bunch of joins,

301
00:12:06,019 --> 00:12:09,500
you're basically, do the calculation of the same before?

302
00:12:09,500 --> 00:12:13,699
Find what item people bought right after Hurricane

303
00:12:13,699 --> 00:12:15,859
in this geographical region.

304
00:12:15,859 --> 00:12:18,259
I just rip through my entire fact table

305
00:12:18,259 --> 00:12:21,419
and do additional filtering on whether or not

306
00:12:21,419 --> 00:12:25,339
additional dimensions that I have.

307
00:12:25,339 --> 00:12:27,059
But again, for an star schema, I can only

308
00:12:27,059 --> 00:12:30,579
have one level of dimension tables going on the outside,

309
00:12:30,579 --> 00:12:32,299
because you want to reduce the number of joins

310
00:12:32,299 --> 00:12:35,059
you have to do.

311
00:12:35,059 --> 00:12:40,259
And so snowflake schema, you can have any arbitrary amount

312
00:12:40,259 --> 00:12:42,099
of nesting or leveling.

313
00:12:42,099 --> 00:12:43,459
And this is a term we don't want to talk about.

314
00:12:43,459 --> 00:12:44,860
It's called normalization.

315
00:12:44,860 --> 00:12:46,819
So normalization is like splitting a table up

316
00:12:46,819 --> 00:12:49,699
into the smallest of top-up units

317
00:12:49,980 --> 00:12:51,340
to reduce the amount of redundant information

318
00:12:51,340 --> 00:12:52,500
you're keeping track of.

319
00:12:52,500 --> 00:12:55,620
So like going back here for the product category,

320
00:12:55,620 --> 00:12:57,940
I'm keeping track of within the name of the product

321
00:12:57,940 --> 00:13:00,020
of the description, but also the category name

322
00:13:00,020 --> 00:13:01,460
and the category description.

323
00:13:01,460 --> 00:13:04,020
So I'll have multiple entries in the same category.

324
00:13:04,020 --> 00:13:06,300
I'll just repeat that information over and over again.

325
00:13:06,300 --> 00:13:08,300
The idea is there because you're denormalizing it,

326
00:13:08,300 --> 00:13:10,940
putting it into one table, I don't have to do a join

327
00:13:10,940 --> 00:13:12,340
to go get that.

328
00:13:12,340 --> 00:13:14,020
But then the downside, of course, is that if anytime

329
00:13:14,020 --> 00:13:15,580
I update the name of a category,

330
00:13:15,580 --> 00:13:18,420
I got to make sure I update all the tuples.

331
00:13:18,419 --> 00:13:19,539
That's basically what normalization,

332
00:13:19,539 --> 00:13:21,019
denormalization stuff.

333
00:13:21,019 --> 00:13:22,459
We don't teach you the things.

334
00:13:22,459 --> 00:13:24,539
But you'll see it in the real world,

335
00:13:24,539 --> 00:13:26,860
but not described in terms of normal forms, which

336
00:13:26,860 --> 00:13:29,699
is the whole other, it was the theory of how

337
00:13:29,699 --> 00:13:32,019
to design our model database.

338
00:13:32,019 --> 00:13:33,740
We can ignore that.

339
00:13:33,740 --> 00:13:35,659
Nobody doesn't real world.

340
00:13:35,659 --> 00:13:36,939
So again, going back here.

341
00:13:36,939 --> 00:13:39,740
So now if I do the snowflake schema,

342
00:13:39,740 --> 00:13:43,500
I can normalize out the category information

343
00:13:43,500 --> 00:13:46,099
from my products so that now I have a separate category

344
00:13:46,099 --> 00:13:48,259
lookup table.

345
00:13:48,259 --> 00:13:49,939
And now if I want to get the name of a category

346
00:13:49,939 --> 00:13:52,460
for a given product, I just do a join against that.

347
00:13:52,460 --> 00:13:54,500
All right?

348
00:13:54,500 --> 00:13:58,620
So this is a lot of what I've already said before.

349
00:13:58,620 --> 00:14:00,980
In a star schema, the advantage is going

350
00:14:00,980 --> 00:14:02,580
to be it's going to run a lot faster,

351
00:14:02,580 --> 00:14:06,299
potentially because I don't have to do a bunch of joins.

352
00:14:06,299 --> 00:14:10,419
But I'm going to have this duplication of data

353
00:14:10,419 --> 00:14:12,379
because I've sort of flattened my tables down

354
00:14:12,379 --> 00:14:16,259
or combine tables into single tables.

355
00:14:16,259 --> 00:14:17,639
The snowflake schemas are going to be

356
00:14:17,639 --> 00:14:19,899
require more joins, and potentially the queries

357
00:14:19,899 --> 00:14:25,179
will be more difficult to do a good planning on.

358
00:14:25,179 --> 00:14:26,700
But again, I have the advantage that I

359
00:14:26,700 --> 00:14:29,580
have that isolation of the data, or I'm

360
00:14:29,580 --> 00:14:31,460
reducing the number of copies of it,

361
00:14:31,460 --> 00:14:34,139
and it sort of makes it easier to read them out.

362
00:14:34,139 --> 00:14:35,580
It's going on.

363
00:14:35,580 --> 00:14:37,379
So when you go in the real world for analytical systems,

364
00:14:37,379 --> 00:14:38,939
you will probably see a snowflake schema.

365
00:14:38,939 --> 00:14:42,659
Nobody really does star schemas anymore.

366
00:14:42,659 --> 00:14:45,779
Again, this is why snowflake is called snowflake.

367
00:14:45,779 --> 00:14:48,179
OK?

368
00:14:48,179 --> 00:14:49,819
All right, so with that said, here's the problem

369
00:14:49,819 --> 00:14:51,899
we're trying to solve today.

370
00:14:51,899 --> 00:14:54,819
Applications ever comes along against our data warehouse

371
00:14:54,819 --> 00:14:56,579
or analytical database system, and they

372
00:14:56,579 --> 00:14:59,459
want to do a join on RNS.

373
00:14:59,459 --> 00:15:04,419
And say R is the fact table when S is the dimension table,

374
00:15:04,419 --> 00:15:06,419
but for now it doesn't matter.

375
00:15:06,419 --> 00:15:09,620
And I partitioned my database for these two tables

376
00:15:09,620 --> 00:15:12,379
across four different partitions, or still

377
00:15:12,379 --> 00:15:13,980
because four different partitions,

378
00:15:13,980 --> 00:15:16,539
doesn't matter whether it's shared disk or shared

379
00:15:16,539 --> 00:15:18,300
nothing at this point.

380
00:15:18,300 --> 00:15:19,259
We still have the same problem.

381
00:15:19,259 --> 00:15:20,940
We want to do a join.

382
00:15:20,940 --> 00:15:24,420
So the dumbest way to do a join would be,

383
00:15:24,420 --> 00:15:27,180
well, I know I need data at these four partitions.

384
00:15:27,180 --> 00:15:30,580
So let me just go copy all of them back to a single node

385
00:15:30,580 --> 00:15:32,779
so I can do a join.

386
00:15:32,779 --> 00:15:34,259
But obviously that defeats the purpose

387
00:15:34,259 --> 00:15:36,620
of having a distributed database, right?

388
00:15:36,620 --> 00:15:40,139
Because if my database is 10 petabytes,

389
00:15:40,139 --> 00:15:42,899
and I only have a terabyte of memory on that one partition

390
00:15:42,899 --> 00:15:45,259
when I want one node, then I'm going to read everything

391
00:15:45,259 --> 00:15:48,419
from disk from the other nodes, put it into memory,

392
00:15:48,419 --> 00:15:51,139
and then now I'm basically a single node machine.

393
00:15:51,139 --> 00:15:56,419
And I don't get any benefit of having multiple resources.

394
00:15:56,419 --> 00:15:58,659
So this sucks, and we want to avoid this.

395
00:15:58,659 --> 00:16:00,500
And obviously, when you want to do this in such a way

396
00:16:00,500 --> 00:16:04,500
that I distribute the query across these multiple nodes,

397
00:16:04,500 --> 00:16:06,299
in such a way that we don't have any false positives,

398
00:16:06,299 --> 00:16:08,500
false negatives.

399
00:16:08,500 --> 00:16:11,139
We want to peer as if we're running on a single node,

400
00:16:11,139 --> 00:16:13,939
even though we're not.

401
00:16:13,939 --> 00:16:17,779
So we've already gone through the Snowflake versus Star

402
00:16:17,779 --> 00:16:19,539
schema stuff.

403
00:16:19,539 --> 00:16:20,699
We're going to talk about the execution models

404
00:16:20,699 --> 00:16:22,659
you could have for a distributed database for doing

405
00:16:22,659 --> 00:16:23,539
our left stuff.

406
00:16:23,539 --> 00:16:25,379
Talk a little bit about how we want to do query planning,

407
00:16:25,379 --> 00:16:28,340
and what changes now when we're in an distributed environment.

408
00:16:28,340 --> 00:16:31,419
And then in the TLDR, for that, it's going to be everything's

409
00:16:31,419 --> 00:16:32,019
the same.

410
00:16:32,019 --> 00:16:36,460
It's just now we need to account for the location of data,

411
00:16:36,460 --> 00:16:37,779
and maybe how it's partitioned.

412
00:16:37,779 --> 00:16:40,139
But all the self-taught stuff, like join ordering,

413
00:16:40,139 --> 00:16:41,819
credit can push down, projection push down,

414
00:16:41,819 --> 00:16:44,179
all that is still here.

415
00:16:44,179 --> 00:16:46,419
Then we'll talk about how we can actually execute joins.

416
00:16:46,419 --> 00:16:48,139
And again, there isn't, it's still going

417
00:16:48,139 --> 00:16:50,779
to be either sortmars join or hash join in distributed

418
00:16:50,779 --> 00:16:51,860
environment.

419
00:16:51,860 --> 00:16:55,299
Most distributed data says are going to have joins.

420
00:16:55,299 --> 00:16:57,659
Because most of the time you're going to be hash partitioned.

421
00:16:57,659 --> 00:16:59,100
But we'll get that in a second.

422
00:16:59,100 --> 00:17:01,580
But again, we need to account for where the data is actually

423
00:17:01,580 --> 00:17:03,340
located that we need.

424
00:17:03,340 --> 00:17:05,339
And if it is partitioned, what key is it partitioned on?

425
00:17:05,339 --> 00:17:07,819
Is it the thing we're trying to join on or not?

426
00:17:07,819 --> 00:17:09,500
And then we'll finish off doing, again,

427
00:17:09,500 --> 00:17:12,299
quick overview of what cloud database systems look like,

428
00:17:12,299 --> 00:17:15,819
specifically in the context of OLAP systems.

429
00:17:15,819 --> 00:17:18,539
And I'll confess now that this is a precursor

430
00:17:18,539 --> 00:17:21,299
to what 721 will be next semester.

431
00:17:21,299 --> 00:17:23,299
OK?

432
00:17:23,299 --> 00:17:25,299
All right.

433
00:17:25,299 --> 00:17:27,220
All right, so the first thing we've got to do is execute queries.

434
00:17:27,220 --> 00:17:29,019
Obviously.

435
00:17:29,019 --> 00:17:30,740
And as I said already, it's basically

436
00:17:30,740 --> 00:17:33,740
going to be the same thing as we do in a single node database

437
00:17:33,740 --> 00:17:34,539
system.

438
00:17:34,539 --> 00:17:37,220
The query plan is going to be most likely a DAG

439
00:17:37,220 --> 00:17:39,140
of these physical operators that are

440
00:17:39,140 --> 00:17:42,420
going to be moving data from one operator to the next.

441
00:17:42,420 --> 00:17:46,740
And whether we're doing a push versus pull in a processing model,

442
00:17:46,740 --> 00:17:48,740
it doesn't matter.

443
00:17:48,740 --> 00:17:50,779
And so now when in our database system,

444
00:17:50,779 --> 00:17:52,140
since we know we're distributed,

445
00:17:52,140 --> 00:17:54,740
we know that data could be not physically

446
00:17:54,740 --> 00:17:56,860
located where the operator is actually running,

447
00:17:56,860 --> 00:17:59,700
we have to consider where is the data coming from,

448
00:17:59,700 --> 00:18:01,740
and where does it need to go next.

449
00:18:01,740 --> 00:18:04,259
And this is all stuff we do some bed inside of our query

450
00:18:04,259 --> 00:18:07,339
plan.

451
00:18:07,339 --> 00:18:10,420
So again, using table scans, we would know,

452
00:18:10,420 --> 00:18:11,900
we need to access this table.

453
00:18:11,900 --> 00:18:15,299
And if I'm partition or not, if yes, where's the data

454
00:18:15,299 --> 00:18:18,379
located, or if I'm shared disk, for sure, nothing,

455
00:18:18,379 --> 00:18:21,379
is it from a central disk I can get the data from,

456
00:18:21,379 --> 00:18:23,980
or do I need to go to a node that has it?

457
00:18:23,980 --> 00:18:25,579
For joins, again, we'll cover these in a second.

458
00:18:25,579 --> 00:18:26,500
Aggregations are sorting.

459
00:18:26,500 --> 00:18:28,420
All this is still the same.

460
00:18:29,140 --> 00:18:30,140
Right?

461
00:18:32,140 --> 00:18:38,060
So then the next question is, for a given query plan,

462
00:18:38,060 --> 00:18:43,860
how are we going to get the data we need to execute these operators?

463
00:18:43,860 --> 00:18:47,300
And we talked a little bit about this before in the OTB systems,

464
00:18:47,300 --> 00:18:49,460
about this notion of, I'm not going to push the query

465
00:18:49,460 --> 00:18:51,740
to where the data is actually physically located,

466
00:18:51,740 --> 00:18:56,140
or should I pull the data to where I want to run my query?

467
00:18:56,140 --> 00:19:02,220
And in the OTB world, the size of the query and the size of the data,

468
00:19:02,220 --> 00:19:05,500
the data is not going to be that big.

469
00:19:05,500 --> 00:19:09,259
But as I showed my early example, if my database is 10 petabytes,

470
00:19:09,259 --> 00:19:12,540
then maybe I don't want to pull the data to some node.

471
00:19:12,540 --> 00:19:17,620
I may want to send my execution request over to where it's located.

472
00:19:17,620 --> 00:19:19,820
Then there's also now a question of what

473
00:19:19,820 --> 00:19:23,220
happens with the data, the in-bidant results that I generate.

474
00:19:23,220 --> 00:19:26,900
Should I store them on my current node,

475
00:19:26,900 --> 00:19:30,220
and then let someone come get it for me, or can I decide, OK,

476
00:19:30,220 --> 00:19:31,380
I know where this needs to go.

477
00:19:31,380 --> 00:19:33,259
Let me set sending it now.

478
00:19:33,259 --> 00:19:35,940
Or should I write it out to a shared disk?

479
00:19:35,940 --> 00:19:39,579
So that way, if I crash, and with my node crashes,

480
00:19:39,579 --> 00:19:43,660
the other node can say, OK, well, I know they process the thing I asked it for.

481
00:19:43,660 --> 00:19:46,579
But here's, and here, let me go get it from a shared disk.

482
00:19:46,579 --> 00:19:49,940
Instead of having to restart the entire query.

483
00:19:49,940 --> 00:19:50,940
So let's go through these.

484
00:19:50,940 --> 00:19:52,700
One by one.

485
00:19:52,700 --> 00:19:54,620
So again, pushing query to the data, again,

486
00:19:54,620 --> 00:19:57,380
the idea is that we're going to send the query or some portion of it,

487
00:19:57,380 --> 00:20:01,100
like a query fragment, to the node that contains the data.

488
00:20:01,100 --> 00:20:04,019
And again, this doesn't matter where the shared disk or shared nothing,

489
00:20:04,019 --> 00:20:07,580
because we have this notion of logical partitioning.

490
00:20:07,580 --> 00:20:12,700
We know that if the data is at this node that it's not actually located,

491
00:20:12,700 --> 00:20:15,580
that it has not physically stored it yet, but it's responsible for it,

492
00:20:15,580 --> 00:20:19,299
it knows how to go to shared disk and pull it in.

493
00:20:19,299 --> 00:20:21,259
And the advantage of this is that we want to be

494
00:20:21,259 --> 00:20:26,379
do as much filtering and processing on the data where it resides

495
00:20:26,379 --> 00:20:29,579
before we send it off to the next node.

496
00:20:29,579 --> 00:20:34,740
Because traditionally, the network was always faster than disk.

497
00:20:34,740 --> 00:20:37,819
That is changing a little bit now.

498
00:20:37,819 --> 00:20:40,700
But the network's in disk getting ready very fast.

499
00:20:40,700 --> 00:20:45,180
But again, just think of like if you had a pay for the network traffic itself

500
00:20:45,180 --> 00:20:47,299
in a data center, or to go outside of data center,

501
00:20:47,299 --> 00:20:50,259
like Amazon charges you when you leave their data center.

502
00:20:50,259 --> 00:20:54,299
I want to throw away as much useful data as I can before I send along.

503
00:20:54,299 --> 00:20:56,619
Again, it's the same thing as doing projection pushdown,

504
00:20:56,619 --> 00:21:00,099
or predicate pushdown when we did query planning on a single node.

505
00:21:00,099 --> 00:21:04,660
We want to filter things that are much as possible before we start sending it along.

506
00:21:04,660 --> 00:21:09,339
So if we can send some portion of our query to where the data is located,

507
00:21:09,339 --> 00:21:12,059
do much processing as we can there before it moves on to the next stage,

508
00:21:12,059 --> 00:21:15,579
then we could get a big win there.

509
00:21:15,579 --> 00:21:18,379
In some cases though, you actually may want to pull the data to the query.

510
00:21:18,380 --> 00:21:21,340
Again, if it's the shared disk, you may have to, right?

511
00:21:21,340 --> 00:21:27,380
Because I can't maybe run my query on the shared disk architecture on the object store.

512
00:21:27,380 --> 00:21:28,260
Not entirely true.

513
00:21:28,260 --> 00:21:30,580
We'll see that in a second.

514
00:21:30,580 --> 00:21:33,380
But if you can't, there's no compute resources.

515
00:21:33,380 --> 00:21:36,300
There's nothing to say, hey, execute some piece of code for me,

516
00:21:36,300 --> 00:21:40,220
where the data is located, then you have to pull it in.

517
00:21:40,220 --> 00:21:45,020
And so the reason why I'm saying the lines get blurred is because in modern cloud systems,

518
00:21:45,019 --> 00:21:51,059
like the object stores, you can actually run what looks like queries.

519
00:21:51,059 --> 00:21:58,819
So in S3 in their documentation, you can basically run SQL queries on S3.

520
00:21:58,819 --> 00:22:02,460
And it's not full SQL obviously, and it's pretty basic.

521
00:22:02,460 --> 00:22:07,059
But this basic, this basic, basic, predicate pushdown that we talked about before,

522
00:22:07,059 --> 00:22:12,619
where I say, okay, I had this filter clause, this filter my where clause,

523
00:22:12,619 --> 00:22:15,339
when I go request the data from the object store,

524
00:22:15,339 --> 00:22:17,859
I also pass along that where clause and let it do some filtering.

525
00:22:17,859 --> 00:22:20,459
So it only sends me back the data that I need.

526
00:22:20,459 --> 00:22:24,099
Instead of copying the whole thing, figuring out later.

527
00:22:24,099 --> 00:22:28,859
So it's not just Amazon, Microsoft also has this for their blob storage,

528
00:22:28,859 --> 00:22:31,619
that you can do something that looks like SQL.

529
00:22:31,619 --> 00:22:33,659
And actually, what's really cool about this stuff too,

530
00:22:33,659 --> 00:22:36,539
because we'll talk about file formats in a second,

531
00:22:36,539 --> 00:22:42,700
is that these object stores have native support for CSVs and JSON files,

532
00:22:42,700 --> 00:22:45,379
and parquet, which is a binary format, we're covering in a second.

533
00:22:45,379 --> 00:22:50,379
But it's not just like, it's not just like raw text files,

534
00:22:50,379 --> 00:22:54,180
you can store things in an efficient, compressed binary format,

535
00:22:54,180 --> 00:22:59,940
and they'll know how to process it on the fly for you and run your queries.

536
00:22:59,940 --> 00:23:02,859
I don't know whether you can do aggregations, I know you can do filtering.

537
00:23:02,859 --> 00:23:06,019
So it's not a full database engine down there, you can do whatever you want.

538
00:23:06,019 --> 00:23:09,740
But you can clean some things up before you send it over.

539
00:23:09,740 --> 00:23:15,859
I haven't looked this year, but GCP or Google didn't support this when I looked at it.

540
00:23:15,859 --> 00:23:19,779
And this is not actually not unique to these cloud vendors or object stores.

541
00:23:19,779 --> 00:23:23,259
This is an old idea for shared systems before the cloud.

542
00:23:23,259 --> 00:23:28,859
Oracle X-A data basically has an FPGA on their storage node.

543
00:23:28,859 --> 00:23:30,859
So you can send the where clause to the FPGA,

544
00:23:30,859 --> 00:23:35,099
and it filters the data as it's coming over the wire to you, which is pretty cool.

545
00:23:35,099 --> 00:23:37,299
And obviously, since Oracle controls the whole thing,

546
00:23:37,299 --> 00:23:41,539
it's an Oracle's proprietary format.

547
00:23:41,539 --> 00:23:46,579
So the lines get blurred when you say whether to share disk or share nothing.

548
00:23:46,579 --> 00:23:51,099
The shared disk systems, especially in the cloud, are getting very good for this kind of stuff.

549
00:23:51,099 --> 00:23:56,419
And I don't know whether it's snowflake and others taking advantages.

550
00:23:56,419 --> 00:23:58,740
I know Reship does.

551
00:23:58,740 --> 00:24:00,980
That's public.

552
00:24:00,980 --> 00:24:03,099
So again, this is just repeating what I've already said.

553
00:24:03,099 --> 00:24:05,099
But we want to push the query to the data.

554
00:24:05,099 --> 00:24:07,339
Query goes to this node here.

555
00:24:07,339 --> 00:24:11,659
It recognizes that it wants to join RNS,

556
00:24:11,659 --> 00:24:16,059
but RNS are partition based on the ID column, which was what we're joining on.

557
00:24:16,059 --> 00:24:18,819
So instead of the top node telling the bottom node,

558
00:24:18,819 --> 00:24:21,659
send me whatever you all the data you have,

559
00:24:21,659 --> 00:24:24,379
it sends down the query plan fragment.

560
00:24:24,379 --> 00:24:26,459
Because again, there's some metadata we're keeping track of.

561
00:24:26,459 --> 00:24:30,419
This says, for these tables, they're partitioned on this column.

562
00:24:30,419 --> 00:24:32,099
In this case, we're doing range partitioning.

563
00:24:32,099 --> 00:24:37,819
And I know what the range values of that ID that are located at different nodes,

564
00:24:37,819 --> 00:24:39,299
are controlled by different nodes.

565
00:24:39,299 --> 00:24:41,699
So I can send my query plan fragment down here to say, hey,

566
00:24:41,699 --> 00:24:44,539
by the way, join RNS for this range.

567
00:24:44,539 --> 00:24:47,579
And then the result gets sent back up to this node,

568
00:24:47,579 --> 00:24:50,699
who then does a union of the local result it computed,

569
00:24:50,699 --> 00:24:57,099
and the result that it got from the other node.

570
00:24:57,099 --> 00:25:00,819
Share disk, same idea, for pulling the query to the data.

571
00:25:00,819 --> 00:25:04,099
So in this case here, I want to get,

572
00:25:04,099 --> 00:25:05,939
I query shows up at the top node.

573
00:25:05,939 --> 00:25:08,700
It knows the bottom node here is responsible for this range.

574
00:25:08,700 --> 00:25:12,700
So but they both had to go to share disk and get the pages that they need

575
00:25:12,700 --> 00:25:14,179
to then do the processing.

576
00:25:14,179 --> 00:25:19,700
And then the bottom guy sends his result up to the top node.

577
00:25:19,700 --> 00:25:21,179
And again, it just unies the results.

578
00:25:21,820 --> 00:25:23,820
Right?

579
00:25:23,820 --> 00:25:26,740
OK.

580
00:25:26,740 --> 00:25:33,660
So in the example that I've shown here,

581
00:25:33,660 --> 00:25:36,140
when you get the result from the other node,

582
00:25:36,140 --> 00:25:38,700
who processed some portion of the query for you,

583
00:25:38,700 --> 00:25:42,539
that node is just going to store it in this buffer pool.

584
00:25:42,539 --> 00:25:44,100
That way, if it runs out of memory,

585
00:25:44,100 --> 00:25:45,940
because you're getting too much data from the other guy,

586
00:25:45,940 --> 00:25:50,860
it just spills a disk until you can combine the result and send it back.

587
00:25:50,859 --> 00:25:52,459
Now, in some cases, for some queries,

588
00:25:52,459 --> 00:25:55,819
you actually can just immediately start sending the data back out

589
00:25:55,819 --> 00:25:58,179
to the client as it comes in.

590
00:25:58,179 --> 00:26:00,579
But in some cases, if there's another stage in the query plan,

591
00:26:00,579 --> 00:26:03,899
you may need to store it locally and then send along the next stage.

592
00:26:03,899 --> 00:26:06,899
You just can't immediately send it out.

593
00:26:06,899 --> 00:26:10,699
And then the last lecture, we made a big deal

594
00:26:10,699 --> 00:26:16,179
about making sure that like, about crash recovery,

595
00:26:16,179 --> 00:26:18,179
doing two-phase commit across the different nodes.

596
00:26:18,179 --> 00:26:19,859
If we want to make a change, everyone's

597
00:26:19,859 --> 00:26:22,419
going to have a reason that this is going to happen.

598
00:26:22,419 --> 00:26:25,339
But we don't really worry about that in this world,

599
00:26:25,339 --> 00:26:27,899
because we're not making changes to the database.

600
00:26:27,899 --> 00:26:30,339
We're just doing some kind of read-only select query

601
00:26:30,339 --> 00:26:33,379
that's trying to get new data.

602
00:26:33,379 --> 00:26:36,259
But then the challenge is now, what happens

603
00:26:36,259 --> 00:26:39,419
if my query is going to run for a really long time?

604
00:26:39,419 --> 00:26:41,699
Think hours?

605
00:26:41,699 --> 00:26:47,299
Days less common now, but the old days, this was an issue.

606
00:26:47,299 --> 00:26:48,819
If my query is going to run for five hours,

607
00:26:48,819 --> 00:26:54,019
but then after hour three, one node goes down, what happens?

608
00:26:54,019 --> 00:26:57,220
If I'm just storing things in an informal cache

609
00:26:57,220 --> 00:26:59,980
in my buffer pool, and it's written to my local disk

610
00:26:59,980 --> 00:27:03,179
at the node, again, whether it's shared disk or shared nothing,

611
00:27:03,179 --> 00:27:04,379
then the whole query has to restart.

612
00:27:07,259 --> 00:27:10,980
So there's another notion of fault tolerance for databases.

613
00:27:10,980 --> 00:27:13,019
But it's really about query fault tolerance,

614
00:27:13,019 --> 00:27:15,579
meaning if my query is going to spread across

615
00:27:15,579 --> 00:27:18,259
multiple machines, all processing in parallel,

616
00:27:18,259 --> 00:27:20,740
that I want to avoid the issue of one node going down,

617
00:27:20,740 --> 00:27:24,180
taking the whole thing, and crashing the whole query

618
00:27:24,180 --> 00:27:26,900
and having to restart.

619
00:27:26,900 --> 00:27:29,660
And again, this is nothing to do with whether the data's

620
00:27:29,660 --> 00:27:32,099
replicate or not.

621
00:27:32,099 --> 00:27:34,059
You wouldn't really necessarily want to maybe replicate

622
00:27:34,059 --> 00:27:36,460
the result at different nodes, or have two nodes compute

623
00:27:36,460 --> 00:27:39,460
the same answer so that you can case one of them goes down,

624
00:27:39,460 --> 00:27:41,099
because that would be really inefficient.

625
00:27:41,099 --> 00:27:44,940
So we need a better way to record the enemy results

626
00:27:44,940 --> 00:27:47,619
as our query runs so that if there is a crash,

627
00:27:47,619 --> 00:27:50,299
one of the node does go down, then we don't

628
00:27:50,299 --> 00:27:53,899
have to restart the whole thing.

629
00:27:53,899 --> 00:27:55,779
And so the idea is what we're going to do here

630
00:27:55,779 --> 00:27:58,739
is that we just need a place that where we can store data

631
00:27:58,739 --> 00:28:00,459
for the query while it's running.

632
00:28:00,459 --> 00:28:04,899
So that if one node goes down, we can go pick up those results.

633
00:28:04,899 --> 00:28:05,659
What can we use for that?

634
00:28:09,259 --> 00:28:10,299
The shared disk, right?

635
00:28:10,299 --> 00:28:11,699
Because that thing is not going to wear.

636
00:28:11,699 --> 00:28:15,059
Amazon S3 going down would be, I mean, it does go down,

637
00:28:15,059 --> 00:28:19,619
but it would be taking the entire internet down, right?

638
00:28:19,619 --> 00:28:21,980
So we can just use a shared disk storage

639
00:28:21,980 --> 00:28:25,700
as a way to keep almost like a checkpoint for our queries

640
00:28:25,700 --> 00:28:27,579
while they're running.

641
00:28:27,579 --> 00:28:29,179
So again, same setup here.

642
00:28:29,179 --> 00:28:31,220
I want to run this query.

643
00:28:31,220 --> 00:28:34,259
I asked the bottom guy here to do the join.

644
00:28:34,259 --> 00:28:36,659
And then instead of maybe sending the result immediately

645
00:28:36,659 --> 00:28:39,220
back up to the node there, I'm going to write it

646
00:28:39,220 --> 00:28:41,980
to my object store or write it to my shared disk.

647
00:28:41,980 --> 00:28:46,180
And then tell the guy up there, or you would coordinate

648
00:28:46,180 --> 00:28:48,299
it ahead of time, hey, by the way, you

649
00:28:48,299 --> 00:28:50,779
have to run this query plan, query plan fragment.

650
00:28:50,779 --> 00:28:52,660
Here's the location on shared disk where you can go

651
00:28:52,660 --> 00:28:53,660
to go to my result.

652
00:28:53,660 --> 00:28:57,779
So now if this guy crashes, then the other node

653
00:28:57,779 --> 00:29:01,500
can just retrieve that result and pick up where it left off.

654
00:29:01,500 --> 00:29:04,420
Now there's much coordination going on about like, OK,

655
00:29:04,420 --> 00:29:05,700
this node went down.

656
00:29:05,700 --> 00:29:07,299
Let me spin up another node in Kubernetes

657
00:29:07,299 --> 00:29:10,539
or whatever you're using to then replace it.

658
00:29:10,539 --> 00:29:13,420
But I don't need to re-compute everything that it actually did.

659
00:29:15,940 --> 00:29:19,420
Who here has heard of a doop?

660
00:29:19,420 --> 00:29:22,339
All right, less than half.

661
00:29:22,339 --> 00:29:23,460
So our map reduced.

662
00:29:23,460 --> 00:29:25,259
Who here has heard of Map reduced?

663
00:29:25,259 --> 00:29:26,420
Same people.

664
00:29:26,420 --> 00:29:30,259
So in the 2000s, Google came out this paper

665
00:29:30,259 --> 00:29:33,339
of 2004ish for this technique called Map Reduce.

666
00:29:33,339 --> 00:29:37,099
It's basically a distributed programming paradigm

667
00:29:37,099 --> 00:29:40,299
of framework where you write these specialized map

668
00:29:40,299 --> 00:29:44,579
and reduce functions that allow you to do data processing.

669
00:29:44,579 --> 00:29:47,019
It was basically arbitrary Java code,

670
00:29:47,019 --> 00:29:48,740
or at least in who did it was.

671
00:29:48,740 --> 00:29:51,339
And their invitation, because they

672
00:29:51,339 --> 00:29:53,299
were assuming you're running on cheap hardware,

673
00:29:53,299 --> 00:29:57,779
thinking thousands of single unit servers,

674
00:29:57,779 --> 00:30:01,460
they would do this check pointing after every single sort

675
00:30:01,460 --> 00:30:03,859
of map reduced phase.

676
00:30:03,859 --> 00:30:05,619
And they would duplicate it three or four times.

677
00:30:05,619 --> 00:30:07,019
It would be super expensive.

678
00:30:07,019 --> 00:30:09,339
So in my example here, I'm showing, like, oh, yeah,

679
00:30:09,339 --> 00:30:11,659
I run this join, and then all the results

680
00:30:11,659 --> 00:30:14,740
get sent back to the shared disk.

681
00:30:14,740 --> 00:30:16,139
They would do that for everything.

682
00:30:16,139 --> 00:30:17,779
But you can be actually a bit smarter about it,

683
00:30:17,779 --> 00:30:19,659
and then recognize it, OK, well, maybe I'm

684
00:30:19,659 --> 00:30:22,059
going to do this join, and then immediately do something

685
00:30:22,059 --> 00:30:22,779
else right after.

686
00:30:22,779 --> 00:30:24,339
But I can do that locally in my node.

687
00:30:24,339 --> 00:30:28,939
So maybe I don't need to send out the result to the shared disk.

688
00:30:28,939 --> 00:30:34,179
So in modern systems, they'll do this kind of check pointing

689
00:30:34,179 --> 00:30:36,939
similar to what Hadoop was doing to avoid having

690
00:30:36,939 --> 00:30:37,939
to restart entire query.

691
00:30:37,940 --> 00:30:40,100
There's a failure, but they're not

692
00:30:40,100 --> 00:30:43,220
like check pointing blindly for every single step

693
00:30:43,220 --> 00:30:45,340
as you would do in map reduced.

694
00:30:49,500 --> 00:30:53,380
I can go for a long time, but problems with map reduced.

695
00:30:53,380 --> 00:30:54,580
We won't hold on to the time.

696
00:30:54,580 --> 00:30:57,180
So let's skip it.

697
00:30:57,180 --> 00:30:58,980
Basically, nobody runs map reduced now anyway.

698
00:30:58,980 --> 00:30:59,620
Nobody runs to do.

699
00:30:59,620 --> 00:31:00,820
That's all been deprecated.

700
00:31:00,820 --> 00:31:04,059
And even things like, oh, as I say, Hadoop,

701
00:31:04,059 --> 00:31:09,659
it was you write raw Java functions for our Java code

702
00:31:09,659 --> 00:31:11,980
to process data as if it was a query.

703
00:31:11,980 --> 00:31:13,419
People realized that was a bad idea.

704
00:31:13,419 --> 00:31:15,579
So then they put SQL on top of it with this thing called

705
00:31:15,579 --> 00:31:17,859
Hive, which is invented by Facebook.

706
00:31:17,859 --> 00:31:19,179
And then that's a terrible idea too,

707
00:31:19,179 --> 00:31:20,460
because you're basically converting SQL queries

708
00:31:20,460 --> 00:31:21,339
into map reduced jobs.

709
00:31:21,339 --> 00:31:23,579
So all the crappy problems you have of map reduced,

710
00:31:23,579 --> 00:31:26,379
like inefficient architecture, you inherit, even though now

711
00:31:26,379 --> 00:31:27,940
you're least writing in SQL.

712
00:31:27,940 --> 00:31:30,460
And then they realized that was a bad idea.

713
00:31:30,460 --> 00:31:32,539
So then there's things like presto or Treno, which

714
00:31:32,539 --> 00:31:36,139
are covered in a second that are more efficient replacements

715
00:31:36,139 --> 00:31:39,159
for running analytical queries on top of shared

716
00:31:39,159 --> 00:31:41,339
distortion.

717
00:31:41,339 --> 00:31:44,259
But this query check pointing to the default tolerance,

718
00:31:44,259 --> 00:31:46,259
that is one thing that came out of the map reduced world

719
00:31:46,259 --> 00:31:49,099
that has permeated throughout indistributed

720
00:31:49,099 --> 00:31:53,379
evidences and distribution of relational evidences.

721
00:31:53,379 --> 00:31:55,019
For query planning, again, it's all

722
00:31:55,019 --> 00:31:56,299
the stuff we talked about for.

723
00:31:56,299 --> 00:31:58,779
We still want to do projection pushdown, predicate pushdown.

724
00:31:58,779 --> 00:32:01,099
We still need to figure out the optimal join ordering.

725
00:32:01,099 --> 00:32:03,259
Again, all of that doesn't go away.

726
00:32:03,259 --> 00:32:05,659
But now what we need to do is consider, again,

727
00:32:05,659 --> 00:32:08,859
where data is actually physically located

728
00:32:08,859 --> 00:32:11,539
and also the network transfer calls.

729
00:32:11,539 --> 00:32:15,619
Because again, as equivalent to reading something from disk,

730
00:32:15,619 --> 00:32:18,779
I got to send things over the network.

731
00:32:18,779 --> 00:32:19,740
That doesn't come for free.

732
00:32:19,740 --> 00:32:21,859
There's a cost to that.

733
00:32:21,859 --> 00:32:25,459
And so there are some systems like DB2, for example,

734
00:32:25,459 --> 00:32:28,500
I know, when the dataism boots up,

735
00:32:28,500 --> 00:32:31,460
and it knows that it's in an attributed configuration,

736
00:32:31,460 --> 00:32:33,660
it actually runs a bunch of micro benchmarks,

737
00:32:33,660 --> 00:32:38,420
basically running like sending packets over the wire

738
00:32:38,420 --> 00:32:40,980
to the different nodes and measuring the latency.

739
00:32:40,980 --> 00:32:42,819
And then it uses those measurements

740
00:32:42,819 --> 00:32:46,700
to as values in its cost model decide how expensive

741
00:32:46,700 --> 00:32:48,700
is something versus reading from local from disk

742
00:32:48,700 --> 00:32:51,259
or reading from memory.

743
00:32:51,259 --> 00:32:54,700
So I would say that's the right way to do it.

744
00:32:54,700 --> 00:32:57,299
Most systems just have a hard-coded value to say,

745
00:32:57,299 --> 00:32:59,180
here's how much it costs to send a byte over the network,

746
00:32:59,180 --> 00:33:01,779
or a megabyte over the network.

747
00:33:01,779 --> 00:33:04,579
But of course, the network connections aren't always

748
00:33:04,579 --> 00:33:05,379
symmetrical.

749
00:33:05,379 --> 00:33:07,339
So doing some kind of micro benchmarking

750
00:33:07,339 --> 00:33:11,099
like DB2 does is the right way to go.

751
00:33:11,099 --> 00:33:12,379
All right, so the question is now, what

752
00:33:12,379 --> 00:33:14,139
are we actually going to send between the different nodes

753
00:33:14,139 --> 00:33:17,659
to tell them to do work on behalf of our distributed query?

754
00:33:17,659 --> 00:33:20,700
So the most common approach is to send physical operators.

755
00:33:20,700 --> 00:33:22,980
And this is basically, again, the same thing

756
00:33:22,980 --> 00:33:26,220
you would get in parallel execution on your single node

757
00:33:26,220 --> 00:33:27,460
database system.

758
00:33:27,460 --> 00:33:30,620
You would break up your query plan into plan fragments,

759
00:33:30,620 --> 00:33:33,220
and then you distributed them amongst the nodes.

760
00:33:33,220 --> 00:33:35,059
And you may annotate it with information

761
00:33:35,059 --> 00:33:38,660
about where the data is coming from and where it needs to go next.

762
00:33:38,660 --> 00:33:41,339
But what you're sending to the different nodes

763
00:33:41,339 --> 00:33:43,900
are these physical plans, because the physical operators,

764
00:33:43,900 --> 00:33:46,380
because the plans already been decided

765
00:33:46,380 --> 00:33:48,460
by some kind of centralized coordinator or centralized

766
00:33:48,460 --> 00:33:50,460
optimizer.

767
00:33:50,460 --> 00:33:54,539
And most systems are going to use this approach.

768
00:33:54,539 --> 00:33:59,019
An alternative is that you take the output of a query optimizer

769
00:33:59,019 --> 00:34:01,659
that's going to centralize coordinator.

770
00:34:01,659 --> 00:34:03,339
That's going to be physical operators.

771
00:34:03,339 --> 00:34:05,819
And then you break that up into the fragments

772
00:34:05,819 --> 00:34:07,460
that you want to send in different nodes.

773
00:34:07,460 --> 00:34:13,139
But then you reverse those physical operators back to SQL.

774
00:34:13,139 --> 00:34:16,460
And then you send SQL to the different nodes.

775
00:34:16,460 --> 00:34:19,059
And the idea here is that you've already

776
00:34:19,059 --> 00:34:22,380
done so this global optimization of figuring out

777
00:34:22,380 --> 00:34:24,460
what query plan fragments need to execute on what

778
00:34:24,460 --> 00:34:25,539
nodes.

779
00:34:25,539 --> 00:34:29,260
But then rather than deciding for that node,

780
00:34:29,260 --> 00:34:31,659
here's exactly the query plan I want you to run.

781
00:34:31,659 --> 00:34:36,340
You get them SQL, which they can then now parse and optimize

782
00:34:36,340 --> 00:34:39,740
locally, because they may make a better decision

783
00:34:39,740 --> 00:34:41,940
on the node that they're running on based on what they see

784
00:34:41,940 --> 00:34:43,539
and the data that they do have.

785
00:34:43,539 --> 00:34:46,019
The idea is, again, instead of having a global view,

786
00:34:46,019 --> 00:34:49,300
or trying to maintain a global view of how to optimize the system,

787
00:34:49,300 --> 00:34:52,460
you get far enough to say, OK, guys, here's the work I want you to do.

788
00:34:52,460 --> 00:34:55,740
But then they can each make their own local decision.

789
00:34:55,740 --> 00:34:56,420
So this is rare.

790
00:34:56,420 --> 00:34:58,500
Very few systems do this.

791
00:34:58,500 --> 00:35:00,699
Single store, I think they still do this.

792
00:35:00,699 --> 00:35:02,139
I don't think they would have changed.

793
00:35:02,139 --> 00:35:02,740
But they do this.

794
00:35:02,740 --> 00:35:07,099
And then VTES is a, it's not really an analytical database

795
00:35:07,099 --> 00:35:10,179
system, but it is a distributed system.

796
00:35:10,179 --> 00:35:13,980
It's a sort of sharding middleware for my SQL that

797
00:35:13,980 --> 00:35:16,059
was developed by YouTube.

798
00:35:16,059 --> 00:35:18,940
I say YouTube runs off my SQL.

799
00:35:18,940 --> 00:35:21,139
And because the nodes that they're talking to,

800
00:35:21,139 --> 00:35:26,259
or I'll just my SQL nodes, my SQL can't take in a physical plan.

801
00:35:26,259 --> 00:35:29,980
They got to convert it back to SQL and then send it to the nodes.

802
00:35:29,980 --> 00:35:33,980
And then that node can do all the parsing and optimizing locally.

803
00:35:33,980 --> 00:35:36,019
So the idea is like this.

804
00:35:36,019 --> 00:35:38,460
If you want to send SQL queries.

805
00:35:38,460 --> 00:35:40,379
So this is the join we have before.

806
00:35:40,379 --> 00:35:42,219
In our catalog, we keep track of, here's

807
00:35:42,219 --> 00:35:46,179
the range partition we have for our database, for our tables.

808
00:35:46,179 --> 00:35:51,219
So we take the original query.

809
00:35:51,219 --> 00:35:53,980
And then we figure out, OK, here's the data I need to access.

810
00:35:53,980 --> 00:35:59,099
And then I modify the query now to include the join clause for the data that's

811
00:35:59,099 --> 00:36:01,139
local to it.

812
00:36:01,139 --> 00:36:04,419
And then this node will get that query, run it through the same optimization

813
00:36:04,419 --> 00:36:07,819
path that I did before.

814
00:36:07,819 --> 00:36:12,179
And the idea here is, again, maybe the centralized view doesn't have the complete

815
00:36:12,179 --> 00:36:15,940
view or up-to-date view of what the SS6R in the database.

816
00:36:16,940 --> 00:36:19,099
Or at each node.

817
00:36:19,099 --> 00:36:22,019
And then the, again, there'll be some centralized coordinator that knows how to

818
00:36:22,019 --> 00:36:24,579
union results and put things back together at the end.

819
00:36:27,539 --> 00:36:31,539
I think it's a clever idea.

820
00:36:31,539 --> 00:36:35,379
Reversing from physical plan back to SQL is not trivial.

821
00:36:35,379 --> 00:36:38,219
And most of it don't do this.

822
00:36:38,219 --> 00:36:43,579
And when you think about it too in an O-lap system, oftentimes the data is not

823
00:36:43,579 --> 00:36:45,299
changing that often.

824
00:36:45,300 --> 00:36:46,740
There's ways to handle that.

825
00:36:46,740 --> 00:36:48,700
We'll be in cover later.

826
00:36:48,700 --> 00:36:54,940
So the idea that every node may have a better view of what the data looks like versus

827
00:36:54,940 --> 00:36:57,220
the global view, it doesn't always hold up.

828
00:36:57,220 --> 00:36:58,060
Yes.

829
00:36:58,060 --> 00:36:59,740
Why do you have to move the code to SQL?

830
00:36:59,740 --> 00:37:03,900
Why can't you send it to the plan and then the local node again?

831
00:37:03,900 --> 00:37:05,660
Do you rest the condition?

832
00:37:05,660 --> 00:37:06,460
Yeah, to his point.

833
00:37:06,460 --> 00:37:08,460
So why do you have to send SQL?

834
00:37:08,460 --> 00:37:11,940
Why couldn't you send, say, the physical plan or the logical plan?

835
00:37:11,940 --> 00:37:17,139
Then just had their query optimizer just optimize that.

836
00:37:17,139 --> 00:37:23,380
Because then you need to build a separate code now for the optimizer to take in that as input

837
00:37:23,380 --> 00:37:30,220
and inject all the internal metadata about the search process.

838
00:37:30,220 --> 00:37:33,260
It's weird.

839
00:37:33,260 --> 00:37:37,300
It's not now people usually write their optimizers.

840
00:37:37,300 --> 00:37:38,300
You should.

841
00:37:39,019 --> 00:37:43,539
Ideally, you want your optimizer to be able to stop, dump out its state, and then load

842
00:37:43,539 --> 00:37:44,539
it back in.

843
00:37:44,539 --> 00:37:46,860
Very few systems can do that.

844
00:37:46,860 --> 00:37:47,860
Right?

845
00:37:47,860 --> 00:37:53,100
Think of it like it's like rebooting the stack of a search tree.

846
00:37:53,100 --> 00:37:55,820
You have to suck all that out and then inject it back in.

847
00:37:55,820 --> 00:37:57,820
You can do it as an additional engineering.

848
00:37:57,820 --> 00:37:58,820
Great.

849
00:37:58,820 --> 00:38:00,820
All right.

850
00:38:00,820 --> 00:38:08,019
So now we got to talk about how we actually want to execute our joins.

851
00:38:08,019 --> 00:38:12,699
So again, as I said before, we're still going to be either doing hash join or software's

852
00:38:12,699 --> 00:38:13,699
join.

853
00:38:13,699 --> 00:38:17,539
Nestle loop join if you're really unlucky.

854
00:38:17,539 --> 00:38:24,780
But the trade-offs between those two approaches are still the same, even in a distributed environment.

855
00:38:24,780 --> 00:38:28,619
And as I said before, we could just try to put all our data that's called spread across

856
00:38:28,619 --> 00:38:34,099
different nodes onto a single node and then do the join there that it would work and

857
00:38:34,099 --> 00:38:38,860
wouldn't have any false negatives because we're guaranteed that the data, you know, we're

858
00:38:38,860 --> 00:38:41,139
trying to join will be located with each other.

859
00:38:41,139 --> 00:38:43,339
But obviously that's not realistic.

860
00:38:43,339 --> 00:38:44,339
All right.

861
00:38:44,339 --> 00:38:51,019
And you know, you're not unlikely that a single node can handle all your data.

862
00:38:51,019 --> 00:38:56,299
So the way we're going to do this is that to join two tables R and S, we need to get the

863
00:38:56,300 --> 00:39:03,100
ideas that get the data that we're trying to join from the two tables on the same node

864
00:39:03,100 --> 00:39:09,980
based on the join key regardless of how the data has been either replicated or partitioned.

865
00:39:09,980 --> 00:39:14,140
And so we're going to go through four scenarios going from like best to worst and we're going

866
00:39:14,140 --> 00:39:19,980
to see how the, you know, basically if the data isn't in the, isn't partitioned or placed

867
00:39:19,980 --> 00:39:25,580
in the way that that you need for the query, the data is going to have to move it around.

868
00:39:25,579 --> 00:39:29,539
And this is all transparent to you as the application developer, as the user writing the

869
00:39:29,539 --> 00:39:33,500
query, you don't know how the data is getting where it needs to go.

870
00:39:33,500 --> 00:39:37,059
But obviously if we're actually building a system, we need to care about these things.

871
00:39:37,059 --> 00:39:41,420
And the key thing we need to avoid is false negatives because we don't want to, you know,

872
00:39:41,420 --> 00:39:45,739
join like R and S looking, you know, where there is a join or it is two tables, it should

873
00:39:45,739 --> 00:39:47,980
match when I give them join key values.

874
00:39:47,980 --> 00:39:52,019
But because they're basically located on different nodes, you know, we're going to get incorrect

875
00:39:52,019 --> 00:39:53,019
results for this.

876
00:39:53,019 --> 00:39:54,019
Okay.

877
00:39:54,420 --> 00:39:57,059
So again, we're going to go through four scenarios.

878
00:39:57,059 --> 00:39:59,420
And I would say everything I'm going to talk about here is again, the same for whether

879
00:39:59,420 --> 00:40:00,900
it's shared disk or shared nothing.

880
00:40:00,900 --> 00:40:03,940
It doesn't, it doesn't matter.

881
00:40:03,940 --> 00:40:10,300
So that's case scenario is when one of the tables we want to join on is replicated at

882
00:40:10,300 --> 00:40:11,300
every node.

883
00:40:11,300 --> 00:40:13,259
Again, you can have this in your data system.

884
00:40:13,259 --> 00:40:17,019
You can have some tables to partitioned and some tables are replicated.

885
00:40:17,019 --> 00:40:20,579
Going back to that snowflake schema stuff before, those dimension tables are usually pretty

886
00:40:20,579 --> 00:40:22,219
small relative to the fact table.

887
00:40:22,219 --> 00:40:23,219
The fact tables may be huge.

888
00:40:23,219 --> 00:40:27,980
I think every item anyone, anyone's ever bought from Amazon, it has to be billions of

889
00:40:27,980 --> 00:40:29,779
not trains, right?

890
00:40:29,779 --> 00:40:32,819
But your dimension tables think of things like zip code.

891
00:40:32,819 --> 00:40:38,619
It's what 40,000 zip codes in the US post office changes them four times a year.

892
00:40:38,619 --> 00:40:43,539
So you can take that 40,000 table table and you can replicate that on every single node

893
00:40:43,539 --> 00:40:44,539
as a dimension table.

894
00:40:44,539 --> 00:40:49,419
So now when you're doing a join against your fact table, the data is just right there to

895
00:40:49,419 --> 00:40:52,179
do the join, right?

896
00:40:52,179 --> 00:40:55,980
So all you need to do now in this scenario here, again, so if I want to join R and S on

897
00:40:55,980 --> 00:40:58,419
ID, S is replicated everywhere.

898
00:40:58,419 --> 00:41:00,940
We partition R based on ID.

899
00:41:00,940 --> 00:41:06,980
So each node does its local join and then this node will send its result to this other node

900
00:41:06,980 --> 00:41:08,739
who then does you use the results.

901
00:41:08,739 --> 00:41:13,899
You don't actually need to look at the results, for this example here, because you know that

902
00:41:13,899 --> 00:41:19,500
it's non-overlapping partitions for R. So I just literally can catenate the byte buffers

903
00:41:19,500 --> 00:41:23,019
on top of each other and then send that back to the client.

904
00:41:23,019 --> 00:41:25,019
Right?

905
00:41:25,019 --> 00:41:28,980
So this is the best case scenario because I did no data transfer in order to compute the

906
00:41:28,980 --> 00:41:34,420
join and then obviously I have to send the result, but like depends on this activity or

907
00:41:34,420 --> 00:41:36,500
whatever whatever it is I'm trying to join on.

908
00:41:36,500 --> 00:41:42,940
And this is the bare minimum I need to send over to process this query.

909
00:41:42,940 --> 00:41:46,619
So if your tables aren't replicated, then it's basically the same thing.

910
00:41:46,619 --> 00:41:52,380
But if the two tables are partitioned on the same attributes as you're trying to join

911
00:41:52,380 --> 00:41:54,299
on.

912
00:41:54,299 --> 00:41:57,980
So in this case here, again, I want to join R and S on the ID field and then it just

913
00:41:57,980 --> 00:42:01,699
so happens that the range partitions for R and S in each partitions are exactly the

914
00:42:01,699 --> 00:42:03,380
same.

915
00:42:03,380 --> 00:42:09,219
So now again, I have each node process its local join in parallel and then this other node

916
00:42:09,219 --> 00:42:14,059
sends a result to the other guy, concatenate the results and send it back to the client.

917
00:42:14,059 --> 00:42:17,699
Right?

918
00:42:17,699 --> 00:42:22,659
So this is nice, but it doesn't always happen.

919
00:42:22,659 --> 00:42:28,460
It's not always the case that you're going to be exactly partitioned on the thing you want

920
00:42:28,460 --> 00:42:29,460
to join on.

921
00:42:29,460 --> 00:42:32,259
And we're not going to talk about how you actually pick the partitioning key, but that's a whole

922
00:42:32,259 --> 00:42:33,259
another problem.

923
00:42:33,259 --> 00:42:36,659
Like that's been shown to be NP hard.

924
00:42:36,659 --> 00:42:40,340
For an arbitrary set of queries and an arbitrary set of attributes you could partition on,

925
00:42:40,340 --> 00:42:44,100
you can run out the ideal partitioning scheme for your table.

926
00:42:44,100 --> 00:42:45,900
For your tables is non-trigger.

927
00:42:45,900 --> 00:42:52,220
And of course, like some cases maybe you get for 99% of the queries, you get this nice

928
00:42:52,220 --> 00:42:56,180
layout like this, but of course there's some query that shows up where it isn't joining

929
00:42:56,180 --> 00:42:58,380
on the partition key.

930
00:42:58,380 --> 00:43:00,820
So that's the third scenario.

931
00:43:00,820 --> 00:43:06,500
So in this case here, the R table is partitioned on ID, but now my S table is partitioned on

932
00:43:06,500 --> 00:43:08,780
value, some other attribute.

933
00:43:08,780 --> 00:43:10,380
Okay.

934
00:43:10,380 --> 00:43:16,700
And so if I just do the join on the local data here, again, I can add up false negatives because

935
00:43:16,700 --> 00:43:22,500
the thing, if there's some ID equals one, it may be on this other node here.

936
00:43:22,500 --> 00:43:23,500
I don't know that.

937
00:43:23,500 --> 00:43:24,500
Right?

938
00:43:24,500 --> 00:43:29,540
Because I partitioned it on a different key or different attribute.

939
00:43:29,540 --> 00:43:36,380
So when this occurs, you have to do what is called a broadcast where you have the, you're

940
00:43:36,380 --> 00:43:40,180
basically reorganizing the one of the tables.

941
00:43:40,180 --> 00:43:46,140
And so you're going to take all the values of S for some ID within some range and you can

942
00:43:46,140 --> 00:43:49,180
send it over to that partition.

943
00:43:49,180 --> 00:43:50,180
So I take it back.

944
00:43:50,180 --> 00:43:54,619
You're going to basically send whatever date you have here from S. You're going to send

945
00:43:54,619 --> 00:43:57,099
that to every other node that's involved in the join.

946
00:43:57,099 --> 00:44:02,220
So now basically S is going to be replicated just as it was in the first scenario at every

947
00:44:02,220 --> 00:44:03,220
single node.

948
00:44:03,619 --> 00:44:07,579
So again, the reason why it's called a broadcast is like, you're sending, hey guys, here's

949
00:44:07,579 --> 00:44:11,659
the values I have for this table and everyone gets a copy of it now.

950
00:44:11,659 --> 00:44:14,379
And again, you can do this if it's like a dimension table that's going to be much smaller

951
00:44:14,379 --> 00:44:18,099
than the fact table.

952
00:44:18,099 --> 00:44:21,459
So sometimes you'll see this in the literature or in like documentation, they'll call this

953
00:44:21,459 --> 00:44:23,419
a broadcast join.

954
00:44:23,419 --> 00:44:28,099
And it really just means that they're doing this step to send the data around.

955
00:44:28,099 --> 00:44:32,339
And they usually say it's a broadcast hash join, a broadcast sort of a join.

956
00:44:32,340 --> 00:44:33,820
It's just they had this extra step.

957
00:44:33,820 --> 00:44:34,820
Yes.

958
00:44:34,820 --> 00:44:37,780
If you're going to do this anyway, why not go back to scenario one?

959
00:44:37,780 --> 00:44:40,940
So actually, if you can do this anyway, why not go back to scenario one?

960
00:44:40,940 --> 00:44:46,539
I mean, this will put you into scenario one.

961
00:44:46,539 --> 00:44:51,140
It made me the case that there's that someone picked, I want a partition on value because

962
00:44:51,140 --> 00:44:54,860
I have most of my queries are going to want to do a join in value or do look up some values.

963
00:44:54,860 --> 00:44:56,860
It just happened for this one query.

964
00:44:56,860 --> 00:44:58,860
The data is not in the layout that I want.

965
00:44:58,860 --> 00:45:00,860
So I got to move things around.

966
00:45:01,380 --> 00:45:07,620
In other times, we'll talk about data lakes in the second or lake houses.

967
00:45:07,620 --> 00:45:13,380
In that world, you are just loading much of data files in and you're not doing any re-agordization

968
00:45:13,380 --> 00:45:15,140
to do any partitioning of that.

969
00:45:15,140 --> 00:45:19,780
So you basically have to look through the file and then say, okay, well, here's the data

970
00:45:19,780 --> 00:45:21,180
that I'm seeing.

971
00:45:21,180 --> 00:45:24,539
Do I want to partition it and send it around or do I want to broadcast it and send it

972
00:45:24,539 --> 00:45:25,539
around?

973
00:45:25,539 --> 00:45:26,539
Right?

974
00:45:26,539 --> 00:45:27,539
Yeah.

975
00:45:27,539 --> 00:45:30,820
I didn't really say this ahead of time.

976
00:45:30,820 --> 00:45:35,019
This is, we're talking about here so far, what we call it, sort of managed storage, whereas

977
00:45:35,019 --> 00:45:38,620
I, it's a letter like me calling in certain queries into the database and the data says,

978
00:45:38,620 --> 00:45:42,380
oh, I know what this data is, I know what table it says, and they can decide how to move

979
00:45:42,380 --> 00:45:43,380
things around.

980
00:45:43,380 --> 00:45:45,140
In the data lake world, you don't have full control.

981
00:45:45,140 --> 00:45:47,980
We'll cover that in a second.

982
00:45:47,980 --> 00:45:48,980
Yes.

983
00:45:48,980 --> 00:45:55,780
So, Professor, if there are 10 nodes, how many connections do you show to how many?

984
00:45:55,780 --> 00:45:56,780
Everyone.

985
00:45:56,780 --> 00:46:00,380
So his question is, if you have N nodes, is every other node sending N minus 1 nodes?

986
00:46:00,380 --> 00:46:01,380
Yes.

987
00:46:01,380 --> 00:46:04,380
You're broadcasting everything you have to everyone else.

988
00:46:04,380 --> 00:46:05,380
Yes.

989
00:46:05,380 --> 00:46:14,140
Why not just like, take a note and advocate every, every, every, every, in the path and then

990
00:46:14,140 --> 00:46:19,180
just get it to the heavy N node so that you don't need to do the n squared.

991
00:46:19,180 --> 00:46:26,860
Yes, David is, instead of doing the n squared broadcast, why not just have all the nodes pick

992
00:46:26,860 --> 00:46:30,460
this one guy, everyone sends S and then it sends it out.

993
00:46:30,460 --> 00:46:31,860
You can do that.

994
00:46:31,860 --> 00:46:32,860
Right?

995
00:46:32,860 --> 00:46:36,900
The big idea is though, we're basically replicating S after it wasn't replicating.

996
00:46:36,900 --> 00:46:38,140
That's the broadcast phase.

997
00:46:38,140 --> 00:46:43,140
How you actually do that depends on the presentation.

998
00:46:43,140 --> 00:46:49,340
There's mom's calling, probably.

999
00:46:49,340 --> 00:46:50,340
Anyway.

1000
00:46:50,340 --> 00:46:51,340
Okay.

1001
00:46:51,340 --> 00:46:52,340
And then we do, yes, sorry.

1002
00:46:52,340 --> 00:47:01,340
And then share nothing and, um, what happens if, when you combine like tables and each

1003
00:47:01,340 --> 00:47:05,140
of those nodes, like, run out, or start running out storage?

1004
00:47:05,140 --> 00:47:06,140
I'm sorry.

1005
00:47:06,140 --> 00:47:07,140
What?

1006
00:47:07,140 --> 00:47:08,140
And it's in a shared system.

1007
00:47:08,140 --> 00:47:09,140
I'm not sure nothing.

1008
00:47:09,140 --> 00:47:13,380
You can buy, like a bunch of stuff into a single node, but like, what do we need?

1009
00:47:13,380 --> 00:47:14,380
Stuff.

1010
00:47:14,380 --> 00:47:15,380
I mean, like, might S here?

1011
00:47:15,380 --> 00:47:16,380
Yes, sure.

1012
00:47:16,380 --> 00:47:17,980
You, you put a mine S and then you run out of memory?

1013
00:47:17,980 --> 00:47:18,980
Yeah.

1014
00:47:18,980 --> 00:47:19,980
Or, uh, storage.

1015
00:47:19,980 --> 00:47:20,980
Okay.

1016
00:47:20,980 --> 00:47:21,980
Okay.

1017
00:47:21,980 --> 00:47:22,980
So, say for a memory.

1018
00:47:22,980 --> 00:47:27,380
If you run out of memory, again, the A to B results, this is going to get staged in my

1019
00:47:27,380 --> 00:47:28,380
buffer pool.

1020
00:47:28,380 --> 00:47:29,980
It just gets written out the disk.

1021
00:47:29,980 --> 00:47:32,980
And then I pay that cost of swapping it back in, right?

1022
00:47:32,980 --> 00:47:33,980
Right.

1023
00:47:33,980 --> 00:47:37,579
That's, that's, uh, that's all the stuff we did before, right?

1024
00:47:37,579 --> 00:47:38,980
The other one is like, what about running out of disk?

1025
00:47:38,980 --> 00:47:39,980
Well, that's the same thing as a single node.

1026
00:47:39,980 --> 00:47:40,980
Right?

1027
00:47:40,980 --> 00:47:41,980
I run out of disk.

1028
00:47:41,980 --> 00:47:42,980
I crash.

1029
00:47:42,980 --> 00:47:43,980
Nothing you can do.

1030
00:47:43,980 --> 00:47:44,980
Right?

1031
00:47:44,980 --> 00:47:49,460
You can't, you can't, like, is there not a way to like sort of like hop around or like

1032
00:47:49,460 --> 00:47:55,460
have instead of art, like, the, um, art from one to 100, what sort of hop around the node

1033
00:47:55,460 --> 00:48:01,460
and try and join with them and sort of aggregate the, aggregate the, the result is in some

1034
00:48:01,460 --> 00:48:02,460
way.

1035
00:48:02,460 --> 00:48:07,460
You're, your statement is, could, is there a way or like, instead of sent like, uh, basically

1036
00:48:07,460 --> 00:48:10,699
saying, like, if I recognize that if I put everything on a single node here, I'll run

1037
00:48:10,699 --> 00:48:12,900
out of memory or run out of disk.

1038
00:48:12,900 --> 00:48:16,460
So let me try to just rebalance things on the fly.

1039
00:48:16,460 --> 00:48:23,460
Uh, no, like, so instead, like, uh, actually I didn't have a mind to do it in order to do any

1040
00:48:23,460 --> 00:48:24,460
of that.

1041
00:48:24,460 --> 00:48:25,460
Right.

1042
00:48:25,460 --> 00:48:26,460
We can come back to you.

1043
00:48:26,460 --> 00:48:27,460
Yes.

1044
00:48:27,460 --> 00:48:28,460
I think, like, it's kind of like some word of that.

1045
00:48:28,460 --> 00:48:34,460
And like, when you, if you pull like S or in R, both are too big for an individual node

1046
00:48:34,460 --> 00:48:35,460
disk, yes.

1047
00:48:35,460 --> 00:48:39,460
Is there a way to break S in R, often, such a way that you can perform it at the way across the

1048
00:48:39,460 --> 00:48:44,460
different nodes, but only loading a part of S in a part of our particular node?

1049
00:48:45,460 --> 00:48:46,460
Uh, yeah.

1050
00:48:46,460 --> 00:48:52,460
So could you, so the statement is, uh, if R and S are too big to, the, the partitions are

1051
00:48:52,460 --> 00:48:54,460
in S are too big to put on a single node.

1052
00:48:54,460 --> 00:48:57,460
Could you basically, like, I'm just like a streaming thing where you bring in some of it.

1053
00:48:57,460 --> 00:49:00,460
And that way you can do a portion of the join that you have so far.

1054
00:49:00,460 --> 00:49:05,460
So again, just think going back to our hash join example before I got to build the, the hash

1055
00:49:05,460 --> 00:49:07,460
table on the, the build side of the join.

1056
00:49:07,460 --> 00:49:09,460
So I need to build that first.

1057
00:49:10,460 --> 00:49:14,460
If that, if I, that one I can stream, right?

1058
00:49:14,460 --> 00:49:20,460
And then when I do my, uh, my probe, same thing, I can stream the data in and do that incrementally.

1059
00:49:20,460 --> 00:49:21,460
So yeah, you can do that.

1060
00:49:21,460 --> 00:49:26,460
So yeah, I'm showing this sort of a high level, like, okay, you're going to move data around.

1061
00:49:26,460 --> 00:49:31,460
Uh, it's not like you do this step and then you can do the join, although I'm showing that in, in PowerPoint.

1062
00:49:31,460 --> 00:49:37,460
But like, again, using hash join example, I could, I could build a hash table on, on, on R.

1063
00:49:37,460 --> 00:49:49,460
And then as, uh, as I'm getting the, the, the, the two of us from S are coming over the network, then I do the probe in, you know, and then, and then send out the mean,

1064
00:49:49,460 --> 00:49:50,460
in result somewhere.

1065
00:49:50,460 --> 00:49:52,460
And then I go back and get more as I bring things in.

1066
00:49:52,460 --> 00:49:53,460
Yes.

1067
00:49:54,460 --> 00:49:56,460
The same idea is on a single node system.

1068
00:49:56,460 --> 00:49:58,460
You do the same thing, right?

1069
00:49:58,460 --> 00:50:01,460
You wouldn't, going back to single node for a hash join.

1070
00:50:01,460 --> 00:50:08,460
I wouldn't, uh, on the, on the, on the probe side, I wouldn't bring everything into memory, all those systems do that.

1071
00:50:08,460 --> 00:50:10,460
Bring everything memory and then do the probe.

1072
00:50:10,460 --> 00:50:15,460
I can do it in, you know, you know, get next and get, get a batch of things.

1073
00:50:15,460 --> 00:50:18,460
Okay.

1074
00:50:18,460 --> 00:50:20,460
All right.

1075
00:50:20,460 --> 00:50:25,460
And then the worst case scenario is when the, those tables are not partitioned on the join key.

1076
00:50:25,460 --> 00:50:34,460
And so now in this case here, I got to reorganize and basically sending out a complete copy of the database, uh, across, across nodes.

1077
00:50:34,460 --> 00:50:40,460
Now in this case here, since we're not going to replicate the two tables, uh, we don't need to do the n, n squared broadcast.

1078
00:50:40,460 --> 00:50:42,460
We know where, where data needs to actually go.

1079
00:50:42,460 --> 00:50:48,460
It's basically like dumping the table out and then loading it back in, but with this time with a different partitioning key.

1080
00:50:48,460 --> 00:50:49,460
Right?

1081
00:50:49,460 --> 00:50:54,460
So R is partition or n as a partition of value, but I need IDs.

1082
00:50:54,460 --> 00:51:01,460
So I'm going to send all the data for some range of R ID over there, uh, same thing for, for R over here.

1083
00:51:01,460 --> 00:51:04,460
And then I can send over s for both of them.

1084
00:51:04,460 --> 00:51:07,460
And then now the data is in the form that I need, right?

1085
00:51:07,460 --> 00:51:13,460
Where I'm guarantee there's no false negatives because all, I do my join, it's all, all of me local for the IDs.

1086
00:51:13,460 --> 00:51:15,460
Everyone does their join locally.

1087
00:51:15,460 --> 00:51:18,460
And then we ship back the result and produce a minor answer.

1088
00:51:18,460 --> 00:51:19,460
Yes.

1089
00:51:19,460 --> 00:51:21,460
What's the key to your ask?

1090
00:51:21,460 --> 00:51:29,460
You're going to have your own library just move around one, you set up the table like broadcast points out of the data,

1091
00:51:29,460 --> 00:51:33,460
up over dust and then to your regular drawing, based on the IDs.

1092
00:51:33,460 --> 00:51:40,460
It's a question of why can't you broadcast one of the tables, uh, across all the desks and do the join on regular IDs?

1093
00:51:40,460 --> 00:51:50,460
Uh, what, you know, read ID and journal with a each and no notes and then you're going to merge all the defaults together.

1094
00:51:50,460 --> 00:51:58,460
But I still need to get the, like, I still need to get all the, the S values for giving ID over here.

1095
00:51:58,460 --> 00:52:07,460
So I, when I do my join, like, you know, I don't end up missing something that is over here because I didn't bring it over.

1096
00:52:07,460 --> 00:52:14,460
Well, okay, so if we just take as, uh, if we just broadcast and are as table, say S is 10 petabytes.

1097
00:52:14,460 --> 00:52:24,460
Well, both of them have been petabytes, but when I'm going to do any, like, but, but in this case here, I'm sending only a partition of the data to the other nodes.

1098
00:52:24,460 --> 00:52:25,460
Right?

1099
00:52:25,460 --> 00:52:30,460
I don't have to put, like, are you proposing to get S in its entirety replicated on every single node?

1100
00:52:30,460 --> 00:52:33,460
Right. I mean, we're good to have any sort of streaming to part of them.

1101
00:52:33,460 --> 00:52:34,460
Sure.

1102
00:52:35,460 --> 00:52:41,460
Like, my question is why do we need to re-organize?

1103
00:52:41,460 --> 00:53:01,460
So, so, in, if you, so it has this, this is actually, we would be more efficient at that because if you're broadcasting to everyone, then like, say, again, using S as an example, then I'm sending potentially IDs of, of values of S with the ID is never going to match anything here in R.

1104
00:53:01,460 --> 00:53:03,460
So why send that data?

1105
00:53:03,460 --> 00:53:15,460
Well, if we re-organize it, don't get out there, we do everything once to re-organize it and then do this, so it's sort of moving on to table 2.

1106
00:53:15,460 --> 00:53:18,460
Yeah, but like, I don't, I don't, you're moving the table 2.

1107
00:53:18,460 --> 00:53:19,460
No, you're,

1108
00:53:19,460 --> 00:53:26,460
Oh, I see. So each single node is going to stand there and turn on, which is corresponding on each of us.

1109
00:53:26,460 --> 00:53:27,460
Correct. Yes.

1110
00:53:27,460 --> 00:53:36,460
Because, because, yeah, because, and again, I can do this because it's SQL, I know what the join clause is, I know what my data looks like, I know, I know where it needs to go.

1111
00:53:36,460 --> 00:53:37,460
Yeah.

1112
00:53:37,460 --> 00:53:42,460
So just like in the shuffle join, I'm sorry, in the broadcast join, you'll see this sometimes called shuffle join.

1113
00:53:42,460 --> 00:53:48,460
And again, it's still doing hash join underneath the covers, typically, they'll say it's a shuffle hash join.

1114
00:53:48,460 --> 00:53:54,460
Often, sometimes, the way to say it's a shuffle join, but it's really a shuffle hash join, doing the structure step.

1115
00:53:54,460 --> 00:53:56,460
Right?

1116
00:53:56,460 --> 00:54:05,460
So, in this example here for this query, it's a select star, I mean, I'm getting, I want all the columns from R and all the columns of S.

1117
00:54:05,460 --> 00:54:06,460
So, yes.

1118
00:54:06,460 --> 00:54:11,460
This is how the opposite question is, like, why do you block columns in scenarios where you have to,

1119
00:54:11,460 --> 00:54:14,460
a question is, why do you broadcast versus a shuffle?

1120
00:54:14,460 --> 00:54:20,460
Because, depending on the size of, of the table, right?

1121
00:54:21,460 --> 00:54:26,460
So, in this example here, they're all select star queries, I need the columns of R and S.

1122
00:54:26,460 --> 00:54:30,460
So, therefore, I have to send all the data over.

1123
00:54:30,460 --> 00:54:33,460
You can do basically some kind of projection push down to say, okay, why?

1124
00:54:33,460 --> 00:54:37,460
I'm only going to send the actual columns I actually need.

1125
00:54:37,460 --> 00:54:41,460
And this technique is what is sometimes called a semi-join.

1126
00:54:41,460 --> 00:54:45,460
So, the SQL standard doesn't define what a semi-join.

1127
00:54:45,460 --> 00:54:47,460
Some systems actually have this in their syntax.

1128
00:54:47,460 --> 00:54:52,460
Like, explicit semi-join clause, like, inner join or outer join.

1129
00:54:52,460 --> 00:55:01,460
And the basic idea is here is that instead of sending over the actual, all the data from the columns that match during the table,

1130
00:55:01,460 --> 00:55:11,460
thinking like if it was on a single node, I'm just going to send over the, the bare minimum of the data I need to actually do the join.

1131
00:55:11,460 --> 00:55:18,460
Again, this is basically just like a projection push down, but in, for whatever reason, they explicitly call it a semi-join.

1132
00:55:18,460 --> 00:55:24,460
So, in this case here, I'm doing a, a join in R and S with before, but I only want RID.

1133
00:55:24,460 --> 00:55:29,460
And I, I only want to do matches where RID is not null.

1134
00:55:29,460 --> 00:55:37,460
So, now, again, if I'm split up across two, two nodes like this, instead of sending all of S over to R to do a join,

1135
00:55:37,460 --> 00:55:46,460
instead, I'll, like I said, R, instead of what I can do is to send, here's the, here's the IDs that could match, and you send them over to, to the two of them.

1136
00:55:46,460 --> 00:55:54,460
And this is equivalent to basically writing the query as, with a select one, basically saying, hey, for this given RID, something does match.

1137
00:55:54,460 --> 00:55:58,460
I'm not telling what, what the rest of the two players, I'm just saying like, something is here.

1138
00:55:58,460 --> 00:56:03,460
Again, just think of like, I'm, it's, it's, it's doing the join, but instead of getting back the result,

1139
00:56:03,460 --> 00:56:09,460
you're just getting back like a true false to say, here's, or, the set of IDs that did match.

1140
00:56:09,460 --> 00:56:16,460
And again, some systems will have explicit clauses for this.

1141
00:56:16,460 --> 00:56:19,460
Okay.

1142
00:56:19,460 --> 00:56:22,460
Yeah, right, so this is like, you send IDs, yeah, yeah, so, okay.

1143
00:56:22,460 --> 00:56:24,460
All right.

1144
00:56:24,460 --> 00:56:28,460
So, in the meantime, I want to talk about cloud systems.

1145
00:56:28,460 --> 00:56:35,460
And again, there's, there's a lot more, there's a lot more activity, at least in the marketplace for, analytical systems running on the cloud.

1146
00:56:35,460 --> 00:56:43,460
And part of the has to do with like chasing after all that, you know, the snowflake money, the snowflake IPO, and Databricks will be there pretty soon.

1147
00:56:43,460 --> 00:56:51,460
So, in, in the cloud systems, they're going to offer what is called database as a service or abbreviated DBA AS.

1148
00:56:52,460 --> 00:57:12,460
And the idea here is that they're going to provide you with a managed database system environment, meaning like, instead of you going allocating an EC2 instance, downloading my SQL, Postgres, whatever you want, and, and running that locally and you managing that entire, that whole VM, plus along with storage and backup and recovery and all that stuff.

1149
00:57:13,460 --> 00:57:22,460
Instead, they'll provide you with just a URL where you can connect your application to and interact with the database system.

1150
00:57:22,460 --> 00:57:33,460
So, you can't SSH into the box, because that's all hidden from you, but for most people who cares. And instead, they're going to manage everything for you, right.

1151
00:57:34,460 --> 00:57:47,460
And as we said before, a lot of the times that, with between share dicks and share nothing systems, all that gets, looks, underneath the covers, a lot of that looks, looks, looks, looks the same.

1152
00:57:47,460 --> 00:57:58,460
So, there's two ways of run basically our cloud database system. The first is what we call, again, whatever sort of said before, a managed database system where they basically took some off the shelf software, like Postgres, my SQL.

1153
00:57:58,460 --> 00:58:08,460
And instead of you running an EC2, they're going to run an EC2 for you. They'll have some management interface in front of it. They'll handle backups and snapshots and recovery and all that kind of stuff.

1154
00:58:08,460 --> 00:58:19,460
But for the most part, it's going to be exactly the same as you would download and run locally. And this means that the database system itself is not going to be aware that it's running in a cloud environment.

1155
00:58:19,460 --> 00:58:25,460
I mean, you're running in a, and a disaggregated architecture, like with share disk.

1156
00:58:25,460 --> 00:58:35,460
And this is what most vendors do less so in more recently, but most of the time when you see like, hey, here's like this hot open source project that has like, based on a startup.

1157
00:58:35,460 --> 00:58:45,460
And then you can download off GitHub and then soon after they have their cloud version of it, this is typically what they're doing. They're just taking it and they're going to run it, run it for you.

1158
00:58:45,460 --> 00:59:03,460
There's another category systems called cloud, what I'll call cloud native systems. And this is not a scientific term. This is sort of what people mean when you say cloud native database, where the data system has been built from the ground up or been modified significantly to be aware that it's running in a cloud environment specifically with share disk.

1159
00:59:03,460 --> 00:59:12,460
And it can take advantage of all the sort of flexibility and the scale booty and elasticity of a cloud native system or cloud based system.

1160
00:59:12,460 --> 00:59:24,460
So snowflake probably was the first in this space. Maybe now, BigQuery came with an internal project called Dremel that started like 2006.

1161
00:59:24,460 --> 00:59:33,460
Snowflake is 2012ish, 13, but snowflake is the one that really made this architecture popular.

1162
00:59:33,460 --> 00:59:41,460
And so if you have now a running in the cloud, one of the things you can do is support what's called a serverless database system.

1163
00:59:41,460 --> 00:59:47,460
So this seems like a weird thing to attach to a database system is to say like, because obviously you need servers to run it.

1164
00:59:47,460 --> 00:59:54,460
And so what they really mean is that you're not going to provision servers ahead of time for each customer for each tenant.

1165
00:59:54,460 --> 01:00:06,460
And that if it's ever the case where a tenant becomes idle, meaning they don't run any queries, you actually can turn off the compute nodes or the resources for the system.

1166
01:00:06,460 --> 01:00:17,460
And then when they come back later and run a query, you spin all that back up. So it's like you're turning machines off for them and not charging them for those compete resources.

1167
01:00:17,460 --> 01:00:21,460
But then the data system is always available.

1168
01:00:21,460 --> 01:00:26,460
So assuming we're like a shared everything system, we allocate some easy to node.

1169
01:00:26,460 --> 01:00:32,460
We have memory of a disk of CPU and say the application is running queries on it, that's just fine.

1170
01:00:32,460 --> 01:00:39,460
But then let's say the application goes away because someone falls asleep, they're not running any queries. Nothing's happening.

1171
01:00:39,460 --> 01:00:43,460
And in this environment, you pay for this node.

1172
01:00:43,460 --> 01:00:51,460
Because basically just like in bus tub, there's a while where this thing's spinning, waiting for incoming requests.

1173
01:00:51,460 --> 01:00:54,460
And so you don't know when the requests are going to come along because you always have to be waiting.

1174
01:00:54,460 --> 01:00:57,460
But now you're just burning idle cycles.

1175
01:00:57,460 --> 01:01:06,460
So in a service environment, again, assuming that it's shared disk, what you can do is you just run the queries like before, fetch things from the shared disk as needed.

1176
01:01:06,460 --> 01:01:15,460
But then when people go away, you flush out the contents of the buffer pool and the page table to storage.

1177
01:01:15,460 --> 01:01:22,460
Basically you take a snapshot of your page table that's in memory, you can check what page is there and any dirty pages.

1178
01:01:22,460 --> 01:01:27,460
You write all that out to storage. Then you go ahead and kill this thing.

1179
01:01:27,460 --> 01:01:31,460
The data is still there, right? Because it's still on shared disk, everything's fine.

1180
01:01:31,460 --> 01:01:38,460
And then when people, when the, and you're paying less for that. And then when the applications ever waste up, sends a query.

1181
01:01:38,460 --> 01:01:49,460
It's as if the system is booting up for the first time. But instead of having a no information on what was in the page table, you go fetch that information back in and you sort of bootstrap the system to say,

1182
01:01:49,460 --> 01:01:54,460
here's what the state of the system was before I shut down.

1183
01:01:55,460 --> 01:01:59,460
So in my example here, I'm showing like, we're killing the compute node entirely.

1184
01:01:59,460 --> 01:02:08,460
There are some systems where it's a multi-tenant setup where it's the same one sort of instance of the database system is supporting multiple customers.

1185
01:02:08,460 --> 01:02:16,460
So all you need to do now is look in the buffer pool and figure out for this customer that I know is idle, let me write out its results. But the thing is still running.

1186
01:02:16,460 --> 01:02:23,460
And so there's a bunch of databases that are now sort of in this support what are called serverless databases like this.

1187
01:02:23,460 --> 01:02:33,460
Amazon took Postgres and my sequel and rewrote it for this thing called Aurora. They have a serverless system. Fauna is a serverless database that has portions of Cassandra in it.

1188
01:02:33,460 --> 01:02:40,460
But everything, a lot of it's written scratch. Neon is probably the probably one or more famous ones for Postgres.

1189
01:02:40,460 --> 01:02:49,460
But they took Postgres, ripped out the bottom half, sent them to what Amazon did for Aurora, and then reconfigured it to be based on a shared disk architecture.

1190
01:02:49,460 --> 01:02:55,460
And PlanetScale and Cochroch have their own own things. PlanetScale is the commercial version of a test. The thing I said before it came out on YouTube.

1191
01:02:55,460 --> 01:03:00,460
It's the YouTube guys basically went and forked a company.

1192
01:03:00,460 --> 01:03:20,460
So the other thing we talked about mentioned before are these data lakes. This is sort of the modern buzzword now to describe basically people using an object store as a data warehouse instead of just having the server management proprietary storage as before.

1193
01:03:20,460 --> 01:03:36,460
So it's typically always going to be a shared disk architecture. But in a traditional data warehouse what happened is, and if I want to load any data into my data warehouse, I got to call create table that then updates the catalog.

1194
01:03:36,460 --> 01:03:42,460
And then I've been sort of much data, but that's all going to be going through this compute node that's controlled by the database system.

1195
01:03:42,460 --> 01:03:47,460
So it's going to know like here's the data that you're trying to start in this table. It's going to go into this location on storage.

1196
01:03:47,460 --> 01:03:53,460
It has to look at catalog and figure out where to write stuff. But and then any query can do the same thing.

1197
01:03:53,460 --> 01:04:02,460
But in a data lake architecture, the idea here is that I don't have the database system be the gatekeeper for all new data coming in.

1198
01:04:02,460 --> 01:04:08,460
Instead, I have this object store where any application can start writing a bunch of files in there.

1199
01:04:08,460 --> 01:04:17,460
I think I'm put in CSV files, JSON files, parquet, or which cover in a second, they just start throwing whatever data that they want into this object store.

1200
01:04:17,460 --> 01:04:27,460
I have to update some catalog somehow to keep track of it. And then now when a select query comes along on this node, we look in this catalog and figure out what was there.

1201
01:04:27,460 --> 01:04:35,460
And then we know how to go get the data that we actually need. Again, the idea here is we want to remove the gatekeeper that they've sent as being the gatekeeper and let anybody write stuff in here.

1202
01:04:35,460 --> 01:04:41,460
And then we'll go figure out what was actually in it when we run queries.

1203
01:04:41,460 --> 01:04:46,460
So this goes back to actually what it said in the beginning of this extract transform load versus track load transform.

1204
01:04:46,460 --> 01:04:55,460
This is that set up here where anybody can just take, you know, get data from what are fun and application and shove it into s3 as a bunch of files.

1205
01:04:55,460 --> 01:05:00,460
And then someone's also going to come along and clean things up and figure out how to make sense of it.

1206
01:05:00,460 --> 01:05:04,460
So there's a bunch of people in this space.

1207
01:05:04,460 --> 01:05:07,460
Databricks is probably at the forefront and he's some marketing talking about this.

1208
01:05:07,460 --> 01:05:16,460
And they have the term of this idea that it's, yes, there's an object store, but then you have this execution engine and this catalog of the structure on top of it.

1209
01:05:16,460 --> 01:05:22,460
They would call it the lake house, like a plan of the words of a data warehouse.

1210
01:05:22,460 --> 01:05:30,460
It's basically what I'm describing here. So the Databricks has this and everyone has their own own variation of it.

1211
01:05:30,460 --> 01:05:33,460
Redshift actually didn't start off being a cloud native system.

1212
01:05:33,460 --> 01:05:37,460
Like it was a fork of Park cell, which is a fork of Postgres.

1213
01:05:37,460 --> 01:05:39,460
It was very much a shared nothing system.

1214
01:05:39,460 --> 01:05:49,460
Over time, they rewritten a lot of it to be shared disk and look very similar to this architecture here.

1215
01:05:49,460 --> 01:05:56,460
So the last thing I'll talk about is we'll be a segue into what 721 will be about if you continue on with this stuff.

1216
01:05:56,460 --> 01:06:15,460
But one very interesting trend we've seen in databases in the last decade is that instead of having these giant monolithic database systems where everything is written by the same vendor or same group organization inside the system itself.

1217
01:06:15,460 --> 01:06:29,460
The last couple of years, people have been breaking off components of the system and have them being standalone services that you can then connect together in some way to build a larger database system, a data warehouse system.

1218
01:06:29,460 --> 01:06:34,460
Essentially, sort of like the lake house stuff that I'm talking about here.

1219
01:06:34,460 --> 01:06:48,460
And what's interesting about this is that a lot of times these components that people are building, they're not being built by a database system vendor, which traditionally how data system software has been written for decades.

1220
01:06:48,460 --> 01:07:00,460
Instead, you have these big tech companies, in some cases, even smaller startups where they have some need for some piece of a database system and they're not building it, open sourcing it, and other people pick up and start using it.

1221
01:07:00,460 --> 01:07:12,460
And even again, that company, who's building a piece of software, they don't make their money with that software, they make their money doing something else, trying to think of a good example.

1222
01:07:12,460 --> 01:07:24,460
So like Facebook has this open source execution engine, Facebook is not a database company, but they need the execution engine for their own internal needs, but then they open source it.

1223
01:07:24,460 --> 01:07:31,460
Actually, Facebook has put out a lot of its software in the last decade or so in the context of databases.

1224
01:07:31,460 --> 01:07:44,460
So we'll go through a bunch of examples. So like the idea here is that you can now build, if you want to build a new database system, you don't want to build everything from scratch anymore, or take Postgres or Clickhouse and fork that, and then try to modify that specifically.

1225
01:07:44,460 --> 01:07:49,460
You can take these different components and start putting them together.

1226
01:07:49,460 --> 01:08:04,460
And so what I mean by commoditization is that what made, like, Snowflake Unique 10 years ago, is not really significant anymore, because everyone has it.

1227
01:08:04,460 --> 01:08:16,460
Like everyone has a vectorized query engine these days, or everyone's going to be using a column store. The thing that matters the most now is like the user experience, the front end stuff, the query optimizer certainly.

1228
01:08:16,460 --> 01:08:24,460
So you can put these things together and make a system, but then like to differentiate yourself, you'd have to mostly focus on the front end stuff.

1229
01:08:24,460 --> 01:08:32,460
You're using ducty-b as an example. Ducty-b is an amazing piece of software, but the core ideas are well known and not new.

1230
01:08:32,460 --> 01:08:42,460
They put it in a great form factor that you can run anywhere and connect it to pandas and things like that. That's not the core database engine stuff. That's all the user experience stuff.

1231
01:08:43,460 --> 01:08:52,460
So catalogs we talked about, again, this is how we're going to keep track of what data is we have, where are files located on storage, what the schemas and so forth.

1232
01:08:52,460 --> 01:09:02,460
The probably the most famous sort of standalone catalog system, it's the thing called H catalog. They came out of Facebook, came out of the Hive project, the H stands for Hive or Hadoop.

1233
01:09:03,460 --> 01:09:10,460
I think the idea here is that I can write a bunch of files in S3 and then I update H catalog and say, hey, by the way, here's these files that I have and here's the schema.

1234
01:09:10,460 --> 01:09:16,460
And then maybe some basic statistical information about what's in them, because those files sometimes can record that.

1235
01:09:16,460 --> 01:09:19,460
And then certainly all the cloud vendors will sell you something as well.

1236
01:09:19,460 --> 01:09:28,460
Databricks has their thing called Unity. It's not an open source, but they all provide some mechanism to make sense of what data you have in your lake house.

1237
01:09:29,460 --> 01:09:33,460
Query optimizers we've talked about, again, this is the hardest part of building a database system.

1238
01:09:33,460 --> 01:09:45,460
And to no surprise, most people don't want to build it themselves. So instead there are at least two that I know about open source projects where like these are just meant to be standalone opt query optimization as a service.

1239
01:09:45,460 --> 01:09:48,460
CalSites, probably the most famous one.

1240
01:09:49,460 --> 01:09:58,460
That was a data system in the 2000s called LucidDB, I think it was European. They were a startup. They failed. The company failed.

1241
01:09:58,460 --> 01:10:05,460
And then for whatever reason, they pulled out the query app from them and they built and then had that be a standalone project that became an Apache project.

1242
01:10:05,460 --> 01:10:16,460
So the button, CalSite has the query optimizer, but it has the ability to ingest queries from a part of SQL statements from all the Postgres, my SQL, a bunch of different dialects.

1243
01:10:16,460 --> 01:10:27,460
And in Orca is another one of these optimizers of service that came out of Green Plum, which is bought by Pivotal, which is then I think has been bought by VMware, which has been bought by Broadcom.

1244
01:10:27,460 --> 01:10:38,460
I think, yeah, but this is open source. This is less common than CalSite. But Green Plum built this originally because they wouldn't have, there's the Green Plum, you know, data warehouse system they were building that's a fork of Postgres.

1245
01:10:39,460 --> 01:10:51,460
But then they had another system, I think, called Hawk with a queue that was like high was like SQL on top of a Hadoop. And so instead of having to build two separate query optimizers for the two different database systems, they put everything into one.

1246
01:10:51,460 --> 01:11:01,460
As far as I know, nobody uses Orca other than the Green Plum guys. But I think this, this is the one part of the systems I'm most interested in right now in terms of research.

1247
01:11:02,460 --> 01:11:11,460
The other cool thing is having the 10 years is that there are now these universal or open source file formats that we can use across different database systems.

1248
01:11:11,460 --> 01:11:24,460
So until maybe 10 years ago, most databases either had their own proprietary binary format, right, think of like, you know, on your bus top project, you know, when you write out a file, it rates out a dot db file.

1249
01:11:24,460 --> 01:11:35,460
Do we rename it to that bus hub yet or no? Still dot db, right? I'm assuming, you know, it doesn't matter. Like the bus have has this own proprietary format that only bus hub knows how to use, right.

1250
01:11:35,460 --> 01:11:51,460
Oracle, my SQL Postgres, they all have their own proprietary format. But if you want to start sharing data across different systems, again, thinking in the cloud, I have, you know, my front applications, writing some data, I want to put out to S3, and then I want to have something else consume that.

1251
01:11:51,460 --> 01:12:07,460
I can, I stored as all JSON or text field or CSVs, which would be very inefficient, but maybe if I have a file format, there's like a columnar binary encoding with compression that I could have the application write that out, then any, any data, any data, some I use can then read that.

1252
01:12:07,460 --> 01:12:16,460
So there's a bunch of these file formats that are making easier to access data, generating from one application and shared across other systems.

1253
01:12:16,460 --> 01:12:25,460
So the most famous one of these is parquet. This one came out of cladder and Twitter. The next most famous one is orc, or came out of Facebook.

1254
01:12:25,460 --> 01:12:42,460
These are again, they're basically the column stores that I've talked about before. But now they have a bunch of libraries written in whatever query language you, or whatever program language you want, Rust, C++, Java, Python, that you can then read and write these files in.

1255
01:12:42,460 --> 01:12:50,460
So again, I can have my application generate these files and then without having to talk to the database system and then they can then just have to parse them.

1256
01:12:50,460 --> 01:12:58,460
Carbon data is at a hallway. That's a fork of parquet. We did some experimentation on this and it doesn't work.

1257
01:12:58,460 --> 01:13:12,460
We said, I'm sure someone doesn't work. Apache iceberg is parquet files, but additional, keep track of additional metadata so you can do incremental updates and do schema changes where it's parquet files are like, you know, sort of right ones read many.

1258
01:13:12,460 --> 01:13:22,460
But this can keep track of this things for you. But this came out of Netflix. This is another good example. Netflix is not a database company. They're not making money selling you a data system, but they wrote iceberg and they open sourced it.

1259
01:13:22,460 --> 01:13:42,460
And a lot of people have picked up and started using it. HD5 is not very common in our world in data systems, but this is an array format that's common in high performance computing, scientific computing, so like all the satellite images of the telescope stuff that usually is written in HD5.

1260
01:13:42,460 --> 01:13:52,460
And then Apache Arrow is a in memory, a columnar format that allow you to do data exchange between applications running in memory.

1261
01:13:52,460 --> 01:14:02,460
So think of it like, like, like when duck DB when they read a file in and then you want to query it, get that data in your panas code.

1262
01:14:02,460 --> 01:14:14,460
Instead of having a per day format, they put it in the Apache Arrow format. Now, pen is going to just read that memory directly without having to write the disc or write your own disk format and parsing it and bringing it back in. Yes.

1263
01:14:14,460 --> 01:14:23,460
Why are they all Apache? What is Apache? Oh, it's question is what is it? Why are they all called Apache?

1264
01:14:23,460 --> 01:14:34,460
So there are the Apache Computing Foundation is this nonprofit open source computer open source software foundation initiative.

1265
01:14:34,460 --> 01:14:44,460
Think of like if I want to have like an independent person control, the, there's the Apache license that came with the, there's also the Apache Computing Foundation.

1266
01:14:44,460 --> 01:14:53,460
It's even more confusing because also there's Apache web server. We'll get that all the same organization, but it's basically there's, there's Apache's one of them.

1267
01:14:53,460 --> 01:15:04,460
There's also like the Linux Computing Foundation. There's a cloud computing foundation. They're basically these nonprofit consortiums that the light you have like a governance, but a governing body for the, for open source software.

1268
01:15:04,460 --> 01:15:12,460
So even though like Netflix wrote iceberg, people may want to say, I want to use the software, but I don't want Netflix to be in charge of it.

1269
01:15:12,460 --> 01:15:18,460
Right? Because then like think of like Netflix, Netflix is competitor wants to start using the software and Netflix starts getting weird about it, right?

1270
01:15:18,460 --> 01:15:27,460
So you bite by, by you donate the software to this consortium, the foundation, and then they have controlled it.

1271
01:15:27,460 --> 01:15:30,460
So that's why you see Apache in front of things. Yes.

1272
01:15:30,460 --> 01:15:39,460
In a similar vein, why does Apache continue to maintain five of them instead of saying, all right, four of the sucks. Everybody who's used like to do something right now.

1273
01:15:39,460 --> 01:15:52,460
This question is why does Apache continue maintain five of these instead of just picking one winner? Because that's not the model of Apache. It's not, it's not a company where like somebody above is making decisions about what's going to succeed or not.

1274
01:15:52,460 --> 01:16:12,460
There's, there's criteria you have to have about getting your software to be part of Apache foundation. But then, then you have to elect like leaders to like be like, you know, who controls the commits and testing and how you vote for things and keep, you know, there's a bunch of like bureaucracy stuff that they provide, but they don't choose who, who can win or not.

1275
01:16:12,460 --> 01:16:24,460
Things get deprecated, certainly things like you can become like a top ranked or top top level project in Apache. But then if nobody uses it, then it gets relegated.

1276
01:16:24,460 --> 01:16:35,460
Actually, Gignesh, I was betting that this isn't what's consequent quick step and it was it was an incubation process for Apache, but then it didn't go anywhere and then I got, I got killed off.

1277
01:16:35,460 --> 01:16:37,460
Yes.

1278
01:16:37,460 --> 01:16:46,460
So, what's someone made, you know, which is our open source, but they don't put out this around the system that they put the under what's going to be able to use?

1279
01:16:46,460 --> 01:16:57,460
Yes, question is, statement is good question is if someone makes an almost first file format, but then there's no software to access it. What's the use of it?

1280
01:16:57,460 --> 01:17:08,460
It's useless. You're okay, it's right. And so, like, for parquet, for example, for an orc, like there is, there is an identity system that is the parquet database system.

1281
01:17:08,460 --> 01:17:16,460
Instead, they provide you low level libraries like in Rust to then parse the data and do some basic manipulation of it.

1282
01:17:16,460 --> 01:17:24,460
Right? And then you build a larger system around it, potentially using the components that I talked about before. Right?

1283
01:17:24,460 --> 01:17:26,460
Yes.

1284
01:17:26,460 --> 01:17:32,460
What is sensitive to example components and then they've often developed independently about thinking about the other things that you've been doing?

1285
01:17:32,460 --> 01:17:34,460
Yes.

1286
01:17:34,460 --> 01:17:42,460
Yes. Yes. The question is, how hard is it to cobble these components together if they were all implemented independently? How would you actually put them together?

1287
01:17:42,460 --> 01:17:54,460
So there's like the one, this one we'll cover in 721, but Apache Arrow helps a lot of this because now I can send data between the services and a universal format.

1288
01:17:54,460 --> 01:18:06,460
But there's a much other semantics about what things should look like or what, you know, what does it mean to be a query or what equipment looks like that may be different from one of these components versus another.

1289
01:18:06,460 --> 01:18:14,460
I would say that it's no different than having different abstraction layers in your data system that I've talked about before.

1290
01:18:14,460 --> 01:18:18,460
It's just now that it may be the case that you don't have full control over this one component.

1291
01:18:18,460 --> 01:18:29,460
If you want to not do a hard fork of parquet, even though parquet does some things that you think are wrong, you just have to live with it.

1292
01:18:29,460 --> 01:18:39,460
Actually, a good example was a few years ago we had the founders of Blazing Sequel. They can't give a talk and they had their own proprietary storage format.

1293
01:18:39,460 --> 01:18:48,460
But because everyone, they're running a data system on GPUs, but everyone was coming to them saying, I have my data in, it's going to be an Arrow format.

1294
01:18:48,460 --> 01:18:53,460
They then had to drop the Render Partial format and switch to Arrow even though they felt theirs was better.

1295
01:18:53,460 --> 01:18:56,460
So like, you have to make sacrifices.

1296
01:18:56,460 --> 01:18:58,460
Yes.

1297
01:18:58,460 --> 01:19:09,460
So, for example, let's say for main storage, you want to do parquet, but for large intermediaries, you want to store stuff like Arrow, you want to do better for anything.

1298
01:19:09,460 --> 01:19:11,460
Is that doable?

1299
01:19:11,460 --> 01:19:13,460
Yeah, people are always on it. Absolutely.

1300
01:19:13,460 --> 01:19:21,460
I mean, ductivity does this. Databricks does this. Databricks will, it'll read any of these file formats, but then when they bring it into memory, they put it into their own format.

1301
01:19:22,460 --> 01:19:28,460
And then, you know, when it spits out the results to you, then they'll put it back in parquet or whatever.

1302
01:19:28,460 --> 01:19:37,460
Yeah, we have paper off the cut this. We have a paper that came out of the ODE basically shows, like parquet and orc were designed 10 years ago.

1303
01:19:37,460 --> 01:19:44,460
And, you know, the hardware has changed significantly. The bunch of design stations that they make is a bad idea. Let's finish up.

1304
01:19:45,460 --> 01:19:52,460
Extrude changes, again, thing of like the things you had to build a bus tub, there's now libraries that you can download and use.

1305
01:19:52,460 --> 01:20:00,460
Velox is from Facebook, Data Fusion, I think is from the Apache Error Guys and Inflex TV. And then this Intel thing, OAP, I don't think anybody uses this.

1306
01:20:00,460 --> 01:20:08,460
These are going to be the two bigger ones. And then this is what we're going to play with in, in 721.

1307
01:20:09,460 --> 01:20:20,460
All right, so the main takeaway from all of this, the cloud is definitely made to show you the basis for OLAF systems, way more common than they used to be.

1308
01:20:20,460 --> 01:20:34,460
And I think the buy product is just having online applications, the internet, you get more data very quickly. It doesn't take that much work anyway, any more to like write an application that can take, also take a lot of users and start scaling up and getting a lot of new data.

1309
01:20:35,460 --> 01:20:47,460
And so there's a lot of vendors in this space, a lot of VC money, someone's dying down, focusing on vector databases, but there's still a lot of problems to be solved in this space.

1310
01:20:47,460 --> 01:20:55,460
All right, so again, next class will be the single store speaker, that will be on Zoom, as they post on Piazza, just go to that Zoom link.

1311
01:20:55,460 --> 01:21:00,460
And then if you want, we can come watch it in my office and we run that space, we can spill to the database lab.

1312
01:21:01,460 --> 01:21:03,460
Any questions? Yes.

1313
01:21:03,460 --> 01:21:07,460
No, no, sit in your house in your bathtub, whatever you want to do.

1314
01:21:07,460 --> 01:21:08,460
Okay. Yes.

1315
01:21:08,460 --> 01:21:14,460
With all these open source components, is there like a consortium like I do believe standards or something to agree on these.

1316
01:21:14,460 --> 01:21:23,460
This question is, is there a, is there a, like an actually standard to specify what though, sorry.

1317
01:21:23,460 --> 01:21:34,460
You have, you want to say your output format to be appropriate for taking, like if you take for example, like, see if you architect your for something, you have these companies.

1318
01:21:34,460 --> 01:21:46,460
I think for the things that are outside the system, like that go outside the internal, you know, the internals of the system, it's going to be typically arrow.

1319
01:21:47,460 --> 01:21:52,460
Right. That's the, that's the language of Franco for communicating exchanging data between different services.

1320
01:21:52,460 --> 01:21:58,460
But I was saying, that's just like, for the encoding, there's the semantics about what's actually in there that could change.

1321
01:21:58,460 --> 01:22:01,460
Okay. All right. Hit it.

1322
01:22:16,460 --> 01:22:18,460
Yeah. Yeah.

1323
01:22:46,460 --> 01:22:48,460
Yeah.

