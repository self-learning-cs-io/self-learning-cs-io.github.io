---
title: MIT6100 P22P22BigOhandTheta
---

1
00:00:00,000 --> 00:00:13,439
All right, let's get started.

2
00:00:13,439 --> 00:00:20,559
Last lecture we began talking about an entirely new topic in computer science and we began

3
00:00:20,559 --> 00:00:25,679
learning about how to figure out the runtime of our programs.

4
00:00:25,679 --> 00:00:32,200
So we looked at how to actually time the program by figuring out exactly how long it takes

5
00:00:32,200 --> 00:00:34,920
and then how to count the number of operations in the program.

6
00:00:34,920 --> 00:00:39,079
Today we're going to do very same thing to begin with.

7
00:00:39,079 --> 00:00:42,840
So for the first half of the lecture we'll time a bunch of programs and we'll count the

8
00:00:42,840 --> 00:00:45,840
number of operations just like before.

9
00:00:45,840 --> 00:00:49,719
But we're going to do them in a context of slightly different, slightly more interesting

10
00:00:49,719 --> 00:00:55,560
programs or functions involving just pure numbers as our parameters and then functions

11
00:00:55,560 --> 00:00:58,800
that involve lists as our parameters.

12
00:00:58,800 --> 00:01:02,440
That'll be the first half of the lecture and then from there on we're going to look at

13
00:01:02,440 --> 00:01:06,480
the idea of order of growth which is kind of what we're building up this set of lectures

14
00:01:06,480 --> 00:01:07,480
to.

15
00:01:07,480 --> 00:01:12,079
And then the order of growth, there'll be a little bit of math, a little bit of graphing but

16
00:01:12,079 --> 00:01:19,520
not too much and then we're just going to see how to actually evaluate the order of growth

17
00:01:19,520 --> 00:01:21,840
of functions from there on out.

18
00:01:21,840 --> 00:01:28,159
Okay, so let's begin by just figuring out the run time of our programs.

19
00:01:28,159 --> 00:01:32,159
This was a really quick and easy way to first figure out exactly how long our programs

20
00:01:32,159 --> 00:01:33,159
take.

21
00:01:33,159 --> 00:01:38,080
So last lecture we imported this time module and we're doing that again this time.

22
00:01:38,080 --> 00:01:48,439
But instead of actually running the time function that we had seen last lecture here, instead

23
00:01:48,439 --> 00:01:55,439
of running the time function which gave us this sort of global absolute time since some

24
00:01:55,439 --> 00:01:59,400
date in the past, we're going to run this slightly different function called performance

25
00:01:59,400 --> 00:02:00,400
counter.

26
00:02:00,400 --> 00:02:05,680
And this is what is typically used in the real world to figure out how long an actual

27
00:02:05,680 --> 00:02:08,439
program or function takes to run.

28
00:02:08,439 --> 00:02:11,039
The reason we're using this is because it's more accurate.

29
00:02:11,039 --> 00:02:18,439
So the time.time function that we use last lecture gave us maybe precision to one time

30
00:02:18,439 --> 00:02:22,680
sent negative three or something very, very big like that.

31
00:02:22,680 --> 00:02:27,799
The performance counter can actually give us precision to something that's a lot, lot

32
00:02:27,799 --> 00:02:28,799
smaller.

33
00:02:28,799 --> 00:02:31,599
So maybe one time sent negative eight or something very small.

34
00:02:31,599 --> 00:02:38,159
So we'll be able to see the timings of some functions that were basically zero in the

35
00:02:38,159 --> 00:02:39,560
last lecture.

36
00:02:39,879 --> 00:02:40,560
Okay.

37
00:02:40,560 --> 00:02:45,680
So just a quick review of how we actually get the time that a function takes to run.

38
00:02:45,680 --> 00:02:51,159
We run this performance counter time and this one gives us not an absolute time but more

39
00:02:51,159 --> 00:02:56,719
of a shorter time frame, not from some time in the past.

40
00:02:56,719 --> 00:03:01,319
And the performance counter is very useful when we're getting these dTs, right, the difference

41
00:03:01,319 --> 00:03:02,920
in some times.

42
00:03:02,920 --> 00:03:07,640
So we're running the performance counter to get the quote unquote starting time.

43
00:03:07,639 --> 00:03:12,519
We run the function, we run the performance counter again to get the quote unquote stopping

44
00:03:12,519 --> 00:03:17,119
time, subtract the starting time to get the dT.

45
00:03:17,119 --> 00:03:23,439
So and then we will print that time to see how long the function actually takes to run.

46
00:03:23,439 --> 00:03:25,679
Yeah, that's the way I said.

47
00:03:25,679 --> 00:03:26,679
Okay.

48
00:03:26,679 --> 00:03:32,719
So we're going to look at two different functions than last time but they're going to have

49
00:03:32,719 --> 00:03:36,599
sort of the same overarching themes that we saw last lecture.

50
00:03:36,599 --> 00:03:40,979
So the first function we're going to look at is called convert to kilometers, taking

51
00:03:40,979 --> 00:03:45,359
in some miles and returns the value in kilometers.

52
00:03:45,359 --> 00:03:48,879
And the second function is a function named compound.

53
00:03:48,879 --> 00:03:51,879
So this one should seem very familiar.

54
00:03:51,879 --> 00:03:55,599
It will bring flashbacks to problem set one.

55
00:03:55,599 --> 00:04:01,560
It's a function that takes in a monthly investment, an interest rate for the month and some number

56
00:04:01,560 --> 00:04:04,879
of months to invest that much.

57
00:04:04,879 --> 00:04:08,719
And it returns how much money you've made over those number of months.

58
00:04:08,719 --> 00:04:14,039
So you can see here you have an total initialized, a loop that goes through that many months and

59
00:04:14,039 --> 00:04:17,800
it updates the total based on the interest rate and how much money you have there right

60
00:04:17,800 --> 00:04:21,079
now plus whatever you've invested for that month.

61
00:04:21,079 --> 00:04:22,079
Okay.

62
00:04:22,079 --> 00:04:26,079
So the three questions we're going to answer just like we answered last lecture is how long

63
00:04:26,079 --> 00:04:29,120
natural seconds does it take to run these functions?

64
00:04:29,120 --> 00:04:33,240
Which input parameters does the function actually depend on?

65
00:04:33,240 --> 00:04:38,840
And do these two functions actually run for different amounts of time?

66
00:04:38,840 --> 00:04:40,560
And sort of what is that difference?

67
00:04:40,560 --> 00:04:41,560
Right?

68
00:04:41,560 --> 00:04:44,079
Does one run in 12 seconds and the other one run in 0.5?

69
00:04:44,079 --> 00:04:45,079
Sorry.

70
00:04:45,079 --> 00:04:48,840
What is the actual time that it takes for them to run?

71
00:04:48,840 --> 00:04:50,040
So this is our code.

72
00:04:50,040 --> 00:04:53,759
So these are the two functions before we go on.

73
00:04:53,759 --> 00:04:56,680
Let me just show you how we're creating the inputs.

74
00:04:56,680 --> 00:05:00,439
So just like before we're creating a list of all of the different inputs we're going

75
00:05:00,439 --> 00:05:02,639
to run the function with.

76
00:05:02,639 --> 00:05:09,079
So here I've got this Ln that will contain the numbers 1, 10, 100, 1000, so on.

77
00:05:09,079 --> 00:05:15,000
And these are going to be the parameters to my function, one at a time of course.

78
00:05:15,000 --> 00:05:20,120
And then I've got my loop here for each one of those inputs, 1, 10, 100, 1000, I'm just

79
00:05:20,120 --> 00:05:22,000
going to run my function.

80
00:05:22,000 --> 00:05:23,000
Right?

81
00:05:23,000 --> 00:05:25,079
So here I'm measuring the time it takes.

82
00:05:25,079 --> 00:05:31,399
And then I'm going to report the time that it took to run the program.

83
00:05:31,399 --> 00:05:36,519
And just for fun, I'm also going to report how many times this program could run in one

84
00:05:36,519 --> 00:05:37,759
second.

85
00:05:37,759 --> 00:05:41,759
Because for me it was a little bit hard to read, you know, one time instead of negative,

86
00:05:41,759 --> 00:05:44,639
you know, 8 or something like that.

87
00:05:44,639 --> 00:05:48,399
But it was a lot easier for me to see this big number for how many times that function

88
00:05:48,399 --> 00:05:51,759
could have run in one second.

89
00:05:51,759 --> 00:05:58,199
So here I've got a convert to kilometers.

90
00:05:58,199 --> 00:06:00,560
So I'm going to run it.

91
00:06:00,560 --> 00:06:07,480
And we're going to see, it's this right here, how long the function actually took.

92
00:06:07,480 --> 00:06:12,240
So last time we ran a program that was really simple like this, all of it basically said

93
00:06:12,240 --> 00:06:13,560
it took zero seconds, right?

94
00:06:13,560 --> 00:06:18,319
It was just so fast that that time, that time function, was wasn't able to pick up that

95
00:06:18,319 --> 00:06:20,759
precise time difference.

96
00:06:20,759 --> 00:06:23,839
But this performance counter can, right, which is a lot nicer.

97
00:06:23,839 --> 00:06:29,560
So now we see that no matter what the input it looks like, the time is pretty much the

98
00:06:29,560 --> 00:06:30,560
same, right?

99
00:06:30,560 --> 00:06:34,879
Three times 10 negative seven seconds, no matter what the input is.

100
00:06:34,879 --> 00:06:35,879
Right?

101
00:06:35,879 --> 00:06:39,039
That was expected.

102
00:06:39,039 --> 00:06:42,399
Now what about the compound function?

103
00:06:42,399 --> 00:06:44,639
This one's going to be a little bit more interesting.

104
00:06:44,639 --> 00:06:48,159
Because there are actually three parameters to this function, right?

105
00:06:48,160 --> 00:06:53,560
So what we're going to do is change each one and see which one of those parameters actually

106
00:06:53,560 --> 00:06:56,720
has an effect on the runtime.

107
00:06:56,720 --> 00:07:05,000
So here this bit is going to fix my interest rate and fix the number of months.

108
00:07:05,000 --> 00:07:08,680
And I'm going to change the amount I invest every month.

109
00:07:08,680 --> 00:07:11,720
So if I run that, that was pretty fast.

110
00:07:11,720 --> 00:07:13,560
Again, we look at the results here.

111
00:07:13,560 --> 00:07:17,879
And no matter how much I invest every month, it looks like the program doesn't really

112
00:07:17,879 --> 00:07:19,439
change how long it takes to run, right?

113
00:07:19,439 --> 00:07:24,480
It's always about one time, extended the negative six seconds to run.

114
00:07:24,480 --> 00:07:26,360
All right.

115
00:07:26,360 --> 00:07:28,519
What if I change the interest rate?

116
00:07:28,519 --> 00:07:34,319
So this one was a little bit harder to change, but I settled on this as the thing I'm

117
00:07:34,319 --> 00:07:35,319
varying.

118
00:07:35,319 --> 00:07:38,480
Sorry, I'm varying it in this way.

119
00:07:38,480 --> 00:07:45,120
So it's going to be 1.1 or 1.01 or 1.001.

120
00:07:45,120 --> 00:07:49,600
That's what I'm going to invest, that the interest rate for whatever I'm going to invest in.

121
00:07:49,600 --> 00:07:56,199
And I'm going to fix $10 as my investment per month and fix the 12 months again.

122
00:07:56,199 --> 00:08:03,800
So if I run that, same deal, it looks like changing this investment isn't really making

123
00:08:03,800 --> 00:08:07,600
much of a difference in how long it takes the program to run.

124
00:08:07,600 --> 00:08:09,720
All right.

125
00:08:09,720 --> 00:08:12,040
One last parameter to try.

126
00:08:12,040 --> 00:08:17,480
So now I'm going to fix the initial investment to $10 a month and I'm going to fix my interest

127
00:08:17,480 --> 00:08:20,840
rate to this per month.

128
00:08:20,840 --> 00:08:25,120
And I'm going to vary how many months I'm going to invest this.

129
00:08:25,120 --> 00:08:31,560
So again, this N will be 1, 10, 100, 1,000, 10,000 and so on.

130
00:08:31,560 --> 00:08:34,920
So let's see what this is going to do.

131
00:08:34,920 --> 00:08:38,080
Already it's doing something different than the other two because it hasn't finished running

132
00:08:38,080 --> 00:08:39,080
yet, right?

133
00:08:39,080 --> 00:08:42,160
So it's still working on this last one down here.

134
00:08:42,160 --> 00:08:46,040
But we can see that more interesting things are happening now, right?

135
00:08:46,040 --> 00:08:51,759
So here I've got initially, it's a little bit hard to tell for those small numbers, which

136
00:08:51,759 --> 00:08:52,920
is fine.

137
00:08:52,920 --> 00:08:57,240
But luckily, we're able to run it for a bunch of inputs.

138
00:08:57,240 --> 00:09:03,600
So starting from about here, right, when I start investing my money over 1,000 months,

139
00:09:03,600 --> 00:09:08,879
10,000 months, 100,000 months and so on, it looks like we can kind of see a pattern.

140
00:09:08,879 --> 00:09:14,799
Again, for 1,000 months, the program takes about 5 times 10 to negative 5 seconds to run.

141
00:09:14,799 --> 00:09:20,559
If I increase the number of months by 10, it takes 5 times 10 to negative 4 seconds to

