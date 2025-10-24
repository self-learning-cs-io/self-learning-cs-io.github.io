---
title: CMU15445 P12F202311 JoinAlgorithms
---

1
00:00:00,000 --> 00:00:14,320
I am in condition of being our leader.

2
00:00:14,320 --> 00:00:33,039
So, like Jignesh said, on Monday, and maybe Andy said last week, I don't know.

3
00:00:33,039 --> 00:00:34,039
They're both traveling today.

4
00:00:34,039 --> 00:00:35,039
I'm Matt.

5
00:00:35,039 --> 00:00:36,039
I'm a PhD student.

6
00:00:36,039 --> 00:00:37,879
I work with Andy.

7
00:00:37,879 --> 00:00:42,640
The last time I gave a lecture for this class, I was a first year PhD student, and now I'm

8
00:00:42,640 --> 00:00:45,200
hopefully a final year PhD student.

9
00:00:45,200 --> 00:00:52,840
So hopefully this is a nice bookend on that process.

10
00:00:52,840 --> 00:00:53,840
We'll see.

11
00:00:53,840 --> 00:00:57,320
So with that said, let's talk about joins today.

12
00:00:57,320 --> 00:01:01,760
A little bit of administrative to get out of the way first.

13
00:01:01,760 --> 00:01:03,359
Homework 2 is due tonight.

14
00:01:03,359 --> 00:01:08,760
Homework 3 is due on Sunday, and the midterm is next Wednesday.

15
00:01:08,760 --> 00:01:13,840
This lecture is the last lecture for material you will be responsible for for the midterm.

16
00:01:13,840 --> 00:01:17,880
There's going to be a lecture next Monday, but it will not be covered on the midterm exam.

17
00:01:17,880 --> 00:01:18,880
Makes sense?

18
00:01:18,880 --> 00:01:24,040
If anything looks wrong here, it's above my pay grade, so you'd have to take it up with

19
00:01:24,040 --> 00:01:29,320
the core staff, but these are the dates and stuff that I was given.

20
00:01:29,320 --> 00:01:35,120
So let's talk about the context for why we need joins in the first place.

21
00:01:35,120 --> 00:01:39,000
So we pray at the altar of Ted Cod and the relational model in this class.

22
00:01:39,000 --> 00:01:45,480
So that means we're going to reduce duplication of our information and separate our information

23
00:01:45,480 --> 00:01:47,520
into relations, into different tables.

24
00:01:47,520 --> 00:01:51,280
But when we want to query that information and combine and make useful queries out of it,

25
00:01:51,280 --> 00:01:52,280
we have to join stuff.

26
00:01:52,280 --> 00:01:56,040
So things like customers and order tables or students and classes tables, those sort

27
00:01:56,040 --> 00:01:59,920
of classic examples you see in textbooks.

28
00:01:59,920 --> 00:02:05,040
And if you were paying attention to the database world 10, 15 years ago, which I'm guessing

29
00:02:05,040 --> 00:02:10,199
no one here was, the no-sequel systems were all saying joins are stupid.

30
00:02:10,199 --> 00:02:14,520
We should just, you know, denormalize all of our data, save a bunch of time.

31
00:02:14,520 --> 00:02:15,840
We don't need to do joins.

32
00:02:15,840 --> 00:02:19,920
And then it turned out a lot of people who adopted no-sequel systems ended up building

33
00:02:19,920 --> 00:02:23,920
joins on the application side anyway, which caused a lot of redundancy and slow systems

34
00:02:23,920 --> 00:02:25,480
and it didn't really work out.

35
00:02:25,479 --> 00:02:31,840
So from Andy's perspective, from our perspective, the relational model won again.

36
00:02:31,840 --> 00:02:37,799
And another reason joins are important is systems like analytical systems for OLAP systems.

37
00:02:37,799 --> 00:02:39,039
Hopefully you've heard that term before.

38
00:02:39,039 --> 00:02:45,000
They're going to spend 20 to 50% of their time just working on joins.

39
00:02:45,000 --> 00:02:48,519
Transactional systems that's not true at all, but for analytical systems, this is where

40
00:02:48,519 --> 00:02:49,599
they're going to spend a lot of their time.

41
00:02:49,599 --> 00:02:54,079
So using the right join algorithm, getting the right join order, this is all going to

42
00:02:54,080 --> 00:02:57,719
be probably the high pull in the tent that's going to determine your query runtime.

43
00:02:57,719 --> 00:03:02,560
So we need to make sure we get joins right.

44
00:03:02,560 --> 00:03:09,520
So in the lecture today, we're just going to focus on a class of joins called binary

45
00:03:09,520 --> 00:03:10,520
inner equidjoins.

46
00:03:10,520 --> 00:03:14,080
Basically, binary, we're going to join two relations.

47
00:03:14,080 --> 00:03:18,439
Inner equidjoin, we're going to compare two attributes from each, or an attribute from each

48
00:03:18,439 --> 00:03:19,439
relation.

49
00:03:19,439 --> 00:03:23,480
And if there's an equality there, we're going to emit sort of a concatenated tuple from

50
00:03:23,479 --> 00:03:27,560
that, that's satisfied that predicate.

51
00:03:27,560 --> 00:03:31,599
These sort of joins can be modified to support, or these algorithms can be modified to support

52
00:03:31,599 --> 00:03:34,239
other sorts of joins, depending on the sort of predicate you want to do.

53
00:03:34,239 --> 00:03:36,560
So range scans, anti-joins.

54
00:03:36,560 --> 00:03:40,280
I think the textbook generally just refers to this class of joins as like theta joins, where

55
00:03:40,280 --> 00:03:43,319
maybe you're not using an equality operator.

56
00:03:43,319 --> 00:03:46,959
And like I mentioned, these are binary joins, where we're only worrying about two relations.

57
00:03:46,959 --> 00:03:51,639
Multi-way joins exist mostly in research literature.

58
00:03:51,639 --> 00:03:56,639
It was the case that SQL Server added support for this sort of stuff in like 1998, and then

59
00:03:56,639 --> 00:03:58,639
eventually they decided that was a terrible idea.

60
00:03:58,639 --> 00:04:04,199
It made performance unpredictable, and they ripped it back out a couple of years later.

61
00:04:04,199 --> 00:04:07,639
As far as we know, relational AI is the only system these days that's really still playing

62
00:04:07,639 --> 00:04:08,639
with multi-way joins.

63
00:04:08,639 --> 00:04:12,039
But you will see it in the research literature.

64
00:04:12,039 --> 00:04:14,039
At the bottom here, there's a little bit of terminology.

65
00:04:14,039 --> 00:04:17,680
We're going to reuse throughout this lecture.

66
00:04:17,680 --> 00:04:22,920
We're going to talk about left tables and right tables and outer tables and inner tables.

67
00:04:22,920 --> 00:04:26,000
Here we're just making the statement that the smaller table we want to be the left table

68
00:04:26,000 --> 00:04:28,759
or the outer table, which doesn't really mean anything to you yet, but it'll start to

69
00:04:28,759 --> 00:04:33,720
make sense as we discuss the algorithms that are in play here.

70
00:04:33,720 --> 00:04:37,639
So we're back to looking at query plans that we've seen before.

71
00:04:37,639 --> 00:04:42,240
This notion of, in the early lectures we talked about how we turn SQL into logical operators,

72
00:04:42,240 --> 00:04:44,879
and eventually we're going to turn them into physical operators.

73
00:04:44,879 --> 00:04:51,879
So in this setup, data is going to start all the way down at the leaf nodes on our relations,

74
00:04:51,879 --> 00:04:57,040
tables basically, and the data is going to flow all the way up through this relation.

75
00:04:57,040 --> 00:05:01,519
And then there may be a filter on, like in this case, there's a filter on S, and then

76
00:05:01,519 --> 00:05:02,519
it's going to reach that join operator.

77
00:05:02,519 --> 00:05:07,639
And that join operator is going to do a comparison, and then it's going to emit tuples based

78
00:05:07,639 --> 00:05:12,800
on tuples that satisfy the join predicate.

79
00:05:12,800 --> 00:05:15,199
And so next week, when we start talking about query execution, we're going to talk about

80
00:05:15,199 --> 00:05:16,720
like the granularity that we're working at.

81
00:05:16,720 --> 00:05:21,560
I'm saying tuples sort of vaguely, because it may be the case you operate one tuple at a

82
00:05:21,560 --> 00:05:24,920
time, you may work on vectors of tuples, but that's sort of going to be design decisions

83
00:05:24,920 --> 00:05:26,879
we'll talk about next week.

84
00:05:26,879 --> 00:05:31,199
And then at the root of the node, you're going to get the root of this tree you're going

85
00:05:31,199 --> 00:05:37,360
to get the actual results of the query plan.

86
00:05:37,360 --> 00:05:42,759
So when we're designing these join operators, we have a couple decisions to have to think

87
00:05:42,759 --> 00:05:45,000
about.

88
00:05:45,000 --> 00:05:52,240
What do we actually output from these operators to their parent nodes, and as well as like,

89
00:05:52,240 --> 00:05:54,920
how do we reason about what the cost of these operations are going to be?

90
00:05:54,920 --> 00:05:57,599
And these are typically implementation design decisions.

91
00:05:57,599 --> 00:06:00,159
These are not sort of things you change on the fly in a system.

92
00:06:00,159 --> 00:06:02,680
When you're sitting down here designing, how do I want to build my database system and

93
00:06:02,680 --> 00:06:06,759
how is data going to flow through these query plans?

94
00:06:06,759 --> 00:06:09,039
You sort of have to reason about these sorts of things of like, what are the inputs and

95
00:06:09,040 --> 00:06:13,120
outputs of these join operators going to be?

96
00:06:13,120 --> 00:06:18,480
And so at a very high level, let's just take for example, this join operation here where

97
00:06:18,480 --> 00:06:26,960
we're looking at ID in relations R and S. When it's doing this comparison, I sort of alluded

98
00:06:26,960 --> 00:06:30,720
to this earlier, the outputs can vary based on sort of the processing model, tuple at a

99
00:06:30,720 --> 00:06:32,800
time, vectors.

100
00:06:32,800 --> 00:06:34,520
It's also going to depend on the storage model.

101
00:06:34,519 --> 00:06:38,599
So I think earlier in the class, you guys talked about NSMs versus DSMs.

102
00:06:38,599 --> 00:06:42,279
You can only remember what that is.

103
00:06:42,279 --> 00:06:45,279
There's another term for when we talk about NSMs and DSMs.

104
00:06:45,279 --> 00:06:46,799
Yeah, exactly.

105
00:06:46,799 --> 00:06:48,639
So, so, row stores versus column stores.

106
00:06:48,639 --> 00:06:53,039
So depending on how that data is organized and how it's flowing up from the base tables,

107
00:06:53,039 --> 00:06:58,079
that's also going to inform how you implement these join operators.

108
00:06:58,079 --> 00:07:00,839
And then the last is sort of the data requirements in the query.

109
00:07:00,839 --> 00:07:09,359
Depending on if you want the sort of what operators are existing above these joined is

110
00:07:09,359 --> 00:07:13,039
also going to change sort of sort of what you want their inputs to actually be.

111
00:07:13,039 --> 00:07:19,279
So let's talk about that, the first design decision, which is what comes out of these

112
00:07:19,279 --> 00:07:20,359
join operators.

113
00:07:20,359 --> 00:07:26,039
So the first example, or the first design choice you could do is an option called early

114
00:07:26,039 --> 00:07:27,039
materialization.

115
00:07:27,040 --> 00:07:33,760
So the idea is you have tables R, table S. We're going to do a join on ID for those.

116
00:07:33,760 --> 00:07:35,960
And we're going to materialize all of the values.

117
00:07:35,960 --> 00:07:38,160
So we're going to do the comparison.

118
00:07:38,160 --> 00:07:41,360
And wherever those IDs match, we're going to create our output tuples.

119
00:07:41,360 --> 00:07:45,560
And we're going to send them up through the operator tree.

120
00:07:45,560 --> 00:07:49,439
So they're going to continue to flow up to that projection, which is then going to project

121
00:07:49,439 --> 00:07:52,280
the information that we actually want.

122
00:07:52,280 --> 00:07:55,520
The nice thing about this is you never actually have to go back to the base tables to get your

123
00:07:55,519 --> 00:07:56,519
data again.

