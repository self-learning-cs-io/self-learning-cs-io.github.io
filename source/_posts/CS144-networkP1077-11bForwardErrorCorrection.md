---
title: CS144 NetworkP1077 11bForwardErrorCorrection
---

1
00:00:00,000 --> 00:00:07,080
Noise and interference can lead to significant bit errors at the physical layer.

2
00:00:07,080 --> 00:00:12,839
In this video, I'll present forward error correction or FEC, a technique that allows the network

3
00:00:12,839 --> 00:00:16,160
to successfully receive frames that have bit errors in them.

4
00:00:16,160 --> 00:00:21,440
It's called forward error correction because the approach assumes that some errors will occur,

5
00:00:21,440 --> 00:00:26,940
so it includes extra error correcting information by default, that is rather than reacting to

6
00:00:26,940 --> 00:00:30,820
errors and sending some correcting data only as needed.

7
00:00:30,820 --> 00:00:34,899
Forward error correction adds some redundant data to the message so the receiver can recover

8
00:00:34,899 --> 00:00:38,020
from a reasonable number of errors without any additional transmission.

9
00:00:38,020 --> 00:00:42,400
I'll also walk through a technique called interleaving that can make messages even more

10
00:00:42,400 --> 00:00:46,540
robust to long bursts of errors.

11
00:00:46,540 --> 00:00:50,740
If you make some mathematical assumptions about noise, there's a precise relationship between

12
00:00:50,740 --> 00:00:54,620
the links, signal to noise ratio, and it's bit error rate.

13
00:00:54,619 --> 00:00:57,979
These assumptions tend to be pretty accurate in practice, so this means there's a strong

14
00:00:57,979 --> 00:01:00,780
theoretical basis for bit error rates.

15
00:01:00,780 --> 00:01:05,259
The exact bit error rate for a given signal to noise ratio depends on the modulation used.

16
00:01:05,259 --> 00:01:09,780
For example, at a given signal to noise ratio, phase shift keying has a lower bit error rate

17
00:01:09,780 --> 00:01:13,859
than amplitude shift keying.

18
00:01:13,859 --> 00:01:19,700
Increasing the signal to noise ratio, either increasing the signal or reducing the noise,

19
00:01:19,700 --> 00:01:22,060
decreases the bit error rate.

20
00:01:22,060 --> 00:01:28,500
But something very important is that the bit error rate never reaches zero.

21
00:01:28,500 --> 00:01:32,620
This because noise isn't uniform, it follows a Gaussian distribution.

22
00:01:32,620 --> 00:01:35,020
That's the mathematical assumption.

23
00:01:35,020 --> 00:01:39,180
So the chances of having noise greater than any threshold is always non-zero.

24
00:01:39,180 --> 00:01:43,340
No matter how strong you make your signal, you'll always lose packets.

25
00:01:43,340 --> 00:01:51,260
You might lose very few, but there's no such thing as a link with no bit errors.

26
00:01:51,260 --> 00:01:54,740
I won't go into the details why, but it turns out if you work through the math, sending

27
00:01:54,740 --> 00:01:58,060
packets as raw bits is very inefficient.

28
00:01:58,060 --> 00:02:03,219
If the signal strength is high enough that bit error rates are rare, then a system is

29
00:02:03,219 --> 00:02:06,500
operating far below the Shannon limit.

30
00:02:06,500 --> 00:02:10,500
It's important that every word you say is perfectly understood.

31
00:02:10,500 --> 00:02:14,300
You have to speak very slowly and very loudly.

32
00:02:14,300 --> 00:02:17,659
This means you're wasting a lot of the capacity of the channel.

33
00:02:17,659 --> 00:02:23,740
For example, suppose you want to transmit a 1,500 byte, so 12,000 bit packets, the packet

34
00:02:23,740 --> 00:02:28,659
loss rate below 1 in 10,000, so 10 to the minus 4.

35
00:02:28,659 --> 00:02:32,419
This means that every one of the 12,000 bits must be correct.

