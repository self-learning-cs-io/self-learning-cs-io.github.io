---
title: CMU15721 P20S202420 DuckDBEmbeddedDatabaseSystemCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Carnegie Mellon University's Advanced Database Systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:09,000 --> 00:00:18,000
Let's open two discussion today on Dr. D.

4
00:00:18,000 --> 00:00:24,000
And again, as I said last time, this is going to be a lot different than all the other systems we've been talking about,

5
00:00:24,000 --> 00:00:30,000
in the last week or so because all of those release giant distributed warehouse is running in the cloud,

6
00:00:30,000 --> 00:00:35,000
and then now I had to read a paper about WB who's most of running on a single node.

7
00:00:35,000 --> 00:00:40,000
But we'll talk about Mother Duck at the end, how they not necessarily go distributed,

8
00:00:40,000 --> 00:00:49,000
meaning fanning out, scaling out the queries themselves, but at least now be able to leverage cloud compute infrastructure for query execution.

9
00:00:49,000 --> 00:00:51,000
But we'll see that at the end.

10
00:00:51,000 --> 00:00:54,000
All right, so last class we were talking about the Smith-like data warehouse.

11
00:00:54,000 --> 00:01:02,000
And as I said, this was along with Dremel, so that one of the first, this is what I call classical cloud native, OLAP engine,

12
00:01:02,000 --> 00:01:05,000
that did all the various things we talked about through the entire semester.

13
00:01:05,000 --> 00:01:13,000
Precompah primitive push-based execution, separating computing storage, all those nice things.

14
00:01:13,000 --> 00:01:18,000
And so this showed up actually I think yesterday, which I think worth just looking at,

15
00:01:18,000 --> 00:01:23,000
because I think somebody else asked me like, okay, well, like all these systems at a high look at the same, how do you pick them?

16
00:01:23,000 --> 00:01:29,000
So data engineering subreddit is actually really good, because there's people who actually using the systems and talking about the pros and cons of them.

17
00:01:29,000 --> 00:01:30,000
So I highly recommend it.

18
00:01:30,000 --> 00:01:34,000
And so somebody's asking, hey, how do I pick between snowflake, data bricks, BigQuery, and Redshift?

19
00:01:34,000 --> 00:01:37,000
We haven't talked about Redshift yet.

20
00:01:37,000 --> 00:01:38,000
That'll be next week.

21
00:01:38,000 --> 00:01:43,000
And this boot basically says, hey, don't worry about the native-goody details.

22
00:01:43,000 --> 00:01:48,000
The way to really think about whether you want one system and another is, first of all, what cloud are you already running on?

23
00:01:48,000 --> 00:01:51,000
If you're already running on GCP or Google, then just use BigQuery.

24
00:01:51,000 --> 00:01:56,000
If you're already running on AWS, you could probably just use Redshift otherwise.

25
00:01:56,000 --> 00:02:00,000
And then if you're already using Spark, use data bricks.

26
00:02:00,000 --> 00:02:06,000
And then if you have a lot of money, I'm looking for a good time, then that's snowflake.

27
00:02:06,000 --> 00:02:10,000
And I would say that's one of the differentiators I think that snowflake has done really well,

28
00:02:10,000 --> 00:02:20,000
that separates them from the other systems is just that the user experience is much, much better and cleaner than these other cloud systems.

29
00:02:20,000 --> 00:02:25,000
And so even though, again, the core architecture might still be the same underneath the covers at a high level,

30
00:02:25,000 --> 00:02:27,000
based on the things that we talked about.

31
00:02:27,000 --> 00:02:30,000
As I said before, the user experience is going to last matter a lot.

32
00:02:30,000 --> 00:02:33,000
And also how good the query optimizer is.

33
00:02:33,000 --> 00:02:36,000
Is there no tuning in snowflake?

34
00:02:36,000 --> 00:02:38,000
It's question, there's no tuning snowflake.

35
00:02:38,000 --> 00:02:43,000
Yeah, they don't expose really any knobs, you can't even do query plain hands.

36
00:02:43,000 --> 00:02:47,000
I think there's one knob you can jack up the compute size.

37
00:02:47,000 --> 00:02:50,000
You can turn off auto scaling.

38
00:02:50,000 --> 00:02:52,000
I think there's three things.

39
00:02:52,000 --> 00:02:55,000
Now, it doesn't mean in the actual implementation itself, there aren't a bunch of other knobs.

40
00:02:55,000 --> 00:02:58,000
And they've told me this. They're like, yeah, we have hundreds of knobs on the inside.

41
00:02:58,000 --> 00:03:00,000
They don't expose them to the users.

42
00:03:00,000 --> 00:03:04,000
So then typically what happens is, they said,

43
00:03:04,000 --> 00:03:08,000
if somebody calls a sales engineer, says my query is running slow, the sales engineer can then get in touch,

44
00:03:08,000 --> 00:03:12,000
or the customer service can get in touch with a database system engineer,

45
00:03:12,000 --> 00:03:17,000
and then they'll recommend like, hey, tune these three four knobs for this one particular customer.

46
00:03:17,000 --> 00:03:19,000
But it's very ad hoc.

47
00:03:19,000 --> 00:03:21,000
At least this is what they told me a few years ago.

48
00:03:21,000 --> 00:03:24,000
So underneath the covers, there's all the tuning knobs that they would expect,

49
00:03:24,000 --> 00:03:27,000
but they don't make it your life easier as the user of it.

50
00:03:27,000 --> 00:03:29,000
They don't expose it to you.

51
00:03:29,000 --> 00:03:31,000
How would they actually tune in themselves?

52
00:03:31,000 --> 00:03:33,000
It must be really hard to do that.

53
00:03:33,000 --> 00:03:36,000
How would they actually tune in themselves? What do you mean, how are they tuning themselves?

54
00:03:36,000 --> 00:03:38,000
I mean, they have tons of knobs, right?

55
00:03:38,000 --> 00:03:40,000
And like, getting those values out of your sentence.

56
00:03:40,000 --> 00:03:45,000
So their sort of design philosophy would be like, you want things to be adaptive.

57
00:03:45,000 --> 00:03:50,000
And so, again, it's hard to quantify this, say how much it is actually adaptive,

58
00:03:50,000 --> 00:03:54,000
but you can think about it like, instead of being lazy, not lazy in the other right word,

59
00:03:54,000 --> 00:04:00,000
but instead of saying, okay, here's some value for a knob I need to know about how to set correctly for the workload.

60
00:04:00,000 --> 00:04:03,000
Instead of just saying, all right, let's pound to fine somebody else that said it for me,

61
00:04:03,000 --> 00:04:06,000
you could, there's ways to make, try to make things adaptive.

62
00:04:06,000 --> 00:04:08,000
It's more engineering, certainly, but it makes you more robust.

63
00:04:08,000 --> 00:04:09,000
Yes.

64
00:04:09,000 --> 00:04:11,000
Why is Retchip not a positive experience?

65
00:04:11,000 --> 00:04:14,000
The question is, why is Retchip not a positive experience?

66
00:04:14,000 --> 00:04:18,000
Well, we'll come to that next week.

67
00:04:18,000 --> 00:04:21,000
Hey, it's not...

68
00:04:21,000 --> 00:04:25,000
Again, I think there's nothing particularly wrong with the architecture itself,

69
00:04:25,000 --> 00:04:28,000
because they fixed a lot of it.

70
00:04:28,000 --> 00:04:32,000
Again, it's the user experience, and that's hard to quantify, right?

71
00:04:32,000 --> 00:04:38,000
It could be like, okay, my query went slow, I did the right tools for me to figure out why it ran slow.

72
00:04:38,000 --> 00:04:41,000
Or is it, you know, how stable is the system in terms of performance?

73
00:04:41,000 --> 00:04:45,000
Like, I run the query today, I run it tomorrow, and like, it's an order mag 2 difference of performance.

74
00:04:45,000 --> 00:04:47,000
Like, you know, is that what people are seeing?

75
00:04:47,000 --> 00:04:51,000
Again, this is purely anecdotal, right?

76
00:04:51,000 --> 00:04:54,000
I just thought it was an interesting quip.

77
00:04:54,000 --> 00:05:00,000
And, like I said, the data engineering, this is where you see a lot of people at the sort of bleeding edge talking about how using these systems,

78
00:05:00,000 --> 00:05:04,000
and also the ecosystems around it, like airflow, DBT, and things like that,

79
00:05:04,000 --> 00:05:07,000
and how they integrate with these cloud unders.

80
00:05:07,000 --> 00:05:09,000
Okay?

81
00:05:11,000 --> 00:05:16,000
All right, so, for today's discussion, we need to go back a time, and just a little bit,

82
00:05:16,000 --> 00:05:21,000
to talk about what led to the creation of WDB.

83
00:05:21,000 --> 00:05:28,000
And, you actually already read one of the papers that was a precursor or a catalyst for what, you know,

84
00:05:28,000 --> 00:05:34,000
what set off the development of Dr. B, and that was the networking paper, like, don't hold my data hostage.

85
00:05:34,000 --> 00:05:38,000
Right? And that paper came out of this project they were building at CWI,

86
00:05:38,000 --> 00:05:42,000
to make an embedded version of MoNDDB called MoNDDB Lite.

87
00:05:42,000 --> 00:05:47,000
Basically, MoNDDB, again, was one of these early comms store systems at academia, at a CWI,

88
00:05:47,000 --> 00:05:50,000
that then, it was open source, and people were actually using.

89
00:05:50,000 --> 00:05:54,000
But it was like, you know, it was like a post-gress or any other sort of shared everything system,

90
00:05:54,000 --> 00:06:00,000
you had to prop it up, configure it, set it up, and you would connect to it through JDBC over the network.

91
00:06:00,000 --> 00:06:08,000
And so, what they were trying to do was to make it faster or easier for data scientists to use a database system

92
00:06:08,000 --> 00:06:14,000
inside of, like, Python pandas, or R, I think there's explicitly for R, they were doing this.

93
00:06:14,000 --> 00:06:17,000
They tried to make an embedded version that ran in process.

94
00:06:17,000 --> 00:06:21,000
I haven't really talked about what an embedded database system looks like, but basically,

95
00:06:21,000 --> 00:06:26,000
it's, you know, there's no main function, like, you would starting the post-gress or my sequel,

