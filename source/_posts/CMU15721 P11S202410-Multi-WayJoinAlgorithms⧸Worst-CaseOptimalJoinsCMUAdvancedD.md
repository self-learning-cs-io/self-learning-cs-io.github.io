---
title: CMU15721 P11S202410 Multi WayJoinAlgorithms⧸Worst CaseOptimalJoinsCMUAdvancedD
---

1
00:00:00,000 --> 00:00:06,000
Carnegie Mellon University's Advanced Database Systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:09,000 --> 00:00:11,000
I don't want to know what kind of club it is.

4
00:00:11,000 --> 00:00:13,000
I don't want to know what kind of club it is.

5
00:00:13,000 --> 00:00:15,000
The game is about welcoming a lot of public excellence.

6
00:00:15,000 --> 00:00:19,000
And this would be a lot different than kind of joined you see in the intro class

7
00:00:19,000 --> 00:00:23,000
and even in the last lecture we just had about parallel hashelons.

8
00:00:23,000 --> 00:00:27,000
And we'll sort of see, sort of motivate why we want to do this.

9
00:00:27,000 --> 00:00:30,000
And then we'll just discuss the sort of, one of the first invitations of it

10
00:00:30,000 --> 00:00:33,000
and then we'll see how the Germans are going to prove on it.

11
00:00:33,000 --> 00:00:36,000
And then I'll finish up with something from DuckDB that basically says

12
00:00:36,000 --> 00:00:42,000
you may not actually need any of this if you build other things correctly.

13
00:00:42,000 --> 00:00:46,000
All right, so last class we spent the entire lecture on how to do hashelons

14
00:00:46,000 --> 00:00:47,000
as fast as possible.

15
00:00:47,000 --> 00:00:50,000
Right, and the big focus was on how to use run this in parallel.

16
00:00:50,000 --> 00:00:54,000
Again, not across multiple nodes, but across multiple workers running on the same box.

17
00:00:55,000 --> 00:01:00,000
And it was really about trying to minimize the number of cycles per instruction,

18
00:01:00,000 --> 00:01:03,000
minimize the remote memory access to the different numer regions,

19
00:01:03,000 --> 00:01:05,000
just trying to run fast as possible.

20
00:01:05,000 --> 00:01:10,000
And then although there were some examples and some results that showed that the partition hashed

21
00:01:10,000 --> 00:01:13,000
going was going to be superior to the other approaches,

22
00:01:13,000 --> 00:01:18,000
getting the engineering right for different hardware, different workloads, different data sets

23
00:01:18,000 --> 00:01:19,000
is really challenging.

24
00:01:19,000 --> 00:01:23,000
So oftentimes, you should just do a non partition hashed one.

25
00:01:23,000 --> 00:01:29,000
And that's going to be good enough to get you, maybe 95%, 90% of the benefit

26
00:01:29,000 --> 00:01:32,000
but again, getting into low-level details and more former things.

27
00:01:32,000 --> 00:01:39,000
So again, for this, for the last lecture, this was doing what it's called a binary join.

28
00:01:39,000 --> 00:01:42,000
Right, or joining two tables.

29
00:01:42,000 --> 00:01:49,000
Right, and as you can imagine, these things are super common in pretty much every database system,

30
00:01:50,000 --> 00:01:55,000
and there's been years and years and years, decades of research and trying to make hash joins go as fast as possible.

31
00:01:55,000 --> 00:02:00,000
As I said, I had a PHA student spend a little time trying to make the hash join go faster,

32
00:02:00,000 --> 00:02:04,000
and we were literally going and trying to count from going from 12 cycles per two-bole to 11 cycles per two-bole.

33
00:02:04,000 --> 00:02:08,000
You're really getting down to the bone, the bare metal performance,

34
00:02:08,000 --> 00:02:10,000
so there's not much else you can optimize.

35
00:02:10,000 --> 00:02:16,000
So the binary joins are going to be the preferred approach, the better approach,

36
00:02:17,000 --> 00:02:22,000
when we know that the output of the join operator is going to be smaller than its inputs.

37
00:02:23,000 --> 00:02:28,000
Right, so in this case here, we're joining RS and T, we're taking, we're joining S and T,

38
00:02:28,000 --> 00:02:31,000
we do a join, and then we're going to produce 10 tables.

39
00:02:31,000 --> 00:02:35,000
Right, these are imaginary numbers. They're small, but think of like orders and magnitude bigger.

40
00:02:35,000 --> 00:02:37,000
Right, the output is going to be much smaller.

41
00:02:38,000 --> 00:02:44,000
The proms are going to be, though, and what we're going to try to adjust today is when the output of the join operator

42
00:02:45,000 --> 00:02:47,000
is going to be larger than the inputs.

43
00:02:47,000 --> 00:02:51,000
So, say for whatever reason, based on the data and what we're trying to join on,

44
00:02:51,000 --> 00:02:54,000
this thing, the operator is not going to produce 1,000 tables.

45
00:02:55,000 --> 00:03:00,000
Right, and this is the problem we want, this is the worst case scenario for database,

46
00:03:00,000 --> 00:03:02,000
because now we have to materialize that.

47
00:03:02,000 --> 00:03:07,000
And even though it's producing 1,000 tables here, when we do the join on this output and R,

48
00:03:07,000 --> 00:03:08,000
now we're going to produce 10 tables.

49
00:03:09,000 --> 00:03:15,000
So, we had a bunch of data that we've materialized or synthesized from the join operator that we now have to deal with,

50
00:03:15,000 --> 00:03:19,000
even though we're still ending up throwing a ton of it away.

51
00:03:21,000 --> 00:03:25,000
So, another way to think about it, or look at it, is like this, we actually start using real tables.

52
00:03:25,000 --> 00:03:30,000
Again, same query, trying to do a cycle join between R, R, S and T.

53
00:03:31,000 --> 00:03:35,000
Right, so, the proms are going to be that no matter what order that I choose to join my tables,

54
00:03:36,000 --> 00:03:40,000
or if I choose to join R and S first, then join T.

55
00:03:40,000 --> 00:03:43,000
This intermediate result is going to get ballooned up and get bigger.

56
00:03:43,000 --> 00:03:49,000
Same thing, if I try to join R and T, and then join S, ballooned up, same thing,

57
00:03:49,000 --> 00:03:53,000
do S and T, balloons up in the M.

58
00:03:53,000 --> 00:03:56,000
So, again, the reason why this is going to be a problem for us is,

59
00:03:56,000 --> 00:03:59,000
I've already said, it's going to be wasted storage, because now again,

60
00:03:59,000 --> 00:04:04,000
we have to materialize these results somewhere in memory, and then if it gets too big,

61
00:04:04,000 --> 00:04:09,000
we have to end up having to spill a disk, and that will be typically the local disk on the worker node.

62
00:04:09,000 --> 00:04:15,000
Worst case scenario, we spill to S3 of the object store, a team of the slaughter.

63
00:04:15,000 --> 00:04:18,000
Then, of course, obviously, it's going to be a bunch of wasted computation,

64
00:04:18,000 --> 00:04:23,000
because, you know, we're materializing tuples, we're passing them along,

65
00:04:23,000 --> 00:04:28,000
and then we're going to do the next join on the last table,

66
00:04:28,000 --> 00:04:31,000
it's not going to match, we're going to throw it away.

67
00:04:32,000 --> 00:04:38,000
So, ideally, we want to be able to identify, if we can, which of these tuples we'd actually don't need,

68
00:04:38,000 --> 00:04:41,000
when we're going to join with the third table, or any other additional tables,

69
00:04:41,000 --> 00:04:46,000
to avoid having to, you know, again, materialize it.

70
00:04:46,000 --> 00:04:49,000
So, that's the high level approach that we're going to promentern to solve today,

71
00:04:49,000 --> 00:04:54,000
is how to avoid this blow up at the intermediate results.

72
00:04:54,000 --> 00:04:59,000
And what we'll see in the multi-way join, the way it's going to work is that,

73
00:04:59,000 --> 00:05:03,000
rather than sort of thinking the join operator in terms of like,

74
00:05:03,000 --> 00:05:06,000
I got this table and this table, let me join it together,

75
00:05:06,000 --> 00:05:08,000
you're going to think of terms of attributes.

76
00:05:08,000 --> 00:05:11,000
And now you don't care where the attributes are coming from,

77
00:05:11,000 --> 00:05:14,000
whether it's table one, table two, table three, or so forth,

78
00:05:14,000 --> 00:05:17,000
and now you want to do comparison on these attributes,

79
00:05:17,000 --> 00:05:21,000
and then have that be, which you synthesize, as part of the output.

80
00:05:21,000 --> 00:05:26,000
So, that's the big picture of what the multi-way join is going to try to do for us.

81
00:05:26,000 --> 00:05:29,000
First sort of background, what worst case optimal joins are.

82
00:05:29,000 --> 00:05:32,000
Again, the lecture I'm calling multi-way joins, because that's the idea,

83
00:05:32,000 --> 00:05:35,000
like we're joining more than just two tables.

84
00:05:35,000 --> 00:05:39,000
Right? So, the class of outcomes are going to be multi-way joins,

85
00:05:39,000 --> 00:05:44,000
and then these category of the implementations that we'll see will be called worst case optimal joins.

86
00:05:44,000 --> 00:05:47,000
But typically, the terms are used interchangeably.

87
00:05:47,000 --> 00:05:51,000
But the multi-way joins, the idea of multi-way joins existed in the literature,

88
00:05:51,000 --> 00:05:54,000
I think, back of the 80s, but the worst case optimal implementations

89
00:05:54,000 --> 00:05:57,000
that came along in the late 2000s.

90
00:05:57,000 --> 00:06:00,000
All right, so first first, again, in the highlight of the idea, what worst case optimal joins are,

91
00:06:00,000 --> 00:06:03,000
then we'll look at the one of the earliest implementations of leapfrog join,

