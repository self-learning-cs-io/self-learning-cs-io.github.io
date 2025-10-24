---
title: PrincetonAlgorithms P108Part211 02_introduction To Data Compression
---

1
00:00:00,000 --> 00:00:06,000
Today we're going to talk about data compression.

2
00:00:06,000 --> 00:00:10,200
This is a family of algorithms that everyone uses.

3
00:00:10,200 --> 00:00:15,720
And it's based on many of the classical ideas that we've covered in terms of implementing

4
00:00:15,720 --> 00:00:17,039
basic algorithms.

5
00:00:17,039 --> 00:00:21,719
We'll start with an introduction of just what data compression is.

6
00:00:21,719 --> 00:00:29,359
So the idea is to reduce the size of a file, really for two primary reasons.

7
00:00:29,359 --> 00:00:34,200
One is to save some space when storing it, and the other is to save some time with

8
00:00:34,200 --> 00:00:36,000
transmitting it.

9
00:00:36,000 --> 00:00:42,960
And often having significant savings is not too difficult because most files have plenty

10
00:00:42,960 --> 00:00:44,640
of redundancy.

11
00:00:44,640 --> 00:00:52,039
But of course we're interested in efficient algorithms that can get the best savings possible.

12
00:00:52,039 --> 00:01:00,920
So you might think that with the way that technology has been improving over recent years,

13
00:01:00,920 --> 00:01:02,640
that we wouldn't really need compression.

14
00:01:02,640 --> 00:01:05,879
We can just buy a bigger, faster disk.

15
00:01:05,879 --> 00:01:12,120
But the problem with that idea is that even though Moore's Law tells us that we're going

16
00:01:12,120 --> 00:01:19,920
to get twice as much space every one and a half to two years, it's also the case that

17
00:01:19,920 --> 00:01:25,719
whatever space we have, we're going to want to fill it up with better higher quality

18
00:01:25,719 --> 00:01:26,719
data.

19
00:01:26,719 --> 00:01:30,519
So you want a higher resolution movie if you get more space.

20
00:01:30,519 --> 00:01:34,159
And if you can remove redundancy, you're always going to want to do that.

21
00:01:34,159 --> 00:01:43,680
So it's a cheap way to save space that allows us to do more with the space that we have available.

22
00:01:43,680 --> 00:01:46,879
This is a report last year on big data.

23
00:01:46,879 --> 00:01:51,239
Every day we could create 2.5 quintillion bytes of data.

24
00:01:51,239 --> 00:01:57,599
So much that 90% of the data in the world today has been created in the last two years alone.

25
00:01:57,599 --> 00:02:04,280
If we can use data compression to cut that amount of data in half, then that's all the data

26
00:02:04,280 --> 00:02:08,960
in the world created in a year.

27
00:02:08,960 --> 00:02:17,240
So this is a very interesting topic to consider from an algorithmic point of view because

28
00:02:17,240 --> 00:02:24,600
the basic concepts, the song of them, date back to the 1950s when it was extremely important

29
00:02:24,600 --> 00:02:31,000
to save time when transmitting information or space, not because it was so costly.

30
00:02:31,000 --> 00:02:37,080
But some of the best technology algorithmic technology has been developed recently.

31
00:02:37,080 --> 00:02:43,000
And much of it uses the data structures that we've considered for other applications.

32
00:02:43,000 --> 00:02:46,680
And we'll see that as we get into the topic.

33
00:02:46,680 --> 00:02:53,760
So just specific applications that maybe are familiar for file compression, all file systems

34
00:02:53,760 --> 00:03:05,080
and disks that have built-in compression technologies such as ZIP and BZIP and many other

35
00:03:05,080 --> 00:03:08,440
similar type technologies.

36
00:03:08,440 --> 00:03:14,040
And in multimedia, everybody's familiar with that JPEG and MP3 and MPG and all those sorts

37
00:03:14,040 --> 00:03:16,520
of things for images sound and video.

38
00:03:16,520 --> 00:03:21,000
Those are all about data compression and for communication.

39
00:03:21,000 --> 00:03:30,960
That's what enabled FACS and also enables new technologies like Skype, the ability to

