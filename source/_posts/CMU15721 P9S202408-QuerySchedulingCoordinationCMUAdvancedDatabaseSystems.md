---
title: CMU15721 P9S202408 QuerySchedulingCoordinationCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Canneke Mellon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:14,000 --> 00:00:16,000
It's too hot now.

4
00:00:16,000 --> 00:00:19,000
We covered Bristol scale, we covered Diarrhea, we covered

5
00:00:19,000 --> 00:00:22,000
what else, behavioral interviews.

6
00:00:22,000 --> 00:00:25,000
Okay, let's talk about databases.

7
00:00:25,000 --> 00:00:28,000
So today we're going to talk about now how do we take the query

8
00:00:28,000 --> 00:00:32,000
plans that we've been given and actually start running them on our

9
00:00:32,000 --> 00:00:33,000
system.

10
00:00:33,000 --> 00:00:37,000
So recall that the last couple lectures we've had were focusing

11
00:00:37,000 --> 00:00:42,000
on how to actually optimize the or build an optimized

12
00:00:42,000 --> 00:00:45,000
execution engine so that we can run Scenroscan queries as fast as

13
00:00:45,000 --> 00:00:46,000
possible.

14
00:00:46,000 --> 00:00:49,000
And again, the major two camps are going to be the vectorization

15
00:00:49,000 --> 00:00:52,000
people using SIMD and then the query compilation stuff that we

16
00:00:52,000 --> 00:00:53,000
talked about last class.

17
00:00:53,000 --> 00:00:56,000
In the case of query compilation, there was two high level

18
00:00:56,000 --> 00:00:57,000
approaches.

19
00:00:57,000 --> 00:00:59,000
There's translation or source to source compilation.

20
00:00:59,000 --> 00:01:03,000
That's like you have your C++ code and MIT C++ code that then gets

21
00:01:03,000 --> 00:01:04,000
compiled.

22
00:01:04,000 --> 00:01:08,000
And then the alternative was from the hyper paper that you guys read was

23
00:01:08,000 --> 00:01:12,000
compilation by generating like a load level IR for the actual

24
00:01:12,000 --> 00:01:15,000
instructions you want to execute for that query plan and then using

25
00:01:15,000 --> 00:01:19,000
something like ASMG or LLVM to compile it.

26
00:01:19,000 --> 00:01:23,000
And again, as I said, the main takeaway that from, you know,

27
00:01:23,000 --> 00:01:27,000
from the, since the seminal papers and vectorization and

28
00:01:27,000 --> 00:01:30,000
compilation have come out over the last decade is that most of

29
00:01:30,000 --> 00:01:33,000
the systems that we're going to read about in the near the end of

30
00:01:33,000 --> 00:01:37,000
the semester are going to choose vectorization with SIMD and

31
00:01:37,000 --> 00:01:40,000
often kind of, it's combination of auto vectorization and,

32
00:01:40,000 --> 00:01:43,000
with the Transix, but they're going to choose that over compilation

33
00:01:43,000 --> 00:01:46,000
just because the engineering overhead to maintain, to build a

34
00:01:46,000 --> 00:01:50,000
maintain a jick compiled database engine is super high.

35
00:01:51,000 --> 00:01:53,000
They will read this in the photon paper from data bricks.

36
00:01:53,000 --> 00:01:56,000
They explicitly call out it's better off having a bunch of

37
00:01:56,000 --> 00:01:59,000
people try to optimize the SIMD stuff because then you can reach

38
00:01:59,000 --> 00:02:05,000
parity to the compilation implementation versus like if you go

39
00:02:05,000 --> 00:02:09,000
down the jit path, there's a small number of people that actually

40
00:02:09,000 --> 00:02:10,000
can work on it.

41
00:02:10,000 --> 00:02:13,000
All right.

42
00:02:13,000 --> 00:02:16,000
So again, today we're talking about scheduling of how do you take a

43
00:02:16,000 --> 00:02:19,000
query plan and divide it up amongst the different workers in our

44
00:02:20,000 --> 00:02:21,000
system.

45
00:02:21,000 --> 00:02:23,000
And so again, just make sure that we're using the right terminology.

46
00:02:23,000 --> 00:02:26,000
We're going to say that a query plan is going to be a

47
00:02:26,000 --> 00:02:29,000
DAG of operators and then, you know, relational operators and then the

48
00:02:29,000 --> 00:02:32,000
operator instance is going to be a new location of that operator on

49
00:02:32,000 --> 00:02:36,000
some portion of the data that we're trying to scan so we're trying to

50
00:02:36,000 --> 00:02:37,000
read a table.

51
00:02:37,000 --> 00:02:40,000
You know, if it's broken up to row groups, we would have an operator

52
00:02:40,000 --> 00:02:43,000
instance be responsible for scanning a single row group and

53
00:02:43,000 --> 00:02:45,000
processing that.

54
00:02:45,000 --> 00:02:48,000
And then a task is going to be some computational piece of work that's

55
00:02:49,000 --> 00:02:53,000
going to contain multiple operator instances typically in the same

56
00:02:53,000 --> 00:02:57,000
pipeline that we want to then hand out to our workers to execute.

57
00:02:57,000 --> 00:03:02,000
And then a task set, sometimes called a resource set and some of

58
00:03:02,000 --> 00:03:06,000
the papers, this is going to be the collection of the tasks that we

59
00:03:06,000 --> 00:03:09,000
need, or the collection of the tasks that we have for given query that

60
00:03:09,000 --> 00:03:11,000
we need to execute.

61
00:03:11,000 --> 00:03:14,000
And the idea is that we know where the pipeline breakers are because

62
00:03:14,000 --> 00:03:17,000
where the data system, where the one building the query plan.

63
00:03:17,000 --> 00:03:22,000
So the idea is to convert these pipelines into individual tasks that we can

64
00:03:22,000 --> 00:03:23,000
then farm out and execute.

65
00:03:23,000 --> 00:03:27,000
And so today's class is really discussing figuring out how do we

66
00:03:27,000 --> 00:03:31,000
assign these tasks to workers in our system.

67
00:03:31,000 --> 00:03:34,000
I'm loosely defined, you know, reason to work term worker generically,

68
00:03:34,000 --> 00:03:38,000
but you can think of it almost as either a core or thread or process.

69
00:03:38,000 --> 00:03:41,000
It doesn't matter, or a node.

70
00:03:41,000 --> 00:03:45,000
And then keeping track of where the data they need access is coming

71
00:03:45,000 --> 00:03:51,000
from, and where is any intermediate results at the generating, where is that going to go?

72
00:03:51,000 --> 00:03:53,000
So this is basically what I said.

73
00:03:53,000 --> 00:03:57,000
The idea of the schedule in our system is that we want to know, for

74
00:03:57,000 --> 00:04:00,000
giving query, how many tasks should we use?

75
00:04:00,000 --> 00:04:03,000
Because if you want to take advantage of all the parallel

76
00:04:03,000 --> 00:04:06,000
cores that we have available to us, also the parallel operations within

77
00:04:06,000 --> 00:04:11,000
SIMD, or that's usually below then what we're actually going to schedule for.

78
00:04:11,000 --> 00:04:14,000
But keeping track of how many tasks we want to use, how many CPU cores we want

79
00:04:14,000 --> 00:04:18,000
to farm them out on.

80
00:04:18,000 --> 00:04:24,000
And then when a task generates some kind of output that needs to go to the next

81
00:04:24,000 --> 00:04:27,000
task, where should we actually store that?

82
00:04:27,000 --> 00:04:30,000
Because in some cases, if it's stored at local loss, it may be the test that's going to

83
00:04:30,000 --> 00:04:32,000
read it, it may be remote.

84
00:04:32,000 --> 00:04:35,000
So it might be better to push the data to where the next task is going to need it.

85
00:04:35,000 --> 00:04:39,000
But you might not know when that task is going to be.

86
00:04:39,000 --> 00:04:41,000
So we'll see this as we go along.

87
00:04:41,000 --> 00:04:47,000
But the paper I had you guys read from Hyper, it's about single node execution.

88
00:04:47,000 --> 00:04:50,000
And we'll see how we tie this all later at the end of the class.

89
00:04:50,000 --> 00:04:54,000
But the three implementation of a schedule we're going to look at, they're all

90
00:04:54,000 --> 00:04:57,000
also going to be all single node systems.

91
00:04:57,000 --> 00:05:01,000
And so the reason why I'm focusing on this rather than the distributed system,

92
00:05:01,000 --> 00:05:03,000
because they think the problem is the same.

93
00:05:03,000 --> 00:05:08,000
It doesn't matter whether it's a single node or multi threaded or multiple nodes that

94
00:05:08,000 --> 00:05:09,000
are each single thread.

95
00:05:09,000 --> 00:05:14,000
It really is, the high little problem trying to solve is what task we want to run where,

96
00:05:14,000 --> 00:05:17,000
and where should the output results go.

97
00:05:17,000 --> 00:05:22,000
And the main takeaway is going to be that we're always going to want to do this ourselves,

98
00:05:22,000 --> 00:05:26,000
especially on a single node and not the operating system.

99
00:05:26,000 --> 00:05:30,000
I think in the Hyper, paper, guys read, I think the distributed between Postgres,

100
00:05:30,000 --> 00:05:33,000
Postgres is just letting the OS do all the scheduling, because it's just, you know,

101
00:05:33,000 --> 00:05:36,000
for full processes.

102
00:05:36,000 --> 00:05:41,000
And I don't think they even play games like process priority and so forth.

103
00:05:41,000 --> 00:05:45,000
But instead, exception of Postgres, every data system is going to want to do all the

104
00:05:45,000 --> 00:05:47,000
scheduling stuff itself.

105
00:05:47,000 --> 00:05:51,000
So we can talk about how to do the single node, and then you'll see how that maps to a

106
00:05:51,000 --> 00:05:53,000
distributed environment.

107
00:05:53,000 --> 00:05:55,000
Although there'll be some things we can do in a distributed environment that we're not going to

108
00:05:55,000 --> 00:05:57,000
cover today, but we'll see this later on.

109
00:05:57,000 --> 00:06:02,000
Like in BigQuery Dremel, they're going to do a shuffle stage after every pipeline breaker.

110
00:06:02,000 --> 00:06:07,000
And that allows them to reorganize and recalibrate the workers later on.

111
00:06:07,000 --> 00:06:10,000
But we'll cover that later.

112
00:06:10,000 --> 00:06:14,000
All right, so what are our goals for building a high performance schedule for a data system?

113
00:06:14,000 --> 00:06:16,000
So obviously we want to maximize throughput.

114
00:06:16,000 --> 00:06:21,000
We want to be able to process as many queries as possible in our system,

115
00:06:21,000 --> 00:06:24,000
you know, just sort of keep the thing always running and always consuming

116
00:06:24,000 --> 00:06:27,000
of results and producing a pretty thing output.

117
00:06:27,000 --> 00:06:31,000
We're going to maintain some notion of fairness.

118
00:06:31,000 --> 00:06:35,000
And again, this is subjective of what fairness means to sort of one query to another query.

119
00:06:35,000 --> 00:06:40,000
But at a high level is that at the end of the day, we need to make sure that no query gets

120
00:06:40,000 --> 00:06:41,000
started for resources.

121
00:06:41,000 --> 00:06:44,000
So even though we may delay the priority, and we'll talk about what that means,

122
00:06:44,000 --> 00:06:48,000
why we want to do that as we go along, but we want to, even if you get a lower priority,

123
00:06:48,000 --> 00:06:55,000
or you're a long running query, the end of the day, we still want you to complete.

124
00:06:55,000 --> 00:07:00,000
And then the flip side of this is that we want to make sure that the system seems to be responsive.

125
00:07:00,000 --> 00:07:06,000
That's reducing the tail latency, like the P999 latency of queries if we can.

126
00:07:06,000 --> 00:07:10,000
But this will matter a lot for short queries.

127
00:07:10,000 --> 00:07:14,000
And so the idea here is that we want our short queries to complete as fast as possible,

128
00:07:14,000 --> 00:07:17,000
because that's something someone's going to notice.

129
00:07:17,000 --> 00:07:21,000
At the shortest scales of a query execution, like if your query goes from, you know,

130
00:07:21,000 --> 00:07:26,000
100 milliseconds to a thousand milliseconds, then you would notice that.

131
00:07:26,000 --> 00:07:29,000
So you want to get these short queries out as quickly as possible.

132
00:07:29,000 --> 00:07:34,000
But if you're like your query is running for 10 minutes, and it takes 20 seconds longer,

