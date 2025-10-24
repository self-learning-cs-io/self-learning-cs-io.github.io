---
title: CS144 NetworkP433 5PacketSwitching
---

1
00:00:00,000 --> 00:00:07,040
This video is a continuation about packet switching and in this video I'm going to be talking

2
00:00:07,040 --> 00:00:11,359
about a number of different Q models.

3
00:00:11,359 --> 00:00:15,200
I'm going to start out by describing a simple deterministic Q model.

4
00:00:15,200 --> 00:00:19,440
This is something that's going to help us understand the dynamics of many simple Q systems.

5
00:00:19,440 --> 00:00:25,640
It often works as a good way of understanding what's going on in the network.

6
00:00:25,640 --> 00:00:28,199
Here's a router.

7
00:00:28,199 --> 00:00:33,920
As we know already, routers have to have Qs in the interface the whole packet during

8
00:00:33,920 --> 00:00:35,399
times of congestion.

9
00:00:35,399 --> 00:00:38,320
This is where the variability in Qing-Datelae takes place.

10
00:00:38,320 --> 00:00:43,920
If we can understand the dynamics, even just having a rough sense of the dynamics of that

11
00:00:43,920 --> 00:00:49,040
Q, it really helps us understand the end to end Qing-Delae and the dynamics of the network.

12
00:00:49,040 --> 00:00:51,320
We're going to take a closer look at this.

13
00:00:51,320 --> 00:00:54,000
We're going to just create a simple model.

14
00:00:54,000 --> 00:00:57,159
Here are the main characteristics of this Q. I'm going to draw a Q like this.

15
00:00:57,159 --> 00:01:02,880
This is the standard way to draw a Q showing where the packets will be stored.

16
00:01:02,880 --> 00:01:08,480
In that router Q, this is a four-port router, so packets could be coming in from any of the

17
00:01:08,480 --> 00:01:14,079
interfaces into that Q, and then they will depart under the outgoing link.

18
00:01:14,079 --> 00:01:20,680
We're going to say that that Q has an occupancy of Q of T. So at time T, it has Q packets

19
00:01:20,680 --> 00:01:22,400
or bytes in it.

20
00:01:23,280 --> 00:01:30,600
It's going to be useful to think about the aggregate or the cumulative departure process.

21
00:01:30,600 --> 00:01:36,719
That is, all of the packets or all of the bytes that have departed up until some time T.

22
00:01:36,719 --> 00:01:40,760
Similarly, it's going to be useful to think of the cumulative arrivals, the total number

23
00:01:40,760 --> 00:01:44,719
of packets that have arrived up until time T.

24
00:01:44,719 --> 00:01:49,680
Finally, because the outgoing link typically has a deterministic and fixed rate, which

25
00:01:49,680 --> 00:01:51,520
can say has a fixed rate of R.

26
00:01:51,599 --> 00:01:54,920
They're going to be the main parameters of our model.

27
00:01:57,959 --> 00:02:03,199
We can also think of a Q as being like a bucket full of water.

28
00:02:03,199 --> 00:02:04,759
Here's a simple example here.

29
00:02:04,759 --> 00:02:10,359
A of T is the cumulative number of bytes that have arrived up until time T.

30
00:02:10,359 --> 00:02:15,439
D of T is the cumulative number of bytes that have departed up until time T.

31
00:02:15,520 --> 00:02:20,520
In this example, they're going to depart at a fixed link rate of R.

32
00:02:21,919 --> 00:02:25,759
At any one time, there may be some bytes that have arrived, but haven't yet departed.

33
00:02:25,759 --> 00:02:28,680
They're the ones sitting in the bucket here.

34
00:02:28,680 --> 00:02:33,159
The occupancy of that bucket is going to be Q of T.

35
00:02:33,159 --> 00:02:35,400
So this is like a simple model of RQ.

36
00:02:35,400 --> 00:02:38,240
It's just another way of thinking about it.

37
00:02:38,240 --> 00:02:42,240
We can draw the evolution of this as a function of time.

38
00:02:42,240 --> 00:02:44,840
I'm trying to try and sketch how this might look.

39
00:02:44,840 --> 00:02:47,680
So here are going to be the axes of my graph.

40
00:02:47,680 --> 00:02:53,000
As a function of time, we're going to look at the cumulative number of bytes.