92
00:06:03,000 --> 00:06:06,000
leapfrog tri-join, and then we'll see the Germans hash tri-join,

93
00:06:06,000 --> 00:06:10,000
which is sort of an optimization of the data structures they're going to use

94
00:06:10,000 --> 00:06:14,000
over the leapfrog join, but at high level, the method's still going to be the same.

95
00:06:14,000 --> 00:06:19,000
Again, we'll finish up some quick optimizations from DuckDB,

96
00:06:19,000 --> 00:06:23,000
and then I want to briefly talk about how to do system profiling in a data system,

97
00:06:23,000 --> 00:06:28,000
and then talk a little bit about the harbor counter stuff that he had a question about a few weeks ago.

98
00:06:28,000 --> 00:06:38,000
All right, so again, the idea of a worst case optimal join is that we want to join more,

99
00:06:38,000 --> 00:06:41,000
or three or more tables at the same time.

100
00:06:41,000 --> 00:06:43,000
And again, the way this is going to work is that,

101
00:06:43,000 --> 00:06:47,000
rather than taking the entire tuple from one table and the entire tuple from another table,

102
00:06:47,000 --> 00:06:50,000
and then comparing all the attributes in our join key,

103
00:06:50,000 --> 00:06:54,000
we're instead going to grab a single attribute for our join key,

104
00:06:54,000 --> 00:06:56,000
it could be multiple columns.

105
00:06:56,000 --> 00:06:58,000
From all the tables we want to join together,

106
00:06:58,000 --> 00:07:01,000
mash them up, figure out whether we have any matches,

107
00:07:01,000 --> 00:07:06,000
and only proceed with doing additional comparisons for a given attribute,

108
00:07:06,000 --> 00:07:11,000
for given tuple, if we know that the subset of the values on our join key

109
00:07:11,000 --> 00:07:12,000
are actually matching already.

110
00:07:12,000 --> 00:07:17,000
Again, we want to avoid waste of work of doing a bunch of comparisons for things that are going to get thrown away.

111
00:07:18,000 --> 00:07:21,000
So as soon as we can identify that there isn't going to be a match on a given tuple,

112
00:07:21,000 --> 00:07:26,000
as we're doing our join, we can throw that way as soon as possible.

113
00:07:26,000 --> 00:07:29,000
So as I said, the idea of a multi-way join has existed for a while,

114
00:07:29,000 --> 00:07:33,000
but in terms of proving that you can have a worst case optimal join,

115
00:07:33,000 --> 00:07:35,000
and on the final that is in a second,

116
00:07:35,000 --> 00:07:38,000
came from these other Germans in 2008,

117
00:07:38,000 --> 00:07:43,000
which I think was, for this paper, I think actually was Thomas Nomean's PC advisor,

118
00:07:43,000 --> 00:07:44,000
but I might be wrong.

119
00:07:45,000 --> 00:07:49,000
And then the first two implementations of this will be empty-headed at a Stanford,

120
00:07:49,000 --> 00:07:52,000
and then a commercial system called Logic Blocks,

121
00:07:52,000 --> 00:07:58,000
which is like, it's a answering database system that you use data log instead of SQL.

122
00:07:58,000 --> 00:08:01,000
Data log is another declared query language,

123
00:08:01,000 --> 00:08:05,000
but very few people actually use it other than Logic Blocks.

124
00:08:05,000 --> 00:08:11,000
So again, the interesting about these worst case optimal joins are,

125
00:08:12,000 --> 00:08:20,000
rather than thinking about the computational complexity in terms of the size of my input tuples,

126
00:08:20,000 --> 00:08:29,000
the performance will be bounded by the output and the number of attributes that are actually compared against.

127
00:08:29,000 --> 00:08:35,000
And this is hard to actually have an exact estimation without selectivity information about the attributes,

128
00:08:35,000 --> 00:08:38,000
to say, here's how much longer things are going to take,

129
00:08:39,000 --> 00:08:43,000
whereas like a hash join, for example, you know you've got to build a hash table,

130
00:08:43,000 --> 00:08:47,000
there's a cost of that, you've got to probe a hash table, there's another cost of that,

131
00:08:47,000 --> 00:08:52,000
and you can more or less ignore the selectivity of the hash join itself,

132
00:08:52,000 --> 00:08:54,000
because you're always going to do that work,

133
00:08:54,000 --> 00:08:56,000
whereas in the worst case optimal join,

134
00:08:56,000 --> 00:08:58,000
because we can short-circuit comparisons,

135
00:08:58,000 --> 00:09:01,000
once we know an attribute within a join key is not going to match,

136
00:09:01,000 --> 00:09:04,000
then it actually is, you know, it'll vary.

137
00:09:05,000 --> 00:09:11,000
So what's also interesting about too is that the more tables we're going to throw at our worst case optimal join algorithm,

138
00:09:11,000 --> 00:09:14,000
the better its performance is actually going to be relative to the input,

139
00:09:14,000 --> 00:09:18,000
because the idea is that we're going to try to compare as much as we can all at once,

140
00:09:18,000 --> 00:09:25,000
again, rather than having these stages in the, you know, in a binary join, yes.

141
00:09:25,000 --> 00:09:29,000
So all the things you're talking about would you also throw it at the join key which is my attribute?

142
00:09:29,000 --> 00:09:34,000
The statement is a question is would all the things I'm talking about here still hold if it was join key which is one attribute?

143
00:09:34,000 --> 00:09:42,000
In terms of would you, well, you wouldn't get the benefit of short-circuiting additional comparisons for additional attributes.

144
00:09:42,000 --> 00:09:52,000
Is it an easier problem if it's one attribute to do a multi-way join?

145
00:09:52,000 --> 00:09:59,000
No, I mean, you wouldn't, how does this?

146
00:09:59,000 --> 00:10:07,000
You wouldn't get any benefit of some of the data structures that they're going to build,

147
00:10:07,000 --> 00:10:11,000
like the tries or in case of empty-headeds, like nested hash tables.

148
00:10:11,000 --> 00:10:20,000
Yeah, I actually don't know the complexity of this thing.

149
00:10:20,000 --> 00:10:27,000
If it's one attribute, if it's one attribute, I still think it's, this is going to be better if the intermediaries also are going to balloon up,

150
00:10:27,000 --> 00:10:33,000
because again, you're not materializing it, but all those optimizations that, like, we'll see from the paper you guys read,

151
00:10:33,000 --> 00:10:38,000
are like, how to do singletons and fast-pass down to the leaf nodes of the try.

152
00:10:39,000 --> 00:10:44,000
Those obviously don't make any sense if it's only one level.

153
00:10:44,000 --> 00:10:50,000
So we'll see this a little bit, and the hyper-paper you guys read, or the umbra-paper you guys read talks about this as well.

154
00:10:50,000 --> 00:10:57,000
In the same way that we have to get the join order right for binary joins, like make sure that if A joined B joined C, we have to get that ordering right.

155
00:10:57,000 --> 00:11:05,000
We have to get the ordering correct in a worst case-up node join, but the thing we have to worry about is not so much the ordering of the tables themselves,

156
00:11:05,000 --> 00:11:12,000
it's actually the ordering of the attributes. So we want to do comparisons on attribute attributes that we know very many of us are selective, as soon as possible.

157
00:11:12,000 --> 00:11:17,000
So again, we start throwing away data and not doing useless computations.

158
00:11:17,000 --> 00:11:29,000
So the definition that's sort of floating around the internet actually comes from this professor up in Waterloo for, he's building an embedded graph database called Kuzu.

159
00:11:30,000 --> 00:11:36,000
You think of like, you know, ducty B or SQLite, but for graph databases.

160
00:11:36,000 --> 00:11:47,000
Right? So his definition of a worst-cut orbital join is one where the worst case runtime of the algorithm meets a known lower bound for the worst case runtime of any join algorithm.

161
00:11:47,000 --> 00:11:50,000
So I read this and like, what the hell are you talking about?

162
00:11:50,000 --> 00:11:57,000
Because you're kind of using the definition of the thing, using the word time defined in the definition itself.

163
00:11:58,000 --> 00:12:08,000
So an alternative would be something like this, where the worst case-up node join is one where the runtime of the join algorithm is better than all other join algorithms with a query and the data represent the worst possible scenario.

164
00:12:08,000 --> 00:12:23,000
So if you have the situation where the intermediate size is going to balloon up massively, if I think of a Cartesian product as the worst case scenario, then we want to choose an algorithm where it's not going to be magically log in,

165
00:12:23,000 --> 00:12:33,000
but it's still going to be better than just doing all other approaches with a binary join, no matter what ordering you have for your tables in a binary join.

166
00:12:33,000 --> 00:12:41,000
So again, if you just, that's why I called this lecture the multi-way join because that one I think is easy to wrap around.

167
00:12:41,000 --> 00:12:44,000
This one is a bit screwy, and don't take my word for it also.

168
00:12:44,000 --> 00:12:55,000
For this guy's blogger, he has this anecdote where he talks about where he met Don Canuth, and he told Don Canuth he was working on worst case-up node join algorithms, and Canuth was like, what the hell are you talking about either?

169
00:12:55,000 --> 00:13:01,000
So as he says, are they so good that they're optimal in the worst case performance?

170
00:13:01,000 --> 00:13:03,000
Yes.

171
00:13:03,000 --> 00:13:12,000
So anyway, so again, if you understand that, this is going to be the best approach for the worst case scenario when we have this in ballooning up in-mere results.

172
00:13:12,000 --> 00:13:14,000
That's the thing we want to solve.

173
00:13:14,000 --> 00:13:20,000
So as I said, there's not very many systems that are actually going to implement this.

174
00:13:20,000 --> 00:13:24,000
So the logic blocks was the one I mentioned before.

175
00:13:24,000 --> 00:13:29,000
That's going to be, we'll see this when they do comparison in the umbra paper.

