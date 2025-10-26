---
title: MIT6042J P261101RecursiveDataVideo
---

1
00:00:00,000 --> 00:00:08,240
Recursive data play a key role in programming.

2
00:00:08,240 --> 00:00:12,640
So let's take a mathematical look at what goes on.

3
00:00:12,640 --> 00:00:15,359
So the basic idea of recursive data is roughly

4
00:00:15,359 --> 00:00:17,879
that you're going to define a class of objects

5
00:00:17,879 --> 00:00:23,400
in terms of the simpler versions of the same object.

6
00:00:23,400 --> 00:00:26,719
A little bit more precise with a little more precision.

7
00:00:26,719 --> 00:00:29,879
What we can, the idea is that you can build up a recursive data

8
00:00:29,879 --> 00:00:32,039
type by starting with some stuff that you understand

9
00:00:32,039 --> 00:00:33,359
that's not recursive.

10
00:00:33,359 --> 00:00:37,039
And you give me some base objects that I can begin with

11
00:00:37,039 --> 00:00:40,320
and declare that they belong to this recursive data.

12
00:00:40,320 --> 00:00:44,039
And then you give me some rules called constructor rules,

13
00:00:44,039 --> 00:00:48,439
which enable me to build new objects of the recursive type

14
00:00:48,439 --> 00:00:50,840
by applying these constructors to objects

15
00:00:50,840 --> 00:00:52,200
that I've already built up.

16
00:00:52,200 --> 00:00:54,200
There's nothing circular about it because I'm always

17
00:00:54,200 --> 00:00:57,679
building up new stuff from stuff I already have.

18
00:00:57,679 --> 00:00:59,280
Let's look at an example.

19
00:00:59,280 --> 00:01:01,600
I'm going to define a set E that's

20
00:01:01,600 --> 00:01:02,880
a subset of the integers.

21
00:01:02,880 --> 00:01:06,840
And I'm going to give you a recursive definition of E.

22
00:01:06,840 --> 00:01:10,480
The base case is that I'm going to tell you the 0's in E.

23
00:01:10,480 --> 00:01:12,719
And I'm going to give you two constructors.

24
00:01:12,719 --> 00:01:15,840
The first one says that if you have an N that's in E,

25
00:01:15,840 --> 00:01:19,359
you can add two to it and get a new element in E, providing

26
00:01:19,359 --> 00:01:21,280
that N is non-negative.

27
00:01:21,280 --> 00:01:24,200
The second constructor is that if you have an N that's

28
00:01:24,200 --> 00:01:25,319
in E, you can negate it.

29
00:01:25,319 --> 00:01:29,240
You can take minus N, providing that N is positive.

30
00:01:29,640 --> 00:01:31,119
And those are the two constructor rules.

31
00:01:31,119 --> 00:01:32,959
Well, let's look at what goes on here.

32
00:01:32,959 --> 00:01:34,640
What is this telling us?

33
00:01:34,640 --> 00:01:36,919
Well, let's just use the first constructor rule

34
00:01:36,919 --> 00:01:38,479
and use it repeatedly.

35
00:01:38,479 --> 00:01:39,519
I can start off with 0.

36
00:01:39,519 --> 00:01:40,399
That's the base case.

37
00:01:40,399 --> 00:01:43,280
And then I can apply the constructor to add two to it.

38
00:01:43,280 --> 00:01:49,879
Then I can apply the constructor again to add two to 0 plus 2.

39
00:01:49,879 --> 00:01:51,679
And then I can apply it a third time

40
00:01:51,679 --> 00:01:54,280
to get add two to 0 plus 2 plus 2.

41
00:01:54,280 --> 00:01:57,560
And it's clear what I'm getting is 0, 2, 4, 6, and so on.

42
00:01:57,560 --> 00:02:01,040
And I'm going to get all of the non-negative even numbers

43
00:02:01,040 --> 00:02:02,680
in that way.

44
00:02:02,680 --> 00:02:03,400
OK.

