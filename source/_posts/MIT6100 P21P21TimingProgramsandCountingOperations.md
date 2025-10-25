---
title: MIT6100 P21P21TimingProgramsandCountingOperations
---

1
00:00:00,000 --> 00:00:13,359
Let's get started.

2
00:00:13,359 --> 00:00:16,080
So today's lecture will be super short.

3
00:00:16,080 --> 00:00:21,719
We've got a 45 minute quiz on object-oriented programming classes, that kind of stuff.

4
00:00:21,719 --> 00:00:27,080
So I wanted to give you guys an extra bit of time to work through three programming problems.

5
00:00:27,079 --> 00:00:33,159
But the actual lecture part, we're going to switch gears a little bit, and we're going

6
00:00:33,159 --> 00:00:40,159
to start talking about something more theoretical, which is how to figure out whether the programs

7
00:00:40,159 --> 00:00:43,959
we write are efficient and how efficient are they.

8
00:00:43,959 --> 00:00:49,399
So we're going to do that today using the idea of timing our programs and then counting

9
00:00:49,399 --> 00:00:51,719
number of operations as I'll describe it in a little bit.

10
00:00:52,240 --> 00:00:54,039
First of all, a little bit of motivation.

11
00:00:54,039 --> 00:00:57,960
So why do we actually care about this topic?

12
00:00:57,960 --> 00:01:03,359
It's a topic that's a high research area on computer science.

13
00:01:03,359 --> 00:01:06,439
So far in this class, though, we've emphasized correctness, right?

14
00:01:06,439 --> 00:01:12,239
In problem sets, the unit tests check whether that the programs you wrote were correct.

15
00:01:12,239 --> 00:01:18,719
In quizzes, we basically look at how many test cases you pass, right, and to determine the grade.

16
00:01:18,719 --> 00:01:23,760
But these days, we actually have a whole bunch of data coming at us, right?

17
00:01:23,760 --> 00:01:30,039
So we have a lot of data that we need to analyze, we need to read, we need to visualize, we need

18
00:01:30,039 --> 00:01:31,840
to make sense of.

19
00:01:31,840 --> 00:01:36,519
And so the programs that we write, yes, they have to be correct, which is a large part of

20
00:01:36,519 --> 00:01:39,719
it, but they also have to be fast, right?

21
00:01:39,719 --> 00:01:46,400
So if it takes a year to analyze a bunch of information on YouTube videos, nobody's

22
00:01:46,400 --> 00:01:48,800
going to really want to wait that long, right?

23
00:01:48,800 --> 00:01:54,440
And so we're going to emphasize in the next three or four lectures, I forget exactly

24
00:01:54,440 --> 00:01:59,719
how many, but the next little section in this class, the idea of how to determine the

25
00:01:59,719 --> 00:02:01,440
efficiency of our programs.

26
00:02:01,440 --> 00:02:02,439
Okay?

27
00:02:02,439 --> 00:02:07,120
So when we're talking about efficiency, we can talk about the time efficiency of programs

28
00:02:07,120 --> 00:02:10,200
and also the space efficiency of programs.

29
00:02:10,200 --> 00:02:13,280
And usually there's going to be a trade-off between these two.

30
00:02:13,280 --> 00:02:18,159
So very rarely these days, can you come up with an algorithm that's both efficient in

31
00:02:18,159 --> 00:02:22,360
time and space compared to algorithms that are already out there.

32
00:02:22,360 --> 00:02:28,520
So usually there's a trade-off, and the best example is the one that we saw with Fibonacci.

33
00:02:28,520 --> 00:02:33,080
So we saw a code that was recursive to calculate Fibonacci.

34
00:02:33,080 --> 00:02:37,159
So Fibonacci of N was Fibonacci of N minus 1 plus Fibonacci of N minus 2, right?

35
00:02:37,159 --> 00:02:40,159
That was our recursive step.

36
00:02:40,159 --> 00:02:47,280
That program that was recursive took something like 30 million steps to calculate Fibonacci

37
00:02:47,280 --> 00:02:48,280
of 30 something, right?

38
00:02:48,280 --> 00:02:52,759
It was 30 million recursive calls, which was pretty slow.

39
00:02:52,759 --> 00:02:55,240
It took a couple of seconds for it to run.

40
00:02:55,240 --> 00:02:57,319
But then we saw a version with memoization.

41
00:02:57,319 --> 00:02:59,439
Now, there's no arm missing there.

42
00:02:59,439 --> 00:03:03,719
It's just memoization, sort of the process of keeping a memo through a dictionary in that

43
00:03:03,719 --> 00:03:05,719
particular case.

44
00:03:05,719 --> 00:03:11,479
And the memoization idea was that we would take some values that we calculate, and as

45
00:03:11,479 --> 00:03:14,079
we calculate them, store them in the memo.

46
00:03:14,079 --> 00:03:22,800
So in the memoization example, we had given up some of our memory to store these values

47
00:03:22,800 --> 00:03:24,439
so that we didn't have to compute them.

48
00:03:24,439 --> 00:03:29,639
And in the process of doing so, we had a program that ran really, really quick, right?

49
00:03:29,639 --> 00:03:34,079
Much quicker than the plane recursive version that we had originally seen.

50
00:03:34,080 --> 00:03:35,440
So there's this trade-off, right?

51
00:03:35,440 --> 00:03:39,960
Where you have a program that's fast, but might store some values and take up more memory,

52
00:03:39,960 --> 00:03:44,840
or a program that doesn't store anything, but then is not going to be as fast.

53
00:03:44,840 --> 00:03:50,200
It's going to be slower because it needs to keep computing a bunch of different values.

54
00:03:50,200 --> 00:03:55,800
So what we're going to do in this lecture is kind of show you a very simple way of figuring

55
00:03:55,800 --> 00:03:59,800
out how efficient our programs are, which is we're just going to time them, and then we're