176
00:13:29,000 --> 00:13:40,000
Again, this was an early reasoning system that was trying to do graph traversals, and they had, they supported, they had an early invitation of, or they had a leaf frog hash line.

177
00:13:40,000 --> 00:13:43,000
Umbra, what you guys read about relational AI is the follow up to logic blocks.

178
00:13:43,000 --> 00:13:45,000
So logic blocks got bought.

179
00:13:45,000 --> 00:13:49,000
All the key people left the company ever got acquired and then built relational AI.

180
00:13:49,000 --> 00:14:03,000
Um, it's written in Julia, it's a relational database system that's doing um, uh, what's doing a graph representation on a relational database system and they're using their variant of a new version of the leaf frog joint.

181
00:14:03,000 --> 00:14:07,000
Um, and the cause is this is not a waterload that I mentioned before.

182
00:14:07,000 --> 00:14:14,000
So the reason why this is going to be important and we're not going to go too deep into the latest equal extension, uh, SQL PGQ.

183
00:14:14,000 --> 00:14:22,000
Um, but last year in March of February, the new specification for the SQL standard came out and in it, they have this thing called SQL PGQ.

184
00:14:22,000 --> 00:14:36,000
So it's an extension, a new, uh, new capabilities in the SQL standard that lie to define property graphs over relational tables and then do, uh, pattern searching your graph traversals directly in SQL.

185
00:14:36,000 --> 00:14:45,000
So the, the, the extensions are inspired by a new for J cipher, I think tiger graph has their graph query language.

186
00:14:45,000 --> 00:14:50,000
Like there's bits and pieces of existing graph databases, but now all this exists in the SQL standard.

187
00:14:50,000 --> 00:14:56,000
Um, the only system that I know that actually supports this is, uh, is, it's Oracle.

188
00:14:56,000 --> 00:14:59,000
Oracle was on the standards, standards committee.

189
00:14:59,000 --> 00:15:09,000
Um, there's a, there's a, there's a experimental development branch of, of, of ducty B that has some portions of this, but they're all, the language is all sort of slightly different.

190
00:15:09,000 --> 00:15:17,000
Um, so we're going to need, we're going to need the worst case out no joints in order to implement this efficiently, right for these kind of queries.

191
00:15:17,000 --> 00:15:22,000
Do you graph traversals on, on, uh, on, on relational basis?

192
00:15:22,000 --> 00:15:30,000
So that's why this matters. So even though in Oracle only supports it now, I think in the next five years, every major olactated system will have, will have support for this.

193
00:15:30,000 --> 00:15:35,000
And you're going to need to do a worst case optimal join to make that run efficiently.

194
00:15:35,000 --> 00:15:41,000
Alright, so let's go to the first implementation or first one of first limitations leaf log, leaf log try join.

195
00:15:41,000 --> 00:15:46,000
And then, uh, and then we'll see how the Germans extended this to make it, make it run faster.

196
00:15:46,000 --> 00:16:03,000
Um, so the idea is that to do a multiway join, the, the leaf log try joins, going to assume that either the data is already pre sorted, or that you're going to build a, an index data structure on the join keys, uh, right before before the join itself.

197
00:16:03,000 --> 00:16:12,000
So as we talked about in, in our world, we're, we're accessing much of park a files, we're sending us three. Those things are unlikely to be sorted.

198
00:16:12,000 --> 00:16:24,000
And in the park a or file specifications, you can't store additional data structures. So either we have to pre compute these things and store it as this, put your separate files that we load back in, or as we're scanning data or building these tribes on the fly.

199
00:16:25,000 --> 00:16:35,000
And the, the umber paper you guys read, they're going to be doing the same thing, they're going to be building the tribes on the fly too, but they're going to do a bunch of tricks to try to lazy evaluation or lazy materialization in the data structure.

200
00:16:35,000 --> 00:16:46,000
Right, so another way to get this is when I call create index in postgres or whatever, what is that what's going to happen? Well, the data says does a sequential scan reads every single row and then populates the index.

201
00:16:46,000 --> 00:16:53,000
And so the umber guys are going to try to avoid having to do that. These guys are going to, are going to build everything.

202
00:16:53,000 --> 00:17:07,000
So in this try, we'll see in a second, they're going to have a separate data structure per table per relation, we're trying to join and then each level in this try is going to correspond to one attribute that that's in our joint key.

203
00:17:07,000 --> 00:17:16,000
Right, for that, for that table, each level correspond to an attribute that it has that's involved in the joint operator.

204
00:17:16,000 --> 00:17:30,000
So as I said, logical blocks and men in this in 2010 or 2013, I think 14 paper group out, they have their new company relation AI, they have an, especially a better version of the leapfrog hash join called a dovetail join.

205
00:17:30,000 --> 00:17:39,000
I can't actually figure out what they're doing because there's a five minute, you know, there's this blog article here and a five minute YouTube video that doesn't listen to anything deep, right?

206
00:17:39,000 --> 00:17:45,000
But they claim it's better than than what these guys have.

207
00:17:45,000 --> 00:18:02,000
All right, so the way to think about this is that we are again, we're going to sort our data or build it next for it and then we need a way to to iterate through the, all the tables are trying to join at the same time and then do comparison across the attributes to see whether we have a match.

208
00:18:02,000 --> 00:18:15,000
And because the things are sorted, we don't have to backtrack on our join keys. Right, so let's say we have three tables x, y, z, first step, we're just going to sort it, so that's fine.

209
00:18:15,000 --> 00:18:25,000
And then for now, for this demonstration, I'm going to switch to horizontal view and I'm going to put spaces into where there's actually new values, you know, corresponding to the sequence, like, you know, zero to 10.

210
00:18:25,000 --> 00:18:32,000
So at the very beginning, we're going to have an iterator for each of three tables, right? So in this case here, we're trying to join in one attribute, ID.

211
00:18:32,000 --> 00:18:41,000
And so the, for x, the first value is zero, so the x iterator is 20 is zero, y is pointing at zero, and then z is pointing at two.

212
00:18:42,000 --> 00:18:57,000
So we're going to start with the, at the top, and we're going to sort of, we're going to do comparisons with the, what the iterator is pointing at, across the different tables, because we know what they're pointing at too.

213
00:18:57,000 --> 00:19:05,000
And then we find that the value that our iterator is pointing at is less than what the other iterators are pointing at.

214
00:19:06,000 --> 00:19:21,000
Then we know that there isn't a match for us here, and therefore we're going to leave for all of our jump to some other point in our, in our value list, that's going to be equal to or greater than the maximum what everyone else is pointing to.

215
00:19:22,000 --> 00:19:35,000
Right, so in this case here, zero is less than two, so we need to jump over and find the next, the, the next value for x, that is greater than or equal to two.

216
00:19:35,000 --> 00:19:40,000
In this case here, it's three, so the iterator is going to jump over there, and we update that that.

217
00:19:40,000 --> 00:19:46,000
Now because this guy now did a jump, we then need to come down to the next one and do the same comparison here.

218
00:19:46,000 --> 00:20:00,000
So the x-rayer is pointing at zero, so it needs to find a, since zero is less than two and three, we need to now jump to another position where the, but the next value is greater than equal to three.

219
00:20:01,000 --> 00:20:12,000
So even though it has a two, so we know this guy is pointing at three, so we know that there isn't going to be a match, because otherwise this thing would be pointing at two as well, so we skip this, so he's now going to leave for all of our jump over to six.

220
00:20:12,000 --> 00:20:22,000
Same thing, come down here, he's at two, two is less than six, two is less than three, so we need to find something that's going to be greater than or equal to six, which is eight here.

221
00:20:22,000 --> 00:20:31,000
Then we look back around and do the same thing, now the x-rayer can jump to eight, the y-rayer can jump to eight, and then lo and behold, we have a match.

222
00:20:31,000 --> 00:20:39,000
So at a high level, this is a conceptually what we're trying to do, but obviously the devil's in the details, because how am I doing this jump?

223
00:20:39,000 --> 00:20:48,000
Because you switch your scan would be stupid and slow, and I'm also only showing how to do this for a single attribute.

224
00:20:48,000 --> 00:20:56,000
So the way they're going to represent these values in sort of a manner is through a try.

225
00:20:56,000 --> 00:21:00,000
So we have everyone here knows how to try it, because that's the project zero.

226
00:21:00,000 --> 00:21:02,000
Okay, so I'll skip into the try.

227
00:21:02,000 --> 00:21:13,000
Actually, the guy that coined the name Edward Franken, he was his faculty, I think he just died last year, so the try guy died.

228
00:21:13,000 --> 00:21:23,000
Okay, so we now need to build a try for every single table, and where we're going to have each level in the try is going to represent a single attribute.

229
00:21:23,000 --> 00:21:38,000
So we slightly different than the try representation we think of in databases to replace a B plus tree, because in a try you would take a string value, and you break it up to different digits or red X's, and store those as a single level.

230
00:21:38,000 --> 00:21:46,000
So we're going to store the entire value in a node at a level for each corresponding to a two-pole at a table.

231
00:21:46,000 --> 00:21:48,000
But we're not going to have any duplicate values.

232
00:21:48,000 --> 00:21:59,000
So if we see the same value for a given attribute over and over again, we'll have one instance of it, but we have multiple pointers coming out of it for the different sub-values for the next attribute.

233
00:21:59,000 --> 00:22:03,000
So again, I'm going to just flip it on its side to make it easier to visualize.

234
00:22:03,000 --> 00:22:12,000
So we have two attributes, A and B. So in the first step here, we want to add an entry in our try for these three zeros.

235
00:22:12,000 --> 00:22:18,000
So we always start with the root, to first down, and generate the zero node.

236
00:22:18,000 --> 00:22:31,000
And then we come down to the B, and then for all the B values that correspond to the zero values, we're going to have edges coming out of them and have those three values.

237
00:22:31,000 --> 00:22:38,000
And then you just scan down the line to do the same thing for one and zero, and then for two and zero.

