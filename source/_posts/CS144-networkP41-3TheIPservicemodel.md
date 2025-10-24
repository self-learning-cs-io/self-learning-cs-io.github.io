---
title: CS144 NetworkP41 3TheIPservicemodel
---

1
00:00:00,000 --> 00:00:05,000
Now that you've learned about the four-layer internet model, we're going to focus on the network layer.

2
00:00:05,000 --> 00:00:10,000
This is the most important layer of the internet. In fact, to many people, it is the internet.

3
00:00:10,000 --> 00:00:16,000
Whenever we use the internet, we're required to use the internet protocol to send and receive our packets.

4
00:00:16,000 --> 00:00:20,000
You'll remember that we say that each layer provides a service to the layer above.

5
00:00:20,000 --> 00:00:25,000
In order to correctly use a layer, we need a good understanding of the service that it provides.

6
00:00:25,000 --> 00:00:30,000
Therefore, in this video, I'm going to walk through the service provided by the internet protocol.

7
00:00:30,000 --> 00:00:41,000
IP datagrams consist of a header and some data. When the transport layer has data to send, it hands a transport segment to the network layer below.

8
00:00:41,000 --> 00:00:47,000
The network layer puts the transport segment inside a new IP datagram that it creates.

9
00:00:47,000 --> 00:00:51,000
IP's job is to deliver the datagram to the other end of the internet.

10
00:00:51,000 --> 00:00:58,000
But first, the IP datagram has to make it over the first link to the first router.

11
00:00:58,000 --> 00:01:07,000
So, IP sends the datagram to the link layer that puts it inside a link frame, such as an ethernet packet, and then ships it off to the first router.

12
00:01:07,000 --> 00:01:12,000
The IP service can be characterised by four properties listed here.

13
00:01:12,000 --> 00:01:18,000
It sends datagrams from end host to end host. It is unreliable, but makes the best effort to deliver the datagrams.

14
00:01:18,000 --> 00:01:22,000
The network maintains no per-flow state associated with the datagrams.

15
00:01:22,000 --> 00:01:27,000
Let's take a look at each one of these in turn as listed in the table.

16
00:01:27,000 --> 00:01:36,000
First, IP is a datagram service. When we ask IP to send some data for us, it creates a datagram and puts our data inside.

17
00:01:36,000 --> 00:01:42,000
The datagram is a packet that is routed individually through the network based on the information in its header.

18
00:01:42,000 --> 00:01:45,000
In other words, the datagram itself contained.

19
00:01:45,000 --> 00:01:58,000
The header contains the IP address of the destination, which we abbreviate here as IPDA for IP destination address, and the forwarding decision at each router is based on this IPDA.

20
00:01:58,000 --> 00:02:08,000
The datagram header also contains an IP source address, or IPSA, saying where the packet came from, so the receiver knows where to send any response.

21
00:02:09,000 --> 00:02:17,000
Datagrams are routed hot by hot through the network from one router to the next, all the way from the IP source address to the IP destination address.

22
00:02:17,000 --> 00:02:28,000
We'll learn more about how routers work later, but for now, it's enough to know that each router contains a forwarding table that tells it where to send packets next after it matches a given destination address.

23
00:02:28,000 --> 00:02:37,000
The router doesn't know the whole path. It simply uses the destination address to index into its own forwarding table so that it can forward the packet to the next hop along the path.

24
00:02:37,000 --> 00:02:49,000
Hop by pop, step by step, the packet makes its way from the source to the destination using only the destination address in the datagram.

25
00:02:49,000 --> 00:02:56,000
You'll often hear the analogy made between how IP datagrams are routed and how letters are routed by the postal service.

26
00:02:56,000 --> 00:03:04,000
It's a good analogy. In the postal service, we put a letter into the mailbox with the address of the destination, and the letter is routed, invisibly to us.

27
00:03:05,000 --> 00:03:09,000
Hop by hop from sorting office to sorting office until it reaches its destination.

28
00:03:09,000 --> 00:03:17,000
Now the sender or the receiver know, or need to know, the path taken by the letters in the postal service, or by datagrams in the internet.

29
00:03:17,000 --> 00:03:22,000
The IP service model provides a service which includes the routing to the destination.

30
00:03:22,000 --> 00:03:33,000
The second aspect of the IP service model, and perhaps most surprisingly, is IP is unreliable.