56
00:03:59,800 --> 00:04:03,520
going to count the number of operations that these programs take.

57
00:04:03,520 --> 00:04:07,080
But we're going to do so with the idea in the back of our mind that there's going to

58
00:04:07,080 --> 00:04:11,120
be a better way to figure out the efficiency of these programs.

59
00:04:11,120 --> 00:04:15,800
And ultimately, we don't really want to figure out the efficiency of an implementation,

60
00:04:15,800 --> 00:04:16,800
right?

61
00:04:16,800 --> 00:04:23,800
An implementation means you implement a program that finds us some using a Y loop.

62
00:04:23,800 --> 00:04:27,160
I implement the program to find us some using a formula, right?

63
00:04:27,160 --> 00:04:31,280
Those are two different implementations, but at their core, the algorithms or behind

64
00:04:31,279 --> 00:04:33,559
the scenes is going to be the same.

65
00:04:33,559 --> 00:04:38,519
And so what we want to do is to try to figure out how to evaluate algorithms as opposed

66
00:04:38,519 --> 00:04:40,199
to these different implementations, right?

67
00:04:40,199 --> 00:04:43,559
Because each one of you is going to come up with a completely different implementation

68
00:04:43,559 --> 00:04:45,199
for today's quiz, right?

69
00:04:45,199 --> 00:04:46,199
But I don't want to evaluate that.

70
00:04:46,199 --> 00:04:49,799
I would like to evaluate sort of the algorithms behind the scenes.

71
00:04:49,799 --> 00:04:50,799
Okay.

72
00:04:50,799 --> 00:04:56,199
So we're going to do, like I mentioned, we're going to today look at measuring how long

73
00:04:56,199 --> 00:04:59,199
our program takes with an actual timer.

74
00:04:59,199 --> 00:05:04,519
And then we're going to also count how many operations our program takes.

75
00:05:04,519 --> 00:05:07,279
And then we're not going to look at this other abstract notion.

76
00:05:07,279 --> 00:05:11,199
We're going to look at that next lecture.

77
00:05:11,199 --> 00:05:14,279
So today's lecture, we're going to use another module.

78
00:05:14,279 --> 00:05:18,279
We've been looking at modules in the past couple lectures already, right?

79
00:05:18,279 --> 00:05:23,199
We've seen the random module, which helps us deal with random numbers.

80
00:05:23,199 --> 00:05:29,560
We've seen the date time module, which helps us deal with, or was it date you'd tell,

81
00:05:29,560 --> 00:05:36,519
something like that, which helps us deal with date time objects and converting dates into

82
00:05:36,519 --> 00:05:40,279
objects that were nicely usable.

83
00:05:40,279 --> 00:05:45,959
Today we're going to use the time module, right here, which will help us deal with the

84
00:05:45,959 --> 00:05:46,959
system clock.

85
00:05:46,959 --> 00:05:47,959
Okay.

86
00:05:47,959 --> 00:05:51,399
So if we're timing functions that we run, we're going to want to access the system clock

87
00:05:51,399 --> 00:05:56,919
to figure out exactly what time we started this function and what time we ended the function.

88
00:05:56,919 --> 00:06:02,120
So just a little thing on, you probably already know this, how to call these functions within

89
00:06:02,120 --> 00:06:03,120
these modules.

90
00:06:03,120 --> 00:06:07,560
So the modules basically bring in a whole bunch of functions and maybe objects and things

91
00:06:07,560 --> 00:06:12,159
like that related to one topic, or on subject, into your code.

92
00:06:12,159 --> 00:06:18,279
And then to run the functions in your code, you just use this annotation on the module

93
00:06:18,279 --> 00:06:19,279
name.

94
00:06:19,279 --> 00:06:24,239
So if you want to use the sign function from the math module, I would just say math.sign

95
00:06:24,239 --> 00:06:28,279
and then I have access to that sign function.

96
00:06:28,279 --> 00:06:29,279
Okay.

97
00:06:29,279 --> 00:06:32,079
So let's start looking at timing a program.

98
00:06:32,079 --> 00:06:35,879
The simplest way to figure out how fast the program runs.

99
00:06:35,879 --> 00:06:39,599
So we're going to use the time module, so I'm importing it here.

100
00:06:39,599 --> 00:06:44,519
And when I do that, Python is going to bring in all of these functions related to the time.

101
00:06:44,519 --> 00:06:48,000
Now we're going to look in this particular lecture at three different functions and we're

102
00:06:48,000 --> 00:06:50,879
going to time them, each of them.

103
00:06:50,879 --> 00:06:53,879
Next lecture, we're going to look at a whole bunch more functions just to give you a little

104
00:06:53,879 --> 00:06:57,040
bit more practice with timing and counting operations.

105
00:06:57,040 --> 00:07:01,240
And then we'll introduce a more abstract notion of this order of growth.

106
00:07:01,240 --> 00:07:04,519
So the three functions we're going to look at are these ones.

107
00:07:04,519 --> 00:07:08,360
So Celsius to Fahrenheit, My Sum, and Square.

108
00:07:08,360 --> 00:07:11,399
So Celsius to Fahrenheit, pretty self-explanatory.

109
00:07:11,399 --> 00:07:16,240
It takes in one parameter the number for Celsius temperature and converts it to Fahrenheit.

110
00:07:16,240 --> 00:07:20,400
So we did this lecture one, just using the formula.

111
00:07:20,400 --> 00:07:24,879
This function, My Sum, will take it a number x.

112
00:07:24,879 --> 00:07:28,439
So seven or ten or a hundred, whatever it is.

113
00:07:28,439 --> 00:07:30,879
And it uses a loop.

114
00:07:30,879 --> 00:07:35,680
So computationally uses this loop that iterates the each number from zero all the way up to

115
00:07:35,680 --> 00:07:39,160
including x and keeps the running total.

