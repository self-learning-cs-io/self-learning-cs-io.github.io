---
title: CMU15721 P14S202413 QueryOptimizerImplementation1CMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Canneke Mellon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:09,000 --> 00:00:10,000
Hi.

4
00:00:10,000 --> 00:00:20,000
So today's class, I'm going to try to get as much as I can into today's lecture.

5
00:00:20,000 --> 00:00:24,000
It might spill over a little bit into next class, but this is it.

6
00:00:24,000 --> 00:00:26,000
We've been talking about this for a long time.

7
00:00:26,000 --> 00:00:30,000
We're finally getting to discussing how we actually want to build the query optimizer,

8
00:00:30,000 --> 00:00:34,000
which is the arguably the most important part of a data management system.

9
00:00:34,000 --> 00:00:40,000
Every year I debate whether to even bother teaching 721 and just teach a topic course on query optimization.

10
00:00:40,000 --> 00:00:43,000
Admittedly, this is the part of data business that I know the least about.

11
00:00:43,000 --> 00:00:46,000
For people that are actually working on the query optimizer here,

12
00:00:46,000 --> 00:00:49,000
at this point you guys probably know more than I do.

13
00:00:49,000 --> 00:00:53,000
But this is the hardest piece because obviously we can build the fastest engine,

14
00:00:53,000 --> 00:00:57,000
but if our query plans are terrible, then it's all wasted.

15
00:00:57,000 --> 00:01:00,000
You okay?

16
00:01:00,000 --> 00:01:02,000
Okay.

17
00:01:02,000 --> 00:01:03,000
Alright.

18
00:01:03,000 --> 00:01:09,000
Alright, so this refresher last class we were talking about networking protocols.

19
00:01:09,000 --> 00:01:14,000
And again, the main takeaway from this discussion was it looks and smells a lot like

20
00:01:14,000 --> 00:01:16,000
when we talked about storage on disk.

21
00:01:16,000 --> 00:01:20,000
If we have a, if our application is going on queries,

22
00:01:20,000 --> 00:01:25,000
it really cares about a small number of tuples, then a row-oriented API or network protocol

23
00:01:25,000 --> 00:01:33,000
that's going over a row-oriented API or row-oriented network protocol that's being accessed through a row-oriented API,

24
00:01:33,000 --> 00:01:36,000
like ODBC or GDBC, that's going to be sufficient.

25
00:01:36,000 --> 00:01:40,000
But when we start doing queries that want to get a lot of data out of the data system,

26
00:01:40,000 --> 00:01:44,000
or do bulk export, then we want to use something that looks,

27
00:01:44,000 --> 00:01:48,000
that's a column art, take advantage of all the things we talked about before.

28
00:01:48,000 --> 00:01:53,000
And as I said, the arrow data's connectivity library is one that facilitate that.

29
00:01:53,000 --> 00:01:59,000
I think that's the future of overlap systems are all going to support this if they don't already.

30
00:01:59,000 --> 00:02:02,000
And so as I said already, the next two weeks is related to our query optimization.

31
00:02:02,000 --> 00:02:08,000
So today's class and next class we'll be talking about how you actually want to implement the optimizer itself

32
00:02:08,000 --> 00:02:12,000
at a high level, like how you're going to define the rules,

33
00:02:12,000 --> 00:02:16,000
how you then do the search to figure out what transformations you want to apply to optimize things.

34
00:02:17,000 --> 00:02:21,000
We'll talk a little bit about query writing and obviously planing the operation as part of this.

35
00:02:21,000 --> 00:02:23,000
Cost models will discuss more next week.

36
00:02:23,000 --> 00:02:32,000
Next class will be, sorry, next week, we'll then talk about, sorry, next class will be further into the dynamic programming approach

37
00:02:32,000 --> 00:02:35,000
that's used by hyper and umber from the Germans.

38
00:02:35,000 --> 00:02:39,000
And then on Monday next week we'll talk about doing adaptive query optimization.

39
00:02:39,000 --> 00:02:43,000
Like the query runs for bit and you make decisions on the fly whether it's changed things.

40
00:02:43,000 --> 00:02:45,000
And then that'll feed into the cost model discussion in next week.

41
00:02:45,000 --> 00:02:51,000
So the next two weeks is getting purely on uh on query optimization because again it's super important.

42
00:02:51,000 --> 00:02:53,000
So what do we care about in this scope?

43
00:02:53,000 --> 00:03:01,000
So this is obviously a refresher from the intro class but the goal of the Davies systems query optimizer sometimes called the query planner,

44
00:03:01,000 --> 00:03:08,000
sometimes called the query compiler if you're if you're an older system or an old person right because that that's a remnant of the 1970s

45
00:03:08,000 --> 00:03:15,000
when the original model came along by the idea of taking a high level language like SQL and and converting it into a low level,

46
00:03:15,000 --> 00:03:19,000
not assembly but execution instructions to run the query.

47
00:03:19,000 --> 00:03:28,000
Like they saw that being akin to writing a high level language like C because C was considered high super high level back in the day and converting that into a low level assembly or machine code.

48
00:03:29,000 --> 00:03:42,000
So the idea of the query optimizer is that we want to generate a for a given query, we want to generate a a correct physical plan that will execute that query ideally with the lowest cost.

49
00:03:42,000 --> 00:03:53,000
And I'm underlying the the word correct here because obviously it doesn't matter if we have this super fast query plan if it does not actually produce the result that we want then it's you know it's useless.

50
00:03:54,000 --> 00:04:03,000
For that one we get an or approximate query processing stuff. We really want an exact match we're given SQL query we're going to use the exact output.

51
00:04:03,000 --> 00:04:15,000
And the cost is in quotes because as we'll see next week this is going to be a relative term that's going to get it's going to change depending on a on the system itself that's actually implementing this.

52
00:04:15,000 --> 00:04:28,000
So the cost is going to be some internal metric that we can use to compare one plan to another and decide this one's better than another based on number two bulls red or CPU instructions used or network traffic.

53
00:04:28,000 --> 00:04:37,000
And again that's going to change from from one system to the next and typically this cost is not usually mapped to something in the real world like like runtime.

54
00:04:37,000 --> 00:04:44,000
Some of the enterprise systems I know DB2 can do this where they're actually spit out this query is expected to run this long.

55
00:04:44,000 --> 00:04:55,000
But here I look like post dresses output of explain analyze or SQL light or other systems it's always going to be some number that does that's meaningless outside of that system.

56
00:04:56,000 --> 00:05:07,000
So the as I said before this is going to be the hardest part of the system just picking the joiner is proving to be I think MP hard but the whole the whole problem of thinking of what's the optimal query plan is is MP complete.

57
00:05:07,000 --> 00:05:24,000
And so that means that despite the name optimizer we're never almost never going to really find the true optimal plan right if it's something really stupid like select one semi colon right that one actually that that usually didn't get past the optimizer like some systems or recognize that immediately send you back for the result doesn't execute it like they they're not going to be able to do that.

58
00:05:24,000 --> 00:05:28,000
So we're not going to execute it like they're a little short circuit it.

59
00:05:28,000 --> 00:05:35,000
But for for things like looking up on a single index on one table like yeah that will be optimal because we know how to find exactly what we want.

60
00:05:35,000 --> 00:05:41,000
But once we start adding joins that's when things get really tricky.

61
00:05:41,000 --> 00:06:01,000
And so because we can't find the we can't do an exhaustive search to find optimal plan we're going to have to use a bunch of methods to just trim down the number of choices we had to consider and try to guide the optimizer towards a good plan right because we can't we can't prove that it's going to be optimal.

62
00:06:01,000 --> 00:06:20,000
And then because it is too expensive to for all these possible choices we could have to actually run them to see whether they you know what their cost actually is this is with a cost model is going to help us speak things up but it's going to be an estimation of what we think the the systems actually going to do when encounters real data that you're targeting.

63
00:06:20,000 --> 00:06:29,000
So this is going to be super super hard and I'll try to break it down and walk through the different approaches that were discussing the paper you guys were assigned.

64
00:06:29,000 --> 00:06:44,000
And the old joke for query optimization is like if say you want to be a rocket scientist sorry other way around if you want to be working query optimizers and you can't hack it and it doesn't work out then the backup plan could be rocket science because query optimization is considered harder than rocket science.

65
00:06:44,000 --> 00:06:50,000
Of course you know database don't blow things up in the air so maybe that's a debate.

66
00:06:50,000 --> 00:07:04,000
Okay. So the important thing not to say nested to is the distinction between a logical plan and the physical plan and the terms are going to be sometimes conflated in the earlier optimizer optimizer and

67
00:07:04,000 --> 00:07:20,000
the conditions we're going to see because they might not even have logical plans they'll go immediately from like a sequel query into physical plans but the cascades approach and the stratified search from starbursts that we'll see in a second they'll have a clean clean distinction between the logical and physical plan.

68
00:07:20,000 --> 00:07:31,000
And so the idea of the logical plan is the high level operators we want we want to execute for a query based on something that looks like relational algebra.

69
00:07:31,000 --> 00:07:40,000
Like I want to scan this table I want to join these two tables but it's not specifying what actual algorithm you want to use to execute those different operators.

70
00:07:40,000 --> 00:07:53,000
So the optimizer is going to take a the parse tree from the from the sequel query that shows up do some transformation to convert that into logical plans that represent what that that sequel query was trying to do.

71
00:07:53,000 --> 00:08:07,000
And then now it can do further optimizations or further transformations of those logical plans into new logical plans or it can convert the logical plans into physical operators a physical plan that will define how we actually want to execute things.

72
00:08:07,000 --> 00:08:12,000
And this physical plan can oftentimes will depend on what the data actually looks like on disk.

73
00:08:12,000 --> 00:08:17,000
Do we expect things to be sorted is it going to be processed a certain way.

74
00:08:17,000 --> 00:08:23,000
And the you know it will specify also again what algorithm want to use to produce that result.

75
00:08:23,000 --> 00:08:28,000
So we're not always going to have a one to one mapping from a logical operator to a physical operator.

76
00:08:28,000 --> 00:08:34,000
Like you could have a logical join a logical order by could be combined together into a physical sort merge join.

77
00:08:34,000 --> 00:08:43,000
But once you're in a physical form you typically don't like a physical operator form you typically don't don't convert that back to logical that doesn't make sense.

78
00:08:43,000 --> 00:08:47,000
And that's a explodes in search base if you actually want to consider something like that.

79
00:08:47,000 --> 00:08:52,000
So it's mostly logical logical or logical physical.

80
00:08:52,000 --> 00:09:01,000
And this I've already said but again the cost estimation is how we're going to use what we're going to use internally to figure out what whether one query plan is going to be better than another during our search process.

81
00:09:01,000 --> 00:09:10,000
Again we'll talk about this next week but basically it's going to be a combination of these different metrics like how much data I think I'm going to read from disk or read from from my for my child operator.

82
00:09:10,000 --> 00:09:17,000
How much data I'm going to spit out based on the selectivity of the cardinality of any operations I'm doing on that data as it comes in.

83
00:09:17,000 --> 00:09:21,000
Is the data skewed is a compress where it's actually physically located.

84
00:09:21,000 --> 00:09:26,000
All these things we have to consider to have a true cost estimate but it's never going to be exactly perfect.

85
00:09:26,000 --> 00:09:35,000
And the paper you guys read next week from the Germans will show you that once you do like two joins then all these estimates get way out of whack.

86
00:09:35,000 --> 00:09:43,000
And the query optimizer the cost model estimates will be woefully underestimating the amount of tubos that are coming out.

87
00:09:43,000 --> 00:09:47,000
And so again it'll lead it to choose an incorrect plan.

88
00:09:47,000 --> 00:09:51,000
So today we're going to try to get through all five hundred approaches you could have.

89
00:09:51,000 --> 00:09:52,000
We'll see how far we can get.

90
00:09:52,000 --> 00:09:56,000
We don't get to randomize search as fine because nobody actually does this except for Postgres.

91
00:09:56,000 --> 00:10:00,000
And Postgres only does it if you have 13 tables in your query.

92
00:10:00,000 --> 00:10:03,000
But we'll cover that next class if you're not at the time.

93
00:10:03,000 --> 00:10:07,000
The main two ones that we're going to focus on are the middle three.

94
00:10:07,000 --> 00:10:14,000
So again we're going to sort of walk through the in order of complexity from like simplest to hardest.

95
00:10:14,000 --> 00:10:18,000
Although stratified and unified are essentially equivalent.

