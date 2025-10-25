---
title: MIT6100 P5P05FloatsandApproximationMethods
---

1
00:00:00,000 --> 00:00:15,359
Okay, so let's get started.

2
00:00:15,359 --> 00:00:20,480
Today's lecture we're going to do a little bit of a recap of the last lecture.

3
00:00:20,480 --> 00:00:25,859
We had begun talking about binary numbers and then we're going to dive into our second

4
00:00:25,859 --> 00:00:31,619
algorithm of the class, the approximation method algorithm.

5
00:00:31,619 --> 00:00:36,780
So let's remember the motivation we had for even talking about binary numbers and how

6
00:00:36,780 --> 00:00:39,939
numbers are represented in the computer in the first place.

7
00:00:39,939 --> 00:00:42,500
And the motivation was this piece of code.

8
00:00:42,500 --> 00:00:43,820
So it's very simple.

9
00:00:43,820 --> 00:00:51,539
We have an initial x is zero and then we have a loop that just adds point one to itself

10
00:00:51,539 --> 00:00:58,100
ten times and then we printed whether that sum equals one.

11
00:00:58,100 --> 00:01:01,579
And what we saw was that it was false.

12
00:01:01,579 --> 00:01:04,219
Printing x equivalent to one was false.

13
00:01:04,219 --> 00:01:08,939
So then we printed what the actual value of x was after adding point one to itself many

14
00:01:08,939 --> 00:01:15,379
ten times and we saw that that summation was actually point 9999999.

15
00:01:15,379 --> 00:01:19,019
And of course, to Python point 999 is not equal to one.

16
00:01:19,019 --> 00:01:23,780
So that's why we had printed false for x equivalent to one.

17
00:01:23,780 --> 00:01:25,780
That expression.

18
00:01:25,780 --> 00:01:27,179
And so this is our motivation.

19
00:01:27,179 --> 00:01:32,299
Why in the world does this happen in programming and in Python and something like this could

20
00:01:32,299 --> 00:01:37,219
really screw us up, right, if we're not even able to compare floating point numbers?

21
00:01:37,219 --> 00:01:41,420
So last lecture we ended with this piece of code.

22
00:01:41,420 --> 00:01:48,579
It was a way for us to get the binary representation of a number in base ten.

23
00:01:48,579 --> 00:01:53,739
So given some number, we followed a really simple recipe, a really simple algorithm to convert

24
00:01:53,739 --> 00:01:56,939
that number into base two.

25
00:01:56,939 --> 00:02:01,980
The stuff that's in boxes, let's not worry about it for now, but let's look at just

26
00:02:01,980 --> 00:02:03,939
this part right here.

27
00:02:03,939 --> 00:02:06,819
So the stuff that's in between the two boxes.

28
00:02:06,819 --> 00:02:11,379
And this is the part that does most of the work for us or all of the work even for us.

29
00:02:11,379 --> 00:02:16,500
It basically creates a string, initially empty.

30
00:02:16,500 --> 00:02:23,740
And the idea was that we were going to prepend either zero or one to that string, depending

31
00:02:23,740 --> 00:02:26,699
on whether the number we had was odd or even.

32
00:02:26,699 --> 00:02:34,379
So for a number like 19, if we wanted to convert 19 base ten into base two, what the algorithm

33
00:02:34,379 --> 00:02:38,420
was doing is over here in the loop.

34
00:02:38,420 --> 00:02:44,939
It says while the num, this num, whatever it is, initially 19 is still greater than zero,

35
00:02:44,939 --> 00:02:48,259
let's get the remainder when we divide the number by two.

36
00:02:48,259 --> 00:02:51,099
So that's what this num percent two is doing.

37
00:02:51,099 --> 00:02:52,780
It's either getting a zero or one.

38
00:02:52,780 --> 00:02:58,900
So 19, the remainder when we divide 19 by two is one.

39
00:02:58,900 --> 00:03:04,139
And we're going to prepend, so we're casting this one integer to a string and prepending

40
00:03:04,139 --> 00:03:08,020
it to this result, which is initially empty.

41
00:03:08,020 --> 00:03:11,819
So that's what this line is doing, result equals this thing here.

42
00:03:11,819 --> 00:03:15,620
And then we're going to take our number and integer divided by two.

43
00:03:15,620 --> 00:03:19,340
So we're going to take the number 19 and divide it by two.

44
00:03:19,340 --> 00:03:23,060
So that's going to be 9.5, but we're only interested in the integer portion of it.

45
00:03:23,060 --> 00:03:24,259
So 9.

46
00:03:24,259 --> 00:03:28,539
And then the loop does the check again.

47
00:03:28,539 --> 00:03:30,099
Is 9 still greater than zero?

48
00:03:30,099 --> 00:03:31,099
It is.

49
00:03:31,099 --> 00:03:34,979
So then we're going to say what's the remainder when we divide 9 by two?

50
00:03:34,979 --> 00:03:36,180
It's another one.

51
00:03:36,180 --> 00:03:42,620
So we're going to prepend it that remainder to the string that we're building up.

52
00:03:42,620 --> 00:03:44,860
And again, we're going to divide this number by two.

53
00:03:44,860 --> 00:03:49,379
So now we have 4.5, and we only grab the integer portion of it.

54
00:03:49,379 --> 00:03:50,379
Four.

55
00:03:50,379 --> 00:03:55,819
And again, we ask what is the remainder when we divide four by two?

56
00:03:55,819 --> 00:03:57,620
It's a zero.

57
00:03:57,620 --> 00:04:02,740
So we prepend the zero to our, sort of, this binary string we're building up.

58
00:04:02,740 --> 00:04:04,260
Again, we divided by two.

59
00:04:04,260 --> 00:04:05,340
It's a two.

60
00:04:05,340 --> 00:04:07,819
The remainder when we divide two by two is zero.

61
00:04:07,819 --> 00:04:09,140
It's an even number.

62
00:04:09,140 --> 00:04:10,900
Again, we divide two by two.

63
00:04:10,900 --> 00:04:11,900
It's a one.

64
00:04:11,900 --> 00:04:19,780
And the remainder we get when we divide one by two is a one.

65
00:04:19,780 --> 00:04:24,660
And so this is the string that we had eventually, sort of, systematically, right?

66
00:04:24,660 --> 00:04:28,139
Iteratively built up with this loop here.

67
00:04:28,139 --> 00:04:31,379
And num, after we divide this, is going to be zero.

68
00:04:31,379 --> 00:04:35,180
And then we break out of the loop.

69
00:04:35,180 --> 00:04:41,180
So the binary representation of 19 was 1,0011, base two.

70
00:04:41,180 --> 00:04:44,660
We just kept it as a string.

71
00:04:44,660 --> 00:04:51,100
The parts that are in red boxes is us dealing with a negative number.

72
00:04:51,100 --> 00:04:57,620
So if the user wanted to convert negative 19 to a binary representation, this, if else,

73
00:04:57,620 --> 00:05:00,620
up here says is the number less than zero?

74
00:05:00,620 --> 00:05:04,819
If yes, let's set a negative flag to true.

75
00:05:04,819 --> 00:05:07,939
And let's just assume the user gave us a positive number.

76
00:05:07,939 --> 00:05:12,819
So we convert that negative 19 to the absolute value of itself, positive 19.

77
00:05:12,819 --> 00:05:17,379
This code goes through as if the user had given us a positive number.

78
00:05:17,379 --> 00:05:21,939
And then at the end, we would get the same number as before.

79
00:05:21,939 --> 00:05:25,740
Except that we're going to prepend a negative sign.

80
00:05:25,740 --> 00:05:33,500
So the negative, so the binary representation of negative 19 is just negative the same thing.

81
00:05:33,500 --> 00:05:36,180
Okay, so that's, that was where we ended up.

82
00:05:36,180 --> 00:05:38,620
We talked about these integers.

83
00:05:38,620 --> 00:05:40,620
But now what about fractions, right?

84
00:05:40,620 --> 00:05:42,420
Integers seems really easy.

85
00:05:42,420 --> 00:05:45,939
There's a really easy, simple procedure algorithm, right?

86
00:05:45,939 --> 00:05:48,620
Recipe for us to follow to get the binary representation.

87
00:05:48,620 --> 00:05:50,100
But what about these fractions?

88
00:05:50,100 --> 00:05:52,379
Oh, yes, sorry.

89
00:05:52,379 --> 00:05:55,980
So how does, because the negative rate, everything's going to be a zero one.

