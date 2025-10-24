---
title: CS144 NetworkP1118 2Layer2Attacks
---

1
00:00:00,000 --> 00:00:04,320
In this video, we're going to look at some common attacks that can be performed by

2
00:00:04,320 --> 00:00:08,400
compromising local networks, usually running at layer 2.

3
00:00:08,400 --> 00:00:13,839
Eavesdropping is quite easy if we put our network interface into Pramyskios mode.

4
00:00:13,839 --> 00:00:17,960
In Pramyskios mode, your network interface will capture all of the packets passing by,

5
00:00:17,960 --> 00:00:21,039
not just those addressed to your Ethernet address.

6
00:00:21,039 --> 00:00:24,920
Computers allow this mode of operation so that they can act as an Ethernet switch.

7
00:00:24,920 --> 00:00:29,560
For example, the Linux operating system comes with Ethernet switching code built in.

8
00:00:29,959 --> 00:00:36,439
When Wireshark runs, it first puts your interface into Pramyskios mode so that it can see all the packets.

9
00:00:36,439 --> 00:00:41,359
This is particularly easy in a Wi-Fi network and early Ethernet networks where packets were broadcast

10
00:00:41,359 --> 00:00:43,759
onto a single shared link.

11
00:00:43,759 --> 00:00:47,519
It doesn't work so well with modern Ethernet networks that use Ethernet switches,

12
00:00:47,519 --> 00:00:52,000
because packets are usually private to the links between the source and the destination.

13
00:00:52,000 --> 00:00:57,719
In this video, I'll show you how we can force packets to be broadcast in any Ethernet network

14
00:00:57,719 --> 00:01:00,560
by overflowing the forwarding tables.

15
00:01:00,560 --> 00:01:04,319
We do this by preventing the switch from learning addresses correctly.

16
00:01:04,319 --> 00:01:10,640
Once we force them to be broadcast, we can then eavesdrop using Wireshark.

17
00:01:10,640 --> 00:01:15,879
The next approach is for the attacker to set up a computer that masquerades as a DHCP or ARP server,

18
00:01:15,879 --> 00:01:20,079
redirecting packets from the sender via another server.

19
00:01:20,079 --> 00:01:27,079
As I said, eavesdropping is very easy when packets are broadcast onto a shared medium.

20
00:01:27,079 --> 00:01:31,519
Just like Wi-Fi packets are broadcast into the air for everyone to hear,

21
00:01:31,519 --> 00:01:37,759
the earliest versions of Ethernet broadcast packets on a common cable attached to all the end hosts.

22
00:01:37,759 --> 00:01:43,039
Eavesdropping was easy in this kind of network that shares a single broadcast communication channel.

23
00:01:43,039 --> 00:01:49,079
But as we saw in Unit 7, Ethernet has changed over the years.

24
00:01:49,719 --> 00:01:54,079
Today, Ethernet networks use switches rather than a single shared cable.

25
00:01:54,079 --> 00:01:58,719
We use switches because they allow many simultaneous communications in the network.

26
00:01:58,719 --> 00:02:02,920
This is good news for performance, but it's bad news for the attacker,

27
00:02:02,920 --> 00:02:08,159
because our packets only pass over the two links between LS and Bob.

28
00:02:08,159 --> 00:02:12,159
The attacker can't see our packets.

29
00:02:12,159 --> 00:02:15,960
A common exploit is to attack the tables in the Ethernet switches.

30
00:02:15,960 --> 00:02:22,520
As you'll recall, an Ethernet switch learns the addresses of end hosts by watching packets in the network.

31
00:02:22,520 --> 00:02:29,760
For example, the switch between Alison Bob shown here learns their Ethernet addresses whenever they send packets.

32
00:02:29,760 --> 00:02:35,319
Here is what the forwarding table might look like in a switch after it's learned some of the addresses.

33
00:02:35,319 --> 00:02:39,879
In practice, the tables are much bigger than this, usually tens or hundreds of thousands of entries,

