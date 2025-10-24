---
title: CMU15721 P2S202401 ModernOLAPDatabaseSystemsCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Carnegie Mellon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:13,000 --> 00:00:16,000
The first class is the beginning of the discussion of the lecture

4
00:00:16,000 --> 00:00:18,000
material throughout the semester.

5
00:00:18,000 --> 00:00:21,000
And it's still sort of a high level overview of,

6
00:00:21,000 --> 00:00:26,000
of, of, of, of, of the idea here is that we will set the foundation

7
00:00:26,000 --> 00:00:31,000
for all the various parts of the systems and the papers we're going to talk about,

8
00:00:31,000 --> 00:00:34,000
like how to build these individual components in a, in a modern system.

9
00:00:34,000 --> 00:00:37,000
And then obviously this is highly related to the projects

10
00:00:37,000 --> 00:00:40,000
everybody working on which we'll discuss at the end.

11
00:00:40,000 --> 00:00:44,000
But this, this sets the ground, this is sort of sets the context in which we will build

12
00:00:44,000 --> 00:00:47,000
all the things that we'll talk about throughout the semester.

13
00:00:47,000 --> 00:00:51,000
So, um, and we're going to first talk about the, again, the basic background

14
00:00:51,000 --> 00:00:56,000
of the, what we ended up with the, so what is the, the prevailing architecture

15
00:00:56,000 --> 00:01:01,000
for a modern OLAP system, we talked about some high level choices and issues in this space.

16
00:01:01,000 --> 00:01:04,000
So, I started early, sorry.

17
00:01:04,000 --> 00:01:06,000
Yeah.

18
00:01:06,000 --> 00:01:08,000
Super-ever.

19
00:01:08,000 --> 00:01:09,000
Yeah.

20
00:01:09,000 --> 00:01:10,000
Right, yeah.

21
00:01:10,000 --> 00:01:15,000
So the idea, again, the idea is that we want to sort of talk about what some of the historical systems

22
00:01:15,000 --> 00:01:19,000
look like, how we end up with what the, what people are, how people build these systems

23
00:01:19,000 --> 00:01:23,000
and then we'll talk about the high level issues you have in building one of these systems.

24
00:01:23,000 --> 00:01:27,000
And then we'll finish off just sort of a quick overview of what a query goes through,

25
00:01:27,000 --> 00:01:31,000
what happens when you actually execute a query in one of these systems.

26
00:01:31,000 --> 00:01:32,000
Okay?

27
00:01:32,000 --> 00:01:37,000
And again, this is a grad level class, stop me and ask questions as we go along.

28
00:01:37,000 --> 00:01:39,000
Okay?

29
00:01:39,000 --> 00:01:44,000
All right, so if you recall from the intro class, we made this distinction between

30
00:01:44,000 --> 00:01:48,000
these operational databases, or front-end databases, or OLTP databases,

31
00:01:48,000 --> 00:01:54,000
and these analytical database systems, or OLAP, online analytical processing systems.

32
00:01:54,000 --> 00:02:00,000
And again, the distinction was, and an OLTP system, that's really the thing that faces the outside world,

33
00:02:00,000 --> 00:02:04,000
either humans or computers, like a little web interface or a restaurant interface,

34
00:02:04,000 --> 00:02:06,000
that's ingesting new information.

35
00:02:06,000 --> 00:02:11,000
Like you're getting new state, you're getting new changes, and you want to store that as quickly as possible.

36
00:02:11,000 --> 00:02:16,000
And then once you sort of accumulated a bunch of this data, now you want to start extracting new information from it.

37
00:02:16,000 --> 00:02:21,000
You want to extrapolate new knowledge, allows you to make decisions, or decide how to do certain things,

38
00:02:21,000 --> 00:02:26,000
or provide justifications for whatever it is that you want to achieve in your business,

39
00:02:26,000 --> 00:02:29,000
your institution, your organization, or whatever.

40
00:02:29,000 --> 00:02:31,000
So that's the goal we're trying to do this semester.

41
00:02:31,000 --> 00:02:35,000
We're trying to take a bunch of data we've accumulated, and then run queries,

42
00:02:35,000 --> 00:02:37,000
or run something on it to pull out new data.

43
00:02:37,000 --> 00:02:42,000
That informs us about what our database actually contains.

44
00:02:42,000 --> 00:02:46,000
And ideally find trends that we didn't think of as humans easily.

45
00:02:46,000 --> 00:02:53,000
So in the old days, people would run these sort of analytical workloads on what I call a monolithic database system,

46
00:02:53,000 --> 00:03:01,000
meaning a system that had all the components and all the subsystems to actually execute queries and store data,

47
00:03:01,000 --> 00:03:04,000
was all built inside this one piece of software.

48
00:03:05,000 --> 00:03:12,000
If you ever run SQLite, or like DuckDB, or mySQL Postgres, that's considered a monolithic system.

49
00:03:12,000 --> 00:03:15,000
For embedded databases, less so because they don't have threadings and so forth.

50
00:03:15,000 --> 00:03:19,000
They're like Postgres. You install Postgres, you put them on your laptop, put them on your server,

51
00:03:19,000 --> 00:03:21,000
start creating tables on it.

52
00:03:21,000 --> 00:03:26,000
Everything you need to do actually queries and store that data is inside of Postgres.

53
00:03:27,000 --> 00:03:34,000
So you sort of need these monolithic database systems, was how people were storing the data in the old days.

54
00:03:34,000 --> 00:03:38,000
And we'll talk about what this means by centralized storage, but like a managed storage,

55
00:03:38,000 --> 00:03:43,000
basically the database system is completely in charge of what the bits are getting written down to disk,

56
00:03:43,000 --> 00:03:46,000
where they're going, and how to pull them back in.

57
00:03:46,000 --> 00:03:52,000
So the first sort of work, I shouldn't say first, because there was, I mean,

58
00:03:52,000 --> 00:03:56,000
the data from the 1970s, sort of built in the space.

59
00:03:56,000 --> 00:04:03,000
But people started really paying attention to analytical workloads in the early 90s, maybe late 80s.

60
00:04:03,000 --> 00:04:11,000
But the prevailing architecture at the time for how people built database systems was getting the classic database system architecture,

61
00:04:11,000 --> 00:04:12,000
we talked about the intro class.

62
00:04:12,000 --> 00:04:17,000
Roastore, pages on disk, it's a buffer pool, fetching things in.

63
00:04:17,000 --> 00:04:20,000
Because that's what they were building for operational workloads.

64
00:04:20,000 --> 00:04:26,000
Roastore is exactly what you want with you want to adjust data very quickly in transaction manner.

65
00:04:26,000 --> 00:04:29,000
But obviously if you want analytics, that's going to suck.

66
00:04:29,000 --> 00:04:34,000
Because now if you're doing OLAP queries, we only read a subset of the data, you're fetching in the entire page,

67
00:04:34,000 --> 00:04:38,000
you're fetching in the entire row, and there's going to be a bunch of data you don't actually need.

68
00:04:38,000 --> 00:04:44,000
So people realized that these were kind of slow, and so they started building what we call data cubes.

69
00:04:45,000 --> 00:04:51,000
And you started to think of these as like materialize you are pre-computer aggregation query,

70
00:04:51,000 --> 00:04:55,000
like a root grind, group I and so forth, across a bunch of different dimensions,

71
00:04:55,000 --> 00:05:00,000
and you would generate this array more or less, store that in your database,

72
00:05:00,000 --> 00:05:05,000
and then any analytical query that came along, you would then try to target that data cube,

73
00:05:05,000 --> 00:05:08,000
because it's already done a bunch of computation for you.

74
00:05:09,000 --> 00:05:14,000
You could store these things in an array manner that was better than a Roastore.

75
00:05:15,000 --> 00:05:19,000
So these things were not automatic, and administrator had a specify,

76
00:05:19,000 --> 00:05:24,000
I want these pre-computer cubes, again, just like materialize views or regular views.

77
00:05:24,000 --> 00:05:29,000
And then because materialize views are trying to, certainly at the time before,

78
00:05:29,000 --> 00:05:33,000
the time of the 90s is definitely still now, they're difficult to do incremental updates on.

79
00:05:34,000 --> 00:05:40,000
You had to have a human say manually refresh, like a SQL command to populate the data cube.

80
00:05:40,000 --> 00:05:45,000
So you would do something like a cron job at night, run the refresh to build the data cube.

81
00:05:45,000 --> 00:05:52,000
So these were introduced, and I said in operational databases as a way to handle faster analytic queries

82
00:05:52,000 --> 00:05:55,000
than what you would do over Ro-oriented systems.

83
00:05:55,000 --> 00:06:01,000
So with the exception of Terra data, and this is the logo for S-base with Oracle bought in 2003 or so,

84
00:06:02,000 --> 00:06:08,000
like SQL Server, DB2, S-base, Oracle, and Formix, all these guys had their own sort of variation of data cubes.

85
00:06:08,000 --> 00:06:13,000
Terra data did as well, but Terra data was primarily a, an ellipse of some back in the day,

86
00:06:13,000 --> 00:06:16,000
one of the first ones, actually the first one.

87
00:06:16,000 --> 00:06:19,000
So basic idea is this, you have your O2B databases, your operational workloads,

88
00:06:19,000 --> 00:06:24,000
this is where you're getting your data, and then somebody wants to run some query like this,

89
00:06:24,000 --> 00:06:28,000
where they have a cube function, and the group by clause, and then all you're just going to do,

90
00:06:28,000 --> 00:06:32,000
again, just do a sequential scan on each node, populate the cube for this,

91
00:06:32,000 --> 00:06:37,000
and then when this query shows up, if you define this as a view, you would do the query on the cube.

92
00:06:37,000 --> 00:06:42,000
Right? Just again, think of like pre-computer aggregations, that's all it really was.

93
00:06:42,000 --> 00:06:47,000
So what really changed, and got us on the path towards what we're at today,

94
00:06:47,000 --> 00:06:54,000
was in the mid-early-ish 2000s, where people started building these specialized database systems

95
00:06:54,000 --> 00:07:00,000
called data warehouses, that were specifically designed for analytical workloads.

96
00:07:00,000 --> 00:07:05,000
So even though a lot of these start off as forks of Postgres, we can go through that a little bit,

97
00:07:05,000 --> 00:07:12,000
but even though they were mostly derived from RhoStort systems, they ripped out a lot of the storage internals,

98
00:07:12,000 --> 00:07:18,000
they were ripped out of the execution engine, and replaced it with something that was targeting column-oriented data.

99
00:07:19,000 --> 00:07:24,000
So all of these, except for data-legro and Monet, are forks of Postgres.

100
00:07:24,000 --> 00:07:29,000
Park Cell is what as Reshift is based on, so we'll cover the Reshift paper later on,

101
00:07:29,000 --> 00:07:35,000
basically Amazon bought a license with the source code, and then hacked it up a lot, and that became Reshift.

102
00:07:35,000 --> 00:07:42,000
Monet DB was written from scratch out of CWI. DuckDB is originally derived from Monet DB.

103
00:07:42,000 --> 00:07:47,000
There was a version of DuckDB before DuckDB called Monet DB Light, and then they threw all that all away,

