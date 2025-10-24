---
title: CS144 NetworkP463 7PacketSwitching
---

1
00:00:00,000 --> 00:00:04,139
To continue on our theme of packet switching, in this video I'm going to tell you

2
00:00:04,139 --> 00:00:08,700
how packet switches work. That's things like ethernet switches, internet routers,

3
00:00:08,700 --> 00:00:17,500
and so on. In this video we're going to learn about what a packet switch looks

4
00:00:17,500 --> 00:00:21,500
like, what a packet switch does, whether it's an ethernet switch or an internet

5
00:00:21,500 --> 00:00:27,300
router, and how address lookups work. So let's start with a picture of a generic

6
00:00:27,300 --> 00:00:33,179
packet switch. The three main stages of a packet switch are that when a packet

7
00:00:33,179 --> 00:00:36,899
arrives, the first thing that we do is look up at the address. This means looking

8
00:00:36,899 --> 00:00:40,899
at the destination address to figure out where it's going to go next. We do this

9
00:00:40,899 --> 00:00:45,179
by looking up in a forwarding table. We send the destination address down to the

10
00:00:45,179 --> 00:00:48,859
forwarding table, which will tell us the egress link or the port that it's going

11
00:00:48,859 --> 00:00:53,460
to, and that helps us decide where to send it next. The next thing that we may need

12
00:00:53,460 --> 00:00:58,100
to do is to update the header. So for example, if it's an internet router, we have

13
00:00:58,100 --> 00:01:03,740
to decrement the TTL and update the checksum. The next thing we have to do is to

14
00:01:03,740 --> 00:01:09,099
queue the packet. This is because there may be some congestion, there may be many

15
00:01:09,099 --> 00:01:13,060
packets trying to get to this outgoing link at the same time. So we use a buffer

16
00:01:13,060 --> 00:01:18,260
memory to hold some packets that are waiting their turn to depart on the egress

17
00:01:18,260 --> 00:01:23,260
line. Of course, one input, one output packet switch is not very

18
00:01:23,260 --> 00:01:26,820
interesting. Packets which is in general will have multiple inputs and

19
00:01:26,820 --> 00:01:30,180
multiple outputs. His one with three inputs and three outputs, packets will

20
00:01:30,180 --> 00:01:34,980
arrive. And I've color coded these ones. The red packets are going to the red

21
00:01:34,980 --> 00:01:42,820
output over here, and the blue one is going to the blue output up here. So just

22
00:01:42,820 --> 00:01:45,939
as before, the packets are going to be processed. The address is going to be

23
00:01:45,939 --> 00:01:49,540
looked up. It will update the header if we need to. Then we're going to transfer

24
00:01:49,540 --> 00:01:54,820
it across that back plane. This is supposed to represent a shared bus over which

25
00:01:54,820 --> 00:01:58,020
all of these packets are going to pass. And then they're going to find their way

26
00:01:58,020 --> 00:02:02,100
to the output queue. In this case, we've got two red packets that are going to

27
00:02:02,100 --> 00:02:07,580
contend for the same output. So what we'll need to do is we can send the blue one

28
00:02:07,580 --> 00:02:12,180
to its output. We can send one of the red ones all the way through to its output.

29
00:02:12,180 --> 00:02:17,219
But because we can only send one packet at a time, the other red packet is

30
00:02:17,219 --> 00:02:21,419
going to have to wait in the buffer memory until the until the first one is gone.

31
00:02:21,419 --> 00:02:25,939
Once it's gone, this one can go on its way. So this is sort of the generic

32
00:02:25,939 --> 00:02:32,180
structure of a packet switch. More specifically, one very common type of

33
00:02:32,180 --> 00:02:37,740
packet switch is an ethernet switch. These are the four basic operations that an

34
00:02:37,740 --> 00:02:41,939
ethernet switch must perform. So it's an ethernet switch as an example of a

35
00:02:41,939 --> 00:02:45,460
packet switch. It's just a very specific one that's dealing with ethernet

36
00:02:45,460 --> 00:02:50,020
ethernet frames. So the first thing it does is it examines the header of each

37
00:02:50,020 --> 00:02:55,860
arriving frame. If the ethernet destination address, if the destination address,

38
00:02:55,860 --> 00:02:59,980
and these are 48 bit addresses with ethernet, if it finds that address in the

