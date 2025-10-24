---
title: CS144 NetworkP544 2CongestionControl
---

1
00:00:00,000 --> 00:00:05,960
In the last video, I told you about different types of congestion, the different time scales

2
00:00:05,960 --> 00:00:09,519
that it can occur at, and what some of the consequences might be.

3
00:00:09,519 --> 00:00:16,240
We then looked a little bit about the characteristics of congestion control algorithms that we might

4
00:00:16,240 --> 00:00:18,039
like to try and design.

5
00:00:18,039 --> 00:00:21,879
So we said that we wanted high throughput, we wanted them to be fair amongst the flows

6
00:00:21,879 --> 00:00:26,280
competing for the bottleneck links, we wanted the control of congestion to be distributed

7
00:00:26,280 --> 00:00:28,760
so that it can scale.

8
00:00:28,760 --> 00:00:34,200
In this video, we're going to start looking at basic approaches to controlling congestion.

9
00:00:34,200 --> 00:00:38,160
We're going to consider whether the congestion control should take place in the network,

10
00:00:38,160 --> 00:00:42,679
with specific support at the routers, or whether it should be done at the end hosts.

11
00:00:42,679 --> 00:00:45,240
Then I'm going to tell you a little bit about how TCP does it.

12
00:00:45,240 --> 00:00:50,240
We're going to start with the basic mechanism called AIMD or additive increase, multiplicative

13
00:00:50,240 --> 00:00:51,240
decrease.

14
00:00:51,240 --> 00:00:55,359
We're going to study how that works over the next couple of videos, before we look in more

15
00:00:55,359 --> 00:01:00,159
detail at how TCP congestion control really works in practice.

16
00:01:00,159 --> 00:01:04,000
So I'm going to start with a consideration of where to put congestion control.

17
00:01:04,000 --> 00:01:09,439
In fact, you may have already been wondering what it is that we can't simply use fair

18
00:01:09,439 --> 00:01:10,959
queuing.

19
00:01:10,959 --> 00:01:15,120
Notice that we've already seen a way to give everyone a fair share of the outgoing link,

20
00:01:15,120 --> 00:01:22,120
by simply decomposing the output buffer into per flow cues, as I've shown here, so that

21
00:01:22,120 --> 00:01:26,800
if I've got multiple flows going through the network, then each flow would be placed

22
00:01:26,800 --> 00:01:32,920
into its own cue, and then we use a fair queuing scheduler to divide up that egress rate,

23
00:01:32,920 --> 00:01:37,160
let's say, R, amongst all of the flows that are contending for it.

24
00:01:37,160 --> 00:01:41,200
And so if they're all wanting to send that rate greater than R over 2, then they would

25
00:01:41,200 --> 00:01:45,680
each receive R over 2, because that's what a fair queuing scheduler would do.

26
00:01:45,680 --> 00:01:51,159
And in fact, this will give us, say, not only a fair behavior, it will actually give us

27
00:01:51,159 --> 00:01:54,359
the maximum in fare at every link across the flows.

28
00:01:54,359 --> 00:01:56,000
It'll give us good throughput.

29
00:01:56,000 --> 00:02:00,239
Whenever there is work to be done, it will always keep the outgoing line busy.

30
00:02:00,239 --> 00:02:05,280
We say it's work and serving, so it'll give good throughput on each of the links.

31
00:02:05,280 --> 00:02:07,959
So what's wrong with this basic mechanism?

32
00:02:07,959 --> 00:02:11,840
Well, the first thing is that it isn't responsive.

33
00:02:11,840 --> 00:02:17,319
It's simply going to divide up the links, but there's nothing here that will tell the

34
00:02:17,319 --> 00:02:21,439
sources the rate at which they should send, or give them any indication of how many packets

35
00:02:21,439 --> 00:02:22,959
they should send.

36
00:02:22,959 --> 00:02:27,479
In fact, if they do send, so if these are each trying to send at the full blast rate,

37
00:02:27,479 --> 00:02:34,359
so if there are packets coming in from all directions trying to use these links, then packets

38
00:02:34,359 --> 00:02:37,840
will simply be dropped under the floor as the buffers overflow.

