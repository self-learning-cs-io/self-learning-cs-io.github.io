---
title: MIT6824 P14Lecture14 Spanner
---

1
00:00:00,000 --> 00:00:05,000
Good afternoon, good evening, good night, good morning, whatever you are or whenever you're watching this.

2
00:00:06,000 --> 00:00:09,000
So today I want to talk about

3
00:00:10,000 --> 00:00:11,000
Spanner.

4
00:00:11,000 --> 00:00:20,000
This is a paper from 2012, but that the Spanner system is the active use and also still continuously under development.

5
00:00:21,000 --> 00:00:23,000
So it's a real system.

6
00:00:23,000 --> 00:00:29,000
The main topic and then why do you spend is really interesting is it supports white area.

7
00:00:30,000 --> 00:00:32,000
Transactions.

8
00:00:38,000 --> 00:00:42,000
And this is a really powerful programming model.

9
00:00:42,000 --> 00:00:57,000
So even though the data, where maybe the data charted across multiple servers and servers being in different data centers and the different pieces on the planet, you can just run transactions and they have asset.

10
00:00:58,000 --> 00:01:02,000
Symandics, their atomic, you know, respective failure at all the right to happen or none of them.

11
00:01:02,000 --> 00:01:05,000
And they provide zero light ability.

12
00:01:05,000 --> 00:01:09,000
And so that's an incredibly powerful programming abstraction.

13
00:01:09,000 --> 00:01:17,000
And of course, you know, the challenge is to implement it efficiently in one big challenge is just like a law physics.

14
00:01:17,000 --> 00:01:25,000
And the speed of light, you know, sending a packet from one end in one part of the U.S. to the other part of the US, or to another continent, that takes a lot of time.

15
00:01:25,000 --> 00:01:28,000
We're talking about tens of milliseconds.

16
00:01:28,000 --> 00:01:34,000
And so what we're going to see in this paper is that read write transactions are actually

17
00:01:34,000 --> 00:01:43,000
indeed quite expensive, but they work very hard to make read only transactions very inexpensive.

18
00:01:43,000 --> 00:01:52,000
And so the read write transactions are implemented using two phase commits.

19
00:01:52,000 --> 00:01:57,000
As we talked about last week, two phase locking.

20
00:01:57,000 --> 00:02:12,000
And one of the things that is interesting about it is that the participants in this vertical are just basically patched groups.

21
00:02:12,000 --> 00:02:19,000
The read only transactions can execute at any data center.

22
00:02:19,000 --> 00:02:24,000
And they're ever going to run very fast in the fact that you get to tables six in the back.

23
00:02:24,000 --> 00:02:30,000
The paper, you will see the read only transactions are going to be like ten times fast with read write transactions.

24
00:02:30,000 --> 00:02:33,000
And there are two key ideas there that we'll talk about in this lecture.

25
00:02:33,000 --> 00:02:41,000
One is snapshot isolation, which actually is a standard database idea, but I use it here to make the read.

26
00:02:41,000 --> 00:02:43,000
To make the read fast.

27
00:02:43,000 --> 00:02:54,000
And in particular, you know, to make it actually work well in a distributed write area setting, the rely on synchronized clocks or day.

28
00:02:54,000 --> 00:02:57,000
Now those clocks are not perfectly synchronized.

29
00:02:57,000 --> 00:03:09,000
And so their transaction scheme must deal with a little bit of a swap or drift or error margin in exactly know what the true time is.

30
00:03:09,000 --> 00:03:14,000
Now, as I said, it's widely used.

31
00:03:14,000 --> 00:03:17,000
Both internally and Google.

32
00:03:17,000 --> 00:03:20,000
But also as a Google customer, you can use it.

33
00:03:20,000 --> 00:03:24,000
Spanner is basically a cloud service that you can use your Google customer.

34
00:03:24,000 --> 00:03:33,000
If you use Gmail, probably your email or part of the email system actually go through a standout.

35
00:03:33,000 --> 00:03:42,000
Maybe before diving into more detail, I want to make one logistic comment, not unrelated to spinner.

36
00:03:42,000 --> 00:03:50,000
As you may already have seen, we made some adjustment for the long weekend, long upcoming weekend.

37
00:03:50,000 --> 00:03:56,000
First of all, lack for a is not as heavy duty as the other labs.

38
00:03:56,000 --> 00:04:05,000
So hopefully to take the less time, we also canceled next week's lectures, so that you can actually use that as time to work on for a.

39
00:04:05,000 --> 00:04:08,000
And we made the deadline for for a more flexible.

40
00:04:08,000 --> 00:04:11,000
So it'd be next Friday is not convenient for you.

41
00:04:11,000 --> 00:04:17,000
You can actually choose to have another extra late hour to submit it later.

42
00:04:17,000 --> 00:04:25,000
And hopefully that will allow you to enjoy the long weekend and perhaps get some sleep and maybe do something else.

43
00:04:25,000 --> 00:04:30,000
And then debugging your labs.

44
00:04:30,000 --> 00:04:34,000
The second point I want to make is directly related to spinner.

45
00:04:34,000 --> 00:04:38,000
Some of you noticed this and came through in the questions.

46
00:04:38,000 --> 00:04:41,000
This paper is quite complicated.

47
00:04:41,000 --> 00:04:43,000
And there's many reasons why it's complicated.

48
00:04:43,000 --> 00:04:48,000
But one reason is that actually there's a lot of things going on.

49
00:04:48,000 --> 00:04:49,000
That's a powerful system.

50
00:04:49,000 --> 00:04:52,000
And there's a lot of different components to it.

51
00:04:52,000 --> 00:04:57,000
And you know, the interaction team of different components is important.

52
00:04:57,000 --> 00:05:00,000
And so there's usually a lot, a lot of material in this paper.

53
00:05:00,000 --> 00:05:07,000
And so what I will try to do in this lecture is try to make it more clear by focusing on a couple aspects of the paper.

54
00:05:07,000 --> 00:05:11,000
And I'm not going to do a full treatment of the paper.

55
00:05:11,000 --> 00:05:17,000
But you know, focus, I think what are the most important ideas and why we're reading it in a two four.

56
00:05:17,000 --> 00:05:32,000
That took me actually, you know, a little bit of time or a few years to figure out actually how to present this paper or explain it in a way that I think it's maybe easier to understand, you know, if you're for in the context of six or four.

57
00:05:32,000 --> 00:05:33,000
Okay.

58
00:05:33,000 --> 00:05:37,000
But they ask questions as always.

59
00:05:37,000 --> 00:05:50,000
Okay. So let's dive in and talk a little bit of the high level organization.

60
00:05:50,000 --> 00:05:56,000
And more from the point of view, from the way I want to talk about this about spanner in this lecture.

61
00:05:56,000 --> 00:06:09,000
And so there's multiple data centers. You know, there's for convenience or simplicity, you know, just think about their free data centers, a, baby and see.

62
00:06:09,000 --> 00:06:13,000
And it can be anywhere in the world.

63
00:06:13,000 --> 00:06:25,000
And the goal is that basically, you know, data will be like way up and maybe data like a chart, you know, that contains, you know, some database rose or some key value pairs.

64
00:06:25,000 --> 00:06:27,000
So that's a chart.

65
00:06:27,000 --> 00:06:31,000
Maybe it has the keys a to M.

