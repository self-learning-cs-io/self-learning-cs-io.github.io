---
title: CS144 NetworkP51 4ADayintheLifeofaPacket
---

1
00:00:00,000 --> 00:00:06,000
The four-layer model of the Internet takes a stream of data from the application layer.

2
00:00:06,000 --> 00:00:14,000
The transport layer breaks a stream into segments of data that it reliably delivers to an application running on another computer.

3
00:00:14,000 --> 00:00:22,000
The transport layer sends these segments as network layer packets, which the network layer delivers to the other computer.

4
00:00:22,000 --> 00:00:28,000
Let's see what this looks like in practice. The actual packets that a web browser and server ascendant receive.

5
00:00:30,000 --> 00:00:33,000
First, let's look at the transport layer.

6
00:00:33,000 --> 00:00:39,000
Almost all web traffic is over TCP, the transport control protocol.

7
00:00:39,000 --> 00:00:43,000
In its typical operation, there's a client and a server.

8
00:00:43,000 --> 00:00:47,000
A server listens for connection requests.

9
00:00:47,000 --> 00:00:53,000
To open a connection, a client issues a connection request, which the server responds to.

10
00:00:53,000 --> 00:01:03,000
I won't go into the details of exactly how this works, but it turns out this exchange takes three messages, something called the three-way handshake.

11
00:01:03,000 --> 00:01:08,000
The first step of the message is when the client sends a synchronized message.

12
00:01:08,000 --> 00:01:11,000
The server often calls a sin.

13
00:01:11,000 --> 00:01:22,000
The second step is when the server responds to the synchronized message that also acknowledges the client's synchronized or a synchronized and acknowledged message, often called a sin-ac.

14
00:01:22,000 --> 00:01:32,000
The third and final step is when the client responds by acknowledging the server's synchronized, often called an act.

15
00:01:32,000 --> 00:01:42,000
So often the three-way handshake is described as synchronized, synchronized and acknowledged, acknowledged, or sin-ac-ac.

16
00:01:42,000 --> 00:01:52,000
Recall that the network layer is responsible for delivering packets to computers, the transport layer is responsible for delivering data to applications.

17
00:01:52,000 --> 00:01:59,000
From the perspective of the network layer, packets sent to different applications on the same computer look the same.

18
00:01:59,000 --> 00:02:05,000
This means that to open a TCP stream to another program, we need two addresses.

19
00:02:05,000 --> 00:02:13,000
First, an Internet Protocol address is the address the network layer uses to deliver packets to the computer.

20
00:02:13,000 --> 00:02:22,000
The second, the TCP port, tells the computer software which application to deliver data to.

21
00:02:22,000 --> 00:02:26,000
Web servers usually run on TCP port 80.

22
00:02:26,000 --> 00:02:35,000
So when we open a connection to a web server, we send IP packets to the computer running the web server whose destination address is that computer's IP address.

23
00:02:35,000 --> 00:02:43,000
Those IP packets have TCP segments, segments whose destination port is 80.

24
00:02:43,000 --> 00:02:46,000
But how do those IP packets get to their destination?

25
00:02:46,000 --> 00:02:50,000
We don't have a direct wire connecting my client to the server.

26
00:02:50,000 --> 00:02:58,000
Instead, my client is connected to an intermediate computer, a router. This router is itself connected to other routers.

27
00:02:58,000 --> 00:03:07,000
IP packets between the client and the server take many hops, where a hop is a link connecting two routers.

28
00:03:07,000 --> 00:03:14,000
Since my client is on a Wi-Fi network, the first hop is wireless to the Wi-Fi access point.

29
00:03:14,000 --> 00:03:23,000
The access point has a wired connection to the broader Internet, so it forwards my clients' packets along this wired hop.

30
00:03:23,000 --> 00:03:32,000
A router can have many links connecting it. As each packet arrives, a router decides which of its links to send it out on.

31
00:03:32,000 --> 00:03:39,000
Routers have IP addresses, so it's also the case that it might not forward a packet that would rather deliver to its own software.

32
00:03:40,000 --> 00:03:48,000
For example, when you log into a router using TCP, the IP packets are destined to the router's own IP address.

33
00:03:48,000 --> 00:03:51,000
How does a router make this decision?

34
00:03:51,000 --> 00:03:56,000
It does so through something called a forwarding table shown here on the right.

35
00:03:56,000 --> 00:04:04,000
A forwarding table consists of a set of IP address patterns and the link to send it across for each pattern.

