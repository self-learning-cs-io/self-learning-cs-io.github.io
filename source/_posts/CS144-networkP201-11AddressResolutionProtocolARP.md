---
title: CS144 NetworkP201 11AddressResolutionProtocolARP
---

1
00:00:00,000 --> 00:00:05,419
The Address Resolution Protocol, or ARP, is the mechanism by which the network lyric

2
00:00:05,419 --> 00:00:09,779
can discover the link address associated with the network address it directly connected to.

3
00:00:09,779 --> 00:00:13,560
Put another way, it's how a device gets an answer to the question,

4
00:00:13,560 --> 00:00:17,100
I have an IP packet whose next top is this address.

5
00:00:17,100 --> 00:00:19,440
What link address should I send it to?

6
00:00:19,440 --> 00:00:24,560
ARP is needed because each protocol layer has its own names and addresses.

7
00:00:24,560 --> 00:00:27,320
An IP address is a network-level address.

8
00:00:27,320 --> 00:00:31,240
It describes a host, a unique destination at the network layer.

9
00:00:31,240 --> 00:00:37,480
A link address in contrast describes a particular network card, a unique device that sends and receives link layer frames.

10
00:00:37,480 --> 00:00:40,560
Ethernet, for example, has 48-bit addresses.

11
00:00:40,560 --> 00:00:44,840
Whenever you buy an Ethernet card, it's been pre-configured with a unique Ethernet address.

12
00:00:44,840 --> 00:00:51,880
So while an IP address says this host, an Ethernet address says this Ethernet card.

13
00:00:51,880 --> 00:00:57,920
48-bit Ethernet addresses are usually written as a colon-delimited set of six octets in hexadecimal,

14
00:00:57,920 --> 00:01:07,439
such as 0, colon 13, colon 72, colon 4c, colon d9, colon 6a, as in A in this example,

15
00:01:07,439 --> 00:01:13,480
or 99999 as the destination B.

16
00:01:13,480 --> 00:01:19,079
One thing that can be confusing is that while these link layer and network layer addresses are completely decoupled

17
00:01:19,079 --> 00:01:24,519
with respect to the protocol layers, in terms of assignment and management they might not be.

18
00:01:24,519 --> 00:01:30,519
For example, it's very common for a single host of multiple IP addresses, one for each of its interfaces.

19
00:01:30,519 --> 00:01:33,159
It needs to because of the concept of in that mask.

20
00:01:33,159 --> 00:01:37,000
For example, look at this hypothetical setup with A, B, and a gateway.

21
00:01:37,000 --> 00:01:42,879
The gateway in the middle has a single IP address, 192.168.0.1.

22
00:01:42,879 --> 00:01:48,479
It has two network cards, one connecting at the destination 171.43.22.5,

23
00:01:48,479 --> 00:01:55,560
one connecting to the source on the left, 192.168.0.5.

24
00:01:55,560 --> 00:02:02,599
Now the gateway's address 192.168.0.1 can really only be in one of these networks.

25
00:02:02,599 --> 00:02:05,159
The network on the left, the source network A.

26
00:02:05,239 --> 00:02:15,400
The net mask needed for 192.168.0.1 to be in the same network as 171.43.22.5 is 128.0.0.0,

27
00:02:15,400 --> 00:02:17,919
or just one bit of net mask.

28
00:02:17,919 --> 00:02:25,199
It can't be that all IP addresses whose first bit is 1 are in the same network as 171.43.22.5.

29
00:02:25,199 --> 00:02:32,719
192.168.0.5, for example, needs to be reached through the gateway.

30
00:02:32,759 --> 00:02:37,759
So instead, we often see setups like this, where the gateway or router has multiple interfaces,

31
00:02:37,759 --> 00:02:40,919
each with their own link layer address to identify the card,

32
00:02:40,919 --> 00:02:44,680
and also each with their own network layer address to identify the hosts within the network

33
00:02:44,680 --> 00:02:46,639
that that card is a part of.

34
00:02:46,639 --> 00:02:52,439
For the gateway, the left interface has IP address 192.168.0.1,

