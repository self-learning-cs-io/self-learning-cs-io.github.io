---
title: MIT6824 P15Lecture15OptimisticConcurrencyControlFaRM
---

1
00:00:00,000 --> 00:00:03,359
Good afternoon. Good evening, good night, wherever you are.

2
00:00:04,719 --> 00:00:06,400
So today I want to talk about foreign.

3
00:00:06,960 --> 00:00:09,040
This is a paper from 2015.

4
00:00:09,040 --> 00:00:12,640
So I want to do a little bit more of a recent paper and then zero research paper.

5
00:00:12,800 --> 00:00:17,679
And the topic of the research paper is trying to explore some ideas and

6
00:00:17,679 --> 00:00:20,400
technologies to get high performance transactions.

7
00:00:30,800 --> 00:00:38,320
And with high performance just to make sure that we're looking for high

8
00:00:38,320 --> 00:00:44,480
performance for them means they're getting 140 million transactions per second

9
00:00:45,359 --> 00:00:51,840
on this THP benchmark using 90 machines.

10
00:00:52,640 --> 00:01:01,440
And so, you know, whether there's numbers impressive or

11
00:01:01,440 --> 00:01:03,440
curfew depends on the numbers you know.

12
00:01:03,440 --> 00:01:06,960
It's so that anybody remembered how many transactions per second spend or could do.

13
00:01:16,159 --> 00:01:16,640
Anybody?

14
00:01:21,840 --> 00:01:31,120
So if we remember in the paper, there was sort of an intersection there, you know,

15
00:01:31,120 --> 00:01:35,280
it took about depending on what you did, you know, 10 to 100 milliseconds.

16
00:01:35,280 --> 00:01:41,600
So, you know, 10 to 100 transactions per second.

17
00:01:41,600 --> 00:01:47,120
And so the number of transactions that you know a farm you can do is in a completely

18
00:01:47,120 --> 00:01:48,400
different order of magnitude.

19
00:01:49,040 --> 00:01:51,120
And that partly is because they're completely different systems.

20
00:01:52,159 --> 00:01:58,000
Spender tries to do synchronous geo replication across the world and farm actually

21
00:01:58,000 --> 00:02:00,159
everything runs in a single data center.

22
00:02:04,560 --> 00:02:08,800
And so the applications that are being targeted by farm and

23
00:02:08,800 --> 00:02:09,920
Spender are quite different.

24
00:02:09,920 --> 00:02:13,120
You know, Spender is targeting applications that cannot tolerate

25
00:02:15,120 --> 00:02:18,240
the crash of the data center like you know, and the F1

26
00:02:19,200 --> 00:02:23,520
add serving database while Spender is much, well,

27
00:02:23,520 --> 00:02:28,879
Farmer is much more targeting sort of like you're, you were using my SGL or some other sort of,

28
00:02:29,920 --> 00:02:34,320
you know, database, you know, Alp in the database system and you want much more high performance

29
00:02:35,360 --> 00:02:36,320
transactions.

30
00:02:36,320 --> 00:02:40,640
And then, you know, it's a farm is sort of a possible design or a possible alternative.

31
00:02:41,840 --> 00:02:44,480
We do provide strict serializability.

32
00:02:48,480 --> 00:02:56,000
Which is similar to the external consistency that Spender offered.

33
00:02:56,960 --> 00:02:58,879
And so all goals again, high performance.

34
00:02:58,879 --> 00:03:02,560
So the number of ideas that they're going to achieving high performance,

35
00:03:03,280 --> 00:03:04,719
one, they shard.

36
00:03:05,600 --> 00:03:09,760
That's probably the main, you know, sort of standard technique that they use that

37
00:03:09,760 --> 00:03:11,120
is going to give us performance.

38
00:03:11,120 --> 00:03:16,640
For example, if you know, different records are on different charts and the transactions,

39
00:03:17,279 --> 00:03:20,959
touch the different charts, then these transactions are running parallel.

40
00:03:20,959 --> 00:03:27,359
And so, you have 90 machines, you know, you get 90 times, you know, the performance of the

41
00:03:27,359 --> 00:03:32,159
single machine. So sharding is a sort of the starting point. But then they go much for it.

42
00:03:33,439 --> 00:03:37,279
So they use non-volatile DRM.

43
00:03:39,439 --> 00:03:42,639
And this is to avoid, you know, the bottleneck over having to write to

44
00:03:42,639 --> 00:03:49,679
you stable storage devices. So in their design, you don't have to have to write in the critical path

45
00:03:49,679 --> 00:03:55,839
to an SSD or a disk. And so they avoid the whole cost of doing so.

46
00:03:55,839 --> 00:03:59,119
And which can be quite expensive. So for example, you think about your

47
00:04:01,039 --> 00:04:07,039
implementations or draft, you know, the store, you know, or make data persistent.

48
00:04:07,839 --> 00:04:11,839
And typically, you know, making something persistent on a stable storage device, you know,

49
00:04:11,840 --> 00:04:15,840
as in the order of, you know, hundreds of milliseconds, hundreds of,

50
00:04:17,280 --> 00:04:21,759
a few milliseconds, you know, to you, the tens of milliseconds, to 10 milliseconds, if you're actually

51
00:04:21,759 --> 00:04:26,399
using magnetic disks. But the SSD, you know, sort of, sort of a, sort of a millisecond.

52
00:04:28,000 --> 00:04:33,040
And so given the time frame they operate, you know, that we do too costly. So they use some people

53
00:04:33,040 --> 00:04:38,720
they call non-volatile DRM. This will talk about in a second. Then so that gets us rid of sort of

54
00:04:38,720 --> 00:04:46,320
the storage access cost. And so the next, you know, to a bottlenecks, the address is CPU,

55
00:04:46,320 --> 00:04:52,480
bottlenecks, and network bottlenecks. And for that, they use a technique called kernel bypass.

56
00:04:56,960 --> 00:05:02,320
It basically avoids the operating system for to talk to the network cart. And then they use

57
00:05:02,319 --> 00:05:13,360
network cart that have a special feature called RDMA. Now I wish the cart to read and write

58
00:05:13,360 --> 00:05:17,680
memory from a remote server without actually having to interrupt, you know, that remote server.

59
00:05:18,800 --> 00:05:24,480
And so this, I guess, is really low latency network access to a remote server.

60
00:05:25,839 --> 00:05:29,759
Or to remote memory. And this is where partly what the name farm comes from, you know, the arc

61
00:05:29,759 --> 00:05:33,039
and for remote and for memory. And the F is for fast.

62
00:05:35,839 --> 00:05:42,319
So those are the, sort of the technologies they use. And then to be able to really exploit these

63
00:05:42,319 --> 00:05:46,800
technologies, this drives them to a design that uses optimization concurrency control.

64
00:05:47,279 --> 00:05:51,279
Or OCC, the short version of this. So optimistic.

65
00:05:51,439 --> 00:06:01,919
And in contrast to many of the designs that we've seen so far where they use what we're typically

66
00:06:01,919 --> 00:06:06,959
called, pessimistic concurrency control schemes. And pessimistic controls schemes basically acquire

67
00:06:06,959 --> 00:06:16,079
locks on the objects that are being touched by the transaction. And so when they get to the commit

68
00:06:16,079 --> 00:06:23,120
time, they own all the locks or the relevant objects and just go in and commit. While we've

69
00:06:23,120 --> 00:06:28,319
optimistic concurrency control, you don't actually acquire locks particularly in farm, you don't

70
00:06:28,319 --> 00:06:36,399
require locks on the read transactions. And when you then go commit, you actually have to validate

71
00:06:36,399 --> 00:06:43,519
that you read the most recent objects. And if so, you can commit. And if you're not, you know,

72
00:06:43,519 --> 00:06:49,439
you have to abort and try again. And the reason they use optimistic concurrency control

73
00:06:49,439 --> 00:06:53,439
as we'll see in a second is really driven by the fact that they want to use our DNA.

74
00:06:56,799 --> 00:07:00,959
Okay, so then the final company I want to make on this is sort of an overview. This is really a research prototype.

75
00:07:05,199 --> 00:07:12,959
So it would like Spanner, which is a deployed system that's being active use.

76
00:07:14,079 --> 00:07:21,279
Farm is really a product of the research arm of Microsoft Research. Try to explore new ideas

77
00:07:21,279 --> 00:07:27,680
to see how to see if one can achieve higher or really higher performance transactions systems.

78
00:07:27,680 --> 00:07:33,919
And this is just a very active research. People would love to have the power of transactions.

79
00:07:34,799 --> 00:07:36,639
And but also the performance.

80
00:07:37,519 --> 00:07:43,360
Okay, so that's for the short introduction. Any questions so far?

81
00:07:49,919 --> 00:07:53,839
Okay, let's talk a little bit about the setup

82
00:07:59,039 --> 00:08:03,279
for farm. And so there's basically nine machines.

83
00:08:07,279 --> 00:08:15,120
I mean, you have these guys. They're connected by a high-speed data center network.

84
00:08:15,120 --> 00:08:22,000
And to see a particular one, I'm just going to draw that as a single line for us to switch networking

85
00:08:22,000 --> 00:08:31,279
internally. And in basically charge, you know, the data is sharded across these different machines.

86
00:08:31,839 --> 00:08:36,799
And the level of sharding happens at the something that's called the region.

87
00:08:37,839 --> 00:08:47,360
So region is two gigabyte. And I know those regions are sharded across the different networks.

88
00:08:48,159 --> 00:08:53,199
That is the different machines. The region is live in memory. So these are just DRM.

89
00:08:53,200 --> 00:09:04,960
And not in, for example, on the disk. And so basically the total data set of your database

90
00:09:04,960 --> 00:09:10,240
actually has to fit in the joint DRM, so the machine that they're using. So if your data set is

91
00:09:10,240 --> 00:09:13,600
larger than your current set of machines, you have to buy more machines that get more DRM,

92
00:09:13,600 --> 00:09:20,720
so they can actually fit. And again, the reason why they want to use DRM is because they want to know

93
00:09:20,720 --> 00:09:29,840
what we bottleneck by the performance of storage devices. And so of course, you know, the machine can fail.

94
00:09:29,840 --> 00:09:36,080
And if the machine fails, it loses a DRM. And so therefore they use replication. And so they

95
00:09:36,080 --> 00:09:42,560
replicate regions across multiple machines. One machine is the primary for a region. And that

96
00:09:42,560 --> 00:09:48,000
may say, a region might be replicated on another machine, which is in a backup. So they use primary

97
00:09:48,000 --> 00:09:57,759
backup for replication. And so this is region one. You know, region two, you know, the backup

98
00:09:57,759 --> 00:10:04,240
might be on the same machine as the primary for backup for region two. And here, you know, we have

99
00:10:04,240 --> 00:10:12,159
the primary region two. And so this deals, you know, so one machine has a kernel panic or some device

100
00:10:12,319 --> 00:10:19,679
goes that or just crashes for some other reason. Then there's a second machine that actually has

101
00:10:19,679 --> 00:10:24,959
a copy of the data and just could proceed from there. Of course, then we need some, you know,

102
00:10:24,959 --> 00:10:34,000
way of keeping track of the mapping from regions two, primary and backups. And so they use

103
00:10:34,000 --> 00:10:41,439
a configuration manager. The CM, let's sit on the site. And the CM cell, actually, is coupled,

104
00:10:41,440 --> 00:10:46,720
you know, with a system that we've seen before, it's a keeper. And it's really the

105
00:10:46,720 --> 00:10:51,200
a zookeeper and the configuration manager that kept track of the mapping.

106
00:10:55,040 --> 00:11:01,920
You know, for a region number to the primary and whatever the backups

107
00:11:02,719 --> 00:11:14,399
for every region. Okay. Now there's one, I see there's problem, of course, here. I talked about

108
00:11:14,399 --> 00:11:19,439
like well primary, we have primary backup replication. Great. So we have faults. Then I know one

109
00:11:19,439 --> 00:11:24,719
machine can fail. Another machine can take over. I guess, except the one sort of tricky case that

110
00:11:24,719 --> 00:11:29,919
this scheme can't handle so far is when there's a correlated failure, for example, there's a power

111
00:11:29,919 --> 00:11:35,439
failure of the data center and all machines, you know, go down. And to handle that case,

112
00:11:36,079 --> 00:11:43,759
basically the DRAM has sits on a DPS where every machine sits on an uninterruptible power supply.

113
00:11:44,559 --> 00:11:47,439
So you can draw these as like a big battery that sits on the site.

114
00:11:47,600 --> 00:12:02,080
And the battery basically, you know, provides enough energy that if there's a global power failure,

115
00:12:02,960 --> 00:12:07,840
the machine can keep running for a little time and in that little time, the machine can actually