41
00:02:53,000 --> 00:02:55,520
So remember this is cumulative.

42
00:02:55,520 --> 00:03:02,319
I'm going to first look at the arrival process A of T.

43
00:03:02,319 --> 00:03:07,759
Bites tend to arrive as part of a packet, and they're going to arrive at some particular

44
00:03:07,759 --> 00:03:09,560
link arrival rate.

45
00:03:09,560 --> 00:03:13,000
So I'm going to draw what that cumulative arrival process might look like.

46
00:03:13,000 --> 00:03:17,159
It could look like anything, but here is the bytes arriving a packet.

47
00:03:17,159 --> 00:03:20,120
This is the gap between the first packet and the second packet.

48
00:03:20,120 --> 00:03:25,319
Here's a bunch more bytes arriving, a gap, maybe it's a long gap this time, and then a new

49
00:03:25,319 --> 00:03:27,240
packet arriving.

50
00:03:27,240 --> 00:03:33,439
So this is supposed to be a straight line, and this would be the arrival rate of the packet

51
00:03:33,439 --> 00:03:36,920
on the incoming link, and this is the number of bytes.

52
00:03:36,920 --> 00:03:42,920
So let's say that the packet is of length P, the number of bytes of that first packet.

53
00:03:42,919 --> 00:03:45,399
Now let's look at what the departure process might look like.

54
00:03:45,399 --> 00:03:51,199
I'm going to try and draw what I'm just going to label this as A of T, the cumulative arrival

55
00:03:51,199 --> 00:03:52,199
process.

56
00:03:52,199 --> 00:03:55,599
And then in yellow, I'm going to try and draw the, I'm going to sketch out what the departure

57
00:03:55,599 --> 00:03:57,439
process might look like.

58
00:03:57,439 --> 00:04:03,639
We know that the departure process is going to work at an unoperate at rate R.

59
00:04:03,639 --> 00:04:07,879
So at some point after that first packet has arrived, let's assume that it's a store

60
00:04:07,879 --> 00:04:08,879
and forward model.

61
00:04:08,879 --> 00:04:09,879
It doesn't matter.

62
00:04:09,879 --> 00:04:11,560
That's just for the sake of my example.

63
00:04:11,560 --> 00:04:15,879
So at this time here, the packet has arrived, and then we'll say, okay, it's going to

64
00:04:15,879 --> 00:04:21,399
depart at rate R. So that's going to be my gradient there.

65
00:04:21,399 --> 00:04:25,959
So that's rate R. That packet are right in that packet departing.

66
00:04:25,959 --> 00:04:27,959
At this point, there's nothing left.

67
00:04:27,959 --> 00:04:35,519
So we're going to wait until there's a whole new packet in the queue, and then we're going

68
00:04:35,519 --> 00:04:40,079
to depart again at rate R. That's going to be rate R.

69
00:04:40,079 --> 00:04:43,479
And so on, we're going to wait until the whole new packet, and it'll be at rate R again.

70
00:04:43,479 --> 00:04:45,479
So this might be one way in which it evolves.

71
00:04:45,479 --> 00:04:49,240
The point here is not the particular shape of this graph, but just to say you can easily

72
00:04:49,240 --> 00:04:53,199
sketch the arrival and departure process.

73
00:04:53,199 --> 00:04:57,479
And what this kind of a cool property of this is that we can immediately from this tell

74
00:04:57,479 --> 00:05:01,159
some nice characteristics of the system.

75
00:05:01,159 --> 00:05:06,560
First of all, we can immediately tell how, what the value of queue of T is.

76
00:05:06,560 --> 00:05:08,280
Is it any one time?

77
00:05:08,280 --> 00:05:13,759
So if we were to pick a particular time, queue of T is the number of bytes that have arrived,

78
00:05:13,759 --> 00:05:15,160
but not yet departed.

79
00:05:15,160 --> 00:05:21,439
So it's simply d of T minus a of T. I'm sorry, a of T minus d of T. So it's the number

80
00:05:21,439 --> 00:05:24,079
that have arrived minus those that have departed.

81
00:05:24,079 --> 00:05:29,360
So for example, if we were to take a line here, down to here, so a vertical, supposed to

82
00:05:29,360 --> 00:05:35,920
be a vertical line, that value, that distance between the two of those is queue of T. So

