---
title: CS144 NetworkP1168 3Layer3Attacks
---

1
00:00:00,000 --> 00:00:07,000
In this video, we'll look at some common attacks that can be performed on layer 3 or IP networks.

2
00:00:07,000 --> 00:00:10,000
We will look at three common types of layer 3 attack.

3
00:00:10,000 --> 00:00:17,000
It might surprise you to see how simple these attacks are and you might be left wondering why we don't see even more attacks than we do.

4
00:00:17,000 --> 00:00:22,000
The first type of attack uses ICMP, the Internet Control Message Protocol.

5
00:00:22,000 --> 00:00:28,000
Recall that ICMP is used to convey information from the network back to the source, telling it how the network is doing.

6
00:00:28,000 --> 00:00:35,000
For example, a router can send a TTL expired message back to the source to tell it that a TTL was decremented to zero.

7
00:00:35,000 --> 00:00:44,000
Or a router might use ICMP to tell the source host that a destination was unreachable, which means the router has no entry for the destination in its forwarding table.

8
00:00:45,000 --> 00:00:52,000
Another type of ICMP message tells the source to send its messages via another router. I'll explain how it works in the next slide.

9
00:00:52,000 --> 00:00:57,000
There are lots of types of attack that use BGP and we'll look at a couple of them here.

10
00:00:57,000 --> 00:01:03,000
The first is called BGP hijacking and sometimes it's just called IP hijacking.

11
00:01:03,000 --> 00:01:14,000
BGP attacks take advantage of the fact that neighboring ISPs trust one another to provide accurate information about the AS path to follow in order to reach a destination prefix.

12
00:01:14,000 --> 00:01:22,000
When two BGP peers start up, they create a TCP session over which they pass route advertisements and withdrawals.

13
00:01:23,000 --> 00:01:29,000
Once the session is initiated, they trust each other to provide the true information about paths.

14
00:01:29,000 --> 00:01:41,000
If an ISP is badly behaved or if someone manages to break into the TCP session and massagerade as a legitimate ISP, then it is quite easy to redirect traffic, for example.

15
00:01:41,000 --> 00:01:47,000
An ISP can advertise a prefix belonging to someone else capturing their traffic.

16
00:01:47,000 --> 00:01:59,000
Or an ISP can advertise an invalid AS path sending the IP traffic to a non-existent destination where it is dropped, creating what is called a black hole for the traffic.

17
00:01:59,000 --> 00:02:09,000
And because BGP routers only appear with neighboring BGP routers, the most likely way for a BGP attack to happen is when an ISP is badly behaved.

18
00:02:09,000 --> 00:02:19,000
It is quite hard for an attacker to persuade a BGP router to start a session with it, the routers are hard coded to only talk to particular peers.

19
00:02:19,000 --> 00:02:26,000
However, on occasion, an attacker will manage to take over an ongoing TCP session without either party knowing.

20
00:02:26,000 --> 00:02:30,000
We'll explore how that might work in a later video.

21
00:02:31,000 --> 00:02:41,000
Another closely related BGP attack is when an ISP inserts a more specific prefix to divert just a portion of an address space.

22
00:02:41,000 --> 00:02:49,000
Again, this requires the attacker to masquerade as an ISP or to take over a BGP TCP session.

23
00:02:49,000 --> 00:02:55,000
Let's first see how a legitimate ICMP reader at works, then we'll look at how an attacker can exploit it.

24
00:02:56,000 --> 00:03:01,000
Alice is connected to her company's network, which is connected to the public internet via router.

25
00:03:01,000 --> 00:03:05,000
Alice wants to send a packet to her colleague Bob, who works at the same company.

26
00:03:05,000 --> 00:03:08,000
They are connected via the company's private network.

27
00:03:08,000 --> 00:03:12,000
Alice's computer is configured with router 1 as the default router.

28
00:03:12,000 --> 00:03:22,000
In other words, packets destined for a different subnet will be sent via router 1, but actually her packets to Bob should really go via router 2 instead.

29
00:03:22,000 --> 00:03:29,000
When the packet arrives to router 1, it notices that the packet is routed back to the interface it arrived on.

30
00:03:29,000 --> 00:03:33,000
This tells router 1 that Alice sent the packet to the wrong router.

31
00:03:33,000 --> 00:03:36,000
Router 1 forwards the packet to router 2.

32
00:03:36,000 --> 00:03:45,000
And then sends an ICMP reader a message to Alice to tell her to send packets to Bob via router 2 in future.

33
00:03:45,000 --> 00:03:49,000
Alice's computer adds a new routing entry in its local routing table.

34
00:03:49,000 --> 00:03:55,000
Next time Alice has a packet to Bob, her computer sends it to router 2 instead.

35
00:03:55,000 --> 00:04:03,000
This is how ICMP reader X are supposed to work, and all is good in this particular example.

36
00:04:03,000 --> 00:04:06,000
Until an attacker comes along.

37
00:04:06,000 --> 00:04:16,000
The attacker can send an ICMP reader a message to Alice to tell her to route packets to prefix a via the attacker's computer instead.

38
00:04:16,000 --> 00:04:23,000
And so when Alice sends a packet to Bob, her computer sends it to the attacker instead.

39
00:04:23,000 --> 00:04:29,000
The attacker might choose to drop the packet, denying Alice from being able to communicate with Bob,

40
00:04:29,000 --> 00:04:37,000
or the attacker might look at the packet before forwarding it to Bob, creating a man in the middle attack.

41
00:04:37,000 --> 00:04:43,000
BGP attacks exploit one or more security vulnerabilities in BGP.

42
00:04:43,000 --> 00:04:49,000
The first vulnerability is that an AS can advertise IP addresses that it doesn't own.