116
00:07:39,160 --> 00:07:43,360
So it adds i to itself to the total and returns it.

117
00:07:43,360 --> 00:07:47,439
Of course, we could have rewritten this in a more efficient way by using the formula,

118
00:07:47,439 --> 00:07:51,040
to calculate the sum, what is n times n plus 1 over 2.

119
00:07:51,040 --> 00:07:54,400
But here, we're just doing it using this for loop.

120
00:07:54,400 --> 00:07:59,840
And then lastly, is this function called square?

121
00:07:59,840 --> 00:08:03,000
And this one's going to be even more inefficient.

122
00:08:03,000 --> 00:08:05,000
We're going to calculate n squared.

123
00:08:05,000 --> 00:08:08,520
So the parameter here n will be squared.

124
00:08:08,519 --> 00:08:13,839
So we're not doing return n times n or return n star star 2.

125
00:08:13,839 --> 00:08:15,120
We're not doing any of that.

126
00:08:15,120 --> 00:08:18,719
We're actually going to use two nested loops.

127
00:08:18,719 --> 00:08:23,879
So I've got an outer four loop that goes through the number zero to n, not including,

128
00:08:23,879 --> 00:08:27,240
an inner four loop that goes through the number zero to n, not including.

129
00:08:27,240 --> 00:08:32,079
And this square sum here adds one to itself every time.

130
00:08:32,080 --> 00:08:38,840
So effectively, we're going through and adding one to that sum n squared times.

131
00:08:38,840 --> 00:08:42,840
So super inefficient, but this is where we're at.

132
00:08:42,840 --> 00:08:47,040
And so how do we actually time these functions?

133
00:08:47,040 --> 00:08:52,400
So here's the, this is basically, you know, some lines of code in a file.

134
00:08:52,400 --> 00:08:55,639
So I've got the time module imported here.

135
00:08:55,639 --> 00:08:57,680
I've got the function here.

136
00:08:57,679 --> 00:09:05,479
I'm going to call the time module and the time function within the time module.

137
00:09:05,479 --> 00:09:11,399
So this tells me the number of seconds that have passed since January 1st, 1970.

138
00:09:11,399 --> 00:09:13,599
That's called the epoch.

139
00:09:13,599 --> 00:09:14,599
Okay.

140
00:09:14,599 --> 00:09:17,039
So the beginning of time and computer speak.

141
00:09:17,039 --> 00:09:23,359
So if I grab how many seconds have passed since that time, then T start stores that number

142
00:09:23,359 --> 00:09:24,359
of seconds.

143
00:09:24,360 --> 00:09:28,480
I'm going to run my function, Celsius to fan height 37.

144
00:09:28,480 --> 00:09:33,919
And then I'm going to get the time again down here and subtract the time right now after

145
00:09:33,919 --> 00:09:39,480
the function has finished minus the time it was right before I started my function.

146
00:09:39,480 --> 00:09:40,480
Okay.

147
00:09:40,480 --> 00:09:45,240
So that gives me the, the DT and then I just print that out.

148
00:09:45,240 --> 00:09:47,480
So we can run it together.

149
00:09:47,480 --> 00:09:52,920
The way I'm going to run it is by actually doing a little bit of modularization to this

150
00:09:52,919 --> 00:09:54,360
code.

151
00:09:54,360 --> 00:09:59,639
So I'm at this function and this is the only function I'm actually going to run down here.

152
00:09:59,639 --> 00:10:02,519
It's my, I call it a time wrapper.

153
00:10:02,519 --> 00:10:07,360
It's a wrapper function and it takes in two parameters.

154
00:10:07,360 --> 00:10:10,279
The first is the actual function I want to run.

155
00:10:10,279 --> 00:10:11,399
So I'll show you down here.

156
00:10:11,399 --> 00:10:16,319
You can see I'm running the time wrapper with the name, literally the name of the function

157
00:10:16,319 --> 00:10:17,319
I want to run.

158
00:10:17,319 --> 00:10:18,159
This is not a function call.

159
00:10:18,159 --> 00:10:20,879
It's just the name of my function.

160
00:10:20,879 --> 00:10:25,159
So that's the first parameter and the second parameter is a whole bunch of different inputs

161
00:10:25,159 --> 00:10:27,759
I want to run the function with.

162
00:10:27,759 --> 00:10:34,159
So this Ln is created up here and it just makes for me the list of all of these inputs.

163
00:10:34,159 --> 00:10:39,039
So I'm going to run Celsius to Fahrenheit with the number one, Celsius to Fahrenheit with

164
00:10:39,039 --> 00:10:41,439
the number 10, Celsius to Fahrenheit with a hundred and so on.

165
00:10:41,439 --> 00:10:47,000
So these will be all my inputs to my function.

166
00:10:47,000 --> 00:10:51,559
And so when I call this wrapper Python is just going to replace F with the function that

167
00:10:51,559 --> 00:10:52,559
I'm actually running.

168
00:10:52,559 --> 00:10:55,600
So Celsius to Fahrenheit or My Sum or Square.

169
00:10:55,600 --> 00:11:00,559
And you can see here for each one of the different inputs I'm going to grab the time, run

170
00:11:00,559 --> 00:11:07,639
the function, grab the time again to get the dt and then print how long it took.

171
00:11:07,639 --> 00:11:09,279
So I'll show you what that looks like.

172
00:11:09,279 --> 00:11:15,960
So here I ran Celsius to Fahrenheit with inputs 1, 10, 100,000, 10,000.

173
00:11:15,960 --> 00:11:22,759
It was really fast.

174
00:11:22,759 --> 00:11:25,400
It took zero seconds every single time.

175
00:11:25,400 --> 00:11:27,800
So no matter what the input, zero seconds.

176
00:11:27,800 --> 00:11:32,040
So fast that Python didn't even tell me exactly how slow it was.