116
00:12:07,840 --> 00:12:15,120
store, you know, the farm will like to store the data on SSDs or basically just flushes, you know,

117
00:12:15,120 --> 00:12:20,639
the content of its memory, all the regions, all the transactions state, all the

118
00:12:22,159 --> 00:12:27,120
logs for the transactions, and actually flushes is doing SSD. So like there's a complete power

119
00:12:27,120 --> 00:12:33,039
failure of the whole data center, the data center, or some point will come back up and they can load,

120
00:12:33,039 --> 00:12:39,600
you know, the memory contents of the machines from the SSD and you know, start basically running again.

121
00:12:40,560 --> 00:12:47,040
And so this is basically the only place where the SSDs are being used to deal with a

122
00:12:47,040 --> 00:12:55,040
coordinated failure of many machines in the data center. Any questions so far?

123
00:13:03,120 --> 00:13:08,879
Okay, let me say a little bit about the software. So in the regions, so we have a region here,

124
00:13:09,920 --> 00:13:17,600
in these regions, objects live. So you can just think about an array region as an array of bytes,

125
00:13:17,600 --> 00:13:25,200
kind of two gigabits of bytes, and in an array of bytes, objects live. And objects have a unique identifier,

126
00:13:29,200 --> 00:13:35,040
an OID, and the OID of an object is nothing else than its region number,

127
00:13:35,039 --> 00:13:41,599
its chiple, the region number, and then the address within the region.

128
00:13:49,279 --> 00:13:55,519
Sochiated with every object, there's a little bit of metadata for that particular object,

129
00:13:56,319 --> 00:14:01,679
and in particular for the object header contains a 64-bit number.

130
00:14:05,919 --> 00:14:10,559
And the number consists is basically a version number

131
00:14:13,519 --> 00:14:20,319
in the bottom 63, and then a lot bit, as we'll see in the top bit, in the higher one a bit.

132
00:14:21,360 --> 00:14:28,000
So every object has this 64-bit number, I'm just going to refer to it as a version number,

133
00:14:28,000 --> 00:14:32,079
and I will see a place of important role in the Optimics Frequency Control.

134
00:14:32,879 --> 00:14:42,000
So the way applications use this system, let me say a little bit about that,

135
00:14:42,000 --> 00:14:44,080
so the application programmer interface.

136
00:14:53,040 --> 00:14:55,759
So the API is your start-in-conjaction,

137
00:14:55,840 --> 00:15:01,600
then you read some objects,

138
00:15:05,439 --> 00:15:10,399
so there you read the call, and the read call takes an OID, there's an argument,

139
00:15:12,799 --> 00:15:17,360
the application then may have a certificate manipulate, change the field,

140
00:15:17,919 --> 00:15:24,159
in the object, or whatever, add one to it, and then at some point, write,

141
00:15:26,720 --> 00:15:28,080
the object,

142
00:15:31,600 --> 00:15:38,159
write the updated object itself, write call, and then commit it using TX and commit.

143
00:15:41,279 --> 00:15:46,559
And it might also be the case that the transaction needs to be borne,

144
00:15:46,559 --> 00:15:49,439
or because of the Optimics Frequency Control, in that case,

145
00:15:50,080 --> 00:15:52,879
the application will typically just retry the transaction.

146
00:15:53,360 --> 00:15:58,320
And so in the transaction, the way it's just here, the transaction here,

147
00:15:58,320 --> 00:16:00,879
there's only one object manipulated, but there's actually

148
00:16:00,879 --> 00:16:05,279
manipulated many, many objects, those objects could live in different regions,

149
00:16:06,799 --> 00:16:09,679
and so they have to have some plan, as we'll see,

150
00:16:09,679 --> 00:16:16,399
for running some two-phase commit-like protocol to do atomic operations across objects

151
00:16:16,399 --> 00:16:24,559
living in different regions. Any sort of questions about the API and setup?

152
00:16:30,240 --> 00:16:36,240
Sorry, the address, OID, it is the address in the machine itself.

153
00:16:36,879 --> 00:16:40,799
Yeah, it's just the offset within that region.

154
00:16:46,480 --> 00:16:47,519
Okay?

155
00:16:48,399 --> 00:16:50,319
This region can move, correct?

156
00:16:50,319 --> 00:16:54,639
If the re-replicated or the commut migration manager decides to be mapping,

157
00:16:55,439 --> 00:16:58,079
the actual address where the object lives might change,

158
00:16:58,799 --> 00:17:00,559
so this is a region number plus an offset.

159
00:17:02,000 --> 00:17:04,240
If I'm a little bit better here, I should set an offset.

160
00:17:10,000 --> 00:17:11,519
Sorry, I have another question.

161
00:17:11,519 --> 00:17:12,559
Yeah, kind of into that.

162
00:17:13,519 --> 00:17:18,159
What was the design choice or design thinking behind making a global address space?

163
00:17:20,319 --> 00:17:23,200
To have everything in DRAM.

164
00:17:26,559 --> 00:17:28,319
I'm not sure that has a clear question, but

165
00:17:32,079 --> 00:17:36,159
the whole goal of the MIS to actually run the transactions on an in-memory database.

166
00:17:36,159 --> 00:17:39,919
You know, this is a whole trend of sort of databases where all the data is always in memory,

167
00:17:39,920 --> 00:17:44,960
it's called in-memory databases, driven by the fact that DRAM is a reasonable cheap,

168
00:17:44,960 --> 00:17:50,640
and so that would allow you to basically run transactions without actually having to go to a persistent storage.

169
00:17:51,360 --> 00:17:56,960
They're basically jumping on that train in memory databases.

170
00:17:58,240 --> 00:18:01,920
I see, and that requires like a global address, that they all share.

171
00:18:02,880 --> 00:18:04,800
The address space is per machine, right?

172
00:18:06,480 --> 00:18:08,960
Every machine has its own address space from zero to whatever.

173
00:18:10,560 --> 00:18:18,720
And the objects are really the global numbers for global names.

174
00:18:22,080 --> 00:18:22,480
Thank you.

175
00:18:26,480 --> 00:18:28,080
Okay, good.

176
00:18:28,080 --> 00:18:29,920
So let's talk so far.

177
00:18:30,720 --> 00:18:33,600
I think we basically sort of established that, you know,

178
00:18:33,600 --> 00:18:36,560
they've gotten the stable storage devices out of the way.

179
00:18:37,279 --> 00:18:43,119
And so there's no bottleneck for reading writing storage devices because they're basically not

180
00:18:43,119 --> 00:18:47,839
using them other than in this one exceptional case when the power fails.

181
00:18:48,799 --> 00:18:52,639
So the next type of things they're focused on is trying to reduce

182
00:18:54,720 --> 00:18:59,359
CPU utilization or try to be very efficient with the CPU and be very efficient with the network.

183
00:19:00,079 --> 00:19:05,519
And there's two key ideas here that I'm talking about.

184
00:19:05,519 --> 00:19:06,319
Well, no.

185
00:19:06,319 --> 00:19:08,319
So the first one is kernel bypass.

186
00:19:20,799 --> 00:19:24,799
And the story of that is a reasonable simple.

187
00:19:24,799 --> 00:19:27,679
So we have farmed the drones as a usual level process.

188
00:19:30,000 --> 00:19:36,240
On top of windows, you know, the windows operating systems are the years of the operating system.

189
00:19:36,240 --> 00:19:38,319
So let's move a little bit on the site.

190
00:19:38,319 --> 00:19:39,679
So here's the operating system.

191
00:19:39,679 --> 00:19:44,319
And the operating system, of course, is all the features for scheduling processes,

192
00:19:44,319 --> 00:19:47,599
for a virtual memory, a standard operating system.

193
00:19:47,599 --> 00:19:52,000
And it also has drivers for hardware devices.

194
00:19:52,000 --> 00:19:56,399
And like one of the hardware devices is a network interface card.

195
00:20:00,319 --> 00:20:05,439
And typically, the OS has a driver inside of it that

196
00:20:08,159 --> 00:20:09,919
programs the network interface card.

197
00:20:09,919 --> 00:20:13,359
So the reach of writes and registers on the network interface card to basically send

198
00:20:13,359 --> 00:20:17,839
like send a packet or to reconfigure the network interface card, et cetera, et cetera.

199
00:20:19,519 --> 00:20:25,199
And so the typical way that applications interact with the network card is the

200
00:20:25,200 --> 00:20:30,720
make system calls to do the kernel and ask the kernel to basically send a packet.

201
00:20:32,400 --> 00:20:36,880
And it involves the operating system, it falls to the TCP stack, the network stack,

202
00:20:37,519 --> 00:20:39,519
and tends to be quite expensive.

203
00:20:41,039 --> 00:20:47,039
And so they want to avoid this overhead, they're going to enter in the kernel, running TCP,

204
00:20:47,039 --> 00:20:50,319
et cetera. And the way they do that is something that was a technique called

205
00:20:50,399 --> 00:20:56,399
kernel bypass and network is a sort of a collaboration between the network card and the operating

206
00:20:56,399 --> 00:21:00,960
system. And basically what it does is that the queues that the network interface has,

207
00:21:00,960 --> 00:21:04,639
so here's some sort of queues, for example, send queue and receive queue.

208
00:21:05,439 --> 00:21:10,960
Those queues are basically directly mapped into the address space of the application.

209
00:21:11,519 --> 00:21:17,200
So the application can ask, you know, operating system, please, you know, take some queues that

210
00:21:17,680 --> 00:21:22,240
make hast and map them into the address space of the application. And so you can just think about

211
00:21:22,240 --> 00:21:28,720
this as queue, this basically is directly accessible from the usual level application. So the usual

212
00:21:28,720 --> 00:21:34,240
level application, you know, can basically now read and write commands or packets into the network

213
00:21:34,240 --> 00:21:40,000
interface card, we're about actually having to involve the operating system at all. And so this cuts

214
00:21:40,000 --> 00:21:45,279
the whole operating system out of the picture and improves your performance considerably.

215
00:21:46,240 --> 00:21:51,119
In the case of form, they also don't want to use interrupts. One way of delivering a packet

216
00:21:51,119 --> 00:21:55,119
correctly is the packet comes in the network interface card delivers an interrupt to the operating

217
00:21:55,119 --> 00:22:02,160
system, the operating system, then alerts the application that a packet has arrived. And in form,

218
00:22:02,160 --> 00:22:06,079
they try to avoid that cost and the way they avoid it that cost is basically they pull

219
00:22:06,799 --> 00:22:14,079
the receive queue. So there's basically an usual level thread, you know, that sits in the

220
00:22:14,079 --> 00:22:20,319
farm application and basically does nothing else than sort of reading the receive queue to see

221
00:22:20,319 --> 00:22:27,919
if actually packet is available. And so that requires the node need of our, so that avoids the use of

222
00:22:27,919 --> 00:22:35,119
interrupts and, you know, at the cost of basically having a polling thread that's, you know,

223
00:22:35,119 --> 00:22:39,679
sits there doing nothing else than polling. And in farm, it turns out that there is this thread

224
00:22:39,679 --> 00:22:45,199
actually switches back and forth between running some application code and polling the nick.

225
00:22:46,639 --> 00:22:53,039
So that's sort of kernel bypass. And you know, this is a reasonable standard. Some people may,

226
00:22:53,039 --> 00:23:03,919
some of you may know familiar with the BBZK, which is the data plane development kit,

227
00:23:04,880 --> 00:23:11,519
which is a development kit to basically leverage, you know, kernel bypass. So there's a reasonable

228
00:23:11,519 --> 00:23:19,680
standard fit available in many operating systems. So then the next sort of piece of technology that

229
00:23:19,680 --> 00:23:25,279
you use is a little bit also well known as lightning standardized, many network carts,

230
00:23:26,240 --> 00:23:31,840
supported or more high end network carts, supported. And that's something that's called RDAM A.

231
00:23:34,240 --> 00:23:42,080
Which stands for remote, remote direct memory access.

232
00:23:50,800 --> 00:23:57,519
And the basic idea is that, you know, this requires a mix that actually understand RDAM A.

233
00:23:58,160 --> 00:24:02,079
And so, you're here with cable, you're here we have nick on the other side,

234
00:24:02,720 --> 00:24:06,960
your operating system may be sitting on top of it, you know, here we have form.

235
00:24:12,879 --> 00:24:19,599
And then, and basically, you know, the application on this site on the center site,

236
00:24:19,599 --> 00:24:26,559
you know, can basically put a particular packet into the send queue. And, you know, send,

237
00:24:26,799 --> 00:24:32,720
an RDMA packet, not necessarily somewhere it is a bit in the header of the packet saying like,

238
00:24:32,720 --> 00:24:39,359
hey, I'm an RDMA packet. And then the nick will send it over to the nick, the destination nick,

