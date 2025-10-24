---
title: CMU15721 P10S202409 ParallelHashJoinAlgorithmsCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Carnegie Mellon University's Advanced Database Systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:09,000 --> 00:00:18,000
Okay, so a lot to cover hash joins.

4
00:00:18,000 --> 00:00:21,000
We probably can have done this in two lectures, but try to

5
00:00:21,000 --> 00:00:24,000
cram through as much as we can.

6
00:00:24,000 --> 00:00:28,000
The, where we picked off last class was we showed how to take

7
00:00:28,000 --> 00:00:34,000
a query plan, identify what data is going to access, break that data up into

8
00:00:34,000 --> 00:00:36,000
smaller units called morsels.

9
00:00:36,000 --> 00:00:40,000
It's one approach we looked at, and then have them pull from some kind of global queue.

10
00:00:40,000 --> 00:00:44,000
And we said that the pull-based approach was going to be superior than a push-based

11
00:00:44,000 --> 00:00:49,000
approach for scheduling, and that morsels is, in by itself, the techniques of the

12
00:00:49,000 --> 00:00:52,000
low-low implementation of it may differ from one system to the next.

13
00:00:52,000 --> 00:00:55,000
But the idea that I'm going to break up large chunks of data in the smaller parts,

14
00:00:55,000 --> 00:01:01,000
that's not unique to the morsels idea, that's an old idea in parallel system to

15
00:01:01,000 --> 00:01:03,000
parallel data systems.

16
00:01:03,000 --> 00:01:08,000
So, and as I said at the end that the, although we ran out of time, basically all

17
00:01:08,000 --> 00:01:12,000
papers we discussed last class were all about signal-node data systems, but when you

18
00:01:12,000 --> 00:01:15,000
go to distributed, it's more or less the same thing.

19
00:01:15,000 --> 00:01:20,000
Right, just now you made it need account for network latency in, you know, between

20
00:01:20,000 --> 00:01:23,000
nodes rather than just like, assume everything's on the same box.

21
00:01:23,000 --> 00:01:28,000
And whether or not you want to have your, your scheduler plan individual tasks or

22
00:01:28,000 --> 00:01:32,000
course in each single node, whether you sort of a hierarchical approach, or say,

23
00:01:32,000 --> 00:01:36,000
here's the bunch of tasks I want to run, send that to a node and the node and the

24
00:01:36,000 --> 00:01:38,000
node decides how to divide up two different workers.

25
00:01:38,000 --> 00:01:42,000
Right, the different approaches, there's pros and cons to both of them, but we're

26
00:01:42,000 --> 00:01:44,000
not going to really cover those.

27
00:01:44,000 --> 00:01:47,000
The one thing that we ran out of class, we ran out of time, I went briefly to

28
00:01:47,000 --> 00:01:51,000
discuss, because this is going to come up when we start talking about real-world

29
00:01:51,000 --> 00:01:56,000
implementations of systems, is the notion between dynamic scaling and work

30
00:01:56,000 --> 00:02:01,000
stealing, a way to allow the system to sort of rebalance itself and improve

31
00:02:01,000 --> 00:02:03,000
performance rather than getting stuck behind stragglers.

32
00:02:03,000 --> 00:02:07,000
And these are not mutually exclusive, like snowflakes listen to both of these,

33
00:02:07,000 --> 00:02:08,000
snowflake will do both of these.

34
00:02:08,000 --> 00:02:12,000
Some systems will do something, you know, if it's a cloud-based system, you can do

35
00:02:12,000 --> 00:02:16,000
the dynamic scaling because you have additional resources.

36
00:02:16,000 --> 00:02:19,000
If you're stuck to a single node box, the way the hyper was, you can all.

37
00:02:20,000 --> 00:02:24,000
Right, so dynamic scaling basically says that you recognize that before a query

38
00:02:24,000 --> 00:02:31,000
starts running, that I maybe have more tasks than I have workers for, and I know

39
00:02:31,000 --> 00:02:33,000
that can make things slower for me.

40
00:02:33,000 --> 00:02:37,000
So therefore, maybe I want to temporarily include additional resources, scale,

41
00:02:37,000 --> 00:02:42,000
horizontally, add more workers to allow that process that query so that runs more quickly.

42
00:02:42,000 --> 00:02:44,000
And so, what's the difference in snowflake, they'll have something called flexible

43
00:02:44,000 --> 00:02:48,000
compute where they basically have this side cluster available to all of the

44
00:02:49,000 --> 00:02:54,000
customers for additional workers, and that you can occasionally borrow some without paying extra

45
00:02:54,000 --> 00:02:56,000
and make your queries run a little bit faster.

46
00:02:56,000 --> 00:02:58,000
Again, we can't do that.

47
00:02:58,000 --> 00:03:01,000
It's hard to do that on-prem, because you have the provision harbor ahead of time,

48
00:03:01,000 --> 00:03:05,000
but in the cloud everything's elastic and it makes it easier.

49
00:03:05,000 --> 00:03:09,000
And then work-stealing again, we covered last time, basically says you allow a worker

50
00:03:09,000 --> 00:03:11,000
to take work from another peer.

51
00:03:11,000 --> 00:03:17,000
And then whether or not you want to have that, you know, the worker that's stealing the

52
00:03:18,000 --> 00:03:24,000
stealer, whether they should go move data from the stealer, the worker that's stealing

53
00:03:24,000 --> 00:03:29,000
from, get the data from them, or go back to the distributed storage, the S3 or

54
00:03:29,000 --> 00:03:30,000
whatever.

55
00:03:30,000 --> 00:03:32,000
Again, depends on the implementation.

56
00:03:32,000 --> 00:03:35,000
Snowflake's going to always go back to the remote storage, because they don't want to slow

57
00:03:35,000 --> 00:03:39,000
down the worker that's the straggler, but in case of hyper, we saw that it'll go get

58
00:03:39,000 --> 00:03:42,000
it directly from the worker CPU.

59
00:03:42,000 --> 00:03:45,000
In that case, because everything was in memory.

60
00:03:45,000 --> 00:03:52,000
Again, these are just our design decisions we can account for when we build a larger system.

61
00:03:52,000 --> 00:04:00,000
So today I want to focus on joins, because joins are the most important, one of the most important

62
00:04:00,000 --> 00:04:04,000
operator would have in a relational database system.

63
00:04:04,000 --> 00:04:07,000
And we're really going to be focused on how we do this in parallel.

64
00:04:07,000 --> 00:04:11,000
And again, we're going to focus on a single node system because we're going to assume that

65
00:04:12,000 --> 00:04:15,000
something else above us has already moved the data to where we needed to be.

66
00:04:15,000 --> 00:04:17,000
Again, that's not interesting.

67
00:04:17,000 --> 00:04:22,000
That just says, okay, this needs the needed to go here, and then something moves that.

68
00:04:22,000 --> 00:04:27,000
What we really care about is when we get all the data on a single node, assuming that everything fits in memory,

69
00:04:27,000 --> 00:04:31,000
how can we run as fast as possible.

70
00:04:31,000 --> 00:04:35,000
So again, we're talking about the background of what the different sort of parallel join algorithms,

71
00:04:35,000 --> 00:04:38,000
high performance join algorithms look like for the last 30, 40, 50 years.

72
00:04:39,000 --> 00:04:42,000
Then we'll talk about the basic building blocks to do a parallel hash join.

73
00:04:42,000 --> 00:04:51,000
Then we'll talk about different hash functions, the hash schemes, and the so high level overview of the evaluation for the paper you guys read.

74
00:04:51,000 --> 00:04:56,000
Which I understand the paper was a bit inscrutable for some of you, because there's some background material you may not have.

75
00:04:56,000 --> 00:04:59,000
I'll try to ask questions, I'll try to cover that as we go along.

76
00:04:59,000 --> 00:05:02,000
All right.

77
00:05:02,000 --> 00:05:04,000
So parallel join algorithms.

78
00:05:04,000 --> 00:05:13,000
Again, the basic idea is that we want to be able to take two relations to join together across multiple workers at the same time to speed things up.

79
00:05:13,000 --> 00:05:17,000
In the intro class, we didn't discuss threads or workers when we did joins.

80
00:05:17,000 --> 00:05:23,000
We just said, here's the join algorithm, and then we computed the complexity of it based on the number of pages that had to read and write from disk.

81
00:05:23,000 --> 00:05:30,000
Now we assume everything resides in memory, and now we have additional cores, because this is 721, not 445, 645.

82
00:05:30,000 --> 00:05:32,000
We have all these additional resources for us.

83
00:05:32,000 --> 00:05:35,000
How can we get this to run as fast as possible?

84
00:05:35,000 --> 00:05:38,000
So again, will we focus on binary joins or just taking two relations?

85
00:05:38,000 --> 00:05:45,000
Next class, we'll talk about multi-way joins or three-way joins, three or more.

86
00:05:45,000 --> 00:05:49,000
And the idea is that can you join multiple tables exactly at the same time?

87
00:05:49,000 --> 00:05:51,000
And we'll see an algorithm to do that.

88
00:05:51,000 --> 00:05:54,000
Most of the times, for most queries, you want to do a binary join.

89
00:05:54,000 --> 00:05:56,000
That's going to be faster than the multi-way join.

90
00:05:56,000 --> 00:06:00,000
Well, it's for graph workloads that multi-way join will be better.

91
00:06:00,000 --> 00:06:04,000
So the two main purges that we're going to care about are hash join and sortmers join.

92
00:06:04,000 --> 00:06:10,000
I'm not teaching sortmers join this year just because most systems aren't going to implement it.

93
00:06:10,000 --> 00:06:14,000
Nine times out of ten or 99 times out of 100, you're going to want the hash join.

94
00:06:14,000 --> 00:06:16,000
That's always going to be faster.

95
00:06:16,000 --> 00:06:19,000
If the thing's already sorted in the way you want it on the join key,

96
00:06:19,000 --> 00:06:21,000
then yeah, you can do sortmers join.

97
00:06:21,000 --> 00:06:25,000
And the paper you've read about talk about some ways to speed that up using simbdi and other things.

98
00:06:25,000 --> 00:06:28,000
But for now, I don't think it's necessary to know that.

99
00:06:28,000 --> 00:06:31,000
I rather focus on how can we do hash join faster?

100
00:06:31,000 --> 00:06:38,000
We're also not going to talk about nest loop joins because this is almost always the worst thing to possibly do in an O-lap system.

101
00:06:38,000 --> 00:06:42,000
You would only do this if you know like the table has like ten two pulls.

102
00:06:42,000 --> 00:06:50,000
And so again, hash join is always going to be preferable to everything else.

103
00:06:50,000 --> 00:06:56,000
So the goal today is again how to max my parallelism and part of that is going to be being aware of what the CPU wants from us,

104
00:06:56,000 --> 00:07:00,000
being aware of what the threads are reading and writing to to avoid synchronization costs,

105
00:07:00,000 --> 00:07:07,000
and understanding the penalties of reading data that's in a different human region or maybe that's unaligned.

106
00:07:07,000 --> 00:07:13,000
So it didn't always used to be that hash join was considered to be superior to everything else.

107
00:07:13,000 --> 00:07:21,000
This is sort of a classic debate in data bases where it's gone back and forth between whether sorting is faster for joins versus hashing.

108
00:07:21,000 --> 00:07:26,000
Back in the 1970s in the first database systems that were running on very, very primitive early computers,

109
00:07:26,000 --> 00:07:35,000
the handle tables that were larger than memory, the grace hash join or how to spill joins to disk,

110
00:07:35,000 --> 00:07:40,000
was an invented yet, but they had an external merge short algorithm.

111
00:07:40,000 --> 00:07:44,000
So they said, okay, well if I need to join two tables that are really big, bigger than the amount of memory I have,

112
00:07:44,000 --> 00:07:49,000
again, think of like megabytes, not terabytes of memory, or kilobytes in some cases,

113
00:07:49,000 --> 00:07:55,000
that they had a way to then be able to do external merge sort so they could write the sort of data out the disk,

114
00:07:55,000 --> 00:08:00,000
bring them in as partitions or chunks, and then do the merge pass to join them.

115
00:08:00,000 --> 00:08:09,000
In the 1980s, the hardware got better, and then the, you know, there was this project at a Japan called the Grace database machine,

116
00:08:09,000 --> 00:08:14,000
and so they invented the Grace hash join, which is a precursor to the partition join we're talking about today,

117
00:08:14,000 --> 00:08:22,000
and they had to be able to then spill the buckets to disk, recursively to bring things up to smaller chunks that could fit in memory.

118
00:08:22,000 --> 00:08:26,000
There was another movement called database machines, which the Grace project was part of,

119
00:08:26,000 --> 00:08:32,000
and that was like specialized hardware that had custom silicon just to do hash joins.