96
00:10:18,000 --> 00:10:24,000
And we're going to walk through like here's how people implement these different query optimizers.

97
00:10:24,000 --> 00:10:27,000
What are the pros and cons of them? What can't they handle?

98
00:10:27,000 --> 00:10:33,000
And then how the sort of the next approach as we go down tries to solve the problems to the previous one.

99
00:10:33,000 --> 00:10:37,000
And we'll sprinkle discussion a little bit about how like real world systems do this.

100
00:10:38,000 --> 00:10:46,000
And the TLDR is going to be stratified search and unified search are going to be the most common approaches.

101
00:10:46,000 --> 00:10:52,000
So say you're a brand new startup and you're building a brand new database system of scratch.

102
00:10:52,000 --> 00:10:57,000
You're not like 14 postgres. You're just literally starting from nothing.

103
00:10:57,000 --> 00:11:01,000
The heuristic based optimizer is probably what most people almost everyone builds first.

104
00:11:02,000 --> 00:11:13,000
Because it's super simple. It's a bunch of if and else clauses that look for patterns in the SQL query and then apply some transformation to convert them into a better form.

105
00:11:13,000 --> 00:11:21,000
And the reason why this works is that it's based on domain knowledge about what we know as humans about query optimization and queries in general.

106
00:11:21,000 --> 00:11:28,000
And we're basically codifying that in our code to always apply those changes without worrying about whether the right thing to do or not.

107
00:11:28,000 --> 00:11:30,000
Yes.

108
00:11:30,000 --> 00:11:36,000
As far as I I have to double check I don't think I don't think they have a call space optimizer.

109
00:11:36,000 --> 00:11:40,000
The way MongoDB works is that they generate all the query plans.

110
00:11:40,000 --> 00:11:41,000
Run them all.

111
00:11:41,000 --> 00:11:44,000
Whenever one comes back first, that's what they pick.

112
00:11:44,000 --> 00:11:47,000
Because that's what it was a year or two ago.

113
00:11:47,000 --> 00:11:52,000
So you don't run like like you generate all the query plans.

114
00:11:52,000 --> 00:11:53,000
You pick one.

115
00:11:53,000 --> 00:11:55,000
You send that out first. See how long it takes.

116
00:11:55,000 --> 00:11:57,000
Next time the query shows up, pick the next one and run that.

117
00:11:57,000 --> 00:11:59,000
And you pick what you want to.

118
00:11:59,000 --> 00:12:01,000
You laugh, but it's pretty simple. It works.

119
00:12:01,000 --> 00:12:03,000
And then after like 20 iterations, they'll try again.

120
00:12:03,000 --> 00:12:04,000
Yes.

121
00:12:04,000 --> 00:12:06,000
If you're not like you don't play all the query,

122
00:12:06,000 --> 00:12:08,000
you sort of look like this.

123
00:12:08,000 --> 00:12:09,000
Or not not.

124
00:12:09,000 --> 00:12:11,000
But you're writing simply.

125
00:12:11,000 --> 00:12:13,000
It's David is the MongoDB approach works.

126
00:12:13,000 --> 00:12:17,000
If you assume the query is going to be very similar to each other, maybe just different input parameters.

127
00:12:17,000 --> 00:12:18,000
Yes, you could do that.

128
00:12:18,000 --> 00:12:26,000
And in the old to be world operational workloads that Mongo initially targeted, this works.

129
00:12:26,000 --> 00:12:29,000
Because again, it's like go look up any record.

130
00:12:29,000 --> 00:12:31,000
Go look up Kyle's record.

131
00:12:31,000 --> 00:12:34,000
It's the same query, just different input parameters.

132
00:12:34,000 --> 00:12:36,000
I want to get two boggles on Mongo.

133
00:12:36,000 --> 00:12:38,000
And again, I'm not knocking them.

134
00:12:38,000 --> 00:12:43,000
I'm just saying it's cleverly simplistic.

135
00:12:43,000 --> 00:12:47,000
There's other things to bang on them about like M-map.

136
00:12:47,000 --> 00:12:50,000
For this one, when I was like, oh yeah, I can see why you would do this.

137
00:12:50,000 --> 00:12:52,000
Because again, what did I just say at the beginning?

138
00:12:52,000 --> 00:12:54,000
This is the hardest part of David systems.

139
00:12:54,000 --> 00:12:56,000
Trying to get a system up and running right away.

140
00:12:56,000 --> 00:12:58,000
They're getting huge growth.

141
00:12:58,000 --> 00:13:02,000
They got that far without a query optimization.

142
00:13:02,000 --> 00:13:06,000
So again, this heuristic based on it's going to be if and else statements.

143
00:13:06,000 --> 00:13:14,000
That look for patterns in the query plan and then applies some transformation to put it into a different form.

144
00:13:14,000 --> 00:13:20,000
So the most obvious thing you can do is always do the most restrictive selection first.

145
00:13:20,000 --> 00:13:23,000
Because usually I'm just trying to filter things out as soon as possible.

146
00:13:23,000 --> 00:13:28,000
Because we know as humans, if you know why spend time copying data from one upper to the next,

147
00:13:28,000 --> 00:13:33,000
if I know I'm not going to need it, so let me go ahead and try to throw things out as soon as possible.

148
00:13:33,000 --> 00:13:37,000
So that's pretty much down limits, projections and so forth.

149
00:13:37,000 --> 00:13:43,000
For join ordering, if you're lucky, they'll have rules that'll look at actually cardinality estimates.

150
00:13:43,000 --> 00:13:46,000
And maybe say, oh, this one's bigger than the other one, swap them.

151
00:13:46,000 --> 00:13:48,000
We'll see in the case of the oracles.

152
00:13:48,000 --> 00:13:52,000
Their first implementation didn't do that.

153
00:13:52,000 --> 00:13:57,000
So the two out of the three first relational database systems built in the 19,

154
00:13:57,000 --> 00:14:02,000
the major relational database systems built in the United States in the 1970s all did this.

155
00:14:02,000 --> 00:14:07,000
So ingress did this up until the mid 80s or could did this up to the mid 90s.

156
00:14:07,000 --> 00:14:12,000
But in the case of the other the other major one system are at IBM research,

157
00:14:12,000 --> 00:14:16,000
they're actually going to do a call space search, which we'll see next.

158
00:14:16,000 --> 00:14:24,000
Again, most new database systems, unless you can reuse something like CalSight or Orca or an existing courty-optimizer like Postgres,

159
00:14:24,000 --> 00:14:27,000
this is pretty much everyone does.

160
00:14:27,000 --> 00:14:30,000
And long term, it's not sustainable.

161
00:14:30,000 --> 00:14:35,000
The reason I qualifies it, the two out of three first relational database systems in the US,

162
00:14:35,000 --> 00:14:39,000
because there was another one in Sweden called Mimer's SQL,

163
00:14:39,000 --> 00:14:42,000
and there was a German one called AidaBoss, but I don't know what those guys actually did.

164
00:14:42,000 --> 00:14:45,000
So they're all relational database at the time, yes.

165
00:14:45,000 --> 00:14:48,000
Sternbreaker built ingress, yes.

166
00:14:48,000 --> 00:14:50,000
Why is it called Postgres?

167
00:14:50,000 --> 00:14:53,000
Because it's Post-Engress.

168
00:14:53,000 --> 00:15:00,000
He built ingress, it stands for something interactive, graphical.

169
00:15:00,000 --> 00:15:05,000
They got a grant to build it for a GIS application,

170
00:15:05,000 --> 00:15:08,000
and then they started building it out to be more general purpose.

171
00:15:08,000 --> 00:15:10,000
Right, yes.

172
00:15:10,000 --> 00:15:14,000
So about the last one, I thought cardinality was the most important thing to consider the cardinality?

173
00:15:14,000 --> 00:15:18,000
It's a bit of a cost model.

174
00:15:18,000 --> 00:15:24,000
But the difference is going to be, there isn't a search process where I'm in new-burning every different plans,

175
00:15:24,000 --> 00:15:25,000
I say, is this one better than this?

176
00:15:25,000 --> 00:15:30,000
It's literally like, if I have a join, and the cardinality estimate is this one is greater than this one,

177
00:15:30,000 --> 00:15:33,000
as literally all it is.

178
00:15:36,000 --> 00:15:39,000
All right, getting back in the day, data is sort of small.

179
00:15:39,000 --> 00:15:42,000
You didn't have CTEs, you didn't have window functions,

180
00:15:42,000 --> 00:15:44,000
you didn't have all these other stuff we've been talking about.

181
00:15:44,000 --> 00:15:46,000
So this would get you pretty far.

182
00:15:46,000 --> 00:15:49,000
And for OTP, again, this will get you pretty far.

183
00:15:49,000 --> 00:15:52,000
So let's look at some basic optimizations that you can do with this.

184
00:15:52,000 --> 00:15:57,000
So these, again, this is a refresher for the intro class,

185
00:15:57,000 --> 00:16:04,000
but I'm going to show you these, because this will be what some of the heuristic rules will look like when we look at the stratified search and the other stuff.

186
00:16:04,000 --> 00:16:08,000
Because again, this is, you can do this without a cost model.

187
00:16:08,000 --> 00:16:12,000
And for the, like a heuristic, pure heuristic-based approach,

188
00:16:12,000 --> 00:16:14,000
this is a generator plan you can then run.

189
00:16:14,000 --> 00:16:26,000
But the idea when we do have a cost-based search, we want to use these transformations to guide us and push us towards what will at least be a starting point in our search for a reasonable plan.

190
00:16:26,000 --> 00:16:29,000
So we're not like blindly starting from the most stupidest query plan.

191
00:16:29,000 --> 00:16:37,000
And then spending all our search time, just getting us into a basic form that we've could have gotten instantaneously using one of these rules.

192
00:16:37,000 --> 00:16:41,000
So say we have a query like this, this is a three-way join on appears,

193
00:16:41,000 --> 00:16:46,000
artists appears in album, and we're going to look up all the people, all the artists that are on my mix tape.

194
00:16:46,000 --> 00:16:49,000
So the first thing you do is just split, split conjunctor predicate.

195
00:16:49,000 --> 00:16:56,000
So splitting any filter on the AND clauses to break them up into separate filter operators.

196
00:16:56,000 --> 00:17:07,000
So you identify that I have a filter operator within the filter operator's expression, I have an ANDs, I spin the the ANDs, and I create additional filter operators for that.

197
00:17:07,000 --> 00:17:11,000
Again, I don't need to cost money to do that. I know I always want to do that.

198
00:17:12,000 --> 00:17:20,000
So now, if I have these different filter operators, I can easily do now predicate pushdown to push the filter B below any join operator.

199
00:17:20,000 --> 00:17:27,000
Because again, why do I join on table on data? I know I'm going to throw away above.

200
00:17:27,000 --> 00:17:32,000
So I just push all of them down, I said to be right above the join, in this case here.

201
00:17:32,000 --> 00:17:37,000
But I guess the below this join appears. So these are the filters that are combining two tables,

202
00:17:38,000 --> 00:17:42,000
every new the Cartesian product, then I do the join. Then I applied the filter.

203
00:17:42,000 --> 00:17:46,000
Then the next step obviously, we want to get rid of the Cartesian products.

204
00:17:46,000 --> 00:17:51,000
So we just convert the, we recognize that we have an aquatic predicate right above us.

205
00:17:51,000 --> 00:17:56,000
So we can convert any Cartesian product into an inner join or an aqua join.

206
00:17:56,000 --> 00:17:59,000
That's always going to be faster.

207
00:17:59,000 --> 00:18:03,000
And then depending on the system, I may also want to do projection pushdown.

208
00:18:04,000 --> 00:18:12,000
But whether or not I have a cost model that decides whether the size of the table, then I'm, or the data that I'm pushing up between one upper to the next, is really big or not.

209
00:18:12,000 --> 00:18:20,000
But I can recognize that rather than copying all the data that I know I'm not going to need, I'll just push down the projections to be below any join operator.

210
00:18:20,000 --> 00:18:24,000
So I'm only passing along the minimum amount of data from one upper to the next.

211
00:18:24,000 --> 00:18:27,000
So all these, what are these four or five steps I should right here.

212
00:18:27,000 --> 00:18:32,000
Again, these are logical transformations that I can do without having to have a cost model.

213
00:18:32,000 --> 00:18:36,000
And it didn't specify what join algorithm I'm using or how I'm accessing these tables.

