---
title: CMU15445 P22F202321 IntrotoDistributedDatabases
---

1
00:00:00,000 --> 00:00:22,839
a

2
00:00:22,839 --> 00:00:24,379
A

3
00:00:24,379 --> 00:00:26,379
Hey, let's get started!

4
00:00:26,379 --> 00:00:29,379
Give it up, two bass locking.

5
00:00:29,379 --> 00:00:32,379
I'm back.

6
00:00:32,379 --> 00:00:33,379
Yeah.

7
00:00:33,379 --> 00:00:35,379
Yeah guys, I've been going for a while.

8
00:00:35,379 --> 00:00:36,379
How you doing?

9
00:00:36,379 --> 00:00:37,379
I'm doing well for you.

10
00:00:37,379 --> 00:00:39,379
My first wife gave me COVID.

11
00:00:39,379 --> 00:00:41,379
She betrayed me, so that sucked.

12
00:00:41,379 --> 00:00:47,379
But while Jines was teaching, we spent a lot of time writing papers and grants and things like that.

13
00:00:47,379 --> 00:00:50,379
So your show has been crushing us and I've been hearing.

14
00:00:50,379 --> 00:00:51,379
Yeah.

15
00:00:51,379 --> 00:00:52,379
And how was your girlfriend?

16
00:00:52,380 --> 00:00:58,380
She was the last taken show that she wanted to find out who was giving flowers and was abby matter.

17
00:00:58,380 --> 00:00:59,380
And I also met her.

18
00:00:59,380 --> 00:01:00,380
She's still pissed?

19
00:01:00,380 --> 00:01:01,380
Yeah.

20
00:01:01,380 --> 00:01:03,380
I know she's trying to get to the bottom of it.

21
00:01:03,380 --> 00:01:04,379
Yeah.

22
00:01:04,379 --> 00:01:05,379
I mean, it's on you, you have to handle it.

23
00:01:05,379 --> 00:01:08,379
What do you mean it's on me?

24
00:01:08,379 --> 00:01:11,379
I mean, it's on you, gave me this gig sometimes.

25
00:01:11,379 --> 00:01:12,379
Okay, there's that.

26
00:01:12,379 --> 00:01:13,379
Yeah, yeah, yeah.

27
00:01:13,379 --> 00:01:15,379
All right guys, let's get started.

28
00:01:15,379 --> 00:01:17,379
I'm going to get the right slides.

29
00:01:17,379 --> 00:01:19,379
So, again, administrative stuff.

30
00:01:19,379 --> 00:01:20,379
Homework 5 is out.

31
00:01:20,379 --> 00:01:23,379
It's going to be due on December 3rd.

32
00:01:23,379 --> 00:01:25,379
And then, so that's in two weeks.

33
00:01:25,379 --> 00:01:26,379
Project 4 is out.

34
00:01:26,379 --> 00:01:28,379
That'll be due on December 10th.

35
00:01:28,379 --> 00:01:35,379
And we'll be announcing the info session for that on PSO, I think, this week.

36
00:01:35,379 --> 00:01:38,379
And then, on the last week of class, it's going to be two special lectures.

37
00:01:38,379 --> 00:01:41,379
So we're going to have Sunday from single store, come on over in Zoom.

38
00:01:41,379 --> 00:01:44,379
I'm going to talk about the single store database system.

39
00:01:45,379 --> 00:01:50,379
They're going to have a heavy emphasis on LLM's or vector database stuff that they're building in single store.

40
00:01:50,379 --> 00:01:51,379
Again, that'll be over Zoom.

41
00:01:51,379 --> 00:01:53,379
So we don't have to come here for that.

42
00:01:53,379 --> 00:01:54,379
So please, please attend that.

43
00:01:54,379 --> 00:02:00,379
And then, on the very last day of the class on Wednesday, December 6th, we're going to do the final exam review.

44
00:02:00,379 --> 00:02:04,379
But then we're also going to do something we'll call the system speed run.

45
00:02:04,379 --> 00:02:12,379
So I'll post a form on Piazza, go select or go put in what are some like some databases that we don't really cover during this semester that you want to learn about.

46
00:02:13,379 --> 00:02:19,379
We're trying to cover 10, maybe like, it's 120 minutes, we'll cover like one database in 10 minutes or like a crash course.

47
00:02:19,379 --> 00:02:20,379
Here's what the system does.

48
00:02:20,379 --> 00:02:21,379
Here's why it's interesting.

49
00:02:21,379 --> 00:02:23,379
Here's why it matters or here's why it's stupid.

50
00:02:23,379 --> 00:02:25,379
We're trying to get through as many systems as we can.

51
00:02:25,379 --> 00:02:26,379
Okay?

52
00:02:26,379 --> 00:02:30,379
So every year, it's always like Mongo's number one, Spanners number two.

53
00:02:30,379 --> 00:02:38,379
But if you guys want to do something we're challenging, again, we'll look at, I'll send a link to the DBVIO, pick any random stuff that you want.

54
00:02:38,379 --> 00:02:39,379
Okay?

55
00:02:39,379 --> 00:02:41,379
And then the final exam has been scheduled.

56
00:02:41,379 --> 00:02:45,379
I don't know where, but it's going to be on Tuesday, December 12th at 8.30 a.m.

57
00:02:45,379 --> 00:02:52,379
Again, if you need any accommodations or if you have three exams scheduled in a 25 hour period, according to your super-politees,

58
00:02:52,379 --> 00:02:56,379
email, jignesh, and myself, and we'll re-scatch you for the makeup exam.

59
00:02:56,379 --> 00:02:57,379
Okay?

60
00:02:57,379 --> 00:02:59,379
Any questions about any of these things?

61
00:03:01,379 --> 00:03:05,379
All right. So then for the seminar series to have this semester, we have two last talks.

62
00:03:05,379 --> 00:03:09,379
The talk today is actually super exciting. We're going to have somebody from Amazon talk about PG Vector.

63
00:03:09,379 --> 00:03:15,379
PG Vector is the most popular vector extension for Postgres.

64
00:03:15,379 --> 00:03:20,379
So you don't need to use VBA or Millevis or Pine Cone.

65
00:03:20,379 --> 00:03:23,379
You can do some of those operations directly inside of Postgres.

66
00:03:23,379 --> 00:03:24,379
So they'll talk about how that works.

67
00:03:24,379 --> 00:03:30,379
And then next week will be a, the last talk will be a new database startup at a San Francisco called Chroma.

68
00:03:30,379 --> 00:03:33,379
That is again, it was one of these specialized vector databases.

69
00:03:33,379 --> 00:03:36,379
Okay? Again, all that's over zoom.

70
00:03:36,379 --> 00:03:47,379
All right. So at this point in this semester, we've covered everything you need to know at a high level of how to build a single known database system.

71
00:03:47,379 --> 00:03:52,379
Right? We covered, like, if the lowest level at the storage layer, we talked about how to bring things in that memory.

72
00:03:52,379 --> 00:03:58,379
We talked about how to actually run queries, do query planning, take a SQL query, and turn it into an actual physical plan.

73
00:03:58,379 --> 00:04:02,379
And then we went back across the entire stack and now then we add a recovery.

74
00:04:02,379 --> 00:04:10,379
So we're going to have to handle through Redhead logging or other methods to be able to recover the database after a crash.

75
00:04:10,379 --> 00:04:15,379
We're talking about how to have multiple transactions run at the same time and update the database through concurrency troll.

76
00:04:15,379 --> 00:04:18,379
All that, everything, you know, these topics here.

77
00:04:18,379 --> 00:04:25,379
Again, we didn't go too deep in any one thing, but this is basically what you need to build a single node database system.

78
00:04:25,379 --> 00:04:30,379
So at this point in this semester, we're going to build on public we've done so far and now we're talking about distributed databases.

79
00:04:30,379 --> 00:04:35,379
Right? It's hard enough to build a single node database by itself. It's even harder to build a distributed one.

80
00:04:35,379 --> 00:04:41,379
All right? And there's be a bunch of these different design traditions we're going to have to make about how we want these different notes to coordinate with each other.

81
00:04:41,379 --> 00:04:47,379
How they're going to talk to each other and how they're going to work together to execute queries, execution, actions.

82
00:04:48,379 --> 00:04:52,379
And so like, you know, you could have things come from the top and coordinate some messages to the top.

83
00:04:52,379 --> 00:04:59,379
You can go through the bottom, you can go through the middle, right? There's all these different design choices you could have of how you had a build a distributed database system.

84
00:04:59,379 --> 00:05:04,379
But at its core, it's been doing all the things that we talked about this semester.

85
00:05:04,379 --> 00:05:08,379
Right? There's still going to be a disk. You still got to read things, you know, in a buffer pool.

86
00:05:08,379 --> 00:05:13,379
But now when you run a query, are you going to send messages to another node to run part of the query over there?

87
00:05:13,379 --> 00:05:18,379
Should you pull data from that they have or is there a central location you can go get data from?

88
00:05:18,379 --> 00:05:24,379
And so we only have three classes to discuss distributed databases. So obviously this is going to be a crash course in this topic.

89
00:05:24,379 --> 00:05:36,379
But again, hopefully what you'll get out of this is a way to assess real-world systems because you understand the vernacular vocabulary of what these systems are talking about and how they're implemented.

90
00:05:36,379 --> 00:05:42,379
And that'll help you make different design decisions when you, you know, if you ever want to build one yourself or need to start using one in the real world.

91
00:05:42,379 --> 00:05:54,379
Okay? So we showed this slide early in the semester where we discussed parallel query execution that we made this distinction between parallel database systems and distributed databases.

92
00:05:54,379 --> 00:05:59,379
Right? We said the parallel databases are ones where the nodes are physically close to each other.

93
00:05:59,379 --> 00:06:11,379
Like think of like different CPUs, sockets of different CPUs that are running different different different the sort of the running separate instances of the database system and they communicate over some high speed interconnect.

94
00:06:11,379 --> 00:06:17,379
Or they're running in like the same rack and it looks like just one giant shared machine. Right?

95
00:06:17,379 --> 00:06:25,379
So the big thing about in a parallel database system is that we're going to assume that the communication cost is going to be small.

96
00:06:25,379 --> 00:06:30,379
Like nanoseconds or microseconds to send a message from one worker to another.

97
00:06:30,379 --> 00:06:34,379
And they're also going to assume that the communication is reliable.

98
00:06:34,379 --> 00:06:43,379
Meaning like if I send a message to another thread, that thread is going to get that you can modulo any like software errors, but like it's not the message that it's not going to get disappeared.

99
00:06:43,379 --> 00:06:48,379
Right? But now in the distributed database system world, we can't make those assumptions.

100
00:06:48,379 --> 00:06:55,379
We can't assume that the nodes are going to be close to each other. We can't assume that one node or one worker talking to another worker is cheap.

101
00:06:55,379 --> 00:07:03,379
Right? Because you can either be in, you know, ideally in the same rack, but maybe you're in the same data center, but the same different availability zone.

102
00:07:03,379 --> 00:07:09,379
Or the worst case scenario is that you're in completely two different data centers and one database node is on the other opposite and the planet.

103
00:07:09,379 --> 00:07:16,379
Now you're, you're restricted by speed of light issues, which you can't, you know, there's no magic want to make that go away.

104
00:07:16,379 --> 00:07:24,379
So the other, so in addition to the communication between nodes being expensive, communication could be unreliable.

105
00:07:24,379 --> 00:07:34,379
Right? TCP IP will help a bunch of things make sure that the pack is end up in order, but there's no guarantee that if we send a message that the other side actually going to get it.

106
00:07:34,379 --> 00:07:41,379
Right? Or it might get it in different orders. Right? Not because the network is severed, but like say the node itself starts doing something weird.

107
00:07:41,379 --> 00:07:45,379
Like it says it's a Java based database system and then the garbage collector kicks in.

108
00:07:45,379 --> 00:07:49,379
So there's like, you know, a 30 second pause because it's cleaning up the heat.

109
00:07:49,379 --> 00:07:52,379
But now the node looks on, on, on available.

110
00:07:52,379 --> 00:07:56,379
And now messages might, and when it flips back on messages might show up in different orders.

111
00:07:56,379 --> 00:08:01,379
So all these reasons, you know, that we have to account for all these things in our, in our distributed database system.

112
00:08:01,379 --> 00:08:08,379
We can assume the hardware is going to hide it for us in the same way we can for parallel databases.

113
00:08:08,379 --> 00:08:15,379
So this is just repeating what I said before, but we can use all the building blocks of a single data system that we, that we've constructed so far.

114
00:08:15,379 --> 00:08:24,379
And now we can, we can layer on top of that and say, OK, here's how we want to distribute the execution across multiple physical nodes.

115
00:08:24,379 --> 00:08:30,379
Right? And we can do this for all TV systems, like running transactional workloads and for analytical workloads.