239
00:24:39,359 --> 00:24:44,559
the destination nick sees that this is a special packet, an RDMA packet, and looks at the

240
00:24:44,559 --> 00:24:49,440
instruction that, you know, goes along with the RDMA packet. And so, destruction might be, you know,

241
00:24:49,440 --> 00:24:54,240
read a particular memory location or write a particular memory location. So here it is. So,

242
00:24:54,240 --> 00:25:02,000
for example, let's say it's a read operation. And the read operation basically takes a address.

243
00:25:03,759 --> 00:25:11,120
And it allows the nick to basically read that the address straight out of memory out of ramp.

244
00:25:11,120 --> 00:25:16,880
So, for example, let's say, you know, we have our region, you know, with objects in it.

245
00:25:17,840 --> 00:25:29,680
And the sending farm application can just say, okay, I want to read, you know, this particular

246
00:25:29,680 --> 00:25:35,920
address, you know, which will help me correspond to this address of this object. Oh, and we'll send an

247
00:25:35,920 --> 00:25:42,560
RDMA packet to the nick on the other site. The nick sees that this is an RDMA packet. And

248
00:25:43,519 --> 00:25:49,519
basically reads, you know, from memory, the value stored at that particular location and sends them

249
00:25:49,519 --> 00:25:58,639
straight back, you know, to the source. And what is cool about this technology is that the nick can

250
00:25:58,639 --> 00:26:05,839
do this without actually interrupting or interfering with the server at all. I don't have to generate an

251
00:26:05,839 --> 00:26:12,240
interrupt. I just don't have to run any code on the processors that run the operating system,

252
00:26:12,240 --> 00:26:17,599
the application instead, you know, the nick as just firmware that runs, you know, executes those

253
00:26:17,599 --> 00:26:23,599
instructions and loads, you know, the value stored at those memory, either the requested memory,

254
00:26:23,599 --> 00:26:28,000
or the rest is, you know, straight into a response packet and sends the response packet back.

255
00:26:28,000 --> 00:26:33,200
And then, of course, on the receiving site, you know, that will show up in the receive queue. And so

256
00:26:33,200 --> 00:26:37,039
far, you know, it's so point, you know, we'll pull the receive queue and see actually, you know, the

257
00:26:37,039 --> 00:26:46,399
result of that RDMA. This particular version that I'm describing here, the paper refers to as one

258
00:26:46,399 --> 00:26:58,879
site at RDMA, and that typically refers in the paper to read operations.

259
00:26:58,880 --> 00:27:15,520
Can you repeat how the polling of the like Nick Hughes works on the client or yeah, on like,

260
00:27:15,520 --> 00:27:24,880
there's almost nothing to it. The client just has a thread that reads a particular memory location

261
00:27:25,600 --> 00:27:31,520
and which indicates whether a packet is arrived or not. And when the nick receives a packet,

262
00:27:31,520 --> 00:27:38,160
it sticks it in the receive queue and as a site of set setting it in the receive queue, you know, the flag,

263
00:27:38,160 --> 00:27:43,440
the bit, you know, turns you to one and the application notes, oh yeah, you know, there's a packet there.

264
00:27:46,320 --> 00:27:52,960
Is it a specific thread that, you know, that polls like yeah, in their system, they have a specific

265
00:27:53,039 --> 00:27:56,960
thread that actually you are dedicated to polling the queue.

266
00:27:59,519 --> 00:28:05,200
Thanks. Sorry, I'm not open this year. So does the need cooperate with the system or is it

267
00:28:05,200 --> 00:28:08,480
regularly bringing a job like as in any regular Nick?

268
00:28:11,600 --> 00:28:16,000
This is not a, you know, whatever you're standing Nick, right? There's a Nick that supports both

269
00:28:16,000 --> 00:28:23,920
kernel bypass and remote directory access and RGMA. And there's typically for Nick to support

270
00:28:26,240 --> 00:28:31,519
kernel bypass, it means it has to have multiple receive a send queue and it just gives a pair of

271
00:28:31,519 --> 00:28:37,200
the sender receives queue to an application. And it cannot like, of course, you know, you can't have

272
00:28:37,920 --> 00:28:42,799
send a receive queue for every process running on your machine. So typically there are like 16 of them,

273
00:28:42,799 --> 00:28:47,200
or 32 of them, and you know, give some of them, you know, to a particular authority OS,

274
00:28:47,200 --> 00:28:51,680
basically allow some applications to own basically send a receive queue.

275
00:28:52,879 --> 00:28:58,000
Nice. Thank you so much. And that also means that there's some specific support for DMA and

276
00:28:58,000 --> 00:29:02,879
Nick that all work out. So, you know, so it requires a Nick that is, you know, correct,

277
00:29:02,879 --> 00:29:05,440
and reasonable sophisticated, although it's in a reasonable standard these days.

278
00:29:06,080 --> 00:29:15,840
Okay, so that's one-sided RGMA. They also use RGMA to do rights and to actually implement RPC.

279
00:29:17,200 --> 00:29:25,680
And so there's a, they typically call this right RGMA in the paper. It's basically the same thing,

280
00:29:28,080 --> 00:29:34,400
except, you know, the sender can put in the RGMA packet saying like, oh, this is a right operation

281
00:29:34,400 --> 00:29:42,080
and right, you know, the following bytes to a particular address. And the paper uses two places,

282
00:29:42,080 --> 00:29:47,360
or two things where rights are actually going to. Obviously, I've never really written directly

283
00:29:47,360 --> 00:29:54,080
with RGMA, but there's two other data structures that are being written with right RGMAs. One is a log.

284
00:29:56,160 --> 00:29:57,920
And I'll see you the rule of the log later.

285
00:29:57,920 --> 00:30:04,720
And this is like a related for the transactions. So it has commit records, and locking records,

286
00:30:05,279 --> 00:30:11,920
etc, etc. And so the source, once they've pinned a log record to this particular log,

287
00:30:11,920 --> 00:30:19,200
you know, it can use do right RGMA and then the receiving link will just add, you know,

288
00:30:19,200 --> 00:30:23,920
the new entry in the log to the specific location.

289
00:30:24,880 --> 00:30:30,880
Okay. And so that means like the sender, and so there's one of these cues,

290
00:30:30,880 --> 00:30:36,240
and one of these logs is per sender receives a pair, so that the sender actually can manage and

291
00:30:36,240 --> 00:30:42,640
know what the beginning and the end of the log are. Then in addition to that, there are some,

292
00:30:42,640 --> 00:30:53,360
there are message cues. And also a one person pair. And these are basically used to implement

293
00:30:53,920 --> 00:31:01,039
RPCs. So if you want to do remote procedure call, the client, the sender,

294
00:31:02,080 --> 00:31:08,640
Nixon, write RGMA packet, writes, you know, the data, the message basically into the remote message

295
00:31:08,640 --> 00:31:15,920
cue. There's a thread sitting on the destination site that is basically pulling that message cue,

296
00:31:15,920 --> 00:31:21,360
we're pulling all the message cues. If it sees a message, you know, it processes the message,

297
00:31:21,359 --> 00:31:25,759
and can then send a response back, you know, using a write RGMA.

298
00:31:32,799 --> 00:31:37,279
And this turns out to be, you know, cheaper, you know, implementing route means user calls using

299
00:31:37,279 --> 00:31:43,519
RGMA. And it turns out to be cheaper than basically using to understand it, RPC package,

300
00:31:43,519 --> 00:31:50,159
that, you know, since just package using a regular nick, but without RGMA,

301
00:31:50,240 --> 00:31:54,560
and has a thread in the other side, you know, the response. Okay.

302
00:31:56,400 --> 00:32:01,440
So there are any validation step here to make sure that you're only writing to a region of

303
00:32:01,440 --> 00:32:05,600
memory that's like expressly allowed for RGMA, you know, so like you don't write,

304
00:32:05,600 --> 00:32:10,000
duplicate onto application memory or something. Yeah, so there's all kinds of, you know,

305
00:32:10,000 --> 00:32:14,800
this is sort of the highlight of the idea. There's all kinds of details here. So when

306
00:32:15,119 --> 00:32:24,480
you sort of set up one of these RDA in order to do this, one side that RGMA is or write RGMAs,

307
00:32:24,480 --> 00:32:30,000
you first have to do a connection setup. So there's a negotiation step between the sender and

308
00:32:30,000 --> 00:32:35,839
the receiver to set up basically like it's almost like a TCP channel except, you know, RGMA

309
00:32:35,839 --> 00:32:43,519
WSTCP, but it's set up a connection oriented, reliable, ordered channel.

310
00:32:46,079 --> 00:32:50,159
And so the security checks and the actual control checks are happening at the point of the setup.

311
00:32:53,199 --> 00:32:56,559
So would you have to do that between every pair of machines? Yes.

312
00:32:58,639 --> 00:33:03,839
So that would become really costly to add like one machine to a large costler, right?

313
00:33:04,639 --> 00:33:10,399
We have n-square RGMA connections. And otherwise you would have n-square TCP connections.

314
00:33:11,839 --> 00:33:14,480
And not clear those major differences there.

315
00:33:18,000 --> 00:33:24,319
And so just to clarify, so the message in the logs basically they both sit also in memory,

316
00:33:24,319 --> 00:33:28,879
it is set in different places than where the object sits. Yeah exactly. So if you do,

317
00:33:28,880 --> 00:33:34,240
as a district of a year on the right, it's sort of a picture of the memory layout of the farm

318
00:33:34,960 --> 00:33:41,360
process. You know, there's an region table, we're an object table, there's a region in the memory

319
00:33:41,360 --> 00:33:48,560
of the server. These regions have objects in them. And in addition to the regions, there are message

320
00:33:48,560 --> 00:33:56,880
cues and there are logs. And also for the Nick to support the direct access from memory. So since

321
00:33:56,880 --> 00:34:03,440
here we don't have any software involved, since the Nick can directly access the memory without even

322
00:34:04,240 --> 00:34:10,800
notifying the application or the OS, shouldn't be some coordination on the hardware level or at least

323
00:34:10,800 --> 00:34:19,920
some support also from the processor to this feature. Yeah, so there's basically, you know, the Nick

324
00:34:19,920 --> 00:34:29,360
can read a right, read a right cache lines, atomically. And so to support this, you know, there is

325
00:34:29,360 --> 00:34:35,519
an interface, you know, to the memory system between the Nick and that it has to be carefully set up,

326
00:34:35,519 --> 00:34:41,360
you know, between the OS and you know, when the connection setup is done. I see, thank you.

327
00:34:41,360 --> 00:34:50,640
Sorry, the right to RDMA on the right side that is in red. What happens there?

328
00:34:52,160 --> 00:35:00,559
So the center, the left machine can do a right RDMA, which basically sends a right RDMA packet

329
00:35:00,559 --> 00:35:08,400
to the right side, the destination and the Nick, you know, sees that this is a right RDMA packet

330
00:35:08,400 --> 00:35:13,599
and will write a contact that came in over the network to the address that's specified in the

331
00:35:13,599 --> 00:35:23,280
right RDMA command. But that would be just, and so there's a remote machine, you can just write the

332
00:35:23,280 --> 00:35:29,920
memory location set of addresses on the destination machine without actually having the server, you know,

333
00:35:29,920 --> 00:35:34,639
being involved other than doing set up, of course. Thank you.

334
00:35:37,119 --> 00:35:47,360
So quick question. So the Q, the Q and the Nick is only used for read RDMA, it's like the right

335
00:35:47,360 --> 00:35:54,480
rights directly to memory and the receiver. Yeah, on the, on the, okay, so they're on the right

336
00:35:54,480 --> 00:35:58,639
RDMA, as you may be noticed in the paper, there can be an acknowledgment coming back.

337
00:36:00,000 --> 00:36:06,880
So if the center, you know, sends a, does a right RDMA, it can wait from an acknowledgment from

338
00:36:06,880 --> 00:36:14,880
the receiving Nick that actually indeed performed the right RDMA. Thanks.

339
00:36:16,639 --> 00:36:18,240
And I will play an important role.

340
00:36:18,399 --> 00:36:27,759
Any more questions about this part? This sort of a cool piece of technology, you know,

341
00:36:27,759 --> 00:36:34,719
that that's going to come into existence, pretty quite widespread in the last decade, and basically

342
00:36:34,719 --> 00:36:42,159
they want to leverage it. Because it allows them to get very, you know, there's nothing the latency to

343
00:36:42,159 --> 00:36:46,480
actually do one of these one-sided RDMAs. It's about five microseconds.

344
00:36:48,960 --> 00:36:51,279
So very low latency.

345
00:36:54,399 --> 00:36:57,279
Much, much, much faster, correct? Then, for example, reading or writing a disk,

346
00:36:58,879 --> 00:37:06,159
and not much slower, you know, slower than writing your own memory, but, you know, pretty fast.