214
00:18:36,000 --> 00:18:39,000
I can just operate directly on the, on the logical plan to do this.

215
00:18:39,000 --> 00:18:46,000
And again, we know this is always me faster than what I started out with, which is like, again, the canonical form of converting SQL into relational algebra.

216
00:18:46,000 --> 00:18:47,000
Yes.

217
00:18:47,000 --> 00:18:51,000
I think there are actually some edge cases where the predicate is really really expensive.

218
00:18:51,000 --> 00:18:53,000
And the technical problem.

219
00:18:53,000 --> 00:19:03,000
The statement is, there are some cases where if the predicate, I mean, valuation of the predicate is very expensive from a computational standpoint, then pushing down the predicate is a bad idea.

220
00:19:03,000 --> 00:19:04,000
Yes.

221
00:19:04,000 --> 00:19:07,000
But you know, there you have it.

222
00:19:07,000 --> 00:19:11,000
You don't know that at this point here.

223
00:19:11,000 --> 00:19:18,000
Right. Because how do you weigh the number of two tables going in to the filter?

224
00:19:19,000 --> 00:19:20,000
That's a projection.

225
00:19:20,000 --> 00:19:28,000
Like, how do I know the number of two is coming in to the, to the, to the join is going to be, say, this comparison is super expensive.

226
00:19:28,000 --> 00:19:35,000
How do I know that the number of two is going in would outweigh the cost of applying this for everyone versus above after the join?

227
00:19:35,000 --> 00:19:36,000
You don't know.

228
00:19:36,000 --> 00:19:38,000
You need a cost model.

229
00:19:38,000 --> 00:19:39,000
You need a cost model.

230
00:19:39,000 --> 00:19:41,000
You need to use the statistics.

231
00:19:41,000 --> 00:19:46,000
And the very beginning didn't have any of that.

232
00:19:46,000 --> 00:19:49,000
All right. So let me show what ingress did back in the day.

233
00:19:49,000 --> 00:19:57,000
And again, this is like kind of the MongoDB one where I was saying like, it's, it's a delightfully stupid.

234
00:19:57,000 --> 00:20:09,000
Meaning like, you would never want to do this today, but given the constraints that they had at the time and the hard they were working with, without having a cost model, a creaponizer is actually kind of clever.

235
00:20:09,000 --> 00:20:14,000
So the dirty secret about ingress is the first version of it is it actually couldn't do joins.

236
00:20:15,000 --> 00:20:20,000
Yes, first version ingress in like 1974ish, threeish, could five.

237
00:20:20,000 --> 00:20:21,000
Couldn't do joins.

238
00:20:21,000 --> 00:20:25,000
They couldn't even do that.

239
00:20:25,000 --> 00:20:27,000
Okay.

240
00:20:27,000 --> 00:20:30,000
Yeah, all to be stuff back in the day.

241
00:20:30,000 --> 00:20:33,000
Let's see how they, but like, but they want to support the query like this.

242
00:20:33,000 --> 00:20:38,000
The example they always have in the old papers is like employer employee salary like, like, or department.

243
00:20:38,000 --> 00:20:40,000
Yeah, they're all pulling up.

244
00:20:40,000 --> 00:20:41,000
Let's see how they do this.

245
00:20:41,000 --> 00:20:48,000
So to say we had the same query before, so three way join on artists appears at album, but now I'm going to throw in this order by clause for the artist ID.

246
00:20:48,000 --> 00:20:57,000
So the first thing they're going to do is they're going to rewrite the SQL query into single value queries, meaning the same case of the first one here.

247
00:20:57,000 --> 00:21:07,000
I take the first query, I extract out and move out the look up on artists and appears, and I have a singular query looking up on the album based on the album name.

248
00:21:08,000 --> 00:21:13,000
But then I'm going to materialize the output into temp 1, some table here.

249
00:21:13,000 --> 00:21:23,000
Now I'm going to further decompose query 2 into two new queries, where the first one does a look up on appears, and a join with temp 1.

250
00:21:23,000 --> 00:21:26,000
And the second one is going to do a look up on artists and a join with temp 2.

251
00:21:26,000 --> 00:21:30,000
Again, this one is materializing the output into temp 2.

252
00:21:30,000 --> 00:21:40,000
So now what I'm going to do is run the queries 1 by 1, starting from the top to the bottom, and whatever the result is, I then inject that into the next query I'm going to execute.

253
00:21:40,000 --> 00:21:47,000
So if I run this first query, query 1, look up the album based on the name, it's going to produce album ID 999.

254
00:21:48,000 --> 00:22:02,000
So then I take that, map that into the rewritten query on the appears table, and substitute what would have been the join clause on the artist table, or sort of the album table, and now inject 99999.

255
00:22:02,000 --> 00:22:11,000
And then this thing produces a result, two results here, and then I'm going to do a four on the bottom of that, and run each of those queries 1 by 1.

256
00:22:11,000 --> 00:22:12,000
Yes.

257
00:22:13,000 --> 00:22:15,000
And there are easy ones for query 2.

258
00:22:15,000 --> 00:22:17,000
Going back here.

259
00:22:17,000 --> 00:22:26,000
Query 2 got rewritten into, so query 2 got rewritten to a three by join, or two of the two of the artists and peers, and that gets rewritten into 3 and 4.

260
00:22:29,000 --> 00:22:30,000
And the question, yes.

261
00:22:30,000 --> 00:22:33,000
What is the definition of a single value query?

262
00:22:33,000 --> 00:22:36,000
What is the definition of a single value query?

263
00:22:36,000 --> 00:22:38,000
Like one tuple for one table.

264
00:22:38,000 --> 00:22:39,000
Oh.

265
00:22:39,000 --> 00:22:40,000
Yeah.

266
00:22:43,000 --> 00:22:46,000
Right, so like, well, in this case here, you would run it.

267
00:22:46,000 --> 00:22:51,000
Well, I could be for one table, so you would get this query would run once, you get two results.

268
00:22:51,000 --> 00:23:00,000
They could support multiple tuples in the output, and then now you take these two values, then just expand that out into different instances of the same query.

269
00:23:00,000 --> 00:23:02,000
What's the name of the query?

270
00:23:02,000 --> 00:23:11,000
Yeah, I mean one table queries, single table queries.

271
00:23:11,000 --> 00:23:17,000
So I'm showing this at the SQL level, but they did this all at the logical level, which is logical query plans, and then they would just sort of run this.

272
00:23:17,000 --> 00:23:25,000
And so why I say this to like stupidly clever is, you're actually running the query optimizer every single time you generate one of these queries.

273
00:23:25,000 --> 00:23:43,000
So for whatever reason, if like for this artist ID equals one, two, three, if there was a better way to execute that than doing a lookup in four, five, six, you could actually support that because you would take this query plan, run it through the planner and might choose a different execution path than this other one here.

274
00:23:43,000 --> 00:23:48,000
And because it's choosing on a per single value within the lookup, what's the best thing to do?

275
00:23:48,000 --> 00:23:56,000
So it's sort of an early example of adaptive query optimization, which we'll see next week, but like, because you're running the optimizer on a per query basis, but obviously this would be super slow.

276
00:23:56,000 --> 00:23:58,000
You wouldn't actually want to do this.

277
00:23:58,000 --> 00:24:01,000
Right?

278
00:24:01,000 --> 00:24:06,000
So again, it's a nice, to me, it's a nice historical curiosity.

279
00:24:06,000 --> 00:24:13,000
So there is a big conversation is the easiest implement in debug because against just a bunch of if and else's, this would pretty much everyone does.

280
00:24:13,000 --> 00:24:18,000
And for simple queries, you're not going to get any faster than this because you don't mean any taining state.

281
00:24:18,000 --> 00:24:24,000
You're not doing any lookup in the queries against the cost model, do estimations.

282
00:24:24,000 --> 00:24:28,000
It's like boom, boom, boom, and then here's the query and run it.

283
00:24:28,000 --> 00:24:34,000
Obviously, the downside is going to be this is going to be a nightmare to expand when you want to start doing more complicated things.

284
00:24:34,000 --> 00:24:39,000
It's going to lie in magic consents to say like, how much better really is something than another.

285
00:24:39,000 --> 00:24:46,000
If you start weighing in like the number of tools, this operator is going to spit out if you're flipping one versus another.

286
00:24:46,000 --> 00:24:52,000
And then anytime you have like a nested query and then that becomes a trainback.

287
00:24:52,000 --> 00:25:00,000
And most obviously actually not in just nest squares, and then you have joins to figure out what's the right join ordering would be a total nightmare.

288
00:25:00,000 --> 00:25:10,000
Going back to this one here, the reason why we started with query one on the out my D, because that's the only input we have to the query.

289
00:25:10,000 --> 00:25:20,000
We know what the starting point is. But if it was just a join across the tables without any input, then you have to pick what is the starting point, which is the first for a table you want to put in part of the join.

290
00:25:20,000 --> 00:25:24,000
And then it all falls apart.

291
00:25:24,000 --> 00:25:29,000
So I said, this is roughly what ingress and oracle did back in the day. System R we'll see in the next two slides.

292
00:25:29,000 --> 00:25:33,000
They're going to have a call space search for at least for the for the joins.

293
00:25:33,000 --> 00:25:42,000
If you read the unofficial biography of Larry Ellison, there's this nice little paragraph here somewhere where Stemberger talks about the oracle's query optimizer.

294
00:25:42,000 --> 00:25:52,000
Again, this is about the mid 19, with this book he met in the 1990s, but he's talking about the sort of the race between oracle and ingress in the 1980s.

295
00:25:52,000 --> 00:26:01,000
And he talks about how ingress actually built a query optimizer that's going to look like IBMs, but oracle was kept going on in how that was actually the wrong way to do it.

296
00:26:01,000 --> 00:26:04,000
And the right way to do is what oracle did.

297
00:26:04,000 --> 00:26:11,000
And that instead of calling it like a heuristic based optimizer, they call it a semantic optimizer, because they couldn't do cross-based search.

298
00:26:11,000 --> 00:26:18,000
So the to figure out the join order. So the join order was whatever the order that the tables appeared in the actual SQL string.

299
00:26:18,000 --> 00:26:24,000
And they call that in or Larry Ellison would call that a semantic optimizer.

300
00:26:24,000 --> 00:26:33,000
So good marketing. And then like I said, IBM or oracle is going to be right there is in the 1990s and make it more state of the art.

301
00:26:33,000 --> 00:26:39,000
So at the same time, the ingress and oracle guys are building their heuristic based optimizers.

302
00:26:39,000 --> 00:26:48,000
IBM researcher, IBM was building system R. And they end up building the first cost-based query optimizer.

303
00:26:48,000 --> 00:26:55,000
And the idea is that it's going to use a heuristic stage just like we saw before where you can do the logical, logical optimizations.

304
00:26:55,000 --> 00:27:02,000
But then they're going to plan a new relation and transform physical operators.

305
00:27:02,000 --> 00:27:06,000
Actually, that's backwards. It should be logical and not physical, logical.

306
00:27:06,000 --> 00:27:13,000
They would transfer it to physical operators and try to find one with the lowest cost.

307
00:27:13,000 --> 00:27:19,000
And obviously to do this, you need a cost model, you need estimates, but each operator is going to spit out.

308
00:27:19,000 --> 00:27:26,000
And you can't guarantee that you're going to find the the optimal plan, but there's things they do would try to at least get to a good plan.

309
00:27:26,000 --> 00:27:31,000
Like only choosing left deep trees instead of pushing trees. There's a cut down the search base.

310
00:27:31,000 --> 00:27:36,000
So this is what system R did in the very beginning. This is what IBM DB2, at least in the early 1980s,

311
00:27:36,000 --> 00:27:41,000
because that was the first commercialization of a relational database at IBM.

312
00:27:41,000 --> 00:27:45,000
They did something based on this. And then most of the other source database systems are out today.

313
00:27:45,000 --> 00:27:54,000
Postgres, MySQL, SQLite. They're going to do something that looks and not smells like this.

314
00:27:54,000 --> 00:28:01,000
So for this one, actually, let's skip. But basically converting the query pans, logic operators, physical operators,

315
00:28:01,000 --> 00:28:09,000
to do this correctly, we need to understand what the table is going to look like, what the inputs are going to be to this given operator,

316
00:28:09,000 --> 00:28:14,000
whether data is going to be located. All this is related to the cost model stuff that we talked about before.

317
00:28:14,000 --> 00:28:20,000
And we'll talk about more next week. So to numerate the plans, there's basically two categories.