120
00:08:32,000 --> 00:08:35,000
So they had ways of speed up hash joins back in the day.

121
00:08:35,000 --> 00:08:40,000
In the 1990s, an early paper came out from Gert's Graphi, the guy that invented volcano,

122
00:08:40,000 --> 00:08:44,000
the volcano model, the iterator model, the guy that invented the exterior operator,

123
00:08:44,000 --> 00:08:46,000
the guy that invented Cascades, and we'll cover it later on.

124
00:08:46,000 --> 00:08:53,000
He had a paper that basically said these two algorithms were equivalent, given the hardware that was available at the time.

125
00:08:54,000 --> 00:08:59,000
But since the 2000s, since the turn of the century, hashing has been shown to be preferable.

126
00:08:59,000 --> 00:09:04,000
And so the question is always now, is it better to partition or not?

127
00:09:04,000 --> 00:09:08,000
And in the paper you guys read, I think they show partitioning is going to be faster.

128
00:09:08,000 --> 00:09:12,000
There's another paper from other Germans, from the hyper Germans, of Umber Germans that said,

129
00:09:12,000 --> 00:09:15,000
yes, partitioning is faster, but it's really hard to get it right.

130
00:09:15,000 --> 00:09:19,000
So most of the time, you're better off not partitioning.

131
00:09:19,000 --> 00:09:26,000
Sorry, not the partitioning is faster, but you're better off not partitioning because it's good enough for most things.

132
00:09:26,000 --> 00:09:29,000
So this is what we're going to focus on today.

133
00:09:29,000 --> 00:09:34,000
We're going to know our certainers join, and we're really going to discuss the partition versus not partition approaches,

134
00:09:34,000 --> 00:09:37,000
and the modern variants of these things.

135
00:09:37,000 --> 00:09:43,000
For certainers join the paper that they, I think the M-Waste, certainers join the paper that they cite,

136
00:09:43,000 --> 00:09:52,000
the paper you guys read, that's from Intel, actually, off-sreat, from Intel and Oracle, from the 2009 that basically said,

137
00:09:52,000 --> 00:09:58,000
hey, short merge will be better than hash join if you have, uh, simile registers that have 512 bits.

138
00:09:58,000 --> 00:10:02,000
Because again, this is 2009 before AVX512 came along.

139
00:10:02,000 --> 00:10:07,000
Now if the AVX512 is around, and hashing, I think is still considered preferable.

140
00:10:07,000 --> 00:10:13,000
Now again, if your data is already sorted on the join key, then yeah, that's always be faster than hash join.

141
00:10:13,000 --> 00:10:15,000
Uh, but, you know, most of the time, it's not.

142
00:10:15,000 --> 00:10:22,000
Especially in a, you know, in the lake house, so that the data lake environment, we're talking about where someone's just writing out random parquet files,

143
00:10:22,000 --> 00:10:24,000
and it's your job to join them together.

144
00:10:24,000 --> 00:10:27,000
So things almost never going to be sorted on the, on the join key.

145
00:10:27,000 --> 00:10:30,000
They're never going to be partitioned on the join key either.

146
00:10:30,000 --> 00:10:32,000
All right, so that was 2009.

147
00:10:32,000 --> 00:10:36,000
Uh, hashing was faster if you have, but if you had AVX512, you could get better.

148
00:10:36,000 --> 00:10:42,000
And then there was a paper from Wisconsin, actually from Jignesh, and his student, that basically showed how the early work that's shown,

149
00:10:42,000 --> 00:10:46,000
the trade-offs between the partitioning hash join versus the non-partitioning hash join.

150
00:10:46,000 --> 00:10:52,000
Um, and, and, and, and their approach, I think they said that the partition one was actually was better.

151
00:10:52,000 --> 00:10:57,000
And the hyper guys came out in a paper, uh, the, the next year in 2012 said,

152
00:10:57,000 --> 00:11:02,000
well, it turns out, sort of just joined if you do it our way, is even faster than hash joined from the Wisconsin people,

153
00:11:02,000 --> 00:11:06,000
and without doing, without requiring AVX512, right?

154
00:11:06,000 --> 00:11:10,000
Just using the harder to do up a time with hyper, they could do sort of just join faster.

155
00:11:10,000 --> 00:11:14,000
But then they came back a year later and said, ignore what we said in this paper,

156
00:11:14,000 --> 00:11:18,000
uh, you really want to use hashing, and here's the way we did it, and look how much faster it is.

157
00:11:19,000 --> 00:11:26,000
Then another paper around the same time in 2013 from, uh, other Germans, or, I guess, Swiss Germans, uh,

158
00:11:26,000 --> 00:11:32,000
that they said, here's, here's additional operations you can do, and here's how to make the radix hash join,

159
00:11:32,000 --> 00:11:34,000
which we'll cover today go faster.

160
00:11:34,000 --> 00:11:38,000
Then there's a paper you guys read from different Germans, uh, at Sarland, they basically said,

161
00:11:38,000 --> 00:11:42,000
everybody's, you know, everybody is, is showing these different numbers and these different results,

162
00:11:42,000 --> 00:11:47,000
and it's really hard to compare an apple, apple, uh, have an apple, apple, apple, apple comparison between the different approaches,

163
00:11:47,000 --> 00:11:50,000
because they're measuring different things, they're different implications, running on different harbor,

164
00:11:50,000 --> 00:11:56,000
different work was different everything, and the idea was to have a single paper, you know, look at all of them.

165
00:11:56,000 --> 00:12:04,000
Right? But again, this is going to be a, uh, this is going to be a, a test bed system,

166
00:12:04,000 --> 00:12:09,000
uh, so they are going to materialize the tuples as if it was a real engine, but it's, it's not going to have the,

167
00:12:09,000 --> 00:12:12,000
you know, it's not a complete system like hyper or umper is going to be.

168
00:12:13,000 --> 00:12:18,000
And then lastly, the, most recent paper, sort of in the space that, you know, sort of matters,

169
00:12:18,000 --> 00:12:23,000
which I didn't have you guys read from the, the umper guys, which again, same Germans as the hyper Germans,

170
00:12:23,000 --> 00:12:28,000
uh, and they basically said, radix hash join is faster in a larger system and a full system like umper,

171
00:12:28,000 --> 00:12:32,000
but the challenge is going to be when to know when you actually want to use it,

172
00:12:32,000 --> 00:12:38,000
because there's these different design, different, uh, different aspects of the, of the workload and the data

173
00:12:38,000 --> 00:12:43,000
and the hardware that you have to account for when you want to decide how to, to, you know,

174
00:12:43,000 --> 00:12:46,000
to use radix hash join correctly, right?

175
00:12:47,000 --> 00:12:51,000
And most of the systems, as far as I know, like the real systems that are there today,

176
00:12:51,000 --> 00:12:56,000
they're not going to implement, you know, the, the radix hash join versus the, the, the, the,

177
00:12:56,000 --> 00:12:59,000
the, the, the, the, not, the partition hash join, but the non-partition hash join,

178
00:12:59,000 --> 00:13:02,000
they're not going to implement, usually don't implement different hash tables, implementations,

179
00:13:02,000 --> 00:13:05,000
click houses, the exception, we'll cover that in a second.

180
00:13:06,000 --> 00:13:09,000
Uh, and so everyone sort of picks one and, and it's good enough.

181
00:13:10,000 --> 00:13:14,000
And, and the paper you guys read from, from the Sarlin Germans, they basically said,

182
00:13:14,000 --> 00:13:19,000
you know, hash join is important, but it's not the most, you know, it's not when you're spending all your time in, in queries.

183
00:13:19,000 --> 00:13:25,000
And so you're probably better off, uh, optimizing other things, which we've been saying throughout the semester that

184
00:13:25,000 --> 00:13:33,000
there's not like one, the, the, the, the, the, the current state of the research and, and of database systems is that

185
00:13:33,000 --> 00:13:36,000
there's not one thing you could point to, like this is the biggest problem, we got to fix this.

186
00:13:36,000 --> 00:13:40,000
It's a combination of a bunch of things. So yes, if you have a really crappy join hour with them, then yeah,

187
00:13:40,000 --> 00:13:44,000
that's going to be a dominating cost of your, of your system.

188
00:13:44,000 --> 00:13:50,000
But once you start implementing the base conversations that we'll talk about today, you know, separate from the, the partition versus the non-partition one,

189
00:13:50,000 --> 00:13:58,000
like, you're not going to shave off a large number of, of, of more cycles or more time in queries, trying to make your hash run even faster.

190
00:13:58,000 --> 00:14:08,000
I had my one student, Prashant, my, my previous PCH student, who's now Databricks, working on photon, uh, he spent about a half a year looking at some of these early works,

191
00:14:08,000 --> 00:14:12,000
I met, I met these guys and these guys, like, trying to make their hash runs faster.

192
00:14:12,000 --> 00:14:19,000
And he, we were going, like, we were literally counting cycles per tubal. Like he got it down from like 12 cycles per tubal to 11 cycles per tubal.

193
00:14:19,000 --> 00:14:24,000
And like, in the end, it doesn't matter. And we, we never published anything about it.

194
00:14:24,000 --> 00:14:34,000
Anyway, so anyway, we'll, we'll cover the different approaches that we go along. But the important thing to cover now is, is, is, discusses how we want to design our algorithm.

195
00:14:34,000 --> 00:14:41,000
And what is the overarching theme of how we want to make decisions about certain trade offs of our implementation?

196
00:14:41,000 --> 00:14:49,000
And this is going to come down to whether our, uh, whether implementation is going to be considered harbor, harbor conscious or covered oblivious.

197
00:14:49,000 --> 00:14:58,000
And I know what these terms mean. I think the paper covered it. What does the mean harbor oblivious? What does oblivious mean?

198
00:14:58,000 --> 00:15:10,000
You don't know. Yeah. So meaning, like, the algorithm doesn't know, doesn't care about what the, what the cache size is, the number of threads are, what the TLB size is, right?

199
00:15:10,000 --> 00:15:18,000
It's just like sort of, there's a standard algorithm. You try to do the best you can being without tuning civic things to the actual hardware.

200
00:15:18,000 --> 00:15:29,000
Horror conscious is the opposite. It's saying like, okay, I'm going to try to look at all the low level information specifications about the harbor that I'm running on, like the cache sizes, like the, the newer regions and so forth.

201
00:15:29,000 --> 00:15:37,000
And then have my algorithm make decisions of how to divide things up and move things around based on, based on that.

202
00:15:37,000 --> 00:15:52,000
Right? There's trade-offs to each of these. Obviously that in, if I'm harbor oblivious, then I write it once and that's good enough for everywhere. However, conscious means that I have to have specific optimizations that may not work anymore as harbor evolves over time.

203
00:15:52,000 --> 00:16:05,000
Or if I go, you know, somehow something there's something something in zions or x86 is completely different than something in arm, then my algorithms will, will, will not, you know, will not scale in the other, other, uh, ISA or other architecture.

204
00:16:05,000 --> 00:16:18,000
All right, so within this, we want to have sort of two goals of how we want to implement our algorithms. First of that, we obviously want to minimize synchronization. This means that since we're talking about a parallel joint algorithm, we have to have multiple threads or multiple workers running at the same time.

205
00:16:18,000 --> 00:16:29,000
And we want to reduce the amount of communication we have between those threads so that one thread can continue working and not get blocked on, you know, another thread, you know, filling up some buffer hash.

206
00:16:29,000 --> 00:16:50,000
So again, we want our threads to be able to run full three, sorry, full speed. So it doesn't mean that we want to make our implementation lock free or latch free. It just means that we can be careful about when we actually go acquire latches so that, you know, it's not everyone trying to collaborate each other all the time.

207
00:16:50,000 --> 00:17:05,000
So the second goal is to minimize the cost of going accessing memory. And this means that we want the data that any threads can be operating on, working on, to be local to it, ideally in its caches.

208
00:17:05,000 --> 00:17:17,000
And then, you know, L1, L2, then L3. L3 shared across different cores, these in Zions, within a single socket. Or if I can't have things in my last level cache, I want to have it in my local memory.

209
00:17:17,000 --> 00:17:34,000
Because I want to avoid having to go over, over, you know, the interconnect across different Numer regions. And so the way we'll design our algorithms is very similar to how we design algorithms in the interclass where we were said we, when we never bring something in from disk, a page from disk into memory, we want to do as much work as we can on that.

210
00:17:34,000 --> 00:17:48,000
On that piece of data before we throw it away because we don't want to go fetch the disk again. Or it's the same thing we saw with hyper where they wanted to do as much work as they can for a single tuple sitting in a CPU register going up the pipeline before they went back got another tuple.

211
00:17:48,000 --> 00:17:59,000
Because again, the cost of going, you know, something in memory to from CPU cache into register was relatively expensive. Right. So this, this idea is shouldn't be far, far into us.

