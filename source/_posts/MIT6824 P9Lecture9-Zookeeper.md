---
title: MIT6824 P9Lecture9 Zookeeper
---

1
00:00:00,000 --> 00:00:05,240
Good afternoon, good morning, good evening, good night, wherever you are.

2
00:00:05,240 --> 00:00:14,320
So today I want to talk about the zookeeper and the background, the paper that we, you know,

3
00:00:14,320 --> 00:00:19,359
was assigned for today, which is from 2010.

4
00:00:19,359 --> 00:00:23,760
And so this is going to be, we're going back in the last couple lectures.

5
00:00:23,760 --> 00:00:29,719
I think we dove in quite a bit of detail into draft, including sort of looking at code.

6
00:00:29,719 --> 00:00:36,439
So lectures from now on are going to be more conceptual and exploring ideas,

7
00:00:36,439 --> 00:00:39,560
the interested systems through papers.

8
00:00:39,560 --> 00:00:46,439
And the zookeeper one is particularly relevant to us because it has a little bit of a relationship

9
00:00:46,439 --> 00:00:49,079
as we'll see with lap three.

10
00:00:49,079 --> 00:00:53,480
So we'll allow us to talk about a little bit of some properties of lap three and particularly

11
00:00:53,480 --> 00:00:55,280
linearizability.

12
00:00:55,280 --> 00:00:59,519
But the zookeeper system, more importantly, is interesting because one, it's a white

13
00:00:59,520 --> 00:01:00,520
zoo system.

14
00:01:00,520 --> 00:01:16,000
And practice well beyond Apache, well beyond Yahoo, there's an open source Apache project

15
00:01:16,000 --> 00:01:19,120
that is still active.

16
00:01:19,120 --> 00:01:23,520
And what particularly was interesting about it for us in this lecture today is actually

17
00:01:23,520 --> 00:01:25,480
high performance.

18
00:01:25,480 --> 00:01:32,480
I mean, what's higher performance than what actually a lap three is going to be.

19
00:01:32,480 --> 00:01:36,760
And we'll talk a little bit of detail about this.

20
00:01:36,760 --> 00:01:39,800
And there's sort of two reasons why is high performance.

21
00:01:39,800 --> 00:01:47,680
One, the client operations are asynchronous.

22
00:01:47,680 --> 00:01:51,800
And really what high performance here means is that we can, the system can process many

23
00:01:51,800 --> 00:01:54,200
more operations per second.

24
00:01:54,200 --> 00:01:57,120
So it's really a throughput metric.

25
00:01:57,120 --> 00:02:01,879
And the second reason, you know, it's high performance is because it doesn't provide strong

26
00:02:01,879 --> 00:02:03,280
consistency.

27
00:02:03,280 --> 00:02:05,280
So it doesn't.

28
00:02:05,280 --> 00:02:10,920
It has an interesting consistency definition.

29
00:02:10,920 --> 00:02:16,719
And it gives us some freedom to execute this way, read operations on any replica and

30
00:02:16,719 --> 00:02:20,080
therefore reconforms can scale.

31
00:02:20,080 --> 00:02:23,879
Then the second aspect, you know, that is interesting from zookeeper is in addition to being

32
00:02:23,879 --> 00:02:35,879
high performance in sort of a generic what they call a coordination service.

33
00:02:35,879 --> 00:02:42,199
And the point being here is that there are many applications where you need to sort of

34
00:02:42,199 --> 00:02:47,039
keep track of like who's part of this cluster and who is the master.

35
00:02:47,039 --> 00:02:53,439
So think about the map reduce or think about the GFS, the master in GFS needs to keep track

36
00:02:53,439 --> 00:02:57,560
of like every chunk, you know, who are the servers that actually serve the brand that

37
00:02:57,560 --> 00:03:01,359
served the chunk of moon servers actually is the master.

38
00:03:01,359 --> 00:03:05,159
And so tracking that sort of configuration information, you know, comes up in lots of

39
00:03:05,159 --> 00:03:06,159
distributed applications.

40
00:03:06,159 --> 00:03:10,039
And zookeepers really designed, you know, to support that kind of thing.

41
00:03:10,039 --> 00:03:16,039
So you can sort of outsource all the configuration management to zookeeper and then, you know,

42
00:03:16,039 --> 00:03:22,120
focus the rest of your application development on other aspects of your distributed system.

43
00:03:22,120 --> 00:03:23,120
Not okay.

44
00:03:23,120 --> 00:03:27,719
So that's sort of a brief introduction, you know, the topics that we're going to be talking

45
00:03:27,719 --> 00:03:28,719
about.

46
00:03:28,719 --> 00:03:36,560
And as a usual, you know, feel free to interrupt at any time or something in the chat

47
00:03:36,560 --> 00:03:37,560
message.

48
00:03:37,560 --> 00:03:39,960
Let me actually pull up the chat.

49
00:03:39,960 --> 00:03:40,960
Okay.

50
00:03:40,960 --> 00:03:41,960
Good.

51
00:03:41,960 --> 00:03:50,759
So just to start from the basics, zookeeper is a replicated state change.

52
00:03:50,759 --> 00:04:03,639
In the same way, you know, the replicate state issues that we've been seeing.

53
00:04:03,639 --> 00:04:06,639
And so let's draw the usual picture.

54
00:04:06,639 --> 00:04:07,639
We have some service.

55
00:04:07,639 --> 00:04:11,840
In this case, it's going to be a zookeeper and a ZK.

56
00:04:11,840 --> 00:04:19,120
Now, it receives requests from clients that create the creators, you know, and basically

57
00:04:19,120 --> 00:04:27,480
the way it interacts to distribute these operations, it has sort of a separate library.

58
00:04:27,480 --> 00:04:31,920
You know, think about this as the graph library, the, you know, in our case, it's called

59
00:04:31,920 --> 00:04:32,920
ZAP.

60
00:04:32,920 --> 00:04:41,680
And basically, you know, the leader sticks the operation into, you know, the equivalent

61
00:04:41,680 --> 00:04:49,079
of the graph library that talks, you know, to, you know, other libraries on other peers.

62
00:04:49,079 --> 00:04:54,240
And then basically creates, you know, a log, you know, that's convinced with all these

63
00:04:54,240 --> 00:04:57,000
operations and all these machines.

64
00:04:57,000 --> 00:05:00,639
And then the operations are out of the log of feedback, you know, to the, through an,

65
00:05:00,639 --> 00:05:06,360
so in our case, the, the apply channel to the service, the service applies the operation

66
00:05:06,360 --> 00:05:07,360
in response to the client.

67
00:05:07,360 --> 00:05:11,519
And so we have basically different versions of this running.

68
00:05:11,519 --> 00:05:17,240
And so far, you know, in the labs, you know, we've been focusing mostly, you know, a lot

69
00:05:17,240 --> 00:05:24,000
of food is all about, you know, this part, implementing, in our case, raft, so instead

70
00:05:24,000 --> 00:05:25,000
of ZAP.

71
00:05:25,000 --> 00:05:30,280
And for the first order, at a very high level, you know, you can think about ZAP just being

72
00:05:30,280 --> 00:05:35,600
another raft, you know, providing sort of similar guarantees, although, you know, implemented

73
00:05:35,600 --> 00:05:36,600
quite differently.

74
00:05:36,600 --> 00:05:43,360
But, you know, it provides an order of all the operations, that it's spiked failures,

75
00:05:43,360 --> 00:05:47,600
network pickations, et cetera, et cetera, doesn't shop for first-blit drain, brain, all

76
00:05:47,600 --> 00:05:53,400
various sort of things that we sort of associate with the raft library.

77
00:05:53,400 --> 00:05:58,120
And you know, what we're going to be focusing in live free on is actually implementing a service

78
00:05:58,120 --> 00:05:59,120
in public.

79
00:05:59,120 --> 00:06:04,319
And so this paper talks about the Discordination service we keep going, we're going to

80
00:06:04,319 --> 00:06:12,560
actually implement in live free, a key value store.

81
00:06:12,560 --> 00:06:17,120
And the data structure is just a map, you know, from keys to values.

82
00:06:17,120 --> 00:06:22,879
And so the operations that we're going to be supporting are, you know, putting it, so

83
00:06:22,879 --> 00:06:27,160
the clients may put in get operations, you know, through the service, the service runs

84
00:06:27,160 --> 00:06:33,920
them through the raft, and then applies them one by one to the key value store.

85
00:06:33,920 --> 00:06:36,840
And in Zookyper, you know, the structures are slightly different, there's just a tree

86
00:06:36,840 --> 00:06:38,639
of Z nodes.

87
00:06:38,639 --> 00:06:44,759
But the base operation is the plan is the same, you know, the lower layer, the lab, the

88
00:06:44,759 --> 00:06:48,479
ZAP library or the raft library, or does all the operations, they're applied in the same

89
00:06:48,479 --> 00:06:54,360
order on all the replicas, because they're applied all in the same order, there's no non-determinism,

90
00:06:54,360 --> 00:06:58,439
the resulting state on each of the replicas is going to be identical.

91
00:06:58,439 --> 00:06:59,439
Okay.

92
00:06:59,439 --> 00:07:06,599
That's sort of the basic setting of this paper.

93
00:07:06,720 --> 00:07:14,520
And sort of also the part of the relationship between lab 3 and the Zookyper search itself.

94
00:07:14,520 --> 00:07:18,560
And mostly going to be talking in this lecture on focus on the Zookyper part itself, and

95
00:07:18,560 --> 00:07:22,720
not talk about ZAP, because there's going to assume, you know, that's sort of similar

96
00:07:22,720 --> 00:07:25,640
to what we're doing in lab 2.

97
00:07:25,640 --> 00:07:26,640
Okay.

98
00:07:26,640 --> 00:07:35,920
I want to talk a little bit about what kind of performance would you observe if you want

99
00:07:35,920 --> 00:07:41,960
to finish lab 3 and measure, you know, how many put in gets you operation, you can get

100
00:07:41,960 --> 00:07:47,319
through percept, because like one of the achievements of this paper is this high performance.

101
00:07:47,319 --> 00:07:50,080
So let's think a little bit about that.

102
00:07:50,080 --> 00:07:54,879
So let's assume, you know, there's a put operation coming in.

103
00:07:54,879 --> 00:07:56,560
And you know, put a variation comes in by the leader.

104
00:07:56,560 --> 00:07:59,560
And so we're just going to go for the normal case, like the standard case where everything

105
00:07:59,560 --> 00:08:03,160
is working, no network failure, no petition, nothing, everything works out perfectly.

106
00:08:03,720 --> 00:08:06,840
Here's the leader, you know, we got two followers.

107
00:08:09,480 --> 00:08:13,960
And you know, just by now, you know, that protocol, you know, probably insight out, you know,

108
00:08:13,960 --> 00:08:18,720
the first thing of course, it happens, like you would call the leadical start, the start

109
00:08:18,720 --> 00:08:26,560
actually writes the put operation to its to the log in the leader.

110
00:08:26,560 --> 00:08:31,600
And then the leader, you know, propagates its log to the other followers.

111
00:08:31,600 --> 00:08:37,519
And so before that actually happens in parallel, let me draw this slightly differently.

112
00:08:40,000 --> 00:08:46,720
Basically it launches a bunch of RPCs almost instantaneously to the different followers.

113
00:08:46,720 --> 00:08:51,040
It's fallen, of course, you know, well, a penalty entry to its log, so that it requires

114
00:08:51,040 --> 00:08:56,000
a right, you know, to just install it, same thing here, and then they respond back.

115
00:08:56,960 --> 00:08:59,039
And so here's the response back.

116
00:08:59,039 --> 00:09:04,720
And in this case, you know, if a majority has responded, the leader can actually apply the operation.

117
00:09:04,720 --> 00:09:08,799
So the leader will actually apply the operation here for not indicated.

118
00:09:09,840 --> 00:09:14,480
So do the put and send the response back to the client.

119
00:09:15,200 --> 00:09:21,279
And so what we're curious about is like how many puts, puts per second can we actually get, you know,