45
00:02:03,400 --> 00:02:07,240
Now I can apply to these positive numbers.

46
00:02:07,240 --> 00:02:09,920
I can apply the negation constructor

47
00:02:09,920 --> 00:02:12,879
so I can get minus 2 minus 4 minus 6.

48
00:02:12,879 --> 00:02:18,080
And it becomes apparent then that I can get all of the even numbers.

49
00:02:18,080 --> 00:02:20,120
OK.

50
00:02:20,120 --> 00:02:23,840
So we just figured out that E contains the even numbers.

51
00:02:23,840 --> 00:02:25,800
Is there anything else in E?

52
00:02:25,800 --> 00:02:28,240
And the answer is no.

53
00:02:28,240 --> 00:02:31,280
And the reason is that a part of an implicit part

54
00:02:31,280 --> 00:02:33,960
of the understanding of a definition like this

55
00:02:33,960 --> 00:02:38,520
is that the only way that things can get into E

56
00:02:38,520 --> 00:02:41,000
is by being a base case or by being

57
00:02:41,000 --> 00:02:44,280
constructed from previously constructed elements

58
00:02:44,280 --> 00:02:45,720
by applying the constructor rules.

59
00:02:45,720 --> 00:02:48,480
In other words, there's an implicit clause here that says,

60
00:02:48,480 --> 00:02:49,720
that's all.

61
00:02:49,720 --> 00:02:52,760
That implicit clause is called the extremal clause.

62
00:02:52,759 --> 00:02:56,399
And it's taken for granted and rarely mentioned explicitly

63
00:02:56,399 --> 00:02:58,199
as part of a recursive definition,

64
00:02:58,199 --> 00:03:00,959
but it's always to be understood.

65
00:03:00,959 --> 00:03:02,679
OK.

66
00:03:02,679 --> 00:03:05,439
So what we can conclude from this is that E

67
00:03:05,439 --> 00:03:07,439
is exactly the even integers because there's

68
00:03:07,439 --> 00:03:10,519
nothing else there except the ones that were built up

69
00:03:10,519 --> 00:03:12,680
in the way indicated.

70
00:03:12,680 --> 00:03:16,120
So let's look at a slightly more interesting example now.

71
00:03:16,120 --> 00:03:18,280
I want to define the set of strings that

72
00:03:18,280 --> 00:03:22,000
consists solely of left and right parentheses,

73
00:03:22,000 --> 00:03:24,639
and such that the left and right parentheses match up.

74
00:03:24,639 --> 00:03:26,479
Well, writing parentheses on this slide

75
00:03:26,479 --> 00:03:29,159
turns out to be confusing with parentheses that

76
00:03:29,159 --> 00:03:30,560
are actually used to the limit things.

77
00:03:30,560 --> 00:03:35,120
So I'm going to replace parentheses by brackets in blue,

78
00:03:35,120 --> 00:03:37,599
right bracket, and a left bracket.

79
00:03:37,599 --> 00:03:39,960
This notation here, by the way, stands

80
00:03:39,960 --> 00:03:45,080
for the set of finite strings of right and left brackets.

81
00:03:45,080 --> 00:03:46,319
It's a general notation.

82
00:03:46,319 --> 00:03:48,719
If you have some collection of objects, which you think of as

83
00:03:48,719 --> 00:03:51,960
letters, and you write an asterisk as a superscript,

84
00:03:52,000 --> 00:03:55,920
that means the finite strings of those letters.

85
00:03:55,920 --> 00:04:00,400
So these are the finite strings of right and left brackets.

86
00:04:00,400 --> 00:04:03,719
And I want to give a recursive definition of a set M, which

87
00:04:03,719 --> 00:04:07,879
I plan will be precisely those strings where the left

88
00:04:07,879 --> 00:04:10,920
and right brackets match up appropriately.

89
00:04:10,920 --> 00:04:12,240
The way to think about matching up

90
00:04:12,240 --> 00:04:15,600
is take a standard arithmetic expression

