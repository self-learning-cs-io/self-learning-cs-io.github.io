---
title: MIT6100 P6P06BisectionSearchFIXED
---

1
00:00:00,000 --> 00:00:17,100
Okay, so let's get started on today's lecture.

2
00:00:17,100 --> 00:00:21,580
Last lecture I left you off with the promise of bigger and better algorithms to do what we've

3
00:00:21,580 --> 00:00:25,600
been trying to do, which is to approximate square roots and things like that.

4
00:00:25,600 --> 00:00:31,359
So today will be the introduction of our last algorithm for a bit before we'll start talking

5
00:00:31,359 --> 00:00:32,880
about more Python syntax.

6
00:00:32,880 --> 00:00:36,400
But today we're going to introduce the bisections search algorithm.

7
00:00:36,400 --> 00:00:40,840
Okay, but before we get into that, let's try to remember where we left off last time.

8
00:00:40,840 --> 00:00:47,040
So last time we talked about floating point numbers and then we talked about approximation

9
00:00:47,040 --> 00:00:49,120
algorithms, right?

10
00:00:49,120 --> 00:00:54,079
So the reason why we talked about floating point numbers is because we wanted to come up

11
00:00:54,079 --> 00:00:56,960
with an algorithm that was better than guess and check, right?

12
00:00:56,960 --> 00:00:58,640
guess and check was really limiting.

13
00:00:58,640 --> 00:01:04,599
We were basically limited to some exhaustive number of potential solutions.

14
00:01:04,599 --> 00:01:09,400
But we didn't just want to have an exhaustive set to look through for a solution.

15
00:01:09,400 --> 00:01:13,840
We wanted to be able to actually come up with an approximation to solve our problems,

16
00:01:13,840 --> 00:01:14,920
right?

17
00:01:14,920 --> 00:01:19,000
And so we talked about floating point numbers because we said, well, instead of having,

18
00:01:19,000 --> 00:01:25,560
for example, integer increments when we searched for square roots of values, let's try to

19
00:01:25,560 --> 00:01:28,000
have smaller increments.

20
00:01:28,000 --> 00:01:32,480
And so if we have smaller increments than an integer, well, we were starting to look at

21
00:01:32,480 --> 00:01:39,079
incrementing by point one or point two five or point zero zero one, whatever we want.

22
00:01:39,079 --> 00:01:42,920
And so then since we started talking about these floating point numbers, it was important

23
00:01:42,920 --> 00:01:45,319
to kind of understand what happens behind the scenes.

24
00:01:45,319 --> 00:01:50,119
And we saw that these floating point numbers can't actually be represented in memory directly,

25
00:01:50,119 --> 00:01:51,519
exactly, right?

26
00:01:51,519 --> 00:01:56,639
There's always, for the majority of the numbers, there's going to be some sort of rounding that

27
00:01:56,639 --> 00:01:59,719
happens when that number is stored in memory.

28
00:01:59,719 --> 00:02:01,479
And the rounding is very small.

29
00:02:01,479 --> 00:02:08,359
It's something like 10 to the negative 10, sorry, 10 to, 2 to the negative 32, which is approximately

30
00:02:08,359 --> 00:02:13,039
10 to the negative 10, which seems small, but we saw even with just a loop that added

31
00:02:13,039 --> 00:02:19,359
point one to itself 10 times, we were already getting very surprising results, right?

32
00:02:19,359 --> 00:02:26,039
So the approximation method introduced the idea of, yes, we can get an approximation for

33
00:02:26,039 --> 00:02:30,039
the square root of a number, but we can't check for equality.

34
00:02:30,039 --> 00:02:36,680
We can't say I'm going to come up with this approximation such that, you know, this approximation

35
00:02:36,680 --> 00:02:40,159
squared or whatever problem we're trying to solve is exactly equal to the number we're

36
00:02:40,159 --> 00:02:41,159
looking for.

37
00:02:41,159 --> 00:02:45,479
So we had to have a little wiggle room, and that wiggle room came in the form of an epsilon,

38
00:02:45,479 --> 00:02:46,479
right?

39
00:02:46,479 --> 00:02:52,960
So we were approximating a solution by basically saying does this solution come within plus or

40
00:02:52,960 --> 00:02:56,599
minus epsilon of my desired value?

41
00:02:56,599 --> 00:03:01,439
So we came up with a nice algorithm, the approximation algorithm, and we tested on a bunch of different

42
00:03:01,439 --> 00:03:02,439
values, right?

43
00:03:02,439 --> 00:03:07,519
We were incrementing a small increment a little bit at a time, and for the problem where

44
00:03:07,520 --> 00:03:12,520
we're trying to approximate the square root of some value x, we were saying, well, I'm

45
00:03:12,520 --> 00:03:17,480
going to keep making these small incremental changes to my guess until I come within plus

46
00:03:17,480 --> 00:03:20,000
or minus epsilon of my actual value, right?

47
00:03:20,000 --> 00:03:24,439
The guess squared was within plus or minus epsilon of my x.

48
00:03:24,439 --> 00:03:30,400
And this was the nice slide that we, that was kind of the, you know, the big bang of

49
00:03:30,400 --> 00:03:35,080
last lecture where we said, we have to be careful about the way we write these approximation

50
00:03:35,080 --> 00:03:39,840
algorithms because we might over, over shoot our epsilon.

51
00:03:39,840 --> 00:03:47,400
So if this is our guess, and this is a guess squared, the blue arrow increments normally,

52
00:03:47,400 --> 00:03:48,400
right?

53
00:03:48,400 --> 00:03:49,800
Whatever increment we choose.

54
00:03:49,800 --> 00:03:54,800
But then it's possible that at some point the guess squared comes just short of the epsilon,

55
00:03:54,800 --> 00:03:55,800
right?

56
00:03:55,800 --> 00:03:59,040
The lower the x minus epsilon.

57
00:03:59,039 --> 00:04:05,840
And with the following increment, the guess squared becomes just past x plus epsilon.

58
00:04:05,840 --> 00:04:09,799
And so the code that we ended up writing, right, which was, it made sense, right, when

59
00:04:09,799 --> 00:04:14,759
we wrote it, actually ended up giving us an infinite loop because it never stopped.

60
00:04:14,759 --> 00:04:19,079
We would never were within that plus minus epsilon, and so we would just keep making guesses

61
00:04:19,079 --> 00:04:20,480
from there on out, okay?

62
00:04:20,480 --> 00:04:24,800
So we ended up getting an infinite loop for our program.

63
00:04:24,800 --> 00:04:32,160
The solution was to take a little bit of code from guess and check and said, let's add

64
00:04:32,160 --> 00:04:36,240
an additional little sanity check stopping condition, right?

65
00:04:36,240 --> 00:04:40,400
And so everything except for this box was the approximation algorithm.

66
00:04:40,400 --> 00:04:44,960
And we added the thing that I've boxed here as our sanity check that we grabbed from

67
00:04:44,960 --> 00:04:46,199
the guess and check algorithm.

68
00:04:46,199 --> 00:04:56,039
But basically said, if we've made a guess that's just passed the reasonable guess, we know

69
00:04:56,039 --> 00:05:00,039
that all the guesses from here on out will also be unreasonable.

70
00:05:00,039 --> 00:05:06,680
And so there's no need to keep searching, and that condition will cause us to stop our

71
00:05:06,680 --> 00:05:10,759
infinite loop, our potential infinite loop.

72
00:05:10,759 --> 00:05:14,759
So this guess squared is less than or equal to x, basically says stop when we go past the

73
00:05:14,759 --> 00:05:17,599
last reasonable guess.

74
00:05:17,599 --> 00:05:22,839
And that condition plus the regular condition from an approximation algorithm, which says

75
00:05:22,839 --> 00:05:30,480
I want my guess squared to be plus or minus epsilon of the actual x.

76
00:05:30,480 --> 00:05:33,000
Those two conditions together made up my algorithm.

77
00:05:33,000 --> 00:05:34,480
And that's the algorithm.

78
00:05:34,480 --> 00:05:38,599
It's just this loop right here, this y loop with this increment, okay?

79
00:05:38,599 --> 00:05:40,759
So it looks really, really simple.

80
00:05:40,759 --> 00:05:43,920
And so what we ended up having is these two conditions, right?

81
00:05:43,920 --> 00:05:50,120
So I want to be within epsilon and I want to still be making reasonable guesses to be,

82
00:05:50,120 --> 00:05:53,920
sorry, I want to be, sorry, outside of the bounds of epsilon and still be making reasonable

83
00:05:53,920 --> 00:05:59,120
guesses, that's the condition that causes me to keep making more guesses.

84
00:05:59,120 --> 00:06:04,759
And when either one of these becomes false, I'm going to stop making guesses.

85
00:06:04,759 --> 00:06:07,639
And that's what the if else down here says.

86
00:06:07,639 --> 00:06:12,400
It says one of these conditions became false, either this one I'm making unreasonable guesses

87
00:06:12,399 --> 00:06:16,000
now or I've come within plus or minus epsilon.

88
00:06:16,000 --> 00:06:17,759
So which one is it?

89
00:06:17,759 --> 00:06:20,560
So here I'm making unreasonable guesses.

90
00:06:20,560 --> 00:06:24,239
So I've exited the loop because I've gone too far.

91
00:06:24,239 --> 00:06:27,919
In which case I failed to find the square root.

92
00:06:27,919 --> 00:06:33,560
And otherwise I've exited because I am now within plus or minus epsilon.

93
00:06:33,560 --> 00:06:39,479
So let me just run the code to remind ourselves what it looked like.

94
00:06:39,480 --> 00:06:46,120
So here we're trying to find 54,321 was this troublesome value being within plus or

95
00:06:46,120 --> 00:06:48,120
minus 0.01, right?

96
00:06:48,120 --> 00:06:53,600
Our guess squared to be plus minus 0.01 of 54,321.

97
00:06:53,600 --> 00:06:58,720
Our increment was seemed really small, 0.001.

98
00:06:58,720 --> 00:07:06,879
But when we ran it, took a couple seconds and we made about 2.3 million guesses and

99
00:07:06,879 --> 00:07:10,279
the code says we failed to find the square root.

100
00:07:10,279 --> 00:07:16,480
And we're also reporting what the last guess was and what the last guess squared was as well.

101
00:07:16,480 --> 00:07:18,600
So what's the solution to this?

102
00:07:18,600 --> 00:07:22,920
The solution was, well we can make our epsilon bigger, right?

103
00:07:22,920 --> 00:07:32,000
So if we made our epsilon be one, so if we wanted to be within plus or minus one of 54,321,

104
00:07:32,000 --> 00:07:33,959
yeah, that code works, right?

105
00:07:33,959 --> 00:07:35,279
It didn't fail.

106
00:07:35,279 --> 00:07:39,519
They made still about 2.3 million guesses and it came up with this estimate.

107
00:07:39,519 --> 00:07:44,519
So as soon as we came within epsilon, that boundary, we stopped the program, right?

108
00:07:44,519 --> 00:07:46,119
It didn't try to do better.

109
00:07:46,119 --> 00:07:49,479
It didn't try to get closer to x.

110
00:07:49,479 --> 00:07:54,279
The other solution, if we were unhappy with the fact that we failed, was to make our step

111
00:07:54,279 --> 00:07:56,479
smaller.

112
00:07:56,479 --> 00:07:58,479
But what's the problem if we make our step smaller?

113
00:07:58,479 --> 00:08:01,879
Do you guys remember when I run the program?

114
00:08:02,879 --> 00:08:10,879
Yeah, it takes longer and can you approximate how much longer it'll take?

115
00:08:10,879 --> 00:08:12,719
I decreased my step size by 10.

116
00:08:12,719 --> 00:08:17,800
So every one step I made last run, I'm now going to take 10 steps, right?

117
00:08:17,800 --> 00:08:24,959
So I'm waiting basically what, 15, 20 seconds here if the last run took two seconds to run?

118
00:08:24,959 --> 00:08:28,159
And now I've also doubled the number of guesses, right?

119
00:08:28,160 --> 00:08:30,160
Sorry, not double.

120
00:08:30,160 --> 00:08:32,960
I'm making 10 times the number of guesses.

121
00:08:32,960 --> 00:08:36,240
23 million as opposed to 2.3 million.

122
00:08:36,240 --> 00:08:38,759
But the code didn't fail, right?

123
00:08:38,759 --> 00:08:43,440
It found something that's pretty close to the square root of 54,231.

124
00:08:43,440 --> 00:08:44,920
321.

125
00:08:44,920 --> 00:08:47,920
Okay.