66
00:06:31,000 --> 00:06:38,000
And the basic ideas is actually, you know, we're going to replicate that chart across data centers.

67
00:06:38,000 --> 00:06:42,000
And then we've the goal that like even if a complete data center goes down.

68
00:06:42,000 --> 00:06:44,000
Then you know, we can proceed.

69
00:06:44,000 --> 00:06:52,000
And then we were going to arrange that we can be able to proceed is that basically these charts are going to form.

70
00:06:52,000 --> 00:06:55,000
These are broadcasts that are sitting in different data center.

71
00:06:55,000 --> 00:07:04,000
We're going to form one taxes group.

72
00:07:04,000 --> 00:07:07,000
So you're sort of thinking about it before we're trying to think about this in terms of black.

73
00:07:07,000 --> 00:07:16,000
Three, then you could think about that, you know, we have a key value store where the key value servers are spread around different data centers.

74
00:07:16,000 --> 00:07:24,000
And the keys are updated, you know, the best knitting raft, you know, rights, you know, food, the rap log.

75
00:07:24,000 --> 00:07:29,000
And then you know, the individual key fees, KVs, you know, update their state.

76
00:07:29,000 --> 00:07:35,000
So you can think about like, you know, lap free being here instead of running, you know, free KV servers and machine.

77
00:07:35,000 --> 00:07:42,000
You're going to run one KV server of indifferent data centers.

78
00:07:42,000 --> 00:07:44,000
Okay.

79
00:07:44,000 --> 00:07:49,000
So you know, then there's going to be a packs of group per chart.

80
00:07:49,000 --> 00:07:55,000
So there.

81
00:07:55,000 --> 00:08:00,000
You might be out of charts, that have all the other parts of the.

82
00:08:00,000 --> 00:08:03,000
Value space or database rows.

83
00:08:03,000 --> 00:08:12,000
So let's say, you know, we have only two charts, you know, for this particular database, you know, a chart containing eight to them and then the chart containing and disease.

84
00:08:12,000 --> 00:08:17,000
And then you're going to form their own taxes group.

85
00:08:17,000 --> 00:08:31,000
And the reason we wanted to get a multiple charts is to get parallelism.

86
00:08:31,000 --> 00:08:43,000
So that we can, you know, I have the transactions involved different charts, you know, this jump this, this, this joint set of charts, you know, they can be these these transactions can actually proceed completing parallel.

87
00:08:43,000 --> 00:08:53,000
So as I mentioned earlier, we have a packs of group per chart.

88
00:08:53,000 --> 00:09:00,000
For replication, but you know, patches actually provides us, you know, an additional sort of benefit.

89
00:09:00,000 --> 00:09:05,000
The communication costs right for them from a to be here for me to see might be very expensive.

90
00:09:05,000 --> 00:09:15,000
And since you know, packs, there's a lot of the proceeds or raft allows us to proceed with just the majority, you know, the slow machine might actually have not that much performance impact.

91
00:09:15,000 --> 00:09:23,000
And so we can sort of easily tolerate either slow machines or actually one, you know, data center being a doubt.

92
00:09:23,000 --> 00:09:36,000
So the majority of rule helps us in two ways. You know, we get data center full tolerance.

93
00:09:36,000 --> 00:09:41,000
And sort of slowness.

94
00:09:41,000 --> 00:09:54,000
Now, a final goal, as we'll see in a little bit more detail is that a client of, and then a spinner. So let's say you're some server.

95
00:09:54,000 --> 00:10:01,000
Use a spinner. We'd like it to be the case that, you know, this server can actually use a closed replica.

96
00:10:01,000 --> 00:10:06,000
And so the replicas, you know, typically are placed.

97
00:10:06,000 --> 00:10:12,000
Close close to the clients that actually use them.

98
00:10:12,000 --> 00:10:19,000
And the fact we'll see that, you know, green only traction transactions can really executed basically by the local replica.

99
00:10:19,000 --> 00:10:23,000
And without any communication to the other data centers.

100
00:10:23,000 --> 00:10:36,000
And that client here, this is typically sort of the backend service of some Google service. So, for example, this might be the Gmail server not sitting.

101
00:10:36,000 --> 00:10:42,000
You know, those are in some data center and maybe the same data center and talks to the replicas in that particular data centers.

102
00:10:42,000 --> 00:10:46,000
And of course, outside our real clients, like users.

103
00:10:46,000 --> 00:10:49,000
You know, read a right email.

104
00:10:49,000 --> 00:11:01,000
Okay, any sort of questions about this high level organization.

105
00:11:01,000 --> 00:11:05,000
Okay, so let me sort of.

106
00:11:05,000 --> 00:11:11,000
I have the challenges that I want to focus on in this lecture.

107
00:11:11,000 --> 00:11:18,000
And so we're going to sort of free main challenges.

108
00:11:18,000 --> 00:11:28,000
One is, you know, the way is like, no, I said we want to actually do read only transaction without actually having to communicate with any other server.

109
00:11:28,000 --> 00:11:48,000
And we got to make sure that the read sees the latest right.

110
00:11:48,000 --> 00:11:59,000
And this sort of classic challenge that we've seen before, you know, and zookeeper, zookeeper, sort of, it doesn't really address the challenge right head on. And there's like a weakens the consistency.

111
00:11:59,000 --> 00:12:11,000
But here in this design, we'd like to arrange it in a way that actually we still keep linearizability. In fact, we're the spendership for a slightly stronger property than the linearizability.

112
00:12:11,000 --> 00:12:21,000
Second thing is when you want to support spender wants to support transactions across charge.

113
00:12:21,000 --> 00:12:29,000
So even it's actually like that we do a bank transfer and one account is in one chart, the other account that is nation count is another chart.

114
00:12:29,000 --> 00:12:37,000
We want to arrange that, you know, it's still can be executed like a transaction and assets, as a Smentix.

115
00:12:37,000 --> 00:12:46,000
And finally, you know, the transactions both the read only once and the read right ones must be serializable.

116
00:12:46,000 --> 00:12:54,000
In fact, a little bit stronger than serializable.

117
00:12:54,000 --> 00:13:04,000
And we'll see that the, you know, for this, you know, for the basically for the read right transactions, you know, we're going to use two face locking to face commit.

118
00:13:04,000 --> 00:13:11,000
And the protocol basically the two protocols that we talked about in the last lecture.

119
00:13:11,000 --> 00:13:27,000
What I like to do first is talk about read right transactions and then talking more detail how read only transaction are executed so that they can run very efficiently.

120
00:13:27,000 --> 00:13:34,000
Okay, so read right transactions are basically two face locking and two face commit.

121
00:13:34,000 --> 00:13:43,000
Hopefully this is going to be easy to understand.

122
00:13:43,000 --> 00:13:49,000
And they're going to involve the sort of complex timing diagrams that we looked at last last week.

123
00:13:49,000 --> 00:14:00,000
And so, you know, the way it's set up and I'm going to simplify a bit, but you know, the way it's sort of simple set up in a spanner is we have to climb.

124
00:14:00,000 --> 00:14:05,000
And then we're going to find this sort of in charge of really running the transaction.

125
00:14:05,000 --> 00:14:08,000
The users of transaction manager, now, transaction library.

126
00:14:08,000 --> 00:14:11,000
That actually runs on the client machine.

127
00:14:11,000 --> 00:14:17,000
And you know, it's in charge, you know, basically orchestrate the transaction.