212
00:17:59,000 --> 00:18:19,000
So let's focus focus how we want to do this. So what can make our, what's going to make our query go slow when our cache miss? Right. Well, if we just fill up our cache with a bunch of crap, a bunch of stuff, a bunch of data, then yeah, we're not going to have any space to store new things.

213
00:18:19,000 --> 00:18:38,000
But another challenge is going to be we have to actually consider the TLB on the actual CPU because now if we have, if we're trying to have our thread address a bunch of different, you know, cache lines across memory, then if I'm just polluting my cache with all these random cache lines.

214
00:18:38,000 --> 00:18:51,000
And now when I do another look up for some other, you know, cache line, not only is it not going to be my CPU cache because it got the CPU victim and put it out the memory, but it's also the entry is not going to be my TLB.

215
00:18:51,000 --> 00:19:04,000
So I'm actually going to pay two cache cache misses. I have to do one single look up. So I want to be careful about how I'm bringing in bringing my data and make sure again, I've reused as much as I can before I move on to the next thing.

216
00:19:04,000 --> 00:19:13,000
And basically I want to avoid doing complete random access. Even though it's memory, we said we could do random access. We want to still be careful about what we're accessing to avoid that issue.

217
00:19:13,000 --> 00:19:23,000
Again, it's just like in a dispassion system in the intro class, just now we're at the, you know, the even smaller scale, but it's still going to still going to matter a lot.

218
00:19:23,000 --> 00:19:40,000
So I've already said this. We're going to avoid random access. We want to try to scan as much as possible. And then when we do have random access, we want to have things be local possible in that way, we're just hitting the local cache over and over again.

219
00:19:40,000 --> 00:19:54,000
So there's going to be this trade off with C when we talk about the rate of join, where there is going to be the the amount of instructions we would have to execute to do something versus the amount of memory we may consume and the amount of cycles we consume.

220
00:19:54,000 --> 00:20:19,000
And the idea of this partition step is that if I pre-process my data on both the build side and the probe side of the join and put it in these nice little chunks that can that that will only access by a single thread or single worker, then they're not going to go over the interconnect to go get random things and they can just scan through sequentially on these buffers and not communicate with anybody else.

221
00:20:19,000 --> 00:20:31,000
Yes, I'm doing more work, but in the end, I'll pay a few cycles because there won't be again traffic on the hardware.

222
00:20:31,000 --> 00:20:45,000
So as I already said, the hash join is most important operator we're going to have in our database system. Again, we'll see at the end that it's not always going to be the dominant cost, but nevertheless, this is what most of you want to do in an old lab system with lots of joins.

223
00:20:45,000 --> 00:21:00,000
So we want to make this go go fast as possible. And ideally, again, we want to have our all the cores running at full capacity, 100% utilization, when we're doing our join and minimize all the stalls of going, you know, getting things from D-RAM and putting into our C-RAM.

224
00:21:00,000 --> 00:21:21,000
So at a high level hash join has three steps where the first step is optional. So in the first step, as I already said, is the partition phase where you could decide that I want to take the the tuples that are coming up into my join operator on the build side and the the prototype or the the inner and the outer relation.

225
00:21:22,000 --> 00:21:32,000
And I'm going to break them up into these shards or partitions based on the hash key that are starting based on the hashing the join key that being used in the join operator.

226
00:21:32,000 --> 00:21:42,000
And I'll divide them up into different chunks and then the threads could then then on the on the build side, you could then build the hash table at each worker using these disjoint subsets.

227
00:21:42,000 --> 00:21:48,000
And then on the probe side, same thing different workers will do probing into the hash table on the disjoint subsets.

228
00:21:49,000 --> 00:22:00,000
And on the build side is as I said, we're going to actually build the hash table. So as this, we're going to assume we have a single hash table, single logical hash table. In some cases, you can have multiple physical ones that are still in front of a single interface.

229
00:22:00,000 --> 00:22:13,000
We'll cover that in a second. But it's a single hash table and that that prevents me from having any false negatives where I do a probe or something should exist, but because it's in a different hash table or a different location, then I end up incorrectly missing it.

230
00:22:14,000 --> 00:22:29,000
And that's the probe is. So again, you do a look up. If you find a match, I'll talk about how to find a match in a second, then you take the the two from the out of relation, the two from the interrelation, match the two together and then shove that up the pipeline as the output.

231
00:22:31,000 --> 00:22:40,000
So the Sarland paper you guys read that from these Germans, they correctly make a big deal that this materialization cost is last up here. It does matter a lot.

232
00:22:41,000 --> 00:22:51,000
And a lot of the earlier papers don't, you know, didn't actually do any of this. Right? And they said, you know, just how fast can you do the build in the program partition?

233
00:22:51,000 --> 00:22:58,000
And the reason why this matters because this is like a mem copy to take the out, you're taking two pieces of data, mashing the get and producing the output.

234
00:22:58,000 --> 00:23:11,000
And that's additional pressure on the CPU cache, which if you're not doing it, may give you incorrect readings or the wrong perception about the speed of certain operations for the other parts.

235
00:23:11,000 --> 00:23:27,000
So you always want to do this because that's what a real system would have to do anyway. They didn't cover the paper from the Columbia guys on the SIMD stuff, but like when they were showing how to do like vectorized hash joins or hash backups and so forth, they literally like, I found a match and really throw it away because they were trying to keep everything in L3 cache.

236
00:23:27,000 --> 00:23:39,000
Otherwise, SIMD didn't make a difference. So this is showing in a full system, you have to do this and again, they're including that in the calculation and will discuss the pros and cons of early and late materialization later on.

237
00:23:40,000 --> 00:23:53,000
All right, so let's go through the partition each of these three phases. Again, we'll spend a lot of time on the partition phase because I think there was some confusion on that paper and I think this is, you know, it's good to see how these systems actually could do it even though you may, if you have an

238
00:23:53,000 --> 00:24:06,000
and a building resistant, you may not actually not want to do this partitioning stuff, but it's good understand what's actually going on because some of the trade offs and design sessions that they're going to make for how they're going to implement this are used for other parts of the system, like being aware of, you know, cash, accounting, so forth.

239
00:24:07,000 --> 00:24:16,000
All right, so the partition phase, you're going to take the important relations look in on the outer in the inner and you're going to put them into partition buffers based on the join key.

240
00:24:17,000 --> 00:24:30,000
And the idea is that you're going to take these buffers, these partitions, you're going to redistribute them across the different cores, and then when you now go into the build phase of the probe phase, the workers will be assigned those partitions and they only have to communicate only at the read data within those partitions.

241
00:24:31,000 --> 00:24:45,000
Now you're just doing, you know, doing a central scan in that buffer. And the goal of this is that especially in a in a new architecture that the extra instructions are going to spend to do this extra partitioning step will be overcome.

242
00:24:46,000 --> 00:25:01,000
And the extra cost of the instructions running the instructions to do the partition step and therefore getting better locality of the data at each thread that's going to be faster than blindly just having every thread reading different different parts of memory.

243
00:25:03,000 --> 00:25:13,000
So in some cases the data will actually already partition for you. This is rare, right? If the data is already partitioned on the join key, then you don't have to do this extra step.

244
00:25:13,000 --> 00:25:18,000
You literally can say, okay, you know, take the first thousand two pulls you go here next to thousands of two pulls go there.

245
00:25:19,000 --> 00:25:21,000
But that again, that doesn't always happen.

246
00:25:22,000 --> 00:25:29,000
And so again, this idea comes from the greatest hash drawing we saw in the intro class, but that was like spilling to buckets on disk. Let's see how we do it in memory.

247
00:25:30,000 --> 00:25:42,000
So there's two high level approaches to doing this, the non blocking and the blocking approach. And the non blocking approach, the idea is that we're going to just have the threads at the end of the thread.

248
00:25:43,000 --> 00:25:56,000
So that's just the day at the same time and populate a single hash table without really without doing any, without doing any extra sophisticated things to split things up.

249
00:25:56,000 --> 00:26:06,000
We're literally letting them write out to these buffers and any thread can write any buffer. And therefore we have to use latches to synchronize and make sure that they don't clobber each other or cause problems in our data structure.

250
00:26:07,000 --> 00:26:23,000
And then the blocking approach, the radius approach, this is we're going to scan the potentially scan the correlation multiple times, but then we're going to be clever about how we actually write data into these partitions based on the rate X to avoid having to do any synchronization across the different threads.

251
00:26:24,000 --> 00:26:31,000
So this is the one that's more sophisticated, but again, it requires more pre-processing before doing the one at the top.

252
00:26:32,000 --> 00:26:44,000
And there's actually two variations of one at the top, so we'll cover both of them. So again, the non blocking partition is like we're going to let any thread, so all the threads are going to run at the same time to generate our partitions.

253
00:26:45,000 --> 00:26:58,000
The question is going to be do we have the threads write to single global shared partitions, which we have to protect using latches, or do we have them write to private partitions, think of like almost like thread local storage.

254
00:26:59,000 --> 00:27:10,000
And that way there's no synchronization, but then now I'm going to do another pass at the end to put them have one thread put them into the shared partitions or global partition.

255
00:27:11,000 --> 00:27:19,000
The non blocking how we can have private partitions, because in order to have private partitions you would need like a rate X to actually function based on.

256
00:27:20,000 --> 00:27:25,000
Your question is for non blocking how would you actually even do this without rate of partitioning?

257
00:27:26,000 --> 00:27:34,000
Literally, like everyone, like I say I have 10 partitions, every core is going to have 10 mini partitions.

258
00:27:34,000 --> 00:27:44,000
And then something at the end just puts them all together. Radix partitioning is trying to be covered having one buffer space, but I know what offset I want to write into.

259
00:27:45,000 --> 00:27:47,000
Let's go through the example if you're still going to come back.

260
00:27:47,000 --> 00:27:53,000
So here's our data table. Say we do the really simple thing of like this in the very beginning, splitting up in row groups or morsels.

261
00:27:54,000 --> 00:27:57,000
And this say this column B is what our join key is.

262
00:27:57,000 --> 00:28:06,000
So we're going to hash this join key and then sorry we're going to hash this join key and then that's going to determine which my which my end partitions I want to write into.

263
00:28:07,000 --> 00:28:11,000
So literally think of this every single core is just writing to any other any partition at once.

264
00:28:12,000 --> 00:28:14,000
I think of these just length of buffers.

265
00:28:15,000 --> 00:28:16,000
I was like a change hash table.

266
00:28:17,000 --> 00:28:26,000
And so to prevent the threads from overwriting each other called corrupting the data structure, I got to take latches on the buckets whenever I write into it because I don't want to write it.

267
00:28:27,000 --> 00:28:29,000
I don't know whether another thread is writing to the same time.

268
00:28:30,000 --> 00:28:46,000
Right. But at the end when I'm done when I'm done the I'm done populating these different partitions, I don't need to do any cleanup or consolidation because now you know core one could take this one core two could take this partition.

269
00:28:47,000 --> 00:28:55,000
Everything's all cleaning divide up, but I pay this extra pay this penalty of coordinating using synchronization to make sure that threads don't kill each other when they're writing to the partitions.

270
00:28:55,000 --> 00:28:58,000
So I'm going to have the same partitions at the you know at the population stop.

271
00:29:00,000 --> 00:29:11,000
So this is the share partitions the private partitions is where now every core itself has this has end partitions for the you know for the total number that I'm going to have at the very end.

272
00:29:12,000 --> 00:29:23,000
So say I want I want 10 partitions that I'm going to hand off the 10 cores within each core now this first step here. I'm going to have 10 mini partitions and now each core can write into these things without anybody you know clobbering them.

273
00:29:23,000 --> 00:29:28,000
So I don't need to take any latches because I know everything single threaded and it'll be super fast.

274
00:29:28,000 --> 00:29:35,000
But now the downside is I want to consolidate like for partition one across my different cores. I want to put them into a single partition one.

275
00:29:36,000 --> 00:29:48,000
So I have to do another pass where you have each core sort of one car be in charge of taking the data across the many partitions and putting it together into a global one.

276
00:29:49,000 --> 00:29:53,000
Right. So what's the downside of this?

277
00:29:55,000 --> 00:29:58,000
What's it? I mean yeah the last days yes.

278
00:29:59,000 --> 00:30:09,000
So in this case here when I'm doing this initial pass right I have say in this core here I have this chunk of data it's in my you know it's in my L3 cache.

279
00:30:09,000 --> 00:30:15,000
I don't need to go across any new region to go access anything else because I don't care about anything because I don't care about this data here.

280
00:30:16,000 --> 00:30:23,000
And likewise when I write it out assuming the partitions fit my L3 cache then I'm just writing to my local CPU cache.