124
00:07:56,519 --> 00:08:01,479
So you do one trip to storage and you start sending your tuples through the query plan

125
00:08:01,479 --> 00:08:05,519
and eventually to the root node to produce your result.

126
00:08:05,519 --> 00:08:09,560
This could be like all things in database systems that are trade us to these sorts of design

127
00:08:09,560 --> 00:08:10,759
decisions.

128
00:08:10,759 --> 00:08:16,680
This could be a bad idea if your tuples are extremely wide with a ton of attributes,

129
00:08:16,680 --> 00:08:22,019
because you're effectively copying potentially more data than you actually need if one, the

130
00:08:22,019 --> 00:08:26,299
joint activity is going to be pretty low or you're eventually going to filter that stuff

131
00:08:26,299 --> 00:08:32,419
out anyway depending on the projection that's closer to the root of the plant tree.

132
00:08:32,419 --> 00:08:38,539
If the table's wide but only one tuple matches, it's actually not a big deal.

133
00:08:38,539 --> 00:08:41,860
Depending on how early you sort of do these sorts of these projections.

134
00:08:41,860 --> 00:08:45,259
And this is also opportunities here for where you can actually push down these projections

135
00:08:45,259 --> 00:08:49,139
to sort of reduce some of that waste.

136
00:08:49,139 --> 00:08:53,740
So the key idea here for early materialization is these subsequent operations never really

137
00:08:53,740 --> 00:08:55,899
have to go back to the base tables to get that information.

138
00:08:55,899 --> 00:08:59,819
So you sort of have predictable IOs based on you only need to know the size of your

139
00:08:59,819 --> 00:09:03,139
tables because you're going to scan them once materialize your data and send them up

140
00:09:03,139 --> 00:09:06,379
through the query plan.

141
00:09:06,379 --> 00:09:11,460
The other option as opposed to early materialization is late materialization.

142
00:09:11,460 --> 00:09:16,460
So in this scenario we have tables R and S again and we do the comparison except this

143
00:09:16,460 --> 00:09:21,580
time we're only going to output like record IDs or in something like a Postgres, like a

144
00:09:21,580 --> 00:09:28,820
tuple ID, some sort of unique identifier for what tuple in the base table satisfies this

145
00:09:28,820 --> 00:09:35,420
join but you're not actually going to materialize all the values that you need now.

146
00:09:35,420 --> 00:09:40,420
So as these continue to flow through at the end you see here we actually need this C

147
00:09:40,420 --> 00:09:45,660
date field from the base table S. You have to go all the way back to storage to get that

148
00:09:45,659 --> 00:09:46,659
down.

149
00:09:46,659 --> 00:09:49,779
So you've got these tuple IDs, you know what satisfied your join, you know what you

150
00:09:49,779 --> 00:09:52,860
eventually want to output at the root of this query plan but you have to go all the way

151
00:09:52,860 --> 00:09:54,819
back to the base tables.

152
00:09:54,819 --> 00:10:02,620
And this was pretty common and sort of popular with column stores maybe 15 years ago because

153
00:10:02,620 --> 00:10:08,539
for them it made more sense to only look at the data they needed to just rip through the

154
00:10:08,539 --> 00:10:12,539
column that you were doing your join evaluation on and eventually you just go back and you

155
00:10:12,539 --> 00:10:17,379
materialize the data that you actually need at the very end.

156
00:10:17,379 --> 00:10:23,019
In practice I won't say this is less common but we've at least heard from one of the major

157
00:10:23,019 --> 00:10:28,860
big column stores, one of the early ones, Vertica, that was sort of a commercialized version

158
00:10:28,860 --> 00:10:31,539
of C store.

159
00:10:31,539 --> 00:10:36,419
They basically initially did late materialization because they're like this is a great idea

160
00:10:36,419 --> 00:10:40,860
and then similar to like the multi-way join thing when the research community says something

161
00:10:40,860 --> 00:10:43,940
might be a good idea in practice it becomes kind of hard to predict and reason about what

162
00:10:43,940 --> 00:10:50,620
the total IO costs will be because here in this case you don't actually know what your

163
00:10:50,620 --> 00:10:52,899
total IO is going to be until you get to the output.

164
00:10:52,899 --> 00:10:58,700
You like it's hard to predict because you don't know how many tuples will satisfy the join

165
00:10:58,700 --> 00:11:03,500
predicates and any sort of other filters and so at the end you have to go back to IO which

166
00:11:03,500 --> 00:11:07,659
is sort of hard to predict ahead of time and going back to IO is actually getting, despite

167
00:11:07,659 --> 00:11:11,819
storage getting faster, is getting harder and harder in the era of sort of disaggregated

168
00:11:11,819 --> 00:11:17,019
compute or pushing storage off to separate storage nodes and cloud environments so now you're

169
00:11:17,019 --> 00:11:21,419
often going across the network to get your data instead of just to a local disk.

170
00:11:21,419 --> 00:11:27,139
So this notion of early materialization is probably more common these days.

171
00:11:27,139 --> 00:11:30,939
So that's early materialization versus late materialization when we're looking at table

172
00:11:30,939 --> 00:11:31,939
scans for joins yet.

173
00:11:31,940 --> 00:11:49,500
So the question is where does C-date sort of get materialized to when you're doing query

174
00:11:49,500 --> 00:11:52,020
evaluation and then like is it thrown away at the end?

175
00:11:52,020 --> 00:11:53,500
Is that sort of the question?

176
00:11:53,500 --> 00:11:56,900
Yeah, it's sort of, that's a system design decision.

177
00:11:56,899 --> 00:12:02,299
What this is are you're going to, you know, like a knob you can typically set in database

178
00:12:02,299 --> 00:12:06,899
systems is just like how much work memory does a single query get to use to sort of store

179
00:12:06,899 --> 00:12:08,539
a scratch space and stuff like that.

180
00:12:08,539 --> 00:12:11,620
They're going to use typically their own scratch space for that sort of information and then

181
00:12:11,620 --> 00:12:13,980
it's probably just going to be lost.

182
00:12:13,980 --> 00:12:18,419
Unless you explicitly wanted to sort of, there are things called views.

183
00:12:18,419 --> 00:12:20,220
I don't think Andy's talked about those yet.

184
00:12:20,220 --> 00:12:24,059
I don't know if we cover views in this class but there's this notion of views and materialized

185
00:12:24,059 --> 00:12:28,979
views where if you know you're repeatedly doing this sort of querying and you want to

186
00:12:28,979 --> 00:12:34,019
sort of maintain that information, you can create those in the database system.

187
00:12:34,019 --> 00:12:38,539
If we don't talk about it in 445, we talk about it in 7201 for sure.

188
00:12:38,539 --> 00:12:39,539
Yeah.

189
00:12:39,539 --> 00:12:46,539
So, confused why the unpredictable IO is the downside?

190
00:12:46,539 --> 00:12:50,539
Because isn't the IO always going to be less than the predictable one?

191
00:12:50,539 --> 00:12:53,539
The predictable one is just for everything.

192
00:12:53,539 --> 00:12:55,539
Whereas this is 3 less than everything.

193
00:12:55,539 --> 00:13:02,539
Right, so the question is, late materialization should always be less IO than early materialization

194
00:13:02,539 --> 00:13:07,539
for at least for a column store.

195
00:13:08,539 --> 00:13:11,539
There's also the case of round trips hurt and latency hurts.

196
00:13:11,539 --> 00:13:16,539
So in the case of early materialization, you just sort of get the benefits of prefetching,

197
00:13:16,539 --> 00:13:21,539
you just rip through all the data, you send it across, you process all of it at once,

198
00:13:21,539 --> 00:13:26,539
you keep it around in memory, you get typically more cache locality from that sort of stuff as opposed to

199
00:13:26,539 --> 00:13:32,539
having to sort of make round trips back and forth to storage devices where your latency starts to become the

200
00:13:33,539 --> 00:13:36,539
pain point rather than just sort of sequential IO.

201
00:13:36,539 --> 00:13:39,539
In her leaving that sort of stuff gets a little trickier too, right?

202
00:13:39,539 --> 00:13:44,539
And again, reasoning about contention in the system with early materialization,

203
00:13:44,539 --> 00:13:48,539
your query is going to rip through your tables, materialize your information, and you're done.

204
00:13:48,539 --> 00:13:53,539
That query is probably not going to have to go back and hammer storage is hard for the base table information

205
00:13:53,539 --> 00:13:57,539
as opposed to late materialization is going to keep kind of ping ponging back and forth between like,

206
00:13:57,539 --> 00:14:04,539
I need this, go get that from the table, and it's sort of these round trips get harder a reason about I think.

207
00:14:04,539 --> 00:14:08,539
Cool? Oh, yeah.

208
00:14:08,539 --> 00:14:15,539
So I have another talk about why early materialization might be more resource efficient,

209
00:14:15,539 --> 00:14:19,539
it is because, or is it related to when you perform the join,

210
00:14:19,539 --> 00:14:22,539
you're fetching all the pages sequentially anyways,

211
00:14:22,539 --> 00:14:25,539
and if you materialize it right after the join,

212
00:14:25,539 --> 00:14:30,539
then you can take advantage of the buffer pool manager and it's still fresh,

213
00:14:30,539 --> 00:14:33,539
take advantage of more locality.

214
00:14:33,539 --> 00:14:34,539
Right, so the feedback are...

215
00:14:34,539 --> 00:14:40,539
Yeah, so a statement is early materialization may benefit from locality because if you're ripping through all the data already,

216
00:14:40,539 --> 00:14:42,539
and then if you need it further up the query plan,

217
00:14:42,539 --> 00:14:47,539
like it's already possibly still in the buffer pool or the OS page cache if someone uses that like Postgres,

218
00:14:47,539 --> 00:14:48,539
it's the only one left.

219
00:14:48,539 --> 00:14:51,539
Yeah, you would benefit from caching there as well if that were the case.

220
00:14:51,539 --> 00:14:59,539
So the other thing we talked about when we're thinking about design decisions for these joins is,

221
00:14:59,539 --> 00:15:01,539
how do we reason about cost for these sorts of things?

222
00:15:01,539 --> 00:15:03,539
And I alluded this to this a little bit earlier.

223
00:15:03,539 --> 00:15:07,539
We're mostly going to be focused on the cost of the IO for these joins.

224
00:15:07,539 --> 00:15:08,539
We don't really compare...

225
00:15:08,539 --> 00:15:10,539
We don't worry about the compute as much.

226
00:15:10,539 --> 00:15:15,539
So in this case, we keep going back to this notion of there's a table R and there's a table S

227
00:15:15,539 --> 00:15:17,539
that we're joining on in this query over here,

228
00:15:17,539 --> 00:15:20,539
and I'm going to say that there's big M pages in R with little M tuples,

229
00:15:20,539 --> 00:15:25,539
and big M pages in S with little M tuples.

230
00:15:25,539 --> 00:15:29,539
And we're going to cost through this entire lecture.

231
00:15:29,539 --> 00:15:35,539
We're going to cost these algorithms in the notion of M and N pages and little M and N tuples.

232
00:15:35,539 --> 00:15:38,539
And like I said, we're going to ignore the compute cost.

233
00:15:38,539 --> 00:15:41,539
That's a controversial statement to some people because some people are like,

234
00:15:41,539 --> 00:15:47,539
okay, well, some of these algorithms are O N times N and others are O N plus M from a compute standpoint.

235
00:15:47,539 --> 00:15:52,539
But in reality, IO is still a high poll in the tent for most of what we're doing in these database systems.

236
00:15:52,539 --> 00:15:57,539
Unless you're doing an in-memory database system, then you may make some different design decisions,

237
00:15:57,539 --> 00:16:01,539
but we're really trying to design or reduce IO here in these disk-based systems.

238
00:16:03,539 --> 00:16:09,539
Just as a brief aside, there's this very naive way to do a join,

239
00:16:09,539 --> 00:16:12,539
which would be like a cross product or a Cartesian product.

240
00:16:12,539 --> 00:16:18,539
So like in the SQL standard and some database systems, I think, offer something called a cross join,

241
00:16:18,539 --> 00:16:22,539
where you can basically just create this Cartesian product of two different relations.

242
00:16:22,539 --> 00:16:31,539
And you could, if you really wanted to, implement a join that way by just sort of then creating this gigantic Cartesian product of these two tables