238
00:22:39,000 --> 00:22:48,000
So again, anything at this first level here, ignoring the root, this corresponds to attribute A. Everything below that, the second level was actually B.

239
00:22:48,000 --> 00:22:54,000
And then depending on how many attributes I have my joint key, this keeps going down and down.

240
00:22:54,000 --> 00:23:04,000
And then in this leaf node here, obviously, when they have the same parent, they're going to be in sort of order.

241
00:23:04,000 --> 00:23:13,000
So now let's put this together in a complete example to do a joint between R and S and T here.

242
00:23:13,000 --> 00:23:18,000
So I've already built the tries for the three tables.

243
00:23:18,000 --> 00:23:28,000
And again, here in our join, we're trying to join R at S and T, we're trying to join R at R dot A equals T at dot A, R dot B equals S dot B and S dot C equals T dot C.

244
00:23:28,000 --> 00:23:35,000
So in this case here, one relation does not have all of the attributes that we need to compute the join.

245
00:23:35,000 --> 00:23:44,000
And so assuming that the optimizer has figured out that the optimal joint, sort of optimal evaluation ordering for attributes is going to be A, B, and C.

246
00:23:44,000 --> 00:23:55,000
So for this, say we start with table R, and we started the root, traverse down, the first entry is going to be, the first level is going to be A, the first value you can see for A is zero.

247
00:23:55,000 --> 00:24:03,000
So then we can use this value to now do a look up in the table T. So again, since our join is R dot A dot equals T dot A.

248
00:24:03,000 --> 00:24:15,000
So then now as an entry point going into the root of this try, we come down to the first level, we have A equals zero. We have a matching value there.

249
00:24:15,000 --> 00:24:31,000
So now what we need to do is traverse down, at this point here, since we know we have a match for R dot A equals zero and T dot A equals zero, then we need to now go to the level below them and actually start comparing the two pulls of the values for the different attributes at the next level.

250
00:24:31,000 --> 00:24:40,000
So in this case here, the next level for table R is going to be B. So when we go down to, you go down the left side, the first value we're going to hit is zero.

251
00:24:40,000 --> 00:24:54,000
So we can use that now as the probe into the try for table S because we're trying to do R dot B equals S dot B, right, in the, in our, in our where it calls up there.

252
00:24:54,000 --> 00:25:10,000
So same thing we enter R, sorry, we enter the try for S to first down, now we match for B. Great. So now we know that we have for a match of at least one attribute for R dot A to T dot A and R dot B into S dot B.

253
00:25:10,000 --> 00:25:29,000
So the last step now is to do the comparison for where S dot C equals T dot C. So to do this, we're just going to have iterators in the, in the region that the link list or the list that's below the first attribute in the try for T and S.

254
00:25:29,000 --> 00:25:40,000
And we're just going to scan along and accumulate all the values for, for C across these two different, you know, for these two different tables, right.

255
00:25:40,000 --> 00:25:48,000
And then now we have a, we now we have a set, we just do the intersection and we tell us whether we have matches.

256
00:25:48,000 --> 00:26:09,000
And we know how to fill in the values for a and B because we know how we got into our try in the first place. So we prove property here got A equals zero. We had a match there. Then we had B equals zero, how to match over there. So when we fill this out, we know what the values of a and B are. So we're just doing the intersection over C. Yes.

257
00:26:09,000 --> 00:26:14,000
So what is the order in the region has come?

258
00:26:14,000 --> 00:26:19,000
Question is what if what if the ordering of the.

259
00:26:19,000 --> 00:26:24,000
The C goes on top of the.

260
00:26:24,000 --> 00:26:29,000
I don't know if it's C goes the top of B. What do you mean? Yeah.

261
00:26:29,000 --> 00:26:38,000
So if I put this above this, you can't do that.

262
00:26:38,000 --> 00:26:51,000
Because I know what I know the global order, I know the global evaluation ordering. A B C. So in my try, even though I don't have all the attributes in for a given table, I still have to follow that ordering.

263
00:26:51,000 --> 00:27:01,000
So B's got to come before C. The order is determined by the query optimizer before you start running this.

264
00:27:01,000 --> 00:27:08,000
It's the same as joint order when you're doing a binary joint.

265
00:27:08,000 --> 00:27:16,000
Yes. Is there a table or we need one for every possible order and success of this question?

266
00:27:16,000 --> 00:27:21,000
Is it okay to have one try per table or do you need to have one try for every possible joint ordering?

267
00:27:21,000 --> 00:27:27,000
So this brings a good point. I think the empty head of paper.

268
00:27:27,000 --> 00:27:32,000
And I think this paper says you'd want to pre-compute these ahead of time.

269
00:27:32,000 --> 00:27:35,000
So all possible joint orderings, you would have to pre-compute them.

270
00:27:35,000 --> 00:27:39,000
The umber guy is claiming the correct it, like that's super wasteful.

271
00:27:39,000 --> 00:27:49,000
And you would have built them on the fly. And that's better than trying to pre-populate everything.

272
00:27:49,000 --> 00:27:54,000
Okay. So we did a match where a equals zero, b equals zero, and we got all the C's for that.

273
00:27:54,000 --> 00:28:01,000
So now all we need to do is start back over here with our b iterator in table R. Just go to the next one.

274
00:28:01,000 --> 00:28:08,000
Do the same thing. Probe into table S. Follow along the path to get the b.

275
00:28:08,000 --> 00:28:21,000
Now we have an iterator for the C value over here. For this one here, because we're still at the same A value that we don't need to switch over to another leaf node,

276
00:28:21,000 --> 00:28:25,000
we just restart and go back at the beginning of our linked list here.

277
00:28:25,000 --> 00:28:33,000
So now we would only end up with one entry for S dot C. And then three entries for T dot C.

278
00:28:33,000 --> 00:28:36,000
You obviously could catch this because you know it's going to be the same thing every time.

279
00:28:36,000 --> 00:28:42,000
Compute the intersection and then we end up with one table.

280
00:28:42,000 --> 00:28:45,000
Then do the same thing. Move over to the next one.

281
00:28:45,000 --> 00:28:52,000
To verse down into to do the S. Get our you know get our sets of C values intersect.

282
00:28:52,000 --> 00:29:00,000
And pre-s the table. So again now at this point here, since we've exhausted all the b's and so we're dumb in this A,

283
00:29:00,000 --> 00:29:07,000
we go back up the route and come down to the next side. Now we get a equals one probe into the tri for T.

284
00:29:07,000 --> 00:29:13,000
A equals one. We got a match. Do the same thing. Scan along and then do the intersection.

285
00:29:13,000 --> 00:29:23,000
Same thing. Come to two and so forth like that. Not so bad.

286
00:29:23,000 --> 00:29:33,000
So related to his point, either pre-computing or building a tri on the fly for every time we want to do this joint is going to be expensive.

287
00:29:33,000 --> 00:29:43,000
Again always think it's strange. If you have billions or two bulls having to build this tri and you know across every single table every single time it's going to be slow.

288
00:29:43,000 --> 00:29:50,000
And even though in our world we're assuming our data set is read only where's the hyperfavorite you they were talking about.

289
00:29:50,000 --> 00:29:58,000
Again trying to figure out all possible joins ahead of time and then materialize them and then fetch them from disk every time you join is going to be in practice.

290
00:29:58,000 --> 00:30:05,000
Yes. What do you mean by building for every joint? Do you use how it wants to order the attributes you need to be able to try to get that?

291
00:30:05,000 --> 00:30:10,000
His question is what do you mean what I mean by building over every possible joint reading? Wouldn't you have one ordering the attributes? No. Right.

292
00:30:10,000 --> 00:30:22,000
So in my example, ABC was the optimal ordering for giving the data. But what if I add a bunch of wear clauses or conditional predicates that start filtering from a filtering B and C or RST before I join.

293
00:30:22,000 --> 00:30:30,000
So now the ordering can be completely different one query the next. Yeah.

294
00:30:30,000 --> 00:30:37,000
So trying to figure that out for every single possible combination is is is wasteful.

295
00:30:37,000 --> 00:30:46,000
So the empty had approach from Stanford with their going to claim that's going to be better than the this try is just using national hash tables.

296
00:30:46,000 --> 00:30:52,000
But again this is this is going to be expensive to do as well even if even building on the fly.

297
00:30:52,000 --> 00:30:59,000
And this is part because the hash table despite the how great it was for doing a binary join we saw less class.

298
00:30:59,000 --> 00:31:07,000
In this world is going to be really expensive because you're just doing so many different hash lookups over again.

299
00:31:07,000 --> 00:31:19,000
And a lot of it and it can be wasteful. Right. So the onberg eyes would argue that if you use hash tables for this you're going to need to do one key comparison to see whether you have a collision in your hash table and you look up.

300
00:31:19,000 --> 00:31:30,000
And then but you still need to store the actual keys the pointer to the two pulls the deal collisions. And now you're just trashing your CPU cache because you're jumping on to random locations over and over again for all these national hash table data structures.

301
00:31:30,000 --> 00:31:39,000
Right. In case of the binary hash join it's one hash table now can you dig enough where it can complete my CPU cache but there will be still some locality in that because I'm not.

302
00:31:39,000 --> 00:31:44,000
You know traversing different paths reading a bunch of different random things all the time.

303
00:31:44,000 --> 00:31:59,000
The argument that they're going to claim is that you if you have very long keys or strings then you still need to use dictionary encoding to make sure that you you can keep things all nicely aligned in your data structure.

304
00:31:59,000 --> 00:32:08,000
And that means potentially it's still having to do lookups in the dictionary to go figure out what the actual value is when you want to do maybe deeper comparisons.

305
00:32:09,000 --> 00:32:18,000
So these are all the flaws of the early worst case hopman joint approaches that the younger guys are trying to fix with their implementation.

306
00:32:18,000 --> 00:32:26,000
And the key idea what they're going to do is that it's basically going to be the leapfrog hash join me to solve the leapfrog try hash join.

