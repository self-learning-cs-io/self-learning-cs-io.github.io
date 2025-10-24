---
title: CMU15721 P22S202422 AmazonRedshiftDataWarehouseSystemCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Carnegie Mellon University's Advanced Database Systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:13,000 --> 00:00:15,000
This is the last lecture of the semester.

4
00:00:15,000 --> 00:00:18,000
We're going to cover Amazon Redshift.

5
00:00:18,000 --> 00:00:21,000
So the challenge to this lecture is like,

6
00:00:21,000 --> 00:00:24,000
I'm not repeating myself because it's a lot of these things

7
00:00:24,000 --> 00:00:27,000
or the systems are doing the same thing over and over again.

8
00:00:27,000 --> 00:00:30,000
I'll talk a little bit about some of the pieces

9
00:00:30,000 --> 00:00:33,000
that make Redshift unique, except for even the others.

10
00:00:33,000 --> 00:00:36,000
I mean, the paper is a good paper in terms of like,

11
00:00:36,000 --> 00:00:39,000
it covers a lot of stuff but doesn't cover a lot of stuff in detail.

12
00:00:39,000 --> 00:00:40,000
How they do it.

13
00:00:40,000 --> 00:00:42,000
It's like, we do this, this, this, and this.

14
00:00:42,000 --> 00:00:45,000
So I can talk a little bit about what we know from them.

15
00:00:45,000 --> 00:00:47,000
Before we get to that, the,

16
00:00:49,000 --> 00:00:51,000
let's end it again, finish things up.

17
00:00:51,000 --> 00:00:54,000
Again, the final presentations are going to be next Thursday

18
00:00:54,000 --> 00:00:56,000
in this room, 9 a.m.

19
00:00:56,000 --> 00:00:58,000
Again, I haven't checked what the vote call is,

20
00:00:58,000 --> 00:01:01,000
but go vote whether you want, what do you want for breakfast.

21
00:01:01,000 --> 00:01:04,000
And so for this one again, on the webpage,

22
00:01:04,000 --> 00:01:07,000
it'll say you need to email me your slides,

23
00:01:07,000 --> 00:01:09,000
the final right up for the project,

24
00:01:09,000 --> 00:01:12,000
and then this little JSON file we ask you to fill out.

25
00:01:12,000 --> 00:01:14,000
What, yeah, we'll get that.

26
00:01:14,000 --> 00:01:17,000
Well, the little JSON file, like,

27
00:01:17,000 --> 00:01:21,000
your name is and your project GitHub URL and everything.

28
00:01:21,000 --> 00:01:23,000
And then we use that to generate the showcase webpage

29
00:01:23,000 --> 00:01:25,000
that we then put on the website.

30
00:01:25,000 --> 00:01:30,000
And then again, I've had, I've had people, you know,

31
00:01:30,000 --> 00:01:33,000
former students, like they apply for a job,

32
00:01:33,000 --> 00:01:36,000
and they had a database company, and they contacted me,

33
00:01:36,000 --> 00:01:38,000
and they want to know what you guys did when you're in this class,

34
00:01:38,000 --> 00:01:41,000
and we had the showcase page, we can show them.

35
00:01:41,000 --> 00:01:43,000
And also too, for people like, you know,

36
00:01:43,000 --> 00:01:45,000
if you're an international student,

37
00:01:45,000 --> 00:01:47,000
you need to get what H1B stuff or whatever,

38
00:01:47,000 --> 00:01:50,000
a visa you want to get later on.

39
00:01:50,000 --> 00:01:52,000
Your lawyers will reach out to me,

40
00:01:52,000 --> 00:01:55,000
ask me the right of letters, say what you did in my class,

41
00:01:55,000 --> 00:01:57,000
what the skills you learned, and again, the showcase page,

42
00:01:57,000 --> 00:02:00,000
helps me remember what you guys have done.

43
00:02:00,000 --> 00:02:03,000
All right, so that again, so all that's going to be do

44
00:02:03,000 --> 00:02:05,000
Thursday morning at 9 a.m.

45
00:02:05,000 --> 00:02:09,000
The final exam was going to be do it at the same time,

46
00:02:09,000 --> 00:02:12,000
and I realized, and I forgot that I tried to do that last year,

47
00:02:12,000 --> 00:02:13,000
and it was a bad idea.

48
00:02:13,000 --> 00:02:18,000
So we bumped it now to be Saturday, May 4th at basically midnight.

49
00:02:18,000 --> 00:02:19,000
Thank you.

50
00:02:19,000 --> 00:02:20,000
Yeah, sure, yeah, yeah.

51
00:02:20,000 --> 00:02:23,000
Now I should have not done it.

52
00:02:23,000 --> 00:02:26,000
I should have remembered that I tried to this last year

53
00:02:26,000 --> 00:02:27,000
in the state.

54
00:02:27,000 --> 00:02:31,000
Yeah, so again, the prompt is on Piazza.

55
00:02:31,000 --> 00:02:35,000
It's basically saying you have to retrofit a new system,

56
00:02:35,000 --> 00:02:37,000
retrofit an existing system,

57
00:02:37,000 --> 00:02:41,000
and here's a menu of optimizations that you could potentially do,

58
00:02:41,000 --> 00:02:44,000
based on the things that we talked about throughout the entire semester,

59
00:02:44,000 --> 00:02:47,000
and you got to pick three.

60
00:02:47,000 --> 00:02:50,000
And you got to justify why you want to pick those three over others,

61
00:02:50,000 --> 00:02:53,000
including with citations and other information that we've discussed

62
00:02:53,000 --> 00:02:54,000
throughout the entire semester.

63
00:02:54,000 --> 00:02:55,000
Okay?

64
00:02:55,000 --> 00:02:57,000
So what is this?

65
00:02:57,000 --> 00:02:58,000
Again, this is grad school.

66
00:02:58,000 --> 00:02:59,000
This is CMU.

67
00:02:59,000 --> 00:03:02,000
So there are...

68
00:03:02,000 --> 00:03:03,000
How does this?

69
00:03:03,000 --> 00:03:05,000
I don't say there isn't a wrong answer.

70
00:03:05,000 --> 00:03:08,000
There clearly are wrong answers.

71
00:03:08,000 --> 00:03:11,000
But like, you know, if you're debating...

72
00:03:11,000 --> 00:03:14,000
It's forcing you to think about, okay, if I can only pick three,

73
00:03:14,000 --> 00:03:20,000
what is going to be the biggest bang for the buck in terms of getting the best performance?

74
00:03:20,000 --> 00:03:24,000
And you have to also think about, okay, if I choose one optimization,

75
00:03:24,000 --> 00:03:28,000
does that mean, you know, it doesn't actually do anything unless I choose the sub-attonization,

76
00:03:28,000 --> 00:03:31,000
therefore I get to choose two together, and that takes away your choices.

77
00:03:31,000 --> 00:03:32,000
Yes.

78
00:03:32,000 --> 00:03:35,000
Is there something with specificity of the software that is just like...

79
00:03:35,000 --> 00:03:36,000
Just performance.

80
00:03:36,000 --> 00:03:37,000
Yes.

81
00:03:37,000 --> 00:03:40,000
And you get a newer engineer in calls.

82
00:03:40,000 --> 00:03:41,000
Right?

83
00:03:41,000 --> 00:03:42,000
And again, that's relative.

84
00:03:42,000 --> 00:03:44,000
Like, you know, if you don't have any experience with CIMB,

85
00:03:44,000 --> 00:03:46,000
oh, that would be very hard.

86
00:03:46,000 --> 00:03:47,000
First is like...

87
00:03:47,000 --> 00:03:48,000
You're an e-coriotrangerizer.

88
00:03:48,000 --> 00:03:52,000
Which is hard for everyone, actually.

89
00:03:52,000 --> 00:03:55,000
Yeah, so again, so...

90
00:03:55,000 --> 00:03:59,000
You know, we post on Piazza if you have questions or what additional clarifications.

91
00:03:59,000 --> 00:04:01,000
And then also, I haven't posted this yet.

92
00:04:01,000 --> 00:04:03,000
We'll post the URL for the Google form.

93
00:04:03,000 --> 00:04:06,000
You can fill out and say whether you use ChatGbT or not.

94
00:04:06,000 --> 00:04:07,000
What does that mean?

95
00:04:07,000 --> 00:04:09,000
You use ChatGbT on like...

96
00:04:09,000 --> 00:04:14,000
If you want to copy the question into ChatGbT and say,

97
00:04:14,000 --> 00:04:18,000
write me a 4-page essay with citations, go for it.

98
00:04:18,000 --> 00:04:19,000
What would it like partially use?

99
00:04:19,000 --> 00:04:20,000
That's fine.

100
00:04:20,000 --> 00:04:22,000
That's an option when you say...

101
00:04:22,000 --> 00:04:26,000
Oh, did I use ChatGbT or not, and then to what degree you did?

102
00:04:26,000 --> 00:04:28,000
Does it have to be 4 pages that are...

103
00:04:28,000 --> 00:04:29,000
At most 4 pages.

104
00:04:29,000 --> 00:04:30,000
At most 4 pages.

105
00:04:30,000 --> 00:04:32,000
At most 4 pages.

106
00:04:32,000 --> 00:04:35,000
And again, the justification is key because...

107
00:04:35,000 --> 00:04:37,000
Because Andy said it was a good idea, right?

108
00:04:37,000 --> 00:04:40,000
And then we'll read the basic things that we discussed.

109
00:04:40,000 --> 00:04:41,000
Okay.

110
00:04:41,000 --> 00:04:43,000
All right.

111
00:04:43,000 --> 00:04:46,000
And then I can't spell course.

