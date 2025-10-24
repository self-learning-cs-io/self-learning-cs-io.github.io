---
title: CS144 NetworkP825 11DHCP
---

1
00:00:00,000 --> 00:00:04,799
So in this video on Names and Adresses, I'm going to talk about the dynamic host configuration

2
00:00:04,799 --> 00:00:10,880
protocol or DHCP, something which you probably use every day when you access the internet.

3
00:00:10,880 --> 00:00:15,740
So if you take a step back and think about what do we need to communicate with IP with

4
00:00:15,740 --> 00:00:19,679
internet protocol, there are basically three things that a host needs.

5
00:00:19,679 --> 00:00:22,440
It needs first an IP address.

6
00:00:22,440 --> 00:00:26,920
It needs an address which you can give to other nodes to the Sun packets too, in which you

7
00:00:26,920 --> 00:00:30,680
can put its own packets that nodes know to send back to it.

8
00:00:30,680 --> 00:00:31,880
It needs a subnet mask.

9
00:00:31,880 --> 00:00:39,200
So it needs to know what nodes are on its own local subnet versus nodes it must contact

10
00:00:39,200 --> 00:00:42,400
through a local gateway.

11
00:00:42,400 --> 00:00:47,040
It also needs to know the gateway router, such that if a node is not on the local subnet,

12
00:00:47,040 --> 00:00:51,760
what's the IP address of the next hop or the first hop towards destinations outside the

13
00:00:51,760 --> 00:00:52,760
local subnet?

14
00:00:53,159 --> 00:00:57,239
So these are the three things that you have to have in order to communicate with IP on

15
00:00:57,239 --> 00:00:59,039
the internet as a whole.

16
00:00:59,039 --> 00:01:03,000
In addition, often it's very useful to have this fourth thing, which is the IP address

17
00:01:03,000 --> 00:01:07,719
of a domain name service server, or domain name system server.

18
00:01:07,719 --> 00:01:17,239
This is basically where which allows you to translate names like www.cnn.com into an IP address.

19
00:01:17,239 --> 00:01:22,000
And so you don't need this per se to communicate with IP if you just know the IP address,

20
00:01:22,000 --> 00:01:26,400
but it's very, very useful for most applications and for people.

21
00:01:26,400 --> 00:01:27,400
So there's this basic problem.

22
00:01:27,400 --> 00:01:31,400
You take you buy a new computer and you plug it into a network.

23
00:01:31,400 --> 00:01:34,319
You need these three things and hopefully this fourth one.

24
00:01:34,319 --> 00:01:35,840
How do you get them?

25
00:01:35,840 --> 00:01:39,840
How do you get these values?

26
00:01:39,840 --> 00:01:44,120
So in the old days, like actually when I was my first year in college, you'd get them

27
00:01:44,120 --> 00:01:45,640
from your system administrator.

28
00:01:45,640 --> 00:01:50,359
So you'd fill out a request for a network tap and then a couple days later you'd get a

29
00:01:50,359 --> 00:01:54,560
slip of paper, which had your important values.

30
00:01:54,560 --> 00:01:57,239
It had your IP address.

31
00:01:57,239 --> 00:02:00,959
It had your subnet mask.

32
00:02:00,959 --> 00:02:06,680
It had your gateway address.

33
00:02:06,680 --> 00:02:10,919
And it had the DNS server address.

34
00:02:10,919 --> 00:02:14,719
And so you get a slip of paper with these four things on it and a sheet of usually a photocopy

35
00:02:14,719 --> 00:02:20,120
saying, okay, take these values and here's how you open up your control panel and type

36
00:02:20,120 --> 00:02:21,840
them in here.

37
00:02:21,840 --> 00:02:24,439
And that was basically how you configure a machine.

38
00:02:24,439 --> 00:02:28,759
So this is how you did it around when I went there as a graduate in 1995.

39
00:02:28,759 --> 00:02:33,039
By the time I graduated though, they had moved on.

40
00:02:33,039 --> 00:02:38,520
So if you imagine on one hand this can work, but it has all kinds of problems.

41
00:02:38,520 --> 00:02:45,439
If your machine moves, like if I take my machine and move it to a friend's room, it no longer

42
00:02:45,439 --> 00:02:50,340
works because that particular machine was configured for that particular top in the

43
00:02:50,340 --> 00:02:51,340
networked apology.

44
00:02:51,340 --> 00:02:53,599
So this question is how long has last?

45
00:02:53,599 --> 00:03:00,159
So back then when you filled out the slip of paper last year, and in fact if you didn't

46
00:03:00,159 --> 00:03:02,680
request it by a certain point of the year, you couldn't get one.

47
00:03:02,680 --> 00:03:09,079
So these addresses and configurations are given on a yearly basis.