34
00:02:39,879 --> 00:02:43,640
but I show you a few here to keep things simple.

35
00:02:43,639 --> 00:02:49,519
Remember that if a switch receives a packet with an Ethernet destination address that is not already in its forwarding table,

36
00:02:49,519 --> 00:02:52,719
then it broadcasts the packets.

37
00:02:52,719 --> 00:02:58,839
So, how can the attacker persuade the switch to broadcast all the packets?

38
00:02:58,839 --> 00:03:05,839
It can keep filling up the forwarding table with other addresses.

39
00:03:05,839 --> 00:03:12,519
So, what an attacker can do is keep sending at very high rate packets with new Ethernet addresses.

40
00:03:12,520 --> 00:03:17,520
The switches will learn these addresses, displacing entries already in the switches.

41
00:03:17,520 --> 00:03:21,400
Typically, the replacement policy is at least recently used.

42
00:03:21,400 --> 00:03:26,719
So, if the attacker sends it a high enough rate, the table will keep evicting the entries for Alison Bob.

43
00:03:26,719 --> 00:03:32,879
All of the packets will then be broadcast, and will be seen by the attacker.

44
00:03:32,879 --> 00:03:36,680
This is called a Mac Overflow Attack.

45
00:03:36,680 --> 00:03:44,439
3, 2, 1.

46
00:03:44,439 --> 00:03:48,879
Another common type of attack is to set up a rogue DHCP server.

47
00:03:48,879 --> 00:03:55,800
In this attack, the attacker is going to try and persuade you to use a rogue DHCP server instead.

48
00:03:55,800 --> 00:04:03,520
Recall that DHCP is a service offered by the network to help configure your computer when it boots or first attaches to the network.

49
00:04:03,520 --> 00:04:12,840
Your computer sends out a sequence of broadcast discovery packets to find the DHCP server, which is usually hosted on the nearest router.

50
00:04:12,840 --> 00:04:19,240
After your computer has found the DHCP server, it sends a request asking to be allocated an IP address on the local network,

51
00:04:19,240 --> 00:04:26,439
along with the address of the default router and the addresses of the DNS servers it should use.

52
00:04:26,439 --> 00:04:33,280
If the rogue DHCP server can respond faster than the legitimate server, it can respond to Alice first.

53
00:04:33,279 --> 00:04:36,759
Giving her whatever configuration information it wants.

54
00:04:36,759 --> 00:04:45,439
For example, the attacker can give Alice a bad router address so that she sends traffic to the attacker instead of the router.

55
00:04:45,439 --> 00:04:51,759
This makes it easy for the attacker to set up a man in the middle attack without Alice knowing.

56
00:04:51,759 --> 00:04:58,119
A second way is for the attacker to give Alice the IP address of a remote rogue DHCP server.

57
00:04:58,120 --> 00:05:17,000
When Alice looks up IP addresses in future, for example, next time she visits Google.com, the rogue DHCP server can return the IP address of a different server and intercept Alice's traffic.

58
00:05:17,000 --> 00:05:22,000
Finally, the attacker can set up a rogue ARP server.

59
00:05:22,000 --> 00:05:31,319
When Alice is sending packets to a local host or via the router, she will first send an ARP request to find out the ethernet address of the next hop.

60
00:05:31,319 --> 00:05:40,319
First she sends a broadcast ARP request packet to the ARP server, which replies with the legitimate ethernet address she's looking for.

61
00:05:40,319 --> 00:05:49,120
But if the attacker sets up a rogue ARP server that responds faster than the legitimate ARP server, the attacker can give Alice the wrong information.

62
00:05:49,120 --> 00:05:57,079
If the attacker replies with the ethernet address of a rogue server in the local network, then all of Alice's traffic will be sent to the rogue server.

63
00:05:57,079 --> 00:06:06,280
This is an easy way to set up a man in the middle attack by passing all of Alice's traffic through a rogue server without Alice knowing.