347
00:37:06,159 --> 00:37:12,719
I think there's a low G2 to do, if it's one microseconds, you can do a million packets per second,

348
00:37:12,719 --> 00:37:21,440
which is pretty impressive. Okay? So there's so far, being to really stand at technology,

349
00:37:24,960 --> 00:37:33,119
cutting edge, but standard. So the real challenge that these sort of paper addresses,

350
00:37:36,799 --> 00:37:44,399
is actually how to use, you know, RDMA, you know, both write RDMA and one-sided RDMA,

351
00:37:44,399 --> 00:37:50,000
it's actually doing transactions. So the challenge is paper addresses, the transactions using RDMA.

352
00:37:59,279 --> 00:38:04,079
And, you know, to sort of see that this is a challenge, you know, we sort of have to think a

353
00:38:04,079 --> 00:38:12,239
little bit about all the protocols that we've seen so far. So protocols for, you know, for

354
00:38:12,239 --> 00:38:22,319
transactions, two-phase commit, etc. All of those protocols have required sort of service site

355
00:38:22,320 --> 00:38:37,680
participation. And so, for example, you know, we're not immune to that, it is, you know, the

356
00:38:38,720 --> 00:38:42,960
client sends a request or the transaction coordinator sends a request to one of participants,

357
00:38:43,680 --> 00:38:49,760
for example, through our Rewalk on a particular object, and you're going to just wait, you know,

358
00:38:49,840 --> 00:38:56,960
on the server, or the receiver, until the lock actually becomes available, or, you know, runs,

359
00:38:56,960 --> 00:39:05,200
you know, the server runs some validation step, you know, to see if the transaction can be committed

360
00:39:05,200 --> 00:39:11,120
or not. And so, in all those cases, basically, if you have sort of service site participation,

361
00:39:11,120 --> 00:39:13,520
that means that you have to run code on the server.

362
00:39:20,640 --> 00:39:28,960
And, you know, that is sort of counter to what RDMA gives you, right? RDMA actually doesn't,

363
00:39:29,600 --> 00:39:35,840
we will provide you with the ability to run code on the server. And so, the designers or the

364
00:39:35,840 --> 00:39:40,640
office of this paper have to come up with sort of protocols that allow you to implement, like,

365
00:39:40,640 --> 00:39:47,600
two-phase commit, and transactions in general to, without actually, or trying to reduce, no service

366
00:39:47,599 --> 00:39:52,639
site participation, so that they can use through some part of the operation using RDMA,

367
00:39:53,759 --> 00:39:58,159
and, you know, some using remote procedure calls, as usual, traditional would do in a

368
00:39:58,159 --> 00:40:03,360
traditional designs that we've seen in the last, you know, a couple of weeks. And so, that's sort

369
00:40:03,360 --> 00:40:12,480
of the central challenge in this paper. And this pushes them in this direction, you know, to sort of

370
00:40:12,480 --> 00:40:22,079
solve that problem, the high level strategy that they use is, the high level strategy that

371
00:40:22,079 --> 00:40:35,679
they use is optimistic, concurrency control. And, and the really, really were, this shines for them

372
00:40:35,679 --> 00:40:40,960
is on the read operations. Because, basically, the basic plan is, we're going to read objects,

373
00:40:42,480 --> 00:40:46,400
that are part of intersection, we've had, you know, acquiring walks.

374
00:40:51,119 --> 00:40:57,039
In general, we require walks, you know, that would mean interrupting maybe the server, the server

375
00:40:57,039 --> 00:41:01,440
has to do some work, and then, you know, maybe block the client into the election, the lock is

376
00:41:01,440 --> 00:41:08,320
available, and then return the object. And, you know, that is not really suitable or messes up nicely

377
00:41:08,400 --> 00:41:15,840
with, what lines up nicely with, RDMA. And so, they're going to go to an optimistic scheme,

378
00:41:15,840 --> 00:41:20,559
where basically reading objects is not going to require a lock at all. Maybe just confection object,

379
00:41:21,680 --> 00:41:26,960
and start using it. And as we'll see, you know, of course, you need to have some mechanism to

380
00:41:26,960 --> 00:41:30,400
discover whether you're reading an old version or a new version. And as is where the version

381
00:41:30,400 --> 00:41:42,720
numbers are going to play an important role. So, when you read an object in form, you get the object

382
00:41:42,720 --> 00:41:49,200
back, and you get also the version overback to that object. And then, the basic idea is that,

383
00:41:49,200 --> 00:42:00,079
at the point of commit, we're going to do an evaluation step to check that the objects being

384
00:42:00,079 --> 00:42:04,960
that you read at the beginning of the transaction are actually having to be modified. And so,

385
00:42:04,960 --> 00:42:17,279
during the validation step, we're basically going to check for conflict. And the conflict is basically

386
00:42:17,279 --> 00:42:21,599
if the version number has been incremented, you know, since, you know, the

387
00:42:22,319 --> 00:42:26,799
coordinate or actually read the object. So, if the version numbers are different,

388
00:42:30,799 --> 00:42:35,920
are different, then the transaction is awarded.

389
00:42:39,759 --> 00:42:43,440
And if they're the same, are still the same, that basically means that nobody,

390
00:42:43,440 --> 00:42:49,039
no other transaction action modified the transaction, and do the object, and then, you know,

391
00:42:49,039 --> 00:42:55,039
we can actually go ahead and commit. And of course, in the case of a board, you know, what

392
00:42:55,039 --> 00:43:00,880
typically will happen is that the client can only maybe run the whole transaction again.

393
00:43:01,519 --> 00:43:06,480
Perhaps waiting for a little while before actually doing it for a random period of time.

394
00:43:07,759 --> 00:43:13,440
So, that's the basic plan. So, this is just this up next scheme, so that reads can

395
00:43:14,159 --> 00:43:20,320
completely exploit our DNA. And as we'll see, in fact, reads well and it required any

396
00:43:20,960 --> 00:43:29,119
state changes on the servers at all. And so, this is basically sort of the basic idea behind,

397
00:43:29,119 --> 00:43:34,240
you know, figure four, accepting another result. So, in a second, there's quite a bit of more

398
00:43:34,240 --> 00:43:40,159
complications to it. And so, this, again, sort of, I think I used this phrase a little while ago,

399
00:43:40,159 --> 00:43:44,960
a couple of lectures ago. So, the optimistic scheme in contrast to the pessimistic scheme is,

400
00:43:44,960 --> 00:43:49,519
you're basically going to assume that you're allowed to do the operation. And if it turns out

401
00:43:49,519 --> 00:43:54,639
you're not alive, you sort of apologize in the board. In the pessimistic case, you basically first

402
00:43:54,639 --> 00:43:59,359
ask for approval to do the operation by acquiring walks. And then, you're basically, again,

403
00:43:59,359 --> 00:44:06,719
key that I commit time, you can actually commit. Okay. Any questions about optimistic concurrency

404
00:44:06,799 --> 00:44:13,919
control at a, at a high level? Just a question about the version numbers. How do they ensure that

405
00:44:13,919 --> 00:44:19,759
two different, that there's like consistency across different objects, so that you're not reading

406
00:44:20,319 --> 00:44:25,839
one object and then like later reading another object, but those, but a transaction modified

407
00:44:25,839 --> 00:44:31,919
some of those in the tweeting. Yeah, well, and that's a great question. And so, let's, I think,

408
00:44:31,920 --> 00:44:36,639
when we're going to get out of this, we got to dive into actually figure four. And we just,

409
00:44:36,639 --> 00:44:43,599
I think, sort of, the core of this paper. So, let's look at figure four. And

410
00:44:50,800 --> 00:44:51,840
oops, not that one.

411
00:44:51,840 --> 00:44:57,680
All right. You're figure four.

412
00:45:00,079 --> 00:45:03,440
We're going to spend quite a bit of time basically talking about figure four.

413
00:45:06,000 --> 00:45:11,600
And so, at first, you know, fingerless, get this oriented in this figure four. I'm going to

414
00:45:11,599 --> 00:45:24,719
receive. So, we have a transaction coordinator, the C here. And then really the transaction

415
00:45:24,719 --> 00:45:29,839
coordinator is the application. And the application runs on the same machines, one of those 90

416
00:45:29,839 --> 00:45:34,559
machines. But the way I'm going to think about it for the rest of this lecture is that it runs

417
00:45:34,559 --> 00:45:40,480
on a separate machine. I don't really care about it that much. Okay. And then there are different

418
00:45:40,480 --> 00:45:47,360
charts. In this case, there are free charts, you know, one, two, and three. And each chart is

419
00:45:47,360 --> 00:45:54,240
replicated twice, one's in the primary and one's in the backup. Then, you know, we'll see that

420
00:45:54,240 --> 00:45:58,639
this is the execution phase of the transaction. So, the transaction has two phases. One is the

421
00:45:58,639 --> 00:46:04,960
execution phase and then it's the commit phase. And during the execution phase, this is like where

422
00:46:05,039 --> 00:46:10,320
the transaction just runs. So, it does it begin, does it read. For example, in this case,

423
00:46:10,320 --> 00:46:15,280
the free objects are being read, you know, one that was located in the first primary is in one

424
00:46:15,280 --> 00:46:18,960
object that the second thing is shooting in the chart one, one object that's sitting in the chart

425
00:46:18,960 --> 00:46:28,000
free, and one object that sits in the chart two. Okay, we'll read you two. And we can see, actually,

426
00:46:28,000 --> 00:46:33,760
you know, we look a little bit ahead. We'll see that the two of these objects are actually being

427
00:46:34,640 --> 00:46:40,320
written and one of them is being read. So, the object for number, you know, chart three,

428
00:46:40,320 --> 00:46:45,200
this is just a read operation. And these are read operations. These are read operations, but

429
00:46:45,760 --> 00:46:50,800
those objects are going to be modified. So, basically, you have to transaction runs, you know,

430
00:46:50,800 --> 00:46:56,880
it fetches objects from different machines, modifies them locally, and then, you know, in the commit

431
00:46:56,880 --> 00:47:03,119
phase, the changes are being applied. And of course, you know, the whole challenge here is that

432
00:47:03,119 --> 00:47:07,519
in the end, we want to achieve strict serialized ability.

433
00:47:07,599 --> 00:47:28,079
And in some ways, the protocol for at least rights almost follows, like, sort of very similar

434
00:47:28,079 --> 00:47:31,119
two phase commit protocols that we've seen in the past. You know, there are differences in the

435
00:47:31,119 --> 00:47:38,400
details, but the basic strategy is the same. And, you know, we can sort of, so let's assume that,

436
00:47:38,400 --> 00:47:42,559
now, we're done with the execution phase. So, we're at the end of the transaction, and sort of

437
00:47:42,559 --> 00:47:46,159
transactions, we're going to try to commit the transaction that could be two outcomes. You know,

438
00:47:46,159 --> 00:47:50,400
they're actually going to use successfully commits or it actually aborts. And in a way,

439
00:47:50,400 --> 00:47:54,559
you're bored because, like, some other transaction ran concurrently and modifies one of the objects

440
00:47:54,639 --> 00:48:02,320
that we do read, or whatever we're trying to write. And so the first thing, so the protocol,

441
00:48:02,320 --> 00:48:08,159
the commit phase basically has five steps, you know, the locking step, the validation step,

442
00:48:08,159 --> 00:48:13,119
the commit backup step, the commit primary, and then the trunk, although the trunk aid basically runs

443
00:48:14,320 --> 00:48:19,279
almost lazily. And so it's not particularly important. These are rather perspective,

444
00:48:19,280 --> 00:48:24,240
basically, the point of interest that we're things are stopping is here. So that's sort of where the

445
00:48:24,240 --> 00:48:32,560
end of the transaction is. Okay, so, each of these objects, as I said before, you know, when you read

446
00:48:32,560 --> 00:48:41,280
them, it has a version, you know, a version number. And there are modifies, this is it locally,

447
00:48:41,280 --> 00:48:45,519
then at the point of this, you know, when the, when the, this is the commit point, where when the

448
00:48:45,519 --> 00:48:52,480
application calls and transaction, the, the protocol, but this whole commit phase protocol kicks in.

449
00:48:54,159 --> 00:48:59,360
And so the first thing it does is what's called the locking step, step number one,

450
00:48:59,360 --> 00:49:05,280
and the goal here in this step is to basically acquire locks on all the objects that are being written.

451
00:49:06,480 --> 00:49:12,400
And so we can see, you know, based on this diagram that apparently two objects are being written,

452
00:49:12,400 --> 00:49:18,639
namely, the, you know, this object for X, because the context is the primary of

453
00:49:19,360 --> 00:49:24,800
Shard 1 or region 1, and then this object is being read, and now there's actually located on