90
00:05:55,980 --> 00:05:59,379
So how does it read the negative?

91
00:05:59,379 --> 00:06:02,579
Here, here, oh, we just, it doesn't read it.

92
00:06:02,579 --> 00:06:05,740
We just pretend like we were given a positive number.

93
00:06:05,740 --> 00:06:09,219
And then we just do the same process over again.

94
00:06:09,219 --> 00:06:12,180
Okay, so the computer doesn't have a signal.

95
00:06:12,180 --> 00:06:17,139
I mean, it, for the purposes of the algorithm, it doesn't need to know,

96
00:06:17,139 --> 00:06:19,339
because the number will come out the same.

97
00:06:19,339 --> 00:06:22,379
We just flag it as being a negative number.

98
00:06:22,379 --> 00:06:25,459
And then at the end, we say, hey, we were actually given a negative number.

99
00:06:25,459 --> 00:06:28,419
So let's just pop this negative sign right in front of it.

100
00:06:28,419 --> 00:06:32,739
Okay, and then we'll talk about like the powers that like two is,

101
00:06:32,739 --> 00:06:39,059
but two, like are we like going left to right like descending powers or ascending powers?

102
00:06:39,059 --> 00:06:42,459
We are actually doing ascending when we're building up the string,

103
00:06:42,459 --> 00:06:45,099
because we're going right to left.

104
00:06:45,099 --> 00:06:47,819
So we're, yeah, yeah, exactly.

105
00:06:47,819 --> 00:06:53,139
So this is two to the zero, and this is two to the four.

106
00:06:53,139 --> 00:06:55,579
Yeah.

107
00:06:55,579 --> 00:06:59,779
So in terms of fractions, if we're thinking about what it means to talk about a fraction

108
00:06:59,779 --> 00:07:02,219
in human readable base 10, right?

109
00:07:02,219 --> 00:07:03,980
So number zero through nine.

110
00:07:03,980 --> 00:07:09,219
When we have zero point ABC, we're basically saying that's a divided by 10 plus b divided

111
00:07:09,219 --> 00:07:12,459
by 100 plus c divided by 1000 and so on.

112
00:07:12,459 --> 00:07:16,579
And in base two, we're going to have the same sort of thing going on.

113
00:07:16,579 --> 00:07:21,779
If we're talking about a base two representation of a number, zero point ABC,

114
00:07:21,779 --> 00:07:27,300
where now a, a, b or c is just zero or one instead of zero through nine,

115
00:07:27,300 --> 00:07:28,500
it's going to be the same thing.

116
00:07:28,500 --> 00:07:33,659
So we would have a divided by two plus b divided by four plus c divided by eight and so on.

117
00:07:33,659 --> 00:07:38,139
So we're now we're dealing with powers of two instead of powers of 10, right?

118
00:07:38,139 --> 00:07:42,699
Because our base, our base is now two instead of 10.

119
00:07:42,699 --> 00:07:45,779
So that means the binary representation of a decimal fraction

120
00:07:45,779 --> 00:07:49,939
basically means can we find some sort of combination of these values,

121
00:07:49,939 --> 00:07:55,219
point five times a zero or one plus point two five times a zero one plus point one

122
00:07:55,219 --> 00:07:57,699
two five times zero one and so on and so on.

123
00:07:57,699 --> 00:08:00,539
So these are all the powers of two.

124
00:08:00,539 --> 00:08:06,099
So I'll give you the recipe for how we can actually find the, the, the representation

125
00:08:06,099 --> 00:08:07,059
of a fraction.

126
00:08:07,059 --> 00:08:10,939
And this is not something that we expect you to come up just like the recipe for this

127
00:08:10,939 --> 00:08:13,379
is not something we expect you to come up with.

128
00:08:13,459 --> 00:08:18,659
But given the recipe, you should be able to sort of intuitively figure out what is the code

129
00:08:18,659 --> 00:08:22,500
that actually, you know, performs this, this, this action, right?

130
00:08:22,500 --> 00:08:23,659
That does this recipe.

131
00:08:25,659 --> 00:08:35,779
So the idea to convert a decimal number to a, a decimal fraction in base 10 to a fraction,

132
00:08:35,779 --> 00:08:40,179
sorry, to a binary fraction, right in base two is as follows.

133
00:08:40,179 --> 00:08:44,819
So let's look at the decimal number three divided by eight, just as an example.

134
00:08:44,819 --> 00:08:46,779
So that's 0.375, right?

135
00:08:46,779 --> 00:08:51,019
But we know it's three over eight in base 10.

136
00:08:51,019 --> 00:08:57,739
So using numbers, you know, number zero through nine, we end up saying it's three over

137
00:08:57,739 --> 00:09:00,819
10 plus seven over 100 plus five over a thousand, right?

138
00:09:00,819 --> 00:09:02,219
That's just base 10.

139
00:09:02,219 --> 00:09:05,779
But we need to come up with a way to convert this into base two.

140
00:09:05,779 --> 00:09:13,539
And so the trick here is to basically say, what is the biggest multiple of two that I

141
00:09:13,539 --> 00:09:21,459
can multiply my number, my decimal number with such that I end up getting a whole number,

142
00:09:21,459 --> 00:09:23,299
an integer.

143
00:09:23,299 --> 00:09:25,659
That's sort of the trick to this whole thing.

144
00:09:25,659 --> 00:09:32,059
Can I multiply my 0.375 or whatever fraction I'm interested in calculating and changing

145
00:09:32,059 --> 00:09:38,419
to base two by some power of two big enough such that I'm going to get a whole number out

146
00:09:38,419 --> 00:09:40,579
of this, out of the multiplication.

147
00:09:40,579 --> 00:09:44,579
And it has to be a power of two because we're converting it to binary, right, zeroes and

148
00:09:44,579 --> 00:09:45,899
ones.

149
00:09:45,899 --> 00:09:50,059
So in this simple example, 0.375 is three divided by eight.

150
00:09:50,059 --> 00:09:56,179
So that means that the biggest power of, or the smallest power of two I can multiply three

151
00:09:56,179 --> 00:09:59,139
over eight by to give me a whole number is eight, right?

152
00:09:59,139 --> 00:10:01,579
That's two to the power of three.

153
00:10:01,580 --> 00:10:10,259
So if I multiply 0.375 by eight, three over eight times eight gives me three in base ten.

154
00:10:10,259 --> 00:10:14,340
And now this whole number, I know how to convert to binary.

155
00:10:14,340 --> 00:10:16,139
I have a recipe, right?

156
00:10:16,139 --> 00:10:17,340
We've done it on the board here.

157
00:10:17,340 --> 00:10:19,700
We have the code on the previous slide.

158
00:10:19,700 --> 00:10:26,540
So all we have to do now is convert the number three to binary, which is just one one, base

159
00:10:26,540 --> 00:10:29,500
two.

160
00:10:29,500 --> 00:10:32,779
But this one one is a representation of the number three.

161
00:10:32,779 --> 00:10:40,179
So in order to get back to 0.375, I need to divide my three by two to the power of three.

162
00:10:40,179 --> 00:10:45,019
So I need to divide my one one by two to the power of three.

163
00:10:45,019 --> 00:10:52,019
And in binary, dividing by some power of two just means shifting the decimal point over.

164
00:10:52,019 --> 00:10:56,820
Just like in base ten, dividing by ten means shifting the decimal point over.

165
00:10:56,820 --> 00:11:02,740
So if number three is one one, and I multiply by two to the three to get this value, to

166
00:11:02,740 --> 00:11:06,820
divide by two to the three, I just need to move the decimal point from just after the one

167
00:11:06,820 --> 00:11:11,060
one over one two, and then add another zero.

168
00:11:11,060 --> 00:11:15,940
So the representation of the 0.375 becomes 0.011.

169
00:11:15,940 --> 00:11:16,940
Right?

170
00:11:16,940 --> 00:11:24,140
I just shifted this decimal point over by three, because now we're dealing in base two.

171
00:11:24,140 --> 00:11:24,660
Okay.

172
00:11:24,659 --> 00:11:26,899
So that's the system.

173
00:11:26,899 --> 00:11:33,459
That's the recipe for getting this binary representation out of a decimal number.

174
00:11:33,459 --> 00:11:35,219
But there's a problem.

175
00:11:35,219 --> 00:11:41,299
This is all relying on the fact that I can find this magical power of two.

176
00:11:41,299 --> 00:11:46,179
That if it's big enough, I can find such a power of two that when I multiply with my decimal