36
00:02:32,419 --> 00:02:40,419
So 1 minus the bit error rate, raised to 12,000th power, must be greater than 0.999.

37
00:02:40,419 --> 00:02:45,539
So the bit error rate must be approximately 10 to the minus 8th.

38
00:02:45,539 --> 00:02:50,659
To get this bit error rate, the system needs to transmit at a high power.

39
00:02:50,659 --> 00:02:54,780
If you calculate what the channel capacity is at this power, that is, what speed you could

40
00:02:54,780 --> 00:03:01,099
send data if you use the channel perfectly, it's 5 times higher than your speed when sending

41
00:03:01,099 --> 00:03:06,899
12,000 bit packets with the packets with a loss rate below 0.01%.

42
00:03:06,899 --> 00:03:11,659
So if you try to send packets this way, just cranking the power up to have very few bit errors,

43
00:03:11,659 --> 00:03:13,739
you're wasting 80% of your capacity.

44
00:03:13,980 --> 00:03:19,340
The theory says you can send data 5 times faster.

45
00:03:19,340 --> 00:03:24,300
Highly engineered wireless systems like LTE operate very close to their theoretical

46
00:03:24,300 --> 00:03:25,620
maximums.

47
00:03:25,620 --> 00:03:27,820
So how does the system do that?

48
00:03:27,820 --> 00:03:31,700
How does it send data in order to not waste that 80%?

49
00:03:31,700 --> 00:03:35,140
The rest of this video explained the basic technique called forward error correction,

50
00:03:35,140 --> 00:03:39,780
and the mechanism it uses called coding.

51
00:03:39,780 --> 00:03:42,379
The basic idea behind coding is very simple.

52
00:03:42,379 --> 00:03:46,460
Rather than just send the raw bits and hope none of them are corrupted, send the data

53
00:03:46,460 --> 00:03:49,219
plus a little bit of redundancy.

54
00:03:49,219 --> 00:03:52,780
Mechanisms like CRC's max and check sums can detect errors.

55
00:03:52,780 --> 00:03:57,299
With coding, we can only detect but also correct errors.

56
00:03:57,299 --> 00:04:02,419
The idea is that adding just a little bit of redundancy one could correct a few bit errors.

57
00:04:02,419 --> 00:04:07,259
Sending packets that have only a few errors lets you send them either much faster.

58
00:04:07,259 --> 00:04:12,139
And this greater speed more than makes up for the redundancy at it.

59
00:04:12,139 --> 00:04:17,099
The amount of redundancy you add is described by something called the coding gain.

60
00:04:17,099 --> 00:04:21,459
The gain is described as a fraction, which shows the ratio between the number of bits sent

61
00:04:21,459 --> 00:04:26,219
by the link layer and the corresponding number of bits at the physical error.

62
00:04:26,219 --> 00:04:31,419
For example, if a system doubles the length of a packet, so it sends one bit of redundant

63
00:04:31,419 --> 00:04:36,459
data for every bit of the link layer data, so two bits for every bit, the coding gain

64
00:04:36,459 --> 00:04:37,860
is one half.

65
00:04:38,699 --> 00:04:44,580
If three link layer bits are sent as four bits at the physical error, this is a three four code.

66
00:04:44,580 --> 00:04:49,740
So a gain of one means you're just sending raw bits.

67
00:04:49,740 --> 00:04:54,620
Adding some redundant data like this to proactively correct errors is called forward error correction

68
00:04:54,620 --> 00:04:56,300
or FEC.

69
00:04:56,300 --> 00:05:00,660
It's called forward error correction because the sender doesn't need any feedback from the receiver,

70
00:05:00,660 --> 00:05:02,340
so it doesn't need a back channel.

71
00:05:02,340 --> 00:05:07,819
Instead, the sender uses a bit of the capacity of the forward channel to correct errors.

72
00:05:08,540 --> 00:05:10,300
There are many coding algorithms.

73
00:05:10,300 --> 00:05:12,939
It's a rich field of study that's over 70 years old.

