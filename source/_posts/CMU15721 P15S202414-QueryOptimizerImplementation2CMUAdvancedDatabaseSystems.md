---
title: CMU15721 P15S202414 QueryOptimizerImplementation2CMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Cane Gimellan University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:09,000 --> 00:00:19,000
I have one of the chips in my office for some reason.

4
00:00:19,000 --> 00:00:22,000
They took me on a boat on Hawaii and they're like,

5
00:00:22,000 --> 00:00:25,000
here's a burnt out chip for a spark that has, you know,

6
00:00:25,000 --> 00:00:27,000
oracle compression built inside of it.

7
00:00:27,000 --> 00:00:30,000
Okay, I have it. I don't know what to do with it.

8
00:00:30,000 --> 00:00:32,000
Anyway, sorry.

9
00:00:32,000 --> 00:00:34,000
We can go over.

10
00:00:34,000 --> 00:00:37,000
All right. Data bases.

11
00:00:37,000 --> 00:00:38,000
Query optimization.

12
00:00:38,000 --> 00:00:41,000
All right, so last class, we didn't get through everything.

13
00:00:41,000 --> 00:00:43,000
We'll go over this again.

14
00:00:43,000 --> 00:00:46,000
Again, I'll go a bit slower than maybe the day last time.

15
00:00:46,000 --> 00:00:49,000
I'll just walk through what Cascades is doing and then we'll finish up with randomize search.

16
00:00:49,000 --> 00:00:51,000
Before we jump into what today's paper is about.

17
00:00:51,000 --> 00:00:55,000
But again, the things we discussed last class

18
00:00:55,000 --> 00:00:59,000
was going through this progression of how to do more sophisticated things

19
00:00:59,000 --> 00:01:03,000
with the query optimizers, starting from just if the analysis rules looking for patterns

20
00:01:03,000 --> 00:01:08,000
that then do some kind of rewrites, which is everyone uses when they first start out.

21
00:01:08,000 --> 00:01:14,000
And then we saw how system R in the 1970s introduced this call space joint search

22
00:01:14,000 --> 00:01:19,000
and that's sort of the backbone of how the ratified search and unified search came along.

23
00:01:19,000 --> 00:01:23,000
And then randomize search will be the variation of this.

24
00:01:23,000 --> 00:01:28,000
So the distinction we were talking about last time was again the stratified search and the unified search.

25
00:01:28,000 --> 00:01:30,000
And as I was saying, the lines are kind of blurry.

26
00:01:30,000 --> 00:01:35,000
We're like, okay, Cascades in SQL Server is technically a unified search,

27
00:01:35,000 --> 00:01:40,000
but the way they invoke some of the rules, the transformation rules, as I was saying in a second,

28
00:01:40,000 --> 00:01:43,000
it's basically doing it without a call space search.

29
00:01:43,000 --> 00:01:47,000
Like they're doing transformations that you always want to do first.

30
00:01:47,000 --> 00:01:51,000
And then they do something that is more exploratory search, like you would see in Cascades.

31
00:01:51,000 --> 00:01:58,000
And so the thing that maybe matters the most is that we want to be able to define the transformation rules

32
00:01:58,000 --> 00:02:02,000
ideally in the same dialect or DSL, whatever you want to call it,

33
00:02:02,000 --> 00:02:07,000
that allow us to then be able to decide, do I want to move stuff to be always in this front phase

34
00:02:07,000 --> 00:02:11,000
that I always want to run or the second phase where I do more exploration stuff.

35
00:02:11,000 --> 00:02:13,000
So the stratified search is having two separate phases.

36
00:02:13,000 --> 00:02:16,000
One with just heuristics, sorry, one using the rules,

37
00:02:16,000 --> 00:02:19,000
but without a cost model, the second one is doing cost-based search.

38
00:02:19,000 --> 00:02:23,000
And then the unified search is the idea is like you just do everything all at once.

39
00:02:23,000 --> 00:02:27,000
And you avoid a bunch of expensive transformations or getting stuck in infinite loops.

40
00:02:27,000 --> 00:02:30,000
We saw again how the memo table is going to help with that.

41
00:02:30,000 --> 00:02:34,000
So, less so about maybe the stratified search for the unified search,

42
00:02:34,000 --> 00:02:40,000
the thing that really matters when we understand is that it is going to be top down versus bottom up.

43
00:02:40,000 --> 00:02:45,000
Right? So the Cascades approach is top down, meaning I start with the outcome that I want.

44
00:02:45,000 --> 00:02:47,000
Like this is the final output I want for my query.

45
00:02:47,000 --> 00:02:53,000
I don't know how I got there in my query plan, but I'm going to go down the tree and assemble the pieces,

46
00:02:53,000 --> 00:02:58,000
or assemble the operators I need to then feed me into my final output.

47
00:02:58,000 --> 00:03:02,000
Whereas in the bottom optimization, which is what the system R guys started with,

48
00:03:02,000 --> 00:03:10,000
is that you start with nothing and you then add the operators you need to get you up to the goal that you want.

49
00:03:10,000 --> 00:03:13,000
And again, me standing up here and making hand gestures like this and this,

50
00:03:13,000 --> 00:03:19,000
maybe doesn't really sink in and mean anything, but there are certain amnesty you can apply more easily in one versus another.

51
00:03:19,000 --> 00:03:24,000
At a high level, they are composable, they're communicative, you could use one versus another.

52
00:03:24,000 --> 00:03:28,000
But there are some optimizations you can do in top down one that maybe you can't do in bottom up.

53
00:03:28,000 --> 00:03:31,000
And likewise in bottom up, you can't do in top down. Yes.

54
00:03:31,000 --> 00:03:33,000
Is stratified always bottom up?

55
00:03:33,000 --> 00:03:35,000
No, his question is stratified always bottom up.

56
00:03:35,000 --> 00:03:36,000
That's what I'm saying.

57
00:03:36,000 --> 00:03:43,000
The case case as described by Microsoft is that stratified because they have a bunch of rules that you always run,

58
00:03:43,000 --> 00:03:46,000
then later on they run the cost based search.

59
00:03:46,000 --> 00:03:49,000
And in that cost based search, it's doing top down.

60
00:03:49,000 --> 00:03:54,000
But the transformation rules are sort of operating in the same way.

61
00:03:54,000 --> 00:03:57,000
They're generating these logical plans at a top down manner too.

62
00:03:57,000 --> 00:04:01,000
But that would be technically that's a stratified search because you have something you always do,

63
00:04:01,000 --> 00:04:04,000
and then you have a cost based thing that you can be dynamic about.

64
00:04:04,000 --> 00:04:05,000
Right.

65
00:04:05,000 --> 00:04:10,000
So most of the open source systems are going to be bottom up.

66
00:04:10,000 --> 00:04:18,000
Even the guy that invented cascades said the way you probably want to do a career optimization now

67
00:04:18,000 --> 00:04:22,000
is start with cascades in a stratified manner like run some initial rules.

68
00:04:22,000 --> 00:04:25,000
Maybe not necessarily in the full cost based search.

69
00:04:25,000 --> 00:04:26,000
It wasn't clear.

70
00:04:26,000 --> 00:04:28,000
It's sort of offhand comedy made at a conference.

71
00:04:28,000 --> 00:04:32,000
And then you want to do the bottom up, or start the bottom up,

72
00:04:32,000 --> 00:04:36,000
and bottom up, optimization to pick joint ordering.

73
00:04:36,000 --> 00:04:37,000
All right.

74
00:04:37,000 --> 00:04:42,000
So, again, today's class, I just want to spend the first half going over again

75
00:04:42,000 --> 00:04:46,000
what we missed and rushed through at the end of last class of the unified search and cascades.

76
00:04:46,000 --> 00:04:49,000
And then we'll see how we then apply that run by search.

77
00:04:49,000 --> 00:04:53,000
And then I want to go quickly over some real world examples of what the,

78
00:04:53,000 --> 00:04:58,000
what some closed source and open source career optimizers actually look like.

79
00:04:58,000 --> 00:05:02,000
The main is it's going to be sequels over calcite, orca, and calcish DB.

80
00:05:02,000 --> 00:05:09,000
And then we'll finish up with going over at a high level again the unnesting subquery paper you guys were starting to reading.

81
00:05:09,000 --> 00:05:13,000
Hopefully I wasn't too dense on the mission, Aldro, but it's a,

82
00:05:13,000 --> 00:05:16,000
it's one of the things where I think everyone should know it.

83
00:05:16,000 --> 00:05:19,000
We probably should teach it in the intro class.

84
00:05:19,000 --> 00:05:22,000
Very few systems actually implement it entirely.

85
00:05:22,000 --> 00:05:25,000
As far as I know, only ducty B, Umbra, and Hyper.

86
00:05:25,000 --> 00:05:28,000
My former student who took 7201, she's at Databricks.

87
00:05:28,000 --> 00:05:33,000
She implemented almost all of it in Databricks and not, not, not everything.

88
00:05:33,000 --> 00:05:36,000
But we'll walk through an example there.

89
00:05:36,000 --> 00:05:39,000
And unfortunately, say a time we're not going to be able to cover the,

90
00:05:39,000 --> 00:05:46,000
how Hyper does their, their, their dynamic dynamic program approach or DP approach for finding joiners.

91
00:05:46,000 --> 00:05:49,000
But we can cover that offline if you want.

92
00:05:49,000 --> 00:05:51,000
All right, so again, this is just a repeat.

93
00:05:51,000 --> 00:05:55,000
I'll tell you in the last class where the cascades optimizer is going to be the,

94
00:05:55,000 --> 00:05:59,000
the third version, or third generation of a query optimizer,

95
00:05:59,000 --> 00:06:02,000
this guy, Gertz Graffey built, Exodus came first, then Volcano.

96
00:06:02,000 --> 00:06:05,000
And it's the same volcano when we describe the volcano model, this iterator thing.

97
00:06:05,000 --> 00:06:12,000
But in that, in that system, in that, there's papers, you also describes how to do parallel queries with the exchange operator.

98
00:06:12,000 --> 00:06:16,000
And then he has this optimizer generator that he built in Volcano.

99
00:06:16,000 --> 00:06:19,000
And then after that, he then built cascades.

100
00:06:19,000 --> 00:06:22,000
But as far as I know, he just wrote the paper on cascades.

101
00:06:22,000 --> 00:06:28,000
It's very heavy handed on object-oriented programming because that was the hot thing in late 80s, early 90s.

102
00:06:28,000 --> 00:06:36,000
And then as far as I know, nobody, he didn't actually implement it except for being involved in this master's thesis a few years later at Portland State.

103
00:06:36,000 --> 00:06:42,000
But then Microsoft hired him to go build their new query optimizer because they were rewriting everything from their fork of cybase.

104
00:06:42,000 --> 00:06:47,000
And that's why, again, Microsoft famously is using, using cascades.

105
00:06:47,000 --> 00:06:51,000
So it's going to top down approach using a branch bound search.

106
00:06:51,000 --> 00:07:09,000
And the key idea of what makes cascades interesting and better than what came before was that they were doing the incremental materialization of the possible ways to represent some expression,

