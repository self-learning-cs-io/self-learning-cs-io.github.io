---
title: CS144 NetworkP61 5Packetswitchingprinciple
---

1
00:00:00,000 --> 00:00:06,000
When the Internet was first designed, it was based on a controversial revolutionary idea, packet switching.

2
00:00:06,000 --> 00:00:12,000
Nowadays, it seems straightforward in the obvious way to build networks, but that wasn't always the case.

3
00:00:12,000 --> 00:00:18,000
It's a very simple idea, but of course, as it is with simple ideas, there are many interesting implications that arise once you put it into practice.

4
00:00:18,000 --> 00:00:26,000
We'll spend an entire week of the course on packet switching and its implications, but in this video, we present the high level idea and its immediate benefits.

5
00:00:26,000 --> 00:00:34,000
A packet is a self-contained unit of data that carries information necessary for it to reach its destination.

6
00:00:34,000 --> 00:00:41,000
Packet switching is the idea that we break our data up into discrete self-contained chunks of data.

7
00:00:41,000 --> 00:00:47,000
Each chunk, called a packet, carries sufficient information that a network can deliver the packet all the way to its destination.

8
00:00:47,000 --> 00:00:53,000
So let's say we have a source from a destination and a network of packets which is A, B and C between them.

9
00:00:53,000 --> 00:01:01,000
When A receives a packet for the destination, it sends it along the link to B. When B receives a packet for the destination, it sends along to C.

10
00:01:01,000 --> 00:01:06,000
And when C receives a packet for the destination, it sends it to the destination directly.

11
00:01:06,000 --> 00:01:11,000
In the simplest form of packet switching, each packet is routed separately and independently.

12
00:01:11,000 --> 00:01:15,000
For example, let's say there's another switch connected to B, called D.

13
00:01:15,000 --> 00:01:20,000
Immediately after sending a packet to C, B can send the next packet to D.

14
00:01:20,000 --> 00:01:27,000
Or if the next packet were also to the destination, it would send two packets back to back to C.

15
00:01:27,000 --> 00:01:30,000
Here's a simple definition of packet switching.

16
00:01:30,000 --> 00:01:35,000
Means that independently, for each arriving packet, we pick its outgoing link.

17
00:01:35,000 --> 00:01:41,000
If the link is free, we send it. Else we hold the packet for later.

18
00:01:41,000 --> 00:01:44,000
Here's one example of how packets switching can work.

19
00:01:44,000 --> 00:01:50,000
Each packet contains an explicit route, specifying the IDs of each packet which along the way to the destination.

20
00:01:50,000 --> 00:01:55,000
We call this self routing or source routing because the source specifies the route.

21
00:01:55,000 --> 00:02:02,000
When the source sends a packet, it puts in the packet A, B and C and then the destination.

22
00:02:02,000 --> 00:02:06,000
It forwards the packet to A, A looks inside the header and sees the next top as B.

23
00:02:06,000 --> 00:02:08,000
So it forwards the packet to B.

24
00:02:08,000 --> 00:02:13,000
B sends the next, sees the next top as C and sees the last top as the destination.

25
00:02:13,000 --> 00:02:20,000
Turns out the internet supports this source routing but it's generally turned off because it raises big security issues.

26
00:02:20,000 --> 00:02:27,000
One simple optimization and what the internet mostly does today is to place a small amount of state in each switch,

27
00:02:27,000 --> 00:02:30,000
which tells it which next top to send packets to.

28
00:02:30,000 --> 00:02:34,000
For example, a switch can have a table of destination addresses and the next top.

29
00:02:34,000 --> 00:02:40,000
When it receives a packet, it looks up the address in the table and sends the packet to the appropriate next top.

30
00:02:41,000 --> 00:02:46,000
In this model, all the packets, packet needs to carry is the destination address.

31
00:02:46,000 --> 00:02:49,000
Using the address, each switch along the way can make the right decision.

32
00:02:49,000 --> 00:02:55,000
For example, in our network here, A's table says the packet's destination should go to switch B.

33
00:02:55,000 --> 00:03:01,000
Switch B's table says packets to destination should go to switch C and so on.

34
00:03:01,000 --> 00:03:03,000
Packet switching has two really nice properties.

35
00:03:03,000 --> 00:03:07,000
The first is that a switch can make individual local decisions for each packet.

36
00:03:07,000 --> 00:03:12,000
It doesn't need to keep extra state on the packets that see whether two packets go to the same destination.

37
00:03:12,000 --> 00:03:17,000
Even if many packets are part of some larger transfer of a protocol, the switch doesn't need to know or care.

38
00:03:17,000 --> 00:03:23,000
The switch doesn't need to know that some packets are a Skype call, others are our web requests, and others still are a firmware update for your computer.

39
00:03:23,000 --> 00:03:25,000
It just forwards packets.

40
00:03:25,000 --> 00:03:28,000
This greatly simplifies the switch.

41
00:03:28,000 --> 00:03:33,000
The second is that it lets us switch efficiently share a link between many parties.

42
00:03:34,000 --> 00:03:39,000
For example, consider a wireless router in a home with two people browsing the internet in their laptops.

43
00:03:39,000 --> 00:03:44,000
If one person is reading a page, then the other person can download a file at the full speed of the link.

44
00:03:44,000 --> 00:03:48,000
If the first person starts loading a web page, the link can be shared between two of them.

45
00:03:48,000 --> 00:03:53,000
Once the download completes, the first person can use the full speed of the link.

46
00:03:53,000 --> 00:03:57,000
These two points are really important, so we'll go into some greater detail on both of them.

47
00:03:57,000 --> 00:04:02,000
Of course, when we communicate, we don't usually send only one packet. We send many.

48
00:04:02,000 --> 00:04:07,000
For example, a voice call consists of many consecutive packets, all part of the same communication.