91
00:04:15,600 --> 00:04:17,439
involving plus and times and so on,

92
00:04:17,439 --> 00:04:19,560
and make sure that it's fully parenthesis.

93
00:04:19,560 --> 00:04:20,800
So whenever you add two things, there's

94
00:04:20,800 --> 00:04:22,000
parentheses around that.

95
00:04:22,000 --> 00:04:23,560
And when you have to multiply two things,

96
00:04:23,560 --> 00:04:28,120
there's parentheses around that, meaning brackets.

97
00:04:28,120 --> 00:04:31,480
Then if you erased everything but the brackets,

98
00:04:31,480 --> 00:04:34,720
what you'd be left with would be a set of matched brackets.

99
00:04:34,720 --> 00:04:37,480
Actually, it would be a set of matched brackets,

100
00:04:37,480 --> 00:04:39,600
or you could have several of them next to each other.

101
00:04:39,600 --> 00:04:42,079
Those would still be considered matched.

102
00:04:42,079 --> 00:04:44,519
So that's the way our definition is going to behave.

103
00:04:44,519 --> 00:04:46,920
Let's give it.

104
00:04:46,920 --> 00:04:49,199
So the base case is about the simplest

105
00:04:49,199 --> 00:04:51,680
could be I'm going to start with the empty string.

106
00:04:51,680 --> 00:04:54,279
The empty string is this thing that acts like a zero

107
00:04:54,279 --> 00:04:56,279
under putting strings next to each other,

108
00:04:56,279 --> 00:04:58,079
or the concatenation operation.

109
00:04:58,079 --> 00:05:01,439
If you concatenate the empty string with any string,

110
00:05:01,439 --> 00:05:04,159
it doesn't change the string.

111
00:05:04,159 --> 00:05:06,079
And by definition, then the empty string

112
00:05:06,079 --> 00:05:08,719
is a string with no characters has length 0.

113
00:05:08,719 --> 00:05:12,599
And it acts as an identity under putting strings next

114
00:05:12,599 --> 00:05:13,639
to each other.

115
00:05:13,639 --> 00:05:14,719
OK.

116
00:05:14,719 --> 00:05:18,319
There's going to be one constructor in M that's slightly

117
00:05:18,319 --> 00:05:19,040
ingenious.

118
00:05:19,040 --> 00:05:22,000
There's other, maybe simpler or more natural ways

119
00:05:22,000 --> 00:05:24,560
to make up constructors that would define M.

120
00:05:24,560 --> 00:05:26,040
But this one is particularly nice,

121
00:05:26,040 --> 00:05:27,599
because I can get away with just one,

122
00:05:27,599 --> 00:05:30,600
and it has some nice properties that we'll explore later.

123
00:05:30,600 --> 00:05:32,000
So here's the rule.

124
00:05:32,000 --> 00:05:34,839
If I've built up two strings, S and T,

125
00:05:34,839 --> 00:05:37,480
of matched brackets that are in M,

126
00:05:37,480 --> 00:05:42,000
then I can build a new one by putting matched brackets around S

127
00:05:42,000 --> 00:05:44,680
and concatenating it with T. That is,

128
00:05:44,680 --> 00:05:48,120
if S and T are strings of brackets in M,

129
00:05:48,120 --> 00:05:50,560
then if I start with a left bracket,

130
00:05:50,560 --> 00:05:54,040
followed by the brackets in S, followed by a right bracket,

131
00:05:54,040 --> 00:05:58,000
followed by the brackets in T, that new string

132
00:05:58,000 --> 00:06:02,480
is yet another element that I've built up in M.

133
00:06:02,480 --> 00:06:04,720
Let's practice this to see how it works.

134
00:06:04,720 --> 00:06:06,879
So there's the constructor again.

135
00:06:06,879 --> 00:06:08,560
Well, how do I get started?

136
00:06:08,560 --> 00:06:10,840
To start, all I have is the base case.

137
00:06:10,840 --> 00:06:12,639
S and T have to both be the empty string,

