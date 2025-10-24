---
title: CS144 NetworkP705 3NATs
---

1
00:00:00,000 --> 00:00:06,000
So, that's provided a really useful service. They allow you to share an IP address among many hosts,

2
00:00:06,000 --> 00:00:10,000
which is useful today given that IP addresses are becoming more scarce.

3
00:00:10,000 --> 00:00:16,000
They also can provide some other useful services such as a limited degree of security and firewalling.

4
00:00:16,000 --> 00:00:19,000
So, there are a lot of implications to what happens in your behind-and-out.

5
00:00:19,000 --> 00:00:24,000
So, this video is going to go into what some of those implications are and how some modern applications today

6
00:00:24,000 --> 00:00:26,000
try to deal with them when they're obstructions.

7
00:00:26,000 --> 00:00:31,000
So, the first application of an network address translator is that generally speaking,

8
00:00:31,000 --> 00:00:35,000
incoming connections, you can't have an incoming connection.

9
00:00:35,000 --> 00:00:38,000
So, we saw this back when we talked about Skype.

10
00:00:38,000 --> 00:00:43,000
What happens is when you want to open a call, somebody's behind-and-out, you can't directly open a TCP connection to them,

11
00:00:43,000 --> 00:00:47,000
because there's no mapping. So, let's walk through how that works.

12
00:00:47,000 --> 00:00:53,000
So, here we have an SSH server or we have a server sitting behind-and-out.

13
00:00:53,000 --> 00:00:56,000
Here's server A.

14
00:00:56,000 --> 00:01:01,000
And it has, it happens to be running a SSH server on import 22.

15
00:01:01,000 --> 00:01:06,000
And it has, you know, open a connection to this server S, it's browsing the web.

16
00:01:06,000 --> 00:01:09,000
You know, it does a web connection, this is great.

17
00:01:09,000 --> 00:01:20,000
So, now, what happens when host B wants to open a SSH connection to host A?

18
00:01:20,000 --> 00:01:24,000
Well, the problem is it's going to be sending a packet to this NAT.

19
00:01:24,000 --> 00:01:35,000
And whatever happens, somehow this packet needs to be translated to be going to 10.0.0.101 or 22.

20
00:01:35,000 --> 00:01:39,000
But there's no mapping for that. SSH is a server.

21
00:01:39,000 --> 00:01:43,000
It doesn't issue connection requests out. It receives connection requests.

22
00:01:43,000 --> 00:01:45,000
And so, the NAT has no mapping.

23
00:01:45,000 --> 00:01:50,000
And so, because there's no mapping to 10.0.0.101.22,

24
00:01:50,000 --> 00:01:54,000
B effectively can't open a SSH connection.

25
00:01:54,000 --> 00:02:02,000
Right? The NAT allows connections out. It does not allow connections in.

26
00:02:02,000 --> 00:02:05,000
And so, this poses all kinds of complications for applications.

27
00:02:05,000 --> 00:02:08,000
Where, you know, what happens if say I'm running Skype,

28
00:02:08,000 --> 00:02:11,000
and I would like to make a phone call. If the other nodes behind the NAT,

29
00:02:11,000 --> 00:02:13,000
I can't open a connection to that node.

30
00:02:13,000 --> 00:02:16,000
And so, it really restricts the kinds of services that you can deploy.

31
00:02:16,000 --> 00:02:20,000
And you have to jump through a bunch of hoops in order to make applications work

32
00:02:20,000 --> 00:02:24,000
when they're setting behind NATs.

33
00:02:24,000 --> 00:02:28,000
But so, this is the number one implication of setting behind a NAT to an application,

34
00:02:28,000 --> 00:02:32,000
which is that essentially if you're behind a NAT, generally speaking,

35
00:02:32,000 --> 00:02:36,000
other nodes unless you coordinate very carefully, and I'll show some ways you can do it,

36
00:02:36,000 --> 00:02:39,000
you can't open, nobody can open a connection to you.

37
00:02:39,000 --> 00:02:43,000
So, the first approach and talked about this briefly in the Skype lecture before

38
00:02:43,000 --> 00:02:47,000
is something called connection reversal. So, imagine that A is sitting behind a NAT,

39
00:02:47,000 --> 00:02:53,000
and B wants to open a connection to A.

40
00:02:53,000 --> 00:02:57,000
Well, B can't because the NAT has no mapping, these packs will bounce off.

41
00:02:57,000 --> 00:02:59,000
You know, bounce off, you get ICMP errors.

42
00:02:59,000 --> 00:03:03,000
And so, what you can do is have some kind of reversal services,

