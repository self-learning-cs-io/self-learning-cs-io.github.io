---
title: MIT6100 P4P04LoopsoverStringsGuess And CheckandBinary
---

1
00:00:00,000 --> 00:00:13,679
Okay, so let's get started.

2
00:00:13,679 --> 00:00:18,879
Today we will be continuing talking a little bit about loops and seeing some other couple

3
00:00:18,879 --> 00:00:20,800
nuances of loops.

4
00:00:20,800 --> 00:00:25,280
And then we'll get started on our first algorithm, the guess and check algorithm.

5
00:00:25,280 --> 00:00:28,240
And then towards the end we're going to start talking about binary numbers in advance of

6
00:00:28,239 --> 00:00:31,439
seeing our next algorithm.

7
00:00:31,439 --> 00:00:35,239
So let's do a quick recap of what we learned last time and then we'll do a little coding

8
00:00:35,239 --> 00:00:37,200
example and then we'll move on.

9
00:00:37,200 --> 00:00:40,719
So we saw last lecture some looping mechanisms, right?

10
00:00:40,719 --> 00:00:43,560
We saw wild loops and four loops.

11
00:00:43,560 --> 00:00:48,359
They're both a way for us to control what happens in the code and specifically they're a way

12
00:00:48,359 --> 00:00:53,359
for us to repeat certain lines in the code sort of automatically, so to speak.

13
00:00:53,359 --> 00:00:58,159
So with wild loops the lines of code were repeated as long as some condition held.

14
00:00:58,159 --> 00:01:04,319
And with four loops the lines of code were repeated for some sequence of values.

15
00:01:04,319 --> 00:01:07,879
And the sequence of values was something that we decided.

16
00:01:07,879 --> 00:01:10,000
It was numerical.

17
00:01:10,000 --> 00:01:11,000
That's what we saw last lecture.

18
00:01:11,000 --> 00:01:17,799
Today we're going to see that the sequence of values can actually be non-numerical as well.

19
00:01:17,799 --> 00:01:27,599
So both of those loop types, I guess, ended at certain times, right?

20
00:01:27,599 --> 00:01:33,519
So the wild loop ended when the condition became false and the four loop ended when we've

21
00:01:33,519 --> 00:01:36,319
exhausted our sequence of values.

22
00:01:36,319 --> 00:01:40,879
But oftentimes we want to write programs where we break out of the loop prematurely.

23
00:01:40,879 --> 00:01:44,840
We don't want the wild loop condition to become false and we don't want to exhaust our

24
00:01:44,840 --> 00:01:47,439
entire set of values of the four loop.

25
00:01:47,439 --> 00:01:52,840
So in order to exit a loop before the natural end comes, we can use this thing called a

26
00:01:52,840 --> 00:01:54,879
break statement.

27
00:01:54,879 --> 00:02:00,759
And the break statement allows us to exit the loop and the loop at exits is going to be

28
00:02:00,759 --> 00:02:03,920
the one that immediately surrounds the break statement.

29
00:02:03,920 --> 00:02:08,120
So here's a little example of a nested, two nested wild loop.

30
00:02:08,120 --> 00:02:11,599
So one wild loop and then one nested one inside it.

31
00:02:11,599 --> 00:02:18,560
The outer one is going to run whenever condition one holds and the inner one runs whenever

32
00:02:18,560 --> 00:02:21,639
condition two holds.

33
00:02:21,639 --> 00:02:27,119
Now expression A will evaluate when both condition one and condition two hold, right?

34
00:02:27,119 --> 00:02:30,639
So we enter the first wild loop and we enter the second wild loop.

35
00:02:30,639 --> 00:02:33,279
Both of those conditions have to be true.

36
00:02:33,279 --> 00:02:40,659
But Python as soon as it sees this break statement, Python will immediately exit the loop that

37
00:02:40,659 --> 00:02:41,919
surrounds that break statement.

38
00:02:41,919 --> 00:02:47,039
So the loop that surrounds the break statement is the one that has condition two, right?

39
00:02:47,039 --> 00:02:50,399
The condition one loop will keep going.

40
00:02:50,400 --> 00:02:55,240
So as soon as Python sees this break statement, it's going to immediately stop running the

41
00:02:55,240 --> 00:02:56,240
wild loop.

42
00:02:56,240 --> 00:03:00,400
It's not even going to go back up and check the condition two, which means that expression

43
00:03:00,400 --> 00:03:02,960
B will actually never get evaluated.

44
00:03:02,960 --> 00:03:04,360
So this is terrible code.

45
00:03:04,360 --> 00:03:09,120
We don't want to write code like this because expression B will never be run, right?

46
00:03:09,120 --> 00:03:13,520
But this is just to show you the impact that a break statement would have.

47
00:03:13,520 --> 00:03:17,759
And expression C will then be evaluated whenever condition one is true.

48
00:03:17,759 --> 00:03:23,639
Now condition two may or may not have been true along the way, but expression C will evaluate

49
00:03:23,639 --> 00:03:25,959
only when condition one is true, right?

50
00:03:25,959 --> 00:03:30,479
Condition two would have stopped being true and then we're going at the same indentation

51
00:03:30,479 --> 00:03:33,079
level as this inner wild loop.

52
00:03:33,079 --> 00:03:41,079
So it only evaluates the one time it gets A1s and then because the break is there.

53
00:03:41,079 --> 00:03:42,519
Exactly, yeah, that's a great point.

54
00:03:42,519 --> 00:03:47,039
So it only evaluates this expression a one time because right after it evaluates that

55
00:03:47,039 --> 00:03:51,159
it sees the break and then we immediately exit the wild loop and we're done.

56
00:03:51,159 --> 00:03:53,840
That is a great observation, yeah.

57
00:03:53,840 --> 00:03:57,039
And that's what this code will basically show.

58
00:03:57,039 --> 00:04:00,879
So here it is us doing the break statement sort of in the same structures on the previous

59
00:04:00,879 --> 00:04:03,199
code, the previous slide.

60
00:04:03,199 --> 00:04:07,239
And what we're going to do is actually just run the Python tutor for this code just to

61
00:04:07,239 --> 00:04:12,280
give you some more practice running the Python tutor.

62
00:04:12,280 --> 00:04:15,199
So this is the same code as on the previous slide.

63
00:04:15,199 --> 00:04:18,639
I've got a for loop that goes through some sequence of values.

64
00:04:18,639 --> 00:04:23,519
Can anyone tell me what are the sequence of values this for loop will loop over?

65
00:04:23,519 --> 00:04:30,480
Five, seven, nine.

66
00:04:30,480 --> 00:04:31,839
And we stop, right?

67
00:04:31,839 --> 00:04:36,039
Because 11 is end, but we go up to, but not including, and minus one.

68
00:04:36,039 --> 00:04:38,439
So five, seven, nine are the only three values.

69
00:04:38,439 --> 00:04:42,240
We would potentially loop over.

70
00:04:42,240 --> 00:04:45,199
So hit next, we initialize my sum to zero.

71
00:04:45,199 --> 00:04:49,439
So in our minds, we kind of think about the fact that we're going to loop through, make

72
00:04:49,439 --> 00:04:52,160
this loop variable be five, seven, nine.

73
00:04:52,160 --> 00:04:55,759
So the first time through the loop, I will be five.

74
00:04:55,759 --> 00:04:59,879
We're going to add I, which is currently five to my sum.

75
00:04:59,879 --> 00:05:03,920
So five plus zero makes my sum five.

76
00:05:03,920 --> 00:05:06,759
And then we immediately see the break.

77
00:05:06,759 --> 00:05:07,759
Right?

78
00:05:07,759 --> 00:05:11,040
Because if my sum equals five is true, so we go inside and we immediately see the break

79
00:05:11,040 --> 00:05:12,800
statement.

80
00:05:12,800 --> 00:05:14,800
This line will never get executed.

81
00:05:14,800 --> 00:05:21,040
So we're never going to increment my sum by one.

82
00:05:21,040 --> 00:05:24,760
So the break immediately breaks out of our loop.

83
00:05:24,760 --> 00:05:27,080
Now the if the if statement is not a loop, right?

84
00:05:27,080 --> 00:05:28,080
It's a conditional.

85
00:05:28,080 --> 00:05:30,360
So the loop we break out of is the for loop.

86
00:05:30,360 --> 00:05:32,320
And then there's no other loop surrounding it.

87
00:05:32,320 --> 00:05:36,520
So then the program is basically done and we print five.

88
00:05:36,520 --> 00:05:38,520
Okay.

89
00:05:38,519 --> 00:05:40,759
Again, bad code.

90
00:05:40,759 --> 00:05:45,759
We would never write code like this, but this is just to show you exactly what happens with

91
00:05:45,759 --> 00:05:47,439
a break statement.

92
00:05:47,439 --> 00:05:50,519
So there's the code block for the for loop.

93
00:05:50,519 --> 00:05:53,399
And this is the code block for the if statement.

94
00:05:53,399 --> 00:05:56,000
And the break breaks out of our loop, right?

95
00:05:56,000 --> 00:06:02,199
Which is the lighter purple, not the if statement.

96
00:06:02,199 --> 00:06:03,199
Okay.

97
00:06:03,199 --> 00:06:05,439
So let's have you write a little bit of code.

98
00:06:05,439 --> 00:06:11,480
And this is sort of maybe a little practice with just loops in general that we saw last

99
00:06:11,480 --> 00:06:12,480
lecture.

100
00:06:12,480 --> 00:06:17,480
There's no break really in this particular program here, just a little bit of practice.

101
00:06:17,480 --> 00:06:22,000
So what I want you to do is to write code that basically has a for loop running through

102
00:06:22,000 --> 00:06:23,000
this range.

103
00:06:23,000 --> 00:06:30,720
So for I in pick one of these, I want you to write code within that for loop that counts

104
00:06:30,720 --> 00:06:34,800
how many new how many even numbers are in that range, right?

105
00:06:34,800 --> 00:06:36,600
So including the zero.

106
00:06:36,600 --> 00:06:41,600
So for range five, you would use your counter should basically pick up on the fact that zero

107
00:06:41,600 --> 00:06:46,199
is even, two is even, and four is even.

108
00:06:46,199 --> 00:06:47,199
And then that's it.

109
00:06:47,199 --> 00:06:52,639
So it should print three.

110
00:06:52,639 --> 00:06:57,080
So here is the you try it inside the Python file for today.

111
00:06:57,080 --> 00:07:03,960
And I've already started you off with this for I in range five as the first one.

112
00:07:03,959 --> 00:07:10,959
I'll give you a couple minutes to just write the code in here.

113
00:07:10,959 --> 00:07:14,279
Okay.

114
00:07:14,279 --> 00:07:21,120
Would anyone like to start us off with some code?

115
00:07:21,120 --> 00:07:28,120
Okay.

116
00:07:28,120 --> 00:07:31,120
Yeah.

117
00:07:31,120 --> 00:07:37,120
Yep.

118
00:07:37,120 --> 00:07:43,800
So this line of code is going to take our eye, right?

119
00:07:43,800 --> 00:07:49,120
So in fact, what we could do to remind ourselves what I is, and this is very helpful for quizzes

120
00:07:49,120 --> 00:07:50,280
as well.

121
00:07:50,279 --> 00:07:57,239
We can write a little comment here that says I is zero, one, two, three, four.

122
00:07:57,239 --> 00:08:02,159
Just so we don't have to remember this fact, we can just always look here and know what

123
00:08:02,159 --> 00:08:04,799
I is going to be.

124
00:08:04,799 --> 00:08:10,439
And then this line of code, absolutely correct, is going to take I and grab the remainder

125
00:08:10,439 --> 00:08:14,639
when I is divided by two.

126
00:08:14,639 --> 00:08:20,039
And if the remainder is zero, that means that the number is even.

127
00:08:20,040 --> 00:08:29,280
And then what do we do inside here?

128
00:08:29,280 --> 00:08:33,920
So when this is true, when it's even, how do we keep track of whether or how many times

129
00:08:33,920 --> 00:08:36,519
this condition occurs?

130
00:08:36,519 --> 00:08:38,519
Yeah.

131
00:08:38,519 --> 00:08:39,519
Yes.

