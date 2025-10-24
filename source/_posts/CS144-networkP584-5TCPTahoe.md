---
title: CS144 NetworkP584 5TCPTahoe
---

1
00:00:00,000 --> 00:00:06,719
In the next three videos, I'm going to explain how TCP's congestion control works.

2
00:00:06,719 --> 00:00:11,200
The basic summary is that TCP uses additive increase, multiplicative decrease.

3
00:00:11,200 --> 00:00:14,640
But there are a lot of details on how this is achieved.

4
00:00:14,640 --> 00:00:17,320
TCP is considered a tremendous achievement in networking.

5
00:00:17,320 --> 00:00:21,679
It's reliable, a high performance transport layer that can operate well in a huge range

6
00:00:21,679 --> 00:00:23,679
of network environments.

7
00:00:23,679 --> 00:00:27,879
Of course, it's not perfect, but you can see at strength in how many applications depend

8
00:00:27,879 --> 00:00:29,080
on it.

9
00:00:29,079 --> 00:00:33,799
This video explains that TCP uses a simple finite state machine to control the number of packets

10
00:00:33,799 --> 00:00:35,759
it has outstanding in the network.

11
00:00:35,759 --> 00:00:41,119
This finite state machine implements an AMD-like algorithm as well as handling a connection,

12
00:00:41,119 --> 00:00:45,359
setup, and significant network disruptions.

13
00:00:45,359 --> 00:00:50,000
So recall, congestion controls how a network or protocol or system tries not to overload

14
00:00:50,000 --> 00:00:52,039
the network between two endpoints.

15
00:00:52,039 --> 00:00:54,799
Say we're transferring data between San Francisco and Boston.

16
00:00:54,799 --> 00:01:01,119
There are many routers between these two endpoints, each with its own cues and traffic load.

17
00:01:01,119 --> 00:01:05,019
If we send packets below the rate the Ralkin support, we can expect to see reasonably low

18
00:01:05,019 --> 00:01:06,879
packet drop rates.

19
00:01:06,879 --> 00:01:10,560
Most of the packets from San Francisco to Boston will arrive, and most of the packets from Boston

20
00:01:10,560 --> 00:01:12,679
to San Francisco will arrive.

21
00:01:12,679 --> 00:01:17,079
But if we send more packets than the Ralkin support, then they'll be dropped from cues.

22
00:01:17,079 --> 00:01:21,599
The sender needs to somehow detect that this packet was lost and retransmit it.

23
00:01:21,599 --> 00:01:25,000
This takes time and reduces performance.

24
00:01:25,000 --> 00:01:29,159
So the purpose of congestion control is to control how many packets the sender has outstanding

25
00:01:29,159 --> 00:01:30,319
in the network.

26
00:01:30,319 --> 00:01:34,119
The goal is to send as many packets as the network can support, but not more.

27
00:01:34,119 --> 00:01:37,119
Sending more will cause cues to fill up and drop packets.

28
00:01:37,119 --> 00:01:39,919
At a high level, this seems simple.

29
00:01:39,919 --> 00:01:45,399
What makes it difficult, as we'll see, is that in TCP's case, the sender has very limited

30
00:01:45,399 --> 00:01:50,479
information on the internal state of the network, and so must infer losses from these limited

31
00:01:50,480 --> 00:01:53,520
signals.

32
00:01:53,520 --> 00:01:58,600
The basic summary is that in its steady state, TCP uses AMD.

33
00:01:58,600 --> 00:02:01,439
It maintains a variable called congestion window.

34
00:02:01,439 --> 00:02:06,320
The congestion window specifies how many unacknowledged segments the connection can have outstanding

35
00:02:06,320 --> 00:02:08,400
in the network.

36
00:02:08,400 --> 00:02:13,400
As the sender receives acknowledgments, these indicate that segments have left the network,

37
00:02:13,400 --> 00:02:16,080
and so it can send more.

38
00:02:16,080 --> 00:02:21,640
Every round trip time RTT, TCP increases the size of the congestion window by one maximum

39
00:02:21,640 --> 00:02:24,160
segment size, 1 MSS.

40
00:02:24,160 --> 00:02:27,360
This is the additive increase of AMD.

41
00:02:27,360 --> 00:02:32,680
When TCP detects a packet loss, it halves the congestion window, or in some cases sets

42
00:02:32,680 --> 00:02:36,960
it to be one segment.

43
00:02:36,960 --> 00:02:41,480
So far, we've explained congestion control as a clear and obvious issue that arises.

44
00:02:41,479 --> 00:02:46,519
An AIMD is a simple and highly effective algorithm to manage congestion.