116
00:08:30,379 --> 00:08:33,379
So today's class is going to be a high level of like, here's what a distributed database looks like.

117
00:08:33,379 --> 00:08:35,379
Here's the things that you have to worry about.

118
00:08:35,379 --> 00:08:41,379
Then next class after the break will be entirely about distributed transaction systems.

119
00:08:41,379 --> 00:08:44,379
And then we'll cover distributed old lab systems or analytical systems.

120
00:08:44,379 --> 00:08:48,379
And 721 next semester will be entirely on analytical systems.

121
00:08:48,379 --> 00:08:52,379
So in a distributed environment, everything is just harder.

122
00:08:52,379 --> 00:08:55,379
Optization and query planning, that was hard enough on a single note.

123
00:08:55,379 --> 00:09:02,379
It's even harder in a distributed system because now you have, you may not be sure what data is actually at another node.

124
00:09:02,379 --> 00:09:05,379
Or how, how fast can you communicate between them?

125
00:09:05,379 --> 00:09:08,379
Currents you told will be the hardest part of all this.

126
00:09:08,379 --> 00:09:14,379
How do we make sure that the different nodes that are involved in a transaction, all the grids that a transaction can commit.

127
00:09:14,379 --> 00:09:18,379
Then when we say yes, let's go commit, they all actually did that.

128
00:09:18,379 --> 00:09:25,379
Right? It's basically a distributed state machine if you take in distributed algorithms, distributed systems.

129
00:09:25,379 --> 00:09:34,379
And then logging recovery again, how do we make sure that if a, if one of our nodes in our system crashes, ideally we don't want that, that to take down our entire system.

130
00:09:34,379 --> 00:09:42,379
Right? For distributed databases like 20 nodes and one of them goes down, we don't want the other 19 to be completely locked until that thing comes back up.

131
00:09:42,379 --> 00:09:45,379
Because it might never come back up. Right?

132
00:09:45,379 --> 00:09:48,379
So again, we'll touch on all these things as we go along.

133
00:09:48,379 --> 00:09:50,379
We won't really talk about query optimization too much.

134
00:09:50,379 --> 00:09:53,379
We'll talk a little bit about it next week.

135
00:09:53,379 --> 00:10:00,379
All right. So for today's class, we're going to first talk about the high level overview of what the other distributed system architecture could look like in a context of databases.

136
00:10:00,379 --> 00:10:04,379
Then we'll talk about the design issues we have to worry about when we actually implement one of these things.

137
00:10:04,379 --> 00:10:10,379
Then we'll talk about how we want to partition our database so we can split it up across multiple nodes.

138
00:10:10,379 --> 00:10:13,379
Again, we talked a little bit about that when we talked about parallel execution.

139
00:10:13,379 --> 00:10:17,379
And then we'll give a preview of why the shipping concurrentials hard.

140
00:10:17,379 --> 00:10:21,379
And that'll be a segue into what we discuss next week.

141
00:10:21,379 --> 00:10:24,379
Okay? Okay.

142
00:10:24,379 --> 00:10:26,379
So let's start from the basics.

143
00:10:26,379 --> 00:10:37,379
So, a distributed database in architecture is going to basically define where the resources are that are going to be available to the CPUs.

144
00:10:37,379 --> 00:10:40,379
Again, we're assuming a bottom-known architecture.

145
00:10:40,379 --> 00:10:46,379
There's things on disk, we bring it to the memory, and then there's a CPU that uses that memory to execute instructions and process data.

146
00:10:46,379 --> 00:10:50,379
So the discussion really, when you just designed a distributed database system,

147
00:10:50,379 --> 00:10:57,379
where's the memory and where's the disk, and who's allowed to read and write to it at any given time.

148
00:10:57,379 --> 00:11:02,379
And this is going to determine how the CPUs are going to coordinate and talk to each other.

149
00:11:02,379 --> 00:11:09,379
Like, what kind of messages are they going to send and when do they send them, and then who's going to be involved in deciding when certain things should happen.

150
00:11:09,379 --> 00:11:15,379
Again, if it's a transactional system, somebody's got to decide, okay, it's time to commit this transaction.

151
00:11:15,379 --> 00:11:22,379
And then, can everybody agree to that? And someone has to be in charge of making that decision.

152
00:11:22,379 --> 00:11:34,379
So the architecture we've been mostly discussing so far, actually entirely discussing the semester, is what is known in the sort of the database literature as a shared everything system.

153
00:11:34,379 --> 00:11:45,379
There's a single box and single node, it has a local disk, it has a local memory, and that database system can access all those things equally.

154
00:11:45,379 --> 00:11:50,379
And there's no other node, right? This is basically what a single node database system is.

155
00:11:50,379 --> 00:11:57,379
This is what bus tub is, a postgres for my sequel. Ignoring replication for now.

156
00:11:57,379 --> 00:12:02,379
And when most people think of a distributed database system, they think of something like this, what is known as a shared nothing system.

157
00:12:02,379 --> 00:12:07,379
This is what is a term invented in the 1980s by the guy who then a postgres Mike Snowbroker.

158
00:12:07,379 --> 00:12:18,379
And this again, this is what most people think about when you think of a distributed system, right? That there's individual nodes, and those nodes have CPUs, and those CPUs can access memory, can access local disk.

159
00:12:18,379 --> 00:12:37,379
But anytime you want to communicate with any other node in the distributed database, it has to go through some network protocol, again, for our purposes, as soon as TCP IP, and it sends messages to the different, to the different nodes to coordinate with each other.

160
00:12:37,379 --> 00:12:42,379
What is more common now, especially in the cloud is what is known as a shared disk system.

161
00:12:42,379 --> 00:12:47,379
And the idea here is that there's still individual nodes that have CPUs and have local memory.

162
00:12:47,379 --> 00:12:52,379
They may even have direct attached SSDs that could use for caching.

163
00:12:52,379 --> 00:12:57,379
But the primary storage location of the database is going to be on some shared disk, right?

164
00:12:57,379 --> 00:13:11,379
If you think of a giant Nause appliance, like some shared storage server, or if you're in the cloud, into S3, or whatever the one for Azure, GCP is, that's the resting place, the primary location of the database.

165
00:13:11,379 --> 00:13:23,379
In the case of a shared nothing system, the database could be replicated on every single node, or we could partition it or break it up to subsets and have each node be responsible for that.

166
00:13:24,379 --> 00:13:31,379
But in the shared disk system, it looks like a single logical disk that every node can communicate with.

167
00:13:31,379 --> 00:13:35,379
I'll go through each of these more details with examples.

168
00:13:35,379 --> 00:13:42,379
And just to be complete in the research literature, there's also a category system called shared memory systems.

169
00:13:42,379 --> 00:13:55,379
And the idea here is that the disk and memory is shared across some kind of fabric, and the CPU nodes, or the database nodes, can only coordinate or communicate through some kind of network.

170
00:13:55,379 --> 00:13:59,379
Again, this looks a lot like shared everything.

171
00:13:59,379 --> 00:14:04,379
I'll show this in a slide in a second, but like, as far as I know, nobody actually does shared memory, right?

172
00:14:04,379 --> 00:14:16,379
This architecture mostly exists in high performance computing, where you want to have a single, just aggregate memory pool, and all the nodes can coordinate through that.

173
00:14:16,379 --> 00:14:19,379
But again, as far as I know, node database has been actually implemented.

174
00:14:19,379 --> 00:14:25,379
So we're going to spend most of our time focusing on shared nothing and shared disk.

175
00:14:25,379 --> 00:14:30,379
So as I said, the term shared nothing dates into 1986.

176
00:14:30,379 --> 00:14:37,379
The first shared nothing database system that was actually commercially available was TerraData, which I think is like 82, 83.

177
00:14:37,379 --> 00:14:41,379
There were some academic prototypes that predate that.

178
00:14:41,379 --> 00:14:45,379
But those were actually never actually implemented in the use.

179
00:14:45,379 --> 00:14:47,379
But TerraData was the first one.

180
00:14:47,379 --> 00:15:01,379
Again, the idea here is that each node can't view the memory or disk of any other node in the cluster, and they can only communicate through the through some network.

181
00:15:01,379 --> 00:15:15,379
So the conventional wisdom is that in a shared nothing system, this is maybe better performance and better efficiency, because now, if I chart or partition my database across these different nodes,

182
00:15:15,379 --> 00:15:33,379
then I can distribute it query, break it up into smaller pieces, have each node basically run full-blast, and all its local storage, local copy of the database, and then I somehow aggregate the results together, and the same way we did for parallel execution using like an exchange operator.

183
00:15:33,379 --> 00:15:42,379
So this gets the best performance because you're not bottlenecked for any as you'll know, you're not bottlenecking any other node because you're only accessing data that's local to you.

184
00:15:42,379 --> 00:15:51,379
As we know, in the real world, you may have to talk to other nodes to get data that you're missing, and that becomes a problem.

185
00:15:51,379 --> 00:16:05,379
The challenge, though, and we'll see this in contrast with a shared disk system, is that in a shared nothing system, it's hard to scale capacity because the data that's stored in the local disk is tied to each node.

186
00:16:05,379 --> 00:16:13,379
If I want to add a new node in my cluster, I got a copy data from other nodes to be able to spread it out.

187
00:16:13,379 --> 00:16:29,379
It's also going to be harder to ensure consistency because again, since every node has their own local portion of the database, copied the database, they can't see the memory of other nodes, then they got to send messages to ask, hey, what are you doing for this transaction, or what are you doing for this query?

188
00:16:29,379 --> 00:16:41,379
So there's a lot of databases that use this architecture, and I said this was the conventional wisdom of how you build a scalable distributed database system up until maybe the last 10 years or so.

189
00:16:41,379 --> 00:16:49,379
The cloud changes, but if you've been about distributed database in the 80s or 90s, early 2000s, you would use this approach.

190
00:16:49,379 --> 00:16:50,379
Yes.

191
00:16:50,379 --> 00:16:54,379
So each of these disks, do they have a portion of the database?

192
00:16:54,379 --> 00:16:57,379
Potentially, yes. Depends on how you want to partition it. We'll get that in a second.

193
00:16:57,379 --> 00:17:04,380
So if the first thing you want to get something from the third disk, you're going to go through the network and bring it over.

194
00:17:04,380 --> 00:17:11,380
Yeah. His question is assuming, say the database, we'll talk about how to do partition in a second.

195
00:17:11,380 --> 00:17:17,380
You literally just take one column, hash it the value, and then you distribute it out across the different nodes.

196
00:17:17,380 --> 00:17:22,380
You make a face. That's very common. And it's actually a good idea.

197
00:17:22,380 --> 00:17:28,380
We'll see that. So basically, this node one has some range.

198
00:17:28,380 --> 00:17:31,380
Next node has the next range. I'll actually show the next slide.

199
00:17:31,380 --> 00:17:37,380
If my node here needs to get the data that this node has, I can't just peek over to the disk.

200
00:17:37,380 --> 00:17:40,380
I got to send a message and say, hey, send the data you have.

201
00:17:40,380 --> 00:17:44,380
So it's a query goes to all the CPUs?

202
00:17:44,380 --> 00:17:50,380
His question is, is a query goes to all the CPUs? If you need all the data and all the CPUs, yes.

203
00:17:50,380 --> 00:17:55,380
We'll get in a second. There's going to be something. There's some intelligence to say, okay, you look at the query and it's declarative.

204
00:17:55,380 --> 00:18:02,380
So I know what you're trying to do. Find me the middle remember nodes that has the data that I need.

205
00:18:02,380 --> 00:18:05,380
Next slide.

206
00:18:05,380 --> 00:18:09,380
So say we have a really simple distributed database, two node clusters shared nothing.

207
00:18:09,380 --> 00:18:13,380
Again, so on each node, there's a local CPU, local memory, local disk.

208
00:18:13,380 --> 00:18:20,380
And then what I'm showing here is that I've taken a single table and I've partitioned it based on the value of an ID column.

209
00:18:21,380 --> 00:18:29,380
So it's the primary key. And so the first partition at the top is going to have all the two pulls where ID equals one to 150.

210
00:18:29,380 --> 00:18:34,380
And the one at the bottom has all two pulls where ID is one fifty one to three hundred.

211
00:18:34,380 --> 00:18:39,380
This is an example of range partitioning. I said, patch partition is another approach. We'll see that in a second.

212
00:18:39,380 --> 00:18:49,380
But now, depending what my query is, depending on what data I need access, I would use this information to figure out what these nodes I need to go to.

213
00:18:49,380 --> 00:18:55,380
And the way I'm going to figure out what what what node I need to go to is through some kind of catalog or metadata service.

214
00:18:55,380 --> 00:19:08,380
And I'm showing this as a cloud because it could be on the actual nodes themselves or it could be like a third party external service on the side says, okay, what direction you need to get this data.

215
00:19:08,380 --> 00:19:11,380
Right. Different systems do different things.

