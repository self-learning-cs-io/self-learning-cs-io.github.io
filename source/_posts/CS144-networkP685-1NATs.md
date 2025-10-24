---
title: CS144 NetworkP685 1NATs
---

1
00:00:00,000 --> 00:00:04,560
So this video, we talk about the basics of network address translation and how an

2
00:00:04,560 --> 00:00:07,480
network address translator or not works.

3
00:00:07,480 --> 00:00:11,960
So if we go back to the end to end principle, there's this idea, the strong end to end

4
00:00:11,960 --> 00:00:16,879
argument that the network's job is to transmit data grams as efficiently and flexibly as

5
00:00:16,879 --> 00:00:18,320
possible.

6
00:00:18,320 --> 00:00:20,080
Everything else should be done at the fringes.

7
00:00:20,080 --> 00:00:27,039
So in this model, we'll have say two hosts that have IP addresses and really all the

8
00:00:27,039 --> 00:00:33,320
internet should do, all that the set of hosts and devices between these two nodes should

9
00:00:33,320 --> 00:00:38,479
do is forward and transmit their data grams.

10
00:00:38,479 --> 00:00:45,879
Should send it along some route through the internet, figure out the best route and deliver

11
00:00:45,879 --> 00:00:48,679
those packets between these two hosts.

12
00:00:48,679 --> 00:00:50,640
That's all the network should do.

13
00:00:50,640 --> 00:00:54,200
You want all the intelligence at the edges because that's where the action is, that's

14
00:00:54,200 --> 00:00:56,079
where you can add new things.

15
00:00:56,079 --> 00:01:00,239
And when you start adding stuff in the middle, then you start introducing dependencies and

16
00:01:00,239 --> 00:01:04,239
complexities and make the world generally a tougher place.

17
00:01:04,239 --> 00:01:11,599
So network address translator or not, I was first specified a while ago in RFC 1631.

18
00:01:11,599 --> 00:01:17,759
And so, that's a really interesting example, a really compelling example of how putting

19
00:01:17,759 --> 00:01:22,640
something, putting some smarts into the network can have some really, really nice benefits

20
00:01:22,640 --> 00:01:27,760
for in some ways, have some really attractive benefits, but also introducing that complexity

21
00:01:27,760 --> 00:01:29,560
can cause a lot of headaches.

22
00:01:29,560 --> 00:01:37,960
So essentially, what a network address translator does is it's some box that sits between you

23
00:01:37,960 --> 00:01:40,000
and the internet, like I say this host on the left.

24
00:01:40,000 --> 00:01:42,719
So here's our net.

25
00:01:42,719 --> 00:01:47,200
And this net has its own IP address for the public internet.

26
00:01:47,200 --> 00:01:51,799
Let's just call that IP address X.

27
00:01:51,799 --> 00:01:56,640
What happens is what a net does is that when a packet comes from your computer, what's

28
00:01:56,640 --> 00:02:03,679
called its internal address, or its internal interface, internal, what the net does, and

29
00:02:03,679 --> 00:02:06,280
that's going to somewhere out on the broader internet.

30
00:02:06,280 --> 00:02:11,759
So the net has an internal and an external interface.

31
00:02:11,759 --> 00:02:13,519
It's the net will rewrite your packet.

32
00:02:13,519 --> 00:02:18,159
So it appears like it is coming from the net's external interface.

33
00:02:18,159 --> 00:02:22,840
And so if the net, let's say it has internal interface I and external interface X, well

34
00:02:22,840 --> 00:02:29,800
your packet might be from 171, 64, 15.55, then that will rewrite it to be coming from IP

35
00:02:29,800 --> 00:02:31,319
address X.

36
00:02:31,319 --> 00:02:35,240
So then the packet goes to this other host.

37
00:02:35,240 --> 00:02:38,000
It sees a packet from X.

38
00:02:38,000 --> 00:02:40,719
Maybe it's a TCP connection request or something like that.

39
00:02:40,719 --> 00:02:44,400
And so it will send a packet back to X.

40
00:02:44,400 --> 00:02:46,640
So the destination is here is the sources X.

41
00:02:46,640 --> 00:02:49,159
Here is the destination is X.

42
00:02:49,159 --> 00:02:53,599
The net on receiving this packet will know that it was actually intended for you, will

43
00:02:53,599 --> 00:02:54,920
retranslate it.

