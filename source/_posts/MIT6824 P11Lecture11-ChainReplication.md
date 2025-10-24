---
title: MIT6824 P11Lecture11 ChainReplication
---

1
00:00:00,000 --> 00:00:02,000
Good evening, good night for every yard.

2
00:00:02,000 --> 00:00:04,000
Let's get started.

3
00:00:04,000 --> 00:00:09,000
So today I want to talk a little bit about the chain replication paper

4
00:00:09,000 --> 00:00:12,000
I signed for today from 2004.

5
00:00:12,000 --> 00:00:14,000
Before diving into the paper,

6
00:00:14,000 --> 00:00:17,000
a couple of quick logistic things.

7
00:00:17,000 --> 00:00:19,000
Just want to remind you of.

8
00:00:19,000 --> 00:00:24,000
One is we have a quiz on first day.

9
00:00:24,000 --> 00:00:28,000
And you know, the instructions of the topics that actually being covered

10
00:00:28,000 --> 00:00:30,000
are the quizzes are on the schedule page.

11
00:00:30,000 --> 00:00:35,000
We'll try to send out an announcement of the outside with more details about

12
00:00:35,000 --> 00:00:38,000
exactly how we'll do the quiz.

13
00:00:38,000 --> 00:00:41,000
It's going to be a great scope.

14
00:00:41,000 --> 00:00:46,000
And it's basically during class hours or any minutes.

15
00:00:46,000 --> 00:00:49,000
And more details to follow.

16
00:00:49,000 --> 00:00:55,000
The second thing I want to remind people of is projects.

17
00:00:56,000 --> 00:01:01,000
If you would like to do a project instead of lat 4.

18
00:01:01,000 --> 00:01:05,000
Then you can do so.

19
00:01:05,000 --> 00:01:10,000
But you submit a proposal for a project and just a couple paragraphs.

20
00:01:10,000 --> 00:01:12,000
To.

21
00:01:12,000 --> 00:01:15,000
Through to submission website so that we can give you feedback and sort of tell you

22
00:01:15,000 --> 00:01:20,000
whether this project actually appropriate for a final project in 8 to 4.

23
00:01:20,000 --> 00:01:22,000
If you're just planning to do lat 4,

24
00:01:22,000 --> 00:01:25,000
there's absolutely nothing you have to do at all.

25
00:01:25,000 --> 00:01:36,000
Any questions about these sort of two logistical points.

26
00:01:36,000 --> 00:01:37,000
Okay.

27
00:01:37,000 --> 00:01:42,000
Then let me move on to one other point that I wanted to bring up,

28
00:01:42,000 --> 00:01:45,000
which is the sort of a correction.

29
00:01:45,000 --> 00:01:48,000
From.

30
00:01:48,000 --> 00:01:53,000
I'm going to start with a lecture a little while ago.

31
00:01:53,000 --> 00:02:00,000
We walked through the go code for the raft implementation of two A and two B that I had.

32
00:02:00,000 --> 00:02:04,000
And we talked a little bit about the go defer statement.

33
00:02:04,000 --> 00:02:09,000
And I mentioned that you can actually have the defer statement inside of a basic walk.

34
00:02:09,000 --> 00:02:11,000
And that is correct.

35
00:02:11,000 --> 00:02:14,000
And I think of Miss maybe it was Philip who asked the question,

36
00:02:14,000 --> 00:02:18,000
and I think that they get executed and I answered that question incorrectly.

37
00:02:18,000 --> 00:02:22,000
The first statement gets executed at the point it gets you return out of the function,

38
00:02:22,000 --> 00:02:24,000
not your turn out of the basic block.

39
00:02:24,000 --> 00:02:26,000
And so my my apologies.

40
00:02:26,000 --> 00:02:30,000
It cost any confusion.

41
00:02:30,000 --> 00:02:38,000
Any questions about the back clarification.

42
00:02:38,000 --> 00:02:39,000
Okay.

43
00:02:39,000 --> 00:02:40,000
Good.

44
00:02:40,000 --> 00:02:43,000
So I'm going to talk about the topics and really the top two technical talks.

45
00:02:43,000 --> 00:02:46,000
I want to talk to you about today is the zookeeper box,

46
00:02:46,000 --> 00:02:49,000
which I didn't get to finish the last time.

47
00:02:49,000 --> 00:02:53,000
And then I'll talk about chain replication.

48
00:02:53,000 --> 00:02:54,000
All right.

49
00:02:54,000 --> 00:02:58,000
So both for chain replication and zookeeper,

50
00:02:58,000 --> 00:03:03,000
again, we're sort of still in the same context as before.

51
00:03:03,000 --> 00:03:08,000
Namely, we're doing, you know, replicated state machines.

52
00:03:08,000 --> 00:03:11,000
Just a usual diagram.

53
00:03:11,000 --> 00:03:14,000
You know, we have a service, you know, that runs on some,

54
00:03:14,000 --> 00:03:20,000
you know, replication library like you know, zap or raft.

55
00:03:20,000 --> 00:03:23,000
We have clients talking to the service,

56
00:03:23,000 --> 00:03:26,000
example, in the case of, you know, a zookeeper,

57
00:03:26,000 --> 00:03:28,000
might actually send a create call.

58
00:03:28,000 --> 00:03:32,000
You know, zookeeper internally has some state, you know, some z-notes,

59
00:03:32,000 --> 00:03:35,000
you know, that are hanging off in the form of a tree.

60
00:03:35,000 --> 00:03:38,000
And so when an operation comes in, you know, zookeeper, you know,

61
00:03:38,000 --> 00:03:42,000
forwards that operation, basically, to the raft,

62
00:03:42,000 --> 00:03:45,000
zap library, it does some chatting back and forth.

63
00:03:45,000 --> 00:03:48,000
And to get a majority of the service to accept, you know,

64
00:03:48,000 --> 00:03:49,000
that command.

65
00:03:49,000 --> 00:03:52,000
And then at some point, you know, once it's accepted,

66
00:03:52,000 --> 00:03:55,000
it comes out, the service, you know, applies the operation.

67
00:03:55,000 --> 00:03:57,000
And sends a response back to the client.

68
00:03:57,000 --> 00:04:00,000
And so the same story of replicated state machine,

69
00:04:00,000 --> 00:04:02,000
if you start all the replicated state machine,

70
00:04:02,000 --> 00:04:05,000
you start in the same state, you apply the same operation in the same order,

71
00:04:05,000 --> 00:04:07,000
then you will end up in the same state.

72
00:04:07,000 --> 00:04:11,000
And so any of the machines can take over if necessary.

73
00:04:11,000 --> 00:04:13,000
Now, one of the things that was cool about,

74
00:04:13,000 --> 00:04:16,000
or interesting about zookeeper is that, you know,

75
00:04:16,000 --> 00:04:20,000
read operations can be served from any service,

76
00:04:20,000 --> 00:04:23,000
or for any of the peers or any of the one of the service.

77
00:04:23,000 --> 00:04:26,000
And this allows you to keep it extremely high performance,

78
00:04:26,000 --> 00:04:30,000
you know, because they can actually scale the number of read operations

79
00:04:30,000 --> 00:04:32,000
with the number of servers.

80
00:04:32,000 --> 00:04:37,000
As a flip side of that, you know, zookeeper actually gave up on,

81
00:04:37,000 --> 00:04:50,000
in that particular scenario, gave up on linearizability.

82
00:04:50,000 --> 00:04:52,000
Because we know from, you know, for example, in a raft,

83
00:04:52,000 --> 00:04:57,000
you know, you can't actually arbitrary server reads from any server.

84
00:04:57,000 --> 00:05:00,000
Because of that, you have not seen the latest updates yet.

85
00:05:00,000 --> 00:05:04,000
And so in case of zookeeper that is true too.

86
00:05:04,000 --> 00:05:09,000
And so read operations are not, you know,

87
00:05:09,000 --> 00:05:11,000
or the operation that zookeepers define,

88
00:05:11,000 --> 00:05:14,000
so they don't provide the linearizable interference.

89
00:05:14,000 --> 00:05:17,000
But nevertheless, you know, we saw that actually is,

90
00:05:17,000 --> 00:05:19,000
it provides a slightly different sort of correctness guarantee,

91
00:05:19,000 --> 00:05:21,000
then linearizability.

92
00:05:21,000 --> 00:05:25,000
And that actually correctness guarantee is useful.

93
00:05:25,000 --> 00:05:28,000
And useful enough to be able to write actually programs.

94
00:05:28,000 --> 00:05:32,000
And the particular set of programs that zookeeper

95
00:05:32,000 --> 00:05:40,000
is focusing on is what they call configuration or coordination.

96
00:05:40,000 --> 00:05:52,000
Programs.

97
00:05:52,000 --> 00:05:55,000
And so the definitively, think about it is that a lot of systems

98
00:05:55,000 --> 00:05:58,000
that we've looked at in the past, they typically have, you know,

99
00:05:58,000 --> 00:06:03,000
some replication story and then they have a coordinator or a master

100
00:06:03,000 --> 00:06:05,000
that sort of coordinates the group.

101
00:06:05,000 --> 00:06:09,000
And zookeepers really intended, you know, for as a server,

102
00:06:09,000 --> 00:06:13,000
you know, for that kind of, you know, master or coordinator role.

103
00:06:13,000 --> 00:06:17,000
And it provides a bunch of primitives, you know, to make that dual.

104
00:06:17,000 --> 00:06:21,000
And the two, you know, we talked a little bit about the atomic increment last week.

105
00:06:21,000 --> 00:06:26,000
And with some of the other servers and one of the sort of finish off, you know,

106
00:06:26,000 --> 00:06:29,000
talking about blocks.

107
00:06:29,000 --> 00:06:33,000
One because there were a lot of questions about it and two that actually is quite interesting.

108
00:06:33,000 --> 00:06:36,000
And there's sort of two different rocket limitations.

109
00:06:36,000 --> 00:06:40,000
And the first one to talk about the simple one, namely where,

110
00:06:40,000 --> 00:06:42,000
let me just write down the pseudo code.

111
00:06:42,000 --> 00:06:45,000
And then we can talk about it in a little bit in detail.

112
00:06:45,000 --> 00:06:49,000
So the pseudo code for.

113
00:06:49,000 --> 00:06:52,000
The block was something like this, you know,

114
00:06:52,000 --> 00:07:01,000
acquire in an infinite loop, you know, try to create the lock file.

115
00:07:01,000 --> 00:07:11,000
Oh, name it LF and set the federal to true.

116
00:07:11,000 --> 00:07:16,000
And we'll talk about that in second, why, you know, if the create succeeds.

117
00:07:16,000 --> 00:07:28,000
Then, you know, the that process where that client was the first one to create that file and basically successfully gets the lock and so it breaks out of the for loop and returns.

118
00:07:28,000 --> 00:07:35,000
If the client did not, you know, we able to create a file, then it calls exists.

119
00:07:35,000 --> 00:07:42,000
And the call to exist is not really for, you know, see if it exists or not because, you know, we know it doesn't exist.

120
00:07:42,000 --> 00:07:48,000
And then we can see the two set of watch.

121
00:07:48,000 --> 00:07:55,000
And the idea is that, you know, the watch will go off if actually the file disappears.

122
00:07:55,000 --> 00:08:10,000
And if it disappears and you know, the client will get a notification is so basically, we're going to be doing here is just wait for that notification.

123
00:08:10,000 --> 00:08:17,000
And then the release is very simple.

124
00:08:17,000 --> 00:08:26,000
The release basically is does nothing else than sending the delete operation to the zookeeper service, you know, for the for the lock file.

125
00:08:26,000 --> 00:08:28,000
So LF in this case.

126
00:08:28,000 --> 00:08:44,000
And so what does that do? Well, if the delete, you know, sent to the zookeeper service, you know, the zookeeper service, the performs the deed operation that will actually let the that make the file would go away that will fire the watch.

127
00:08:44,000 --> 00:08:53,000
And so every client that actually is waiting, you know, for the notification will get a notification and then they go retry.

128
00:08:53,000 --> 00:08:58,000
You know, one of them will be successful on the retry will get the lock file or create the lock file and then proceed.

129
00:08:58,000 --> 00:09:07,000
And then the others ones, you know, we'll go back into their call exists and going to wait for a notification.

130
00:09:07,000 --> 00:09:22,000
And the zookeeper semantics, you know, are good enough, you know, the strong, the linear, the linearized ability for right operations, plus, you know, the rules for when notifications go off are strong enough that basically this actually implements a faithful lock.

131
00:09:22,000 --> 00:09:27,000
We're only one client. If there are many clients at the same time trying to get the lock only one will get it.

132
00:09:27,000 --> 00:09:35,000
And you know, one the release is done or when the file has been deleted, only one in the next round will get it.

133
00:09:35,000 --> 00:09:37,000
And so that's sort of cool.

134
00:09:37,000 --> 00:09:46,000
And it's interesting that you could build, you know, sort of sort of sort of disfundational primitive using the primitives that zookeeper offers.

135
00:09:46,000 --> 00:10:01,000
And you see here, both the role of the watch and then there's the second role for the elephant, you know, the, and federal is there because what happens if a client fails to crash before calls release.

136
00:10:01,000 --> 00:10:14,000
And the semantics of the federal file is that the zookeeper service will, if it decides that the client has crashed and will do the operation, it will remove the file on behalf of the client.

137
00:10:14,000 --> 00:10:28,000
So even if the clients fails or crashes, the zookeeper serves the site, you know, at some point the client is done and then that will remove this file lock F, which will cause notifications to be sent to the clients that actually are waiting for it.

138
00:10:28,000 --> 00:10:36,000
So it's a cool set of primitives to build in a powerful abstraction that can be useful in applications.

139
00:10:36,000 --> 00:10:45,000
One downside of this particular implementation is that has what's called a hurting effect.

140
00:10:45,000 --> 00:10:53,000
And then, you know, let's say you have a thousand clients, the owner, the, the lock file or make the lock file acquired the lock.

141
00:10:53,000 --> 00:11:00,000
Now one is going to succeed and 9999 are going to call exists and wait for a notification.

142
00:11:00,000 --> 00:11:11,000
And then when the first client deletes the file or releases the file lock, 9999 are going to try to actually acquire the lock.

143
00:11:11,000 --> 00:11:16,000
And of course, only one is going to succeed and then 9998 are going to be sitting for notification.

144
00:11:16,000 --> 00:11:24,000
But you know, this, you know, every sort of random design, it's a huge amount of traffic.

145
00:11:24,000 --> 00:11:35,000
And you know, basically bombarding the zookeeper surface, right? Because 9999, we do it again and you know, all the one are going to fail.

146
00:11:35,000 --> 00:11:40,000
So that's a little bit of an undesirable property is just hurting effect.

147
00:11:40,000 --> 00:11:51,000
And it's a real problem in practice, you know, both on small scale multi core machines as well, of course, in a setting like this, where you know, messages are not free.