281
00:30:24,000 --> 00:30:34,000
But now now when I do this consolidation step this core is in some other new region and it's got to go touch all the you know partition ones across all the other cores which may be in a different new region.

282
00:30:34,000 --> 00:30:40,000
And then I got to write this back now into my new region so that's expensive.

283
00:30:41,000 --> 00:30:42,000
Right.

284
00:30:44,000 --> 00:30:57,000
So this is another good this is actually going to take also two of the pros and cons between like late materialization and early materialization because if I'm doing late materialization then the data I'm actually moving around here could just be like the joint key and the tuple ID.

285
00:30:58,000 --> 00:31:12,000
Right could be kind of small but if I'm doing early materialization and I have like you know 20 columns then this partitioning step here is moving potentially 20 columns around plus going across new region which is always going to be bad.

286
00:31:13,000 --> 00:31:15,000
But it doesn't require lots of building better.

287
00:31:16,000 --> 00:31:23,000
It doesn't require locks is potentially better depends right like if I have multiple new regions then maybe this is bad.

288
00:31:24,000 --> 00:31:25,000
All right.

289
00:31:26,000 --> 00:31:33,000
So this gets into like the horror believe this was a horror consciousness like in order to decide whether I want to do this or not.

290
00:31:34,000 --> 00:31:46,000
Then I had to go look like maybe like run micro benchmarks or something to figure out when the system boots up like what is the harbor capable of that even then that might not work out when actually run it in the real time because you know that the data is heavily skewed then.

291
00:31:46,000 --> 00:31:52,000
You know one one set of partitions might be super big versus another one yes.

292
00:31:53,000 --> 00:31:59,000
On the previous slide that was adjustable partition not local partitions even then you might have the access number across the market.

293
00:32:00,000 --> 00:32:04,000
Correct. So the same it is in this one here actually this one you you definitely would right.

294
00:32:05,000 --> 00:32:15,000
The same it is in this one here are the cores potentially going to have access data that's across new regions yes when it writes into these partitions these partitions are not going to fit now through cash.

295
00:32:16,000 --> 00:32:18,000
So they can be in different different new regions.

296
00:32:19,000 --> 00:32:21,000
The local partitioning is definitely better.

297
00:32:22,000 --> 00:32:28,000
His team is local partitioning definitely better meaning like the the private versus shared again it depends.

298
00:32:31,000 --> 00:32:32,000
Yes.

299
00:32:34,000 --> 00:32:35,000
For the question.

300
00:32:36,000 --> 00:32:40,000
How exactly are the local partition games when it's like literally a thing.

301
00:32:40,000 --> 00:32:47,000
The question is and this last step here how how am I generating how is this thing getting generated.

302
00:32:48,000 --> 00:32:59,000
It's like you literally is squintial scanning through memory and just depending it yeah I mean yeah there's no additional processing you do want to do it literally copying.

303
00:32:59,000 --> 00:33:00,000
Yes.

304
00:33:02,000 --> 00:33:09,000
So what do you better to have the cores keep their local partition that are their cash and then write out some local one.

305
00:33:10,000 --> 00:33:15,000
Your statement is wouldn't be better to have each core have their local partitions in their cash.

306
00:33:16,000 --> 00:33:18,000
Yeah. Which they do yes.

307
00:33:19,000 --> 00:33:27,000
Like this thing here like this like again so I say ten partitions this core is going to have ten many partitions.

308
00:33:27,000 --> 00:33:30,000
And that's all going to be ideal in itself.

309
00:33:31,000 --> 00:33:34,000
This last step here wouldn't be better for this to be where.

310
00:33:35,000 --> 00:33:41,000
No so these are the local partition games plus how the cash is in the last step.

311
00:33:42,000 --> 00:33:49,000
In the last step I have to consolidate so like this core is going to be responsible for partition one so it goes to partition one for the many partitions.

312
00:33:49,000 --> 00:33:55,000
And each core has to copy the data and put it into the final buffers.

313
00:33:57,000 --> 00:34:08,000
And assuming that because you want to write memory that's local to you so partition one is going to end up being in CPU ones, you know cash as a local memory.

314
00:34:08,000 --> 00:34:15,000
So any contention when you try to join them together?

315
00:34:16,000 --> 00:34:17,000
Contention from what?

316
00:34:18,000 --> 00:34:20,000
Because CPU ones the only one reading many partition one.

317
00:34:21,000 --> 00:34:25,000
So there's no coordination there's no synchronization needed. So it's last three.

318
00:34:26,000 --> 00:34:27,000
Yes.

319
00:34:28,000 --> 00:34:31,000
The number of partitions is always equal to the number of cores.

320
00:34:32,000 --> 00:34:34,000
How do you get the number of partitions you want?

321
00:34:35,000 --> 00:34:37,000
It's a question is how do you determine the number of partitions you want?

322
00:34:38,000 --> 00:34:42,000
No it depends on the skewer of the data.

323
00:34:43,000 --> 00:34:46,000
So some publicity you could just say yes the number of cores.

324
00:34:47,000 --> 00:34:59,000
But then what happens when the, again say this data is super heavily skewed and there's a billion keys in partition one and like a thousand keys and all of the other ones.

325
00:35:00,000 --> 00:35:02,000
Well now I got a partition this one again.

326
00:35:03,000 --> 00:35:08,000
So you end up with more partitions than in cores.

327
00:35:09,000 --> 00:35:11,000
Is this last step being done using assembly?

328
00:35:12,000 --> 00:35:14,000
How we like taking this many partitions to use assembly for you?

329
00:35:15,000 --> 00:35:18,000
The question is is this last step being done with SIMD? It's just mem copying.

330
00:35:19,000 --> 00:35:21,000
So SIMD wouldn't really help.

331
00:35:21,000 --> 00:35:27,000
Did that narrative join to the global partitions? Like now we like this.

332
00:35:28,000 --> 00:35:32,000
This question is why do we have to do this last step?

333
00:35:33,000 --> 00:35:36,000
Why can't, when I build the hashable just jump.

334
00:35:37,000 --> 00:35:43,000
You know, I know with it because then you, because now when you're doing the, well first of two things.

335
00:35:44,000 --> 00:35:47,000
But you're doing this because on the build side and the probe side, right?

336
00:35:47,000 --> 00:35:57,000
So now if you have a thread scanning through to do, you know, to build or do the, do the build or do the probe, like now you're kind of doing the jumping again.

337
00:35:58,000 --> 00:36:01,000
I guess I had to highlight the same I guess.

338
00:36:02,000 --> 00:36:12,000
Right? But it's like you're staging things so that when you, when then you then do the, the build and probe, like there's, there's fewer stalls as you scan along.

339
00:36:13,000 --> 00:36:20,000
So you, so you stall because the remote memory access during the partition phase, but then you, you don't have any stalls in the build or probe side.

340
00:36:22,000 --> 00:36:29,000
If we have a large number of partitions, hence fewer, like less number of content you put in loss.

341
00:36:30,000 --> 00:36:39,000
Maybe we just let one of the cores handle all of his many partitions and push it to the global partitions, then having one core handle, one set of what means partitions.

342
00:36:39,000 --> 00:36:48,000
His statement is instead of having every, every core be responsible for like some subset of the many partitions and the solidity of them, we just have one core do that.

343
00:36:49,000 --> 00:36:59,000
So each core takes care of one first partitions and the right set of the global partitions. So we sort of go back to the global partition model, except that because if you have a large number of partitions, there will be less content.

344
00:37:00,000 --> 00:37:11,000
Oh, it's basically saying if you go back here, this is PowerPoint, so you're going to show somebody, you just had a ton of partitions, then the likelihood that any two thread would be writing to the same thing at the same time.

345
00:37:12,000 --> 00:37:16,000
Yes. Getting the significant advantage from what I would say.

346
00:37:17,000 --> 00:37:20,000
I'd debate whether I, I, I pushed back whether it's significant.

347
00:37:21,000 --> 00:37:31,000
But yes, if you, if you increase and significantly, then the likelihood again that the two threads try to contain on the same latch would go down.

348
00:37:33,000 --> 00:37:35,000
And the downside of that would be.

349
00:37:42,000 --> 00:37:43,000
What's that?

350
00:37:44,000 --> 00:37:45,000
Yeah, you.

351
00:37:46,000 --> 00:37:53,000
You know, depends on how big you're allocating these buckets to get to be under utilized and just wasting memory, right?

352
00:37:54,000 --> 00:37:55,000
Okay.

353
00:37:59,000 --> 00:38:02,000
So let's go through now. Let's go through the greatest partitioning.

354
00:38:03,000 --> 00:38:05,000
Again, the idea is the same, the same.

355
00:38:06,000 --> 00:38:12,000
But the goal is that we won't only materialize results once, whereas the other only had materialize twice.

356
00:38:13,000 --> 00:38:16,000
At least in the, in the, in the, in the, for the, for the private partitions.

357
00:38:17,000 --> 00:38:21,000
And can unless you have the overcursor partitioning, but that's like, you have to do that for any, any of them.

358
00:38:22,000 --> 00:38:27,000
So whenever you see us, I do a red X hash drawing or sometimes it's called a red X drawing, it's going to be this approach here.

359
00:38:30,000 --> 00:38:33,000
Right. So the idea is that we're going to scan through the input relation multiple times.

360
00:38:34,000 --> 00:38:38,000
And in the first time, we're just going to gather information about what the data looks like.

361
00:38:39,000 --> 00:38:47,000
And then use that to determine where we want to write data out to our output buffers, you know, when it's time to actually then do the partitioning.

362
00:38:48,000 --> 00:38:56,000
So in the first step, you do the first pass, when you repeat this histogram, which is just going to be the number of two balls that are going to exist with some red X, which I'll explain to that is in a second.

363
00:38:57,000 --> 00:39:06,000
Right. And then we can put the prefix on, which is just a running, running summation of the, of these, of these, from this histogram.

364
00:39:06,000 --> 00:39:12,000
And that's going to determine where each partition is going to start within our output buffer.

365
00:39:13,000 --> 00:39:18,000
And then we scan now our again, and then we have them write out the data into these buffers based on this partition key.

366
00:39:19,000 --> 00:39:25,000
This is just text. So I'll go through an example, but we got to go through, understand what the red X is going to look like and what the prefix some does.

367
00:39:26,000 --> 00:39:27,000
And then that'll tell us how we do this last step here.

368
00:39:28,000 --> 00:39:34,000
Okay. All right. So the, so the red X is literally just like a digit within a number.

369
00:39:34,000 --> 00:39:40,000
So you take the hash of the key you're trying to join on, right, and say the hash ends up being 19, right.

370
00:39:41,000 --> 00:39:48,000
And so the, the red X would just be, you know, the one position, what is the number like nine, right.

371
00:39:49,000 --> 00:39:57,000
And so you can do this just through bit shifting and multiplication. And then that can allow you to extract out. I just want this one number, right.

372
00:39:58,000 --> 00:40:04,000
All right. So what do we do with this? Well, because then we can use this now, right, and get the other one too as well.

373
00:40:05,000 --> 00:40:12,000
We can then use this to maintain a histogram that says for every value within every red X value, what's the number of entries that we see.

374
00:40:13,000 --> 00:40:21,000
And we end up sort of with a sort of list like this that says, okay, for zero, there's two entries for one, there's three entries, and for two, there's one entries.

375
00:40:21,000 --> 00:40:26,000
And so the idea here is that we're going to use the red X to determine which partition number you're going to go into.

376
00:40:27,000 --> 00:40:39,000
And then we're going to use this histogram to be the predict sum, which is the next slide to say, okay, but where within that this giant buffer of my partition data, where does that prefix start or where does that red X start.

377
00:40:41,000 --> 00:40:50,000
So the prefix sum is just taking again, it's a roll in summation. So say this is our input one through one through six. So the prefix sum in the first position is just one because it's, you start with zero.

378
00:40:51,000 --> 00:41:01,000
So one plus zero equals one. But now I'm going to take whatever the number was the sum of the previous addition, take the next number in my input sequence, add those two together, and that's the next value I get.

379
00:41:02,000 --> 00:41:11,000
So one plus two equals three. I keep doing this down the line, and then now for every, within my input sequence, I'm going to have, repeat the prefix sum.

380
00:41:12,000 --> 00:41:28,000
And again, this is what we're going to do this after we repeat the red X histogram, send this all now to our threads, and now they're going to know, okay, well, at this position in my prefix sum, it corresponds to this red X, and therefore I know what offset they're right into.

381
00:41:29,000 --> 00:41:33,000
Think of these are just going to be buffer memory offsets into our partition buffer.

382
00:41:34,000 --> 00:41:51,000
And the reason why we're going to do this is that we don't synchronize. So we do this first pass, compute this prefix sum for all the radixes, we hand that out to all the threads, and then now when they do the partitioning, they don't need to synchronize at all the way we did with the latches from before.

