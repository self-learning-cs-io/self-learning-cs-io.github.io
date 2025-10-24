---
title: CS144 NetworkP1007 6PhysicalandLink
---

1
00:00:00,000 --> 00:00:04,600
Now that we've learned about CSMA CD, I'm going to tell you about Ethernet.

2
00:00:04,600 --> 00:00:09,919
Ethernet started in the early 1970s, originally at around 10 megabits per second,

3
00:00:09,919 --> 00:00:15,359
but has evolved a long way since then. In this first place, CSMA CD was right at

4
00:00:15,359 --> 00:00:21,039
the heart of how Ethernet worked, and determined how many hosts would share a

5
00:00:21,039 --> 00:00:25,160
single cable. We'll see later that it became less important as the speed went up.

6
00:00:25,160 --> 00:00:29,640
The original Ethernet looked like this. These are two pictures that were drawn by

7
00:00:29,640 --> 00:00:35,759
Bob Metcalf, one of the co-inventors of Ethernet back in the early 70s. He was

8
00:00:35,759 --> 00:00:40,240
working at Xerox Park at the time. He later went on to found three-com. So on the

9
00:00:40,240 --> 00:00:43,719
left is showing the original topology that they had in mind of both wired and

10
00:00:43,719 --> 00:00:48,200
wireless Ethernet. And on the right shows the specifics of how the first Ethernet

11
00:00:48,200 --> 00:00:52,240
network was built. There was this big thick yellow cable. It was always yellow. It

12
00:00:52,240 --> 00:00:55,880
was very, very thick and inflexible and snaked around in the ceiling or in the

13
00:00:55,880 --> 00:01:00,640
walls or under the floor. And then these big taps would be screwed down into the

14
00:01:00,640 --> 00:01:05,240
cable to make an electrical contact for an interface and then a computer. It

15
00:01:05,240 --> 00:01:09,640
became much simpler over time, ending up with what we used today. This is the

16
00:01:09,640 --> 00:01:13,719
Ethernet frame format. This is the format of the frames that are put onto the

17
00:01:13,719 --> 00:01:19,920
link. The first bit is shown on the left hand side, and it starts with a

18
00:01:19,920 --> 00:01:25,120
preamble. The preamble is a sequence of ones and zeros just there to train the

19
00:01:25,120 --> 00:01:28,600
clock recovery circuits to help them get started and to have recovered the

20
00:01:28,600 --> 00:01:32,880
clock before the data actually starts to arrive. There's a starter frame delimiter

21
00:01:32,880 --> 00:01:36,880
which is a special symbol which tells us that the packet is just about to start

22
00:01:36,880 --> 00:01:42,040
and we then go into the destination address which we already know to be a

23
00:01:42,040 --> 00:01:47,159
48-bit address. This is a globally unique address assigned by the manufacturer

24
00:01:47,159 --> 00:01:53,120
of the interface. One bit tells us whether it's unicast or multicast and one

25
00:01:53,120 --> 00:01:57,240
bit can be used in fact to make it a locally defined address although that's

26
00:01:57,240 --> 00:02:03,880
actually very unusual. So there's 46 bits that are there to define the globally

27
00:02:03,880 --> 00:02:08,560
unique address. And so there's a very, very large number of Ethernet addresses to

28
00:02:08,560 --> 00:02:12,920
use. The source address is just the address of the local host that's sending

29
00:02:12,920 --> 00:02:17,640
the frame in the usual sense. The type indicates what we'll find inside the

30
00:02:17,639 --> 00:02:24,959
data. For example, the Ether type of hex 0800 is telling us that there's IP

31
00:02:24,959 --> 00:02:29,319
inside here which of course a very common case. You'll recall that there is a

32
00:02:29,319 --> 00:02:36,199
minimum size for any CSMACD based network, a minimum packet size. So we pad the

33
00:02:36,199 --> 00:02:39,959
packet if the data is very short. We pad it to make sure that there are a

34
00:02:39,959 --> 00:02:45,119
significant number of, there is sufficient number of bytes so that we can detect

35
00:02:45,120 --> 00:02:48,719
collisions reliably before we've finished sending the packet. So they pad it