120
00:09:21,439 --> 00:09:25,279
in this, in this setting.

121
00:09:26,240 --> 00:09:31,120
And I know we'll think about it in the, in when you're just going to cross groups,

122
00:09:31,120 --> 00:09:32,720
you know, back at the envelope calculation.

123
00:09:32,720 --> 00:09:37,839
We don't really care exactly about the exact numbers, but, you know, one round trip,

124
00:09:39,279 --> 00:09:41,679
we need one of these one round trip to actually get the majority.

125
00:09:41,679 --> 00:09:45,120
Right, the leader needs to talk to one, these one followers actually maintain the majority.

126
00:09:45,120 --> 00:09:47,759
So we're going to have at least one round trip messaging.

127
00:09:51,679 --> 00:09:59,600
And then you sort of need to look at the rights to stable storage, because those tend to be expensive.

128
00:09:59,600 --> 00:10:02,240
And we'll see, you know, in this case, we're going to have two rights.

129
00:10:02,240 --> 00:10:05,199
But there's going to be one right at the leader is one right at the follower.

130
00:10:05,199 --> 00:10:08,480
At that point, we have at least two nodes that have a copy.

131
00:10:08,480 --> 00:10:10,000
So one of the things will be committed.

132
00:10:11,839 --> 00:10:13,120
If no, for failures.

133
00:10:14,000 --> 00:10:18,480
And so, basically, you know, to a minimum, we're going to need two rights.

134
00:10:18,480 --> 00:10:24,080
So that sort of debates and the best you could do, right, at least in this sort of the simple scheme

135
00:10:24,080 --> 00:10:25,920
that we discussed here.

136
00:10:25,920 --> 00:10:28,800
And sort of know what we can think about like the cost is.

137
00:10:28,800 --> 00:10:34,320
And in a round trip, you know, maybe you're just running into data center networks or not across the internet.

138
00:10:34,320 --> 00:10:37,279
You know, maybe you get all that actually comes down to one millisecond.

139
00:10:37,279 --> 00:10:43,120
We're roughly in the neighborhood of a millisecond, maybe a little bit faster,

140
00:10:43,120 --> 00:10:44,240
but we're going to care about it.

141
00:10:44,240 --> 00:10:45,200
We'll see in a second.

142
00:10:45,200 --> 00:10:47,759
So we're going to do two rights to stable storage.

143
00:10:48,720 --> 00:10:51,439
And rights actually, two stable storage, tend to be expensive.

144
00:10:51,439 --> 00:10:56,000
And you know, it depends on what medium or what technology you're using for stable storage.

145
00:10:56,000 --> 00:10:59,439
But let's assume that we're using SSDs, sort of pretty typical.

146
00:10:59,439 --> 00:11:03,200
And then, you know, presumably one right is in the order of maybe two milliseconds.

147
00:11:03,200 --> 00:11:07,200
You know, we've got to really make sure actually the right ends up on the in the SSD.

148
00:11:07,200 --> 00:11:09,919
So we've got to probably have to be a synchronous right.

149
00:11:10,879 --> 00:11:13,759
So a minute means like two milliseconds for one right.

150
00:11:13,759 --> 00:11:16,960
You know, so two right would be roughly, you know, four milliseconds.

151
00:11:18,240 --> 00:11:20,080
So we add it up.

152
00:11:20,080 --> 00:11:21,759
You know, that's going to be five milliseconds.

153
00:11:24,240 --> 00:11:25,919
And so how many operations per second?

154
00:11:28,080 --> 00:11:29,439
Just to see if anybody's still awake.

155
00:11:33,759 --> 00:11:34,799
So 100.

156
00:11:34,799 --> 00:11:37,439
Yeah, so there's going to be 200 puts per second.

157
00:11:40,960 --> 00:11:41,919
Any questions about this?

158
00:11:41,919 --> 00:11:42,639
Does this make sense?

159
00:11:43,120 --> 00:11:48,639
Okay. So now let's look at the shoe keeper.

160
00:11:48,639 --> 00:11:51,039
What's the round trip or in the rights?

161
00:11:51,039 --> 00:11:52,159
I'm sorry, I missed it.

162
00:11:53,919 --> 00:11:56,879
We have the four main the rights and the rights is no round trip.

163
00:11:56,879 --> 00:11:59,519
There's one round trip correct to talk from the leader to the follower.

164
00:11:59,519 --> 00:12:02,480
And the two rights, one at the stable storage for the leader.

165
00:12:02,480 --> 00:12:05,519
And one at the stable storage, stable storage of the follower.

166
00:12:07,279 --> 00:12:09,120
And the two rights add up to four.

167
00:12:09,120 --> 00:12:11,840
The round trip to roughly one milliseconds or the total five.

168
00:12:12,720 --> 00:12:13,759
milliseconds for one put.

169
00:12:17,199 --> 00:12:19,120
Okay, let's look at the shoe keeper.

170
00:12:27,919 --> 00:12:31,600
And again, the metric that the paper is interested in is the fruit,

171
00:12:31,600 --> 00:12:34,799
the fruit metric where basically declines, you know, many, many, many,

172
00:12:34,799 --> 00:12:39,679
clients and the pump, you know, many requests

173
00:12:40,479 --> 00:12:46,399
to two shoe keeper as much as possible and

174
00:12:47,359 --> 00:12:49,199
piped line democraciously.

175
00:12:49,919 --> 00:12:54,239
And so, so let's see what the results of that is.

176
00:12:54,879 --> 00:13:00,239
And so let me pull up the graph of the paper.

177
00:13:04,240 --> 00:13:07,759
And you know, let's look at that paper a little, let the graph a little bit.

178
00:13:10,239 --> 00:13:15,120
So a couple things that presumably to observe, you know, on the x-axis is the percentage of

179
00:13:15,120 --> 00:13:20,079
read requests that we'll see in a second period of this is going to be important to distinguish

180
00:13:20,079 --> 00:13:23,759
read from right operations. And so right operations are really operations that modify

181
00:13:23,759 --> 00:13:26,079
any right operation that modify to state.

182
00:13:26,079 --> 00:13:29,199
And read operations are operations that don't modify to state at all.

183
00:13:29,199 --> 00:13:34,879
So in our, in the three terms, you know, put would be in a right operation and get the read

184
00:13:35,360 --> 00:13:39,840
operation. And on the y-axis is the number operations per second.

185
00:13:39,840 --> 00:13:42,159
And let's look at the case of free servers.

186
00:13:42,159 --> 00:13:48,480
And so the first thing you're going to notice is that at zero reach, so only right operations.

187
00:13:48,480 --> 00:13:56,320
So the ones that modify to state, you know, we get, you know, roughly 21,000 operations per

188
00:13:56,320 --> 00:14:03,600
second as fruit put. All right. And, you know, we look at, you know, if the system only has reads,

189
00:14:04,159 --> 00:14:10,159
I'd actually get a lot more, you know, it gets up in the, you know, whatever, the 67-year region.

190
00:14:10,960 --> 00:14:13,680
And in fact, what really was going on is that the number reads,

191
00:14:14,800 --> 00:14:17,519
what it proof puts into read just scales with the number of search.

192
00:14:25,519 --> 00:14:31,600
So if you're a free server, you know, you get three times, you know, the read

193
00:14:31,600 --> 00:14:36,720
performance of one server. If you have five server, you get near the five times the read

194
00:14:36,720 --> 00:14:40,720
performance of one server. There's of course not truly right, great. Like in fact, if you look at

195
00:14:40,720 --> 00:14:47,440
this graph, you see that if with more servers, the right performance actually goes down. And,

196
00:14:47,440 --> 00:14:53,120
you know, the reason for that is, usually, the leader has to do chat with more servers to actually

197
00:14:53,120 --> 00:14:59,360
get some operation through. And so when we're purely doing right operations, we're actually

198
00:14:59,360 --> 00:15:03,519
limited. And we cannot get to expect more performance than the single server. In fact, the adsor

199
00:15:03,519 --> 00:15:10,720
are going to go down for us. And so just 21,000 per second, even for a single,

200
00:15:12,960 --> 00:15:18,639
for, you know, right operations, we have a configuration of free server, it's an impressive number.

201
00:15:18,639 --> 00:15:23,920
It's quite a bit higher than actually the simple calculation of calculus that we did for a lot of

202
00:15:23,919 --> 00:15:27,679
free. You know, a lot of free will never get in that, will now get close in the neighborhood at all.

203
00:15:29,120 --> 00:15:34,479
And so, you know, we want to understand, you want to see in this design, what the design

204
00:15:34,479 --> 00:15:44,799
does do to actually get that kind of performance. And so two, as I mentioned earlier, there's two PIDs,

205
00:15:45,919 --> 00:15:53,679
one, everything is asynchronous or declines, can submit many operations to raft or

206
00:15:54,240 --> 00:16:01,039
zookeepers in a single shot. So they're all pipelines. So basically, when doing the way to think about

207
00:16:01,039 --> 00:16:06,639
the zookeeper client, basically says, please start executing this foot and doesn't wait in the response

208
00:16:07,759 --> 00:16:12,639
of the foot. I just, you know, nearly issues the second foot and then the third and the fourth and the fifth.

209
00:16:12,639 --> 00:16:16,639
And so, for example, a lot of these foot run will be batched all together. Maybe even in a single

210
00:16:16,639 --> 00:16:22,079
messes, I'll be transferred to the leader and the leader will apply them all at the same time.

211
00:16:23,040 --> 00:16:27,200
And in fact, it will leader will write to the persistent storage only once, you know, for just

212
00:16:27,200 --> 00:16:32,720
whole batch of operations. So instead of having one write per operation, you're going to have one

213
00:16:32,720 --> 00:16:37,200
disk write through many, many, many operations. And this is one reason, you know, they get this,

214
00:16:38,160 --> 00:16:45,200
you know, very good performance on write operations. And then the second thing is, they do something

215
00:16:45,200 --> 00:16:52,320
special for read operations. They allow read operations to be processed by any server.

216
00:16:57,120 --> 00:17:03,120
So instead of running all the operations through the leader, they allow operations to actually be

217
00:17:03,120 --> 00:17:10,319
processed by any server. So, and then the letter, when I want to talk a little bit more about it.

218
00:17:10,799 --> 00:17:15,839
And I think I wanted to just think about, you know, could we do something similar? Like, let's say we

219
00:17:15,839 --> 00:17:24,000
want to do a lot for you. And we're going to do the same trick. And we want to look at the lab,

220
00:17:24,639 --> 00:17:33,519
basically reads from any machine or any peer mechanism.

221
00:17:36,720 --> 00:17:39,519
So the picture would be in his follows. We have a leader.

222
00:17:40,799 --> 00:17:44,639
We have the two followers. We just stick to the case of three.

223
00:17:47,039 --> 00:17:54,240
And we have a client. And we're going to consider what actually could happen.

224
00:17:55,439 --> 00:17:59,359
If, you know, we sort of leave, we follow this strategy where we're going to read from anything.

225
00:17:59,359 --> 00:18:04,159
So here's our client. The leaders actually, you know, when we do boots, you know, they all go through

226
00:18:04,159 --> 00:18:09,839
this leader. And so the client, you know, basically does a read. And let's say, you know,

227
00:18:09,839 --> 00:18:15,599
this was a read put was done. And at the same time, we're roughly after the after the put was done,

228
00:18:15,599 --> 00:18:21,599
the client issues a get. And it talks to one of the followers, you know, arbitrary one. Let's say

229
00:18:21,599 --> 00:18:28,559
use for this case. It does not talk to the leader. And then, you know, we're the follower response.

230
00:18:29,119 --> 00:18:32,639
And the question is like, what value does the get observed?

231
00:18:35,199 --> 00:18:38,959
So what is the possible values, you know, that the get can observe. Now, let's say that, you know,

232
00:18:38,960 --> 00:18:46,640
we're reading whatever the key X and the initial value of X is zero. And this put actually put X to one.

233
00:18:48,240 --> 00:18:53,039
And what are the values that get can actually return in if we don't do anything, particularly special.

