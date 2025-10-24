---
title: CS144 NetworkP916 7Routing
---

1
00:00:00,000 --> 00:00:06,000
Continuing on a theme of routing, in this lecture I'm going to be telling you about something called the spanning tree protocol.

2
00:00:06,000 --> 00:00:10,000
The spanning tree protocol is actually used for Ethernet switches.

3
00:00:10,000 --> 00:00:15,000
We normally think of routing as operating at the IP or the network layer.

4
00:00:15,000 --> 00:00:23,000
But anything that any situation where we want to send packets along a particular path that we choose carefully, we can think of that as routing.

5
00:00:23,000 --> 00:00:30,000
Ethernet switches need to decide how to route or forward packets to the correct set of destinations as well.

6
00:00:30,000 --> 00:00:33,000
That's what we're looking at in this video.

7
00:00:33,000 --> 00:00:37,000
We're going to continue with this theme of routing.

8
00:00:37,000 --> 00:00:47,000
I'm going to describe something that at first point seemed like routing because we normally use the term routing to refer to the network layer and IP addressing.

9
00:00:47,000 --> 00:00:55,000
But routing really means any mechanism for delivering packets in a mindful way from a source to a destination.

10
00:00:55,000 --> 00:00:58,000
So in that sense, Ethernet routes packets too.

11
00:00:58,000 --> 00:01:00,000
It's forwarding packets from a source to a destination.

12
00:01:00,000 --> 00:01:04,000
It just happens to be doing this based on the Ethernet address.

13
00:01:04,000 --> 00:01:09,000
So in this video, I'm going to be talking about how Ethernet forwards packets.

14
00:01:09,000 --> 00:01:12,000
So we know how addresses are learned in Ethernet.

15
00:01:13,000 --> 00:01:17,000
But how does it prevent loops from happening?

16
00:01:17,000 --> 00:01:27,000
We know that it will learn the address and until it's learnt the address and knows the correct direction to send a packet, it will flood to everyone.

17
00:01:27,000 --> 00:01:36,000
How do we make sure that those flooded messages, those broadcast messages, are not looping in the network forever after all there's no TTL field in Ethernet?

18
00:01:37,000 --> 00:01:43,000
So Ethernet does this by building a spanning tree over which packets are forwarded.

19
00:01:43,000 --> 00:01:50,000
I'm going to see that specifically in a moment, this works in quite a different way from what we've seen so far.

20
00:01:50,000 --> 00:02:00,000
Because instead of building a spanning tree per destination or per router, in Ethernet we're going to build a single spanning tree for the entire network.

21
00:02:00,000 --> 00:02:07,000
In other words, it's going to constrain the overall topology to only use those ports belonging to a single spanning tree.

22
00:02:07,000 --> 00:02:12,000
So just recall briefly how an Ethernet switch forwards packets.

23
00:02:12,000 --> 00:02:16,000
First of all, it examines the header of each arriving Ethernet frame.

24
00:02:16,000 --> 00:02:25,000
If it finds that the Ethernet destination address is in its forwarding table, it's going to forward the frame to the correct outgoing port.

25
00:02:25,000 --> 00:02:32,000
If the Ethernet destination address is not found in the table, it's going to broadcast the frame to all outgoing ports.

26
00:02:32,000 --> 00:02:36,000
Because it doesn't know which one to send it to, it's just going to send it to everyone.

27
00:02:36,000 --> 00:02:44,000
And now that we've learned about flooding, we can see why it would do that, because we can be sure that it will reach its eventual destination.

28
00:02:44,000 --> 00:02:51,000
And then it learns entries in the table are learned by examining the Ethernet source address of arriving packets.

29
00:02:51,000 --> 00:02:58,000
In other words, when it looks at the source address, it will learn that in order to reach that particular source address,

30
00:02:58,000 --> 00:03:04,000
it sends packets out through the port through which that packet arrived.

31
00:03:04,000 --> 00:03:08,000
So that must be on the direction between towards the source.

32
00:03:08,000 --> 00:03:14,000
But this all presupposes that packets don't loop in the network forever, and that in fact,

33
00:03:14,000 --> 00:03:26,000
the particularly in the learning process, that the Ethernet source address actually is on the shortest path or on a reasonable path back towards that address.

34
00:03:26,000 --> 00:03:30,000
So how does it know that?