177
00:11:46,179 --> 00:11:49,339
number, I get a whole number out of it.

178
00:11:49,339 --> 00:11:51,459
And that's not always the case.

179
00:11:51,460 --> 00:11:57,139
Because that power of two is going to be really, really big, or it might not even exist.

180
00:11:57,139 --> 00:11:58,139
Okay?

181
00:11:58,139 --> 00:12:02,820
And so if it's really bigger, if it doesn't exist, that's where we run into problems, as we're

182
00:12:02,820 --> 00:12:05,060
going to see in a little bit.

183
00:12:05,060 --> 00:12:08,780
So this is all relying on the fact that I can find this power of two.

184
00:12:08,780 --> 00:12:13,740
So here's the code to actually do this recipe that I had on the previous slide.

185
00:12:13,740 --> 00:12:18,300
Finding the power of two, doing the conversion, and then shifting the decimal point over.

186
00:12:18,299 --> 00:12:20,779
So I'm going to do a quick overview of the pieces.

187
00:12:20,779 --> 00:12:24,859
And then we can run the Python tutor just to show you exactly step by step what's going

188
00:12:24,859 --> 00:12:25,859
on.

189
00:12:25,859 --> 00:12:31,019
So let's say I want to do 0.625 and convert that to a power of two.

190
00:12:31,019 --> 00:12:33,939
So I've got my x initialized up there.

191
00:12:33,939 --> 00:12:40,139
This bit here, so this big box here, is the part that finds this magical power of two for

192
00:12:40,139 --> 00:12:41,139
me.

193
00:12:41,139 --> 00:12:42,139
Okay?

194
00:12:42,139 --> 00:12:47,740
It's just a loop that keeps incrementing the p, the power, such that two to the power of

195
00:12:47,740 --> 00:12:55,139
p multiplied by x, this percent one just gives me the decimal bit out of that multiplication

196
00:12:55,139 --> 00:12:56,820
is 0.

197
00:12:56,820 --> 00:13:04,019
So I'm going to keep multiplying two to some power of p by x, as long as I still have

198
00:13:04,019 --> 00:13:07,019
a decimal piece to my number.

199
00:13:07,019 --> 00:13:12,340
As soon as this percentage percent one becomes 0, that means that the number I end up with

200
00:13:12,340 --> 00:13:14,539
is some number dot 0.

201
00:13:14,539 --> 00:13:17,700
There is no more decimal part to it.

202
00:13:17,700 --> 00:13:24,620
At that point, I break out of the loop and I found my power of p, or my power of p.

203
00:13:24,620 --> 00:13:26,580
This is going to be the integer.

204
00:13:26,580 --> 00:13:34,580
So I'm multiplying x by that special power, by two to the power of that special power.

205
00:13:34,580 --> 00:13:35,820
And now I have this number.

206
00:13:35,820 --> 00:13:39,620
So on the previous slide, it's the number three in base 10.

207
00:13:39,620 --> 00:13:44,140
And then this box here is exactly the same as two slides ago.

208
00:13:44,140 --> 00:13:46,379
It's this procedure here.

209
00:13:46,379 --> 00:13:53,500
It's taking my number, whatever it may be, and getting the binary representation of it.

210
00:13:53,500 --> 00:13:58,779
And after that, we need to figure out how many spaces to move the decimal point backward.

211
00:13:58,779 --> 00:14:02,539
So what is the power of p we multiplied that number by?

212
00:14:02,539 --> 00:14:06,100
And now we need to work our way backward and say, well, that dot is here.

213
00:14:06,100 --> 00:14:09,939
Let me move the dot back p steps.

214
00:14:09,939 --> 00:14:11,620
And that's what this is doing.

215
00:14:11,620 --> 00:14:20,779
So it's iterating through p minus, however long this thing is, to pad the front with zeros.

216
00:14:20,779 --> 00:14:23,539
Because sometimes this is going to be a really small number.

217
00:14:23,539 --> 00:14:27,740
So I need to add some leading zeros before I put my decimal point.

218
00:14:27,740 --> 00:14:31,340
And then I put my decimal point, and that's all this line is doing.

219
00:14:31,340 --> 00:14:35,220
And then I print my result.

220
00:14:35,220 --> 00:14:44,220
So Python tutor.

221
00:14:44,220 --> 00:14:45,620
So step through.

222
00:14:45,620 --> 00:14:49,060
So this is 0.625, just like in the slides.

223
00:14:49,060 --> 00:14:50,259
p is initially zero.

224
00:14:50,259 --> 00:14:59,860
So now this loop is just incrementing p1 by 1 to find the point where I have a remainder of zero.

225
00:14:59,860 --> 00:15:02,259
So here I'm actually also printing the remainder.

226
00:15:02,259 --> 00:15:05,180
So here we still have a non-zero remainder.

227
00:15:05,179 --> 00:15:10,659
So it's 0.625 as a remainder, 0.25 as a remainder, 0.5 as a remainder.

228
00:15:10,659 --> 00:15:17,899
And then at some point I had multiplied it by 2 to the power of 3, because p is 3, and I had a zero remainder.

229
00:15:17,899 --> 00:15:22,259
So now I've broken out of that loop, and I know num is equal to 5.

230
00:15:22,259 --> 00:15:28,659
I multiplied by 2 to the power of 3 times 0.6 to 5 to give me 5.

231
00:15:28,659 --> 00:15:34,539
So now I need to convert num, which is 5, using this process we did here, into binary.

232
00:15:34,539 --> 00:15:40,299
That's what this code is doing, and this is exactly this process we had here.

233
00:15:40,299 --> 00:15:49,819
So I'm creating this result string, and then pre-pending a 0 or 1, whether the number is divisible by 2 or not.

234
00:15:49,819 --> 00:15:55,019
So the number 5 in binary is 101.

235
00:15:55,019 --> 00:16:03,579
So that means I have 101 dot as my binary representation of 5, and now the code is going to go through this loop,

236
00:16:03,580 --> 00:16:08,180
which means it's going to move the decimal point to the left 3 slots, right?

237
00:16:08,180 --> 00:16:14,340
Because I have to multiply by 2 to the power of 3 to get the 5.

238
00:16:14,340 --> 00:16:19,860
So you can see it's going to go loop through 3 slots, right?

239
00:16:19,860 --> 00:16:27,700
So here it is, it made the point 101, and then, sorry, this bit, which I skipped over, applies the dot, right?

240
00:16:27,700 --> 00:16:32,700
So it puts the dot in front of it, and then the last step is to just print the representation.

241
00:16:32,700 --> 00:16:41,900
So the binary representation of 0.65 is 0.101.

242
00:16:41,900 --> 00:16:52,500
So here's the code, and we can run it.

243
00:16:52,500 --> 00:17:00,060
So 0.5, the representation is 0.1, 0.625, which is what we had just done.

244
00:17:00,060 --> 00:17:02,500
The representation is 0.101, right?

245
00:17:02,500 --> 00:17:05,180
And we can play around with a bunch of these values.

246
00:17:05,180 --> 00:17:10,900
But then when we do something like 0.1, what is the representation of 0.1?

247
00:17:10,900 --> 00:17:11,980
Right?

248
00:17:11,980 --> 00:17:16,420
Because now we can use this code to get the representation of whatever decimal we'd like.

249
00:17:16,420 --> 00:17:18,380
Point 1 was this troublesome decimal.

250
00:17:18,380 --> 00:17:20,900
So let's see exactly what happened.

251
00:17:20,900 --> 00:17:25,500
Well, it had to do a whole lot of divisions, right?

252
00:17:25,500 --> 00:17:30,619
It had to test a whole bunch of powers of 2 before it actually got to a whole number.

253
00:17:31,619 --> 00:17:32,899
Right?

254
00:17:32,899 --> 00:17:34,699
In fact, about 50 of them.

255
00:17:34,699 --> 00:17:39,259
And we know that because there's about 50 of these 0s and 1s here.

256
00:17:39,259 --> 00:17:45,459
So it was approximately 2 to the power of 50 that it had to multiply 0.1 by before it got to a whole number.

257
00:17:45,460 --> 00:18:05,299
So what that means for us is a number that's kind of a linear combination of powers of 2 is really easy and fast to compute, right?

258
00:18:05,299 --> 00:18:11,180
Something like this one here, 1 times 2 to the negative 3 is 0.001.