107
00:07:09,000 --> 00:07:12,000
which I'll say it is a second.

108
00:07:12,000 --> 00:07:21,000
Some operator in the query plan, whereas in Volcano, when you search down, you land at some node in the tree, you immediately materialized everything, which would explode your search base.

109
00:07:21,000 --> 00:07:27,000
Even though you may run out of time to examine everything at that operator, at that level of the tree, you still materialize everything.

110
00:07:27,000 --> 00:07:34,000
And so your memory cost of Volcano would explode.

111
00:07:34,000 --> 00:07:42,000
So the four key ideas of cascades, as we talked about last class, again, everything is going to be represented as data structures.

112
00:07:42,000 --> 00:07:46,000
So within a task, we'd have, here's the pattern I'm looking for in my query plan.

113
00:07:46,000 --> 00:07:48,000
Here's the transformation I want to apply.

114
00:07:48,000 --> 00:07:56,000
And you can have additional things, like a priority that says this thing should be considered more quickly than another one.

115
00:07:56,000 --> 00:08:01,000
And in the paper, you can actually modify these priorities on the fly.

116
00:08:02,000 --> 00:08:06,000
But in practice, again, I don't, the cockroach TV does that, Microsoft does not.

117
00:08:06,000 --> 00:08:30,000
Then we have explicit definition of these, what properties we need our operators to have to ensure that if data needs be sorted, a certain way, or data needs to come, you know, in a certain compressed form, we can make sure that anything we, any operator we would generate in our query plan, at some level in the tree, meets the expectations of, sorry, anything below us in the tree meets the expectation of the parent we're feeding into.

118
00:08:31,000 --> 00:08:38,000
And then we talked about this, you can reorder things on the fly to find the best plan more quickly based on what you know the query plan is done so far.

119
00:08:38,000 --> 00:08:50,000
And then this last one, again, is important that within the same search engine and the rule definitions, we can do pattern matching and transformations of expressions and ware clauses, having clauses or joint clauses, whatever.

120
00:08:50,000 --> 00:08:56,000
In the same way that we would do a search for, you know, converting logical operators to physical operators.

121
00:08:56,000 --> 00:09:06,000
And this is nice again, you don't have to do like one pass for the ware clause, optimize that and then a separate pass for the query plans themselves, all that's done in a single engine.

122
00:09:06,000 --> 00:09:15,000
Like I think my sequel, they treat the expressions and the ware clause separately from the query operators. So they have sort of two optimization passes.

123
00:09:16,000 --> 00:09:30,000
So the definition we care about in case case is this notion of an expression and it's just going to be some operation that we want to do in our query plan that is going to have zero or more inputs coming coming into us.

124
00:09:30,000 --> 00:09:35,000
So you can be a leaf in the query plan or it could be some middle operator.

125
00:09:36,000 --> 00:09:42,000
And we can sort of group them together and say here's a here's a higher level thing that we want to do and we'll represent that as an expression.

126
00:09:42,000 --> 00:09:51,000
So for example, if I want to join a, b and c on simple IDs, I got a logical expression that says I'm going to join a with the then join that with c.

127
00:09:51,000 --> 00:09:55,000
And then if I flip the order, then that's considered another expression as well.

128
00:09:56,000 --> 00:10:09,000
And then I can have a physical manifestation of that expression by actually specifying here's the scan method I'm going to use or access method I'm going to use for that given table and here's the join algorithm I want to use.

129
00:10:09,000 --> 00:10:18,000
And then now I'm going to combine or group these together the equivalent expressions based on what we know is the relation algebra rules into what is called a group.

130
00:10:18,000 --> 00:10:32,000
So the idea is here is that within one container or construct entry in our system in our query optimizer, we would say here's the output that I expect, you know, a join b join c.

131
00:10:32,000 --> 00:10:39,000
Then here's all the equivalent logical expressions, permutations of the join order and then here's all the equivalent physical expressions.

132
00:10:39,000 --> 00:10:47,000
So within one entry in our system, we can say here's everything that here's all the different possible ways we could actually execute to produce the output we would need for a single group.

133
00:10:47,000 --> 00:11:01,000
So the entire thing itself is the group and then these are all just the equivalent expressions and they also embed additional information about like here's the properties that I need to have coming into the data that I want here.

134
00:11:01,000 --> 00:11:12,000
So then we can combine expressions even further into what's called a multi expression and this is just basically a placeholder that says there's some expression below me in the query plan.

135
00:11:12,000 --> 00:11:24,000
And at this point, at this group in my search tree, I don't actually know what it is, right, but I'm just going to keep track of like I know something below me can tell me how this thing would actually be executed.

136
00:11:24,000 --> 00:11:34,000
So for example, if I need to join a b and c, I could have a multi expression that says I'm going to join a and b, I don't know how and I don't know what in what order.

137
00:11:34,000 --> 00:11:42,000
But then I'm going to join whatever the output of that is with c and then you have the various combinations of the joint orders and so forth.

138
00:11:42,000 --> 00:11:50,000
And likewise, the various combinations for the algorithm we're going to use to join it.

139
00:11:50,000 --> 00:12:05,000
So if it's a bottoms up approach, you're basically starting with like the smallest atomic multi expression you could have like go reday, right, and then you go add the pieces or the components to that going up towards the optimizer to the final output.

140
00:12:05,000 --> 00:12:20,000
And in this case, because we're at the top going top down, we start with this multi expression says I want some output of a join b join c and then I'm going down and then filling in filling in the specifications of the exact details of how to do that.

141
00:12:20,000 --> 00:12:31,000
Again, this is how they're going to get away with not having to materialize everything all at once when you land and say in a group as you search down the tree, because now you say I have a placeholder for a and b.

142
00:12:31,000 --> 00:12:44,000
So I'm going to tell you something. Someone below me is going to tell me how to handle that. But right now I can just reason about whatever expressions I'm looking at within my group directly.

143
00:12:44,000 --> 00:12:56,000
And then likewise, you can make further decisions based on this priority. So as we talked about, like if I'm trying to consider, should I go look at what happens when I join a and b, should I go look at when I scan c.

144
00:12:56,000 --> 00:13:05,000
You can decide dynamically as you're going down the tree, which of these paths you want to look at first.

145
00:13:05,000 --> 00:13:12,000
So this we've already defined again, the rules are just ways to convert logical operators to logical operators or logical to physical.

146
00:13:12,000 --> 00:13:20,000
And in the end, the database system needs physical operators because that tells you what the system is actually going to do when it when it exits things.

147
00:13:20,000 --> 00:13:37,000
And then within a rule, we'd say here's the pattern that I want to match on either in a logical special or physical special, and then here's the transformation I want to do to put the query plan that I'm looking at or the group that I'm looking at into a new form.

148
00:13:37,000 --> 00:14:01,000
So this is the example we saw before. I have a my patterns to identify when I have two joins across three groups. And then I would have a logical plan that looks like this. And note here again, I have the multi expression that says I'm joining a and b, but then down below me, now I'm just saying a joint a with b. And then below that, I can specify how max accessing the data.

149
00:14:01,000 --> 00:14:13,000
So I'm going to have a transformation rule that says is rotated left to right or I can have an implementation rule that says convert all the aqua joins that I have in here into a certain race join or hash join or an acid loop join, so forth.

150
00:14:14,000 --> 00:14:31,000
And as we said before, to avoid having to get stuck in infinite loops because I go like left to right and right to left and just doing these transformations over again, we're going to use a memo table to keep track of have I do I know something about what the outcome of this transformation would be.

151
00:14:31,000 --> 00:14:49,000
And therefore, I don't need to apply it because I've already seen it. So rather than doing that on like on every individual rule for every single possible state of the query plan, I memo tables just can keep track of like, OK, I know that for this multi expression, I have a cost for it.

152
00:14:49,000 --> 00:14:56,000
And I don't need to go look at what happens when I make that transformation, if I if that transformation's cost is going to be.

153
00:14:57,000 --> 00:15:03,000
Sorry, the cost of the query plan after that transformation is worse than the best I've seen that I know I don't need to go look at it.

154
00:15:05,000 --> 00:15:14,000
So as we said, the memo table again, the different ways to implement this, I think Microsoft puts this as actually inside the groups themselves.

155
00:15:14,000 --> 00:15:24,000
I think cockroach TV maintains this as a separate hash table, but it's basically again some table that's going to keep track of for a given, given multi expression.

156
00:15:25,000 --> 00:15:33,000
Here's the best the best physical operator I've seen for it and here's the best, here's the lowest cost.

157
00:15:34,000 --> 00:15:53,000
You'll also keep track of like the the properties that I care about, whether the data is coming up with this operator for a given multi expression with what again what physical properties and I can know that if I'm looking at something differently, even though I'm looking at a different multi from looking at a different operator that I can

158
00:15:53,000 --> 00:16:09,000
go look at the data in the group, if it has a different physical property, I can then maybe still evaluate and go further and you would do this things like if the best cost I've seen so far is a sequential scan, but I know that for the given group that I'm at, I really wanted to be sorted now because that'll change my my cost expectations.

159
00:16:10,000 --> 00:16:18,000
Then if the multi group below me doesn't now, you know, does not enforce that property or provide that property, I can still go down and look at look for other things.

160
00:16:19,000 --> 00:16:35,000
So the basic idea hell is going to work, not to get too theoretical is this idea of the principle of optimality and all it says is that if we have a what is the true optimal plan, then any sub plan of that optimal plan is going to be optimal.

161
00:16:35,000 --> 00:16:47,000
It's sort of a sort of a sort of self defining like if I have the optimal plan that any portion of that of that query plan is going to be optimal because if it wasn't optimal, then that wouldn't be the optimal plan.

162
00:16:48,000 --> 00:17:04,000
So because of that, this is how we're going to be able to do branch and bound search to identify that if the if I'm at some some level in my search tree, if the cost to traverse down to my query plan as I go below is now worse than the best possible plan.

163
00:17:05,000 --> 00:17:19,000
So if the plan I've ever seen so far, then I know I don't need to go down and look further because there's no magic way that that cost is now going to become less because it's you know, add you go down the level, you're adding more physical operators, you're accumulating more costs estimates, right, that's this a summation.

164
00:17:19,000 --> 00:17:26,000
So you're not magically going to get faster. So we just cut things off and avoid having to search, search further.

165
00:17:26,000 --> 00:17:47,000
So this is the example that we have before. Again, we want to join a B and C. So the very beginning, we just start with the root and we apply logical transformations to generate different logical multi expressions and then say for rather than materializing much of all the logical multi expressions, what is jumped down the first one we have and see what the cost is.

166
00:17:47,000 --> 00:18:12,000
So now we come down here, do the same thing. We have the multi expression AB. We do a logical transformation to cover it into a multi expression on a joined by a multi expression on B. But now we need to get the cost of these these inter multi expressions. So we go down here and this is doing the access on a there's nothing other than just get a there's not there's not no other multi logical multi expression.