96
00:06:26,000 --> 00:06:33,000
it's running, it only runs whenever the hosting process then invokes inside, down into it.

97
00:06:33,000 --> 00:06:37,000
Now, it can spin up its own threads in the background and do other stuff,

98
00:06:37,000 --> 00:06:45,000
but, like, it's not something you would just start, like, as a demon on your server and just run all the time.

99
00:06:45,000 --> 00:06:51,000
So, they were trying to make this run directly inside of the R runtime or pandas runtime,

100
00:06:51,000 --> 00:07:00,000
and they were trying to reduce the cost of going back and forth between the R-lang infrastructure and the database system.

101
00:07:00,000 --> 00:07:07,000
Because, typically, very often, how data scientists use databases is they just grab a giant CSV or a parquet file,

102
00:07:07,000 --> 00:07:12,000
whatever, from the server itself, bring that down to your local laptop and do all the crunching on that.

103
00:07:12,000 --> 00:07:16,000
And so, they're not leveraging the database system to do all the fast calculations and stuff that, you know,

104
00:07:16,000 --> 00:07:22,000
we know how to do really well, they're basically rolling all that crap themselves inside of their set of user code.

105
00:07:22,000 --> 00:07:27,000
Pandas isn't particularly known to be, you know, very, very swift or fast.

106
00:07:28,000 --> 00:07:32,000
So, that was the goal. They're trying to have an embedded version of MoDV Lite that got all the advantages of the column store,

107
00:07:32,000 --> 00:07:40,000
that would expose that to the data scientists, but the problem of MoDV, you know, at this point, it was 15, 20 years old,

108
00:07:40,000 --> 00:07:54,000
and it just had too much sort of legacy infrastructure and legacy code that it was too much to rip things out and strip it down to get it to be a more simplistic package that, again, you could then embed.

109
00:07:55,000 --> 00:07:58,000
So, that's what led the C2R researchers to develop.db.

110
00:07:58,000 --> 00:08:06,000
Right, it's basically the time that the efforts that they took for MoDV Lite, they learned a bunch of lessons from that and said,

111
00:08:06,000 --> 00:08:15,000
okay, we should build a system from scratch, specifically designed from the beginning to be embedded inside of, you know, other applications.

112
00:08:15,000 --> 00:08:21,000
So, you could call this an embedded data system, sometimes it's called in process, you could technically call it serverless, right,

113
00:08:22,000 --> 00:08:36,000
because again, it's not a demon that's always running, but the idea is that they're trying to be a, provide a fast SQL execution engine on any possible data file you could find, that you possibly want to query.

114
00:08:36,000 --> 00:08:42,000
Right, again, this is sort of the same idea in Dremel, they want to take any data file that someone may have in their object store,

115
00:08:42,000 --> 00:08:44,000
anyone would run queries real fast on it.

116
00:08:45,000 --> 00:08:49,000
So, the SQL dialect search support is based on Postgres.

117
00:08:49,000 --> 00:08:56,000
They do what we did in an hourly system, we took the Postgres grammar file and just embedded that inside of our system,

118
00:08:56,000 --> 00:09:03,000
but then over the years, what I've liked is that, well, this is how you get, you know, there's, so why there isn't a single SQL standard,

119
00:09:03,000 --> 00:09:10,000
they've added some nice quality of life enhancements that are specific to WDB, like you just type from and then the table name,

120
00:09:11,000 --> 00:09:13,000
that does the same things like the select star, things like that.

121
00:09:13,000 --> 00:09:19,000
And the pitch, which I think is fantastic from a marketing standpoint, to really understand what WDB is trying to be,

122
00:09:19,000 --> 00:09:22,000
is trying to be the SQL light for analytics.

123
00:09:22,000 --> 00:09:29,000
Right, SQL light is the most widely deployed embedded database system, it's on all your phones and your laptops right here right now,

124
00:09:29,000 --> 00:09:35,000
it's running satellites in space, it's in every plane, it's designed to do transactions.

125
00:09:36,000 --> 00:09:41,000
And so, they wanted to sort of have the same ubiquity of SQL light, the proliferation of it being used by everyone,

126
00:09:41,000 --> 00:09:44,000
but specifically for doing fast analytics.

127
00:09:44,000 --> 00:09:52,000
Now, Jignesh has a paper with his students, I think, came out two or three years ago, they've added some enhancements to SQL light to improve the, you know,

128
00:09:52,000 --> 00:09:57,000
it's support to do analytics, but I don't think it comes close to what WDB can do.

129
00:09:58,000 --> 00:10:07,000
So, another important design decision in terms of the implementation of it, is that it's all going to be custom SQL's less code that they've written for WDB.

130
00:10:07,000 --> 00:10:12,000
So, that means they're going to try to avoid bringing in third party dependencies when necessary.

131
00:10:12,000 --> 00:10:17,000
I think for encryption SSL stuff, like that stuff you want to bring in, you don't want to write that yourself.

132
00:10:17,000 --> 00:10:24,000
But like, a bunch of other stuff, they're not going to rely on third party packages or libraries, they're going to write everything themselves.

133
00:10:25,000 --> 00:10:32,000
And this is going to make the system more lightweight, easier to manage from the engineering side of things.

134
00:10:32,000 --> 00:10:45,000
And you have the additional capability of like, now because it's all C++ code that you wrote, and not some weird party library, third party library, they can actually compile it on the wasm, and it can run in your browser very easily.

135
00:10:45,000 --> 00:10:52,000
There's been attempts to get like SQL light, and actually SQL light will run on the wasm, but people would try to get post-gust run on wasm,

136
00:10:52,000 --> 00:10:58,000
and it always seems like a huge hack to get that to work, whereas in productive it's quite simple.

137
00:10:58,000 --> 00:11:08,000
And so the way they're going to be able to expand the, what the system can actually do, beyond the sort of core runtime engine, they're going to rely heavily on an extension ecosystem.

138
00:11:08,000 --> 00:11:09,000
We'll talk about in a second.

139
00:11:09,000 --> 00:11:15,000
So they'll have like the official ones that they support, but also you can download arbitrary ones and install them.

140
00:11:15,000 --> 00:11:19,000
And that, again, that makes the core engine lightweight and easier for them to manage.

141
00:11:20,000 --> 00:11:29,000
So again, like we talked about when we talked about photon, like the design philosophy of like, okay, they have to maintain all the spark Java crap, and they want to avoid Java.

142
00:11:29,000 --> 00:11:33,000
So photon was the supposed engine that they evoked down through JNI.

143
00:11:33,000 --> 00:11:34,000
Yes.

144
00:11:34,000 --> 00:11:36,000
So let's work exactly what we mean.

145
00:11:36,000 --> 00:11:37,000
Are we looking like, like, lambda function, something like that?

146
00:11:37,000 --> 00:11:46,000
Yeah, so service will be like a lambda function, meaning like, the process goes away when like, if nothing is actively using it.

147
00:11:46,000 --> 00:11:50,000
So embedded, embedded is a better one.

148
00:11:50,000 --> 00:11:52,000
Like, embedded is sort of the same idea.

149
00:11:52,000 --> 00:12:00,000
Like, there has to be some other process already running that then links into the data system, and then it is, I don't think you hand it threads where you do in SQL light.

150
00:12:00,000 --> 00:12:06,000
I think you spin up a zone threads, but like, it's all within the same address space as the host process.

151
00:12:06,000 --> 00:12:08,000
It's like a library.

152
00:12:08,000 --> 00:12:10,000
It's like a library, yes.

153
00:12:10,000 --> 00:12:12,000
Yeah, it's a library, yes.

154
00:12:12,000 --> 00:12:20,000
All right, so here's at high level what the major features that are in, in ducty B.

155
00:12:20,000 --> 00:12:28,000
And again, the number one difference at the top is going to be that it shared everything versus all the shared disk or disaggregated storage stuff we talked about before.

156
00:12:28,000 --> 00:12:30,000
Because again, it's an embedded database system.

157
00:12:30,000 --> 00:12:33,000
It has no notion of a separate and compute in storage.

158
00:12:33,000 --> 00:12:38,000
I mean, you'll see that they can use extensions to talk to the cloud platforms and so forth.

159
00:12:38,000 --> 00:12:48,000
But the, you know, at its core, it is sort of just like just a, just the query engine.

160
00:12:48,000 --> 00:12:50,000
It's not in time to do because they knew transactions.

161
00:12:50,000 --> 00:12:52,000
They have them in file format.

162
00:12:52,000 --> 00:12:58,000
So, but it's again, it's not the like scaled out architecture that we saw in Dremel and others.

163
00:12:58,000 --> 00:13:04,000
Their new push based vectorized query processing will spend most of our time talking about this because they actually started doing pull based.

164
00:13:04,000 --> 00:13:12,000
And then they switched over two years ago, three years ago to push base and they talk about all of the challenges they face scaling out.

165
00:13:12,000 --> 00:13:17,000
The pull based model and why switching to a bush based one was better.

166
00:13:17,000 --> 00:13:23,000
Again, given the, the, the, the provenance of coming from the CWI vector wise was invented.

167
00:13:23,000 --> 00:13:26,000
They're going to pre-compile primitives. That's not, that's not a surprise.

168
00:13:26,000 --> 00:13:31,000
They use a solid MVCC that's actually based on what the Germans do in Umbra or sorry in hyper.

169
00:13:31,000 --> 00:13:36,000
We're not going to cover this paper, but I'll actually a lot of these are based on what the Germans did.

170
00:13:36,000 --> 00:13:42,000
Some, some ways you can say like they let me just took the papers and re-implement the stuff that the hype, that we, for all the papers we talked about today.

171
00:13:42,000 --> 00:13:48,000
For example, they're doing morsels. They're going to do the, the, the, the un-nesting the arbitrary sub queries.

172
00:13:48,000 --> 00:13:52,000
They're the only databases other than hyper and Umbra that can do this.

173
00:13:52,000 --> 00:13:54,000
Yes.

174
00:13:54,000 --> 00:14:01,000
Why would you want morsel fellows to work something that's intended to be better, maybe like on a pizza box?

175
00:14:01,000 --> 00:14:06,000
So actually, why would you want morsel parallelism, if you, if you tend to, if you tend to be running on a pizza box.

