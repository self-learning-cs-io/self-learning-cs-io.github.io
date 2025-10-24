---
title: CMU15721 P16S202415 QueryOptimizerImplementation3CMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:24,960
The type of optimizers we've talked about so far have been the classic query optimizers

2
00:00:24,960 --> 00:00:29,600
where the query shows up, we parse the SQL, then we run it through the optimizer and we

3
00:00:29,600 --> 00:00:33,760
generate a plan before we even begin executing the query.

4
00:00:33,760 --> 00:00:36,399
This is how most query optimizers work.

5
00:00:36,399 --> 00:00:40,560
Obviously you can't run the query unless you have a query plan so you have to put it through

6
00:00:40,560 --> 00:00:42,079
the optimizer.

7
00:00:42,079 --> 00:00:50,200
But the challenge is going to be that what we think is the best plan during this optimization

8
00:00:50,200 --> 00:00:57,320
phase before we even start running it may actually be incorrect because since we can't

9
00:00:57,320 --> 00:01:02,200
actually run the query without a plan there's some assumptions we have to make about what

10
00:01:02,200 --> 00:01:05,680
the database and what our environment looks like.

11
00:01:05,680 --> 00:01:09,120
But these things can change over time for various reasons.

12
00:01:09,120 --> 00:01:14,760
So the physical design, the database can change because the administrator, the application,

13
00:01:14,760 --> 00:01:19,400
could add and drop indexes or change the partition scheme.

14
00:01:19,400 --> 00:01:23,079
The database itself could get modified, people could insert two pulls or delete two pulls

15
00:01:23,079 --> 00:01:27,280
and they could change the distribution of values for our columns.

16
00:01:27,280 --> 00:01:34,000
If we're invoking our queries as prepared statements then the behavior of the query for

17
00:01:34,000 --> 00:01:37,599
one set of parameters might be different for another set of parameters.

18
00:01:37,599 --> 00:01:42,560
And then of course every time you run analyze or whatever the command is in our database

19
00:01:42,560 --> 00:01:48,120
system to recollect the statistics that we use in our cost models, every time we update

20
00:01:48,120 --> 00:01:54,280
them then the decisions we'll make in our optimizer could be entirely different.

21
00:01:54,280 --> 00:02:03,079
So the sort of focus today is to understand how can we potentially improve our optimizers,

22
00:02:03,079 --> 00:02:07,840
the efficacy of the quality of the plans that we're generating by maybe relaxing this

23
00:02:07,840 --> 00:02:13,879
requirement that we only generate a plan or only revisit our assumptions or we never

24
00:02:13,879 --> 00:02:17,920
visit our assumptions once we generate the plan at the beginning.

25
00:02:17,920 --> 00:02:22,800
So to do this we want to understand a little bit what a bad query panel looks like, a

26
00:02:22,800 --> 00:02:30,000
wide query plans can be considered bad and then end up with less than optimal formats.

27
00:02:30,000 --> 00:02:34,840
So we'll cover this more on Wednesday when we discuss cost models.

28
00:02:34,840 --> 00:02:39,720
But in general I say the high level the biggest problem we're always going to have is the

29
00:02:39,720 --> 00:02:41,800
we're going to get the join order is incorrect.

30
00:02:41,800 --> 00:02:47,000
Joins are almost always the most expensive thing we're going to execute in a analytical workload.

31
00:02:47,000 --> 00:02:52,919
And so if we get the ordering incorrect that can get lead to poor performance.

32
00:02:52,919 --> 00:02:58,240
The reason why we're going to make select incorrect ordering is because we're going to have

33
00:02:58,240 --> 00:03:00,639
inaccurate cardinality estimations.

34
00:03:00,639 --> 00:03:04,879
Meaning we think that our join is going to produce X number of tuples but it's really going

35
00:03:04,879 --> 00:03:12,000
to be X times Y or some larger multiple of them what we thought is going to happen.

36
00:03:12,000 --> 00:03:18,560
Again we'll discuss why this occurs more in the next lecture but this issue is going

37
00:03:18,560 --> 00:03:22,879
to be reoccurring theme that we're going to have to overcome and today's discussion is

38
00:03:22,879 --> 00:03:26,960
sort of see techniques to do this.

39
00:03:26,960 --> 00:03:31,680
So but since we know things are going to go bad like we just know we can just assume that

40
00:03:31,680 --> 00:03:36,560
our cost model is going to be an accurate our optimizer is going to make bad decisions.

41
00:03:36,560 --> 00:03:43,680
And ideally if we can detect how bad our query plan is once we start running it then

42
00:03:43,680 --> 00:03:51,520
we can make a decision to adapt the plan to modify potentially to account for these differences

43
00:03:51,520 --> 00:03:55,199
and what we're seeing in the real data versus what we assume we're going to see.

44
00:03:55,199 --> 00:04:01,280
And then we can then try to convert our plan into something that's closer to the optimal

45
00:04:01,280 --> 00:04:02,280
plan.

46
00:04:03,080 --> 00:04:07,560
So what I mean like that is say we have a simple query like this it's a four way join between

47
00:04:07,560 --> 00:04:14,199
eight tables ABC and D and then we just have a simple wear clause for the B and D tables.

48
00:04:14,199 --> 00:04:19,240
So let's say that we run this query through our query optimizer and we generate this plan.

49
00:04:19,240 --> 00:04:23,319
Right it's a bunch of hash joins and nothing but sequential scans.

50
00:04:23,319 --> 00:04:29,000
But let's say that when we when we generate this plan for this particular join we estimated

51
00:04:29,000 --> 00:04:35,800
the cardinality of that operator to be 1000 right this is an arbitrary number that I'm using

52
00:04:35,800 --> 00:04:40,680
for this illustration. The cardinality is the number of two pulls that this operator will admit.

53
00:04:41,639 --> 00:04:46,920
But let's say when we actually start to run it we see that we're actually generating 100,000

54
00:04:46,920 --> 00:04:53,000
two pulls. So our actual cardinality is two orders of magnitude greater than the estimate one.

55
00:04:53,959 --> 00:04:59,079
So the question we're trying to deal with today is if we knew what the just true cardinality was

56
00:05:00,120 --> 00:05:07,879
before we started executing it. I'm sorry while we're executing it then could we change some

57
00:05:07,879 --> 00:05:14,040
aspect of this query plan to get us closer to a more optimal plan. Right could we change the

58
00:05:14,040 --> 00:05:18,279
join ordering where we wanted to use a different algorithm to do our join where we want to change