148
00:11:51,000 --> 00:12:01,000
So it's interesting that actually zookeeper provides enough primitives that you could actually do quite a bit better that you can actually build a lock that doesn't have suffer from the hurting effect.

149
00:12:01,000 --> 00:12:09,000
So a better lock.

150
00:12:09,000 --> 00:12:13,000
And it's interesting. Let me pull up the.

151
00:12:13,000 --> 00:12:22,000
Shoot a code for this, which is in the paper, so we can look at it and discuss, you know, why you know this lock is better.

152
00:12:22,000 --> 00:12:38,000
And particularly what we'll see is that this lock is better because basically there's no, there's no retry where all clients that didn't succeed to getting the lock will retry to try to get instead, you know, basically the all the clients are sort of form of line.

153
00:12:38,000 --> 00:12:41,000
And they get the log one by one.

154
00:12:41,000 --> 00:12:48,000
And the way, you know, that you can program that using zookeeper primitives is in this particular pseudo code.

155
00:12:48,000 --> 00:12:52,000
And there are a couple differences there, compare to the previous one.

156
00:12:52,000 --> 00:12:56,000
First of all, the.

157
00:12:56,000 --> 00:13:03,000
There's an additional flag, you know, past to create, namely sequential, which basically means that every.

158
00:13:03,000 --> 00:13:17,000
These files are created. The box file is created, but it will be created as, you know, the first one will be log zero, then the next one will be lock one, etc.

159
00:13:17,000 --> 00:13:29,000
So we have like, you know, a thousand clients rushing, you know, to the service directly to require the walk, basically a thousand files will be created, all numbered from zero to 9999.

160
00:13:29,000 --> 00:13:40,000
And then, so I'll succeed in creating a file, the creative returns actually the number that you got.

161
00:13:40,000 --> 00:13:47,000
So the client zero, if the first client gets no lock craze log zero, then it will get a zero back.

162
00:13:47,000 --> 00:13:50,000
And the second one get a one back, etc.

163
00:13:50,000 --> 00:14:00,000
Then, you know, the pseudo code basically ask you to get all the children in that directory under which, you know, these files are created. And so in this case, maybe that would be a thousand.

164
00:14:00,000 --> 00:14:03,000
Children, a thousand zero notes.

165
00:14:03,000 --> 00:14:11,000
And then you can just look at the end and see if you're in, you know, in this case, zero is the low Z note is see.

166
00:14:11,000 --> 00:14:14,000
And if that's the case, that means you got the lock.

167
00:14:14,000 --> 00:14:21,000
And so that makes totally sense, correct? The first line gets actually zero back all the other clients have a higher number because they're going to be numbered.

168
00:14:21,000 --> 00:14:32,000
And so the first client will succeed in getting it and all the other ones what they're going to do is they're going to look at, they're going to find the p, you know, the number that is right in front of them.

169
00:14:32,000 --> 00:14:43,000
So, for example, if this is client that got back, you know, lock 10, it's going to look, you know, for zero nine, you know, lock nine and basically put a watch on that file.

170
00:14:43,000 --> 00:14:55,000
So this means that every client will have a watch basically on its predecessor. So it's going to see that sort of all the clients form a line.

171
00:14:55,000 --> 00:15:01,000
And then the client is going to wait for that notification to go off.

172
00:15:01,000 --> 00:15:09,000
And so that means, for example, when client zero, you know, we got the zero back, you know, releases the lock will delete in.

173
00:15:09,000 --> 00:15:13,000
This will get a notification to go off for the file one.

174
00:15:13,000 --> 00:15:25,000
And so the client is actually waiting for that particular notification, then we'll run, but it's the only one that runs and it will succeed.

175
00:15:25,000 --> 00:15:34,000
And so here we see, you know, this is sometimes these are types of locks are called ticket locks in multi core programming, if you're familiar with them.

176
00:15:34,000 --> 00:15:43,000
And they have sort of the same, the sort of the same idea of sort of ticket locks is actually sort of building into this using zookeeper primitives.

177
00:15:43,000 --> 00:15:52,000
And again, what is interesting about it is that, you know, these primitives are powerful enough that you can actually build these kind of locks.

178
00:15:52,000 --> 00:15:58,000
So we're going to have this.

179
00:15:58,000 --> 00:16:07,000
Okay, I want to make one more comment, you know, about these locks before moving on to chain replication, we have a question in the chat.

180
00:16:07,000 --> 00:16:09,000
Yeah, okay, much the question in the chat.

181
00:16:09,000 --> 00:16:18,000
What is the watch for online for good, go back on this for line for.

182
00:16:18,000 --> 00:16:21,000
I think that's the question.

183
00:16:21,000 --> 00:16:27,000
Well, that watch my comment of the watch is actually should go with you know line five.

184
00:16:27,000 --> 00:16:30,000
So there's no watch online for right.

185
00:16:30,000 --> 00:16:40,000
Line for just finds P, you know, the number that's right before you know you're in.

186
00:16:40,000 --> 00:16:44,000
If that doesn't answer the question, please, if you'll come back later at this fine.

187
00:16:44,000 --> 00:16:46,000
So we have another question.

188
00:16:46,000 --> 00:16:54,000
Yeah, this is going actually I think back a few slides, but how does zookeeper determined that the client has failed and thus release the ephemeral lock.

189
00:16:54,000 --> 00:16:58,000
I think it's just like partitions for a moment.

190
00:16:58,000 --> 00:17:01,000
Yeah, so that could be happened.

191
00:17:01,000 --> 00:17:04,000
So the client might actually sort of the client has a session, right?

192
00:17:04,000 --> 00:17:07,000
We have the zookeeper service.

193
00:17:07,000 --> 00:17:13,000
And the client needs to actually do zookeeper and the client basically saying heartbeat to each other.

194
00:17:13,000 --> 00:17:18,000
And you have the zookeeper service doesn't hear from the client for a little while.

195
00:17:18,000 --> 00:17:22,000
Then it just decides the client is down in the closest to session.

196
00:17:22,000 --> 00:17:27,000
And so the client can try to send messages on the session, but the session is just close is gone.

197
00:17:27,000 --> 00:17:35,000
In any files that were created in the ephemeral info, ephemeral files that were created during that section are basically deleted.

198
00:17:35,000 --> 00:17:47,000
And so if the network reconvenes or heals, then the client will try to send messages over that session and basically the zookeeper service will say like, oh, that session doesn't exist anymore.

199
00:17:47,000 --> 00:17:51,000
You got to retry or restart a new session.

200
00:17:51,000 --> 00:17:54,000
Got it. Thank you.

201
00:17:54,000 --> 00:18:01,000
Okay, good. So there's one important point about these what I call zealocks, where zookeeper locks.

202
00:18:01,000 --> 00:18:10,000
And that is they're not the same or have similar semantic as it like the locks that you were using or go locks or mute textures.

203
00:18:10,000 --> 00:18:19,000
And sort of an important point to realize, even though they're different, we'll see in a second, they're still useful, but they're not as strong as the sort of the go locks.

204
00:18:19,000 --> 00:18:24,000
In particular, the case is that there's interesting is like when the lock holder fails.

205
00:18:24,000 --> 00:18:33,000
Or basically zookeepers decides that lock head holder has failed, correct? That's what we just discussed.

206
00:18:33,000 --> 00:18:43,000
Then it is possible that we're going to see some intermediate state.

207
00:18:43,000 --> 00:18:49,000
And remember like what the whole rule about locks is like, you know, it's a critical section, you know, you're some invariant is true.

208
00:18:49,000 --> 00:18:57,000
And while you're going through the critical section, something that invariant might not be true, but then at the end, you can reestablish the barrier.

209
00:18:57,000 --> 00:19:06,000
In here, it's the case like you required lock, client requires lock, does some steps. And then you know, maybe zookeeper decides that the client is decided to climb this crash.

210
00:19:06,000 --> 00:19:14,000
And basically revokes lock, but you know, the state, you know, the system might actually be some intermediate state for which you're not interviewing was not true.

211
00:19:14,000 --> 00:19:22,000
So it's not the case that basically these logs guarantee at the density of a critical section.

212
00:19:22,000 --> 00:19:29,000
So what they do what they use will for.

213
00:19:29,000 --> 00:19:34,000
Yes, for some other purposes.

214
00:19:34,000 --> 00:19:44,000
So we have to sort of to primary use cases one, I think is leader election.

215
00:19:44,000 --> 00:19:53,000
So basically, when we have a set of clients that need to select the leader among them, you know, we can all try to basically create the lock file.

216
00:19:53,000 --> 00:19:57,000
One of them succeed. That's basically down to come to leader.

217
00:19:57,000 --> 00:20:02,000
So to clean up any intermediate state, possibly necessary.

218
00:20:02,000 --> 00:20:11,000
Or, you know, do these atomic updates using the ready trick where basically you do a bunch of rights, you know, to some file, but then you expose the file only at the very end.

219
00:20:11,000 --> 00:20:17,000
And that way make a set of rights actually more transactional.

220
00:20:17,000 --> 00:20:20,000
So that's one use case for these kind of locks.

221
00:20:20,000 --> 00:20:28,000
And use cases what I will call soft locks.

222
00:20:28,000 --> 00:20:36,000
The way to think about it is that let's say we have a worker in like in the map reduce style and the map.

223
00:20:36,000 --> 00:20:44,000
And we want to basically arrange that, you know, every work actually, particular map tasks only once.

224
00:20:44,000 --> 00:20:52,000
And one way to do that would be basically take a walk out, you know, for that particular input file run, you know, the computation.

225
00:20:52,000 --> 00:20:57,000
And then once the map is done, then you release the lock file.

226
00:20:57,000 --> 00:21:05,000
So this will cause only one map or two in the common case to execute a particular task.

227
00:21:05,000 --> 00:21:11,000
And that's exactly sort of what we want, but of course, you know, if the map will fail, then the walk will be released.

228
00:21:11,000 --> 00:21:16,000
And then, you know, we might execute it the second time it's crystal many else will try to require a block.

229
00:21:16,000 --> 00:21:20,000
And so in that case, you know, for the case of map produce, that's perfectly fine, right?

230
00:21:20,000 --> 00:21:25,000
It's okay if the task gets executed twice.

231
00:21:25,000 --> 00:21:30,000
It happens twice.

232
00:21:30,000 --> 00:21:38,000
In some ways, what it really is, it's more a performance optimization that in a usual case, you want to take a one of that, it actually is executed only once.

233
00:21:38,000 --> 00:21:42,000
But, you know, if there's a failure, it might be the case that you're executing a map job twice.

234
00:21:42,000 --> 00:21:48,000
And it's not painting, you know, and the map produce men's if you set up in such a way that actually that is, that's okay.

235
00:21:48,000 --> 00:21:53,000
And so in those cases, these sort of locks are really useful to.

236
00:21:53,000 --> 00:21:56,000
So many questions about this, that the.

237
00:21:56,000 --> 00:22:05,000
Disperspective for a locks, you know, that does you keep a watch or not exactly like the go locks and, you know, just important thing to keep in mind.

238
00:22:05,000 --> 00:22:08,000
Yeah, go ahead, Alexandra, I guess.

239
00:22:08,000 --> 00:22:17,000
Yeah, I had a question you said that one of the differences is that in in Z locks, the.

240
00:22:17,000 --> 00:22:25,000
If the server holding the lock dies, then the lock can be revoked, but.

241
00:22:25,000 --> 00:22:31,000
Does that still happen if you don't pass them, because there's that flag.

242
00:22:31,000 --> 00:22:33,000
Called yeah, FMR.

243
00:22:33,000 --> 00:22:34,000
Yeah, FMR.

244
00:22:34,000 --> 00:22:36,000
Yeah, it happens with the FMR.

245
00:22:36,000 --> 00:22:43,000
Right. So can we just like emulate the go logs by not passing the FMR.

246
00:22:43,000 --> 00:22:46,000
Okay, good one would happen then.

247
00:22:46,000 --> 00:22:51,000
So you create basically a persistent file, the client dies.

248
00:22:51,000 --> 00:22:54,000
You said that lock.

249
00:22:54,000 --> 00:22:59,000
And so the lock will keep on existing and nobody will release it.

250
00:22:59,000 --> 00:23:02,000
And we have a deathlock.

251
00:23:02,000 --> 00:23:07,000
Because the one person that could release it is dead.

252
00:23:07,000 --> 00:23:09,000
Or crashed.

253
00:23:09,000 --> 00:23:14,000
And in fact, this is like why I get FMR or part is there.

254
00:23:14,000 --> 00:23:17,000
Is it actually the only.

255
00:23:17,000 --> 00:23:21,000
The only person to cover these it because anyone can delete that file, right?

256
00:23:21,000 --> 00:23:24,000
Could you have a word like our background like.

257
00:23:24,000 --> 00:23:33,000
But that would break, but that would break, you know, maybe the other client is still running and also still thinks it holds the lock.

258
00:23:33,000 --> 00:23:34,000
Sure.

259
00:23:34,000 --> 00:23:36,000
You guys are getting a sort of addition.

260
00:23:36,000 --> 00:23:39,000
So you're this is the consensus problem all over again.

261
00:23:39,000 --> 00:23:41,000
Right.

262
00:23:41,000 --> 00:23:45,000
And you know, we.

263
00:23:45,000 --> 00:23:48,000
So this is sort of a clean way to get most of it.

264
00:23:48,000 --> 00:23:51,000
But not all of it, if you will.

265
00:23:51,000 --> 00:23:56,000
And I think you know, if you want to make things atomic across a number of, you know, a set of rights atomic.

266
00:23:56,000 --> 00:24:02,000
You basically use this trick of.

267
00:24:02,000 --> 00:24:11,000
Basically, the ready trick where you do a bunch of rights and then you expose them at the same time.

268
00:24:11,000 --> 00:24:14,000
Could you explain those soft locks again?

269
00:24:14,000 --> 00:24:19,000
Okay, soft locks means that basically an operation can happen twice.

270
00:24:19,000 --> 00:24:28,000
And so in the common case, if there's no crash, it will happen once, you know, because the client will take a walk out will do the operation, release.

271
00:24:28,000 --> 00:24:42,000
And, but if they're client failed halfway through, for example, then the lock would be automatically released by zookeeper and then maybe a second, you know, client will execute the same math test.

272
00:24:42,000 --> 00:24:47,000
And the case of literal election, I was intermediate state that could get exposed here.

273
00:24:47,000 --> 00:24:49,000
It's is that first, yeah.

274
00:24:49,000 --> 00:24:55,000
I guess in the pure leader election, it would be no intermediate state, but typically the leader will create a configuration file, right?

275
00:24:55,000 --> 00:25:00,000
As we saw in zookeeper, we're, you know, using the ready trick.