216
00:19:11,380 --> 00:19:18,380
So I'm just saying this is a more for its thing is somehow is going to tell us their application where should we go.

217
00:19:18,380 --> 00:19:24,380
Now, say my query is get get ID equals 200 based on the information I've gotten from the catalog.

218
00:19:24,380 --> 00:19:33,380
I know that this node at the bottom has the all the two pulls where ID is one fifty one to three hundred ID equals 200 is in that range.

219
00:19:33,380 --> 00:19:36,380
So I know I want to come here and get the data that I need.

220
00:19:36,380 --> 00:19:44,380
Now, when I actually this query on this node down here, I don't need to communicate with the node at the top because it doesn't have any of the data that I need.

221
00:19:44,380 --> 00:19:47,380
Everything is down here.

222
00:19:47,380 --> 00:19:55,380
Right. Then at the same time, I mean other query comes along and say this one wants to get ID equals 100 and ID equals 200.

223
00:19:55,380 --> 00:20:07,380
So we'll talk about data transparency in a second, but ideally, we don't want the application server to be aware in charge of deciding how to get the data that needs for a particular query.

224
00:20:07,380 --> 00:20:19,380
Meaning I just want to send my query request for these two IDs to this node and then have this node figure out so they want to the top figure out how to get the data that it needs to process this query.

225
00:20:19,380 --> 00:20:25,380
And so it could be the case that the in this example here, I send a message from the top node to the bottom node.

226
00:20:25,380 --> 00:20:29,380
Hey, I have a query up here that needs needs get ID equals 200.

227
00:20:29,380 --> 00:20:33,380
Send me that data up send that data up to me.

228
00:20:33,380 --> 00:20:38,380
Okay, so.

229
00:20:38,380 --> 00:20:44,380
Right. And then I can return the response to the server.

230
00:20:44,380 --> 00:20:46,380
Is this clear? Yes.

231
00:20:46,380 --> 00:20:55,380
If we do an aggregation for example, so we don't want the application to do a lot of the thing that's working in the two.

232
00:20:55,380 --> 00:20:58,380
Yeah, so say it is.

233
00:20:58,380 --> 00:21:04,380
If you're doing aggregation where you just in a table, you need such data at both partitions or both nodes.

234
00:21:04,380 --> 00:21:08,380
You want the data server to do that for you, not the applications are right. Yes.

235
00:21:08,380 --> 00:21:16,380
So we'll see the second you could have something in front of this, a middleware or coordinator that the query shows up there and then it knows here's the data that I need.

236
00:21:16,380 --> 00:21:23,380
And if I have to line combine results, it can decide, okay, well, most of the data I need is on the node here.

237
00:21:23,380 --> 00:21:28,380
So I want to I want to maybe just pull a small amount of data from the bottom to the top because that's me cheaper.

238
00:21:28,380 --> 00:21:31,380
We'll see this push for support in a second.

239
00:21:31,380 --> 00:21:36,380
Another question?

240
00:21:36,380 --> 00:21:42,380
Yeah, so like this question is should the top node also talk to this metadata service? Yes, like it has to be.

241
00:21:42,380 --> 00:21:46,380
And it's going to have to be ideally well.

242
00:21:46,380 --> 00:21:49,380
Yeah, no, I yes, ideally, you want this already basically transactional.

243
00:21:49,380 --> 00:22:01,380
So like if something gets added or new data changes or the range is changes, I want to do this in a transactional safe manner because then I can guarantee that any party comes along and looks for an ID from start moving things around.

244
00:22:01,380 --> 00:22:03,380
It gets the right answer.

245
00:22:03,380 --> 00:22:08,380
We'll see how Mongo did it wrong in a second. Yes.

246
00:22:08,380 --> 00:22:15,380
Right. So now let's say I want to add, I got a lot of activity on my database node.

247
00:22:15,380 --> 00:22:20,380
I need to add more, you know, more servers because I'm, you know, my latency is too high.

248
00:22:20,380 --> 00:22:24,380
I'm getting too many queries. I want to scale up or sorry, scale out.

249
00:22:24,380 --> 00:22:30,380
So I want to add a new new node here. But again, when it boots up, there's no data inside of it.

250
00:22:30,380 --> 00:22:37,380
So now I need to start getting data from the other nodes toward a fill in the, you know, fill in the desk and start being able to process queries.

251
00:22:37,380 --> 00:22:41,380
So in this case here, you have to have the top guy and the bottom guy for simplicity.

252
00:22:41,380 --> 00:22:45,380
Soon they're going to put this rate in half by equally.

253
00:22:45,380 --> 00:22:55,380
So ID from 150, 150, 150 down here and from, what was before?

254
00:22:55,380 --> 00:22:58,380
Sorry.

255
00:22:58,380 --> 00:23:03,380
It was 151, 300. So we'll move 151 and 200 up here. Right.

256
00:23:03,380 --> 00:23:07,380
And then to this question over here, I update the catalog surface.

257
00:23:07,380 --> 00:23:11,380
There's data, you know, there's new node exists. Here's the ranges that it has.

258
00:23:11,380 --> 00:23:15,380
So any new query comes along. It says, where can I find the data I'm looking for?

259
00:23:15,380 --> 00:23:19,380
We'll see a consistent view of the catalog.

260
00:23:19,380 --> 00:23:23,380
Now it's said before that MongoDB did it wrong.

261
00:23:23,380 --> 00:23:29,380
So MongoDB had this auto scaling thing and, and I think they still have an early version of MongoDB.

262
00:23:29,380 --> 00:23:33,380
One of the big selling points is that they could do auto scaling.

263
00:23:33,380 --> 00:23:37,380
So if your, if your partitions or nodes are getting too hot, it can split the ranges up for you automatically.

264
00:23:37,380 --> 00:23:41,380
But they didn't, they didn't move data around in a transaction-safe manner.

265
00:23:41,380 --> 00:23:44,380
So they would do this copying that I'm showing here.

266
00:23:44,380 --> 00:23:49,380
But it couldn't guarantee that the catalog would be synchronized when this change occurred.

267
00:23:49,380 --> 00:23:53,380
So there may be a small window where you can actually have a false negative where

268
00:23:53,380 --> 00:23:55,380
the catalog wasn't updated yet.

269
00:23:55,380 --> 00:23:59,380
Your query goes up here to the top node because you're looking for ID150.

270
00:23:59,380 --> 00:24:01,380
But the data hasn't moved yet.

271
00:24:01,380 --> 00:24:05,380
Or I'm sorry, the data was moved, but you didn't have the catalog.

272
00:24:05,380 --> 00:24:07,380
So it points you to the top one.

273
00:24:07,380 --> 00:24:11,380
And then that node says it's not there.

274
00:24:11,380 --> 00:24:17,380
So the reason I'm highlighting this metadata stuff is because it's just another transaction.

275
00:24:17,380 --> 00:24:19,380
We want to have a consistent view of the database.

276
00:24:19,380 --> 00:24:24,380
And that does mean, not just mean what data is, sorry, what the data looks like on each individual node.

277
00:24:24,380 --> 00:24:28,380
But the metadata itself that tells you where that data is located.

278
00:24:28,380 --> 00:24:32,380
We want that to be transactional as well.

279
00:24:32,380 --> 00:24:42,380
All right, so shared disk, as I said, the cloud has really made this the most popular way to build a database system now.

280
00:24:42,380 --> 00:24:48,380
Share disk and this architecture was first designed in the 1980s.

281
00:24:48,380 --> 00:24:54,380
But a lot of the systems that were based on this architecture didn't pin out.

282
00:24:54,380 --> 00:24:58,380
It was huge pain to build and became very unreliable.

283
00:24:58,380 --> 00:25:00,380
The cloud changes that now.

284
00:25:00,380 --> 00:25:06,380
So again, because the shared disk isn't just going to be something that we as the data system developer have to build.

285
00:25:06,380 --> 00:25:08,380
Although some systems choose to do that.

286
00:25:08,380 --> 00:25:12,380
We just rely on the massive infrastructure of the cloud vendors.

287
00:25:12,380 --> 00:25:16,380
And use that as our backing storage.

288
00:25:16,380 --> 00:25:22,380
Right, so like you could use Amazon S3, right, that's basically infinite disk.

289
00:25:22,380 --> 00:25:26,380
Right, so you never know where about scaling or provision new new new storage.

290
00:25:26,380 --> 00:25:29,380
Amazon has infinite storage for you.

291
00:25:29,380 --> 00:25:34,380
Right, or basically infinite like you get to the point where you start running out of space on S3.

292
00:25:34,380 --> 00:25:37,380
You're going to call some Amazon way before that even happens, right?

293
00:25:37,380 --> 00:25:39,380
Your credit card is going to get denied.

294
00:25:39,380 --> 00:25:41,380
All right, you can distribute a file system.

295
00:25:41,380 --> 00:25:44,380
HGFS is a bad example, but that's something you could use.

296
00:25:44,380 --> 00:25:47,380
But there's better ones now that you could use it as the backing store.

297
00:25:47,380 --> 00:25:50,380
But it's not just in this architecture.

298
00:25:50,380 --> 00:25:56,380
It's not enough just to say, okay, let me take my single node bus to every single postgres and make it stick it on a distributed file system.

299
00:25:56,380 --> 00:26:00,380
The database system itself needs to be aware that it's talking distributed file system.

300
00:26:00,380 --> 00:26:02,380
Because there are some optimization you can do.

301
00:26:02,380 --> 00:26:08,380
And there's some obviously some logic and make sure that you don't have two guys trying to write to the same file at the same time.

302
00:26:08,380 --> 00:26:13,380
Because they're doing transactions that because they don't, but they don't know about each other.

303
00:26:13,380 --> 00:26:21,380
Right, so it's not just enough to say, I'm going to file system, you have to have the the compute nodes be aware that they are part of a larger system.

304
00:26:21,380 --> 00:26:27,380
So the nice advantage of using this approach is that you can now scale the two, the two parts of the data system independently.

305
00:26:27,380 --> 00:26:32,380
So if I need more compute, I just add new compute notes and the compute knows they're stateless.

306
00:26:32,380 --> 00:26:36,380
So it's not like I need to copy data between the different nodes as I did in this for nothing system.

307
00:26:36,380 --> 00:26:39,380
There was a pool data from the shared disk.

308
00:26:39,380 --> 00:26:45,380
Now, I still need update my metadata to say who's responsible for what portion of the database.

309
00:26:45,380 --> 00:26:52,380
Especially if it's a transactional system, but that's way easier than a shared nothing system.

310
00:26:52,380 --> 00:26:55,380
We can still use direct attack storage.

311
00:26:55,380 --> 00:27:00,380
So even though I'm not showing it in the boxes here at the top, pointer.

312
00:27:00,380 --> 00:27:03,380
Sorry, new clicker.

313
00:27:04,380 --> 00:27:06,380
So we can't even see.

314
00:27:06,380 --> 00:27:11,380
Right, so even though the nodes themselves, I'm not showing a disk, they can have a local SSD as well.

315
00:27:11,380 --> 00:27:13,380
And we can just use that as a bigger, slower cache.

316
00:27:13,380 --> 00:27:19,380
So like right now, your buffer pool basically writes out the disk in bus tub and that the disk is the final location of the database.

317
00:27:19,380 --> 00:27:31,380
But I could have another stage in my buffer pool where I could write things out to the SSD and then manage that as if it was just DRAM and do a Viction and throw things out of that as well.

318
00:27:32,380 --> 00:27:37,380
So when people talk about data lakes, they tip, they mean this architecture.

319
00:27:37,380 --> 00:27:47,380
The data lake stuff is interesting or we can cover this next week because the idea is that instead of all the right path for all updates to the database going through the database system.

320
00:27:47,380 --> 00:27:53,380
I can just write things out to s3 and then there's some metadata service like the high meta store.

321
00:27:53,380 --> 00:27:56,380
I think Databricks calls there's unity, right?

322
00:27:56,380 --> 00:28:07,380
There's some catalog service that you can update and say, hey, by the way, I have a bunch of these CSV files or parquet files on disk and then it now knows how to incorporate them or use them when you actually queries.

323
00:28:07,380 --> 00:28:11,380
But it's still going to be a shared disk architecture.

324
00:28:11,380 --> 00:28:15,380
Or when people say they have a serverless database, it typically means this as well.

325
00:28:15,380 --> 00:28:17,380
Because again, the compute nodes are stateless.

326
00:28:17,380 --> 00:28:23,380
The final resting place in the database, which is what we care about, is here on the shared disk on s3 or whatever it is.

327
00:28:23,380 --> 00:28:31,380
So now if I spin up my database system, I haven't executed any queries on the database system for an hour.

328
00:28:31,380 --> 00:28:34,380
I can just shut off the compute nodes.

329
00:28:34,380 --> 00:28:42,380
And in the shared disk system, or sorry, in a shared nothing system, the database would go away because again, the disk was attached to each node.