112
00:04:46,000 --> 00:04:47,000
Right.

113
00:04:47,000 --> 00:04:48,000
Course evaluation.

114
00:04:48,000 --> 00:04:51,000
I think we'll send up the reminder emails for everyone.

115
00:04:51,000 --> 00:04:52,000
Okay.

116
00:04:52,000 --> 00:04:54,000
All right.

117
00:04:54,000 --> 00:04:58,000
So last class, we talked about yellow brick.

118
00:04:58,000 --> 00:05:01,000
And as I said, it's not a well-known system.

119
00:05:01,000 --> 00:05:04,000
But to me, it's very fascinating because like...

120
00:05:04,000 --> 00:05:08,000
If you just have really hardcore systems engineers on your team,

121
00:05:08,000 --> 00:05:11,000
you know, the sky's the limit of what you can do.

122
00:05:11,000 --> 00:05:14,000
And the big thing, as I said, like they're doing all this...

123
00:05:14,000 --> 00:05:21,000
Trying to avoid the OS as much as possible because it's always going to interfere with what the database system wants to do when it...

124
00:05:21,000 --> 00:05:24,000
When it actually queries in terms of getting better performance and having the most control.

125
00:05:24,000 --> 00:05:28,000
So they basically went around it entirely.

126
00:05:28,000 --> 00:05:31,000
It's not a true unicernal where like the...

127
00:05:31,000 --> 00:05:35,000
The kernel is running nothing but the database system.

128
00:05:35,000 --> 00:05:39,000
The Germans are actually working on a project on related to this.

129
00:05:39,000 --> 00:05:41,000
But it's about the closest you can get.

130
00:05:41,000 --> 00:05:42,000
The system boots up.

131
00:05:42,000 --> 00:05:43,000
They make tensis calls.

132
00:05:43,000 --> 00:05:45,000
Get everything into user space.

133
00:05:45,000 --> 00:05:48,000
And then let the OS only handle like logging stuff.

134
00:05:48,000 --> 00:05:49,000
Or the basic things.

135
00:05:49,000 --> 00:05:50,000
Right.

136
00:05:50,000 --> 00:05:52,000
Again, so that's super awesome.

137
00:05:52,000 --> 00:05:53,000
I find it super interesting.

138
00:05:53,000 --> 00:06:00,000
I don't know how much the other, you know, systems we talked about this semester are doing the similar kind of things.

139
00:06:00,000 --> 00:06:07,000
I don't know if anybody is writing through a device driver, so the way they did them.

140
00:06:07,000 --> 00:06:08,000
All right.

141
00:06:08,000 --> 00:06:11,000
So talking about now Redshift from Amazon.

142
00:06:11,000 --> 00:06:23,000
So the background you can understand is that there is a long history of people of companies and open source projects trying to make distributed versions of Postgres.

143
00:06:23,000 --> 00:06:26,000
Again, Postgres came out in the 1980s at a Berkeley.

144
00:06:26,000 --> 00:06:29,000
It was traditionally a single node system.

145
00:06:29,000 --> 00:06:38,000
In the 1990s, there was a commercial version of Postgres called Alastra, which is a completely separate codebase as far as I know.

146
00:06:38,000 --> 00:06:42,000
And the original academic version of Postgres didn't support SQL as supported Quail.

147
00:06:42,000 --> 00:06:48,000
And then some Berkeley grad students took the old academic version of Postgres, add a SQL to support to it.

148
00:06:48,000 --> 00:06:52,000
That's why it's called Postgres QL as the official name.

149
00:06:52,000 --> 00:06:58,000
And then as the 2000s came along, people were looking, you know, try to make it distributed.

150
00:06:58,000 --> 00:07:06,000
And so there's a lot of attempts to do this. And the old to be aside of things, there's Postgres XE, StormDB, which was based on Postgres XE.

151
00:07:06,000 --> 00:07:10,000
But then they went under or they got bought by Translattis and Translattis had their own thing.

152
00:07:10,000 --> 00:07:13,000
Postgres XL was maybe the one that, what people are most excited about.

153
00:07:13,000 --> 00:07:18,000
And that hasn't been updated on anything since 2015, 2016 or something.

154
00:07:18,000 --> 00:07:20,000
All right. So that project basically has died out.

155
00:07:20,000 --> 00:07:25,000
Now there's systems like YugoBite, for example, that took the front end of Postgres,

156
00:07:25,000 --> 00:07:28,000
and then ripped out the bottom half and made that distributed.

157
00:07:28,000 --> 00:07:32,000
That's not exactly the same. If you were trying to do this, you know, natively inside of Postgres.

158
00:07:32,000 --> 00:07:36,000
And then there's a lot of systems that were doing this for O-Lap as well.

159
00:07:36,000 --> 00:07:38,000
Again, the mid 2000s went this sort of so-called.

160
00:07:38,000 --> 00:07:43,000
And this is when the first sort of batch of O-Lap systems came into place, or came onto the market.

161
00:07:43,000 --> 00:07:48,000
Green plumb we talked about. Scytis was based on extensions inside of Postgres.

162
00:07:48,000 --> 00:07:53,000
That got bought by Microsoft. And Vertica we talked about from Stormbriker and others.

163
00:07:54,000 --> 00:07:57,000
And then Paracsel is another one that was trying to do this.

164
00:07:57,000 --> 00:08:03,000
So the Paracsel one is interesting for us because this is what Redshift is based on.

165
00:08:03,000 --> 00:08:10,000
And they're completely up front about this. This is the original history or this is the lineage of what started Paracsel.

166
00:08:10,000 --> 00:08:17,000
And the sort of the backstory, the rumor is at least that in 2010 with sort of AWS,

167
00:08:17,000 --> 00:08:29,000
the cloud offering services taking off, they were looking at adding a data warehouse service that they could include in Amazon Web Services and sell it as a product.

168
00:08:29,000 --> 00:08:34,000
And then they had this big internal debate whether they should just write a system from scratch,

169
00:08:34,000 --> 00:08:40,000
or should they buy something off the shelf and use one of those.

170
00:08:40,000 --> 00:08:47,000
The prom though around this time, all these, I think Scytis started in 2010. Scytis came a bit later.

171
00:08:47,000 --> 00:08:55,000
But like all, there was all these sort of first wave of these special purpose O-Lap systems like the Green plong vertica, Paracsel,

172
00:08:55,000 --> 00:09:02,000
Astrodata's, Data Allegro, all of them had gotten bought up by this point except for Paracsel.

173
00:09:02,000 --> 00:09:09,000
The Green plong got bought by EMC, Vertica got bought by HP, Data Allegro got bought by Microsoft,

174
00:09:09,000 --> 00:09:14,000
and then within I think half a year of looking at the code, they said it was garbage and threw it all away.

175
00:09:14,000 --> 00:09:21,000
They did $100 million for something they never used. Astrodata got bought by Teradata.

176
00:09:21,000 --> 00:09:26,000
So Paracsel was the only sort of the last one at the dance they hadn't got picked up yet.

177
00:09:26,000 --> 00:09:34,000
And so what Amazon ended up doing was instead of buying them, they invested in them,

178
00:09:34,000 --> 00:09:42,000
in like their series E or something like that. And as part of that investment, they got licensed to the source code to use it.

179
00:09:42,000 --> 00:09:51,000
Anyway, they wanted. And I think they paid like $20 million for it, which is again, for how much money Russia makes now is a steal.

180
00:09:51,000 --> 00:09:54,000
Of course, obviously they put a lot of engineering effort to make it all work.

181
00:09:54,000 --> 00:09:59,000
But they paid $20 million to get the source code versus Vertica got bought for $100 million.

182
00:09:59,000 --> 00:10:04,000
Data Allegro got bought for, you know, these are all the $100 million to $1 million. They got it for $20 million.

183
00:10:04,000 --> 00:10:14,000
They could've hosted that. So this is what they did. And then they slapped it up on AWS and then started selling it as a service.

184
00:10:14,000 --> 00:10:22,000
I think in 20, I say this is 2014, but I think it was maybe a let's sooner. Right at the same time, it's just like Snowflake came out.

185
00:10:22,000 --> 00:10:29,000
So this is red shifted its Amazon's what I call flagship OLAP database system, database as a service.

186
00:10:29,000 --> 00:10:36,000
And again, the lineage is that it comes from Park Cell, which was a shared nothing fork of Postgres.

187
00:10:36,000 --> 00:10:47,000
And so you'll see that over time is evolved to a shared system. They didn't really start off with like, you know, the way Snowflake did it being completely disaggregated storage.

188
00:10:47,000 --> 00:10:52,000
They eventually had to add those pieces back in and they did it. They try to do this in a couple of different ways.

189
00:10:52,000 --> 00:11:01,000
So they added just a storage for S3 in 2017. And then they added recently support for serverless deployments.

190
00:11:01,000 --> 00:11:10,000
Basically now I don't need to provision my computer cluster ahead of time. The way you would have to do in Snowflake, at least in original version of Snowflake, you just say, here's my queries just stored right at it.

191
00:11:10,000 --> 00:11:17,000
As far as I know, BigQuery has always been serverless. Like that one you've never provisioned. Like I want these nodes. You just say, here's my credit card number.

192
00:11:17,000 --> 00:11:27,000
Give me a string where I can send queries to. And then if you want guarantee capacity, you sort of pay extra for that. But there's no provisioning machines.

193
00:11:27,000 --> 00:11:35,000
So I would say red shift is going to be a more, what's going to look like a more traditional data warehouse compared to BigQuery and Spark that we talked about before.

194
00:11:35,000 --> 00:11:49,000
Even though it sort of fits in the category of the row is compared with these other data lake, a lake house systems, it's going to look more like a traditional data warehouse similar to yellow brick, where they want to control all the data for you.

