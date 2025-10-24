---
title: CMU15721 P3S202402 DataFormatsEncodingPart1CMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Carnegie Mellon University's Advanced Database Systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:09,000 --> 00:00:11,000
I want to know what kind of club it is.

4
00:00:11,000 --> 00:00:13,000
I want to know what kind of club it is.

5
00:00:13,000 --> 00:00:15,000
I want to know what kind of club it is.

6
00:00:15,000 --> 00:00:18,000
We're starting the bottom of the system stack of this concept

7
00:00:18,000 --> 00:00:22,000
of the ecosystem with the women building and sort of work our way up

8
00:00:22,000 --> 00:00:25,000
to actually maybe start running queries and producing results.

9
00:00:25,000 --> 00:00:28,000
So we're going to start the very bottom of the system

10
00:00:28,000 --> 00:00:31,000
and describe what is the data actually going to look like.

11
00:00:31,000 --> 00:00:35,000
So the first thing you understand is, again, just remind ourselves

12
00:00:35,000 --> 00:00:37,000
what workload we're targeting.

13
00:00:37,000 --> 00:00:41,000
Right? We've been talking about these OLAP systems

14
00:00:41,000 --> 00:00:44,000
and their workload is going to look different than an OLTP system.

15
00:00:44,000 --> 00:00:49,000
And that's going to inform us how we want to design, again, the data,

16
00:00:49,000 --> 00:00:52,000
how we want to lay out data on the disk or in memory,

17
00:00:52,000 --> 00:00:56,000
and then again, all the auxiliary things you need to do to support that.

18
00:00:57,000 --> 00:01:02,000
So the primary sort of access method or access pattern

19
00:01:02,000 --> 00:01:07,000
we're going to have in a OLAP workload is going to be sequential scans.

20
00:01:07,000 --> 00:01:10,000
Meaning we're going to be taking large chunks of data

21
00:01:10,000 --> 00:01:14,000
and scanning some subset of the columns that may be in the table.

22
00:01:14,000 --> 00:01:17,000
But just again, scanning large segments of them at a time.

23
00:01:17,000 --> 00:01:19,000
And therefore, we're going to have to do a bunch of stuff

24
00:01:19,000 --> 00:01:21,000
to make sure that runs as fast as possible.

25
00:01:21,000 --> 00:01:25,000
There isn't going to be a data structure

26
00:01:26,000 --> 00:01:30,000
like a B-plus tree or a skip list or other things we would do want to use

27
00:01:30,000 --> 00:01:34,000
to help us find individual tuples, because we don't care about individual tuples

28
00:01:34,000 --> 00:01:35,000
in OLAP workload.

29
00:01:35,000 --> 00:01:38,000
We care about aggregate information.

30
00:01:38,000 --> 00:01:40,000
We care about sequential scans.

31
00:01:40,000 --> 00:01:43,000
And the only time we're ever going to care about finding individual tuples

32
00:01:43,000 --> 00:01:46,000
is that we have to stitch the results back together.

33
00:01:46,000 --> 00:01:49,000
Right? Because we're going to use a decomposition storage model

34
00:01:49,000 --> 00:01:52,000
or column store, right? We're going to break up the attributes for a single tuple.

35
00:01:53,000 --> 00:01:56,000
And that's fine because a lot of the processing will do in our sequential scans.

36
00:01:56,000 --> 00:01:58,000
We'll be again on a subset of those columns.

37
00:01:58,000 --> 00:02:01,000
But at the end, when we need to produce a final result,

38
00:02:01,000 --> 00:02:05,000
we may need to go find the other tuples or sorry, other attributes for a given tuple

39
00:02:05,000 --> 00:02:07,000
and put things back together.

40
00:02:07,000 --> 00:02:12,000
We're not going to want to use a B-plus tree or another data structure

41
00:02:12,000 --> 00:02:14,000
to do that for us again, or hash table.

42
00:02:14,000 --> 00:02:16,000
Again, just a contrast reminder, cells from last semester,

43
00:02:16,000 --> 00:02:19,000
in an OLAP environment or OLAP workloads,

44
00:02:20,000 --> 00:02:22,000
they care about finding individual things.

45
00:02:22,000 --> 00:02:26,000
Like go find Andy's order orders, go find Andy's bank account.

46
00:02:26,000 --> 00:02:30,000
And in this, in that world, we want to use again,

47
00:02:30,000 --> 00:02:33,000
like something like a B-plus tree, be able to go find those things efficiently.

48
00:02:33,000 --> 00:02:37,000
Because OLTP systems also need to be able to support updates,

49
00:02:37,000 --> 00:02:41,000
inserts updates, deletes, these data structures have to be dynamic,

50
00:02:41,000 --> 00:02:45,000
automatically resize themselves as we insert new data.

51
00:02:46,000 --> 00:02:49,000
We don't care about any of those things in our world, yes.

52
00:02:49,000 --> 00:02:52,000
So by stitching, why would we need to do it at the very end?

53
00:02:52,000 --> 00:02:53,000
Why would we want to...

54
00:02:53,000 --> 00:02:56,000
This question is, why would I have to do stitching at the very end?

55
00:02:56,000 --> 00:03:01,000
That's the late materialization, which we'll cover two weeks.

56
00:03:01,000 --> 00:03:02,000
Yeah.

57
00:03:02,000 --> 00:03:06,000
But that's a basic idea is that like I want to avoid having stitched the tuple together

58
00:03:06,000 --> 00:03:09,000
for as long as possible, because I don't know whether I'm going to need

59
00:03:09,000 --> 00:03:11,000
even that tuple as I'm going up the query plan.

60
00:03:11,000 --> 00:03:14,000
So if I can hold off, actually, you need to have to put it back together

61
00:03:14,000 --> 00:03:17,000
to the very end, then I avoid unnecessary IO.

62
00:03:19,000 --> 00:03:21,000
I think I'm going to be so understanding with stitching.

63
00:03:21,000 --> 00:03:24,000
Again, it's going to be a comms sort of.

64
00:03:24,000 --> 00:03:26,000
Today's talk is about we're going to break up it,

65
00:03:26,000 --> 00:03:28,000
two-bone two different attributes.

66
00:03:28,000 --> 00:03:30,000
We've got to put it back together at the end.

67
00:03:30,000 --> 00:03:31,000
Stitch.

68
00:03:31,000 --> 00:03:32,000
Question?

69
00:03:32,000 --> 00:03:33,000
I'm just going to just like...

70
00:03:33,000 --> 00:03:38,000
If we're not using the season all over the lab for those...

71
00:03:38,000 --> 00:03:39,000
Yes.

72
00:03:39,000 --> 00:03:40,000
How do we...

73
00:03:40,000 --> 00:03:41,000
We go to the...

74
00:03:41,000 --> 00:03:43,000
Like, sequential scan, fly all the tuple that we want.

75
00:03:43,000 --> 00:03:46,000
And we're already passing the tuple as we see it.

76
00:03:46,000 --> 00:03:47,000
And we're like, you want that?

77
00:03:47,000 --> 00:03:48,000
Or is it like later?

78
00:03:48,000 --> 00:03:51,000
Yes. The question is, like, how can we stitch things back together?

79
00:03:51,000 --> 00:03:53,000
Like, what additional metadata we need to know is like,

80
00:03:53,000 --> 00:03:55,000
hey, you're part of this tuple, put that together.

81
00:03:55,000 --> 00:03:56,000
We'll cover that later.

82
00:03:56,000 --> 00:03:59,000
The basic idea is that you just record offsets.

83
00:03:59,000 --> 00:04:02,000
Good. That's the query processing.

84
00:04:02,000 --> 00:04:03,000
That's later.

85
00:04:03,000 --> 00:04:06,000
Right. So...

86
00:04:06,000 --> 00:04:07,000
Okay.

87
00:04:07,000 --> 00:04:13,000
So if all we're going to do for O-Lup workloads is mostly run sequential scans.

88
00:04:13,000 --> 00:04:14,000
Again, it's not entirely true.

89
00:04:14,000 --> 00:04:16,000
Sometimes there's smaller range scans.

90
00:04:16,000 --> 00:04:17,000
We don't scan the entire thing.

91
00:04:17,000 --> 00:04:20,000
Sometimes you do need to go find individual tuples.

92
00:04:20,000 --> 00:04:22,000
And for all that, we would have additional things.

93
00:04:22,000 --> 00:04:24,000
We could add to our database system.

94
00:04:24,000 --> 00:04:27,000
For now, we're going to ignore that.

95
00:04:27,000 --> 00:04:30,000
Right. So if all you're going to do is execute central scans,

96
00:04:30,000 --> 00:04:32,000
you know, how can you actually optimize it?

97
00:04:32,000 --> 00:04:35,000
So this list here is basically what we covered a lot.

98
00:04:35,000 --> 00:04:38,000
We talked a little bit about in the intro class,

99
00:04:38,000 --> 00:04:41,000
but a lot of these other things we're going to talk about in this class.

100
00:04:41,000 --> 00:04:42,000
Right.

101
00:04:42,000 --> 00:04:44,000
This is basically the menu what's available to us.

102
00:04:44,000 --> 00:04:45,000
Right.

103
00:04:45,000 --> 00:04:47,000
So today's class is about data encoding and compression.

104
00:04:47,000 --> 00:04:52,000
How to minimize the amount of storage space it takes to represent data.

105
00:04:52,000 --> 00:04:55,000
Represent tuples.

106
00:04:55,000 --> 00:05:00,000
Prefetching is identifying what data I'm going to need as I'm scanning along the table

107
00:05:00,000 --> 00:05:03,000
and go ahead and bring those things into memory before the...

108
00:05:03,000 --> 00:05:06,000
before the execution ended and actually needs it.

109
00:05:06,000 --> 00:05:08,000
So when it goes and says, hey, I need this block.

110
00:05:08,000 --> 00:05:12,000
Well, it's already here in memory or already in a local cache for us.

111
00:05:12,000 --> 00:05:15,000
Parallelization is going to allow us to run multiple queries at the same time

112
00:05:15,000 --> 00:05:19,000
and within that single query run multiple tasks, a query plan for segments

113
00:05:19,000 --> 00:05:22,000
or different portions of a query plan at the same time.

114
00:05:22,000 --> 00:05:25,000
Either across, you've been threads, different processes, different nodes.

115
00:05:25,000 --> 00:05:26,000
Kind of doesn't matter.

116
00:05:26,000 --> 00:05:31,000
Clustering sorting is identifying that the data can be stored in such a way

117
00:05:31,000 --> 00:05:36,000
that when queries go start asking for data within a given range or something,

118
00:05:36,000 --> 00:05:39,000
you can minimize the amount of data you have to look at because you know

119
00:05:39,000 --> 00:05:44,000
within some range it's located spatially close to each other.

120
00:05:44,000 --> 00:05:46,000
Late materialization is what he was asking about.

121
00:05:46,000 --> 00:05:51,000
How do I... can I delay having to stick the tuple back together to the very end?

122
00:05:51,000 --> 00:05:55,000
Because I don't want to pay the cost of going reading things from disk or from memory

123
00:05:55,000 --> 00:05:58,000
if I know I'm actually not going to need it.

124
00:05:58,000 --> 00:06:02,000
And I don't need to materialize, you know, take up memory to put things together either.

125
00:06:02,000 --> 00:06:05,000
MaterializeViews, a result caching, is basically identifying that

126
00:06:05,000 --> 00:06:08,000
I'm going to execute basically the same query over and over again.

127
00:06:08,000 --> 00:06:12,000
Therefore I can keep the result of that query around and that way in someone

128
00:06:12,000 --> 00:06:14,000
to ask for it again, it's already there.

129
00:06:14,000 --> 00:06:17,000
Or materializeViews, sort of specialized case of this where you recognize that

130
00:06:17,000 --> 00:06:23,000
there's a bunch of queries that need to operate or process the same subset of data.

131
00:06:23,000 --> 00:06:27,000
Like give me all the orders within today's month or this month.

132
00:06:28,000 --> 00:06:31,000
So maybe I can pre-compute that portion of the query for the...

133
00:06:31,000 --> 00:06:33,000
give me all the orders for today's for this month.

134
00:06:33,000 --> 00:06:37,000
And even though the queries may do different things on that month's worth of data,

135
00:06:37,000 --> 00:06:41,000
I've already done sort of the basic work of getting the month.

136
00:06:41,000 --> 00:06:42,000
Yes.

137
00:06:42,000 --> 00:06:44,000
How is that different from the data to your stuff?

138
00:06:44,000 --> 00:06:46,000
It's questions, how is it different than data-cube stuff?

139
00:06:46,000 --> 00:06:48,000
So it's basically the same thing.

140
00:06:48,000 --> 00:06:52,000
In the data-cube world back in the day, even now, they're probably not all very dynamic.

141
00:06:52,000 --> 00:06:55,000
But like you basically have to manually refresh.

142
00:06:55,000 --> 00:07:00,000
And materializeViews, at least the ideas that if I make incremental changes,

143
00:07:00,000 --> 00:07:03,000
I can then refresh the view.

144
00:07:03,000 --> 00:07:08,000
Now, in the ideal case, you want to do this without re-computing the entire query.