276
00:25:00,000 --> 00:25:05,000
I see. And so you just write the whole file and then convert it to me.

277
00:25:05,000 --> 00:25:06,000
Yep.

278
00:25:06,000 --> 00:25:07,000
Thank you.

279
00:25:07,000 --> 00:25:12,000
Sorry, could you explain what the ready trick is?

280
00:25:12,000 --> 00:25:16,000
I was hoping not to because I think we talked about last night.

281
00:25:16,000 --> 00:25:17,000
Sorry.

282
00:25:17,000 --> 00:25:26,000
So maybe we, you can hold that question and we'll I'm happy to do that in the lecture again.

283
00:25:26,000 --> 00:25:36,000
Because otherwise, I have a little time to actually talk about the chain replication.

284
00:25:36,000 --> 00:25:41,000
Any other last minutes, questions.

285
00:25:41,000 --> 00:25:49,000
Let me set the stage where chain replication a little bit and then I will also come back to zookeeper in some sense.

286
00:25:49,000 --> 00:25:55,000
And basically turns out there's sort of two common approaches to build replicated state machines.

287
00:25:55,000 --> 00:25:58,000
And we really haven't called out these two approaches.

288
00:25:58,000 --> 00:26:03,000
We've seen them, but I really talked explicitly about them. I want to do this in this time explicitly.

289
00:26:03,000 --> 00:26:08,000
Because there's some interesting observations to be made.

290
00:26:08,000 --> 00:26:15,000
Approaches to building replicated state machines.

291
00:26:15,000 --> 00:26:25,000
And the first one is the one we basically have seen in the labs, which is you run all operations.

292
00:26:25,000 --> 00:26:30,000
You know, you know, route raft.

293
00:26:30,000 --> 00:26:38,000
Raffed or you keep a raft or you know, access, whatever, you know, consensus, you know, distribute consensus algorithm that you're using.

294
00:26:38,000 --> 00:26:41,000
And so this is sort of like the key value store.

295
00:26:41,000 --> 00:26:42,000
Right.

296
00:26:42,000 --> 00:26:45,000
And last three were, you know, you do put a good operation.

297
00:26:45,000 --> 00:26:48,000
You run all the putting get operations through raft.

298
00:26:48,000 --> 00:26:53,000
And, you know, the service is basically update, you know, the key value store state as they.

299
00:26:53,000 --> 00:26:56,000
Operations are coming in on the apply channel.

300
00:26:56,000 --> 00:27:01,000
And, you know, and basically we have our replicated state issue.

301
00:27:01,000 --> 00:27:06,000
So this is sort of like how lab free works.

302
00:27:06,000 --> 00:27:12,000
It turns out that style or basically raft is used to also run all the operations.

303
00:27:12,000 --> 00:27:14,000
It's actually not that common.

304
00:27:14,000 --> 00:27:18,000
We'll see some other designs later in semester to do that too. Like the standard does it.

305
00:27:18,000 --> 00:27:34,000
But it's not actually completely the standard approach or the more common approach actually is to have a configuration server like zookeeper.

306
00:27:34,000 --> 00:27:42,000
Service and the configuration service itself internally, you know, like you use access raft or.

307
00:27:42,000 --> 00:27:44,000
And we have the same data or whatever.

308
00:27:44,000 --> 00:27:53,000
And really the configuration services really place the role of the coordinator or the master like the GFS master.

309
00:27:53,000 --> 00:28:02,000
And in addition to basically having configuration service that is actually implemented using, you know, one of these raft patches algorithms.

310
00:28:02,000 --> 00:28:13,000
And then you actually run a primary backup replication.

311
00:28:13,000 --> 00:28:21,000
And so we can think about GFS or that we saw early in the semester has that sort of structure right in the GFS that was a master.

312
00:28:21,000 --> 00:28:26,000
And that basically determined, you know, which set of service hold the particular chunk.

313
00:28:26,000 --> 00:28:41,000
And then the replica chunk group basically actually to the primary backup replication one of the chunks was the primary and the other ones were the backups and they basically had a protocol that they use for primary backup replication.

314
00:28:41,000 --> 00:28:49,000
And you can think about VM PT in a similar style where configuration server is basically a test and set server, you know, which basically recorded who was actually the primary.

315
00:28:49,000 --> 00:28:55,000
And then the primary and the backup have a protocol to basically send, you know, channel operation down the channel.

316
00:28:55,000 --> 00:29:03,000
And so that the primary and backup is sort of roughly in sync and implement a replicate state and sheet.

317
00:29:03,000 --> 00:29:11,000
And this approach tends to be sort of the more common approach.

318
00:29:11,000 --> 00:29:15,000
Although, you know, the approach number one also happens.

319
00:29:15,000 --> 00:29:20,000
One way one way to think about this is that, you know,

320
00:29:20,000 --> 00:29:29,000
if the raft state like for example, our key value server in left free would be gigantic, you know, how new to mind of this state, you know, terabytes of the key value server.

321
00:29:29,000 --> 00:29:35,000
Would draft be very good match for that kind of application.

322
00:29:35,000 --> 00:29:39,000
Or what is the risk.

323
00:29:39,000 --> 00:29:48,000
Or the potential problem.

324
00:29:48,000 --> 00:29:54,000
And so, you know, we flush the log very often. So maybe that could be problematic.

325
00:29:54,000 --> 00:30:00,000
That could be problematic. Yeah. Like what is the, what's the size of the checkpoint.

326
00:30:00,000 --> 00:30:05,000
If our key value server is really big.

327
00:30:05,000 --> 00:30:08,000
It's linear in the size of the key values to work.

328
00:30:08,000 --> 00:30:15,000
Yeah, so it's good also be gigantic. Right. So if any, you know, if any time the checkpoint has to be sent, you know, that's going to be a big checkpoint.

329
00:30:15,000 --> 00:30:19,000
And sort of like raft is not really sort of set up, you know, to do.

330
00:30:19,000 --> 00:30:26,000
And so the primary is going to communicate, you know, the new primary is going to communicate these snapshots if you didn't lock to D, you know, to the backups.

331
00:30:26,000 --> 00:30:28,000
Then you know, they're going to be big.

332
00:30:28,000 --> 00:30:35,000
And so you often want to maybe a little bit more clever plan to sort of synchronize, you know, re synchronize new servers.

333
00:30:35,000 --> 00:30:42,000
And so one reason that basically often these things are split into two different pieces where it is the configuration server.

334
00:30:42,000 --> 00:30:51,000
So basically small turn to state. And then you're a primary backup plan that actually, you know, may replicate huge amount of data.

335
00:30:51,000 --> 00:30:55,000
And so this is why one reason you see sort of both approaches.

336
00:30:55,000 --> 00:30:58,000
Does that make sense?

337
00:30:58,000 --> 00:31:00,000
I'll come back to that at the end of the lecture again.

338
00:31:00,000 --> 00:31:03,000
But it's important to keep this in mind.

339
00:31:03,000 --> 00:31:08,000
So what approach or what benefits does one give over two?

340
00:31:08,000 --> 00:31:10,000
You don't have to have two of them.

341
00:31:10,000 --> 00:31:16,000
Right. And one, you basically have raft, you run the operation forward fruit and then just the configuration for you to.

342
00:31:16,000 --> 00:31:20,000
So everything is in a single single component.

343
00:31:20,000 --> 00:31:31,000
And here in number two, we have two components. You know, we have a configuration service that includes raft and we have a primary backup scheme.

344
00:31:31,000 --> 00:31:37,000
So maybe we'll come, we'll come earlier as I talk about chain replication.

345
00:31:37,000 --> 00:31:45,000
Yeah, I had, I had really quick question. So like essentially for tool, I guess would like what the advantage be that you have like.

346
00:31:45,000 --> 00:31:49,000
It's consensus reached through the leader. And the leader never fails, right?

347
00:31:49,000 --> 00:31:58,000
Like, yeah. So the, the, the adventure to is that as we'll see in a second in chain replication is there's sort of a separate process that takes care of the configuration park.

348
00:31:58,000 --> 00:32:03,000
And you don't have to worry about it in terms of your primary backup replication scheme.

349
00:32:03,000 --> 00:32:11,000
And that just decides like in GFS, that's sort of like the master, it just decides about a year to set the server for this particular replica group.

350
00:32:11,000 --> 00:32:17,000
And the backup primary backup protocol doesn't have to think about this.

351
00:32:17,000 --> 00:32:18,000
Thanks.

352
00:32:18,000 --> 00:32:32,000
And so, like, and this is a good introduction to chain replication because the chain replication is exactly not sort of a primary backup replication scheme for approach to.

353
00:32:32,000 --> 00:32:43,000
And now this to say that, you know, chain replication just assumes there is a very, a configuration service.

354
00:32:43,000 --> 00:32:47,000
I think they called the master process in the paper.

355
00:32:47,000 --> 00:32:51,000
Then chain replication cells, there's a couple of cool properties.

356
00:32:51,000 --> 00:32:54,000
One read operations.

357
00:32:54,000 --> 00:32:57,000
Or as they call them query operations.

358
00:32:57,000 --> 00:33:02,000
Involved only one server.

359
00:33:02,000 --> 00:33:07,000
Namely the tail. That's we've seen the second.

360
00:33:07,000 --> 00:33:14,000
Another nice property about chain replication that has a very simple recovery plan.

361
00:33:14,000 --> 00:33:20,000
And we're going to talk about all these in more detail in the second.

362
00:33:20,000 --> 00:33:27,000
And then something that you started having you, you appreciate to give the fact, you know, how complicated can be wrapped.

363
00:33:27,000 --> 00:33:31,000
And it provides actually strong.

364
00:33:31,000 --> 00:33:35,000
A strong properties, namely linearizability.

365
00:33:35,000 --> 00:33:43,000
If we were to put in the get operations, I finally just a lot of people ask this, you know, there's actually a reasonable influential design.

366
00:33:43,000 --> 00:33:47,000
And it's used by quite a number of systems.

367
00:33:47,000 --> 00:33:50,000
So this is a useful practice.

368
00:33:50,000 --> 00:33:54,000
And this is a, so I'm going to talk about each of these components in a little bit more detail.

369
00:33:54,000 --> 00:34:01,000
And then we'll come back to this sort of approach one for just approach to.

370
00:34:01,000 --> 00:34:07,000
So in terms of an overview.

371
00:34:07,000 --> 00:34:11,000
So, you know, there's an overview.

372
00:34:11,000 --> 00:34:18,000
You sort of delay of the land, you know, there is a master process.

373
00:34:18,000 --> 00:34:24,000
Or configuration service.

374
00:34:24,000 --> 00:34:30,000
And basically keep track, you know, which server is going to belong to a particular chain.

375
00:34:30,000 --> 00:34:37,000
So S1, S2, S3, you know, basically have the record of a genius who the head is and who the tap.

376
00:34:37,000 --> 00:34:40,000
And so that's a configuration service.

377
00:34:40,000 --> 00:34:50,000
And here we do actually have our servers, you know, S1, S2, S3.

378
00:34:50,000 --> 00:35:00,000
And one of them is the head, typically the one with a smaller number and one is the tail.

379
00:35:00,000 --> 00:35:03,000
And so we have the clients.

380
00:35:03,000 --> 00:35:09,000
The client may talk to the configuration server, we're in, you know, who actually is part of the chain.

381
00:35:09,000 --> 00:35:13,000
And then a sense of right request to the head.

382
00:35:13,000 --> 00:35:16,000
So this is the protocol and chain replication.

383
00:35:16,000 --> 00:35:20,000
The right request always goes to the head.

384
00:35:20,000 --> 00:35:26,000
And what the head does, the head basically pushes, you know, the head actually applies the operation on its state.

385
00:35:26,000 --> 00:35:31,000
And maybe it has a disk associated with it, you know, where, whatever source key value server on it.

386
00:35:31,000 --> 00:35:38,000
And then it sends the update, you know, there's all the operation down the chain.

387
00:35:38,000 --> 00:35:42,000
And then it's in five order and reliably.

388
00:35:42,000 --> 00:35:52,000
So S1 will send the update to S2, you know, S2 have a Zone disk, apply the operation word state change to its state.

389
00:35:52,000 --> 00:35:59,000
Once it actually supplied it, you know, it will forward it to the last node in the chain.

390
00:35:59,000 --> 00:36:06,000
Because there are only three nodes in this particular chain, you could have changed that are longer, you know, if you want more availability.

391
00:36:06,000 --> 00:36:14,000
So last note, it gets the message or this state change, it applies to you know, its state.

392
00:36:14,000 --> 00:36:21,000
And then this is in charge actually sending a acknowledgement back to the client.

393
00:36:21,000 --> 00:36:26,000
So it's the tail who sends the acknowledgement back.

394
00:36:26,000 --> 00:36:39,000
One way to think about this is that when the tail, in this case, as free, you know, actually applies the state change, that's sort of the commit point.

395
00:36:39,000 --> 00:36:45,000
And the reason that this is the commit point is because subsequent reads always come from the tail.

396
00:36:45,000 --> 00:36:48,000
So if anybody or any other client.

397
00:36:48,000 --> 00:36:52,000
You know, there's a read operation, they always go to the tail.

398
00:36:52,000 --> 00:36:56,000
And the tail basically responds immediately back to it.

399
00:36:56,000 --> 00:37:02,000
So read operations go to the tail. So here was client one, here's client two, client two, there's a read operation.

400
00:37:02,000 --> 00:37:07,000
It goes to the tail, the tail responds and that's it.

401
00:37:07,000 --> 00:37:11,000
And so there's a couple of things that are one that sort of point out.

402
00:37:11,000 --> 00:37:16,000
And one of the interesting points out is that the read operations just involve one server.

403
00:37:16,000 --> 00:37:25,000
And like if you remember from lap three or if you progress, we started doing lap three read operations actually involve.

404
00:37:25,000 --> 00:37:32,000
In our implementation read operation go through the raft log and all that kind of stuff.

405
00:37:32,000 --> 00:37:43,000
The paper discusses an optimization, but the read operation always goes to the leader and the leader first has to, you know, contact the majority of the service before it to execute the operation local.

406
00:37:43,000 --> 00:37:50,000
So what you see here is that the read operations actually go through complete so that the to a different server from right operation.

407
00:37:50,000 --> 00:37:55,000
So the reading and right workload is actually spread at least over two servers.

408
00:37:55,000 --> 00:38:01,000
Furthermore, the read operation involves only one server. There's never doesn't have to talk to any other server.

409
00:38:01,000 --> 00:38:11,000
So I can just respond to me and we'll see a little bit later on why this is actually important or why this is actually what further optimization is this is a lapse.

410
00:38:11,000 --> 00:38:24,000
And so the commit point is really, you know, the point that the right actually happens at the tail end because at that point, the right operation is visible to readers and not before any other point.