454
00:49:24,800 --> 00:49:29,680
region 2, right? And apparently the fur object that we read, you know, from primary 3,

455
00:49:31,280 --> 00:49:38,320
it's not being read, because it doesn't participate in the locking phase. So in the locking phase,

456
00:49:38,320 --> 00:49:48,000
the arrows actually have all kinds of different meanings. So these deaf arrows are one-sided RDMAs.

457
00:49:56,960 --> 00:50:01,039
And so those objects are being read with RDMAs, they're just fetched from the remote

458
00:50:01,840 --> 00:50:08,800
memory location and abroad locally, you know, to the memory of the application or the

459
00:50:08,800 --> 00:50:22,480
coordinator. The solid ones are radar DMAs, and in this particular case,

460
00:50:26,320 --> 00:50:35,680
they append a lock entry to the log of the primary. So the primary has a log,

461
00:50:36,079 --> 00:50:43,119
every primary has a log, so I'm just going to drive like this. And I'm actually using a different

462
00:50:43,119 --> 00:50:56,639
color. So here we have the primary eye with a log. And basically the coordinator, now it's a commit

463
00:50:56,639 --> 00:51:08,000
record, or no, sort of, the lock record is called to the log. Now I'm just going to make it a big

464
00:51:08,000 --> 00:51:13,199
record so I can write down what's in it. And in it is the version number of the time of the

465
00:51:13,199 --> 00:51:19,759
red, and one of the object is red, so that version number that came out here. Now that goes back

466
00:51:19,760 --> 00:51:26,160
into the lock record, the object ID that's being read, and the new value for the object.

467
00:51:29,600 --> 00:51:42,480
And so this record is just appended into the primary one and primary two's log using a right RDMA.

468
00:51:43,280 --> 00:51:48,400
And so there's some thread sitting on those machines that looks at these logs and then actually

469
00:51:48,400 --> 00:51:56,079
does some operations. So in this particular case, if there's a thread sitting on the P1 and P2,

470
00:51:57,200 --> 00:52:03,599
monitors or spins or pulls this log and sees there's a new log record, and then in this

471
00:52:03,599 --> 00:52:09,119
particular case what it will do, it will try to get a lock on the object that actually is listed in

472
00:52:09,359 --> 00:52:20,239
the, in the, in the, uh, transaction. So somewhere there's an object, and the object has some data in it,

473
00:52:20,239 --> 00:52:27,920
and it has this lock bit and the version number in it. And so P1, you know, has one object, you know,

474
00:52:27,920 --> 00:52:35,679
that is being modified by the coordinator. P2 has another object that is modified by the coordinator.

475
00:52:35,679 --> 00:52:45,199
And basically the, the primary tries to require the lock on the, on the object using a test and

476
00:52:45,199 --> 00:52:54,319
set instruction. And so it will try to set the lock bit, I'm using a test and set instruction,

477
00:52:54,319 --> 00:53:04,159
and if the lock bit was zero, and before, and the lock bit was zero, and successfully set the

478
00:53:04,159 --> 00:53:11,039
bit to one, then it knows that the, the primary knows that it actually required a lock, and in

479
00:53:11,039 --> 00:53:18,239
the next case, and we'll send the one RDMA message back to append a message, to the coordinators,

480
00:53:18,239 --> 00:53:24,399
message curious saying, okay, you successfully acquired locks in the frutis particular objects.

481
00:53:26,079 --> 00:53:33,759
If the transaction, if the lock was already taken by another transaction, then a double

482
00:53:33,760 --> 00:53:40,320
point in time, the transaction is aborted. And so, so when the primary eye, you know, tries to get

483
00:53:40,320 --> 00:53:46,960
the lock, finds out that the lock is already set, using a test and set instruction, then that lock,

484
00:53:46,960 --> 00:53:58,800
sort of the trilock will fail. And the, the primary rule add a message to the queue of the,

485
00:53:58,880 --> 00:54:04,560
using, to the queue of the coordinator, saying like, I, you know, I could not acquire the locks,

486
00:54:04,560 --> 00:54:07,760
and the coordinator in that case will report the transactions.

487
00:54:10,080 --> 00:54:11,120
And you question so far.

488
00:54:13,360 --> 00:54:15,840
How are the, are the locks obtained through Zookeeper?

489
00:54:16,720 --> 00:54:20,560
No, these are, there's, there's other set of locks using Zookeeper, it does really for the

490
00:54:20,559 --> 00:54:29,679
configuration management, like the, the mapping of region number two, primary and backups.

491
00:54:29,679 --> 00:54:36,239
These are just in memory locks, that the primary maintains. So in the dress space,

492
00:54:36,239 --> 00:54:42,000
kind of looking a little bit back, correct. We look back at this picture. There was a region has

493
00:54:42,000 --> 00:54:48,880
objects, every object has some data and a header, and in that header, there is basically a 64-bit

494
00:54:48,880 --> 00:54:55,280
number that were the top level bit is the lock bit and the 63 other bits from the version number.

495
00:54:56,320 --> 00:55:00,960
What is the primary goes down? Does the backup have the same locks as the primary?

496
00:55:01,760 --> 00:55:06,800
If the primary goes down, the whole, what is going to happen is that there's a whole

497
00:55:06,800 --> 00:55:13,840
reconfiguration protocol happening and a recovery protocol. The end result of that is that in this

498
00:55:13,840 --> 00:55:18,880
case, we hope that it actually would be a board, correct, because it never made it to the end.

499
00:55:20,000 --> 00:55:23,120
We'll get to the photos in another while. So what's the shoe for?

500
00:55:24,559 --> 00:55:27,760
I'm going to talk about it in a couple of boards, and I'll talk about four panels.

501
00:55:27,760 --> 00:55:28,079
Thank you.

502
00:55:31,680 --> 00:55:36,640
So the version number are per object, right? Sure. Per object, yeah.

503
00:55:37,279 --> 00:55:38,639
Okay.

504
00:55:42,319 --> 00:55:44,799
Okay, good. So, um,

505
00:55:48,559 --> 00:55:53,519
why do they choose to abort a transaction rather than blocking and waiting for the lock to be released?

506
00:55:55,039 --> 00:56:01,119
Because they have all material. They have not read the latest material value,

507
00:56:01,199 --> 00:56:03,359
and so the transaction has to abort.

508
00:56:04,880 --> 00:56:08,880
Oh, I see. Because the lock means that it's going to change the next time.

509
00:56:08,880 --> 00:56:12,239
Well, they asked for the locks after they're really written the object,

510
00:56:12,880 --> 00:56:17,119
right? So the coordinated modifies the object based on some version number,

511
00:56:18,159 --> 00:56:22,319
submits a bunch of rights, assuming that it's written on the latest version number.

512
00:56:22,880 --> 00:56:29,920
And so by the time the, the commits starts to happening and you try to get the locks,

513
00:56:30,000 --> 00:56:33,680
and you discover that somebody else is locked, it means somebody else is already modifying it.

514
00:56:33,680 --> 00:56:36,400
And so that would violate the realization, right?

515
00:56:37,840 --> 00:56:41,200
Yep. Thank you. So in fact, at the point you get the lock here,

516
00:56:41,840 --> 00:56:44,400
that sort of the serialization point for writing transactions.

517
00:56:45,599 --> 00:56:50,159
Okay, with this, this point, the transaction has acquired all the locks for all the objects

518
00:56:50,159 --> 00:56:55,200
is modified. So so nobody else can actually modify them in this particular point in time.

519
00:56:55,200 --> 00:56:58,639
And so that's sort of the serialization point for the right part of the transaction.

520
00:57:00,240 --> 00:57:05,280
Makes sense? Yes, thank you.

521
00:57:07,039 --> 00:57:14,079
Good. Okay, so now you might have felt like, oh, why not do the same thing for read,

522
00:57:14,079 --> 00:57:18,800
correct? And you know, get the lock for the read objects, get the lock for the objects that are

523
00:57:18,800 --> 00:57:24,480
read, you know, check the version number and you're in good shape. And the reason that that is

524
00:57:24,480 --> 00:57:30,400
actually in a separate phase, namely the validation phase, is to basically avoid these expensive

525
00:57:30,400 --> 00:57:35,360
write-rDMAs, right? If you look at this vertical step, you'll see that there's a write-rDMA,

526
00:57:35,360 --> 00:57:40,559
then the server actually has to run something, it basically does the acquiring the locks,

527
00:57:40,559 --> 00:57:47,440
and then responds with another write-rDMA. So here, this is a full RPC that actually requires

528
00:57:47,440 --> 00:57:54,720
server for participation. And as we'll see in a second, to handle the read, and the objects that

529
00:57:54,720 --> 00:58:02,159
have been read, the farm uses this validation step, and that validation step just used one

530
00:58:02,159 --> 00:58:06,240
cited RDMAs. And so there's no real server involvement necessary.

531
00:58:07,119 --> 00:58:18,239
Okay. So what happens on the, so we're basically at this point, the, you know,

532
00:58:18,239 --> 00:58:23,599
where we hear the transaction coordinator actually has the write locks, and now the only thing

533
00:58:23,599 --> 00:58:31,599
it does is validates the read locks, or basically the read version numbers. And so it, for every object

534
00:58:31,599 --> 00:58:35,679
that is read, but not modified, so in our particular example, that's only one object, correct?

535
00:58:35,679 --> 00:58:43,440
This is the one that actually is being read, the one that region three. So it sends, it basically

536
00:58:43,440 --> 00:58:50,559
does a one outside an RDMA to read the version number that 64 bit number for the object as being read.

537
00:58:51,759 --> 00:58:59,839
And when it gets it back, when it gets it back here, it checks two things. If the lock is taken,

538
00:58:59,839 --> 00:59:04,639
or if the lock is set, that means that some core, that a concurrence action is being,

539
00:59:04,639 --> 00:59:10,559
is trying to modify it. So that point, a user boards. And so the whole transaction board to get.

540
00:59:11,679 --> 00:59:17,599
If the version number is identical, and it's not locked, that means that no other transaction

541
00:59:17,599 --> 00:59:24,960
is using this particular point of time, and the, the transaction could proceed. Basically,

542
00:59:24,960 --> 00:59:30,000
all the objects that are being read and modified have the version number at the start of the transaction,

543
00:59:30,960 --> 00:59:36,320
and nothing has changed yet. And so it is okay for the transaction to commit. This is really the

544
00:59:36,320 --> 00:59:41,599
true zeroization point. And since the transactions numbers are acquired at the beginning,

545
00:59:41,599 --> 00:59:46,719
when the version number are read at the beginning of the transaction, the transaction will commit

546
00:59:46,719 --> 00:59:53,440
in order of the version numbers, basically, and they also will get basically strict serializability.

547
00:59:54,559 --> 00:59:59,199
Because any transaction that will start after your transaction commits will have a higher version

548
00:59:59,199 --> 01:00:08,480
number. So therefore, it also will commit later. Okay, so this is the point, basically, where the

549
01:00:08,480 --> 01:00:15,919
transaction coordinator says, you know, at this point, you know, the, we know that all the,

550
01:00:15,919 --> 01:00:20,879
we have the, we have acquired the locks, we have verified, validated the version numbers for the

551
01:00:20,879 --> 01:00:23,679
read objects. And so this is basically the commit point.

552
01:00:23,919 --> 01:00:29,440
We'll just start off the commit point. So at this point, the transaction is going to say,

553
01:00:30,079 --> 01:00:35,759
okay, I'm going to go commit, I'm going to go commit. And you know, there's a multiple

554
01:00:36,239 --> 01:00:40,799
messages necessary in the commit points. As we've seen, second, those are mostly for fault

555
01:00:40,799 --> 01:00:48,960
tolerance reasons. And so at this point, namely, only the primary, you know, has been,

556
01:00:49,920 --> 01:00:57,119
only the primaries have been contacted of the objects that are being modified, but not the

557
01:00:57,119 --> 01:01:02,400
backgrounds. And of course, you know, we want to ensure that, and write, you know, once it commits,

558
01:01:03,280 --> 01:01:08,720
will survive, uh, f failures, right? The system is designed to handle f plus one failures.

559
01:01:09,440 --> 01:01:15,360
In our particular design, there's one backup. And so it can only survive one failure.

560
01:01:16,000 --> 01:01:22,000
And so what happens in this final phase to commit backup phase is actually we're going to write

561
01:01:22,640 --> 01:01:31,519
to the logs of the primary of the backups. So the backups have log, the years back of i,

562
01:01:31,519 --> 01:01:39,680
you know, similarly, there's a log entry in it. And um, what we're going to do is write, uh,

563
01:01:39,680 --> 01:01:41,440
what's called the commit backup record.

564
01:01:45,519 --> 01:01:54,320
And the commit backup record, right? Exactly. It has the same information as the,