142
00:09:20,559 --> 00:09:21,559
run.

143
00:09:21,559 --> 00:09:27,799
And then as my input increases by 10, the number of months, my time to run seems to increase

144
00:09:27,799 --> 00:09:29,720
by 10 as well, right?

145
00:09:29,720 --> 00:09:38,159
So 0.005, 0.05, 0.7, 0.8, something like that.

146
00:09:38,159 --> 00:09:39,639
OK.

147
00:09:39,639 --> 00:09:42,039
So this is from a previous run.

148
00:09:42,039 --> 00:09:47,039
Of course, each run will be different because we're just purely grabbing the time that the

149
00:09:47,039 --> 00:09:48,839
program took to run.

150
00:09:48,839 --> 00:09:50,879
So the actual time will be different.

151
00:09:50,879 --> 00:09:53,480
But a few things to notice.

152
00:09:53,480 --> 00:09:57,879
So Python actually reported the time it took the program to run in scientific notation,

153
00:09:57,879 --> 00:09:59,079
which is kind of cool.

154
00:09:59,079 --> 00:10:01,600
So this is 4.3 times 10 to the negative 6.

155
00:10:01,600 --> 00:10:03,919
So it knew how to show it to me like that.

156
00:10:03,919 --> 00:10:08,120
So it's not, it doesn't have a bunch of zeros in there.

157
00:10:08,120 --> 00:10:16,039
And then the observation, as you might have guessed, for this convert to kilometers was

158
00:10:16,039 --> 00:10:17,039
independent.

159
00:10:17,039 --> 00:10:18,039
Right?

160
00:10:18,039 --> 00:10:21,399
So this is the kilometers, not the compound function.

161
00:10:21,399 --> 00:10:26,960
But then the compound function here, this is again from a previous run, we can make

162
00:10:26,960 --> 00:10:29,039
a few observations.

163
00:10:29,039 --> 00:10:37,680
So the first was that the time only actually changed with the input when we changed

164
00:10:37,679 --> 00:10:39,399
end months.

165
00:10:39,399 --> 00:10:44,759
When we changed the initial investment or the interest rate, the program just basically

166
00:10:44,759 --> 00:10:46,719
took the same amount of time to run.

167
00:10:46,719 --> 00:10:51,079
So it was only end months that actually made a difference for us.

168
00:10:51,079 --> 00:10:56,199
Second observation, again, something we noticed, is as we increase the number of months by

169
00:10:56,199 --> 00:11:01,319
10, the time it takes the program to run also increases by 10.

170
00:11:01,319 --> 00:11:04,159
Again, something we've talked about.

171
00:11:04,159 --> 00:11:15,199
And the last observation is that we have this relationship very apparent as the input is

172
00:11:15,199 --> 00:11:16,199
really big.

173
00:11:16,199 --> 00:11:17,199
Right?

174
00:11:17,199 --> 00:11:22,959
As the input is small, I think I mentioned this last time, if for some reason my computer

175
00:11:22,959 --> 00:11:29,159
updates or decides to dedicate some resources to running an app in the background for

176
00:11:29,159 --> 00:11:35,159
what reason as it's trying to figure out the compound function with an input of one,

177
00:11:35,159 --> 00:11:38,039
this number could be changed dramatically.

178
00:11:38,039 --> 00:11:43,399
Because two times 10 negative six can be affected a lot by just a little bit of time dedicated

179
00:11:43,399 --> 00:11:44,959
to something else.

180
00:11:44,959 --> 00:11:51,079
Whereas four seconds or 14 seconds, if my computer dedicates a little bit of time to something

181
00:11:51,079 --> 00:11:54,879
else, that four or 14 won't be affected as much.

182
00:11:54,879 --> 00:12:00,960
So when the numbers are big, that's when we can see the behavior of our function a lot

183
00:12:00,960 --> 00:12:01,960
more clearly.

184
00:12:01,960 --> 00:12:04,399
Not when the numbers are small.

185
00:12:04,399 --> 00:12:06,679
Okay.

186
00:12:06,679 --> 00:12:12,080
So now I'd like to look at some more functions.

187
00:12:12,080 --> 00:12:17,879
These functions are going to have the input being a list as opposed to just numbers.

188
00:12:17,879 --> 00:12:21,679
We've seen a bunch of examples with numbers, but let's see what happens when my input is

189
00:12:21,679 --> 00:12:23,399
a list.

190
00:12:23,399 --> 00:12:25,959
So here's a very simple function.

191
00:12:25,959 --> 00:12:33,759
It takes in a list L and it sums all of the elements in the list L. So we've seen a bunch

192
00:12:33,759 --> 00:12:35,120
of times already.

193
00:12:35,120 --> 00:12:37,319
We initialize a total to be zero.

194
00:12:37,319 --> 00:12:42,480
We iterate through each element in L and we keep our running total by just adding the

195
00:12:42,480 --> 00:12:44,559
element to that total.

196
00:12:44,559 --> 00:12:47,679
Pretty simple and we return it.

197
00:12:47,679 --> 00:12:53,159
Now how do we actually run this function with a whole bunch of different inputs?

198
00:12:53,159 --> 00:12:55,439
Well that's what we're going to see next.

199
00:12:55,439 --> 00:13:00,399
So this bit here is exactly the same as before.

200
00:13:00,399 --> 00:13:06,360
It's actually creating for us the list of one, ten, a hundred, a thousand, ten thousand

201
00:13:06,360 --> 00:13:07,879
and so on.

202
00:13:07,879 --> 00:13:13,919
But clearly the number ten cannot be an input to this function, right?

203
00:13:13,919 --> 00:13:17,480
Because this function is expecting a list, right?

204
00:13:17,480 --> 00:13:19,120
So L cannot be ten.

205
00:13:19,120 --> 00:13:21,839
It needs to be a list with some things in it.

206
00:13:21,840 --> 00:13:27,440
So instead what we're going to do out of that number, one, ten, a hundred, a thousand

207
00:13:27,440 --> 00:13:32,280
and so on, we're actually going to make a list with just some random dummy numbers in

208
00:13:32,280 --> 00:13:33,280
it.

209
00:13:33,280 --> 00:13:34,800
I don't actually care what these numbers are.

210
00:13:34,800 --> 00:13:39,680
So let's just make them be the number zero to nine, zero to 99, zero to nine hundred

211
00:13:39,680 --> 00:13:40,920
and 99.

212
00:13:40,920 --> 00:13:45,399
And in effect each one of these lists will then have one element in it, ten elements in

213
00:13:45,399 --> 00:13:49,080
it, a hundred elements in it, a thousand elements in it and so on.

214
00:13:49,080 --> 00:13:50,080
All right?

215
00:13:50,080 --> 00:13:51,080
Everyone okay with that?

216
00:13:51,639 --> 00:13:52,080
All right?

217
00:13:52,080 --> 00:13:53,080
So the input is now different.

218
00:13:53,080 --> 00:13:54,080
It needs to be a list.

219
00:13:54,080 --> 00:13:58,480
We're just creating a bunch of lists of varying lengths.

220
00:13:58,480 --> 00:14:03,120
So the relationship between these lengths are that the lists are ten times as big as the

221
00:14:03,120 --> 00:14:05,560
previous list, right?

222
00:14:05,560 --> 00:14:06,560
Okay?

223
00:14:06,560 --> 00:14:09,000
So then now I have my input list here.

224
00:14:09,000 --> 00:14:10,800
I do the exact same thing as before.

225
00:14:10,800 --> 00:14:12,480
Not yet.

226
00:14:12,480 --> 00:14:16,600
I run the performance counter to create my starting time.

227
00:14:16,600 --> 00:14:20,879
I run my function and I get the dt and I report the exact same thing as before.

228
00:14:21,879 --> 00:14:22,879
All right?

229
00:14:22,879 --> 00:14:29,879
So let's run that down here.

230
00:14:29,879 --> 00:14:32,879
All right.

231
00:14:32,879 --> 00:14:34,879
Running, running, running.

232
00:14:34,879 --> 00:14:36,399
Again, we have to wait a little bit.

233
00:14:36,399 --> 00:14:40,879
It looks like it's working, but it's just getting slower and slower, which is fine.

234
00:14:40,879 --> 00:14:43,480
So what do we notice?

235
00:14:43,480 --> 00:14:47,759
So when we had one element in my list, it took one time, ten negative five seconds to

236
00:14:47,759 --> 00:14:48,759
run.

237
00:14:48,759 --> 00:14:52,439
When I had ten, it took one time, ten negative six seconds to run.

238
00:14:52,439 --> 00:14:56,159
It was actually shorter to have more elements in it.

239
00:14:56,159 --> 00:15:01,679
See, this is what I mean when it's very unpredictable for low numbers.

240
00:15:01,679 --> 00:15:08,519
But as we get to lists of length, a thousand, ten thousand, a hundred thousand, a million

241
00:15:08,519 --> 00:15:11,399
and so on, we can start to see the pattern.

242
00:15:11,399 --> 00:15:15,000
So with ten thousand, it took four times ten negative four seconds to run.

243
00:15:15,000 --> 00:15:19,000
With a hundred thousand, it took four times ten negative three seconds to run.

244
00:15:19,000 --> 00:15:24,279
And then as the input increases by ten, that is the length of my list increases by ten,

245
00:15:24,279 --> 00:15:28,519
it looks like the program takes ten times as long to run.

246
00:15:28,519 --> 00:15:32,039
A very similar thing as before.

247
00:15:32,039 --> 00:15:38,759
So the first observation that we can make out of this function is that the size of the

248
00:15:38,759 --> 00:15:41,799
input obviously is now the length of our list, right?

249
00:15:41,799 --> 00:15:44,399
It's not just the number ten or the number a thousand.

250
00:15:44,399 --> 00:15:50,840
It's a length of length, a list of length ten or a list of length a thousand.

251
00:15:50,840 --> 00:15:57,439
Second observation is that again, just like in the previous case, the average time increases

252
00:15:57,439 --> 00:16:02,079
by ten as the length of our list increases by ten, okay?

253
00:16:02,079 --> 00:16:05,319
Again, very good.

254
00:16:05,319 --> 00:16:10,199
And just like before, this relationship between the size and time is more predictable for

255
00:16:10,199 --> 00:16:13,439
large sizes than it was for small sizes, right?

256
00:16:13,440 --> 00:16:19,600
As we just saw here, which will surprise me a little bit as well, is for a list that's

257
00:16:19,600 --> 00:16:22,920
longer, it took a shorter amount of time to run.

258
00:16:22,920 --> 00:16:27,760
Which is counterintuitive, but again, that's probably because my computer did something here

259
00:16:27,760 --> 00:16:31,280
to take a little bit longer to run.

260
00:16:31,280 --> 00:16:34,320
Okay?

261
00:16:34,320 --> 00:16:39,400
And then the last observation, this is compared to the compound function where we change

262
00:16:39,399 --> 00:16:40,879
the number of months.

263
00:16:40,879 --> 00:16:46,759
It looks like the time that this program actually takes to run is pretty comparable, just in

264
00:16:46,759 --> 00:16:52,919
terms of pure seconds, is comparable to how long it took for the compound to run, right?

265
00:16:52,919 --> 00:16:58,159
So here when my input was a hundred million, I think, yeah, a hundred million, it took

266
00:16:58,159 --> 00:17:00,079
about eight seconds to run.

267
00:17:00,079 --> 00:17:04,920
And when my list had a hundred million elements in it, it took about seven seconds to run,

268
00:17:04,920 --> 00:17:05,920
right?

269
00:17:05,920 --> 00:17:14,279
And then ten times faster going when we decrease our input by ten.

270
00:17:14,279 --> 00:17:18,279
So already we're starting to see something that we're going to get.

271
00:17:18,279 --> 00:17:19,279
Yeah, go ahead.

272
00:17:19,279 --> 00:17:22,279
What does some of function?

273
00:17:22,279 --> 00:17:23,279
Is that good?

274
00:17:23,279 --> 00:17:28,519
Oh, some of is just this function that I wrote here.

275
00:17:28,519 --> 00:17:30,080
Yeah, that's just, yeah.

276
00:17:30,080 --> 00:17:31,680
Did I name it something differently in here?

277
00:17:31,680 --> 00:17:32,680
No.

278
00:17:33,680 --> 00:17:34,680
Yeah.

279
00:17:34,680 --> 00:17:40,960
So already we're starting to get at this idea where I have two functions that do wildly

280
00:17:40,960 --> 00:17:43,360
different things, right?

281
00:17:43,360 --> 00:17:44,759
One sums the elements in a list.

282
00:17:44,759 --> 00:17:49,000
The other one just loops over some number of months and does some calculation.

283
00:17:49,000 --> 00:17:54,880
But it looks like they're sort of in terms of just algorithmically wise, they are very similar.

284
00:17:54,880 --> 00:17:56,840
They take similar amounts of time.

285
00:17:56,840 --> 00:17:59,519
They increase at the same rate.

286
00:17:59,519 --> 00:18:01,639
And basically they just have a for loop, right?

287
00:18:01,639 --> 00:18:04,879
Or some sort of loop that iterates through the input and does something.

288
00:18:04,879 --> 00:18:09,200
So algorithmically we want to consider both of these functions the same, even though they

289
00:18:09,200 --> 00:18:14,200
implement completely different things.

290
00:18:14,200 --> 00:18:18,839
Other questions before we go on to another list function.