176
00:14:06,000 --> 00:14:10,000
But a pizza box with nowadays has a sheet little cores, right?

177
00:14:10,000 --> 00:14:12,000
Doesn't have one of the ones.

178
00:14:12,000 --> 00:14:18,000
When it's a pizza box, I mean like one unit rack, rack unit, you can put like multiple sockets in those things.

179
00:14:18,000 --> 00:14:23,000
Or even the, whatever, the AMD, the Ryzen, the latest one, it's a ton of cores.

180
00:14:23,000 --> 00:14:27,000
The thread, I forget the exact number now. You can get a ton of cores.

181
00:14:27,000 --> 00:14:30,000
So why, why wouldn't you want to use them?

182
00:14:30,000 --> 00:14:35,000
And it's specifically like not, not new like, the way it's called.

183
00:14:35,000 --> 00:14:38,000
Well, of course, they're on the same like talking.

184
00:14:38,000 --> 00:14:42,000
Actually, I don't know whether this is actually new more aware. I don't, the paper doesn't say.

185
00:14:42,000 --> 00:14:49,000
But I imagine it's not hard to figure that out, right? You also tell you.

186
00:14:49,000 --> 00:14:59,000
Like SQLite, I would say, SQLite really was designed to run on like a one core very-parent CPU, like from the, like from the 2000s.

187
00:14:59,000 --> 00:15:11,000
There's a, even more stripped down data system called extreme DB, that's running like on like S.O.C.s in like missiles and shit like that.

188
00:15:11,000 --> 00:15:15,000
Right? Where like you don't even have an operating system.

189
00:15:15,000 --> 00:15:19,000
So there's system, even more like low level than that.

190
00:15:19,000 --> 00:15:25,000
SQLite's a little bit more, right? And in that case, SQLite can't do parallel query execution.

191
00:15:25,000 --> 00:15:29,000
Like, whatever thread makes the SQL request, that's the one that runs it.

192
00:15:29,000 --> 00:15:34,000
I'm fairly certain. Whereas in ductyb, like one thread would make the request.

193
00:15:34,000 --> 00:15:46,000
But then if you tell it how many threads you're allowed to spread the query, query across, and they use more cells to do that schedule.

194
00:15:46,000 --> 00:15:52,000
Right? So the pack stuff that we've covered that many, many times, they're going to do the sort merge join and hash joins.

195
00:15:52,000 --> 00:15:57,000
And then the stratified query optimizer is, looks very similar to what we talked about before.

196
00:15:57,000 --> 00:16:09,000
And if you're running on arbitrary files, they may not have any statistics for, so they're using much of rules to figure out some basic join order or heuristics or things like that.

197
00:16:09,000 --> 00:16:13,000
But the one thing they do well is the unnesting arbitrary subqueries.

198
00:16:13,000 --> 00:16:18,000
They didn't support unnesting arbitrary subqueries for lateral joins.

199
00:16:18,000 --> 00:16:22,000
And as I said last year in 721, the students actually did that.

200
00:16:22,000 --> 00:16:25,000
Like Sam arched the PGA student here. They got that merge into ductyb.

201
00:16:25,000 --> 00:16:28,000
So they can handle all possible subqueries now.

202
00:16:28,000 --> 00:16:40,000
All right, so we're going to spend those right time talking about the push based architecture because they're going to talk about its public about actually how they're going to pass data between the operators, which is something we haven't really discussed.

203
00:16:40,000 --> 00:16:53,000
So as I mentioned, the original version of ductyb prior to 2021 was using a pull based vectorized extrusion model with precomp默 primitives.

204
00:16:53,000 --> 00:17:13,000
But then over the years, they found that it was turned out to be cumbersome to maintain and work on because every single time that you wanted to add a new operator and make it parallel, you had to modify this control plane piece to say, OK, here's this parallel thing we can now we now run.

205
00:17:13,000 --> 00:17:17,000
It was more infrastructure that they had to maintain for every single time to add something new.

206
00:17:17,000 --> 00:17:29,000
The other challenge they had is that because now, since they want to be able to support reading data from not necessarily local disk, right, remote files, and they can support HTTPS or S3 and so forth.

207
00:17:29,000 --> 00:17:39,000
Now you have this challenge where some pipeline may be blocked because it's getting data over the network, but there are other pipelines you could start running because they don't need to wait for that data.

208
00:17:39,000 --> 00:17:50,000
But if you do a pull based model, like the volcano approach, where you're calling get next, get next, get next, the call stack down between the query plan, that's the century, the state of where things are being executed.

209
00:17:50,000 --> 00:18:01,000
So if you reach the bottom to a leaf node and that leaf node wants to go get remote data, you have no way to like pause it, unwind it, go back up the stack, and then maybe call down another pipeline.

210
00:18:01,000 --> 00:18:11,000
Basically, the control flow of the execution of the query plan is implicitly within that call stack.

211
00:18:11,000 --> 00:18:23,000
So if they switch to a push based model, then now you have the centralized scheduler using morsels that I can say are these are the pipelines or tasks that I can run right now, go ahead and run them.

212
00:18:23,000 --> 00:18:29,000
And here's the ones where I know I'm waiting for IO for whatever reason, and we go, we pause them and wait.

213
00:18:29,000 --> 00:18:44,000
So for them, they found it is a not just in terms of performance, but in terms of the engineering of not assuming the data is always readily available, switching to a push based model, trying to be a much better approach for them.

214
00:18:44,000 --> 00:18:58,000
And the great thing about it is you can read the actual PR or Mark, the co-creators of it, added the push based model, and now talks about all the great things they were able to achieve with it.

215
00:18:59,000 --> 00:19:03,000
What's wrong?

216
00:19:03,000 --> 00:19:05,000
What's that?

217
00:19:05,000 --> 00:19:06,000
It's getting ours as huge.

218
00:19:06,000 --> 00:19:11,000
Yeah, I mean, because they ripped out all the pull based stuff and switched to a push based stuff.

219
00:19:11,000 --> 00:19:12,000
Who are you?

220
00:19:12,000 --> 00:19:13,000
I don't know.

221
00:19:13,000 --> 00:19:16,000
Anyway.

222
00:19:16,000 --> 00:19:19,000
Probably a bunch of people are coming for it.

223
00:19:19,000 --> 00:19:21,000
There's only just a little wallet on screen.

224
00:19:21,000 --> 00:19:23,000
They probably did all the ones.

225
00:19:23,000 --> 00:19:25,000
Mark's amazing.

226
00:19:25,000 --> 00:19:30,000
I think in this point, 2021, I think he was still a postdoc.

227
00:19:30,000 --> 00:19:34,000
The Dutch model is kind of weird as a teacher student.

228
00:19:34,000 --> 00:19:36,000
CWI is not a university.

229
00:19:36,000 --> 00:19:41,000
It's like a research consortium of a bunch of other universities.

230
00:19:41,000 --> 00:19:46,000
So technically, all the people there, like Peter Bonds, Hannes, Martin, he's died.

231
00:19:46,000 --> 00:19:54,000
They had affiliations with other universities, but they didn't teach classes really, and they just wrote code at CWI.

232
00:19:54,000 --> 00:20:02,000
Again, this is one of the pros and cons of the American academic model versus the European one.

233
00:20:02,000 --> 00:20:07,000
In case of German, the Germans, they get six free PG students a year.

234
00:20:07,000 --> 00:20:14,000
Each PG student here costs me $120,000 to $1,000 a year.

235
00:20:14,000 --> 00:20:19,000
So they're getting a ton of money and their top students that can write a ton of code for them.

236
00:20:19,000 --> 00:20:24,000
Whereas it's hard to scale up at the same level.

237
00:20:24,000 --> 00:20:26,000
CWI is the same sort of thing.

238
00:20:26,000 --> 00:20:30,000
Mark basically did a wrote code full time on duck DB.

239
00:20:30,000 --> 00:20:34,000
It doesn't surprise me that he did this entire PR.

240
00:20:34,000 --> 00:20:36,000
It means he's also very smart.

241
00:20:36,000 --> 00:20:38,000
I'm not surprised that he did it.

242
00:20:38,000 --> 00:20:44,000
He's just saying he had the opportunity to do this, even though he's a PG student.

243
00:20:45,000 --> 00:20:58,000
So because now they switch to a push-based model, they talk about how this opens up a bunch of opportunities to do additional optimizations that you would be very difficult to do in a pool-based model.

244
00:20:58,000 --> 00:21:01,000
Again, some of these, I think we talked about, but not all of them.

245
00:21:02,000 --> 00:21:11,000
The first one is that because now you have explicit control of when you can basically pause a pipeline.

246
00:21:11,000 --> 00:21:19,000
If you, since all the tasks are in this centralized scheduler table, if you will, or list, you say,

247
00:21:19,000 --> 00:21:22,000
OK, well, this thing is going too fast or going too slow.

248
00:21:22,000 --> 00:21:26,000
Let me just prevent any more tasks for that pipeline from executing.

249
00:21:26,000 --> 00:21:34,000
So you can do things like, if my scan is running too fast, I can do that back pressure.

250
00:21:34,000 --> 00:21:45,000
But if my scan is producing not a lot of data as it's going up, rather than having the filter send up a bunch of data that's not...

251
00:21:46,000 --> 00:21:55,000
On half empty or semi-full vectors, you basically pause things, have it buffer the output between the filter and the aggregate.

252
00:21:55,000 --> 00:21:59,000
And then when that fills up, then you can say, OK, now you can start executing again.

253
00:21:59,000 --> 00:22:02,000
We talked a little bit about the mediated or lack of operator fusion.

254
00:22:02,000 --> 00:22:04,000
We talked about vectorization query compilation.

255
00:22:04,000 --> 00:22:13,000
This is the paper that we wrote where in order to maximize the vectorization between operators in a push-based model, you have a little buffer in between.

256
00:22:13,000 --> 00:22:19,000
So they can introduce that, but then not just fill it up and then pass it along, they can say, OK, well, this thing's not full yet.

257
00:22:19,000 --> 00:22:24,000
You're allowed to keep executing already. It is full. Let me go ahead and pause you.

258
00:22:24,000 --> 00:22:29,000
They can also do scan sharing because all the query plans are DAGs.

259
00:22:29,000 --> 00:22:39,000
So you could have your scan start producing results, fill up some buffers that you can then reuse for this parent operator and this parent operator.