565
01:01:55,760 --> 01:02:01,120
walking record that we shot earlier. So in it, it's going to be diversion number, the OID,

566
01:02:01,920 --> 01:02:04,240
and the new value.

567
01:02:08,000 --> 01:02:14,640
Okay. And this is, you know, like before, this is actually done using a right

568
01:02:15,440 --> 01:02:15,920
RDMA.

569
01:02:21,200 --> 01:02:25,920
Now the backup does what we really have to do any operation at this point, like the server side of

570
01:02:25,920 --> 01:02:32,400
the backup doesn't really have to run anything. I just need, uh, and, and so the, the, here's this trick,

571
01:02:33,200 --> 01:02:38,880
where basically the center rates and the acknowledgement of the net. And so this, you know,

572
01:02:38,880 --> 01:02:44,880
doesn't, this is not a one-sided, or a right RDMA. This is just to make acknowledging that it got

573
01:02:44,880 --> 01:02:49,840
the right RDMA and that the right RDMA has to be performed. And so that basically acknowledges,

574
01:02:49,840 --> 01:02:54,079
you know, when we get this particular point in the protocol, the transactual coordinate

575
01:02:54,079 --> 01:03:01,280
or nodes, the object is in the log of all the primaries and the OID is in the, uh, in the log of all the

576
01:03:01,280 --> 01:03:07,200
backups. And so now we're in a good position in third-of-fault tolerance, correct? Because, um,

577
01:03:07,200 --> 01:03:11,680
if any of one of the two fails, then the other one can actually apply the right operation.

578
01:03:11,919 --> 01:03:21,759
Then there's one more step that needs to be performed and that is the, uh, commit primary.

579
01:03:21,759 --> 01:03:27,279
We'll talk about a little bit later in the more detail. But this is the final step where,

580
01:03:28,079 --> 01:03:32,799
there's one more log record written in the primary name, the commit record.

581
01:03:33,600 --> 01:03:42,720
And the commit record just assessed the transaction ID that actually is being committed.

582
01:03:44,480 --> 01:03:48,960
Uh, and so we're like every, I didn't write that down in the other records, but every record has

583
01:03:48,960 --> 01:03:55,200
some transactions ID so that we know which transaction we're talking about. And, uh, and again,

584
01:03:55,200 --> 01:04:01,440
this is, or uses the same sort of strategy. There's a right RDMA to append.

585
01:04:03,360 --> 01:04:12,160
To the, uh, to the log and, you know, there's an acknowledgement, the NIC acknowledges,

586
01:04:13,440 --> 01:04:20,000
the, the right RDMA. And so, but it doesn't require any interrupts or there's no,

587
01:04:20,000 --> 01:04:25,280
the server itself is not being interfered with, just the NIC is involved in these two operations.

588
01:04:26,000 --> 01:04:35,040
Then, as soon as the one of the NICs, uh, acknowledges the commit record on one of the primaries,

589
01:04:35,040 --> 01:04:40,560
at that particular point in time, the transaction really truly committed. But this is the true commit point.

590
01:04:43,760 --> 01:04:47,200
The commit starts basically here and this is actually the actual commit point.

591
01:04:47,200 --> 01:04:52,000
And at that particular point in time, the, uh, transaction coordinator informs the application.

592
01:04:52,000 --> 01:04:55,280
Yes, your transaction has committed and is done.

593
01:04:57,519 --> 01:05:01,119
Then, you know, of course, short points later, the logs need to be cleaned and shorted

594
01:05:01,119 --> 01:05:06,480
up and truncated and all the kind of stuff. And this is like the truncated face. And that's basically

595
01:05:06,480 --> 01:05:12,559
picking back on later walking faces and validation faces. Uh, and so I'm not really going to talk

596
01:05:12,559 --> 01:05:17,679
about it at all, but basically it is to truncate the logs so that they don't grow unbiasedly.

597
01:05:22,719 --> 01:05:34,400
Uh, sorry, but the hardware acts, they just go directly into, into the NIC of the coordinator.

598
01:05:35,039 --> 01:05:40,000
Yeah, so it is like, let's go back to the RDDA picture, right? So if a right RDMA happens,

599
01:05:41,440 --> 01:05:46,320
uh, so you've got a right RDMA, the sender to coordinator was running here, right? And

600
01:05:46,400 --> 01:05:52,320
here's maybe one of the primary sort of backups. And so the right RDMA goes in, you know,

601
01:05:52,320 --> 01:05:58,000
writes maybe an entry into the log. Uh, the NIC does that, the NIC, you know, sends an acknowledgement back.

602
01:06:00,160 --> 01:06:03,360
And the coordinator will see that the acknowledgement in the received queue.

603
01:06:07,120 --> 01:06:14,960
And so as soon as the coordinator sees the ECK, you know, for, uh, it's, uh, one, right RDMA, uh, it can, uh,

604
01:06:15,039 --> 01:06:18,320
proceed. I know it's that the right RDMA succeeded.

605
01:06:23,920 --> 01:06:28,000
So does the right RDMA is only right to the log? They,

606
01:06:29,119 --> 01:06:36,639
they're used in two cases. Uh, they're both used for these message queues and for the, uh, the log

607
01:06:36,719 --> 01:06:45,679
append. Um, so when we say that, uh, that, uh, a right RDMA has been performed, we mean that it

608
01:06:45,679 --> 01:06:50,079
has been attempted to the log and not actually executed necessarily by the application.

609
01:06:50,079 --> 01:06:54,960
That's correct. That's correct. Uh, so for genital, you know, to, for example, to do the, for the backup to

610
01:06:54,960 --> 01:07:01,359
actually, uh, perform the update to the object, you know, it needs to read the log entry and then apply

611
01:07:01,360 --> 01:07:08,480
your update. I see. And also for the log bit for every object. So since everything resides in

612
01:07:08,480 --> 01:07:13,599
memory and we have like 64 bits for the version number plus the log bit. So I'm assuming that it can

613
01:07:13,599 --> 01:07:18,480
fit in a single memory address, uh, but we can still have the problem of, let's say, like, the

614
01:07:18,480 --> 01:07:24,240
processor fetching that memory address into the register. Uh, and then maybe you have like a multi-core,

615
01:07:25,039 --> 01:07:30,800
uh, machine, then another core fetching that, uh, like that same address and then both of them

616
01:07:30,800 --> 01:07:36,080
flipping from zero to one. So, uh, so I'm assuming that there's some support from the hardware there.

617
01:07:36,080 --> 01:07:40,160
Yeah. So like I mentioned a little bit earlier, the primary one, it acquired, so the primary is

618
01:07:40,160 --> 01:07:46,400
actually involved, correct? In the, the primary on the, uh, in the, so the coordinator sends,

619
01:07:46,400 --> 01:07:52,880
so in the walk step, like this, this step, correct? Step one, the primary or the coordinator sends in,

620
01:07:53,840 --> 01:08:04,160
a right RDMA to the, to the primaries, asking the primaries to walk the, uh, object. And the

621
01:08:04,160 --> 01:08:11,360
primaries answer explicitly with a message that we reply. And so the crucial step that happens

622
01:08:11,360 --> 01:08:16,960
is that the primary one, it actually tries to get the walk. And that walk, uh, is set, is, you know,

623
01:08:16,960 --> 01:08:21,840
the reason this is a one single 64 bit number is so that you can use a test and set instruction,

624
01:08:21,840 --> 01:08:30,079
which is atomic, uh, to set the walk. So if two, uh, so there's never the case, like there's only

625
01:08:30,079 --> 01:08:34,720
a two test and set instruction run that it is exactly at the same time, one is going to win, the other's

626
01:08:34,720 --> 01:08:44,239
going to lose. I see. Thank you. And that's the crucial point, right? I've got a question

627
01:08:44,319 --> 01:08:53,359
about the blue cockpit point. Yeah. Um, wouldn't it? So should I, let me, uh, maybe it's better to actually,

628
01:08:54,159 --> 01:08:58,880
open a new slide to the picture again, and just, uh, instead of scribbling you the more over this,

629
01:08:59,439 --> 01:09:12,079
let me, uh, let's get one more picture so we can talk about other scenarios.

630
01:09:14,319 --> 01:09:22,479
A little bit bigger. I think it's actually doing that. Okay. Uh, so you're worried about, let me see.

631
01:09:23,599 --> 01:09:29,119
Yeah, the commit point between step after step two, but before step three. Yeah, so here, um,

632
01:09:29,119 --> 01:09:35,760
here's the decision correct here. Right. I can commit and then basically here's the actual commit point.

633
01:09:35,760 --> 01:09:41,439
Where? Okay. Um, yeah, I guess I was trying to think about the scenario where,

634
01:09:41,599 --> 01:09:50,559
when it'd be possible for a completely separate concurrence reaction, that writes only P3 to get

635
01:09:50,559 --> 01:09:58,960
entered, it's like start and complete in that space. And then wouldn't that, no, wouldn't be problematic.

636
01:09:59,519 --> 01:10:02,719
Yeah, it would be problematic, but it can't correct because when it writes, it's about to get the

637
01:10:02,720 --> 01:10:07,520
lock at some point. And when we get the lock, we check the version number and the lock bit.

638
01:10:10,000 --> 01:10:14,560
But does the read, does the read the P3 effect the version number in lock bit?

639
01:10:15,360 --> 01:10:23,360
No, no, no, it just gets the version number. But they've like, let me hold that question,

640
01:10:23,360 --> 01:10:27,280
if you're going to come back at this. And then we'll see what actually happens.

641
01:10:28,239 --> 01:10:29,519
All right. That's it. Thanks.

642
01:10:31,599 --> 01:10:37,920
Any other questions? This might be like a separate scenario, but what happens if, um,

643
01:10:39,119 --> 01:10:46,079
you know, after the execution phase, um, you know, it tries to acquire a lock and then crashes

644
01:10:46,079 --> 01:10:50,800
right after that. And the lock has been acquired, but no one else after that can acquire it.

645
01:10:52,000 --> 01:10:56,000
Yeah. Okay. So well, first of all, that machine disappears from the earth, correct? And the

646
01:10:56,079 --> 01:11:03,439
memory content is gone too. And, uh, and the whole recovery protocol that is described in the

647
01:11:03,439 --> 01:11:09,680
next section in the paper, it kicks in. And, uh, that protocol in the end will abort that transaction.

648
01:11:17,600 --> 01:11:19,199
So that actually will get cleaned up.

649
01:11:26,479 --> 01:11:32,560
Just another question. Uh, so here, like the coordinator is the client, right? Like it's the

650
01:11:32,560 --> 01:11:38,800
application. Yeah. Well, yeah, it is. Sure. Uh, and so the client is basically doing all the steps

651
01:11:38,800 --> 01:11:43,840
of like log value data. Yeah. Yeah. Yeah. So you could think about the application is running on

652
01:11:43,840 --> 01:11:49,359
the same set of 90 machines, right? And, you know, running this transaction, which apparently,

653
01:11:49,359 --> 01:11:57,279
you know, writes two objects are read one and runs the protocol. And so, uh, I guess what's

654
01:11:57,279 --> 01:12:02,799
confusing me is, so does the primary not communicate with the backup directly? It's the

655
01:12:02,799 --> 01:12:06,960
cool. No, it's actually indeed. Uh, the primary does not directly communicate with the backup.

656
01:12:07,759 --> 01:12:12,960
Hmm, nice. Other than doing the recovery protocol, there's all kinds of communication happening,

657
01:12:12,960 --> 01:12:22,399
but that's not shown here. So the coordinator just uses the configuration from the zookeeper.

658
01:12:22,399 --> 01:12:27,760
Yeah. Yeah. Yeah. Yeah. I gotta go back to this very first picture. Uh, and, you know, there's all

659
01:12:27,760 --> 01:12:32,079
kinds of stuff, you know, related to this, too, that I'm not talking about, uh, like this precise

660
01:12:32,079 --> 01:12:36,319
membership and all that kind of thing. Uh, but basically the zookeeper and the connection manager

661
01:12:36,319 --> 01:12:40,239
really decided, okay, well, this is the decision, the configuration, the current configuration we're

662
01:12:40,239 --> 01:12:45,199
running in, the user, the regions, how they're mapped, the primers and backups, and all that stuff.

663
01:12:46,559 --> 01:12:51,119
And if any failure happens, you know, there's a whole reconfiguration process going on and recovery.

664
01:12:53,359 --> 01:12:54,079
Let me see. Thank you.

665
01:13:00,800 --> 01:13:07,359
Okay. Uh, maybe I'm going to skip the breakout room. Uh, I guess I can go a little bit further.

666
01:13:08,159 --> 01:13:13,439
The question, you know, I want to answer the question that, uh, in the, that was asking the

667
01:13:13,439 --> 01:13:17,839
post in the lecture, and I'm going to, uh, as a lecture question, I'm just going to do that by