39
00:02:37,840 --> 00:02:42,879
And we'll end up wasting a lot of the upstream bandwidth delivering packets over links that

40
00:02:42,879 --> 00:02:45,240
eventually get dropped down the stream.

41
00:02:45,240 --> 00:02:52,080
So we need a way of signaling back to the sources to say, give them some indication of the

42
00:02:52,080 --> 00:02:56,600
rate at which they should send, or the number of outstanding packets that they can have in

43
00:02:56,600 --> 00:02:59,560
the network.

44
00:02:59,560 --> 00:03:04,200
So in network-based congestion control, there is explicit feedback that comes from the

45
00:03:04,200 --> 00:03:07,560
routers to indicate congestion in the network.

46
00:03:07,560 --> 00:03:16,439
So for example, if I have a source, a, and a destination, b, and then some routers in between

47
00:03:16,439 --> 00:03:21,920
with some links like this, it's imagine that there are some flows in the network that are

48
00:03:21,920 --> 00:03:26,879
coming in from different directions going through this router, causing some congestion to

49
00:03:26,879 --> 00:03:30,240
take place right here.

50
00:03:30,240 --> 00:03:37,039
One thing that we can do is if there is congestion, is to try and signal back to a, some signal,

51
00:03:37,879 --> 00:03:42,199
to say there is congestion in the network, you need to reduce the number of packets that

52
00:03:42,199 --> 00:03:45,759
you have outstanding or reduce the rate at which you send them.

53
00:03:45,759 --> 00:03:52,479
And so the question is, what would we send, and how would we get it back to a, we could

54
00:03:52,479 --> 00:03:59,120
for example say, I'm dropping a packet, or it could be an indication of the occupancy of

55
00:03:59,120 --> 00:04:05,239
the buffer, or it could mark that we've just crushed some threshold, and so we're getting

56
00:04:05,239 --> 00:04:06,239
more congested.

57
00:04:06,480 --> 00:04:10,080
Any of these would be examples of congestion.

58
00:04:10,080 --> 00:04:14,960
Another one might be that the outgoing link has a certain amount of capacity left over,

59
00:04:14,960 --> 00:04:20,240
and as, as the capacity gets used up, we send a signal back to say how much of that capacity

60
00:04:20,240 --> 00:04:24,280
is available, or it could be a function of all of the signals that I've, that I've just

61
00:04:24,280 --> 00:04:25,600
mentioned.

62
00:04:25,600 --> 00:04:29,879
So the next question is, how do we get that signal back, and how many bits do we use to

63
00:04:29,879 --> 00:04:31,480
represent it?

64
00:04:31,480 --> 00:04:35,360
So if we're sending back the whole queue occupancy, we'd really like to be able to send

65
00:04:35,360 --> 00:04:39,319
a sizable integer value to indicate what the current occupancy is.

66
00:04:39,319 --> 00:04:41,520
That would take a lot of bits, and it might be complicated.

67
00:04:41,520 --> 00:04:47,759
So in practice, generally people look for schemes that use one or a couple of bits to signal

68
00:04:47,759 --> 00:04:49,439
back to the source.

69
00:04:49,439 --> 00:04:52,439
And then next question is, how do you get them back to the source?

70
00:04:52,439 --> 00:04:56,319
There's no point in creating a whole packet just to send it back to the source, if we can

71
00:04:56,319 --> 00:04:59,400
piggyback on packets that are already going by.

72
00:04:59,399 --> 00:05:05,799
So it's fairly common to use packets, for example, if there's a TCP packet that's coming

73
00:05:05,799 --> 00:05:12,239
through, or some kind of two-way communication, to piggyback onto packets going in one direction

74
00:05:12,239 --> 00:05:17,879
such that they get sent back in the acknowledgments and eventually get back to the source.

75
00:05:17,879 --> 00:05:22,639
There's one particular technique that's called ECN, or explicit congestion notification,

76
00:05:22,639 --> 00:05:28,079
in which the routers indicate whether they have some degree of congestion, for example,

77
00:05:28,079 --> 00:05:29,560
crossing a threshold.