74
00:05:12,939 --> 00:05:14,259
Some of them are very simple.

75
00:05:14,259 --> 00:05:15,500
Some of them are very complex.

76
00:05:15,500 --> 00:05:19,860
I'm going to present one of them, read Solomon codes.

77
00:05:19,860 --> 00:05:22,259
Read Solomon codes have three great qualities.

78
00:05:22,259 --> 00:05:25,219
First, they're very effective and they're used a lot.

79
00:05:25,219 --> 00:05:32,019
For example, CDs, DVDs, DSL, Y-Max and RAID 6 storage systems all use read Solomon codes.

80
00:05:32,019 --> 00:05:35,620
Second, as that list shows, they're very flexible in general.

81
00:05:35,660 --> 00:05:41,540
They're used in storage, CDs, DVDs and RAID, as well as communication systems, DSL and Y-Max.

82
00:05:41,540 --> 00:05:44,259
Third, they're mathematically very simple.

83
00:05:44,259 --> 00:05:47,019
So they're simple to explain and understand.

84
00:05:50,139 --> 00:05:53,540
Read Solomon codes operate on a block of data.

85
00:05:53,540 --> 00:06:03,019
So you take a block of say 223 bytes and add 30 bytes of redundancy to turn it into a block of 255 bytes.

86
00:06:03,859 --> 00:06:11,060
The basic intuition behind read Solomon is that you take your block and split it into K chunks.

87
00:06:11,060 --> 00:06:13,620
For example, a chunk might be a byte.

88
00:06:13,620 --> 00:06:19,299
You take a 223 byte block and break into 223 chunks.

89
00:06:19,299 --> 00:06:27,180
Then consider each of these K values as the coefficients of a polynomial whose degree is K minus 1.

90
00:06:27,180 --> 00:06:32,939
So in this example, we consider the chunks as the coefficient of a 220 degree polynomial.

91
00:06:32,939 --> 00:06:37,459
So say our first three chunks are 71, 69 and 84.

92
00:06:37,459 --> 00:06:43,300
This means that the three smallest coefficients, the polynomial are 71, 69 and 84.

93
00:06:43,300 --> 00:06:48,139
So 71 x squared plus 69 x plus 84.

94
00:06:48,139 --> 00:06:57,699
Or the could be the largest tree, 71 x to the 220 second, 69 x to the 220 first plus 84 x to the 220th.

95
00:06:57,699 --> 00:06:58,699
Doesn't matter.

96
00:06:59,699 --> 00:07:07,699
The Unisolving's theorem says that any n degree polynomial is defined by n plus 1 different data points.

97
00:07:07,699 --> 00:07:14,699
So following our example, if we have a 222 degree polynomial,

98
00:07:14,699 --> 00:07:22,699
then if we have 223 data points from that polynomial, we can figure out its coefficients.

99
00:07:22,699 --> 00:07:25,699
Each data point has to have a different x value.

100
00:07:26,699 --> 00:07:31,699
So this means that if we send more than 223 data points, and some of those data points are corrupted,

101
00:07:31,699 --> 00:07:36,699
as long as we receive 223 correct data points, and know which ones are correct,

102
00:07:36,699 --> 00:07:39,699
then we can recover the polynomial's coefficient.

103
00:07:39,699 --> 00:07:43,699
And remember, the coefficients of the data we're trying to send.

104
00:07:43,699 --> 00:07:49,699
So what you can do is, rather than send the original data, the coefficients of the polynomial,

105
00:07:49,699 --> 00:07:52,699
you can send points on the polynomial.

106
00:07:52,699 --> 00:07:59,699
Suppose the polynomial is f, you send a message that contains f of 0, f of 1, f of 2, f of 3.

107
00:07:59,699 --> 00:08:06,699
The recipient receives these data points, and then from them, computes the coefficients.

108
00:08:06,699 --> 00:08:10,699
There's one mathematical complication though.