59
00:05:18,279 --> 00:05:23,799
maybe the access methods that come below the join to use it maybe index or a different different

60
00:05:23,799 --> 00:05:30,039
type of scam. So this is sort of what we're focusing on today is how to then maybe adapt this

61
00:05:30,039 --> 00:05:35,079
this kind of plan when we know something about the what the data looks like once we start running it.

62
00:05:36,759 --> 00:05:45,319
So the the high level idea again is that we want to be able to execute estimate the behavior of a plan

63
00:05:45,319 --> 00:05:53,159
to in order to determine the behavior of a plan to determine its quality relative to other plans

64
00:05:53,159 --> 00:05:58,199
that is what the cost model is doing. But the tricky thing is going to be back here before I started

65
00:05:58,199 --> 00:06:06,519
executing this I had to derive this cardinality from my statistics that I had maintaining my catalog

66
00:06:06,519 --> 00:06:11,800
about what my table looks like or what the what these two tables look like when you join them together.

67
00:06:12,280 --> 00:06:19,240
So the stats are based on histograms and possibly samples that we're collecting from the data.

68
00:06:19,240 --> 00:06:25,000
We can also make decisions about what the hardware looks like what kind of cash sizes we have

69
00:06:25,000 --> 00:06:28,920
what kind of maybe algorithm we want to use what other queries are running at the same time.

70
00:06:28,920 --> 00:06:33,879
Like the cost model stuff we'll cover next class but the main idea to think about is what we're

71
00:06:33,879 --> 00:06:39,800
talking about today is before we run the query we we only have an estimation of what the data looks

72
00:06:39,800 --> 00:06:45,560
like and how our query will will perform and if we get that wrong we want to then try to be able to

73
00:06:45,560 --> 00:06:52,280
correct ourselves. So the technique we're talking about today is called adaptive query optimization

74
00:06:52,280 --> 00:06:57,400
and sometimes called in the research literature adapter query processing right there's essentially

75
00:06:57,400 --> 00:07:03,000
synonymous and it's everything I said so far the idea is that this technique is going to allow the

76
00:07:03,000 --> 00:07:10,920
database system to modify the query plan for a query to better fit what the actual underlying data

77
00:07:10,920 --> 00:07:16,519
looks like and we believe modifying that for the query plan by just generating an entire new query

78
00:07:16,519 --> 00:07:23,959
plan like throwing away the old one and starting over or we could try to modify a subset of the query

79
00:07:23,959 --> 00:07:30,600
plan or a query plan by introducing new sort of sub plans or it was like a pipeline at different

80
00:07:30,600 --> 00:07:35,560
points where we had to materialize people where we could potentially switch from you know one

81
00:07:35,560 --> 00:07:41,720
plan strategy to another and this one here you basically go back to the optimizer and start over

82
00:07:41,720 --> 00:07:48,200
this one here is that you can try to have the optimizer only do only replay an apportion of it or

83
00:07:48,200 --> 00:07:56,680
provide these alternative strategies at the beginning. So the main sort of takeaway approach what we're

84
00:07:56,680 --> 00:08:01,720
doing here is that rather than just relying on our statistical models that are estimations or

85
00:08:01,720 --> 00:08:06,920
approximations of what the data looks like we're trying to use the data we've collected while we

86
00:08:06,920 --> 00:08:12,680
actually execute the query to then help us make a decision about what the right plan should be for

87
00:08:12,680 --> 00:08:19,240
our particular query right and this data we're going to collect is could be used for helping our

88
00:08:19,240 --> 00:08:25,960
current query or merge it we can merge it back into the system because we've collected through our

89
00:08:25,959 --> 00:08:33,240
analyze operation and have it be used for other queries. So again we'll cover the various ways you

90
00:08:33,240 --> 00:08:38,279
have to do this but when you think about what a query actually is doing you know or what analyze

91
00:08:38,279 --> 00:08:45,559
does analyzes during a sequential scan to compute some statistical models about what the data looks like

92
00:08:46,360 --> 00:08:51,879
and so the if we're doing the sequential scan on a table that's essentially the same thing as

93
00:08:51,879 --> 00:08:57,399
analyzed and so rather than just evaluating predicates or using the the tuples as we scan them to

94
00:08:58,279 --> 00:09:02,519
generate the result we need for that particular query we can piggyback piggyback off of those

95
00:09:03,480 --> 00:09:11,480
off of that scan operator and sort of maintain or update our and update our sort of statistical models

96
00:09:11,480 --> 00:09:16,360
with new information and the question here is whether we just update that models for ourselves to

97
00:09:16,360 --> 00:09:22,519
make our query go better or we can share this with other queries in the global catalog and now

98
00:09:22,519 --> 00:09:29,800
other queries can benefit from the data we collected from this. All right so there's sort of three

99
00:09:29,800 --> 00:09:38,279
broad categories that I want to cover using a aqo or adaptive query optimization. One is that we

100
00:09:38,279 --> 00:09:44,920
can use aqo to benefit future invocations of our query. The second approach is to try to make our

101
00:09:44,919 --> 00:09:50,759
current invocation of our query better and then the last one would be well this is like helping

102
00:09:50,759 --> 00:09:54,360
your current query this is also helping your current query but this one would be sort of starting

103
00:09:54,360 --> 00:10:02,120
over from scratch and running through the optimization all over again this would be adding locations

104
00:10:02,120 --> 00:10:06,919
in the query plan that allow you to change one strategy versus you know switch and one strategy

105
00:10:06,919 --> 00:10:12,039
the next with again out having to go back to to the optimization. So we'll go through each of these

106
00:10:12,039 --> 00:10:22,120
one by one. So the sort of the most simplest form of adaptive query optimization is as I said where

107
00:10:22,759 --> 00:10:30,199
as we execute our query we also collect some information about what the data looks like and then

108
00:10:30,199 --> 00:10:37,000
we can use that information to decide whether our query is wrong and when we plan it or we can then

109
00:10:37,000 --> 00:10:42,440
merge that back into the sort of global catalog. Again when you think about this right what

110
00:10:42,440 --> 00:10:46,679
are the optimizers are actually doing you have much histograms or statistical models about what your

111
00:10:46,679 --> 00:10:51,799
your your attributes look like. So for a given predicate in your where clause you want to estimate

112
00:10:51,799 --> 00:10:57,000
the selectivity of that predicate because that'll determine how many tuples your scan will emit and

113
00:10:57,000 --> 00:11:01,639
you can use that to make decisions about you know join orderings and other things above in the query plan.