318
00:28:20,000 --> 00:28:26,000
And this is going to be similar to the debate between, do I want to partition my hash showing or not?

319
00:28:26,000 --> 00:28:31,000
Like, you know, the people go back and forth in this. But for query optimization, the question is going to be,

320
00:28:31,000 --> 00:28:38,000
do I want to enumerate plans and build things up the physical plan from the bottom of the query plan?

321
00:28:38,000 --> 00:28:46,000
To the top or from the top to the bottom? Or another way to think about this is, am I going to use a generative approach or a transformative approach?

322
00:28:46,000 --> 00:28:52,000
So a generative approach would be, I start with nothing. Like, I have no physical operators on my query plan.

323
00:28:52,000 --> 00:29:01,000
And then I'm going to iterally assemble and inject new physical operators to work myself up to the final output, the root of the query plan,

324
00:29:01,000 --> 00:29:08,000
that's going to produce the final result. And I can do cost-based selection as I go from one level to the next.

325
00:29:08,000 --> 00:29:15,000
So this is what system R is going to do. This is what Starburst, which is the query optimizer that IBM built later on in the 1980s, early 1990s.

326
00:29:15,000 --> 00:29:18,000
This is what they're going to do as well. Right?

327
00:29:18,000 --> 00:29:27,000
The alternative approach is to do the top down transformation where I start with the goal that I want, which is the root of the query plan.

328
00:29:28,000 --> 00:29:37,000
I want my final output of my query plan to look like this. Right? I'm joining these tables. It's sort of this way. Whatever it is, that's what I want.

329
00:29:37,000 --> 00:29:50,000
And then I'm going to permute it, the query plan going down and adding new operators that will then feed into my root to then produce the final result that I want.

330
00:29:51,000 --> 00:29:56,000
It sort of seems like I'm just making hand gestures and going up and down like this. It doesn't make any sense.

331
00:29:56,000 --> 00:30:04,000
But it does have implications for the scope in which you can examine and operate on the query plan when you apply different time to transformations.

332
00:30:04,000 --> 00:30:17,000
And how you're actually going to cost them. In the end, they're doing a dynamic approach. It's just the way they're doing the costing and pruning things will differ.

333
00:30:21,000 --> 00:30:30,000
So let's look at the system or optimize it. Let's see an early version of a bottom-up approach. And then we'll see how that think it's expanded into a little bit at Starburst.

334
00:30:30,000 --> 00:30:40,000
And as I said, next class, we'll go into more details of the state of the art approach of bottoms-up plan and emeration that the Germans do in hyper.

335
00:30:40,000 --> 00:30:43,000
And I think DuckDB does the same thing as well.

336
00:30:43,000 --> 00:30:52,000
So the way system art is going to work is that the queries are going to show up. And they're going to break it up the query plan into blocks that have logical operators for each block.

337
00:30:52,000 --> 00:31:01,000
Sort of thinking of like a block would be like a pipeline breaker or it could be a nested subquery. It's going to be some subcomponent or subplan of the overall query plan.

338
00:31:01,000 --> 00:31:10,000
And then for the logical operator within a subplan or block, they're going to generate the set of physical operators that could possibly implement it.

339
00:31:11,000 --> 00:31:23,000
And they're primarily going to be focusing on genre access paths. So figuring out how can I scan this table, your index or a central scan, and then what sort of, sorry, we're joined algorithm I'm going to want to use.

340
00:31:23,000 --> 00:31:30,000
And again, to reduce the complexity of the search base, they're only going to look at left-deep trees. So they're not going to sit at right-deep or bushy trees.

341
00:31:30,000 --> 00:31:38,000
Again, this is a relic of the 1970s and limited computing harbor. But a lot of systems still today make this big assumption.

342
00:31:39,000 --> 00:31:48,000
Right? As far as I know, left-deep and right-deep are always going to be equivalent, but sometimes you do actually want a bushy plan and you know, they're not going to be able to find those.

343
00:31:48,000 --> 00:31:55,000
And so they're going to literally construct this left-deep join tree and they want to choose the one that's going to have the minimal cost at the end.

344
00:31:55,000 --> 00:31:58,000
Again, based on some cost-bound estimate.

345
00:31:59,000 --> 00:32:08,000
So we go back to our query we haven't had before. So in the first step, we're going to choose the best access paths for all the tables that we're going to, we're going to, we're touching in the query.

346
00:32:08,000 --> 00:32:21,000
So independently, we're going to decide, oh, we want to do a sequential scan on artists and appears. But then we, we identify that the best look up for the album table will be on the index we have on name.

347
00:32:22,000 --> 00:32:28,000
So all of those are occurring, occurring independently of what the, of how we're actually going to do the joint.

348
00:32:28,000 --> 00:32:44,000
Then we're going to numerate all possible joinerings for the tables and this literally is just a Cartesian product with all possible combinations or commonatorial combination of all the possible ways we could do a joint, different joint algorithms, different joint orders, whether or not we even do a Cartesian product.

349
00:32:45,000 --> 00:32:51,000
The simple thing system are going to do is sort of what I said in the beginning is recognize that I know was a never going to do Cartesian product.

350
00:32:51,000 --> 00:32:54,000
So I can immediately throw all those away.

351
00:32:54,000 --> 00:33:02,000
And then now I'm going to do this bottom up based search for all these different combinations that I have to figure out what the joint order is that I want to be.

352
00:33:02,000 --> 00:33:10,000
So again, the, in this diagram here, think of the top as the final output. And the bottom here is my starting point.

353
00:33:11,000 --> 00:33:17,000
So my final output is what I want to have joined artists appears in album. But at the bottom here, I haven't joined anything.

354
00:33:17,000 --> 00:33:22,000
I assume also two I've selected for each of these integer tables as I showed in the previous slide.

355
00:33:22,000 --> 00:33:31,000
I've already selected what access method I'm going to use. So there's sequential scans for artists and appears and then the index look up on an album.

356
00:33:31,000 --> 00:33:39,000
So again, so they're going to do a bottom approach. So starting here at the bottom, they're going to say here's all the possible joint combinations I could have for these three tables.

357
00:33:40,000 --> 00:33:45,000
And because it's PowerPoint and for simplicity, right, assuming goes all the way to the side with all possible combinations.

358
00:33:45,000 --> 00:33:56,000
I'm truncating here in the sake of time. Right. And then now these physical operators then produce an output that's going to either add, then there's going to choose one of the two tables to be joined together.

359
00:33:56,000 --> 00:34:04,000
And then the third table is just waiting to be joined after this. Right. So I can do hash joins, merge joins, and so forth.

360
00:34:05,000 --> 00:34:14,000
And then now for all these possible paths up to the next level, I'm going to choose for each of these next nodes at the next level above.

361
00:34:14,000 --> 00:34:23,000
What's the path that has the lowest cost? Right. So for each of these, I'm going to choose one of them as the best one based on my cost model estimates.

362
00:34:24,000 --> 00:34:36,000
And then now, again, proceed at the next level to the exact same thing for each of these possible choices here, choose the different physical joint operators that then get me to my final result that I want.

363
00:34:36,000 --> 00:34:44,000
And then once I've done that, do the same thing, choose along which one of these has the shortest of the least cost.

364
00:34:44,000 --> 00:34:49,000
And then now, since I've reached the top of my query plan, I know this is the final result that I want.

365
00:34:49,000 --> 00:34:58,000
Now I just recurse back and figure out which of these is the cheapest path. And that's what I'm choosing as the optimal query plan for us. Yes.

366
00:35:15,000 --> 00:35:32,000
The question is, when do other organizations going to apply like predicate push out here? For this approach in system R, they're only going to pick this in joint ordering.

367
00:35:32,000 --> 00:35:48,000
In the case of in high policy next week, they're going to DP just for joint ordering. The way you would handle the additional things that you're talking about is that you would define those additional transformation rules in like a stratified search and you apply them potentially with the cost model as well.

368
00:35:48,000 --> 00:35:53,000
And then you do this this DP search. Cast case will integrate everything all at once.

369
00:35:53,000 --> 00:36:09,000
So this approach where you literally try all the physical operative possible. Is this in my correct saying this is only practical for a joint ordering? And then if you want to do something like that, put it down to the mother more band population.

370
00:36:09,000 --> 00:36:16,000
This question is, would you only want to do this bottom approach? Could you would you only do this for joint ordering? Yes.

371
00:36:16,000 --> 00:36:27,000
Because again, like you're trying to like march through if I have to do recognize what I want to do predicate push down yet to go back insert it in somewhere and then go back up. Be kind of funky.

372
00:36:27,000 --> 00:36:37,000
Question. So I think you mentioned that blog for the high point. So is there a special handling for aggregations?

373
00:36:37,000 --> 00:36:47,000
So there's special handling for aggregations. You would have to you would treat the aggregation as as a block. And you could subject by that further.

374
00:36:47,000 --> 00:37:04,000
Like this one is great block. Think of this as a query block. And so yeah, in this case, the aggregation would be the if it's no necessary query, the aggregation is the final output. So it would be a gray block above this. Yes.

375
00:37:04,000 --> 00:37:14,000
And then the same thing you could choose what aggregation algorithm I want to use, which most of those are going to be hash joined for the hash aggregate.

376
00:37:14,000 --> 00:37:21,000
Yes.

377
00:37:21,000 --> 00:37:35,000
The statement is I said in this approach here, you first pick the access method you're going to use. Then you pick joint ordering. Is it possible that there would be a different access method would be better for a different joint order? Yes.

378
00:37:35,000 --> 00:37:42,000
If I recognize that I have an index and I should be doing nested loop joins instead of a hash join.

379
00:37:42,000 --> 00:37:53,000
But if I'm picking to always do extra join before I check my joiner, yes, I would have a disconnect between the access method and the joiner. For this approach, yes, that's a problem.

380
00:37:53,000 --> 00:38:01,000
The stratified search and unified search will fix that because we'll get everything out once.

381
00:38:02,000 --> 00:38:15,000
So what's one problem with this query here? It's actually not correct, right? Because my original query said I wanted to join these three tables, but I also wanted to do an order by on the final output.

382
00:38:15,000 --> 00:38:22,000
So in the original implementation of system R, this dynamic programming search piece had no notion of physical properties of data.

383
00:38:22,000 --> 00:38:39,000
So I'm choosing to do a hash join. If I go back here, what my choices could have been, you know, a certain merge join. So maybe in the case, I wouldn't better off doing the certain merge join because then my data would have been sorted.

384
00:38:40,000 --> 00:38:51,000
So the way IBM handles this, or the system R handle this is that they would keep track of the best plan they've seen with and without a physical property like the sort order.

385
00:38:51,000 --> 00:38:59,000
And then they would have that, they would have two plans at the end, and then they would say, okay, my data needs to be sorted.

386
00:38:59,000 --> 00:39:13,000
So if I have an estimate what the sort cost is going to be, if I add that on to my unsorted data query plan, is that going to be less than the cost of doing the sorting directly within the sort of merge join?

387
00:39:13,000 --> 00:39:26,000
And if it's still less, then you pick that one. So it's sort of like an afterthought they had to add the additional step to deal with physical properties of the data because they had no way to handle that natively in the search.

388
00:39:26,000 --> 00:39:37,000
Yes. So what are you talking during after the total parameters are, you do the sort of our just part of the join, like you do the sorting of part of the join, or you add an order by like a sort of node above?

389
00:39:37,000 --> 00:39:44,000
Yes, correct, yes. So saving is what I'm talking about in this case here because the query wants the data to be sorted by artist ID.

390
00:39:44,000 --> 00:39:54,000
If I if I did a sort of join on artist ID here, then this the output of this would have been sort of on the way that the query wants.

391
00:39:54,000 --> 00:40:03,000
So you keep track of this query plan and then because it says it's the best one of all the ones that are sorted, then you keep track of the one that you pick that is not sorted.

392
00:40:03,000 --> 00:40:13,000
And then at the end of the end you do this final step to say, okay, if I add an order sort operator on the unsorted hash join, is that going to be less than choosing the path of merge join?

393
00:40:13,000 --> 00:40:18,000
If yes, then I choose it. If no, then I then I revert back to my merge join. Yes.

394
00:40:18,000 --> 00:40:23,000
So simple downfall over here is not looking at the entire query plan just to get to the endfall.

395
00:40:23,000 --> 00:40:27,000
Is it saving is the down, it's a downfall?

396
00:40:27,000 --> 00:40:30,000
I mean the reason it's bad. It's not again, it's not bad.