167
00:18:12,000 --> 00:18:35,000
So then we'll materialize the different physical multi expressions so either a sequential scan on a index scan on a for brevity. I'm not showing you like, okay, what index I'm actually using, but you can imagine, you know, for all my possible choices of indexes, you would have additional, you would have mouthwater for each index I could use an index scan on a table. I would have entry for each of those.

168
00:18:36,000 --> 00:19:02,000
And then again, you can do ranking in the priority, let's just say, well, only consider the indexes that, you know, rank them, rank the order in which I value the indexes in my in my multi expression list here based on the selectivity of them or the which ones cover the most columns that I need in my query. There's a bunch of different rules you can do to figure out some just blindly looking at all possible indexes.

169
00:19:03,000 --> 00:19:20,000
All right, so now that we have these these two different physical multi expressions, we do some cost model look up and say, okay, well, the sequential scan is going to be the fastest has the cost of 10. So we add the multi question on a into our our memo table and with the best physical expression we've gotten for the cost of 10.

170
00:19:21,000 --> 00:19:28,000
Then we go back up the tree do the same thing down the B same thing we convert that to physical multi expressions, we end up with the in sequential scan index and a B.

171
00:19:29,000 --> 00:19:37,000
So I understand it's still faster, we get we get a cost of 20 and then now we bounce up bounce back up to our to our multi special on a B.

172
00:19:38,000 --> 00:19:49,000
We do further transformations to now flip the water of the joints, not B joining a. But now we need again to do the same thing and get the what is the cost of actually accessing these different tables.

173
00:19:49,000 --> 00:19:59,000
Well, when we go down to these lower notes here, we will see that we've already done this costing for us because in our memo table, so we actually don't even do the do traversal.

174
00:19:59,000 --> 00:20:07,000
We can at this point here we can go look up the memo table and say what is the best cost for there scanning B and scanning A. And then we just reuse that.

175
00:20:08,000 --> 00:20:16,000
So now again, say, you know, there's only a joint being to be joint A. So now we generally all the physical multi expressions.

176
00:20:16,000 --> 00:20:26,000
And then again, using our cost model, we then figure out that the hash joint is the fastest. So the cost of the hash line plus the cost of the scans on a and B produces the cost of 80 and that goes in our memo table.

177
00:20:27,000 --> 00:20:43,000
And then we bounce back up and do now go on the other side of C and do the same evaluation. Yada yada so forth until we then maybe exhaust the search for the different joint orders we have for AD and C and we on end up with the lowest cost of 125.

178
00:20:46,000 --> 00:21:05,000
So this is clear. So this is what cascades are doing again, you're starting with in this case here, I'm going to join A, B and C not so simply order not specifying how I'm accessing the tables not specifying what the joint algorithm going to use and it traverse down and use the memo table to keep track of the best cost I have.

179
00:21:05,000 --> 00:21:18,000
Yes, so this is the cost base, but you said there were a few rules that tries to find every single time. Yes, so how would that work? So we first build this table and then or would it do it somehow before?

180
00:21:18,000 --> 00:21:28,000
So like, like the, what I showed here, like, okay, I have get a and then I take the logical multi expression and convert it to physical multi expression.

181
00:21:28,000 --> 00:21:43,000
Like the rule could be like you would say if I land here, I know I'm accessing the logical expression on a scan on a, or accessing a table. So let me always run the transformation rule implementation rule that spits out different physical multi expressions.

182
00:21:43,000 --> 00:21:53,000
So the rule is going to be just say, only speak sequential scan but can. No, no, no, no, no, when I'm saying is that you always generate the most expression that a sequential scan and all possible indexes scans on A.

183
00:21:53,000 --> 00:22:08,000
That always gets fired. Then you do a cost based search to say, or selection which one of these is the best. Now whether or not you materialize all possible physical multi expressions depends on the complexity or whatever it is that you're doing because that might balloon up the huge like up, you know, the joiner of above.

184
00:22:08,000 --> 00:22:14,000
So you have a ranking say like to like preuse I think I should look at the joint owners first.

185
00:22:14,000 --> 00:22:15,000
Yes.

186
00:22:15,000 --> 00:22:35,000
Yes. What's the difference is that when you land and say at the very, very beginning. So back up here, I generate all the logical multi expressions all the physical multi expressions.

187
00:22:35,000 --> 00:22:40,000
Again, it seems kind of obviously you wouldn't want to do that, but 80s 90s.

188
00:22:40,000 --> 00:22:49,000
Right. Volcano didn't have priorities. Volcano also didn't have.

189
00:22:49,000 --> 00:22:55,000
I don't think you can evaluate the the wear calls expressions in the same method as well.

190
00:22:55,000 --> 00:23:05,000
Right question this.

191
00:23:05,000 --> 00:23:15,000
You mean like this right here. Right like it was a question.

192
00:23:15,000 --> 00:23:28,000
Yeah, so right here saying I want to join a see together, but here you're not defining how to do it.

193
00:23:28,000 --> 00:23:32,000
You then go look up the memo table and say what's the best way for me to have done that.

194
00:23:32,000 --> 00:23:40,000
Yeah. What do we say we're applying with before if we're doing it while we're doing all the courses.

195
00:23:40,000 --> 00:23:45,000
This is still entirely unified. Like there isn't a set of things that you're doing before.

196
00:23:45,000 --> 00:23:53,000
You're doing this entire thing or get where you're applying these transformations also has to be because picking the best one and then going back on.

197
00:23:53,000 --> 00:23:56,000
So yeah, so his question is like.

198
00:23:56,000 --> 00:24:02,000
Yeah, what how can I say that you could use cascades to do a two stage approach.

199
00:24:02,000 --> 00:24:13,000
So like think of like the when you first show up you convert the AST from the parts SQL query into.

200
00:24:13,000 --> 00:24:17,000
Some you know you have like a group like this I know I know I'm going to access a.

201
00:24:17,000 --> 00:24:23,000
So you need to start populating those things. Right and then without.

202
00:24:23,000 --> 00:24:27,000
I don't know how Microsoft actually does that whether they can.

203
00:24:27,000 --> 00:24:32,000
Inject themselves in any point of the tree and start doing transformations or they always start the top and go down.

204
00:24:32,000 --> 00:24:34,000
But there's like.

205
00:24:34,000 --> 00:24:40,000
You could say you could say I'm going to traverse the tree and only apply these rules.

206
00:24:40,000 --> 00:24:48,000
To put me into a form that when I do a cost based search I'm kind of pushed in the direction where I know it's going to be a better you know a better plan.

207
00:24:48,000 --> 00:24:50,000
And building on the corner.

208
00:24:50,000 --> 00:24:55,000
Which is you said in volcano if one do everything is also but in the.

209
00:24:55,000 --> 00:25:03,000
I put dot dot dot right like whether it's power playing like whatever in that it looks at all.

210
00:25:03,000 --> 00:25:10,000
It is a source no no no because you so again we talked about the when determination rules.

211
00:25:10,000 --> 00:25:15,000
It could be a timer could be like how many transformations I've done could be like I haven't seen anything better.

212
00:25:15,000 --> 00:25:18,000
I mean they all had some kind of timer.

213
00:25:18,000 --> 00:25:21,000
But it's again whether or not you you you would.

214
00:25:21,000 --> 00:25:26,000
Again materialize all possible things ahead of time before you look at them.

215
00:25:26,000 --> 00:25:28,000
Well can it did not do that.

216
00:25:28,000 --> 00:25:33,000
There's other like object oriented program and stuff which again is we don't care about.

217
00:25:33,000 --> 00:25:44,000
What data is like on limits to make these estimations with like for example like like like the other page information like the something like the action information per page.

218
00:25:44,000 --> 00:25:48,000
As you know you're like skip it or not.

219
00:25:48,000 --> 00:25:51,000
Like that's not something you like.

220
00:25:51,000 --> 00:25:53,000
Like for the cost.

221
00:25:53,000 --> 00:25:58,000
That's next week right that comes later but like you would.

222
00:25:58,000 --> 00:26:03,000
The traditional database system like it's meaning like you have you know statistics you've collected by running analyze or whatever.

223
00:26:03,000 --> 00:26:13,000
Like you would you would you would be cost might would tell you what the selectivity of of you a little operator like this would be like how many data how much do I think I'm going to read.

224
00:26:13,000 --> 00:26:17,000
You know it's just a straight to a scan versus like a next scan.

225
00:26:17,000 --> 00:26:20,000
So this is all day that you have to have a button.

226
00:26:20,000 --> 00:26:24,000
You're going to have to touch the data when you're creating them.

227
00:26:24,000 --> 00:26:27,000
So let me touch the data.

228
00:26:27,000 --> 00:26:30,000
There's only certain things you know after you from the query obviously.

229
00:26:30,000 --> 00:26:31,000
Yes.

230
00:26:31,000 --> 00:26:35,000
But like this analytics comes from either previous runs or estimation.

231
00:26:35,000 --> 00:26:36,000
Correct.

232
00:26:36,000 --> 00:26:44,000
So you say like these calls on as estimates as I'm describing here are done meeting make using someizations or sketches or whatever you will call it.

233
00:26:44,000 --> 00:26:51,000
Of the data that you either derive from previous runs or your own analysis.

234
00:26:51,000 --> 00:27:00,000
But also through a third category and you'll see on Monday next week is sometimes there's just a sample of data that's local and you can run like you know.

235
00:27:00,000 --> 00:27:07,000
Run the wear calls on that sample data just to see what the estimates going to be right sequels over does that.

236
00:27:07,000 --> 00:27:14,000
But like all that is is it abstracted away from from this part is through the cost model.

237
00:27:14,000 --> 00:27:15,000
Yes.

238
00:27:15,000 --> 00:27:23,000
Why might one want to prefer to join the bottom up then.

239
00:27:23,000 --> 00:27:26,000
So question why do you want to do bottom up versus top down.

240
00:27:26,000 --> 00:27:27,000
Yeah.

241
00:27:27,000 --> 00:27:28,000
So go question.

242
00:27:28,000 --> 00:27:35,000
So there's some weird things like you may not be able to do the.

243
00:27:35,000 --> 00:27:40,000
Do all the branch bounding stuff that we want to do because I got to get to the bottom first.

244
00:27:40,000 --> 00:27:44,000
Meaning like I can't say okay well.

245
00:27:44,000 --> 00:27:49,000
I am at this point here and I know that.

246
00:27:49,000 --> 00:27:56,000
Maybe I'm farther up in the tree like think of like doing a lot of joints like so I'm up here and.

247
00:27:56,000 --> 00:28:06,000
I have I can't do any pruning of the of the search tree below me until something gets to the bottom and produces what I think is the best possible plan.

248
00:28:06,000 --> 00:28:12,000
So you always have to generate the full plan then you can start pruning other things and sometimes like you can't.

249
00:28:12,000 --> 00:28:17,000
You do have to do the materialization of a logical to physical because.

250
00:28:17,000 --> 00:28:23,000
I don't know I can't do cost estimates or I can't get the the can get the lower bound.

251
00:28:23,000 --> 00:28:26,000
If it's just a logical expression.

252
00:28:26,000 --> 00:28:30,000
I got to convert it to the physical operator to know what the true cost is going to be.