291
00:18:18,839 --> 00:18:20,079
Okay.

292
00:18:20,079 --> 00:18:25,839
So let's look at a slightly different problem dealing with lists.

293
00:18:25,839 --> 00:18:31,439
So this function or these three functions deal with finding an element in a list.

294
00:18:31,439 --> 00:18:35,519
And we're going to compare the runtimes of these three functions.

295
00:18:35,519 --> 00:18:41,240
So the first function is going to be a very brute force method to find the element in a

296
00:18:41,240 --> 00:18:43,039
list.

297
00:18:43,039 --> 00:18:45,039
It's going, was there a question?

298
00:18:45,039 --> 00:18:46,039
Yeah.

299
00:18:46,039 --> 00:18:47,039
Yeah.

300
00:18:47,039 --> 00:18:51,039
Oh, wait, I'm going to get the numeratic one.

301
00:18:51,039 --> 00:18:53,480
All right, no worries.

302
00:18:53,880 --> 00:19:00,839
Okay, so the first function will do a brute force search to find an element x right here,

303
00:19:00,839 --> 00:19:05,079
one of my parameters within a list of the other one of my parameters.

304
00:19:05,079 --> 00:19:12,160
Basically, given a list of a bunch of elements, this function will just painstakingly look at

305
00:19:12,160 --> 00:19:18,880
each element one at a time and ask whether that element is the one that I'm looking for.

306
00:19:18,880 --> 00:19:23,000
So starting over here, the beginning of my list and going to the end of my list.

307
00:19:23,000 --> 00:19:27,200
That's what is in does.

308
00:19:27,200 --> 00:19:33,160
The next one, binary search, also looks for an element in a list, making sure that the

309
00:19:33,160 --> 00:19:35,000
list is ordered.

310
00:19:35,000 --> 00:19:38,759
But the way that it's going to do it is in a slightly smarter way.

311
00:19:38,759 --> 00:19:42,839
So I'm actually going to draw my list this way.

312
00:19:42,839 --> 00:19:46,920
So each one of these is going to be elements in my list.

313
00:19:46,920 --> 00:19:51,640
So this is going to do a bisection search to find the element in the list.

314
00:19:51,640 --> 00:19:56,480
So again, we're looking for element x within this list L.

315
00:19:56,480 --> 00:20:06,360
And remember, by section search, we start with a beginning endpoint and an ending endpoint.

316
00:20:06,360 --> 00:20:12,840
And our first guess for the element or whatever we're looking for is to just say, what's

317
00:20:12,840 --> 00:20:14,120
the middle element?

318
00:20:14,120 --> 00:20:18,400
All right, so look at the element in the middle and ask, are you the one I'm looking for?

319
00:20:18,400 --> 00:20:22,560
In this particular case, you look at the element in the middle and you say, are you the

320
00:20:22,560 --> 00:20:24,080
x I'm looking for?

321
00:20:24,080 --> 00:20:25,080
Right?

322
00:20:25,080 --> 00:20:26,080
Good.

323
00:20:26,080 --> 00:20:30,280
So that's this one right here.

324
00:20:30,280 --> 00:20:34,360
So the midpoint calculation is right here.

325
00:20:34,360 --> 00:20:39,480
The reason why we're doing slash slash for integer division is in the case where I have

326
00:20:39,480 --> 00:20:43,519
a list where I would actually look at the midpoint here.

327
00:20:43,519 --> 00:20:44,519
Right?

328
00:20:44,519 --> 00:20:51,240
Obviously, I can't ask Python for the element at index 3.5.

329
00:20:51,240 --> 00:20:52,240
Right?

330
00:20:52,240 --> 00:20:53,720
It doesn't work like that.

331
00:20:53,720 --> 00:20:55,799
So I'm just going to round down.

332
00:20:55,799 --> 00:20:57,319
You could also round up if you wanted to.

333
00:20:57,319 --> 00:20:58,920
I just made the choice to round down.

334
00:20:58,920 --> 00:21:03,720
So I'm actually grabbing the element at an integer index.

335
00:21:03,720 --> 00:21:04,720
Right?

336
00:21:04,720 --> 00:21:08,920
So I've grabbed my middle element and then I ask, are you the one I'm looking for?

337
00:21:08,920 --> 00:21:14,680
And if not, I ask whether this one is too low or too high.

338
00:21:14,680 --> 00:21:22,480
And then if it's too low, then I know I need to search this part of my list.

339
00:21:22,480 --> 00:21:26,120
And if it's too high, I need to search this part of my list.

340
00:21:26,120 --> 00:21:27,120
Right?

341
00:21:27,120 --> 00:21:31,039
So that's what this little if else is doing.

342
00:21:31,039 --> 00:21:38,000
And when I make my decision as to which side to look at, then I reset my endpoints.

343
00:21:38,000 --> 00:21:43,240
And I do the process all over again by asking the midpoint there, are you the one I'm looking

344
00:21:43,240 --> 00:21:44,240
for, so on and so on.

345
00:21:44,240 --> 00:21:45,240
Right?

346
00:21:45,240 --> 00:21:52,279
So this does a bisection search, also called binary search for the element in a list.

347
00:21:52,279 --> 00:21:57,279
And the last way for us to search whether an element is in a list is one that we've already

348
00:21:57,279 --> 00:21:58,279
been doing.

349
00:21:58,279 --> 00:22:04,319
It's this little one liner here is x in L. So using the keyword in.

350
00:22:04,319 --> 00:22:05,319
Right?

351
00:22:05,319 --> 00:22:11,000
So that's, I call that the built in function, the built in operator in.

352
00:22:11,000 --> 00:22:13,720
Okay.

353
00:22:13,720 --> 00:22:24,000
So it would be unfair if we just ask Python to figure out, or to just pick a random number

354
00:22:24,000 --> 00:22:27,879
and ask whether that element was the one we're looking for.

355
00:22:27,879 --> 00:22:31,759
So instead, what we're going to do is to kind of take an average for each one of these

356
00:22:31,759 --> 00:22:34,759
three functions just to make it fair.

357
00:22:34,759 --> 00:22:39,599
So we're going to say, when we're searching for an element in the list, I'm going to say

358
00:22:39,599 --> 00:22:46,160
that I'm going to take the average of the case when the element is the first one in the list.

359
00:22:46,160 --> 00:22:51,119
And I can find it maybe right away in this case or maybe not right away in this case.

360
00:22:51,119 --> 00:22:56,759
The average with that plus when the element is the last one in the list.

361
00:22:56,759 --> 00:23:01,240
And plus when the element is the middle one in my list.

362
00:23:01,240 --> 00:23:02,240
Right?

363
00:23:02,240 --> 00:23:08,000
That way we're actually kind of covering all our bases, kind of best case, worst case,

364
00:23:08,000 --> 00:23:10,000
medium case scenarios.

365
00:23:10,000 --> 00:23:11,000
Right?

366
00:23:11,000 --> 00:23:17,640
So each one of these three functions will be run with that in mind.

367
00:23:17,640 --> 00:23:19,480
So that's these three functions.

368
00:23:19,480 --> 00:23:22,440
So this is my brute force is in.

369
00:23:22,440 --> 00:23:26,200
This is my binary search.

370
00:23:26,200 --> 00:23:31,440
And the end, it's obviously I'm just going to type in in when I run it.

371
00:23:31,440 --> 00:23:33,160
So I'll just show you for one of them.

372
00:23:33,160 --> 00:23:41,000
So we're going to uncomment this entire bit here.

373
00:23:41,000 --> 00:23:46,320
But you can see here, so instead of just running the performance counter and making one function

374
00:23:46,320 --> 00:23:50,360
call, I'm actually going to run three function calls.

375
00:23:50,360 --> 00:23:55,799
It rated over this little loop, where I'm looking for the element at the zeroth location,

376
00:23:55,799 --> 00:24:02,480
the element at the halfway location, and the element at the end of my list.

377
00:24:02,480 --> 00:24:05,399
And I'm just averaging those down here.

378
00:24:05,399 --> 00:24:07,000
The time it takes to find those three.

379
00:24:07,000 --> 00:24:10,639
Does that make sense?

380
00:24:10,639 --> 00:24:11,639
Okay.

381
00:24:11,639 --> 00:24:12,639
All right.

382
00:24:12,639 --> 00:24:15,720
So this is a lot to look at.

383
00:24:15,720 --> 00:24:19,000
Luckily I'm going to summarize it in the next few slides.

384
00:24:19,000 --> 00:24:24,599
So we don't have to stare at that Python screen there.

385
00:24:24,599 --> 00:24:25,599
Okay.

386
00:24:25,599 --> 00:24:27,679
We have three functions to run.

387
00:24:27,679 --> 00:24:31,159
Let's first look at how each of these three functions did individually.

388
00:24:31,159 --> 00:24:34,159
And then we can start comparing them to each other.

389
00:24:34,159 --> 00:24:37,359
So the first function we ran was the is in.

390
00:24:37,359 --> 00:24:39,159
So remember, this was the brute force one.

391
00:24:39,159 --> 00:24:42,559
We're painstakingly going through each element and asking if it's the one we're looking

392
00:24:42,559 --> 00:24:43,559
for.

393
00:24:43,559 --> 00:24:44,679
So no smart way about that.

394
00:24:44,679 --> 00:24:47,719
Just brute force your way through.

395
00:24:47,720 --> 00:24:58,640
We notice that as the input list grows by 10, the time it takes to find the element in the

396
00:24:58,640 --> 00:25:04,519
list, whether it's the first one, last one, or in the middle, on average also grows by

397
00:25:04,519 --> 00:25:06,519
10.

398
00:25:06,519 --> 00:25:08,519
Okay.

399
00:25:08,519 --> 00:25:12,680
All right.

400
00:25:12,680 --> 00:25:15,360
Next.

401
00:25:15,359 --> 00:25:17,599
Let's look at the built-in function.

402
00:25:17,599 --> 00:25:20,240
We'll worry about the binary one later.

403
00:25:20,240 --> 00:25:29,759
The built-in function, so just using the inoperator and you see this was down here.

404
00:25:29,759 --> 00:25:30,759
So this in.

405
00:25:30,759 --> 00:25:35,359
So basically the function I'm running is purely just asking whether x is in L.

406
00:25:35,359 --> 00:25:36,359
Right.

407
00:25:36,359 --> 00:25:38,599
And that returns true or false.

408
00:25:38,599 --> 00:25:40,599
So I didn't need to make a function for that.

409
00:25:40,599 --> 00:25:47,519
But that built-in inoperator also has a very similar trend.

410
00:25:47,519 --> 00:25:55,159
As the length of my list increases by 10, the time it takes for my program to run is also

411
00:25:55,159 --> 00:25:56,759
10 times as long.

412
00:25:56,759 --> 00:26:03,919
I went 0.05 to 0.5 and the next one would be 5 and so on.

413
00:26:03,919 --> 00:26:04,919
Right.

414
00:26:04,919 --> 00:26:06,679
Okay.

415
00:26:06,680 --> 00:26:13,360
So those seem to be doing approximately the same sort of they have the same performance.

416
00:26:13,360 --> 00:26:19,160
Now what about the bisections or binary search?

417
00:26:19,160 --> 00:26:22,720
Well this one is not so clear, right?

418
00:26:22,720 --> 00:26:31,240
If we look at the input, right, the input clearly increases by 10 from here to here.

419
00:26:31,240 --> 00:26:38,160
The time increases 9 times and the negative 6 to 1.1 times and negative 5.

420
00:26:38,160 --> 00:26:46,000
And so the factor, how many more times it took is very unclear.

421
00:26:46,000 --> 00:26:47,319
It's not quite one.

422
00:26:47,319 --> 00:26:50,880
If it was one that meant it's independent, right, it's constant.

423
00:26:50,880 --> 00:26:52,599
It doesn't matter what the input size is.

424
00:26:52,599 --> 00:26:54,720
It's always going to give us this amount.

425
00:26:54,720 --> 00:26:56,120
It's always going to run in this amount of time.

426
00:26:56,120 --> 00:26:57,920
So it's not quite one.

427
00:26:57,920 --> 00:27:03,400
So it's almost independent of size, but it's not linear, right, like the other two functions

428
00:27:03,400 --> 00:27:04,400
were, right?

429
00:27:04,400 --> 00:27:07,840
It's not 10 when the input grows by 10.

430
00:27:07,840 --> 00:27:11,039
So we're not quite sure what this function is, right?

431
00:27:11,039 --> 00:27:17,400
But clearly it's not as bad as the other two, but not as good as no relation.

432
00:27:17,400 --> 00:27:19,360
Okay.

433
00:27:19,360 --> 00:27:20,360
Observation three.

434
00:27:20,360 --> 00:27:26,480
Observation four will now compare the function that we wrote, the is in this one here, to

435
00:27:26,480 --> 00:27:30,079
the binary search, this one down here.

436
00:27:30,079 --> 00:27:39,799
Well, binary search was orders of magnitude faster than brute force, right?

437
00:27:39,799 --> 00:27:43,400
Roof force, when the input was, what is this, 10 million or 100 million?

438
00:27:43,400 --> 00:27:45,240
I'm not sure.

439
00:27:45,240 --> 00:27:52,000
When the input was 100 million, brute force took 1.6 seconds.

440
00:27:52,000 --> 00:27:59,160
But the bisection search, the binary search, took 0.0001 seconds.

