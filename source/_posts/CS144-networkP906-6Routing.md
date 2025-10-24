---
title: CS144 NetworkP906 6Routing
---

1
00:00:00,000 --> 00:00:07,000
In an earlier video about the basics of routing, I told you about what multi-cast routing is in principle.

2
00:00:07,000 --> 00:00:12,000
In this video, I'm going to be telling about a number of techniques related to IP multi-cast.

3
00:00:12,000 --> 00:00:18,000
So far, we've assumed that all packets go to a single destination or that they're unicast.

4
00:00:18,000 --> 00:00:25,000
There are some applications where we want packets to be duplicated to a number of hosts, to a set of hosts.

5
00:00:25,000 --> 00:00:34,000
So for example, A might want to send to B, C, X, and E without sending to D.

6
00:00:34,000 --> 00:00:41,000
For example, it could be a broadcast TV where B, C, X, and E are all watching the same TV or radio station.

7
00:00:41,000 --> 00:00:44,000
It could be a video conference among us for the number of participants.

8
00:00:44,000 --> 00:00:48,000
It could be automatic updates to a large number of hosts and so on.

9
00:00:48,000 --> 00:00:54,000
So while we could easily send packets to each, one at a time to each destination as I showed,

10
00:00:54,000 --> 00:01:00,000
it's natural to ask if the network can or should do the replication for us.

11
00:01:00,000 --> 00:01:13,000
So for example, if the network was to duplicate the packets at R1 here and then it can more efficiently deliver to the end hosts,

12
00:01:13,000 --> 00:01:20,000
A only sends one packet, yet the packets are delivered correctly to all of the end destinations.

13
00:01:21,000 --> 00:01:24,000
So in this video I'm going to look at a number of techniques for doing this.

14
00:01:24,000 --> 00:01:31,000
I'm going to start with the general techniques and principles and then move on to the practice,

15
00:01:31,000 --> 00:01:34,000
what is actually done in the internet.

16
00:01:34,000 --> 00:01:38,000
So we always already saw one way in which packets could be delivered to a large number of hosts

17
00:01:38,000 --> 00:01:41,000
with a rather simplistic approach of flooding.

18
00:01:41,000 --> 00:01:52,000
So in flooding, if I've got a source, and it's sending through the network to a number of routers,

19
00:01:52,000 --> 00:01:55,000
let's say to be down here.

20
00:01:55,000 --> 00:02:02,000
I said that if the network is flooding, if we use flooding as an approach to reach B,

21
00:02:02,000 --> 00:02:07,000
then packets from A could simply be replicated at each router along the path

22
00:02:07,000 --> 00:02:12,000
by sending out of every interface except the one through which the packet arrived.

23
00:02:12,000 --> 00:02:17,000
So packets from A could come down to this first router, go out this way and this way,

24
00:02:17,000 --> 00:02:24,000
then when it gets to this router it could be sent out this way and this way and likewise here.

25
00:02:24,000 --> 00:02:28,000
And eventually clearly the packet is going to get delivered to B.

26
00:02:28,000 --> 00:02:30,000
In fact it will be delivered to every leaf in the network.

27
00:02:30,000 --> 00:02:37,000
The basic problem with flooding is that packets when there are loops in the topology,

28
00:02:37,000 --> 00:02:42,000
packets can loop forever because when it gets packets coming from this direction,

29
00:02:42,000 --> 00:02:46,000
hit this router, this router will say, aha, the packet came in through this interface,

30
00:02:46,000 --> 00:02:50,000
I'm going to send out of all of the interfaces except the one through which it came

31
00:02:50,000 --> 00:02:53,000
and then of course it's going to keep looping forever.

32
00:02:53,000 --> 00:02:58,000
So we saw in the spanning tree protocol how these loops were broken.

33
00:02:58,000 --> 00:03:02,000
We're going to look at a different way that they can be avoided in the first place.

34
00:03:02,000 --> 00:03:06,000
And that approach is called reverse path broadcast.

35
00:03:06,000 --> 00:03:14,000
And this is the basis for the early multi-cast methods that we used in the internet.