330
00:28:42,380 --> 00:28:43,380
So I turned the node off.

331
00:28:43,380 --> 00:28:46,380
The database is, you know, that portion of the data isn't among available.

332
00:28:46,380 --> 00:28:49,380
But in the shared disk system, I shut the compute node off.

333
00:28:49,380 --> 00:28:52,380
And s3, you know, all my data is still in s3.

334
00:28:52,380 --> 00:29:00,380
And then an hour later, I've, I've wanted to execute another query, then I spin up another compute node and start pulling data from the shared disk storage.

335
00:29:00,380 --> 00:29:06,380
Basically how a serverless database works.

336
00:29:06,380 --> 00:29:11,380
So there's a lot of systems that implement this as well, both for transactional systems and for OLAP systems.

337
00:29:11,380 --> 00:29:19,380
And as I said, most of the newer database systems design in the, probably less five years, are using this architecture.

338
00:29:19,380 --> 00:29:31,380
And then a bunch of systems that were maybe originally shared nothing have since come around and actually retrofitted or refactor their code to become a shared disk system.

339
00:29:31,380 --> 00:29:33,380
All right, so here's that same mark.

340
00:29:33,380 --> 00:29:34,380
Yes, question.

341
00:29:34,380 --> 00:29:45,380
So this question is, do these systems rewrite the entire server backend like for storage or?

342
00:29:45,380 --> 00:29:48,380
Yeah, I mean, so, so.

343
00:29:48,380 --> 00:29:57,380
If you're relying on s3, you don't have to, you know, you don't have to build something that reads and writes a disk like a good.

344
00:29:57,380 --> 00:30:01,380
You still need a disk manager, right, but that disk manager isn't writing to local storage.

345
00:30:01,380 --> 00:30:04,380
It's just coding writing data to s3.

346
00:30:04,380 --> 00:30:07,380
Now, I made a big deal of beginning this messer said like, oh, that OS is terrible.

347
00:30:07,380 --> 00:30:11,380
We don't trust the OS for anything, but now I'm saying we're going to trust Amazon, right?

348
00:30:11,380 --> 00:30:13,380
Yes.

349
00:30:13,380 --> 00:30:20,380
So you can think of s3 as just being, it's just from our perspective, it's just another disk.

350
00:30:20,380 --> 00:30:23,380
It's bigger, slower.

351
00:30:23,380 --> 00:30:27,380
It's not directly attached, but from the Davison perspective, it's just another disk.

352
00:30:27,380 --> 00:30:34,380
Now, the some things you can do with like using s3 as an example that you can't do it with a regular disk, you can do some predicate push down.

353
00:30:34,380 --> 00:30:47,380
So in s3, for example, you can actually run select queries on s3 and it'll s3 can natively like parse scsv or json file and run part of your query down there.

354
00:30:47,380 --> 00:30:56,380
So it's a little more sophisticated than a dumb disk, but from our perspective on the Davison system, it's just a disk.

355
00:30:56,380 --> 00:30:57,380
Right?

356
00:30:57,380 --> 00:31:03,380
We're still going to be responsible for deciding when things get written out, what gets brought into memory.

357
00:31:03,380 --> 00:31:06,380
If we have a multi-stage cache, where does that go?

358
00:31:06,380 --> 00:31:12,380
How do we decide how to split all the data up? All that we have to manage ourselves. That doesn't go away.

359
00:31:12,380 --> 00:31:15,380
Yes.

360
00:31:15,380 --> 00:31:19,380
Question, is there any benefit to doing this on your own versus using s3?

361
00:31:19,380 --> 00:31:23,380
Oh, yes. Could you get better than s3? Absolutely, yes.

362
00:31:23,380 --> 00:31:27,380
And some systems do that.

363
00:31:27,380 --> 00:31:32,380
There's like, do I want to run my own, just distribute a disk or distribute a file system?

364
00:31:32,380 --> 00:31:37,380
And then that's one aspect of what you can rewrite.

365
00:31:37,380 --> 00:31:39,380
Very few people will do that.

366
00:31:39,380 --> 00:31:44,380
Because again, Amazon is Amazon. They have hundreds of engineers working on this.

367
00:31:44,380 --> 00:31:47,380
And like I said, it's infinite disk. You don't have the provision in themselves.

368
00:31:47,380 --> 00:31:54,380
You pay more for it. Right? And the latency can be like 50 to 200 milliseconds. Sometimes. That's a lot.

369
00:31:54,380 --> 00:31:58,380
But they handle replication for you.

370
00:31:58,380 --> 00:32:04,380
Right? Which can be good or bad. Right? Again, the Davison is aware that it's written to s3 and s3 is going to replicate itself.

371
00:32:04,380 --> 00:32:08,380
Then you maybe you don't have the Davison to sub-disount through replication.

372
00:32:08,380 --> 00:32:16,380
That's one aspect of this. Then the do you want to rely on Amazon's libraries to talk to s3?

373
00:32:16,380 --> 00:32:22,380
And there's one data is yellow brick. They gave a talk a few years ago where they were like,

374
00:32:22,380 --> 00:32:25,380
we tried all the Amazon libraries. They're all crap. They rewrote everything themselves.

375
00:32:25,380 --> 00:32:32,380
And they did kernel bypass to make, you know, reason rights puts and gets s3 faster than what Amazon will give you.

376
00:32:32,380 --> 00:32:40,380
So there's various levels of my optimization you can do before like, okay, let me run my own s3.

377
00:32:40,380 --> 00:32:49,380
But I think they having the ability to do predicate pushdown in s3. I don't think I think Microsoft supports that.

378
00:32:49,380 --> 00:32:54,380
I don't think Google does one of them supports it. But like be able to do some predicate pushdown.

379
00:32:54,380 --> 00:33:01,380
That's a big win as well. Because now I can be more selective on bringing back data that maybe they don't need.

380
00:33:01,380 --> 00:33:09,380
What are the downsides of this to share nothing?

381
00:33:09,380 --> 00:33:16,380
Well, see this in a second. Let me go next slide. The big challenge is going to be,

382
00:33:16,380 --> 00:33:24,380
you almost always have to pull data from from disk into the computer.

383
00:33:25,380 --> 00:33:30,380
To the computer. Again, it's called pushing the query to the data or pulling the data to the query.

384
00:33:30,380 --> 00:33:37,380
And it's shared nothing system. You can make that decision and you always can push the query to the data.

385
00:33:37,380 --> 00:33:45,380
So even if you can't push the entire query, I can use some predicate pushdown. That's better than just blindly grabbing blocks and fetching them.

386
00:33:45,380 --> 00:33:52,380
That's the key difference, right? But the not having to worry about how to do replication and all these other things

387
00:33:53,380 --> 00:34:04,380
that Amazon takes here for you, that's a big enough win. And the speeds have gotten so much faster that like it's just worth paying that company.

388
00:34:04,380 --> 00:34:13,380
All right, so let's go back to our example here. Right. So now my application server runs a query says gets ID 101.

389
00:34:13,380 --> 00:34:17,380
The node can go into the catalog service and figure out where to find that data.

390
00:34:18,380 --> 00:34:26,380
Again, what bucket of S3 has the data that need? And then now when it accesses storage, it's not.

391
00:34:26,380 --> 00:34:37,380
It's like a four and a couple manager, if the convert the record you're looking for to a page number or block number or a bucket number or segment or whatever you want to call it to go out to the disk and go get it.

392
00:34:37,380 --> 00:34:43,380
And then it copies it into the local memory of this node who then compute the query and produce the answer to once.

393
00:34:44,380 --> 00:34:53,380
Same thing with this guy down here. Again, he can go get the ID you can want to do goes that page and then processes the query.

394
00:34:53,380 --> 00:34:58,380
So now if I want to add new capacity, I want to add a new compute node. Again, these nodes are stateless.

395
00:34:58,380 --> 00:35:04,380
Meaning the primary location of the database is not in the compute nodes. It's only on shared disk.

396
00:35:04,380 --> 00:35:12,380
So even though these nodes may have cash copies of pages, you do want to do because you pay money every time you look things up on Amazon.

397
00:35:13,380 --> 00:35:17,380
It's, you know, they're not, you know, it's a temporary lease, temporary ownership.

398
00:35:17,380 --> 00:35:25,380
So I could spin up this new node, not have to copy any data between my, my other nodes potentially.

399
00:35:25,380 --> 00:35:30,380
And then a new query from the show up and then this thing gets the data that it needs.

400
00:35:30,380 --> 00:35:36,380
And then if I want to add more disk, what do I do? Well, actually, I was doing update first.

401
00:35:37,380 --> 00:35:46,380
So if I do an update here, 101, so since this node here has a copy of it, I have to make the modification to the, to the shared disk.

402
00:35:46,380 --> 00:35:52,380
But then I maybe have to update everyone else say, oh, by the way, I know you have a cash copy of this, of this tuple.

403
00:35:52,380 --> 00:36:00,380
Here's the new version of it. Or it's, you know, when a version you have now has been invalidated, go back to the shared disk and go get the new version.

404
00:36:00,380 --> 00:36:01,380
Yes.

405
00:36:02,380 --> 00:36:08,380
So question, how does the top node that the, how does the top node, the bottom two nodes have a cash copy of this?

406
00:36:08,380 --> 00:36:14,380
So, what's the second, in the shared disk, we're doing that partitioning, but it's logical.

407
00:36:14,380 --> 00:36:22,380
And we're just saying that the, the, a one node is going to be responsible for handling the rights to another node.

408
00:36:23,380 --> 00:36:38,380
And then if another node wants to get it, you know, also get a copy of it, it could either go to, it has to tell somebody, hey, by the way, I'm, you know, I know you have a copy, you're the owner for this, for this record or this partition.

409
00:36:38,380 --> 00:36:43,380
Give me a copy what you have. And then now this guy knows that the bottom guy has a copy of it and get updated.

410
00:36:44,380 --> 00:36:52,380
Or you could tell the met the catalog server, hey, by the way, like, I need a copy or you broadcast to everyone, like a gossip protocol and say, hey, go, go get, we're going to the latest version.

411
00:36:52,380 --> 00:36:57,380
And then now we, we target isolation levels, we'll talk about, you know, it's the same idea.

412
00:36:57,380 --> 00:37:03,380
You know, this is actually the C in acid, which we sort of danced over before.

413
00:37:03,380 --> 00:37:07,380
Do you want to have a consistent view of the entire database? Yes or no?

414
00:37:07,380 --> 00:37:13,380
If you want a consistent view, then you got to make sure that anyone about possibly have a copy gets this update. Here's a new version.

415
00:37:13,380 --> 00:37:18,380
Or if you're okay with things having stale reads, then I do my update.

416
00:37:18,380 --> 00:37:25,380
But then I eventually tell everyone I was, hey, by the way, a version of it. And it may be the case that me query that goes here and reads the old version.

417
00:37:25,380 --> 00:37:29,380
That's okay. For some applications, that's okay. For others not, it's not.

418
00:37:29,380 --> 00:37:33,380
Okay, we'll cover that more next week.

419
00:37:34,380 --> 00:37:38,380
All right, if I want to add new storage capacity, again, if it's S3, it's easy.

420
00:37:38,380 --> 00:37:42,380
You just give them some more money, right? And they're gladly take it.

421
00:37:42,380 --> 00:37:47,380
And you just get more storage capacity. Or even it was managed by yourself, right?

422
00:37:47,380 --> 00:37:54,380
I can add new disks to my distributed file system. And because these guys are stateless, it doesn't matter.

423
00:37:54,380 --> 00:37:58,380
I don't, I don't have to do any coordination that.

424
00:37:59,380 --> 00:38:05,380
All right, so I'm not going to say much about shared memory. Again, this is sort of like the.

425
00:38:05,380 --> 00:38:08,380
It's it's almost like a not theoretical because you could build one.

426
00:38:08,380 --> 00:38:12,380
And there's people have have dance around betting prototypes in the 80s and 90s.

427
00:38:12,380 --> 00:38:16,380
But there's again, as far as I know, there's no real system that actually does this.

428
00:38:16,380 --> 00:38:19,380
And again, the idea here is that you have these stateless compute nodes.

429
00:38:19,380 --> 00:38:24,380
And then there's some kind of shared disk thing. But then the memory is also shared as well.

430
00:38:25,380 --> 00:38:30,380
So any time I want to go send messages to another node, I just write to some memory address.

431
00:38:30,380 --> 00:38:35,380
And there's some hardware that magically make sure that everyone gets the update.

432
00:38:35,380 --> 00:38:41,380
It looks a lot like shared everything. Just the distinction is that I'm saying there's there's there's separate physical notes.

433
00:38:41,380 --> 00:38:47,380
And there's some interconnect like RdMA or something like that or a thin band so that they can talk to each other.

