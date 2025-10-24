---
title: CMU15721 P17S202417 GoogleBigQuery⧸DremelCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Canneke Mellon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:14,000 --> 00:00:15,000
Alright, yeah.

4
00:00:15,000 --> 00:00:18,000
Just get through this. Get out early and go see the clubs.

5
00:00:18,000 --> 00:00:22,000
So, for this point in the semester,

6
00:00:22,000 --> 00:00:27,000
we're going to start reading papers about individual systems.

7
00:00:28,000 --> 00:00:31,000
Obviously, the paper you guys read today was on Google BigQuery.

8
00:00:31,000 --> 00:00:37,000
But the purpose of this part of the semester is now to examine and look at how

9
00:00:37,000 --> 00:00:41,000
companies were building real systems based on the technologies and methods and techniques

10
00:00:41,000 --> 00:00:45,000
and algorithms that we talked about throughout the entire semester.

11
00:00:45,000 --> 00:00:51,000
And the goal of this is to learn how we can read the papers from in industry.

12
00:00:51,000 --> 00:00:55,000
Some of it's a little bit marketing heavy. Some of it will be actual true systems discussions.

13
00:00:56,000 --> 00:01:02,000
But basically understand how they apply the things that we've talked about to solve the real world problems.

14
00:01:02,000 --> 00:01:08,000
And also for you to then be able to interpret and recalibrate maybe how they describe certain things

15
00:01:08,000 --> 00:01:11,000
based on the fundamentals of what we talked about.

16
00:01:11,000 --> 00:01:18,000
So, for example, sometimes you'll see systems talk about technique ABC and slightly different language that we talked about.

17
00:01:18,000 --> 00:01:20,000
But then you know because we've read certain papers.

18
00:01:20,000 --> 00:01:22,000
Oh, it's really describing this.

19
00:01:23,000 --> 00:01:26,000
Not to pick on Dremio. We'll see Dremio in a second.

20
00:01:26,000 --> 00:01:29,000
They talk about having these things called reflections.

21
00:01:29,000 --> 00:01:31,000
Like what the hell's reflection? I've never heard of that before.

22
00:01:31,000 --> 00:01:33,000
You go kind of read the documentation a bit more.

23
00:01:33,000 --> 00:01:35,000
Oh, it's just materialized views.

24
00:01:35,000 --> 00:01:40,000
So the idea is like, again, now you have this core background knowledge about how these real world systems

25
00:01:40,000 --> 00:01:41,000
are actually built.

26
00:01:41,000 --> 00:01:44,000
Then you can cut through the BS and understand what's going on.

27
00:01:44,000 --> 00:01:45,000
They call reflections.

28
00:01:45,000 --> 00:01:47,000
They call reflections.

29
00:01:47,000 --> 00:01:48,000
Yes.

30
00:01:49,000 --> 00:01:53,000
And then also too, now you also have this internal catalog you build and say,

31
00:01:53,000 --> 00:01:56,000
okay, well, in the good papers, especially in the Databricks one,

32
00:01:56,000 --> 00:01:58,000
they'll talk about, oh, we have this problem.

33
00:01:58,000 --> 00:01:59,000
So we solved it this way.

34
00:01:59,000 --> 00:02:00,000
We have this problem solved it that way.

35
00:02:00,000 --> 00:02:03,000
So again, when you go out in a real world, you'll see how, you know,

36
00:02:03,000 --> 00:02:09,000
apply those same lessons you've learned from reading these papers and other systems to different situations.

37
00:02:09,000 --> 00:02:11,000
And of course, it's always nice to understand that like,

38
00:02:11,000 --> 00:02:13,000
I didn't just make the stuff up.

39
00:02:13,000 --> 00:02:16,000
Everything we talk about this semester is real.

40
00:02:17,000 --> 00:02:22,000
So, because they said we're going to start off with Google Dremel, a big query today.

41
00:02:22,000 --> 00:02:25,000
Wednesday, we'll talk about the Databricks, Spark SQL, and Photon,

42
00:02:25,000 --> 00:02:28,000
and then Sniff Lake, Doug T. B, Yellow Brick, and Red Ship.

43
00:02:28,000 --> 00:02:34,000
So it became because of the, whatever, the stomach virus we had to drop the last one.

44
00:02:34,000 --> 00:02:38,000
And I decided to drop the Microsoft paper instead of the Yellow Brick one,

45
00:02:38,000 --> 00:02:41,000
because as he was asking about before, the Yellow Brick one is wild,

46
00:02:41,000 --> 00:02:44,000
because they do all sorts of low-level system optimizations.

47
00:02:44,000 --> 00:02:47,000
And they report real numbers in their papers.

48
00:02:47,000 --> 00:02:50,000
Whereas these other papers, you're not going to see that.

49
00:02:50,000 --> 00:02:55,000
Part of because these big companies don't want any numbers they report in these papers,

50
00:02:55,000 --> 00:02:59,000
they're used against them in like a judo marketing move by their competitors.

51
00:02:59,000 --> 00:03:02,000
But Yellow Bricks, they don't give a f***, they put all the numbers in.

52
00:03:02,000 --> 00:03:03,000
It's awesome.

53
00:03:03,000 --> 00:03:04,000
Okay.

54
00:03:04,000 --> 00:03:08,000
So the reoccurring themes we're going to have throughout the entire,

55
00:03:08,000 --> 00:03:13,000
the papers are going to read, are again, all the things that we've talked about this semester.

56
00:03:13,000 --> 00:03:16,000
So obviously the resource to segregation is separate and compute and storage.

57
00:03:16,000 --> 00:03:20,000
Like this is the Lake Alice Data Lake model where a bunch of data is on S3,

58
00:03:20,000 --> 00:03:24,000
whatever your object store is, and then we're putting query engines on top of that.

59
00:03:24,000 --> 00:03:27,000
We're also going to see the challenge of dealing the lack of statistics.

60
00:03:27,000 --> 00:03:29,000
Right? The big query papers certainly talked about this.

61
00:03:29,000 --> 00:03:34,000
We'll see this over and over again where it's a bunch of files that were uploaded into the object store

62
00:03:34,000 --> 00:03:36,000
outside of the control of the database system.

63
00:03:36,000 --> 00:03:38,000
So now you get to be query shows up.

64
00:03:38,000 --> 00:03:39,000
You want to start planning on it.

65
00:03:39,000 --> 00:03:45,000
If a cost based optimizer, what are your costs going to be based on if you don't have any statistics?

66
00:03:45,000 --> 00:03:50,000
Obviously everything is going to be a kilometer, but we also want to handle the non-relational data,

67
00:03:50,000 --> 00:03:54,000
like the JSON, in the case of the BigQuery, it was the protobuff files,

68
00:03:54,000 --> 00:03:56,000
and then vectorize execution as we talked about before.

69
00:03:56,000 --> 00:04:01,000
Again, these are our, like this thing is pretty much standard in every O-lapse system today.

70
00:04:01,000 --> 00:04:05,000
So none of the papers are really going to talk about any unique aspects of what they're doing,

71
00:04:05,000 --> 00:04:08,000
which is it'll always be that.

72
00:04:08,000 --> 00:04:14,000
All right, so let's talk about now the setup for Google's Dremel BigQuery paper.

73
00:04:14,000 --> 00:04:21,000
So maybe not in, you know, for the people that are younger here, maybe not now,

74
00:04:21,000 --> 00:04:25,000
you don't think of like Google as the hot tech company.

75
00:04:25,000 --> 00:04:30,000
Maybe like OpenAI is what everyone's excited about these days, something like that.

76
00:04:31,000 --> 00:04:41,000
But in the 2000s, Google definitely had a sizeable influence on how people thought about and design and develop data systems.

77
00:04:41,000 --> 00:04:49,000
And even to this day, I would say their pushes maybe, or influence in the menus, not as strong as it used to be,

78
00:04:49,000 --> 00:04:54,000
simply because the technologies have been spread out for a little bit further.

79
00:04:54,000 --> 00:04:56,000
Now obviously LLMs are the hot thing.

80
00:04:57,000 --> 00:05:03,000
But back then, you know, pretty much any time Google put out a paper, a research paper that said, hey,

81
00:05:03,000 --> 00:05:08,000
here's this system we built internally at Google, that everyone read it, everyone got really excited,

82
00:05:08,000 --> 00:05:11,000
and then people started building open source clones of these things.

83
00:05:11,000 --> 00:05:15,000
Because the mindset in some ways was, well, Google's super successful.

84
00:05:15,000 --> 00:05:20,000
Google can operate at scale if we need, you know, if our company wants to be successful,

85
00:05:20,000 --> 00:05:22,000
then we need basically the same stuff that they're building.

86
00:05:23,000 --> 00:05:29,000
Because Google didn't release their things as open source, at least in the beginning didn't release their things as services.

87
00:05:29,000 --> 00:05:34,000
They just like, hey, here's this paper written by Jeff Dean and others, who are obviously very smart people,

88
00:05:34,000 --> 00:05:38,000
but everyone's like, okay, they scram would then re-implement everything.

89
00:05:38,000 --> 00:05:46,000
So this is sort of an incomplete list of a bunch of the database systems or data systems that Google has developed over the years that have been very influential.

90
00:05:46,000 --> 00:05:49,000
And I'm sort of subdivided into two groups.

91
00:05:49,000 --> 00:05:53,000
At the top here, you have all the no-sequel systems, right?

92
00:05:53,000 --> 00:05:59,000
Because Google was the, you know, without maybe coming out and saying yes we're a no-sequel company,

93
00:05:59,000 --> 00:06:04,000
but they certainly were at the forefront of the vanguard of the no-sequel data movement, right?

94
00:06:04,000 --> 00:06:07,000
And you saw this in the paper you guys read.

95
00:06:07,000 --> 00:06:15,000
And then there's all these other systems in the late early 2000s, you know, in sorry late 2010,

96
00:06:15,000 --> 00:06:21,000
early 2010s and going forward where Google realized, oh, sequel was actually a good idea,

97
00:06:21,000 --> 00:06:25,000
and then started adding, you know, starting building systems around this.