177
00:11:32,040 --> 00:11:36,720
And I'll tend to the negative 9 or whatever, it's just zero seconds.

178
00:11:36,720 --> 00:11:39,560
And that's in part to the time function, but we'll leave it at that.

179
00:11:39,560 --> 00:11:41,480
It's just very fast.

180
00:11:41,480 --> 00:11:42,480
Okay.

181
00:11:42,480 --> 00:11:45,400
How about the next function?

182
00:11:45,399 --> 00:11:48,519
Let's do My Sum.

183
00:11:48,519 --> 00:11:53,039
So My Sum is not just doing calculations, it has a loop, right?

184
00:11:53,039 --> 00:11:55,319
That's a function of the input.

185
00:11:55,319 --> 00:12:00,279
So our input changes, and you might have noticed that as our input got bigger, we actually

186
00:12:00,279 --> 00:12:04,279
had to wait a little while for this result to come by.

187
00:12:04,279 --> 00:12:10,360
So we see down here, right, or up here, when the input's pretty small, yes, it took zero

188
00:12:10,360 --> 00:12:11,360
seconds.

189
00:12:11,360 --> 00:12:13,759
It's so fast that it didn't even register it.

190
00:12:13,759 --> 00:12:16,799
But at some point, we started to get actual numbers.

191
00:12:16,799 --> 00:12:27,159
So with 10,000, it took 0.0099 seconds, with 100,000, it took 0.01, with what is this

192
00:12:27,159 --> 00:12:28,159
a million?

193
00:12:28,159 --> 00:12:32,399
Yeah, with a million, it took 0.05 seconds.

194
00:12:32,399 --> 00:12:37,439
So we can actually see a little pattern, right, if we stared it long enough, especially

195
00:12:37,439 --> 00:12:39,319
for the bigger numbers, right?

196
00:12:39,320 --> 00:12:43,680
So down here, right, these first two are iffy.

197
00:12:43,680 --> 00:12:48,520
But when we get to a big number like a million, we say it took 0.05 seconds.

198
00:12:48,520 --> 00:12:54,120
When we increase the input by 10 to 10 million, the input took 0.5 seconds.

199
00:12:54,120 --> 00:12:58,560
And when we increase the input by 10 again, it took 5 seconds.

200
00:12:58,560 --> 00:13:04,800
So we could guess that when we increase the input again by 10, it will take about 50 seconds

201
00:13:04,800 --> 00:13:05,800
to run, right?

202
00:13:05,799 --> 00:13:09,399
You can even try that out if you'd like to wait for 50 seconds.

203
00:13:09,399 --> 00:13:14,639
All right, that's the MySum function.

204
00:13:14,639 --> 00:13:16,639
Now what about the square?

205
00:13:16,639 --> 00:13:21,839
Remember the square had the two nested four loops, four, four, and then just a regular

206
00:13:21,839 --> 00:13:23,639
addition in there.

207
00:13:23,639 --> 00:13:25,039
So let's run that.

208
00:13:25,039 --> 00:13:28,679
All right, pretty fast, pretty fast.

209
00:13:28,679 --> 00:13:34,759
The square of 1,000 is already taking 0.06 seconds.

210
00:13:34,759 --> 00:13:40,679
Square of 10,000 is now taking 6 seconds.

211
00:13:40,679 --> 00:13:44,759
What do we notice?

212
00:13:44,759 --> 00:13:51,039
With one more round, if we waited for square of 100,000, we might be able to see a pattern.

213
00:13:51,039 --> 00:13:52,879
Or we can guess the pattern.

214
00:13:52,879 --> 00:13:55,879
Does anyone want to wager a guess what the next number should be here?

215
00:13:55,879 --> 00:14:02,879
Let me think about it.

216
00:14:02,879 --> 00:14:03,879
About 600.

217
00:14:03,879 --> 00:14:05,439
Yeah, about 600, right?

218
00:14:05,439 --> 00:14:08,759
We're going from 0.06 to maybe about 600.

219
00:14:08,759 --> 00:14:10,360
So I don't know.

220
00:14:10,360 --> 00:14:11,840
We could say about 600.

221
00:14:11,840 --> 00:14:14,679
I'm certainly not going to wait for 600 seconds.

222
00:14:14,679 --> 00:14:19,960
And I'm actually not going to make my computer do that, just in case it crashes.

223
00:14:19,960 --> 00:14:24,679
But yeah, we could guess something like, you know, on the order of some hundreds, right?

224
00:14:25,079 --> 00:14:28,079
600, something like that.

225
00:14:28,079 --> 00:14:29,759
So that's one thing to notice.

226
00:14:29,759 --> 00:14:36,120
The other thing to notice is that already at 10,000, right, where the input is just 10,000,

227
00:14:36,120 --> 00:14:39,399
this took five seconds already.

228
00:14:39,399 --> 00:14:47,159
In the previous function here, my sum, we had to get to 100 million as my input to run

229
00:14:47,159 --> 00:14:49,159
for five seconds.

230
00:14:49,159 --> 00:14:51,159
Right, so that's also a big difference here.

231
00:14:51,159 --> 00:14:57,159
Actually this program square is taking a really long time to run when the input is not very

232
00:14:57,159 --> 00:15:00,159
big.

233
00:15:00,159 --> 00:15:02,159
All right.

234
00:15:02,159 --> 00:15:05,639
So some things to notice about timing.

235
00:15:05,639 --> 00:15:08,240
And as I said, we're going to look at some more programs next lecture.

236
00:15:08,240 --> 00:15:12,639
I just wanted to give you a general sense of timing programs.

237
00:15:12,639 --> 00:15:15,919
First of all, the green check is good.

238
00:15:15,919 --> 00:15:17,919
We want all these to be green checks.

239
00:15:17,919 --> 00:15:21,120
The green check is good because if we have different algorithms, they're going to be

240
00:15:21,120 --> 00:15:22,679
going to take a different amount of time, right?