78
00:05:29,560 --> 00:05:34,639
They then mark bits in packets going towards the destination, which then copies those bits

79
00:05:34,639 --> 00:05:38,519
back into the acknowledgments going in the other direction.

80
00:05:38,519 --> 00:05:44,000
The original scheme that was designed to work somewhat like this was called deck-bit.

81
00:05:44,000 --> 00:05:52,039
That was proposed more than 20 years ago as a single bit mechanism to signal to the source

82
00:05:52,039 --> 00:05:55,560
to slow down.

83
00:05:55,560 --> 00:05:58,920
So nice advantage of a scheme like this is it's simple to understand.

84
00:05:58,920 --> 00:06:04,000
We can see that the signal will directly control the behavior of the source.

85
00:06:04,000 --> 00:06:08,680
It should be pretty responsive to change because we can detect the onset of congestion

86
00:06:08,680 --> 00:06:12,560
in the network and be able to tell the source.

87
00:06:12,560 --> 00:06:16,240
It's distributed in the sense that the signal is coming back from all of the routers in

88
00:06:16,240 --> 00:06:21,000
the network, and it only affects the source and so the source can make up its decision,

89
00:06:21,000 --> 00:06:24,959
that make up its mind on how it will process that signal.

90
00:06:24,959 --> 00:06:29,000
And it can be made to be maximum fair, so it can be made to be fair.

91
00:06:29,000 --> 00:06:33,000
For example, measure the rate of each flow through the router and pass back the maximum

92
00:06:33,000 --> 00:06:34,759
fair allocation for each flow.

93
00:06:34,759 --> 00:06:39,319
There are other ways that are simpler, for example, using fair queuing as I described before.

94
00:06:39,319 --> 00:06:44,199
So network-based could certainly work.

95
00:06:44,199 --> 00:06:50,560
On the other hand, it's worth asking the question of whether we actually need the network

96
00:06:50,560 --> 00:06:52,439
to provide any congestion notification.

97
00:06:52,839 --> 00:06:59,040
In other words, can we support congestion control without any support from the network at all,

98
00:06:59,040 --> 00:07:03,519
merely by implementing a mechanism at the end hosts, where it's just going to simply

99
00:07:03,519 --> 00:07:06,920
observe the network behavior?

100
00:07:06,920 --> 00:07:14,560
So going to the example that I had before, if I have end hosts A and B, and then routers

101
00:07:14,560 --> 00:07:22,360
in between, if I'm able to observe behavior of the network,

102
00:07:23,160 --> 00:07:28,280
such that it's enough to be able to decide what rate I send or how many outstanding packets

103
00:07:28,280 --> 00:07:34,680
I have in the network, then perhaps we can implement a congestion control mechanism this way.

104
00:07:34,680 --> 00:07:39,600
This is nice because if it doesn't depend on the behavior of the routers, where it doesn't

105
00:07:39,600 --> 00:07:44,560
behave on them sending specific information back, we can evolve and adapt it over time

106
00:07:44,560 --> 00:07:48,240
without having to change the network in between.

107
00:07:48,240 --> 00:07:50,360
We're going to see that TCP does this.

108
00:07:50,360 --> 00:07:56,759
TCP actually does congestion control purely at the end host by observing the network behavior.

109
00:07:56,759 --> 00:08:03,439
What it's going to do is if packets are dropped along the way, it's going to observe this

110
00:08:03,439 --> 00:08:10,199
through either a timeout, or it will see a sequence of acknowledgements that are all the

111
00:08:10,199 --> 00:08:16,160
same coming back because the data was missing and so B is going to keep acknowledging an

112
00:08:16,160 --> 00:08:21,439
earlier piece of data, which we can interpret as data missing and therefore needing to

113
00:08:21,439 --> 00:08:23,040
retransmet it.

114
00:08:23,040 --> 00:08:27,880
If there's been data that's dropped, A could interpret this as congestion and then slow

115
00:08:27,880 --> 00:08:33,840
down the rate or have a fewer number of outstanding packets so that it will reduce the congestion

116
00:08:33,840 --> 00:08:37,040
in the network.