83
00:05:36,000 --> 00:05:40,240
at any one time, it's the occupancy of that queue.

84
00:05:40,240 --> 00:05:46,720
Similarly, if we look at a particular byte that arrives, say at this time here, if we assume

85
00:05:46,720 --> 00:05:53,360
that all bytes arrive and then depart in the same order, then this byte, because it's

86
00:05:53,360 --> 00:05:56,560
this particular cumulative byte, we know that it departs here.

87
00:05:56,560 --> 00:06:01,560
So if we take the horizontal distance between these two lines, this is going to tell us

88
00:06:01,560 --> 00:06:06,439
the d of T, I'll call it little d of T, the delay through the queue.

89
00:06:06,439 --> 00:06:10,680
So this is a very useful model giving us an intuition.

90
00:06:10,680 --> 00:06:16,199
I often sketch graphs like this when I'm trying to understand the dynamics of a queue

91
00:06:16,199 --> 00:06:19,480
or a dynamics of a system.

92
00:06:19,480 --> 00:06:28,240
Okay, then to summarize, we can say that the queue occupancy, so queue occupancy, queue

93
00:06:28,240 --> 00:06:35,360
of T, equals, it's the ones that have arrived minus the ones that have departed.

94
00:06:35,360 --> 00:06:37,360
So a nice and simple expression for that.

95
00:06:37,360 --> 00:06:44,160
And that d of T is the time spent in the queue by a byte that arrived at time T.

96
00:06:44,160 --> 00:06:49,519
So it's the time spent in the queue,

97
00:06:49,519 --> 00:07:01,680
in the queue by a byte arriving at time T.

98
00:07:01,680 --> 00:07:06,560
And that's simply the horizontal distance between those two lines.

99
00:07:06,560 --> 00:07:12,680
Now, the assumption of this is always that it's first come, first serve, or FIFO, we'll

100
00:07:12,680 --> 00:07:16,719
say first in, first out, in this context, those have the same meaning.

101
00:07:16,720 --> 00:07:20,480
So that's true, if the bytes didn't arrive and depart in the same order, then we couldn't

102
00:07:20,480 --> 00:07:23,920
make this statement here about d of T, because we don't know that we're referring to the

103
00:07:23,920 --> 00:07:26,040
same byte.

104
00:07:26,040 --> 00:07:30,120
Let's go on and look at an example now of how we might use this.

105
00:07:30,120 --> 00:07:32,000
So I'm going to work through an example.

106
00:07:32,000 --> 00:07:38,720
We're going to assume that every second a hundred bit packet is going to arrive to a queue

107
00:07:38,720 --> 00:07:40,560
at rate 1000 bits per second.

108
00:07:40,560 --> 00:07:45,240
In other words, this packet is going to arrive at a rate of 1000 bits per second, and it's

109
00:07:45,240 --> 00:07:48,040
a hundred bits long.

110
00:07:48,040 --> 00:07:53,160
We're going to assume the maximum departure rate, that was our R, is 500 bits per second.

111
00:07:53,160 --> 00:07:56,960
And the question is, what is the average occupancy of the queue?

112
00:07:56,960 --> 00:08:02,280
So just reading the question, it's not so obvious, but if we plot this in the way that I

113
00:08:02,280 --> 00:08:09,720
did before, I'm not going to try and sketch it, because I want these numbers to be very clear.

114
00:08:10,720 --> 00:08:15,240
A of T shown in rate here is the arrival process.

115
00:08:15,240 --> 00:08:17,840
This here is the packet arriving.

116
00:08:17,840 --> 00:08:22,640
It's the hundred bit packet arriving at rate 1000 bits per second.

117
00:08:22,640 --> 00:08:27,360
So therefore it takes a tenth of a second, point one of a second to arrive.

118
00:08:27,360 --> 00:08:30,680
The maximum departure rate is 500 bits per second, it's slower.

119
00:08:30,680 --> 00:08:37,800
So our departure rate, the departure d of T, the rate here is that the gradient of that

120
00:08:37,800 --> 00:08:39,519
is 500 bits per second.

121
00:08:39,519 --> 00:08:46,079
So that 100 bit packet is going to take point two of a second in order to depart.

122
00:08:46,079 --> 00:08:51,840
In the previous example, I showed it as a store and forward of each packet.

