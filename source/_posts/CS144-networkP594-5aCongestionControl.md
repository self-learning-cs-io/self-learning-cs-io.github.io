---
title: CS144 NetworkP594 5aCongestionControl
---

1
00:00:00,000 --> 00:00:04,639
So in this video, I talk about congestion control, particularly the basic motivation for

2
00:00:04,639 --> 00:00:08,880
congestion control and transport protocols in particles in general, and then walk through the

3
00:00:08,880 --> 00:00:14,880
first example of a protocol that really identified and tackled this problem with TCP,

4
00:00:14,880 --> 00:00:19,839
particularly version of TCP called TCP Tahoe. And I'll talk about the first mechanism

5
00:00:19,839 --> 00:00:23,280
that TCP Tahoe uses to try and deal with congestion, something called slow start.

6
00:00:24,080 --> 00:00:32,160
So the basic motivation for congestion control is that flow control tells an endpoint, say,

7
00:00:32,799 --> 00:00:37,520
it's going to tell Boston's going to tell San Francisco the amount of data they can accept.

8
00:00:37,520 --> 00:00:43,760
And so flow control specifies the limitations of the endpoint.

9
00:00:45,520 --> 00:00:51,280
However, it can very well be that this node in Boston is able to receive data much, much faster

10
00:00:51,280 --> 00:00:57,840
than the network can support it. So for example, while this node in Boston might have a buffer that

11
00:00:57,840 --> 00:01:08,560
allows it to receive 100 packets per RTT, per RTT, it could be that some bottleneck link on the

12
00:01:08,560 --> 00:01:13,760
path from San Francisco to Boston can really only support about five packets per RTT.

13
00:01:14,719 --> 00:01:18,719
And so the idea is that if San Francisco communicates with Boston, this node in San Francisco

14
00:01:18,719 --> 00:01:23,439
communicates with the node in Boston at a rate which flow control would allow, then it's going to

15
00:01:23,439 --> 00:01:27,359
send packets much faster than it can support. Most of these packets are going to be dropped and it's

16
00:01:27,359 --> 00:01:32,159
going to spend a lot of its time doing retransmission sooner to cover from these heavy errors. You don't

17
00:01:32,159 --> 00:01:37,599
want to saturate the network because everything will work less efficiently than if most packets arrive.

18
00:01:37,599 --> 00:01:40,879
You'll require less control overhead. The rule would generally work better.

19
00:01:43,359 --> 00:01:47,840
And so the basic idea of congestion control is that endpoints should control their data rate

20
00:01:47,840 --> 00:01:52,560
so that they do not overload the network. This would generally increase the performance of the network.

21
00:01:55,439 --> 00:01:59,760
So if we just take a step back in terms of congestion control, what really led to it as this very

22
00:01:59,760 --> 00:02:05,439
important area of study and engineering in the internet, it all comes from TCP. So basically

23
00:02:05,439 --> 00:02:10,000
history of TCP in 1974, established the through a handshake, you know, SIN, SIN, AC, AC,

24
00:02:10,879 --> 00:02:16,400
in 1978, TCP and IP were split, were split. It used to be that the internet, just at that point,

25
00:02:16,400 --> 00:02:20,080
the ARPNet just supported TCP, but they realized, oh, we need to split them because we need stuff

26
00:02:20,080 --> 00:02:26,480
like UDP. Then January 1, 1983, that was, you know, the switch day when suddenly the entire ARPNet

27
00:02:26,480 --> 00:02:33,520
switched over to TCP IP, IPv4. Three years after that, the internet began to suffer congestion

28
00:02:33,520 --> 00:02:40,159
collapse, where links were saturated. They were sending, you know, operating at line speed, yet no

29
00:02:40,240 --> 00:02:46,400
worse useful work was being done. Instead, all the packets being transmitted were unnecessary

30
00:02:46,400 --> 00:02:52,159
retransmissions or acknowledgments. So you're seeing full utilization of links,

31
00:02:52,159 --> 00:02:55,919
while simultaneously no application level throughput.

