---
title: CS144 NetworkP1128 2aMACOverflowAttack
---

1
00:00:00,000 --> 00:00:05,000
In this video, I'm going to show you a demo of a Mac overflow attack.

2
00:00:05,000 --> 00:00:11,000
In the demo, Eve the attacker is going to eavesdrop on Alice's traffic to Bob,

3
00:00:11,000 --> 00:00:15,000
even though Alice and Eve are not connected to the same switch.

4
00:00:15,000 --> 00:00:18,000
As you'll remember, and just as we saw in the last video,

5
00:00:18,000 --> 00:00:22,000
Eve is going to send lots of Ethernet packets with new addresses

6
00:00:22,000 --> 00:00:25,000
to force the forwarding tables in the switches to overflow,

7
00:00:25,000 --> 00:00:29,000
so that Alice's traffic to Bob is going to be broadcast.

8
00:00:30,000 --> 00:00:34,000
Eve will then be able to eavesdrop and listen in on the traffic.

9
00:00:36,000 --> 00:00:38,000
Let's see how this works.

10
00:00:39,000 --> 00:00:43,000
The demo I'm going to show you next runs on the MiniNet Emulation system,

11
00:00:43,000 --> 00:00:47,000
which means you can easily and safely run it yourself on your own computer

12
00:00:47,000 --> 00:00:49,000
and I'll tell you shortly how you do that.

13
00:00:49,000 --> 00:00:54,000
It also means the same code can easily be replicated into a real network.

14
00:00:54,000 --> 00:00:58,000
The demo was created by TYFY and a PhD student here at Stanford.

15
00:00:59,000 --> 00:01:04,000
First, let's verify that under normal conditions, Eve can't eavesdrop on Alice.

16
00:01:04,000 --> 00:01:10,000
There are three windows on the screen representing Alice, Bob, and Eve at the bottom.

17
00:01:10,000 --> 00:01:14,000
Alice is sending things to Bob while Eve is running TCP-DOM on her machine,

18
00:01:14,000 --> 00:01:19,000
listening for traffic from Alice's IP address, 10.0.0.1.

19
00:01:19,000 --> 00:01:22,000
As you can see, TCP-DOM doesn't capture any traffic,

20
00:01:22,000 --> 00:01:24,000
and Eve doesn't hear anything at all,

21
00:01:24,000 --> 00:01:26,000
so we know the learning mechanism is working just fine,

22
00:01:26,000 --> 00:01:28,000
and no traffic is being broadcast.

23
00:01:30,000 --> 00:01:34,000
Next, Eve runs an attack in which she overwhelms the network with new,

24
00:01:34,000 --> 00:01:36,000
randomly generated Ethernet addresses.

25
00:01:36,000 --> 00:01:41,000
The switch dutifully learns them all until its forwarding table fills up and overflows,

26
00:01:41,000 --> 00:01:44,000
evicting the learned Ethernet address of Alice's server.

27
00:01:44,000 --> 00:01:48,000
Alice is still sending things to Bob, and then now being broadcast,

28
00:01:48,000 --> 00:01:53,000
the TCP-DOM running on Eve's machine can see the packets and reports them on the screen.

29
00:01:53,000 --> 00:01:58,000
It doesn't see all of them, because occasionally the switch will successfully learn Alice's address,

30
00:01:58,000 --> 00:02:05,000
but it's quickly evicted again because of the onslaught of new Ethernet packets from Eve.

31
00:02:05,000 --> 00:02:07,000
When Eve stops generating new Ethernet addresses,

32
00:02:07,000 --> 00:02:10,000
the switch relers Alice's Ethernet address,

33
00:02:10,000 --> 00:02:13,000
and it can stop broadcasting the traffic between Alice and Bob.

34
00:02:13,000 --> 00:02:17,000
That way, Eve will no longer be able to hear their traffic.

35
00:02:17,000 --> 00:02:21,000
If you'd like, you can reproduce this demo yourself by downloading the Mininet script

36
00:02:21,000 --> 00:02:23,000
from the URL at the bottom of the screen,

37
00:02:23,000 --> 00:02:27,000
and then just simply run it in a Mininet instance on your computer.