259
00:18:11,180 --> 00:18:21,740
But something like 0.1, which isn't as easy to see what the linear combination of all these powers of 2 are, is not so easy to compute, right?

260
00:18:21,740 --> 00:18:25,740
And in fact, we had to use our program to figure out exactly what it is.

261
00:18:25,740 --> 00:18:31,660
And it, for us, it was about 50 of these digits long, which was pretty long, right?

262
00:18:31,660 --> 00:18:36,500
And some of these numbers could be even longer, potentially infinite.

263
00:18:36,500 --> 00:18:41,900
So the point here is that everything in computer memory is represented in terms of bits, right?

264
00:18:41,900 --> 00:18:44,140
0s and 1s.

265
00:18:44,140 --> 00:18:57,339
The reason we went through this whole computation is because there are some numbers that are just going to be way too big to fit inside the computer hardware, inside these representations.

266
00:18:57,339 --> 00:18:59,579
So for integers, it's straightforward to deal with.

267
00:18:59,579 --> 00:19:06,019
We had a really fast way to compute the base to representation.

268
00:19:06,019 --> 00:19:10,059
But for fractions, it's a lot harder and those numbers can be really, really big.

269
00:19:11,220 --> 00:19:14,619
So now how are these numbers actually represented inside computer memory?

270
00:19:14,619 --> 00:19:17,659
So they're actually being represented in two pieces.

271
00:19:18,899 --> 00:19:25,819
One piece is the significant digit and the other piece is the power of 2.

272
00:19:26,539 --> 00:19:37,059
OK, so if we had the representation 1, 1 inside computer memory, basically the significant digit is 1.

273
00:19:37,059 --> 00:19:38,740
And the power of 2 is 1.

274
00:19:38,740 --> 00:19:42,500
So that means we're going to take this 1 dot and give it the power of 2.

275
00:19:42,500 --> 00:19:44,539
So we're going to add a 0 after it.

276
00:19:44,539 --> 00:19:47,220
So this is the binary 2 representation.

277
00:19:47,220 --> 00:19:49,819
We basically just moved the dot from here to here.

278
00:19:49,819 --> 00:19:54,259
And then the number 1, 0 and base 2 is 2.0.

279
00:19:54,259 --> 00:19:55,940
That's what we have on the first line.

280
00:19:55,940 --> 00:20:02,019
1 comma negative 1, that representation means I'm going to take the significant digit 1.

281
00:20:02,019 --> 00:20:04,180
And the power of 2 is negative 1.

282
00:20:04,180 --> 00:20:07,539
So I'm going to take this decimal point and move it to the left one.

283
00:20:07,539 --> 00:20:12,019
So this is going to be 0.1.

284
00:20:12,019 --> 00:20:16,420
That's this number, 0.1, which is 0.5.

285
00:20:16,420 --> 00:20:17,220
This is base 2.

286
00:20:17,220 --> 00:20:19,220
This is base 10.

287
00:20:19,220 --> 00:20:32,900
And just to bring the point home, 125 is going to be 125 as a significant digit and 2 to the negative 2.

288
00:20:32,900 --> 00:20:33,860
How is this going to work?

289
00:20:33,860 --> 00:20:37,460
Well, we're going to take the 125 and convert it to a power of 2.

290
00:20:37,460 --> 00:20:38,860
So what is this?

291
00:20:38,860 --> 00:20:45,059
I'm not going to remember what is 1, 1, 1, 1, 1, 0.

292
00:20:45,059 --> 00:20:49,779
This is what 125 is in base 2.

293
00:20:49,779 --> 00:20:54,619
But the exponent here tells me it's negative 2.

294
00:20:54,619 --> 00:20:58,339
So instead of putting the dot here, I'm going to move it 1, 2 over.

295
00:20:58,339 --> 00:21:01,500
So this is the actual number I'm representing in memory.

296
00:21:01,500 --> 00:21:04,339
And now I can just convert the two pieces separately.

297
00:21:04,339 --> 00:21:08,500
So this is going to be 31 dot, what is this?

298
00:21:08,500 --> 00:21:11,980
2, 5, right?

299
00:21:11,980 --> 00:21:17,339
So this is how computers actually represent numbers inside memory.

300
00:21:17,339 --> 00:21:26,900
And we call this the object type, which is decimal or real number, a float because this decimal point kind of floats around.

301
00:21:26,900 --> 00:21:27,900
OK.

302
00:21:27,900 --> 00:21:33,059
5 or 31.25 for number base 10.

303
00:21:33,059 --> 00:21:35,539
Base 10 is 31.25.

304
00:21:35,539 --> 00:21:39,019
And 125 is how it's represented inside memory.

305
00:21:39,019 --> 00:21:41,940
So it's a base 10 sort of thing.

306
00:21:41,940 --> 00:21:43,339
And then what is the power of 2?

307
00:21:50,539 --> 00:21:51,539
Yeah.

308
00:21:51,539 --> 00:21:53,700
So there's a couple conversions being done here.

309
00:21:53,700 --> 00:21:57,940
We're representing the 125 is base 10.

310
00:21:57,940 --> 00:22:00,420
And how much we need to move the decimal point.

311
00:22:00,420 --> 00:22:07,180
But first, we need to make the conversion of 125 to binary, which is this long thing here, not counting this decimal point.

312
00:22:07,180 --> 00:22:08,299
The negative 2 does this.

313
00:22:08,299 --> 00:22:10,460
We need to move the decimal point over.

314
00:22:10,460 --> 00:22:13,900
And then we have the actual number we're trying to store, right?

315
00:22:13,900 --> 00:22:19,620
And the reason we're doing this is because we're mostly just storing numbers as whole numbers inside the memory.

316
00:22:19,620 --> 00:22:22,580
We're not storing fractions.

317
00:22:22,580 --> 00:22:23,060
Right?

318
00:22:23,060 --> 00:22:24,060
Yeah.

319
00:22:24,060 --> 00:22:30,460
You know, because you want to all that trouble to convert the decimal to, oh, you know, that was for fractions.

320
00:22:30,460 --> 00:22:32,140
Oh, so fractions, exactly.

321
00:22:36,140 --> 00:22:36,740
OK.

322
00:22:36,740 --> 00:22:42,779
So in the end, we did all that because we're trying to figure out the error, right?

323
00:22:42,779 --> 00:22:46,940
Why do we get this error inside our programs?

324
00:22:46,940 --> 00:22:52,420
Well, in the end, it's because computers have a finite number of bits to store data.

325
00:22:52,420 --> 00:22:59,180
Most modern computers maybe have 32, maybe 64 bits to represent significant digits.

326
00:22:59,180 --> 00:23:00,019
Right?

327
00:23:00,019 --> 00:23:05,740
So if we have 32 slots in order to put these significant digits,

328
00:23:05,740 --> 00:23:10,940
if our number base 2 representation was 50 digits long,

329
00:23:10,940 --> 00:23:13,140
then we're going to truncate at 32.

330
00:23:13,140 --> 00:23:16,500
We can't store those extra bits, right?

331
00:23:16,500 --> 00:23:22,700
And so a number like 0.1 ends up actually being an approximation in base 2 inside computer memory.

332
00:23:22,700 --> 00:23:26,579
We're not able to store that number exactly, perfectly.

333
00:23:26,579 --> 00:23:29,099
So it becomes an approximation, right?

334
00:23:29,099 --> 00:23:32,380
And the approximation actually ends up being at the 32nd bit, right?

335
00:23:32,380 --> 00:23:37,460
That either will be 0 or 1, you know, depending on how we decide to truncate.

336
00:23:37,460 --> 00:23:42,580
And so the error is actually 2 to the, 2 to the negative 32, right?

337
00:23:42,580 --> 00:23:48,220
Which is on the order of 2 times 10 to the negative 10, which seems pretty small, right?

338
00:23:48,220 --> 00:23:50,020
It's a very small error.

339
00:23:50,020 --> 00:23:54,700
But we just saw that that error accumulates really, really quickly, right?

340
00:23:54,700 --> 00:24:00,060
So while 0.1 has an error at the 2 to the negative 32 slot,

341
00:24:00,059 --> 00:24:05,859
if we take that error and we just kind of accumulated over 10 increments,

342
00:24:05,859 --> 00:24:08,859
as we had this loop that went through 10 times,

343
00:24:08,859 --> 00:24:12,940
we see that that error ends up becoming a big problem, right?

344
00:24:12,940 --> 00:24:16,700
We see that it actually at the negative 16th slot or something like that.