307
00:32:27,000 --> 00:32:38,000
I'm sorry, leapfrog try join but instead of now storing the actual values of the attributes in the tribe of cells they're going to store the hashes for the values.

308
00:32:38,000 --> 00:32:49,000
Just 64 bit values and the idea is there that's going to be good enough to do a quick comparison to see whether two possible values can even match at all.

309
00:32:50,000 --> 00:33:01,000
So that we end up throwing away as much as we can without having to go maybe do deeper, deeper investigations to go read the actual data themselves to see whether there's going to be a match or not.

310
00:33:01,000 --> 00:33:17,000
So again, another thing about this is like you're trying to make the sort of first peak to see whether this these two attributes are going to be the same or not be that cheap as possible because you know you're going to throw most things away.

311
00:33:17,000 --> 00:33:36,000
So within the try itself that each note is just going to be another hash table and they do some tricks of storing things that are raised to do quick lookups inside that and that's going to be it's going to have a map is going to be or the hash will map a hash value for given attribute to a pointer to the other parts of the tried out of structure.

312
00:33:36,000 --> 00:33:44,000
And that pointer actually point to be either a child node or a pointer to the actual tuple represent that represented by that value.

313
00:33:44,000 --> 00:33:52,000
And now because everything's going to be in doing hash hash is which would be 64 bit integers.

314
00:33:52,000 --> 00:34:00,000
We don't need any additional logic in our lookups and in the certions when we build this this try to deal with the different data that we could have.

315
00:34:00,000 --> 00:34:11,000
So it's going back to this code specialization idea, but rather than code gending stuff at the very beginning or you know generating code and then compiling it, they just make sure that the date itself is always going to be one data type.

316
00:34:11,000 --> 00:34:20,000
So that you can have the in a simple one one implementation that has no in direction or no lookups or no branching the deal with different possible data types.

317
00:34:20,000 --> 00:34:34,000
And obviously if it's if it's hashing we could have false positives they argue with something like murmur hash maybe mention aquahash or XX hash from Facebook that's going to be good enough where in most of the times they're not going to have collisions.

318
00:34:35,000 --> 00:34:45,000
And so if you do have so collisions you have at the very end just to check to see whether the actual the tuples themselves actually matching even the hash is don't.

319
00:34:45,000 --> 00:34:56,000
So this is the diagram from the paper this is the data structure the proposing and I'm going to go through a bunch of different operations that they have in here, but again it's the try itself is not fancy.

320
00:34:56,000 --> 00:35:06,000
Like they have another data structure called art the art index the adaptor index try that was in hyper that thing is having different allocations for different notes, different sizes.

321
00:35:06,000 --> 00:35:14,000
I don't think they're doing any of that here that the real magic is in how they're going to store the pointers and try to do lazy materialization.

322
00:35:15,000 --> 00:35:34,000
So you're always going to have to build the root of the of the try and these are going to be 16 bite buckets right there use eight bite 64 bits for the hash and 64 bits for the pointers to the actual tuple themselves or the pointer to the next level in the tree.

323
00:35:35,000 --> 00:35:44,000
But as I said before the Germans like sticking things in pointers where they have unused bits and that's that's the key thing that they're going to do here so I want to go through couple of positions.

324
00:35:45,000 --> 00:35:53,000
How can you use these tag pointers and then how to do the late materialization because to me that's the really clever part of what they're doing because the hash join itself.

325
00:35:54,000 --> 00:36:00,000
Like the leaf of try join that's that's been already proposed they're making it work actually efficiently.

326
00:36:01,000 --> 00:36:17,000
So they said Germans love sticking things in pointers we said before x86 64 only use 48 bits for memory addresses the harbor ignores anything else for the other 16 bits so because you got to allocate 64 bits that's they want to put something in there.

327
00:36:18,000 --> 00:36:24,000
So within the pointer itself they're going to use 16 bits to record three additional things.

328
00:36:25,000 --> 00:36:43,000
So the first is they're going to have a single bit flag that corresponds to whether something is a single to not meaning there isn't going to be a path through the through the single to meaning like there isn't anything in between the root node and the bottom node it's a direct path to the leaf nodes.

329
00:36:44,000 --> 00:37:10,000
And then they're going to use a another bit to for expansion flag just mean that has the has the the nodes below it have they've been allocated and expanded because they're trying to lazy materialization so even though the data structure will have a pointer to something to lower levels in the try they're not actually going to materialize it until you actually try to go look it up.

330
00:37:10,000 --> 00:37:20,000
So if this flag just says hey by the way you brought to jumps on location that hasn't been expanded or allocated yet so go do that first then flip this bit and then traverse down.

331
00:37:22,000 --> 00:37:35,000
And to know how to expand they're going to maintain the 14 bits for the chain length so that you know when you're traversing along the leaf node what's the number elements you expect to see because everything's fixed length.

332
00:37:35,000 --> 00:37:45,000
It's always going to be 16 bits or 16 bytes you know that the size of the chain length can be can be computed from this from this counter here.

333
00:37:47,000 --> 00:37:51,000
And the rest is just going to be the 48 bits that the harbor is going to use for memory addresses.

334
00:37:52,000 --> 00:38:02,000
We saw this example with the hash table right they would store a bloom filter in the 16 bits there was another example to I'm blanking on to as well.

335
00:38:05,000 --> 00:38:09,000
Yeah there was another another example of the Germans they were doing this as well I forgot what it was.

336
00:38:10,000 --> 00:38:13,000
But okay so let's go through the single to install and how the expansion stuff works.

337
00:38:14,000 --> 00:38:34,000
So again the size of the hash it was in the try is going to get smaller smaller as you go down because there's end up being oftentimes the single two or sorry single pair of values for an attribute.

338
00:38:35,000 --> 00:38:46,000
So it isn't going to be a lot of too much duplication as you go down so you end up with these paths through your try where each node is only have one entry right.

339
00:38:47,000 --> 00:38:53,000
So the idea is that instead of storing the you know it's all separate hash table.

340
00:38:53,000 --> 00:39:06,000
Or node within the try for for it for a node that only has one entry at a level then you just bypass that and skip down to the bottom right.

341
00:39:07,000 --> 00:39:15,000
So in this case here for when the hash value say is some value zero when we jump down here we only have one entry inside this.

342
00:39:15,000 --> 00:39:29,000
So then now rather than storing this digital node just go again follow follow the pointer go down look at it only find one thing and the choice down here instead what they do is just have a fast path pointer that takes you directly down down here.

343
00:39:31,000 --> 00:39:44,000
So then you would use that that this expansion bit or sorry the single to fit set at the one to know that if you're at the root there isn't going to be anything else below you just jump right down to the node at the bottom.

344
00:39:45,000 --> 00:39:55,000
Now you obviously still need to store the the information that was that was in this guy so that you can actually you know do the comparison whether you actually have a match or not.

345
00:39:56,000 --> 00:39:58,000
But again that's just done down the leaf node yes.

346
00:39:58,000 --> 00:40:02,000
So the single to the bit you can use anywhere down the tree so the moment you know you're having more children.

347
00:40:02,000 --> 00:40:11,000
Yes his statement is is the single to the bit use at any point the tree so that at any moment you look at it and you know that the next thing the pointer going to follow is to take you to the bottom yes.

348
00:40:16,000 --> 00:40:33,000
So the next optimization to do the lady child expansion again the idea here is that unlike in the logic blocks you know multi way join the worst case of no join where they're popular in the entire try before you start joining idea here is that you.

349
00:40:33,000 --> 00:40:41,000
You would populate the first the root node you still have the obviously have the tubals at the bottom but in the ideas that.

350
00:40:41,000 --> 00:40:56,000
If nothing when you do the join itself if there isn't any comparisons along a path in the try then why instantiate the memory for it and why try to allocate it right only when you actually go to need it then then you populate it.

351
00:40:56,000 --> 00:41:01,000
So this limits the overhead of trying to build the trying beginning because you're just building the first level.

352
00:41:01,000 --> 00:41:04,000
And the bottom level right.

353
00:41:05,000 --> 00:41:09,000
So the way works is like say in the very beginning my try would look like this.

354
00:41:11,000 --> 00:41:14,000
This is kind of confusing here but you would have.

355
00:41:14,000 --> 00:41:19,000
You know sort of think that the bottom is a linked list that tells you the ordering of of things.

356
00:41:20,000 --> 00:41:29,000
So if now I someone comes along and tries to do a look up down this path and say this is trying to do join on two attributes so I'm missing that second level.

357
00:41:30,000 --> 00:41:37,000
So I look inside this I see that the expansion bit is set to zero so I know that I'm.

358
00:41:37,000 --> 00:41:48,000
I don't have anything below me at this point so then I could go do now comparison or sorry fast back down to the bottom I need to do a comparison and I scan along the leafens to find what I want.

359
00:41:49,000 --> 00:42:01,000
But then now I go ahead and populate what the values actually were and I know how many things I should be looking at because my chain length would tell me when the expansion bit is set to zero.

360
00:42:01,000 --> 00:42:12,000
This is going to tell me how many things I need to look at the bottom so I can then allocate that node put that here and then I update the new node pointers to point to different parts of the list of the bottom.

361
00:42:12,000 --> 00:42:29,000
Then I go ahead and flip the bit to be one so now that anybody else comes along follow down the same path though know that they're actually looking at expanded those below me and not the not directly to the bottom.

362
00:42:29,000 --> 00:42:30,000
Yes.

363
00:42:30,000 --> 00:42:31,000
So there's a lot of my things here.

364
00:42:31,000 --> 00:42:38,000
Surely like there's only one I do as much more built side or that's not rather that's for more.

365
00:42:38,000 --> 00:42:45,000
So question is why is this an optimization don't you want to do as much work as you can on the build side to make the products go fast as possible.

366
00:42:45,000 --> 00:42:49,000
But yes but like you're trying to join.