397
00:40:30,000 --> 00:40:39,000
The reason why this is maybe insufficient for what we need is that they can't holistically look at all the possible choices you could have in the actual query.

398
00:40:39,000 --> 00:40:51,000
Right? In addition to the heuristic set that they have in the beginning, is they actually going to look a lot like the thing we saw before with the ingress and others.

399
00:40:51,000 --> 00:40:56,000
Not how ingress to joins, but those logical transformations are going to be written as if and else close.

400
00:40:57,000 --> 00:41:04,000
When these transformations have any like idea of underlying algorithms, like you know, like, what's the other layers of tables need to start rescuering?

401
00:41:04,000 --> 00:41:13,000
If you have like merges that preserve what sort of fluidiness is, is it equal to like popping up that opposite of absolute capture of the Earth?

402
00:41:13,000 --> 00:41:21,000
His question is, is it possible the transformation rules to understand what the data's properties look like so that and encounter that in its decisions?

403
00:41:21,000 --> 00:41:26,000
System R does not, they have later ones will. Right? Yes.

404
00:41:26,000 --> 00:41:33,000
So, if you wanted to do the rest of the code, you're probably going to do it after building up the tree right to the way you have ingress one.

405
00:41:33,000 --> 00:41:37,000
You say it is, if you want to start doing heuristic rules, you do this after this search thing?

406
00:41:37,000 --> 00:41:38,000
Yeah.

407
00:41:38,000 --> 00:41:39,000
No, you do this at the end.

408
00:41:39,000 --> 00:41:40,000
You do this at the end?

409
00:41:40,000 --> 00:41:44,000
Yes. You can go back and touch it up. What purpose does? Right?

410
00:41:44,000 --> 00:41:49,000
If you do this search, then they go back and do some other addition operations potentially.

411
00:41:49,000 --> 00:41:59,000
Right. And then you would be sort of forced if you wanted to do the exact same after the joint search you need to make sure that the bone log is on there.

412
00:41:59,000 --> 00:42:00,000
Right?

413
00:42:00,000 --> 00:42:01,000
Yes.

414
00:42:01,000 --> 00:42:03,000
Because then this generation is for the cooperator.

415
00:42:03,000 --> 00:42:04,000
Yes.

416
00:42:04,000 --> 00:42:08,000
So, if you want to do transformations, logical things, you need to do it.

417
00:42:08,000 --> 00:42:16,000
You need to have a physical plan. You can do digital physical transformations on it.

418
00:42:16,000 --> 00:42:20,000
Presca says, you're looking at the Presca's code, they do the joint sort.

419
00:42:20,000 --> 00:42:25,000
They pick the joint, they do a bunch of transformations at the beginning, then they do the, there's cost-based joint-journal ring.

420
00:42:25,000 --> 00:42:29,000
Then they go back and touch it up and do additional physical optimizations.

421
00:42:29,000 --> 00:42:31,000
So, the touch ups would be physical and physical transformation?

422
00:42:31,000 --> 00:42:33,000
Correct. The touch ups would be physical and physical. Yes.

423
00:42:33,000 --> 00:42:39,000
Okay.

424
00:42:39,000 --> 00:42:46,000
So, as I said before, this is an NP-complete problem.

425
00:42:46,000 --> 00:42:54,000
We could run this forever and may not ever actually find the two physical plans.

426
00:42:54,000 --> 00:42:57,000
So, we need a way to know when we should stop.

427
00:42:57,000 --> 00:42:59,000
So, we need a notion of search termination.

428
00:42:59,000 --> 00:43:04,000
And this will both arise in, we need this for lectures and so far in System R.

429
00:43:04,000 --> 00:43:09,000
But we'll need this in the stratified search and the unified search of the catkids.

430
00:43:09,000 --> 00:43:13,000
So, the simplest thing they do is to do wall clock time.

431
00:43:13,000 --> 00:43:23,000
This is basically, you know, with Presca's and other systems, you can set basically a time out of how long you want the career optimizer to actually run based on a physical wall clock time.

432
00:43:23,000 --> 00:43:33,000
You can set a cost threshold where you recognize that if I generate a, the first plan that I see has some kind of cost estimate.

433
00:43:33,000 --> 00:43:44,000
And then if I run for a certain amount of time and I produce a plan that's maybe 10% better or some remember like that, then I just say, all right, that's probably good enough and you stop.

434
00:43:44,000 --> 00:43:49,000
Of course, now, because you still need the wall clock time because this thing could be unbounded because maybe you never find actually anything better.

435
00:43:49,000 --> 00:43:54,000
So, you still need to account for that and maybe cut things all right.

436
00:43:54,000 --> 00:44:00,000
You can try to be dynamic on this, right?

437
00:44:00,000 --> 00:44:04,000
If you can estimate the complexity of the query and say, okay, well, it's a 20 table join.

438
00:44:04,000 --> 00:44:11,000
So, let me go ahead and give it, you know, 10 seconds versus like a one, two table join, you know, maybe give it, you know, half a second or something like that.

439
00:44:11,000 --> 00:44:21,000
But that's a really hard problem because you're essentially trying to predict how long a query is going to run before it actually, you actually know what the query plan is going to be.

440
00:44:21,000 --> 00:44:26,000
It is possible to just recognize that I bet there's no more things for me to examine.

441
00:44:26,000 --> 00:44:30,000
Let me go ahead and stop so you can do this on the sub plan or the group we'll see in cascades.

442
00:44:30,000 --> 00:44:35,000
Like if I know that there's nothing ever, there's no other permutations I need to consider for some sub plan.

443
00:44:35,000 --> 00:44:42,000
Let me just go ahead and stop and keep spending wheels trying to try additional things.

444
00:44:42,000 --> 00:45:03,000
The last one actually comes from Microsoft, which I think is actually really clever and it seems, and it seems obvious after they sort of say it, where they found that instead of specifying any of these other metrics, like, you know, the walk-alk time, which you really care about is the number of transformations that you've actually considered.

445
00:45:03,000 --> 00:45:08,000
And that's what they use to just determine whether to stop or not.

446
00:45:08,000 --> 00:45:14,000
Because the idea is that some transformations may be cheap to apply, some may be expensive.

447
00:45:14,000 --> 00:45:31,000
So I want to know, like, I get a rough estimate of how long you think a transformation is going to take on average and the number of trends I need to apply, and then you sort of calibrate that to see, this is when I see most of the benefit for the queries that I'm showing throwing into it.

448
00:45:31,000 --> 00:45:45,000
And then now that's independent of actually the hardware. So no matter whether someone's running on a cell phone or a really expensive, you know, high end server, to get the right query plan, it's the number of transformation you apply rather than the walk-alk time.

449
00:45:45,000 --> 00:45:46,000
Yes.

450
00:45:46,000 --> 00:45:53,000
So the server transformations just, like, somewhere easier as 100 to apply, but they, like, waited, sort of, like, it's, like, not just a hard number.

451
00:45:53,000 --> 00:45:57,000
Waited in terms of, like, the, oh, for, like, the count?

452
00:45:57,000 --> 00:45:58,000
Yeah.

453
00:45:58,000 --> 00:45:59,000
Actually, I don't know.

454
00:45:59,000 --> 00:46:01,000
I don't think they mentioned it.

455
00:46:01,000 --> 00:46:02,000
Who's they?

456
00:46:02,000 --> 00:46:03,000
Microsoft.

457
00:46:03,000 --> 00:46:04,000
In their talk.

458
00:46:04,000 --> 00:46:05,000
Yeah.

459
00:46:05,000 --> 00:46:08,000
Yeah, they don't mention it.

460
00:46:08,000 --> 00:46:09,000
All right.

461
00:46:09,000 --> 00:46:10,000
So, uh,

462
00:46:11,000 --> 00:46:15,000
the pros and cons of this, this actually works pretty well in practice.

463
00:46:15,000 --> 00:46:21,000
As I said, most of, most of the participants are going to use something that looks a lot like this.

464
00:46:21,000 --> 00:46:30,000
And you can do additional rules, again, to filter out things, like, only looking at my deep joins, to prune this, the, the search base to limit the scope and how long it things actually can take.

465
00:46:30,000 --> 00:46:39,000
The outside is going to be, like, if you start throwing away things, like, but she joins, then you may be just, just, clearly, missing what the actual two optimal plans are going to be.

466
00:46:39,000 --> 00:46:40,000
Right?

467
00:46:40,000 --> 00:46:46,000
Because you're making these decisions to prune things out, without considering, uh, anything about cost.

468
00:46:46,000 --> 00:46:54,000
And as we said, in the case of some R case, you got to do extra steps to deal with the physical property.

469
00:46:54,000 --> 00:47:10,000
So, the two approaches that I showed so far, these are typically written in embedded inside the database system, as I was saying, as more or less, if the analysis causes, if my query plan looks like this, then do this transformation.

470
00:47:10,000 --> 00:47:11,000
Right?

471
00:47:11,000 --> 00:47:20,000
And if you ever looked at the Postgres code, at least with the query optimizer, and the sub plan, sub plan function, it is like, I do these, check these things, then I check these things, then I check these things, then I check these things.

472
00:47:20,000 --> 00:47:28,000
And when you go look at them, there are more or less, if the analysis causes, that are looking for queries for certain pattern.

473
00:47:28,000 --> 00:47:48,000
But the challenge is that, is that, of these approaches, it's really hard to write a query optimizer in this style code, because it's, you're writing it in procedural code, and you're going to make mistakes, or you're going to deal with a lot of duplicate logic to identify patterns and so forth, and then apply certain rules.

474
00:47:48,000 --> 00:47:55,000
And then check to see whether the rule you just apply breaks some other assumption you have about the query plan.

475
00:47:55,000 --> 00:47:57,000
Right?

476
00:47:57,000 --> 00:48:16,000
So, a better approach to do this, and what people figured out in late 80s, and what is used in the state of systems today, is that, instead of writing the code, for, here's actually the check I want to apply, and then the change I want to make, you write the pattern in a high level DSL,

477
00:48:16,000 --> 00:48:27,000
that's looking for queries of a certain type, with notes, operatives of certain type, and then the transformation rule, ideally in a DSL, but not always the case, because you can't do that.

478
00:48:27,000 --> 00:48:37,000
And then you, you then have a optimizer, or you have your system, generate the code that does those pattern checks and transformations for you.

479
00:48:37,000 --> 00:48:41,000
It's very similar to the JIT or Code Gen stuff we talked about for queries.

480
00:48:42,000 --> 00:48:55,000
So, in the late 80s, early 90s, there was this big movement on what are creating what are called optimizer generators, where again, the idea is that you declare in a high level language, here's the patterns I want to check for, and then here's transformations I want to apply when those patterns match.

481
00:48:55,000 --> 00:49:09,000
And now I can build these, I can then convert these into a, and a code gen, you know, code gen into the actual code, that I put inside my database system, and I only do this when I'm actually compiling the thing, and not like, you know, on a per-cordy basis.

482
00:49:09,000 --> 00:49:18,000
And then now I can then build the search strategy, or the search mechanism to then look for those patterns and apply them independently of the rules themselves.

483
00:49:18,000 --> 00:49:23,000
So, somebody, so one team can go ahead and build the search engine, another team can go ahead and define the rules.

484
00:49:23,000 --> 00:49:30,000
And now I've been in this single location, I have all my rules to find, and I can easily extend them and expand them over time.

485
00:49:31,000 --> 00:49:40,000
So, this is what we're going to see in all the newer approaches, either doing stratified search and unified search, these are all based on optimizer generators.

486
00:49:40,000 --> 00:49:55,000
And the two big projects at the time that sort of led this idea was IBM Starburst, which is still using DB2 today, and the first version was Exodus, which is a precursor to the volcano, which is a precursor to cascades.

487
00:49:56,000 --> 00:50:02,000
In at building the guy built three chore optimizers, cascades is the last one he ended up on.

488
00:50:02,000 --> 00:50:08,000
So again, the idea is getting your co-genic, the chore optimizer's patterns based on some higher level language.

489
00:50:08,000 --> 00:50:12,000
So, the two ways to approach this are going to be a stratified search and a unified search.

490
00:50:12,000 --> 00:50:24,000
And I've already started talking about this already, but the stratified search is that I'm going to do a bunch of transformations in the beginning based on heuristics, things where I know I always want to apply certain rules.

491
00:50:24,000 --> 00:50:27,000
And then I go ahead and do my call space search.

