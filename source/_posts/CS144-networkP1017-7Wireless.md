---
title: CS144 NetworkP1017 7Wireless
---

1
00:00:00,000 --> 00:00:03,000
So in this video, we'll talk about wireless networking.

2
00:00:03,000 --> 00:00:07,919
And wireless systems turn out to in practice be really different than wired ones.

3
00:00:07,919 --> 00:00:12,320
One of the big challenges to see today on the internet is we all want to connect wirelessly,

4
00:00:12,320 --> 00:00:15,839
yet there have been a lot of assumptions made, historically, that networks would behave

5
00:00:15,839 --> 00:00:20,920
like wired ones, and actually bridging that to wireless is often difficult, which is why

6
00:00:20,920 --> 00:00:24,480
we see poor performance, saying you're laptop using Wi-Fi.

7
00:00:24,480 --> 00:00:27,400
So in this video, I'm going to talk really about why is wireless different?

8
00:00:27,399 --> 00:00:31,399
What are these properties that make it so challenging and so difficult, and why is it

9
00:00:31,399 --> 00:00:33,119
sometimes seem to be flaky?

10
00:00:33,119 --> 00:00:36,920
So in the context of this video, I'm going to focus on access point networks.

11
00:00:36,920 --> 00:00:44,879
And by that, I mean wireless networks where, you know, say you have your laptop with some

12
00:00:44,879 --> 00:00:54,399
Wi-Fi card, and it connects to some access point, which then has a wired connection to the

13
00:00:54,399 --> 00:00:59,159
internet.

14
00:00:59,159 --> 00:01:07,159
And this access point is serving, you know, it's often multiple devices, like case your phone.

15
00:01:07,159 --> 00:01:12,480
This is different than, say, a mobile phone network, or you know, a 3G or 4G, which are

16
00:01:12,480 --> 00:01:17,759
managed very differently, much more tightly controlled, all kinds of different issues emerging

17
00:01:17,759 --> 00:01:18,759
those systems.

18
00:01:18,760 --> 00:01:24,520
Here I'm just going to focus on open standards, access point networks, you know, things

19
00:01:24,520 --> 00:01:28,439
which you just plug in at home, connect your wired connection to bridge to the broader

20
00:01:28,439 --> 00:01:29,439
internet.

21
00:01:29,439 --> 00:01:33,840
So one of the first things to realize about wireless is that unlike in a wired network, where

22
00:01:33,840 --> 00:01:36,719
the medium and the wire is completely under control control.

23
00:01:36,719 --> 00:01:39,480
There's nobody fighting you for the capacity of that wire.

24
00:01:39,480 --> 00:01:42,320
It's for you and you alone.

25
00:01:42,320 --> 00:01:45,800
In the wireless environment, you're using space, right?

26
00:01:45,799 --> 00:01:48,959
You're using the electromagnetic spectrum around you, which everyone else might be wanting

27
00:01:48,959 --> 00:01:49,959
to use as well.

28
00:01:49,959 --> 00:01:52,519
It's not a controlled medium.

29
00:01:52,519 --> 00:01:54,280
It's a shared medium.

30
00:01:54,280 --> 00:01:57,840
And some practice what this means is that it is very tightly regulated.

31
00:01:57,840 --> 00:02:03,239
So this is a map of how just in the United States, radio spectrum is allocated.

32
00:02:03,239 --> 00:02:04,239
It's a radio spectrum.

33
00:02:04,239 --> 00:02:06,280
Here's kind of the big picture of RF.

34
00:02:06,280 --> 00:02:11,439
We're not a RF, but of electromagnetic spectrums, down from very low frequency stuff, all

35
00:02:11,439 --> 00:02:13,159
the way up to cosmic rays.

36
00:02:13,159 --> 00:02:15,199
That's this big thing down at the bottom.

37
00:02:15,199 --> 00:02:17,399
So this is, you can get from the department of commerce.

38
00:02:17,399 --> 00:02:19,719
There's a free government document.

39
00:02:19,719 --> 00:02:23,799
And so generally data communication is occurring in this region down here, different kinds of

40
00:02:23,799 --> 00:02:27,959
communication, either data communication, voice communication, etc.

41
00:02:27,959 --> 00:02:33,159
Up above what's in this picture here, this yellow region is infrared.

42
00:02:33,159 --> 00:02:35,959
Then here's visible light here.

43
00:02:35,959 --> 00:02:39,599
So here's visible light.