260
00:22:39,000 --> 00:22:45,000
Again, in a pull-based model, if you're calling getnext, getnext, every child has to have one parent.

261
00:22:45,000 --> 00:22:51,000
So how would you pass along that information? It would have to be this weird, like, sideways information passing.

262
00:22:51,000 --> 00:22:57,000
So in this case here, they just fill the buffer up and say, OK, well, the buffer is full. This parent task can run.

263
00:22:57,000 --> 00:23:03,000
OK, before I throw away the intermediate result from this child, then you go and invoke the other one.

264
00:23:03,000 --> 00:23:08,000
And again, through the centralized coordinator, you can turn these things on and off as needed.

265
00:23:10,000 --> 00:23:24,000
And then the last one is, if you recognize that the operators on the top of the query plan can't consume or process the data you're passing up quickly as possible, you can just pause things.

266
00:23:24,000 --> 00:23:32,000
So you can introduce a buffer here that says, OK, when this thing gets more than 10 megabytes, even though I have more memory, I could keep going.

267
00:23:33,000 --> 00:23:40,000
Rather than letting balloon indefinitely, I just can pause the whole pipeline and don't let any more tasks execute for it.

268
00:23:40,000 --> 00:23:46,000
The other one is also super useful, is like, because again, you're reading remote data over HTTP.

269
00:23:46,000 --> 00:23:59,000
Instead of having this entire task just paused while you're thread being blocked while you're fetching this, you do the background IO, fill up some buffer, and then when the data is available, then you can kick off the execution again.

270
00:24:00,000 --> 00:24:08,000
Think about how you would do that with GetNext. I call GetNext down here. They make a remote call at HTTP to go get some data.

271
00:24:08,000 --> 00:24:17,000
And then I need to go back up and say, OK, I don't have the data you're looking for, but call me back again when it's actually available. You have to make another GetNext call.

272
00:24:17,000 --> 00:24:26,000
It gets really awkward and weird. Whereas the push-based model, because now the control flow and the data flow are separate, this makes us all much easier to do.

273
00:24:30,000 --> 00:24:35,000
The next thing that's interesting is how they, what their intermediate result vectors look like.

274
00:24:35,000 --> 00:24:45,000
So there's the data, obviously, on disk. We'll talk about it in a second. That's going to be more heavily compressed, because you want to reduce the size of the data itself.

275
00:24:45,000 --> 00:24:54,000
But once everything's in memory, when you're going from one operator to the next, they want to do a lightweight encoding similar to what we talked about before to pass data from one operator to the next.

276
00:24:55,000 --> 00:25:01,000
And they're basically going to have four vector types that are specialized or three of them are specialized to different types of data.

277
00:25:01,000 --> 00:25:11,000
So without any compression, they call the vector on compressed or flat, and it's just the listing in a columnar order of the values.

278
00:25:11,000 --> 00:25:21,000
But if they recognize that within the vector you're passing along, it only has one value. Then rather than passing one of that repeated value over and over again, they can have what's called a constant vector.

279
00:25:22,000 --> 00:25:28,000
And it's just a single value that says this entire vector has 1,000 tuples, and they all have one single value.

280
00:25:28,000 --> 00:25:37,000
They have a dictionary vector like we talked about before, but the selection vector that says what offset in the dictionary corresponds to the data you're looking for.

281
00:25:37,000 --> 00:25:47,000
And they have what they call as a sequence vector. This is basically some variation of a special case of delta encoding where you have the starting values, the base.

282
00:25:48,000 --> 00:25:52,000
And then you just say for every single value that comes after that, incremented by this amount.

283
00:25:52,000 --> 00:25:54,000
So you have the other case.

284
00:25:54,000 --> 00:26:01,000
Sometimes you have other increment keys as the primary key for a column error or sequence. It's like 1,2,3,4,5,6,7,8,9,10.

285
00:26:01,000 --> 00:26:08,000
If you recognize that, you just need to store two values to say, here's the base and here's how it's being incremented.

286
00:26:09,000 --> 00:26:19,000
So again, they'll figure this out on the fly while you're actually processing the data between what operative the next, which of these versions you can use.

287
00:26:19,000 --> 00:26:23,000
And then the default has always fall back to flat because it's just the simplest one.

288
00:26:23,000 --> 00:26:29,000
So their, actually in memory layout is, they actually designed this in conjunction with Velox.

289
00:26:29,000 --> 00:26:33,000
So they're actually compatible with the vectors that Velox passes around.

290
00:26:33,000 --> 00:26:41,000
And again, at a high level, it smells like arrow. But my understanding it's not exactly completely 100% in the memory layout isn't 100% compatible.

291
00:26:43,000 --> 00:27:02,000
So now the challenge though is that because it's a pre-compiled primitives, if you have all these different variations of these different vector types, for all the possible combinations of data types you could have, now you have this comment-torn explosion of the number of possible primitives you would actually need.

292
00:27:03,000 --> 00:27:13,000
And even if you template it everything, now this is going to balloon up your code base when it gets compiled, which makes a compilation slower, but also expands the size of the code in memory.

293
00:27:13,000 --> 00:27:16,000
It makes the process more heavier.

294
00:27:16,000 --> 00:27:28,000
So what they want to do for three of these vector types is that they want to get them into what they call a unified format, where there is a, now you have a single primitive that knows how to do whatever processing you need,

295
00:27:28,000 --> 00:27:33,000
or in that data without having to do any conversion or memory copying.

296
00:27:33,000 --> 00:27:38,000
So for the flat one, it's super easy because it's just exactly the same.

297
00:27:38,000 --> 00:27:49,000
But then now they're going to add this selection vector just to say, here's the data, and then for the, you know, here's the offset that corresponds to the data that the tuple that offset matches for.

298
00:27:49,000 --> 00:27:52,000
Right? That looks a lot like dictionary encoding.

299
00:27:53,000 --> 00:27:57,000
So this is actually how the represent things in memory and pass things along.

300
00:27:57,000 --> 00:28:02,000
And then now they don't have to decode it if they're matching up against another dictionary one.

301
00:28:02,000 --> 00:28:10,000
For constant same thing, right? It's basically dictionary coding. I have, that's backwards. Sorry.

302
00:28:10,000 --> 00:28:20,000
Yeah, sorry, that's constant. The constant one, again, it's just, I have a single value as my data as it is as if it was a dictionary, and then here's the selection vector, which is all zeros because they're all pulling into the same one.

303
00:28:20,000 --> 00:28:23,000
And then the dictionary one, it's basically the same thing.

304
00:28:23,000 --> 00:28:35,000
So again, like even though they have different compression schemes for, for these different, three different vector types, the sequence ones, I think they always have to unroll into the flat one.

305
00:28:35,000 --> 00:28:42,000
But all this looks the same now, and then you have a primitive that operates exactly on this data, and you don't have to do any extra memory copying.

306
00:28:42,000 --> 00:28:49,000
And you get the benefit of like, oh, if it's constant, you know, you're passing along less data than before.

307
00:28:49,000 --> 00:28:58,000
So this is what they call the unified, unified vector format. And again, this is for the intimate results that are going from one operator to the next.

308
00:28:58,000 --> 00:28:59,000
But the increment one?

309
00:28:59,000 --> 00:29:08,000
The increment one, I think they have to unroll it. But I might, that might be a year out of date. I haven't looked.

310
00:29:08,000 --> 00:29:23,000
So the other interesting that that we're talking about, Dr. B, the way I haven't really talked about before, is how they enter the, they can work with this, you know, the non-seco ecosystem that data scientists are coming using.

311
00:29:23,000 --> 00:29:36,000
And so, you know, if you're being like Python Pandas, people operating on data frames, and they want to, you know, data frames provides this API to do the manipulations, but at a high level, it basically looks like relational algebra.

312
00:29:36,000 --> 00:29:56,000
And so what they want to be able to do is for people that can link in, or, you know, instantiate Dr. B within their Python or our program, write to some common API based on data frames, and then have that get translated into the corresponding SQL command that can then retrieve the data that you're looking for.

313
00:29:57,000 --> 00:30:08,000
And so there's, they say support two different libraries, one for R, one for Python, one's called Deplier Piler, and it goes, Ibus, Ibus was developed by the guy in the Apache Arrow, I forget where Deplier came from.

314
00:30:08,000 --> 00:30:17,000
Did anybody ever heard of these before or no? No. Let me show you what it looks like.

315
00:30:17,000 --> 00:30:33,000
But basically, it's a, again, it's a, it looks like if you ever use like Spark, PySports and things like that, right, it's going to have, you know, APIs that manipulate data frames like this, right, and sort of like this, the fashion things get the head, right, and then this is the output.

316
00:30:33,000 --> 00:30:40,000
So again, it's like the procedural language to manipulate data frames, which are just basically relations or tables in a database.

317
00:30:40,000 --> 00:30:45,000
And then would Deplier, sorry.

318
00:30:50,000 --> 00:30:51,000
What's wrong? Yes.

319
00:30:51,000 --> 00:31:00,000
The difference something that is still on the Apache Arrow is the other way around, the Apache Arrow integrated data frames.

320
00:31:00,000 --> 00:31:04,000
So question is, is data frames like working for?

321
00:31:04,000 --> 00:31:13,000
So data frames came from pandas, I think, and the guy invented pandas also invented Arrow.

322
00:31:13,000 --> 00:31:26,000
Yeah, so that's the connection there. But like the idea, like through like the pandas API or Deplier Piler, Ivis, like you can manipulate what you think are data frames and memory.

323
00:31:26,000 --> 00:31:30,000
That could be though in the Apache Arrow format.

324
00:31:30,000 --> 00:31:34,000
Because the whole point is like, like again, going back to that paper guy's red, don't hold my data hostage.

325
00:31:34,000 --> 00:31:42,000
Like they make a big deal, like, okay, well, if you just use JDBC to go run some query on a database, you're going to get it back back a bunch of rows.

326
00:31:42,000 --> 00:31:49,000
And then if you're using like pandas or some Python program, then that's kind of then do a pivot convert it now to a column store.

327
00:31:49,000 --> 00:31:59,000
So what you really want to do is hand things off as arrow, and then now your Python code or our code can manipulate directly on those arrow buffers, even though you're still operating on the data frame API.