32
00:02:57,359 --> 00:03:02,560
So then van Jacobson in the seminal paper, fixed TCP, figured out what was going on,

33
00:03:03,680 --> 00:03:08,879
and he published the seminal TCP paper, which described TCP Tahoe. So these names Tahoe and Reno,

34
00:03:10,159 --> 00:03:18,319
come from the versions of hardware for Berkeley Unix that these TCP implementations occurred on.

35
00:03:19,120 --> 00:03:23,759
And so you read about Tahoe, Reno and the Nathlete started getting names like New Reno, Vegas,

36
00:03:23,759 --> 00:03:31,039
Daytona, just to follow that theme. But Tahoe and Reno were denoted by versions of Berkeley Unix,

37
00:03:31,039 --> 00:03:36,000
that were distributed in the hardware they were for. So then about a couple of years after this

38
00:03:36,000 --> 00:03:40,560
for TCP Tahoe, a fast recovery and fast recovery transmit something that's in a future TCP

39
00:03:40,560 --> 00:03:46,080
version, I'll talk about later, video TCP Reno, which are common today, but the time there are new ideas

40
00:03:46,080 --> 00:03:52,080
were added. And so if you look, basically all TCP implementations today have the mechanisms that

41
00:03:52,080 --> 00:03:56,879
are in TCP Tahoe and TCP Reno. And so we're going to go through them in this series of videos.

42
00:03:57,199 --> 00:04:08,639
So there are basically three questions that a transport protocol needs to answer if it's going to provide

43
00:04:08,639 --> 00:04:14,719
reliable transport. The first is when should it send new data? That is when should it send data,

44
00:04:14,719 --> 00:04:20,159
which it has never put on in our before? Second is when should it send a retransmission? When should

45
00:04:20,159 --> 00:04:25,519
it try to retransmit data it has sent before? And finally, when should it send acknowledgments for

46
00:04:25,599 --> 00:04:29,519
data that it successfully received? These are these basic things of stew. When is it going to generate

47
00:04:29,519 --> 00:04:34,479
packets? Whether they're data packets, retransmissions of data packets, or acknowledgment packets?

48
00:04:36,240 --> 00:04:41,199
Now of course, often we talk about data acknowledgment packets as being independent, but in TCP they're not.

49
00:04:41,199 --> 00:04:45,839
The acknowledgments are simply a field in the header, and you can of course pick you back data

50
00:04:45,839 --> 00:04:49,039
and acknowledge them. But often we just talk about data acknowledgments separately,

51
00:04:49,039 --> 00:04:52,719
just pretending that the flow is unidirectional, though often it might not be, it might be

52
00:04:52,720 --> 00:04:58,000
bidirectional. The point being that it can be that you have no data this time, but you do need to send

53
00:04:58,000 --> 00:05:05,760
an acknowledgment. So what did TCP look like before TCP Tahoe? So essentially what happens is

54
00:05:05,760 --> 00:05:10,160
you set up a connection through a handshake, and at endpoint now has the flow control window size,

55
00:05:10,160 --> 00:05:19,360
to be noted by the window field of a TCP header. And so what, pre- Tahoe, what TCP would do is this

56
00:05:19,439 --> 00:05:22,639
seems like a simple thing. It would just send the full window of packets. So if the window set up

57
00:05:22,639 --> 00:05:29,120
ha, I'm 30 kilobytes, it would send 30 kilobytes worth of packets. So this is obeying the flow control.

58
00:05:30,080 --> 00:05:36,800
It would then start a retransmit timer for each packet, and then if it didn't receive an acknowledgment

59
00:05:36,800 --> 00:05:41,040
for that packet by the time the retransmit timer fired, it would then retransmit that packet.

60
00:05:42,480 --> 00:05:48,080
And so the basic problem this encounters, what happens if the flow control window is much larger

61
00:05:48,159 --> 00:05:52,639
than with the network and support? It might be that your endpoint has space for 30 kilobytes,