492
00:50:27,000 --> 00:50:30,000
The unified search is trying to do this all at once.

493
00:50:30,000 --> 00:50:38,000
And for, again, another way to, it's not exactly always going to be top down versus bottom up, right?

494
00:50:38,000 --> 00:50:41,000
But you can think cascades is a unified search and that's a top down approach.

495
00:50:41,000 --> 00:50:43,000
Because everything's all in the mix and you're trying to figure things out.

496
00:50:43,000 --> 00:50:49,000
And then Starburst and others are going to be stratified search, but they're primarily going to be using the bottoms up.

497
00:50:49,000 --> 00:50:55,000
But you could do this in a stratified search. You could do a top down search and stratified search.

498
00:50:55,000 --> 00:51:08,000
Basically, that's what Microsoft does. They have a bunch of rules that you know you always want to apply, like Praticant pushdown, and even though they're defined in the same DSL that you would use for the cost based search, they sort of fire those at the very beginning.

499
00:51:08,000 --> 00:51:12,000
And only at the end later on, then they do the unified search to clean things up further.

500
00:51:12,000 --> 00:51:13,000
Yes.

501
00:51:13,000 --> 00:51:16,000
What would a complicate thing say?

502
00:51:16,000 --> 00:51:19,000
CalSai, I think they claim they're based on volcano.

503
00:51:19,000 --> 00:51:20,000
Yeah.

504
00:51:20,000 --> 00:51:24,000
But they claim that, but I think when we look at it, the lines get blurry.

505
00:51:24,000 --> 00:51:27,000
They claim the volcano, but it looks like cascades when I look at it.

506
00:51:27,000 --> 00:51:30,000
And as far as I can tell, I think they're doing stratified.

507
00:51:30,000 --> 00:51:33,000
Because they're doing a bunch of rules you want to apply.

508
00:51:33,000 --> 00:51:35,000
And then they do a cost based search.

509
00:51:35,000 --> 00:51:38,000
But I may be wrong. I haven't looked at the code in a long time.

510
00:51:38,000 --> 00:51:39,000
Yes.

511
00:51:39,000 --> 00:51:42,000
If you're applying, you always want to apply a negative blockade.

512
00:51:42,000 --> 00:51:44,000
Isn't that just stratified?

513
00:51:44,000 --> 00:51:46,000
Yes, I'm saying the lines get blurred.

514
00:51:46,000 --> 00:51:48,000
So cascades is a unified approach.

515
00:51:48,000 --> 00:51:57,000
The way Microsoft implements cascades is a stratified plus, you know, is the heuristics, then the search.

516
00:51:57,000 --> 00:51:58,000
Yes.

517
00:51:58,000 --> 00:52:07,000
So what's the DSL, which you can work the logical plan into some DSL and you just met with a recommendation before you come pilot?

518
00:52:07,000 --> 00:52:14,000
The question is, would you convert the DSL, would you convert the logical plan into a...

519
00:52:14,000 --> 00:52:20,000
Something similar to what the DSL is, like, like, a negative blockade rule and then you convert or is it...

520
00:52:20,000 --> 00:52:23,000
No, the DSL would say like, I want to find...

521
00:52:23,000 --> 00:52:34,000
If I see these, something high level construct, or definitely just say, if I see these three operator nodes next to each other, or in line, then apply this rule.

522
00:52:34,000 --> 00:52:41,000
So you're not, like, you're defining what you want to see in the data structure of the query plan.

523
00:52:41,000 --> 00:52:51,000
And then the transformation rule, ideally, if you can write that into the DSL, but nobody actually does, that's usually, like, going to be C++ or something that's the same language that the system's written in.

524
00:52:51,000 --> 00:52:55,000
The transformation rules still means the procedure.

525
00:52:55,000 --> 00:53:00,000
The transformation you actually apply doesn't...

526
00:53:00,000 --> 00:53:07,000
Like, the original definition of these upmatched generators did not define it like that and practice everyone does.

527
00:53:07,000 --> 00:53:18,000
I think in Cocker's DB, I think they have it for the rules themselves. They have it in their DSL, but you can then escape that and fall back down the go.

528
00:53:18,000 --> 00:53:20,000
Yes?

529
00:53:20,000 --> 00:53:28,000
Is the difference between these two that a unified search is already in the same DSL and start by search search?

530
00:53:28,000 --> 00:53:36,000
No, so his question is, is the key difference that the unified search and start by search is that these are all written in the same DSL and these are all written separately?

531
00:53:36,000 --> 00:53:43,000
No. It's like, are you going to do... are you going to apply much transformation rules without a cost model?

532
00:53:43,000 --> 00:53:46,000
Or do you do everything all at once with a cost model?

533
00:53:46,000 --> 00:53:50,000
But SQL Server is a... is there a fight about the cost model?

534
00:53:50,000 --> 00:53:53,000
They're using Cascades. That's what I'm saying, the lines are blurry.

535
00:53:53,000 --> 00:53:57,000
Let's not... I'm working on top down versus bottom up. How about that?

536
00:53:57,000 --> 00:54:02,000
Okay. So, again, stratified search, again, the thing we've already talked about.

537
00:54:02,000 --> 00:54:07,000
You first do all the transformation rules on the logical plans.

538
00:54:07,000 --> 00:54:12,000
And you don't consider cost.

539
00:54:12,000 --> 00:54:17,000
And you basically, as the programmer, the system, you define, here's the rules I always want to consider.

540
00:54:17,000 --> 00:54:24,000
Now, you can search engine, it could be clever, and figure out, okay, well, I know the properties of the query plan,

541
00:54:24,000 --> 00:54:35,000
and I would have enforcer rules in my... from enforcer rules that make sure the properties are being maintained when going from one plane to the next,

542
00:54:35,000 --> 00:54:41,000
you can have all that in the mix, but the idea, again, we're doing these transformations without any kind of cost model.

543
00:54:41,000 --> 00:54:44,000
So, it's not an exhaustive search.

544
00:54:44,000 --> 00:54:50,000
And then I do the cost based search to figure out the logical plan, convert the logical plan to a physical plan.

545
00:54:50,000 --> 00:54:54,000
So, Starburst was the first one that did something like this.

546
00:54:54,000 --> 00:55:00,000
And again, you see the basic two stages, the rewrite stage, where I'm just like before in System R,

547
00:55:00,000 --> 00:55:04,000
I'm breaking down this Chinese SQL query into blocks.

548
00:55:04,000 --> 00:55:11,000
In this case here, they're actually converting the query plan into relational calculus, not relational algebra.

549
00:55:11,000 --> 00:55:15,000
It's... take that little line.

550
00:55:15,000 --> 00:55:21,000
It's like existential qualifiers and things like that.

551
00:55:21,000 --> 00:55:26,000
It's less... it doesn't map easily to executable code.

552
00:55:26,000 --> 00:55:28,000
It's more mathematical.

553
00:55:28,000 --> 00:55:34,000
I don't teach relational calculus anymore because unless you go work on query optimizers, what she's going to do, sorry.

554
00:55:34,000 --> 00:55:37,000
Like most people don't need this.

555
00:55:37,000 --> 00:55:43,000
We use the teacher, we don't teach normal forms, there's a bunch of stuff like in the text where we just don't teach.

556
00:55:43,000 --> 00:55:50,000
Basically, again, it's more higher level expressiveness for relational algebra in relational calculus.

557
00:55:50,000 --> 00:55:56,000
I don't... I don't know if Cod invented it. It's from the 70s though.

558
00:55:56,000 --> 00:56:05,000
So they convert it to this higher level form, do a bunch of these rewrites, then they convert that back to a logical plan,

559
00:56:05,000 --> 00:56:11,000
or the query graph model they call it, and then you do a System R style, bottoms up, dynamic programming,

560
00:56:11,000 --> 00:56:14,000
phase to figure out the join or additional optimizations.

561
00:56:14,000 --> 00:56:18,000
So this is what DB2 still even uses today.

562
00:56:18,000 --> 00:56:25,000
And as far as I know, again, the lines get blurry, is CalSight technically doing stratified search?

563
00:56:25,000 --> 00:56:30,000
Yes, but I don't think anybody converts to relational calculus other than IBM.

564
00:56:30,000 --> 00:56:39,000
And so, for this exact invitation of relational calculus into logical plans and then logical and physical in the step-per-step here,

565
00:56:39,000 --> 00:56:41,000
as far as I know only DB2 does it.

566
00:56:41,000 --> 00:56:46,000
But the tricky thing is DB2 doesn't do this for all... Sorry. IBM doesn't do this for all versions of DB2.

567
00:56:46,000 --> 00:56:51,000
So this, I mean, I know that there's actually four separate code bases of DB2.

568
00:56:51,000 --> 00:56:59,000
There's DB2 for ZOS, DB2 for the A900 thing from the 1970s, and there's...

569
00:56:59,000 --> 00:57:03,000
Then there's one for Linux, Unix, and Windows, and there's a fourth one I'm forgetting.

570
00:57:03,000 --> 00:57:05,000
But they're all completely separate code bases.

571
00:57:05,000 --> 00:57:14,000
And the one that they built for Linux and Unix is actually derived from an earlier project called OS2 Database Manager,

572
00:57:14,000 --> 00:57:16,000
who here has ever heard of OS2?

573
00:57:16,000 --> 00:57:23,000
One. It's the operating system that IBM built in the late 80s or 90s to overtake Windows before Windows became huge.

574
00:57:23,000 --> 00:57:28,000
Because IBM was... IBM made the first personal PCs, but they made it overcome out of your hardware.

575
00:57:28,000 --> 00:57:36,000
Everybody started cloning them. So if you look at old magazines, they talk about PCs being IBM PC compatible or cloning compatible.

576
00:57:36,000 --> 00:57:41,000
They're just redoing similar things that IBM did. IBM wasn't making any money off of that.

577
00:57:41,000 --> 00:57:47,000
They got back into the operating system business for personal computers. They made OS2, Windows killed them.

578
00:57:47,000 --> 00:57:52,000
Anyway, so they had this database manager system that they built for OS2,

579
00:57:52,000 --> 00:57:57,000
that then one of the poor renamed OS2 to DB2 and port this.

580
00:57:57,000 --> 00:58:05,000
But in this great blog article from James Hamilton, James Hamilton basically helped set up all 80bOS's infrastructure and clogged up beating stuff.

581
00:58:05,000 --> 00:58:11,000
He's a big deal there. But he has this great blog article because he used to work on IBM and actually SQL Server as well.

582
00:58:11,000 --> 00:58:17,000
But it talks about how in the early 1990s, they had this crappy implementation of a database system in OS2,

583
00:58:17,000 --> 00:58:22,000
but then they went to IBM Research and got the Starburst query up and put that in.

584
00:58:22,000 --> 00:58:28,000
So the links on the slides, it's a really good blog article. Yes.

585
00:58:28,000 --> 00:58:35,000
What do you generally then do you think you can bring into relation to the relationship of the line of countries where it's there?

586
00:58:35,000 --> 00:58:42,000
What do the advantages to operating on relational calculus rather than statistical operators?

587
00:58:42,000 --> 00:58:47,000
I don't know offhand. I'm sure there are.

588
00:58:47,000 --> 00:58:55,000
Yeah. It might be just a higher form that you then can apply additional optimizations on. I don't know.

589
00:58:56,000 --> 00:59:06,000
Again, outside of Starburst, I don't, you know, across anything that's outside of theory in database systems that operate on relational calculus.

590
00:59:06,000 --> 00:59:13,000
All right. In the sake of time, we'll just skip this. But like the Starburst operator works ground practice.

591
00:59:13,000 --> 00:59:20,000
But in the, I don't think the paper you guys read talked about this, but in a lot of the follow up papers from IBM, they talk about there are struggles of writing the,

592
00:59:20,000 --> 00:59:27,000
the engineer's struggle with writing the transformation rules in this DSL that IBM had.

593
00:59:27,000 --> 00:59:34,000
Again, I think part of it is because you're operating on relational calculus, which is unnatural. Again, we can cover that further if you want to apply.

594
00:59:34,000 --> 00:59:40,000
All right. So the last 20 minutes are going to try to cover cascades. Let's see how far we can get with this.

595
00:59:40,000 --> 00:59:46,000
Okay. So again, unified search is that logical logical and logical physical or all within one giant stage.

596
00:59:46,000 --> 00:59:51,000
Of course, the challenge is going to be that there can be a lot of transformations that we're going to generate as we do this.