132
00:08:39,519 --> 00:08:40,519
Exactly.

133
00:08:40,519 --> 00:08:44,519
Should we create a variable?

134
00:08:44,519 --> 00:08:45,519
Yes, we can.

135
00:08:45,519 --> 00:08:49,319
So let's call it even numbs.

136
00:08:49,319 --> 00:08:53,039
And we'll probably want to increment it by one, right?

137
00:08:53,039 --> 00:08:54,639
Because here's another number that's even.

138
00:08:54,639 --> 00:08:57,279
So even numbs plus equals one.

139
00:08:57,279 --> 00:09:04,319
And then let's remember to initialize it right before our loop, right?

140
00:09:04,319 --> 00:09:08,240
So initially before we even start our loop, we have zero even numbers.

141
00:09:08,240 --> 00:09:13,759
And then each time through our loop, we see one that's perfectly divisible by two.

142
00:09:13,759 --> 00:09:20,360
We're going to increment this little counter by one.

143
00:09:20,360 --> 00:09:28,879
And not the same variable, thank you, even numbs.

144
00:09:28,879 --> 00:09:33,919
And the mental model you should have, sort of at this point or beginning is just the

145
00:09:33,919 --> 00:09:37,559
fact that these three lines solve our problem.

146
00:09:37,559 --> 00:09:40,960
It does the automatic counting for us, right?

147
00:09:40,960 --> 00:09:47,120
Because I will take on zero than one, then two, then three, and then four automatically

148
00:09:47,120 --> 00:09:50,240
as the loop goes through the sequence of values.

149
00:09:50,240 --> 00:09:54,639
And so at the end of the loop, so sort of at the same indentation level as the four loop,

150
00:09:54,639 --> 00:10:04,080
all we need to do is print how many of these numbers we have.

151
00:10:04,080 --> 00:10:07,000
So if we run it, it'll print three.

152
00:10:07,000 --> 00:10:11,320
And if we change this to ten, it'll print probably six, right?

153
00:10:11,320 --> 00:10:13,399
Because it counts the zero.

154
00:10:13,399 --> 00:10:14,399
Right?

155
00:10:14,399 --> 00:10:19,080
Questions about, yeah, please.

156
00:10:19,080 --> 00:10:31,639
So if you're under counting, you maybe initialize, did you initialize even numbs to something else?

157
00:10:31,639 --> 00:10:37,319
Or maybe this is not incrementing right, or maybe the range is different?

158
00:10:37,319 --> 00:10:41,639
I'll try to read the same one.

159
00:10:41,639 --> 00:10:45,639
Yeah.

160
00:10:45,639 --> 00:10:47,639
It worked.

161
00:10:47,639 --> 00:10:49,639
Awesome.

162
00:10:49,639 --> 00:10:52,120
Okay.

163
00:10:52,120 --> 00:10:58,559
So iterating through, using four loops to iterate through sequence of values is pretty

164
00:10:58,559 --> 00:10:59,559
useful.

165
00:10:59,959 --> 00:11:03,319
Let's take another look here at this particular program.

166
00:11:03,319 --> 00:11:09,559
So this program is this set of code, this code, and this code actually end up doing the

167
00:11:09,559 --> 00:11:10,559
same thing.

168
00:11:10,559 --> 00:11:13,000
But let's look at the top one for now.

169
00:11:13,000 --> 00:11:19,159
So this is a program that takes in a string s as sort of an input, so to speak.

170
00:11:19,159 --> 00:11:23,799
It iterates through the numbers zero to the length of s, right?

171
00:11:23,799 --> 00:11:32,199
So for index in range, len s is basically going to say for index in range, 13, or however

172
00:11:32,199 --> 00:11:35,799
many letters this string has, right?

173
00:11:35,799 --> 00:11:41,879
D E M O space, all those letters, there's probably 13 of them or something like that.

174
00:11:41,879 --> 00:11:47,879
So this line of code here is going to have our index take on the values zero through 13,

175
00:11:47,879 --> 00:11:51,639
representing the index in s, right?

176
00:11:51,639 --> 00:11:55,960
So the lower case D will be at index zero, the lower case E will be at index one, and

177
00:11:55,960 --> 00:11:57,960
so on.

178
00:11:57,960 --> 00:12:05,519
So with this index in hand, the next bit of code, if s square bracket index equal i will

179
00:12:05,519 --> 00:12:12,919
check for me if this particular character is an i, or that particular character is a u.

180
00:12:12,919 --> 00:12:18,679
And every time that happens, I'm going to have this print out, print out to the screen.

181
00:12:18,679 --> 00:12:20,679
There's an i or u.

182
00:12:20,679 --> 00:12:27,599
So inside my code here, this is the first one.

183
00:12:27,599 --> 00:12:32,679
And I run it, it's going to print out that sentence twice because there's only two

184
00:12:32,679 --> 00:12:36,079
eyes are using here, and if it repeats it'll print out twice.

185
00:12:36,079 --> 00:12:41,759
So there's one u and one i.

186
00:12:41,759 --> 00:12:46,319
But this code can actually be written a lot simpler, okay?

187
00:12:46,320 --> 00:12:51,640
So this took me a little bit of a while to explain it, and probably at first glance it

188
00:12:51,640 --> 00:12:54,440
would take you a little bit of time to figure out what it's doing.

189
00:12:54,440 --> 00:13:00,440
And that's because we're actually relying on the index as kind of a middleman, right?

190
00:13:00,440 --> 00:13:07,200
We're looking, we're iterating our for loop through the index, and then we're indexing

191
00:13:07,200 --> 00:13:11,440
into that index variable to grab the particular letter.

192
00:13:11,440 --> 00:13:16,520
It turns out that with for loops, right, I told you you can iterate over any sequence

193
00:13:16,520 --> 00:13:19,480
of values, not just numbers.

194
00:13:19,480 --> 00:13:23,680
And remember that strings are actually just a sequence of characters, right?

195
00:13:23,680 --> 00:13:25,680
Case sensitive characters.

196
00:13:25,680 --> 00:13:33,880
So in Python, we can actually write code like this, so the middle box right here.

197
00:13:33,880 --> 00:13:38,280
It has our for loop iterating through each character in the string directly.

198
00:13:38,279 --> 00:13:45,279
So no longer are we looking at the index 0 through 12, but we're looking at the letter

199
00:13:45,279 --> 00:13:46,799
directly.

200
00:13:46,799 --> 00:13:52,519
So our loop variable, which I called char, but you can call whatever you'd like, is now

201
00:13:52,519 --> 00:13:58,159
going to take on values that are the letters themselves one at a time.

202
00:13:58,159 --> 00:14:01,959
So the first time through the loop, char will be lowercase d, the next time through the

203
00:14:01,959 --> 00:14:07,279
loop char will be lowercase e, the next time char will be lowercase m and so on.

204
00:14:07,279 --> 00:14:11,759
So now we've got the sequence of values, that's the letters directly.

205
00:14:11,759 --> 00:14:18,000
So when we check if the letter is an i or u, all I need to do is check if that character,

206
00:14:18,000 --> 00:14:23,240
right, char, my variable, is equivalent to i or equivalent to u.

207
00:14:23,240 --> 00:14:26,919
And it's going to be the same, and it's exactly the same code.

208
00:14:26,919 --> 00:14:31,759
So this is the one we had before, and this is the one I just went through, and again,

209
00:14:31,759 --> 00:14:38,639
it prints out that sentence twice, right, because it's the same starting string.

210
00:14:38,639 --> 00:14:42,080
So the sequence of values now is our characters direct, right?

211
00:14:42,080 --> 00:14:43,319
It's the letters directly.

212
00:14:43,319 --> 00:14:46,120
It's not the index itself.

213
00:14:46,120 --> 00:14:50,600
And it turns out there's actually a much more python way to write the code, this middle

214
00:14:50,600 --> 00:14:52,879
box down here.

215
00:14:52,879 --> 00:14:57,840
So in the bottom box, the only part that I've changed is the if statement.

216
00:14:57,840 --> 00:15:03,800
And I'm using this in keyword to test whether the character that I have in hand, lowercase

217
00:15:03,800 --> 00:15:10,240
d, lowercase e, lowercase m, and so on, is in this sequence of characters, i or u.

218
00:15:10,240 --> 00:15:14,200
And for this case, it's not so important, right, because in the middle box, we could

219
00:15:14,200 --> 00:15:19,519
do if char is equal to i or char is equal to u, which is fine.

220
00:15:19,519 --> 00:15:24,120
But if we were, if we wanted to test if the character is one of the digits zero through

221
00:15:24,120 --> 00:15:25,200
nine.

222
00:15:25,200 --> 00:15:31,680
This if or or or would become a really long line, right?

223
00:15:31,680 --> 00:15:37,720
And so all we can do is, if char is in some particular sequence of characters, python

224
00:15:37,720 --> 00:15:42,920
will automatically turn that into that longer if it's this or if it's this or if it's this

225
00:15:42,920 --> 00:15:45,680
or if it's this and so on.

226
00:15:45,680 --> 00:15:46,680
Okay.

227
00:15:46,680 --> 00:15:47,680
Okay.

228
00:15:47,680 --> 00:15:52,040
So the big idea here with four loops is that yes, we're iterating through a sequence

229
00:15:52,039 --> 00:15:55,279
of values, but we're not limited to just numbers.

230
00:15:55,279 --> 00:15:56,719
And that's the cool thing about four loops.

231
00:15:56,719 --> 00:16:00,959
You can iterate through characters directly and we're going to see later on, we can iterate

232
00:16:00,959 --> 00:16:07,919
through lists of numbers, lists of strings and a whole bunch of other things.

233
00:16:07,919 --> 00:16:10,480
So let's write a slightly more complex program.

234
00:16:10,480 --> 00:16:14,439
This was version 0.01 of the two liter robots.

235
00:16:14,439 --> 00:16:20,959
You see up in the corner there that I wrote the robots, or not mine, but the code is.

236
00:16:20,960 --> 00:16:25,920
So here's a little bit of code that kind of puts together iterating through strings directly

237
00:16:25,920 --> 00:16:28,280
and iterating through numbers directly.

238
00:16:28,280 --> 00:16:31,960
So let me show you what this program is actually doing.

239
00:16:31,960 --> 00:16:33,800
And then we'll go over the code.

240
00:16:33,800 --> 00:16:38,960
Somebody give me some noun you're really excited about.

241
00:16:38,960 --> 00:16:40,960
What is that?

242
00:16:40,960 --> 00:16:41,960
What?

243
00:16:41,960 --> 00:16:46,320
Never mind.

244
00:16:46,320 --> 00:16:50,120
Give me something else that I know.

245
00:16:50,120 --> 00:16:51,120
What is it?

246
00:16:51,120 --> 00:16:52,120
Pineapples.

247
00:16:52,120 --> 00:16:53,120
Okay.

248
00:16:53,120 --> 00:16:54,120
Pineapples.

249
00:16:54,120 --> 00:16:59,720
Okay, so it's going to cheer for us about pineapples and let's say we're enthusiastic level

250
00:16:59,720 --> 00:17:02,320
eight about pineapples.

251
00:17:02,320 --> 00:17:05,160
All right, so this is my cheerleader program.

252
00:17:05,160 --> 00:17:10,640
So I typed in a word and I typed in an enthusiasm level for pineapples.

253
00:17:10,640 --> 00:17:16,000
And then all it does is, and notice the repetition, which computers are really awesome for.

254
00:17:16,000 --> 00:17:21,160
Give me a p, p, give me an i, i, give me an n, and so on.

255
00:17:21,160 --> 00:17:22,160
What does that spell?

256
00:17:22,160 --> 00:17:25,960
And then it does pineapples with three exclamation marks eight times because that's

257
00:17:25,960 --> 00:17:28,799
how enthusiastic I'm about pineapples.

258
00:17:28,799 --> 00:17:32,480
All right, so let's look at the code that actually does this.

259
00:17:32,480 --> 00:17:34,359
Notice there's two parts to it, right?

260
00:17:34,359 --> 00:17:38,680
There's the part that does the spelling.

261
00:17:38,680 --> 00:17:43,799
And then there's the part that does repeating the word some number of times.

