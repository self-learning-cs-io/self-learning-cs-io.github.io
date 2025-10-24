---
title: CS144 NetworkP856 1Routing
---

1
00:00:00,000 --> 00:00:05,000
In the next few videos, we're going to look at a number of different ways that packets can be routed across a network.

2
00:00:05,000 --> 00:00:09,000
In this video, I'm going to stop with some of the basic concepts and principles of routing,

3
00:00:09,000 --> 00:00:13,000
regardless of whether we're routing packets based on the layer 3 or IP addresses,

4
00:00:13,000 --> 00:00:18,000
or if we're using the Ethernet address and Ethernet switches.

5
00:00:18,000 --> 00:00:26,000
The basic problem that we're trying to solve when routing packets is how should packets be routed from A to B?

6
00:00:26,000 --> 00:00:37,000
Should the path be picked by the end host A over here by the network in the middle or by some other entity?

7
00:00:37,000 --> 00:00:42,000
So what path should they pick and what are the most important metrics for them to consider?

8
00:00:42,000 --> 00:00:47,000
Should they take the shortest path, the least congested path, a randomly picked path,

9
00:00:47,000 --> 00:00:50,000
the safest and most reliable path? Does it matter?

10
00:00:51,000 --> 00:00:58,000
So in the next few minutes, we're going to look through at some different techniques and some different metrics for solving this basic problem.

11
00:00:58,000 --> 00:01:01,000
So I'm going to look at a number of different approaches.

12
00:01:01,000 --> 00:01:05,000
Flooding, source routing, forwarding table and spanning tree.

13
00:01:05,000 --> 00:01:09,000
We'll look at some metrics, and then I'll describe what a shortest path spanning tree is,

14
00:01:09,000 --> 00:01:14,000
and then describe some other types of routing, multi-path and multi-cast.

15
00:01:15,000 --> 00:01:23,000
Flooding is perhaps the simplest way to make sure at least one copy of a packet is delivered to every destination in the network,

16
00:01:23,000 --> 00:01:26,000
and therefore to the destination that it's wanting to go to.

17
00:01:26,000 --> 00:01:31,000
With flooding, each router is going to forward the packet to every interface.

18
00:01:31,000 --> 00:01:37,000
So if A is sending a packet, and let's say that it's sending it to B, so it has B is addressing it.

19
00:01:38,000 --> 00:01:44,000
When it reaches the first router, it's going to send it out of every interface except the one through which it arrived.

20
00:01:44,000 --> 00:01:49,000
That's going to happen at the next router as well, so it'll send it out of these interfaces.

21
00:01:49,000 --> 00:01:53,000
It will come down to this one here, which will send it out here and here.

22
00:01:53,000 --> 00:01:58,000
Then it'll go out from here, and then it'll go from this one out of here.

23
00:01:58,000 --> 00:02:03,000
But it'll also go in this direction, and it'll come back around here and come back around here.

24
00:02:03,000 --> 00:02:09,000
And you can see very quickly that there's a loop that's going to form in the middle with the packet going around and around forever.

25
00:02:09,000 --> 00:02:16,000
But we can be sure in this case, because every packet will be delivered to at least once to every leaf.

26
00:02:16,000 --> 00:02:18,000
It will therefore reach every destination.

27
00:02:18,000 --> 00:02:28,000
And if it contains B's address, which it does, then we can be sure that B can find the packet or receive the packet by simply filtering on packets matching its address.

28
00:02:29,000 --> 00:02:31,000
This is a clearly very inefficient.

29
00:02:31,000 --> 00:02:37,000
All packets are going to cross every link, potentially multiple times, and packets can loop forever.

30
00:02:37,000 --> 00:02:45,000
Therefore, it's common to use a hop count or a time to live field like we do in IP to stop packets looping forever.

31
00:02:45,000 --> 00:02:49,000
But at least we can be sure that packets are going to reach their eventual destination.

32
00:02:49,000 --> 00:02:51,000
We can be absolutely sure of that.

33
00:02:51,000 --> 00:02:53,000
So, flooding is nice and simple.

34
00:02:53,000 --> 00:02:57,000
It requires no state in the routers.

35
00:02:57,000 --> 00:03:03,000
It doesn't require any understanding by A of the topology of the network.

