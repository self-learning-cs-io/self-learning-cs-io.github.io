---
title: CMU15721 P5S202404 QueryExecutionProcessingPart1CMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Carnegie Mellon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio board.

3
00:00:09,000 --> 00:00:16,000
Today we're not just talking about

4
00:00:16,000 --> 00:00:18,000
actually exiting queries.

5
00:00:18,000 --> 00:00:21,000
So the last two classes,

6
00:00:21,000 --> 00:00:25,000
the last two classes were focusing on

7
00:00:25,000 --> 00:00:27,000
what the data is actually going to look like.

8
00:00:27,000 --> 00:00:31,000
And we were designing our encoding schemes in such a way that when we actually

9
00:00:31,000 --> 00:00:35,000
start running the queries, we would minimize the amount of data we have to fetch

10
00:00:35,000 --> 00:00:38,000
from disk or remote object store and bring that into memory.

11
00:00:38,000 --> 00:00:43,000
And we can be clever about encoding our data in certain ways that we can

12
00:00:43,000 --> 00:00:49,000
ideally do our processing on it in its encoded form or in its compressed form.

13
00:00:49,000 --> 00:00:53,000
RLE's and obviously one, but there's other ways we should have to do this as well.

14
00:00:54,000 --> 00:00:57,000
And so for the next couple of weeks, we're going to talk about how we actually

15
00:00:57,000 --> 00:00:59,000
are going to execute queries.

16
00:00:59,000 --> 00:01:03,000
And again, in the O-Lat world, it's all about sequential scans.

17
00:01:03,000 --> 00:01:05,000
We're not going to do index lookups.

18
00:01:05,000 --> 00:01:07,000
We're ignoring bitmap indexes and other things.

19
00:01:07,000 --> 00:01:10,000
There is going to be a B-Best tree to go find us single

20
00:01:10,000 --> 00:01:11,000
things, single records.

21
00:01:11,000 --> 00:01:14,000
We're going to have to scan through large chunks of data.

22
00:01:14,000 --> 00:01:18,000
So this is that again, that list of what I showed a couple of weeks ago.

23
00:01:18,000 --> 00:01:22,000
Here's the bag of techniques or tricks we can do to make

24
00:01:22,000 --> 00:01:23,000
sequential scans run faster.

25
00:01:23,000 --> 00:01:28,000
As I said, we're not going to discuss material that is view and clustering

26
00:01:28,000 --> 00:01:29,000
sorting in this semester.

27
00:01:29,000 --> 00:01:32,000
But we've already just data encoding compression.

28
00:01:32,000 --> 00:01:34,000
We've already discussed a little bit about data skipping.

29
00:01:34,000 --> 00:01:38,000
Like how do you use zone maps to say, here's the minmax of this giant block of data

30
00:01:38,000 --> 00:01:44,000
and check to see whether the tuple you're looking for or any tuple that could be in that block

31
00:01:44,000 --> 00:01:45,000
based on that unzone map.

32
00:01:45,000 --> 00:01:48,000
So for the rest of the semester, we're going to go through all of these.

33
00:01:48,000 --> 00:01:51,000
And it's not going to be like, here's a lecture on test parallelization.

34
00:01:52,000 --> 00:01:54,000
Here's a lecture on query parallelization.

35
00:01:54,000 --> 00:01:59,000
It's going to come up in different points throughout the entire semester.

36
00:01:59,000 --> 00:02:04,000
Sometimes we'll delay discussing certain things, and then we'll have to bring in

37
00:02:04,000 --> 00:02:08,000
this bag of tricks for discuss how to do joins efficiently or how to do code

38
00:02:08,000 --> 00:02:09,000
specialization, other things.

39
00:02:09,000 --> 00:02:15,000
So again, we'll go through these throughout the semester.

40
00:02:15,000 --> 00:02:20,000
So at its core, what this class is somewhat really about is how to build a database

41
00:02:20,000 --> 00:02:25,000
system to run efficiently on your data for given set of queries.

42
00:02:25,000 --> 00:02:30,000
And the idea here is that we want to make the full use of the hardware that's available to us.

43
00:02:30,000 --> 00:02:37,000
So again, we can run queries fast and at a lower cost than otherwise doing something stupid.

44
00:02:37,000 --> 00:02:42,000
And so all of the things I showed on the last slide, there's not one I can point to

45
00:02:42,000 --> 00:02:46,000
and say, hey, if you're building a brand new system, here's the one thing you want to do above

46
00:02:46,000 --> 00:02:47,000
everything else.

47
00:02:48,000 --> 00:02:52,000
Just briefly going back to it, all these things matter, all these things are going to be

48
00:02:52,000 --> 00:02:56,000
accumulative or multiplicative where we can add them on top of each other and get better results

49
00:02:56,000 --> 00:02:58,000
and make things run faster.

50
00:02:58,000 --> 00:03:03,000
And so it's really about understanding from engineering perspective what are the trade

51
00:03:03,000 --> 00:03:08,000
offs that one of these techniques could make, both in terms of the performance costs and

52
00:03:08,000 --> 00:03:10,000
actually the engineering costs.

53
00:03:10,000 --> 00:03:13,000
How much time is it going to make for some actually to build this and maintain it as

54
00:03:13,000 --> 00:03:15,000
another big problem as well.

55
00:03:16,000 --> 00:03:20,000
So the spoiler is going to be just in time query compilation, amazing results,

56
00:03:20,000 --> 00:03:25,000
you'll get really fast, but it's a big pain to maintain and build.

57
00:03:25,000 --> 00:03:30,000
And so therefore most systems are going to use precompiled primitives or operations.

58
00:03:30,000 --> 00:03:32,000
This is actually with a vector wise paper.

59
00:03:32,000 --> 00:03:35,000
I don't think they didn't mention in that paper, but it's one of the techniques that they used.

60
00:03:35,000 --> 00:03:42,000
So this is not a scientific list of what I think the top three optimizations from the previous list.

61
00:03:43,000 --> 00:03:45,000
These aren't the ones that I think they're going to matter most.

62
00:03:45,000 --> 00:03:49,000
In the context of query execution, these are going to matter, obviously data skipping,

63
00:03:49,000 --> 00:03:54,000
like if you're looking for a thing that's not in any possible block in your zone map can help you

64
00:03:54,000 --> 00:03:58,000
help you avoid reading any data, like nothing you go faster than that and reading nothing.

65
00:03:58,000 --> 00:04:02,000
But if you actually do have to run queries, these are the ones I think are going to matter most.

66
00:04:02,000 --> 00:04:07,000
So we'll spend a little bit time talking about vectorization, not actually the vectorized algorithms

67
00:04:07,000 --> 00:04:10,000
to do our query operators that will come in a week.

68
00:04:11,000 --> 00:04:18,000
Today is really setting up the query processing model so that we can then feed data in such a way that we can vectorize them.

69
00:04:18,000 --> 00:04:23,000
Task parallelization, we'll talk about today is basically how to take a query, break it up to disjoint tasks,

70
00:04:23,000 --> 00:04:28,000
and run them in parallel, with different cores, different threads, different nodes.

71
00:04:28,000 --> 00:04:32,000
And then code specialization, again, well this will be a big thing starting next week.

72
00:04:32,000 --> 00:04:37,000
Basically how can we avoid giant switch statements and indirection in our database system

73
00:04:38,000 --> 00:04:45,000
by having exactly what the query wants to use or the instructions of the query wants to use process the data.

74
00:04:45,000 --> 00:04:48,000
Again, we'll see the two ways to do this.

75
00:04:50,000 --> 00:04:54,000
So at a high level optimization goals are going to be the following three things.

76
00:04:54,000 --> 00:05:01,000
So in order to get queries run fast, the most obvious thing we can do is just reduce the number of instructions we have to use to execute it.

77
00:05:02,000 --> 00:05:07,000
We want to use fewer instructions on the CPU to run the query in the same manner work.

78
00:05:07,000 --> 00:05:10,000
The compiler can help a little bit.

79
00:05:10,000 --> 00:05:16,000
If you pass in the O2 flag, I don't know what the equivalent is in Rust, but you pass over to, and GCC and Clang,

80
00:05:16,000 --> 00:05:21,000
it'll be more aggressive in trying to optimize things so that you'll get fewer instructions.

81
00:05:21,000 --> 00:05:28,000
As far as I know, people particularly don't ship production databases with O3 enabled, O3 compilations,

82
00:05:29,000 --> 00:05:34,000
because things can get kind of hairy, but can reorder things in a way that will be incorrect.

83
00:05:34,000 --> 00:05:42,000
So instead, what we're going to do is try to design our database system, design our execution engine, just to use fewer instructions.

84
00:05:42,000 --> 00:05:48,000
If you don't take my word, you don't want to ship O3, this is from the Linux mailing list two or three years ago,

85
00:05:48,000 --> 00:05:53,000
and basically Linus is saying here he thinks O3 is generally unsafe.

86
00:05:54,000 --> 00:05:59,000
So again, as far as the database systems will ship with O2, enable compilations.

87
00:05:59,000 --> 00:06:04,000
So after we've reduced the instructions that we want to use to execute queries,

88
00:06:04,000 --> 00:06:08,000
the next thing we can do is try to reduce the number of cycles per instruction.

89
00:06:08,000 --> 00:06:13,000
The idea here is that when we actually have to execute instructions to run a query,

90
00:06:13,000 --> 00:06:20,000
we want the data that it's going to need to operate on to process to be in L1, L2 cache,

91
00:06:20,000 --> 00:06:23,000
even better would be CPU registers.

92
00:06:23,000 --> 00:06:29,000
And that means we want to reduce cache misses due to memory lows and stores.

93
00:06:29,000 --> 00:06:35,000
We want to maximize the locality of the data that we're going to process on in our operators in our query plan,

94
00:06:35,000 --> 00:06:40,000
so that they're going to sit in the CPU caches, and we'll see how to do this through pipelining,

95
00:06:40,000 --> 00:06:46,000
and more aggressively with operator fusion in push-based query execution.

96
00:06:47,000 --> 00:06:54,000
So the weird thing about this, not weird, but the thing why this one's going to be tricky,

97
00:06:54,000 --> 00:06:56,000
everyone can reason out this, the first one.

98
00:06:56,000 --> 00:06:58,000
Run few instructions, don't do stupid things.

99
00:06:58,000 --> 00:07:02,000
Don't make library calls, start computing pived, unnecessarily running a query.

100
00:07:02,000 --> 00:07:04,000
That's obviously stupid, but things like that.

101
00:07:04,000 --> 00:07:06,000
This one's a bit more tricky.

102
00:07:06,000 --> 00:07:10,000
And the reason why this can be tricky is because we as humans,

103
00:07:10,000 --> 00:07:13,000
the way we naturally write system code or code,

104
00:07:14,000 --> 00:07:18,000
is not going to be always the best way that the CPU actually wants that code,

105
00:07:18,000 --> 00:07:20,000
or wants to run instructions.

106
00:07:20,000 --> 00:07:24,000
Because the out-of-order, super-scaler, CPU, which we'll cover in a second,

107
00:07:24,000 --> 00:07:28,000
what is ideal for humans for us to reason about and maintain software,

108
00:07:28,000 --> 00:07:30,000
may actually be the worst thing for the CPU.

109
00:07:30,000 --> 00:07:34,000
So we'll have to look at what the algorithms we're going to use when we run out queries or build our system

110
00:07:34,000 --> 00:07:38,000
to make sure that we account for what the CPU expects or wants

111
00:07:38,000 --> 00:07:41,000
and try to design the code in such a way that it generates that for us.

112
00:07:42,000 --> 00:07:44,000
Because the compiler isn't always going to magically do that for us.

113
00:07:46,000 --> 00:07:48,000
And the last one is obvious as well.

114
00:07:48,000 --> 00:07:52,000
We want to parallelize execution, more as law, it is more or less ending.

115
00:07:52,000 --> 00:07:54,000
And we're not getting faster clock speeds,

116
00:07:54,000 --> 00:07:57,000
although Intel is more recently rationing that up.

117
00:07:57,000 --> 00:07:59,000
But we're going to get a lot more courts.

118
00:07:59,000 --> 00:08:02,000
And the cool thing about this is that on newer CPUs,