43
00:03:03,000 --> 00:03:08,000
some kind of rendezvous service, where both A and B are connected to the rendezvous service.

44
00:03:08,000 --> 00:03:14,000
And when B wants to open a connection to A, what it actually sends is it sends a request,

45
00:03:14,000 --> 00:03:22,000
hey, A, I want a connection.

46
00:03:22,000 --> 00:03:29,000
The rendezvous service can forward this request on, then A can open a connection to B.

47
00:03:29,000 --> 00:03:34,000
So, it's called connection reversal, because B wants to open a connection to A,

48
00:03:34,000 --> 00:03:38,000
but because it can't, because the NAT, so instead you reverse the connection,

49
00:03:38,000 --> 00:03:40,000
have A open a connection to B.

50
00:03:40,000 --> 00:03:44,000
And to do this, you need some kind of rendezvous service that two can communicate,

51
00:03:44,000 --> 00:03:49,000
but they both open outgoing connections. rendezvous service, and then requests are forward in that way.

52
00:03:49,000 --> 00:03:52,000
So, this is for example one of the things that Skype does.

53
00:03:52,000 --> 00:03:56,000
So, another approach, and there's also what Skype does, is if both hosts are behind a NAT,

54
00:03:56,000 --> 00:04:02,000
well, this means that neither of them can directly open a connection to the other.

55
00:04:02,000 --> 00:04:07,000
In both cases, the connection request will fail. There's no mapping on the NAT,

56
00:04:07,000 --> 00:04:09,000
generally speaking, and so it fails.

57
00:04:09,000 --> 00:04:21,000
So, instead, as you have both of them, connect to some relay R.

58
00:04:21,000 --> 00:04:25,000
And then the relay R, forwards traffic between those two connections.

59
00:04:25,000 --> 00:04:31,000
So, data that streams in from A's connection, R receives, then forwards to the connection to B,

60
00:04:31,000 --> 00:04:35,000
data that comes in from B's connection, R receives and forwards to A.

61
00:04:35,000 --> 00:04:38,000
But here's an example of suddenly this is no longer end to end.

62
00:04:38,000 --> 00:04:42,000
We now have introduced this additional host in the center, and who knows what could go wrong.

63
00:04:42,000 --> 00:04:46,000
So, certainly if you're doing this, it's good to encrypt your traffic,

64
00:04:46,000 --> 00:04:48,000
unless you trust the relay.

65
00:04:48,000 --> 00:04:52,000
But there's a way where if both hosts are behind a NAT, they can still open connections to one another.

66
00:04:52,000 --> 00:04:57,000
And, middlely, through a third host that is, it does have a publicly routed polypy address,

67
00:04:57,000 --> 00:05:00,000
and which is not sitting behind a NAT.

68
00:05:00,000 --> 00:05:05,000
So, that's some basic things that you can do, say, at the TCP level, and etc.

69
00:05:05,000 --> 00:05:08,000
It turns out that if you really need to open up direct connections,

70
00:05:08,000 --> 00:05:13,000
there are more aggressive and tricky things you can do,

71
00:05:13,000 --> 00:05:17,000
one of which is called NAT hole punching.

72
00:05:17,000 --> 00:05:22,000
And so, the basic idea here is that we have these two clients that are sitting behind NATs,

73
00:05:22,000 --> 00:05:26,000
client A and client B, and they want to open up direct connections to one another,

74
00:05:26,000 --> 00:05:28,000
or a direct connection between each other.

75
00:05:28,000 --> 00:05:32,000
They don't want to go through some external rendezvous service or relay.

76
00:05:32,000 --> 00:05:41,000
And so, what they do is they first talk with some external server to figure out what, you know, some citizen server here,

77
00:05:41,000 --> 00:05:44,000
to figure out what their external address and ports are.

78
00:05:44,000 --> 00:05:51,000
So, client B says, a half, I send you packets, say, from UDP port 6,000.

79
00:05:51,000 --> 00:05:55,000
The server will then report back to the mesh saying, aha, well, these packets you're sending,

80
00:05:55,000 --> 00:06:02,000
I see them coming from 76, 18, 117, 20 port, 90, 91.

81
00:06:02,000 --> 00:06:13,000
So, the client B knows that 10.1.1.9 port 6,000 appears externally to the world as 76, 18, 17, 20, 90, 91.

82
00:06:13,000 --> 00:06:16,000
And A does the same thing.

83
00:06:16,000 --> 00:06:28,000
So, it'll find out that, you know, its packets look like 34.22.8 port 30,000 and 5.

84
00:06:28,000 --> 00:06:40,000
So, now, in these cases, both clients A and B have sent packets over the NAT from this internal address port pair to this two and external IP address on port.