114
00:11:01,799 --> 00:11:10,039
So the as you execute the scan if you you know you actually know the true selectivity because you're

115
00:11:10,039 --> 00:11:14,600
applying the predicate on the tuples and you know the number the number of two percent of the tuples

116
00:11:14,600 --> 00:11:21,559
are going to match. So if you then determine that the cost model estimated my selectivity was 1%

117
00:11:21,960 --> 00:11:27,080
but when I run the real query and I run the query and actually do the evaluation of the predicate

118
00:11:27,160 --> 00:11:32,840
my selectivity is 99% then I wanted to use that information to help me decide whether to

119
00:11:33,320 --> 00:11:39,639
replay my query or that future queries come along they can you know exploit the knowledge that I've gained.

120
00:11:41,000 --> 00:11:46,440
Again the the one approaches to try to fix my current query or the other one is just

121
00:11:46,440 --> 00:11:55,560
merging it back into the into the overall statistical catalog of models and the catalog so that

122
00:11:56,279 --> 00:12:02,679
I can then help queries in the future. So the most basic approach to do this is call a

123
00:12:02,679 --> 00:12:08,359
reversion based plan correction and the idea here is as I said is just every single time I invoke a

124
00:12:08,359 --> 00:12:14,359
query I keep track of what query plan I generated for I keep track of the cost estimations I had for

125
00:12:14,359 --> 00:12:19,879
and then the I'll have all my metrics of what what happened when actually when I ran it right how

126
00:12:19,879 --> 00:12:24,599
many how many tuples I selected how much CPU I remember that I used and I'm going to maintain this

127
00:12:24,680 --> 00:12:29,240
history inside the database itself so you'll see this in like the commercial systems like

128
00:12:29,960 --> 00:12:37,879
and DB2 Oracle and and SQL Server they have this built-in repository of the history of every single

129
00:12:37,879 --> 00:12:42,680
query that ever got invoked and they can use that information to help decide how to do query

130
00:12:42,680 --> 00:12:47,720
planning in the future. So let's say that we have a premier statement or we have a query that

131
00:12:47,720 --> 00:12:52,680
that's invoked all the time and we have a cash query plan so rather than maybe running through the

132
00:12:52,679 --> 00:12:57,719
optimizer every single time we can use the the cash query plan that we've already generated from

133
00:12:57,719 --> 00:13:07,479
previous invocations. So if now there's a change in our in the you know the statistics or something

134
00:13:07,479 --> 00:13:12,759
about the database that physical design that changes and we recognize that we maybe want to for

135
00:13:12,759 --> 00:13:17,319
this particular query we keep invoking we want to run it back through the optimizer and see we

136
00:13:17,960 --> 00:13:23,240
regenerate a new plan but then when we run that new plan for this query if we see that the

137
00:13:23,240 --> 00:13:29,800
performance of the query is worse than the old plan that we had before then we just want to

138
00:13:29,800 --> 00:13:35,800
work back to it right there's a regression in the performance we switch back to the plan that

139
00:13:35,800 --> 00:13:41,320
we know actually performed better for us despite the change in the other in the physical design or

140
00:13:41,320 --> 00:13:46,600
the statistical models. So we use that simple query example that I have a for right the foray

141
00:13:47,560 --> 00:13:52,360
say again this is my original plan and I'm doing nothing but sequential scans and a hash

142
00:13:52,360 --> 00:13:58,279
drawing and say that my estimated cost is a thousand and my cost estimation is pretty good so my

143
00:13:58,279 --> 00:14:04,279
actual cost actually matches up. I these are just synthetic numbers here. So I'm going to store in my

144
00:14:04,279 --> 00:14:10,040
execution history for my database system that I generate for this query I generated this plan and

145
00:14:10,120 --> 00:14:16,839
when I ran it I had this cost and this is just another database or another table in my database system

146
00:14:16,839 --> 00:14:22,279
right you're sort of eating your own dog food rather than having an auxiliary store this is just

147
00:14:22,279 --> 00:14:28,439
another table that you record this information. All right so now let's say there's a change in our

148
00:14:28,439 --> 00:14:35,399
database design say the dba comes along and adds two indexes on the b table on the d table which

149
00:14:35,399 --> 00:14:41,159
we're using in our where clause. So now when we invoke the same query again we would recognize that

150
00:14:41,159 --> 00:14:48,600
the design the database has changed in such a way where we may now want to reconsider the query plan

151
00:14:48,600 --> 00:14:53,959
for this particular query. So this query touches b dot val and d dot val while I just have to create

152
00:14:53,959 --> 00:14:58,919
indexes on those columns. So I want to run this through my optimizer again and see what plan I get.

153
00:14:59,639 --> 00:15:04,120
Let's say now for the new plan it's completely different so now we're instead of running hash

154
00:15:04,120 --> 00:15:08,600
joins we're running index nested loop joins and we're doing an index scan on b on d which we can

155
00:15:08,600 --> 00:15:13,879
now do because we have index on that which we didn't have before. And so now we're going to pick this

156
00:15:13,879 --> 00:15:19,560
plan for our query because the estimated cost is 800 which is less than the estimated cost so

157
00:15:19,560 --> 00:15:25,080
that we had over here but when we actually run it for whatever reason that we that we don't care

158
00:15:25,080 --> 00:15:32,680
about at this point the actual cost is is 1200 right this could be that the you know we incorrectly

159
00:15:32,759 --> 00:15:37,319
estimated that the cost of these nestled joins would be cheaper than the hash joins so we picked in

160
00:15:37,319 --> 00:15:46,519
that nestled joins. So just as before it's when we actually put this excuse me that's not

161
00:15:46,519 --> 00:15:52,839
criminal. If we actually now put this in our in our extra history we would recognize that

162
00:15:54,439 --> 00:16:00,439
the for this plan here again it performed worse than this other one here so the next time we

163
00:16:00,440 --> 00:16:04,680
invoke it we want to make sure that we we use this plan. We want to alert back to the one that we

164
00:16:04,680 --> 00:16:12,280
know performed better. So for this approach here this is something that Microsoft has had in

165
00:16:12,280 --> 00:16:19,400
SQL Server and I think Oracle has something similar in since maybe 2012 2013 but this is pretty

166
00:16:19,400 --> 00:16:24,600
coarse grain right this is pretty brain dead heuristic it's basically saying oh this query plan is

167
00:16:24,600 --> 00:16:30,519
bad let me just switch back to this one right so it's okay all of our nothing thing. So the

168
00:16:30,519 --> 00:16:34,519
paper you guys were signed reading from Microsoft is called plan stitching and the I the