383
00:41:52,000 --> 00:42:10,000
So I don't know if there's a way to compute this efficiently prefix sum with like, with SIMD, there's a paper from Guy Blalock, who's here in the computer science department, from like, it's like, or 1995, and he was envisioning, hey, look, here's how to do vectorized prefix sum.

384
00:42:11,000 --> 00:42:21,000
If you had SIMD instructions to do it, which at the time they did, which again, I still don't think it exists, but just to tell all some Guy is, he's been thinking about this problem for like 30 years.

385
00:42:22,000 --> 00:42:23,000
Question, yes?

386
00:42:25,000 --> 00:42:33,000
Next slide. So the question is, I don't see how the prefix sum is going to help us, we're going to use this prefix sum to tell us what the offset is when we're right into our red X.

387
00:42:34,000 --> 00:42:44,000
So say this is our input data, and we've already hashed it, right? So these values here are the hash values.

388
00:42:45,000 --> 00:42:52,000
So in the first pass of the algorithm, we're going to split up like we did before, like a morsels, let's say we just have two CPUs here.

389
00:42:53,000 --> 00:43:04,000
And then we're going to take the first position, and the first red X of each hash value, and we're going to use that to determine where we want to write the data that corresponds to this record.

390
00:43:05,000 --> 00:43:10,000
So to do this, we compute the prefix sum for the input sequence, right?

391
00:43:11,000 --> 00:43:20,000
Going like this, and then now that's going to be able to tell us, okay, for partition zero, we want to write two slots, right?

392
00:43:21,000 --> 00:43:27,000
So they say we have four values, sorry, two values, zero, one, one, zero. So there's two unique values.

393
00:43:28,000 --> 00:43:31,000
So we know that for partition zero, according to the first red X, there's two elements in here.

394
00:43:32,000 --> 00:43:39,000
So we know that when we write into this giant output buffer, we can write it at the first position.

395
00:43:40,000 --> 00:43:48,000
For partition one, there's two more elements, but it's two, zero plus two. So now we want to start writing at the third position in our giant output buffer.

396
00:43:49,000 --> 00:43:59,000
Right? Like this. So partition zero at CPU zero can write at the first position, partition zero, CPU one can then write at this one, and so forth.

397
00:44:00,000 --> 00:44:08,000
So again, and they don't need to coordinate how to do this, they know they're writing into a memory location in a partition buffer that nobody else is going to be writing into.

398
00:44:09,000 --> 00:44:15,000
So we can just rip through it and run its fastest possible. So then we just scan through the data, and then we just write it out like that.

399
00:44:16,000 --> 00:44:34,000
Now maybe the case, again, if we have, this is hardly in balance where one partition is huge, we can just recursively do this again by looking at the next, the next rate of exposition and just doing this another round, and that'll subdivide it even further.

400
00:44:35,000 --> 00:44:39,000
Right? Then it's your question.

401
00:44:40,000 --> 00:45:02,000
Okay. So again, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, and now you need implementation of, of these different approaches is going to be super slow because, you know, we're, we're reading, writing random locations in memory, and we're polluting our CPU cashers as, as we go along.

402
00:45:02,000 --> 00:45:14,000
So there are, and the paper you guys read, there are some optimizations you can do to, to, to prove this. The first is going to be using what to call the, the, the software write combined buffers or the, the write buffers.

403
00:45:14,000 --> 00:45:30,000
And the idea here is that instead of me just writing out to, you know, as I'm scanning along, like writing data here and writing data there, as I'm scanning through on the partitioning step, all right to, like, almost like the private buffers from before, but much smaller.

404
00:45:30,000 --> 00:45:50,000
So I write to a little bit to that private buffer and when that buffer gets filled, then I write to that remote location. And again, going back to the slide here, since I know that, at this step here, I know that nobody else is being writing to the range that I'm supposed to write into, it's, you know, there won't be any issues if I delay a little bit and then write things out in a batch.

405
00:45:50,000 --> 00:45:59,000
Right. And that that'll help things out. Obviously being new, I'm aware from all this is going to matter a lot too. But the other chick we can use is called,

406
00:45:59,000 --> 00:46:13,000
the streaming rights are non temporal streaming rights. And this is a, these are special instructions on the CPU that allows right to a memory location without having the CPU put it into our CPU cache first.

407
00:46:13,000 --> 00:46:26,000
It's like, you're basically bypassing the CPU cache. I want to write to memory location and XYZ. Don't put in my CPU cache, but the CPU normally would because once I read it and then I write it, you just write it almost like direct memory access, write it direct to the memory.

408
00:46:26,000 --> 00:46:35,000
Yes. The last point, it says without a separate right. But there is a separate right. Right. And it's the buffering everything in writing in the software.

409
00:46:35,000 --> 00:46:47,000
But like we don't like in the, in the, the private buffer is like you wrote to the private buffer, then you wrote to the global offers, right. And with, with the greatest partition, I don't need to do that. Right.

410
00:46:47,000 --> 00:47:01,000
I do one pass here and then I know exactly where the days ago and it's one right into that. So there's no extra step now to, to put it as a global global buffer.

411
00:47:01,000 --> 00:47:12,000
So anyway, so there's, there's special instructions. I know Cindy can do this. You can take things out of the Cindy register and get it right into memory. But I think you can get regular, you know, regular CPU registers. Well can do this.

412
00:47:12,000 --> 00:47:20,000
So the combination of these things is how you're going to get this action to work well on modern hardware.

413
00:47:20,000 --> 00:47:35,000
So now we partitioned. Right. Now we have a bunch of data or the option partition. We could have a bunch of data in these nice little partitions that are assigned to different cores or you could just be operating directly on the, on the input data itself on the, on the build phase.

414
00:47:35,000 --> 00:47:49,000
The idea is that we're going to take all the data that's coming on the, from the out of relation, in case case, are we're going to assume we have, we have to have the input, the input data has to have the keys we want to, the columns we want to join on. We're going to hash them.

415
00:47:49,000 --> 00:48:03,000
And then sort in some of the hash table. And then when that's done, then we switch over to the probe, probe phase. Right. So now we need to discuss how we're going to organize our hash table in this build phase to, to run as fast as possible.

416
00:48:04,000 --> 00:48:20,000
So when someone says they have a hash table, they really mean they have two things. They're going to have a hash function or something that takes a, your takes an arbitrary bytes of some value and map it to a integer value in a smaller domain, typically 32 or 64 vets.

417
00:48:21,000 --> 00:48:30,000
And then we, then we, we're going to store this in some of the data structure, which we'll cover in a few more slides. But then within that data structure, we have it need a way to handle collisions.

418
00:48:30,000 --> 00:48:40,000
Because the hash function is going to, is it always going to guarantee that the hash value for two unique two-poles is going to be unique. So we need to figure out what do we do, will we have two guys try to go to the same location.

419
00:48:41,000 --> 00:48:52,000
Right. So again, we're not an algorithm class, we're not going to go into detail about what hash function you want to use or what the actual complexity of the hash tables are.

420
00:48:52,000 --> 00:48:58,000
But we're going to, you know, for the hash functions, we're typically going to use something off the shelf. Most systems do.

421
00:48:58,000 --> 00:49:05,000
Something right there and we'll talk about it in a second. But like, you take something off the shelf, but it's the hash table. We probably want to spend most of our time, make sure we get that right.

422
00:49:06,000 --> 00:49:13,000
Because we want that to be as fast as possible. So for the hash function, there's going to, there's trade up between a speed and, and low collision.

423
00:49:13,000 --> 00:49:20,000
So the fastest hash function you can have is literally just for turn one. And no matter what key I give you, you always get back one.

424
00:49:20,000 --> 00:49:26,000
Because what is that? That's copying from one register to another register. Right. In some cases, the CPU can just inline it. Right.

425
00:49:26,000 --> 00:49:31,000
But it's going to be terrible for collision because no matter what key I give you, it's going to be at the same location.

426
00:49:32,000 --> 00:49:41,000
On the other end of the spectrum, you have perfect hashing, which is going to a way to guarantee that for any possible hash key or any possible key, I get a new hash value.

427
00:49:41,000 --> 00:49:51,000
So a true pure pure, sorry, a true perfect hash function only exists in like in the literature and theoretical papers.

428
00:49:52,000 --> 00:50:03,000
Jignesh is in his PhD student Wisconsin, working on practical implementation of this, which we won't cover. But again, it's not truly perfect because you have to handle the corner cases. But for most of the keys, it's good enough.

429
00:50:03,000 --> 00:50:09,000
But most systems are going to do what Jignesh is doing in his perfect hash function. They're going to use something off the shelf.

430
00:50:09,000 --> 00:50:18,000
So to figure out what hash function you want to use, again, we don't want to implement things ourselves. There's this, there's this GitHub repo for this thing called SM hasher.

431
00:50:18,000 --> 00:50:32,000
And it's basically in the same way that I'm assessed about databases, this guy's obsessed about hash functions. So he has this bench market runs for every possible hash function that exists and he keeps track of the collision rate and the throughput and performance of them.

432
00:50:32,000 --> 00:50:40,000
And I think the Facebook XX hash and the murmur hash, those ones usually rank pretty high.

433
00:50:40,000 --> 00:50:42,000
What's that?

434
00:50:42,000 --> 00:50:51,000
It's like a no-up. Yeah, it says no-up.

435
00:50:51,000 --> 00:50:57,000
So here's a smattering of the ones that probably you'd want to consider for your database system.

436
00:50:57,000 --> 00:51:05,000
So the one the easy and fastest ones to use is one of the oldest ones, the CRC from the 1970s.

437
00:51:05,000 --> 00:51:11,000
The reason why we would consider this in a database system today is because there's actually CPU instructions to do this very efficiently.

438
00:51:11,000 --> 00:51:18,000
So some systems like Clickhouse will use and hyper, I think use CRC for CRC32 for integers.

439
00:51:18,000 --> 00:51:25,000
Because again, it's going to be some of our instructions and it's good enough, the collision rate is good enough.

440
00:51:25,000 --> 00:51:32,000
Remember hash is one of the first modern hash functions that started the new era in 2008.

441
00:51:32,000 --> 00:51:36,000
Actually, I think this was invented by the guy that runs the SMHASHER website.

442
00:51:36,000 --> 00:51:42,000
As far as I know, there's some random dude who put this thing on GitHub and put it on the internet and people just started using it.

443
00:51:42,000 --> 00:51:44,000
And he thinks up to remember hash 3.

444
00:51:44,000 --> 00:51:52,000
And one of the papers they talk about how you can use murmur hash 2, you can use that in SIMD to do the vectorized lookups in a hash table.

445
00:51:52,000 --> 00:51:56,000
So over the years, it's gotten better. Google then forked murmur hash and created City hash.

446
00:51:56,000 --> 00:52:02,000
Then they had a follow up called Farm hash, which is just there's better collision, I think for longer strings.

447
00:52:02,000 --> 00:52:06,000
And then Facebook has this thing called XX hash, which is up to version 3.

448
00:52:06,000 --> 00:52:13,000
And that one again, for performance and collision rate for XX hash is pretty good.

449
00:52:13,000 --> 00:52:19,000
So probably murmur hash, XX hash and the combination of CRC32 is probably what you would want to use.

450
00:52:19,000 --> 00:52:21,000
Yes.

451
00:52:21,000 --> 00:52:26,000
So for any given algorithm, you might be able to engineer data that you will probably want that.

452
00:52:26,000 --> 00:52:31,000
We also, when you say better collision rates, you say better on average or not even workload.

453
00:52:31,000 --> 00:52:36,000
Yes, the question is like, could you come up to the generally cases to make one hash function be terrible?

454
00:52:36,000 --> 00:52:38,000
Yes.

455
00:52:38,000 --> 00:52:44,000
And so with this thing, basically, you try to try to do everything at it and figure out what works the best and doesn't work best.

456
00:52:45,000 --> 00:52:48,000
And then what's the right trend between collision rate versus performance?

457
00:52:48,000 --> 00:52:52,000
Again, perfect hash function will have zero collisions, but it's going to be super slow.

458
00:52:52,000 --> 00:52:55,000
You need hash function, you need hash table for your hash table.

459
00:52:55,000 --> 00:53:04,000
Like I said, in CRC32, it's going to be really fast, but it may have a higher collision rate.

460
00:53:04,000 --> 00:53:06,000
Again, it's hard to decide.

461
00:53:06,000 --> 00:53:08,000
And you can be able to pick one.

462
00:53:08,000 --> 00:53:12,000
Or they'll pick a hash function for inters and separate hash function for strings.

463
00:53:13,000 --> 00:53:18,000
So now with our hash function, we're talking about what the hashing scheme can be.

464
00:53:18,000 --> 00:53:22,000
So some of these, I think, we covered the intro class, but I'm going to go over them quickly again.