133
00:07:34,000 --> 00:07:36,000
no one's going to notice that.

134
00:07:36,000 --> 00:07:40,000
So the system's going to appear by responsive if you get the shorter queries out more quickly.

135
00:07:40,000 --> 00:07:48,000
And the case of the morsel stuff, they don't have a specific way to actually handle that.

136
00:07:48,000 --> 00:07:50,000
They're sort of treating everyone rough.

137
00:07:50,000 --> 00:07:56,000
They had a few other things they were suggesting that might be in the subsequent paper.

138
00:07:56,000 --> 00:07:58,000
In the umbra one.

139
00:07:58,000 --> 00:08:00,000
It wasn't the hyperbale, the one that we did.

140
00:08:00,000 --> 00:08:05,000
There was something in the conclusion that they would like to do it.

141
00:08:05,000 --> 00:08:07,000
I don't know why they didn't hyper.

142
00:08:07,000 --> 00:08:08,000
They do it in umbra.

143
00:08:08,000 --> 00:08:13,000
We'll cover that in a second.

144
00:08:13,000 --> 00:08:19,000
Yeah, so I mean, but the morsel's one is again, that sets the foundation for this idea of how to divide up the work.

145
00:08:19,000 --> 00:08:24,000
And they're going to do a static assignment of tasks to morsels, and we'll see in umbra how they can break that.

146
00:08:24,000 --> 00:08:27,000
The umbra one is more sophisticated.

147
00:08:27,000 --> 00:08:31,000
And the last one, of course, is that we want our scheduler to have low overhead.

148
00:08:31,000 --> 00:08:39,000
Like it doesn't help us ever running this super complex computation to figure out the optimal schedule for all our tasks.

149
00:08:39,000 --> 00:08:43,000
That takes 20 minutes, and a query can finish up in a few milliseconds.

150
00:08:43,000 --> 00:08:53,000
So we want to have most of our system spending time, uh, you're computing queries, because that's what people, you know, end of the day really care about.

151
00:08:53,000 --> 00:08:56,000
So I'm going to just talk about some quick background in the beginning.

152
00:08:56,000 --> 00:09:02,000
Again, this will be a, uh, quick reminder of the things we talked about in the intro class.

153
00:09:02,000 --> 00:09:04,000
But first I'm about like, what is actually a worker?

154
00:09:04,000 --> 00:09:09,000
Like how are we defining the scope of a competition, you know, where is it actually located in our system?

155
00:09:09,000 --> 00:09:13,000
What briefly talk about what data placement actually means in the context of partitioning?

156
00:09:13,000 --> 00:09:18,000
And that basically just, if I've already divided the data up in some way, where should I put that data?

157
00:09:18,000 --> 00:09:22,000
And the two are linked together, but we'll discuss that.

158
00:09:22,000 --> 00:09:30,000
And then that's the one of the things that the morsels paper spent a lot of time talking about was this notion between, uh, you know, local memory and remote memory in a new architecture.

159
00:09:30,000 --> 00:09:35,000
And they were trying to schedule things so that you're always processing stuff that was local to you.

160
00:09:35,000 --> 00:09:47,000
Again, the same idea applies in an distributed system, ideally, we want our, our workers, we want to know processing data that's local to it, rather than having to go over the network, you know, to some far stories.

161
00:09:47,000 --> 00:09:50,000
And then we'll talk about three implications of schedulers.

162
00:09:50,000 --> 00:09:53,000
We'll talk about the morsels and hyper, we'll talk about the follow up and umbra.

163
00:09:53,000 --> 00:09:56,000
And then we'll talk about an alternative from the SAP HANA guys.

164
00:09:56,000 --> 00:10:02,000
Um, and then we'll finish off again just putting in the context of an distribute architecture.

165
00:10:03,000 --> 00:10:04,000
Okay?

166
00:10:05,000 --> 00:10:13,000
And so the, the, what will be interesting about the, the, we're talking about schedule implementations, we'll see an umbra and hyper.

167
00:10:13,000 --> 00:10:30,000
These are, these are going to have like, sort of dedicated worker pools that are just like, uh, crunching through all the tasks as they can, whereas, uh, in the HANA one, they're trying to be a bit more sophisticated and have this notion of some worker threads can be asleep, some worker threads can be parked.

168
00:10:30,000 --> 00:10:37,000
Uh, and we'll also see this trade up between work stealing and not work stealing, which is another dynamic we have to consider as well.

169
00:10:37,000 --> 00:10:46,000
Alright, so, and this is just a reminder of, of from the interclass that there's a, there's this notion of a process model and any data is minute system.

170
00:10:46,000 --> 00:10:54,000
And this specifies what the, uh, what a worker actually is going to be in our, in our system.

171
00:10:54,000 --> 00:11:06,000
Right? So the, the sort of earlier day, early database systems in the 1980s, early 1990s, these were a process based system, meaning like every worker was a separate OS process.

172
00:11:06,000 --> 00:11:11,000
Because back then they didn't have, uh, p threads like we have now that, you know, they weren't really portable.

173
00:11:11,000 --> 00:11:22,000
So if you wanted to support one unit versus another unit, you had basically hit, you know, the positive CPI specified how to do fork to spawn processes, then maybe not, uh, didn't have threading.

174
00:11:22,000 --> 00:11:28,000
Every modern system now today is going to be multi threaded. So we'll assume in our system we're conceptually building that we multi threaded.

175
00:11:28,000 --> 00:11:36,000
The only ones that are not multi threaded are ones that fork postgres, because postgres is a, uses a process per worker.

176
00:11:36,000 --> 00:11:48,000
And the worker is going to be this generic term that means it's just the computational resource that can be assigned a task, uh, to execute, you know, for some query or something for the internal data, something for the database system.

177
00:11:48,000 --> 00:11:54,000
And that it can take some data in crunch on it, uh, in our operative instances and then produce output.

178
00:11:54,000 --> 00:12:02,000
Now, as I said, for, for our purposes going forward, consume every system, unless they fork postgres is going to be multi threaded.

179
00:12:02,000 --> 00:12:12,000
For some reason in, uh, in the early days when I first started CMU, we took postgres and we decided to, uh, make it multi threaded instead of multi process.

180
00:12:12,000 --> 00:12:26,000
Um, I forget why we did that. Uh, well, the interesting about it is, if you're looking at postgres code, there's a bunch of pound of fines for the different CPU for different OSs, they support, like Linux and Windows and Hpux and BSD.

181
00:12:26,000 --> 00:12:35,000
And we end up going and using like the win 32, uh, code. And that was, that was the least starting point for us to then convert everything to P threads.

182
00:12:35,000 --> 00:12:44,000
And we're not converted to C++ 11, which I don't know why we did that one either. Um, yeah, we did it. We shouldn't have done it, but whatever. Yes.

183
00:12:44,000 --> 00:12:47,000
You said postgres is single credit, but I thought you also said that there's processes and then there's a process.

184
00:12:47,000 --> 00:12:56,000
Postgres, it's a process per worker. So the, the worker is going to be a whole entire OS process.

185
00:12:56,000 --> 00:13:12,000
So we can do some parallel execution of queries, but that's going to cross multiple processes. And they use shared memory to communicate, but no, but like you wouldn't build a system like that today. Yes.

186
00:13:12,000 --> 00:13:21,000
So the question is, if it's all, fall moderating systems are multi threaded, why, why was it a bad idea for us to try to do that in postgres?

187
00:13:21,000 --> 00:13:30,000
Looking back on it now, I fail to see what the, what the research, uh, research contribution would have been. Right. We.

188
00:13:30,000 --> 00:13:45,000
Well, we had this execution that was written in C++ that was faster than postgres, which is not hard, always hard to do. I mean, I said not that hard to do. And then rather than sliding it in as an extension using extension hooks that postgres supports, which is a times go does and slightest does.

189
00:13:45,000 --> 00:13:53,000
C fouls another one. There's a bunch of these data systems that use extension hooks to get over that bench inside of postgres. We decided to like fork everything.

190
00:13:53,000 --> 00:14:03,000
And then we the top half of postgres, we have the top half kept the top half, rewrote the bottom half inside of the end and just scrap the whole top and rewrite everything because everything was sort of slow for what we wanted to do.

191
00:14:03,000 --> 00:14:10,000
But again, I had to do a lot of again. I would have just use extensions. Yes.

192
00:14:10,000 --> 00:14:19,000
So this process model is just like multiple.

193
00:14:19,000 --> 00:14:28,000
It's question is the process model determine the, the new into policy stuff, or is it just like, is it a thread per worker? Is it a process for? It's just a process for worker.

194
00:14:28,000 --> 00:14:34,000
It's just like, like, is it a, what is the, is it a thread? Is it a process is the process pool?

195
00:14:34,000 --> 00:14:49,000
The new most stuff is is, is it's low? Okay. So the other thing we can account for is how do you want to sign the workers to CPU cores?

196
00:14:49,000 --> 00:15:00,000
And the, the basic two approaches are you could have a single dedicated thread or single dedicated worker be the, the only thing that can run on a single core, single CPU core.

197
00:15:00,000 --> 00:15:15,000
And this prevents like, this prevents contention on that core where like two threads are trying to run at the same time, the workers trying to run at the same core and they're trashing each other's, you know, L3 caches and so forth. Yes.

198
00:15:15,000 --> 00:15:27,000
So one worker is working on one task or one task set or one partition of the task set?

199
00:15:27,000 --> 00:15:42,000
We're not there yet. Right. But it's going to be one task. Yes. And again, and the thing about like at the scan this table, the table has 10 chunks or morsels, you have one worker for each of those, those 10 morsels.

200
00:15:43,000 --> 00:16:01,000
Right. The other one is going to be, you know, multiple workers on a, on a CPU core. And the idea here is that with when one, one core gets, or thread gets stalled because, a one worker thread gets stalled because the thing it needs is on, is that on disk, maybe a fashion of memory or even, there's like a low level L3 cache miss.

201
00:16:01,000 --> 00:16:23,000
Right. You could have other threads run at the same time. For maximum performance, this is probably the right way to go though. Right. And actually, if it's have, you also want to turn off hyper threading is run, you know, bare metal harbor threads. Because the, because we're going to be CPU bound and most of the computations we're going to do in our database system, we don't want any contention on, on the actual harbor itself.

202
00:16:23,000 --> 00:16:37,000
Right. There's other advantages in this for, if you do like transaction processing, where thing you can't, you don't want any stools, but for OLAP, for both OLAP and OTP, this could be the better way to go.

203
00:16:37,000 --> 00:16:44,000
The Honda guys are going to claim this is better because they're going to have really, they're going to try to do fine grade control, what threads are actually awake and running at a given time.

204
00:16:44,000 --> 00:16:52,000
But again, we'll, we'll cover that later and they claim that's me better for a machine with a lot, lot, lot of corpse, I'm sorry, a lot of sockets. Yes.

205
00:16:52,000 --> 00:16:55,000
You see what you want to spend it? Yes.

206
00:16:55,000 --> 00:16:58,000
Why would you want the course to be?

207
00:16:58,000 --> 00:17:07,000
So if, if you're compute bound and you're careful about what you're putting in your CPU cache is and you're prefetching things ahead of time, the course should never be stalled.

208
00:17:08,000 --> 00:17:21,000
Again, we saw this with the branchless stuff. Like if you, if you designed the, the system such a way that like, you avoid branch mis predictions and having to flush the pipeline of the CPU, then you should just be crunching through data as fast as possible.

209
00:17:21,000 --> 00:17:24,000
And you should never have installs for branches. Yes.

210
00:17:24,000 --> 00:17:27,000
It is for CPU core or for hardware thread.

211
00:17:27,000 --> 00:17:34,000
For core, but within that you turn off hyper threading so it's one-hubber thread.

212
00:17:36,000 --> 00:17:41,000
It's like a socket can have four cores and each core can have two threads because of hyper threading.

213
00:17:41,000 --> 00:17:45,000
So you turn off hyper threading and now it's one core equals one-hubber thread.

214
00:17:45,000 --> 00:17:50,000
So turn off hyper threading because the boiling contains more value? Yes.

215
00:17:50,000 --> 00:17:52,000
You're running basically a bare metal.

216
00:17:53,000 --> 00:17:59,000
What, wait, why turn off hyper threading on the whole system? Like wouldn't you be able to then run a little like give a cron job running?

217
00:17:59,000 --> 00:18:03,000
So you have that run on the, what is that cron job? What is this for?

218
00:18:03,000 --> 00:18:06,000
I don't like give a server run. You have a database on a server. Yes.