117
00:08:37,040 --> 00:08:43,639
Basically A is going to observe, it's going to a little bit like it's observing the behavior

118
00:08:43,639 --> 00:08:48,840
in the network and seeing what happens in terms of timeouts and duplicate acknowledgements

119
00:08:48,840 --> 00:08:54,639
and anything that indicates a drop, it could also see an increase in delay or variance,

120
00:08:54,639 --> 00:08:58,120
any of the things that would indicate to it that congestion is occurring so that it can

121
00:08:58,120 --> 00:09:01,480
change its behavior accordingly.

122
00:09:01,480 --> 00:09:06,960
In TCP's case, it actually has to do this because IP offers no support by default.

123
00:09:06,960 --> 00:09:10,600
IP offers no indication of congestion in the network.

124
00:09:10,600 --> 00:09:16,000
So when TCP was first conceived, it was actually by necessity that it would control congestion

125
00:09:16,000 --> 00:09:17,000
this way.

126
00:09:17,000 --> 00:09:21,040
So let me give you a quick introduction to TCP congestion control.

127
00:09:21,040 --> 00:09:26,600
TCP implements congestion control at the end host because the network provides no support.

128
00:09:26,600 --> 00:09:29,840
It reacts to events observable at the end host.

129
00:09:29,840 --> 00:09:34,240
In particular, it's going to use packet loss or if it believes that there were packets that

130
00:09:34,240 --> 00:09:36,040
were dropped.

131
00:09:36,039 --> 00:09:41,879
It's going to exploit TCP's sliding window that we use for flow control and retransmissions.

132
00:09:41,879 --> 00:09:46,559
It's going to exploit the fact that that's there and it's going to overload it with a means

133
00:09:46,559 --> 00:09:50,639
to control congestion and I'm going to be explaining that shortly.

134
00:09:50,639 --> 00:09:55,199
And the way it's going to do this is it's going to try and figure out how many packets

135
00:09:55,199 --> 00:09:59,679
it can safely have outstanding in the network at any time.

136
00:09:59,679 --> 00:10:01,480
And this is an important concept.

137
00:10:01,480 --> 00:10:02,480
Let me repeat it.

138
00:10:02,480 --> 00:10:08,240
Try and figure out how many packets it can safely have outstanding in the network at any

139
00:10:08,240 --> 00:10:09,240
time.

140
00:10:09,240 --> 00:10:14,039
Now we're familiar with this already with a sliding window used in TCP and this is just

141
00:10:14,039 --> 00:10:17,879
a reminder of how the sliding window works.

142
00:10:17,879 --> 00:10:22,600
Recall that the window is sliding over a stream of bytes.

143
00:10:22,600 --> 00:10:28,320
So this is the underlying stream of bytes that we're sending and that is increasing to

144
00:10:28,320 --> 00:10:29,320
the right.

145
00:10:29,320 --> 00:10:32,720
So byte zero was somewhere over here.

146
00:10:32,720 --> 00:10:38,640
And the window is telling us data that has been acknowledged.

147
00:10:38,640 --> 00:10:43,120
So this is earlier data which has been fully acknowledged.

148
00:10:43,120 --> 00:10:47,840
This is outstanding data that has been sent but not yet acknowledged.

149
00:10:47,840 --> 00:10:49,240
This is data that's okay to send.

150
00:10:49,240 --> 00:10:53,160
In other words, it's data that we perhaps haven't sent yet but because it's inside the

151
00:10:53,160 --> 00:10:56,280
window we're allowed to send it if we want.

152
00:10:56,279 --> 00:10:59,879
And then there is data that is not okay to send yet because it's ahead of the window.

153
00:10:59,879 --> 00:11:04,480
The window hasn't slid over the top of this yet because we're still waiting for outstanding

154
00:11:04,480 --> 00:11:07,279
acknowledgments over here.

155
00:11:07,279 --> 00:11:13,839
Okay, so the sliding window tells us not only which bytes can be outstanding but also how

156
00:11:13,839 --> 00:11:16,279
many bytes that's the window size.

157
00:11:16,279 --> 00:11:21,679
And you will recall that the receiver is going to send back information about what's called