123
00:08:51,840 --> 00:08:55,240
Here I didn't, and that's just a choice, and I just made that choice when answering

124
00:08:55,240 --> 00:08:56,240
the question.

125
00:08:56,240 --> 00:09:00,360
The question isn't clear as to which way it is.

126
00:09:00,360 --> 00:09:06,439
So we can now see the time evolution of queue of T, which is the vertical difference between

127
00:09:06,440 --> 00:09:09,840
those two lines and the delay of an individual packet.

128
00:09:09,840 --> 00:09:14,360
But the question is, what is the average occupancy of the queue?

129
00:09:14,360 --> 00:09:16,840
Well, let's look at how we might solve that.

130
00:09:16,840 --> 00:09:21,000
I'm going to rate this out just so that you have a clear record of this.

131
00:09:21,000 --> 00:09:22,840
So the solution is this.

132
00:09:22,840 --> 00:09:27,360
During each repeating one second cycle, the queue is going to fill at rate 500 bits per second

133
00:09:27,360 --> 00:09:29,200
for a tenth of a second.

134
00:09:29,200 --> 00:09:32,200
So that was my arrival process here.

135
00:09:32,200 --> 00:09:40,759
And it drains at 500 bits per second for, then drains at 500 bits per second for point

136
00:09:40,759 --> 00:09:42,879
one of a second.

137
00:09:42,879 --> 00:09:50,200
Over the first two tenths of a second, the average queue occupancy is therefore 0.5 times

138
00:09:50,200 --> 00:09:57,040
0.1 times 500 equals 25 bits.

139
00:09:57,040 --> 00:10:00,320
The queue is empty for eight tenths of a second every cycle.

140
00:10:00,320 --> 00:10:02,000
That's from here to here.

141
00:10:02,000 --> 00:10:11,240
So the average queue occupancy, queue bar of T, is 0.2 of a second when it's 25 bits and

142
00:10:11,240 --> 00:10:13,080
0.8 of a second when it's 0.

143
00:10:13,080 --> 00:10:19,679
So the average queue occupancy is 5 bits.

144
00:10:19,679 --> 00:10:24,559
Continuing with our theme of simple deterministic queue models, I want to explain why it is that

145
00:10:24,559 --> 00:10:30,360
small packets can reduce and to end the way.

146
00:10:30,360 --> 00:10:35,600
You may have been wondering why we can't simply send an entire message in one packet.

147
00:10:35,600 --> 00:10:39,200
Why is it that we have to break messages down into smaller packets?

148
00:10:39,200 --> 00:10:43,919
There's a very good reason for this and I want to explain this in terms of the end to

149
00:10:43,919 --> 00:10:45,320
end delay.

150
00:10:45,320 --> 00:10:53,600
So on the left, I've got an example of a message of length R that's being delivered from

151
00:10:53,600 --> 00:10:55,440
end to end.

152
00:10:55,440 --> 00:11:00,560
This is going through three routers, R1, R2 and R3.

153
00:11:00,560 --> 00:11:04,760
And I'm just showing as we did before, the delay across each link in terms of the packet

154
00:11:04,760 --> 00:11:10,080
ization delay and the propagation delay over the links as it makes it way across the network.

155
00:11:10,080 --> 00:11:12,600
We already know the expression for the end to end delay for this.

156
00:11:12,600 --> 00:11:17,360
It's simply made up of the sum of all the M over RIs.

157
00:11:17,360 --> 00:11:19,280
This is the packetization delay.

158
00:11:19,280 --> 00:11:24,240
And then the sum of the all of the propagation delays over the links.

159
00:11:24,240 --> 00:11:27,840
So we've seen this before.

160
00:11:27,840 --> 00:11:33,840
If you look at the one on the right, we can see that the packet has been broken down into

161
00:11:33,840 --> 00:11:37,200
packets of length P. So I've broken that same message.

162
00:11:37,200 --> 00:11:39,080
It's the same length as before.

163
00:11:39,080 --> 00:11:40,519
Overall, this is the message.

164
00:11:40,519 --> 00:11:42,560
But I've just broken down into packets of length P.

165
00:11:42,560 --> 00:11:46,639
So the packetization delay over the first link is P over R1.

166
00:11:46,639 --> 00:11:51,799
And so now on the end to end delay is this expression here, P over RRI for the packetization