241
00:15:22,679 --> 00:15:28,279
That time that it takes for these algorithms to run will be different, which is good.

242
00:15:28,279 --> 00:15:33,440
But if we have different implementations for the same sort of program, for the same algorithm,

243
00:15:33,440 --> 00:15:35,960
that's also going to give us different timings.

244
00:15:35,960 --> 00:15:38,919
And really in the long run, I don't really care about that.

245
00:15:38,919 --> 00:15:43,200
What I would really like to evaluate is just the algorithm itself.

246
00:15:43,200 --> 00:15:48,080
Because when we're talking about algorithms, it's probably only a handful of algorithms

247
00:15:48,080 --> 00:15:51,920
out there in the world that we can apply to a given problem.

248
00:15:51,920 --> 00:15:56,360
Whereas there's probably thousands of different implementations we can apply to a problem.

249
00:15:56,360 --> 00:15:59,720
So for example, you could have a for loop versus a while loop.

250
00:15:59,720 --> 00:16:05,200
You could have creating intermediate variables as an implementation or you could have a list

251
00:16:05,200 --> 00:16:07,960
comprehension version of an implementation.

252
00:16:07,960 --> 00:16:13,120
But underlying all that is going to be just some algorithm that you're trying to implement.

253
00:16:13,120 --> 00:16:14,120
Okay.

254
00:16:14,519 --> 00:16:17,919
The running time will vary between different implementations, which is not really something

255
00:16:17,919 --> 00:16:19,320
I want.

256
00:16:19,320 --> 00:16:21,679
The running time will also vary between computers.

257
00:16:21,679 --> 00:16:27,720
If I ran the same programs on an older computer, it's probably not going to take five seconds,

258
00:16:27,720 --> 00:16:29,759
to run with an input of 100 million.

259
00:16:29,759 --> 00:16:32,000
It might take 10 or it might take 11.

260
00:16:32,000 --> 00:16:35,399
So the timing is also going to differ between different computers.

261
00:16:35,399 --> 00:16:38,560
It will also differ between different languages.

262
00:16:38,559 --> 00:16:44,239
So Java versus Python versus C is very efficient at memory.

263
00:16:44,239 --> 00:16:46,039
Management, it's going to run very fast.

264
00:16:46,039 --> 00:16:49,639
Whereas if Python's a little bit slower, it's going to run slower.

265
00:16:49,639 --> 00:16:56,359
So again, we're actually capturing, the timing is capturing implementations between languages.

266
00:16:56,359 --> 00:16:59,559
And the timing is not very predictable for small inputs.

267
00:16:59,559 --> 00:17:06,639
So if for some reason, when I was running the square function here with one, I was also

268
00:17:06,640 --> 00:17:11,040
running Netflix in the background, where my computer decided to update something and

269
00:17:11,040 --> 00:17:15,640
decided to just dedicate resources to doing that task at that moment when I'm trying

270
00:17:15,640 --> 00:17:17,920
to run the square of one.

271
00:17:17,920 --> 00:17:21,720
This 0.0 seconds might not be 0.0 seconds.

272
00:17:21,720 --> 00:17:27,080
It might take away from the time it takes, the time it allocates to running my square

273
00:17:27,080 --> 00:17:28,400
program.

274
00:17:28,400 --> 00:17:33,320
And then what we'll see is that this will no longer be 0.0, it might be 0.1 or something

275
00:17:33,320 --> 00:17:34,920
like that.

276
00:17:34,920 --> 00:17:38,960
So timing programs is not very good.

277
00:17:38,960 --> 00:17:44,560
It's not very consistent with our goal here, which is to evaluate algorithms.

278
00:17:44,560 --> 00:17:50,640
All right, let's see if we can do better with the idea of counting the number of operations.

279
00:17:50,640 --> 00:18:00,600
So rather than focusing on describing our program in terms of human time, 1 second, 0.5 seconds,

280
00:18:00,600 --> 00:18:04,880
things like that, let's come up with some operations in Python.

281
00:18:04,880 --> 00:18:09,080
That's take one time unit, right?

282
00:18:09,080 --> 00:18:13,520
And we're going to say that all of these really basic operations, we can say that they take

283
00:18:13,520 --> 00:18:14,680
the same amount of time.

284
00:18:14,680 --> 00:18:19,600
I don't care if they're like 10 to the negative 9 seconds or 2 times 10 to the negative 9

285
00:18:19,600 --> 00:18:20,600
seconds.

286
00:18:20,600 --> 00:18:21,600
I don't care about that.

287
00:18:21,600 --> 00:18:23,400
I just know that they're really fast.

288
00:18:23,400 --> 00:18:26,960
And if they're really fast, I can say that each of them just take one unit of time.

289
00:18:26,960 --> 00:18:30,440
So I'll just count them all as one unit of time.

290
00:18:30,440 --> 00:18:33,680
So the examples of those are mathematical operations, right?

291
00:18:33,680 --> 00:18:34,680
They're pretty fast.

292
00:18:34,680 --> 00:18:38,240
So no matter whether I'm multiplying, dividing, adding, subtracting, taking something to the

293
00:18:38,240 --> 00:18:42,680
power of something else, I'm going to say that each one of those takes one unit of time,

294
00:18:42,680 --> 00:18:43,680
right?

295
00:18:43,680 --> 00:18:49,880
Comparing something, so a less than b, 3 greater than 4, things like that, equality, also super

296
00:18:49,880 --> 00:18:55,360
fast to do, also takes one unit of time, assigning something, so a is equal to 3.

297
00:18:55,360 --> 00:19:00,480
That assignment statement right there, also pretty fast to do, takes one unit of time,

298
00:19:00,480 --> 00:19:02,960
and then accessing objects in memory, right?

299
00:19:02,960 --> 00:19:07,519
So pretty fast takes one unit of time.