39
00:02:59,980 --> 00:03:04,260
forwarding table, it's going to forward the frame to the correct outgoing port or

40
00:03:04,260 --> 00:03:11,020
maybe a selection of ports if it's a multi-cast packet. If it finds that the

41
00:03:11,020 --> 00:03:16,980
ethernet destination address is not in the table, in an ethernet switch it

42
00:03:16,980 --> 00:03:22,180
broadcasts the frames to all ports. Well, all ports except the one through which

43
00:03:22,180 --> 00:03:25,580
the frame arrived. In other words, it doesn't know where to send it, so it's going to

44
00:03:25,580 --> 00:03:31,860
flood it to everybody in the hope that it'll reach its destination. How does it

45
00:03:31,860 --> 00:03:35,460
populate the table in the first place? Well, it does this by learning addresses

46
00:03:35,460 --> 00:03:40,040
that it sees on the wire. More specifically, when a packet arrives, the

47
00:03:40,039 --> 00:03:45,799
entries in the table are learned by examining the ethernet source address of

48
00:03:45,799 --> 00:03:51,599
arriving packets. So when packets first come through, the destination address is

49
00:03:51,599 --> 00:03:57,799
not in the table. It's broadcast to everybody. Hopefully the other end will

50
00:03:57,799 --> 00:04:02,000
respond. Send a packet back. We'll see its source address and we will therefore

51
00:04:02,000 --> 00:04:06,000
learn that in future we must send packets through that particular port to reach

52
00:04:06,000 --> 00:04:09,319
that particular address. So these are the four basic operations of an ethernet

53
00:04:09,319 --> 00:04:13,479
switch. Let's contrast that with an internet router, another type of packet

54
00:04:13,479 --> 00:04:20,319
switch, which processes the internet destination, the IP destination address

55
00:04:20,319 --> 00:04:25,560
instead. So there's seven basic operations. Because it's dealing with IP

56
00:04:25,560 --> 00:04:30,360
data grams that are encapsulated in ethernet packets, first of all it's

57
00:04:30,360 --> 00:04:34,879
going to check to see whether the ethernet destination address of the

58
00:04:34,879 --> 00:04:39,519
arriving frame belongs to the router. In other words, is it specifically addressed

59
00:04:39,519 --> 00:04:44,319
to this router? If it is, it accepts it. If it doesn't, it drops it because it's

60
00:04:44,319 --> 00:04:50,480
clearly not destined for us. The next thing it does is to check that the IP

61
00:04:50,480 --> 00:04:55,680
version number is four, if it's an IPv4 router, and checks the length of the

62
00:04:55,680 --> 00:05:01,680
data gram. Next, it's going to decrement the TTL and update the IP header checks

63
00:05:01,680 --> 00:05:07,120
them because the checksum includes the TTL. It checks to see if the TTL equals

64
00:05:07,120 --> 00:05:10,800
zero. If it does, it drops the packet. If it doesn't, then it can continue to

65
00:05:10,800 --> 00:05:16,120
forward it. Next, it's going to look up in the the forwarding table. If the

66
00:05:16,120 --> 00:05:20,600
IP destination address is in the forwarding table, it's going to forward it to the

67
00:05:20,600 --> 00:05:25,319
correct egress port or ports if it's multicast. And this is the correct

68
00:05:25,319 --> 00:05:32,120
port to reach the next hop because IP is doing hot by hot routing. Now it's

69
00:05:32,120 --> 00:05:36,040
decided which port it's going to depart from. It encapsulates the IP data

70
00:05:36,040 --> 00:05:41,120
gram back into an ethernet frame. And it has to figure out the correct ethernet

71
00:05:41,120 --> 00:05:44,399
destination address to use for the next hop router. We'll learn this process

72
00:05:44,399 --> 00:05:48,920
later at something called ARP. And so it'll encapsulate the IP data

73
00:05:48,920 --> 00:05:54,560
gram into the ethernet frame, create the new ethernet frame and then send it

74
00:05:54,560 --> 00:06:01,240
onto the wire. So the basic operations of a packet switcher to look up the

75
00:06:01,240 --> 00:06:04,519
address. So we're going to ask the question, how is this address looked up in the

76
00:06:04,519 --> 00:06:08,439
forwarding table? I'm going to show you some examples in the moment. The second