44
00:02:54,920 --> 00:03:01,400
Rewrite the packet to destination X to be your destination and then forward it appropriately

45
00:03:01,400 --> 00:03:04,360
to its internal interface.

46
00:03:04,360 --> 00:03:08,680
So this turns out to have a bunch of really nice advantages.

47
00:03:08,680 --> 00:03:13,480
For example, almost all wireless routers today are basically all wireless home routers today.

48
00:03:13,479 --> 00:03:14,479
There are nats.

49
00:03:14,479 --> 00:03:19,319
The idea is that you connect your wireless router to your internet connection.

50
00:03:19,319 --> 00:03:23,959
The ISP gives you a single IP address, let's just call it X.

51
00:03:23,959 --> 00:03:30,120
Then internally the net can give many machines behind it different private IP addresses, just

52
00:03:30,120 --> 00:03:35,439
local IP addresses and translate all of them to a single public IP address.

53
00:03:35,439 --> 00:03:39,479
So it's a way for a whole bunch of nodes to share an IP address.

54
00:03:39,479 --> 00:03:42,479
And this is what it allows you to have say 10 machines in your house with a single IP

55
00:03:42,479 --> 00:03:43,479
address, it's a net.

56
00:03:43,479 --> 00:03:47,560
And the single publicly routable IP address, the Nats IP address.

57
00:03:47,560 --> 00:03:52,719
Some of this provides some security properties where because your IP addresses are hidden

58
00:03:52,719 --> 00:03:57,519
behind this net, it actually turns to be very hard for adversaries or attackers to start

59
00:03:57,519 --> 00:03:59,079
opening connections to your machine.

60
00:03:59,079 --> 00:04:02,239
So it's a limited kind of firewall security protection.

61
00:04:02,239 --> 00:04:04,359
So nats are really, really attractive and popular.

62
00:04:04,359 --> 00:04:09,759
They've got a bunch of great, give you a bunch of great advantages, a great piece of functionality.

63
00:04:10,639 --> 00:04:17,000
Now let me walk through a more concrete example with some IP addresses of exactly what's

64
00:04:17,000 --> 00:04:19,159
happening when you sit behind the Nats.

65
00:04:19,159 --> 00:04:22,519
We have these two hosts, A and B. And they're both behind Nats.

66
00:04:22,519 --> 00:04:25,159
And these Nats are on completely different networks.

67
00:04:25,159 --> 00:04:28,480
So one of them has this IP address, 128, 34, 228.

68
00:04:28,480 --> 00:04:31,959
So their Nats is 76, 18, 117, 20.

69
00:04:31,959 --> 00:04:35,399
So it says do people at home different ISPs?

70
00:04:35,399 --> 00:04:40,579
So the first thing to note is that the Nats are giving these hosts behind them, these private

71
00:04:40,579 --> 00:04:42,919
IP addresses starting with 10.

72
00:04:42,919 --> 00:04:46,159
So if you try to send a packet to 10 on the internet large, it doesn't go anywhere.

73
00:04:46,159 --> 00:04:48,679
It's considered a private local address.

74
00:04:48,679 --> 00:04:52,239
My good, in fact, you have one to one of your private local machines.

75
00:04:52,239 --> 00:04:54,399
So the Nats can share these IP addresses.

76
00:04:54,399 --> 00:04:59,279
In fact, it's possible for a machine behind that B or behind the Nats on the right and

77
00:04:59,279 --> 00:05:03,879
a machine behind the Nats on the left to have the same IP address.

78
00:05:03,879 --> 00:05:08,199
Because that IP address is only valid within their small domain.

79
00:05:08,199 --> 00:05:12,800
So what happens now when A wants to open a connection to, let's say, this SSH server out

80
00:05:12,800 --> 00:05:13,800
of the network.

81
00:05:13,800 --> 00:05:15,959
So it's trying to open a connection.

82
00:05:15,959 --> 00:05:20,959
Well, there's going to result in a TCP sin packet.

83
00:05:20,959 --> 00:05:28,519
Now when A sends the message, the source address is going to be 10.0.0.101.

84
00:05:28,519 --> 00:05:35,319
And the destination will be 18.181.0.31.

85
00:05:35,319 --> 00:05:39,959
The source port is going to be some port that A's decided on.

86
00:05:39,959 --> 00:05:43,439
Let's just say 5,000 for simplicity.

87
00:05:43,439 --> 00:05:47,159
The destination port is going to be 22.