40
00:03:30,960 --> 00:03:37,480
reduce the amount of data that you actually need to send for any kind of technology is

41
00:03:37,480 --> 00:03:45,000
going to help improve things and improve the quality of what you can do.

42
00:03:45,000 --> 00:03:51,080
Also the types of massive amounts of data that people are saving nowadays, Google and

43
00:03:51,080 --> 00:03:57,439
Facebook, and other web giants saving lots of data and they're going to be able to save

44
00:03:57,439 --> 00:04:01,400
more of the data compression.

45
00:04:01,400 --> 00:04:05,319
Now from a theoretical point of view, the type of compression that we're going to consider

46
00:04:05,319 --> 00:04:10,039
lossless compression is very simple conceptually.

47
00:04:10,039 --> 00:04:12,919
So we think of, we've talked about a bit stream.

48
00:04:12,919 --> 00:04:19,120
Everything can be encoded in bits, so we might as well just consider a stream of bits that

49
00:04:19,120 --> 00:04:21,600
we want to compress and we call that B.

50
00:04:21,600 --> 00:04:26,680
And a data compression algorithm is going to be a black box that goes ahead and takes

51
00:04:26,680 --> 00:04:34,519
those bits and produces a compressed version which is many fewer bits and that we'll call

52
00:04:34,519 --> 00:04:39,000
that C of B. We hope that it's many fewer bits.

53
00:04:39,000 --> 00:04:41,519
And so that's what we save or we send.

54
00:04:41,519 --> 00:04:47,120
But then we need a companion algorithm, an expansion algorithm that takes C of B and produces

55
00:04:47,120 --> 00:04:48,680
B back.

56
00:04:48,680 --> 00:04:50,240
That's lossless compression.

57
00:04:50,240 --> 00:04:54,079
We want to get back precisely the same bits that we put in.

58
00:04:54,079 --> 00:04:57,519
And that's very important in many applications.

59
00:04:57,519 --> 00:05:03,159
It's not so important in some applications like images and video where you're happy with

60
00:05:03,159 --> 00:05:06,159
an approximation in the original bit stream.

61
00:05:06,159 --> 00:05:08,879
But we're not going to consider that kind of algorithm.

62
00:05:08,879 --> 00:05:16,279
We're just going to consider lossless compression where maybe it's a program or that you can't

63
00:05:16,279 --> 00:05:20,399
afford to lose a single bit.

64
00:05:20,399 --> 00:05:26,560
Now it turns out that for what we talk about in terms of evaluating our algorithms is

65
00:05:26,560 --> 00:05:28,839
what's the compression ratio.

66
00:05:28,839 --> 00:05:30,439
We also care about efficiency.

67
00:05:30,439 --> 00:05:35,759
We don't want to spend a lot of time creating C of B. But the compression ratio is the

68
00:05:35,759 --> 00:05:38,279
measure that we use to compare algorithms.

69
00:05:38,279 --> 00:05:44,919
And we're interested in knowing the percentage of bits, percentage of the size of B that

70
00:05:44,919 --> 00:05:46,479
we're able to save.

71
00:05:46,480 --> 00:05:52,520
And surprisingly, even for natural language text, we can get 50 to 75 percent or even

72
00:05:52,520 --> 00:05:55,960
better compression ratios.

73
00:05:55,960 --> 00:06:04,439
Now just in the larger context, data compression has been with us since antiquity.

74
00:06:04,439 --> 00:06:09,200
It's always better to try to express what you're doing concisely.

75
00:06:09,200 --> 00:06:14,640
And in mathematical mutations, an example of that or number systems or even natural

76
00:06:14,639 --> 00:06:17,599
languages.

77
00:06:17,599 --> 00:06:19,839
Communications technology has evolved.

78
00:06:19,839 --> 00:06:25,639
It definitely has to do with data compression from Braille to Morse code to the telephone

79
00:06:25,639 --> 00:06:26,959
system.

80
00:06:26,959 --> 00:06:32,959
Those are all ways of trying to, or they depend on trying to achieve good data compression.