367
00:42:49,000 --> 00:42:56,000
Three or more tables all at once so there's going to be so much memory pressure for that data structure.

368
00:42:56,000 --> 00:43:03,000
Think of like trying to build like build complete hash tables for all three tables at the same time that would be super expensive.

369
00:43:03,000 --> 00:43:09,000
Again think it extremes like you know each table is ten petabytes or ten terabytes.

370
00:43:09,000 --> 00:43:19,000
So this is just trying to minimize the amount of work that minimize the explosion of memory and storage for your data structure for parts you never actually going to need.

371
00:43:19,000 --> 00:43:25,000
Did you mind explaining the algorithm to the creatures you know that the end of the world was the most important?

372
00:43:25,000 --> 00:43:26,000
Yeah this is sort of not clear.

373
00:43:26,000 --> 00:43:31,000
So this is all in sort of order and I think this is going down here.

374
00:43:31,000 --> 00:43:38,000
This is going over here and this is just saying that the thing of this is again the link list had to follow along for the rest of the tables.

375
00:43:38,000 --> 00:43:39,000
Yeah.

376
00:43:39,000 --> 00:43:43,000
Actually I think this is actually not in sort of order right.

377
00:43:43,000 --> 00:43:50,000
You have one three one two two three so this is this is how the original two was appeared and now you're just keeping it in that order.

378
00:43:50,000 --> 00:43:52,000
But then you're storing link list.

379
00:43:52,000 --> 00:43:53,000
Yeah.

380
00:43:53,000 --> 00:43:55,000
When do you do that in this point?

381
00:43:55,000 --> 00:43:56,000
When do you create a list?

382
00:43:56,000 --> 00:43:58,000
I so I think you have to do one pass.

383
00:43:58,000 --> 00:44:04,000
You have to do one pass with the data anyway beginning because you have to hash it and figure out what the root is.

384
00:44:04,000 --> 00:44:09,000
Right and I think they that's when they construct this link list.

385
00:44:09,000 --> 00:44:15,000
So I have to double check that.

386
00:44:15,000 --> 00:44:18,000
So I'm going to show one graph from their paper.

387
00:44:18,000 --> 00:44:26,000
So this one they're comparing against empty headed which is the thing from Stanford early prototype logic blocks and then the original version of umbra.

388
00:44:26,000 --> 00:44:33,000
Umbra with the leap frog try join from the logic blocks guys and then the umbra with their hash try.

389
00:44:33,000 --> 00:44:47,000
Right and for this one they're trying to compute a three clique query sorry three clique graph or sub graph from a graph data set from Google plus or kit and Twitter.

390
00:44:47,000 --> 00:44:54,000
Google plus was like early Google's attempt doing Facebook.

391
00:44:54,000 --> 00:45:00,000
Or cut was um the Brazilian Facebook.

392
00:45:00,000 --> 00:45:06,000
Google and Google about these right and then Twitter is sorry.

393
00:45:06,000 --> 00:45:21,000
So again the main takeaway is that like the for these larger graph data sets the you know the in the case of the Twitter one I think the graph is highly connected.

394
00:45:21,000 --> 00:45:25,000
So building those data structures in the beginning.

395
00:45:25,000 --> 00:45:28,000
You know it's just super expensive and it's just timing out.

396
00:45:28,000 --> 00:45:34,000
Whereas the late materialization shows the real benefit here because you're you know.

397
00:45:34,000 --> 00:45:41,000
Yes I mean it's not going to run as fast as if you built everything ahead of time but you have.

398
00:45:41,000 --> 00:45:52,000
You know you don't have too much memory pressure of trying to maintain again the data structure to do this uh to do the to do the join right.

399
00:45:52,000 --> 00:46:02,000
So again it's just showing you that the umbra has try is preferable over than the leap frog try so they the real comparison is like this one versus this one right because.

400
00:46:02,000 --> 00:46:05,000
Empty headed is a prototype was acting prototype.

401
00:46:05,000 --> 00:46:09,000
So it's like the blocks is getting the only commercial system at the time they compare against.

402
00:46:09,000 --> 00:46:15,000
Right this is what the care about like if you Germans building your your hash try in Germans building your leap frog try.

403
00:46:15,000 --> 00:46:21,000
Then you know the hash tries better.

404
00:46:21,000 --> 00:46:24,000
So the.

405
00:46:24,000 --> 00:46:29,000
The challenges though in the paper brings us up which is a good point is that.

406
00:46:29,000 --> 00:46:32,000
You need you still need binary joints.

407
00:46:32,000 --> 00:46:36,000
And so I think there was one it had a bunch of experience with this show that the.

408
00:46:36,000 --> 00:46:41,000
For for for workloads like TPCH and the joint out of benchmark if you're just doing binary joins.

409
00:46:41,000 --> 00:46:47,000
Uh even when it's not unfiltered uh the multi way joint is actually not going to be as good.

410
00:46:47,000 --> 00:46:57,000
Right it's not going to be as performant and as as the binary join it's only the cases when the immediate result size is going to blow up is when you want to use the worst case out.

411
00:46:57,000 --> 00:47:00,000
No join again as we define in the very beginning.

412
00:47:00,000 --> 00:47:04,000
So what you really want is a system that can support both.

413
00:47:04,000 --> 00:47:12,000
And then at when a query shows up the determine which joins within your query plan should be using one algorithm versus another.

414
00:47:12,000 --> 00:47:17,000
It's no different than trying to figure out whether I when use the sort of merge join or hash join or.

415
00:47:17,000 --> 00:47:21,000
A nest loop join which you typically don't want to use that but.

416
00:47:21,000 --> 00:47:23,000
You want your optimize better figure this out.

417
00:47:23,000 --> 00:47:27,000
And so in the paper they talk about how on bro I was able to.

418
00:47:27,000 --> 00:47:35,000
Extender optimizer using heuristics to basically figure out on the fly based on the system they've collected whether to use one versus another.

419
00:47:35,000 --> 00:47:37,000
And no system can do this.

420
00:47:37,000 --> 00:47:42,000
I'm not trying to advertise for for for umbra but like larger blocks only the multi way join.

421
00:47:42,000 --> 00:47:45,000
I think kuzu only does multi way joint yes.

422
00:47:45,000 --> 00:47:53,000
Yes yes yes yes yes yes.

423
00:47:53,000 --> 00:47:57,000
Nobody does that.

424
00:47:57,000 --> 00:48:07,000
So you just are like hard to know that if you're like.

425
00:48:07,000 --> 00:48:14,000
If you do an echo join in a join or echo join with on primary keys to know exactly low up.

426
00:48:14,000 --> 00:48:17,000
Yeah but it's like it's like he's saying so much he restricts the figure things out right.

427
00:48:17,000 --> 00:48:20,000
I mean one of the use case to say I know I want to use a binary join.

428
00:48:20,000 --> 00:48:24,000
It's like this really this has problems when again you're doing.

429
00:48:24,000 --> 00:48:26,000
Graph traversals is a lot of self joins.

430
00:48:26,000 --> 00:48:30,000
Like you're like looking up the edge you're doing joins on the edge table over again.

431
00:48:30,000 --> 00:48:37,000
Or if you're joining on like non foreign key primary key attributes then things can blow up.

432
00:48:37,000 --> 00:48:44,000
Again it's not that they're not they're not as common as foreign key primary key joints that's probably the most common use case.

433
00:48:44,000 --> 00:48:49,000
But they still they still exist enough where like this all falls apart.

434
00:48:49,000 --> 00:48:56,000
Okay so I'm going to quickly finish up and talk about one addition optimization from.

435
00:48:56,000 --> 00:49:00,000
From the duct B guys so it's the guy who wrote the fast lanes paper.

436
00:49:00,000 --> 00:49:08,000
The people at CWRI they they had a can experiment or branch of duct B where they add a support for the PG SQL PGQ extensions.

437
00:49:08,000 --> 00:49:15,000
Owned relational database system and in this great paper which I get a person I can post on piata.

438
00:49:15,000 --> 00:49:22,000
They basically lay out here's all the things you'd want to have in a relational database system to make a.

439
00:49:22,000 --> 00:49:34,000
Do officially support SQL PGQ queries right and that they basically opine that all these specialized graph databases that are out there the Neo4j's and so forth are.

440
00:49:34,000 --> 00:49:43,000
Just fundamentally flawed because they're based on storing edges and vertices in these inefficient data structures that it don't take advantage of all the less.

441
00:49:43,000 --> 00:49:50,000
10 20 years of development developments and optimization so we've been talking about in this class to make relational queries run faster.

442
00:49:50,000 --> 00:49:57,000
So independent other words case up in the joint there's a bunch of stuff that we've already covered like vectorization better query optimization will cover in a second.

443
00:49:57,000 --> 00:50:16,000
Or cover later this semester or compression all those things which is what you need to make a graph query run faster and that the isn't graph databases basically ignored all those developments and went down the run path and they're going to lose out to relational databases and I agree to that.

444
00:50:16,000 --> 00:50:19,000
I agree to that that with that statement.

445
00:50:19,000 --> 00:50:35,000
So I'm going to show one optimization that we haven't really covered it doesn't really fit into other parts of the talk to I mean kind of need to understand okay when you have the balloon up of these in the results in these graph or triangle queries like this is when you actually want to apply this technique for binary joins it doesn't make sense.

446
00:50:35,000 --> 00:50:52,000
So the technique is called factorization the idea is really simple basically rather than materializing duplicate tuples over and over again for a joint whatever operator you're trying to generate you just figure out here's all the actual unique values and maintain a column of a counter.

447
00:50:52,000 --> 00:50:56,000
It says how many times have I seen this seen seen this to pull.

448
00:50:56,000 --> 00:51:08,000
So now going back to my examples I have before when I was doing those joints and the enemy results blowing up is that again to have materialize all those results I could store it in a factorized form and have a counter.