31
00:03:33,000 --> 00:03:41,000
IP makes no promise that packets will be delivered to the destination. They could be delivered late, out of sequence, or never delivered at all.

32
00:03:41,000 --> 00:03:46,000
It's possible that a packet will be duplicated along the way, for example, by a misbehaving router.

33
00:03:46,000 --> 00:03:52,000
The key thing to remember is that IP is unreliable and makes no guarantees.

34
00:03:52,000 --> 00:04:00,000
But it won't drop datagrams arbitrarily just because it feels like it. That's if you believe networks have feelings.

35
00:04:00,000 --> 00:04:05,000
IP does make the promise to only drop datagrams if necessary.

36
00:04:05,000 --> 00:04:11,000
For example, the packet queue in a router might fill up because of congestion, forcing the router to drop the next arriving packet.

37
00:04:12,000 --> 00:04:18,000
IP won't make any attempt to resend the data. In fact, IP doesn't even tell the source that the packet was dropped.

38
00:04:18,000 --> 00:04:25,000
Similarly, a faulty routing table might cause a packet to be sent to the wrong destination, or cause a packet to be duplicated by mistake.

39
00:04:25,000 --> 00:04:30,000
IP doesn't make any promises that these errors won't happen, nor does it detect them when they do.

40
00:04:30,000 --> 00:04:37,000
But IP does make the promise to only make these errors and drop packets when necessary.

41
00:04:37,000 --> 00:04:42,000
In fact, the IP datagram service is very much like the basic postal service.

42
00:04:42,000 --> 00:04:46,000
The basic postal service makes no promise that our letters will be delivered on time,

43
00:04:46,000 --> 00:04:52,000
or that if we send two or three letters back to back on consecutive days, that they'll be received in the order they were sent.

44
00:04:52,000 --> 00:04:59,000
And it makes no promise that they'll be delivered at all, unless we pay for a more expensive end-to-end service to guarantee delivery.

45
00:04:59,000 --> 00:05:04,000
Really, when it comes down to it, IP is an extremely simple, minimal service.

46
00:05:04,000 --> 00:05:07,000
It maintains no state at all related to a communication.

47
00:05:07,000 --> 00:05:16,000
We say that a communication service is connectionless, because it doesn't start by establishing some end-to-end state associated with a communication.

48
00:05:16,000 --> 00:05:22,000
In other words, when we make a Skype call, lasting several minutes and consisting of many IP datagrams,

49
00:05:22,000 --> 00:05:30,000
the IP layer maintains no knowledge of the call, and simply routes each datagram individually and independently of all the others.

50
00:05:34,000 --> 00:05:37,000
You might be wondering why the IP service is so simple.

51
00:05:37,000 --> 00:05:41,000
After all, it is the foundation of the entire internet.

52
00:05:41,000 --> 00:05:46,000
Every communication of the internet uses must use the IP service.

53
00:05:46,000 --> 00:05:52,000
Given how important the internet is, wouldn't it have been better to make IP reliable?

54
00:05:52,000 --> 00:05:57,000
After all, we did say that most applications want a reliable byte communication service.

55
00:05:57,000 --> 00:06:03,000
There are several reasons the IP service model was designed to be so simple.

56
00:06:04,000 --> 00:06:08,000
First, to keep the network simple, dumb, and minimal.

57
00:06:08,000 --> 00:06:12,000
Faster, more streamlined, and lower cost to build and maintain.

58
00:06:12,000 --> 00:06:18,000
It was believed that if the network is kept simple, with very few features and requirements,

59
00:06:18,000 --> 00:06:22,000
then packets could be delivered very quickly and at low cost to the destination.

60
00:06:22,000 --> 00:06:27,000
The thinking was that a simple network could be made to run very fast using dedicated hardware,

61
00:06:28,000 --> 00:06:33,000
and given that the network is implemented by a large number of arousers scattered throughout the network across the world,

62
00:06:33,000 --> 00:06:40,000
if they could be kept simple, then they are more likely to be reliable, more affordable, easier to maintain,

63
00:06:40,000 --> 00:06:44,000
and will need to be upgraded less often.

64
00:06:44,000 --> 00:06:47,000
Second is the end to end principle.

65
00:06:47,000 --> 00:06:53,000
The end to end principle states that where possible, implement features in the end hosts.