98
00:06:25,000 --> 00:06:34,000
Again, in the paper you guys read, there's this paragraph right here that talks about how the conventionalism Google was sequel didn't scale, right?

99
00:06:34,000 --> 00:06:40,000
And then again, everyone else sort of followed along with Bandwagon and was designing systems based on some of these early ideas.

100
00:06:40,000 --> 00:06:44,000
Because Mongo is probably the biggest ones, right?

101
00:06:44,000 --> 00:06:50,000
Or people were saying we don't want to use sequel, sequel doesn't scale, we don't want to use joins.

102
00:06:50,000 --> 00:06:52,000
And then now the tide has turned out.

103
00:06:52,000 --> 00:06:57,000
And so the Dremel guys talk about how they see themselves as the ones that actually made Google,

104
00:06:57,000 --> 00:07:04,000
which are made SQL cool again or important again or matter again in Google.

105
00:07:04,000 --> 00:07:11,000
So a lot of these systems have size influence in a bunch of different data systems and other data systems.

106
00:07:11,000 --> 00:07:16,000
And as I said, a lot of these things started off as early research papers that Google put out.

107
00:07:16,000 --> 00:07:26,000
And typically the way industry companies put out papers is it's usually about two or three, maybe even four or five years behind what actually the state of the art is.

108
00:07:26,000 --> 00:07:31,000
So like they'll build the system, you know, get it up and running, file the patents for it.

109
00:07:31,000 --> 00:07:37,000
And then they'll write the paper by the behind the paper comes out again, it's a couple years old.

110
00:07:37,000 --> 00:07:44,000
But Matt produced obviously was it was very influential, you know, maybe her dude made Spark.

111
00:07:44,000 --> 00:07:48,000
Big table was clone, just eight basic human little hyper table and so forth.

112
00:07:48,000 --> 00:07:51,000
Level DB was was this deal when they actually didn't open the source.

113
00:07:51,000 --> 00:07:55,000
And then got forked off as rocks DB box DB is more common now.

114
00:07:55,000 --> 00:07:58,000
And then there's other example, they almost down here.

115
00:07:58,000 --> 00:08:03,000
And there's a few other like for sellers from YouTube and there's just the paper that's not on source.

116
00:08:03,000 --> 00:08:07,000
There's a couple of systems like a list here that it sort of forgot or just having that in every room.

117
00:08:07,000 --> 00:08:08,000
Yes.

118
00:08:08,000 --> 00:08:12,000
Why is the we just look at Dremel and not the other ones actually look like others.

119
00:08:12,000 --> 00:08:15,000
So why why are we looking at this one not these up?

120
00:08:16,000 --> 00:08:21,000
Especially why we why we why do you care about Dremel in this class and not these other ones?

121
00:08:21,000 --> 00:08:24,000
Because Dremel is the only one that's doing analytics on the Olapp stuff.

122
00:08:24,000 --> 00:08:29,000
Megastore was a early chart a version of my CO2 transactions.

123
00:08:29,000 --> 00:08:31,000
The test is started my sequel out of YouTube.

124
00:08:31,000 --> 00:08:33,000
Spanner I would just know about transaction.

125
00:08:33,000 --> 00:08:34,000
These are all transactional ones.

126
00:08:34,000 --> 00:08:39,000
Napa's sort of getting into the realm of like doing analytics, but it does.

127
00:08:39,000 --> 00:08:42,000
Well, we can talk a little bit maybe next class.

128
00:08:43,000 --> 00:08:51,000
The context is like Delta Lake or iceberg, but Napa's all about like doing Dremel style analytics on historical data,

129
00:08:51,000 --> 00:08:54,000
but I'm also incorporating newly ingested data.

130
00:08:54,000 --> 00:09:00,000
And I can make a trade off between how much do I'm going to read from the we only paid the cost of the road data.

131
00:09:00,000 --> 00:09:04,000
I just just inserted versus like the historical data and then Delta Lake iceberg.

132
00:09:04,000 --> 00:09:05,000
They're all doing something.

133
00:09:05,000 --> 00:09:06,000
Something's in there.

134
00:09:06,000 --> 00:09:07,000
Yeah.

135
00:09:07,000 --> 00:09:11,000
But again, part of the reason I'm again, there's a question why before using Dremel.

136
00:09:11,000 --> 00:09:13,000
It's a very influential paper.

137
00:09:13,000 --> 00:09:18,000
This is pretty much how every lake house engines we built today.

138
00:09:18,000 --> 00:09:19,000
Yes.

139
00:09:19,000 --> 00:09:22,000
What do you mean only for market?

140
00:09:22,000 --> 00:09:25,000
So I have an asterisk for Cochish DB and Title B on the market.

141
00:09:25,000 --> 00:09:31,000
Because when these systems first came out, the Cochish DB guys certainly worked at Google, but they didn't work on Spanner.

142
00:09:31,000 --> 00:09:36,000
And then Title B gives nothing to do with Spanner.

143
00:09:36,000 --> 00:09:39,000
Spanner was like the hot thing for transaction debuts.

144
00:09:39,000 --> 00:09:50,000
So these guys were maybe they explicitly didn't say it, but others are saying it and they didn't correct them that these are open source variants of Spanner.

145
00:09:50,000 --> 00:09:58,000
But the case of Cochish DB is and Title B is not the case because Spanner relies on this true time service with like GPS clocks and atomic clocks.

146
00:09:58,000 --> 00:10:00,000
Part of the true time hardware service.

147
00:10:00,000 --> 00:10:02,000
Cochish DB is doing everything in software.

148
00:10:02,000 --> 00:10:13,000
So again, certainly now they're not going to like say that they're open source version of Spanner, but if you use Google open source Spanner, you probably get Cochish DB Title B.

149
00:10:13,000 --> 00:10:14,000
Yes.

150
00:10:14,000 --> 00:10:19,000
So he said that lots of like every link house is based on a lot of ideas from.

151
00:10:19,000 --> 00:10:20,000
Yes.

152
00:10:20,000 --> 00:10:26,000
I also know that data bridge is a cranny itself as the ones who are infected with them.

153
00:10:26,000 --> 00:10:28,000
So wondering who you think is more important.

154
00:10:28,000 --> 00:10:38,000
His question is like I'm saying that all these lake house systems are based on the high level architecture of Dremel, but then the data bridge guys they're the one that branded the lake house term.

155
00:10:38,000 --> 00:10:39,000
Right.

156
00:10:39,000 --> 00:10:41,000
But that's just marketing again.

157
00:10:41,000 --> 00:10:42,000
Right.

158
00:10:42,000 --> 00:10:44,000
The Trino guy say no, it's not lake house.

159
00:10:44,000 --> 00:10:45,000
You want an ice house.

160
00:10:45,000 --> 00:10:46,000
Right.

161
00:10:46,000 --> 00:10:55,000
So it's just marketing, but the idea of a disaggregated storage, a vectorized execution engine that can read data that it's never seen before.

162
00:10:55,000 --> 00:11:00,000
All that is come from Dremel.

163
00:11:00,000 --> 00:11:12,000
There's other aspects though I think like, you know, it's in case of snowflake like snowflake was doing the vector execution or actually more significantly like vector wise vector wise was doing the paper guys read all that vector execution stuff.

164
00:11:12,000 --> 00:11:18,000
Like that's prevalent and everything and that's that's common now in a lake house system, but they weren't calling in a lake house back in the day.

165
00:11:18,000 --> 00:11:20,000
It's just a marketing term.

166
00:11:20,000 --> 00:11:21,000
Yes.

167
00:11:21,000 --> 00:11:31,000
So the original papers like 2011, right.

168
00:11:31,000 --> 00:11:38,000
I think in the paper they say it came out it was like a side project in 2006 or something.

169
00:11:38,000 --> 00:11:44,000
I think I'm putting the day here based on.

170
00:11:44,000 --> 00:11:52,000
Yeah, some of the dates are inside of this like like this is one of his first known the pay to the paper you guys read is the 10 year rep perspective of the original paper.

171
00:11:52,000 --> 00:12:00,000
The original paper is 2011, but I think that paper mentions that somebody was building in 2006 has originally shared nothing system.

172
00:12:00,000 --> 00:12:01,000
Right.

173
00:12:01,000 --> 00:12:06,000
It's just like the test of time award you.

174
00:12:06,000 --> 00:12:11,000
Yeah, so whatever I'm off by here, but again, even in the paper, he says they started earlier.

175
00:12:11,000 --> 00:12:13,000
Yeah, okay.

176
00:12:13,000 --> 00:12:14,000
Whatever.

177
00:12:14,000 --> 00:12:25,000
Again, I, Napa, I know these guys are building this since 2017, 18, but I was under NDA and couldn't say that but like the paper came out in 2021.

178
00:12:25,000 --> 00:12:28,000
This is where the lake house is not.

179
00:12:28,000 --> 00:12:29,000
Napa?

180
00:12:29,000 --> 00:12:30,000
No, it's.

181
00:12:30,000 --> 00:12:31,000
It's a gift.

182
00:12:31,000 --> 00:12:33,000
You're using it's analytics and it does.

183
00:12:33,000 --> 00:12:36,000
It does like you just, you won't get the details.

184
00:12:36,000 --> 00:12:39,000
You just data and it gets appended into the system.

185
00:12:39,000 --> 00:12:42,000
I don't know whether that ingestion process is just transactional not.

186
00:12:42,000 --> 00:12:43,000
Okay.

187
00:12:43,000 --> 00:12:55,000
And then they have this notion of like, do I care about when I run queries, I specify, do I want to run fastest possible and then maybe and then give up like reading the fresh data or do I give up?

188
00:12:55,000 --> 00:13:00,000
Do I want to read the fresh data and pay them more extra money to get faster?

189
00:13:00,000 --> 00:13:02,000
Like they have a gut, like a sort of.

190
00:13:02,000 --> 00:13:08,000
You have the objective function like in terms of triangle not just cost and form but also like freshness.

191
00:13:08,000 --> 00:13:09,000
Yeah.

192
00:13:09,000 --> 00:13:13,000
Again, I mean, for this class, let's focus on drumming.

193
00:13:13,000 --> 00:13:19,000
They gave a talk a year or two ago during the pandemic with us about Napa.