441
00:27:59,160 --> 00:28:04,599
So it's not like we went from 1.5 seconds to 1.2 seconds or 2.5 seconds.

442
00:28:04,599 --> 00:28:07,240
We were orders of magnitude faster, right?

443
00:28:07,240 --> 00:28:09,720
10 to the negative 5, right?

444
00:28:09,720 --> 00:28:15,319
So there's a really big difference between this algorithm, the one that brute forces its

445
00:28:15,319 --> 00:28:20,680
way through, and between this algorithm that does something smart about removing half of

446
00:28:20,680 --> 00:28:24,120
the search space with each loop, right?

447
00:28:24,120 --> 00:28:26,840
So that's important to know.

448
00:28:26,840 --> 00:28:32,840
And lastly, just kind of comparing pure time that it takes these programs to run.

449
00:28:32,840 --> 00:28:37,200
Let's compare the function that we wrote, the one that loops one at a time through this

450
00:28:37,200 --> 00:28:42,799
list, and the built-in in function.

451
00:28:42,799 --> 00:28:48,720
The built-in in function, see, while it's still the same sort of, has the same relationship,

452
00:28:48,720 --> 00:28:51,120
linear, right, with the input size.

453
00:28:51,120 --> 00:28:58,680
It seems to do a lot better consistently by about 10 times as fast, right?

454
00:28:58,680 --> 00:29:05,559
So when our function took 0.1 seconds, the built-in 1 took 0.05 seconds.

455
00:29:05,559 --> 00:29:09,839
When our function took 1 second, the built-in function took 0.5 seconds.

456
00:29:09,839 --> 00:29:15,640
So consistently, it's just faster to use the built-in in function than to make our own.

457
00:29:15,640 --> 00:29:21,720
All right, questions about any of these observations?

458
00:29:21,720 --> 00:29:25,240
And they make sense.

459
00:29:25,240 --> 00:29:28,440
Are they interesting?

460
00:29:28,440 --> 00:29:29,440
Yeah.

461
00:29:29,440 --> 00:29:32,480
Okay, so what do we see?

462
00:29:32,480 --> 00:29:36,280
Just a quick recap of those three functions, right?

463
00:29:36,280 --> 00:29:39,200
The first one, we saw is linear in the size of the argument.

464
00:29:39,200 --> 00:29:44,120
So when the input list size increases by 10, the program takes 10 times as long to run.

465
00:29:44,119 --> 00:29:47,559
But this other one is something less than linear, but not constant.

466
00:29:47,559 --> 00:29:49,959
So we're not quite sure what it is.

467
00:29:49,959 --> 00:29:52,559
All right, we'll come back to this in a little bit.

468
00:29:52,559 --> 00:29:57,959
We'll end up plotting some of these run times, so we'll actually be able to see the relationship

469
00:29:57,959 --> 00:30:01,479
in a few slides.

470
00:30:01,479 --> 00:30:07,559
The next thing I actually want to do is do one more sort of function.

471
00:30:07,559 --> 00:30:10,399
This one is called the diameter, right?

472
00:30:10,400 --> 00:30:13,840
Now explain what it's doing, because it looks a little bit scary.

473
00:30:13,840 --> 00:30:20,519
But suppose we actually have some points in a 2D plane, right?

474
00:30:20,519 --> 00:30:22,960
So it looks like this.

475
00:30:22,960 --> 00:30:29,960
Basically what this function is going to do is it's going to figure out the biggest distance

476
00:30:29,960 --> 00:30:31,360
between all of these points.

477
00:30:31,360 --> 00:30:35,320
So the distance between these two points is something.

478
00:30:35,320 --> 00:30:38,360
This is the distance between these two points is something else.

479
00:30:38,359 --> 00:30:41,559
Each two points yield the biggest distance.

480
00:30:41,559 --> 00:30:47,399
That's what this function aims to tell us and what that distance is.

481
00:30:47,399 --> 00:30:50,959
So the way it works is it has nested four loops.

482
00:30:50,959 --> 00:30:53,279
So this is different than what we've seen so far, right?

483
00:30:53,279 --> 00:30:57,639
We saw an example of this last lecture, but now we're seeing it in the context of something

484
00:30:57,639 --> 00:30:59,159
actually useful.

485
00:30:59,159 --> 00:31:04,719
So in this particular case, we're going to create an input list.

486
00:31:04,720 --> 00:31:10,400
So again, our input list will just have some dummy values in it.

487
00:31:10,400 --> 00:31:12,400
I don't actually care what these numbers are.

488
00:31:12,400 --> 00:31:16,880
I just want to populate a whole bunch of points in a 2D plane.

489
00:31:16,880 --> 00:31:22,759
So what we're going to do is pretty much just iterate from number zero to 10, sorry,

490
00:31:22,759 --> 00:31:25,960
zero to nine, zero to 99, zero to 999.

491
00:31:25,960 --> 00:31:28,120
So on, just like we did before.

492
00:31:28,120 --> 00:31:33,880
And to get us a little coordinate in the 2D plane based on those numbers, I'm just going

493
00:31:33,880 --> 00:31:38,720
to take the cosine of that number, comma the sine of that number.

494
00:31:38,720 --> 00:31:47,020
So that together, so like cosine of one or whatever, sine of one will be this point here,

495
00:31:47,020 --> 00:31:48,520
right?

496
00:31:48,520 --> 00:31:49,680
Set up as a two point.

497
00:31:49,680 --> 00:31:53,760
And then this one might be cosine of five, right?

498
00:31:53,760 --> 00:31:57,200
Comma sine of five, something like that.

499
00:31:57,200 --> 00:32:02,400
So I'm just making a whole bunch of coordinates in a 2D plane, ensuring that I have n coordinates.

500
00:32:04,440 --> 00:32:10,440
Okay, now the loop, sorry, there's going to be two loops.

501
00:32:10,440 --> 00:32:15,640
The outer loop will basically take us through each of these elements.

502
00:32:15,640 --> 00:32:19,280
Okay, I have five in this particular case.

503
00:32:19,280 --> 00:32:24,600
And the inner loop will go through every other element, right?

504
00:32:24,600 --> 00:32:26,840
But notice it starts from i plus 1.

505
00:32:26,840 --> 00:32:30,400
And I'll tell you why that is instead of starting from zero.

506
00:32:30,400 --> 00:32:32,759
So let's just walk through.

507
00:32:32,759 --> 00:32:40,519
Let's say we start out with this element, this logias our first element in our outer for loop.

508
00:32:40,519 --> 00:32:45,440
So right now, we've grabbed the first element in our outer for loop.

509
00:32:45,440 --> 00:32:50,640
And what we're going to do is figure out the distance between it and everybody else.

510
00:32:50,640 --> 00:32:56,720
So now we're iterating through the inner for loop, going through each element except for myself.

511
00:32:57,720 --> 00:33:00,480
So I'm going to get the distance between this one and this one.

512
00:33:00,480 --> 00:33:04,039
Since it's the first one, obviously it's the biggest one.

513
00:33:04,039 --> 00:33:07,559
But then I'm going to get the distance between this one and this one, right?

514
00:33:07,559 --> 00:33:10,120
And I'm going to say, are you bigger than this one?

515
00:33:10,120 --> 00:33:11,000
It looks like no.

516
00:33:11,000 --> 00:33:13,640
So we're still keeping this one as our longest one.

517
00:33:13,640 --> 00:33:17,319
Then I'm going to grab the distance between this and this one and this and this one.

518
00:33:17,319 --> 00:33:23,519
And as I'm going through, this little if statement here keeps track of the further one.

519
00:33:23,519 --> 00:33:26,240
So the one that has the biggest magnitude, right?

520
00:33:26,240 --> 00:33:30,120
In this case, that's probably the first one we looked at.

521
00:33:30,120 --> 00:33:40,759
And after I've gone through each element, each other element, I've concluded my first iteration in my outer for loop.

522
00:33:40,759 --> 00:33:46,120
So now, the outer for loop goes to the next element in the list.

523
00:33:46,120 --> 00:33:47,640
Let's say it's this one.

524
00:33:47,640 --> 00:33:50,400
That doesn't actually matter.

525
00:33:50,400 --> 00:33:56,160
This one, we'll look at the distance between itself and everybody else except for the one

526
00:33:56,160 --> 00:33:58,759
we already looked at because we already know this distance, right?

527
00:33:58,759 --> 00:34:02,200
We kept track of it already when we iterated through this one.

528
00:34:02,200 --> 00:34:08,200
So as I'm going through my outer for loop keeping track of this point here,

529
00:34:08,200 --> 00:34:13,720
it figures out the distance between this one, this one, which is suddenly bigger than that one,

530
00:34:13,720 --> 00:34:17,920
which we had kept track of, and then this one right here, right?

531
00:34:17,920 --> 00:34:18,519
All right, good.

532
00:34:18,519 --> 00:34:21,000
So now we're still keeping track of the biggest distance we've seen.

533
00:34:21,000 --> 00:34:22,840
It's probably this one here.

534
00:34:22,840 --> 00:34:26,039
And I've concluded the second iteration of my outer for loop.

535
00:34:26,039 --> 00:34:27,880
And now I go to the next element.

536
00:34:27,880 --> 00:34:28,920
Let's say it's this one.

537
00:34:28,920 --> 00:34:30,480
Doesn't matter again.

538
00:34:30,480 --> 00:34:36,480
Now, this one is going to get the distance between itself and everybody else except for the two that we've already seen.

539
00:34:36,480 --> 00:34:37,960
This one and this one, right?

540
00:34:37,960 --> 00:34:41,159
So that's why our inner loop starts at i plus 1.

541
00:34:41,159 --> 00:34:44,920
So this one will get the distance between itself and this one all the way back there,

542
00:34:44,920 --> 00:34:47,679
and this one all the way over here, right?

543
00:34:47,679 --> 00:34:51,960
And then next iteration in the outer for loop takes a look at this one, let's say.

544
00:34:51,960 --> 00:34:54,559
And it finds the distance between itself and everybody else.

545
00:34:54,559 --> 00:34:57,400
But you know what? There's only one left.

546
00:34:57,400 --> 00:34:58,719
That one there.

547
00:34:58,719 --> 00:35:05,000
And then the last time through, this one doesn't even get a chance to find the distance between itself and anybody else

548
00:35:05,000 --> 00:35:10,480
because everybody else already found the distance between it.

549
00:35:10,480 --> 00:35:16,119
And so in this way, we're basically finding all the possible pairs of all of these points in this 2D plane

550
00:35:16,119 --> 00:35:19,920
and keeping track of the biggest distance.

551
00:35:19,920 --> 00:35:26,599
So in terms of the input list, the way that looks like, right, this i plus 1 business here,

552
00:35:26,599 --> 00:35:32,280
the outer loop basically says, I'm going to start with you and I'm going to get the difference between you

553
00:35:32,280 --> 00:35:39,800
and the element at index 1, the element at index 2 and the element at index 3.

554
00:35:39,800 --> 00:35:41,360
This outer for loop is done.

555
00:35:41,360 --> 00:35:46,360
Next, we're going to get the distance between this one and everybody else, right?

556
00:35:46,360 --> 00:35:50,039
So obviously not the element index 0 because we already know that distance.

557
00:35:50,039 --> 00:35:55,720
So we're going to get the distance between element at index 1 and index 2 and index 3.

558
00:35:55,720 --> 00:35:56,599
And then we're done.

559
00:35:56,599 --> 00:36:02,920
And then the last loop, outer loop gets the distance between element at index 2 and index 3.

560
00:36:02,920 --> 00:36:04,880
And then it's done.

561
00:36:04,880 --> 00:36:13,079
So just these two nested loops just does all of this until it finds all of these pairs.

562
00:36:13,079 --> 00:36:18,319
So basically pairs up everybody together.

563
00:36:18,319 --> 00:36:24,159
OK, so if we run it, what are we going to see?

564
00:36:24,159 --> 00:36:29,519
So my input for this particular function, you'll notice, first of all,

565
00:36:29,519 --> 00:36:34,880
is going to be much, much smaller than the inputs for everything we've done so far.

566
00:36:34,880 --> 00:36:40,199
Some of the inputs we had seen in the past were a million, 10 million, 100 million.

567
00:36:40,199 --> 00:36:46,639
In this particular case, I'm only going to go up to 6,000 because it's just going to take way too long to run

568
00:36:46,639 --> 00:36:51,759
if I make it go for any longer than that.

569
00:36:51,759 --> 00:36:53,799
So what do we see already?

570
00:36:53,799 --> 00:36:59,480
We've got 100 points, so 100 of these, right?

571
00:36:59,480 --> 00:37:06,679
Finding the maximum distance between a bunch of these pairs took about 0.03 seconds.

572
00:37:06,679 --> 00:37:09,399
If we doubled that to 200 points,

573
00:37:09,400 --> 00:37:11,639
it took 0.01 seconds.

574
00:37:11,639 --> 00:37:17,039
If we doubled that to 400 points, it took 0.05 seconds and so on and so on.

575
00:37:17,039 --> 00:37:22,519
So just like before, let's take a look at big numbers to see our trend.

576
00:37:22,519 --> 00:37:28,360
So as the numbers increase, right, by 2, if my input increases by 2,

577
00:37:28,360 --> 00:37:34,920
it looks like the time that it takes for me to find out the biggest distance increases by 4.