169
00:16:34,519 --> 00:16:40,360
high-level idea is exactly the same where if we recognize that our query is running slower then

170
00:16:40,360 --> 00:16:47,879
query plans we saw in the past rather than potentially this thrown away the entire query plan

171
00:16:47,879 --> 00:16:53,399
that the new query plan and we're burning back to the old one maybe there are elements or aspects

172
00:16:53,399 --> 00:17:01,879
or sub plans within the newer plan we actually want to retain because and then that'll that'll

173
00:17:01,879 --> 00:17:07,400
that'll help us lead us towards a better plan a more optimal plan right and the other isn't you

174
00:17:07,400 --> 00:17:14,599
think about well plan stitch as well is that the sub plans you're going to borrow from other queries

175
00:17:14,599 --> 00:17:19,639
don't need to be actually from the same query like in this case here I can only reuse the plan

176
00:17:20,440 --> 00:17:24,759
in the simplest form I can only swap a team plans if they're running on the exact same query

177
00:17:25,240 --> 00:17:30,600
but with plan stitch because I can excise out sub plans or portions of the query plan as long

178
00:17:30,600 --> 00:17:35,640
as I know that they're logically equivalent I can take bits and pieces from from other queries

179
00:17:36,360 --> 00:17:42,680
all right the other interesting too is that if there is a change in the physical design where a new

180
00:17:42,680 --> 00:17:48,040
plan query plan becomes invalid meaning like it defined that it wanted to index scan but then

181
00:17:48,119 --> 00:17:54,119
I drop that index rather than just throw away the entire query the query plan and its entirety I can

182
00:17:54,119 --> 00:17:59,559
maybe get and pull out pieces of it right so the basic approach they're going to use is or the

183
00:17:59,559 --> 00:18:05,960
the way they're going to generate these these stitch plans is a dynamic programming search method

184
00:18:05,960 --> 00:18:11,319
using a bottom-up approach where you just you check the C from going from one level to the next

185
00:18:11,319 --> 00:18:16,839
and the same way we do a system R going one node to the next you pick which which which which

186
00:18:17,399 --> 00:18:22,759
sub plan is the best and then once you reach the end goal you you do find that the cheapest path

187
00:18:23,319 --> 00:18:30,119
so this means that it's not guaranteed to find a better plan than the best plan you have so far

188
00:18:30,119 --> 00:18:37,159
and it is not guaranteed to always produce a valid plan and but there's some basic

189
00:18:37,159 --> 00:18:41,879
characteristics to use and make sure that happens right so going back to our example here right say that

190
00:18:42,840 --> 00:18:48,680
this is our new plan and say it was working just fine right like it was actually faster so we always

191
00:18:48,680 --> 00:18:54,600
want to use this but now if I come along and I drop one of the indexes that I'm using this plan

192
00:18:54,600 --> 00:19:01,560
now becomes invalid and under sort of coarse green reversion I can't reuse it but with plan

193
00:19:01,560 --> 00:19:07,160
stitching I actually want to figure out what components of this sub plan or the query plan here

194
00:19:07,160 --> 00:19:11,560
that I may want to use in the new plan even though overall it's invalid there's still portions

195
00:19:11,960 --> 00:19:17,639
that are still usable so on this case there say this portion of the sub plan the sub plan of this

196
00:19:18,039 --> 00:19:23,399
part of the query the execution cost is 600 and we would know this because we can keep track of

197
00:19:23,399 --> 00:19:30,839
every although the the the ratchewontime cost of all the operators in our in our query and for this

198
00:19:30,839 --> 00:19:37,000
one here this sub plan over here has a cost of 150 so now if I combine these together into a stitch plan

199
00:19:37,000 --> 00:19:43,880
the total cost of this case would be 750 whereas before if I did run this it was a thousand so again

200
00:19:43,880 --> 00:19:48,920
the idea is that we want to be able to borrow bits and pieces of different query plans to end and

201
00:19:48,920 --> 00:19:55,640
help us produce the a more optimal plan and this is being done separately from the regular optimizer

202
00:19:55,640 --> 00:20:00,599
in the case of microsoft's SQL server they're running cascades so they're actually doing a top-down

203
00:20:01,159 --> 00:20:07,480
but this is sort of this auxiliary search that's running on the side that in the background it tries

204
00:20:07,480 --> 00:20:14,119
to find a plan so it can stitch together so let's talk about how they actually do this the the

205
00:20:14,119 --> 00:20:20,679
first step is you need to identify which portions or which sub plans in our queries are logically

206
00:20:20,679 --> 00:20:25,879
equipment right we talked about before under with cascades when we had when we had multi-group

207
00:20:25,880 --> 00:20:32,920
marketing special groups right we want to know that the the the output of a given sub plan

208
00:20:33,560 --> 00:20:41,720
is is the same or equivalent to another sub plan right and again we we have to rely on our the rules

209
00:20:41,720 --> 00:20:48,280
of relation algebra to recognize which operations can be commutative or or associative so in this case

210
00:20:48,279 --> 00:20:56,200
here this portion of the sub plan just the output is the a join b join c this portion of another

211
00:20:56,200 --> 00:21:02,519
sub plan is the output is c join b's join a but since joins these inner joins here are commutative

212
00:21:02,519 --> 00:21:10,119
we know that these are are logical equipment now as I said the well one one challenge with this is that

213
00:21:10,839 --> 00:21:19,559
determining whether any arbitrary logical expressions or logical sub plans are are equivalent

214
00:21:20,199 --> 00:21:26,039
has been shown to be undecidable meaning like the questions like are these two sub plans

215
00:21:26,039 --> 00:21:32,839
logically equipment it's a yes or no answer but there's no algorithm that exists as an improvement

216
00:21:32,839 --> 00:21:39,399
that can can can guarantee to always give the correct answer so in the plan stitch phase they're

217
00:21:39,400 --> 00:21:44,840
going to rely on some additional heuristics to identify things like oh I know that these two

218
00:21:44,840 --> 00:21:48,759
sub plans are accessing different tables so therefore they can't be logically equipment right you

219
00:21:48,759 --> 00:21:54,759
obviously can do more complicated things um the optimizer itself in sequels over also has those

220
00:21:54,759 --> 00:21:59,960
kind of checks in place um and so they they rely on that as well so they have their own heuristics

221
00:21:59,960 --> 00:22:05,560
to prune things that can never be logical equivalent and they rely on the sequels over optimizer to

222
00:22:05,559 --> 00:22:12,519
identify that uh the logical sub plan you're trying to match together or the the sub plan trying

