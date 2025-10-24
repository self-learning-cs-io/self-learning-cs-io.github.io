---
title: CS144 NetworkP624 7CongestionControl
---

1
00:00:00,000 --> 00:00:06,120
In this video, I want to talk about some more modern versions of TCP, TCP Reno and Neurino.

2
00:00:06,120 --> 00:00:10,640
Where TCP Tahoe solve the congestion control problems such that TCP could operate and the

3
00:00:10,640 --> 00:00:14,560
Internet could work again, it wasn't necessarily as high performance as it could be, as

4
00:00:14,560 --> 00:00:17,199
since it was a bit more conservative than it needed to be.

5
00:00:17,199 --> 00:00:20,640
And so since then, there have been improvements to TCP, although it's still keeping the original

6
00:00:20,640 --> 00:00:29,039
mechanisms of TCP Tahoe, to have it send data more quickly and have higher performance.

7
00:00:29,039 --> 00:00:32,879
So I'm going to walk through two of those additions, one is something called TCP Reno and

8
00:00:32,879 --> 00:00:34,879
then TCP Neurino.

9
00:00:34,879 --> 00:00:43,519
To recall for TCP Tahoe, if the protocol is running and you encounter a timeout or a triple

10
00:00:43,519 --> 00:00:47,359
duplicate act, which implies that there's a lost packet, you do three things.

11
00:00:47,359 --> 00:00:50,799
You set your slow start threshold to be the congestion window divided by two.

12
00:00:50,799 --> 00:00:54,320
So it's determining when you're going to enter the congestion avoidance state as the congestion

13
00:00:54,320 --> 00:00:56,239
window grows again.

14
00:00:56,240 --> 00:01:00,160
You set the congestion window to one and you enter the slow start state.

15
00:01:00,160 --> 00:01:04,159
The idea here is that you're sending along your sending data.

16
00:01:04,159 --> 00:01:11,040
Let's just say here is the window size, your sending data, something happens, there's an

17
00:01:11,040 --> 00:01:13,320
event.

18
00:01:13,320 --> 00:01:18,240
You set your threshold to be half of your original window size, you set your congestion window

19
00:01:18,240 --> 00:01:24,640
to be one, you enter slow start again, exponential growth, and then when you reach this threshold,

20
00:01:24,640 --> 00:01:26,920
you do additive increase again.

21
00:01:26,920 --> 00:01:29,519
So that's TCP Tahoe's behavior.

22
00:01:29,519 --> 00:01:33,239
And so here's a picture just showing that a little more clearly.

23
00:01:33,239 --> 00:01:38,640
So here we start with the congestion window of size one, when the slow start state, then

24
00:01:38,640 --> 00:01:43,599
there's say a triple duplicate act or a timeout.

25
00:01:43,599 --> 00:01:48,560
We set the congestion window to be size one again, but we have a slow start threshold here,

26
00:01:48,560 --> 00:01:50,760
which is half of this value.

27
00:01:50,760 --> 00:01:53,480
So if this is x, this is x over two.

28
00:01:53,480 --> 00:01:57,160
So we do exponential growth again until we reach this point, which point now are in congestion

29
00:01:57,160 --> 00:02:01,240
avoidance, linear increase.

30
00:02:01,240 --> 00:02:06,240
And here we have a timeout.

31
00:02:06,240 --> 00:02:07,760
The window size is staying stable.

32
00:02:07,760 --> 00:02:16,400
Boom, drop down the congestion window, size one again, slow start, congestion avoidance,

33
00:02:16,400 --> 00:02:18,360
timeout, etc.

34
00:02:18,360 --> 00:02:23,800
So we see this behavior of whenever we have a triple duplicate act or a timeout, we end

35
00:02:23,800 --> 00:02:29,160
up reducing the congestion window to a size one, going through slow start, and then entering

36
00:02:29,160 --> 00:02:34,200
congestion avoidance.

37
00:02:34,200 --> 00:02:41,280
So TCP Reno generally behaves similar to TCP Tahoe with one exception, which is that on

38
00:02:41,280 --> 00:02:45,520
a timeout it behaves the same way that it sets this congestion window to be size one and

39
00:02:45,520 --> 00:02:46,520
does slow start again.

40
00:02:46,520 --> 00:02:50,280
The assumption here is, hey, things have gone very wrong if I have a timeout.