253
00:28:30,000 --> 00:28:36,000
There's some tricks you can play around like like doing estimates like you know worst case scenario things.

254
00:28:36,000 --> 00:28:45,000
But it's in the you're going bottom to the top like along each step I have a physical operator I can I can cost things right there.

255
00:28:45,000 --> 00:28:50,000
The essence is better because starting from the bottom.

256
00:28:50,000 --> 00:28:54,000
It's someone gives you more options and it also allows you to materialize physical.

257
00:28:54,000 --> 00:28:57,000
I mean I mean materialize what sorry.

258
00:28:57,000 --> 00:29:04,000
There's other organizations you can do which we don't have to cover for like the hyper guys of like grouping things together.

259
00:29:04,000 --> 00:29:14,000
Hypergraphs and like just costing those things separately from other pieces where this is looks at everything all at once.

260
00:29:14,000 --> 00:29:15,000
Yeah I mean I can.

261
00:29:15,000 --> 00:29:18,000
It's like 2006 paper it's in the reading list.

262
00:29:18,000 --> 00:29:22,000
I just don't I might mention I don't have time to cover it but like they show that like they.

263
00:29:22,000 --> 00:29:29,000
In practice they find the they find the optimal joint algorithm faster than a joint ordering faster than cascades.

264
00:29:29,000 --> 00:29:32,000
You know Microsoft has put a ton of effort money into it.

265
00:29:32,000 --> 00:29:33,000
Yes.

266
00:29:33,000 --> 00:29:45,000
How does the data properties come in come to play in any of this would be like say that.

267
00:29:45,000 --> 00:29:48,000
Say that I picked here.

268
00:29:48,000 --> 00:29:55,000
I'm going to emerge joint say not so not a sort of merge or an emerge joint so I assume that my inputs have to be sorted.

269
00:29:55,000 --> 00:29:58,000
So as I traverse down.

270
00:29:58,000 --> 00:30:08,000
Then I could say don't give me anything that that's not sorted right and then I could record that actually in the in my memo table say okay for.

271
00:30:08,000 --> 00:30:15,000
The scan on B here's the lowest cost with with with these set of properties and here's the lowest cost with this other set of properties.

272
00:30:15,000 --> 00:30:23,000
So then I can decide okay if I need those properties I can check the memo to see whether that costs whether that operator providing info.

273
00:30:23,000 --> 00:30:30,000
So the name of the memo table I'm not showing here because the PowerPoint you would keep track of like what properties.

274
00:30:30,000 --> 00:30:37,000
You know a given multi expression and any any the best expression for it provides and then you can decide whether that's going to give you what you need or not.

275
00:30:37,000 --> 00:30:45,000
So what is the most common one you could say like compression.

276
00:30:45,000 --> 00:30:57,000
I'm not showing like we're not showing projections obviously here but like I need these columns stuff like that and then that can change based on what it's like a column store or a row store.

277
00:30:57,000 --> 00:31:04,000
Because row store could always shove it up at a common store if it's like disaggregated across different nodes it becomes more complicated.

278
00:31:04,000 --> 00:31:13,000
So you have to store every single set of like some set of properties for every single combination of tables.

279
00:31:13,000 --> 00:31:19,000
Questions would you have to sort of every so if you just think you're like sorting this out is what it is right.

280
00:31:19,000 --> 00:31:22,000
Is this one or zero but you have like five.

281
00:31:22,000 --> 00:31:25,000
No no no no like be sorting me like sort of on what column.

282
00:31:25,000 --> 00:31:27,000
Oh yeah like that is called.

283
00:31:27,000 --> 00:31:32,000
Yeah so you have to keep track of like I'm accessing this data and it's coming into me it's going to be sort of in this column.

284
00:31:32,000 --> 00:31:48,000
Or I can then do a transformation to say all right well I'm looking at a merge join here therefore I need my data sorted so you would then have a transformation where you could then say okay populate the thing below me to make sure I'm looking at things being sorted or not.

285
00:31:48,000 --> 00:31:54,000
Or you can pass hints down say okay I at this point here maybe I don't I don't want things sorted so don't don't consider it.

286
00:31:54,000 --> 00:31:58,000
So is this memo table generated at the beginning of everything or is it like.

287
00:31:58,000 --> 00:32:01,000
Sorry.

288
00:32:01,000 --> 00:32:08,000
Other let's say maybe combinations of tables that we may want to exclude from the memo table at the very beginning.

289
00:32:08,000 --> 00:32:13,000
The question is are there combinations of tables we may want to exclude from the memo table at the beginning.

290
00:32:13,000 --> 00:32:19,000
Like for example like if I want to sort on like if I have a table with like five columns I really want to sort of one column.

291
00:32:19,000 --> 00:32:30,000
Yeah so Microsoft does a Microsoft will pre populate the memo table in this first stage and then sort of see it with things that it knows it should probably consider first.

292
00:32:30,000 --> 00:32:35,000
And in that way when you do this search you you may prefer things that I already know about.

293
00:32:35,000 --> 00:32:37,000
Yeah.

294
00:32:37,000 --> 00:32:38,000
Yes.

295
00:32:38,000 --> 00:32:49,000
Can I say that we need to do bottom up what you adaptivity I know we're not there only next week's topic but like if you want to adaptivity you definitely do bottom up.

296
00:32:49,000 --> 00:32:53,000
The question is if you want to do that activity you have to do bottles up.

297
00:32:53,000 --> 00:32:57,000
Adaptivity when like while the query is running.

298
00:32:57,000 --> 00:32:58,000
Yeah.

299
00:32:58,000 --> 00:33:00,000
Why why would you have to do it.

300
00:33:00,000 --> 00:33:06,000
Because if you're bottoms up you start with like a sequential scan and then you can.

301
00:33:06,000 --> 00:33:11,000
Or like you want to switch to an index and that's your adaptivity right.

302
00:33:11,000 --> 00:33:21,000
It's doing the bottom up when it be like a more easy control what's happening as opposed to having to go explore on the way from the top.

303
00:33:21,000 --> 00:33:28,000
His statement is if you want to be adaptive we'll be easier to do bottoms up versus tops down.

304
00:33:28,000 --> 00:33:31,000
Is your point like that we're overriding.

305
00:33:31,000 --> 00:33:32,000
Yeah.

306
00:33:32,000 --> 00:33:37,000
So for example we can like at some point we say all like maybe an attempt to do it but.

307
00:33:37,000 --> 00:33:40,000
Let's punk this next week to see how they do it.

308
00:33:40,000 --> 00:33:47,000
The just the way you do at one purchase will see if we're to do adapt the query execution is you just inject a new physical operator.

309
00:33:47,000 --> 00:33:49,000
Oh see that's bad.

310
00:33:49,000 --> 00:33:50,000
We probably wouldn't do that.

311
00:33:50,000 --> 00:33:51,000
Why why's that bad.

312
00:33:51,000 --> 00:33:56,000
Because if you're just if you're continuously adding more cost.

313
00:33:56,000 --> 00:33:59,000
If you're injecting another operator in the middle of the.

314
00:33:59,000 --> 00:34:03,000
Yes you're adding cost to what goes above.

315
00:34:03,000 --> 00:34:06,000
To the total.

316
00:34:06,000 --> 00:34:11,000
You know the physical operator is like a.

317
00:34:11,000 --> 00:34:13,000
I don't I don't I don't want to use the word sentinel.

318
00:34:13,000 --> 00:34:20,000
It's basically a gate that checks if the data coming out what I expected to look like.

319
00:34:20,000 --> 00:34:23,000
And then if not you then make a decision.

320
00:34:23,000 --> 00:34:31,000
It's like a trigger in the query plan has no like has no substantial cost to the query plan because.

321
00:34:31,000 --> 00:34:36,000
Is there is like is my selectivity what I think it's going to be what what I thought it was.

322
00:34:36,000 --> 00:34:40,000
Yeah that's next class that's Monday.

323
00:34:40,000 --> 00:34:48,000
Yes he's jumping ahead but to your point like it depends on the invitation like you could.

324
00:34:48,000 --> 00:34:54,000
Like whether or not you inject the activity pieces why you're doing this like generating the query plan.

325
00:34:54,000 --> 00:35:00,000
Or like you just say I got my physical plan you embed now in the operators your cost estimates.

326
00:35:00,000 --> 00:35:05,000
You know cardinal estimates and then you say okay well here's you know here's my leaf note scan.

327
00:35:05,000 --> 00:35:08,000
I'll now inject that that trigger check.

328
00:35:08,000 --> 00:35:13,000
Right above it and if I see that the data is coming out doesn't match what was in my scam below me.

329
00:35:13,000 --> 00:35:16,000
Then I'll do something else but you don't need to do that potentially for the cost based search.

330
00:35:16,000 --> 00:35:20,000
You can imagine a scenario we say.

331
00:35:20,000 --> 00:35:25,000
You could include in your cost estimates to say.

332
00:35:25,000 --> 00:35:30,000
This is going to be more expensive to do but I'll add this trigger check to make sure that like I don't.

333
00:35:30,000 --> 00:35:34,000
This could be really expensive to be this could be really expensive to do.

334
00:35:34,000 --> 00:35:37,000
If I.

335
00:35:37,000 --> 00:35:42,000
If I get it wrong so me at my trigger check to make sure I then I don't get it wrong.

336
00:35:42,000 --> 00:35:46,000
And then choose the thing that's more expensive so you can like do play games like that.

337
00:35:46,000 --> 00:35:49,000
Let's let's punish that so next week.

338
00:35:49,000 --> 00:35:56,000
Most of the systems that do at activity will be simple push downs of certain operations.

339
00:35:56,000 --> 00:36:03,000
So snow that snowflake will push down an aggregation to remote node above you know above a join or something like that.

340
00:36:03,000 --> 00:36:08,000
If it's see certain things other other triggers be like all right this is waiting this query plans just terrible.

341
00:36:08,000 --> 00:36:15,000
Stop throw everything away and go back to the organizer and then the other one's going to be more clever about like switching plans on the fly.

342
00:36:15,000 --> 00:36:21,000
But nobody does that in practice as far as I know they'll do like simple movements now.

343
00:36:21,000 --> 00:36:25,000
Okay the question.

344
00:36:25,000 --> 00:36:31,000
So there's a bunch of implementations of cascades again cascades is the name of the paper.

345
00:36:31,000 --> 00:36:37,000
As far as I know there was no implementation of it like volcano there as far as I know there was a system and code based called volcano that we were using.

346
00:36:37,000 --> 00:36:44,000
The actual implementations that were out there in the early 90s was this thing called up plus plus out of Wisconsin.

347
00:36:44,000 --> 00:36:51,000
I think jignesh's office mate worked on this when he was Wisconsin because he did his piece you there.

348
00:36:51,000 --> 00:36:57,000
And then Portland State was getting with the Columbia product Columbia system again that was.

349
00:36:57,000 --> 00:37:08,000
Gerst graph was involved with that Gerst graph is peachy visor is also jignesh's peachy visor like this guy David where you've been in a lot early parallel should be the basis of stuff.