145
00:07:08,000 --> 00:07:10,000
Because that's the dumbest thing you can do, right?

146
00:07:10,000 --> 00:07:14,000
Like if I insert one tube into a row and re-compute this one second query or ten second query,

147
00:07:14,000 --> 00:07:17,000
now there are some systems that can do incremental updates.

148
00:07:17,000 --> 00:07:19,000
Admittedly, this is the part of data systems I know the least about.

149
00:07:19,000 --> 00:07:20,000
This is super hard.

150
00:07:20,000 --> 00:07:23,000
And we're actually not going to cover that this semester.

151
00:07:23,000 --> 00:07:24,000
Consult caching is obvious.

152
00:07:24,000 --> 00:07:26,000
You just do pattern matching with the strings.

153
00:07:26,000 --> 00:07:27,000
They say, it's the same thing.

154
00:07:27,000 --> 00:07:28,000
And then we use it.

155
00:07:28,000 --> 00:07:32,000
This is not that common either.

156
00:07:32,000 --> 00:07:37,000
Data skipping is being able to identify before actually looking at the data that I don't need the data.

157
00:07:37,000 --> 00:07:41,000
And not have to process it.

158
00:07:41,000 --> 00:07:42,000
Data parallelization or vectorization.

159
00:07:42,000 --> 00:07:47,000
This is going to be sort of specialization of regular parallelization or task parallelization.

160
00:07:47,000 --> 00:07:51,000
The idea here is that within a single piece of data,

161
00:07:52,000 --> 00:07:55,000
or yeah, the chunk of data, maybe multiple two-blows,

162
00:07:55,000 --> 00:08:03,000
can I use things like SIMD to process multiple units at the same time or multiple pieces of the data at the same time?

163
00:08:03,000 --> 00:08:07,000
And then code specialization compilation, again, we'll cover this later this semester.

164
00:08:07,000 --> 00:08:12,000
This idea is that since I'm, if I know the type of data I'm processing,

165
00:08:12,000 --> 00:08:19,000
I know what the query is going to be, rather than have this execution to interpret what the query wants to do,

166
00:08:19,000 --> 00:08:25,000
I could just literally generate C code that does exactly what the query wants, compile that, and run that.

167
00:08:25,000 --> 00:08:29,000
Does not be C, could use intermediate languages and things like that.

168
00:08:29,000 --> 00:08:32,000
But this will be a big thing with a little cover later on.

169
00:08:32,000 --> 00:08:35,000
So again, for this semester, we're going to not talk about materialized views,

170
00:08:35,000 --> 00:08:40,000
and we're not going to talk about the pre-vegting one.

171
00:08:40,000 --> 00:08:42,000
And so for this class, though, we're going to talk about this lecture today,

172
00:08:42,000 --> 00:08:44,000
we're going to talk about data encoding compression,

173
00:08:44,000 --> 00:08:54,000
and then the data encoding part is going to then help us for next class to talk about how can we encode data in such a way that we can get better parallelism through vectorization.

174
00:08:54,000 --> 00:08:57,000
Can I get the summary of materialized views?

175
00:08:57,000 --> 00:09:01,000
This question, can I get the summary of materialized views? The basic idea of materialized views is like,

176
00:09:01,000 --> 00:09:07,000
think of a regular view, right? Views are almost like a macro of a query.

177
00:09:07,000 --> 00:09:11,000
So instead of having to, like in case of a query, a view would say,

178
00:09:11,000 --> 00:09:13,000
just a select query, create a view for it.

179
00:09:13,000 --> 00:09:16,000
Now, anytime that someone does a, any treat it like a virtual table,

180
00:09:16,000 --> 00:09:24,000
and anytime you do a select on it, the database system is basically replacing the name of the table with the nested query that's defined in your view.

181
00:09:24,000 --> 00:09:28,000
But in that, in that world, in regular views, every single time you run the query,

182
00:09:28,000 --> 00:09:32,000
you're re-computing whatever the select query that the view points do.

183
00:09:32,000 --> 00:09:39,000
A materialized view, basically, says, generate the result when you declare the view,

184
00:09:39,000 --> 00:09:45,000
and then anytime anybody wants query that view, you don't have to re-comput it, you have the result already.

185
00:09:45,000 --> 00:09:51,000
But then the thing you can do is you can find materialized views on,

186
00:09:51,000 --> 00:09:57,000
maybe they don't exactly match with the query once, like, give me all the orders for this month.

187
00:09:57,000 --> 00:10:00,000
And then you define that as a materialized view.

188
00:10:00,000 --> 00:10:04,000
Anytime anybody inserts a new order for this month, you have to then refresh that materialized view.

189
00:10:04,000 --> 00:10:06,000
And the database system will do this automatically.

190
00:10:06,000 --> 00:10:10,000
If they support automatic refresh, in Postgres, you have to manually refresh it.

191
00:10:10,000 --> 00:10:13,000
And SQL Server and other systems that will do it will free automatically.

192
00:10:13,000 --> 00:10:15,000
There's probably the index and you have a separate storage or a penny plug.

193
00:10:15,000 --> 00:10:20,000
It's question is, yeah, it's statement, it sounds like an index. Yes, it's like a supplemental data structure.

194
00:10:20,000 --> 00:10:24,000
Yeah, that's a subset of the data I looked for.

195
00:10:24,000 --> 00:10:27,000
But the way the database is maintained as it's just like a temp table.

196
00:10:27,000 --> 00:10:30,000
But if you restart it, it comes back.

197
00:10:30,000 --> 00:10:31,000
Yeah.

198
00:10:32,000 --> 00:10:34,000
But the hard part is doing that incremental updates.

199
00:10:34,000 --> 00:10:41,000
If I insert one two, like, say my view is like the running total of the number sales for this month.

200
00:10:41,000 --> 00:10:45,000
Well, if I insert a new order, I want to update that total.

201
00:10:45,000 --> 00:10:50,000
But I know I, you know, if I'm dumb, I'll just run the whole aggregation query from beginning to end.

202
00:10:50,000 --> 00:10:55,000
But if I'm clever about it and recognize, oh, well, this is just a sum of the total order amount.

203
00:10:55,000 --> 00:10:58,000
I know what this order amount is, just increment it.

204
00:10:58,000 --> 00:11:03,000
Okay, but not every system can do that.

205
00:11:03,000 --> 00:11:05,000
Okay, again, so this class, we're talking about these two things.

206
00:11:05,000 --> 00:11:11,000
And then how we do data encoding will influence how we can do data parallelization and vectorization later.

207
00:11:11,000 --> 00:11:17,000
And then we'll cover vectorization in more detail when we talk about query processing further along.

208
00:11:17,000 --> 00:11:23,000
But it's hard to, like, try to avoid talking about simd, this lecture and vectorization, this lecture.

209
00:11:23,000 --> 00:11:26,000
Next lecture that you read the fast lanes paper and it's all about it.

210
00:11:26,000 --> 00:11:33,000
So we'll see how to do this for, you know, do use vectorization for other things like joins and sorting and other stuff later in the two weeks.

211
00:11:33,000 --> 00:11:38,000
All right, so today we're going to talk about storage models and then persistent data formats.

212
00:11:38,000 --> 00:11:40,000
I'm not going to talk about intermediate data formats.

213
00:11:40,000 --> 00:11:46,000
We'll cover that when we talk about a little bit about arrow today, but we'll cover that in more detail when we talk about query processing.

214
00:11:46,000 --> 00:11:52,000
Right, it's really about these are the files that are on disk, whether it's an object store or a local file system, it doesn't matter.

215
00:11:52,000 --> 00:11:57,000
Right, these are the actual bits that are getting put out in persistent storage.

216
00:11:57,000 --> 00:11:58,000
Okay.

217
00:11:58,000 --> 00:12:04,000
All right, so the first thing we got to discuss is what storage model we're going to use for these data files.

218
00:12:04,000 --> 00:12:11,000
And again, this will be some of a, you know, repeat what we talked about in intro class, but it's important to go over this again more detail,

219
00:12:11,000 --> 00:12:17,000
to understand again what packs is going to do for us later on when we start constructing the file formats.

220
00:12:18,000 --> 00:12:24,000
So the storage model is going to find how we're physically going to store the tuples on disk and in memory.

221
00:12:24,000 --> 00:12:27,000
And again, this is not the actual bytes we're actually storing.

222
00:12:27,000 --> 00:12:30,000
It just says like, okay, here's some tuple, here's some attributes for them.

223
00:12:30,000 --> 00:12:40,000
I don't really care what those bytes are in those attributes, but how should I organize them in relation to both the attributes within the same tuple and then across other tuples.

224
00:12:41,000 --> 00:12:45,000
So the default storage model in most systems, or most people think about what, when they think about a data system,

225
00:12:45,000 --> 00:12:48,000
this is going to be the anary storage model at the row store.

226
00:12:48,000 --> 00:12:55,000
Again, this is what bus tub is, this is what postgres, my SQL, SQLite, Oracle, and this is what most people get.

227
00:12:55,000 --> 00:13:01,000
Geekop is an storage model is the sort of pure column store, and then the packs model will be a hybrid of the two of these.

228
00:13:01,000 --> 00:13:09,000
And you'll see that we want to use packs because we'll have better locality for attributes within the same tuple, like the Libby in the same block.

229
00:13:10,000 --> 00:13:20,000
Again, so the e-sys, or not e-sys, the default storage model that every system can think most people, when they think about a data system,

230
00:13:20,000 --> 00:13:23,000
they think about the storage model as going to be the anary or the row store.

231
00:13:23,000 --> 00:13:34,000
And again, the idea here is that we're going to store almost all the attributes for a single tuple, continuously in our pages or in our file or in memory, one after another.

232
00:13:34,000 --> 00:13:44,000
Now, I'm saying almost because again, there are sometimes in some systems, if you have oversized attributes, like something more than like four kilobytes that doesn't fit in a single page,

233
00:13:44,000 --> 00:13:49,000
they'll have an auxiliary storage, postgres calls this toasterage, I think some systems call this secondary storage.

234
00:13:49,000 --> 00:13:56,000
It's basically you just have a pointer to some other blob store thing that has the large attributes, but we don't really care about that.

235
00:13:57,000 --> 00:14:09,000
And again, this is going to be ideal for OTP workloads because in that environment these applications, the transactions of the queries are most going to be concerned about getting single tuples, like go get Andy's order record.

236
00:14:09,000 --> 00:14:23,000
And because we're going to want to, you know, digesting new information from the outside world, when new inserts up in deletes, it's really easy for us to take any new tuple that someone inserted, go find a free slot in some page and just write it all out there continuously.

237
00:14:23,000 --> 00:14:33,000
And then when we want to commit the transaction, or we later need to flush the journey page, assuming one tuple fits in a single page, it's one disc write to put that out there.

238
00:14:33,000 --> 00:14:43,000
So the page size in this world is typically going to be some constant factor of four kilobytes, right? Postgres by default is eight kilobytes or equals four kilobytes, although I think you can tune that.

239
00:14:44,000 --> 00:14:51,000
DB2, you can tune this. My SQL is the biggest one, maybe at 16 kilobytes. It might be one that's 32 kilobytes, you have to figure which one.

240
00:14:51,000 --> 00:14:56,000
But it's always going to be some, it's going to be measured in kilobytes, like single digits kilobytes in this world.

241
00:14:56,000 --> 00:15:04,000
Because again, if you think about the workload they're trying to support, go get Andy's order record. My record isn't going to be that big. It's going to, isn't going to be megabytes.

242
00:15:05,000 --> 00:15:12,000
So it doesn't make sense for me to have these really big pages to store this row data because I got to go get that entire page and bring it in.

243
00:15:12,000 --> 00:15:21,000
I can't, you know, in the NSM world, I can't bring in partial pages. I got to bring the whole thing because I need the header and what else the data is in that because I need to protect it in the context of transactions.

244
00:15:21,000 --> 00:15:26,000
Right. So there are always the page sizes are going to be much smaller than we'll see in for a network list.

245
00:15:27,000 --> 00:15:35,000
And because, again, because we're trying to do single to proper processing for the most part, we'll want to use the iterator, the volcano processing model in this world.

246
00:15:35,000 --> 00:15:39,000
Again, I don't want to talk about too much about query processing, but that'll come later.

247
00:15:39,000 --> 00:15:48,000
And obviously this sucks for OLAP, as I said, because in OLAP, we're doing large, large, substantial scans on a subset of the columns for the most part.

248
00:15:48,000 --> 00:15:58,000
So if I have 100 columns in my table, but now my query only needs four of them, well, I got to bring in the other 96 columns that I don't need because it's all packed into the single page.

249
00:15:59,000 --> 00:16:11,000
So this is where the column store, the DSM decomposition storage model stuff came along where people recognize that, oh, for the different class of workloads, for OLAP workloads, it doesn't make sense to store everything continuously.

250
00:16:11,000 --> 00:16:20,000
Instead, you want to break up the two pool based on its attributes. Then now you store all the data for that attribute across multiple tuples, contiguously.

251
00:16:20,000 --> 00:16:25,000
And that's going to open up a bunch of advantages for compression and other things that we can take advantage of.

252
00:16:26,000 --> 00:16:31,000
And this, we can do this because we're, again, we're mostly running, we don't link queries.