195
00:11:49,000 --> 00:11:56,000
So they're going to add the ability later on to be able to read data off S3 directly, like parquet files or whatever you have down there.

196
00:11:56,000 --> 00:12:02,000
But by default, they want to put everything into what they call the red shift managed storage.

197
00:12:02,000 --> 00:12:15,000
So as part of this, the design goal similar to what Snowflake was trying to achieve is that they want to remove as much as the management responsibilities from the user and have everything being controlled much as possible.

198
00:12:15,000 --> 00:12:22,000
And as the paper you guys read, they have a bunch of sort of ML based or automatic based mechanisms to try to do this.

199
00:12:22,000 --> 00:12:40,000
But I think the original implementation of it was, it was basically, the very first version of it was basically ParkSell and you got exposed to all the, you know, the internals things about, you know, about Postgres or ParkSell, the really things that you had to deal with as a user of the service.

200
00:12:40,000 --> 00:12:46,000
So what's sort of confusing about Amazon is that there's two different versions of red shift.

201
00:12:46,000 --> 00:12:53,000
And then there's this other thing called Athena, which I don't think the paper mentions, but that's another OLAP system that they support.

202
00:12:53,000 --> 00:12:58,000
So version version of red shift, I guess it says, I think came out in 2012, not 2014.

203
00:12:58,000 --> 00:13:08,000
And again, that was always being stored in, you know, that was always, there's a shared nothing system with storing things on the compute nodes themselves.

204
00:13:08,000 --> 00:13:17,000
Then in 2016, they took Presto out of Facebook and then they just rebranded as Athena.

205
00:13:17,000 --> 00:13:26,000
I think it's based on the Trino line now, not the, which was based on Presto SQL, not the Presto DB1 from the Facebook Steel Controls now.

206
00:13:26,000 --> 00:13:36,000
But they have sort of, this would be like more akin to a Lake House query engine where you just, you know, you just have a bunch of files on S3 and you can read from it.

207
00:13:36,000 --> 00:13:41,000
And again, that's what, that's what Presto was originally designed for.

208
00:13:41,000 --> 00:13:47,000
And then the spectrum extension to the original version of, of red shift came in 2017.

209
00:13:47,000 --> 00:13:56,000
And this is basically allowing you to have through the red shift interface, a front end query data that's on S3 without having to first import them,

210
00:13:56,000 --> 00:14:03,000
to import them, to load them into, load them into the red shift managed storage.

211
00:14:03,000 --> 00:14:16,000
So, again, so when you sign up now, I think you, I think you just say I want red shift and then like if you end up querying data that isn't, that you're not going to suck into the managed storage, then it just sort of goes to the spectrum thing.

212
00:14:16,000 --> 00:14:20,000
I don't think you specify I want spectrum, whereas Athena is a completely separate service.

213
00:14:20,000 --> 00:14:38,000
And then they said it's just, they're just reselling a repackaging, Presto, which Amazon does a lot for a lot of systems, causes, causes problems with some, from Davis vendors for opens or software because Amazon often makes more money than they do.

214
00:14:38,000 --> 00:14:48,000
And then, so what ends up happening is these major companies end up re-licensing opens or software to prevent Amazon from reselling it.

215
00:14:48,000 --> 00:14:58,000
Elastic's probably the most famous one that has done this, but they had to change the license because Amazon was making more money on elastic search than the actual company elastic was.

216
00:14:58,000 --> 00:15:04,000
Okay, so at high level, this is what red shift is going to do for us. So again, a lot of this is going to be the same as the team before.

217
00:15:04,000 --> 00:15:12,000
Share disk, this is going to storage again, even though it started off as a shared nothing, but then they switch move to share disk.

218
00:15:12,000 --> 00:15:15,000
We push-based vectorized query processing.

219
00:15:15,000 --> 00:15:23,000
Let's talk about this in a second, but they're going to be doing in trinzix, AVX2 and Cindy could written by hand by Amazon engineers.

220
00:15:23,000 --> 00:15:30,000
What is novel about what they're doing for cogeneration than the other systems is that they're actually going to do both.

221
00:15:30,000 --> 00:15:41,000
They're going to do the vectorized style pre-compile primitives and also do the holistic source of source compilation that we sell on high queue.

222
00:15:41,000 --> 00:15:48,000
So they're actually going to be doing both these things. They'll have compute site caching, packs column or storage will be the Rump of Priory storage.

223
00:15:48,000 --> 00:15:56,000
I think they're doing the candy store mergers, hash joins, another interesting aspect is that they're going to have their own sort of hardware acceleration layer and they're up front about it.

224
00:15:56,000 --> 00:16:02,000
This is what it's actually doing where it's like big query, for example, they don't publicly talk about the in-memory shuffle.

225
00:16:02,000 --> 00:16:05,000
And as far as the notes, snowflake doesn't have anything that they do.

226
00:16:05,000 --> 00:16:17,000
And then they have a stratified query optimizer that paper mentions that's how they're going to be able to handle the one-off issues that they have for queries by having their own sort of rewrite or layer.

227
00:16:17,000 --> 00:16:26,000
So for today, I'm going to mostly talk about this one and this one, but then these other things will come up as we go along.

228
00:16:26,000 --> 00:16:40,000
So this is the diagram from the actual paper itself. And you can see all the different bits and pieces that make up the overall arching redshift system.

229
00:16:40,000 --> 00:16:49,000
So at the bottom, you have this storage layer here. And what's sort of confusing is that you have sort of S3 here and then you have this redshift managed storage next to it.

230
00:16:49,000 --> 00:17:04,000
As far as I can tell, they are direction, you know, like, the easy to insist on themselves and locally attached storage who can then also spill over and read and write data from the S3 as well.

231
00:17:04,000 --> 00:17:16,000
There's this aqua thing that the hardware accelerator will talk about in a second, but that could be something that stands in between the compute nodes and the redshift managed storage.

232
00:17:16,000 --> 00:17:33,000
They have these other spectrum nodes here. Again, I think these are just, I don't know if they're like, I don't understand these things just to be like, it's software that can then run in here in the actual compute nodes of the worker nodes with running queries that can just know how to go read data down from S3. Yes.

233
00:17:33,000 --> 00:17:39,000
It's a good question. What exactly is a spectrum just an isolated thing? Is it actually talking to anyone?

234
00:17:39,000 --> 00:17:52,000
It's a question. It's a spectrum is an isolated thing. There's no error. So this is what I'm saying. I don't... Maybe I'm just misunderstanding what it's in the paper. I mean, I procrastinate to talk with you. I don't think he mentioned this.

235
00:17:52,000 --> 00:17:58,000
Like, I thought this is just software because it's just like, okay, you want to read some data on S3. My worker node knows how to go do that.

236
00:17:58,000 --> 00:18:12,000
From what I understood from this talk this year is that his spectrum basically moves up from the... So the armist nodes are just S3 nodes with some more software on there. And like, spectrum moves up from S3 to 5.

237
00:18:12,000 --> 00:18:19,000
So the question is like, for the RMS stuff, these are just S3 nodes with the extra stuff. Yes. And then the...

238
00:18:19,000 --> 00:18:33,000
And to this? Yes. Does it take Amazon S3? No, I thought the spectrum nodes are just compute. It's just compute. Because you can join the RMS data with the S3 data.

239
00:18:33,000 --> 00:18:42,000
So we'll see slides in a second. And so therefore, if you're just doing query processing, that's going to be done up with the compute nodes anyway.

240
00:18:42,000 --> 00:18:49,000
So I don't know what the separate spectrum nodes are actually mean. And then the...

241
00:18:49,000 --> 00:19:05,000
Like, the compute... I used to name clusters versus register compute clusters. This is just like, how you sort of provision it. Do I want to have some organization in my company have access to a compute cluster that they can only use?

242
00:19:05,000 --> 00:19:12,000
And therefore, it doesn't interfere with... It doesn't get slowed down if people are sort of going at the general pool for the organization.

243
00:19:12,000 --> 00:19:19,000
But they also have the ability to scale up automatically if you specify, say, hey, go bring some to short nodes. Because these things are meant to be stateless.

244
00:19:19,000 --> 00:19:28,000
Although, I think they also do have a local SSD cache as well. And then the compilation service, we'll talk about that in a second.

245
00:19:28,000 --> 00:19:35,000
But that is basically... Again, the thing that's going to run GCC to do the compilation of the queries has to go along.

246
00:19:35,000 --> 00:19:51,000
And what's also confusing about the Redshift-Menestorge and how it relates to like compute nodes is when you provision Redshift, you specify you want the instance type to be the Redshift-Menestorge.

247
00:19:51,000 --> 00:19:58,000
And so that, no, sometimes the literature makes it sound like, okay, well, it's the node itself just knows how to go talk to...

248
00:19:58,000 --> 00:20:04,000
Sorry, you get a single compute instance, but there's also another instance that spins up that has this Redshift-Menestorge.

249
00:20:04,000 --> 00:20:07,000
First, as you're saying, is it just something sitting right above S3?

250
00:20:07,000 --> 00:20:11,000
Yeah, it is S3 nodes with just additional code, yes.

251
00:20:11,000 --> 00:20:14,000
Okay.

252
00:20:14,000 --> 00:20:24,000
So, when they actually query, the actual engine itself is going to be push-based.

253
00:20:24,000 --> 00:20:29,000
The example that they show in the paper looks like it'd be pull-based and they even call this out.

254
00:20:29,000 --> 00:20:43,000
But they talk about how that would be too much state to maintain in a pull-based model that they switched to push-based, but they'd be careful about where they do certain operations to void-blowing out your CD-C.