109
00:08:10,699 --> 00:08:18,699
If you have a polynomial with large positive coefficients, the value of each data point will quickly become much larger than can fit in a single chunk.

110
00:08:18,699 --> 00:08:24,699
For example, if one of the terms of the total polynomials, 84 times x to the 220th,

111
00:08:24,699 --> 00:08:33,700
then x equals 2 will be 1.4 times 10 to the 68th, and coding this in binary would take 226 bits.

112
00:08:33,700 --> 00:08:37,700
So the points, instead, are computed on a finite field.

113
00:08:37,700 --> 00:08:40,700
This means it has a limited number of bits.

114
00:08:40,700 --> 00:08:46,700
For example, since each chunk is a byte, you compute the value over the 8-bit field with values 0 to 255.

115
00:08:46,700 --> 00:08:49,700
When a computation overflows, it just wraps around.

116
00:08:49,700 --> 00:08:58,700
So the value in this field is 84 times 2 to the 20th, modulo 256, which happens to be 0.

117
00:08:58,700 --> 00:09:06,700
If we have enough correct data points, we can reconstitute the polynomial coefficients and decode the data.

118
00:09:06,700 --> 00:09:09,700
But there might be bitters.

119
00:09:09,700 --> 00:09:13,700
How do we know which data points are correct, and which are corrupted?

120
00:09:13,700 --> 00:09:19,700
The prior slide assumed we know. How do we find out?

121
00:09:19,700 --> 00:09:22,700
Read Solomon distinguishes two kinds of errors.

122
00:09:22,700 --> 00:09:29,700
The first are called erasers. These denote errors that the receiver knows are errors. They are erased values.

123
00:09:29,700 --> 00:09:33,700
For example, you didn't receive the chunk.

124
00:09:33,700 --> 00:09:38,700
For example, in a rate array, you have erasers when a hard drive fails and stops responding.

125
00:09:38,700 --> 00:09:42,700
The second type are errors, which you don't know are errors.

126
00:09:42,700 --> 00:09:50,700
This is the more common case in communication systems. Some of the chunks have bit errors, and you don't know which ones.

127
00:09:50,700 --> 00:09:57,700
The number of erasers in errors read Solomon can recover from depends on the amount of redundancy.

128
00:09:57,700 --> 00:10:04,700
Let's say that the original number of chunks is k, and the encoding adds redundancy, so it sends n chunks.

129
00:10:04,700 --> 00:10:08,700
It's adding n minus k chunks of redundancy.

130
00:10:08,700 --> 00:10:19,700
If the problem is erasers, then all the receiver needs is k chunks, so the receiver can recover from up to n minus k erasers.

131
00:10:19,700 --> 00:10:27,700
It turns out the receiver can recover from n minus k divided by two errors.

132
00:10:27,700 --> 00:10:33,700
The receiver can recover from fewer errors than erasers because it needs to figure out which chunks of errors.

133
00:10:33,700 --> 00:10:37,700
So, why can't I handle only half as many errors as erasers?

134
00:10:37,700 --> 00:10:45,700
One way to think of this is that the receiver is trying to solve for two sets of unknowns, which receive chunks are bad, and the coefficients of the polynomial.

135
00:10:45,700 --> 00:10:51,700
If there are erasers, this tells the receiver which chunks are bad, and so it doesn't need to solve for those unknowns.

136
00:10:51,700 --> 00:11:00,700
But if there are errors, the receiver needs to solve for an additional unknown, and so it needs correct redundant bytes to do so.

137
00:11:00,700 --> 00:11:11,700
So, returning to our example of a 223 byte data block turned into a 220 degree polynomial sent as 256 bytes, so 32 bytes of redundancy.

138
00:11:11,700 --> 00:11:21,700
If 16 or fewer of the encoded chunks of bad errors, our receiver can successfully decode the data and reconstitute the original 223 bytes.

139
00:11:21,700 --> 00:11:33,700
This particular code is described as a 255 223 code, and encoded block is 255 code words, which are generated from 223 data words.