328
00:31:59,000 --> 00:32:08,000
So that's the idea with these integrations is that I mean the deep pile of the one has it.

329
00:32:08,000 --> 00:32:13,000
First go down, like you see that they have these basic primitives.

330
00:32:13,000 --> 00:32:17,000
And then they have different back ends and then here's the one for for ducty B, right?

331
00:32:17,000 --> 00:32:28,000
Dropping replacement for for deep pile that uses the same API. But what's going to happen is when I write code against this thing, it's actually not going to generate sequel.

332
00:32:28,000 --> 00:32:38,000
Where is something to look at? Right, yeah, so here, like, that's the data frame.

333
00:32:38,000 --> 00:32:47,000
Here's the query. So here's some query here. More or less looks like some, you know, bash it as version of sequel, which is, you know, instead of where calls is called filter, right?

334
00:32:47,000 --> 00:32:52,000
Instead of average is called mean. But at a high level, this basically looks like sequel.

335
00:32:52,000 --> 00:33:09,000
And so what these integrations do with with ducty B is that is that converting these commands to sequel the library will convert this action to a logical plan of the internal representation that that ducty B has for queries.

336
00:33:09,000 --> 00:33:18,000
And then as if it got parsed from from the sequel from the command line or whatever, and then it hands that off now to the optimizer who can then convert that to the physical plan. Yes.

337
00:33:18,000 --> 00:33:25,000
People hate writing sequel that much. David is do people hate writing sequel that much.

338
00:33:25,000 --> 00:33:38,000
You're talking the wrong dude. So I mean, no, so it's it's similar to we saw with UDS right there's certain things that are hard to express in in sequel.

339
00:33:38,000 --> 00:33:49,000
Yeah, but like, yeah, so like there's a lot of there's a lot of data scientists that prefer to use pandas and Python APIs and Python notebooks.

340
00:33:49,000 --> 00:34:01,000
And certainly for some things, like it doesn't make sense to run that database. Like if you're going to call it PyTorch stuff, like it may not make make sense to have that run the database system could run that locally or farm it out to.

341
00:34:01,000 --> 00:34:22,000
To like spark and actually that's one of the one of the one of the advantages of like data bricks, although snowflake has snowpark. Forget what the Google one is like this this single environment where you could do run your sequel query on the overlap engine plus also run like scale out machine learning jobs all together instead of one interface.

342
00:34:22,000 --> 00:34:34,000
That's that's very common now, but it's also very common like you know for this if you're running a one off experiments just to download the whole file locally crunch on it using Python and then maybe upload results or handle somebody else.

343
00:34:34,000 --> 00:34:40,000
So the idea here is now like instead of having like the pandas runtime is actually very slow.

344
00:34:40,000 --> 00:34:57,000
But instead of you so now if you want to manipulate data frames if you put your data in like park a files then like duck DB do the crunching of the park a files and set a pandas itself and you get all the advantages of modern OLAP system that we've talked about in the entire semester directly in your Python notebook.

345
00:34:57,000 --> 00:35:01,000
So that that's that's the idea here.

346
00:35:01,000 --> 00:35:21,000
And again the zero copy is the big idea this is what Apache arrow sort of this is what the was the ritual foundation or the motivation of Apache arrow that you could pass around data between your disparate applications running the same same address base without having to do serialization decilization.

347
00:35:21,000 --> 00:35:44,000
Now as I said it's basically being used as the transport protocol or format between different nodes running in a system right so but in this case here can duck DB's in process you can get data in and out of duck DB back and forth between duck DB and in Python are through these different APIs through all Apache arrow.

348
00:35:44,000 --> 00:35:50,000
Because again same address base if I malock in duck DB hand you some buffer.

349
00:35:50,000 --> 00:36:01,000
You know how I actually keep track of who has to free it that's a separate thing but like I don't have to do a mem copy to be able to manipulate it in Python.

350
00:36:01,000 --> 00:36:08,000
Duck DB also supports the execution of substrate plans as well but I think that's done through that's done through an extension.

351
00:36:08,000 --> 00:36:24,000
So I think you can take a substrate serialized plan and then handle the duck DB just as if it was a logical plan generated by one of these guys and then it'll convert it to its physical plan that that can then execute.

352
00:36:25,000 --> 00:36:45,000
So this thing I mean it goes back to the very beginning we were talking about before like that red post like quality of life things or like the ease of use like if I have a bunch of Python notebooks and I want to use some data that I have stored out in in my object store but I want to run them in you know like an old that engine or something like that.

353
00:36:46,000 --> 00:36:57,000
If I can reduce the friction how much manipulation I have to do for the existing code that the better user experience is that I'm saying okay rewrite all your Python stuff to see well no one's going to do that willingly.

354
00:36:57,000 --> 00:37:11,000
So I've already sort of been into multiple times that like duck DB does support reading a bunch of different file formats that we've covered but it also has its own proprietary custom file format.

355
00:37:11,000 --> 00:37:26,000
Similar to like you know if you create you know open up SQL light you call create table it'll write out the dot db dot SQL life file you'll get the same thing duck DB has his own proprietary file format is meant to run as a single generate everything is a single file.

356
00:37:26,000 --> 00:37:41,000
Now when you do update on it just like in SQL light they'll maintain a maintain a right-of-hand log as a separate file and for temp files or temp data that gets built to separate files as well but the core database itself that you attached to is always going to be a single file.

357
00:37:42,000 --> 00:38:01,000
So no surprise it's going to be packs their row group is set to be 120,000 tuples and important thing to understand is that there to be more aggressive with the compression schemes that they're going to use when it goes to disk versus once in memory in particular they're going to do bit packing or the frame of reference optimizations that we talked about before.

358
00:38:02,000 --> 00:38:30,000
So when you actually start writing data at the disk I think you do much inserts are copying into drb that then writes out to the database they're going to do something sort of similar we told with better blocks where they'll have a sort of an initial pass to look at the data figure out what it looks like use some kind of ranking algorithm to decide which is the best and most efficient encoding scheme for for that data and then once they figured out then they compress it and then write it out the disk and they're going to do this on a per column basis.

359
00:38:30,000 --> 00:38:59,000
I think within a row group itself. So this table is a bit at a date this is from 2022 but you can see over the years over the different versions when they've added different compression schemes and even the latest one I think this came out in March they have they had the latest compression scheme from another project at CWI called Alps that we didn't cover for floating point numbers but you can sort of see how the compare against like you know base compression in parquet.

360
00:39:00,000 --> 00:39:06,000
With snappy as standard you know for the different light weight encoding schemes.

361
00:39:06,000 --> 00:39:14,000
Yes sorry the columns are these are different like well known data sets of benchmarks so the tax.

362
00:39:14,000 --> 00:39:28,000
What's that you line up light item is tch tbch taxi is the New York City taxi database it's like every single taxi every single taxi ride over like a one year period like and like what you know.

363
00:39:28,000 --> 00:39:37,000
The pick up in the drop of location and then on time I think that's a flight data but I'm not sure.

364
00:39:37,000 --> 00:39:49,000
But again this is this is the own disc format they only have those four vector types once everything is in memory because you want that to be that processing to go as fast as possible.

365
00:39:49,000 --> 00:40:00,000
So so in addition to be a support again reading their own proprietary file format on the local disk as I said they can read data in other file formats.

366
00:40:00,000 --> 00:40:05,000
Parquet is not surprising I don't know the I don't think they support orc.

367
00:40:05,000 --> 00:40:08,000
I don't see it here.

368
00:40:08,000 --> 00:40:19,000
Obviously can support arrow another cool thing they can do is they can attach to a SQL light database and actually read that directly and that can manipulate it directly.

369
00:40:19,000 --> 00:40:27,000
And you know you attach to the to the database and you see it as if it was a you see the catalog you see all the scheme and everything.

370
00:40:27,000 --> 00:40:34,000
You know from your from your perspective you don't see that you don't know that it's actually SQL like data SQL like database versus a.

371
00:40:34,000 --> 00:40:38,000
versus a ducty B database.

372
00:40:38,000 --> 00:40:44,000
They also support obviously reading JSON and then the for the postgres one day I think they connect to the postgres.

373
00:40:44,000 --> 00:40:54,000
Over like JDBC but again it sucks in all the catalogs or within ducty B you can see all the tables you have in in postgres and run queries on them.

374
00:40:54,000 --> 00:41:03,000
But I don't know how much is like they they push and pull between pushing down the query into postgres versus sucking the data in and running more quickly inside a ducty B.

375
00:41:03,000 --> 00:41:11,000
Like because the ducty B query engines is going to be way faster than then postgres for doing analytics.

376
00:41:11,000 --> 00:41:21,000
So these are the if you call from it's hard to see it from ducty B extensions like this will give you all the listing of the official built in ones and whether they're learning or not.

377
00:41:21,000 --> 00:41:35,000
And as I was saying before they're trying to minimize the the sort of the size of the core engine binary itself for not bringing in additional binaries or additional code.

378
00:41:35,000 --> 00:41:40,000
But they if you do need it then you get it through these extensions.

379
00:41:40,000 --> 00:41:50,000
One in particular is is ICU like that thing is super important that's like the international like timestamps and time zones and things like that and date formats.

380
00:41:50,000 --> 00:41:55,000
That one you don't want to write yourself the Germans did I'll talk about that in a second.

381
00:41:55,000 --> 00:42:01,000
But like so but a lot of people need it so like you get it through one of these extensions because it's going to be a third party library.

382
00:42:01,000 --> 00:42:11,000
The Germans told me that one time they were going to do a sales call this is back when it was hyper and they needed the customer they were living on the plane flying to meet some customer.

383
00:42:11,000 --> 00:42:18,000
I don't know where in Europe and they were running queries with the ICU library and it was super slow.

384
00:42:18,000 --> 00:42:26,000
So then Thomas within the flight without internet rewrote the ICU library on the flight and they had it you know ten times faster when they landed.

385
00:42:26,000 --> 00:42:38,000
The same right so the one I want to point out though here is this one called mother duck and again this is like you just download duck duck db and you call show extensions these are all the things you can you can get.

386
00:42:38,000 --> 00:42:45,000
And I think some of these again they're not they're not shipped in the binary you say load them it'll pull them down from the duck to the website.