119
00:08:02,000 --> 00:08:06,000
there's a mix of the high performance cores and the efficiency cores.

120
00:08:06,000 --> 00:08:10,000
So now we can, in theory, start scheduling things based on one core versus another.

121
00:08:11,000 --> 00:08:15,000
Then you throw in GPUs and those things have tens of thousands for cores, which is insane.

122
00:08:15,000 --> 00:08:20,000
So we're going to cover all of these throughout the lecture.

123
00:08:20,000 --> 00:08:24,000
Today we'll talk a little bit about how to do this one, the second one.

124
00:08:24,000 --> 00:08:27,000
And this last one a little bit.

125
00:08:27,000 --> 00:08:30,000
The first one we'll see this when we talk about code specialization,

126
00:08:30,000 --> 00:08:33,000
query compilation, and precompiled and jitted.

127
00:08:35,000 --> 00:08:39,000
So just make sure we're all using the same terminology of vernacular

128
00:08:39,000 --> 00:08:43,000
when we're describing queries and what we're actually going to be executing.

129
00:08:43,000 --> 00:08:46,000
You can think of a query plan as a DAGO operators.

130
00:08:46,000 --> 00:08:50,000
So we have a SQL query here, and we converted it into a physical plan.

131
00:08:50,000 --> 00:08:54,000
So we have scans in the bottom, then our projections feeding to a join,

132
00:08:54,000 --> 00:09:01,000
followed by a, that's the projection type, the filters, join, and then projection.

133
00:09:01,000 --> 00:09:04,000
So these are the operators that we're going to have in a query plan.

134
00:09:05,000 --> 00:09:10,000
And then the database system is going to convert them into operator instances

135
00:09:10,000 --> 00:09:13,000
that are going to be invocations of that operator.

136
00:09:13,000 --> 00:09:16,000
And the reason why we have the distinguished operator instance and operators

137
00:09:16,000 --> 00:09:20,000
is because we could have an operator run in parallel.

138
00:09:20,000 --> 00:09:23,000
This table is the billion tuples.

139
00:09:23,000 --> 00:09:27,000
I could divide it up this scan operator into 10 operator instances

140
00:09:27,000 --> 00:09:32,000
that are each going to scan different row groups, different files, and S3.

141
00:09:34,000 --> 00:09:38,000
And task is going to be a sequence of one or more operator instances.

142
00:09:38,000 --> 00:09:41,000
And this will basically be the same thing as pipelines, but not always.

143
00:09:41,000 --> 00:09:45,000
It's basically, you're going to recognize that, oh, as soon as I do the scan,

144
00:09:45,000 --> 00:09:46,000
I immediately want to do the filter.

145
00:09:46,000 --> 00:09:49,000
So I can combine these two operator instances together in a single task.

146
00:09:49,000 --> 00:09:53,000
And that's what's getting scheduled by the system to run.

147
00:09:53,000 --> 00:09:57,000
And then a task set will be just a collection of these extracurital tasks

148
00:09:57,000 --> 00:10:02,000
we could have for this pipeline that we could then ship out to the different course.

149
00:10:03,000 --> 00:10:07,000
So the pipelines are going to be important part of what we talk about today and go in forward.

150
00:10:07,000 --> 00:10:11,000
And so again, the pipeline is the boundary in our query plan that specifies

151
00:10:11,000 --> 00:10:16,000
how much we can process a single tuple or batch of tuples or set of tuples

152
00:10:16,000 --> 00:10:21,000
up through the query plan to at some point we reach an operator where we need to see

153
00:10:21,000 --> 00:10:27,000
all the other tuples within our pipeline before we can proceed up into the query plan.

154
00:10:28,000 --> 00:10:31,000
So in this side here, we're doing the scan on A, then the filter,

155
00:10:31,000 --> 00:10:36,000
and assume the build side of the hash join, the build side here is part of this pipeline.

156
00:10:36,000 --> 00:10:41,000
Like I can't send any tuple up beyond the join until I see what comes on the other side.

157
00:10:41,000 --> 00:10:47,000
So assuming I execute pipeline one, again, whether it's a single task or multiple task running parallel,

158
00:10:47,000 --> 00:10:49,000
it doesn't matter at this point.

159
00:10:49,000 --> 00:10:51,000
And then once that's complete, I can then run pipeline two.

160
00:10:51,000 --> 00:10:53,000
And now pipeline two could do the filter.

161
00:10:53,000 --> 00:10:56,000
So I do the scan on B filter and then do the probe in the hash join.

162
00:10:57,000 --> 00:11:03,000
And now we know that any tuple that matches in the join can then be pushed up to the projection operator as part of the output.

163
00:11:03,000 --> 00:11:12,000
I don't want to start running the join, I start probing the join on this query until I've populated everything on the A side

164
00:11:12,000 --> 00:11:14,000
because otherwise I could have false negatives.

165
00:11:14,000 --> 00:11:18,000
Now, I'm showing this pipeline all the way up on one side.

166
00:11:18,000 --> 00:11:23,000
That's ideally what we're going to want to do to maximize the reuse of data,

167
00:11:23,000 --> 00:11:27,000
like to minimize the number of cycles for tuple as we go along.

168
00:11:27,000 --> 00:11:34,000
But I could have just done the scan on A and then filter it, you know, materialize the output, scan on B, filter it,

169
00:11:34,000 --> 00:11:37,000
materialize the output, and then have these be two separate pipelines.

170
00:11:37,000 --> 00:11:40,000
And then a third pipeline could then be, okay, let me actually do the join.

171
00:11:40,000 --> 00:11:42,000
That actually would be slow.

172
00:11:42,000 --> 00:11:49,000
Basically, running much of data between these two pipelines, where it's better off to do a pipeline that tries to get all the way to the top.

173
00:11:50,000 --> 00:11:57,000
Again, we'll see why this matters when we start doing operator fusion and other techniques.

174
00:11:57,000 --> 00:12:05,000
We're going to allow you to potentially start executing the join on the thread or another CPU core while you're still executing to filter.

175
00:12:05,000 --> 00:12:12,000
So you're saying that couldn't you start running the join at the same time or are you still scanning A and B?

176
00:12:12,000 --> 00:12:20,000
Yeah, where there would be more bandwidth, certainly, but like maybe that the whole thing finished faster because we're taking better advantage of parallel threads.

177
00:12:20,000 --> 00:12:26,000
So let's say that the very last tuple, ignore parallel threads, so ignore multiple operating instances.

178
00:12:26,000 --> 00:12:32,000
One, this thing's running myself. The very last tuple that you see in A is the only tuple that's going to match in B.

179
00:12:32,000 --> 00:12:39,000
But if I start probing into this hash table before I finish scanning A, I could have a false negative because I didn't put that tuple last tuple in.

180
00:12:40,000 --> 00:12:43,000
Yeah, you can't do that. What's that?

181
00:12:45,000 --> 00:12:49,000
You're still building A but you can't check to see whether something exists until it's populated.

182
00:12:53,000 --> 00:12:56,000
That's his question. Can you start pipeline two before you start pipeline one?

183
00:12:56,000 --> 00:13:04,000
That would be, again, the problem I said earlier, if I start scanning B, start filtering it, what do I do with that output?

184
00:13:05,000 --> 00:13:13,000
It's got to go somewhere. I'm just writing to the disk memory and that's the pressure for the overall system.

185
00:13:13,000 --> 00:13:20,000
It's a better idea to maybe run this in parallel, populate the hash table, then run B.

186
00:13:21,000 --> 00:13:31,000
Okay. So, lots of stuff today, but I want to first start talking about the paper you guys read.

187
00:13:31,000 --> 00:13:48,000
It's an older paper, but it's very important. It's very seminal about why the designs of database systems at the time when the paper is written in 2005 are insufficient for, if you want to run OLAP queries,

188
00:13:49,000 --> 00:13:55,000
high performance OLAP queries. Why am I making you read a paper that is almost old as some of you guys here?

189
00:13:55,000 --> 00:14:06,000
19 years old now. Because that paper is seminal, meaning every OLAP system that's around today, for the most part, followed the design guidelines that was laid up by that paper.

190
00:14:06,000 --> 00:14:14,000
And everything with some exception about the IT name stuff, which you can talk about in a second, the core ideas still matter a lot.

191
00:14:15,000 --> 00:14:23,000
Then we'll talk about processing models, the plan processing directions, whether it's in bottoms up or top down or pushed over to the pool.

192
00:14:23,000 --> 00:14:27,000
Filter reposition, we'll talk about that a little bit this, we'll talk about that when we talk about vectorization next week.

193
00:14:27,000 --> 00:14:35,000
But basically, when I start applying predicates and I start matching tuples and tuples don't match, what do I actually store when I go from the operative to the next?

194
00:14:35,000 --> 00:14:39,000
And then we have time we'll finish up the different modes of parallel execution.

195
00:14:40,000 --> 00:14:48,000
The idea is, again, we're going to talk about how do you architect the system so that you can run these tasks or the operative instances in parallel.

196
00:14:48,000 --> 00:15:00,000
And then in a few weeks we'll then cover how do you implement the algorithms that then the implementation itself to do parallel execution, for joins and sorting.

197
00:15:01,000 --> 00:15:13,000
So again, the the the the the melody BX 100 paper is from 2005 and it's essentially a low level analysis of the of for in memory for in memory workloads.

198
00:15:13,000 --> 00:15:27,000
What what are the bottom next you're going to face when you want to run OLAP queries, right? And the idea the big idea of the thing you break through was they looked at all these existing systems at the time and showed how if you want to run OLAP queries, right,

199
00:15:27,000 --> 00:15:40,000
running large scans over and doing joins and so forth that there are the existing systems at the time are certainly not well designed for the modern out of order super scalar CPU architectures that Intel was putting out at the time.

200
00:15:40,000 --> 00:15:56,000
Right. And the idea is that if you can redesign your database, that's the better target for what the CPU wants from you, what what kind of you know if you design the system itself, how data flows through it, what instructions you're calling and when, then you get much, much better performance because

201
00:15:56,000 --> 00:16:10,000
your designing system such a way that the CPU is is happier, right? Instead of you as a programmer trying to make things easier for yourself and it was hard for the CPU, you make life slightly harder for yourself and the CPU can run much, much more efficiently.

202
00:16:11,000 --> 00:16:24,000
So what happened was the the back on the story is that there was this project out of C2Y where this paper came from for call, Moneady to be the days in the 90s and basically they were doing some experiments on it, they realized that

203
00:16:24,000 --> 00:16:44,000
oh, the way, you know, the way they're going to do the processing model and send the entire columns from one operative next, that's terrible for the CPU and there's all this in direction things much slower. So they built this X100 prototype, they then spun it out as a startup called vector wise that was acquired by acting in 2010.

204
00:16:44,000 --> 00:16:53,000
They got then rebranded as vector, which I think it's a terrible name for a database because you search vector database, you're not going to get this thing, you're going to get re-vying, pine cone, all these other ones.

205
00:16:54,000 --> 00:17:12,000
Then the cloud version of vector wise is now called Adelante. Then acting got bought by, I think Indian holding company HCO two years ago, wish, right? And so it's still there. Acting is also the original is what ingress became so ingress got bought and sold over the various years.

206
00:17:12,000 --> 00:17:26,000
And then at some point, it got rebranded to act in and they kept sort of had these older databases. And then vector wise was the sort of the high performance column, it's column store engine for ingress. And then it got rebranded.

207
00:17:27,000 --> 00:17:41,000
But anyway, so again, the reason why I can, I had you guys read this paper even though it's from 2005 is because this is, you know, this is how you want to design a system even today. Now there's all this other stuff about itanium, which I'm assuming that's a CPU architecture that no one actually who here is her titanium one.

208
00:17:42,000 --> 00:18:09,000
It's basically, it was like, it was another super scaler CPU from Intel in collaboration with HP like the 2000s. It was meant to replace x86, right? But it had like this massive like pipeline. It did things a little bit different than how we, you know, zion's work today. But it didn't go anywhere. They coat it off. And so we'll say this maybe some other papers to this other Intel hardware that people sort of target that doesn't exist anymore. We don't care about. But the high level idea is actually, actually matter.

209
00:18:09,000 --> 00:18:19,000
And again, just to show you that this paper, even though it's from 2005, it's still timely. Earlier in this year, at CITER, this paper won the test of time award.

