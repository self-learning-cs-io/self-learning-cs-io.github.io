---
title: MIT6824 P5Lecture5FaultToleranceRaft1
---

1
00:00:00,000 --> 00:00:09,000
So the topic for today is raft replication photo of a protocol.

2
00:00:09,000 --> 00:00:11,000
We'll discuss in quite a bit of detail.

3
00:00:11,000 --> 00:00:14,000
In fact, we're going to spend multiple lectures on it.

4
00:00:14,000 --> 00:00:19,000
And one because it's sort of one of the core elements of examples of

5
00:00:19,000 --> 00:00:23,000
a distributed replication protocol.

6
00:00:23,000 --> 00:00:28,000
So today, I've been emotionally focusing on, you know,

7
00:00:28,000 --> 00:00:33,000
the material that is necessary for labs to A and to B.

8
00:00:33,000 --> 00:00:37,000
So the election of the leader as well as pushing the logs around.

9
00:00:37,000 --> 00:00:43,000
And then next week.

10
00:00:43,000 --> 00:00:48,000
We're focusing more on to C and to D mainly the snapshots.

11
00:00:48,000 --> 00:00:52,000
And the walk compaction and gives us opportunity to do this kind of

12
00:00:52,000 --> 00:00:53,000
other aspect of raft.

13
00:00:53,000 --> 00:00:58,000
In fact, we'll talk about wrap one more time in the week after.

14
00:00:58,000 --> 00:01:03,000
We'll have a few in a lecture.

15
00:01:03,000 --> 00:01:06,000
On, you know, to A and to B and so on.

16
00:01:06,000 --> 00:01:10,000
Talk about the actual solutions to the labs to A and to B.

17
00:01:10,000 --> 00:01:13,000
Okay, that's the point.

18
00:01:13,000 --> 00:01:19,000
And so I'm going to just dive in with the starting point for today.

19
00:01:19,000 --> 00:01:28,000
The place probably to start is to observe that in some of the previous case studies of replicated systems,

20
00:01:28,000 --> 00:01:32,000
we've seen this sort of a pattern.

21
00:01:32,000 --> 00:01:36,000
You look at GFS, and that produce.

22
00:01:36,000 --> 00:01:41,000
From FMFT, they all have a single point of failure.

23
00:01:41,000 --> 00:01:48,000
So even though they're replicated systems and they do replication for fall tolerance.

24
00:01:48,000 --> 00:01:52,000
All of them actually have a single point of failure.

25
00:01:52,000 --> 00:01:59,000
In the case of the core in the producer versus the coordinator.

26
00:01:59,000 --> 00:02:03,000
In the case of GFS, you know, the master.

27
00:02:03,000 --> 00:02:06,000
The heads out the leases, for example.

28
00:02:06,000 --> 00:02:09,000
And in the.

29
00:02:09,000 --> 00:02:17,000
PMFT case is the store server or really the test and set server.

30
00:02:17,000 --> 00:02:37,000
The reason, you know, why as we discussed in the previous lecture, the reasons that actually there are, you know, single machines instead of replicated machines is to avoid, you know, displayed brain syndrome.

31
00:02:37,000 --> 00:02:46,000
And you know, for many systems, you know, one way in the sort of a bummer, right, we're building a high performing, you know, we're building false their fault tolerance systems.

32
00:02:46,000 --> 00:02:55,000
And on all these designs, actually, we do actually still have sort of a single point of failure, even though we're replication is used for many other aspects of these system designs.

33
00:02:55,000 --> 00:03:00,000
And for many of the systems that we talk so far about, you know, this.

34
00:03:00,000 --> 00:03:06,000
To avoid this is playing to the syndrome and actually introduce a single point of failure or maintain a single point of failure.

35
00:03:06,000 --> 00:03:12,000
There's a perfectly acceptable in many cases, because in many of these cases, like if the.

36
00:03:12,000 --> 00:03:17,000
The store server or you know, the master goes down, you know, hopefully.

37
00:03:17,000 --> 00:03:23,000
It will, it's only single machines or the chance of going down the smaller than any out of the chalk servers.

38
00:03:23,000 --> 00:03:33,000
And you know, probably there's somebody ready to be beat up, you know, in the case that the master goes down comes back up and can really make sure there's only one master online.

39
00:03:33,000 --> 00:03:36,000
So, you know, many, many circumstances is perfectly fine.

40
00:03:36,000 --> 00:03:39,000
You know, we'll leave maybe to a very short downtime.

41
00:03:39,000 --> 00:03:47,000
But you know, some systems can it's really nice. It wouldn't really nice is actually if this we didn't even have to have to single points of failure.

42
00:03:47,000 --> 00:03:52,000
So we could reduce downtime even further and.

43
00:03:52,000 --> 00:03:55,000
And and and and and and create uptown.

44
00:03:55,000 --> 00:04:00,000
And so, and that's really where you know the protocols of the style of protocols that raft.

45
00:04:00,000 --> 00:04:03,000
You know, fits into coming to play.

46
00:04:03,000 --> 00:04:16,000
But just before in diving into or talking about sort of the key ideas in the protocol, let's remind ourselves why you know this sort of single point of failure leads or why actually replicating.

47
00:04:16,000 --> 00:04:24,000
The sort of crucial single point of failure is like a test and set server can lead you know to this split brain problem.

48
00:04:24,000 --> 00:04:34,000
And so you might think you know why why just replicate you know the single point of failure to so let's try to do that and then we'll quickly see what the problem is.

49
00:04:34,000 --> 00:04:44,000
So let's replicate the test and set server.

50
00:04:44,000 --> 00:04:50,000
And so.

51
00:04:50,000 --> 00:04:59,000
So let's do this simple, you know, there's a straightforward case, you know, we'll just have one replicated one test and set server as one.

52
00:04:59,000 --> 00:05:04,000
And here we have s2 is the other replicated test set server.

53
00:05:04,000 --> 00:05:07,000
And just remind correct the like test and set.

54
00:05:07,000 --> 00:05:13,000
And it takes an argument new in the return to your value.

55
00:05:13,000 --> 00:05:25,000
And the goal is that if two clients at the same time call test and set, you know, one wins, you know, gets a visually falls back as the old value and the other one will lose because it will get true back as the.

56
00:05:25,000 --> 00:05:26,000
The old value.

57
00:05:26,000 --> 00:05:36,000
So let's just see how this might work. Play out so we have a client with calls, just and set and you know communicates with the first server.

58
00:05:36,000 --> 00:05:39,000
What's the second server.

59
00:05:39,000 --> 00:05:48,000
And we don't really know actually doesn't get a response for the second server.

60
00:05:48,000 --> 00:05:57,000
And so there's sort of two cases now, right? We're going to why if s2 doesn't respond, you know, there's two possible reasons why that could be the case.

61
00:05:57,000 --> 00:06:06,000
So one case could be s2 didn't respond because s2 failed.

62
00:06:06,000 --> 00:06:14,000
And in some case, and that's not really what we'd like to be doing is that at that point, basically, c1 just declare victory.

63
00:06:14,000 --> 00:06:23,000
You know, since you know, nobody else can actually see or deserve, you know, the value as to, you know, what should be done because you proceed.

64
00:06:23,000 --> 00:06:26,000
But the problem is that there's the second case.

65
00:06:26,000 --> 00:06:32,000
And the second case is that there's a network petition.

66
00:06:32,000 --> 00:06:38,000
No, to a network petition between c1 and see an s2.

67
00:06:38,000 --> 00:06:49,000
So in that case, really, c1 cannot proceed because there could be another client, you know, c2 and actually communicating with s2.

68
00:06:49,000 --> 00:07:00,000
And it would be terrible correct if c1 proceeds in this case, because it might then update s1, get them basically the false value, think it succeeds.

69
00:07:00,000 --> 00:07:05,000
But at the same time, s2 communicates with s2 and also succeeds doing the test and set.

70
00:07:05,000 --> 00:07:09,000
And so now we're violating the contract of the test and set.

71
00:07:09,000 --> 00:07:17,000
And so this is this issue of this split ring, like one, there's a network petition. We can end up in a situation where.

72
00:07:17,000 --> 00:07:25,000
Both serves an upper running and serve a different subset of the clients and thereby violating the contract with the specification of the system that we're building.

73
00:07:25,000 --> 00:07:32,000
And the real challenging part here is that c1 just cannot tell the difference between these two situations.

74
00:07:32,000 --> 00:07:38,000
It doesn't know where it actually is.

75
00:07:38,000 --> 00:07:43,000
You know, s3 is not reachable because it failed or because of the network petition.

76
00:07:43,000 --> 00:07:50,000
And so that's sort of the conundrum that that, you know, that's behind all this.

77
00:07:50,000 --> 00:07:54,000
The previous systems and why they sort of use this single.

78
00:07:54,000 --> 00:08:00,000
Why they don't replicate, you know, these crucial services that need to be up to avoid.

79
00:08:00,000 --> 00:08:05,000
To avoid the split frames in your.

80
00:08:05,000 --> 00:08:07,000
So.

81
00:08:07,000 --> 00:08:13,000
What can be done about this and really the key problem here is what can do, what can we do about network petitions?

82
00:08:13,000 --> 00:08:25,000
How could we handle them? And so there's a key idea that sits in raft and in many other protocols that underwise.

83
00:08:25,000 --> 00:08:30,000
Basically, the solution or why those protocols actually might succeed.

84
00:08:30,000 --> 00:08:38,000
And really what it is, you know, in sort of the nutshell, it is this majority rule.

85
00:08:38,000 --> 00:08:42,000
And just to give the example in the context of the test and sets in your server.

86
00:08:42,000 --> 00:08:47,000
Instead of actually running the server with two replicas, which I conveniently did.

87
00:08:47,000 --> 00:08:50,000
I'm going to run it with free.

88
00:08:50,000 --> 00:08:55,000
So, as a one S two and S three.

89
00:08:55,000 --> 00:09:01,000
And the rule that was going to be the like, a server, a client can consider an operation succeeded.

90
00:09:01,000 --> 00:09:04,000
If it at least cannot be the majority of the service.

91
00:09:04,000 --> 00:09:09,000
So in this case, you know, we can send, you know, messages as long for the doing test and set.

92
00:09:09,000 --> 00:09:11,000
We said the message to S two for doing the test and set.

93
00:09:11,000 --> 00:09:15,000
Then we get back positive responses, you know, from both of them.

94
00:09:15,000 --> 00:09:18,000
And then we also have a file in both of the case.

95
00:09:18,000 --> 00:09:23,000
Then we'll return a false to actually application and application considered the test and set succeeded.

96
00:09:23,000 --> 00:09:29,000
And of course, we do it also to defer it one, but the third one made actually, you know, the message actually might not arrive or the server might be down.

97
00:09:29,000 --> 00:09:33,000
We don't really know, but actually we don't really care.

98
00:09:33,000 --> 00:09:41,000
Because consider the following situation scenario where we have the second client also trying to do a test and set.

99
00:09:41,000 --> 00:09:46,000
And it's going to succeed. It has to talk to the majority of the servers.

100
00:09:46,000 --> 00:09:52,000
So whatever majority is going to talk to it is going to include either S one or S two.

101
00:09:52,000 --> 00:09:57,000
And for S one and a two, both of these operations actually have succeeded by S C one.

102
00:09:57,000 --> 00:10:07,000
So S two of C two, well, all the way to observe the result of C once operation because there's sort of an overlap.

103
00:10:07,000 --> 00:10:27,000
And we'll see basically in raft. This is exactly the same things are just roughly what's going on.

104
00:10:27,000 --> 00:10:37,000
We're like one of leader accepts or enter the operation in the in a log of the majority of the followers.

105
00:10:37,000 --> 00:10:40,000
Then it means that the subsequent leader that's going to come on the next term.

106
00:10:40,000 --> 00:10:45,000
You know, we'll also try to acquire a majority to get the voted as the leader.

107
00:10:45,000 --> 00:10:55,000
And as part of the voting, you know, there's going to be one server or one follower that actually has seen the last operation performed by the last leader.

108
00:10:55,000 --> 00:11:13,000
And so that is going to basically be able to build a building stone on on which we can build these fault tolerance services that can handle network petitions in a failure or servers, well still achieving strong consistency.

109
00:11:14,000 --> 00:11:21,000
Another way to think about this majority business is that if the network petitions.

110
00:11:21,000 --> 00:11:25,000
There can be only one partition that has a majority.

111
00:11:25,000 --> 00:11:28,000
There can be no other partition that has a minority.

112
00:11:28,000 --> 00:11:35,000
And so only the partition that actually has the majority can actually proceed.

113
00:11:35,000 --> 00:11:45,000
Another way of saying that name another implication of that is it could also be the case that there is a there are multiple petitions and there's no majority anywhere.

114
00:11:45,000 --> 00:12:04,000
And in that particular case, you know, the system can just not proceed and and clients talking to it basically have to wait until you know the network is healed enough that at least there's one that there's going to be at least one partition with a majority of servers.

115
00:12:04,000 --> 00:12:18,000
The another sort of quick observation here is that of course you may want to get this particular scheme that I just described that preserves only tolerates one server going down correct two servers going down nobody can actually obtain a majority.

116
00:12:18,000 --> 00:12:30,000
And so therefore nobody can actually no client can actually get the operation through clearly it's easy to extend this idea by what's difficult is called like doing two two F plus one replication.

117
00:12:30,000 --> 00:12:41,000
So if you want to tolerate F faults instead of one you need two plus F one for the server server so that at least you have always a minority majority of F fails.

118
00:12:41,000 --> 00:12:51,000
And so in the case of you know here at F is one is a we're running the free service you want F to be two you have five servers etc etc you want F to be free you have seven servers.

119
00:12:52,000 --> 00:13:09,000
Okay one other thing that's maybe important to point out and I came up a lot in the questions you know what is actually the majority and the majority is the majority of all the servers that are there you know both up ones in the downloads.

120
00:13:09,000 --> 00:13:18,000
And so when you take a majority you don't take the majority of the two with their only two alive you take a majority of all the servers in the system.