668
01:13:17,839 --> 01:13:22,639
talking about an example transaction. And this also comes to a really a question about, uh, you know,

669
01:13:22,639 --> 01:13:28,239
what happens, you know, two transactions run and it rent one version and then it commits, blah, blah, blah,

670
01:13:28,239 --> 01:13:34,399
all like all this stuff. So, uh, so these are really the topic here is going to do we get strict serializability.

671
01:13:37,359 --> 01:13:43,039
And what I'm going to do is like I'm not going to give you proof, you know, I'm getting strict

672
01:13:43,039 --> 01:13:46,399
rounds, I will be instead, but I'm going to do is I'm going to go walk from one of two examples,

673
01:13:47,519 --> 01:13:51,839
to give build up some intuition. And hopefully that intuition, you know, sort of convinced us,

674
01:13:51,839 --> 01:13:56,000
you know, that things might actually be fine. So let's, let's look at the following

675
01:13:56,000 --> 01:14:02,800
transaction, we have to pretend again. And this transaction is, you know, uh, like in the beginning,

676
01:14:02,800 --> 01:14:03,760
that reads an object,

677
01:14:08,640 --> 01:14:09,199
adds one,

678
01:14:13,199 --> 01:14:13,920
and then writes,

679
01:14:18,239 --> 01:14:24,159
the object, and commits, or ends, which commit my fail,

680
01:14:26,000 --> 01:14:32,239
for that's the transaction. And you know, we want to ask ourselves like what are the legal outcomes,

681
01:14:32,239 --> 01:14:34,159
right? What are the outcomes they're correct?

682
01:14:42,159 --> 01:14:44,960
Uh, so what are the possible outcomes of this transaction?

683
01:14:47,279 --> 01:14:52,399
What it could be the state of, let's say X started at zero and we're running two transactions,

684
01:14:52,399 --> 01:15:00,639
you know, T1 and T2. What are the possible outcomes that are fine?

685
01:15:04,079 --> 01:15:07,519
Um, either one of them could commit or both of them could commit.

686
01:15:08,239 --> 01:15:12,000
Yeah, and so we can have X2, correct, both commits.

687
01:15:13,279 --> 01:15:17,439
X is one, it's a possibility of one commits and you want another board to definitely true

688
01:15:17,439 --> 01:15:21,199
to run concurrently or something. And any other possible outcomes?

689
01:15:23,919 --> 01:15:29,519
Yeah, zero, if you know basically both aboard, right? Maybe there's a crash.

690
01:15:30,960 --> 01:15:36,799
Okay, so those are the free legal outcomes. Um, and so let's, we just make that the matured of this

691
01:15:36,799 --> 01:15:43,519
the case. So let's say T1 runs, and so does a read operation, it gets X back, maybe at version zero,

692
01:15:44,160 --> 01:15:52,080
same thing with T2, it reads, you know, uh, X is zero. Um, and so it gets basically to run

693
01:15:52,080 --> 01:15:56,640
truly concurrent. And you know, this is the question I think that sort of was asked in the

694
01:15:56,640 --> 01:16:03,840
locks, because we do a lock effects, we do a lock effects. And um, and here sort of the crucial step,

695
01:16:03,840 --> 01:16:10,400
correct? Because at this particular point, uh, we're trying to get the locks on object zero.

696
01:16:10,399 --> 01:16:17,759
And uh, can both succeed in reading, um, getting the lock X.

697
01:16:18,639 --> 01:16:21,599
Oh, and getting the lock, um, not at the same time.

698
01:16:22,239 --> 01:16:27,279
No, so one is going to, one is going to succeed, correct? And so let's say the first one succeeds

699
01:16:27,279 --> 01:16:35,359
and gets the lock, that means it can commit, right? So this guy will commit, um, and what happens

700
01:16:35,359 --> 01:16:40,479
with the second guy? Um, the second one, if it tries to obtain the lock at the same time,

701
01:16:40,479 --> 01:16:45,279
that the first one is holding the lock, it'll abort and stop. Um, if the first transaction goes

702
01:16:45,279 --> 01:16:50,559
through all the way and the lock is released, then it will obtain the lock and then check to see

703
01:16:50,559 --> 01:16:56,559
whether the version that it has for X is still correct. Um, and it will find that the version has been

704
01:16:56,559 --> 01:17:02,000
changed and then it will abort. Yep, you have to get this exactly the, the two, the two cases.

705
01:17:02,000 --> 01:17:05,359
And so let me talk about the validation case in the, in the second book of slight,

706
01:17:05,359 --> 01:17:09,760
you different example to make it more interesting. Uh, but this is basically the outcome, correct?

707
01:17:11,520 --> 01:17:16,239
Good. And so, uh, even though these transactions mean this particular picture ran, you know,

708
01:17:16,239 --> 01:17:21,920
exactly at the same time, uh, they're actually getting ordered and one wins and the other one loses.

709
01:17:21,920 --> 01:17:26,640
And that means that the other one that lost can run again. It will run, then read our X is one

710
01:17:26,640 --> 01:17:29,840
and then hopefully succeed in the retry. Okay?

711
01:17:32,720 --> 01:17:45,279
Okay, so, um, uh, okay, let me do one example and then I'll stop in a resume on, uh, on, on, on,

712
01:17:45,279 --> 01:17:51,680
Thursday. Uh, what time is it's 24? Let me show you, just stop here and then, uh, I'll do a second

713
01:17:51,680 --> 01:17:58,640
example that, uh, that answers that earlier question, uh, on, on, on, on Thursday and, uh, also talk about

714
01:17:58,640 --> 01:18:02,320
full tolerance. Uh, I don't know when we're in too much overtime.

715
01:18:04,000 --> 01:18:10,000
Uh, anybody that has to go, you feel free to go. Uh, and I'll see you on Thursday. Uh, anybody

716
01:18:10,000 --> 01:18:15,119
who has, would like to ask more questions, you know, please say that, feel free to stay and I'll

717
01:18:15,119 --> 01:18:21,520
try to start the best to answer that. As you see, this is a complicated paper. Uh, and, you know,

718
01:18:21,520 --> 01:18:24,640
I'm glad that we're going out, we're able to go and sort of depth, you know, trying to really

719
01:18:24,640 --> 01:18:29,039
understand at least the, the, the protocol for normal operation.

720
01:18:32,480 --> 01:18:36,800
So, let that time, just like when I finished this lecture and you know, see your first thing,

721
01:18:36,800 --> 01:18:38,640
or if you have any questions, please hang around.

722
01:18:40,720 --> 01:18:49,920
Uh, I had to, like, the hell of a question, it's fun. Was, um, this, this whole hardware structure

723
01:18:50,000 --> 01:18:55,680
that they're using, would it be useful at all if you're using it with pessimistic concurrency control?

724
01:18:57,039 --> 01:19:00,880
Yes. Maybe, you know, I'm sure you can make the pessimistic concurrency pro also better because

725
01:19:00,880 --> 01:19:05,760
you're like, your RPCs are just cheaper, correct? Uh, but the real thing, and I haven't gotten,

726
01:19:05,760 --> 01:19:11,119
I haven't been able to point this out yet, but I was planning to, but I can do now, uh, is if you

727
01:19:11,119 --> 01:19:17,279
look at the read-only transactions here, so read-only transactions. So if you're a transaction,

728
01:19:17,279 --> 01:19:20,479
the basically only read-only objects were multiple objects.

729
01:19:24,800 --> 01:19:28,000
What's the performance? How good is that? Like, how well is that going to perform?

730
01:19:30,479 --> 01:19:34,880
Um, probably pretty well since you only do the one-sided.

731
01:19:35,439 --> 01:19:40,800
Yeah, correct. So if you look at the object that is stored at, uh, reaching free, correct,

732
01:19:40,800 --> 01:19:44,880
which is the object that's being read, the only thing that happens is one-sided reads.

733
01:19:48,239 --> 01:19:49,920
Or one-sided RBMA, correct?

734
01:19:51,439 --> 01:20:01,039
Uh, and there's no, uh, rights, uh, nothing at all. Uh, so, uh, those, uh, because of the, uh, this,

735
01:20:02,639 --> 01:20:06,079
because the read-occurations don't require walks. There's nothing to be written.

736
01:20:07,359 --> 01:20:11,439
Only thing that needs to happen is this validation step, which is also the one-sided RBMA.

737
01:20:12,079 --> 01:20:15,279
So read-only transactions can just run with two one-sided RBMAs.

738
01:20:16,239 --> 01:20:18,800
Um, and that's where the big one comes from.

739
01:20:19,439 --> 01:20:23,679
And, and the reason that that big point is there is because of the optimistic concurrency control.

740
01:20:24,319 --> 01:20:29,759
So I think basically to exploit RBMA's sort of tools foolish, foolish, and I'm trying to make

741
01:20:29,759 --> 01:20:36,239
read-only transactions really, really fast, um, uh, they got, went to optimistic concurrency control.

742
01:20:38,399 --> 01:20:43,840
Okay, I see, I see. It makes sense. I met a question about, but security is

743
01:20:44,800 --> 01:20:51,039
this thing is it going to be secure if it's, um, I guess the, someone already asked about this, but

744
01:20:51,920 --> 01:20:57,119
the part where the neck just reads memory, it seems a little scary, so.

745
01:20:57,119 --> 01:21:01,279
Yeah, yeah, yeah, yeah, it is. It's a long and scary, right? Uh, and so there, there's, there's some

746
01:21:01,279 --> 01:21:06,800
large of interaction, uh, between, you know, when the RBMA connection is set up, uh, the operating system

747
01:21:06,800 --> 01:21:13,039
and the application. So the operating system won't allow, you know, the neck to right to any

748
01:21:13,119 --> 01:21:18,159
arbitrary location. It will tell it, you know, you're the addresses, you hear the, uh, VM,

749
01:21:18,159 --> 01:21:22,960
their delivery addresses that you can write to. Okay, so you can make that

750
01:21:23,680 --> 01:21:31,199
production. Yeah, okay, okay, okay, okay, okay. I think about the performance. Yep. So if you have,

751
01:21:31,199 --> 01:21:38,239
so the reads are quick because of the one-sided RBMA's. Yep. But if you have a lot of rights

752
01:21:38,239 --> 01:21:45,199
happening, like a lot of data and contention, um, yes, or no, correct? Like what happens if you

753
01:21:45,199 --> 01:21:53,359
have contention? Actually, we saw this in this particular case, correct? Yeah, and we have a lot

754
01:21:53,359 --> 01:22:00,239
of contention, one of the transactionable abort. So this is really good for transactions that don't

755
01:22:00,239 --> 01:22:06,479
contente or not writing through the same records or same objects. And even the reads, right?

756
01:22:07,439 --> 01:22:09,839
Yeah, even the reads, right? Because the version numbers might change.

757
01:22:13,199 --> 01:22:16,079
So what's like the main, um, I guess, use case for...

758
01:22:17,039 --> 01:22:20,959
There's a lot of, okay, so there's a lot of studies independent of this paper about

759
01:22:20,959 --> 01:22:26,879
pessimistic versus optimistic concurrency control. And, you know, clearly from the two benchmarks

760
01:22:26,879 --> 01:22:32,879
that they use in the paper, like TPCC and TATP, there's not a lot of, not a lot of conflicts.

761
01:22:32,880 --> 01:22:39,279
So the transactions are submitted maybe by different users or different clients and they basically

762
01:22:39,279 --> 01:22:51,600
touch different tables. So I have a question, if there's multiple clients doing transactions

763
01:22:51,600 --> 01:22:59,920
on the same objects, how... So they want to do a right RDMA, right? To the log.

764
01:23:00,079 --> 01:23:07,440
Is it possible that there will be like a conflict, like, you know, like one of them will write over

765
01:23:07,440 --> 01:23:14,319
the other log or... No, no, no, no, there's one log per pair. One log per pair. So every...

766
01:23:14,319 --> 01:23:22,480
This is a joke of the reason why. And then, but in the transactions, like, time, is it like,

767
01:23:22,480 --> 01:23:28,560
you know, like to provide serializability? Is it timed based on what?

768
01:23:29,280 --> 01:23:34,160
On the version numbers. There's nothing like true time or anything like that here.

769
01:23:35,039 --> 01:23:39,680
These logical numbers, like in same way as in Latvian, where you have logical sequence numbers

770
01:23:40,640 --> 01:23:45,360
for implementing your T-value store. The version numbers play a good play the same role.

771
01:23:45,839 --> 01:24:01,920
Well, if two transactions got the same number, then only the one that got to the command point first

772
01:24:01,920 --> 01:24:08,479
is going to get... This is this case, right? One will board, the other ones will succeed.

773
01:24:08,479 --> 01:24:17,199
If there's a message queue that is basically established between every pair,