262
00:17:43,799 --> 00:17:45,759
So these are two separate loops.

263
00:17:45,759 --> 00:17:51,039
The spelling is up here, this for loop here, and then repeating some number of times is down

264
00:17:51,039 --> 00:17:52,039
here.

265
00:17:52,039 --> 00:18:01,159
Okay, so the part where we do the spelling has a for loop that iterates through the letters

266
00:18:01,159 --> 00:18:03,519
in the word directly, right?

267
00:18:03,519 --> 00:18:08,359
I'm not doing anything special with these letters, so I can just iterate through the letters

268
00:18:08,359 --> 00:18:09,359
directly.

269
00:18:09,359 --> 00:18:17,959
So for W in word, where word is the input that I grabbed from the user, W is a loop variable

270
00:18:17,959 --> 00:18:24,519
that's going to first be p, then i, then n, then e, then a, and so on, right?

271
00:18:24,519 --> 00:18:28,799
And then I have an if else here, and if you look carefully, the only difference between

272
00:18:28,799 --> 00:18:33,399
the if, what we do inside the if and what we do inside the else is whether we type in

273
00:18:33,399 --> 00:18:38,159
on, and then a letter, or a, and then the letter, right?

274
00:18:38,160 --> 00:18:43,400
Because some letters make sense to say give me un a, as opposed to give me a a, it just

275
00:18:43,400 --> 00:18:45,600
doesn't sound right in English.

276
00:18:45,600 --> 00:18:51,360
The letters where it makes sense to do un are defined up here, so notice they're just

277
00:18:51,360 --> 00:18:55,640
defined as a really long string.

278
00:18:55,640 --> 00:19:01,360
And so the if statement uses that in keyword we saw in the slide, right?

279
00:19:01,360 --> 00:19:08,080
It says if W, so if that particular character is one of these, is in this sequence of

280
00:19:08,079 --> 00:19:15,480
characters, then print give me un, and that particular character.

281
00:19:15,480 --> 00:19:19,519
And otherwise it's, you know, it's not one of these letters where it makes sense to say

282
00:19:19,519 --> 00:19:25,159
un, so then you just print give me a, and then that letter.

283
00:19:25,159 --> 00:19:29,839
Here I just rewrote these two print statements using f strings, which we talked about back

284
00:19:29,839 --> 00:19:37,240
in lecture two, just to show you how you could, how you could rewrite it with f strings,

285
00:19:37,240 --> 00:19:38,839
but it can be done both ways.

286
00:19:38,839 --> 00:19:43,640
Okay, so at the end of this, we've done the spelling, and then we have a print statement

287
00:19:43,640 --> 00:19:49,120
that says what is that spell, and then the last part is to repeat that word, some n number

288
00:19:49,120 --> 00:19:51,240
of times, whatever the user told us.

289
00:19:51,240 --> 00:19:56,480
So I save that number of times in a variable called times, and then all I do here is I

290
00:19:56,480 --> 00:20:01,920
have a nice little for loop that goes through however many, how much, how much that number

291
00:20:01,920 --> 00:20:03,279
is, right?

292
00:20:03,279 --> 00:20:07,839
So range times means it's going to be zero all the way up through and including times minus

293
00:20:07,839 --> 00:20:09,960
one.

294
00:20:09,960 --> 00:20:14,559
That's a total of eight, eight times in this particular case that it loops through, and

295
00:20:14,559 --> 00:20:19,000
then all we do is print the word with three exclamation marks.

296
00:20:19,000 --> 00:20:25,200
Notice that this print statement that's inside the bottom for loop is not actually doing anything

297
00:20:25,200 --> 00:20:26,839
with our loop variable, right?

298
00:20:26,839 --> 00:20:30,279
Our loop variable here is I, but we're not doing anything with it.

299
00:20:30,279 --> 00:20:32,839
And that's totally fine, right?

300
00:20:32,839 --> 00:20:36,839
Because all we're using in the times in the loop variable in this particular case is to

301
00:20:36,839 --> 00:20:39,799
do this action some number of times, right?

302
00:20:39,799 --> 00:20:43,519
We don't always have to do something with that loop variable.

303
00:20:43,519 --> 00:20:46,679
Any questions about this code?

304
00:20:46,679 --> 00:20:47,679
Yeah.

305
00:20:47,679 --> 00:20:53,679
Could you also have you if statements were not print?

306
00:20:53,679 --> 00:20:55,679
Could you use if statements for the prints?

307
00:20:55,679 --> 00:20:59,039
Which ones, which prints, these ones?

308
00:20:59,039 --> 00:21:00,039
How so?

309
00:21:00,039 --> 00:21:09,039
I mean, to evaluate the w's instead of having to kind of check anything?

310
00:21:09,039 --> 00:21:11,359
I mean, f, not if f.

311
00:21:11,359 --> 00:21:12,359
Oh, f strings.

312
00:21:12,359 --> 00:21:13,759
Yeah, we could have done it like this.

313
00:21:13,759 --> 00:21:18,559
Yeah, so this is how it is f, and then we do the characters themselves inside the curly

314
00:21:18,559 --> 00:21:19,559
brackets.

315
00:21:19,559 --> 00:21:20,879
Yeah, oh, no, it's okay.

316
00:21:20,879 --> 00:21:21,879
It's okay.

317
00:21:21,879 --> 00:21:22,680
Yeah, there's a question.

318
00:21:22,680 --> 00:21:23,680
Yeah.

319
00:21:23,680 --> 00:21:27,119
Can I have that last four reports since we're not actually doing it on the line?

320
00:21:27,119 --> 00:21:34,199
Yeah, so the last four loop is still going to iterate through times times, right?

321
00:21:34,199 --> 00:21:39,879
And the loop variable each time through the loop will be 0 than 1, then 2, then 3.

322
00:21:39,879 --> 00:21:42,519
We're not doing anything with the i, right?

323
00:21:42,519 --> 00:21:47,079
The stuff that's indented is going to get done, but we're just not using the fact that

324
00:21:47,079 --> 00:21:50,599
i is 0 or 1 or 2 at all.

325
00:21:50,599 --> 00:21:53,439
Yeah, it increments itself automatically.

326
00:21:53,439 --> 00:21:54,839
We're just not using it.

327
00:21:54,839 --> 00:21:55,839
Yeah, exactly.

328
00:21:56,839 --> 00:21:58,839
Okay.

329
00:21:58,839 --> 00:22:02,519
And that's what I said.

330
00:22:02,519 --> 00:22:05,519
Okay, so let's have you write a little bit of code.

331
00:22:05,519 --> 00:22:09,720
So let's assume you're going to be given a string of lowercase letters, right?

332
00:22:09,720 --> 00:22:12,720
So we're not going to bother uppercase, lowercase, just to assume you're given lowercase

333
00:22:12,720 --> 00:22:13,720
letters.

334
00:22:13,720 --> 00:22:18,639
It's stored in a variable s, so as an example, s is equal to a, b, c, a.

335
00:22:18,639 --> 00:22:23,119
I would like you to write some code that counts how many unique letters are in this string,

336
00:22:23,119 --> 00:22:24,119
right?

337
00:22:24,119 --> 00:22:30,199
This a occurs twice, but the count that your code should do for this particular, in this

338
00:22:30,199 --> 00:22:31,919
particular string should just be three, right?

339
00:22:31,919 --> 00:22:33,319
We don't want to double count the a.

340
00:22:33,319 --> 00:22:40,199
So there are three unique letters in a, b, c, a, they are a, b, and c.

341
00:22:40,199 --> 00:22:41,759
So I do have a little hint.

342
00:22:41,759 --> 00:22:48,479
It involves the use of an extra variable as these programs usually go.

343
00:22:48,480 --> 00:22:54,279
Try to think about having this extra variable be a string that contains everything you've

344
00:22:54,279 --> 00:22:56,960
seen so far.

345
00:22:56,960 --> 00:23:02,799
So as soon as you see a letter that you haven't seen before, add it to this string variable

346
00:23:02,799 --> 00:23:07,200
that you've, marking that you've now seen this, this letter.

347
00:23:07,200 --> 00:23:13,559
And then use this seen variable to, to write the rest of it.

348
00:23:13,559 --> 00:23:17,599
So if you, as you go through your, your letters, make sure that you're going to check whether

349
00:23:17,599 --> 00:23:25,319
you've seen it already before, before recounting it.

350
00:23:25,319 --> 00:23:29,719
So as usual, it's in here, around line 76.

351
00:23:29,719 --> 00:23:32,839
This is the code to, to do it.

352
00:23:32,839 --> 00:23:36,639
So I'll give you a couple minutes and then we can write it together.

353
00:23:36,639 --> 00:23:38,719
Okay.

354
00:23:38,719 --> 00:23:41,119
So let me just work through it.

355
00:23:41,119 --> 00:23:44,079
And this is something that I think is pretty useful in a quiz situation.

356
00:23:44,079 --> 00:23:48,720
It's just writing things on paper first, just because it's a programming computer science

357
00:23:48,720 --> 00:23:51,279
class doesn't mean we have to start coding right away.

358
00:23:51,279 --> 00:23:55,119
So it's really helpful to just kind of put some ideas down on paper.

359
00:23:55,119 --> 00:24:01,039
So the way I would go about this problem is clearly I have to touch each character, right,

360
00:24:01,039 --> 00:24:06,759
in the string S. So already for me, that's, I need to have a loop.

361
00:24:06,759 --> 00:24:10,839
So as I'm looking at each character, I'm going to keep track of it.

362
00:24:10,839 --> 00:24:15,879
So if it's not something I haven't seen, so if it's something I haven't seen before,

363
00:24:15,879 --> 00:24:21,319
what I want to do is say, okay, I have now seen this a, so I'm going to add it to a seen

364
00:24:21,319 --> 00:24:23,599
variable.

365
00:24:23,599 --> 00:24:26,319
And then I'm going to increment a counter, right, I've seen it once.

366
00:24:26,319 --> 00:24:31,319
So count may be equals one.

367
00:24:31,319 --> 00:24:36,679
The next time I look at the next letter, I'm going to say, it's a b, have I seen it before?

368
00:24:36,679 --> 00:24:37,679
No.

369
00:24:37,680 --> 00:24:42,840
I'm going to add it to my seen variable and increment my count.

370
00:24:42,840 --> 00:24:47,039
Next time I'm going to look at the letter C, have I seen it before?

371
00:24:47,039 --> 00:24:51,440
No, I'm going to add it to my seen and then I'm going to increment my count.

372
00:24:51,440 --> 00:24:54,840
And then the last time I'm going to look at this letter A, I'm going to say, is it already

373
00:24:54,840 --> 00:24:55,840
in my seen?

374
00:24:55,840 --> 00:24:56,840
Yep.

375
00:24:56,840 --> 00:24:59,560
So I'm not going to do anything with this one, right.

376
00:24:59,560 --> 00:25:04,860
So when I see a letter, I've, that's already seen, that I've already added to my seen

377
00:25:04,859 --> 00:25:07,740
variable, I basically do nothing in my code, right.

378
00:25:07,740 --> 00:25:13,379
So the most of the work happens when I encounter something I have never seen before.

379
00:25:13,379 --> 00:25:17,899
So does anyone have some starter code or something we can write?

380
00:25:17,899 --> 00:25:19,939
We don't have to write it perfectly top to bottom.

381
00:25:19,939 --> 00:25:25,179
We can write pieces here and there.

382
00:25:25,179 --> 00:25:26,179
Yep.

383
00:25:26,180 --> 00:25:43,420
I wrote four cards and I said, I have a full story, but I said, like, if card is in a seen

384
00:25:43,420 --> 00:25:47,420
variable, I want to say if it's not in seen.

385
00:25:47,420 --> 00:25:49,820
Yeah, so that's a great start.

386
00:25:49,820 --> 00:25:55,580
So if you want to say if it's not in seen, we can just say if char or car, however you pronounce

387
00:25:55,579 --> 00:25:58,379
it is not in seen.

388
00:25:58,379 --> 00:26:04,819
So that takes the inverse of, you know, true or false, whatever this is, right.

389
00:26:04,819 --> 00:26:11,859
Because in seen will either be true or false and not that will be false or true, right.