300
00:19:07,519 --> 00:19:13,440
So with this new definition of time, quote unquote, right, where we have these units of time,

301
00:19:13,440 --> 00:19:19,480
let's figure out how long these functions actually take.

302
00:19:19,480 --> 00:19:25,360
So our Celsius to Fahrenheit function has three operations in it, right?

303
00:19:25,360 --> 00:19:28,440
I got a multiplication, a division, and an addition.

304
00:19:28,440 --> 00:19:32,400
I don't care, it's sort of the little variations that each one of these take to actually do

305
00:19:32,400 --> 00:19:37,160
inside computer memory, I'm going to say that the Celsius to Fahrenheit program takes three

306
00:19:37,160 --> 00:19:40,640
units of time, okay?

307
00:19:40,640 --> 00:19:47,360
So no matter what the input is, if I'm converting zero Celsius or a million Celsius, the program

308
00:19:47,360 --> 00:19:52,279
will still just take three units of time to complete.

309
00:19:52,279 --> 00:19:54,960
How about my sum?

310
00:19:54,960 --> 00:19:56,960
So we'll go through step by step.

311
00:19:56,960 --> 00:20:04,240
So in my sum, I've got one assignment statement here, so that's going to be one operation.

312
00:20:04,240 --> 00:20:09,920
The for loop here is going to take i and assign it to one of the values in the range, right?

313
00:20:09,920 --> 00:20:13,200
That's just internally what it does, so that's going to be one operation each time through

314
00:20:13,200 --> 00:20:15,319
the loop.

315
00:20:15,319 --> 00:20:25,160
And then total plus equals i is going to be two operations because I have total plus i

316
00:20:25,160 --> 00:20:31,400
on the right hand side, that's one operation, and then assigning that back to total is my

317
00:20:31,400 --> 00:20:34,880
second operation, okay?

318
00:20:34,880 --> 00:20:39,200
So that's two operations there, and that's it.

319
00:20:39,200 --> 00:20:46,320
But notice our for loop, these three operations here, the one for assigning i to be a value

320
00:20:46,320 --> 00:20:52,240
here, and these two operations here repeat x plus one times, right?

321
00:20:52,240 --> 00:21:02,240
So how long does this program actually take?

322
00:21:02,240 --> 00:21:08,000
Well, we count all that up, so the one for the total equals zero plus, and we're multiplying

323
00:21:08,000 --> 00:21:10,440
x plus one times what?

324
00:21:10,440 --> 00:21:15,079
The one plus the two, which gives us three x plus four total operations.

325
00:21:15,079 --> 00:21:20,759
So now we're noting this in terms of the input, which is kind of cool, right?

326
00:21:20,759 --> 00:21:25,839
So now I have this nice little formula where if I know my input is ten, I can actually tell

327
00:21:25,839 --> 00:21:30,680
you how many units of time this program will take.

328
00:21:30,680 --> 00:21:33,000
All right, how about the square?

329
00:21:33,000 --> 00:21:37,359
It's going to be very similar, so I've got one operation for assignment here.

330
00:21:37,359 --> 00:21:43,079
This is one operation for grabbing the i and making it one of the values in the range.

331
00:21:43,079 --> 00:21:47,519
Similarly for the inner loop, one operation there, and then square sum plus equals one for

332
00:21:47,559 --> 00:21:51,400
the same reason as this is two operations, right?

333
00:21:51,400 --> 00:21:57,000
One for the right-hand side, doing the addition, and two for making the assignment.

334
00:21:57,000 --> 00:21:58,599
Let's not forget our four loops, right?

335
00:21:58,599 --> 00:22:04,680
We've got two four loops here, so the inner one will repeat n times, and for each one of

336
00:22:04,680 --> 00:22:08,839
those outer n times, we do the inner n times.

337
00:22:08,839 --> 00:22:13,119
Right, this nested four loop situation here.

338
00:22:13,119 --> 00:22:19,159
So the total number of time units that this square will take is the one over here for

339
00:22:19,159 --> 00:22:23,879
this square sum equals zero plus, and then I've got these nested four loops, so the other

340
00:22:23,879 --> 00:22:32,079
one goes through n times, sorry, n times, the one operation multiplied by the inner four

341
00:22:32,079 --> 00:22:36,799
loop also n times times what is the operations done in the inner four loop?

342
00:22:36,799 --> 00:22:41,519
Well, it's this one plus these two, so the one plus the two.

343
00:22:41,519 --> 00:22:50,879
So in total, three n squared plus one operations.

344
00:22:50,879 --> 00:22:57,319
So let's run this, and now that we're counting operations, we should be able to see a

345
00:22:57,319 --> 00:22:59,960
more of a better pattern.

346
00:22:59,960 --> 00:23:06,000
So here's my Celsius to Fahrenheit, my sum and square slightly changed because I've got

347
00:23:06,000 --> 00:23:12,240
this little counter variable within each function that is going to increment each time I see

348
00:23:12,240 --> 00:23:13,240
an operation.

349
00:23:13,240 --> 00:23:17,859
So obviously, for Celsius to Fahrenheit, it's always three, right?

350
00:23:17,859 --> 00:23:21,980
So when I do my return, I'm just going to return the counter variable, and then the regular

351
00:23:21,980 --> 00:23:26,319
thing that this function should return as a two-ball.

352
00:23:26,319 --> 00:23:32,400
For my sum, this counter equals one stands for this assignment statement, and then each

353
00:23:32,400 --> 00:23:38,240
time through the loop, I'm going to increment my counter for the three operations, right?

354
00:23:38,240 --> 00:23:43,320
Assigning the i to be one of the values in the range, and then two more for this total

355
00:23:43,320 --> 00:23:44,800
plus equals i.

356
00:23:44,800 --> 00:23:50,000
So that's going to get incremented each time through the loop, and then the square similarly.