128
00:14:17,000 --> 00:14:26,000
And again, the client here is not, you know, the user web browser or for Gmail, but it basically the servers with the server on the Gmail server in the data center.

129
00:14:26,000 --> 00:14:34,000
And so let's make it the picture of a reasonable symbol. So we're going to have two charge instead of three or five.

130
00:14:34,000 --> 00:14:38,000
So we have short a and we have short B.

131
00:14:38,000 --> 00:14:43,000
And let's assume we're going to just execute the transfer transaction.

132
00:14:43,000 --> 00:14:49,000
The same one is before where we're going to deduct some money from one account and add up to another account.

133
00:14:49,000 --> 00:14:58,000
Initially, I'm going to talk about this without the timestamps.

134
00:14:58,000 --> 00:15:05,000
And in some ways, you know, the one we really do so is that for actually for the read right transaction timestamps are not very important.

135
00:15:05,000 --> 00:15:08,000
The timestamps actually are mostly there for read only transactions.

136
00:15:08,000 --> 00:15:17,000
And they need a little bit tweaking to the read right transactions to support the read only transactions and therefore the timestamps sort of sort of.

137
00:15:17,000 --> 00:15:27,000
And drifting to read right just actually two. But in essence, you know, the read right transactions are just basically straight two face locking and two face commit.

138
00:15:27,000 --> 00:15:34,000
So the client is going to reach these accounts. For example, let's assume that read X.

139
00:15:34,000 --> 00:15:45,000
So reaches is going to do the transfer transaction from moving money from adding one to X and you know, subtracting what subtracting one dollar from X and adding a dollar to Y.

140
00:15:45,000 --> 00:15:52,000
So it's going to read X. Let's assume that X is sits in one chart. So that's going to be a cross chart transaction.

141
00:15:52,000 --> 00:15:57,000
And yes, the read off Y.

142
00:15:57,000 --> 00:16:10,000
And there's going to be when the client executes these or issues these read operations, they go to the charts and the charts actually keep a walk table.

143
00:16:10,000 --> 00:16:17,000
And so the record that basically this transaction, you know, so let's say this is transaction whatever TID.

144
00:16:17,000 --> 00:16:22,000
And they're going to record that the X is owned.

145
00:16:22,000 --> 00:16:28,000
It's the lock table X is owned by the client. You know, and he is a wise owned by the client.

146
00:16:28,000 --> 00:16:33,000
And that's sort of the very standard. So you know, we've seen before.

147
00:16:33,000 --> 00:16:45,000
And the thing that is slightly different here and I'm not fully drawing it out here is that when we're talking to one chart, a chart, a is really one of these actress groups.

148
00:16:45,000 --> 00:16:48,000
And so it has you know, free.

149
00:16:48,000 --> 00:16:52,000
Yes, in this case, you know, a group of free peers.

150
00:16:52,000 --> 00:16:59,000
And so S a really replicated surface, you know, consisting of multiple peers.

151
00:16:59,000 --> 00:17:07,000
In when executing read only transaction, we're going to be talking to the meter of that peer. So if you think it turns a raff style, you can just think about it.

152
00:17:07,000 --> 00:17:14,000
The read requires those to the meter of the access group.

153
00:17:14,000 --> 00:17:17,000
And another.

154
00:17:17,000 --> 00:17:23,000
So that is a sort of every time I sort of draw this one single arrow here for S a or for S b.

155
00:17:23,000 --> 00:17:34,000
And so it's a much more complicated story, particularly when rights get involved, the goods rights action are going to go through, you know, the packsters or raft group.

156
00:17:34,000 --> 00:17:38,000
The read only of the lock tables actually not replicated.

157
00:17:38,000 --> 00:17:44,000
And it is your story at the leader of the packsters group.

158
00:17:44,000 --> 00:17:47,000
Either goes down during the transaction.

159
00:17:47,000 --> 00:17:56,000
Then you know, basically the transaction has to be restarted, which transaction will be rewarded because the walk information is lost.

160
00:17:56,000 --> 00:18:02,000
The reason that these walk table is not.

161
00:18:02,000 --> 00:18:06,000
Is not the replicate this is make read operations facts.

162
00:18:06,000 --> 00:18:17,000
Okay, so once you know the client actually has gotten the value of an extra Y and that's taken out the locks, you know, and sort of two phase locking style.

163
00:18:17,000 --> 00:18:19,000
The.

164
00:18:19,000 --> 00:18:24,000
Yeah, it's going to subtract one from X, you know, at one, you know, to Y.

165
00:18:24,000 --> 00:18:27,000
And then basically going to submit the transaction.

166
00:18:27,000 --> 00:18:33,000
So we all the rights are done locally at the client again, so this is the Gmail server.

167
00:18:33,000 --> 00:18:41,000
And one, everything is one of the clients done with transaction, it's a mid transaction to.

168
00:18:41,000 --> 00:18:43,000
To spend it.

169
00:18:43,000 --> 00:18:49,000
And it's a midsits to a transaction coordinator.

170
00:18:49,000 --> 00:18:52,000
So some, you know, sort of servers.

171
00:18:52,000 --> 00:18:56,000
Or some machine is the pick as the transaction coordinator.

172
00:18:56,000 --> 00:18:59,000
And again, the transaction coordinator is a packsters group.

173
00:18:59,000 --> 00:19:04,000
So it's multiple peers in different data centers.

174
00:19:04,000 --> 00:19:09,000
And one reason we want this to be a packsters group is so that.

175
00:19:09,000 --> 00:19:18,000
As we've seen before in two phase protocol over the two phase commit that if the coordinator fails, it might actually block.

176
00:19:18,000 --> 00:19:24,000
And then the participants, right, like if the participants have to prepare and agreed to go along with the transaction.

177
00:19:24,000 --> 00:19:30,000
But then the coordinator fails, no, there's participants have to hold on to their locks and have to wait until the.

178
00:19:30,000 --> 00:19:36,000
According to comes back by replicating the coordinator using paxas, you know, we make the.

179
00:19:36,000 --> 00:19:44,000
Coordinator highly available and so basically, sort of avoid that particular sort of disaster scenario.

180
00:19:44,000 --> 00:19:50,000
So the transaction coordinator is then basically in charge of running the two phase commit protocol.

181
00:19:50,000 --> 00:19:56,000
And so it will send, you know, the updates for X and Y to.

182
00:19:56,000 --> 00:20:02,000
The leader of char day, X and Y to the leader of sharp.

183
00:20:02,000 --> 00:20:13,000
The day, you know, grab the logs, you know, in this case, you know, the already hold the locks where promote the locks to read right locks.

184
00:20:13,000 --> 00:20:24,000
So basically prepare, you know, there's a section so they don't really execute it yet, but just make the, you know, typically using right ahead logging, you know, prepare to changes.

185
00:20:24,000 --> 00:20:36,000
And if everything is okay, then they, you know, basically commit to the transaction by entering sort of this prepared state.

186
00:20:36,000 --> 00:20:39,000
So sort of a big moment.

187
00:20:39,000 --> 00:20:45,000
Because of this point, the transaction is or the peers or the participants are committing to this transaction.

188
00:20:45,000 --> 00:20:56,000
And we know from last lecture, you know, the participants do actually have to record some state so that if they fail and they come back up, they can recover and pick up from where they left off.