45
00:02:46,519 --> 00:02:48,439
But this wasn't realized from the beginning.

46
00:02:48,439 --> 00:02:53,199
I'm going to give a bit of history on how TCP evolved to use AIMD.

47
00:02:53,199 --> 00:02:54,399
This is a great story.

48
00:02:54,399 --> 00:02:57,079
The internet collapsed and became unusable.

49
00:02:57,079 --> 00:03:00,759
In response to this meltdown, some researchers came up with AIMD.

50
00:03:00,759 --> 00:03:04,919
I'll explain exactly how it works.

51
00:03:04,919 --> 00:03:07,839
This is the brief early history of TCP.

52
00:03:07,840 --> 00:03:11,479
In the mid to late 70s, VINSERF and others developed a 3-way handshake for connection

53
00:03:11,479 --> 00:03:16,240
establishment and split TCP into the two layers we know today, IP at the network layer and

54
00:03:16,240 --> 00:03:18,640
TCP at the transport layer.

55
00:03:18,640 --> 00:03:24,199
On January 1, 1983, the entire ARPANET switched to TCP IP.

56
00:03:24,199 --> 00:03:30,719
Three years later, in 1986, the internet began to suffer from congestion collapse.

57
00:03:30,719 --> 00:03:34,920
As TCP streams started saturating links, routers dropped packets.

58
00:03:34,919 --> 00:03:37,839
But TCP didn't respond well to these drop packets.

59
00:03:37,839 --> 00:03:42,239
TCP spent most of its time retransiting packets that arrived successfully, continuing to waste

60
00:03:42,239 --> 00:03:44,679
the capacity of these saturated links.

61
00:03:44,679 --> 00:03:49,199
This kept packet losses high, so that new segments were dropped often, and so applications

62
00:03:49,199 --> 00:03:51,399
saw very low data rates.

63
00:03:51,399 --> 00:03:55,079
The network was working furiously hard, sending wasted segments.

64
00:03:55,079 --> 00:03:57,519
This coined the term congestion collapse.

65
00:03:57,519 --> 00:04:04,079
The network was tremendously congestion, but applications saw no useful work being done.

66
00:04:04,080 --> 00:04:09,780
In 1987-1988, Van Jacobson dug into what was happening in Fixed TCP, publishing the

67
00:04:09,780 --> 00:04:15,200
seminal TCP paper whose algorithms underlie all TCP implementations today.

68
00:04:15,200 --> 00:04:20,280
This version of TCP was called TCP Tahoe, named after the particular release of BSD Unix

69
00:04:20,280 --> 00:04:21,840
that it was packaged with.

70
00:04:21,840 --> 00:04:27,720
Two years later, some further improvements were added to TCP, in a version called TCP Reno.

71
00:04:27,720 --> 00:04:32,199
Modern TCP layers added a bit more complexity on top of TCP Reno for modern network speeds,

72
00:04:32,199 --> 00:04:37,759
but have TCP Reno at their core.

73
00:04:37,759 --> 00:04:41,959
So we can boil Tia down TCP to three questions.

74
00:04:41,959 --> 00:04:43,920
When should you send new data?

75
00:04:43,920 --> 00:04:45,879
When should you retransmit data?

76
00:04:45,879 --> 00:04:52,399
And when should you send acknowledgments?

77
00:04:52,399 --> 00:04:55,800
In this video, I'm going to explain the answer to the first question.

78
00:04:55,800 --> 00:04:58,759
When should TCP send new data?

79
00:04:58,759 --> 00:05:08,639
When the answer to the second two in the next video on RTT estimation and self-clocking.

80
00:05:08,639 --> 00:05:13,839
Remember the TCP has a window field in its header, which one side of a connection uses

81
00:05:13,839 --> 00:05:17,560
it to tell the other side the size of its flow control window.

82
00:05:17,560 --> 00:05:22,719
The TCP specification says that a TCP sender shouldn't send data past the last acknowledged

83
00:05:22,719 --> 00:05:25,959
byte plus the size of the flow control window.

84
00:05:25,959 --> 00:05:31,759
Flow control ensures that a sender doesn't send data that a receiver can't handle.

85
00:05:31,759 --> 00:05:37,399
The original version of TCP would, once the three-way handshake completed, send a full window

86
00:05:37,399 --> 00:05:39,240
of segments.

87
00:05:39,240 --> 00:05:44,839
So if a receiver, so if a sender received a flow control window of 40 kilobytes and had

88
00:05:44,839 --> 00:05:50,399
40 kilobytes to send, it would send 40 kilobytes worth of segments immediately.