62
00:05:52,639 --> 00:05:57,279
but the link has already saturated. You can't suddenly just dump another 30 kilobytes on it.

63
00:05:57,279 --> 00:06:03,039
I mean, these numbers might seem small now, but back then these were, you had relatively slow

64
00:06:03,039 --> 00:06:06,079
links in comparison to today's speed. So think of this more of your windows suddenly

65
00:06:06,079 --> 00:06:11,120
were advertised to 30 megabytes. You don't understand when I dump 30 megabytes onto your DSL or your

66
00:06:11,120 --> 00:06:18,000
cable modem link immediately. So if you implement that algorithm, you just send the window of packets

67
00:06:18,000 --> 00:06:23,120
what happens? Well, so here's a picture. So here it's showing on the x-axis this time in seconds,

68
00:06:23,120 --> 00:06:28,560
and the y-axis is the packet sequence number in terms of kilobytes. So the sequence number of the

69
00:06:28,560 --> 00:06:34,399
byte that TCP has sent. And so what you see is on connection establishment, it immediately sends a

70
00:06:34,399 --> 00:06:40,879
full buffer of packets about 20 kilobytes worth. And then it's getting some acknowledgments

71
00:06:40,879 --> 00:06:47,040
so it's sending some more data, but then suddenly its window is a certain size, the flow control window,

72
00:06:47,760 --> 00:06:59,040
and it hasn't received an acknowledgment for this segment here. And so at this point, TCP is blocked,

73
00:06:59,040 --> 00:07:03,759
right? The dots are showing the packet that are transmitted, so at this point it's blocked in that

74
00:07:03,759 --> 00:07:08,160
it is sent up to the last acknowledged byte plus the window size, and it can't send anymore.

75
00:07:08,160 --> 00:07:14,000
And the reason is that this packet probably was lost. So then here's the time out.

76
00:07:14,720 --> 00:07:24,160
And it retransments that packet. Then as you can see, it's able to send a whole bunch more packets,

77
00:07:24,160 --> 00:07:28,240
it gets a whole bunch of acknowledgments, or it gets a cumulative acknowledgment lying in the

78
00:07:28,240 --> 00:07:34,959
window to move forward, etc, etc. But the basic point to see here is that there are these huge sawtooth

79
00:07:35,680 --> 00:07:42,639
that you see big bursts of packets followed by idle timeouts. Big bursts of packets followed by

80
00:07:42,639 --> 00:07:48,800
idle timeouts. And that many of these packets are redundant. Like this particular packet here is sent

81
00:07:48,800 --> 00:07:55,439
three times. Now this one is also sent three times. So you're seeing lots of additional

82
00:07:55,439 --> 00:08:01,759
retransmissions. And overall, the protocol is not performing very well. It's sending all these

83
00:08:01,759 --> 00:08:05,839
packets, but if you look at the actual slope of this line, the sense of the data out sending,

84
00:08:05,839 --> 00:08:13,119
the slope isn't very high. If TCP were operating at line speed, operating at the correct speed,

85
00:08:13,679 --> 00:08:17,759
it should be following this line here. But instead, it's following the line with the much slower slope.

86
00:08:17,759 --> 00:08:23,439
It's actually sending data much slower than it should be able to. This is what was observed that

87
00:08:23,439 --> 00:08:30,159
TCP is very slow because it's sending lots of retransmissions unnecessarily, and there are lots of timeouts.

88
00:08:30,240 --> 00:08:40,320
So based on this, then Jacobson proposed three improvements. The first is the idea of a congestion

89
00:08:40,320 --> 00:08:46,240
window. The second is better timeout estimation and the last is self-clocking. I'm going to walk

90
00:08:46,240 --> 00:08:50,879
through each of those. The congestion window, and talk about in this video and future videos,

91
00:08:50,879 --> 00:08:58,879
I'll talk about timeout estimation and self-clocking. So the congestion window.

92
00:09:00,959 --> 00:09:04,879
So the basic insight is that the flow control window is only about the endpoint.