411
00:38:24,000 --> 00:38:36,000
This is also, you know, provides this linearizability. So it's pretty easy to see that in the case of no crashes, you know, this scheme guarantees or linearizability because the rights are all applied in some total order at the head.

412
00:38:36,000 --> 00:38:45,000
And when the tail receives, you know, that update, it's sort of, it's the commit point it what's respond to the client and sends a request back.

413
00:38:45,000 --> 00:38:53,000
If that same client immediately does a read operation, it will go to the tail and it will observe the last change.

414
00:38:53,000 --> 00:38:58,000
So certainly within a single client basically all operations are totally ordered.

415
00:38:58,000 --> 00:39:05,000
It's pretty easy to see that the inclined, if client to start to read operation after, you know, clients one operation has finished.

416
00:39:05,000 --> 00:39:16,000
And when it's finished, when the tail has responded. So any read operation that starts after a right operation will observe, you know, the last or the result of the most recent right.

417
00:39:16,000 --> 00:39:23,000
And so it's pretty easy to sort of get an intuition here that this is going to get provided with linearizability.

418
00:39:23,000 --> 00:39:34,000
So what I'd like to do now is actually take a quick breakout room section and we're going to let you to discuss the question that wasn't a posting lecture.

419
00:39:34,000 --> 00:39:51,000
You know, what could go wrong or like would a brain linearizability if instead of having the tail respond to the client, have the head respond to the client immediately after it has received, you know, the right request.

420
00:39:51,000 --> 00:40:01,000
And maybe that's a good topic sort of to debate a little bit and if you want to go in any other direction to talk about the chain replication for your welcome, but maybe that's something to start with.

421
00:40:01,000 --> 00:40:11,000
So let's take a five minute breakout room and then we'll do this and I think let me see Jose are you going to do it.

422
00:40:11,000 --> 00:40:13,000
Yeah.

423
00:40:13,000 --> 00:40:18,000
Do I have to make you something or I don't think it's necessary.

424
00:40:18,000 --> 00:40:25,000
I think it's zoom changed should should be possible.

425
00:40:25,000 --> 00:40:32,000
Oh, yeah.

426
00:40:32,000 --> 00:40:33,000
Yep.

427
00:40:33,000 --> 00:40:35,000
Yeah.

428
00:41:03,000 --> 00:41:05,000
Yeah.

429
00:41:33,000 --> 00:41:35,000
Yeah.

430
00:41:35,000 --> 00:41:36,000
Yeah.

431
00:41:36,000 --> 00:41:37,000
Yeah.

432
00:41:37,000 --> 00:41:38,000
Yeah.

433
00:41:38,000 --> 00:41:39,000
Yeah.

434
00:41:39,000 --> 00:41:40,000
Yeah.

435
00:41:40,000 --> 00:41:41,000
Yeah.

436
00:41:41,000 --> 00:41:42,000
Yeah.

437
00:41:42,000 --> 00:41:43,000
Yeah.

438
00:41:43,000 --> 00:41:44,000
Yeah.

439
00:41:44,000 --> 00:41:45,000
Yeah.

440
00:41:45,000 --> 00:41:46,000
Yeah.

441
00:41:46,000 --> 00:41:47,000
Yeah.

442
00:41:47,000 --> 00:41:48,000
Yeah.

443
00:41:48,000 --> 00:41:49,000
Yeah.

444
00:41:49,000 --> 00:41:50,000
Yeah.

445
00:41:50,000 --> 00:41:51,000
Yeah.

446
00:41:51,000 --> 00:41:52,000
Yeah.

447
00:41:52,000 --> 00:41:53,000
Yeah.

448
00:41:53,000 --> 00:41:54,000
Yeah.

449
00:41:54,000 --> 00:41:55,000
Yeah.

450
00:41:55,000 --> 00:41:56,000
Yeah.

451
00:41:56,000 --> 00:41:57,000
Yeah.

452
00:41:57,000 --> 00:41:58,000
Yeah.

453
00:41:58,000 --> 00:41:59,000
Yeah.

454
00:41:59,000 --> 00:42:00,000
Yeah.

455
00:42:00,000 --> 00:42:01,000
Yeah.

456
00:42:01,000 --> 00:42:02,000
Yeah.

457
00:42:02,000 --> 00:42:03,000
Yeah.

458
00:42:03,000 --> 00:42:04,000
Yeah.

459
00:42:04,000 --> 00:42:05,000
Yeah.

460
00:42:05,000 --> 00:42:06,000
Yeah.

461
00:42:06,000 --> 00:42:07,000
Yeah.

462
00:42:07,000 --> 00:42:08,000
Yeah.

463
00:42:08,000 --> 00:42:09,000
Yeah.

464
00:42:09,000 --> 00:42:10,000
Yeah.

465
00:42:10,000 --> 00:42:11,000
Yeah.

466
00:42:11,000 --> 00:42:12,000
Yeah.

467
00:42:12,000 --> 00:42:13,000
Yeah.

468
00:42:13,000 --> 00:42:14,000
Yeah.

469
00:42:14,000 --> 00:42:15,000
Yeah.

470
00:42:15,000 --> 00:42:16,000
Yeah.

471
00:42:16,000 --> 00:42:17,000
Yeah.

472
00:42:17,000 --> 00:42:18,000
Yeah.

473
00:42:18,000 --> 00:42:19,000
Yeah.

474
00:42:19,000 --> 00:42:20,000
Yeah.

475
00:42:20,000 --> 00:42:21,000
Yeah.

476
00:42:21,000 --> 00:42:22,000
Yeah.

477
00:42:22,000 --> 00:42:23,000
Yeah.

478
00:42:23,000 --> 00:42:24,000
Yeah.

479
00:42:24,000 --> 00:42:25,000
Yeah.

480
00:42:32,000 --> 00:42:33,000
Yeah.

481
00:42:33,000 --> 00:42:34,000
Yeah.

482
00:42:34,000 --> 00:42:35,000
Yeah.

483
00:42:35,000 --> 00:42:36,000
Yeah.

484
00:42:36,000 --> 00:42:37,000
Yeah.

485
00:42:37,000 --> 00:42:38,000
Yeah.

486
00:42:38,000 --> 00:42:39,000
Yeah.

487
00:42:39,000 --> 00:42:40,000
Yeah.

488
00:42:40,000 --> 00:42:41,000
Yeah.

489
00:42:41,000 --> 00:42:42,000
Yeah.

490
00:42:42,000 --> 00:42:43,000
Yeah.

491
00:42:43,000 --> 00:42:44,000
Yeah.

492
00:42:44,000 --> 00:42:45,000
Yeah.

493
00:42:45,000 --> 00:42:46,000
Yeah.

494
00:42:46,000 --> 00:42:47,000
Yeah.

495
00:42:47,000 --> 00:42:48,000
Yeah.

496
00:42:48,000 --> 00:42:49,000
Yeah.

497
00:42:49,000 --> 00:42:50,000
Yeah.

498
00:42:50,000 --> 00:42:51,000
Yeah.

499
00:42:51,000 --> 00:42:52,000
Yeah.

500
00:42:52,000 --> 00:42:53,000
Yeah.

501
00:42:53,000 --> 00:42:54,000
Yeah.

502
00:42:54,000 --> 00:42:55,000
Yeah.

503
00:42:55,000 --> 00:42:56,000
Yeah.

504
00:42:56,000 --> 00:42:57,000
Yeah.

505
00:42:57,000 --> 00:42:58,000
Yeah.

506
00:42:58,000 --> 00:42:59,000
Yeah.

507
00:42:59,000 --> 00:43:00,000
Yeah.

508
00:43:00,000 --> 00:43:01,000
Yeah.

509
00:43:01,000 --> 00:43:02,000
Yeah.

510
00:43:02,000 --> 00:43:03,000
Yeah.

511
00:43:03,000 --> 00:43:04,000
Yeah.

512
00:43:04,000 --> 00:43:05,000
Yeah.

513
00:43:05,000 --> 00:43:06,000
Yeah.

514
00:43:06,000 --> 00:43:07,000
Yeah.

515
00:43:07,000 --> 00:43:08,000
Yeah.

516
00:43:08,000 --> 00:43:09,000
Yeah.

517
00:43:09,000 --> 00:43:10,000
Yeah.

518
00:43:10,000 --> 00:43:11,000
Yeah.

519
00:43:11,000 --> 00:43:12,000
Yeah.

520
00:43:12,000 --> 00:43:13,000
Yeah.

521
00:43:13,000 --> 00:43:14,000
Yeah.

522
00:43:14,000 --> 00:43:15,000
Yeah.

523
00:43:15,000 --> 00:43:16,000
Yeah.

524
00:43:16,000 --> 00:43:17,000
Yeah.

525
00:43:17,000 --> 00:43:18,000
Yeah.

526
00:43:18,000 --> 00:43:19,000
Yeah.

527
00:43:19,000 --> 00:43:20,000
Yeah.

528
00:43:20,000 --> 00:43:21,000
Yeah.

529
00:43:21,000 --> 00:43:22,000
Yeah.

530
00:43:22,000 --> 00:43:23,000
Yeah.

531
00:43:23,000 --> 00:43:24,000
Yeah.

532
00:43:24,000 --> 00:43:25,000
Yeah.

533
00:43:25,000 --> 00:43:26,000
Yeah.

534
00:43:26,000 --> 00:43:27,000
Yeah.

535
00:43:27,000 --> 00:43:28,000
Yeah.

536
00:43:28,000 --> 00:43:29,000
Yeah.

537
00:43:29,000 --> 00:43:30,000
Yeah.

538
00:43:30,000 --> 00:43:31,000
Yeah.

539
00:43:31,000 --> 00:43:32,000
Yeah.

540
00:43:32,000 --> 00:43:33,000
Yeah.

541
00:43:33,000 --> 00:43:34,000
Yeah.

542
00:43:34,000 --> 00:43:35,000
Yeah.

543
00:43:35,000 --> 00:43:36,000
Yeah.

544
00:43:36,000 --> 00:43:37,000
Yeah.

545
00:43:37,000 --> 00:43:38,000
Yeah.

546
00:43:38,000 --> 00:43:39,000
Yeah.

547
00:43:39,000 --> 00:43:40,000
Yeah.

548
00:43:40,000 --> 00:43:41,000
Yeah.

549
00:43:41,000 --> 00:43:42,000
Yeah.

550
00:43:42,000 --> 00:43:43,000
Yeah.

551
00:43:43,000 --> 00:43:44,000
Yeah.

552
00:43:44,000 --> 00:43:45,000
Yeah.

553
00:43:45,000 --> 00:43:46,000
Yeah.

554
00:43:46,000 --> 00:43:47,000
Yeah.

555
00:43:47,000 --> 00:43:48,000
Yeah.

556
00:43:48,000 --> 00:43:49,000
Yeah.

557
00:43:49,000 --> 00:43:50,000
Yeah.

558
00:43:50,000 --> 00:43:51,000
Yeah.

559
00:43:51,000 --> 00:43:52,000
Yeah.

560
00:43:52,000 --> 00:43:53,000
Yeah.

561
00:43:53,000 --> 00:43:54,000
Yeah.

562
00:43:54,000 --> 00:43:55,000
Yeah.

563
00:43:55,000 --> 00:43:56,000
Yeah.

564
00:43:56,000 --> 00:43:57,000
Yeah.

565
00:43:57,000 --> 00:43:58,000
Yeah.

566
00:43:58,000 --> 00:43:59,000
Yeah.

567
00:43:59,000 --> 00:44:00,000
Yeah.

568
00:44:00,000 --> 00:44:01,000
Yeah.

569
00:44:01,000 --> 00:44:02,000
Yeah.

570
00:44:02,000 --> 00:44:03,000
Yeah.

571
00:44:03,000 --> 00:44:04,000
Yeah.

572
00:44:04,000 --> 00:44:05,000
Yeah.

573
00:44:05,000 --> 00:44:06,000
Yeah.

574
00:44:06,000 --> 00:44:07,000
Yeah.

575
00:44:07,000 --> 00:44:08,000
Yeah.

576
00:44:08,000 --> 00:44:09,000
Yeah.

577
00:44:09,000 --> 00:44:10,000
Yeah.

578
00:44:10,000 --> 00:44:11,000
Yeah.

579
00:44:11,000 --> 00:44:12,000
Yeah.

580
00:44:12,000 --> 00:44:13,000
Yeah.

581
00:44:13,000 --> 00:44:14,000
Yeah.

582
00:44:14,000 --> 00:44:15,000
Yeah.

583
00:44:15,000 --> 00:44:16,000
Yeah.

584
00:44:16,000 --> 00:44:17,000
Yeah.

585
00:44:17,000 --> 00:44:18,000
Yeah.

586
00:44:18,000 --> 00:44:19,000
Yeah.

587
00:44:19,000 --> 00:44:20,000
Yeah.

588
00:44:20,000 --> 00:44:21,000
Yeah.

589
00:44:21,000 --> 00:44:22,000
Yeah.

590
00:44:22,000 --> 00:44:23,000
Yeah.

591
00:44:23,000 --> 00:44:24,000
Yeah.

592
00:44:24,000 --> 00:44:25,000
Yeah.

593
00:44:25,000 --> 00:44:27,000
Yeah.

594
00:44:27,000 --> 00:44:28,000
Yeah.

595
00:44:28,000 --> 00:44:29,000
Yeah.

596
00:44:29,000 --> 00:44:30,000
So don't sit.

597
00:44:31,000 --> 00:44:32,000
I really like it.

598
00:44:32,000 --> 00:44:34,000
I don't know what it is.

599
00:44:34,000 --> 00:44:37,000
I don't know what it is.

600
00:44:37,000 --> 00:44:39,000
I really like it.

601
00:44:39,000 --> 00:44:41,000
Yeah.

602
00:44:41,000 --> 00:44:42,000
Yeah.

603
00:44:42,000 --> 00:44:43,000
Yeah.

604
00:44:43,000 --> 00:44:44,000
Yeah.

605
00:44:44,000 --> 00:44:45,000
Yeah.

606
00:44:45,000 --> 00:44:46,000
Yeah.

607
00:44:46,000 --> 00:44:47,000
Yeah.

608
00:44:47,000 --> 00:44:48,000
Yeah.

609
00:44:48,000 --> 00:44:49,000
Yeah.

610
00:44:49,000 --> 00:44:51,000
Yeah.

611
00:44:51,000 --> 00:44:53,000
Yeah.

612
00:44:53,000 --> 00:44:54,000
Yeah.

613
00:44:54,000 --> 00:44:55,000
Yeah.

614
00:44:55,000 --> 00:44:56,000
Yeah.

615
00:44:56,000 --> 00:44:57,000
Yeah.

616
00:44:57,000 --> 00:44:57,760
That's.

617
00:45:28,000 --> 00:45:30,000
I'm going to go to the next room.

618
00:45:30,000 --> 00:45:32,000
I'm going to go to the next room.