36
00:02:48,719 --> 00:02:54,360
out to a minimum of 46 data bytes. So if the amount of data is over 46 then of

37
00:02:54,360 --> 00:02:58,719
course it won't pad it but otherwise it will pad it just to make sure that

38
00:02:58,719 --> 00:03:03,120
there's enough. And finally there's what's called a cyclic redundancy check, CRC

39
00:03:03,120 --> 00:03:08,080
or the frame check sequence. The CRC is checking the sequence using a code like

40
00:03:08,080 --> 00:03:13,319
we saw in the error detection videos that will tell us that whether or not there

41
00:03:13,319 --> 00:03:17,639
was an error in the bits. For example if the bits were corrupted on the wire or in

42
00:03:17,639 --> 00:03:23,439
the in the end host before it was processed. The original 10 megabits per second

43
00:03:23,439 --> 00:03:28,919
ethernet was standardized by IEEE and goes by the standard of IEEE

44
00:03:28,919 --> 00:03:35,280
802.3. You'll often hear ethernet being referred to as a .3 network for this

45
00:03:35,280 --> 00:03:40,280
reason just as an abbreviation of 802.3. And this was just the standard's body name

46
00:03:40,280 --> 00:03:45,319
that was used to write the spec that defined the correct operation of ethernet.

47
00:03:45,319 --> 00:03:49,639
So it has really two components. It has the MAC protocol and the frame structure

48
00:03:49,639 --> 00:03:54,680
that we've just seen. And then underneath you had a different options for the

49
00:03:54,680 --> 00:03:58,520
physical layer that could be used. There was originally the what's called the

50
00:03:58,520 --> 00:04:03,800
10 base 5 which was that big thick yellow cable that I described earlier and

51
00:04:03,800 --> 00:04:08,120
that went out of fashion quite a long time ago. Then that was replaced by a

52
00:04:08,120 --> 00:04:13,000
thin coaxial cable version that used the coaxial cable similar to the RF cables

53
00:04:13,000 --> 00:04:20,360
we use for TV. But what really really transformed ethernet was when it started to

54
00:04:20,360 --> 00:04:26,120
use this type of cable here. This is the RJ45 cable that we're all very familiar

55
00:04:26,120 --> 00:04:31,000
with. And that was not because of the connector. It was because of the type of cable

56
00:04:31,000 --> 00:04:34,759
that it can use and also the topology of the network. And we'll see that in a

57
00:04:34,759 --> 00:04:37,719
moment. But basically it started to run over voice grade,

58
00:04:37,719 --> 00:04:42,439
unshielded twisted pair that was already present in the walls of many buildings.

59
00:04:42,439 --> 00:04:47,719
It's called Category 3 telephone cable. It's fairly low grade cable that was used for

60
00:04:47,719 --> 00:04:53,719
connecting telephones to the exchange at a company. There's also an optical fiber

61
00:04:53,719 --> 00:04:58,039
version called 10 base F. It was originally used mostly by the military because

62
00:04:58,039 --> 00:05:03,959
they're harder to tap. There were two optical fibers and a single cable one for

63
00:05:04,199 --> 00:05:10,359
each direction. Ethernet really took off when the 10 base T standard came along for running

64
00:05:10,359 --> 00:05:15,639
ethernet over twisted pair. So 10 megabits per second was carried over the

65
00:05:15,639 --> 00:05:21,479
Category 3 twisted pair telephone wires that already existed in pretty much every building in

66
00:05:21,479 --> 00:05:27,719
the world. They were arranged in a star. In other words, those twisted pair cables would go to

67
00:05:27,719 --> 00:05:33,319
a wiring closet on their way to the telephone exchange. So not only did the

68
00:05:33,319 --> 00:05:38,920
twisted pair cable really help Ethernet be successful, but this topology of having an end host

69
00:05:38,920 --> 00:05:46,040
connected by twisted pair into a hub. And a hub was a repeater. It would take every signal coming in

70
00:05:46,040 --> 00:05:51,240
and then repeat it over every outgoing cable except for the one through which it entered.

71
00:05:51,800 --> 00:05:56,039
So it didn't actually understand the packets. It would merely repeat them electrically.

72
00:05:56,680 --> 00:06:00,920
If there was a collision, then the collision would take place anywhere within here. It would be