234
00:18:56,480 --> 00:19:01,279
I'm so just a question here about this setup. So if we're assuming that draft is the infrastructure

235
00:19:01,279 --> 00:19:06,400
here and guess it's just another command, then wouldn't there a follower just redirect the client to

236
00:19:06,400 --> 00:19:12,160
the leader with the get request for the leader? No, no, so the goal is correct. We can do that.

237
00:19:12,160 --> 00:19:17,519
There's a lot of things we could do, but like we want to get this perfect scalability. So to get

238
00:19:17,519 --> 00:19:22,960
perfect scalability, the follower cannot talk to the leader for read operation. So basically read

239
00:19:22,960 --> 00:19:28,880
operations are executed by the individual followers immediately without no communication.

240
00:19:28,880 --> 00:19:32,320
Because that's the way we're going to get perfect scalability. Well, I say so they're not even

241
00:19:32,319 --> 00:19:37,839
communicating with. Yep, I'm just doing the needs plan. Like I said, like our goals to get perfect

242
00:19:37,839 --> 00:19:42,799
scalability like no zookeeper does. And we want to understand like, you know, it's that difficult or

243
00:19:42,799 --> 00:19:47,279
easy or what does that really mean. And so the first thing in a five experiment is like we do

244
00:19:47,279 --> 00:19:52,639
absolutely nothing at the leaders at the followers, the followers get the read operation to execute it

245
00:19:52,639 --> 00:19:57,839
and return the value. And what can you know, and then the question is what values can be returned by

246
00:19:58,319 --> 00:20:04,879
again, the client of germ in this picture? Can be either because maybe they put

247
00:20:04,879 --> 00:20:10,879
then they make it through the desk of the leader yet. Yeah, so it could be either going to return

248
00:20:10,879 --> 00:20:18,000
zero or it could return a month. So it can return stale data. It's a possibility.

249
00:20:18,319 --> 00:20:27,680
Let's say, you know, we do the let's say it returns one. So this gets returns one years for

250
00:20:27,680 --> 00:20:35,200
a five experiment. And then the client does another yet. I'm not going to really say to where that

251
00:20:35,200 --> 00:20:45,840
gap is going. But you know, and what values could we see from response and that gap?

252
00:20:46,880 --> 00:20:51,680
Assuming there are no other rights, it should be a one, right? Yeah, unfortunately,

253
00:20:52,400 --> 00:20:54,960
because I have free servers. If I had five servers,

254
00:20:55,680 --> 00:21:09,600
why is it different? Okay, let's make it different. So certainly, can return one, right?

255
00:21:09,600 --> 00:21:14,960
That's where we're agreeing that because if the follower talks to the second get request, you know,

256
00:21:15,680 --> 00:21:22,160
talks to a follower that actually has seen the boot operation, which the majority of them

257
00:21:22,160 --> 00:21:26,960
have seen the boot operation, we're going to get a one back, correct? And the real question is,

258
00:21:26,960 --> 00:21:36,800
could it see a zero? Even though the juror of the one earlier. I mean, could see a zero, even in the

259
00:21:36,800 --> 00:21:41,440
case of three servers, right? Because let's say that you have the majority of servers. Okay,

260
00:21:41,440 --> 00:21:49,360
let me do a first to five case because it's simpler to see. Are we assuming that the client always

261
00:21:49,359 --> 00:21:55,119
asks the same peer? Or no, or there might be a little network petition or a disconnection for

262
00:21:55,119 --> 00:21:59,359
a brief period of time. So, you know, now we have to talk to the same peer as the last time, right?

263
00:22:00,079 --> 00:22:06,799
Yeah, so in that case, it can talk to a different peer and that peer may respond with zero.

264
00:22:06,799 --> 00:22:12,079
And that's exactly so this is possible. So, you know, we're going to have to sort of strange

265
00:22:12,079 --> 00:22:17,359
behavior, correct? And discrimination where you might see a recent, you know, in the first case,

266
00:22:17,359 --> 00:22:21,279
you might see actually a recent value. And then we read actually something from back, you know,

267
00:22:21,279 --> 00:22:35,119
back in time. Yeah. So, we're doing nothing special. And you just like naively read from any

268
00:22:35,119 --> 00:22:38,639
peer, then, you know, we're have sort of two set of types of problems. The get can return

269
00:22:38,640 --> 00:22:48,240
scale data and the get can return a data you from back in time. And so, sorry, wasn't this possible

270
00:22:48,240 --> 00:22:53,200
also with three followers because the majority was the leader and one follower and you could ask the

271
00:22:53,200 --> 00:23:01,280
other one. If you've seen the one in, yes, it could be possible. Absolutely. The three would be

272
00:23:01,279 --> 00:23:04,399
possible too. I think we five is just much more clear that this is possible.

273
00:23:09,519 --> 00:23:16,000
Okay, so, so then we're going to go back and sort of think about literally the disbehavior,

274
00:23:16,000 --> 00:23:22,240
correct? You know, returning those values is that okay? And this is a very interesting question.

275
00:23:22,240 --> 00:23:27,599
And it depends of course, like what you mean with correctness. And what, you know,

276
00:23:27,679 --> 00:23:32,079
something is okay, it depends on like what our correctness definition is. And the correctness

277
00:23:32,079 --> 00:23:35,439
definition that we should have been pedaling, you know, for the last couple lectures or

278
00:23:35,439 --> 00:23:39,119
like since the beginning of the term is this notion of linearizability.

279
00:23:45,839 --> 00:23:51,919
And it roughly, but that means we talked a little bit about it in the, you know,

280
00:23:51,920 --> 00:23:54,720
a week ago, you know, behaves like a sort of a single machine.

281
00:23:57,440 --> 00:24:01,519
And that's the intuition that we've been using since the beginning of the semester.

282
00:24:03,279 --> 00:24:06,480
But, you know, the definition of linearizability is a little bit more precise.

283
00:24:07,600 --> 00:24:11,680
In terms of tries to nail down what it means to behave like a single machine. And so,

284
00:24:11,680 --> 00:24:15,120
when something behaves like a single machine, in a first of all, we're going to have to be the case

285
00:24:15,120 --> 00:24:19,360
that even if the operation actually could concurrently, you can sort of order them in a total order.

286
00:24:20,319 --> 00:24:26,000
So, it's possible to construct the total order of all the operations because in the end,

287
00:24:26,000 --> 00:24:30,240
it's a single machine. So, it behaves as a single machine. There's only one machine, sort of

288
00:24:30,240 --> 00:24:36,159
virtual machine that can actually perform the operation. So, the total order order, well, ops.

289
00:24:37,439 --> 00:24:43,839
And there has to be some properties true about that total order. And so, one property that has to be

290
00:24:43,839 --> 00:24:54,799
true is that the order matches real time. And real time, really, what I mean is that even operation

291
00:24:54,799 --> 00:25:03,199
completed before another one started, then that first operation has to go before the second operation

292
00:25:03,199 --> 00:25:12,559
in the total order. And then there's a third property that the read operation, read ops returns,

293
00:25:14,159 --> 00:25:16,159
value of last write.

294
00:25:23,519 --> 00:25:27,359
And that's sort of the official definition of linearized ability. And you can just think about this as

295
00:25:27,359 --> 00:25:34,240
sort of a more precise statement of this kind of first thing, this intuition, namely the whole thing

296
00:25:34,240 --> 00:25:42,079
behaves like a single machine. Now, we want to go back and think a little bit about the scenarios

297
00:25:42,079 --> 00:25:48,000
that we have just on this whiteboard, namely these two cases of stale data and back in time,

298
00:25:48,000 --> 00:25:51,679
I think about that thinking whether linearized ability allows that.

299
00:25:53,599 --> 00:25:58,879
And so, let's first focus on the first one. So, we have a client one, quickly for you, the way you

300
00:25:58,879 --> 00:26:04,240
would draw this out and reason about linearized ability is you draw a diagram from this form,

301
00:26:04,240 --> 00:26:09,279
where the left bar is to start up the operation, the right bar is the acknowledgement through the

302
00:26:09,279 --> 00:26:14,000
client that the operation X being executed. And in this case, we're sort of saying where's a

303
00:26:14,000 --> 00:26:21,440
put to X and that put the value one. And then we had another client, or in the same client,

304
00:26:22,000 --> 00:26:27,759
let's do it draw another client, that basically did the read and the read started well past

305
00:26:28,399 --> 00:26:35,119
the put operations where there's a get of X. And we have one case where the get of X actually

306
00:26:35,119 --> 00:26:42,159
returned to zero, right? That was the first process possible. And so that's what actually happened

307
00:26:42,159 --> 00:26:46,799
on the previous board. And now we want to sort of think about this, is this execution allowed by

308
00:26:46,799 --> 00:26:51,359
linearized ability? This is the correctness definition that we're looking for. And we want to see

309
00:26:51,359 --> 00:26:57,279
this execution, this order of operations that happened in practice, you know, at least we have

310
00:26:57,279 --> 00:27:01,199
seen that as possible in practice, is this allowed by linearized ability? And that's our correctness

311
00:27:01,360 --> 00:27:06,480
criteria. In, this is allowed by linearized ability.

312
00:27:12,000 --> 00:27:20,559
No. No, why not? Well, because the C2 client operation started after the C1 completed. So in the

313
00:27:20,559 --> 00:27:26,559
total order, you have to have put X1 and get X and H1 because it should read the last way.

314
00:27:27,039 --> 00:27:31,039
Yep. So basically in the total order that you construct, you know, this guy, you know,

315
00:27:31,039 --> 00:27:37,599
this operation must be after that operation because it started later. But then you look, you know,

316
00:27:37,599 --> 00:27:42,240
that violates rule number three, correct? That the operation returns the value of the last

317
00:27:42,240 --> 00:27:46,720
right. That's actually not the case. So that's the return to the earlier value. So this is not linearized

318
00:27:46,720 --> 00:27:55,440
ability. Does that make sense? And of course, this totally matches our intuition, right? Because

319
00:27:55,840 --> 00:27:59,440
an single machine just could not have happened, you know, your road of value to, you know,

320
00:27:59,440 --> 00:28:03,039
the single machine and then you're headed back. And it's certainly another value, it's actually

321
00:28:03,039 --> 00:28:08,960
previous value. So this is not a lot. Okay, let's do a second one like our other example. So we had

322
00:28:08,960 --> 00:28:15,200
a client one again, just put and I'm going to draw a little bit more compact because I don't have

323
00:28:15,200 --> 00:28:24,000
much space. And you know, we do a put then we do there's the read where to get, get the room to

324
00:28:24,000 --> 00:28:29,279
room's one. So we're not in the first case, but in the second and we're in another case. And then

325
00:28:30,480 --> 00:28:39,519
we have to get the returns zero. And so that's the second sort of case that we looked at, correct,

326
00:28:39,519 --> 00:28:44,960
that this and this picture, you know, the back and tie case. And again, we can ask ourselves the same

327
00:28:44,960 --> 00:28:49,039
question. Is this allowed by linearizability?

328
00:28:53,519 --> 00:28:58,799
No, because the read wouldn't be returning the audio the last break.

329
00:28:58,799 --> 00:29:02,960
Yeah, yeah, it's a pretty straightforward documentation, correct? This is absolutely not the case.

330
00:29:02,960 --> 00:29:06,720
In fact, it's almost simpler in the first case because like even these operations have to be in

331
00:29:06,720 --> 00:29:11,759
this order, but you know, the, you know, the, you know, could not have happened, but it violates

332
00:29:12,480 --> 00:29:19,359
rule free, correct? Okay, good. So you know, this is a good fusion of intuition of like a

333
00:29:19,359 --> 00:29:24,240
now with linearizability means, you know, how you reason about it. And basically, if we don't do

334
00:29:24,240 --> 00:29:30,559
anything special and we do this naive scheme, if you were implementing the lab free and you follow

335
00:29:30,559 --> 00:29:36,960
this naive scheme, then you would not pass the test because you know, the test assume or our goal