44
00:02:39,599 --> 00:02:42,439
Here's ultraviolet, x-rays, gamma rays, etc.

45
00:02:42,439 --> 00:02:44,319
But RF is down here.

46
00:02:44,319 --> 00:02:48,079
So below visible light, lower frequencies.

47
00:02:48,079 --> 00:02:49,319
And here's what the spectrum looks like.

48
00:02:49,319 --> 00:02:53,120
And so you can see there's a huge chunk of spectrum where it's going all the way from

49
00:02:53,120 --> 00:02:54,120
three kilohertz.

50
00:02:54,120 --> 00:03:01,719
So when you have 3,000 waves per second, up to 300 gigahertz or 300 billion waves per second.

51
00:03:01,719 --> 00:03:06,799
So if you call it, if given that RF or that electromagnetic radiation moves at one foot

52
00:03:06,799 --> 00:03:14,280
per nanosecond, at three kilohertz, you're looking at waves that are on the order of 300,000

53
00:03:14,280 --> 00:03:20,280
or 300,000 feet long.

54
00:03:20,280 --> 00:03:24,960
Whereas down to the 300 gigahertz range, you're looking at waves that are one-three hundredth

55
00:03:24,960 --> 00:03:25,960
of a foot long.

56
00:03:25,960 --> 00:03:29,000
So a huge, huge range of frequencies for all kinds of things.

57
00:03:29,000 --> 00:03:34,240
There's TV, there's radio, there's data communication, there are maritime systems, there are military

58
00:03:34,240 --> 00:03:36,240
systems, there are satellites, etc.

59
00:03:36,240 --> 00:03:42,599
But when we talk about access point networks and modern data communication systems, we're

60
00:03:42,599 --> 00:03:47,560
talking about these three, these four narrow chunks.

61
00:03:47,560 --> 00:03:57,719
So these green ones are telephony.

62
00:03:57,719 --> 00:03:59,959
So it's down the 800, 900 megahertz range, 700.

63
00:03:59,959 --> 00:04:01,439
This is the 1.9.

64
00:04:01,439 --> 00:04:03,719
Telephony, the Y-max and stuff starting to move up.

65
00:04:03,719 --> 00:04:07,439
But basically, 3G standards are down here.

66
00:04:07,439 --> 00:04:12,159
And these two blocks here, these two red blocks, this is Wi-Fi.

67
00:04:13,159 --> 00:04:20,800
And so when you think about all of the data communication that we use today, phones and laptops,

68
00:04:20,800 --> 00:04:25,120
it's all squishing these two, two, these four tiny little slices.

69
00:04:25,120 --> 00:04:30,279
Now the really important thing to realize about wireless is that, as you can imagine, wireless

70
00:04:30,279 --> 00:04:31,879
transmission, it's not a wire.

71
00:04:31,879 --> 00:04:33,879
The wireless medium is not a wire.

72
00:04:33,879 --> 00:04:38,800
And what this means is that, unlike something propagated on a wire, where there's some attenuation

73
00:04:38,800 --> 00:04:44,800
or there's some resistance in the copper, a wireless signal is radiating over space.

74
00:04:44,800 --> 00:04:49,000
Like in the simplest, if you have a perfect omnidirectional antenna, it's radiating in this

75
00:04:49,000 --> 00:04:51,520
case, and everything is in the sphere out.

76
00:04:51,520 --> 00:04:57,600
And what this means is that the signal strength degrades with distance at r squared or faster.

77
00:04:57,600 --> 00:04:58,600
Right?

78
00:04:58,600 --> 00:05:04,920
A signal, when you are twice as far away from a transmitter, the signal is at least attenuated

79
00:05:04,920 --> 00:05:05,920
by 75%.

80
00:05:05,920 --> 00:05:11,400
And it's at a quarter of the strength, just because think of the surface of a sphere.

81
00:05:11,400 --> 00:05:15,520
And so what this means, that unlike in a wired system where we can know, oh, the cable

82
00:05:15,520 --> 00:05:18,800
as long as it's good, it's not under the hundred meters, we're going to have a strong signal

83
00:05:18,800 --> 00:05:19,800
strength.

84
00:05:19,800 --> 00:05:22,360
And wireless systems, you often have very weak signal strengths.

85
00:05:22,360 --> 00:05:25,280
In fact, people are going to try and get all the way to the edge because they want to be

86
00:05:25,280 --> 00:05:29,120
sitting out on the lawn using their Wi-Fi access point.

