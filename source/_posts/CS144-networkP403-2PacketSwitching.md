---
title: CS144 NetworkP403 2PacketSwitching
---

1
00:00:00,000 --> 00:00:05,679
In this video, I'm going to tell you about what packet switching is and why packet switching

2
00:00:05,679 --> 00:00:08,120
is used in the internet.

3
00:00:08,120 --> 00:00:12,200
Packet switching was first described by Paul Barron in the early 1960s.

4
00:00:12,200 --> 00:00:16,719
It describes the way in which packets of information aroused one by one across the internet to

5
00:00:16,719 --> 00:00:21,839
their destination, just like letters are delivered by the post office.

6
00:00:21,839 --> 00:00:25,359
Packet switching is really important for us to understand because when we choose to use

7
00:00:25,359 --> 00:00:31,399
packet switching, it dictates many of the properties of the network.

8
00:00:31,399 --> 00:00:37,240
Today I'm going to describe what packet switching is and why it was chosen for the internet.

9
00:00:37,240 --> 00:00:43,879
But first, to set some context, I'm going to tell you about a predecessor of packet switching

10
00:00:43,879 --> 00:00:45,560
that was called circuit switching.

11
00:00:45,560 --> 00:00:49,920
And we're all very familiar with circuit switching because it's what's used in the telephone

12
00:00:49,920 --> 00:00:50,920
network.

13
00:00:51,640 --> 00:00:57,200
So the most common use of circuit switching is in the telephone, the traditional wired telephone

14
00:00:57,200 --> 00:00:58,200
network.

15
00:00:58,200 --> 00:01:03,200
And we're going to walk through what happens when we place a phone call from the phone

16
00:01:03,200 --> 00:01:07,120
on the left to the one on the right.

17
00:01:07,120 --> 00:01:11,920
Now with the picture I've got here, it shows the telephone is being connected by a dedicated

18
00:01:11,920 --> 00:01:16,359
wire and that wouldn't make for a very interesting telephone system if we can only talk to one

19
00:01:16,359 --> 00:01:17,840
other person.

20
00:01:18,719 --> 00:01:27,200
So in practice, the telephone's are connected together through a dedicated wire down to a switching

21
00:01:27,200 --> 00:01:29,400
center.

22
00:01:29,400 --> 00:01:36,080
So in the early days of telephony, back in the 1880s also, the dedicated wire went to a

23
00:01:36,080 --> 00:01:37,560
switchboard operator.

24
00:01:37,560 --> 00:01:41,600
And the switchboard operator was a roomful of people who would take a dedicated wire from

25
00:01:41,600 --> 00:01:47,560
the input and connect it to the dedicated wire to the phone that you were connecting to.

26
00:01:47,560 --> 00:01:49,600
So it was all manually connected.

27
00:01:49,600 --> 00:01:54,280
And the main point here is that the wire is dedicated for the phone conversation from the

28
00:01:54,280 --> 00:01:58,879
start to the end of the phone call.

29
00:01:58,879 --> 00:02:02,920
Now in eighties of course, we don't have roomful of switchboard operators.

30
00:02:02,920 --> 00:02:08,280
And these, instead we use automatic circuit switches that set up the circuit for us from

31
00:02:08,280 --> 00:02:12,640
one phone to our friend's phone at the other end.

32
00:02:12,640 --> 00:02:17,439
So it helps to think of a phone call having three phases.

33
00:02:17,439 --> 00:02:22,639
Once we pick up the handset and dial the number and dialing the number is saying, where do

34
00:02:22,639 --> 00:02:24,439
we want to be connected to?

35
00:02:24,439 --> 00:02:30,120
And this creates a dedicated circuit from one end to the other.

36
00:02:30,120 --> 00:02:33,840
So that dedicated circuit is going to go through all of the circuits along the way.

37
00:02:33,840 --> 00:02:38,960
And the system has told each of the circuits to connect an incoming wire to an outcoming