35
00:02:52,439 --> 00:02:58,479
while the right interface has IP address 171.43.22.8.

36
00:02:58,479 --> 00:03:01,680
The fact that link layer and network layer addresses are decoupled logically,

37
00:03:01,680 --> 00:03:04,719
but coupled in practice is in some ways a historical artifact.

38
00:03:04,719 --> 00:03:07,240
When the internet started, there were many link layers,

39
00:03:07,240 --> 00:03:09,599
and it wanted to be able to run on top of all of them.

40
00:03:09,599 --> 00:03:14,520
These link layers weren't suddenly going to start using IP addresses instead of their own addressing scheme.

41
00:03:14,520 --> 00:03:19,400
Furthermore, there turns out to be a bunch of situations where having a separate link layer address is very valuable.

42
00:03:19,400 --> 00:03:21,960
For example, when I register a computer with Stanford's network,

43
00:03:21,960 --> 00:03:25,640
I've registered link layer address, the address of the network card.

44
00:03:25,640 --> 00:03:27,159
So what does this mean in practice?

45
00:03:27,159 --> 00:03:31,040
Let's say node A on the left, wants to send a packet to node B on the right.

46
00:03:31,039 --> 00:03:36,079
It's going to generate an IP packet with source address 192.168.0.5,

47
00:03:36,079 --> 00:03:41,280
and destination address 171.43.22.5.

48
00:03:41,280 --> 00:03:44,919
Node A checks whether the destination address is in the same network.

49
00:03:44,919 --> 00:03:48,919
The net mask tells it that the destination address is in a different network.

50
00:03:48,919 --> 00:03:51,799
255.255.255.

51
00:03:51,799 --> 00:03:55,199
This means node A needs to send the packet through the gateway

52
00:03:55,199 --> 00:03:58,359
or 192.168.0.1.

53
00:03:58,360 --> 00:04:05,880
To do this, it sends a packet whose network layer destination is 171.43.22.5,

54
00:04:05,880 --> 00:04:10,120
but whose link layer destination is the link layer address of the gateway.

55
00:04:10,120 --> 00:04:15,720
So the packet has a network layer destination 171.43.22.5,

56
00:04:15,720 --> 00:04:22,439
and a link layer destination 018E7F3CE1A.

57
00:04:22,439 --> 00:04:26,800
The network layer source is 192.168.0.5,

58
00:04:26,800 --> 00:04:34,800
and the link layer source is 013.724c.96a.

59
00:04:34,800 --> 00:04:36,920
So we have an IP packet from A to B,

60
00:04:36,920 --> 00:04:42,480
encapsulated inside a link layer frame from A to the left gateway interface.

61
00:04:42,480 --> 00:04:45,519
When the packet reaches the gateway, the gateway looks up the next top,

62
00:04:45,519 --> 00:04:50,439
decides its node B, and puts the IP packet inside a link layer frame to B.

63
00:04:50,439 --> 00:04:54,639
So the second IP packet from A to B is inside a link layer frame

64
00:04:54,639 --> 00:05:01,759
from the right gateway interface to B.

65
00:05:01,759 --> 00:05:04,680
So here we get to the problem ARP Sols.

66
00:05:04,680 --> 00:05:11,680
My client knows it needs to send a packet through the gateway that has IP address 192.168.0.1.

67
00:05:11,680 --> 00:05:17,759
To do so, however, it needs to have the link layer address associated with 192.168.0.1.

68
00:05:17,759 --> 00:05:19,360
How does it get this address?

69
00:05:19,360 --> 00:05:23,599
We somehow need to be able to map a layer 3 network layer address

70
00:05:23,600 --> 00:05:26,480
to its corresponding layer 2 link layer address.

71
00:05:26,480 --> 00:05:31,080
We do this with a protocol called ARP or the address resolution protocol.

72
00:05:31,080 --> 00:05:33,640
ARP is a simple request reply protocol.

73
00:05:33,640 --> 00:05:39,320
Every node keeps a cache of mappings from IP addresses on its network to link layer addresses.