167
00:11:51,799 --> 00:11:58,240
delay on each link and then LI over C for the propagation delay.

168
00:11:58,240 --> 00:12:04,559
M over P is simply the additional time for the one, the ones who are over the end.

169
00:12:04,559 --> 00:12:08,599
Strictly speaking, this should be M minus 1 over P because it's the remaining packets.

170
00:12:08,599 --> 00:12:12,000
I'm going to assume that M is much bigger than P. So that's basically the same.

171
00:12:12,000 --> 00:12:18,519
M over P times R3, the packetization delay of that packet, of that set of packets over

172
00:12:18,519 --> 00:12:21,639
the last link.

173
00:12:21,639 --> 00:12:24,519
But the most important thing here is that you can see what's going on.

174
00:12:24,519 --> 00:12:29,240
In this case on the left, the whole message has to be transferred over the first link before

175
00:12:29,240 --> 00:12:31,360
it can start on the second link.

176
00:12:31,360 --> 00:12:36,720
Whereas over here, the first packet goes and then is transferred under the second link,

177
00:12:36,720 --> 00:12:39,759
while the first link is carrying the second packet.

178
00:12:39,759 --> 00:12:41,039
So we've got a pipelining effect.

179
00:12:41,039 --> 00:12:43,080
We've got parallelism over the links.

180
00:12:43,080 --> 00:12:46,159
And so therefore the end to end delay is going to be reduced.

181
00:12:46,159 --> 00:12:50,720
Over a long network with very big messages, this will make a very significant difference.

182
00:12:50,720 --> 00:12:58,080
And so the end to end delay can be reduced by making the packets smaller.

183
00:12:58,080 --> 00:12:59,560
Let's look at this simple example here.

184
00:12:59,560 --> 00:13:05,480
I've got a number of flows, N flows and packets coming in on, N external links, all running

185
00:13:05,480 --> 00:13:06,639
at rate R.

186
00:13:06,639 --> 00:13:11,639
I've got a packet buffer corresponding to the output queue of the router.

187
00:13:11,639 --> 00:13:14,519
And then an outgoing link that's running at rate R as well.

188
00:13:14,519 --> 00:13:19,360
Clearly, if all of those ingress links were running at the full rate R, then the output

189
00:13:19,360 --> 00:13:25,480
link would be overwhelmed and we'd start dropping packets very quickly.

190
00:13:25,480 --> 00:13:30,720
And in fact, there would be a rate of N times R coming in and a rate of 1R going out.

191
00:13:30,720 --> 00:13:35,800
So we'll be dropping them at a rate of N minus 1 times R.

192
00:13:35,800 --> 00:13:40,560
But because of the statistical model flexing and the burstiness of the arrivals, we can

193
00:13:40,560 --> 00:13:46,159
potentially get away with this if the average rates are sufficiently low.

194
00:13:46,159 --> 00:13:53,159
So in general, we say the reduction in rate that we need at the egress compared to the

195
00:13:53,159 --> 00:13:58,159
ingress is because of that statistical multiplexing and we call that benefit the statistical

196
00:13:58,159 --> 00:13:59,759
multiplexing gain.

197
00:13:59,759 --> 00:14:02,600
We never know what it's going to be precisely because it's going to depend on the particular

198
00:14:02,600 --> 00:14:05,559
arrival process of packets.

199
00:14:05,559 --> 00:14:10,600
And temporarily, if there are temporary over subscription to the output link, the buffer

200
00:14:10,600 --> 00:14:13,159
can absorb those brief periods.

201
00:14:13,159 --> 00:14:17,439
And so a bigger buffer is going to absorb bigger and longer periods when the aggregate rate

202
00:14:17,439 --> 00:14:19,679
happens to exceed R.

203
00:14:19,679 --> 00:14:24,199
But because the buffer has a finite size, there's always losses that can occur and that's

204
00:14:24,199 --> 00:14:29,159
just a fact of life in packet switching, nothing that we can do about that.

205
00:14:29,159 --> 00:14:35,759
Let's look at a couple of specific examples here.

206
00:14:35,759 --> 00:14:37,519
See the top here?

207
00:14:37,519 --> 00:14:47,279
I've got a communicating arrival process, a into this router buffer that's being drained

208
00:14:47,279 --> 00:14:49,559
at rate c.