158
00:11:21,759 --> 00:11:26,639
the receive window to tell us how many bytes we can have outstanding such that we don't

159
00:11:26,639 --> 00:11:28,639
overrun the receiver.

160
00:11:28,639 --> 00:11:32,159
And we're going to see in a minute that we're going to reuse that mechanism in a different

161
00:11:32,159 --> 00:11:35,359
way at the sender.

162
00:11:35,359 --> 00:11:40,759
But just to give a rough idea of what's going on with the TCP sliding window, here is a

163
00:11:40,759 --> 00:11:45,679
view on a timeline of what's taking place when packets are sent and are received and

164
00:11:45,679 --> 00:11:49,359
it's going to give us a feeling for how this is going to work.

165
00:11:49,360 --> 00:11:55,279
So A is allowed to send up to a Windows worth of data and have it outstanding before it

166
00:11:55,279 --> 00:11:57,279
receives any acknowledgments.

167
00:11:57,279 --> 00:12:01,440
So here is that window of data.

168
00:12:01,440 --> 00:12:07,440
And when those packets are sent, of course each one of them is going to lead to an acknowledgement.

169
00:12:07,440 --> 00:12:12,320
So sometime later we are going to get the acknowledgments and then we're going to send the next

170
00:12:12,320 --> 00:12:14,440
Windows worth of data.

171
00:12:14,440 --> 00:12:20,800
So if the round trip time is much bigger than the window size, in other words the time is

172
00:12:20,800 --> 00:12:24,360
much bigger than the amount of data that it takes to fill that pipe, then there will be

173
00:12:24,360 --> 00:12:30,080
this big delay in between and TCP will basically move forward by sending a window in a burst,

174
00:12:30,080 --> 00:12:34,600
pausing and waiting for acknowledgments, sending a window in a burst, having a pause,

175
00:12:34,600 --> 00:12:36,280
and then just repeating like that.

176
00:12:36,280 --> 00:12:39,000
So that's in this particular case.

177
00:12:39,000 --> 00:12:45,080
So let's consider a different case and that is when the round trip time equals the window

178
00:12:45,080 --> 00:12:46,080
size.

179
00:12:46,080 --> 00:12:49,399
In other words the window is exactly able to fill up the pipe.

180
00:12:49,399 --> 00:12:53,399
The number of outstanding packets that were allowed to have in the network precisely fills

181
00:12:53,399 --> 00:12:54,879
the pipe.

182
00:12:54,879 --> 00:13:00,000
In this particular case the first acknowledgment will come back just after the last packet

183
00:13:00,000 --> 00:13:04,080
has been sent and so we're able to send in a continuous stream.

184
00:13:04,080 --> 00:13:08,840
And so there are no pauses, therefore we're using the network more fully than in this case

185
00:13:08,920 --> 00:13:11,920
when we've got this idle time.

186
00:13:11,920 --> 00:13:16,280
So this gives us a hint as to our ability to keep the network full.

187
00:13:16,280 --> 00:13:21,000
Some people would interpret this as a rate because it's the window size divided by the

188
00:13:21,000 --> 00:13:22,000
round trip time.

189
00:13:22,000 --> 00:13:25,320
And we're going to consider that a little bit later.

190
00:13:25,320 --> 00:13:29,639
So that's the basic idea of how this is going to work.

191
00:13:29,639 --> 00:13:35,440
More specifically with TCP congestion control, TCP is going to vary the number of outstanding

192
00:13:35,440 --> 00:13:39,400
packets in the network by varying the window size.

193
00:13:39,400 --> 00:13:44,520
And it's going to set the window size instead of just being the advertised window, which

194
00:13:44,520 --> 00:13:50,160
is what it used before, which came from the receiver to stop overwhelming the receiver.

195
00:13:50,160 --> 00:13:54,400
It's also going to take into consideration something called the congestion window.

196
00:13:54,400 --> 00:13:57,440
This is something which is calculated at the source.

197
00:13:57,440 --> 00:14:01,280
So the advertised window comes from the receiver and at the source or the transmitter it's

198
00:14:01,279 --> 00:14:06,759
going to calculate the congestion window that's often abbreviated to C-wind, CWND stands