243
00:16:31,539 --> 00:16:33,539
and then filtering down to the ones that you actually want.

244
00:16:33,539 --> 00:16:36,539
But in practice, that's a terrible idea.

245
00:16:36,539 --> 00:16:41,539
To be honest, I don't know why anyone ever use a cross join, but it exists.

246
00:16:41,539 --> 00:16:44,539
All you can really do is just create two for loops that run through the two tables,

247
00:16:44,539 --> 00:16:46,539
and it's going to be wildly inefficient.

248
00:16:46,539 --> 00:16:52,539
Unless you were trying to create just like specifically doing something like testing that needed a Cartesian product of your data,

249
00:16:52,539 --> 00:16:54,539
I don't know why you would do that.

250
00:16:55,539 --> 00:16:59,539
So here's a brief overview of the algorithms we're going to look at today.

251
00:16:59,539 --> 00:17:02,539
There's sort of three classes or groups of algorithms.

252
00:17:02,539 --> 00:17:04,539
The first we're going to look at is the nested loop join.

253
00:17:04,539 --> 00:17:06,539
Then we're going to take a look at the sort merge join,

254
00:17:06,539 --> 00:17:10,539
which is slightly related to the external merge sort algorithm we looked at,

255
00:17:10,539 --> 00:17:12,539
with Jignash on Monday.

256
00:17:12,539 --> 00:17:18,539
Then we're going to talk about what's probably the most important one, which is the hash join,

257
00:17:18,539 --> 00:17:20,539
and spend a decent amount of time there.

258
00:17:20,539 --> 00:17:28,539
In practice, hash joins generally going to be the fastest for, particularly for analytical systems,

259
00:17:28,539 --> 00:17:32,539
well, TP, like these transactional systems, are typically not doing gigantic joins,

260
00:17:32,539 --> 00:17:35,539
so they'll do something simpler like an index nested loop join.

261
00:17:36,539 --> 00:17:40,539
And it may be the case that if you have like a sort by in your query,

262
00:17:40,539 --> 00:17:42,539
you may want to do the sort merge join.

263
00:17:44,539 --> 00:17:47,539
Right, I forgot to warn you guys about that.

264
00:17:47,539 --> 00:17:52,539
Yeah, they're testing an emergency alert system today at 220, so it must be 220.

265
00:17:59,539 --> 00:18:01,539
Yeah, they are a little early.

266
00:18:02,539 --> 00:18:04,539
Yeah, that is quite annoying.

267
00:18:12,539 --> 00:18:14,539
Alright, we've got a couple more still beeping.

268
00:18:14,539 --> 00:18:16,539
Couple more.

269
00:18:16,539 --> 00:18:18,539
Oh, God, they're still going.

270
00:18:32,539 --> 00:18:34,539
Alright, we're good.

271
00:18:34,539 --> 00:18:37,539
I forgot to warn about that.

272
00:18:37,539 --> 00:18:38,539
I knew that was coming.

273
00:18:41,539 --> 00:18:43,539
There's always one.

274
00:18:47,539 --> 00:18:49,539
I mean, the big takeaways here is there...

275
00:18:50,539 --> 00:18:54,539
There's no one size fits all solution in database systems.

276
00:18:54,539 --> 00:18:58,539
Depending on the task at hand, the query, your data distribution, your system design,

277
00:18:58,539 --> 00:19:01,539
different joins are going to make sense at the right time,

278
00:19:01,539 --> 00:19:05,539
because like if your query has a sort by, you might want to do the sort merge join.

279
00:19:06,539 --> 00:19:09,539
But like I said, all TP likes to use nested loop join.

280
00:19:09,539 --> 00:19:11,539
You can get pretty far, which is a lot of time.

281
00:19:11,539 --> 00:19:13,539
But I think that's a lot of time.

282
00:19:13,539 --> 00:19:15,539
I think that's a lot of time.

283
00:19:16,539 --> 00:19:18,539
But like I said, all TP likes to use nested loop join.

284
00:19:18,539 --> 00:19:21,539
You can get pretty far, which is a nested loop join for a transactional system.

285
00:19:21,539 --> 00:19:26,539
My sequel didn't get a hash join until 2019,

286
00:19:26,539 --> 00:19:29,539
because they could just do nested loop joins.

287
00:19:32,539 --> 00:19:34,539
I have a theory, actually, I'll discuss later with the sort merge join.

288
00:19:34,539 --> 00:19:38,539
Andy hasn't confirmed this for me, but I think it's true, so we'll just take it as gospel.

289
00:19:40,539 --> 00:19:43,539
So we're going to start with the naive nested loop join.

290
00:19:44,539 --> 00:19:48,539
This will actually give you a better idea when I was talking about, again,

291
00:19:50,539 --> 00:19:53,539
the outer table and the inner table and sort of where that name comes from.

292
00:19:54,539 --> 00:19:57,539
So if you were sort of naively trying to design a join algorithm where I said,

293
00:19:57,539 --> 00:20:01,539
okay, for every tuple in R and every tuple in S,

294
00:20:01,539 --> 00:20:05,539
I just want to see to their IDs match, the simplest thing you could do,

295
00:20:05,539 --> 00:20:08,539
is just write a for loop for this outer relation,

296
00:20:08,539 --> 00:20:12,539
and then compare it to every single relation in the loop.

297
00:20:13,539 --> 00:20:16,539
So that's also where the name of our outer and inner tables is going to come from.

298
00:20:16,539 --> 00:20:19,539
You'll sometimes see other referred to as the left and the right table,

299
00:20:19,539 --> 00:20:22,539
the left table is usually the outer table, the right table is the inner table.

300
00:20:22,539 --> 00:20:25,539
That comes from sort of the query plan view that we usually think about.

301
00:20:25,539 --> 00:20:29,539
And when you talk about optimizers, I think in the future,

302
00:20:30,539 --> 00:20:34,539
they reason more about left and right trees and use that terminology a lot more,

303
00:20:34,539 --> 00:20:37,539
whereas like, I think that's the reason why I'm talking about the inner table.

304
00:20:37,539 --> 00:20:40,539
So I think that's the reason why I'm talking about the inner table.

305
00:20:40,539 --> 00:20:43,539
So I think that's why I'm talking about left and right trees and use that terminology a lot more,

306
00:20:43,539 --> 00:20:50,539
whereas like, I feel like people living in the actual operator world think about outer and inner tables.

307
00:20:50,539 --> 00:20:55,539
So it should seem obvious that maybe not,

308
00:20:55,539 --> 00:21:00,539
but this algorithm is bad because we're doing a ton of work.

309
00:21:00,539 --> 00:21:05,539
So we know we have to scan every page in M.

310
00:21:05,539 --> 00:21:09,539
So our cost upfront is we know we're no more eventually going to have to go through every page

311
00:21:09,539 --> 00:21:14,539
in table R. But then for every tuple in R,

312
00:21:14,539 --> 00:21:17,539
we're going to have to look at every page in N.

313
00:21:17,539 --> 00:21:20,539
So the cost here is astronomical,

314
00:21:20,539 --> 00:21:25,539
unless these tables are very, very, very small.

315
00:21:25,539 --> 00:21:29,539
So for example, let's put some numbers to this.

316
00:21:29,539 --> 00:21:32,539
Table R has a thousand pages with a hundred thousand tuples.

317
00:21:32,539 --> 00:21:36,539
Table S has 500 pages with 40,000 tuples.

318
00:21:36,539 --> 00:21:42,539
And that's going to cost us 50 million IOs to do just a simple nested loop joint.

319
00:21:42,539 --> 00:21:46,539
And there's sort of a strawman presentation here.

320
00:21:46,539 --> 00:21:49,539
Okay, if you do a millisecond per IO, that's going to take 1.3 hours.

321
00:21:49,539 --> 00:21:51,539
That's ignoring caching entirely.

322
00:21:51,539 --> 00:21:53,539
There's no notion of an OS page cache here.

323
00:21:53,539 --> 00:21:55,539
There's no notion of a CPU cache here.

324
00:21:55,539 --> 00:21:59,539
This is just if you had to go to disk for every single page to do this operation,

325
00:21:59,539 --> 00:22:02,539
that's how long it's going to take you.

326
00:22:02,539 --> 00:22:05,539
And then if you switch the order of the tables,

327
00:22:05,539 --> 00:22:10,539
you get about 20% savings in your IOs and your execution time.

328
00:22:10,539 --> 00:22:14,539
So that's sort of a brief tease into why optimization is going to be important in the future,

329
00:22:14,539 --> 00:22:17,539
because even just something as simple as getting the joint order right on these

330
00:22:17,539 --> 00:22:26,539
can have a big difference in the query execution time when we go to actually run these.

331
00:22:26,539 --> 00:22:30,539
Oh, yeah, the last thing, these numbers are actually quite small.

332
00:22:30,539 --> 00:22:33,539
If you had 4 kill light pages, this is only about 6 megabytes of data,

333
00:22:33,539 --> 00:22:35,539
which again, this would fit in L3.

334
00:22:35,539 --> 00:22:37,539
So these are very small tables.

335
00:22:37,539 --> 00:22:38,539
This would fit in your L3 cache.

336
00:22:38,539 --> 00:22:40,539
You would actually be able to rip through this very quickly with a nested loop joint.

337
00:22:40,539 --> 00:22:45,539
So this is sort of an example of maybe you could get away with an index nested loop joint

338
00:22:45,539 --> 00:22:47,539
if you know your tables are very, very, very small.

339
00:22:47,539 --> 00:22:49,539
Like you don't need to do anything fancy.

340
00:22:49,539 --> 00:22:54,539
If you know they're going to fit in cache, because tables that small do exist in practice.

341
00:22:54,539 --> 00:22:57,539
So if you are doing a very simple joint,

342
00:22:57,539 --> 00:23:00,539
it may be the case you would want to do a nested loop joint,

343
00:23:00,539 --> 00:23:06,539
but in general we consider this bad in the common case.

344
00:23:06,539 --> 00:23:08,539
So how can we do better?

345
00:23:08,539 --> 00:23:11,539
We'll use the notion of locality here.

346
00:23:11,539 --> 00:23:15,539
I mean, that's pretty common in our designing computer software systems.

347
00:23:15,539 --> 00:23:20,539
So instead of just iterating for every single individual tuple in R

348
00:23:20,539 --> 00:23:22,539
and ripping through all of S,

349
00:23:22,539 --> 00:23:26,539
we're only going to do it for each page in R.

350
00:23:26,539 --> 00:23:30,539
So that's going to reduce the cost fairly significantly.

351
00:23:30,539 --> 00:23:35,539
So instead of, we're still going to have to pay this upfront cost.

352
00:23:35,539 --> 00:23:37,539
You know you're going to have to go through all of R.

353
00:23:37,539 --> 00:23:39,539
There's no getting around that.

354
00:23:39,539 --> 00:23:41,539
But instead of little M times N,

355
00:23:41,539 --> 00:23:45,539
so basically every tuple looking at every page in S,

356
00:23:45,539 --> 00:23:47,539
we're only going to do it for every page.

357
00:23:47,539 --> 00:23:50,539
And that's going to save us a bunch of IOs.

358
00:23:50,539 --> 00:23:55,539
And when the optimizer is choosing the joint order here,

359
00:23:55,539 --> 00:23:59,539
ideally we want the smaller table to be the outer table.

360
00:23:59,539 --> 00:24:02,539
And when it's reasoning about this sort of stuff,

361
00:24:02,539 --> 00:24:05,539
we're determining that based on the number of pages not the number of tuples.

362
00:24:05,539 --> 00:24:08,539
The number of tuples doesn't necessarily relate to the number of disk IOs

363
00:24:08,539 --> 00:24:14,539
we're more worried about the number of pages that's going to have to fetch from disk.

364
00:24:14,539 --> 00:24:17,539
So imagine in the case of,

365
00:24:17,539 --> 00:24:22,539
okay, you have your buffer pool, you have B buffers available total.

366
00:24:22,539 --> 00:24:25,539
We're going to use B minus 2 buffers for the outer table.

367
00:24:25,539 --> 00:24:29,539
That's because we're going to use one buffer for the output of the joint.

368
00:24:29,539 --> 00:24:37,539
We're going to use one buffer to sort of stream the other inner table.

369
00:24:37,539 --> 00:24:40,539
Does that make sense when I say like we're going to, like basically,

