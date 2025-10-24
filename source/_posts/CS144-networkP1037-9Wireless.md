---
title: CS144 NetworkP1037 9Wireless
---

1
00:00:00,000 --> 00:00:04,960
In this video, I'm going to talk about CSMACA, Carrier Sends Multiple Access Collision of

2
00:00:04,960 --> 00:00:09,919
Voidens, a MAC protocol or MAC algorithm used in wireless networks.

3
00:00:09,919 --> 00:00:14,200
So for a wireless network to be able to detect that there's a collision, it needs to know

4
00:00:14,200 --> 00:00:18,440
whether or not a packet collided or whether it was delivered successfully.

5
00:00:18,440 --> 00:00:23,519
So because in a wireless network to the signal strength attenuation, you can't detect that

6
00:00:23,519 --> 00:00:27,359
there was a collision at a receiver because you can't observe the receiver directly, you

7
00:00:27,359 --> 00:00:30,280
need some feedback from the receiver as to what's happened.

8
00:00:30,280 --> 00:00:33,600
And so the way this commonly achieved is with link layer acknowledgments.

9
00:00:33,600 --> 00:00:39,320
And so the idea is that if say A is transmitting a packet, a data packet to B, if B successfully

10
00:00:39,320 --> 00:00:53,799
receives this packet, then what it does is it sends an acknowledgment back.

11
00:00:53,799 --> 00:00:57,239
This acknowledgment packet can be very, very short and this is occurring at the link layer.

12
00:00:57,240 --> 00:00:59,359
It doesn't go across multiple hubs to the network.

13
00:00:59,359 --> 00:01:05,719
It's directly, say, using a wireless ethernet between A and B. And so the advantage of this

14
00:01:05,719 --> 00:01:11,400
is if A starts transmitting, say, a data packet to B, but at the same time, C transmits a

15
00:01:11,400 --> 00:01:18,520
data packet and the two collides, then B will not send an acknowledgment.

16
00:01:18,520 --> 00:01:20,320
It doesn't successfully receive either packet.

17
00:01:20,320 --> 00:01:21,640
It sends no acknowledgment.

18
00:01:21,640 --> 00:01:26,000
A knows that it might need to retransmit, or that it should possibly retransmit.

19
00:01:26,000 --> 00:01:29,840
Of course, you could have collisions on AX, AX aren't perfect, so it can be that A does

20
00:01:29,840 --> 00:01:34,560
some unnecessary retransmissions, but generally speaking, A needs some feedback from B to know

21
00:01:34,560 --> 00:01:38,599
whether or not the data was delivered successfully.

22
00:01:38,599 --> 00:01:42,960
If these were very, very uncommon, so in the same way to say in wire ethernet, where it's

23
00:01:42,960 --> 00:01:48,319
possible, very uncommon that a packet doesn't collide and yet doesn't arrive successfully,

24
00:01:48,319 --> 00:01:50,039
then you might not need an acknowledgment.

25
00:01:50,039 --> 00:01:54,200
But the fact that wireless, the signal strength changes so much over time and that data bitters

26
00:01:54,200 --> 00:01:57,640
are common means that you want to have some positive feedback.

27
00:01:57,640 --> 00:02:01,719
So using Linclair acknowledgments, this has CSMACA works.

28
00:02:01,719 --> 00:02:04,719
So the idea is you start off with some initial random back-off.

29
00:02:04,719 --> 00:02:07,520
It can be very small, say, if the channel's idle.

30
00:02:07,520 --> 00:02:11,920
You sense the local channel and you transmit after the back-off.

31
00:02:11,920 --> 00:02:16,759
So the basic idea here is listen if the channel's idle, then transmit.

32
00:02:16,759 --> 00:02:19,560
If you don't hear the packet acknowledged, if you don't hear an acknowledgment, then

33
00:02:19,560 --> 00:02:21,360
back off again and retry.

34
00:02:21,360 --> 00:02:22,439
So transmit again.

35
00:02:22,439 --> 00:02:26,120
If you hear the packet acknowledged, then you can send the next packet.

36
00:02:26,120 --> 00:02:32,039
This is the basic CSMA carrier sense multiple access CA collision avoidance algorithm.

37
00:02:32,039 --> 00:02:34,639
And it's collision avoidance because you do this back-off again.

38
00:02:34,639 --> 00:02:36,520
So let's look at this more concretely.

39
00:02:36,520 --> 00:02:38,879
What is 802 at 11, so Wi-Fi?

40
00:02:38,879 --> 00:02:39,879
What does it do?

41
00:02:39,879 --> 00:02:41,639
So 802 11 has two modes.

42
00:02:41,639 --> 00:02:46,479
One is CSMACA or it has many modes, but it's the common mode that everybody uses today

43
00:02:46,479 --> 00:02:47,479
is CSMACA.

44
00:02:47,479 --> 00:02:51,919
It also has another common, reasonably common, called request to send clear to send, which