253
00:16:32,000 --> 00:16:39,000
So we're not worried about how to do incremental inserts into our database. If someone was certain new data, you know, again, some systems will handle that,

254
00:16:39,000 --> 00:16:46,000
but oftentimes it'd be like a bulk load of like, here's a bunch of results, a bunch of data we've gotten, and then you don't have to worry about incremental updates.

255
00:16:47,000 --> 00:17:00,000
Because again, if you had to do a transaction, update this one record that had 100 attributes, if I'm doing the decomposition storage model, I got to update 100 pages at least and write them all out, which is actually.

256
00:17:00,000 --> 00:17:04,000
And that's going to be slow, that's going to be terrible. So we don't have to worry about that.

257
00:17:05,000 --> 00:17:11,000
These file sizes are going to be typically larger, hundreds of megabytes. Now within this file will break it up.

258
00:17:11,000 --> 00:17:22,000
This was the row group stuff that you read in the paper, you'll break it up into smaller chunks and identify which of these pieces of the file actually need, but the overall file itself is going to be, could be quite large.

259
00:17:23,000 --> 00:17:32,000
So let's give an example what this looks like. Say we have a really simple table, three attributes and six rows, six tuples.

260
00:17:33,000 --> 00:17:41,000
So what we're going to want to do is we're going to store all of the values for a game in column all within a single file.

261
00:17:41,000 --> 00:17:51,000
There'll be some metadata header at the front that maybe tell us additional information like what version of the data system wrote this data, any additional statistics, like the zone map stuff that we want to store for that.

262
00:17:51,000 --> 00:17:58,000
There'll be a null bitmap to keep track of which of these attributes are actually null because we need a way to represent that.

263
00:17:58,000 --> 00:18:03,000
But again, we'll just store a separate file for each of the three attributes.

264
00:18:03,000 --> 00:18:11,000
Now we'll see why we need to do this in a second, but we're going to make sure that all the data we're storing has to be fixed length.

265
00:18:11,000 --> 00:18:16,000
Right? I'm going to think of us why or knows why from last semester.

266
00:18:17,000 --> 00:18:28,000
So you can get the offset. So that going back to the stitching thing, if I need to get for the for row zero, tuples zero, I need to get its data and I'm processing, you know, I'm at this position here.

267
00:18:28,000 --> 00:18:33,000
I know how to do simple arithmetic to jump down to the other column files.

268
00:18:33,000 --> 00:18:41,000
I know the length of the data that I'm storing of each value and I know what offset a map. So I just do the simple map and jump to the right offset.

269
00:18:42,000 --> 00:18:48,000
But of course, how we handle that for variable length data, like strings, which are super common. We'll see that in a second.

270
00:18:48,000 --> 00:18:55,000
So fixed length offsets isn't the only way to do this. It's the most common one. This one pretty much almost everyone does, especially if you have a sort of pure,

271
00:18:55,000 --> 00:19:02,000
a lot system or an old system that is designed from the ground up to be to run these analytical workloads as a column store.

272
00:19:03,000 --> 00:19:14,000
The alternative is to embed tuple IDs. So for every single value in a column, you'll have a little prefix that says, I'm, you know, I'm tuple zero, tuple one, tuple three, tuple four.

273
00:19:14,000 --> 00:19:28,000
And now if you ever want to find the corresponding data or attributes for that same tuple across all the columns, you need an auxiliary data structure, like a hash table that says, okay, for this column, for this tuple ID, here's the offset you want to jump to.

274
00:19:28,000 --> 00:19:33,000
Or at least very least look, here's the range you should start out looking for it.

275
00:19:33,000 --> 00:19:34,000
Yes.

276
00:19:38,000 --> 00:19:45,000
The same question is, if I'm saying everything has to be fixed length, but then you have strings, does that mean you can't do this?

277
00:19:45,000 --> 00:19:55,000
No, we'll see how this handle that in a second. The answer's going to be dictionary coding. Because we want to convert anything that's variable length to fixed length.

278
00:19:56,000 --> 00:20:00,000
The next one is going to be what I'm highlighting here.

279
00:20:02,000 --> 00:20:09,000
So, like I said, I'm only bringing stuff to the bottom one. I'm saying, don't do this. I'm only bringing out because there are some systems to do it.

280
00:20:09,000 --> 00:20:20,000
And as far as I know, it's only done in cases where it was like a row store system. And then they added like a little specialized storage manager or storage engine and say, oh, yeah, we also have a column store piece.

281
00:20:20,000 --> 00:20:29,000
And they need to be able to handle the need to reuse some existing depotons that they had to do a process on column store data.

282
00:20:29,000 --> 00:20:37,000
So they add these two more ideas. But this is what you want to do. You want to use the fixed length. And in parkaian or they're all fixed length.

283
00:20:39,000 --> 00:20:44,000
So basically what he asked me was, how do I handle the error length data? The answer's going to be dictionary. Yes, question.

284
00:20:51,000 --> 00:20:58,000
So his question is, or say, but is if I'm doing run length encoding, do I still have the advantage of fixed length? Yeah, why wouldn't you?

285
00:21:07,000 --> 00:21:16,000
We won't tell how to process run length encoding today. But the basic idea is that you do have to, like, you scan through to know where to jump. Like, okay, I'm looking for this value.

286
00:21:16,000 --> 00:21:29,000
I scan through and I know that if I'm looking for a two point this offset, I keep scanning to I find the run length encoding entry that covers my offset.

287
00:21:33,000 --> 00:21:45,000
So you just came through all the file again, we'll break this pure DSM. Yes, you would have that problem. Like worst case scenario, you get the scan to the very bottom because the thing you look for is at the very bottom.

288
00:21:45,000 --> 00:22:02,000
This is why another reason why I would use packs because they're basically going to break things up to the row groups. So that in worst case scenario, yes, we have the scan in entire column. It's early compressed. But it's only going to be 10 megs or something like that. It's not that big.

289
00:22:02,000 --> 00:22:21,000
Right, again, so what are you dictionary encoding? And that allows convert very length data into fixed length files. And if you read the paper, you pick this up. Parquet is very aggressive actually on the dictionary encoding and their addiction encoded everything.

290
00:22:21,000 --> 00:22:42,000
Even if it's already fixed length, right, or it only does this for for for strings for very length things. But then it turns out, Parquet does pretty good still because there's still you can convert dictionary coding. We'll see in a second, you're going to allow you to convert data that may be in a really large domain down to a much smaller domain.

291
00:22:42,000 --> 00:22:47,000
And then you can apply additional compression techniques on top of that and you still get a win.

292
00:22:47,000 --> 00:22:53,000
It seems counter to that I would want to compress flow. It says dictionary codes, but we found that actually works.

293
00:22:53,000 --> 00:23:03,000
This doesn't solve the problem of how to handle semi structured data in this world. The dumbest thing you do would be just treat semi structured data as a text field.

294
00:23:03,000 --> 00:23:15,000
All right, and just have the query engine do parse the JSON or whatever it is as it goes along. That's going to be super slow. Again, we'll see how to handle that in a second. Well, we can convert everything to columns.

295
00:23:15,000 --> 00:23:27,000
And then again, and if there's string, string fields in the values of the nested data, the JSON values. Again, we'll just dictionary code that to treat it like a regular column.

296
00:23:28,000 --> 00:23:34,000
So as I said, the most OLAQ queries are never going to access a single column in a table by itself.

297
00:23:34,000 --> 00:23:43,000
It's very rare to say select some average in a single column without any where clause, without any group by, without any sorting, or anything like that.

298
00:23:43,000 --> 00:23:55,000
I'm not saying that single column queries don't exist. I'm saying they're not that common, not as common as multi column queries.

299
00:23:55,000 --> 00:24:08,000
So if we do the decomposition storage model where we're storing single files per column, then I'm going to have to jump through different files if I need to start putting things back together in order to process my query.

300
00:24:08,000 --> 00:24:16,000
My where clause might reference four columns, I got to go jump to those four files at different offsets and go give the data that I need.

301
00:24:17,000 --> 00:24:28,000
So we want a way to get all the benefits we get from having columnar data, either through getting better compression, or also doing vectorized execution.

302
00:24:28,000 --> 00:24:35,000
We still want all that, but we don't want the downsides of having separate files.

303
00:24:35,000 --> 00:24:38,000
So this is what packs is going to solve for us.

304
00:24:39,000 --> 00:24:48,000
So this was invented, actually I think here. So this is the paper is from Natasa Alamaki. She was the database professor before I was.

305
00:24:48,000 --> 00:24:56,000
Before I showed up, she was teaching 721 in 2006. Then she left to go to EPL, and I revised him 21 when I showed up.

306
00:24:56,000 --> 00:25:07,000
But there's a paper she wrote in 2002 that basically recognized that there is this problem if you have a lot of memory, then you don't want to pay this penalty of, sorry, not that they have a lot of memory.

307
00:25:07,000 --> 00:25:12,000
You don't pay this penalty, you have to jump between these different columnar files to put things back together.

308
00:25:12,000 --> 00:25:19,000
If you have enough memory to bring in a big chunk of data, you can still keep things in a columnar format.

309
00:25:19,000 --> 00:25:25,000
But then now the data for a that's related to a single tuple will be close to each other.

310
00:25:25,000 --> 00:25:33,000
So again, we get all the benefit of colonizing our storage, but still maintain the spatial locality of the row store.

311
00:25:34,000 --> 00:25:43,000
So the way this could work is that we have our example table before. So we're going to horizontally partition the table into row groups.

312
00:25:43,000 --> 00:25:52,000
And the size of the row group will vary per implementation, right? For now, it's just assumed that we did some fixed number tuples, like three tuples.

313
00:25:52,000 --> 00:25:58,000
And now within that row group, we're going to have a header, of course, that's going to tell us information about what's in this row group.

314
00:25:58,000 --> 00:26:04,000
But then now we're going to lay out the data for a single column or some attribute sequentially or contiguously.

315
00:26:04,000 --> 00:26:10,000
And then once we're done for all the tuples in that column, then we jump to the next one.

316
00:26:10,000 --> 00:26:14,000
So we're going to call this piece here within the row group. We're going to call this a column chunk.

317
00:26:14,000 --> 00:26:18,000
I think the work paper calls them, or the work system calls them stripes.

318
00:26:18,000 --> 00:26:24,000
Roe groups and column chunks are what's in parquet. What does use that?

319
00:26:24,000 --> 00:26:28,000
And then once we lay everything out for the first row group, then we do the same thing for the other.

320
00:26:28,000 --> 00:26:34,000
And then in the folder, we're going to have metadata that's going to tell us what's in this file. Yes?

321
00:26:34,000 --> 00:26:40,000
So what's the reason that we have multiple row groups instead of having different multiple files?

322
00:26:40,000 --> 00:26:46,000
What's the reason for having different row groups versus having a row group be a single file?

323
00:26:46,000 --> 00:26:56,000
Yes. So you could have a, right, so you could define your parquet or you could say, I want my file to only have one row group.

324
00:26:56,000 --> 00:27:02,000
But then now you basically have a bunch of metadata that's very narrowed just for that one row group.

325
00:27:02,000 --> 00:27:08,000
So the idea here is that if I put a bunch of row groups, the right amount, again, it's probably the empty complete problem.

326
00:27:08,000 --> 00:27:16,000
It's difficult to know. The right amount of row groups to have the right granularity for the scope of the zone map and other metadata maintaining, that's hard to know.

327
00:27:16,000 --> 00:27:22,000
I guess my question is, what's the data that I'm having these multiple within a single file?

328
00:27:22,000 --> 00:27:25,000
In a single file versus having multiple files?

329
00:27:25,000 --> 00:27:32,000
So I could have a zone map in the footer, the metadata, that tells me within my row groups, here's the data that I have.

330
00:27:32,000 --> 00:27:43,000
I could have it for like, you know, for some columns in the date. Here's the min and the max value for all the values in that single column across all the row groups.

331
00:27:43,000 --> 00:27:46,000
So like you have that like bottom metadata inside?

332
00:27:46,000 --> 00:28:01,000
Right, now what I'm saying is that so now like if I want to go, if I'm looking for all the orders from this month and my files have been sort of squentially based on time, now I just go read this and I can figure out, oh, this thing contains all the orders from 2023.

333
00:28:01,000 --> 00:28:12,000
I don't need anything in there, I'm looking for, you know, January 2024. So I can skip it entirely. If I do what you're proposing, then I have to go read this header from every single, you know, from multiple files.

334
00:28:12,000 --> 00:28:14,000
So this is another level of granularity?

335
00:28:14,000 --> 00:28:18,000
To another level granularity. But again, when I'm saying it's like, what's the right size? It depends.

336
00:28:18,000 --> 00:28:24,000
Which is a cop out answer database is beginning to answer a lot of things. It depends on the query, it depends on the data, it depends on what you're trying to do.

337
00:28:24,000 --> 00:28:29,000
So is the row group, what single row group would it be, one, four kilobytes?

338
00:28:29,000 --> 00:28:36,000
Yeah, so his question is, is a row group one, one four kilobytes page? No, it's going to be tens of megabytes.