578
00:37:34,920 --> 00:37:39,480
So my input increases by 2, the time increases by 4.

579
00:37:39,480 --> 00:37:49,639
And I'm not going to run this, but you can make a new list on your own and change this to be inputs that are multiples of 10, right?

580
00:37:49,639 --> 00:37:51,519
Increasing by 10 each time.

581
00:37:51,519 --> 00:37:59,440
And you'll see a very similar pattern where the time it takes to run that program will be about 100 times as slow.

582
00:37:59,440 --> 00:38:06,880
So the relationship there is a n squared kind of relationship.

583
00:38:06,880 --> 00:38:09,679
All right, so a few observations here as well.

584
00:38:09,679 --> 00:38:16,360
First one I already mentioned is this program just takes a lot longer to run in general.

585
00:38:16,360 --> 00:38:22,159
So here we were able with compound and with finding whether an element is in the list and

586
00:38:22,159 --> 00:38:26,920
getting the sum of all the elements in the list, we were able to run 100 million,

587
00:38:26,920 --> 00:38:32,760
a list with 100 million elements and it still took about one something seconds.

588
00:38:32,760 --> 00:38:39,920
Whereas with this diameter function, we can barely get to 6,000 and it's already taking 14 seconds.

589
00:38:39,920 --> 00:38:44,599
So just way, way, way slower program in general.

590
00:38:44,599 --> 00:38:53,039
And then the relationship seems to be an n squared kind of relationship relating the input to how long the program takes.

591
00:38:53,039 --> 00:38:58,840
So let's actually plot, well, I already did this, but here are the relationships for

592
00:38:58,840 --> 00:39:03,440
these sort of three types of algorithms that we've seen so far.

593
00:39:03,440 --> 00:39:08,960
So this is the finding the element in a list, those three versions, sorry,

594
00:39:08,960 --> 00:39:13,400
those two versions that we saw and this is the diameter function.

595
00:39:13,400 --> 00:39:19,920
So if we plot how long it takes the program to run when the input increase,

596
00:39:19,920 --> 00:39:25,000
when, sorry, when the input is this size, we can see that there is a linear relationship.

597
00:39:25,000 --> 00:39:29,320
So the time it takes for the program to run is linear in the input.

598
00:39:33,559 --> 00:39:37,800
The diameter, we'll talk about the binary search in a bit, the diameter.

599
00:39:37,800 --> 00:39:43,079
We again, notice this just by looking at the pure numbers, but it's a lot easier to see it visually.

600
00:39:43,079 --> 00:39:46,400
When the, this is on the x axis, the size of the problem.

601
00:39:46,400 --> 00:39:49,960
So how many points we actually are finding the diameter between?

602
00:39:51,160 --> 00:39:55,079
And how long it actually takes the program to run and the relationship is quadratic.

603
00:39:55,079 --> 00:39:58,079
Now that we plot it, we clearly see the quadratic relationship.

604
00:39:59,639 --> 00:40:03,639
And then this binary search, we were very unsure of what it was, right?

605
00:40:03,639 --> 00:40:04,880
It wasn't quite constant.

606
00:40:04,880 --> 00:40:10,119
It definitely wasn't linear, but now that we've plotted it, so this is the input size.

607
00:40:10,119 --> 00:40:12,360
And this is how long it actually takes the program to run.

608
00:40:12,360 --> 00:40:16,840
You can see it drastically increases when the input size is very small,

609
00:40:16,840 --> 00:40:22,680
but then it kind of sort of asymptotically reaches some sort of value.

610
00:40:22,680 --> 00:40:24,360
It's actually a logarithmic relationship.

611
00:40:27,039 --> 00:40:28,400
All right.

612
00:40:28,400 --> 00:40:35,599
Last thing I wanted to mention about timing before we move on to counting is just purely running

613
00:40:35,599 --> 00:40:37,720
these functions on different computers.

614
00:40:37,720 --> 00:40:41,160
We'll just give us different values just right off the bat.

615
00:40:41,159 --> 00:40:48,079
So for my, on this newer-ish computer, how long did it take to run this compound?

616
00:40:48,079 --> 00:40:49,079
Well, no, what did it do?

617
00:40:49,079 --> 00:40:52,159
It took like three seconds or something, one point something seconds.

618
00:40:52,159 --> 00:40:55,839
On an older laptop, it took, you know, six, 63 seconds.

619
00:40:55,839 --> 00:41:00,159
On an even older desktop, it took 1226 seconds.

620
00:41:00,159 --> 00:41:02,559
Right. So just, you're just purely timing things.

621
00:41:02,559 --> 00:41:05,839
The machine you're running it on is going to make a difference.

622
00:41:05,839 --> 00:41:06,839
Okay.

623
00:41:07,960 --> 00:41:10,679
And then, that's fine, right?

624
00:41:10,679 --> 00:41:15,159
It's important to know how long it takes, but if you're just looking at the relationship

625
00:41:15,159 --> 00:41:20,319
between input and how long the program takes to run, that's the same.

626
00:41:20,319 --> 00:41:22,719
So it doesn't matter what machine you're running it on,

627
00:41:22,719 --> 00:41:27,399
when you increase the input by 10, the program will take 10 times as long to run.

628
00:41:27,399 --> 00:41:31,399
No matter whether you're running on a fast laptop, old laptop, or a super old desktop.

629
00:41:31,399 --> 00:41:33,199
Okay.

630
00:41:33,199 --> 00:41:38,159
So just timing a program is really important, right?

631
00:41:38,159 --> 00:41:41,679
You'd like to know whether the program you wrote, you're going to have to wait,

632
00:41:41,679 --> 00:41:45,039
you know, a month for it to finish, or a couple of minutes for it to finish.

633
00:41:45,039 --> 00:41:47,119
That's an important thing to know.

634
00:41:47,119 --> 00:41:51,920
But what we're going to get at towards the end of this lecture is something that's complementary,

635
00:41:51,920 --> 00:41:54,960
and that's this idea of asymptotic complexity.

636
00:41:54,960 --> 00:42:00,119
So kind of mathematically saying, you know what, this program is not going to be that bad to run.

637
00:42:00,119 --> 00:42:04,679
Right? You're not going to have to wait for months to run without actually running it, of course.

638
00:42:04,679 --> 00:42:09,319
So you'd be able to glance at a program and say, this one is reasonable to run.

639
00:42:09,319 --> 00:42:13,239
And so we're going to do that in terms of this idea of order of growth,

640
00:42:13,239 --> 00:42:16,879
which we'll get at in a little bit.

641
00:42:16,879 --> 00:42:19,719
Okay. Any questions on timing before we get to counting?

642
00:42:19,719 --> 00:42:21,719
Oh, yeah.

643
00:42:21,719 --> 00:42:28,839
Should we assume that old eb functions have been on your front with the right type?

644
00:42:28,839 --> 00:42:32,679
Yes. Can you assume that all built-in functions are optimal in terms of running time?

645
00:42:32,679 --> 00:42:39,960
Yes. Certainly better than when we write them.

646
00:42:39,960 --> 00:42:41,199
Yes, in Python.

647
00:42:41,199 --> 00:42:45,239
And then of course, in other languages, you know, there would be, there may be take advantage

648
00:42:45,239 --> 00:42:48,839
of other speed ups as well, like putting things in memory efficiently.

649
00:42:48,839 --> 00:42:53,919
But yeah, generally it's better to run something that's already been made than to make it yourself.

650
00:42:53,919 --> 00:42:56,960
Yeah.

651
00:42:56,960 --> 00:43:01,319
Okay. So now what we're going to do is we're going to count operations,

652
00:43:01,320 --> 00:43:03,720
just like we did last lecture.

653
00:43:03,720 --> 00:43:07,920
Clearly timing is nice, but it doesn't give us a nice relationship

654
00:43:07,920 --> 00:43:11,800
besides us like spotting it, right?

655
00:43:11,800 --> 00:43:15,080
There's no formula. There's no relationship that relates the input

656
00:43:15,080 --> 00:43:17,800
to how long it takes the program to run.

657
00:43:17,800 --> 00:43:20,080
Counting will get us a little bit closer to that.

658
00:43:20,080 --> 00:43:22,120
And we saw that last lecture.

659
00:43:22,120 --> 00:43:24,320
Let me remind you the idea of counting.

660
00:43:24,320 --> 00:43:31,200
So the idea of counting is that we're going to take a bunch of these operations

661
00:43:31,239 --> 00:43:37,279
like mathematical operations, comparisons, indexing into something,

662
00:43:37,279 --> 00:43:39,480
and assigning a value to a variable.

663
00:43:39,480 --> 00:43:45,519
All of these things, right, when we run them, yes, they might run for different amounts of time.

664
00:43:45,519 --> 00:43:50,719
One time send negative nine versus two time send negative nine, something like that.

665
00:43:50,719 --> 00:43:54,279
But that's very, that's not a very big difference.

666
00:43:54,279 --> 00:44:00,679
And so what we're going to say is that every one of these operations will consider to be constant, right?

667
00:44:00,679 --> 00:44:04,319
They will take one unit of time.

668
00:44:04,319 --> 00:44:11,039
So if we say that, we can actually come up with a relationship that tells us,

669
00:44:11,039 --> 00:44:20,719
according to, that relates the input, to how much this, how many operations this program will run.

670
00:44:20,719 --> 00:44:24,960
So here in the convert to kilometers, what do we have?

671
00:44:24,960 --> 00:44:27,639
We have one multiplication.

672
00:44:27,639 --> 00:44:31,559
And you know, just for the heck of it, this lecture, let's say the return,

673
00:44:31,559 --> 00:44:33,960
also counts as an operation.

674
00:44:33,960 --> 00:44:38,119
So in this convert to kilometer function, we have two operations.

675
00:44:38,119 --> 00:44:41,839
Notice that it's not really related to the input at all.

676
00:44:41,839 --> 00:44:48,159
So then the amount of operations that this program takes to run is always two.

677
00:44:48,159 --> 00:44:50,159
It matches what our timing said, right?

678
00:44:50,159 --> 00:44:52,480
It basically didn't matter what the input was.

679
00:44:52,480 --> 00:44:55,039
It always took approximately the same amount of time to run.

680
00:44:57,639 --> 00:45:04,639
The sum of function, so it takes an input list and it gets the sum of all the elements.

681
00:45:04,639 --> 00:45:09,239
This one will have one operation for doing this assignment.

682
00:45:09,239 --> 00:45:19,000
It'll have one operation for grabbing an element in my list L and assigning it to I.

683
00:45:19,000 --> 00:45:22,480
It'll have two operations for this total plus equals I, right?

684
00:45:22,480 --> 00:45:27,079
Remember, total plus I on the right hand side is one operation.

685
00:45:27,079 --> 00:45:32,159
And total equals that is my second operation, so that's two operations.

686
00:45:32,159 --> 00:45:34,840
And then, let's not forget our for loop.

687
00:45:34,840 --> 00:45:37,360
That's kind of the important part of this function.

688
00:45:37,360 --> 00:45:40,440
How many times will these three operations repeat?

689
00:45:40,440 --> 00:45:42,319
This one plus these two.

690
00:45:42,319 --> 00:45:46,159
Well, it's going to repeat however many elements I have in L.

691
00:45:46,159 --> 00:45:49,840
So length L times.

692
00:45:49,840 --> 00:45:52,119
And then again, let's say we count the return.

693
00:45:52,119 --> 00:45:53,719
The return will also be one operation.

694
00:45:53,719 --> 00:45:59,599
So the total number of operations for the sum of function will be one for the total equals

695
00:45:59,599 --> 00:46:02,359
zero plus length of L times three.

696
00:46:02,359 --> 00:46:06,559
Because there's three operations being done for each length of L plus another one for the return.

697
00:46:06,559 --> 00:46:11,679
So that's going to be three length L plus two.

698
00:46:11,679 --> 00:46:19,480
That's a nice little formula that relates how many units of time we'll have to wait depending

699
00:46:19,480 --> 00:46:21,399
on the size of the list.

700
00:46:21,400 --> 00:46:23,840
That's pretty cool.

701
00:46:23,840 --> 00:46:27,599
So the way that we're going to count the number of operations, again, I'm going to do it slightly

702
00:46:27,599 --> 00:46:31,760
differently in the last lecture just to show you that there is another way to do it.

703
00:46:31,760 --> 00:46:34,079
So this is our function is in.

704
00:46:34,079 --> 00:46:36,920
It's going to count how many operations we have.

705
00:46:36,920 --> 00:46:39,200
And I'm going to use something called a global variable.

706
00:46:39,200 --> 00:46:41,360
I'll show you again the difference between them.

707
00:46:41,360 --> 00:46:44,559
So it's just these three lines that I added.

708
00:46:44,559 --> 00:46:51,079
And you should never, ever use global variables in your programs except in this situation.

709
00:46:51,079 --> 00:46:55,880
The idea of global variables is that you can define variables just in the main program

710
00:46:55,880 --> 00:46:58,599
outside of any functions.

711
00:46:58,599 --> 00:47:05,159
And you can access those variables within some function purely by saying if we defined

712
00:47:05,159 --> 00:47:10,400
count out here, right, before this function definition, count equals zero or whatever, inside

713
00:47:10,400 --> 00:47:16,440
of any function, we can say, hey Python, I would like to access this variable that I defined

714
00:47:16,440 --> 00:47:18,239
outside of this function.

715
00:47:18,239 --> 00:47:23,159
You tell Python using global and then the name of that variable.