210
00:18:19,000 --> 00:18:29,000
So because the research community recognized how important this paper was and how this has massive influence in this in the database marketplace for OLEC queries.

211
00:18:29,000 --> 00:18:42,000
Right, so that's right there that's Peter Bonds. That's the, it's the guy that, you know, it did the early work of an ADB did the work early working vector wise. Now he's a technically intern at mother duck, but he did early work on duck DB.

212
00:18:42,000 --> 00:18:57,000
Nails is the, I think it's the CEO of the money to be company. That's Marsins, the Kowski. So after vector wise got bought by acting, he then went and formed snowflake. A lot of the ideas that are in this paper is what snowflakes based on. Right.

213
00:18:57,000 --> 00:19:12,000
We'll cover him later. That's magna pat Helen. She's a do you know, but he's at Salesforce. That's the guy invented a poker. He met a patchy flink. We're not gonna cover flink, but anyway. Again, this paper is super, super influential.

214
00:19:13,000 --> 00:19:26,000
All right, so this is sort of a crash course in what CPUs look like and just for like what it matters for us as database people, right. So is there everything you need to know in like two slides at a high level.

215
00:19:26,000 --> 00:19:38,000
So the, the CPU is basically an order line organized the execution instructions to these pipeline stages and the, the CPU is basic goal is to try to keep this pipeline busy at all times.

216
00:19:38,000 --> 00:19:52,000
There's always something to do, right. So that means that if there are instructions that you can't complete in the single cycle, it's going to try to keep executing things in the pipeline because it's, you know, there's a catch miss. It's got to fetch the memory. So it's always going to try to keep executing things.

217
00:19:53,000 --> 00:20:08,000
And in a super scale CPU architecture, there's been multiple pipelines running at the same time in parallel. And so they're going to run slightly out of order, meaning like the instructions may execute differently than the order that they appear in the code.

218
00:20:08,000 --> 00:20:21,000
But then the CPU, at least in case of Zions, are going to a bunch of extra work to make sure that once you get all the data that you needed, you then check to see whether the output of these adult instructions would have matched the same as it was.

219
00:20:22,000 --> 00:20:32,000
So that's the reason why it ran in order, right. AMD is doing such a thing, same thing, like all the super scale CPUs are doing, essentially the same thing. The GPU cores are not.

220
00:20:32,000 --> 00:20:41,000
Okay, precisely what does it do is super scale, multiple cores, multiple pipelines. So within one core, you'll have multiple pipelines.

221
00:20:41,000 --> 00:20:46,000
That's okay. Yeah. One core. Yes. But then what?

222
00:20:46,000 --> 00:20:49,000
What CPUs are not.

223
00:20:49,000 --> 00:20:58,000
So where did you say that? The 90s. Yeah, the 90s. But GPU cores, I don't think do this as well. Right.

224
00:20:58,000 --> 00:21:10,000
Right. Because this is actually really complex to do. You're like basically, it's the same thing as like optimistic or commercial for transactions. You're assuming everything's going to be okay. You let things run sort of specularly.

225
00:21:10,000 --> 00:21:18,000
And then you just to check at the end did it actually match out. Right. So this is fantastic. Right. Everything works great when when you get it right.

226
00:21:18,000 --> 00:21:35,000
And if the CPU recognizes that there's a dependency, like I need to know the output of one instruction, but more to do the next instruction. Or if I do a misprediction. Right. Meaning like there's an if clause. It sees that and says, you know, a branch construction.

227
00:21:35,000 --> 00:21:44,000
It sees that and tries to predict which path down the branch you're going to go. Like if then else, it tries to pick which one you're going to go and then specically executes whatever things the path that you're going to take.

228
00:21:44,000 --> 00:21:52,000
And then if you get it wrong, you have to flush the pipeline and roll everything back and restart. And that's really expensive.

229
00:21:52,000 --> 00:22:02,000
So again, these stairs can occur in the two ways I just said about. So one is dependencies, right. If one instruction depends on the output of another instruction, then you can't.

230
00:22:02,000 --> 00:22:07,000
You can't immediately put that in the same pipeline. Right. You get the stall and wait. Yes.

231
00:22:07,000 --> 00:22:14,000
So one pipeline corresponds to one or because you think cycle, you take a one or four items from each pipeline.

232
00:22:14,000 --> 00:22:21,000
There's one pipeline card that's going to each one core. No, every quarter, multiple pipelines.

233
00:22:21,000 --> 00:22:24,000
The pipelines are short. I think like.

234
00:22:24,000 --> 00:22:31,000
I think the latest young are like 20 instructions on a pipeline. We're not like the.

235
00:22:31,000 --> 00:22:37,000
And the X100 paper, they talk about how like I think the penny and four is one of them have like 31 instructions.

236
00:22:37,000 --> 00:22:42,000
It was insane. They're now more reasonable. But again, if you still have one of these.

237
00:22:42,000 --> 00:22:52,000
If it predict something wrong, you got to flush the pipeline unduced off and install until you bring back instructions that you should have executed.

238
00:22:52,000 --> 00:23:08,000
And so in the case of this first one, dependencies, this could occur when there is, you know, if we're scanning a tuple and we need to store the data in an output buffer before we can execute anything else, like we need to know what the result of that computation was before we can go on to do the next.

239
00:23:08,000 --> 00:23:10,000
Yes.

240
00:23:10,000 --> 00:23:21,000
So, uh, it says that the first one says, then it cannot be pushed immediately into the same pipeline. No, because you can't like.

241
00:23:21,000 --> 00:23:28,000
You basically have to wait until he's figured out what's going to happen. Then you put it in. Yeah, but I actually I don't know whether you could have like.

242
00:23:28,000 --> 00:23:30,000
Here's the pipeline. I'm really running. But here's the pipeline.

243
00:23:30,000 --> 00:23:37,000
As soon as I find out with the first one, then I can run the other one. I don't know if it does that. I don't like it does.

244
00:23:37,000 --> 00:23:49,000
The second one is for branch prediction. And this is basically means that like if, as I said, there's an if clause or some kind of conditional statement, it's going to try to predict what you're going to do.

245
00:23:49,000 --> 00:23:58,000
And this part is super sophisticated in CPUs, AMD and Intel. Like this is like the secret sauce of the CPUs and they don't share what exactly the branch predictor is actually doing.

246
00:23:58,000 --> 00:24:04,000
Right, because this entails those, you know, it's very sophisticated. Actually, they all are.

247
00:24:04,000 --> 00:24:15,000
So again, the idea is that if we build our system in such a way that we have a lot of conditionals, we may end up making things worse for us because.

248
00:24:15,000 --> 00:24:24,000
So if you think of like your scanning data, you don't actually know what path you're going to take because it's going to depend on what the query is, like the conditionals or the the wear clause, depend on what your data looks like.

249
00:24:24,000 --> 00:24:33,000
So there's no way that easy way to really predict for every single query what path you're going to take down for different conditions.

250
00:24:33,000 --> 00:24:41,000
So for this last one here, we'll talk a little bit about how to how to fix it. So again, because we have these long pipelines, we're trying to expect it to be branches.

251
00:24:41,000 --> 00:24:53,000
So once the stall, the, sorry, what's the hide these long stalls between spending instructions and going fetching things from, you know, L3 cash, real to cash into our registers, right.

252
00:24:53,000 --> 00:25:00,000
The way the one spot of the data system that's that's this is going to come up a lot is just the basic filter operations when we do sequential scans.

253
00:25:00,000 --> 00:25:09,000
As I said, because it's going to depend on the, the filter basically conditional, like where something, you know, equals something, that's a niff clause.

254
00:25:09,000 --> 00:25:16,000
And whether or not that that predicate is going to be able to true depends on the data.

255
00:25:16,000 --> 00:25:30,000
Right. So this is nearly impossible for, for, you know, even us as the database system, we're actually running the code to predict let alone the CPU because the CPU doesn't know anything about, you know, what a database system is or what a query is.

256
00:25:30,000 --> 00:25:36,000
And I think it may know a compiler hint can potentially use to resolve this.

257
00:25:36,000 --> 00:25:42,000
I don't know what had to do with Ross, but in C++, there's something in the standard.

258
00:25:42,000 --> 00:25:55,000
You can call likely and unlikely. So they have these, these, these compiler directors where you can specify whether a, a conditional clause is going to be our code path is going to be likely or unlikely.

259
00:25:55,000 --> 00:26:01,000
Right. C doesn't have this. They, I think they avoided this. Again, I don't know whether Russ has this.

260
00:26:01,000 --> 00:26:11,000
And this, this is, I did some quick searching to see what systems actually supported click house has this. I know ductybeat does not because they're trying to be portable postgres has this.

261
00:26:11,000 --> 00:26:22,000
Right. But the, these are not hints actually to the CPU. You can't tell the CPU, like the print certificate, hey, I'm lucky to go down this path. Right.

262
00:26:22,000 --> 00:26:38,000
I think Intel had had some capabilities in the early days to do this, but 2006 they took it out. Right. So this is, this is just a hint to the compiler for it to potentially reorganize your code itself so that the likely path is maybe at the top of something. Right.

263
00:26:39,000 --> 00:26:51,000
And then if you read this blog article from a, I think is a compiler engineer at Intel, he basically says don't use this. It's going to make some kinds of action make things worse and it's not often going to actually make things better for you. Right.

264
00:26:52,000 --> 00:26:59,000
So I think the interesting thing we take click house, take all these systems that do use this. Like because they're all just pound of fines. So you just hide it.

265
00:26:59,000 --> 00:27:06,000
You see whether that can make a difference. I have no idea what it is. Okay. It's unstable. Okay. Yes.

266
00:27:06,000 --> 00:27:08,000
I know it's easy.

267
00:27:08,000 --> 00:27:12,000
Yes.

268
00:27:12,000 --> 00:27:17,000
But it's not, but again, it doesn't help the CPU.

269
00:27:17,000 --> 00:27:21,000
So it's not a good thing to do.

270
00:27:21,000 --> 00:27:33,000
I mean for a six or is it like for like embedded? It's for what's that? It's for a six.

271
00:27:33,000 --> 00:27:38,000
So that's like specialized hardware. I have no idea. I'm for Zion's. This doesn't do it.

272
00:27:38,000 --> 00:27:50,000
I'm sorry for the CPU. I mentioned FPGA. So you're saying for the network hardware stuff or for the network boxes. They take heavy advantage of this.

273
00:27:50,000 --> 00:27:56,000
But again, I'm telling you can't you can't tell the CPU that. Yeah, so I don't know what they're doing.

274
00:27:56,000 --> 00:28:02,000
No, it's a compiler director. It's up to the couple. Oh, sure.

275
00:28:02,000 --> 00:28:17,000
It's just changing the order of the assembly so that the likely pass are closer to the top when you go into the conditional.

276
00:28:17,000 --> 00:28:22,000
Again, I don't know what this is custom hardware or not. Like, yeah.

277
00:28:22,000 --> 00:28:26,000
I don't know what this matters for data systems. Not every system needs to use that.

278
00:28:26,000 --> 00:28:30,000
Post-cars, look how stars and a few others do. Yes.

279
00:28:30,000 --> 00:28:36,000
Are there ever any architectures for you? But like give it into the branch of the machine?

280
00:28:36,000 --> 00:28:45,000
Yeah. They're used to be an opcode that you could you could tell the CPU. But that was like 2005 and earlier.

281
00:28:45,000 --> 00:28:55,000
Intel supported it back in the day, but not now.

282
00:28:55,000 --> 00:28:58,000
Because people just like your stupid with it too.

283
00:28:58,000 --> 00:29:06,000
Also, it's a little bit more like how you actually want to see if you want to see if you can set the line to know that that sequence all that I've been talking about.

284
00:29:06,000 --> 00:29:09,000
That's that's been designed for 20 30 years.

285
00:29:09,000 --> 00:29:12,000
It really we are figuring out which one is the case.

286
00:29:12,000 --> 00:29:15,000
So when you do this, you kind of mess with that.

287
00:29:15,000 --> 00:29:21,000
But let's look at a case where like, like, even if you had it, it wouldn't help.

288
00:29:21,000 --> 00:29:27,000
So let's have a simple query here. Select start from table or key is greater than low value and key less than high value.