36
00:03:14,000 --> 00:03:17,000
The first technique I'm going to be describing is called reverse path broadcast,

37
00:03:17,000 --> 00:03:20,000
also known as reverse path forwarding.

38
00:03:20,000 --> 00:03:27,000
It's a very clever technique that's widely used and was used in the very first internet multi-cast routing protocols.

39
00:03:27,000 --> 00:03:30,000
And it builds on a very simple observation.

40
00:03:30,000 --> 00:03:36,000
And that observation is that before A has even started sending multi-cast,

41
00:03:36,000 --> 00:03:44,000
the network will have already built a minimum cost spanning tree covering all of the hosts that A can reach.

42
00:03:44,000 --> 00:03:49,000
And we saw how that was done in the Unicast routing protocols earlier.

43
00:03:49,000 --> 00:03:59,000
So for example, R1 already knows how the minimum cost spanning tree is for all of the packets going towards A.

44
00:03:59,000 --> 00:04:10,000
So there is essentially a minimum cost spanning tree in the network that has been built by all of the routers together on how to reach A.

45
00:04:10,000 --> 00:04:19,000
So A can use that as a loop-free method in order to deliver packets to everybody else.

46
00:04:19,000 --> 00:04:29,000
So first let me describe the broadcast case, which is like flooding, but without the loop packets lasting forever.

47
00:04:29,000 --> 00:04:35,000
So imagine now that A is sending a packet to everybody else.

48
00:04:35,000 --> 00:04:39,000
And that packet is going to have an address in it.

49
00:04:39,000 --> 00:04:42,000
And I'll talk about the addresses later.

50
00:04:42,000 --> 00:04:48,000
So it's going to have a group address corresponding to who it's sending to, but it'll have the source address A in it.

51
00:04:48,000 --> 00:04:54,000
And because this packet came from A, the routers at each hop along the way can ask the question,

52
00:04:54,000 --> 00:04:58,000
is the interface over which this packet arrives?

53
00:04:58,000 --> 00:05:00,000
So this interface here.

54
00:05:00,000 --> 00:05:05,000
Is it on the shortest path spanning tree from me to A?

55
00:05:05,000 --> 00:05:15,000
And you can look that up in its forwarding table to see whether if it was sending a Unicast packet to A rather than a multi-cast packet from A,

56
00:05:15,000 --> 00:05:23,000
if it was sending a Unicast packet to A, is this the path, this is the interface through which it would depart from this router?

57
00:05:24,000 --> 00:05:30,000
So it looks up the address, the source address in its table, and it's going to look that up in its forwarding table.

58
00:05:30,000 --> 00:05:39,000
And if this is the interface through which it would send it, if it was sending a Unicast, then it will accept it and send it out of every other interface.

59
00:05:39,000 --> 00:05:42,000
So it will send it out of every other interface.

60
00:05:42,000 --> 00:05:46,000
Likewise, when it gets to R2, R2 will ask the same question.

61
00:05:46,000 --> 00:05:51,000
If it was sending a Unicast packet to A, is this the interface through which it would send it?

62
00:05:51,000 --> 00:05:56,000
The answer is yes, so therefore it will send it out of every other interface.

63
00:05:56,000 --> 00:06:02,000
So it's a little bit like flooding, but it's asking a more detailed question, is this the interface through which I would send it,

64
00:06:02,000 --> 00:06:06,000
if it was a Unicast packet going to A?

65
00:06:06,000 --> 00:06:16,000
So you can see here that R3 would also ask the same question, and it would say yes, this is the interface through which I would send it to A,

66
00:06:16,000 --> 00:06:19,000
so therefore I am going to send it out of all of the other ports.

67
00:06:19,000 --> 00:06:28,000
However, when this packet reaches R2, it will come through this interface, which is not on the green shortest path tree, back to A.

68
00:06:28,000 --> 00:06:32,000
So therefore R2 will drop that packet, it won't send it.

69
00:06:32,000 --> 00:06:35,000
And you can see that it's just broken the loop.

