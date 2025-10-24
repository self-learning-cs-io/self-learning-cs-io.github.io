---
title: CS144 NetworkP1087 12LowerLayersrecap
---

1
00:00:00,000 --> 00:00:06,000
By now you've heard it said several times during the quarter that IP is the narrow waste of the internet.

2
00:00:06,000 --> 00:00:09,000
You probably remember this figure from Unit 1.

3
00:00:09,000 --> 00:00:15,000
If we want to use the internet, we have to use the internet protocol IP. We have no choice.

4
00:00:15,000 --> 00:00:18,000
But we have lots and lots of choices for Link Layer.

5
00:00:18,000 --> 00:00:24,000
IP runs over many, many different Link Layers such as Ethernet, Wi-Fi, DSL, 3G Cellular and so on.

6
00:00:24,000 --> 00:00:28,000
On top of the unreliable IP layer, we can choose between many different transport layers.

7
00:00:29,000 --> 00:00:32,000
In this unit, you learn about different Link Layers.

8
00:00:32,000 --> 00:00:37,000
You learn about the Link Layer Service model, how Ethernet works, including the different speeds it runs at.

9
00:00:37,000 --> 00:00:44,000
You watch several videos about wireless networks, why wireless is different, and why we need medium access control protocols to share access to the air.

10
00:00:44,000 --> 00:00:50,000
You learn about Shannon Capacity, and how it helps us determine the maximum data rate or capacity of a communication channel.

11
00:00:50,000 --> 00:00:53,000
And you learn about error connection, correction mechanisms.

12
00:00:54,000 --> 00:00:58,000
We started by exploring the most commonly used wired network, Ethernet.

13
00:00:58,000 --> 00:01:03,000
If you've ever physically plugged your computer into a network, it was almost certainly an Ethernet network.

14
00:01:03,000 --> 00:01:13,000
Although many different wired networks are proposed in the 1990s, and several were standardized, built and sold, Ethernet won the day and has now almost universally used for wired networks.

15
00:01:13,000 --> 00:01:17,000
This is because it is very simple, cheap, and reliable.

16
00:01:18,000 --> 00:01:21,000
In a switched Ethernet network, when you have data descend, you can just go ahead and send it.

17
00:01:21,000 --> 00:01:25,000
The network learns addresses, so there are no complicated routing protocols to worry about.

18
00:01:25,000 --> 00:01:31,000
Ethernet runs over the wiring that is installed in almost every office building, making it very easy to install.

19
00:01:31,000 --> 00:01:39,000
Nowadays, almost all Ethernet networks use. You use Ethernet switches, allowing many simultaneous coming-in communications in the same network.

20
00:01:39,000 --> 00:01:44,000
And every link is full duplex, allowing data to flow in both directions at the same time.

21
00:01:44,000 --> 00:01:50,000
In the next few years, we will start to see 40 gigabit per second, Ethernet, 100 gigabit per second, Ethernet, and beyond.

22
00:01:50,000 --> 00:01:55,000
Ethernet looks certain to remain the dominant wired link layer for years to come.

23
00:01:57,000 --> 00:02:01,000
All link layers have a maximum packet size they can carry.

24
00:02:01,000 --> 00:02:05,000
For Ethernet, this is 1500 bytes by default.

25
00:02:05,000 --> 00:02:12,000
Other link layers can carry larger packets, such as the FDDI standard of the 1990s, they carry packets up to 4,500 bytes long.

26
00:02:13,000 --> 00:02:19,000
Some Ethernet networks are configured to carry so-called jumbo frames of the 9kb long.

27
00:02:19,000 --> 00:02:26,000
We call the longest packet a link can carry its Mtu, or maximum transmission unit.

28
00:02:26,000 --> 00:02:36,000
When a router interconnects two links with different Mtu's, it might need to fragment IP datagrams going from the link with a larger Mtu to the smaller one.

29
00:02:36,000 --> 00:02:45,000
You learn how a router does this using the fragment fields in the IPv4 header to break IP datagrams into new self-contained IP datagrams.