387
00:42:45,000 --> 00:42:52,000
But this one here again this duck to be so this comes along the same called mother duck. So what is that yes.

388
00:42:52,000 --> 00:43:07,000
How does the extension work? How do you load these extensions? It's shared objects you call load and then load a create extension.

389
00:43:07,000 --> 00:43:14,000
And then you want and then I think it will pull down for you from the one.

390
00:43:14,000 --> 00:43:23,000
I think when you call create extension yes. I think because I think the binary you know when you download it's not that big.

391
00:43:23,000 --> 00:43:27,000
There's not like a new style of creating something like you.

392
00:43:27,000 --> 00:43:36,000
Yeah correct yes. I think actually I think some of them are shipped with it but they're not.

393
00:43:36,000 --> 00:43:44,000
They're not they're not loading automatically. I mean some of these say built in and that would be equivalent to like in Postgres within the Postgres

394
00:43:44,000 --> 00:43:51,000
Source tree they have a contrib directory and that has like official third party extensions that are shipped with Postgres itself.

395
00:43:51,000 --> 00:43:57,000
But obviously things like PG vector you just download that from GitHub and install yourself. So it's similar model.

396
00:43:57,000 --> 00:44:06,000
Yeah you can of course you know that Postgres too. It's just linking in a shared object.

397
00:44:06,000 --> 00:44:11,000
And then that shared object has to implement this kind of extension API to note the entry point when you want to book something.

398
00:44:11,000 --> 00:44:21,000
Yeah that's yes. The question is like they may be asking like when you download duck to be and get the executor doesn't come with these built in.

399
00:44:21,000 --> 00:44:25,000
I think some of them yes other ones I think you get from their website.

400
00:44:25,000 --> 00:44:32,000
Is there actually is at least one extension that can be loads or one that's one that overwrite the malloc implementation.

401
00:44:32,000 --> 00:44:41,000
Overwrite the what sorry. The malloc implementation to give you a malloc. Yeah but that's that comes with it automatically.

402
00:44:41,000 --> 00:44:45,000
I'm sorry we don't actually do not say that.

403
00:44:45,000 --> 00:44:50,000
We don't only talk about malloc. You never want to use lip see malloc for your database system.

404
00:44:50,000 --> 00:44:55,000
You always almost always want to use J email. In rare cases maybe you maybe want to use TC malloc.

405
00:44:55,000 --> 00:45:04,000
And that one's from Google J email is from Facebook. It's just like it's it's it's just way more efficient.

406
00:45:04,000 --> 00:45:11,000
It's less it's more scalable for multiple cores like it takes less the latches are less expensive.

407
00:45:11,000 --> 00:45:18,000
TC malloc is thought to be better for for multi-fitted applications. If you have a lot of cores.

408
00:45:18,000 --> 00:45:26,000
But J email is always the right choice. So pretty much everyone uses uses this in their data system.

409
00:45:26,000 --> 00:45:30,000
We didn't talk about huge pages. That's another one that most assessments don't do that.

410
00:45:30,000 --> 00:45:34,000
But you never want to use transparent huge pages in the OS. That's always a nightmare.

411
00:45:34,000 --> 00:45:40,000
But I think it's gotten better. But we can talk about it. If people are curious about these things we can talk about a bit more.

412
00:45:40,000 --> 00:45:43,000
But we're going to do this use gmail. Yes.

413
00:45:43,000 --> 00:45:49,000
What's the problem with lip see what's the big one? What's the big problem with the lip see malloc?

414
00:45:49,000 --> 00:45:53,000
Yeah, it's too many latches inside of it.

415
00:45:53,000 --> 00:45:54,000
No, not a lot.

416
00:45:54,000 --> 00:46:00,000
J email is basically designed for like taking lightweight latches. Small critical section is to be the scale of multiple cores.

417
00:46:00,000 --> 00:46:02,000
And you use it like.

418
00:46:02,000 --> 00:46:03,000
It's not.

419
00:46:03,000 --> 00:46:09,000
It's a question. Why is there any reason why it's not the default in Linux?

420
00:46:09,000 --> 00:46:12,000
That's why we didn't want to use malloc.

421
00:46:12,000 --> 00:46:17,000
The jmailoc is not written explicitly for databases.

422
00:46:17,000 --> 00:46:19,000
Because all the data is used because it's much better.

423
00:46:19,000 --> 00:46:22,000
It pretty much any high performance application is going to use jmailoc.

424
00:46:22,000 --> 00:46:24,000
And why it has not.

425
00:46:24,000 --> 00:46:26,000
Can you see?

426
00:46:26,000 --> 00:46:28,000
I think of a form of form.

427
00:46:28,000 --> 00:46:30,000
I have no idea.

428
00:46:30,000 --> 00:46:39,000
Licensing may be licensing issues. Maybe this is like MIT and it has a GPL or whatever.

429
00:46:39,000 --> 00:46:44,000
Yeah, there's a paper we didn't read this year.

430
00:46:44,000 --> 00:46:49,000
There's a system called scuba at Facebook. It was in memory database.

431
00:46:49,000 --> 00:46:53,000
And one of the things they do is they want to do rolling upgrades.

432
00:46:53,000 --> 00:46:55,000
I want to restart the server.

433
00:46:55,000 --> 00:47:01,000
Since it's memory database, if I kill the process and start it back up, I get a little bit of the data back in.

434
00:47:01,000 --> 00:47:06,000
So the trick they do is they write everything all the condos of memory to shared memory in the OS.

435
00:47:06,000 --> 00:47:10,000
Kill the process, come back, reattach that shared memory and everything is there.

436
00:47:10,000 --> 00:47:17,000
And they talk about how they tried having, because they own the employee of a person that writes jmailoc,

437
00:47:17,000 --> 00:47:20,000
they hadn't tried to write some tricks in jmailoc to make it better.

438
00:47:20,000 --> 00:47:23,000
So they shared memory and restart. It was a huge nightmare.

439
00:47:23,000 --> 00:47:26,000
For that case, they did rely on the OS to do it.

440
00:47:26,000 --> 00:47:31,000
But so there are some optimizations that think in jmailoc, that are for data bases that are rolling.

441
00:47:31,000 --> 00:47:33,000
Because I know Facebook puts stuff in there.

442
00:47:33,000 --> 00:47:34,000
Yes?

443
00:47:34,000 --> 00:47:37,000
Also, the lip-see rather because it is because it uses less memory.

444
00:47:37,000 --> 00:47:39,000
Jmailoc is a lot of memory.

445
00:47:39,000 --> 00:47:41,000
You just a lot of memory.

446
00:47:41,000 --> 00:47:44,000
And then eagerly allocates ahead of time.

447
00:47:44,000 --> 00:47:47,000
Get this used jmailoc.

448
00:47:47,000 --> 00:47:49,000
Sorry, yes. So this mother duck thing, what is that?

449
00:47:49,000 --> 00:47:59,000
So the, this is during the pandemic, the HANA-SEN mark we're thinking about doing a start-up on duck DB.

450
00:47:59,000 --> 00:48:04,000
But at least when I talk to them what they really wanted to do is just keep building duck DB,

451
00:48:04,000 --> 00:48:08,000
you know, as is running on embedded devices and so forth.

452
00:48:08,000 --> 00:48:13,000
And all the DCs were one of them to make a cloud version of it.

453
00:48:13,000 --> 00:48:16,000
That end up looking something like snowflake.

454
00:48:16,000 --> 00:48:23,000
But that would be a major rewrite and go against the ethos of the original design of duck DB.

455
00:48:23,000 --> 00:48:25,000
So there is duck DB labs.

456
00:48:25,000 --> 00:48:31,000
And that's basically the spin-off of CWI that is doing most of the development on duck DB.

457
00:48:31,000 --> 00:48:36,000
And employees, a bunch of former students, Mark and HANA, to build, you know, building duck DB.

458
00:48:36,000 --> 00:48:37,000
And that's where you get official.

459
00:48:37,000 --> 00:48:40,000
If you need official support for duck DB, you contract out the them.

460
00:48:40,000 --> 00:48:50,000
Then year two ago there was a spin-off, there was a startup that was created called MotherDuck,

461
00:48:50,000 --> 00:48:53,000
to provide a cloud version of duck DB.

462
00:48:53,000 --> 00:49:00,000
But again, it's not a scalable, you know, scale a version of duck DB like a snowflake or a dremel.

463
00:49:00,000 --> 00:49:06,000
Instead, it's more like a remote compute option that you can get now in duck DB,

464
00:49:06,000 --> 00:49:09,000
where you still run duck DB locally.

465
00:49:09,000 --> 00:49:14,000
But if your data is already in the cloud, you basically can run it query locally

466
00:49:14,000 --> 00:49:18,000
that then gets shipped over the wire to MotherDuck, who's running duck DB there,

467
00:49:18,000 --> 00:49:23,000
and do some processing and then send back the result to you.

468
00:49:23,000 --> 00:49:24,000
All right.

469
00:49:24,000 --> 00:49:30,000
So again, going back here, when you download duck DB, this comes along with it.

470
00:49:30,000 --> 00:49:33,000
This is official MotherDuck extension.

471
00:49:34,000 --> 00:49:39,000
And so that means everybody's running duck DB now can connect directly to MotherDuck,

472
00:49:39,000 --> 00:49:41,000
assuming they have account and API key.

473
00:49:41,000 --> 00:49:46,000
And so, the MotherDuck sends down to the local duck DB, like here's the catalog,

474
00:49:46,000 --> 00:49:48,000
everything, all the files that I'm available.

475
00:49:48,000 --> 00:49:52,000
And then I can write queries on them as if it was a local file.

476
00:49:52,000 --> 00:49:56,000
And the system figures out what part of the query needs to run in the cloud,

477
00:49:56,000 --> 00:49:59,000
what part of the query needs to run locally.

478
00:49:59,000 --> 00:50:00,000
Yes.

479
00:50:00,000 --> 00:50:05,000
Why would you come and use this instead of any other all-app system?

480
00:50:05,000 --> 00:50:08,000
It's a question of why would anybody use this for some of the all-app system?

481
00:50:08,000 --> 00:50:11,000
Yeah, it's on the, because all of them have cloud offerings.

482
00:50:13,000 --> 00:50:18,000
But if you're already doing much analytics locally in duck DB,