597
00:59:51,000 --> 01:00:01,000
And so we're going to try to, we're going to use memoization as a way to keep track of what we've done in an efficient manner and try to reduce the amount of, we're done at work or done in computation that we're doing.

598
01:00:01,000 --> 01:00:07,000
So in the future, what volcano does was, and then we'll see deficiencies of that and then we'll jump into cascades.

599
01:00:07,000 --> 01:00:15,000
So, so, vol, again, the computing is, there's a volcano approach. The due to the legendary. So the, the volcano project of the system,

600
01:00:15,000 --> 01:00:20,000
defines the iterator model that we all know about, defines the exchange operator due to parallel computation.

601
01:00:20,000 --> 01:00:25,000
But then he's also about a state of their optimizer generator that could be used for these things as well.

602
01:00:25,000 --> 01:00:30,000
As far as they know, nobody does us, although calcite claims they do this, there's based on this.

603
01:00:30,000 --> 01:00:38,000
But this is one of the first approaches that doing a, a, a top down on search to generate query plants.

604
01:00:38,000 --> 01:00:43,000
So, again, in the top down approach, you start with the top. You start with like, this is the output I want.

605
01:00:43,000 --> 01:00:48,000
They're going to work down from the bottom and assemble the pieces you need to get back to that top.

606
01:00:48,000 --> 01:01:00,000
So the, you're basically going to vote all these, these transformation rules that you have to, to, to generate new physical nodes and logical nodes based on where you're at in the query plant.

607
01:01:00,000 --> 01:01:07,000
Right? So here's all the things, you know, combinations I could have just like before leading down to the individual scans on each of the tables.

608
01:01:07,000 --> 01:01:23,000
So in the first step here, I could apply transformation rules to convert the, the, the physical join or sort of the logical join and artists appears an album into a emerge join onto the, two of the tables and then have a third table just being fed into it.

609
01:01:23,000 --> 01:01:32,000
Right? So then I traverse down here and then I say, okay, well for this physical operator, these are the logical operators that fed into me to get me to, to this result.

610
01:01:32,000 --> 01:01:40,000
So then I applied transformation rules to, to then generate the physical operators that produced the result that I was fed into there.

611
01:01:40,000 --> 01:01:48,000
And as I'm going down, I'm estimating the cost which I'm not showing here of each of these physical operators summing up the total back up to the root.

612
01:01:48,000 --> 01:01:52,000
And that tells me the cost to, you know, where I'm at at this branch in the search stream.

613
01:01:52,000 --> 01:01:57,000
Again, then I get down here and say, well, what fed into, get me to this.

614
01:01:57,000 --> 01:02:03,000
And then I could, I'm not showing here, but you could pick then the access method for you individual tables.

615
01:02:03,000 --> 01:02:11,000
Go back up here, traverse down the other side. Here's the merge join for the other two tables, produce this same thing I'm causing as I'm going along.

616
01:02:11,000 --> 01:02:15,000
Right? You just keep doing this and over and over until you produce the final result.

617
01:02:15,000 --> 01:02:32,000
And again, because we care about what the, the sort order is for the table in the output, I have these additional portion rules that I'm defining to make sure that any data that's being fed into me from operators down below is putting the data in the, in the, in the physical property that I need or expect.

618
01:02:32,000 --> 01:02:44,000
So in this case here, because I care about the, the data being sorted by artist ID, if I, if I then apply transformation rule that generates a, a hash join, in this case here, that hash join cannot guarantee the data is sorted.

619
01:02:44,000 --> 01:02:50,000
So I can go ahead and just cut this off and I know don't need to any further traversal down into to that branch.

620
01:02:50,000 --> 01:02:56,000
Likewise, if I say, okay, I have a quick sort operator, well that, that I get my data sorted that the way I wanted.

621
01:02:56,000 --> 01:03:02,000
But then if I come down here, expand it out now to say, well, what was the physical operators, operators feeding into me?

622
01:03:02,000 --> 01:03:05,000
If I then say, oh, I could do a hash join below.

623
01:03:05,000 --> 01:03:13,000
And now the cumulative cost of the quick sort plus the hash join is greater than the lowest path I've seen down to the bottom.

624
01:03:13,000 --> 01:03:18,000
Then I know I don't need to expand this any further and I can cut off this branch right there.

625
01:03:18,000 --> 01:03:23,000
This is classic branch of balance search, nothing fancy here.

626
01:03:23,000 --> 01:03:26,000
All right, so let's jump the cascades.

627
01:03:26,000 --> 01:03:32,000
So the reason why I don't have you read the original cascades paper is that it's actually not that great.

628
01:03:32,000 --> 01:03:35,000
Have you guys read it?

629
01:03:35,000 --> 01:03:42,000
It's not like you keep banging on how great his stuff is object oriented because that was the hot thing in the 90s and volcano and Exodus were not.

630
01:03:42,000 --> 01:03:46,000
But you can't, you can't actually can't take this paper and actually implement it.

631
01:03:46,000 --> 01:03:52,000
The best you could do is this thing from, it's a master's thesis from, from 1998 at a Portland State,

632
01:03:52,000 --> 01:03:57,000
or the first 30 pages tells you actually what cascades is actually doing way better than the original paper is.

633
01:03:57,000 --> 01:04:03,000
So if you want to know what cascades is, you could read again pages one to 31 and I'll tell you how to do it in there.

634
01:04:03,000 --> 01:04:06,000
But this will begin to be a quick crash course on it.

635
01:04:06,000 --> 01:04:11,000
So the key, just like in volcano, we're going to top down approach, backward chaining.

636
01:04:11,000 --> 01:04:24,000
But the key thing is that now we're going to sport rewriting through these direct mapping functions that can iteratively generate the transformations apply them to fan out the search tree rather than doing them all at once.

637
01:04:24,000 --> 01:04:33,000
So I didn't show in the case of volcano because it's PowerPoint. But like every time I went down to another node, I immediately applied the transformation rule that generate all the possible combinations below me.

638
01:04:33,000 --> 01:04:43,000
And then I would iteratively look at them one by one. Of course now that would be super sensitive to do if it really complex query plan because now the search base is going to balloon and you're going to run out and run out of memory.

639
01:04:43,000 --> 01:04:52,000
So the key idea they're going to do is they're going to introduce placeholders to say, here's what the data should look like below me at this part of the tree.

640
01:04:52,000 --> 01:04:58,000
But I don't actually know what the right way to execute it just yet is. So I'm just going to have a placeholder for now.

641
01:04:58,000 --> 01:05:10,000
And then only when when I care about going that further, then I can expand it out. But now I can expand it incrementally based on a priority that I can define to say, here's the things actually I should be looking at first.

642
01:05:11,000 --> 01:05:16,000
And you define that all within the construct of the DSL that you're defining these rules.

643
01:05:17,000 --> 01:05:30,000
So the four key ideas, one is that all the options in the task are going to be self-contained data structures. So node, if analysis, think of these like structs or objects to say, here's the pattern I want to match in my query plan.

644
01:05:31,000 --> 01:05:42,000
And if you match, apply this rule and the additional metadata specify like what are the properties I need, I need a guarantee or that I'll generate from this transformation rule for this operator and what priority do I want to give it?

645
01:05:44,000 --> 01:05:53,000
And this priority stuff is going to be interesting because now as I'm traversing down, I can dynamically change, although Microsoft doesn't do this, but in the virtual paper they talk about it or the master's thesis.

646
01:05:54,000 --> 01:06:04,000
You can, as you look, go down and you recognize my query plan is looking a certain way, I can say, well, I want to apply these transformation rules because I think that's going to help me out better than just picking one at random.

647
01:06:09,000 --> 01:06:21,000
And then the other key thing is that, although Microsoft doesn't do this, but CochlearDB does, is that when you think about doing optimization on the where clause, the expression, the predicates inside the query plan, well, that's just another tree.

648
01:06:22,000 --> 01:06:35,000
And so, within the same search engine or the rules engine, you can do optimization for the where clause expressions, in the same way you can do optimizations for the operator tree.

649
01:06:36,000 --> 01:06:45,000
So simple things like, I can identify where one equals two, you could have a rule that then gets fired to say convert one equals two into false.

650
01:06:46,000 --> 01:06:51,000
Instead of having to do these optimizations separately.

651
01:06:53,000 --> 01:06:54,000
So, yes.

652
01:06:55,000 --> 01:06:56,000
You go over the second term.

653
01:06:57,000 --> 01:06:58,000
Question, go to the second term.

654
01:06:59,000 --> 01:07:13,000
So, this, so basically you define in the implementation of the, of the, of the, the, the optimization task, like a pattern plus a transformation rule, you define in that within directly, here's the properties that I need you to enforce.

655
01:07:14,000 --> 01:07:21,000
And then the, the surgeon can recognize, okay, suddenly feeding into me is going to violate that. So, therefore I can't, I can't choose anything below that.

656
01:07:22,000 --> 01:07:28,000
And the second one basically says, like, if I recognize as I'm going along, I'm trying to think, I have an example here.

657
01:07:29,000 --> 01:07:46,000
Yeah, I don't have an, I don't want to make an example. Like, if I'm, if, as I'm traversing, I may want to consider some transformations more sooner, sooner than others.

658
01:07:46,000 --> 01:08:07,000
Like, for example, if I know my, if my, my operator, but me say is an index nest at loop join, when I go down below, rather than that looking all possible transformations from logical to physical, like choosing a sweatshirt scan, and then adding, adding a sort, I may want to just choose the index probe first.

659
01:08:08,000 --> 01:08:11,000
Because then that, that gives me the data in the right order that I need going up.

660
01:08:12,000 --> 01:08:14,000
So, that also applies in the hot, the priority.

661
01:08:15,000 --> 01:08:24,000
Yes, this is what the priority, it's, it's generated on the fly. Well, so, the case of Microsoft, I think they just like hard coded it. So, yes, part of the task itself.

662
01:08:25,000 --> 01:08:35,000
And there is no paper, which, which, cockroaches you be, I think, I think they said they actually do. I actually, actually, I, I don't know whether anybody does this, but in theory, you could, you could dynamically change this as you go along.

663
01:08:35,000 --> 01:08:44,000
So, even though you may, you may revisit the same, you may come back to the, to a same group later on.

664
01:08:45,000 --> 01:08:50,000
Because you did maybe not value everything, you could change the order, you, you, you by way stuff.

665
01:08:52,000 --> 01:09:02,000
All right, so this part is, I mean, confusing because I use expressions, it typically mean like the predicates and a wear cause, but in cascades, expressions going to be some, some operation within the query plan.

666
01:09:02,000 --> 01:09:16,000
That's going to do something, right, or, you know, do some, some amount of computation in the query plan. So, a logical expression could be, you know, three by join on a, B and C where I joined a, B and first followed by joining C.

667
01:09:17,000 --> 01:09:25,000
And the physical expression could then be the, I do a hash on it on, on a sweatshirt scan on for this, a special one for that, then to do this, let join on index probe on this.

668
01:09:25,000 --> 01:09:36,000
So, it's defining like some set of, I don't say operators, but tasks within our query plan that we want to then transform into physical operators.

669
01:09:37,000 --> 01:09:53,000
Right. And so, the key thing that we're going to exploit is obviously, equivalency rules in relational algebra, because we would know that, you know, we could switch the order of, of A, join B, to be, B, join A. And that will still produce this, you know, the same correct result that we would want.

670
01:09:53,000 --> 01:10:06,000
And so, we, we use that to define, when we do our transformations, if we're permuting things a certain way, that we're not violating any of those, these community, community properties, or other properties that we care about relational algebra.

671
01:10:07,000 --> 01:10:20,000
So, then now we have the definition of a group, and that'll be, for a given expression, it'll be all the, the logical and physical expressions that are equivalent to some output that, that would expect.

672
01:10:21,000 --> 01:10:35,000
So, in this case here, I want to, I want to produce the result of joining A, B, and C together, and my logical expressions within that group will be all the different permutations of, of doing those joins, and the physical expressions will be all the actual implementations of, of that.

673
01:10:38,000 --> 01:10:45,000
So, again, it's all the logical forms, and then all the physical forms that can be derived, that, from, from these, from these logical forms.

674
01:10:46,000 --> 01:10:58,000
So, the entire collection of these things is the group, in addition with the properties that we, we would, we would, we would need to be enforced going into this, and then we have all, again, all the equivalent expressions for the logical and physical.

675
01:10:59,000 --> 01:11:14,000
And then now we're going to find a multi expression, which is sort of confusing, but that's basically meant to be as a placeholder to say, here's some expression that I, that I have, but I don't know exactly the details what's going on in this.

