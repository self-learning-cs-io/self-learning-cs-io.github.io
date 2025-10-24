---
title: CS144 NetworkP835 12ApplicationsandNATsrecap
---

1
00:00:00,000 --> 00:00:05,719
In this unit, you learn about some of the major applications that you turn today and how

2
00:00:05,719 --> 00:00:09,839
Nats or network address translators can complicate them.

3
00:00:09,839 --> 00:00:14,120
Nowadays, a new net UI tends to be reasonably well behaved, but there are still many old

4
00:00:14,120 --> 00:00:19,080
Nats out there that have some troublesome or difficult behavior.

5
00:00:19,080 --> 00:00:20,679
Let's start with Nats.

6
00:00:20,679 --> 00:00:25,320
In this unit, you learn what a network address translator is and how it works.

7
00:00:25,320 --> 00:00:29,000
It's a router that allows many devices to share one IP address.

8
00:00:29,000 --> 00:00:33,560
It does this by rewriting packets as they pass through it, and that device has an external

9
00:00:33,560 --> 00:00:39,000
address to communicate with the outside world, which is a publicly routable IP address.

10
00:00:39,000 --> 00:00:43,000
It manages a set or a subnet of private internal addresses.

11
00:00:43,000 --> 00:00:47,719
For example, all the IP addresses starting with 10 or all the IP addresses starting with

12
00:00:47,719 --> 00:00:50,400
192.168.

13
00:00:50,400 --> 00:00:57,879
The Nats device assigns one of the private addresses to itself, for example 192.168.0.1, and then

14
00:00:57,880 --> 00:01:01,760
assigns the remaining addresses to the devices in the internal network.

15
00:01:01,760 --> 00:01:07,359
If you have a home Wi-Fi router, it probably acts as a net device as well, using the 192.168

16
00:01:07,359 --> 00:01:10,680
subnet of IPv4 addresses.

17
00:01:10,680 --> 00:01:15,520
You learn that when a net routes a packet from the internal network to the external internet,

18
00:01:15,520 --> 00:01:19,640
it modifies the packet header, so that it looks like the packet is coming from the Nats

19
00:01:19,640 --> 00:01:22,240
single external IP.

20
00:01:22,240 --> 00:01:26,960
It's essentially multiplexing all the packets from different internal addresses onto one external

21
00:01:26,959 --> 00:01:28,439
IP address.

22
00:01:28,439 --> 00:01:33,319
For this to work, it needs a way to distinguish the reply packets flowing in the other direction

23
00:01:33,319 --> 00:01:37,239
so that it can correctly forward them to the correct internal device.

24
00:01:37,239 --> 00:01:41,399
Net devices do this by modifying the transport port numbers to encode which internal device

25
00:01:41,399 --> 00:01:43,799
the transport flow comes from.

26
00:01:43,799 --> 00:01:48,799
This means a net is aware of the transport layer headers and modifies them too.

27
00:01:48,799 --> 00:01:52,959
When a packet arrives from the external internet, it checks if the transport port number matches

28
00:01:52,959 --> 00:01:54,599
a mapping to an internal device.

29
00:01:54,599 --> 00:01:58,879
If it does, it modifies it and forwards it to the internal network.

30
00:01:58,879 --> 00:02:03,119
Because a net device typically only creates a map from internal IP addresses to external

31
00:02:03,119 --> 00:02:07,959
port numbers when packets are flowing towards the outside world, it doesn't know what to

32
00:02:07,959 --> 00:02:13,120
do with packets showing up from the outside world that are trying to reach an internal device.

33
00:02:13,120 --> 00:02:15,280
For some, this is a security benefit.

34
00:02:15,280 --> 00:02:19,879
By default, you can only create outgoing connections protecting your internal devices from attack

35
00:02:19,879 --> 00:02:21,680
from the outside world.

36
00:02:21,680 --> 00:02:26,200
But to others, this is a nuisance because you can't initiate a new TCP connection from

37
00:02:26,200 --> 00:02:28,480
the outside world to the inside.

38
00:02:28,480 --> 00:02:32,120
The net will drop the TCP sin packet.