194
00:13:19,000 --> 00:13:21,000
It's a good talk.

195
00:13:21,000 --> 00:13:22,000
All right.

196
00:13:22,000 --> 00:13:23,000
All right.

197
00:13:23,000 --> 00:13:24,000
I already said 2006.

198
00:13:24,000 --> 00:13:25,000
Right.

199
00:13:25,000 --> 00:13:27,000
This was a side project.

200
00:13:27,000 --> 00:13:31,000
I go with like 20% time, like one day a week, they were allowed to work on this.

201
00:13:31,000 --> 00:13:45,000
And the idea, the original problem they were trying to solve was there's all these artifacts being generated from different tools and services all throughout Google that is showing up on GFS and an internal file system.

202
00:13:45,000 --> 00:13:54,000
And the idea was they want to be able to run queries on top of this data through SQL rather than writing this C++ map, reduced jobs.

203
00:13:54,000 --> 00:14:01,000
Again, just going back to like the mid 2000s and Google saying that they don't want to use SQL.

204
00:14:01,000 --> 00:14:03,000
Everyone's writing these map reduced jobs.

205
00:14:03,000 --> 00:14:06,000
Hadoop, the open source version of map reduced was in Punjabah.

206
00:14:06,000 --> 00:14:08,000
The Google version was all in C++.

207
00:14:08,000 --> 00:14:14,000
So you have to write now C++ code to do scans and joins and data.

208
00:14:14,000 --> 00:14:15,000
It's terrible.

209
00:14:15,000 --> 00:14:17,000
All right.

210
00:14:17,000 --> 00:14:28,000
So the idea was they wanted to be able to just have a bunch of files sit around on disk, sorry, in shared storage and adjusted.

211
00:14:28,000 --> 00:14:36,000
Although the first version actually was a shared nothing system, meaning like you had to ingest the data into the system and then it got in turn, you know, got cataloged.

212
00:14:36,000 --> 00:14:51,000
And then the 2010 rewrite was, should we late 2000 or 2010s, they rewrote it and now be the disk I got to storage where just reading data directly off of Google files doesn't work GFS.

213
00:14:51,000 --> 00:14:55,000
And then this was the first paper came out and didn't think 2010.

214
00:14:55,000 --> 00:15:02,000
And then it was got commercialized in as BigQuery in 2012.

215
00:15:02,000 --> 00:15:10,000
And the reason why I had you guys read the follow up paper rather than the original paper because the original paper doesn't talk about the shuffle service, which this one does.

216
00:15:10,000 --> 00:15:21,000
And that's actually a key thing that separates BigQuery from other systems and allows them to do some interesting optimizations that other systems can't can easily do.

217
00:15:21,000 --> 00:15:28,000
Does anybody know what a drum is that's kind of a database?

218
00:15:28,000 --> 00:15:31,000
What is this hand gesture?

219
00:15:31,000 --> 00:15:32,000
It's a tool.

220
00:15:32,000 --> 00:15:35,000
Yeah, it's a tool, right? So there's a footnote in the paper.

221
00:15:35,000 --> 00:15:39,000
It's a brand of power tools, primarily used of speed, a poster torque, right?

222
00:15:39,000 --> 00:15:46,000
It's more or less the minute or so. It's just like a rotary drill, like a grinder and user things.

223
00:15:46,000 --> 00:15:56,000
I'm always surprised that like their lawyers let them put out like a paper that says, hey, we have this, we have this internal service for a multi billion dollar company.

224
00:15:57,000 --> 00:16:03,000
And we've named it after another company, right? That's asking for a lawsuit, but they did it.

225
00:16:03,000 --> 00:16:08,000
And again, but then the commercial version that they, they, they, they, you know, smartly renamed it as BigQuery.

226
00:16:08,000 --> 00:16:17,000
So all the documentation you'll see online for what drum was actually doing, you know, it'll be called BigQuery, but for better reason the papers are still referred to as a drum.

227
00:16:17,000 --> 00:16:22,000
All right, so this notion of in situ data processing, we've already covered this many times out of the semester.

228
00:16:23,000 --> 00:16:32,000
It just means that I have a bunch of files that are sitting out in some storage that's separate or not under the control of the database system.

229
00:16:32,000 --> 00:16:38,000
And something else is going to be putting files there and people then want to run queries on top of them.

230
00:16:38,000 --> 00:16:43,000
So obviously I need to be able to have a way to know what the files are in some kind of catalog, right?

231
00:16:43,000 --> 00:16:47,000
And reference it to, you know, some table or some logical identifiers.

232
00:16:47,000 --> 00:16:54,000
I say if you want to read this clutch and data or table food, whatever you want to call it, here's the files where to go get it.

233
00:16:54,000 --> 00:16:59,000
But other than that, the database system doesn't necessarily need to know anything.

234
00:16:59,000 --> 00:17:06,000
Now when we read snowflake next week, snowflake had what we call manage storage where you ingest data into the data system.

235
00:17:06,000 --> 00:17:11,000
And then snowflake is responsible for deciding how to chop it up and where to store it and understand everything about it.

236
00:17:12,000 --> 00:17:16,000
And the newer versions of snowflake now they have the support, you know, this link house architecture.

237
00:17:16,000 --> 00:17:20,000
So they now support reading data from iceberg files.

238
00:17:20,000 --> 00:17:23,000
Same thing with Redshift. They originally started out being shared nothing system.

239
00:17:23,000 --> 00:17:27,000
Everything was all manage storage. Now with Athena, you can read files on S3.

240
00:17:27,000 --> 00:17:28,000
Yes.

241
00:17:28,000 --> 00:17:32,000
The snowflake may also charge the ETL cost between moving that into the app.

242
00:17:32,000 --> 00:17:39,000
It's question is to snowflake charge the ETL cost from getting data from like from from from from storage into prepared storage?

243
00:17:40,000 --> 00:17:41,000
Sure they do, right?

244
00:17:41,000 --> 00:17:46,000
Let me do a much more product because if they have extra steps that they have to do.

245
00:17:46,000 --> 00:17:51,000
His question is, does it make it much work product that they actually have to do?

246
00:17:51,000 --> 00:17:57,000
Well, the policy for that now, right?

247
00:17:57,000 --> 00:18:01,000
Again, it's not always like cost matters but performance matters.

248
00:18:01,000 --> 00:18:03,000
There's so many different factors to say like is it a bad product?

249
00:18:04,000 --> 00:18:06,000
I'm not trying to be a cop out.

250
00:18:06,000 --> 00:18:14,000
Like, you know, the corporate masters are just saying like, depending on different different scenarios, that may or may not be a good idea.

251
00:18:14,000 --> 00:18:17,000
But the fact they do support it now is a good thing, right?

252
00:18:20,000 --> 00:18:25,000
And as we've seen throughout the semester, all these systems, when they, you have a bunch of files in some format,

253
00:18:25,000 --> 00:18:30,000
you know, we've seen this in the, the team is working on the, the caching server, the IO server is here.

254
00:18:31,000 --> 00:18:34,000
You're going to convert it into arrow or some other internal format, then process it anyway, right?

255
00:18:34,000 --> 00:18:37,000
So, you know, who pays for that cost?

256
00:18:37,000 --> 00:18:40,000
It depends on the pricing model.

257
00:18:41,000 --> 00:18:50,000
So, again, this is, this is, this is the idea of Dremel, what they were trying to do was, you know, reading, eating files where they exist, right?

258
00:18:50,000 --> 00:18:52,000
This is what we need my data lake or the lake house stuff.

259
00:18:52,000 --> 00:18:55,000
Again, this is just a marketing term, but Dremel is doing it long ago.

260
00:18:56,000 --> 00:19:02,000
And the paper they point out that one of the key reasons that they went with this, you know, trying to support this capability,

261
00:19:02,000 --> 00:19:14,000
just reading files where they exist, is that it was better to have the, their users were willing to sacrifice performance of having like native, natively managed data.

262
00:19:16,000 --> 00:19:24,000
They were rather sacrificed that performance in terms of the flexibility or the ease of use, meaning like, I don't have to, you know, define a schema.

263
00:19:25,000 --> 00:19:32,000
Then load a files into my schema, then run queries on it, right? Because that, there's a human cost to that, like, you know, labor cost.

264
00:19:32,000 --> 00:19:40,000
It's rather, yeah, my queries are going to run a bit slower because I'm reading a bunch of files that maybe not being the best format for my data system, but that's okay because I can just get to it really quickly.

265
00:19:41,000 --> 00:19:47,000
And for my perspective, yes, I think this is the right trade-off, and then SQL is typically the right abstraction you would want to do this.

266
00:19:48,000 --> 00:19:55,000
So for all the systems that we're going to look at for the next few weeks, we're going to need sort of this same kind of summary page like this.

267
00:19:55,000 --> 00:20:01,000
We're going to hit all the high-level aspects of the system as it relates to all the things we talked about throughout the semester.

268
00:20:01,000 --> 00:20:08,000
So again, a lot of this is going to be cable sticks. There's just things that you would expect in modern Lake House or O-Lat engine to be able to support.

269
00:20:09,000 --> 00:20:16,000
So share disk aggregate storage. That's to be expected, vectorized query processing, as we said, the papers aren't going to say anything deep about it.

270
00:20:17,000 --> 00:20:23,000
Other than I know that BigQuery is using Trenzix, because we asked them. The paper doesn't say that though.

271
00:20:24,000 --> 00:20:26,000
The shuffle-based distributed execution will get in a second.

272
00:20:29,000 --> 00:20:35,000
Google is going to have their own proprietary format called Capacitor. We'll see that in a second, although there's not a lot of details about it.

273
00:20:36,000 --> 00:20:41,000
But it's basically going to look like Parking orc, and I'm sure people are generating Parking orc files internally at Google.

274
00:20:42,000 --> 00:20:44,000
But for this common storage, they're going to use all the tricks we talked about.

275
00:20:45,000 --> 00:20:53,000
So zone maps, filters, dictionary and early compression. The only index they support in BigQuery, the service, is inverted search indexes.

276
00:20:54,000 --> 00:20:59,000
Right to do like, you know, like in regular expression lookups on strings.

