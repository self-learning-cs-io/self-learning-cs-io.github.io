---
title: CS144 NetworkP1379 3TomEdsallInterview
---

1
00:00:00,000 --> 00:00:07,080
So I'm here today with Tom Etzel, who I've known for a number of years. Tom has been involved

2
00:00:07,080 --> 00:00:13,080
in the design of switches and routers for a long time now. He was a master student at Stanford

3
00:00:13,080 --> 00:00:18,760
and after that has worked for a number of companies, most notably at Cisco, where he's arguably

4
00:00:18,760 --> 00:00:24,879
responsible for the design and deployment of more Ethernet switches and routers than anybody

5
00:00:24,879 --> 00:00:29,760
else on the planet. So he is extremely well qualified to talk to us today about the

6
00:00:29,760 --> 00:00:37,439
design of switches and routers. Hi Tom. So the first question I had for you, Tom, is

7
00:00:37,439 --> 00:00:45,439
so in CS144 we learn about Ethernet switches and IP routers and their basic functionality.

8
00:00:45,439 --> 00:00:49,280
Can you tell us a little bit about the history of routers and Ethernet switches when they

9
00:00:49,280 --> 00:00:54,920
were first built and sold and were they based on CPUs or specialized hardware?

10
00:00:55,079 --> 00:01:04,519
Okay. So I think the first Ethernet switch, or maybe not the first, but certainly the first

11
00:01:04,519 --> 00:01:10,040
very, very successful one was a product that we designed here in Cisco called the Catalyst 5000.

12
00:01:10,760 --> 00:01:18,120
And the Catalyst 5000 initially was a simple layer to switch a multi-port bridge, if you will.

13
00:01:19,079 --> 00:01:28,600
And it was based upon some custom silicon that we designed. And there was one ASIC, one application

14
00:01:28,600 --> 00:01:32,680
specific in a grain circuit, if you don't know what an ASIC is, one piece of custom silicon.

15
00:01:33,320 --> 00:01:41,480
And that was repeated for every report in the system. And we had a line card that was 12 ports,

16
00:01:41,480 --> 00:01:47,800
we had 12 of these ASICs on it. And then there were several of these line cards in a chat seat.

17
00:01:47,800 --> 00:01:53,320
And all of those devices were connected with a common bus across the back point.

18
00:01:54,280 --> 00:02:04,439
And that was built shortly after we came into Cisco in 1995.

19
00:02:05,239 --> 00:02:11,639
And we were immediately trying to figure out how to add layer 3 capability, how to add routing to

20
00:02:11,639 --> 00:02:18,680
that. Cisco meanwhile had a router, and we were a part of Cisco, it's a main part of Cisco

21
00:02:18,680 --> 00:02:26,439
had a router, but it was based on a microprocessor, it was a MIPS processor, all done in software.

22
00:02:27,400 --> 00:02:37,400
And we began to investigate what it would take to do routing in hardware. And the initial response

23
00:02:37,400 --> 00:02:44,680
was that it couldn't be done, and then talking people was like, yeah, but it's way too complicated,

24
00:02:44,680 --> 00:02:49,000
it would take too long to explain. And we couldn't quite understand what the problem was,

25
00:02:49,080 --> 00:02:56,680
kept on asking and asking and asking. And eventually we really came to a conclusion that it could

26
00:02:56,680 --> 00:03:02,520
be done, and it was just people hadn't thought about doing it in hardware. The initial product,

27
00:03:02,520 --> 00:03:12,439
what it was, it allowed the first packet of a flow to be bridged to a router blade in the system,

28
00:03:12,439 --> 00:03:20,359
a router on a line card in hardware. That router was running in software on the MIPS processor,

29
00:03:20,359 --> 00:03:26,919
it would route the packet as it always has. But when that packet, initial packet was sent to

30
00:03:26,919 --> 00:03:34,199
this software router, we learned in hardware, or passed in hardware, the flow information about

31
00:03:34,199 --> 00:03:40,759
that packet. And then when it returned from the software router, we compared the return flow

32
00:03:40,759 --> 00:03:45,799
with the one that went to the software router, and we could see what was different about the packets.

33
00:03:45,799 --> 00:03:51,159
And the thing that was different, of course, was it was a new layer to cater. So then we would

34
00:03:51,159 --> 00:03:57,000
remember that layer to cater. And then all subsequent packets, we would just do the rewrite

35
00:03:57,000 --> 00:04:01,959
layer to cater that we had learned from the software. So the hardware and software were actually