39
00:02:32,120 --> 00:02:36,200
There are lots of different net designs and many ways to map the IP addresses to outgoing

40
00:02:36,200 --> 00:02:37,200
port numbers.

41
00:02:37,200 --> 00:02:41,200
And we saw some of them in this unit, each with its own complications.

42
00:02:41,200 --> 00:02:45,680
The general consensus is that simple, less restrictive map-mappings are better because

43
00:02:45,680 --> 00:02:49,280
they give the appearance of end-to-end connectivity.

44
00:02:49,280 --> 00:02:53,599
You also learned about some of the techniques people use to work around that, like net hole

45
00:02:53,599 --> 00:02:55,280
punching and simultaneous open.

46
00:02:55,280 --> 00:03:00,439
But the main takeaway from this unit is, nets make it hard to deploy applications in the

47
00:03:00,439 --> 00:03:05,000
internet that require a TCP connection to be set up from the outside world to devices

48
00:03:05,000 --> 00:03:06,319
behind nets.

49
00:03:06,319 --> 00:03:11,360
And it's hard to deploy new transport protocols because the net devices don't know how to process

50
00:03:11,360 --> 00:03:12,560
them.

51
00:03:12,560 --> 00:03:17,479
In general, when people have created new transport protocols, they either mask a raid as TCP

52
00:03:17,479 --> 00:03:23,039
or run on top of UDP.

53
00:03:23,039 --> 00:03:27,479
You learned about the domain name system, an application that uses UDP.

54
00:03:27,479 --> 00:03:31,519
On one hand, it's critical infrastructure, without which the internet will be much less

55
00:03:31,519 --> 00:03:32,719
useful.

56
00:03:32,719 --> 00:03:36,159
On the other, it's just an application.

57
00:03:36,159 --> 00:03:40,359
You learned that the basic idea of the domain name system is that you can map hierarchical

58
00:03:40,359 --> 00:03:47,199
names such as www.stantford.edu to different kinds of information, called records.

59
00:03:47,199 --> 00:03:53,039
For example, you can ask what the IPv4 address of www.stantford.edu is.

60
00:03:53,039 --> 00:03:56,319
You can ask what the name server for Stanford.edu is.

61
00:03:56,319 --> 00:04:01,479
You can ask what the mail server for cs.stantford.edu is.

62
00:04:01,479 --> 00:04:06,199
You learn that the domain name system works through a hierarchy of servers.

63
00:04:06,199 --> 00:04:12,639
For example, to find the address for www.stantford.edu, you first ask a root server where you can

64
00:04:12,639 --> 00:04:19,120
find out about the .edu, then ask .edu where you can find out about Stanford, then finally

65
00:04:19,120 --> 00:04:24,199
ask Stanford for the address of www.stantford.edu.

66
00:04:24,199 --> 00:04:28,919
Each of these records, the address records and the name server records on each step, can

67
00:04:28,919 --> 00:04:33,199
be cached, often for a long while, to reduce load.

68
00:04:33,199 --> 00:04:38,199
To make this caching work even better, often many clients share a resolver, a computer

69
00:04:38,199 --> 00:04:42,120
who queries the domain name service for you.

70
00:04:42,120 --> 00:04:46,920
That way, it can cache all of those results and share them among clients.

71
00:04:46,920 --> 00:04:50,920
That way, all of Stanford only needs to do a single lookup for Google as long as the

72
00:04:50,920 --> 00:04:59,360
record lasts, rather than having every laptop contacting Google's DNS servers.

73
00:04:59,360 --> 00:05:02,879
HTTP is the Hypertext Transfer Protocol.

74
00:05:02,879 --> 00:05:05,079
It runs on TCP.

75
00:05:05,079 --> 00:05:10,639
We've been using the same version of HTTP, that's version 1.1, for almost 20 years now.

76
00:05:10,639 --> 00:05:12,919
Basically, it's unchanged.

77
00:05:12,919 --> 00:05:18,240
You learn that HTTP is a request response protocol, both a request and response are in ASCII

78
00:05:18,240 --> 00:05:22,079
text, which is useful because it's very easy to read.