81
00:06:32,959 --> 00:06:40,000
In a modern life, everybody's trying to get more pictures of your movies on their devices.

82
00:06:40,000 --> 00:06:46,040
And it's definitely enabled by good data compression.

83
00:06:46,040 --> 00:06:50,639
It's something to think about what role data compression is going to play in the future.

84
00:06:50,639 --> 00:06:54,240
But it's really hard to see it going away.

85
00:06:54,240 --> 00:06:56,040
Number one, it's effective.

86
00:06:56,040 --> 00:06:58,759
Number two, it's not that difficult to implement.

87
00:06:58,759 --> 00:07:00,639
And it's in software.

88
00:07:00,639 --> 00:07:03,800
So you don't have to buy a bigger disk.

89
00:07:03,800 --> 00:07:08,160
You have a good compression algorithm in many situations.

90
00:07:09,000 --> 00:07:13,880
Here's a simple example that sprung up just in recent years.

91
00:07:13,880 --> 00:07:16,520
So we've talked about another application.

92
00:07:16,520 --> 00:07:23,280
The genome is string over four-letter alphabet.

93
00:07:23,280 --> 00:07:24,760
And the string might be huge.

94
00:07:24,760 --> 00:07:26,760
It might be billions of letters.

95
00:07:26,760 --> 00:07:32,400
And so there might be lots of them for different individuals and different species.

96
00:07:32,399 --> 00:07:39,359
So there's huge genome databases out there with these very long strings of the alphabet

97
00:07:39,359 --> 00:07:41,279
A, C, T, and G.

98
00:07:41,279 --> 00:07:48,199
Now the standard way to store them in a standard program, you want to use a standard computer,

99
00:07:48,199 --> 00:07:50,519
is to use ASCII.

100
00:07:50,519 --> 00:07:52,079
And there's eight bits per character.

101
00:07:52,079 --> 00:07:58,719
And so if you have an N bit genome, a genomic string, it'll be 8N bits.

102
00:07:58,720 --> 00:08:03,440
If it's a billion characters, it's 8B.

103
00:08:03,440 --> 00:08:06,320
But just look at the problem.

104
00:08:06,320 --> 00:08:08,640
Really, there's only four characters.

105
00:08:08,640 --> 00:08:11,600
You can get by with just two bits per character.

106
00:08:11,600 --> 00:08:14,480
So that's one quarter of the storage.

107
00:08:14,480 --> 00:08:20,720
If you spent X dollars on this space, the store, your stuff, you could spend X over $4.

108
00:08:20,720 --> 00:08:23,400
And that might be a significant number.

109
00:08:23,399 --> 00:08:30,759
And in fact, in general, if you know you have a small alphabet, you can get a savings

110
00:08:30,759 --> 00:08:32,279
in this way.

111
00:08:32,279 --> 00:08:37,360
This seems very obvious and straightforward, but it's amazing, but true that in the 1990s,

112
00:08:37,360 --> 00:08:42,720
when genomic databases started to emerge, there were four times too big because they used

113
00:08:42,720 --> 00:08:43,720
ASCII.

114
00:08:43,720 --> 00:08:52,679
And didn't think to even use this trivial encoding that could have cut costs by one

115
00:08:52,679 --> 00:08:54,519
and four.

116
00:08:54,519 --> 00:08:56,239
So again, it's so easy to do.

117
00:08:56,239 --> 00:08:59,239
Why not do it if you can cut your cost by a factor of four?

118
00:08:59,239 --> 00:09:06,239
Now, where else in modern life would you give up reducing cost by a factor of four so

119
00:09:06,239 --> 00:09:07,239
easily?

120
00:09:07,239 --> 00:09:10,559
So that's why we're interested in data compression.

121
00:09:10,559 --> 00:09:15,399
Now we're going to need some tools that are slightly different from the tools that we've

122
00:09:15,399 --> 00:09:20,319
been using in order to write effective data compression algorithms.

123
00:09:20,320 --> 00:09:27,920
And so we've got extensions to our standard in and standard out libraries that work with

124
00:09:27,920 --> 00:09:29,760
bits.