449
00:51:08,000 --> 00:51:25,000
But now the challenges in my invitation all the operators in my system need to be aware of that they're operating on factorized tuples and and be able to account for that right if I'm running a count query right you know this can't to be something internal that something that just gets synthesized and ignored treated like any other column.

450
00:51:25,000 --> 00:51:33,000
The system needs to know this is a counter column and you know adjust the computations accordingly.

451
00:51:33,000 --> 00:51:37,000
Simple trick nobody does this.

452
00:51:37,000 --> 00:51:43,000
But again I think this is something of the relational guys will eventually have to eventually have to add.

453
00:51:43,000 --> 00:51:59,000
So here's a graph here's some graphs from this again the paper that I mentioned from the dr. Meek eyes where the comparing is new Neo4j they're comparing against the extended version of ducty with PGQ or SQL PGQ and I think they only implemented worst case optimal joint.

454
00:51:59,000 --> 00:52:07,000
I don't think and they already obviously already have vectorized execution and compression and all the stuff that we talked about so far that dr. Meek has.

455
00:52:07,000 --> 00:52:17,000
And then they compare it against on bra with the try hash and the main takeaways that the Neo4j basically is crushed like these are all log scale right.

456
00:52:17,000 --> 00:52:19,000
So they're running the same.

457
00:52:19,000 --> 00:52:22,000
Same queries for this.

458
00:52:22,000 --> 00:52:32,000
The link data benchmark is something that the see see if it is created with the other graph databases so this is a bunch of workloads that are trying to do.

459
00:52:32,000 --> 00:52:43,000
Pattern matching on on grass structures or the logical graph and again just going down the line for different scale factors Neo4j gets crushed.

460
00:52:43,000 --> 00:52:51,000
And I'm not trying to like you know dunk on Neo4j but like that's the oldest graph database they've raised the most money and they probably like 200 million right.

461
00:52:51,000 --> 00:53:01,000
And this is when you think of graph database people think of Neo4j and you know for millions millions of dollars you know they're getting crushed by you know Ragtag group of Germans although they're the best

462
00:53:01,000 --> 00:53:06,000
Germans and the and the dr. Meek.

463
00:53:06,000 --> 00:53:16,000
Right and that's because again the system even though wasn't they were not originally designed for doing graph graph analytics by taking advantage of all the

464
00:53:16,000 --> 00:53:21,000
oppositions we talked about so far plus the worst case optimal join you know they can crush Neo4j.

465
00:53:21,000 --> 00:53:30,000
Neo4j as far as I know they store like the there's a separate data structure for the vertices and then you have pointers to another data structure that keeps track of edges.

466
00:53:30,000 --> 00:53:31,000
Right yes.

467
00:53:31,000 --> 00:53:38,000
I agree to why is umbra scale back to 30 slower than scale back to 100.

468
00:53:38,000 --> 00:53:47,000
Sorry it's question is why why is umbra slower and scale back to 100 then so why is it faster here than here?

469
00:53:47,000 --> 00:53:52,000
I don't know I have a good look.

470
00:53:52,000 --> 00:54:08,000
Okay so this is this is both a um I think you think both have an advertised for why you want worst case optimal join you want to support these kind of queries but also like why you don't want to use a specialized graph database.

471
00:54:08,000 --> 00:54:24,000
So this is active very active area of research and as I said only a small number of systems actually support worst case optimal joins but I think that's going to change over time and there's new papers coming out all the time there's a new paper out of

472
00:54:24,000 --> 00:54:36,000
University College of London for their sonic join which beats the hash drive join I can post a link to that but this people are actually working this trying to make this go better and I think that

473
00:54:36,000 --> 00:54:52,000
industry typically is you know three or four or five years behind academia on this kind of stuff but I think now it'll be with again with the the sequel extension for graph queries this will get to start rolling out in more systems.

474
00:54:52,000 --> 00:54:58,000
And I guess that once you support SQL PGQ why would you want to use a graph database.

475
00:54:58,000 --> 00:55:10,000
Alright so next class before we jump into the system profiling stuff again we're going to have on Wednesday we're going to have project presentations everyone's going to get five minutes going to try to be more strict on the time so we can get through this.

476
00:55:10,000 --> 00:55:26,000
We're going to reverse order then we went last time I promised and then what we're going to do is we're going to record to resume the talks so that women I can then watch it again and then provide you guys notes and feedback because I didn't do that last time we lost track of everything was so much so we're going to record it on my laptop.

477
00:55:26,000 --> 00:55:34,000
We won't share it outside one person on YouTube and then we'll and then we'll give you feedback this weekend.

478
00:55:34,000 --> 00:55:50,000
Alright so there's a quick run through of how to basically data system profiling and this so these slides are a few years old but all the techniques are basically work and we referencing the system that the previous system we were building but the high level ideas are still the same.

479
00:55:50,000 --> 00:55:57,000
And this is all being sequels plus I don't know I'm assuming rust works the same way.

480
00:55:57,000 --> 00:56:19,000
Alright so let's say we have some some some programs today we said we have two functions food and bar and so we want to be able to speed it up with only debugger so the really simple way to do this is literally open up gdb run run the program and this click you know pause it stop it then do turn up the stack trace figure out what function you're in and just run it.

481
00:56:19,000 --> 00:56:23,000
And then we're in and just record it in the spreadsheet.

482
00:56:23,000 --> 00:56:26,000
It's ghetto but it would it would work right.

483
00:56:26,000 --> 00:56:36,000
So we do this and say that we we pause it ten times get the stack trace and then six out of the time times we were in the function food.

484
00:56:36,000 --> 00:56:46,000
So we can basically say that roughly 60% of the time is of our program based on the data we collected in food.

485
00:56:46,000 --> 00:56:53,000
It's bad but like it's like it would work right you just do it more and more and then you get better samples.

486
00:56:53,000 --> 00:56:56,000
It's a perfect.

487
00:56:56,000 --> 00:57:06,000
Yeah basically yes it's came in this is what perfect does yes but it has hardware support not you sitting with you know the keyboard like this.

488
00:57:06,000 --> 00:57:13,000
Alright so if we say all right food is we're spending all our time in food we don't make that run faster.

489
00:57:13,000 --> 00:57:18,000
What do we do? Well this is omdos law right.

490
00:57:18,000 --> 00:57:25,000
So if we say we're going to make food run two times faster we want to compete with the overall potential speed up it's going to be right.

491
00:57:25,000 --> 00:57:31,000
So we get 60% of our time food jobs on half the 4% of time for the function bar we leave alone.

492
00:57:31,000 --> 00:57:36,000
And so omdos law basically tells us that you know it's going to be whatever the formula here.

493
00:57:36,000 --> 00:57:43,000
One over the 1 over the the percentage time in the thing we're trying to optimize what we're speeding up and then 1 minus the percentage time there.

494
00:57:43,000 --> 00:57:50,000
So do the plug and chuck of the number means that our program run 1.4x faster.

495
00:57:50,000 --> 00:57:58,000
Right back your mind on those law actually works and keep this in you know you want to keep this in mind when you try to figure out what you actually want to optimize for.

496
00:57:58,000 --> 00:58:04,000
So now the question is how do we actually do something better than hitting with the keyboard right.

497
00:58:04,000 --> 00:58:09,000
And a high level there's two approaches. There's we valgrine and perf.

498
00:58:09,000 --> 00:58:24,000
So valgrine is a heavyweight instrumentation of the actual binary itself to basically introduce some timers if you will for different function calls.

499
00:58:24,000 --> 00:58:28,000
And that it's going to collect this what wildlife actual program runs in user space.

500
00:58:28,000 --> 00:58:33,000
And then at the end it spits out of a report you can then visualize and figure out what's going on.

501
00:58:33,000 --> 00:58:34,000
Yes.

502
00:58:34,000 --> 00:58:36,000
And what would you do for code coverage as well?

503
00:58:36,000 --> 00:58:37,000
More or less yes.

504
00:58:37,000 --> 00:58:40,000
But code coverage will tell you what lines are at being executed.

505
00:58:40,000 --> 00:58:43,000
It's not going to tell you what where you're spending the time.

506
00:58:43,000 --> 00:58:47,000
This is the idea is you want to know what the time is. That's what this is.

507
00:58:47,000 --> 00:58:56,000
And in perf is going to basically be a better version of this that's going to use hardware counters which again the CPU is maintaining these encounters about like everything.

508
00:58:56,000 --> 00:59:07,000
L1, L2, L3, cache misses. How many times you get how many branch predictions cycles per instruction number instructions way more things.

509
00:59:07,000 --> 00:59:13,000
The hardware is collecting all this information so you can actually get it for your your program wants running.

510
00:59:13,000 --> 00:59:24,000
And if you compile a symbols you can then have it in the perf report and actually see what the lines are of code and how many times you're being you know running them and how much time you're spending in them.

511
00:59:24,000 --> 00:59:30,000
So valgrine would be a valgrine is what you use back in the day.

512
00:59:30,000 --> 00:59:37,000
It's good sometimes the visualization will look better. It depends on the tool and the purpose what you want to use in a modern you know modern systems.

513
00:59:37,000 --> 00:59:40,000
But it's good at least look at both of them.

514
00:59:40,000 --> 00:59:46,000
So valgrine is actually a collection of tools that you can use to do dynamic analysis.

515
00:59:46,000 --> 00:59:53,000
Memchack would be again looking for leaks. Call grinds which you want to use to figure out how much time you're spending in different parts of the code.

516
00:59:53,000 --> 01:00:03,000
And then if you wanted to keep track of like what parts of the code are allocating this memory over time you would use the tool called massive.

517
01:00:03,000 --> 01:00:10,000
So to use call grind you basically would run your program with a valgrine command line.

518
01:00:10,000 --> 01:00:21,000
Tell it I want to run call grind tool. There's additional flags of how how verbose or how detailed you want the report to be when it runs runs your code.

519
01:00:21,000 --> 01:00:31,000
And then this is going to spit out this call grind out file. And then you can use a visualization tool like K cash grind to see something like this and you get a nice.