465
00:53:22,000 --> 00:53:28,000
And I think the two ones I want to focus on are Robin Hood hashing and hopscout hashing.

466
00:53:28,000 --> 00:53:38,000
Because I think the paper talks about linear probing, but there's a previous paper from the same Germans from the paper you guys read that says Robin Hood hashing usually works out.

467
00:53:39,000 --> 00:53:43,000
And then the umber guys are going to use in their paper.

468
00:53:43,000 --> 00:53:49,000
But then, I think it's still up for debate whether which one is actually better.

469
00:53:49,000 --> 00:53:53,000
Because people try Robin Hood hashing in terms of actually doesn't always work as well.

470
00:53:53,000 --> 00:53:58,000
So chain hashing, this is what most people think of when they have a hash table or a hash scheme.

471
00:53:58,000 --> 00:54:05,000
And this is what you get, I think, for STL, the center type of libraries, unordered map is this, the Java hash map is this.

472
00:54:05,000 --> 00:54:13,000
And the idea is that you're going to maintain a list of buckets and these buckets are going to pointers to a link list.

473
00:54:13,000 --> 00:54:19,000
And then whenever I have a collision, I follow along my chain to find the next free slot to store something.

474
00:54:19,000 --> 00:54:27,000
And the length of each chain within a given bucket can vary depending on the number entries in it.

475
00:54:27,000 --> 00:54:33,000
So it really simple looks like this. Say I have my bucket pointers and here's my buckets.

476
00:54:33,000 --> 00:54:43,000
So I want to put key A in, I hash it, takes me to one of these bucket pointers and then I jump to the first location of my chain for this bucket.

477
00:54:43,000 --> 00:54:46,000
And I find a first free slot in a store A.

478
00:54:46,000 --> 00:54:51,000
No surprise there. Same thing B. The first bucket is empty, stores it right away.

479
00:54:51,000 --> 00:54:54,000
In case you see, now I have a collision because I want to go where A is.

480
00:54:54,000 --> 00:55:02,000
But I just do a screenshot scan within my bucket until I find the first free slot in a store.

481
00:55:02,000 --> 00:55:09,000
In case D, D was going to this bucket as well. But now since I'm only showing two entries per bucket, it's obviously small.

482
00:55:09,000 --> 00:55:16,000
But now since this thing is full, I have to extend my chain out for that like that.

483
00:55:16,000 --> 00:55:21,000
This should all be pretty understandable.

484
00:55:21,000 --> 00:55:29,000
So the one trick that the hyper guys do, which I don't think is discussed in this paper, but they mentioned it in the morsels paper.

485
00:55:29,000 --> 00:55:33,000
You see the morsels paper or the, the, the compilation paper.

486
00:55:33,000 --> 00:55:44,000
So they recognize that this array of pointers here since in x86, even though when you say give me a pointer, it's 64 bits.

487
00:55:44,000 --> 00:55:48,000
In memory, the harbor actually only looks at 48 bits.

488
00:55:48,000 --> 00:55:54,000
And so they say, hey, let's go take those extra 16 bits that aren't being used by the hardware. Let's stash something in there.

489
00:55:54,000 --> 00:56:05,000
So they put a 16 bit bloom filter inside the, in the pointer. The harbor ignores it, but they know to interpret that the first 16 bits as a, as a bloom filter.

490
00:56:05,000 --> 00:56:14,000
So that they'll use that to check to see whether the key even look for could even exist in, in my hash table or in my chain.

491
00:56:14,000 --> 00:56:22,000
And it's clever because it's like this thing's good. I got to read this thing anyway. It's going to be in, you know, L1 cache, really else in my last level cache.

492
00:56:22,000 --> 00:56:28,000
So let me go put as much information I can to potentially avoid scanning along a chain and find nothing.

493
00:56:28,000 --> 00:56:38,000
Right. So now when I do a look up get G, I check the bloom filter first. If it's not, it's not in there that I know I don't need to follow a chain.

494
00:56:38,000 --> 00:56:47,000
So the next approach is do open address and hashing. This one is probably more common than the chain hashing especially for joins.

495
00:56:47,000 --> 00:56:53,000
The idea here is that I just have this giant slot table slots.

496
00:56:53,000 --> 00:57:02,000
And when I want to do a look up, I hash something, I might buy the number slots I have. I land in some location in this giant table, giant array.

497
00:57:02,000 --> 00:57:13,000
And if the slot is empty, then I put my thing in there. Or if the slot is full, then I keep scanning sequentially to find a free slot and then I can put my entry in there.

498
00:57:13,000 --> 00:57:20,000
Or if I end up wrapping around, come back to where I started that, then I know I'm an infinite loop and I have to stop and resize.

499
00:57:21,000 --> 00:57:33,000
And then when you want to do a deletion or sorry, when you do a look up, you jump to that location, look to see whether the thing you want is there and keep scanning and maybe you find it.

500
00:57:33,000 --> 00:57:38,000
So that approach will be linear scanning and this is what most people think of when you think of open address hash table.

501
00:57:38,000 --> 00:57:50,000
There is variations called quadratic probing. The basic idea is that instead of scanning sequentially, you just use a quadratic equation to jump to exponentially larger ops.

502
00:57:50,000 --> 00:57:52,000
Why would you ever want to do quadratic?

503
00:57:52,000 --> 00:58:01,000
This question is why would you do a quadratic because they avoid clustering. Because they have different keys, won't always be jumping to the same bunch of locations.

504
00:58:02,000 --> 00:58:12,000
But the downside is now you're doing more random access and there's no free launch to pros and cons about these versions.

505
00:58:12,000 --> 00:58:16,000
Those systems are going to do linear scanning.

506
00:58:17,000 --> 00:58:25,000
This is just a rehashing of the intro class. Same thing I take. I want to put A in. I hash it. I come to this first slot. It's empty. I put my thing in there.

507
00:58:25,000 --> 00:58:34,000
Saining would be with C since it hash of this slot but A's in there. So I just scan down to the next one and I find a free slot and I put it in there.

508
00:58:35,000 --> 00:58:44,000
D, same thing goes here. E starts where it wants to go to A's. So I keep scanning down to find the free slot. Then I can put E and F goes here at the bottom.

509
00:58:44,000 --> 00:58:54,000
In this case here, if I say I had to put something that hashes to, I put it in one more key and this gets full. Now I try to put another one in.

510
00:58:54,000 --> 00:59:01,000
Then it's going to loop around and I have to keep track where I started to avoid breaking out.

511
00:59:01,000 --> 00:59:17,000
The obviously downside of linear probing is that, or an open dressing scheme, is that I'm potentially getting very far away from my hash after because I'm going to put a key in a pretty far away from where it actually wants to be.

512
00:59:18,000 --> 00:59:34,000
Now when I go to a lookup, I may have to scan a bunch of entries that aren't the thing I want. In the worst case scenario, I can almost wrap around the very beginning to find what I'm looking for.

513
00:59:34,000 --> 00:59:42,000
Now the way to avoid this infinite loop is you just try to double the hash, it would be double the size of the number of keys you're going to put into.

514
00:59:42,000 --> 00:59:53,000
Again, we know the number of keys we're going to put into it because we know the number of tools are coming up and we could allocate things ahead of time. If we get it wrong, then we have to resize.

515
00:59:53,000 --> 01:00:02,000
A good approximation is to double the number of keys I expect to have. And on the resize, you just double it again.

516
01:00:02,000 --> 01:00:11,000
So there's this observation in the 80s that recognizes this obvious problem with the linear probing scheme or open dressing.

517
01:00:11,000 --> 01:00:21,000
And they came up with an idea that tried to limit the number of lookups I have to do when I'm starting to read the hash table.

518
01:00:22,000 --> 01:00:28,000
In a hash join, we have these clued clearly two phases where I'm going to build it, I'm going to then probe it.

519
01:00:28,000 --> 01:00:34,000
And I want the smaller relation to be always on the build side because I want my hash to be as small as possible.

520
01:00:34,000 --> 01:00:50,000
And so the idea is that what if I spend a little more extra instructions on the build side to reorganize my hash table so that when I do my probes, the length of the distance I have to go look potentially to find the thing I'm looking for is potentially reduced.

521
01:00:51,000 --> 01:01:01,000
So the two approaches to do this are the Robinhood hashing and the hopscout hashing. And the Robinhood hashing came out in the 80s, hopscout hashing came out in the 2000s.

522
01:01:01,000 --> 01:01:17,000
The idea here is that rather than when I just like an open dressing hash table, but as I'm trying to find my slot instead of just trying to say what's the first free one go put my thing in there, I actually look at the entries that are in the place where I want to be.

523
01:01:17,000 --> 01:01:37,000
And I can decide whether to go steal their slot. And the goal is that the idea is that you want to minimize the average distance that any key is from where it should be by swapping keys that are farther away from where they want to be versus keys that are closer.

524
01:01:38,000 --> 01:01:43,000
It's like stealing from the rich to give to the poor and sending Robinhood hashing.

525
01:01:43,000 --> 01:01:56,000
So the more recent research from the the the Starland Germans for paper you guys read, they talk about how Robinhood hashing is actually the better approach better than linear hashing.

526
01:01:56,000 --> 01:02:06,000
The hyper guys are the umber guys in their latest paper in 2021, they also use Robinhood hashing citing the Sarland paper about why you want to do this.

527
01:02:07,000 --> 01:02:13,000
But every so often you see various database companies try out Robinhood hashing and it actually doesn't pan out in the real world.

528
01:02:13,000 --> 01:02:17,000
So I'm not trying to pick on these guys, Quest DB, but this is the most recent one that I found.

529
01:02:17,000 --> 01:02:28,000
So they had a blog article came out in November last year that says, hey look, we swapped out our hash map with the new, uh, if you join this new fast map implementation, they're in Java, but we can ignore that for now.

530
01:02:29,000 --> 01:02:41,000
And at the very bottom of this they're all they're all happy have these nice hash table. It's better than the chain hash table in in in Java because now they're using open addressing linear probing.

531
01:02:41,000 --> 01:02:49,000
But then there's this little blubber of the bottom here that says someone on reddit told him, hey, you should try Robinhood hashing right and he talks about, oh yeah, the early numbers actually look pretty good.

532
01:02:49,000 --> 01:02:51,000
We think we want to do this right.

533
01:02:51,000 --> 01:03:01,000
But then if you follow the pull request link here from November, you go to the very bottom where now in January says it turns out Robinhood hashing made things worse.

534
01:03:01,000 --> 01:03:05,000
So they end up turning it off reversing right.

535
01:03:05,000 --> 01:03:12,000
A few years ago we had the influx DVD will show up and they were all boasting how they were using Robert hashing gave an innocent was in the audience.

536
01:03:12,000 --> 01:03:16,000
He asked why you're doing this and they said, oh, we saw someone in hack or news said to use it so they used it.

537
01:03:16,000 --> 01:03:28,000
But then it turns out I think anything slower too right. So to me, I think this is still a question. I don't know what's the best one to use at this point, but it's good to understand what Robinhood and hopscotch actually do.

538
01:03:28,000 --> 01:03:38,000
Okay, so getting the basic idea is that it's just like linear probing when I want to store something in I'm going to store it, you know, the first location that's free in my slot rig.

539
01:03:38,000 --> 01:03:44,000
But then in addition to storing the key or the hash key, we'll talk about in a second and the payload of the value.

540
01:03:44,000 --> 01:03:48,000
I'm also going to store the number of jumps I am from where I should have been when I hash directly into it.

541
01:03:48,000 --> 01:03:56,000
So in this case here, when we hashed input of in, there wasn't any else in the slot so it's position or it's distance is zero.

542
01:03:56,000 --> 01:04:03,000
So now when I be same thing distance is zero. So I'm going to put C in. C wants to go over A as so can't.

543
01:04:03,000 --> 01:04:10,000
But now I compare from where C once the distance C is from where it wants to go from where A is from it where it should be.

544
01:04:10,000 --> 01:04:16,000
In this case here, they're both zero so C is not going to steal a slot and it goes down the next one.

545
01:04:16,000 --> 01:04:21,000
But now that I store that it's one hop away from where it wants to be.

546
01:04:21,000 --> 01:04:29,000
So now when D wants to go or C is at the very beginning, D's, you know, the number of hops that is from where it wants to be is zero.

547
01:04:29,000 --> 01:04:39,000
And that's less than D, or sorry C, which is one. So D cannot steal from C. So we leave C alone and then D's is going to be right here and then it's hop is one.

548
01:04:39,000 --> 01:04:46,000
Now I want to start E. Same thing at the very beginning. A is zero hops away. E is zero hops away at this step.

549
01:04:46,000 --> 01:04:52,000
I'll leave my loan. Now we get down here. C is one hop away. E is one hop away. Leave that one alone.

