---
title: CS144 NetworkP987 4PhysicalandLinkPrinciples
---

1
00:00:00,000 --> 00:00:04,639
So in this video about the physical and link layers, I'm going to talk about forward error correction or FEC.

2
00:00:04,639 --> 00:00:08,080
So I've called it for a given signal noise ratio, a modulation scheme.

3
00:00:08,080 --> 00:00:11,040
We can compute what the expected bid error rate is.

4
00:00:11,040 --> 00:00:16,240
Now this bid error rate, well it can become very, very small for say a very high signal strength.

5
00:00:16,240 --> 00:00:20,240
It will never read zero. There's always a chance that there will be a bid error.

6
00:00:20,240 --> 00:00:25,679
So in practice what this means is that because these bid errors, although uncommon,

7
00:00:25,679 --> 00:00:31,439
you expect them to happen, directly turning your link layer bits into bits that the physical

8
00:00:31,439 --> 00:00:36,640
layer is very, very inefficient in that the sparsity of the modulation need or the speed of the

9
00:00:36,640 --> 00:00:41,840
symbols that you need in order to have a very, very low bid error rates that packet bid errors are

10
00:00:41,840 --> 00:00:46,399
uncommon is really, really inefficient. It's going to be very, very far from the Shannon limit.

11
00:00:46,399 --> 00:00:48,719
That's not a good way to build a high throughput system.

12
00:00:50,799 --> 00:00:55,600
So instead, what you want to do is coding. So coding is a way where you add a little

13
00:00:55,600 --> 00:00:59,679
bit of redundancy to the data. In this case, we're talking about the physical error, which you can do in

14
00:00:59,679 --> 00:01:05,840
all kinds of situations. So you add a little bit of redundancy to make up for these expected,

15
00:01:05,840 --> 00:01:12,960
uncommon bid errors. And in adding in this little bit of redundancy, its cost is much, much smaller

16
00:01:12,960 --> 00:01:17,040
than its benefit. By doing this, you can greatly, greatly improve your link throughput. Because

17
00:01:17,040 --> 00:01:20,560
just by adding a little bit of redundancy, all your packets get through as opposed to almost

18
00:01:20,560 --> 00:01:25,040
nine of your packets get through. And this true in theory as well as practice. So we talk about coding.

19
00:01:25,040 --> 00:01:29,520
We also talk about coding gain, which is the ratio of bits. In this case, the link error

20
00:01:29,520 --> 00:01:32,800
to the bits, the physical error. Coding gains are general in that, but within networks,

21
00:01:32,800 --> 00:01:37,680
usually we're talking about the physical error and the link error. So one half code means that we

22
00:01:37,680 --> 00:01:42,560
turn one link error bet into two physical error bits. So there's one redundant bit for every bit.

23
00:01:42,560 --> 00:01:46,480
Three quarter code, if you turn three link error bits into four bits at the physical error.

24
00:01:47,280 --> 00:01:51,120
And this process is forward error correction. The idea is,

25
00:01:51,200 --> 00:01:57,680
peractively add some additional redundant data to protect, to retract and be able to correct

26
00:01:57,680 --> 00:02:01,439
potential errors. It's called forward error correction because you're doing it peractively.

27
00:02:01,439 --> 00:02:05,840
Four, you're saying, look, I don't know if you're going to have any errors, but beforehand,

28
00:02:05,840 --> 00:02:09,439
I'm just going to add a bit of redundancies that you can recover from them. This is nice because

29
00:02:09,439 --> 00:02:13,120
you don't need any exchanges. The recipient will be able to just decode the data. It's not going

30
00:02:13,120 --> 00:02:18,159
to have to say, oh, there was an error. Can you resend this part? And so it saves you the cost

31
00:02:18,159 --> 00:02:22,319
of those kinds of messages and changes. So how do you do this? Well, there's all kinds of coding

32
00:02:22,319 --> 00:02:26,960
algorithms out there. There's lots of different ones, all kinds of different trade-offs. Here's

33
00:02:26,960 --> 00:02:32,960
just a couple of them. So in this video, I'm going to talk about one in particular, read Solomon.

34
00:02:33,680 --> 00:02:37,359
So I'm going to talk about read Solomon because it turns out compared to many of these others,

35
00:02:37,359 --> 00:02:43,680
it's actually mathematically pretty simple. It's also tremendously commonly used. CDs use read