140
00:11:33,700 --> 00:11:43,700
For a code to support C code words, each word must be at least the ceiling of log 2 of C bits long.

141
00:11:43,700 --> 00:11:48,700
So, to support 255 code words, each word must be at least 8 bits long.

142
00:11:48,700 --> 00:11:55,700
Otherwise, there isn't enough information in each word to decode the polynomial.

143
00:11:55,700 --> 00:12:03,700
It turns out what I've just described is an exactly how read Solomon is used, because decoding is extremely expensive.

144
00:12:03,700 --> 00:12:12,700
Instead, slightly different mathematical formulations are used that are more efficient, but the basic principles are the same, and the idea of points along the polynomial is still used.

145
00:12:13,700 --> 00:12:16,700
Let's walk through an example.

146
00:12:16,700 --> 00:12:21,700
In this example, we're encoding six bytes of data, the word hello.

147
00:12:21,700 --> 00:12:25,700
We're going to encode it with a 75 code.

148
00:12:25,700 --> 00:12:30,700
So, five data chunks are turned into seven coded chunks.

149
00:12:30,700 --> 00:12:36,700
Because we have seven code words per block, each chunk must be at least three bits long.

150
00:12:37,700 --> 00:12:45,700
So, for a 75 code, this means we take five three bit data words and encode them as seven three bit code words.

151
00:12:45,700 --> 00:12:48,700
15 bits becomes 21 bits.

152
00:12:48,700 --> 00:12:54,700
The sender sends this longer data, the receiver receives it, and decodes it to the original data.

153
00:12:57,700 --> 00:13:01,700
If you look at this example closely, you'll see there's an interesting edge case.

154
00:13:01,700 --> 00:13:04,700
The input is 48 bits long.

155
00:13:04,700 --> 00:13:07,700
We need to break it up into 15 bit blocks.

156
00:13:07,700 --> 00:13:10,700
We need to send an integer number of blocks.

157
00:13:10,700 --> 00:13:16,700
So, we have to increase the size of the data to be 60 bits, or four blocks long.

158
00:13:16,700 --> 00:13:19,700
The edge case is that our data doesn't easily fit into four blocks.

159
00:13:19,700 --> 00:13:23,700
The typical solution to this is just to pad the last block with zeros.

160
00:13:23,700 --> 00:13:28,700
In this example, we pad the last block by 12-0 bits.

161
00:13:28,700 --> 00:13:34,700
60 data bits are encoded as four 21 bit code words, or 84 bits.

162
00:13:34,700 --> 00:13:39,700
The sender sends 84 bits to the receiver.

163
00:13:39,700 --> 00:13:46,700
The receiver runs a read-song decoder to get the 60 data bits and recover the string, hello.

164
00:13:49,700 --> 00:13:57,700
One way one often thinks about encoding schemes is how long a burst of consecutive errors the approach can recover from.

165
00:13:58,700 --> 00:14:03,700
So, let's suppose that there are bit errors in the transmitted data.

166
00:14:03,700 --> 00:14:05,700
Let's ask a first question.

167
00:14:05,700 --> 00:14:10,700
What's the shortest burst of errors that could cause the 75 code to fail?

168
00:14:10,700 --> 00:14:14,700
Now, in read-solomon, errors are in terms of code words.

169
00:14:14,700 --> 00:14:19,700
A single bit error in a code word makes the whole word an error.

170
00:14:19,700 --> 00:14:26,700
So, with a 75 code, a receiver can recover from a single code word error per block.

171
00:14:27,700 --> 00:14:31,700
So, let's suppose there's one bit error here.

172
00:14:35,700 --> 00:14:41,700
The decoder can still decode the first block, and the data is received correctly.

173
00:14:41,700 --> 00:14:46,700
Now, suppose there are two consecutive bit errors.

174
00:14:46,700 --> 00:14:49,700
Can read-solomon recover from this?

175
00:14:49,700 --> 00:14:51,700
It turns out it depends.

176
00:14:51,700 --> 00:14:56,700
If both bit errors fall in the same code word,