125
00:09:29,760 --> 00:09:36,720
So these are what we want to, the methods that we're going to use to write bits to standard

126
00:09:36,720 --> 00:09:39,760
output and standard input.

127
00:09:39,760 --> 00:09:44,440
So these bit streams are different than standard in, standard out there, binary standard in,

128
00:09:44,440 --> 00:09:46,080
binary standard out.

129
00:09:46,080 --> 00:09:56,400
And so what we can do is read Boolean, which is just read one bit or to save some processing,

130
00:09:56,400 --> 00:10:00,560
we can read eight bits of data and put it in a care.

131
00:10:00,560 --> 00:10:07,160
Or in general, our bits, where I was less than eight, and put it into a care value.

132
00:10:07,160 --> 00:10:12,040
And we can also, if we want, put them into int values long and double similar methods.

133
00:10:12,039 --> 00:10:17,360
And we don't have to read all the bits if we've got some scheme where we only want to

134
00:10:17,360 --> 00:10:19,559
use a certain number of them.

135
00:10:19,559 --> 00:10:25,959
But the idea is that we can read a variable number of bits and get them ready for processing

136
00:10:25,959 --> 00:10:31,559
easily by putting them in one of Java's primitive types.

137
00:10:31,559 --> 00:10:38,039
And conversely, we have binary standard out where we can write a bit or we can write eight

138
00:10:38,039 --> 00:10:43,399
bits or we can write any number of bits from a care value or from an int value or any

139
00:10:43,399 --> 00:10:44,399
others.

140
00:10:44,399 --> 00:10:50,759
So this allows us to take in bit streams and to write out bit streams and take care of

141
00:10:50,759 --> 00:10:56,799
all the encoding between Java primitive types and bit streams.

142
00:10:56,799 --> 00:10:58,799
And it's not too difficult to use.

143
00:10:58,799 --> 00:10:59,799
It's very intuitive.

144
00:10:59,799 --> 00:11:03,319
And you'll see when we come to code.

145
00:11:03,320 --> 00:11:10,920
Just to give an example of how just having this can save space, this is just a simple example

146
00:11:10,920 --> 00:11:13,160
of representing a date.

147
00:11:13,160 --> 00:11:24,280
So if you represent the date 1231 1999 as an ASCII character string in Java, then when

148
00:11:24,280 --> 00:11:30,160
you write out the string, you've got one, two, three, four, five, six, seven, eight,

149
00:11:30,160 --> 00:11:32,880
nine, ten characters.

150
00:11:32,879 --> 00:11:34,879
And each one of the characters is eight bits.

151
00:11:34,879 --> 00:11:37,399
So that's a total of 80 bits.

152
00:11:37,399 --> 00:11:46,039
So the standard ASCII encoding is to just look up the ASCII of the one and that's 0, 0,

153
00:11:46,039 --> 00:11:50,120
1, 0, 0, 0, 1 and then the two and so forth.

154
00:11:50,120 --> 00:11:54,039
So in the slash 31 and so forth.

155
00:11:54,039 --> 00:11:57,679
So for each character, we've got eight bits and we put them out.

156
00:11:57,679 --> 00:11:58,679
That's 80 bits.

157
00:11:58,679 --> 00:12:00,799
If it was unicode, it would be even more bits.

158
00:12:00,799 --> 00:12:07,120
So that's one way that you might consider representing a date with bits.

159
00:12:07,120 --> 00:12:14,559
Now if we represent it as three int values, that's not so effective a way to do it.

160
00:12:14,559 --> 00:12:17,599
The month is an int, the days an int and the years an int.

161
00:12:17,599 --> 00:12:21,559
And each one of those is going to be 32 bits.

162
00:12:21,559 --> 00:12:24,000
And that's a total of 96 bits.

163
00:12:24,000 --> 00:12:26,599
That's actually even worse.

164
00:12:27,000 --> 00:12:31,159
The month and all of these things are within small ranges.

165
00:12:31,159 --> 00:12:38,920
So with binary standard out, we can say, well, we'll only write out the right most four bits