38
00:02:38,960 --> 00:02:43,719
wire or an incoming circuit to an outcoming circuit.

39
00:02:43,719 --> 00:02:48,439
So each switch is going to maintain the state to map that incoming circuit to the correct

40
00:02:48,439 --> 00:02:50,639
outgoing circuit.

41
00:02:50,639 --> 00:02:53,520
And then in the second phase, we talk.

42
00:02:53,520 --> 00:02:59,439
In a digital phone system like most phone systems are today, our voice is sampled and digitized

43
00:02:59,439 --> 00:03:01,479
at the first switch.

44
00:03:01,479 --> 00:03:07,919
And then it's sent over the dedicated circuit as a typically a 64 kilobit per second channel

45
00:03:07,919 --> 00:03:10,280
for voice.

46
00:03:10,280 --> 00:03:14,319
So our phone conversation has a dedicated circuit or channel all the way along the path and

47
00:03:14,319 --> 00:03:17,319
the circuit is not shared with anyone else.

48
00:03:17,319 --> 00:03:22,360
And then finally when we hang up, the circuit has to be removed and any state and the switches

49
00:03:22,360 --> 00:03:28,520
along the path has to be removed as well.

50
00:03:28,520 --> 00:03:36,000
So in practice between the switches, there are trunk lines which are really, really fast.

51
00:03:36,000 --> 00:03:38,879
In other words, they have a very high data rate.

52
00:03:38,879 --> 00:03:41,840
Even the slow ones are in at two and a half gig of it per second.

53
00:03:41,840 --> 00:03:47,199
And the fastest ones today run at 40 or even 100 gig of it per second.

54
00:03:47,199 --> 00:03:51,479
Sometimes you'll hear people call these big trunk lines big fat pipes because of the volume

55
00:03:51,479 --> 00:03:53,960
of data they can send.

56
00:03:53,960 --> 00:03:59,359
But actually, these big fat pipes are really tiny, skinny little optical fibers thinner than

57
00:03:59,359 --> 00:04:01,400
one over your hairs.

58
00:04:01,400 --> 00:04:06,599
Many thousands of phone calls can share that same trunk line between cities, each in its own

59
00:04:06,599 --> 00:04:09,560
dedicated circuit.

60
00:04:09,560 --> 00:04:14,840
The key thing here to remember is every phone call has its own dedicated 64 kilobit per

61
00:04:14,840 --> 00:04:20,800
second circuit that it doesn't have to share with anybody else.

62
00:04:20,800 --> 00:04:26,759
So in summary, we can think of circuit switching as having the following characteristics.

63
00:04:26,759 --> 00:04:31,480
Each call has its own private guaranteed isolated data rate from end to end.

64
00:04:32,200 --> 00:04:36,680
Second, call has three phases, establish, communicate and close.

65
00:04:36,680 --> 00:04:42,840
And third, originally a circuit was an end to end physical wire, but nowadays it's made

66
00:04:42,840 --> 00:04:44,240
up of a virtual private wire.

67
00:04:44,240 --> 00:04:49,879
It's going to share that wire with others, but it has its own dedicated circuit within

68
00:04:49,879 --> 00:04:50,879
that wire.

69
00:04:50,879 --> 00:04:54,280
There are a few problems with circuit switching.

70
00:04:54,280 --> 00:04:58,520
Clearly it's worked very well for the phone system, but when we're thinking about using

71
00:04:58,519 --> 00:05:04,159
circuits switching for the internet or any computer communications, there are a few

72
00:05:04,159 --> 00:05:06,680
shortcomings that we need to consider.

73
00:05:06,680 --> 00:05:10,719
So I'm going to go through three main problems.

74
00:05:10,719 --> 00:05:15,120
The first one is it's inefficient.

75
00:05:15,120 --> 00:05:18,680
When computers communicate, they tend to be very bursty.