277
00:20:59,000 --> 00:21:12,000
They're all in the export hash joins, and then there's a combination of a heuristic optimizer and a very light call-space optimizer when you have some statistics, and usually they don't.

278
00:21:13,000 --> 00:21:18,000
And they're going to rely heavily on the ability to adapt the query plan while it's running based on the data it sees.

279
00:21:20,000 --> 00:21:24,000
So we're saying those right time talking about this, because this is going to allow us to do things that we couldn't easily before.

280
00:21:25,000 --> 00:21:34,000
And this also is the transition to what we've been talking about in the entire semester, where we were talking about how do we build the single node execution in first, and then now start gluing it together.

281
00:21:35,000 --> 00:21:38,000
And these systems, especially with this shovel, is one way to start gluing it together.

282
00:21:42,000 --> 00:21:53,000
So when the query shows up, the data system is going to convert it into a logic plan and then divide that into stages, roughly correspond to pipelines, but not always necessarily.

283
00:21:55,000 --> 00:22:00,000
And then within these stages, you're going to have multiple parallel tasks that I'm going to distribute it across the workers.

284
00:22:01,000 --> 00:22:15,000
And one key aspect of their query plan is that they need a guarantee that every task you would execute is going to be deterministic, meaning if I execute it over and over again with the same data, I should produce the exact same result.

285
00:22:16,000 --> 00:22:23,000
And it's going to be item potent, and this is going to allow them to have the ability to restart or kill a straggler or a task that's running slow.

286
00:22:24,000 --> 00:22:29,000
And then we execute on another task on another worker and be guaranteed to produce the same results.

287
00:22:30,000 --> 00:22:42,000
So think of things like, if I have a random, call the random function in my query, I need a guarantee that no matter what worker I run on, when I invoke that random function, I get the same sequence of values.

288
00:22:43,000 --> 00:22:45,000
Are times another one too?

289
00:22:45,000 --> 00:22:54,000
Yes, deterministic in terms of how it's going to run and also producing the same result.

290
00:22:55,000 --> 00:22:56,000
So that's item potent, yes.

291
00:22:58,000 --> 00:23:05,000
So there'll be a root node of the coordinator that's going to be responsible for dispatching all the tasks.

292
00:23:06,000 --> 00:23:11,000
They talk about having a centralized schedule, but the coordinator is sort of setting things up and then handing things off to the scheduler.

293
00:23:11,000 --> 00:23:31,000
And what's interesting they talk about, and we'll see this, I think also in the snowflake paper as well, is that if you have all the workers going out to the catalog, the metadata, just sort of say, what's the files that I need, when they start executing the task, then you could have thousands of workers all of a sudden flooding the catalog with all these requests.

294
00:23:31,000 --> 00:23:41,000
So instead the root node is going to do a batch request to the catalog, be it all the metadata about the files is going to scan ahead of time, and then embed that nological plan.

295
00:23:42,000 --> 00:23:48,000
So now when you hand the tasks off to the workers, they don't have to do look at the catalog, they have everything they need to know of how to process the beginning.

296
00:23:50,000 --> 00:24:00,000
Every worker at the node is going to have its own local memory and local disk, and then if they run out of memory while they're processing that given task, they'll be able to spill to that disk and spool it back in.

297
00:24:01,000 --> 00:24:08,000
So this is going to be the same as needed, but then also we'll see in a second they're going to write out the results to a remote memory service.

298
00:24:09,000 --> 00:24:18,000
So this is a really simple query plan, doing a look up to get the number of articles and Wikipedia with my name in it, or Pablo.

299
00:24:19,000 --> 00:24:24,000
There's some other asshole Greeks singer named Pablo too, and he might be in there.

300
00:24:24,000 --> 00:24:29,000
I used to be when I was younger, like you just Google Pablo, I'd come up first, now the other guy is, but whatever.

301
00:24:29,000 --> 00:24:32,000
So we have an distributive file system, a bunch of data we want to access.

302
00:24:33,000 --> 00:24:37,000
In the first age of the corner it says, okay, I'm going to fire a bunch of these workers.

303
00:24:38,000 --> 00:24:48,000
This is what I'm going to do on a partial group by, and then these workers are responsible for pulling the data that they need from the shared disk storage, and then doing what they're processing on it.

304
00:24:49,000 --> 00:24:55,000
And then now the output of these workers are not going to go to the next age of workers, instead they're going to go to this in memory shuffle service.

305
00:24:55,000 --> 00:25:05,000
So all of the worker nodes are going to be writing out their data to this, thinking this is like an in memory key value store that's partitioned or scaled out horizontally.

306
00:25:06,000 --> 00:25:12,000
So I can hash whatever the data I'm looking at and decide what, you know, send it to what shuffle node I need.

307
00:25:13,000 --> 00:25:24,000
And then now the shuffle node can then send additional metadata about, here's the data I saw for this first stage, for this query, to the coordinator, and the coordinator can slide on the fly, how many workers that it should use for the next stage.

308
00:25:25,000 --> 00:25:30,000
And then it spins up, you know, it's missed that request to the schedule that fires up these workers.

309
00:25:31,000 --> 00:25:34,000
And then these guys are going to pull data from the memory shuffle.

310
00:25:35,000 --> 00:25:42,000
So they're not going to communicate from working worker to the next across the stages, they're always going to use this in memory shuffle as an intermediary.

311
00:25:45,000 --> 00:25:46,000
Yes.

312
00:25:46,000 --> 00:25:47,000
Yes.

313
00:25:47,000 --> 00:25:48,000
It's a question.

314
00:25:48,000 --> 00:25:49,000
Yes.

315
00:25:49,000 --> 00:25:51,000
Is the in memory shuffle a single node thing or it's like this very quick?

316
00:25:51,000 --> 00:25:54,000
Is it single node or scaled out?

317
00:25:54,000 --> 00:25:55,000
Scaled out.

318
00:25:55,000 --> 00:25:56,000
Scale out.

319
00:25:56,000 --> 00:26:00,000
Why not just make them like map or do you stuff it?

320
00:26:00,000 --> 00:26:03,000
Which they, you can talk like workers talk to each other.

321
00:26:03,000 --> 00:26:05,000
These questions, why am I doing this?

322
00:26:05,000 --> 00:26:13,000
Like, why I had this extra step to go to this piece versus having to have the worker just pull the data from the worker itself?

323
00:26:13,000 --> 00:26:23,000
Right? There's performance implications of like, if now we're thought, if I can kill all these guys and then reason the test for other things,

324
00:26:23,000 --> 00:26:26,000
and this thing is just maintaining the data.

325
00:26:26,000 --> 00:26:31,000
And then, you know, otherwise I got to keep this thing around so that make sure they get all the data that they need.

326
00:26:31,000 --> 00:26:38,000
Because what happens if like, say one of these guys down, go down, then I got to go back to the previous worker and get the data again.

327
00:26:39,000 --> 00:26:46,000
And then, as I said, we'll see in a second, this having to step and then like get all the data I need from this first stage,

328
00:26:46,000 --> 00:26:48,000
then I can decide what to do in the next stage.

329
00:26:48,000 --> 00:26:50,000
Because I've seen the data.

330
00:26:50,000 --> 00:26:54,000
Because I now have it in a sort of central location that I can pass along to the coordinator.

331
00:26:54,000 --> 00:26:58,000
Does it live for longer than just one cycle?

332
00:26:58,000 --> 00:27:01,000
Like, do you keep that memory for a very long time?

333
00:27:01,000 --> 00:27:05,000
The question is, do I keep this memory around for a very long time?

334
00:27:05,000 --> 00:27:09,000
What the content of the memory or the service itself?

335
00:27:09,000 --> 00:27:11,000
The service is always running.

336
00:27:11,000 --> 00:27:17,000
Right, but I mean the context of memory in a sense that, so we're waiting for all of those three workers to finish, right?

337
00:27:17,000 --> 00:27:21,000
So that we can then erase that in memory shop, where we have them there.

338
00:27:21,000 --> 00:27:23,000
So when you get to the next stage?

339
00:27:23,000 --> 00:27:25,000
Yes, and what point is this going away?

340
00:27:25,000 --> 00:27:26,000
Yeah.

341
00:27:26,000 --> 00:27:30,000
The coordinator would come back and say, all right, I've completed this stage, everybody's got the data.

342
00:27:30,000 --> 00:27:33,000
It's still need to get past this stage, right?

343
00:27:33,000 --> 00:27:36,000
Because again, these guys could crash and you need to go fetch it again.

344
00:27:36,000 --> 00:27:40,000
But once you know that nobody else is going to go back to the data you need, you can leak them below their way.

345
00:27:40,000 --> 00:27:50,000
No, that needs to be like a shift on the memory and also, like the worker can die, but this can die too, right?

346
00:27:50,000 --> 00:27:54,000
But it's just a key value store. There's no techniques to replicate some scale itself, right?

347
00:27:54,000 --> 00:27:56,000
It's even crazier.

348
00:27:56,000 --> 00:27:59,000
They actually fab custom hardware to make this go as fast as possible.

349
00:27:59,000 --> 00:28:00,000
Oh.

350
00:28:00,000 --> 00:28:01,000
Yeah.

351
00:28:01,000 --> 00:28:02,000
It's awesome.

352
00:28:02,000 --> 00:28:03,000
Yes.

353
00:28:03,000 --> 00:28:08,000
Why not just keep track of the method that actually changes the data and the data.

354
00:28:08,000 --> 00:28:12,000
The question is, why not keep track of metadata rather than stream all the data here?

355
00:28:12,000 --> 00:28:13,000
But where do you keep in the data?

356
00:28:13,000 --> 00:28:15,000
Here, right?

357
00:28:15,000 --> 00:28:21,000
And these guys can't go away until you've gotten the data over there.

358
00:28:21,000 --> 00:28:28,000
So in macro music, I get worse that you can get data getting much to this, because that speed of media results might be too big in size.

359
00:28:28,000 --> 00:28:29,000
Yep.

360
00:28:29,000 --> 00:28:34,000
What you're doing as you may know that the memory is like this big enough to show all that.

361
00:28:34,000 --> 00:28:37,000
And then, isn't that what Spark also like does?