370
00:24:40,539 --> 00:24:43,539
we're going to try to use as many buffers in the buffer pool for the outer table.

371
00:24:43,539 --> 00:24:48,539
And then we're just going to keep two set aside for this, for the output from the joint.

372
00:24:48,539 --> 00:24:55,539
And the others just going to be going to be completely churning and ripping through S.

373
00:24:55,539 --> 00:25:00,539
And if we do that,

374
00:25:00,539 --> 00:25:03,539
yeah, okay, so we'll get to the IO cost here.

375
00:25:03,539 --> 00:25:05,539
So again, we've got M.

376
00:25:05,539 --> 00:25:07,539
So this is the case where the tables don't fit in memory.

377
00:25:07,539 --> 00:25:09,539
We have to rely on our buffer pool.

378
00:25:09,539 --> 00:25:14,539
And you can only hold M divided by B minus 2 in memory at a time.

379
00:25:14,539 --> 00:25:16,539
You multiply that by N.

380
00:25:16,539 --> 00:25:22,539
And our cost here, if it fits in memory, is only 1500 IOs.

381
00:25:22,539 --> 00:25:24,539
In that case, it's only 0.15 seconds.

382
00:25:24,539 --> 00:25:28,539
I think we were over an hour under, like sort of the strawman argument before.

383
00:25:28,539 --> 00:25:32,539
So it's a dramatic drop in IOs.

384
00:25:32,539 --> 00:25:37,539
My clicker is not behaving, I think.

385
00:25:37,539 --> 00:25:40,539
There we go.

386
00:25:40,539 --> 00:25:42,539
And then if it doesn't fit in memory,

387
00:25:42,539 --> 00:25:48,539
and we rely on a buffer pool that has 102 buffer pages, which I guess he did that to make the math easier,

388
00:25:48,539 --> 00:25:53,539
because two are going to be reserved for the inner table and the output.

389
00:25:53,539 --> 00:25:58,539
You get 6000 IOs, and then if the optimizer were to switch the joint order,

390
00:25:58,539 --> 00:26:05,539
you get 5,500 IOs.

391
00:26:05,539 --> 00:26:08,539
Okay.

392
00:26:08,539 --> 00:26:12,539
Still.

393
00:26:12,539 --> 00:26:18,539
So the nested loop joint is kind of just, oh yeah.

394
00:26:18,539 --> 00:26:25,539
So why do we want to bring the pages from the outer table,

395
00:26:25,539 --> 00:26:32,539
because we're leaving one of the inner one a lot more.

396
00:26:32,539 --> 00:26:38,539
You would end up swapping back and forth, I think, if you had the inner table as the one that you wanted to try to fit into memory.

397
00:26:38,539 --> 00:26:45,539
So for looping over the outer table, let's say we take this first block of the outer table,

398
00:26:45,539 --> 00:26:49,539
and then bring the rest of the inner pages into the buffer pool.

399
00:26:49,539 --> 00:26:55,539
Are we going to get rid of that first block of the inner table as soon as we're done with it?

400
00:26:55,539 --> 00:27:01,539
Yeah, but we can sort of coordinate that our own by just sort of like pinning it, I guess, or,

401
00:27:01,539 --> 00:27:06,539
because the inner table is always just going to be streaming through over and over and over again.

402
00:27:06,539 --> 00:27:13,539
So we want that to be in the buffer pool if you're going to stream over it, if you're continually getting stuff in it.

403
00:27:13,539 --> 00:27:17,539
Can I actually put the size of the buffer really giant?

404
00:27:17,539 --> 00:27:20,539
Well, it doesn't matter if it's going to be big.

405
00:27:20,539 --> 00:27:23,539
Well, if it's going to be big and you keep the stuff in the outer,

406
00:27:23,539 --> 00:27:25,539
it's inside of your buffer pool, right?

407
00:27:25,539 --> 00:27:27,539
Then your second loop will be giant.

408
00:27:27,539 --> 00:27:31,539
So you're going to have to replace that every time, so we can't fit all the intonate.

409
00:27:31,539 --> 00:27:34,539
Yeah, you're going to thrat.

410
00:27:34,539 --> 00:27:36,539
Yeah.

411
00:27:36,539 --> 00:27:37,539
Thanks.

412
00:27:37,539 --> 00:27:40,539
Whereas in the outer loop, there's the last chance of crashing the direction, because for each outer loop,

413
00:27:40,539 --> 00:27:43,539
you're going through as many inner loops.

414
00:27:43,539 --> 00:27:44,539
Right.

415
00:27:44,539 --> 00:27:46,539
Makes sense?

416
00:27:46,539 --> 00:27:49,539
Cool.

417
00:27:49,539 --> 00:27:52,539
Awesome.

418
00:27:52,539 --> 00:27:57,539
So yeah, like I was saying, these nested loop joins are basically just sort of a brute force.

419
00:27:57,539 --> 00:28:00,539
Like you're going to sequentially scan through the inner and the outer tables,

420
00:28:00,539 --> 00:28:03,539
and the inner tables case over and over and over again.

421
00:28:03,539 --> 00:28:10,539
And that's sort of what we're, we don't have a choice if we don't know anything really about the data.

422
00:28:10,539 --> 00:28:14,539
If there's no order here under the relational model.

423
00:28:14,539 --> 00:28:18,539
But if there's an index, we can use that to help us out here.

424
00:28:18,539 --> 00:28:25,539
So hopefully, if we're lucky, and this is where particularly true for allTP systems,

425
00:28:25,539 --> 00:28:29,539
if we get an index, we can choose an index, and we can do an index join instead.

426
00:28:29,539 --> 00:28:36,539
So what does that actually look like if we're going to use an index to do a join?

427
00:28:36,539 --> 00:28:38,539
The clicker is going to be grief again.

428
00:28:38,539 --> 00:28:45,539
So in this case, for each tuple, R and R, that's get used to that being the outer loop.

429
00:28:45,539 --> 00:28:48,539
Basically, there's no getting around looking at each one of these.

430
00:28:48,539 --> 00:28:54,539
But instead of having to iterate one at a time and then looping through and doing a sequential scan on the inner table,

431
00:28:54,539 --> 00:29:00,539
we can just do an index probe, assuming we have an index on SID, which would be great.

432
00:29:00,539 --> 00:29:04,539
Hopefully, that's the primary key on that table or something like that.

433
00:29:04,539 --> 00:29:09,539
And if there's a match in the index, then we can omit that tuple.

434
00:29:09,539 --> 00:29:15,539
So we basically remove looping over and over again around the inner table.

435
00:29:15,539 --> 00:29:20,539
We just have to do index probes for the tuples.

436
00:29:20,539 --> 00:29:28,539
So in this case, we sort of hand wave away and say that the cost of an index probe is some arbitrary constant C.

437
00:29:28,539 --> 00:29:33,539
That's because we don't actually know what it would be based on sort of what type of index it is.

438
00:29:33,539 --> 00:29:37,539
If it's a hash index, we're looking at something that's more constant time as opposed to like a B plus tree.

439
00:29:37,539 --> 00:29:39,539
So you look at something logarithmic.

440
00:29:39,539 --> 00:29:45,539
This also, you know, I said, hopefully this is maybe, well, this can't be a unique index because I see duplicate values there in ID.

441
00:29:45,539 --> 00:29:47,539
So that's not your primary key.

442
00:29:47,539 --> 00:29:49,539
There could be duplicates in this index.

443
00:29:49,539 --> 00:29:56,539
So it may not be exactly some beautiful data structures specific.

444
00:29:56,539 --> 00:30:02,539
You know, this is exactly how long this operation will take because we don't know the data distribution inside of this index.

445
00:30:02,539 --> 00:30:05,539
But we sort of hand wave that away as being some constant C.

446
00:30:05,539 --> 00:30:08,539
So the cost gets reduced to big M.

447
00:30:08,539 --> 00:30:10,539
You still got to look at everything in R.

448
00:30:10,539 --> 00:30:15,539
And then the number of tuples in R times this index operation, this index look up.

449
00:30:15,539 --> 00:30:17,539
Just look at the identity check.

450
00:30:17,539 --> 00:30:21,539
This only works if you're joining based off of two primary keys, right?

451
00:30:21,539 --> 00:30:26,539
So your question is this only works if you're joining on primary keys.

452
00:30:26,539 --> 00:30:29,539
Oh, like whatever key would I be stored in the index?

453
00:30:29,539 --> 00:30:32,539
It would have to be some sort of key in an index.

454
00:30:32,539 --> 00:30:33,539
Yeah, exactly.

455
00:30:33,539 --> 00:30:34,539
It doesn't have to be a primary key.

456
00:30:34,539 --> 00:30:36,539
You can have secondary indexes.

457
00:30:36,539 --> 00:30:40,539
But it would just have to be something that has an index on it already.

458
00:30:40,539 --> 00:30:45,539
It doesn't matter whether it's unique or what the constraint is there.

459
00:30:45,539 --> 00:30:48,539
But if there's an index, the optimizer will try to choose this.

460
00:30:48,539 --> 00:30:53,539
And this is really, I mentioned all TPP systems,

461
00:30:53,539 --> 00:30:56,539
mostly try to just do index nested loop joins if they can.

462
00:30:56,539 --> 00:30:58,539
Like most transactional systems.

463
00:30:58,539 --> 00:31:02,539
Like if you see your queries doing sequential scans,

464
00:31:02,539 --> 00:31:09,539
that's a hint that that's something you just want to build an index on and your transactions will run significantly faster.

465
00:31:09,539 --> 00:31:16,539
So the case of hash join is the BMS just on the fly building an index on the inner table.

466
00:31:16,539 --> 00:31:17,539
Right.

467
00:31:17,539 --> 00:31:18,539
So I mean, that's a great question.

468
00:31:18,539 --> 00:31:20,539
The question was like, is in a hash join,

469
00:31:20,539 --> 00:31:22,539
is it just sort of building a hash index on the fly?

470
00:31:22,539 --> 00:31:25,539
Yeah, this is sort of foreshadowing how a hash join works as well.

471
00:31:25,539 --> 00:31:28,539
Because it's basically an index join,

472
00:31:28,539 --> 00:31:32,539
but it's going to build a hash index on the fly.

473
00:31:32,539 --> 00:31:36,539
And I think SQL Server also, like,

474
00:31:36,539 --> 00:31:40,539
if it does an index, or excuse me, if it does,

475
00:31:40,539 --> 00:31:44,539
it can build sort of indexes on the fly as well if it benefits from this sort of situation

476
00:31:44,539 --> 00:31:46,539
where I think it's called a spooled index.

477
00:31:46,539 --> 00:31:50,539
Where it can sort of, yeah, sort of as you alluded to,

478
00:31:50,539 --> 00:31:53,539
a hash join is going to build the data structure and then probably throw it away.

479
00:31:53,539 --> 00:31:59,539
They can be smart and sort of keep that stuff around if they think it's going to be useful for future queries.

480
00:31:59,539 --> 00:32:03,539
But yes, this is sort of foreshadowing what's going to happen in a hash join.

481
00:32:03,539 --> 00:32:07,539
So, some takeaways from nested loop join.

482
00:32:07,539 --> 00:32:10,539
Pick the smaller table to be your outer table,

483
00:32:10,539 --> 00:32:12,539
try to get as much of it into memory as possible.

484
00:32:12,539 --> 00:32:15,539
And when you have to, you have to loop over the inner table,

485
00:32:15,539 --> 00:32:19,539
and ideally, you have an index on the attributes that you're using for the join key

486
00:32:19,539 --> 00:32:23,539
because that's going to save you a whole bunch of time.

487
00:32:23,539 --> 00:32:28,539
And so, and then we looked at sort of the naive, just two for loops.

488
00:32:28,539 --> 00:32:30,539
That's where the inner and outer table name comes from.

489
00:32:30,539 --> 00:32:37,539
Block nested loop join looks, it takes benefits from locality and then an index nested loop join.

490
00:32:37,539 --> 00:32:40,539
Do you have a new index in this key?

491
00:32:40,539 --> 00:32:41,539
Sure.

492
00:32:41,539 --> 00:32:44,539
So, if we already have a B plus 3 index,

493
00:32:44,539 --> 00:32:47,539
do we actually create another hash in this,

494
00:32:47,539 --> 00:32:51,539
if the one you do the index has a choice?

495
00:32:51,539 --> 00:32:54,539
So, the question is, if we already have a B plus 3 index,