126
00:08:47,920 --> 00:08:50,200
So that's where we left off.

127
00:08:50,200 --> 00:08:54,519
And I don't know about you, but I don't want to wait 20 seconds to figure out what the

128
00:08:54,519 --> 00:08:56,360
square root of 54,000 is.

129
00:08:56,360 --> 00:09:02,199
That seems like an unreasonably long amount of time to come up with an approximation, right?

130
00:09:02,199 --> 00:09:07,480
And we don't wait that long when we do it on the computer or when we do it on the calculator.

131
00:09:07,480 --> 00:09:10,279
And so that leads me to the bisection search algorithm.

132
00:09:10,279 --> 00:09:17,079
It's going to be a better way for us to solve certain types of problems much faster, but

133
00:09:17,079 --> 00:09:19,600
only certain types of problems.

134
00:09:19,600 --> 00:09:23,679
So to motivate the bisection search, before we even look at code, I just want to give you

135
00:09:23,679 --> 00:09:26,879
a bit of motivation with a few different examples.

136
00:09:26,879 --> 00:09:32,679
The first one is I'm going to give you guys a chance to win some money.

137
00:09:32,679 --> 00:09:38,039
So suppose I put a $100 bill at one page in this book.

138
00:09:38,039 --> 00:09:44,000
This is actually the last edition, not the edition we're using this year, but I don't

139
00:09:44,000 --> 00:09:46,839
have this year's edition unfortunately in my office.

140
00:09:46,839 --> 00:09:51,199
So this book is 448 pages long.

141
00:09:51,200 --> 00:09:53,160
And I've put some money in this book.

142
00:09:53,160 --> 00:09:57,920
And if you can guess where the money is and eight or fewer guesses, I will give you the

143
00:09:57,920 --> 00:09:59,000
money.

144
00:09:59,000 --> 00:10:03,000
And if you fail, you get an F. Not really.

145
00:10:03,000 --> 00:10:05,759
Is this a game anyone would want to play?

146
00:10:05,759 --> 00:10:09,160
That's what I thought.

147
00:10:09,160 --> 00:10:12,920
And in fact, your chances of winning are about one in 56.

148
00:10:12,920 --> 00:10:13,920
Okay.

149
00:10:13,920 --> 00:10:17,759
And I don't want to play that game either.

150
00:10:17,759 --> 00:10:21,759
Now let's say I give you some additional information.

151
00:10:21,759 --> 00:10:30,919
With each guess you make, I will tell you whether you are correct, too low or too high.

152
00:10:30,919 --> 00:10:32,439
So I give you some additional information.

153
00:10:32,439 --> 00:10:35,879
Is this a game that now you would want to play?

154
00:10:35,879 --> 00:10:38,840
Would anyone like to play the game with me?

155
00:10:38,840 --> 00:10:40,559
You want to play the game?

156
00:10:40,559 --> 00:10:41,559
Okay.

157
00:10:41,559 --> 00:10:42,559
All right.

158
00:10:42,559 --> 00:10:43,559
So you're up.

159
00:10:43,559 --> 00:10:44,559
Okay.

160
00:10:44,559 --> 00:10:47,240
All right.

161
00:10:47,240 --> 00:10:50,320
So I'm going to write down your guesses because you only have eight.

162
00:10:50,320 --> 00:10:51,320
All right.

163
00:10:51,320 --> 00:10:52,320
You remember that there's only eight guesses.

164
00:10:52,320 --> 00:10:53,320
All right.

165
00:10:53,320 --> 00:10:54,320
So what's your first guess?

166
00:10:54,320 --> 00:10:55,320
There's 448 pages.

167
00:10:55,320 --> 00:11:01,000
So between, yeah, you pick one to four, 48.

168
00:11:01,000 --> 00:11:03,000
What's your first guess?

169
00:11:03,000 --> 00:11:04,000
224.

170
00:11:04,000 --> 00:11:05,000
224?

171
00:11:05,000 --> 00:11:06,000
All right.

172
00:11:06,000 --> 00:11:07,000
Smack in the middle right there.

173
00:11:07,000 --> 00:11:08,000
All right.

174
00:11:08,000 --> 00:11:09,000
224.

175
00:11:09,000 --> 00:11:10,000
Don't look.

176
00:11:10,000 --> 00:11:11,000
All right.

177
00:11:11,000 --> 00:11:12,000
No money.

178
00:11:12,000 --> 00:11:13,000
All right.

179
00:11:13,000 --> 00:11:14,000
Okay.

180
00:11:15,000 --> 00:11:17,000
No money.

181
00:11:17,000 --> 00:11:18,000
All right.

182
00:11:18,000 --> 00:11:19,840
So but now I give you extra information.

183
00:11:19,840 --> 00:11:22,320
The guess is too high.

184
00:11:22,320 --> 00:11:23,480
My guess was too high.

185
00:11:23,480 --> 00:11:24,480
Yes, your guess was too high.

186
00:11:24,480 --> 00:11:25,480
So not 224.

187
00:11:25,480 --> 00:11:26,480
121.

188
00:11:26,480 --> 00:11:27,480
121.

189
00:11:27,480 --> 00:11:29,480
So you want to go here?

190
00:11:29,480 --> 00:11:30,480
112.

191
00:11:30,480 --> 00:11:31,480
All right.

192
00:11:31,480 --> 00:11:33,480
That's two guesses now.

193
00:11:45,000 --> 00:11:46,480
Nope.

194
00:11:46,480 --> 00:11:49,120
The guess is too high as well.

195
00:11:49,120 --> 00:11:49,960
Still too high.

196
00:11:55,559 --> 00:11:56,559
56?

197
00:11:56,559 --> 00:11:57,559
No.

198
00:11:57,559 --> 00:11:58,559
Okay.

199
00:11:58,559 --> 00:11:59,559
Here's somewhere.

200
00:11:59,559 --> 00:12:01,320
Okay.

201
00:12:01,320 --> 00:12:02,519
All right.

202
00:12:02,519 --> 00:12:03,320
56.

203
00:12:06,679 --> 00:12:09,399
The guess is too high.

204
00:12:10,399 --> 00:12:13,399
Still too high.

205
00:12:13,399 --> 00:12:14,399
Still too high.

206
00:12:14,399 --> 00:12:16,399
I'm going to guess.

207
00:12:16,399 --> 00:12:18,399
28.

208
00:12:18,399 --> 00:12:19,399
All right.

209
00:12:19,399 --> 00:12:20,399
28.

210
00:12:20,399 --> 00:12:21,399
I'm going to start writing up here.

211
00:12:21,399 --> 00:12:22,399
28.

212
00:12:22,399 --> 00:12:27,399
You have one, two, three, you're at four guesses now.

213
00:12:27,399 --> 00:12:28,399
28.

214
00:12:28,399 --> 00:12:29,399
Okay.

215
00:12:29,399 --> 00:12:30,399
It is.

216
00:12:36,399 --> 00:12:37,399
No.

217
00:12:37,399 --> 00:12:40,879
I have to remember where I put it.

218
00:12:40,879 --> 00:12:41,799
It's too high.

219
00:12:41,799 --> 00:12:42,319
It's too high.

220
00:12:42,319 --> 00:12:45,000
Sorry.

221
00:12:45,000 --> 00:12:46,639
Still too high.

222
00:12:46,639 --> 00:12:47,240
14.

223
00:12:47,240 --> 00:12:47,759
Okay.

224
00:12:47,759 --> 00:12:48,240
14.

225
00:12:48,240 --> 00:12:51,199
Oh, right there.

226
00:12:51,199 --> 00:12:51,519
Okay.

227
00:12:51,519 --> 00:12:55,439
Now 14.

228
00:12:55,439 --> 00:12:57,000
Now it's too low.

229
00:12:57,000 --> 00:12:59,840
Now that I remembered, now that I remember where I actually

230
00:12:59,840 --> 00:13:02,199
put it, it's too low.

231
00:13:02,199 --> 00:13:06,399
Turns out it's not exactly like four.

232
00:13:06,399 --> 00:13:07,399
Yeah.

233
00:13:07,399 --> 00:13:08,399
14 and 28.

234
00:13:08,399 --> 00:13:10,399
So now you know it's, yeah.

235
00:13:10,399 --> 00:13:11,399
21.

236
00:13:11,399 --> 00:13:12,399
Okay.

237
00:13:12,399 --> 00:13:13,399
So right there.

238
00:13:13,399 --> 00:13:14,399
21.

239
00:13:14,399 --> 00:13:15,399
Okay.

240
00:13:15,399 --> 00:13:17,399
Let's see.

241
00:13:17,399 --> 00:13:22,399
Guys, I'm shaking.

242
00:13:22,399 --> 00:13:30,399
It's not 100.

243
00:13:30,399 --> 00:13:32,399
But there is a 1 and a 0 in it.

244
00:13:32,399 --> 00:13:34,399
So there you go.

245
00:13:34,399 --> 00:13:35,399
All right.

246
00:13:35,399 --> 00:13:38,639
That was awesome.

247
00:13:38,639 --> 00:13:41,000
So yes, I'm really glad you played.

248
00:13:41,000 --> 00:13:44,480
And actually you only took seven guesses to get it.

249
00:13:44,480 --> 00:13:47,840
So I could have probably rigged it a little bit better.

250
00:13:47,840 --> 00:13:51,399
Because your chances of winning this game are about one and three.

251
00:13:51,399 --> 00:13:52,399
Okay.

252
00:13:52,399 --> 00:13:53,959
And you did a really good job.

253
00:13:53,959 --> 00:13:57,240
So what was your thought process, basically?

254
00:13:57,240 --> 00:14:02,559
And I think once you did a couple of them, anyone who maybe didn't think about this way

255
00:14:02,559 --> 00:14:03,639
and have figured it out.

256
00:14:03,639 --> 00:14:07,039
You were basically guessing the halfway point, right?

257
00:14:07,039 --> 00:14:10,240
Each time I told you to hire too low.

258
00:14:10,240 --> 00:14:16,000
And so by section search is a method that you can use to solve problems where there's

259
00:14:16,000 --> 00:14:21,240
some sort of order to the thing you're trying to search.

260
00:14:21,240 --> 00:14:25,319
So let's say we know our interval.

261
00:14:25,319 --> 00:14:31,519
In this case, in the book, we knew that we had page 1 to 448.

262
00:14:31,519 --> 00:14:36,559
So we had this low point, page 1, and this high point, 448.

263
00:14:36,559 --> 00:14:39,079
And we know that our answer lies within this interval.

264
00:14:39,079 --> 00:14:44,279
And it can be integers like in this book, or it can be, you know, fractional pieces as

265
00:14:44,279 --> 00:14:45,600
well.

266
00:14:45,600 --> 00:14:48,799
And the idea is you're just guessing the midpoint between this interval.

267
00:14:48,799 --> 00:14:51,240
It's as good as guess is anything, right?

268
00:14:51,240 --> 00:14:55,120
But based on the answer that I give you, because now I give you extra information if it's

269
00:14:55,120 --> 00:15:01,159
too high too low, you can basically eliminate half of the search space, right?

270
00:15:01,159 --> 00:15:08,480
So with the guess 224, what ended up happening is you eliminated this entire half of the book,

271
00:15:08,480 --> 00:15:09,480
right?

272
00:15:09,480 --> 00:15:15,399
So it's like I take this original book, 448 pages, get the midpoint, rip it in half, throw

273
00:15:15,399 --> 00:15:17,480
away these upper pages.

274
00:15:17,480 --> 00:15:20,879
And now you kind of think of it like having the skinnier book.

275
00:15:20,879 --> 00:15:25,199
And this is now the book you're searching through, right?

276
00:15:25,199 --> 00:15:28,319
And then you're repeating the process all over again.

277
00:15:28,320 --> 00:15:32,200
The low endpoint is still page one, right?

278
00:15:32,200 --> 00:15:35,200
Because I have no information about how low I need to go.

279
00:15:35,200 --> 00:15:39,800
But my high endpoint becomes the guess that I had just made, right?

280
00:15:39,800 --> 00:15:42,440
224, right?

281
00:15:42,440 --> 00:15:48,120
And now I make another guess, midpoint, in this skinnier book.

282
00:15:48,120 --> 00:15:53,040
And so this should kind of trigger something in your brain about computation and things

283
00:15:53,040 --> 00:15:54,160
that we've learned.

284
00:15:54,159 --> 00:15:59,600
As soon as we're saying I'm repeating this process, right, of now just doing the guess again

285
00:15:59,600 --> 00:16:05,240
with this smaller version of a book, we're basically, we have a loop, right?