89
00:05:50,399 --> 00:05:55,039
It would instead have to retransmit a timer for each packet, for each segment.

90
00:05:55,040 --> 00:06:00,160
If the timer fired and the segment hadn't been acknowledged, TCP would retransmit it.

91
00:06:00,160 --> 00:06:04,560
As acknowledgements come in, they can advance the sender's window when the sum of the

92
00:06:04,560 --> 00:06:08,280
acknowledgement number and the window fields indicates that the receiver can handle more

93
00:06:08,280 --> 00:06:10,920
data.

94
00:06:10,920 --> 00:06:16,000
This turns out to be a problem if the window is much larger than what the network can support.

95
00:06:16,000 --> 00:06:20,680
Suppose for example that the bottle link between two endpoints can only queue a few packets.

96
00:06:20,680 --> 00:06:25,519
As soon as the handshake completes, the sender sends 30 or more packets.

97
00:06:25,519 --> 00:06:32,360
After the first few fill up the bottle neck link, the bottle neck queue, the rest will be dropped.

98
00:06:32,360 --> 00:06:34,720
And this is exactly what was observed.

99
00:06:34,720 --> 00:06:39,600
This plot is from the seminal paper that established TCP's congestion control mechanisms.

100
00:06:39,600 --> 00:06:44,000
The X-axis shows time in seconds.

101
00:06:44,000 --> 00:06:51,240
The Y-axis shows in terms of segment sequence numbers what segments TCP transmits.

102
00:06:51,240 --> 00:06:56,399
A line up and to the right means TCP is sending more data, while a line that jumps down and

103
00:06:56,399 --> 00:07:02,399
to the right means that there's a retransmission because TCP is sending an older sequence number.

104
00:07:02,399 --> 00:07:07,920
Two points with the same Y, but different X values show retransmissions.

105
00:07:07,920 --> 00:07:12,439
The straight line shows the available bandwidth about 20 kilobytes per second.

106
00:07:12,439 --> 00:07:14,480
This is from much slower than.

107
00:07:14,480 --> 00:07:22,800
If TCP were behaving well, then we'd see the dark line track this light line filling the available bandwidth.

108
00:07:22,800 --> 00:07:24,920
But that's not what we see.

109
00:07:24,920 --> 00:07:31,040
Instead, we can see in this plot is that TCP immediately sends a lot of segments much more than

110
00:07:31,040 --> 00:07:37,360
the network can handle.

111
00:07:37,360 --> 00:07:43,280
It then waits nearly a second until a timeout causes it to retransmit a packet.

112
00:07:43,280 --> 00:07:48,639
Then with the window advanced, it sends a flurry of more segments, some of which again are

113
00:07:48,639 --> 00:07:49,639
lost.

114
00:07:49,639 --> 00:07:54,720
This jagged pattern means the TCP is losing packets from almost every bursted sends, and

115
00:07:54,720 --> 00:08:01,120
the overall slope of the line is well below the capacity of 20 kilobytes per second.

116
00:08:01,120 --> 00:08:05,280
So TCP Tahoe added three improvements to properly control congestion.

117
00:08:05,279 --> 00:08:09,239
A congestion window, better timeout estimation, and self-clocking.

118
00:08:09,239 --> 00:08:15,839
In the rest of this video, I'll present the first one.

119
00:08:15,839 --> 00:08:18,599
Recall that flow control is about what an endpoint can handle.

120
00:08:18,599 --> 00:08:22,039
TCP won't send data past what the flow control window specifies.

121
00:08:22,039 --> 00:08:26,119
But what if the endpoint can handle more data than the network can?

122
00:08:26,119 --> 00:08:31,319
The flow control window is only an upper bound on how much data the sender should send.

123
00:08:31,319 --> 00:08:36,360
It could be for good performance that it should send much less.

124
00:08:36,360 --> 00:08:40,679
So TCP Tahoe estimates something called a congestion window for the network.

125
00:08:40,679 --> 00:08:46,200
Its sending window is the maximum of the flow window and the congestion window.

126
00:08:46,200 --> 00:08:49,559
Don't send more than the other side can handle, and don't send more than the network can

127
00:08:49,559 --> 00:08:50,559
handle.

128
00:08:50,559 --> 00:08:55,039
To manage this congestion window, TCP separates congestion control to two states, called

129
00:08:55,039 --> 00:08:58,360
slow start and congestion avoidance.

130
00:08:58,360 --> 00:09:04,000
In this steady state, TCP is in the congestion avoidance state in which it follows an AIMD

131
00:09:04,000 --> 00:09:05,399
policy.