223
00:22:12,519 --> 00:22:20,119
to match together in the stitch plan is is invalid so the heuristics are providing them with this

224
00:22:20,119 --> 00:22:25,240
sort of sweet swap balance between the difficulty in the implementation right so much a much

225
00:22:25,240 --> 00:22:31,799
enforcer rules um the accuracy of the of the of the determination whether they're equivalent

226
00:22:31,879 --> 00:22:36,119
and in the performance right it's not an exhaustive search and exhaust evaluation of all possible

227
00:22:36,119 --> 00:22:41,480
inputs to different sub plans it's just rules based on the relational algebra

228
00:22:43,159 --> 00:22:50,039
all right so now once we identify that we have a bunch of equivalent sub plans we want to figure out

229
00:22:50,039 --> 00:22:55,639
we want to sort of combine them together into one giant query plan that we're going to add to

230
00:22:55,639 --> 00:23:01,480
additional uh operators to determine that you can have branches to go down different you know

231
00:23:01,480 --> 00:23:07,079
different paths in the sub plan so this is how they're going to code the the all the different

232
00:23:07,079 --> 00:23:11,480
combinations of the sub plans for then you can stitch together so the way this is going to work is

233
00:23:11,480 --> 00:23:16,519
they're going to introduce this new or operator which is not actually used for execution this is

234
00:23:16,519 --> 00:23:22,599
just something for for the search and the the or basically indicates that the sub plans below it

235
00:23:22,599 --> 00:23:30,440
are logically equivalent so we we could choose either path so starting from the from the top we

236
00:23:30,440 --> 00:23:35,720
have an or clause at the very beginning um and then we have the two for this particular query we have

237
00:23:35,720 --> 00:23:41,080
the either doing the hash join or the the nested loop join and again these are logically equivalent

238
00:23:41,080 --> 00:23:47,160
because this is a join b joined c join d and this is c join b join a join d and those are in

239
00:23:47,160 --> 00:23:52,279
joins are commutative so the therefore these are logically equivalent so then now say go down

240
00:23:53,000 --> 00:23:58,920
we're going to go like a depth research going down on this side uh for this one here same thing

241
00:23:58,920 --> 00:24:04,200
we do the hash join on a and b followed by c this is the nested loop join on c followed by c join

242
00:24:04,200 --> 00:24:09,080
b join a again these are logically equivalent so that's why we can have or clause we can choose either

243
00:24:09,080 --> 00:24:13,880
one and then we're just going to keep going down until we get to our leaf node uh in the central

244
00:24:13,880 --> 00:24:19,800
scan and then here we don't see we don't there's another option for us uh in in this portion of

245
00:24:19,800 --> 00:24:24,279
the query plan because the one we stitched from just you know only had only had a hash join

246
00:24:25,000 --> 00:24:29,799
so now in this case here for the hash join a we can do a sequential scan as we saw on the first

247
00:24:29,799 --> 00:24:33,960
plan or we can do the index scan on b uh because that came from the second plan and so we have an

248
00:24:33,960 --> 00:24:39,720
or operator to express that going back up here we can only do a sequential scan on c so that's a

249
00:24:39,720 --> 00:24:44,759
straight path going back up here for the nested loop join uh it can you know only thing we can do

250
00:24:44,759 --> 00:24:49,559
below it is another nested loop join and then for this we can either do a sequential scan on a or

251
00:24:49,720 --> 00:24:54,440
again for for b we now they do the sequential scan or the index scan going back up here for the

252
00:24:54,440 --> 00:25:00,519
hash join again that's feeding uh a sequential scan on d feeding in and then we just complete the

253
00:25:01,079 --> 00:25:05,639
the rest of the tree like this so this is a a bit more simplified version of what they showed in the

254
00:25:05,639 --> 00:25:13,720
paper but uh these are actually the possible options you can have um and so what i think remember in

255
00:25:13,720 --> 00:25:18,039
the paper what they talked about is that this approach and doing the search within this to find

256
00:25:18,039 --> 00:25:23,159
a stitch plan they're able to stitch about 75 to almost and a hundred percent of all of the

257
00:25:23,159 --> 00:25:28,279
plans together for the for the workloads that they looked at all right so now that we've encoded

258
00:25:28,279 --> 00:25:32,920
our search space we actually want to do our search and these are just starting from the bottom

259
00:25:32,920 --> 00:25:38,200
and going up and the same way we did with the system our dynamic uh programming search where we

260
00:25:38,200 --> 00:25:44,920
just for every single leaf node we start off with uh figuring out what the cost is for going to uh

261
00:25:44,920 --> 00:25:49,960
the next operator we pick which one is the best and then once we complete all the we do this search

262
00:25:49,960 --> 00:25:53,640
for all the nodes at our current level we then go up to the next level and complete this process

263
00:25:54,279 --> 00:25:58,440
all right so let's say we start with the sequential scan on a it only has one option first which is

264
00:25:58,440 --> 00:26:07,800
just the um oh it has either the hash join on a b or uh or then the the next that's a loop over here

265
00:26:07,800 --> 00:26:14,039
say the hash join is cheaper so we pick that now we do a sequential scan on b this has an or operator

266
00:26:14,039 --> 00:26:18,839
all right so this is either doing a hash join or the nest loop join and say the hash join is cheaper

267
00:26:18,839 --> 00:26:25,559
so we pick that now we do this for uh the index scan on b again there's a or or operator you need

268
00:26:25,559 --> 00:26:31,559
the hash join the nest loop join and so because we have an index the nest loop join actually it

269
00:26:31,559 --> 00:26:36,279
would be cheaper here so we pick that and we just keep going down the line and do this for all our

270
00:26:36,279 --> 00:26:40,440
leaf nodes and then we're done we go up to the next level and then again now we have a cost for all

271
00:26:40,440 --> 00:26:47,160
these paths uh leading up and we just pick which one is is the cheapest rust and then we reconstruct the

272
00:26:49,720 --> 00:26:55,880
we can construct the stitch plan that way right so again I think this is an interesting uh approach

273
00:26:55,880 --> 00:27:00,120
I don't think Microsoft is actually running this in production like this was a research paper that

274
00:27:00,120 --> 00:27:05,240
was published in sigmod um I don't know of any other system that's doing some similar like this

275
00:27:05,799 --> 00:27:11,240
I from an engineering standpoint the fact that you have to run this separately from the

276
00:27:12,680 --> 00:27:16,920
from the query optimizer um and sort of have separate infrastructure for that