286
00:16:05,240 --> 00:16:08,120
That's something that you should be thinking about.

287
00:16:08,120 --> 00:16:13,000
And this loop is going to be something that just repeats the same process over and over

288
00:16:13,000 --> 00:16:14,000
again.

289
00:16:14,000 --> 00:16:18,079
Once I've eliminated this upper half of the book, now I'm looking through this lower half,

290
00:16:18,079 --> 00:16:22,639
midpoint, based on the answer I give you, you can rip the book again in half where you

291
00:16:22,639 --> 00:16:27,600
are now, and now you're searching the skinnier version of the book, right?

292
00:16:27,600 --> 00:16:33,439
So we're basically cutting the number of things we need to search for in half every time

293
00:16:33,439 --> 00:16:37,720
we make a guess, which is really powerful, right?

294
00:16:37,720 --> 00:16:42,399
With guess and check or with approximation method, if we're going to do guess and check

295
00:16:42,399 --> 00:16:46,480
on this book, we'd be asking, is it page one, is it page two, is it page three, is it

296
00:16:46,480 --> 00:16:47,480
page four?

297
00:16:47,480 --> 00:16:49,480
And that's tedious, right?

298
00:16:49,480 --> 00:16:51,720
We're not limiting half the book with each guess.

299
00:16:51,720 --> 00:16:57,320
We're just eliminating one page with each guess, okay?

300
00:16:57,320 --> 00:17:02,800
So this idea of logarithmic growth, which is what happens when you eliminate the search

301
00:17:02,800 --> 00:17:05,880
space in half each, with each stage, is logarithmic growth.

302
00:17:05,880 --> 00:17:10,079
And we'll come back to this idea again towards the last few weeks of lecture when we talk

303
00:17:10,079 --> 00:17:13,759
about comparing algorithms in this class.

304
00:17:13,759 --> 00:17:17,480
And what does it mean for one algorithm to be more efficient than another algorithm?

305
00:17:17,480 --> 00:17:19,720
What does it mean to run faster?

306
00:17:19,720 --> 00:17:20,720
Okay.

307
00:17:21,680 --> 00:17:23,000
So that's just something I mentioned.

308
00:17:23,000 --> 00:17:27,079
When we do guess and check where we ask one page at a time, that's linear growth.

309
00:17:27,079 --> 00:17:32,039
Because if the book, if I give you now a book that's double the size, and just by bad luck,

310
00:17:32,039 --> 00:17:34,360
I put the money away at the end.

311
00:17:34,360 --> 00:17:38,759
If I put the money at the end in this book that's twice as big, then you're going to have

312
00:17:38,759 --> 00:17:42,799
to ask me twice as many questions until you get to the answer.

313
00:17:42,799 --> 00:17:47,799
But with logarithmic growth, if I still put the money in this book that's double the

314
00:17:47,799 --> 00:17:53,240
size somewhere, all you need to do is make one extra guess, not 400 extra guesses, to

315
00:17:53,240 --> 00:17:55,079
figure out which interval it's in.

316
00:17:55,079 --> 00:17:59,599
You take from this double book, make your first guess, and all of a sudden we are at this

317
00:17:59,599 --> 00:18:00,599
book again.

318
00:18:00,599 --> 00:18:01,599
Okay.

319
00:18:01,599 --> 00:18:03,399
All right.

320
00:18:03,399 --> 00:18:08,960
So let's do another analogy just so we get kind of the sense of where this is going.

321
00:18:08,960 --> 00:18:13,480
So suppose that we don't just need to work with numbers, we can also work with anything

322
00:18:13,480 --> 00:18:15,960
that has an ordering property to it.

323
00:18:15,960 --> 00:18:21,759
So suppose when you came in, I asked you to sit alphabetically, front left is last name

324
00:18:21,759 --> 00:18:27,920
A, back right is last name Z, and then I'm looking for a particular person.

325
00:18:27,920 --> 00:18:32,640
For me, the bisection search algorithm could be basically ask the person in the middle

326
00:18:32,640 --> 00:18:36,039
of the class, what is their last name?

327
00:18:36,039 --> 00:18:44,079
If they say what it is, and depending on what they say, I can basically dismiss half

328
00:18:44,079 --> 00:18:45,160
of the people.

329
00:18:45,160 --> 00:18:48,680
If their last name starts with a letter later than the one I'm looking for in the alphabet,

330
00:18:48,680 --> 00:18:52,279
I dismiss the upper half and vice versa.

331
00:18:52,279 --> 00:18:54,920
And then I have this only half of the people to search there.

332
00:18:54,920 --> 00:19:00,400
And I keep repeating this process until I have only one person left, and either that person

333
00:19:00,400 --> 00:19:05,759
is the one I'm looking for, in which case I've decreased by half the size of the class with

334
00:19:05,759 --> 00:19:09,000
each guess, and I have one person left to ask.

335
00:19:09,000 --> 00:19:14,240
So when I'm looking for, or that person just isn't here.

336
00:19:14,240 --> 00:19:21,120
So let's try to apply the same idea of bisection search to programming.

337
00:19:21,120 --> 00:19:25,519
And specifically, let's do the problem we've been trying to solve, kind of as a common

338
00:19:25,519 --> 00:19:29,759
thread throughout these algorithms, figuring out the square root of a number.

339
00:19:29,759 --> 00:19:33,339
Not exact, actually, we're still going to be looking only for an approximation to the

340
00:19:33,339 --> 00:19:36,039
square root of a number.

341
00:19:36,039 --> 00:19:41,559
So the idea here is that our interval is, if we're trying to find the square root of x,

342
00:19:41,559 --> 00:19:44,480
it's going to be between 0 and x.

343
00:19:44,480 --> 00:19:50,039
So basically, I can just reuse this number line here.

344
00:19:50,039 --> 00:19:56,519
And my interval for the square root is 0 and x.

345
00:19:56,519 --> 00:19:59,679
So like that.

346
00:19:59,679 --> 00:20:04,720
So with approximation method, we would start at 0 and painstakingly make our way little

347
00:20:04,720 --> 00:20:07,399
by little.

348
00:20:07,400 --> 00:20:13,240
But with bisection search, we're making our initial guess to be the halfway point.

349
00:20:13,240 --> 00:20:17,560
Again, we're working with numbers, so the ordering property is very intuitive.

350
00:20:17,560 --> 00:20:22,080
We ask, at this halfway point, what is with this guess at the halfway point?

351
00:20:22,080 --> 00:20:25,080
What is the guess squared?

352
00:20:25,080 --> 00:20:33,960
So if the guess squared is up here, so g squared is up here, then I know this guess is too

353
00:20:33,960 --> 00:20:34,880
big.

354
00:20:34,880 --> 00:20:41,360
So I know I do not need to make any further guesses up here.

355
00:20:41,360 --> 00:20:44,920
So that's this case here.

356
00:20:44,920 --> 00:20:50,160
If I know this guess is too big, then my interval now becomes, this is going to be the low

357
00:20:50,160 --> 00:20:53,680
still, but now this is going to be my high point.

358
00:20:53,680 --> 00:20:57,320
And this is kind of this new interval I'm looking through.

359
00:20:57,320 --> 00:21:01,840
But if you think about it, it's the exact same problem I started with when my interval was

360
00:21:01,840 --> 00:21:03,040
larger.

361
00:21:03,039 --> 00:21:05,399
I still have an interval with a low and a high.

362
00:21:05,399 --> 00:21:08,240
I'm still going to make a guess halfway.

363
00:21:08,240 --> 00:21:09,839
This new g here.

364
00:21:09,839 --> 00:21:17,200
And I'm going to ask again, is this new guess squared less than or greater than x?

365
00:21:17,200 --> 00:21:19,399
Let's say this case is less than.

366
00:21:19,399 --> 00:21:26,079
So if the new guess, new g is less than x, the new g squared is less than x, then I know

367
00:21:26,079 --> 00:21:28,359
this is new g.

368
00:21:28,359 --> 00:21:34,639
And I know that anything lower than this is definitely not going to be closer to the

369
00:21:34,639 --> 00:21:36,039
answer I'm looking for.

370
00:21:36,039 --> 00:21:40,319
So now I'm eliminating this half of the search space.

371
00:21:40,319 --> 00:21:43,919
And then I keep making the same guesses.

372
00:21:43,919 --> 00:21:50,240
Next g, g, latest g, this is in when you guys name your files, remember, and you've got

373
00:21:50,240 --> 00:21:55,639
new file, final file, latest file, version two, all that stuff.

374
00:21:55,639 --> 00:21:57,039
That's basically what I did.

375
00:21:57,039 --> 00:22:00,519
So anyway, I have this latest g here, which is my new midpoint.

376
00:22:00,519 --> 00:22:05,200
And I keep making these guesses and asking the question whether this guess squared is greater

377
00:22:05,200 --> 00:22:07,680
than or less than x.

378
00:22:07,680 --> 00:22:12,200
And I adjust my boundaries accordingly.

379
00:22:12,200 --> 00:22:17,559
So at each stage, the number of values I have to search through are just half of what

380
00:22:17,559 --> 00:22:22,319
I had to search through last guess.

381
00:22:22,319 --> 00:22:26,319
So the bisection search takes advantage of two properties.

382
00:22:26,319 --> 00:22:29,639
And you can only use it when you have these properties in hand.

383
00:22:29,639 --> 00:22:32,559
There's some sort of ordering to the thing you're searching.

384
00:22:32,559 --> 00:22:34,879
So you know, last names are alphabetical.

385
00:22:34,879 --> 00:22:39,159
You know you have this range of values.

386
00:22:39,159 --> 00:22:41,279
And you have some sort of feedback.

387
00:22:41,279 --> 00:22:47,879
The feedback tells you whether the guess that you made was too low or too high or exact

388
00:22:47,879 --> 00:22:51,799
or approximate whatever you want.

389
00:22:51,799 --> 00:22:56,119
So think about this for a second and answer the question.

390
00:22:56,119 --> 00:23:01,159
So you're guessing a four digit pin code on a phone or whatever.

391
00:23:01,159 --> 00:23:06,639
And the feedback the phone tells you is whether the guess is correct or not.

392
00:23:06,639 --> 00:23:11,679
Can you use bisection search in this situation to quickly and correctly guess the code?

393
00:23:11,679 --> 00:23:13,279
No.

394
00:23:13,279 --> 00:23:14,279
Why is that?

395
00:23:14,279 --> 00:23:15,279
What are we missing?

396
00:23:15,279 --> 00:23:19,799
It doesn't tell you if it's too big or too small.

397
00:23:19,799 --> 00:23:20,799
Yeah.

398
00:23:20,799 --> 00:23:23,599
So guessing random, I mean, you could use bisection search and you could choose which

399
00:23:23,599 --> 00:23:25,000
have to look through.

400
00:23:25,000 --> 00:23:30,079
But then basically you just have to search through all the values anyway in worst case.

401
00:23:30,079 --> 00:23:36,119
And then you might as well have just gone from 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, just have gone

402
00:23:36,119 --> 00:23:39,439
incrementally upward.

403
00:23:39,439 --> 00:23:40,439
OK.

404
00:23:40,439 --> 00:23:43,639
So how about this extreme guessing game?

405
00:23:43,639 --> 00:23:50,119
So you have a friend and you'd like to play this extreme guessing game where you want

406
00:23:50,119 --> 00:23:52,599
to guess a number exactly.

407
00:23:52,599 --> 00:23:53,919
OK.

408
00:23:53,919 --> 00:23:57,240
So your friend has a decimal number in mind.

409
00:23:57,240 --> 00:24:02,879
So it can be with a decimal point like any real number from 0 to 10, let's say including

410
00:24:02,879 --> 00:24:06,240
0, including 10 to any precision in mind.

411
00:24:06,240 --> 00:24:10,719
So the feedback your friend gives you when you play this extreme guessing game is whether

412
00:24:10,719 --> 00:24:13,759
your guess was correct too lower too high.

413
00:24:13,759 --> 00:24:19,679
In this case, can you use bisection search to quickly and correctly guess the number?

414
00:24:19,680 --> 00:24:26,680
The number might be really long, but it would take a long time.

415
00:24:26,680 --> 00:24:27,680
Yeah.

416
00:24:27,680 --> 00:24:30,880
So I included this word exactly here.

417
00:24:30,880 --> 00:24:36,160
If I didn't include that, I think the answer could be yes because you could play the game

418
00:24:36,160 --> 00:24:41,799
to a round or approximation to decimal places or something like that.

419
00:24:41,799 --> 00:24:48,920
But I guess if your friend wants to flex with pi in your extreme guessing game, then