76
00:05:18,680 --> 00:05:26,000
We tend to send data in bursts of maybe a few seconds, a few packets, maybe even a few

77
00:05:26,000 --> 00:05:28,439
minutes, depending on the application that we're running.

78
00:05:28,439 --> 00:05:35,160
For example, if I'm typing over an SSH connection, then I'm going to have characters that I'm

79
00:05:35,160 --> 00:05:39,160
going to send every now and again, sometimes a flurry of characters as I type a word, and

80
00:05:39,160 --> 00:05:41,680
then long periods of silence in between.

81
00:05:41,680 --> 00:05:45,720
Or if I'm reading a sequence of web pages, I might have a burst as I fill up one page,

82
00:05:45,720 --> 00:05:51,120
a burst as I fill up the figures to populate that page, and then a little period of pause

83
00:05:51,120 --> 00:05:53,120
while I read those web pages.

84
00:05:53,120 --> 00:05:54,959
So it tends to be very bursty.

85
00:05:55,680 --> 00:06:02,719
And of course, during those times of silence when I'm not doing anything, there's no activity,

86
00:06:02,719 --> 00:06:06,039
I've got this dedicated circuit which nobody else can use.

87
00:06:06,039 --> 00:06:07,199
So it's very inefficient.

88
00:06:07,199 --> 00:06:13,319
Very inefficient use of the capacity of the network as a whole.

89
00:06:13,319 --> 00:06:18,599
The second thing is computers tend to have very diverse applications that need very different

90
00:06:18,599 --> 00:06:20,519
rates.

91
00:06:20,519 --> 00:06:22,279
Committees communicate at many, many different rates.

92
00:06:22,279 --> 00:06:29,719
So a web server might be streaming video at say, one, five, or even six megabits per second.

93
00:06:29,719 --> 00:06:34,000
But if you compare that with me typing one character every second, there's a huge difference

94
00:06:34,000 --> 00:06:37,039
in the rates that the network needs to support.

95
00:06:37,039 --> 00:06:42,959
So if we pick a fixed rate circuit for the video, and then I use it for typing, it'll

96
00:06:42,959 --> 00:06:47,719
be barely used or vice versa, then I wouldn't even be able to stream the video.

97
00:06:47,719 --> 00:06:52,199
So a fixed rate circuit really isn't much use at all.

98
00:06:52,199 --> 00:06:56,399
The third one, the third problem with circuit switching is all of the state that we need

99
00:06:56,399 --> 00:06:57,399
to maintain.

100
00:06:57,399 --> 00:07:01,000
We need to maintain some state for every phone call that's going on.

101
00:07:01,000 --> 00:07:04,459
Every time we've established a call, we need to set up the circuit mapping from the

102
00:07:04,459 --> 00:07:08,399
ingress to the egress of every switch along the way.

103
00:07:08,399 --> 00:07:12,879
If a circuit fails or a switch fails or a link fails, we need to go in and change all of

104
00:07:12,879 --> 00:07:16,120
that state in order to reroute the calls.

105
00:07:16,120 --> 00:07:17,120
So we have to manage it.

106
00:07:17,120 --> 00:07:19,719
And then at the end, we need to remember to take the state out.

107
00:07:20,200 --> 00:07:24,920
If anything fails, then we may find that the state becomes inconsistent and then we have

108
00:07:24,920 --> 00:07:25,920
a problem.

109
00:07:25,920 --> 00:07:29,560
So state management in circuit switches is considered a problem.

110
00:07:29,560 --> 00:07:33,680
And if we had thousands or hundreds of thousands of communications going on at the same time,

111
00:07:33,680 --> 00:07:38,520
that's just a lot of work that has to be done.

112
00:07:38,520 --> 00:07:46,360
So let's take a look at the packet switching in contrast to circuit switching.

113
00:07:46,360 --> 00:07:49,120
So again, we're going to look at two end systems communicating.

