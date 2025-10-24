---
title: CS144 NetworkP886 4Routing
---

1
00:00:00,000 --> 00:00:05,339
Now that we've learned about the basics of routing, flooding, shortest paths, spanning trees, and so on,

2
00:00:05,339 --> 00:00:12,780
and we've also learned about the distance vector protocol, Bellman-4 algorithm, the link state protocol, or Dijkstra's shortest path path.

3
00:00:12,780 --> 00:00:18,699
First, algorithm. In this video, I'm going to put it all together and tell you about the structure of the internet,

4
00:00:18,699 --> 00:00:27,420
how hierarchical routing works about interior and exterior routing protocols, and the breakdown of the internet into autonomous systems.

5
00:00:28,420 --> 00:00:36,920
I'm going to be talking about three main things. First of all, hierarchy and the decomposition of the internet into autonomous systems.

6
00:00:36,920 --> 00:00:44,920
The second is, within those autonomous systems, how we use the distance vector and link state algorithms that we've already seen.

7
00:00:44,920 --> 00:00:51,920
And the third one is the resulting structure of the internet. Let me start with the hierarchy.

8
00:00:51,920 --> 00:00:59,920
When we learned about distance vector and link state algorithms, we were considering the network to be a single collection of routers.

9
00:00:59,920 --> 00:01:07,420
This is really in practical. The internet's made up of millions of routers into connecting over a billion different users.

10
00:01:07,420 --> 00:01:12,420
And so simply for reasons of scale, we need to decompose routing into smaller sets.

11
00:01:12,420 --> 00:01:20,920
So we do this for scale. With a large number of routers, the sheer scale of exchanging routing information

12
00:01:20,920 --> 00:01:29,420
between the routers and keeping it up to date makes it too hard. I mean, imagine exchanging the link state information with a million other routers.

13
00:01:29,420 --> 00:01:34,920
The network would just be flooded with updates all the time. And the distance vector algorithm would never converge.

14
00:01:34,920 --> 00:01:44,920
So that decomposition takes place into different autonomous systems. And there's an example shown here. This would be one autonomous system.

15
00:01:44,920 --> 00:01:51,920
And this autonomous system contains different routers. That's these.

16
00:01:51,920 --> 00:01:56,920
This particular one has one exit point. And we'll see the significance of that in a minute.

17
00:01:56,920 --> 00:02:04,420
And within that autonomous system, the system is free to pick its own interior routing protocol.

18
00:02:04,420 --> 00:02:10,420
In other words, to decide how packets are routed around within this autonomous system.

19
00:02:10,419 --> 00:02:17,419
So this particular type of autonomous system is called a single exit or a stub autonomous system.

20
00:02:17,419 --> 00:02:25,419
There's another type of autonomous system called a multi-exit or multi-exit autonomous system. For example, this one here.

21
00:02:25,419 --> 00:02:32,919
This is one where in this particular case there are three exit points. And again, it's an autonomous system.

22
00:02:32,919 --> 00:02:42,919
So they are free to determine the way in which packets are routed within that autonomous system using the interior routing protocol of their choice.

23
00:02:42,919 --> 00:02:49,419
This is because they're trying to, the internet was designed to give administrative autonomy.

24
00:02:49,419 --> 00:02:57,919
The internet was built up by many different entities. And so an entity over here might be Stanford's network.

25
00:02:57,919 --> 00:03:07,919
Whereas this here might be, for example, a provider like AT&T who is routing our packets to other networks.

26
00:03:07,919 --> 00:03:15,419
And because of the different entities that grew up over time, and there are tens of thousands of them, all with their own individual goals and desires.

27
00:03:15,419 --> 00:03:25,419
One of the original goals of the internet was to allow each organization to independently decide how it would run its own piece of the network, to allow it to organically grow.

28
00:03:25,419 --> 00:03:33,419
And in many ways, this was a big factor in the success of the organic growth of the internet, particularly during the 1990s.

29
00:03:33,419 --> 00:03:38,419
And allow each one to decide what routing protocol it would use inside its network.

30
00:03:38,419 --> 00:03:47,419
So it means that, for example, at Stanford, we might use the interior routing protocol OSPF in order to route our packets.

31
00:03:47,419 --> 00:03:54,419
Whereas inside AT&T, they might use RIP or they might use another one that's called ISIS.