35
00:03:30,000 --> 00:03:34,000
And in fact, the whole learning process could lead to loops.

36
00:03:34,000 --> 00:03:38,000
So let's see an example of what might happen.

37
00:03:38,000 --> 00:03:45,000
If we have a network with, let's say that this is a source, and this is a destination.

38
00:03:45,000 --> 00:03:54,000
And in between we have a sequence of switches, something like this, that are all connected, like this.

39
00:03:54,000 --> 00:04:00,000
So B is directly connected here, and then A is connected to a switch here.

40
00:04:00,000 --> 00:04:12,000
In the learning process, as we've described, the first time that A sends to B, and let's say it's going to send it's packet in here, destined to be,

41
00:04:12,000 --> 00:04:18,000
this first switch is not going to know where to send it, because it's never heard from A and B about A and B before.

42
00:04:18,000 --> 00:04:27,000
So it's going to flood its message out all of these ports that's going to come down here, it's going to go out here,

43
00:04:27,000 --> 00:04:34,000
it's going to come down here, but because this, what this switch here will do is send it out of all of the ports,

44
00:04:34,000 --> 00:04:37,000
except the one that it heard from.

45
00:04:37,000 --> 00:04:46,000
This is also going to come from here, back down here, and go around this loop forever, and this one is going to go around this loop forever.

46
00:04:46,000 --> 00:04:52,000
And there's another loop here, and so you can quickly get the picture, these packets are going to go be looping around forever.

47
00:04:52,000 --> 00:05:02,000
They are going to get delivered to B, B will respond and the address will get learned, but in the meantime, we've created this huge loop of flooded addresses.

48
00:05:02,000 --> 00:05:05,000
So we need to make sure that that doesn't happen.

49
00:05:05,000 --> 00:05:11,000
The spanning tree protocol that I'm going to describe now was invented to solve this problem.

50
00:05:11,000 --> 00:05:18,000
So rather than deciding how we route along a spanning tree for each address, or to reach each destination,

51
00:05:18,000 --> 00:05:23,000
it's going to build one spanning tree for the entire network.

52
00:05:23,000 --> 00:05:34,000
So just to give you an example, I'm going to redraw my, or a switch network here that has a bunch of loops in it.

53
00:05:34,000 --> 00:05:37,000
It won't be exactly the same as the one before, but roughly the same.

54
00:05:37,000 --> 00:05:47,000
So here at A and B, what it's going to do is it's going to go through and disable some ports in the network to prevent this loop from happening.

55
00:05:47,000 --> 00:05:55,000
So one example of what it might do is essentially switch off this link here so that loop at the top is prevented.

56
00:05:55,000 --> 00:06:02,000
And it could switch off the loop, the link here, and prevent this loop down, down here.

57
00:06:02,000 --> 00:06:13,000
So we end up with a spanning tree in this case, which is like this, of which all the switches are on that spanning tree.

58
00:06:13,000 --> 00:06:21,000
So it spans, it's a tree so that there are no loops. And A and B can talk to each other over that spanning tree.

59
00:06:21,000 --> 00:06:29,000
So it gives us a rough idea of what we're going to see next.

60
00:06:29,000 --> 00:06:37,000
So preventing loops. The spanning tree protocol, it's going to start by recognizing that the topology of switches is a graph.

61
00:06:37,000 --> 00:06:48,000
And we've seen many examples of these before. And the spanning tree protocol is going to find a subgraph that spans all of the vertices, all of the switches without creating any loops.

62
00:06:48,000 --> 00:07:01,000
It's a spanning tree. And the distributed protocol is going to run across all of these switches. And it's going to start by deciding which switch is the root of the tree of the single spanning tree that it's going to create.

63
00:07:01,000 --> 00:07:06,000
And then which ports are allowed to forward packets along the tree.

64
00:07:06,000 --> 00:07:11,000
Let's look at an example here. This is a, just an example spanning tree.

65
00:07:11,000 --> 00:07:20,000
So the step one is it's going to pick a single, a single root. And the way that it's going to do this is just exchange ID numbers and pick the one with the lowest ID.

66
00:07:20,000 --> 00:07:27,000
So I'm just going to assume here that it's, it's exchanged enough to decide that S one is the root.

67
00:07:27,000 --> 00:07:35,000
And then it's going to forward packets on the ports on the shortest hop count path to the root.