277
00:27:17,480 --> 00:27:20,839
Terry what are you doing um

278
00:27:23,079 --> 00:27:27,559
right so rather than having separate you know separate so search infrastructure

279
00:27:27,559 --> 00:27:32,279
if this is integrated into the query optimizer like uh component itself I think this would be

280
00:27:32,279 --> 00:27:38,359
really an interesting approach so there's another system that does something similar to this plan

281
00:27:38,359 --> 00:27:45,879
stitching uh but they're actually working on a sort of uh uh uh uh sort of a cougain level rather than

282
00:27:45,879 --> 00:27:53,000
like a physical query plan level so amazon has their redshift uh data warehouse uh service um and

283
00:27:53,000 --> 00:27:59,720
it's based on park cell and they use actually a uh they do it it's a transpilation engine so the

284
00:27:59,799 --> 00:28:06,279
database system for a given physical plan generates c++ code or ccode which they then compile

285
00:28:06,839 --> 00:28:11,400
and then they run you know they they invoke the the shared object that comes out of the compiler

286
00:28:11,400 --> 00:28:16,680
and then that's how they do uh query compilation so the obviously the most expensive part of

287
00:28:17,400 --> 00:28:21,079
uh uh you know cogent engine is is the compilation right in their case they're actually

288
00:28:21,079 --> 00:28:26,200
forking gcc or whatever compiler they're using to actually generate the machine code um so they

289
00:28:26,279 --> 00:28:33,000
want to try to avoid that for every single query so what they can do is uh they say you're doing uh

290
00:28:33,000 --> 00:28:38,440
you want you want to compile the scan on b where you want to see where b.val equals some input

291
00:28:38,440 --> 00:28:44,920
parameter so the code gen that piece run it through the compiler that generates x86 code um and

292
00:28:44,920 --> 00:28:50,920
then they'll go ahead and cache it and then now anytime you re invoke this this query uh you know

293
00:28:50,920 --> 00:28:56,920
you can just reuse the compiler version of the scan on b but similar to plan stitching what they

294
00:28:56,920 --> 00:29:02,519
can also do is they can recognize that if you have another query with the same kind of predicate b.val

295
00:29:02,519 --> 00:29:09,560
equals uh you know equals some parameter it'll cogent the exact same thing so rather than recompiling

296
00:29:09,560 --> 00:29:15,320
it which is again the expensive part they can identify that they have a cache uh plan fragment

297
00:29:15,799 --> 00:29:23,000
uh of for this this this scan here and they can reuse that and so they actually can do this uh

298
00:29:23,000 --> 00:29:30,279
across all possible or press all their customers so like this you know the scan on a table to do one

299
00:29:30,279 --> 00:29:35,000
you know something equals something on a you know varchar field that's going to be the same from

300
00:29:35,000 --> 00:29:39,559
one table to the next because it's a column sure you're just ripping through the column so they can

301
00:29:39,559 --> 00:29:44,839
actually share these little fragments uh and stitch these query physical query plans of the compile

302
00:29:44,839 --> 00:29:50,039
query plans together from all possible you know customers so now for a given query that they

303
00:29:50,039 --> 00:29:55,240
never seen before if it has the same pattern of access methods and joins and other things as

304
00:29:55,240 --> 00:30:00,279
queries from another customer they just pull from the cogent cache and stitch together so that's

305
00:30:00,279 --> 00:30:08,519
kind of cool all right so there another interesting system to talk about is uh IBM's Leo the learning

306
00:30:08,519 --> 00:30:15,240
optimizer and so this is an example of where you have a feedback loop being used to uh improve the

307
00:30:15,240 --> 00:30:23,319
the the the accuracy of the cost models in the system i say the idea is that uh again if i i keep track

308
00:30:23,319 --> 00:30:28,359
of what the my cost model estimates were when i when i generated the query plan and then when i run it

309
00:30:28,359 --> 00:30:33,240
if i if i recognize that those estimates are way off i start recording information about what i'm

310
00:30:33,240 --> 00:30:39,799
seeing in the real data and then when my query completes i return the result back to the the user

311
00:30:39,799 --> 00:30:44,039
or the application of a question that could request the query but i also go update my cost model

312
00:30:45,079 --> 00:30:51,079
statistics uh with the new information that i've collected um so i bm's Leo was it's actually

313
00:30:51,079 --> 00:30:55,960
shipped in production in dbt2 today um but this is one of the the the other examples of a commercial

314
00:30:56,039 --> 00:31:04,279
system do applying one of these uh a depth query uh processing techniques all right so the

315
00:31:05,960 --> 00:31:12,759
the plan stitching stuff that we talked about or the virgin stuff is about fixing future invocations

316
00:31:12,759 --> 00:31:17,720
of a query uh to improve them based on the the results that i'm seeing when i when i actually

317
00:31:17,720 --> 00:31:23,319
execute my query but now we want to talk about how do we fix my query like if i invoke my SQL query

318
00:31:23,399 --> 00:31:28,359
and i determined that i have a bay of plan what do i do right how how can i fix that because i

319
00:31:28,359 --> 00:31:33,319
want to wait for the the next invocation i want to fix the one i have right now so i'm calling this

320
00:31:33,319 --> 00:31:38,359
the replaying the current invocation again the idea is that if i've determined that the observed

321
00:31:38,359 --> 00:31:44,759
behavior of the query plan as i'm executing it is way off or or divergent from what the estimated

322
00:31:44,759 --> 00:31:51,559
behavior was that the cost models uh produced then i can decide to potentially either stop the query

323
00:31:52,279 --> 00:31:57,399
and go back and generate a new plan or i can decide to maybe how much smile um

324
00:31:58,919 --> 00:32:06,200
uh recognize that i've already produced some work for me uh and keep that portion of the data

325
00:32:06,200 --> 00:32:10,519
that i've already processed and then return back to the optimizer and ask it to just just generate

326
00:32:10,519 --> 00:32:15,960
a sub plan so again the other just start off a scratch and you know you decide that continue with

327
00:32:15,960 --> 00:32:22,440
the same query plan that i have now is going to be worse than just starting over um obviously if

328
00:32:22,440 --> 00:32:26,600
you're at the last two with it the last operator then it's the bad idea just let it finish so

329
00:32:26,600 --> 00:32:31,480
striking right balance of this is difficult and then the other approach is determining that well

330
00:32:31,480 --> 00:32:37,319
i'm doing a hundred joins and i've already done one of them many keep that one that i have uh because