132
00:09:05,399 --> 00:09:10,120
When a connection starts up or there is a packet timeout, TCP enters the slow start state

133
00:09:10,120 --> 00:09:18,240
which does not follow an AIMD policy.

134
00:09:18,240 --> 00:09:22,920
The way to think about how the congestion avoidance and slow start states work is in terms

135
00:09:22,920 --> 00:09:26,879
of how much they increase their congestion window.

136
00:09:26,879 --> 00:09:32,159
When TCP enters the slow start state, its congestion window is the maximum segment size,

137
00:09:32,159 --> 00:09:35,200
MSS, or one segment.

138
00:09:35,200 --> 00:09:39,799
Every time it receives a new acknowledgement, that is, an acknowledgement segment that

139
00:09:39,799 --> 00:09:44,600
acknowledges data that hasn't been acknowledged before, TCP increases the congestion window

140
00:09:44,600 --> 00:09:48,399
by one maximum segment size.

141
00:09:48,399 --> 00:09:52,559
This policy in slow start means that the congestion window grows exponentially.

142
00:09:52,559 --> 00:09:57,079
The sender starts the window of size of MSS, it sends a segment.

143
00:09:57,079 --> 00:10:00,839
When it receives an acknowledgement, it increases the congestion window to two MSS and sends

144
00:10:00,839 --> 00:10:02,159
two new segments.

145
00:10:02,159 --> 00:10:05,039
When it receives the acknowledge for these segments, it increases the congestion window to four

146
00:10:05,039 --> 00:10:10,000
MSS, one for each acknowledgement, and sends four new segments.

147
00:10:10,000 --> 00:10:12,679
The name slow start might seem a bit misleading.

148
00:10:12,679 --> 00:10:16,159
Exponential increase is much faster than additive increase.

149
00:10:16,159 --> 00:10:20,559
But it's called slow start because it's slow in comparison to the old approach TCP used

150
00:10:20,559 --> 00:10:29,519
of sending the whole flow control window immediately.

151
00:10:29,519 --> 00:10:35,159
In the congestion of Voidant State, TCP increases the window much more slowly and resembles

152
00:10:35,159 --> 00:10:37,319
AIMD.

153
00:10:37,319 --> 00:10:46,599
It increases the window by one MSS squared, divided by the congestion window for each acknowledgement.

154
00:10:46,600 --> 00:10:51,560
Having no packets are dropped, this causes TCP to increase the congestion window by one

155
00:10:51,560 --> 00:10:53,399
MSS per round trip time.

156
00:10:53,399 --> 00:11:00,000
So, think we want to increase the window by one MSS per round trip time.

157
00:11:00,000 --> 00:11:04,000
There are congestion window divided by MSS segments outstanding.

158
00:11:04,000 --> 00:11:08,000
If there are n outstanding segments, then each acknowledgement should add one-nth of our

159
00:11:08,000 --> 00:11:09,680
desired increase to the congestion window.

160
00:11:09,680 --> 00:11:15,120
Put in terms of bytes, this means MSS divided by congestion window.

161
00:11:15,120 --> 00:11:19,440
Sets are desired increases MSS, this means each acknowledgement increases the window by

162
00:11:19,440 --> 00:11:23,440
MSS times MSS divided by the congestion window.

163
00:11:23,440 --> 00:11:33,039
So, this is the additive increase part of AIMD.

164
00:11:33,039 --> 00:11:34,639
So we have these two states.

165
00:11:34,639 --> 00:11:39,560
The first slow start allows TCP to quickly find the available network capacity.

166
00:11:39,560 --> 00:11:43,279
For example, suppose the network can support a congestion window of 40 packets, leading

167
00:11:43,279 --> 00:11:46,360
40 round trip times to reach this value would take too long.

168
00:11:46,360 --> 00:11:49,759
But when we're close to the network capacity, we want these congestion avoidance to more

169
00:11:49,759 --> 00:11:52,759
carefully probe using additive increase.

170
00:11:52,759 --> 00:11:56,600
So, how should we choose the transition between these two states?

171
00:11:56,600 --> 00:12:00,480
TCP has three signals available to it.

172
00:12:00,480 --> 00:12:03,639
Increasing acknowledgments mean the transfer is going well.

173
00:12:03,639 --> 00:12:08,039
Since TCP uses cumulative acknowledgments, duplicate acknowledgments mean the segment

174
00:12:08,039 --> 00:12:12,079
was lost or delayed, but other segments are arriving successfully.

175
00:12:12,400 --> 00:12:15,560
Finally, if there's a timeout, then something is very wrong.

176
00:12:20,759 --> 00:12:23,400
So this is what the TCP state machine looks like.