48
00:03:09,079 --> 00:03:12,879
When the final question is how do you collect unused entries?

49
00:03:12,879 --> 00:03:17,919
So if I only want a machine, you know, plug in my machine for three days, does this mean

50
00:03:17,919 --> 00:03:20,000
that I have to allocate an entry for an entire year?

51
00:03:20,000 --> 00:03:21,120
The answer was yes.

52
00:03:21,120 --> 00:03:24,479
And so while this works, it's remarkably inefficient.

53
00:03:24,479 --> 00:03:28,840
So the approach that computers used today, and this is what was Bronstard using by the

54
00:03:28,840 --> 00:03:33,199
time I graduated across the entire campus, it's something called DHCP, the Dynamic Host

55
00:03:33,199 --> 00:03:37,199
Configuration Protocol, specified in RFC 2131.

56
00:03:37,199 --> 00:03:41,039
Basically it is a machine when it connects to a network can request its configuration from

57
00:03:41,039 --> 00:03:43,719
a DHCP server.

58
00:03:43,719 --> 00:03:46,959
And if you can just request your configuration, say what's my IP address, what's my subnet

59
00:03:46,959 --> 00:03:52,560
mask, what's my gateway, what's my DNS server, this turns out to solve the three major problems

60
00:03:52,560 --> 00:03:53,799
outland.

61
00:03:53,799 --> 00:03:57,120
If you move, well you just do a re-request, you're in a different part of the network, you

62
00:03:57,120 --> 00:04:00,079
need a different configuration.

63
00:04:00,079 --> 00:04:01,959
For the duration, how long it lasts?

64
00:04:01,959 --> 00:04:07,439
Well when the DHCP server gives you a configuration, it's associated with a lease saying that configuration

65
00:04:07,439 --> 00:04:09,719
is this good for this long.

66
00:04:09,719 --> 00:04:14,400
And then if you're nearing the end of that lease, you can re-request this configuration,

67
00:04:14,400 --> 00:04:15,800
and usually the server will give it to you.

68
00:04:15,800 --> 00:04:18,160
There's a way to renew the lease.

69
00:04:18,160 --> 00:04:22,639
These leases then make garbage collection very easy, because if somebody doesn't re-request

70
00:04:22,639 --> 00:04:25,040
it, you can reclaim, say, that IP address.

71
00:04:25,040 --> 00:04:32,040
And so the basic interaction, the basic packet exchange that you see in DHCP is there's

72
00:04:32,040 --> 00:04:37,600
a basic four-step exchange, and then there's this optional release.

73
00:04:37,600 --> 00:04:41,680
So when I first joined the network, and it had no, nothing about what's going on, it sends

74
00:04:41,680 --> 00:04:42,960
out a discover message.

75
00:04:42,960 --> 00:04:46,960
I want to discover what DHCP servers are out there and what configurations they might

76
00:04:46,960 --> 00:04:48,480
give you.

77
00:04:48,480 --> 00:04:52,280
So the client sends a discover.

78
00:04:52,280 --> 00:04:58,320
Then the DNS, or the DHCP servers that can hear that discover, respond with an offer.

79
00:04:58,320 --> 00:05:00,120
So here are the servers.

80
00:05:00,120 --> 00:05:03,439
And more than one server can be connected and you might get more than one offer.

81
00:05:03,439 --> 00:05:06,840
And they'll say, here, I'm going to offer you this configuration.

82
00:05:06,839 --> 00:05:14,000
The client then selects one of the configurations and sends a request to the originating DHCP

83
00:05:14,000 --> 00:05:18,239
server saying, well, I'd like to request that configuration you offered me.

84
00:05:18,239 --> 00:05:23,799
And then the server sends an acknowledgement saying, I acknowledge you can have that configuration.

85
00:05:23,799 --> 00:05:27,919
This configuration is now valid for the duration of its lease.

86
00:05:27,919 --> 00:05:33,559
And a client can release it early if it wants to, or if the lease starts to reach the end,

87
00:05:33,559 --> 00:05:34,719
it does a re-request.

88
00:05:34,720 --> 00:05:42,160
So the request mechanism is both in response to an offer, but also a way to renew a lease.

89
00:05:42,160 --> 00:05:46,160
So let's walk through an example with a client and two servers.

90
00:05:46,160 --> 00:05:54,640
First up, a client connects the network and it sends a DHCP discover message as a broadcast.

91
00:05:54,640 --> 00:05:58,760
As a broadcast.

92
00:05:58,760 --> 00:06:03,080
Server and server B, both here, there's message that happen to be two DHCP servers that

93
00:06:03,079 --> 00:06:05,560
can hear the discover broadcast.

94
00:06:05,560 --> 00:06:08,839
And let's say both respond with offers for different configurations.