77
00:06:08,439 --> 00:06:12,879
operation is switching. Once it's figured out which egress port it needs to go

78
00:06:12,879 --> 00:06:16,959
do, it now has to send it to that correct output. It's got to deliver it to that

79
00:06:16,959 --> 00:06:21,680
correct output port so it can leave on the correct outgoing link. I'm going to

80
00:06:21,680 --> 00:06:26,319
start with the lookup address. And then in the next video we're going to learn

81
00:06:26,319 --> 00:06:34,600
about switching. So for ethernet switches looking up the address is very straight

82
00:06:34,600 --> 00:06:38,600
forward. It will have a forwarding table which I've drawn in a very simplified form

83
00:06:38,600 --> 00:06:45,439
here. This is the match that it's going to perform. This is what it's going to

84
00:06:45,439 --> 00:06:49,000
try and match the ethernet destination address on. And this is then the action

85
00:06:49,000 --> 00:06:55,279
that's going to perform if it finds a match. If an incoming ethernet frame has a

86
00:06:55,279 --> 00:07:01,879
destination address that matches this one here, then it's going to forward it to port

87
00:07:01,879 --> 00:07:05,839
seven. If it matches on this address here, then it's going to forward it to port three.

88
00:07:05,839 --> 00:07:11,639
I've just drawn the 48 bit addresses here as hexadecimal numbers. Okay, so the

89
00:07:11,639 --> 00:07:18,720
ethernet forwarding table has a number of rows one for each address and for each

90
00:07:18,720 --> 00:07:22,560
address it's going to tell it which port that it needs to forward to. And if it misses

91
00:07:22,560 --> 00:07:27,360
then it broadcasts because that's what ethernet switches do when they don't know the address

92
00:07:27,360 --> 00:07:34,880
to send it to. Now to do this lookup, the way that it performs this lookup is that typically

93
00:07:34,880 --> 00:07:39,600
it stores these addresses in a hash table because these are 48 bit addresses but there's

94
00:07:39,600 --> 00:07:44,640
nothing like 2 to the 48 entries. There may be 100,000 maybe even a million entries. So

95
00:07:44,639 --> 00:07:49,360
nothing like 2 to the power of 48. So it's a very sparse table. So typically they store

96
00:07:49,360 --> 00:07:55,639
addresses in a hash table. It might be a two-way hash to increase the probability of having

97
00:07:55,639 --> 00:08:02,319
a hit on the first try. And then it will look up the match by looking for an exact match

98
00:08:02,319 --> 00:08:07,399
in the hash table. In other words, it's looking for an exact match on that 48 bit address.

99
00:08:07,399 --> 00:08:12,240
So that's how address lookups are done in an ethernet switch. Now let's look at how they're

100
00:08:12,240 --> 00:08:20,360
done in an IP router and in an internet router. So IP addresses are a bit more complicated.

101
00:08:20,360 --> 00:08:25,519
IP addresses, we don't just look up on an exact match. We look up on what's called a

102
00:08:25,519 --> 00:08:32,360
longest prefix match. We'll learn about why that is later when we learn about IP addresses.

103
00:08:32,360 --> 00:08:37,639
But suffice to know right now, we're performing a longest prefix match rather than an exact

104
00:08:37,639 --> 00:08:44,559
match. So just as before, we've got some matches here of some IP prefixes. And I'll tell you

105
00:08:44,559 --> 00:08:49,960
what those are in a moment. And then this is the action that we would perform. So for example,

106
00:08:49,960 --> 00:08:56,879
if we had a match on this IP destination address, this one here, and this is a specific IP

107
00:08:56,879 --> 00:09:04,759
destination address, 127.43.57.99. So that'll be a 32 bit address. We're going to forward it to

108
00:09:04,759 --> 00:09:10,960
this IP address. So this is actually the IP address of the interface of the next router that

109
00:09:10,960 --> 00:09:17,080
we're going to. After it's made this decision, it's going to resolve this. It's going to turn

110
00:09:17,080 --> 00:09:22,840
this IP address into the equivalent ethernet destination address of that interface so that

111
00:09:22,840 --> 00:09:28,319
it knows what to encapsulate the packet into. But anyway, for inside the forwarding table,

112
00:09:28,319 --> 00:09:32,799
it maintains it as an IP address. So if we see something that matches here, then this is the