289
00:29:27,000 --> 00:29:33,000
So this is how you probably write this code. I don't want to show code in slides, but this is simple enough. I think you guys can get it.

290
00:29:33,000 --> 00:29:37,000
This is how you write this code in bus top or a basic implementation.

291
00:29:37,000 --> 00:29:46,000
You have a four-lip iterates over to every two-pool in the table. You go grab the key, then you have the if clause, if key, greater than low and key less than high, then you copy it in the output buffer.

292
00:29:46,000 --> 00:29:50,000
Then you iterate whatever the buffer offset by one.

293
00:29:50,000 --> 00:29:56,000
So what's the problem for the CPU in this code?

294
00:29:56,000 --> 00:29:59,000
The if clause.

295
00:29:59,000 --> 00:30:03,000
So you can rewrite this to not do any branching.

296
00:30:03,000 --> 00:30:09,000
The if clause is going to find a branch and the CPU is going to try to predict, am I going to go down this path or not?

297
00:30:09,000 --> 00:30:18,000
So you can write it like this as a branchless version, where the very first thing you do, as you scan the table, you immediately copy the two-pool in the output buffer.

298
00:30:18,000 --> 00:30:23,000
You don't check to see whether it's going to satisfy the conditional clause.

299
00:30:23,000 --> 00:30:37,000
Then you have this clause here where you then check the low and high, but these are returnary operations where it's going to return 1 or 0, you end the bits together, and then that tells you whether the delta is 0 or 1.

300
00:30:37,000 --> 00:30:44,000
And then in that case, if it's 0, then you would loop back around and just overwrite the last thing you copied.

301
00:30:44,000 --> 00:30:47,000
And again, we said all our columns are fixed length.

302
00:30:47,000 --> 00:30:53,000
So I don't have to worry about, you know, am I going to overflow the buffer or underflow it based on, you know, 1 to 1 of the next.

303
00:30:53,000 --> 00:30:57,000
I just take the bits, plop it down, and it overwrite the previous one.

304
00:30:57,000 --> 00:31:04,000
Now I'm missing a little piece at the end where it says, okay, if I jump out of it, when it come out of the for loop, is the last thing was the last delta 0, 1.

305
00:31:04,000 --> 00:31:09,000
And make sure I don't include that as the output, right?

306
00:31:09,000 --> 00:31:13,000
So this seems bizarre, right? As humans, we were like, this seems super wasteful.

307
00:31:13,000 --> 00:31:17,000
You're copying every single time. It's surely that's more expensive than the, than the if clause, right?

308
00:31:17,000 --> 00:31:22,000
But it's not because the CPU knows how to, you know, this is just deterministic, straight line code.

309
00:31:22,000 --> 00:31:26,000
It can rip through that way, way faster than the branched-miss prediction.

310
00:31:26,000 --> 00:31:27,000
Yes.

311
00:31:27,000 --> 00:31:40,000
So is it question is, oh, is there any advantage of using turneries versus like, I mean, the compiler might just convert it into, to ones and zeros anyway.

312
00:31:40,000 --> 00:31:41,000
If you use bollions.

313
00:31:41,000 --> 00:31:42,000
Right.

314
00:31:42,000 --> 00:31:45,000
I'm saying white is the turner.

315
00:31:45,000 --> 00:31:49,000
Is there any reason you're on this?

316
00:31:49,000 --> 00:31:53,000
Like, like, just move everything between greater than low.

317
00:31:53,000 --> 00:32:00,000
If I did a key greater than, and greater than low and key less than high, 1 or 0.

318
00:32:00,000 --> 00:32:08,000
Yeah, just, yeah, you could, you could, the compiler, this part I'm not worried about, the compiler, the compiler to fix that.

319
00:32:08,000 --> 00:32:10,000
Okay, I was going to think that, no.

320
00:32:10,000 --> 00:32:14,000
The thing I, again, I'm trying to iterate, it's like, you're always copying. That matters.

321
00:32:14,000 --> 00:32:17,000
Right.

322
00:32:17,000 --> 00:32:22,000
So the, again, you think there's be, there's be terrible because the CPU is blindly copying.

323
00:32:22,000 --> 00:32:24,000
But it actually helps.

324
00:32:24,000 --> 00:32:31,000
So this is a, this is from the vector wise people, but this is a few years later in, I think, 2013 or 2012.

325
00:32:31,000 --> 00:32:41,000
This is showing you, for the two different purchases I showed, like, here's performance you give and you get as you vary the selectivity of that, of that wear clause.

326
00:32:41,000 --> 00:32:50,000
So if, if no two pulls are matching on the, on the side here, up to roughly about, you know, 5% selectivity, right.

327
00:32:50,000 --> 00:32:56,000
The branching case is actually faster because the CPU is going to say, oh, not going to match, not going to match over and over again, right.

328
00:32:56,000 --> 00:33:01,000
And the, avoiding that extra copy cost every single time is way faster.

329
00:33:01,000 --> 00:33:08,000
The red line essentially flat because you're just doing the same work every single time, no matter whether the two pulls going to satisfy the product or not.

330
00:33:08,000 --> 00:33:16,000
But then you see this, this nice little, this arch here, where, you know, the height, sorry, the top is roughly roughly about 50%.

331
00:33:16,000 --> 00:33:24,000
And at this point, it's a flip at the coin every single time the CPU is predicting just getting it wrong over and over again.

332
00:33:24,000 --> 00:33:28,000
And then, again, it becomes more selective the CPU can, can figure it out better.

333
00:33:28,000 --> 00:33:33,000
So I had students reproduce this graph. I don't have it in the slides.

334
00:33:33,000 --> 00:33:41,000
Basically, six years ago, five, five, six years ago, we basically saw the same thing on newer CPUs, right.

335
00:33:41,000 --> 00:33:50,000
So again, the, the, this is just showing you again, which seems like bizarre thing or weight well thing for humans to do is actually going to be better for the CPU.

336
00:33:50,000 --> 00:33:58,000
In the case here, we're counting CPU cycles for two pull, right. It's not, not exactly runtime.

337
00:33:58,000 --> 00:34:03,000
So in terms of how to produce instructions, and again, we'll talk more about this about the semester.

338
00:34:03,000 --> 00:34:17,000
But the idea here is that we want to specialize our database system, data systems code so that when we operate on data, we know exactly the data type, the size, and then whatever it is, the operation that we want to do on it.

339
00:34:17,000 --> 00:34:28,000
And so we don't have to have these giant switch statements as says, if my data type is in 32 versus in 64 or float, whatever, then you know, here's my instructions to do addition or subtraction, whatever it is.

340
00:34:28,000 --> 00:34:40,000
Likewise, I don't want to have to traverse the expression tree when I have my wear clause, predicate to say, you know, is it greater than or less than, again, which is usually implicate implemented as giant switch statements.

341
00:34:40,000 --> 00:34:47,000
So we want to avoid all of that as much as possible and just have exactly the code we want to run during our query.

342
00:34:47,000 --> 00:34:55,000
Because again, now there's no conditionals, there's no branching, we're just giving the CPU, we're just feeding it, here's the exact instructions we want you to execute over and over again.

343
00:34:55,000 --> 00:35:05,000
So an example of doing this wrong, or not wrong, but like, well, wrong in the context of the worst way to do it for a modern CPU is you can look at Postgres numeric type.

344
00:35:06,000 --> 00:35:15,000
And so it's this function to add two numerics together. And so what do we see? We see a bunch of these if clauses to check to see whether it's a positive number or a negative number, whether it's not a number.

345
00:35:15,000 --> 00:35:22,000
And then we have this giant switch statement here that you have to deal with all the different variations of how to do the addition.

346
00:35:22,000 --> 00:35:30,000
Again, this is just adding two numerics together. If I have a billion numbers in my column and try to add it to another billion numbers, then I'm going to execute the instructions over and over again.

347
00:35:31,000 --> 00:35:33,000
This will be terrible for a modern CPU.

348
00:35:33,000 --> 00:35:36,000
Is it the same thing as the matching of the Rust?

349
00:35:36,000 --> 00:35:40,000
The same thing as the matching of the Rust. It's not like a pilot time thing, right?

350
00:35:50,000 --> 00:35:52,000
It doesn't matter, it's a jump table, yes, but...

351
00:35:53,000 --> 00:35:54,000
It jumps.

352
00:35:54,000 --> 00:35:57,000
Jumps, that's bad. Jumps are bad. Yeah.

353
00:35:58,000 --> 00:36:01,000
Function calls are bad, jumps are bad, right?

354
00:36:01,000 --> 00:36:06,000
But we do need to verify the different types. If you don't have Roger, I'm not sure how you read it.

355
00:36:06,000 --> 00:36:09,000
His question is, like, you do need to get the types. Yes.

356
00:36:09,000 --> 00:36:13,000
So, if you had read it without this switch, I'm not sure how you do that.

357
00:36:13,000 --> 00:36:16,000
Because you need to do this stuff that they want to prepare.

358
00:36:17,000 --> 00:36:22,000
Ignore numerics, right? Because we know how to optimize this.

359
00:36:22,000 --> 00:36:29,000
But just think of, like, if you had a number plus a number, so, like, is it in 32, is it in 64,

360
00:36:29,000 --> 00:36:32,000
and you would have to have different branches for all those.

361
00:36:32,000 --> 00:36:35,000
But because we're at SQL to clear the language, we have a catalog.

362
00:36:35,000 --> 00:36:42,000
We know exactly the data types. If we set up the system in such a way that we know exactly the instructions we want to execute,

363
00:36:42,000 --> 00:36:48,000
we can design things ahead of time and be wave-hastic.

364
00:36:48,000 --> 00:36:53,000
And whether or not we pre-compile the primitives we want to use to operate on different data types,

365
00:36:53,000 --> 00:36:56,000
or we just in time compile it, we'll cover that later.

366
00:37:00,000 --> 00:37:08,000
All right. So, now with all that in mind, now we want to talk about how we want to design the execution in this processing model

367
00:37:09,000 --> 00:37:14,000
to then lead us to the path of enlightenment or whatever you want to call it, of being able to achieve those three goals.

368
00:37:15,000 --> 00:37:23,000
So, this would be a somewhat of a review from the intro class, but I'm going to go a bit more detail of how the system is actually going to operate

369
00:37:23,000 --> 00:37:32,000
beyond what we covered in the intro class. And then that'll segue into discussing the direction of how we move data between different operators.

370
00:37:33,000 --> 00:37:39,000
So, the processing model is going to find essentially how the data system is going to execute a query plan,

371
00:37:39,000 --> 00:37:51,000
meaning how it's going to tell what operator to run next, and then where that operator is going to send data to, or where that operator is going to get data from, so to speak.

372
00:37:52,000 --> 00:37:57,000
And there's a different trade-offs we have for OTP systems, O-Lap systems, O-Lap systems, O-Lap workloads, and O-Lap workloads.

373
00:37:58,000 --> 00:38:08,000
And we'll see how, in the case of the volcano model, the iterator model, that's the default choice of most data systems like the row stores, and that's great for OTP, but it's not going to be so great for O-Lap.

374
00:38:10,000 --> 00:38:18,000
So, every processing model is going to be defined in terms of execution paths. And the two types of execution paths we can have are the control flow and the data flow.

375
00:38:18,000 --> 00:38:24,000
So, the control flow is going to be how the data system is going to tell an operator or an operator instance, okay, now it's your turn to run.

376
00:38:25,000 --> 00:38:32,000
And then the data flow is going to specify for each operator instance, where does it send data to, and where is it getting data from.

377
00:38:33,000 --> 00:38:42,000
And so, the output of these operators can either be whole tuples, in the case of the row store, or a subset of columns, and in our case, well, we're going to care about in the O-Lap world is going to be NSMs.

378
00:38:43,000 --> 00:38:50,000
And what we can ignore late materialization, whether or not it's the all of the columns or subset of columns, we can worry about that later.

379
00:38:51,000 --> 00:38:58,000
So, the three processing models that we're going to care about are iterators, materialization, or the Clomenar one from the X100 paper.

380
00:38:59,000 --> 00:39:08,000
And then that'll lead to, again, the vectorized model. And this will always be this last one here as well, every O-Lap system, except for a few exceptions, or can implement this approach.