73
00:06:00,920 --> 00:06:05,560
detected and the hub would make sure that the voltage levels were sufficient to make sure that

74
00:06:05,560 --> 00:06:13,240
it could be detected. Also, this centralized management in this hub, this would be managed

75
00:06:14,360 --> 00:06:20,280
by the network administrator and this central management rather than the distributed management of

76
00:06:20,280 --> 00:06:27,160
crawling under the floorboards or up in the attic made it much easier to manage Ethernet once

77
00:06:27,160 --> 00:06:34,120
these hubs were placed in these central locations. So this led to a huge growth in Ethernet in the mid-1980s.

78
00:06:35,240 --> 00:06:40,200
Over the years, people wanted to make Ethernet faster and faster. So 10 megabits per second

79
00:06:40,200 --> 00:06:45,160
gradually was increased to 100 megabits per second and then gigabit per second and more recently

80
00:06:45,160 --> 00:06:49,400
10 gigabits per second. So a thousand times faster than the original Ethernet spec.

81
00:06:50,440 --> 00:06:56,920
One problem that we have to solve when increasing the size of Ethernet is if we're using CSMA CD,

82
00:06:57,000 --> 00:07:02,680
then we need to make sure that the that we keep this requirement that P over R is greater than or

83
00:07:02,680 --> 00:07:09,080
equal to 2L over C. In other words, the duration of a packet is longer than the round trip times so

84
00:07:09,080 --> 00:07:13,560
that we can make sure that we're still transmitting a packet when a collision is detected.

85
00:07:14,600 --> 00:07:21,000
So when we increase the speed of the network, when we increase R in order for this to be true,

86
00:07:21,079 --> 00:07:27,480
we either need to make P larger to counterbalance that increase in R or we need to make L smaller.

87
00:07:28,040 --> 00:07:33,959
And so this was a design choice when Ethernet was made faster. And the solution was to keep the

88
00:07:33,959 --> 00:07:40,600
packet size the same because if we'd made the packet size 10 times larger from 64 bytes,

89
00:07:40,600 --> 00:07:45,639
which was the original up to 640 bytes, then many of the packets that we'd like to send would be

90
00:07:45,639 --> 00:07:50,199
smaller than that, things like acknowledgments and DNS queries, things like that. And so it would

91
00:07:50,199 --> 00:07:56,279
be very inefficient. So the decision was to keep P the same, but to make L smaller.

92
00:07:57,959 --> 00:08:02,680
So 100 megabit per second Ethernet and gigabit per second Ethernet both have this

93
00:08:03,240 --> 00:08:08,919
both have this requirement that L is limited to 100 meters. This turn out to be much easier with

94
00:08:08,919 --> 00:08:14,599
the introduction of Ethernet switching as I'll describe in a few minutes. So as we made it faster and

95
00:08:14,600 --> 00:08:21,720
faster, the Ethernet Mac protocol stayed the same. That's the framing structure and the way in

96
00:08:21,720 --> 00:08:27,000
which we decide when to send packets under the wire. That stayed the same for a while.

97
00:08:28,200 --> 00:08:34,120
And 100 megabit per second Ethernet was called fast Ethernet. It doesn't seem so fast these days.

98
00:08:34,120 --> 00:08:40,600
And there were two standards for the physical layer, 100 base TX, which was the coding structure

99
00:08:40,600 --> 00:08:47,800
used for twisted pair cable and then 100 base FX for optical fiber. On the 100 base TX,

100
00:08:47,800 --> 00:08:53,960
it uses Category 5 cable again and the same RJ45 connector that we've seen. It actually started

101
00:08:53,960 --> 00:09:00,680
to be full duplex, meaning there were two pairs that were used rather than just one within the cable.

102
00:09:01,399 --> 00:09:05,000
One pair was used for 100 megabits per second signaling in each direction.

103
00:09:05,799 --> 00:09:12,039
Instead of using the Manchester encoding, it started to use 4B5B encoding, which we saw as they

104
00:09:12,039 --> 00:09:18,600
means to introduce transitions for clock recovery. We saw that in the video about clocks.

105
00:09:19,080 --> 00:09:22,440
And of course it was limited to a distance of 100 meters.