390
00:26:11,859 --> 00:26:12,859
So that's perfect.

391
00:26:12,859 --> 00:26:13,859
Yeah.

392
00:26:13,859 --> 00:26:18,179
How do you, how do you, when you use the word not, when you use like the estimation of

393
00:26:18,179 --> 00:26:19,179
play?

394
00:26:19,179 --> 00:26:20,179
Oh, yeah.

395
00:26:20,179 --> 00:26:23,699
So we can use not when we're dealing with Booleans, right.

396
00:26:23,700 --> 00:26:28,819
So something that expression that evaluates to true or false, that's when we use not and

397
00:26:28,819 --> 00:26:29,819
then not equal.

398
00:26:29,819 --> 00:26:35,860
So the exclamation mark equal is used with other expressions when we're testing for equality,

399
00:26:35,860 --> 00:26:36,860
right.

400
00:26:36,860 --> 00:26:41,819
Like three, not equal to or like a, not equal b or something like that, right.

401
00:26:41,819 --> 00:26:48,539
So things that are, that could be numerical, not necessarily just true and false.

402
00:26:48,539 --> 00:26:50,779
Okay.

403
00:26:50,779 --> 00:26:57,099
So if char is not in seen, so if I haven't seen it before, what do I want to do?

404
00:26:57,099 --> 00:26:59,099
Yeah.

405
00:26:59,099 --> 00:27:00,099
Yep.

406
00:27:00,099 --> 00:27:07,099
Yep.

407
00:27:07,099 --> 00:27:18,980
So we can append the character that we just looked at to our scene list, right.

408
00:27:18,980 --> 00:27:21,299
So that's what we had done incrementally here.

409
00:27:21,299 --> 00:27:27,460
So that takes care of adding the character one by one if we haven't seen it to our scene.

410
00:27:27,460 --> 00:27:29,259
Good.

411
00:27:29,259 --> 00:27:33,700
Anything else we want to do or we can even test it out like this, right.

412
00:27:33,700 --> 00:27:40,740
So we can print scene each time through our loop, right.

413
00:27:40,740 --> 00:27:45,660
So first it's a, then it's ab, then it's abc, and then the last time it should still be

414
00:27:45,660 --> 00:27:47,339
abc.

415
00:27:47,339 --> 00:27:49,779
And it is.

416
00:27:49,779 --> 00:27:52,740
Okay.

417
00:27:52,740 --> 00:27:58,619
And the last step is to just do what the problem asks us to do, which is to print how many characters

418
00:27:58,619 --> 00:28:04,419
are, how many unique characters are in this list, or in this string.

419
00:28:04,419 --> 00:28:07,419
Yep.

420
00:28:07,420 --> 00:28:18,060
Yep.

421
00:28:18,060 --> 00:28:24,140
We can have a counter that is initially zero before the loop.

422
00:28:24,140 --> 00:28:30,500
And every time we add a new thing to our scene, string, we can increment our counter.

423
00:28:30,500 --> 00:28:33,900
And then that takes care of the bulk of the work, right.

424
00:28:33,900 --> 00:28:37,700
This does all the counting, all the adding to the unique scene.

425
00:28:37,700 --> 00:28:42,620
And so at the end of the loop, we have this number in hand, and then we can just print

426
00:28:42,620 --> 00:28:43,620
it.

427
00:28:43,620 --> 00:28:45,940
So with this particular case, it's three.

428
00:28:45,940 --> 00:28:51,740
If we add more A's in random spots, it's still going to be three, right.

429
00:28:51,740 --> 00:28:52,740
Yeah.

430
00:28:52,740 --> 00:28:54,740
Out of the forms.

431
00:28:54,740 --> 00:28:55,740
Yeah.

432
00:28:55,740 --> 00:29:00,220
So now that we have some code that basically that works really well, we can make improvements

433
00:29:00,220 --> 00:29:01,220
to it.

434
00:29:01,220 --> 00:29:07,700
And that suggests it is instead of keeping a counter variable, we can actually just recognize

435
00:29:07,700 --> 00:29:13,539
the fact that the length of our scene is just all the unique characters we've seen already,

436
00:29:13,539 --> 00:29:14,539
right.

437
00:29:14,539 --> 00:29:17,539
Because when we double up on something, we don't read it.

438
00:29:17,539 --> 00:29:25,380
So all we can do to print out the number of unique characters is to just say I'm going

439
00:29:25,380 --> 00:29:28,620
to print out the length of scene.

440
00:29:28,619 --> 00:29:31,739
And now there's no need to increment any sort of counter.

441
00:29:31,739 --> 00:29:41,059
And so that still gives us three.

442
00:29:41,059 --> 00:29:42,059
Questions about this code?

443
00:29:42,059 --> 00:29:45,659
Does it make sense?

444
00:29:45,659 --> 00:29:48,819
Okay.

445
00:29:48,819 --> 00:29:50,179
Notice there's no else, right.

446
00:29:50,179 --> 00:29:51,579
We just have a nice little if.

447
00:29:51,579 --> 00:29:53,299
There's no else.

448
00:29:53,299 --> 00:29:56,699
Because there's nothing to do when we've already seen the character.

449
00:29:56,700 --> 00:29:59,019
So we could have else pass.

450
00:29:59,019 --> 00:30:02,900
And pass is just some, it's just a keyword in Python.

451
00:30:02,900 --> 00:30:05,660
You see it's turned blue because it's a keyword in Python.

452
00:30:05,660 --> 00:30:07,980
It just means do nothing, right.

453
00:30:07,980 --> 00:30:10,700
So we wouldn't write this, obviously.

454
00:30:10,700 --> 00:30:15,460
But that's, that, that, you know, if we had an else case, that, that's what we do.

455
00:30:15,460 --> 00:30:17,539
We just do nothing.

456
00:30:17,539 --> 00:30:21,460
Okay.

457
00:30:21,460 --> 00:30:23,460
Other questions about the code?

458
00:30:23,460 --> 00:30:24,460
Is that right?

459
00:30:24,460 --> 00:30:31,460
Sorry, say again.

460
00:30:31,460 --> 00:30:38,779
Why are we printing the length of scene here?

461
00:30:38,779 --> 00:30:47,620
So we're printing the length of scene because, because we see that whenever we add a unique

462
00:30:47,620 --> 00:30:54,380
character to this scene variable, it's one that we haven't actually seen before.

463
00:30:54,380 --> 00:30:55,380
Right.

464
00:30:55,380 --> 00:31:01,500
And so the only things I'm adding to my scene are things that are new.

465
00:31:01,500 --> 00:31:06,700
And so even as I was going through manually here, I said, I've seen the A, I've seen the

466
00:31:06,700 --> 00:31:08,900
B, I've seen the C, I added the one by one.

467
00:31:08,900 --> 00:31:14,100
And then when I saw the duplicate A, I didn't add it to my here, right.

468
00:31:14,100 --> 00:31:22,620
And so basically the scene already contains all the unique characters in my, in my, in my,

469
00:31:22,619 --> 00:31:29,619
my string, original string.

470
00:31:29,619 --> 00:31:31,259
Okay.

471
00:31:31,259 --> 00:31:35,139
So quick summary of what we've seen so far before we start looking at our first algorithm.

472
00:31:35,139 --> 00:31:36,819
So we've seen objects, right.

473
00:31:36,819 --> 00:31:39,939
That's how we write Python, Python programs.

474
00:31:39,939 --> 00:31:43,179
We manipulate objects by saving them to variables.

475
00:31:43,179 --> 00:31:45,259
So the values are more easily accessible.

476
00:31:45,259 --> 00:31:49,579
We have expressions that evaluate to different things, integers, floats, bullions, things

477
00:31:49,579 --> 00:31:50,579
like that.

478
00:31:50,579 --> 00:31:56,099
We added branching as a way to control, as a control flow mechanism to our program, right.

479
00:31:56,099 --> 00:32:00,379
It says, hey Python, either evaluate this set of statements or this other set of statements

480
00:32:00,379 --> 00:32:03,139
depending on whether this condition is true.

481
00:32:03,139 --> 00:32:09,539
And then we added the last mechanism for control flow, the looping mechanism that said, you

482
00:32:09,539 --> 00:32:16,299
know, either loop or repeat this code while some condition is true or loop this code for

483
00:32:16,299 --> 00:32:18,139
this sequence of values.

484
00:32:18,139 --> 00:32:19,139
Okay.

485
00:32:19,140 --> 00:32:24,700
So really with that in hand, we've basically have a really nice toolbox of things that

486
00:32:24,700 --> 00:32:27,580
we can use to write interesting programs.

487
00:32:27,580 --> 00:32:29,900
That's kind of all we need.

488
00:32:29,900 --> 00:32:31,980
But this is not the end of the class.

489
00:32:31,980 --> 00:32:36,380
We're going to look at other things that will make our code needer more readable.

490
00:32:36,380 --> 00:32:39,660
We can write more of it more efficiently, things like that.

491
00:32:39,660 --> 00:32:44,100
But really if you want to just start writing the algorithms, this is all we need in terms

492
00:32:44,100 --> 00:32:46,420
of Python syntax.

493
00:32:46,420 --> 00:32:51,420
So the first thing we're going to apply this knowledge to is our very first algorithm called

494
00:32:51,420 --> 00:32:54,300
the guess and check algorithm.

495
00:32:54,300 --> 00:32:59,460
So another word for the guess and check algorithm is exhaustive enumeration.

496
00:32:59,460 --> 00:33:03,860
So the idea here is that we're given a problem.

497
00:33:03,860 --> 00:33:06,900
We can guess a value for a solution.

498
00:33:06,900 --> 00:33:07,900
Okay.

499
00:33:07,900 --> 00:33:08,900
We'll just do a guess.

500
00:33:08,900 --> 00:33:10,980
And then we'll test whether this guess is correct.

501
00:33:10,980 --> 00:33:13,420
Does it solve our problem?

502
00:33:13,420 --> 00:33:15,539
If it does, we're done.

503
00:33:15,539 --> 00:33:17,740
We found a solution to our problem.

504
00:33:17,740 --> 00:33:22,820
If it doesn't solve our problem, we're just going to keep making guesses until we've exhausted

505
00:33:22,820 --> 00:33:26,420
our set of possible guesses.

506
00:33:26,420 --> 00:33:31,779
So either we find a solution or we say we weren't able to find a solution to this problem.

507
00:33:31,779 --> 00:33:33,860
Doesn't mean that one doesn't exist.

508
00:33:33,860 --> 00:33:38,019
It just means that with guess and check and exhaustively enumerating all these possible

509
00:33:38,019 --> 00:33:41,500
values, we were not able to find a solution.

510
00:33:41,500 --> 00:33:45,619
So in terms of a flow chart, the way this looks is we have an initial guess.

511
00:33:45,619 --> 00:33:47,299
We ask, is this guess correct?

512
00:33:47,299 --> 00:33:48,779
If it is, we're done.

513
00:33:48,779 --> 00:33:52,859
And if it's not, we're going to choose a next guess.

514
00:33:52,859 --> 00:33:59,140
So let's look at finding the root of a perfect square.

515
00:33:59,140 --> 00:34:00,380
And that's our problem.

516
00:34:00,380 --> 00:34:06,180
And we're going to say either we found the root of this perfect square or we say this

517
00:34:06,180 --> 00:34:09,179
is not a perfect square.

518
00:34:09,179 --> 00:34:14,940
So with guess and check, we can say, well, what if we want to find whether a seven is

519
00:34:14,940 --> 00:34:16,419
a perfect square?

520
00:34:16,419 --> 00:34:18,059
If it is, what is its root?

521
00:34:18,059 --> 00:34:21,619
And if it's not, say that it's not a perfect square.

522
00:34:21,619 --> 00:34:23,419
Well we can make an initial guess.

523
00:34:23,419 --> 00:34:25,500
Six, that's not the right solution.

524
00:34:25,500 --> 00:34:27,019
We can make another guess nine.

525
00:34:27,019 --> 00:34:28,339
That's not the right solution.

526
00:34:28,339 --> 00:34:29,659
We can make another guess two.

527
00:34:29,659 --> 00:34:30,659
That's not the right solution.