36
00:04:02,759 --> 00:04:07,959
almost completely independently, and the hardware was essentially cashing the layer three routes.

37
00:04:07,960 --> 00:04:15,320
So it was cashing still used today. So, Rosina?

38
00:04:17,960 --> 00:04:30,439
Yes, it's used in, it depends on the products. In general, we think about a fast path and a slow path.

39
00:04:31,079 --> 00:04:37,639
And you can think of as a fast path as a cache. Sometimes that cache may be done in hardware,

40
00:04:37,639 --> 00:04:44,759
sometimes it may be done in software. Quite often, the first packet will go to the slow path,

41
00:04:45,319 --> 00:04:54,519
or alternatively a packet that has a set of options, we go to this slow path and sort of the normal

42
00:04:54,519 --> 00:05:01,639
packet to go to a fast path. But the technique of cashing comes in goats over the years,

43
00:05:02,759 --> 00:05:10,199
and it sort of depends on the set of problems we're trying to solve and the constraints that we're

44
00:05:10,199 --> 00:05:17,000
solving goes under. So in class, we learn about the sort of the basic forwarding. So, you know,

45
00:05:17,000 --> 00:05:22,279
learning for layer two addresses and then forwarding or broadcasting if you don't know the address,

46
00:05:22,279 --> 00:05:25,879
and then for layer three, checking the version number,

47
00:05:25,879 --> 00:05:31,639
decromating the TTL, updating the checksum and forwarding to the correct egress. Presumably,

48
00:05:31,639 --> 00:05:35,719
Ethernet switches and routers have more features and functions than that, and they do other things.

49
00:05:36,759 --> 00:05:41,479
What are the main, you know, what would be the sort of the main ticket items that really

50
00:05:43,559 --> 00:05:47,639
make that box more complex or differentiate one box from another?

51
00:05:48,120 --> 00:05:57,719
So, the list of things that they do is a daunting list. That basic function that you just mentioned

52
00:05:58,439 --> 00:06:05,000
is essentially what we did in that very first hardware wrapper that we were cashing with the

53
00:06:05,000 --> 00:06:14,519
information. The things that we do is a lot of work done around security features.

54
00:06:15,079 --> 00:06:21,719
Sometimes it's just simple things like checking to be sure that you don't have

55
00:06:24,199 --> 00:06:31,959
zero offset fragments. Just simple security checks in addition to checking the version number.

56
00:06:35,000 --> 00:06:40,039
Of course, when you decromate a TTL, you have to make sure that you redirect the packet to

57
00:06:40,680 --> 00:06:51,720
to the local CPU if the TTL goes to a zero. You need to provide all sorts of protections

58
00:06:51,720 --> 00:06:58,759
of the internal CPU. You don't want to be susceptible to denial service attacks. So,

59
00:06:58,759 --> 00:07:03,879
there's all sorts of filtering and pasting that occurs on a packet, on the control plane packets,

60
00:07:03,879 --> 00:07:14,759
and go to the local CPU. There's, you know, not the cast. It's a complete nightmare to implement

61
00:07:14,759 --> 00:07:20,439
and has a hundred different features to make it work right. It's the most difficult thing that we do.

62
00:07:22,199 --> 00:07:27,560
There are a number of monitoring functions that have to occur in these switches. Probably the

63
00:07:27,560 --> 00:07:33,719
most basic and arguably the most useful is something we call a switch core analyzer, where we can

64
00:07:33,800 --> 00:07:39,800
mirror all of the traffic going to a particular port on some other port, or all the traffic coming in from

65
00:07:39,800 --> 00:07:46,760
a port to another port where we've been sent to some sort of analyzer. And then, of course, you

66
00:07:46,760 --> 00:07:53,080
want to have multiple of these analyzers running simultaneously. Then you want to have an analyzer

67
00:07:53,080 --> 00:07:58,120
on a remote switch that can monitor the traffic on the local switch. And so then you have to figure out

68
00:07:58,120 --> 00:08:04,280
how to tunnel that information across the network. You know, calling a service,

69
00:08:04,280 --> 00:08:11,480
active-cune management that the list goes on and on with these routers, switches, and routers.

70
00:08:11,480 --> 00:08:15,720
Yeah, so they're really complex beasts. And they, I guess they used in all sorts of different

71
00:08:15,720 --> 00:08:22,439
places as well. And they, in the home, the enterprise, wider networks, data centers, access networks,

72
00:08:22,439 --> 00:08:29,399
edge. Are they substantially different? Are the boxes, the systems, and the way that they're

