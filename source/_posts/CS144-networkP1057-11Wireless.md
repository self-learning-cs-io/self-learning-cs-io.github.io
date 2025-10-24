---
title: CS144 NetworkP1057 11Wireless
---

1
00:00:00,000 --> 00:00:04,500
So in this video, I'm going to dig into the details of A to 11 or Wi-Fi,

2
00:00:04,500 --> 00:00:09,500
but its packet formats look like how it uses different media access control algorithms

3
00:00:09,500 --> 00:00:12,000
and show an overview of Wi-Fi itself.

4
00:00:12,000 --> 00:00:16,000
So, recall when we were talking about physical errors and coding,

5
00:00:16,000 --> 00:00:21,000
I mean different modulation schemes, that something like 802.11N

6
00:00:21,000 --> 00:00:24,000
has a whole bunch of different speeds you can operate at.

7
00:00:24,000 --> 00:00:29,000
So here's just a limited set of, actually a reasonably small subset

8
00:00:29,000 --> 00:00:32,000
of the ways in which an 802.11N link can work.

9
00:00:32,000 --> 00:00:35,000
And so there's a thing MCS index is actually filled in the packet,

10
00:00:35,000 --> 00:00:38,000
and it tells you for the data portion of a packet,

11
00:00:38,000 --> 00:00:43,000
how that data portion is modulated and how it's coded.

12
00:00:43,000 --> 00:00:48,000
And so in practice, 802.11N is used everything from binary phase shift

13
00:00:48,000 --> 00:00:53,000
king up to 64 quadrature amplitude modulation with coding schemes from 1.5 to 5.6.

14
00:00:53,000 --> 00:00:57,000
And this means that the actual range of data speeds that you see

15
00:00:57,000 --> 00:01:03,000
for an 802.11N link, which is going to adapt based on the observed signal to noise ratio,

16
00:01:03,000 --> 00:01:06,000
is from, and this is just a subset, it actually goes faster,

17
00:01:06,000 --> 00:01:09,000
as we'll see in the future video on mymo,

18
00:01:09,000 --> 00:01:16,000
from 6.5 megabits per second to 150 megabits per second.

19
00:01:16,000 --> 00:01:21,000
And so this is a factor of, you know, over 20 difference between the speeds.

20
00:01:22,000 --> 00:01:27,000
And so Wi-Fi 802.11N is able to, depending on what the spectrum is like,

21
00:01:27,000 --> 00:01:33,000
depending on what timing is like, is able to adapt across a huge range of speeds,

22
00:01:33,000 --> 00:01:37,000
so that it can adapt its link based on the channel conditions.

23
00:01:37,000 --> 00:01:41,000
Compared to a wired system where, because the signal to noise ratio is fixed,

24
00:01:41,000 --> 00:01:45,000
based on the medium, you just have a fixed speed that you're going to operate at,

25
00:01:45,000 --> 00:01:47,000
which is the fastest speed the other side can do.

26
00:01:48,000 --> 00:01:51,000
So you imagine this is kind of a challenge, which is that Wi-Fi,

27
00:01:51,000 --> 00:01:54,000
depending on the signal to noise ratio that it observes the channel conditions,

28
00:01:54,000 --> 00:01:57,000
wants to be able to operate at this huge range of bid rates.

29
00:01:57,000 --> 00:01:59,000
And so how does this work?

30
00:02:03,000 --> 00:02:06,000
And so this is down occurring at the physical link layer.

31
00:02:06,000 --> 00:02:12,000
And so what happens is, this is what the 802.11B physical layer looks like.

32
00:02:13,000 --> 00:02:17,000
So here, there's this physical layer header, which starts with some synchronization bits.

33
00:02:17,000 --> 00:02:21,000
This would allow the other side to detect, oh, this is actually a Wi-Fi signal,

34
00:02:21,000 --> 00:02:22,000
this isn't just junk.

35
00:02:22,000 --> 00:02:24,000
So there's a series of synchronization bits.

36
00:02:24,000 --> 00:02:28,000
Followed by 16 bits that denote, okay, it's no longer synchronization,

37
00:02:28,000 --> 00:02:31,000
this is what's called the SFD, or start of frame delimiter.

38
00:02:31,000 --> 00:02:35,000
So there's this particular sequence of bits you expect.

39
00:02:35,000 --> 00:02:39,000
Then there's a start of frame delimiter denoting that the synchronization is over,

40
00:02:40,000 --> 00:02:42,000
because it might be you started saying the middle of the synchronization,

41
00:02:42,000 --> 00:02:44,000
you don't know when it's going to end.

42
00:02:44,000 --> 00:02:49,000
And then after that, there's a series of 48 bits denoting the signal,

43
00:02:49,000 --> 00:02:58,000
the service, the length, and the CRC of this physical layer chunk.

44
00:02:58,000 --> 00:03:01,000
All of this is being scrambled by the physical layer,

45
00:03:01,000 --> 00:03:06,000
using for error correction, coding, interleaving, all those kinds of techniques