434
00:38:49,380 --> 00:38:52,380
But again, nobody actually does this as far as I know.

435
00:38:54,380 --> 00:39:01,380
So I sort of mentioned this before, but there's a the attribute idea of a distributed basis old goes back to the 1970s.

436
00:39:01,380 --> 00:39:08,380
So as far as I know, the first two prototypes of distributed databases were this thing called muffin.

437
00:39:08,380 --> 00:39:11,380
It stands for multiple or something or something of ingress.

438
00:39:11,380 --> 00:39:14,380
It's the guy that built ingress and postgres Sturmberger.

439
00:39:14,380 --> 00:39:20,380
They have a sort of tech report paper at a Berkeley that describes here's how you could build a distributed version of ingress.

440
00:39:20,380 --> 00:39:23,380
The more famous one is SDD1 by Phil Bernstein.

441
00:39:23,380 --> 00:39:29,380
Phil Bernstein did a lot of the great initial work on how to do concurred control and distributed data.

442
00:39:29,380 --> 00:39:33,380
But he gave a talk once at a workshop up his running.

443
00:39:33,380 --> 00:39:41,380
We talked about SDD1 actually wasn't a real system. There's a much of scripts that could build a prototype so they could like not trick the government.

444
00:39:41,380 --> 00:39:45,380
Like show the government, hey, we can we can actually do this and they got money from it.

445
00:39:45,380 --> 00:39:48,380
They actually never build the real system.

446
00:39:48,380 --> 00:39:58,380
IBM built a version of a version of system R the first relational system they were building because R star gamma is a

447
00:39:58,380 --> 00:40:05,380
was the early prototype of a distributed database at university was constant from the 1980s.

448
00:40:05,380 --> 00:40:08,380
It was built by a jignesh's PC advisor at Wisconsin.

449
00:40:08,380 --> 00:40:13,380
But the only one of these that actually still around today is this thing called nonstop sequel from tandem.

450
00:40:13,380 --> 00:40:17,380
That was Jim Gray's one of projects that Jim Gray worked on at tandem.

451
00:40:17,380 --> 00:40:24,380
Jim Gray again won the touring world for databases in the 1980s. He made a two days locking up a bunch of other stuff we've discussed this semester.

452
00:40:24,380 --> 00:40:31,380
He left IBM to go to tandem, but he had a non-copy clause where he wasn't allowed to work on databases for five years or something like that.

453
00:40:31,380 --> 00:40:36,380
And then nonstop was building this super fault tolerant hardware.

454
00:40:36,380 --> 00:40:43,380
Think of like NASA level fault tolerance like there's like two CPUs running and they're running the same computation and they check to see whether they get the same result.

455
00:40:43,380 --> 00:40:47,380
This is obviously big in banks in the 80s even today.

456
00:40:47,380 --> 00:40:57,380
But tandem nonstop sequel is still around today. If you ever use an ATM machine, changes are your transaction going to go through nonstop or IMS from IBM.

457
00:40:57,380 --> 00:40:59,380
But you're going through some old systems.

458
00:40:59,380 --> 00:41:06,380
Muffin was multiple faster, faster ingress.

459
00:41:06,380 --> 00:41:10,380
And I asked Mike once, Mike said, yeah, that's what they had to put in the paper.

460
00:41:10,380 --> 00:41:14,380
But he really said that they're ruining it with ingress. So they called it muffin.

461
00:41:14,380 --> 00:41:19,380
Mike doesn't curse that much. I was surprised when he said that.

462
00:41:19,380 --> 00:41:28,380
Anyway, all right. So you guys had too much of these questions and we've been sort of dancing around these things and now it's time to talk about how are we actually going to do these things?

463
00:41:28,380 --> 00:41:34,380
So we know what the high level architecture looks like. So now we're going to talk about how we're going to actually run queries and execute transactions.

464
00:41:34,380 --> 00:41:38,380
So one of the first things that came out was like, okay, how's the application find the data?

465
00:41:38,380 --> 00:41:41,380
In my examples, I said there was this catalog service.

466
00:41:41,380 --> 00:41:46,380
That's one way to do it. And then the application decide where to actually want to go themselves.

467
00:41:46,380 --> 00:41:51,380
Or we can see another approach where there's just a single coordinator, a single URL that everybody talks to.

468
00:41:51,380 --> 00:41:54,380
And that thing is knows where all the data needs.

469
00:41:55,380 --> 00:41:58,380
Likewise, where does it actually send the data? So I said send the queries.

470
00:41:58,380 --> 00:42:01,380
Do I send it to that coordinator? Do I send it to individual nodes?

471
00:42:01,380 --> 00:42:06,380
Does the application even aware of those individual nodes? Ideally, no.

472
00:42:06,380 --> 00:42:14,380
And then we want to act to queries and say the data that we need is not on a single disk or single node, what do we do?

473
00:42:14,380 --> 00:42:21,380
Right? And again, the two approaches are doing a push the query to the data or some portion of the query to the data where it resides.

474
00:42:21,380 --> 00:42:24,380
So I'm processing and get back a subset of the results.

475
00:42:24,380 --> 00:42:30,380
Or I want to pull all the data that I need from a node to another node and process the query there.

476
00:42:30,380 --> 00:42:35,380
How are we going to make sure that if we execute transactions that update data at multiple locations.

477
00:42:35,380 --> 00:42:38,380
And then we say commit that it actually commits.

478
00:42:38,380 --> 00:42:44,380
And everyone's in sync at the same time about, you know, and agrees what these are the changes that are getting made.

479
00:42:44,380 --> 00:42:48,380
And then how are we going to decide if we want to split the database across different resources?

480
00:42:48,380 --> 00:42:51,380
Is it the partition stuff I was saying before?

481
00:42:51,380 --> 00:42:56,380
So as always, in all parts of the systems, especially in databases, we're not going to make trade-offs.

482
00:42:56,380 --> 00:43:00,380
Because we're not going to be able to guarantee that our database system is going to be online all the time,

483
00:43:00,380 --> 00:43:06,380
and can answer any possible query, especially if nodes start going down and messages start getting lost and we can't communicate between nodes.

484
00:43:06,380 --> 00:43:09,380
We have to make a decision on what should we do?

485
00:43:09,380 --> 00:43:15,380
Should we produce incorrect results or should we just stop everything until we can get back online?

486
00:43:16,380 --> 00:43:18,380
So next class, we're going to focus on this.

487
00:43:18,380 --> 00:43:20,380
Again, how do we ensure correctness?

488
00:43:20,380 --> 00:43:23,380
How do we make sure that we can coordinate transactions across multiple nodes?

489
00:43:23,380 --> 00:43:30,380
The TLDR is going to be something like Paxos or two-phase commit or raft if you're familiar with those protocols.

490
00:43:30,380 --> 00:43:35,380
But then we have to handle replication and other things.

491
00:43:35,380 --> 00:43:40,380
All right, so the first decision we've got to make is what should the nodes actually do?

492
00:43:40,380 --> 00:43:44,380
And the two approaches are you have home and genius nodes or heterogeneous nodes.

493
00:43:44,380 --> 00:43:53,380
And so what I've shown so far are more or less home and genius nodes where every node in our database system cluster can do any task.

494
00:43:53,380 --> 00:43:59,380
I mean, I can send a query to any node and that node can then figure out, okay, where's the data that I need?

495
00:43:59,380 --> 00:44:05,380
How do I send it to that location or get the data that I need to put it back together?

496
00:44:05,380 --> 00:44:15,380
And what is nice about this approach is that it makes provisioning the resources you need for your database cluster easy.

497
00:44:15,380 --> 00:44:23,380
And if a node goes down and you spin up a new one, it just replaces the, you know, fits in with the rest of the system, the rest of the nodes.

498
00:44:23,380 --> 00:44:28,380
And you don't have to worry about rebalancing who's doing what?

499
00:44:28,380 --> 00:44:33,380
And a homogeneous architecture, you have nodes be assigned to specific tasks.

500
00:44:33,380 --> 00:44:37,380
I've already alluded to this already. You could say you could have this catalog service at the separate node.

501
00:44:37,380 --> 00:44:41,380
You could have a coordinator node or middleware is a separate node.

502
00:44:41,380 --> 00:44:45,380
And then you make decisions about what's going to be stateless, what's going to be stable.

503
00:44:45,380 --> 00:44:52,380
And should I have multiple sort of virtual nodes assigned to a single physical node so that, you know, one box can do multiple things.

504
00:44:52,380 --> 00:45:02,380
But now that box goes down, which it will in a real system, then how do I decide where to place the new tasks or fail over to the new task?

505
00:45:02,380 --> 00:45:05,380
Again, different systems do different things.

506
00:45:05,380 --> 00:45:14,380
I would say in the cloud architecture, the heterogeneous approach is more common now with a coordinator or middleware sitting in front of the rest of the compute nodes.

507
00:45:14,380 --> 00:45:19,380
Like this is what snowflake will give you, data bricks and others.

508
00:45:19,380 --> 00:45:25,380
But some of the no-seqal systems like Cassandra, for example, or these just should be key value stores.

509
00:45:25,380 --> 00:45:29,380
There'll be homogeneous nodes.

510
00:45:29,380 --> 00:45:37,380
I don't actually want to give me a question that like if you're no-seqal, you're homogeneous, if you're sequel or relational, you're heterogeneous, everybody does something different.

511
00:45:37,380 --> 00:45:42,380
And I'm not saying one approach is better than another.

512
00:45:42,380 --> 00:45:54,380
All right, we're going to talk about data transparency. Again, the idea is that we don't want our application to be aware of where the data is actually located and where the physical nodes are.

513
00:45:54,380 --> 00:46:00,380
Now, in some ways that are high level, you kind of need to be aware of where your data actually is.

514
00:46:00,380 --> 00:46:11,380
Like if I'm going to run an expensive query, I don't want to do a two petabyte join between data that's in, you know, across the country and a data center in my local data center.

515
00:46:11,380 --> 00:46:15,380
Because that's going to be super expensive. Now, if it's on a void, well, sure, right?

516
00:46:15,380 --> 00:46:21,380
But, you know, you don't want people to be too loosey goosey with sending whatever query that they want.

517
00:46:21,380 --> 00:46:31,380
Some high level understanding of where things are, but like the exact physical address of what data is at what partition, ideally we want all that to be hidden.

518
00:46:31,380 --> 00:46:45,380
So that the same SQL query that someone builds, you know, that runs today could run the next day, even though the physical nodes have been reorganized or data moved, has moved around because I've re re rebalanced.

519
00:46:45,380 --> 00:46:55,380
So again, I don't want ideally not to have specific hints or physical location of where hints or keywords inside my SQL queries.

520
00:46:55,380 --> 00:47:04,380
I want to have all that abstract away and let the data system decide the best way to handle all that.

521
00:47:04,380 --> 00:47:07,380
So now let's talk about having, we want to split our database up.

522
00:47:07,380 --> 00:47:20,380
So, again, it's just like in a parallel database, so we talk before where we want to divide our database across into disjoint subsets so that I can take advantage of, the system can take advantage of all the additional hardware that's available to us.

523
00:47:20,380 --> 00:47:28,380
I don't want to pay for 100 machines in my database system, my distributed data system, but then only be able to use one of them or two of them.

524
00:47:28,380 --> 00:47:31,380
That would be stupid and a waste of money.

525
00:47:31,380 --> 00:47:36,380
So I'm going to use the term partitioning in the relational database world or an academic world that's the term we use.

526
00:47:36,380 --> 00:47:43,380
If you ever read documentation about the no-seqal systems or other open source distributed databases, they might say the term sharding.

527
00:47:43,380 --> 00:47:52,380
The idea is basically the same. We're going to break the database into disjoint subsets and we're going to store them on those subsets into different locations.

528
00:47:52,380 --> 00:48:06,380
And then now, just like in a parallel database, a query shows up, I may want to break it up into the query plan into query fragments and distribute those fragments to the different compute nodes and have them execute on the partitions that they have.

529
00:48:06,380 --> 00:48:11,380
And then there'll be some exchange operator some way to coalesce results and produce a single answer back to the application.

530
00:48:11,380 --> 00:48:18,380
So because again, I don't want to have, I don't want to read my SQL query if I add new nodes or take away nodes.

531
00:48:18,380 --> 00:48:27,380
The same SQL query that works on that machine, you know, distributed database with 10 nodes, should work on also with 100 nodes without having to make any changes.

532
00:48:28,380 --> 00:48:41,380
So the database system is going to be able to partition the data, the data is physically, if it's shared nothing, because again, we have to physically divide it up across different nodes or logically in a shared disk system, because again, those compute nodes are technically sort of stateless.

533
00:48:41,380 --> 00:48:53,380
And they're pulling data from the shared disk, shared disk layer. But I would still want to know who's responsible what portion or what partition of the shared disk.

534
00:48:54,380 --> 00:49:02,380
So we'll talk about different ways to do partitioning. So the most naive approach or the simplest approach is called simple table partitioning.