114
00:07:49,120 --> 00:07:54,080
In this case, we're going to look at this laptop on the left A and it's going to be talking

115
00:07:54,080 --> 00:08:03,080
to the server on the right B. In practice, these of course could be anywhere in the internet.

116
00:08:03,080 --> 00:08:08,960
To impact the switching, there's no dedicated circuit to carry our data.

117
00:08:08,960 --> 00:08:13,960
Instead, we just send when we're ready, and anytime we want, we send a block of data by

118
00:08:13,960 --> 00:08:15,920
adding ahead to it.

119
00:08:15,920 --> 00:08:18,680
That's what we call the packet.

120
00:08:18,680 --> 00:08:22,480
And the header contains the address of where the packet is going, just like an envelope

121
00:08:22,480 --> 00:08:28,680
tells us the post office where to send the letter.

122
00:08:28,680 --> 00:08:36,800
Packet switch network consists of the end hosts, the links and packet switches.

123
00:08:36,800 --> 00:08:44,360
When we send a packet, it's routed one hopper to time from the source, in this case, the

124
00:08:44,360 --> 00:08:50,120
laptop A, all the way through to the destination B. If you look at the packet, it has the data

125
00:08:50,120 --> 00:08:55,919
in it and it also has the address B of where it's going to.

126
00:08:55,919 --> 00:08:58,919
We'll see later that packets are a little bit more complicated than this, but this is the

127
00:08:58,919 --> 00:09:01,279
bear information, the minimum information that it needs.

128
00:09:01,279 --> 00:09:10,480
The data we want to get to be, and then the address B of where it's going to.

129
00:09:10,480 --> 00:09:14,720
So when we send the packet, it's going to be routed hop by hop from the source to the

130
00:09:14,720 --> 00:09:16,360
destination.

131
00:09:16,360 --> 00:09:21,519
Each packet switch along the way is going to look up the address in a forwarding table.

132
00:09:21,519 --> 00:09:24,600
So it keeps the local forwarding table in all of the packet switches.

133
00:09:24,600 --> 00:09:31,680
And here I've got a forwarding table saying if we see the address B, then we're going to

134
00:09:31,680 --> 00:09:39,240
send it to on the next hop to S2, and this is S2 over here.

135
00:09:39,240 --> 00:09:44,919
So once this switch S1 sees this packet, it's going to look it up in its table and send

136
00:09:44,919 --> 00:09:48,960
it along to switch S2.

137
00:09:48,960 --> 00:09:50,759
And this is it going along its way.

138
00:09:50,759 --> 00:09:53,960
Switch S2 will have its own table, and of course that table is going to be different from

139
00:09:53,960 --> 00:09:58,120
S1's, because it's going to have a different set of next hops for each of the addresses that

140
00:09:58,120 --> 00:09:59,879
it sees.

141
00:09:59,879 --> 00:10:04,039
So then it's going to send it along its way this time to S4, and then eventually to the

142
00:10:04,039 --> 00:10:05,399
correct destination.

143
00:10:10,240 --> 00:10:16,279
So in the internet, there's lots of different types of packet switch.

144
00:10:16,279 --> 00:10:22,159
Some of them are called routers, because they deal with addresses that are internet addresses,

145
00:10:22,159 --> 00:10:28,120
and they may include little routers that we have in our desks at home, or huge routers

146
00:10:28,120 --> 00:10:30,879
that are in big wiring closets and big switching centers.

147
00:10:30,879 --> 00:10:32,600
But we call those routers.

148
00:10:32,600 --> 00:10:34,960
There are also things called ethernet switches, and we're going to look at the difference

149
00:10:34,960 --> 00:10:42,200
between different types of packets which in a later lecture.

150
00:10:42,200 --> 00:10:47,600
I showed you one packet, and of course at any instance there's going to be many packets

151
00:10:47,600 --> 00:10:51,200
flowing across the internet, millions and millions of packets flowing, and all sorts of

152
00:10:51,200 --> 00:10:52,200
different.