716
00:47:23,159 --> 00:47:28,519
And Python will grab that variable that's basically, quote unquote, shared across the entire

717
00:47:28,519 --> 00:47:31,759
program and modify that variable, right?

718
00:47:31,759 --> 00:47:37,039
So in essence, we're basically saying this is now a shared variable.

719
00:47:37,039 --> 00:47:43,039
If I modify it within this counter, within this function, it'll be obviously modified for

720
00:47:43,039 --> 00:47:44,559
everything else.

721
00:47:45,360 --> 00:47:50,719
It's very tempting to use global variables because all the variables you could ever want to

722
00:47:50,719 --> 00:47:53,279
create are going to be accessible by everybody, right?

723
00:47:53,279 --> 00:47:57,079
No need to pass in parameters, no need to do it, but it's very, very bad programming.

724
00:47:57,079 --> 00:48:01,920
So we won't ever do it except in this particular case because we'd like to keep a counter of

725
00:48:01,920 --> 00:48:06,480
things that are happening or for debugging purposes and things like that.

726
00:48:06,480 --> 00:48:14,519
So the count variable will keep track of, it'll just increment in key places where we

727
00:48:14,519 --> 00:48:18,360
have these constant unit of times happening.

728
00:48:18,360 --> 00:48:23,599
So I've got count plus equals one here because I've got my return value.

729
00:48:23,599 --> 00:48:29,320
I've got count plus equals two here because I grab an element from L and I do the equality

730
00:48:29,320 --> 00:48:37,639
check here and then that's it.

731
00:48:37,639 --> 00:48:46,480
So if I run that, let's down here.

732
00:48:46,480 --> 00:48:48,639
What are we going to see?

733
00:48:48,639 --> 00:48:56,279
Well, I didn't actually do how much more it ran, but we can see the relationship, right?

734
00:48:56,279 --> 00:49:01,119
We go 9 to 37 to 307 to 37 to 37 and so on.

735
00:49:01,119 --> 00:49:06,079
So again, the same relationship where we increase the input by 10, the number of operations

736
00:49:06,079 --> 00:49:11,880
we do is 10 times as more, exactly like the formula said it would be.

737
00:49:11,880 --> 00:49:13,960
What about the binary search?

738
00:49:13,960 --> 00:49:18,199
So again, we're going to use this global variable and we're going to have the counter keep track

739
00:49:18,199 --> 00:49:20,279
of all of these operations.

740
00:49:20,279 --> 00:49:25,519
So this count incrementing by three accounts for setting the load of zero, setting the

741
00:49:25,519 --> 00:49:31,559
height of this thing and grabbing this actual value of length.

742
00:49:31,559 --> 00:49:37,840
Setting the count within this while loop will keep track of this subtraction as one operation

743
00:49:37,840 --> 00:49:42,199
and the test that is greater than one is another operation.

744
00:49:42,199 --> 00:49:48,559
Counting increasing by three here accounts for high plus low, the integer division and

745
00:49:48,559 --> 00:49:52,119
assigning that value back to mid.

746
00:49:52,119 --> 00:49:59,199
Count plus three here accounts for indexing into this L, the less than or equal check,

747
00:49:59,199 --> 00:50:04,759
and then either doing this reassignment of low or this reassignment of high.

748
00:50:04,759 --> 00:50:09,960
I said three operations and then lastly count increases by three once more because I've

749
00:50:09,960 --> 00:50:11,399
got these operations here.

750
00:50:11,399 --> 00:50:18,799
So indexing into low, checking for equality and then doing the return.

751
00:50:18,799 --> 00:50:25,239
So the actual number of operations will be kept track of in, right, by the counter.

752
00:50:25,239 --> 00:50:29,559
So all we're doing is just kind of reporting how many times, how many operations we've

753
00:50:29,559 --> 00:50:30,559
done.

754
00:50:30,559 --> 00:50:36,959
So as we increase the input by 10, just like with timing, we can't quite tell what the

755
00:50:36,959 --> 00:50:38,759
relationship is, right.

756
00:50:38,759 --> 00:50:43,839
Again, it's like one point something, right, with each run.

757
00:50:43,839 --> 00:50:50,359
All right, so these are the results.

758
00:50:50,359 --> 00:50:54,679
So the observation one, as I mentioned when we increase the input by 10, this brute force

759
00:50:54,759 --> 00:51:00,919
I released it, but the brute force is in function also, does 10 times as many operations.

760
00:51:00,919 --> 00:51:06,960
The binary search, again, we don't know what rate it is at, but we can plot them.

761
00:51:06,960 --> 00:51:12,399
So here I have the plots, just like when I plotted the input size versus how long the

762
00:51:12,399 --> 00:51:14,399
program actually took to run.

763
00:51:14,399 --> 00:51:20,480
I'm now plotting the input size versus actually just the number of operations being done.

764
00:51:20,480 --> 00:51:25,440
So the is in function, that brute force way of finding whether an element is on the list

765
00:51:25,440 --> 00:51:27,840
grows linearly, no surprise there.

766
00:51:27,840 --> 00:51:35,400
And how lucky for us the binary search matches, the graph matches the one that we had for

767
00:51:35,400 --> 00:51:36,400
timing, right.

768
00:51:36,400 --> 00:51:42,760
So as I increase my size in the binary search method, the number of operations that I do

769
00:51:42,760 --> 00:51:49,480
is logarithmic in time, just like we saw in the actual timing.

770
00:51:49,480 --> 00:51:55,599
Okay, so timing and counting are really nice, right.

771
00:51:55,599 --> 00:52:01,000
Timing gives us a pure number of seconds or months or whatever we need to wait for this

772
00:52:01,000 --> 00:52:05,639
program to finish, but counting gives us a nice little formula, right.

773
00:52:05,639 --> 00:52:12,000
That relates the input to the number of operations that you have to do.

774
00:52:12,000 --> 00:52:16,240
You might have noticed, I briefly touched upon this, that throughout this entire lecture

775
00:52:16,239 --> 00:52:21,679
and last lecture, we basically just saw something like three different algorithms, right.

776
00:52:21,679 --> 00:52:27,000
We saw something that's constant, something that's linear, something that's quadratic,

777
00:52:27,000 --> 00:52:31,479
and something that's binary search, a logarithmic in this particular case, right.

778
00:52:31,479 --> 00:52:37,479
So that's four different algorithms, but we saw way more functions run, right.

779
00:52:37,479 --> 00:52:43,839
So what we'd like to do is evaluate the algorithms, not the different implementations, right.

780
00:52:43,840 --> 00:52:49,480
And what we'd like to do is evaluate these algorithms as the input gets really, really big.

781
00:52:49,480 --> 00:52:57,160
So what we're going to do is figure out a relationship between the programs run time and

782
00:52:57,160 --> 00:52:58,400
the input.

783
00:52:58,400 --> 00:53:04,480
But what we're going to do is focus on the biggest terms that contribute to the programs run

784
00:53:04,480 --> 00:53:06,440
time, right.

785
00:53:06,440 --> 00:53:09,440
So we saw these examples last time, right.

786
00:53:09,440 --> 00:53:13,760
This my sum, which basically summed all the elements, sorry, all the numbers from zero to

787
00:53:13,760 --> 00:53:20,519
x, and this silly square function that had nested loops, kind of like this diameter one, right.

788
00:53:20,519 --> 00:53:26,240
We were able to say something like, you know, when the input increases by 10, the program

789
00:53:26,240 --> 00:53:28,840
is 10 times as long to run, right.

790
00:53:28,840 --> 00:53:32,320
So the efficiency of that program was on the order of x.

791
00:53:32,320 --> 00:53:37,280
When the input increased by x, the program took x times as long to run.

792
00:53:37,280 --> 00:53:41,160
The square had a similar, we could have set it in a similar way, right.

793
00:53:41,160 --> 00:53:46,240
When the input increases by x, the program took x squared as long to run.

794
00:53:46,240 --> 00:53:53,480
So I don't actually care, right, about all of these differences in the exact time.

795
00:53:53,480 --> 00:53:56,360
One time send negative six, one point three times send negative six.

796
00:53:56,360 --> 00:53:57,680
I don't care.

797
00:53:57,680 --> 00:54:00,120
What I do care is the order of growth.

798
00:54:00,120 --> 00:54:05,880
How does the program run in relation to the input, okay.

799
00:54:05,880 --> 00:54:08,720
And I care about that when the input is really, really big.

800
00:54:08,720 --> 00:54:15,920
So what we're going to do is express the program's runtime in an order of not exact kind of

801
00:54:15,920 --> 00:54:17,720
relationship.

802
00:54:17,720 --> 00:54:24,119
So while counting was really nice, right, it told us a nice relationship between the

803
00:54:24,119 --> 00:54:31,800
input and the number of operations, when the input is really, really big, like 3x plus

804
00:54:31,840 --> 00:54:38,640
4, when x is really, really big, I don't care that the number of operations is 3x plus

805
00:54:38,640 --> 00:54:39,880
4, right.

806
00:54:39,880 --> 00:54:45,560
Because when x is really, really big, that plus 4 might as well be plus 0.

807
00:54:45,560 --> 00:54:50,880
And that 3x is basically like x when the input is really, really big, right.

808
00:54:52,120 --> 00:54:55,360
So that's what we're going to try to do, right.

809
00:54:55,360 --> 00:54:58,440
Now, before we do that, we need to decide what to measure, right.

810
00:54:58,440 --> 00:55:02,800
Because when we write functions, we're going to have functions that have a whole bunch

811
00:55:02,800 --> 00:55:05,400
of inputs potentially, right.

812
00:55:05,400 --> 00:55:09,119
So the input could be an integer, like in convert to kilometers.

813
00:55:09,119 --> 00:55:13,960
It could be a list in which case we are interested in maybe the length of the list.

814
00:55:13,960 --> 00:55:18,360
And if you have many parameters, you'd have to decide, right.

815
00:55:18,360 --> 00:55:22,119
What is the parameter that contributes to the growth of this function?

816
00:55:23,119 --> 00:55:25,119
So here's an example.

817
00:55:25,119 --> 00:55:28,119
This is our is in function.

818
00:55:28,119 --> 00:55:31,119
It looks for an element e in list L, right.

819
00:55:31,119 --> 00:55:34,119
So there's two parameters to this one.

820
00:55:34,119 --> 00:55:39,119
We can ask, does the program take longer to run as e increases, right.

821
00:55:39,119 --> 00:55:40,119
It's one of the parameters.

822
00:55:40,119 --> 00:55:42,119
Let's see what happens as we make e bigger.

823
00:55:42,119 --> 00:55:44,119
So we can look at a little example.

824
00:55:44,119 --> 00:55:48,119
If we find out whether zero is in this list containing 1, 2, 3,

825
00:55:49,119 --> 00:55:54,119
or whether a thousand is in the list 1, 2, 3, does the program take longer to run?

826
00:55:54,119 --> 00:55:56,119
No, exactly.

827
00:55:56,119 --> 00:56:02,119
So e is not really relevant in my runtime sort of calculation.

828
00:56:02,119 --> 00:56:03,119
All right.

829
00:56:03,119 --> 00:56:06,119
Well, let's consider L now.

830
00:56:06,119 --> 00:56:11,119
When we say L is going to change, it could change in two ways, right.

831
00:56:11,119 --> 00:56:16,119
The elements in L could have different values, right.

832
00:56:17,119 --> 00:56:21,119
Or the list length itself could be different.

833
00:56:21,119 --> 00:56:28,119
So in this particular function, let's say that the elements in L are small numbers versus big numbers.

834
00:56:28,119 --> 00:56:31,119
That's certainly something that could happen.

835
00:56:31,119 --> 00:56:34,119
And certainly with some functions, that's going to make a difference.

836
00:56:34,119 --> 00:56:40,119
So let's say in this particular function, if the elements in L are big versus small,

837
00:56:40,119 --> 00:56:42,119
is it going to make an impact on my runtime?

838
00:56:42,119 --> 00:56:44,119
Well, here's a little example.

839
00:56:44,119 --> 00:56:48,119
Let's say I'm looking for the number zero inside a list with 1, 2, 3,

840
00:56:48,119 --> 00:56:52,119
and the number zero inside a list with a thousand, 2,000, and 3,000.

841
00:56:52,119 --> 00:56:54,119
Is that going to make a difference?

842
00:56:54,119 --> 00:56:56,119
No, right.

843
00:56:56,119 --> 00:57:01,119
So the size of the elements themselves don't really matter.

844
00:57:01,119 --> 00:57:05,119
And what last thing to ask ourselves is what about the length of the list?

845
00:57:05,119 --> 00:57:09,119
So if L has different lengths, will this big difference in our runtime?

846
00:57:09,119 --> 00:57:10,119
Right.

847
00:57:10,119 --> 00:57:15,119
So if we're looking for zero in a list of three elements, or zero in a list with 10 elements,

848
00:57:15,119 --> 00:57:20,119
where clearly that zero is nowhere to be found, is that length list that's going to have a difference?

849
00:57:20,119 --> 00:57:22,119
Yeah, in this case it will, exactly.

850
00:57:22,119 --> 00:57:30,119
So here in this particular function, the input I'd be interested in sort of reporting,

851
00:57:30,119 --> 00:57:34,119
the runtime is the length of the list, right.

852
00:57:34,119 --> 00:57:39,119
Not the elements in the list, not e itself, but the length of the list.

