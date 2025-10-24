---
title: CS144 NetworkP513 11PacketSwitchingrecap
---

1
00:00:00,000 --> 00:00:03,600
In this unit, you learned a lot about packet switching.

2
00:00:03,600 --> 00:00:05,200
This was an intense unit.

3
00:00:06,200 --> 00:00:08,560
We started out with a look at why modern networks,

4
00:00:08,560 --> 00:00:09,900
including the internet,

5
00:00:09,900 --> 00:00:12,480
are built on a foundation of packet switching.

6
00:00:12,480 --> 00:00:14,160
Packet switching is simple in the sense

7
00:00:14,160 --> 00:00:16,760
that each packet is a self-contained unit of data

8
00:00:16,760 --> 00:00:18,559
that carries the information necessary

9
00:00:18,559 --> 00:00:20,559
for it to reach its destination.

10
00:00:21,879 --> 00:00:24,000
Packet switching is efficient in the sense

11
00:00:24,000 --> 00:00:27,160
that it keeps the link busy whenever there's work to be done,

12
00:00:27,160 --> 00:00:29,320
rather than have dedicated capacity,

13
00:00:29,320 --> 00:00:31,920
reserved for each user or application.

14
00:00:33,000 --> 00:00:35,480
Packet switching can potentially help the network recover

15
00:00:35,480 --> 00:00:36,840
quickly from failures.

16
00:00:36,840 --> 00:00:39,719
The simple forwarding paradigm with no per-flow state

17
00:00:39,719 --> 00:00:42,079
in each router makes it easier to quickly

18
00:00:42,079 --> 00:00:43,960
route around Lincoln, router failures.

19
00:00:45,560 --> 00:00:49,039
Next, we dived deep into some of the consequences

20
00:00:49,039 --> 00:00:50,600
of packet switching.

21
00:00:50,600 --> 00:00:52,719
This took us on a journey that included more math

22
00:00:52,719 --> 00:00:55,600
than you'll see in any other unit of this course.

23
00:00:55,600 --> 00:00:59,240
Packet switching dynamics determine many of the timing

24
00:00:59,240 --> 00:01:01,440
and performing characteristics of the internet.

25
00:01:01,440 --> 00:01:04,120
And so you really need to have a strong understanding

26
00:01:04,120 --> 00:01:05,519
of the packet dynamics.

27
00:01:06,719 --> 00:01:09,040
The main mathematical ideas are not that complicated

28
00:01:09,040 --> 00:01:10,560
and it's worth mastering them now

29
00:01:10,560 --> 00:01:12,960
so you can build a strong intuition.

30
00:01:12,960 --> 00:01:15,960
You now know why two packets traveling

31
00:01:15,960 --> 00:01:18,520
between the same two end hosts might encounter

32
00:01:18,520 --> 00:01:19,480
a different delay.

33
00:01:20,480 --> 00:01:23,560
While the time they spend traversing each link is the same,

34
00:01:23,560 --> 00:01:25,359
the packets might take different paths

35
00:01:25,359 --> 00:01:26,960
and experience different queueing delays

36
00:01:26,960 --> 00:01:28,560
in the routers along the way.

37
00:01:29,719 --> 00:01:32,599
It's absolutely crucial that you fully understand

38
00:01:32,599 --> 00:01:35,319
the main three components of packet delay,

39
00:01:35,319 --> 00:01:38,199
the packetization delay, the propagation delay,

40
00:01:38,199 --> 00:01:39,919
and the queueing delay.

41
00:01:39,919 --> 00:01:43,119
And that you understand the physical processes that cause them.

42
00:01:43,119 --> 00:01:44,439
You should get into the habit of sketching

43
00:01:44,439 --> 00:01:46,359
and using the simple deterministic queue model

44
00:01:46,359 --> 00:01:47,399
that I taught you.

45
00:01:47,399 --> 00:01:48,879
It's a simple geometric construct

46
00:01:48,879 --> 00:01:51,039
and it lets you visualize what's going on.

47
00:01:51,039 --> 00:01:52,640
It tells us why routers have buffers

48
00:01:52,640 --> 00:01:55,119
and gets us thinking about how big they should be.

49
00:01:55,119 --> 00:01:57,799
It tells us why streaming applications need a playback buffer

50
00:01:57,799 --> 00:02:01,200
to give a smooth listening or viewing experience for the user.

51
00:02:02,200 --> 00:02:03,439
We'll use the same method later

52
00:02:03,439 --> 00:02:05,759
when we study congestion control as well.