255
00:20:43,000 --> 00:20:51,000
So, there's a lot of the same things that we talked about before in the hyper-paper when they were doing compilation that they're trying to be worried about.

256
00:20:51,000 --> 00:21:06,000
But one thing they do differently is that to help reduce the compilation cost, the compilation time of the queries themselves, that they're still going to rely on some pre-compact primitives to do vectorized scans and filtering on other things.

257
00:21:06,000 --> 00:21:12,000
So, they're not going to do full pre-compact primitives that they vectorized was for the entire query plan.

258
00:21:12,000 --> 00:21:20,000
It's just for the lower portions and the leaves, they're going to have things that are pre-compact that have been in line into the compile program.

259
00:21:20,000 --> 00:21:26,000
And as I said, the code that they're generating is not going to rely on auto-vectorization for any of these primitives.

260
00:21:26,000 --> 00:21:32,000
Everything is going to be written from hand using intrinsic.

261
00:21:32,000 --> 00:21:56,000
Another technique that they're going to rely on in these scan loops to void stalls is that they recognize that you don't want to do some operation on the tube we're operating right now, and then loop back around in sort of the scan kernel, and then phase a stall because the next record you want to retrieve is not in the CPU cache or the CPU registers.

262
00:21:56,000 --> 00:22:02,000
So, they're going to use software pre-fetching, which I think we talked about with vectorization.

263
00:22:02,000 --> 00:22:13,000
You basically can instruct the CPU to say, go fetch these next memory addresses, bring them into, I think it lands in L3, or maybe L2, I figured which one.

264
00:22:13,000 --> 00:22:24,000
But like basically, go fetch the next thing, I know I'm going to read from memory into my CPU caches, and it's timed in such a way because they control again those that they're running on, they're controlling the code that they're generating.

265
00:22:24,000 --> 00:22:34,000
So, they have heuristics to figure out at what point you want to invoke that software pre-fetch command so that when you come back around and actually need that tube, it's actually ready for you.

266
00:22:34,000 --> 00:22:37,000
And they basically use a circular buffer to place these things.

267
00:22:37,000 --> 00:22:38,000
Yes.

268
00:22:38,000 --> 00:22:40,000
Where did this source do source mean?

269
00:22:40,000 --> 00:22:48,000
The query plan is the source, and then you emit a more source code for it.

270
00:22:48,000 --> 00:22:56,000
Versus the hyper-style was taking the query plan and thinking of the source and spitting out the IR directly.

271
00:22:56,000 --> 00:22:58,000
Yes.

272
00:22:58,000 --> 00:23:08,000
So, I think we talked us about with the LACSOP operator fusion approach where we were introducing buffers in between in our pipeline.

273
00:23:08,000 --> 00:23:19,000
So, there was a soft pipeline breaker, and then once that's full, then move on to the next stage within my pipeline.

274
00:23:19,000 --> 00:23:34,000
And so, the idea was that within that soft pipeline breaker, you would inject the pre-fetch commands so that you can do a little bit of work, the harbor go fetch is the pre-fetch is the thing you need, and then when you come back around, the data is available for you.

275
00:23:34,000 --> 00:23:42,000
Because if you think about it, if you do too much work, then the data might get evicted by the next time you start using it.

276
00:23:42,000 --> 00:23:49,000
If you do too few work inside that before you pre-fetch, or after you pre-fetch, then when you actually then need the data, it's not available.

277
00:23:49,000 --> 00:24:01,000
And again, because they're doing all the compilation stuff themselves or generating the code, they have ways to figure out, you know, I'm this far along, and they're trying to inject my pre-fetch commands.

278
00:24:01,000 --> 00:24:15,000
So, the one thing that also they came out of the paper too is that, given from all the other systems we've talked about, they appear to be less aggressive in being adaptive compared to BigQuery and Snowflake and others.

279
00:24:15,000 --> 00:24:25,000
Like, Snowflake was trying to do aggregate pushdowns, I think, photon and BigQuery were trying to figure out on the fly what the right, you know, data type they should be using.

280
00:24:25,000 --> 00:24:38,000
So, what they really only talk about is that they have the ability to choose, you know, choose a vectorized implementations of different string functions, like upper, lower comparisons and things like that.

281
00:24:38,000 --> 00:24:46,000
For when it's asking data, and then if that's incorrect, then they fall back to a slower version that operates on Unicode.

282
00:24:46,000 --> 00:24:53,000
But that's sort of the same trick that the others were doing, you know, they're not really reorganizing the query plan themselves.

283
00:24:53,000 --> 00:25:14,000
And the other one they talk about is, if you, for the join-thotes are doing sideways information passing, when you're building the balloon-thoteer on the build side of a hash-join, they can recognize that if the hash-tale was getting too large and it's spilling to disk, then you can size the balloon-thoteer be a little bit larger than you normally would,

284
00:25:14,000 --> 00:25:21,000
because that will increase the likelihood that you don't have false positives, and you don't end up fetching things from disk.

285
00:25:21,000 --> 00:25:35,000
But that's really the only two adaptivity parts that they talk about, other than scaling up, the scaling up thing is more like on a per-query basis, do I need more compute nodes, because my current compute nodes are running other queries.

286
00:25:36,000 --> 00:26:01,000
So the compilation piece of this is very fascinating as well, and this is, it's similar to what Yellowbrick was doing where Yellowbrick talked about, instead of having the worker nodes be responsible for compiling the queries themselves, Amazon is going to have a separate service that's running on the side with the dedicated nodes that basically call GCC and compile things.

287
00:26:02,000 --> 00:26:19,000
And the idea is that the, you have caching, different layers of caching within the system, so you have a local cache where you have pre-compile query plans or fragments, and to be identified that the thing you're trying to compile right now has already been compiled before, you just reuse that.

288
00:26:19,000 --> 00:26:29,000
But then they have availability, which is, I think, ingenious, to maintain a cache across the entire fleet of machines across all of Redshift.

289
00:26:30,000 --> 00:26:49,000
So now, like the idea is that if you come across a query that your cluster has never seen before, it doesn't have the compile query plan in its cache, and Goldlook in this global cache, and see, did somebody else have something that's very similar, and to be able to reuse that shared object, that pre-compiled, that compiled code.

290
00:26:50,000 --> 00:27:01,000
And again, from a security standpoint, there isn't any issue because it's running arbitrary user code, it's literally like scanned this table on this type with this kind of filter.

291
00:27:01,000 --> 00:27:12,000
And so it doesn't matter whether your table contains banking information, and my table contains blog information, at the end of the day, the data is a column of data, and they can reuse that.

292
00:27:13,000 --> 00:27:20,000
So they talk about how the cache hit rate is like 99.95% for across all queries and across the entire fleet.

293
00:27:20,000 --> 00:27:30,000
And then in the cases where if you don't have the pre-compiled segment on your local cache, 87% of the time that when you go to the global cache, it's going to be in there.

294
00:27:31,000 --> 00:27:47,000
So this basically negates the cost of compilation, the thing we were worried about before, when we were talking about how to use this technique, and again, when we talked about IQ and MemSQL, and other systems that forked exactly as GCC, we talked about how it's going to be second-stacked compile things.

295
00:27:47,000 --> 00:27:52,000
Even Hyper was, in some cases, it was going to take hundreds of milliseconds to compile things.

296
00:27:53,000 --> 00:27:55,000
All that goes away because everything's cached.

297
00:27:55,000 --> 00:27:56,000
Yes.

298
00:27:56,000 --> 00:27:59,000
Question is how big is that cache?

299
00:27:59,000 --> 00:28:03,000
I mean, it's not going to be petabytes, right?

300
00:28:03,000 --> 00:28:06,000
But it's probably a couple of hundred gigs, sure.

301
00:28:06,000 --> 00:28:09,000
But who cares? Is your Amazon?

302
00:28:09,000 --> 00:28:13,000
How big is the S3 storage?

303
00:28:13,000 --> 00:28:16,000
I don't know. A lot.

304
00:28:17,000 --> 00:28:22,000
So who cares if you have these cache query plans?

305
00:28:22,000 --> 00:28:38,000
And then from their perspective, also, too, it's a win-win situation because the customers are happy because the queries run faster, it's less computationally expensive to fetch something from the cache than re-compile it.

306
00:28:39,000 --> 00:28:42,000
So for them, this is an over-win situation.

307
00:28:42,000 --> 00:28:45,000
And again, this is what you can do when it's in the cloud.

308
00:28:45,000 --> 00:28:52,000
Again, if you're running Hyper and it's local on your box, you can't phone home to say, you know, do you have this compiled query plan?

309
00:28:52,000 --> 00:28:54,000
Because it's not designed that.

310
00:28:54,000 --> 00:29:00,000
But when it's a service running in the cloud, when you control everything, you can do this kind of trick.

311
00:29:01,000 --> 00:29:11,000
So I saw a similar idea from, it's a sort of commercial JVM company called Azul AZUL.

312
00:29:11,000 --> 00:29:13,000
And they now have a compilation of the service.

313
00:29:13,000 --> 00:29:28,000
I'm going to say, like, if you're running your Java program, you can have their compiler, the local JVM say, I want a compiled version of this jar file, I'm going to run on this hardware.

314
00:29:28,000 --> 00:29:32,000
You can call the service and get cache binaries from them.

315
00:29:32,000 --> 00:29:33,000
Yes.

316
00:29:33,000 --> 00:29:40,000
What I'm most impressed with is that the level of interaction of going to the cache isn't as less costly than actually compiling.

317
00:29:40,000 --> 00:29:46,000
So your statement is you're more impressed that the cost of going to the cache is cheaper than just compiling locally?

318
00:29:46,000 --> 00:29:53,000
Yeah, because using bi-locally just like 10 milliseconds or 100 milliseconds?