32
00:03:54,419 --> 00:04:03,419
It leads to local customization. It leads to differentiation. So AT&T here might compete with Verizon here.

33
00:04:03,419 --> 00:04:11,419
And they can differentiate and provide a different service. Hopefully for me, the end customer are better service as a result through competition amongst the operators.

34
00:04:11,419 --> 00:04:20,419
And by allowing for local customization, it means the vendors of the routers can also offer different types of features and functionality.

35
00:04:20,420 --> 00:04:30,420
And so it leads to competition amongst the route of vendors as well. So for all these reasons, the internet was divided into autonomous systems.

36
00:04:30,420 --> 00:04:40,420
Autonomous systems or ASIs are the basic unit of hierarchy in the internet. Within an AS, the owner decides how routing is done.

37
00:04:40,420 --> 00:04:50,420
And between ASIs, we must use BGP4. This is the Board of Gateway Protocol. And it's defined by InternetRFC1771.

38
00:04:50,420 --> 00:05:02,420
And this allows for a consistent method for all of the different ASIs to communicate. And we'll be learning about BGP4 in a later video.

39
00:05:02,420 --> 00:05:13,420
If you want to find an AS number, you can do this in a number of ways. One way to do it, actually the simplest is to just do a trace route to a particular destination with the minus a option.

40
00:05:13,420 --> 00:05:19,420
And this should give you the AS numbers of the ones in between.

41
00:05:19,420 --> 00:05:30,420
Most or many enterprises will have a single AS, for example, Stanford's if you find it will be 32, 80 and T's is 797.

42
00:05:30,420 --> 00:05:44,420
Some enterprises choose to break down their own network into multiple autonomous systems, for example, Google has three that are reported and some networks even have dozens.

43
00:05:44,420 --> 00:05:55,420
It's a slightly more complicated way of finding it, but specifically querying would be this way. And that is to query using NetCat NC, if you perform this.

44
00:05:55,420 --> 00:06:02,420
So it's essentially going to this particular who is provider and then entering a particular IP address.

45
00:06:02,420 --> 00:06:07,420
It will tell you the autonomous system that that IP address belongs to.

46
00:06:07,420 --> 00:06:21,420
So if you wanted to find the AS number for Stanford, you would first do a DNS look up for Stanford.edu, find that in its a record, this is the primary address.

47
00:06:21,420 --> 00:06:32,420
Then you can find the autonomous system for that particular IP address by doing this, by entering it here. And then that will return AS 32.

48
00:06:32,420 --> 00:06:39,420
Let me show you a couple of examples of those right now. Let's say I wanted to find the AS number for Stanford.

49
00:06:39,420 --> 00:06:48,420
I could start by looking up the record for Stanford and we can see it here, the primary a record address.

50
00:06:48,420 --> 00:07:00,420
And then I can do the look up to the using NetCat to the who is, this is just folks that provide a particular one that I like.

51
00:07:00,420 --> 00:07:13,420
If I put in the address here for Stanford, and then we'll see it returns the AS of 32 down here in the left hand corner for Stanford.

52
00:07:13,420 --> 00:07:29,420
Similarly, if I wanted to find the AS numbers for the routers along and the networks along the path from my computer to say netflix.com, I could use the trust route minus, trace route, a root minus a option.

53
00:07:29,420 --> 00:07:33,420
And here we go. Let's look at this here.

54
00:07:33,420 --> 00:07:44,420
So at the top we see or near the top we see the AS 32 corresponding to Stanford. Down the bottom we see the AS 2906 corresponding to netflix.

55
00:07:44,420 --> 00:07:58,420
We'll see one here which is AS 65534. This is basically saying that it's a private address 10.33.0.2 because it begins with a 10 as a private IP address used inside Stanford.

56
00:07:58,420 --> 00:08:14,420
So given it's a private address, it's not able to return an AS number. And in the middle here we see 2152 which is a scenic which is the California network that connects us to between Stanford and some outside providers.

57
00:08:14,420 --> 00:08:23,420
Now we know the basic structure. Let's look at the interior routing protocols. I've already mentioned RIP or the routing information protocol.

58
00:08:23,420 --> 00:08:34,420
And this was the first widely used interior routing protocol in the internet. It uses distance vector in particular the distributed bellman fort algorithm.

