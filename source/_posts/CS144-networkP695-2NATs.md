---
title: CS144 NetworkP695 2NATs
---

1
00:00:00,000 --> 00:00:06,000
So in this video, I'm going to go over all the different kinds of gnats, or not all of them, many of the different kinds of gnats that exist.

2
00:00:06,000 --> 00:00:13,000
So it seems like a very simple abstraction of translating addresses from an internal to an external interface.

3
00:00:13,000 --> 00:00:16,000
Well, it turns out there's all kinds of different ways you might implement that.

4
00:00:16,000 --> 00:00:25,000
And a lot of them are deployed out in the wild, and understanding these differences gives you a sense then of why gnats can be such a complicating factor when building applications.

5
00:00:25,000 --> 00:00:36,000
So recalls the model of a gnat is that, or generally the way it works, is that when there's some kind of communication from a node behind the gnat to an external node on the internet,

6
00:00:36,000 --> 00:00:53,000
the gnats sets up an internal mapping between the, a napping you internally did, and it's in its memory, between an internal IP address and associated port to an external IP address and port.

7
00:00:53,000 --> 00:01:17,000
And so when this server A tries to open a connection to the web server on S at 1818180131, so it's going to port 80 on this host, and it's coming from port 4512, the gnat rewrites that route, that say all of those packets, including TCP San, and then all the data packets, to be coming from its own IP address and port 6641.

8
00:01:17,000 --> 00:01:24,000
That's at the server sees, and then when the server sends messages back, the gnat translates them back to port 4512.

9
00:01:24,000 --> 00:01:33,000
So that's the simple model, and there are two basic questions that come up. First is, what packets doesn't not allow to traverse these mappings?

10
00:01:33,000 --> 00:01:41,000
The second is, how and when does a gnat assign these mappings? When does it create them? So I said when you generate packets, but turns out it can be a little more complicated than that.

11
00:01:41,000 --> 00:01:52,000
When does it tear down those mappings? It doesn't keep them mapping forever. So it turns out there's a nice RFC that sort of goes through some classifications in terminology I'm going to use in the rest of this video, 3489.

12
00:01:52,000 --> 00:01:59,000
So if we want to read a little bit more about some details, I'm going to precise weight these are laid out. Take a look at RFC 3489.

13
00:01:59,000 --> 00:02:07,000
So the first kind of gnat is what's called a full cone gnat, and this in some ways is the one that plays the nicest.

14
00:02:07,000 --> 00:02:17,000
And a full coneat is called that because it is the least restrictive in terms of what packets it allows to traverse a mapping.

15
00:02:17,000 --> 00:02:24,000
And that way it's a full cone and the things which are allowed in are large.

16
00:02:24,000 --> 00:02:43,000
And so the basic model of a full coneat is that any packet that say this is for the particular, say, particle TCP, any TCP packet that comes into the gnat to this IP address, port pair, will be translated to this IP address, this port pair.

17
00:02:43,000 --> 00:02:59,000
Regardless of what the source address and source port are, this is the least restrictive. So if I have some other server, say S2, that has some IP address A, and it's sending a packet from port A prime.

18
00:02:59,000 --> 00:03:22,000
And that packet with source port A prime is sent to 1283422.8 port 6641, the gnat will translate it. And my server, my host here, will see something coming from A prime arriving at port 10.0.0.01 port 4512.

19
00:03:22,000 --> 00:03:30,000
Now it might discard that packet, it might send an ICMP error, but the point is that not will do the translation. It's the least restrictive. It's a full cone.

20
00:03:30,000 --> 00:03:40,000
So in addition to full conenads, there are also restricted conenads. And what restricted conenads does is it filters based on the source IP address.

21
00:03:40,000 --> 00:03:51,000
So when restricted conenads, the gnat will translate packets that come from the same source address as intended on the external mapping.

22
00:03:51,000 --> 00:04:04,000
So when the gnat sets up the mapping between the internal address and port pair and the external address and port pair, it includes the address of the other endpoint.

23
00:04:05,000 --> 00:04:23,000
And so in this case, if I have S2, which tries to send a packet from A colon A prime address A, A prime, the gnat will not allow that packet to traverse. It will discard that it will either send an ICMP error or generally will not translate that packet and host A will never see it.