106
00:09:23,559 --> 00:09:31,799
Then later came along the one gigabit Ethernet standard. There was the 1000 base T and the 1000 base FX.

107
00:09:32,279 --> 00:09:41,000
That should be 1000 base T. The 1000 base T standard also runs over Category 5 cable using the RJ45

108
00:09:41,000 --> 00:09:47,079
connector. As many of the laptops and serves that are sold today, the Ethernet in them is 1 gigabit per

109
00:09:47,079 --> 00:09:55,319
second or 1000 base T. It turns out it's very hard to carry a 1 gigabit per second signal over a

110
00:09:55,320 --> 00:10:03,080
Category 5 cable. They actually use 4 pairs inside the cable. They carry signals in both directions

111
00:10:03,080 --> 00:10:09,160
at the same time over all 4 pairs. There's no room for anything else on this cable. It can only be

112
00:10:09,160 --> 00:10:14,840
used for the gigabit Ethernet. It uses a very complex coding, which is beyond the level of what we're

113
00:10:14,840 --> 00:10:21,800
going to be describing in this class. Instead of just using a binary on-off as it was used in the

114
00:10:21,799 --> 00:10:27,799
original 10 megabits per second Ethernet, it uses 5 different levels to try and pack as much

115
00:10:27,799 --> 00:10:35,240
signal as much information onto the cable as it can. And as before the distance is limited to 100 meters.

116
00:10:36,679 --> 00:10:45,079
By the late 1980s, 10 base T Ethernet was extremely popular. There was already work going on on 100

117
00:10:45,079 --> 00:10:49,319
megabit per second Ethernet and it was clear that the networks would get faster and faster.

118
00:10:49,800 --> 00:10:55,879
The hubs and the repeaters in the wiring closets meant that the network could be really quite large

119
00:10:55,879 --> 00:11:03,480
and were being deployed on a very large scale. But it was clear also that for faster and faster

120
00:11:03,480 --> 00:11:09,160
networks each of the segments was going to get very very short just down to 100 meters. So with a

121
00:11:09,160 --> 00:11:15,880
large number of hosts sharing a small network, the networks tended to be overwhelmed with the

122
00:11:15,879 --> 00:11:20,600
number of collisions that they would see because there were just so many hosts all trying to talk

123
00:11:20,600 --> 00:11:25,879
on the same network. And so it became natural to try and partition those Ethernet networks to reduce

124
00:11:25,879 --> 00:11:30,039
the number of collisions, what's often referred to as reducing the collision domain.

125
00:11:32,120 --> 00:11:36,759
At the same time, cost of switching hardware was coming down. It became easier to build

126
00:11:36,759 --> 00:11:43,240
ASICs or specialized chips for doing the switching. And so all of these things together led to

127
00:11:43,240 --> 00:11:50,759
partitioning networks using Ethernet switches. So with a hub or a repeater, every time a packet is sent,

128
00:11:50,759 --> 00:11:57,639
the whole medium of all of these five links would become busy and would be used up. So within this

129
00:11:57,639 --> 00:12:03,159
circle here, the entire capacity is say 10 megabits per second or 100 megabits per second depending

130
00:12:03,159 --> 00:12:09,320
on the on the rate. So with large networks, with say hundreds of end hosts all connected to a hub

131
00:12:09,400 --> 00:12:14,120
or a set of hubs, this would be very limiting in the total overall capacity that they had to use.

132
00:12:15,080 --> 00:12:20,680
What if we could allow several communications to take place at the same time? So for example,

133
00:12:20,680 --> 00:12:27,160
if A wants to talk to B at the same time that C is talking to D, because they're talking to

134
00:12:27,160 --> 00:12:32,120
different hosts, different sets of hosts, why don't we allow this by allowing the communications

135
00:12:32,120 --> 00:12:38,520
to take place independently? So instead of the hub repeating the signal just as an electrical

136
00:12:38,519 --> 00:12:43,240
signal, what if it was to actually interpret the packets, send the packets only to the correct

137
00:12:43,240 --> 00:12:49,079
destination just like a router does, but based on the Ethernet addresses rather than the IP addresses.