70
00:06:35,000 --> 00:06:41,000
Same thing will happen over here at R8, this is not on the green shortest path tree, so that packet will be dropped.

71
00:06:41,000 --> 00:06:50,000
And you can convince yourself that there in fact will be no loops, because packets will follow that spanning tree that has already been built.

72
00:06:50,000 --> 00:06:59,000
So there's a clever idea, and you can see what's called reverse path broadcast, because it's using the spanning tree that is in the opposite direction.

73
00:07:00,000 --> 00:07:05,000
Now this is all very well as a means for broadcast, but we're talking about multi-cast.

74
00:07:05,000 --> 00:07:16,000
In this particular case, the packet would have been delivered to all of the end hosts, whereas in fact we wanted it to be delivered to every end host except D,

75
00:07:16,000 --> 00:07:19,000
that was the set of hosts that we were trying to deliver to.

76
00:07:20,000 --> 00:07:40,000
So as a simple extension to this, there is something that's called pruning, and usually referred to as reverse path broadcast plus pruning, or RPB plus pruning, in which those routers that don't have any connected hosts interested in receiving the packet.

77
00:07:40,000 --> 00:07:44,000
So in our case, D is not part of the multi-cast group.

78
00:07:44,000 --> 00:07:56,000
So R6 would send what's called a prune message, which I'll just show as a dotted line, so it'll send prune, and say, hey, I actually don't have any end hosts interested in receiving this.

79
00:07:56,000 --> 00:08:01,000
Please don't send me multi-cast packets for this group address anymore.

80
00:08:01,000 --> 00:08:07,000
And so it will prune G and say, I have no interest in this.

81
00:08:08,000 --> 00:08:20,000
So in this case, this would then be removed from the reverse path broadcast tree, and now that tree will only reach the end hosts that are interested in it.

82
00:08:20,000 --> 00:08:24,000
So it's a way of decreasing the inefficiency of broadcast.

83
00:08:24,000 --> 00:08:33,000
However, it clearly has the inefficiency still that to start with, every router will hear about it before it starts pruning.

84
00:08:33,000 --> 00:08:39,000
So in a very, very large network, this is probably impractical.

85
00:08:39,000 --> 00:08:47,000
So in summary, reverse path broadcast plus pruning packets are delivered loop free to every end host.

86
00:08:47,000 --> 00:08:55,000
Because with no interest in the, with no interested hosts attached to them, we'll send prune messages back towards the source.

87
00:08:55,000 --> 00:09:03,000
And of course, they can use the unicast address of the source in order to send that prune message, so it'll follow the tree back towards the source.

88
00:09:03,000 --> 00:09:09,000
The resulting tree is the minimum cost spanning tree from the source to the set of interested hosts.

89
00:09:09,000 --> 00:09:21,000
So in a efficient way, an efficient tree that we end up with, although the method to get there is a little inefficient because we have to start by communicating to all of the routers in the network.

90
00:09:21,000 --> 00:09:29,000
One question that you may be wondering is, do we build one tree or do we build several trees?

91
00:09:29,000 --> 00:09:38,000
In my example, I showed A wanting to send to this set of destinations, B, C, X and E.

92
00:09:38,000 --> 00:09:47,000
So I had a video conference and after A has spoken and sent packets to everybody else, what if it's B's turn to send?

93
00:09:47,000 --> 00:09:52,000
What is the tree, the multicast tree, that packets from B should follow?

94
00:09:52,000 --> 00:09:59,000
So going from B back to A again, they would follow the same way, B to C and B to X.

95
00:09:59,000 --> 00:10:03,000
But going from B to E, it would seem more likely that the packets will flow this way.

96
00:10:03,000 --> 00:10:10,000
In other words, the tree is specific to a source. The shortest path tree is specific to a source.

97
00:10:10,000 --> 00:10:20,000
And that should be clear from my previous example of the reverse path broadcast in which the packets are going to follow the shortest path spanning tree in the opposite direction.

98
00:10:20,000 --> 00:10:30,000
And so given that there will be a shortest path spanning tree from every source and to every destination, it's not surprising that the packets will take a different path.