121
00:13:19,000 --> 00:13:30,000
Any questions about this sort of key idea of and there be an even number of servers like if you have four servers with the majority then be 30.

122
00:13:30,000 --> 00:13:45,000
Yeah and we'll see that in a couple cases correct in the graph that you know if you know the number servers is reduced from seven to six and one is down and you still want to proceed you need a majority which you still need in a four server to actually proceed.

123
00:13:45,000 --> 00:13:55,000
But if you can get the four servers then you can keep it going.

124
00:13:55,000 --> 00:13:58,000
Okay any other questions.

125
00:13:58,000 --> 00:14:08,000
So I also have a question about the majority so does the majority consider the server itself so suppose you're wrapped this like the server itself consider in this.

126
00:14:08,000 --> 00:14:29,000
Yeah yeah it's part of it so like you know often when we see in a rafkreg the leader voted me for the self or the candidate vote for itself and in the leader when it depends you know to its own log it counts that as one so it's part of it.

127
00:14:29,000 --> 00:14:47,000
Okay so there's quite a number of protocols using this idea and sometimes this ideas refer to as corans or quorum protocols.

128
00:14:47,000 --> 00:15:06,000
Yeah for you know these reason and there were sort of two you know the state of the art for a long time until like the early 90s or late 80s was there's basically there's no protocol so basically we're always in the situation of like this single point of failure.

129
00:15:06,000 --> 00:15:24,000
And then in early 90s there were two protocols that came we're in vending roughly at the same time when it's called paxis which is mentioned in the paper quite a bit and the other one is called view stamp replication.

130
00:15:24,000 --> 00:15:31,000
Sometimes called VR and these were these were invented around 1990.

131
00:15:31,000 --> 00:15:42,000
So you get much attention at that point in time because people that I'm really have pressing need to be able to sort of completely automatic and a fault all of systems.

132
00:15:42,000 --> 00:15:58,000
But I changed in the last 15 years or in the last 15 years was much use of these protocols.

133
00:15:58,000 --> 00:16:06,000
In fact, you know sort of interesting to correct that is in the last 15 years.

134
00:16:06,000 --> 00:16:10,000
And as basically there were sort of 15 years after these protocols were invented.

135
00:16:10,000 --> 00:16:18,000
So basically they set on the table or set on the shelf for 15 years until people actually had a real use case for that.

136
00:16:18,000 --> 00:16:31,000
The protocol that we're going to be mostly we're going to be implementing in the lab and we're going to discuss in the lecture and then which the topic of the paper is you know false in this you know lineage of protocol and this gold raft.

137
00:16:31,000 --> 00:16:38,000
And it was I think there was came about or was written up in 2013 14 the papers from 2014.

138
00:16:38,000 --> 00:16:48,000
And this is one of the more complete descriptions you know touches on a lot of different aspects if you're going to be able to complete replicate the state machine and explain those clearly.

139
00:16:48,000 --> 00:16:56,000
That's one of a reason why we're using it for the labs and you know for this particular election.

140
00:16:56,000 --> 00:17:04,000
Any any questions about sort of the sort of the history here around protocols.

141
00:17:04,000 --> 00:17:25,000
So let me first sort of talk a little bit about how you one would use raft to build the replicate the state machine.

142
00:17:25,000 --> 00:17:40,000
And so the basic way you would use raft and what you do this in lab three.

143
00:17:40,000 --> 00:17:44,000
Let's say you have a server.

144
00:17:44,000 --> 00:17:47,000
And the raft is basically nothing else in a library.

145
00:17:47,000 --> 00:17:56,000
And so in our setting that's going to be go package and you know you can write a replicate the state machine by basically importing that package.

146
00:17:56,000 --> 00:18:03,000
So here's we got you know you know raft at the bottom.

147
00:18:03,000 --> 00:18:08,000
And you know you build a server you know using raft.

148
00:18:08,000 --> 00:18:15,000
And so for example in lab three we're going to build a key value server using raft.

149
00:18:15,000 --> 00:18:24,000
And clients talk to the key value servers.

150
00:18:24,000 --> 00:18:30,000
And you know submit put and get operations.

151
00:18:30,000 --> 00:18:34,000
The key value servers when it receives you know one of these put and get operations.

152
00:18:34,000 --> 00:18:37,000
It basically hands it off to raft.

153
00:18:37,000 --> 00:18:44,000
And so it basically puts it to the raft and actually sticks it in a one will I will see you know much more detail.

154
00:18:44,000 --> 00:18:46,000
Put it in the log.

155
00:18:46,000 --> 00:18:49,000
Actually, probably slightly differently.

156
00:18:49,000 --> 00:18:55,000
So it depends it to their log.

157
00:18:55,000 --> 00:19:03,000
And then the raft internally is going to talk to other servers to basically replicate that law.

158
00:19:03,000 --> 00:19:06,000
And so here are some other servers.

159
00:19:06,000 --> 00:19:11,000
They're basically structured exactly the same way you know they have a raft library component.

160
00:19:11,000 --> 00:19:13,000
And the key value server.

161
00:19:13,000 --> 00:19:17,000
Like in many other replicate state machines that we've seen.

162
00:19:17,000 --> 00:19:19,000
Identical.

163
00:19:19,000 --> 00:19:21,000
And keep value servers.

164
00:19:21,000 --> 00:19:25,000
And we're going to play the same game as I know the other previous replicate state machines we're seeing.

165
00:19:25,000 --> 00:19:30,000
We're basically feeding operations to the key value servers in the same order.

166
00:19:30,000 --> 00:19:32,000
Everywhere.

167
00:19:32,000 --> 00:19:37,000
And as a result, the key replica has all applied operations in the exact same order.

168
00:19:37,000 --> 00:19:41,000
You know we should say the same key value stores being built.

169
00:19:41,000 --> 00:19:45,000
Right. So we have a key value store here, whatever key 20.

170
00:19:45,000 --> 00:19:47,000
Now some value.

171
00:19:47,000 --> 00:19:49,000
We're applying the updates to this kind of table.

172
00:19:49,000 --> 00:19:51,000
Exactly in the same order and all the replicas.

173
00:19:51,000 --> 00:19:53,000
You know things should be should be good.

174
00:19:53,000 --> 00:19:56,000
We're going to have an identical replicas.

175
00:19:56,000 --> 00:20:00,000
So the way you know raft is structured is that one of the replicas is the leader.

176
00:20:00,000 --> 00:20:03,000
So let me in this for convenience.

177
00:20:03,000 --> 00:20:05,000
You know that's going to be the first one on the site.

178
00:20:05,000 --> 00:20:08,000
And then just actually declines the talk to the leader.

179
00:20:08,000 --> 00:20:11,000
And then.

180
00:20:11,000 --> 00:20:13,000
What happens next is that the.

181
00:20:13,000 --> 00:20:19,000
So the client talks to one of the leader that lead the KV server for KV server.

182
00:20:19,000 --> 00:20:24,000
At pens log entry to the raft log of the leader.

183
00:20:24,000 --> 00:20:30,000
And then you know basically communicates you know with the other raft light reach.

184
00:20:30,000 --> 00:20:36,000
And then there's raft lighters to exactly the same thing basically they repent you know the operation you know to the log.

185
00:20:36,000 --> 00:20:40,000
To their logs.

186
00:20:40,000 --> 00:20:46,000
And send the response back you know to the leader.

187
00:20:46,000 --> 00:20:56,000
And you know of course you know all this status torque you know the log and some other status store down this so that you know any one of them fails.

188
00:20:56,000 --> 00:21:03,000
They at least have the last part of their log you know still available and can build from there.

189
00:21:03,000 --> 00:21:12,000
So once you know basically and we'll talk a little bit more in detail but once the entry or log entry is replicated on you know free servers.

190
00:21:12,000 --> 00:21:18,000
Then they can actually be delivered in order you know to the key value server.

191
00:21:18,000 --> 00:21:27,000
So the every committed operation and every log has an index or ever offer up as net an index zero actually one to three for whatever in order.

192
00:21:27,000 --> 00:21:30,000
And they're going to be delivered in order to the key value server.

193
00:21:30,000 --> 00:21:40,000
So once an operation committed it's going to be delivered to the key value server key value server performs the operation maybe updates the key value table.

194
00:21:40,000 --> 00:21:45,000
And then since actually the leader alone since response back to the client.

195
00:21:45,000 --> 00:21:56,000
So that's sort of roughly the sequence of events that happens so clients and request to the leader leader in search game raft raft you know chitchat with the other servers.

196
00:21:56,000 --> 00:22:00,000
Once you know it's replicated in an enough machines.

197
00:22:00,000 --> 00:22:10,000
Then you know the is considered to be committed and we'll talk a little bit more precisely what committed means and then committed operation is delivered to the key value server.

198
00:22:10,000 --> 00:22:17,000
And then they execute the operation and respond to the client leader response the client.

199
00:22:17,000 --> 00:22:24,000
So what happens on the failure.

200
00:22:24,000 --> 00:22:30,000
The new leaders elected.

201
00:22:30,000 --> 00:22:34,000
It will take over the role of your leader.

202
00:22:34,000 --> 00:22:39,000
And so for example like in this particular picture it might be the case that.

203
00:22:39,000 --> 00:22:42,000
You know this leader crashes.

204
00:22:42,000 --> 00:22:45,000
And you know this becomes the new leader in the next term.

205
00:22:45,000 --> 00:22:53,000
So we'll see exactly what that means. And then the clients basically foil over you know they will see they don't get a response so they will time out.

206
00:22:53,000 --> 00:22:59,000
And the failure over to the second leader the new leader and basically retry their operation.

207
00:22:59,000 --> 00:23:12,000
And so they insert you know that new leader will take their operation inserted back into raft you know the same things happens as before and maybe this time we get lucky and we actually get the operation without any failures.

208
00:23:12,000 --> 00:23:15,000
And if you think a little bit carefully about this that does mean that.

209
00:23:15,000 --> 00:23:23,000
A client operation might end up twice in the log right because it actually may be the case that the first time it succeeded but just didn't get the response.

210
00:23:23,000 --> 00:23:35,000
So it doesn't know that succeeded will retry you know this new leader will put the log group the new record the retried operation also in the log and it will pop out you know at some point in.

211
00:23:35,000 --> 00:23:45,000
And so it at the key key value service and actually be a duplicate and so as you will see later in the.

212
00:23:45,000 --> 00:24:01,000
Lottery actually turns out that the you know the lot you need to do duplication detect duplicates.

213
00:24:01,000 --> 00:24:19,000
But that's mostly an issue for lottery is not going to be an main issue for now but it's important to know that sort of this is the sort of general style in which you know you're one would actually use raft to build a replicate state machine.

214
00:24:19,000 --> 00:24:25,000
Any questions about sort of the how to use raft for replicate state machines.

215
00:24:25,000 --> 00:24:35,000
Yeah, but it's a difficult number of clients contacting the leader leader.

216
00:24:35,000 --> 00:24:40,000
Well, there could be many there's no real limit on it.

217
00:24:40,000 --> 00:24:53,000
What you will see you know it could be the case that a single machine can't I mean maybe that's implicitly about the question is it could be the case that the single leader can just not tolerate the is not capable of handling not many clients.

218
00:24:53,000 --> 00:25:02,000
So what happens then is that basically the service gets charted you know you chart the key service in multiple raft groups.

219
00:25:02,000 --> 00:25:11,000
So example chart one would be one raft instance chart two we are after instance chart free we are after instance and the clients you know talk to the appropriate.

220
00:25:11,000 --> 00:25:23,000
Chart to be to reply the operations and in that way we can scale the server to many clients and the fact that is what lap four does.

221
00:25:23,000 --> 00:25:32,000
How does the client know how to communicate with the new leader after the old leader fails the client basically has a list of all the servers that are in the system.

222
00:25:32,000 --> 00:25:42,000
So in this case we're running with free servers everybody agrees they're only free servers in the world declines know about the free server and they try one randomly.

223
00:25:42,000 --> 00:25:51,000
And if that is not the client it will redirect if that's not the leader it will redirect the client to the appropriate one to actually.

224
00:25:51,000 --> 00:25:54,000
Yeah, the answer is quite.

225
00:25:54,000 --> 00:26:01,000
Do we assume the servers are like in a geographically close look like close to each other or to maybe.

226
00:26:01,000 --> 00:26:23,000
In principle be far apart there's no real restriction on that site the only issue of course is if the client if the service are fair spread around the world the delays to actually know get in lock record dependent you know we'll take a little while so the delays will be long.

227
00:26:23,000 --> 00:26:28,000
What is the lock entry being executed in the KV storage.

228
00:26:28,000 --> 00:26:46,000
One once it's committed by raft so once raft has decided that all the North replicas have received it and it's now no way possible one has to back out of that operation then it's handed to the key value server.

229
00:26:46,000 --> 00:26:55,000
The leader will first like execute this command and the leader will tell the followers that this command is committed and then the follow up.

230
00:26:55,000 --> 00:27:03,000
The leader knows as soon as the leader knows that the operations committed X and can hand it off to his T value server let me let's talk about it right now.

231
00:27:03,000 --> 00:27:06,000
And although in more detail let's me go.

232
00:27:06,000 --> 00:27:25,000
And a little bit more of an overview of the protocol so previous board was sort of an overview of how you use raft to build and replicate the state machine and let's look at the raft itself a little bit more detail so we're here some timelines we got a leader we got two followers.

233
00:27:25,000 --> 00:27:30,000
So we're running the free decline to get a talk student leader.

234
00:27:30,000 --> 00:27:36,000
The leader has a log you know of all the.

235
00:27:36,000 --> 00:27:42,000
You know when it gets a new one you know pens it you know to the end of the log.

236
00:27:42,000 --> 00:27:48,000
Then it's actually sends it you know sends the log entries to.

237
00:27:48,000 --> 00:27:56,000
New log entries you know to the followers.

238
00:27:56,000 --> 00:28:09,000
And let's say you know that follower to here for one here for two follow one actually received this log entry everything is okay it's a pen to the end of the log it sends you basically an act backs and yes you know I appended it.