345
00:24:16,700 --> 00:24:21,539
It, you know, it starts to round to the wrong thing.

346
00:24:21,539 --> 00:24:24,460
And so we see things like this, right?

347
00:24:24,460 --> 00:24:26,859
We expect it to be 1, but it's not 1.

348
00:24:30,460 --> 00:24:35,059
Okay, so the moral of the story is we don't want to use equivalents, right?

349
00:24:35,059 --> 00:24:41,779
The equivalent operator, the equi-equi operator, when we're comparing, comparing floats.

350
00:24:41,779 --> 00:24:44,819
Because of errors like this, the errors can accumulate,

351
00:24:44,819 --> 00:24:49,539
and then we start getting the wrong answer, and then your programs end up not doing what you expect them to do.

352
00:24:49,539 --> 00:24:56,619
Okay, so we always want to test whether some float is within some epsilon of another float.

353
00:24:56,619 --> 00:25:00,259
And so that brings us to the approximation method.

354
00:25:00,259 --> 00:25:05,139
Last lecture, we saw the guess and check method as a really simple algorithm for solving problems.

355
00:25:05,139 --> 00:25:08,139
We have a set number of solutions that we can check,

356
00:25:08,139 --> 00:25:12,459
and then we check each one by one, and then at some point we either find the solution,

357
00:25:12,459 --> 00:25:16,939
or we've checked all that we can check, and we haven't found the solution, right?

358
00:25:16,939 --> 00:25:20,339
It's usually an integer, what we're kind of the things that we're checking,

359
00:25:20,339 --> 00:25:26,259
but as long as you have some finite set of values you can check for a solution through,

360
00:25:26,259 --> 00:25:29,740
guess and check is totally applicable.

361
00:25:29,740 --> 00:25:32,379
But the problem is it's a little bit limiting, right?

362
00:25:32,379 --> 00:25:35,460
It doesn't give us an actual approximation to the square root.

363
00:25:35,460 --> 00:25:44,740
If you remember the code we wrote last time, it didn't actually say I'm approximating the square root of five to be 1.4 something,

364
00:25:44,740 --> 00:25:48,259
or whatever it is, or 2.0 something, right?

365
00:25:48,259 --> 00:25:51,299
It was just able to tell me the square root of a perfect square,

366
00:25:51,299 --> 00:25:55,220
or that the number you gave me is not a perfect square.

367
00:25:55,220 --> 00:25:57,299
And so it's a really limiting algorithm.

368
00:25:57,299 --> 00:25:59,940
But the approximation method, the one we're going to see today,

369
00:25:59,940 --> 00:26:05,019
actually is going to be able to give us an approximation to the square root of any number.

370
00:26:05,019 --> 00:26:10,579
So it's better than guess and check, because we don't just want the correct answer, or nothing.

371
00:26:10,579 --> 00:26:12,940
It's not an all or nothing kind of situation.

372
00:26:12,940 --> 00:26:18,380
It's that we can approximate the answer to some degree.

373
00:26:18,380 --> 00:26:23,860
So we're going to use guess and check when the exact answer that we want might not be accessible, right?

374
00:26:23,859 --> 00:26:27,899
We need some way to find an answer that's just good enough.

375
00:26:27,899 --> 00:26:32,219
And approximation methods will not always, and not usually, actually,

376
00:26:32,219 --> 00:26:35,219
most of the time will not give us the right answer.

377
00:26:35,219 --> 00:26:39,500
They'll usually give us an approximation that's good enough.

378
00:26:39,500 --> 00:26:44,899
And approximation methods, they came about because of the exhaustive enumeration limitation, right?

379
00:26:44,899 --> 00:26:50,259
We're not able to test all the possible values to find exact square root of a number, right?

380
00:26:50,259 --> 00:26:53,299
Because those values are all infinite.

381
00:26:53,299 --> 00:26:59,059
So floating points come into play here, the whole thing we've been talking about at the beginning of this lecture,

382
00:26:59,059 --> 00:27:06,819
and last time, floating points come into play here, because they're very important to this method.

383
00:27:06,819 --> 00:27:12,819
Now that we're comparing floats, we're going to have to be careful about how we actually do the comparison.

384
00:27:13,859 --> 00:27:16,019
So how can we approximate the square root?

385
00:27:16,019 --> 00:27:19,019
Well, instead of looking at just whole numbers and

386
00:27:19,019 --> 00:27:23,139
saying whether we found the root or not, what we're going to do is have smaller

387
00:27:23,140 --> 00:27:28,180
increments. So no longer are we doing just integer guess and check.

388
00:27:28,180 --> 00:27:36,300
We can do point 1, point 2, point 3, point 4, and so on, until we get to a guess that's close enough to x.

389
00:27:36,300 --> 00:27:41,020
Right? So we say that 2.1 or whatever is good enough to the square root of 5.

390
00:27:43,020 --> 00:27:44,660
What does it mean to be good enough?

391
00:27:44,660 --> 00:27:45,340
Right?

392
00:27:45,340 --> 00:27:49,100
Suppose we wanted to find this approximation to the square root, right?

393
00:27:49,099 --> 00:27:53,179
The guess and check was not able to do this for us, but the approximation method can.

394
00:27:54,339 --> 00:28:01,179
So what we're asking for, can we find a root such that that root times itself is equal to x?

395
00:28:01,179 --> 00:28:02,259
Right?

396
00:28:03,379 --> 00:28:08,779
And we're going to do this such that we have a good enough approximation.

397
00:28:08,779 --> 00:28:16,980
So that means that root that we're going to find minus x is going to be less than some epsilon,

398
00:28:16,980 --> 00:28:20,259
or the absolute value of that subtraction is going to be less than epsilon.

399
00:28:20,259 --> 00:28:28,259
Right? So in where we did incremental step by step, we're going to go through as long as we are within,

400
00:28:28,259 --> 00:28:31,259
or until we are within some epsilon of x.

401
00:28:31,259 --> 00:28:35,180
Okay? So the algorithm will be as follows.

402
00:28:35,180 --> 00:28:37,620
We're going to start with a guess that we know is too small.

403
00:28:37,620 --> 00:28:40,860
So for the square root of a number, we'll let's start with zero.

404
00:28:40,860 --> 00:28:43,259
And then we're going to increment it by a really small value.

405
00:28:43,259 --> 00:28:47,299
With guess and check, we incremented it by integers with this particular method.

406
00:28:47,299 --> 00:28:52,779
We can incremented by 0.5 or 0.1 or 0.0001, whatever we'd like.

407
00:28:52,779 --> 00:28:56,099
Okay? That new increment gives us a new guess.

408
00:28:56,099 --> 00:29:01,099
We're going to check whether this new guess is now close enough to x if it is we're good.

409
00:29:01,099 --> 00:29:06,220
And if it's not, we're just going to keep incrementing the guess until we get close enough to the actual answer.

410
00:29:06,220 --> 00:29:08,259
Okay?

411
00:29:08,259 --> 00:29:14,140
So we have two parameters we actually need to set in the approximation algorithm.

412
00:29:14,140 --> 00:29:16,019
The first is an epsilon.

413
00:29:16,019 --> 00:29:17,339
So this is down here.

414
00:29:17,339 --> 00:29:20,460
How close do we want to be to the final answer?

415
00:29:20,460 --> 00:29:21,339
What's the leeway?

416
00:29:21,339 --> 00:29:23,059
We're going to allow.

417
00:29:23,059 --> 00:29:24,420
And second is the increment.

418
00:29:24,420 --> 00:29:28,339
So how much do we want to change our guess by?

419
00:29:29,940 --> 00:29:34,059
The way the algorithm performs depends on the values we choose for these.

420
00:29:34,059 --> 00:29:39,220
Obviously, if our guess is smaller, if we decrease the increment,

421
00:29:39,220 --> 00:29:43,059
we're going to get a much more accurate approximation.

422
00:29:46,019 --> 00:29:50,619
If we increase the epsilon, how close we want to be to x,

423
00:29:50,619 --> 00:29:56,579
our program is going to be a faster because we're going to enter that plus minus epsilon boundary faster.

424
00:29:56,579 --> 00:29:58,819
But it's going to be less accurate.

425
00:29:58,819 --> 00:30:01,859
Because at some point, we're going to enter the boundary and we're going to say good enough.

426
00:30:01,859 --> 00:30:04,699
I'm not going to get any closer to x because there's no need to.