219
00:18:06,000 --> 00:18:21,000
It's dominating the CPU. Yes. Right? You can have that. It can handle all of the, all of the, it can sort of own all of the actual real threads that correspond to real core and maybe then the back-on-past system can run on the unutilized structure for it.

220
00:18:21,000 --> 00:18:27,000
So these back, like, like, like, garbage collection and stats collection or what, what, what are these background tasks? Like not even prior to the data.

221
00:18:27,000 --> 00:18:32,000
Oh, random, like random stuff? Why would you run them in your database server?

222
00:18:32,000 --> 00:18:36,000
Well, I mean, presumably it's running on an electrical stage. Yes?

223
00:18:36,000 --> 00:18:41,000
We're doing something. Yeah. Turn all that off. You don't want any of that. No, no.

224
00:18:41,000 --> 00:18:46,000
The core of the question is why not these have the threading on? Is there an advantage to turn it off?

225
00:18:46,000 --> 00:18:53,000
Yeah. You don't have, you don't have two threads contending for the same hardware resource.

226
00:18:53,000 --> 00:19:01,000
Yeah. I do have a graph.

227
00:19:01,000 --> 00:19:12,000
My impression was that when you have a type of threading on the other left, the thread is formed between core. It's going to only use the unutilized part of the core.

228
00:19:12,000 --> 00:19:21,000
What is the unutilized part of the core? You have a pipeline of instructions.

229
00:19:21,000 --> 00:19:32,000
So when one gets stalled, the idea is you swap out all the registers for this other logical thread, hyperthread, and then they come in and pick up where you left off.

230
00:19:32,000 --> 00:19:39,000
But, like, again, if you're CPU bound, there's not going to be stalled like that.

231
00:19:39,000 --> 00:19:49,000
Yes. So we don't want contention just as some of the threads. We don't want contention because when we have two threads, if we have a pf-fending, then we end up...

232
00:19:49,000 --> 00:19:52,000
...is because they find the same hardware, we don't even have cash in this.

233
00:19:52,000 --> 00:19:54,000
At the other level, or is...

234
00:19:54,000 --> 00:19:56,000
Yes. The same thing is...

235
00:19:56,000 --> 00:20:05,000
If there's more contention, if there's more things running on a single core, saying two hyperthreads, then they're both trying to do something to amount of work,

236
00:20:05,000 --> 00:20:15,000
and they want things that need bring in the L3 cash, or the brand in your caches, and that's going to pollute it, and then where has it been better off just letting one thread run to completion?

237
00:20:15,000 --> 00:20:22,000
Yes. For your desktop, sure, because you're browsing the web, listening to music, watching videos, there's a ton of stalls of that. Who cares?

238
00:20:22,000 --> 00:20:34,000
But for the deabysism, you're not running random bitcoin mining on it. There's no cron jobs. If you really care about your deabysism, if it's a blog, you're running my SQL Postgres,

239
00:20:34,000 --> 00:20:43,000
just to service the blog, no, who cares? Sure. But if it's like a high-end deabysism, like, you're not letting anybody's ssc into and run random stuff.

240
00:20:43,000 --> 00:21:02,000
So this is an older experiment that students did here at CMU, where it's just sort of toy-in-memory engine, and it's just damaging between letting the database system decide where it actually plays data in a new architecture.

241
00:21:02,000 --> 00:21:18,000
Does anyone know what Numa is? Who doesn't know what Numa is? Perfect. Excellent. Yeah. So the idea is, do you let the deabysism figure out, okay, this piece of data is going to go this court at this location, or this Numa region, or you let the OS figure it out for you.

242
00:21:18,000 --> 00:21:32,000
And so what you see here is that before you get to the hyper-threading line, you're going to get better scalable performance, better performance, when the deabysism controls exactly where the data is relocated, because now, as we've added data, that's local to it.

243
00:21:32,000 --> 00:21:43,000
You don't have to go over the interconnect, which in some cases can be 2x latency. So that's why this thing is going to happen. Now, to your point, why not leave hyper-threading on? This is when hyper-threading kicks in.

244
00:21:43,000 --> 00:22:03,000
And now you see complete flatlines, because for either one, because it's CPU bound computation. And in the cases when it has to go to memory to go fetch something to fill out the cache, well, if I'm running another hyper-thread, it's going to do the exact same thing, and now I'm not going to get any benefit.

245
00:22:03,000 --> 00:22:12,000
So here, I'm throwing more threads at it, but performance is plateaued. Yes?

246
00:22:12,000 --> 00:22:30,000
Yes? All of these are, right? Like, all of these are fetching from memory. But like, if I'm fetching from memory is so expensive, if I'm fetching from memory, and I'm waiting for that, then you start running, well, what are you going to do?

247
00:22:30,000 --> 00:22:42,000
What are you going to do? fetch from memories? Is it the exact same thing I am? So, and now you're blocked on the bandwidth of getting things from the dims to the CPU. Plus you're polluting your cache.

248
00:22:42,000 --> 00:22:59,000
Furthermore, you might, I mean, this is, it's hard to talk to the architecture people, but now you like, I don't know how well the hardware prefetching is going to be, because now, like, I would have been better off having one thread ripped through a larger chunk of data versus having two threads sort of different spots and try to prefetch those.

249
00:22:59,000 --> 00:23:12,000
Again, I think the hardware prefetching stuff could probably handle that, but it's just making things more complicated. Whereas if you keep the system more simple, you know, we can get better utilization of what we have.

250
00:23:12,000 --> 00:23:24,000
Okay, so, hyper threading, nice, in general, but not for databases. Okay, so we were.

251
00:23:24,000 --> 00:23:33,000
So, the next thing we got to consider is how we actually are going to get our tasks to our workers. And there's basically two approaches either push versus the pool.

252
00:23:33,000 --> 00:23:47,000
And the, in the, the push approach, there's some kind of centralized dispatch or schedule component that has a global view or a view of what the workers that it's, that's that are on its purview or administrative control.

253
00:23:47,000 --> 00:23:59,000
It knows what tasks they're doing. And then as, as new tasks arrive, it's pushing the, those requests, those tasks, requests to the different, different workers, always give them something to do.

254
00:23:59,000 --> 00:24:07,000
Right? And then when the worker notifies if batch is finished, you know, it's immediately going to be given here, here's the next thing to do.

255
00:24:07,000 --> 00:24:21,000
The pool based approach, which is going to be the better approach, which everyone's going to do, is going to be that they're the, the, the sum's schedule component that's maintaining the, the queue of all possible tasks that could be executed at any given time.

256
00:24:21,000 --> 00:24:35,000
With additional metadata of maybe about what data they're trying to access and where's that located. And then now the workers went, when they need something to do, they, they come to this, this, this queue and get the next thing to do.

257
00:24:35,000 --> 00:24:46,000
Right? And this is just easier because it's, it's less coordination of like, or maintaining state about, you know, where, where each worker is in, you know, in this computation.

258
00:24:46,000 --> 00:24:55,000
It just says, hey, here's much stuff to do. Here's, you know, it's all a cart and people can come, come and pull things off the buffet tray when they're ready for it.

259
00:24:55,000 --> 00:24:56,000
Yes.

260
00:24:56,000 --> 00:24:58,000
Which one has a lower overhead?

261
00:24:58,000 --> 00:25:01,000
Questions? Which one has lower overhead overhead from what?

262
00:25:01,000 --> 00:25:11,000
We don't want to share any of the things with you much time. And so, naturally, if you, if you're a worker who has to go pull from the queue, that probably is, you're eating up the cycle of them doing that.

263
00:25:11,000 --> 00:25:25,000
So, yeah, so the statement is, I think there's actually two parts of it. The statement is, questions, which one has lower overhead? If it's the pool based approach, then you have every worker thread going to say, what should I be doing next on their own?

264
00:25:25,000 --> 00:25:29,000
And won't that incur a penalty for, you know, when they could be running queries?

265
00:25:29,000 --> 00:25:41,000
Sure. Yes. In some ways, and there's the second aspect also too, is like, this queue thing, which you'll see in the hyperpaper, is a global data structure, which now you have to protect with latches or locks.

266
00:25:41,000 --> 00:25:44,000
And then now everybody could be potentially contended on that.

267
00:25:45,000 --> 00:25:57,000
So, everyone's still going to choose this just because it's, you can build this, this schedule as a separate service, and not worry about exact control, exact knowledge of what every single worker is actually doing.

268
00:25:57,000 --> 00:26:06,000
Because the worker may die, right? And then now you've got to figure out, like, you know, that I told a bunch of, two bunch of stuff ahead of time, and now I can't do it.

269
00:26:06,000 --> 00:26:12,000
Where you just say, here's everything I need to do, and then now each worker thread that then figure out on the run, what's the best thing for them to do?

270
00:26:12,000 --> 00:26:15,000
They're all sort of working globally to solve the problem.

271
00:26:15,000 --> 00:26:18,000
Also, it's less intelligent than the pool based approach.

272
00:26:18,000 --> 00:26:20,000
Yeah.

273
00:26:20,000 --> 00:26:22,000
You can make the difference.

274
00:26:22,000 --> 00:26:26,000
He says it's less intelligent, but like, relative to what? To this?

275
00:26:26,000 --> 00:26:29,000
To that, because you can have that out even in the first one.

276
00:26:29,000 --> 00:26:33,000
You can have the priorities in pool one, just because hyper does and doesn't mean you can't.

277
00:26:34,000 --> 00:26:36,000
We'll see it in a second.

278
00:26:36,000 --> 00:26:39,000
You mentioned like, the push based approach, like, workers die even in some issues.

279
00:26:39,000 --> 00:26:41,000
How does it also not make a issue with a pool based approach?

280
00:26:41,000 --> 00:26:45,000
Yeah, he's right. If a push based approach has workers die, you've got to figure it out.

281
00:26:45,000 --> 00:26:49,000
Actually, that would be a approach to not approach one.

282
00:26:49,000 --> 00:26:51,000
You sort of have to deal with it in the pool one.

283
00:26:51,000 --> 00:26:58,000
Yes, all right. Because you basically need a hard peat to figure out who they didn't come back.

284
00:26:58,000 --> 00:27:08,000
Another way to think about it in the pool based approach is that you can have the logic to figure out what task it the worker needs to execute itself.

285
00:27:08,000 --> 00:27:13,000
Next is basically that logic is being distributed across multiple workers.

286
00:27:13,000 --> 00:27:20,000
Whereas, if it's a single centralized service, then it's one beefy box or whatever it has to then figure this out.

287
00:27:20,000 --> 00:27:22,000
I'd probably say that's the main distinction.

288
00:27:22,000 --> 00:27:23,000
Yes.

289
00:27:23,000 --> 00:27:28,000
So, you can use this approach for the customer to maybe be talking about how long you have to take.

290
00:27:28,000 --> 00:27:33,000
The question is, in the pool based approach, is the schedule need to keep track of how long each asset is going to take?

291
00:27:33,000 --> 00:27:37,000
Yes. Hyper doesn't do that. We'll see you in a second.

292
00:27:37,000 --> 00:27:41,000
Can you use the same cost model as the query optimizer?

293
00:27:41,000 --> 00:27:44,000
The question is, can you use the same cost model as the query optimizer?

294
00:27:44,000 --> 00:28:00,000
So, the challenge there is that some cost models in some systems, you can't map whatever the cost estimate to a wall clock time.

295
00:28:00,000 --> 00:28:04,000
The error looked at postgres, it's some number.

296
00:28:04,000 --> 00:28:07,000
It's a combination of like, is it?

297
00:28:07,000 --> 00:28:12,000
I don't think it's going to take that number.

298
00:28:12,000 --> 00:28:14,000
Oh, it's 10 milliseconds.

299
00:28:14,000 --> 00:28:25,000
The high end enterprise data system is trying to give you cost estimates to say, here's the relative cost of the query, which is an internal value that you can use to compare different query plans.

300
00:28:25,000 --> 00:28:27,000
They also give it spit out.

301
00:28:27,000 --> 00:28:29,000
I think it's going to take this amount of time.

302
00:28:29,000 --> 00:28:32,000
You could do that.

303
00:28:32,000 --> 00:28:34,000
But again, we'll see this in a few weeks.

304
00:28:34,000 --> 00:28:36,000
Cost models are always widely off.

305
00:28:36,000 --> 00:28:45,000
So, in the umbraith, which I keep, the umbraith scheduling paper, which I keep alluding to, they're actually going to watch how long it has to taste.

306
00:28:45,000 --> 00:28:56,000
And then use that to figure out, you know, to get a rough estimate of like what the schedule time should be for certain things.