381
00:39:08,000 --> 00:39:12,000
Because it's sort of the best of both worlds of the iterator model and materialization model.

382
00:39:13,000 --> 00:39:33,000
So, the iterator model, or call us a called the volcano model, or the pipeline model, I'll often probably just say volcano model, is, again, is basically how every database system up until the monidv paper or the vectorized paper you guys read, this is how pretty much everyone implemented their query processing model.

383
00:39:34,000 --> 00:39:41,000
So, in your source code and your system, you're going to have all your operator implementations, and each one is going to provide this next function.

384
00:39:42,000 --> 00:40:01,000
And so, what's going to happen is every time you want to get a tuple from an operator on the control flow path, you would then invoke the next function on that operator, who then we respond for producing either a single tuple or some kind of end of file or null marker to say, I have no more tuples, never ask me for more data.

385
00:40:03,000 --> 00:40:12,000
And you can sort of think of, like, within that operator, it's just going to be a for loop that's going to retrieve all the tuples that it needs from a, from its child operators.

386
00:40:12,000 --> 00:40:26,000
And depending on whether it's a pipeline breaker or not, it, either gets all the data from its children, if it is a pipeline breaker, or it can just get one tuple, and it longs it satisfies whatever that operator wants to do in it, and can boost the output, then it's done.

387
00:40:26,000 --> 00:40:40,000
So, you sort of think of, like, in the way you actually implement this, you would have these open and closed functions on the operator, is like, constructors or deconstructors for your operators, and then, you open it, call next next on it, get all the output you want, and then when it says I'm done, then you call closed, and that cleans everything up.

388
00:40:41,000 --> 00:40:51,000
So, this is a high level example, so we want to join R and S, and we have a join conditional on RID, SID, and then we have additional wear clause, where S value is greater than 100.

389
00:40:52,000 --> 00:41:08,000
So, you could sort of think of, like, each of these operator can have these, these implementations, as I said, they're going to be basically just four loops that's going to make calls to its children operators to pull data up or move data up, and then produce output if when it's available.

390
00:41:08,000 --> 00:41:13,000
So, you can think of these, these blocks, blocks a code here, these are all the next functions.

391
00:41:14,000 --> 00:41:30,000
So, we're going to start off, the database says, okay, I want to run this query, assume we're going from the top to the bottom, we'll be called next on the first operator here, and then immediately inside that, we have this for loop that says call next on my child operator.

392
00:41:31,000 --> 00:41:44,000
So, that is the blocking call, so the control flow would move from the top operator to the second operator here, for the do the hash join, where immediately inside that one, we have a for loop that says call next on the child because it wants to build the hash table.

393
00:41:44,000 --> 00:41:57,000
So, then the control flow takes us down here, and now we're just iterating over the table R, and we're calling a mid, which is the return control or sending one to pull back up to calling function.

394
00:41:57,000 --> 00:42:06,000
And so, there's some state inside of these operators that keeps track of the last time you called next, here's where I was, here's where my cursor was when I was scanning the table.

395
00:42:06,000 --> 00:42:15,000
So, we're going to keep calling next on the bottom operator here until we get all the data until we get into file, and at this point here we know our hash table has all the two pulls we need.

396
00:42:15,000 --> 00:42:17,000
So, again, we won't want how many false negatives.

397
00:42:17,000 --> 00:42:34,000
So, then I go down to the next block in my operator, and I'm calling next on my child, on the right child, so I come down this side, same things, scan over R, pass it up to the next operator, it applies the predicate, if that gets, that gets, that gets, a saddest predicate, then it sends it up to do the probe.

398
00:42:34,000 --> 00:42:38,000
So, you sort of, dayd you chain these things up, up like this.

399
00:42:38,000 --> 00:42:52,000
So, again, going back to the notion of pipelines, sort of think of this block three, and the first half of block two, that's pipeline, pipeline one, and then this, five, four, the bottom two, and one, that's pipeline two.

400
00:42:52,000 --> 00:43:03,000
So, I XU pipeline one, ideally, and then, sorry, in this case here, there's pipeline boundaries, but you're not doing any optimizations, right?

401
00:43:03,000 --> 00:43:10,000
Because implicitly, the code is set up, so you know that you can't run the second pipeline until the first part is actually done.

402
00:43:10,000 --> 00:43:25,000
So, again, this will differ when we see the operator fusion technique or the push-based approach, because they're actually going to try to combine these within a single operative instance, and not have these, you know, calling next within themselves.

403
00:43:25,000 --> 00:43:32,000
So, that's it, this is pretty much what everybody implements in the first database systems that they build, or a Rostrord systems.

404
00:43:32,000 --> 00:43:34,000
Bust-Tob is based on this, yes.

405
00:43:34,000 --> 00:43:40,000
And that's the biggest light, wouldn't you want to build a hash table on the table that has the filter?

406
00:43:40,000 --> 00:43:44,000
The next question is, should you want to build a hash table, or the one that has the filter?

407
00:43:44,000 --> 00:43:54,000
You don't know, right? First of all, this is a logical diagram, it's a pipeline slide. I don't have stats here, but what if this thing is like one-tubal?

408
00:43:54,000 --> 00:44:01,000
So, anyway.

409
00:44:01,000 --> 00:44:06,000
So, the iterative model is very important to the lens.

410
00:44:06,000 --> 00:44:14,000
Alpo control is really easy for this, because if you know you've got enough tuples that's the output, you just stop calling next, and you finish.

411
00:44:14,000 --> 00:44:21,000
The downside though is that we're basically mixing control flow with data flow, and going back quickly.

412
00:44:21,000 --> 00:44:35,000
There's no way to say, okay, I don't want to execute this thing anymore, because I've got enough data, or stop executing certain parts, because I'm calling next to get things up.

413
00:44:35,000 --> 00:44:43,000
If I call next on this, implicitly, because I call next on its children, because that's sort of how the query plan has been set up.

414
00:44:43,000 --> 00:44:49,000
That's how the iterative model allows you to control the behavior of the execution.

415
00:44:49,000 --> 00:45:04,000
It's going to also do pipelining. Again, the idea here is that we want to have, for every single tuple that we get from a child operator, we want to do as much processing as we can up the query plan, until we get a pipeline breaker or a producer.

416
00:45:04,000 --> 00:45:16,000
The idea is there, we can achieve good cache locality, because we bring a tuple in, and we do as much work as we can, whilst in memory, before we go off to the next tuple.

417
00:45:16,000 --> 00:45:24,000
Until we hit a pipeline breaker, which again, we know we can't have an operator complete until we get all its children to emit their tuples.

418
00:45:24,000 --> 00:45:33,000
The build side of joins, we have this problem, subquaries depending on whether to get rewritten or not, and to join to have this problem in order by sorting, obviously, has this problem.

419
00:45:33,000 --> 00:45:38,000
Some aggregations, min and max, right? Same thing.

420
00:45:38,000 --> 00:45:53,000
The downside, though, is that you're basically calling next for every single tuple. If I have a billion tuples, calling a billion function calls, it's called next, times the number of whatever operators that I have, or number of tuples that are being sent up.

421
00:45:53,000 --> 00:46:08,000
So, an alternative approach that was pioneered by MoNetB in the late 90s, early 2000s, was to do what is called the materialization model, where every operator produces all its output, all at once.

422
00:46:08,000 --> 00:46:16,000
Any time you call it next on it, it generates all the output, and then hands that off to the next operator. So once you call it next, you never go back and ask for more data for it.

423
00:46:16,000 --> 00:46:24,000
The idea is to call materialization model, because you materialize each operator, materializing all its output as a single result.

424
00:46:24,000 --> 00:46:30,000
And again, the output could either be a single row, a single column, or the entire table. Yes.

425
00:46:30,000 --> 00:46:35,000
Why is my break a little basically materialization? Like, because the end of materializing the entire result?

426
00:46:35,000 --> 00:46:42,000
The statement is, pipeline breakers are essentially the same thing as pipeline breakers, because you materialize the entire result.

427
00:46:42,000 --> 00:46:52,000
Not necessarily, because I could call it next on a pipeline breaker.

428
00:46:52,000 --> 00:47:01,000
Well, you're like, yes, I could produce all the output, and then something's going to feed into that pipeline breaker result.

429
00:47:01,000 --> 00:47:10,000
I could just get a single tuple. I wouldn't pass, because it's still like one to about a time called next. I wouldn't have this giant output get shoved all the way up, all of a sudden switched the processing model.

430
00:47:10,000 --> 00:47:15,000
But to your point, like the pipeline breaker, it has like, you're materializing all the results at that point there. Yes.

431
00:47:15,000 --> 00:47:22,000
Yes. But in the case of materialization model, every next call moves the entire result always up.

432
00:47:22,000 --> 00:47:30,000
So it's not that simple as saying that the majority of the components are saying, every operator has a pipeline break. It's not as simple as just saying that.

433
00:47:30,000 --> 00:47:37,000
It's not as simple as saying in materialized model that every operator is a pipeline breaker.

434
00:47:37,000 --> 00:47:46,000
That's okay. Yeah, that's fine. Yeah, it makes sense. Yeah. You wouldn't describe it that way, though, but it makes sense. Yes.

435
00:47:46,000 --> 00:47:51,000
So let's see how to go back to our query head before.

436
00:47:51,000 --> 00:47:57,000
And again, now in our operator implementations, now we see that like again, we have this output buffer.

437
00:47:57,000 --> 00:48:03,000
And we just keep adding tuples and then there's a return clause where we can all the output goes up to the next guy.

438
00:48:03,000 --> 00:48:14,000
So just like before, we started the top call, the root operator calls child.out output, calls this guy, who then has to build a hash table, calls down to the scan on R.

439
00:48:14,000 --> 00:48:20,000
Again, we populate the entire output buffer and then show the result up.

440
00:48:20,000 --> 00:48:29,000
And again, if I have a billion tuples, even if I want one column for a billion tuples, my output buffer is going to be a billion tuples in this approach.

441
00:48:29,000 --> 00:48:39,000
And then again, same thing. I go down the up, sorry, all the tuples, I go down the other side. I call the filter, which then calls the scan on S.

442
00:48:39,000 --> 00:48:45,000
And then same thing, the data gets moved up like this.

443
00:48:45,000 --> 00:48:58,000
So an obvious optimization here is that for this side of the query plan, I'm scanning S and then materialize the result and then neatly handed off to a filter operator, who then basically throws through and starts to step away.

444
00:48:58,000 --> 00:49:06,000
So an obvious optimization is to inline these two, or fuse them together so that as you scan S, then you validate the predicate.

445
00:49:06,000 --> 00:49:10,000
And then if that evites true, then you put them in the output.

446
00:49:10,000 --> 00:49:20,000
Again, you could do that branchless, taking we saw before. I'm showing you the if calls, but you could do that thing with that optimization to solve.

447
00:49:20,000 --> 00:49:30,000
So this is great for OTP, because in that world, the queries are accessing the single tuple. So even though you're materializing the entire result, it's going to be one tuple.

448
00:49:30,000 --> 00:49:38,000
And then it's just one less next call to go before you get the end of file. You know, you got everything you would ever need for an operator and you can move one.

449
00:49:38,000 --> 00:49:44,000
You have to do that inline and you make sure you're not passing up more data than you actually need, but it works great.

450
00:49:44,000 --> 00:49:49,000
And then when we built HStore that became voltage B, this is, we use this approach.

451
00:49:49,000 --> 00:50:04,000
But I would argue, and the paper you read argues that this is bad for OLAB, because you know, you may be coalescing or turning on a bunch of data on higher parts of the query plan, but you're moving these large, large columns from one operator to the next.

452
00:50:04,000 --> 00:50:11,000
So it's great that again, you have fewer next calls, but you're moving data more data than you potentially actually need.

453
00:50:12,000 --> 00:50:22,000
So the vectorization model is an obvious optimization, or it's obvious now, but at the time it wasn't, that's sort of getting the best of both worlds, right?

454
00:50:22,000 --> 00:50:33,000
You're still going to have this next call that's going to move tuples up or move tuples from one operator to the next, but instead of moving a single tuple as you would an iterator model, you're going to move a batch of tuples or a vector tuples.

455
00:50:34,000 --> 00:50:40,000
Again, the naming is bad, because you say like, oh, it's the vectorized query processing.