93
00:09:05,600 --> 00:09:12,159
And so what you want to do is have TCP estimate a congestion window that is how much can the network

94
00:09:12,159 --> 00:09:16,639
support when I, in the sense of how quickly can I send data and have the network deliver it reliably.

95
00:09:17,519 --> 00:09:20,959
And then the sender window is going to be the minimum of these two. In the sense of there's no point

96
00:09:20,959 --> 00:09:24,559
sending data faster than the network can support, and nor is there any point sending data faster than

97
00:09:24,639 --> 00:09:30,959
the end-host can support. And then what you do is based on this idea of a congestion window,

98
00:09:30,959 --> 00:09:36,159
you separate how you behave in terms of sending packets in the size of this congestion window into

99
00:09:36,159 --> 00:09:42,719
two states. The first is something called slow start. The second is congestion of winds.

100
00:09:44,000 --> 00:09:48,559
You slow start when you're doing connection startup or when there's a packet timeout. When something

101
00:09:48,559 --> 00:09:54,399
is gone very wrong and you want to just back off completely and then figure out what it is the

102
00:09:54,399 --> 00:10:00,000
network can support. Conjection of winds in contrast is when the network, when you're behaving pretty

103
00:10:00,000 --> 00:10:05,199
well, that is you're operating close to the network capacity. And so you don't want to start sending

104
00:10:05,199 --> 00:10:11,279
things much faster or much slower. You're operating close to what you think the congestion window of the

105
00:10:11,279 --> 00:10:22,000
network is. So the idea of slow start is that what the node does is rather than start its window at the

106
00:10:22,000 --> 00:10:29,519
flow control window size, it starts its window at a size of a minimum maximum segment size. So basically

107
00:10:29,519 --> 00:10:36,639
one on packets worth of data today, nodes might start with two or four. There's some rules about that

108
00:10:37,039 --> 00:10:45,199
two through two through four, but the original version started at one. And then every time a packet

109
00:10:45,199 --> 00:10:50,639
acknowledge, every time you receive a new acknowledgement, you increase this window by the maximum

110
00:10:50,639 --> 00:10:55,360
segment size. And what this means in terms of practice is that in the first round trip time, you're

111
00:10:55,360 --> 00:10:59,199
going to send a single packet, they'll be acknowledged. Now your segment size, now your window size is

112
00:10:59,199 --> 00:11:03,279
two. So you'll send two packets. They'll both be acknowledged. You increase by two, now they'll send

113
00:11:03,279 --> 00:11:07,279
four packets. They'll be acknowledged. You'll then send eight packets. There's this exponential growth.

114
00:11:08,159 --> 00:11:14,159
And so that's what you're seeing here. See here's one packet, two packets, or there's one, two, four,

115
00:11:14,159 --> 00:11:20,639
you know, eight, etc. This exponential growth scaling up. So in a logarithmic number of steps,

116
00:11:20,639 --> 00:11:26,240
you can hopefully discover what is the congestion window size of the network. So this might seem,

117
00:11:26,240 --> 00:11:30,319
I mean, exponential growth is not slow. And so the name is, it can be a little confusing.

118
00:11:30,320 --> 00:11:34,080
The reason it's called slow is that it's slow compared to the prior, which is actually the

119
00:11:34,080 --> 00:11:39,680
most faster mode of TCP today. But compared to sending an entire flow control window of packets,

120
00:11:39,680 --> 00:11:45,440
doing this exponential scale up through a logarithmic number of steps was comparatively so. So

121
00:11:45,440 --> 00:11:50,000
it's interesting sort of historic compared to modern, modern idea.

122
00:11:53,840 --> 00:11:58,240
And so we can see in this figure, this is also from Van Jacobson's paper that

123
00:12:00,480 --> 00:12:04,800
the packet sequence number, you know, is increasing this way and you see this exponential growth.

124
00:12:04,800 --> 00:12:09,840
And then using slow start, you end up plus than the congestion avoidance state that I'll talk about