339
00:28:36,000 --> 00:28:37,000
Okay.

340
00:28:37,000 --> 00:28:50,000
Yeah. Again, it's the same thing he brought up, it's the granularity of this, right? If I'm storing just four kilobytes of data, but I have to have this metadata thing and then like say the metadata is, I don't know, half a kilobytes, or sorry, kilobytes.

341
00:28:50,000 --> 00:28:58,000
Then I can find three kilobytes of data in a row group. And now I'm basically have a bunch of overhead of metadata that I don't actually need.

342
00:28:58,000 --> 00:28:59,000
Yes.

343
00:28:59,000 --> 00:29:12,000
Then when there really is a moment like you want each like strike to be like at least one page, then you pull back home and like get that benefit of not pulling in data that you don't need, if you're just doing like a subset of columns that you're querying over.

344
00:29:12,000 --> 00:29:17,000
So your question is like shouldn't the size of the column group or the size of the row group be a certain size or what?

345
00:29:17,000 --> 00:29:22,000
Like a single strike, like a single column shock should be like at least a page.

346
00:29:22,000 --> 00:29:23,000
At least a page yes.

347
00:29:23,000 --> 00:29:24,000
Yeah.

348
00:29:24,000 --> 00:29:26,000
Yes.

349
00:29:26,000 --> 00:29:31,000
So what does zone map be in the photo of the entire file that I'm using in the metadata of each row of the row?

350
00:29:31,000 --> 00:29:37,000
Well, we'll cover about, I'm going to send a second, but there will be a zone map per row group in this metadata thing.

351
00:29:37,000 --> 00:29:43,000
And then optionally you can have a zone map that covers the columns in the metadata.

352
00:29:43,000 --> 00:29:50,000
This is actually one of the problems of parking or is that like they added this later a bunch of limitations don't actually support it.

353
00:29:50,000 --> 00:29:57,000
So like it's like it's in the specs as there, but it may not actually be there.

354
00:29:57,000 --> 00:29:58,000
Yes.

355
00:29:58,000 --> 00:30:06,000
Are those random or maybe based on the form?

356
00:30:06,000 --> 00:30:09,000
A question is a row group is random? What do you mean like random?

357
00:30:09,000 --> 00:30:11,000
Like are there boundaries?

358
00:30:11,000 --> 00:30:12,000
The boundaries you mean?

359
00:30:12,000 --> 00:30:13,000
Yeah.

360
00:30:13,000 --> 00:30:15,000
We'll cover that in a second.

361
00:30:15,000 --> 00:30:19,000
Like there's a sizing protocol that they have.

362
00:30:19,000 --> 00:30:24,000
For these different formats they'll say like I want my row group to be at least this size or this number of tuples.

363
00:30:24,000 --> 00:30:27,000
And there's tradeouts for them for these choices.

364
00:30:27,000 --> 00:30:28,000
Yes.

365
00:30:28,000 --> 00:30:31,000
Are these actually the same length and cost of the different chunks?

366
00:30:31,000 --> 00:30:34,000
These are the same length that goes to different chunks.

367
00:30:34,000 --> 00:30:35,000
Yes.

368
00:30:35,000 --> 00:30:39,000
Let me think about that.

369
00:30:39,000 --> 00:30:42,000
I think you can actually have different within a row group.

370
00:30:42,000 --> 00:30:45,000
I think you can vary the encoding scheme you're using.

371
00:30:45,000 --> 00:30:47,000
So I think they could be different.

372
00:30:47,000 --> 00:30:50,000
But since I have my metadata what encoding scheme I'm using,

373
00:30:50,000 --> 00:30:54,000
if I say I want two-board offset six, like logical offset six,

374
00:30:54,000 --> 00:30:58,000
and I jump to this row group, I know it's in here,

375
00:30:58,000 --> 00:31:02,000
I use the metadata and then figure, okay, the size of the attributes is,

376
00:31:02,000 --> 00:31:05,000
for this column is this.

377
00:31:05,000 --> 00:31:07,000
Therefore I can do my math to go find that.

378
00:31:07,000 --> 00:31:10,000
So it could be different per row group and certainly different per file.

379
00:31:10,000 --> 00:31:13,000
But again, I just do the same arithmetic that I before.

380
00:31:13,000 --> 00:31:17,000
But in the column group they all be the same size, or the column chunk.

381
00:31:17,000 --> 00:31:22,000
Okay.

382
00:31:22,000 --> 00:31:27,000
And it says, sort of his question is there's a global metadata that can tell me,

383
00:31:27,000 --> 00:31:32,000
like, what's in my file, how things are encoded.

384
00:31:32,000 --> 00:31:35,000
You would think it's essentially the header, right?

385
00:31:35,000 --> 00:31:37,000
Remembering this lot of pages stuff from last semester,

386
00:31:37,000 --> 00:31:40,000
that was literally in the header, the beginning bytes of a page.

387
00:31:40,000 --> 00:31:42,000
The putting this at the bottom.

388
00:31:42,000 --> 00:31:49,000
It might take us a while.

389
00:31:49,000 --> 00:31:51,000
He says the size is not fixed.

390
00:31:51,000 --> 00:31:54,000
The size of what?

391
00:31:54,000 --> 00:31:59,000
The size of the metadata is not fixed.

392
00:31:59,000 --> 00:32:04,000
Again, these files are big, and I don't know what the metadata is going to be,

393
00:32:04,000 --> 00:32:08,000
like what's the minmax value for all the data that I have,

394
00:32:08,000 --> 00:32:11,000
until I process all the data.

395
00:32:11,000 --> 00:32:14,000
And then also, the reason why they're putting it at the end and at the beginning,

396
00:32:14,000 --> 00:32:18,000
because this comes from the Hadoop world, or HDFS world,

397
00:32:18,000 --> 00:32:21,000
from 10 years ago, which is a pen-only file system.

398
00:32:21,000 --> 00:32:25,000
I can't make in place updates to the file without rewriting it.

399
00:32:25,000 --> 00:32:29,000
So if I have my, if I'm bulk loading much of data to generate a parquet and orc file,

400
00:32:29,000 --> 00:32:32,000
I got to scan through all the data, and I'm writing up these row groups incrementally.

401
00:32:32,000 --> 00:32:35,000
And then when I'm done, all right, let me close the file,

402
00:32:35,000 --> 00:32:39,000
the metadata, you can't go back and put it back up here,

403
00:32:39,000 --> 00:32:42,000
because you've already written out the beginning of the file.

404
00:32:42,000 --> 00:32:45,000
S3 is the same thing, right?

405
00:32:45,000 --> 00:32:50,000
You can't do in-place updates, you have to basically rewrite something entirely.

406
00:32:50,000 --> 00:32:54,000
And that would be expensive, because then basically if I wrote a 1D-giby parquet file,

407
00:32:54,000 --> 00:32:59,000
I don't want to go write it back out again just to update the metadata.

408
00:32:59,000 --> 00:33:03,000
So they always put it at the bottom.

409
00:33:03,000 --> 00:33:07,000
The zoom-app stuff actually in the bottom, for parquet here,

410
00:33:07,000 --> 00:33:13,000
again, I think the paper talks about that was added, wow, 2018, 2019.

411
00:33:13,000 --> 00:33:16,000
That was actually my student at Claudero that added that.

412
00:33:16,000 --> 00:33:18,000
She took this class.

413
00:33:18,000 --> 00:33:21,000
Now she's a PhD student at University of Maryland.

414
00:33:21,000 --> 00:33:24,000
So there's some connection there with 721.

415
00:33:24,000 --> 00:33:25,000
Okay.

416
00:33:25,000 --> 00:33:31,000
So up until again 10 years ago, sorry, yes.

417
00:33:31,000 --> 00:33:34,000
So what do you think about the end of the file?

418
00:33:34,000 --> 00:33:37,000
How do you, like, if it is different to the metadata,

419
00:33:37,000 --> 00:33:40,000
what do you think is different?

420
00:33:40,000 --> 00:33:43,000
You just go to the end and file and bring the last couple of pages in the end.

421
00:33:43,000 --> 00:33:48,000
Yes, question is, like, if it's at the end, how do I start processing the file?

422
00:33:48,000 --> 00:33:51,000
Yeah, so the entry point for the file is the footer.

423
00:33:51,000 --> 00:33:57,000
So I think the way it works is that the last 32 bits of the file is the length of the footer.

424
00:33:57,000 --> 00:34:04,000
So you read that and that will tell you how much back you have read to get the complete view of the metadata.

425
00:34:04,000 --> 00:34:05,000
Yes.

426
00:34:05,000 --> 00:34:10,000
You're saying this is a kind of file that's basically similar to a log structure, which is really?

427
00:34:10,000 --> 00:34:12,000
Is there a question that my saying this is like a log structure, a nursery?

428
00:34:12,000 --> 00:34:13,000
No.

429
00:34:13,000 --> 00:34:15,000
Why would I say that?

430
00:34:15,000 --> 00:34:22,000
What we mentioned in context of the new file, the end only, I thought it was.

431
00:34:22,000 --> 00:34:28,000
So a pen only means like in Hadoop, the file isn't only allows for like, like, open a file and there's the pen bytes to it.

432
00:34:28,000 --> 00:34:31,000
So like, but like Hadoop doesn't know which are storing.

433
00:34:31,000 --> 00:34:33,000
It just sees bytes, right?

434
00:34:33,000 --> 00:34:36,000
The, this would not be, like, this is not LSM.

435
00:34:36,000 --> 00:34:41,000
This is literally like, there's one version of a piece of data of Tupel,

436
00:34:41,000 --> 00:34:49,000
and I'm just writing it out sequentially as I go, but I'm going to organize it in this pack format.

437
00:34:49,000 --> 00:34:50,000
Okay.

438
00:34:50,000 --> 00:34:56,000
So prior to 10 years ago, even the early commsure systems, like the Vertica, the Green Flums and so forth,

439
00:34:56,000 --> 00:35:00,000
they were, they had their own proprietary data format.

440
00:35:00,000 --> 00:35:02,000
And then I mentioned this last class.

441
00:35:02,000 --> 00:35:07,000
Like, most data systems you think about, SQL Light, Postgres, MySQL, Oracle and so forth,

442
00:35:07,000 --> 00:35:13,000
like, the, when they put bits down on disk, the format is going to be proprietary to that database system.

443
00:35:13,000 --> 00:35:14,000
Right?

444
00:35:14,000 --> 00:35:16,000
Like, the systems designed to, to read and write that data.

445
00:35:16,000 --> 00:35:19,000
Now, there are some systems like, like, like, DuckDB is really good about this.

446
00:35:19,000 --> 00:35:22,000
They can read SQL Light database files. They can read other data files.

447
00:35:22,000 --> 00:35:24,000
Right? But most systems don't do that.

448
00:35:24,000 --> 00:35:25,000
Right?

449
00:35:25,000 --> 00:35:30,000
And so the problem with this is that since all these different data systems have their own proprietary data format,

450
00:35:30,000 --> 00:35:33,000
you can't share data across different disparate systems.

451
00:35:33,000 --> 00:35:38,000
Like, I can't take a Postgres data directory files and plop it down, I'll let MySQL read it.

452
00:35:38,000 --> 00:35:41,000
Again, DuckDB is trying to be like a Swiss Army knife kind of thing.

453
00:35:41,000 --> 00:35:42,000
We can ignore that.

454
00:35:42,000 --> 00:35:44,000
But that's how, not, not how most systems work.

455
00:35:44,000 --> 00:35:50,000
So that means the only way I could get data out of one system and put it to another system is to write a SQL query,

456
00:35:50,000 --> 00:35:57,000
dump it out, and then convert it to a CSV, TSE, or JSON XML file, some other format,

457
00:35:57,000 --> 00:36:01,000
and then, then do bulk insertion on the, for the other naming system,

458
00:36:01,000 --> 00:36:04,000
to then convert it into, you know, their own proprietary format.

459
00:36:04,000 --> 00:36:09,000
But again, with the, with the Hadoop and the Cloud stuff taking off in early 2010s,

460
00:36:09,000 --> 00:36:13,000
you had now, as I showed in the last class, you had all these operational databases

461
00:36:13,000 --> 00:36:17,000
that want to start writing data out so that you could read it into your data warehouse.

462
00:36:17,000 --> 00:36:18,000
But again, you don't want to do this conversion.

463
00:36:18,000 --> 00:36:24,000
I just want to put things out to my object store and not worry about having to do additional conversions.

464
00:36:24,000 --> 00:36:30,000
So this is where the, the Parkane orcs stuff comes, comes into play because they're, that's the problem they were trying to solve.

465
00:36:30,000 --> 00:36:39,000
They're trying to be a universal file format that, that, you know, one application or some other thing upstream in your applications stack could generate.

466
00:36:39,000 --> 00:36:42,000
And then you wouldn't have to do that conversion to be able to read it.

467
00:36:42,000 --> 00:36:48,000
And you would get all the benefits of a binary encoding scheme that you would want in like a column store or a packs layout

468
00:36:48,000 --> 00:36:51,000
without having to, to, revert it to a text format like this.

469
00:36:51,000 --> 00:36:57,000
Like, see if it's the worst thing you can do because now basically all your binary data gets converted into ASCII characters.