239
00:28:09,000 --> 00:28:19,000
And at this point you know in the raft view of the world to servers actually have the log entry.

240
00:28:19,000 --> 00:28:24,000
And so raft actually the leader can actually commit the log entry.

241
00:28:24,000 --> 00:28:37,000
And so at this point you know the the leader can actually hand off that requested just in a receipt and can actually hand it off to the kv server.

242
00:28:37,000 --> 00:28:45,000
And the way actually the log dust is or just the lab infrastructure dust is that basically we have a channel a go channel.

243
00:28:45,000 --> 00:29:02,000
One single go channel we're basically raft go routines and the route go routine that actually decide that a particular operation is committed and just sends that operation on the applied channel so that the key value service connects the applied.

244
00:29:02,000 --> 00:29:10,000
And so for later to notice at this point that the leader basically has committed the operation.

245
00:29:10,000 --> 00:29:22,000
And it's perfectly safe for the leader to commit this operation because the majority of the servers actually the majority of the peers actually have received the operation correct so this even if there was a failure.

246
00:29:22,000 --> 00:29:34,000
And they elected new leader and that's the case that that leader or one of the servers that is remaining actually has the last operation that was appended to the log by the previous leader.

247
00:29:34,000 --> 00:29:43,000
So everything is good of course the last guy you know the first follower will also at some point respond and you know said yes.

248
00:29:43,000 --> 00:29:57,000
At this point basically from the point of view of the leader the operations committed except the followers don't really know it yet because the followers you know they only know that you know they got it and that the leader probably has it.

249
00:29:57,000 --> 00:30:08,000
But they you know they don't really know and so what actually happens is that the subsequent operation you know when the another client request comes in the leader will append another log entry.

250
00:30:08,000 --> 00:30:29,000
And basically sends you know a new operation or a new append entry to the followers and that append entry does basically two things it provides the new log entry for the new operation but it also confirms that all the preceding operation order tells which operation actually have committed so far.

251
00:30:29,000 --> 00:30:50,000
So when everyone and have to receive you know this this operation this RPC they know that the operation has been committed by the leader and therefore at that point they can also deliver it to their key value instance and know that this operations committed.

252
00:30:50,000 --> 00:31:06,000
I had a question so so when the leader sends an operation over and a server replies does that mean that that means it's in the log right.

253
00:31:06,000 --> 00:31:07,000
Yes.

254
00:31:07,000 --> 00:31:18,000
But what happens if you get a majority like you know a slight majority and then one of those logs like one of the service crash like our logs do logs have to be in storage like in this.

255
00:31:18,000 --> 00:31:37,000
Yep so that's a very good question so the every change to the log you know the look at the raft paper in detail here some state is must be stable and the log is one of those pieces of information that must be stable as well as the term number and a bunch of other things.

256
00:31:37,000 --> 00:31:53,000
So if a server crashes no big no big deal really because you know the majority of the service does have that entry on their disk and when they come back up they'll find it.

257
00:31:53,000 --> 00:32:03,000
I have a question yeah so what happens if for example a follower one replies with yes and leader commits.

258
00:32:03,000 --> 00:32:16,000
Just before it sends the next command to the remaining followers to also commit it crashes now the remaining followers don't know that they need to commit because the leader has crashed.

259
00:32:16,000 --> 00:32:34,000
So what are these cause problems there will commit it right because one follower will have it in his log and as we'll see in the leader election rules it will become the leader and and it will propagate that append entry you know to the other servers and then they will apply to.

260
00:32:34,000 --> 00:32:37,000
Okay I see okay thanks.

261
00:32:37,000 --> 00:32:44,000
Okay so that brings me maybe this is a good you know sort of segue to the next topic like why watch and.

262
00:32:44,000 --> 00:33:02,000
Last few questions all about that yeah I actually as a follow up to the last question so the server crashing like after it has like consensus crashing right like right before committing it could delay committing.

263
00:33:02,000 --> 00:33:12,000
What do you mean what do you mean with committing so so like after it has consensus on a change right that after it has a majority yeah.

264
00:33:12,000 --> 00:33:30,000
It can like the paper said you saw it you essentially tell all their ones like all the servers you tell them okay this is ready for or sorry it's committed it's ready for like execution right into the state mission yeah.

265
00:33:30,000 --> 00:33:59,000
So if it crashes before it tells all the servers on its ready for execution it could delay execution right into delay execution well okay so first of all if the leader fails at that point nothing happens correct like at least the clients can't you know proceed move any other more operations and so basically the if you want to wait to think about it at that point sort of wrap reconfigures itself and like the new leader and that's going to be you know f1 or f2 you know one of the two is going to be the new leader and the other one is going to be the follower.

266
00:33:59,000 --> 00:34:15,000
Right and one of the two actually has received you know the append entry that the leader might already have committed in fact it's KV might already have executed no problem correct because one of them has it not one will become the leader as we'll see later with the leader election rules.

267
00:34:15,000 --> 00:34:27,000
And then one will you know submitted to its KV server and will replicate it you know to the other follower and then it will apply to its KV server so in the end we all will apply all the operations in the same order.

268
00:34:27,000 --> 00:34:34,000
I agree like eventually it'll happen but it could be delayed right yeah could be delayed absolutely.

269
00:34:34,000 --> 00:34:57,000
The new leader says a complete log to all the followers it will you stay it will the way it works is actually it will try to send the end of his log if one of the followers doesn't recognize the end of the log and go back off and you know send more and more you know earlier entries we'll talk about it later but.

270
00:34:57,000 --> 00:35:07,000
But in the end it could be the case that the leader will replay it's complete log to one of the followers if one of the followers has missed all the log entries.

271
00:35:07,000 --> 00:35:10,000
I got to get me back to walks.

272
00:35:10,000 --> 00:35:26,000
So one reason you might wonder why you have logs and all is because like the KV server has a database to you know as a table with all its information and so why do we need actually you know sort of this information twice once in the logs and once in the.

273
00:35:26,000 --> 00:35:38,000
KV table and so the couple reasons for that one you know a couple that already came up in the questions basically one for returns mission.

274
00:35:44,000 --> 00:35:55,000
So when the leader you know sends one of these appendentries you know to one of the followers that message might get lost and so the leader must be able to return it so you need to keep a record of all the log entries.

275
00:35:55,000 --> 00:36:01,000
The log entries that are sort of in flight.

276
00:36:01,000 --> 00:36:06,000
Second reason probably the primary reason first is like we need order.

277
00:36:06,000 --> 00:36:19,000
Every append operation or every command must be delivered in the same order at the same and hold the replicas and the log is very convenient way for us to actually maintain that order.

278
00:36:19,000 --> 00:36:25,000
So the second reason return transmission the third reason is we need a persistence.

279
00:36:25,000 --> 00:36:29,000
You know one of the followers might crash.

280
00:36:29,000 --> 00:36:43,000
We're actually all of them might crash and then they come up again and we still need to be in a position that we can basically retransmit log entries to bring everybody up to date and so the log must also be persistent.

281
00:36:43,000 --> 00:36:52,000
So finally we need sort of space for tentative operations or tentatively committed or tentative commands.

282
00:36:52,000 --> 00:37:00,000
So as we noted earlier that came up in there's an earlier questions when the leader sends an operation to a follower.

283
00:37:00,000 --> 00:37:08,000
The following action doesn't really know at that point where that operation will be committed so just more stick around for a little while until it actually learns that operation is committed.

284
00:37:08,000 --> 00:37:14,000
So there's a lot of space for these tentative operations and the log is a convenient place to actually do that.

285
00:37:14,000 --> 00:37:22,000
In the end you know what will happen correct is that the logs are identical.

286
00:37:22,000 --> 00:37:29,000
On all search.

287
00:37:29,000 --> 00:37:39,000
You know there may be out of sync during periods of time you know one might have more entries than other logs but like every sort of keep running the system and then stop the clients.

288
00:37:39,000 --> 00:37:57,000
Then at some point in time all the log will be completely identical and that means that basically those since they're all have the same order all the operations all the operation will be fed to the client of the KV servers in the same order and the KV server will end up in the same state.

289
00:37:57,000 --> 00:38:03,000
Okay.

290
00:38:03,000 --> 00:38:17,000
Okay let me talk a little bit about an individual log entry.

291
00:38:17,000 --> 00:38:27,000
So we are going to draw many pictures like this where there's a bunch of log entries starting zero want to.

292
00:38:27,000 --> 00:38:33,000
And if we look inside of one of these log entries there's going to be commands.

293
00:38:33,000 --> 00:38:42,000
We're mostly going to sort of ignore it we're not really thinking about much about it at all and that's the thing that actually being delivered to the application so that's for example the put in order to get operation.

294
00:38:42,000 --> 00:38:50,000
So we're going to do a few more experiments and then in the second thing that's in there is a term.

295
00:38:50,000 --> 00:38:56,000
And this is basically the leaders term.

296
00:38:56,000 --> 00:39:02,000
So the term in which this particular command actually was a pendant to the log.

297
00:39:02,000 --> 00:39:10,000
So what I think about this is that basically the term identifies uniquely deleted that appended the operation to the log.

298
00:39:10,000 --> 00:39:14,000
During every term there's only one single leader.

299
00:39:14,000 --> 00:39:27,000
And so the term ID you basically implicitly signals and what who the leader was actually appended to the to that walk that walk entry.

300
00:39:27,000 --> 00:39:33,000
The number that goes along here so if this is n or maybe like when you use I here.

301
00:39:33,000 --> 00:39:39,000
You know that's the log index.

302
00:39:39,000 --> 00:39:48,000
So the combination of the log index was a term number basically uniquely identifies the content of that particular entry there could be no.

303
00:39:48,000 --> 00:39:53,000
So the two log entries that have the same index the same term and have different commands.

304
00:39:53,000 --> 00:40:05,000
Because only a single leader you know could have been in charge in that particular term and that leader you know commits a pants operations.

305
00:40:05,000 --> 00:40:10,000
We'll commit a log and just be overwritten yet they might get overwritten we'll talk about it later.

306
00:40:10,000 --> 00:40:14,000
But that's certainly possible.

307
00:40:14,000 --> 00:40:26,000
So you know if we look at this picture sort of there's two things that in this part of the like as an answer to this question that there are two things that need to happen we need to like leaders.

308
00:40:26,000 --> 00:40:29,000
For a particular term.

309
00:40:29,000 --> 00:40:34,000
And we need to actually ensure that the.

310
00:40:34,000 --> 00:40:39,000
If your logs become identical.

311
00:40:39,000 --> 00:40:45,000
We have a leader and we have leader changes.

312
00:40:45,000 --> 00:40:48,000
And so we're going to talk about both of these topics.

313
00:40:48,000 --> 00:40:57,000
And we're going to start with leader election and then talk about making a launch identical little bit later.

314
00:40:57,000 --> 00:41:03,000
Okay election.

315
00:41:03,000 --> 00:41:06,000
And elections really do topic of the last two eight.

316
00:41:06,000 --> 00:41:18,000
And you know the stories are some ways can straightforward you know we have you know say here we are assistant the three entries we have a leader in term 10.

317
00:41:18,000 --> 00:41:22,000
We have a following term 10 so which are stable situation.

318
00:41:22,000 --> 00:41:24,000
Another following term 10.

319
00:41:24,000 --> 00:41:32,000
And let's say the leader crashes or it gets petitions you know from networks so you know can talk anymore.

320
00:41:32,000 --> 00:41:37,000
And what happened is that the follows will start an election.

321
00:41:37,000 --> 00:41:48,000
And the reason they start an election is because they're missing hard beats from the leader.

322
00:41:48,000 --> 00:41:58,000
And the job of the leader is to periodically in sort of fix dinner fall sent a pen entry to the followers.

323
00:41:58,000 --> 00:42:03,000
Normally you know that might be happened because you know a lot of clients are active.

324
00:42:03,000 --> 00:42:06,000
And so the followers continuously get a pen entries.

325
00:42:06,000 --> 00:42:11,000
But if the leader doesn't receive any commands from the.

326
00:42:11,000 --> 00:42:21,000
And then it actually supposed to send in a heartbeat periodically telling the basically to inform the followers that actually you're still the leader.

327
00:42:21,000 --> 00:42:28,000
And the heartbeat basically takes the form of a normal a pen entry except no new log entries.

328
00:42:28,000 --> 00:42:35,000
And so the leader just tells it leader to styles and art be to like you know my log is you know this long.

329
00:42:35,000 --> 00:42:42,000
This is my last entry and you know those match and then everything is good.

330
00:42:42,000 --> 00:42:49,000
So if the leader fails then after a couple of hard beats and we'll talk a little bit more in detail about this.

331
00:42:49,000 --> 00:42:53,000
There will be an election timeout.

332
00:42:53,000 --> 00:42:58,000
So the followers have a timer running.

333
00:42:58,000 --> 00:43:02,000
They reset the timer every time they get a heartbeat or an a pen entry.

334
00:43:02,000 --> 00:43:11,000
But if they don't receive any hard beats or a pen entries, then at some point of time after this election timeout the timer goes off.

335
00:43:11,000 --> 00:43:14,000
And at that point a follower starts an election.

336
00:43:14,000 --> 00:43:22,000
And just as let's assume that the first follower reaches that point first and what it will do it will send it will increase its term number.

337
00:43:22,000 --> 00:43:25,000
So remember to 11.

338
00:43:25,000 --> 00:43:33,000
It will you know talk to itself you will and be part of the and will vote for itself.

339
00:43:33,000 --> 00:43:40,000
And then you know the contact you know the other follower will also try to contact the leader of the leader.

340
00:43:40,000 --> 00:43:45,000
Let's say the leader down to the leader does a response with the second follower does respond.

341
00:43:45,000 --> 00:43:49,000
And so that point that gets two votes you know one from itself and one from the follower.

342
00:43:49,000 --> 00:43:56,000
And at that point actually it becomes the new leader it becomes the leader for term 11.

343
00:43:56,000 --> 00:44:04,000
And then it you know start to again basic clients fall over to that leader and you know the things you just proceed as before.