104
00:07:47,000 --> 00:07:54,000
and then they wrote it as DuckDB. Vertica was started by Sturmbreaker and others back at MIT in Brown.

105
00:07:54,000 --> 00:08:01,000
That's the fork of Postgres. Data-legro was a hacked up, was it's mid-aware in front of Ingress.

106
00:08:01,000 --> 00:08:05,000
Microsoft bought it for like, I think a couple hundred million, and then immediately threw away,

107
00:08:05,000 --> 00:08:08,000
because apparently it was garbage. And then it teased it was the early one.

108
00:08:08,000 --> 00:08:15,000
This was actually pretty cool. This was a version of Postgres that had an FPGA accelerator to do the accelerator sequential scans.

109
00:08:15,000 --> 00:08:19,000
Greenplum still around today, pretty widely used, that's a fork version of Postgres.

110
00:08:19,000 --> 00:08:27,000
These were all these monolithic systems where they were designed now to run little workloads in a control,

111
00:08:27,000 --> 00:08:34,000
the complete storage layer of the system, and they sort of used their own proprietary formats.

112
00:08:34,000 --> 00:08:43,000
That'll make more sense, especially in the next class, but basically, again, they were in charge of what the bits look like on disk for the pages they were storing for the data.

113
00:08:43,000 --> 00:08:48,000
The other thing to point out is that all of these were all shared nothing systems.

114
00:08:48,000 --> 00:08:56,000
Again, we'll cover that in a second, but again, they were assuming that every compute node in your database cluster had disk, memory, and CPU,

115
00:08:56,000 --> 00:09:02,000
and each node was responsible for sorting some portion of the entire database.

116
00:09:02,000 --> 00:09:07,000
So the way you would use it like this is, again, you have your O2B databases, now you have your giant data warehouse,

117
00:09:07,000 --> 00:09:13,000
and the idea is that you wouldn't get all your operational databases, all the data from here, back into your single data warehouse,

118
00:09:13,000 --> 00:09:19,000
because now you have a single view or complete view of all the data across all your databases.

119
00:09:19,000 --> 00:09:25,000
And so the way you would do this is using tools called extractions from a loader, ETL tools,

120
00:09:25,000 --> 00:09:30,000
and you just sort of get the change data capture, or periodically getting updates from the O2B databases,

121
00:09:30,000 --> 00:09:40,000
doing some amount of changes to them to clean up the data, like entity resolution, like if it's A, PaVLo, and AMP, you could figure out that they refer to the same person,

122
00:09:40,000 --> 00:09:45,000
all that sort of happens here, and then you load this now into your data warehouse.

123
00:09:45,000 --> 00:09:53,000
But again, for this, because the data warehouse wants to have complete control of everything that's storing, you've got to set up the schema at a time,

124
00:09:53,000 --> 00:09:59,000
you've got to provision the hardware at a time, everything has to be sort of set up before you start putting data into it.

125
00:09:59,000 --> 00:10:05,000
And it was a shared nothing system, so if you want to scale the capacity of the system, you have to add more nodes, and now you've got to start moving data around.

126
00:10:05,000 --> 00:10:10,000
And that's going to be one of the limitations we'll see throughout this semester.

127
00:10:10,000 --> 00:10:16,000
So then we hit the 2010s, late 2000s, early 2010s was one of these things took off.

128
00:10:16,000 --> 00:10:20,000
We entered this new era that we're sort of in today of these shared disk engines.

129
00:10:21,000 --> 00:10:32,000
And the idea here is that instead of having the database system manage its own storage layer, we're going to offload that to some other piece of software, some other service.

130
00:10:32,000 --> 00:10:36,000
And in the cloud setting, it's going to be an object store like S3.

131
00:10:36,000 --> 00:10:46,000
And the idea here is that because we know long going to be responsible for managing the storage of data, we can optimize the computer there as much as possible.

132
00:10:46,000 --> 00:10:54,000
We're still going to have proprietary data formats, meaning if you're using the regular snowflake, it was sort of the first one in this space,

133
00:10:54,000 --> 00:11:03,000
snowflake when you store data into it, it's going to store it in the snowflake format, that only snowflake understands, but it's going to store it in NS3.

134
00:11:03,000 --> 00:11:06,000
So that was the first generation of these systems, they're going to manage all the files themselves.

135
00:11:06,000 --> 00:11:13,000
The newer generation, and what was in the paper that you guys read, that sort of fall under this branding label or moniker of Lakehouse systems,

136
00:11:14,000 --> 00:11:26,000
the idea is that it looks just like a shared disk system before, but now instead of having always using a proprietary storage format and only allowing data to be added to the database by going through the database system,

137
00:11:26,000 --> 00:11:36,000
you allow anybody to write bunch of files out on S3, tell the database system, the Lakehouse system, hey, here's my files, here's what's in them, and then now you can run queries on top of that data.

138
00:11:36,000 --> 00:11:37,000
Yes.

139
00:11:37,000 --> 00:11:57,000
So, the question is, I'm showing much of these logos at the bottom here, why are there so many, what are they competing on?

140
00:11:57,000 --> 00:12:06,000
There's so many of them, because there's so much money in databases, that's why there's a lot of this, there's Linux, and then what else?

141
00:12:06,000 --> 00:12:10,000
There's a lot of databases.

142
00:12:10,000 --> 00:12:23,000
So, the key difference is going to be in, I think, some of these will be hosted services that you can only get through a certain cloud provider, like an Amazon Redshift, you can only get Amazon Redshift on Amazon.

143
00:12:23,000 --> 00:12:32,000
With BigQuery, I think they have called Omni something or other, you can now run BigQuery stuff on AWS and Azure and so forth.

144
00:12:32,000 --> 00:12:37,000
But for whatever reason, people start building the AWS systems because they think they can do a better job than what already exists.

145
00:12:37,000 --> 00:12:50,000
And oftentimes, some of these projects actually spin out of larger tech companies that decided, oh, we want to build this stuff in-house, and then turns out to be useful, and then they converted to an open source project and get people to use it outside of it.

146
00:12:50,000 --> 00:13:00,000
So, Presto started that Facebook, Pino started that at LinkedIn, Trino's and Forkopesto, Drew, I forget, this came out of something as well.

147
00:13:00,000 --> 00:13:04,000
But for whatever reason, people start building these various systems.

148
00:13:04,000 --> 00:13:14,000
And I would say, at a high level, for the most part, as we'll see throughout the semester, the high level, they're all going to be basically the same.

149
00:13:14,000 --> 00:13:22,000
The real difference is going to be the things that actually really matter in some cases is going to be the top layer, the front end, like what the user experience looks like, how good the query optimizer is.

150
00:13:22,000 --> 00:13:24,000
In my opinion, that's the part that really matters.

151
00:13:24,000 --> 00:13:31,000
All the stuff that we're talking about throughout the semester, it becomes almost commoditized or comes table stakes, everyone has it.

152
00:13:31,000 --> 00:13:38,000
We still want to learn how to build it and why they do certain things and why they perform the way they perform.

153
00:13:38,000 --> 00:13:42,000
Like that part is still super important, especially if you want to work on the internals of these systems.

154
00:13:42,000 --> 00:13:47,000
But to the average user, it's really the top part that really matters.

155
00:13:47,000 --> 00:13:50,000
So, in other ways, are there too many databases?

156
00:13:50,000 --> 00:13:52,000
Maybe.

157
00:13:52,000 --> 00:14:01,000
But, like I said, there's still a lot of money in the marketplace for this kind of stuff and people, these things don't die.

158
00:14:01,000 --> 00:14:05,000
But, in Pala, I didn't really take off as much as Snuff Lake did.

159
00:14:05,000 --> 00:14:07,000
They're still maintaining in Pala, still people using Pala.

160
00:14:07,000 --> 00:14:10,000
Would I recommend anybody starting off using in Pala? No.

161
00:14:10,000 --> 00:14:14,000
But it's still there.

162
00:14:14,000 --> 00:14:15,000
Yes.

163
00:14:15,000 --> 00:14:18,000
Are these the same or different from data lakes?

164
00:14:18,000 --> 00:14:22,000
What I read about data lakes, they have a total of Pala.

165
00:14:22,000 --> 00:14:25,000
Yes, the question is, what I'm describing here, the same as a data lake.

166
00:14:25,000 --> 00:14:31,000
The term data lake basically meant is that, okay, here's S3, anybody can store data in there.

167
00:14:31,000 --> 00:14:35,000
But then the lake house architecture, you know, we'll see in a second.

168
00:14:35,000 --> 00:14:40,000
It does have the ability to ingest data through this lake house and keep track of things.

169
00:14:40,000 --> 00:14:44,000
But also provides additional schema control and metadata stuff as well.

170
00:14:44,000 --> 00:14:51,000
So, the data lake, the idea was like, okay, W3 files in S3 and then whoever did that is also responsible for telling the catalog.

171
00:14:52,000 --> 00:14:53,000
Here's my files.

172
00:14:53,000 --> 00:14:59,000
With the lake house architecture, it's supposed to be like a unified front and interface to develop and say, okay, here's my new data.

173
00:14:59,000 --> 00:15:02,000
And then the lake house can put it where it wants it.

174
00:15:02,000 --> 00:15:05,000
You can tell it here's where it is and sort of keep track of these things.

175
00:15:05,000 --> 00:15:09,000
So it's not to say you couldn't build, ignoring the increment updates.

176
00:15:09,000 --> 00:15:10,000
We'll talk about in a second.

177
00:15:10,000 --> 00:15:15,000
Now that you couldn't do what a lake house does on a data lake, they're essentially the same thing.

178
00:15:15,000 --> 00:15:19,000
There's more services to help you keep track of what's going on.

179
00:15:19,000 --> 00:15:23,000
Or, wondering, when we said shared disk, you could be in data lake or something.

180
00:15:23,000 --> 00:15:27,000
So, the data lake would just be like, his question is, when I say shared disk, I mean data lake.

181
00:15:27,000 --> 00:15:30,000
I mean, shared disk would be the distinction between shared nothing.

182
00:15:30,000 --> 00:15:35,000
Right? That you have the separate computing storage and you rely on the object store to store your data.

183
00:15:35,000 --> 00:15:42,000
So, you could do that in some systems before like, data bricks is the lake house stuff, right?

184
00:15:42,000 --> 00:15:45,000
But the idea is like, there's a much more manual stuff you have to do.

185
00:15:45,000 --> 00:15:51,000
Like, if you just dump up files on s3, but nobody knows about them, then like, you can't run queries on them.

186
00:15:51,000 --> 00:15:52,000
But so, let me do it.

187
00:15:52,000 --> 00:15:58,000
You would have to update the files on s3 and then tell some catalog service, here's what my data is, so they can then run queries on them.

188
00:15:58,000 --> 00:16:00,000
Like, to be like a manual process.

189
00:16:00,000 --> 00:16:05,000
The lake house is trying to do all this sort of automatically for you.

190
00:16:05,000 --> 00:16:08,000
It's a marketing term, something that's right.

191
00:16:08,000 --> 00:16:11,000
The data lake just means, just like, okay, here's s3.

192
00:16:11,000 --> 00:16:13,000
Put my files there.