113
00:09:32,799 --> 00:09:40,959
action that we perform. So let's look at what a longest prefix match is. Along here, I've got the

114
00:09:40,959 --> 00:09:49,039
the IP version for address number line. In other words, all of the possible two to the 32 different

115
00:09:49,039 --> 00:09:57,199
addresses that we can have in an IP destination address. I want to have got up here as some line

116
00:09:57,200 --> 00:10:04,640
segments. These line segments are prefixes. And they're always represented as in the following form.

117
00:10:04,640 --> 00:10:12,680
This line segment here corresponds to all of the addresses that start with 65. The interpretation

118
00:10:12,680 --> 00:10:21,280
of this is all of those with 65 as the first eight bits. So if a packet and incoming destination

119
00:10:21,280 --> 00:10:26,920
address has 65 as the first eight bits of address, then it's going to match on this line

120
00:10:26,919 --> 00:10:33,279
segment. And this line segment represent all the IP addresses that start with 65 in their first eight

121
00:10:33,279 --> 00:10:41,439
bit locations. Similarly, this line segment here corresponds to all of the IP addresses that their

122
00:10:41,439 --> 00:10:51,319
first 16 bits are 128.9. So there are two to the power of 16 addresses here, all with the first 16 bits 128.9.

123
00:10:51,320 --> 00:11:01,440
And so we represent that prefix as 128.9.00 slash 16 corresponding to those first 16 bits. Finally,

124
00:11:01,440 --> 00:11:08,400
one more example. This one up here, which is a very short line segment, is all those addresses that

125
00:11:08,400 --> 00:11:15,240
share the first 24 bits. This means there are two to the eight of them or 256 different addresses that

126
00:11:15,240 --> 00:11:22,519
all start with 128.9.176. Okay, so when a packet arrives with a particular destination address,

127
00:11:22,519 --> 00:11:28,919
and here's an example here, this one is clearly going to match on this line segment right here.

128
00:11:31,799 --> 00:11:37,639
So this is the address on the number line. This is where it matches here so that we know that the

129
00:11:37,639 --> 00:11:42,360
prefix that we've matched on in the table is this one. So the table will contain this entry here.

130
00:11:42,360 --> 00:11:51,159
This address will match on this entry in the table. Similarly, this address 128.9.16.14 is going to

131
00:11:51,159 --> 00:11:59,680
match on this line segment here. Notice that it matched on this one, but this one is a is a longer matching

132
00:11:59,680 --> 00:12:05,279
prefix. More of the bits match on this one than they do on this one. This is a longer longer prefix. It's

133
00:12:05,279 --> 00:12:11,000
21 bits prefix, whereas this one is only a 16 bit prefix. So because it matches on both and this is

134
00:12:11,000 --> 00:12:20,039
the longest one, the address this address here will match on this prefix here in the table. So in

135
00:12:20,039 --> 00:12:26,600
routing lookups, what we do is we find the longest matching prefix, also known as the most

136
00:12:26,600 --> 00:12:34,759
specific route amongst all the prefixes that match the destination address. Let's look at how we

137
00:12:34,759 --> 00:12:41,399
might implement this in a table. And one common implementation is to use what's called a binary

138
00:12:41,399 --> 00:12:48,519
tri TRIE. And there are many variations of this, but this is the most common one here. Let's say that

139
00:12:48,519 --> 00:12:53,879
we had a prefix table that looked like this. This prefix table is a bit strange because all the

140
00:12:53,879 --> 00:12:58,919
prefixes are very short. I'm just doing that so that they can be clearly represented in this table.

141
00:12:58,919 --> 00:13:06,439
So I've got 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 different entries in the table. And I'm going to populate

142
00:13:06,439 --> 00:13:16,759
them on this tri right here. Because the matching of an incoming address is going to have variable length,

143
00:13:16,759 --> 00:13:22,599
we need a data structure to hold variable length entries. So the way that this data structure holds

144
00:13:22,680 --> 00:13:31,720
these entries is let's take the 0, 0, 0, 0, 1, this is 0, this is 0, this is 0, this is 0, and then this

145
00:13:31,720 --> 00:13:37,240
is 1. In other words, we take the left branch for 0 and the right branch for 1. And so we encode or

146
00:13:37,240 --> 00:13:43,480
store this entry A, this particular leaf corresponding to that entry. And suddenly at the other extreme,