470
00:36:57,000 --> 00:37:00,000
And, and you're going to parse that and deal with that when you load it back in.

471
00:37:00,000 --> 00:37:02,000
Same thing with JSON.

472
00:37:02,000 --> 00:37:07,000
So the idea is that, that you define a spec, here's the file format is,

473
00:37:08,000 --> 00:37:12,000
and then whoever, whatever system wants to be able to read it could either use an off the shelf and the notation of it,

474
00:37:12,000 --> 00:37:17,000
which of, of, they have question or quality, or write the run.

475
00:37:17,000 --> 00:37:20,000
Which again, of question or quality, right?

476
00:37:20,000 --> 00:37:27,000
So the, this is not entirely a new idea, but it actually goes back to the 1990s.

477
00:37:27,000 --> 00:37:32,000
In the high, high performance computing world of the scientific community, there was this thing called HDF5.

478
00:37:33,000 --> 00:37:38,000
That means there was 4, 3, 2, 1, there was previous versions to this, but 5 is the current one I'm still uses.

479
00:37:38,000 --> 00:37:43,000
But this was a binary format to store compressed multimensional arrays.

480
00:37:43,000 --> 00:37:50,000
And then you could have, you know, whatever random 4chan program you had to do processing on, you know, the data from scientific instruments or satellite data,

481
00:37:50,000 --> 00:37:54,000
you could use this universal file format and use it for different experiments.

482
00:37:54,000 --> 00:37:59,000
But this is almost entirely ignored by the database community, right?

483
00:38:00,000 --> 00:38:08,000
So 2009, people recognized that, oh, Hadoop wants to generate a bunch of these files that we want to be used for different purposes.

484
00:38:08,000 --> 00:38:15,000
And so the original version of the data format in Hadoop, which is a thing called sequential sequence files, is literally key value pairs, right?

485
00:38:15,000 --> 00:38:23,000
Like serialized value strings that only the function of the Hadoop code knew how to process like your application code.

486
00:38:23,000 --> 00:38:25,000
So there was no embedded scheme information.

487
00:38:26,000 --> 00:38:32,000
So they replaced this with this thing called Avro, and I think this came out of maybe CloudDero or the Hadoop project.

488
00:38:32,000 --> 00:38:42,000
But if this was still role-oriented, so, you know, even though the commsource systems existed at the time, Hadoop was still writing things out and processing data as rows, which sucked.

489
00:38:42,000 --> 00:38:50,000
So then in, there was another version before Park K called RC file, actually before Ork from Meta.

490
00:38:51,000 --> 00:39:00,000
But then at the same time in 2013, CloudDero and Twitter working on Apollo, they put out Park K, and then Meta put out Ork for Apache Hive.

491
00:39:00,000 --> 00:39:05,000
Hive is basically a SQL engine or SQL query engine on top of Hadoop or Meta produce.

492
00:39:05,000 --> 00:39:07,000
So it converts your SQL queries to Meta produce jobs.

493
00:39:07,000 --> 00:39:10,000
It's still around today, but you don't want to use it.

494
00:39:10,000 --> 00:39:16,000
So, again, Park K and Ork is the dominant ones, but at this point they're over 10 years old.

495
00:39:16,000 --> 00:39:18,000
And they're still widely used today.

496
00:39:18,000 --> 00:39:21,000
Carbon data is an extension of Park K from Hwale.

497
00:39:21,000 --> 00:39:26,000
It adds additional metadata for keeping track of schema versions and so forth.

498
00:39:26,000 --> 00:39:29,000
I don't know anybody who uses this other than Hwale.

499
00:39:29,000 --> 00:39:32,000
The open source version that we tried doesn't work, it doesn't compile.

500
00:39:32,000 --> 00:39:35,000
But somebody's still working on it.

501
00:39:35,000 --> 00:39:38,000
And then Arrow, again, I mentioned this before, this is going to be an in-memory.

502
00:39:38,000 --> 00:39:41,000
So, thinking this is like, I'm just in-memory version of Park K.

503
00:39:41,000 --> 00:39:47,000
And it's going to allow me to do change data between different processes over the network or in memory on the memory.

504
00:39:47,000 --> 00:39:49,000
On the same box.

505
00:39:49,000 --> 00:39:53,000
And this came out of Dremio and from the Panersky.

506
00:39:53,000 --> 00:39:57,000
So, again, for this class, we're only going to focus on these two.

507
00:39:57,000 --> 00:39:59,000
And then there's a bunch of other ones I think mentioned the paper.

508
00:39:59,000 --> 00:40:04,000
There's an extension or newer version of Ork called Dwarf from Facebook.

509
00:40:04,000 --> 00:40:07,000
And then there's this thing called Alpha that we've been talking about.

510
00:40:07,000 --> 00:40:09,000
It's sort of the next generation one.

511
00:40:09,000 --> 00:40:10,000
We can ignore all that.

512
00:40:10,000 --> 00:40:12,000
We want to focus on Park K and Ork.

513
00:40:12,000 --> 00:40:15,000
That's what pretty much everyone's using today.

514
00:40:15,000 --> 00:40:18,000
And it's not to say that these formats are the best.

515
00:40:18,000 --> 00:40:20,000
And this is what every system should be using.

516
00:40:20,000 --> 00:40:23,000
It's just what's commonly being used.

517
00:40:23,000 --> 00:40:25,000
Like, is SQL the best query language?

518
00:40:25,000 --> 00:40:27,000
No. It has problems.

519
00:40:27,000 --> 00:40:29,000
But is it widely used? And therefore, it's not going away?

520
00:40:29,000 --> 00:40:30,000
Yes. So, same thing.

521
00:40:30,000 --> 00:40:31,000
Park K and Ork are widely used.

522
00:40:31,000 --> 00:40:33,000
We have to be able to handle them.

523
00:40:33,000 --> 00:40:40,000
Like, on Hugging Face, you can get native data directly out in a Park K format directly.

524
00:40:40,000 --> 00:40:47,000
So, the thing we're talking about is when we design a file format is what metadata we want to maintain.

525
00:40:47,000 --> 00:40:49,000
The layout of the data.

526
00:40:49,000 --> 00:40:56,000
With TySystem, we're going to support the encoding teams or the compression schemes we would use for the data itself.

527
00:40:56,000 --> 00:40:59,000
And then block compression is sort of the after I've done the encoding,

528
00:40:59,000 --> 00:41:02,000
can I run like GZip or something on the compress it?

529
00:41:02,000 --> 00:41:05,000
Talk about filters and then we'll finish off talking about the nested data.

530
00:41:05,000 --> 00:41:09,000
So, the paper I had you guys read, again, this is something that I wrote with my former student,

531
00:41:09,000 --> 00:41:13,000
my former student, P.C. student here, who's at Shinhua, and his P.C. student.

532
00:41:13,000 --> 00:41:18,000
And then the guy that I met at Python Pandas, who was at Voltron,

533
00:41:18,000 --> 00:41:23,000
he and I've been talking about, hey, Park K has some problems because he worked on the inventor of Arrow.

534
00:41:23,000 --> 00:41:28,000
He worked on some Park K stuff too and realized that we wanted to investigate why

535
00:41:28,000 --> 00:41:33,000
what are the problems in the modern environment for these two, the most popular storage formats.

536
00:41:33,000 --> 00:41:39,000
At the same time, Microsoft was actually doing the same evaluation, same experiments that we were.

537
00:41:39,000 --> 00:41:44,000
Their paper came out, I think, in October, in ours came out like November.

538
00:41:44,000 --> 00:41:47,000
So, like, we dodged a bullet.

539
00:41:47,000 --> 00:41:51,000
They approached the problem differently and did different kind of evaluation.

540
00:41:51,000 --> 00:41:52,000
So, they're complimentary.

541
00:41:52,000 --> 00:41:58,000
I'll talk a little about them, but the main take away I got from them is their findings corroborate what we found in ours.

542
00:41:58,000 --> 00:42:02,000
So, I felt good as a scientist that had worked out.

543
00:42:02,000 --> 00:42:08,000
All right, so the first thing is when, and the meditated, what meditated we want to put in the file.

544
00:42:08,000 --> 00:42:11,000
So, I already mentioned the ZOMAP stuff.

545
00:42:11,000 --> 00:42:18,000
But the basic ideas for Park K network, these are meant to be self-describing or self-contained file formats.

546
00:42:18,000 --> 00:42:26,000
Meaning, everything I need to know to interpret what the bytes mean in my file are being contained in the file itself.

547
00:42:27,000 --> 00:42:33,000
And this is a post you're like thinking like in a, a system like bus tub or Postgres or my SQL,

548
00:42:33,000 --> 00:42:39,000
you have a bunch of files that keep track of like the catalog, the blocks in the catalog keeps track of the scheme of the tables,

549
00:42:39,000 --> 00:42:40,000
what the types are and so forth.

550
00:42:40,000 --> 00:42:42,000
And then you have pages for the actual data.

551
00:42:42,000 --> 00:42:49,000
So, in order for me to understand what's in my data pages, I got to go read the pages for the catalog.

552
00:42:49,000 --> 00:42:53,000
Oracle is the only system that actually packs everything within the page itself for like disaster recovery.

553
00:42:53,000 --> 00:42:58,000
So, that way if your Oracle game gets destroyed, your disk gets destroyed, and you can recover some pages,

554
00:42:58,000 --> 00:43:03,000
you can still interpret those bytes because everything you need to know what are in those bytes, what those bytes mean,

555
00:43:03,000 --> 00:43:05,000
are actually in the page itself.

556
00:43:05,000 --> 00:43:07,000
And then there's other limitations in Oracle.

557
00:43:07,000 --> 00:43:09,000
Like you can only have a thousand columns in Oracle.

558
00:43:09,000 --> 00:43:14,000
Not just because they want to be self-contained, there's other reasons why they have that problem.

559
00:43:14,000 --> 00:43:19,000
But again, the bottom line is everything we need to know within the file is in the file itself.

560
00:43:19,000 --> 00:43:23,000
We don't need to go read some external catalog or external data.

561
00:43:23,000 --> 00:43:31,000
And so we'll keep track of the table schema, and the way they're going to do this is to basically serialize,

562
00:43:31,000 --> 00:43:37,000
here's my columns, there are this type and this size and so forth, and additional annotations about them.

563
00:43:37,000 --> 00:43:41,000
And then within the row gives us a keep track of how it's being coded.

564
00:43:41,000 --> 00:43:46,000
So that when I read the file, I know how to then process this bytes and put it back to its original form.

565
00:43:47,000 --> 00:43:49,000
Does everybody here use thrift or protobuff?

566
00:43:49,000 --> 00:43:51,000
One, few.

567
00:43:51,000 --> 00:43:55,000
But protobuff is from Google, thrift is from meta, sorry.

568
00:43:55,000 --> 00:44:03,000
Basically again, you define like a schema, almost like a great table statement, you define like, here's my columns,

569
00:44:03,000 --> 00:44:14,000
here's other types and so forth, their names, and then they have a way to then generate a binary encoding for what that schema actually is.

570
00:44:15,000 --> 00:44:21,000
And so they basically just piggyback off of this, serialize the bytes and then embed that in the file and metadata.

571
00:44:21,000 --> 00:44:30,000
The big problem is going to be though, if I have a really wide table and say I only want to learn about two or three columns out of a thousand columns,

572
00:44:30,000 --> 00:44:37,000
I have to destabilize the entire protobuff for the thrift message to convert that.

573
00:44:37,000 --> 00:44:40,000
So that's going to be a big problem for these file formats as well.

574
00:44:40,000 --> 00:44:52,000
There's newer versions of like, there's better versions like flatbuff, flatbuff or some Google, there's other, there's better versions of these things, but at the time this is what existed and the file formats carry that legacy.

575
00:44:52,000 --> 00:44:59,000
The real group all sets and length, we talked about this, again, this is going to give us a direct view of how to jump in the file to find the beginning of each row group.

576
00:44:59,000 --> 00:45:05,000
And then there'll be some basic metadata like the number of two balls that I have in each row group with the zone maps are potentially.

577
00:45:06,000 --> 00:45:12,000
And that can use this information to determine whether I need to even read the rest of the file.

578
00:45:12,000 --> 00:45:22,000
So the formats are what we've mostly already talked about, we're going to use packs for this and then we're going to split it up based on two row groups that will contain one of our column chunks.

579
00:45:22,000 --> 00:45:26,000
And the question has come up is how, what size of the row group we should use.

580
00:45:27,000 --> 00:45:33,000
And in the case of parquet, they're going to use just on the number of two balls that you actually have.

581
00:45:33,000 --> 00:45:39,000
And you can change that, you can specify as you're creating the file, the guy on what my row group would be a million two balls or 10 million two balls for so forth.

582
00:45:39,000 --> 00:45:43,000
But it's always based on the number of two balls.

583
00:45:43,000 --> 00:45:48,000
Ork takes a different approach and they specify it based on the size of the data.

584
00:45:48,000 --> 00:45:52,000
So the default I think is 250 megs.

585
00:45:53,000 --> 00:45:57,000
So what are some pros and cons about these? We already talked a little bit about this.

586
00:45:57,000 --> 00:46:01,000
The two balls are massive parquet and then you have the massive file.