73
00:08:29,399 --> 00:08:37,720
built substantially different for those different different contexts? Yes, they are. If you

74
00:08:39,320 --> 00:08:46,600
look at the router in your home, the feature set isn't particularly sophisticated. The bandwidths

75
00:08:46,600 --> 00:08:53,320
are low, extremely low. Of course, you know, quite often they have wireless built into them.

76
00:08:54,759 --> 00:09:02,840
And so you can, those are usually built to use things for merchant silicon and running an

77
00:09:02,840 --> 00:09:11,399
operating system there, perhaps based upon Linux. The bigger boxes, they come in either fixed form

78
00:09:11,399 --> 00:09:17,399
factors, meaning that the number of ports is fixed. You can't change out line cards. And then

79
00:09:17,399 --> 00:09:22,199
there's the big chassis, modular chassis where you have multiple line cards and multiple different

80
00:09:22,199 --> 00:09:31,319
kinds of thinner faces that can go in on each one of those line cards. And the autocontactors

81
00:09:31,319 --> 00:09:39,079
internally for the small switches, it's typically a switch on a chip. On the bigger systems, of course,

82
00:09:39,080 --> 00:09:45,400
that doesn't work. There's more ports than you can fit on a single chip or the entire system is

83
00:09:45,400 --> 00:09:51,879
spread across multiple line cards. And sometimes even multiple chassis and multiple racks of chassis.

84
00:09:52,600 --> 00:10:02,600
And those systems tend to be based on crossbars or some sort of centralized, relatively simple

85
00:10:02,600 --> 00:10:08,759
high performance switching element that switches the traffic between the line cards or between the

86
00:10:08,759 --> 00:10:18,519
port devices. The port devices themselves or line cards are generally, the cell can use there.

87
00:10:18,519 --> 00:10:25,720
It looks a lot like this single switch on a chip in that one device may support 48 ports of 10

88
00:10:25,720 --> 00:10:35,879
gigabit ethernet or 48 ports of 40 gigabit ethernet. And the emphasis in the data center will be

89
00:10:35,879 --> 00:10:44,840
on bandwidth and low cost. The emphasis on the campus will be not as much on bandwidth, but it's

90
00:10:44,840 --> 00:10:53,720
certainly based on cost and a number of access features around authentication and identification

91
00:10:53,720 --> 00:11:02,680
at the endpoints. In the when it's going to be a lot of emphasis around bandwidth and buffering

92
00:11:02,680 --> 00:11:09,000
and different kinds of interfaces as well as quality service becomes important factor. So yeah,

93
00:11:09,000 --> 00:11:15,240
they're all different different flavors. So over the years as these switches and routers have evolved

94
00:11:15,240 --> 00:11:20,600
and developed, what would have been the main advances in technology or architecture that have allowed

95
00:11:20,600 --> 00:11:27,720
them to scale? Have they been primarily coming from the underlying technology like Moore's Law,

96
00:11:27,720 --> 00:11:32,279
have there been specific technologies that have helped networking switches and routers or

97
00:11:32,279 --> 00:11:36,440
specific architectures? What's allowed them to keep up with the performance demands?

98
00:11:37,960 --> 00:11:44,680
Well, yeah, if we followed Moore's law strictly, probably the fastest link in the world would be 10

99
00:11:44,679 --> 00:11:50,279
gigabits. And of course, we're switching orders of magnitude and faster than that today. So

100
00:11:51,159 --> 00:11:58,519
networks have had to go through and network boxes have had to go through architectural changes to

101
00:11:58,519 --> 00:12:05,079
overcome the limitations of Moore's Law. So absolutely, we take advantage of Moore's Law as much as we

102
00:12:05,079 --> 00:12:11,719
can. But if I look at some of the switches that I've been involved in designing and bear in mind that

103
00:12:11,720 --> 00:12:21,960
these switches account for 60 to 70 percent of the entire switching market. So these are significant

104
00:12:21,960 --> 00:12:31,480
platforms. The original catalyst 5000 product line was based upon a bus. It was a common shared bus,

105
00:12:31,480 --> 00:12:37,720
the entire bandwidth of that switch was 1 gigabit per second. And it was an aggregation of 10

106
00:12:37,720 --> 00:12:44,360
gigabit links with some 100 gigabit links involved. But that bus quickly ran out of speed. It was

107
00:12:45,080 --> 00:12:50,920
the performance of the bus was based upon how fast you could signal on a single wire and how many

108
00:12:50,920 --> 00:12:57,160
of those wires you could put in parallel. And that was the limit of the entire chassis. The next