41
00:02:50,280 --> 00:02:53,200
And so I'm just going to assume nothing about the network and pretend as if things were

42
00:02:53,200 --> 00:02:57,840
just starting from the beginning.

43
00:02:57,840 --> 00:03:01,719
What TCP Reno does differently is on a triple duplicate act.

44
00:03:01,719 --> 00:03:07,480
It assumes, look, a segment was lost, but other segments are arriving.

45
00:03:07,480 --> 00:03:11,920
Chances are I'm close to what my speed should be.

46
00:03:11,920 --> 00:03:15,040
I don't need to drop my congestion window to size one.

47
00:03:15,039 --> 00:03:20,479
Instead, I still set the threshold to be congestion window divided by two, as before.

48
00:03:20,479 --> 00:03:24,759
But I set my congestion window itself to congestion window divided by two.

49
00:03:24,759 --> 00:03:26,719
So this is called fast recovery.

50
00:03:26,719 --> 00:03:33,000
Rather than entering slow start again, I just have my congestion window.

51
00:03:33,000 --> 00:03:34,479
Then it adds another mechanism.

52
00:03:34,479 --> 00:03:38,919
This is called fast retransmit, which it won't wait for the timeout on a triple duplicate

53
00:03:38,919 --> 00:03:39,919
act.

54
00:03:39,919 --> 00:03:41,120
It says, look, I have a triple duplicate act.

55
00:03:41,120 --> 00:03:43,680
It means that that segment is really likely to be lost.

56
00:03:43,680 --> 00:03:46,040
So I'm just going to retransmit it immediately.

57
00:03:46,040 --> 00:03:52,080
What this behavior means is that on a triple duplicate act, TCP Reno will stay in the congestion

58
00:03:52,080 --> 00:03:56,080
avoidance state, isn't going to require a logarithmic number of steps to enter that state,

59
00:03:56,080 --> 00:03:58,080
which means the window size is bigger.

60
00:03:58,080 --> 00:04:00,920
Fast retransmit means it's not going to have to wait for a timeout.

61
00:04:00,920 --> 00:04:04,319
So in theory, it is that it's not going to have a couple of round trip times where it's

62
00:04:04,319 --> 00:04:05,319
then ramping up.

63
00:04:05,319 --> 00:04:11,879
So its overall throughput will be higher.

64
00:04:11,879 --> 00:04:16,439
This is a picture showing how TCP Reno behaves under similar circumstances.

65
00:04:16,439 --> 00:04:18,839
Right here, we see we start in the slow start state.

66
00:04:18,839 --> 00:04:19,839
Here's slow start.

67
00:04:19,839 --> 00:04:23,000
Then we have a triple duplicate act.

68
00:04:23,000 --> 00:04:27,319
And rather than drop down to congestion window of size one, it sets, if our congestion

69
00:04:27,319 --> 00:04:33,759
window here was x, it sets the congestion window to be x divided by two.

70
00:04:33,759 --> 00:04:38,920
And since that is the slow start threshold, this causes the protocol to reenter congestion

71
00:04:38,920 --> 00:04:41,439
avoidance to enter congestion avoidance.

72
00:04:41,439 --> 00:04:44,959
And here we see a triple duplicate act.

73
00:04:44,959 --> 00:04:46,399
Do the fast retransmit.

74
00:04:46,399 --> 00:04:47,800
We get the acknowledgement.

75
00:04:47,800 --> 00:04:49,519
We're growing the window again.

76
00:04:49,519 --> 00:04:50,519
Then here we have a timeout.

77
00:04:50,519 --> 00:04:55,279
And when a timeout TCP Reno behaves in the same way, in that it sets, it says something

78
00:04:55,279 --> 00:04:56,680
has gone drastically wrong.

79
00:04:56,680 --> 00:05:00,920
I set my congestion window to be one.

80
00:05:00,920 --> 00:05:03,800
And enter the slow start state again.

81
00:05:03,800 --> 00:05:08,959
So here we have slow start, congestion avoidance, congestion avoidance.

82
00:05:09,359 --> 00:05:13,079
Timeout and triple duplicate act.

83
00:05:13,079 --> 00:05:16,079
So this is how TCP Reno behaves.

84
00:05:16,079 --> 00:05:18,079
So let's walk through that.

85
00:05:18,079 --> 00:05:23,519
So my sender sends packet one.