619
00:45:32,000 --> 00:45:34,000
I'm going to go to the next room.

620
00:45:34,000 --> 00:45:36,000
I'm going to go to the next room.

621
00:45:36,000 --> 00:45:38,000
I'm going to go to the next room.

622
00:45:38,000 --> 00:45:40,000
I'm going to go to the next room.

623
00:45:40,000 --> 00:45:42,000
I'm going to go to the next room.

624
00:45:42,000 --> 00:45:44,000
I'm going to go to the next room.

625
00:45:44,000 --> 00:45:46,000
I'm going to go to the next room.

626
00:45:46,000 --> 00:45:48,000
I'm going to go to the next room.

627
00:45:48,000 --> 00:45:50,000
I'm going to go to the next room.

628
00:45:50,000 --> 00:45:52,000
I'm going to go to the next room.

629
00:45:52,000 --> 00:45:54,000
I'm going to go to the next room.

630
00:45:54,000 --> 00:45:56,000
I'm going to go to the next room.

631
00:45:56,000 --> 00:45:58,000
I'm going to go to the next room.

632
00:46:26,000 --> 00:46:28,000
I'm going to go to the next room.

633
00:46:28,000 --> 00:46:30,000
I'm going to go to the next room.

634
00:46:30,000 --> 00:46:32,000
I'm going to go to the next room.

635
00:46:32,000 --> 00:46:34,000
I'm going to go to the next room.

636
00:46:34,000 --> 00:46:36,000
I'm going to go to the next room.

637
00:46:36,000 --> 00:46:38,000
I'm going to go to the next room.

638
00:46:38,000 --> 00:46:40,000
I'm going to go to the next room.

639
00:46:40,000 --> 00:46:42,000
I'm going to go to the next room.

640
00:46:42,000 --> 00:46:44,000
I'm going to go to the next room.

641
00:46:44,000 --> 00:46:46,000
I'm going to go to the next room.

642
00:46:46,000 --> 00:46:48,000
I'm going to go to the next room.

643
00:46:48,000 --> 00:46:50,000
I'm going to go to the next room.

644
00:46:50,000 --> 00:46:52,000
I'm going to go to the next room.

645
00:46:52,000 --> 00:46:54,000
I'm going to go to the next room.

646
00:46:54,000 --> 00:46:56,000
I'm going to go to the next room.

647
00:46:56,000 --> 00:46:58,000
I'm going to go to the next room.

648
00:46:58,000 --> 00:47:00,000
I'm going to go to the next room.

649
00:47:00,000 --> 00:47:02,000
I'm going to go to the next room.

650
00:47:02,000 --> 00:47:04,000
I'm going to go to the next room.

651
00:47:04,000 --> 00:47:06,000
I'm going to go to the next room.

652
00:47:06,000 --> 00:47:08,000
I'm going to go to the next room.

653
00:47:08,000 --> 00:47:10,000
I'm going to go to the next room.

654
00:47:10,000 --> 00:47:12,000
I'm going to go to the next room.

655
00:47:12,000 --> 00:47:14,000
I'm going to go to the next room.

656
00:47:14,000 --> 00:47:16,000
I'm going to go to the next room.

657
00:47:16,000 --> 00:47:18,000
I'm going to go to the next room.

658
00:47:18,000 --> 00:47:20,000
I'm going to go to the next room.

659
00:47:20,000 --> 00:47:22,000
I'm going to go to the next room.

660
00:47:22,000 --> 00:47:24,000
Vanessa here.

661
00:47:24,000 --> 00:47:26,000
Vanessa.

662
00:47:26,000 --> 00:47:37,000
You okay, you okay.

663
00:47:37,000 --> 00:47:40,000
You okay, you're okay, you're coming back.

664
00:47:40,000 --> 00:47:42,000
You okay, you're coming back.

665
00:47:42,000 --> 00:47:44,000
You okay, you're coming back.

666
00:47:44,000 --> 00:47:46,000
You okay, you okay, you're coming back.

667
00:47:46,000 --> 00:47:48,000
You okay, you are coming back.

668
00:47:48,000 --> 00:47:50,000
You're coming back.

669
00:47:50,000 --> 00:47:52,000
close the thumbs.

670
00:48:20,000 --> 00:48:36,000
this

671
00:48:36,000 --> 00:48:46,000
OK!

672
00:48:46,000 --> 00:48:47,000
Okay.

673
00:48:47,000 --> 00:48:48,000
Good.

674
00:48:48,000 --> 00:49:14,679
So, you know, just a quick to summarize, you know, why, you know, that would break linear

675
00:49:14,679 --> 00:49:15,679
stability.

676
00:49:15,679 --> 00:49:21,399
And so the vertical change changed that was sort of contemplated was to, you know, both,

677
00:49:21,399 --> 00:49:25,000
you know, keep propagating to S1 and S2 and S3.

678
00:49:25,000 --> 00:49:29,759
But, you know, as soon as S1 actually is done with its propagation, the sender responds

679
00:49:29,759 --> 00:49:31,599
back to the client.

680
00:49:31,599 --> 00:49:37,480
And clearly that is, we'll break linearizability because, let's say, this client won't get

681
00:49:37,480 --> 00:49:40,759
the right, got the acknowledgement back, you know, from S1.

682
00:49:40,760 --> 00:49:44,480
S1 of course has, you know, the right also progressed S2 and S3.

683
00:49:44,480 --> 00:49:50,600
But maybe before, you know, S2 actually context S3, the client actually sends a read operation

684
00:49:50,600 --> 00:49:51,600
to S3.

685
00:49:51,600 --> 00:49:57,160
And of course, now we'll return the value from before the right for stunt.

686
00:49:57,160 --> 00:49:59,840
So the client doesn't even observe its own rights.

687
00:49:59,840 --> 00:50:03,480
And so I'm clearly breaking linearizability.

688
00:50:03,480 --> 00:50:09,280
So it's very important that, you know, as I said earlier that these, the tail actually

689
00:50:09,280 --> 00:50:15,200
sends the acknowledgement back to the client because really the, once the tail has processed

690
00:50:15,200 --> 00:50:22,480
the, where I do operation, that is actually really what the commit point is.

691
00:50:22,480 --> 00:50:25,480
Any questions about that?

692
00:50:25,480 --> 00:50:30,760
Okay, so this was sort of normal operation.

693
00:50:30,760 --> 00:50:33,760
And I want to talk a little bit about crashes.

694
00:50:34,760 --> 00:50:43,760
About since it's a two four stupid systems, so all the actions is where when the failures happen.

695
00:50:43,760 --> 00:50:48,280
And one of the things that is cool about the chain replication is, you know, the number

696
00:50:48,280 --> 00:50:51,040
failure scenario is actually quite limited.

697
00:50:51,040 --> 00:50:56,520
And so let me, so basically the free cases, namely the head fails, the one at the intermediate

698
00:50:56,520 --> 00:50:58,360
search fails or tail fails.

699
00:50:58,360 --> 00:51:01,800
And so let's look at one of each of those cases.

700
00:51:01,800 --> 00:51:05,800
So here's our, you know, the case we have ahead, you know, it's s1.

701
00:51:05,800 --> 00:51:10,600
And let's say that it applied U1, U2 and U3.

702
00:51:10,600 --> 00:51:15,360
So free updates, it talks to S2.

703
00:51:15,360 --> 00:51:20,600
Maybe S2 has done U2 and U1.

704
00:51:20,600 --> 00:51:24,360
And you know, we are we have S3, which is the tail.

705
00:51:24,360 --> 00:51:26,519
And it only has done U1 so far.

706
00:51:26,519 --> 00:51:32,880
And so the coin was to put the coin was talking to S1.

707
00:51:32,880 --> 00:51:37,480
And we now want to think about like what happens and what needs to happen is one of these

708
00:51:37,480 --> 00:51:38,480
crashes.

709
00:51:38,480 --> 00:51:43,119
And so let's start with the case that the head crashes.

710
00:51:43,119 --> 00:51:46,559
And so the head crashes, what needs to be done?

711
00:51:46,559 --> 00:51:48,559
This is an easy case.

712
00:51:48,559 --> 00:51:51,400
This is a hard case.

713
00:51:51,400 --> 00:51:52,400
Easy.

714
00:51:53,240 --> 00:51:54,240
Easy.

715
00:51:54,240 --> 00:51:55,440
I help with an easy case.

716
00:51:55,440 --> 00:51:56,440
Why?

717
00:51:56,440 --> 00:52:00,880
You can just cut off the head.

718
00:52:00,880 --> 00:52:01,880
Oh, sorry.

719
00:52:01,880 --> 00:52:06,320
Yeah, the head and, you know, make S2 the head now.

720
00:52:06,320 --> 00:52:07,320
Yeah.

721
00:52:07,320 --> 00:52:09,320
We just promote, you know, so what's the most good?

722
00:52:09,320 --> 00:52:13,280
And the correct is that the configuration server discovers that S1 is gone.

723
00:52:13,280 --> 00:52:15,039
What decides if S1 is gone.

724
00:52:15,039 --> 00:52:22,160
And then basically can promote S2 to be the head in the

725
00:52:22,159 --> 00:52:27,480
subsequent operations and clients know in the future and talk to this guy.

726
00:52:27,480 --> 00:52:30,000
And why is this correct?

727
00:52:30,000 --> 00:52:32,279
So what operation have we lost?

728
00:52:32,279 --> 00:52:34,239
We lost U3.

729
00:52:34,239 --> 00:52:35,239
Yeah.

730
00:52:35,239 --> 00:52:36,480
And is that a problem?

731
00:52:36,480 --> 00:52:39,480
That's valid to lose operations.

732
00:52:39,480 --> 00:52:40,480
Yeah.

733
00:52:40,480 --> 00:52:41,480
Yeah.

734
00:52:41,480 --> 00:52:42,480
It's fair game to lose U3.

735
00:52:42,480 --> 00:52:47,199
But U3 has not been committed because only operations at the tail are committed.

736
00:52:47,199 --> 00:52:49,399
And so it's just as if the operation never happens.

737
00:52:49,400 --> 00:52:56,119
And the client could not even have observed that actually U2 or U3 actually has happened.

738
00:52:56,119 --> 00:52:57,119
Or U3 has.

739
00:52:57,119 --> 00:52:58,119
Okay.

740
00:52:58,119 --> 00:53:01,160
So that's perfectly fine to do this.

741
00:53:01,160 --> 00:53:03,720
Why is it important that the configuration server is actually involved here?

742
00:53:03,720 --> 00:53:07,559
Could it like STU2 decide on its own to become the head?

743
00:53:07,559 --> 00:53:10,400
Let's say S2 couldn't talk to S1 anymore and it says like, ah, whatever.

744
00:53:10,400 --> 00:53:11,960
I want to become head.

745
00:53:11,960 --> 00:53:13,200
Would that be valid?

746
00:53:14,199 --> 00:53:18,199
Would that like maybe create a split?

747
00:53:18,199 --> 00:53:19,199
Yeah.

748
00:53:19,199 --> 00:53:22,359
That would create a split ring, right?

749
00:53:22,359 --> 00:53:26,599
Because it might get us to might just be petitioned from S1.

750
00:53:26,599 --> 00:53:28,399
And so now both are heads.

751
00:53:28,399 --> 00:53:30,199
And maybe both are processing commands.

752
00:53:30,199 --> 00:53:34,199
And that would be, you know, a violator.

753
00:53:34,199 --> 00:53:38,199
You know, basically, this sort of this whole property of I think the total order.

754
00:53:38,199 --> 00:53:40,199
We cannot have to do.

755
00:53:40,199 --> 00:53:44,199
And does this to even know that S1 is ahead?

756
00:53:44,199 --> 00:53:47,199
Because it just receives.

757
00:53:47,199 --> 00:53:51,199
You probably got it from the configuration information in previous time, right?

758
00:53:51,199 --> 00:53:56,199
Like when you know, configuration server decides on the new configuration that can tell all the servers and whatever.

759
00:53:56,199 --> 00:54:00,199
And the client that actually care, you know, here's the new configuration.

760
00:54:00,199 --> 00:54:05,199
Does this only happen when like S1 to S2 connection is separate or wait, what?

761
00:54:05,199 --> 00:54:08,199
So what causes the split brain again?

762
00:54:08,199 --> 00:54:13,199
The brain would happen if S2 on its own decided that S1 has failed and became the head.

763
00:54:13,199 --> 00:54:23,199
And so we're not a lot of that happen and the way actually the will work out in practice is that there is a configuration server that actually decides what is actually the current configuration.

764
00:54:23,199 --> 00:54:35,199
And so if it decides that S1 is dead, then it can import S2 and S3 saying like, hey, you guys are now the new chain and S2 is the head.

765
00:54:35,199 --> 00:54:40,199
And when that chain happens, so in this case, basically as one is dropped, nothing else has to happen.

766
00:54:40,199 --> 00:54:46,199
Because as through the only update that we lost is the one that actually was not committed anyway.

767
00:54:46,199 --> 00:54:50,199
So there's nothing to be repaired for.

768
00:54:50,199 --> 00:55:00,199
Or making this going from this setting from free replicas with the dropping the head is basically pretty straightforward operation.

769
00:55:00,199 --> 00:55:02,199
Okay.

770
00:55:02,199 --> 00:55:07,199
I have a question. So there's an assumption here, right?

771
00:55:07,199 --> 00:55:18,199
That like the commands that like leave S1 will arrive in order in S2.

772
00:55:18,199 --> 00:55:22,199
Is that like, is that a reasonable assumption for like?

773
00:55:22,199 --> 00:55:28,199
Well, I think with the way they, so they basically say, you know, we need a reliable five vote between S1 and S2.

774
00:55:28,199 --> 00:55:33,199
And S3. And I think the way they implemented that is probably using TCP connection.

775
00:55:33,199 --> 00:55:36,199
Okay.

776
00:55:36,199 --> 00:55:37,199
Thanks.

777
00:55:37,199 --> 00:55:40,199
Okay. So let's look at the second case.

778
00:55:40,199 --> 00:55:43,199
So we're half, you know, we get S1.

779
00:55:43,199 --> 00:55:46,199
You know, S2.

780
00:55:46,199 --> 00:55:54,199
S3. And of course, there could be more, you know, servers in the chain, but like, you know, free is enough for us to consider all the cases.

781
00:55:54,199 --> 00:55:59,199
And so now what we want to do to take the case, we're a minute one crashes.

782
00:55:59,199 --> 00:56:01,199
This one crashes.

783
00:56:01,199 --> 00:56:11,199
And so the configuration server at some point decides, yeah, S2 is crashed, you know, informs S1 and S3, you know, basically, they formed a new chain.

784
00:56:11,199 --> 00:56:16,199
And we're wondering about like, what else needs to happen?

785
00:56:16,199 --> 00:56:21,199
So we saw in the first case, the head drops, then nothing really has to be done other than updating the chain.