344
00:44:04,000 --> 00:44:06,000
Okay.

345
00:44:06,000 --> 00:44:13,000
Now maybe it's slightly there's a couple problems and you might worry about but one of them that could be the following situation we.

346
00:44:13,000 --> 00:44:19,000
It turns out it was a network petition between leader 10 where the leader for term 10 and the followers for term 10.

347
00:44:19,000 --> 00:44:23,000
And so at some point that network you know partition heals.

348
00:44:23,000 --> 00:44:31,000
And so maybe you're applying the request you know coming in still to the leader for leader for term 10.

349
00:44:31,000 --> 00:44:42,000
And now of course now it looks like whoops we might have actually two leaders and we're back into this split syndrome problem that turns out not to be the case.

350
00:44:42,000 --> 00:44:50,000
Because one of the leader tries to actually send a pen entries through the followers to followers that are now.

351
00:44:50,000 --> 00:44:59,000
In term 11 they will just reject you know those a pen entries and they will tell the old leader that you know too bad you know.

352
00:44:59,000 --> 00:45:07,000
He's not the leader anymore in fact they'll send a message back you know saying no I cannot do the append.

353
00:45:07,000 --> 00:45:12,000
And here is my current term number 11.

354
00:45:12,000 --> 00:45:21,000
The leader receives that sees that the term 11 is bigger than this term number 10 and basically steps down as leader and becomes a follow up.

355
00:45:21,000 --> 00:45:28,000
And they kick up another election or you know to basically become part of the term that has all free of them.

356
00:45:28,000 --> 00:45:36,000
But basically and there's no chance of a split brain problem because you just can't actually get any operation food.

357
00:45:36,000 --> 00:45:43,000
But no split brain.

358
00:45:43,000 --> 00:45:52,000
And reason that we avoid the split brain is because of this major do rule as well as these term numbers.

359
00:45:52,000 --> 00:46:02,000
Okay that's of course not the only problem that we might have another challenge is.

360
00:46:02,000 --> 00:46:09,000
So you might end up with split vote.

361
00:46:09,000 --> 00:46:17,000
So like a particular picture we had a leader maybe he was leader in 10 is petitioned up the network.

362
00:46:17,000 --> 00:46:23,000
Here are two followers in 10.

363
00:46:23,000 --> 00:46:30,000
And we're not careful you know maybe they will actually start you know elections very close to each other.

364
00:46:30,000 --> 00:46:34,000
So you know f 10 you know votes for itself.

365
00:46:34,000 --> 00:46:42,000
The first leader followed for itself the second leader of the second follower of votes for itself then you know they sent you know.

366
00:46:42,000 --> 00:46:51,000
Voting requests you know each other and the rule is that you know you can vote one vote.

367
00:46:51,000 --> 00:46:56,000
And you can vote for term.

368
00:46:56,000 --> 00:47:01,000
So when you know the first follower is voted for itself can it has voted for itself.

369
00:47:01,000 --> 00:47:08,000
And so when it receives the second vote request actually cannot vote for that vote request because already voted for itself.

370
00:47:08,000 --> 00:47:14,000
And so at this point we're going to have split vote like this guy is going to have one vote and this guy is going to have one vote.

371
00:47:14,000 --> 00:47:19,000
So at some point again you know later there will be a timeout.

372
00:47:19,000 --> 00:47:22,000
And then this process starts again.

373
00:47:22,000 --> 00:47:34,000
And of course you know I've divided that process you know this is election 11 election 11 or 12 and it will go to the election number 12 and you know try to try to do is again.

374
00:47:34,000 --> 00:47:36,000
Now you know careful correct.

375
00:47:36,000 --> 00:47:41,000
And so you know if you think it is happened over over and over and over and listen.

376
00:47:41,000 --> 00:47:50,000
You know basically every time you know the two followers roughly at the same time start his election then you know we're not going to make for progress.

377
00:47:50,000 --> 00:48:09,000
So the election time hours are randomized.

378
00:48:09,000 --> 00:48:24,000
And so when the followers you know set their election timer in the paper or they talk about it like picking a value between 150 milliseconds and 300 milliseconds.

379
00:48:24,000 --> 00:48:35,000
And random number in that interval and every time you know these followers and basically reset their election timeout they pick a new number random number in that interval.

380
00:48:35,000 --> 00:48:39,000
And then that timer then goes off they run the election.

381
00:48:39,000 --> 00:48:53,000
And if basically you know the you know these intervals wide enough that it's unlikely that like the first person or the first follower that actually gets the first follower who's election time runs out.

382
00:48:53,000 --> 00:49:05,000
You know the intervals wide enough that you know there's a good chance that an actual succeed completing a complete election before the second time where it goes off before another follower.

383
00:49:05,000 --> 00:49:08,000
And so this avoids you know this sort of endless play vote.

384
00:49:08,000 --> 00:49:20,000
Now we might get unlucky and we get maybe one or two split votes but like over time you know there has to be the case that we in the end will succeed.

385
00:49:20,000 --> 00:49:34,000
There are a couple sort of and this is important maybe for the lab too. There's sort of a couple of pressures on these election timeouts.

386
00:49:34,000 --> 00:49:49,000
You don't want to pick an election timeout that is too short right because if it's too short for then we'll short it in a heartbeat and you know you might lose one message and immediately you start running an election.

387
00:49:49,000 --> 00:50:03,000
And nothing that happens that is going to you know we'll elect a new leader you will go through a new term and all the kind of stuff but the basically you know during this election this system is actually not usable right the clients are actually blocked.

388
00:50:03,000 --> 00:50:08,000
You don't want to unnecessarily cause elections.

389
00:50:08,000 --> 00:50:22,000
And so one of your things you want to do is you're basically probably spit and take a value that's at least bigger than a few time out than a few heartbeats.

390
00:50:22,000 --> 00:50:43,000
We're maybe in a data center and I will take a few milliseconds to sort of do an RPC and we may want to wait at least you know so maybe free for RPC around good time so that we get a chance to retry an RPC without actually having the election time or go off and so we can cover from what temporary network.

391
00:50:44,000 --> 00:50:49,000
Then you know we want to presumably add you know some random value to that.

392
00:50:50,000 --> 00:51:05,000
Renvalued to avoid you know the split votes and so one hand you know we want to make the random values big as possible right because we make it big then very little chance that actually we run into a split vote problem.

393
00:51:06,000 --> 00:51:18,000
But the other hand if we do that then there's a chance that you know the system may be down for a longer period of time we might pick a big value for the election time out and that means you know downtime from the point of view of the clients.

394
00:51:19,000 --> 00:51:22,000
So we want to keep this you know short enough.

395
00:51:27,000 --> 00:51:28,000
The downtime is short.

396
00:51:36,000 --> 00:51:48,000
In the paper in the lens in the VALA section does quite a bit of work on the sort of validating in what are some reasonable values for their particular setting and then that's how they got to 150 to 300 milliseconds in the lab we're going to be a reasonable generous.

397
00:51:49,000 --> 00:51:53,000
You know basically if you sort of recover within a second you're more or less going to be good.

398
00:51:55,000 --> 00:51:57,000
And with the referred for our test cases.

399
00:51:58,000 --> 00:52:07,000
Okay, I want to make one more point about the about the elections.

400
00:52:09,000 --> 00:52:21,000
So you know another scenario that is sort of important to consider is you know we have a follower we have a leader leader goes down so there was 10 this is 10 you follow 10.

401
00:52:22,000 --> 00:52:29,000
We already talked a little bit about it when let's say this guy goes first it votes for itself.

402
00:52:31,000 --> 00:52:40,000
And you know we the protocol record you know unstable storage why who read voted for so the record you know records on the so this is follower one is follower two will record a voted for in term 11.

403
00:52:40,000 --> 00:52:42,000
You know for a follower one.

404
00:52:43,000 --> 00:52:46,000
Why is it recorded on stable storage.

405
00:52:47,000 --> 00:52:50,000
And why does you follow me to remember that.

406
00:52:53,000 --> 00:52:56,000
That is voted in term 11 for itself.

407
00:52:58,000 --> 00:53:01,000
And then we have a lot of questions about the question.

408
00:53:02,000 --> 00:53:04,000
So that's the answer.

409
00:53:07,000 --> 00:53:10,000
That is voted in term 11 for itself.

410
00:53:16,000 --> 00:53:20,000
This way doesn't vote twice if it fails.

411
00:53:21,000 --> 00:53:24,000
Yeah, it might crash right here.

412
00:53:25,000 --> 00:53:27,000
And come back up.

413
00:53:27,000 --> 00:53:32,000
You know it might have been a member that it and somebody might have let's say it was a person there's a third one guy in here.

414
00:53:33,000 --> 00:53:35,000
You know follower whatever free.

415
00:53:36,000 --> 00:53:38,000
And it already voted for follower three.

416
00:53:39,000 --> 00:53:41,000
Then it can actually not change in mind.

417
00:53:43,000 --> 00:53:53,000
And so because in the end we at the end of the term we need to have you have to be in a position that per term is only one leader and never never two.

418
00:53:53,000 --> 00:53:59,000
And so we can ensure that you know every follower must remember for which candidate voted and never change its might.

419
00:54:08,000 --> 00:54:15,000
Okay, I guess there's a whole discussion in chat about the timeout numbers and in relation to the lab.

420
00:54:15,000 --> 00:54:20,000
So people can look there confused about this otherwise.

421
00:54:21,000 --> 00:54:26,000
We can talk about election a little bit more because this is about the last thing I want to say about elections.

422
00:54:28,000 --> 00:54:30,000
Any questions about the elections.

423
00:54:31,000 --> 00:54:43,000
I have a bit more general question. So in like the figure two of the lab that says that for each.

424
00:54:44,000 --> 00:54:48,000
Server your state storing like the current term and then who it voted for.

425
00:54:49,000 --> 00:54:56,000
But not the like current state of the server like if it's candidate or follower for later.

426
00:54:57,000 --> 00:54:59,000
So I'm wondering how they like.

427
00:55:00,000 --> 00:55:03,000
Is that implied or is there another way to figure that out?

428
00:55:04,000 --> 00:55:08,000
I guess when you come back up you come back up as a follower.

429
00:55:09,000 --> 00:55:11,000
And you know you're starting an election.

430
00:55:13,000 --> 00:55:17,000
And then that will end the end of the election. You know what you are.

431
00:55:18,000 --> 00:55:20,000
You're a follower or a leader.

432
00:55:20,000 --> 00:55:23,000
I see. Okay. Thank you.

433
00:55:23,000 --> 00:55:25,000
That's makes sense.

434
00:55:26,000 --> 00:55:29,000
One warning about figure two.

435
00:55:29,000 --> 00:55:33,000
Positive and then there's maybe negative statement.

436
00:55:34,000 --> 00:55:38,000
Anywhere in the figure two when it says like you know you should do this.

437
00:55:38,000 --> 00:55:39,000
You should really do it.

438
00:55:39,000 --> 00:55:43,000
So you cannot admit any detail that actually is a figure two.

439
00:55:43,000 --> 00:55:46,000
If you do that then undoubtedly going to fail some of the test cases.

440
00:55:46,000 --> 00:55:49,000
Unfortunately, figure two is not complete.

441
00:55:49,000 --> 00:55:52,000
And so you still will have to do some thinking.

442
00:55:52,000 --> 00:55:57,000
So particularly like figure two doesn't really say that much about like how the replies are handled.

443
00:55:57,000 --> 00:55:59,000
Of the road RPC and the app and the app receipt.

444
00:55:59,000 --> 00:56:04,000
And so you will have to do some thinking to fill in the missing details.

445
00:56:04,000 --> 00:56:05,000
And so.

446
00:56:05,000 --> 00:56:08,000
So there's two points here like figure two.

447
00:56:08,000 --> 00:56:09,000
Anything that's in there.

448
00:56:09,000 --> 00:56:10,000
You better deal with it.

449
00:56:10,000 --> 00:56:15,000
And we're still might be things missing that you will have to resolve for you.

450
00:56:15,000 --> 00:56:18,000
So you'll have to resolve for yourself.

451
00:56:21,000 --> 00:56:24,000
You'll be looking at figure two a lot.

452
00:56:24,000 --> 00:56:32,000
So from the description of the election process, there seems to be like even for lab two,

453
00:56:32,000 --> 00:56:33,000
which deals only with election.

454
00:56:33,000 --> 00:56:37,000
There seems to be some state that we need to store on persistence.

455
00:56:37,000 --> 00:56:38,000
Yeah.

456
00:56:38,000 --> 00:56:41,000
For example, like who you voted for and the term number.

457
00:56:41,000 --> 00:56:42,000
Yeah.

458
00:56:42,000 --> 00:56:44,000
So when you look at the code of lab two,

459
00:56:44,000 --> 00:56:49,000
all of the code that has to do with saving the persistent state, it says above it lab two C.

460
00:56:49,000 --> 00:56:56,000
So is it that it's not that crucial maybe to care about persistent storage or should we absolutely start.

461
00:56:56,000 --> 00:56:58,000
One thing persistence storage.

462
00:56:58,000 --> 00:57:03,000
Yeah, I think in the first couple of tests, we don't actually crash machines.

463
00:57:03,000 --> 00:57:08,000
And so therefore to have it important and to see we're definitely crashing machines.

464
00:57:08,000 --> 00:57:09,000
Okay.

465
00:57:09,000 --> 00:57:10,000
Awesome.

466
00:57:10,000 --> 00:57:11,000
Thank you.

467
00:57:13,000 --> 00:57:14,000
Okay.

468
00:57:16,000 --> 00:57:17,000
How are we doing?

469
00:57:17,000 --> 00:57:19,000
Everybody on board?

470
00:57:25,000 --> 00:57:26,000
Okay, here we go.

471
00:57:26,000 --> 00:57:27,000
Next step.

472
00:57:27,000 --> 00:57:29,000
Okay, so.

473
00:57:29,000 --> 00:57:34,000
One important thing to realize and you know, just came up early into questions and you know,

474
00:57:34,000 --> 00:57:38,000
when I hit that now, that topic hard is that logs made the verge, verge.