86
00:05:23,519 --> 00:05:26,120
I get an acknowledgement one.

87
00:05:26,120 --> 00:05:28,279
I send two and three.

88
00:05:31,279 --> 00:05:32,799
I get acknowledgments two and three.

89
00:05:33,199 --> 00:05:39,800
I then send four, five, six, seven.

90
00:05:39,800 --> 00:05:44,800
And let's say that packet four is lost.

91
00:05:44,800 --> 00:05:55,800
Well, the receiver is still going to send acknowledgments.

92
00:05:55,800 --> 00:06:00,800
But in response to five, six, and seven, it's going to send act three.

93
00:06:03,800 --> 00:06:07,600
Act three, three times.

94
00:06:07,600 --> 00:06:08,560
So triple duplicate act.

95
00:06:08,560 --> 00:06:10,680
So at this point, the condition window is one.

96
00:06:10,680 --> 00:06:12,000
Here it was two.

97
00:06:12,000 --> 00:06:13,240
Here it was four.

98
00:06:13,240 --> 00:06:20,240
Now in receiving this triple duplicate act, TCP Reno is going to set congestion window to be two.

99
00:06:20,240 --> 00:06:24,040
Immediately retransmit packet four.

100
00:06:24,040 --> 00:06:25,400
Right, fast retransmit.

101
00:06:25,400 --> 00:06:26,519
So here's the fast retransmit.

102
00:06:26,519 --> 00:06:27,199
No timeout.

103
00:06:27,199 --> 00:06:37,039
And hopefully we will get an act seven.

104
00:06:37,039 --> 00:06:41,079
At which point now we have congestion window size of size two.

105
00:06:41,079 --> 00:06:48,000
And we'll send packets eight and nine.

106
00:06:48,000 --> 00:06:50,519
So TCP Reno significantly improves TCP's throughput.

107
00:06:50,519 --> 00:06:55,000
You don't have to enter the slow start state and drop your condition window to size one,

108
00:06:55,000 --> 00:06:56,599
just when a single segment is lost.

109
00:06:57,920 --> 00:07:02,039
TCP Reno improves things even a little bit more.

110
00:07:02,039 --> 00:07:05,199
Essentially, it behaves the same as tau and Reno on timeout.

111
00:07:05,199 --> 00:07:12,800
When you're in the fast recovery state, it does something a little fancy with your congestion window.

112
00:07:12,800 --> 00:07:19,120
When you enter fast recovery, so this is when there's a triple duplicate act.

113
00:07:19,120 --> 00:07:25,959
On every duplicate act that you receive, you inflate the congestion window by the maximum segment size.

114
00:07:25,959 --> 00:07:30,279
Then when the last packet that's outstanding is acknowledged, you return to the congestion

115
00:07:30,279 --> 00:07:31,279
of void in the state.

116
00:07:31,279 --> 00:07:36,079
You set your congestion window back to the value set when entering fast recovery.

117
00:07:36,079 --> 00:07:43,319
And essentially what this is going to do is if I have a large window about standing packets,

118
00:07:43,319 --> 00:07:48,079
like I say, you know, I have a very large window.

119
00:07:48,079 --> 00:07:51,240
In this case, let's just say, let's say I have eight packets.

120
00:07:51,240 --> 00:07:53,159
It's not a super large window, but it's for drawing.

121
00:07:53,159 --> 00:07:55,279
It's reasonable.

122
00:07:55,279 --> 00:07:59,519
And this packet here is lost.

123
00:07:59,519 --> 00:08:01,559
So let's call this packet packs.

124
00:08:01,559 --> 00:08:03,479
This packet is lost.

125
00:08:03,479 --> 00:08:06,879
Each of these packets are going to tricker duplicate in knowledgements.

126
00:08:09,919 --> 00:08:14,000
And as now TCP Reno receives these duplicate acknowledgments,

127
00:08:14,000 --> 00:08:17,199
it's going to start inflating its congestion window size.

128
00:08:17,199 --> 00:08:23,159
And as it inflates the congestion window size, what that's going to let it do is start sending new packets.

129
00:08:25,679 --> 00:08:29,799
The idea here is we have evidence that packets are leaving the network.

130
00:08:29,799 --> 00:08:32,279
And so it's okay to send new packets.

131
00:08:32,279 --> 00:08:36,879
We don't want to send new two quickly, we're close to the congestion point of the network.