68
00:07:35,000 --> 00:07:44,000
And so S six would send along here. S two would send along here as four. We've seen many examples of this now of how to create this.

69
00:07:44,000 --> 00:07:51,000
S eight. Well, there's a hop count of two here and a hop count of two here. That's that's somewhat arbitrarily decided it's going to send this way.

70
00:07:51,000 --> 00:08:02,000
And then S three that's got a hop count of two this way and one two three this way. So it will send this way. S nine will send this way.

71
00:08:02,000 --> 00:08:10,000
So there's a spanning tree that covers all of them. And here's an example of one that that could be created.

72
00:08:10,000 --> 00:08:19,000
It's it's almost the same as the one previously because it had a couple of ties that I could break. So this is the logical spanning tree that has been created.

73
00:08:19,000 --> 00:08:23,000
And of course there are no loops in it and it spans all of the switches.

74
00:08:23,000 --> 00:08:29,000
So the thing that remains to do is to figure out how does it do this? We know what it's going to end up with. So how does it get there?

75
00:08:29,000 --> 00:08:38,000
So let's take a look at how spanning tree protocol works. There's a little bit of detail here and I'm going to go through this one step at a time.

76
00:08:38,000 --> 00:08:47,000
So the first thing that happens is that all switches broadcast a special type of packet called a bridge protocol data unit.

77
00:08:47,000 --> 00:08:54,000
Protocol data unit is just a little bit of an old fashioned term for a packet and bridge is an old name for switches.

78
00:08:54,000 --> 00:09:05,000
They before Ethernet switches were popularized in the 1990s. They were called bridges. So bridge protocol data unit is usually abbreviated to BPDU.

79
00:09:05,000 --> 00:09:10,000
This is the only context in which this term BPDU is is used. So don't worry too much about it.

80
00:09:10,000 --> 00:09:16,000
It's essentially the special control messages that are sent around in order to build the spanning tree.

81
00:09:16,000 --> 00:09:24,000
The BPDU contains three pieces of information. The ID of who it is that's sending it and that's the switch ID.

82
00:09:24,000 --> 00:09:34,000
So my previous example S1, S2, S3. It's usually actually derived from the MAC address just so that it's unique and it may be manually configured by the administrator.

83
00:09:34,000 --> 00:09:40,000
But we'll just use these switch IDs on the PowerPoint pictures for now.

84
00:09:40,000 --> 00:09:46,000
It contains the ID of who it currently believes to be the root and we'll see how this evolves in a moment.

85
00:09:46,000 --> 00:09:55,000
And it's the distance from the sender to the root. In other words, what it believes is the distance from itself to the root.

86
00:09:55,000 --> 00:10:01,000
And this is the best estimate that it has right now.

87
00:10:01,000 --> 00:10:08,000
So to start with, every switch is going to boot up and think that it's the root. It's going to claim that it's the root.

88
00:10:08,000 --> 00:10:13,000
In other words, it's going to put its ID of its sender to be the same as the ID of the root.

89
00:10:13,000 --> 00:10:20,000
And because they are one and the same, it's going to say the distance feel to zero because that's the distance from the sender to the root.

90
00:10:20,000 --> 00:10:25,000
And every switch is going to broadcast this value until it hears a better value.

91
00:10:25,000 --> 00:10:29,000
In other words, a root with a smaller ID would be the most likely case.

92
00:10:29,000 --> 00:10:34,000
So if I'm currently advertising that I think that I'm root, and then somebody else sends me a message and says,

93
00:10:34,000 --> 00:10:43,000
I'm the root and its ID is lower than mine, then I will start saying, OK, I believe that you're the root instead of me.

94
00:10:43,000 --> 00:10:54,000
If there happens to be a root with the same ID, it's going to pick the one with a shorter distance and ties are going to be broken by the smaller ID of the sender.

95
00:10:54,000 --> 00:10:59,000
So if a switch hears a better message, it's not only going to adopt that value as the root.

96
00:10:59,000 --> 00:11:09,000
It's going to retransmit that message and it's going to add one to the distance and say, I'm going to forward my ID as the sender,

97
00:11:09,000 --> 00:11:16,000
the newly learned ID of the root. I'm going to add one value, one to the value that was told to me because the hop count is now increased by one.

98
00:11:16,000 --> 00:11:21,000
And I'm going to say that that is the distance from the sender to the root.