87
00:05:29,120 --> 00:05:34,120
Furthermore, unlike a wire where it's tightly controlled, there's nobody doing stuff, wireless

88
00:05:34,120 --> 00:05:35,560
is out in the world around you.

89
00:05:35,560 --> 00:05:38,680
So it can be that somebody steps between you and your access point.

90
00:05:38,680 --> 00:05:42,800
Now, suddenly all these wireless signals have to go through that person.

91
00:05:42,800 --> 00:05:44,360
They're a big bag of water.

92
00:05:44,360 --> 00:05:46,879
The wireless is going to become much, much weaker.

93
00:05:46,879 --> 00:05:50,360
And so the signal strength is going to change significantly over time as people open doors,

94
00:05:50,360 --> 00:05:53,639
people move around, as you move around, as they humidity changes.

95
00:05:53,639 --> 00:05:56,399
Furthermore, there are everyone else is using the medium as well.

96
00:05:56,399 --> 00:05:57,840
There's lots of interference.

97
00:05:57,840 --> 00:06:00,639
It's not like you have this wire to yourself.

98
00:06:00,639 --> 00:06:04,360
Instead, the person next door might be using their wireless network, which is on the same

99
00:06:04,360 --> 00:06:05,360
frequency.

100
00:06:05,360 --> 00:06:07,439
So let's look at the first thing, signal strength.

101
00:06:07,439 --> 00:06:11,840
So the problem here is that there are obstructions in the real world and they can move around and

102
00:06:11,840 --> 00:06:12,840
they weaken the signal.

103
00:06:12,840 --> 00:06:17,759
If you stand behind a metal plate, your wireless signal will be much weaker than if you stood

104
00:06:17,759 --> 00:06:19,280
in front of it.

105
00:06:19,280 --> 00:06:21,480
Furthermore, wireless signals reflect.

106
00:06:21,480 --> 00:06:30,040
And so it can be that I am standing in some hallway here with my laptop.

107
00:06:30,040 --> 00:06:32,840
And there's an access point here.

108
00:06:32,839 --> 00:06:39,239
And it might be that the signal I get is some weird reflection off of different media,

109
00:06:39,239 --> 00:06:41,599
off of different walls.

110
00:06:41,599 --> 00:06:45,519
And the trick here is that in practice, this means that, for example, here I'm getting

111
00:06:45,519 --> 00:06:49,959
this reflection, but I'm also getting a direct signal safe through these walls is that

112
00:06:49,959 --> 00:06:54,479
unlike in a wire, in a wireless environment, you can have something called multi-path,

113
00:06:54,479 --> 00:06:57,919
that you're getting this signal, but you're getting multiple copies of it across different

114
00:06:57,919 --> 00:06:59,399
paths with different delays.

115
00:06:59,399 --> 00:07:04,120
Think of it like echoes in a canyon where there's the direct sound here, but then all

116
00:07:04,120 --> 00:07:09,679
of these echoes taking different paths reflecting off the walls of a canyon.

117
00:07:09,679 --> 00:07:13,479
There's no perfectly uniform antenna, so if you move a little to the left, it could be that

118
00:07:13,479 --> 00:07:16,399
antenna is no good and that's actually much weaker where you are.

119
00:07:16,399 --> 00:07:20,359
So suddenly the signal goes down and you lose connection.

120
00:07:20,359 --> 00:07:22,599
Furthermore, all these things are continuously changing.

121
00:07:22,599 --> 00:07:27,839
You can imagine you move a little bit and suddenly the multi-path changes, the reflections

122
00:07:27,839 --> 00:07:28,839
change.

123
00:07:28,839 --> 00:07:32,599
Like, imagine I move a little bit, the antenna is a little different, it's oriented differently.

124
00:07:32,599 --> 00:07:34,759
And so things are dynamically changing.

125
00:07:34,759 --> 00:07:36,879
The environment around you, it's not controlled.

126
00:07:36,879 --> 00:07:40,799
It could be somebody closes their office door and suddenly your wireless signal goes out.

127
00:07:40,799 --> 00:07:42,399
Just to give you a sense of what this looks like.

128
00:07:42,399 --> 00:07:45,879
So this is some data collected by a student of mine.

129
00:07:45,879 --> 00:07:49,439
I was now faculty at Ohio State, Canon.

130
00:07:49,439 --> 00:07:55,799
And what it's showing you is signal strength over time, down here on the bottom, was called