74
00:05:39,320 --> 00:05:42,400
If a node needs to send a packet to an IP address it doesn't have a mapping for,

75
00:05:42,400 --> 00:05:43,600
it sends a request.

76
00:05:43,600 --> 00:05:45,840
Who has network address X?

77
00:05:45,840 --> 00:05:50,040
The node that has network address, that network address responds saying,

78
00:05:50,040 --> 00:05:54,000
I have network address X. The response includes the link layer address.

79
00:05:54,000 --> 00:05:58,879
On receiving the response, the requester can generate the mapping and send the packet.

80
00:05:58,879 --> 00:06:03,840
So that every node hears the request and nodes sends a request to a link layer broadcast address.

81
00:06:03,840 --> 00:06:06,680
Every node in the network will hear the packet.

82
00:06:06,680 --> 00:06:10,280
Furthermore, ARP is structured so that it contains redundant data.

83
00:06:10,280 --> 00:06:13,840
The request contains the network and link layer addresses of the requester.

84
00:06:13,840 --> 00:06:16,960
That way, when nodes hear a request, sends it a broadcast,

85
00:06:16,959 --> 00:06:20,399
they can insert or refresh a mapping in their cache.

86
00:06:20,399 --> 00:06:23,519
Nodes only respond to a request for themselves.

87
00:06:23,519 --> 00:06:26,799
This means assuming nobody is generating packets incorrectly,

88
00:06:26,799 --> 00:06:32,759
the only way you can generate a mapping for another node is in response to a packet that node sends.

89
00:06:32,759 --> 00:06:35,120
So if another node crashes or disconnects,

90
00:06:35,120 --> 00:06:38,959
it will inevitably leave the network when all the cache mappings expire.

91
00:06:38,959 --> 00:06:42,319
This makes debugging and troubleshooting ARP much easier.

92
00:06:42,319 --> 00:06:44,959
So how long these dynamically discovered mappings last?

93
00:06:44,959 --> 00:06:46,199
It depends on the device.

94
00:06:46,199 --> 00:06:48,199
Some versions of Mac OS 10, for example,

95
00:06:48,199 --> 00:06:49,800
keep them for around 20 minutes,

96
00:06:49,800 --> 00:06:52,479
while some Cisco devices use timeouts of four hours.

97
00:06:52,479 --> 00:06:55,599
The assumptions that these mappings do not change very frequently.

98
00:06:55,599 --> 00:06:58,000
This is what an ARP packet actually looks like.

99
00:06:58,000 --> 00:06:59,639
It is 10 fields.

100
00:06:59,639 --> 00:07:03,599
The hardware field states what link layer this requester response is for.

101
00:07:03,599 --> 00:07:07,919
The protocol field states what network protocol this requester response is for.

102
00:07:07,919 --> 00:07:12,759
The link field specify how many bytes long the link layer network addresses are.

103
00:07:12,759 --> 00:07:16,839
The app code specifies whether the packet is a requester response.

104
00:07:16,839 --> 00:07:21,360
The four address fields are for requesting and specifying the mappings.

105
00:07:21,360 --> 00:07:24,599
Remember, all of these fields are stored in network order or big Indian.

106
00:07:24,599 --> 00:07:26,079
So if you have an app code of 15,

107
00:07:26,079 --> 00:07:30,480
it will be stored as 0x, 0, 0, 0, f in the app code field.

108
00:07:30,480 --> 00:07:33,959
So let's say our client wants to send a packet to the broader internet through its gateway,

109
00:07:33,959 --> 00:07:36,560
but it doesn't have the gateway's Ethernet address.

110
00:07:36,560 --> 00:07:40,719
The ARP request will specify that the hardware is Ethernet, which is value 1,

111
00:07:40,720 --> 00:07:45,480
the protocol is IP, which is value 0x, 0, 8, 0, 0.

112
00:07:45,480 --> 00:07:50,080
The hardware address length is 6, and the protocol length is 4.

113
00:07:50,080 --> 00:07:53,480
The app code will be request whose value is 1.