177
00:12:23,400 --> 00:12:27,160
A connection starts in a slow start state.

178
00:12:27,160 --> 00:12:34,440
From there, every time it receives an acknowledgment, it increases the congestion window, C-wind, by

179
00:12:34,440 --> 00:12:36,800
one MSS.

180
00:12:36,799 --> 00:12:43,079
It increases the congestion window, so, until it passes a threshold called SS-thresh, or

181
00:12:43,079 --> 00:12:45,240
slow start threshold.

182
00:12:45,240 --> 00:12:50,879
When the congestion window grows larger than this threshold, TCP transitions into the congestion

183
00:12:50,879 --> 00:12:52,879
avoidance state.

184
00:12:52,879 --> 00:12:57,120
While in the congestion avoidance state, it increases the congestion window more conservatively,

185
00:12:57,120 --> 00:13:01,639
one MSS per round trip time.

186
00:13:01,639 --> 00:13:06,759
On a timeout or triple duplicate acknowledgment, TCP transitions back to the slow start state.

187
00:13:07,759 --> 00:13:13,840
TCP inferred that three duplicate acknowledgments, so four of the same act, are good evidence

188
00:13:13,840 --> 00:13:16,120
that the next segment was lost.

189
00:13:16,120 --> 00:13:20,279
The receiver is continuing to receive segments, but can't forward the acknowledgment number

190
00:13:20,279 --> 00:13:22,200
because it's missing one.

191
00:13:22,200 --> 00:13:28,039
When TCP transitions back to the slow start state, it sets the SS-thresh variable to be half

192
00:13:28,039 --> 00:13:30,319
of the congestion window.

193
00:13:30,319 --> 00:13:35,360
This value sets the cutoff after which TCP will follow AIMD.

194
00:13:35,360 --> 00:13:43,840
So on a packet loss, TCP enters slow start, then AIMD.

195
00:13:43,840 --> 00:13:48,879
This figure shows an example of how TCP Tahoe's congestion window behaves over time.

196
00:13:48,879 --> 00:13:54,240
It starts with a size of one MSS and increases exponentially.

197
00:13:54,240 --> 00:13:57,080
The first drop is responsive to a timeout.

198
00:13:57,080 --> 00:14:02,920
The window is returned to one MSS and begins to climb exponentially again, until it reaches

199
00:14:02,919 --> 00:14:08,000
half of its original value, at which point it begins growing additively.

200
00:14:08,000 --> 00:14:12,279
It grows until its segment is lost, and there are three duplicate acknowledgments.

201
00:14:12,279 --> 00:14:15,439
The window does an increase in response to the duplicate act.

202
00:14:15,439 --> 00:14:21,360
It then drops to one MSS, increases exponentially following slow start until it reaches SS-thresh,

203
00:14:21,360 --> 00:14:24,959
and starts increasing additively again.

204
00:14:24,959 --> 00:14:29,480
If you look carefully, SS-thresh is the same variable times in this example, TCP returns

205
00:14:29,480 --> 00:14:33,800
to slow start, and then it transitions to congestion of points at the same window size.

206
00:14:33,800 --> 00:14:38,000
For this simple plot, this occurs because I calculated SS-thresh in terms of integer numbers

207
00:14:38,000 --> 00:14:43,200
of MSS, and both cases are rounded down to the same value.

208
00:14:43,200 --> 00:14:46,920
Note that TCP Tahoe doesn't strictly manage congestion using AIMD.

209
00:14:46,920 --> 00:14:53,279
While AIMD is an excellent algorithm for managing the steady state or a stable network.

210
00:14:53,279 --> 00:14:57,720
In practice, TCP has to deal with a much wider range of conditions, such as startup, transient

211
00:14:57,720 --> 00:15:02,399
network failures, and losing bursts of packets, or sudden changes in the available bandwidth.

212
00:15:02,399 --> 00:15:05,279
So recall these three questions.

213
00:15:05,279 --> 00:15:07,040
When does TCP send new data?

214
00:15:07,040 --> 00:15:08,519
When does it retransmit data?

215
00:15:08,519 --> 00:15:10,759
And when does it acknowledge data?

216
00:15:10,759 --> 00:15:12,360
This answers the first question.

217
00:15:12,360 --> 00:15:17,019
TCP sends new data when its sender window defined as the minimum of its congestion window

218
00:15:17,019 --> 00:15:19,960
and flow control window allows it to do so.

219
00:15:19,960 --> 00:15:24,399
The congestion window is a value of sender maintains based on the acknowledgments and timeouts it

220
00:15:24,399 --> 00:15:25,399
observes.