43
00:04:49,000 --> 00:04:56,000
This means it can advertise IP addresses that belong to another AS, and therefore creates curious problems.

44
00:04:56,000 --> 00:05:00,000
As you can imagine, this is a major vulnerability in BGP.

45
00:05:00,000 --> 00:05:04,000
An AS cannot tell if an advertisement is legitimate or not.

46
00:05:04,000 --> 00:05:08,000
Furthermore, an AS cannot verify that an AS path is correct.

47
00:05:08,000 --> 00:05:18,000
There is no way for a BGP router to know if the sequence of AS is leading to an advertised prefix actually leads to the correct destination or not.

48
00:05:18,000 --> 00:05:23,000
ISPs exchange BGP messages over a regular TCP session.

49
00:05:23,000 --> 00:05:29,000
If an attacker is able to take over the TCP session, or inject packets into the session undetected,

50
00:05:29,000 --> 00:05:37,000
then it can cause incorrect AS paths to be advertised, and can hijack portions of the address space.

51
00:05:37,000 --> 00:05:50,000
One thing that is very surprising to many people that is even today, almost any ISP can bring down the internet by advertising bad routes, either accidentally or maliciously.

52
00:05:50,000 --> 00:05:56,000
Let's look at some famous cases of when BGP problems caused huge problems in the internet.

53
00:05:56,000 --> 00:06:04,000
Perhaps the most celebrated case happened in 2008 when Pakistan Telecom tried to block access to YouTube inside Pakistan.

54
00:06:04,000 --> 00:06:12,000
Instead of making local changes, the ISP inadvertently propagated false BGP advertisements throughout the internet.

55
00:06:12,000 --> 00:06:18,000
In fact, many thousands of routing entries were injected into the internet routing system in just a few minutes.

56
00:06:18,000 --> 00:06:25,000
Almost the entire internet melted down, with YouTube being effectively incapacitated for several hours.

57
00:06:26,000 --> 00:06:34,000
In 2004, an ISP in Malaysia called Data1 is believed to have mounted a malicious attack on Yahoo to try and block it.

58
00:06:34,000 --> 00:06:44,000
All the way from Malaysia, they were able to easily hijack two of Yahoo's Santa Clara prefixes, making Yahoo's data centers in operable.

59
00:06:44,000 --> 00:06:54,000
In 2003, Spammers deliberately hijacked a block of IP addresses allocated Northrop Grownham, a large US-based security contractor for the government.

60
00:06:54,000 --> 00:07:01,000
Once they had hijacked a portion of the IP address space, they used the addresses to launch huge amounts of Spam.

61
00:07:01,000 --> 00:07:13,000
And in 2004, TETNet, a Turkish ISP, sent full BGP routing tables announcing to everyone in the world that Turkey is the best path to everywhere in the internet.

62
00:07:13,000 --> 00:07:20,000
All of a sudden, almost the entire internet tried to route via Turkey, and you can imagine what chaos it created.

63
00:07:20,000 --> 00:07:23,000
Most of the internet didn't work for hours.

64
00:07:24,000 --> 00:07:35,000
A similar problem almost happened in 2008 when CTPC in Brazil sent full BGP routing tables that would have hijacked almost every carrier's IP address block.

65
00:07:35,000 --> 00:07:39,000
Luckily, a BGP monitoring system noticed just in time.

66
00:07:39,000 --> 00:07:44,000
Many people believed it was a malicious attack aimed at blocking Yahoo.

67
00:07:44,000 --> 00:07:51,000
There are many, many more that happen every day, mostly too small to make the headlines, but some are very large.

68
00:07:52,000 --> 00:07:59,000
The network is almost as vulnerable today as it was in 2004, with very few new security improvements.

69
00:08:01,000 --> 00:08:05,000
One ISP can hijack the address block of another very easily.

70
00:08:05,000 --> 00:08:17,000
Consider Alice in AS1 sending her packets to Bob, who is attached to prefix A, somewhere across the internet, on the right hand side, in AS3. Many AS is away.

71
00:08:17,000 --> 00:08:26,000
Alice's neighboring AS2 advertises correctly that the best path to Bob in AS3 is via AS2.

72
00:08:31,000 --> 00:08:34,000
The attacker has a different idea.

73
00:08:34,000 --> 00:08:40,000
The attacker is able to take over and control the BGP router in ASEvil.

74
00:08:41,000 --> 00:08:49,000
Once the attacker has control of the BGP sessions between ASEvil and AS2, it can advertise new false AS paths.

75
00:08:49,000 --> 00:08:59,000
For example, it can advertise a path saying that the 16-bit prefix 171.64 can be reached via ASEvil instead.

76
00:09:00,000 --> 00:09:07,000
AS1 has no way of knowing that this is a lie, and so might start routing traffic to ASEvil instead.

77
00:09:08,000 --> 00:09:18,000
The attacker might choose to drop all the packets, making it impossible for Alice to talk to Bob, or the attacker might establish a man in the middle attack without Alice or Bob knowing.

78
00:09:20,000 --> 00:09:27,000
If the attacker doesn't want to arouse too much suspicion, it doesn't have to take over the whole of that 16-bit prefix.

79
00:09:28,000 --> 00:09:39,000
For example, if instead the attacker injects a 24-bit prefix 171.64.74, then only a portion of the traffic will be diverted via the attackers AS.

80
00:09:40,000 --> 00:09:51,000
All of the attacks on BGP that I showed you require the attacker to first compromise one AS, then use the trust between AS's to inject false advertisements into the other AS's.

81
00:09:51,000 --> 00:10:02,000
But what if the attacker can insert itself in between the two BGP peers without them knowing this would allow it to inject false routes without anyone knowing? That's doubly scary.