189
00:20:56,000 --> 00:21:05,000
So at the prepared state, basically, this results into a paxas right.

190
00:21:05,000 --> 00:21:08,000
And then we're starting the state of the transaction.

191
00:21:08,000 --> 00:21:13,000
And the two PC state.

192
00:21:13,000 --> 00:21:17,000
The locks that the.

193
00:21:17,000 --> 00:21:34,000
You know, participants holding, etc, etc. And so this pectures right, you know, so the leader of this different chart is when there's a push at actors right across the different peers in the group to ensure that that state is replicated in fault talent.

194
00:21:34,000 --> 00:21:46,000
And so once you know the participants have, you know, prepared and agreed to prepare, then, you know, they send back, okay, you know, okay.

195
00:21:46,000 --> 00:21:50,000
This is very similar to our two days at vertical that we talked before.

196
00:21:50,000 --> 00:21:55,000
And at this point, you know, the coordinator can commit.

197
00:21:55,000 --> 00:22:05,000
And of course, at the point of the commit, the coordinator needs to record that actually make the commit decision, because you know, participants may come back later and want to know and find out about it.

198
00:22:05,000 --> 00:22:07,000
And we might have failures.

199
00:22:07,000 --> 00:22:19,000
So again, the paxas state with a PC to two phase commit state is written to using paxas and replicated using paxas.

200
00:22:19,000 --> 00:22:27,000
And for this, you know, whole presentation, you can just think about paxas being complete substitute or equivalent to raft.

201
00:22:27,000 --> 00:22:38,000
You know, spend or predates raft, but like, you know, for it, for sexually and, you know, through first order, you know, for this paper, basically the same.

202
00:22:38,000 --> 00:22:43,000
So this point that transaction commits and this, you know, is really the commit point.

203
00:22:43,000 --> 00:22:55,000
Once the transaction coordinator has written down that the transaction is committed, that is the absolute commit point and then in forums, you know, participants, you know, that.

204
00:22:55,000 --> 00:22:59,000
This has happened.

205
00:22:59,000 --> 00:23:06,000
And you know, they can respond back to you if okay, great transaction is committed and transaction coordinator can clean up its state.

206
00:23:06,000 --> 00:23:11,000
And at some point later, the charts can also clean up their state.

207
00:23:11,000 --> 00:23:26,000
And at the point of commit, the participants release release their walks.

208
00:23:26,000 --> 00:23:34,000
Okay, so that is sort of the basic story for rewriting transactions and so any questions about this.

209
00:23:34,000 --> 00:23:51,000
And I think the simple way to think about it is this is two phase commit to face locking with the main difference between what we talked about last week and this week is that the participant, the transaction coordinator, the participants are all a paxas group.

210
00:23:51,000 --> 00:23:54,000
So they're replicated, they're highly available.

211
00:23:54,000 --> 00:24:05,000
And some of the problems that we talked about the two phase commit last time are less relevant here because the participants are much more highly available.

212
00:24:05,000 --> 00:24:11,000
So the each chart is replicating the lock table or no.

213
00:24:11,000 --> 00:24:18,000
Well, it's not leveraging the lock table. It's replicating the lock that's holding when it does to prepare.

214
00:24:18,000 --> 00:24:21,000
And it's that it's holding during the.

215
00:24:21,000 --> 00:24:27,000
The state that it needs to do the two phase commit.

216
00:24:27,000 --> 00:24:37,000
So then the like the current locks for some transaction that hasn't reached the prepared stage, it will they just be lost.

217
00:24:37,000 --> 00:24:42,000
Then we lost and then the transaction will abort the participant would just not participate.

218
00:24:42,000 --> 00:24:47,000
Until the coordinator, hey, I lost my locks to that can do it.

219
00:24:47,000 --> 00:24:50,000
Thank you.

220
00:24:50,000 --> 00:24:56,000
Okay, so now the rest of these like this lecture is about to read only transactions.

221
00:24:56,000 --> 00:25:04,000
And.

222
00:25:04,000 --> 00:25:10,000
So these two transactions that they're only do reads no rest.

223
00:25:10,000 --> 00:25:20,000
And then they're going to make a very fast.

224
00:25:20,000 --> 00:25:28,000
And the way they're going to the way they achieve the high performance is the range that the reads.

225
00:25:28,000 --> 00:25:38,000
And the ones that goes reads are only from local charts.

226
00:25:38,000 --> 00:25:43,000
And they have no locks.

227
00:25:43,000 --> 00:25:53,000
And no locks is good because that means that read right transactions can block and read transactions were another way of saying is that read only transaction can block read right transactions.

228
00:25:53,000 --> 00:25:57,000
And no, no, through phase commit.

229
00:25:57,000 --> 00:26:01,000
And so that means also no wide area communication necessary.

230
00:26:01,000 --> 00:26:06,000
And so that the reads can definitely execute from a local replica.

231
00:26:06,000 --> 00:26:11,000
And you know, as you see, of course, you know, this is the read from a local charts.

232
00:26:11,000 --> 00:26:16,000
The real challenge here is like how to still get the system.

233
00:26:16,000 --> 00:26:19,000
For where you know, signalized ability.

234
00:26:19,000 --> 00:26:24,000
And according to point out, like, you know, but for no moment to, you know, assume that we know how to do this.

235
00:26:24,000 --> 00:26:29,000
But we could then really from only like local charts.

236
00:26:29,000 --> 00:26:37,000
How holding no locks not doing two case commit means that like all the communication is local within that, within that particular data center.

237
00:26:37,000 --> 00:26:46,000
And it can be very fast. And if you look at the end in tables, free and six in the paper.

238
00:26:46,000 --> 00:26:52,000
And as we see that they basically read only transactions.

239
00:26:52,000 --> 00:26:57,000
Are 10 times faster than read right transactions.

240
00:26:57,000 --> 00:27:01,000
Read right transactions are in order of hundreds of milliseconds, which sort of makes sense.

241
00:27:01,000 --> 00:27:05,000
Because they have to communicate long distance.

242
00:27:05,000 --> 00:27:13,000
And but the read only transactions are in the order of five to 10 milliseconds.

243
00:27:13,000 --> 00:27:21,000
Okay, so the key challenge, of course, is always going to be with execute of a local replica, how to get correctness.

244
00:27:21,000 --> 00:27:27,000
So let me talk a little bit about it because it's slightly different than what we see before.

245
00:27:27,000 --> 00:27:33,000
So correctness means two things here. One, you know, the transactions are serializable.

246
00:27:33,000 --> 00:27:40,000
So they must execute in some serial order. So we think about it like we have a read right transaction.

247
00:27:40,000 --> 00:27:44,000
And we have another read right transaction. And we have a read only transaction.

248
00:27:44,000 --> 00:27:49,000
No, the read only transaction has to sort of fit between the two read right transactions.

249
00:27:49,000 --> 00:27:55,000
And read only transaction should not observe some part of the read right transactions.

250
00:27:55,000 --> 00:27:59,000
So the read right transaction does multiple rights like the first one.

251
00:27:59,000 --> 00:28:03,000
Then the read only transaction, you know, see all those rights are none of them.

252
00:28:03,000 --> 00:28:06,000
And similarly for the one that actually is that asset.

253
00:28:06,000 --> 00:28:12,000
Okay, so the second. So this is a standard thing that we talked about last week's serializability.