59
00:08:34,420 --> 00:08:51,420
It's described by an internet RFC. This is actually version two of RIP which is the one most widely used. It sends updates every 30 seconds and will determine that a router has become unavailable if it hasn't heard within 180 seconds or three minutes.

60
00:08:51,419 --> 00:09:00,419
So there are no authentication for updates meaning that there are different needs and some security implications of using RIP.

61
00:09:00,419 --> 00:09:17,419
RIP became popular to start with because it was originally in the BSD version of UNIX and there was a demon that was widely used, widely available for routers that were using RIP.

62
00:09:18,419 --> 00:09:34,419
And that was pronounced Route D and you can find many references to this on the web. So it was widely used for many years. It's used a little less now because of the convergence problems that people have found with RIP.

63
00:09:34,419 --> 00:09:43,419
And it tends to have been mostly replaced by OSPF or ISIS which is very similar to OSPF.

64
00:09:44,419 --> 00:09:53,419
So OSPF is defined in internet RFC 2328 and it's a link state algorithm so link state updates are sent using flooding.

65
00:09:53,419 --> 00:10:06,419
And just in case I didn't say this before we use flooding because during the time that we're trying to find the topology of the network we don't know how to reach anyone so we don't have any topology information.

66
00:10:06,419 --> 00:10:14,419
And that's why we're flooding the link state information so we can't route the link state information to every router because we don't know the path.

67
00:10:14,419 --> 00:10:25,419
So flooding is the simplest routing table free way of making sure that every router in the network finds out the link state.

68
00:10:25,419 --> 00:10:35,419
So that's why flooding is used. It runs Dijkstra's algorithm as we know. The updates are all authenticated meaning that we're sure that they belong to the router that we are communicating with.

69
00:10:36,419 --> 00:10:45,419
Because some autonomous systems are very big it's quite common to partition them down into areas so our own campus network here at Stanford is partitioned into OSPF areas.

70
00:10:45,419 --> 00:10:53,419
It's widely used it's quite complex this is a gross simplification here but it gives us the basic ideas of how OSPF works.

71
00:10:54,419 --> 00:11:06,419
So once we know how to route packets within an autonomous system it's worth asking the question of how do we route them from within an autonomous system to a different autonomous system.

72
00:11:06,419 --> 00:11:22,419
So how do they make it first out of the autonomous system? How does the interior routing protocol isn't going to tell us directly how we exit from an autonomous system because it's dealing with the addresses of routers that are outside of this autonomous system.

73
00:11:22,419 --> 00:11:38,419
So there are already two cases that we need to think about. One is when we're routing to a single exit point so this would be from a stub autonomous system that actually only has one exit point much easier in this case than in the more general case where where there are multiple exit points.

74
00:11:38,419 --> 00:11:45,419
So if there's only one exit point routers within the within the autonomous system can use what's called default routing.

75
00:11:45,419 --> 00:12:04,419
Each router knows all of the prefixes within its autonomous system so it knows all of the prefixes inside the autonomous system and packets for another autonomous system are sent to what's called the default router and the default router is the board of gateway to the next autonomous system.

76
00:12:04,419 --> 00:12:14,419
So it's nice and simple. Essentially says if you see an address in a packet that you don't know what to do with then just forward it to the default router.

77
00:12:14,419 --> 00:12:27,419
And default routing means that the routing tables in the single exit AS is tend to be very small because each router only needs to hold the addresses for the prefixes within its autonomous system.

78
00:12:27,419 --> 00:12:40,419
Otherwise it just forwards them out nice and easy. Life is more complicated when we need to route to multiple exit points so this would be in a transit autonomous system or one where there are multiple exit points.

79
00:12:41,419 --> 00:12:53,419
This has actually become much more common in the last few years because nearly all sizeable enterprises like Stanford will connect at multiple exit points to different providers.

80
00:12:53,419 --> 00:13:09,419
So we might provide we might connect to an educational backbone a research and education network and then we will connect to one or two commercial providers just in case one of them goes down one of them is temporarily unavailable one of them is perhaps too expensive for a particular reason.

81
00:13:09,419 --> 00:13:20,419
It allows us to choose and have control so multi homing is very common now we need to choose for each outgoing packet which exit point it will take.