420
00:24:48,920 --> 00:24:55,240
bisection search wouldn't work because if you're trying to find that number exactly, then

421
00:24:55,240 --> 00:24:56,880
you'll never get to it.

422
00:24:56,880 --> 00:25:01,680
So yeah, you're using bisection search, but it's going to basically be an infinite algorithm.

423
00:25:01,680 --> 00:25:04,840
It won't terminate.

424
00:25:04,840 --> 00:25:09,039
OK.

425
00:25:09,039 --> 00:25:14,680
So this is the same slide I had at the beginning of lecture just to remind ourselves what the

426
00:25:14,680 --> 00:25:19,120
code looks like when we use the approximation algorithm.

427
00:25:19,120 --> 00:25:20,440
Nothing new here.

428
00:25:20,440 --> 00:25:25,880
So we had our, the thing that basically did the work was this while loop, right?

429
00:25:25,880 --> 00:25:30,720
While we were still farther away from epsilon and we were still making reasonable guesses,

430
00:25:30,720 --> 00:25:35,200
increment our guess by 0.0001.

431
00:25:35,200 --> 00:25:40,160
Now let's write the code for the, finding, approximating the square root of a number,

432
00:25:40,160 --> 00:25:41,440
but with bisection search.

433
00:25:41,440 --> 00:25:44,759
So we're going to follow the same kind of procedure we did here.

434
00:25:44,759 --> 00:25:47,320
And we're actually going to sort of write it together on the slides.

435
00:25:47,320 --> 00:25:53,200
And I'm going to explain sort of the thought process that goes behind each step.

436
00:25:53,200 --> 00:25:54,200
OK.

437
00:25:54,200 --> 00:25:57,600
So the first thing we're doing is we're initializing some stuff up here.

438
00:25:57,600 --> 00:26:01,680
So the thing we want to find the square root of, right?

439
00:26:01,680 --> 00:26:03,080
Let's why not do the same number.

440
00:26:03,080 --> 00:26:05,360
That gave us trouble last time.

441
00:26:05,360 --> 00:26:09,600
And we still want to be within some plus and minus epsilon again because we do not want

442
00:26:09,599 --> 00:26:13,319
to be comparing floats.

443
00:26:13,319 --> 00:26:17,439
And this num guesses is going to keep track of how many guesses we've made.

444
00:26:17,439 --> 00:26:22,079
Basically, when we played the guessing game, how many guesses did you do to get to the,

445
00:26:22,079 --> 00:26:23,919
to the, to the money?

446
00:26:23,919 --> 00:26:25,919
All right.

447
00:26:25,919 --> 00:26:27,240
Good.

448
00:26:27,240 --> 00:26:35,679
And then at the bottom here, we're going to print out the, the number of guesses and what

449
00:26:35,680 --> 00:26:40,640
the guess was that brought us close to the plus or minus epsilon.

450
00:26:40,640 --> 00:26:41,640
OK.

451
00:26:41,640 --> 00:26:46,160
So the first thing we do is we notice there was a repetition.

452
00:26:46,160 --> 00:26:52,000
And the while loop here is exactly the same as the while loop for the approximation method.

453
00:26:52,000 --> 00:26:53,000
OK.

454
00:26:53,000 --> 00:26:56,279
While we're still farther than epsilon away, right?

455
00:26:56,279 --> 00:27:03,200
While our, while our guess squared is plus or minus epsilon away from x.

456
00:27:03,200 --> 00:27:04,200
Right?

457
00:27:04,200 --> 00:27:10,240
So absolute value of guess squared minus x is greater or equal to epsilon.

458
00:27:10,240 --> 00:27:15,519
I guess the, this could just be greater than details.

459
00:27:15,519 --> 00:27:18,400
Let's keep making guesses.

460
00:27:18,400 --> 00:27:21,039
Now the guesses are, we're not incrementing anything, right?

461
00:27:21,039 --> 00:27:22,559
This isn't the approximation method.

462
00:27:22,559 --> 00:27:26,240
We need to make the guesses in a smart way.

463
00:27:26,240 --> 00:27:27,240
OK.

464
00:27:27,240 --> 00:27:33,160
So we're going to initialize some stuff for algorithm to work like, our original endpoints

465
00:27:33,160 --> 00:27:39,480
and then we're going to do some stuff inside the loop, whatever is repeated, whatever we

466
00:27:39,480 --> 00:27:43,720
noted, right, when we were talking about the algorithm, what did we note that gets repeated

467
00:27:43,720 --> 00:27:44,720
every time?

468
00:27:44,720 --> 00:27:45,720
OK.

469
00:27:45,720 --> 00:27:50,080
Let's talk about the initializations.

470
00:27:50,080 --> 00:27:52,120
We need to initialize our two endpoints, right?

471
00:27:52,120 --> 00:27:56,880
We need the, for the bisection search to work, we need to know what our endpoints are.

472
00:27:56,880 --> 00:27:58,680
So the low is going to be zero.

473
00:27:58,680 --> 00:28:03,120
So if we're trying to find the square root of x, we might as well make our low zero.

474
00:28:03,119 --> 00:28:06,959
And let's make our high point x.

475
00:28:06,959 --> 00:28:11,000
Our high point can be 2x, it could be 3x, whatever we want, but that's too big.

476
00:28:11,000 --> 00:28:14,599
We know if using algebra that definitely it won't be that big.

477
00:28:14,599 --> 00:28:18,559
So we can just make our high point x.

478
00:28:18,559 --> 00:28:23,959
And then we just kick off this algorithm with our initial guess.

479
00:28:23,959 --> 00:28:26,479
It's going to be the midpoint of low and high.

480
00:28:26,479 --> 00:28:28,479
So high plus low divided by 2.

481
00:28:28,479 --> 00:28:29,479
OK.

482
00:28:29,480 --> 00:28:34,440
So that brings us to just before the while loop here, right here.

483
00:28:34,440 --> 00:28:35,200
OK.

484
00:28:35,200 --> 00:28:42,319
And now we're going to repeat some stuff while we're still farther than epsilon away from

485
00:28:42,319 --> 00:28:44,759
our answer.

486
00:28:44,759 --> 00:28:50,720
So the thing that we're repeating is going to be checking if we are too low or too high,

487
00:28:50,720 --> 00:28:51,720
right?

488
00:28:51,720 --> 00:28:55,079
Like we have a guess in hand now, this midpoint here.

489
00:28:55,079 --> 00:28:58,880
And now with this guess in hand, that kind of kicked off our algorithm, we're going to

490
00:28:58,880 --> 00:29:02,360
say, is this guess too low or too high?

491
00:29:02,360 --> 00:29:03,200
Right.

492
00:29:03,200 --> 00:29:06,600
That's what the algorithm needs.

493
00:29:06,600 --> 00:29:10,600
So that's an if else, a little conditional here.

494
00:29:10,600 --> 00:29:15,960
If the guess squared is less than x, then the guess is too low.

495
00:29:15,960 --> 00:29:16,960
OK.

496
00:29:16,960 --> 00:29:24,280
So if this is this guess squared brings us to somewhere here, right?

497
00:29:24,280 --> 00:29:27,560
Then we know this guess is too low.

498
00:29:27,559 --> 00:29:28,960
What do I do in this case?

499
00:29:28,960 --> 00:29:32,359
What does the algorithm say to do?

500
00:29:32,359 --> 00:29:35,159
Yes.

501
00:29:35,159 --> 00:29:38,759
Other way around.

502
00:29:38,759 --> 00:29:39,759
Yes.

503
00:29:39,759 --> 00:29:40,759
Is it the other way around?

504
00:29:40,759 --> 00:29:41,759
Other way around.

505
00:29:41,759 --> 00:29:42,759
Yes.

506
00:29:42,759 --> 00:29:43,759
So this is too low.

507
00:29:43,759 --> 00:29:46,679
So I definitely don't want anything lower than here, exactly.

508
00:29:46,679 --> 00:29:49,039
So we're going to set our low end point.

509
00:29:49,039 --> 00:29:54,079
If the guess is too low, let's set our low end point to be whatever guess we just made.

510
00:29:54,079 --> 00:29:56,599
Because we know this is too low.

511
00:29:56,599 --> 00:29:59,079
And lower than this is definitely too low.

512
00:29:59,079 --> 00:30:02,799
So I don't care about these.

513
00:30:02,799 --> 00:30:08,199
Else, we don't need an L if because we know the else is the other way around.

514
00:30:08,199 --> 00:30:09,799
Else, our guess was too high.

515
00:30:09,799 --> 00:30:10,799
Right?

516
00:30:10,799 --> 00:30:14,839
So if the next time around, we make a guess here, something like that, then we know we're too

517
00:30:14,839 --> 00:30:16,799
high.

518
00:30:16,799 --> 00:30:20,799
And then we need to set our high end point to be the guess.

519
00:30:20,799 --> 00:30:24,919
Is everyone OK with that so far?

520
00:30:24,920 --> 00:30:25,920
OK.

521
00:30:25,920 --> 00:30:27,840
What remains?

522
00:30:27,840 --> 00:30:33,080
So I've changed one of my boundaries, either my low or my high boundary to be whatever guess

523
00:30:33,080 --> 00:30:34,720
I just made.

524
00:30:34,720 --> 00:30:35,720
What is the next step?

525
00:30:35,720 --> 00:30:43,320
What is this algorithm loop do as is?

526
00:30:43,320 --> 00:30:46,360
It finished doing whatever is inside.

527
00:30:46,360 --> 00:30:52,200
And it goes back and uses the guess and check whether the guess squared minus x is greater

528
00:30:52,200 --> 00:30:55,440
or equal to epsilon.

529
00:30:55,440 --> 00:30:58,279
Have I changed my guess inside this loop yet?

530
00:30:58,279 --> 00:30:59,279
No.

531
00:30:59,279 --> 00:31:02,600
So that's the last step that remains.

532
00:31:02,600 --> 00:31:11,880
Make the guess be the new midpoint using either the changed high or the changed low.

533
00:31:11,880 --> 00:31:12,880
Right?

534
00:31:12,880 --> 00:31:19,440
So each time through my loop, I'm either changing my low to be the guess or changing my high

535
00:31:19,440 --> 00:31:20,440
to be the guess.

536
00:31:20,440 --> 00:31:23,600
So I'm making one of those two changes.

537
00:31:23,600 --> 00:31:27,360
After I've made that change, I need to find the new midpoint.

538
00:31:27,360 --> 00:31:33,880
So if I changed my low, now I need to make my new guess.

539
00:31:33,880 --> 00:31:39,920
And with this new guess, then I'm happy for the wild loop to check it again.

540
00:31:39,920 --> 00:31:44,640
Take that guess squared, see how far away it is from x.

541
00:31:44,640 --> 00:31:51,440
And then it does the changing of the boundary all over again.

542
00:31:51,440 --> 00:31:52,440
And that's it.

543
00:31:52,440 --> 00:31:56,560
There's no other lines of code in here.

544
00:31:56,560 --> 00:31:59,360
So in some sense, there's a little bit of trust.

545
00:31:59,360 --> 00:32:01,680
With this loop, that it does the right thing.

546
00:32:01,680 --> 00:32:08,680
But if you kind of do a little bit of integration in your brain or through the Python tutor, you

547
00:32:08,680 --> 00:32:12,400
see that it actually does it correctly.

548
00:32:12,400 --> 00:32:17,160
So we can just use that same number line.

549
00:32:17,160 --> 00:32:22,680
And let's find approximation to this squared of 36.

550
00:32:22,680 --> 00:32:27,600
The epsilon I made it one, just because I don't want to do so many steps in the Python

551
00:32:27,600 --> 00:32:28,600
tutor.

552
00:32:28,600 --> 00:32:33,759
But you can imagine if it's smaller, it'll just give us a better approximation.

553
00:32:33,759 --> 00:32:38,920
So we're initializing the x, the thing we want to find the square root of, an epsilon,

554
00:32:38,920 --> 00:32:40,720
the low and the high.

555
00:32:41,720 --> 00:32:47,319
And 36 in this particular case, right?

556
00:32:47,319 --> 00:32:53,600
Okay, stepping through, the first guess is half of 36 and zero, so 18.

557
00:32:53,600 --> 00:32:55,600
So here's my guess is 18.

558
00:32:55,600 --> 00:33:00,440
And now we kick off our wild loop by saying what is 18 squared?

559
00:33:00,440 --> 00:33:04,079
Oh, it's pretty big, definitely, but here then 36.

560
00:33:04,079 --> 00:33:09,440
So I'm going to go inside this else because my guess is too high.

