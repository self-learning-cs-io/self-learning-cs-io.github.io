---
title: CS144 NetworkP967 2PhysicalandLinkPrinciples
---

1
00:00:00,000 --> 00:00:06,080
So in this video about the physical error, we talk about bit errors and coding, a way to

2
00:00:06,080 --> 00:00:10,400
introduce some redundancy into data is that you can protect yourself against bit errors.

3
00:00:10,400 --> 00:00:15,759
So recall that the Shannon limit, the capacity of a communication channel, is determined

4
00:00:15,759 --> 00:00:21,600
by the bandwidth and then the base 2 log of 1 plus the signal to noise ratio.

5
00:00:21,600 --> 00:00:25,719
And so basically what this means is that in practice, the available data rate, the possible

6
00:00:25,719 --> 00:00:30,519
data rate is bounded by this signal to noise ratio. So if your signal is stronger, you

7
00:00:30,519 --> 00:00:35,320
can send data faster. If the noise on your circuit is lower, you can send data faster.

8
00:00:35,320 --> 00:00:39,759
So important is that this is a theoretical limit. Just because we know we can't do better,

9
00:00:39,759 --> 00:00:43,799
doesn't we know how to get there. In fact, a few systems today can actually get there.

10
00:00:43,799 --> 00:00:48,000
We're getting close, but doesn't actually say how to do it just that it's impossible

11
00:00:48,000 --> 00:00:53,960
to do better. So often for a variety of reasons, your bandwidth is typically fixed. Say, if

12
00:00:53,960 --> 00:00:59,480
you are operating in some unlicensed spectrum like your Wi-Fi or something, the FCC says,

13
00:00:59,480 --> 00:01:03,280
hey, you can't do more than this. You can't use more than this bandwidth. And so often,

14
00:01:03,280 --> 00:01:08,719
what systems are trying to do is improve the signal to noise ratio. But basically what

15
00:01:08,719 --> 00:01:12,680
it means is that if your signal strength is higher, then you can transmit data faster.

16
00:01:12,680 --> 00:01:18,079
You can either transmit symbols shorter, you can transmit them for shorter periods of time,

17
00:01:18,079 --> 00:01:22,400
or you can put more bits per symbol. You can make your actual constellation denser, the

18
00:01:22,400 --> 00:01:31,280
IQ constellation. So here we're transmitting this perfect black signal. But the problem is that

19
00:01:31,280 --> 00:01:35,520
this perfect wave, because there's noise on the receiver just in the hardware, what we

20
00:01:35,520 --> 00:01:40,200
receive is closer to this red signal. All of this noise introduced. And so let's take

21
00:01:40,200 --> 00:01:44,680
a step back and think, what does that mean? How would that appear to a receiver? So let's

22
00:01:44,680 --> 00:01:49,520
go back to this 16-quam constellation I showed you when talking about IQ modulation and

23
00:01:49,519 --> 00:01:53,799
signal modulation. So this is a constellation used in HSPA of 3G data standard. And so

24
00:01:53,799 --> 00:01:59,000
recall, we have these 16 points with different I and Q values. Well, so if there's no noise

25
00:01:59,000 --> 00:02:04,439
in the system, then when a signal arrives, it's going to be exactly on one of these points.

26
00:02:04,439 --> 00:02:12,639
But in practice, it's not that there's some noise the system is introduced. And so let's

27
00:02:12,639 --> 00:02:15,879
pretend, for example, that we have some very low noise reception, such that the signal

28
00:02:15,879 --> 00:02:20,479
strength is much higher than the noise. Then, well, rather than seeing this exact point

29
00:02:20,479 --> 00:02:24,960
here, we're going to see something like this. The noise is going to cause the signal to

30
00:02:24,960 --> 00:02:33,039
get around a bit, but it's still pretty clear from the constellation that it's this symbol.

31
00:02:33,039 --> 00:02:39,240
Similarly, if we were receiving this symbol, well, there's going to be some noise, but because

32
00:02:39,240 --> 00:02:44,840
the signal is much stronger than the noise, these little jitters aren't very big, and it's

33
00:02:44,840 --> 00:02:51,480
clear that it's this symbol. But now, what happens if we're in a higher noise environment?

34
00:02:51,480 --> 00:02:56,640
What that means is rather than the signal, the received signal, or what we're going to observe,

35
00:02:56,640 --> 00:03:03,560
being like this, it might be like this, where the noise causes the received signal to have

36
00:03:03,560 --> 00:03:09,039
all kinds of different phases and amplitudes than we expect because of this noise in the system.