550
01:04:52,000 --> 01:04:59,000
But now when you get here, D is one hop away because one of the go where C was. But now E is two hops away because one of the go over A is.

551
01:04:59,000 --> 01:05:07,000
So in this case here, E is allowed to steal from D. Shoot them in the head, take it slot and then D pops out and we got to put it back down into the next slot.

552
01:05:07,000 --> 01:05:13,000
And we would run that same protocol. If there was something else here, we would decide whether we want to steal that slot or not.

553
01:05:13,000 --> 01:05:19,000
All right. Then F again, same thing goes like this. Yes.

554
01:05:19,000 --> 01:05:24,000
So instead of it can be really slow. His question is can answers be really really slow. Yes.

555
01:05:24,000 --> 01:05:34,000
Right. Because what are we doing? We're copying. For example, we're doing branch, branch, branch, mis-predictions. Right. Because we got to do if then else is to figure out whether we want to steal or not.

556
01:05:34,000 --> 01:05:49,000
So but again, now when I do lookups, if I'm looking for E for example, well it could have been here but I'm going to get here. So I'm going to be one for your hop doing the lookup.

557
01:05:49,000 --> 01:05:59,000
So again, is the tradeoff always the right thing to do to pay higher costs on the right side to make the read side go faster or the build side versus the pro side.

558
01:05:59,000 --> 01:06:12,000
Same thing with partitioning. A bunch of actual work I'm doing before I even do the other two steps in my join. But ideally I'm setting things up to make things faster when I run later. Yes.

559
01:06:12,000 --> 01:06:25,000
So the question is do you still look for revives? Otherwise you get a false negative. You can't.

560
01:06:25,000 --> 01:06:40,000
So if I look if I'm looking for F, maybe I'm going back say I look for what is it? E one of the be here, right?

561
01:06:40,000 --> 01:06:55,000
Say I'm looking for D. So D would start here. So I say it starts here. I'm going to scan through to I find D or I find empty slot. I find empty slot that I know doesn't exist. So I don't have a false negative.

562
01:06:55,000 --> 01:07:03,000
But I would have to do that with linear probing anyway without without Robin Hatch. Yes.

563
01:07:03,000 --> 01:07:15,000
So total jump. The question to what's our. I mean the total.

564
01:07:15,000 --> 01:07:24,000
Oh, the. Sorry this thing. The summation across all entry should be the same.

565
01:07:24,000 --> 01:07:45,000
As linear probing. I think yes. He's pointing out and he's correct that like even though I'm rebalancing things so that I try to minimize the jumps.

566
01:08:15,000 --> 01:08:24,000
Would you be able to prevent long scans?

567
01:08:24,000 --> 01:08:33,000
This question is would you be able to prevent long scans for data that does this by putting a blueprint in front of this? Yeah, we'll see this in the second joins. Yes.

568
01:08:33,000 --> 01:08:52,000
We hope the lymphatic was everywhere. All right. So again, this one is. This one can swap forever, right? Like doesn't try to bound the how far thing actually going to be the modern variation called hot Scott hashing is an extension of this.

569
01:08:52,000 --> 01:09:00,000
But the idea is that we can still move things around like in Robin Hatch. But we only move things around if it can be in the same neighborhood.

570
01:09:00,000 --> 01:09:06,000
There's a way to sort of artificially restrict where how far we can move something away from where it should have been. Right.

571
01:09:06,000 --> 01:09:20,000
And if we can't find something in our neighborhood that we know it doesn't exist. Right. Likewise, if we try to reshuffle things and there isn't room in the neighborhood where something needs to go, then we say our hash table was too big and we have to stop it or do it and resize it.

572
01:09:20,000 --> 01:09:36,000
So the goal is again, have the cost of accessing a neighborhood be the same as finding a key because we size our neighborhoods to be then cash lines and things are nicely aligned. Then it doesn't matter whether we're looking for a key in the last position in the neighborhood or the first key position in the neighborhood.

573
01:09:36,000 --> 01:09:46,000
Since we brought everything in our CPU cash is anyway, it's the same. So for this one for simplicity where say that our neighborhood size is three.

574
01:09:46,000 --> 01:09:53,000
So you would save for the first three three slots that's the neighborhood one next three slots neighbor two and so forth and they're overlapping.

575
01:09:53,000 --> 01:10:01,000
In the case of last neighborhood six again, that's the last two positions and then it wraps around we have a seven would be here as well. Right.

576
01:10:02,000 --> 01:10:12,000
So now when I want to do a look up or sort of insert a a has to this position here so that goes in neighborhood three. So we can say a can go anywhere inside neighborhood three.

577
01:10:12,000 --> 01:10:23,000
So because the table is empty, we'll put it in the first position. Same thing for b. It wants to go over neighborhood one is the that neighborhood is empty. It goes in the first position.

578
01:10:23,000 --> 01:10:35,000
So now we take C and it wants to go in this neighborhood and it gets just like linear probing where the first position is full. I scan down to I find the next free slot and that's why I store that. That's fine.

579
01:10:35,000 --> 01:10:43,000
So I want to sort D same thing D wants to go over C is that's that's the number four. So in this case here to scan through and goes here.

580
01:10:44,000 --> 01:10:52,000
So now we put Ian so he wants to go in the same neighborhood where a is in so when we scan through we'd say okay this neighborhood is full.

581
01:10:52,000 --> 01:11:01,000
So what we got to do is figure out what we can take out of the neighborhood where it wants to be put it into another neighborhood and that way we can put D into.

582
01:11:01,000 --> 01:11:04,000
I was going to put E into into neighbor three.

583
01:11:04,000 --> 01:11:11,000
So you'd have to basically go look and keep track of okay for AC and D which ones are not in neighborhood three.

584
01:11:11,000 --> 01:11:20,000
So A and C both hashed this location certain neighborhood three but A and D both hashed this position so they're in a board three.

585
01:11:20,000 --> 01:11:26,000
But C hashed this position so it's in a board four. So there's in neighborhood four there's a free slot so I'm allowed to move.

586
01:11:27,000 --> 01:11:37,000
Is that right? No, yes, there's to be D. It D is a lot of moved down by one and then now I can go ahead and put E in this neighborhood here.

587
01:11:37,000 --> 01:11:41,000
This seems really complicated.

588
01:11:41,000 --> 01:11:46,000
It seems very complicated to see the rob a hood and linear probing. Yes, absolutely yes.

589
01:11:46,000 --> 01:11:50,000
But it's a longer than much longer to actually put data.

590
01:11:50,000 --> 01:11:52,000
Absolutely yes.

591
01:11:52,000 --> 01:11:57,000
The real thing is that you're building the actual road always paying the cost of building would be fast.

592
01:11:57,000 --> 01:12:00,000
But it's only like limited by a certain amount.

593
01:12:00,000 --> 01:12:06,000
Simplicity is better in this case here on a modern CPU. Nobody does this.

594
01:12:06,000 --> 01:12:08,000
And I'll show one graph at the end.

595
01:12:08,000 --> 01:12:09,000
That's right.

596
01:12:09,000 --> 01:12:13,000
I think rob a hood beats this in the click house.

597
01:12:13,000 --> 01:12:16,000
Measurements yes.

598
01:12:16,000 --> 01:12:19,000
His question is what happens if you can't be reading a neighborhood you have to say this.

599
01:12:19,000 --> 01:12:21,000
And my hash table is full.

600
01:12:21,000 --> 01:12:31,000
Even though obviously you have free slots and later probing that would not be an issue for this scheme it is, you stop what you're doing, resize and double the size of the hash table and repopulate it.

601
01:12:31,000 --> 01:12:40,000
Then you get to questions like, okay, well, like, you know, if I'm doing late materialization, then repopulating the hash table may be in that big of a deal.

602
01:12:40,000 --> 01:12:43,000
But if I had the full tool, I was going to put back in the hash table and that's expensive.

603
01:12:43,000 --> 01:12:51,000
In case of QuestDB, they store a separate heap of the actual data, which is the values are just offsets, which we haven't covered with this actually is.

604
01:12:51,000 --> 01:12:55,000
And so that way you can resize it without having to copy any of the tuples themselves.

605
01:12:55,000 --> 01:12:58,000
There's pros and cons.

606
01:12:58,000 --> 01:13:00,000
The worst version of the sendable hashing.

607
01:13:00,000 --> 01:13:02,000
The same as this, the worst version of sendable hashing.

608
01:13:02,000 --> 01:13:04,000
This.

609
01:13:04,000 --> 01:13:07,000
This would be that fast and sendable hashing.

610
01:13:07,000 --> 01:13:17,000
Because like, the idea is like, okay, I know I'm going to have a million tuples, I'm going to pick a hash table that can hold two million slots.

611
01:13:17,000 --> 01:13:21,000
And hopefully I don't have collisions there.

612
01:13:21,000 --> 01:13:25,000
All right, super short in time.

613
01:13:25,000 --> 01:13:28,000
Then they could bring up a cuckoo hashing, sometimes called double hashing.

614
01:13:28,000 --> 01:13:34,000
Basically the idea is that instead of one hash function, we're going to multiple hash functions to figure out where things go.

615
01:13:34,000 --> 01:13:36,000
Right, so I want to put a in.

616
01:13:36,000 --> 01:13:45,000
So I'll have two different hash functions. Basically it's the same hash algorithm like murmur or xx hash, which is with different seeds to make sure that it has a different distribution of values.

617
01:13:45,000 --> 01:13:50,000
So I'm going to hash both of them and find them for the first free slot.

618
01:13:50,000 --> 01:13:52,000
In this case here, the both empty because the table's empty.

619
01:13:52,000 --> 01:13:54,000
So I'll flip a coin and maybe pick the first ones.

620
01:13:54,000 --> 01:13:56,000
The first ones I put a there.

621
01:13:56,000 --> 01:14:01,000
Next he comes along, b, it hashes to these two free slots, two slots here.

622
01:14:01,000 --> 01:14:03,000
One of them is occupied, one of them is empty.

623
01:14:03,000 --> 01:14:06,000
I always choose the empty one and I put b in there.

624
01:14:06,000 --> 01:14:08,000
C comes along.

625
01:14:08,000 --> 01:14:11,000
Now c was the hash where b went and the hash where a went.

626
01:14:11,000 --> 01:14:13,000
So both are occupied.

627
01:14:13,000 --> 01:14:17,000
I got to pick one to kill them and take their slot.

628
01:14:17,000 --> 01:14:22,000
It's like Robin Hood hashing, but instead of moving it down, I'm going to literally pull it out.

629
01:14:22,000 --> 01:14:25,000
So say we're going to go to kill the first guy b.

630
01:14:25,000 --> 01:14:27,000
So c takes its slot.

631
01:14:27,000 --> 01:14:28,000
b comes out.

632
01:14:28,000 --> 01:14:29,000
Now we've got to hash it again.

633
01:14:29,000 --> 01:14:32,000
So we know that when we put it in the first time, we use the second hash function.

634
01:14:32,000 --> 01:14:35,000
When we come back the next time, we'll use the first hash function.

635
01:14:35,000 --> 01:14:39,000
But now when we go to insert it, it goes where a is.

636
01:14:39,000 --> 01:14:41,000
So we've got to go take it.

637
01:14:41,000 --> 01:14:42,000
It's slot.

638
01:14:42,000 --> 01:14:43,000
A comes out.

639
01:14:43,000 --> 01:14:47,000
We hash it again with the second hash function and now we find a free entry.

640
01:14:47,000 --> 01:14:49,000
Yes.

641
01:14:49,000 --> 01:14:51,000
The lookups are bounded in this two.

642
01:14:51,000 --> 01:14:53,000
This question is, look up the bounded by two.

643
01:14:53,000 --> 01:14:54,000
Yes.

644
01:14:54,000 --> 01:14:57,000
So you have o1 lookups by doing this ahead of time.

645
01:14:57,000 --> 01:14:58,000
Yes.

646
01:14:58,000 --> 01:15:01,000
You did like, oh, these look patches.

647
01:15:01,000 --> 01:15:07,000
These questions, just like a linear probing and all that other hash games, I can get stuck in an infant loop where

648
01:15:07,000 --> 01:15:10,000
saved something was here and I pull that out and hashed it back to something else.

649
01:15:10,000 --> 01:15:16,000
And I have to keep track of where I went into to avoid infant loops.

650
01:15:16,000 --> 01:15:21,000
So now when I do a lookup to his point, it's always going to be o1 because I just hash it twice.

651
01:15:21,000 --> 01:15:26,000
And then I jump to two locations and I can figure out which one I want.

652
01:15:26,000 --> 01:15:30,000
The cc hashing is using a couple of systems and DB2 blue uses this.

653
01:15:30,000 --> 01:15:33,000
And I think one or two others I can't remember.