36
00:04:04,000 --> 00:04:11,000
When a packet arrives, the router checks which forwarding table entries pattern best matches the packet.

37
00:04:11,000 --> 00:04:14,000
It forwards the packet along that entries link.

38
00:04:14,000 --> 00:04:18,000
Generally, best means the most specific match.

39
00:04:18,000 --> 00:04:22,000
I'll describe how matching works in more detail in the video on longest prefix match.

40
00:04:22,000 --> 00:04:28,000
But in this simple example, let's just consider the default route, the first entry in the table above.

41
00:04:28,000 --> 00:04:33,000
The default route is the least specific route, it matches every IP address.

42
00:04:33,000 --> 00:04:42,000
If, when a packet arrives, there isn't a more specific route than the default route, the router will just use the default one.

43
00:04:42,000 --> 00:04:46,000
The default route is especially useful in Edge Networks.

44
00:04:46,000 --> 00:04:51,000
Say, for example, your Stanford University and have a router connecting you to the larger internet.

45
00:04:51,000 --> 00:04:56,000
Your router will have many specific routes for the IP addresses of Stanford's networks.

46
00:04:56,000 --> 00:04:59,000
Send packets to the engineering school over this link.

47
00:04:59,000 --> 00:05:02,000
Send packets to the library over that link.

48
00:05:02,000 --> 00:05:10,000
But if the destination IP address is in Stanford's, then the router should send it out to the larger internet.

49
00:05:10,000 --> 00:05:14,000
So now, let's look at some IP packets in a real network.

50
00:05:14,000 --> 00:05:22,000
I'm going to request a web page from www.brown.edu and use a tool called WireShark to show you all of the packets.

51
00:05:22,000 --> 00:05:30,000
We'll see how my web browser opens a TCP connection to the brown web server using a threw-away handshake of SIN, SINAC, AC.

52
00:05:30,000 --> 00:05:36,000
Then, it starts issuing HTTP get requests, which the server responds to with data.

53
00:05:36,000 --> 00:05:50,000
Once we've seen the exchange of packets between my client and the brown university web server, I'll use another tool called TraceRoute to observe the path these packets take through the internet.

54
00:05:50,000 --> 00:05:53,000
So first, I'll start up WireShark.

55
00:05:53,000 --> 00:06:05,000
Because my computer is using many network applications and sending lots of different packets, I'm going to tell WireShark to only display packets that are TCP segments to the brown server using port 80.

56
00:06:05,000 --> 00:06:09,000
This way, we'll only see the web traffic I'm generating.

57
00:06:09,000 --> 00:06:16,000
I'm also going to tell WireShark to listen on EN1, which is the name I'm Mac gives to my Wi-Fi link layer.

58
00:06:16,000 --> 00:06:25,000
As you can see, I've many link layers available, but let's just look at EN1 since that's on how I'm connected to the internet.

59
00:06:25,000 --> 00:06:31,000
Next, I'll open my web browser and request the web page for brown university's computer science department.

60
00:06:31,000 --> 00:06:37,000
This is where I went as an undergraduate and so I like to keep up with news in the department.

61
00:06:37,000 --> 00:06:43,000
You can see in WireShark that loading this page involves sending and receiving a lot of packets.

62
00:06:43,000 --> 00:06:56,000
WireShark shows me the timestamp of each packet, the source IP address, the destination IP address, what protocol it uses, its length, and further information.

63
00:06:56,000 --> 00:06:59,000
Let's look at this first packet.

64
00:06:59,000 --> 00:07:05,000
It's from my computer whose address is 1-link2.168.0.106.

65
00:07:05,000 --> 00:07:11,000
To the brown CS web server whose address is 1-28.148.32.12.

66
00:07:11,000 --> 00:07:21,000
It's going to TCP port 80, the Hypertext Transfer Protocol port on the server, which we can see from the HTTP field in the info column.

67
00:07:21,000 --> 00:07:27,000
The packet is the SIM packet, the first step of the three-way handshake.

68
00:07:27,000 --> 00:07:33,000
Look at these first three packets. The first is a SIM from my computer to the web server.

69
00:07:33,000 --> 00:07:39,000
The second is a SIM AC packet from the web server back to my computer.

70
00:07:39,000 --> 00:07:45,000
The third is an AC from my computer back to the web server. This is the three-way handshake.

71
00:07:45,000 --> 00:07:48,000
Now the two computers can exchange data.

72
00:07:48,000 --> 00:07:56,000
And you can see that the first data packet is an AC to pure request. My computer sends a GET request to the web server.