109
00:12:57,160 --> 00:13:04,440
generation of that platform, the catalyst 6000, which is still a, I think it still made me a billion

110
00:13:04,440 --> 00:13:15,080
dollar product for Cisco. It was delivered in 1998, I believe, in 1998 and 1999. It moved to a

111
00:13:15,080 --> 00:13:21,880
crossbar architecture. And the crossbar architecture allowed us to have much faster signaling on each

112
00:13:21,880 --> 00:13:28,520
wire and to have signaling between ports independent of one another. So it wasn't the base bus

113
00:13:28,520 --> 00:13:34,280
base architecture. However, that was not an arbitrary fabric. I know Nick, you've done a lot of

114
00:13:34,279 --> 00:13:40,600
work on arbitration and the importance of arbitration. But we actually, you know, most networks in

115
00:13:40,600 --> 00:13:47,959
the world and the 2010 actually did not have arbitration in them. It was basically, you set the

116
00:13:47,959 --> 00:13:53,559
packets into the crossbar and for the best luck that it's delivered to the other end of the problems.

117
00:13:54,519 --> 00:14:05,159
Much less expensive and much less complicated. In 2010, time frame, maybe 2008 time frame,

118
00:14:05,159 --> 00:14:10,599
we really started to feel the pressure on that crossbar and we added arbitration to it to

119
00:14:10,599 --> 00:14:18,519
improve the performance of that crossbar. And also allowed packets to be sprayed across the

120
00:14:18,519 --> 00:14:27,240
crossbars to get better performance. So we had to do packet reordering on the Egress side to

121
00:14:27,240 --> 00:14:35,159
guarantee packet order. So those are some of the architectural changes. We've moved from

122
00:14:35,159 --> 00:14:43,240
external memories to on-ship memories. You said embedded DRAM was popular for a while. Now we're

123
00:14:43,240 --> 00:14:49,720
moving more back to embedded static RAM. That's just following the technologies that are available to

124
00:14:49,720 --> 00:14:58,440
us from the silicon perspective. But generally packaging on, packaging on custom ASICS has not

125
00:14:58,440 --> 00:15:06,039
advanced nearly as much as the silicon itself. And so it's cheaper to build a bigger die than to have

126
00:15:06,039 --> 00:15:14,279
multiple smaller devices connected together. Great, thank you. So in class, we had one speaker that

127
00:15:14,279 --> 00:15:22,439
was talking about SDN software defined networking. And basic idea is that opening up more programmatic

128
00:15:22,439 --> 00:15:28,519
control to the switching sort of forwarding plane from either from the customer, the owner,

129
00:15:28,519 --> 00:15:35,159
operator, the network, or at least software that's under that control. So if this change or as

130
00:15:35,159 --> 00:15:40,519
this change happens, will switches need to change? How will they change do you think?

131
00:15:45,000 --> 00:15:54,759
You know, that's a big point of some debate. I ultimately don't think that the underlying hardware

132
00:15:54,759 --> 00:16:04,360
is going to change in ways that a lot of people think it might change. One part of what we hear

133
00:16:04,360 --> 00:16:14,919
about this SDN is around open flow. And open flow would indicate that maybe there should be some

134
00:16:14,919 --> 00:16:20,840
architectural changes to the underlying silicon. And I'm not convinced that that's going to be what

135
00:16:20,840 --> 00:16:27,240
happens. I think that the underlying silicon and the fields that it uses and how it's structured

136
00:16:28,600 --> 00:16:34,039
actually works quite well for us. And whether that's being controlled through a centralized

137
00:16:34,039 --> 00:16:42,439
controller or not, I think is completely orthogonal to whether you use open flow or open

138
00:16:42,439 --> 00:16:49,319
system. However, there is another thing that's happening, which is I would care for at least more

139
00:16:49,319 --> 00:16:55,799
than SDN as a virtualization of the network. And that virtualization is done through overlay

140
00:16:55,799 --> 00:17:04,519
technologies. There are a lot of different overlay technologies. The VXLAN is one in VGERI is

141
00:17:04,519 --> 00:17:12,839
another STT is one, Lisp is one, Fabric Path, the Trill, there's a proliferation of these

142
00:17:12,839 --> 00:17:19,639
technologies. I think the industry will settle on a small number of them. You know, I have my best,

143
00:17:19,640 --> 00:17:28,280
but we won't go into exactly what I'm betting on right now. But this overlay technology, I think,

144
00:17:28,280 --> 00:17:39,320
really does provide a fundamental value in the network and a switched built four years ago,