307
00:28:56,000 --> 00:28:58,000
Okay.

308
00:28:58,000 --> 00:29:06,000
So, regardless of how we're going to allocate workers or tasks to our resources and our system.

309
00:29:06,000 --> 00:29:15,000
As we said already, that it's important to make sure that the data they're going to process ideally is going to be local to whatever that worker is.

310
00:29:15,000 --> 00:29:20,000
And in the case of the hyperpaper, it's an n-memory database.

311
00:29:20,000 --> 00:29:23,000
So, local means it's in the same Numa region.

312
00:29:23,000 --> 00:29:36,000
Obviously, in a distributed system, especially within a shared disk architecture, while the cost of going to get data from S3 could be basically the same for every single worker node, assuming you're in the same data center in the same region.

313
00:29:36,000 --> 00:29:47,000
But once we start caching things, which we'll see later in the semester, like every compute node could have its own local copy of, you know, follows red from S3.

314
00:29:47,000 --> 00:29:54,000
And then now, when I want to sign tasks, I want to make sure that the task is assigned to the node that's going to have a local copy of that data.

315
00:29:54,000 --> 00:29:55,000
Yes.

316
00:29:55,000 --> 00:29:59,000
This is also not a region where it's full of these slightly numbers because it doesn't know what part of what.

317
00:29:59,000 --> 00:30:03,000
If it just looks at a global queue and like, give me the next task.

318
00:30:03,000 --> 00:30:04,000
Yes.

319
00:30:04,000 --> 00:30:10,000
It's not a story that the data that is needed for that next task is there a nice global story.

320
00:30:10,000 --> 00:30:20,000
And, David, is the pool seems to be done because if the worker is trying to maximize the locality of the data and needs access, it can't do that in a pool waste approach. Why not?

321
00:30:20,000 --> 00:30:23,000
Because it's just popping the top one through the top.

322
00:30:23,000 --> 00:30:25,000
You know, you're not the pop from the top.

323
00:30:25,000 --> 00:30:26,000
What do we do?

324
00:30:26,000 --> 00:30:30,000
Well, the hyper does it one way. We'll see in other ways, in other systems.

325
00:30:30,000 --> 00:30:31,000
All right.

326
00:30:31,000 --> 00:30:35,000
I mean, you have a priority queue. You don't always have to pop from the top.

327
00:30:35,000 --> 00:30:47,000
Now, if you're doing work-stealing, you may recognize that the thing at the head of the queue is not local to you, but you may want to go ahead and run it anyway because you're available.

328
00:30:47,000 --> 00:30:49,000
Hyper does that.

329
00:30:49,000 --> 00:30:53,000
I don't think Umber doesn't, Hanna doesn't.

330
00:30:53,000 --> 00:30:56,000
It's only the priority would be differently for a greater understanding of the problem.

331
00:30:56,000 --> 00:30:57,000
Yeah, absolutely.

332
00:30:57,000 --> 00:31:03,000
Yes, so it's not so it's a global queue in that.

333
00:31:03,000 --> 00:31:11,000
In that everyone can see it and manipulate it, but it's not going to guarantee fight for ordering of the elements of the unit.

334
00:31:11,000 --> 00:31:14,000
Right. So it's a priority queue.

335
00:31:14,000 --> 00:31:19,000
In hyper, it's a hash table, right?

336
00:31:19,000 --> 00:31:26,000
Okay. So again, I've already said this. Like you could have some data systems will have locally attached storage as a cache.

337
00:31:26,000 --> 00:31:32,000
Like again, think of like you spin up an EC2 node, you can get ones with NVMe drives that are local to that are really fast.

338
00:31:32,000 --> 00:31:34,000
And so you'd use that as a local cache.

339
00:31:34,000 --> 00:31:38,000
It's a femoral, so if the node crashes, you don't need to retain anything in there.

340
00:31:38,000 --> 00:31:43,000
But again, while it's available, you could use that set of having to go to S3.

341
00:31:44,000 --> 00:31:51,000
In some systems, again, Snowflake is probably the most aggressive on this, because again, they don't want to pay Amazon S3 costs.

342
00:31:51,000 --> 00:31:53,000
They can also use other nodes as nearby cache.

343
00:31:53,000 --> 00:31:58,000
So if you know this other node is run for the data and you're running the task, it's set to go into S3.

344
00:31:58,000 --> 00:32:07,000
You could go directly to that node and get it, but they're actually not going to do that because they don't want to interfere with the other node because they might be going slow.

345
00:32:08,000 --> 00:32:12,000
If you're stealing work that was meant for this other node, it's probably because they're slow.

346
00:32:12,000 --> 00:32:15,000
So why go start making requests of them to make them even slower?

347
00:32:15,000 --> 00:32:17,000
It's sort of the logic there.

348
00:32:17,000 --> 00:32:24,000
And then the Numa versus not uniform memory access stuff we've already talked about, like local versus remote memory.

349
00:32:24,000 --> 00:32:26,000
Sorry.

350
00:32:26,000 --> 00:32:28,000
Oh yeah, so partitioning placement.

351
00:32:29,000 --> 00:32:44,000
So in the intro class, we talked about partitioning this idea of how to take a data set and pick some set of columns or some keys and then divide it up based on the values of these keys across different files.

352
00:32:44,000 --> 00:32:57,000
And that would allow you to spread out the data evenly, ideally across resources, so that when a query arrives that can run in parallel, each worker can have the same amount of work.

353
00:32:57,000 --> 00:33:00,000
So they're all sort of processing things uniformly.

354
00:33:00,000 --> 00:33:07,000
So there's going to be some policy that you're going to use to say, here's how I want to split things up, hash partitioning, round, round, range partitioning, and so forth.

355
00:33:07,000 --> 00:33:14,000
And then there'll be some target objective you're trying to have for deciding how I want the reason why I want to partition things a certain way.

356
00:33:14,000 --> 00:33:19,000
So one thing to be I want to reduce the amount of network traffic when I do a join.

357
00:33:20,000 --> 00:33:30,000
Maybe I want to partition my tables on the things that the join keys so that the joins can always be repeated locally rather than have to do a shuffle or broadcast join.

358
00:33:30,000 --> 00:33:38,000
In our world, in the shared disk, you know, the lake house environment, we're typically going to be doing round, round, and based on files.

359
00:33:38,000 --> 00:33:41,000
Because we're not the ones generating these files.

360
00:33:41,000 --> 00:33:44,000
Right, someone loaded a bunch of stuff in S3, a bunch of parquet, org files.

361
00:33:44,000 --> 00:33:52,000
We're not going to have time to go fix them up and put them partition them and rebalance them according to, again, some target objective.

362
00:33:52,000 --> 00:33:57,000
Snowflake will do this, they call micro partitions, but I think they only do it for their internal data format.

363
00:33:57,000 --> 00:34:03,000
Meaning like if you do insert queries to put data into snowflake, then they can rebalance stuff later on.

364
00:34:03,000 --> 00:34:08,000
Repartition later on. But again, if it's not your files in S3, you can't rewrite them.

365
00:34:08,000 --> 00:34:27,000
So if you're doing round, round, and partitioning at the file level, what is the data that you're doing?

366
00:34:27,000 --> 00:34:32,000
It literally is like file one, go to you, file two, go to him, file three, go to him, that's it.

367
00:34:32,000 --> 00:34:35,000
Question, they shouldn't be uniform size.

368
00:34:35,000 --> 00:34:40,000
Typically, yeah, I think so, yeah.

369
00:34:40,000 --> 00:34:50,000
I mean, obviously you can imagine, to generate cases where I have a bunch of one gay white files and I have one terabyte file, then that was screw things up.

370
00:34:50,000 --> 00:34:53,000
I don't know what they might break that up, so far, right?

371
00:34:53,000 --> 00:35:07,000
I mean, the way to handle that one also, you could assign the same file to different nodes, but then you just within that file you say, okay, 0 to 5 goes to this one, 6 to 10 goes to that one.

372
00:35:07,000 --> 00:35:09,000
You could divide that further, but I don't think they do that.

373
00:35:09,000 --> 00:35:14,000
Yeah, originally on Ruby, it plays more sense, so those are similar in size.

374
00:35:14,000 --> 00:35:23,000
Yes, I could walk again, in parquet based on number of tuples, or because based on the data size, but in the end, roughly about the same, yes.

375
00:35:23,000 --> 00:35:32,000
Sorry, because it's roughly the same question, but I'm trying, like, in the main reason that we would split at the file level, when doing round the Robin.

376
00:35:32,000 --> 00:35:34,000
Is it like, further within a file?

377
00:35:34,000 --> 00:35:42,000
No, no, I like, if we have 5 files, why is it then 1, 2, 3, 4 files? Why is that split? If some advantage to it beyond it's like, if you...

378
00:35:42,000 --> 00:35:51,000
His question is, if, if, why do it split based on the file, is there any performance advantage to it? It's easy.

379
00:35:51,000 --> 00:35:52,000
It's easy.

380
00:35:52,000 --> 00:35:57,000
I mean, you maintain less metadata. I have 5 files, I need 5 entries in my catalog to say where these files are.

381
00:35:57,000 --> 00:36:06,000
If I start doing some division within that, then I have to maintain more metadata, which some systems can do.

382
00:36:06,000 --> 00:36:15,000
If you're doing range partitioning, yeah, you had to keep track where the ranges are. If it's hash partitioning, you actually don't need to do any of that. It's even cheaper.

383
00:36:15,000 --> 00:36:21,000
You could just say, here's the column, here's the hash key, you're whatever, you know, I want to hash on, and decide where it goes.

384
00:36:21,000 --> 00:36:30,000
Now, if you're doing consistent hashing, which snowflake does, where on the file level, then you've got to maintain that data structure to do consistent hashing, but that we'll cover that later.

385
00:36:30,000 --> 00:36:38,000
So partitioning tells you how to split things up. The placement policy determines where those partitions are actually going to go.

386
00:36:38,000 --> 00:36:45,000
And again, the simplest thing to do is basically, I got 5 machines, then you just get 1 file, it's around robbing that.

387
00:36:46,000 --> 00:36:55,000
You could try to be clever of breaking things up in more sophisticated ways. We can ignore that. This is the easiest way to do it.

388
00:36:55,000 --> 00:37:12,000
So now in our catalog, we say, I have these sizes and this and this and that, whatever I was able to clean when it was imported into my system, where I was notified that it existed in S3, and then I keep track of like, this worker is responsible for it.

389
00:37:12,000 --> 00:37:27,000
So any query that shows up, then has a task that wants to process that file, again, which we would determine in the optimized for the catalog, ideally we want the worker that's been responsible for that file to process that data.

390
00:37:28,000 --> 00:37:41,000
And whether or not that worker has a local cache or not is a matter, it's just, we're just saying that rather than everybody read everything, we can get more structure and say, this worker is going to read this file.

391
00:37:43,000 --> 00:37:55,000
So far we have a task assignment model, basically how to assign workers to threads or processes and so forth, and whether we're going to push versus pool from the scheduler.

392
00:37:55,000 --> 00:38:07,000
There are data plays in policy, again, for our purposes, I'm going to share a disc architecture and a modern lake house or a data lake system, it's going to be at the file level and round robbing distribution.

393
00:38:08,000 --> 00:38:14,000
Then now we're going to say, how do we take a logical query plan and convert it to something that we can then execute.

394
00:38:15,000 --> 00:38:22,000
And I've sort of said this, looting us a bit along, like, you know, we know where the pipeline breakers are, that's going to be the boundary for our task within this part.

395
00:38:23,000 --> 00:38:26,000
But then now how do we take those tasks and run them?

396
00:38:27,000 --> 00:38:32,000
So if it's an OLITN query, this is super easy to do because these queries typically only have one pipeline.

397
00:38:33,000 --> 00:38:39,000
Do an index scan, maybe a projection, and that's it, right? There's not many operators in it, and there's no dependencies between pipelines, there's only one.

398
00:38:40,000 --> 00:38:43,000
So that's easy, we just pin that out and let them run as fast as possible.

399
00:38:44,000 --> 00:38:57,000
But for OLITN query, it's more complicated because we know there's dependencies between these pipelines, so we can't, to avoid false negatives, we can't have one pipeline start running if the pipelines that it's dependent on have been completed to produce whatever the intermediate results that are needed.

400
00:38:58,000 --> 00:39:00,000
So you can't always paralyze them.

401
00:39:01,000 --> 00:39:02,000
Yes.

402
00:39:02,000 --> 00:39:06,000
Why does the 50-side slide say logical query plan is that a bit of a bit?