357
00:23:50,000 --> 00:23:55,400
So here's my counter equals one for this statement here, counter plus equals one for grabbing

358
00:23:55,400 --> 00:24:00,560
the i as one of these values, and then counter plus equals three for grabbing the j to be

359
00:24:00,559 --> 00:24:05,879
one of these values and incrementing this my sum.

360
00:24:05,879 --> 00:24:11,000
So because of where I place these counters, Python would automatically count it all up,

361
00:24:11,000 --> 00:24:13,720
for no matter how many loops I've got.

362
00:24:13,720 --> 00:24:19,639
So here's my wrapper for counting slightly different than the timing one, because now I'm actually

363
00:24:19,639 --> 00:24:25,960
going to also keep track of how much, how many more operations I've done compared to the

364
00:24:25,960 --> 00:24:29,440
previous input.

365
00:24:29,440 --> 00:24:31,200
So let me show you what that means.

366
00:24:31,200 --> 00:24:35,759
Let's run Celsius to Fahrenheit with the following inputs.

367
00:24:35,759 --> 00:24:40,519
So I'm, first of all, reporting the total number of operations, just like it did with timing,

368
00:24:40,519 --> 00:24:45,360
so always three operations, no surprise there, that's what we coded up basically.

369
00:24:45,360 --> 00:24:49,920
But then I'm also reporting here, and that's done inside the wrapper function, the count

370
00:24:49,920 --> 00:24:54,960
wrapper, how many more operations is this based on the previous one?

371
00:24:54,960 --> 00:25:00,759
So the first one's a little weird, but when my input is 10 times more, I went from 100

372
00:25:00,759 --> 00:25:04,920
to 1000, I've done one more operation.

373
00:25:04,920 --> 00:25:05,920
No change obviously, right?

374
00:25:05,920 --> 00:25:10,559
Because it's always three operations done in total.

375
00:25:10,559 --> 00:25:13,600
So just for patient sake, right?

376
00:25:13,600 --> 00:25:14,759
This is the slide.

377
00:25:14,759 --> 00:25:20,440
So no matter what happens to the input here, the number of operations in these sort of

378
00:25:20,440 --> 00:25:26,640
units of time, which we're just counting the number of operations is three.

379
00:25:26,640 --> 00:25:28,320
What about the sum?

380
00:25:28,320 --> 00:25:31,400
So remember the sum had that for loop in it.

381
00:25:31,400 --> 00:25:35,840
Let's run that and see how many operations are here.

382
00:25:35,840 --> 00:25:39,559
So first I'm going to report the number of operations.

383
00:25:39,559 --> 00:25:44,519
So when the input is 100, it's 304, when the input is 1000, it's 3000, 4, when the input

384
00:25:44,519 --> 00:25:47,000
is 10,000, it's 30,000, 4.

385
00:25:47,000 --> 00:25:49,359
So that matches up the formula we came up with, right?

386
00:25:49,359 --> 00:25:52,359
3x plus 4, that's pretty cool.

387
00:25:52,359 --> 00:25:58,559
And then you can see now here, I'm reporting how many more operations is this line based

388
00:25:58,559 --> 00:26:00,440
on the previous line.

389
00:26:00,440 --> 00:26:02,519
So it's about 9.8 times more, right?

390
00:26:02,519 --> 00:26:09,200
So when my input increases by 10 from 100 to 1000, I am doing approximately 9.88 times

391
00:26:09,200 --> 00:26:11,440
more operations.

392
00:26:11,440 --> 00:26:21,840
And my input increases from 1000 to 10,000, again by 10, I'm doing 9.988 times more operations.

393
00:26:21,840 --> 00:26:26,840
So we see sort of like a nice little steady state going on here, right?

394
00:26:26,840 --> 00:26:32,600
Where when my input gets really, really big, it looks like I'm approaching approximately

395
00:26:32,600 --> 00:26:35,200
10 times as many operations, right?

396
00:26:35,200 --> 00:26:38,200
When my input is 10 times more.

397
00:26:38,200 --> 00:26:43,160
This is obviously more apparent when the input is big because the tiny variations in my

398
00:26:43,160 --> 00:26:44,160
formula, right?

399
00:26:44,160 --> 00:26:51,759
The plus 4, specifically, makes less of an impact when my input is really large.

400
00:26:51,759 --> 00:26:54,600
And this is kind of going in line with our motivation.

401
00:26:54,600 --> 00:26:58,920
When the input data is really, really big, what I'd like to report is sort of the algorithm

402
00:26:58,920 --> 00:27:00,600
and how long it takes.

403
00:27:00,599 --> 00:27:10,799
I don't care that the algorithm takes 3x plus 4 or 3x times 3x as operations, right?

404
00:27:10,799 --> 00:27:15,439
When the input is really big, all I care is that it's sort of on the order of x, right?

405
00:27:15,439 --> 00:27:18,599
That's something we'll get at next lecture.

406
00:27:18,599 --> 00:27:20,359
But this is the big idea here.

407
00:27:20,359 --> 00:27:26,759
When the input increases by 10, it seems like at steady state, our number of operations

408
00:27:26,759 --> 00:27:28,199
increases by 10 as well.

409
00:27:28,200 --> 00:27:31,200
So it's sort of this linear relationship.

410
00:27:31,200 --> 00:27:38,680
All right, what about the last function, the square?

411
00:27:38,680 --> 00:27:41,279
So I'm doing something a little special here.

412
00:27:41,279 --> 00:27:45,000
I have two different inputs I'm going to run the square with.

413
00:27:45,000 --> 00:27:48,840
So the first one is L2A.

414
00:27:48,840 --> 00:27:53,759
So I'm going to run square with input 128, 256, 512, 1024.

415
00:27:53,759 --> 00:27:57,599
So I'm basically increasing my input by 2, right?

416
00:27:57,599 --> 00:28:03,000
I'm multiplying my input by 2 each time.