336
00:29:36,960 --> 00:29:41,440
in lab free is actually to provide linearizability for putting gets. And so the scenarios like these

337
00:29:41,519 --> 00:29:48,559
ones are just not a lot of, you know, your implementation has to be in a way that these results cannot appear.

338
00:29:50,320 --> 00:29:57,519
So that makes sense. So we're going to name lab free, we're going to shoot for linearizability.

339
00:29:58,160 --> 00:30:04,480
And what is one easy way of getting linearizability? How are we going to shoot or to put in gets

340
00:30:04,720 --> 00:30:11,200
operation or linearizable? Well, I mean, if you do actually use one machine,

341
00:30:11,920 --> 00:30:17,519
then it will be linearizable, right? Yeah, so what's the easy solution? We run all the reads

342
00:30:17,519 --> 00:30:23,440
through the leader, correct? So basically, the easy solution to get linearizability and the fact that's

343
00:30:23,440 --> 00:30:31,759
what we're going to be doing in lab free, in lab free, what we're going to be doing is, you know,

344
00:30:31,759 --> 00:30:38,480
reads or get operations, get ops, go through the log. So they go through a raft.

345
00:30:42,480 --> 00:30:46,559
And as you observe, you know, it seems, you know, they really go all through one machine.

346
00:30:46,559 --> 00:30:50,799
Well, there's not, they might not go through all one machine, because the leader may change over time.

347
00:30:50,799 --> 00:30:55,519
But we know that the leader is always total order, correct? And the log is total order. And so we're

348
00:30:55,519 --> 00:31:00,400
going to be able to construct, you know, a total order that actually has, you know, the order matches

349
00:31:00,400 --> 00:31:05,440
real time and all the reads return to values of the last, last right? Because basically, the raft

350
00:31:05,440 --> 00:31:13,519
protocol will guarantee that all the entries in the log are in the total order, right? And of

351
00:31:13,519 --> 00:31:17,600
course, the raft protocol has been quite a bit of work, to actually make that all happen. And

352
00:31:17,600 --> 00:31:26,480
despite, you know, network failures, despite network splits, you know, the raft protocol will

353
00:31:26,480 --> 00:31:31,920
guarantee us that basically all the operations happen in the total order. In fact, you know,

354
00:31:31,920 --> 00:31:35,599
the whole replicated state machine approaches are based on this idea, correct? That like all the

355
00:31:35,599 --> 00:31:40,240
oxen in the total order and applied in the same order on all peers, and as a result, everything

356
00:31:40,240 --> 00:31:46,480
looks, looks like a single machine. And so the easy way to do self-dispirations is to run all the

357
00:31:46,480 --> 00:31:51,680
reads, you know, through the leader, wherever the leaders are at that particular point of time,

358
00:31:51,680 --> 00:31:59,840
and that will give us linear rights ability. Let me pause for a second. Any questions about this?

359
00:32:02,320 --> 00:32:07,840
Sorry, matches real time. It just means that if operation 1 ends before operation 2 starts,

360
00:32:08,720 --> 00:32:14,400
then one is before 2. Yeah, that is raft, you know, what you will see now, there's what happened

361
00:32:14,400 --> 00:32:20,960
automatically, correct? Because the if an operation action completely finished, then must have

362
00:32:20,960 --> 00:32:24,960
been the case that the leader responded to, you know, back to the client, and then if the client

363
00:32:24,960 --> 00:32:31,600
started operation later, and must end up later in the log at the leader. So this is going to be a

364
00:32:31,600 --> 00:32:38,240
practice, true. And also, so just to double check and maybe reiterate so the, so in lab 3, all of the

365
00:32:38,240 --> 00:32:47,759
client requests are going to be synchronous. Yes, absolutely. Okay, good. So, you know, one downside of

366
00:32:47,759 --> 00:32:51,920
this scheme, you know, we would go back, actually, if you read the draft paper very carefully,

367
00:32:51,920 --> 00:32:57,519
there's an optimization for read-only operations, but even that optimization requires some,

368
00:32:58,960 --> 00:33:04,000
some communication. And so, like if we just follow this naive, you know, so this straightforward

369
00:33:04,000 --> 00:33:10,480
plan to actually get linearizability, you know, does this, what does that mean for performance?

370
00:33:10,480 --> 00:33:13,920
You know, we go back to sort of thinking about, you know, contrasting it to a zookeeper.

371
00:33:17,759 --> 00:33:24,319
Yeah, is, for example, the number read operations is going to scale with the number of service.

372
00:33:26,720 --> 00:33:31,920
Not because now everything has to pass through the list. Yeah, everything has to go for the leader

373
00:33:31,920 --> 00:33:36,559
again. So, you know, when I went over, it's a little bit undesirable, correct? And so, it gives

374
00:33:36,559 --> 00:33:40,079
you an interesting question, it's like, you know, how is it possible that like the, uh,

375
00:33:41,519 --> 00:33:45,359
zookeeper gets these great performance? And like, will you see that the simple scheme,

376
00:33:45,359 --> 00:33:49,279
your reference doesn't really work, or at least violates linearizability.

377
00:33:50,399 --> 00:33:54,799
And so, one, uh, so we want to talk a little bit about, to understand, like, what does it really,

378
00:33:54,799 --> 00:34:00,240
how does you give a get this? Um, and so the first thing to really realize, and this is probably

379
00:34:00,240 --> 00:34:06,799
the most important part, is that a zookeeper does not provide linearizability.

380
00:34:08,319 --> 00:34:10,719
It basically changes the correctness definition.

381
00:34:15,360 --> 00:34:27,519
And so, the zookeeper service is not going to behave like a single machine.

382
00:34:28,320 --> 00:34:32,480
You know, it's going to have results that we could never happen on a single machine.

383
00:34:33,440 --> 00:34:37,599
Um, and so the particular, so what is it, what does it provide? Well,

384
00:34:38,240 --> 00:34:40,880
uh, it does provide linearizable rights.

385
00:34:45,920 --> 00:34:56,640
So, all the, uh, operations, all the right operations, actually, you know, go through the leader,

386
00:34:56,640 --> 00:35:02,480
and you know, go through the log, and are pended to the log every peer in the same order.

387
00:35:02,480 --> 00:35:06,079
And so they're, they're going to also be applied in the same order. So we still have this replicated

388
00:35:06,079 --> 00:35:11,519
state machine, uh, approach, or where, reply, all the right operation, all the operation,

389
00:35:11,519 --> 00:35:21,199
the change data into, uh, uh, uh, in the total order. But, uh, there's a couple more properties.

390
00:35:23,039 --> 00:35:27,280
So, but it doesn't not provide linearizability for reach. Instead, it sort of provides two,

391
00:35:27,280 --> 00:35:33,759
sort of a different property, which is that all the operations appear in five-co-order,

392
00:35:33,760 --> 00:35:38,400
uh, in five-co-client order.

393
00:35:40,400 --> 00:35:44,960
And as far as I have to do with the asynchronous, you know, a client may submit multiple requests,

394
00:35:45,520 --> 00:35:52,960
uh, one by one, uh, without waiting for response. And, you know, juker, but we'll guarantee that

395
00:35:52,960 --> 00:35:58,240
if you submit, you know, if client one submitted a request, and then client one submitted another

396
00:35:58,239 --> 00:36:05,519
request, then that second request will appear, uh, later in, uh, the result will occur if the result

397
00:36:05,519 --> 00:36:13,199
of the first operation. And so in particular, you know, rights going to client order.

398
00:36:22,079 --> 00:36:27,759
Um, and then the reads have, where all the action is, where the existing properties are,

399
00:36:28,559 --> 00:36:37,599
um, the, uh, reach observed last right, okay, so reach, uh, okay, reach observed

400
00:36:40,079 --> 00:36:41,759
last right from same client.

401
00:36:50,959 --> 00:36:55,519
And so this order makes sense, you know, basically this sort of says like, uh, you read your own rights.

402
00:36:55,519 --> 00:36:59,199
And so if you did the right operation, you immediately followed the read operation, you see at

403
00:36:59,199 --> 00:37:05,519
least the, the results of your own rights. Uh, but, uh, for rights from other operation, from other

404
00:37:05,519 --> 00:37:11,599
clients, uh, the juker does not guarantee that property. Instead, what it guarantees is that

405
00:37:11,599 --> 00:37:17,119
the read we observe some prefix of the log.

406
00:37:17,119 --> 00:37:25,519
Uh, and, uh, so this means that you can actually see stale data.

407
00:37:29,519 --> 00:37:35,279
You may, you know, read for other follower, and that follower has a prefix of the log, but not

408
00:37:35,279 --> 00:37:39,679
like the last entries in the log, because maybe you just got to lag the, lags behind a little bit,

409
00:37:40,319 --> 00:37:46,639
uh, and nevertheless, that, uh, followers allow to, uh, return, uh, a value, uh, because you know,

410
00:37:46,639 --> 00:37:51,920
the only thing that, uh, uh, juker is going to guarantee that actually, you know, read, observe, uh,

411
00:37:51,920 --> 00:37:58,239
a prefix of the log. So the operations cannot go out of order, you know, once they in the log,

412
00:37:58,239 --> 00:38:03,599
and you can't sort of, uh, reach, can't like, read, uh, operation out of the log in out of order,

413
00:38:03,599 --> 00:38:10,159
it really has to be a prefix of the log. And then there's a second requirement that you cannot do

414
00:38:10,159 --> 00:38:20,960
no reads from the past. And that really means like, if you saw some prefix one,

415
00:38:22,879 --> 00:38:27,199
and then you issue like a read style prefix one, and then you read a second read,

416
00:38:27,839 --> 00:38:31,440
then that second read has to see at least prefix one plus more.

417
00:38:34,719 --> 00:38:39,359
And it might be no, you know, it might be just prefix one, but it cannot go back in time. So it cannot

418
00:38:39,360 --> 00:38:46,880
see a shorter prefix than prefix one. And so this basically, uh, so, so what if we look back at this

419
00:38:46,880 --> 00:38:55,280
picture, uh, the juker will allow this in certain cases, namely if the two clients are different,

420
00:38:56,160 --> 00:39:02,160
but it won't allow this up, this, and you can never have back in time. Okay?

421
00:39:02,639 --> 00:39:09,759
So I have a question, a conceptual one. So we have these two consistency guarantees the

422
00:39:09,759 --> 00:39:15,119
linearizable rights and the fee-fo client order. So if we ignore the second constraint for a second,

423
00:39:15,119 --> 00:39:20,319
and if we only focus on the first one, does it, does the definition of linearizable rights actually

424
00:39:20,319 --> 00:39:25,759
make sense? Since the definition of linearizability depends on having a read operation and a write-off

425
00:39:25,760 --> 00:39:33,520
operation. I, I, I, I, I hold that thought for a second, uh, because the, the, the, the, the,

426
00:39:33,520 --> 00:39:37,360
the way they define linearizable rights is not based on the rights of a total order, uh,

427
00:39:37,360 --> 00:39:40,880
and, but there is a relationship between the reads and the rights. So I'll hold the thought for a second,

428
00:39:40,880 --> 00:39:47,520
okay? Uh, we'll come back, we'll get to that in a, in a minute, like in one board. I want to make

429
00:39:47,520 --> 00:39:55,680
one board in between, okay? That's good. Okay, so it's like a, let's look a little bit

430
00:39:56,480 --> 00:40:03,279
at how C group, Zupyp are actually provides these guarantees. Um, and, you know, so we get the

431
00:40:03,279 --> 00:40:09,919
intuition, you know, uh, how you could implement this. Uh, the paper section is not very explicit

432
00:40:09,919 --> 00:40:13,679
about how they implement this. And sort of like I'm going to give you sort of a roughly best guess.

433
00:40:14,719 --> 00:40:18,319
Um, so there's a, Zupyp are client.

434
00:40:18,320 --> 00:40:25,920
It runs in the client machine, uh, in Latvian, we call this a clerk. And so this is a piece of

435
00:40:25,920 --> 00:40:31,680
software library sort of that works, collaborate, you know, with the service. And, uh, and, and,