654
01:15:33,000 --> 01:15:37,000
But I remember looking this up before and other systems are using this.

655
01:15:37,000 --> 01:15:38,000
Yes.

656
01:15:38,000 --> 01:15:41,000
A lot of these seem to be optimized for read only work loads.

657
01:15:41,000 --> 01:15:44,000
Like they they sacrifice themselves a lot.

658
01:15:44,000 --> 01:15:50,000
Is that intentional or would they design something else rather than the databases?

659
01:15:50,000 --> 01:15:55,000
His statement is these seems like these are made for read only workloads.

660
01:15:55,000 --> 01:16:01,000
They seem to be ignoring the hash build phase and the cost of it.

661
01:16:01,000 --> 01:16:04,000
Right, but like his statement is like you're ignoring the hash build phase.

662
01:16:04,000 --> 01:16:09,000
Because most of the data structures, they get almost like you're using this as a hash index.

663
01:16:09,000 --> 01:16:11,000
It's right once read many.

664
01:16:11,000 --> 01:16:14,000
So yeah, the answer is more expensive but I'm going to make my reads go faster.

665
01:16:14,000 --> 01:16:16,000
That's a for such for databases.

666
01:16:16,000 --> 01:16:18,000
That's a fair trade off.

667
01:16:18,000 --> 01:16:22,000
All right, we're way way way way behind on time.

668
01:16:22,000 --> 01:16:33,000
Hey, you know, we'll have to pick up what we left off and come back on Monday, fortunately.

669
01:16:33,000 --> 01:16:35,000
I was, could people have the wrong?

670
01:16:35,000 --> 01:16:37,000
Should we just plow through it?

671
01:16:37,000 --> 01:16:39,000
All right, plow through it.

672
01:16:39,000 --> 01:16:40,000
Okay.

673
01:16:40,000 --> 01:16:42,000
All right, cool.

674
01:16:42,000 --> 01:16:43,000
If you got to go, go, go.

675
01:16:43,000 --> 01:16:44,000
All right.

676
01:16:44,000 --> 01:16:45,000
So what's actually we're putting a hash table.

677
01:16:45,000 --> 01:16:47,000
We're kind of unclear and the paper doesn't really say.

678
01:16:47,000 --> 01:16:48,000
Right.

679
01:16:48,000 --> 01:16:52,000
So the first thing we got to figure out is are we actually storing the tuples themselves or

680
01:16:52,000 --> 01:16:54,000
starting pointers of offsets to tuples.

681
01:16:54,000 --> 01:17:01,000
In some cases, in the case of QuestDB, that in their system, they store the tuples actually in a separate heap and you just have offsets into them.

682
01:17:01,000 --> 01:17:05,000
So now when I resize, I'm just moving around those offsets and not the actual data itself.

683
01:17:05,000 --> 01:17:06,000
Right.

684
01:17:06,000 --> 01:17:13,000
Or if I have these buffers coming in, if I maintain those input buffers, then I just have offsets into those and I don't have to store the actual data.

685
01:17:13,000 --> 01:17:23,000
But now that means when I do certain lookups or I match the tuples together that are being joined, I got to then do, you know, dereference that pointer or follow along to figure out what the actual data is.

686
01:17:23,000 --> 01:17:30,000
If you have variable link data, then you can't put that in a hash table with open addressing because every slot has to be the same length.

687
01:17:30,000 --> 01:17:36,000
Next question is, are we actually storing what actually storing as the sort of the key portion of the hash table?

688
01:17:36,000 --> 01:17:37,000
Right.

689
01:17:37,000 --> 01:17:46,000
Because again, because there will be collisions, I actually need to compare the actual join keys from the input tuple versus what's actually in the hash table.

690
01:17:46,000 --> 01:17:55,000
So I could just store the original tuple and that could be expensive, but also we'd, because it's a variable length and you can't, you know, that's going to screw up your slots.

691
01:17:55,000 --> 01:18:02,000
So in some time, if you actually want to store the hash, you know, the hash you computed when you inserted it along with the original join keys,

692
01:18:02,000 --> 01:18:08,000
so that you can do a quick comparison just based on the hash keys rather than having to do like a, you know, expensive string comparison.

693
01:18:08,000 --> 01:18:12,000
So different systems do different things and this is a classic compute for storage.

694
01:18:12,000 --> 01:18:24,000
If I only store the join keys and not the hash, then my data structure is going to be smaller, but now when I do comparisons, it'll be more expensive potentially because that's the basic, you know, look at raw keys.

695
01:18:24,000 --> 01:18:33,000
All right, the probe side, there really isn't anything fancy we can do because it literally just ripping through the input feature, an input vector and probing hash table I'm looking for matches.

696
01:18:33,000 --> 01:18:39,000
But the one trick we can do is what he asked about is adding bloom filters.

697
01:18:39,000 --> 01:18:47,000
And so this is the idea is that when we're building the hash table, in addition to populating the hash table, we'll also populate a bloom filter.

698
01:18:47,000 --> 01:18:48,000
Right.

699
01:18:48,000 --> 01:18:54,000
And so I built the hash table, but I also built a bloom filter and then I passed that over to on the probe side.

700
01:18:54,000 --> 01:19:05,000
So now when I do my probe, I first check the bloom filter and there's no match, then I know it's not going to be the hash table, so I don't bother looking the hash table because again, bloom filters can have false positive, but not false negatives.

701
01:19:05,000 --> 01:19:12,000
So I'll know that something could not possibly exist and it's way cheaper and way faster to look at the bloom filter rather than probing the hash table.

702
01:19:13,000 --> 01:19:23,000
So this is sometimes called sideways information passing. I think the technique, there's a vectorized paper that talks about it, there's a vertical paper from 10 years ago talks about it.

703
01:19:23,000 --> 01:19:26,000
A bunch of systems do this technique, the hyper guys do this, the umbra does it as well.

704
01:19:26,000 --> 01:19:35,000
The umbra again, they will have this bloom filter for this, but also have a bloom filter within that as well, to see whether you need to fall along the chain.

705
01:19:36,000 --> 01:19:46,000
So quick benchmarks, so we're going to look at the paper you guys read and read the, and then some paper from the hash table that the clickouts guys use for strings.

706
01:19:46,000 --> 01:19:55,000
Again, I'm going through this very, very fast, but it's basically going to have the no partitioning basic scheme, but then it's going to have the different radix partitioning stuff we talked about.

707
01:19:56,000 --> 01:20:03,000
But how can size hash table for IBM, IBM, D.B.2 blue, I think it's like a packed array with like a bloom filter in front of it. We can ignore that.

708
01:20:03,000 --> 01:20:23,000
No other system, no system other than D.B.2 blue uses it. So we're going to have sort of like the vanilla limitations that based on what's in the, I think the open source versions of these algorithms and the, as it described in the papers, and then they'll have the, you know, their optimized versions that do bunch of the techniques that we talked about.

709
01:20:23,000 --> 01:20:31,000
So here's all the different variations of these. And over here again, this is that sort merge that I talked about that came from the Intel Oracle paper.

710
01:20:31,000 --> 01:20:38,000
And so the region here, which you can't really see this region over here, it's going to be all the optimized versions. And then these are the symbols that they're using.

711
01:20:38,000 --> 01:20:48,000
So they basically say that like if you read the partitioning for either a chain, chain hashing, linear probing or open addressing or a really basic array, like that's always going to be the fastest.

712
01:20:48,000 --> 01:20:56,000
If your data is nicely fit in array, you know, you can get a little faster as well. But if you do, don't do any of these ready partition, no specialization.

713
01:20:56,000 --> 01:21:04,000
Again, making sure you get all this correct for the actual hardware that you're running on is non trivial. This is actually going to be pretty good for most things, almost all things.

714
01:21:04,000 --> 01:21:08,000
And it requires less engineering overhead than all these other ones.

715
01:21:08,000 --> 01:21:10,000
What is the difference between linear and array?

716
01:21:10,000 --> 01:21:20,000
Arrays literally like, like, yeah, the HAT, yeah, it's like, yeah, the indices are the hash keys. Yes.

717
01:21:20,000 --> 01:21:30,000
Right? Okay. So then the next, the next breath they show is this thing here that says, okay, well, how much time in real query is actually being spent on that on the hash join?

718
01:21:30,000 --> 01:21:38,000
And for all these different approaches, you can see that it's basically 10% or less or 13% or less being spent just doing the hash join.

719
01:21:38,000 --> 01:21:47,000
And everything else is the rest of the query, like getting the data, reading the data in, doing any filtering, materializing the output, doing any other stuff up above in the query plan.

720
01:21:47,000 --> 01:21:55,000
This is TPCH query 19. So again, hash join is super important, but it's not the high pull in the tent. The most important thing which would be optimizing for.

721
01:21:55,000 --> 01:22:08,000
But so for this reason, that's why I think the, you know, this, this implementation here is going to be the no partition linear approach would be the easy implement and good enough for those things. Right?

722
01:22:08,000 --> 01:22:17,000
So let me show you one graph also to the wasn't the paper. This is from another paper from some random workshop or conference I'd ever heard of.

723
01:22:17,000 --> 01:22:29,000
But the, the click house guys basically took their implementation or they sent a PR. And this is what, this is the data structure that click house uses for doing hash joins or hashing for hash tables for strings.

724
01:22:29,000 --> 01:22:38,000
And the basic idea of how it works is that it's a single logical hash table, but underneath the covers, they have a four different variants of a hash table for the different strings, different sizes.

725
01:22:38,000 --> 01:22:46,000
So they'll have one that's like for strings that are 16 bytes, here's the hash table, here's one that's, you know, 17 to 32 and they have different oppositions for all of them.

726
01:22:46,000 --> 01:22:53,000
So what I like about this paper is they just ran everything on this one work, they're doing joins and group eyes and you can see how their thing is the best.

727
01:22:53,000 --> 01:23:03,000
So this art index is a, it's the red X try from from the Germans from hyper. You don't really not so easy for joins. It's a good that's a replacement B plus tree, but they did it for that.

728
01:23:03,000 --> 01:23:20,000
But you see the chain hash table, you see the hot scotch hashing, the cuckoo hashing, Robin Hood hashing, F14 tables from Facebook, the Swiss tables from the Swiss guy left. This from, it's from Google. Thank you. And then here, long behold, here's our vanilla off the shelf, linear prepping hash table.

729
01:23:20,000 --> 01:23:33,000
And their thing is squeaking out a little bit better, because again, this is for statistically for strings. Right? Yeah, there's, I'm talking about there's no clickouts paper. They do a lot of crazy stuff. They have like, like, I think so many different variations of hash tables.

730
01:23:33,000 --> 01:23:44,000
And, and they're much different when you do in joins, but they don't, the blog articles are pretty good. You know, sometimes going to the covers, understand what's actually going on. Clickouts are really fascinating systems.

731
01:23:44,000 --> 01:23:49,000
The, the guy told me that they have a video to be here, they're actually working on now. So hopefully we can cover that next year. Yes.

732
01:23:49,000 --> 01:24:12,000
Why is it being a better than simply open hood and Christmas and you know, guys, it's so simple. Right? That's the whole point. Like simple is better. Right? Okay. Again, everybody said this, partitioning is, is, is faster than no partitioning, but getting it right is challenging. Again, this is not just me, the Germans, another say the same thing. And most is not going to pick one implementation and not try to be clever about it. Yes, quickly.

733
01:24:12,000 --> 01:24:25,000
You know, last like, like, table, right? What would you think that people should adopt like a different, like, patching out of the space, they're going to be really extreme or not.

734
01:24:25,000 --> 01:24:40,000
His question is, like, given these results, it makes sense to have a specialized very well-length string hash table. Yes. If you can get random people to write it for you, sure. But if you're just starting off this, the inner program. Okay.

735
01:24:40,000 --> 01:24:52,000
All right. So again, next class, we'll do worst case, open a join. We'll spend a little bit time on, do profiling performance counters and then again, reminder, Wednesday next week will be the status update presentations for the projects. Okay.

736
01:25:10,000 --> 01:25:12,000
I take off the cap. My first on tap on the bottle.

737
01:25:12,000 --> 01:25:16,000
Throw my three in the freezer. So I can kill it. Careful with the bottle, baby.

738
01:25:16,000 --> 01:25:20,000
You can still feel it. Cause they know I can say the pain I've wet. You drink it down with the gauze.

739
01:25:20,000 --> 01:25:23,000
Little biceps. Take back the pack of drugs.

740
01:25:23,000 --> 01:25:26,000
You won't get your soul saved now. So drink it to the front.

741
01:25:26,000 --> 01:25:29,000
Billy Danes to Chili Teaser. Tell me the weak guys.

742
01:25:29,000 --> 01:25:31,000
Be a man to get a can of faith.