319
00:29:53,000 --> 00:29:55,000
Seconds.

320
00:29:55,000 --> 00:29:56,000
Yeah.

321
00:29:56,000 --> 00:29:59,000
How large are these precompiled?

322
00:29:59,000 --> 00:30:04,000
Like, let's say in source code, like, are they more than like 100 lines?

323
00:30:04,000 --> 00:30:13,000
Because if it's precompiled operators, it should, like, one operator is not going to be more than like 1000 lines.

324
00:30:13,000 --> 00:30:16,000
So a statement is like, how big in these programs actually be?

325
00:30:16,000 --> 00:30:24,000
Because, like, you know, if it's, because if you're using some precomp, precompiled primitives for certain parts of the lower leaves,

326
00:30:24,000 --> 00:30:28,000
but, you know, what about everything else? How much can that be?

327
00:30:28,000 --> 00:30:32,000
I can be in the thousands, right? Like, for really big queries with a much advantage.

328
00:30:32,000 --> 00:30:36,000
It's all right. Just specifically for the precompiled primitives.

329
00:30:36,000 --> 00:30:38,000
The precompiled primitives are usually pretty tight, right?

330
00:30:38,000 --> 00:30:39,000
They go to the small ones.

331
00:30:39,000 --> 00:30:40,000
They go to the small ones.

332
00:30:40,000 --> 00:30:41,000
Yeah.

333
00:30:41,000 --> 00:30:42,000
So everything else is like...

334
00:30:42,000 --> 00:30:45,000
It's all the scaffolding around it that then calls it as precompiled primitives.

335
00:30:45,000 --> 00:30:48,000
That's what they were trying to avoid compiling that.

336
00:30:48,000 --> 00:30:50,000
What's the point of having the precompiled primitives to be like?

337
00:30:50,000 --> 00:30:57,000
The statement is why I have the precompiled primitives if you're going to, you know, be able to compel everything.

338
00:30:57,000 --> 00:31:00,000
I think the paper talks about how...

339
00:31:00,000 --> 00:31:04,000
They come back and keep saying that it's, I think, to reduce compilation costs.

340
00:31:04,000 --> 00:31:08,000
Yeah, I think it makes sense.

341
00:31:08,000 --> 00:31:14,000
But it makes, I mean, I think it makes sense because you can imagine like...

342
00:31:15,000 --> 00:31:19,000
You know, here's this one piece of code that I'm going to keep compiling over and over again.

343
00:31:19,000 --> 00:31:26,000
At their scale, if you can compile it once and reuse it, it makes a huge difference.

344
00:31:26,000 --> 00:31:32,000
And they talk about, again, there's this overhead of, as we saw before, you know, with the precompiled primitives,

345
00:31:32,000 --> 00:31:37,000
invoking of functions not free at runtime, obviously, because it's a jump call on the CPU.

346
00:31:37,000 --> 00:31:43,000
But if you do it on a batch of data and a vector, then it gets amortized.

347
00:31:44,000 --> 00:31:46,000
And it becomes negligible.

348
00:31:49,000 --> 00:31:54,000
So this would be, I mean, we'll talk about this in the end, but like, Amazon's not stupid.

349
00:31:54,000 --> 00:32:00,000
They have all the metrics and telemetry across the entire system.

350
00:32:00,000 --> 00:32:06,000
Like, they can identify, here's the part where we're, you know, here's a part where it's super inefficient for us,

351
00:32:06,000 --> 00:32:09,000
and they can introduce caching and other things to speed things up.

352
00:32:09,000 --> 00:32:13,000
So it's not like they designed this because they thought, oh, that's fun. Let's go do this, right?

353
00:32:13,000 --> 00:32:15,000
They did it for a reason.

354
00:32:15,000 --> 00:32:21,000
And so, like, to your point, like, yeah, who cares about compiling the same, you know, same five-line function over and over again?

355
00:32:21,000 --> 00:32:27,000
Think of, like, in Amazon's scale, you're doing this a billion times a day. That starts to add up.

356
00:32:27,000 --> 00:32:34,000
And so, you know, this probably saves them, again, millions of dollars a year to have this.

357
00:32:35,000 --> 00:32:38,000
And as I said, like, the customer's happy too, because like, now queries are on super fast.

358
00:32:38,000 --> 00:32:43,000
Because you're just stitching a bunch of pre-compiled stuff put together.

359
00:32:43,000 --> 00:32:49,000
I don't think the paper talks about this, but I know that, you know, one of our students did an internship with them and worked on this project.

360
00:32:49,000 --> 00:32:56,000
Like, they basically keep track of, in the cache, like, here's all the source code, and then that they've ever generated.

361
00:32:56,000 --> 00:32:59,000
And they have different compiled versions of it for the different versions of Redshift.

362
00:33:00,000 --> 00:33:02,000
They've deployed in the different hardware that's out there.

363
00:33:02,000 --> 00:33:05,000
Because Amazon's always putting out new Insta-Types and so forth.

364
00:33:05,000 --> 00:33:08,000
And they don't really tell you exactly what the CPU is.

365
00:33:08,000 --> 00:33:13,000
That's all hidden from you, but, you know, the obviously upgrade things over time.

366
00:33:13,000 --> 00:33:23,000
So, they have the ability to have background workers go through, look in the cache, grab the original source code, and recompile it for the new versions.

367
00:33:23,000 --> 00:33:26,000
So, it's not just, like, for this fragment, here's exactly one binary version.

368
00:33:27,000 --> 00:33:32,000
There's additional qualifiers you would have to select what version of the binary you want it.

369
00:33:32,000 --> 00:33:35,000
And we solve the same thing with the yellow brick.

370
00:33:38,000 --> 00:33:50,000
Alright, so the other thing that the paper talked about, although it's rather short, but we can discuss a little bit, is that they have this hardware acceleration layer called Aqua, the Advanced Query Accelerator for Redshift.

371
00:33:50,000 --> 00:33:55,000
As far as I can tell, this is just for Redshift and not Spectrum.

372
00:33:56,000 --> 00:34:03,000
Right, because Spectrum is kind of trying to go against directly S3 storage, but I might be wrong with this.

373
00:34:03,000 --> 00:34:22,000
But basically, they introduced an additional caching, what they call a computational storage layer, that sits in between the worker nodes and the storage layer, that has a bunch of FPGAs that you can do predicate pushdown and aggregation pushdown into these devices.

374
00:34:23,000 --> 00:34:27,000
And do a bunch of computation on them before you hand it off up to the worker.

375
00:34:27,000 --> 00:34:33,000
So, let's say that, like the worker says, I want to get some data, I don't want, you know, with this predicate like this.

376
00:34:33,000 --> 00:34:41,000
And so, instead of going to directly the storage, you go to Aqua, and you say, this is the data I want to process.

377
00:34:41,000 --> 00:34:44,000
I want to process, here's the where clause I want for it.

378
00:34:44,000 --> 00:34:51,000
And then this thing goes down to the storage layer, and just makes the raw get call to S3 or whatever to get it.

379
00:34:51,000 --> 00:35:02,000
And brings it back into this side, does the processing on it and the FPGA, and then shoves it back up to the worker for the computation.

380
00:35:02,000 --> 00:35:04,000
Right?

381
00:35:04,000 --> 00:35:13,000
And the paper talks about how that this layer is not actually tied to your cluster, your workers, your data warehouse instance.

382
00:35:13,000 --> 00:35:19,000
This is a global service that can be reused from multi-tenor across any possible cost per.

383
00:35:19,000 --> 00:35:24,000
Simulator, the compilation service was across all the entire fleet of Amazon Redship users.

384
00:35:24,000 --> 00:35:29,000
Same thing for this, this was like used by anybody.

385
00:35:29,000 --> 00:35:41,000
And they talk about how the, when the advantage of having this additional separation between the storage layer and the work layer is that you can down do cluster resizing the worker level,

386
00:35:41,000 --> 00:35:46,000
and not worry about having to shuffle things around, because this thing is sort of independent of it.

387
00:35:46,000 --> 00:35:53,000
I think that's a little bit of them being a remnant or the artifact of them, originally starting off being a shared nothing system.

388
00:35:53,000 --> 00:36:07,000
So this was introduced in 2021, which is not that long ago, three years ago, and the paper is 2022, so they're talking about it, but the paper was written in 2021 by the time it came out in 2022.

389
00:36:07,000 --> 00:36:18,000
And then I think around 2022, people noticed that you no longer enable this feature, and I think the response was, oh yeah, it's just always on.

390
00:36:18,000 --> 00:36:31,000
But as far as I can tell, as far as I know, well, I haven't cut anything here, that this was phased out. They actually got rid of this, but it didn't publicly announce it.

391
00:36:31,000 --> 00:36:39,000
And instead what they did was, at the storage layer, they have these, they may mention Nitro.

392
00:36:39,000 --> 00:36:53,000
Nitro is the, Nitro is on a single thing, but that's their sort of, what they call the project of how, how the running their own hyperbys are the specialized harbor that they're running for all the different instances on Amazon.

393
00:36:53,000 --> 00:37:04,000
And they have custom silicon on these Nitro instances to do networking, do additional processing for EBS and storing things.

394
00:37:04,000 --> 00:37:13,000
And so one of the things that they've added is the hardware acceleration through Nitro and additional card to do the kind of stuff that they were doing originally on the FPGA.

395
00:37:14,000 --> 00:37:27,000
So the, so this aspect is unique, but this sort of seemed like this was like a, not afterthought, has it?

396
00:37:27,000 --> 00:37:34,000
Like, snowflake didn't really do this. It's basically doing trying to competitive push down to the storage.