36
00:02:43,680 --> 00:02:51,840
Solomon DVDs, DSL lines, Y-Max, RAID 6 storage arrays, all of these systems, all of these communication

37
00:02:51,840 --> 00:02:57,680
storage systems you'd read Solomon. Further, we're compared to some of these other coding algorithms.

38
00:02:57,680 --> 00:03:02,000
Read Solomon is actually pretty mathematically simple. I'm not going to go into all of the details.

39
00:03:03,040 --> 00:03:09,040
The basic concept is simple actually designing it so that you can implement it very fast,

40
00:03:09,040 --> 00:03:12,879
involves a bit more math which I won't go into, but the basic concept is very simple.

41
00:03:12,879 --> 00:03:18,079
The key idea behind read Solomon is that if I have a polynomial, like here, a polynomial,

42
00:03:18,079 --> 00:03:24,799
like here, where I have a parabola, right? So I have some AX squared plus BX plus C.

43
00:03:26,000 --> 00:03:29,199
Then any polynomial of degree K, or here K equals two,

44
00:03:31,599 --> 00:03:38,400
is uniquely determined by K plus one points. So that means is that if I give you three,

45
00:03:39,360 --> 00:03:48,960
X, Y points, so three X, Y points will uniquely determine for a parabola A, B, and C.

46
00:03:51,200 --> 00:03:57,120
So why is this useful? So what I can do is I have some data that I want to encode with read Solomon.

47
00:03:57,120 --> 00:04:03,759
So I take K chunks of this data. These K chunks become coefficients of a K minus one degree

48
00:04:03,840 --> 00:04:10,719
polynomial. So for example, I take three chunks of data and those three chunks become A, B, and C.

49
00:04:10,719 --> 00:04:18,159
These three coefficients. Then what I do is I compute N points along this polynomial,

50
00:04:18,719 --> 00:04:23,199
where N is greater than or equal to K minus one. So it should be minus one.

51
00:04:25,199 --> 00:04:30,879
So I compute these N points and that's what I send. I send those points along the polynomial.

52
00:04:31,839 --> 00:04:39,120
Now what happens is I'm sending N points, but because the original polynomial is of degree K minus one,

53
00:04:40,719 --> 00:04:46,159
any of those K points, where K is less than N, would allow you to uniquely and correctly

54
00:04:46,159 --> 00:04:52,560
determine what these coefficients were. So for example, I have a second degree polynomial,

55
00:04:52,560 --> 00:04:59,680
which I generated from three chunks of data, A, B, and C. Then what I do is I compute 0.0, 0.1,

56
00:05:00,480 --> 00:05:13,680
0.2, say 0.3, 0.4, 0.5, 0.6. And I send P0, P1, P2, P3, P4, P5, P6. Now it turns out that

57
00:05:13,680 --> 00:05:19,600
with any of these three points, right, with P1, P5, and P6, or with P4, P1, and P3,

58
00:05:20,399 --> 00:05:25,199
you can, if you know this is a parabola, you can determine what A, B, and C are.

59
00:05:26,079 --> 00:05:32,079
So that's the basic math. I compute points along a polynomial whose coefficients are the original data.

60
00:05:32,959 --> 00:05:37,920
And then if I'm able to recover enough for those points of the polynomial, I can reconstitute

61
00:05:37,920 --> 00:05:43,759
what those coefficients were. There's some complications to this. I can't just like P2,

62
00:05:43,759 --> 00:05:47,199
can't be a million because how I represent a million, it's going to take up more space.

63
00:05:48,560 --> 00:05:53,439
There's some complications where the actual numbers you use aren't just basic integers. There

64
00:05:53,439 --> 00:05:58,560
are things, numbers on a finite field, which means sort of a mathematical construct where it's closed

65
00:05:58,560 --> 00:06:04,480
over operations. Which essentially means that hey, I can represent each of these points in a finite

66
00:06:04,480 --> 00:06:11,279
number of bits. It's not like suddenly A is a million, and then that means that P6 is something

67
00:06:11,279 --> 00:06:16,480
totally off the charts. And I can't represent it in a finite space. And so that's one of the other

68
00:06:16,480 --> 00:06:22,319
complications that I'm not going to go into. But this is the basic idea. Is that I represent the data

69
00:06:22,319 --> 00:06:27,519
as coefficients of a polynomial? I compute points along the polynomial. Then I sand those points.

70
00:06:28,480 --> 00:06:32,159
And then the other side from those points can reconstitute the coefficients. Now a little bit