331
00:32:37,319 --> 00:32:42,680
that was expensive and then i'll replan the ordering for the other 99 again the whole idea here is

332
00:32:42,680 --> 00:32:47,480
that you're going back to the optimizer and saying hey generate generate me a new plan

333
00:32:49,320 --> 00:32:54,840
so let me give an example that something does something sort of similar to like this um so this

334
00:32:54,840 --> 00:33:02,440
is from a patchy quickstep quickstep was it or is a embedded analytical engines sort of similar to

335
00:33:02,440 --> 00:33:08,519
ductyb uh but i don't think it's supported sequel it came out of university with constant and then it's

336
00:33:08,519 --> 00:33:15,559
been um it's been turned over to the patchy foundation i think it's been kicked out of the incubator

337
00:33:15,559 --> 00:33:18,759
program because i don't think they've updated it recently i don't know what's going on with

338
00:33:18,759 --> 00:33:23,240
jignation as team um but i haven't really seen any updates in a while but they had this really

339
00:33:23,240 --> 00:33:29,960
interesting approach called look ahead information passing where i can do some work at the beginning

340
00:33:29,960 --> 00:33:35,960
of my query and pass that along to other operators or other portions of my query plan and help

341
00:33:35,960 --> 00:33:43,079
you make a decision about uh what the right ordering is for for things up ahead so for this example

342
00:33:43,079 --> 00:33:49,319
say we have uh uh a simple data says three tables and so this would be a star schema so this

343
00:33:49,319 --> 00:33:53,880
this this approach only works for star schema we have a uh a fact table in the middle and then you

344
00:33:53,880 --> 00:34:00,200
have dimension tables coming out of it right so it's not for arbitrary uh star schemas or arbitrary

345
00:34:00,279 --> 00:34:05,880
like tree tree based schemas so the way it is going to work is uh say this is my sequel query like

346
00:34:05,880 --> 00:34:10,599
this i'm doing a three-way join between the fact table and the two dimension tables so what i'm

347
00:34:10,599 --> 00:34:17,639
going to do is before i begin the uh before i start scanning the the fact table and start computing

348
00:34:17,639 --> 00:34:24,199
the hash tables hash tables for my join i'm going to scan through the dimension tables and generate

349
00:34:24,199 --> 00:34:29,159
a bloom filter we saw this similar technique being used when we talked about joins right this idea

350
00:34:29,159 --> 00:34:35,239
came from vector wise that you can generate a bloom filter and then pass it along to uh to the other

351
00:34:35,239 --> 00:34:41,879
side of the query plan so so that um maybe avoid a hash table probe and we receive this so the joins

352
00:34:41,879 --> 00:34:45,079
are going to be on the dimension tables the these are going to generate the hash tables and the fact

353
00:34:45,079 --> 00:34:48,920
table which is going to do a probe so i want to generate the bloom filter and then check the bloom

354
00:34:48,920 --> 00:34:53,559
filter to see whether the key i'm looking for can even exist in the hash table which is cheaper than

355
00:34:53,559 --> 00:34:57,719
doing than the hash table probe but what we're going to do differently here is that we're actually

356
00:34:57,719 --> 00:35:02,119
going to pass these bloom filters and when we pass it over here to the fact table we're going to

357
00:35:02,839 --> 00:35:11,559
start uh do some sampling to determine the selectivity of the of the of the different of bloom filters

358
00:35:11,559 --> 00:35:18,199
for these different tables and then if we determine that well the second second second table here

359
00:35:18,199 --> 00:35:23,399
to meant the second dimension table is actually more selective than the first one then i want to

360
00:35:23,400 --> 00:35:31,559
reshuffle the um reshuffle my joins so that i do the the probe on this hash table first because i'm

361
00:35:31,559 --> 00:35:35,800
going to end up throwing away more tuples and we can do this before we actually you start running

362
00:35:35,800 --> 00:35:40,840
anything because we've already built the hash tables we generate the bloom filter and we can

363
00:35:40,840 --> 00:35:45,079
make the decision before we start scanning and doing the probe so i think this is a really

364
00:35:45,079 --> 00:35:49,320
interesting idea as far as you know quick step is the only one that does this and i i don't know

365
00:35:49,400 --> 00:35:56,760
whether it actually made it into the own source version. The last uh adaptive query optimization

366
00:35:56,760 --> 00:36:03,080
techniques uh sort of or category you want to talk about is uh what i call sort of plan pivot points

367
00:36:03,080 --> 00:36:11,480
and the idea here is that um we want to introduce additional subplans in our query and then have a

368
00:36:12,039 --> 00:36:19,800
uh have a sort of special synthetic operator that we put into our query plan that allows us to pivot

369
00:36:19,800 --> 00:36:25,240
or switch which query you know which path in that query plan we want to do and the idea here is

370
00:36:25,240 --> 00:36:33,800
that we can put conditions in our in the switch operator or the the change plan operator that

371
00:36:35,240 --> 00:36:39,800
if we determine that our data looks one way we'll go down one path if it looks another way we'll

372
00:36:39,800 --> 00:36:43,960
will go down another uh the other path um it doesn't have to be too it can be multiple ones

373
00:36:44,680 --> 00:36:48,600
so the sort of two most famous techniques for doing this are parametric optimization and

374
00:36:48,600 --> 00:36:52,200
proactive re-opposition again at a high level they're going to work exactly the same way

375
00:36:52,200 --> 00:36:55,560
it's just the sophistication of their technique is slightly different

376
00:36:57,000 --> 00:37:03,320
so parametric optimization was actually developed in the late 1980s uh in 1989 this actually came out

377
00:37:03,320 --> 00:37:08,200
of the volcano project again the same one that does the volcano uh query optimizer the volcano

378
00:37:08,199 --> 00:37:12,839
or iterator model they also did early work on adaptive query optimization which is again

379
00:37:12,839 --> 00:37:18,759
some same network is very influential so yeah as I said the idea is that for each pipeline and a

380
00:37:18,759 --> 00:37:23,879
query that we think uh that there's different alternatives we'd have that would make a big performance

381
00:37:23,879 --> 00:37:29,399
difference will generate different subplans for them and then now in our query we'll have this

382
00:37:29,399 --> 00:37:36,039
choose plan operator that basically has kind of a nif clause that says if the cardinality of the

383
00:37:36,039 --> 00:37:41,639
operator below me looks one way or it's of a certain size then I want to choose the first plan

384
00:37:41,639 --> 00:37:47,639
if it looks another way then I'll choose this other plan right and in this case here if I know that