193
00:16:13,000 --> 00:16:22,000
Right? But the important thing about this is though, like, what this allows you to do because it's going to be a day lake or an object store,

194
00:16:22,000 --> 00:16:30,000
like, I don't have to go get approval from the DBA to say, I want to store this data, I think I spend time setting up the schema and figuring out what's going to be in there and provision hardware.

195
00:16:30,000 --> 00:16:32,000
You just start uploading files.

196
00:16:32,000 --> 00:16:40,000
And then, for better or worse, like, that makes it easier to put data in there, but then now someone's got to figure out what's actually in there.

197
00:16:40,000 --> 00:16:48,000
Right? So you're sort of pushing the burden of figuring out how to interpret the data in the contents later down the pipeline.

198
00:16:48,000 --> 00:16:55,000
In some cases, that's a good idea. Sometimes it's a bad idea.

199
00:16:55,000 --> 00:16:57,000
That's something that's something like a philosophical discussion.

200
00:16:57,000 --> 00:17:02,000
But the key thing here is that we're separating compute and storage by using a shared disk architecture.

201
00:17:02,000 --> 00:17:05,000
So we go back to our third diagram before.

202
00:17:06,000 --> 00:17:17,000
Now, we're all TB databases. They're going to send all their data to an object store and maybe there's an ETL thing or some kind of middleware here that's going to do some transformation before it puts it in there.

203
00:17:17,000 --> 00:17:25,000
And then we would maybe tell the catalog, here's the files that I put in there and here's their contents or here's what, here's the schema that's in there.

204
00:17:25,000 --> 00:17:30,000
And then now, if I want to run queries, the query engine on the side doesn't, is not responsible for the storage anymore.

205
00:17:30,000 --> 00:17:35,000
So it has to go to the catalog and say, what data do I actually have? Where are the files located in S3?

206
00:17:35,000 --> 00:17:40,000
And then once I have that information, then I can run my queries on the object store.

207
00:17:40,000 --> 00:17:47,000
So in this semester, this box here is what we care about. This is the thing that we're going to, we're actually going to design.

208
00:17:47,000 --> 00:17:54,000
This is what we call an OLAP system, whether it's a lake house system that comes with additional stuff that data bricks wants to sell you.

209
00:17:54,000 --> 00:17:59,000
But this is the thing that we're going to describe conceptually and how to build.

210
00:17:59,000 --> 00:18:06,000
And this is the way people have been really building these systems for about 10 years, about 15 years maybe now.

211
00:18:06,000 --> 00:18:11,000
That started off with like Dremel at Google and then Snowflake was the one that really commercialized it.

212
00:18:11,000 --> 00:18:21,000
Like this is the sort of, I don't call it a classic architecture. And I realized that you guys are in the 20s and I'm saying this 15 years ago, and the script of data bases, that's actually not a lot of time.

213
00:18:21,000 --> 00:18:22,000
Yes.

214
00:18:22,000 --> 00:18:25,000
We are just wondering about the transformation of the OLAP system.

215
00:18:25,000 --> 00:18:29,000
Data bases to like the OLAP databases, what is a time stand for computer stuff?

216
00:18:29,000 --> 00:18:34,000
The answer is, we were going to talk about like this, this, it's called changing the capture.

217
00:18:34,000 --> 00:18:41,000
Like how do we get the updates from this into this? We're not going to talk about that specifically, like what the process of do that.

218
00:18:41,000 --> 00:18:45,000
I can point you to some previous lectures that we've had guest speakers talk about this.

219
00:18:45,000 --> 00:18:49,000
We are going to care about like what the data is going to look like when it goes in there.

220
00:18:49,000 --> 00:18:52,000
And that's the next class, like Parkane or Files.

221
00:18:52,000 --> 00:18:53,000
Right?

222
00:18:53,000 --> 00:18:54,000
Yes.

223
00:18:54,000 --> 00:18:58,000
So, it's a part of the question.

224
00:18:58,000 --> 00:19:02,000
The question is, what does that change the value of the whole architecture?

225
00:19:02,000 --> 00:19:09,000
Like the physical needs basically then, and that it is a data that can complete the office code?

226
00:19:09,000 --> 00:19:10,000
Yes.

227
00:19:10,000 --> 00:19:11,000
Next class.

228
00:19:11,000 --> 00:19:21,000
So, or save it is like, oh, in the lake house paper from the database guys, they talk about, oh, it's a big problem with these data lake systems is that you get stale data.

229
00:19:21,000 --> 00:19:22,000
Right?

230
00:19:22,000 --> 00:19:25,000
Because again, we're getting continuous updates from the operational side of things.

231
00:19:25,000 --> 00:19:32,000
How do we integrate that into our database so that we're always trying to look at the freshest data?

232
00:19:32,000 --> 00:19:39,000
And so, what these data lake house systems provide also is the ability to do transactional updates,

233
00:19:39,000 --> 00:19:44,000
you know, creation, deletion, updates, insertions into those database.

234
00:19:44,000 --> 00:19:48,000
And the way you basically do this is that it's the fracture mirror stuff we talked about last semester.

235
00:19:48,000 --> 00:19:50,000
You're just doing a log append to a file.

236
00:19:50,000 --> 00:19:52,000
Here's a little bit of latest changes.

237
00:19:52,000 --> 00:19:56,000
And then there's a background job that periodically takes that code lessons that combines that removes out stale data.

238
00:19:56,000 --> 00:20:05,000
And then stores it now into Parkane file example for, in the case of data lake, or in the Delta Lake thing from Databricks.

239
00:20:05,000 --> 00:20:10,000
They'll take that thing Parkane file and then store that now into your object store.

240
00:20:10,000 --> 00:20:13,000
And then update the catalogs, say here's the latest version of it.

241
00:20:13,000 --> 00:20:17,000
They also can keep track of, if you make schema changes, they keep track of those things for you.

242
00:20:17,000 --> 00:20:27,000
Right? It's providing more, as I said, more infrastructure to make sure that the object store is, can keep track of what's actually in it.

243
00:20:27,000 --> 00:20:30,000
So we're not going to talk about any of this this semester.

244
00:20:31,000 --> 00:20:33,000
Delta Lake is one example system.

245
00:20:33,000 --> 00:20:36,000
I don't know whether the paper mentions hoody and iceberg.

246
00:20:36,000 --> 00:20:37,000
Hoody came out of Uber.

247
00:20:37,000 --> 00:20:40,000
Iceberg came out of Netflix.

248
00:20:40,000 --> 00:20:44,000
Snowflake has their own sort of thing, I think they call hybrid tables.

249
00:20:44,000 --> 00:20:45,000
They can implement updates.

250
00:20:45,000 --> 00:20:47,000
And they support iceberg as well.

251
00:20:47,000 --> 00:20:51,000
This logo without a name is actually Google Napa.

252
00:20:51,000 --> 00:20:53,000
They have a paper on this.

253
00:20:53,000 --> 00:20:55,000
Google doesn't really put names next to logos.

254
00:20:55,000 --> 00:20:56,000
Amazon too.

255
00:20:56,000 --> 00:20:58,000
How's that making it know what this is?

256
00:20:59,000 --> 00:21:02,000
So in their defense, that's actually the internal system.

257
00:21:02,000 --> 00:21:04,000
They're publicly talking about it now.

258
00:21:04,000 --> 00:21:08,000
We're not going to talk about these things this semester, because we really want to focus on how do we run,

259
00:21:08,000 --> 00:21:10,000
oh, that query is as fast as possible.

260
00:21:10,000 --> 00:21:16,000
And once we have that, then we can go beyond that and build this Delta update stuff.

261
00:21:19,000 --> 00:21:20,000
Okay.

262
00:21:21,000 --> 00:21:24,000
So the paper you guys read, they make a bunch of different observations.

263
00:21:25,000 --> 00:21:27,000
She mentioned the one about the still data.

264
00:21:27,000 --> 00:21:30,000
But I want to point out the sort of the three things that when we keep in the back of our minds,

265
00:21:30,000 --> 00:21:38,000
as we go throughout the semester, to understand and guide us on how we make decisions on building a system.

266
00:21:38,000 --> 00:21:42,000
And again, even though beyond the semester, you may not go off and build data system internals,

267
00:21:42,000 --> 00:21:46,000
but these are the things you should think about when we're choosing maybe an OLAP system

268
00:21:46,000 --> 00:21:51,000
in whatever your next project is at a startup or wherever you go next after you graduate here.

269
00:21:52,000 --> 00:21:57,000
So the first thing to point out is that in a modern setting, in modern organizations,

270
00:21:57,000 --> 00:21:59,000
people want to execute more than their SQL queries.

271
00:21:59,000 --> 00:22:03,000
Now, I realize as someone who's like a SQL maximalist where I think everything should be SQL,

272
00:22:03,000 --> 00:22:05,000
this seems like heresy to me, right?

273
00:22:05,000 --> 00:22:06,000
But I'm not naive.

274
00:22:06,000 --> 00:22:09,000
I know that people, you know, want to run PyTorch, Intensive Flow,

275
00:22:09,000 --> 00:22:16,000
and all these other ML workloads that aren't, you know, that you can't easily express in SQL.

276
00:22:16,000 --> 00:22:21,000
Now, there's projects like PostgreSQL that gives you UDFs, and they call us into PyTorch,

277
00:22:21,000 --> 00:22:23,000
but most of you aren't writing that.

278
00:22:23,000 --> 00:22:26,000
Most of you are, you know, her data scientists that are writing stuff in notebooks.

279
00:22:26,000 --> 00:22:31,000
And so the access patterns for ML workloads, for example,

280
00:22:31,000 --> 00:22:36,000
are going to look a lot different than OLAP queries or SQL queries.

281
00:22:36,000 --> 00:22:42,000
And we'll see this later in the semester when we talk about the networking protocols for database systems,

282
00:22:42,000 --> 00:22:48,000
that sometimes you want to do a bulk export of data without having a, you know,

283
00:22:48,000 --> 00:22:52,000
it was retreating exactly as it exists in memory from the data system,

284
00:22:52,000 --> 00:22:58,000
rather than having converted to a result format that you can then read as if you're going through JDBC or ODBC.

285
00:22:58,000 --> 00:23:01,000
Right? And so maybe you want to get things out of the patchy arrow format,

286
00:23:01,000 --> 00:23:04,000
which will cover throughout the semester.

287
00:23:04,000 --> 00:23:06,000
And that's relevant to the projects.

288
00:23:06,000 --> 00:23:11,000
So we'll design our system, the most of the parts of the system,

289
00:23:11,000 --> 00:23:18,000
at the sort of the planner level down, ML workloads are going to look a lot like Python workloads,

290
00:23:18,000 --> 00:23:20,000
a lot like SQL workloads. All of that's going to be the same.

291
00:23:20,000 --> 00:23:24,000
It's the front end part that I was saying before that we will need to expose different APIs

292
00:23:24,000 --> 00:23:28,000
for how we want to get data and run queries.

293
00:23:28,000 --> 00:23:33,000
The other point thing is that, the, as I said already, that like because of these shared disk architectures,

294
00:23:33,000 --> 00:23:40,000
it's no longer having the data system, having rigid control of exactly what data is going into the database