774
01:24:17,839 --> 01:24:22,079
then how do you know... So then you would have multiple message queues.

775
01:24:22,879 --> 01:24:27,919
Like in primary. How do you know which order to read those in? So you don't read them out of order.

776
01:24:31,119 --> 01:24:35,119
There is... You read all the messages from one source in the same order,

777
01:24:35,279 --> 01:24:39,439
because they're all going to be in one queue. So one source writes to one queue.

778
01:24:40,800 --> 01:24:48,000
Multiple machines might write, you know, concurrently, to different queues. You don't know what the order

779
01:24:48,000 --> 01:24:52,720
anyway is. So it couldn't affect the correctness of the protocol.

780
01:24:54,239 --> 01:24:58,880
I see. So we don't rely on the orderings of the incoming concurrent messages.

781
01:24:58,880 --> 01:25:02,640
That's correct. You know, you pull them in some order and then you pull the queues in some order,

782
01:25:02,640 --> 01:25:05,039
and that's the way that they're going to be processed.

783
01:25:06,960 --> 01:25:13,520
Got it. I also have one more specific question. There's a part where there's a paper that

784
01:25:13,520 --> 01:25:21,920
it provides lock-free reads, which we've just talked about. But it also provides locality hints,

785
01:25:21,920 --> 01:25:27,360
which enable programmers to correlate related objects on the same set of machines.

786
01:25:27,360 --> 01:25:31,760
Yeah. And I did not understand that the latter part of the sentence.

787
01:25:33,200 --> 01:25:37,920
Okay, so I have to look up the details what it is, but I think what it's referring to is that if you,

788
01:25:38,720 --> 01:25:42,640
if you objects are all kinds of different regions, right, like let's look at this picture here,

789
01:25:43,280 --> 01:25:48,320
then you would have to talk to lots of different primaries, right? So if you're like, you're object 1,

790
01:25:48,320 --> 01:25:53,760
you know, it's in this primary, object 2 is in this primary, and if you're touching many of the

791
01:25:53,760 --> 01:25:57,760
city, if you're touching always a cluster of objects together, it would be nice if that cluster of

792
01:25:57,760 --> 01:26:02,160
objects is all at the same primary. So if you only have to contact one primary instead of many,

793
01:26:03,600 --> 01:26:06,560
I see. Thank you.

794
01:26:13,119 --> 01:26:14,240
Any further questions?

795
01:26:18,400 --> 01:26:23,680
So this, so farms are not really suitable for long transactions, right?

796
01:26:25,200 --> 01:26:27,200
Because of the misinterference.

797
01:26:27,200 --> 01:26:30,000
Yeah, you're more of the longer transactions that you get complex.

798
01:26:30,319 --> 01:26:39,439
I mean, it also is assuming, I guess, read only transactions since we're really optimized for them, right?

799
01:26:39,439 --> 01:26:44,079
Yeah, absolutely. And many of the transactions that people have done studies and, you know,

800
01:26:44,079 --> 01:26:49,039
and you saw them in the spare paper too, correct? We're a long fraction of the transactions are read only

801
01:26:49,039 --> 01:26:55,199
transactions. But that's clearly a property of the workload.

802
01:27:02,079 --> 01:27:08,479
I think going to have asked my earlier question, I think I realized I was misunderstanding

803
01:27:09,439 --> 01:27:17,600
basic about strict serializability. Is it so strict? Okay, so here's a situation.

804
01:27:19,199 --> 01:27:22,560
Say there's one transaction that begins first that writes,

805
01:27:23,439 --> 01:27:25,920
shard one, shard two, and read shard three.

806
01:27:27,680 --> 01:27:32,000
So that begins like first at time. Okay, write, write, object,

807
01:27:33,359 --> 01:27:39,439
zero, write, zero, write x at zero, write y at zero, and then read z.

808
01:27:40,159 --> 01:27:48,239
Okay, read zero. And then say there's the second transaction that begins after

809
01:27:48,239 --> 01:27:54,319
transaction one has started. You know, like here? Yeah, and it writes z.

810
01:27:55,679 --> 01:27:59,199
So before it writes you, there must have read z, char.

811
01:28:00,159 --> 01:28:03,759
Yeah, and so, read z, what version number does it read?

812
01:28:04,400 --> 01:28:08,880
The same one, two, one.

813
01:28:10,880 --> 01:28:13,199
And then say it reads, then it tries to write z.

814
01:28:15,440 --> 01:28:19,680
Yep. And then say t2 commits before t1 commits.

815
01:28:24,079 --> 01:28:25,680
Yes, okay, so this commits, yeah.

816
01:28:26,560 --> 01:28:28,960
And then t1 commits after t2 commits.

817
01:28:29,039 --> 01:28:33,439
Or we'll try to commit, correct? And now we'll start doing this whole, the whole lock,

818
01:28:33,439 --> 01:28:39,920
the validation, blah, blah, blah, correct? So before, before, so what's going to happen,

819
01:28:39,920 --> 01:28:43,680
correct? Is you know, I was going to get to do this example. That's an example that I'm

820
01:28:43,680 --> 01:28:48,800
saving for next lecture, but yeah, basically a bit happens, correct? z will be good,

821
01:28:48,800 --> 01:28:53,920
z will be good at one. At this point, the z will be a version one, correct?

822
01:28:54,560 --> 01:28:57,439
So the validation phase will run after the commit. That's what you said.

823
01:28:58,000 --> 01:29:03,519
Right. And so here's a validation of z. And you know, it has zero, correct?

824
01:29:03,519 --> 01:29:06,559
And then that was one and will this rejection will be a board?

825
01:29:07,279 --> 01:29:13,119
Okay, so this is what I was wondering about then. So because after the validation phase passes,

826
01:29:13,119 --> 01:29:19,519
there's a period of time, after the validation phase passes, a period of time passes,

827
01:29:19,519 --> 01:29:25,679
the data commits. What if this validation happened before t2 committed? So it still saw the old

828
01:29:25,760 --> 01:29:30,320
version number? It cannot happen because the after the validation,

829
01:29:33,280 --> 01:29:38,240
after the commit has completed, correct? The commit backup, you know, has recorded,

830
01:29:38,240 --> 01:29:44,240
and the primary after more have made to change. Before the application is returned,

831
01:29:44,240 --> 01:29:46,560
before the after made returns, the energy has been updated.

832
01:29:46,560 --> 01:29:57,760
I guess what I'm saying is isn't it possible for t1's validation phase to happen before,

833
01:29:58,800 --> 01:30:04,080
I guess maybe what I'm trying to say is isn't it possible that t2's commit happens between

834
01:30:04,080 --> 01:30:10,080
t1's validate? It happens after t1's validate, but before t1's commit?

835
01:30:10,720 --> 01:30:17,039
Clearly, there's a risk and there must be excluded.

836
01:30:21,519 --> 01:30:28,000
And it's excluded. So you're worried, let me construct this case and maybe I'll come back

837
01:30:28,000 --> 01:30:31,920
to you next week when we're going to talk anyway. But I think you're worried about

838
01:30:32,399 --> 01:30:36,480
let's see if we can get the picture back. Years over years, we did.

839
01:30:39,359 --> 01:30:45,279
This guy committed, so he was basically doing the commit phase, correct? This is t1.

840
01:30:46,800 --> 01:30:57,680
After t2, actually, that's a t2. So t2 is about doing is here, correct? And then t1 is coming in

841
01:30:58,240 --> 01:31:08,400
before everything happens before t2 is finished, so t1's validation also comes in here.

842
01:31:09,920 --> 01:31:11,920
Okay, let me rewrite it and then we'll get back to you.

843
01:31:11,920 --> 01:31:15,360
Okay, I'll read it through this. This is exactly what I wanted to talk about.

844
01:31:15,360 --> 01:31:16,800
Okay, all right, thank you.

845
01:31:18,240 --> 01:31:23,680
Just make sure you're asking about t2 being like in between stage 2 and 3 of 2 on.

846
01:31:23,920 --> 01:31:25,440
Yeah, exactly.

847
01:31:26,880 --> 01:31:33,360
But in that case, then t2, we could we could serialize it as t2 coming in before t1, right?

848
01:31:33,360 --> 01:31:33,600
Yep.

849
01:31:35,520 --> 01:31:42,400
So let's get back to this on first. I have an example of where this is going to go over top of it.

850
01:31:46,560 --> 01:31:52,560
Sorry, in the validation stage, you just read the version number.

851
01:31:52,560 --> 01:31:53,440
Yep.

852
01:31:58,240 --> 01:32:01,920
And serializability allows us to reorder transactions.

853
01:32:01,920 --> 01:32:05,840
Yeah, but strict serialization will not, correct? Like even if it's injection,

854
01:32:05,840 --> 01:32:10,240
strict serializer requires that even transaction starts if somebody asks somebody committed,

855
01:32:10,240 --> 01:32:12,480
that transaction is also committed after that transaction.

856
01:32:14,160 --> 01:32:14,480
Right.

857
01:32:15,200 --> 01:32:18,480
With this vertical guarantee, because of the version number.

858
01:32:18,879 --> 01:32:20,639
Got it. Thank you.

859
01:32:21,839 --> 01:32:31,439
But strict serializability doesn't, if like if t2 ends, it's not enough for t1 that end after t2 ends.

860
01:32:32,319 --> 01:32:38,000
t1 had to have started or maybe I need to think about this more, but I think that was this is

861
01:32:38,000 --> 01:32:42,559
always stripping me up. There's also a rule about when the transaction starts.

862
01:32:42,559 --> 01:32:46,000
Yeah, well, what happens in real life, right?

863
01:32:46,000 --> 01:32:50,479
But there's actually starts with some particular point of time. And basically if t1,

864
01:32:51,600 --> 01:32:53,680
if t2 starts after t1 commits,

865
01:32:56,239 --> 01:33:02,479
right. So then it must be the case that t2 of yours, you know, t2, t1's changes.

866
01:33:02,479 --> 01:33:03,680
That's strict serializability.

867
01:33:04,640 --> 01:33:09,520
Right. But what happens to t2 starts and commits solely within

868
01:33:10,159 --> 01:33:12,640
then it's a concurrent transaction and either outcome is fine.

869
01:33:12,880 --> 01:33:13,199
Okay.

870
01:33:13,840 --> 01:33:15,760
I think the answer is for your call.

871
01:33:15,760 --> 01:33:16,559
Yeah, yeah, yeah.

872
01:33:16,559 --> 01:33:18,239
Yeah. I think that's what I was going to use about.

873
01:33:19,760 --> 01:33:26,159
One day, literally when t2 starts before t1 commits, it's considered a concurrent transaction.

874
01:33:27,279 --> 01:33:33,119
And so t1 or t2 can observe or can even be ordered before either app doesn't matter.

875
01:33:33,119 --> 01:33:35,840
Okay. Okay. Okay. Thank you.

876
01:33:35,840 --> 01:33:38,079
I think it's also the answer to your example.

877
01:33:38,079 --> 01:33:40,159
Right. Right. Okay. Thank you.

878
01:33:40,559 --> 01:33:42,479
Okay. We're having a hub. We got it anyway already.

879
01:33:44,239 --> 01:33:49,599
You're saying if t2 start is like between the t1 starting to commit, right?

880
01:33:49,599 --> 01:33:50,239
Yeah.

881
01:33:50,239 --> 01:33:53,439
Like, then you know, we can we can go for it more after. It doesn't matter.

882
01:33:53,439 --> 01:33:54,000
Okay.

883
01:33:55,760 --> 01:33:58,000
Oh, can I ask a logistics question?

884
01:33:58,800 --> 01:34:03,840
Are ever in success, oh, a one, you post these slides too?

885
01:34:05,199 --> 01:34:07,359
Yes. I mean, yeah, yeah, I didn't do that here.

886
01:34:07,679 --> 01:34:10,719
Uh, you'd like to be on the website?

887
01:34:11,279 --> 01:34:15,759
I think slides are useful if if you just need to like look at the slides,

888
01:34:15,759 --> 01:34:17,599
and you need to like scroll through the video.

889
01:34:18,159 --> 01:34:20,880
Okay. Um, I'm going to be the first asking.

890
01:34:20,880 --> 01:34:22,559
So this is why I haven't done it.

891
01:34:22,559 --> 01:34:23,519
Okay.

892
01:34:23,519 --> 01:34:25,439
Yeah. Yeah. I'm happy to do it.

893
01:34:25,439 --> 01:34:26,960
I do save them all.

894
01:34:29,679 --> 01:34:30,639
Thank you so much.

895
01:34:30,639 --> 01:34:31,119
Thank you.

896
01:34:31,119 --> 01:34:32,719
That was that was a fun lecture.

897
01:34:32,719 --> 01:34:33,039
Thanks.