397
00:37:34,000 --> 00:37:40,000
But instead of adding much more stuff down here, they just had the extra layer in the middle.

398
00:37:40,000 --> 00:37:43,000
Dremel does this as well, right, before it's shuffle.

399
00:37:43,000 --> 00:37:44,000
With FPGA's?

400
00:37:44,000 --> 00:37:46,000
Yeah, he's sending it in the lecture.

401
00:37:46,000 --> 00:37:47,000
Dremel?

402
00:37:47,000 --> 00:37:48,000
That's in BigQuery.

403
00:37:48,000 --> 00:37:49,000
Oh, BigQuery, yeah, sorry, yeah.

404
00:37:49,000 --> 00:37:51,000
Oh, sorry, sorry, sorry, I said, I said Dremio.

405
00:37:51,000 --> 00:37:52,000
Yeah, sorry, Dremel.

406
00:37:52,000 --> 00:37:53,000
Yes.

407
00:37:53,000 --> 00:37:59,000
But that's like on the shuffle nodes themselves, not like the storage layer.

408
00:37:59,000 --> 00:38:00,000
Right?

409
00:38:00,000 --> 00:38:04,000
I think what Amazon has done is pushed this kind of stuff down to the storage layer down here.

410
00:38:04,000 --> 00:38:09,000
And so instead of having a separate standalone service, which this was, it's all now just down here.

411
00:38:09,000 --> 00:38:12,000
Right?

412
00:38:12,000 --> 00:38:14,000
You can see this with S3.

413
00:38:14,000 --> 00:38:18,000
Like, you, they have an S3 select API.

414
00:38:18,000 --> 00:38:24,000
Like, you can basically do ware clauses on S3 independent of, of, of, of, redshift.

415
00:38:24,000 --> 00:38:31,000
And I suspect that that's how they're relying on the same kind of mechanism.

416
00:38:31,000 --> 00:38:32,000
But there wasn't really a big announcement.

417
00:38:32,000 --> 00:38:37,000
This Aqua just sort of, you know, just just disappeared as far as I can tell.

418
00:38:37,000 --> 00:38:40,000
Without acknowledging that it's been removed.

419
00:38:40,000 --> 00:38:41,000
All right.

420
00:38:41,000 --> 00:38:45,000
So with the query optimizer, then they don't, they say much.

421
00:38:45,000 --> 00:38:51,000
I know that it's still based on, you know, it's always been, been, been heavily modified over the years.

422
00:38:51,000 --> 00:38:55,000
But it's still heavily based on, in Postgres, this query optimizer.

423
00:38:55,000 --> 00:39:00,000
So it's going to be a bunch of, of, of, of, heuristics and rules in the very beginning to do some rewriting.

424
00:39:00,000 --> 00:39:03,000
It's part of what this, this piece down here does.

425
00:39:03,000 --> 00:39:09,000
And then they're going to do some going to call space search to figure out the optimal join on ring.

426
00:39:09,000 --> 00:39:17,000
And again, unlike in, in Dremel and unlike in, in Databricks where they assume they're not going to have query statistics.

427
00:39:17,000 --> 00:39:30,000
In the case of a redshift, it's on, if it's on redshift, manage storage, they, they'll run analyze and collect the data and, you know, train, build statistical models that the MIM feed into the call space optimizations.

428
00:39:30,000 --> 00:39:43,000
For spectrum queries that are running after raw data, going after raw data on S3, as far as they can tell, the only thing they can do is go extract the, the, the meta data in the headers of folders or parking or files.

429
00:39:43,000 --> 00:39:49,000
And try to push down filters based on those zone maps, like, you know, basic minmax calls and things like that.

430
00:39:49,000 --> 00:39:54,000
And I think that gets cached up into the, in the compute layer.

431
00:39:54,000 --> 00:39:58,000
So you're not going, always going to read, reading S3 for every single file.

432
00:39:59,000 --> 00:40:04,000
The paper makes a big deal about this query, we're writing framework, QRF. Again, they aren't describing what it actually is.

433
00:40:04,000 --> 00:40:09,000
As far as you can tell, there's no documentation about it, because again, it's this internal thing.

434
00:40:09,000 --> 00:40:23,000
But they talk about how it's a DSL based approach where you can basically specify the patterns that you're looking for and then the transformation rules if you match a pattern, which is what we've been talking about, you know, all before for query optimizers is basically how they work.

435
00:40:23,000 --> 00:40:34,000
But they claim that their, their implementation of it, their, their method of doing this is really easy for, for anyone to come along and, you know, extend it.

436
00:40:34,000 --> 00:40:39,000
They, they mentioned interns could use it in three day, get it working in three days or make changes in three days.

437
00:40:39,000 --> 00:40:52,000
So this sounds like what the yellow brick people were talking about in last class, where they rather than making, you know, principal changes to the, the internals of the query optimizer and how it actually wants to do search and read.

438
00:40:52,000 --> 00:41:06,000
And then they want to do searches and numerations and other things that they have these sort of one-off rules where they try to patch things up for queries as they come in based on, you know, to force the query plan in the form that they want it.

439
00:41:06,000 --> 00:41:14,000
So another interesting thing that they, that Amazon does, in their documentation for Redshift is actually really, really good.

440
00:41:14,000 --> 00:41:22,000
They have a whole documentation page on how to make queries run faster, especially running on on Redshift again, where you don't have statistical information.

441
00:41:22,000 --> 00:41:26,000
So they have a bunch of guidelines. I'm not going to read them all.

442
00:41:26,000 --> 00:41:38,000
But like they talk about how, okay, well, if you know you're running on the start schema, then you should put your facts, fact tables in S3 and all your dimension tables in in Redshift Manage Storage.

443
00:41:38,000 --> 00:41:47,000
Because in that case, you can least get statistics for the Redshift Manage Storage data. And then that's, you know, the, they're optimizing what we smart enough to recognize.

444
00:41:47,000 --> 00:41:55,000
Okay, well, batch maybe the where I'm going to build on my hash tables and I just have this giant pipeline where I probe all those hash tables with my, my fact table.

445
00:41:55,000 --> 00:42:07,000
Well, they talk about how like you should write your queries in a certain way that you know that these things can be pushed down into, into the storage layer based on them being simple and whatnot.

446
00:42:07,000 --> 00:42:20,000
You can actually also define statistics on these external tables or S3 tables. And that I think what happens is Amazon then goes and reads that data in, collects the statistics and then stores it as if it was a regular table.

447
00:42:21,000 --> 00:42:38,000
So I find this kind of interesting. It's like telling you what you should be doing as a user to deal with the fact that you may not have any statistics on S3 data instead of preempt, you know, preempt any problems that come later on.

448
00:42:39,000 --> 00:42:58,000
So we talked about this already, the Redshift Manage Storage. Again, as I said, I think it's stepper nodes, as you said, the running on S3 or sorry S3. And they're going to have local attach SSDs that if they then fill up, then they spill to spill to S3.

449
00:42:58,000 --> 00:43:06,000
So that's why I don't think they're pure S3 nodes. I think they're separate, like, you see, not easy to do, this is because they're virtual, but I think it's something separate.

450
00:43:07,000 --> 00:43:24,000
And I think the computer knows also have their own local SSD cache as well. But when you put things in Redshift Manage Storage, that's not going to be using Part K. It's not going to be using an open source file format. It's going to be using their proprietary format. And similar to what we saw in snowflake yellow brick and others.

451
00:43:25,000 --> 00:43:43,000
So what it says on 9 in that spectrum are Edgey spectrums and flux in the Redshift where we can work directly on S3. Whereas for RMS, it would have to load into the proprietary format first and then they could run queries or Edgey just make calls the Edgey spectrum.

452
00:43:44,000 --> 00:43:49,000
And then it can work in the native format or can all that on S3. So that's the right.

453
00:43:50,000 --> 00:44:03,000
So what she said was for spectrum, it is it has the ability to read data on S3 in any possible format and then feed that data into the regular Redshift compute nodes.

454
00:44:03,000 --> 00:44:10,000
But again, going back to my original point, I don't think they're separate nodes. I think it's just the same compute nodes.

455
00:44:11,000 --> 00:44:17,000
And as the Redshift compute nodes, like the work nodes, you have to set the grid nodes.

456
00:44:17,000 --> 00:44:20,000
Okay, you have to provision them separately.

457
00:44:21,000 --> 00:44:28,000
They get provision, it is transparent, but it's more of a based on your query, as you work with the thing.

458
00:44:31,000 --> 00:44:33,000
Okay, let's help out. Thank you.

459
00:44:34,000 --> 00:44:47,000
Again, because they want to manage everything, so when you create a table schema that they're going to specify exactly what compression schema and coding schema want to use, these are just a sample them.

460
00:44:47,000 --> 00:44:58,000
And then they talk about how they have their own proprietary one called AZ64, that they claim is, you know, it gets comfortable compression to something like snappy, but it's faster.

461
00:44:59,000 --> 00:45:07,000
But as far as you know, there's no public documentation that talks about it. I'm sure there's a patent, but we don't want to repatence in academia.

462
00:45:07,000 --> 00:45:10,000
So it's for plausible deniability.

463
00:45:10,000 --> 00:45:12,000
Is there bad or bad?

464
00:45:12,000 --> 00:45:15,000
Patents? Yeah, you don't want to repatence.

465
00:45:15,000 --> 00:45:24,000
If you're a researcher, don't repatence because then if you end up inventing the same thing, they can't claim that you saw their ideas because you didn't read the patent.

466
00:45:25,000 --> 00:45:34,000
And it rents you from maybe reselling or doing it, monetizing, but it isn't like this I have to cut.

467
00:45:34,000 --> 00:45:36,000
What was the point of the story?