85
00:06:40,000 --> 00:06:48,000
And the NATs have created Mappings. So, they have Mappings internally for this internal address port.

86
00:06:48,000 --> 00:06:53,000
And let's just say that they're full-coned NATs, just for simplicity's sake.

87
00:06:53,000 --> 00:06:56,000
This means that these Mappings are now active on the NATs.

88
00:06:56,000 --> 00:07:05,000
So, it's possible now if communicating with a server, client B can ask the server, hey, what's client A's public IP address in port?

89
00:07:06,000 --> 00:07:13,000
Based on that, the server could say, oh, well, it's 128, 34, 22, 8 port 30,000 and 5.

90
00:07:13,000 --> 00:07:26,000
Ah, then client B could send traffic to that public IP address in port pair and it could diverse the NAT mapping.

91
00:07:27,000 --> 00:07:42,000
Similarly, A could ask the server, hey, what's B's, I public IP address in port pair, then send traffic to 76, 18, 17, 20, port 90, 91 and have it traverse the Mapping and go to client B.

92
00:07:42,000 --> 00:07:48,000
This is assuming that those Mappings are full-cones or full-coned NATs. Let's say that they're not full-coned NATs.

93
00:07:49,000 --> 00:07:59,000
Well, it turns out you can still do some tricks where the server can tell client A and client B again what the public IP address port pairs are of the other clients.

94
00:07:59,000 --> 00:08:03,000
And then the clients can try sending traffic to each other simultaneously.

95
00:08:03,000 --> 00:08:11,000
And so, client B will start sending traffic to 128, 34, 22, 8 port 30,000 and 5 from its port 6,000.

96
00:08:11,000 --> 00:08:20,000
So, simultaneously, client A will start sending traffic to 76, 18, 17, 20, port 90, 91 from its IP address and port.

97
00:08:20,000 --> 00:08:31,000
What's going to happen is that if we say had a restricted-coned NAT or even a port restricted NAT, when those packets, those outgoing packets traverse the NAT, the NAT's going to set up a Mapping.

98
00:08:31,000 --> 00:08:41,000
So, I'm going to say, aha, I see that you client A are sending traffic to this external IP address and port. I'll create a Mapping for you so things are translated properly.

99
00:08:41,000 --> 00:08:45,000
Similarly, this NAT on the right is going to do when client B sends the traffic.

100
00:08:45,000 --> 00:08:53,000
And so, by knowing what the external address and ports are of the other side, they can force the NAT to set up a Mapping.

101
00:08:53,000 --> 00:09:17,000
So, one question is, is there a kind of NAT or what kinds of NATs would this NAT work for? This model where client A and client B simultaneously send traffic to the external IP address and port that Mapp to an internal IP address and port on each of these clients, which are determined earlier by communicating with the server.

102
00:09:17,000 --> 00:09:25,000
So, giving me these different kinds of NATs, is there a kind of NAT for which this would not work?

103
00:09:25,000 --> 00:09:32,000
So, it turns out this will work for full-coned NATs because the Mappings will work fine even if the source, IGP, address and port are different.

104
00:09:32,000 --> 00:09:40,000
Work for restricted-coned NATs because again, we've set up these Mappings, which will include the external IP address of the other NAT.

105
00:09:40,000 --> 00:09:47,000
It will work for port restricted NATs because again, these packets are coming from the right UDP ports.

106
00:09:47,000 --> 00:09:59,000
The one class of NAT it won't work for is a symmetric NAT because when these clients talk to the server to figure out their IP address and port, their external ones, that Mapping won't hold when they start talking to another NAT.

107
00:09:59,000 --> 00:10:12,000
So, just because the server saw port 30,000 and five, when client A then tries to send traffic to the NAT on the right, the NAT is not going to reuse port 30,000 and five.

108
00:10:12,000 --> 00:10:15,000
It's going to allocate a new external port and so it won't work.

109
00:10:15,000 --> 00:10:19,000
So, this one reason why symmetric NATs are really frowned upon in the Internet today.

110
00:10:20,000 --> 00:10:30,000
So, talk about implications of NATs to applications and how they have to do things to set up Mappings or either these relays or rendezvous services.

111
00:10:30,000 --> 00:10:36,000
So, there's another, perhaps even deeper, implication of NATs, which is to transport.

112
00:10:36,000 --> 00:10:44,000
So, if you think for a second, for a NAT to set up a Mapping, it needs to know what the transport protocol is.

113
00:10:44,000 --> 00:10:51,000
It needs to know the transport protocol is header. So, for example, when it sets up a UDP or TCP Mapping, the NAT needs to know that this is a TCP segment.