362
00:28:37,000 --> 00:28:39,000
Like, is that information about view of Spark?

363
00:28:39,000 --> 00:28:40,000
So there's two things.

364
00:28:40,000 --> 00:28:47,000
One is in Hadoop, the right to local disk here, because you might run a memory, whereas in this case here,

365
00:28:47,000 --> 00:28:50,000
it's just so massive that you're not going to run out of memory.

366
00:28:50,000 --> 00:28:53,000
This thing you can spell to disk too, we'll see in a second, right?

367
00:28:54,000 --> 00:28:58,000
And actually, it'll spell to GFS or Colossus, the Google file system.

368
00:28:58,000 --> 00:29:02,000
And then your second comment is, isn't Spark is doing?

369
00:29:02,000 --> 00:29:08,000
Spark still, I think, maintains the shuffle data on the worker nodes.

370
00:29:08,000 --> 00:29:10,000
Yeah, it actually does the same thing in the map.

371
00:29:10,000 --> 00:29:13,000
You just, the in and everything happens after station faces.

372
00:29:13,000 --> 00:29:15,000
Because my purpose is do something like that.

373
00:29:15,000 --> 00:29:19,000
Where it seems to be happening between maps, which is...

374
00:29:19,000 --> 00:29:22,000
So this is not a...

375
00:29:22,000 --> 00:29:29,000
Like, Dremel or even Matt Perdue's who didn't have this idea of this like shuffle step.

376
00:29:29,000 --> 00:29:30,000
That's the distributed data.

377
00:29:30,000 --> 00:29:33,000
This is parallel to this from the 80s and 90s, right?

378
00:29:33,000 --> 00:29:39,000
Which unique about BigQuery and Dremel is that they explicitly do this from every stage.

379
00:29:39,000 --> 00:29:41,000
Snowflake does have a shuffle.

380
00:29:41,000 --> 00:29:45,000
You can do shuffles as well, but they only use it as needed.

381
00:29:45,000 --> 00:29:48,000
They do this for everything.

382
00:29:49,000 --> 00:29:50,000
Yes.

383
00:29:50,000 --> 00:29:52,000
Are there disadvantages to always doing this?

384
00:29:52,000 --> 00:29:54,000
Like, what if you want the data on the same thing?

385
00:29:54,000 --> 00:29:56,000
The question is, are there disadvantages of doing this?

386
00:29:56,000 --> 00:29:58,000
What if you always want data on the same worker?

387
00:29:58,000 --> 00:29:59,000
Ah, okay.

388
00:29:59,000 --> 00:30:01,000
So this is what I've been saying before.

389
00:30:01,000 --> 00:30:05,000
I think I said back here, the...

390
00:30:05,000 --> 00:30:09,000
The call stages, they're not always pipeline breakers though.

391
00:30:09,000 --> 00:30:15,000
In some cases, you can have the second stage kick off

392
00:30:15,000 --> 00:30:18,000
while this stage is still running, right?

393
00:30:18,000 --> 00:30:21,000
And you can start processing ahead of time.

394
00:30:21,000 --> 00:30:22,000
Right?

395
00:30:22,000 --> 00:30:26,000
So that's one advantage there that you could start doing this.

396
00:30:26,000 --> 00:30:30,000
You could have this thing get fired up and certain reading the data before these guys even finish.

397
00:30:30,000 --> 00:30:31,000
Right?

398
00:30:31,000 --> 00:30:35,000
From a software engineering standpoint, also too, that now you no longer have to...

399
00:30:35,000 --> 00:30:42,000
In bed logic of how to like scale up or scale down or do other organizations will see in a second,

400
00:30:42,000 --> 00:30:45,000
at all your workers.

401
00:30:45,000 --> 00:30:47,000
Because now, it's just like...

402
00:30:47,000 --> 00:30:51,000
It's just a coordinator says, okay, I need more workers do this way or move the data here and there.

403
00:30:51,000 --> 00:30:56,000
And from a software engineering perspective, like the worker implementation is much more simple now.

404
00:31:00,000 --> 00:31:05,000
Right? So again, at the end, the last stage you're doing certain limit, one worker can handle that.

405
00:31:05,000 --> 00:31:09,000
As far as I know, these are just like containers and running in Bork,

406
00:31:09,000 --> 00:31:12,000
which is the precursor to Kubernetes.

407
00:31:12,000 --> 00:31:14,000
Right? So there's meant to be stateless.

408
00:31:14,000 --> 00:31:17,000
So these things can get Kaelin swapped out at any time.

409
00:31:17,000 --> 00:31:22,000
Is that why they're doing the memory shuffle because they're supposed to be stateless and they don't want to keep them alive?

410
00:31:22,000 --> 00:31:24,000
Something stateless, alive?

411
00:31:24,000 --> 00:31:29,000
It's a question. Is that why they're doing the memory shuffle because these things are stateless and don't keep them alive?

412
00:31:29,000 --> 00:31:32,000
Potential. I mean, it's one of the ideas, yes.

413
00:31:32,000 --> 00:31:38,000
But again, there's database query plan advantages

414
00:31:38,000 --> 00:31:43,000
that we can leverage if we have this extra stage. We'll see in a second.

415
00:31:43,000 --> 00:31:48,000
So the shuffle, it's basically a producer consumer model.

416
00:31:48,000 --> 00:31:52,000
It's just a way to send the image results from one stage to the next.

417
00:31:52,000 --> 00:32:01,000
Using this dedicated service, and then saying this in the paper talks about like this MRE service is used not just for Dremel.

418
00:32:01,000 --> 00:32:06,000
I think Dremel is the main consumer of this service.

419
00:32:06,000 --> 00:32:11,000
It's used in other services within Google as well.

420
00:32:11,000 --> 00:32:13,000
Right? So again, the workers just send their app into the shuffle nodes.

421
00:32:13,000 --> 00:32:21,000
And then if the shuffle nodes get run out of space, they can spill to GFS if necessary.

422
00:32:21,000 --> 00:32:30,000
And then the workers in the next stage is because they get, get, get, and get more data from the shuffle nodes.

423
00:32:30,000 --> 00:32:36,000
Right? So in this case here, say that all the workers are consuming data from the previous stage.

424
00:32:36,000 --> 00:32:43,000
In this case here, it could be from the distributed file system, the data reading, or could be from the shuffle service itself.

425
00:32:43,000 --> 00:32:49,000
And then they're processing the data and they're doing end-wave traffic on the outside going out.

426
00:32:49,000 --> 00:32:53,000
And if I run a memory, I can always spill to the distributed file system.

427
00:32:53,000 --> 00:32:59,000
And then another key advantage of why you want to do this is that I no longer have to do sort of the end-to-end community service.

428
00:32:59,000 --> 00:33:03,000
The end-to-end communication or end-to-end communication between the one stage to the next.

429
00:33:03,000 --> 00:33:12,000
Because this data is going to be partitioned, that I only need to send, or get the data from a subset of the workers rather than sending it to all the possible workers.

430
00:33:12,000 --> 00:33:19,000
Right? So without the shuffle service, without having to know exactly what, because the coordinator is going to tell us, here's the data you need,

431
00:33:19,000 --> 00:33:25,000
here's the shuffle node to go get it from. Without that, potentially I have to pull all these guys and say, do you have any data that I could be consuming?

432
00:33:25,000 --> 00:33:32,000
So from that perspective, this is way more efficient in terms of communication traffic.

433
00:33:32,000 --> 00:33:44,000
And then I think also too they can pull from the distributed file system rather than having to go and get it from the shuffle service if it any gets filled with the disk.

434
00:33:45,000 --> 00:33:57,000
So the shuffle is basically just like a checkpoint in the query plan. And so this part is actually unique to Dremel, because historically parallel to distributed databases didn't do checkpoints,

435
00:33:57,000 --> 00:34:08,000
and they weren't fault-tolerant within the query itself, meaning if I had a two-hour query that was going to run, and one node happens to die partway through, then the whole query dies. And I got to restart.

436
00:34:09,000 --> 00:34:21,000
From the database systems perspective, the disk was so slow that it was just not worth it to do right now, animate results.

437
00:34:21,000 --> 00:34:30,000
Whereas Hadoop, as he mentioned, was doing that between every shuffle, was always writing things at the local disk, and then replicating out things on an A.C.F.S.

438
00:34:30,000 --> 00:34:38,000
And that was really slow, because that was Google's model of like, okay, we're running on cheap pizza box machines that could, you know, thousands of machines that could die any time.

439
00:34:38,000 --> 00:34:50,000
Whereas from the parallel database system perspective, it was better to design the system, assuming you're running on, you know, not a thousand dollar rack machines, but like high M machines that aren't going to crash that often.

440
00:34:50,000 --> 00:34:57,000
And that, because you get better performance, but you're not fault-tolerant to, if one of those nodes go down.

441
00:34:57,000 --> 00:35:08,000
So the in-memory service allows them to get that fault-tolerant by taking a checkpoint between the different stages of the query plan, but because it's an in-memory service, it's in memory, it's not really as slow as writing to disk.

442
00:35:08,000 --> 00:35:19,000
Now with NDE drives, maybe less of an issue, because disk got really, really fast, but, you know, 10 years ago, that, you know, this obviously was a big concern.

443
00:35:20,000 --> 00:35:34,000
So you get fault times, because at any time of a, of a node crashes, you know, you just get the data that you need from the in-memory shuffle and run the task on another service, because it had a potent, you can run it again without any side effects.

444
00:35:35,000 --> 00:35:49,000
If a, you know, task is running too slow, because the worker node is for whatever reason slow. The big query guys told me that one big problem they faced is sometimes they'll land on to run a query on a node that where another container is like doing encoding for YouTube.

445
00:35:49,000 --> 00:35:58,000
And they can look at the traffic and actually know it's YouTube, and that's slowed down the query. So if you have a straggler, then you can go ahead and just kill it and assign the task to another worker that can run faster.

446
00:35:59,000 --> 00:36:16,000
And then also to, as it's so related to, it's gonna allow, because we have this explicit stage, like, okay, we can take a step back, look what that query has done so far, look what the data looks like, and then decide at the next stage, we need to scale up or scale down the number of workers we need to process the query.