199
00:14:06,759 --> 00:14:09,360
for congestion window.

200
00:14:09,360 --> 00:14:11,439
And then it will take whichever is the smaller value.

201
00:14:11,439 --> 00:14:15,120
In other words, if the network is congested, then it's going to use C-wind.

202
00:14:15,120 --> 00:14:20,159
And if the network is not congested, then it will be dominated by the received window,

203
00:14:20,159 --> 00:14:22,639
the one advertised by the receiver.

204
00:14:22,639 --> 00:14:26,519
So the next question to ask is, OK, how do we decide the value for C-wind?

205
00:14:26,519 --> 00:14:31,960
How are we going to use C-wind in order to change the window size to control congestion in

206
00:14:31,960 --> 00:14:33,639
the network?

207
00:14:33,639 --> 00:14:37,600
And the scheme that we're going to use is called AIMD.

208
00:14:37,600 --> 00:14:43,799
And this is a sort of a classic technique in networking that's used for controlling congestion

209
00:14:43,799 --> 00:14:46,360
in a TCP network.

210
00:14:46,360 --> 00:14:50,439
Or it could be used in any network that uses sliding windows.

211
00:14:50,439 --> 00:14:55,879
AIMD stands for additive increase and multiplicative decrease.

212
00:14:55,879 --> 00:14:57,960
Let's start with the additive increase.

213
00:14:57,960 --> 00:15:04,200
The way that the window size is going to evolve is as follows, or rather C-wind.

214
00:15:04,200 --> 00:15:09,439
If every time a packet is received correctly by the sender, it's going to increase the

215
00:15:09,439 --> 00:15:14,799
window size, in fact, C-wind by 1 over W.

216
00:15:14,799 --> 00:15:19,759
What this means is that every time a complete window's worth of data has been accepted,

217
00:15:19,759 --> 00:15:24,960
has been correctly received and acknowledged, then the sender is going to increase its

218
00:15:24,960 --> 00:15:26,280
window size by 1.

219
00:15:26,280 --> 00:15:31,759
It'll increase it by 1 over W for every packet, because there are W packets, then by the

220
00:15:31,759 --> 00:15:34,960
end of the window, it will have increased it by 1.

221
00:15:34,960 --> 00:15:36,360
So this is the additive increase.

222
00:15:36,360 --> 00:15:39,720
It's going to slowly increase when things are going well.

223
00:15:39,720 --> 00:15:43,879
If things are going badly and packets are dropped, then it's going to use this as a signal

224
00:15:43,879 --> 00:15:47,040
of congestion.

225
00:15:47,040 --> 00:15:51,720
And if that happens, it's going to reduce the C-wind by a factor of 2.

226
00:15:51,720 --> 00:15:55,360
It's going to halve it.

227
00:15:55,360 --> 00:16:01,279
What this will look like is if we draw the window as a function of time, so this will be

228
00:16:01,279 --> 00:16:09,240
the C-wind as a function of time, it's going to start by increasing every time we have a

229
00:16:09,240 --> 00:16:10,440
success.

230
00:16:10,440 --> 00:16:15,360
And then when we have a drop, so here is the drop taking place here, it's going to drop

231
00:16:15,360 --> 00:16:19,560
down to half of its value.

232
00:16:19,559 --> 00:16:27,159
So if this is the peak value, then this value down here would be W peak over 2.

233
00:16:27,159 --> 00:16:32,079
And then it's going to start increasing again and increasing until it has another drop.

234
00:16:32,079 --> 00:16:34,079
And then it's going to increase again and increase again.

235
00:16:34,079 --> 00:16:37,759
And it could go up to a higher value, because now the network may be allowed more outstanding

236
00:16:37,759 --> 00:16:41,559
packets, come down to a different value, and then go up and then there might be another

237
00:16:41,559 --> 00:16:42,559
drop.

238
00:16:42,559 --> 00:16:46,719
So it doesn't always going to go in this nice neat symmetrical sawtooth.

239
00:16:46,719 --> 00:16:48,639
This is where the drops are taking place.