496
00:32:54,539 --> 00:32:58,539
do we create a hash index if we want to do the index as a loop j?

497
00:32:58,539 --> 00:33:05,539
So, the C is a constant time look up.

498
00:33:05,539 --> 00:33:16,539
I think Andy's just using the heavy lifting here, just saying,

499
00:33:16,539 --> 00:33:17,539
there's some constant.

500
00:33:17,539 --> 00:33:22,539
If it's a B plus 3, it's going to be actually, like you said, logarithmic.

501
00:33:22,539 --> 00:33:25,539
So, I don't want to confuse the issue when I said, like,

502
00:33:25,539 --> 00:33:30,539
if we're doing a hash join, we don't build an index for an index nested loop join.

503
00:33:30,539 --> 00:33:32,539
We're relying on an index that already exists.

504
00:33:32,539 --> 00:33:35,539
If there's a B plus 3 there already, that's what we're going to use.

505
00:33:35,539 --> 00:33:41,539
The hope is the optimizer wouldn't then build a hash index on top of it, probably.

506
00:33:41,539 --> 00:33:44,539
I'm trying to think if there's any scenario where you would want to do a hash join,

507
00:33:44,539 --> 00:33:47,539
would a B plus 3 index is there, and I can't think of one.

508
00:33:47,539 --> 00:33:51,539
Because a B plus 3 also gives you the nice ordering as well,

509
00:33:51,539 --> 00:33:54,539
which you may or may not need in the query results.

510
00:33:54,539 --> 00:34:03,539
Like I said, we've got our takeaways here from the index nested loop join,

511
00:34:03,539 --> 00:34:06,539
and then the different algorithms we have within those.

512
00:34:06,539 --> 00:34:10,539
They're not always a terrible idea for, again, for transactional systems.

513
00:34:10,539 --> 00:34:18,539
It makes sense, and also if the tables are really, really small, just do an nested loop join.

514
00:34:18,539 --> 00:34:21,539
So, let's talk about the sort merge join.

515
00:34:21,539 --> 00:34:26,539
The sort merge join, the basic idea, there's two phases here.

516
00:34:26,539 --> 00:34:31,539
In the first, you're going to sort both tables using an algorithm like the external merge sort

517
00:34:31,539 --> 00:34:33,539
that Jignesh talked about on Monday.

518
00:34:33,539 --> 00:34:37,539
But all we really care about today is these two tables, they're going to be sorted.

519
00:34:37,539 --> 00:34:39,539
Use your favorite sorting algorithm.

520
00:34:39,539 --> 00:34:42,539
We're not reasoning too much about today how you make that happen.

521
00:34:42,539 --> 00:34:44,539
That's what Monday was for.

522
00:34:44,539 --> 00:34:49,539
And then in the second phase, you've got these two sorted tables,

523
00:34:49,539 --> 00:34:55,539
and you're just going to create cursors in each one, and you're just going to go in order and try to look for matches.

524
00:34:55,539 --> 00:35:00,539
And nice thing that this ordering gives you is you don't have to start all the way at the beginning for the inner table.

525
00:35:00,539 --> 00:35:04,539
Every single time you're going, as you're working down the outer table.

526
00:35:04,539 --> 00:35:11,539
So, the ordering here gives you some hopefully guarantees you don't need to backtrack as far.

527
00:35:11,539 --> 00:35:15,539
There are degenerate cases where you actually have to backtrack all the way back to the beginning every single time,

528
00:35:15,539 --> 00:35:21,539
and this sort of falls apart and turns into a nested loop join, or a nested loop join.

529
00:35:21,539 --> 00:35:24,539
But we can talk about that in a minute.

530
00:35:24,539 --> 00:35:32,539
So, I hate seeing code on a projector or pseudo code, but we're just going to step through this really briefly.

531
00:35:32,539 --> 00:35:36,539
So, step one, like I said, we're going to sort the two tables, R and S.

532
00:35:36,539 --> 00:35:40,539
We're going to create cursors, and we'll step through an example here in a moment.

533
00:35:40,539 --> 00:35:43,539
So, don't worry about grocking all of this right now.

534
00:35:43,539 --> 00:35:55,539
You get cursors at the top of each sorted relation, and you're just going to advance those cursors based on comparing the quality keys for greater or less than.

535
00:35:55,539 --> 00:35:58,539
And then if you have a match as you're sort of iterating through, you emit that.

536
00:35:58,539 --> 00:36:02,539
And then there are scenarios where you're going to need to backtrack, and we'll give an example of that in a minute.

537
00:36:02,539 --> 00:36:10,539
So, again, this is more for your reference when you're studying or need to understand how a startward join works.

538
00:36:10,539 --> 00:36:16,539
But let's go through an example, because I think it's more helpful.

539
00:36:16,539 --> 00:36:25,539
So, once again, we have tables, R and S. Step one, sort them.

540
00:36:25,539 --> 00:36:29,539
Beautiful.

541
00:36:29,539 --> 00:36:34,539
This clicker has given me so much grief today.

542
00:36:34,539 --> 00:36:39,539
Initialized cursors to the beginning of our sorted relations, and we're just going to do a comparison.

543
00:36:39,539 --> 00:36:42,539
And we're going to say, does SID match RID?

544
00:36:42,539 --> 00:36:45,539
It does emit that tuple.

545
00:36:45,539 --> 00:36:51,539
Go to the next tuple in S. So, we're still sort of working with this outer table, inner table notion.

546
00:36:51,539 --> 00:36:55,539
You'll see how this ordering helps us reduce how far we have to backtrack.

547
00:36:55,539 --> 00:36:59,539
We don't have to start all the way at the beginning when you move to the next tuple in R.

548
00:36:59,539 --> 00:37:01,539
We'll do another comparison.

549
00:37:01,539 --> 00:37:05,539
That's also a match. We'll emit that tuple.

550
00:37:05,539 --> 00:37:07,539
Beautiful.

551
00:37:07,539 --> 00:37:09,539
And we'll advance the cursor to the next one.

552
00:37:09,539 --> 00:37:14,539
And so, now we see that SID is now greater than RID.

553
00:37:14,539 --> 00:37:16,539
So, we need to advance the cursor in the outer table.

554
00:37:16,539 --> 00:37:20,539
And we do another comparison. And we see that there's a match. And we emit that tuple.

555
00:37:20,539 --> 00:37:22,539
Advance the cursor again.

556
00:37:22,539 --> 00:37:26,539
Once again, the SID is now greater than RID.

557
00:37:26,539 --> 00:37:31,539
So, we're going to advance the cursor in table R.

558
00:37:31,539 --> 00:37:35,539
And this is a scenario where we have to backtrack.

559
00:37:35,539 --> 00:37:37,539
We've advanced the cursor in R.

560
00:37:37,539 --> 00:37:40,539
We're still less than the inner table's value.

561
00:37:40,539 --> 00:37:44,539
So, we have to back the cursor up in the inner table.

562
00:37:44,539 --> 00:37:47,539
But, unlike a nested loop join, we don't have to go all the way to the beginning.

563
00:37:47,539 --> 00:37:50,539
We're relying on this ordering to not have to go as far.

564
00:37:50,539 --> 00:37:53,539
Go back to 200. Do a comparison. It's a match.

565
00:37:53,539 --> 00:37:55,539
We emit that tuple.

566
00:37:55,539 --> 00:37:57,539
Advance the inner cursor again.

567
00:37:57,539 --> 00:37:59,539
We're now less than 400.

568
00:37:59,539 --> 00:38:01,539
So, advance the outer cursor.

569
00:38:01,539 --> 00:38:04,539
We don't have to backtrack on the inner table on this one.

570
00:38:04,539 --> 00:38:07,539
We're still less than at the outer cursor.

571
00:38:07,539 --> 00:38:10,539
RID is less than SID. So, we're going to advance the cursor again.

572
00:38:10,539 --> 00:38:14,539
Do the comparison. Output that tuple.

573
00:38:14,539 --> 00:38:16,539
We're going to advance the inner cursor.

574
00:38:16,539 --> 00:38:19,539
Advance the inner cursor.

575
00:38:19,539 --> 00:38:22,539
We do another comparison.

576
00:38:22,539 --> 00:38:24,539
RID is less than SID.

577
00:38:24,539 --> 00:38:26,539
Advance the outer cursor.

578
00:38:26,539 --> 00:38:29,539
We get a match. We output that one.

579
00:38:29,539 --> 00:38:32,539
And we're at the end of SID.

580
00:38:32,539 --> 00:38:36,539
This example for some reason.

581
00:38:36,539 --> 00:38:40,539
There we go.

582
00:38:40,539 --> 00:38:42,539
Yes.

583
00:38:42,539 --> 00:38:47,539
We're backtracking to the very first occurrence.

584
00:38:47,539 --> 00:38:50,539
For example, there's only one 200 here,

585
00:38:50,539 --> 00:38:53,539
but there were multiple 200 in the table.

586
00:38:53,539 --> 00:38:55,539
All the way to the first 200?

587
00:38:55,539 --> 00:38:58,539
So, the question is, if there were multiple 200s in the inner table,

588
00:38:58,539 --> 00:39:01,539
would you backtrack to the first 200? Yes.

589
00:39:01,539 --> 00:39:06,539
Because you have to compare now this sort of second 200 at the outer relation to the inner relation.

590
00:39:06,539 --> 00:39:08,539
Makes sense?

591
00:39:08,539 --> 00:39:11,539
If you want to backtrack to the first 200 or something,

592
00:39:11,539 --> 00:39:14,539
it's like the previous embedding.

593
00:39:14,539 --> 00:39:23,539
Yes. So, the question is, you backtrack to the occurrence of the sort of the outer cursor's value, I guess.

594
00:39:23,539 --> 00:39:25,539
Yeah. That's basically how far you would have to backtrack.

595
00:39:25,539 --> 00:39:27,539
Anything that could possibly still satisfy the equality predicate,

596
00:39:27,539 --> 00:39:30,539
you have to make sure you backtrack far enough to check that.

597
00:39:30,539 --> 00:39:34,539
So, the question is, how are you going to store that?

598
00:39:34,539 --> 00:39:37,539
You could basically memoize that, right?

599
00:39:37,539 --> 00:39:40,539
Like, you could basically just keep track of, okay,

600
00:39:40,539 --> 00:39:42,539
when I met a new cursor value here,

601
00:39:42,539 --> 00:39:45,539
where was the first place I had a match in the inner table?

602
00:39:45,539 --> 00:39:47,539
So, that the next time you have to advance this one,

603
00:39:47,539 --> 00:39:49,539
you just jump right back to that one.

604
00:39:49,539 --> 00:39:50,539
You could...

605
00:39:50,539 --> 00:39:52,539
You're like, throw the table, it's all the same.

606
00:39:52,539 --> 00:39:53,539
You could store that.

607
00:39:53,539 --> 00:39:56,539
I could probably hold a record of that.

608
00:39:57,539 --> 00:40:01,539
I could probably hold a record ID in a variable, right?

609
00:40:01,539 --> 00:40:04,539
Just a 32-bit integer or something like that,

610
00:40:04,539 --> 00:40:09,539
to hold the record ID in this table that just knows how far I have to backtrack to for this current cursor.

611
00:40:09,539 --> 00:40:14,539
How are you going to store one for our IDs current index?

612
00:40:14,539 --> 00:40:16,539
That's the one you need to store.

613
00:40:16,539 --> 00:40:22,539
You need to store the index or the tuple ID or the record ID on the inner table

614
00:40:22,539 --> 00:40:25,539
for how far you need to backtrack to for the current outer key.

615
00:40:25,539 --> 00:40:26,539
Is that make sense?

616
00:40:26,539 --> 00:40:27,539
Cool.

617
00:40:28,539 --> 00:40:30,539
Did that check out for everyone else too?

618
00:40:30,539 --> 00:40:32,539
I'm not making that up.

619
00:40:32,539 --> 00:40:33,539
Okay.

620
00:40:36,539 --> 00:40:38,539
You guys are going to have to call me on this.

621
00:40:38,539 --> 00:40:39,539
I've never given this lecture.

622
00:40:39,539 --> 00:40:41,539
So, if it sounds like that's not right,

623
00:40:41,539 --> 00:40:43,539
tell me if something doesn't pass the smell test.

624
00:40:46,539 --> 00:40:47,539
20 minutes later?