99
00:11:21,000 --> 00:11:36,000
So eventually, jumping down to here, eventually, there will be only one root that will originate these message and everybody else will retransmit them because everybody will uniquely pick the same switch ID as the root.

100
00:11:36,000 --> 00:11:44,000
OK, now we know who the root is, we know to figure out how the spanning tree is built in order to send packets to and from that root.

101
00:11:45,000 --> 00:11:53,000
So the root port is picked on every switch. It's the port on a switch that is closest to the root.

102
00:11:53,000 --> 00:11:59,000
In other words, it's the one through which the BPDU was heard that gave it that shortest distance to the root.

103
00:11:59,000 --> 00:12:02,000
So that's an easy thing to figure out.

104
00:12:02,000 --> 00:12:10,000
And that will be the one through which it sends messages, forwards messages to the root or receives them from the root.

105
00:12:10,000 --> 00:12:14,000
Not only the BPDUs, but also the forwarded packets.

106
00:12:14,000 --> 00:12:18,000
The second type of port is what's called the designated port.

107
00:12:18,000 --> 00:12:22,000
This is the port that neighbors agree to use in order to reach the port.

108
00:12:22,000 --> 00:12:29,000
It's essentially the port through which eventually packets destined to the root will be received at this switch.

109
00:12:29,000 --> 00:12:37,000
And packets coming from the root will be forwarded onto this port in order to reach the other switches.

110
00:12:37,000 --> 00:12:41,000
All other ports are blocked from forwarding.

111
00:12:41,000 --> 00:12:48,000
In other words, only those ports that are the root port or the designated port will continue to forward regular packets.

112
00:12:48,000 --> 00:12:51,000
All other ports are blocked from forwarding.

113
00:12:51,000 --> 00:13:06,000
However, they will still send and receive BPDUs so that the control messages are still sent and received so that we can continue to build the spanning tree such that if something changes, a switch goes down or a link goes down, everybody will converge on a new shortest distance.

114
00:13:06,000 --> 00:13:10,000
A new spanning tree.

115
00:13:10,000 --> 00:13:20,000
Okay, so eventually, locally, only switch will only forward on the ports that are root ports and designated ports.

116
00:13:20,000 --> 00:13:26,000
Let me finish this video on the spanning tree protocol by telling you about a brief history.

117
00:13:26,000 --> 00:13:30,000
Spending tree protocol was originally invented in 1985 by Radia Pullman.

118
00:13:30,000 --> 00:13:34,000
At that time, Ethernet switches were called bridges.

119
00:13:34,000 --> 00:13:38,000
And networks were beginning to be built with a large number of bridges.

120
00:13:38,000 --> 00:13:41,000
This was really before routing was very popular.

121
00:13:41,000 --> 00:13:54,000
And as a consequence, they really needed a quick method for reliably building a spanning tree that all of the packets could follow to prevent broadcast storms from escalating in the network.

122
00:13:54,000 --> 00:13:57,000
It was standardized in 1990 by the IEEE.

123
00:13:57,000 --> 00:14:03,000
Still, we converged relatively slowly and as networks became bigger, this became more and more of a problem.

124
00:14:03,000 --> 00:14:09,000
The timers that were used were quite long and the method takes quite a while to converge.

125
00:14:09,000 --> 00:14:14,000
And so a more rapid version called the rapid spanning tree protocol was introduced in 2004.

126
00:14:14,000 --> 00:14:18,000
Still, this built a single tree for the entire network.

127
00:14:18,000 --> 00:14:22,000
And the path followed by packets would often be a somewhat tortuous path.

128
00:14:22,000 --> 00:14:28,000
It's not necessarily the shortest path between the source and destination, because those packets would always have to go through the route.

129
00:14:28,000 --> 00:14:34,000
So more recently, the shortest path bridging protocol was introduced just in 2012.

130
00:14:34,000 --> 00:14:41,000
And this uses our old friend, the Link State algorithm, a little bit like Dijkstra's algorithm used in OSPF.

131
00:14:41,000 --> 00:14:47,000
In order to build a shortest path tree from each source to each destination.

132
00:14:47,000 --> 00:14:54,000
And so in the end, we've ended up with a method that is very similar to what's used at layer 3.

133
00:14:54,000 --> 00:14:59,000
This will probably be rolled out and more widely adopted over the next few years.

134
00:14:59,000 --> 00:15:03,000
That's the end of this video.