295
00:23:40,000 --> 00:23:42,000
and how people can get data out of it.

296
00:23:42,000 --> 00:23:48,000
Because now it's just files in S3 and ignoring any governance or any security permissions of how people can get to those files.

297
00:23:48,000 --> 00:23:54,000
If it's just files in S3, then we don't always have to go through the front end of the database system

298
00:23:54,000 --> 00:23:57,000
to do anything with our data. Right?

299
00:23:57,000 --> 00:24:03,000
That doesn't mean we still don't want to track schemas and versions of those schemas and what files actually exist.

300
00:24:03,000 --> 00:24:07,000
And the catalog is a pivotal thing that makes us all work.

301
00:24:07,000 --> 00:24:15,000
But because now anybody can put things in S3 in theory, you don't have to go through that full bureaucracy that I mentioned before.

302
00:24:15,000 --> 00:24:19,000
And the last one is that as they point out, and just think of your own behavior on the internet,

303
00:24:19,000 --> 00:24:22,000
most data is unstructured or semi-structured.

304
00:24:22,000 --> 00:24:25,000
So unstructured would be like an image or a video file.

305
00:24:25,000 --> 00:24:31,000
I think most of the traffic on the internet is from YouTube or video files.

306
00:24:31,000 --> 00:24:35,000
And then a lot of it is also unstructured or semi-structured.

307
00:24:35,000 --> 00:24:41,000
So this would be something like JSON files or a combination of structured data like a tuple,

308
00:24:41,000 --> 00:24:47,000
but then there's some JSON portion or maybe raw text from a log file.

309
00:24:47,000 --> 00:24:50,000
A lot of the data is going to come in this format.

310
00:24:50,000 --> 00:24:54,000
For unstructured data, we're not going to talk about anything about this this semester.

311
00:24:54,000 --> 00:25:01,000
Like that's taking like a transformer or some ML framework that then extracts information about what's in an image or an urn of video file.

312
00:25:01,000 --> 00:25:05,000
But with anything it spits out after you do that transformation is going to be structured.

313
00:25:05,000 --> 00:25:10,000
So for SQL purposes, it's not much that we can do for this.

314
00:25:10,000 --> 00:25:14,000
For semi-structured, this is going to be a big issue that we have to care about.

315
00:25:14,000 --> 00:25:17,000
Because people are going to have a dumb up bunch of JSON files in S3.

316
00:25:17,000 --> 00:25:23,000
Even if it's in a structured file format like a parquet or org file, which we read about next class,

317
00:25:23,000 --> 00:25:26,000
then we still have to be able to make sense of it.

318
00:25:26,000 --> 00:25:33,000
And this is a good example where we'll see some systems, the different systems will do different tricks to make it work efficiently for this.

319
00:25:33,000 --> 00:25:37,000
Snowflake, I think they assume that the data is always going to be there.

320
00:25:37,000 --> 00:25:39,000
They generate columns for this.

321
00:25:39,000 --> 00:25:41,000
Databricks, I think they do parsing on the fly.

322
00:25:41,000 --> 00:25:43,000
There's a bunch of different ways to handle that.

323
00:25:43,000 --> 00:25:46,000
And we'll see how we do that throughout the semester.

324
00:25:46,000 --> 00:25:51,000
So again, we want to design our system keeping these things in the back of our mind.

325
00:25:51,000 --> 00:25:55,000
And we'll see throughout the semester how we do each of these.

326
00:25:55,000 --> 00:26:05,000
The other interesting trend that has come out in the last decade is that we've gotten away from these monolithic database systems,

327
00:26:05,000 --> 00:26:11,000
where now people are building services or individual components that are separate from the full system,

328
00:26:12,000 --> 00:26:15,000
and it's basically how they have sort of laid out the project this semester,

329
00:26:15,000 --> 00:26:19,000
that in theory, these different services can be developed independently,

330
00:26:19,000 --> 00:26:27,000
along with they expose and maintain an API that the other services can understand and use and is stable,

331
00:26:27,000 --> 00:26:32,000
then you can start swapping these things in and out, or not have to build the entire system from scratch,

332
00:26:32,000 --> 00:26:37,000
you could use some all-the-shelf tools to build a full-flyers-data-based system.

333
00:26:38,000 --> 00:26:42,000
Again, everything in Postgres or everything in DuckDB is SQLite,

334
00:26:42,000 --> 00:26:46,000
is written by those developers.

335
00:26:46,000 --> 00:26:51,000
Ignoring third-party libraries for SSL and things like that, that's obviously not what I'm talking about.

336
00:26:51,000 --> 00:26:57,000
But the query optimizers of the catalog, the parser, all of that is built by the system developers.

337
00:26:57,000 --> 00:27:02,000
But now what we can do instead is, in theory, use some, again, all-the-shelf tools,

338
00:27:02,000 --> 00:27:07,000
and cobble them together and still make a full-fledged, full-feature database system.

339
00:27:07,000 --> 00:27:11,000
The challenge is going to be, though, obviously, you know,

340
00:27:11,000 --> 00:27:14,000
basic software engineering principle, the more abstraction layers you put in place,

341
00:27:14,000 --> 00:27:17,000
the more inefficient the software will become.

342
00:27:17,000 --> 00:27:24,000
Right? Just because there's intimate knowledge about what the system wants to do at any given level,

343
00:27:24,000 --> 00:27:30,000
and if you don't expose that information up and down the layers of the software stack,

344
00:27:30,000 --> 00:27:33,000
you end up doing the lowest common denominator.

345
00:27:33,000 --> 00:27:34,000
Yes?

346
00:27:34,000 --> 00:27:39,000
Do we know how costly it is to add these separation layers between different formats?

347
00:27:39,000 --> 00:27:45,000
This question is, do we know how costly it is to start using these different services

348
00:27:45,000 --> 00:27:47,000
versus having everything written scratch?

349
00:27:47,000 --> 00:27:50,000
No. I mean, hard to study, though, right?

350
00:27:50,000 --> 00:27:58,000
Like, hey, have two teams built a multi-million dollar project just to see whether one's better at the end.

351
00:27:58,000 --> 00:28:02,000
I mean, some parts are super hard, too.

352
00:28:02,000 --> 00:28:04,000
Like, the query optimizer is the hardest part of the data system.

353
00:28:04,000 --> 00:28:07,000
Most people can't build that, and they do end up building it.

354
00:28:07,000 --> 00:28:12,000
The first version is usually a bunch of heuristics, if-and-else statements, is garbage.

355
00:28:12,000 --> 00:28:17,000
And so, in the case of query optimizer, I know, again, we have a project going in this class,

356
00:28:17,000 --> 00:28:21,000
there's been two other attempts to build standalone services in query optimizers.

357
00:28:21,000 --> 00:28:26,000
There's CalSight from LucidDB, and that's probably the most common one,

358
00:28:26,000 --> 00:28:30,000
and there's Orca from the Green Plum, the Mware people.

359
00:28:30,000 --> 00:28:37,000
But, like, there is a paper about the effort it took to get Orca to work in my SQL,

360
00:28:37,000 --> 00:28:39,000
apparently, it was a huge pain.

361
00:28:39,000 --> 00:28:42,000
Because there's assumptions about these things, I mean, this is my last comment here,

362
00:28:42,000 --> 00:28:46,000
there's a bunch of challenges in calling these things together.

363
00:28:46,000 --> 00:28:50,000
It's not just like, you know, here's the HTTP protocol, and everyone,

364
00:28:50,000 --> 00:28:53,000
every web server speaks it, and it's easy to combine these things together.

365
00:28:53,000 --> 00:28:57,000
Did you ever use, like, at a REST API from any service, they want to data this way,

366
00:28:57,000 --> 00:29:02,000
but there's another one that's another way that becomes a train wreck real quickly.

367
00:29:02,000 --> 00:29:09,000
And so, making these things actually talk to each other, and actually making it fast, is non-trivial.

368
00:29:09,000 --> 00:29:13,000
So, we'll see how it goes for the project semester.

369
00:29:13,000 --> 00:29:17,000
Another important thing that we're going to cover, too, is what the intermediate representation,

370
00:29:17,000 --> 00:29:23,000
the IR looks like for the various parts of these systems that are talking to each other.

371
00:29:23,000 --> 00:29:30,000
And so, I'll show in the slide what I mean, but, like, I've already mentioned this in the project right up.

372
00:29:30,000 --> 00:29:36,000
They're like, okay, there's the query optimizer, and it's going to generate a query that hands off to the scheduler.

373
00:29:36,000 --> 00:29:38,000
Okay, well, what is actually handing?

374
00:29:38,000 --> 00:29:43,000
The scheduler needs to know what's actually inside the queries in order to make sense of what goes where.

375
00:29:43,000 --> 00:29:46,000
So, how do you actually represent that?

376
00:29:46,000 --> 00:29:49,000
And then now, how do they actually represent data?

377
00:29:49,000 --> 00:29:52,000
What are the data types across these things need to be synchronized?

378
00:29:52,000 --> 00:29:56,000
But again, if I'm using off-the-shelf components for my different projects and different teams,

379
00:29:56,000 --> 00:30:00,000
they might have 32-bit ins one way, and then all int might be 64-bit ins another one.

380
00:30:00,000 --> 00:30:02,000
Fixpoint Desmos is another challenge.

381
00:30:02,000 --> 00:30:08,000
How they actually store the data itself can become jumbled up and difficult.

382
00:30:08,000 --> 00:30:14,000
We'll talk about file formats like Nesclass, and again, we'll talk about execution engines and execution,

383
00:30:14,000 --> 00:30:18,000
kind of a little execution fabric, so think of like, you know, a patchy ray, like that kind of stuff.

384
00:30:18,000 --> 00:30:21,000
We'll talk about that in the semester as well.

385
00:30:21,000 --> 00:30:26,000
But there's a bunch of these stuff, and people have talked about, hey, there's all these existing things,

386
00:30:26,000 --> 00:30:30,000
because I just copied together a Java database using all this Java stuff.

387
00:30:30,000 --> 00:30:32,000
None of them have really taken off.

388
00:30:32,000 --> 00:30:36,000
I think they've only been, like, toy exercises.

389
00:30:36,000 --> 00:30:39,000
And this paper here that I'm referring to is optional.

390
00:30:39,000 --> 00:30:46,000
This is from the Facebook guys, the Voltron people, basically, they're arguing that this is how people should be building

391
00:30:46,000 --> 00:30:51,000
gave you systems today, they've had these standalone components that interrupt.

392
00:30:51,000 --> 00:30:57,000
So here's a high level overview of what the internal is one of these OLAP systems look like,

393
00:30:57,000 --> 00:31:01,000
given the context I just described, and essentially it's going to mirror how we're envisioning the projects

394
00:31:01,000 --> 00:31:03,000
are going to work out the semester.

395
00:31:03,000 --> 00:31:10,000
So at the very top, you have some user, they're going to send a query, assuming it's SQL to a front end part of the system.

396
00:31:10,000 --> 00:31:16,000
And this will have like a language parker, a SQL parser that's going to convert the SQL query into a bunch of tokens,

397
00:31:16,000 --> 00:31:18,000
especially by its form.

398
00:31:18,000 --> 00:31:24,000
And then now we're going to send this, this, this, an intermediate representation of the SQL query to some planner.