53
00:02:07,879 --> 00:02:10,599
Finally, we use the simple deterministic model

54
00:02:11,479 --> 00:02:13,759
to learn how a network can go beyond

55
00:02:13,759 --> 00:02:16,439
just simple first come first serve packet delivery.

56
00:02:16,439 --> 00:02:18,560
Packet switch network can guarantee the rate

57
00:02:18,560 --> 00:02:19,960
that each flow receives

58
00:02:19,960 --> 00:02:22,079
and even bound the delay packet experiences

59
00:02:22,079 --> 00:02:23,879
from one end of the network to the other.

60
00:02:23,879 --> 00:02:26,120
These require some careful thinking about.

61
00:02:26,120 --> 00:02:27,759
Don't worry if it took a long time to get the hang of it

62
00:02:28,719 --> 00:02:32,039
as there's some difficult concepts at first.

63
00:02:32,039 --> 00:02:33,280
But they're important.

64
00:02:33,280 --> 00:02:35,519
If you can understand how a packet switch network

65
00:02:35,519 --> 00:02:38,599
can provide both rate and delay guarantees,

66
00:02:38,599 --> 00:02:40,280
then you have a strong understanding

67
00:02:40,280 --> 00:02:41,959
of how packet switching works.

68
00:02:43,879 --> 00:02:46,479
You learned a lot in this unit.

69
00:02:46,479 --> 00:02:50,159
First, queuing delay and end to end delay.

70
00:02:50,159 --> 00:02:52,199
You learn that the time it takes for a packet

71
00:02:52,199 --> 00:02:54,519
to travel between two end hosts

72
00:02:54,519 --> 00:02:57,280
is turned by three components.

73
00:02:57,319 --> 00:02:59,560
First, we have to transmit the packet

74
00:02:59,560 --> 00:03:01,360
over each link in turn.

75
00:03:01,360 --> 00:03:03,520
The time it takes to write the packet onto each link

76
00:03:03,520 --> 00:03:06,920
is determined by the time it takes to write each bit,

77
00:03:06,920 --> 00:03:09,879
multiplied by the number of bits in the packet.

78
00:03:09,879 --> 00:03:12,280
We call this the packetization delay.

79
00:03:13,439 --> 00:03:15,800
Second, the bits have to propagate down the cable

80
00:03:15,800 --> 00:03:17,960
or through the air to the other end of the link.

81
00:03:17,960 --> 00:03:21,439
The propagation delay is determined by the speed of propagation,

82
00:03:21,439 --> 00:03:23,280
which is close to the speed of light

83
00:03:23,280 --> 00:03:25,039
and the distance the bits travel.

84
00:03:26,039 --> 00:03:29,120
Make sure the difference between propagation delay

85
00:03:29,120 --> 00:03:32,239
and packetization delay is clear in your mind

86
00:03:32,239 --> 00:03:35,239
because it's a frequent cause for confusion.

87
00:03:35,239 --> 00:03:39,079
Third, the end to end delay has a variable component

88
00:03:39,079 --> 00:03:40,519
of queuing delay.

89
00:03:40,519 --> 00:03:42,560
Because the internet uses packet switching,

90
00:03:42,560 --> 00:03:44,519
the routers have to have buffers

91
00:03:44,519 --> 00:03:46,519
to hold packets during time of congestion.

92
00:03:46,519 --> 00:03:48,359
And so the queuing delay depends on

93
00:03:48,359 --> 00:03:51,199
how busy the network is right now.

94
00:03:51,199 --> 00:03:52,519
Later, when we study wireless,

95
00:03:52,719 --> 00:03:55,280
we'll see the wireless links and more variability

96
00:03:55,280 --> 00:03:57,920
to delay because wireless links are noisy.

97
00:03:57,920 --> 00:04:00,680
So packets frequently need to be retransmitted

98
00:04:00,680 --> 00:04:02,520
and they can actually have variable

99
00:04:02,520 --> 00:04:04,400
changing packetization delays.

100
00:04:08,600 --> 00:04:10,360
Real-time streaming applications,

101
00:04:10,360 --> 00:04:12,680
such as Skype, YouTube, and Netflix,

102
00:04:12,680 --> 00:04:14,719
need to deliver continuous real-time voice

103
00:04:14,719 --> 00:04:16,720
in video to our ears and eyes,

104
00:04:16,720 --> 00:04:18,800
even though the network delivers packets

105
00:04:18,800 --> 00:04:20,800
at unpredictable times.