82
00:13:20,419 --> 00:13:30,419
So the problem here is that each internal router must be told which exit point to use for a given destination prefix. This is the essence of the problem.

83
00:13:31,419 --> 00:13:39,419
That means that when it sees a prefix which is not inside the autonomous system it has to know which exit point to use.

84
00:13:39,419 --> 00:13:55,419
So this means it requires very large routing tables so that potentially routes to every prefix and so the routing tables in a autonomous system with multiple exit points tend to be very very big tens or hundreds of thousands of prefix entries.

85
00:13:56,419 --> 00:14:05,419
This can actually be made a little simpler if the autonomous system uses what's called hot potato routing.

86
00:14:05,419 --> 00:14:17,419
Hot potato routing is when instead of making a smart choice in the best interest of the packet and its destination it simply sends to the closest exit point.

87
00:14:17,419 --> 00:14:26,419
In other words it says for any given router it sends it to the exit point closest to it if it decides it's not for within the autonomous system.

88
00:14:26,419 --> 00:14:41,419
Hot potato routing is also seen as offloading somewhat a selfish act by the autonomous system because it's offloading the packet as quickly as it can to become somebody else's problem and is not very popular with its neighboring autonomous systems.

89
00:14:42,419 --> 00:14:49,419
But it's actually very widely used today in the internet for both commercial reasons and reasons of simplicity.

90
00:14:49,419 --> 00:15:09,419
The more elaborate way would be to pick the exit which is closest to the destination or is on the lowest cost path to the eventual destination and that requires the dissemination of more information within the autonomous system in order to make that decision.

91
00:15:09,419 --> 00:15:19,419
Now we've learned a little bit about how routing goes on within the autonomous system and now want to explain a little bit about the exterior routing protocol BGP4.

92
00:15:19,419 --> 00:15:27,419
Every autonomous system in the internet must interconnect to other autonomous systems using BGP4.

93
00:15:27,419 --> 00:15:33,419
Just like we're required to use IP in order to deliver our packets that's what the internet uses.

94
00:15:33,419 --> 00:15:40,419
The thin waste of routing protocols is BGP4 in other words it's the one that we must all use.

95
00:15:40,419 --> 00:15:50,419
So I'm going to describe BGP4 in a separate video but I just wanted to tell you a little bit about the problems that BGP4 was designed to try and solve.

96
00:15:50,419 --> 00:16:01,419
First of all it has a very different problem for an exterior routing protocol than for an interior routing protocol.

97
00:16:01,419 --> 00:16:12,419
Specifically when we're considering the topology the internet is a very complex mesh of different autonomous systems and has very little structure to it.

98
00:16:12,419 --> 00:16:21,419
You've seen the picture which is the logo for this class and we'll have seen that it's a very unstructured interconnection mesh.

99
00:16:21,419 --> 00:16:28,419
And so trying to exploit that any structure is not going to get us very far.

100
00:16:28,419 --> 00:16:32,419
Each of the autonomous systems is autonomously controlled.

101
00:16:33,419 --> 00:16:39,419
So they might define the link costs in very different ways. So it's not possible to find lowest cost paths.

102
00:16:39,419 --> 00:16:47,419
We're simply going to have to find a set of paths based on the number of autonomous systems that they pass through.

103
00:16:47,419 --> 00:16:55,419
Another thing that we need to consider is trust. When we're going between autonomous systems we'll find that some autonomous systems aren't willing to trust others.

104
00:16:55,419 --> 00:17:02,419
Perhaps they don't trust them to advertise good routes. EG they might be a competitor.

105
00:17:02,419 --> 00:17:11,420
Or they may want to protect the privacy of their traffic. So they might not want to send traffic through another autonomous system.

106
00:17:11,420 --> 00:17:15,420
For example it might be a warring nation.

107
00:17:15,420 --> 00:17:22,420
Another reason that or another thing that BGP4 was set out to solve was the question of independent policies.

108
00:17:22,420 --> 00:17:29,420
So different autonomous systems have different objectives. Some might try to route over the fewest hops.

109
00:17:29,420 --> 00:17:36,420
They may prefer one provider over another. They might have a lower cost arrangement with one provider compared to another.

110
00:17:36,420 --> 00:17:43,420
So they have local policies that they perhaps don't want to share with others. And in general these policies are kept secret.