561
00:33:09,600 --> 00:33:13,120
So my high becomes this.

562
00:33:13,120 --> 00:33:15,200
And this is so low, right?

563
00:33:15,200 --> 00:33:19,120
I know nothing about the low end at this point.

564
00:33:19,120 --> 00:33:25,559
So then my guess becomes the high plus low, zero plus 18 divided by two, right?

565
00:33:25,559 --> 00:33:27,279
So that's going to be nine.

566
00:33:27,279 --> 00:33:30,559
So you can see my guess has updated to nine.

567
00:33:30,559 --> 00:33:32,480
And now I find the guess squared.

568
00:33:32,480 --> 00:33:33,880
What is nine squared?

569
00:33:33,880 --> 00:33:38,759
Is it still farther than plus or minus 36 plus minus one?

570
00:33:38,759 --> 00:33:41,720
Yes, in fact, it's still way too big.

571
00:33:41,720 --> 00:33:47,440
So now my high, since I know nine is still way too big for my guess,

572
00:33:47,440 --> 00:33:50,440
my high becomes nine.

573
00:33:56,359 --> 00:34:02,799
And then I make a new guess based on zero and nine and the halfway point between there.

574
00:34:02,799 --> 00:34:06,680
So four and a half.

575
00:34:06,680 --> 00:34:08,639
So there it is, updated.

576
00:34:08,639 --> 00:34:16,279
And using this guess, square it and see whether it's less than 36 or greater than 36.

577
00:34:16,279 --> 00:34:18,279
It's less than 36.

578
00:34:18,279 --> 00:34:24,000
So now this 4.5 becomes my low end point, right?

579
00:34:24,000 --> 00:34:29,679
Now I have some information about the low end point like that.

580
00:34:29,679 --> 00:34:35,279
So I know my final answer is within this little interval right here.

581
00:34:35,279 --> 00:34:38,319
And then I'm just going to go quicker because now we're dealing with some

582
00:34:38,320 --> 00:34:40,280
fractions.

583
00:34:40,280 --> 00:34:42,480
My low end point becomes 4.5.

584
00:34:42,480 --> 00:34:46,240
And now I get the midpoint between four and a half and nine.

585
00:34:46,240 --> 00:34:48,360
And that's 675.

586
00:34:48,360 --> 00:34:51,240
And then we keep doing the same process over and over again.

587
00:34:51,240 --> 00:34:58,000
Hopefully you get the idea now where we keep changing this while the guess squared is still

588
00:34:58,000 --> 00:35:02,880
36, great, outside of the boundary of 36 plus or minus one, right?

589
00:35:02,880 --> 00:35:08,280
So if it's less than 35 or greater than 37, keep making guesses.

590
00:35:08,280 --> 00:35:11,920
So we're going to go to probably 60 something there.

591
00:35:11,920 --> 00:35:12,840
I think that's the end.

592
00:35:12,840 --> 00:35:13,840
Yep.

593
00:35:13,840 --> 00:35:21,480
So the guess being 60469 brings us to a guess squared within plus or minus one.

594
00:35:21,480 --> 00:35:23,320
Yes, question.

595
00:35:23,320 --> 00:35:28,360
What about if the guess was correct and then we all have to go to the library?

596
00:35:28,360 --> 00:35:43,160
If the guess was correct, then we would break immediately, right?

597
00:35:43,160 --> 00:35:46,200
Because this becomes, this is false.

598
00:35:46,200 --> 00:35:50,559
Yeah, we don't even enter the while loop.

599
00:35:50,559 --> 00:35:52,559
Yep.

600
00:35:52,559 --> 00:35:53,559
Okay.

601
00:35:53,559 --> 00:35:54,559
Okay.

602
00:35:54,559 --> 00:35:57,039
So let's run the code.

603
00:35:57,039 --> 00:36:03,759
So this is the, this is the bisection search code that I just ran through the Python

604
00:36:03,759 --> 00:36:04,759
tutor.

605
00:36:04,759 --> 00:36:10,199
We looked on the slides, but running with 54,000, 321.

606
00:36:10,199 --> 00:36:17,039
So just to recap, the number of guesses we did with the approximation method was 23 million.

607
00:36:17,039 --> 00:36:24,119
To give us an answer that said the square root of 5,000 is about 233.

608
00:36:24,119 --> 00:36:27,920
And now we run it with our bisection search and I didn't even have to wait.

609
00:36:27,920 --> 00:36:30,839
That took less than a second, right?

610
00:36:30,839 --> 00:36:36,159
Compared to 20 seconds that we had to wait for and it didn't fail.

611
00:36:36,159 --> 00:36:38,599
It gave us very similar answer.

612
00:36:38,599 --> 00:36:44,000
It's this 233.068 is close to the square root of 54,000.

613
00:36:44,000 --> 00:36:50,799
And we did 30 guesses.

614
00:36:50,800 --> 00:36:52,800
That's what I pause.

615
00:36:52,800 --> 00:37:02,440
23 million for the approximation method, 20 seconds later versus 30 guesses less than a second

616
00:37:02,440 --> 00:37:03,440
later.

617
00:37:03,440 --> 00:37:08,080
So it's not like we went from 23 million to 5 million guesses, right?

618
00:37:08,080 --> 00:37:16,760
We went from the order of millions to just tens, which is really, really cool, right?

619
00:37:16,760 --> 00:37:19,760
That's very impressive.

620
00:37:19,760 --> 00:37:22,680
And that's what logarithmic growth means, right?

621
00:37:22,680 --> 00:37:27,040
That's the power of logarithmic growth and kind of recognizing that we can apply bisection

622
00:37:27,040 --> 00:37:32,600
search to these problems, right?

623
00:37:32,600 --> 00:37:38,640
So with approximation method, again, we're decreasing our search space by .0001 with each

624
00:37:38,640 --> 00:37:40,000
guess.

625
00:37:40,000 --> 00:37:45,640
But with the bisection search, we're decreasing our search space by half with each guess,

626
00:37:45,640 --> 00:37:46,640
right?

627
00:37:46,639 --> 00:37:53,279
If we had, however many things to search for in the book, we had 400 pages to search

628
00:37:53,279 --> 00:37:54,279
through, right?

629
00:37:54,279 --> 00:37:58,839
With our first guess, we now only have 200 pages to search through.

630
00:37:58,839 --> 00:38:02,000
With the second guess, we only have 100 pages to search through.

631
00:38:02,000 --> 00:38:05,719
With the next guess, we only have 50 pages to search through.

632
00:38:05,719 --> 00:38:10,920
And the idea of bisection search, just that it's logarithmic, comes from the fact that

633
00:38:10,920 --> 00:38:17,840
we have to ask ourselves how many guesses do we make until we have only, for example, one

634
00:38:17,840 --> 00:38:20,280
page left to search through for the money?

635
00:38:20,280 --> 00:38:23,639
Or how many guesses do we have to make till we are with an epsilon?

636
00:38:23,639 --> 00:38:30,159
There's only that one, we reach the one value that gives us with an epsilon, okay?

637
00:38:30,159 --> 00:38:35,760
And so this came, many guesses means that we've divided our search space by 2 to the power

638
00:38:35,760 --> 00:38:39,000
of k many times, okay?

639
00:38:39,000 --> 00:38:41,599
And that's when we've converged on the answer.

640
00:38:41,599 --> 00:38:47,719
And so to converge on the answer means you've divided your search space by 2 k times, so

641
00:38:47,719 --> 00:38:51,360
n divided by 2 to the power k equals 1.

642
00:38:51,360 --> 00:38:57,119
You have reached your one answer, the money's at this page, the student is sitting there,

643
00:38:57,119 --> 00:39:02,440
or we have come within 0.01 of the actual answer.

644
00:39:02,440 --> 00:39:05,840
And so when this is true, n is equal to 2 to the k.

645
00:39:05,840 --> 00:39:12,200
And what we want is to kind of solve this problem in terms of n, so k is equal to log of

646
00:39:12,200 --> 00:39:17,440
n, and that's where the logarithmic growth comes from for this particular problem, okay?

647
00:39:17,440 --> 00:39:22,480
So in terms of loops, yes, it took us k times through the while loop to figure out the

648
00:39:22,480 --> 00:39:29,200
answer, but in terms of the size of our search space, it took us log of n times to get to

649
00:39:29,200 --> 00:39:30,720
our answer.

650
00:39:30,720 --> 00:39:32,800
Okay.

651
00:39:32,800 --> 00:39:35,880
So let's look at a couple of nuances of the code we just wrote.

652
00:39:35,880 --> 00:39:45,080
So if we try to run the code for values between 0 and 1, what actually happens?

653
00:39:45,080 --> 00:39:57,280
So if we run it with, for example, what's the square root of 0.5?

654
00:39:57,280 --> 00:39:59,960
It's running.

655
00:39:59,960 --> 00:40:01,280
It's still running.

656
00:40:01,280 --> 00:40:03,680
I'm pretty sure it should have given us an answer by now.

657
00:40:03,680 --> 00:40:06,200
So let's just stop it.

658
00:40:06,200 --> 00:40:09,040
We've entered an infinite loop.

659
00:40:09,040 --> 00:40:13,200
So in that case, let's see what actually it's printing out.

660
00:40:13,200 --> 00:40:17,960
So when you've entered an infinite loop, it's time to put some print statements.

661
00:40:17,960 --> 00:40:22,880
Best place to put print statements is within the loop itself and just print out some values

662
00:40:22,880 --> 00:40:24,560
for things.

663
00:40:24,560 --> 00:40:29,360
So here I have this print statement where we print out what, oops, let me get that out

664
00:40:29,360 --> 00:40:30,360
of the way.

665
00:40:30,360 --> 00:40:34,000
So what the low value is.

666
00:40:34,000 --> 00:40:37,440
So we've got low equals, and actually I don't need to convert this to string.

667
00:40:37,440 --> 00:40:39,559
It should just be low.

668
00:40:39,559 --> 00:40:47,079
And, oops, and then the high value and then the guess itself.

669
00:40:47,079 --> 00:40:51,360
Oops, like that.

670
00:40:51,360 --> 00:40:57,800
So if we run it, that's what we get.

671
00:40:57,800 --> 00:41:03,080
And it looks like it's just repeating, repeating over and over again.

672
00:41:03,080 --> 00:41:10,960
So what happens when I'm looking for a square root of a value between 0 and 1?

673
00:41:10,960 --> 00:41:16,280
So this is my 0 to x.

674
00:41:16,280 --> 00:41:26,120
But if x is between 0 and 1, the square root of x, it's bigger than x itself, right?

675
00:41:26,119 --> 00:41:29,799
So the square root of 0.5 is bigger than 0.5.

676
00:41:29,799 --> 00:41:35,519
It's not smaller than 0.5, right?

677
00:41:35,519 --> 00:41:42,719
So what this program is doing is it's making its initial guess, right?

678
00:41:42,719 --> 00:41:48,199
High plus low divided by 2, so 0.

679
00:41:48,199 --> 00:41:52,000
If my initial guess is 0 to x, it's making an initial guess there.

680
00:41:52,000 --> 00:41:57,559
And then at some point it just gets stuck in this loop because the low becomes 0.5,

681
00:41:57,559 --> 00:42:01,639
after our first guess, the high becomes 0.5 as well.

682
00:42:01,639 --> 00:42:06,920
And the halfway between 0.5 and 0.5 is just 0.5.

683
00:42:06,920 --> 00:42:11,320
So now it's just reassigning the new guess to itself over and over again.

684
00:42:15,920 --> 00:42:18,320
So we need to make a fix to that.

685
00:42:18,320 --> 00:42:21,559
And I'm going to have you guys make the fix to that.

686
00:42:21,559 --> 00:42:30,159
So you don't need to account for both cases, but change the endpoints for this particular

687
00:42:30,159 --> 00:42:36,119
problem such that it works with values of x between 0 and 1.

688
00:42:36,119 --> 00:42:41,360
So if we're trying to find the square root of a decimal number between 0 and 1, what

689
00:42:41,360 --> 00:42:45,119
are the endpoints that you want to choose for the code to now work?

690
00:42:45,119 --> 00:42:47,880
And the code is exactly the same as before.

691
00:42:47,880 --> 00:42:50,079
So all you need to do is choose different endpoints.

692
00:42:50,079 --> 00:42:51,079
Yes.

693
00:42:51,440 --> 00:42:56,360
I just wanted to see why it got stuck with how the high endpoints are going to be.

694
00:42:56,360 --> 00:42:58,119
Oh, OK.

695
00:42:58,119 --> 00:43:00,679
We can run it with the Python tutor.