535
00:49:02,380 --> 00:49:13,380
This is not that common. I know Mongo does this. I don't know what other systems do. But the idea here is you basically just say, all right, this table, it's entire town tense goes to this node and this other table goes to this other node.

536
00:49:13,380 --> 00:49:23,380
And this works great if you don't do joins across those two tables. And most operations on the tables are very fast and only touching the small amount of data.

537
00:49:23,380 --> 00:49:29,380
Because then you can make sure that you're the load of the application is spread across the different the different nodes.

538
00:49:29,380 --> 00:49:42,380
So let's see really simple example. I have two tables. So I'm going to take color code them all the rows or two pulls from partition table one goes the first partition, all the two pulls from table two goes the second partition.

539
00:49:42,380 --> 00:49:55,380
And then my idea scenario of any query that just looks at only one of those tables, no joins, this will be okay. Again, assuming that there's could be hot spots and other issues, but for simplicity, we can ignore that.

540
00:49:55,380 --> 00:50:11,380
So in the case of Mongo, the example they told me the reason why they supported this is that they had some customers where they had the they wanted to do horizontal partitioning. We'll see in a second across most of the tables, but they had one table that was like almost like an application log.

541
00:50:11,380 --> 00:50:31,380
So anytime there was a change, they would write in sort of new record into that table. And you never actually read it, you just want to write it. So they to ensure that that right operation in the fear of other partitions, it would just all go to a single single node for them that worked.

542
00:50:32,380 --> 00:50:52,380
A vertical partition is like a way to do a poor man's column store. The idea here is that we're going to split the table based on the actual attributes in itself, but not the values of them, but rather just the entire column and the entire, you know, all the all the values are given attribute.

543
00:50:52,380 --> 00:51:05,380
So let's say in this case here, we have a table that has four columns, the first three columns are 30-bit integers so that they're small, they're cheap. But then I have a fourth attribute that's a text field. And maybe this is like 10 megabytes or something like that.

544
00:51:05,380 --> 00:51:18,380
But most my queries only when access the first three attributes. So instead of having to again, assuming I'm a row store, pollute my buffer pool and bring much data in for this attribute.

545
00:51:18,380 --> 00:51:33,380
I could just do vertical partitioning where I split it up, almost stored as a virtual table, if you will, and then have that be stored as a separate partition and manage separately in my cluster.

546
00:51:33,380 --> 00:51:51,380
So you could do this, but you still want to do like, you know, to separate the two portions of the table, but you still want to do horizontal partition, which seemed the next slide, because maybe I want to distribute the two pulls across different partitions as well.

547
00:51:51,380 --> 00:52:04,380
I still hope horizontal partition, I think we covered also what propellated basis earlier, but this is what most people think about when they think about distributed data is how to divide things up. And again, if you say, sharding, this is what people mean.

548
00:52:05,380 --> 00:52:23,380
The idea here is that we're going to choose some column in our table that is going to be a going to distinguish the two pulls enough and distribute across our partitions so that we get even load across the across across our compute notes.

549
00:52:23,380 --> 00:52:35,380
There's no one hotspot partition ideally. It doesn't always work if you have, if everyone is going to get, you know, updating a single key, you can't distribute that, that's going to be within the single partition.

550
00:52:35,380 --> 00:52:45,380
But that's not always the case. So the three ways to handle partitioning are, there's actually four, there's round robin, we could ignore that.

551
00:52:46,380 --> 00:52:55,380
Hashing is pretty common, you basically pick some column, take the value of every single two pull, actually buy something, but you're hash able, and then you decide what partition is going to go to.

552
00:52:56,380 --> 00:53:05,380
Range partition, we've seen before, we set some kind of some some continuous range of values, and you say that that's all goes one partition, the range goes to another partition.

553
00:53:06,380 --> 00:53:13,380
Predicate partition is where you basically put a wear clause expression to determine what partition something's going to go to.

554
00:53:14,380 --> 00:53:23,380
It's like mainly assigning say, you know, where where name equals Andy and age equals something, go to partition one, where name equals Andy and age equals something else, go to another partition.

555
00:53:25,380 --> 00:53:29,380
That's not as common as hashing and range partitioning.

556
00:53:30,380 --> 00:53:35,380
Hatch partitioning is probably the most common one, and most of the no SQL systems are going to do this.

557
00:53:37,380 --> 00:53:44,380
So go back to example here, so first we've got to do partition, we've got to pick a partition key, and let's say for every reason this one is the one we want to use.

558
00:53:46,380 --> 00:53:58,380
And so if we're doing hash partitioning, we then take the value of every single two pull, hash it by some hash function, and it might have by the number of partitions that we have, and that's just going to determine where the different two pulls go.

559
00:54:00,380 --> 00:54:13,380
And so the ideal query for this scenario here is if you're doing a look up with an exact value on the partitioning key, because now I can take whatever value passed into this query, hash it using the same hash function, and bottom by the number of parts.

560
00:54:14,380 --> 00:54:18,380
And then I know exactly where the data you need, the data that query needs.

561
00:54:19,380 --> 00:54:38,380
So that's the sample here going back, this is physical partitioning, because I'm like taking, well, it's all PowerPoint slides, but I'm saying the echo date itself is going to some physical location.

562
00:54:38,380 --> 00:54:58,380
But again, in shared disk, we don't really have that, right, we have these stateless nodes. So the idea is here is that we would just do, we would logically assign different values or different hash values, or in this case, a range of two pulls within our table or database, and they would assign them to the different nodes.

563
00:54:59,380 --> 00:55:12,380
So now when a query shows up, like get ID equals one, my catalog service would tell me, okay, this node is responsible for that ID value, and it knows how to go get the data that it needs, and same thing for ID equals three.

564
00:55:14,380 --> 00:55:21,380
And then if I want to get multiple ones, again, I can then potentially go up to the one at top, and it can get the data for me.

565
00:55:23,380 --> 00:55:24,380
Yes.

566
00:55:24,380 --> 00:55:27,380
So the main benefit of the logical partition of the actual quality?

567
00:55:27,380 --> 00:55:34,380
So the question is the main benefit of logical partition and cache locality, as opposed to what physical partitioning?

568
00:55:34,380 --> 00:55:44,380
So like, so you have to do, in a shared disk system, you have to do this because the resting place of the location of the data isn't these nodes here.

569
00:55:45,380 --> 00:55:53,380
It's over here. So you got it aside. Okay, well if I query shows up, get ID equals three, get ID equals two, what node should be responsible for going at that data?

570
00:55:53,380 --> 00:56:03,380
Because you, yeah, to your point, like, if you just make it random, then anybody's reading any data, and then like, you're just fetching from shared disk over and over again, and it costs more, and it's going to be slower.

571
00:56:03,380 --> 00:56:13,380
But by doing this logical partitioning, you're potentially pinning the data here on this node to any query that shows up, you're more likely to have it already in your cache, not pay the penalty going to disk again.

572
00:56:14,380 --> 00:56:28,380
Yes. So I'm going to say a time, I'm going to skip, we've already discussed physical partitioning a bit. It's basically the same idea that you keep track of like, you know, where the data actually physically is located on the nodes.

573
00:56:28,380 --> 00:56:34,380
All right, so go back to my example here. What's the problem with this approach? If you're doing cache partitioning?

574
00:56:34,380 --> 00:56:40,380
Yes. He said, he said scratch screen. Yes, that's one, right?

575
00:56:40,380 --> 00:56:52,380
If I have a range scan, you know, get start select from table where partition key between this and this, if it's has partition, you can't do that.

576
00:56:52,380 --> 00:56:57,380
What's another problem?

577
00:56:57,380 --> 00:57:01,380
How do I scale out with this?

578
00:57:01,380 --> 00:57:05,380
Right? Add a new node. What I need to do now.

579
00:57:05,380 --> 00:57:16,380
I need it on my hashing to now mod by five. And that sucks because that's going to move data from from, you know, basically re-shuffles the entire data system.

580
00:57:16,380 --> 00:57:27,380
So that is one advantage of range partitioning, but now how to figure out the range, that's not true, not, not trivial as well.

581
00:57:27,380 --> 00:57:33,380
So there's actually a way to handle this, which is really clever. Who here has heard of consistent hashing before?

582
00:57:33,380 --> 00:57:39,380
No, okay. About half of it is more than previous years.

583
00:57:39,380 --> 00:57:43,380
So because this is a partition, this is a hashing, it's a really neat technique.

584
00:57:43,380 --> 00:57:49,380
It was invented by in the early 2000s at MIT in this project called cord.

585
00:57:49,380 --> 00:57:59,380
And basically what's going to allow us to do is, because allows you incremental addition and removal of nodes in our cluster using has partitioning without having to rebalance everything.

586
00:57:59,380 --> 00:58:03,380
And a bunch of different database systems are going to take advantage of this.

587
00:58:03,380 --> 00:58:14,380
So the basic idea is that you have this, say, this ring of locations of where a key might exist in your database.

588
00:58:14,380 --> 00:58:27,380
So let's say I have three partitions, P1, P2, P3. So now if I'm going to do a lookup, say, find me key one, I would hash it and produce a value of 0 and 1, and I would end up with some location in my ring.

589
00:58:27,380 --> 00:58:40,380
And now all I need to do is just have some kind of metadata, some lookup table, and say, okay, for this range for on my ring, what's the, if I go clockwise, what's the next partition I'm going to find?

590
00:58:40,380 --> 00:58:47,380
So if I land in the middle here, then I know that the data, the partition is going to have the data I need is on P1.

591
00:58:47,380 --> 00:58:55,380
So that's why I hash key two, I landed this part of the ring, then I know the slide around clockwise, and I find P3.

592
00:58:55,380 --> 00:59:10,380
So the way I think about it is that these colors here correspond to the range of hash values that these P3, P3, is from P3, here, all the way back to P2 and so forth.

593
00:59:10,380 --> 00:59:18,380
So far that's nice, but that doesn't solve our problem of how do we actually add new partitions.

594
00:59:18,380 --> 00:59:35,380
So what the ring provides for us, because it's circular, is that we can introduce a new partition somewhere in the ring, in this case here we add P4, and the only thing we need to reshuffle is any data that is now managed by this partition here along the ring.

595
00:59:35,380 --> 00:59:50,380
So it's only has to do with P3. So now all the data from P4 over here to P2 and the ring that used to be on P3, P3 has to send over here, and I don't need to move any other data in any other partition.

596
00:59:51,380 --> 01:00:02,380
Likewise, I get to add P5 here, and P6 here, and it just changes the range of the values that correspond to a given node.

597
01:00:03,380 --> 01:00:11,380
So now what's interesting about this next week is that you can actually use this ring also to replication.

598
01:00:11,380 --> 01:00:24,380
Meaning if I save a replication of factor 3, I want to have three copies of any key or any two-by-write database, I want three copies on different partitions.

599
01:00:25,380 --> 01:00:35,380
So if I do a write to P1, I just follow along the ring and find the next two partitions along that range, and I'll make sure I write the data there.

600
01:00:35,380 --> 01:00:50,380
So now if a query shows up, say I want to find key 1, again I could get actually data from either P1, P6, or P2, because they're the three closest ones clockwise in my ring.

601
01:00:51,380 --> 01:01:17,380
Now there's a bunch of games you can play about like, okay if I do a write, and I do a replication factor 3, should I wait for all three nodes to respond with the correct answer or acknowledgement that I did the right or maybe I can just maybe just get a majority, because if I do a read, should I wait for all three nodes in my ring, or is one of them coming back, is that good enough for me?

602
01:01:17,380 --> 01:01:29,380
Again, this is how we'll see this next week, when we do transactions, like we don't have to have full consistency or shrunk consistency, we may be okay with things eventually getting propagated across different nodes.

603
01:01:29,380 --> 01:01:32,380
And again, this is the new SQL guys do.

604
01:01:32,380 --> 01:01:51,380
So there's a bunch of systems here that use this. This actually technique for data bases, the original idea was developed at MIT in 2000s, and they had sort of a distributed hash table called Cored, but this famously was using databases and Amazon in this key value store called Dynamo.

605
01:01:51,380 --> 01:02:04,380
It's a paper 2007 that took the hell they were using this approach. In the fallout paper in 2022, they didn't say, okay, when we took the research system, Dynamo, and made the commercial version, Dynamo DB, they dropped consistent hashing.

606
01:02:05,380 --> 01:02:10,380
And then they use a the higher call replication scheme that we'll see next class.

607
01:02:11,380 --> 01:02:24,380
But a bunch of these systems use this and actually react was a no SQL system, they went under six, seven years ago, we can kind of see in the logo here, like there's the dots of the ring and the replication stuff because they're using consistent hashing.

608
01:02:24,380 --> 01:02:37,380
Snowflake doesn't do this for the catalog, they use Foundation DB, which is a fully transactional key value store for the catalog, but they use consistent hashing for caching of, and they're shared disc architecture.