45
00:02:51,919 --> 00:02:53,399
will talk about in a future video.

46
00:02:53,399 --> 00:02:56,519
But here let's talk about CSMACA.

47
00:02:56,519 --> 00:03:01,119
So the basic approach is that you pick an initial weight period T, as often starts off as

48
00:03:01,119 --> 00:03:03,839
being very small.

49
00:03:03,839 --> 00:03:08,079
And what the transmitter does is it periodically checks the channel.

50
00:03:08,079 --> 00:03:12,560
If the channel is idle, on one of those checks, it decrements T. So it's counting down

51
00:03:12,560 --> 00:03:16,599
T. So T represents the amount of idle time the transmitter wants to hear before it will

52
00:03:16,599 --> 00:03:17,599
transmit.

53
00:03:17,599 --> 00:03:20,759
So in T, you just zero tries to transmit.

54
00:03:20,759 --> 00:03:25,000
If it hears an acknowledgement, then it accepts the next packet of a transmission, all's

55
00:03:25,000 --> 00:03:26,000
good.

56
00:03:26,000 --> 00:03:32,000
If it doesn't hear an acknowledgement, it doubles T. So it'll exponentially back off longer

57
00:03:32,000 --> 00:03:33,959
and longer.

58
00:03:33,959 --> 00:03:38,399
If T grows to be larger than some large T value, then it just drops the packet.

59
00:03:38,399 --> 00:03:42,959
Rather than waiting or blocking on a given packet, it'll just drop that packet and try to

60
00:03:42,959 --> 00:03:45,120
go on to the next one.

61
00:03:45,120 --> 00:03:47,280
And so here's a little walk-through.

62
00:03:47,280 --> 00:03:55,360
So here's our sender S, and it picks an initial T value here.

63
00:03:55,360 --> 00:03:59,840
The channel here is busy, so it's not decrementing T. It starts decrementing T. T becomes

64
00:03:59,840 --> 00:04:03,000
zero here.

65
00:04:03,000 --> 00:04:04,000
And so it transmits.

66
00:04:04,000 --> 00:04:05,400
It transmits this packet.

67
00:04:05,400 --> 00:04:07,920
Unfortunately, it doesn't hear an acknowledgement.

68
00:04:07,920 --> 00:04:16,199
So then it picks a new T, which is in a range twice as large as the original T. It decrements

69
00:04:16,199 --> 00:04:18,599
that T. There are periods of busyness.

70
00:04:18,599 --> 00:04:19,719
There are periods of idleness.

71
00:04:19,719 --> 00:04:21,519
Then finally, T decrements.

72
00:04:21,519 --> 00:04:24,120
It's called this T2.

73
00:04:24,120 --> 00:04:26,120
Finally, T2 decrements to zero.

74
00:04:26,120 --> 00:04:27,120
It transmits.

75
00:04:27,120 --> 00:04:28,120
Here's an acknowledgement.

76
00:04:28,120 --> 00:04:29,120
Great.

77
00:04:29,120 --> 00:04:34,399
It goes on to the next packet transmission with the initial small T value as the back off.

78
00:04:34,399 --> 00:04:39,639
So CSMA works, CSMA CA works pretty well, but it has a bunch of problems, which really

79
00:04:39,639 --> 00:04:40,639
do occur in practice.

80
00:04:40,639 --> 00:04:44,639
So the first one is something called hidden terminals.

81
00:04:44,639 --> 00:04:50,279
And so this occurs when, say, we have this node B in the middle, like this could be, say,

82
00:04:50,279 --> 00:04:52,159
your access point.

83
00:04:52,159 --> 00:04:55,560
And you have two nodes A and C, who both want to transit to the access point.

84
00:04:55,560 --> 00:05:00,560
So the basic problem with CSMA CA is that a transmitter is listening as to whether the

85
00:05:00,560 --> 00:05:02,759
channel is idle at it.

86
00:05:02,759 --> 00:05:06,319
When really what it cares about is whether the channel is idle at the receiver.

87
00:05:06,319 --> 00:05:09,599
It could be that the receiver is hearing something, and so it can't hear the transmitter's

88
00:05:09,599 --> 00:05:12,319
packet, but the transmitter can't tell because it can't hear what's happening at the

89
00:05:12,319 --> 00:05:13,319
receiver.

90
00:05:13,319 --> 00:05:16,839
The receiver state can actually only sense its own.

91
00:05:16,839 --> 00:05:26,159
And so a hidden terminal is when two nodes say A and C both try to transmit to a receiver,

92
00:05:26,159 --> 00:05:29,399
or it could be even to adjacent receivers.

93
00:05:29,399 --> 00:05:35,120
And the receivers can hear both of them, so B can hear both A and C, but A and C cannot

94
00:05:35,120 --> 00:05:36,240
hear each other.

95
00:05:36,240 --> 00:05:45,680
So A is hidden to C, and C is hidden.

96
00:05:45,680 --> 00:05:50,000
And so A starts transmitting, B starts receiving the packet, C doesn't hear it, so C says