399
00:31:24,000 --> 00:31:27,000
And the planner's going to have a bunch of different parts.

400
00:31:27,000 --> 00:31:30,000
I have the binder, that's going to respond to what we're figuring out, like, you know, refers to it.

401
00:31:30,000 --> 00:31:34,000
So there's a token refers to a table name, did that table exist in my catalog?

402
00:31:34,000 --> 00:31:40,000
Can I do some, some, some rewriting of the query to put it into a better canonical form?

403
00:31:40,000 --> 00:31:48,000
And then I'll have an optimizer that could do a cost-based search using cost models that are derived from the data itself to help figure out what's the most optimal plan.

404
00:31:48,000 --> 00:31:51,000
And so for this part of the planner, we got to call it to the catalog.

405
00:31:51,000 --> 00:31:56,000
Right? Because we got to say, okay, again, I have this token, it's table-foo, is this really a table?

406
00:31:56,000 --> 00:31:59,000
What columns does it have? What's the data type? Where's this data actually being stored?

407
00:31:59,000 --> 00:32:02,000
Do I have any statistics about that data?

408
00:32:02,000 --> 00:32:05,000
That I can then feed into my cost models?

409
00:32:05,000 --> 00:32:12,000
Then now I have, I now have a physical plan that I can actually execute in my system.

410
00:32:12,000 --> 00:32:16,000
I got to hand that off to a scheduler, again, represent it in some intermediate form.

411
00:32:16,000 --> 00:32:22,000
And the scheduler can look at that and say, okay, well, you want to run this, this plan for this data.

412
00:32:22,000 --> 00:32:30,000
Let me go to the catalog and figure out where the data is actually located physically, or who's responsible in my cluster for actually executing that data.

413
00:32:30,000 --> 00:32:42,000
And then I now dispatch it to an execution engine, ignoring how I distribute the query out, who's responsible for making sure that the compute nodes are always running, all that we can ignore.

414
00:32:42,000 --> 00:32:49,000
And then as I'm actually my query plans, my operators, I may have requests that go get data from storage.

415
00:32:49,000 --> 00:32:58,000
So I'd have an I.O. service that I would make requests to, and then that I.O. service is responsible for going out to storage, not saying or defining what it is.

416
00:32:58,000 --> 00:33:04,000
Okay, assuming S3, assuming some distributed file system, could be local disk, doesn't matter.

417
00:33:04,000 --> 00:33:11,000
And then it's going to go fetch this box and then hand it back up to the execution engine to then compute whatever it is that it wants to compute.

418
00:33:11,000 --> 00:33:18,000
And then when I produce my final answer, then it goes all the way back up the stack to the end user.

419
00:33:18,000 --> 00:33:22,000
So I have two things that are happening at the same time. Again, the catalog is super important.

420
00:33:22,000 --> 00:33:31,000
The execution engine as it's scanning data, someone asked on Slack, should my query planner actually be responsible for looking at the files and figuring out what's actually in them?

421
00:33:31,000 --> 00:33:37,000
No, right? Because then you have to have duplicate code, redundant code, have the ability to scan data.

422
00:33:37,000 --> 00:33:42,000
The execution engine can just do this, because an analyzed command in SQL is just a sequential scan.

423
00:33:42,000 --> 00:33:52,000
And then it can update the result to the catalog. Now whether or not it goes to the scheduler or whatever the coordinator sends this back over, doesn't matter.

424
00:33:52,000 --> 00:34:00,000
But I'm just showing that the execution can derive new information that isn't just for the query, it's actually for the contents of the files and go to the catalog.

425
00:34:00,000 --> 00:34:05,000
I actually think that the utility automatically knows what the execution engine goes.

426
00:34:05,000 --> 00:34:06,000
Sure, yes.

427
00:34:06,000 --> 00:34:12,000
But that's also the right method to execute.

428
00:34:12,000 --> 00:34:18,000
I mean, it's a command, right? Let's say I have some files, I don't know what's in them.

429
00:34:18,000 --> 00:34:23,000
It's a schedule, go tell someone to do it for me. It's another query.

430
00:34:23,000 --> 00:34:27,000
But the query is coming from this, not from somebody other desk.

431
00:34:28,000 --> 00:34:30,000
Yes.

432
00:34:30,000 --> 00:34:36,000
So what I think about is putting this step forward, step forward, and then the path.

433
00:34:36,000 --> 00:34:42,000
Okay, let's cover that after class. Yeah. Okay. Other questions?

434
00:34:42,000 --> 00:34:48,000
Okay, so again, same thing, IO service. How are we actually going to find out what files are in there?

435
00:34:48,000 --> 00:34:56,000
Again, you could have a command that go through the front end, tell the catalog. Maybe IO services could see some stuff and can send it over.

436
00:34:56,000 --> 00:35:01,000
It depends on the implementation. But I was again, the comment I said before.

437
00:35:01,000 --> 00:35:08,000
The thing that's responsible, we're actually knowing what's inside of the blocks that I'm getting from from from disk or my object store is going to be the execution.

438
00:35:08,000 --> 00:35:15,000
Because otherwise you have a bunch of redundant code, you know, people running some stuff to go, you know, a bunch of threats up here, sort of reading data.

439
00:35:15,000 --> 00:35:21,000
And that can may interfere with what's going on down here.

440
00:35:22,000 --> 00:35:29,000
I don't think we're reading any paper or statistics about the catalog. We'll see how, as we go through this master, I'm going to implement this.

441
00:35:29,000 --> 00:35:35,000
Like, Snowflake uses a whole another database system. They use FoundationDB to do this. This is basically a whole another data system.

442
00:35:35,000 --> 00:35:41,000
And you want to be transactional. You want to be failsafe. You want to be high performance. This is a whole another problem in itself.

443
00:35:41,000 --> 00:35:49,000
And I want to talk about how we do this first. Again, before we do the lake house stuff to do updates on top of that.

444
00:35:49,000 --> 00:35:56,000
Because once you build that, this thing, then you can build that that additional incremental update part.

445
00:35:56,000 --> 00:36:03,000
Okay. So let's talk about a high low. Okay. That's the context of the concept of what one of these systems look like.

446
00:36:03,000 --> 00:36:16,000
Well, what actually happens when I actually one of these queries? So for this semester, although we're going to be just, you know, the high level context of what the system were describing, it's going to soon be distributed.

447
00:36:16,000 --> 00:36:22,000
Snowflake distributed, redshift distributed, all these systems that we show them, throw scale out distributed database systems.

448
00:36:22,000 --> 00:36:29,000
But we want to walk before we run. So most of the papers, unless all papers are going to read, are really about single note execution.

449
00:36:29,000 --> 00:36:35,000
Because at a high level, distributed query execution is the same thing as you would do in a single note.

450
00:36:35,000 --> 00:36:43,000
Modern CPUs have a bunch of cores. Sometimes you have multiple sockets. And you have to care about numerous regions where the actual memory is being located for each socket.

451
00:36:44,000 --> 00:36:53,000
So all that is still going to be the same. Which is when you go distributed, there's a bit more extra work to say, okay, well now I need to send data from this node to another node.

452
00:36:53,000 --> 00:37:03,000
Well, that's no different than sending from, you know, this CPU core to this CPU core. Right. It's obviously potentially slower than going over the network.

453
00:37:04,000 --> 00:37:13,000
But at a high level, the key concepts that we're describing throughout this semester are the same on a single note as distributed note. Single note versus multiple notes.

454
00:37:13,000 --> 00:37:25,000
So the query plan is going to be ideally a DAG of physical operators. So some systems and data fusion is one of them. It's actually not a DAG, it's a tree.

455
00:37:26,000 --> 00:37:30,000
And we'll see you later in the semester, well that's going to cause problems when we need to do nested queries, the subqueries.

456
00:37:30,000 --> 00:37:36,000
Because you want to be able to rewrite or maybe reuse computation from one part of the query for another query. But if it's a tree, you can't do that.

457
00:37:36,000 --> 00:37:40,000
So ideally, you want things to be a DAG and not all systems actually do that.

458
00:37:40,000 --> 00:37:50,000
And then the data system is going to look at the query plan, figure out what data needs to access, where it's coming into an operator, and where it needs to go next.

459
00:37:50,000 --> 00:37:59,000
And so we're going to figure that out all ahead of time so that when you run the query, it knows exactly how to orchestrate and schedule things and where to send stuff.

460
00:37:59,000 --> 00:38:11,000
We'll see a little bit how we sprinkle some ad activity in this process where we can make changes on the fly to the query plan and how we move data or maybe scale things up and down based on what we see in the data.

461
00:38:11,000 --> 00:38:23,000
Because that's going to be a big theme throughout the semester, again in this data lake or lake house world, the object store world, you may not actually know what's actually in the files because you haven't done the scan on it yet.

462
00:38:23,000 --> 00:38:30,000
So your estimations might be wrong, so maybe you underestimated overestimated different parts and you want your system to adapt a little bit.

463
00:38:30,000 --> 00:38:31,000
Yes.

464
00:38:31,000 --> 00:38:35,000
If a query time can be a DAG, what is the tree?

465
00:38:35,000 --> 00:38:36,000
Tree.

466
00:38:38,000 --> 00:38:39,000
Post goes as a tree.

467
00:38:39,000 --> 00:38:40,000
Yes.

468
00:38:40,000 --> 00:38:42,000
What does the tree look like?

469
00:38:42,000 --> 00:38:44,000
Like where is the dog?

470
00:38:44,000 --> 00:38:47,000
Like a DAG, you could have one part of it, another one.

471
00:38:47,000 --> 00:38:49,000
Yeah, a tree where you only have one parent.

472
00:38:49,000 --> 00:38:56,000
Or a DAG, you can do some computation here for a nested query and then send it to two different parts of the tree.

473
00:38:56,000 --> 00:38:58,000
Or the query plan.

474
00:38:58,000 --> 00:39:01,000
Okay.

475
00:39:01,000 --> 00:39:12,000
So this again, this will be a high level overview of what is going to actually happen now in the execution engine with the IOS service when we execute a query.

476
00:39:12,000 --> 00:39:15,000
So again, these are our worker nodes.

477
00:39:15,000 --> 00:39:18,000
They'll have local CPU, local memory, local disk.

478
00:39:18,000 --> 00:39:25,000
And then they're going to retrieve when the query starts, you know, think of the leaf nodes of the query plan like squirrel scans and so forth.

479
00:39:25,000 --> 00:39:28,000
That's going to go at what we're going to call persistent data.

480
00:39:28,000 --> 00:39:33,000
And this is the underlying tuples that are in our tables in our database.

481
00:39:33,000 --> 00:39:40,000
So again, whether this comes from the IOS service through local disk or from the app store, at this point, it doesn't matter.

482
00:39:40,000 --> 00:39:46,000
So all now the worker nodes are going to do some computation for our query plan and they're going to produce intermediate results.

483
00:39:46,000 --> 00:39:53,000
So these intermediate results are again, are the artifacts that the operator generates that needs to go to the next stage of the query plan.

484
00:39:53,000 --> 00:39:56,000
And again, we'll talk about this throughout the semester.