30
00:02:45,000 --> 00:02:48,000
The network doesn't reassemble the fragments.

31
00:02:48,000 --> 00:02:58,000
The destination host uses information in the IPv4 header to put the data back into the correct order before handling it to TCP or UDP, or ICMP.

32
00:02:59,000 --> 00:03:03,000
IP fragmentation is less common than it used to be, for two reasons.

33
00:03:03,000 --> 00:03:11,000
First, most wired networks use Ethernet today, and so the Mtu tends to be 1500 bytes on most links, and there is no need to fragment.

34
00:03:11,000 --> 00:03:18,000
Second, host often use Mtu discovery when creating a TCP connection to identify the shortest Mtu along the path.

35
00:03:18,000 --> 00:03:25,000
The senders don't send packets larger than the Mtu, eliminating the need for fragmentation along the way.

36
00:03:25,000 --> 00:03:34,000
When we talked about MSS or maximum segment size of a transport protocol, it uses this Mtu discovery protocol.

37
00:03:34,000 --> 00:03:38,000
Wireless networks are very different from wired ones.

38
00:03:38,000 --> 00:03:45,000
In a wired network, the links of a constant data rate, but in a wireless network, the link speed is always changing.

39
00:03:45,000 --> 00:03:47,000
This, for several reasons.

40
00:03:47,000 --> 00:03:54,000
Interference from nearby wireless networks, and from other devices operating in the same frequency bands such as microwave ovens and cordless phones.

41
00:03:54,000 --> 00:03:58,000
It can also be caused by fades in the channel to the shadowing and multi-path.

42
00:03:58,000 --> 00:04:02,000
Wireless networks also suffer from the so-called hidden terminal problem.

43
00:04:02,000 --> 00:04:08,000
This happens when two clients can't communicate directly with each other, but both can communicate with an access point.

44
00:04:08,000 --> 00:04:15,000
Because they don't hear each other, they don't know how to avoid transmitting at the same time, and require extra coordination in the network.

45
00:04:15,000 --> 00:04:21,000
Another way in which wireless networks are different is that the channel naturally broadcasts all communications.

46
00:04:21,000 --> 00:04:30,000
This means senders need to take turns to transmit, leading to medium access control protocols such as the CSMA protocol used in Wi-Fi.

47
00:04:30,000 --> 00:04:35,000
A shared broadcast channel also means we need to be more careful about securing our data.

48
00:04:35,000 --> 00:04:41,000
Everyone in the neighborhood can more easily eavesdrop on our conversation than in a wired network.

49
00:04:41,000 --> 00:04:47,000
You also learn some of the underlying principles of communications that dictate how we build physical links.

50
00:04:48,000 --> 00:04:58,000
You learn about bid errors and how they can lead us to incorrectly decode a packet on the wire, and you learn about ways to code data to make it easier to detect errors when they happen.

51
00:04:58,000 --> 00:05:03,000
And you learn about how error correcting codes work and when we use them.

52
00:05:03,000 --> 00:05:16,000
Generally speaking, we use error correcting codes in environments where bid errors are frequent, or where the cost of retransmitting a corrupted packet would be high, for example, in a network with a very large bandwidth delay product.

53
00:05:16,000 --> 00:05:21,000
Finally, but perhaps most importantly of all, you learn about Shannon capacity.

54
00:05:21,000 --> 00:05:34,000
Claude Shannon created the wonderfully powerful field of information theory, and the centerpiece of his work was deducing the maximum error-free rate that a channel can communicate at, now referred to as the Shannon capacity.

55
00:05:34,000 --> 00:05:44,000
The remarkable property of the Shannon capacity is that it gives us a fundamental, inescapable limit to the maximum rate information can be carried over a channel.

56
00:05:45,000 --> 00:05:49,000
Regardless of the clever coding schemes we invent.

57
00:05:49,000 --> 00:06:00,000
All of the communication principles we describe give you a taste of some of the material you will learn in an electrical engineering class on communications theory or information theory.

58
00:06:00,000 --> 00:06:05,000
If you really enjoyed this material, you might consider taking EE classes in the future.

