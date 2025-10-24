---
title: CS144 NetworkP936 9Routing
---

1
00:00:00,000 --> 00:00:04,000
In this unit you learn how to answer the following question.

2
00:00:04,000 --> 00:00:07,000
How should packets from A reach B?

3
00:00:07,000 --> 00:00:14,000
Or in the multicast case, how should packets from A reach B, C, and perhaps other end hosts too?

4
00:00:14,000 --> 00:00:21,000
We started by studying four basic approaches used when routing unicast packets from one end host to another.

5
00:00:21,000 --> 00:00:25,000
First, we can flood packets over every link in the network.

6
00:00:25,000 --> 00:00:31,000
When a packet arrives to a router, it's replicated to all of the interfaces except the one it arrived on.

7
00:00:31,000 --> 00:00:39,000
This guarantees that a flooded packet will eventually traverse every link and will therefore reach any and every end host in the network.

8
00:00:39,000 --> 00:00:46,000
It's clearly very inefficient and expensive and needs to be coupled with a mechanism to prevent packets from looping forever.

9
00:00:46,000 --> 00:00:53,000
Flooding is used during times of uncertainty when the topology is changing and we have no other way to be sure that we can reach every other host.

10
00:00:53,000 --> 00:01:06,000
For example, when OSPF routers are exchanging link state, they flood the link state packets throughout the OSPF domain, so the topology is known to every router even when the topology is changed.

11
00:01:06,000 --> 00:01:16,000
Second, we can use source routing. In source routing, the source host puts into the header of every packet a list of hops the packet should reverse through the network.

12
00:01:16,000 --> 00:01:20,000
Clearly this is possible if the end host knows the entire topology.

13
00:01:21,000 --> 00:01:27,000
Source routing means we don't need to exchange routing table information in the network. The routers don't need to contain a forwarding table at all.

14
00:01:27,000 --> 00:01:36,000
In fact, arguably, source routing is very much in keeping with the strong end to end principle. We shouldn't burden the network with having to know all the parts.

15
00:01:36,000 --> 00:01:43,000
But in practice, source routing is rarely used for a number of reasons. The biggest reason is security.

16
00:01:43,000 --> 00:01:53,000
Network operators don't like source routing because it requires them to expose the full topology of their network and to open it up so end hosts can send packets wherever they want.

17
00:01:53,000 --> 00:02:04,000
The internet designers felt it was a worthwhile optimization for the routers to maintain a forwarding table to avoid having to distribute full up to date topology information to all the end hosts.

18
00:02:04,000 --> 00:02:09,000
Third, the routers can contain forwarding tables, which they clearly do today.

19
00:02:09,000 --> 00:02:22,000
Rather than relying on the source to provide the routing information, the forwarding table in the router contains the address of the destination and an indication of which interface to exit the router in order to move one step closer to the destination.

20
00:02:22,000 --> 00:02:30,000
Today all ethernet switches and internet routers use forwarding tables. The job of the routing algorithm is to populate the forwarding tables.

21
00:02:31,000 --> 00:02:39,000
Finally, you learn how unicast routing algorithms usually build a spanning tree with the destination at the root of the tree.

22
00:02:39,000 --> 00:02:48,000
It's a tree because we don't want loops. It's spanning because it provides a way for all source end hosts to reach a given destination.

23
00:02:48,000 --> 00:02:58,000
Generally speaking, routing algorithms used in the internet such as OSPF and RIP, populate the forwarding tables so as to create a spanning tree across the network.

24
00:02:59,000 --> 00:03:08,000
Usually the spanning tree we build is a minimum cost spanning tree, where we're trying to minimize the hop count delay or the distance traveled by packets.

25
00:03:08,000 --> 00:03:13,000
You learned about two algorithms widely used to build the forwarding tables in routers.

26
00:03:13,000 --> 00:03:18,000
The first is the Belman-Ford algorithm, which is usually referred to as a distance vector algorithm.

27
00:03:18,000 --> 00:03:23,000
Each router constructs a vector of distances from itself to every other router in the network.

28
00:03:24,000 --> 00:03:30,000
In successive steps, the routers exchange their vectors so as to find the neighbor that it's closest to each destination.