485
00:39:56,000 --> 00:40:02,000
Like we'll assume that the unit of work for our worker nodes when we execute query is going to be a pipeline.

486
00:40:02,000 --> 00:40:08,000
And then we have to obviously stop at a pipeline breaker and then potentially distribute data around as needed.

487
00:40:08,000 --> 00:40:13,000
So the way we would distribute data around is one way to do is it's through shuffle notes.

488
00:40:13,000 --> 00:40:24,000
And the idea here is that you just, you hash whatever some partitioning key is on the data that you're scanning, that you're producing it in your results, and then you distribute it across them to these shuffle nodes.

489
00:40:24,000 --> 00:40:28,000
And then this is sort of again, this is the, think of this as the pipeline breaker.

490
00:40:28,000 --> 00:40:33,000
And then now these shuffle nodes are responsible for distributing this data to the next stage of the query plan, the worker nodes.

491
00:40:33,000 --> 00:40:41,000
So there's really no computation being done here. It's just basically in and out, like storing things as a key value pair in memory and then sending out to the worker nodes.

492
00:40:41,000 --> 00:40:46,000
I'm saying this is optional because most, not all of the lab data systems do this.

493
00:40:46,000 --> 00:40:49,000
BigQuery and Dremel is probably the most famous one that does this.

494
00:40:49,000 --> 00:40:55,000
And Google doesn't say anything stop. They actually have specialized hardware on these things to keep everything in memory and runs as fast as possible.

495
00:40:55,000 --> 00:41:02,000
And it allows them to do a bunch of tricks for scaling things in and out because now you have this pipeline breaker.

496
00:41:02,000 --> 00:41:07,000
You can go look, I thought the data was going to be the order this size or this amount, but actually have this amount.

497
00:41:07,000 --> 00:41:11,000
Do I need more nodes or less nodes? Should I change anything up in the query plan?

498
00:41:11,000 --> 00:41:12,000
Yes.

499
00:41:12,000 --> 00:41:16,000
So this is like a, as a part of a regular place where you can insert that ability into a query plan.

500
00:41:16,000 --> 00:41:22,000
Yes, so statement is this, as a pipeline breaker is this a good, I'm saying stop point.

501
00:41:22,000 --> 00:41:27,000
It's a point in the query plan. You can say, okay, let me reassess what is coming into me.

502
00:41:27,000 --> 00:41:31,000
And do I want to change anything upstream? So Google does that here.

503
00:41:31,000 --> 00:41:36,000
Yes. So this idea, some of this idea comes from the map reduced world.

504
00:41:36,000 --> 00:41:41,000
They would have an explicit shuffle phase. But the difference is in the map reduced world, if you're familiar with things like Hadoop,

505
00:41:41,000 --> 00:41:44,000
which you don't recommend using, you don't want to use that anymore.

506
00:41:44,000 --> 00:41:52,000
But in that world, it was all batch base, meaning you had to accumulate all the intermediate results of the shuffle phase before you can start the next phase.

507
00:41:52,000 --> 00:41:55,000
In a modern overlap system, you can use an streaming manner.

508
00:41:55,000 --> 00:42:01,000
As the data arrives, you can start pushing it to an streaming fashion up to the next worker nodes.

509
00:42:01,000 --> 00:42:05,000
Start executing right away. So having it in this sort of long pause.

510
00:42:05,000 --> 00:42:11,000
The other thing point out too, for some publicity I've shown this in PowerPoint, I have the same number of worker nodes as shuffle nodes.

511
00:42:11,000 --> 00:42:15,000
You don't need to do that. You can scale things up and down accordingly.

512
00:42:15,000 --> 00:42:20,000
Because if sometimes the intermediate data could be larger than your persistent data.

513
00:42:20,000 --> 00:42:23,000
We'll see this later in the semester when you do a worst case optimal joins.

514
00:42:23,000 --> 00:42:28,000
That the intermediate and balloons to be much, much larger than the persistent data.

515
00:42:28,000 --> 00:42:34,000
Even the final result will be much smaller, but this thing can get quite large.

516
00:42:34,000 --> 00:42:38,000
And then now again, we do the next phase. These worker nodes produce more intermediate results.

517
00:42:38,000 --> 00:42:47,000
And then we send this now to some final node to do some final call-lessing or aggregation to produce the final result that we send back to the user.

518
00:42:47,000 --> 00:43:03,000
So I'm not showing this here, but the thing that's above all of this, keep track of what's going on, what workers are still alive, what stage they are in execution, how much data they're generating, that's the schedule in the coordinator, all above this.

519
00:43:03,000 --> 00:43:10,000
It's different than the orchestrator in Kubernetes. Because Kubernetes is just like seeing is the pod still up.

520
00:43:10,000 --> 00:43:17,000
Doesn't actually know what's going on inside of it. You have to build that ourselves in our data systems, keep track of what, okay, what are you actually doing?

521
00:43:17,000 --> 00:43:24,000
Because Kubernetes again, that doesn't can't see inside your query.

522
00:43:24,000 --> 00:43:28,000
So I've already started that this, but the distinction is between persistent data and meter data.

523
00:43:28,000 --> 00:43:34,000
Persistent data is the source of record for our database. Again, could be files in S3.

524
00:43:34,000 --> 00:43:39,000
Could be proprietary storage that the data managed itself.

525
00:43:39,000 --> 00:43:46,000
One key thing, though, is that all these modern systems, because you're going to assume you're going to run on something like S3.

526
00:43:46,000 --> 00:43:53,000
An S3 is immutable. I can't store file or object in S3 and then go back and make in place updates to particular bytes.

527
00:43:53,000 --> 00:43:57,000
If I want to do that, I've got to overwrite the entire thing.

528
00:43:57,000 --> 00:44:05,000
And so that means they're all going to be using sort of pen-only architectures for how they designed the data encoded in the storage formats.

529
00:44:05,000 --> 00:44:09,000
That's sort of the thing I mentioned in the lake house before. Like, just log structure, a bunch of changes.

530
00:44:09,000 --> 00:44:16,000
I think I might distort this JSON. And then they batch it together in the storage park, because it's one right out to the outer store.

531
00:44:16,000 --> 00:44:23,000
For the in-mater data, again, these are short-lived artifacts that we're going to generate as we execute the query.

532
00:44:23,000 --> 00:44:33,000
And because they are only really useful for the lifetime of the query itself, we don't have to worry about durability and fault-tons in the same way we would with persistent data.

533
00:44:34,000 --> 00:44:41,000
Now with persistent data, because we're, again, assuming we're running on an object store, they handle all that fault-tons and resiliency for us.

534
00:44:41,000 --> 00:44:45,000
Again, one less thing we have to worry about as we bought a database system.

535
00:44:45,000 --> 00:44:53,000
But for the in-mater data, wherever it's possible for maintaining it, ideally, we don't want it to store it on S3 because that's slow and cost money.

536
00:44:53,000 --> 00:44:57,000
So we'll try to keep this in local caches, either in memory or in disk.

537
00:44:58,000 --> 00:45:04,000
But again, but if like a node goes down, we can handle that.

538
00:45:04,000 --> 00:45:11,000
We don't have to make sure we store a good Julian copies of in-mater data, because who cares when the query is over, we throw it away.

539
00:45:11,000 --> 00:45:17,000
There has been some research in maybe reusing in-mater results from one query to the next.

540
00:45:17,000 --> 00:45:22,000
No system, as I know, actually supports that, because if you want to do that, then you just define a materialized view.

541
00:45:22,000 --> 00:45:24,000
Because it's basically the same thing.

542
00:45:24,000 --> 00:45:25,000
Yes?

543
00:45:25,000 --> 00:45:29,000
Do you say those node correlation, the meta-placic persisting in the operator?

544
00:45:29,000 --> 00:45:35,000
Is there not a string of the meta-placing object entering from the data that you've given from the persisting data?

545
00:45:35,000 --> 00:45:44,000
This question is, having got to be honest, there's a comment here that says that there's no correlation between the amount of innovative data that the query generates.

546
00:45:44,000 --> 00:45:49,000
There's no correlation between the size of the persistent data that they're reading in or the execution time.

547
00:45:49,000 --> 00:45:56,000
This result comes from the snowflake paper from two or three years ago, or last year.

548
00:45:56,000 --> 00:46:01,000
They looked at all the queries that they actually actually did in snowflake, and they saw that this wasn't the case at all.

549
00:46:01,000 --> 00:46:08,000
Your statement is, could there just be an upper bound where I know the max limit of the amount of data I could generate?

550
00:46:08,000 --> 00:46:10,000
No, because my query can do anything.

551
00:46:10,000 --> 00:46:16,000
I can just do a billion times and generate a bunch of random stuff.

552
00:46:16,000 --> 00:46:22,000
It costs you money. You can do it, but you can do it.

553
00:46:22,000 --> 00:46:27,000
The challenge for query optimization is to know when this is going to happen.

554
00:46:27,000 --> 00:46:33,000
When you have an operator that's going to generate more innovative results than the data going into it.

555
00:46:33,000 --> 00:46:38,000
You want to use that to figure out what joint algorithm should I use, worst case optimal, or hashed on.

556
00:46:38,000 --> 00:46:42,000
Again, I keep saying this. We'll cover it later this semester.

557
00:46:42,000 --> 00:46:49,000
Hopefully, when I was taking classes back in the day, the professor would say a bunch of stuff in the beginning,

558
00:46:49,000 --> 00:46:54,000
like, what the hell is he talking about? Later on, you learn all the stuff and it clicks.

559
00:46:54,000 --> 00:46:58,000
I'm bringing this stuff up now because when we hit those lectures, that's what he meant by this.

560
00:46:58,000 --> 00:47:00,000
Worst case optimal joints. Now I know what that is.

561
00:47:00,000 --> 00:47:06,000
It's a prelude for what's the common. Hopefully, you can see I'm getting excited.

562
00:47:06,000 --> 00:47:21,000
The other thing that I consider now to in our system architecture is the way in which we're going to transfer data between the different operators and the nodes.

563
00:47:21,000 --> 00:47:26,000
It's going to come down to where that persistent data is actually going to be stored.

564
00:47:26,000 --> 00:47:34,000
Again, the highlight detail is if it was a shared nothing system, which I covered in a second,

565
00:47:34,000 --> 00:47:38,000
you primarily push query to the data in a shared disk system.

566
00:47:38,000 --> 00:47:45,000
You would think it primarily would be by textbook definition pulling data to the query, but we'll see in a modern setting, these lines get blurred very quickly.

567
00:47:45,000 --> 00:47:53,000
Because for the automated results, you push the query to the data sometimes, and in other cases, you want to, in some object storage,

568
00:47:53,000 --> 00:47:58,000
you can actually push the query to the data down to the actual object store, other cases start moving things around.

569
00:47:58,000 --> 00:48:08,000
It can get jumbled, so there's not really a clean divide between the different models, but it's going to understand them in the context again of the system that we're trying to build conceptually in our minds.

570
00:48:09,000 --> 00:48:15,000
The push approach, again, is that the idea is that the query itself,

571
00:48:15,000 --> 00:48:21,000
you're in the SQL string or the intermediate representation of the query plan, is going to be much smaller than the data,