436
00:40:31,680 --> 00:40:36,880
and Zupyp are in the paper terminology, basically it is the thing that has to session. So, uh,

437
00:40:36,880 --> 00:40:40,960
when you join when a client wants to connect with the Zupyp the server, you know, it creates a session,

438
00:40:40,960 --> 00:40:46,160
it connects, you know, using the session information to the leader and maintains, you know, state

439
00:40:46,159 --> 00:40:52,960
across the session. So we have a leader, uh, in, uh, Zupyp, as we'll see, we have, you know,

440
00:40:52,960 --> 00:40:58,480
followers, you know, basically dissolve sort of similar, uh, to what we're used to from lab, you know,

441
00:40:58,480 --> 00:41:04,159
to, and, you know, to do the client get issues right, you know, to the leader, you know, because

442
00:41:04,159 --> 00:41:08,079
the rights are going to be linearizable. In fact, the right to basically follow exactly sort of

443
00:41:08,079 --> 00:41:14,719
roughly the same strategy as in the raft library. So there's going to be a log and in the log

444
00:41:14,719 --> 00:41:18,000
our own the rights are entered, you know, so whatever, you know, there's some slots,

445
00:41:18,000 --> 00:41:24,159
let's say the leader, you know, pence this right, you know, in this particular, uh, index. So this

446
00:41:24,159 --> 00:41:29,839
see, you know, has an index, uh, and then the paper they refer to this index as the ZXID.

447
00:41:31,519 --> 00:41:35,119
Uh, so I think you can think about the ZXID, basically ask the index in the log.

448
00:41:36,799 --> 00:41:44,079
And, uh, when the leader, you know, basically commits, uh, an entry, uh, right, you know, to the log,

449
00:41:44,079 --> 00:41:49,119
you know, it returns the ZXID back, you know, to the clients. And so the client maintains that state.

450
00:41:50,559 --> 00:41:56,400
So associated with the session is basically, you know, with CXIDs, you know, the ZXID at the last right.

451
00:41:59,759 --> 00:42:07,599
Okay. And so when the client will, later on, does a read, and the read, you know, doesn't have to go

452
00:42:07,599 --> 00:42:11,840
through the leader, because of the whole goal to get a more, uh, performance. So maybe the read

453
00:42:11,840 --> 00:42:20,400
actually will go, you know, to one of the followers. And but the read will be tagged with the CXID

454
00:42:20,400 --> 00:42:27,039
that, of the last right that that particular client has done. And so what does that mean? Well,

455
00:42:27,039 --> 00:42:32,800
let's say this follower is behind, correct? And it has to entry, but it hasn't actually observed,

456
00:42:32,800 --> 00:42:36,400
you know, the right yet, because whatever the leader may be committed through these other followers.

457
00:42:37,360 --> 00:42:43,360
And what happens in this case is that this read, uh, the follower won't really respond immediately.

458
00:42:43,360 --> 00:42:50,639
Instead, you know, it will wait until it's seen, you know, the ZXID. And as soon as it's seen,

459
00:42:50,639 --> 00:42:58,160
the ZXID, it actually will respond. Now, of course, there's going to be another client.

460
00:42:59,039 --> 00:43:02,160
Uh, and so maybe at some point, you know, this right will come through.

461
00:43:02,960 --> 00:43:09,119
Um, and um, it may be now the read, you know, the client does another read. And so it hasn't seen no

462
00:43:09,119 --> 00:43:16,000
any other ZXIDs. Uh, and maybe, like, let me make one more follower. Let's say there's an

463
00:43:16,000 --> 00:43:20,719
again, another follower that actually has not observed, you know, that that that's final right yet.

464
00:43:20,719 --> 00:43:26,639
We're actually, let me. So there's going to be another, let's say there's a other client that sticks

465
00:43:26,639 --> 00:43:30,719
in some other right. So that's the scenario I want to talk about. So there was another client that

466
00:43:30,719 --> 00:43:37,359
actually appended a W after the ZXID, you know, it is right here. Uh, but if it's not observed,

467
00:43:37,359 --> 00:43:46,959
that particular right, you know, what we have here is we got the, uh, we got the two slots,

468
00:43:46,959 --> 00:43:51,199
we got the right, but the green right hasn't really shown up in that particular, that particular

469
00:43:51,199 --> 00:43:55,919
follower. And so if the client now issues a second, you know, read and maybe that goes to the

470
00:43:55,920 --> 00:44:01,440
other follower, you know, that's the same ZXID because it hasn't seen any new, you know, that

471
00:44:01,440 --> 00:44:07,920
client has not issued any new, more new rights. It will arrive there. And that, that, that, that guy

472
00:44:07,920 --> 00:44:14,480
is allowed to respond immediately because it has, you know, seen the ZXID of, you know, the,

473
00:44:15,119 --> 00:44:19,840
what, and has seen the last ZXID of that particular client. Uh, of course it misses, you know,

474
00:44:19,840 --> 00:44:23,840
some rights, you know, that might, from other clients that are already being processed by, uh,

475
00:44:23,840 --> 00:44:28,720
some majority of the sooner, but it does not require to return that data. And so it can just return.

476
00:44:29,760 --> 00:44:35,039
And so this might have to be returned and instale values, but, you know, there's a lot out by the

477
00:44:35,039 --> 00:44:40,480
definition of, you know, the suit keeper correct, correctness guarantees. Um, I, Professor, I have

478
00:44:40,480 --> 00:44:49,600
a question. Yep. First, I, I thought, um, I'm, I'm not sure, but, uh, I understood, um, um, client reads,

479
00:44:49,599 --> 00:44:56,719
like, the session of each were sticky. So they would like, in general, go to the same, um, to the same.

480
00:44:58,159 --> 00:45:01,199
Yeah, but, you know, of course, you know, there might be a little bit of, you know, it might be a

481
00:45:01,199 --> 00:45:06,960
quick network petition or, uh, anything like it. And so in between time, you know, the, the,

482
00:45:06,960 --> 00:45:12,799
the, it might have switched to another server. Okay. And then, um, the, the, the, the, the, the,

483
00:45:12,799 --> 00:45:17,440
the invitation turns out to suit paper does actually do some load balancing. Uh, so, but, but,

484
00:45:18,400 --> 00:45:26,240
never actually can happen, right? Right. Um, the other thing was, you said, right, um, always,

485
00:45:26,240 --> 00:45:34,480
always go to the leader. Um, and, and then the leader, um, responded with the ZXID.

486
00:45:35,760 --> 00:45:40,159
Doesn't the leader have to like first, like reach consensus before responding air?

487
00:45:41,119 --> 00:45:49,440
And this, uh, yes, I guess so, uh, you know, you just asked the committee to get out of

488
00:45:49,440 --> 00:45:55,199
why she's in the committee, right? Uh, and so I think the, the exact protocol, okay, I'm, I'm

489
00:45:55,199 --> 00:45:59,679
abstracting a way a little bit from the details of the protocol. I'm just going to sketch how it

490
00:45:59,679 --> 00:46:05,359
works. Uh, I believe you're right, you know, that, uh, it must return presumably after, you know,

491
00:46:05,440 --> 00:46:12,480
the entry action is really committed. That, um, sorry, last thing, um, you said it, it always

492
00:46:12,480 --> 00:46:16,640
goes to the leader, but I think the paper described, like, it could go to like followers or right,

493
00:46:16,640 --> 00:46:20,240
could go to a follower and then be, yeah, but it then ends up at the leader, correct?

494
00:46:21,599 --> 00:46:30,000
So, it ends and goes for the leader. Thanks. Yep. Uh, just to clarify, when you say, wait for ZXID,

495
00:46:30,000 --> 00:46:34,640
unlike, for example, the second follower, or, so second, when we wait for ZXID, we're actually

496
00:46:34,639 --> 00:46:40,719
waiting for it to be committed, right? It's not sufficient to just get it. I've got it.

497
00:46:42,960 --> 00:46:49,440
Wait, but, um, what, it like, it would have been committed by the time it was, like, like a client,

498
00:46:49,440 --> 00:46:56,559
what would it get an uncommitted ZXID, correct? Like ever? No, yeah, but just, uh, that's correct. Uh,

499
00:46:56,559 --> 00:47:04,400
so if, you know, the, this point, again, at this point, when the follower sees this, uh, ZXID,

500
00:47:04,400 --> 00:47:09,039
and the, the right is in that particular ZXID, you know, it must have been committed because,

501
00:47:09,039 --> 00:47:12,639
you know, the client could have not gotten that ZXID unless, you know, that option,

502
00:47:12,639 --> 00:47:24,240
of that ZXID wash commit. Thanks. Um, also, so when you say that, uh, from the read, you, you get

503
00:47:24,240 --> 00:47:30,240
stale data. So, like, the last basically, uh, but the client here in the read request,

504
00:47:30,239 --> 00:47:37,519
it supplied the ZXID within it. So, it's as if the client knowingly exactly wanted that location

505
00:47:37,519 --> 00:47:45,919
in the log that had ZXID as its index. So, didn't it knowingly just request that prefix, that specific

506
00:47:45,919 --> 00:47:50,639
prefix of the log? No, but the really says, you know, what this basically ZXD says, like,

507
00:47:51,839 --> 00:47:58,319
basically counter, you know, going back in time. And, uh, so the ZXD says, like, you know, you have,

508
00:47:58,320 --> 00:48:03,920
as a follower, you have to return me a result that at least concludes the prefix of the log

509
00:48:03,920 --> 00:48:09,760
through ZXID. Uh, you might have more that be fine too, but at least through ZXID. And this just

510
00:48:09,760 --> 00:48:13,600
stops that one case where you read back in time. Okay, awesome. Thanks.

511
00:48:16,160 --> 00:48:22,400
Okay, so now you might wonder, uh, you know, so, just clearly does not provide linearizability,

512
00:48:22,400 --> 00:48:26,320
and one reason people are excited about linearizability is because of the like, a single machine,

513
00:48:26,320 --> 00:48:29,680
so it's easier to program, right? Like, you know, you do a good, you get a good, you know,

514
00:48:29,680 --> 00:48:35,120
you have roughly no what you're going to get. Uh, and then no pun intended. Uh, but the

515
00:48:35,120 --> 00:48:39,440
here you're going to know you certainly have a model, programming model that's different from a single

516
00:48:39,440 --> 00:48:46,400
machine. And so, uh, you know, how do you program with this thing? And, you know, it turns out that

517
00:48:46,400 --> 00:48:50,640
that basically these rules, you know, this correctness definition that, you know, ZXID people has,

518
00:48:50,639 --> 00:48:56,799
are basically, you can think of it as like good enough to actually do, you know, for the

519
00:48:56,799 --> 00:49:00,879
purpose, just kind of through, through, through the help programming. And so I want to talk a little

520
00:49:00,879 --> 00:49:16,159
bit about that. So the real point is that, you know, the, we've linearizability, you know,

521
00:49:16,159 --> 00:49:21,039
it's pretty clear that, you know, that helps programming and writes, you know, into the programs.

522
00:49:21,039 --> 00:49:24,559
You think they're going to be slightly different. And we want to understand actually, you know,

523
00:49:24,559 --> 00:49:29,440
things that work out well. Uh, and, uh, or whether they select it, just painting an act of

524
00:49:29,440 --> 00:49:35,839
programming is basically completely unusual. Um, so, uh, so let's look at one of the key examples,

525
00:49:36,480 --> 00:49:42,399
they talk about in the paper. Um, and, uh, the first thing I want to do is like basically ignore

526
00:49:42,400 --> 00:49:47,519
the sync operation because like you can make, uh, every operation actually linearizable by just

527
00:49:47,519 --> 00:49:52,880
issuing a sync, uh, like before you do the read. Uh, but that, of course, you know, makes everything

528
00:49:52,880 --> 00:49:57,039
real slow again and we're not going to get our performance at that. So, uh, basically, we want to

529
00:49:57,039 --> 00:50:02,000
avoid, uh, doing syncs. And so I'm just going to ignore syncs and like program as if, you know, we don't