625
00:40:47,539 --> 00:40:48,539
Yeah.

626
00:40:48,539 --> 00:40:51,539
So, you only backtracked within the outer joins,

627
00:40:51,539 --> 00:40:53,539
the ID is very simple, right?

628
00:40:54,539 --> 00:40:57,539
So, the question is, you only backtrack in...

629
00:40:57,539 --> 00:41:02,539
The case where the outer ID is hurt people when you move through an x cursor?

630
00:41:02,539 --> 00:41:04,539
Only when it's equal.

631
00:41:04,539 --> 00:41:08,539
I guess the number could be used by leading the backdrop and we hit 300 and R

632
00:41:08,539 --> 00:41:11,539
and we're still at 400 in the chat.

633
00:41:11,539 --> 00:41:13,539
So, in this one?

634
00:41:13,539 --> 00:41:14,539
Yeah.

635
00:41:14,539 --> 00:41:17,539
So, we...

636
00:41:18,539 --> 00:41:20,539
We can go back here to the stream,

637
00:41:20,539 --> 00:41:22,539
we don't think we'd backtrack.

638
00:41:22,539 --> 00:41:23,539
So, like, we have to know that...

639
00:41:23,539 --> 00:41:24,539
So, yeah, we can go back to the stream.

640
00:41:24,539 --> 00:41:29,539
Yeah, like, nothing satisfied the join predicate for 300.

641
00:41:29,539 --> 00:41:33,539
So, we probably wouldn't have it cached that anything was there that we need to jump back to,

642
00:41:33,539 --> 00:41:37,539
that there was no index for that in the inner table.

643
00:41:37,539 --> 00:41:39,539
Yeah, it's just an optimization.

644
00:41:39,539 --> 00:41:41,539
You wanted to go back to the pseudocoder?

645
00:41:41,539 --> 00:41:44,539
Yeah, just one second.

646
00:41:44,539 --> 00:41:47,539
One second.

647
00:41:47,539 --> 00:41:50,539
Oh, okay.

648
00:41:55,539 --> 00:41:59,539
So, it's in the scenario where you have to increment the outer table's cursor.

649
00:41:59,539 --> 00:42:03,539
You need to know, potentially, how far you need to backtrack on the inner table,

650
00:42:03,539 --> 00:42:08,539
because you may have advanced past two pulls that would still satisfy the join predicate.

651
00:42:09,539 --> 00:42:12,539
Yeah.

652
00:42:14,539 --> 00:42:16,539
Cool.

653
00:42:16,539 --> 00:42:18,539
So, how do we cost this thing?

654
00:42:18,539 --> 00:42:22,539
The sort cost for RNS comes from the lecture on Monday.

655
00:42:22,539 --> 00:42:26,539
And so, I'm not going to discuss that math, because math is scary.

656
00:42:26,539 --> 00:42:31,539
And the merge cost is you just have to look at every single page in both relations.

657
00:42:31,539 --> 00:42:33,539
So, it's just m plus n.

658
00:42:33,539 --> 00:42:39,539
And so, in this case, the high-pollin intent is going to be typically the sorting process.

659
00:42:39,539 --> 00:42:45,539
And we'll get some clicking going again.

660
00:42:45,539 --> 00:42:48,539
And so, again, here's our hard numbers.

661
00:42:48,539 --> 00:42:53,539
I think those table sizes have more or less stayed the same.

662
00:42:53,539 --> 00:42:57,539
If they haven't, that makes this difficult.

663
00:42:57,539 --> 00:43:02,539
We've got the sort cost that's going to be 4,000 IOs for R,

664
00:43:02,539 --> 00:43:07,539
for S is 2,000 IOs, and then the merge cost is only 1,500, add those up to 1,500.

665
00:43:07,539 --> 00:43:12,539
And again, this sort of straw-man IO cost of 1 millisecond per access to the disk

666
00:43:12,539 --> 00:43:19,539
is going to take less than a second to perform the sort merge join.

667
00:43:19,539 --> 00:43:25,539
So, I mentioned this before.

668
00:43:25,539 --> 00:43:31,539
There's a degenerate case here for the sort merge join, where what if every attribute

669
00:43:31,539 --> 00:43:33,539
has the exact same values?

670
00:43:33,539 --> 00:43:36,539
You're going to pay the cost to sort it all.

671
00:43:36,539 --> 00:43:39,539
And then you're still going to have to, like, you're going to have to backtrack also

672
00:43:39,539 --> 00:43:43,539
in every single iteration on the inner table.

673
00:43:43,539 --> 00:43:49,539
And this will just sort of devolve to a nested loop join, plus you paid to sort it first.

674
00:43:49,539 --> 00:43:56,539
So, in practice, if someone makes a, oh, this shouldn't happen.

675
00:43:56,539 --> 00:43:59,539
If someone makes an attribute, call them on a big table.

676
00:43:59,539 --> 00:44:04,539
That's all got one value, and they want to join on that.

677
00:44:04,539 --> 00:44:06,539
And they did a bad job.

678
00:44:06,539 --> 00:44:09,539
And then there are also other things in database systems we can do to sort of help us out here.

679
00:44:09,539 --> 00:44:10,539
There's things called zone maps.

680
00:44:10,539 --> 00:44:15,539
There's other things we can know about the distribution and the cardinality of an individual column

681
00:44:15,539 --> 00:44:19,539
that would maybe help us know, hey, don't sort this column.

682
00:44:19,539 --> 00:44:24,539
It's a column that's just a billion ones, or something like that.

683
00:44:24,539 --> 00:44:34,539
Database systems sort of usually, we usually have things to stop people from doing something too crazy like that.

684
00:44:34,539 --> 00:44:36,539
So, when is it useful?

685
00:44:36,539 --> 00:44:41,539
It would be great if one or both of the tables is already sorted on the join key.

686
00:44:41,539 --> 00:44:43,539
That would be beautiful.

687
00:44:43,539 --> 00:44:48,539
Or it may be the case that you want your output ordered for the eventual output.

688
00:44:48,539 --> 00:44:52,539
So, in case of an order by clause or something like that, the database system may say,

689
00:44:52,539 --> 00:44:54,539
well, I'm going to have to sort this anyway.

690
00:44:54,539 --> 00:44:59,539
I might as well just go for a sort merge join.

691
00:44:59,539 --> 00:45:01,539
And it doesn't necessarily have to be sorted first.

692
00:45:01,539 --> 00:45:05,539
It could have been an operation below like an index probe that's like a B plus tree that provides ordering.

693
00:45:05,539 --> 00:45:07,539
It could be producing the inputs.

694
00:45:07,539 --> 00:45:09,539
These may not be base tables underneath.

695
00:45:09,539 --> 00:45:11,539
They may be index probes or something like that.

696
00:45:11,539 --> 00:45:13,539
That could be producing ordered data into the operator.

697
00:45:13,539 --> 00:45:17,539
And then the optimizer will know, I could use a sort merge join here because my inputs are already going to be sorted.

698
00:45:17,539 --> 00:45:19,539
So, I don't have to pay the sort cost.

699
00:45:19,539 --> 00:45:20,539
Did you have a question?

700
00:45:20,539 --> 00:45:22,539
I would exactly do the question.

701
00:45:22,539 --> 00:45:26,539
Why would you prefer sort of doing a load of something that has been asked to be sorted?

702
00:45:26,539 --> 00:45:29,539
Like, being in an index probe.

703
00:45:29,539 --> 00:45:30,539
Right.

704
00:45:30,539 --> 00:45:31,539
Yeah.

705
00:45:31,539 --> 00:45:34,539
Yeah, so sometimes if the optimizer knows stuff coming in is already ordered.

706
00:45:34,539 --> 00:45:38,539
And this was sort of what I alluded to earlier that Andy hasn't actually confirmed for me.

707
00:45:38,539 --> 00:45:41,539
Like, my sequel, I mentioned, got the hash join in 2019.

708
00:45:41,539 --> 00:45:44,539
That sounds like it got a disease.

709
00:45:44,539 --> 00:45:48,539
They added hash join support to my sequel as late as 2019.

710
00:45:48,539 --> 00:45:54,539
My sequel storage engine is in ODB and it always clusters its data on a primary key.

711
00:45:54,539 --> 00:46:03,539
So, if tables are commonly being joined on primary key, well one you probably have an index anyway.

712
00:46:03,539 --> 00:46:05,539
But again, in ODB is also sorted already.

713
00:46:05,539 --> 00:46:07,539
It's already basically clustered.

714
00:46:07,539 --> 00:46:12,539
So, they may have decided in, for a long time in my sequel, we can just always rely on index or sort merge joins.

715
00:46:12,539 --> 00:46:14,539
And we don't really need a hash join.

716
00:46:14,539 --> 00:46:17,539
But eventually they came along and added it.

717
00:46:17,539 --> 00:46:21,539
Which gets me to the hash join.

718
00:46:21,539 --> 00:46:23,539
The big one.

719
00:46:23,539 --> 00:46:33,539
So, the basic properties we're going to rely on here is, okay, if two tuples or if tuples in RNS are going to satisfy the join predicate,

720
00:46:33,539 --> 00:46:42,539
the hope is they're going to have some, if we've picked a reasonable hash function, if you hash those values,

721
00:46:42,539 --> 00:46:44,539
we're also going to hash to the same value.

722
00:46:44,539 --> 00:46:51,539
So, we can rely on a hash table here to make our lookups more efficient.

723
00:46:51,539 --> 00:46:54,539
And I'll show you how that happens.

724
00:46:54,539 --> 00:46:59,539
And in some cases, we're basically on the flag and available to hash table on the outer table.

725
00:46:59,539 --> 00:47:02,539
And then we're going to do lookups on the inner table using that same hash function.

726
00:47:02,539 --> 00:47:07,539
And whenever there's a match, we emit a tuple.

727
00:47:07,539 --> 00:47:10,539
And there's an illusion here to partitioning and stuff like that.

728
00:47:10,539 --> 00:47:11,539
We'll get to that.

729
00:47:11,539 --> 00:47:17,539
We're basically talking about what happens if a bucket start overflowing or your hash table doesn't fit in memory.

730
00:47:17,539 --> 00:47:20,539
But the basic idea is, you're going to build a hash index, like you said before.

731
00:47:20,539 --> 00:47:23,539
You're going to build a hash index on one of the tables.

732
00:47:23,539 --> 00:47:26,539
And then on the other table, you're just going to scan along, apply the hash function.

733
00:47:26,539 --> 00:47:28,539
And if you get a match, you're going to emit that tuple.

734
00:47:28,539 --> 00:47:30,539
So, there's two phases here.

735
00:47:30,539 --> 00:47:34,539
We've got the build phase, which I described sort of briefly a moment ago.

736
00:47:34,539 --> 00:47:37,539
And then on the outer table, you're going to apply some hash function.

737
00:47:37,539 --> 00:47:40,539
You're going to build a hash table.

738
00:47:40,539 --> 00:47:43,539
Choose whatever hash table you want.

739
00:47:43,539 --> 00:47:46,539
But I think you guys have discussed hashing already.

740
00:47:46,539 --> 00:47:50,539
In this case, you generally want to use linear probing.

741
00:47:50,539 --> 00:47:53,539
And then in the probe phase, you're going to go along the inner relation.

742
00:47:53,539 --> 00:47:57,539
You're going to hash each tuple on the join key.

743
00:47:57,539 --> 00:48:01,539
And anywhere you get a match in the hash table, you're going to emit that tuple into the query plan.

744
00:48:01,539 --> 00:48:04,539
So, what does this look like?

745
00:48:04,539 --> 00:48:07,539
Step one, build hash table.

746
00:48:07,539 --> 00:48:14,539
And then for each tuple in S, I think I've said this a few times now, but I like to see it with the graphics.

747
00:48:14,539 --> 00:48:16,539
Okay, so we're going to build the hash table.

748
00:48:16,539 --> 00:48:20,539
Scan all the way through R using hash function one.

749
00:48:20,539 --> 00:48:27,539
And then we're going to apply the same hash function to the second table, or the second relation.

750
00:48:27,539 --> 00:48:32,539
And then anywhere there's a match, we emit that tuple.

751
00:48:32,539 --> 00:48:37,539
So, what is in this hash table?

752
00:48:37,539 --> 00:48:39,539
One, you need the key.

753
00:48:39,539 --> 00:48:42,539
You have to keep that around from the join key.