177
00:14:59,700 --> 00:15:04,700
then there's only one code word an error,

178
00:15:04,700 --> 00:15:07,700
and read-solomon can decode correctly.

179
00:15:07,700 --> 00:15:11,700
If the two bit errors fall in a block boundary,

180
00:15:11,700 --> 00:15:15,700
there's one error in the last bit of one block,

181
00:15:15,700 --> 00:15:20,700
and one error in the first bit of another block.

182
00:15:20,700 --> 00:15:23,700
Read-solomon can recover.

183
00:15:25,700 --> 00:15:36,700
But if the two bit errors fall in a JSON code word in the same block,

184
00:15:40,700 --> 00:15:47,700
like this, then there are two code words an error,

185
00:15:47,700 --> 00:15:50,700
and read-solomon can decode the block.

186
00:15:50,700 --> 00:15:57,700
So, the shortest burst of consecutive bit errors can cause the 75 code to fail is two.

187
00:15:58,700 --> 00:16:02,700
A second question is what's the longest burst of consecutive bit errors

188
00:16:02,700 --> 00:16:06,700
the thing encoding might be able to recover from?

189
00:16:06,700 --> 00:16:08,700
Since it's a 75 code,

190
00:16:08,700 --> 00:16:11,700
it must one code word in a block can be corrupted.

191
00:16:11,700 --> 00:16:15,700
It doesn't matter if one bit or all the bits in a code word are corrupted.

192
00:16:15,700 --> 00:16:18,700
In other case, the code word is corrupted.

193
00:16:18,700 --> 00:16:21,700
So, a three bit burst of errors can corrupt only one,

194
00:16:21,700 --> 00:16:26,700
only a single code word, which read-solomon can recover from.

195
00:16:32,700 --> 00:16:37,700
If the string of errors spans two different blocks,

196
00:16:39,700 --> 00:16:44,700
then it could corrupt one code word in each of the two different blocks.

197
00:16:45,700 --> 00:16:51,700
Both blocks would be decoded correctly.

198
00:16:54,700 --> 00:16:57,700
So, the longest burst of consecutive bit errors is six.

199
00:16:57,700 --> 00:17:00,700
The first three corrupt a single code word in one block,

200
00:17:00,700 --> 00:17:04,700
and the second three corrupt a single code word in the second block.

201
00:17:04,700 --> 00:17:09,700
If there are seven bit errors, then the burst of errors must corrupt three blocks.

202
00:17:10,700 --> 00:17:15,700
Two of which must be must corrupt three code words,

203
00:17:15,700 --> 00:17:18,700
two of which must be in one block,

204
00:17:18,700 --> 00:17:20,700
so read-solomon cannot recover.

205
00:17:20,700 --> 00:17:25,700
The longest burst of consecutive bit errors that the seven five code can recover from is six.

206
00:17:27,700 --> 00:17:29,700
These numbers are small.

207
00:17:29,700 --> 00:17:34,700
In part because it's examples using such a small code with very little redundancy and small code words.

208
00:17:34,700 --> 00:17:39,700
Imagine instead that the system uses a two five five two two three code with eight bit words.

209
00:17:39,700 --> 00:17:43,700
The shortest burst that can corrupt a block that is is 122 bits,

210
00:17:43,700 --> 00:17:45,700
it corrupts 17 code words.

211
00:17:45,700 --> 00:17:49,700
The longest burst that it could recover from is 256 bits,

212
00:17:49,700 --> 00:17:54,700
16 code words in one block, 16 code words in a second block.

213
00:17:55,700 --> 00:18:00,700
One technique that can make read-solomon even more resistant to burst errors is interleaving.

214
00:18:00,700 --> 00:18:03,700
The basic idea of interleaving.

215
00:18:05,700 --> 00:18:08,700
Is that rather than lay out the code words linearly,

216
00:18:08,700 --> 00:18:13,700
spread the amounts the burst of errors crops a small number of code words in many blocks,