66
00:06:54,000 --> 00:07:00,000
In the design of communication systems such as the internet, there's a well-known principle called the end to end principle

67
00:07:00,000 --> 00:07:05,000
that says if you can correctly implement features at the end points, then you should.

68
00:07:05,000 --> 00:07:14,000
We'll study the end to end principle in more depth in later videos, but the basic idea is to place as much intelligence as possible at the end points,

69
00:07:14,000 --> 00:07:17,000
in our case the source and destination computers.

70
00:07:17,000 --> 00:07:22,000
This can have several advantages, such as making sure the feature is implemented correctly for the application,

71
00:07:22,000 --> 00:07:27,000
and it's easier to evolve and improve a feature if it's implemented in software on end computers,

72
00:07:27,000 --> 00:07:31,000
rather than baked into the hardware of the internet.

73
00:07:31,000 --> 00:07:36,000
In the case of the internet, it was decided that features such as reliable communications and controlling congestion

74
00:07:36,000 --> 00:07:42,000
should be done at the end points by the source and destination computers and not by the network.

75
00:07:42,000 --> 00:07:47,000
At the time, it was quite a radical suggestion and very different design choice from the telephone system,

76
00:07:47,000 --> 00:07:52,000
the largest existing network at the time, which was originally built on the idea of simple handsets

77
00:07:52,000 --> 00:07:56,000
and a complicated feature rich network of telephone switches.

78
00:07:56,000 --> 00:08:02,000
In later videos, we'll be studying the end to end principle as one of the important architectural principles of communication systems.

79
00:08:02,000 --> 00:08:05,000
We'll see many examples of the end to end principle in action.

80
00:08:05,000 --> 00:08:14,000
For example, when we study the transport layer, we'll see how the end hosts build a reliable communication service over the unreliable IP network service.

81
00:08:18,000 --> 00:08:27,000
A simple IP service also allows a variety of reliable or unreliable services to be built on top.

82
00:08:27,000 --> 00:08:36,000
If IP was reliable, in other words, if any missing packets were retransmitted automatically, then it would not be ideal for some services.

83
00:08:36,000 --> 00:08:43,000
For example, in real-time applications like a video chat, there might be no point in retransmitting lost data,

84
00:08:43,000 --> 00:08:46,000
because it might arrive too late to be useful.

85
00:08:46,000 --> 00:08:52,000
Instead, the application might choose to show a few blank pixels or use the pixels from the frame before.

86
00:08:52,000 --> 00:08:59,000
By not providing any reliability guarantees, IP lets the application choose the reliability service it needs.

87
00:09:03,000 --> 00:09:09,000
Finally, IP works over any link layer. IP makes very few assumptions about the link layer.

88
00:09:10,000 --> 00:09:14,000
IP makes very little expectation at all of the link layer below.

89
00:09:14,000 --> 00:09:18,000
The link could be wired or wireless and requires no retransmission or control of congestion.

90
00:09:18,000 --> 00:09:25,000
Some people have said IP is so simple and makes so few assumptions about the underlying link layer that you could run IP over carrier pigeons.

91
00:09:25,000 --> 00:09:28,000
In fact, there's even an internet standard telling you how to do it.

92
00:09:29,000 --> 00:09:36,000
Making IP run over any link layer made sense, because the internet was created specifically to interconnect existing networks.

93
00:09:37,000 --> 00:09:39,000
In fact, that's why it was called the internet.

94
00:09:44,000 --> 00:09:52,000
In addition to the basic, unreliable, best-effort connectionless data-gram service, IP also provides a few other carefully chosen services.

95
00:09:52,000 --> 00:09:59,000
The designers of IP tried very hard to find a balance between providing the bear minimum needed to make communications work,

96
00:09:59,000 --> 00:10:04,000
while not providing such a bear bone service that it doesn't really work at all.

97
00:10:05,000 --> 00:10:10,000
I'm going to describe five features here, and you'll learn about each one of these features in later videos.

98
00:10:10,000 --> 00:10:17,000
So I won't go into a lot of details here, but I will briefly describe each one so you can understand the scope of the complete IP service.

99
00:10:18,000 --> 00:10:22,000
First, IP tries to prevent packets from looping forever.

100
00:10:22,000 --> 00:10:33,000
Because IP routers forward packets hop by hop across the internet, it is possible for the forwarding table in a router to be wrong, causing a pocket packet to start looping round and around following the same path.