528
00:34:30,659 --> 00:34:31,659
We can make a guess zero.

529
00:34:31,659 --> 00:34:33,779
That's obviously not the right solution.

530
00:34:33,779 --> 00:34:36,339
We can keep guessing randomly like this.

531
00:34:36,339 --> 00:34:38,179
But it's not going to be very efficient.

532
00:34:38,179 --> 00:34:42,819
What we want to do is use the power of computers and computers work with these sort of patterns

533
00:34:42,819 --> 00:34:43,819
in hand, right?

534
00:34:43,819 --> 00:34:48,579
Remember range starting from zero, following a pattern going up to some number.

535
00:34:48,579 --> 00:34:50,659
So the idea is to be systematic.

536
00:34:50,659 --> 00:34:54,659
And then we can really harness the power of programming and computers being able to do

537
00:34:54,659 --> 00:34:57,699
things really, really quickly for us.

538
00:34:57,699 --> 00:35:03,980
So for that same problem, finding out whether a number x is a perfect square, let's be

539
00:35:03,980 --> 00:35:08,699
systematic and start with a guess of zero.

540
00:35:08,699 --> 00:35:09,820
Two cases.

541
00:35:09,820 --> 00:35:14,780
The number we're trying to find the square root of is a perfect square.

542
00:35:14,780 --> 00:35:15,780
Let's say four.

543
00:35:15,780 --> 00:35:17,579
We're going to start with a guess of zero.

544
00:35:17,579 --> 00:35:21,780
Zero squared, solve our problem, no, increment.

545
00:35:21,780 --> 00:35:24,699
Does one squared solve our problem, no, increment?

546
00:35:24,699 --> 00:35:26,740
Does two squared solve our problem?

547
00:35:26,740 --> 00:35:29,980
Yes, we are done.

548
00:35:29,980 --> 00:35:33,300
What if x is not a perfect square?

549
00:35:33,300 --> 00:35:36,019
Let's say 10.

550
00:35:36,019 --> 00:35:40,100
Let's use the same systematic approach of guess and check.

551
00:35:40,100 --> 00:35:44,740
We're going to need to add a little bit of algebra, though, because if we don't, we're

552
00:35:44,740 --> 00:35:50,019
at risk of potentially doing something that will lead to an infinite loop.

553
00:35:50,019 --> 00:35:56,140
So the algebra we need to add to solve our problem is to say if we're looking at a number

554
00:35:56,140 --> 00:36:01,260
that's not a perfect square, we have to find a way to stop.

555
00:36:01,260 --> 00:36:04,940
We don't want to guess something that's infinite, this is guess and check.

556
00:36:04,940 --> 00:36:09,300
So we need an exhaustive set of potential solutions.

557
00:36:09,300 --> 00:36:13,580
So we're going to use algebra and we're going to say we're going to stop as soon as our

558
00:36:13,580 --> 00:36:18,420
guess squared becomes bigger than x.

559
00:36:18,420 --> 00:36:21,460
So we're going to start guessing zero than one, then two, then three, then four.

560
00:36:21,460 --> 00:36:25,980
At some point, that number, that guess squared, will be bigger than x.

561
00:36:25,980 --> 00:36:29,500
And we know we can stop because numbers bigger than that will definitely be bigger than

562
00:36:29,500 --> 00:36:30,900
x.

563
00:36:30,900 --> 00:36:36,180
So our first guess would be zero squared, obviously less than 10, one squared less than 10, two

564
00:36:36,180 --> 00:36:38,940
squared less than 10, three squared less than 10, right?

565
00:36:38,940 --> 00:36:41,539
That's nine.

566
00:36:41,539 --> 00:36:51,180
Four squared becomes 16 and we say this is where we stop and we have not found a square root

567
00:36:51,180 --> 00:36:52,180
for 10, right?

568
00:36:52,180 --> 00:36:54,180
So 10 is not a perfect square.

569
00:36:54,180 --> 00:36:56,180
Does that make sense?

570
00:36:56,180 --> 00:36:59,059
Is that all right?

571
00:36:59,059 --> 00:37:00,059
Okay.

572
00:37:00,059 --> 00:37:04,860
Our exhaustive set of potential solutions is zero through four because that brought us

573
00:37:04,860 --> 00:37:09,659
closest to 10 and at four, we've gone over 10.

574
00:37:09,659 --> 00:37:14,420
And we don't need to check five, six, seven because there's definitely not going to be,

575
00:37:14,420 --> 00:37:18,299
those values squared will definitely be bigger than 10.

576
00:37:18,299 --> 00:37:22,420
So this is the code that solves that problem.

577
00:37:22,420 --> 00:37:23,860
We get input from the user.

578
00:37:23,860 --> 00:37:28,779
So what number do you want to find, whether it's a perfect square or not, and what is it

579
00:37:28,780 --> 00:37:31,900
if it is a perfect square?

580
00:37:31,900 --> 00:37:36,380
We have a while loop that checks one condition, right?

581
00:37:36,380 --> 00:37:40,140
That's our stopping condition here.

582
00:37:40,140 --> 00:37:44,900
We're going to iterate through the loop when guess squared is less than x, right?

583
00:37:44,900 --> 00:37:51,019
So on that number line, we're going to keep incrementing by one as long as our square

584
00:37:51,019 --> 00:37:53,700
is less than x.

585
00:37:53,700 --> 00:37:57,260
So that's this while loop here.

586
00:37:57,260 --> 00:38:00,660
And what we're doing inside the loop is incrementing our guess.

587
00:38:00,660 --> 00:38:03,620
Guess equals guess plus one.

588
00:38:03,620 --> 00:38:08,260
And then at some point, if we haven't found a perfect square or if we have found a perfect

589
00:38:08,260 --> 00:38:11,500
square, this condition becomes false, right?

590
00:38:11,500 --> 00:38:16,500
Because this is false when we have the opposite of this less than sign.

591
00:38:16,500 --> 00:38:21,020
So guess squared becomes greater than or equal to x.

592
00:38:21,020 --> 00:38:23,660
Now that's two very different things, right?

593
00:38:23,659 --> 00:38:28,179
guess squared greater than x means we haven't found this perfect square.

594
00:38:28,179 --> 00:38:33,779
But guess squared is equal to x means we have found a perfect square, right?

595
00:38:33,779 --> 00:38:39,940
And both of those cases trigger us to leave the while loop.

596
00:38:39,940 --> 00:38:43,339
So then right after the while loop, we need to have an if else.

597
00:38:43,339 --> 00:38:47,420
The if else checks for one of those two cases.

598
00:38:47,420 --> 00:38:52,659
So the if guess squared is equivalent to x means that we exited the while loop because

599
00:38:52,659 --> 00:38:54,899
we found that it was a perfect square.

600
00:38:54,899 --> 00:38:56,339
So like four for example, right?

601
00:38:56,339 --> 00:39:00,339
If x was four when we hit two, that while loop becomes false.

602
00:39:00,339 --> 00:39:05,259
And we exited because four was a perfect square.

603
00:39:05,259 --> 00:39:10,739
But the 10 for example would fall within the else clause here, right?

604
00:39:10,739 --> 00:39:17,779
Because we have x to the loop because guess squared for or squared 16 was greater than 10.

605
00:39:18,740 --> 00:39:22,300
And so that's then we would print x is not a perfect square.

606
00:39:25,460 --> 00:39:31,140
Okay, so this works for many different values as big as you'd like.

607
00:39:31,140 --> 00:39:34,420
But it doesn't work for it doesn't work for negative values.

608
00:39:35,500 --> 00:39:38,660
And the reason it doesn't work for negative values is because the loop never

609
00:39:38,660 --> 00:39:41,500
actually enters in the first place.

610
00:39:41,500 --> 00:39:48,820
So for example, if we look at this whether negative two is a perfect square,

611
00:39:48,820 --> 00:39:52,659
we're going to start with guess is zero just because that's how we implemented

612
00:39:52,659 --> 00:39:53,500
the algorithm, right?

613
00:39:53,500 --> 00:39:56,820
On the previous slide, it says guess is equal to zero right at the top.

614
00:39:59,260 --> 00:40:04,380
And so guess is zero, we say is zero squared less than x?

615
00:40:05,539 --> 00:40:08,539
No, zero is not less than negative two.

616
00:40:08,539 --> 00:40:10,619
And that while loop never even enters at all.

617
00:40:11,980 --> 00:40:12,940
Which is fine, right?

618
00:40:12,940 --> 00:40:17,739
Because negative two does not or negative four, you know, negative numbers are not

619
00:40:17,739 --> 00:40:22,019
perfect squares unless we're talking about imagining numbers, but we're not in this

620
00:40:22,019 --> 00:40:22,780
particular case.

621
00:40:23,780 --> 00:40:27,699
However, we might want to handle the case when the user gives us a negative number.

622
00:40:27,699 --> 00:40:30,820
Maybe they accidentally typed in the negative sign or something like that.

623
00:40:31,820 --> 00:40:37,179
So we can actually take care of that case by adding a little bit of extra code

624
00:40:37,179 --> 00:40:38,579
around what we already wrote.

625
00:40:39,579 --> 00:40:43,019
So the stuff that's boxed in red is the extra code we write.

626
00:40:43,019 --> 00:40:45,779
Everything else is exactly the same as two slides ago.

627
00:40:47,539 --> 00:40:52,819
So the only thing we want to do when we encounter a negative number is flag it,

628
00:40:53,900 --> 00:40:57,059
using a new variable that's either true or false.

629
00:40:57,579 --> 00:41:00,139
And then at the end, we can handle that flag.

630
00:41:00,659 --> 00:41:04,579
So if it's true, we do something and if it's false, we do something else.

631
00:41:05,099 --> 00:41:10,099
So in this particular case, we've got a negative flag initially false,

632
00:41:10,099 --> 00:41:14,900
which means that we're going to initially assume the user gives us a positive value,

633
00:41:14,900 --> 00:41:15,259
right?

634
00:41:15,259 --> 00:41:16,779
So negative flag equals false.

635
00:41:18,019 --> 00:41:22,299
The user, we get input from the user and then we check if the user gave us a negative

636
00:41:22,299 --> 00:41:22,699
number.

637
00:41:22,699 --> 00:41:27,819
So if the x is less than zero, then we're going to change the value of this flag.

638
00:41:28,500 --> 00:41:29,980
Neg flag equals to true.

639
00:41:30,699 --> 00:41:32,819
So we're going to change the value from false to true.

640
00:41:33,780 --> 00:41:36,539
And then the rest of it is the same, right?

641
00:41:36,539 --> 00:41:40,860
This is all the same as what we had two slides ago, except that at the end,

642
00:41:40,860 --> 00:41:45,620
we're going to check to see if the user actually gave us a negative number.

643
00:41:46,100 --> 00:41:47,100
We can check with them.

644
00:41:47,100 --> 00:41:50,420
Did you actually mean the positive version of that number or something like that?

645
00:41:53,220 --> 00:41:58,180
And so in code, the way this looks is follows.

646
00:41:58,180 --> 00:42:02,660
So if we run it and we give it, you know, four, obviously it tells us

647
00:42:02,659 --> 00:42:05,539
it's a perfect square and what its square root is.

648
00:42:06,019 --> 00:42:09,539
Nine works 10.

649
00:42:10,299 --> 00:42:11,739
It says it's not a perfect square.

650
00:42:12,059 --> 00:42:19,059
And then when we give it a negative number, square or not, it just tells us negative four

651
00:42:19,059 --> 00:42:20,179
is not a perfect square.

652
00:42:20,179 --> 00:42:21,659
And then it says just checking.

653
00:42:21,659 --> 00:42:22,299
Did you mean four?

654
00:42:22,299 --> 00:42:25,500
So does this extra print statement when the number was negative?

655
00:42:29,059 --> 00:42:29,980
Yeah, question.

656
00:42:33,659 --> 00:42:36,859
Yeah, so I can explain that again.

657
00:42:36,859 --> 00:42:41,379
So the negative flag equals false is just a variable, right?

658
00:42:41,379 --> 00:42:42,859
I just called it neg flag.

659
00:42:42,859 --> 00:42:47,899
It's a variable I initialize to false just to say, hey, the number I'm going to assume is not negative.