609
01:02:37,380 --> 01:02:43,380
They're using consistent hashing to do logical partition of the metadata where things are located.

610
01:02:43,380 --> 01:02:48,380
And Cassandra is probably the most widely one that does this as well as catchphrase.

611
01:02:52,380 --> 01:03:05,380
So we'll talk more about transactions next class, but the basic big challenge is going to be transaction shows up, we look at a metadata service, a catalog service, and try to figure out what data they're going to need access.

612
01:03:06,380 --> 01:03:16,380
And then we're going to use that to figure out whether it's a single node transaction or like touching one partition, which is the best case scenario because we only have to check data within that single node.

613
01:03:17,380 --> 01:03:31,380
Or if it's a distributed transaction meaning we're touching data multiple nodes, multiple locations, then we've got to run distributed concurrency troll and a consensus protocol to make sure that everyone agrees that this transaction is allowed to commit, allow them to make the changes that it made.

614
01:03:32,380 --> 01:03:37,380
So we'll ignore replication for today and the next class will cover how we actually want to handle that as well.

615
01:03:37,380 --> 01:03:47,380
I showed replication and consistent hashing. I do a right to my database. I don't have like some number of copies to make sure that my data is always available even if there's a crash.

616
01:03:48,380 --> 01:04:01,380
So for if we want to support multiple operations on different nodes, then we need some way to coordinate the execution that turns actually.

617
01:04:02,380 --> 01:04:12,380
And the basic two approaches that you could have a sort of centralized coordinator that acts as a global traffic cop that has a complete view of what's going on at any time in our database system.

618
01:04:13,380 --> 01:04:22,380
Or it would be decentralized and let the nodes organize amongst themselves and talk amongst themselves to figure out what's actually going to be running and who's allowed to commit at what time.

619
01:04:23,380 --> 01:04:38,380
Most distributed data, this is going to use a hybrid approach where it's going to be decentralized meaning that there isn't going to be one dedicated machine or node that's going to be the traffic cop.

620
01:04:39,380 --> 01:04:51,380
But since it's slow to do distributed or decentralized concurrent control, they're going to elect the leader that's going to temporarily be the traffic cop coordinator and decide whether transaction allowed to commit.

621
01:04:51,380 --> 01:04:56,380
But if now that that node goes down, then you do a new leader election and somebody else can take over.

622
01:04:56,380 --> 01:05:01,380
And again, the spoiler is going to be we're going to use raft or Paxos to do that election.

623
01:05:02,380 --> 01:05:13,380
So I'm going to go through two different approaches, different examples of how you do these decentralized decentralized approaches and then that'll segue into how to be then coordinate transactions next class.

624
01:05:15,380 --> 01:05:23,380
So the first example of the early examples of doing distributed transactions was a centralized approach using what is called a TP monitor.

625
01:05:24,380 --> 01:05:38,380
So most of you have not heard of a TP monitor. I think the original T, the original, you know, what it stood for was, I think, originally, the outcome processing monitor, but that nobody refers through it as an hour.

626
01:05:38,380 --> 01:05:40,380
So now you say it's a transaction processing monitor.

627
01:05:40,380 --> 01:05:47,380
But think of it as like it's a separate server or separate demon running somewhere that can coordinate transactions across different nodes.

628
01:05:48,380 --> 01:06:01,380
And this is built in the 1970s, 1980s because there wasn't really, as I said in the early days, there wasn't a single distributed data system that was aware of different nodes and things like that.

629
01:06:01,380 --> 01:06:03,380
People sort of cobbled things together.

630
01:06:03,380 --> 01:06:13,380
And so they would build this TP monitor as a separate system that then could then coordinate transactions across different disparate database systems that didn't know that they were doing transactions and distributed way.

631
01:06:13,380 --> 01:06:19,380
It just saw something that they thought was a client telling it, you know, whether to commit or run a query and so forth.

632
01:06:19,380 --> 01:06:32,380
So the most famous one of these TP monitors is a system called Saber. This is built by American Airlines back in the 1970s for all like running transactions across different different databases for doing airline reservations.

633
01:06:32,380 --> 01:06:36,380
And there's a bunch of airlines that all still use Saber today.

634
01:06:36,380 --> 01:06:42,380
For one of us really slow to book airline stuff because there's running one shit from the 70s, right?

635
01:06:42,380 --> 01:06:48,380
In the 1990s, there was a movement to try to standardize the protocol for what the healthy TP monitors to talk different things.

636
01:06:48,380 --> 01:06:51,380
So this is called OpenXA or X Open.

637
01:06:51,380 --> 01:07:02,380
And again, most of the enterprise systems that none of us in this room can afford a good Oracle and Teradata and nonstop, they're all going to support this protocol.

638
01:07:02,380 --> 01:07:06,380
I think actually Postgres might be a little support some subset of it.

639
01:07:06,380 --> 01:07:14,380
But this is how they were going to have a standard API to have these, to have me to coordinate these TV monitors.

640
01:07:14,380 --> 01:07:16,380
So let's see example here.

641
01:07:16,380 --> 01:07:20,380
Again, I'm not saying whether there's a shared desk or a shared nothing system. It doesn't matter at this point.

642
01:07:20,380 --> 01:07:24,380
Matters like, okay, we have these partitions assumed that they can't talk directly to each other.

643
01:07:24,380 --> 01:07:27,380
How do we actually coordinate transactions?

644
01:07:27,380 --> 01:07:31,380
So, say if I want to have a transaction, I want to touch data of these three partitions.

645
01:07:31,380 --> 01:07:40,380
Again, assuming we know how to go to our metadata service to figure out what data we want to touch, the application server goes to the coordinator and says, hey, I want to lock data at this partition.

646
01:07:40,380 --> 01:07:43,380
And the coordinator is going to have its own local lock table.

647
01:07:43,380 --> 01:07:50,380
Just like you have on a single node system that knows about all the different partitions that are in the distributed database.

648
01:07:50,380 --> 01:07:54,380
And assuming now we just do, of course, the entire partition.

649
01:07:54,380 --> 01:08:03,380
So it'll go ahead and, you know, say, running two phase locking just before and acquire the locks on that data gets back an acknowledgement to the application server.

650
01:08:03,380 --> 01:08:08,380
Now the application server can send whatever queries it wants to the different partitions to do whatever it wants to do.

651
01:08:08,380 --> 01:08:15,380
And then when it's done doing those updates or look ups, it goes to the coordinator, says, hey, I want to commit this transaction.

652
01:08:15,380 --> 01:08:17,380
The coordinator then communicates the different partitions.

653
01:08:17,380 --> 01:08:23,380
This says, hey, is this thing saved to commit? Yes or no? Then if yes, then we get back an acknowledgement.

654
01:08:23,380 --> 01:08:33,380
Right? So as I said, there was a bunch of old systems that are still predicated or used this technology.

655
01:08:33,380 --> 01:08:40,380
The B.E.A. had this thing called Tuxedo from the 1980s that Oracle bought 10 years ago or 15 years ago.

656
01:08:40,380 --> 01:08:46,380
That was a TV monitor. Trans Arc was a, came out of the A.F.S. projects here at CMU.

657
01:08:46,380 --> 01:08:51,380
And then they did it, they did it, spin it off as a startup. It was acquired by IBM.

658
01:08:51,380 --> 01:08:56,380
You know, Jeff Eppinger in the software engineering department. He was the, he was the founder of that company.

659
01:08:56,380 --> 01:09:01,380
This is a, it's hard to read, but it says omid, omid.

660
01:09:01,380 --> 01:09:05,380
This is a, it's a TV, they don't call it a TV monitor because that's a data term.

661
01:09:05,380 --> 01:09:09,380
But it's a, it's a centralized transaction coordinator. They run HBASE transactions.

662
01:09:09,380 --> 01:09:15,380
That was developed by Yahoo Labs a few years ago. And still around today.

663
01:09:15,380 --> 01:09:25,380
All right. What is more common is to use this middleware approach where the, there's some software, some service running in between the application server and the database system itself.

664
01:09:25,380 --> 01:09:31,380
And so the application communicate directly with the, the partitions of the nodes. Everything has to go through the coordinator.

665
01:09:31,380 --> 01:09:38,380
Right. So you send query requests. The middleware maintains its own lock table, just like the, the TV monitor.

666
01:09:38,380 --> 01:09:43,380
And then it's responsible for sending the, acquiring lock sending queries to the different partitions.

667
01:09:43,380 --> 01:09:49,380
And then it's done. You get the commit request. You know, it's responsible. We're going to the, to the different partitions.

668
01:09:49,380 --> 01:09:58,380
And say, hey, am I allowed to commit yes or no? Right. So, I mean, there's a lot of commercial systems that, that do this now.

669
01:09:58,380 --> 01:10:02,380
But this is, this is how Facebook scaled out my sequel back in the day. Right.

670
01:10:02,380 --> 01:10:06,380
Because my sequel couldn't do to search his actions. They put a middleware thing in front of it.

671
01:10:06,380 --> 01:10:11,380
Or Google did the same thing with, with using my sequel for ads.

672
01:10:11,380 --> 01:10:19,380
If you're familiar with the tests or the, there's a startup called Planet scale. That's how they did transactions on my sequel for YouTube.

673
01:10:19,380 --> 01:10:26,380
I say YouTube runs on something like this. Right. This is very common.

674
01:10:26,380 --> 01:10:32,380
And the last one is a distributed decentralized approach. Again, where there is no bit of where there is no global transaction coordinator.

675
01:10:32,380 --> 01:10:38,380
Query shows up or request to start a transaction shows up some partition.

676
01:10:38,380 --> 01:10:46,380
How that, how we decided to go to the air versus another one, you can depends on what's in the metadata.

677
01:10:46,380 --> 01:10:51,380
So as the leader node for this transaction, and then you may create requests to different partitions.

678
01:10:51,380 --> 01:10:56,380
Then at some point it's going to go to the leader says, hey, I want to commit.

679
01:10:56,380 --> 01:11:05,380
And then leaders are as responsible for coordinating with other other other node deciding whether this is a lot of commit or not. Yes or no.

680
01:11:05,380 --> 01:11:12,380
Again, we'll go in more detail this next week.

681
01:11:12,380 --> 01:11:20,380
All right. So I'm going to show you a, I'm going to expose you to this idea of federated databases. I don't think it's actually pie is in the textbook.

682
01:11:20,380 --> 01:11:32,380
It's an old idea. I just want to show this to you again to see that as an example of like you can start doing some really interesting thing with distributed databases where it may not, may not be the case of the, the,

683
01:11:32,380 --> 01:11:37,380
that all the nodes your database are from running the same software from the same database system.

684
01:11:37,380 --> 01:11:47,380
I sort of mentioned that with the the TP monitor stuff was like these disparate systems were being coupled together and using TP monitor decide how to coordinate transactions on them.

685
01:11:47,380 --> 01:11:59,380
But the idea with federated databases is that it's almost like the middleware approach where you put something in front of the database systems that can make it look like it's all a single type of database system, but underneath the coverage it's rewriting queries for you.

686
01:11:59,380 --> 01:12:07,380
Right. And the reason why we want to do this is because in a lot of organizations when you guys got in the real world, a lot of companies have a ton of different databases.

687
01:12:07,380 --> 01:12:14,380
Right. Because some guy in some corner of the company that nobody's paying attention to, but a little app internally using mango or whatever.

688
01:12:14,380 --> 01:12:21,380
Because they thought it was cool because they saw on hacker news and it was fine when he was just using it, but then his, his buddy started using it and other things started using it before you know it.

689
01:12:21,380 --> 01:12:25,380
Half the company has to use this application and now the company has to support mango.

690
01:12:25,380 --> 01:12:31,380
But nevermind, they've been using Oracle or Postgres for years and now you know they have a bunch of new databases that support.

691
01:12:31,380 --> 01:12:37,380
So at large companies, it's never homogenous. People choose different databases all the time.

692
01:12:37,380 --> 01:12:48,380
And now you have these different data silos and ideally you want to have a single view of all your data and federated. This is our one way to do this.

693
01:12:48,380 --> 01:12:53,380
Right. So the idea is it's going to be distributed architecture using a middleware approach.

694
01:12:53,380 --> 01:13:05,380
That can expose to the application a single logical view of the database. Even though underneath the covers, you know, maybe something stores stuff as JSON, something storing stuff as as relational tables or whatever.

695
01:13:05,380 --> 01:13:11,380
But ideally you want your application only at the right queries against one, one data map.

696
01:13:11,380 --> 01:13:18,380
So as I said, this is an old idea because back to the 1990s, nobody does this really well.

697
01:13:18,380 --> 01:13:26,380
And nobody does this as efficiently as you possibly can because it's sort of like the lowest common denominator to support one system well.