696
00:43:00,679 --> 00:43:05,559
And so for this is 0.5.

697
00:43:05,559 --> 00:43:09,039
So basically we've made our guess like that.

698
00:43:09,039 --> 00:43:12,440
And then we're changing our guesses.

699
00:43:12,440 --> 00:43:19,519
And so you can see that it's actually changing the low and the high.

700
00:43:19,519 --> 00:43:24,159
And it originally did the right thing, right?

701
00:43:24,159 --> 00:43:28,239
Like the first few guesses, it's making the changes appropriately.

702
00:43:28,239 --> 00:43:31,159
But then the floating point errors come into play.

703
00:43:31,159 --> 00:43:39,519
We're at some point, this 0.4999 and this low, it keeps dividing, is just going to become

704
00:43:39,519 --> 00:43:41,360
0.5.

705
00:43:41,360 --> 00:43:46,880
And 0.5 is a power of two, remember, as floating points are.

706
00:43:46,880 --> 00:43:53,240
And in this particular case, once it reaches the 0.5, then floating point errors don't come

707
00:43:53,240 --> 00:43:57,240
into play anymore because that 0.5 can just be represented exactly.

708
00:43:57,240 --> 00:44:00,800
So I'm going to have to probably hit next for quite a few more times.

709
00:44:00,800 --> 00:44:06,079
But you can kind of see where that's getting that 0.5 from.

710
00:44:06,079 --> 00:44:08,480
Does that help?

711
00:44:08,480 --> 00:44:15,360
Do that's the floating point error just comes with the skip?

712
00:44:15,360 --> 00:44:21,519
That and also the fact that we didn't really account, this code doesn't actually work correctly

713
00:44:21,519 --> 00:44:22,519
with these values.

714
00:44:22,519 --> 00:44:28,800
So it enters an infinite loop because of the floating point error towards the end.

715
00:44:28,800 --> 00:44:32,519
And that causes us to see just 0.5, 0.5, 0.5.

716
00:44:32,519 --> 00:44:37,960
But if we were doing it to like infinite precision, you would start to see numbers that approach

717
00:44:37,960 --> 00:44:41,400
0.5 but never quite get there.

718
00:44:41,400 --> 00:44:47,200
But I think our code, the reason we saw 0.5 here is because it already ran like 100 times,

719
00:44:47,200 --> 00:44:48,039
200 times.

720
00:44:48,039 --> 00:44:52,840
And so now we're just seeing the tail end of it.

721
00:44:52,840 --> 00:44:53,360
Yeah.

722
00:44:53,360 --> 00:45:11,920
So here is the code for fixing that.

723
00:45:11,920 --> 00:45:15,000
So what do you guys think the low end point should be and the high end point should be if

724
00:45:15,000 --> 00:45:21,519
we wanted this to work with values between 0 and 1?

725
00:45:21,519 --> 00:45:32,159
So if this is our x and we know x is less than 1 greater than 0, the square root of x is

726
00:45:32,159 --> 00:45:34,320
going to be somewhere up here.

727
00:45:34,320 --> 00:45:38,759
And we know the maximum place it will be is 1.

728
00:45:38,759 --> 00:45:44,840
And what's the minimum place that the square root of x could be for values within this range?

729
00:45:44,840 --> 00:45:47,199
I heard, yeah, x.

730
00:45:47,199 --> 00:45:51,359
So this is the minimum value for the square root of x.

731
00:45:51,359 --> 00:45:57,480
And this is the maximum value for the square root of x.

732
00:45:57,480 --> 00:46:04,919
So all we need to do is say the low is equal to x and the high is equal to 1.

733
00:46:04,919 --> 00:46:09,079
And then I think this code should work.

734
00:46:09,079 --> 00:46:17,079
Yeah.

735
00:46:17,079 --> 00:46:18,400
OK.

736
00:46:18,400 --> 00:46:20,799
And so I did just that down here.

737
00:46:20,799 --> 00:46:28,159
So here is the code with actually allowing for the user to give us any value, not just between

738
00:46:28,159 --> 00:46:32,039
0 and 1 or greater than 1.

739
00:46:32,039 --> 00:46:41,719
So all I did here to make the code work and be robust is add an if else right at the beginning.

740
00:46:41,719 --> 00:46:45,319
So I allow the user to give me whatever x they'd like.

741
00:46:45,320 --> 00:46:52,880
But then I do a little check here that says if the x is greater or equal to 1, then my

742
00:46:52,880 --> 00:46:55,720
low and high end points become 0 to x, right?

743
00:46:55,720 --> 00:46:59,640
Because I know the square root is going to be within that boundary.

744
00:46:59,640 --> 00:47:06,519
But then otherwise if the user gave me a value that's less than 1, and I guess I should

745
00:47:06,519 --> 00:47:13,160
do greater than 0, just in case the user gives me negative numbers, then I would choose

746
00:47:13,159 --> 00:47:17,159
the boundary for the low to be x and the high to be 1.

747
00:47:17,159 --> 00:47:19,679
So just a very simple if else here.

748
00:47:19,679 --> 00:47:24,639
And otherwise the rest of the code works just the same.

749
00:47:24,639 --> 00:47:27,639
OK.

750
00:47:27,639 --> 00:47:28,639
Yeah.

751
00:47:28,639 --> 00:47:37,480
So this is exactly what we just saw in the slides, right?

752
00:47:37,480 --> 00:47:43,079
And if and an else where I choose the end points accordingly.

753
00:47:43,079 --> 00:47:45,239
So I make questions about this code.

754
00:47:45,239 --> 00:47:47,319
Does it make sense?

755
00:47:47,319 --> 00:47:48,319
Yeah.

756
00:47:48,319 --> 00:47:53,480
I make the low equal to 0 and just don't give me the same answer for square root of 0.

757
00:47:53,480 --> 00:47:56,840
Oh, if you make the low equal to 0 here.

758
00:47:56,840 --> 00:48:00,039
Oops.

759
00:48:00,039 --> 00:48:01,880
I think that's fine, right?

760
00:48:01,880 --> 00:48:06,880
Because then that means you're making your low lower than it needs to be.

761
00:48:06,880 --> 00:48:11,799
And so your first guess is basically the halfway point x itself.

762
00:48:11,800 --> 00:48:17,600
And then it fixes, I think it just fixes it.

763
00:48:17,600 --> 00:48:19,800
It goes through one extra guess, exactly.

764
00:48:19,800 --> 00:48:22,039
And that's again the power of bisection search, right?

765
00:48:22,039 --> 00:48:31,120
If for values greater than 1, if we made our high boundary be 2x, it would just make one

766
00:48:31,120 --> 00:48:36,480
extra guess to bring us to x and then below and so on and so on.

767
00:48:36,480 --> 00:48:39,000
So one extra guess is nothing to the computer, right?

768
00:48:42,800 --> 00:48:47,880
OK, so a couple observations for bisection search.

769
00:48:47,880 --> 00:48:57,640
So it takes a significantly less amount of time to solve problems using bisection search

770
00:48:57,640 --> 00:49:00,039
than it does using the approximation method.

771
00:49:00,039 --> 00:49:04,560
And it gives us an approximation to, in this case, the square root of a number.

772
00:49:04,560 --> 00:49:11,360
That was pretty just as good as the approximation method itself.

773
00:49:11,360 --> 00:49:14,640
When we did the book example, and that's kind of the second point here, it might be easier

774
00:49:14,640 --> 00:49:21,840
to illustrate, when we did the book example, the very first guess eliminated more number of

775
00:49:21,840 --> 00:49:25,640
pages than later guesses, right?

776
00:49:25,640 --> 00:49:30,680
Our first guess eliminated 200 pages right off the bat, right?

777
00:49:30,680 --> 00:49:34,920
Our second guess only eliminated 100 pages, our third only 50.

778
00:49:34,920 --> 00:49:39,960
And at some point you can imagine that we're only eliminating something like four pages.

779
00:49:39,960 --> 00:49:43,360
And then we're eliminating only two pages at a time, right?

780
00:49:43,360 --> 00:49:44,920
The more guesses you make.

781
00:49:44,920 --> 00:49:51,159
So it feels more dramatic at first, but then it kind of dies down.

782
00:49:51,159 --> 00:49:53,519
But that's just logarithmic growth, right?

783
00:49:53,519 --> 00:49:58,800
It feels dramatic at first, but then as you get closer and closer to the actual approximation,

784
00:49:58,800 --> 00:50:04,840
the actual answer, you're not making as big of steps or you're not making such dramatic

785
00:50:04,840 --> 00:50:07,920
cuts to the book.

786
00:50:07,920 --> 00:50:13,639
And so the bisection search algorithm is really awesome, but again, there are some limitations

787
00:50:13,639 --> 00:50:15,559
to when you can use it, right?

788
00:50:15,559 --> 00:50:19,280
You have to have your search space have endpoints.

789
00:50:19,280 --> 00:50:21,760
That search space needs to be ordered, right?

790
00:50:21,760 --> 00:50:26,119
Alphabetically, in order by, you know, in America, whatever.

791
00:50:26,119 --> 00:50:28,200
And you have to be able to get the feedback.

792
00:50:28,200 --> 00:50:30,200
Is this guess too low or too high, right?

793
00:50:30,200 --> 00:50:33,880
If you don't have those, then you can't use bisection search for this.

794
00:50:33,880 --> 00:50:34,880
Okay.

795
00:50:34,880 --> 00:50:38,280
I want to give you a couple moments to work on this code by yourself.

796
00:50:38,280 --> 00:50:44,240
So this is you writing the bisection search algorithm to find the cube root of positive

797
00:50:44,240 --> 00:50:45,240
cubes.

798
00:50:45,240 --> 00:50:48,960
So don't worry about, you know, negatives or whatever, just assume the user gives you a positive

799
00:50:48,960 --> 00:50:50,160
cube.

800
00:50:50,160 --> 00:50:52,920
I'm initializing the values for you here.

801
00:50:52,920 --> 00:50:55,920
So the cube is 27.

802
00:50:55,920 --> 00:50:59,039
I want you to be within plus or minus 0.01, right?

803
00:50:59,039 --> 00:51:03,920
So your guess squared should be within plus or minus 0.01 of 27.

804
00:51:03,920 --> 00:51:09,880
Start with a low of 0 and a high of cube and write the rest of the algorithm.

805
00:51:09,880 --> 00:51:11,720
Don't copy and paste.

806
00:51:11,720 --> 00:51:14,119
Well, we did for a square.

807
00:51:14,119 --> 00:51:17,039
Try to write it all by yourself all over again.

808
00:51:17,039 --> 00:51:18,960
In A, give you practice coding.

809
00:51:18,960 --> 00:51:22,559
B, make sure that you understand the actual steps of the algorithm.

810
00:51:22,559 --> 00:51:23,880
You don't need to write it top to bottom.

811
00:51:23,880 --> 00:51:28,440
You can write the inside of the Y loop first or whatever you, whatever feels comfortable

812
00:51:28,440 --> 00:51:29,440
for you.

813
00:51:29,440 --> 00:51:36,320
As long as you try to write it all by yourself to try to make this coding second nature, I'm

814
00:51:36,320 --> 00:51:37,320
all for that.

815
00:51:37,320 --> 00:51:39,920
So I'll give you a couple of moments to do that and then we can write it together.

816
00:51:39,920 --> 00:51:46,639
But basically it's going to be almost the same as what we've been seeing on the slides.

817
00:51:46,639 --> 00:51:47,840
All right.

818
00:51:47,840 --> 00:51:51,639
Does anyone have a start for me?

819
00:51:51,639 --> 00:51:53,480
What do you want to start with?

820
00:51:53,480 --> 00:51:55,840
Do you want to do a Y loop or a four loop?

821
00:51:55,840 --> 00:51:56,840
Let's ask that.

822
00:51:57,840 --> 00:51:58,840
A Y loop.

823
00:51:58,840 --> 00:51:59,840
Okay.

824
00:51:59,840 --> 00:52:01,840
Let's do Y.

825
00:52:01,840 --> 00:52:05,840
And what's the condition going to be for the approximation?

826
00:52:05,840 --> 00:52:09,840
Oh, I needed to find a guess.

827
00:52:09,840 --> 00:52:10,840
Perfect.

828
00:52:10,840 --> 00:52:11,840
Okay.

829
00:52:11,840 --> 00:52:16,840
What should my guess be?

830
00:52:16,840 --> 00:52:17,840
Yes.

831
00:52:17,840 --> 00:52:22,840
High plus low over two.

832
00:52:22,840 --> 00:52:23,840
Okay.