217
00:18:13,700 --> 00:18:16,700
rather than many code words in a small number of blocks.

218
00:18:17,700 --> 00:18:22,700
For example, imagine we're using our seven five code with three bit words.

219
00:18:23,700 --> 00:18:28,700
A coded block is 21 bits long, seven three bit words.

220
00:18:28,700 --> 00:18:30,700
Now suppose we have 12 blocks.

221
00:18:31,700 --> 00:18:36,700
So let's call the blocks a through l with the individual bits of each block being a subscript.

222
00:18:36,700 --> 00:18:39,700
So a zero is the first bit of the first block.

223
00:18:39,700 --> 00:18:42,700
We'll see 20 is the last bit of the third block.

224
00:18:42,700 --> 00:18:45,700
And b4 is the fifth bit of the second block.

225
00:18:45,700 --> 00:18:47,700
If we use the format shown here,

226
00:18:47,700 --> 00:18:51,700
the longest burst error that this data can recover from is six bits long,

227
00:18:51,700 --> 00:18:57,700
corrupting the last three bits of one code word in one block.

228
00:18:57,700 --> 00:19:00,700
And the first three bits, one code word in the following block.

229
00:19:02,700 --> 00:19:05,700
Now imagine if instead we organize the bits,

230
00:19:05,700 --> 00:19:08,700
so the code words from different blocks are interleaved.

231
00:19:08,700 --> 00:19:13,700
Now instead of a zero, a one, a two, a three,

232
00:19:13,700 --> 00:19:18,700
the first four bits are a zero, a one, a two, e zero.

233
00:19:18,700 --> 00:19:22,700
So the sent data starts with the first code word from block a,

234
00:19:22,700 --> 00:19:29,700
followed by the first code word from block e, then c, et cetera.

235
00:19:29,700 --> 00:19:33,700
After the first code word from l, so bits,

236
00:19:33,700 --> 00:19:37,700
l zero, l one, l two, there's the second code word from a,

237
00:19:37,700 --> 00:19:39,700
so bits a three, a four, a five.

238
00:19:39,700 --> 00:19:42,700
Let's call this code word infill leaving.

239
00:19:42,700 --> 00:19:48,700
In this case, what's the shortest burst error that could cause decoding to fail?

240
00:19:48,700 --> 00:19:50,700
Let's walk through it.

241
00:19:51,700 --> 00:19:55,700
For the decoding to fail, it's from two different code words,

242
00:19:55,700 --> 00:19:58,700
from the same block must be corrupted.

243
00:19:58,700 --> 00:20:03,700
For example, one bit of the first code word of a,

244
00:20:03,700 --> 00:20:07,700
at a two, must be corrupted,

245
00:20:13,700 --> 00:20:17,700
as well as one bit of the second code word of a, so a three.

246
00:20:18,700 --> 00:20:22,700
These two bits are 34 bits apart,

247
00:20:25,700 --> 00:20:30,700
because there are 12 chunks that is, we'd have to corrupt a two,

248
00:20:30,700 --> 00:20:36,700
b zero, e one, e two, c zero, c one, c two, all the way up to l three,

249
00:20:36,700 --> 00:20:40,700
a three, so a two, l two, a three,

250
00:20:40,700 --> 00:20:43,700
or 11 code words plus two bits, 35 bits.

251
00:20:44,700 --> 00:20:48,700
The shortest burst error that could cause decoding to fail is 35 bits.

252
00:20:48,700 --> 00:20:53,700
This is over 16 times longer than if we didn't use interleaving.

253
00:20:53,700 --> 00:20:58,700
And what's the longest burst error this could recover from?

254
00:20:58,700 --> 00:21:03,700
This would cover a single code word in every single block,

255
00:21:03,700 --> 00:21:05,700
so 36 bits.

256
00:21:05,700 --> 00:21:10,700
For example, a burst error that covers the first 36 bits of the interleaved encoded data

257
00:21:10,700 --> 00:21:15,700
will be corrupt the first code word of a, first code word of b,