36
00:03:03,000 --> 00:03:05,000
So, it's very, very simple.

37
00:03:05,000 --> 00:03:14,000
But because it's so inefficient, it's really only used at times and instances when we know nothing about the topology, or we can't trust our knowledge of it.

38
00:03:14,000 --> 00:03:16,000
And we need to be able to reach every node.

39
00:03:16,000 --> 00:03:21,000
So, we'll see a couple of examples of this later, particularly at times of transition, when we're not quite sure what's going on.

40
00:03:21,000 --> 00:03:25,000
So, in summary, it's inefficient in link usage.

41
00:03:25,000 --> 00:03:30,000
Packets can loop forever, and it's used when we don't know or can't trust the topology.

42
00:03:30,000 --> 00:03:33,000
Now, let's look at another method called source routing.

43
00:03:33,000 --> 00:03:39,000
Source routing is when the source populates the packet with a sequence of hops that it will visit along its path.

44
00:03:39,000 --> 00:03:50,000
So, if we give names to these routers, let's call them R1, R2, R3, R4, R5, and R6.

45
00:03:50,000 --> 00:04:00,000
And so, if A is sending to B with source routing, it might, for example, put in the header, R1, R3, R6.

46
00:04:00,000 --> 00:04:05,000
To indicate that it wants the packet to go through that sequence before it gets to B.

47
00:04:05,000 --> 00:04:10,000
So, that would just say, go to R1 first, go to R3, R6, and then to B.

48
00:04:10,000 --> 00:04:13,000
I just have to draw them in the order in which they'll be visited.

49
00:04:13,000 --> 00:04:16,000
That's going to depend on the way in which we use source routing.

50
00:04:16,000 --> 00:04:18,000
We'll see that a little bit later.

51
00:04:18,000 --> 00:04:21,000
It's specifically here, A knows the topology.

52
00:04:21,000 --> 00:04:25,000
It knows the order in which it wants the routers to be visited.

53
00:04:25,000 --> 00:04:32,000
And it's giving the final destination to make sure that it works and reaches B.

54
00:04:32,000 --> 00:04:37,000
Likewise, with flooding, the routers need no forwarding tables to be populated in advance.

55
00:04:37,000 --> 00:04:40,000
All the decision making is made by the end host.

56
00:04:40,000 --> 00:04:44,000
It's actually a pretty good example of the end-to-end principle in action.

57
00:04:44,000 --> 00:04:46,000
The function is implemented at the end host.

58
00:04:46,000 --> 00:04:51,000
A is the one that knew the route, and so it picked the path that would be taken.

59
00:04:51,000 --> 00:04:55,000
And this way we can make sure it's done correctly.

60
00:04:55,000 --> 00:04:59,000
But it's a lot of work for the end host, and packets are a variable length,

61
00:04:59,000 --> 00:05:01,000
and might carry a lot of addresses.

62
00:05:01,000 --> 00:05:06,000
So, on the face of it, it's kind of a good scheme, but clearly we would like to do something

63
00:05:06,000 --> 00:05:10,000
that was a little less heavyweight on the end host.

64
00:05:10,000 --> 00:05:13,000
So, it's an end-to-end solution, no support needed from the network.

65
00:05:13,000 --> 00:05:16,000
Packet care is a variable and maybe long list of addresses.

66
00:05:16,000 --> 00:05:19,000
End hosts must know the topology and choose the route.

67
00:05:19,000 --> 00:05:25,000
And this is used when the end host wants to control the route.

68
00:05:25,000 --> 00:05:29,000
So now let's look at the method that we already know is used by the internet.

69
00:05:29,000 --> 00:05:36,000
And this is when we actually have a forwarding table that's used throughout the network

70
00:05:36,000 --> 00:05:38,000
to route the packets hot by hot.

71
00:05:38,000 --> 00:05:41,000
And as you know already, I'll go through this fairly quickly.

72
00:05:41,000 --> 00:05:45,000
If we're sending a packet from A to B, along this particular path,

73
00:05:45,000 --> 00:05:49,000
S1, S2, S4, and then to B, with a forwarding table case,

74
00:05:49,000 --> 00:05:54,000
we use a forwarding table at each hop in order to decide where the packet will go next.