99
00:10:30,000 --> 00:10:35,000
So ideally, we would build a separate tree for every sender, a source specific tree.

100
00:10:35,000 --> 00:10:39,000
So they're all packets follow the shortest cost spanning tree to the end hosts.

101
00:10:39,000 --> 00:10:54,000
But in communications where the multicast group of end hosts is very small, it might be easier instead of building a whole load of trees, one for a very source, to establish some rendezvous points.

102
00:10:54,000 --> 00:11:05,000
And we'll see an example of this later. So for example, we might elect R5 as a rendezvous through which all of the multicast packets are going to go.

103
00:11:05,000 --> 00:11:15,000
So when everyone's sending a multicast, they could send them to R5. And then R5 would build a shortest path spanning tree to everybody else within the group.

104
00:11:15,000 --> 00:11:27,000
And there's one shortest path spanning tree from R5, the rendezvous point to everybody, and that everybody uses the normal unicast routing method in order to reach R5.

105
00:11:27,000 --> 00:11:35,000
So there's really a design choice in practice as to whether we maintain one tree or one for every source.

106
00:11:35,000 --> 00:11:45,000
So I've told you a little bit about some of the techniques and principles. Let me tell you a little bit about the practice how multicast is used in the internet today.

107
00:11:45,000 --> 00:11:53,000
So one thing I haven't mentioned so far is about addresses. There is a class of IPV4 addresses that are different from the unicast addresses.

108
00:11:53,000 --> 00:12:05,000
There are sort of class, there are 16 bits, so there are two to the 16 different multicast addresses. And they don't correspond to a particular location on the topology, like a unicast address does.

109
00:12:05,000 --> 00:12:14,000
They refer to a group. So every recipient of packets within a group will receive packets with that same multicast address.

110
00:12:14,000 --> 00:12:29,000
So it's a little bit like an interaction. The router will look up on the label. And in fact, routers typically maintain an entry for each tuple of multicast address and source pair so that they can route packets on the source specific tree.

111
00:12:32,000 --> 00:12:36,000
We also need a way for hosts to indicate their interest in joining a group.

112
00:12:36,000 --> 00:12:46,000
One of the interesting things about multicast is that generally the source does not need to know who the packets are being delivered to. It's the network, it's the tree that figures that out.

113
00:12:46,000 --> 00:12:59,000
So each of the leaves of the tree, each of the hosts, needs to indicate an interest in receiving packets. And it does this by using IGMP, the internet group management protocol, RFC3376.

114
00:13:00,000 --> 00:13:06,000
So this is a protocol that runs between the host, between an end host, and it's directly attached router.

115
00:13:07,000 --> 00:13:24,000
The hosts periodically will ask to receive packets belonging to a particular multicast group. In fact, the routers will probe or will send out a request to all of the hosts connected to them and say, what multicast groups are you interested in?

116
00:13:24,000 --> 00:13:31,000
And then the host will respond and we'll say which groups they want to receive from.

117
00:13:31,000 --> 00:13:40,000
And if they don't receive any reply after a while, then the membership times out. In other words, it says, I will no longer deliver packets belonging to this multicast group if no one is interested in it.

118
00:13:41,000 --> 00:13:52,000
This is an example of what's called soft state. The state has only maintained. It isn't explicitly removed. It will just time out if no one actually renews their interest in receiving it.

119
00:13:54,000 --> 00:14:06,000
So let me tell you about multicast routing in the internet very briefly. The very first multicast routing protocol was called DVMRP. The distance vector multicast routing protocol described in RFC 1075.

120
00:14:07,000 --> 00:14:23,000
It was first introduced in the 1980s. And it basically used the reverse path broadcast plus prune. So it was based on this observation, hence the distance vector name at the beginning. It's based on the observation that the unicast routing protocol has already built the tree forest.

121
00:14:23,000 --> 00:14:30,000
So it's just going to use it in the reverse direction. An alternative is called protocol independent multicast or PIM.

122
00:14:31,000 --> 00:14:41,000
And this recognizes two different modes of multicast, one called dense mode in which all of the routers or a very large number of the routers are expected to be involved in multicast.