520
01:00:31,000 --> 01:00:37,000
As visualization for here's all the functions the functions calling this this other function how many times has been in vote.

521
01:00:37,000 --> 01:00:41,000
What percentage of the execution of the program was spent in that time right.

522
01:00:41,000 --> 01:00:46,000
So here you see that again the the the the human distribution of all the time being spent in different parts of the code.

523
01:00:46,000 --> 01:00:51,000
Again you'll see you know when you call libraries that are pre compiled that you don't have symbols for.

524
01:00:51,000 --> 01:00:54,000
You might just see the library name and like a memory address.

525
01:00:54,000 --> 01:00:59,000
Right so there's there's ways to try to get that if you can use libraries that you compile yourselves.

526
01:00:59,000 --> 01:01:05,000
And then again here we see the call graph view and they can drill into each of these and see additional information.

527
01:01:05,000 --> 01:01:09,000
But again so this is going to be done like it generates this information while your program is running.

528
01:01:09,000 --> 01:01:15,000
It doesn't have any special privileges and there's no harbor to make make things run better so your program is actually going to run slower.

529
01:01:15,000 --> 01:01:24,000
So the timing could actually quite off like the wall clock time versus what the real like when you when you run with call grind turned on versus like just running by yourself.

530
01:01:24,000 --> 01:01:27,000
The timing can be off and so for.

531
01:01:27,000 --> 01:01:36,000
This matters a lot for race conditions and other things you may not experience the problems you would see when you run without call grind because it's just running so much slowly.

532
01:01:36,000 --> 01:01:44,000
Well you may see issues in this in this run that you wouldn't see in the production run.

533
01:01:44,000 --> 01:01:47,000
So the the better approaches you perf.

534
01:01:47,000 --> 01:01:54,000
Again for this one I think you need root privileges because you have to get you have to have permissions to get stuff get the counters from the hardware.

535
01:01:54,000 --> 01:02:01,000
The basic idea is that you're going to start your program with word perf you can specify how many cycles.

536
01:02:01,000 --> 01:02:11,000
How often you want to go check for events and you know how much detail you want the traces to be right there's a bunch of different flags for these things.

537
01:02:11,000 --> 01:02:22,000
And then the is going to run your program I think it runs about the same speed but again it has to materialize these results somewhere right so it has to start running to disk for this dump file.

538
01:02:22,000 --> 01:02:31,000
So like if you're if your program sensitive to like disk IO then this can interfere a little bit but it's not as heavy weight as as call run.

539
01:02:31,000 --> 01:02:40,000
So then after you run your program in the directory where you ran perf there'll be like a dot dump file or has some kind of dot perf name.

540
01:02:40,000 --> 01:02:51,000
And then you just use this this perf report tool and then that'll give you a sort of visualization like this where again you'll see this is actually measuring the time being spent.

541
01:02:51,000 --> 01:03:02,000
So you'll see that the you know the rank list at the top the ones we're spending most of the time and then you can drill into them and if you compile symbols you'd actually see the lines of code generated these things.

542
01:03:02,000 --> 01:03:15,000
So cumulative events and then additional things you can click enter you'll see how often you know what's actually what were you spending your time standing call ground you can see lines of code again this is this is going to be way better.

543
01:03:15,000 --> 01:03:26,000
So this is this is this is probably two or three now maybe four or five years old because before we named this is a noise page we named it after my dog so that's why see the tear name in there.

544
01:03:26,000 --> 01:03:33,000
But this is this is some benchmark we added to see how fast we can you know we can do reads across multiple threads.

545
01:03:33,000 --> 01:03:51,000
And there's other third party tools like hotspot and that's a you know you'll see nice things like this we ever see these flame grass these flame grass to be generated by by tools based on perf right and now you can see where you know we're just spending most of your time in.

546
01:03:51,000 --> 01:04:03,000
Right and then this is what this is just saying what would you say things you want to measure so this one measuring cycles last level cashmases see utilization all bunch of stuff you can tell purple you want to collect.

547
01:04:03,000 --> 01:04:14,000
So much of these links in slides here you go for long and I'm assuming there's there's hooks to do this in rust what now.

548
01:04:14,000 --> 01:04:17,000
If you use cargo flame brush you get a really nice.

549
01:04:17,000 --> 01:04:26,000
He says if you use cargo flame you have to get nice thing we have and that's assuming that's running perf at yeah underneath covers but you need room privileges I think to run perf.

550
01:04:26,000 --> 01:04:29,000
I think you actually just sell a good environment variable.

551
01:04:29,000 --> 01:04:30,000
Okay.

552
01:04:30,000 --> 01:04:41,000
It's in a pile I think it's different.

553
01:04:41,000 --> 01:04:46,000
I think for low level hard work counters you need you need you need to measure the privileges.

554
01:04:46,000 --> 01:04:56,000
Okay and any questions about performance counters yes yes.

555
01:04:56,000 --> 01:05:03,000
What do you mean sorry.

556
01:05:03,000 --> 01:05:12,000
So questions how would you use perfect optimize one single function right so you would get say say you just come in line get perfor port if you have this one function so one you can find the function in here.

557
01:05:12,000 --> 01:05:22,000
But then you can drill that you this is not this is obviously a screenshot you can drill into that function and it'll show you the lines of code and how much time you're running and how much time you're spending in it.

558
01:05:22,000 --> 01:05:35,000
And they can use that to figure out where you're you know where you're wasting your time and it could be because like you're calling malachala or something stupid in a way you think you're calling and then you can then refactor and optimize that.

559
01:05:35,000 --> 01:05:39,000
You can count by cycle civilization let the catch misses.

560
01:05:39,000 --> 01:06:04,000
I think I don't think you get memory allocations in this till bees would be another one you would care about right and those are all the the plan is trying to make is it gives perfect record things not that call grind can't about why your program is slow call grind will tell you how much time you're spending and how many times you invoked a function but it actually can't tell you why that function is slow other than looking and looking the lines of code.

561
01:06:04,000 --> 01:06:08,000
This will give you like the low lower things that we care about yes.

562
01:06:08,000 --> 01:06:28,000
Yeah so this point is like yeah.

563
01:06:28,000 --> 01:06:43,000
I know they think like this is basically this gets everything and you be too much and so his point you can basically put I don't know if they're like kernel programs or whatever like whatever their invocations tell per stop recording now and then when you leave the function turn it off.

564
01:06:43,000 --> 01:06:57,000
But like just running this for everything first for like a small portion of your system will at least tell you what the high level things you want to target first and then you can then drill that into that and say why am I spending too much time which many cycles in this part.

565
01:06:57,000 --> 01:07:02,000
Yeah.

566
01:07:02,000 --> 01:07:09,000
Yeah.

567
01:07:09,000 --> 01:07:16,000
Simples are separate then like compilation optimization right because again you need this.

568
01:07:16,000 --> 01:07:44,000
So you like purple they'll show you the lines of source code then you then get assembly view you actually then see the assembly so then you got like if you want to start a thing on what would it all three do to change my my beautiful seep a little

569
01:07:44,000 --> 01:08:01,000
little less risk of something bizarre yeah look at the assembly there's no other way to do it.

570
01:08:01,000 --> 01:08:15,000
So you're statement is there a way to prevent O3 from majorly writing your function so that you can can debug it.

571
01:08:15,000 --> 01:08:24,000
Yeah.

572
01:08:24,000 --> 01:08:31,000
And that case it could probably be doing the right thing.

573
01:08:31,000 --> 01:08:32,000
Yeah.

574
01:08:32,000 --> 01:08:34,000
We can take this online but like yeah.

575
01:08:34,000 --> 01:08:38,000
Other questions.

576
01:08:38,000 --> 01:08:39,000
Okay. Awesome.

577
01:08:39,000 --> 01:08:40,000
Okay.

578
01:08:40,000 --> 01:08:54,000
Next class presentations and then I mean I'm both of us now I'm happy to talk to you guys want and then make sure you send me the slides and your document before class starts.

579
01:08:54,000 --> 01:08:55,000
Okay.

580
01:08:55,000 --> 01:08:59,000
And I don't think it should be 60 degree weather in February but enjoy it.

581
01:08:59,000 --> 01:09:00,000
Yeah.

582
01:09:00,000 --> 01:09:01,000
You know I'm ready.

583
01:09:01,000 --> 01:09:02,000
Yeah.

584
01:09:02,000 --> 01:09:03,000
Get a belt to get the 40 out of five.

585
01:09:03,000 --> 01:09:06,000
Get a grip take a sip and you'll be picking up bottles.

586
01:09:06,000 --> 01:09:10,000
Ain't ain't no puzzle I'm just a person more man I'm telling the 40 I'm a 40 got four cans.

587
01:09:10,000 --> 01:09:14,000
Stats and six packs on a table and I'm able to see saying I was on the label.

588
01:09:14,000 --> 01:09:16,000
No short for the cross you know what got them.

589
01:09:16,000 --> 01:09:19,000
I take off the cap my friends are tapped on the bottom.

590
01:09:19,000 --> 01:09:21,000
Throw my three in the freezer so I can kill it.

591
01:09:21,000 --> 01:09:22,000
Careful with the bottle baby.

592
01:09:22,000 --> 01:09:23,000
Don't spill it.

593
01:09:23,000 --> 01:09:25,000
Go say no I can say the pain I'm wet.

594
01:09:25,000 --> 01:09:27,000
You drink it down with the gauze little box head.

595
01:09:27,000 --> 01:09:28,000
Take back the pack of drugs.

596
01:09:28,000 --> 01:09:29,000
They go get you some safe now.

597
01:09:29,000 --> 01:09:30,000
So drink it to the front.

598
01:09:30,000 --> 01:09:33,000
Billy Dan just really takes the down with the weak guys.

599
01:09:33,000 --> 01:09:34,000
Feel man to get a can of faith.

600
01:09:34,000 --> 01:09:35,000
Hi.