88
00:05:47,159 --> 00:05:51,479
Now when this packet traverses the Nats, the Nats is going to translate the network address.

89
00:05:51,479 --> 00:05:53,000
It's going to rewrite the network address.

90
00:05:53,000 --> 00:05:58,479
It's that rather than coming from 10.0.0.101, the packet is going to be coming from 128.3

91
00:05:58,480 --> 00:06:01,800
to 34.22.8.

92
00:06:01,800 --> 00:06:03,080
The destination will remain the same.

93
00:06:03,080 --> 00:06:05,000
The destination port will remain the same.

94
00:06:05,000 --> 00:06:07,480
But it turns up the Nats also has to rewrite the source port.

95
00:06:07,480 --> 00:06:12,040
Because otherwise what happens if two hosts behind the Nats, both the sidest port 5,000,

96
00:06:12,040 --> 00:06:13,920
you can't share port 5,000.

97
00:06:13,920 --> 00:06:19,319
So it will rewrite the source port to be something like 8,035.

98
00:06:19,319 --> 00:06:22,040
This packet then goes out over the internet.

99
00:06:22,040 --> 00:06:28,280
Reaches the SSH server, which sees a request from 128.34.22.8 port 835.

100
00:06:28,279 --> 00:06:36,239
It will generate, say, a TCP Synac in response to this IP address in port.

101
00:06:36,239 --> 00:06:41,959
When the Nats sees that packet come back in, it's going to retranslate that 128.3.4.22.8.

102
00:06:41,959 --> 00:06:48,319
835 to 10.0.0.0.101, 5,000, and forward that packet today.

103
00:06:48,319 --> 00:06:57,079
So it sets up a mapping between this internal port IP pair and an external port IP pair.

104
00:06:57,079 --> 00:07:04,560
Similarly, when host B sends a packet to the SSH server, the Nats is going to translate

105
00:07:04,560 --> 00:07:07,319
its IP address in port to its own.

106
00:07:07,319 --> 00:07:09,159
So the B's IP address to its own.

107
00:07:09,159 --> 00:07:26,879
So what was once 10.1.1.9 port, let's say, 13,013, is going to become 76.18.117.20.

108
00:07:26,879 --> 00:07:30,959
Let's say port 2009.

109
00:07:30,959 --> 00:07:39,839
So then when the SSH server sends this TCP Synac back, it'll send it to this IP address

110
00:07:39,839 --> 00:07:46,120
port pair, which the Nats can translate back to the internal IP address port and pair,

111
00:07:46,120 --> 00:07:48,639
and deliver to node B.

112
00:07:48,639 --> 00:07:49,719
So how does this work?

113
00:07:49,719 --> 00:07:53,000
The Nats is magically setting up these mappings.

114
00:07:53,000 --> 00:07:55,639
How is it managing these mappings?

115
00:07:55,639 --> 00:07:59,000
Well, it turns out there's all kinds of different ways Nats can operate, and we'll look at that

116
00:07:59,000 --> 00:08:01,279
in some future videos.

117
00:08:01,279 --> 00:08:06,319
But the basic model is that the Nats doesn't create a mapping, generally, until it gets

118
00:08:06,319 --> 00:08:07,639
requests from inside.

119
00:08:07,639 --> 00:08:15,959
So here we have the Nats internal interface, and here we have its external interface.

120
00:08:15,959 --> 00:08:22,759
So generally speaking, when the Nats sees packets destined to the external, to nodes on the

121
00:08:22,759 --> 00:08:28,759
external interface, that is the internet at large, from nodes on its internal interface.

122
00:08:28,759 --> 00:08:32,080
In response to those packets, it might generate a mapping.

123
00:08:32,080 --> 00:08:38,399
So in this case, let's say A is trying to open a packet to server S, port 22, and so there's

124
00:08:38,399 --> 00:08:42,120
a packet coming in from 10.0.0.101.

125
00:08:42,120 --> 00:08:49,879
I mean, let's say it's a TCP packet, and this is port, again, let's say 5,000, and it's

126
00:08:49,879 --> 00:08:55,320
going to 18.181.0.31.22.

127
00:08:55,320 --> 00:09:02,480
Well, then that's going to say, look, I see a packet that is trying to open up a connection.

128
00:09:02,480 --> 00:09:10,279
What I need to do is allocate for this particular internal IP port pair, an external IP port pair.