456
00:50:40,000 --> 00:50:47,000
Now with vector databases that people may think you're doing, like sending embeddings or something like that, which we're not doing.

457
00:50:47,000 --> 00:50:50,000
So we're going to make a batch of tuples instead of a single tuple.

458
00:50:50,000 --> 00:50:59,000
And then we're going to have our operator, like the loops themselves, be designed to operate on these batches of tuples at a time.

459
00:51:00,000 --> 00:51:06,000
And the size of the batch can vary depending on what the data looks like, what the query actually wants to do, or what the harbor looks like.

460
00:51:06,000 --> 00:51:09,000
I think of the paper, they were talking about 1024.

461
00:51:09,000 --> 00:51:13,000
That's usually roughly what I think most systems are using.

462
00:51:13,000 --> 00:51:18,000
Some of them might be a bit smaller. We'll see examples of that later on.

463
00:51:18,000 --> 00:51:28,000
And again, the batches are either going to be one column or subset of columns based on whether or not you're doing latent materialization or not, or about, you've already done projections on it.

464
00:51:29,000 --> 00:51:38,000
So if we go back to our query one more time, now within our implementations, we still have an output buffer.

465
00:51:38,000 --> 00:51:48,000
We're going to add things to it, but now we're going to have this conditional clause as when we've accumulated enough tuples for the size that's expected for our vectors, then we can emit it up or send it up.

466
00:51:48,000 --> 00:51:56,000
So same thing we called that before, fill up our vector output buffer, and then we use that to send it up.

467
00:51:56,000 --> 00:52:00,000
Send a tuple batch, and then same thing down on the other side here. Yes.

468
00:52:06,000 --> 00:52:15,000
His question is, or statement is, if I'm at the end of R, and if the size of the output buffer is less than N, but if I'm done, then yeah, you send it up.

469
00:52:15,000 --> 00:52:18,000
Yes, so you would have a little thing outside the full cost. Yes.

470
00:52:18,000 --> 00:52:27,000
And then you just, let's talk about this in a second, but you basically keep track of like, okay, here's the rows that are actually active, and whether you use that bitmaps or offsets, we'll see that in a second.

471
00:52:33,000 --> 00:52:43,000
So, this is the vectorized preprocessing model is what every modern OLAP system is going to use today.

472
00:52:44,000 --> 00:52:58,000
And it's because it's greatly reduced the number of next calls we have to have per operator, and it's going to allow a out of order CPU to be efficiently execute our operators over batch of tuples, assuming we've designed our system in a way to operate on these vectors.

473
00:52:59,000 --> 00:53:07,000
So again, in the authors of the paper talked about they could have called it the array processing model, but that's essentially what it comes down to what you're doing.

474
00:53:08,000 --> 00:53:18,000
These batches of tuples are just arrays, and then within each operator, as you get the input vector from your child, now you have a for loop overgoing over arrays.

475
00:53:18,000 --> 00:53:25,000
And that's the ideal scenario for out of order super scalars CPUs. They law processing arrays, right?

476
00:53:25,000 --> 00:53:31,000
So you can do all of the specs, the execution tricks we talked about before.

477
00:53:31,000 --> 00:53:34,000
You can do vectorization with SIMD, which we'll see more about next week, right?

478
00:53:34,000 --> 00:53:46,000
All these things we can take advantage of because we know we're doing the same operation opener again within a tight kernel on the data that's going to the same type, same length for the most part, ignoring strings.

479
00:53:46,000 --> 00:53:49,000
But like, we can crush that, yes.

480
00:53:49,000 --> 00:54:08,000
I'll try to understand the distinction between materialized vectors, because in both cases it seems like you are sending a bunch of data to see what's the fundamental difference between materialization model and vectorized vectors.

481
00:54:08,000 --> 00:54:25,000
That like, the size of the output isn't everything, so that we can take advantage of pipelining for our vectors because we're taking batches of tuples in sort of digestible bytes.

482
00:54:25,000 --> 00:54:31,000
Right? It's having this whole thing, a process that process it for the entire operator, then move into the next operator.

483
00:54:31,000 --> 00:54:42,000
I can have this like pipeline execution where I'm just taking some vector tuples and ripping through it and only going back to the next vector either when I reach my final output or all of the tuples got thrown away or something like that.

484
00:54:42,000 --> 00:54:49,000
So I can materialize your savings to limit to say I don't even want so many tuples, but you're understanding what's the important sort of?

485
00:54:49,000 --> 00:55:00,000
So in case of materialization model, you can use limit to say I don't want certain tuples, but like oftentimes that limit clause is applied near the root of the query plant.

486
00:55:00,000 --> 00:55:06,000
Like give me the top 10 accounts based on some number, some column.

487
00:55:06,000 --> 00:55:09,000
I got to sort them before I can get the top 10.

488
00:55:09,000 --> 00:55:15,000
So that means that even though I'm going to throw away most of the data in materialization model, I got to pump a lot of that data up.

489
00:55:15,000 --> 00:55:27,000
You say okay, vectorization model, you still have to do that, right? But like the implementations of the operators themselves can deal with these chunks of data that can fit in your L3, L2 caches.

490
00:55:27,000 --> 00:55:32,000
You're not dealing with this giant blob of data that's going to have a bunch of cache cache misses.

491
00:55:32,000 --> 00:55:33,000
Yes?

492
00:55:33,000 --> 00:55:44,000
Can you verify what the different type of control flow is?

493
00:55:44,000 --> 00:55:50,000
So this question is what's the difference between control flow and data flow?

494
00:55:50,000 --> 00:56:08,000
So control flow again is how the part of the data system that says okay time to execute this query, how it tells an operator to say start running.

495
00:56:08,000 --> 00:56:17,000
And in the case of, in all the purchases I'm showing here, we're using top the bottom. So we're calling next and that's the control flow.

496
00:56:17,000 --> 00:56:22,000
So we call next on the top operator, it then calls next on this child operator, that's the control flow.

497
00:56:22,000 --> 00:56:26,000
And then the data flow is where the data is moving back.

498
00:56:26,000 --> 00:56:40,000
We'll see a better distinction when we talk about pushers as pull. In the pushers as pull, the execution of one operator versus the next operator is not embedded in the execution of another operator.

499
00:56:40,000 --> 00:56:46,000
That we can then say okay now it's time to execute this pipeline and that's, there's an asset that makes that call.

500
00:56:46,000 --> 00:56:50,000
And then that operator then does not, or pipeline does not call the another pipeline.

501
00:56:50,000 --> 00:56:57,000
There's something else that centralize, that's managing all that. Where is it? Go ahead, yes.

502
00:56:57,000 --> 00:57:01,000
So the two different options for control flow is like a plug and pull.

503
00:57:01,000 --> 00:57:14,000
Yeah, yes, but like you wouldn't say it that way, right? That you'd have a different approach to doing control flow if you're doing a push versus approach versus a pull.

504
00:57:14,000 --> 00:57:16,000
Okay, we'll come to that in a second.

505
00:57:16,000 --> 00:57:20,000
And what are the different options for data for the two bull versus bull?

506
00:57:20,000 --> 00:57:24,000
Yeah, so to point its questions, what's the different option for data flow?

507
00:57:24,000 --> 00:57:28,000
You can think of the pricing processing model as defining that as well.

508
00:57:28,000 --> 00:57:41,000
The pushers as pull is part of that as well. But like, yeah, the data flow is at a single two bull, all the two bulls or a batch of two bulls.

509
00:57:41,000 --> 00:57:51,000
So another great thing to also do because again, we have these tight kernels that are processing these batches of two bulls.

510
00:57:51,000 --> 00:58:00,000
All the instructions that were going to execute for that, which is inside that kernel, every single iteration is going to be in our instruction cache.

511
00:58:00,000 --> 00:58:02,000
That's going to be super fast.

512
00:58:03,000 --> 00:58:15,000
We'll have very few data dependency control dependencies because we don't need to see the output of another two bull within our batch to determine what the next thing we need to execute.

513
00:58:15,000 --> 00:58:22,000
It's not always entirely true, but like you can, you know, you, you, in most cases, this will be the case.

514
00:58:22,000 --> 00:58:28,000
Whether or not a predicate, a two bull, predicate doesn't matter whether the last two bulls said it had that predicate or not.

515
00:58:28,000 --> 00:58:33,000
Again, not always true when the functions complicate things, but we can ignore that.

516
00:58:33,000 --> 00:58:40,000
Again, we'll see this next week. The great thing about having these type four loops is over arrays, that's what the CPU wants.

517
00:58:40,000 --> 00:58:43,000
That's what the compiler wants to be able to vectorize this using SIMD.

518
00:58:43,000 --> 00:58:47,000
We'll see how to explicitly do that in next week.

519
00:58:48,000 --> 00:58:54,000
So this is from the, from Peter Bonso's slide from the, when he won the, the test of time award for this paper.

520
00:58:54,000 --> 00:59:07,000
But in the discussion of why, why they saw the vectorized model be so much faster than the iterator of the volcano model or the materialization model that was used in the NDB.

521
00:59:08,000 --> 00:59:12,000
In case the volcano model, the interpretation overhead will cover later on, that's precognitive.

522
00:59:12,000 --> 00:59:17,000
But now you don't have this, you know, per two bull navigation of them calling next and next or every single two bull.

523
00:59:17,000 --> 00:59:27,000
It's now, you know, if I'm, if I'm back, you know, 1024 size batches, I'm just reducing the number of calls by 1024. It's pretty significant.

524
00:59:27,000 --> 00:59:33,000
In the case of MnDB, we'll see more later on, but the query plans we want much simpler because it's just like it was an iterator model,

525
00:59:34,000 --> 00:59:41,000
except now you're passing batches of two bulls. Whereas in MnDB, they were sort of keeping track of implicitly, here's all the columns I'm passing around.

526
00:59:41,000 --> 00:59:53,000
And it was, it was way more complicated. And then all the optimizations you get from the compiler or SIMD, that's just, you know, it's, it's, it's, it's, it's in addition to all the other things just by designing this in itself,

527
00:59:53,000 --> 01:00:00,000
to pass around batches of data, things run faster, but then oh by the way, the compiler can also rip through it much, much better as well.

528
01:00:04,000 --> 01:00:19,000
So leading to his question about push versus pull, but in all the examples that it showed, there was this next function, you know, whether it's vectorized, materialized or, or iterator, there's this next call that I'm making on the per operator, right?

529
01:00:19,000 --> 01:00:24,000
And I'm always starting at the top, calling the root and going down and, and bringing things up.

530
01:00:24,000 --> 01:00:35,000
And again, this is how most systems are going to implement X to change, but it isn't the only way. And this gets into the distinction of, of, of top to bottom, the pole based approach to the bottom top.

531
01:00:35,000 --> 01:00:50,000
So again, the top to bottom is what I just showed, you want to start exceeding the query, you call next on the root, and then that would then call next on its children, propagate down to the pooling data from the bottom of the query plan, up to the top to the root, and that produces the final output.

532
01:00:51,000 --> 01:01:06,000
And the, you're always going to be calling, you know, next to get the next tuple, unless it's a pipeline breaker, because that'll stage data in a, in a sort of, in a result that you then go access, but you're always passing tuples by calling, passing data by calling next.

533
01:01:06,000 --> 01:01:12,000
And that, that's going to be a function call, that's a jump instruction, and again, that's bad for a super scaler CPU.

534
01:01:13,000 --> 01:01:35,000
Alternate approach is the push based model, where you start with the leaf notes in the query plan, and you have some outside controller or a scheduler, you know, initiate the invocation of that, of that, that operator, the pipeline, and then it's going to take the data that it generates and push it to the next operator.

535
01:01:36,000 --> 01:01:37,000
Yes.

536
01:01:38,000 --> 01:01:41,000
How long do I mean doing a few? How does that, we'll get that in a second. Yes.

537
01:01:42,000 --> 01:01:51,000
So, this is rare, this is probably more common now, but again, when this paper, the paper you guys are in 2005, this approach didn't exist.

538
01:01:51,000 --> 01:01:58,000
This shows up in a paper that you're starting to read in a few weeks from the Germans, and this is called Hyper, the dude's insane.