71
00:06:32,159 --> 00:06:37,120
more detail in terms of what read Solomon can do for you. So it turns out in these kinds of systems,

72
00:06:37,120 --> 00:06:40,800
there are two kinds of errors we care about. And it's important to distinguish them. The first

73
00:06:40,800 --> 00:06:46,240
are erasers. So these are errors we know that they occurred. Like that piece of data is missing.

74
00:06:46,240 --> 00:06:51,039
That's an erasure. The other is a general error. We don't know that where the error occurs. This is

75
00:06:51,040 --> 00:06:55,439
what we normally think of in terms of say bit errors. Whereas erasced values are say, oh gosh,

76
00:06:55,439 --> 00:07:00,640
this disdaincer. Oh, we missed that packet. And so what read Solomon does is you're taking K

77
00:07:00,640 --> 00:07:04,560
chunks of data and you're coding into n chunks where n is greater than or equal to K.

78
00:07:05,280 --> 00:07:10,160
Worth n is equal to K. You're not actually doing any coding. And what read Solomon will do is

79
00:07:10,160 --> 00:07:17,759
he can correct up to n minus K erasers. Because remember, if we code into n chunks, if we have K points

80
00:07:17,759 --> 00:07:21,599
and we know those K points are correct, which is missing the others, we can reconstitute the data.

81
00:07:22,240 --> 00:07:28,480
But it can also correct up to n minus K divided by two errors. So let's say we have a very common

82
00:07:28,480 --> 00:07:38,480
read Solomon code is 223 255, which means that we take 223 bytes of data and turn into 255 coded

83
00:07:38,480 --> 00:07:46,719
bytes of data. Well, 255 minus 223 is equal to 32. So I mean this particular read Solomon code

84
00:07:48,079 --> 00:07:59,360
can protect against 32 erasers or 16 errors. We're 32 of the 8-bit code words can be missing. As

85
00:07:59,360 --> 00:08:04,319
long as we've got 223, we can reconstitute the original data. That's 223 points on our 222

86
00:08:04,319 --> 00:08:11,839
degree polynomial. Or if 16 of them are have bit errors in them, we can still reconstitute the

87
00:08:12,799 --> 00:08:19,679
original data. So here's that conceptually. Let's take 223 8-bit values. So we've take our data,

88
00:08:21,519 --> 00:08:26,319
break it into bytes, take 223 bytes, and we're going to consider those now the coefficients of a

89
00:08:26,319 --> 00:08:33,839
222 degree polynomial p within compute p of 0, p of 1, p of 2, etc, etc, etc. As 8-bit values,

90
00:08:33,839 --> 00:08:39,120
there's this again, this idea of using a field rather than arbitrary numbers. There's that mathematical

91
00:08:39,200 --> 00:08:46,799
concept. Obviously, we can then represent them as 8-bit values. We then send these 255, 255 points

92
00:08:46,799 --> 00:08:53,600
along the polynomial. And so this is a 255 to 23 code. Each of these 255 code words come from

93
00:08:53,600 --> 00:09:00,720
223 data words, 32 racers, 16 errors. So we send these 255 values. And that's the basic idea is

94
00:09:00,720 --> 00:09:05,919
that if I have up to 16 errors, I can still figure out which ones are wrong and I can reconstitute

95
00:09:05,919 --> 00:09:10,479
the polynomial. I can reconstitute the polynomial coefficients or I can be missing 32 of them.

96
00:09:10,479 --> 00:09:15,839
As long as I get 223, if I have 32 racers, I can still reconstitute the original polynomial.

97
00:09:16,799 --> 00:09:22,639
So I said before, this isn't exactly what's done in practice for a bunch of reasons. These values

98
00:09:22,639 --> 00:09:28,159
have to be in a concept called a field. It turns out that this exact scheme is actually pretty

99
00:09:28,159 --> 00:09:33,839
expensive to decode, you have to consider all possible parameters and do an interpolation.

100
00:09:34,560 --> 00:09:39,600
But it's giving you the basic idea. The more modern ones are a bit more complex, but the basic idea

101
00:09:39,600 --> 00:09:44,879
holds of you using the original data as coefficients on a polynomial, computing points along the

102
00:09:44,879 --> 00:09:51,600
polynomial, and then sending those points. So here is a simple example. I take these six bytes that say

103
00:09:51,600 --> 00:09:57,519
hello. I'm breaking them into chunks of data. I then do my read Solomon coding here.