106
00:04:20,800 --> 00:04:24,079
All streaming applications use a playback buffer

107
00:04:24,079 --> 00:04:27,759
to smooth out the variations in packet delay.

108
00:04:27,759 --> 00:04:30,040
So they can play the video and audio to the user

109
00:04:30,040 --> 00:04:32,879
without having to pause and wait for new data in the middle.

110
00:04:33,960 --> 00:04:37,080
You learned how to design a playback buffer

111
00:04:37,080 --> 00:04:39,080
and you learned why it is not possible

112
00:04:39,080 --> 00:04:41,400
for the internet to completely avoid pauses

113
00:04:41,400 --> 00:04:42,519
in the playback.

114
00:04:42,519 --> 00:04:44,360
Packets can experience a large delay

115
00:04:44,360 --> 00:04:47,319
causing the playback effort buffer to run dry.

116
00:04:47,319 --> 00:04:50,319
If you fully understand how playback is designed,

117
00:04:50,319 --> 00:04:51,639
then you have a good understanding

118
00:04:51,639 --> 00:04:53,759
of packet dynamics on the internet.

119
00:04:57,399 --> 00:05:01,120
Cuing delay in routers is a complex topic all on its own.

120
00:05:01,120 --> 00:05:03,680
The few of Cuing theories are very mathematically rich

121
00:05:03,680 --> 00:05:05,680
and you can take classes and read many books

122
00:05:05,680 --> 00:05:07,039
just on this topic.

123
00:05:08,240 --> 00:05:11,079
In general, Cues with complicated random

124
00:05:11,079 --> 00:05:14,399
or rival processes are complex beasts.

125
00:05:14,399 --> 00:05:16,600
A network consisting of a series of router cues

126
00:05:16,600 --> 00:05:18,719
with many computing flows from random users

127
00:05:18,720 --> 00:05:23,200
to different applications is way hard to understand

128
00:05:23,200 --> 00:05:24,640
and analyze in closed form.

129
00:05:25,520 --> 00:05:28,440
But our goal here is much less ambitious.

130
00:05:28,440 --> 00:05:31,600
We want you to develop some intuition

131
00:05:31,600 --> 00:05:34,080
about how Cues evolve and how to become familiar

132
00:05:34,080 --> 00:05:35,480
with their dynamics.

133
00:05:35,480 --> 00:05:37,320
Just like the Cue with airport security,

134
00:05:37,320 --> 00:05:40,240
a router cue holds the packet that have arrived

135
00:05:40,240 --> 00:05:41,880
but not get departed.

136
00:05:41,880 --> 00:05:45,280
If we can keep track of arrivals and departures,

137
00:05:45,280 --> 00:05:47,040
then we can know how deep the queue is

138
00:05:47,040 --> 00:05:50,200
and how long an arriving packet must wait.

139
00:05:50,200 --> 00:05:53,480
The deterministic cue model is a geometric representation

140
00:05:53,480 --> 00:05:56,240
of packets in the queue, letting us visualize

141
00:05:56,240 --> 00:05:58,000
how the queue evolves over time.

142
00:05:59,280 --> 00:06:01,800
It's good practice to use this geometric model

143
00:06:01,800 --> 00:06:04,800
to help you build your intuition of how the math works.

144
00:06:07,360 --> 00:06:10,080
The deterministic cue model helps us understand

145
00:06:10,080 --> 00:06:12,120
rate guarantees.

146
00:06:12,120 --> 00:06:14,600
Sometimes we want a particular flow of packsters

147
00:06:14,600 --> 00:06:16,960
to receive a particular fraction of the network capacity

148
00:06:16,959 --> 00:06:19,319
for example Stanford might have a contract with AT&T

149
00:06:19,319 --> 00:06:21,239
guarantee that its traffic will always receive

150
00:06:21,239 --> 00:06:24,159
at least 10 gigabits per second of service.

151
00:06:24,159 --> 00:06:27,039
Over the link that attaches to AT&T, that's easy to do.

152
00:06:27,039 --> 00:06:30,839
We simply connect it with a 10 gigabit per second link.

153
00:06:30,839 --> 00:06:32,839
AT&T could also make this guarantee

154
00:06:32,839 --> 00:06:34,959
by putting all the Stanford packets into a queue

155
00:06:34,959 --> 00:06:37,319
in their routers making sure they have 10 gigabits

156
00:06:37,319 --> 00:06:39,359
per second of service.