853
00:57:39,119 --> 00:57:43,119
So the last thing that I'll mention is for this particular class,

854
00:57:43,119 --> 00:57:45,119
we're going to talk about the worst case scenario.

855
00:57:45,119 --> 00:57:48,119
So you might have noticed in this previous example here, right.

856
00:57:48,119 --> 00:57:52,119
I always looked for an element that wasn't even in the list.

857
00:57:52,119 --> 00:57:53,119
Right.

858
00:57:53,119 --> 00:57:58,119
So when you're faced with a function, you ask yourself, this particular class at least,

859
00:57:58,119 --> 00:58:00,119
what is the worst case scenario?

860
00:58:00,119 --> 00:58:04,119
And finding out whether a function's in the list, the worst case scenario for us

861
00:58:04,119 --> 00:58:06,119
is if it's not in the list at all.

862
00:58:06,119 --> 00:58:07,119
Right.

863
00:58:08,119 --> 00:58:13,119
So that's sort of another aspect of runtime that we don't actually,

864
00:58:13,119 --> 00:58:17,119
we won't talk about, because for us, we're always interested in the worst case.

865
00:58:17,119 --> 00:58:21,119
But there are certainly analyses where you could look at the best case scenario,

866
00:58:21,119 --> 00:58:24,119
which is, well, the element is the first one in the list.

867
00:58:24,119 --> 00:58:28,119
Right. In that case, you're always going to find it right away, so it's constant.

868
00:58:28,119 --> 00:58:32,119
Or an average case scenario, which is kind of what people do in the real world.

869
00:58:32,119 --> 00:58:34,119
Right. You're not always encountering the worst case.

870
00:58:35,119 --> 00:58:38,119
But for us, we're going to look at the worst case scenario.

871
00:58:38,119 --> 00:58:43,119
So our goal is going to be to describe how the runtime grows as the size of the input grows

872
00:58:43,119 --> 00:58:45,119
in a really general way.

873
00:58:45,119 --> 00:58:49,119
So we're not going to be interested in figuring out the exact number of operations.

874
00:58:49,119 --> 00:58:52,119
No 3x plus 2 kind of deal here.

875
00:58:52,119 --> 00:58:56,119
We're just going to focus on terms that are really, that grow the fastest.

876
00:58:56,119 --> 00:59:01,119
We're going to eliminate any sort of additive, multiplicative constants, and things like that.

877
00:59:01,119 --> 00:59:04,119
So we're just going to focus on terms that grow the fastest.

878
00:59:04,119 --> 00:59:07,119
And that will give us our order of growth.

879
00:59:07,119 --> 00:59:14,119
So the way we're going to denote the order of growth is using this notation called big O and big theta.

880
00:59:14,119 --> 00:59:18,119
Okay. Now, warning.

881
00:59:18,119 --> 00:59:20,119
We're going to have some math coming our way.

882
00:59:20,119 --> 00:59:23,119
It's going to be like three slides of just pure math.

883
00:59:23,119 --> 00:59:25,119
Okay. You can sit back.

884
00:59:25,119 --> 00:59:27,119
You won't need to know it.

885
00:59:27,119 --> 00:59:36,119
You won't need to know the details, but it will motivate us to kind of give us the idea about this asymptotic order of growth.

886
00:59:36,119 --> 00:59:37,119
All right.

887
00:59:37,119 --> 00:59:41,119
So this is the mathematical definition of big O.

888
00:59:41,119 --> 00:59:45,119
So what we would like to do, there will be a drawing though.

889
00:59:45,119 --> 00:59:50,119
So what we would like to do is figure out an upper bound for our function.

890
00:59:50,119 --> 00:59:53,119
So the function might look like this.

891
00:59:53,119 --> 00:59:59,119
And I know this is just an F, but we relate this to our class by saying, you know what?

892
00:59:59,119 --> 01:00:05,119
If we did the order of calculation, sorry, the number of operations analysis, right, for a function,

893
01:00:05,119 --> 01:00:08,119
we could basically come up with something like this, right?

894
01:00:08,119 --> 01:00:10,119
We came up with 3x plus 2.

895
01:00:10,119 --> 01:00:16,119
We could come up with 3x squared plus 20x plus 1 for some random function that we wrote.

896
01:00:16,119 --> 01:00:19,119
So that we considered the function.

897
01:00:19,119 --> 01:00:23,119
Now, the big O is going to be the upper bound on this function.

898
01:00:23,119 --> 01:00:30,119
So if I plot this function in my x, y axis, this is what it looks like.

899
01:00:30,119 --> 01:00:38,119
The big O will be some other function that's going to upper bound this one, the blue one.

900
01:00:38,119 --> 01:00:39,119
Okay.

901
01:00:39,119 --> 01:00:44,119
And it's going to upper bound it for all values beyond some x, right?

902
01:00:44,119 --> 01:00:50,119
So for all values beyond some number on the x axis, some cross-over point,

903
01:00:50,119 --> 01:00:57,119
this big O of g, this g will always be bigger than my F. That's the idea here.

904
01:00:57,119 --> 01:01:01,119
So clearly x is not going to upper bound it, right?

905
01:01:01,119 --> 01:01:06,119
Because after this cross-over point, x will be below my function.

906
01:01:06,119 --> 01:01:10,119
No matter how big, how big of a constant I tack on to that x.

907
01:01:10,119 --> 01:01:16,119
And have 1,000 x. That's still not going to upper bound my little blue line here.

908
01:01:16,119 --> 01:01:20,119
So what we're going to do is we're going to increase the exponential there.

909
01:01:20,119 --> 01:01:22,119
So let's take x squared.

910
01:01:22,119 --> 01:01:26,119
Well, x squared is getting closer. It looks like they're both quadratics.

911
01:01:26,119 --> 01:01:33,119
But this orange line is not above the blue line for some cross-over point.

912
01:01:34,119 --> 01:01:45,119
2x getting closer, 3x getting closer, 4x is an upper bound on my F.

913
01:01:45,119 --> 01:01:53,119
Because after this little cross-over point here at about 20, my orange line, the g,

914
01:01:53,119 --> 01:01:57,119
will be always above my blue line, my F.

915
01:01:57,119 --> 01:02:00,119
Right? So far so good. Just visually speaking.

916
01:02:00,119 --> 01:02:01,119
Yeah.

917
01:02:01,119 --> 01:02:05,119
So orange one, so low it, there, and do that happen?

918
01:02:05,119 --> 01:02:12,119
Yeah, the orange one is below it. That's totally fine because what we're interested in is the behavior when the input is really big.

919
01:02:12,119 --> 01:02:16,119
So that's why I don't care about weird stuff happening down there.

920
01:02:16,119 --> 01:02:19,119
All I care about is when my x is super big.

921
01:02:19,119 --> 01:02:23,119
Okay. So now I've found this g.

922
01:02:23,119 --> 01:02:30,119
So I can say that after this point, 20, my orange line will always be above my blue.

923
01:02:30,119 --> 01:02:37,119
So I can say that my F is big O of x squared.

924
01:02:37,119 --> 01:02:44,119
Okay? Because I don't care about this for so much because it's just a multiplicative constant.

925
01:02:44,119 --> 01:02:56,119
Because this 4x is always greater than my function for all x greater than this cross-over point here.

926
01:02:56,119 --> 01:02:59,119
That's it. That's the definition.

927
01:02:59,119 --> 01:03:07,119
So the g here is basically this function without the multiplicative constant in front of it.

928
01:03:07,119 --> 01:03:12,119
Okay. So I say 3x squared plus 20x plus 1 is big O of x squared.

929
01:03:12,119 --> 01:03:19,119
So generally speaking, that was just an example, generally speaking, the big O is an upper bound on my function.

930
01:03:19,119 --> 01:03:25,119
Okay? And this is now just using variables like constants and things like that.

931
01:03:25,119 --> 01:03:28,119
But it's exactly the same situation that we had from before.

932
01:03:28,119 --> 01:03:37,119
Okay? So I'm going to try to map the blue to the blue and the orange to the orange and the purple to the purple to help you kind of match up what we saw in the previous slide.

933
01:03:37,119 --> 01:03:43,119
So basically we say that our function F is big O of this orange g.

934
01:03:43,119 --> 01:04:01,119
Right? If we can find some blue constant, right, where this constant was this 4 here, where that constant multiplied by g, the x squared, is greater than my function for all values beyond that cross-over point.

935
01:04:01,119 --> 01:04:08,119
So I found my 4 because 4x squared is always greater than my function beyond 21.

936
01:04:08,119 --> 01:04:11,119
Okay? That's what we saw in the picture.

937
01:04:11,119 --> 01:04:21,119
Right? So then we can say that my function F is big O of g of x, where that g is x squared.

938
01:04:21,119 --> 01:04:41,119
Right? So in terms of the picture here, right, this is kind of a little zoom in of what happens. Anything can happen down here, but beyond the cross-over point, which is here, in the big picture, that cross-over point, beyond that cross-over point, my orange is always greater than my blue.

939
01:04:41,119 --> 01:04:53,119
So what does this mean? We're going to talk about this in a few slides, but you might have thought about this. I can actually pick any function that grows faster than 3x squared.

940
01:04:53,119 --> 01:05:10,119
Right? I can pick x factorial. X factorial grows super fast, or 2 to the x. That also grows super fast. All of those functions that grow way faster than mine are also upper bounds on this function.

941
01:05:10,119 --> 01:05:30,119
Okay. So that's big O. It's just an upper bound. Then what is theta? For the reason I just stated, right? I said x factorial, 2 to the x. All of these functions that grow much faster than my function are all upper bounds.

942
01:05:30,119 --> 01:05:43,119
And that's not really helpful for us when we say, oh, this function is big O of whatever. Right? Because you can just pick something that's ludicrously fast, that grows ludicrously fast, and say that that has no meaning.

943
01:05:43,119 --> 01:05:52,119
So instead, what we usually report is the theta, which is actually an upper bound and a lower bound for our function. Right?

944
01:05:52,119 --> 01:06:05,119
So using the exact same reasoning, we're going to find some constant tacked on to that g of x such that that function grows is always underneath our function.

945
01:06:05,119 --> 01:06:17,119
Okay. So again, I'll put up a lot of math, but basically these first two lines here, this one here, there exists blah, blah, blah, blah, blah, that first here. This is is the big O definition.

946
01:06:17,119 --> 01:06:35,119
So we've already know what that means. All we're going to do is tack on another condition, which is that we can find another constant for that same g where that function beyond some crossover point is always below my blue line.

947
01:06:35,119 --> 01:06:52,119
So here's an example, right? Forex squared, we saw that it grew faster than 3x squared beyond a crossover point. Well, we could say 2x squared will always grow slower than its own crossover point.

948
01:06:52,119 --> 01:07:10,119
Okay. So the constant 4 was the same as we had seen before, but this constant 2 now becomes a lower bound. Right? So I'm basically trying to have that same g both upper bind and lower bound my blue function.

949
01:07:10,119 --> 01:07:16,119
Right? And that's the definition of theta.

950
01:07:16,119 --> 01:07:31,119
So now I can no longer say that 2 to the x, right? An exponential, both upper bounds and lower bounds it because that 2 to the x will grow faster than my function no matter what constant I tacked on to it.

951
01:07:31,119 --> 01:07:46,119
So now what we see is that really the g of x is going to be the term that grows the fastest. It's just going to be that term here. Right? It's going to be the thing without the fastest growing term in my function without the constant on it.

952
01:07:46,119 --> 01:07:56,119
Okay. So yes, we will never remember all that, but we're going to do a bunch of exercises and you're going to see just how easy it is to figure out the order of growth.

953
01:07:56,119 --> 01:08:06,119
But I will mention this just again because it's very important. Right? So when we're talking about upper bounds, you can pick any function that grows faster than yours. Right?

954
01:08:06,119 --> 01:08:18,119
F of x, this 3x squared thing is all of x squared. Yes, but it's also of x cubed of x to the 5, of x to the 100, of 2 to the x, of x factorial, all of those things that grow much faster.

955
01:08:18,119 --> 01:08:30,119
But my f of x is only one theta and it's theta of x squared. Right? And that's the term that grow, that's the term that grows the fastest in my function here.

956
01:08:31,119 --> 01:08:45,119
So when we look at a function, right, based on the number of operations or however you know, you know, you're given the function, when we look at the order of growth of the function, we just focus on the dominant term. Right?

957
01:08:45,119 --> 01:08:57,119
So in the first one, the input here is n and the function is n squared plus 2n plus 2. Which one of these is the dominant term? You tell me.

958
01:08:58,119 --> 01:09:09,119
Yes, exactly, n squared. So this function is just going to be theta of n squared. That's it. How about in the next one? What's the dominant term here?

959
01:09:12,119 --> 01:09:24,119
Yeah, exactly, 3x squared. Even though 100,000 x is going to be huge for a while and this constant is also going to be huge for a while, as x gets really, really big, this 3x squared,

960
01:09:24,119 --> 01:09:41,119
and in fact, just x squared will kind of take over everything else. Right? So this next one is theta of x squared. How about the next one? What's the term that grows the fastest here? Yeah, exactly, right?

961
01:09:41,119 --> 01:09:51,119
Log is is is is is sort of right? So this theta of this function is just theta of a. So notice what we're doing here is just focusing on the dominant term.