166
00:12:38,920 --> 00:12:44,639
of the month int because that gives us a number between 0 and 16 and our months are between

167
00:12:44,639 --> 00:12:46,040
1 and 12.

168
00:12:46,040 --> 00:12:51,440
And the five bits of the day, int and that again, that's between 0 and 31.

169
00:12:51,440 --> 00:12:54,600
And that's going to cover any possible day.

170
00:12:54,600 --> 00:12:56,560
And then 12 bits for the year.

171
00:12:56,559 --> 00:13:00,119
And if we do that, then we have a total of 21 bits.

172
00:13:00,119 --> 00:13:10,079
And this little bit of extra at the end because our byte streams, our bits really are implemented

173
00:13:10,079 --> 00:13:14,199
reasonably in most situations as byte streams.

174
00:13:14,199 --> 00:13:21,079
So they're going to get carved into chunks of size 8 by hardware or drivers.

175
00:13:21,080 --> 00:13:28,000
And so we always round up to the nearest multiple of 8 to get the proper alignment on bytes.

176
00:13:28,000 --> 00:13:35,639
But that's still a pretty significant savings from 80 to 24 just by having the ability to

177
00:13:35,639 --> 00:13:40,080
write out portions of int value.

178
00:13:40,080 --> 00:13:44,120
And if we had a billion dates, then that would be a huge cost savings that would translate

179
00:13:44,120 --> 00:13:47,840
to dollars as well.

180
00:13:47,840 --> 00:13:56,280
The other thing that we do to give some visual impression of our effectiveness of our

181
00:13:56,280 --> 00:14:03,399
compression algorithms, particularly in the text, is to look at different ways to examine

182
00:14:03,399 --> 00:14:06,240
the contents of a bit stream.

183
00:14:06,240 --> 00:14:16,240
So we have on the book site, a binary dump program that prints out the bits, 16 bits of

184
00:14:16,240 --> 00:14:21,360
the time, rows of 16 bits at a time, and then the total number of bits.

185
00:14:21,360 --> 00:14:27,159
So this file, abrad.text, is a standard character stream.

186
00:14:27,159 --> 00:14:30,080
So everything's encoded with 8 bits.

187
00:14:30,080 --> 00:14:32,279
And so there's 12 characters and 96 bits.

188
00:14:32,279 --> 00:14:35,399
And you can see what all the bits are.

189
00:14:35,399 --> 00:14:41,080
Or sometimes it's convenient to use a hexa dump where we just write the hex digits considering

190
00:14:41,080 --> 00:14:44,560
the bits 4 bits at a time.

191
00:14:44,559 --> 00:14:51,279
And so those 96 bits are 12 bytes or 24 hex digits.

192
00:14:51,279 --> 00:14:53,719
And we print them out so that we can see them.

193
00:14:53,719 --> 00:15:00,959
Another thing that's useful sometimes for big files is to look at the bits as a picture

194
00:15:00,959 --> 00:15:10,199
where we just do a, give the width and the height of a pixel window and just map the bits

195
00:15:10,199 --> 00:15:12,479
to white squares and black squares.

196
00:15:12,480 --> 00:15:15,360
So this is the same abrad.text.

197
00:15:15,360 --> 00:15:20,399
It's just that you can see that they all start with 0 and 1 much more easily.

198
00:15:20,399 --> 00:15:28,680
This visual representation sometimes gives an interesting perspective into what a bunch

199
00:15:28,680 --> 00:15:31,759
of bits looks like.

200
00:15:31,759 --> 00:15:39,960
So this is just the hexa-asky conversion table that if you're not familiar with it as

201
00:15:39,960 --> 00:15:46,680
a quick way to find the hexadecimal corresponding to an ASCII character.

202
00:15:46,680 --> 00:15:52,720
So you look up say R in the table and that's in row 5 and column 2.

203
00:15:52,720 --> 00:15:53,720
So it's 52.

204
00:15:53,720 --> 00:15:59,519
So this is a 52 for the R in abrad.

205
00:15:59,519 --> 00:16:05,360
So those are the basic tools that we're going to use to talk about compression algorithms.