157
00:06:39,359 --> 00:06:41,279
This can be done in very aggregate traffic

158
00:06:41,279 --> 00:06:43,359
like all Stanford's packets or can be done

159
00:06:43,359 --> 00:06:45,359
in individual applications.

160
00:06:45,360 --> 00:06:48,680
We might ask Comcast quite at least one megabit per second

161
00:06:48,680 --> 00:06:50,439
to stream our Netflix videos.

162
00:06:52,439 --> 00:06:55,199
You learned how to serve every queue in a router

163
00:06:55,199 --> 00:06:56,800
at a minimum rate.

164
00:06:56,800 --> 00:07:00,280
If all packets are the same length, this would be trivial.

165
00:07:00,280 --> 00:07:02,560
But different packets have different lengths.

166
00:07:02,560 --> 00:07:04,319
And so we need to take into consideration

167
00:07:04,319 --> 00:07:06,520
how long each packet is.

168
00:07:06,520 --> 00:07:09,040
This is where weighted for a queue income set.

169
00:07:09,040 --> 00:07:11,800
It tells us the correct order to serve packets

170
00:07:11,800 --> 00:07:13,040
in the router queues.

171
00:07:13,040 --> 00:07:15,200
So as it take into consideration the length

172
00:07:15,200 --> 00:07:18,879
of individual packets.

173
00:07:18,879 --> 00:07:24,040
This same idea can be extended to provide the leg guarantees.

174
00:07:24,040 --> 00:07:27,439
Now we know how to control the rate in which a queue is served.

175
00:07:27,439 --> 00:07:31,680
We can control the maximum delay a packet can experience in the queue.

176
00:07:31,680 --> 00:07:35,040
It is simply the length of the queue divided by the rate.

177
00:07:35,040 --> 00:07:37,920
All we need to do is limit the length of the queue

178
00:07:37,920 --> 00:07:41,520
so we can bound the delay.

179
00:07:41,519 --> 00:07:45,879
Finally, you learned how packets are switched and forwarded.

180
00:07:45,879 --> 00:07:48,319
As you saw, Ethernet switches in internet routers

181
00:07:48,319 --> 00:07:49,759
working very similar ways.

182
00:07:49,759 --> 00:07:51,959
When a packet arrives, it looks up the destination address

183
00:07:51,959 --> 00:07:53,039
in its forwarding table.

184
00:07:53,039 --> 00:07:55,759
If you find the address, it forth the packet to its destination,

185
00:07:55,759 --> 00:07:59,680
holding it in a buffer if the outgoing link is currently busy.

186
00:07:59,680 --> 00:08:03,680
Ethernet routers, Ethernet switches and internet routers

187
00:08:03,680 --> 00:08:06,039
differ in which your address they use

188
00:08:06,039 --> 00:08:09,199
and how they organize the forwarding tables.

189
00:08:09,199 --> 00:08:10,800
And of course, an internet router

190
00:08:10,800 --> 00:08:13,599
can document the TTL field to prevent loops.

191
00:08:13,599 --> 00:08:17,319
But at a high level, the packet switches all operate

192
00:08:17,319 --> 00:08:18,639
in roughly the same way.

193
00:08:22,519 --> 00:08:26,199
The things you learned in this unit will help you in several ways.

194
00:08:26,199 --> 00:08:29,360
One, you can take the description of a network,

195
00:08:29,360 --> 00:08:32,200
the rates and length of the links and the packet,

196
00:08:32,200 --> 00:08:35,399
and you can figure out the fixed component of the packets

197
00:08:35,399 --> 00:08:37,919
end to end the way.

198
00:08:37,919 --> 00:08:39,879
You can visualize the variable queue in delay

199
00:08:39,879 --> 00:08:42,439
by sketching the queue, which is the most common cause

200
00:08:42,439 --> 00:08:46,120
for variable end to end delay in a network.

201
00:08:46,120 --> 00:08:48,360
You can explain how a packet switch works,

202
00:08:48,360 --> 00:08:51,839
such as an Ethernet switch or an internet router.

203
00:08:51,839 --> 00:08:55,599
You can design a playback buffer for a real-time application.

204
00:08:55,599 --> 00:08:58,799
And you can explain how a flow traversing a packet switch

205
00:08:58,799 --> 00:09:01,240
network can be delivered at a minimum rate.

206
00:09:01,240 --> 00:09:03,959
And you can explain how individual packets

207
00:09:03,960 --> 00:09:06,280
could have a bounded delay from end to end.