24
00:04:24,000 --> 00:04:42,000
However, if server S were to send a packet from IP address S, and then let's just say port, say port near 10,099, that will be able to traverse the mapping in the sense of it's coming from 18.1.0.01.31.

25
00:04:42,000 --> 00:04:54,000
And so host A will see a packet from 18.1.0.31.1099. And it will come in destined to 10.0.0.01.4512.

26
00:04:54,000 --> 00:04:59,000
So that's a restricted conenad. It will filter based on the IP address but not the port.

27
00:04:59,000 --> 00:05:08,000
So the last kind of a gnat or these three major classification is a port restricted net where it behaves like a restricted cone except it also filters on port.

28
00:05:08,000 --> 00:05:23,000
So in this case, when a packet comes in from some external host to 128, 34, 22, 8, 6641, the gnat is storing also what the expected IP address and port are.

29
00:05:23,000 --> 00:05:32,000
So in this case, if I again, I have some server S2 that tries to send something from A, A prime, the gnat will not translate that that's seen as an error in ICMP etc.

30
00:05:32,000 --> 00:05:37,000
No route to host whatever error it thinks is correct to specify, depending on the conditions.

31
00:05:37,000 --> 00:05:50,000
But similarly, if server S tries to send a message from port 10,099, that will not traverse either because it doesn't match the port in the mapping.

32
00:05:50,000 --> 00:06:01,000
So only packets from this IP address port pair 18181 031 port 80 will be allowed to translate to 10.0.0.0.1.4512.

33
00:06:01,000 --> 00:06:08,000
So only this particular pair can traverse the mapping.

34
00:06:08,000 --> 00:06:13,000
So the last and the final kind of gnat is something called a symmetric gnat.

35
00:06:13,000 --> 00:06:20,000
And what makes a symmetric gnat different is not only is that first of all, it's sort of by definition port restricted.

36
00:06:20,000 --> 00:06:36,000
But there's the fact that packets coming from the same source address and port internal to the gnat that are going to different destination addresses and ports are given different external address port mappings.

37
00:06:37,000 --> 00:06:39,000
So if you look at this figure, I'll see what I'm saying.

38
00:06:39,000 --> 00:06:47,000
So here, I have host A and it's sending packets from 10.0.0.1.1.4512.

39
00:06:47,000 --> 00:06:52,000
And first, it's sending them to 18181 031 port 3311.

40
00:06:52,000 --> 00:06:54,000
So the gnat sets up a mapping.

41
00:06:54,000 --> 00:07:05,000
And the mapping between this internal address port pair and this internal address port pair is 128342286641.

42
00:07:06,000 --> 00:07:17,000
And so packets that A sends to port 3311 on this IP address will be translated to have this IP address in this port.

43
00:07:17,000 --> 00:07:25,000
However, if A sends packets to a different external IP address and port, like let's say even the same port and IP address is differs in one bit.

44
00:07:25,000 --> 00:07:31,000
So it's also sending packets to S prime of 18181 032 port 3311.

45
00:07:31,000 --> 00:07:33,000
The gnat sets up a completely different mapping.

46
00:07:33,000 --> 00:07:48,000
So even though this port address pair is the same for both of these streams of packets, the fact that the destination port address pair is different means the gnat sets up a separate mapping.

47
00:07:48,000 --> 00:07:54,000
Sixth port 6641 and port 9821.

48
00:07:54,000 --> 00:08:16,000
So different destinations receive different mappings.

49
00:08:16,000 --> 00:08:22,000
So it turns out that, and this is just to give you one concrete example of ways in which gnats can really disrupt applications.

50
00:08:22,000 --> 00:08:27,000
So let's pretend that host A is sending UDP traffic.

51
00:08:27,000 --> 00:08:32,000
And this UDP traffic is for a massively multiplayer online game.

52
00:08:32,000 --> 00:08:33,000
So this is a true story.

53
00:08:33,000 --> 00:08:36,000
A friend of mine was working on the servers for this one that happened.

54
00:08:36,000 --> 00:08:41,000
It's back in the late 90s and he made an angry call at the Linux gnat developers.