468
00:45:39,000 --> 00:45:42,000
Don't repatence. There you go. That's the point of the story.

469
00:45:43,000 --> 00:45:57,000
Okay. So here's the paper. Here's the graph in the paper where they show how fast sure things are.

470
00:45:57,000 --> 00:46:01,000
So this is running TPCDS on three terabyte data set.

471
00:46:01,000 --> 00:46:07,000
And so they have what they call the out-of-box experience, meaning like just bulk loads some data and then immediately run your queries at it.

472
00:46:07,000 --> 00:46:18,000
And here's the performance you're getting relative to Redshift and then the tune one is like if you actually go, you can be at indexes, at compression properly, actually spend time to actually tighten things up.

473
00:46:18,000 --> 00:46:20,000
Here's what you can do.

474
00:46:20,000 --> 00:46:22,000
Everybody says that's the best.

475
00:46:22,000 --> 00:46:25,000
So everybody's really good at it.

476
00:46:25,000 --> 00:46:30,000
The time to reading a series with what they're versioning and they all have a figure that says, look we're better than everybody else.

477
00:46:30,000 --> 00:46:34,000
Yes. Well, we showed Yellowbrick last time, right?

478
00:46:35,000 --> 00:46:41,000
So Yellowbrick is faster. Yellowbrick is not in here, but like they... Yellowbrick had...

479
00:46:41,000 --> 00:46:50,000
Snowflake always has it as being number two, right? I think. But Yellowbrick had nothing Redshift slower than...

480
00:46:50,000 --> 00:46:52,000
Snowflake as well.

481
00:46:52,000 --> 00:46:53,000
Yes, Snowflake as well.

482
00:46:53,000 --> 00:46:55,000
Wasn't it worth a degree at all?

483
00:46:55,000 --> 00:46:56,000
Yes.

484
00:46:57,000 --> 00:47:03,000
What's funny is that this time when I was even less accurate because they're just doing TPCD at one time than one, two, three, four.

485
00:47:03,000 --> 00:47:05,000
Sorry, it's relative to Redshift. Sorry.

486
00:47:05,000 --> 00:47:08,000
So they didn't actually give numbers, they just give that to us.

487
00:47:08,000 --> 00:47:11,000
So that's what I think it's important.

488
00:47:11,000 --> 00:47:20,000
It's rare to see absolute numbers in there just because again you don't want your competitors using your own numbers against you.

489
00:47:20,000 --> 00:47:25,000
So maybe this is... Say this is actually legitimate, right?

490
00:47:25,000 --> 00:47:30,000
And maybe, you know... I'm not saying it's not legitimate, I'm just saying like there's too many different factors.

491
00:47:30,000 --> 00:47:38,000
But say, you know, Snowflake really was slower and then they add new features to get this number down, so now they can point to say,

492
00:47:38,000 --> 00:47:41,000
Redshift got this and we got that because we added this new feature.

493
00:47:41,000 --> 00:47:45,000
So they want to avoid all that. And they said, Yellowbrick, that paper is great because they put roll numbers in.

494
00:47:45,000 --> 00:47:52,000
No one does that. But there's no way like Amazon Legal is going to let you put anything out like that.

495
00:47:52,000 --> 00:48:03,000
So again, I hope again you guys are skeptical, I've found that everyone is, which is good, about what these numbers actually mean and actually telling us anything.

496
00:48:03,000 --> 00:48:13,000
Other than to say, like, despite all their efforts to make everything be serverless and try to remove the need for a human to come and tune things,

497
00:48:13,000 --> 00:48:22,000
you know, clearly it makes a difference. Again, this number is not this number, right? These are two separate, you know, base lines.

498
00:48:22,000 --> 00:48:28,000
But like, you know, going from this to this for BigQuery, that's a pretty big drop, right?

499
00:48:28,000 --> 00:48:35,000
Because I can't imagine the other ones got significantly slower and you know, BigQuery is just the same, if you're tuning it, yes.

500
00:48:35,000 --> 00:48:43,000
So when I see data like this, what should I look at to try and like, what information should I try to objectively get?

501
00:48:43,000 --> 00:48:49,000
Should I try to say, oh, this means redshift is really good with large data sets with complex query links.

502
00:48:49,000 --> 00:48:55,000
Yes, for sure I say, oh, maybe it's the relative scale, but I should think about what should I think away from this.

503
00:48:55,000 --> 00:49:02,000
So it goes back to that, I think that reddit post I showed before. And the question is, what should you take away from this?

504
00:49:02,000 --> 00:49:13,000
It goes back to the, that reddit post where I said before, like, you can simplify the decision, like, if you're already got much data on Amazon S3, then you probably just use redshift, right?

505
00:49:13,000 --> 00:49:16,000
Or something that can access the raw files.

506
00:49:16,000 --> 00:49:27,000
If your company were like, you know, it's your job or responsibility to figure out what, you know, which one you can use and money and location and what cloud platform you can use is not an issue.

507
00:49:27,000 --> 00:49:37,000
You just don't like look at it and say, oh, I'm going to use this. There's the whole process where you do a POC, they have solution architects help set up your cluster.

508
00:49:37,000 --> 00:49:42,000
You know, if you're signing for millions of dollars of, you know, years of service, right? Could you also not paying monthly?

509
00:49:42,000 --> 00:49:56,000
You're paying like, you're prepaid ahead of time to get a discount. So you have like solution architects that help, you know, set up your, the environment, help take a sample, your workload, running on whatever you, you know, software you have now, data system you have now, and then no one experiments for you and give you feedback.

510
00:49:56,000 --> 00:50:11,000
So it's, it's for you as a student who don't, I don't know you, I don't seem to know how many money, but like, like, yeah, I know I was just seeing your costs.

511
00:50:12,000 --> 00:50:22,000
So I mean, so like for you as a student, like, honestly, again, simplicity is what I would, I would aim for.

512
00:50:24,000 --> 00:50:34,000
As we said before, you can cook the, you can not cook the books like, they can add on to career rewriting rules and they say, oh, it's TPC, yes, make it do this one, make it do this one trick, because I know that's going to make a huge difference performance.

513
00:50:35,000 --> 00:50:46,000
So you have to take all this with a grain of salt. The nobody's going to be making major, a sort of corporate level enterprise level, making major decisions about choosing one or whatever based on like benchmark results like this.

514
00:50:46,000 --> 00:50:49,000
Right. This is just for them to brag in the paper, like the word faster.

515
00:50:50,000 --> 00:50:52,000
So what is it that comparable?

516
00:50:52,000 --> 00:50:54,000
A compare in terms of what?

517
00:50:54,000 --> 00:50:58,000
Like they're all comparably fast, so you can pick the one that's the point.

518
00:50:59,000 --> 00:51:10,000
I'm going to say this in a second. My end, my end, my sort of, including remarks for the semester is exactly as you said, given that you know, here's all the optimizations that I can do.

519
00:51:10,000 --> 00:51:21,000
We saw for the last couple of weeks of how they're all doing vectorized execution. They're all mostly doing push-based stuff. They're all doing some, you know, pre-compile primitives or, you know, holistic query compilation.

520
00:51:21,000 --> 00:51:26,000
They're all doing what you should be doing to get a high performance overlap system.

521
00:51:26,000 --> 00:51:29,000
The question, right? She's only does the primitive, right? Doesn't do the holistic.

522
00:51:29,000 --> 00:51:32,000
No, they do both. That's the whole thing.

523
00:51:32,000 --> 00:51:38,000
They co-genosepose loss that they were they inject the pre-compile primitives into it.

524
00:51:38,000 --> 00:51:42,000
Right? That's unusual. Nobody else does that as far as they know.

525
00:51:42,000 --> 00:51:43,000
Yes.

526
00:51:51,000 --> 00:51:56,000
So, it's not that you didn't have that.

527
00:51:56,000 --> 00:52:07,000
Good question. So, this question is like, how can snow like be successful as it is when it's competing against Microsoft, the Googles, and the Amazon's?

528
00:52:07,000 --> 00:52:10,000
And the answer is because they got there early.

529
00:52:10,000 --> 00:52:18,000
So, as I said, in 2012 or 2013 when they put out Redshift, it was basically Parksell slapped up on there.

530
00:52:18,000 --> 00:52:24,000
And the idea was, in Amazon's famous for this, they put it up there. If no one uses it, now it would just take it down. No big deal.

531
00:52:24,000 --> 00:52:28,000
If people started using it and they started making money, then they throw more money into it and make it better.

532
00:52:28,000 --> 00:52:37,000
Right? So, but Snowflake came out of the gate, probably getting, like, if you compare 2013 Snowflake or 2014 Slavic versus, you know, 2014 Redshift, Snowflake was probably faster.

533
00:52:37,000 --> 00:52:45,000
I can't prove it, but I'm this pure speculation. And, but over time, you know, Amazon threw a ton of money and it'd do all the stuff just off, make it faster.

534
00:52:45,000 --> 00:52:52,000
But, like, Snowflake was at the right place at the right time and early enough, there wasn't any other competition.

535
00:52:52,000 --> 00:52:56,000
So, that's why they were able to succeed and grow as much as they did.

536
00:52:57,000 --> 00:53:17,000
So, now you may say, okay, well, what about the click houses, the Dremios, the Druids, Peanos, all these other ones that are coming to the party a little bit later, how are they going to compete against the, you know, against the giants and the incumbents like Snowflake?

537
00:53:17,000 --> 00:53:31,000
It's hard. It's a hell battle. You just got to figure out what the, you know, it's something to come to figure out, like, what's the sort of one thing that they think they can do much better than what, you know, the big careers of the world can do.

538
00:53:31,000 --> 00:53:34,000
It is hard, yes.