754
00:48:42,539 --> 00:48:47,539
You can't just build the hash table and then just keep like just a record ID sitting there with it.

755
00:48:47,539 --> 00:48:50,539
You have to keep the original key because it made the case that there's a collision on this hash function.

756
00:48:50,539 --> 00:48:54,539
And you still have to do a comparison of was this a real match?

757
00:48:54,539 --> 00:49:05,539
Just because I hashed to the same value in the hash table, you still have to do the key comparison just to make sure it wasn't sort of like a asperiace collision or any sort of like misplaced tuple in the hash table.

758
00:49:05,539 --> 00:49:09,539
It had to like move for linear probing.

759
00:49:09,539 --> 00:49:12,539
And then this gets to sort of the discussion earlier.

760
00:49:12,539 --> 00:49:14,539
We had with earlier versus late materialization.

761
00:49:14,539 --> 00:49:16,539
Do you put the value in the hash table with it?

762
00:49:16,539 --> 00:49:17,539
Maybe.

763
00:49:17,539 --> 00:49:20,539
Some people put just a record ID again.

764
00:49:20,539 --> 00:49:23,539
It depends like all things in these systems designs.

765
00:49:23,539 --> 00:49:29,539
It just depends on what works best for the system that you're designing, whether you want to materialize this and keep it in the hash table.

766
00:49:29,539 --> 00:49:34,539
And that's sort of going to become the canonical materialization of the data that you need to go back to later.

767
00:49:34,539 --> 00:49:41,539
Or if you just want something that is like an entry or an offset into something you may have materialized already.

768
00:49:41,539 --> 00:49:47,539
A different memory buffer.

769
00:49:47,539 --> 00:49:56,539
So we have a brief discussion now of probed filter of what's called a probe filter that relies on a data structure called a bloom filter.

770
00:49:56,539 --> 00:50:00,539
There's a much longer example in fall 2022.

771
00:50:00,539 --> 00:50:07,539
So if you really want to see how a bloom filter works like going to sort of the bit logic and stuff like that.

772
00:50:07,539 --> 00:50:11,539
We've pruned it for time, but they're pretty interesting data structures.

773
00:50:11,539 --> 00:50:22,539
The basic idea with this probe filter is before you do the hash table look up, you look in this data structure that checks to see if the key is going to be present in the hash table.

774
00:50:22,539 --> 00:50:24,539
Because it's typically a much smaller data structure.

775
00:50:24,539 --> 00:50:29,539
These bloom filters can typically fit in a CPU cache.

776
00:50:29,539 --> 00:50:36,539
It's just going to be much more efficient typically to use a bloom filter to look up first than it is going to be in a hash table.

777
00:50:36,539 --> 00:50:42,539
Now, you may be wondering like, okay, well, why wouldn't you just use a bloom filter instead of a hash table?

778
00:50:42,539 --> 00:50:47,539
It's because these are probabilistic data structures so they can have...

779
00:50:47,539 --> 00:50:51,539
They can never have a false negative. They're never going to say, oh, that is not in the set.

780
00:50:51,539 --> 00:50:56,539
But it's possible they could do a false positive and say, yes, this look up that you're doing is in the set.

781
00:50:56,539 --> 00:51:02,539
And then you have to go to the hash table and actually that's your ground truth of whether it's actually going to satisfy the join predicate.

782
00:51:02,539 --> 00:51:06,539
But in practice, these bloom filters can save a lot of hash table lookups.

783
00:51:06,539 --> 00:51:08,539
So what does that actually look like?

784
00:51:08,539 --> 00:51:14,539
We're joining A and B for some reason because why it's not R and S.

785
00:51:14,539 --> 00:51:16,539
But we're joining A and B.

786
00:51:16,539 --> 00:51:25,539
And while we're building our hash table on A, we're also going to build a bloom filter.

787
00:51:25,539 --> 00:51:38,539
Because we have to scan the data anyway. And then when it comes to the probe phase, we're going to first look up in the bloom filter if the tuple and if the key attribute in B satisfies the bloom filter.

788
00:51:38,539 --> 00:51:45,539
If it doesn't, you move on to the next one. And then if it does, only then do you go to the hash table.

789
00:51:45,539 --> 00:51:54,539
The reason this is helpful as well, again, in a disk-based system, these hash tables may not sit in memory. They may have to spill the disk, which we're going to talk about very shortly.

790
00:51:54,539 --> 00:52:07,539
But this will also sort of motivate why something like a bloom filter is helpful to sort of prune out hash table lookups ahead of time.

791
00:52:07,539 --> 00:52:09,539
Clicker. There we go.

792
00:52:09,539 --> 00:52:18,539
So as I alluded to, what happens if you don't have enough memory for your entire hash table?

793
00:52:18,539 --> 00:52:25,539
Hash tables are sorry, go ahead.

794
00:52:25,539 --> 00:52:42,539
Generally, yeah, you're still going to probably want to do the bloom filter lookup first because it's probably going to have a better chance of staying warm in your CPU cache.

795
00:52:42,539 --> 00:52:51,539
Depending on your hash table implementation, they're not as cache friendly. We're going to have to jump around through pointers, especially for linear probing and such.

796
00:52:51,539 --> 00:53:07,539
Usually, we would probably just do the bloom filter lookup first. But I think even in memory systems, often rely on bloom filters before they do a hash lookup.

797
00:53:07,539 --> 00:53:22,539
So, one bloom filter for the entire table. So it's a data structure in this case that they're going to, so the question is, would you have a bloom filter for the entire table? That was the question.

798
00:53:22,539 --> 00:53:32,539
If you're doing it the way it's described in sort of the previous slide, where it's built on the fly, you're just building this bloom filter on the join attribute.

799
00:53:32,539 --> 00:53:47,539
However, that predicate is. In practice, systems keep these bloom filters around. Again, it's supplemental data structures. They build them as they go, maybe similar to, I think I mentioned zone maps before.

800
00:53:47,539 --> 00:53:56,539
But there's an optimization that database systems may build these on the fly to help with other query execution, sort of like an index as well.

801
00:53:56,539 --> 00:54:08,539
But for this example here, where we're just talking about how you could use a bloom filter as a filter in a hash join, you just build it dynamically just on the join attribute and then you discard it.

802
00:54:08,539 --> 00:54:19,539
And then I'll come back to you.

803
00:54:19,539 --> 00:54:31,539
So the question is, we talked about index join before, and if we use a hash index for that is that different than this. Conceptually, not really, it just depends on when is the hash table being built.

804
00:54:31,539 --> 00:54:48,539
So what I'm describing here is sort of an ephemeral hash table. This is used for query execution and then is generally discarded. Whereas if you're using a hash join, you're relying on a permanent data structure or permanent persistent data structure that it can reuse over and over again across multiple query.

805
00:54:48,539 --> 00:55:14,539
So I have a follow up on the bloom filter. So if I remember correctly, is he's built a bloom filter on all of the rows on the attribute value of all of the rows in the relation than the probability for a false positive is slightly higher than say you have two or three bloom filters built on a subset of the roles of the attribute value.

806
00:55:14,539 --> 00:55:32,539
So your statement and question is that from your recollection, if you instead of building a very large bloom filter of a very wide one that incorporates all like sort of the the tuples attributes, it's better to sort of layer bloom filters based on different individual attributes or a subset of the attributes.

807
00:55:32,539 --> 00:56:01,539
In practice, yeah, bloom filters are often multilayered with how they do these sorts of things. I mentioned that there's we talk about bloom filters longer, I think in last year's version of this lecture, there's also a link to like a bloom filter calculator that can basically say for how many keys, how wide is the attribute, how big does my bloom filter need to be in order to give me some sort of bound on false positives or and you can sort of play with the numbers or you could, yeah, you could Google bloom filter calculator.

808
00:56:01,539 --> 00:56:08,539
But yeah, because they're probabilistic data structures, there's tradeoffs here with you're going to trade off space versus false positives.

809
00:56:11,539 --> 00:56:14,539
Cool, yeah, bloom filters are cool.

810
00:56:16,539 --> 00:56:26,539
There was also, as just as inside, there was a research project here with one of Andy's students about six or seven years ago called surf succinct range filters and they're very similar concept.

811
00:56:26,539 --> 00:56:33,539
They're basically a probabilistic data structure. Bloom filters only allow you to test on is something in the set or not in the set.

812
00:56:33,539 --> 00:56:42,539
This basically was like a bloom filter, but for range queries and it's actually been pretty widely adopted in quite a few systems since that paper was published a few years ago.

813
00:56:42,539 --> 00:56:47,539
So if you're interested in bloom filters, go read the surf paper.

814
00:56:47,539 --> 00:56:56,539
So as I mentioned, what happens if your hash table doesn't fit in memory? So, okay, I thought there was a question.

815
00:56:56,539 --> 00:57:01,539
And that's where something called the partition hash join comes in.

816
00:57:01,539 --> 00:57:10,539
We're going to basically partition the table first and then we're going to basically probe within each partition.

817
00:57:10,539 --> 00:57:23,539
So we're sort of like up or yeah, I don't know how to describe this just using the word partition again, but we're basically going to segment these relations into small chunks that allow us to keep this sort of information that we need in memory.

818
00:57:23,539 --> 00:57:31,539
You'll hear it for a do sometimes the grace hash join. It was a project out of the University of Tokyo, I think, yeah, in the 80s.

819
00:57:31,539 --> 00:57:43,539
This was something called a database machine, which I guess is a link. I don't know where that links to, but it's sort of this idea of you had these very special purpose computers that were designed just for database processing.

820
00:57:43,539 --> 00:57:54,539
They would design hardware specifically just to compute things like joins and ultimately what killed it in the 80s was Moore's law.

821
00:57:54,539 --> 00:58:09,539
You would spend a year, two years, three years designing the specialized system that could process your database queries. And by then Intel had put out the next generation of X86, particularly when you get to the 90s as well.

822
00:58:09,539 --> 00:58:20,539
And it crushed you in performance. At that point, we were still getting so much faster every year or two. So that sort of killed the database machine idea then.

823
00:58:20,539 --> 00:58:32,539
This is an example of one that Andy knows of again from the 80s. This was from Britain Lee, I think. And yeah, I don't know. Andy finds that I'm using a dude just sitting in a tie using a database.

824
00:58:32,539 --> 00:58:49,539
But this idea came around again. Like a lot of things in database systems and computer software systems and just this field in general. This idea came around again and you had these companies like like Teradata and Atiza, probably the most well-known database machine was Oracle's exit data.

825
00:58:49,539 --> 00:59:01,539
And you could buy these million dollar racks full of very specialized hardware and sort of made them database machines as they were putting specific hardware in there for query processing, things like FPGA's specialized CPUs.

826
00:59:01,539 --> 00:59:16,539
What kind of what kind of what took the steam out of this wave, I think, was the cloud era. So we went from because there was a brief window where this seemed like a great idea, right? We're death of Moore's law.

827
00:59:16,539 --> 00:59:27,539
We're getting reduced gains in CPU year over year and people like specialized hardware. Yes, this is the solution. But then people got less interested in specialized hardware and running on pram.

828
00:59:27,539 --> 00:59:42,539
They wanted to run on commodity hardware in the cloud. There's still highly specialized systems like yellow brick exists. We did a we had a seminar series talked from them about a year ago on the YouTube channel, which is really interesting about how they built sort of a specialized database system.

829
00:59:42,539 --> 00:59:53,539
And now they've deployed it in a cloud setting that's bordering on like a unicronal design where they basically boot the operating system and then they never make another system call again in the database system owns everything.

830
00:59:53,539 --> 01:00:05,539
It's a pretty cool system. So if that's interesting, there's a seminar talk on that on the database groups YouTube channel back to the partition hash join.

831
01:00:07,539 --> 01:00:10,539
This slide is exactly the same.

832
01:00:10,539 --> 01:00:24,539
So the basic idea is we're going to hash this into hash the outer table R into into a sequence of buckets. We're going to use the same hash function on the interrelation s to create buckets of its own.

833
01:00:24,539 --> 01:00:32,539
And what you can do is you can now spill these buckets to disk because we're using the same hash function here.

834
01:00:32,539 --> 01:00:38,539
Keys that hash into sort of this first bucket from from table R.

835
01:00:38,539 --> 01:00:45,539
We only have to compare sort of bucket at a time. We don't have to worry about keeping this all in memory.

