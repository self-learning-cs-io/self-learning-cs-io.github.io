---
title: CS144 NetworkP81 7Encapslationprinciple
---

1
00:00:00,000 --> 00:00:04,160
This video is about the architectural principle we call encapsulation.

2
00:00:04,160 --> 00:00:09,200
Incapsulation is the result of what happens when you combine layering and packet switching.

3
00:00:09,200 --> 00:00:13,200
We want to break up our data into discrete units that we call packets.

4
00:00:13,200 --> 00:00:17,199
However, each packet contains data from multiple layers.

5
00:00:17,199 --> 00:00:21,800
When you send a TCP segment, for example, it's sitting inside an IP packet,

6
00:00:21,800 --> 00:00:24,600
which is in turn sitting inside an Ethernet frame.

7
00:00:24,600 --> 00:00:27,000
Incapsulation is how this works.

8
00:00:27,000 --> 00:00:30,800
Incapsulation is the principle by which you organize information in packets

9
00:00:30,800 --> 00:00:32,799
so that you can maintain layers.

10
00:00:32,799 --> 00:00:35,799
Yet let them share the contents of your packets.

11
00:00:36,799 --> 00:00:41,799
Recall that layering lets you take a complex system and break it down into smaller parts.

12
00:00:41,799 --> 00:00:45,799
Each layer provides a service and abstraction of the network to the layers above.

13
00:00:45,799 --> 00:00:48,799
It provides a substraction by using the layer below it.

14
00:00:48,799 --> 00:00:53,200
Each layer is self-contained, so as long as it provides the surface expected of it,

15
00:00:53,200 --> 00:00:55,400
layers above don't need to worry about how.

16
00:00:55,600 --> 00:00:59,600
This separation of concerns which each layer can involve independently.

17
00:00:59,600 --> 00:01:05,200
Just as IP at the network layer doesn't need to have to worry about changes to TCP at the transport layer,

18
00:01:05,200 --> 00:01:10,200
application layers such as HTTP don't have to worry about changes to TCP.

19
00:01:10,200 --> 00:01:15,599
For example, the past few years, most operating systems have changed the exact TCP algorithms they used

20
00:01:15,599 --> 00:01:18,000
to better handle increasing network speeds,

21
00:01:18,000 --> 00:01:22,200
but a web browser works fine using both the old algorithms and the new ones.

22
00:01:22,799 --> 00:01:26,000
Note that this picture of layers uses the seven layer OSI model.

23
00:01:27,600 --> 00:01:29,799
So let's scrunch back down to the four layer model.

24
00:01:30,799 --> 00:01:34,200
Incapsulation is the principle that lets us take protocol layers

25
00:01:34,200 --> 00:01:36,799
and let them easily share the storage within a packet.

26
00:01:36,799 --> 00:01:40,000
It's how layering manifests in the actual data representation.

27
00:01:41,000 --> 00:01:47,600
The way this works is each protocol layer has some headers, followed by its payload, followed by some footers.

28
00:01:48,599 --> 00:01:52,199
For example, an IP packet header has a source address and a destination address.

29
00:01:52,199 --> 00:01:58,199
To send a TCP segment with IP, we make the TCP format the payload of the IP packet.

30
00:01:58,199 --> 00:02:02,599
In this way, the IP packet encapsulates the TCP segment.

31
00:02:02,599 --> 00:02:05,000
IP doesn't know or care what its payload is.

32
00:02:05,000 --> 00:02:07,000
It just delivers packets to an int host.

33
00:02:07,799 --> 00:02:10,199
When the packet arrives, the host looks inside the payload,

34
00:02:10,199 --> 00:02:14,199
see that it's a TCP segment and processes it accordingly.

35
00:02:15,199 --> 00:02:17,199
So here's a more complete example.

36
00:02:17,199 --> 00:02:22,199
Let's say that you're browsing the web using a computer connected through Wi-Fi wireless ethernet.

37
00:02:23,199 --> 00:02:26,199
Your web browser generates an HTTP get request.

38
00:02:26,199 --> 00:02:30,199
This get request is the payload of a TCP segment.