962
01:09:51,119 --> 01:10:08,119
We're going to drop the multiplicative constants, drop every other term, and relate the theta in terms of the input. Right? So I don't just use theta of n all the time. Right? In the previous one, it's tempting to say the first one is theta of n squared, the next one is theta of n squared, the last one is theta of n.

963
01:10:08,119 --> 01:10:19,119
But n is not always the input to your function. Right? If it is great, if it's not, you always have to relate it according to the input of the function. Maybe it's length L. Maybe it's, you know, something else.

964
01:10:19,119 --> 01:10:34,119
Okay, so let's have you try a couple more. What is the theta of the first one here? What's the term that grows the fastest? Yeah, theta of x, next one.

965
01:10:34,119 --> 01:10:43,119
And cubed, exactly, theta of n cubed. Yet, it's going to be so easy. I know that math was scary. How about the next one?

966
01:10:44,119 --> 01:10:51,119
That's the term that grows the fastest, but then it's theta of drop any multiplicative constants, and it's just theta of y.

967
01:10:51,119 --> 01:11:04,119
The last one is going to be tricky. What is the theta if the variable is only B? Yeah, two to the B. What about if the variable is only A?

968
01:11:05,119 --> 01:11:11,119
A cubed, exactly. And if my function is both a function of A and B,

969
01:11:16,119 --> 01:11:26,119
and A plus A cubed, right? Because both will contribute to the runtime of this function, right? Not just the B.

970
01:11:27,119 --> 01:11:32,119
So if this function, whatever this crazy function is that I wrote that takes so long to run,

971
01:11:32,119 --> 01:11:40,119
had both inputs B and A, right? As its parameters, the theta for that function is in terms of both B and A.

972
01:11:40,119 --> 01:11:44,119
The dominant terms of each. Yeah.

973
01:11:47,119 --> 01:11:50,119
No, no need to worry about negative coefficients.

974
01:11:51,119 --> 01:11:56,119
Yeah. Yeah. Yeah.

975
01:11:56,119 --> 01:11:57,119
Question.

976
01:12:09,119 --> 01:12:17,119
Oh, some different variable that's not even here. Yeah. If the parameter, the function was C, let's say for this last one,

977
01:12:17,119 --> 01:12:22,119
but the formula was this, then the theta would be just constant, theta of 1.

978
01:12:22,119 --> 01:12:28,119
Because it doesn't even depend on these variables, so these are just considered constant time.

979
01:12:28,119 --> 01:12:33,119
That's a great question. Yeah. If the parameter was C or something else.

980
01:12:35,119 --> 01:12:40,119
Okay. So now we can actually look at functions that we write, and we do the exact same thing.

981
01:12:41,119 --> 01:12:45,119
We can first start out with just saying how many operations does this function take?

982
01:12:45,119 --> 01:12:51,119
Come up with that relationship, and just theta that, right? Just like we did on the previous slide.

983
01:12:51,119 --> 01:12:57,119
So here's a function that calculates the factorial. What do we have here?

984
01:12:57,119 --> 01:13:04,119
Well, we've got, this is constant here, right? We've got just one while loop where there's five things going on here.

985
01:13:05,119 --> 01:13:09,119
There's the comparison. There's this times equals, which is two operations.

986
01:13:09,119 --> 01:13:17,119
This minus equals its two operations. So this function is just five n plus two by the same analysis we did a few slides ago.

987
01:13:17,119 --> 01:13:24,119
Right? So if we say what's the theta of this function? Well, what's the theta of this thing five n plus two?

988
01:13:24,119 --> 01:13:30,119
Super easy, right? It's just theta of n. And in this case, the parameter, our function is truly n.

989
01:13:35,119 --> 01:13:41,119
When we have functions that are slightly more complex, and we've got things that are in series, like for example here,

990
01:13:41,119 --> 01:13:48,119
I've got two for loops one right after the other. We basically use this law of addition to take care of that.

991
01:13:48,119 --> 01:13:57,119
So that means we figured out what the theta is for the first for loop, the theta for the next for loop, and we just add those two theta's together.

992
01:13:58,119 --> 01:14:04,119
So the first for loop here is theta of n, because it's something that depends on parameter n.

993
01:14:04,119 --> 01:14:14,119
And the next for loop here is theta of n squared, right? And this, because the parameter here is n times n.

994
01:14:14,119 --> 01:14:19,119
The stuff inside the for loops are constant, so they don't contribute anything to our theta's, right?

995
01:14:19,119 --> 01:14:23,119
There's no more things to multiply the complexity there.

996
01:14:24,119 --> 01:14:30,119
So that if this is my entire function here, the theta for this function is theta of n plus theta of n squared, right?

997
01:14:30,119 --> 01:14:40,119
And the law of addition just says theta of n plus theta of n squared is just theta of sticking those two inside as part of my function, n plus n squared.

998
01:14:40,119 --> 01:14:47,119
And we know how to do that, that just simplifies to the dominant term, which is n squared.

999
01:14:48,119 --> 01:14:53,119
So that's the law of addition, so that's when we have loops or things like that in series.

1000
01:14:53,119 --> 01:14:57,119
What about when we have loops that are nested, right?

1001
01:14:57,119 --> 01:15:06,119
Then we use the law of multiplication, because for each one of these things, we're going to have to do this that many times.

1002
01:15:07,119 --> 01:15:12,119
So in this particular case, we need to be careful, the outer for loop is going to be theta of n.

1003
01:15:12,119 --> 01:15:24,119
And the inner for loop is also theta of n. Even though I'm dividing n by 2, 0.5 times n is still theta of n.

1004
01:15:24,119 --> 01:15:34,119
That multiplicative constant in front of that n is 0.5, which is just, you know, it still leads me to be theta of n.

1005
01:15:34,119 --> 01:15:38,119
The print is constant, so there's nothing else to multiply there.

1006
01:15:38,119 --> 01:15:48,119
So the law of multiplication just says theta of n times theta of n is theta of n squared inside there.

1007
01:15:48,119 --> 01:15:52,119
Okay, so let's look at this program.

1008
01:15:52,119 --> 01:15:55,119
What is the theta for this?

1009
01:15:56,119 --> 01:15:59,119
Well, we could do it sort of in very grave detail.

1010
01:15:59,119 --> 01:16:06,119
We've got x as our parameter, so we only count loops and things like that that are a function of x.

1011
01:16:06,119 --> 01:16:12,119
If I had a loop that was a function of, I don't know, n or something, that doesn't count, because it's not a function of my input.

1012
01:16:12,119 --> 01:16:15,119
So only look at things that are a function of x.

1013
01:16:15,119 --> 01:16:20,119
I've got one outer for loop that goes through x times.

1014
01:16:21,119 --> 01:16:23,119
So that's theta of x.

1015
01:16:23,119 --> 01:16:28,119
I've got an inner for loop that starts from i and goes to x.

1016
01:16:28,119 --> 01:16:30,119
That's a little bit tricky.

1017
01:16:30,119 --> 01:16:38,119
But in the end, overall, it's going to be theta of x because it's going to be the first time it's going to go through x times.

1018
01:16:38,119 --> 01:16:42,119
The next time it's going to go x minus 1, then x minus 2, then x minus 3.

1019
01:16:42,119 --> 01:16:46,119
So we're effectively just kind of adding over all of these runs,

1020
01:16:47,119 --> 01:16:50,119
1 plus 2 plus 3 plus 4 plus 5 all the way up to x.

1021
01:16:50,119 --> 01:16:53,119
And that's just some function of x.

1022
01:16:53,119 --> 01:16:56,119
It's definitely not going to be constant.

1023
01:16:56,119 --> 01:17:00,119
So the inner loop is also theta of x.

1024
01:17:00,119 --> 01:17:03,119
Everything else is theta of 1.

1025
01:17:03,119 --> 01:17:06,119
There's nothing else that depends on x.

1026
01:17:06,119 --> 01:17:11,119
So this whole function is going to be theta of 1 for this assignment here.

1027
01:17:11,119 --> 01:17:15,119
Theta of x times theta of x for this nested loop here.

1028
01:17:15,119 --> 01:17:20,119
And theta of 1 for this return down here.

1029
01:17:20,119 --> 01:17:25,119
So overall, it's just going to be theta of, that's that.

1030
01:17:25,119 --> 01:17:32,119
And so overall, it's just going to be theta of x squared, just by the laws of multiplication and addition.

1031
01:17:32,119 --> 01:17:33,119
All right.

1032
01:17:33,119 --> 01:17:34,119
Think about this.

1033
01:17:34,119 --> 01:17:41,119
And then tell me what you think it is.

1034
01:17:41,119 --> 01:17:44,119
What do you guys think it is?

1035
01:17:45,119 --> 01:17:46,119
Yeah.

1036
01:17:46,119 --> 01:17:49,119
Theta of length of l. Absolutely right.

1037
01:17:49,119 --> 01:17:50,119
So this is constant.

1038
01:17:50,119 --> 01:17:52,119
This stuff inside the loop is constant.

1039
01:17:52,119 --> 01:17:53,119
The return is constant.

1040
01:17:53,119 --> 01:17:56,119
The only thing that depends on l is the length of the nest, right?

1041
01:17:56,119 --> 01:17:57,119
This loop.

1042
01:17:57,119 --> 01:18:00,119
So the answer is theta of length of l. Perfect.

1043
01:18:00,119 --> 01:18:02,119
How about this one?

1044
01:18:05,119 --> 01:18:09,119
So here we're assuming all the inputs are the same length.

1045
01:18:09,119 --> 01:18:12,119
Yeah.

1046
01:18:12,119 --> 01:18:15,119
Theta of length of pick your favorite one.

1047
01:18:15,119 --> 01:18:17,119
Theta of length l is reasonable.

1048
01:18:17,119 --> 01:18:20,119
You could also say theta of length l 1 or theta of length l 2.

1049
01:18:20,119 --> 01:18:23,119
Because these are two loops that are in series, right?

1050
01:18:23,119 --> 01:18:25,119
So this one just loops through the length of l.

1051
01:18:25,119 --> 01:18:30,119
But inside we're not doing anything that costs more than just constant time, right?

1052
01:18:30,119 --> 01:18:33,119
Here we're just comparing two numbers, like three and two.

1053
01:18:33,119 --> 01:18:35,119
We're just assigning something to true.

1054
01:18:35,119 --> 01:18:38,119
So nothing else really depends on the length of the list.

1055
01:18:38,119 --> 01:18:40,119
So this is theta of length l.

1056
01:18:40,119 --> 01:18:42,119
This is plus theta of length l.

1057
01:18:42,119 --> 01:18:45,119
So that's just theta of length l.

1058
01:18:45,119 --> 01:18:46,119
All right.

1059
01:18:46,119 --> 01:18:49,119
So we saw a bunch of different algorithms, right?

1060
01:18:49,119 --> 01:18:50,119
Sorry.

1061
01:18:50,119 --> 01:18:53,119
No. We didn't say a bunch of different programs.

1062
01:18:53,119 --> 01:18:59,119
But we could kind of classify them all into one of these categories, right?

1063
01:18:59,119 --> 01:19:07,119
And this is all, basically, all the different algorithms that you could ever write in general, right?

1064
01:19:07,119 --> 01:19:12,119
So something that's constant, theta of 1, something that's logarithmic is theta log n.

1065
01:19:12,119 --> 01:19:13,119
Something that's linear.

1066
01:19:13,119 --> 01:19:15,119
We saw many of these is theta of n.

1067
01:19:15,119 --> 01:19:16,119
Something that's log linear.

1068
01:19:16,119 --> 01:19:18,119
We haven't seen any yet.

1069
01:19:18,119 --> 01:19:20,119
But that's theta of n log n.

1070
01:19:20,119 --> 01:19:24,119
Theta of n to some constant, like n squared and cubed is polynomial.

1071
01:19:24,119 --> 01:19:30,119
And theta of some constant to the n, like two to the n, three to the n, is exponential.

1072
01:19:30,119 --> 01:19:35,119
And when we're writing our programs, you can do a quick analysis of the program that you just wrote.

1073
01:19:35,119 --> 01:19:38,119
Look at the loops. Look at to see how efficient you wrote it.

1074
01:19:38,119 --> 01:19:42,119
And you could basically classify your program into one of these categories, right?

1075
01:19:42,119 --> 01:19:48,119
If you had nested loops that both depend on the input, you probably wrote a polynomial type algorithm.

1076
01:19:48,119 --> 01:19:54,119
If you just had one loop that dependent on the input, you probably wrote a linear type algorithm, right?

1077
01:19:54,119 --> 01:19:59,119
And when we write these algorithms at a first pass, we want to be somewhere up here.

1078
01:19:59,119 --> 01:20:03,119
You don't want to do anything that's polynomial or definitely not exponential.

1079
01:20:03,119 --> 01:20:08,119
Because things get slow really quickly with those numbers, right?

1080
01:20:08,119 --> 01:20:13,119
And so we never ever want to be in that situation, although sometimes it's unavoidable.

1081
01:20:13,119 --> 01:20:15,119
That's all I've got.

1082
01:20:15,119 --> 01:20:23,119
Next lecture, we will be going through a bunch of those different complexity classes and looking at different programs that land in those classes, right?

1083
01:20:23,119 --> 01:20:26,119
Especially the logarithmic and the logliners.

1084
01:20:26,119 --> 01:20:28,119
All right.

1085
01:20:33,119 --> 01:20:36,119
You