350
00:37:08,000 --> 00:37:17,000
Green plum built this thing called orco which we'll cover in a second that actually you know that's sort of like calcite where it's like a standalone server optimizer as a service similar or trying to do for optee.

351
00:37:17,000 --> 00:37:21,000
And then here's a bunch of the other ones that better implemented in actual full systems.

352
00:37:21,000 --> 00:37:25,000
So let's come back to calcades.

353
00:37:25,000 --> 00:37:35,000
Other and let's go actually hold on let me do more cascades before we go to randomize algorithms.

354
00:37:35,000 --> 00:37:40,000
So the Cascades papers like 94.

355
00:37:40,000 --> 00:37:46,000
Microsoft Hires. Gerst graph is starting building this in seagull server in like 95.

356
00:37:46,000 --> 00:38:08,000
The there is a single code base or there is a there was a single code base for the cascades optimizer but my understanding from talking Microsoft is like they forked it many many times and basically all the major database products that Microsoft sells on prime in the cloud like what are synapses will cover later.

357
00:38:08,000 --> 00:38:16,000
Cosmos DB they're all using scope in the learn they're all using some derivation of the of the original cascades optimizer.

358
00:38:16,000 --> 00:38:29,000
Everything's written in C++ there's no DSL and then the to do transformations of the where calls expressions all that is just doing if and else calls and not not rules running in the search engine.

359
00:38:29,000 --> 00:38:44,000
So as we said before the what cast what their cascades going to do is that they're going to have separate stages that are going to find here's the rules I actually want to consider at each stage and the idea is that you start the ones that you know you always want to run.

360
00:38:44,000 --> 00:38:52,000
You always want to run predicate push down you maybe always want to run that like one equals to converge to false and things like that.

361
00:38:52,000 --> 00:39:11,000
And then so you always do these these these transformations at the very beginning and then at some point you get to this point where I want to the cost based search and that you can you can tweak and specify here's the priority for some of these transformations based on what I saw in the earlier stages that I evaluated.

362
00:39:11,000 --> 00:39:22,000
So in the very very beginning you just do basic simplification and normalization so this will be doing logical treat a logical treat transformations so the sub query stuff will talk about a second they had their own rules to do that.

363
00:39:22,000 --> 00:39:30,000
Outer joins the inner joins predicate push down and then empty result pretty like you know select star from table where where false you can throw those things out.

364
00:39:31,000 --> 00:39:47,000
Then you get to what they call pre exploration and this is doing not the actual cost based search but this is applying rules to populate the memo table with things you know you think you want to you want to we want to look at as you go down.

365
00:39:48,000 --> 00:39:57,000
Right because the idea is you don't want to blindly search in the beginning you can see the memo table if like here's the things that are going to be interesting and guide the search towards those.

366
00:39:57,000 --> 00:40:08,000
So trigger plan shortcut select select one right or select star from table limit zero things like that projection normalization how to identify the stats.

367
00:40:08,000 --> 00:40:26,000
I said projection normalization again cleaning up what's in the select output they do an interesting thing where they identify at this point here that they don't have all the stats they would need to do in their cost model to give good estimates they actually stop the query for the next.

368
00:40:27,000 --> 00:40:34,000
So when you're planning go tell the system to go run analyze now collect the data that it's actually missing.

369
00:40:34,000 --> 00:40:45,000
Imagine the very beginning of you just bulk load table you need something and then when that that's available then they can come back and start doing some initial car net estimates and then join collapsing what when possible.

370
00:40:45,000 --> 00:40:54,000
Then they get to the cost based search and this can still as we multi stage where they're going to have the sort of the first group of transformations that they're allowed to consider.

371
00:40:54,000 --> 00:41:06,000
And then over time is the number of transformations that they're they're they're applied because that's how they're keeping track of how long the search is going but then expand the the set of transformations that looking at to do more complicated things.

372
00:41:06,000 --> 00:41:15,000
So in the very beginning it's for dealing things like trivial plans like look ups on a single table where there's primary key index stuff like that.

373
00:41:15,000 --> 00:41:29,000
And if you still don't find the optimal plan then you expand that out to a quick estimation on how to go parallel parallel plan again now you maybe looking at you know joining or joining multiple tables it's more than going looking up single table.

374
00:41:29,000 --> 00:41:39,000
And then if there's still more time in the clock as you go along then you can you can open up to do a a a larger search for the full plan.

375
00:41:39,000 --> 00:41:49,000
And then in the last eight step and then this is still within the cascade optimizer rules for all the different database engines or systems that they're that they're trying to run support through cascades.

376
00:41:49,000 --> 00:41:53,000
They will then have engine specific transformations that they can apply.

377
00:41:53,000 --> 00:42:08,000
So for example I think for synapses like distributed data warehouse based on SQL server will cover it in the semester like you want to do distributed joins or you know broadcast joins and so forth like all those things get applied separately in this lab.

378
00:42:08,000 --> 00:42:23,000
So for this cost based search and utilization and the creation phase I'm not completely sure I understand how you would decide how to operate.

379
00:42:23,000 --> 00:42:30,000
I would use the memory table you probably don't got your search. How do you really don't think you can sit based on your analysis of the query.

380
00:42:30,000 --> 00:42:41,000
So the question is how do you pre populate the member table to see the search ahead of time. So like it would be populate the member table also populating like the groups you sort of generated.

381
00:42:41,000 --> 00:42:45,000
Right say for this multi-expression on this this.

382
00:42:45,000 --> 00:42:52,000
You say joining three tables if I know something in these early stages about like I always want to have this be the outer table in the inter table.

383
00:42:52,000 --> 00:42:56,000
So I'll see that that that's transformation ahead of time.

384
00:42:56,000 --> 00:43:07,000
And then if I had the estimate at this point you know getting past this step here then I could I could put that cost in the memory right away.

385
00:43:07,000 --> 00:43:19,000
So as I said before the timeouts are always be based on the number of transformations not the walk lock time and then what's nice about this as they bring up is that.

386
00:43:19,000 --> 00:43:32,000
No matter what hardware you're running on you could you could still you could always generate the same poor planning given the same database and then if the system gets overloaded because again in this environment it's not a.

387
00:43:32,000 --> 00:43:40,000
You know in traditional sequo server it's like you know a single system where like the optimizer runs in the same box and the same hardware as you know the execution engine.

388
00:43:40,000 --> 00:43:50,000
So the system gets overloaded and the time it takes actually optimize the queries and take longer because the threads are burning burning up running queries or doing whatever and so.

389
00:43:50,000 --> 00:44:08,000
If you based on walk lock if I run the query today and it's the system that overloaded I run the same query tomorrow I may get a different plan if it's overloaded if I'm looking at walk lock time because everything was so much slower so this guarantees that no matter what I always see the I always get the best plan for the same plan.

390
00:44:08,000 --> 00:44:30,000
And then as we said before you would pre-properly the memo table with use useful join orderings again this is just your rules rules to make sure that things land sorry that you you see the search in a way that you find the best the best join earlier and as this is very similar to the Oracle one the order that they appear in the SQL queries the order that you know they'll get seated into the memo table.

391
00:44:31,000 --> 00:44:35,000
Which sometimes makes sense which Oracle did for a long time.

392
00:44:35,000 --> 00:44:43,000
All right, CalSci and Orca I don't want to talk too much about but this I think everyone here is aware of them right these are separate.

393
00:44:43,000 --> 00:44:56,000
These are standalone query optimizers as a service CalSci is way more is used way more than orca it's written in Java so that limits how many people actually want to use this.

394
00:44:57,000 --> 00:45:12,000
But the it's CalSci is actually beats because they I think they have their own connectors to be able to run queries and things like that like it's it's more than just a query optimizer but mostly either for the SQL parser and and then the query optimizer but you basically have to define.

395
00:45:12,000 --> 00:45:24,000
It comes with a bunch of existing rules but if you want to then extend it to whatever system you want to support you can then define through their Java code here's the rules I want to transform things here's how to do call model estimates and so forth.

396
00:45:25,000 --> 00:45:36,000
This originally came out of a urm he and system called lucidb this went under and then they I think it was a start up and they took the pieces out of this and that became calSci.

397
00:45:37,000 --> 00:45:39,000
And it's used for a lot of systems.

398
00:45:40,000 --> 00:46:02,000
Green plum is the equipment to calSci but maybe the less it's less pluggable focus for like with calSci you say you have like here's my snowflake dialect here's my post-crest dialect it's for a bunch of different dialects going in and I think a bunch of different dialects going out for orca is more focus on the pure query optimizations so this is originally written at.

399
00:46:03,000 --> 00:46:09,000
I keep track of I lose track of who bought what green plum got bought by emc emc got bought by.

400
00:46:11,000 --> 00:46:12,000
Dell.

401
00:46:13,000 --> 00:46:16,000
VMware and then VMware then.

402
00:46:17,000 --> 00:46:38,000
Now here's the emc green plum got by emc then VMware bought another company called pivotal and so emc had a database products and then VMware had data as products and they didn't know what to do with them so they merged the two they spun out there's two divisions of these two companies and then they formed pivotal and then pivotal eventually got bought back by VMware.

403
00:46:38,000 --> 00:47:07,000
Jignesh was out there for a while because his startup got bought by them anyway so they were supporting green plum which is still yesterday is why we use it's a fork of post-crest make like distributed and run all that queries and then they had this thing called hawk which there was in the high which is sequel top of a doop then rather building a separate query optimizer for hawk and the query optimizer for green plum they decided let's build a single optimizer of the service and have support both hawk and replum and whatever system you want to.

404
00:47:08,000 --> 00:47:29,000
Hawk up to it hawk is still around and nobody actually uses it green plum still around and so that's the primary user of worker but it's like cal site where again you have this API you have to implement here's here's what my catalog looks like here's what my logical plans and physical plans look like here's the rules I want you to support and they you plug all that in and you can use it we looked at this.

405
00:47:29,000 --> 00:47:36,000
Almost 10 years ago use it and says we were building at the time they had like zero documentation and was just like send a bunch of XML files.

406
00:47:37,000 --> 00:47:46,000
And it would spit things out we said not nothing pursue it but it's still it's actually maintained it but again I don't think it's used anywhere outside of green plum cal sites more common.

407
00:47:46,000 --> 00:47:54,000
So there's a paper that they wrote on orca and they tell about a couple interesting things that are relevant to some of the questions you've had.

408
00:47:55,000 --> 00:48:05,000
This is less of an issue if you're running you're not running less of an issue if you're running on the cloud because you control the machine you control everything you can see everything but at the time for on prem this was this was tricky.

409
00:48:05,000 --> 00:48:15,000
So if someone's running your software on the on their hardware if your optimizer crashes produces a bad query plan how do you actually try to debug that improve things.

410
00:48:16,000 --> 00:48:28,000
So someone sends a support ticket to hey my query went slow you know you don't have it you can give it the secret query but if you don't have the right environment if you don't have the right data and you don't know what choices the optimizer made when it was doing the search it's hard to debug this.

411
00:48:28,000 --> 00:48:51,000
So they had the ability to have the optimizer spit out a complete state of its search for a given query and then send that back to the home base for the developers to then almost like walk through exactly here's all the decisions that the optimizer made to win a generate the query plan they can use that to figure out why it made certain choices over another.