46
00:03:06,000 --> 00:03:09,000
that will be robust to bitters.

47
00:03:09,000 --> 00:03:14,000
Now, of course, you need to get this in its entirety before you can start

48
00:03:14,000 --> 00:03:18,000
and decide pulling the link from apart, because you just seem to say no what the length is.

49
00:03:21,000 --> 00:03:23,000
So that's the physical layer.

50
00:03:23,000 --> 00:03:26,000
Then in the link frame, we have a whole bunch of fields.

51
00:03:26,000 --> 00:03:29,000
So there's the frame control field. This gives you control information

52
00:03:29,000 --> 00:03:31,000
about the frame, what it's like.

53
00:03:31,000 --> 00:03:37,000
There's duration. This tells you how long this packet or things about it are going to take.

54
00:03:37,000 --> 00:03:45,000
This is really important, if say the data rate is higher than you can demodulate,

55
00:03:45,000 --> 00:03:48,000
like you don't have the high enough signals noise ratio.

56
00:03:48,000 --> 00:03:51,000
So this duration is sent, you know how long this packet or this exchange is going to be.

57
00:03:51,000 --> 00:03:54,000
It's a way to tell the notes, hey, this is how long it's going to take.

58
00:03:54,000 --> 00:03:59,000
There can be up to four addresses embedded in the header.

59
00:03:59,000 --> 00:04:01,000
Often you just have a two addressing mode.

60
00:04:01,000 --> 00:04:04,000
Oh, there's the source and there's the destination, but there are other things you can do

61
00:04:04,000 --> 00:04:06,000
as you want to bridge across networks, etc.

62
00:04:06,000 --> 00:04:08,000
There's a sequence number.

63
00:04:08,000 --> 00:04:10,000
Then there's the network data.

64
00:04:10,000 --> 00:04:12,000
What's coming in from the network layer.

65
00:04:12,000 --> 00:04:14,000
And then finally a frame check sequence.

66
00:04:14,000 --> 00:04:18,000
So think of this like a CRC. It's a four byte frame check sequence.

67
00:04:19,000 --> 00:04:23,000
So let's look at these first two fields, the frame control and duration.

68
00:04:23,000 --> 00:04:25,000
Now what these are used for, as I was saying,

69
00:04:25,000 --> 00:04:28,000
is the duration field tells listeners other nodes that can hear the packet

70
00:04:28,000 --> 00:04:30,000
and also the recipient.

71
00:04:30,000 --> 00:04:32,000
How long this packet or packet exchange is going to take.

72
00:04:32,000 --> 00:04:36,000
So in that way, even if they can't understand those packets because they're too fast,

73
00:04:36,000 --> 00:04:38,000
they know how long it's going to take.

74
00:04:38,000 --> 00:04:41,000
And they can use this for something called virtual carrier sense.

75
00:04:41,000 --> 00:04:46,000
The idea here is a call that in the CSMA-CA algorithm,

76
00:04:46,000 --> 00:04:51,000
a node will count down while the channel is busy.

77
00:04:52,000 --> 00:04:56,000
Now it could detect the channel is busy directly by listening or

78
00:04:56,000 --> 00:05:00,000
it could detect the channel is busy virtually by being told that it is.

79
00:05:00,000 --> 00:05:05,000
So this duration field, for example, is what a CTS packet uses to tell nodes around it.

80
00:05:05,000 --> 00:05:07,000
Hey, clear to send.

81
00:05:07,000 --> 00:05:12,000
Your channel is busy for this long because I'm going to be receiving something

82
00:05:12,000 --> 00:05:14,000
and so you shouldn't transmit.

83
00:05:14,000 --> 00:05:18,000
So another thing the A to L of N header can do is essentially virtualize a link.

84
00:05:18,000 --> 00:05:20,000
So I think we have these three addresses.

85
00:05:20,000 --> 00:05:22,000
So I'm not going to go into the fourth one.

86
00:05:22,000 --> 00:05:23,000
Let's just consider these three.

87
00:05:23,000 --> 00:05:27,000
So this is the case where if I want to have an AP,

88
00:05:29,000 --> 00:05:35,000
act more like a switch, say, than an independent link layer device,

89
00:05:35,000 --> 00:05:37,000
which a packet is destined.

90
00:05:37,000 --> 00:05:43,000
So in this case, I can tell, hey, I'd like to send a packet from adder1,

91
00:05:44,000 --> 00:05:50,000
2 adder2, via adder3.

92
00:05:51,000 --> 00:05:54,000
There's a way of telling the AP, aha, you know,

93
00:05:54,000 --> 00:05:58,000
I'd like to send a packet to this other link layer address through you.

94
00:05:58,000 --> 00:06:02,000
So you can sort of virtualize that link of the access point.

95
00:06:02,000 --> 00:06:12,000
And so give the nodes that are connected wirelessly virtual access to the wired network sitting behind the AP.