240
00:16:48,639 --> 00:16:50,519
And it's halving at each case.

241
00:16:50,519 --> 00:16:54,480
So here is the additive increase, here is the multiplicative decrease.

242
00:16:54,480 --> 00:16:57,600
The additive increase, the multiplicative decrease.

243
00:16:57,600 --> 00:17:04,440
This is often referred to as the TCP sawtooth or the AIMD sawtooth, just because of its shape.

244
00:17:04,440 --> 00:17:08,359
If we zoom in, let's take a closer look at what's going on at each step.

245
00:17:08,359 --> 00:17:10,720
So let's take a closer look at what's going on here.

246
00:17:10,720 --> 00:17:16,359
This is actually proceeding by going in steps.

247
00:17:16,359 --> 00:17:21,799
Where it's going in steps such that every packet time, it's going to increase by 1 over

248
00:17:21,799 --> 00:17:22,799
W.

249
00:17:22,799 --> 00:17:29,279
And I'm going to simplify that by saying every RTT, this horizontal dimension is time, it's

250
00:17:29,279 --> 00:17:31,079
going to increase by 1.

251
00:17:31,079 --> 00:17:33,319
The window size is going to increase by 1.

252
00:17:33,319 --> 00:17:38,399
Because every time we've acknowledged a complete packet, Windows worth of data, it's going

253
00:17:38,399 --> 00:17:40,599
to increase the window size by 1.

254
00:17:40,599 --> 00:17:46,000
So it's going to go forward in these steps of RTT along the horizontal part of the stair,

255
00:17:46,000 --> 00:17:50,319
and then it's going to go up by 1 and then RTT and so on.

256
00:17:50,319 --> 00:17:54,920
So this leads to what's often called the AIMD sawtooth or the TCP sawtooth that can

257
00:17:54,920 --> 00:17:55,920
look like this.

258
00:17:55,920 --> 00:17:57,920
This is an evolution of C-wind.

259
00:17:57,920 --> 00:18:02,759
Remember, that's the congestion window as a function of time.

260
00:18:02,759 --> 00:18:06,559
So here was the additive increase, we had a drop, we dropped down to half the value, we

261
00:18:06,559 --> 00:18:10,480
had an additive increase, we dropped down because of a drop that took place, packet drop

262
00:18:10,480 --> 00:18:12,160
that took place here.

263
00:18:12,160 --> 00:18:13,880
Then we go up again through the additive increase.

264
00:18:13,880 --> 00:18:17,520
And you can see here that the available window size, in other words, the amount of data

265
00:18:17,520 --> 00:18:22,080
that the source can have outstanding in the network, is varying, presumably because the

266
00:18:22,080 --> 00:18:23,720
network conditions are changing.

267
00:18:23,720 --> 00:18:27,520
There are other flows in the network, or maybe even the capacity of the links is changing,

268
00:18:27,520 --> 00:18:30,400
maybe their wireless links, for example.

269
00:18:30,400 --> 00:18:34,360
So in summary, we have choice when we're implementing a congestion control algorithm.

270
00:18:34,360 --> 00:18:38,760
We can implement it in the network, or we can implement it at the end host.

271
00:18:38,759 --> 00:18:44,079
TCP controls congestion from the end host because IP offers it no support by default, so it

272
00:18:44,079 --> 00:18:48,799
gives it no signals or indication of congestion other than dropping packets.

273
00:18:48,799 --> 00:18:54,559
So it merely reacts to events that are observable at the end host, in particular packet loss.

274
00:18:54,559 --> 00:19:00,680
It exploits TCP's sliding window, and it's that's used for flow control, and it's going

275
00:19:00,680 --> 00:19:06,400
to overload that sliding window by changing the window size to try and control congestion.

276
00:19:06,400 --> 00:19:10,000
It tries to figure out how many packets it can safely have outstanding in the network at

277
00:19:10,000 --> 00:19:14,759
a time, and it's going to vary that window size according to the additive increase,

278
00:19:14,759 --> 00:19:16,480
multiplicative decrease algorithm.

279
00:19:16,480 --> 00:19:20,000
And we're going to be studying that more in the next two videos.