138
00:12:49,079 --> 00:12:54,039
So this is what was called a switch. Before being called Ethernet switches, they were called

139
00:12:54,039 --> 00:12:59,559
bridges. You will see those referred to sometimes, but we're just going to call them Ethernet switches.

140
00:13:00,679 --> 00:13:06,120
So the basic operation is if A is sending to B, the packet will flow down to the switch. The switch

141
00:13:06,120 --> 00:13:10,519
will look at the Ethernet address, decide where to send it next. If it has it in its table,

142
00:13:10,519 --> 00:13:15,159
then it will forward it to B, and at the same time, perhaps, C is sending a packet to D, and the same

143
00:13:15,159 --> 00:13:21,720
thing will be happening over here independently. So the collisions now are just held within a single

144
00:13:21,720 --> 00:13:26,200
cable. So if they happen to be signals going in both directions on the cable at the same time,

145
00:13:26,200 --> 00:13:30,600
that might cause a collision. Although at the same time, there was also introduced something

146
00:13:30,600 --> 00:13:36,600
called full duplex Ethernet, which was exploiting the fact that communications could take place on

147
00:13:36,600 --> 00:13:42,200
the cable in both directions without colliding with each other at the same time. And so now the switch

148
00:13:42,200 --> 00:13:48,040
could operate without the use of CSMACD completely once the switches were introduced and all of the

149
00:13:48,040 --> 00:13:56,440
links were full duplex. So this led to the very first Ethernet switches being developed in the

150
00:13:56,440 --> 00:14:02,920
early 1990s, and nearly all Ethernet networks today are based on Ethernet switches. It's very

151
00:14:02,920 --> 00:14:09,160
unusual to see an Ethernet hub these days. In fact, for one gigabit per second and 10 gigabits per

152
00:14:09,160 --> 00:14:14,680
second Ethernet, there's no choice. All those networks are switched. So the advantages are multiple

153
00:14:14,680 --> 00:14:20,840
concurrent communications. Full duplex links, they can send and receive at the same time. And also,

154
00:14:20,840 --> 00:14:26,200
there's a management benefit that if there are dead or faulty end hosts, they could be isolated

155
00:14:26,200 --> 00:14:31,720
by the switch. You could just switch off the link and then isolate it from the network completely

156
00:14:31,720 --> 00:14:41,879
to prevent it from harming any other switches in the network. So Ethernet switches have become

157
00:14:41,879 --> 00:14:48,520
the main way that Ethernet is put into deployment today is just a picture of an Ethernet switch at

158
00:14:48,520 --> 00:14:54,200
Stanford. This is the Ethernet switch over here with all these cables coming out going into patch

159
00:14:54,200 --> 00:15:00,600
panels here that go off to different offices in the in the building. So the way that an Ethernet

160
00:15:00,600 --> 00:15:06,759
switch works does it does some sort of very simple operations. First is first is that it does

161
00:15:06,759 --> 00:15:11,879
forwarding and learning. We've seen this before. It forwards packets based on its forwarding table

162
00:15:11,879 --> 00:15:18,360
and then it learns the contents of that forwarding table based on addresses that it's seen. So when a

163
00:15:18,360 --> 00:15:25,639
frame arrives, first of all examines the header of each arriving frame to check for the destination

164
00:15:25,639 --> 00:15:30,360
address. If the Ethernet destination address is in its forwarding table, it will forward the frame

165
00:15:30,360 --> 00:15:37,000
to the correct outgoing port or if it's multicast the set of ports. If the Ethernet destination address

166
00:15:37,000 --> 00:15:43,080
is not in its table, it will broadcast the frame to all ports of the switch except the one through

167
00:15:43,080 --> 00:15:50,280
which the frame arrived. And then entries in the table are learned by examining the Ethernet's

168
00:15:50,280 --> 00:15:55,400
source address of arriving packets. So it'll take the source address, look it up in the table if it

169
00:15:55,400 --> 00:16:00,520
finds that it's not there. It'll populate the table with that entry that says, okay, if ever I see

170
00:16:00,520 --> 00:16:05,879
this as a destination address, I now know how I reach it by sending it back out of the port that

171
00:16:05,879 --> 00:16:11,800
this address is connected to. So that way next time the frame won't be broadcast, it'll just be