417
00:28:03,000 --> 00:28:09,480
And then I'm going to run it with L2B where my input increases by 10 each time.

418
00:28:09,480 --> 00:28:13,720
So we're going to see if we can figure out a relationship between these for the square.

419
00:28:13,720 --> 00:28:17,720
Because that one was a little hard to figure out in just pure timing without actually waiting

420
00:28:17,720 --> 00:28:23,519
for minutes or days or.

421
00:28:23,519 --> 00:28:26,200
Okay, so we got something to work with here.

422
00:28:26,200 --> 00:28:27,559
So here I've got my square.

423
00:28:27,559 --> 00:28:35,559
So this first bit here is when my input increased by 2 and down here just finished is when my input

424
00:28:35,559 --> 00:28:38,279
increases by 10.

425
00:28:38,279 --> 00:28:46,000
So number of operations when my input increases by 2 are not so important.

426
00:28:46,000 --> 00:28:47,720
Yes, they're big.

427
00:28:47,720 --> 00:28:52,559
But what I'm really interested in, just like what we saw in the miceome example, is what

428
00:28:52,559 --> 00:28:55,799
happens to the steady state as the input gets really big, right?

429
00:28:55,799 --> 00:28:59,240
How many more operations are we doing?

430
00:28:59,240 --> 00:29:04,039
And what we can see is that the number of operations as the input gets really big is

431
00:29:04,039 --> 00:29:07,799
approximately 10 times, sorry, four times more.

432
00:29:07,799 --> 00:29:15,399
In the case where I increase my input by 2 every round.

433
00:29:15,400 --> 00:29:24,440
So when I increase my input by 2, the number of operations are going to be four times more.

434
00:29:24,440 --> 00:29:27,200
Well what about when I increase my input by 10, right?

435
00:29:27,200 --> 00:29:29,720
1, 10, 100, a thousand, so on.

436
00:29:29,720 --> 00:29:34,360
Again, I'm not so much interested in number of operations, but what happens to the steady

437
00:29:34,360 --> 00:29:35,440
state?

438
00:29:35,440 --> 00:29:38,080
With very few operations, it's hard to tell.

439
00:29:38,080 --> 00:29:43,680
But as we increase it, we see that it goes towards approximately 100, right?

440
00:29:43,680 --> 00:29:50,240
So when my input increases by 10, that takes me to about 100 fold increase in the number

441
00:29:50,240 --> 00:29:53,600
of operations.

442
00:29:53,600 --> 00:29:58,720
So now can you guys see the relationship between the input for the square and the number

443
00:29:58,720 --> 00:30:00,039
of operations?

444
00:30:00,039 --> 00:30:01,840
You can, right?

445
00:30:01,840 --> 00:30:06,240
So it's approximately sort of an n squared relationship, right?

446
00:30:06,240 --> 00:30:12,720
When my input increases by, you know, when my input is n, the number of operations is going

447
00:30:12,720 --> 00:30:19,160
to be on the order of n squared more.

448
00:30:19,160 --> 00:30:23,759
So counting operations is actually a lot better than timing, as we can see, right?

449
00:30:23,759 --> 00:30:26,920
We've eliminated a bunch of those red X's, right?

450
00:30:26,920 --> 00:30:33,720
We no longer, we no longer have to deal with variations between computers because before

451
00:30:33,720 --> 00:30:37,400
counting this on the computer that's slower fast, we're still counting the same amount

452
00:30:37,400 --> 00:30:39,319
of stuff.

453
00:30:39,319 --> 00:30:44,240
So again, it's not going to matter because you'll implement it in a similar way.

454
00:30:44,240 --> 00:30:46,919
Small inputs is still sort of iffy, right?

455
00:30:46,919 --> 00:30:51,039
We saw the square was a little bit unpredictable when the input was pretty small, right down

456
00:30:51,039 --> 00:30:54,879
here, you know, 60, then straight up to 90.

457
00:30:54,879 --> 00:30:57,720
But we didn't take long to see the steady state.

458
00:30:57,720 --> 00:31:00,240
So it's actually better than before, better than timing.

459
00:31:00,240 --> 00:31:02,639
It's not zero at least.

460
00:31:02,639 --> 00:31:07,919
But now the problem becomes sort of what's the definition of which operations to count?

461
00:31:07,920 --> 00:31:11,039
Because our functions have a return value.

462
00:31:11,039 --> 00:31:13,960
Do we count the return as an operation?

463
00:31:13,960 --> 00:31:14,960
Technically you should, right?

464
00:31:14,960 --> 00:31:18,160
That's a value that's being passed between functions, so that's going to take some time

465
00:31:18,160 --> 00:31:19,880
to run.

466
00:31:19,880 --> 00:31:22,480
But we didn't actually count it in our example, right?

467
00:31:22,480 --> 00:31:24,840
But you could if you wanted to.

468
00:31:24,840 --> 00:31:27,560
So that's where we stand, right?

469
00:31:27,560 --> 00:31:34,400
We've got timing and counting, just as an initial example.

470
00:31:34,400 --> 00:31:37,880
Next lecture, we're going to look at a few more examples with lists and things like

471
00:31:37,880 --> 00:31:42,200
that, just again timing and counting those functions.

472
00:31:42,200 --> 00:31:46,720
But again, the big idea here is that we're trying to get at evaluating just a handful

473
00:31:46,720 --> 00:31:52,240
of different algorithms, sort of what's the order of growth as the input becomes really,

474
00:31:52,240 --> 00:31:53,240
really big, right?

475
00:31:53,240 --> 00:31:57,360
Because all we're interested in is how scalable are these programs that we're running when

476
00:31:57,360 --> 00:32:00,480
the input is really big, right, when we're dealing with big data.

477
00:32:00,480 --> 00:32:04,040
And so that's what we're going to start talking about next lecture.

478
00:32:04,040 --> 00:32:05,040
Okay.