475
00:57:38,000 --> 00:57:50,000
And there can be quite dramatic, but just let's do it.

476
00:57:50,000 --> 00:57:53,000
Get into it for just based understanding.

477
00:57:53,000 --> 00:57:55,000
And then.

478
00:57:55,000 --> 00:57:57,000
Discuss any more details.

479
00:57:57,000 --> 00:57:59,000
So let's do a couple simple examples.

480
00:57:59,000 --> 00:58:02,000
So I'm going to write things and using the following rotation.

481
00:58:02,000 --> 00:58:04,000
We're going to have free servers.

482
00:58:04,000 --> 00:58:16,000
That's before, but I'm going to cut all the timeline business and just like draw the logs.

483
00:58:16,000 --> 00:58:19,000
And you know, we're not.

484
00:58:19,000 --> 00:58:20,000
Indexes.

485
00:58:20,000 --> 00:58:22,000
So let's say these are indexes.

486
00:58:22,000 --> 00:58:27,000
Now, there's preceding part to when we're talking about 10, 11, 12.

487
00:58:27,000 --> 00:58:32,000
And so, you know, where there's an term entry in each one of them.

488
00:58:32,000 --> 00:58:42,000
Let's say all free servers committed or a penitor operation in term free to index 10.

489
00:58:42,000 --> 00:58:49,000
And you know, it's and same thing happened in.

490
00:58:49,000 --> 00:58:51,000
With index three 11.

491
00:58:51,000 --> 00:58:55,000
So one way to think one way you could get this correct is that server one would be the leader.

492
00:58:55,000 --> 00:59:00,000
So one of pencil to its own log, you know, then replicates it to s2 and s3.

493
00:59:00,000 --> 00:59:02,000
Same thing happens for index 11.

494
00:59:02,000 --> 00:59:09,000
Then index, you know, 12 maybe you know, they're also successful and fence one operation in that index for its term.

495
00:59:09,000 --> 00:59:12,000
So that's term free, but then a crash.

496
00:59:12,000 --> 00:59:22,000
Okay, so now we're in the situation where one server has an extra log entry in its log and the other ones don't.

497
00:59:22,000 --> 00:59:27,000
So one of them has a two, but they're definitely not identical.

498
00:59:27,000 --> 00:59:31,000
That's a simple case correct, nothing really particular, let's take a look on.

499
00:59:31,000 --> 00:59:34,000
But there's much more interesting cases, you know, going on.

500
00:59:34,000 --> 00:59:36,000
So another case could be.

501
00:59:36,000 --> 00:59:39,000
No, one server again, s1.

502
00:59:39,000 --> 00:59:40,000
There we go.

503
00:59:40,000 --> 00:59:43,000
Same scenarios s2 s3.

504
00:59:43,000 --> 00:59:50,000
And let's say we have the following walks.

505
00:59:52,000 --> 01:00:00,000
So this is the situation we have in index 10.

506
01:00:00,000 --> 01:00:05,000
We have entries at all servers for term free in index 11.

507
01:00:05,000 --> 01:00:08,000
The first server has no entry.

508
01:00:08,000 --> 01:00:11,000
The other two have an entry for term free.

509
01:00:11,000 --> 01:00:21,000
And then last one, number 12, you know, we have entries in index four at servers two and three with thermometers four and five.

510
01:00:21,000 --> 01:00:26,000
So the first question that we need to ask ourselves is this possible.

511
01:00:26,000 --> 01:00:36,000
Can graph end up producing logs in this way, where they in the same log entry, we have two different term numbers.

512
01:00:36,000 --> 01:00:38,000
In same log index.

513
01:00:38,000 --> 01:00:41,000
Yeah, that's possible.

514
01:00:41,000 --> 01:00:45,000
So basically, it looks like.

515
01:00:45,000 --> 01:00:48,000
So like what is the scenario that produced?

516
01:00:48,000 --> 01:00:53,000
Yeah, so it looks like server two or server three was.

517
01:00:53,000 --> 01:00:57,000
The leader for term three and then.

518
01:00:57,000 --> 01:01:03,000
Got some logs out to server one and then shared another log with.

519
01:01:03,000 --> 01:01:08,000
Only one of the two servers after which point it went down.

520
01:01:08,000 --> 01:01:19,000
And then s two got elected as leader for term two, which is still possible because it's log is like up to date as as up to date is the others.

521
01:01:19,000 --> 01:01:21,000
And then again, just to make sure.

522
01:01:21,000 --> 01:01:24,000
So s two got elected for term four.

523
01:01:24,000 --> 01:01:25,000
Yes.

524
01:01:25,000 --> 01:01:27,000
Okay, again, not term two.

525
01:01:27,000 --> 01:01:30,000
Okay, so as to gets elected for term four.

526
01:01:30,000 --> 01:01:31,000
Yeah, yeah, yeah.

527
01:01:31,000 --> 01:01:33,000
And then using s one as a backup.

528
01:01:33,000 --> 01:01:36,000
Basically, yes, the follower.

529
01:01:36,000 --> 01:01:39,000
Yes, I think.

530
01:01:39,000 --> 01:01:45,000
And then s three gets elected for term five before s two can put anything in the logs.

531
01:01:45,000 --> 01:01:49,000
Yeah, another way to saying it like maybe s two tracks right away right after.

532
01:01:49,000 --> 01:01:51,000
Got elected to turn four.

533
01:01:51,000 --> 01:01:54,000
And so then there's a time out.

534
01:01:54,000 --> 01:01:57,000
Then let's say s three was petitioned, but now it's back.

535
01:01:57,000 --> 01:02:01,000
And that will go into it will become it will.

536
01:02:01,000 --> 01:02:04,000
It can come into term five, correct?

537
01:02:04,000 --> 01:02:07,000
Yeah.

538
01:02:07,000 --> 01:02:09,000
Okay, good. So that's possible.

539
01:02:09,000 --> 01:02:13,000
So turns out there are quite a bit of wild variations possible.

540
01:02:13,000 --> 01:02:22,000
So here's the figure six figure seven, sorry, from the homework.

541
01:02:22,000 --> 01:02:28,000
And.

542
01:02:28,000 --> 01:02:33,000
And the homework asked basically questions about the form.

543
01:02:33,000 --> 01:02:34,000
Like, well, what happens?

544
01:02:34,000 --> 01:02:38,000
Like this guy in the figure six itself figure seven, whatever it is.

545
01:02:38,000 --> 01:02:41,000
I think it's figure seven.

546
01:02:41,000 --> 01:02:46,000
The scenarios being discussed is like this guy becomes the top one becomes a new leader.

547
01:02:46,000 --> 01:02:52,000
And in the homework, we asked the question like what happens if this leader just goes away.

548
01:02:52,000 --> 01:02:55,000
And what are the possible outcomes?

549
01:02:55,000 --> 01:03:00,000
And the possible outcomes like are so for every log index.

550
01:03:00,000 --> 01:03:06,000
You know, the question is which one gets rejected?

551
01:03:06,000 --> 01:03:11,000
Which one will be accepted for sure?

552
01:03:11,000 --> 01:03:16,000
And which ones depends?

553
01:03:16,000 --> 01:03:22,000
And I think this is an important thing exercise to do because once we are so to understand what our log edge is,

554
01:03:22,000 --> 01:03:27,000
we're going to have some other possible outcomes going to really firm up like understanding about how.

555
01:03:27,000 --> 01:03:30,000
Raffects we supposed to be operating.

556
01:03:30,000 --> 01:03:33,000
What I'd like to do is like do a quick breakout room.

557
01:03:33,000 --> 01:03:37,000
And I'd like you to identify.

558
01:03:37,000 --> 01:03:42,000
Two possible outcomes that not guaranteed.

559
01:03:42,000 --> 01:03:45,000
And in the corresponding scenario.

560
01:03:45,000 --> 01:03:51,000
So let's take a quick breakout room here session here and like start to figure out the answer to the homework question.

561
01:03:51,000 --> 01:04:01,000
And in five minutes.

562
01:04:01,000 --> 01:04:04,000
Really, were you able to.

563
01:04:04,000 --> 01:04:07,000
Do you want me to do?

564
01:04:07,000 --> 01:04:13,000
Yeah, let me actually make you.

565
01:04:13,000 --> 01:04:19,000
Disappoints.

566
01:04:19,000 --> 01:04:20,000
In the coast.

567
01:04:20,000 --> 01:04:23,000
I got to move your host.

568
01:05:13,000 --> 01:05:16,000
You

569
01:05:43,000 --> 01:05:46,000
You

570
01:06:13,000 --> 01:06:16,000
You

571
01:06:43,000 --> 01:06:46,000
You

572
01:07:13,000 --> 01:07:15,000
You

573
01:07:43,000 --> 01:07:45,000
You

574
01:08:13,000 --> 01:08:15,000
You

575
01:08:43,000 --> 01:08:45,000
You

576
01:09:13,000 --> 01:09:15,000
You

577
01:09:43,000 --> 01:09:45,000
You

578
01:10:13,000 --> 01:10:15,000
You

579
01:10:43,000 --> 01:10:45,000
You

580
01:11:13,000 --> 01:11:15,000
You

581
01:11:43,000 --> 01:11:46,000
You

582
01:11:46,000 --> 01:11:47,000
You

583
01:11:47,000 --> 01:11:48,000
You

584
01:11:48,000 --> 01:11:50,000
Okay.

585
01:11:50,000 --> 01:11:58,000
Oh, again, everybody hear me again?

586
01:11:58,000 --> 01:12:10,000
Can I get a positive signal?

587
01:12:10,000 --> 01:12:16,000
Yes.

588
01:12:16,000 --> 01:12:20,000
Okay.

589
01:12:20,000 --> 01:12:24,000
Okay.

590
01:12:24,000 --> 01:12:28,000
So I hope everybody had a good time discussing this.

591
01:12:28,000 --> 01:12:32,000
And so let's, so this is really this question about log divergence.

592
01:12:32,000 --> 01:12:36,000
And you know, we see here correct in this figure there are pretty wild variations.

593
01:12:36,000 --> 01:12:40,000
And what can happen.

594
01:12:40,000 --> 01:12:48,000
And these are all possible as you know, the caption of the figure explains they're all possible scenarios.

595
01:12:48,000 --> 01:12:54,000
So the question in the homework and just to quickly review that I'm sure most of you already.

596
01:12:54,000 --> 01:12:56,000
I don't think we can see your screen.

597
01:12:56,000 --> 01:12:58,000
Oh, that'll be to that.

598
01:12:58,000 --> 01:13:02,000
That's because I forgot to click share. Yes.

599
01:13:02,000 --> 01:13:04,000
Okay. Let me fix that.

600
01:13:04,000 --> 01:13:14,000
I appreciate that.

601
01:13:14,000 --> 01:13:16,000
Okay.

602
01:13:16,000 --> 01:13:20,000
Where do you see my screen?

603
01:13:20,000 --> 01:13:21,000
Yeah.

604
01:13:21,000 --> 01:13:23,000
Okay. Thank you. Sorry for that.

605
01:13:23,000 --> 01:13:24,000
Okay. So.

606
01:13:24,000 --> 01:13:30,000
So I'm going back to this caption of figure seven figure seven explains like that these are possible situations.

607
01:13:30,000 --> 01:13:36,000
And you know what we want to figure out to get a before talking about the details about how the logs are get repaired.

608
01:13:36,000 --> 01:13:38,000
You know what actually is possible.

609
01:13:38,000 --> 01:13:44,000
So assume that actually this top guy did not get elected leader.

610
01:13:44,000 --> 01:13:48,000
As an caption of the in the figure, but like basically what what outcomes are possible.

611
01:13:48,000 --> 01:13:55,000
And they're going to be what I mean with that is like example, we look at F, you know, it has a two.

612
01:13:55,000 --> 01:14:00,000
An index of an entry from term two in index four.

613
01:14:00,000 --> 01:14:03,000
And the question. You want to ask them understand is the clear.

614
01:14:03,000 --> 01:14:07,000
That is possible because the descriptive happened. You know what will happen next.

615
01:14:07,000 --> 01:14:11,000
You know, is it possible that this entry will survive.

616
01:14:11,000 --> 01:14:16,000
So when we客 figure like the leader basically you know logs get that being you know put together in.

617
01:14:16,000 --> 01:14:24,000
Our synchonize to a lead his force the logs to be identical is the scenario which actually the log entry.

618
01:14:24,000 --> 01:14:26,000
the entry from term two will survive.

619
01:14:30,000 --> 01:14:32,000
Now, no, correct.

620
01:14:32,000 --> 01:14:34,000
This will definitely be rejected, correct?

621
01:14:34,000 --> 01:14:36,000
And why is that the case?

622
01:14:38,000 --> 01:14:42,000
There are centuries from term six that are already committed.

623
01:14:42,000 --> 01:14:44,000
And so, I will never be elected.

624
01:14:44,000 --> 01:14:46,000
Yeah, everyone will never be elected.

625
01:14:46,000 --> 01:14:48,000
And so, somebody else will be elected.

626
01:14:48,000 --> 01:14:51,000
And nobody has a two in term two in index four.

627
01:14:51,000 --> 01:14:53,000
So, it will be overwritten.

628
01:14:53,000 --> 01:14:55,000
We direct value will be overwritten.

629
01:14:59,000 --> 01:15:01,000
There will be a four overwritten.

630
01:15:01,000 --> 01:15:03,000
Yeah, that will be this will become a four, correct?

631
01:15:03,000 --> 01:15:06,000
So, when later on, when we talk about sort of lock, you know,

632
01:15:06,000 --> 01:15:09,000
synchronization or forcing logs on followers,

633
01:15:09,000 --> 01:15:13,000
it has to be the case that this two turns into four at f.

634
01:15:13,000 --> 01:15:15,000
Good.

635
01:15:15,000 --> 01:15:19,000
So, so this also answers sort of a second question like,

636
01:15:19,000 --> 01:15:25,000
the entry from the index four from term four is definitely going to be accepted.

637
01:15:27,000 --> 01:15:33,000
Okay, so then maybe more interesting is this question of a depends.