55
00:08:41,000 --> 00:08:50,000
And so the issue is that this massively multiplayer game runs on many servers and there's times when somebody runs from one island to another and they need to change the server they're on.

56
00:08:50,000 --> 00:09:00,000
And so what the system would do is we would tell the client, oh, okay, hey, you've been talking to server 18181 031.

57
00:09:00,000 --> 00:09:06,000
You should start talking to a server S prime at 1818181 032 on this port.

58
00:09:06,000 --> 00:09:09,000
Even the same part doesn't matter.

59
00:09:09,000 --> 00:09:10,000
Like here, say port 3311.

60
00:09:10,000 --> 00:09:12,000
Both of them are going to talk port 3311.

61
00:09:12,000 --> 00:09:17,000
So hey, please start talking on this other to this other host.

62
00:09:17,000 --> 00:09:22,000
And the issue is that the gnat, this symmetric gnat, would create a new mapping.

63
00:09:22,000 --> 00:09:26,000
And so S was seeing the client covering important 6641.

64
00:09:26,000 --> 00:09:30,000
But now suddenly the client is covering from port 9821.

65
00:09:30,000 --> 00:09:38,000
And there was no way for the system back here to know that because the gnat just sets this up and it can arbitrarily decide so the connection breaks.

66
00:09:38,000 --> 00:09:45,000
So the observed behavior with that because there was a symmetric gnat that whenever someone would try to migrate from one server to another, they would disconnect.

67
00:09:45,000 --> 00:09:48,000
So here's an example of by adding this smarts into the network.

68
00:09:48,000 --> 00:09:55,000
Suddenly you're seeing a behavior different from the simple, you know, strong end to end argument.

69
00:09:55,000 --> 00:10:01,000
And there's this added behavior, which is really hard to manage and really hard to take into consideration.

70
00:10:01,000 --> 00:10:07,000
Because there's no way really for S prime to know the port 9821 is the port that is going to start communicating on.

71
00:10:07,000 --> 00:10:12,000
So there's just the most basic overview of some ways in which gnats can differ in their behavior.

72
00:10:12,000 --> 00:10:16,000
Turns out that there is many more complications, all kinds of different things gnats could do.

73
00:10:16,000 --> 00:10:23,000
And at that RFC I mentioned earlier, in fact goes through all the really diverse behaviors you saw when gnats first became popular.

74
00:10:23,000 --> 00:10:26,000
Before there is really standardization of what should happen.

75
00:10:26,000 --> 00:10:28,000
There's all kinds of things like static mapping.

76
00:10:28,000 --> 00:10:36,000
You can tell the gnat hey, just set up this static mapping between the external host IP port pair, my external IP address and port, then to an internal one.

77
00:10:36,000 --> 00:10:42,000
This is say if you have a web server behind your night, you can tell it, hey, anything that comes to port 84 to this server on port 80.

78
00:10:42,000 --> 00:10:44,000
You have things like triggers.

79
00:10:44,000 --> 00:10:48,000
If you see packets going out in one direction, then also set up this additional mapping.

80
00:10:48,000 --> 00:10:55,000
This is really useful in some of the early days of first person shooters online games where again they hadn't been built in gnats in mind.

81
00:10:55,000 --> 00:10:57,000
There's really diverse gnats behavior.

82
00:10:57,000 --> 00:11:00,000
There's all kinds of more complex things that happen.

83
00:11:00,000 --> 00:11:08,000
But so it turns out because of all the headaches and messes that gnats are creating applications, the IETF1 and came up with a bunch of recommendations to how gnats should behave.

84
00:11:08,000 --> 00:11:17,000
So the general behavioral recommendations specified in RFC 53.82 for TCP and 47.87 for UDP.

85
00:11:18,000 --> 00:11:41,000
So just to give you one example of some of the weird edge cases that a gnat can consider and some of the things that are specified here, I'm going to talk about hairpinning, which is this process of what happens when you have a node that's behind your gnat, and it sends a packet to one of the external interface port pairs that the gnat has, one of its mappings.

86
00:11:41,000 --> 00:11:48,000
So basically I have a node that's behind the gnat and is trying to traverse one of the gnats mappings.