254
00:28:12,000 --> 00:28:25,000
And then when they go for something stronger, and what they call external consistency.

255
00:28:25,000 --> 00:28:30,000
And external consistency means that if a transaction.

256
00:28:30,000 --> 00:28:36,000
Two starts after transaction one has committed.

257
00:28:36,000 --> 00:28:42,000
Then you know, T two must see.

258
00:28:42,000 --> 00:28:48,000
T ones rights.

259
00:28:48,000 --> 00:28:53,000
So like we'll go back to the previous picture like sort of his read only transaction.

260
00:28:53,000 --> 00:28:58,000
So the one started after read the first transaction committed.

261
00:28:58,000 --> 00:29:06,000
Then there's read only transaction must see the read to the rights of that transaction T one.

262
00:29:06,000 --> 00:29:09,000
And, and so the idea.

263
00:29:09,000 --> 00:29:15,000
If you think about this, basically this sort of external consistency means like serializability.

264
00:29:15,000 --> 00:29:17,000
Plus this real time requirement.

265
00:29:17,000 --> 00:29:30,000
And so you know, it is very similar to linearizability.

266
00:29:30,000 --> 00:29:42,000
And except, you know, the one way to contrast external consistency for transactions with linearizability is that external consistency is really transaction left of property.

267
00:29:42,000 --> 00:29:51,000
And then you've been talking about linearizability so far and always has been sort of individual reach and rights.

268
00:29:51,000 --> 00:29:56,000
And to say first order, you know, I think you can sort of think about them exactly in the same way.

269
00:29:56,000 --> 00:30:01,000
And like linearizability, you know external assistant users pleasant for programs.

270
00:30:01,000 --> 00:30:07,000
And, and there's a very strong consistent here, a property.

271
00:30:07,000 --> 00:30:11,680
about the correctness definition there or the correctness goal that the span

272
00:30:11,680 --> 00:30:14,000
are has.

273
00:30:17,440 --> 00:30:22,400
Okay, okay, let's then talk about how the actually achieve this correctness for read

274
00:30:22,400 --> 00:30:27,400
only transactions. And let me start out by explaining a bad plan that actually

275
00:30:27,400 --> 00:30:34,440
doesn't work and then we'll go and talk about a better plan. So the bad plan is

276
00:30:34,440 --> 00:30:41,880
we're going to read the range that we read always the latest committed values.

277
00:30:43,360 --> 00:30:46,519
That seems about the right.

278
00:30:46,519 --> 00:30:51,799
Because we're going to have to range that if T2 starts after T1 committed, we

279
00:30:51,799 --> 00:30:54,759
receive and you have to see it's right. So you know why not read the latest

280
00:30:54,759 --> 00:31:00,720
committed value and then we should be maybe we were good. So here is the problem

281
00:31:00,720 --> 00:31:06,480
case of course, you know, it doesn't actually work. So T1, they may T1 does the

282
00:31:06,480 --> 00:31:16,000
right of X, this rate of Y, the transfer commits, then you know, we have another

283
00:31:16,000 --> 00:31:20,640
T transaction, we have this transaction T3 where T3 is the read only action. It

284
00:31:20,640 --> 00:31:26,720
actually does a read of X. And so this is sort of real time. And then after T2,

285
00:31:27,440 --> 00:31:34,240
then after T1 or T3 starts T2 runs, it runs quickly and addresses the right of X,

286
00:31:34,240 --> 00:31:38,720
the right of Y, commits, and then T3 you've got a little bit delayed and then

287
00:31:38,720 --> 00:31:40,960
actually does a second out of read to your read of Y.

288
00:31:43,519 --> 00:31:46,319
That's a sort of time, you know, usual going that way.

289
00:31:46,319 --> 00:31:52,480
And you know, when you're following the

290
00:31:54,319 --> 00:31:58,480
read leads the latest committed value, then you know, what is this read going to return?

291
00:31:58,480 --> 00:32:04,480
It's going to return the value from this transaction P1. And this read is going to return

292
00:32:05,279 --> 00:32:09,119
the value from Y from that transaction because you know, that's the line is a committed value.

293
00:32:10,000 --> 00:32:11,519
And that would be wrong, right?

294
00:32:16,639 --> 00:32:22,399
Because now we're actually in the situation where basically, you know, T3s,

295
00:32:22,399 --> 00:32:27,599
objures, the rights, you know, from different transactions and not get a consistent picture.

296
00:32:29,599 --> 00:32:38,079
So, so this rule is not good enough and to avoid this problem and not, you know, use this

297
00:32:38,079 --> 00:32:45,279
bad plan, Spanner uses a different plan. And that's plan is called snapshot isolation.

298
00:32:46,559 --> 00:32:57,839
And this actually just standard database idea and

299
00:32:59,759 --> 00:33:04,720
mostly sort of in the local databases and not actually across the white area.

300
00:33:05,759 --> 00:33:10,799
And so we'll talk about that in the sort of the white area aspect in a second,

301
00:33:10,799 --> 00:33:15,839
but just let me first explain what snapshot isolation is. And so what snapshot isolation does

302
00:33:15,839 --> 00:33:23,599
is we're going to sign a timestamp to a transaction.

303
00:33:26,959 --> 00:33:29,679
And you know, there's two different points where we're going to sign these

304
00:33:31,839 --> 00:33:37,759
timestamps. For read write transactions, it's going to be, you know, the commit, start of the commit.

305
00:33:37,759 --> 00:33:45,839
And for read only transactions, it's just going to be the start of the transactions.

306
00:33:48,879 --> 00:33:54,079
And then we're going to execute all operations,

307
00:33:55,839 --> 00:33:58,720
of the transaction in timestamp order.

308
00:33:58,720 --> 00:34:07,759
I'll explain in a second what I mean of that. And be able to execute all the operations

309
00:34:07,759 --> 00:34:14,000
in timestamp order. You know, each replica, this is stored one value for a particular key.

310
00:34:15,199 --> 00:34:20,880
But it's replica that stores multiple values for a key, namely, with their timestamp.

311
00:34:29,679 --> 00:34:40,000
So for example, at a particular replica, we can ask, you know, please give me the value of x at time 10,

312
00:34:40,000 --> 00:34:48,719
or give me the value of timestamp in x at 20. And so sometimes this is called multi-version databases,

313
00:34:48,719 --> 00:34:55,279
or multi-version storage. You know, for every update, you basically keep a version of the data items that you

314
00:34:55,280 --> 00:35:03,280
can go back in time. And so this fixes, you know, the problem that I sort of showed on the first case,

315
00:35:03,280 --> 00:35:08,000
because basically what's going to happen, let's look at the fruit transaction again. So we got T1,

316
00:35:08,000 --> 00:35:18,880
we got T2, we got T3, T1 is right of one, you know, there's a right of x, right of y, there's commit.

317
00:35:19,440 --> 00:35:25,840
And let's say the commit actually happens at, you know, 10. So this transaction basically

318
00:35:25,840 --> 00:35:33,920
runs at time 10. Then, you know, at some point, we're going to get our read of x, we'll talk about that

319
00:35:33,920 --> 00:35:41,280
in a second. And in here, we have this other transaction, we get the right of y, the right of

320
00:35:41,280 --> 00:35:48,560
x, right of y, the commit, let's say this transaction permits at time 10. 20. So this run basically