638
01:15:33,000 --> 01:15:37,000
You know, so we know at least one entry term that definitely got rejected.

639
01:15:37,000 --> 01:15:39,000
We know one term that definitely going to accept it.

640
01:15:39,000 --> 01:15:45,000
And, you know, are there any sort of terms and indexes in any case that may be possibly accepted?

641
01:15:45,000 --> 01:15:47,000
Oh, that's sevens.

642
01:15:47,000 --> 01:15:49,000
Maybe.

643
01:15:49,000 --> 01:15:51,000
Yeah, the sevens.

644
01:15:51,000 --> 01:15:55,000
So, when would the sevens not be accepted?

645
01:15:55,000 --> 01:15:58,000
Okay, so the easy question area is the sevens will be accepted, correct?

646
01:15:58,000 --> 01:16:03,000
Because D gets a selected leader and then it will force it logged on everybody else.

647
01:16:03,000 --> 01:16:05,000
Okay, so that's the case where seven gets accepted.

648
01:16:05,000 --> 01:16:09,000
When they get the seven get rejected.

649
01:16:09,000 --> 01:16:13,000
If you get selected leader and then these down,

650
01:16:13,000 --> 01:16:15,000
it is over it.

651
01:16:15,000 --> 01:16:23,000
Yeah, so D goes down, see becomes leader and then C's log entries are being pushed and everybody else entries.

652
01:16:23,000 --> 01:16:27,000
And then whatever D and so we're done we're in that we're going to be term seven, correct?

653
01:16:27,000 --> 01:16:31,000
And at some point that would be longer and every D comes back up.

654
01:16:31,000 --> 01:16:35,000
You know, it's, you know, entries are going to be over it, right?

655
01:16:35,000 --> 01:16:37,000
It's seven.

656
01:16:37,000 --> 01:16:40,000
So seven is definitely possible, but not guaranteed.

657
01:16:40,000 --> 01:16:42,000
Any other case?

658
01:16:42,000 --> 01:16:44,000
I had a question.

659
01:16:44,000 --> 01:16:48,000
It could become leader to right.

660
01:16:48,000 --> 01:16:50,000
Eight.

661
01:16:50,000 --> 01:16:52,000
Yeah.

662
01:16:52,000 --> 01:16:56,000
Yeah, a group leader is she in do down.

663
01:16:56,000 --> 01:17:00,000
The end even actually be down for it to be a leader, right?

664
01:17:00,000 --> 01:17:02,000
It's just like it.

665
01:17:02,000 --> 01:17:04,000
If it's the first one.

666
01:17:04,000 --> 01:17:06,000
If the longer's log, correct?

667
01:17:06,000 --> 01:17:10,000
If the term if the two terms are equal at the end, then you pick the longers long.

668
01:17:10,000 --> 01:17:12,000
Um, but.

669
01:17:12,000 --> 01:17:18,000
Um, I think if if if a is the first one to call for an election, right?

670
01:17:18,000 --> 01:17:22,000
Like potentially be.

671
01:17:22,000 --> 01:17:23,000
Yeah, correct.

672
01:17:23,000 --> 01:17:26,000
If she and D are down, a could win the election.

673
01:17:26,000 --> 01:17:30,000
But if they're alive, can't it also still win the election?

674
01:17:30,000 --> 01:17:33,000
Yeah, so let's say see in the.

675
01:17:33,000 --> 01:17:35,000
Okay, let's ease down.

676
01:17:35,000 --> 01:17:36,000
Let's do that for sure, correct?

677
01:17:36,000 --> 01:17:39,000
Because we know the D will win the election period.

678
01:17:39,000 --> 01:17:46,000
But does it have to like we know we know we know it won't get a vote from D, right?

679
01:17:46,000 --> 01:17:48,000
For sure.

680
01:17:48,000 --> 01:17:52,000
But, but does it have to win?

681
01:17:52,000 --> 01:17:55,000
Why what do we think?

682
01:17:55,000 --> 01:18:03,000
What if a received the vote from B, E, and at first and then received the vote from.

683
01:18:03,000 --> 01:18:05,000
Yeah.

684
01:18:05,000 --> 01:18:07,000
Yeah, you can get a majority, correct?

685
01:18:07,000 --> 01:18:19,000
Without actually the participating.

686
01:18:19,000 --> 01:18:29,000
Even if the participating in the election, it's possible for a to get the majority votes, right?

687
01:18:29,000 --> 01:18:35,000
Yes, I think we just answered that.

688
01:18:35,000 --> 01:18:42,000
Is it isn't there a mechanism though where if a candidate sees a.

689
01:18:42,000 --> 01:18:48,000
Message from another several of the higher turn number like stands down.

690
01:18:48,000 --> 01:18:52,000
Yes, for my high turn number, but A has to.

691
01:18:52,000 --> 01:18:57,000
If D is down.

692
01:18:57,000 --> 01:18:59,000
It doesn't have to be down, right?

693
01:18:59,000 --> 01:19:01,000
You just have to get them first.

694
01:19:01,000 --> 01:19:02,000
Yes, just that's.

695
01:19:02,000 --> 01:19:06,000
Yeah.

696
01:19:06,000 --> 01:19:11,000
But it will step down when it gets the vote from seven or D.

697
01:19:11,000 --> 01:19:13,000
Wait, are you sure about that?

698
01:19:13,000 --> 01:19:15,000
Because I don't think so.

699
01:19:15,000 --> 01:19:18,000
I think it's.

700
01:19:18,000 --> 01:19:20,000
Well, what a.

701
01:19:20,000 --> 01:19:23,000
Okay, so if D at some point will.

702
01:19:23,000 --> 01:19:24,000
It depends.

703
01:19:24,000 --> 01:19:27,000
They're going to start racing, correct?

704
01:19:27,000 --> 01:19:28,000
The.

705
01:19:28,000 --> 01:19:30,000
Okay, let me actually do some very important topic.

706
01:19:30,000 --> 01:19:33,000
So I don't want to do it in 10 seconds.

707
01:19:33,000 --> 01:19:36,000
And let me come back to this at the start of the next lecture.

708
01:19:36,000 --> 01:19:37,000
Okay.

709
01:19:37,000 --> 01:19:39,000
This is a great point to stop.

710
01:19:39,000 --> 01:19:42,000
I think the state machine on in figure four clarifies it.

711
01:19:42,000 --> 01:19:43,000
Like, I can't.

712
01:19:43,000 --> 01:19:45,000
It goes back to follower if.

713
01:19:45,000 --> 01:19:46,000
Discovers a higher term.

714
01:19:46,000 --> 01:19:48,000
So if it was if he wasn't down.

715
01:19:48,000 --> 01:19:50,000
It will go back to follower.

716
01:19:50,000 --> 01:19:53,000
It wants to like this.

717
01:19:53,000 --> 01:19:57,000
Wait, but I thought that it would only go back to a follower state.

718
01:19:57,000 --> 01:20:02,000
If it received an append entries from a current leader.

719
01:20:02,000 --> 01:20:07,000
Like a request vote is not the same.

720
01:20:07,000 --> 01:20:08,000
So it is worth.

721
01:20:08,000 --> 01:20:12,000
There's a difference between the term number that a server's at.

722
01:20:12,000 --> 01:20:16,000
And the term of the most recent entry in the log.

723
01:20:16,000 --> 01:20:17,000
Oh, yes.

724
01:20:17,000 --> 01:20:18,000
It's over.

725
01:20:18,000 --> 01:20:22,000
Like, like server a can have most recent entry in the log B6,

726
01:20:22,000 --> 01:20:27,000
the term six, but have its current term number B7.

727
01:20:27,000 --> 01:20:30,000
And it's term number can actually be arbitrarily high.

728
01:20:30,000 --> 01:20:31,000
Yes, correct.

729
01:20:31,000 --> 01:20:32,000
That's that's correct.

730
01:20:32,000 --> 01:20:35,000
And so a could start term eight.

731
01:20:35,000 --> 01:20:38,000
And then get elected in term eight.

732
01:20:38,000 --> 01:20:45,000
And that and whatever these tells it doesn't matter because if these most recent term is seven,

733
01:20:45,000 --> 01:20:49,000
they won't go back to follower because it's a higher term than seven.

734
01:20:49,000 --> 01:20:50,000
I see.

735
01:20:50,000 --> 01:20:53,000
So it could be a higher term arbitrary.

736
01:20:53,000 --> 01:21:00,000
But it could could a go into into term seven.

737
01:21:00,000 --> 01:21:02,000
It's own term seven.

738
01:21:02,000 --> 01:21:05,000
If D was like partition, like,

739
01:21:05,000 --> 01:21:10,000
if there was a network petition and it didn't know about D.

740
01:21:10,000 --> 01:21:13,000
I think it's like, even if it does know about D,

741
01:21:13,000 --> 01:21:14,000
why does that matter?

742
01:21:14,000 --> 01:21:19,000
It should matter.

743
01:21:19,000 --> 01:21:26,000
If if if if a promotes a self to candidate and then sends out a request.

744
01:21:26,000 --> 01:21:29,000
And then if you want to send out a vote request,

745
01:21:29,000 --> 01:21:31,000
then like,

746
01:21:31,000 --> 01:21:32,000
D could come back and say like,

747
01:21:32,000 --> 01:21:38,000
Oh, well, my latest log entry was at this index for term seven.

748
01:21:38,000 --> 01:21:41,000
But I don't think that.

749
01:21:41,000 --> 01:21:42,000
A wait,

750
01:21:42,000 --> 01:21:44,000
actually it doesn't even say that, right?

751
01:21:44,000 --> 01:21:47,000
And in the response to your request, vote RPC.

752
01:21:47,000 --> 01:21:48,000
It just says you know,

753
01:21:48,000 --> 01:21:52,000
it says like it's current term, which would be seven,

754
01:21:52,000 --> 01:21:53,000
which matches a.

755
01:21:53,000 --> 01:21:56,000
Because that we that's our hypothesis.

756
01:21:56,000 --> 01:21:57,000
And then.

757
01:21:57,000 --> 01:21:59,000
Yeah, it started the election.

758
01:21:59,000 --> 01:22:04,000
It will be in term seven.

759
01:22:04,000 --> 01:22:06,000
But a D will not vote for a.

760
01:22:06,000 --> 01:22:08,000
Yes, that's true.

761
01:22:08,000 --> 01:22:09,000
But I don't know.

762
01:22:09,000 --> 01:22:16,000
I think it's totally fine if D is alive and gives a response to a

763
01:22:16,000 --> 01:22:17,000
vote request.

764
01:22:17,000 --> 01:22:18,000
Like,

765
01:22:18,000 --> 01:22:22,000
I don't think that deters a from being the candidate.

766
01:22:22,000 --> 01:22:24,000
So I want to just put in the chat.

767
01:22:24,000 --> 01:22:25,000
I think the answer to that.

768
01:22:25,000 --> 01:22:30,000
So I grant said that as soon as D rejects the vote.

769
01:22:30,000 --> 01:22:34,000
A will revert to being a follower because it will realize that it has a

770
01:22:34,000 --> 01:22:35,000
lower term number.

771
01:22:35,000 --> 01:22:36,000
But okay,

772
01:22:36,000 --> 01:22:38,000
not necessarily because again,

773
01:22:38,000 --> 01:22:43,000
the remember that the most recent term on their log is not the same thing

774
01:22:43,000 --> 01:22:48,000
as the most recent term that the server keeps track of.

775
01:22:48,000 --> 01:22:51,000
You're going to have a higher current term than the most recent thing on log.

776
01:22:51,000 --> 01:22:54,000
And so if a tries to elect itself in term seven,

777
01:22:54,000 --> 01:22:56,000
yes, when it tries to contact D,

778
01:22:56,000 --> 01:22:57,000
it will give up.

779
01:22:57,000 --> 01:23:00,000
But if a tries to elect itself in term eight,

780
01:23:00,000 --> 01:23:01,000
which it would,

781
01:23:01,000 --> 01:23:05,000
if it's already seen that these has reached term seven.

782
01:23:05,000 --> 01:23:09,000
Then like a can get elected.

783
01:23:09,000 --> 01:23:14,000
Wait, but if D is if we assume that D is in term seven.

784
01:23:14,000 --> 01:23:17,000
Like if a tries to elect itself for term seven,

785
01:23:17,000 --> 01:23:22,000
then we don't actually have this case because if the RPC request or

786
01:23:22,000 --> 01:23:26,000
if one contains a term which is strictly greater than the current term you do that.

787
01:23:26,000 --> 01:23:27,000
But if they're the same,

788
01:23:27,000 --> 01:23:28,000
then it doesn't matter.

789
01:23:28,000 --> 01:23:31,000
It will just proceed as normal.

790
01:23:31,000 --> 01:23:32,000
That's correct.

791
01:23:32,000 --> 01:23:33,000
Yes, that's right.

792
01:23:33,000 --> 01:23:37,000
The interest get replaced by whatever age telling us.

793
01:23:37,000 --> 01:23:40,000
So at the end of section,

794
01:23:40,000 --> 01:23:44,000
like the election restriction section 5.4.1.

795
01:23:44,000 --> 01:23:54,000
They they raft determines which of the two logs is more up to date by comparing the index and term of the last entries in the log.

796
01:23:54,000 --> 01:23:59,000
So within that mean that D has to become the leader.

797
01:23:59,000 --> 01:24:01,000
If we're comparing.

798
01:24:01,000 --> 01:24:04,000
No, because did just this vote no.

799
01:24:04,000 --> 01:24:07,000
But other people might vote yes.

800
01:24:07,000 --> 01:24:09,000
Yeah.

801
01:24:09,000 --> 01:24:12,000
So what about the case where.

802
01:24:12,000 --> 01:24:15,000
So what about the case where.

803
01:24:15,000 --> 01:24:17,000
Go ahead.

804
01:24:17,000 --> 01:24:22,000
What about the case where E runs for election in terms five,

805
01:24:22,000 --> 01:24:24,000
for example, or five.

806
01:24:24,000 --> 01:24:27,000
And then it gets a vote from D saying no,