73
00:07:56,000 --> 00:08:00,000
The response to this GET request is three packets.

74
00:08:00,000 --> 00:08:09,000
WireShark shows the response when it receives the third one, shown on the line whose info is HTTP-slash1.1-200-OK.

75
00:08:09,000 --> 00:08:24,000
So here we can see how my requesting a web page from Brown's computer science server created TCP connection to the three-way, three IP packets for the three-way handshake, then more packets for the HTTP request and response.

76
00:08:27,000 --> 00:08:34,000
This is how the network looks to the end hosts the computers as they exchange packets of the network layer.

77
00:08:34,000 --> 00:08:40,000
But how does it look like inside the network layer? What hops these packets take?

78
00:08:40,000 --> 00:08:49,000
To see this, I'm going to use the second tool, TraceRoute. TraceRoute shows you the hops that packets take to a destination.

79
00:08:49,000 --> 00:08:56,000
So we can type TraceRoute www.cs.brown.edu to see the path through the internet.

80
00:08:56,000 --> 00:09:01,000
I'll add the dash W flag, which specifies a timeout with a timeout of one second.

81
00:09:04,000 --> 00:09:07,000
The first hop the packets take is to my wireless router.

82
00:09:07,000 --> 00:09:12,000
This IP address is 192.168.0.1.

83
00:09:12,000 --> 00:09:19,000
As you can see from the next hop, I'm at home. I have a cable modem and my internet provider is astound.

84
00:09:19,000 --> 00:09:28,000
After this, packets take another hop to an IP router with IP address 74.14.0.3.

85
00:09:28,000 --> 00:09:33,000
The hop after that is a router in San Francisco, California.

86
00:09:33,000 --> 00:09:42,000
Then several routers in San Jose, SJC for above.net, and San Jose 1 for level 3.net.

87
00:09:42,000 --> 00:09:48,000
After San Jose 1.level3.net, the packets are across the United States and New York.

88
00:09:48,000 --> 00:09:56,000
They go through a series of routers in New York, EBR, CSW, EBR, then on hop 13 to Boston.

89
00:09:56,000 --> 00:09:59,000
Boston is very close to Providence or Brownis.

90
00:09:59,000 --> 00:10:06,000
After Oshian.org, we see three stars. This means there's a router that won't tell Schraestrout about itself.

91
00:10:06,000 --> 00:10:12,000
The stars are Schraestrout's way to show a way for a reply with their apply timeout.

92
00:10:12,000 --> 00:10:17,000
On hop 20, we see a router in Brown CS department. After that, everything is hidden.

93
00:10:17,000 --> 00:10:25,000
Brown CS department doesn't want you to be able to see what the rest inside of its network looks like.

94
00:10:26,000 --> 00:10:31,000
Because we couldn't see the path end with Brown's web server, let's try another one.

95
00:10:31,000 --> 00:10:37,000
The computer science and artificial intelligence labs see sale at MIT.

96
00:10:37,000 --> 00:10:42,000
We can see the packets take the same path to Boston until hop 15.

97
00:10:42,000 --> 00:10:50,000
The path to Brown goes to Oshian at hop 15, while the path to MIT continues in Level 3's network.

98
00:10:51,000 --> 00:10:59,000
On the path to WWW.C.Sale.mit.edu, only two routers are hidden, the 13th and 19th hops.

99
00:10:59,000 --> 00:11:06,000
We can see that WWW.C.Sale.mit.edu is also named Akron.C.Sale.mit.edu.

100
00:11:06,000 --> 00:11:13,000
And, after 22 hops, packets from my computer reach MIT's web server.

101
00:11:13,000 --> 00:11:15,000
Look at the time values.

102
00:11:15,000 --> 00:11:20,000
The time from my packet to reach the MIT web server and its response returns to me.

103
00:11:20,000 --> 00:11:26,000
They're in back the round trip time is under 90 milliseconds or less than an eye blink.

104
00:11:29,000 --> 00:11:35,000
We've now seen the life of a packet starting as an application level, client web request,

105
00:11:35,000 --> 00:11:39,000
and taking nearly 20 hops to the internet to reach this destination.

106
00:11:39,000 --> 00:11:42,000
For me, this is one of the best things about teaching this course.

107
00:11:42,000 --> 00:11:48,000
Everything we present is something that you and I interact with every day, even just in the space of watching one video.

108
00:11:48,000 --> 00:11:53,000
It's easy to see the principles and ideas in practice, and with just a few simple tools

109
00:11:53,000 --> 00:11:57,000
you can inspect the internet in operation in real time.