101
00:10:35,000 --> 00:10:41,000
This is most likely to happen when the forwarding tables are changing, and they temporarily get into an inconsistent state.

102
00:10:41,000 --> 00:10:46,000
Rather than try to prevent loops from ever happening, which would take a lot of complexity,

103
00:10:46,000 --> 00:10:52,000
IP uses a very simple mechanism to catch and then delete packets that appear to be stuck in a loop.

104
00:10:52,000 --> 00:10:57,000
To do this, IP simply adds a hop count field in the header of every data-gram.

105
00:10:58,000 --> 00:11:01,000
It's called the Time to Live or TTL field.

106
00:11:01,000 --> 00:11:07,000
It starts out at a number like 128, and then it's decremented by every router it passes through.

107
00:11:07,000 --> 00:11:13,000
If it reaches zero, IP concludes that it must be stuck in a loop, and the router drops the data-gram.

108
00:11:13,000 --> 00:11:16,000
It's a simple mechanism, typical of IP.

109
00:11:16,000 --> 00:11:23,000
It doesn't guarantee that loops won't happen. It just tries to limit the damage caused by a flood of endlessly looping packets in the network.

110
00:11:27,000 --> 00:11:30,000
IP will fragment packets if they are too long.

111
00:11:32,000 --> 00:11:34,000
IP is designed to run over any kind of link.

112
00:11:34,000 --> 00:11:37,000
Most links have a limit on the size of the packets that they can carry.

113
00:11:37,000 --> 00:11:42,000
For example, Ethernet can only carry packets shorter than 1,500 bytes.

114
00:11:42,000 --> 00:11:50,000
If an application has more than 1,500 bytes to send, it has to be broken into 1,500 byte pieces before sending in an IP data-gram.

115
00:11:51,000 --> 00:11:58,000
Now along the path towards the destination, a 1,500 byte data-gram might need to go over a link that can only carry smaller packets.

116
00:11:58,000 --> 00:12:00,000
Let's say 1,000 bytes long.

117
00:12:00,000 --> 00:12:06,000
The router connecting the two links will fragment the data into two smaller data-grams.

118
00:12:06,000 --> 00:12:14,000
IP provides some header fields that we'll see in a minute to help the router fragment the data-gram into two self-contained IP data-grams,

119
00:12:14,000 --> 00:12:19,000
while providing the information the in-host needs to correctly reassemble the data again.

120
00:12:21,000 --> 00:12:28,000
IP uses a header check sum to reduce the chances of delivering a data-gram to the wrong destination.

121
00:12:28,000 --> 00:12:35,000
IP includes a check sum field in the data-gram header to try and make sure that data-grams are delivered to the right location.

122
00:12:35,000 --> 00:12:43,000
It could be quite a security problem if packets are accidentally and frequently sent to the wrong place because of a mistake by a router along the way.

123
00:12:44,000 --> 00:12:49,000
Fourth, there are two versions of IP in used today.

124
00:12:49,000 --> 00:12:53,000
IPv4, which is used today by over 90% of end hosts.

125
00:12:53,000 --> 00:12:57,000
It uses the 32-bit addresses you're probably familiar with.

126
00:12:57,000 --> 00:13:06,000
Because we're running out of IPv4 addresses, the internet is in a gradual transition to IPv6, which uses 128-bit addresses instead.

127
00:13:06,000 --> 00:13:11,000
You'll be learning about the details of IPv4 and IPv6 in later videos.

128
00:13:12,000 --> 00:13:16,000
Finally, IP allows new fields to be added to the data-gram header.

129
00:13:17,000 --> 00:13:20,000
In practice, this is a bit of a mixed blessing.

130
00:13:20,000 --> 00:13:27,000
On the one hand, it allows new features to be added to the header that turn out to be important, but weren't in the original standard.

131
00:13:27,000 --> 00:13:36,000
On the other hand, these fields need processing, and so require extra features in the routers along the path, breaking the goal of a simple, dumb, minimal, forwarding path.

132
00:13:36,000 --> 00:13:40,000
In practice, very few options are used or processed by the routers.

133
00:13:42,000 --> 00:13:48,000
I'm now going to show you the IPv4 header and explain what all the fields do.

134
00:13:48,000 --> 00:13:52,000
I don't need you to remember where all the fields are.