676
01:11:15,000 --> 01:11:42,000
So, I'm going to go inside of it, and it's a placeholder to say, there's something below me in the search tree. So, for example, I want to join A, B, and C, so I could have, oops, sorry, I could have a, a multi expression to say, okay, there's a joint and A, B together, I don't know what order in which way, logically, and then I join with C, or I could join B, and C, and I don't define, again, what way I'm doing that, but it's just a placeholder to say, something below me in the tree is going to be, tell me how to do this.

677
01:11:42,000 --> 01:11:53,000
So, the idea is that we're using these multi expressions as a way to reduce the number of unique operators that we have to look at in this giant search tree.

678
01:11:54,000 --> 01:12:03,000
So, the idea again, because we're top down, we can make decisions by looking at this placeholder at this point, at some level in the tree, without having to go all the way to the bottom.

679
01:12:04,000 --> 01:12:11,000
In the case of a bottom-ups optimizer, you're enumerating all the multi expressions one at time and putting them together, going up to the top.

680
01:12:12,000 --> 01:12:17,000
In that case, they have not been materialized yet, because you're starting from the bottom, going to the top.

681
01:12:17,000 --> 01:12:24,000
In the case of the top down one, you assume sort of roughly that you have the path going down the bottom, even though you don't actually, at this point.

682
01:12:26,000 --> 01:12:31,000
So, this we've already talked about before, but basically, transformation rules, logical, logical, logical, physical.

683
01:12:32,000 --> 01:12:38,000
In the Cascades parlance, they'll say, a transformation rule is logical, logical, and the implementation rule is logical, physical.

684
01:12:38,000 --> 01:12:49,000
And then they'll have this pattern defined as the structure of the logical expression that you want to look for, and then you have a substitution to define the rule of the new structure you expect to see after you do this.

685
01:12:50,000 --> 01:13:01,000
Now, in some cases, you don't actually want to maintain the previous history, or the previous plan you've permitted or transformed the plan into, because you know something you always want to do.

686
01:13:02,000 --> 01:13:13,000
So, for example, converting one equals two in a false, I don't want to maintain that history of like, oh yeah, I did this transformation to convert one equals two to false, because you never want to go back.

687
01:13:14,000 --> 01:13:22,000
And so, there are ways to just always apply the change, and then not keep history, because you don't want to balloon up your history space.

688
01:13:23,000 --> 01:13:27,000
So, here's a look at a simple example of a rule.

689
01:13:28,000 --> 01:13:34,000
So, my pattern is that I want to have two equa joints with a right deep joint tree.

690
01:13:35,000 --> 01:13:42,000
So, each of these nodes here are corresponding to groups, because I'm not defining, at the rule level, what actually is going on inside this group.

691
01:13:43,000 --> 01:13:47,000
This could be an in-ex scan, it could be another joint, it could be whatever, it doesn't matter, it's just some group, it's a placeholder.

692
01:13:48,000 --> 01:13:54,000
We have to have a distinct equa joint, these are logical operatives, in this case here, you know, I'm joining two tables together.

693
01:13:55,000 --> 01:14:13,000
So, say this is my plan that matches this, so again, you see that I have my multi-expression at the top, doing A and B, but I'm not defining how I actually want to do this, but then when you traverse down and below, it says I'm joining A and B, and below that we have some get operatives corresponding to the axis path, the way you're actually retrieving this data.

694
01:14:14,000 --> 01:14:28,000
So, this plan here, a logical plan, would match to this rule, and I could have two types of transformations, two types of permutations, I don't really need to transformation, because that's a type of rule.

695
01:14:29,000 --> 01:14:38,000
But I could do a transformation rule that converts me from a left deep joint to a right deep joint, just rotating the tree so that the joints are coming down the right side.

696
01:14:38,000 --> 01:14:51,000
But again, this is converting a logical operators to another set of logical operators, or I could have an implementation rule that converts all the equa joints into, then to be all certainers joints, or hash joints, or whatever I want.

697
01:14:52,000 --> 01:15:00,000
So again, these are kind of, this is what the patterns are going to look like, and then we would match on this, and then we can do these changes based on that.

698
01:15:01,000 --> 01:15:14,000
In this case here, you can see how, in this case, we've joined with A and B on the server's join, but again, in this one here, we have to start the placeholder for the multi-expression, because that's feeding up into it.

699
01:15:15,000 --> 01:15:26,000
What's one obvious problem with this top one here? Because I'm going logical, logical, same with another plan that does right to left.

700
01:15:27,000 --> 01:15:33,000
We're going to end up with, same plan, infinite loop, you just keep flipping it back and forth.

701
01:15:34,000 --> 01:15:45,000
So this is where the memo table is going to help us out, because we can use that to keep track of, I've already applied this transformation, because I know the cost of the query plan at this point to avoid getting stuck in these infinite loops.

702
01:15:47,000 --> 01:15:56,000
So the memo table, at least in the original implementation or definition of the Columbia paper, talks about being a separate data structure, but you could actually embed this information into the groups themselves.

703
01:15:57,000 --> 01:16:04,000
In the sake of time, this is too heavy to go into for like the last three minutes.

704
01:16:05,000 --> 01:16:12,000
Let me show one example now, and then we'll come back to this. We'll start next class with this all over again.

705
01:16:13,000 --> 01:16:15,000
It's all this build, or at least we want to show what it looks like.

706
01:16:16,000 --> 01:16:24,000
So say this is our query plan we want to look like. Again, the memo table just keeps track of for any multi-expression. Here's the best physical expression we've seen with the given cost.

707
01:16:25,000 --> 01:16:32,000
So in the very beginning, we start at the top. We want to have a joint between A, B, and C, and we have no physical properties because we're not doing the order by for simplicity.

708
01:16:33,000 --> 01:16:47,000
So I could do a logical transformation to convert the transformation rule, apply it to my output, to generate a multi-expression on A and B, joined by C.

709
01:16:48,000 --> 01:17:00,000
So now I want to start costing this inside whether it's a worth pursuing further inspection of this multi-expression by traversing down to the query plan, say now my output would be A and join A and B.

710
01:17:01,000 --> 01:17:10,000
Well, I could join A, the one way to do this is join A followed by join B. And the reason why A and B are both the expressions is because I'm not defining how I'm actually getting this data, I'm not defining what the access method is.

711
01:17:11,000 --> 01:17:17,000
So to get further information about what this possible sub-plank will look like, I have to go down down to the tree now.

712
01:17:18,000 --> 01:17:26,000
And now in this case here, the only way to access A is to do a logical operator called get A. That's not interesting, I can't cost that because it doesn't tell me how I'm going to do it.

713
01:17:27,000 --> 01:17:33,000
But I can then do implementation rules to transform this into either a sequential scan on A or an index scan on A.

714
01:17:34,000 --> 01:17:42,000
But then let's say for whatever reason for this data, whether it's query plan is, the sequential scan is faster.

715
01:17:43,000 --> 01:17:52,000
So now in my memo table for the multi-expression on looking up A, the sequential scan is the best physical operator I have for this and then the cost is 10.

716
01:17:53,000 --> 01:18:02,000
I do the same thing, I bounce up back up here, do look on the other side of the join, now I do a look at the B multi-expression, same thing, I have a logical operator B.

717
01:18:03,000 --> 01:18:12,000
I transform that into a sequential scan on B, index scan on B, for whatever reason it's a sequential scan is faster, then I update my memo table here.

718
01:18:13,000 --> 01:18:22,000
So now I bounce back up here and now I just, now the transformation rule to go from, you know, to swapping the order for B and A and that's commuter that's a lot to do.

719
01:18:23,000 --> 01:18:31,000
But now when I would do the same thing, I say I have this multi-expression on B and a multi-expression on A, I got to go down to the groups below me and forget what the cost of those things are.

720
01:18:32,000 --> 01:18:42,000
Well, I've already done that, right, because I can go look up on my memo table, recognize that I know the best operator for B and the best operator for A based on what's up in here.

721
01:18:43,000 --> 01:18:49,000
So I actually don't need to do that traversal because I have this information already. I just have to look up on the memo table.

722
01:18:50,000 --> 01:18:58,000
So now, since I've exhausted all my logical expressions that are transformations that I could do, then I start generating all the physical expressions.

723
01:18:59,000 --> 01:19:08,000
But again, I would do this incrementally, I'm showing this for, but again, you can think of like all possible combinations of join ordering and all possible combinations of different join hour than I would use.

724
01:19:09,000 --> 01:19:16,000
So now, say for whatever reason when I cost this, the hash join between A and B turns out to be the best, the fastest.

725
01:19:17,000 --> 01:19:26,000
So then the cost of this now multi-expression is just the cost of accessing A, the cost of accessing B plus the cost of doing the hash join, again these are all just made up numbers.

726
01:19:27,000 --> 01:19:37,000
So it's the summation of all of them and now the cost is 80. So for the multi-expression AB, the best physical plan is the hash join on A and B.

727
01:19:38,000 --> 01:19:45,000
So the cost is 80 and now I bounce up the top and do the same thing down on the other side and so forth.

728
01:19:46,000 --> 01:20:00,000
So this is what basically a cascade is doing. Again, the devils in the details about how you actually apply the transformation rules. I'm not showing anything about priorities, I'm not showing anything about properties, but this is the high level, this is what the search looks like.

729
01:20:00,000 --> 01:20:13,000
And then I'll use my final cost here. And then now if I do any other traversals for maybe other physical operators or other joins, I stop the search once I see a cost that's greater than 80 or so greater than 125.

730
01:20:14,000 --> 01:20:19,000
All right, so let's stop here. Any quick questions and we'll pick up the summary left off.

731
01:20:22,000 --> 01:20:23,000
What do we predict wrong?

732
01:20:30,000 --> 01:20:41,000
The question is, we'll talk about next week at activity stuff. What are my estimates are wrong? What happens?

733
01:20:42,000 --> 01:20:52,000
Most systems, nothing. You just keep going. We'll see ways to put hooks in the query plan to say, okay, if I'm getting wrong, go back and replant things.

734
01:20:52,000 --> 01:21:01,000
We'll see cases like an IBM, another systems where you get feedback from like, hey, you told me this, but it's really this when I ran it again. So the next query comes along, you can get updated on this.

735
01:21:02,000 --> 01:21:06,000
But in general, like all this memo state, it's thrown away when the query is done.

736
01:21:07,000 --> 01:21:16,000
Because why I don't want to do this in our optimizer. But then like this thing is huge. How long should that be maintained for? Right?

737
01:21:17,000 --> 01:21:30,000
Also, when I'm not showing in these multi-expressions, like I'm not showing what the original query is, like the sequential can cost 10 for on A, but what's the predicate? What's the where clause? That could be different from one with query to another. You'd have to account for that in your memo table as well.

738
01:21:31,000 --> 01:21:35,000
So that you potentially could reuse it across different queries.

739
01:21:35,000 --> 01:21:43,000
Okay, I'm always over ambitious of what I can try to cover in the last class.

740
01:21:44,000 --> 01:21:52,000
Obviously, it's one lecture. So let me just say we'll pick up next class on, we'll go through cascades again because you sort of rush that.

741
01:21:53,000 --> 01:21:56,000
Then we'll talk about randomized search for like in postgres and others.

742
01:21:58,000 --> 01:22:03,000
I debate whether I actually teach that because, like I said, nobody actually really uses it and the postgres one is broken.

743
01:22:04,000 --> 01:22:10,000
Last year, I put together this playlist on YouTube. These are all the talks in the various companies over the years that come talk to their query optimizers.

744
01:22:11,000 --> 01:22:21,000
The one I cannot recommend enough is the one from Microsoft on SQL Server. Because again, in my opinion, that's the other way hyper is going to do join ordering. This is the best one.

745
01:22:22,000 --> 01:22:28,000
This is a really great talk. The next best one is probably from Becca from CockroachDB to talk about how she built their query optimizer, which is based on cascades.

746
01:22:28,000 --> 01:22:32,000
They do some of the things that Microsoft doesn't do.

747
01:22:33,000 --> 01:22:43,000
Next class will be, finish up with cascades, finish up with random algorithms. We'll see how Germans do un-nesting subquers and how Germans do dynamic programming through hyper graphs for picking joiner.

748
01:22:44,000 --> 01:22:46,000
Okay? All right guys, see ya.

749
01:23:28,000 --> 01:23:30,000
Okay.