412
00:48:51,000 --> 00:48:58,000
Again if you're running in the cloud you control everything you can figure things out you don't have to do this.

413
00:48:58,000 --> 00:49:20,000
But another interesting thing to do is make sure that the cost model estimates are accurate they would do this thing where they would run a take a SQL query run it through the optimizer and they would keep track of the best plan and the second best plan or the top 10 best plans and they would and then in the background they would run all of them and then see that the relative ordering of what the

414
00:49:20,000 --> 00:49:28,000
aros model thought was the best plans actually matches up with reality when you actually run the queries and they would use that to then to tweak things and improve things yes.

415
00:49:28,000 --> 00:49:30,000
The one would be be pretty.

416
00:49:30,000 --> 00:49:47,000
Yes but for like but Mongo didn't have like had his is MongoDB doesn't have a cut didn't have a cost model it literally just like here they are run on and then whatever to come back right this is trying to see whether your cost model is predicting the right you know physical cost.

417
00:49:47,000 --> 00:49:50,000
They adjusted it just it is off.

418
00:49:50,000 --> 00:50:05,000
So yes at a high level it's the same as Mongo but Mongo is not trying to verify whether the cost model estimates are correct just they're just running it again I actually go check this is still what Mongo does today.

419
00:50:05,000 --> 00:50:06,000
I'll just you'll find out.

420
00:50:06,000 --> 00:50:10,000
It looks like they might be trying to do with some of the actual cost models.

421
00:50:10,000 --> 00:50:11,000
Okay.

422
00:50:11,000 --> 00:50:21,000
When I talk to them before pandemic they didn't have like a they didn't have like any logical physical operators which is like here's like J's on stuff.

423
00:50:21,000 --> 00:50:29,000
Copper GP rewrote or wrote from scratch their query optimizer there's like a renelce they started with something that was based on your

424
00:50:29,000 --> 00:50:32,000
code and then they wrote one that based on cascades.

425
00:50:32,000 --> 00:50:51,000
Everything's written and go and they the more pure to the cascades model then they may be Microsoft was because they would have a DSL that the specified here's the rules and then and the transformations and in some cases where you can't do the transformation entirely through their DSL.

426
00:50:51,000 --> 00:51:11,000
You could escape into go code so here's basically what they're what their rules sort of look like right so you have like the matching that you want the DSL and then other things you may want to apply and then this then gets transpiled into go that they've been run into the system.

427
00:51:11,000 --> 00:51:20,000
Let me run rush through randomized really quick because again this exists postgres does this.

428
00:51:20,000 --> 00:51:26,000
So rather than doing top down or bottom up what do you just if you just did a random walk.

429
00:51:26,000 --> 00:51:37,000
So you got to start with some some query plan and that one you you just you're straight conversion of a of the AST from a logical plan into physical plan and just from you that.

430
00:51:37,000 --> 00:51:52,000
The idea is that you look at a bunch of different possible query plans pick whatever has the best cost keep track of that throw away the ones that are the lowest cost do some kind of randomization or

431
00:51:52,000 --> 00:51:57,000
permutation on it to then change things and then do another round check over again.

432
00:51:57,000 --> 00:52:02,000
So you're just randomly walking to try to see whether you stumble upon the best query plan.

433
00:52:02,000 --> 00:52:13,000
So the there's an early paper in 1987 that does this was simulated kneeling again the ideas that you you just swapping operators and like you know the join ordering of two tables randomly.

434
00:52:13,000 --> 00:52:23,000
If the plan makes it worse then you flip it back flip away to coin and see whether you should keep your sitting that that down that path otherwise you flip it back.

435
00:52:23,000 --> 00:52:30,000
Now there's a bunch of rules you got to write to make sure that you don't do things like if it's a left out or join where you have to care about one being joined for the other.

436
00:52:30,000 --> 00:52:44,000
You don't you know you don't put things in the wrong order so you have to check to see whether you're the random change is actually still a correct plan but then if it doesn't get violated then you can flip things around right nobody does this.

437
00:52:44,000 --> 00:52:51,000
What people what post does do is use a genetic algorithm I think this was introduced in the mid 2000s.

438
00:52:51,000 --> 00:52:58,000
So they're going to use a genetic algorithm where they're going to have these different generations of different query plans and you pick which one is the best.

439
00:52:58,000 --> 00:53:11,000
Throw away the ones that are worse then permute the best ones to try to sort of trying to find the traits or the genes of the query plans that make it a good query plan and then hope that you sort of stumble upon the best one.

440
00:53:11,000 --> 00:53:19,000
So post does this but you only get it when you have you give it a query that has more than 12 tables you try to join in a single query.

441
00:53:19,000 --> 00:53:26,000
There's a flag you specify what that cutoff is but by default you don't get this unless it's a 13 way joiner higher.

442
00:53:26,000 --> 00:53:36,000
So let's take that say we get some random query we have a bunch of random combinations of join orders and and and join algorithms you pick first you cost all them.

443
00:53:36,000 --> 00:53:45,000
Keep track of the one with the lowest cost up in the corner. It's the best one I've ever seen throw away throw away the one that has the worst cost.

444
00:53:45,000 --> 00:53:53,000
And then permute some you know some portion of the query plans of the ones you keep around and then the next generation you you populate those.

445
00:53:53,000 --> 00:54:02,000
Do the same thing check which one has the lowest cost this one does so that's not near our best cost throw away one throw away the the weakest one right the weakest of this generation.

446
00:54:02,000 --> 00:54:06,000
Permute them and then and so forth right yes.

447
00:54:06,000 --> 00:54:10,000
These are the best made of costs why would you realize?

448
00:54:10,000 --> 00:54:24,000
I don't like to like take these random queries and then find each random one and then like this is like this is all within the query optimizer only like only Mongo does that like runs everyone like this is like using the cost on as a special talk right next week yes.

449
00:54:24,000 --> 00:54:28,000
So in this case.

450
00:54:28,000 --> 00:54:31,000
How does it come with the first generation.

451
00:54:31,000 --> 00:54:36,000
Yeah.

452
00:54:36,000 --> 00:54:38,000
Yes.

453
00:54:38,000 --> 00:54:41,000
Right so I know I had to join our RST.

454
00:54:41,000 --> 00:54:45,000
So we did different different join owners different physical operators.

455
00:54:45,000 --> 00:54:51,000
And then this one and just try it out.

456
00:54:51,000 --> 00:54:58,000
So I know in the case of postgres like they make sure that the the random permutations is terministic because you don't want to be.

457
00:54:58,000 --> 00:55:05,000
If you throw the same query at it again you want to end up and you're using running this you would end up with the same permutation right.

458
00:55:05,000 --> 00:55:07,000
Yes.

459
00:55:07,000 --> 00:55:10,000
It seems like a good idea.

460
00:55:10,000 --> 00:55:12,000
Why is it not used?

461
00:55:12,000 --> 00:55:17,000
It's a good idea because if you have 13 join like that's a lot of them.

462
00:55:17,000 --> 00:55:27,000
So going from an random algorithm you know approaching it from a almost exhausted free top down the water bottom of one is just too slow.

463
00:55:27,000 --> 00:55:34,000
And you're unlikely to get the right joint for every single one of them.

464
00:55:34,000 --> 00:55:37,000
So if you go from a random algorithm.

465
00:55:37,000 --> 00:55:40,000
Is that not too much.

466
00:55:40,000 --> 00:55:45,000
From from the first situation it seems like this should work right.

467
00:55:45,000 --> 00:55:49,000
There's an engineering cost to making sure that you don't permit things incorrectly right.

468
00:55:49,000 --> 00:55:51,000
So now you're maintaining code to do that.

469
00:55:51,000 --> 00:55:54,000
And that's again that's pretty much it that else rules.

470
00:55:54,000 --> 00:55:57,000
For very very large tables.

471
00:55:57,000 --> 00:55:59,000
Large number of tables.

472
00:55:59,000 --> 00:56:01,000
You know the.

473
00:56:01,000 --> 00:56:04,000
A greedy search pilot would be better.

474
00:56:04,000 --> 00:56:07,000
Again think of like joining 30 tables 40 tables.

475
00:56:07,000 --> 00:56:08,000
Yeah.

476
00:56:08,000 --> 00:56:09,000
Yeah.

477
00:56:09,000 --> 00:56:15,000
Because you use the software and there's so many cost.

478
00:56:15,000 --> 00:56:17,000
So.

479
00:56:17,000 --> 00:56:18,000
Yeah.

480
00:56:18,000 --> 00:56:23,000
So this is the talk from from the guy that actually works on this and the query happenizer from postgres a few years ago.

481
00:56:23,000 --> 00:56:26,000
And he basically said that the one in postgres least is broken.

482
00:56:26,000 --> 00:56:31,000
It's not truly randomized as much as it should be or they're not I don't think they're.

483
00:56:31,000 --> 00:56:36,000
They're not like incorporating the traits that are that are best from one drainage in the next.

484
00:56:36,000 --> 00:56:39,000
I think that.

485
00:56:39,000 --> 00:56:43,000
I don't say it's a hack but I think that the.

486
00:56:43,000 --> 00:56:45,000
We don't have time to cover the hard one.

487
00:56:45,000 --> 00:56:47,000
The hyper one is the better way to do this if you.

488
00:56:47,000 --> 00:56:51,000
They're they have basically an adaptive algorithm that can figure out like.

489
00:56:51,000 --> 00:56:56,000
If above a certain number joins it's a good isn't your greedy based searches back to better.

490
00:56:56,000 --> 00:56:59,000
We cover this in the reading group we can cover it again.

491
00:56:59,000 --> 00:57:01,000
I'll come up all mentioned that next class.

492
00:57:01,000 --> 00:57:04,000
I just have slides work.

493
00:57:04,000 --> 00:57:06,000
So again nobody actually does this.

494
00:57:06,000 --> 00:57:08,000
I would 20 minutes ago.

495
00:57:08,000 --> 00:57:12,000
Any questions before we switch over to the paper reading.

496
00:57:12,000 --> 00:57:13,000
Yes.

497
00:57:13,000 --> 00:57:23,000
So you have a logical plan.

498
00:57:23,000 --> 00:57:28,000
And then you can you can you can just use the order in the tables they appear in the SQL query.

499
00:57:28,000 --> 00:57:30,000
That's the order that's the initial ordering.

500
00:57:30,000 --> 00:57:33,000
And then you just flipping things around.

501
00:57:33,000 --> 00:57:36,000
So it's not true.

502
00:57:36,000 --> 00:57:39,000
You have a different equipment logical plan.

503
00:57:39,000 --> 00:57:40,000
You.

504
00:57:40,000 --> 00:57:41,000
You.

505
00:57:41,000 --> 00:57:42,000
Stay.

506
00:57:42,000 --> 00:57:44,000
It is like the logical plan has some structure.

507
00:57:44,000 --> 00:57:45,000
Yes.

508
00:57:45,000 --> 00:57:49,000
And again depending on what if it's if it's an interjoined those things are commuted.