79
00:05:22,079 --> 00:05:28,360
You learn that one of the big improvements in HTTP 1.1 was something called KeeperLive.

80
00:05:28,360 --> 00:05:33,879
In HTTP 1.0, each request was made on a separate TCP connection.

81
00:05:33,879 --> 00:05:40,120
So to download a page with 40 resources on it, your client had to open 40 TCP connections.

82
00:05:40,120 --> 00:05:45,480
HTTP 1.1 allows a client to request many resources all on the same connection.

83
00:05:45,480 --> 00:05:50,040
This means less time is spent in the three-way handshake, and the TCP connection has more

84
00:05:50,040 --> 00:05:53,480
time to grow its congestion window.

85
00:05:53,480 --> 00:05:58,040
You learn ways to roughly calculate the download times for downloading a complete page and all

86
00:05:58,040 --> 00:05:59,840
of its resources.

87
00:05:59,840 --> 00:06:04,160
Using this, you saw how connection setup time can be a significant overhead for TCP connections

88
00:06:04,160 --> 00:06:06,399
that transfer only a little bit of data.

89
00:06:06,399 --> 00:06:09,639
Finally, you heard a little bit about speedy, S-B-D-Y.

90
00:06:09,639 --> 00:06:16,319
The protocol let's become the basis of HTTP 2.0.

91
00:06:16,319 --> 00:06:19,759
The third application you learned about was BitTorrent.

92
00:06:19,759 --> 00:06:23,319
Like HTTP, BitTorrent uses TCP.

93
00:06:23,319 --> 00:06:29,599
But unlike HTTP, which is a client server application, BitTorrent is a large collection of collaborating

94
00:06:29,599 --> 00:06:32,079
clients called a swarm.

95
00:06:32,079 --> 00:06:36,279
Using BitTorrent to share large, say, 100 megabyte files.

96
00:06:36,279 --> 00:06:41,319
BitTorrent breaks these files up into smaller chunks called pieces.

97
00:06:41,319 --> 00:06:45,079
You learn that each BitTorrent client opens connections to score, sometimes as many as

98
00:06:45,079 --> 00:06:47,240
a hundred other clients.

99
00:06:47,240 --> 00:06:52,439
A client requests data from other clients using a rarest first policy, so it tries to avoid

100
00:06:52,439 --> 00:06:57,719
a piece disappearing from the swarm and also to remove bottlenecks.

101
00:06:57,720 --> 00:07:02,320
You also learn that while BitTorrent is happy to request data from lots of peers, it's

102
00:07:02,320 --> 00:07:06,040
very careful about whom it sends data to.

103
00:07:06,040 --> 00:07:10,580
BitTorrent tries to set up an incentive system where you want to contribute data and let

104
00:07:10,580 --> 00:07:13,120
others transfer from you.

105
00:07:13,120 --> 00:07:18,200
So the way it works is a node will send data to the P-Piers who are sending it the most

106
00:07:18,200 --> 00:07:19,200
data.

107
00:07:19,200 --> 00:07:23,960
That way, the best way to get data from a peer is to send it data.

108
00:07:23,959 --> 00:07:27,919
To better figure out who those best peers are, BitTorrent occasionally starts sending

109
00:07:27,919 --> 00:07:33,000
into a new random peer in order to discover new potential partners in exchange.

110
00:07:33,000 --> 00:07:39,359
This algorithm is called the tit for tat algorithm.

111
00:07:39,359 --> 00:07:42,519
So you've seen three major applications on the internet today.

112
00:07:42,519 --> 00:07:47,000
You've seen how the simple abstractions that UDP and TCP provide can be used in complex

113
00:07:47,000 --> 00:07:49,719
ways for very interesting applications.

114
00:07:49,719 --> 00:07:53,799
You also learn how network address translators can complicate applications by making

115
00:07:53,800 --> 00:07:58,079
it hard to discover peers or open connections, as well as a few techniques for working around

116
00:07:58,079 --> 00:07:59,560
them.

117
00:07:59,560 --> 00:08:03,199
You now should have a good understanding of some of the techniques you can use and challenges

118
00:08:03,199 --> 00:08:07,639
you might run into when you go out and develop the next generation of internet applications.