135
00:13:52,000 --> 00:14:02,000
I don't remember all the locations myself, but I do want you to know what each field does, because it helps you understand the scope of the IP service model.

136
00:14:02,000 --> 00:14:10,000
It should help cement your understanding and make it really clear that IP doesn't do a lot. It's a deliberately simple service.

137
00:14:11,000 --> 00:14:15,000
Here's a picture of an IPv4 header, which is the most common header in use today.

138
00:14:15,000 --> 00:14:23,000
I've drawn it here in 32-bit words with bit 0, the first to be sent under the wire, up in the top left-hand corner.

139
00:14:23,000 --> 00:14:29,000
The shaded portion is the IPv4 header. It's followed by the data.

140
00:14:30,000 --> 00:14:41,000
The most important fields in the IP header are the destination IP address, the source IP address, the protocol ID, that tells us what's inside the data field.

141
00:14:41,000 --> 00:14:49,000
Essentially, it allows the destination host to demultiplex arriving data, sending them to the correct code to process the packet.

142
00:14:49,000 --> 00:14:56,000
If the protocol ID has the value 6, for example, then it tells us that the data contains a TCP segment.

143
00:14:57,000 --> 00:15:04,000
So we can safely pass the datagram to the TCP code, and it will be able to pass the segment correctly.

144
00:15:04,000 --> 00:15:14,000
The Internet Assign Numbers Authority, IANA, defines over 140 different values of protocol ID, representing different transport protocols.

145
00:15:14,000 --> 00:15:23,000
The version field tells us which version of IP we're using. Currently, the legal values are IPv4 and IPv6.

146
00:15:23,000 --> 00:15:28,000
This header is an IPv4 header. We'll see IPv6 headers in a later video.

147
00:15:28,000 --> 00:15:35,000
The total packet length can be up to 64 kilobytes, including the header and all the data.

148
00:15:35,000 --> 00:15:41,000
The time to live or TTL field helps us to prevent packets accidentally looping in the network forever.

149
00:15:41,000 --> 00:15:48,000
Every router is required to decrement the TTL field. If it reaches 0, the router should drop the packet.

150
00:15:48,000 --> 00:15:55,000
This way, when the source sends the packet with a fixed TTL value, it's guaranteed to be destroyed by a router if it starts to travel in loops.

151
00:15:59,000 --> 00:16:03,000
Sometimes, a packet is too long for the link it is about to be sent on.

152
00:16:03,000 --> 00:16:12,000
The packet ID, flags and fragment offset all help routers to fragment IP packets into smaller self-contained datagrams, if need be.

153
00:16:12,000 --> 00:16:15,000
We'll learn how fragmentation works in a later video.

154
00:16:16,000 --> 00:16:21,000
The type of service field gives a hint to routers about how important this packet is.

155
00:16:21,000 --> 00:16:29,000
The header length tells us how big the header is. Some headers have optional extra fields to carry extra information.

156
00:16:29,000 --> 00:16:39,000
Finally, a check sum is calculated over the whole header, so just in case the header is corrupted, we're not likely to deliver a packet to the wrong destination by mistake.

157
00:16:40,000 --> 00:16:47,000
In summary, IP is very important. We use it every time we send and receive packets in the internet.

158
00:16:48,000 --> 00:16:59,000
IP provides a deliberately simple service. It is a simple, thumb, minimal service with four main features. It sends datagrams, hop by hop across the internet.

159
00:16:59,000 --> 00:17:05,000
The service is unreliable and best effort. There's no per-flow state making the protocol connectious.

160
00:17:06,000 --> 00:17:15,000
At this point, you should feel comfortable with what the IP protocol is, what its service model is and how it fits into the internet for layer hierarchy.

161
00:17:15,000 --> 00:17:21,000
If you have doubts, I suggest you re-watch this video and the one before it on the four layer model.

162
00:17:21,000 --> 00:17:26,000
You'll also find lots of good references about how IPv4 works.

163
00:17:26,000 --> 00:17:33,000
Any good networking textbook will devote considerable space to explaining what IP is and why it was designed this way.

164
00:17:33,000 --> 00:17:38,000
For example, chapter 4 of the sixth edition of Computer Networking a Top Down Approach by Currician Russ.

165
00:17:38,000 --> 00:17:41,000
You'll also find a brief explanation on Wikipedia.