786
00:56:21,199 --> 00:56:27,199
Now we're updating the chain and the question is, does anything needs to happen?

787
00:56:27,199 --> 00:56:33,199
The S1 needs to send to S3 the request that it sent to us to, but didn't make it to S3.

788
00:56:33,199 --> 00:56:39,199
Yes, exactly. Right. So we have, you know, you won, you two, you three.

789
00:56:39,199 --> 00:56:44,199
This was guy had seen you won a you two. This guy had seen you won.

790
00:56:44,199 --> 00:56:58,199
And, you know, you two that's actually in progress, you know, and I got lost mass to basically S1 has to bring S3 up to date and basically forward it to you two and you three.

791
00:56:58,199 --> 00:57:01,199
Okay. So there's actually a little bit of working off.

792
00:57:01,199 --> 00:57:03,199
Let's consider the final case.

793
00:57:03,199 --> 00:57:05,199
The tail.

794
00:57:05,199 --> 00:57:09,199
So here we go again. We have three cases.

795
00:57:09,199 --> 00:57:13,199
It's one or three servers. That's two.

796
00:57:13,199 --> 00:57:16,199
And the third one is free.

797
00:57:16,199 --> 00:57:18,199
And, uh,

798
00:57:18,199 --> 00:57:23,199
and let's just say I showed the tail crashes.

799
00:57:23,199 --> 00:57:32,199
And so, at some point in time, the configuration server notices the sites that the new chain is going to be S1 and S2 tells S1 and then two that they're part of the new chain.

800
00:57:32,199 --> 00:57:37,199
And, uh, what else needs to happen?

801
00:57:37,199 --> 00:57:47,199
Well, let's write down. We know these guys have seen you won you two and you three. This guy has seen you won a YouTube.

802
00:57:47,199 --> 00:57:51,199
So who becomes the new tail in this scenario?

803
00:57:51,199 --> 00:57:53,199
S2.

804
00:57:53,199 --> 00:57:57,199
Yeah, studio becomes a new tail. And anything else that needs to happen?

805
00:57:57,199 --> 00:58:02,199
Um, I guess the client needs to be informed that S2 is the new.

806
00:58:02,199 --> 00:58:05,199
Yeah. I was on the client by learning from the configuration server.

807
00:58:05,199 --> 00:58:06,199
Correct.

808
00:58:06,199 --> 00:58:15,199
And so yeah, but nothing else has to happen. Right? Because, uh, the, all the committed, you know, the no committed operations are lost.

809
00:58:15,199 --> 00:58:24,199
Uh, and, uh, you know, and S3 were still in, uh, needs to still be extra propagated to S2 and I will be just happening.

810
00:58:24,199 --> 00:58:29,199
Okay. So dropping the tails. Also, regional stream. So dropping the tail in the head is a reasonable straightforward.

811
00:58:29,199 --> 00:58:33,199
Dropping the middle one is a little bit more complicated, but not much more complicated.

812
00:58:33,199 --> 00:58:49,199
And the key thing though, I want to sort of emphasize here is how does this compare to figure seven and eight in the raft paper?

813
00:58:49,199 --> 00:58:52,199
Maybe two. Yeah, go ahead.

814
00:58:52,199 --> 00:58:59,199
I saw a question. So, uh, so when I see the new field going into mint the entries that are in S2, I don't know.

815
00:58:59,199 --> 00:59:06,199
So don't we need to send the knowledge inspector the client saying that these new operations have been automatically committed?

816
00:59:06,199 --> 00:59:13,199
Uh, sorry. I didn't hear you. We're pretty, uh, we're pretty noisy connection there.

817
00:59:13,199 --> 00:59:24,199
So it's like, I was just saying that that's the new tail. Don't we have to send knowledge back to the client? There are some entries that have been automatically committed?

818
00:59:24,199 --> 00:59:30,199
Yeah, there might be the case that the, what, what happened is the client is probably going to retry, correct?

819
00:59:30,199 --> 00:59:36,199
And, uh, we have to have a separate due duplication scheme like in a Latvian anyway.

820
00:59:36,199 --> 00:59:44,199
And so there's probably a couple different ways about have to do it to figure something out particular clear which one it will take.

821
00:59:44,199 --> 00:59:56,199
Yeah, like in that case, then in the paper, just say like, you know, it might like, even if it doesn't respond that code or could not like have succeeded.

822
00:59:56,199 --> 00:59:58,199
Yeah.

823
00:59:58,199 --> 01:00:09,199
Okay, so back to my original question, which is like, you know, how does this contrast this picture of my, you know, my drawing picture here on this whiteboard, how does that contrast the figure seven and eight?

824
01:00:09,199 --> 01:00:11,199
Simply.

825
01:00:11,199 --> 01:00:27,199
Yeah, that's the key point now. Why don't they get across, right? These like, you know, there's not that many cases to consider a year, basically three cases, which is like slightly, you know, quite a bit simpler than the, in the case of the rap paper where you know, the many critics consider and the snares are quite complicated.

826
01:00:27,199 --> 01:00:38,199
Now part of that is because, you know, it's a chain, right? And again, things are pushed down in a very sort of straightforward manner down the replication chain.

827
01:00:38,199 --> 01:00:45,199
Part of that is, of course, you know, the configuration part is sort of outsourced through the configuration manager manager.

828
01:00:45,199 --> 01:00:55,199
But for the primary backup part of the recovery plan, that's a reasonable straightforward, you know, they're only three configurations to consider.

829
01:00:55,199 --> 01:01:12,199
And one more sort of point I want to make, which is like, you know, how to add a replica because any system, you know, that you're going to run for real, real, at some point you got a new one in because otherwise, you know, you're going to lose, you start to free, then you have to, then you have one and then you have zero and then you're on the bill.

830
01:01:12,199 --> 01:01:18,199
So, you know, you have to add new replica, so let's consider the case.

831
01:01:18,199 --> 01:01:22,199
And then, you know, we have S1, it is the head.

832
01:01:22,199 --> 01:01:32,199
And let's say we were in a scenario where, you know, we have S1 and S2, which the tail and basically we want to bring up, you know, S3.

833
01:01:32,199 --> 01:01:37,199
And that turns out, you know, as the paper described, that it was most convenient to actually do this.

834
01:01:37,199 --> 01:01:41,199
At the, at the tail end of it.

835
01:01:41,199 --> 01:01:54,199
And so the way that we proceed is like, so the client is here, it's talking to S2 because that's actually the current tail S3 comes up.

836
01:01:54,199 --> 01:02:01,199
And basically what the first thing it does is actually copies, you know, all the state from S3 to from S2 to S3.

837
01:02:01,199 --> 01:02:11,199
And so this may take hours, like we're, you know, tens of minutes or maybe in deep multiple hours, you're like we're copying, you know, bigger bites of data or terabytes of data from S2 to S3.

838
01:02:11,199 --> 01:02:17,199
But while that's happening, you know, S2 and S3, you know, S3 can just, you know, share requests.

839
01:02:17,199 --> 01:02:24,199
Of course, it does have to remember which ones are came in after, you know, S3 start copying.

840
01:02:24,199 --> 01:02:30,199
And so you can see the list of like all the updates that are sort of have happened, but they're have not been propagated to S3 yet.

841
01:02:30,199 --> 01:02:37,199
At some point S3 is done, you know, with all the copying and basically tells S2, okay, man, I'm ready to become the tail.

842
01:02:37,199 --> 01:02:40,199
I got all the state as to say.

843
01:02:40,199 --> 01:02:49,199
And so since an email, basically since email sends a message to S2 saying like, okay, I want to be detailed as to responses like, yeah, that's okay.

844
01:02:49,199 --> 01:02:54,199
But once you apply it all the updates.

845
01:02:54,199 --> 01:03:01,199
And so basically as to sense the updates and response to this, I want to go on the company.

846
01:03:01,199 --> 01:03:10,199
Tail requests, you know, you know, response to that to S3, S3 replies the updates and then becomes the tail.

847
01:03:10,199 --> 01:03:16,199
And you know, clients that we're talking to S2 and S2 can tell the client, you know, for now on, I'm not the tail anymore, you should talk to S3.

848
01:03:16,199 --> 01:03:19,199
And so they can swap, you know, the direction.

849
01:03:19,199 --> 01:03:26,199
And so that's the way to add replica into a chain.

850
01:03:26,199 --> 01:03:28,199
So question on this.

851
01:03:28,199 --> 01:03:36,199
Don't you run into this like infinite loop problem where S2 sends updates to S3 and when S3 is like updating, it's also serving more requests.

852
01:03:36,199 --> 01:03:40,199
And so that's more updates than is the send and goes back and forth.

853
01:03:40,199 --> 01:03:57,199
No, no, no, no, no, no, once S2 has sent the updates that S3 has not seen yet, you know, to S2 to S3, then from then on, it's normal chain replication whenever S2 gets a request, you know, an update from S1, you know, it forwards to S3.

854
01:03:57,199 --> 01:04:02,199
Right, but S3 can't become the tail until it is successfully processed all the updates.

855
01:04:02,199 --> 01:04:12,199
Oh, yeah, so once it sets up the TCP channel, basically S2 can just say like from once you have processed these guys, you can become the tail because you have seen everything.

856
01:04:12,199 --> 01:04:18,199
I mean, and everything else can be pipeline after that, right, in the same TCP channel.

857
01:04:18,199 --> 01:04:26,199
It could become the tail, right, right after, like even before it processed the update, right, as long as it doesn't serve requests.

858
01:04:26,199 --> 01:04:38,199
It does as long as doesn't serve requests exactly right it just has to process all the updates that S2 has received and S3 not once it's updated those then it become come to tail and start processing requests.

859
01:04:38,199 --> 01:04:44,199
I see so blocks like requests for a moment while it process updates.

860
01:04:44,199 --> 01:04:48,199
Exactly.

861
01:04:48,199 --> 01:04:53,199
Okay.

862
01:04:53,199 --> 01:05:07,199
Okay, so now, you know, I want to come back to basically questions a lot of people ask, you know, how this contrast to sort of, you know, how are the CR properties, you know, chain replication properties, how does it compare.

863
01:05:07,199 --> 01:05:15,199
Kind of wondered the good ask what are the good properties and mostly, you know, with respect to our comparison to raft.

864
01:05:15,199 --> 01:05:24,199
And of course, I got to say to of course, like the chain replication just influenced the primary backup scheme by not, you know, the configuration service.

865
01:05:24,199 --> 01:05:28,199
So we'll come back to that a little bit more in detail, but there are a couple things that we can know it's going to prefer.

866
01:05:28,199 --> 01:05:35,199
And we just compare sort of the way the radical works with the chain replication.

867
01:05:35,199 --> 01:05:42,199
And the first of all, you know, we can observe positive aspect of chain replication is that declined.

868
01:05:42,199 --> 01:05:47,199
I can see.

869
01:05:47,199 --> 01:05:57,199
So, you know, I'm going to split between between the head and the tail.

870
01:05:57,199 --> 01:06:07,199
So the load of actually serving any client operation that can be split actually between two of them, they don't have to all run through the leader as in raft.

871
01:06:07,199 --> 01:06:12,199
The head sends an update.

872
01:06:12,199 --> 01:06:28,199
What's so unlike in raft, where the head or the leader basically sends updates the log entries to every appear in this particular scheme actually it's only happened the head only sends one basically RPC.

873
01:06:28,199 --> 01:06:32,199
And so there's sort of fewer messages involved.

874
01:06:32,199 --> 01:06:41,199
Reads or career operations involve only.

875
01:06:41,199 --> 01:06:43,199
Only the tail.

876
01:06:43,199 --> 01:06:51,199
Correct. And in the raft, you know, the if you even implement the read only optimization, the read only optimization.

877
01:06:51,199 --> 01:07:06,199
And the voice having the read operation to go through the log and being dependent to all the walks of the peers, but it still requires that the leader actually context and majority of peers to decide whether it actually.

878
01:07:06,199 --> 01:07:11,199
The operation can be served.

879
01:07:11,199 --> 01:07:14,199
So another possibility aspect of this.

880
01:07:14,199 --> 01:07:24,199
This is a simple crash recovery, as we talked about.

881
01:07:24,199 --> 01:07:34,199
But you know, a major downside, you know, compared to sort of the raft scheme is that you know one failure.

882
01:07:34,199 --> 01:07:45,199
Required recovery duration.

883
01:07:45,199 --> 01:07:53,199
The reason that the recovery duration required is because like a right actually have to go through the whole chain.

884
01:07:53,199 --> 01:07:59,199
And so and then right cannot be knowledge until that every serve in the chain actually has process it.

885
01:07:59,199 --> 01:08:09,199
And that is actually slightly different correctly raft is you well know because soon as basically a majority the peers actually have accepted the particular right operation and a pen to their logs.

886
01:08:09,199 --> 01:08:17,199
And then you can just proceed. And so there's actually no interaction at all if like one server fails, for example.

887
01:08:17,199 --> 01:08:29,199
And if the remaining server still for the majority while chain replication if one server would fail, then you know somebody of the duration actually has to happen, which means there's going to be a short period of going to probably down top.

888
01:08:29,199 --> 01:08:35,199
Right. Does that make sense?

889
01:08:35,199 --> 01:08:45,199
Now, I want to make one more point, sort of in contrast, you know, to sort of the raft replication scheme is that this because the read operations involve only one server.

890
01:08:45,199 --> 01:08:55,199
There's a cool extension if you will that actually gets really high read performance. And so the basic idea is as follows.

891
01:08:55,199 --> 01:09:21,199
The basic idea is basically to split, you know, the split objects or they call volumes in the paper split the objects across multiple change.

892
01:09:21,199 --> 01:09:45,199
So instead of having one chain as I would have done in the previous reports, you know, we're going to have multiple chains. And so, for example, we might have a CH1 in chain one, you know, S1 is the head as to the middle guy and as free to tail in chain two.

893
01:09:45,199 --> 01:09:57,199
Yeah, we're going to rotate things around as to is the head as one is the where as free is the middle guy, whoops, as free is the middle guy and as one is to tail.

894
01:09:57,199 --> 01:10:25,199
And basically what we're going to do is we're going to split objects across these multiple chains. So the configuration server basically has a map, you know, saying like, you know, chart one objects and shared one go to chain one objects and share two go to chain two objects and start free, no go to chain free.

895
01:10:25,199 --> 01:10:40,199
And what is the cool part about it is that we have no multiple tails and we as one as retail for some chain as one is a tail for some chain, this too is a tail for some chain.

896
01:10:40,199 --> 01:10:56,199
And basically read operations for these different chains can now be completely executed in parallel. So if the read operations sort of hit all the different charge, sort of uniformly spread that basically, you know, the our read throughput is going to increase, you know, linearly with the number of tails that we have.