321
00:35:52,160 --> 00:35:57,440
at that time stem. And then we have the read of x, and we have the read of y. Now, when the read of x

322
00:35:57,440 --> 00:36:01,600
happens, it's going to be assigned to timestamp, you know, at the starting time, at the time of

323
00:36:01,600 --> 00:36:06,960
the transaction. So the starting time, let's say that the starting time of this transaction is 15.

324
00:36:07,760 --> 00:36:18,159
So T2 runs at 15. And so when the read of x is executed, it needs basically to read the latest

325
00:36:18,159 --> 00:36:29,199
value of x after, you know, before 15. And, you know, the read of that, you know, the latest committed

326
00:36:29,199 --> 00:36:36,960
value for timestamp 15, before timestamp 15 is going to be the times the values from this

327
00:36:36,960 --> 00:36:43,839
transaction. So read x, you know, reads the value of transaction one. But of course, read y also will

328
00:36:43,839 --> 00:36:49,119
execute at the timestamp of the start of the transaction. So it's going to be also read y at the time

329
00:36:49,119 --> 00:36:55,759
of 15. And, you know, there's going to be only one value for that y, y, 15, namely that is the one

330
00:36:55,760 --> 00:37:04,000
produced by the transaction T1. And so read one, the read y will also read from T1. And so we

331
00:37:04,000 --> 00:37:09,520
avoid, you know, this problem that we had before, where we're reading from the different transactions.

332
00:37:10,560 --> 00:37:15,600
And so this gives us the linearized ability or the signalized ability that we're looking for.

333
00:37:15,600 --> 00:37:19,040
You can all the transactions are executed in a global timestamp order.

334
00:37:22,640 --> 00:37:23,360
Does that make sense?

335
00:37:25,760 --> 00:37:33,120
So what you can think about is that every replica basically keeps a table right of values and timestamps.

336
00:37:33,120 --> 00:37:44,000
And so we're going to have like x at, you know, value nine at 10 and x at, you know, value eight at 20.

337
00:37:45,280 --> 00:37:49,360
And so when the read comes in, you know, at a particular replica, you know, the read for 15 comes in,

338
00:37:49,360 --> 00:37:54,080
I could just pick out, you know, the latest right, you know, preceding its timestamp.

339
00:37:56,560 --> 00:38:01,520
And so I have a question. So when we do the read x, let's say, so let's just focus on read x.

340
00:38:02,160 --> 00:38:08,640
So x itself exists on some shard, which is replicated on a taxes group, which let's say,

341
00:38:09,360 --> 00:38:13,680
you know, like there are like three servers that replicate x. And when you read from x,

342
00:38:13,680 --> 00:38:19,040
because we want the read only transactions to be very fast, we just read from the local replica,

343
00:38:19,040 --> 00:38:24,720
which is not necessarily be the leader. So like, how do we guarantee that we don't read the stale?

344
00:38:25,359 --> 00:38:27,359
That's how do we, that we don't make a stale read.

345
00:38:28,159 --> 00:38:33,439
You know, brilliant question. And that's exactly the topic I want to talk about next.

346
00:38:35,599 --> 00:38:40,239
Great, that's the problem is, you know, as you point out, you know, there's a challenge that maybe the

347
00:38:40,239 --> 00:38:52,559
replica hasn't seen. Hasn't seen the right to x at timestamp, whatever 10. Right.

348
00:38:52,559 --> 00:39:02,239
And so the way, you know, this problem solved in the in spanner and disillusion they call something

349
00:39:02,239 --> 00:39:13,759
that's called safe time. And so the way this is resolved is that they actually taxes

350
00:39:13,920 --> 00:39:21,440
or raft, you know, sends all rights also in timestamp order.

351
00:39:25,280 --> 00:39:30,000
So there's not a, you know, you can think about like the total order is not a counter.

352
00:39:30,000 --> 00:39:37,600
That's a usual example of done maybe in lap, lap three, but it actually is literally a timestamp.

353
00:39:37,600 --> 00:39:42,080
And since the time sends also form global order, that global order of timestamps,

354
00:39:42,079 --> 00:39:48,639
you know, sufficient sort of order all the rights. And then there's a rule, there's an additional rule for a read.

355
00:39:50,000 --> 00:40:01,840
Before you can do a read, so before read of x, that, you know, timestamp 15, the replica has to wait

356
00:40:04,639 --> 00:40:09,920
for a right that is with timestamps big enough 15.

357
00:40:09,920 --> 00:40:16,800
Because it is a season right with a timestamp big enough 15, it knows that there's certainly no rights anymore.

358
00:40:16,800 --> 00:40:22,639
Be sure 15. And so therefore it's safe to execute the read at timestamp 15.

359
00:40:22,639 --> 00:40:29,519
And know what value actually needs to be returned. And so for services that are, so this means that

360
00:40:29,519 --> 00:40:34,000
the read actually may have to get a delay a little bit until the next right. Now of course for busy services,

361
00:40:34,000 --> 00:40:39,280
you know, these rights will come along all the time. And so the way is probably a non-existence or almost

362
00:40:39,280 --> 00:40:45,360
non-existence. Okay. But this is the rule that needs to be followed to make sure that indeed this problem

363
00:40:46,080 --> 00:40:51,040
of replica actually have not seen the right yet, returning the wrong value.

364
00:40:52,240 --> 00:40:59,280
The rule is slightly more complicated. You also have to wait, also wait for injections that have

365
00:40:59,280 --> 00:41:00,480
prepared but not committed.

366
00:41:09,280 --> 00:41:24,160
For example, there's actually might have been prepared basically at, you know, say timestamp 14.

367
00:41:24,880 --> 00:41:31,440
But it hasn't maybe committed it right yet to the key value store. And so we got to make sure that,

368
00:41:31,440 --> 00:41:37,680
you know, any transaction that was prepared before our read timestamp that actually

369
00:41:37,679 --> 00:41:41,359
commits before we actually turn the value of the read. Okay.

370
00:41:44,000 --> 00:41:44,719
Does this make sense?

371
00:41:46,879 --> 00:41:52,399
With this also be the case for different shards. We're doing consider different shards.

372
00:41:52,399 --> 00:41:53,679
Just step replay.

373
00:41:55,839 --> 00:41:58,719
Uh, the reads just hit a local shard.

374
00:42:01,679 --> 00:42:03,119
Right. The local replica.

375
00:42:03,599 --> 00:42:07,440
And so I'm not telling the passenger what the question is.

376
00:42:08,000 --> 00:42:15,440
I think the question I'm asking is the correctness guarantees do they apply across shards?

377
00:42:16,880 --> 00:42:22,880
Yes, you know, they apply the level of transactions, right? So, uh, so if a read only reads a local

378
00:42:22,880 --> 00:42:27,199
replica, we still have to make sure that the transactions are externally consistent.

379
00:42:27,839 --> 00:42:30,239
And by following these rules, we achieve that goal.

380
00:42:32,000 --> 00:42:33,519
Okay. Makes sense. Thank you.

381
00:42:37,199 --> 00:42:44,960
Okay. Now, you know, we're sort of getting to sort of the, the core part of the

382
00:42:45,519 --> 00:42:49,839
spanner paper, which is really, you know, to be, we want to reason about time, like timestamps.

383
00:42:50,720 --> 00:42:56,240
In this case, then, you know, the clocks, you know, the, uh, different servers