37
00:03:09,039 --> 00:03:15,639
And fundamentally, this means that there will be some points in which we get, we make

38
00:03:15,639 --> 00:03:22,959
the wrong conclusion about what this symbol is. So in these cases, for example, while we

39
00:03:22,959 --> 00:03:29,120
thought we were trying to receive, or system might think it was 0, 0, 1, 1, or 0, 0,

40
00:03:29,120 --> 00:03:36,280
0, 1, or 1, 0, 0, 0, 0, or 0, 1, 0, 0, 0. So this is how bit errors are introduced.

41
00:03:36,280 --> 00:03:42,280
It's when your constellation, it's when the signal to noise ratio is such that some of

42
00:03:42,280 --> 00:03:48,599
the symbols are misrecorder or misunderstood. And you can imagine if we had had a sparsher

43
00:03:48,599 --> 00:03:53,800
constellation, like let's say we only had two points here and here, and this degree of noise

44
00:03:53,800 --> 00:03:57,400
would have been fine. It wouldn't have caused us to jump all the way from here over onto

45
00:03:57,400 --> 00:04:02,039
this side. But for this particular density of constellation, the noise was great enough

46
00:04:02,039 --> 00:04:07,280
to introduce some bit errors. And so it turns out that there's a really deep theory on exactly

47
00:04:07,280 --> 00:04:10,919
how this works and what's possible and what bit error rates are. And so you can say, given

48
00:04:10,919 --> 00:04:15,680
for a given modulation scheme and a signal to noise ratio, you can just analytically compute

49
00:04:15,680 --> 00:04:20,399
what your expected bit error rate is. There's some mathematical assumptions that are made,

50
00:04:20,399 --> 00:04:25,519
but this is the bedrock assumption and the bedrock principles of RF communication theory

51
00:04:25,519 --> 00:04:30,560
that served us so well. What's important here is that bit error rate can become arbitrarily

52
00:04:30,560 --> 00:04:35,519
low, but it never reaches zero. The way noise behaves, it's possible, although very

53
00:04:35,519 --> 00:04:39,639
very much have this huge spike in noise just for a moment that happens to be at that point,

54
00:04:39,639 --> 00:04:46,560
a whole bunch of things happen at once. And so the bit error rate never reaches zero. And

55
00:04:46,560 --> 00:04:53,639
what this sort of turns out in practice is that in general, sending packets just as raw

56
00:04:53,639 --> 00:04:59,360
bits, like say picking your constellation such that you have the right number of bits

57
00:04:59,360 --> 00:05:05,360
per symbol and then just directly translating from bits in a packet into bits and symbols

58
00:05:05,360 --> 00:05:10,120
turns out to rarely be the most efficient way to use the channel. Just because there's

59
00:05:10,120 --> 00:05:15,720
this non-zero small probability of bit error. But these show of course is that if you want

60
00:05:15,720 --> 00:05:19,920
to make that probability very, very low, low enough that it's unlikely that any bit will

61
00:05:19,920 --> 00:05:26,080
be an error, well then just due to the way this works, you're going to be doing much better

62
00:05:26,079 --> 00:05:30,240
than you need to in general by optimizing for this very, very case of a tiny spike, which

63
00:05:30,240 --> 00:05:36,319
might occur in any of the bits of your say, you know, 12,000 bit long or 1,500 byte packet.

64
00:05:36,319 --> 00:05:39,639
Many of the bits in terms of the actual symbols in terms of that constellation are doing

65
00:05:39,639 --> 00:05:46,560
just absolutely great, but you've sort of overprotected for this one outlier. And so in

66
00:05:46,560 --> 00:05:51,439
practice, if you just directly map your bits to the symbols, your system is going to operate

67
00:05:51,439 --> 00:05:55,399
well, well below the capacity, well, well below the Shannon limit. And so in practice, what

68
00:05:55,399 --> 00:06:00,199
you do with the physical layer is you take say here are bits, let's say we have a message

69
00:06:00,199 --> 00:06:07,759
that says hello. So H-E-L-L-O-O-O-Cama, which are these ASCII values, maps to these bits,

70
00:06:07,759 --> 00:06:16,719
here are packet, here's our packet data. Then do is transform this packet data into symbols

71
00:06:16,719 --> 00:06:22,000
with some amount of redundancy. So some amount of error correcting codes. So the packet will

72
00:06:22,000 --> 00:06:27,740
actually get a little longer in terms of the number of bits we're sending at the physical

73
00:06:27,740 --> 00:06:38,240
layer. So here say we have 48 bits. And we might send in terms of symbols say 60 bits.