897
01:10:56,199 --> 01:11:00,199
And in this case, we have three tails, so we get three times the report.

898
01:11:01,199 --> 01:11:09,199
So we can basically sort of same as the so we get a little bit of the same properties that zookeeper hat where the read performs can be excellent, you know, it can scale with the number server.

899
01:11:10,199 --> 01:11:16,199
But we also get not only that we get the scale part, but we maintain the linear is ability.

900
01:11:17,199 --> 01:11:21,199
And in this scheme, we don't have to actually give up on linear is ability.

901
01:11:22,199 --> 01:11:32,199
So we get sort of two nice properties, namely, you know, good read performance in effect scaling with the number servers, at least for reads are two different to the chains.

902
01:11:33,199 --> 01:11:36,199
And we got actually, and we maintain linear is ability.

903
01:11:37,199 --> 01:11:44,199
Any questions about this.

904
01:11:49,199 --> 01:11:58,199
Sorry, in this case client, when they are deciding which chain to read from, would they be able to.

905
01:11:59,199 --> 01:12:05,199
To do it like to decide themselves or do they need to contact the configuration server to decide.

906
01:12:06,199 --> 01:12:11,199
Yeah, so that's a great question. So typically in the paper actually doesn't really say it's explicit about it.

907
01:12:11,199 --> 01:12:15,199
They talk about maybe talking through some proxy to the servers.

908
01:12:16,199 --> 01:12:19,199
What you will do in lap four is basically you will download the configurations.

909
01:12:19,199 --> 01:12:22,199
The configuration will include the sharp assignment.

910
01:12:23,199 --> 01:12:25,199
And you will download that from the configuration server.

911
01:12:29,199 --> 01:12:37,199
You need to be careful about how you ordered the servers and each of the chains prevent like a particular chain from being oversaturated or particular link between my two servers.

912
01:12:38,199 --> 01:12:42,199
Yeah, this, this, this, this scheme doesn't really take that into account.

913
01:12:43,199 --> 01:12:51,199
You can imagine like the configuration planner, the configuration manager have a sophisticated model of actually how the network is laid out and you know can be very careful about how to change or done.

914
01:12:52,199 --> 01:13:05,199
Maybe even charge more sharks to one chain a few of sharks to another chain all the stuff is principle possible right because the configuration can just manage, you can just compute anything it likes and basically says years the assignment.

915
01:13:07,199 --> 01:13:10,199
Thank you, I can even rebalance if it wants to.

916
01:13:11,199 --> 01:13:24,199
So the question I could you explain again how linearized bill is kept under this extension well, you know, nothing has really changed.

917
01:13:25,199 --> 01:13:27,199
We're still doing primary backup using a chain.

918
01:13:28,199 --> 01:13:36,199
And so, you know, we basically carry over the linearized ability from the single chain and that's it.

919
01:13:41,199 --> 01:13:45,199
This might be like speculative, but how this compared to.

920
01:13:46,199 --> 01:13:55,199
I guess maybe it's equivalent of just like having groups of servers for each like link instead of having reusing the same ones or not for each link but for each.

921
01:13:56,199 --> 01:14:05,199
Step in the chain so like s one is like three servers s two is three servers instead of reusing the same one and entering from different points.

922
01:14:06,199 --> 01:14:12,199
Yeah, well, what would be the advantage of that scheme that you imagine I mean just for scalability.

923
01:14:13,199 --> 01:14:27,199
Well also maintainer and linearized ability well, the reason that the scheme is attractive is that because they have an detail might have quite a bit of load but the middle guy does it and you know by having sort of this arrangement we spread the load across all servers.

924
01:14:29,199 --> 01:14:30,199
I see.

925
01:14:36,199 --> 01:14:37,199
Okay, good.

926
01:14:40,199 --> 01:14:42,199
So maybe I want to summarize here.

927
01:14:47,199 --> 01:14:50,199
And sort of talk a little bit about so we saw this approach one.

928
01:14:52,199 --> 01:14:53,199
Which we do lap one.

929
01:14:54,199 --> 01:15:03,199
Which we do in lap three, which is, you know, we run all the operations through raft and all the replication, you know, the sort of the configuration and the replication is all billed.

930
01:15:05,199 --> 01:15:08,199
And then we're using a raft and nothing else is involved.

931
01:15:09,199 --> 01:15:20,199
And then sort of this approach to, you know, which is the topic of this particular paper where, you know, there's a deviation server perhaps build using raft.

932
01:15:21,199 --> 01:15:33,199
Or packs of genuine and a primary backup replication scheme and primary backup using chain replication.

933
01:15:36,199 --> 01:15:52,199
And you can see you may hopefully, you know, there's a bit of a clear that there's some attractive properties to approach to in the sense that you can get scalable rep performance on the primary backups.

934
01:15:53,199 --> 01:16:07,199
Of course, not a configuration server because you know, it runs raft like, you know, you do in approach one. But you get at least, you know, maybe scalable rep performance for actually operations on the replicas of our on the primary background scheme like to put and get operations.

935
01:16:09,199 --> 01:16:17,199
And the other thing that is nice about this is that sort of the, if you have your data is very very large, you can have more specialized

936
01:16:17,199 --> 01:16:25,199
simulation or schemes to basically copy the state from one machine to another machine.

937
01:16:26,199 --> 01:16:33,199
And you know, the chain replication or any sort of primary backup scheme that sort of separated from the configuration server allows you to do that easily.

938
01:16:34,199 --> 01:16:46,199
And so it's quite common that, you know, the in practice, you know, people for a lot of products too, although it is also not impossible to actually use approach one for your replicated state machine, including the data.

939
01:16:47,199 --> 01:16:56,199
And so, you know, you can also do the operations, including server, using operations like, you know, put and get operations. And in fact, there's receiving lot free redo, but we'll see later a paper in the,

940
01:16:56,199 --> 01:17:04,199
you know, the physical spanner that actually uses, you know, packs this direction, you also do the operations.

941
01:17:05,199 --> 01:17:15,199
Any further questions here?

942
01:17:15,199 --> 01:17:23,199
I wish you all good luck on the midterm on Thursday, and I will see you in person, or virtually in person next week.

943
01:17:29,199 --> 01:17:36,199
And if you have any questions, please feel free to hang around and do my best to answer that.

944
01:17:36,199 --> 01:17:51,199
I have a question about something that you mentioned about raft. So you mentioned that all the leads have to go through the majority of servers, but I'm not quite sure I understand why because the leader has all committed entry.

945
01:17:52,199 --> 01:17:53,199
Yeah, there's two two schemes.

946
01:17:53,199 --> 01:18:13,199
If the leader, either you're running a situation where all reason rice are served by the leader, right, or, you know, there's a possibility to serve in principle, read operation for another peer, but then you have to contact the first and the majority of the service to make absolute sure that you have to last operation.

947
01:18:14,199 --> 01:18:20,199
Got it. So that that requirement is if we want to spread off the reads across every year.

948
01:18:20,199 --> 01:18:26,199
And we have to be more sophisticated and we cannot do it on our own because that would definitely bring in our ability.

949
01:18:28,199 --> 01:18:30,199
Right, but if everything goes to the leader, we don't know.

950
01:18:31,199 --> 01:18:39,199
Then you're golden correct, except you know, you have to do this trick where you have sort of an empty agreement at the beginning of every new term.

951
01:18:41,199 --> 01:18:43,199
Just to make sure that you actually are up to date.

952
01:18:45,199 --> 01:18:46,199
Okay, thank you.

953
01:18:46,199 --> 01:18:47,199
Thank you.

954
01:18:48,199 --> 01:18:53,199
Could you quickly go over again when you're adding a new server at the tail.

955
01:18:54,199 --> 01:19:01,199
So just to make sure I understand so essentially it starts this process for like popping all the data from s2 to s3.

956
01:19:02,199 --> 01:19:03,199
Yep.

957
01:19:03,199 --> 01:19:14,199
And then if it receives requests for any of that data while that's still happening, the next three is going to ask us to for anything that it still has directly and it's going to get it and then respond.

958
01:19:14,199 --> 01:19:15,199
Yep.

959
01:19:15,199 --> 01:19:21,199
And then it keeps doing that until it gets data that s2 no longer has and then it just goes live essentially.

960
01:19:22,199 --> 01:19:28,199
Yeah, well, you could do slightly differently. You know, you could actually have s3 could basically tell s2.

961
01:19:28,199 --> 01:19:45,199
So you can do s3 can become the leader or just sort of detail and basically don't process any common operations from the client yet until that has received the remaining operations from s2.

962
01:19:47,199 --> 01:19:49,199
Also, now case s2 is still the tail.

963
01:19:51,199 --> 01:19:53,199
Yeah, that's three gets everything.

964
01:19:53,199 --> 01:19:54,199
Yeah.

965
01:19:54,199 --> 01:19:55,199
Okay.

966
01:19:55,199 --> 01:19:56,199
Thank you.

967
01:19:56,199 --> 01:20:02,199
There's basically the paper and described one particular way of doing it. There's a couple of ways of doing it.

968
01:20:04,199 --> 01:20:11,199
But if you do that then, like how long do you wait to get everything.

969
01:20:13,199 --> 01:20:15,199
I think I also have the same contribution as someone else.

970
01:20:15,199 --> 01:20:18,199
You know, you know, you know, it went order the switches happening.

971
01:20:18,199 --> 01:20:19,199
Correct.

972
01:20:19,199 --> 01:20:21,199
So, for example, like s3.

973
01:20:21,199 --> 01:20:25,199
So s2 is, let's say, maybe has a big operation through 100.

974
01:20:25,199 --> 01:20:29,199
You start the copy operation is like with the snapshots and they're wrapped.

975
01:20:29,199 --> 01:20:34,199
You start the copy operation. So when the copy operation is done, s3 is up to date until 100.

976
01:20:34,199 --> 01:20:36,199
Right.

977
01:20:36,199 --> 01:20:40,199
Then, you know, maybe s2 already has done 10 more operations.

978
01:20:40,199 --> 01:20:43,199
So that has one one on one one on two and one on three.

979
01:20:43,199 --> 01:20:44,199
Right.

980
01:20:44,199 --> 01:20:48,199
And basically s3 can contact s2.

981
01:20:48,199 --> 01:20:50,199
Say, give me your remaining operations.

982
01:20:50,199 --> 01:20:54,199
And s2 says like, well, my remaining operations are 101 through 110.

983
01:20:54,199 --> 01:21:01,199
And as a side effect, you know, s3 also tells s2 will stop being the tail.

984
01:21:01,199 --> 01:21:05,199
And s2 responds with those operations.

985
01:21:05,199 --> 01:21:08,199
s3 applies those operation 101 through 110.

986
01:21:08,199 --> 01:21:12,199
And then tells client and mean time in this tail,

987
01:21:12,199 --> 01:21:21,199
but a does some process and you commence from client jet or read operation to client jet into with actually has process 101 through 110.

988
01:21:21,199 --> 01:21:22,199
Okay.

989
01:21:22,199 --> 01:21:23,199
Okay. I see.

990
01:21:23,199 --> 01:21:24,199
I see.

991
01:21:24,199 --> 01:21:25,199
Okay.

992
01:21:25,199 --> 01:21:26,199
That's.

993
01:21:26,199 --> 01:21:29,199
I was a question.

994
01:21:29,199 --> 01:21:30,199
Oh, sorry.

995
01:21:30,199 --> 01:21:32,199
No, go ahead.

996
01:21:32,199 --> 01:21:33,199
Go ahead.

997
01:21:33,199 --> 01:21:34,199
Okay.

998
01:21:34,199 --> 01:21:40,199
My question was a little similar to the extension that he talked about.

999
01:21:40,199 --> 01:21:46,199
I thought I thought about could you could you do a tree instead of a chain.

1000
01:21:46,199 --> 01:21:47,199
So.

1001
01:21:47,199 --> 01:21:49,199
Hi.

1002
01:21:49,199 --> 01:21:52,199
I think there's a.

1003
01:21:52,199 --> 01:21:55,199
There are other data structures possible.

1004
01:21:55,199 --> 01:22:00,199
I'm going to give example, you know, a number of people in email proposed that you could have like have s1.

1005
01:22:00,199 --> 01:22:08,199
Then you could have like s3, 3, 4, 5, all the intermediate ones, you know, s1 talks to them a parallel to all the intermediate ones.

1006
01:22:08,199 --> 01:22:12,199
They're talking all to the tail.

1007
01:22:12,199 --> 01:22:17,199
Is that what you mean with a tree?

1008
01:22:17,199 --> 01:22:26,199
I meant more of there would be like a number of leafs that would be at all roughly the same height.

1009
01:22:26,199 --> 01:22:28,199
So like a balanced tree.

1010
01:22:28,199 --> 01:22:34,199
And then the leaves will have like a chain going through them.

1011
01:22:34,199 --> 01:22:39,199
And I think that like linear stability can be broken here.

1012
01:22:39,199 --> 01:22:42,199
If you like.

1013
01:22:42,199 --> 01:22:54,199
I think harder about it, but it would have the nice property that you wouldn't like the now the propagation delay would be like logarithmic instead of linear as here.

1014
01:22:54,199 --> 01:22:56,199
And you could reach from all the leaves.

1015
01:22:56,199 --> 01:22:57,199
Yeah.

1016
01:22:57,199 --> 01:23:00,199
And then you know, you know, the leaves are dangerous, right?

1017
01:23:00,199 --> 01:23:09,199
Because they might have, you know, one client might have talked to another leaf earlier and the leaves might not be in sync.

1018
01:23:09,199 --> 01:23:12,199
So that sounds dangerous to me.

1019
01:23:12,199 --> 01:23:16,199
But maybe your your scheme is a little bit more sophisticated than I'm thinking.

1020
01:23:16,199 --> 01:23:24,199
The depth of the tree or the depth of the chain is really governed by the meantime to be failure.

1021
01:23:24,199 --> 01:23:32,199
If you're the meeting, if you typically run with free server free to five serves because that's good enough for your high availability.

1022
01:23:32,199 --> 01:23:39,199
And because you can, you know, we cover for four servers before the whole thing is down.

1023
01:23:39,199 --> 01:23:44,199
Then that really covers the depth of the chain.

1024
01:23:44,199 --> 01:23:50,199
And yeah, that we do some latency.

1025
01:23:50,199 --> 01:23:52,199
That makes sense here. Thank you.

1026
01:23:52,199 --> 01:23:54,199
Change will generally be short.

1027
01:23:54,199 --> 01:23:58,199
Right. Okay. Okay. That makes sense. Thanks.

1028
01:23:58,199 --> 01:24:06,199
Is this the only case where the hard chain would go down if all the servers in the chain went down?

1029
01:24:06,199 --> 01:24:08,199
Yeah.

1030
01:24:08,199 --> 01:24:11,199
Thank you.