385
00:37:47,639 --> 00:37:51,719
my data is really small then maybe I want to do a nestle loop join because that's going to be

386
00:37:51,719 --> 00:37:58,440
cheaper than having to build a hash table and probe it um but if my data is really big then I maybe

387
00:37:58,440 --> 00:38:05,400
want to build a hash run right or do do the hash run so again I think this is actually a very

388
00:38:05,400 --> 00:38:10,920
interesting idea of course obviously the tricky thing is determining what this conditional uh

389
00:38:10,920 --> 00:38:18,039
this condition should be um and you know there's it's sort of through trial and error and as you

390
00:38:18,039 --> 00:38:22,920
develop it and it's actually very dependent also on the on the hardware but the nice thing about

391
00:38:22,920 --> 00:38:27,880
this is like there's nothing we end up like not having to go back to the optimizer and sort of

392
00:38:27,880 --> 00:38:33,960
replant everything um the and we don't throw away any of the data that we've collected right so

393
00:38:34,679 --> 00:38:38,440
that we do this hash join and then we just determine whether we want to go down one path versus

394
00:38:38,440 --> 00:38:45,240
another a more recent sophisticated approach of this is called proactive re optimization and this

395
00:38:45,240 --> 00:38:51,559
is actually combining the ability to to go back to the optimizer and generate new plan as well as

396
00:38:51,559 --> 00:38:56,519
to tweak it in the same way we saw in in the previous example so they actually can do both

397
00:38:57,079 --> 00:39:02,280
and so at a high level it works like this so query shows up we generate through the optimizer

398
00:39:02,280 --> 00:39:07,560
and so we'll generate different uh different switchable plans just like before but we're also

399
00:39:07,560 --> 00:39:14,200
going to now we're going to generate bounding boxes that allow us to to to determine whether the

400
00:39:14,200 --> 00:39:17,960
assumptions we're making and our decisions about whether go down one path versus another

401
00:39:17,960 --> 00:39:23,640
we're actually going to match up with reality right basically trying to uh put a balance on the

402
00:39:23,640 --> 00:39:29,800
uncertainty we're seeing in the data as we run so now we start executing the query and just like

403
00:39:29,800 --> 00:39:34,120
before in in Leo and other techniques we execute query collects statistics about the data that

404
00:39:34,120 --> 00:39:39,560
we're seeing for particular query and then we can switch the query plan just as we saw before

405
00:39:39,560 --> 00:39:44,280
if we determine that you know one plan path might be better than another but then if we also

406
00:39:44,280 --> 00:39:50,039
determine based on our if we're sort of exceeding our estimations in our in our bounding box

407
00:39:50,039 --> 00:39:56,280
thresholds if we see that we're way out of you know way out of um whack and our estimations are way

408
00:39:56,280 --> 00:40:01,800
off then we just go back and it can re optimize and then you can determine whether to to pin the

409
00:40:01,800 --> 00:40:05,560
portions of the query plan that you've already executed because you know they're expensive or you

410
00:40:05,560 --> 00:40:12,280
can just throw everything away and start over so uh this is sort of getting a crash course on a

411
00:40:12,280 --> 00:40:19,960
data query optimization um the I actually really like this these techniques um and there's for obvious

412
00:40:19,960 --> 00:40:25,080
reasons right like it doesn't rely on getting it right at the very beginning like you can you can

413
00:40:25,079 --> 00:40:32,039
sort of correct yourself as as you actually run in query um so well again we'll see a next class

414
00:40:32,039 --> 00:40:36,759
when we talk about cost models of how bad things can actually get um but the way you actually need

415
00:40:36,759 --> 00:40:41,159
to implement this is super important that it's just not you know you you don't want to implement your

416
00:40:41,159 --> 00:40:46,599
optimizer and your execution engine completely separately from each other it's sort of a symbiotic

417
00:40:46,599 --> 00:40:52,199
relationship where you have to know what kind of strategies could be employed by the execution

418
00:40:52,359 --> 00:40:56,759
and the optimizer in terms of like switching pass or throwing weight intermediaries laws or not

419
00:40:56,759 --> 00:41:01,000
and then you build your optimizer or you build the optimizer around what your execution engine can

420
00:41:01,000 --> 00:41:08,839
can can actually do um so for this reason I think like the uh I think applying this technique for

421
00:41:08,839 --> 00:41:13,719
or using this technique with sort of this uh optimizer as a service like orca or calcite

422
00:41:14,599 --> 00:41:18,759
could actually be tricky because there's different approaches for how you can actually support

423
00:41:18,760 --> 00:41:26,840
adaptive query execution in in the system itself so the in addition to having sort of more robust

424
00:41:26,840 --> 00:41:33,400
or more uh more sophisticated query optimizers all you know versus the open source one open source

425
00:41:33,400 --> 00:41:39,160
systems all the major database vendors now support this uh within the last actually mostly in the

426
00:41:39,160 --> 00:41:45,640
last three or four years like db2 had this Leo thing in early 2000s um but really in the last three

427
00:41:45,639 --> 00:41:51,719
years of both Oracle and SQL server and now Teradata also included the ability to do adaptive query

428
00:41:51,719 --> 00:41:56,759
optimization but the best my knowledge and postgres and my SQL uh simply can't do this and none of

429
00:41:56,759 --> 00:42:01,159
the sort of the newer uh open source systems that have come around in the last decade support anything

430
00:42:01,159 --> 00:42:06,839
like this so all right so again this was just sort of the show you that you don't have to build the

431
00:42:06,839 --> 00:42:11,239
optimizer the way we described it where you sort of plan once and run it there are techniques to

432
00:42:11,239 --> 00:42:16,359
actually modify the query was running and they get feedback from execution put it into the system

433
00:42:16,359 --> 00:42:23,879
tear what's doing all right sorry um so next class we'll then start discussing how uh

434
00:42:23,879 --> 00:42:28,039
how cost models work uh and we'll see why they're so bad okay

435
00:42:41,559 --> 00:42:46,679
and i'm able to see say now so i'm available no short with the trust you know what i'm i take off the cat

436
00:42:46,679 --> 00:42:51,639
my first contact on the bottle no but three in the freezer so i can kill it careful with the bottle baby

437
00:42:51,639 --> 00:42:56,039
we'll slow fill it cause ain't now if you say the pain i'll sweat you drink it down with the

438
00:42:56,039 --> 00:43:01,239
guys little box head take back the pack of drugs you gon get your two same knives and drink it to the

439
00:43:01,239 --> 00:43:05,959
billy dance until it takes you down with the weird guys be a man to get a can of faith