39
00:02:30,199 --> 00:02:35,199
The TCP segment encapsulating the HTTP get becomes the payload of an IP packet.

40
00:02:36,199 --> 00:02:41,199
This IP packet in turn encapsulating the TCP segment and the HTTP get

41
00:02:41,199 --> 00:02:43,199
is the payload of a Wi-Fi frame.

42
00:02:44,199 --> 00:02:48,199
If you were to look at the bytes your computer sends, they'd look like this.

43
00:02:49,199 --> 00:02:52,199
The outermost encapsulating format is the Wi-Fi frame,

44
00:02:52,199 --> 00:02:56,199
inside of which is an IP packet, inside of which is a TCP segment,

45
00:02:56,199 --> 00:02:59,199
inside of which finally is the HTTP get.

46
00:02:59,199 --> 00:03:03,199
So how Nick has drawn this packet brings up something you might find very confusing.

47
00:03:03,199 --> 00:03:06,199
It turns out there are two ways to draw packets.

48
00:03:06,199 --> 00:03:10,199
The difference comes from the background and what part of the system you work on.

49
00:03:10,199 --> 00:03:13,199
Nick has drawn the packets here where the headers are on the right,

50
00:03:13,199 --> 00:03:18,199
the first bit of the packet is on the right, and the last bit of the packet is on the left.

51
00:03:18,199 --> 00:03:19,199
This makes total sense.

52
00:03:19,199 --> 00:03:24,199
As a router, which switch sends a packet, we draw the packet moving from left to right.

53
00:03:24,199 --> 00:03:28,199
So the first bit to leave the router or switch is the one at the far right.

54
00:03:29,199 --> 00:03:34,199
But I draw packets the other way where the headers are on the left and the footers are on the right, like this.

55
00:03:35,199 --> 00:03:37,199
This second approach comes from software.

56
00:03:37,199 --> 00:03:41,199
It's what you'll see when you read IATF documents and many other protocol specifications.

57
00:03:41,199 --> 00:03:45,199
The idea is that the beginning of the packet comes at address 0.

58
00:03:45,199 --> 00:03:48,199
So the first bit of the header is at address 0.

59
00:03:48,199 --> 00:03:52,199
Since addresses increase from left to right, this means the beginning of the packet is on the left,

60
00:03:52,199 --> 00:03:54,199
and the end of the packet is on the right.

61
00:03:54,199 --> 00:03:56,199
Of course there is no right way or wrong way here.

62
00:03:56,199 --> 00:04:00,199
Both ways of drawing packets are valuable and depend on what you're using the drawing for.

63
00:04:00,199 --> 00:04:02,199
So you should be comfortable with both.

64
00:04:02,199 --> 00:04:06,199
I'll generally draw headers on the right and I'll generally draw them on the left.

65
00:04:06,199 --> 00:04:08,199
Nick's background is like a cloud engineering and switch design,

66
00:04:08,199 --> 00:04:11,199
mine is computer science and protocol software.

67
00:04:14,199 --> 00:04:21,199
So now let's go back to Nick's example of an HTTP get inside a TCP segment inside an IP packet inside a Wi-Fi frame.

68
00:04:21,199 --> 00:04:24,199
The sea with this looks like an actual network of Wireshark.

69
00:04:24,199 --> 00:04:29,199
Before we start this recording, I turned on Wireshark and recorded a packet trace of a web request.

70
00:04:29,199 --> 00:04:31,199
Let's look at just one packet.

71
00:04:32,199 --> 00:04:36,199
Here we can see how Wireshark tells us that it's an Ethernet frame.

72
00:04:36,199 --> 00:04:43,199
Inside which is an IP packet inside which is a TCP segment inside which is an HTTP get.

73
00:04:43,199 --> 00:04:49,199
If I click on each of these protocol headers, then Wireshark actually highlights where they are on the packet bytes.

74
00:04:49,199 --> 00:04:51,199
These gobbledy gook below.