447
00:36:17,000 --> 00:36:27,000
So look at both of these examples here. So the workers are running, they're producing data that they're sending to the shuffle nodes, and say for whatever reason this node is just falling behind, it can't keep up.

448
00:36:27,000 --> 00:36:43,000
So if we can start to go ahead and kill it, and it's reassigned the task to this other worker here, who again is just getting the data either from the, from the distributed file system, it'll be there or from the shuffle service, which again will always be there.

449
00:36:44,000 --> 00:37:00,000
And then once I collect all my data in my, in my, in my storage, sorry, in the shuffle storage, I post some information to the coordinator, can look at the specifics of what the data actually looks like, and then decide based on what the SLI requirements are for the query.

450
00:37:01,000 --> 00:37:15,000
Do I have too many workers or not enough workers, and then I can, you know, if I want to, I can regenerate, add more, and then I don't have to move any of those data around, I just reassigned what workers going to mean, what data from the shuffle service.

451
00:37:16,000 --> 00:37:17,000
Yes.

452
00:37:24,000 --> 00:37:34,000
So checkpoint meaning, yeah, it's very clear. Yes. So it's not a checkpoint in that we think about in like the intro Davis class where I'm taking all the contents of memory, I'm writing at the desk.

453
00:37:35,000 --> 00:37:48,000
I think it's like, it's a, I don't want to do word staging point because these are already current stages, but it's like a, it's a pause is also not the right word because it's not like you're stopping anything, but it's a, it's not the word for checkpoint.

454
00:37:48,000 --> 00:37:53,000
Say point, say point is there's some explicit either. It's hard to say again.

455
00:37:53,000 --> 00:38:18,000
It's more from a logistical standpoint that like I can, before I start executing the next stage, I can decide do I need to re change my query plan or change my topology of the query plan or the number of workers I have in the subsequent stages because I've seen the data that got generated from the previous stage.

456
00:38:19,000 --> 00:38:26,000
Yeah, so checkpoint, I don't mean that like everything in here always gets written the desk because they want to keep things in memory as possible.

457
00:38:26,000 --> 00:38:33,000
In the intermediate results, who cares about like I don't need the data beyond the query I'm actually trying to run right now.

458
00:38:33,000 --> 00:38:42,000
There are some papers about how we use data structures from 20 to the next sort of like a mini materialized view like a hash table for a hash table for a join, kind of keep that hash table around from one query to the next.

459
00:38:42,000 --> 00:38:50,000
They're not doing that literally is just like I get all my data in this location. I can then have a global view of what's going on and decide where to go next.

460
00:38:50,000 --> 00:38:53,000
What to do next. Yes.

461
00:38:53,000 --> 00:38:58,000
It's question is different shuffle notes stored where?

462
00:38:58,000 --> 00:39:07,000
This is just in memory. In memory hash table.

463
00:39:07,000 --> 00:39:15,000
Oh, yeah, it's questions like are these yes, so think of this as like.

464
00:39:15,000 --> 00:39:30,000
Like I produce some work. I put my task process some data and then I have a key on the data I hash and I mod by the number of.

465
00:39:30,000 --> 00:39:38,000
Yeah, it's just a thing of like a consistent hash table.

466
00:39:38,000 --> 00:39:48,000
Yes. This is a police ever service. This is a colossus GFS. This is this is their S3.

467
00:39:48,000 --> 00:39:53,000
I guess like from the perspective of the work they don't care.

468
00:39:53,000 --> 00:39:58,000
I mean, you care about it's in memory because you want to get handed to the person is quickly possible whoever asked for.

469
00:39:58,000 --> 00:40:03,000
That's the whole point of like these things. These are large memory machines.

470
00:40:03,000 --> 00:40:07,000
This is this is Google's not S3.

471
00:40:07,000 --> 00:40:10,000
The lady said it's an other store.

472
00:40:10,000 --> 00:40:16,000
It's an other store.

473
00:40:16,000 --> 00:40:22,000
I thought I wanted to person. So many say S3 is at least the metadata is built on my SQL.

474
00:40:22,000 --> 00:40:28,000
But again, that's for this we don't we don't care.

475
00:40:28,000 --> 00:40:42,000
Okay. So I keep alluding to it. Okay. Now that we have this staging area in the memory shuffle store and we're now in

476
00:40:42,000 --> 00:40:48,000
collect statistics about what the date they got we've gotten from the from the from the previous stage.

477
00:40:48,000 --> 00:40:54,000
We start making decisions about what we want to do. But in the very very beginning obviously we don't have any of that information.

478
00:40:54,000 --> 00:40:58,000
Because we did some a bunch of files we may may not ever scan before.

479
00:40:58,000 --> 00:41:07,000
I think the paper even said it says like a large percentage of the data that the Dremel queries are processing are files of the data is never seen before.

480
00:41:07,000 --> 00:41:14,000
So there's no statistics. So how can we actually try to generate optimal query plan without any of this.

481
00:41:14,000 --> 00:41:21,000
They also talk about the ability to do queries against other data sources or data database systems.

482
00:41:21,000 --> 00:41:32,000
This is oftentimes called connectors and we'll see this in other system as we go along. But like the idea is that I have a single logical view within BigQuery Dremel to a bunch of different disparate database systems.

483
00:41:32,000 --> 00:41:44,000
And now when I run my query I can say go read this postgres table. And then the system is responsible for then writing the the corresponding query to go against postgres and get the data that it needs.

484
00:41:44,000 --> 00:41:52,000
But at that point if we're running a query on another day you know our query gets generated to it gets converted to another query that runs another system.

485
00:41:52,000 --> 00:42:01,000
We have no statistics. We have nothing. Right. The worst case scenario we we do like a select star gets some other table and then do processing what once we get into our system.

486
00:42:01,000 --> 00:42:10,000
That's case scenario we can do some kind of predicate push down to the other system. But again at this point again you don't have any stats.

487
00:42:10,000 --> 00:42:33,000
So the way Dremel's new query optimization is a stratified approach with a rule based optimizer and a cost based optimizer that only does basic analysis of the cost based one only does basic analysis on the data trying to access if you have actually some information already about it.

488
00:42:33,000 --> 00:42:43,000
So for the rules that's all the classic stuff we talked about doing predicate push down primary key funky hints some very basic join ordering.

489
00:42:43,000 --> 00:42:46,000
They have custom rules to do.

490
00:42:46,000 --> 00:42:56,000
To constraint propagation for starts chemists like you could propagate the maybe the constraints from a dimension table into a fact table.

491
00:42:56,000 --> 00:43:05,000
Or like if you're doing you know if it's a skin if the system will detect it if you have a star schema a fact table with all the dimension tables.

492
00:43:05,000 --> 00:43:18,000
Then when it generates the the stages it knows to always generate the hash tables build the hash tables and the mention tables and then have this single pipeline when you write up the fact table all the way up and do probes and all these hash tables.

493
00:43:18,000 --> 00:43:30,000
So they have basic rules to check these things but then they only trigger the cost based analysis and optimizations if you have some stats which they only generate if you have a materialized view.

494
00:43:30,000 --> 00:43:38,000
But most of the queries are not materialize use or not the common case they have to deal with not having any statistics.

495
00:43:38,000 --> 00:43:55,000
So instead to avoid any kind of bad cost model estimates that we saw before they're going to apply adaptive query optimization techniques and they're going to do this relying on that shuffle stage as a way to say okay stop the political is going on and then recalibrate as needed.

496
00:43:55,000 --> 00:44:03,000
So we'll see various other techniques that are used to do that adapt to query optimization in snowflake and Databricks and in so forth.

497
00:44:03,000 --> 00:44:10,000
They're not going to be as aggressive as or all encompassing the papers that we discussed.

498
00:44:10,000 --> 00:44:17,000
They're not doing plan stitching but they're also not embedding those sort of trigger plan nodes that aside it go this query plan versus the other.

499
00:44:17,000 --> 00:44:35,000
They're going to be more like change the number of workers that they have and maybe change the what joint algorithm want to use based on the data that's seen but not like recalibrate reorganize the entire query plan.

500
00:44:35,000 --> 00:44:46,000
So when we can do this because we have the shuffle staging point where we can look at the data collected and the idea is in one of fixed things as we go along.

501
00:44:46,000 --> 00:45:03,000
So obviously we've already seen how to change the number of workers in a stage like if I recognize that the data showing up is much larger smaller than I anticipated because maybe there's a very selective filter that I didn't anticipate was going to throw a most of the data then I can scale down the number of workers that have the next stage.

502
00:45:03,000 --> 00:45:09,000
So you can decide whether you want to do a shuffle or a broadcast join based on the data that shows up in the shuffle phase we'll see that in a second.

503
00:45:09,000 --> 00:45:22,000
I also can change they have to go out you can change what the implementation of the operator you're going to use this one I don't fully understand what they because they don't talk about the paper but like they have notions of like I have a

504
00:45:22,000 --> 00:45:32,000
operator implementation for small partitions or large partitions I'm guessing things like on Roman loops and things like that if you know you're only going to read small number data in each partition.

505
00:45:32,000 --> 00:45:45,000
And then I'm going to partition is a way to just maybe split data up more if you have a hot bucket again based on the data seen I'll go through I'll go through these two examples.

506
00:45:45,000 --> 00:46:04,000
So say I have a query here that's going to read data from table A table B and I want to do a join so in the very first stage I have a bunch of workers read data from table A and a bunch of worker from table B from data from table B and again maybe there's some filter I push down in these workers that start printing data.

507
00:46:04,000 --> 00:46:24,000
And then the these workers are starting submitting all the results from these scans into the shuffle stage and if you think of like internally which is build a you know a history and our counter says how much data we put into for the partitions at these two tables and say for whatever reason table A is much smaller than the anticipated.

508
00:46:25,000 --> 00:46:40,000
So in that case here you maybe we don't want to actually do the shuffle join were just were repartitioning the data on the join key we could recognize that this data is actually small small to fit on every single node and we can change what join one use.

509
00:46:40,000 --> 00:46:52,000
So again say the original idea was that we were going to do a hash the data and then send it to individual workers they're more they're pulling from this but I'm sharing the arrow of like here's the data flow.