153
00:10:52,200 --> 00:10:58,320
And they're all being routed, hop by hop, one at a time, by the packets which is along

154
00:10:58,320 --> 00:10:59,320
the path.

155
00:10:59,320 --> 00:11:03,519
So there'll be many flows of communication going in all sorts of directions at the same

156
00:11:03,519 --> 00:11:04,519
time.

157
00:11:04,519 --> 00:11:08,799
So these packets which is how a lot of work to do, and remember, they're routing each packet

158
00:11:08,799 --> 00:11:16,519
one at a time by picking the next hop that it goes to and sending it on its way.

159
00:11:16,519 --> 00:11:20,840
We're going to take a quick look inside packet switches at some of their relevant features.

160
00:11:20,840 --> 00:11:25,199
So we already told you that packets which have a forwarding table to tell it where the

161
00:11:25,199 --> 00:11:27,079
packet goes next.

162
00:11:27,079 --> 00:11:29,240
They also have to have buffers.

163
00:11:29,240 --> 00:11:30,600
So packets which have buffers.

164
00:11:30,600 --> 00:11:32,759
And let me explain why that is.

165
00:11:32,759 --> 00:11:38,319
So in the middle here we've got a packet switch, and this packet switch is going to be receiving

166
00:11:38,319 --> 00:11:41,799
these two packets that I've got here and here.

167
00:11:41,799 --> 00:11:46,639
So we're going to look at what happens as these packets go through the packet switch.

168
00:11:46,639 --> 00:11:52,360
If they both arrive at the same time, and let's say they're arriving at the full line

169
00:11:52,360 --> 00:11:59,000
rate of the outgoing link, then the packet switch has to hold one of them while it sends

170
00:11:59,000 --> 00:12:00,000
the other.

171
00:12:00,000 --> 00:12:01,399
They're sending them both at the same time.

172
00:12:01,399 --> 00:12:04,399
So it's going to send one at a time.

173
00:12:04,399 --> 00:12:08,279
And because it might have many incoming links, the packets which has to have a buffer to

174
00:12:08,279 --> 00:12:10,120
hold, perhaps, many, many packets.

175
00:12:10,120 --> 00:12:17,279
And we're going to see that these packets, these buffers can be quite large in practice.

176
00:12:17,279 --> 00:12:21,519
So the buffers hold packets when two or more packets arrive at the same time.

177
00:12:21,519 --> 00:12:25,480
And particularly during periods of congestion, when there's lots and lots of packets coming

178
00:12:25,480 --> 00:12:29,879
in and all of these input links, all trying to get to the same output, it may actually

179
00:12:30,080 --> 00:12:39,799
have quite big buffers to hold packets during those times of congestion.

180
00:12:39,799 --> 00:12:45,480
So in summary, packets are routed individually by looking up the address in the router's

181
00:12:45,480 --> 00:12:47,720
local forwarding table.

182
00:12:47,720 --> 00:12:51,439
All packets share the full capacity of a link.

183
00:12:51,439 --> 00:12:55,440
And third, the routers maintain no per communication state.

184
00:12:55,440 --> 00:12:58,120
And this is really quite key.

185
00:12:58,120 --> 00:13:02,879
In a circuit switch, remember, we need to maintain state associated with every circuit along

186
00:13:02,879 --> 00:13:05,399
the every every circuit with maintaining.

187
00:13:05,399 --> 00:13:07,679
Here we know we maintain none.

188
00:13:07,679 --> 00:13:10,200
We just maintain the forwarding table.

189
00:13:10,200 --> 00:13:17,440
And then there's no per communication, no per packet or no per flow state associated with

190
00:13:17,440 --> 00:13:19,120
that communication.

191
00:13:19,120 --> 00:13:22,799
So why does the internet use packet switching?

192
00:13:22,799 --> 00:13:26,120
Probably pretty obvious by now, but I really wanted to spell that out.