132
00:08:36,879 --> 00:08:39,799
But otherwise what happens when we do a fast recovery transmit,

133
00:08:39,799 --> 00:08:44,240
we essentially have to wait for an entire RTT before we can send a new packet.

134
00:08:44,240 --> 00:08:50,000
We have to do this retransmission and then we get the acknowledgment, we can now move the window forward.

135
00:08:50,000 --> 00:08:53,079
And so there's this whole RTT where essentially TCP sits idle.

136
00:08:56,240 --> 00:09:05,279
And you see that in this example here, where gosh, we have the situation where there are these idle periods waiting for the retransmission.

137
00:09:10,879 --> 00:09:15,559
And so essentially what this tweet goes through, explicitly in a second,

138
00:09:15,559 --> 00:09:21,319
allows TCP Reno to do is to start sending out new packets while the fast recovery transmit is in flight.

139
00:09:21,320 --> 00:09:24,400
It starts inflating the congestion window to be bigger,

140
00:09:24,400 --> 00:09:29,480
so that even though this was the last technology packet, it can start sending new packets.

141
00:09:29,480 --> 00:09:34,720
But then once we get a proper acknowledgment, like let's say we get an acknowledgment for this segment here,

142
00:09:34,720 --> 00:09:38,240
then it suddenly reduces the congestion window size to the right size,

143
00:09:38,240 --> 00:09:40,760
so it's not like we've suddenly saturated the network.

144
00:09:42,960 --> 00:09:45,360
So let's walk through what this looks like.

145
00:09:45,399 --> 00:09:54,919
So let's say we have a congestion window of size 16, and we encounter a triple duplicate act.

146
00:09:58,480 --> 00:10:01,680
So the rules mean we're going to set the congestion window to be eight.

147
00:10:01,680 --> 00:10:06,120
So at this point, we have a triple duplicate act, the congestion window becomes eight.

148
00:10:08,680 --> 00:10:10,800
And we're going to do fast recovery transmit.

149
00:10:10,799 --> 00:10:17,039
And so a triple duplicate act comes in and we send out fast retransmission.

150
00:10:22,479 --> 00:10:26,599
Meanwhile, while that fast recovery transmit packet is outstanding,

151
00:10:26,599 --> 00:10:28,559
we're receiving additional acknowledgments.

152
00:10:30,039 --> 00:10:33,639
The window size was 16, and so we had a triple duplicate act.

153
00:10:33,639 --> 00:10:41,279
So actually we expect to receive order 16 or 15 duplicate acts.

154
00:10:41,279 --> 00:10:46,919
And so as those start streaming in, what we're going to do is increase the congestion window by one for each.

155
00:10:46,919 --> 00:10:49,279
And so we encounter those three triple duplicate.

156
00:10:49,279 --> 00:10:56,759
So over this interval here, the congestion window is going to increase plus one for each of those duplicate acknowledgments,

157
00:10:56,759 --> 00:11:00,120
which means it's going to increase up to 23.

158
00:11:01,120 --> 00:11:02,840
So this might seem really big.

159
00:11:02,840 --> 00:11:06,240
So we'll even fled our congestion window from 16 to 23.

160
00:11:06,240 --> 00:11:09,560
But think about what this means in terms of the sequence number space.

161
00:11:09,560 --> 00:11:14,639
So we had this window of packets, right?

162
00:11:14,639 --> 00:11:16,799
And this was the last acknowledged packet here.

163
00:11:16,799 --> 00:11:19,399
Let's just call it packet one, right?

164
00:11:19,399 --> 00:11:25,320
Then we've started and we have an outstanding window of size 16, right?

165
00:11:25,320 --> 00:11:27,600
So we can send from one, right?

166
00:11:27,759 --> 00:11:31,480
So we can safely send from packet one to 16.

167
00:11:35,720 --> 00:11:38,040
So we got that last acknowledgment for one.

168
00:11:38,040 --> 00:11:39,759
You know, we could send 16.

169
00:11:39,759 --> 00:11:45,960
Everything is, so when one was acknowledged, it would have sent 17, so everything is good.

170
00:11:45,960 --> 00:11:54,680
Now we have a triple duplicate act, and we're not going to be able to send anything past 17 until the congestion window grows beyond 17.