510
00:46:53,000 --> 00:47:15,000
But again if this thing is super small then I can just change it to a broadcast join where now the the workers will every worker will go get the entire contents of table A from the shuffle service and then I still do the shuffle on B partition it up but now when I join B with a I have all the data I need to do the join locally.

511
00:47:16,000 --> 00:47:35,000
The other choice is to do a dominant partition so say that I have I'm scanning my data right and say again for whatever reason partition one is much smaller than I can anticipate sorry take partition to is much larger than anticipated so this thing is going to spill the disk and that's going to be slow.

512
00:47:35,000 --> 00:47:46,000
So what I can do is you know as I'm running I'm passing statistics to the coordinator and then I can say okay great two new partitions that's my biological daughter.

513
00:47:46,000 --> 00:47:49,000
Sorry.

514
00:47:49,000 --> 00:48:04,000
So the coordinator says okay well this partition is going to run out of space so now go send a message to the worker and say all right anything you're going to partition to send a partition to hash it again and send it to these two new partitions I just added.

515
00:48:04,000 --> 00:48:24,000
So basically recursive partitioning from the greatest hash to an algorithm we saw in the intro class right so then these guys start you know keep running and start filling up data from these two are partitions and then when this this stage is done I introduce a new task in my stage to re partition that then goes from trees data.

516
00:48:24,000 --> 00:48:29,000
Sorry this is not professional.

517
00:48:29,000 --> 00:48:37,000
I go read I go read your data from partition to and then it just rehashes it and puts it in partition three and four right.

518
00:48:37,000 --> 00:48:40,000
In the beans one for the two should join.

519
00:48:40,000 --> 00:48:43,000
Yes.

520
00:48:43,000 --> 00:48:46,000
One of them always needs to be a broadcast right it's just which one you want to make the one.

521
00:48:46,000 --> 00:48:49,000
Yeah one doesn't always have to be broadcast.

522
00:48:49,000 --> 00:48:53,000
Sorry yeah it's you can do.

523
00:48:53,000 --> 00:49:08,000
So shuffle joints just like everything everything gets repartition on the hash key right the alternative is to do just a broadcast join or one of them gets broadcast everybody and then you don't have to just scan locally.

524
00:49:08,000 --> 00:49:20,000
Actually yeah so in the stage I'm missing if you do a broadcast join you don't like I do broadcast a that I don't need to do partition on B so you go ahead and kill these workers here.

525
00:49:20,000 --> 00:49:25,000
And then in the next stage they're just going to read the data from the record in the table the files.

526
00:49:25,000 --> 00:49:28,000
Yes I'm missing arrows at draw that.

527
00:49:28,000 --> 00:49:39,000
That's how you do a broadcast join because the idea is like one small if you can send around everywhere and you leave the other table where we're originally resided.

528
00:49:39,000 --> 00:49:55,000
Okay so as I said before they're they're we're going to rely on the internal just rate of file system called call call losses originally start off a GFS but then they switched to call us to do scale storage.

529
00:49:55,000 --> 00:50:07,000
Again think of like it's like an object store like S3 and other ones we've talked about the idea is that this is this is an external service to the data system you just let let them manage all the storage for us.

530
00:50:07,000 --> 00:50:30,000
So the paper also talks about how they're going to rely on a file format called capacitor which is internal to Google this link here take it to a blog article that mentions it there isn't much documentation about it it's not open source but it more or less looks like or can park a when you talk to them the Google people right.

531
00:50:31,000 --> 00:50:44,000
One thing that capacitor does do that work in park a do not do is that you can do predicate push down and partial query evaluation or expression evaluation within the access library itself directly on the data.

532
00:50:44,000 --> 00:50:58,000
So when S3 again you do some push down of some warehouses and select for select statements on the park a files or park a and CSV files or JSON files as well but it's pretty limited and certainly in the case of.

533
00:50:59,000 --> 00:51:11,000
Like you know if you just access park a through the arrow files like you had a decompress everything as you're iterating over the data whereas this thing can do filtering directly on compressed data without decompressing it first.

534
00:51:11,000 --> 00:51:23,000
There's another file format called artists those for the YouTube or cello system that has similar capabilities but a high level this is just just going to look like park a network except that you can do better better better early filtering.

535
00:51:23,000 --> 00:51:36,000
And we saw before how they're going to handle repetition definition fields to deal with nested data like thing JSON data but again it's Google world so it's protocol buffers.

536
00:51:36,000 --> 00:51:47,000
These file formats capacitor are going to self describing meaning again just like park a work there'll be something in the folder that says here's the schema that you expect to see.

537
00:51:47,000 --> 00:52:12,000
And then they talk about how the data the the metadata for the schema is just stored as kilometer data as well so even though I may have 10,000 attributes in my in my file I don't have to deseralize the entire thing like you have to do in park a work I can just do the the you know do all the opposition you look up on kilometer data directly on the metadata to find the things that I'm looking for.

538
00:52:12,000 --> 00:52:26,000
Again this is not this itself is not like mind blowing the amazing but it's certainly better than what's in park a and what's better than work in the current state of the art.

539
00:52:26,000 --> 00:52:50,000
The last interesting to talk about in this paper is similar to what we saw in the Velox paper where they talked about how you know Dremel was the one of the big first systems that they Google built that brought back sequel and then once the call became in fashion again at Google there's a bunch of these different random projects that people started adding their own you know for sequel.

540
00:52:50,000 --> 00:53:17,000
The problem is all these different internal projects have their own dialect of sequel and so there was effort in the late 2010s to to to unify this across the entire corporation by having a single sequel dialect on Google sequel that that all these systems within incorporate so that way you didn't have to deal with a weird nuances of one sequel to the another across the entire corporation everything was always the same.

541
00:53:17,000 --> 00:53:31,000
So the this again in the Bellock's world they talked about how like there's all these like some string functions and everyone was re implementing the wheel over and over again and bellox invented standardized those invitations the same idea here.

542
00:53:31,000 --> 00:53:46,000
So Google's sequel itself is not open source but there's an open source variant of it called Zeta sequel who has ever heard of Zeta sequel nobody okay so this thing here's supposed to be the open source version of this and the idea was like okay yeah here's you know.

543
00:53:46,000 --> 00:54:09,000
People could start building you know Zeta sequel compatible database systems that would then smell a lot like Google's sequel so like if you're comfortable like running on whatever this one off system based on Zeta sequel you can easily transition your application over to to to BigQuery or Dremel or other spanner as well.

544
00:54:09,000 --> 00:54:14,000
So this thing is basically as far as I tell is dead like there was like there's new updates.

545
00:54:14,000 --> 00:54:30,000
There's some update like a month ago on GitHub but like it says at the bottom it's not officially supported by Google there's a bunch of pull requests and issues that aren't being responded to or answered right so as far as I can tell this thing is dead like and there's only one data system I know that actually supports Zeta sequel it's called Apache beam.

546
00:54:30,000 --> 00:54:59,000
There's like a stream processing system but nobody else is actually using this and what's to me this is interesting because again Google was or Google still is huge right Google still is very influential in the tech community but if they're putting out a sequel dialect they say this is what the standard should be no one follows it like you know this shows you like that the sequel marketplace is so diverse and fracture that like no one is going to be able to do that.

547
00:54:59,000 --> 00:55:11,000
There's no one company even a major tech giant can can sort of bend the you know the bend the physics of bend the world to you know to to their to the winds.

548
00:55:11,000 --> 00:55:39,000
Last time this was actually done was IBM right IBM came out 82 83 said okay we're putting out a new Davis system and it's going to be based on sequel sequels the standard and everyone sort of got mine follow along and sequel became what it is today but now things are so diverse that I don't think you could ever do that again the close you get to I think a true I mean there's the sequel standard the ice or sequel standard but as I said nobody actually follows that the close you get to a dialect that everyone is based on is postgres.

549
00:55:39,000 --> 00:55:46,000
Because everyone takes the postgres parser the grammar file uses it like ducty be did did this a bunch of other system did this.

550
00:55:46,000 --> 00:55:58,000
Google you know not saying that they try and fail but like you know like it knows we use that as a sequel.

551
00:55:58,000 --> 00:56:16,000
Okay so there's again since the 2011 paper as I mentioned there's a bunch of systems that have come out that are some cases like wholesale they claim it's a copy off of the architecture but other ones is more likely to say that there's inspired.

552
00:56:16,000 --> 00:56:31,000
So I want to go through these four here and then what's also interesting about this is that they're in the last three or four years there are now separate shuffle as a service components or architecture systems that you could then use.

553
00:56:31,000 --> 00:56:44,000
That maybe don't exactly replicate all the capabilities of the the the dremels in memory shuffle service certainly not using hardware acceleration but now that again there's separate projects that do nothing but shuffles.

554
00:56:44,000 --> 00:56:53,000
Which I think is kind of cool and so we'll talk about the celebrate one from Ali Baba because that one's that one's the farthest along the uniform and the the over one.

555
00:56:53,000 --> 00:57:00,000
I mean I'm sure the store using this uniform is still and again Apache incubator projects so so early this is the big one.

556
00:57:00,000 --> 00:57:07,000
So again let me go through each of these systems and I'll cover this one and we'll finish up go out for the for the eclipse.

557
00:57:08,000 --> 00:57:18,000
All right Apache drill is again this one claim to be to begin straight up copy like Dremel is a drill Apache drill right no imagination there.

558
00:57:18,000 --> 00:57:30,000
So this started as a right after the triple people came out as a way to build up a query engine on top of hgfs and this is started at a tech company called map r.

559
00:57:31,000 --> 00:57:42,000
This was in the in the late 2000 to 2010 there was three major Hadoop companies or map reduced companies there was a cloud era Horton works in map are.

560
00:57:42,000 --> 00:57:52,000
Cloud era and Horton works are based on the open source version Hadoop the Java one map are had the room for proprietary simple those version that was meant to be faster and so map are built a.

561
00:57:52,000 --> 00:57:58,000
The building of Apache drill actually this was in Java.

562
00:57:58,000 --> 00:58:12,000
So it's interesting about this is that they are going to code gen query compilation using this thing called geneno which is basically it's some kind of embedded Java compiler where you can give it Java code and it converts it in process.