587
00:46:01,000 --> 00:46:07,000
Yes, the two balls are massive or like if I have a lot of attributes, right, ignore like storing wops.

588
00:46:07,000 --> 00:46:15,000
If I had just say, I have a 10,000 columns, then a million two balls with times 10,000 columns is going to be pretty big row group.

589
00:46:15,000 --> 00:46:20,000
So what happens in that case? Why is that bad?

590
00:46:21,000 --> 00:46:29,000
At no point, sorry, his statement is, well, even fit in your storage.

591
00:46:29,000 --> 00:46:33,000
At no point this semester should we ever say, are we going to run out of disk?

592
00:46:33,000 --> 00:46:36,000
I mean, S3 for our purposes is infinite.

593
00:46:36,000 --> 00:46:42,000
Like, long as your credit card keeps, you know, as long as Amazon keeps charging your credit card, you're never going to run out of storage.

594
00:46:42,000 --> 00:46:49,000
And then you're at the point where like they start running out of storage, they will call you and be like, hey, who are you, what are you doing?

595
00:46:49,000 --> 00:46:52,000
Storage and infinite for us, yes.

596
00:46:52,000 --> 00:46:55,000
Could it be the data split across multiple pages?

597
00:46:55,000 --> 00:46:59,000
They could be split across multiple pages. That's assumed, right?

598
00:46:59,000 --> 00:47:02,000
Like page size of four kilobytes in hardware, but that's assumed.

599
00:47:02,000 --> 00:47:04,000
Your zone map, you know less helpful?

600
00:47:04,000 --> 00:47:06,000
He says your zone map is a couple of less helpful. Yes, that's one. Yes.

601
00:47:06,000 --> 00:47:16,000
Like again, the granularity of the scope of the zone map is so large that like anything, like anything I look in there, be like, oh yeah, your value range for this number is zero to an infinity.

602
00:47:16,000 --> 00:47:19,000
Great, like that's useless.

603
00:47:19,000 --> 00:47:23,000
Missing a key thing, one more.

604
00:47:23,000 --> 00:47:26,000
I have to bring in the entire row group, right?

605
00:47:26,000 --> 00:47:34,000
So if I have a massive row group, then I'm just going to have this choosing a memory that I've got to bring in in order to start processing and understand what's going on.

606
00:47:34,000 --> 00:47:35,000
Right?

607
00:47:36,000 --> 00:47:43,000
The benefit though is that I can size this in such a way that I'm guaranteed to, or at least I can maximize my chances to do vectorized processing.

608
00:47:43,000 --> 00:47:53,000
That like, I'm always going to have enough data to put in my simd lanes or scan across multiple threads process and paralyze it.

609
00:47:53,000 --> 00:47:54,000
Yes.

610
00:47:54,000 --> 00:47:57,000
What are you pulling from S3? What should you be pulling from S3?

611
00:47:57,000 --> 00:48:00,000
Is David as if you're pulling from S3, would you be pulling entire part K5? No.

612
00:48:00,000 --> 00:48:03,000
So like again, in S3, you can do bite offsets and lengths.

613
00:48:03,000 --> 00:48:08,000
So I get to the header, sorry, get the footer, get the metadata, I know what row groups I have.

614
00:48:08,000 --> 00:48:15,000
And then if my zone maps are selective enough, I can then say, oh, I don't need this row group and this row group, then these will get the bite ranges that I need.

615
00:48:15,000 --> 00:48:27,000
When would you not have enough values?

616
00:48:27,000 --> 00:48:30,000
It's a question, when would you not have enough data put your simd lanes?

617
00:48:30,000 --> 00:48:39,000
So again, say if I have a really wide tuple with a lot of attributes, then I'm only going to have, this is an extreme example.

618
00:48:39,000 --> 00:48:44,000
I'm going to have four tuples in my row group because it's just so huge.

619
00:48:44,000 --> 00:48:55,000
Now, maybe simd lanes, maybe two fine graded layer, but if I'm processing this multiple threads, I don't think again, I'm jumping ahead to what we're talking about in the semester.

620
00:48:55,000 --> 00:49:02,000
But like, don't think in the bus tub world where one thread is running this one operator, it's one page from memory, and then does whatever one's on it.

621
00:49:02,000 --> 00:49:21,000
Think of like, I'm going to have some other piece of the system, the I always schedule or what everyone call it, I need this file, you go get the blocks in, and then maybe some coordinator figures like, okay, yeah, we do want to process this and oh, yeah, it is, it's half a gig, so this thread process is the first half, so the other thread process is the second half.

622
00:49:21,000 --> 00:49:24,000
So I want to have enough work for everyone to do.

623
00:49:24,000 --> 00:49:31,000
Yes. The decision of like, what are the use like number two, which is the score time, is the efficiency is pretty good, the size of the two pools?

624
00:49:31,000 --> 00:49:40,000
Yes. Like, if people are like, like, hybrid systems, you choose which one you use based off of, what the end you're playing in your specific file.

625
00:49:40,000 --> 00:49:50,000
So this question is, like, again, the cop-on answer in the end is it depends, so clearly it depends on, sometimes this is good, and then this is good, is anybody trying to do a hybrid solution, we support both.

626
00:49:50,000 --> 00:49:54,000
But that's going to be another theme we'll see as we go along, although we're short in time.

627
00:49:54,000 --> 00:50:06,000
The increasing the complexity of the file format means that when you're actually processing two pools, then you have to like, you have branched with predictions, because now you're different code bats, you mean you consider.

628
00:50:06,000 --> 00:50:12,000
Plus, there's the engineering complexity, now to support both. So, parquet does this or does that?

629
00:50:12,000 --> 00:50:26,000
You see, there's other things too, like, in bringing like, for like a transactional system, should you flush the log buffer when you've written so many transactions, or when the log files are certain size, or when you've run for a certain amount of time?

630
00:50:26,000 --> 00:50:34,000
Yeah, there's pros and cons of all these different choices, but from the engineering perspective, it's just each of your pick one. Or should I use two-based locking or OCC?

631
00:50:34,000 --> 00:50:41,000
Yeah, there's times you want one versus the other, but everyone does just one. It's so hard to build the whole system, why add additional complexity?

632
00:50:41,000 --> 00:50:42,000
Yes.

633
00:50:52,000 --> 00:50:57,000
This question is why is not having being able to put a rogue group entirely memory of that idea?

634
00:50:57,000 --> 00:51:05,000
So, I got to go fetch it from somewhere. I bring it to the node that's going to process it. I don't have enough memory for it. Where does it got to go?

635
00:51:05,000 --> 00:51:07,000
To disk.

636
00:51:07,000 --> 00:51:21,000
Yes, David. Could you break up the rogue group and execute it incrementally? Yes. Then it's another request that we get more data as they need.

637
00:51:21,000 --> 00:51:40,000
This is just a diagram from data bricks showing sort of a tutorial what Park A looks like. You can sort of see in all things we talked about here, there's the footer, there's these rogue groups that are numbered, and then within them you have a column chunk.

638
00:51:40,000 --> 00:51:59,000
In the column chunk, you would have additional page metadata for the encoder bags and so forth. The exact distinction of how we're going to lay out those internal parts versus Park A and Orc, I don't care that much about, but again, the idea is that there's this hierarchal nature to the file, and we can store additional metadata as we go along.

639
00:51:59,000 --> 00:52:05,000
And the right size of each part, again, depends on a bunch of things.

640
00:52:05,000 --> 00:52:17,000
We're at CMU and they love type systems in the PL group, so we have to worry about a little bit. So, type systems is going to define in our file format, and you're shaking your head, yes.

641
00:52:17,000 --> 00:52:25,000
The type systems is going to define how we actually can store types themselves and what are the bytes going to look like.

642
00:52:25,000 --> 00:52:42,000
So, there's the physical type, and that's the lowest level representation you'd have for a given value, and for this we're not going to think special, we're for the most part for integers and floating point numbers, we're going to use the IEEE 734 standard, and that specifies what how hardware should represent the data.

643
00:52:42,000 --> 00:52:50,000
You can think of like a regular integer in 32 on C++, that's 74 standard, that's what I get, because that's the hardware given.

644
00:52:50,000 --> 00:52:57,000
So, we're talking about strings in a few more lectures, again, there's some tricks we can do to speed that up.

645
00:52:57,000 --> 00:53:04,000
And then the logical types will be built on top of the physical types, and it's basically going to find how we would map some logical type to a physical type.

646
00:53:04,000 --> 00:53:14,000
So, for example, if I want to store timestamps, what is a timestamp? It's just the number of seconds or milliseconds, or nanoseconds, from some starting point, well, that's just a number.

647
00:53:14,000 --> 00:53:24,000
So, I can just store that as a physical type as an int64, and then I have a notion of a logical type that says how to parse the bits within that physical type.

648
00:53:24,000 --> 00:53:38,000
So, a parking org have different complexity to their type system, and then that determines how much work you have to do upstream is the thing actually generating data for these file formats or actually consuming it, how much you're working up to do to interpret the contents.

649
00:53:38,000 --> 00:53:53,000
So, in parkay, they have the bare minimum of types. They only have int32, int64, int64, and int64, and then the set of 50 or standard, and then the byte arrays, and then the only have strings, because you would interpret that as a byte array.

650
00:53:53,000 --> 00:54:04,000
So, it's interesting, they don't store, you know, an 8-bit int or 16-bit int. So, if you declare I want an 8-bit int or 16-bit int, they're still going to store it as a 32-bit int.

651
00:54:04,000 --> 00:54:10,000
And the reason is that, okay, well, yeah, there's a bunch of zeros in my bits that I'm not using, well, a lot of this compress out.

652
00:54:10,000 --> 00:54:19,000
And that reduces the complexity of what they have to support. Or, because much larger, they have all these various types.

653
00:54:19,000 --> 00:54:28,000
Some of these are logical, some of these are physical, they don't really make a distinction, but you can find way more things than you can with in parkay.

654
00:54:29,000 --> 00:54:34,000
I'm not saying one is bad versus the other, this is how they chose the implement things.

655
00:54:35,000 --> 00:54:40,000
All right, so now the encoding team is going to specify, for a given physical or logical type, yes.

656
00:54:40,000 --> 00:54:44,000
Why isn't org better, because if you have more types, you can do different coding for longer.

657
00:54:44,000 --> 00:54:48,000
So, I should, why isn't org better, because if you have more types, you can do more things encoding them.

658
00:54:48,000 --> 00:54:54,000
So, the parkay will say you just represent those logical types, and you extend the file from that way.

659
00:54:55,000 --> 00:54:59,000
I've never taken a type system class, this is my understanding.

660
00:55:01,000 --> 00:55:06,000
All right, so again, the coding scheme is going to specify for the physical or logical types, the actual bits themselves.

661
00:55:06,000 --> 00:55:14,000
How, you know, how can we actually store them for contiguous or related tuples within our column chunk.

662
00:55:14,000 --> 00:55:18,000
And the paper talks about a bunch of different schemes that we've covered in the intro class.

663
00:55:18,000 --> 00:55:21,000
I don't think I mentioned Framer reference in the intro class.

664
00:55:22,000 --> 00:55:30,000
It's basically like Delta encoding, but instead of having, like in Delta encoding, it's like what's the difference between the value before you.

665
00:55:30,000 --> 00:55:40,000
You pick some starting point, like maybe the min value of a column chunk, and then now you're just storing the delta from that global value.

666
00:55:40,000 --> 00:55:46,000
It's sort of variant of Delta encoding.

667
00:55:47,000 --> 00:55:54,000
And then there's partial frame of reference coding, which I think the paper mentions P4, that's basically for any outliers that would wreck your encoding scheme.

668
00:55:54,000 --> 00:55:57,000
They have a way to handle those separately, but we can ignore that.

669
00:55:57,000 --> 00:56:03,000
The one I spent time talking about is actually dictionary encoding, because one, this is the most common coding scheme that most data systems support.

670
00:56:03,000 --> 00:56:07,000
This is where you get most of the win for getting compression.

671
00:56:07,000 --> 00:56:15,000
And you know, for these, the different schemes here vary not in how they implemented, but more like when it's triggered.

672
00:56:15,000 --> 00:56:23,000
Like in ORC, they're very aggressive using RLE, like if they see three or more particular values, then RLE kicks in.

673
00:56:23,000 --> 00:56:28,000
If you're in parquet, it has to be eight or more, and you can't change that.

674
00:56:28,000 --> 00:56:39,000
And so, you know, probably dictionary encoding, because you can then take the results of the dictionary encoding, the compressed column, and then apply all these other things on top of it, and get it compressed even more.

675
00:56:39,000 --> 00:56:53,000
But dictionary encoding, again, this is the same thing with interclass, the basic idea is that we're going to replace values that occur often in our column with some smaller fixed length dictionary code from a smaller domain.

676
00:56:53,000 --> 00:57:00,000
And then we use that at runtime to figure out, okay, if I see this dictionary code in this column, I can do reference the dictionary to figure out what the actual value should be.

677
00:57:00,000 --> 00:57:09,000
Again, this is how we convert variable length strings, variable length data into fixed length values that we can store in our columns.