114
00:07:53,480 --> 00:07:57,400
The ARP source hardware field will be the requester's Ethernet address,

115
00:07:57,400 --> 00:08:02,200
68a, 860, 0, 5, 82, 85, 22.

116
00:08:02,200 --> 00:08:07,960
The source protocol field is the requester's IP address, 192.168.0.5.

117
00:08:07,959 --> 00:08:10,719
The destination hardware address can be set to anything.

118
00:08:10,719 --> 00:08:13,000
It's what the packet is trying to discover.

119
00:08:13,000 --> 00:08:17,079
The destination protocol address is the address the client is trying to find a mapping for,

120
00:08:17,079 --> 00:08:19,879
192.168.0.1.

121
00:08:19,879 --> 00:08:22,599
The client sends this frame on the Ethernet.

122
00:08:22,599 --> 00:08:27,000
Every note of the network receives it and refreshes the mapping between the senders,

123
00:08:27,000 --> 00:08:31,879
link layer address, 68a, 860, 0, 5, 85, 22,

124
00:08:31,879 --> 00:08:36,000
and its network layer address 192.168.0.5,

125
00:08:36,000 --> 00:08:39,080
or it inserts a mapping if it doesn't already have one.

126
00:08:39,080 --> 00:08:43,519
The client will generate an ARP request whose link layer source address is its address,

127
00:08:43,519 --> 00:08:48,159
68a, 860, 0, 5, 82, 22.

128
00:08:48,159 --> 00:08:51,320
The destination link layer address is the broadcast address,

129
00:08:51,320 --> 00:08:56,159
FF, FF, FF, FF, FF, FF, all ones.

130
00:08:56,159 --> 00:09:00,960
The gateway sees that the request is 4x IP address, and so generates a reply.

131
00:09:00,960 --> 00:09:04,559
Like the request, the ARP reply will specify that the hardware is Ethernet,

132
00:09:04,559 --> 00:09:05,559
which is value 1.

133
00:09:05,559 --> 00:09:09,159
The protocol is IP, which is value 0x, 0, 8, 0, 0.

134
00:09:09,159 --> 00:09:12,759
The hardware address is linked to 6, and the protocol length is 4.

135
00:09:12,759 --> 00:09:15,759
The opcode will be reply, this value is 2.

136
00:09:15,759 --> 00:09:23,199
The ARP source hardware field will be the reply is Ethernet address, 0, 18, E7, F3, CEA1, 1A.

137
00:09:23,199 --> 00:09:28,279
The source protocol field is the answer, 192.168.0.1.

138
00:09:28,279 --> 00:09:35,519
The destination hardware address is the source address of the request, 68a, 860, 0, 5, 85, 22.

139
00:09:35,519 --> 00:09:42,240
The destination protocol address is the source protocol address of the request, 192.168.0.5.

140
00:09:42,240 --> 00:09:45,480
It's an open question what link layer address you send the response to.

141
00:09:45,480 --> 00:09:49,120
The original ARP specification stated that the reply should send it to the requester's

142
00:09:49,120 --> 00:09:51,600
link layer address, so unicast.

143
00:09:51,600 --> 00:09:54,559
It's commented at a broadcast that, however, is doing so can more aggressive later

144
00:09:54,559 --> 00:09:57,639
play cache entries if the mapping needs to change.

145
00:09:57,639 --> 00:10:01,159
The nodes also consider were called gratuitous ARP packets requesting non-existent

146
00:10:01,159 --> 00:10:04,879
mappings in order to advertise themselves on the network.

147
00:10:04,879 --> 00:10:08,679
So we've seen how in order to run packets, one needs to be able to map network layer

148
00:10:08,679 --> 00:10:11,000
addresses to link layer addresses.

149
00:10:11,000 --> 00:10:15,279
The address resolution protocol or ARP provides the service through a simple request reply

150
00:10:15,279 --> 00:10:16,279
exchange.

151
00:10:16,279 --> 00:10:20,399
If a node needs to send a packet, 2, or through an IP address whose link layer address

152
00:10:20,399 --> 00:10:23,279
it does not have, it could request the address through ARP.