104
00:09:58,399 --> 00:10:05,120
Here is the basic concept. I'm adding my four-dare correction here, some redundant data.

105
00:10:06,159 --> 00:10:12,159
Then when that data arrives, I can decode it and get the original data.

106
00:10:12,159 --> 00:10:16,960
So let's walk through this as a specific example. So in this case, let's say we're using a 7.5 code.

107
00:10:17,519 --> 00:10:22,639
What this means is that each initial data word that we're going to use is three bits long.

108
00:10:22,639 --> 00:10:28,159
That's determined by the 7, 2, and the 3 minus 1. So we're breaking the data up into little chunks

109
00:10:28,159 --> 00:10:34,399
of three bits. And so we're going to start with five of these data words, so 15 bits.

110
00:10:34,399 --> 00:10:39,120
And each 15 bits are going to be turned into seven code words. So here we have the first 15 bits,

111
00:10:39,120 --> 00:10:44,159
the next 15 bits, the next 15 bits. So it turns out we have 48 bits here. 48 is not evenly

112
00:10:44,159 --> 00:10:50,639
divisible by 15. So we have 45 plus 3. So just pad this with zeros. So original data is going to

113
00:10:50,639 --> 00:10:57,439
grow from 48 to 60 bits. We then perform the read Solomon coding to turn these 15 bits

114
00:10:59,120 --> 00:11:09,199
into 21 bits. And then send these total of 84 bits along, say, the wire or on the wireless.

115
00:11:09,919 --> 00:11:15,759
Those 84 bits are transmitted, received, the other side gets these 84 coded bits,

116
00:11:15,759 --> 00:11:22,240
then runs a read Solomon decoder, and from that can regenerate the original data.

117
00:11:24,960 --> 00:11:32,799
So since this is a 7.5 code, that means that we can recover from one error or two erasers.

118
00:11:35,360 --> 00:11:41,519
We note that these errors and erasers are for code words. And so it's possible, in fact,

119
00:11:41,519 --> 00:11:45,199
that if we have, let's say we have bit errors that look like this, here's a bit error,

120
00:11:46,159 --> 00:11:52,159
here's a bit error, here are two bit errors. Can I ask the question, will we be able to recover

121
00:11:52,159 --> 00:11:58,559
from these bit errors? So for this first code block, the answer is yes, there's a single bit error.

122
00:11:58,559 --> 00:12:04,879
A single bit error will corrupt at most one code word. We can recover from one error,

123
00:12:04,879 --> 00:12:10,720
one code word with an error. And so this first block will be able to successfully recover.

124
00:12:11,840 --> 00:12:22,399
The same with the second code block. We have one bit error, that means one code will be an error,

125
00:12:22,399 --> 00:12:29,039
so we can recover from that. For the third code block, well, this is a tricky question.

126
00:12:29,919 --> 00:12:37,360
So one of our code words can be an error, and we have two bit errors. This now depends on where

127
00:12:37,440 --> 00:12:43,840
those bit errors fall. Let's say here are code words spaced out, here's two, three, four, five,

128
00:12:43,840 --> 00:12:48,720
six, seven. Let's say they look like this. Well, if the two bit errors

129
00:12:51,279 --> 00:12:56,080
are in the same code word, then we'll be okay, because we just have one error, one code word with an

130
00:12:57,040 --> 00:13:00,720
error. So in that case, we'll be all right. However,

131
00:13:06,720 --> 00:13:13,840
if the bit errors are in different code words, then we'll not be all right. We'll have two errors,

132
00:13:13,840 --> 00:13:24,160
we can't recover from two error. So this might not seem very good, but compared to what happens if

133
00:13:24,159 --> 00:13:29,279
we were not to use any coding whatsoever, here we've been able to protect against at least two

134
00:13:29,279 --> 00:13:39,039
bit errors, and maybe even up to four. So there's one other trick that you can use. This is very

135
00:13:39,039 --> 00:13:43,600
common, this for example is done in CDs. So one of the assumptions people you often have is that

136
00:13:43,600 --> 00:13:48,399
errors in the physical layer, some of them are just interspersed in random, those are easy to handle,

137
00:13:48,399 --> 00:13:54,480
what's harder burst severe errors. And so the way you can make your coding scheme more robust

138
00:13:54,480 --> 00:14:00,319
burst severe errors is through some of the called interleaving. So imagine, for example, I have,

139
00:14:00,319 --> 00:14:05,360
here's my data, and there's 12 chunks of a seven five code. So that means that each of these chunks