539
01:01:58,000 --> 01:02:09,000
It's a one person author in paper, he invented, or didn't invent, but he showed how to query, just kind of query compilation with the LLVM in Hyper, plus also he invents the push based model in the paper as well.

540
01:02:09,000 --> 01:02:15,000
And he's got three cleats, he teaches two classes a semester, and he doesn't do drugs, it's insane.

541
01:02:15,000 --> 01:02:16,000
Right?

542
01:02:16,000 --> 01:02:20,000
He's the exact opposite, he's very straight list.

543
01:02:20,000 --> 01:02:22,000
Anyway, so let's see how to do this.

544
01:02:22,000 --> 01:02:37,000
Okay, so here's our same query I have before, and now here's our two pipelines, but now instead of a bunch of different operators that will have to implement the individual, blocks of code that implement the individual operators, now we're just going to have two for loops.

545
01:02:37,000 --> 01:02:44,000
Right? And so for the first first pipeline, we're going to scan R and then populate the hash table.

546
01:02:44,000 --> 01:02:54,000
But in the second pipeline, we're going to scan S, and now you can see where that we're going to try to do is ride every single two pull all the way up to the top of the query plan.

547
01:02:54,000 --> 01:03:01,000
Before we go back and look at the next two pull or the batch of two pulls, even though I'm showing this opportunity single two pull, you could do this on a batch as well.

548
01:03:01,000 --> 01:03:11,000
Right? So for every two pull and S, then you've got to the predicate, if that matches, then you probably hash table, then if that matches, then you put it as the output.

549
01:03:11,000 --> 01:03:18,000
Yes. This is fusion right here. How did that even end up happening? What do you have to happen?

550
01:03:18,000 --> 01:03:28,000
In the sense that you want your faculty to be an operator, so would you be hard code every single combination of all pages?

551
01:03:28,000 --> 01:03:38,000
Okay, so his question is basically, how do you do this? Would you have to hard code every single possible combination of query plans?

552
01:03:38,000 --> 01:03:45,000
I'm going to execute this. No. So how would you have that? Two weeks.

553
01:03:45,000 --> 01:03:57,000
The answer is going to be, you know, just in time compile this, you really generate the code on the fly for the query plan that fuses this together, then compile it with the LLVM or GCC or Clang, then run that.

554
01:03:57,000 --> 01:04:06,000
That's approach number one. Approach number two is that you recognize, I only have so many data types in my database system, and there's only so many things I could do to them.

555
01:04:06,000 --> 01:04:21,000
So each of these are just functions, right? And I just put them in an array, and I execute one by one. That's what vector wise does. That's code specialization. Give me two weeks.

556
01:04:21,000 --> 01:04:30,000
Okay, what do that? Right? Yeah. Your mind looks blown, in fact you can compile this on the fly. Yeah, this is what they do. They're German, right?

557
01:04:30,000 --> 01:04:46,000
This is good too. This is good too. So this is hard, right? Like, I don't get to it. It's even crazier than that. The new version, like in this version, they will, in hyper, they would generate the LLVM IR than compile that.

558
01:04:46,000 --> 01:04:56,000
Single-store will generate C code, then compile that, at least the version. In the latest version, the new system, they're being called Umbra, he doesn't generate IR, he generates literally x86 assembly.

559
01:04:56,000 --> 01:05:07,000
Like C++ macros, then he runs that through the assembler. Then on the background, he's running the LLVM, compiles the assembly code into a shared object, and when that's done, he then links it in.

560
01:05:07,000 --> 01:05:25,000
Yeah, German, yes. So when you're telling the language of the child, in each of those, like, the fixed number of functions, you have compile and compile an array, but these are function pointers, and when you, like, when you want to use them together, like, finding this function a, function p, and then you, like, rearrange everything in your array, so you can actually get that word.

561
01:05:25,000 --> 01:05:37,000
Yes, the question is, the way you want to do this, if there are a bunch of, function pointers, would it be a bunch of arrays where I'm putting in, I need to do this, the file like this, file like this, and then would you just, invoke this function pointer, as you go along? Yes.

562
01:05:37,000 --> 01:05:45,000
And that, that would suck if you're doing it on a per-tubal basis. But if you do batches of tuples in the vectorized model, then that amortizes the jump call.

563
01:05:45,000 --> 01:05:50,000
And then now you don't have giant switch statements of, like, what branch should I go down? Yes.

564
01:05:50,000 --> 01:06:02,000
So, I can't you do this in a pool-based model? Good question. I mean, totally the fusion part.

565
01:06:02,000 --> 01:06:18,000
I mean, at a high level, is this the same, at a high level, is it the same, more or less, yes, right?

566
01:06:18,000 --> 01:06:26,000
Because this, like, you couldn't say, okay, do the scan, then, you know, the next call does this, the next call does that, right?

567
01:06:26,000 --> 01:06:34,000
But again, in the pool-based approach, the way the software is actually engineered and designed, the abstraction is through these next functions.

568
01:06:34,000 --> 01:06:42,000
So, if could you take a pool-based model and then co-genit to turn it into this? Yes.

569
01:06:42,000 --> 01:06:47,000
You said this is the main reason for you to buy a new pool, or other other factors that I'm not seeing.

570
01:06:47,000 --> 01:06:50,000
So, the control flow matters too, right?

571
01:06:50,000 --> 01:06:58,000
So, like, when I actually get x-tute this, there's some outside scan, which says, okay, run this, when this populates the hash table, right?

572
01:06:58,000 --> 01:07:03,000
And then you can then also specify where the output's going and say some output buffer, and then that this thing's going to know about.

573
01:07:03,000 --> 01:07:06,000
When that's done, then I schedule the next one, and it produces the output, right?

574
01:07:06,000 --> 01:07:11,000
So, you have a complete control over everything. Yes.

575
01:07:11,000 --> 01:07:12,000
Yes.

576
01:07:12,000 --> 01:07:17,000
And also, you can get that great with using, like, some sort of pushing, but they didn't go, frankly.

577
01:07:17,000 --> 01:07:20,000
How does the schedule specify where it's going to be?

578
01:07:20,000 --> 01:07:27,000
Like, you need to admit, like, those they are, like, physically, feeds into two different pipelines, so these are the two different ways.

579
01:07:27,000 --> 01:07:32,000
So, the question is, how, if Arnysa go to two different places, how do we handle that?

580
01:07:32,000 --> 01:07:36,000
Yeah, Arnysa, is the schedule worth all of us? Or is it just the reason it's free to use the...

581
01:07:36,000 --> 01:07:44,000
Like, so, the way would be, the schedule, something before we start executing would specify where this output's going to go.

582
01:07:44,000 --> 01:07:48,000
So, it's got to go to locations, you tell it, by the way, send it to locations.

583
01:07:48,000 --> 01:07:57,000
And it can either be, like, the operator itself, the execution, could be responsible for sending it exactly to the location needs to go to,

584
01:07:57,000 --> 01:08:04,000
or you could have, like, a shuffle service, which we'll cover later, this says, like, okay, well, I don't exactly where to get it to where it needs to go,

585
01:08:04,000 --> 01:08:11,000
but if I know a sentence to this other service, it will then distribute it for me.

586
01:08:11,000 --> 01:08:15,000
Okay, I don't want to get too far ahead of the... Like...

587
01:08:15,000 --> 01:08:17,000
Yeah, yeah.

588
01:08:17,000 --> 01:08:22,000
Yeah. Stuff is really cool. But not everyone does exactly the...

589
01:08:22,000 --> 01:08:29,000
Again, as I said before, the co-genic this on the fly is going to be hard to maintain.

590
01:08:30,000 --> 01:08:32,000
The Germans can do it for you others can.

591
01:08:32,000 --> 01:08:33,000
And they're...

592
01:08:33,000 --> 01:08:34,000
You also make it easy to do?

593
01:08:34,000 --> 01:08:35,000
No. No.

594
01:08:35,000 --> 01:08:36,000
No.

595
01:08:36,000 --> 01:08:37,000
No.

596
01:08:37,000 --> 01:08:42,000
Okay, I'll leave a little mystery, right?

597
01:08:42,000 --> 01:08:43,000
We'll see why.

598
01:08:43,000 --> 01:08:46,000
And then, beyond, we implemented this here, right?

599
01:08:46,000 --> 01:08:52,000
We implemented it twice, and even the second time was meant to be easier for other people to use, and it was still...

600
01:08:52,000 --> 01:08:55,000
No, it was not impossible, it's harder.

601
01:08:56,000 --> 01:08:59,000
All right, so again, these are just reiterating what I've already said.

602
01:08:59,000 --> 01:09:01,000
Top to bottom, we have complete control.

603
01:09:01,000 --> 01:09:04,000
We control the output via limit.

604
01:09:04,000 --> 01:09:10,000
And basically, the child operator has a block until the parent operator blocks until the child comes back with the results.

605
01:09:10,000 --> 01:09:12,000
And the...

606
01:09:12,000 --> 01:09:18,000
Again, the next functions aren't cheap because there's tension going to be virtual function in low-cups in C++.

607
01:09:18,000 --> 01:09:22,000
Because I'm stitching together this query plan with pointers.

608
01:09:22,000 --> 01:09:28,000
And then, at runtime, I have to do the virtual function to look up and say, okay, what is the actual location of the function?

609
01:09:28,000 --> 01:09:31,000
I went execute for that given...

610
01:09:31,000 --> 01:09:33,000
For that given child operator.

611
01:09:33,000 --> 01:09:38,000
And then, of course, these next calls are going to be jumps, and that's going to suck for us in the CPU.

612
01:09:38,000 --> 01:09:44,000
In the case of the bottom of the top, you can have tighter control of the caches and registers in the pipelines.

613
01:09:44,000 --> 01:09:51,000
In the case of the hyperpaper, again, not only are they going to keep data in L1 cache, they're going to keep in CPU registers.

614
01:09:51,000 --> 01:09:54,000
They can't go faster than that.

615
01:09:54,000 --> 01:10:03,000
So, the only challenge is that, in some cases, you may not have complete control of limiting the size of an output buffer.

616
01:10:03,000 --> 01:10:08,000
Because you have no way to...

617
01:10:08,000 --> 01:10:15,000
In the case of the next call, if I got enough data at the top of my query plan, then I don't call next anymore.

618
01:10:15,000 --> 01:10:26,000
But in the case of the push-based model, even though I may be still sending the entire batches, instead of all the output, I may get more data in a batch than I actually want.

619
01:10:26,000 --> 01:10:35,000
Yes?

620
01:10:35,000 --> 01:10:44,000
So, the only benefit you get from having Apple control at the top is through limits.

621
01:10:44,000 --> 01:10:47,000
I think that's true, yes.

622
01:10:47,000 --> 01:10:51,000
When no functions...

623
01:10:51,000 --> 01:10:55,000
Superficially, yes, but I met you wrong.

624
01:10:55,000 --> 01:10:59,000
In the case of push-based, it's actually tricky to do also sort merge.

625
01:10:59,000 --> 01:11:02,000
You need two iterators at the same time, and you have to keep the extra statement.

626
01:11:02,000 --> 01:11:06,000
Not impossible, you can do it. It's a little bit more tricky.

627
01:11:06,000 --> 01:11:12,000
Because it's not that nested for loops ripping through a single two-board within a batch.

628
01:11:12,000 --> 01:11:13,000
Yes?

629
01:11:13,000 --> 01:11:19,000
If we're doing push-based, is there still a distinction between iterators and the parallelization?

630
01:11:19,000 --> 01:11:26,000
If we're doing push-based, is there still a distinction between two-board-a-time, entire output versus the entire...

631
01:11:26,000 --> 01:11:28,000
Is this a vector?

632
01:11:28,000 --> 01:11:29,000
Absolutely, yes.

633
01:11:29,000 --> 01:11:34,000
So, my example here, I'm iterating over a single two-pole, and I call it eValPredicate.

634
01:11:34,000 --> 01:11:40,000
And again, assuming that they're function pointers, I'm jumping every single time to eValPredicate for one two-pole.

635
01:11:40,000 --> 01:11:49,000
What you could do is pass a batch of tuples, call this vectorized version of eValPredicate, and then it gets a batch of processes of those.

636
01:11:49,000 --> 01:11:52,000
So, they're compatible.

637
01:11:54,000 --> 01:11:55,000
Okay.