75
00:05:54,000 --> 00:05:56,000
So we've seen this example before.

76
00:05:56,000 --> 00:05:59,000
You can really think of this as an optimization.

77
00:05:59,000 --> 00:06:05,000
It's an optimization in the sense that, although we could correctly have the behavior work

78
00:06:05,000 --> 00:06:11,000
by populating the packets with the route using source routing,

79
00:06:11,000 --> 00:06:15,000
we've decided to have the network take on this function to optimize it

80
00:06:15,000 --> 00:06:20,000
because it's such a common function, common to everybody that's using the network.

81
00:06:20,000 --> 00:06:24,000
So it's an optimization in the sense that the network is going to handle the

82
00:06:24,000 --> 00:06:27,000
not hot by hot routing on behalf of everybody.

83
00:06:27,000 --> 00:06:30,000
It does require a population of the forwarding tables.

84
00:06:30,000 --> 00:06:33,000
So we need a way to populate these forwarding tables.

85
00:06:33,000 --> 00:06:39,000
And we're going to see in the next few videos various ways in which we can populate this table.

86
00:06:39,000 --> 00:06:44,000
So from here on, we're going to be making the assumption that we're using forwarding tables

87
00:06:44,000 --> 00:06:50,000
and that we need some method in order to populate this table in order to decide

88
00:06:50,000 --> 00:06:53,000
how the routing will take place.

89
00:06:53,000 --> 00:06:59,000
We have a predestination state in the network because we are going to, for each of the destinations,

90
00:06:59,000 --> 00:07:04,000
we're going to have to have a next hop address, populated in the table,

91
00:07:04,000 --> 00:07:07,000
although we don't necessarily have to have per flow state.

92
00:07:07,000 --> 00:07:12,000
Any flows in the network that are heading towards the same destination can all use the same entries.

93
00:07:12,000 --> 00:07:16,000
When I'm populating the forwarding tables with entries,

94
00:07:16,000 --> 00:07:20,000
it's often the goal to create what we call a spanning tree.

95
00:07:20,000 --> 00:07:23,000
And we're going to see many examples of this.

96
00:07:23,000 --> 00:07:28,000
Spanning tree is spanning in the sense that it reaches all leaves

97
00:07:28,000 --> 00:07:31,000
and it's a tree in the sense that it has no loops.

98
00:07:31,000 --> 00:07:35,000
So we want to make sure that we can reach every destination

99
00:07:35,000 --> 00:07:38,000
or every source can reach a particular destination

100
00:07:38,000 --> 00:07:41,000
and we want to make sure that there are no loops.

101
00:07:41,000 --> 00:07:43,000
Let me give you an example of this.

102
00:07:43,000 --> 00:07:48,000
Imagine that we want to create the spanning tree that ABC and D, the hosts at the top,

103
00:07:48,000 --> 00:07:53,000
will use in order to send packets to X, the destination at the bottom.

104
00:07:53,000 --> 00:08:00,000
So A, its packets could follow this path, B's might follow this path, C's might follow this path,

105
00:08:00,000 --> 00:08:03,000
and D's might follow that path.

106
00:08:03,000 --> 00:08:07,000
So you can see I've created a tree with the root at X,

107
00:08:07,000 --> 00:08:11,000
and it's spanning all of the sources that might send to it.

108
00:08:11,000 --> 00:08:14,000
So tree in the sense that it has no loops.

109
00:08:15,000 --> 00:08:21,000
This would be implemented by populating the routing, the forwarding table at R1

110
00:08:21,000 --> 00:08:28,000
with the entry. If I want to go to X, then I go to R3 as my next hop.

111
00:08:28,000 --> 00:08:31,000
That's telling it what to do here.

112
00:08:31,000 --> 00:08:37,000
Likewise, at R3, we would have an entry that said if I want to go to X,

113
00:08:37,000 --> 00:08:40,000
then I will go directly to X.

114
00:08:41,000 --> 00:08:50,000
Similarly, over here in R4, I will say if I'm going to go to X, then I'll go there via R7.

115
00:08:50,000 --> 00:08:55,000
So the spanning tree is used in order to create the routing entries

116
00:08:55,000 --> 00:09:02,000
so that we can populate the forwarding tables and therefore route paths along that spanning tree.