206
00:16:05,360 --> 00:16:08,400
Now there's one thing that's really important to think about.

207
00:16:08,399 --> 00:16:14,299
And that's the idea that you cannot have a compression algorithm that can compress every

208
00:16:14,299 --> 00:16:15,959
file.

209
00:16:15,959 --> 00:16:22,279
Despite the fact that somebody has patented that and there's a claim that methods for data

210
00:16:22,279 --> 00:16:26,879
compression is capable of compressing all files.

211
00:16:26,879 --> 00:16:34,559
And also this is another thing that came out in slash dot a few years ago where a company

212
00:16:34,559 --> 00:16:40,599
had announced a breakthrough in data compression that does 100 to 1 lossless compression of

213
00:16:40,599 --> 00:16:42,599
random data.

214
00:16:42,599 --> 00:16:47,000
And unfortunately they do say if this is true or bandwidth problems got a lot smaller

215
00:16:47,000 --> 00:16:49,759
because there's no way that it's true.

216
00:16:49,759 --> 00:16:52,479
And let's look at why that's the case.

217
00:16:52,479 --> 00:16:56,599
Proposition is no algorithm can compress every bit string.

218
00:16:56,599 --> 00:17:00,079
Here's one easy way to prove it by contradiction.

219
00:17:00,080 --> 00:17:05,720
So let's suppose that we have an algorithm you that can go ahead and compress every possible

220
00:17:05,720 --> 00:17:07,440
bit string.

221
00:17:07,440 --> 00:17:13,640
So we take a bit string and we use our algorithm to compress it to get a smaller bit

222
00:17:13,640 --> 00:17:14,640
string.

223
00:17:14,640 --> 00:17:19,279
But since our algorithm can compress every bit string why not use it on that one?

224
00:17:19,279 --> 00:17:21,600
Use it on that one we get a smaller one.

225
00:17:21,600 --> 00:17:26,039
And we keep going since it compress can compress every bit string.

226
00:17:26,039 --> 00:17:30,000
Eventually we get down to a bit string of size one and since it can compress that one

227
00:17:30,000 --> 00:17:32,000
it gets down to zero.

228
00:17:32,000 --> 00:17:38,359
So if you can have an algorithm that compresses every bit string it means that you can compress

229
00:17:38,359 --> 00:17:43,039
all bit strings to zero bits in that's absurd.

230
00:17:43,039 --> 00:17:45,319
That's approved by contradiction.

231
00:17:45,319 --> 00:17:50,519
Or another way to see the same thing is just by counting.

232
00:17:50,519 --> 00:17:56,839
So let's say you've got an algorithm that can compress all thousand bit strings just

233
00:17:56,839 --> 00:17:57,839
to pick a number.

234
00:17:57,839 --> 00:17:59,759
Now there's a lot of thousand bit strings.

235
00:17:59,759 --> 00:18:03,000
There's two to the thousandth of them.

236
00:18:03,000 --> 00:18:10,359
But how many of those can be encoded with 99, 99 bits or fewer?

237
00:18:10,359 --> 00:18:21,679
Well just one plus two plus four and the power is a two up to two to the 99, 99, 99.

238
00:18:21,679 --> 00:18:25,399
Or like less than 500 bits.

239
00:18:25,399 --> 00:18:30,319
So that's way fewer than the total number of possible bit strings.

240
00:18:30,319 --> 00:18:35,599
Well it says there's one that if you add up this sum that's two thousandth minus one.

241
00:18:35,599 --> 00:18:37,679
So there's one that can't be compressed with that.

242
00:18:37,680 --> 00:18:41,920
But if you want to say you do fewer bits you have much worse problem.

243
00:18:41,920 --> 00:18:46,279
Only one out of every two to the 49 can be encoded with less than 500 bits.

244
00:18:46,279 --> 00:18:55,600
It's just the smaller number of bits gives you way number of way fewer possible bit strings.

245
00:18:55,600 --> 00:18:59,440
You have to be able to get your original bit string back.

246
00:18:59,440 --> 00:19:05,519
So the smaller number of bits gives you a limit on the number of bit strings that you