49
00:04:07,000 --> 00:04:10,000
We call this sequence of packets a flow.

50
00:04:10,000 --> 00:04:18,000
More specifically, a flow is a collection of data grams belonging to the same end-to-end communication, for example a TCP connection.

51
00:04:21,000 --> 00:04:26,000
Let's first of all look at how each packet is routed independently.

52
00:04:27,000 --> 00:04:32,000
Because each packet is self-contained, a switch doesn't need to know about groups of packets or flows.

53
00:04:32,000 --> 00:04:40,000
Imagine if every switch had to keep track of every single web connection passing through it, this would require a huge amount of state that would be really hard to manage.

54
00:04:40,000 --> 00:04:46,000
Instead, treating each packet independently means the switch could be much simpler to build, manage, and troubleshoot.

55
00:04:46,000 --> 00:04:50,000
The switch doesn't need to worry about adding or removing with per-flow state.

56
00:04:51,000 --> 00:04:59,000
Imagine if every time you wanted a load of web page, you had to communicate with every switch along the path just to set up the state so that your request could get through.

57
00:04:59,000 --> 00:05:02,000
This could make things much, much slower.

58
00:05:02,000 --> 00:05:06,000
Instead, you can just send packets and the switches forward them appropriately.

59
00:05:07,000 --> 00:05:16,000
The switches also don't need to store this state, because switches have to be really fast, they need to store this state in very fast memory, which would be expensive.

60
00:05:17,000 --> 00:05:22,000
This lets switch switches focus on doing just one thing, forwarding packets quickly and efficiently.

61
00:05:24,000 --> 00:05:27,000
Finally, it means switches don't have to worry about failures.

62
00:05:27,000 --> 00:05:33,000
Imagine for example what happens when you start a web request, but then your tablet runs out of energy.

63
00:05:33,000 --> 00:05:41,000
The switch is going to keep the per-flow state for the request, but if one of the nodes that created the state fails, the switch needs to know how to clean up after it.

64
00:05:41,000 --> 00:05:46,000
Otherwise, you can have millions, billions, or however many of dead flows eating up your memory.

65
00:05:46,000 --> 00:05:49,000
With packet switching, a switch has no per endpoint state.

66
00:05:49,000 --> 00:05:54,000
If your tablet dies, the switch doesn't care. It just means that it stops receiving packets from it.

67
00:05:54,000 --> 00:05:59,000
In this way, the switch is more functionally independent of the computer sending traffic through it.

68
00:06:00,000 --> 00:06:04,000
Think about how you typically use the internet. Your use is bursty.

69
00:06:05,000 --> 00:06:10,000
You load a web page, then read it, then load another one. You download a few songs from iTunes, then listen to them.

70
00:06:10,000 --> 00:06:13,000
You stream a show from Netflix for 45 minutes, then stop.

71
00:06:13,000 --> 00:06:15,000
Data traffic is bursty.

72
00:06:15,000 --> 00:06:21,000
Rather than always sending and receiving data at a fixed rate, usage jumps and drops goes up and down over time.

73
00:06:22,000 --> 00:06:29,000
While there are large scale changes in peaks in data traffic, 3pm in the afternoon is typically high as is 8pm, while 2 in the morning is low.

74
00:06:30,000 --> 00:06:34,000
On a smaller scale is very bursty and these beasts bursts are often independent.

75
00:06:34,000 --> 00:06:37,000
Let's say you and your friend are broke browsing the web at a coffee shop.

76
00:06:37,000 --> 00:06:41,000
When you load a new page, when your friend loads a new page, are mostly independent.

77
00:06:41,000 --> 00:06:43,000
Sometimes you might overlap, but often they won't.

78
00:06:43,000 --> 00:06:50,000
By treating all of their traffic as just packets, the wireless router can very effectively and simply share its capacity between you.

79
00:06:50,000 --> 00:06:56,000
If you're loading a page when your friend is reading, the wireless router can give all of its capacity to your packets.

80
00:06:56,000 --> 00:07:01,000
Similarly, if your friend is loading a page and you're reading, the router can give all of its capacity to your friends packets.

81
00:07:01,000 --> 00:07:07,000
The link doesn't need to go partially idle because one of you isn't using it, and if you're both using it, then the link can be shared between you.

82
00:07:08,000 --> 00:07:16,000
This idea of taking a single resource and sharing it across multiple users in a probabilistic or statistical way is called statistical multiplexing.

83
00:07:16,000 --> 00:07:22,000
It's statistical and that each user receives a statistical share of the resource based on how others are using it.

84
00:07:22,000 --> 00:07:29,000
For example, if your friend is reading, you can use all of the link. If both of you are loading a page, you receive half of the link capacity.

85
00:07:29,000 --> 00:07:33,000
So there are two major benefits of packet switching.

86
00:07:33,000 --> 00:07:37,000
First, it makes this switch as simple because they don't need to know about flows of packets.

87
00:07:37,000 --> 00:07:43,000
And second, it lets us efficiently share the capacity among many flows sharing a link.

88
00:07:43,000 --> 00:07:51,000
This simple billing block was revolutionary at the time, but it's now accepted as the common way to build networks.

89
00:07:51,000 --> 00:07:56,000
So, this is the first time we've ever had a single resource.

90
00:07:56,000 --> 00:08:01,000
So, this is the first time we've ever had a single resource and shared it with all of you.

91
00:08:01,000 --> 00:08:06,000
This is the first time we've ever had a single resource and shared it with all of you.

92
00:08:06,000 --> 00:08:11,000
This is the first time we've ever had a single resource and shared it with all of you.

93
00:08:11,000 --> 00:08:16,000
This is the first time we've ever had a single resource and shared it with all of you.