403
00:39:07,000 --> 00:39:09,000
How does it say it?

404
00:39:10,000 --> 00:39:15,000
Like, because the law, yeah, you can say physical yes. Yes.

405
00:39:16,000 --> 00:39:19,000
If you just get rid of logical, then it's fine. Yes, that's a title.

406
00:39:20,000 --> 00:39:32,000
Right, again, the logical query plan says, scan this, I want to read this table. It doesn't tell you how to do it, it doesn't tell you how to do a joint, it says join a and b.

407
00:39:33,000 --> 00:39:45,000
The physical query plan is the exact algorithms you want to use, so when we create a query plan, when we convert a query plan to much a task, we're going to be doing that on the physical operators, not the logical ones.

408
00:39:46,000 --> 00:39:48,000
Thank you. How will it fix that?

409
00:39:49,000 --> 00:39:52,000
So the easiest type of scheduling to do is called static scheduling.

410
00:39:52,000 --> 00:40:07,000
And this is where the optimizer figures out, or the scheduler figures out in the very beginning, I have this query plan, I have these workers, and I have this data, and it does a static assignment of tasks to those individual workers.

411
00:40:08,000 --> 00:40:16,000
And it doesn't, you know, the simplest way to think of it is I have one task per core or per worker, and they just all run at the same time.

412
00:40:17,000 --> 00:40:22,000
You still can assign the workers to, or the task to workers that based on the data is local to them.

413
00:40:23,000 --> 00:40:31,000
But again, there's no dynamicism, there's no adapting to the behavior, the performance of the workers as they actually process processes the data.

414
00:40:33,000 --> 00:40:37,000
Right, you can think of this generic postgres does this.

415
00:40:38,000 --> 00:40:47,000
So now the problem with this is that there's going to be some tasks that are going to be slower, either because the data that the processing, it just takes longer to execute whatever the operators that they have on it.

416
00:40:48,000 --> 00:40:59,000
Like you think of like, I have a complicated wear clause where there's some predicate that is that is really fast compute, and but can be very selective on some of the data.

417
00:41:00,000 --> 00:41:07,000
And then the remaining predicates in that wear clause are slow to compute. So 9 out of the 10 files, all the data gets filtered out by that fast predicate.

418
00:41:08,000 --> 00:41:19,000
So those tasks run really fast. But the one unlucky worker that has all the data that does satisfy the predicate then has to run the more expensive predicates, and then it's just going to be way slower than the other ones.

419
00:41:20,000 --> 00:41:29,000
So now all the other workers have to wait until that task actually finishes before they can move on to the next pipeline for that query plan.

420
00:41:31,000 --> 00:41:36,000
So there's no dynamicism in any of the decisions that we're making here. Everything's figured out ahead of time.

421
00:41:39,000 --> 00:41:42,000
So what more so is designed to solve is that exact problem.

422
00:41:43,000 --> 00:42:03,000
How do we figure out how do we on the fly dynamically adjust how we're executing or assigning tasks to workers so that if there's unexpected variations in the run time of tasks, we can have other workers fill in and start computing things rather than waiting for the slow straggler.

423
00:42:04,000 --> 00:42:14,000
So the morsels term comes from the hyper guys because they were just looking for another term to mean chunk of data. They didn't want to use partition, they didn't want to use shard, they couldn't use block.

424
00:42:15,000 --> 00:42:25,000
Because the morsels meant to be something bigger. But the high level it's still the same thing. You know, missing the same thing as a row group. But I think this paper came up with the row group stuff.

425
00:42:26,000 --> 00:42:33,000
So in their architecture, they're going to have one worker per core, they're going to turn up hyper threading. They're going to have an assignment of one morsel per task.

426
00:42:34,000 --> 00:42:43,000
So tasks is going to be your sponsor for processing one morsel of data. They're going to do a pool based task assignment. They're going to do this global queue that they're all going to try to pull from and figure out what to do next.

427
00:42:44,000 --> 00:42:46,000
And they're going to do really simple round ramen data placement.

428
00:42:47,000 --> 00:42:57,000
And so again, they keep track of what new morsel is going to be in. And they would annotate the task and say this task is going to act to this morsel on this morsel that's located in this new morsel.

429
00:42:58,000 --> 00:43:04,000
Then each worker, the candidate side, whether they want to run a task that's not processing data, it's not local to it.

430
00:43:05,000 --> 00:43:18,000
So they'll have all the operators, we parallel a new morsel, that we can basically ignore. But it's in thinking of having the exchange operators keep track of what inputs I'm waiting on before I can coalesce things and move on to the next pipeline.

431
00:43:20,000 --> 00:43:30,000
So this morsel paper came out in 2014. And it's fairly influential. And this is actually what DuckDB does as well. And they're very upfront about this.

432
00:43:31,000 --> 00:43:41,000
They basically took this paper and re-implement it in DuckDB. And we had Mark give a guest lecture for us last year in the spring semester last year. And they basically said they're doing morsel driven parallelism.

433
00:43:42,000 --> 00:43:53,000
So again, this is not just for hyper DuckDB is widely used in this basements as well. I meant to look at I think there's a couple other systems out there that are using a similar approach.

434
00:43:54,000 --> 00:44:04,000
So in hyper, there's not going to be a separate dispatcher thread. Every worker is going to be responsible for figuring out what's the next task I need to execute.

435
00:44:05,000 --> 00:44:21,000
So you sort of think this is a cooperative scheduling where everyone's working together for this common cause, this global, you know, trying to achieve the best performance of the system, they're working together to try to do that. But then the logic to figure out what's the next best thing for me to run is going to be distributed across the different workers.

436
00:44:23,000 --> 00:44:40,000
So in the ideal scenario, they're going to go look in the task queue and try to choose a task that again, that's going to process a morsel that's local to it. If there are no local tasks that are available for the current query, then they'll go find what's the next task.

437
00:44:41,000 --> 00:44:52,000
What's the very next task, even if that date is not local to it. Because again, that's going to be able to do to help mitigate the issue of stragglers slowing everybody, everybody behind.

438
00:44:54,000 --> 00:45:04,000
So now in the paper, they're going to ignore a very key problem, which I think I've already talked about in their approach. And that's going to be the synchronization cost of this global hash table.

439
00:45:05,000 --> 00:45:14,000
It's a bit hand-wavy saying that it's not a big deal, but when we see the umbra paper next, they basically throw it away and they switch to a more distributed scalable approach.

440
00:45:15,000 --> 00:45:25,000
And in the case of the HANA paper, which I covered in a few minutes, they closely call out the hyper approach of having this global task queue when you have a large number of cores is going to be a problem.

441
00:45:26,000 --> 00:45:29,000
What is the log number of the customer's thing?

442
00:45:29,000 --> 00:45:31,000
But they do in the paper, right?

443
00:45:31,000 --> 00:45:41,000
Yeah, but I think it's a four socket machine, right? I mean, for the HANA guys, they're talking like 128 sockets, no more larger.

444
00:45:42,000 --> 00:45:51,000
They even told me they had this like before Sigma, they would have this like the invite from David's faculty come season presentations from people working on HANA.

445
00:45:52,000 --> 00:46:04,000
And they had one of their customers come in and talk about how they were running on some beefy box where they were running out of address space on X64.

446
00:46:05,000 --> 00:46:13,000
You have 64-bit pointers, but Intel only uses 48 bits. They were running out of space. They're addressing 48 bits and it was running on.

447
00:46:13,000 --> 00:46:18,000
And that was a few years ago. I'm sure people are easily exceeding that now.

448
00:46:18,000 --> 00:46:19,000
So, okay.

449
00:46:20,000 --> 00:46:24,000
So, again, the high, the high-level idea is going to be that we have some data table here.

450
00:46:24,000 --> 00:46:31,000
And there's going to be some arbitrary slicing it up horizontally into different morsels.

451
00:46:31,000 --> 00:46:36,000
And then each of these morsels will be assigned to one socket, one numerator region.

452
00:46:36,000 --> 00:46:40,000
So, what does that look like? What we already talked about with Pax.

453
00:46:40,000 --> 00:46:43,000
Rogue Groups. Basically the same thing, just a different name.

454
00:46:44,000 --> 00:46:57,000
So, in there, this paper, they claim 100,000 tuples per morsel was the right size because that gave them the right amount of parallelism across all the cores.

455
00:46:57,000 --> 00:47:01,000
If you set it too small, then you're always going to the task you and that becomes the bottleneck.

456
00:47:01,000 --> 00:47:10,000
If you set it too big, then you have the problem of, again, the straggler, it's the only way to process some giant morsel and everyone gets stalled for that.

457
00:47:11,000 --> 00:47:18,000
When we were building our system peloton here, we did 1,000 tuples per morsel.

458
00:47:18,000 --> 00:47:29,000
And then I think in the follow-up system, with noise page, we were doing 10 megabyte morsels because you could play some trick with InstaPelSaus to do 20-bit pointers, 20-bit offsets.

459
00:47:29,000 --> 00:47:31,000
But we can ignore that.

460
00:47:32,000 --> 00:47:49,000
All right, so now we have a query plan, we convert it into a bunch of tasks, we have our task queue, and sort of thinking in the task queue, again, it's the, what the computation of the operators want to do within the pipeline, and then it's tagged with what morsels they want to operate on.

461
00:47:49,000 --> 00:47:58,000
So, on each core now, that each going to have a memory region that corresponds to the morsels, again, this is just the table space for the tables.

462
00:47:58,000 --> 00:48:05,000
Then there's some local buffer they're going to use to write out intermediate results. Again, this is an in-memory database, so everything's all in memory here.

463
00:48:05,000 --> 00:48:11,000
And then you have whatever your local, it's all in your local memory, then you have your single core.

464
00:48:11,000 --> 00:48:19,000
So, to get started, each of these guys are going to go into the queue and pull out things that are, that are going to process the data as local to it.

465
00:48:19,000 --> 00:48:29,000
And then when now it runs, again, it's just computing or crunching on the data that's local to it, so it doesn't have to go to the interconnect on the CPU, everything can run really fast.

466
00:48:29,000 --> 00:48:40,000
And then they're always going to produce the output back into their local buffer, again, because they want to avoid the traffic over the interconnect, having to write to some, to some remote memory.

467
00:48:40,000 --> 00:48:59,000
So now, say this on CPU3 for whatever reason, it's just running slower. In this case here, because there's no tasks that are available for this query, to execute, because the next stage we have to wait for the output of the first stage, the first pipeline, so these guys essentially have to stall.

468
00:48:59,000 --> 00:49:13,000
Now, if there was another query in our queue, you could start processing that, but then you get in this contention of like, okay, well, I only have so much space for my buffers, do I go into the start processing another query that I can then interfere with the data I want to store in my buffers?

469
00:49:13,000 --> 00:49:15,000
Because then I have to start swapping things in and out.

470
00:49:15,000 --> 00:49:21,000
These are CPUs, or in individual cores?

471
00:49:21,000 --> 00:49:23,000
Individual cores.

472
00:49:23,000 --> 00:49:27,000
Like, does it all in one CPU? They have their own memory?

473
00:49:27,000 --> 00:49:39,000
It's a real quick. One core, they have L1, L2, and then on the same socket, all the cores share L3, and then they have local memory.

474
00:49:39,000 --> 00:49:48,000
So I'm drawing the CPU symbol. I could put red, whatever. But they have one hardware core.

475
00:49:48,000 --> 00:49:57,000
So when this guy then finishes, this then frees up all the other guys, then go back to the queue, and pull out more tasks.

476
00:49:57,000 --> 00:50:08,000
And again, because the last task they executed for this query wrote data to their local buffer, we want to then have the affinity of making sure that the next task is going to process that data that we just did.

477
00:50:08,000 --> 00:50:13,000
And the task that's that data that we just generated in the previous pipeline is going to run on the same core.

478
00:50:13,000 --> 00:50:15,000
Again, avoiding that interconnect traffic.

479
00:50:15,000 --> 00:50:22,000
So now in this case here, say this one finishes up first, so we do have actually a task we could execute.

480
00:50:22,000 --> 00:50:37,000
And so, so hyper says that in this case here, when you do work, work stealing, it's okay for you to go across the new Maria region to go get the data you need, because it's better, it's better to do that than having idle resources.

481
00:50:37,000 --> 00:50:53,000
Is there like a heuristic cost? Obviously costs and you don't, but you can't ever predict when that task on like, see for a core three is going to finish.

482
00:50:53,000 --> 00:51:01,000
So what happens if our core three finishes, the core is like stopped, stopped, we're going to operate on that further.