1031
01:24:11,199 --> 01:24:14,199
So, you know, it's very, very dangerous.

1032
01:24:14,199 --> 01:24:21,199
How you like maintain the strong consistency when like S1, S2 and S3 can all do the read in this slide.

1033
01:24:21,199 --> 01:24:26,199
You get strong assistance you poor, share, per short or per object.

1034
01:24:26,199 --> 01:24:28,199
You know, that's sent to the chain.

1035
01:24:28,199 --> 01:24:37,199
So if you read, you write one object, you write object one, you read object one, all those operations are going to go through the same chain.

1036
01:24:37,199 --> 01:24:41,199
And so you get strong systems you forward that particular object.

1037
01:24:41,199 --> 01:24:46,199
Oh, God, it's, but it may not be the case that across all the objects we have strong consistency.

1038
01:24:46,199 --> 01:24:48,199
I don't know.

1039
01:24:48,199 --> 01:24:51,199
Let me hesitate on that.

1040
01:24:51,199 --> 01:25:01,199
Let me hesitate. I think, you know, that requires maybe more machinery.

1041
01:25:01,199 --> 01:25:06,199
What does that mean like across all the objects getting strong consistency?

1042
01:25:06,199 --> 01:25:11,199
You read right, I've get one, you read right object two.

1043
01:25:11,199 --> 01:25:16,199
And then some client, reader object one.

1044
01:25:16,199 --> 01:25:25,199
Are you going to get basically, you know, if you have a client that reads both objects, are you going to guarantee to see total order and linearize.

1045
01:25:25,199 --> 01:25:27,199
Serialized building.

1046
01:25:27,199 --> 01:25:30,199
And serialized bill is slightly different.

1047
01:25:30,199 --> 01:25:32,199
What's not talking about serialized bill.

1048
01:25:32,199 --> 01:25:36,199
We'll come back and we'll get to get that later in a couple of weeks.

1049
01:25:36,199 --> 01:25:41,199
And.

1050
01:25:41,199 --> 01:25:44,199
I'm asking to do actually make a commitment right now.

1051
01:25:44,199 --> 01:25:46,199
I need to think a little bit about it.

1052
01:25:46,199 --> 01:25:48,199
Okay. That's really good.

1053
01:25:48,199 --> 01:25:55,199
So the question is like, you know, you have consistency or linearized ability for a single client reading and writing.

1054
01:25:55,199 --> 01:25:57,199
But not for.

1055
01:25:57,199 --> 01:25:59,199
On multiple objects.

1056
01:25:59,199 --> 01:26:06,199
You have even multiple clients talking to this, you know, I'm doing operations on the same object, have strong linearized, have linearized ability.

1057
01:26:06,199 --> 01:26:07,199
Recognition scheme.

1058
01:26:07,199 --> 01:26:13,199
The question is, we have, you know, linearized ability across objects too.

1059
01:26:13,199 --> 01:26:16,199
But why is that important?

1060
01:26:16,199 --> 01:26:20,199
I don't see where, like, where that would be important.

1061
01:26:20,199 --> 01:26:22,199
Like.

1062
01:26:22,199 --> 01:26:25,199
Because you're, you're going to like.

1063
01:26:25,199 --> 01:26:28,199
You can't group operations, right?

1064
01:26:28,199 --> 01:26:31,199
So like a write and write or.

1065
01:26:31,199 --> 01:26:38,199
I mean, you read object one, you write object one, you read object one, then you read up to you write object to.

1066
01:26:38,199 --> 01:26:41,199
And, you know, the.

1067
01:26:41,199 --> 01:26:46,199
The question is, you know, in linearized ability, you know, those, those operations need to be told the order.

1068
01:26:46,199 --> 01:26:53,199
And they need to pursue a preserve this property off real time.

1069
01:26:53,199 --> 01:27:01,199
And since you're here, you have different chain that might not actually not have it, but I don't want to commit to no statement about it all across change.

1070
01:27:01,199 --> 01:27:08,199
You know, within the chain is actually guaranteed linearized ability, even if you have different objects.

1071
01:27:08,199 --> 01:27:14,199
There's something I don't understand on the paper, which is the update propagation invariant.

1072
01:27:14,199 --> 01:27:18,199
Where like, sort of the.

1073
01:27:18,199 --> 01:27:21,199
For in this order of the chain.

1074
01:27:21,199 --> 01:27:22,199
Yep.

1075
01:27:22,199 --> 01:27:28,199
And so, you know, like, commits are prefix of each successor's commits.

1076
01:27:28,199 --> 01:27:29,199
Yep.

1077
01:27:29,199 --> 01:27:35,199
Is that guaranteed after like a full pass has gone through the chain.

1078
01:27:35,199 --> 01:27:42,199
It's always true. Right. Like, you know, if you go back to this picture here.

1079
01:27:42,199 --> 01:27:48,199
I mean, the make up basically very simple observation, which is like, you see, you can find a good picture.

1080
01:27:48,199 --> 01:27:53,199
That probably scribbled over everything. So it's going to be maybe not as clean.

1081
01:27:53,199 --> 01:27:58,199
Basically what they're saying, like if you look at this figure, correct, that.

1082
01:27:58,199 --> 01:28:06,199
S3 always has a prefix with S2 and S2 always has a prefix with S1.

1083
01:28:06,199 --> 01:28:10,199
And that's the only thing of basically that invariance test.

1084
01:28:10,199 --> 01:28:11,199
Oh, the.

1085
01:28:11,199 --> 01:28:13,199
So I and J.

1086
01:28:13,199 --> 01:28:17,199
So the one out the successor is has the prefix of the predecessor.

1087
01:28:17,199 --> 01:28:20,199
And this is slightly compusing. I just realized that later.

1088
01:28:20,199 --> 01:28:23,199
I have to somebody else ask this question.

1089
01:28:23,199 --> 01:28:29,199
In the definition, the ice and jays are used to two different ways.

1090
01:28:29,199 --> 01:28:32,199
Well, not really different ways of one is a definition.

1091
01:28:32,199 --> 01:28:36,199
And one is actually the invariant.

1092
01:28:36,199 --> 01:28:40,199
And you're going to be a little bit careful.

1093
01:28:40,199 --> 01:28:43,199
The rules of ice and jays in the very other round.

1094
01:28:43,199 --> 01:28:44,199
Yeah, exactly.

1095
01:28:44,199 --> 01:28:47,199
Thank you.

1096
01:28:47,199 --> 01:28:50,199
You're welcome.

1097
01:28:50,199 --> 01:28:52,199
So.

1098
01:28:52,199 --> 01:28:54,199
Yeah, go ahead.

1099
01:28:54,199 --> 01:29:00,199
I was just going to ask what happens when you have like a network partition instead of a crash.

1100
01:29:00,199 --> 01:29:03,199
So if you go to like the crash slide.

1101
01:29:03,199 --> 01:29:06,199
What happens to the chain if there is a network partition.

1102
01:29:06,199 --> 01:29:11,199
So maybe ask something like a like S2 is actually still alive.

1103
01:29:11,199 --> 01:29:16,199
But there's a partition between the configuration manager and an S2 or something.

1104
01:29:16,199 --> 01:29:20,199
And so now both S1 and S2 are pointing to S3.

1105
01:29:20,199 --> 01:29:22,199
No, no, no, no.

1106
01:29:22,199 --> 01:29:24,199
Yeah, yeah, yeah.

1107
01:29:24,199 --> 01:29:25,199
Okay, there's going to be some.

1108
01:29:25,199 --> 01:29:30,199
I'm assuming what I think the papers are talking about this, but I assume that all configurations are numbered.

1109
01:29:30,199 --> 01:29:32,199
Like a view number.

1110
01:29:32,199 --> 01:29:39,199
And S3 will not accept any commands from S2 if the view numbers don't match.

1111
01:29:39,199 --> 01:29:42,199
Okay, got it. Thank you.

1112
01:29:42,199 --> 01:29:48,199
So related to that, one thing I couldn't figure out is even with like configuration numbers or something.

1113
01:29:48,199 --> 01:29:53,199
Yeah, how do you make sure that when you get rid of the tail and like the third scenario you've drawn.

1114
01:29:53,199 --> 01:29:59,199
Now that when you get rid of the tail that all the clients that might issue a read are aware that this old series no longer tell clients.

1115
01:29:59,199 --> 01:30:05,199
I think the way you would do it is that the configuration when the client download the configuration from the.

1116
01:30:05,199 --> 01:30:06,199
Configuration manager.

1117
01:30:06,199 --> 01:30:13,199
And every operating includes the view number and S3 will see hey, there's an old view number.

1118
01:30:13,199 --> 01:30:15,199
Don't talk to you about.

1119
01:30:15,199 --> 01:30:22,199
I guess when then does the clients talk the configurations over to get a new view number because I'm worried about the scenario where there's a client that has an old.

1120
01:30:22,199 --> 01:30:32,199
So for example, the S2 can just retry saying like retry and the client then go back to the configuration server and reread to the state.

1121
01:30:32,199 --> 01:30:38,199
I guess what I'm worried about is like S3 has been never partitioned away from the court from the coordinator.

1122
01:30:38,199 --> 01:30:42,199
And so the coordinator like gets rid of S3 from the tail and increases the version number.

1123
01:30:42,199 --> 01:30:52,199
But some client out there doesn't find out that the version numbers increase and still thinks S3 is the tail talks to S3 doesn't read meanwhile people are doing rights to S1 S2 and.

1124
01:30:52,199 --> 01:30:56,199
They haven't heard or haven't seen that basically.

1125
01:30:56,199 --> 01:31:02,199
Yeah, this is probably the reason why in the paper to go through the proxy.

1126
01:31:02,199 --> 01:31:03,199
I see.

1127
01:31:03,199 --> 01:31:08,199
Okay.

1128
01:31:08,199 --> 01:31:16,199
I have a question kind of going back to that like unanswered question about kind of like cross object.

1129
01:31:16,199 --> 01:31:20,199
So I think that's the only way to get the answer to that.

1130
01:31:20,199 --> 01:31:24,199
So I think that's the only way to get the answer to that.

1131
01:31:24,199 --> 01:31:26,199
So I think that's the only way to get the answer to that.

1132
01:31:26,199 --> 01:31:28,199
So I think that's the only way to get the answer to that.

1133
01:31:28,199 --> 01:31:30,199
So I think that's the only way to get the answer to that.

1134
01:31:30,199 --> 01:31:32,199
So I think that's the only way to get the answer to that.

1135
01:31:32,199 --> 01:31:34,199
So I think that's the only way to get the answer to that.

1136
01:31:34,199 --> 01:31:36,199
So I think that's the only way to get the answer to that.

1137
01:31:36,199 --> 01:31:38,199
So I think that's the only way to get the answer to that.

1138
01:31:38,199 --> 01:31:40,199
So I think that's the only way to get the answer to that.

1139
01:31:40,199 --> 01:31:42,199
So I think that's the only way to get the answer to that.

1140
01:31:42,199 --> 01:31:44,199
So I think that's the only way to get the answer to that.

1141
01:31:44,199 --> 01:31:46,199
No, I would end up in a couple of weeks.

1142
01:31:46,199 --> 01:31:47,199
Okay, okay.

1143
01:31:47,199 --> 01:31:48,199
It's going to be a big topic.

1144
01:31:48,199 --> 01:31:50,199
I basically have to do two actions.

1145
01:31:50,199 --> 01:31:52,199
Okay, that's good.

1146
01:31:52,199 --> 01:31:54,199
Yeah, thanks.

1147
01:31:54,199 --> 01:31:58,199
You might be going back to like the third slide.

1148
01:31:58,199 --> 01:31:59,199
Yep.

1149
01:31:59,199 --> 01:32:03,199
I think it was the third slide.

1150
01:32:03,199 --> 01:32:09,199
Maybe not fourth slide.

1151
01:32:09,199 --> 01:32:12,199
Oh, it's like sorry.

1152
01:32:12,199 --> 01:32:15,199
So I was a little bit confused when you mentioned like if

1153
01:32:15,199 --> 01:32:18,199
Lockholder failed an intermediate state stuff.

1154
01:32:18,199 --> 01:32:24,199
What exactly on this slide applies to Z-locks and what applies to the go locks again?

1155
01:32:24,199 --> 01:32:30,199
These are almost all statements about Z-locks.

1156
01:32:30,199 --> 01:32:33,199
So is the first statement that if the lockholder fails,

1157
01:32:33,199 --> 01:32:36,199
then the intermediate state is not cleaned up or is cleaned up?

1158
01:32:36,199 --> 01:32:38,199
No, it gets to do.

1159
01:32:38,199 --> 01:32:40,199
So if the intermediate state is visible,

1160
01:32:40,199 --> 01:32:42,199
but then generally if you have a leader election,

1161
01:32:42,199 --> 01:32:44,199
you could clean up the intermediate state.

1162
01:32:44,199 --> 01:32:47,199
That was just the point.

1163
01:32:47,199 --> 01:32:53,199
Oh, so with with go locks is that also not the case like if there's a machine that's holding a go lock.

1164
01:32:53,199 --> 01:32:55,199
That's doing stuff and then it.

1165
01:32:55,199 --> 01:33:00,199
Obstetting dies isn't still the intermediate state visible.

1166
01:33:00,199 --> 01:33:03,199
Okay, I think what I'm talking about is go locks, you know,

1167
01:33:03,199 --> 01:33:07,199
is something that's a statement about multiple threats running on the same machine.

1168
01:33:07,199 --> 01:33:20,199
And so if the go lock disappears because machine crashes on the threads are not machine crash too.

1169
01:33:20,199 --> 01:33:27,199
Right, but when you say that the intermediate state is visible to other people.

1170
01:33:27,199 --> 01:33:30,199
That's still true for go locks though, right?

1171
01:33:30,199 --> 01:33:34,199
You know, if they written persistent state to disk.

1172
01:33:34,199 --> 01:33:40,199
Or into some shared file system, but like no, the machine is gone, the disk is gone, everything's gone.

1173
01:33:40,199 --> 01:33:46,199
Oh, got it. Okay. So it's saying that the pers like the persistence like intermediate state is persistent.

1174
01:33:46,199 --> 01:33:49,199
The zookeeper intermediate state might be visible very often.

1175
01:33:49,199 --> 01:33:54,199
The leading the guy might have created some more files and those are visible now.

1176
01:33:54,199 --> 01:33:57,199
Okay, I see. Thank you.

1177
01:33:57,199 --> 01:34:04,199
So I just follow up on that. So it's the implication that if a go routine ever dies while holding the lock.

1178
01:34:04,199 --> 01:34:07,199
The entire go program must have died too.

1179
01:34:07,199 --> 01:34:15,199
And there's that you can never have a good go routine die holding a lot with that with and like have other parts of program continue with.

1180
01:34:15,199 --> 01:34:19,199
The go routine crashes, the application crashes.