147
00:13:43,560 --> 00:13:53,399
let's take a look at J, that's 1, 1, 1, 1, 0, 0, 0, 0 corresponding to this entry here. And this is

148
00:13:53,399 --> 00:13:59,080
where we'll find J at the leaf. Once we've got this data structure for storing the entries, when a

149
00:13:59,080 --> 00:14:04,200
packet comes in with a particular destination address, we can just do a bit by bit comparison,

150
00:14:04,200 --> 00:14:10,279
traverse this tree, and it will tell us which entry is the longest matching prefix. If we get to

151
00:14:10,279 --> 00:14:15,000
a leaf and find that there's nothing there, we go back to the nearest matching one that shared

152
00:14:15,000 --> 00:14:19,319
bits in common with that address. You might want to experiment with this with these other entries

153
00:14:19,319 --> 00:14:26,600
in the table. So this is one common way of storing and performing the look up for a longest matching

154
00:14:26,600 --> 00:14:31,799
prefix. And there's another entry, another mechanism, which is quite commonly used to, that's to

155
00:14:31,799 --> 00:14:39,319
use a special type of memory device called a tenery content addressable memory or a Tcam. And a Tcam,

156
00:14:39,480 --> 00:14:46,440
that is the table again that we had before. And we start by storing it in a slightly different

157
00:14:46,440 --> 00:14:54,600
representation in the table. So entry A would be stored as for 0's and a 1. And here we've rounded

158
00:14:54,600 --> 00:15:02,360
everything out to 8 bits as if the 8 bit prefixes. And this mask value here is telling us which

159
00:15:02,360 --> 00:15:09,240
bits in the value above actually matter. So wherever there was a 0 or 1, we put a 1 to say these

160
00:15:09,240 --> 00:15:16,120
are all valid. And wherever we have an x, we put a 0. So these two bits, these two representations

161
00:15:16,120 --> 00:15:21,080
here, we can either think of them as a ternary value or two binary values that are storing this entry.

162
00:15:21,080 --> 00:15:27,159
They tell us which bits have which values and which ones don't matter. So the process of performing

163
00:15:27,159 --> 00:15:33,399
a look up is kind of brute force. We can pair an incoming address against every masked entry at

164
00:15:33,399 --> 00:15:39,480
the same time in parallel on the table. So these specialized members consume quite a bit of

165
00:15:39,480 --> 00:15:42,919
power because they're doing all of that at the same time. But they can be really, really fast.

166
00:15:42,919 --> 00:15:47,399
And so they're quite commonly used for doing longest prefix matches in routers.

167
00:15:48,600 --> 00:15:52,919
One of the last things I wanted to point out is there's sort of an increasing interest these days in

168
00:15:53,480 --> 00:15:59,240
what we might call generic look ups. You know, I made the observation before that these tables are

169
00:15:59,240 --> 00:16:06,360
holding a match field and an action field. And so we can generalize this or abstract this and say

170
00:16:06,360 --> 00:16:12,360
pretty much any packet switch is doing a look up which is a match followed by an action. And the

171
00:16:12,360 --> 00:16:18,440
match might be on any fields like an IP address or Ethernet destination address and an IP address if

172
00:16:18,440 --> 00:16:24,519
we wanted. And we might have actions like forward or drop or encapsulate or do other things. So we can

173
00:16:24,519 --> 00:16:30,840
generalize the specification of a packet switch. And nowadays packets which is a design that can do

174
00:16:30,840 --> 00:16:36,759
all sorts of different types of forwarding for layer two, layer three at the same time or they could be

175
00:16:37,319 --> 00:16:43,799
they could be for for things like switches routers, firewalls, all sorts of devices like that.

176
00:16:43,799 --> 00:16:49,399
So in summary, packets which is performed two basic operations. They perform the look ups for

177
00:16:49,399 --> 00:16:54,600
looking up addresses in a forwarding table and then they switch the packet to the correct outgoing port.

178
00:16:55,480 --> 00:16:59,559
At high level Ethernet switches and internet routers perform very similar operations. They're

179
00:16:59,559 --> 00:17:06,039
basically processing these packets in a very similar way. Address look up is different in switches

180
00:17:06,039 --> 00:17:11,480
and routers and we saw some examples of those for both Ethernet addresses and IP addresses.

181
00:17:12,440 --> 00:17:19,240
That's the end of this video.