483
00:51:01,000 --> 00:51:09,000
So his statement is, the question is, like, is there a heuristic to figure out when is it actually okay to steal?

484
00:51:09,000 --> 00:51:18,000
Because it may be the case that right before I steal, or right immediately after I steal, this thing finishes, then it could have processed it.

485
00:51:18,000 --> 00:51:23,000
And then I could have processed the data locally, and that would have embedded in this guy stealing.

486
00:51:23,000 --> 00:51:31,000
Again, when it's on a single node and you're measuring things like, the more cells are like 100,000 tuples, you're getting down to like milliseconds here.

487
00:51:31,000 --> 00:51:37,000
And the additional bookkeeping you have to do to figure that out, you pay a high penalty for that.

488
00:51:37,000 --> 00:51:39,000
A lot of overhead maintain that.

489
00:51:39,000 --> 00:51:41,000
Is this better to block so you get this?

490
00:51:41,000 --> 00:51:44,000
Yeah, and they claim it's always better to steal.

491
00:51:44,000 --> 00:51:51,000
In the case of HANA, they're going to be doing even more bookkeeping, and they say don't do any of that.

492
00:51:51,000 --> 00:51:57,000
And it's better to just, don't do any stealing because the call system is too high.

493
00:51:57,000 --> 00:52:02,000
Then what I guess about how stealing is partial work?

494
00:52:02,000 --> 00:52:08,000
This question is, how can you handle partial work and work stealing?

495
00:52:08,000 --> 00:52:17,000
Because presumably, the work that is taking is like stopping the machine from like the more cells.

496
00:52:17,000 --> 00:52:20,000
So every task is one morsel.

497
00:52:20,000 --> 00:52:29,000
So this guy is processing whatever, this one here, no one can take the same task, because it's no longer in the queue.

498
00:52:29,000 --> 00:52:37,000
So when this guy, when one steals the next task, it's not processing on the same data as this guy, it's completely disjoint and separate.

499
00:52:37,000 --> 00:52:42,000
So there's no concern of synchronizing about partial results.

500
00:52:42,000 --> 00:52:44,000
Oh, okay.

501
00:52:44,000 --> 00:52:47,000
Yeah, the morsels are disjoint.

502
00:52:47,000 --> 00:52:48,000
Yes.

503
00:52:48,000 --> 00:52:52,000
So in the type where these, these type where they're compiled, right?

504
00:52:52,000 --> 00:52:55,000
Which ductubes do you do, like, they can pile up by one?

505
00:52:55,000 --> 00:52:57,000
This question is, in hyper, these are compiled pipelines.

506
00:52:57,000 --> 00:52:59,000
And ductubes do they have compiled pipelines? No.

507
00:52:59,000 --> 00:53:03,000
So they just do it normally, how to chain up up the data?

508
00:53:03,000 --> 00:53:06,000
What's normal?

509
00:53:06,000 --> 00:53:14,000
Like, it's a push-based model, but they're doing the vectorized approach of pre-compiled primitives.

510
00:53:14,000 --> 00:53:18,000
Again, this is completely independent of the query processing model here.

511
00:53:18,000 --> 00:53:22,000
Does it matter whether it's compiled or vectorized?

512
00:53:22,000 --> 00:53:26,000
Back, yes.

513
00:53:26,000 --> 00:53:29,000
This question is, do you rebalance the enemy results?

514
00:53:29,000 --> 00:53:32,000
Meaning, like, oh, yeah.

515
00:53:32,000 --> 00:53:36,000
So if this guy steals a bunch of stuff and he keeps writing to the buffer,

516
00:53:36,000 --> 00:53:39,000
it's a local buffer, and then is it going to run out of space?

517
00:53:39,000 --> 00:53:41,000
I don't know what they do.

518
00:53:41,000 --> 00:53:44,000
At some point, I suspect he would, yes.

519
00:53:49,000 --> 00:53:56,000
Yeah, I don't know how to handle, but you can imagine identifying that, oh, I can't...

520
00:53:57,000 --> 00:54:02,000
I'm running out of space. I can't process anything else, so either you don't process anything else until the query finishes.

521
00:54:02,000 --> 00:54:09,000
Or you can introduce an internal task that then moves things around,

522
00:54:09,000 --> 00:54:13,000
but then booking for that would be expensive.

523
00:54:17,000 --> 00:54:21,000
Yeah, I mean, that's one of the challenges in MMB databases is that you can run out of memory.

524
00:54:21,000 --> 00:54:24,000
I think they just assume that you don't. Yes.

525
00:54:24,000 --> 00:54:29,000
So at some point, the enemy results have to be...

526
00:54:29,000 --> 00:54:33,000
The same question is, at some point you have to aggregate the enemy results? Yes.

527
00:54:33,000 --> 00:54:36,000
But that's the exchange operator we saw before.

528
00:54:36,000 --> 00:54:41,000
And then in that case, that you can't really paralyze, because this is one thread that has to be pulled in the data

529
00:54:41,000 --> 00:54:47,000
from all the children below the exchange operator, and then co-lesting that to produce the final output.

530
00:54:48,000 --> 00:55:02,000
Okay. So, one of the key problems with Umbra, or sorry, with Hyper, is that because one worker is assigned...

531
00:55:02,000 --> 00:55:12,000
There's only one worker per core and one morsel per task, they had to do work stealing because it's almost like this...

532
00:55:13,000 --> 00:55:19,000
It's not exactly static scheduling because they are allowing things to pull data as they go along,

533
00:55:19,000 --> 00:55:24,000
but they can't rebalance the amount of work that each task is doing.

534
00:55:24,000 --> 00:55:29,000
So in the cases where you're blocked on waiting this last task, you need for this pipeline,

535
00:55:29,000 --> 00:55:33,000
everyone has to stall until that thing finishes.

536
00:55:35,000 --> 00:55:40,000
The other challenge, as I already said, is they don't really talk about how they built their lock free hash table.

537
00:55:40,000 --> 00:55:46,000
That part's a bit hand-waving in the paper, but again, as we know, that's going to be...

538
00:55:46,000 --> 00:55:50,000
Always going to be content-apport. Lock free, it doesn't mean it's magically scalable.

539
00:55:50,000 --> 00:55:54,000
It just means that you're never going to stall waiting for...

540
00:55:54,000 --> 00:55:57,000
Or waiting to acquire something in the lock.

541
00:55:57,000 --> 00:56:00,000
You have to spin until you can acquire something though.

542
00:56:00,000 --> 00:56:03,000
Right, and now you're burning cycles.

543
00:56:04,000 --> 00:56:14,000
The other two problems are going to have in hypers that they're going to treat the execution cost of every tuple in a morsel to be the same.

544
00:56:14,000 --> 00:56:22,000
And as I said before, you can easily come up with examples where that may not be the case based on what the query is or what the predicates are.

545
00:56:23,000 --> 00:56:27,000
The other issue is going to be...

546
00:56:27,000 --> 00:56:35,000
He's mentioned in the conclusion, say, what would be nice to have quality of service or priorities to keep track of these things, but they simply can't do that.

547
00:56:35,000 --> 00:56:39,000
It's almost a free-fraud. Here's whatever's in the...

548
00:56:39,000 --> 00:56:45,000
My task cue, and then the workers are trying to pull things as fast as possible and just running it.

549
00:56:46,000 --> 00:57:02,000
But that means I could have a long running query take up all the resources, all the workers, while it's processing, and then how much of these short queries showing up, and I have no way to easily interleave them and make sure the short queries get processed.

550
00:57:02,000 --> 00:57:09,000
And as we said, that's bad because people are going to notice when the short queries run slow.

551
00:57:09,000 --> 00:57:21,000
So the follow-up work to the hyperpaper you guys read or extension to morsels is this paper from 2021 on the new system that came after hyper, called Umbra.

552
00:57:21,000 --> 00:57:27,000
The background is that hyper was built by Thomas and his team at TU Minic.

553
00:57:27,000 --> 00:57:38,000
They formed a little mini startup based on it, then they got acquired by Tableau, and it was being used as the internal memory query cache for Tableau.

554
00:57:38,000 --> 00:57:44,000
The app, and in time you used it. And then Tableau got bought by Salesforce and so forth.

555
00:57:44,000 --> 00:57:49,000
Thomas then lost control of hyper because Tableau now owned it.

556
00:57:49,000 --> 00:57:53,000
So we started building a new system called Umbra.

557
00:57:53,000 --> 00:57:59,000
And you couldn't use any of the source code we had from hyper. Everything's written from scratch because it's a free-fraud.

558
00:57:59,000 --> 00:58:10,000
So this is the new scheduler that they built in Umbra that is meant to overcome the deficiencies that they had in the hyper morsel scheduler.

559
00:58:10,000 --> 00:58:20,000
So the key things are that the tasks are not going to be created statically at runtime, and they're not going to have a one-to-one relation between a task and a morsel.

560
00:58:20,000 --> 00:58:29,000
One task can process potentially multiple morsels if it still has time available to compute things.

561
00:58:29,000 --> 00:58:38,000
So another way to think about this is that they're basically going to be slicing up the computational resource based on time.

562
00:58:38,000 --> 00:58:47,000
So within your quantum, you can keep processing of many tuples as you can. And then when you run out of time, then you have to give the CPU back.

563
00:58:47,000 --> 00:58:53,000
But I still think even though you give it back, you're still tied to the morsel of your processing, so nobody else can take it.

564
00:58:53,000 --> 00:59:06,000
The other thing we're going to be able to do to handle make sure that short queries aren't blocked by the longer run queries, they're going to do automatic exponential priority decay for queries.

565
00:59:06,000 --> 00:59:11,000
So that the longer a query is running in the system, the lower priority gets over time.

566
00:59:11,000 --> 00:59:24,000
And so again, it'll still be scheduled eventually, but it's not going to get, you know, it's not going to be able to execute as many resources and to give them time slice as a short run query, who just arrived in the system.

567
00:59:24,000 --> 00:59:30,000
So at a high level, this is a variation of striped scheduling, which I think came out of the 80s or 90s.

568
00:59:30,000 --> 00:59:36,000
Do they teach that here or no? I don't think so. Did you get an OS? No.

569
00:59:36,000 --> 00:59:51,000
Okay. Think of it's a primitive way to do scheduling in an operating system for tasks and processes where you keep track of how long things have been running and how much work they're going to do every time they run.

570
00:59:51,000 --> 01:00:02,000
But in the original implementation, like there's a global, there's a global, you know, global priority list, there's global information that you have to maintain, and you assume that the workload is fixed.

571
01:00:02,000 --> 01:00:10,000
But obviously in a database system query that coming and going all the time, and so we can't make that assumption. So they have ways to fix that.

572
01:00:10,000 --> 01:00:11,000
Yes.

573
01:00:11,000 --> 01:00:27,000
So, for sure, the second fourth point, the exponentially growing the more precisely to get a lower value of how long it takes to execute the query for the XQP of the task, how do you know how long it has to execute the way executed?

574
01:00:27,000 --> 01:00:37,000
You don't. So the question is, how do you know how long the task is going to take to execute it? You don't. They just turn on monitoring on it and keep track of it over time.

575
01:00:37,000 --> 01:00:43,000
So when they say XQP is going to be growing the more useful sizes, is it like there's adding more data to the more so? Yes.

576
01:00:43,000 --> 01:00:48,000
They have a query? Or is it just giving them more more resources to stack?

577
01:00:48,000 --> 01:00:54,000
So the thing of the more so concept, it's just a logical concept of like here's the divider line of like for one more so ends and stops.

578
01:00:54,000 --> 01:01:04,000
So like if you recognize that each task is computing each more so really, really fast, then you, and then there's more bookkeeping you have to go back and get more, you know, give me the next task.

579
01:01:04,000 --> 01:01:14,000
You sort of increase what the boundary is for the morsels so that eventually you, the amount of work you do, the amount of time it takes to process that morsel is one level second.

580
01:01:14,000 --> 01:01:22,000
Okay, so you're not changing like a given morsel efforts created? It's like for future morsels you're going to make them bigger to better take a bit.

581
01:01:22,000 --> 01:01:31,000
It's the same as you're not changing morsels after trade and you're just making future morsels bigger. Yes, but again, make sure we clear what we say creation.

582
01:01:31,000 --> 01:01:39,000
It's just a logical boundary. It's not like I'm copying data and making it bigger. I'm just saying like, you know, like here's how to cut things off.

583
01:01:39,000 --> 01:01:43,000
Okay, I'm just saying like you don't go to, you don't go back to something's already running. Hey, here's 10 more tuples you didn't have before.