483
00:50:18,000 --> 00:50:21,000
because it connects to Python or whatever,

484
00:50:21,000 --> 00:50:25,000
to stop whatever you're doing, then switch over to BigQuery,

485
00:50:25,000 --> 00:50:27,000
and where the query might actually work anymore.

486
00:50:27,000 --> 00:50:32,000
You might not even be running SQL anymore, because you can use an iBus or DePire.

487
00:50:32,000 --> 00:50:38,000
So it seems to integration, like it's still the duck DB client-side interface,

488
00:50:38,000 --> 00:50:42,000
but you don't know necessarily where that query is going to run anymore.

489
00:50:42,000 --> 00:50:43,000
Yes.

490
00:50:43,000 --> 00:50:47,000
So, to say there's no interquerialism going on here,

491
00:50:47,000 --> 00:50:50,000
like it wants to put some old notes at all in the cloud?

492
00:50:50,000 --> 00:50:53,000
This question, is there any, well,

493
00:50:53,000 --> 00:50:55,000
we'll scale hard on like to multiple notes in the cloud.

494
00:50:55,000 --> 00:50:58,000
As far as they know, these are term version now, right?

495
00:50:58,000 --> 00:51:00,000
Is there a reason why not?

496
00:51:00,000 --> 00:51:02,000
The question is the reason why not, because yeah,

497
00:51:02,000 --> 00:51:06,000
you'd have to rewrite a lot of duck DB to make that work, right?

498
00:51:06,000 --> 00:51:09,000
Maybe you could just, if they're just sending the query plan up to the cloud,

499
00:51:09,000 --> 00:51:12,000
maybe you could identify pipeline breakers.

500
00:51:12,000 --> 00:51:14,000
Yeah, right off parts of the query plan,

501
00:51:14,000 --> 00:51:16,000
and then just run different duck DB instances.

502
00:51:16,000 --> 00:51:17,000
Yeah, sorry, sorry, sorry.

503
00:51:17,000 --> 00:51:19,000
So, to this point, actually, you're right.

504
00:51:19,000 --> 00:51:20,000
They could do that.

505
00:51:20,000 --> 00:51:21,000
I don't know whether they do that though.

506
00:51:21,000 --> 00:51:22,000
I'll show that in the next slide.

507
00:51:22,000 --> 00:51:24,000
Basically, they know what parts of remote and local,

508
00:51:24,000 --> 00:51:29,000
and then the local duck DB instance is responsible for figuring out,

509
00:51:29,000 --> 00:51:31,000
okay, like this data is remote,

510
00:51:31,000 --> 00:51:33,000
and it's too big for me to suck down locally,

511
00:51:33,000 --> 00:51:35,000
so I'll send my query, my plan fragment over there,

512
00:51:35,000 --> 00:51:37,000
and process and get back the result.

513
00:51:37,000 --> 00:51:39,000
So, yes, in that point, you could say,

514
00:51:39,000 --> 00:51:45,000
okay, I could take portions of this and fan it across multiple duck DB instances.

515
00:51:45,000 --> 00:51:48,000
I just don't know whether they do that or not.

516
00:51:48,000 --> 00:51:51,000
So, this is from the paper that came out this year,

517
00:51:51,000 --> 00:51:54,000
right, the idea is that again, you have the client side, the duck DB,

518
00:51:54,000 --> 00:51:57,000
you install that mother duck extension,

519
00:51:57,000 --> 00:52:02,000
that then can send query plans up to the mother duck cloud service,

520
00:52:02,000 --> 00:52:06,000
where they're running duck DB inside of Docker containers,

521
00:52:06,000 --> 00:52:11,000
and they're doing client side caching similar to what we saw in,

522
00:52:11,000 --> 00:52:14,000
I think in Dremel, sorry, sorry, in snowflake,

523
00:52:14,000 --> 00:52:17,000
and then of course, you can always read data from your object store,

524
00:52:17,000 --> 00:52:19,000
whatever you want.

525
00:52:19,000 --> 00:52:25,000
And how the client's, sorry, the mother duck service is aware of what data is in here,

526
00:52:25,000 --> 00:52:32,000
I think they can connect to Ithberg and other things that suck out that metadata as well.

527
00:52:32,000 --> 00:52:37,000
So, the way this is going to work is that they're going to introduce what they call a bridge operator

528
00:52:37,000 --> 00:52:43,000
in the query plans now that is capable of sending and receiving data

529
00:52:43,000 --> 00:52:48,000
from the local duck DB instance to the cloud version of it.

530
00:52:48,000 --> 00:52:51,000
And so, again, when you invoke a query on the local side,

531
00:52:51,000 --> 00:52:54,000
it'll do all the planning that it normally would,

532
00:52:54,000 --> 00:52:56,000
and then with the mother duck extension installed,

533
00:52:56,000 --> 00:52:58,000
they'll then take a second pass on it and say,

534
00:52:58,000 --> 00:53:01,000
okay, well, this data you're looking, you're trying to access in this pipeline,

535
00:53:01,000 --> 00:53:03,000
is local, this data is remote,

536
00:53:03,000 --> 00:53:06,000
and then they do, in a cost calculation, the side,

537
00:53:06,000 --> 00:53:10,000
is it better to push the query to the data out on the remote storage

538
00:53:10,000 --> 00:53:14,000
or pull the data down to the local machine?

539
00:53:14,000 --> 00:53:19,000
So, I'm doing a join between some customer table and a sales table.

540
00:53:19,000 --> 00:53:22,000
The customer table is remote, the sales data is local,

541
00:53:22,000 --> 00:53:25,000
and so, to say the customer data is huge,

542
00:53:25,000 --> 00:53:29,000
it's typically the opposite of this, the sales one is always much, much bigger.

543
00:53:29,000 --> 00:53:36,000
So, duck DB would say, okay, well, since I already have the customer data and that's remote,

544
00:53:36,000 --> 00:53:42,000
let me go send the sales data over the wire up to the remote service,

545
00:53:42,000 --> 00:53:45,000
the remote service then, computer to the hash join,

546
00:53:45,000 --> 00:53:48,000
using the duck DB instance that's running on the cloud,

547
00:53:48,000 --> 00:53:50,000
then it has to get the result back to you and the client,

548
00:53:50,000 --> 00:53:55,000
so then they send the data back to the source and sync operators in between these things.

549
00:53:55,000 --> 00:53:59,000
Again, now you see, they don't have to do anything extra to support this,

550
00:53:59,000 --> 00:54:04,000
in terms of scheduling and running these pipelines,

551
00:54:04,000 --> 00:54:08,000
because we just made a big deal about how they switched to the push-based model,

552
00:54:08,000 --> 00:54:11,000
they can pause things and do a synchronous IO,

553
00:54:11,000 --> 00:54:14,000
because now the control flow is separate from the data flow.

554
00:54:14,000 --> 00:54:17,000
So, I can, you know, I can, I can,

555
00:54:17,000 --> 00:54:20,000
I can have this thing start running, sending data up,

556
00:54:20,000 --> 00:54:23,000
and, you know, not have to, like, you know,

557
00:54:23,000 --> 00:54:25,000
have this weird call stack thing with it,

558
00:54:25,000 --> 00:54:29,000
like, pause and unpause as I'm pushing data at how.

559
00:54:29,000 --> 00:54:31,000
All right?

560
00:54:31,000 --> 00:54:36,000
So, that calls model for that second pass to decide whether what runs remote,

561
00:54:36,000 --> 00:54:40,000
remote local is based purely on not computational complexity,

562
00:54:40,000 --> 00:54:43,000
but transfer cost of the data, the transfer time of the data.

563
00:54:43,000 --> 00:54:46,000
Obviously, if I have, you know, 10 terabytes in the cloud,

564
00:54:46,000 --> 00:54:49,000
and one kill-light file locally, I don't want to suck down the 10 terabytes,

565
00:54:49,000 --> 00:54:51,000
I want to send the one kill-light data up,

566
00:54:51,000 --> 00:54:54,000
and run everything remotely there.

567
00:54:54,000 --> 00:54:55,000
Yes?

568
00:54:55,000 --> 00:55:00,000
Besides, you've got to be having this client layer that connects to the model that I can see with,

569
00:55:00,000 --> 00:55:03,000
what's the difference between this and something like the one where the on is,

570
00:55:03,000 --> 00:55:06,000
is sort of, like, scaling out postgres.

571
00:55:06,000 --> 00:55:11,000
I think they actually have a lot of horizontal and without a scaling going on, right?

572
00:55:11,000 --> 00:55:16,000
This question is, what is the difference between duct-DB and neon?

573
00:55:16,000 --> 00:55:22,000
I mean, neon is doing, neon's taking, ripped up the storage layer of postgres,

574
00:55:22,000 --> 00:55:30,000
and can make it, basically, make a shared disk architecture that can scale out horizontally.

575
00:55:30,000 --> 00:55:35,000
But I'm pretty sure that the compute side for the queries themselves are still running on a single node.

576
00:55:35,000 --> 00:55:37,000
So that would look like this.

577
00:55:37,000 --> 00:55:40,000
So the horizontal scaling and actually it's happening at the storage layer?

578
00:55:40,000 --> 00:55:42,000
The horizontal scaling is having the storage layer.

579
00:55:42,000 --> 00:55:45,000
This is still, the mother duct, still runs duct-DB as a shared nothing.

580
00:55:45,000 --> 00:55:49,000
So that's why the, oh, go back here.

581
00:55:49,000 --> 00:55:51,000
Sorry, you're saying the...

582
00:55:51,000 --> 00:55:58,000
I'm just trying to understand why the scaling is in viable here,

583
00:55:58,000 --> 00:56:01,000
but something neon does.

584
00:56:01,000 --> 00:56:02,000
So I misspoke.

585
00:56:02,000 --> 00:56:06,000
I don't know whether they're actually, they're scaling horizontal and going on a compute side,

586
00:56:06,000 --> 00:56:10,000
but you could, as you said, you say, if I have like four pipelines that I'm all going to run remotely,

587
00:56:10,000 --> 00:56:14,000
is that going to hand them all be on a single instance of duct-DB?

588
00:56:14,000 --> 00:56:16,000
You could have them run on multiple instances, separate containers.

589
00:56:16,000 --> 00:56:19,000
You have like a million two-fold things, but it's 250 to 250 to 250,