833
00:52:23,840 --> 00:52:31,000
I have my initial guess and then what is happening with my loop?

834
00:52:31,000 --> 00:52:52,840
I want to keep doing things as long as guess to the third minus cube.

835
00:52:52,840 --> 00:52:53,840
Yep.

836
00:52:53,840 --> 00:53:00,840
Absolute value of guess.

837
00:53:00,840 --> 00:53:01,840
Yep.

838
00:53:01,840 --> 00:53:03,840
Okay.

839
00:53:03,840 --> 00:53:04,840
Exactly.

840
00:53:04,840 --> 00:53:10,840
We want it to be larger, larger equal whatever you'd like.

841
00:53:10,840 --> 00:53:11,840
Absolute.

842
00:53:11,840 --> 00:53:12,840
Yep.

843
00:53:12,840 --> 00:53:15,840
So while I'm still too far away.

844
00:53:15,840 --> 00:53:20,840
You should try to deny it in the last two.

845
00:53:20,840 --> 00:53:21,840
No.

846
00:53:21,840 --> 00:53:23,840
Because then we're comparing floats.

847
00:53:23,840 --> 00:53:29,840
We want to be farther.

848
00:53:29,840 --> 00:53:30,840
Right.

849
00:53:30,840 --> 00:53:37,840
Because if it's not equal to, you only stop when it becomes exactly 0.01 away.

850
00:53:37,840 --> 00:53:38,840
Right.

851
00:53:38,840 --> 00:53:40,840
And wait.

852
00:53:40,840 --> 00:53:41,840
See, yeah.

853
00:53:41,840 --> 00:53:43,840
So we can draw.

854
00:53:43,840 --> 00:53:45,840
It's easier if we draw.

855
00:53:45,840 --> 00:53:49,840
This is our x.

856
00:53:49,840 --> 00:53:52,840
And this is epsilon, right?

857
00:53:52,840 --> 00:53:56,840
And our guess cubed.

858
00:53:56,840 --> 00:54:03,840
If it's equal to, that means g cubed is exactly here.

859
00:54:03,840 --> 00:54:05,840
I guess, or exactly here.

860
00:54:05,840 --> 00:54:07,840
Oh, it's only a ton of bounds.

861
00:54:07,840 --> 00:54:08,840
Yes.

862
00:54:08,840 --> 00:54:13,840
You want to be out of bounds to still be making guesses.

863
00:54:13,840 --> 00:54:15,840
Yep.

864
00:54:15,840 --> 00:54:20,840
What's our process for making a new guess using bisection search?

865
00:54:20,840 --> 00:54:21,840
So we have a guess.

866
00:54:21,840 --> 00:54:23,840
And now what do we need to do?

867
00:54:23,840 --> 00:54:26,840
We need to decide whether it's too lower or too high.

868
00:54:26,840 --> 00:54:27,840
Right.

869
00:54:27,840 --> 00:54:30,840
That's what the bisection search says.

870
00:54:30,840 --> 00:54:37,840
So guess, or guess cubed is too lower or too high.

871
00:54:37,840 --> 00:54:39,840
Exactly.

872
00:54:39,840 --> 00:54:46,840
If the guess cubed,

873
00:54:46,840 --> 00:54:51,840
yep, larger than cube, then our guess is too high.

874
00:54:51,840 --> 00:54:54,840
So I can even make a note for myself here.

875
00:54:54,840 --> 00:54:56,840
Guess too high.

876
00:54:56,840 --> 00:54:57,840
Right.

877
00:54:57,840 --> 00:55:01,840
So if it's too high, I know anything bigger than it.

878
00:55:01,840 --> 00:55:02,840
I don't want.

879
00:55:02,840 --> 00:55:08,840
So I need to set my high boundary or my low end point.

880
00:55:09,840 --> 00:55:10,840
Yeah.

881
00:55:10,840 --> 00:55:12,840
My high end point becomes my guess.

882
00:55:12,840 --> 00:55:13,840
Right.

883
00:55:13,840 --> 00:55:18,840
I'm resetting my high to be the guess because I know that guess is too big anyway.

884
00:55:18,840 --> 00:55:25,840
Else, opposite, my low end point is my guess.

885
00:55:25,840 --> 00:55:27,840
Am I done?

886
00:55:27,840 --> 00:55:28,840
Nope.

887
00:55:28,840 --> 00:55:29,840
Okay.

888
00:55:29,840 --> 00:55:32,840
What do I need to do?

889
00:55:32,840 --> 00:55:34,840
I need to redefine my guess.

890
00:55:34,840 --> 00:55:35,840
Yep.

891
00:55:35,840 --> 00:55:37,840
If I don't redefine my guess, my code has an infinite loop.

892
00:55:37,840 --> 00:55:48,840
So my guess is exactly as before, high plus low divided by two.

893
00:55:48,840 --> 00:55:52,840
And then at the end, same indentation level as the while loop,

894
00:55:52,840 --> 00:55:54,840
we can just print our guess.

895
00:55:54,840 --> 00:56:06,840
Because I know I'm going to break as soon as I become within or equal to epsilon.

896
00:56:06,840 --> 00:56:08,840
That's what we're expecting.

897
00:56:08,840 --> 00:56:09,840
Right.

898
00:56:09,840 --> 00:56:12,840
And it's fine that it's 3.000-0 something.

899
00:56:12,840 --> 00:56:13,840
Right.

900
00:56:13,840 --> 00:56:17,840
I wouldn't expect it to be exactly three, even though we as humans know it is three.

901
00:56:17,840 --> 00:56:22,840
Because the algorithm says to stop as soon as we came within epsilon.

902
00:56:22,840 --> 00:56:23,840
Right.

903
00:56:23,840 --> 00:56:26,840
Yes, we can find a better answer if we keep going.

904
00:56:26,840 --> 00:56:28,840
But that's not what we asked the code to do.

905
00:56:28,840 --> 00:56:33,840
We asked the code to stop as soon as we came within plus or minus epsilon of this.

906
00:56:34,840 --> 00:56:35,840
Right.

907
00:56:35,840 --> 00:56:44,840
It does not matter if you put the high in the effort, yeah, for the low.

908
00:56:44,840 --> 00:56:46,840
I mean, as long as you're consistent, right?

909
00:56:46,840 --> 00:56:48,840
If it's greater than, you have to reassign the high.

910
00:56:48,840 --> 00:56:50,840
If this is less than, you reassign the low.

911
00:56:50,840 --> 00:56:51,840
Yep.

912
00:56:56,840 --> 00:56:57,840
Okay.

913
00:56:58,840 --> 00:57:07,840
Okay. So we're going to look at one more algorithm to figure out an approximation to the square root of a number.

914
00:57:07,840 --> 00:57:13,840
Just to show you that there is something else, yet another thing.

915
00:57:13,840 --> 00:57:18,840
And this particular algorithm only works to find roots of a polynomial.

916
00:57:18,840 --> 00:57:21,840
Okay. So this is a Newton-Raphson algorithm.

917
00:57:21,840 --> 00:57:23,840
And basically, we don't need to prove this.

918
00:57:24,840 --> 00:57:32,840
But basically, they showed that if you have a polynomial of this form,

919
00:57:32,840 --> 00:57:40,840
so, you know, a x squared plus b x plus c, or a x to the power of four plus b x cubed plus c x plus d, something like that.

920
00:57:40,840 --> 00:57:46,840
If you have a polynomial like that, then you can start with a guess.

921
00:57:46,840 --> 00:57:49,840
Any guess you'd like.

922
00:57:49,840 --> 00:57:59,840
And you can come up with a better approximation to the square root by saying a new guess.

923
00:57:59,840 --> 00:58:03,840
So the new better approximation for the guess is whatever your current guess is,

924
00:58:03,840 --> 00:58:09,840
minus that polynomial evaluated at the guess, so replace x with your guess,

925
00:58:09,840 --> 00:58:13,840
divided by the derivative of that polynomial evaluated at the guess.

926
00:58:13,840 --> 00:58:18,840
So get the derivative and replace x with your guess.

927
00:58:18,840 --> 00:58:25,840
This should sound familiar because lecture two, we actually implemented just this part.

928
00:58:25,840 --> 00:58:29,840
Remember when we were learning about expressions and combining them together?

929
00:58:29,840 --> 00:58:34,840
I mentioned this algorithm and I said we're not going to be writing the whole algorithm today,

930
00:58:34,840 --> 00:58:39,840
but we are going to be implementing the part that makes a new better guess for the square root of a number.

931
00:58:39,840 --> 00:58:44,840
Well, today we're actually going to take that line, put a wrapper around it,

932
00:58:44,840 --> 00:58:48,840
the wrapper being a little loop that makes successive guesses,

933
00:58:48,840 --> 00:58:58,840
better and better guesses using guesses that we have just made to get us close to the approximation for a square root.

934
00:58:58,840 --> 00:59:01,840
So let's start with this.

935
00:59:01,840 --> 00:59:08,840
So the idea here for finding the square root of a number is to kind of realize that if we want to find the square root of,

936
00:59:08,840 --> 00:59:19,840
let's say, 24, that's essentially us applying this algorithm to the polynomial that says that's x squared minus 24.

937
00:59:19,840 --> 00:59:25,840
Okay, because if x squared minus 24 equals zero, then basically x squared is equal to 24,

938
00:59:25,840 --> 00:59:30,840
and to solve for x means that we are looking for the square root of 24.

939
00:59:30,840 --> 00:59:37,840
So we can try to apply this Newton-Raphson method to find an approximation to the square root of a number,

940
00:59:37,840 --> 00:59:42,840
by simply solving using their method to solve, applied to this polynomial,

941
00:59:42,840 --> 00:59:47,840
x squared minus whatever value you want to find the square root of.

942
00:59:47,840 --> 00:59:53,840
Okay, so just to give you a little intuition for how this works is, so we have an initial guess,

943
00:59:53,840 --> 01:00:02,840
let's say it's this x1 right here, and you take f of x1, that brings you, whoops, that brings you up here,

944
01:00:02,840 --> 01:00:09,840
you find the derivative over here, and you follow the tangent line to the x-axis for the next guess,

945
01:00:09,840 --> 01:00:11,840
and you repeat the process.

946
01:00:11,840 --> 01:00:20,840
Evaluate this guess to get f of that guess, this is the tangent line, follow it down to the x-axis for a better guess,

947
01:00:20,840 --> 01:00:25,840
and you keep doing this until you get as close as you'd like to the square root here.

948
01:00:25,840 --> 01:00:31,840
Okay, so just for completeness sake, since I did link it, this is what it looks like, that's your initial guess,

949
01:00:31,840 --> 01:00:34,840
that's your f, that's your tangent line, that gives you the next guess.

950
01:00:34,840 --> 01:00:40,840
Evaluate that, get your tangent line, get your next guess, evaluate that, get the tangent line,

951
01:00:40,840 --> 01:00:44,840
there's your next guess, and it basically works for any polynomial.

952
01:00:44,840 --> 01:00:52,840
Okay, but we are applying it to just finding the square root of a number, so our polynomial is pretty simple.

953
01:00:52,840 --> 01:00:58,840
So if we want to find the square root of k, the polynomial we're interested in here is x squared minus k.

954
01:00:58,840 --> 01:01:02,840
The derivative, I think, have you guys done derivatives yet?

955
01:01:02,840 --> 01:01:04,840
Right, okay, good.

956
01:01:04,840 --> 01:01:08,840
The derivative of x squared minus k is just 2x, right?

957
01:01:08,840 --> 01:01:13,840
And then we can initialize our guess to be whatever we'd like,

958
01:01:13,840 --> 01:01:20,840
and then all we need to do for a better guess than the one we currently have is to take our current guess,

959
01:01:20,840 --> 01:01:27,840
minus that guess plugged into the polynomial of interest, so g squared minus k,

960
01:01:27,840 --> 01:01:32,840
divided by the derivative with the guess plugged in 2 times g.

961
01:01:32,840 --> 01:01:39,840
Okay, and if we repeat this many, many, many times, this will eventually get us to a nice approximation for the square root of the number.

962
01:01:39,840 --> 01:01:42,840
And this is the code.

963
01:01:42,840 --> 01:01:46,840
It's even simpler than the vice-section search code.

964
01:01:46,840 --> 01:01:54,840
So let's say we want to be within plus or minus 0.01 of 24 with our guess, right?

965
01:01:55,840 --> 01:02:01,840
We can start with any guess we'd like, but I guess the reasonable guess is to just take that k,

966
01:02:01,840 --> 01:02:04,840
the thing you want to find the square root of divide by 2.