427
00:30:04,699 --> 00:30:06,500
I'm already with an epsilon.

428
00:30:06,500 --> 00:30:11,579
So here, the guess, good enough guess was to the square root of five was one point something.

429
00:30:11,579 --> 00:30:14,899
But on the previous slide, when we had a smaller epsilon,

430
00:30:14,899 --> 00:30:16,740
the good enough guess was two point something.

431
00:30:21,139 --> 00:30:23,500
So the approximation algorithm is like guess and check,

432
00:30:23,500 --> 00:30:25,619
except that we have some small increment.

433
00:30:25,619 --> 00:30:27,539
We change by a small amount.

434
00:30:27,539 --> 00:30:29,259
And we stop when we're close enough.

435
00:30:29,259 --> 00:30:37,980
So we're going to check that the absolute value of this solution minus the actual answer is with an epsilon.

436
00:30:37,980 --> 00:30:45,700
So here's some code where we can implement what finding the square root of a number with approximation method.

437
00:30:47,460 --> 00:30:51,539
We have some stuff here that we're initializing.

438
00:30:51,539 --> 00:30:54,700
So this is the thing you want to find the square root of.

439
00:30:54,700 --> 00:30:57,779
This is how close we want to be to the final answer.

440
00:30:57,779 --> 00:30:59,980
And this is our increment.

441
00:30:59,980 --> 00:31:03,899
Numb guesses is just to keep track of how many actual guesses we're doing.

442
00:31:03,899 --> 00:31:07,259
And we're going to start with a guess that we know is too small.

443
00:31:07,259 --> 00:31:10,339
Zero.

444
00:31:10,339 --> 00:31:15,220
This is the loop that does all of the work for us.

445
00:31:15,220 --> 00:31:21,099
So the way we would say it in English is says basically while our guess is not with an epsilon,

446
00:31:21,099 --> 00:31:23,779
keep making new guesses.

447
00:31:23,779 --> 00:31:28,259
So while what does it mean for the guess to not be within plus or minus epsilon?

448
00:31:28,259 --> 00:31:36,299
Well, the absolute value of our guess squared minus x is greater or equal to epsilon.

449
00:31:36,299 --> 00:31:41,579
So while we're still too far away, let's make a new guess.

450
00:31:41,579 --> 00:31:45,899
So we increment our guess by the increment value.

451
00:31:45,899 --> 00:31:52,740
So originally we were zero, then we're 0.001, then we're going to be 0.002, and so on.

452
00:31:53,700 --> 00:31:59,660
This numb guesses, again, it's just for us to keep track of how many times we've actually gone through this loop.

453
00:31:59,660 --> 00:32:01,940
And at the end, we can print how many guesses we've done.

454
00:32:07,660 --> 00:32:09,500
Okay, so here's the code.

455
00:32:11,740 --> 00:32:13,779
And 36, so we could run it.

456
00:32:13,779 --> 00:32:14,620
What do we see?

457
00:32:16,059 --> 00:32:19,620
Here's our approximation to the square root of 36.

458
00:32:19,619 --> 00:32:27,699
Now we know it's 6, and of course if we kept going, we could have found probably exactly 6.

459
00:32:27,699 --> 00:32:33,379
But notice this approximation algorithm stops as soon as you enter that plus minus epsilon boundary.

460
00:32:34,699 --> 00:32:35,219
Yes.

461
00:32:35,219 --> 00:32:38,979
Do four loops always increase in integer amounts?

462
00:32:38,979 --> 00:32:41,139
Do four loops always increase in integer amounts?

463
00:32:41,139 --> 00:32:45,299
Yes, the step has to be an integer, positive or negative, yeah.

464
00:32:45,299 --> 00:32:47,539
So exactly a four loop would not have worked here, right?

465
00:32:47,539 --> 00:32:48,539
Yeah.

466
00:32:49,539 --> 00:32:56,619
Right, so here we stopped this algorithm as soon as we entered that plus minus boundary of epsilon, right?

467
00:32:56,619 --> 00:33:02,099
And so 5.9991 is close enough to square root of 6, and that's what we're reporting.

468
00:33:02,099 --> 00:33:11,259
The number of guesses here was about 59992000, and that's makes sense because our increment is 0.001,

469
00:33:11,259 --> 00:33:14,579
and we went all the way up to 5.99, right?

470
00:33:14,579 --> 00:33:18,500
So with each time through the loop, we incremented 5.001, so that's just

471
00:33:18,500 --> 00:33:20,539
this times 10,000.

472
00:33:20,539 --> 00:33:22,500
Okay, that makes sense.

473
00:33:22,500 --> 00:33:27,779
So let's try it with a couple other values, so here it is with 24, right?

474
00:33:27,779 --> 00:33:28,779
4.89.

475
00:33:28,779 --> 00:33:33,420
Again, we're seeing these floating point errors pop into play, right?

476
00:33:33,420 --> 00:33:37,819
Whenever we see this weird like 0.00000 and some small amount at the end,

477
00:33:37,819 --> 00:33:43,019
that's these floating point errors, just given the numbers we're working with, adding up.

478
00:33:43,019 --> 00:33:46,660
Here's the square root of 2, right?

479
00:33:46,660 --> 00:33:55,740
1.41 again, floating point error, but this time on the other side, 0.999912345, run it.

480
00:33:55,740 --> 00:33:56,940
It took a second, right?

481
00:33:56,940 --> 00:34:01,580
There was a little pause, and then it gave us the answer just because it has to loop through

482
00:34:01,580 --> 00:34:06,300
about what is this 100123, 1 million times, right?

483
00:34:06,300 --> 00:34:10,539
So did that loop 1 million times to get us the answer?

484
00:34:10,539 --> 00:34:15,019
And then we can try one more, 5, 4, 3, 2, 1.

485
00:34:15,019 --> 00:34:17,300
This should take about 5 times as long, right?

486
00:34:17,300 --> 00:34:24,259
Because 1,200, 12,345 took about 1 second.

487
00:34:24,259 --> 00:34:30,059
This one should take about 5 seconds, but it's not.

488
00:34:30,059 --> 00:34:35,259
I'm pretty sure I was talking for more than 5 seconds, and this program is not ending.

489
00:34:35,259 --> 00:34:36,940
So something's gone wrong.

490
00:34:36,940 --> 00:34:38,099
I'm going to stop it.

491
00:34:38,099 --> 00:34:43,259
Remember, you can stop it by clicking the shell, hitting Ctrl C, or the little square

492
00:34:43,260 --> 00:34:47,100
here in the corner.

493
00:34:47,100 --> 00:34:51,100
So what went wrong?

494
00:34:51,100 --> 00:34:51,900
Oh, yes.

495
00:34:51,900 --> 00:34:54,580
My question is, will this loop always terminate?

496
00:34:54,580 --> 00:35:00,420
And 5, 4, 3, 2, 1 was an example of the loop not terminating.

497
00:35:00,420 --> 00:35:02,260
So what happened, right?

498
00:35:02,260 --> 00:35:04,420
We did all this.

499
00:35:04,420 --> 00:35:08,580
Let's try to debug what exactly happened, because clearly what we have in code right now

500
00:35:08,580 --> 00:35:11,300
is not really giving us much information.

501
00:35:11,300 --> 00:35:14,500
So let's add some print statements.

502
00:35:14,500 --> 00:35:16,820
The print statements I'm adding is just in here.

503
00:35:16,820 --> 00:35:20,940
So everything else that's not boxed is the same as on the previous slide.

504
00:35:20,940 --> 00:35:26,260
The only thing I'm adding new is this if statement here.

505
00:35:26,260 --> 00:35:35,780
So every 100,000 guesses, so every time I've gone through this loop 100,000 times, I'm

506
00:35:35,780 --> 00:35:40,900
going to print what the current guess is and what the guess squared minus x is.

507
00:35:40,900 --> 00:35:43,500
So how far away I am from x?

508
00:35:43,500 --> 00:35:44,500
The epsilon.

509
00:35:44,500 --> 00:35:49,660
Not the epsilon, but how far away I am from x.

510
00:35:49,660 --> 00:35:55,220
So let's run that code.

511
00:35:55,220 --> 00:35:56,460
It's down here.

512
00:35:56,460 --> 00:36:00,340
I added a little bit of extra thing, which is just, it's not printing the whole time.

513
00:36:00,340 --> 00:36:03,860
It's just going to pause for me just to talk about what's going on.

514
00:36:03,860 --> 00:36:06,980
So here I have the code run.