140
00:14:05,360 --> 00:14:12,159
is in terms of the coded data, is 21 bits long, remember from the prior showing its seven code words

141
00:14:12,159 --> 00:14:20,319
that are three bits long each. And so here I have 12 code blocks from A to L with bits A0 to

142
00:14:20,319 --> 00:14:27,439
A20 and say L0 to L20. So let's think about what happens with a burst of errors. So it's possible

143
00:14:28,319 --> 00:14:34,879
with let's say a burst of one error. Well, I know for sure I'm going to recover from that,

144
00:14:34,879 --> 00:14:40,319
because that's going to corrupt at most one code word in one block, and I can recover from one error.

145
00:14:40,320 --> 00:14:42,720
So that will be okay. One bit error.

146
00:14:52,480 --> 00:15:02,960
I'm okay. How about two bit errors? Well, again, call it's going to matter on whether they fall

147
00:15:02,960 --> 00:15:10,240
in the same code word, or if they say fall on different code words. In fact, it's possible that

148
00:15:10,240 --> 00:15:17,279
it could each fall on a burst of two errors. One falls on a code word in one block. That block

149
00:15:17,279 --> 00:15:21,759
can be recovered. Another falls on a code word in another block. That can be recovered. We would be

150
00:15:21,759 --> 00:15:33,039
okay. So in this case, we would be okay. If they both fell within a single code word, we would be okay.

151
00:15:34,000 --> 00:15:41,919
But if they fell on two different code words within the same block, then we won't be able to

152
00:15:41,919 --> 00:15:47,199
recover from that. There will be two errors within a single block. In fact, it turns out if we were to

153
00:15:47,199 --> 00:15:54,480
look at what's the longest string of bit errors that we could possibly recover from. That's a good

154
00:15:54,480 --> 00:16:05,920
question. So it turns out that the longest that we can recover from is six bit errors.

155
00:16:08,399 --> 00:16:15,120
And we can recover from a burst of six bit errors if and only if it happens to be that three of them

156
00:16:15,120 --> 00:16:23,200
fall on the last code word of one block, and then three fall on the first code word of the next block.

157
00:16:23,200 --> 00:16:27,440
You can imagine if we add one more, it's going to crop to second code word. So that is possible,

158
00:16:27,440 --> 00:16:32,879
but unlikely. So this is the longest possible string of errors we could correct from using just a

159
00:16:32,879 --> 00:16:39,280
basic coding. So what we can do instead is something called interleaving. So rather than send our data

160
00:16:39,280 --> 00:16:45,200
as a through a zero through a 20 b through b 20 within a burst of errors is concentrated on a block,

161
00:16:45,200 --> 00:16:49,120
instead, what we send is these bits interleaved.

162
00:17:05,519 --> 00:17:13,039
For example, we send a zero b zero c zero d zero, etc, etc, to L zero a one b one c one dot dot dot

163
00:17:13,119 --> 00:17:19,279
to L one. Then at the end, we're going to send k 20 L 20. And so now it happens that a burst of

164
00:17:19,279 --> 00:17:26,799
errors the physical layer is spread out across all of the different code blocks. So in this case,

165
00:17:26,799 --> 00:17:35,359
if we have even a string of 12 bit errors, a string of 12 bit errors is going to do cause one bit error

166
00:17:35,359 --> 00:17:39,440
on every single one of the code blocks. So it'll cause one bit R and a one bit R and b one bit R and

167
00:17:39,440 --> 00:17:44,480
c one bit R and l. And so in that way, we're suddenly become more robust with interleaving by

168
00:17:44,480 --> 00:17:53,120
interleaving all of these bits. We can recover up to 12 bit errors with interleaving.

169
00:17:58,960 --> 00:18:03,759
Where even when we didn't have interleaving, even two bit errors can cause our system to fail.

170
00:18:03,759 --> 00:18:07,680
And six bit errors the most we could ever do. But if all we do is interleave these bits,

171
00:18:07,680 --> 00:18:13,759
we can deterministically, knowingly, recover a burst up to 12 bits long. So interleaving is a very

172
00:18:13,759 --> 00:18:20,000
common and a very popular technique. So this concludes the video on coding. If you want to read more,

173
00:18:20,000 --> 00:18:24,320
there's all kinds of interesting coding out there. I also suggest if you want, dig into the

174
00:18:24,320 --> 00:18:30,480
math read Solomon in terms of how it works in practice to make efficient coding and decoding.