131
00:07:55,800 --> 00:07:59,480
the Received Signal Strength Indicator, signal strength.

132
00:07:59,480 --> 00:08:01,960
And then the top, the Observe Packet Reception Ratio.

133
00:08:01,960 --> 00:08:06,520
So this is for an 802.15.4 link that you measured.

134
00:08:06,520 --> 00:08:13,000
And so the transmitter is stationary, the receiver is stationary, and for every packet you

135
00:08:13,000 --> 00:08:16,519
received, you log what was the received signal strength, and then you was observing what

136
00:08:16,519 --> 00:08:19,000
percentage of packets were received over time.

137
00:08:19,000 --> 00:08:22,240
This red line shows the long-term average of this communication.

138
00:08:22,240 --> 00:08:25,280
So it's actually pretty good around 93%.

139
00:08:25,279 --> 00:08:28,919
So what we can see is that over the space of just a couple of seconds, the signal strength

140
00:08:28,919 --> 00:08:31,759
is pretty solid up at 84 dBm.

141
00:08:31,759 --> 00:08:32,759
That's the units.

142
00:08:32,759 --> 00:08:34,720
It drops down a little bit.

143
00:08:34,720 --> 00:08:36,360
Things get a little worse, drops down.

144
00:08:36,360 --> 00:08:37,360
And then suddenly it drops.

145
00:08:37,360 --> 00:08:42,879
And it just drops by around 6 or around 8 dBm or around 8 dB.

146
00:08:42,879 --> 00:08:47,639
So around a factor of 10 or 5 to 10.

147
00:08:47,639 --> 00:08:52,199
And then what happens is that that is below the signal strength in which this device can

148
00:08:52,200 --> 00:08:53,200
receive packets.

149
00:08:53,200 --> 00:08:56,960
So the Packer Reception Ratio drops to 0%.

150
00:08:56,960 --> 00:09:00,600
For a short period, then it comes up and starts receiving packets again.

151
00:09:00,600 --> 00:09:05,000
And so just over the space of here, 10 seconds or so, we see that a link is going from

152
00:09:05,000 --> 00:09:12,520
you 99% down to 85%, back up to 90%, down to 0%, to 70.

153
00:09:12,520 --> 00:09:14,280
You see these significant changes over time.

154
00:09:14,280 --> 00:09:19,360
And so somehow your network, think about TCP, think about all the retransmission schemes,

155
00:09:19,360 --> 00:09:22,440
ask the deal with this kind of behavior.

156
00:09:22,440 --> 00:09:27,560
So here I'm going to show you, in fact, a real time video of a network we had deployed

157
00:09:27,560 --> 00:09:31,600
here at Stanford called Stanford Swann, the Stanford Wireless Access Network, is an 80 to

158
00:09:31,600 --> 00:09:34,360
11 BG testbed, so Wi-Fi.

159
00:09:34,360 --> 00:09:36,680
And it's around 25 nodes or so.

160
00:09:36,680 --> 00:09:41,360
And essentially what I'm going to show you is what this network looked like over 2.5 seconds.

161
00:09:41,360 --> 00:09:44,360
So this is in a time step to 25 milliseconds.

162
00:09:44,360 --> 00:09:46,039
There's 100 time steps.

163
00:09:46,039 --> 00:09:50,360
And each of these is a node, gates is a computer science department, packet is the E-department,

164
00:09:50,360 --> 00:09:56,399
there's this street in between, CEREMOL.

165
00:09:56,399 --> 00:09:58,679
And I'm going to show you what this network looked like over time.

166
00:09:58,679 --> 00:10:03,079
So for each node, there are lines between nodes, which show you the packet reception ratio

167
00:10:03,079 --> 00:10:04,599
here of those links.

168
00:10:04,599 --> 00:10:09,519
A dark line means that all the packets are received, and a very light line or a no line means

169
00:10:09,519 --> 00:10:16,519
that no packets are very few packets are received.

170
00:10:16,519 --> 00:10:19,439
So watch what's happening with these links, how quickly they're changing.

171
00:10:19,439 --> 00:10:21,480
This is 2.5 seconds.

172
00:10:21,480 --> 00:10:26,000
And so we can see links are coming and going, they're changing, you know, in the space of

173
00:10:26,000 --> 00:10:27,319
25 milliseconds or less.

174
00:10:27,319 --> 00:10:32,720
Look at this link here, it's oscillating between 80% and 10% back and forth.

175
00:10:32,720 --> 00:10:35,559
And look at the links between the two.