96
00:06:12,000 --> 00:06:17,000
So one of the things that we saw with RTSCTS is that depending on the speed that you use,

97
00:06:18,000 --> 00:06:24,000
RTSCTS, these control packets could have a significant overhead up to 25% at 11 megabits for adders to 11b.

98
00:06:24,000 --> 00:06:30,000
And this all comes down to the fact that because 80211 has this huge range of bit rates,

99
00:06:30,000 --> 00:06:32,000
but it needs to be backwards compatible.

100
00:06:32,000 --> 00:06:39,000
This means that, say, this physical region, the physical frame header needs to be

101
00:06:39,000 --> 00:06:41,000
comprehensive by everyone listening.

102
00:06:42,000 --> 00:06:49,000
So I can't, if I'm a transmitter, I can't transmit the physical header at my full speed.

103
00:06:49,000 --> 00:06:56,000
So if I'm operating at 1 megabit or 600 megabits, I still need to transmit this header at the same speed,

104
00:06:56,000 --> 00:07:01,000
so that everyone can understand it, same with things like the duration field.

105
00:07:01,000 --> 00:07:06,000
And so the way to think about this is that because the slowest link is, say, 1 megabit per second,

106
00:07:07,000 --> 00:07:12,000
I need to transmit this that everyone operating, perhaps even at 1 megabit per second, can understand it.

107
00:07:12,000 --> 00:07:18,000
Then the data region may maybe will save you 600 megabits per second, so tiny, tiny, tiny,

108
00:07:18,000 --> 00:07:23,000
but this initial control sequence is still going to remain the same length.

109
00:07:23,000 --> 00:07:29,000
It's going to practice what this means is that as Wi-Fi speeds get faster and faster and faster.

110
00:07:30,000 --> 00:07:38,000
So you can imagine if I have a slow speed, then the data, this is at 1 megabits, is slow.

111
00:07:38,000 --> 00:07:42,000
Here's control, here's data.

112
00:07:44,000 --> 00:07:51,000
The control is small compared to the data, but as I make the data region faster and faster,

113
00:07:52,000 --> 00:08:03,000
here's data, which is faster, control, or faster, it can be in fact that the control, here's data,

114
00:08:04,000 --> 00:08:10,000
here's control, can be the dominant duration of the packet.

115
00:08:10,000 --> 00:08:15,000
These bits are sent so slowly compared to the data region, say, at the network layer,

116
00:08:15,000 --> 00:08:20,000
that all of my airtime is consumed by these control headers.

117
00:08:20,000 --> 00:08:25,000
And so people, Microsoft Research have done some analysis of this and shown that, look,

118
00:08:25,000 --> 00:08:32,000
when you're operating up 600 megabits per second, in terms of the fastest, 80 to 11 speed, 80 to 11 n, you can do today,

119
00:08:32,000 --> 00:08:42,000
this control sequence is 92% of your airtime, that is you're only spending 8% of your time actually sending data.

120
00:08:42,000 --> 00:08:47,000
So you can imagine, even if you're doubly or data rate, you're not going to actually doubly or throughput,

121
00:08:47,000 --> 00:08:52,000
because you're going to go from consuming 8% of the time to 4% of the time.

122
00:08:52,000 --> 00:08:58,000
But still, then 96% of your airtime will be consumed with control traffic, and so there's this diminishing returns.

123
00:08:58,000 --> 00:09:05,000
So, 80 to 11 is this basic Mac format, designed to work on top of many physical errors, many modulations, many speeds.

124
00:09:05,000 --> 00:09:14,000
But part of that is that it needs to have backwards compatibility, so rather than, say, talk about the number of bytes that this packet's going to last,

125
00:09:14,000 --> 00:09:19,000
and talk about how long this packet's going to last in time, so that even if you don't want to know what the modulation scheme is,

126
00:09:19,000 --> 00:09:24,000
because some future version of Wi-Fi that your device doesn't talk, it knows how long the packet will be.

127
00:09:24,000 --> 00:09:30,000
Mac control, things like the control descent packet, are done in terms of duration.

128
00:09:30,000 --> 00:09:36,000
So there's this duration field where we can say, hey, the channel around me needs to be clear for this number of microseconds.

129
00:09:36,000 --> 00:09:43,000
It's a little bit also largely to virtualize a link, right, by embedding additional addresses, then you can actually bridge between the wired and the wireless ethernet.

130
00:09:43,000 --> 00:09:51,000
And so while we read all those about faster and faster Wi-Fi, you know, 600 megabits per second, in practice, it's not actually getting that fast.

131
00:09:51,000 --> 00:09:59,000
And the reason being that these control headers that are needed for backwards compatibility and for interoperability just end up consuming all of your airtime.

132
00:09:59,000 --> 00:10:06,000
Is the actual observed data throughput on a 600 megabit per second Wi-Fi link is far, far, far below 600 megabits per second.

133
00:10:06,000 --> 00:10:10,000
It's probably closer to it most, you know, 50 megabits per second.