584
01:01:43,000 --> 01:01:51,000
I actually changed this value because I was asking, we're never changing the boundary for it, because it's already running. It's like we changed the boundary for other things that haven't been processed.

585
01:01:51,000 --> 01:01:54,000
For the remaining parts of the data table. Yes.

586
01:01:54,000 --> 01:02:02,000
So there's some sort of small size that I start talking about and then it just keeps rolling until one of them takes longer than one of those.

587
01:02:02,000 --> 01:02:09,000
Yes, saving is correct. Is it just that you start with a small size and say, okay, here's the amount of work you're going to do in a task.

588
01:02:09,000 --> 01:02:18,000
It's going to be the morsel is to be 100,000 tuples. But then if you complete that in less than one millisecond, then the morsel size for the next thing you're going to process will be a little bit bigger.

589
01:02:18,000 --> 01:02:24,000
You keep making it a little bit bigger until you, well, exponentially bigger until you, your task takes one and one millisecond.

590
01:02:24,000 --> 01:02:25,000
Yes.

591
01:02:25,000 --> 01:02:32,000
What happens if like your splitting amount takes like, for example, like five milliseconds.

592
01:02:32,000 --> 01:02:34,000
There's never going to grow anymore. The total is not tricky.

593
01:02:34,000 --> 01:02:39,000
For example, it takes like a lot of time. There's some reason it's going to start with really big morsel size.

594
01:02:39,000 --> 01:02:45,000
Its question is, what if the, what do you start with, you know, 1 billion tuples per morsel and you're really big, could you shrink it?

595
01:02:45,000 --> 01:02:47,000
Yes. Why not?

596
01:02:47,000 --> 01:02:52,000
I just like, I didn't know that it was a part of the system design. Because it seemed like it was only growing.

597
01:02:52,000 --> 01:02:54,000
Yeah, but that's, that's true.

598
01:02:54,000 --> 01:02:58,000
Why do they want to use these?

599
01:02:58,000 --> 01:03:02,000
Why do they want to do, why do they want to do one millisecond run?

600
01:03:02,000 --> 01:03:12,000
Because it allows you to be more dynamic and not have a worker just avoid the straggler problem.

601
01:03:12,000 --> 01:03:26,000
I think they, it's, it is doing work ceiling, but not in the, how does it, it is doing work ceiling.

602
01:03:26,000 --> 01:03:41,000
So it's not, it's work ceiling in that, there still would be a global cube, but there would be clever how they maintain it.

603
01:03:41,000 --> 01:03:51,000
So when I got, when I got to say, what's the next thing I want I need to go do, I got to go consider the location, the data, plus a priority of what the next thing I need to run.

604
01:03:51,000 --> 01:04:01,000
Right? So like in, in the morsel's approach, it was, this morsel has to be processed by this core because that it's been assigned to that.

605
01:04:01,000 --> 01:04:07,000
And the work ceiling part is, I'm allowed to run tasks that are for data that, that are not local to me.

606
01:04:07,000 --> 01:04:14,000
So in this one, they're doing the same thing, but they're also not including the priority information about the, you know, about the query itself.

607
01:04:14,000 --> 01:04:22,000
So it is, it is doing work ceiling, but it's, it's, it's sort of a natural, natural is not the right word either.

608
01:04:22,000 --> 01:04:26,000
It just, it just happens because the way they're maintaining the cube.

609
01:04:26,000 --> 01:04:32,000
So, why is the goal to make it one second, one second, like, different ones, is it like, two thousand, or so?

610
01:04:32,000 --> 01:04:37,000
Yeah, it says, it says, why is it the goal to make it one millisecond per task? It is to balance it, absolutely, yes.

611
01:04:39,000 --> 01:04:44,000
You still probably like to sign before the query's actually a horizontal plane?

612
01:04:44,000 --> 01:04:51,000
It's, I mean, what we'll see prior to the second question is, is the priority assigned when the query, when the query starts? Yes.

613
01:04:51,000 --> 01:04:57,000
Like, everyone starts with like one, and the long you run, then that decays.

614
01:04:57,000 --> 01:05:02,000
How do you, how do you, you try to, the short run, like, switch 12 and 11, like, switch 12 and 11, like, switch 12?

615
01:05:02,000 --> 01:05:08,000
In question, how do you make sure that the short running query is finished more quickly, and the long running query is keep running?

616
01:05:08,000 --> 01:05:14,000
No, like, it seems like, the short running, like, you, you guarantee the short running, like, switch 15. Yes?

617
01:05:14,000 --> 01:05:17,000
How do you guarantee that the long run doesn't get starved?

618
01:05:17,000 --> 01:05:24,000
How do you guarantee that the long run doesn't get starved? Because the striped scheduling will handle that. There's this notion of a pass.

619
01:05:24,000 --> 01:05:36,000
If I haven't, if the, this sort of global counter, this watermark keeps ticking forward, and if my query's below that, then I get an omelet, loud run again.

620
01:05:36,000 --> 01:05:45,000
And any new query that shows up, the shorter running queries that show up, they're going to be assigned a watermark that's above that global one, so that they'll, they'll be starved out.

621
01:05:45,000 --> 01:05:46,000
Yes?

622
01:05:46,000 --> 01:06:00,000
So, in the most of these, the most of the, the most of the, and buffers, the prioritized, like, if there was, they would actually be brought to with water in the buffer, like, that cost the prioritized for that given input.

623
01:06:00,000 --> 01:06:01,000
Yes.

624
01:06:01,000 --> 01:06:11,000
So, if the priority is, you know, really for these workers, the low-category of data in the most of the, about this form, or they're interested.

625
01:06:11,000 --> 01:06:21,000
So, the question is, in the morsels case, the priority was, was based on what data, you know, what data I need access in the morsels, and where am I going to write it to?

626
01:06:21,000 --> 01:06:34,000
But in, in this case, am I not having the notion of locality? You do. And that, that would be, you would have a local priority. We'll, we'll cover that in a second.

627
01:06:34,000 --> 01:06:56,000
So, let's first describe how they're going to avoid the global, the global task cube. And so, I mean, it still is a global task cube, but the, the state about whether or not I need to refer to it to figure out what, what actually changed is we maintained in, in thread local storage at every worker.

628
01:06:56,000 --> 01:07:08,000
Again, assuming we're running on a single node. So, there'll be a global task set, but all this is just an array of pointers that tell you to go where to go find the information about the tasks that you have for a given query.

629
01:07:08,000 --> 01:07:23,000
And then, with any worker, there's going to be these masks that keep track of which, which slots in my, my slot array of above are active, whether, and then change mask, return mask, tell me whether something has changed above, and whether I should go confer it.

630
01:07:23,000 --> 01:07:52,000
And so, what they're going to do is they're going to have their different workers across different threads are allowed to go right into the memory of these, this information for the other workers as well, but they're going to be a, to a time of comparing swap operations, just to flip bits, or basically, XORs and in the single instruction, and that, you know, yes, there's cash line and validation across interconnects, but that's not, it's not like you're copying a bunch of data, you're just doing one, you know, one comparing swap over the network.

631
01:07:52,000 --> 01:08:06,000
So, in my example, here, I'm going to show that we have four slots in our, there could be active any time, I think in the paper they talk about, have 128 slots, and that's just to bound how much work can be run actually running at a given time.

632
01:08:06,000 --> 01:08:13,000
And again, the classical stride scheduling is you allow, the number of slots is unbounded.

633
01:08:13,000 --> 01:08:26,000
Right, so again, the global task slot, that's, task that slots, these are just pointers to where to go find the metadata in memory about what these queries are actually running.

634
01:08:26,000 --> 01:08:35,000
So, let's look at an example of when a query finishes and when a new query arrives, or when it's, sorry, when a task set finishes.

635
01:08:35,000 --> 01:08:43,000
So, let's say that worker one here, he's running Q1, task set one, worker two is running Q2, task set one.

636
01:08:43,000 --> 01:08:55,000
So, when this thing finishes, we then need to go back up to this task set slot array, follow the pointer to go look and say, okay, is there something else I should be doing for this, this task set for the query.

637
01:08:55,000 --> 01:09:03,000
And let's say in this case here, we've completed all, we've processed all the morsels, so we know that this thing is done.

638
01:09:03,000 --> 01:09:10,000
So, then now the worker thread is then responsible for them taking the next task set and we're putting that back in the queue.

639
01:09:10,000 --> 01:09:22,000
Right, but now we need, we want to notify all the workers that hey, something has changed in this task set queue up here, so let's go find out what it is, because we want them to pull it and not have to push it.

640
01:09:23,000 --> 01:09:30,000
Right, because you have to, you're not pushing things, you have to maintain latches to make sure that you're not overwriting information inappropriately.

641
01:09:30,000 --> 01:09:39,000
So, all we need to do now is just update this return mask, we just do a compare and swap at each thread to now say set a one to this slot.

642
01:09:40,000 --> 01:09:53,000
And then next time the worker comes back around says, okay, I need to go, I need to do something, I need another task to compute on, it knows that he's going to check the task queue to find out new information that somebody posted about it.

643
01:09:53,000 --> 01:10:03,000
It's like a message board saying, hey, by the way, here's a change, I'm not telling you what it is, it's like a new email notification, I'm not telling you what it is, but you know where to go look for that information.

644
01:10:04,000 --> 01:10:25,000
Alright, so now let's say queue three shows up query three, so it ends up getting put into the global task slot in this position here, and again some other thread, like a scheduled thread or a coordinated thread, is responsible for then flipping a bit in the change mask for all these threads, say hey, by the way, there's a new query to show up in this slot.

645
01:10:25,000 --> 01:10:31,000
And the return mask and the change mask, because there's some bookkeeping reason you have to do this, yes.

646
01:10:34,000 --> 01:10:45,000
It's not a special thread like, hey, here's this task, there's something about the query that shows up, and somebody's got to then put that in the queue.

647
01:10:45,000 --> 01:11:06,000
So whatever that is, you could call that a coordinator or a scheduler thread, but whatever that thread is not responsible for saying you're going to do this, you're going to do that, they're all pooling with themselves, but you just need something to flip the bit and say, by the way, we added something new, make sure you go check it out.

648
01:11:06,000 --> 01:11:08,000
Back, yes.

649
01:11:10,000 --> 01:11:22,000
The question is, with the dispatcher, will you be responsible flipping the bits in the return mask? No, as far as I know, the thread that was responsible for putting the data, that computer was all, is responsible flipping the bits in everyone.

650
01:11:25,000 --> 01:11:31,000
The question is, why not let the dispatcher handle that, because now you have to go tell the dispatcher to go do it. It's just cheaper to go do it yourself.

651
01:11:32,000 --> 01:11:35,000
I assume somewhere we're not going to answer that.

652
01:11:36,000 --> 01:11:38,000
The question is, why aren't we doing push versus pull?

653
01:11:39,000 --> 01:11:54,000
Because when the worker is trying to come from the global task set starts, there is locking, yes, we can't get it that, but it's basically cycle to go and ask and look into the global task set, hey, what do I need to do?

654
01:11:54,000 --> 01:12:03,000
And if there is already a thread that's running and changing the block, it's a bit, it might work you track of what you work and do, and then tell it to do something.

655
01:12:04,000 --> 01:12:13,000
So what's David is, if something's already responsible for putting things in the global task queue, why not just have that thing responsible for telling people what to do?

656
01:12:13,000 --> 01:12:41,000
But again, you've got to maintain that, you have to maintain the state somewhere, and they're arguing that it's better to distribute it across the different workers in TLS, and have that be, and then to do simple repair and swaps to maintain, to notify them the changes that are occurring, rather than having a more heavy-weight approach of farming out complex messages that they need to process themselves.

657
01:12:43,000 --> 01:12:57,000
It's a cooperative scheduling, so rather than having one thread be responsible for everything, and potentially that could be more efficient to do with a swan number of cores, but this approach is definitely more scalable, or a larger number of cores.

658
01:12:57,000 --> 01:13:26,000
Okay. Right, so then this thing knows that when this finishes the task that was running, goes back up, looks in the queue, decides that, you know, for whatever reason, that, you know, we'll get the information looking at the change master and return master, what needs update, it updates its active slot now to say, hey, there's something in one I could go take, and then it decides to run Q3, test at one.

659
01:13:27,000 --> 01:13:41,000
And notice here now on Worker 2, it doesn't know about the Q3 yet, it just knows that a bit got flipped in the first slot, and eventually I'm going to go back and look at the test set, a queue, I'll go learn what that is.