660
00:42:48,659 --> 00:42:53,819
And then we only flag it to, we only change its value to true if the number was negative.

661
00:42:53,819 --> 00:42:57,859
So in fact, we could have just had a little if else here, right?

662
00:42:57,859 --> 00:43:00,460
So we get the act, we don't have this line up here.

663
00:43:00,659 --> 00:43:02,340
We have x is equal to int.

664
00:43:02,340 --> 00:43:07,220
And then we say if x is less than zero, neg flag equals true, else neg flag equals false.

665
00:43:07,220 --> 00:43:08,220
We could have done that as well.

666
00:43:12,860 --> 00:43:17,380
Okay, so the big idea with guess and check is we can't test an infinite number of values.

667
00:43:17,380 --> 00:43:19,780
We have to stop at some point, right?

668
00:43:22,340 --> 00:43:27,380
So now we've been working with the code that looks like something on the left side, right?

669
00:43:27,380 --> 00:43:29,179
We've been using wild loops.

670
00:43:29,179 --> 00:43:36,219
But we've seen that we can actually write very efficient code using four loops as well.

671
00:43:36,219 --> 00:43:42,500
And in fact, the guess and check method may be intuitively lend itself better to a four loop than a wild loop, right?

672
00:43:42,500 --> 00:43:46,940
Because we're trying to iterate through an exhaustive set of values, right?

673
00:43:46,940 --> 00:43:49,619
The number zero through some number, right?

674
00:43:49,619 --> 00:43:54,099
And so maybe a four loop is a better way to write such a guess and check algorithm.

675
00:43:54,099 --> 00:43:56,659
And we're going to see how to rewrite that in a little bit.

676
00:43:56,659 --> 00:44:02,179
But in terms of a flow chart, the way the four loop would go is we sequentially go through all the possible values.

677
00:44:02,179 --> 00:44:05,779
When we've exhausted all the values, we say we didn't find a solution.

678
00:44:05,779 --> 00:44:11,139
And otherwise, the four loop just automatically grabs for us the next value in the sequence.

679
00:44:12,779 --> 00:44:14,379
So let's have you work on this for a little bit.

680
00:44:14,379 --> 00:44:17,299
I want you to hard code for me a number as a secret number.

681
00:44:17,299 --> 00:44:19,619
This is kind of what we did last lecture.

682
00:44:19,619 --> 00:44:23,460
So secret equals, you know, seven, five, whatever you'd like it to be.

683
00:44:23,460 --> 00:44:30,699
And then I want you to write some code that goes through all of these numbers from one to 10 inclusive, let's say.

684
00:44:30,699 --> 00:44:34,460
And prints that it found the secret number.

685
00:44:34,460 --> 00:44:39,539
So if the secret number is within the range zero through 10, print that you found the number.

686
00:44:40,579 --> 00:44:42,539
And otherwise, don't print anything.

687
00:44:42,539 --> 00:44:44,860
So if you don't find the number, print nothing.

688
00:44:46,740 --> 00:44:50,420
And as you're working on that, and if you finish that code,

689
00:44:50,420 --> 00:44:55,460
think about how you would change that code to do one thing differently.

690
00:44:55,460 --> 00:44:59,420
If it's not found, print that you didn't find it.

691
00:44:59,420 --> 00:45:03,139
So in the first version, if you don't find it, do nothing.

692
00:45:03,139 --> 00:45:07,579
But in the second version, if you don't find it, tell me that you didn't find it.

693
00:45:09,340 --> 00:45:15,740
So these codes are in this Python file.

694
00:45:15,740 --> 00:45:20,260
And the easier version is about line 129.

695
00:45:20,260 --> 00:45:23,980
And then if you work on, you know, after you finish that, if you're done,

696
00:45:23,980 --> 00:45:31,740
you can just copy that code to lines about 144 and try to modify it to the new specification.

697
00:45:31,740 --> 00:45:34,580
So if you don't find it, print that you didn't find it.

698
00:45:37,300 --> 00:45:41,460
Okay. So tell me some code for the first one.

699
00:45:41,460 --> 00:45:44,980
So if we find the number, print, we found it, and otherwise do nothing.

700
00:45:50,260 --> 00:45:55,500
What's better? Why loop or for loop?

701
00:45:59,500 --> 00:46:00,860
For loop, yeah.

702
00:46:00,860 --> 00:46:10,300
For, let's say I in range, how do I get numbers 1 to 10, inclusive?

703
00:46:13,300 --> 00:46:15,860
1 comma 11, exactly good.

704
00:46:15,860 --> 00:46:18,780
So this, and again, I can write a little message for myself.

705
00:46:18,780 --> 00:46:24,140
I is 1, 2, 3, 4, dot, dot, dot 11.

706
00:46:25,380 --> 00:46:30,860
What do I do to make the check whether this number I is my secret?

707
00:46:36,740 --> 00:46:41,820
Yep, if I equi will secret, we'll, let's say print found.

708
00:46:42,780 --> 00:46:46,220
Okay. Run it.

709
00:46:46,220 --> 00:46:48,620
Obviously 4 is within that range.

710
00:46:48,620 --> 00:46:51,740
Obviously 100, not in that range.

711
00:46:51,740 --> 00:46:57,340
Right? So when we had 4, it printed found, and when we had 100, it did nothing.

712
00:46:57,340 --> 00:47:03,100
Okay. I'm going to copy this code and paste it down here.

713
00:47:03,100 --> 00:47:08,740
So let's try the version now where we just make one small change to our specification.

714
00:47:08,739 --> 00:47:13,779
Right? Now we request the code to say if you don't find the number within this range,

715
00:47:13,779 --> 00:47:15,739
print that you did not find it.

716
00:47:17,739 --> 00:47:19,739
What are some things we can try?

717
00:47:21,179 --> 00:47:22,899
Else, okay.

718
00:47:25,139 --> 00:47:28,339
Print not found.

719
00:47:29,139 --> 00:47:30,139
Okay.

720
00:47:30,139 --> 00:47:32,139
So 4, obviously,

721
00:47:33,139 --> 00:47:40,139
was found, but we also printed all these not founds.

722
00:47:43,139 --> 00:47:44,139
Why?

723
00:47:46,139 --> 00:47:47,139
Yes?

724
00:47:47,139 --> 00:47:50,139
Because it's been ready to hold range.

725
00:47:50,139 --> 00:47:53,139
So you can try to do a print without a portfolio?

726
00:47:53,139 --> 00:47:56,139
Yeah. We'll print it out because it's iterating through the whole range.

727
00:47:56,139 --> 00:48:00,139
Every time I check an I, I'm either printing found or not found.

728
00:48:01,139 --> 00:48:02,139
Yeah.

729
00:48:02,139 --> 00:48:08,139
So we could break, I guess, when we found it, right?

730
00:48:09,139 --> 00:48:12,139
Break. Run it.

731
00:48:14,139 --> 00:48:18,139
Okay. Then we print not found until we find it, and then we break.

732
00:48:18,139 --> 00:48:20,139
So we're getting there, right?

733
00:48:20,139 --> 00:48:22,139
It's looking a little bit better.

734
00:48:23,139 --> 00:48:24,139
What else can we try?

735
00:48:24,139 --> 00:48:25,139
Yes.

736
00:48:26,139 --> 00:48:28,139
Another break?

737
00:48:30,139 --> 00:48:33,139
We can try another break after not found.

738
00:48:35,139 --> 00:48:37,139
But then the 4 is not found.

739
00:48:37,139 --> 00:48:39,139
Yeah.

740
00:48:39,139 --> 00:48:41,139
I'm going to print it.

741
00:48:41,139 --> 00:48:44,139
I guess, I guess,

742
00:48:44,139 --> 00:48:46,139
I'll print it there.

743
00:48:46,139 --> 00:48:48,139
I'm going to print it.

744
00:48:48,139 --> 00:48:50,139
I guess that should be more, more,

745
00:48:50,139 --> 00:48:52,139
than, that should be.

746
00:48:52,139 --> 00:48:54,139
I can print it.

747
00:48:56,139 --> 00:48:58,139
Yeah.

748
00:48:58,139 --> 00:48:59,139
I like the idea.

749
00:48:59,139 --> 00:49:01,139
Yeah. You can try to do a Boolean flag.

750
00:49:01,139 --> 00:49:03,139
Was that your suggestion as well?

751
00:49:03,139 --> 00:49:04,139
Yeah.

752
00:49:04,139 --> 00:49:07,139
Okay. Let's try to do the Boolean flag way.

753
00:49:07,139 --> 00:49:09,139
Let's delete the breaks.

754
00:49:09,139 --> 00:49:12,139
Let's go back to what we had before.

755
00:49:12,139 --> 00:49:15,139
So basically our idea is, I think,

756
00:49:15,139 --> 00:49:19,139
what we're trying to get at is we only want to print not found

757
00:49:19,139 --> 00:49:23,139
when we've gone through all the numbers in the range.

758
00:49:23,139 --> 00:49:26,139
So kind of something like this.

759
00:49:26,139 --> 00:49:31,139
I think the not found only once at the end of my loop.

760
00:49:31,139 --> 00:49:32,139
Okay.

761
00:49:32,139 --> 00:49:37,139
But this code doesn't work either because I'm always printing not found.

762
00:49:37,139 --> 00:49:41,139
No matter if I do this extra print inside here, right?

763
00:49:41,139 --> 00:49:44,139
Because this not found at the end here is at the same indentation level

764
00:49:44,139 --> 00:49:45,139
as the for loop.

765
00:49:45,139 --> 00:49:50,139
So the suggestion from a couple of you is to actually set a flag, right?

766
00:49:50,139 --> 00:49:55,139
So we can set a found flag to be originally, let's say, false.

767
00:49:55,139 --> 00:49:56,139
Right?

768
00:49:56,139 --> 00:50:01,139
So before I even start my loop, let me just assume it's false.

769
00:50:01,139 --> 00:50:08,139
And I'm going to use this flag to trigger,

770
00:50:08,139 --> 00:50:16,139
or I'm going to, I guess I'm going to change this flag whenever I found the number.

771
00:50:16,139 --> 00:50:17,139
Right?

772
00:50:17,139 --> 00:50:24,139
So found is originally false and the place in my code where I know I found the number,

773
00:50:24,139 --> 00:50:27,139
is here, right?

774
00:50:27,139 --> 00:50:32,139
When I is equivalent to my secret, and then I can set my found flag to be true.

775
00:50:32,139 --> 00:50:36,139
I only call it a flag because it flags that an event happened or not,

776
00:50:36,139 --> 00:50:38,139
so it's kind of a bully an event.

777
00:50:38,139 --> 00:50:40,139
But it's really just a variable, right?

778
00:50:40,139 --> 00:50:42,139
Nothing special about the word flag.

779
00:50:42,139 --> 00:50:47,139
It's just a variable.

780
00:50:47,139 --> 00:50:48,139
Right?

781
00:50:48,139 --> 00:50:49,139
Okay.

782
00:50:49,139 --> 00:50:53,139
So now, I think the suggestion was, now that we've set our flag to true or false,

783
00:50:53,139 --> 00:50:58,139
depending on what happened in the code, we can say if found,

784
00:50:58,139 --> 00:51:03,139
or I guess in this particular case, if not found, right?

785
00:51:03,139 --> 00:51:10,139
The inverse of my Boolean, print not found.

786
00:51:10,139 --> 00:51:11,139
Right?

787
00:51:11,139 --> 00:51:15,139
There's no else because the else was already taken care of when we had the secret,

788
00:51:15,139 --> 00:51:18,139
when we found the secret within the code.

789
00:51:18,139 --> 00:51:21,139
So now, we print found when it's four,

790
00:51:21,139 --> 00:51:25,139
and if the number is obviously outside the range like a hundred,

791
00:51:25,139 --> 00:51:31,139
we print not found.

792
00:51:31,139 --> 00:51:36,139
We can make a small change to it, I guess, so we don't have to print found down in there.

793
00:51:36,139 --> 00:51:40,139
For maybe consistency or making things even,

794
00:51:40,139 --> 00:51:46,139
we can just say else, print found, or something like that.