172
00:16:11,799 --> 00:16:16,759
sent on to its correct destination. So that's the forwarding and learning function of an Ethernet

173
00:16:16,759 --> 00:16:22,439
switch. And then there's also the topology maintenance. It runs the spanning tree protocol where it

174
00:16:22,439 --> 00:16:28,519
exchanges those things called bridge protocol data units, the BPDUs that we saw in the spanning

175
00:16:28,519 --> 00:16:34,519
tree video. And it runs the spanning tree protocol to talk to the other switches to create a loop-free

176
00:16:35,399 --> 00:16:43,000
topology. So that allows it to decide which ports to enable or block to make sure that it creates

177
00:16:43,000 --> 00:16:48,759
a loop-free spanning tree amongst all of the switches in the network. As a consequence, Ethernet

178
00:16:48,759 --> 00:16:57,240
switches are very, very widely deployed in here's an example of how that might look in say a university

179
00:16:57,240 --> 00:17:03,319
campus. There's pretty much how our college networks looks at Stanford inside each building.

180
00:17:03,320 --> 00:17:09,400
So this might be a building or one floor of the building. This could be the third floor of my

181
00:17:09,400 --> 00:17:15,240
building and the gates building at Stanford. This could be the second floor. There's another switch

182
00:17:15,240 --> 00:17:22,039
for that floor. And then they connect into the building router. They would often be connected in

183
00:17:22,680 --> 00:17:29,400
to another router in another building for fault torrents in case the the building router was to fail.

184
00:17:30,280 --> 00:17:37,080
And this router might be running OSPF for routing packets around on our across our campus.

185
00:17:37,800 --> 00:17:44,680
So these routers form the campus backbone that spread all across our college campus.

186
00:17:45,560 --> 00:17:51,160
And then they would eventually connect to a BGP router that connects to the public internet.

187
00:17:51,160 --> 00:17:57,880
So this is speaking the BGP protocol to the outside world to exchange prefixes for paths to

188
00:17:57,880 --> 00:18:03,640
the outside world. So Ethernet switches can connect many, many hosts. Sometimes hundreds of hosts

189
00:18:03,640 --> 00:18:09,720
together. There are switches available with hundreds of ports that then connect perhaps all of the

190
00:18:09,720 --> 00:18:15,960
end hosts in the building or in the floor of the building. So in summary, medium access control

191
00:18:15,960 --> 00:18:22,040
protocols come in two main flavors. Random access and deterministic. Random access protocols proved

192
00:18:22,039 --> 00:18:26,839
very popular because they're nice and simple. They give transmitting hosts a nice quick load

193
00:18:26,839 --> 00:18:34,519
delay access to the network when it's being lightly used. And over the years, CSMACD became the most

194
00:18:34,519 --> 00:18:39,639
popular. It's a simple access protocol that was used in the first 10 megabit per second version

195
00:18:39,639 --> 00:18:44,599
of Ethernet. Over the years, Ethernet standards emerged for 100 megabits per second Ethernet.

196
00:18:44,599 --> 00:18:49,799
That's called fast Ethernet. And then gigabit per second Ethernet. And more recently, 10 gigabits per

197
00:18:49,799 --> 00:18:57,639
second. Limits on the link size and the need for more capacity meant that CSMACD was gradually

198
00:18:57,639 --> 00:19:04,359
replaced by Ethernet switching in which end hosts typically connect over a full duplex link.

199
00:19:04,359 --> 00:19:10,599
And so can both send and receive at the same time. And Ethernet switches do pretty much full routing

200
00:19:10,599 --> 00:19:15,960
like a router does, but on the Ethernet addresses, they learn the Ethernet addresses to populate their

201
00:19:15,960 --> 00:19:22,519
tables by learning the source address of packets that go by. And that way, they build up a nice,

202
00:19:22,519 --> 00:19:26,519
simple forwarding table. And then they use the spanning tree protocol to build a loop-free

203
00:19:26,519 --> 00:19:32,200
topology connecting all the switches within the network. So as a consequence, Ethernet switches

204
00:19:32,200 --> 00:19:38,120
are ubiquitous today and used in pretty much every organization that has a wired network.