678
00:57:09,000 --> 00:57:20,000
It means the meta data is going to be now arbitrary length, because all the strings that were variable length in our column are now being stored in the dictionary, which is stored in the header of the row group.

679
00:57:20,000 --> 00:57:38,000
So, the code dictionary code could either be positions within the dictionary, and therefore you have to maintain a hash table to figure out how to find that position in the dictionary, or if you do offsets within the dictionary, assuming it's like everything is because it's getting those bytes.

680
00:57:38,000 --> 00:57:44,000
We can also, also, sort the values in the dictionary, and that'll help us get some additional benefits for compression in some cases.

681
00:57:44,000 --> 00:57:52,000
And then we can further compress the dictionary or encode in columns to reduce the name further, and use RLE and other techniques.

682
00:57:52,000 --> 00:58:01,000
So, in the different formats, they handle the case when the dictionary becomes too large, because there's too many unique values, and therefore I'm losing all the benefit of dictionary coding.

683
00:58:01,000 --> 00:58:15,000
Like, if I have my column is just monitoring increasing values from one to a billion, then it's kind of stupid to store dictionary code for a billion two-poles that are all unique, because I'm going to have a billion dictionary codes.

684
00:58:15,000 --> 00:58:23,000
So, now I have the original column that's dictionary coded with a billion unique values, and I'm storing the billion unique values in the dictionary, so I'm double the size of it.

685
00:58:23,000 --> 00:58:28,000
So, they have various techniques that figure out, okay, this is not working out, I don't want to do dictionary encoding.

686
00:58:28,000 --> 00:58:39,000
So, in case of par k, if the dictionary gets lower to the one megabyte, then they just stop, and then everything comes out, comes after that point, it's just stored as regular the plain encoding, the original values.

687
00:58:39,000 --> 00:58:51,000
In the case of ORC, they compute the number distinct values ahead of time, but basically they have a look ahead buffer where they can say, let me look at the, when I'm starting to write out chunk of data, let me go look ahead like 512 values,

688
00:58:51,000 --> 00:59:00,000
or 500 values, go figure out whether there's enough distinct values, and I think the rest of the data is going to look like that, and doesn't make sense to do dictionary coding or not.

689
00:59:00,000 --> 00:59:09,000
If they get it wrong, then they do the same thing as par k, they basically stop encoding, and just store data in this native format.

690
00:59:09,000 --> 00:59:20,000
So, here's a really simple example, I have some column with a bunch of strings in it. If I'm doing an un-sworded dictionary, then the values of the strings, then I'm trying to compress,

691
00:59:20,000 --> 00:59:40,000
and the order that they appear as I'm scanning through the column. I can either store the position in the dictionary, again, so the first one here was William, so at offset 1, then I would find the actual string that I wanted.

692
00:59:40,000 --> 00:59:54,000
Or I can store this as an offset, so if I take the treatises as bytes, so I know that if I look at my dictionary, I'd need to jump to the seventh byte, and that's going to tell me where the starting point for my entry will be.

693
00:59:54,000 --> 00:59:57,000
And I don't need to maintain a hash table.

694
00:59:57,000 --> 00:59:58,000
Yes.

695
00:59:58,000 --> 01:00:03,000
Any other questions? What are the advantages of this advantage? Hash table.

696
01:00:03,000 --> 01:00:11,000
So, we'll see Arrow later on. Arrow does it this way, because then you don't have to serialize the hash table, you pre-sort everything, and then jump into it more easily.

697
01:00:11,000 --> 01:00:18,000
I was thinking if you just had a look at the right, that's an offset of the right, as it's indexed index, or not, but the more it's a variable one.

698
01:00:19,000 --> 01:00:35,000
Any of us sort of dictionary? Again, you get all the dictionary bags ahead of time, and then you sort them, and then you, again, it's just like before you have position into the dictionary or an offset, the byte offset.

699
01:00:35,000 --> 01:00:46,000
But you can kind of see now, here in this example here, I have Andy repeated a bunch of times, well one is now I've heard things to integers in my dictionary encodes,

700
01:00:47,000 --> 01:01:08,000
but now I have repeated values. So then I can take this and say, oh, I have four twos in a row, let me compress that with RLE, or I can do, you know, delta encoding or sort of frame reference, where now I just say, okay, these are all integers, they're all in a small domain, because I only have four different unique values in my dictionary, and I can then compress these things.

701
01:01:08,000 --> 01:01:09,000
Yes.

702
01:01:09,000 --> 01:01:25,000
When we talked about doing a single column, we talked about the number of distinct values, extremely high, very very strange, to indirect something.

703
01:01:26,000 --> 01:01:42,000
Yes, question is, okay, so if I recognize that I have a bunch of random strings, and I can't do dictionary encoding, but now I have a bunch of very long data, how do I handle that? You have auxiliary data, and then now you're just throwing the offsets into that blob.

704
01:01:43,000 --> 01:01:57,000
Okay, so a couple of design decisions we have to make is what data we actually want to compress with dictionary encoding? I mean, we're running short on time, sorry, you know, it's all I'm going to get to, sorry.

705
01:01:58,000 --> 01:02:05,000
So, as I said before, parquet, they compress everything. Flows, integers, strings, dates, they have again small number of pinnets types, they compress all that.

706
01:02:05,000 --> 01:02:26,000
In ORC, they only compress strings. And this seems like common sense, because most of the variability you can see, the randomness you would see in values are going to be mostly, sorry, the repeated values will be in strings, not in integers and floats.

707
01:02:27,000 --> 01:02:32,000
But when we did our analysis, it actually turned out to be the work way, sorry, the parquet way is better.

708
01:02:33,000 --> 01:02:41,000
Next question is, what do you do, can you compress the encoded data? So parquet is pretty simplistic, they'll just do RLE and bitpacking.

709
01:02:41,000 --> 01:02:53,000
Again, bitpacking is just saying, oh, I recognize that my dictionary codes are 33-bit integers, but my values are within 0 to 20, so I can use 8-bit integers for that, or even some smaller amount.

710
01:02:53,000 --> 01:03:02,000
And now my comm gets compressed even further. And then I've repeated values, I can do RLE on that. But again, they only kick RLE, only kicks in if you have 8 or more values.

711
01:03:02,000 --> 01:03:18,000
In ORC, they have a bunch of different things you could do, RLE, delta encoding, bitpacking, frame of reference. And they basically have a greedy algorithm, they look ahead and the buffer, they're trying to figure out what the data looks like, run some heuristics to figure out which of these approaches is the best.

712
01:03:19,000 --> 01:03:27,000
It always tries to use RLE first, and then if you can't, then it drives delta, and then if you can't do that, it uses either bitpacking or frame of reference.

713
01:03:27,000 --> 01:03:40,000
And then another design station is the dictionary that's being generated for this encoded values, do you expose that to the outside of the file format, or the library that's processing the file?

714
01:03:41,000 --> 01:03:43,000
Let me take us why you'd want to do that.

715
01:03:48,000 --> 01:04:04,000
So we'll go back here. So say I want to look up, find all the, my query is, my query is, select count from the table, where name equals Andy.

716
01:04:05,000 --> 01:04:14,000
So if I can then look at the dictionary, I can, it's almost like a ZOMA, I can see whether it's any, is even there or not.

717
01:04:14,000 --> 01:04:18,000
Or, select more.

718
01:04:18,000 --> 01:04:20,000
What's that?

719
01:04:21,000 --> 01:04:24,000
Is this a query?

720
01:04:24,000 --> 01:04:29,000
It seems to be a range dictionary, it's a range query, maybe I'll say, is there any sort of dictionary.

721
01:04:29,000 --> 01:04:36,000
Yeah, you want to count all the, count all the unique values within a given range, I can do that by looking at the dictionary.

722
01:04:36,000 --> 01:04:38,000
That's another example.

723
01:04:38,000 --> 01:04:41,000
So, parking or do not do this.

724
01:04:41,000 --> 01:04:52,000
So in the library implementations, when you say, scan some column, you basically get an iterator through their library, and that's going to give you back the columns that you asked for in their original form.

725
01:04:52,000 --> 01:04:58,000
So on the cover is the library is doing all the decoding, depressing for you.

726
01:04:58,000 --> 01:05:09,000
So again, that means that you can't really push down predicates all the way down to the lowest level of looking at the file itself, you do have to do whatever, whatever the library spits out back to you.

727
01:05:10,000 --> 01:05:12,000
So this is, in recognize, it's a problem.

728
01:05:12,000 --> 01:05:17,000
So there's a paper we're not going to cover from Google called, for a system called Prasella.

729
01:05:17,000 --> 01:05:27,000
This was developed at, in house, for YouTube to process, do analytics, but also serving data online manner, which we don't want to care about right now.

730
01:05:27,000 --> 01:05:34,000
But there's this little blurb here, they developed their own file system, or so file format, instead of using OrkapparK called Artis.

731
01:05:34,000 --> 01:05:44,000
And one advantage they talk about in Artis is that, oh, they actually expose the dictionary to the query engine, so that you can do the predicate push down that you want to do.

732
01:05:44,000 --> 01:05:55,000
So this is something I said meant before. This is a known problem, Parkane, Ork, and then the newer stuff that people are looking at, once the solve the problems that expose to you what the dictionary is.

733
01:05:55,000 --> 01:06:06,000
Because then now you can do, you know, you can do evaluation directly in compressed data by compressing your predicate, and then comparing your predicate versus the compressed data rather than decompressing everything first.

734
01:06:08,000 --> 01:06:16,000
All right, next thing is do block compression, and this is basically taking off the shelf, naive, general purpose, compression algorithm,

735
01:06:16,000 --> 01:06:27,000
that just take the blocks, the row groups, and just run that and compress it. And the paper talks about, Parkane, Ork, I mean the default is snappy.

736
01:06:27,000 --> 01:06:36,000
The best compression algorithm you want to use right now is actually Z standard from Facebook. There's a newer version that's not out yet, it's called something different.

737
01:06:36,000 --> 01:06:46,000
That supposedly is better, but Parkane Ork can make come with snappy because that was the thing back in the day, when those fault parts are invented.

738
01:06:46,000 --> 01:07:02,000
So there's this, you know, the things that consider whether you actually want to do this or not is whether you, you know, you're willing to pay the computational overhead of compress, or is that decompression of the data, the blocks when it comes back, even though it's already been encoded with one addiction and coding other schemes.

739
01:07:02,000 --> 01:07:10,000
And you can still get some compression benefits, but now it's going to make processing the data much slower because you have to do this extra step to decompress it.

740
01:07:10,000 --> 01:07:19,000
Because these are opaque compression schemes, meaning if I run something through snappy or Z standard, the bytes come out, the data system doesn't know what those bytes mean.

741
01:07:19,000 --> 01:07:25,000
And I can't jump to arbitrary offsets with them and to go find data I'm looking for, I got to decompress the whole block.

742
01:07:25,000 --> 01:07:33,000
Again, this made sense in 2013, 2012, when these fault formats were designed because disk was slow, network slow.

743
01:07:33,000 --> 01:07:45,000
So if I can reduce the amount of data at the go read, you know, from some local source, and then bring it to my memory, then I'm willing to pay that CPU cost.

744
01:07:45,000 --> 01:07:51,000
But things have changed a lot now. The CPU is actually one of the slower things.

745
01:07:51,000 --> 01:07:56,000
So this actually doesn't make sense anymore.

746
01:07:56,000 --> 01:08:04,000
So the additional metadata we can keep track of are the filters. So the only two types of filters that they would have are zone maps and blue filters.

747
01:08:04,000 --> 01:08:13,000
Again, I remember, even though the paper calls it a page index, what's the difference between that index and a filter?

748
01:08:13,000 --> 01:08:20,000
Index tells you where something is and what if it exists, a filter tells you something could exist or does exist. Doesn't tell you where it is though.

749
01:08:20,000 --> 01:08:29,000
So zone maps can say here's my minimax values, I'm trying to find something within the given range. If it's in that minimax range, then it exists, but I don't know where it is.

750
01:08:29,000 --> 01:08:37,000
I got to go to a central scan to find it. Whereas a B plus G would say, hey, you're at this offset, right? And we don't care about.

751
01:08:37,000 --> 01:08:48,000
So we're ready to write zone maps. And again, my default parking or going to store in the zone maps in the header, each group, you can store it in the file level, but I don't think that's on my default.

752
01:08:48,000 --> 01:08:57,000
And then for blue filters within each row group, they can keep track of whether a value could exist for a given column.

753
01:08:57,000 --> 01:09:06,000
Again, a blue filter is a probabilistic data structure. It can tell you definitely that something does not exist, but it can tell you what to tell you that something may exist.

754
01:09:06,000 --> 01:09:10,000
You can get false positives, but not false negatives. Yes.

755
01:09:10,000 --> 01:09:13,000
Why does it matter whether the value is a cluster for a blue filter?

756
01:09:13,000 --> 01:09:24,000
So why does it matter whether values are closer for a blue filter? Because the, how do you say this?

757
01:09:24,000 --> 01:09:27,000
I don't know why I wrote that.

758
01:09:27,000 --> 01:09:30,000
It doesn't matter what order you reserve.

759
01:09:30,000 --> 01:09:33,000
Because you hash it in the scattered.