193
00:13:26,120 --> 00:13:31,600
There were three original reasons, two that I've got listed here, the internet used

194
00:13:31,600 --> 00:13:33,360
packet switching.

195
00:13:33,360 --> 00:13:39,320
The first two are very obvious in common from what I've just described.

196
00:13:39,320 --> 00:13:45,200
The first one is packet switching allows us to use expensive links efficiently.

197
00:13:45,200 --> 00:13:47,360
So efficient use of expensive links.

198
00:13:47,360 --> 00:13:49,799
Links were assumed to be expensive and scarce.

199
00:13:49,799 --> 00:13:54,320
The first links that interconnected the packets which is across the backbone of the internet

200
00:13:54,320 --> 00:13:56,879
were running at a few kilobits per second.

201
00:13:56,879 --> 00:14:01,800
So they were expensive and everybody knew that they would become there would be a scarce

202
00:14:01,800 --> 00:14:04,040
resort resource.

203
00:14:04,040 --> 00:14:10,680
Packet switching allows many many bursty flows to share that same links very efficiently.

204
00:14:10,680 --> 00:14:14,640
Because at any one instant, the packet can use the entire link, but it can be immediately

205
00:14:14,640 --> 00:14:20,840
followed by another packet using the entire link belonging to a different communication.

206
00:14:20,840 --> 00:14:23,639
So it was a famous textbook by Patikas and Galakets.

207
00:14:23,639 --> 00:14:27,080
So it's a circuit switching is rarely used for data networks because of very inefficient

208
00:14:27,080 --> 00:14:29,480
use of the links.

209
00:14:29,480 --> 00:14:36,519
So the second big reason for using packet switching was it's widely felt that the packet

210
00:14:36,519 --> 00:14:41,320
switching allows for more resilient networks, networks that are resilient to the failure

211
00:14:41,320 --> 00:14:44,240
of links and routers.

212
00:14:44,240 --> 00:14:50,639
And the reason for this is that because each packet is individually routed along the path,

213
00:14:50,639 --> 00:14:57,120
if something happens, if something breaks, a link breaks or a router breaks, then we can

214
00:14:57,120 --> 00:15:03,039
because we have no state in all of the switches for this particular flow, we can simply send

215
00:15:03,039 --> 00:15:05,080
the packet on a different path.

216
00:15:05,080 --> 00:15:12,000
We can send it over a different link to a different router and it will find its way eventually.

217
00:15:12,000 --> 00:15:16,960
So for this reason, Tanembao and another famous textbook had said, for high reliability,

218
00:15:16,960 --> 00:15:19,120
the internet was to be a datagram subnet.

219
00:15:19,120 --> 00:15:24,639
So if some lines and routers were destroyed, messages could easily be rerouted.

220
00:15:24,639 --> 00:15:29,480
And the third big reason that the internet used packet switching was the internet was originally

221
00:15:29,480 --> 00:15:33,159
designed as an interconnection of existing networks.

222
00:15:33,159 --> 00:15:40,440
And at that time, pretty much all widely used communication networks, all computer networks

223
00:15:40,440 --> 00:15:41,759
were packet switched.

224
00:15:41,759 --> 00:15:46,600
And so if the internet was to interconnect all of those existing networks, then it too

225
00:15:46,600 --> 00:15:49,159
needed to be packet switched as well.

226
00:15:49,159 --> 00:15:52,840
Okay, this is the end of the first video about packet switching.

227
00:15:52,840 --> 00:15:58,040
By now, we should be able to answer these three questions very easily.

228
00:15:58,040 --> 00:16:02,639
In the next few videos, we're going to learn more about packet switching, some basic definitions,

229
00:16:02,639 --> 00:16:06,560
some ways to model packet switching, and some properties of packet switching that have been

230
00:16:06,560 --> 00:16:08,040
developed over the years.

231
00:16:08,040 --> 00:16:08,320
See you soon.