967
01:02:04,840 --> 01:02:07,840
Once again, we can keep track of how many guesses we do.

968
01:02:07,840 --> 01:02:15,840
And surprise, the while loop condition for while we keep making guesses is exactly the same as what we've seen before,

969
01:02:15,840 --> 01:02:19,840
in approximation method and in vice-section search method.

970
01:02:19,840 --> 01:02:25,840
As long as we're outside this plus or minus epsilon boundary, keep making guesses,

971
01:02:25,840 --> 01:02:28,840
because I'm not happy with my guess, right?

972
01:02:28,840 --> 01:02:33,840
So here, while the absolute value of guess squared minus k,

973
01:02:33,840 --> 01:02:37,840
k being the thing we want to find the square root of, is bigger than epsilon, right?

974
01:02:37,840 --> 01:02:44,840
So if we're farther away in both ends, we keep track of how many guesses we've done and make our new guess.

975
01:02:44,840 --> 01:02:47,840
So this is what's different than by section or approximation.

976
01:02:47,840 --> 01:02:50,840
The guess is done by the Newton-Raphson method.

977
01:02:50,840 --> 01:02:57,840
And this line right here is what we wrote in lecture 2 or 3, right?

978
01:02:57,840 --> 01:03:05,840
Our new guess is our old guess minus the guess evaluated at x, so guess squared minus k,

979
01:03:05,840 --> 01:03:11,840
divided by the derivative evaluated at guess, 2 times guess.

980
01:03:11,840 --> 01:03:17,840
And that's it. The loop takes care of the rest, and it'll keep making new guesses until it comes within plus or minus epsilon.

981
01:03:17,840 --> 01:03:21,840
So that's our k, that's our function, right?

982
01:03:21,840 --> 01:03:26,840
That's f of guess, and that's f prime of guess.

983
01:03:26,840 --> 01:03:32,840
So let's run it.

984
01:03:32,840 --> 01:03:39,840
Here it is.

985
01:03:39,840 --> 01:03:47,840
So we made four guesses to find the square root of 24 is about 4.9, just pretty good.

986
01:03:47,840 --> 01:03:49,840
We came within 0.01.

987
01:03:49,840 --> 01:03:57,840
And if we try 5, 4, 3, 2, 1, our favorite number so far in this class, we only did 10 guesses.

988
01:03:57,840 --> 01:04:02,840
And it gave us just as good an approximation as by section search, and that,

989
01:04:02,840 --> 01:04:10,840
predictably, the long approximation method.

990
01:04:10,840 --> 01:04:14,840
Yes.

991
01:04:14,840 --> 01:04:17,840
Why is the guess k over 2? It can be anything you want.

992
01:04:17,840 --> 01:04:22,840
We just started with something reasonable, that's a function of k.

993
01:04:22,840 --> 01:04:28,840
Yeah, it can be 100, it can be whatever you'd want to do.

994
01:04:28,840 --> 01:04:35,840
Because the algorithm will work no matter what.

995
01:04:35,840 --> 01:04:41,840
So that's awesome, there's less guesses, but this is a pretty limiting algorithm, right?

996
01:04:41,840 --> 01:04:45,840
You can only use it to find square roots of a particular value.

997
01:04:45,840 --> 01:04:54,840
We can't use it, you know, apply it this algorithm to finding, you know, the person in the middle of the room, or, you know, something like that, right?

998
01:04:54,840 --> 01:05:00,840
It's really specific to this particular problem.

999
01:05:00,840 --> 01:05:10,840
So a little wrap up before we go on to just introducing the next lecture is we talked about iteration, right?

1000
01:05:10,840 --> 01:05:14,840
That was kind of the big thing that we added after conditional.

1001
01:05:14,840 --> 01:05:21,840
So finding a way to repeat certain lines of code to do something useful for us.

1002
01:05:21,840 --> 01:05:24,840
And we looked at guess and check methods.

1003
01:05:24,840 --> 01:05:30,840
Now I guess I'm putting all the methods we saw under guess and check, because they're kind of all guess and check, right?

1004
01:05:30,840 --> 01:05:38,840
We're guessing a value, and we're checking whether that value is exact or within some epsilon of what we want to be, right?

1005
01:05:38,840 --> 01:05:44,840
And all these guess and check methods have the same kind of three things associated with them.

1006
01:05:44,840 --> 01:05:49,840
There's some sort of loop, right? There's something that you need to do over and over again.

1007
01:05:49,840 --> 01:05:55,840
We need some way to generate the guesses, and that's where things are different between the different algorithms.

1008
01:05:55,840 --> 01:06:02,840
And then we need some way to check that the guess is right, or within some epsilon, or something like that, and then a way to

1009
01:06:02,840 --> 01:06:04,840
for us to continue making guesses.

1010
01:06:04,840 --> 01:06:13,840
So we saw exhaustive enumeration, again, the original guess and check method, where we basically had integers or some set values that we wanted to check.

1011
01:06:13,840 --> 01:06:19,840
It was exhaustive, so we knew exactly how many values we would have to iterate over.

1012
01:06:19,840 --> 01:06:32,840
Approximation algorithms allowed us to have smaller increments, and we were able to search for approximations to square roots or cube roots or whatever problem we were trying to solve.

1013
01:06:32,840 --> 01:06:45,840
By section search, we saw was an improvement over approximation methods, but only for problems that had an ordering property, and for problems that you could figure out whether your guesses were too high or too low.

1014
01:06:45,840 --> 01:06:52,840
If you can't have those, then you can't apply by section search, so you're stuck with an approximation algorithm or something else.

1015
01:06:52,840 --> 01:07:07,840
And then this Newton-Raphson was kind of the last thing we saw. It's very specific algorithm for finding square roots of values, but still valuable in showcasing this looping construct, checking for something, and then making a new guess.

1016
01:07:07,840 --> 01:07:15,840
This is basically a summary of what I just said also, so we don't need to go over it.

1017
01:07:15,840 --> 01:07:27,840
Are there any questions about these three algorithms? Do they make sense? Hopefully the coding practice kind of helped a little bit during lectures? Any questions? No? Okay.

1018
01:07:27,840 --> 01:07:36,840
So in the last five or so minutes, I want to introduce the next, the motivation for the next topic we're going to talk about.

1019
01:07:36,840 --> 01:07:52,840
So far, we've basically learned how to write a bunch of code. We learned expressions, we learned variables, we learned conditionals, we learned loops, and loops as a way to add control flow to our program.

1020
01:07:52,840 --> 01:08:06,840
And we had this nice little toolbox of things to use to write algorithms. So we actually, it is true, we have all that you need to know to write interesting algorithms. We wrote these interesting algorithms.

1021
01:08:06,840 --> 01:08:18,840
But we actually haven't taught you about some important concepts in programming. And these concepts actually exist in all of the modern programming languages.

1022
01:08:18,840 --> 01:08:33,840
And these ideas are decomposition and abstraction. Okay. So I'll just motivate these ideas today. We're not going to look at any code, but I'll kind of show you some simpler version of decomposition abstraction that you've already been kind of doing.

1023
01:08:33,840 --> 01:08:39,840
And the next lecture, we'll see how we can actually implement these ideas in code.

1024
01:08:39,840 --> 01:08:50,840
So the idea of decomposition is that you take a large program and you try to divide it into smaller parts.

1025
01:08:50,840 --> 01:09:03,840
Each one of these parts will be self-contained, right? So they won't really interfere with each other as in the code from one part is not going to implement the code in another part, but they can sort of talk to each other.

1026
01:09:03,840 --> 01:09:19,840
And they can send values to each other back and forth. Okay. So if you take one large spaghetti code program and you try to divide it into these nice self-contained parts, you can have each one of these parts solve a different part, a different portion of your large program.

1027
01:09:19,840 --> 01:09:26,840
And in the end, they can kind of come together to solve the larger program. That's the idea of decomposition.

1028
01:09:26,840 --> 01:09:38,840
And the idea of abstraction is once you write these self-contained parts one time, right? And you've done the work, you've done the thought process, you've thought about how to write them in an efficient way.

1029
01:09:38,840 --> 01:09:54,840
Nobody else needs to know exactly how you implemented them. You want to abstract away all the details that went into figuring out how to solve that problem, into just some text or some interface that allows you to say,

1030
01:09:54,840 --> 01:10:04,840
hey, I solve this problem. All you need to do is give me this input, this input, this input. And my code will solve your problem and give you this output back.

1031
01:10:04,840 --> 01:10:18,840
Kind of like if you're working in a group project, every one of you goes at does your own part. I don't care if you use the internet or the library to solve your part. All I care is that you give, we all come back together and we put our results together.

1032
01:10:18,840 --> 01:10:29,840
And so that's the idea of abstraction. There's some unnecessary details that might be in some code. I don't care about those details, how you solved your problem, I just care that you solved the problem.

1033
01:10:29,840 --> 01:10:46,840
So tell me how I can interact with you. So this is sort of very, very low level. I guess in some ways that we've already been employing the ideas of decomposition and abstraction.

1034
01:10:46,840 --> 01:10:55,840
So decomposition is the idea that you can write smaller pieces of code that are kind of self contained.

1035
01:10:55,840 --> 01:11:06,840
So if I gave you this, I kind of talked about spaghetti code, this is kind of like a simpler version of spaghetti code. If I gave you this line of code, it's a little bit messy.

1036
01:11:06,840 --> 01:11:16,840
I've got some value here that I know is going to have is going to be important, especially if I define it to some large number of decimal places.

1037
01:11:16,840 --> 01:11:25,840
I've got these two values here that I'm copying over basically. This is not great coding style. It's not great coding practice.

1038
01:11:25,840 --> 01:11:34,840
But I can kind of take these values and sort of decompose them into things that are reusable.

1039
01:11:34,840 --> 01:11:47,840
So I've got pi here, which is interesting to me. I can save it in a variable. I've got r here, 2.2. I'm saving it as a variable named r, that I know I'm going to use in many places.

1040
01:11:47,840 --> 01:11:55,840
Instead of copying and pasting 2.2 here and here, I might make a mistake if I type it out, I just use the variable.

1041
01:11:55,840 --> 01:12:09,840
So I've decomposed this little bit of spaghetti code into these nice modular pieces. I've got pi as a module, r as a module, and then I'm just putting them together to achieve this common goal, which is to find the area.

1042
01:12:09,840 --> 01:12:15,840
And we're going to see this on a larger scale using these things called functions next lecture.

1043
01:12:15,840 --> 01:12:24,840
Now the idea of abstraction, again, we've already been kind of doing this. Hopefully you guys have been doing this through comments in your code.

1044
01:12:24,840 --> 01:12:35,840
So if you spend some time on your problem set, you know, when it's first released and you write a whole chunk of code, and you do a really good job at it, and you did it in a really cool way,

1045
01:12:35,840 --> 01:12:47,840
and a week later you forgot some details that you've done, right? And you didn't comment your code. That could lead you into big trouble, right?

1046
01:12:47,840 --> 01:13:01,840
Because now we have to figure out what the code is doing. If you had just written a little bit of comment at the beginning of the code for something that, you know, an interesting way, or, hey, I use the bisection search algorithm here, or so on.

1047
01:13:01,840 --> 01:13:08,840
That would actually suppress a lot of the details from your code, but you would still be able to remember what the code is doing, right?

1048
01:13:08,840 --> 01:13:18,840
And so the idea of suppressing details is done through comments, and we're going to see in the next lecture how we can suppress details for larger chunks of code as well.

1049
01:13:18,840 --> 01:13:22,840
Okay, so that's the idea of abstraction here.

1050
01:13:22,840 --> 01:13:37,840
So the big idea that we're going to look through in the next lecture is to stop writing large chunks of code where we copy and paste things that do the same thing over and over again, because that could lead to errors being introduced, right?

1051
01:13:37,840 --> 01:13:40,840
You change it in one place, you forget to change it in another place.

1052
01:13:40,840 --> 01:13:55,840
We're going to see how we can write these little modules called functions that you write only once, you debug only once, and then you can use them over and over and over again in your code with different inputs to give you different outputs.

1053
01:13:55,840 --> 01:14:05,840
So the idea here is we want to create code that's easy to modify, easy to maintain, and easy to understand.

1054
01:14:05,840 --> 01:14:11,840
So if you come back to it a week from now, a year from now, you'll still be able to know what that code is doing.

1055
01:14:11,840 --> 01:14:18,840
Okay, so that's the motivation for next lecture. We'll start with a real life example, and then we'll dive right into functions.

1056
01:14:18,840 --> 01:14:20,840
Thank you.