125
00:12:09,840 --> 00:12:14,400
in a moment. You end up hitting this nice steady state. And while it takes you a little bit of time

126
00:12:14,400 --> 00:12:19,760
to discover what the line speed is, eventually the behavior of the protocol is very close to this

127
00:12:19,760 --> 00:12:24,560
line speed. And it's operating close to capacity. It's not overwhelming it. And you're not seeing

128
00:12:24,639 --> 00:12:33,439
these sawtooths of terrible performance. So that's the slow start state. So in the slow start state,

129
00:12:33,439 --> 00:12:37,039
you are increasing the congestion window by a maximum segment size for each acknowledgment.

130
00:12:37,039 --> 00:12:41,759
This leads to an exponential increase in the window size. The second state that you can be in

131
00:12:41,759 --> 00:12:47,199
is called congestion avoidance. And in this model, when you're in the congestion avoidance state,

132
00:12:47,280 --> 00:12:55,759
you increase the congestion window by, and the maximum segment size squared divided by the

133
00:12:55,759 --> 00:13:00,480
congestion window for each acknowledgment. The behavior results is rather than increase by

134
00:13:01,200 --> 00:13:04,720
the window by a maximum segment size for each acknowledgment, you end up increasing the maximum

135
00:13:04,720 --> 00:13:09,200
segment size for each round trip time. So it's an additive increase. So rest this is growing the

136
00:13:09,200 --> 00:13:14,240
window size exponentially. This is growing the window size linearly.

137
00:13:21,200 --> 00:13:25,600
So we have these two states slow start congestion avoidance. How do we transition between them?

138
00:13:25,600 --> 00:13:29,520
Well, really, there are these two goals. When you slow start to quickly find what the network

139
00:13:29,520 --> 00:13:34,720
congestion capacity is that is how fast can we send things before the network enters congestion and

140
00:13:34,720 --> 00:13:40,240
starts buffering packets and dropping packets. And so then once we are close to that capacity,

141
00:13:40,240 --> 00:13:45,040
one is congestion avoidance to very carefully probe. So we're below the congestion points,

142
00:13:45,040 --> 00:13:49,600
let's just start slowly increasing until we reach it, then maybe drop down a little bit and start

143
00:13:49,600 --> 00:13:54,800
slowly increasing until we reach it. We basically can use that to stay close to that value and be close

144
00:13:54,800 --> 00:13:59,759
to the network capacity. And we have three signals to accomplish this. The first is if we're seeing

145
00:13:59,759 --> 00:14:03,200
increasing acknowledgments, that means the data transfer is going well, maybe we can speed things

146
00:14:03,200 --> 00:14:08,400
up a bit. The second is if we have duplicate acknowledgments, remember TSP using cumulative

147
00:14:08,400 --> 00:14:11,920
acknowledgments. So if we're seeing many acknowledgments for the same piece of data, that means TCP

148
00:14:11,920 --> 00:14:16,640
is receiving segments, but one of them is missing. So this means something was lost or delayed.

149
00:14:17,440 --> 00:14:21,360
The final signal is if there's a timeout. If we set a whole bunch of packets or a window of packets

150
00:14:21,360 --> 00:14:25,600
and we've heard nothing and there's a timeout, that means something very wrong has happened. Or maybe

151
00:14:25,600 --> 00:14:29,920
way off of what the congestion is moving the network has suddenly become congested because it itself

152
00:14:29,919 --> 00:14:39,279
can have dynamic traffic. So this is the TCP Tahoe Finance Day machine. I'm going to walk through a

153
00:14:39,279 --> 00:14:47,120
bit by bit. So when you open a TCP Tahoe connection, you start in the slow start state with a maximum

154
00:14:47,120 --> 00:14:53,039
with a window of a maximum segment size and recall that your actual window will never grow larger

155
00:14:53,039 --> 00:14:56,639
than your flow control window. The minimum of the flow control window and congestion control windows.

156
00:14:56,639 --> 00:15:02,319
So this is controlling the congestion control window size. Then every time we're in the slow start