795
00:51:46,139 --> 00:51:48,139
And I think that should work as well.

796
00:51:48,139 --> 00:51:53,139
So a hundred is not found, and four is found.

797
00:51:53,139 --> 00:51:55,139
Right? So now, we're doing things kind of consistently.

798
00:51:55,139 --> 00:51:58,139
We're printing out whether we found it or not down here.

799
00:51:58,139 --> 00:52:06,139
And inside the for loop, we're just dealing with the logic of the binding or not finding it.

800
00:52:06,139 --> 00:52:08,139
Any questions about this code?

801
00:52:08,139 --> 00:52:09,139
Does it seem all right?

802
00:52:09,139 --> 00:52:11,139
Does it make sense?

803
00:52:11,139 --> 00:52:17,139
So, I'm showcasing these Boolean flags just because they're very useful for signalling

804
00:52:17,139 --> 00:52:20,139
that things happened in your code.

805
00:52:20,139 --> 00:52:25,139
Right? So when you find yourself asking, how do I know that this thing happened,

806
00:52:25,139 --> 00:52:28,139
or something like Boolean flag is the answer.

807
00:52:28,139 --> 00:52:33,139
Right? Just set it to true or false, 0 or 1, A or B, whatever you want,

808
00:52:33,139 --> 00:52:46,139
and then check the value of that variable later on in the code to see if the event happened or not.

809
00:52:46,139 --> 00:52:49,139
So these are the two codes that we had just written, kind of side by side,

810
00:52:49,139 --> 00:52:52,139
just to show you exactly what the difference is.

811
00:52:52,139 --> 00:52:57,139
So here is the code where if we don't find the number, we don't print anything.

812
00:52:57,139 --> 00:53:00,139
Right? So it's just the for loop with an if and we say we found it.

813
00:53:00,139 --> 00:53:04,139
And the one on the right is the code where we did find it.

814
00:53:04,139 --> 00:53:08,139
Where if we didn't find it, we printed that we didn't find it.

815
00:53:08,139 --> 00:53:13,139
So the only things that are added in addition to the code on the left is the stuff that's bolded.

816
00:53:13,139 --> 00:53:16,139
Right? So I just have this flag that I initially said to false.

817
00:53:16,139 --> 00:53:21,139
I said it to true when this event happened, that is I found the number,

818
00:53:21,139 --> 00:53:27,139
and then I do the check at the end to print or not print out.

819
00:53:27,139 --> 00:53:28,139
Yeah?

820
00:53:28,139 --> 00:53:36,139
I don't use else in the if or down here.

821
00:53:36,139 --> 00:53:37,139
Any if.

822
00:53:37,139 --> 00:53:47,139
So we don't use the else inside the if, iqq secret because that if or else will be done every time through the loop.

823
00:53:47,139 --> 00:53:52,139
Right? And I only print that we didn't find it one time at the end.

824
00:53:52,139 --> 00:54:01,139
Right? If I have an else inside the for loop, it's basically asking if i is the secret number.

825
00:54:01,139 --> 00:54:04,139
So 0 is not the secret number, we would hit the else.

826
00:54:04,139 --> 00:54:07,139
2 is not the secret number, we would hit the else.

827
00:54:07,139 --> 00:54:14,139
And only when I get to 7 in this case, it is the secret number, so I hit the if, and so on.

828
00:54:14,139 --> 00:54:25,139
So it's not something I want to do every time through the loop, but I put it at the end because I only need to do it once.

829
00:54:25,139 --> 00:54:30,139
Is that something?

830
00:54:30,139 --> 00:54:37,139
Okay. So Boolean variables are a variable that is in one of two states.

831
00:54:37,139 --> 00:54:47,139
Right? I used here true or false, but as I mentioned, you can use 0 or 1 a or b as long as you as the programmer remember what values you're expecting this, this variable to take on.

832
00:54:47,139 --> 00:54:51,139
Boolean variables can be used as signals that something happened in the code.

833
00:54:51,139 --> 00:54:54,139
Right? So this could be useful in a quiz situation.

834
00:54:54,139 --> 00:54:57,139
We call these Boolean flags, but again, it's just a name.

835
00:54:57,139 --> 00:55:04,139
It's just a variable that changes state depending on if some event happened in the code.

836
00:55:04,139 --> 00:55:07,139
Okay. So I'm coming back to the idea of while in four loops.

837
00:55:07,139 --> 00:55:14,139
And we've already seen that there are many situations where four loops are a lot more, a lot easier to use than while loops.

838
00:55:14,139 --> 00:55:18,139
Okay. So when we have four loops that are right through a sequence of values.

839
00:55:18,139 --> 00:55:23,139
So the guess and check algorithm actually lends itself a little bit better to four loops than while loops.

840
00:55:23,139 --> 00:55:30,139
So here's an example of us trying to find the cube root in this particular case, not the square root of a number.

841
00:55:30,139 --> 00:55:38,139
And again, we're only asking if this number x is a, or this case, cube is a perfect cube.

842
00:55:38,139 --> 00:55:45,139
Okay. So the way the code works with a four loop is we're going to iterate through all the possible values.

843
00:55:45,139 --> 00:55:50,139
So we have four our guess in range, some number.

844
00:55:50,139 --> 00:55:54,139
So we're going to check all the values zero all the way up through cube plus one.

845
00:55:54,139 --> 00:56:01,139
The reason why we did the plus one is because if the user gives us number one, we want to check one itself.

846
00:56:01,139 --> 00:56:09,139
Right? If we didn't have cube plus one, if we just had cube, we would mistakenly stop at zero, even though one is a perfect cube.

847
00:56:09,139 --> 00:56:18,139
Okay. And then inside the four loop, we just have if guess cubed is equal to cube, then we have found our perfect cube.

848
00:56:18,139 --> 00:56:28,139
Okay. If we have negative numbers with cubes, it's just adding a little bit of extra code.

849
00:56:28,139 --> 00:56:39,139
But it's not as weird as with the square root, right? Because the cube root of a negative number is just the cube root of that positive version of that number with a negative sign in front of it.

850
00:56:39,139 --> 00:56:51,139
So all we're doing with a negative number as the input is saying I'm going to iterate through all these values and through zero all the way up to the positive version of whatever the user gave me.

851
00:56:52,139 --> 00:56:57,139
So this is taking the absolute value of the number the user gave me and adding one to it.

852
00:56:57,139 --> 00:57:02,139
So just kind of like the code on the previous slide, except we're doing the absolute value of it.

853
00:57:02,139 --> 00:57:11,139
We're checking if the guess cubed is equivalent to the absolute value of cube, exactly the same as on the previous slide, except taking the absolute value of the cube.

854
00:57:11,139 --> 00:57:16,139
And then we have this extra little bit that checks if the user actually gave us a negative number.

855
00:57:16,139 --> 00:57:21,139
So do we need to put a negative number in front of our guess?

856
00:57:21,139 --> 00:57:36,139
So if the user actually did give us a negative number, let's just take do minus whatever value we just found for the cube and then we can print the cube root of this perfect cube.

857
00:57:36,139 --> 00:57:47,139
So again, same code as before, the only difference is absolute value of cube and adding this check to deal with negative numbers.

858
00:57:47,139 --> 00:58:03,139
Okay, so we can actually make this code a little bit faster because for example, when we're checking the you know checking the cube root of 27, the numbers we're checking are 0, 1, 2, 3, 4, 5, 6, in our for loop all the way up to 27.

859
00:58:03,139 --> 00:58:10,139
But we can recognize the fact that when we reach for 27, let's say 26.

860
00:58:10,139 --> 00:58:20,139
We can recognize the fact that when we hit 3, the guess cubed is actually 27.

861
00:58:20,139 --> 00:58:33,139
And so in our for loop, it doesn't make sense to keep checking for 5, 6, 7 to see if those numbers are then going to match or be our cube root for potentially perfect cube.

862
00:58:33,139 --> 00:58:35,139
And so that's what this code is doing.

863
00:58:35,139 --> 00:58:39,139
It's going to have a little if statement in here.

864
00:58:39,139 --> 00:58:41,139
So again, this is the same as before.

865
00:58:41,139 --> 00:58:49,139
But we're going to have a little if statement that says if the guess cubed is greater than or equal to not just equal to but greater than or equal to.

866
00:58:49,139 --> 00:58:52,139
Let's break out of the loop.

867
00:58:52,139 --> 00:58:54,139
Okay.

868
00:58:54,139 --> 00:59:03,139
And so when this condition is false or sorry when this condition is true, guess cubed is greater than or equal to we have exited the loop.

869
00:59:03,139 --> 00:59:09,139
But now just like with the square root code with the while loop, we have to see why we exited the loop.

870
00:59:09,139 --> 00:59:12,139
Why did we break out of this loop prematurely?

871
00:59:12,139 --> 00:59:13,139
Okay.

872
00:59:13,139 --> 00:59:20,139
One is we exited because the guess cubed was equal to the cube or the guess cubed was greater than the cube.

873
00:59:20,139 --> 00:59:32,139
And so then we have a little if else a conditional here that says if we exited because it's not equal greater than then it's not a perfect cube.

874
00:59:32,139 --> 00:59:39,139
And otherwise we exited because it was equal to which is the same code we had on the previous slide.

875
00:59:39,139 --> 00:59:49,139
Check whether the user gave us a positive or negative value, put the negative sign in front of our guess and then print the perfect cube root.

876
00:59:49,139 --> 00:59:59,139
So all variations of the same sort of starter code were just adding little bits of functionality and making the code slightly more efficient here and there.

877
00:59:59,139 --> 01:00:07,139
So I have another example and this example is probably the point in this class where you're like, aha, this is what computational thinking means.

878
01:00:07,139 --> 01:00:15,139
So remember these word problems from childhood, right? You see a math problem, you have basically a system of equations.

879
01:00:15,139 --> 01:00:19,139
Algebraically you could probably solve it within a minute or so.

880
01:00:19,139 --> 01:00:24,139
We can actually apply computation to solve problems just like these.

881
01:00:25,139 --> 01:00:37,139
So we don't need to do it algebraically. We can just tell the computer, here's a bunch of values I want you to try, try them to see if they match these systems of equations and then print out the answer.

882
01:00:37,139 --> 01:00:44,139
So here's an example I've got. Alyssa Ben and Cindy selling tickets to a fundraiser, Ben sells two fewer than Alyssa, Cindy sells twice as many.

883
01:00:44,139 --> 01:00:48,139
Ten total tickets were sold. How many did Alyssa sell?

884
01:00:48,139 --> 01:00:52,139
Here's some code that could solve this problem for us.

885
01:00:52,139 --> 01:00:59,139
I'm basically figuring out all the possible combinations for tickets that Alyssa and Ben and Cindy could sell, right?

886
01:00:59,139 --> 01:01:09,139
So I've got three loops each nested, right? So Alyssa could have a could sell zero or one ticket or two tickets and so on, but for every value of Alyssa.

887
01:01:10,139 --> 01:01:18,139
Alyssa can have can sell zero one or two tickets for every one of those, Ben can sell zero one or two tickets, right?

888
01:01:18,139 --> 01:01:24,139
So Alyssa can sell zero, Ben can sell zero, Cindy can sell zero, Alyssa can sell zero, Ben can sell one, Cindy can sell zero.

889
01:01:24,139 --> 01:01:29,139
So we're basically having these three four loops that make all the possible combinations of tickets.

890
01:01:29,139 --> 01:01:33,139
So here I have Alyssa Ben and Cindy trying to sell tickets to a fundraiser.

891
01:01:34,139 --> 01:01:38,139
And then I have my system of equations here. So in total they sell ten tickets.

892
01:01:38,139 --> 01:01:42,139
So here total two less than twice are all Boolean variables.

893
01:01:42,139 --> 01:01:47,139
So A plus B plus C is equivalent to ten is the first condition I need to hold.

894
01:01:47,139 --> 01:01:55,139
B is equal to A minus two is the second condition I need to hold and C is equivalent to two times A is the last condition I need to hold.

895
01:01:55,139 --> 01:01:58,139
Those are the conditions from the previous slides, right?

896
01:01:58,139 --> 01:02:05,139
And so these three Booleans, whenever they hold total is true and two less is true and twice is true.