247
00:19:05,519 --> 00:19:08,080
can possibly compress.

248
00:19:08,080 --> 00:19:10,720
So it can't have universal data compression.

249
00:19:10,720 --> 00:19:15,880
And if you want to convince yourself of that, not just try running your favorite compression

250
00:19:15,880 --> 00:19:23,880
algorithm on the result of what it produces say for a photo.

251
00:19:23,880 --> 00:19:27,440
Most good compression algorithms will figure out that you're doing that and just give you

252
00:19:27,440 --> 00:19:28,600
the same file back.

253
00:19:28,599 --> 00:19:31,399
So at least it won't make it get larger.

254
00:19:31,399 --> 00:19:39,039
But there's plenty of methods out there that will make your file larger.

255
00:19:39,039 --> 00:19:46,480
There's another kind of basic idea and that is that there's no way to find the best way

256
00:19:46,480 --> 00:19:48,319
to compress a file.

257
00:19:48,319 --> 00:19:51,079
If you think about it can be extremely complicated.

258
00:19:51,079 --> 00:19:55,639
This is just an example that illustrates the point but it's also a relevant example because

259
00:19:55,640 --> 00:19:59,240
it applies to so much of the data that we deal with.

260
00:19:59,240 --> 00:20:02,759
So at the top is a picture dump of a million bit file.

261
00:20:02,759 --> 00:20:05,360
So that's a million bits and those are random bits.

262
00:20:05,360 --> 00:20:06,960
Well, they're not random.

263
00:20:06,960 --> 00:20:07,960
They're pseudo random.

264
00:20:07,960 --> 00:20:09,800
What do I mean pseudo random?

265
00:20:09,800 --> 00:20:11,560
Well, we talked about that.

266
00:20:11,560 --> 00:20:13,640
They're generated by a program.

267
00:20:13,640 --> 00:20:20,440
And this is a Java program that uses a pseudo random number generator to generate bits.

268
00:20:20,440 --> 00:20:22,920
And that's where those bits came from.

269
00:20:22,920 --> 00:20:28,200
If you think about it, this program is a representation of those million bits.

270
00:20:28,200 --> 00:20:30,360
It's only a couple dozen characters.

271
00:20:30,360 --> 00:20:36,400
So if you wanted to find the optimal way to compress those bits, one of the things you'd

272
00:20:36,400 --> 00:20:39,440
have to consider is this program.

273
00:20:39,440 --> 00:20:43,400
That's a pretty compact way to represent a million bits.

274
00:20:43,400 --> 00:20:50,560
And we think about it so much of the data that's out there actually was created by a program.

275
00:20:50,559 --> 00:20:56,359
So compression amounts to finding the program that creates, created the data.

276
00:20:56,359 --> 00:20:58,480
That's obviously a pretty difficult problem.

277
00:20:58,480 --> 00:21:02,319
In fact, it's known that it's undecidable.

278
00:21:02,319 --> 00:21:09,159
So let's not think that we can find the best possible compression algorithm.

279
00:21:09,159 --> 00:21:14,759
In the other point that I want to finish with in the introduction is to realize that when

280
00:21:14,759 --> 00:21:22,240
we're talking about compressing, say, English language, it's amazing to see that actually

281
00:21:22,240 --> 00:21:28,000
there's a lot of redundancy in English language.

282
00:21:28,000 --> 00:21:42,000
And so this is a perturbed version of an English language paragraph that shows that you can

283
00:21:42,000 --> 00:21:49,480
change letters and even delete letters and still figure out what it says.

284
00:21:49,480 --> 00:21:55,119
And actually at the end it says you only need the first and last two letters in a lot of

285
00:21:55,119 --> 00:22:00,839
situations to really figure out the readability.

286
00:22:00,839 --> 00:22:06,480
So there's a lot of freedom because there's so much redundancy.

287
00:22:06,480 --> 00:22:13,039
And since it's so much redundancy, we can actually do really well on compressing English

288
00:22:13,039 --> 00:22:15,880
language text, for example.

289
00:22:15,880 --> 00:22:20,200
So that's an introduction to data compression and we'll take a look at algorithms next.