29
00:03:30,000 --> 00:03:43,000
After a number of iterations, equal to no more than the longest loop free path in the topology, the algorithm will settle on a set of forwarding tables in each router that tells it how to route packets along as short as path to every destination.

30
00:03:43,000 --> 00:03:51,000
The Belman-Ford algorithm was the basis for RIP, the routing information protocol, which is the first widely used routing algorithm in the internet.

31
00:03:51,000 --> 00:03:57,000
The good thing about RIP is that its algorithm is distributed, the routers work together to build a complete set of forwarding tables.

32
00:03:57,000 --> 00:04:02,000
This is important in the early days of the internet when the routers were seemed to have very little computing power.

33
00:04:02,000 --> 00:04:08,000
However, RIP has many problems trying to converge on the right answer when the network topology is changing.

34
00:04:08,000 --> 00:04:16,000
We saw examples of the so-called counting to infinity problem in which bad news travels slowly, and methods such as Poisson refers to trying to overcome it.

35
00:04:17,000 --> 00:04:25,000
Today, RIP is rarely used and has mostly been replaced by OSPF and an algorithm called ISIS, ISIS.

36
00:04:25,000 --> 00:04:30,000
OSPF is based on the second algorithm, the extra shortest path first algorithm.

37
00:04:30,000 --> 00:04:38,000
The extra third algorithm assumes that every router has the computational power to instruct its own routing table if it is given a complete topology.

38
00:04:38,000 --> 00:04:44,000
The routers learn the topology by exchanging links data information, basically a binary indication in which links are present in working.

39
00:04:45,000 --> 00:04:51,000
Once they have the topology, every router sets about calculating its own forwarding table so as to reach every other end-hosts in network.

40
00:04:51,000 --> 00:04:58,000
The extra algorithm is as subtively simple as fast. As a result, OSPF is very widely used in enterprises and college campuses today.

41
00:05:03,000 --> 00:05:07,000
In addition to RIP and OSPF, we started four other aspects at routing.

42
00:05:08,000 --> 00:05:16,000
You learn how the internet uses hierarchical routing to break routing down into more manageable, locally controlled problems, each autonomous system or AS.

43
00:05:16,000 --> 00:05:23,000
Chooses an interdomain routing algorithm throughout packets inside its AS, for example, Stanford uses OSPF on campus.

44
00:05:23,000 --> 00:05:31,000
Every AS is required to use BGP, the Border Gateway Protocol, in order to exchange routing information with other ASs in the internet.

45
00:05:32,000 --> 00:05:38,000
BGP is the only sanctioned way to exchange routing information between autonomous systems in the internet today.

46
00:05:38,000 --> 00:05:47,000
Basically, every AS advertises its neighbors. To its neighbors, the path packets will reach to every prefix in the internet.

47
00:05:47,000 --> 00:05:52,000
The path is the set of the S's, the packet will pass through along the way.

48
00:05:52,000 --> 00:06:00,000
We learned how every BGP router can use a locally defined policy to decide which route advertisement to accept and use to route packets.

49
00:06:01,000 --> 00:06:10,000
You also learned briefly about multi-cast routing. Multicast routing is an optimization added to a network to avoid the source having to send a packet multiple times to set up destinations.

50
00:06:10,000 --> 00:06:18,000
Multicast was all the rage in the 1990s because they was thought that many applications, such as internet TV, would use multi-cast delivery.

51
00:06:18,000 --> 00:06:26,000
Although many requests, many RIP multi-cast routing algorithms were invented and standardized as you learn in the video, they are not widely used today.

52
00:06:26,000 --> 00:06:35,000
This is because most applications and services, such as video streaming, offer us the convenience of streaming us what we want, when we want, with single eunicast connection.

53
00:06:35,000 --> 00:06:43,000
Both of the time, there are far too few people watching the same video at the same time for it to be worth supporting the optimization in the network.

54
00:06:43,000 --> 00:06:53,000
Finally, we learned about the spanning tree protocol. This isn't actually internet routing protocol per se because it is a mechanism used by Ethernet networks to avoid creating routing loops.

55
00:06:53,000 --> 00:07:02,000
The spanning tree protocol allows a set of switches to construct a single spanning tree with one switch at the root in order to prevent packets from looping in the network.