698
01:13:26,380 --> 01:13:32,380
You want to be able to push down as much of the computations you can the query itself to that to that single system.

699
01:13:32,380 --> 01:13:36,380
But you may not be able to be able to do that based on queries and antics and other issues.

700
01:13:36,380 --> 01:13:41,380
So you got to pull a bunch of data to the centralized coordinator, then you're joined there do whatever you need to do.

701
01:13:41,380 --> 01:13:46,380
Right. Because the different database systems can't talk directly to each other. You always have to go through the coordinator.

702
01:13:46,380 --> 01:13:58,380
So let me go through an example here. So I have four different databases. My query goes to this middleware and the middleware is responsible for sending, dividing that query up into the corresponding queries that need a different database systems.

703
01:13:58,380 --> 01:14:02,380
And then they get results back on the middleware and I put it all together.

704
01:14:02,380 --> 01:14:11,380
Right. But again, the key ideas that we have a single logical view to the application of the data is even though it's spread across different machines.

705
01:14:11,380 --> 01:14:20,380
So again, it's like a distributed database that's doing partitioning. It's just that we now have to do some extra work to make it look like it's all unified, even though it's not.

706
01:14:21,380 --> 01:14:27,380
So if you were looking at Davis literature, these are going to call connectors usually. Postgres farm data wrappers can be used for this.

707
01:14:27,380 --> 01:14:37,380
There's this distributed or that system called presto. There's a fork of it called Treno that came out of Facebook because people don't like Facebook or something.

708
01:14:37,380 --> 01:14:46,380
But they have a bunch of connected different type of systems. And again, in some cases, they can do complete query push down. They can take a query, push it down, tie to the database system that has the data you need.

709
01:14:46,380 --> 01:14:53,380
In other cases, they have to copy one to the data back up, then do processing there to produce the answer that you need.

710
01:14:53,380 --> 01:14:56,380
Okay.

711
01:14:56,380 --> 01:15:02,380
All right. Last two slides. Can quick preview of what's what's your store store for us next week.

712
01:15:02,380 --> 01:15:07,380
So we write it this multiple times. We may need a lot of multiple transactions to execute.

713
01:15:07,380 --> 01:15:24,380
Some of the things that cross different nodes in our system. And we need to make sure that when they go to commit that we make sure that everyone agrees that this is allowed to happen and that it looks ideally that the changes are happening atomically, even though there's spread across different machines.

714
01:15:24,380 --> 01:15:33,380
It was hard enough to do this on a single box. Now we have to do this on multiple machines across different data centers. That's challenging.

715
01:15:33,380 --> 01:15:41,380
So replication will talk about next week. How do we, if we have the data in different copies of it in different locations, how to make sure that they're all in sync.

716
01:15:41,380 --> 01:16:01,380
The communication also expensive nodes could go down and it can be permanent like the machine catches on fire and it's never coming back or like this is a pause because you know the GC kicks in or the the disk starts defragging something stupid and then messages get delayed or something stupid like someone trips over a wire and pulls it out and they plug it back in.

717
01:16:01,380 --> 01:16:07,380
It comes back online and that's a forget what's going on. And now maybe even this the last like 30 seconds of transactions. What should we do?

718
01:16:07,380 --> 01:16:18,380
And then clock skew will be a big issue when we start about time stamp ordering because how do we make sure that everyone agrees that this is the right time stamp or when transaction wants to commit.

719
01:16:18,380 --> 01:16:24,380
Because again you can't use a logical counter always because now like you know how do you make sure that everyone's you know plus one at the same time.

720
01:16:24,380 --> 01:16:32,380
You can't maybe use a physical clock because the you know there's there's going to be drifting skew on the actual hardware itself.

721
01:16:32,380 --> 01:16:37,380
So it's really hard to make sure that clocks are actually in sync.

722
01:16:37,380 --> 01:16:47,380
And the split is going to be the way Google handles handles this with with Spanner is that they put a time of clocks in the data center and they use that to get the time make sure everything's in sync or they get the time from the GPS satellites.

723
01:16:47,380 --> 01:16:53,380
They use that for you know when they run transactions in in their database which is amazing.

724
01:16:53,380 --> 01:16:56,380
Nobody does that.

725
01:16:56,380 --> 01:17:02,380
So again we'll cover Spanner next week. Spanner is probably the might be one of the most advanced transactions from the systems.

726
01:17:02,380 --> 01:17:05,380
Google did a lot of amazing things in that.

727
01:17:05,380 --> 01:17:15,380
Took them a lot to get there right like they did a bunch of no SQL crap before but when they actually build a you know fully transaction system they were well ahead of everyone else.

728
01:17:15,380 --> 01:17:17,380
It's really fascinating.

729
01:17:17,380 --> 01:17:19,380
All right so let's see why this is hard.

730
01:17:19,380 --> 01:17:22,380
Here's how we want to do. See we're going to use two phase locking.

731
01:17:22,380 --> 01:17:29,380
So say we have two different application servers and our database is partitioned to two pieces here.

732
01:17:29,380 --> 01:17:36,380
So applications number one once it's set 80 equal to two application server over there once set B to equal to seven.

733
01:17:36,380 --> 01:17:40,380
That's fine because I can take locks on those those that data.

734
01:17:40,380 --> 01:17:45,380
And for this first transaction here he doesn't need any.

735
01:17:45,380 --> 01:17:48,380
48 and vice versa going the other way.

736
01:17:48,380 --> 01:17:53,380
But then the challenge is going to be if I want to start in my same transaction.

737
01:17:53,380 --> 01:17:58,380
The first guy wants to update B another guy wants to update a now what's the problem.

738
01:17:58,380 --> 01:18:02,380
The deadlock right but now it's a deadlock over a wider network potentially.

739
01:18:02,380 --> 01:18:07,380
And I have to figure out who's going to kill what to break the deadlock.

740
01:18:07,380 --> 01:18:11,380
Well I can't wait for a graph as we did before but where's this located.

741
01:18:11,380 --> 01:18:16,380
Is every node maintaining some weights or graph is a centralized coordinator.

742
01:18:16,380 --> 01:18:18,380
And what if one of those nodes goes down.

743
01:18:18,380 --> 01:18:23,380
You know say I decide oh this one's the younger one I want to kill this this transaction to break the deadlock.

744
01:18:23,380 --> 01:18:25,380
But then that no goes down doesn't get the message.

745
01:18:25,380 --> 01:18:27,380
And it comes back up and still think it has the locks.

746
01:18:27,380 --> 01:18:29,380
What do we do.

747
01:18:29,380 --> 01:18:31,380
All right.

748
01:18:31,380 --> 01:18:34,380
There's going to be no magical ball at the hand the handle this.

749
01:18:34,380 --> 01:18:37,380
It made it oftentimes just like okay I waited long enough.

750
01:18:37,380 --> 01:18:39,380
You know full steam head let's go.

751
01:18:39,380 --> 01:18:42,380
Or maybe the case of like okay well I.

752
01:18:42,380 --> 01:18:47,380
The majority of nodes I can't read I can't talk to so I'm assuming I have a split brain meaning I can't see the other side.

753
01:18:47,380 --> 01:18:50,380
So I'm going to stop running any queries.

754
01:18:50,380 --> 01:18:54,380
Until things get resolved and I come back.

755
01:18:54,380 --> 01:18:56,380
Right.

756
01:18:56,380 --> 01:19:00,380
So this is what we just cost next week after the break.

757
01:19:00,380 --> 01:19:04,380
Again the main takeaway from all this should be that this is all very very hard to do.

758
01:19:04,380 --> 01:19:09,380
And that in most cases people do not need most people don't need a distributed database.

759
01:19:09,380 --> 01:19:12,380
Repetition is a separate issue will handle that next class.

760
01:19:12,380 --> 01:19:15,380
But most people don't need to scale horizontally.

761
01:19:15,380 --> 01:19:18,380
99% of the databases are like 10 gigs 20 gigs maybe 100 gigs.

762
01:19:18,380 --> 01:19:22,380
But even then it's not going to be that big.

763
01:19:22,380 --> 01:19:25,380
And the cases that you do need a distributed database.

764
01:19:25,380 --> 01:19:31,380
Well there's a lot of these cloud services like snowflake or BigQuery or whatever like they'll handle all this for you.

765
01:19:31,380 --> 01:19:35,380
And you don't have to manage yourself.

766
01:19:35,380 --> 01:19:39,380
Transaction stuff is still very hard for OLAP because it's.

767
01:19:39,380 --> 01:19:41,380
There's other challenges but coordinate the concurrent.

768
01:19:41,380 --> 01:19:48,380
Virtual stuff is less than issue there right because you're not making a bunch updates all the time.

769
01:19:48,380 --> 01:19:55,380
All right so next class distribute O2Systems replication, cat theorem and then we'll talk a little about some real limitations.

770
01:19:55,380 --> 01:19:59,380
Okay question yes.

771
01:19:59,380 --> 01:20:10,380
Is question is in a shared system given that these charges far away from the computer.

772
01:20:10,380 --> 01:20:15,380
Do we still use a lot of pages for all to be absolutely yes.

773
01:20:15,380 --> 01:20:17,380
All of the stuff we talked about doesn't go away.

774
01:20:17,380 --> 01:20:19,380
Yes. Okay.

775
01:20:19,380 --> 01:20:21,380
All right hit it.

776
01:20:22,380 --> 01:20:23,380
Yeah.

777
01:20:23,380 --> 01:20:25,380
Yeah.

778
01:20:25,380 --> 01:20:28,380
I'm the poppy with the mother fucking.

779
01:20:28,380 --> 01:20:31,380
28 gram the pen and on if it's good.

780
01:20:31,380 --> 01:20:33,380
You ain't hit them all yet.

781
01:20:33,380 --> 01:20:34,380
Still got your sugar.

782
01:20:34,380 --> 01:20:37,380
I smack you with the bottom of the clip to tell you.

783
01:20:37,380 --> 01:20:38,380
Look up.

784
01:20:38,380 --> 01:20:39,380
Show me what it's safe.

785
01:20:40,380 --> 01:20:43,380
I got a block on tap.

786
01:20:43,380 --> 01:20:45,380
The feds can't trace that.

787
01:20:45,380 --> 01:20:46,380
Style is like temp or proof.

788
01:20:46,380 --> 01:20:47,380
You can't lace that.

789
01:20:47,380 --> 01:20:50,380
The Dominic and oh you could call me Dominican.

790
01:20:50,380 --> 01:20:51,380
Black Skelly.

791
01:20:51,380 --> 01:20:52,380
Black.

792
01:20:52,380 --> 01:20:53,380
Another black sweat.

793
01:20:53,380 --> 01:20:54,380
Timberlands.

794
01:20:54,380 --> 01:20:55,380
My whole black 38 is sent you to the perigates.

795
01:20:55,380 --> 01:20:58,380
You get the slumber trying to skate and that's your first mistake.

796
01:20:58,380 --> 01:21:00,380
I ain't lying for that cake.

797
01:21:00,380 --> 01:21:02,380
If you're not a fan of the same thing, you can't do it.

798
01:21:02,380 --> 01:21:04,380
I'm not a fan of the same thing.

799
01:21:04,380 --> 01:21:05,380
I'm not a fan of the same thing.

800
01:21:05,380 --> 01:21:06,380
I'm not a fan of the same thing.

801
01:21:06,380 --> 01:21:07,380
I'm not a fan of the same thing.

802
01:21:07,380 --> 01:21:09,380
I ain't lying for that cake.

803
01:21:09,380 --> 01:21:10,380
If you're not a fan of the same thing, you can't do it.

804
01:21:10,380 --> 01:21:11,380
I ain't lying for that cake.

805
01:21:11,380 --> 01:21:12,380
If you're not a fan of the same thing, you can't do it.

806
01:21:12,380 --> 01:21:13,380
I ain't lying for that cake.

807
01:21:13,380 --> 01:21:14,380
If you're not a fan of the same thing, you can't do it.

808
01:21:14,380 --> 01:21:15,380
I ain't lying for that cake.

809
01:21:15,380 --> 01:21:16,380
If you're not a fan of the same thing, you can't do it.

810
01:21:16,380 --> 01:21:17,380
I ain't lying for that cake.

811
01:21:17,380 --> 01:21:18,380
If you're not a fan of the same thing, you can't do it.

812
01:21:18,380 --> 01:21:19,380
I ain't lying for that cake.

813
01:21:19,380 --> 01:21:20,380
My grand's is heavy weight.

814
01:21:20,380 --> 01:21:21,380
The grand's through every state.

815
01:21:21,380 --> 01:21:22,380
When they ask how I'm living, tell them I'm living great.

816
01:21:22,380 --> 01:21:23,380
I ain't lying for that cake.

817
01:21:23,380 --> 01:21:24,380
I ain't lying for that cake.

818
01:21:24,380 --> 01:21:25,380
I ain't lying for that cake.