897
01:02:05,139 --> 01:02:10,139
When all these things, three things hold, I have found the solution to my problem.

898
01:02:10,139 --> 01:02:20,139
So inside my code, this is Alyssa Ben and Cindy trying to sell tickets and the code automatically tells me they sold this many each.

899
01:02:20,139 --> 01:02:28,139
And what's cool about this code is we can then change something about it and then we can run it again and immediately it tells us what the new solution is.

900
01:02:28,139 --> 01:02:33,139
We don't have to do it algebraically and solve it all over again.

901
01:02:33,139 --> 01:02:38,139
The problem with this code and the way I wrote it specifically is it's really slow for big numbers.

902
01:02:38,139 --> 01:02:44,139
If I change it to a thousand tickets being sold by three people, right, and then a couple other changes here.

903
01:02:44,139 --> 01:02:53,139
Just to share fact that I've got Alyssa iterating through zero to a thousand and Ben iterating through zero thousand and Cindy iterating through zero to a thousand takes really long time.

904
01:02:53,139 --> 01:03:02,139
And so that particular code, I'm not even going to run it, will take a really long time if I change the values to be a thousand twenty and twice.

905
01:03:02,139 --> 01:03:08,139
But instead we can use kind of a mix of algebra and computation to solve the problem.

906
01:03:08,139 --> 01:03:18,139
We recognize we actually only need a loop through one loop, right? I only care about maybe checking Alyssa's number of tickets being zero through potentially a thousand tickets sold.

907
01:03:18,139 --> 01:03:26,139
And then I can use my other two equations, right, Ben and Cindy, how many did they sell with respect to Alyssa?

908
01:03:26,139 --> 01:03:35,139
And then I've got my two other equations here, which will tell me how many buttons Cindy sold with respect to Alyssa's loop.

909
01:03:35,139 --> 01:03:43,139
And then my last equation here is that Ben and Cindy and Alyssa all together had to sell a thousand.

910
01:03:43,139 --> 01:03:52,139
And so with this particular code, I'm able to find the answer to the question, which is how many tickets they sold.

911
01:03:52,139 --> 01:04:01,139
And again, this is really awesome because now I can make small changes to the numbers and solve the problem basically immediately like that.

912
01:04:01,139 --> 01:04:08,139
I don't need to go back and solve it algebraically as I would if I were to do math.

913
01:04:08,139 --> 01:04:12,139
Okay. So we can apply computation to many different problems.

914
01:04:12,139 --> 01:04:20,139
I hope that this is a really good showcase, this word problem of what we mean by computational thinking and the kinds of things we want you to come away from.

915
01:04:20,139 --> 01:04:23,139
Come away with in this class.

916
01:04:23,139 --> 01:04:28,139
The last thing I wanted to talk about and I'll just do a quick intuition is binary numbers.

917
01:04:28,139 --> 01:04:34,139
And this is actually a precursor to the next algorithm we're going to see in the next lecture an approximation algorithm.

918
01:04:34,139 --> 01:04:38,139
It's going to be an improvement on the guess and check algorithm.

919
01:04:38,139 --> 01:04:45,139
So so far we've seen numbers in Python. They can be integers, which are whole numbers and floats, which are real numbers.

920
01:04:45,139 --> 01:04:50,139
But in programming, some interesting things happen when we deal with floats.

921
01:04:50,139 --> 01:04:58,139
Okay. And this is going to be our motivation for talking about binary numbers and then fractions and then floats in this lecture and then the next one.

922
01:04:58,139 --> 01:05:02,139
So here's an example of some code.

923
01:05:02,139 --> 01:05:07,139
So I've got, is exactly what's in the slides. I've got an integer x.

924
01:05:07,139 --> 01:05:13,139
And all I'm doing in this code is I have a loop through range 10. So that means it's going to loop through 10 times.

925
01:05:13,139 --> 01:05:19,139
And I'm adding 0.1, 10 times. So 0.1 plus 0.1 plus 0.1, 10 times.

926
01:05:19,139 --> 01:05:25,139
And I'm going to print whether x, the sum 0.1 plus 0.1 plus 0.1 is equal to 1.

927
01:05:25,139 --> 01:05:35,139
And just to show you, I'm not pulling your leg, I'm going to run it and print whether x, so 0.1 plus 0.1 plus 0.1, 10 times is equivalent to 1.

928
01:05:35,139 --> 01:05:38,139
And this code prints false.

929
01:05:38,139 --> 01:05:42,139
Not intuitive, right? If I'm adding 0.1, 10 times, I should be getting 1.

930
01:05:42,139 --> 01:05:54,139
But I'm not in programming. And just to show you the actual answer we get, let's print what the value of x is and then ask whether that's the same as just multiplying 0.1 by 10.

931
01:05:54,139 --> 01:06:02,139
So doing the loop where we add this number 10 times gives me actually 0.9999999.

932
01:06:02,139 --> 01:06:08,139
Whereas just multiplying 0.1 by 10 gives me 1 as I expect.

933
01:06:08,139 --> 01:06:15,139
And this is the motivation for, or I guess the precursor to our next algorithm, the approximation algorithm.

934
01:06:15,139 --> 01:06:24,139
So we have this thing called a floating point error. And why does it happen? And since it happens, we can't do equivalency, right?

935
01:06:24,139 --> 01:06:37,139
We can't use the equal sign between floats. Because we get things like this that are going to completely mess up our program when we expect, you know, something as simple as adding 0.1 to itself 10 times.

936
01:06:37,139 --> 01:06:52,139
To be 1 and it's not. Right? And so the big idea here is we have operations on floats. And the way, because of the way floats are actually starting computer memory, these operations introduce a very small error. Super, super small.

937
01:06:52,139 --> 01:07:03,139
Every time you do an operation with a float, but the more you do this operation that has this tiny error, the more this error gets magnified. Right? And so then we see surprising results like that.

938
01:07:03,139 --> 01:07:09,139
And so that comes about with the way that floats are actually stored in the computer.

939
01:07:09,139 --> 01:07:17,139
So what we have in the computer is we work with binary zeros and ones. But humans actually work in base 10, right?

940
01:07:17,139 --> 01:07:29,139
We think from 0 to 9. But the computer works in base 2, either 0 or 1. And the reason it works through 0 and 1 is because of the way that the computer hardware is built. Right?

941
01:07:29,139 --> 01:07:39,139
It's easy for the computer hardware to say that a magnetic spin is up or down. Right? 0 or 1. It's easy for the hardware to say that it has a voltage that's lower high. Right?

942
01:07:39,139 --> 01:07:52,139
If it would be a lot harder for the computer hardware to say, hey, I have a voltage that 0 low. High, let's say 1. Or it's 1 1 1 1 1 1 or 2 1 1 1. There would be too many errors introduced.

943
01:07:52,139 --> 01:08:00,139
And so it's a lot easier for the computer hardware to just be in one of these two states, 0 or 1. Right? So that's where binary comes in.

944
01:08:00,139 --> 01:08:12,139
And so when we're dealing with integers, this is not a problem because we can easily convert numbers that are in base 10 to base 2. That are whole numbers integers.

945
01:08:12,139 --> 01:08:20,139
The problem will come when we do floats. So you don't need to know how to do the conversion. But it will give you an intuition for what's going to happen.

946
01:08:20,140 --> 01:08:30,140
So the number 1507 in base 10, so that's what we have up here is a thousand plus 500 plus 0 times 10 plus 7. Right?

947
01:08:30,140 --> 01:08:43,140
In base 2, we have a similar pattern. We have some whole number multiplied by some power of 2. Here we had the whole number be either number 0 through 9 multiplied by some power of 10.

948
01:08:43,140 --> 01:09:05,140
But in base 2, we're going to have either 0 or 1 multiplied by some power of 2. And if we're trying to convert the number 1507 from base 10 to base 2, I guess humanly speaking, the way we'd think about it is what is the biggest power of 2 that we can have that takes us close to but not over 1507.

949
01:09:05,140 --> 01:09:21,140
And that's 10, 2 to the 10, a thousand 24 because 2 to the 11 is 2000 something and that's already too big. And then you ask yourself, what's the next biggest power of 2? I can add to this number, a thousand 24 that brings me close to but not over 1507.

950
01:09:21,140 --> 01:09:32,140
That's going to be 256. Notice we skipped 2 to the 9 because adding 2 to the 9 takes us over 1507. It's adding 512 to 1024.

951
01:09:33,140 --> 01:09:43,140
And so we repeat this process where we're basically trying to figure out what are the biggest powers of 2 we can add in order that makes up 1,507.

952
01:09:43,140 --> 01:09:53,140
And it turns out it's going to be 2 to the 10 plus 2 to the 8 plus 2 to the 7 plus 2 to the 6 plus 2 to the 5, 2 to the 4, 3 and 2 are all going to be 0's and 2 to the 1 and 2 to the 0.

953
01:09:53,140 --> 01:10:05,140
And the bits, right, 1 times through the 10, 1 times through the 8 is basically what gets represented here, right? These whole number portions that we multiply the powers of 10 by.

954
01:10:06,140 --> 01:10:13,140
And that's how we convert from a decimal number to a binary number. But again, this is kind of a human way of converting.

955
01:10:14,140 --> 01:10:25,140
We can actually do it in a more systematic way, a more imperative way, a recipe way. Some way that a computer can actually use to take a number and convert it to binary.

956
01:10:25,140 --> 01:10:33,140
And you would never have to come up with this way, but given this way of converting the binary, you should be able to code it up.

957
01:10:34,140 --> 01:10:42,140
So the idea here is we're going to take a number and we're going to look at the remainder when we divided by 2.

958
01:10:43,140 --> 01:10:52,140
Right? If it's an odd number, obviously the remainder is 1, if it's an even number, the remainder is 0. And that remainder actually gives us the last bit, the farthest right bit.

959
01:10:53,140 --> 01:11:01,140
And then we can take that number and divide it by 2 fully. And then that gives us the remaining 4 digits. So you see everything else just gets shifted over.

960
01:11:02,140 --> 01:11:08,140
And the way the code looks is just doing successive divisions and figuring out the remainders.

961
01:11:08,140 --> 01:11:21,140
So I'm just going to look at the Python tutor real quick and then we can stop. So if we're trying to convert the number 1507 following this particular recipe, all we do is we look at the remainder when we divide the number by 2.

962
01:11:22,140 --> 01:11:29,140
So this is an odd number, obviously the remainder is going to be 1. So we add a 1 to our binary representation.

963
01:11:30,140 --> 01:11:40,140
And then we're going to keep adding what happens when we divide the remaining numbers by 2. We're going to keep adding the remainder to the front of this string here.

964
01:11:41,140 --> 01:11:53,140
So if we divide the number 1507 by 2, that gives us 753. And now we ask is 753 odd or even? It's odd so we add another 1 to the front of this string, the result string.

965
01:11:54,140 --> 01:12:03,140
Divide 753 by 2, it's 376, this is even. So now we add a 0 to the front of my string. So notice what happens to this string as we go step by step.

966
01:12:05,140 --> 01:12:17,140
376 divided by 2 is 188, what is this even number? So we add a 0 to the front of this string. 188 divided by 2 is 94. Again it's an even number so we add a 0 to the front of this string.

967
01:12:18,140 --> 01:12:31,140
94 divided by 2 is 47, it's odd so we add a 1, 47 divided by 2 is 23, it's odd so we add a 1, 23 divided by 2 is 11, so we add an odd, so we add a 1, 11 divided by 2 is 5, so it's odd so we add a 1.

968
01:12:33,140 --> 01:12:38,140
And then 5 divided by 2 is even, we add a 0 and then 1 is our last number so we add a 1.

969
01:12:38,140 --> 01:12:52,140
And notice this is the exact same number we had when we did it in this human thoughtful way where we were trying to figure out the highest powers of 2 we can take to go up to but not over the number 1,507.

970
01:12:53,140 --> 01:13:05,140
But we did this using just this very iterative, very nice loopy code and if we wanted to do a negative number we would just add these 2 boxes here. It just basically means we add a negative sign in front of it.

971
01:13:08,140 --> 01:13:09,140
Yeah.