515
00:36:06,980 --> 00:36:07,980
Has run.

516
00:36:07,980 --> 00:36:14,059
My first 100,000 times through the loop I have my guess being about 10.

517
00:36:14,059 --> 00:36:17,900
And how far I am from x is about 54,000.

518
00:36:17,900 --> 00:36:21,500
So I want to be 0.01 away from x, right?

519
00:36:21,500 --> 00:36:23,260
Because that's what my epsilon is.

520
00:36:23,260 --> 00:36:25,940
And so here I'm 54,000 away from x.

521
00:36:25,940 --> 00:36:28,699
So clearly that's too much.

522
00:36:28,699 --> 00:36:30,740
Okay?

523
00:36:30,740 --> 00:36:31,740
Let's continue.

524
00:36:31,740 --> 00:36:33,500
So then we make more guesses.

525
00:36:33,500 --> 00:36:39,860
And then here, when my guess is 100, I am about 44,000 away from x from 54.

526
00:36:39,860 --> 00:36:41,900
So looking good.

527
00:36:41,900 --> 00:36:42,900
What's continue?

528
00:36:42,900 --> 00:36:46,820
So with 120, I'm 39,000 away from x.

529
00:36:46,820 --> 00:36:50,659
With 200, I'm 14,000 away from x.

530
00:36:50,659 --> 00:36:52,219
So it's looking much better, right?

531
00:36:52,219 --> 00:36:59,860
I'm getting closer and closer to getting that difference being 0 or 0.01.

532
00:36:59,860 --> 00:37:01,019
Continue.

533
00:37:01,019 --> 00:37:03,460
With 210, I'm 10,000 away from x.

534
00:37:03,460 --> 00:37:05,500
And then I'm almost 6,000 away from x.

535
00:37:05,500 --> 00:37:08,780
And then I'm 1,000 away from x.

536
00:37:08,780 --> 00:37:15,860
And then from 230, as my guess, which brought me 1,400 away from x,

537
00:37:15,860 --> 00:37:22,980
the next time I have 240, the next printout I have, brings me to 3,000 away from x.

538
00:37:22,980 --> 00:37:27,780
So I was 1,000, but now I'm 3,000.

539
00:37:27,780 --> 00:37:30,699
And then from there on, things break down really quickly.

540
00:37:30,699 --> 00:37:35,139
Because I just get now farther and farther away from x.

541
00:37:35,139 --> 00:37:37,859
So here I am continuing the program for a little bit.

542
00:37:37,859 --> 00:37:42,460
And then I just keep making guesses, because I was never within that epsilon.

543
00:37:42,460 --> 00:37:44,059
So here's 500.

544
00:37:44,059 --> 00:37:47,379
And now I'm almost 200,000 away from x.

545
00:37:47,379 --> 00:37:48,659
And so now you see what's happening.

546
00:37:48,659 --> 00:37:55,419
This program is just going to keep getting further and further away from where I need to be.

547
00:37:55,419 --> 00:37:59,460
So let's visualize what exactly happened.

548
00:37:59,460 --> 00:38:04,980
This is our x, 5,454,321.

549
00:38:04,980 --> 00:38:06,179
And this is our epsilon.

550
00:38:06,179 --> 00:38:08,380
Let's say it's 0.01.

551
00:38:08,380 --> 00:38:10,460
Obviously not to scale.

552
00:38:10,460 --> 00:38:12,940
Blue is going to be representing one guess.

553
00:38:12,940 --> 00:38:14,500
So here's a guess.

554
00:38:14,500 --> 00:38:18,179
And then we have the guess squared, a green.

555
00:38:18,179 --> 00:38:21,619
So let's just for visualization purposes, let's say this is our guess.

556
00:38:21,619 --> 00:38:23,260
And this is our guess squared.

557
00:38:23,260 --> 00:38:25,179
OK, we're far away from x.

558
00:38:25,179 --> 00:38:28,300
We're definitely outside the epsilon boundary.

559
00:38:28,300 --> 00:38:31,300
We make another guess by incrementing it a little bit.

560
00:38:31,300 --> 00:38:33,420
This is the guess squared.

561
00:38:33,420 --> 00:38:36,940
We make another guess by incrementing it a little bit, because we're still far away from

562
00:38:36,940 --> 00:38:38,260
that plus minus epsilon.

563
00:38:38,260 --> 00:38:40,460
This is our guess squared.

564
00:38:40,460 --> 00:38:41,980
We make another guess.

565
00:38:41,980 --> 00:38:43,060
This is our guess squared.

566
00:38:43,060 --> 00:38:46,700
We're pretty darn close to that plus minus epsilon boundary.

567
00:38:46,700 --> 00:38:50,539
We want to be within that plus minus epsilon.

568
00:38:50,539 --> 00:38:53,500
So one more guess should make it right.

569
00:38:53,500 --> 00:38:55,820
This is our next guess.

570
00:38:55,820 --> 00:39:00,539
But now the guess squared is on the other side.

571
00:39:00,539 --> 00:39:03,860
This is the big reveal, guys.

572
00:39:03,860 --> 00:39:06,300
So what happens now?

573
00:39:06,300 --> 00:39:10,539
The program says, keep guessing, because we're not within epsilon.

574
00:39:10,539 --> 00:39:15,580
So it's going to make another guess squared.

575
00:39:15,580 --> 00:39:18,220
And it's just going to keep guessing.

576
00:39:18,220 --> 00:39:21,660
And then our guess squared is just going to keep getting bigger and bigger.

577
00:39:21,660 --> 00:39:24,140
So we basically overshot the epsilon.

578
00:39:24,139 --> 00:39:33,579
We've overshot our little plus minus boundary that we were interested in being within.

579
00:39:33,579 --> 00:39:36,259
We didn't account for that when we wrote the loop.

580
00:39:36,259 --> 00:39:40,339
All we wanted to do was be within epsilon and our program would end.

581
00:39:40,339 --> 00:39:43,059
So let's fix that.

582
00:39:43,059 --> 00:39:45,699
One addition will fix that.

583
00:39:45,699 --> 00:39:50,179
And it's something that we had been doing in guess and check anyway.

584
00:39:50,179 --> 00:39:56,259
In guess and check, we would say something like, if we've passed the reasonable guess,

585
00:39:56,259 --> 00:40:01,139
when we know that guess squared from here on out is definitely too big, just stop.

586
00:40:01,139 --> 00:40:02,259
Stop guessing.

587
00:40:02,259 --> 00:40:03,619
Just to stop.

588
00:40:03,619 --> 00:40:08,259
And so we can add that same thing here as just another ending condition.

589
00:40:08,259 --> 00:40:12,579
So everything in this code is the same as before except for this red box.

590
00:40:12,579 --> 00:40:19,980
We're adding another stopping condition that basically says, keep guessing while we

591
00:40:19,980 --> 00:40:23,860
are still guessing something reasonable.

592
00:40:23,860 --> 00:40:28,260
But when we've guessed something that's not reasonable, which is when the guess squared

593
00:40:28,260 --> 00:40:31,740
is greater than x, we've way past it.

594
00:40:31,740 --> 00:40:33,500
Stop guessing as well.

595
00:40:33,500 --> 00:40:38,940
So whichever one of these conditions, either this one or this one being within epsilon

596
00:40:38,940 --> 00:40:41,980
is true, we break out of the loop.

597
00:40:41,980 --> 00:40:46,860
And then we have an if else, kind of the same sort of thing we've been doing so far in

598
00:40:46,860 --> 00:40:47,980
the guess and check.

599
00:40:47,980 --> 00:40:49,900
Why did we break the loop?

600
00:40:49,900 --> 00:40:54,380
Did we break it because we were within epsilon?

601
00:40:54,380 --> 00:40:57,500
That is the else clause here.

602
00:40:57,500 --> 00:41:00,500
If we did, then we say this is close to the square root of x.

603
00:41:00,500 --> 00:41:06,380
But if we broke it because we've passed reasonable number of guesses, then we know we failed

604
00:41:06,380 --> 00:41:08,220
to find the square root.

605
00:41:08,220 --> 00:41:12,180
Because we overshot the mark or whatever.

606
00:41:12,180 --> 00:41:17,579
So here is the code with 5, 4, 3, 2, 1.

607
00:41:17,579 --> 00:41:23,779
But now we have that extra condition here, guess squared less than x.

608
00:41:23,779 --> 00:41:28,500
So we see that we've done some number of guesses, right?