807
01:24:27,000 --> 01:24:31,000
it would then update its term right and stop running.

808
01:24:31,000 --> 01:24:32,000
I got this.

809
01:24:32,000 --> 01:24:36,000
You were thinking about you starting an election for five.

810
01:24:36,000 --> 01:24:37,000
Yeah.

811
01:24:37,000 --> 01:24:40,000
And if it gets a response from almost anybody,

812
01:24:40,000 --> 01:24:42,000
it's behind in a right.

813
01:24:42,000 --> 01:24:45,000
So it does update its term in that case, right?

814
01:24:45,000 --> 01:24:47,000
Another person in a pen.

815
01:24:47,000 --> 01:24:50,000
Another way to ask this question, who can become leader?

816
01:24:50,000 --> 01:24:53,000
Right in this, you know, from these, you know,

817
01:24:53,000 --> 01:24:56,000
whenever from these six ABC for F,

818
01:24:56,000 --> 01:24:58,000
who can become leader?

819
01:24:58,000 --> 01:25:00,000
Can one of F become leader?

820
01:25:00,000 --> 01:25:01,000
No.

821
01:25:01,000 --> 01:25:03,000
Call them up.

822
01:25:03,000 --> 01:25:07,000
Can he become leader?

823
01:25:07,000 --> 01:25:09,000
Can he become leader?

824
01:25:09,000 --> 01:25:11,000
Can he become leader?

825
01:25:11,000 --> 01:25:15,000
I'm also know the only ones that can become leader are AC and

826
01:25:15,000 --> 01:25:16,000
E.

827
01:25:16,000 --> 01:25:19,000
That's correct.

828
01:25:19,000 --> 01:25:21,000
Possible leaders.

829
01:25:21,000 --> 01:25:25,000
But can can a become a leader if D is alive?

830
01:25:25,000 --> 01:25:26,000
Because the,

831
01:25:26,000 --> 01:25:30,000
because the safety section says that the RPC,

832
01:25:30,000 --> 01:25:33,000
the request what RPC implements the restriction that it,

833
01:25:33,000 --> 01:25:36,000
it compares the last log entries and the one with the highest log

834
01:25:36,000 --> 01:25:38,000
of the number of log entries.

835
01:25:38,000 --> 01:25:41,000
I think it doesn't vote for someone.

836
01:25:41,000 --> 01:25:43,000
Exactly.

837
01:25:43,000 --> 01:25:47,000
So like, he will never vote for a right or for anything else.

838
01:25:47,000 --> 01:25:49,000
That's exactly right.

839
01:25:49,000 --> 01:25:51,000
I mean, it's also not true that like,

840
01:25:51,000 --> 01:25:54,000
if you have an entry in a higher term,

841
01:25:54,000 --> 01:25:56,000
then another node that like,

842
01:25:56,000 --> 01:26:00,000
you're actually sort of like better, right?

843
01:26:00,000 --> 01:26:01,000
Because, um,

844
01:26:01,000 --> 01:26:05,000
I mean, you can be like becoming leader and trying to append

845
01:26:05,000 --> 01:26:07,000
you append and reason to the log,

846
01:26:07,000 --> 01:26:09,000
but they don't go through.

847
01:26:09,000 --> 01:26:10,000
So,

848
01:26:10,000 --> 01:26:11,000
well, these life,

849
01:26:11,000 --> 01:26:12,000
they wouldn't go through.

850
01:26:12,000 --> 01:26:13,000
Okay.

851
01:26:13,000 --> 01:26:14,000
These life, correct?

852
01:26:14,000 --> 01:26:16,000
Devoted against eight becomes leader.

853
01:26:16,000 --> 01:26:18,000
Dety A actually tries to,

854
01:26:18,000 --> 01:26:19,000
well,

855
01:26:19,000 --> 01:26:20,000
if,

856
01:26:20,000 --> 01:26:22,000
A won't contact D.

857
01:26:22,000 --> 01:26:28,000
He actually didn't vote for it.

858
01:26:28,000 --> 01:26:31,000
And so they would just proceed.

859
01:26:31,000 --> 01:26:34,000
So why could D have logs in term seven?

860
01:26:34,000 --> 01:26:38,000
If it's not the leader in term seven.

861
01:26:38,000 --> 01:26:42,000
It must have been the leader in term seven, right?

862
01:26:42,000 --> 01:26:44,000
Yeah, I agree.

863
01:26:44,000 --> 01:26:54,000
Otherwise, we would have no log entries.

864
01:26:54,000 --> 01:26:57,000
Um, where can you have log duplication?

865
01:26:57,000 --> 01:26:59,000
I think I forgot.

866
01:26:59,000 --> 01:27:02,000
So in this case was D,

867
01:27:02,000 --> 01:27:05,000
a leader.

868
01:27:05,000 --> 01:27:06,000
In term seven,

869
01:27:06,000 --> 01:27:07,000
who got disconnected.

870
01:27:07,000 --> 01:27:12,000
And then the new leader got elected the one at the top.

871
01:27:12,000 --> 01:27:15,000
Yeah, I think so.

872
01:27:15,000 --> 01:27:16,000
Actually, let me take it back.

873
01:27:16,000 --> 01:27:18,000
I don't really remember exactly the sequence.

874
01:27:18,000 --> 01:27:20,000
I really pay attention much to the top guy.

875
01:27:20,000 --> 01:27:21,000
What,

876
01:27:21,000 --> 01:27:23,000
I presume that is the case.

877
01:27:23,000 --> 01:27:26,000
It does say that is either for term eight.

878
01:27:26,000 --> 01:27:27,000
And that means like,

879
01:27:27,000 --> 01:27:29,000
you can write up with the reply.

880
01:27:29,000 --> 01:27:32,000
I think that that's not the problem of that.

881
01:27:32,000 --> 01:27:37,000
I think the case we're looking at the one where a has a higher.

882
01:27:37,000 --> 01:27:38,000
The number than D is a,

883
01:27:38,000 --> 01:27:42,000
the contradiction case in the safety argument that you mentioned.

884
01:27:42,000 --> 01:27:46,000
Like, I think they prove that this is not possible.

885
01:27:46,000 --> 01:27:48,000
That what is possible?

886
01:27:48,000 --> 01:27:49,000
Like that.

887
01:27:49,000 --> 01:27:50,000
Um,

888
01:27:50,000 --> 01:27:51,000
A could be elected.

889
01:27:51,000 --> 01:27:55,000
And be missing an entry and have a higher term than D,

890
01:27:55,000 --> 01:27:56,000
which is the case here.

891
01:27:56,000 --> 01:28:01,000
Obviously, YOU see no conclusions in human dwarfs,

892
01:28:01,000 --> 01:28:03,520
we speak to the expected group at the basic evidence that the

893
01:28:03,520 --> 01:28:06,000
bonding between themitt charges is,

894
01:28:06,000 --> 01:28:07,000
and you know.

895
01:28:07,000 --> 01:28:08,000
You want to be responsible?

896
01:28:08,000 --> 01:28:11,000
Just like to be the one I know more about wheezing,

897
01:28:11,000 --> 01:28:12,000
than like the step proof.

898
01:28:12,000 --> 01:28:14,000
That this is a contradiction.

899
01:28:14,000 --> 01:28:15,000
I,

900
01:28:15,000 --> 01:28:16,000
I don't think so.

901
01:28:16,000 --> 01:28:19,000
I think it's totally fine for it to be elected leader.

902
01:28:19,000 --> 01:28:20,000
I think,

903
01:28:20,000 --> 01:28:21,000
uh,

904
01:28:21,000 --> 01:28:24,000
I think the safety proof says that a future leader cannot have.

905
01:28:24,000 --> 01:28:26,720
And nothing wrong will happen in the end.

906
01:28:26,720 --> 01:28:32,880
And the reason that the whole committed thing works is because if it's committed then more

907
01:28:32,880 --> 01:28:38,119
than the majority have those entries and so someone who doesn't have the committed entries

908
01:28:38,119 --> 01:28:40,119
could never become elected, right?

909
01:28:40,119 --> 01:28:41,119
That's correct.

910
01:28:41,119 --> 01:28:42,119
Yes.

911
01:28:42,119 --> 01:28:44,119
That's exactly right.

912
01:28:44,119 --> 01:28:45,119
Yeah.

913
01:28:45,119 --> 01:28:52,119
They discussed like, yeah, like in terms of only something that's not going to happen

914
01:28:52,119 --> 01:28:56,559
in terms of only someone who has all the committed entries can get elected.

915
01:28:56,559 --> 01:29:02,119
I think it gets more complicated with, you know, within the people who have all the committed

916
01:29:02,119 --> 01:29:05,359
entries, which ones can't get elected.

917
01:29:05,359 --> 01:29:06,359
That's, yeah.

918
01:29:06,359 --> 01:29:07,359
Yeah.

919
01:29:07,359 --> 01:29:10,359
Somebody said it doesn't matter.

920
01:29:10,359 --> 01:29:11,359
Yeah.

921
01:29:11,359 --> 01:29:12,359
Yeah.

922
01:29:12,359 --> 01:29:13,359
Okay.

923
01:29:13,359 --> 01:29:14,359
Okay.

924
01:29:14,359 --> 01:29:15,359
Okay.

925
01:29:15,359 --> 01:29:16,359
Okay.

926
01:29:16,359 --> 01:29:17,359
Okay.

927
01:29:17,359 --> 01:29:18,359
Okay.

928
01:29:18,359 --> 01:29:23,279
All the commits after term four are not committed than here, right?

929
01:29:23,279 --> 01:29:24,279
So these two fours?

930
01:29:24,279 --> 01:29:27,679
Those are not the first two fours.

931
01:29:27,679 --> 01:29:31,960
Those are, what's the question?

932
01:29:31,960 --> 01:29:32,960
They all will be committed.

933
01:29:32,960 --> 01:29:33,960
Yeah.

934
01:29:33,960 --> 01:29:35,960
Those would be committed, but then everything after wouldn't be.

935
01:29:35,960 --> 01:29:36,960
Yeah.

936
01:29:36,960 --> 01:29:37,960
No.

937
01:29:37,960 --> 01:29:38,960
The five would be committed.

938
01:29:38,960 --> 01:29:39,960
Two six.

939
01:29:39,960 --> 01:29:41,960
And the two six, those are also valid.

940
01:29:42,960 --> 01:29:43,960
Okay.

941
01:29:43,960 --> 01:29:44,960
We only need exactly.

942
01:29:44,960 --> 01:29:45,960
It's okay.

943
01:29:45,960 --> 01:29:46,960
Exactly.

944
01:29:46,960 --> 01:29:47,960
Okay.

945
01:29:47,960 --> 01:29:48,960
Okay.

946
01:29:48,960 --> 01:29:49,960
You need one over half.

947
01:29:49,960 --> 01:29:50,960
Four.

948
01:29:50,960 --> 01:29:51,960
Yeah.

949
01:29:51,960 --> 01:29:54,960
So the five and six wouldn't be committed.

950
01:29:54,960 --> 01:29:56,960
Oh, but you have the other.

951
01:29:56,960 --> 01:29:57,960
You have the other right?

952
01:29:57,960 --> 01:29:58,960
Yeah.

953
01:29:58,960 --> 01:29:59,960
Yeah.

954
01:29:59,960 --> 01:30:00,960
Okay.

955
01:30:00,960 --> 01:30:01,960
Oh, let's not forget about those.

956
01:30:01,960 --> 01:30:02,960
Thank you.

957
01:30:02,960 --> 01:30:03,960
Okay.

958
01:30:03,960 --> 01:30:04,960
Yeah.

959
01:30:04,960 --> 01:30:09,960
I'll come back to this at the beginning of next lecture because some of you probably had

960
01:30:09,960 --> 01:30:10,960
a question.

961
01:30:10,960 --> 01:30:11,960
We're going to run to another class.

962
01:30:11,960 --> 01:30:13,960
But the, I'll come back to this.

963
01:30:13,960 --> 01:30:16,960
If you have more questions, feel free to stick around.

964
01:30:16,960 --> 01:30:23,960
You know, we'll resume this.

965
01:30:23,960 --> 01:30:26,960
Can you say the log deflication.

966
01:30:26,960 --> 01:30:30,960
Again, why, where could there be log deflication?

967
01:30:30,960 --> 01:30:37,960
What the, what I meant is that the leader at some point forces its log on the followers.

968
01:30:37,960 --> 01:30:45,960
I think, I think you meant it on some of the previous slides.

969
01:30:45,960 --> 01:30:46,960
Okay.

970
01:30:46,960 --> 01:30:50,960
So maybe you're maybe a, I can't remember when I said.

971
01:30:50,960 --> 01:30:51,960
Sorry.

972
01:30:51,960 --> 01:30:53,960
It is.

973
01:30:53,960 --> 01:30:56,960
It is a little more.

974
01:30:56,960 --> 01:30:58,960
Maybe a little more.

975
01:30:58,960 --> 01:30:59,960
Yeah.

976
01:30:59,960 --> 01:31:00,960
Okay.

977
01:31:00,960 --> 01:31:12,960
Oh, is that there deleted duplicates?

978
01:31:12,960 --> 01:31:13,960
Detect duplicates.

979
01:31:13,960 --> 01:31:14,960
Yeah.

980
01:31:14,960 --> 01:31:15,960
Yeah.

981
01:31:15,960 --> 01:31:16,960
This is, this is not an arraft issue.

982
01:31:16,960 --> 01:31:17,960
Correct.

983
01:31:17,960 --> 01:31:24,960
This is really a KV key value service issue.

984
01:31:24,960 --> 01:31:27,960
We're a client request.

985
01:31:27,960 --> 01:31:28,960
You know, might be reclined.

986
01:31:28,960 --> 01:31:32,960
A client may, okay, a client might not get a response.

987
01:31:32,960 --> 01:31:35,960
Even though, you know, that request actually went through a raft.

988
01:31:35,960 --> 01:31:39,960
Because what happened is that the leader may be applied the operation to its state.