590
00:56:19,000 --> 00:56:20,000
so it's 450.

591
00:56:20,000 --> 00:56:21,000
Yeah, you could do that, yes.

592
00:56:21,000 --> 00:56:22,000
Yes.

593
00:56:22,000 --> 00:56:24,000
I don't know whether they're doing that though.

594
00:56:24,000 --> 00:56:25,000
Okay.

595
00:56:25,000 --> 00:56:32,000
I think, again, I think the initial version of it just,

596
00:56:32,000 --> 00:56:35,000
here's the whole, here's the, you know, here's the pipeline, just run it,

597
00:56:35,000 --> 00:56:39,000
because you would need an extra step to say, okay, chop it up and scale it out,

598
00:56:39,000 --> 00:56:41,000
and then stitch it back together.

599
00:56:41,000 --> 00:56:46,000
And that's, eventually they could do that, I'm sure.

600
00:56:46,000 --> 00:56:50,000
The neon architecture is more similar to like Aurora,

601
00:56:51,000 --> 00:56:55,000
that you have a single primary, all the rights go to,

602
00:56:55,000 --> 00:56:59,000
and then you propagate the updates through the storage layer,

603
00:56:59,000 --> 00:57:01,000
and then you'd have read-only replicas, you know,

604
00:57:01,000 --> 00:57:03,000
server-service those queries.

605
00:57:03,000 --> 00:57:04,000
Oh, so...

606
00:57:04,000 --> 00:57:06,000
In a transaction-consistent manner.

607
00:57:06,000 --> 00:57:09,000
So neon is more heavy on that, on cash?

608
00:57:09,000 --> 00:57:16,000
No, I'm saying that like, the neon is...

609
00:57:16,000 --> 00:57:21,000
The neon's trying to have a, you know, primary multiple replicas.

610
00:57:21,000 --> 00:57:23,000
So the primary is get, absorbs all the rights,

611
00:57:23,000 --> 00:57:27,000
because it's an old-to-be workload, and then the changes get propagated to the replicas,

612
00:57:27,000 --> 00:57:30,000
and you can run read-only queries on those in a transaction-consistent manner,

613
00:57:30,000 --> 00:57:31,000
or snapshot isolation.

614
00:57:31,000 --> 00:57:32,000
Thank you.

615
00:57:33,000 --> 00:57:38,000
And then what Amazon does, when Aurora is, they,

616
00:57:38,000 --> 00:57:44,000
where neon does all the, that, that propagation of the updates through,

617
00:57:45,000 --> 00:57:48,000
through code-pitch-intensity-sitting-bub, the file system,

618
00:57:48,000 --> 00:57:52,000
Amazon puts that propagation directly within like EBS itself,

619
00:57:52,000 --> 00:57:55,000
and they can do that because they could control the whole stack.

620
00:57:55,000 --> 00:57:58,000
Not exactly directly in EBS, but, there's a little bit above it.

621
00:57:58,000 --> 00:57:59,000
Yes?

622
00:57:59,000 --> 00:58:01,000
This is a bit of a tangent, which is how it goes.

623
00:58:01,000 --> 00:58:04,000
If you do the primary thing, aren't you, you're doing eventual persistence in data,

624
00:58:04,000 --> 00:58:05,000
and asset-like?

625
00:58:05,000 --> 00:58:07,000
Statement is, if you're doing, if you're doing, what I've said before,

626
00:58:07,000 --> 00:58:08,000
you're doing a bit of a...

627
00:58:08,000 --> 00:58:09,000
The primary primary...

628
00:58:09,000 --> 00:58:10,000
No.

629
00:58:10,000 --> 00:58:16,000
Because I could do a commit on the primary, and then not acknowledge the commit

630
00:58:16,000 --> 00:58:19,000
until all the replicas of acknowledge that they got the update.

631
00:58:19,000 --> 00:58:20,000
Right?

632
00:58:22,000 --> 00:58:26,000
And then, but again, for read-only queries, sometimes you don't maybe need,

633
00:58:26,000 --> 00:58:29,000
you don't need that sort of strong consistency, or the,

634
00:58:29,000 --> 00:58:34,000
the better, the higher guarantees, like snapshot isolation might be enough.

635
00:58:34,000 --> 00:58:38,000
So I don't care that I'm reading data that's 10 milliseconds behind,

636
00:58:38,000 --> 00:58:41,000
as long as I have a consistent snapshot.

637
00:58:41,000 --> 00:58:42,000
That's a whole...

638
00:58:42,000 --> 00:58:43,000
Yeah.

639
00:58:43,000 --> 00:58:45,000
Yeah, that's something that's class.

640
00:58:45,000 --> 00:58:48,000
Okay.

641
00:58:48,000 --> 00:58:53,000
All right, so, definition of inductive E, and then I'll talk about the worst degree of system,

642
00:58:53,000 --> 00:58:56,000
the worst idea of everything in data is afterwards.

643
00:58:56,000 --> 00:58:58,000
I think inductive E is amazing, right?

644
00:58:58,000 --> 00:59:02,000
The amount of adoption that they've had in the last couple of years is phenomenal,

645
00:59:02,000 --> 00:59:04,000
and I think it was the combination of three things, right?

646
00:59:05,000 --> 00:59:07,000
They were at the right place at the right time, where people...

647
00:59:07,000 --> 00:59:13,000
The pendulum was sort of swinging back, where SQL is the default choice for a lot of applications.

648
00:59:13,000 --> 00:59:15,000
He was sort of asking why people would not want to write SQL,

649
00:59:15,000 --> 00:59:17,000
and that's a...

650
00:59:17,000 --> 00:59:21,000
I think the artifact of data scientists that the people in the no-sequel world

651
00:59:21,000 --> 00:59:25,000
are issuing SQL back in the day, but it definitely has changed over time.

652
00:59:25,000 --> 00:59:27,000
So they were at the right time for this.

653
00:59:27,000 --> 00:59:30,000
They were solving the right problem, like, hey, we need another...

654
00:59:30,000 --> 00:59:33,000
We need an embedded database to do analytics, not another Dremel,

655
00:59:33,000 --> 00:59:35,000
not another snowflake.

656
00:59:35,000 --> 00:59:42,000
And they basically borrowed a talk a lot of the ideas that the Germans were developing.

657
00:59:42,000 --> 00:59:45,000
I mean, Hanna says German, but I mean the Munich Germans, the hyper guys.

658
00:59:45,000 --> 00:59:49,000
Took those papers and built an open source implementation of it,

659
00:59:49,000 --> 00:59:52,000
and had hyper-Umbra been open source.

660
00:59:52,000 --> 00:59:55,000
I mean, the embedded one is also...

661
00:59:55,000 --> 01:00:00,000
That was a great idea too, like, you know, SQL library analytics to be embedded database,

662
01:00:00,000 --> 01:00:02,000
hyper-number or not.

663
01:00:02,000 --> 01:00:06,000
So the combination of that packaging plus the idea of some hyper-number,

664
01:00:06,000 --> 01:00:10,000
and improvements over it, certainly, you know, the phenomenal.

665
01:00:10,000 --> 01:00:12,000
That was a really good idea.

666
01:00:12,000 --> 01:00:15,000
And for me, like, we were betting a system that I wanted to be, like, you know,

667
01:00:15,000 --> 01:00:17,000
have... see adoption outside of CMU,

668
01:00:17,000 --> 01:00:21,000
but I was putting all my eggs in the basket on in memory databases.

669
01:00:21,000 --> 01:00:23,000
And that certainly did not pan out,

670
01:00:23,000 --> 01:00:26,000
because Deer and Prices kind of stay stagnated,

671
01:00:26,000 --> 01:00:30,000
and SSDs got really fast and really cheap.

672
01:00:30,000 --> 01:00:35,000
And so, memory databases aren't, you know, aren't invoked anymore.

673
01:00:35,000 --> 01:00:38,000
Everything is always SSD-based.

674
01:00:38,000 --> 01:00:42,000
And we had other complications that I could take offline.

675
01:00:42,000 --> 01:00:45,000
So, again, I think Dr. B is a great system, and I use it.

676
01:00:45,000 --> 01:00:47,000
Like, this is my default choice of, like, oh, I got a CSV.

677
01:00:47,000 --> 01:00:49,000
I got to, you know, do some analyzing on it.

678
01:00:49,000 --> 01:00:53,000
It used to be open up Excel or whatever, Google Sheets, Nounc.tv.

679
01:00:53,000 --> 01:00:59,000
So you should have that in your mindset, like, throw Dr. B at everything for quick and dirty things.

680
01:00:59,000 --> 01:01:02,000
All right, so next class, we're going to read about Yellowbrick.

681
01:01:02,000 --> 01:01:04,000
And as I said before, the reason why we're reading this paper,

682
01:01:04,000 --> 01:01:08,000
which also just came out in 2024, is they're going to do a bunch of low-level things

683
01:01:08,000 --> 01:01:12,000
that nobody else does, that we talked a little bit about,

684
01:01:12,000 --> 01:01:15,000
to have this semester, but you see how there's going to be super hardcore about it.

685
01:01:15,000 --> 01:01:18,000
It's a very fascinating system.

686
01:01:18,000 --> 01:01:21,000
And, like I said, they have real numbers in there that nobody else does.

687
01:01:21,000 --> 01:01:23,000
Okay?

688
01:01:23,000 --> 01:01:26,000
All right, so I'll cut this.

689
01:01:26,000 --> 01:01:29,000
The worst idea I've ever heard.

690
01:01:57,000 --> 01:01:59,000
The worst idea I've ever heard.

691
01:01:59,000 --> 01:02:02,000
The worst idea I've ever heard.

692
01:02:02,000 --> 01:02:05,000
The worst idea I've ever heard.

693
01:02:05,000 --> 01:02:08,000
The worst idea I've ever heard.

694
01:02:08,000 --> 01:02:11,000
The worst idea I've ever heard.

695
01:02:11,000 --> 01:02:14,000
The worst idea I've ever heard.

696
01:02:14,000 --> 01:02:17,000
The worst idea I've ever heard.

697
01:02:17,000 --> 01:02:20,000
The worst idea I've ever heard.

698
01:02:20,000 --> 01:02:23,000
The worst idea I've ever heard.