638
01:11:55,000 --> 01:11:59,000
I don't think we're going to get through parallel execution, but let's finish up with...

639
01:11:59,000 --> 01:12:00,000
We'll cover that next class.

640
01:12:00,000 --> 01:12:05,000
But let's finish up with how to represent filter data.

641
01:12:06,000 --> 01:12:12,000
So, in the iterator model, because we're operating...

642
01:12:12,000 --> 01:12:23,000
Every operator is going to process one two-pole at a time, if something doesn't match like a predicate, something's not meant to be produced as an output, then we don't send it up to the parent operator.

643
01:12:23,000 --> 01:12:32,000
Either call next and get the next two-pole from our child or whatever, you know, the local thing we're processing, or we return back into file, meaning we have no more.

644
01:12:32,000 --> 01:12:44,000
So, that means that at no point in the query plan, what we send up data that we know has been disqualified or thrown out, because we wouldn't have emitted it up.

645
01:12:44,000 --> 01:12:46,000
Right?

646
01:12:46,000 --> 01:13:00,000
But in the vectorized model, you can't do that, because you're operating on batches of tuples, so you may have, based on what your predicate is, or whatever the operation is trying to do, you may end up filtering out or throwing away some tuples inside the vector,

647
01:13:00,000 --> 01:13:04,000
while other tuples still need to be passed up.

648
01:13:04,000 --> 01:13:12,000
So, now the question is, how do we handle that? Basically, we have a vector that's going to have things half the data is we want to keep, half the data we know we want to throw away.

649
01:13:12,000 --> 01:13:14,000
I'm sorry.

650
01:13:14,000 --> 01:13:23,000
So, let's say that we're a query like this, where the where clause is where column 0 is null, and column 1, or column 1 is like, and then being a wildcard.

651
01:13:23,000 --> 01:13:36,000
So, say this is my data, I've called it 0, column 1, and so if I now do the filtering on this data, say this is coming in as a batch, this is the output I really want.

652
01:13:36,000 --> 01:13:49,000
Right? This is because this is the logically, this is the correct result. But how do I get there? Because I don't want to have to copy everything out and then put it back into another buffer, that's going to be slow.

653
01:13:49,000 --> 01:14:02,000
So, I need a way to represent logically that these are the tuples that have been filtered out, even though physically, I may be still be passing on dead tuples or tuples that I don't need.

654
01:14:02,000 --> 01:14:10,000
So, there's two approaches to do this. The first is used what is called a selection vector. Sometimes I'll also call it a position list.

655
01:14:10,000 --> 01:14:25,000
And the idea here, it's just going to be a densely packed array of the offsets of the tuples within my vector that I'm passing from one upper to the next, that are still valid, are still alive, are still active.

656
01:14:25,000 --> 01:14:36,000
So, again, going back to my example here, my selected vector would just be a list of offsets, 1, 3, 4, because they correspond to the tuples that satisfy the predicate.

657
01:14:36,000 --> 01:14:44,000
Now, this is what gets passed on as the output of next, or if I'm pushing it along in the push-based model. This is what the next operator is going to process on.

658
01:14:44,000 --> 01:14:56,000
So, now, when I start doing whatever it is, I get this batch of data, I have this selection vector, I said then account for some of the data may have been discarded, some of the data is still active.

659
01:14:56,000 --> 01:15:16,000
Yes? Why do this? This must have x-symd, the question is why do this? Because the answer is going to be yes for s-symd, and for other operations, it's actually going to be faster for us just to pass along garbage.

660
01:15:16,000 --> 01:15:24,000
And then, if the selection vector goes zero, then I know everything is discarded, and I just throw the entire thing away, and jump out.

661
01:15:24,000 --> 01:15:35,000
But it's going to be faster for us to not have to say, everything will step, saying in C-ser-visualizes in the fusion model, or the fusion approach.

662
01:15:35,000 --> 01:15:48,000
It's easier from going from one line to the next line, within my nest before the, to not have to allocate memory resizing stuff.

663
01:15:48,000 --> 01:16:05,000
The alternative approach is to do bitmaps, and this is just going to be a bitmap that has the same length as the number of tuples in my vector that I'm passing along, and it's just a zero one that specifies whether the, the tuple at the given offset is valid or not.

664
01:16:05,000 --> 01:16:24,000
And again, as you brought out, this is going to matter, this is going to make our life easier in some cases, because some simd instructions in AVX512 will actually take this as input as a mask, and you can use it to tell it, hey, don't process the data in these lanes, because I don't care, I don't care for the output.

665
01:16:25,000 --> 01:16:42,000
So again, we'll, we'll, we'll see more this later on, actually, you know, how to design, you know, simd optimize operations, or algorithms for, or query plans or X data system that can use all these things.

666
01:16:42,000 --> 01:16:53,000
The current research literature actually says the top one is the faster way to do this. So the photon paper from, from data brefs will read later on says this, and then our research paper.

667
01:16:54,000 --> 01:17:14,000
Why would this even be a little bit doing the field system, because if you're doing fields thing, it's just one or whatever next layer form, because if you don't find line of all papers, that means that the pipeline we can end up with, we don't need to use that kind of data flow, if we just are dealing in that abstraction.

668
01:17:15,000 --> 01:17:20,000
So your statement is if we're doing this, why don't we even need that?

669
01:17:29,000 --> 01:17:43,000
So like literally thing like, say, say to T2, it's being a simple to say it's a batch, a vector. I call this evalpredicate, right? It's going to then populate either the position list, the selection vector, or the output, the bitmap, right?

670
01:17:44,000 --> 01:17:53,000
If it's the bitmap, I do pop count, tell me how many zeros I have, or how many ones I have. If it's, if I have at least one, one, then I know I want to do this.

671
01:17:54,000 --> 01:18:04,000
If you don't do that, then I got to go copy, go iterate over every single tuple within my batch, populate a new output buffer, then feed that into my probe hash table.

672
01:18:05,000 --> 01:18:14,000
It's just faster to do zero copy, operate on the data as it exists, but I'm just upending bits or a position list to say what's tuple's actually matter.

673
01:18:14,000 --> 01:18:24,000
And all these implementations of these operators, which we'll cover later, take as input, whether the selection vector or the bitmask, and know whether or not to even consider a tuple at an offset.

674
01:18:25,000 --> 01:18:33,000
What if we had s was the batch and there was an out of loop that was actually looping through a bunch of s's, but you see how that could be much better.

675
01:18:33,000 --> 01:18:38,000
Yeah, but don't do that. We can do code, and we can do all of this stuff, we can do that.

676
01:18:38,000 --> 01:18:43,000
Yeah, but like that's, there's going to be, you know, scalar instruction, sissy. We can vectorize all of this.

677
01:18:43,000 --> 01:18:45,000
We can vector as evalpred in the program.

678
01:18:45,000 --> 01:18:46,000
Absolutely, yeah.

679
01:18:46,000 --> 01:18:47,000
Yeah.

680
01:18:48,000 --> 01:18:53,000
That's why this course exists and why you pay you a lot of money to do this stuff, right? It's hard.

681
01:18:53,000 --> 01:18:56,000
All right. Yes.

682
01:18:56,000 --> 01:19:05,000
So, stay with us.

683
01:19:06,000 --> 01:19:14,000
So, could you do in a pull-based approach?

684
01:19:14,000 --> 01:19:20,000
Like this way for the vector is for the company, they have only the advantage.

685
01:19:20,000 --> 01:19:27,000
But so, so, so, but you put a batch of tuples, a vector tuples, or a single tuple.

686
01:19:28,000 --> 01:19:30,000
So, so, so, so, so, so, so, so, so, so, you stay with us.

687
01:19:30,000 --> 01:19:37,000
Can't, if, if I have, in my example here, so I have three out of, three out of what, three out of five match.

688
01:19:37,000 --> 01:19:47,000
So, I have two empty slots. Can I just call it next below me, get the next vector, then, you know, at least find two matches that I've been putting this vector here.

689
01:19:47,000 --> 01:19:52,000
But that's a more bookkeeping, keep track of like how many spaces do I have.

690
01:19:52,000 --> 01:19:57,000
Then I still got to maintain the, the, the, the in the end result of the child thing I call before me.

691
01:19:57,000 --> 01:19:59,000
It's not worth it.

692
01:19:59,000 --> 01:20:02,000
Has his way more in direction, way more branching, way more conditionals.

693
01:20:02,000 --> 01:20:06,000
If I just blindly just keep track of it, here's what it doesn't match. This is wavehazard.

694
01:20:06,000 --> 01:20:12,000
Again, as humans, this goes back to the, the branchless, you know, conditional I showed before or this branchless scan.

695
01:20:12,000 --> 01:20:15,000
As, you're all coming up with examples like, hey, this seems kind of wasteful.

696
01:20:15,000 --> 01:20:20,000
You're passing along tuples like, you know, what, what if I have 1024, my vector size is 1024,

697
01:20:20,000 --> 01:20:27,000
all but one of them are thrown away. Well, again, it's just faster to pass along the other 10,

698
01:20:27,000 --> 01:20:35,000
1023 useless tuples than rather than having to do what he's proposing, I'm going getting any results and filling in the empty space.

699
01:20:35,000 --> 01:20:42,000
Right. It's not worth it. Just do exactly, if you do the same thing that's very straightforward.

700
01:20:42,000 --> 01:20:48,000
And even though you may end up executing more instructions, but you end up using fewer cycles because again,

701
01:20:48,000 --> 01:20:55,000
it's set up in a way that the CPU wants. Yes.

702
01:20:55,000 --> 01:21:01,000
So, the direction vector is exactly like getting, or the right for it.

703
01:21:01,000 --> 01:21:07,000
The statement is, with a selection vector, getting shorter and shorter, it depends on the query, tens of the data, right.

704
01:21:07,000 --> 01:21:13,000
But you would, you would typically size it for the exact size of the vector you're passing along.

705
01:21:13,000 --> 01:21:20,000
So, you could say 1024 and then just have a length to say where the offset is. Where the end actually is.

706
01:21:20,000 --> 01:21:30,000
And again, these aren't, have to be 64 bit IDs. If you only have 1024 possible values, you could store that in 16 bit numbers.

707
01:21:30,000 --> 01:21:36,000
So, it's not that big. Yes.

708
01:21:36,000 --> 01:21:43,000
The size meaning like the allocated size or the actual contents. But why?

709
01:21:43,000 --> 01:21:50,000
I don't know. You definitely end up using the empty space.

710
01:21:50,000 --> 01:21:55,000
But it's not, I think what you're saying is like, could you basically do a mislap allocation to say like,

711
01:21:55,000 --> 01:22:01,000
here's my 10 value vector and here's my 30 value vector, whatever, like 32 value of 64.

712
01:22:01,000 --> 01:22:08,000
Like, as I get full in one vector, then I go use the other one and therefore things hang around in L3, sorry L1 more.

713
01:22:08,000 --> 01:22:12,000
But it's not that big. 1024 times 16 bits is not that big.

714
01:22:12,000 --> 01:22:18,000
Yeah. Okay, what you're proposing is you could do, is that the CPU wants though.

715
01:22:18,000 --> 01:22:23,000
No. Because the worst thing the worst thing to possibly do is call Malak while we're doing any of this.

716
01:22:23,000 --> 01:22:26,000
Because who are we talking to here? We call Malak.

717
01:22:26,000 --> 01:22:30,000
The operating system, right? He's going to screw us over.

718
01:22:30,000 --> 01:22:33,000
So like, we don't want to, like, we pre-allocate everything ahead of time.

719
01:22:33,000 --> 01:22:40,000
Yes, there would be weights in space, but like, it's better than having, again, this, this, it's better than having code to figure out,

720
01:22:40,000 --> 01:22:43,000
okay, try to be clever. Simple as better in this case.

721
01:22:43,000 --> 01:22:47,000
Because again, it's just ripping through two pulls as fast as possible.

722
01:22:47,000 --> 01:22:56,000
Okay? All right, well over time, we'll cover, we'll cover pale execution of building class on Wednesday.

723
01:22:56,000 --> 01:22:57,000
Okay?

724
01:22:57,000 --> 01:23:00,000
All right guys, see ya.

725
01:23:27,000 --> 01:23:29,000
All right.