176
00:10:35,559 --> 00:10:40,039
The point here is that in wireless networks like Wi-Fi networks, they're highly, highly

177
00:10:40,039 --> 00:10:41,519
dynamic.

178
00:10:41,519 --> 00:10:45,039
So in addition to the issue of a signal strength changing over time, there's also the issue

179
00:10:45,039 --> 00:10:46,039
of interference.

180
00:10:46,039 --> 00:10:50,399
So a lot of wireless communication today is occurring in unlicensed Wi-Fi, it's access

181
00:10:50,399 --> 00:10:53,439
point networks are current unlicensed bands, bands that don't require a license from the

182
00:10:53,439 --> 00:10:54,439
government.

183
00:10:54,439 --> 00:10:55,439
Anyone can use this band.

184
00:10:55,439 --> 00:10:58,919
And that's why they're so popular, because they're free.

185
00:10:58,919 --> 00:11:01,519
But then lots and lots of different technologies share the band.

186
00:11:01,519 --> 00:11:09,199
So here's a map, for example, of just what's going on in the 2.4, basically the 2.5 gigahertz

187
00:11:09,199 --> 00:11:10,199
range.

188
00:11:10,199 --> 00:11:12,840
This is Wi-Fi, Wi-Fi is a lot of frequencies you can see.

189
00:11:12,840 --> 00:11:17,299
Here's Wi-Fi 802.11b and these different ranges here you can see it's bandwidth, the 22

190
00:11:17,299 --> 00:11:20,000
megahertz, here's channels 1, 6, and 11.

191
00:11:20,000 --> 00:11:27,039
But at the same frequency ranges, there's 802.154, ZigBee, a low power wireless system,

192
00:11:27,039 --> 00:11:29,000
which is using the same range of frequencies.

193
00:11:29,000 --> 00:11:31,480
So Bluetooth uses the same range of frequencies.

194
00:11:31,480 --> 00:11:36,759
This means that something in 802.11 can receive interference or something in 802.154 and vice

195
00:11:36,759 --> 00:11:37,759
versa.

196
00:11:37,759 --> 00:11:41,440
These are challenges that all these systems have to deal with, that they might have good

197
00:11:41,440 --> 00:11:44,759
signal, they might have low noise, but then someone's interfering with them.

198
00:11:44,759 --> 00:11:48,720
And so for example, if you just look at what wireless activity is like over time, this

199
00:11:48,720 --> 00:11:56,200
is this nice graph which on Prokosh Kanoali, he's now a professor at University of Houston

200
00:11:56,200 --> 00:11:57,200
generated.

201
00:11:57,200 --> 00:12:05,960
This is a ticket at this data from USC, which is where he used to be a student, PhD student.

202
00:12:05,960 --> 00:12:08,440
And you can see, look at all those Wi-Fi activities.

203
00:12:08,440 --> 00:12:12,160
So here's time in seconds, some 0 to 2 minutes, and different Wi-Fi channels went to 11.

204
00:12:12,160 --> 00:12:15,680
You can see that these channels, 1 and 11, are really, really busy, are orange, showing

205
00:12:15,680 --> 00:12:18,480
lots and lots of Wi-Fi activity.

206
00:12:18,480 --> 00:12:22,160
And so the lessons take away here is that wireless networks are becoming increasingly important.

207
00:12:22,160 --> 00:12:27,160
We'd much rather just connect to the internet wirelessly rather than plug a wire into our laptop.

208
00:12:27,639 --> 00:12:31,839
But generally they don't work as well, though less reliable, they're more flaky.

209
00:12:31,839 --> 00:12:36,719
And this is because of the fact that they're in this shared medium that's uncontrolled.

210
00:12:36,719 --> 00:12:43,639
Lots of devices are using it, the environment's changing around them, and there's lots of interference.

211
00:12:43,639 --> 00:12:50,480
And so in practice, what this means is that to try to get wireless to be good enough,

212
00:12:50,480 --> 00:12:57,000
as to be usable, do these different properties and different behaviors.

213
00:12:57,000 --> 00:13:01,240
Wireless actually ends up using very different algorithms and protocols.

214
00:13:01,240 --> 00:13:04,759
So wireless link layers look different than wireless link layers.

215
00:13:04,759 --> 00:13:09,000
Wireless media access control systems look different than wired ones.

216
00:13:09,000 --> 00:13:13,960
So this next series of videos is going to go into some of those differences and explain how wireless today works.