209
00:14:49,559 --> 00:14:54,399
And a separate one that is going through a router that's arriving at b at rate b and being

210
00:14:54,399 --> 00:14:56,879
drained at rate c.

211
00:14:56,879 --> 00:15:01,840
And I'm showing over here on the left hand side, the rates as a function of time.

212
00:15:01,840 --> 00:15:05,439
And you can see here that the peaks and troughs don't exactly line up.

213
00:15:05,440 --> 00:15:10,520
So that if we take the sum of the two or the sum of these two flows, then we can expect

214
00:15:10,520 --> 00:15:12,520
there to be some statistical multiplexing gain.

215
00:15:12,520 --> 00:15:15,440
Let's have a look at what that might be.

216
00:15:15,440 --> 00:15:19,800
Because I made up these numbers, these are just to give us an example.

217
00:15:19,800 --> 00:15:24,880
But if we take a plus b here, it was the rate of a plus b.

218
00:15:24,880 --> 00:15:28,160
And that's the line in pink, that's this one here.

219
00:15:28,160 --> 00:15:34,200
You can see that the combined rate of the combined flows are.

220
00:15:34,200 --> 00:15:39,360
It's quite a bit less than 2c, in other words, less than the sum of the two peaks.

221
00:15:39,360 --> 00:15:44,320
So in this case, we would say the statistical multiplexing gain equals 2c over r.

222
00:15:44,320 --> 00:15:48,120
It's the benefit that we're getting from summing the two of them.

223
00:15:48,120 --> 00:15:50,879
We can actually come up with a different definition.

224
00:15:50,879 --> 00:15:55,360
And some people use a different definition for statistical multiplexing gain.

225
00:15:55,360 --> 00:15:58,280
Because in this case, you can see we didn't actually take advantage of the fact that there

226
00:15:58,280 --> 00:15:59,360
is a buffer.

227
00:15:59,360 --> 00:16:07,800
We're not using that to buffer any temporary rate that exceeds r.

228
00:16:07,800 --> 00:16:16,399
So one definition could be that for a given buffer size b, the ratio of the rates that we

229
00:16:16,399 --> 00:16:19,840
need in order to prevent packet loss is the statistical multiplexing gain.

230
00:16:19,840 --> 00:16:23,159
And that generally will be a lower rate, because we can absorb the change.

231
00:16:23,159 --> 00:16:31,839
So for example, in this case, imagine that we were to serve at this rate r prime instead.

232
00:16:31,839 --> 00:16:37,120
So we'll call that r prime, where r prime is a little bit less than r.

233
00:16:37,120 --> 00:16:43,199
So long as the amount that we need to buffer here and here when the rate exceeds r prime

234
00:16:43,199 --> 00:16:46,480
can be accommodated by the buffer, then we're okay.

235
00:16:46,480 --> 00:16:51,959
And so in this case for the buffer of size b, we might say that instead the multiplexing

236
00:16:51,960 --> 00:16:56,759
gain is to c over r prime, which is a slightly larger number.

237
00:16:56,759 --> 00:17:00,960
Okay, so two definitions of statistical multiplexing gain, one where we don't consider the

238
00:17:00,960 --> 00:17:05,960
buffer and one where we do.

239
00:17:05,960 --> 00:17:11,400
So in summary, often we can use a simple deterministic model of a queue to understand the packet dynamics

240
00:17:11,400 --> 00:17:12,400
in a network.

241
00:17:12,400 --> 00:17:13,400
And I'd encourage you to do this.

242
00:17:13,400 --> 00:17:17,000
It gives a very good intuitive understanding of what's happening in the network.

243
00:17:17,000 --> 00:17:19,039
I often use this myself.

244
00:17:19,519 --> 00:17:24,240
Second, we learn that we can break messages into packets or rather the reason that we break

245
00:17:24,240 --> 00:17:28,319
messages into packets is because it lets us pipeline the transfer of packets from one

246
00:17:28,319 --> 00:17:31,599
into another and reduces the end to end delay.

247
00:17:31,599 --> 00:17:36,799
Finally, statistical multiplexing lets us carry many flows efficiently on a single link.

248
00:17:36,799 --> 00:17:40,879
And this is one of the prime reasons that we use packet switching.

249
00:17:40,879 --> 00:17:45,119
Okay, that's the end of this video.