563
00:58:13,000 --> 00:58:22,000
So this project is not dead but certainly the number of commits and engagement and usage of it has gone down.

564
00:58:22,000 --> 00:58:34,000
Map reduce or map are was on the market a couple of times finally got acquired for not much by HPE and the HPE announced in 2020 that they're basically stopping all development on this.

565
00:58:34,000 --> 00:58:40,000
At least their HPE is not paying for the developers to work on this but other people are still still working on it.

566
00:58:40,000 --> 00:58:51,000
So I would say that this is not you know there's better alternatives now especially in the open source world but you know this was the first one that sort of came out directly after the Dremel paper came out.

567
00:58:51,000 --> 00:58:53,000
Can I do the shoppers in the memory shop?

568
00:58:53,000 --> 00:58:55,000
I think this one did the memory shop with us.

569
00:58:55,000 --> 00:58:58,000
Again not the hardware.

570
00:58:59,000 --> 00:59:03,000
The next one is presto DB.

571
00:59:03,000 --> 00:59:05,000
This was started at Facebook.

572
00:59:05,000 --> 00:59:11,000
I wouldn't say this is like directly inspired by Dremel because I think they were working on this.

573
00:59:11,000 --> 00:59:21,000
They were already working this when the Dremel paper came out but they were building Facebook was building this to replace hive which was a.

574
00:59:21,000 --> 00:59:32,000
Which is way to do sequence up a map reduce it would take your sequel query and then convert it literally into map reduce Java jobs and run those and obviously that would be super slow because map reduce was slow.

575
00:59:32,000 --> 00:59:41,000
But the idea again same same motivation that they have a bunch of files sort of data lakes this case it's a TFS or I think Facebook has their own internal distributed file system.

576
00:59:42,000 --> 00:59:48,000
And they had a way to do a bunch of connectors and different storage system and data systems similar to Dremel.

577
00:59:48,000 --> 00:59:57,000
And in a few years ago Facebook announced that they're getting off of the Java based runtime engine and they're switching everything everything to the VeloX.

578
00:59:57,000 --> 01:00:08,000
The VeloX paper talks about this project called Pratissimo. This is one of the the the the targets they were building VeloX work to replace the Java engine with this equalist engine and VeloX.

579
01:00:09,000 --> 01:00:21,000
There's also another version of presto called Treno previously called presto sequel so the first version of the project was called presto then it was called presto DB and then there was a fork called presto sequel.

580
01:00:21,000 --> 01:00:26,000
Then they got renamed to Treno and this is done by the starburst guys that came out of.

581
01:00:27,000 --> 01:00:30,000
Carid data.

582
01:00:32,000 --> 01:00:36,000
No they by aster data as they're part of aster data and aster data acquired.

583
01:00:36,000 --> 01:00:40,000
As the project got a doob DB is a company called had apt.

584
01:00:41,000 --> 01:00:48,000
Adapt got acquired by aster data and an aster data got acquired by terror data and then tear data spun out this as starburst there we go.

585
01:00:49,000 --> 01:00:59,000
And so they didn't like how Facebook wouldn't give up the control of the source code like high came out of Facebook and that's a patchy project for whatever reason presto was still not a patchy project and it wasn't.

586
01:00:59,000 --> 01:01:17,000
Facebook wasn't giving up control so these guys forked it renamed it as Treno and I think this went to the cloud computing foundation and then Facebook then converted gave up source control and gave presto DB to the Linux computing foundation right so not a patchy with these these other similar kind of foundations.

587
01:01:17,000 --> 01:01:41,000
So what's interesting about this in presto or presto DB Facebook is trying to get rid of the job of stuff in place of the locks but Treno guys they're very explicit saying they don't want to give up job on they have a blog article or they got a podcast a year ago and they talk about here is explicitly that like they rather spend the time trying to make the query plan query optimizer better.

588
01:01:41,000 --> 01:01:51,000
Then then try to spend a much engineering effort to replace the execution engine with something like Bellox or even data fusion.

589
01:01:51,000 --> 01:01:59,000
So is the query engine or is that the high is the query engine the same way the drum was a query engine pressors query engine Trenus query engine.

590
01:01:59,000 --> 01:02:02,000
So how is press so high connection.

591
01:02:02,000 --> 01:02:04,000
The question is why how is press so high connection.

592
01:02:04,000 --> 01:02:14,000
Facebook first built hive because they were like okay they had all this all this map produced stuff infrastructure map produces slow and people writing Java code running queries instead of SQL.

593
01:02:14,000 --> 01:02:25,000
So then they build hive where's a front end query engine that can take your SQL query and convert it to a map produced job and run that that's slow because map produces slow in the Hadoop model slow.

594
01:02:25,000 --> 01:02:37,000
So then they said okay let's get rid of that and let's have build keep HDFS or the short file system and let's build a query engine that takes SQL and run the actual query plans directly to SQL that's presto.

595
01:02:37,000 --> 01:02:39,000
Simulta Dremel.

596
01:02:39,000 --> 01:02:42,000
And that one also has the immigration.

597
01:02:42,000 --> 01:02:45,000
Actually I pressed so I don't know.

598
01:02:45,000 --> 01:02:47,000
I should look a bit out. I don't know.

599
01:02:47,000 --> 01:02:49,000
Go question.

600
01:02:49,000 --> 01:03:01,000
All right another project again that came with definitely definitely definitely inspired by Dremel was the thing called impala came out of Claudero.

601
01:03:01,000 --> 01:03:11,000
And so this was founded by people that Claudero hired from Google who didn't work on Dremel what what used it and what inspired about it.

602
01:03:11,000 --> 01:03:30,000
But the the the key thing that they did that they didn't that an impala did I think it still works this way that rather than have the query engine and the workers pull the data from the shared storage and then do the processing on the worker nodes.

603
01:03:30,000 --> 01:03:38,000
They want to do more credit push down than you can do on S3 or the GFS at the time.

604
01:03:38,000 --> 01:03:43,000
So what they would do is that on the true file system you actually install a little execution engine down there.

605
01:03:43,000 --> 01:03:54,000
I think this all written in Java so this is like the JVM so then work could then do a credit push down another another push downs and that would run that part of the query directly where the data was being stored.

606
01:03:54,000 --> 01:04:03,000
This was HDFS at the time so then like on your HDFS node also install the some pile X-puter node who then take the queries and process the data locally before sending it back.

607
01:04:03,000 --> 01:04:13,000
So that's not a true disaggregated storage the way that we've been talking about the entire semester but they did this because they wanted to do the the the predicate push down.

608
01:04:13,000 --> 01:04:27,000
I think they also did query compilation but they did the compala it actually see back this was not Java this was in C++ and I think they were doing like predicate compilation on like ware clauses and they could do that down there.

609
01:04:27,000 --> 01:04:30,000
And see CSV parsing and other things.

610
01:04:31,000 --> 01:04:40,000
Well see we'll see more about impala next class when we talk about data bricks right because cloud air was the big big map reduce company.

611
01:04:40,000 --> 01:04:46,000
And they were pushing impala very heavily but then everyone started asking for spark.

612
01:04:46,000 --> 01:04:54,000
So they also had to start supporting spark but then sparks like hey let's add SQL and clander didn't like that because they want to keep it a buy impala.

613
01:04:54,000 --> 01:04:59,000
And then the spark guys do this one trick we'll see next class how they got SQL in the spark.

614
01:04:59,000 --> 01:05:04,000
I mean basically they invented it instead of having them being a middleware and it did it.

615
01:05:04,000 --> 01:05:11,000
Databricks basically destroyed cloud air will come that well we'll discuss the more next class.

616
01:05:11,000 --> 01:05:30,000
Dremel is probably the evolved open source ones we talked about again directly inspired by Dremel and actually is backed by a you know VC backed company actually found a by seeming to see me alum I think it is master's here but it wasn't my student as far as I know.

617
01:05:30,000 --> 01:05:54,000
And the Z before they're doing all the things we talked about very similar to Dremel but one of the things we're going to do to speed things up is direct to access what we call the reflections as far as we can tell they're just materialize views right they're doing on on Java based co gen I think for the entire query not just where causes and vectorization as we talked about before.

618
01:05:54,000 --> 01:06:12,000
And then the last one is Apache celebrant celebrant this again shuffle as a service came out of a Baba ideas that in spark and flink you can actually specify what shuffle service you want like there's a beat default built in one where the worker notes and the data directly to you know to other worker nodes.

619
01:06:12,000 --> 01:06:41,000
You can actually have use this as a standalone service as the intermediary and it can do all the things that we talked about so far like I can spell the disc on that run out of memory they can actually do block compression of the data when they put it down the desk and so forth and again it's just a key value store that's fault tolerant and think this one is using wrapped internally does another one the unifool that's based on suit keeper right it's just a key value store that's but it's only meant for moving data back and forth between the different stages of queries.

620
01:06:43,000 --> 01:07:06,000
All right so the finish up. Dremel is very very influential as I said in the combination of vector wise for like the single no query processing plus the Dremel for like to overall architecture not everyone does the shuffle as we'll see is going along with the combination these two things gives you what what we call a modern lake house.

621
01:07:06,000 --> 01:07:24,000
And although the shovel stuff seems way for with baseball it is actually make things better because I keep I keep as much memory as much as possible I can disconnect the warm workers at one stage of the next right there are a bunch of advantages to this not just performance also from engineering because it simplifies the implementation of all the workers.

622
01:07:25,000 --> 01:07:45,000
And this is another good example to of of sort of the projects you guys are working on based on it's like by decoupling the system architecture and having one group to spend as much time to optimize this one piece that then be taken advantage of by other parts of the system I think that's the right way to to build a modern cloud native system today.

623
01:07:45,000 --> 01:08:02,000
Okay. All right. Again next class will talk about sparks equal and photon this is going to be different than the Dremel paper because the journey papers of the entire system the photon you're going to see it's going to look like Velox right.

624
01:08:02,000 --> 01:08:10,000
It's something you bed inside the gvm of and for this this rock runtime rather than being so in one system.

625
01:08:10,000 --> 01:08:15,000
Okay. All right. So that's the stop now. Let's go inside and check out the clips.