530
00:50:02,000 --> 00:50:08,079
have syncs. So let's look at the following operations. So, uh, here's the right order.

531
00:50:13,039 --> 00:50:18,400
We're going to do a couple operations and this is the case of the ready file. So, uh, we issue a delete

532
00:50:20,320 --> 00:50:29,200
of the ready file. So for example, this is a, uh, a new, uh, master that becomes, uh,

533
00:50:30,720 --> 00:50:37,680
uh, uh, it becomes the new leader. Um, and so it needs to write a sort of configuration and

534
00:50:38,159 --> 00:50:43,519
uh, information in it like, you know, who's, uh, who are part of the, uh, the, the, the replicate state

535
00:50:43,519 --> 00:50:47,919
machine and who is the leader. And so it writes, you know, some configuration files, you know, write

536
00:50:49,679 --> 00:50:58,319
at one, write f2, and then does it create off, ready.

537
00:50:58,480 --> 00:51:06,880
And then other followers might in your other, you know, this is the red order.

538
00:51:11,600 --> 00:51:18,559
They can, you know, for example, uh, call, you know, if, you know, exists, ready.

539
00:51:18,639 --> 00:51:29,679
And so, you can actually see how operation exists and, uh, uh, if, uh, ready exists, then it will

540
00:51:29,679 --> 00:51:36,639
immediately or true, uh, and otherwise, uh, not. And so you're gonna have to wait. Uh, so let's ignore

541
00:51:36,639 --> 00:51:41,360
that case for a second. Let's assume that, you know, the second client, so here's the one per,

542
00:51:41,360 --> 00:51:46,559
one client did the right operation, second client does the read operations, and then, uh, if it exists,

543
00:51:46,559 --> 00:51:51,279
then the client reads f1, so then we have to.

544
00:51:55,199 --> 00:52:01,039
And so the thing that we, you know, we want to understand, like, you know, what values could

545
00:52:01,039 --> 00:52:03,199
f1, dis-read actually return?

546
00:52:11,840 --> 00:52:14,960
And I think the thing that we worry about, correct, is a pretty return,

547
00:52:16,559 --> 00:52:20,079
could have returned some, you know, result of a right that was done much earlier here.

548
00:52:25,759 --> 00:52:27,279
And we're must have observed this right.

549
00:52:33,199 --> 00:52:39,759
I think the paper mentions that, um, there either can watch certain things and be notified of

550
00:52:40,559 --> 00:52:44,480
changes. Yeah, so let's assume that actually defile exists, so create actually

551
00:52:44,559 --> 00:52:47,360
succeeds immediately. So let's talk about the notifications in a second.

552
00:52:49,199 --> 00:52:55,920
So this exists returns immediately. No watches involved, just exists. And then we do,

553
00:52:55,920 --> 00:52:57,599
that second client does a read of f1.

554
00:52:59,599 --> 00:53:04,400
Um, I think it shouldn't read whatever word was written by the first client because the operations

555
00:53:04,400 --> 00:53:11,280
are in five-bow. Yeah, yeah, correct. So the, uh, I think the real thing that actually, uh,

556
00:53:11,280 --> 00:53:17,280
the, so if we saw this option of what value, correct, like for some right earlier,

557
00:53:17,280 --> 00:53:22,640
that would mean that we're reading back in time, correct. And that is just not a lot, you know,

558
00:53:22,640 --> 00:53:30,000
the rules actually forbid that. Um, this read, you know, must observe, you know, this, uh,

559
00:53:30,000 --> 00:53:35,360
that value of that right because this read, the previous read, he exists, observe this right,

560
00:53:35,440 --> 00:53:42,160
correct. So we know that, you know, this exists, I.D. must have seen the ZXID corresponding by that

561
00:53:42,160 --> 00:53:51,920
create. And so that means that this read will, uh, uh, must, you know, uh, must sort of see the last

562
00:53:51,920 --> 00:53:55,599
right, you know, that was before them, the total order that preceded, you know, that particular

563
00:53:55,599 --> 00:54:01,680
create. And so the, the last right in that critical order before that is this particular right,

564
00:54:02,399 --> 00:54:07,359
because all the rights are actually linearizable. And so it must be the case that this read F1

565
00:54:07,359 --> 00:54:12,719
of jurists, you know, there's all the right F1. And so this is nice, correct, because they've like,

566
00:54:12,719 --> 00:54:17,759
you know, some new leader, you know, became the primary, the race, the configuration file, you know,

567
00:54:17,759 --> 00:54:22,159
we know for sure that actually we're going to see that last configuration trial that was created by

568
00:54:22,159 --> 00:54:29,199
that, by that new leader. So we see here an example that these rules are sort of carefully chosen,

569
00:54:30,000 --> 00:54:33,919
that, you know, things that you might care about, if you're writing a configuration service,

570
00:54:33,919 --> 00:54:41,679
that actually certainly work out. Sorry, I might have not understood what you were saying before,

571
00:54:41,679 --> 00:54:48,559
but in this case, if it exists, like checking exists, ready, couldn't it read like stuff before

572
00:54:48,559 --> 00:54:54,960
ready was deleted? Okay, all the rights in your total order. So this right is in total order,

573
00:54:54,960 --> 00:54:59,599
that right is in total order, the creates in total order, right? So this read here on the other

574
00:54:59,599 --> 00:55:04,880
site has observed that create. So whatever read is going to do is going to go back in total order,

575
00:55:04,880 --> 00:55:09,679
correct? And like it would, and observe the last right in that total order. And the last right F1

576
00:55:09,679 --> 00:55:15,360
is this one. But is exists, right? No, since this is a read, but the existence of jurist is

577
00:55:15,360 --> 00:55:21,360
particularly right. Oh, you're saying it, you cannot read back in time, correct? Like this is the whole

578
00:55:21,360 --> 00:55:28,240
goal. Right. But how did we know that it observed that exact? I told you that I said like the file

579
00:55:28,240 --> 00:55:34,559
existed. So it must be the case that it observed it. It just endured true. But it existed before

580
00:55:34,559 --> 00:55:41,280
you deleted it, right? Yeah, yeah, yeah, yeah, but you know, okay, well, go back in a second,

581
00:55:41,280 --> 00:55:45,760
let me, okay, so this is the second case. This is a good point. Let me talk about that. So like,

582
00:55:45,760 --> 00:55:50,079
there's another scenario, and I think this is the one you're worrying about that could have happened.

583
00:55:50,079 --> 00:55:56,880
And this is where notifications come in. So the Lizard agreed that this is right, correct? So the second

584
00:55:56,880 --> 00:56:06,239
case, more rules. And this is indeed interesting. I think the case where you're worried about is,

585
00:56:07,920 --> 00:56:16,079
here's our reader again, here's our writer again. And the reader calls exists on ready.

586
00:56:16,079 --> 00:56:24,799
And let's assume the file, you know, is there and does a read of F1.

587
00:56:26,400 --> 00:56:32,159
Right. Almost same as in the previous scenario. And now like, there's some changing leadership,

588
00:56:32,159 --> 00:56:39,119
you know, there's the crash, recovery and all the kind of stuff is happening. And so there's a new

589
00:56:39,759 --> 00:56:42,639
primary. It deletes ready.

590
00:56:46,880 --> 00:56:48,239
Get it right. F1.

591
00:56:51,039 --> 00:57:02,000
It writes F2. And it creates ready. Like I said before.

592
00:57:02,480 --> 00:57:08,559
And let's assume that this like this reader a little bit delayed. I don't know,

593
00:57:08,559 --> 00:57:12,960
something else happened on the machine. And you know, now does the read of F2.

594
00:57:15,440 --> 00:57:18,960
I think this is the very question you're so asking about because this is worrisome,

595
00:57:18,960 --> 00:57:24,800
correct? Because now there's a configuration change. And if this configuration change gets

596
00:57:24,800 --> 00:57:32,000
slotted in the middle here, correct. This read of F2 is going to return the new configuration as

597
00:57:32,000 --> 00:57:36,560
opposed to the read of F1 that is going to return the old configuration. And clearly things are

598
00:57:36,560 --> 00:57:41,760
going to be messed up. That is not a scenario where we want to be in. So the terrible outcome.

599
00:57:42,880 --> 00:57:47,760
And so, and how does that actually, you know, get rectified or how does this actually

600
00:57:48,160 --> 00:57:54,080
zooki deal with this? Well, this is where the watchers come in. You know, the pictures I drew in

601
00:57:54,080 --> 00:57:59,760
the foreign proof slide board is not completely correct. In addition to calling exist with this

602
00:57:59,760 --> 00:58:01,520
read is going to say watch to true.

603
00:58:09,600 --> 00:58:12,960
And what that means is that this delete

604
00:58:13,199 --> 00:58:20,639
will change the read file. And we have now set a watch on the read file. And so when the

605
00:58:21,599 --> 00:58:27,519
read file gets deleted by this new primary, that actually results in the notification.

606
00:58:34,720 --> 00:58:39,199
And there's a rule for this notification. Another rule for the notification is that every

607
00:58:39,199 --> 00:58:47,679
notification will be delivered for, you know, rights that go after it. And so what it has to be the

608
00:58:47,679 --> 00:58:57,199
case that, you know, this notification will be delivered before the right to F1. So when,

609
00:58:57,199 --> 00:59:00,319
so there's two possible scenarios, correct. The notification gets delivered here.

610
00:59:02,159 --> 00:59:05,359
Or the notification gets delivered like after the read of F2.

611
00:59:06,320 --> 00:59:08,640
Now let me move that read of F2 slightly up.

612
00:59:12,240 --> 00:59:17,840
Or yeah. So it's still happening sort of in time behind, you know, the right operation.

613
00:59:18,480 --> 00:59:22,800
But the notification gets easier delivered here depending on the delays. Or it's going to deliver

614
00:59:22,800 --> 00:59:28,079
to here. So what's the exact wording of that rule that allows us to happen?

615
00:59:31,200 --> 00:59:34,480
Basically, I think one way to think about it is the notification is just like it was almost like a

616
00:59:34,480 --> 00:59:42,639
right operation. And the followers, you know, implement it. So that the, if your change happens

617
00:59:42,639 --> 00:59:47,760
through the lead to notification goes off, that notification is delivered to the client with that ZXID.

618
00:59:51,599 --> 00:59:52,480
Again, the data is not-

619
00:59:52,480 --> 00:59:59,519
I still don't understand why this guarantees that it can go like before,

620
00:59:59,519 --> 01:00:08,320
wait, so the valid places for it to be are before the right of F1. And also like after the right of

621
01:00:09,280 --> 01:00:17,599
F2, right? The notification is delivered after the lead of ready. Before the rights,

622
01:00:17,599 --> 01:00:22,159
and before the rights of F1 and F2 are visible, or end the create, without matter.

623
01:00:22,480 --> 01:00:24,000
Oh, I see.

624
01:00:30,239 --> 01:00:32,719
That's just a rule. You know, Zooky could have to guarantee that.

625
01:00:33,519 --> 01:00:39,039
Okay. Okay, so that means there's two cases, correct? Like the notification gets delivered before

626
01:00:39,039 --> 01:00:44,960
the read of F1 or after the read of F1. If it's delivered, if it's gets delivered after the read

627
01:00:45,039 --> 01:00:54,320
of F1 or for F2, is there a problem? No. No. Because then the read just happened before the rights.

628
01:00:54,320 --> 01:00:59,440
Yep, so everything is good. So this is a whole block is happening after the read of F2 is perfectly fine.

629
01:00:59,440 --> 01:01:00,159
And how about here?

630
01:01:03,360 --> 01:01:08,400
Um, wait, Professor Didi Say, the watch is like a right, like, right something?

631
01:01:09,519 --> 01:01:13,920
Well, you can think about it. The watch is not a right operation. Yeah, I didn't mean to

632
01:01:13,920 --> 01:01:19,599
imply that, but the right, the watch is executed with the appropriate sort of ZXID that's associated

633
01:01:19,599 --> 01:01:24,559
with that right, with that modification. Those are local, right? The watches are. Yeah, the watchers