989
01:31:39,960 --> 01:31:43,960
But before it responded to the client, it crashed.

990
01:31:43,960 --> 01:31:45,960
So the client will retry.

991
01:31:45,960 --> 01:31:47,960
And we'll send it to question the new leader.

992
01:31:47,960 --> 01:31:49,960
The new linear will run it through a raft.

993
01:31:49,960 --> 01:31:52,960
And it will pop out of a raft again.

994
01:31:52,960 --> 01:31:57,960
So it has to be the case that the KV server does duplicate detection.

995
01:31:57,960 --> 01:32:01,960
Also, this is like only if the client didn't get the response.

996
01:32:01,960 --> 01:32:02,960
That's exactly.

997
01:32:02,960 --> 01:32:03,960
Yeah, exactly.

998
01:32:03,960 --> 01:32:04,960
Okay.

999
01:32:04,960 --> 01:32:05,960
Okay.

1000
01:32:05,960 --> 01:32:06,960
Thank you.

1001
01:32:06,960 --> 01:32:07,960
Yeah.

1002
01:32:07,960 --> 01:32:12,960
Then that will be no, you will do this in live free.

1003
01:32:12,960 --> 01:32:17,960
I think I also asked this question during the lecture, but I don't think I fully understood the answers.

1004
01:32:17,960 --> 01:32:19,960
So I just repeat the question.

1005
01:32:19,960 --> 01:32:20,960
Yeah.

1006
01:32:20,960 --> 01:32:22,960
The question is that.

1007
01:32:22,960 --> 01:32:30,960
So you said that the way commits work is that once the leader commits, it waits for a new client.

1008
01:32:30,960 --> 01:32:36,960
Message and then it just depends that message of the log entry and sends an append entry to the remaining followers.

1009
01:32:36,960 --> 01:32:41,960
With an additional message saying that they should also commit all the previous entries, correct?

1010
01:32:41,960 --> 01:32:44,960
Yeah, there's indirectly the protocol, the staff correct.

1011
01:32:44,960 --> 01:32:45,960
Right.

1012
01:32:45,960 --> 01:32:56,960
So I think that what if the leader commits all the entries and right before it is able to send this message to the remaining followers, the leader crashes.

1013
01:32:56,960 --> 01:33:03,960
It cannot commit until it has a majority response from all the from from a majority of the followers.

1014
01:33:03,960 --> 01:33:04,960
I see.

1015
01:33:04,960 --> 01:33:07,960
So it it first like even.

1016
01:33:07,960 --> 01:33:12,960
It sticks to the log, but doesn't actually deliver to the KV server yet.

1017
01:33:12,960 --> 01:33:19,960
So it waits from a reply of commit from all the remaining followers and then it recommends its own.

1018
01:33:19,960 --> 01:33:20,960
Yeah.

1019
01:33:20,960 --> 01:33:21,960
Okay.

1020
01:33:21,960 --> 01:33:24,960
So there's a basically this variable by ask the client or commit index, correct?

1021
01:33:24,960 --> 01:33:32,960
That is actually maintaining it only increases the commit index and once it receives response from the majority of the followers.

1022
01:33:32,960 --> 01:33:39,960
And all of the followers say that they have committed their own like they have committed the log increase on their own servers.

1023
01:33:39,960 --> 01:33:47,960
They will commit their log entries once they know that the leader actually has committed it.

1024
01:33:47,960 --> 01:33:48,960
Right.

1025
01:33:48,960 --> 01:33:53,960
So that's my question like how would they know if the leader is unable to send that message to the remaining followers?

1026
01:33:53,960 --> 01:33:58,960
Well, so then you know, we basically we end in situations that we just saw in this figure seven.

1027
01:33:58,960 --> 01:34:08,960
There's going to be tentative log entries in their logs and depending who becomes new leader and what the log situation is, you know, that operation may get committed or may not get committed.

1028
01:34:08,960 --> 01:34:09,960
I see.

1029
01:34:09,960 --> 01:34:10,960
Okay.

1030
01:34:10,960 --> 01:34:11,960
Yeah.

1031
01:34:11,960 --> 01:34:12,960
Thank you.

1032
01:34:12,960 --> 01:34:13,960
Hi.

1033
01:34:13,960 --> 01:34:14,960
I had a follow up question on this.

1034
01:34:14,960 --> 01:34:21,960
So if says the leader pushes a log entry, it's gets accepted by majority, but it crashes.

1035
01:34:21,960 --> 01:34:26,960
Then later on, this log entry can be committed right by some other leader.

1036
01:34:26,960 --> 01:34:27,960
It can't.

1037
01:34:27,960 --> 01:34:28,960
Oh, may not.

1038
01:34:28,960 --> 01:34:29,960
Yeah.

1039
01:34:29,960 --> 01:34:35,960
But say if it's get committed, then how does the new leader know who was the client who.

1040
01:34:35,960 --> 01:34:38,960
Requested for this log entry or I will.

1041
01:34:38,960 --> 01:34:39,960
The client.

1042
01:34:39,960 --> 01:34:40,960
In the.

1043
01:34:40,960 --> 01:34:41,960
In the.

1044
01:34:41,960 --> 01:34:42,960
The.

1045
01:34:42,960 --> 01:34:43,960
The.

1046
01:34:43,960 --> 01:34:44,960
The.

1047
01:34:44,960 --> 01:34:45,960
The.

1048
01:34:45,960 --> 01:34:46,960
The.

1049
01:34:46,960 --> 01:34:47,960
The.

1050
01:34:47,960 --> 01:34:48,960
The.

1051
01:34:48,960 --> 01:34:49,960
The.

1052
01:34:49,960 --> 01:34:50,960
The.

1053
01:34:50,960 --> 01:34:51,960
Okay.

1054
01:34:51,960 --> 01:34:56,960
So that's really question about like actually how the KVs are exactly stored information with raft.

1055
01:34:56,960 --> 01:34:59,960
So the scenario is client talked to the leader.

1056
01:34:59,960 --> 01:35:00,960
The.

1057
01:35:00,960 --> 01:35:01,960
The client.

1058
01:35:01,960 --> 01:35:02,960
The.

1059
01:35:02,960 --> 01:35:03,960
The.

1060
01:35:03,960 --> 01:35:04,960
The.

1061
01:35:04,960 --> 01:35:05,960
The client.

1062
01:35:05,960 --> 01:35:07,960
The leader actually committed.

1063
01:35:07,960 --> 01:35:09,960
Did the executive's operation or not?

1064
01:35:09,960 --> 01:35:10,960
It did not.

1065
01:35:10,960 --> 01:35:11,960
No, it.

1066
01:35:11,960 --> 01:35:12,960
It did not.

1067
01:35:12,960 --> 01:35:15,960
So then one of the followers later.

1068
01:35:15,960 --> 01:35:17,960
We'll get this operation.

1069
01:35:17,960 --> 01:35:19,960
Maybe apply it.

1070
01:35:19,960 --> 01:35:22,960
Won't send a response because there's no about the client.

1071
01:35:22,960 --> 01:35:24,960
But the client will retry, right?

1072
01:35:24,960 --> 01:35:26,960
Because it actually hasn't gotten a response.

1073
01:35:26,960 --> 01:35:30,960
It will contact the new leader and basically enter the same operation in the.

1074
01:35:30,960 --> 01:35:31,960
In the.

1075
01:35:31,960 --> 01:35:32,960
In the raft again.

1076
01:35:32,960 --> 01:35:33,960
And then we'll pop out again.

1077
01:35:33,960 --> 01:35:35,960
And then the server will send the.

1078
01:35:35,960 --> 01:35:38,960
As we'll see in the last three, it will send the last response.

1079
01:35:38,960 --> 01:35:44,960
So I expect the servers remember the last value that they sent back.

1080
01:35:44,960 --> 01:35:45,960
Okay.

1081
01:35:45,960 --> 01:35:51,960
So if there's a get request, you know, the first get request is executed.

1082
01:35:51,960 --> 01:35:53,960
There's no response to be sent back.

1083
01:35:53,960 --> 01:35:57,960
That get request actually, but you will store the response in the.

1084
01:35:57,960 --> 01:36:00,960
In the KV in the KV server will remember the response.

1085
01:36:00,960 --> 01:36:03,960
So when it sees it to duplicate it and then we'll send the response.

1086
01:36:03,960 --> 01:36:05,960
So there will be duplicate detection table.

1087
01:36:05,960 --> 01:36:07,960
That includes the response.

1088
01:36:07,960 --> 01:36:08,960
Okay.

1089
01:36:08,960 --> 01:36:09,960
Yeah, makes sense.

1090
01:36:09,960 --> 01:36:10,960
Thanks.

1091
01:36:10,960 --> 01:36:12,960
Welcome.

1092
01:36:12,960 --> 01:36:14,960
I was a little curious.

1093
01:36:14,960 --> 01:36:19,960
I think I asked roughly this and my question like pre electric question as well.

1094
01:36:19,960 --> 01:36:21,960
Like how raft compares to other like the.

1095
01:36:21,960 --> 01:36:23,960
In terms of like optimizations you could do.

1096
01:36:23,960 --> 01:36:26,960
And like as an example, I was thinking the ability I could sort of think of was.

1097
01:36:26,960 --> 01:36:27,960
Batching.

1098
01:36:27,960 --> 01:36:31,960
Yeah, it seemed like raft is like perfect for batching because the leader could just like put a.

1099
01:36:31,960 --> 01:36:34,960
You know, more than one entry on its log wait a little bit before sending its next.

1100
01:36:34,960 --> 01:36:36,960
Ventures and send that.

1101
01:36:36,960 --> 01:36:39,960
Ventures with whatever batch set of.

1102
01:36:39,960 --> 01:36:41,960
Operations or whatever it wants the replica to do.

1103
01:36:41,960 --> 01:36:43,960
And then we'll see if we can.

1104
01:36:43,960 --> 01:36:44,960
And then we'll see if we can.

1105
01:36:44,960 --> 01:36:45,960
And then we'll see if we can.

1106
01:36:45,960 --> 01:36:46,960
And then we'll see if we can.

1107
01:36:46,960 --> 01:36:47,960
And then we'll see if we can.

1108
01:36:47,960 --> 01:36:54,960
And then we'll see if we can.

1109
01:36:54,960 --> 01:36:56,960
Operation or whatever it wants the replica to do.

1110
01:36:56,960 --> 01:36:57,960
Just to figure out like what.

1111
01:36:57,960 --> 01:37:00,960
What was was the Diffission to the raft like from a performance point of view.

1112
01:37:00,960 --> 01:37:03,960
Well, raft does not do that shape right.

1113
01:37:03,960 --> 01:37:05,960
And maybe it could.

1114
01:37:05,960 --> 01:37:08,960
But I'm going to make it a vertical more complicated.

1115
01:37:08,960 --> 01:37:15,960
And so they just get nothing.

1116
01:37:15,960 --> 01:37:19,800
I guess it's not like you don't really need to do anything other than just like maybe wait

1117
01:37:19,800 --> 01:37:21,000
if you feel like it before.

1118
01:37:21,000 --> 01:37:21,960
Yeah, you can have multiple.

1119
01:37:24,199 --> 01:37:25,000
So yeah, I guess like.

1120
01:37:31,239 --> 01:37:33,000
I think it comes down to performance.

1121
01:37:33,880 --> 01:37:37,640
There's a whole bunch of optimizations that Grapp doesn't do, you know, that some other systems do.

1122
01:37:37,640 --> 01:37:40,840
Like, you know, for example, you might be able to commute to your operations because it doesn't

1123
01:37:41,000 --> 01:37:43,079
matter in what order you do them.

1124
01:37:43,720 --> 01:37:47,960
So there's a slew of optimizations and around just basically do not have them.

1125
01:37:48,760 --> 01:37:49,079
Okay.

1126
01:37:51,480 --> 01:37:52,199
Thanks.

1127
01:37:52,199 --> 01:37:54,360
And it may be perfectly fine for like the use case.

1128
01:37:54,360 --> 01:37:55,159
Right.

1129
01:37:55,159 --> 01:37:55,400
Right.

1130
01:37:59,560 --> 01:38:04,520
You mentioned something a couple minutes ago that a lot of NJ could be lost.

1131
01:38:04,520 --> 01:38:07,960
No, it's not possible that like a client request could never be executed.

1132
01:38:07,960 --> 01:38:13,960
Book of Grapp guarantees that all the servers will execute the same set of lock entries in the same sequence.

1133
01:38:15,880 --> 01:38:20,520
And so like that means the draft is not, cannot be usable for like all applications.

1134
01:38:20,520 --> 01:38:26,039
If we can, only if we can afford some long requests.

1135
01:38:27,560 --> 01:38:34,439
Well, you know, we have to assume that we get the responses from the, from the RAF servers as a whole

1136
01:38:34,439 --> 01:38:38,439
per if the KV servers plus RAF may get lost anyway because the network gets lost.

1137
01:38:39,159 --> 01:38:40,759
And that's what network may lost responses.

1138
01:38:40,759 --> 01:38:42,679
So the client has to be able to repeat.

1139
01:38:44,039 --> 01:38:47,319
When the client must recent, must retry.

1140
01:38:48,599 --> 01:38:49,000
I see.

1141
01:38:49,000 --> 01:38:55,960
So like when it actually commits a log entry and excuses, it applies to the client that it did actually do that.

1142
01:38:55,960 --> 01:38:56,439
Yeah.

1143
01:38:56,439 --> 01:38:56,599
Yeah.

1144
01:38:56,599 --> 01:38:58,439
So this is like we were literally talking about this.

1145
01:38:58,439 --> 01:39:03,879
The duplicate detection table, the duplicate detection table has the response that was sent

1146
01:39:03,880 --> 01:39:06,840
or was constructed in response to executing that operation.

1147
01:39:08,840 --> 01:39:09,079
Thank you.

1148
01:39:13,640 --> 01:39:14,760
Any further questions?

1149
01:39:18,279 --> 01:39:19,880
Okay. Thank you so much.

1150
01:39:19,880 --> 01:39:31,319
Hi. Welcome. It's great to ask so many questions.