138
00:06:12,639 --> 00:06:14,160
because that's the only thing I can apply,

139
00:06:14,160 --> 00:06:16,759
the only thing available to apply the constructor to.

140
00:06:16,759 --> 00:06:19,120
So if I do that, basically, the S and the T

141
00:06:19,120 --> 00:06:22,039
disappear in this constructor expression,

142
00:06:22,039 --> 00:06:27,279
and all I'm left with is a matching left and right bracket.

143
00:06:27,279 --> 00:06:28,279
All right.

144
00:06:28,279 --> 00:06:30,719
But now I've got a matching left and right bracket,

145
00:06:30,719 --> 00:06:33,959
so I can use that to apply the constructor to,

146
00:06:33,959 --> 00:06:37,279
so I could let S be the matching brackets,

147
00:06:37,279 --> 00:06:39,599
and T still be the empty string.

148
00:06:39,599 --> 00:06:41,719
Now, when I plug into the constructor,

149
00:06:41,719 --> 00:06:46,719
the T still disappears, but I find brackets within brackets.

150
00:06:46,720 --> 00:06:49,480
And that's another string that I've built up in M.

151
00:06:49,480 --> 00:06:51,440
Now, I could also be being methodical.

152
00:06:51,440 --> 00:06:54,240
I could let S be empty and T be the brackets.

153
00:06:54,240 --> 00:06:56,600
And if I do that, then the S goes away,

154
00:06:56,600 --> 00:06:59,120
and the T becomes the matched pair of brackets,

155
00:06:59,120 --> 00:07:03,600
and I wind up with a matched pair next to a matched pair.

156
00:07:03,600 --> 00:07:05,600
Then, of course, I could let both of them

157
00:07:05,600 --> 00:07:09,080
be the matched brackets, and then I get a matched going back

158
00:07:09,080 --> 00:07:09,800
to the very beginning.

159
00:07:09,800 --> 00:07:11,600
The next most complicated string that I had

160
00:07:11,600 --> 00:07:15,320
was the nested pair of brackets.

161
00:07:15,319 --> 00:07:17,480
I could let S be that and T be empty,

162
00:07:17,480 --> 00:07:21,079
and then I would get brackets nested to depth three,

163
00:07:21,079 --> 00:07:21,920
and so on.

164
00:07:21,920 --> 00:07:22,719
That's the idea.

165
00:07:25,719 --> 00:07:26,439
All right.

166
00:07:26,439 --> 00:07:30,360
Now, it may or may not be clear that you get exactly

167
00:07:30,360 --> 00:07:32,639
the strings of matched brackets in this way.

168
00:07:32,639 --> 00:07:36,120
That's taken up further in the notes and in some problems.

169
00:07:36,120 --> 00:07:37,759
But we're just trying to understand

170
00:07:37,759 --> 00:07:40,879
how this definition works, and take it for granted,

171
00:07:40,879 --> 00:07:42,959
then in fact, it's right.

172
00:07:42,959 --> 00:07:45,300
Let's use the definition to prove some things

173
00:07:45,300 --> 00:07:48,460
about M, but I want to prove the things

174
00:07:48,460 --> 00:07:51,740
based on the definition of M, not assuming that it works

175
00:07:51,740 --> 00:07:52,620
as intended.

176
00:07:52,620 --> 00:07:56,540
So I'm going to claim, based on the definition,

177
00:07:56,540 --> 00:08:00,660
that it's impossible to find a string in M that starts

178
00:08:00,660 --> 00:08:01,699
with a right bracket.

179
00:08:01,699 --> 00:08:03,900
Now, of course, since we're assuming M,

180
00:08:03,900 --> 00:08:05,740
it's the right definition of matched brackets.

181
00:08:05,740 --> 00:08:08,660
It's clear that a string that starts with a right bracket

182
00:08:08,660 --> 00:08:10,460
already has nothing to match it.

183
00:08:10,460 --> 00:08:12,860
No left bracket matching, so it shouldn't be in there.