634
01:01:24,559 --> 01:01:32,000
are local. And so when they're executed, it's guaranteed, you know, that they happen at the right.

635
01:01:32,720 --> 01:01:37,760
When the right is observed, or the client sees that the watch is propagated with the CXID to

636
01:01:37,760 --> 01:01:45,440
the client and make sure that they're executed. Thanks. Again, the papers will slightly

637
01:01:45,440 --> 01:01:48,640
evade them exactly how it's implemented, but you can imagine different scenarios.

638
01:01:50,080 --> 01:01:53,600
But the more important point is like this rule is guaranteed. Okay, so what happens if the

639
01:01:53,600 --> 01:02:00,000
notification is delivered here? So if the client is running correct, you know, there's an

640
01:02:00,000 --> 01:02:02,639
exists to read F1 and now there's notification comes in.

641
01:02:06,000 --> 01:02:08,559
Then you have to restart, probably. Yeah, you have to restart.

642
01:02:14,960 --> 01:02:21,119
Okay, so what we see here basically is that, you know, the rules, you know, make programming definitely

643
01:02:21,119 --> 01:02:28,239
a little bit more difficult, but not impossible. You know, we have a little bit of careful sort of

644
01:02:28,239 --> 01:02:33,839
programming, you know, you understand rules, you can actually get the desirable results that

645
01:02:33,839 --> 01:02:41,279
that's probably the application wants. What happens to the read F1 though? What happens to read F1?

646
01:02:41,279 --> 01:02:48,079
Well, you can start all over. Oh, including that. Okay.

647
01:02:50,079 --> 01:02:53,759
As you'll see, this is a trick that shows up in those recipes quite a bit, right? Like this

648
01:02:54,080 --> 01:03:01,760
idea of actually, you know, bailing out and starting over again. Okay, good. So hopefully that

649
01:03:01,760 --> 01:03:08,000
gives you a sense that for two things, there's sort of even though, you know, one reason why people

650
01:03:08,000 --> 01:03:11,760
like people like linearizability is because it's very intuitive, you know, very easy to program with

651
01:03:11,760 --> 01:03:15,680
because everything behaves like a single machine. But, you know, if you want fault tolerance,

652
01:03:15,680 --> 01:03:20,480
scalability, it's hard to get actually good performance. And so one way to get good performance

653
01:03:20,480 --> 01:03:26,240
is to compromise on the consistency guarantee. And in this case, you know, compromising linearizability

654
01:03:26,240 --> 01:03:29,599
and provides some other consistent guarantee. And as we can see, you know, that's it.

655
01:03:30,400 --> 01:03:35,920
Complicates, you know, the user experience or the programmer experience. But you know, these rules

656
01:03:35,920 --> 01:03:39,599
and suitkeepers are carefully chosen. So to still, you know, things are going to actually work out.

657
01:03:42,159 --> 01:03:46,719
It's doable. So it is possible to get the right sort of guarantees.

658
01:03:46,719 --> 01:03:52,480
So now there's another aspect to this programming model. I don't know what I want to talk a little bit

659
01:03:52,480 --> 01:03:55,279
about now that is really related to the coordination service part.

660
01:04:06,159 --> 01:04:12,319
And so the examples, you know, you need to, you know, what does it mean to be coordination

661
01:04:12,320 --> 01:04:19,039
service? One good example is probably the VM virtual machine fault tolerance paper from a little

662
01:04:19,039 --> 01:04:28,480
while ago that we read and that have this test and set operation. The goal of the, you know,

663
01:04:28,480 --> 01:04:31,519
the test and set operation was basically to make sure that there's no split brain,

664
01:04:31,519 --> 01:04:36,320
which is basically two clients would run. And one would win the test and set and get it one wooden.

665
01:04:36,320 --> 01:04:41,200
And as a result, you know, the one that won the test and set could conclude, you know, that I'm

666
01:04:41,279 --> 01:04:48,879
going to be the primary. And so that is sort of an example of a feature that a coordination service

667
01:04:48,879 --> 01:04:55,039
should be able to provide. And I want to, you know, just to make that a little bit more concrete.

668
01:04:57,119 --> 01:05:02,960
Let's think about like one wild free, could you get that with wild free? You know, basically sort of

669
01:05:02,960 --> 01:05:11,199
you kept this in a test and set type thing. Well, so let's do a very simple case, you know, let's say

670
01:05:11,199 --> 01:05:19,760
we have, here's our simple implementation of test and set. And in lot three, we only have put

671
01:05:19,760 --> 01:05:24,000
and get operations, right? There's no other operations. So those are the two operations. So like how

672
01:05:24,000 --> 01:05:31,760
why you write this, you know, maybe you know, we'll do a put to the key, let's say master.

673
01:05:34,800 --> 01:05:38,559
And we put my IP address in it. We get the address of the caller.

674
01:05:40,559 --> 01:05:50,559
And then you know, do get, you know, and we say if the get on master is equal to my IP address.

675
01:05:54,000 --> 01:05:59,119
Then, you know, act as master or act as leader.

676
01:06:02,559 --> 01:06:07,119
Actually, this is our, you know, in the implementation, you know, we don't have many other choices

677
01:06:07,119 --> 01:06:11,039
because we only have to put, we only have to put it in again. And this is how we can implement this.

678
01:06:13,119 --> 01:06:15,039
Will this do the desirable thing?

679
01:06:15,279 --> 01:06:28,960
Oh, there's no atomicity between the put in the gap. So maybe some change them.

680
01:06:29,519 --> 01:06:34,000
Correct. So basically, there could be two clients, correct? They're both good at the same time.

681
01:06:34,719 --> 01:06:46,559
And then observe, you know, the roughly that we do that at the same time, and then interleaf,

682
01:06:46,559 --> 01:06:50,400
you know, correctly, involve election return, get, you know, with their particular IP address,

683
01:06:50,400 --> 01:06:53,039
correct? And so we can get two leaders.

684
01:06:57,199 --> 01:07:02,639
And that's of course not what we want. So the main point of this, for example, is there's basically,

685
01:07:02,719 --> 01:07:06,559
you just have put it in again. It's going to be very hard to implement a test and set.

686
01:07:07,839 --> 01:07:12,000
It turns out it's possible, but it's very complex. You use Baker's algorithm, you know,

687
01:07:12,000 --> 01:07:15,920
you can basically probably do it, but they're not going to be ridiculous to do that in a distributed system.

688
01:07:17,119 --> 01:07:26,319
And so what Suzuki does, it just provides some additional help to build these sort of type of

689
01:07:26,320 --> 01:07:33,280
primitives. And then see in a second. The other thing that, you know, presumably what you want to know,

690
01:07:33,280 --> 01:07:38,240
and that like, three, does not provide any support for it, if you're sort of a configuration service,

691
01:07:38,240 --> 01:07:42,720
or a coordination service, is that you want to know when somebody goes down. And for example,

692
01:07:42,720 --> 01:07:47,600
you want to observe that like if the leader goes down, like some other parties would like to know,

693
01:07:47,600 --> 01:07:53,519
like, is the leader down so that we can choose a new one if you needed to. And so at least on the

694
01:07:53,519 --> 01:08:00,400
applications that building using that service. Okay, so, so there's two things that we really want.

695
01:08:00,400 --> 01:08:03,599
You know, one is, you know, we're not sort of way of trying to get this on a missity.

696
01:08:05,679 --> 01:08:09,039
That's what we're looking for in the ZUKIEPER design. And then in ZUKIEPER design, second,

697
01:08:09,039 --> 01:08:14,960
we were looking for in the ZUKIEPER design is for an application to learn whether some node goes down.

698
01:08:16,640 --> 01:08:22,560
And so let's look at the ZUKIEPER API. And really, you know, what we want to look at is the ZNOT API.

699
01:08:24,480 --> 01:08:32,320
And we'll see again that it's actually carefully designed to actually make it possible to do the

700
01:08:32,320 --> 01:08:38,400
things that we're looking for. Okay, so the way the system is organized is, you know, there are

701
01:08:38,400 --> 01:08:46,640
three of ZNOTes. Typically, you know, there's like one, you know, sort of app one as a ZNOTE that might

702
01:08:46,640 --> 01:08:52,880
have some children that correspond to the machines that are part, you know, of app one. So maybe like

703
01:08:52,880 --> 01:09:01,920
peer or machine one, machine two, maybe the RPI addresses or DNS names, machine three. And they

704
01:09:01,920 --> 01:09:07,520
might actually have version numbers associated with sequence numbers with them. And basically,

705
01:09:07,520 --> 01:09:15,119
ZNOTes can be of three types. One, they can be regular. So then they're fault tolerance replicated

706
01:09:15,119 --> 01:09:23,199
and all that kind of stuff. And then they can be infemoral. And infemoral basically means that

707
01:09:23,199 --> 01:09:31,599
the node will disappear automatically when the session with the machine three goes away.

708
01:09:32,319 --> 01:09:36,479
So either because there's a network petition, there's no hard beats more coming in from

709
01:09:36,479 --> 01:09:42,159
machine three. But at some point ZUKIEPER decides, you know, that session is gone. And so then it will

710
01:09:42,159 --> 01:09:49,760
delete, you know, that node automatically. And so that's where infemoral nodes. And then there's

711
01:09:49,760 --> 01:09:57,519
a third one, which is the sequential. Let's go back to the third one. Type of nodes are sequential

712
01:09:58,960 --> 01:10:03,039
nodes. And that really means that, you know, they have version of version numbers associated with them

713
01:10:03,039 --> 01:10:10,399
in their name. And they're created, you get a one by one in under the particular ZNOTE,

714
01:10:10,399 --> 01:10:16,639
all the children will have a sequence number in their name. And the nodes are no ordered by that

715
01:10:16,639 --> 01:10:21,679
sequence number. And so again, with this, my desk, sequence number one, this is my desk,

716
01:10:21,679 --> 01:10:25,119
sequence number two, this is my desk, sequence number three. And if the new one gets created,

717
01:10:25,119 --> 01:10:33,119
it will have a sequence number higher than three. Okay. And then there's a API associated with that.

718
01:10:33,119 --> 01:10:37,599
That's where I want to talk a little bit about. It's going to, there's create. If we already mentioned

719
01:10:37,600 --> 01:10:45,200
a little bit, you know, takes a path, takes some data and flags. And the flags for response,

720
01:10:45,200 --> 01:10:51,600
you know, to the free cases. And then there's delete. And in the previous slide,

721
01:10:51,600 --> 01:10:55,440
after it's moved, this leading, you know, delete takes a path as before, but it also takes a version

722
01:10:55,439 --> 01:11:09,519
number. And exists takes a path in a watch. And then there's a get data, primitive, that takes

723
01:11:09,519 --> 01:11:16,559
a path in the version number. And we'll see that these version numbers are the trick, you know,

724
01:11:16,559 --> 01:11:23,759
or the key to actually get our other database. And then there's said data, path, data, and a version

725
01:11:23,760 --> 01:11:32,560
number. And there's also call for get children to get actual the children of a particular Z note,

726
01:11:32,560 --> 01:11:40,480
which takes a path. And I think it watch. And there's sync, you know, basically I sort of a

727
01:11:40,480 --> 01:11:44,960
cop out operation direction, ensure that after being, you know, sort of if you really need strong

728
01:11:44,960 --> 01:11:51,199
linear activity. Okay. So I want to sort of talk a little bit about like, you know, why, you know,

729
01:11:51,199 --> 01:11:58,559
this version number is handy. And so let's look at a particular example, the simple example. I can

730
01:11:58,559 --> 01:12:10,399
come up with a basically implementing a counter. And so the way, you know, you would write the,

731
01:12:12,399 --> 01:12:17,199
if you write, you know, okay, so let me actually first give the right solution. So while I'll get

732
01:12:17,439 --> 01:12:24,479
true. In the way, the implement increment. So there's the pseudocode for increment of this counter.

733
01:12:24,479 --> 01:12:32,159
And it's going to you do get XV, you know, get data of the counter.