509
00:57:49,000 --> 00:57:50,000
You can swap them anywhere.

510
00:57:50,000 --> 00:57:53,000
But like if it's an outer join or one of these core.

511
00:57:53,000 --> 00:57:54,000
You can swap them anywhere.

512
00:57:54,000 --> 00:57:56,000
You can swap them anywhere.

513
00:57:56,000 --> 00:57:58,000
So if it's an outer join or one of these core.

514
00:57:58,000 --> 00:58:01,000
It's like that you have to be careful about it.

515
00:58:01,000 --> 00:58:04,000
So you're going to make sure you don't violate that.

516
00:58:04,000 --> 00:58:12,000
But like if it's if things are commutative then you can take you know the logical plan is to join you know join our drawn S.

517
00:58:12,000 --> 00:58:19,000
You're like you'll have that tree structure and you just commute that.

518
00:58:19,000 --> 00:58:21,000
The rate of war.

519
00:58:21,000 --> 00:58:24,000
You're like one you treat in one thing to.

520
00:58:24,000 --> 00:58:29,000
No the very beginning it it is like you have to generate this this first generation.

521
00:58:29,000 --> 00:58:30,000
Right.

522
00:58:30,000 --> 00:58:35,000
But like once you like to look like the root and then all these changes like one change.

523
00:58:35,000 --> 00:58:40,000
So what do you mean all the like all these changes are like just changing one part of the tree.

524
00:58:40,000 --> 00:58:41,000
Yeah.

525
00:58:41,000 --> 00:58:42,000
You're changing the entire thing.

526
00:58:42,000 --> 00:58:43,000
Correct.

527
00:58:43,000 --> 00:58:44,000
Yes.

528
00:58:44,000 --> 00:58:45,000
Because the idea is that like.

529
00:58:45,000 --> 00:58:48,000
Like in this case here I somehow figured out the B.

530
00:58:48,000 --> 00:58:51,000
This hash join on on the hash join with S.

531
00:58:51,000 --> 00:58:55,000
Followed by R or you know S as the outer R is the inner.

532
00:58:55,000 --> 00:58:58,000
You don't know whether that's the why this you know made this one the best.

533
00:58:58,000 --> 00:59:02,000
So you want to carry that over to the next one.

534
00:59:02,000 --> 00:59:06,000
In this case up here so that like and then you permit maybe other things about it.

535
00:59:06,000 --> 00:59:14,000
So that if it truly is the reason why your costs are lower then that trade will get carried over over time.

536
00:59:14,000 --> 00:59:19,000
Okay.

537
00:59:19,000 --> 00:59:27,000
So let's see how far we can get through.

538
00:59:27,000 --> 00:59:28,000
Subquires.

539
00:59:28,000 --> 00:59:29,000
Okay.

540
00:59:29,000 --> 00:59:31,000
Again this means surprise anyone.

541
00:59:31,000 --> 00:59:33,000
Subquires are important in SQL.

542
00:59:33,000 --> 00:59:37,000
It's wild you can put them anywhere in your SQL query.

543
00:59:37,000 --> 00:59:42,000
I was unable to I tried to last time I wasn't able to get it into a necessary into my order by clause.

544
00:59:42,000 --> 00:59:43,000
No.

545
00:59:43,000 --> 00:59:46,000
Post guess what that you put in the order by clause but I don't think it actually does anything.

546
00:59:46,000 --> 00:59:51,000
I was trying to like have return a string that the name of the table why I want to look up.

547
00:59:51,000 --> 00:59:55,000
And it runs it but I think it just getting converted to true.

548
00:59:55,000 --> 00:59:58,000
So you can do you can put a order by clause in the select statement.

549
00:59:58,000 --> 01:00:01,000
Or sorry in the order by you can put a select statement inside the order by clause.

550
01:00:01,000 --> 01:00:03,000
In some cases but I don't think it actually works.

551
01:00:03,000 --> 01:00:04,000
Right.

552
01:00:04,000 --> 01:00:08,000
And the way to think of a nested query or subquery is that it's basically like a function that like.

553
01:00:08,000 --> 01:00:13,000
I had some outer query I'm going to vote into it and maybe pass in some information or not.

554
01:00:13,000 --> 01:00:16,000
About what the outer query is the two I'm looking at in the outer query.

555
01:00:16,000 --> 01:00:21,000
And then I'm going to produce some some some result that I can then use for.

556
01:00:21,000 --> 01:00:22,000
For my other query.

557
01:00:22,000 --> 01:00:28,000
And this is important because this allows people to write more expensive things in a single SQL query rather than have.

558
01:00:28,000 --> 01:00:31,000
To run multiple queries, staging and temp tables or whatever.

559
01:00:31,000 --> 01:00:36,000
And then put you know put it all together at the end.

560
01:00:36,000 --> 01:00:40,000
So there's this key distinction that's going to matter a lot between uncorrelated and correlated subqueries.

561
01:00:40,000 --> 01:00:43,000
And the TLDR is that uncorrelated ones are easy.

562
01:00:43,000 --> 01:00:45,000
Most data systems will handle those.

563
01:00:45,000 --> 01:00:49,000
It's the correlated ones that are going to cause problems.

564
01:00:49,000 --> 01:00:55,000
The uncorrelated ones basically means that the whatever my subquery is doesn't depend on anything on the outer query.

565
01:00:55,000 --> 01:01:01,000
You know I'm not using any information any attributes any tuple data from the outer query to run that inner query.

566
01:01:01,000 --> 01:01:06,000
So I only need to logically execute this inner query once.

567
01:01:06,000 --> 01:01:09,000
Whether or not the data system is smart enough to do that depends on the implementation.

568
01:01:09,000 --> 01:01:13,000
But the ones we can we'll look at we can talk about.

569
01:01:13,000 --> 01:01:14,000
We'll handle this.

570
01:01:14,000 --> 01:01:26,000
So in this example here I want to get the all the students that have the or get finding the student the name of the student that has the highest grade in some class or across all students.

571
01:01:26,000 --> 01:01:34,000
So this inner query on the select max score and students doesn't rely on anything from the outer outer query on students.

572
01:01:34,000 --> 01:01:43,000
So I can run this once materialize result and be able to substitute that in for every tuple I'm looking at from the outer query.

573
01:01:43,000 --> 01:01:50,000
Again I think for no systems that they should be able to handle all all cases for this.

574
01:01:50,000 --> 01:01:51,000
Actually that's not true.

575
01:01:51,000 --> 01:01:57,000
There are some cases where they can't they can't hit on the core of the separate the basic idea which you're trying to do is basically come.

576
01:01:57,000 --> 01:02:01,000
You want to move this up and get this to be a join up above.

577
01:02:01,000 --> 01:02:04,000
Yes.

578
01:02:04,000 --> 01:02:07,000
What one?

579
01:02:07,000 --> 01:02:12,000
Yeah there's read yeah does not thank you yes.

580
01:02:12,000 --> 01:02:22,000
So what query is the ones we care about again this is where the inner query that's the sub query is going to reference something in the outer query here.

581
01:02:22,000 --> 01:02:33,000
So now if we do modify a query to say give me all the students that have the highest grade in their their major across all the students in the same major.

582
01:02:33,000 --> 01:02:41,000
Then the basic idea is that for this I'm going to have a for loop that's going to be the going over every single tuple in my outer query.

583
01:02:41,000 --> 01:02:51,000
And that for each of those tuples I need to do a complete sequential scan or scan on the on the on the inner table the inner sub queries results.

584
01:02:51,000 --> 01:02:59,000
Right. So let's say if I start my outer outer query the first one I will look at is with the the first table which is a major computer science.

585
01:02:59,000 --> 01:03:12,000
So then now when I invoke the inner query I'm going to scan through and then now do that join where I take the outer queries major match it against the inner queries major and then and then get the max score.

586
01:03:12,000 --> 01:03:15,000
So I'm going to run this entirely and produce a max score of 90.

587
01:03:15,000 --> 01:03:19,000
And I'm going to pop it is as my output result here.

588
01:03:19,000 --> 01:03:29,000
Next for the next one again for risen also comp sign do the same thing start from beginning scan began get max score 90 that doesn't match what the risk score is.

589
01:03:29,000 --> 01:03:38,000
Yeah, the risk score so therefore that does not pursue output for ODB he's the only one major in streets so again start beginning scan through it matches.

590
01:03:38,000 --> 01:03:53,000
So what I just showed here is like the worst thing you could possibly do because for every single tuple in the in the outer at our table I'm re running that that join query over again for an inner table.

591
01:03:53,000 --> 01:03:54,000
Yes.

592
01:03:54,000 --> 01:04:01,000
If it's going to go out how do you want to wear a call or.

593
01:04:01,000 --> 01:04:06,000
Yeah, this question is like can you have this inner query in a wear clause it given anywhere.

594
01:04:06,000 --> 01:04:10,000
Right, I can have it as a from calls I could have it the projection output.

595
01:04:10,000 --> 01:04:20,000
Correct, yes, I can put like again you can have it in limits you can have it in you can mess queries and limits.

596
01:04:20,000 --> 01:04:27,000
I don't think it refers to the outer query I don't think you can correlate a separate limit causes they having can do it like anywhere.

597
01:04:27,000 --> 01:04:35,000
You don't know how to query it on from either side in from how could it be lateral joint.

598
01:04:35,000 --> 01:04:39,000
Right, it's basically the same thing.

599
01:04:39,000 --> 01:05:01,000
So the paper you guys read will get see how they do the goal is begin basically want to lift up this this inner query to be at the same level of the outer query because then we can then convert it into a join and we know how to run those officially know how to optimize those right and we know how to give you what we talked about last class is we know how to pick the right best join order for these things as well.

600
01:05:01,000 --> 01:05:19,000
So for this query here ideally we want to move the we want to move the inner query to be now be in the join calls and the from calls against the outer query here but now we got to be mindful that yes we need the score of the students.

601
01:05:19,000 --> 01:05:32,000
That should not be us to give it a bad sorry but now we want to group by major because that's how we're going to do our join down here because we want to see is for my fun what's the best score for my outer tuple.

602
01:05:32,000 --> 01:05:37,000
I can give a major and is it is it my score right.

603
01:05:37,000 --> 01:06:05,000
So for this example yeah we can look at this we can say okay we could write something recently easily to do this kind of manipulation you know they're saying since these next queries can appear anywhere and in this case here it's it's a straight equality predicate you can imagine like equals any exists less than greater than into joins semi joint like you can have all different combinations and it's very difficult to do to do right the rules to capture everything.

604
01:06:05,000 --> 01:06:10,000
But this is what basic basically people have been doing for the last 30 years.

605
01:06:10,000 --> 01:06:25,000
So in the paper when they specify join the question is in the paper they don't specify join if they're a quid line modern single standards as you join like yeah you could just have this be.

606
01:06:25,000 --> 01:06:45,000
The comma and then the word calls from from the that's that normalization step that I talked about in in like SQL server like they'll they won't they'll figure out what's in the word calls and move you know what's in the word calls that should be part of the joint and move that to be part of the joint calls.