95
00:06:08,839 --> 00:06:15,360
Here's an offer, offer B, an offer A.

96
00:06:15,360 --> 00:06:19,639
The client seems to offer to decide that it wants offer B.

97
00:06:19,639 --> 00:06:24,759
And so it then sends a request to be saying, I would like to request the configuration that

98
00:06:24,759 --> 00:06:26,079
you offered me.

99
00:06:26,079 --> 00:06:29,319
So a B can then acknowledge and say, OK, you have it.

100
00:06:29,319 --> 00:06:31,360
Server A doesn't hear requests for the offer.

101
00:06:31,360 --> 00:06:34,720
And so at some point then, that offer will time out.

102
00:06:34,720 --> 00:06:36,240
Now client A is configured.

103
00:06:36,240 --> 00:06:37,480
It has an IP address.

104
00:06:37,480 --> 00:06:40,560
It has all it needs to communicate.

105
00:06:40,560 --> 00:06:51,000
If that the lease on this offer gets close to an end, it can re-request and say, receive

106
00:06:51,000 --> 00:06:52,000
an acknowledgement.

107
00:06:52,000 --> 00:06:55,240
And it'll do this well before the lease expires.

108
00:06:55,240 --> 00:06:57,360
So now the lease has been extended.

109
00:06:57,360 --> 00:07:01,120
And then it can also optionally send what's called a release and say, oh, actually, I'm

110
00:07:01,120 --> 00:07:02,120
going to send it with this.

111
00:07:02,120 --> 00:07:04,000
I'm practice clients often don't do this.

112
00:07:04,000 --> 00:07:05,360
They just let the lease expire.

113
00:07:05,360 --> 00:07:08,079
But sometimes you see in a control panel, you can say, release.

114
00:07:08,079 --> 00:07:10,759
And I'll show you this example on a Mac in a second.

115
00:07:10,759 --> 00:07:18,120
So here would be a basic DHCP sequence or exchange of messages.

116
00:07:18,120 --> 00:07:19,480
So I've said you send these messages.

117
00:07:19,480 --> 00:07:20,800
What do these messages look like?

118
00:07:20,800 --> 00:07:27,240
The issue here is you're trying to bootstrap IP or trying to get the beginning IP configuration

119
00:07:27,240 --> 00:07:30,120
before you have any IP information.

120
00:07:30,120 --> 00:07:37,000
And so the way it works is a client sends UDP packets to port 67.

121
00:07:37,000 --> 00:07:41,639
That's the DHCP port from port 68.

122
00:07:41,639 --> 00:07:42,639
And it sends these packets.

123
00:07:42,639 --> 00:07:44,560
It doesn't know the IP address of DHCP server.

124
00:07:44,560 --> 00:07:48,639
So it sends them to the broadcast IP address and also makes them come from the broadcast

125
00:07:48,639 --> 00:07:49,639
IP address.

126
00:07:49,639 --> 00:07:52,040
It doesn't have an IP address.

127
00:07:52,040 --> 00:07:56,680
I mean, cases where the DHCP server is not on the exact same link, you can have relays

128
00:07:56,680 --> 00:07:58,439
that will forward it across links.

129
00:07:58,439 --> 00:08:03,800
And most switches, et cetera, will actually just forward broadcast packets across all

130
00:08:03,800 --> 00:08:06,680
of their ports.

131
00:08:06,680 --> 00:08:11,160
And so the way you bootstrap this is to use the special IP address, communicate using UDP

132
00:08:11,160 --> 00:08:16,839
packets, then once a node has received its configuration, it now can bootstrap with its

133
00:08:16,839 --> 00:08:21,519
own IP address.

134
00:08:21,519 --> 00:08:24,159
And so this is then the message exchange that we see.

135
00:08:24,160 --> 00:08:28,760
So you start with my iMac issuing a DHCP discover.

136
00:08:28,760 --> 00:08:30,240
And it sends this.

137
00:08:30,240 --> 00:08:35,480
So here's my source Ethernet address, 0, 4, 54, 53, 10, 78, E4.

138
00:08:35,480 --> 00:08:37,440
And it sends it to the Ethernet broadcast address.

139
00:08:37,440 --> 00:08:42,560
So all ones, the source addresses 0.0.0, source IP address.

140
00:08:42,560 --> 00:08:47,200
The destination IP address is 255, 255, 255, 255.

141
00:08:47,200 --> 00:08:53,080
And you can see it's sending it from source port UDP port 868 to destination port 67.

142
00:08:53,080 --> 00:08:59,639
And you can go inside this message right this basically just to the basic DHCP discover

143
00:08:59,639 --> 00:09:01,240
message.