836
01:00:45,539 --> 01:01:03,539
As we do the comparison. So you can just go down through these buckets, do the comparisons and then you emit those tuples. You don't have to worry about keeping all this at the entire hash table in memory.

837
01:01:03,539 --> 01:01:13,539
And in this case, you would want to use a different hash function when you're comparing the two or you could just sort of directly compare the you could almost do like a nested loop joint inside of these buckets depending on how big they are.

838
01:01:13,539 --> 01:01:19,539
You don't actually need to worry about hashing again. But if you were hashing, you would want to use probably a different hash function.

839
01:01:19,539 --> 01:01:32,539
So there's a few edge cases here. What if a partition doesn't fit in memory? Well, then you have to recursively partition it. You have to choose a different hash function for that specific bucket.

840
01:01:32,539 --> 01:01:48,539
So you can create more buckets and hash those. And there's also this option where like if the single join key has so many matching records sort of the degenerate case I said before with the sort merge join.

841
01:01:48,539 --> 01:01:53,539
The hash join is not going to really help you here because everything's going to hash into the same bucket and then you're going to have to do secondary hashing on all that.

842
01:01:53,539 --> 01:02:03,539
So you're going to probably hashing to the same bucket. So this would be a this would be a there's sort of degenerate cases here that you have to reason about with a hash join.

843
01:02:03,539 --> 01:02:07,539
So what does recursive partitioning look like in this case.

844
01:02:07,539 --> 01:02:17,539
We have this first hash hash function on R and we have a bunch of tuples that are hashing into this bucket and that's causing a problem for us because this bucket's now full.

845
01:02:17,539 --> 01:02:30,539
And actually have to. There we go throw a second hash function at at this bucket one and then you end up with bucket like one prime one double prime one triple prime.

846
01:02:30,539 --> 01:02:43,539
And then you're going to go hash table S and the important thing to note here you have to make sure even if even if this bucket one weren't going to spill for the inner table.

847
01:02:43,539 --> 01:02:48,539
You have to do the double hashing now because we have to make sure that.

848
01:02:48,539 --> 01:03:06,539
To pulls that hash into this bucket with the second hash function after spilling we make sure we check those from the inner relation if you if you only hash once or if you didn't do that you wouldn't necessarily be able to to to look at all the data you needed to you don't want to accidentally skip anything.

849
01:03:06,539 --> 01:03:13,539
So what is the cost of the hash join in the great case and you don't need recursive partitioning.

850
01:03:13,539 --> 01:03:22,539
It's just three times looking at every page so we had the partition phase we're going to read and write both tables.

851
01:03:22,539 --> 01:03:35,539
And plus NIOs and you're going to have to do that twice for the for the reading the right and in the probe phase you're just going to go through each table one more time.

852
01:03:35,539 --> 01:03:41,539
Interesting. That was just interesting that we actually reason about rights on this.

853
01:03:41,539 --> 01:03:46,539
Join out for them when we generally have not really thought about rights.

854
01:03:46,539 --> 01:03:50,539
Or outputs. So again we'll put the same numbers on it.

855
01:03:50,539 --> 01:03:55,539
What does the cost analysis look like 4,500 IOs in this case 0.45 seconds.

856
01:03:55,539 --> 01:03:59,539
I just wander too far I think.

857
01:03:59,539 --> 01:04:01,539
Wait did I get a real number?

858
01:04:01,539 --> 01:04:08,539
Okay. So if the keys are skewed we have this pro oh yeah.

859
01:04:08,539 --> 01:04:17,539
So if you do have to do the recursive ashi how do you present about the time the cost.

860
01:04:17,539 --> 01:04:24,539
So the question is if you have to do the recursive partitioning how do you reason about the cost.

861
01:04:24,539 --> 01:04:38,539
My answer to that is this is the only thing you should be responsible for on the midterm and I will make sure that's true with Andy because as far as I know it's not in any other slides and we don't actually put any sort of cost on the recursive partitioning.

862
01:04:38,539 --> 01:04:48,539
It's hard to say in practice because when you're talking about recursive partitioning it's dependent on your data distribution at that point.

863
01:04:48,539 --> 01:04:54,539
So the degenerate case is everything hashes into one and it sort of devolves.

864
01:04:54,539 --> 01:05:03,539
You could probably yeah without noting a data distribution I don't think you could actually put a reasonable sort of approximation on it.

865
01:05:03,539 --> 01:05:07,539
Maybe someone in the YouTube comments will tell me I'm wrong.

866
01:05:07,539 --> 01:05:27,539
So the question is what order do you do this in and because in the second hash you may have spilling as well right.

867
01:05:27,539 --> 01:05:43,539
So in practice yeah I don't know what a real system would do here in practice you've very very rarely would ever go beyond two rounds it just doesn't seem to really happen.

868
01:05:43,539 --> 01:06:03,539
But it's a good question and it's a good thing to think about is like sort of these degenerate cases when you're actually implementing these sorts of things but in practice you sort of Andy can gleeve this out.

869
01:06:03,539 --> 01:06:14,539
So his statement is the whole reason we're here with a partitioned hash table in the first place is the outer relations hash table didn't fit in memory so we're going to have to spill that and while we're building our inner hash table as well that's going to have to spill as well.

870
01:06:14,539 --> 01:06:29,539
So like as you're streaming it you're reading or streaming it sorry you're reading one one page at a time that you're writing one page at a time like that's how I think about is that is that correct.

871
01:06:29,539 --> 01:06:45,539
Yeah in the absence of us having any sort of constant here of talking about like the buffer pool size and introducing some constant B and reasoning about that I think the notion of just sort of streaming a page at a time from each table is probably the right way to think about these algorithms.

872
01:06:45,539 --> 01:06:59,539
Because this is sort of in the absence of it is a little bizarre that sometimes we talk about what this would do with a buffer pool and what it wouldn't but when we're generally just thinking about these algorithms we were just thinking there's no buffer pool.

873
01:06:59,539 --> 01:07:05,539
And just what it what would be the the I.O. cost.

874
01:07:05,539 --> 01:07:10,539
So there's an optimization we can do in the case of sort of very skewed keys that time right.

875
01:07:10,539 --> 01:07:12,539
Yeah.

876
01:07:12,539 --> 01:07:14,539
We have 11 minutes is that right.

877
01:07:14,539 --> 01:07:17,539
Okay.

878
01:07:17,539 --> 01:07:29,539
If your keys are very skewed and you notice a lot of things going into the same buckets you can you can have this notion of a hot partition where you basically just say okay these keys are are hashing over and over again to this same partition.

879
01:07:29,539 --> 01:07:50,539
And you can sort of it's sort of like similar to the notion of a pinning in a buffer pool you can basically say these partitions should stay in memory and you're going to do sort of comparisons immediately you're not going to worry about these sort of separate phases of a build an appropriate phase like you can basically as you're doing the building.

880
01:07:50,539 --> 01:08:06,539
You can you can compute that you could do the some of these comparisons on the fly in practice it's not really done it's pretty difficult to do and and but you will see some notion of a hybrid hash join sometimes in literature.

881
01:08:06,539 --> 01:08:19,539
So that's why we're just sort of presenting it is something that could exist here in the notion in the case of highly skewed data this is sort of an alternative I guess to like spilling those first those first buckets and creating like ever growing.

882
01:08:19,539 --> 01:08:26,539
Buckets like you could do an optimization here and just keep those ones in memory and start doing our comparisons as on the fly.

883
01:08:26,539 --> 01:08:48,539
So we're going to wrap up I think on hash joins in this case the inner table can be any size and ideally we would love for the outer table to fit into memory that would be best case scenario so this is another example of like this is something the optimizer needs to try to get right.

884
01:08:48,539 --> 01:08:55,539
Table sizes and actually usually that hard to to reason about like that that it can actually get right.

885
01:08:55,539 --> 01:09:17,539
And then if we know if we know the size of that outer table we could do something like a static hash table and we don't have to worry about resizing this thing if it gets to a certain size like we can just basically pre allocate the buffers that we need for this hash table we know based on this table size that I'm going to need this big of a hash table and not constantly have to to rehash otherwise we have to use like dynamic hash tables.

886
01:09:17,539 --> 01:09:24,539
Or allow for things to like spill into like basement pages of this hash table.

887
01:09:24,539 --> 01:09:53,539
So as question is if the query comes in.

888
01:09:53,539 --> 01:10:02,539
So query comes in and I need space my buffer pool to run these sort of hash joins like is that memory sort of reserved for you or how does that work.

889
01:10:02,539 --> 01:10:13,539
Generally it's a knob you can tune in these database systems like how much space do you set aside for for working memory in the buffer pool for things like hash tables and stuff like that.

890
01:10:13,539 --> 01:10:29,539
So the system may allocate it on the side as like a separate buffer pool or something like that just for hash joins because they may be able to say okay based on concurrency in the system we can reason about how much contention there would be for that data structure but it's sort of a system design implementation decision.

891
01:10:29,539 --> 01:10:33,539
But always a good thing to be thinking about.

892
01:10:33,539 --> 01:10:44,539
So how come we call the outer table which we call the one that is the hash table the other table for index and the hash table.

893
01:10:44,539 --> 01:10:59,539
So the question is why do we call the outer table the table that has the hash table built for a hash join versus when I was talking about an index that's the loose joint the inner join is the one that would maybe have the hash table on it.

894
01:10:59,539 --> 01:11:18,539
So the I don't want to get too fixated on that inner table on an on an index join being a hash table or hash index potentially like in practice it's probably going to be a B plus tree so I don't want to like confuse those those two ideas for you guys.

895
01:11:18,539 --> 01:11:35,539
So for a nested loop join you would still

896
01:11:35,539 --> 01:12:02,539
have to use the hash join to other table smaller so the hash table smaller is more like a different memory whereas with with index join the inner table is larger so you would want to use an index to speed up per outer table of time.

897
01:12:02,539 --> 01:12:25,539
So for example if you use a B plus tree index on the outer table in the index join and your inner loop has more iterations then your total lookup time would be higher than compared to you use each key in the outer loop and you probe it into an index in the inner table.

898
01:12:25,539 --> 01:12:35,539
So I would think it was probably in the index every time but you're probing a smaller number of times.

899
01:12:35,539 --> 01:12:41,539
I think it's better to stream below the table with index.

900
01:12:41,539 --> 01:13:00,539
Yeah and so in hash joins we typically also just refer to like again it's like an implementation thing like they they loved overload the terminology of like you have your build you've your build side and you have your probe side of your tables like they don't necessarily always reason about outer and inner tables were like your outer tables your build side your inter tables your probe side.

901
01:13:00,539 --> 01:13:19,539
So it's the terminology gets a little weird especially like you said when you're dealing with an index join in nested index nested loop join where like the inner tables the one that's relying on the index or has the index already but that's yeah that's just the way the terminology has wound up yeah.

902
01:13:19,539 --> 01:13:29,539
So generally hashing is probably going to be the better choice like unless you specifically need ordering.

903
01:13:29,539 --> 01:13:40,539
The hash hash joins are usually the way to do it there's a lot of modern analytical systems that just sort of default to a hash join they don't even bother reasoning about anything else.

904
01:13:40,539 --> 01:14:01,539
The note here says good demoses use either both so like a more traditional like transactional or just general purpose all around system like a postgres they're going to support all these sorts of joins whereas like highly specialized systems high very fast transactional systems will focus on index joins and oh lap systems will typically use hash joins.

905
01:14:01,539 --> 01:14:14,539
So next class you guys get to start talking about how to actually execute these queries that's going to be on Monday and then like the initial slide said you guys have a midterm on Wednesday so good luck with that.

906
01:14:31,539 --> 01:14:45,539
Now listen I'm the poppy with the motherfucking 28 gram dependent on if it's the pop you ain't hit them all yet still got your sugar I smack you with the bottom of the clip to tell you look up show me what it's a set for blow your face back.

907
01:14:45,539 --> 01:14:58,539
I got a block on tap the feds can't trace that style is like tap the proof you can't lace that the Dominic and oh you got call me Dominican black Skelly black and other black sweat Timberlands my whole black 38 and send you to the perigates.

908
01:14:58,539 --> 01:15:08,539
You get the lava trying to skate and that's your first statement. I ain't lying for that cake. I can't see you wait my granddad's happy weight the Rand to every state when he acting how I'm living tell him I'm living great.