117
00:09:02,000 --> 00:09:06,000
When calculating the spanning tree, we need to know what our objective is,

118
00:09:06,000 --> 00:09:11,000
or what our metrics of success are, how we know amongst all of the possible spanning trees,

119
00:09:11,000 --> 00:09:15,000
which one we're going to pick.

120
00:09:15,000 --> 00:09:17,000
So this is going to depend on what our metric is.

121
00:09:17,000 --> 00:09:20,000
So let's look at some choices that we might have.

122
00:09:20,000 --> 00:09:24,000
We might choose to pick the spanning tree that minimizes the distance.

123
00:09:24,000 --> 00:09:28,000
This could be the geographic distance or the minimized the length of the links

124
00:09:28,000 --> 00:09:30,000
between the source and the destination.

125
00:09:30,000 --> 00:09:36,000
So for example, noticing that this link along here is long,

126
00:09:36,000 --> 00:09:43,000
we might decide that this path is actually geographically shorter than this one down here,

127
00:09:43,000 --> 00:09:46,000
and therefore prefer it.

128
00:09:46,000 --> 00:09:49,000
We might also choose the one with the minimum hop count.

129
00:09:49,000 --> 00:09:53,000
So the example I showed you before was generally following the shortest hop count.

130
00:09:53,000 --> 00:10:00,000
So for example, D would take this path here because it's the shortest number of hops.

131
00:10:00,000 --> 00:10:02,000
It will also be the one that minimizes delay.

132
00:10:02,000 --> 00:10:06,000
I've got no way of telling directly from the graph what will minimize the delay,

133
00:10:06,000 --> 00:10:08,000
but that might be something that I can measure.

134
00:10:08,000 --> 00:10:12,000
In recent past, what have been the links that have experienced the minimum delay

135
00:10:12,000 --> 00:10:15,000
and therefore give preference to those?

136
00:10:15,000 --> 00:10:19,000
I might use the ones that maximize the throughput, they may be the least congested,

137
00:10:19,000 --> 00:10:21,000
or the path that is least loaded.

138
00:10:21,000 --> 00:10:26,000
Or it may be the most reliable path, the one that in the recent past has failed least often.

139
00:10:26,000 --> 00:10:28,000
That may be my metric.

140
00:10:28,000 --> 00:10:30,000
It could also be the lowest cost path.

141
00:10:30,000 --> 00:10:34,000
I may have a price or a cost associated with using any one link and I want to minimize it.

142
00:10:34,000 --> 00:10:41,000
Or it could be the most secure path, the one that most recently has had the fewest security attacks,

143
00:10:41,000 --> 00:10:45,000
or it might be one of which I have a virtual private network running.

144
00:10:45,000 --> 00:10:48,000
And so on, there are many, many metrics that I could use.

145
00:10:48,000 --> 00:10:52,000
In fact, I could actually use a combination of any of those.

146
00:10:52,000 --> 00:10:57,000
So typically, how we do this is we start by creating an annotated graph

147
00:10:57,000 --> 00:11:00,000
with whatever cost metric we've chosen and I could have picked any of those ones.

148
00:11:00,000 --> 00:11:04,000
So we can represent our metric as a cost for using a link.

149
00:11:04,000 --> 00:11:08,000
So this is a set of costs that I made up, just as an example.

150
00:11:08,000 --> 00:11:11,000
In general, the cost might be different in each direction,

151
00:11:11,000 --> 00:11:16,000
just because of the congested maybe more in one direction or the throughput may be different.

152
00:11:16,000 --> 00:11:21,000
But for ease of drawing, I'm going to show one number per link here.

153
00:11:21,000 --> 00:11:26,000
So one natural choice is to try to find the spanning tree from every host to X.

154
00:11:26,000 --> 00:11:30,000
And I might try to find the one that is minimizing the cost.

155
00:11:30,000 --> 00:11:33,000
In which case, I'm going to call it the minimum cost spanning tree.

156
00:11:33,000 --> 00:11:37,000
In this example, the solution is fairly obvious.

157
00:11:37,000 --> 00:11:40,000
Let's have a look at what that would be.

158
00:11:40,000 --> 00:11:45,000
So coming to X, if I'm coming from B,

159
00:11:45,000 --> 00:11:52,000
then the minimum cost is going to be to take that path here, because that has a cost of four.