75
00:04:51,199 --> 00:05:04,199
Wi-Fi comes first inside Wi-Fi is IP inside IP is TCP and inside TCP we can see the text of our HTTP get.

76
00:05:05,199 --> 00:05:10,199
This very simple approach for encapsulating protocols within each other gives you tremendous flexibility.

77
00:05:10,199 --> 00:05:15,199
So far we've been talking about the four-layer model is something completely static and inflexible.

78
00:05:15,199 --> 00:05:17,199
In practice, it's not like that.

79
00:05:17,199 --> 00:05:21,199
You can actually use encapsulation to recursively layer protocols.

80
00:05:21,199 --> 00:05:30,199
For example, something that's very commonly used today in offices of businesses is something called a virtual private network or VPN.

81
00:05:31,199 --> 00:05:37,199
With a virtual private network, you open a secure network because secure connection to a network you trust such as your office.

82
00:05:37,199 --> 00:05:40,199
For example, using transport layer security, TLS.

83
00:05:40,199 --> 00:05:48,199
When you communicate with the internet and send IP packets, rather than send them normally, you send them inside this VPN connection.

84
00:05:48,199 --> 00:05:51,199
So the IP packets go to your office network.

85
00:05:51,199 --> 00:05:54,199
At that point, the office network can route them normally.

86
00:05:54,199 --> 00:05:59,199
This lets you do things like access private protected network resources inside your office.

87
00:05:59,199 --> 00:06:07,199
So rather than sprinkle network protections everywhere, you just have to be careful with one service, the service that lets people log into the network over the virtual private network.

88
00:06:07,199 --> 00:06:16,199
You do this with a virtual private network or VPN gateway, a computer that accepts connections from permitted VPN clients and forward their traffic into the private network.

89
00:06:16,199 --> 00:06:19,199
So what does that look like?

90
00:06:19,199 --> 00:06:22,199
Let's say I'm accessing my internal company website.

91
00:06:22,199 --> 00:06:25,199
Well, my web browser generates an HTTP get.

92
00:06:25,199 --> 00:06:33,199
Like usual, it puts this inside a TCP segment, which it puts inside an IP packet, desks into the company's internal web server.

93
00:06:33,199 --> 00:06:40,199
But rather than put this IP packet inside a link layer of frame, I can't directly communicate with the internal web server.

94
00:06:40,199 --> 00:06:46,199
My computer puts this IP packet inside a TLS segment, a secure segment.

95
00:06:46,199 --> 00:06:49,199
TLS protects the message and keeps it secret.

96
00:06:49,199 --> 00:06:55,199
This TLS session is inside a TCP stream that terminates the virtual private network gateway.

97
00:06:55,199 --> 00:07:01,199
So the outer TCP segment is inside an IP packet destined to the virtual private network gateway.

98
00:07:01,199 --> 00:07:06,199
We put this outer IP packet inside a link frame and send it to the next top normally.

99
00:07:06,199 --> 00:07:08,199
So it looks like this.

100
00:07:08,199 --> 00:07:22,199
HTTP inside TCP inside IP inside TLS inside TCP inside IP inside...

101
00:07:22,199 --> 00:07:27,199
Now you've learned about encapsulation, the principle that unifies layering and packet switching.

102
00:07:27,199 --> 00:07:33,199
Incapsulation is how we take protocol layers and assemble them into packets in a way that's flexible and maintains their separation of concerns.

103
00:07:33,199 --> 00:07:37,199
You saw an example of a computer encapsulator...

104
00:07:37,199 --> 00:07:40,199
Okay, I'm going to start this lighting in.

105
00:07:40,199 --> 00:07:44,199
We need to keep that as a blue card.

106
00:07:47,199 --> 00:07:52,199
Now you've heard about encapsulation, the principle that unifies layering and packet switching.

107
00:07:52,199 --> 00:08:00,199
Incapsulation is how we take protocol layers and assemble them into packets in a way that's flexible and maintains the separation of concerns.

108
00:08:00,199 --> 00:08:11,199
You saw an example of a computer that encapsulates a web request, as well as an example how one can use encapsulation in a more complex way for something like a virtual private network.