384
00:42:58,160 --> 00:43:02,720
must be, uh, the clocks must be good. It must be perfect. You know, people must,

385
00:43:02,720 --> 00:43:07,360
kind of different participants must agree on the timestamp order. And uh,

386
00:43:07,360 --> 00:43:11,680
even transaction takes a particular timestamp, you know, that timestamp must be the sort of same

387
00:43:11,680 --> 00:43:18,400
timestamp everywhere in the system. Uh, so, uh, and so the way I've described it in this previous,

388
00:43:19,840 --> 00:43:24,000
uh, slide slide is the, you know, whatever from participant data picks the, the

389
00:43:24,000 --> 00:43:29,200
reach injection, assigns a timestamp to it, like 15, which I may go back a little bit,

390
00:43:29,200 --> 00:43:33,600
you know, year, you know, we're just assigning, uh, timestamps to these injections.

391
00:43:33,600 --> 00:43:38,400
And at better be case, that actually T1 and T2 and T3 agree on these timestamps,

392
00:43:39,680 --> 00:43:47,600
uh, and that they're comparable. And so, as we'll see, uh, in, in, in the, in the second, uh,

393
00:43:47,679 --> 00:43:50,400
it just, it just, it only matters really for read-only transactions.

394
00:44:05,279 --> 00:44:09,839
Uh, and we didn't, you know, consider sort of the two cases. Like, so what, what happens,

395
00:44:09,839 --> 00:44:13,599
you know, so the question that we want to ask is, what happens is like one replica or like one

396
00:44:13,599 --> 00:44:18,960
server, it just has the wrong time, right? And so it doesn't agree with the time at the other

397
00:44:18,960 --> 00:44:24,319
servers. And, uh, now, what, what kind of problems could it introduce? So let's first think about the

398
00:44:24,319 --> 00:44:36,719
case, what the timestamp is to the arch. So, for example, you know, let's go back to our, uh,

399
00:44:36,719 --> 00:44:43,199
where's the gear with this case. So let's say the, uh, read-only transactions start reading,

400
00:44:43,199 --> 00:44:50,639
and it reads actually, uh, instead of, um, uh, you know, 15, maybe whatever the value of returns

401
00:44:50,639 --> 00:45:01,279
actually is, uh, 25. And what would I do? Or let me give a little simpler, you know, 18,

402
00:45:04,239 --> 00:45:08,879
to get less confusion. You know, what would, what is the outcome of actually having a time stamp

403
00:45:09,440 --> 00:45:12,240
is off, but off in the direction of being too large.

404
00:45:15,760 --> 00:45:21,440
It's still less than 25, doesn't it still read for the, than 20? Doesn't it still read from the,

405
00:45:22,400 --> 00:45:26,559
first one? But if it's later, it'll read from the, the second one. Yeah, and which,

406
00:45:26,559 --> 00:45:32,160
either one is fine, correct? The real key issue here is that, uh, you know, before reading,

407
00:45:32,160 --> 00:45:37,119
remember, you have to wait until you see your right, right? So if you're, so what happens if

408
00:45:37,119 --> 00:45:44,400
your time stamp is too large, off on the too large side? You have to wait for an index.

409
00:45:44,400 --> 00:45:49,599
Yeah, yeah, exactly. You have to wait, right? A little bit longer, maybe. But nothing goes wrong.

410
00:45:54,960 --> 00:46:00,480
And so now the other question, uh, is what if the, if the time stamp is too small?

411
00:46:01,119 --> 00:46:09,440
So for example, the read, uh, when the T3, the machine that actually goes T3, you know, I asked for

412
00:46:09,440 --> 00:46:14,960
the time, uh, instead of time 10, that actually gets back, you know, say nine. And this is

413
00:46:14,960 --> 00:46:24,159
a variation of the lecture question. So basically like T3, run it say nine. And maybe this is a good

414
00:46:24,159 --> 00:46:30,079
time for actually, so to take a breakout room and you can think and argue what, man, what is the outcome?

415
00:46:30,480 --> 00:46:36,400
What does the potential outcomes, you know, or what could go wrong if actually the time stamp that

416
00:46:36,400 --> 00:46:45,360
got assigned to T3 is nine instead of 10. So maybe we can do a breakout here. Literally,

417
00:46:45,360 --> 00:46:50,960
we're done with the possible. I think we'll have to use that. So

418
00:46:51,280 --> 00:46:52,920
long as I can hear.

419
00:46:57,599 --> 00:46:59,840
Hold on a second here.

420
00:47:03,599 --> 00:47:05,360
Thank you.

421
00:47:05,360 --> 00:47:19,360
Okay, here's some books.

422
00:47:19,360 --> 00:47:23,360
Anybody else get any books?

423
00:49:35,360 --> 00:50:03,360
Okay.

424
00:50:03,360 --> 00:50:21,360
Okay.

425
00:50:33,360 --> 00:50:39,360
Okay.

426
00:51:03,360 --> 00:51:23,360
Okay.

427
00:51:33,360 --> 00:51:53,360
Okay.

428
00:51:53,360 --> 00:52:03,360
Okay.

429
00:52:23,360 --> 00:52:43,360
Okay.

430
00:52:43,360 --> 00:52:59,360
Okay.

431
00:53:13,360 --> 00:53:41,360
Okay.

432
00:53:41,360 --> 00:53:59,360
Okay.

433
00:53:59,360 --> 00:54:09,360
Okay.

434
00:54:09,360 --> 00:54:27,360
Okay.

435
00:54:27,360 --> 00:54:45,360
Okay.

436
00:54:45,360 --> 00:55:03,360
Okay.

437
00:55:03,360 --> 00:55:21,360
Okay.

438
00:55:21,360 --> 00:55:39,360
Okay.

439
00:55:39,360 --> 00:55:57,360
Okay.

440
00:55:57,360 --> 00:56:15,360
Okay.

441
00:56:15,360 --> 00:56:33,360
Okay.

442
00:56:33,360 --> 00:56:51,360
Okay.

443
00:56:51,360 --> 00:57:09,360
Okay.

444
00:57:09,360 --> 00:57:27,360
Okay.

445
00:57:27,360 --> 00:57:45,360
Okay.

446
00:57:45,360 --> 00:58:03,360
Okay.

447
00:58:03,360 --> 00:58:21,360
Okay.

448
00:58:21,360 --> 00:58:39,360
Okay.

449
00:58:39,360 --> 00:59:03,360
Okay.

450
00:59:03,360 --> 00:59:21,360
Okay.

451
00:59:21,360 --> 00:59:39,360
Okay.

452
00:59:39,360 --> 00:59:57,360
Okay.

453
00:59:57,360 --> 01:00:15,360
Okay.

454
01:00:15,360 --> 01:00:33,360
Okay.

455
01:00:33,360 --> 01:00:51,360
Okay.

456
01:00:51,360 --> 01:01:09,360
Okay.

457
01:01:09,360 --> 01:01:27,360
Okay.

458
01:01:27,360 --> 01:01:45,360
Okay.

459
01:01:45,360 --> 01:02:03,360
Okay.

460
01:02:03,360 --> 01:02:21,360
Okay.

461
01:02:21,360 --> 01:02:39,360
Okay.

462
01:02:39,360 --> 01:02:57,360
Okay.

463
01:02:57,360 --> 01:03:15,360
Okay.

464
01:03:15,360 --> 01:03:33,360
Okay.