572
00:48:21,000 --> 00:48:29,000
so why transfer a bunch of data over to the node just to execute it, why not to send the query, which is much smaller over to where the data is actually being stored,

573
00:48:29,000 --> 00:48:37,000
and I can do the processing there, and then send back the intermediate results, which ideally should be smaller than the persistent data.

574
00:48:38,000 --> 00:48:49,000
This made a lot of sense in the old days when disks were super slow and networking was super slow. Usually, the network is always considered much slower than the disk.

575
00:48:49,000 --> 00:48:53,000
That's not true anymore. The hardware's gotten really good.

576
00:48:54,000 --> 00:49:05,000
The challenge in this space though is that you may not have the computational capabilities on where the data is actually being stored to do any processing on that side.

577
00:49:07,000 --> 00:49:16,000
Again, you think of using S3, if you ignore the select operator, which is talking about the second, it's just the API's get, put, and delete.

578
00:49:17,000 --> 00:49:23,000
You can't say, oh, by the way, also execute this part of the query plan for me. You can, we'll talk about in a second, that's usually what the API is expecting.

579
00:49:23,000 --> 00:49:29,000
Actually, in Google, that's all they expose to you. You can't do any computation there, so you can't push the query to the data.

580
00:49:29,000 --> 00:49:39,000
You instead have to pull the query to the data. You bring the data that you need, do the processing there, generate the intermediate results, and then send it to the next stage.

581
00:49:40,000 --> 00:49:45,000
Again, the idea is, again, the size of the query relative to the size of the data that you're processing is going to be much smaller.

582
00:49:45,000 --> 00:49:52,000
The largest query I've ever heard of in the pure SQL string itself is 10 megabytes from Google. That's a huge task query.

583
00:49:52,000 --> 00:49:59,000
It's big, but the processing terabytes of data. It's not even close. Or the magnitude difference.

584
00:50:00,000 --> 00:50:05,000
In the old days, this was considered the primary way to do it, especially in a shared nothing architecture.

585
00:50:05,000 --> 00:50:12,000
But in a shared disk, you actually, if you just get an ignoring the extra features you can get from object stores, you would do this.

586
00:50:12,000 --> 00:50:24,000
The extra features I'm talking about are in things like S3, they have a select operator, where now you can basically send what looks like a SQL query down to S3 when you make the get request.

587
00:50:25,000 --> 00:50:32,000
And you can say, here's run this filter on this data. And S3 actually knows the contents of what your objects actually look like.

588
00:50:32,000 --> 00:50:38,000
So it's not a dumb, key value story. Say, give me this bucket. And I don't just give me the byte streamer, I don't care what's in it.

589
00:50:38,000 --> 00:50:47,000
Like, as they say here, they know that it's a CSV, a JSON, of its parquet. And they actually can process that natively where the data is actually being stored.

590
00:50:48,000 --> 00:50:56,000
I don't know how they charge you for this, whether it's just the fetch command, or like they charge you the runtime, or because it runs as a Lambda function, I actually have no idea.

591
00:50:56,000 --> 00:51:06,000
But again, this allows us to do a predicate push down in a shared disk architecture, which we, in according to the text, well, you would not be able to do.

592
00:51:07,000 --> 00:51:15,000
Microsoft has their own thing. I don't know whether you get SQL, but you can kind of see like the, you know, you pass in some kind of query there.

593
00:51:15,000 --> 00:51:20,000
And again, as far as I know, Google doesn't have this. I didn't look this year, but the last year they didn't have this as well.

594
00:51:20,000 --> 00:51:29,000
So again, this is what I'm saying. The lines get blurred because you can do some predicate push down and other things. And projection push down as well.

595
00:51:30,000 --> 00:51:31,000
All right, again, yes.

596
00:51:34,000 --> 00:51:45,000
This question is, do you always want to do predicate push down at the option is available? No, because like it may be the case that the block of data you need is used over and over again, but bunch of queries that have different predicates.

597
00:51:45,000 --> 00:51:56,000
So therefore, I'm making now multiple requests to s3 to get different portions of that same file, where it would have been cheaper just to go get it once, cache it, then do all my filtering locally.

598
00:51:57,000 --> 00:52:05,000
Right. But how to figure that out? It's hard. Right. And that's why people pay a lot of money for databases.

599
00:52:05,000 --> 00:52:18,000
Because they'll they can do that all for you. I actually don't know how many systems actually do that. This trick though. I think redshift does it because they obviously built it, but I don't know what the snowflake does it.

600
00:52:19,000 --> 00:52:30,000
All right. So again, share nothing architecture. This is what we covered in the interclass. You know, classic textbook definition actually comes from the stone breaker. This is something that he coined in the in 1980s.

601
00:52:30,000 --> 00:52:40,000
And this was the prevailing architecture for for just a bit of databases, but for all of the P and OLAB systems for, you know, for 30 years until the 2010s.

602
00:52:41,000 --> 00:52:57,000
Again, each each node itself is going to have its own local CPU locally attached disk and memory and anytime you want to send information to get data from another node, you got to go over the network and send PCP or your UDP requests.

603
00:52:57,000 --> 00:53:07,000
Right. So we'll call, you know, each of these things as a single data system node. So I think like EC2, you know, you get an instance that we're talking about that.

604
00:53:08,000 --> 00:53:20,000
The database is going to be partitioned into disjoint subsets across the nodes, right, this can picking like a partition key, you can either range partitioning or hash partitioning to divide them all up evenly across the different nodes.

605
00:53:20,000 --> 00:53:36,000
And then now since the data is being stored by the data, and there's local, then I can just use a positive API. You know, I can use cyscall, go get you know, FRED or FOPEN and get the file, the data that actually need because everything can, it's just files on on disk that I control my file system.

606
00:53:38,000 --> 00:53:39,000
Yes.

607
00:53:45,000 --> 00:53:50,000
Yes, so his question is, if I add a new node, do I have to move data immediately or do I move data as it comes in?

608
00:53:50,000 --> 00:54:00,000
So this is going to be one of the big problems I'm going to face and share nothing is that if we want to increase capacity here, then I have to add a new node, but then that node when it gets added doesn't have any data in it.

609
00:54:01,000 --> 00:54:10,000
So there's this Genshius NSF, NSF melts, but then, wait, the NFS has to be like a central storage, right?

610
00:54:10,000 --> 00:54:14,000
It can't be, you can't do like a peer-to-peer file system.

611
00:54:16,000 --> 00:54:29,000
AFS, same thing, right, it's a central storage. So that's a shared discocker tagger. The difference is going to be though is that in something like AFS or NFS, the location or the distribution of the data is going to be a little bit more.

612
00:54:29,000 --> 00:54:43,000
The distribution of the data physically is transparent to the database system because it's a POSIX API. You just call F-open and F-read, you don't actually know, I mean, the cover is where that data is actually being stored, right?

613
00:54:43,000 --> 00:54:55,000
So unless you now somehow explicitly tell NFS to like partition things a certain way, and so that when you read this range versus that range, you know that only certain pieces of data that get it locally.

614
00:54:55,000 --> 00:54:58,000
But again, it's as opaque storage as that you don't understand.

615
00:55:02,000 --> 00:55:06,000
But through NFS? NFS doesn't expose you that, it shows that too.

616
00:55:10,000 --> 00:55:12,000
But then you got to get that information out of NFS.

617
00:55:14,000 --> 00:55:20,000
Now you're basically building a database system, like why bother you? We don't, like no, you don't want to run your database all NFS, right?

618
00:55:21,000 --> 00:55:27,000
These are the scale like this. People do that, people run the sands all the time for distributed file systems.

619
00:55:29,000 --> 00:55:37,000
The data is going to do better if it knows exactly where the data is actually. Maybe not physically stored because if it's S3, all that's abstracted away from you too as well.

620
00:55:37,000 --> 00:55:52,000
But like it's, how does it? The object store versus NFS would give you roughly the same interface except that you would have better control of, what can you control?

621
00:55:53,000 --> 00:55:58,000
You have control of things like georeplicator not and NFS hides that from you. You get more metadata out of object stores.

622
00:55:58,000 --> 00:56:05,000
I'm aware of objectures where the user and the customer is like a metadata over here. That's the first figure of where this would be in the United States.

623
00:56:06,000 --> 00:56:15,000
That's the catalog. You're talking about the catalog. So, see, some systems use Cassandra as the metadata layer, the key track of where the data is actually located. That's the catalog.

624
00:56:16,000 --> 00:56:24,000
Again, I mentioned snowflake, the used foundation DB. I can't think of anybody offhand that uses Cassandra for this in databases.

625
00:56:24,000 --> 00:56:31,000
But yeah, it's the same idea. But that's the separate databases to keep track of the metadata. That's not this.

626
00:56:33,000 --> 00:56:41,000
Okay. So, in the shared system, again, we have the separation between computing storage, we have the compute layer.

627
00:56:42,000 --> 00:56:43,000
There's still locally attached disk that, yes.

628
00:56:43,000 --> 00:56:50,000
Very different questions about things. If one of the nodes goes down, you do all access to it.

629
00:56:50,000 --> 00:56:56,000
Oh, yeah. Sorry. I got a side track. Sorry. First, David, if one of the nodes goes down, do you lose access to that data? Yes.

630
00:56:57,000 --> 00:57:04,000
So, therefore, you have to replicate it. And again, this was going back to the same before. It's now managed storage that the data systems controls and they're in charge of replication.

631
00:57:05,000 --> 00:57:11,000
So, they have to handle all that for you. In an S3 object store, Amazon handles that. Google handles that.

632
00:57:12,000 --> 00:57:18,000
I don't know how to do it. They guarantee certain amount of reliability. And, you know, for our purposes, it's good enough.

633
00:57:19,000 --> 00:57:26,000
So, like, in this world, you have to manage it. And then the question was, if I add another new node, or take a node away, do I have to reshuffle data? Yes.

634
00:57:27,000 --> 00:57:34,000
And the data system has to do that. And you want to do this in a transactional manner on your catalog so that you avoid false negatives.

635
00:57:41,000 --> 00:57:50,000
So, in the shared disk system, again, we have the compute layer and we have the storage layer here. And we just access this through a, you know, some kind of API.

636
00:57:51,000 --> 00:58:02,000
And in the cloud world, instead of using positive API, because there's not, you don't want to use like a fused file system to talk to S3, you instead use whatever the user space API that the cloud provider provides for you.

637
00:58:03,000 --> 00:58:10,000
Like, Amazon gives you a bunch of libraries to talk to S3. Some data systems go to extremes and throw that all away and rewrite it themselves.

638
00:58:11,000 --> 00:58:20,000
So, we'll see one in a second. But, like, that's how we're going to react to these things. And so, now, the way to think about this is the compute nodes are stateless.

639
00:58:21,000 --> 00:58:32,000
Like, in my shared, in my shared nothing system going back, I actually pointed out, like, I partitioned my database and now each node ignoring replication is responsible for that partition of the data.

640
00:58:33,000 --> 00:58:39,000
And so, if I want to take a node away, well, I got to copy whatever's in it and send it to all the other nodes to redistribute it.

641
00:58:39,000 --> 00:58:52,000
But, in a shared system, if I want to take away one of these compute nodes, well, okay, that's fine, because the data is down here. So, I can theory kill this thing and then not lose any data.