144
00:09:01,240 --> 00:09:05,520
Sends it once, doesn't hear anything, so it retries after a second, doesn't hear anything,

145
00:09:05,520 --> 00:09:07,920
so it retries after another two and a half seconds.

146
00:09:07,920 --> 00:09:09,920
Then it hears two offers.

147
00:09:09,920 --> 00:09:13,560
Which compels might be responsible to these two different discoveries.

148
00:09:13,560 --> 00:09:17,000
You can say the same transaction ID.

149
00:09:17,000 --> 00:09:26,000
So this first offer is sent from 1033.0.2 to IP address 1033.1.94.

150
00:09:26,000 --> 00:09:31,080
The second one is 1033.3.188.

151
00:09:31,080 --> 00:09:35,919
But if you look inside the Ethernet frame, these are being sent from some device.

152
00:09:35,919 --> 00:09:38,080
And they're being sent to my Ethernet address.

153
00:09:38,080 --> 00:09:42,840
So these are offers that are sent in response to my discovery.

154
00:09:42,840 --> 00:09:45,840
You can also tell by the transaction ID.

155
00:09:45,840 --> 00:09:50,259
And so this is destined to this IP address because my node knows that it doesn't have an

156
00:09:50,259 --> 00:09:54,560
IP address, this turns it be hard to infect the information.

157
00:09:54,560 --> 00:09:58,879
And so here here's the reply, the offer, and there's all this configuration information

158
00:09:58,879 --> 00:09:59,879
is basically sent here.

159
00:09:59,879 --> 00:10:06,879
I'm offering you an IP address of 1033.1.94, which maps up here at 10.33.1.94.

160
00:10:06,879 --> 00:10:13,320
And the same in the second one you'd see that it was offering for 1033.3.188.

161
00:10:13,320 --> 00:10:16,720
So you've got two different IP addresses, you know one.

162
00:10:16,720 --> 00:10:20,320
In terms of all kinds of options in this message, it's also going to tell me the subnet

163
00:10:20,320 --> 00:10:23,879
mask, 255.480.0.

164
00:10:23,879 --> 00:10:28,120
It's also going to tell me the router, 10.33.0.1.

165
00:10:28,120 --> 00:10:30,320
It's also going to tell me the domain name server.

166
00:10:30,320 --> 00:10:38,320
It's going to tell me that my domain name server is here are three servers that I can use, 171.64.75.121.99.

167
00:10:38,320 --> 00:10:39,840
It's also going to tell you the domain name.

168
00:10:39,840 --> 00:10:42,080
Oh, you're in stanthor.edu.

169
00:10:42,080 --> 00:10:43,560
And so that's what these offers contain.

170
00:10:43,560 --> 00:10:48,280
All this information you can use to configure my host when it starts up.

171
00:10:48,280 --> 00:10:56,639
Then in response to one of these offers, I send a, my device sends a DHCP request.

172
00:10:56,639 --> 00:11:00,759
And so now it's sending, again here's for my address, sending us a broadcast, a broadcast

173
00:11:00,759 --> 00:11:02,759
it's request.

174
00:11:02,759 --> 00:11:05,759
And if we look, which IP address did it choose?

175
00:11:05,759 --> 00:11:09,759
All right, so here's all this information, all these flags, options.

176
00:11:09,759 --> 00:11:11,919
So parameter request list.

177
00:11:11,919 --> 00:11:17,759
So I'm requesting a certain subnet mask router, a certain subnet mask, a certain router,

178
00:11:17,759 --> 00:11:20,759
domain name server, et cetera, et cetera.

179
00:11:20,759 --> 00:11:25,879
And so you can see here that my node ended up requesting the first offer.

180
00:11:25,879 --> 00:11:29,720
So 10.33.1.94.

181
00:11:29,720 --> 00:11:33,759
And it also ended up requesting a host name, Phillips.

182
00:11:33,759 --> 00:11:37,439
So it's saying, hey, I would like to respond to the request.

183
00:11:37,440 --> 00:11:42,920
I would like to request the offer that you made for 10.33.1.94.

184
00:11:42,920 --> 00:11:48,920
Then the DHCP server acknowledges that and all this.

185
00:11:48,920 --> 00:11:56,200
And so now if we open up my network control panel, we look, look at what my configuration

186
00:11:56,200 --> 00:11:57,200
is.

187
00:11:57,200 --> 00:11:58,600
That's in fact what we see.

188
00:11:58,600 --> 00:12:01,920
So my IP address is 10.33.1.94.

189
00:12:01,919 --> 00:12:05,360
My subnet mask is 255.255.248.0.

190
00:12:05,360 --> 00:12:08,079
My router is 10.33.0.1.

191
00:12:08,079 --> 00:12:12,879
And if we were to check, my host name would be Phillips iMac.stanford.edu.