160
00:11:52,000 --> 00:11:58,000
When I'm going from C, the minimum cost is going to be this one here,

161
00:11:58,000 --> 00:12:01,000
which has a cost of five, three plus two.

162
00:12:01,000 --> 00:12:04,000
Coming from D, it's pretty easy. It's going to be down here.

163
00:12:04,000 --> 00:12:07,000
A is a little bit more subtle. It's not the one down here.

164
00:12:07,000 --> 00:12:12,000
The lowest cost one is the one that goes this way, which has a cost of five.

165
00:12:12,000 --> 00:12:15,000
So there's my minimum cost spanning tree.

166
00:12:15,000 --> 00:12:17,000
Here's an example of that drawn out.

167
00:12:17,000 --> 00:12:20,000
So in this case, it's very simple to calculate it.

168
00:12:20,000 --> 00:12:23,000
What we need is a method that will work in much more complicated networks.

169
00:12:23,000 --> 00:12:25,000
For example, this one.

170
00:12:25,000 --> 00:12:28,000
This is clearly way beyond something a human could do in their head.

171
00:12:28,000 --> 00:12:32,000
This is a picture of the topology map for the backbone of the internet.

172
00:12:32,000 --> 00:12:35,000
Well, I couldn't do this in my head. Maybe you can.

173
00:12:35,000 --> 00:12:39,000
So we need automated algorithms to calculate the route and put the necessary forwarding entries

174
00:12:39,000 --> 00:12:41,000
into the forwarding tables in the routers.

175
00:12:41,000 --> 00:12:44,000
So to calculate the routes, the routers are going to exchange information

176
00:12:44,000 --> 00:12:47,000
with each other about the current topology as they know it.

177
00:12:47,000 --> 00:12:52,000
This is the job of what we call the routing algorithm or the routing protocol.

178
00:12:52,000 --> 00:12:55,000
In some cases, the algorithm to calculate the route is wrapped in

179
00:12:55,000 --> 00:12:58,000
with the exchange of the state itself. In other cases, they're separate.

180
00:12:58,000 --> 00:13:00,000
We're going to look at examples of both.

181
00:13:00,000 --> 00:13:05,000
Going back to our outline, we've got down to the shortest path spanning tree.

182
00:13:05,000 --> 00:13:09,000
We're going to be looking at several examples of this over the next few videos.

183
00:13:09,000 --> 00:13:16,000
I just want to finish up by telling you about two other types of routing that are commonly used.

184
00:13:16,000 --> 00:13:18,000
The first one is multi-path.

185
00:13:18,000 --> 00:13:22,000
So far, we've assumed that all the packets to a given destination

186
00:13:22,000 --> 00:13:23,000
are going to follow the same path.

187
00:13:23,000 --> 00:13:26,000
In particular, the shortest path spanning tree.

188
00:13:26,000 --> 00:13:32,000
The downside of the shortest path spanning tree is that some links can become very popular.

189
00:13:32,000 --> 00:13:36,000
We saw that we had a path that went down here before and a path that went down here.

190
00:13:36,000 --> 00:13:42,000
You can see that this whole area here is going to become quite popular and could become congested.

191
00:13:42,000 --> 00:13:45,000
It means we might need to keep adapting the algorithm.

192
00:13:45,000 --> 00:13:48,000
An alternative would be, instead of adapting the algorithm, is to from the beginning,

193
00:13:48,000 --> 00:13:51,000
spread all of the traffic all over all of the links.

194
00:13:51,000 --> 00:13:54,000
This is quite different from the shortest path spanning tree.

195
00:13:54,000 --> 00:14:00,000
This might be a case where we send some of the packets from a to x this way.

196
00:14:00,000 --> 00:14:02,000
We might choose to send some of them this way.

197
00:14:02,000 --> 00:14:09,000
This is called multi-path, where we're spreading the packets to a destination over multiple paths.

198
00:14:09,000 --> 00:14:14,000
Essentially, we're load balancing traffic over some or possibly all of the paths.

199
00:14:14,000 --> 00:14:20,000
We're going to see the details later, but for now, it's enough to know that it might look something like what I just drew.

200
00:14:20,000 --> 00:14:27,000
So in principle, it's okay for packets to take different length paths and to get miss ordered.