184
00:08:12,860 --> 00:08:15,220
But let's just make sure that the definition behaves

185
00:08:15,220 --> 00:08:17,780
in the way that we intend or it might be wrong.

186
00:08:17,780 --> 00:08:21,820
So how do I prove that no string in M starts with a right bracket?

187
00:08:21,820 --> 00:08:24,100
Well, let's look at the definition.

188
00:08:24,100 --> 00:08:26,540
The base case doesn't have any brackets at all,

189
00:08:26,540 --> 00:08:29,620
so it certainly doesn't start with a right bracket.

190
00:08:29,620 --> 00:08:32,259
And looking at the constructor rule,

191
00:08:32,259 --> 00:08:36,019
all the strings that you can construct start with a left bracket.

192
00:08:36,019 --> 00:08:40,420
And so we're really appealing to the implicit,

193
00:08:40,420 --> 00:08:43,019
that's all clause, the extremal clause, that says,

194
00:08:43,019 --> 00:08:45,500
that since the only way to get things in M

195
00:08:45,500 --> 00:08:48,460
is by applying the constructor, you're

196
00:08:48,460 --> 00:08:51,579
not going to be able to get anything that starts with a right

197
00:08:51,579 --> 00:08:53,740
bracket.

198
00:08:53,740 --> 00:08:57,220
All right, one more example of a recursively defined data

199
00:08:57,220 --> 00:09:02,500
type that's interesting and will be doing some lovely class

200
00:09:02,500 --> 00:09:06,779
problems with is the class that I call f18 functions.

201
00:09:06,779 --> 00:09:09,819
These are the functions from a first term of calculus,

202
00:09:09,819 --> 00:09:12,460
like, as you study in 1801, functions

203
00:09:12,460 --> 00:09:14,860
are a real variable of a single real variable.

204
00:09:14,860 --> 00:09:17,340
And here's a recursive definition that I think

205
00:09:17,340 --> 00:09:22,420
covers all of the functions that are considered in 1801.

206
00:09:22,420 --> 00:09:25,180
I'm going to start off with the identity function

207
00:09:25,180 --> 00:09:29,139
and any constant function and the function sine of x

208
00:09:29,139 --> 00:09:31,580
and declare that those are the base cases.

209
00:09:31,580 --> 00:09:34,180
Those are the functions in f18.

210
00:09:34,180 --> 00:09:37,220
All right, then here are the constructor rules.

211
00:09:37,220 --> 00:09:39,780
If I have two functions that are in f18,

212
00:09:39,779 --> 00:09:44,860
I can add a multiply them or take two to the f where f is in there.

213
00:09:44,860 --> 00:09:47,740
And those will also be functions in f18.

214
00:09:47,740 --> 00:09:51,139
So I can start building up a bunch of interesting stuff

215
00:09:51,139 --> 00:09:53,740
like polynomials and exponentials.

216
00:09:53,740 --> 00:09:56,699
In addition, if I have a function that's in f18,

217
00:09:56,699 --> 00:09:59,659
I can take its inverse, at least in sub-rase the inverse

218
00:09:59,659 --> 00:10:02,019
is defined in a function.

219
00:10:02,019 --> 00:10:06,620
And I can also compose two functions that are in f18

220
00:10:06,620 --> 00:10:08,339
to get another one.

221
00:10:08,340 --> 00:10:10,300
Let's look at how this definition works.

222
00:10:10,300 --> 00:10:13,899
I claim that in fact the function minus x is in f18.

223
00:10:13,899 --> 00:10:18,780
How do I build up minus x from the rules?

224
00:10:18,780 --> 00:10:22,019
Well, minus 1 is a constant function.

225
00:10:22,019 --> 00:10:23,740
So I have that.

226
00:10:23,740 --> 00:10:26,019
And x is just the identity function.

227
00:10:26,019 --> 00:10:28,420
And I can multiply two functions that I have.

228
00:10:28,420 --> 00:10:31,300
So if I multiply minus 1 times x, guess what?