123
00:14:42,000 --> 00:14:48,000
In which case, RPP plus prune is fine because most of the routers will be involved and very few of them will need to prune.

124
00:14:48,000 --> 00:14:55,000
So that uses DVMRP or something very similar to DVMRP and is described in RFC 3973.

125
00:14:56,000 --> 00:15:06,000
An alternative way is called Spass mode PIM in which a relatively small number of the routers are expected to be involved in the multicast.

126
00:15:07,000 --> 00:15:13,000
And therefore it will be very inefficient to do the RPP plus prune because there would be way too many prune messages in the network.

127
00:15:13,000 --> 00:15:27,000
In this case, it explicitly builds rendezvous points through which the packets that are sent will join a small set of spanning trees from the rendezvous points to all of the destinations of a group.

128
00:15:28,000 --> 00:15:36,000
And so there's a lot of work went into how you pick these rendezvous points. It's a fairly subtle problem in its own right.

129
00:15:36,000 --> 00:15:49,000
So DVMRP and PIM, so really overall there are three widely used methods, protocols described in the three RFCs mentioned here.

130
00:15:50,000 --> 00:16:01,000
So in practice multicast is used a little less than was originally expected. It was originally anticipated that it would be used for a very large amount of communication in the internet.

131
00:16:01,000 --> 00:16:11,000
Because at the time that multicast was first conceived, it was still the case that the majority of communications in the world were for TV and radio that were broadcast medium.

132
00:16:12,000 --> 00:16:15,000
And so it was anticipated that this would be a very common type of communication.

133
00:16:16,000 --> 00:16:20,000
And in fact in practice this has turned out to be less true than was originally thought.

134
00:16:21,000 --> 00:16:26,000
And it seems that over the last 20 or so years communication has become much more individualized.

135
00:16:26,000 --> 00:16:31,000
We tend to ask for content that we specifically want to watch at a specific time.

136
00:16:32,000 --> 00:16:43,000
There's less interest in broadcast than there used to be except for events like sporting events, big political rallies or a rocket launching or something like that.

137
00:16:44,000 --> 00:16:54,000
So this individualized time shifting that's commonplace today has really reduced the demand for multicast in the network.

138
00:16:54,000 --> 00:17:00,000
Also some of the earlier implementations were pretty inefficient like DVMRP and were found to have scaling problems.

139
00:17:01,000 --> 00:17:06,000
And so it reduced some of the interest or the enthusiasm that people had for introducing multicast.

140
00:17:07,000 --> 00:17:22,000
Today it is used for some broadcast IPTV dissemination and some applications do, there are an application layer specific multicast not using the network infrastructure but building their own overlay tree for themselves.

141
00:17:25,000 --> 00:17:28,000
Multicast also raises some interesting questions.

142
00:17:29,000 --> 00:17:39,000
And they're really to do with the state that one would have to maintain in order to maintain reliable TCP-like communications within end host.

143
00:17:40,000 --> 00:17:45,000
So for example imagine that a source is sending to hundreds or thousands or hundreds of thousands of destinations in a group.

144
00:17:46,000 --> 00:17:53,000
If it wanted that communication to be reliable in which it was maintaining a keeping track of which packets had been reliable.

145
00:17:54,000 --> 00:17:59,000
And then we received at which destinations this would be a horrendous task for a single source to manage.

146
00:18:00,000 --> 00:18:09,000
And in fact anything that requires state like flow control or supporting different rates to a different end users, not clear how to do that either or how to make it secure.

147
00:18:10,000 --> 00:18:15,000
All of these are quite big problems. There's been lots of interest from a research point of view.

148
00:18:16,000 --> 00:18:19,000
But generally speaking they're not considered to be good solutions to these.

149
00:18:19,000 --> 00:18:24,000
So generally multicast is used for delivering data that is primarily in one direction.

150
00:18:25,000 --> 00:18:32,000
For example like TV in which that data is being moved from a source without modification to a set of end hosts.

151
00:18:33,000 --> 00:18:35,000
And that's the end of the video on multicast.