258
00:21:15,700 --> 00:21:20,700
the first code word of c, etc, up to the first code word of l.

259
00:21:26,700 --> 00:21:30,700
Let's consider another option, bit interleaving.

260
00:21:30,700 --> 00:21:36,700
In bit interleaving, we interleaved the bits from individual code words.

261
00:21:37,700 --> 00:21:42,700
So the first bit is a zero, the second bit is b zero, the third bit is c zero.

262
00:21:42,700 --> 00:21:46,700
After bit l zero comes bit a one.

263
00:21:46,700 --> 00:21:52,700
The last 12 bits of the data are bits a 20 to l 20.

264
00:21:52,700 --> 00:21:58,700
So we've turned 12 blocks of 21 bits into 21 encoded blocks of 12 bits.

265
00:21:58,700 --> 00:22:01,700
What's the shortest burst of errors and corrupt the data?

266
00:22:02,700 --> 00:22:06,700
The burst has to cover two code words in one block.

267
00:22:06,700 --> 00:22:11,700
Suppose there is a burst starting at bit a two.

268
00:22:11,700 --> 00:22:16,700
If the burst is 13 bits long, you'll reach a three.

269
00:22:16,700 --> 00:22:21,700
A three is in a different code word.

270
00:22:21,700 --> 00:22:24,700
So this will cause the decoding of a to fail.

271
00:22:24,700 --> 00:22:30,700
So the shortest burst of errors that could prevent decoding is 13 bits.

272
00:22:32,700 --> 00:22:37,700
What's the longest burst of errors that this read Solomon code can recover from?

273
00:22:37,700 --> 00:22:43,700
The answer is 36 bits covering a single code word from every block.

274
00:22:43,700 --> 00:22:50,700
For example, a zero to l two, the first 36 bits.

275
00:22:50,700 --> 00:23:00,700
What's important to note here is that bit level interleaving can recover from the same longest burst of errors as code word level interleaving.

276
00:23:01,700 --> 00:23:06,700
But the shortest burst that can corrupt the data using bit interleaving is shorter.

277
00:23:06,700 --> 00:23:10,700
For code interleaving remember, it was 35 bits for bit interleaving.

278
00:23:10,700 --> 00:23:12,700
It's 13 bits.

279
00:23:12,700 --> 00:23:15,700
So why is this?

280
00:23:15,700 --> 00:23:22,700
It's because of the important property of read Solomon that any number of bits corrupted in code word cause it to be invalid.

281
00:23:23,700 --> 00:23:31,700
So if there's a burst of errors, you want them to be spread across as many blocks as possible so that there are a few errors in any block.

282
00:23:31,700 --> 00:23:36,700
But if an error corrupts a code word, you want it to concentrate on that code word.

283
00:23:36,700 --> 00:23:41,700
As every bit bit being an error is no worse than a single bit being an error.

284
00:23:41,700 --> 00:23:45,700
So you want to minimize the number of code words that are corrupted in any block.

285
00:23:45,700 --> 00:23:51,700
You can do this by spreading errors across blocks and by concentrating errors within code words.

286
00:23:52,700 --> 00:23:56,700
With code word interleaving, all the bits of a code word are adjacent.

287
00:23:56,700 --> 00:24:00,700
So a burst error that corrupts one bit will also usually corrupt the other bits.

288
00:24:00,700 --> 00:24:03,700
With bit interleaving, all the bits of a code word are spread out.

289
00:24:03,700 --> 00:24:07,700
So it's easily possible to corrupt only one bit of a code word.

290
00:24:07,700 --> 00:24:08,700
You see this?

291
00:24:08,700 --> 00:24:17,700
We're corrupting both A2 and A3 and bit interleaving acquires also corrupting a single bit from the code words B2, B2, C2, D2, etc.

292
00:24:17,700 --> 00:24:22,700
For code word interleaving in contrast, it requires corrupting the entire intervening code words.

293
00:24:22,700 --> 00:24:28,700
So B0, B1, B2, C0, C1, C2, etc.