734
01:12:32,159 --> 01:12:48,319
Get data, you know, count. And then if you know, set data. Count.

735
01:12:48,319 --> 01:13:01,519
So it's X plus one. And the version number. And get that as the case, then break.

736
01:13:03,840 --> 01:13:10,159
Okay, so let me quickly go over this. So to get data, returns the current version number and the

737
01:13:10,159 --> 01:13:17,359
value of the key. So the key or the path, you know, so for the file count, it returns the value

738
01:13:17,359 --> 01:13:21,359
and its version number at that particular point when they differentiate. And then you call,

739
01:13:22,079 --> 01:13:26,639
and said data to three arguments, you know, the path, you know, updates, the new value. In this case,

740
01:13:26,639 --> 01:13:30,799
it's going to be X plus one because we want increment, you know, the value by one. And it actually

741
01:13:30,799 --> 01:13:36,880
passes in all of the vertical number. And the, uh, semantics of said data is that either, you know,

742
01:13:36,880 --> 01:13:43,279
the version numbers are still the same. Then the said data actually happens and otherwise not.

743
01:13:43,279 --> 01:13:46,319
And so what does this protect against?

744
01:13:49,359 --> 01:13:51,439
Um, this prevents you from

745
01:13:52,559 --> 01:13:58,079
interleaving the get and set basically. Yeah, right. So if like two, uh,

746
01:13:58,079 --> 01:14:01,920
operators, two clients did get at the same time, it would read, uh,

747
01:14:01,920 --> 01:14:10,079
they do get at the same time. They get both back, say, you know, whatever, X is zero.

748
01:14:10,960 --> 01:14:15,119
And version number zero, X is zero, version number zero.

749
01:14:16,239 --> 01:14:20,319
Uh, then they do both of put where, like in this case, it's set data.

750
01:14:22,399 --> 01:14:28,319
So the set data with, you know, whatever, uh, X is one, you know, version number zero.

751
01:14:29,279 --> 01:14:33,840
Also, this guy does the same thing, set, you know, one zero.

752
01:14:33,840 --> 01:14:41,520
Uh, and you know, why, and so both, both clients issue those two set operations or both set operations

753
01:14:41,520 --> 01:14:42,239
you can cheat.

754
01:14:48,239 --> 01:14:52,640
Um, well, no. And yeah, why not?

755
01:14:53,760 --> 01:14:56,159
Uh, because one of the version numbers will be wrong.

756
01:14:56,960 --> 01:15:01,279
Yeah, right. Like, what do you want? So one of the two goes first. Why, why does one of the two go first?

757
01:15:01,439 --> 01:15:03,439
Because all rights are linearized.

758
01:15:03,439 --> 01:15:06,159
Yeah, all rights are linearized, so they're going some total order.

759
01:15:06,159 --> 01:15:11,519
So, you know, we can pick one. So let's say this guy goes first or this operation goes first.

760
01:15:11,519 --> 01:15:18,880
So that will increase the, uh, that will increase the, uh, uh, the value, correct,

761
01:15:18,880 --> 01:15:24,559
the one from zero to one is correctly. And, but that will also, and, and we'll execute

762
01:15:24,559 --> 01:15:27,920
because the version number is match, right? Like the version number zero is actually

763
01:15:27,920 --> 01:15:32,480
actually what the version number is. And so the version number's match, the increment happens

764
01:15:32,480 --> 01:15:37,199
and set data returns, uh, true. And what will happen if it's a second one, while the second one,

765
01:15:37,199 --> 01:15:40,640
the version number won't match because the version number will be increased because of,

766
01:15:40,640 --> 01:15:44,800
because this previous you said data operation. And therefore the second set operation will fail.

767
01:15:45,359 --> 01:15:52,560
And so then the client will loop back and try again and, uh, try to, and, uh, and try to take another

768
01:15:52,560 --> 01:15:57,520
shot and do the increment. And correct. So what, what happens in this case is correct,

769
01:15:57,520 --> 01:16:02,160
even though the two clients executed the operation, you know, concurrently, uh,

770
01:16:02,160 --> 01:16:06,320
if the interleasing is bad, you know, the, this piece of code will actually do the right thing,

771
01:16:06,320 --> 01:16:11,920
the second client will try again. And as a result, you know, the, what, what, the end value will be,

772
01:16:11,920 --> 01:16:20,000
you know, two is supposed to one. Okay? Does that make sense?

773
01:16:23,520 --> 01:16:29,360
If you've done any sort of lock-free programming in the past, uh, then this might all look very familiar to you.

774
01:16:29,360 --> 01:16:33,360
And so this sort of a style of lock-free, uh, you know, is usually zookeeper to recur,

775
01:16:33,360 --> 01:16:35,360
just this sort of style of lock-free program.

776
01:16:44,800 --> 01:16:45,600
Okay, um,

777
01:16:47,520 --> 01:16:51,760
what I'd like to do, uh, since I'm almost running out of time, last time I ran overtime,

778
01:16:51,760 --> 01:16:58,880
is I'll want to talk to some points about locks, uh, but I will do that, uh, next time,

779
01:16:59,680 --> 01:17:04,960
uh, that I, uh, the next lecture. Now, let me just sort of summarize that we've learned so far,

780
01:17:04,960 --> 01:17:08,640
and then, uh, I'll talk a little bit more about zookeeper in the, the next lecture.

781
01:17:10,720 --> 01:17:12,960
So, uh, sorry.

782
01:17:15,520 --> 01:17:18,720
Uh, so basically, you know, just a very successful design.

783
01:17:22,400 --> 01:17:23,199
Oops.

784
01:17:25,360 --> 01:17:29,840
Quite the use. Uh, you can, you know, download it, you know, the time get up, you can uh,

785
01:17:29,840 --> 01:17:34,079
play around with it if you wanted to. Uh, and one of the things that is interesting about it,

786
01:17:34,079 --> 01:17:38,720
you know, compared to all the systems that we look so far, it has weaker consistency,

787
01:17:38,720 --> 01:17:42,079
which with weaker consistency, I mean, it doesn't provide linearizability.

788
01:17:44,560 --> 01:17:48,159
Uh, and, you know, we're seeing that basically as sort of careful,

789
01:17:48,720 --> 01:17:54,399
design API, at least we have seen some aspects of the design API that, despite the fact that

790
01:17:54,399 --> 01:17:58,960
actually as weaker consistency, you can still use it. And the fact, you know, you can use it

791
01:17:58,960 --> 01:18:03,519
actually for pretty important applications, you can actually use, uh, zookeeper as a configuration

792
01:18:03,519 --> 01:18:09,119
surface. It's not like it's just main purpose. So, keeping track of like who's primary, who's,

793
01:18:09,119 --> 01:18:13,680
you know, who's in the, uh, who wants to set up replicas, et cetera, et cetera. And so,

794
01:18:13,680 --> 01:18:17,439
for the sort of crucial operation of being a configuration server that has to be correct,

795
01:18:17,439 --> 01:18:22,239
because otherwise, you know, we get to split brain problem. Uh, the APIs carefully designed so

796
01:18:22,239 --> 01:18:29,599
that if you use the API correctly, um, you still can implement a discrucial, uh, application on top

797
01:18:29,599 --> 01:18:35,919
of it, despite the fact that actually provides weaker consistency. And the cool part of that is

798
01:18:35,919 --> 01:18:40,159
that that's this, this combination, you know, like sort of careful design API and the weaker

799
01:18:40,159 --> 01:18:43,599
consistency allows us to get, you know, zookeeper really high performance.

800
01:18:49,439 --> 01:18:55,760
And we'll see later in later lectures, more of like this trick of trying to, uh, weaken the

801
01:18:55,760 --> 01:19:02,399
consistency guarantees to actually, you know, get better, uh, to get better performance or, uh,

802
01:19:02,399 --> 01:19:07,119
you know, able to, uh, continue despite network petitions.

803
01:19:07,119 --> 01:19:14,960
Okay, let me stop here, uh, and then I'll resume, uh, in a little while.

804
01:19:15,680 --> 01:19:19,840
And the next time around for the rear lecture. Any questions?

805
01:19:21,199 --> 01:19:25,199
Or, again, as usual, if you have to go, you know, please feel free to let out the go.

806
01:19:25,199 --> 01:19:30,479
If you want to hang around, ask for more questions, you know, if you'll be, please feel free to do so.

807
01:19:37,119 --> 01:19:51,439
Um, sorry, can you go to this slide, which said the, um, set, um, the unsuccessful example for

808
01:19:51,439 --> 01:20:03,039
the set and protest and set. I think it's two slides back. This one. Yeah. Um, so you, the new design,

809
01:20:04,000 --> 01:20:09,760
it's, it is able to fix that, right? Yeah, it is. You mean, you're like with the,

810
01:20:09,760 --> 01:20:17,600
the API, it's your future provides. Is the version right? Yeah, but if you have notes, I don't like

811
01:20:17,600 --> 01:20:22,640
it, it's honest, so exactly. Uh, so I didn't get to do that, but I was the point of the rest of the lecture,

812
01:20:22,640 --> 01:20:25,920
you just need to talk about how you can implement test and set using the version numbers.

813
01:20:27,039 --> 01:20:31,760
And clearly, the increments suggest you can't correct, because this is basically the same sequence.

814
01:20:33,920 --> 01:20:40,079
Right. Oh, and this is the same thing as the master API. Yeah, exactly.

815
01:20:41,039 --> 01:20:47,840
Okay. Thank you so much. You're welcome. I have a question about this version, uh,

816
01:20:47,840 --> 01:20:53,920
versioning to prevent lock, uh, to implement lock free programming. Is this like much more

817
01:20:53,920 --> 01:20:59,600
efficient, democracy programming? Because you still need to like re try the operation again and again

818
01:20:59,600 --> 01:21:05,360
until it succeeds, right? Uh, yeah, I'm like, it might be if test and set has a similar property,

819
01:21:05,360 --> 01:21:08,800
correct? If the test and set failed and you wanted to become, you know, actually increment,

820
01:21:08,800 --> 01:21:13,200
you have to do that again. So it's often the case in this lock free style programming that,

821
01:21:13,200 --> 01:21:18,240
you know, you can have these loops where you re try. And so if there's a lot of contention,

822
01:21:18,240 --> 01:21:21,680
you're going to get a lot to re try. Of course, if there's no contention, there's no re try.

823
01:21:23,039 --> 01:21:26,640
And typically, you know, these lock free algorithms actually are pretty carefully in how they do the

824
01:21:26,640 --> 01:21:30,320
back off. So they don't really re try and nearly, you know, they have some backup plan.

825
01:21:32,160 --> 01:21:38,160
Right. But what benefits does this give over a standard lock? Because either way, if you have

826
01:21:38,160 --> 01:21:42,960
a lot of contention, you're going to be like sitting there and re trying a lot. Yeah. So let's,

827
01:21:42,960 --> 01:21:50,480
let's, uh, so you know, so, uh, the, the increment counter is an example where basically, uh, you

828
01:21:50,480 --> 01:21:56,400
sort of implicitly do the walking, uh, because you will see if we've implement locks in Zookiever,

829
01:21:56,399 --> 01:22:00,879
like it, uh, using the zoo key, okay, if you implement locks with the zoo key per API,

830
01:22:01,359 --> 01:22:04,559
then if you do the stupid lock, you know, you can also have this contention issue.

831
01:22:05,439 --> 01:22:09,119
Of course, there's a way of implementing the smarter lock that they talked about, like we got

832
01:22:09,119 --> 01:22:16,559
the herding, uh, and then you can do better. Uh, and so I'm hoping to talk about that, uh, next time.

833
01:22:18,799 --> 01:22:22,719
Okay. Thank you. I think the real point here is, you know, that, you know, you can use these

834
01:22:22,800 --> 01:22:28,400
primitives to actually do lock free programming. Like with the interface that the lock free provides,

835
01:22:28,400 --> 01:22:32,800
it's not possible. Makes sense. Thank you.

836
01:22:42,960 --> 01:22:46,800
Any further questions?