171
00:11:54,679 --> 00:11:56,559
And so it's starting at one.

172
00:11:56,559 --> 00:11:58,159
And the congestion window has shrunk to eight.

173
00:11:58,159 --> 00:12:08,159
And so this means that the valid packets were allowed to send are 2345678 and nine, right?

174
00:12:08,159 --> 00:12:09,839
That's not very helpful.

175
00:12:09,839 --> 00:12:14,559
And so now, as these additional acknowledgments come in, we're going to start inflating this.

176
00:12:14,559 --> 00:12:20,519
So we're going to allow ourselves to send to 10 to 11 to 12 to 13 to 14, etc, etc, etc.

177
00:12:20,519 --> 00:12:37,720
Until when we get, say, the eighth duplicate acknowledgment, now suddenly, we have increased our congestion window size back up to 16, which means that, well, we could resend 17.

178
00:12:37,720 --> 00:12:44,279
And then when we get the ninth, we've increased it to 17, which means that we can now send packet 18.

179
00:12:44,279 --> 00:12:47,120
And so this will then increase up to 23.

180
00:12:47,120 --> 00:12:56,919
And essentially what this does is it's inflates the congestion window so we can send up to packet 24.

181
00:12:56,919 --> 00:13:10,240
Now if you look at this carefully, packets 17, 18, 19, 20, 20, 22, 23, 24, that's eight packets, which is equal to what the actual congestion window size is.

182
00:13:10,240 --> 00:13:22,519
And the idea is that by inflating in this way, given that we have it, now we're adding plus one, the last half of acknowledgments that arrive will allow us to clock out new packets.

183
00:13:22,519 --> 00:13:31,440
And so essentially, then and as soon as the faster transfer acknowledgment comes in, we just reset everything, gosh, things are acknowledged or congestion window size 8, we can start moving forward.

184
00:13:31,440 --> 00:13:38,240
But essentially what this does is this inflating of the window after a triple duplicate acknowledgment.

185
00:13:38,240 --> 00:13:44,560
It allows TCP new Reno to continue to send data while the faster transmit is in flight.

186
00:13:44,560 --> 00:13:49,519
And the amount of data it's going to send is equal to, and it's clocked by again, acknowledgments coming in.

187
00:13:49,519 --> 00:13:51,919
So you know packets are leaving the network.

188
00:13:51,919 --> 00:14:03,960
The expected congestion window size for the next run trip time, assuming that the returns, the faster transfer packet is delivered successfully.

189
00:14:04,000 --> 00:14:05,960
So that's TCP Reno and Reno.

190
00:14:05,960 --> 00:14:11,440
New Reno is generally used in many systems today, or at least the basis for TCP today.

191
00:14:11,440 --> 00:14:16,440
I'll talk a little bit more about more advanced TCP that deals with some modern on our considerations.

192
00:14:16,440 --> 00:14:26,879
But you know, in a Linux system or on a Windows systems, Mac OS systems, the basic TCP algorithm that's running is very, very similar to Reno.

193
00:14:26,879 --> 00:14:30,440
It turns out the congestion control is a really hard problem.

194
00:14:30,440 --> 00:14:34,920
And it's one of the hardest problems to build a robust network system.

195
00:14:34,920 --> 00:14:49,320
The basic approach that you see that has been adopted, and which seems very, very powerful and very robust, is this idea of added increase multiplicative decrease, that you increase a window additively, right?

196
00:14:49,320 --> 00:14:51,880
But then reduce it multiplicatively.

197
00:14:51,880 --> 00:14:57,440
So you respond very quickly when things go badly and carefully increase it.

198
00:14:57,440 --> 00:15:01,520
And the trick is that when you're doing this is how to keep the pipe falling and proof throughput.

199
00:15:01,520 --> 00:15:06,680
So there's things like fast-retransmit, don't wait for a time out just to send very, very, we send quickly.

200
00:15:06,680 --> 00:15:08,360
And also things like congestion window inflation.

201
00:15:08,360 --> 00:15:12,160
Or gosh, I don't want to waste a whole round trip time waiting for the fast-retransmit acknowledgement.

202
00:15:12,160 --> 00:15:13,400
I know stuff's leaving the network.

203
00:15:13,400 --> 00:15:15,080
I'm going to start sending out some new packets.

204
00:15:15,080 --> 00:15:17,480
I'll allow these packets have left the network.