145
00:17:39,319 --> 00:17:47,319
probably can't do it or can't do it at scale or can't do it performance and performance and

146
00:17:49,399 --> 00:17:59,720
performance and scale. So I think new hardware will enable these overlay technologies and will

147
00:17:59,720 --> 00:18:05,480
continue to improve on what you can do with that overlay technology. Great, thank you. Would you

148
00:18:05,559 --> 00:18:13,559
want to call that SDN? Sure. One last question. So if students want to learn more about design of

149
00:18:13,559 --> 00:18:21,799
switches and routers, I mean, are there still lots of job opportunities? Is it still a growing and

150
00:18:21,799 --> 00:18:27,720
expanding field? We hear all sorts of talk of the hardware side of switching routers,

151
00:18:28,839 --> 00:18:34,680
becoming a sort of a smaller field. And we see everybody going off to work for Google and

152
00:18:34,680 --> 00:18:41,320
Facebook. Is it still an exciting and growing field to be working in?

153
00:18:46,200 --> 00:18:54,279
It's an interesting question. I've been doing this since 1985. So it's been quite a long time.

154
00:18:55,000 --> 00:19:05,879
And there have been periods of great excitement. We first came up with the switching technology

155
00:19:05,879 --> 00:19:13,240
in the industry, was happening in the internet, was starting to become a big deal and networks came

156
00:19:13,240 --> 00:19:21,240
into their own. That was a very exciting period of time. I would say that there was a period where

157
00:19:21,240 --> 00:19:26,200
there wasn't a lot happening. That it was, yes, we're going to build a faster switch. We're going to

158
00:19:26,200 --> 00:19:37,480
add a couple of knobs here and there. And that was sort of the 2000 to 2010 time period. I think we

159
00:19:37,480 --> 00:19:47,720
are experiencing a bit of a revolution now. A lot of it actually has, I think that the catalyst

160
00:19:47,720 --> 00:19:53,319
for it has been some of the work that you have done. And with the OpenFlow and this whole idea

161
00:19:53,319 --> 00:20:03,720
of SDN networks, and let's do some virtualization. And it's not that that technology came from one

162
00:20:03,720 --> 00:20:11,400
source necessarily, but was sort of being thought about and baking in a lot of the labs. And now it

163
00:20:11,400 --> 00:20:22,360
is really burst onto the scene. And it really has been actually challenging for me and

164
00:20:23,400 --> 00:20:34,360
very interesting doing the internet switch design again. And that technology will mature and

165
00:20:34,360 --> 00:20:40,120
it will slow down and presumably something else will come along after that. Is it a growing industry?

166
00:20:40,919 --> 00:20:50,679
There are fewer and fewer companies developing their own hardware. There is Cisco of course, does it.

167
00:20:52,919 --> 00:20:58,679
Juniper develops some of their own hardware. It's very difficult for a startup to get the

168
00:20:58,679 --> 00:21:04,519
funding to develop new hardware so they tend to use merchant silicon. And so if you are looking to

169
00:21:04,519 --> 00:21:14,039
design switch hardware, I think there are fewer opportunities in that space. However, I do think

170
00:21:14,680 --> 00:21:20,839
there are some pretty interesting things to do in that area. And in my own case, I was lucky enough

171
00:21:20,839 --> 00:21:27,319
to be in a startup and currently am in a startup that does do hardware development of switches.

172
00:21:27,319 --> 00:21:36,439
And I've got a list of so long of things that I want to do and I can't do all of them.

173
00:21:36,439 --> 00:21:42,519
And I'm sure other people have a list of ideas and pretty cool things that can be done in those

174
00:21:42,519 --> 00:21:51,639
switches in the hardware. So it's not that all of the great ideas that have been thought of. It's not

175
00:21:51,640 --> 00:22:00,520
that bad, but it's not as it was in the late 90s. And if you have some internship opportunities come

176
00:22:00,520 --> 00:22:08,280
out, send me some details and I'll forward them to the class. I absolutely would love to hire

177
00:22:08,280 --> 00:22:16,280
interns. I would bring on many interns. Okay, wonderful. Let's chat about that. So thanks

178
00:22:16,279 --> 00:22:21,240
so much Tom. Really appreciate it. This is really interesting. Provided the kind of insight that we

179
00:22:21,240 --> 00:22:25,720
that we can't get in the classroom or from textbooks normally. So it's extremely useful. Thank you.

180
00:22:26,680 --> 00:22:28,680
Okay, thank you.