74
00:06:38,240 --> 00:06:43,519
So there's 12 extra bits. We arrange this in something called coding so that if a couple

75
00:06:43,519 --> 00:06:47,600
of those bits are wrong, we can recover from that and still get the original 48 bits.

76
00:06:47,600 --> 00:06:52,879
So even if there are a couple of bit errors in here, we'll still receive the packet and

77
00:06:52,879 --> 00:06:57,600
be able to recover the data just fine. And so this is coding. The idea of adding a little

78
00:06:57,600 --> 00:07:01,160
bit of redundancy at the physical layer, you can do it anywhere but it's almost always

79
00:07:01,160 --> 00:07:05,200
done in the physical layer so the coding is not a physical layer specific idea, to improve

80
00:07:05,200 --> 00:07:09,280
your linked layer throughput. By adding a bit of redundancy, you could protect against

81
00:07:09,280 --> 00:07:14,120
a few bit errors or some of which are expected rated bit errors are. And this will in aggregate,

82
00:07:14,120 --> 00:07:17,520
although you're making it a bit longer, we'll improve the throughput of the system.

83
00:07:17,519 --> 00:07:22,319
This true both in theory and in practice. So turn this off and use his coding gain, which

84
00:07:22,319 --> 00:07:26,519
is the ratio of bits to the linked layer to the bits of the physical layer. So if you

85
00:07:26,519 --> 00:07:31,560
hear somebody say one half code, what that means is that if I have a packet that's n bits

86
00:07:31,560 --> 00:07:39,599
long at the linked layer, I turn it into two n bits at the physical layer. Or a three

87
00:07:39,600 --> 00:07:47,800
four code is each three bits, so three n bits become four n bits at the physical layer.

88
00:07:47,800 --> 00:07:53,640
So we have this redundancy so we can correct against some bit errors. So here's an example

89
00:07:53,640 --> 00:08:02,800
of a very simple wireless physical layer, 802.15.4, also called ZIGS. Also it's used in ZIGB.

90
00:08:02,800 --> 00:08:10,160
802.15.4 uses quadrature phase shift king. And so each one at each actual transmitted symbol

91
00:08:10,160 --> 00:08:16,840
has two bits. And what 802.154 does is it combines two of these QPSAs, QPSK symbols,

92
00:08:16,840 --> 00:08:21,639
into a four bit symbol. So it's what it calls these four bit symbols. There are 16 of them,

93
00:08:21,639 --> 00:08:32,720
two to the fourth. And each one then maps to 32 QPSK chips. So here it symbols at the

94
00:08:32,720 --> 00:08:37,680
linked layer and here are symbols at the physical layer. And so we take say four bits at the

95
00:08:37,680 --> 00:08:44,720
linked layer and turn it into 32 bits at the physical layer, which is 16 QPSK symbols.

96
00:08:44,720 --> 00:08:49,200
And so if I say I want to transmit a packet that has 0001, then actually it's transmitted

97
00:08:49,200 --> 00:08:54,639
at the physical layer is this sequence of bits in terms of QPSK symbols.

98
00:08:54,639 --> 00:08:58,320
So we can then figure out what's the data rate or what's the symbol rate, what's going

99
00:08:58,800 --> 00:09:05,200
on with 802.15.4. So it turns out the bit rate at the linked layer is a high of 250 kilobits per second.

100
00:09:05,920 --> 00:09:13,920
The coding rate, you have 16 chips of two bits, that's 32 bits, is that the physical layer

101
00:09:13,920 --> 00:09:21,200
becomes four bits at the linked layer. So we have what is a one eighth code.

102
00:09:22,960 --> 00:09:27,840
Four physical layer bits become one linked layer bit, although they're in clusters of four in 32.

103
00:09:28,560 --> 00:09:34,000
So based on this, if we are transmitting 250 kilobits per second at the linked layer and we have a

104
00:09:34,000 --> 00:09:38,879
one eighth code, how many symbols are we transmitting per second? How quickly is 802.15.4

105
00:09:38,879 --> 00:09:46,640
modulating the signal? Well, each of the symbols has two bits, and it's this one eighth code.

106
00:09:46,640 --> 00:09:52,080
And so one we'll look at is that the physical layer, we're transmitting eight times that

107
00:09:52,160 --> 00:10:00,639
bits per second. So eight times 250 kilobits per second, which is equal to two mega bits per second.

108
00:10:01,759 --> 00:10:09,040
At the physical layer, since each symboled physical layer has two bits, this means that 802.15.4

109
00:10:09,040 --> 00:10:18,560
transmits one million symbols per second, or in other ways each symbol is one micro second.