114
00:10:51,000 --> 00:10:59,000
This is a UDP segment. This is where the port number is in that segment. This is what I need to rewrite. This checksums are calculated.

115
00:10:59,000 --> 00:11:11,000
And without that, it can't do it. So, if you deploy, if you say write a new transport protocol that uses a transport protocol identifier in an IP packet, and you try to get it to version that, and that will discard it.

116
00:11:11,000 --> 00:11:20,000
It doesn't know the packet format. And so, in this way, you can't really deploy a new transport protocol on the Internet today.

117
00:11:20,000 --> 00:11:30,000
There's a chicken and egg problem where the people developing NAT software and maintaining the NAT software will not add support for a new transport protocol until it's very, very popular.

118
00:11:30,000 --> 00:11:34,000
But it won't become very popular until it works across NATs.

119
00:11:35,000 --> 00:11:48,000
And so, there's this debate and philosophical discussion, and so the early mid-2000s about how NATs mean that we're basically stuck with TCP UDP and ICMP.

120
00:11:48,000 --> 00:11:55,000
To have an application work for real on the Internet at large, it has to use one of those three transport protocols.

121
00:11:55,000 --> 00:12:01,000
And so, really, when that's today, we're not going to see any new transport protocols on the Internet.

122
00:12:01,000 --> 00:12:06,000
And so, this leads to this really big philosophical debate, especially occurring as NAT deployed in the early 2000s.

123
00:12:06,000 --> 00:12:11,000
About on one hand, NATs are standingly useful. You can reuse addresses. They're security.

124
00:12:11,000 --> 00:12:23,000
If I'm sitting behind a NAT, and I happen to have some vulnerable open ports and my Linux machine or my Windows machine, since there's no mapping, attackers from outside on the Broad Internet can't compromise me.

125
00:12:24,000 --> 00:12:32,000
It sort of gives this very simple, very sledgehammering, but very effective just for users and users' security.

126
00:12:32,000 --> 00:12:41,000
Not opening connections can be good. But there's also tremendously painful, especially before NATs start to have standard behavior.

127
00:12:41,000 --> 00:12:50,000
Developing applications is really hard. Imagine if somebody calls you and says, hey, your application doesn't work. Sometimes the connection drops.

128
00:12:50,000 --> 00:13:03,000
And it could be something like it happens to be that when the client is transitioning from one server to another, and that NAT is using a symmetric NAT, such that the ports are being reallocated and the connection breaks.

129
00:13:03,000 --> 00:13:05,000
Really hard to debug.

130
00:13:05,000 --> 00:13:13,000
And so, one example, there's this really famous example, something called Speak Freely, which is this pre-sky voiceover IP.

131
00:13:13,000 --> 00:13:20,000
Basically, the guy said, hey, I'm going to stop developing Speak Freely because it just doesn't work under NATs, and there's no way to make them work with NATs.

132
00:13:20,000 --> 00:13:25,000
There's before people figure out all the hole punching and before the behavior is standard enough to do so.

133
00:13:25,000 --> 00:13:30,000
And so there's this huge philosophical debate. Now, it's good and that's bad. They break the end to end argument.

134
00:13:30,000 --> 00:13:37,000
But really, it's very interesting, but it turns to be pointless. I mean, NATs are here to stay. They're deployed. They'll always be deployed.

135
00:13:37,000 --> 00:13:46,000
Their advantages generally are considered to outweigh the disadvantages. People are in deployment, and they want them to work, and you have to work around them.

136
00:13:46,000 --> 00:13:58,000
But so what this means is that we historically talk about the internet as having a narrow waste that IP. There's a single unifying protocol, which then allows you to have many transfer protocols above, many linked protocols below.

137
00:13:58,000 --> 00:14:00,000
But NATs have changed that.

138
00:14:00,000 --> 00:14:07,000
So really, in a practical sense, the new hourglass includes not only layer three, but also layer four.

139
00:14:07,000 --> 00:14:13,000
Because for practical concerns, we're not going to see new transport protocols implemented or deployed.

140
00:14:13,000 --> 00:14:17,000
You can build protocols on top of UDP, and that's generally what's done today.

141
00:14:17,000 --> 00:14:27,000
GDP just provides a nice data-gram service rather than using a transport identifier at three at layer three. You use a port at layer four.

142
00:14:27,000 --> 00:14:37,000
But this is the world as it is that now the new hourglass of the internet, because of network address translation, is IP, then with ICMP, TCP, and UDP.

143
00:14:37,000 --> 00:14:44,000
So you can see how this technology actually just caused an architectural shift within the internet within the past decade.