111
00:17:43,420 --> 00:17:52,420
And so BGP4 is designed to work in a way that will allow for that policy to be a local private matter for the autonomous system.

112
00:17:52,420 --> 00:17:59,420
So we'll see BGP4 in more detail in a different video.

113
00:17:59,420 --> 00:18:08,420
Finally I want to just tell you a little bit about the structure of the internet as we've seen it so far.

114
00:18:08,420 --> 00:18:17,420
So first at the top level there are what we would all recognize as internet service providers.

115
00:18:17,420 --> 00:18:25,420
They might be companies like AT&T. They might be in Japan. It might be NTT.

116
00:18:25,420 --> 00:18:34,420
There's about a dozen of these. What are so called tier one tier one ISPs.

117
00:18:34,420 --> 00:18:41,420
And they are defined as ISPs that are fully mesh interconnected with each other.

118
00:18:41,420 --> 00:18:47,420
And who peer each other without charging each other. It's called settlement free peering.

119
00:18:47,420 --> 00:18:55,420
In other words there's no money that goes across this interface between them.

120
00:18:55,420 --> 00:19:08,420
They then connect down to what are called regional ISPs which might correspond to a state or a county or a region of a country.

121
00:19:08,420 --> 00:19:18,420
And those in turn connect to below them to what are called the access ISPs.

122
00:19:18,420 --> 00:19:23,420
So there would be many access ISPs along the bottom here.

123
00:19:23,420 --> 00:19:34,420
And these would be the ones that we connect to as users. So users are down below these access ISPs down here.

124
00:19:34,420 --> 00:19:39,420
And they will connect up here. And an access ISP might connect to multiple regional ISPs.

125
00:19:39,420 --> 00:19:45,420
And the regional ISPs will generally connect to multiple tier one ISPs.

126
00:19:45,420 --> 00:19:54,420
So this hierarchy is one in which there's a well-defined relationship between each of these entities.

127
00:19:54,420 --> 00:20:04,420
So in general, up above is the provider and below is the customer.

128
00:20:04,420 --> 00:20:10,420
So the provider is providing service to the customer. And that goes on down all the way down.

129
00:20:10,420 --> 00:20:17,420
So in going down this is the provider and this is the customer. And generally the provider will charge the customer.

130
00:20:17,420 --> 00:20:24,420
So in other words, in order to send packets from the regional to the tier, their money is charged, a settlement charge.

131
00:20:24,420 --> 00:20:29,420
Generally they keep track of all the data that's sent over there over some period like a month.

132
00:20:29,420 --> 00:20:33,420
And then they will settle after that time. So there would be money charged in that direction.

133
00:20:33,420 --> 00:20:38,420
But there's no money going in this direction across here.

134
00:20:39,420 --> 00:20:46,420
So in order to save money, it's quite common for the regional ISPs to have connections across here.

135
00:20:46,420 --> 00:20:53,420
So that the packets between access ISPs, if there's a lot of traffic, it can actually go through the regional ISP without going to the tier one.

136
00:20:53,420 --> 00:20:59,420
And therefore they don't need to pay for that.

137
00:20:59,420 --> 00:21:02,420
So this is the basic internet infrastructure.

138
00:21:02,420 --> 00:21:10,420
Tier one ISPs, about a dozen of them around the world. And then regional ISPs generally within a country or within the region of a country.

139
00:21:10,420 --> 00:21:17,420
And then access ISPs to the ones that we connect to in order to get access to the internet.

140
00:21:20,420 --> 00:21:24,420
So in summary, the internet consists of multiple autonomous systems.

141
00:21:24,420 --> 00:21:27,420
ASS is each are managed independently.

142
00:21:27,420 --> 00:21:32,420
And ASS runs its own interior routing protocol. In other words, it chooses the one that it will run.

143
00:21:32,420 --> 00:21:38,420
And in the case of stub ASS, they use simple default router. And so they're very simple.

144
00:21:38,420 --> 00:21:45,420
ASS with multiple exit points must decide the best exit to use when routing packets to other autonomous systems.

145
00:21:45,420 --> 00:21:52,420
ASS must connect to each other using the BGP4 protocol, which we're going to learn about in a future video.

146
00:21:54,420 --> 00:21:56,420
That's the end of this video.