201
00:14:27,000 --> 00:14:35,000
So it might be that in the example I had here, that a packet taking this path here might get there much sooner than one taking this path here.

202
00:14:35,000 --> 00:14:39,000
Therefore, get me sequence relative to it.

203
00:14:39,000 --> 00:14:42,000
The internet makes no promise of in sequence delivery.

204
00:14:42,000 --> 00:14:45,000
That's the job of TCP to put them back in the right order.

205
00:14:45,000 --> 00:14:51,000
We're going to see later that in practice, it's common to make sure that packets within a given application flow don't get miss sequenced.

206
00:14:51,000 --> 00:14:57,000
Just to make life a bit easier for TCP, but this is just really an optimization in the network.

207
00:14:57,000 --> 00:15:06,000
So multi-path is when we spread the packets over multiple links in order to spread the load as evenly as we can across the network.

208
00:15:06,000 --> 00:15:11,000
Another type of routing, another method is called multi-cast.

209
00:15:11,000 --> 00:15:17,000
So far, we've assumed that all packets are going to a single destination, something we call unicast.

210
00:15:17,000 --> 00:15:24,000
For example, the packets in the last few examples of showing them going from a to x as a single packet.

211
00:15:24,000 --> 00:15:31,000
In some applications, an end host might want to send packets to a set of hosts.

212
00:15:31,000 --> 00:15:41,000
For example, a might want to send packets to a single packet that gets delivered to b, c, and x maybe.

213
00:15:41,000 --> 00:15:44,000
But not d.

214
00:15:44,000 --> 00:15:58,000
Applications that might want to do this could be like a broadcast TV or radio station where currently b, c, and x are listening to a TV station being broadcast from a could be automatic updates to a large number of hosts.

215
00:15:58,000 --> 00:16:03,000
For example, a car company updating its inventory every night to all of its dealerships.

216
00:16:03,000 --> 00:16:10,000
Or it could be stock prices being updated in a trading room where you want everybody to receive the update very, very, very at the same time.

217
00:16:11,000 --> 00:16:16,000
So why we can obviously send each packet one at a time to its destination, that would be fine.

218
00:16:16,000 --> 00:16:20,000
A could send individual packets to b, c, and x.

219
00:16:20,000 --> 00:16:27,000
It's natural to ask if the network can help, whether it can and whether it should do the replication for us.

220
00:16:27,000 --> 00:16:31,000
So for example, a could send a single packet.

221
00:16:31,000 --> 00:16:39,000
It could come down until it reaches b and then it could be replicated one packet going this way and one packet going this way.

222
00:16:39,000 --> 00:16:45,000
And another packet going on to c and so on at every branching point within the network.

223
00:16:45,000 --> 00:16:54,000
So now we send one packet and it's delivered to everybody and we're using the graph structure of the network to do the replication for us.

224
00:16:54,000 --> 00:17:01,000
So notice that in order to send for a to b, c, and x have essentially drawn a spanning tree.

225
00:17:01,000 --> 00:17:03,000
And this is actually going to prove to be quite interesting later.

226
00:17:03,000 --> 00:17:06,000
I've got a spanning tree across the set of destinations.

227
00:17:06,000 --> 00:17:09,000
And we're going to see some examples of how this works later.

228
00:17:09,000 --> 00:17:17,000
It's enough for us to know right now that just that this is a one way of routing packets.

229
00:17:17,000 --> 00:17:21,000
And we'll see later how this is done specifically in the internet.

230
00:17:21,000 --> 00:17:28,000
So in summary, there are several ways to route packets across a network starting with the simplest method, flooding.

231
00:17:28,000 --> 00:17:36,000
So in practice, we use routing algorithms or also known as routing protocols to calculate the routes and populate the forwarding tables.

232
00:17:36,000 --> 00:17:41,000
Often the algorithms calculate the minimum cost spanning tree to the destination.

233
00:17:41,000 --> 00:17:45,000
And we're going to see lots of examples of that soon.

234
00:17:45,000 --> 00:17:53,000
Other types of routing include multi path to spread traffic over links and multi-cast to deliver the multiple end hosts.

235
00:17:53,000 --> 00:17:55,000
That's the end of this video.