229
00:10:31,300 --> 00:10:32,660
I got minus x.

230
00:10:32,660 --> 00:10:36,780
So I've just figured out that that function is in f18.

231
00:10:36,780 --> 00:10:38,300
What about the square root of x?

232
00:10:38,299 --> 00:10:41,819
Well, if I multiply the identity by itself,

233
00:10:41,819 --> 00:10:44,139
I get the function x squared.

234
00:10:44,139 --> 00:10:47,579
And then if I take its inverse, that's square root of x.

235
00:10:47,579 --> 00:10:48,779
OK.

236
00:10:48,779 --> 00:10:51,620
Well, I gave you sine x, but not cosine x,

237
00:10:51,620 --> 00:10:53,299
or any other trig functions.

238
00:10:53,299 --> 00:10:54,179
Why not?

239
00:10:54,179 --> 00:10:56,539
Well, I mean, I want them all, but I can get them

240
00:10:56,539 --> 00:10:57,859
by the rules already.

241
00:10:57,859 --> 00:10:59,019
So how do you get cosine x?

242
00:10:59,019 --> 00:11:02,419
Well, cosine x is just sine of x plus pi.

243
00:11:02,419 --> 00:11:04,219
Well, why is that in there?

244
00:11:04,219 --> 00:11:05,620
Pi is a constant.

245
00:11:05,620 --> 00:11:06,979
x is the identity.

246
00:11:06,980 --> 00:11:10,740
So the sum is a function that's an f18.

247
00:11:10,740 --> 00:11:14,379
And then if I compose that function with sine,

248
00:11:14,379 --> 00:11:16,740
I get sine of x plus pi, which is cosine x.

249
00:11:16,740 --> 00:11:18,379
So cosine x is there.

250
00:11:18,379 --> 00:11:21,659
Now, this was actually pointed out to me by students,

251
00:11:21,659 --> 00:11:23,860
this simple way of getting cosine x,

252
00:11:23,860 --> 00:11:26,779
the original way that I thought when I was using that square

253
00:11:26,779 --> 00:11:29,340
root operation, where I was going to use the identity

254
00:11:29,340 --> 00:11:32,700
that cosine squared plus sine squared is equal to 1.

255
00:11:32,700 --> 00:11:35,940
So if I take 1 minus sine squared and then take the square

256
00:11:35,940 --> 00:11:39,140
root, that's another way to get cosine x.

257
00:11:39,140 --> 00:11:40,940
The point being that there's a lot of ways

258
00:11:40,940 --> 00:11:46,820
to derive the same function as being an f18 built up

259
00:11:46,820 --> 00:11:49,780
from the operations applied to other functions.

260
00:11:49,780 --> 00:11:50,780
What about log of x?

261
00:11:50,780 --> 00:11:52,180
Let's just close with that.

262
00:11:52,180 --> 00:11:53,220
How do I get log of x?

263
00:11:53,220 --> 00:11:56,060
Well, log of x is the inverse of e to the x.

264
00:11:56,060 --> 00:11:57,420
How do I get e to the x?

265
00:11:57,420 --> 00:12:01,500
Well, e to the x is what you get by taking 2

266
00:12:01,500 --> 00:12:06,340
to the log to the base 2 of e, which is e,

267
00:12:06,340 --> 00:12:12,179
and then raising that to the power x.

268
00:12:12,179 --> 00:12:16,860
So if I take log e, which is a constant log to the base 2

269
00:12:16,860 --> 00:12:19,580
of e, which is a constant, I multiplied by x, the identity

270
00:12:19,580 --> 00:12:22,379
function, and I take 2 to that power,

271
00:12:22,379 --> 00:12:25,659
I'm composing, in other words, x log x with the function,

272
00:12:25,659 --> 00:12:27,820
2 with the constructor 2 to the f.

273
00:12:27,820 --> 00:12:30,659
Then I wind up with the function e to the x,

274
00:12:30,659 --> 00:12:35,659
and when I take its inverse, I get log of x as a coin.