129
00:09:10,279 --> 00:09:20,360
So let's say 128.34.22.8 port 7,09.

130
00:09:20,360 --> 00:09:23,480
So it's going to create a mapping.

131
00:09:23,480 --> 00:09:34,600
From this, 10.0.0.101.5,000 to 128.34.22.8, 7,09.

132
00:09:34,600 --> 00:09:37,759
And this for TCP and TCP only.

133
00:09:37,759 --> 00:09:39,759
So then the packet will traverse.

134
00:09:39,759 --> 00:09:41,720
It'll look up this mapping.

135
00:09:41,720 --> 00:09:46,720
It will translate the packet, send the packet with the external IP address port.

136
00:09:46,720 --> 00:09:50,159
Then when a packet comes back from the server, it's going to look up and say, aha, I received

137
00:09:50,159 --> 00:09:51,639
a packet on my external interface.

138
00:09:51,639 --> 00:09:57,480
I'm going to see if I have any mappings which match it based on the protocol IP address

139
00:09:57,480 --> 00:09:59,080
port.

140
00:09:59,080 --> 00:10:06,120
And then if so, translate the packet and rewrite it to the internal address and port.

141
00:10:06,120 --> 00:10:10,039
So that's at a high level, it's having in terms of all kinds of variations and all kinds

142
00:10:10,039 --> 00:10:11,919
of details which will go into future lectures.

143
00:10:11,919 --> 00:10:12,919
But that's the basic model.

144
00:10:12,919 --> 00:10:15,759
And that is maintaining some state so it can translate the packets.

145
00:10:15,759 --> 00:10:20,440
And generally speaking, it sets up this state in response to receiving a packet from a

146
00:10:20,440 --> 00:10:26,879
node on the internal interface, requesting or that's sending packets to a node outside.

147
00:10:26,879 --> 00:10:30,799
And so when you connect over wireless to your wireless router or home, this is what's

148
00:10:30,799 --> 00:10:31,799
happening.

149
00:10:31,799 --> 00:10:36,439
And you say, look up on your, using your network control panel and you see what your IP address

150
00:10:36,439 --> 00:10:41,759
is, you'll see it's almost certainly a local private address, either something in the

151
00:10:41,759 --> 00:10:46,539
10 range or 192.168.

152
00:10:46,539 --> 00:10:50,199
And then when you're sending packets out to say servers on the internet, then that is translating

153
00:10:50,199 --> 00:10:53,799
them to its own public IP address and port.

154
00:10:53,799 --> 00:10:57,439
And so for example, let's look at my, I'm not here in my office.

155
00:10:57,440 --> 00:11:04,240
So if I look at my IP address, so it turns out the wireless is EN1, that's the wireless

156
00:11:04,240 --> 00:11:10,720
interface, you can see in fact, I have a private IP address, 10.33.6.35.

157
00:11:10,720 --> 00:11:14,200
So this does not go out over the internet at large, there's a local private address within

158
00:11:14,200 --> 00:11:16,040
Stanford.

159
00:11:16,040 --> 00:11:20,560
And so that IP address can't be used, say, you know, the Google servers cannot send me

160
00:11:20,560 --> 00:11:23,000
a packet at that IP address.

161
00:11:23,000 --> 00:11:25,480
This means that I'm sitting behind a mat.

162
00:11:25,480 --> 00:11:32,240
In fact, if I type, you know, what's my IP into Google server, it tells me that my

163
00:11:32,240 --> 00:11:36,800
IP address is 171.66.168.122.

164
00:11:36,800 --> 00:11:45,759
And so what's happening here is that I have a private IP address of 10.33.6.35 on the

165
00:11:45,759 --> 00:11:49,720
internal interface of a network address translation box.

166
00:11:49,720 --> 00:11:54,399
And the external interface of the network address translator is 171.66.168.22.

167
00:11:54,399 --> 00:12:00,519
So when I issue a connection request to Google servers, this is the IP address they see.

168
00:12:00,519 --> 00:12:02,759
And they send packets to this back to this IP address.

169
00:12:02,759 --> 00:12:07,000
When the NAT receives those packets, it then translates them back to my own private

170
00:12:07,000 --> 00:12:12,159
local IP address forwards those packets that the connection is set up.

171
00:12:12,159 --> 00:12:13,159
So these are everywhere.

172
00:12:13,159 --> 00:12:14,799
And you should probably try this at home.