539
00:53:35,000 --> 00:53:49,000
Correct. Yes. And, David, it's like, say you have this amazing new idea, like, how are you going to, Amazon is throw a ton of money and implement it.

540
00:53:49,000 --> 00:53:56,000
Yes. Now, big companies, they're giant ships. You take a while to, like, you know, to move things, right?

541
00:53:56,000 --> 00:54:10,000
This is sometimes called the innovators dilemma. Like, it's, you're making so much money on what you currently have, which, you know, at the time, maybe state of the art, and then something new comes along, but it radically changes what you, how you approach things.

542
00:54:10,000 --> 00:54:17,000
You know, you're not really incentivized to go make that change and therefore the upstart can come and compete you. That's basically what Snowflake did, right?

543
00:54:17,000 --> 00:54:31,000
Work already had and tear data already had cloud, you're starting that cloud version, they already had like enterprise grade, OLAP systems that they could have sold on the cloud, but they were making so much money on prem that, you know, they didn't, they didn't invest in that maybe early as they should have.

544
00:54:31,000 --> 00:54:48,000
Teradata is probably the best example of this, right? Or DB2 is another one. So this is what I was maybe seeing also early in the semester too, that like OLAP systems now more of the core engines, the kind of things we talked about in trying to semester, they basically come and commoditize.

545
00:54:48,000 --> 00:55:05,000
And now you have something like VeloX or Data Fusion where like you can get a high performance OLAP, you know, execution engine out of the box, you know, free, and then you sort of build something around it to then, you know, run queries and do other things.

546
00:55:05,000 --> 00:55:33,000
And so what makes maybe Snowflake unique in 2013, you know, is is enough anymore and it's all about the user experience is all about how good the query plan query planer is, you know, how well can you read data in S3 without crying users to do a bunch of stuff like those are the, they're harder to measure from a sort of scientific objective because there's like, you know, qualitative aspects of the system, but I think those are going to really matter a lot.

547
00:55:35,000 --> 00:55:53,000
I would say so the one area where you see like the pinos and others trying to differentiate from these other guys is that, you know, this is not really meant for real time queries like if I ingest data, you know, I want to be able to get query it almost immediately, that you're not really not going to be able to do that with these systems that well.

548
00:55:53,000 --> 00:56:19,000
And so there's these they'll call real real time OLAP systems where they're either doing heavy indexing something like rock set does this pino does this or you're doing automatic materialize use this what materialize does so there's there's systems where upon ingest of the new data you're building some additional data structures that then let you can then query almost immediately in a way that you can't really do with these these traditional OLAP systems in the cloud.

549
00:56:20,000 --> 00:56:25,000
But snowflakes not dumb, they know people want to do that so they're they're adding the room kind of stuff. They take care of these things.

550
00:56:29,000 --> 00:56:41,000
So that's, you know, it's hard to, you know, it's hard to measure, you know, how, how good someone's experience with the system is versus another without, you have to talk to humans and humans don't know what they're doing.

551
00:56:42,000 --> 00:56:45,000
And so the best you can really do is with all the form of numbers.

552
00:56:46,000 --> 00:57:01,000
So as I was saying with wretch if this is a good example of like a system that has evolved organically over the time because you know maybe start as a sort of shared nothing system even though things moving into the cloud was as we talked to the entire semester, you want to be disc I go to storage.

553
00:57:02,000 --> 00:57:14,000
But then they've changed their architecture and add additional features based on what they're seeing again they collect telemetry on everything every single query collect telemetry all these patterns and they analyze it.

554
00:57:15,000 --> 00:57:20,000
To figure out here's the things that they need to optimize or here's the things they can make things run better.

555
00:57:21,000 --> 00:57:34,000
I don't know what the paper talks about this but I'm in for credits gives this example all the time the guy the semial alum who works on redshift now that they looked at their telemetry and saw that update queries were actually running really slow and there was a lot of them.

556
00:57:35,000 --> 00:57:39,000
Which is not something you would think about if you're trying to build like an OLAP system right because you think of mostly read only data.

557
00:57:40,000 --> 00:57:50,000
So they went ahead and optimized update queries and that made a huge difference and reduced their cost made the customers happier and they can do that because they have that telemetry.

558
00:57:51,000 --> 00:58:08,000
So going back to this compilation service or this aqua thing they added they didn't add it because they thought it was cool it had a bunch FPGA sitting in the closet they had to get rid of they did it because they saw that the measurements from the data that collected that this the bottleneck let's go try to add a new component add another layer to the main thing is running.

559
00:58:09,000 --> 00:58:12,000
So that's a lot faster.

560
00:58:13,000 --> 00:58:24,000
That's another advantage of being the cloud where you see everything versus on prem where you your photo of the firewall hopefully somebody then comes back report and says this is what this is what ran slow yes.

561
00:58:24,000 --> 00:58:32,000
So I think the end of the all the scopes I had a question yes. Why is it all the academic papers looking at the CPS and all of these industry is getting CPS.

562
00:58:33,000 --> 00:58:39,000
This question is why all the academic papers looking at TPCH and why all the commercial systems using TPCDS.

563
00:58:42,000 --> 00:58:49,000
So TPCH is obviously easier to get up and running it's 22 queries versus the TPCS DS is 11 or sorry 100 queries.

564
00:58:49,000 --> 00:58:57,000
And there's CTEs and things like that so I mean the Germans can run TPCDS I don't know what they report numbers.

565
00:58:58,000 --> 00:59:09,000
But the the amount of the the matter of the new to get TPCDS running versus TPCH is much higher because you got to CTEs I don't think it's any window functions in the CPCDS.

566
00:59:10,000 --> 00:59:14,000
You got to make the query out from eyes are better it's a higher bar from academic standpoint to get that running.

567
00:59:14,000 --> 00:59:25,000
A classic another demo would be for on the old TPC side there's TPCC that's from 1992 and then there's TPCE that's from 2006 that's supposed to be the successor to TPCC.

568
00:59:26,000 --> 00:59:33,000
But nobody runs TPCE actually nobody in the commercial side usually runs it too because it's a pain in the ass actually right the code and get up and running never do ever do runs TPCC.

569
00:59:35,000 --> 00:59:39,000
I think it's so at least just from a complexity of getting the thing actually running.

570
00:59:40,000 --> 00:59:46,000
There's a lot of other sort of implications of for TPCDS as well but for TPCE there's nothing there's not much.

571
00:59:47,000 --> 00:59:50,000
I think so yeah I think it's just complexity of that.

572
00:59:51,000 --> 01:00:06,000
All right so as I said beginning Amazon make billions the B on on Reship each year right they don't report this publicly but I think AWS makes like I think 100 million a year.

573
01:00:07,000 --> 01:00:13,000
And I know that Reship is as the paper talks about was the fastest growing servers of the added in AWS.

574
01:00:14,000 --> 01:00:23,000
I think got replaced by Aurora then that was the newest fastest growing one and for all this and also I don't know what happens to have to make up but they're making a ton of money on Reship.

575
01:00:24,000 --> 01:00:34,000
But like part cell they got acquired by Action in 2013 for not much and then Action then rebranded as this thing called Action Matrix.

576
01:00:34,000 --> 01:00:46,000
But then they killed off in 2016. So at the same the beginning Amazon bought the license to park cell for maybe 20 million and they're making billions per year off of it.

577
01:00:47,000 --> 01:00:54,000
Now again there's obviously harbor costs there's labor cost to build this but obviously from their perspective that was a cut throat.

578
01:00:55,000 --> 01:00:58,000
That was a gangster move in their park.

579
01:00:59,000 --> 01:01:11,000
Here it's heard Action. Nobody. Action is what ingress became or so ingress is so ingress went public and ingress is the one the first relational systems before postgres.

580
01:01:12,000 --> 01:01:18,000
They went public in the 80s got bought by computer associates got handed off passed around over a couple years.

581
01:01:18,000 --> 01:01:34,000
They end up being a new holding company that they then changed the name from some ingress to actium and then now they basically buy up a bunch of these databases that are kind of in maintenance mode park cells and one of them they actually bought vector wise.

582
01:01:35,000 --> 01:01:44,000
That was an image that was actually they were trying to do something real with that but they bought pervasive they buy bunch of these older databases and they sort of milk maintenance fees.

583
01:01:44,000 --> 01:02:05,000
Then they got bought by another holding company at India and so they still sell ingress I think they I don't know whether because I think they still call it ingress might be wrong but so parks again sold off for 20 million so so the license for 20 million I don't know how much they got bought for but I don't think it was was that much and then it died and then red shift lives on.

584
01:02:06,000 --> 01:02:08,000
Again a lot of money and databases.

585
01:02:09,000 --> 01:02:26,000
All right so that's it for the semester this has been fun having you guys this is the first semester we've only had one person drop into our semester and it wasn't for reasons outside of their control so I can appreciate everyone being here.

586
01:02:27,000 --> 01:02:31,000
Thursday next next week we'll do the final presentations it'll be random order this time.

587
01:02:31,000 --> 01:02:53,000
Randoms random okay and then I would say I didn't pick red shift you didn't pick red shift last for any reason because it was like you know the greatest whatever I think just covers a much of stuff that we've already covered and I want to make sure I include it because it's a large system.

588
01:02:53,000 --> 01:03:15,000
I don't have office hours today because I got ahead the airport but send any send any emails if you want to talk personally this weekend or send me emails of it like you want additional information about your presentation should be and then the final again the PDF is on piazza if you have any clarification questions post that in the in piazza below okay.

589
01:03:15,000 --> 01:03:18,000
Guys good luck with your class is seeing.

590
01:03:45,000 --> 01:03:47,000
You drink it down with the guys.