157
00:15:02,319 --> 00:15:09,600
state and we receive an acknowledgment, we increase the congestion window. This is C-wind

158
00:15:10,799 --> 00:15:13,360
by the maximum segment size. So this is the exponential increase here.

159
00:15:13,680 --> 00:15:29,919
Then we have a parameter SS threshold, which is this stands for slow start threshold. If the

160
00:15:29,919 --> 00:15:35,039
congestion window grows larger than the slow start threshold, then we transition to the congestion

161
00:15:35,039 --> 00:15:38,480
avoidance state. This means that hey, we suddenly have a big enough congestion window,

162
00:15:39,360 --> 00:15:43,279
then we should slow down our growth. It's a transition to congestion avoidance.

163
00:15:45,039 --> 00:15:49,200
Now in the congestion avoidance state, if we receive an acknowledgment, we increase the congestion

164
00:15:49,200 --> 00:15:54,480
window by a maximum segment size squared divided by the congestion window. This is the linear increase.

165
00:15:58,639 --> 00:16:04,560
And so we see that the window size will look like this over time effectively. We're here is when we

166
00:16:04,559 --> 00:16:12,959
hit SS threshold. This part corresponds to this state. This part corresponds to this state.

167
00:16:17,279 --> 00:16:22,559
But now what happens if we're in the congestion avoidance state and this linear increase

168
00:16:23,679 --> 00:16:28,000
goes beyond the congestion capacity of the network? Well, what's going to happen is we're going to

169
00:16:28,000 --> 00:16:33,119
see a timeout or a triple duplicate act. A triple duplicate act, this implies a packet was lost.

170
00:16:34,080 --> 00:16:41,919
We're seeing these many acknowledgments. And so what T.C.B. Tahoe does on seeing either a timeout

171
00:16:41,919 --> 00:16:49,919
or triple duplicate act is it resets the congestion window to be one and it sets the SS threshold

172
00:16:49,919 --> 00:16:57,440
to be the old congestion window divided by two. And so what this is going to do is after we see

173
00:16:58,400 --> 00:17:03,840
this linear growth and then at this point say we say a triple duplicate act. What will happen is

174
00:17:03,840 --> 00:17:13,120
that T.C.B. Tahoe is going to set, these blue, is going to set SS threshold to be half of what the

175
00:17:13,120 --> 00:17:24,320
congestion window is at that time. It's then going to reenter a slow start, do an exponential increase

176
00:17:24,319 --> 00:17:29,919
until it reaches this SS threshold, which point then SS threshold will then enter congestion

177
00:17:29,919 --> 00:17:36,639
avoidance and do a linear increase. And so the way to think of this is that upon this triple duplicate

178
00:17:36,639 --> 00:17:44,159
act or this timeout, the T.C.B. Tahoe is discovered what it thinks is too much, too fast of transmission

179
00:17:44,159 --> 00:17:49,519
rates. Window is too big. So then what it does is it says, okay, I'm going to exponentially grow my

180
00:17:49,519 --> 00:17:54,559
window until I reach half of that point and then I'll start linearly increasing it. Is that way

181
00:17:54,559 --> 00:17:59,440
you can hopefully quickly get back to close to capacity and a logarithmic number of steps,

182
00:17:59,440 --> 00:18:03,839
but then you don't want to get too close and so you start at half of what that old value was and

183
00:18:03,839 --> 00:18:08,559
then start linearly increasing again. So this is the basic finance data machine for T.C.B. Tahoe.

184
00:18:09,200 --> 00:18:15,200
So here I will walk through a simple example. So you start with a sender and let's just say SS threshold

185
00:18:15,200 --> 00:18:25,759
is equal to four when it starts up. So it's first it's going to send a single T.C.B. segment, single maximum

186
00:18:25,759 --> 00:18:31,360
segment size segment. The receiver, let's just call this one. I'll number them as packets for simplicity.

187
00:18:31,360 --> 00:18:40,080
The receiver sends an acknowledgement. So at this point here our congestion window is equal to one.