760
01:09:33,000 --> 01:09:41,000
You have a cluster that you can store on with one part.

761
01:09:41,000 --> 01:09:47,000
This might be for this. This should be for this.

762
01:09:47,000 --> 01:09:52,000
The reason why it matters is because the range is smaller and I can throw things out.

763
01:09:52,000 --> 01:09:56,000
If it's zero to infinity, that's the usual zone map.

764
01:09:56,000 --> 01:09:58,000
This should be for this.

765
01:09:58,000 --> 01:10:12,000
The split block blue filter is basically a way to, if your blue filter is so many bits, instead of having your hash function look at any possible number of bits, you basically narrow down to a block or subset of it.

766
01:10:12,000 --> 01:10:15,000
And so, and that means you can bring it in within a single cache line.

767
01:10:15,000 --> 01:10:23,000
We'll cover cache line stuff later on, but like, the way it is reduced the, keep everything in like L1 to run as fast as possible.

768
01:10:23,000 --> 01:10:31,000
This part is a bit tricky. I'll do what I can on the time, but the nested data structure is also really important.

769
01:10:31,000 --> 01:10:40,000
We'll cover the Dremel system later on, but there's this paper from, I think, 2011, 2010, about the system called Dremel,

770
01:10:40,000 --> 01:10:45,000
which is precursor to what, or it is the Dremel's internal name for BigQuery.

771
01:10:45,000 --> 01:10:55,000
So we'll read those papers, but they talk about how back then that like I've Google when they were building Dremel, they had all these applications generating this protocol buffer data.

772
01:10:55,000 --> 01:11:01,000
That's all nested and semi-structured and inconsistent schemas, and they needed the way to efficiently process them.

773
01:11:01,000 --> 01:11:07,000
So the Dremel paper talks about using this technique called a record shredding, which is mentioned in the paper you guys read.

774
01:11:07,000 --> 01:11:16,000
And this is an alternative, instead of a better approach to the, what Ork does, and other, other systems do, we call length of presence encoding.

775
01:11:16,000 --> 01:11:26,000
So we can cover this again later if necessary, but the basic idea with shredding is that, again, instead of storing the semi-structured data that I have,

776
01:11:26,000 --> 01:11:42,000
as a single blob column, that I then have a parse every single time I want to be processing on it, I'm going to split it up so that every level in a path is now treated as a separate column.

777
01:11:43,000 --> 01:11:57,000
Now I can rip through those columns to say, if I need to find like, for a given field in my JSON file, does it have this attribute set to a certain value, like I can rip through that column and find it without having to parse everything every single time.

778
01:11:58,000 --> 01:12:22,000
So the idea with shredding is that, instead of keeping track of the explicit hierarchy of a document for a given tuple, I just, I stored some repetition and a definition column that tells me whether this thing exists for some tuple or some offset for, as I'm scanning along.

779
01:12:23,000 --> 01:12:34,000
So the basic idea is that, say I have some perturbation definition like this, there's always a document ID at the top level, so I have a separate column for that, and that's always going to be there, and therefore the repetition and definition is always 0.

780
01:12:34,000 --> 01:12:45,000
Because there's only one integer, one doc ID per document, there's no repetition, and then there's no definition saying that there's other things I need to look at from the other nested columns.

781
01:12:46,000 --> 01:13:10,000
But then you see here that within the name field, I can have a language, I have a code, I always have this optional string URL, and then I can define now separate column for all these things, and this is telling me the repetition is like, for how many tuples after the run you're looking at, am I, do I belong to the original tuple that, or the original tuple that was created at the top of the hierarchy.

782
01:13:10,000 --> 01:13:23,000
I'm going this way fast, we can cover this next class. The basic idea is again, I have some additional metadata of these additional columns I'm using to keep track of that I can use to reverse and figure out where I'm at in my hierarchy.

783
01:13:23,000 --> 01:13:39,000
The easier one is the length and presence, this one basically says that, as I'm scanning through my document, I'm generating the data, that if a tuple doesn't have an attribute, then at a given level, then I'll just set its presence to the bottom level.

784
01:13:39,000 --> 01:13:51,000
And I'll just set its presence to false and leave it blank space. So I'm always putting in blank spaces for optional data to know whether this, this, this, the even tuple as I reconstruct things exists or not.

785
01:13:51,000 --> 01:14:04,000
And that way I can just do the offsets to say, okay, well, I know as I'm processing along, as I scan through, how to reverse, use the presence of time we reverse back to where I'm looking for, because the offsets are going to match up.

786
01:14:04,000 --> 01:14:18,000
Again, I'm, I'm, I'm butchering that's going me through fast, but basically again, the main, main takeaway here is that I can split things up and, based on the past in my JSON document and then run all the encoding compression stuff that we did before.

787
01:14:18,000 --> 01:14:32,000
I'm going to show one experiment from the paper you guys read. We basically did was rather than just looking at synthetic data like from TPCDS or these other benchmarks you guys are going to see in a bunch of papers and the Microsoft people guys used.

788
01:14:32,000 --> 01:14:47,000
We said, okay, let's go find out some real data. Let's go find random parkay files or random data sets, let's just up in parkay and org and then understand like are the design decisions that these file formats make are these good for real data.

789
01:14:47,000 --> 01:14:57,000
So, and then I said there's a bunch of parkay or file or sorry, not work. A bunch of parkay files you can find on GitHub and the internet through HuggingFace. We basically download a bunch of these things and then load it up.

790
01:14:57,000 --> 01:15:15,000
And so for our value age for the most part we're going to use arrow C++ invitation of parkay and org. Even though parkay and org, the original file library, the support libraries to process those files and create them, it's all written in Java because the Hadoop world wrote everything in Java from 10 years ago.

791
01:15:15,000 --> 01:15:30,000
We wanted to have the best performing implementations you could have so we use C++ for the problem is like the file spec for these parkay and org, they have all these new things that they've added over the years that are defined as optional.

792
01:15:30,000 --> 01:15:42,000
Like the page index for the the zone map in the footer is optional. And so the various implementations of these formats, sort of these processing libraries, some of them implemented things, something didn't.

793
01:15:42,000 --> 01:15:58,000
And then there's just the implementation of things that are required, how high performance were those. And so in the case of parkay and org when we looked at like, you know, stuff in rust and other implementations, they didn't have Cindy support or like parkay was really good but org was really crappy.

794
01:15:58,000 --> 01:16:07,000
It was really hard for us to find like a sort of true apples apples comparison between these different formats. Because there's everyone just sort of writes their own thing over the years.

795
01:16:08,000 --> 01:16:21,000
All right, so the first question we did is, okay, well, how well do these things actually compress. And the x-axis is just showing a bunch of different workloads that we generated for based on real data sets.

796
01:16:21,000 --> 01:16:31,000
And see, you see that for the most part, parkay is better for the logging and the ML workload than over parkay because you want lowers better.

797
01:16:32,000 --> 01:16:43,000
Because these are, these data sets are mostly comprised of floating point numbers, right? All the weights from some ML model, or all floating point numbers.

798
01:16:43,000 --> 01:16:49,000
And because parkay does dictionary encoding for floating point numbers, you actually get a big win.

799
01:16:49,000 --> 01:16:56,000
Again, that seems counter-intuitive. This was surprising to me that like floating point data actually compresses really well through dictionary encoding.

800
01:16:56,000 --> 01:17:10,000
And then the org is going to do better for the classic workload and the geospatial workload because they mostly contain strings and parkay, sorry, org is more aggressive in compressing the dictionary codes.

801
01:17:10,000 --> 01:17:15,000
It has that four different schemes that can use after you've already done the dictionary code.

802
01:17:15,000 --> 01:17:23,000
All right, so the file size, you know, these aren't huge wins, right? These aren't mind-blowingly different, right? These are my opinion, the margin of error.

803
01:17:23,000 --> 01:17:29,000
And not like one's 10x larger than another, right? And these are, as I've said, storage is infinite.

804
01:17:29,000 --> 01:17:49,000
But now when you actually run the queries on these things, right, simulating what an actual query engine would actually do for scans and range scans, or sorry, full of bunch of scans, and then partial selects and point queries, you see parkay is going to be faster because it's going to mostly use bitpacking.

805
01:17:49,000 --> 01:18:00,000
And for some of these workloads, there isn't a lot of repetition that are for contiguous values. There's repetition within the column, but it's not like you see 1-1-1-1 over and over again.

806
01:18:00,000 --> 01:18:09,000
So RLE doesn't have a big meaning for this, right? Because again, the only RLE only kicks in in parkay if there's eight or more repeated values.

807
01:18:09,000 --> 01:18:19,000
And so ORC is more aggressive for RLE, again, three or more, but the problem is when you use RUN-like encoding, you can't vectorize that very easily with SIMD.

808
01:18:19,000 --> 01:18:32,000
And I don't think the error implementation of the ORC processing library that we had, none of that was vectorized. So basically, we left doing SISD operations or SISD instructions on columnar vectorized data.

809
01:18:33,000 --> 01:18:54,000
The other thing probably saw with the case ORC, and again, this would be a reoccurring theme throughout the entire semester, is that the additional complexity of supporting four different encoding schemes for the dictionary codes, or dictionary compressed columns, is that at runtime, as you're trying to rip through the column, you've got to keep checking, okay, for this column chunk, how is it actually being encoded?

810
01:18:55,000 --> 01:19:03,000
And then now you have this branching in your code to say, if I look at my header, it says encoded this way, then I want to use this function decompressant.

811
01:19:03,000 --> 01:19:18,000
If it's this way, use this other function. And all that indirection or conditional clauses, calls as branch mis prediction in the CPU, which in and again, a modern architecture with a super scalar CPU architecture is terrible.

812
01:19:18,000 --> 01:19:26,000
You've got to flush the pipeline and pause and all that garbage, right? So for that reason, parquet, because it's much more simple, works way better.

813
01:19:27,000 --> 01:19:35,000
And we'll see in some cases, when we talk about sweatshirt scans and actually applying predicates, the stupid thing of like just always applying the predicate,

814
01:19:36,000 --> 01:19:48,000
I start always copying the two pool, as like always copying the two pool into your output buffer, and then apply the predicate, actually works faster in some cases, then checking the predicate, and then if it matches, then putting the output buffer.

815
01:19:48,000 --> 01:19:56,000
So always copying seems like the wrong thing to do, but on super scalability to use, when everything's in memory, you try to rip through as fast as possible, turns out to be the better choice.

816
01:19:57,000 --> 01:20:11,000
And this is why the compilation, the specialization stuff we'll see later on is going to help us as well, because now we don't think the giant switch calls that says, if I'm in 32 through this, if I'm, you know, floating point to that, which again, if you overlook the bus stop code or post-codes and all that, that's basically what it looks like when they process types.

817
01:20:12,000 --> 01:20:18,000
So if you can specialize all of that, then you avoid that indirection. So that's why parquet simplicity is going to help with here.

818
01:20:19,000 --> 01:20:27,000
I'm well, let me finish quickly. So main takeaways of this, dictionary encoding is effective for all types, not just strings. And again, to me, this is surprising.

819
01:20:27,000 --> 01:20:44,000
The simple plus decoding scheme is actually is better for modern hardware, as I just said. And then because the hardware landscape has changed so much, network has gotten so much faster, then, then, and this has got much faster too, then we just want to avoid using snappy and z standard entirely.

820
01:20:45,000 --> 01:20:51,000
The native encoding schemes or dictionary coding, RLE and all that, that's always me better.

821
01:20:53,000 --> 01:21:01,000
I've already said this, hardware has changed. And then, even though there's been widely successful, they're used everywhere.

822
01:21:01,000 --> 01:21:07,000
There's a lot of things that are missing in parquet and work they didn't consider when they first designed these things. That would help us if we want to process OLAP queries.

823
01:21:08,000 --> 01:21:21,000
So there's no statistics. There's a zone maps and tuple counts and bloom filters. No histograms, no sketches, nothing about what's inside those columns that I could use for cardinality estimations and my query optimizer.

824
01:21:21,000 --> 01:21:30,000
I can't increment, can't increment, decirilize the schema. If I have a 10,000 columns, I've got to decirilize that protobuff thing at the very beginning, all the ones.

825
01:21:31,000 --> 01:21:39,000
And then, as I said, there's a bunch of different limitations and pick whatever query language, sorry, whatever programming language you want. There's a parquet library for it.

826
01:21:39,000 --> 01:21:48,000
But it doesn't, they're all, I'll say they're all garbage, we're like, none of them supports exactly what's in the spec. Even the job one doesn't.

827
01:21:48,000 --> 01:21:58,000
Okay, so next class, you're going to read fast lanes, we'll cover better blocks. These are going to be sort of modern encoding schemes that go beyond the things we talked about today.

828
01:21:58,000 --> 01:22:13,000
That's going to be really designed for modern hardware. And the fast lanes one is what is basically saying, hey, if you don't put things in the order that they, in memory, in the way that they're found somebody inserted them, you know, not even sorting it.

829
01:22:13,000 --> 01:22:23,000
The store things a certain way that, that, because you know it's been processed with SIMD, then you get much better performance. It's pretty well. Okay? Any last questions?