87
00:11:48,000 --> 00:11:58,000
So here's the example. I have this gnat, 128, 34, 22.8, and I have host A and B that are behind the gnat, and they're both connected to a switch.

88
00:11:59,000 --> 00:12:04,000
So A has address 10, 0, 0, 1, 1, B has 10, 0, 0, 99.

89
00:12:04,000 --> 00:12:13,000
Now let's say we're doing some kind of IP telephony, which is coming from port, this is UDP traffic, so it's port 4512 on host A.

90
00:12:13,000 --> 00:12:20,000
So it's using port 4512, and this is translated to port 6641 on the gnat.

91
00:12:21,000 --> 00:12:32,000
So the question is what happens when B tries to send traffic to 128, 34, 22.8, port 6641?

92
00:12:32,000 --> 00:12:38,000
There's a question, so the gnat is going to arrive with a gnat, and the gnat is going to translate it.

93
00:12:38,000 --> 00:12:44,000
It's going to translate this, assuming that it is a full cone gnat.

94
00:12:44,000 --> 00:12:49,000
It's going to translate this to 10.0.101 port 4512.

95
00:12:50,000 --> 00:12:57,000
One question you can ask is that, well, it's going to translate the destination IP address in port.

96
00:12:57,000 --> 00:13:01,000
What should it do to the source IP address in port? Should it translate that as well?

97
00:13:01,000 --> 00:13:12,000
That is, should this packet arrive at A, seemingly coming from 128, 34, 22.8, or should this packet arrive at A, coming from 10.0.0.99?

98
00:13:13,000 --> 00:13:20,000
Well, so let's walk through what happens if the gnat doesn't translate the source IP address in port.

99
00:13:20,000 --> 00:13:29,000
So this packet will go through the switch, it'll go to the gnat, then that will rewrite it to be going to 10.0.101 to 4512.

100
00:13:29,000 --> 00:13:37,000
And so what A will see is a packet with source 10.0.0.99, let's just say port X doesn't really matter.

101
00:13:38,000 --> 00:13:44,000
I'm destination 10.0.0.101 port 4512.

102
00:13:44,000 --> 00:13:48,000
And let's say it likes this packet, it wants to respond, and it sends a response.

103
00:13:48,000 --> 00:13:51,000
That packet is never going to reach the gnat.

104
00:13:51,000 --> 00:13:55,000
It's going to possibly go directly through the switch.

105
00:13:55,000 --> 00:13:58,000
And because it doesn't go through the gnat, it's not going to be translated.

106
00:13:59,000 --> 00:14:12,000
So B is going to send a packet to 128, 34, 22.8, port 6641, and we'll see in response a packet from 10.0.0.101 to 4512.

107
00:14:12,000 --> 00:14:15,000
So this breaks. This is not what you want to do.

108
00:14:15,000 --> 00:14:20,000
Instead, when this packet goes up to the gnat, the gnat needs to translate it.

109
00:14:20,000 --> 00:14:44,000
So it comes in as a packet from, so source 10.0.0.99 port X destination 128 34 22.8 6641 needs to be rewritten to be source 128.34.22.8 with some port let's just call it X prime.

110
00:14:45,000 --> 00:14:51,000
Descination 10.0.0.101 port 4512.

111
00:14:51,000 --> 00:15:00,000
And by so doing then, because now the source is coming from the gnat, when A sends a response, it'll go back up the gnat, where the gnat can re-translate it, and forward it back to B.

112
00:15:00,000 --> 00:15:05,000
So it's called hairpinning through the model because you have to actually go back through this device, sort of like a hairpin.

113
00:15:05,000 --> 00:15:09,000
It comes back from telephony networks as the terminology.

114
00:15:09,000 --> 00:15:13,000
And so here's this example of a very specific behavior the gnat has to have.

115
00:15:13,000 --> 00:15:22,000
And if it doesn't, then this little edge case where B ends up sending a packet to A based on an external mapping, if you don't do this, it will break.

116
00:15:22,000 --> 00:15:29,000
So this is just one of the many tricky edge cases that gnat introduce, gnats introduce, and which are specified in these RFCs.