642
00:58:53,000 --> 00:59:06,000
Or, I could turn them, turn them all off, not pay for the compute costs, and then, you know, all my data is still retained. Whereas, in a shared nothing system, I got to keep the CPUs running because if they go away, then the data goes away.

643
00:59:07,000 --> 00:59:10,000
Yeah, you can check Monte EBS and all that, but, like, yes.

644
00:59:19,000 --> 00:59:30,000
So, his statement is, his statement is, and he's cracked, like, if we shot, if we shot, in the shared nothing, a shared desk, if I'm literally running Quirry at the time, then yes, there's a femoral state for that query that I would lose.

645
00:59:30,000 --> 00:59:34,000
Yes, and we can talk about how to handle fault tolerance later on for that.

646
00:59:35,000 --> 00:59:51,000
But, typically, again, if you say, ignoring unexpected failures, when you do a shutdown, you basically, you announce all the nodes, hey, I'm going to shut down, finish whatever jobs you're doing, and then once the last queries, or plan fragments, lead the queue, then you can shut it down.

647
00:59:52,000 --> 00:59:57,000
There's a process of doing that. It's not nothing fancy, it's not hard.

648
00:59:58,000 --> 01:00:20,000
Okay. Again, we'll see this later in the semester, but there'll be a catalog service that keeps track of, you know, this data actually here still can be partitioned, even though we see, you know, this thing could just be going to files on S3, and I could keep track of my catalog, which in my compute notes is responsible for those files.

649
01:00:21,000 --> 01:00:29,000
And then if I increase or decrease my capacity, I'd run the men's, and kind of update to my catalog and say, okay, these new nodes are now responsible for this other technique.

650
01:00:30,000 --> 01:00:37,000
And then for that one, in case of like snowflake, I'll just use consistent hashing to avoid having to reshuffle everything, right, that all the standard techniques still apply here.

651
01:00:38,000 --> 01:01:01,000
Alright, so this to finish up with the distinction, again, in the shared nothing, it's hard to scale capacity, but potentially it is faster, because now everything's sort of local, but the engineering benefits and the operational benefits you get from something like a shared disc architecture is why basically every OLAP system built in the last 10 years uses this technique.

652
01:01:02,000 --> 01:01:11,000
And even systems that started off using shared nothing like yellow brick have converted to this, because the benefits are so significant.

653
01:01:11,000 --> 01:01:21,000
And again, like, Amazon's approving S3 all the time, so as they make those changes, your data rise along the wave and gets all those updates and new features as well.

654
01:01:22,000 --> 01:01:29,000
Right, because when S3 first came out, it didn't have that select command now it does, so that's something you know they've added that you can then take the benefit of without having to do any engineering for yourself.

655
01:01:30,000 --> 01:01:35,000
And S3 is pretty cheap, that's actually really cheap compared to EBS and other things.

656
01:01:36,000 --> 01:01:42,000
It's not the fastest, but then that's okay, we're database, we know how to do caching, it's basically a buffer pool manager, right.

657
01:01:42,000 --> 01:01:52,000
You're not new caching, avoid that there's long latency of doing this access, so we can do all of that to hide the slow rate around trip times from S3.

658
01:01:53,000 --> 01:01:56,000
So again, this semester we're going to focus on this implementation.

659
01:01:59,000 --> 01:02:09,000
So this is not a new idea, again I should have showed that these things became vogue in the 2010s, but actually goes back to the 1980s, and traditionally these things were terrible, these shared disk data systems.

660
01:02:10,000 --> 01:02:26,000
But because of the cloud stores, because of all these, every vendor has their own version, there's local things like SEF and other stuff or cluster FS, like there's local object stores you could use, these things are so prevalent, but again every system is based on this.

661
01:02:27,000 --> 01:02:38,000
So just give an example of what a non cloud version of a shared disk architecture would look like, that's old, this is Oracle Exadata, so when you buy Oracle Exadata it's getting millions of dollars, they ship you a rack or a bunch of racks,

662
01:02:39,000 --> 01:02:46,000
and you can buy a shared disk architecture, that's going over like, infinity and n or fiber channel from the compute nodes to the storage nodes.

663
01:02:47,000 --> 01:02:50,000
I think they can do predicate push down on the storage size as well.

664
01:02:50,000 --> 01:03:02,000
And again, this is all running in the same rack, instead of like on the object store over the public network in Amazon, but again just showing that these ideas have been around for a long time.

665
01:03:02,000 --> 01:03:05,000
So let's talk about the object stores, from the portion that we care about.

666
01:03:06,000 --> 01:03:22,000
So again, from the Davies' perspective, it's disk, and instead of going, again, we're not using POSX API, we're not using the libc calls, we're using whatever the API, the cloud vendors providing us, but we're going to be responsible for what we're actually storing in it.

667
01:03:23,000 --> 01:03:30,000
And then whether it's going to be in a proprietary format that's custom to the database system, or an open source format, we'll cover next class.

668
01:03:31,000 --> 01:03:33,000
Again, it doesn't matter.

669
01:03:34,000 --> 01:03:38,000
So most of the, you know, in most of these systems, they're going to be storing in the Pax format.

670
01:03:39,000 --> 01:03:52,000
Again, think of that as like, it's a columnar format, but the tables me divided up into row groups or blocks, big blocks of data, and then within that block, all the data for a single two-bo is going to be located in it, but it's just going to be stored in a columnar format.

671
01:03:53,000 --> 01:04:02,000
And that's different than like the really early column store systems, like in Vertica, for example, I think they stored the entire column as a separate, continuous file, and every column was its own file.

672
01:04:03,000 --> 01:04:11,000
In the Pax world, again, you combine things together so that all the two-bo is spatially close to each other within the file, even though they're stored in a columnar format.

673
01:04:12,000 --> 01:04:21,000
Again, and we'll cover this next class, but there'll be some got a header of footer for all these files that's contained how to get to these offsets, because everything has to be fixed length, to get to the different two-bo's that you need.

674
01:04:22,000 --> 01:04:34,000
How things are being compressed, any additional sketches or indexes or metadata, where we want to store, if I want the data is, but again, we scan through the execution engine and then feed that into the catalog so that the planner can use it.

675
01:04:34,000 --> 01:04:37,000
Again, all this will cover and the next class.

676
01:04:37,000 --> 01:04:45,000
And again, basically what happens is you would retrieve either the header, or in case of Park K and Ork, it's always the footer, because it's an appendly of storage.

677
01:04:45,000 --> 01:04:50,000
So you start writing up the file and then you realize, okay, here's all the data I just stored, and you put that in the footer.

678
01:04:50,000 --> 01:04:56,000
So you can use your object store to go just retrieve the footer of the file, and then figure out what's actually inside of it.

679
01:04:57,000 --> 01:05:00,000
And again, they all have their own version of Put Get and Delete.

680
01:05:01,000 --> 01:05:07,000
So this is the one system we're going to cover later in the semester, but I bring it up now because it's wild what they did.

681
01:05:07,000 --> 01:05:14,000
So the yellow brick was originally an on-prem database system that was shared nothing. It was an appliance.

682
01:05:14,000 --> 01:05:20,000
You would buy these custom hardware that they would put together that was tuned for the database system, and you run this on-prem.

683
01:05:20,000 --> 01:05:25,000
They switch converted to a cloud-based database system, like a snowflake or like a redshift and others.

684
01:05:25,000 --> 01:05:36,000
But they found that when they converted over to the run in the public cloud, the object store was so much slower than they were used to in their on-prem version of Put Get.

685
01:05:36,000 --> 01:05:43,000
So they ended up rewriting a lot of things that Amazon provides you, or like, the Office doesn't provide you, and everything's all custom.

686
01:05:43,000 --> 01:05:50,000
So for example, they threw away the Amazon libraries for their own libraries to call S3 using Intel DVDK.

687
01:05:50,000 --> 01:06:02,000
So it's doing kernel bypass, which will cover the latest semester, basically to do fast lookups to S3, get the contents, or get the data you need, and not make a copy in the kernel, just immediately pass it up to user space.

688
01:06:03,000 --> 01:06:14,000
DVDK is a nightmare. We'll cover that in the later semester. Or like, instead of running over TCP-IP, they wrote their own network protocol over UDP, because there's just so much faster than them.

689
01:06:14,000 --> 01:06:20,000
So they rewrote a ton of stuff and say, they write their own PCIe drivers. Like, who does that? Data is people, right? It's awesome.

690
01:06:21,000 --> 01:06:34,000
So, you know, there is, like, even though I said S3 is slow, or, you know, relative to local disk, there's ways to make it faster. And again, caching is also going to help us hide long latency as well.

691
01:06:34,000 --> 01:06:37,000
We're relying on the local attached disk on the compute nodes.

692
01:06:38,000 --> 01:06:51,000
Okay, so to finish up, today again, it was a vomiting a bunch of database stuff at you, as a preview for where we're going to go this semester.

693
01:06:51,000 --> 01:06:59,000
And we're basically going to start from the bottom layer. We're not going to talk about how S3 works, because that part we don't really care about.

694
01:07:00,000 --> 01:07:09,000
But we're going to talk about what the data is actually going to look like in that we're going to put in S3. And then we'll start building layers on top of that, or, to be able to execute queries.

695
01:07:09,000 --> 01:07:14,000
So the opposite direction will be what I showed in the beginning, going top down, we're going to go bottom up.

696
01:07:14,000 --> 01:07:24,000
And the idea really is about how to, what are the state of our implementation, the state of our methods, techniques, and algorithms, to do all the things that we laid out at the time.

697
01:07:24,000 --> 01:07:31,000
And that's the papers that I picked for you guys are really designed to expose you to, here's a certain way of how people approach these problems.

698
01:07:31,000 --> 01:07:35,000
But then we'll also cover other papers that are related to the other techniques.

699
01:07:35,000 --> 01:07:37,000
Okay?

700
01:07:37,000 --> 01:07:45,000
All right, so next class, the paper guys have reading is actually something that I wrote with my former PGA student, basically it's a survey of the internals of Parkay and Ork.

701
01:07:45,000 --> 01:07:48,000
It's going to talk a little bit about GPUs at the end.

702
01:07:49,000 --> 01:07:53,000
We're not going to cover GPUs or FGAs the semester, a whole new line of work.

703
01:07:53,000 --> 01:07:57,000
We're only going to be focused on how we do X2 queries on CPUs for now.

704
01:07:57,000 --> 01:07:58,000
Okay?

705
01:07:58,000 --> 01:08:01,000
And then, so next class will be Parkay and Ork.

706
01:08:01,000 --> 01:08:05,000
It's the most widely used, open source file formats.

707
01:08:05,000 --> 01:08:15,000
And then the following class next Monday will be, here's the, here's new variations, new implementations of a file format that, that supposedly are better than Parkay and Ork.

708
01:08:15,000 --> 01:08:18,000
So it's like, sort of the next generation file formats that are coming out.

709
01:08:18,000 --> 01:08:19,000
Okay?

710
01:08:19,000 --> 01:08:21,000
Any other questions?

711
01:08:45,000 --> 01:08:47,000
Okay?