607
01:06:45,000 --> 01:07:04,000
So again the last I think the first paper on nested queries is like 83 84 I think the SQL standard ended it I think it's SQL 99 but since then people begin writing much of rules and handle all possible different combinations that they're aware of.

608
01:07:04,000 --> 01:07:29,000
So this is from the SQL server paper from 2001 that roughly defines the rules that they apply not going to go through all them but this is how they decide what to win when they can decore they nested queries in SQL server look at the documentation they basically have up to 22 rules it's bunch of this like if it does this and this and this and this right this is defines how they they're going to do.

609
01:07:29,000 --> 01:07:58,000
So again all these are going to be based on heuristics and rules so on the plus side is these are somewhat easily to somewhat easy to write if you know the pattern that you're looking for and because you can have complete control of like when things get moved and how they get moved but I was saying like it all possible edge cases that you got to deal with all possible ware clauses and any kind of combinations of of these nested queries lateral joins is another thing that's complicated.

610
01:07:58,000 --> 01:08:03,000
Then writing these rules by hand is simply to an effective.

611
01:08:03,000 --> 01:08:14,000
So this is where the German show up in this paper in 2015 so there's actually two papers in the reading list this is the first one is a fault one in 2017 that covers more about how.

612
01:08:14,000 --> 01:08:27,000
How they handle joins or other things but I just want to focus on this one because it's it's an easy read ish on how to do this correlate some queries but they they actually provide the first general purpose method to do.

613
01:08:27,000 --> 01:08:56,000
So this method to be able to take all correlated sub queries and rewrite them into direct to regular queries without the nesting and the goal is basically when convert all of these these sub queries into joins regular like inner joins out of whatever whatever whatever it's supposed to be because again we know how to optimize those and the best case scenario we can go from something really stupid like running the that nested query for every.

614
01:08:56,000 --> 01:09:07,000
That nested query for every single two point the outer out of query which you know could be and squared costs and a nest loop join we can now convert this into you know look at oh and has joined look up.

615
01:09:07,000 --> 01:09:21,000
So let me quickly go through one example again we can cover more the hyper stuff next class so here's that same query that we have before we want to find all the students and their major if they have the.

616
01:09:21,000 --> 01:09:50,000
So the key idea that they're going to they're going to have in this paper they're going to use this this logical concept of logical object according to pen and join and it's basically a cross product join or cross join except that it's a there's a demarcation or that it's a marker to say this thing is specifically being used because it's I'm doing a correlated sub query and the whole goal of what they're the process thing we're going to do is just do it.

617
01:09:50,000 --> 01:10:00,000
So the process thing we're going to do is try to get rid of that dependent join convert it right to to regga joins and then in optimize it like it like it normally would.

618
01:10:00,000 --> 01:10:13,000
So in this case here just the outer query itself is a projection with a filter and a scan but inside this filter clause right we have this we have this this you know the sub query inside of this.

619
01:10:13,000 --> 01:10:25,000
So if we take this and expand this we can convert it into a dependent join because now we have on the the right hand side is the.

620
01:10:25,000 --> 01:10:38,000
The left hand side maybe the right the left hand side is the look up on on the outer table and then now on the other side the right hand side this is actually the inner query and it's going to be referencing.

621
01:10:38,000 --> 01:10:46,000
So in its filter or for its where clause predicate be referencing the thing on the other side right and that that's what makes the correlative.

622
01:10:46,000 --> 01:11:02,000
So as I said this dependent join isn't actually a new physical operator it's not something we actually implement the system it's just an extension to relational algebra in our query plan that line allows to reason about we know we're doing certain transformations in our query out miles or because we it's a correlated sub query.

623
01:11:02,000 --> 01:11:14,000
Again you could just convert this to like a cross join and add a little flag and say hey by the way I'm using this for you know keep track of dependencies but keep it clean they they define as a separate operator right.

624
01:11:14,000 --> 01:11:23,000
So again all you're doing is that for every single tuple in the in the left hand side you're going to read around whatever it is on the right hand side pop up populate the output and so forth right.

625
01:11:23,000 --> 01:11:39,000
So again it's just like a cross bottom. So what they're going to want to try to do now is try to push down the dependent join to the right hand side of the query plan where we have our inner query and you eventually want to try to get it to the bottom and then convert it into a regular join.

626
01:11:39,000 --> 01:11:50,000
And then how you actually do this is going to depend on the semantics of the query and you know of the inner query determine how you actually do these transformations.

627
01:11:50,000 --> 01:12:09,000
So in this case here I have again the scan on the left hand side and the the the inner query on the right hand side so I can move the dependent join down one and then now just you a join a regular join on the outer you know the outer query and then whatever's coming up to me from the right hand side here.

628
01:12:09,000 --> 01:12:24,000
So for this particular query to make this work I have to introduce an additional scan that's basically going to do duplicate elimination think of like a select clause where the all the the projection apple list is also my group by.

629
01:12:24,000 --> 01:12:33,000
So there's guarantees that I'm always going to have distinct set of attributes or set of values coming up for all the attributes for given tuple right.

630
01:12:33,000 --> 01:12:58,000
So now with this this this this you're eliminating all the duplicates on this side when I do now a dependent join on this side then this guarantees that I'm only spitting up now the the output that I need to do the join without duplicates as if I was running the the right hand sign query once per tuple on the on the outer table.

631
01:12:58,000 --> 01:13:09,000
But again I'm doing a max on the student score looking at by major so all I really want is for every major what's the max score.

632
01:13:09,000 --> 01:13:24,000
So to avoid duplicates of like okay because there's there's two people in computer science and I don't want to have two entries one with the same values of computer science and the score the duplicate elimination scan when I do my join will remove all that for me.

633
01:13:24,000 --> 01:13:34,000
Again this is just a logical I believe keeping track of what the dependencies are from the right hand side left hand side as I'm going down.

634
01:13:34,000 --> 01:13:52,000
So key I want to keep pushing down the pen and join so at the next stage right I can get rid of the back here I can I can I want to get up below the aggregation so I'm going to move my duplicate and the mission scan down with me then put the aggregation above me right and again at this point nothing has changed.

635
01:13:52,000 --> 01:14:13,000
You think sort of the what the the output is going to be like everything's still the same because what am I doing here I'm getting all the unique students by by score major and then I want to join it with the with the scan on the student table here so this is going to produce you know for every single student every single major here's the highest score.

636
01:14:13,000 --> 01:14:24,000
And then when I feed that out of my dependent join thinking that just as a cross product when I now do my group I hear on the major I'm going to get for one major I'm going to get what the max score for yes.

637
01:14:24,000 --> 01:14:53,000
So you have to identify to because you have lots to say okay I know that I want to get the I only want to get the single score per major right so the equipment thing you would do here by by putting the aggregation above well I need to make sure that I only get one student per major or one score per major and then you add the group item that happened.

638
01:14:53,000 --> 01:15:03,000
So there's a lot to be a reason about what the what the intercredit actually wants when you do the joint above to make sure you don't have duplicates.

639
01:15:03,000 --> 01:15:23,000
You know for it's a question is the way to standard is that it's in the visual paper and then it it varies based on what the ware clauses right this is like something equals something if it's less than a greater than knows complicates things to right this makes everything harder.

640
01:15:23,000 --> 01:15:28,000
We're well over time so you have to go please go.

641
01:15:28,000 --> 01:15:34,000
We knew we did last time we can pick up in this last class and beginning of next class.

642
01:15:34,000 --> 01:15:52,000
So we push the aggregation above again we want to go further we want to get this dependent join now below this filter well that's easy to do right because there isn't actually any change to we need to make because it whether or not we put the filter before after the join that's the same thing if it was a regular query right.

643
01:15:52,000 --> 01:16:02,000
Like you can do a join stupidly without a where clause and it's just a cartesian product and then above that then you do the filter same thing here right.

644
01:16:02,000 --> 01:16:21,000
So in this case here it can it's just a Cartesian product for every unique student may or every unique major I'm going to join against every unique major and a score I'm going to join against all the students table it's going to produce all the output I want you know all possible combinations and then this is going to filter out that I only get where the student from this side is.

645
01:16:21,000 --> 01:16:37,000
So now this point here my dependent join is as far as it can go I can't go below these guys is making sense because these are the leaf notes I'm scanning the tables right so now I want to actually do further

646
01:16:37,000 --> 01:17:00,000
optimizations to actually put into a physical form I started put into a form that I know how to optimize like any other query so again these are all still at the logical level we're not doing any none these are physical operators right so I can convert this dependent join into what it really is which is just a cross join a Cartesian product right so there's no where clause it's just just you know everything combined with everything on the other side.

647
01:17:00,000 --> 01:17:29,000
But then now I have as I was saying before I have a filter above a join that's just an inner join so now I can collapse these two to a single join operator and just move these guys up right I can go either even further and recognize that well all you know this is basically just for every single major for every single student get their major that's all this is doing here right because my group I was going to handle the removing remove the duplications.

648
01:17:29,000 --> 01:17:58,000
So I can then convert this now into just a scan on the table as by itself but now to make sure that I I had to rewrite my my join that I had up here because I was referencing that the duplication scan on the major I need to get rid of that so I can also have a filter above that too so I can just combine that now into a single join where it's the major on this side join the major on that side and the score on this side equals the max score.

649
01:17:58,000 --> 01:18:08,000
That I produce as my output here because I have the group I'm the major clause I'm guaranteeing that for every single major I have I have one score.

650
01:18:09,000 --> 01:18:22,000
So this is the easy case right and again there's some details on I'm closing over for example he was asking how do I know that I need to push up the group by again it depends on the examination of the where clause in the expression trees.

651
01:18:22,000 --> 01:18:34,000
So this can then be extended for all possible combinations of of of correlated queries and you can convert everything into a to joins.

652
01:18:35,000 --> 01:18:43,000
Okay well over time as I was saying only hyper umbra and ductyb can do this fully.

653
01:18:44,000 --> 01:18:48,000
Databricks can do some of it I don't know about other systems I haven't seen whether they make these things as well.

654
01:18:49,000 --> 01:18:55,000
So like this is like if you're an ability to just say this is this is the way to do it is paper lays out exactly how to do it.

655
01:18:55,000 --> 01:19:09,000
Again we will cover the other small cases next class we'll cover also then how they're handing handling joint picking joint orders but the other day thing we already alluded to today is like okay all the things I've talked about is like hey you have a cost that's going to be whether one plan is better than other.

656
01:19:10,000 --> 01:19:20,000
What if your cost cost estimates are wrong or you just don't know because you haven't even looked at the data before in a lake house environment some new file should have an s3 you don't know what's in them what do you do.

657
01:19:20,000 --> 01:19:31,000
That's what we'll cover on next class right how to do a doctor career organization and in the TLDR is going to be I got to join something I got to join some query plan say I got to run something.

658
01:19:32,000 --> 01:19:44,000
But I can put in hooks to keep track of whether my estimates are right or wrong and we'll see how to get feedback from when we scan the table feed that that can across models and see whether that helped or not okay.

659
01:19:44,000 --> 01:19:47,000
I got to join the weekend see you.

