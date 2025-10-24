---
title: CS144 NetworkP846 0Routing
---

1
00:00:00,000 --> 00:00:05,000
So welcome to Unit 6. Unit 6 is about routing.

2
00:00:05,000 --> 00:00:12,000
So the basic question of how do we get a packet from A to B across a large network such as the Internet?

3
00:00:12,000 --> 00:00:18,000
We've already been implicitly assuming that there was a way for packets to be delivered for one side of the Internet to the other,

4
00:00:18,000 --> 00:00:23,000
and all of the exercises, assignments, videos that we've been working on so far.

5
00:00:23,000 --> 00:00:30,000
Now we're actually going to look at the methods and the approaches that we can use to forward and route those packets through the Internet.

6
00:00:30,000 --> 00:00:38,000
So there's a very obvious place to start, and that is one of each packet contained a list of all the routers that it was going to pass through,

7
00:00:38,000 --> 00:00:43,000
and then just found its own way through the network, just with the state entirely contained within the packet.

8
00:00:43,000 --> 00:00:47,000
That would work. That's one way to do it. But it's not how the Internet works.

9
00:00:47,000 --> 00:00:54,000
That method, what we call source routing, was considered to be both inefficient and potentially a security loophole.

10
00:00:54,000 --> 00:01:01,000
And we'll see that in the videos coming up. Instead, as you know, Internet uses forning tables.

11
00:01:01,000 --> 00:01:10,000
Each router contains a forning table that tells it for each destination prefix which path or which next hop to send a packet to.

12
00:01:10,000 --> 00:01:15,000
And so the next question to ask is, how do those forning tables get populated?

13
00:01:15,000 --> 00:01:27,000
For that, we use an algorithm. And that algorithm runs as a distributed algorithm so that the routers can come to a conclusion as to the entries that they will put into those forning tables.

14
00:01:27,000 --> 00:01:36,000
The basic approach that gets used is that the routers will build a spanning tree. Spanning tree is a tree, therefore it has no loops,

15
00:01:36,000 --> 00:01:41,000
and it's spanning and it provides a way for every source to reach a given destination.

16
00:01:41,000 --> 00:01:49,000
So the root of the tree is at the destination, and the leaves are all of the other sources so that they can send on the spanning tree to reach that destination.

17
00:01:49,000 --> 00:01:57,000
So the routers now have to build that spanning tree. And there are two well-known algorithms that will be describing and upcoming videos,

18
00:01:57,000 --> 00:02:03,000
and how those forning table entries get built in order to create that spanning tree.

19
00:02:03,000 --> 00:02:08,000
The first one is called the Bellman Ford algorithm, also known as a distance vector algorithm.

20
00:02:08,000 --> 00:02:12,000
And you'll see why it's called a distance vector in an upcoming video.

21
00:02:12,000 --> 00:02:20,000
The alternative method, which is now more widely used, is called Dijkstra's algorithm, or Dijkstra's shortest path first algorithm.

22
00:02:20,000 --> 00:02:27,000
And this is known as a link state algorithm. And again, you'll see that described in detail in an upcoming video.

23
00:02:27,000 --> 00:02:31,000
You're also going to see how these algorithms are actually used in the internet today.

24
00:02:31,000 --> 00:02:38,000
Well, first off, the internet is a collection of many different parties, each with their own networks, which are somehow interconnected.

25
00:02:38,000 --> 00:02:44,000
So we're going to talk a little bit about the notion of an autonomous system, an administrative domain of routing within the internet.

26
00:02:44,000 --> 00:02:47,000
For example, Stanford is an autonomous system. It's actually multiple ones.

27
00:02:47,000 --> 00:02:52,000
Like the Stanford linear accelerator is its own autonomous system, and there's the main Stanford campus.

28
00:02:52,000 --> 00:02:59,000
Many large ISPs in fact might have multiple ASS. Not a huge number of multiple autonomous systems are ASS.

29
00:03:00,000 --> 00:03:05,000
And there are different kinds of ASS. For example, Stanford doesn't route trends at traffic across the internet.

30
00:03:05,000 --> 00:03:08,000
It acts as an edge AS or a stub AS.

31
00:03:08,000 --> 00:03:13,000
So within an autonomous system, there are two basic routing algorithms that are used.

32
00:03:13,000 --> 00:03:19,000
RIP and OSPF. RIP is a distance vector protocol, whereas OSPF is a link state protocol.

33
00:03:19,000 --> 00:03:26,000
Generally, today, almost everyone uses OSPF in order to find their routing tables within an autonomous system.

34
00:03:27,000 --> 00:03:29,000
It is, for example, with Stanford users.

35
00:03:29,000 --> 00:03:36,000
But then the routing between autonomous systems uses a different protocol, BGP, or the order gateway protocol.

36
00:03:36,000 --> 00:03:41,000
It turns out that often autonomous systems don't necessarily want to expose it to their internal network as like.

37
00:03:41,000 --> 00:03:49,000
And so just doing a shortest path can be tricky. So instead, BGP adds some additional mechanisms, like actually knowing the path that packets my tape.

38
00:03:49,000 --> 00:03:58,000
In order that to allow autonomous systems to sort of hide their internals, we'll get enough information that routers can pick.

39
00:03:58,000 --> 00:04:05,000
And so, suddenly, we've so far been talking mostly about applications and transport and all these things happening into end.

40
00:04:05,000 --> 00:04:14,000
This is the unit we're going to look inside the middle and see what is, or actually, the pieces of work and the mechanisms and the algorithms to make the internet work as it does today.

41
00:04:14,000 --> 00:04:22,000
And so when you come to the end of this unit, you should have a very good idea of the different strategies that we can take in order to route packets from A to B.