465
01:03:33,360 --> 01:03:51,360
Okay.

466
01:03:51,360 --> 01:04:09,360
Okay.

467
01:04:09,360 --> 01:04:27,360
Okay.

468
01:04:27,360 --> 01:04:45,360
Okay.

469
01:04:45,360 --> 01:05:03,360
Okay.

470
01:05:03,360 --> 01:05:21,360
Okay.

471
01:05:21,360 --> 01:05:39,360
Okay.

472
01:05:39,360 --> 01:05:57,360
Okay.

473
01:05:57,360 --> 01:06:15,360
Okay.

474
01:06:15,360 --> 01:06:33,360
Okay.

475
01:06:33,360 --> 01:06:51,360
Okay.

476
01:06:51,360 --> 01:07:09,360
Okay.

477
01:07:09,360 --> 01:07:27,360
Okay.

478
01:07:27,360 --> 01:07:45,360
Okay.

479
01:07:45,360 --> 01:08:03,360
Okay.

480
01:08:03,360 --> 01:08:21,360
Okay.

481
01:08:21,359 --> 01:08:39,359
Okay.

482
01:08:39,359 --> 01:08:57,359
Okay.

483
01:08:57,359 --> 01:09:15,359
Okay.

484
01:09:15,359 --> 01:09:33,359
Okay.

485
01:09:33,359 --> 01:09:51,359
Okay.

486
01:09:51,359 --> 01:10:09,359
Okay.

487
01:10:09,359 --> 01:10:27,359
Okay.

488
01:10:27,359 --> 01:10:49,359
Okay.

489
01:10:49,359 --> 01:11:07,359
Okay.

490
01:11:07,359 --> 01:11:25,359
Okay.

491
01:11:25,359 --> 01:11:43,359
Okay.

492
01:11:43,359 --> 01:12:01,359
Okay.

493
01:12:01,359 --> 01:12:19,359
Okay.

494
01:12:19,359 --> 01:12:37,359
Okay.

495
01:12:37,359 --> 01:12:55,359
Okay.

496
01:12:55,359 --> 01:13:13,359
Okay.

497
01:13:13,359 --> 01:13:31,359
Okay.

498
01:13:31,359 --> 01:13:49,359
Okay.

499
01:13:49,359 --> 01:14:07,359
Okay.

500
01:14:07,359 --> 01:14:25,359
Okay.

501
01:14:25,359 --> 01:14:43,359
Okay.

502
01:14:43,359 --> 01:15:01,359
Okay.

503
01:15:01,359 --> 01:15:19,359
Okay.

504
01:15:19,359 --> 01:15:37,359
Okay.

505
01:15:37,359 --> 01:15:55,359
Okay.

506
01:15:55,359 --> 01:16:13,359
Okay.

507
01:16:13,359 --> 01:16:31,359
Okay.

508
01:16:31,359 --> 01:16:49,359
Okay.

509
01:16:49,359 --> 01:17:07,359
Okay.

510
01:17:07,359 --> 01:17:25,359
Okay.

511
01:17:25,359 --> 01:17:43,359
Okay.

512
01:17:43,359 --> 01:18:01,359
Okay.

513
01:18:01,359 --> 01:18:19,359
Okay.

514
01:18:19,359 --> 01:18:37,359
Okay.

515
01:18:37,359 --> 01:18:55,359
Okay.

516
01:18:55,359 --> 01:19:13,359
Okay.

517
01:19:13,359 --> 01:19:23,359
Okay.

518
01:19:23,359 --> 01:19:41,359
Okay.

519
01:19:41,359 --> 01:19:59,359
Okay.

520
01:19:59,359 --> 01:20:17,359
Okay.

521
01:20:17,359 --> 01:20:35,359
Okay.

522
01:20:35,359 --> 01:20:53,359
Okay.

523
01:20:53,359 --> 01:21:11,359
Okay.

524
01:21:11,359 --> 01:21:29,359
Okay.

525
01:21:29,359 --> 01:21:47,359
Okay.

526
01:21:47,359 --> 01:22:05,359
Okay.

527
01:22:05,359 --> 01:22:23,359
Okay.

528
01:22:23,359 --> 01:22:41,359
Okay.

529
01:22:41,359 --> 01:22:59,359
Okay.

530
01:22:59,359 --> 01:23:17,359
Okay.

531
01:23:17,359 --> 01:23:35,359
Okay.

532
01:23:35,359 --> 01:23:53,359
Okay.

533
01:23:53,359 --> 01:24:11,359
Okay.

534
01:24:11,359 --> 01:24:29,359
Okay.

535
01:24:29,359 --> 01:24:47,359
Okay.

536
01:24:47,359 --> 01:25:05,359
Okay.

537
01:25:05,359 --> 01:25:23,359
Okay.

538
01:25:23,359 --> 01:25:41,359
Okay.

539
01:25:41,359 --> 01:25:59,359
Okay.

540
01:25:59,359 --> 01:26:17,359
Okay.

541
01:26:17,359 --> 01:26:35,359
Okay.

542
01:26:35,359 --> 01:26:53,359
Okay.

543
01:26:53,359 --> 01:27:11,359
Okay.

544
01:27:11,359 --> 01:27:29,359
Okay.

545
01:27:29,359 --> 01:27:47,359
Okay.

546
01:27:47,359 --> 01:28:05,359
Okay.

547
01:28:05,359 --> 01:28:23,359
Okay.

548
01:28:23,359 --> 01:28:41,359
Okay.

549
01:28:41,359 --> 01:28:59,359
Okay.

550
01:28:59,359 --> 01:29:17,359
Okay.

551
01:29:17,359 --> 01:29:35,359
Okay.

552
01:29:35,359 --> 01:29:53,359
Okay.

553
01:29:53,359 --> 01:30:11,359
Okay.

554
01:30:11,359 --> 01:30:29,359
Okay.

555
01:30:29,359 --> 01:30:47,359
Okay.

556
01:30:47,359 --> 01:31:05,359
Okay.

557
01:31:05,359 --> 01:31:23,359
Okay.

558
01:31:23,359 --> 01:31:41,359
Okay.

559
01:31:41,359 --> 01:31:59,359
Okay.

560
01:31:59,359 --> 01:32:17,359
Okay.

561
01:32:17,359 --> 01:32:35,359
Okay.

562
01:32:35,359 --> 01:32:53,359
Okay.

563
01:32:53,359 --> 01:33:11,359
Okay.

564
01:33:11,359 --> 01:33:29,359
Okay.

565
01:33:29,359 --> 01:33:47,359
Okay.

566
01:33:47,359 --> 01:34:05,359
Okay.

567
01:34:05,359 --> 01:34:23,359
Okay.

568
01:34:23,359 --> 01:34:41,359
Okay.

569
01:34:41,359 --> 01:34:59,359
Okay.

570
01:34:59,359 --> 01:35:17,359
Okay.

571
01:35:17,359 --> 01:35:35,359
Okay.

572
01:35:35,359 --> 01:35:53,359
Okay.

573
01:35:53,359 --> 01:36:11,359
Okay.

574
01:36:11,359 --> 01:36:29,359
Okay.

575
01:36:29,359 --> 01:36:47,359
Okay.

576
01:36:47,359 --> 01:37:05,359
Okay.

577
01:37:05,359 --> 01:37:23,359
Okay.