660
01:13:41,000 --> 01:13:45,000
So these things can run independently of each other, and not have to coordinate across all of them.

661
01:13:45,000 --> 01:13:48,000
Which arguably always going to be better.

662
01:13:49,000 --> 01:13:54,000
Right, so we're not going to be a few minutes.

663
01:13:54,000 --> 01:14:17,000
I'll skip the priority to like, but basically think about as like, there's this notion of the global pass, just thinking that the number of times I've passed through are at executed things, and then I have priorities about individual queries, I have local priorities based on how much work I've done for this query, and the combination of these things then determines.

664
01:14:18,000 --> 01:14:27,000
What you want to run, but idea again, the highlight is that as a query runs longer, this priority decays and goes down.

665
01:14:27,000 --> 01:14:40,000
So I'm quickly zoomed through HANA, again this is just a, this is the other end of the complexity, so I think like Postgres is the easiest one, you just say, let the OS do it.

666
01:14:40,000 --> 01:14:55,000
The HANA approach here, which again, I think it was a PG dissertation as somebody that worked at SAP, so I don't think this ever actually made it in the real HANA system, especially at the rewrote it in the late 2010s.

667
01:14:55,000 --> 01:15:08,000
But just the idea is that like again, I've had it just happen to do even more scousing on its own for initial threads and not let the OS do any of that.

668
01:15:08,000 --> 01:15:25,000
So this is going to support both workload stealing and poor scaling, meaning within a single socket, a single Numer region, I can add more threads dynamically and not have the limitation of having one thread per CPU core.

669
01:15:25,000 --> 01:15:32,000
I can start adding more and more cores if I think things are going to get stalled on doing, you know, for a variety of reasons.

670
01:15:33,000 --> 01:15:48,000
And then I'm going to have this notion of a two different kind of cues of work, I'm going to have a soft cue and a hard cue, a hard cue is going to be tasks that you don't anybody to steal that has to run in that socket or that Numer region.

671
01:15:49,000 --> 01:15:59,000
So I think of something like garbage collection for data that's in that Numer region, you don't want to have that go in or connect or like a networking task that has to run on a given socket.

672
01:15:59,000 --> 01:16:07,000
But the soft cue will be things that workers are allowed to steal, similar to the hybrid approach when you're doing scans.

673
01:16:07,000 --> 01:16:15,000
So everybody said this, we're going to have the soft and hard priority cues, but then they're going to have different four different worker poles of threads.

674
01:16:15,000 --> 01:16:24,000
So you have worker threads that are actively running something in active ones that are blocked in the kernel waiting for some kind of conditional, conditional lock or conditional variable latch.

675
01:16:24,000 --> 01:16:27,000
Then you have ones that are free that I wake up a little bit, check to see what they're going to do.

676
01:16:27,000 --> 01:16:37,000
And then you have a parked threads where you've actually disccedured them and you hand them back to the OS kernel like a sleeper yield.

677
01:16:37,000 --> 01:16:40,000
And they are sitting down there and then if you need them, you can spend them up.

678
01:16:40,000 --> 01:16:48,000
And the argument here is that it's cheaper to go put some threads down in the scheduler in the OS and let them to sleep down there.

679
01:16:48,000 --> 01:16:56,000
So that when I need them, I can pick them up and start running with them compared to having to spin up a whole process of spinning a whole thread if I all said I need more of that.

680
01:16:57,000 --> 01:17:01,000
So let me skip this real quick.

681
01:17:01,000 --> 01:17:06,000
Basic idea works the same thing as before that we have a bunch of stuff we want to want to execute for a query.

682
01:17:06,000 --> 01:17:12,000
But now I'm including some maintenance tasks like garbage collection for multi-version concurrent control because HANA was an MPCC system.

683
01:17:12,000 --> 01:17:24,000
So these queries here, they have to run, you know, you need to run them right now, but they can go into the soft cue because, again, technically any new Osaka, any region can run them.

684
01:17:25,000 --> 01:17:28,000
But then the GCC stuff, say we'll put that in the hard cue.

685
01:17:28,000 --> 01:17:32,000
And then the working threads are responsible for executing these acts of tasks.

686
01:17:32,000 --> 01:17:44,000
And then the inactive ones, again, these are things that haven't, that are, that are, and active is blocked on something that, like in the kernels that we can't actually start executing them, but we expect them to wake up fairly soon.

687
01:17:44,000 --> 01:17:51,000
Free is going to be one that is just spinning all the time looking for work to do and the part of the ones that are heavyweight paused down the kernel.

688
01:17:52,000 --> 01:17:58,000
So again, the free ones are allowed to pull this all the time and they find something that is allowed to execute it.

689
01:17:58,000 --> 01:18:12,000
So the HANA guys are going to claim that in their experimentation with this approach that they, it was better for the large, large socket machines to turn off all the work stealing.

690
01:18:12,000 --> 01:18:22,000
So you basically don't put everything always in the hard cue and that was always better than moving things across different, different, different newer regions.

691
01:18:22,000 --> 01:18:30,000
I would argue that I think the, I like this. I like having all the stuff manage yourself instead of OS doing it.

692
01:18:31,000 --> 01:18:40,000
And so for the inactive ones, again, for, for, for, oh, that this maybe this is less of an issue, but for an O2B system this, this makes sense.

693
01:18:40,000 --> 01:18:47,000
And HANA was trying to support with O lab N O O T B. So it made sense to have the sort of different variations of threading.

694
01:18:47,000 --> 01:18:56,000
All right, I'm going to run through this really fast. I want to show you one last thing about in SQL Server, because to me this is, this is relevant for high design systems.

695
01:18:56,000 --> 01:19:01,000
What? Is it OS like these designed for the 90s?

696
01:19:01,000 --> 01:19:08,000
SQL OS? Yeah. SQL, it's not a full operating system. Right?

697
01:19:08,000 --> 01:19:22,000
So SQL OS is an abstraction layer in SQL Server that they built in 2006 that hides the load level details of hardware and the operating system from the upper parts of the database system.

698
01:19:22,000 --> 01:19:31,000
And the reason why they built this is that Microsoft observed that every time new hardware was coming out, they had to rewrite all their operations to account for whatever the hardware was.

699
01:19:31,000 --> 01:19:35,000
Like, you have a bunch more cores, you have to rewrite a bunch of stuff, they had a newer regions that rewrite a bunch of stuff.

700
01:19:35,000 --> 01:19:45,000
And so this abstraction layer allows them to hide those load level details and the scheduling and the, and the, and the movement of, of data can all be managed by this SQL OS thing.

701
01:19:45,000 --> 01:19:53,000
So it's not a full operating system like the Linux kernel or Windows or HBox, whatever. Right? It's just sort of an abstraction layer.

702
01:19:53,000 --> 01:19:59,000
But the cool thing that they're going to do is going to do non-parental thread scheduling inside the database system.

703
01:19:59,000 --> 01:20:02,000
What's another word for non-parental thread schedule?

704
01:20:04,000 --> 01:20:08,000
Covertines. Same idea. Right?

705
01:20:08,000 --> 01:20:16,000
Where you have the, you have a thread that you're managing threading multi-threading within within the database system itself.

706
01:20:16,000 --> 01:20:24,000
But since, since it's not preemptive, like preemptive means the OS can go to steal you take, you know, take your hardware thread and give it to somebody else.

707
01:20:24,000 --> 01:20:29,000
It's, we're all running, all these threads are running within the database themselves, so we can't do that. We can't send it interrupt to ourselves.

708
01:20:29,000 --> 01:20:37,000
Like that, right? So that means that in our code itself, we're going to have to go put explicit instructions to yield back to the scheduler to say,

709
01:20:37,000 --> 01:20:42,000
hey, by the way, go check to see whether something else could be running instead of me.

710
01:20:42,000 --> 01:20:49,000
And they did this on two back in 2006 before seamless loss and go and other programming languages now have, you know, built in support for covertines.

711
01:20:49,000 --> 01:21:00,000
So there's a great article here at how they built it. I used to say that SQLS allowed Microsoft to make it to get SQL server to run on Linux.

712
01:21:00,000 --> 01:21:09,000
And I, because again, abstracted the, abstracted the, the OS layer, the guy that built SQLS then called me and said, that's not true.

713
01:21:09,000 --> 01:21:14,000
Actually, their attempt to kind of get SQL server running in Docker turned out to be what got them to be able to support it.

714
01:21:14,000 --> 01:21:18,000
But there's a good article that talks about it. Again, real quickly, let me just show you what it looks like.

715
01:21:18,000 --> 01:21:21,000
So you have some SQL query like this. They can set their quantum to four milliseconds.

716
01:21:21,000 --> 01:21:25,000
So, so say you want to do a sequential scan of this data.

717
01:21:25,000 --> 01:21:28,000
Again, approximate query plan would look like this. Evalopratic it, admit it.

718
01:21:28,000 --> 01:21:34,000
What they're letting you do is keep track of the time a different parts of the operator while they run.

719
01:21:34,000 --> 01:21:40,000
And they check to see whether the, the elapsed time since they started running is greater than the quantum for milliseconds.

720
01:21:40,000 --> 01:21:42,000
If yes, they yield back.

721
01:21:42,000 --> 01:21:48,000
Now, this is pseudo code. You would not want to do this. It's like, you know, going check in the system clock is expensive. Don't do that.

722
01:21:48,000 --> 01:21:51,000
Right. There's, there's, there's hardware instructions to hide that for you.

723
01:21:51,000 --> 01:21:56,000
But basically again, if I, if I, if I know I'm running longer than I need to, I'll go yield.

724
01:21:56,000 --> 01:22:02,000
You can do this for other things in your data system too. Like if you're going to go try to acquire a lock, the lock's not available,

725
01:22:02,000 --> 01:22:05,000
set it your thread spinning and waiting try to try that lock, you yield back.

726
01:22:05,000 --> 01:22:11,000
But then again, because of the data systems controls everything, we yield back with not just like, you know, you yield to the OS.

727
01:22:11,000 --> 01:22:15,000
What do you say yield? That's it. And the database system, we can say, I'm yielding back to the scheduler.

728
01:22:15,000 --> 01:22:20,000
And oh, by the way, I need this lock. Don't schedule me until that lock is now available.

729
01:22:20,000 --> 01:22:26,000
And when it does, the OS can put you back. Right. So again, complete control of everything if we do this ourselves.

730
01:22:26,000 --> 01:22:30,000
So SQLS is probably the first one that did this. There's other systems that do this now.

731
01:22:30,000 --> 01:22:32,000
CeliaDB does has this framework called C-star.

732
01:22:32,000 --> 01:22:37,000
Phonodini is a poor man's version of this. Basically, every time before they read something from disk, they just yield.

733
01:22:37,000 --> 01:22:44,000
That's it. Right. And the core base is a experimental system out of silent-fraging university that explicitly does built-in-tired cover teens.

734
01:22:44,000 --> 01:22:51,000
And there's a video from the CeliaDB guys from a few years ago that talks about the C-star thing.

735
01:22:51,000 --> 01:22:56,000
Okay. We're well over time.

736
01:22:56,000 --> 01:23:01,000
Distribute scheduling, basically, all the same problems. We're now over the network. Right.

737
01:23:01,000 --> 01:23:07,000
I mean, you laugh. That's really what it is. And then we'll cover work list, like dynamic scaling later.

738
01:23:07,000 --> 01:23:12,000
But we'll see this snowflake can do both. So systems can do ones or the other.

739
01:23:12,000 --> 01:23:16,000
All right. May take away. Data data systems are beautiful.

740
01:23:16,000 --> 01:23:20,000
Don't let the Aubrey system tell you, bossy around. Don't let the Aubrey system try to do anything.

741
01:23:20,000 --> 01:23:24,000
You want to do everything yourself. I think the C-go-S approach is probably the right way to do it.

742
01:23:24,000 --> 01:23:29,000
I think it's overkill for what we're doing in this class. But, you know, it's beautiful.

743
01:23:29,000 --> 01:23:32,000
Okay. What's that? Strong will, too, yes.

744
01:23:32,000 --> 01:23:37,000
Next class, we'll do another one, hash joins. And then on Monday next week, we'll do multi-late joins.

745
01:23:37,000 --> 01:23:41,000
We'll do a quick overview of performance counters that we talked about.

746
01:23:41,000 --> 01:23:47,000
Somebody had a question about, we'll do that next week on Monday. And then Wednesday next week will be the project status updates.

747
01:23:47,000 --> 01:23:48,000
Okay.

748
01:24:11,000 --> 01:24:13,000
Okay.