110
00:10:19,279 --> 00:10:27,519
So let's look at a more modern or sort of a more advanced physical layer. So this is what 802.11.n,

111
00:10:27,519 --> 00:10:33,439
very reasonably recent Wi-Fi standard, uses. So most Wi-Fi stuff you buy today is 802.11.n.

112
00:10:34,399 --> 00:10:39,439
And so it turns out there's all these different schemes it can use, but here's just a subset of them.

113
00:10:39,439 --> 00:10:44,559
And so you can see for these eight, there's a bunch of different modulations, BPSK, binary fish

114
00:10:44,559 --> 00:10:51,759
of king, quadrature fish of king, 16 quam, 64 quam, different coding gains. So one half,

115
00:10:51,759 --> 00:10:57,839
one half, three quarter, one half, five sixth. And from that, you can then figure out, given the

116
00:10:57,839 --> 00:11:02,399
data rate, here's the actual data rate in mega bits per second. Here are the different data rates

117
00:11:02,399 --> 00:11:07,199
of these physical layer supports. So for example, if you're using MCX, index seven, this is with

118
00:11:07,759 --> 00:11:14,399
determination, the standard of what the coding system is, we can get up to 150 mega bits per second.

119
00:11:14,639 --> 00:11:18,159
And that's if you're using a 64 quam constellation with a five sixth coding.

120
00:11:20,319 --> 00:11:26,319
As you notice here, that there's these different channels. Remember that the data that we get is also

121
00:11:26,319 --> 00:11:30,559
not only the signal to noise ratio, but is also based on the channel. And so here with the 20 mega

122
00:11:30,559 --> 00:11:36,159
hertz versus 40 megahertz channel, you can see with the 40 megahertz channel, we're a little better

123
00:11:36,159 --> 00:11:41,439
than twice as fast. The reason why we're a little better is because these time values are fixed.

124
00:11:41,680 --> 00:11:46,480
And so these things are fixed. We can do a little bit better than half. If there were no time values,

125
00:11:46,480 --> 00:11:51,280
it would be directly half plus there's also some guards. But so you can see generally, double the

126
00:11:51,280 --> 00:11:57,520
channel. You're just about doubling the throughput. So in overview, we want to talk about chips which

127
00:11:57,520 --> 00:12:01,680
are down at the physical layer, the representation of the single physical layer versus bits, which is

128
00:12:01,680 --> 00:12:05,280
the representation of the link layer. The link layer has a whole bunch of bits and then pass them

129
00:12:05,280 --> 00:12:09,840
down the physical layer. They're turned into chips. Now, physical layer has to deal with noise. It's an

130
00:12:09,840 --> 00:12:14,160
actual physical medium noise from the hardware circuits from the environment, et cetera. This can

131
00:12:14,160 --> 00:12:19,680
cause chip errors. If you have a denser modulation, then you can have higher throughput because you

132
00:12:19,680 --> 00:12:24,560
can represent more bits per symbol. But a denser modulation is less robust to noise because

133
00:12:24,560 --> 00:12:29,759
it's just the distance between the different symbols. And so a sparse modulation has fewer errors.

134
00:12:29,759 --> 00:12:34,800
So a big tension is what exactly is the modulation used. We saw in 802 11n, there's a bunch of different

135
00:12:34,799 --> 00:12:39,599
modulations that are used for different signals and noise ratios, which give you different actual

136
00:12:39,599 --> 00:12:45,039
throughputs. So now, how do you translate between these link layer bits and physical layer bits? It

137
00:12:45,039 --> 00:12:50,799
turns out to just a one-to-one mapping is a rarely good idea. It might be the most efficient in terms

138
00:12:50,799 --> 00:12:56,399
of just raw bits. But the problem is that the probability of bit errors mean you want some redundancy.

139
00:12:56,399 --> 00:13:00,799
That's rarely going to let you get close to the shannon capacity. So you talk about something called

140
00:13:00,799 --> 00:13:07,919
a coding gain, which is the layer 2 to layer 1 ratio. And because layer 1 will represent each bit

141
00:13:07,919 --> 00:13:13,679
at the link layer with more than one bit at its layer, you can recover from some chip errors.

142
00:13:13,679 --> 00:13:19,120
So we saw an example 802 11n where you see anything from a 1 half coding gain to a 5-6th coding

143
00:13:19,120 --> 00:13:25,039
gain under all kinds of different constellations ranging from BPSK, binary phase shift king to 64 quam,

144
00:13:25,039 --> 00:13:27,120
64 quadratory amplitude modulation.