188
00:18:40,559 --> 00:18:48,399
Now since when the slow start state it'll become two. It becomes two. And so the sender can send two

189
00:18:48,400 --> 00:18:56,960
packets. Three and four. The receiver receives them. I'm sorry. Two and three.

190
00:19:09,200 --> 00:19:13,440
The receiver receives them sends acknowledgements. Now our congestion window is four.

191
00:19:13,680 --> 00:19:23,680
Which means that we will send four packets.

192
00:19:27,519 --> 00:19:32,960
Which will be four, five, six, seven. Now at this point congestion window has reached the slow start

193
00:19:32,960 --> 00:19:40,000
threshold. Which means that T.C.B. Tahoe is going to exit this the slow start state and enter the

194
00:19:40,000 --> 00:19:46,880
congestion of wooden state. And so when these acknowledgements come back it's going to increase the

195
00:19:46,880 --> 00:19:55,359
window by one. And so rather than send eight packets congestion window will be five. And it will send

196
00:19:55,359 --> 00:20:02,880
five packets. So let's just say I'll just draw one arrow here of packets eight nine ten eleven twelve.

197
00:20:04,240 --> 00:20:08,079
Now let's say that packet eight is lost. It's dropped in the network. We've actually reached

198
00:20:08,079 --> 00:20:13,759
our congestion point. Well what will happen? Well the receiver is going to acknowledge eight.

199
00:20:14,240 --> 00:20:17,679
It's going to acknowledge that eight was received. Remember this T.C.B. is the aqueduct. Just say

200
00:20:17,679 --> 00:20:21,759
nine but I'll just write eight for simplicity sake. It's going to say a high I've received eight.

201
00:20:22,879 --> 00:20:31,759
Then ten eleven and twelve arrive. Now T.C.P. is going to then send acknowledgement eight eight

202
00:20:33,679 --> 00:20:37,439
eight. Because it's cumulative acknowledgements that hasn't received nine can only say I've received

203
00:20:37,440 --> 00:20:41,120
eight. I've received eight received eight. This is a triple duplicate acknowledgement. We have three

204
00:20:41,120 --> 00:20:47,360
duplicates. So what now T.C.P. Tahoe is going to do is is going to transition back to the slow start

205
00:20:47,360 --> 00:20:56,320
state. My congestion window is five. So I'm going to set my slow start threshold to be equal to half

206
00:20:56,320 --> 00:21:01,600
of the congestion window. So let's just say we're going to set it to basically it's 2.5.

207
00:21:02,559 --> 00:21:06,319
And enter the slow start state again. So I'll send a single packet.

208
00:21:09,839 --> 00:21:16,079
Now this packet is going to be sent on a timeout. So essentially I'm waiting for the acknowledgement

209
00:21:16,079 --> 00:21:22,879
nine. I haven't heard it all time out and I will send I will resend nine. Then that's the number

210
00:21:22,879 --> 00:21:30,399
packets I can have outstanding. Then if an acknowledgement for nine comes back I can set my congestion

211
00:21:30,400 --> 00:21:38,720
window to two. But this acknowledge won't be just be for nine because it's received 10, 11, and 12.

212
00:21:38,720 --> 00:21:43,360
So that acknowledgement's actually going to say is acknowledge 12. So I now have my congestion

213
00:21:43,360 --> 00:21:50,080
window to two. I know 12 has been received. I can send 13 and 14 and I'm back in the slow start

214
00:21:50,080 --> 00:21:55,200
state. Until I reach this SS threshold which final transition back to congestion of winds.

215
00:21:55,200 --> 00:22:01,519
So that's a basic walkthrough of TCP Tahoe and how it behaves. It's moving between slow start and

216
00:22:01,519 --> 00:22:07,279
congestion avoidance and how it's using triple duplicate acts in order to infer that something has

217
00:22:07,279 --> 00:22:11,200
gone wrong and return back to the slow start state. It's using that to infer that there's congestion

218
00:22:11,200 --> 00:22:12,799
in slow down.