97
00:05:50,000 --> 00:05:51,360
a high, I think the channel is clear.

98
00:05:51,360 --> 00:05:59,000
It transmits, B hears C and A's packets, there's a collision, B hears nothing, both are lost.

99
00:05:59,000 --> 00:06:03,519
So this is something which CSMA CA can't solve because you're sensing locally, but you want

100
00:06:03,519 --> 00:06:05,319
to be sensing what's happening at the receiver.

101
00:06:05,319 --> 00:06:07,719
So you can imagine this happens a lot in AP networks.

102
00:06:07,719 --> 00:06:11,759
So the second problem is what's called an exposed terminal, and this is kind of the reverse

103
00:06:11,759 --> 00:06:13,319
of a hidden terminal.

104
00:06:13,319 --> 00:06:18,719
So imagine this case where B wants to transmit a packet to A and C wants to transmit a packet

105
00:06:18,719 --> 00:06:20,959
to D.

106
00:06:20,959 --> 00:06:27,920
But now A can't hear C, so A can't hear C.

107
00:06:27,920 --> 00:06:28,920
What's going to happen?

108
00:06:28,920 --> 00:06:32,839
B starts transmitting to A, all is good, A is receiving the packet.

109
00:06:32,839 --> 00:06:42,959
Now C wants to transmit to D. D can't hear B.

110
00:06:42,959 --> 00:06:49,000
And so this is fine, D is absolutely capable to receive a packet from C while B is transmitting,

111
00:06:49,000 --> 00:06:51,000
but C senses its local channel.

112
00:06:51,000 --> 00:06:55,599
And it hears A-HA, where B is transmitting, I can't transmit, and so it doesn't transmit,

113
00:06:55,599 --> 00:06:58,799
and so C is exposed to B.

114
00:06:58,800 --> 00:07:02,480
And so where as hidden terminals a case where someone transmits when they shouldn't,

115
00:07:02,480 --> 00:07:06,240
an exposed terminal is when someone doesn't transmit when they could.

116
00:07:06,240 --> 00:07:11,400
So the third problem that occurs in C as we see here, and even in just wireless networks

117
00:07:11,400 --> 00:07:19,920
in general, is that let's say we have our nodes A and B, and A transmits a packet to B,

118
00:07:19,920 --> 00:07:24,199
but there's no acknowledgement.

119
00:07:24,199 --> 00:07:29,959
So is this because there was a collision, that is there was some other node C transmitting

120
00:07:29,959 --> 00:07:32,879
at the same time, and that interfered?

121
00:07:32,879 --> 00:07:37,519
Or is this because suddenly the channel between A and B became very poor, that the signal

122
00:07:37,519 --> 00:07:38,839
to noise ratio went down?

123
00:07:38,839 --> 00:07:50,680
There's a weak signal, like say, you know, somebody, some person walked between the two.

124
00:07:50,680 --> 00:07:52,439
Because A can't tell.

125
00:07:52,439 --> 00:07:57,800
It doesn't know whether or not this loss was due to a collision or just poor signal.

126
00:07:57,800 --> 00:08:00,920
And you can imagine it might want to respond differently, because a collision is going

127
00:08:00,920 --> 00:08:06,000
to want to back off, because it doesn't want to contend with the channel.

128
00:08:06,000 --> 00:08:11,920
But if it was due to a low SNR, then it wants to perhaps reduce its bit rate, transmit

129
00:08:11,920 --> 00:08:18,800
slower, so it can support more bit errors due to the lower signal strength.

130
00:08:18,800 --> 00:08:22,360
And so there's often this issue, and people are starting to solve this problem now and

131
00:08:22,360 --> 00:08:23,680
figure it out.

132
00:08:23,680 --> 00:08:30,840
But where A tries to transmit to B, it's lost due to a collision, A interprets that as

133
00:08:30,840 --> 00:08:34,840
being a low SNR, so it starts transmitting a slower bit rate, which then means its packets

134
00:08:34,840 --> 00:08:37,320
are longer, which increases the chance of collisions.

135
00:08:37,320 --> 00:08:41,840
Or it transmits to B, it thinks that it's because it's due to a collision, so it backs off

136
00:08:41,840 --> 00:08:42,840
more.

137
00:08:42,840 --> 00:08:46,480
When really, if it just transmitted again immediately, it would have been fine.

138
00:08:46,480 --> 00:08:50,320
And so in a standard CSMA, a simple CSMA algorithm, distinguishing these two is really,

139
00:08:50,320 --> 00:08:51,320
really hard.

140
00:08:51,320 --> 00:08:55,920
Nevertheless, because it's so simple, and when there isn't tremendous contention when

141
00:08:55,920 --> 00:09:02,039
you do have good SNR, a CSMA works pretty well, CSMA-CA is the general MAC protocol you see

142
00:09:02,039 --> 00:09:03,719
use in Wi-Fi networks today.