609
00:41:28,500 --> 00:41:31,299
2,300,000.

610
00:41:31,299 --> 00:41:34,860
And the message we get is we fail to find the square root.

611
00:41:34,860 --> 00:41:35,860
Makes sense, right?

612
00:41:35,860 --> 00:41:37,900
Because we knew we would fail.

613
00:41:37,900 --> 00:41:42,139
And we're also reporting what the last guess was and the last guess squared, just in case

614
00:41:42,139 --> 00:41:45,980
the user wants to use that information for anything.

615
00:41:45,980 --> 00:41:47,860
What are some solutions to fix this, right?

616
00:41:47,860 --> 00:41:51,980
If we don't want to fail, what are what can we do?

617
00:41:51,980 --> 00:41:53,579
Well, I gave you a hint right here.

618
00:41:53,579 --> 00:41:58,980
We can decrease our increment.

619
00:41:58,980 --> 00:42:07,179
If instead of adding .0001 every time through the loop, let's add .0001.

620
00:42:07,179 --> 00:42:12,099
So let's make it guess 10 times as many guesses.

621
00:42:12,099 --> 00:42:15,500
We're going to have to wait a little bit, maybe about 10 seconds.

622
00:42:15,500 --> 00:42:16,980
But the program will end.

623
00:42:16,980 --> 00:42:20,820
It's taking this long, obviously, because it's making all of these extra guesses, right?

624
00:42:20,820 --> 00:42:25,260
For every one guess we had with the program that failed, we're now making 10 guesses, right?

625
00:42:25,260 --> 00:42:28,059
Because we decreased our increment by 10.

626
00:42:28,059 --> 00:42:30,300
Okay, so it ended.

627
00:42:30,300 --> 00:42:33,260
And we see exactly that idea and the number of guesses.

628
00:42:33,260 --> 00:42:38,579
So here we had 2.3 million guesses when our increment was .0001.

629
00:42:38,579 --> 00:42:44,820
But when our increment was .0001, right, 4 zeros, we had 23 million guesses.

630
00:42:44,820 --> 00:42:49,820
And obviously we had 10 times as many guesses, which made our program be 10 times as slow.

631
00:42:49,820 --> 00:42:57,380
But now we didn't fail because we were able to go within that epsilon.

632
00:42:57,380 --> 00:43:05,220
So we found that 233.068.64, which is pretty close to what we had before, is within .01

633
00:43:05,220 --> 00:43:07,220
of epsilon.

634
00:43:07,220 --> 00:43:13,260
Right, so with approximation methods, it's possible to overshoot the epsilon, right?

635
00:43:13,260 --> 00:43:17,980
We have to be a little bit more careful now about what our end condition is.

636
00:43:17,980 --> 00:43:21,820
Yes, we can check that we are with an epsilon, but we have to also use a little bit of common

637
00:43:21,820 --> 00:43:25,900
sense, maybe algebra something like that, to figure out is there a way we can overshoot

638
00:43:25,900 --> 00:43:27,500
the epsilon?

639
00:43:27,500 --> 00:43:32,500
And how else can we stop the program without it running into an infinite loop, right?

640
00:43:32,500 --> 00:43:35,300
Because that would be bad.

641
00:43:35,300 --> 00:43:37,860
So I think I already went over this, right?

642
00:43:37,860 --> 00:43:41,020
What are some observations about running it?

643
00:43:41,019 --> 00:43:46,699
Yes, it reported failure, so we reset the increment down to 10 times smaller than what it

644
00:43:46,699 --> 00:43:47,940
was before.

645
00:43:47,940 --> 00:43:54,219
The program was slower because we had more values to check through.

646
00:43:54,219 --> 00:43:57,219
So the big idea here is we want to be careful when comparing floats.

647
00:43:57,219 --> 00:44:02,699
If we were using something like equal equal sign, right, that would have been a complete disaster.

648
00:44:02,699 --> 00:44:07,219
We might have never been with an epsilon or something like that.

649
00:44:07,219 --> 00:44:08,219
Okay.

650
00:44:08,939 --> 00:44:12,459
Yes, so what are some lessons we learned in approximation?

651
00:44:12,459 --> 00:44:16,259
Right, so we can't use double equal sign to check for exit conditions.

652
00:44:16,259 --> 00:44:23,259
We always have to check whether we are within plus or minus some epsilon of the actual answer.

653
00:44:23,259 --> 00:44:29,459
We have to be careful that the exit condition being plus or minus within some epsilon doesn't

654
00:44:29,459 --> 00:44:32,500
jump over our exit test as we just saw, right?

655
00:44:32,500 --> 00:44:35,579
In that case, we add some extra condition.

656
00:44:35,579 --> 00:44:38,059
And then we saw that we actually have a trade off, right?

657
00:44:38,059 --> 00:44:42,659
We can have a program that does terminate and reports a correct answer, right?

658
00:44:42,659 --> 00:44:45,940
It doesn't say we failed, but it does report a correct answer.

659
00:44:45,940 --> 00:44:49,340
But that could be a program that's a lot slower, right?

660
00:44:49,340 --> 00:44:54,619
It's a lot slower because we had to decrease our increment.

661
00:44:54,619 --> 00:44:57,779
Alternatively, we could have increased our epsilon boundary, right?

662
00:44:57,779 --> 00:45:02,500
Our plus minus epsilon that we allowed to be within could have been bigger, but then we

663
00:45:02,500 --> 00:45:04,539
would give up on some accuracy as well.

664
00:45:04,539 --> 00:45:10,739
So there's always this trade off of speed versus accuracy to get the program to actually

665
00:45:10,739 --> 00:45:12,739
give you an answer or to do what you'd like, right?

666
00:45:12,739 --> 00:45:18,219
And depending on the application, you might want accuracy versus speed or vice versa.

667
00:45:18,219 --> 00:45:20,219
Okay.

668
00:45:20,219 --> 00:45:25,940
So this approximation algorithm is really slow, right?

669
00:45:25,940 --> 00:45:34,139
To get an answer for the square root of 54,321, we had to decrease our increment to something

670
00:45:34,139 --> 00:45:37,420
like 0.0001.

671
00:45:37,420 --> 00:45:42,379
And we ran it and that program took maybe 10 seconds to run, right, on my computer, because

672
00:45:42,379 --> 00:45:47,739
we started from zero and we were just painfully incrementing that increment one at a time,

673
00:45:47,739 --> 00:45:53,940
even though we knew sort of from what the number actually was, 554,000, that the square root

674
00:45:53,940 --> 00:45:56,500
of it could not really be that low.

675
00:45:56,500 --> 00:45:58,139
But that's just the algorithm we had, right?

676
00:45:58,139 --> 00:46:03,179
We had to start from something zero just in case the user gave it other numbers, which,

677
00:46:03,179 --> 00:46:06,219
you know, didn't make sense to start higher than that.

678
00:46:06,219 --> 00:46:09,339
And so the approximation algorithm, as you saw, can be really slow.

679
00:46:09,339 --> 00:46:14,019
The question I have is, is there a faster way that still gets good answers?

680
00:46:14,019 --> 00:46:16,259
And the answer, of course, is yes.

681
00:46:16,259 --> 00:46:22,099
And we're going to see this particular, this algorithm in the next lecture.

682
00:46:22,099 --> 00:46:25,059
So in quick summary, we saw floating points.

683
00:46:25,059 --> 00:46:27,339
We did a lot of calculations with binary numbers.

684
00:46:27,339 --> 00:46:29,219
You don't need to know how to do those calculations.

685
00:46:29,219 --> 00:46:35,139
But again, given a recipe or an algorithm, can you take that and put it into code, right?

686
00:46:35,139 --> 00:46:38,859
Floating point numbers introduced a little bit of challenge for us in comparing them because

687
00:46:38,859 --> 00:46:40,939
of the way they're stored in memory.

688
00:46:40,939 --> 00:46:46,899
We can't represent some of these numbers exactly in memory, so that's a problem.

689
00:46:46,899 --> 00:46:51,019
Because they're not represented exactly in memory, we might magnify some errors, right,

690
00:46:51,019 --> 00:46:53,019
as we saw with that loop.

691
00:46:53,019 --> 00:46:56,859
And the approximation methods use floats, unfortunately, or fortunately, right?

692
00:46:56,860 --> 00:47:00,820
They need to use floats because we need to have a small increment, and we have to be mindful

693
00:47:00,820 --> 00:47:03,620
of these issues when using them.

