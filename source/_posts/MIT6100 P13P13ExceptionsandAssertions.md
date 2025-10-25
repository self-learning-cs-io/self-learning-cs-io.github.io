---
title: MIT6100 P13P13ExceptionsandAssertions
---

1
00:00:00,000 --> 00:00:12,800
All right.

2
00:00:12,800 --> 00:00:13,800
Welcome everyone.

3
00:00:13,800 --> 00:00:20,719
So in case you missed last lecture, I've got some extra debugging ducks that were left over

4
00:00:20,719 --> 00:00:24,920
from last lecture's debugging lecture.

5
00:00:24,920 --> 00:00:25,920
Please take them home.

6
00:00:25,920 --> 00:00:29,480
I don't want to have to take them back to my office and then bring them back.

7
00:00:29,480 --> 00:00:30,480
So many times.

8
00:00:30,480 --> 00:00:32,920
So please give them a good home.

9
00:00:32,920 --> 00:00:41,439
If you find them useful in your debugging strategy throughout your programming careers, I suggest

10
00:00:41,439 --> 00:00:44,880
you upgrade to carrying a debugging duck with you everywhere.

11
00:00:44,880 --> 00:00:48,320
As I have on my phone, I use it in my day-to-day life.

12
00:00:48,320 --> 00:00:53,159
So that's just the next step beyond an actual duck.

13
00:00:53,159 --> 00:00:54,159
All right.

14
00:00:54,159 --> 00:00:56,399
So let's start it on today's lecture.

15
00:00:56,399 --> 00:01:02,919
We will be going over the idea of exceptions and assertions.

16
00:01:02,919 --> 00:01:09,479
And these are basically those scary red errors that we get when our program crashes.

17
00:01:09,479 --> 00:01:10,479
Okay.

18
00:01:10,479 --> 00:01:15,400
Today's lecture will hopefully shed some light on exactly what these exceptions are and

19
00:01:15,400 --> 00:01:18,640
how we can actually use them to our advantage in our code.

20
00:01:18,640 --> 00:01:23,319
So let's start by talking about exceptions.

21
00:01:23,319 --> 00:01:29,759
So when you run your code, usually it runs without error, produces the right output all

22
00:01:29,759 --> 00:01:31,639
the time, like mine does.

23
00:01:31,639 --> 00:01:38,199
But sometimes it so happens that your code hits an unexpected condition.

24
00:01:38,199 --> 00:01:43,839
And when that unexpected condition is run, you get an exception to something that was

25
00:01:43,839 --> 00:01:44,839
expected.

26
00:01:44,839 --> 00:01:49,119
So we've already seen a bunch of different exception examples.

27
00:01:49,119 --> 00:01:51,639
So we talked, we even talked about a couple of these last lectures.

28
00:01:51,640 --> 00:01:55,680
So we've got index errors where you index too far into some list.

29
00:01:55,680 --> 00:02:00,599
Type errors where you're doing funky things with types that Python doesn't like.

30
00:02:00,599 --> 00:02:03,920
Syntax errors are also exceptions, name errors are also exceptions.

31
00:02:03,920 --> 00:02:09,199
So a bunch of these errors that we've encountered are types of exceptions.

32
00:02:09,199 --> 00:02:16,759
So it turns out so far in our programming experience that whenever we get an exception, the

33
00:02:16,759 --> 00:02:18,599
program immediately crashes.

34
00:02:18,599 --> 00:02:22,079
And really we don't have any way to handle these exceptions.

35
00:02:22,079 --> 00:02:26,719
We just accept the fact that it crashed and we go back to the debugging board.

36
00:02:26,719 --> 00:02:32,280
But it turns out that in Python, we can actually write code to handle these exceptions.

37
00:02:32,280 --> 00:02:38,959
So if your code does happen to throw an exception, so an error occurs or something unexpected happens,

38
00:02:38,959 --> 00:02:43,079
you can write code that deals with that situation.

39
00:02:43,080 --> 00:02:48,440
And either decides to ignore the fact that an error occurred, set some default values,

40
00:02:48,440 --> 00:02:53,320
or just raise your own exception and move on.

41
00:02:53,320 --> 00:02:58,560
So we're going to see a bunch of examples of these cases.

42
00:02:58,560 --> 00:03:04,280
So the way that we deal with exceptions is using some code blocks.

43
00:03:04,280 --> 00:03:08,480
The way that we handle exceptions is using these try and accept blocks.

44
00:03:08,479 --> 00:03:17,679
So the way that we write an exception handler is to put some potentially problematic code

45
00:03:17,679 --> 00:03:19,759
inside this try block.

46
00:03:19,759 --> 00:03:21,839
So the try is a keyword in Python.

47
00:03:21,839 --> 00:03:25,359
So obviously you can't name a variable try or anything like that.

48
00:03:25,359 --> 00:03:27,919
If you type it in your code, you'll see it turns blue.

49
00:03:27,919 --> 00:03:32,599
And try tells Python that you're starting a code block that contains some lines of code

50
00:03:32,599 --> 00:03:34,919
you'd like Python to execute.

51
00:03:34,919 --> 00:03:38,000
So just normal code.

52
00:03:38,000 --> 00:03:42,919
If Python is able to successfully execute these lines of code without an exception being raised,

53
00:03:42,919 --> 00:03:46,800
so without the program crashing, then nothing happens.

54
00:03:46,800 --> 00:03:50,039
Nothing is run inside this except block.

55
00:03:50,039 --> 00:03:53,159
And the code just continues as normal.

56
00:03:53,159 --> 00:03:59,039
But if it so happens that in that code that you ran, something strange has happened, and

57
00:03:59,039 --> 00:04:06,319
the code would have crashed, the code actually doesn't crash because we can catch the exception

58
00:04:06,319 --> 00:04:10,159
that gets raised inside this except block.

59
00:04:10,159 --> 00:04:16,920
So if we have an associated except block over here to a try block from here, Python is going

60
00:04:16,920 --> 00:04:19,560
to try to run this potentially problematic code.

61
00:04:19,560 --> 00:04:25,039
And if an exception is raised, it will stop running any further lines inside the try block,

62
00:04:25,039 --> 00:04:28,800
and immediately hop to the lines in the except block.

63
00:04:28,800 --> 00:04:33,319
And the lines in the except block will then get executed.

64
00:04:33,319 --> 00:04:38,839
So to just kind of draw a parallel to if I were to kind of say this in terms of if and

65
00:04:38,839 --> 00:04:45,879
else, the way that I would describe the try and accept blocks is I would say if, and

66
00:04:45,879 --> 00:04:50,560
then I would put all the potentially problematic lines of code that I'd like to write inside

67
00:04:50,560 --> 00:04:52,600
this condition for the if.

68
00:04:52,600 --> 00:04:58,159
And if all of these lines of code manage to successfully run, then nothing else happens.

69
00:04:58,159 --> 00:05:02,639
The inside of this if is essentially just a pass, and we don't execute the else, and

70
00:05:02,639 --> 00:05:05,599
then we just carry on with the rest of our lives.

71
00:05:05,599 --> 00:05:10,079
But if there is some line of code here that we're trying to run that crashes or that causes

72
00:05:10,079 --> 00:05:15,240
the program to crash, Python will say, no, I'm not going to crash just yet.

73
00:05:15,240 --> 00:05:17,479
Let me see what the code would like me to do.

74
00:05:17,479 --> 00:05:21,319
And so we'd hop inside this else, and then we'd do something to handle the problem.

75
00:05:21,319 --> 00:05:24,439
And the something we do is inside this except block.

76
00:05:24,439 --> 00:05:26,680
So again, this is not code we'd ever write.

77
00:05:26,680 --> 00:05:31,439
It's just kind of a way to draw parallel with what we know so far.

78
00:05:31,439 --> 00:05:38,160
The code that we would write is this try a bunch of code, except do something you'd like

79
00:05:38,160 --> 00:05:43,319
do some lines of code if an error should come up in the in the try block.

80
00:05:43,319 --> 00:05:47,759
So let's look at some examples with code that you should be able to write at this point

81
00:05:47,759 --> 00:05:48,759
in the course.

82
00:05:48,759 --> 00:05:51,720
So we have some code on the left here.

83
00:05:51,720 --> 00:05:58,519
It's a function called some digits, and we're writing this code without any exceptions.

84
00:05:58,519 --> 00:06:01,879
We're just writing it as if you were given this code on a quiz.

85
00:06:01,879 --> 00:06:05,039
What would be one solution?

86
00:06:05,039 --> 00:06:11,399
So this sum digits takes in a string S, and we say it's non-empty containing some digits,

87
00:06:11,399 --> 00:06:14,240
and I want to return the sum of all the characters that are digits.

88
00:06:14,240 --> 00:06:20,959
So I don't actually say anything about whether this string S contains non-digit characters.

89
00:06:20,959 --> 00:06:23,799
But let's write it in a robust way anyway.

90
00:06:23,800 --> 00:06:29,360
So we'd have a loop that goes through every character in that string S.

91
00:06:29,360 --> 00:06:33,879
And I'm using this in keyword here, this nice little trick here that says if that character,

92
00:06:33,879 --> 00:06:41,759
so whatever character it may be, is inside this string of digits.

93
00:06:41,759 --> 00:06:47,000
Then I know it's a number, sorry, I know it's a digit, and I'm going to cast that digits

94
00:06:47,000 --> 00:06:51,879
0 through 9, whatever it may be to an integer, add it to my running total, and then that

95
00:06:51,879 --> 00:06:56,879
loop does its thing until it's done, and then I return the total.

96
00:06:56,879 --> 00:07:03,560
So in terms of running the code, this is just as I have it on the slide.

97
00:07:03,560 --> 00:07:10,159
So here, if the user gives me the string 1, 2, 3, I'm going to sum 1 plus 2 plus 3, 6,

98
00:07:10,159 --> 00:07:11,959
perfect.

99
00:07:11,959 --> 00:07:17,360
And if the user gives me 1, 2, 3, and then some random characters that I know I can't add,

100
00:07:17,360 --> 00:07:23,720
Python will still be able to evaluate it because that if statement will not be run, for

101
00:07:23,720 --> 00:07:28,560
A, B, and C, we don't go inside the if, so there's no need to cast anything.

102
00:07:28,560 --> 00:07:30,800
So the code still works.

103
00:07:30,800 --> 00:07:36,120
If I didn't have this if here, if I decided to just cast to an int every single thing that

104
00:07:36,120 --> 00:07:42,600
comes my way, the first line of code will still work, but the second line of code will throw

105
00:07:42,600 --> 00:07:43,879
an exception.

106
00:07:43,879 --> 00:07:50,759
You see, I have on right hand side my scary red text that says value error in valid literal

107
00:07:50,759 --> 00:07:53,879
for int with base 10a.

108
00:07:53,879 --> 00:08:00,680
Kind of hard to parse, but after you've seen a bunch of these, you'll figure out that

109
00:08:00,680 --> 00:08:05,839
there's something going on with my types, and then I'm trying to cast, you know, I'm

110
00:08:05,839 --> 00:08:09,759
trying to cast to an integer the string A.

111
00:08:09,759 --> 00:08:12,639
And obviously it doesn't know how to do that.

112
00:08:12,639 --> 00:08:18,399
So that's the potentially problematic line, right, casting to an integer.

113
00:08:18,399 --> 00:08:23,959
So let's try to write the same code, except that now we'll do it with exception handling.

114
00:08:23,959 --> 00:08:27,360
So a bunch of it is going to be the same.

115
00:08:27,360 --> 00:08:33,679
What we're going to change is the potentially problematic code is these two lines here,

116
00:08:33,679 --> 00:08:34,679
right?

117
00:08:34,679 --> 00:08:37,759
I don't need the if anymore.

118
00:08:37,759 --> 00:08:43,480
Instead, I'm going to just assume I can cast every single character to an integer, and

119
00:08:43,480 --> 00:08:44,679
I'm going to try to do that.

120
00:08:44,679 --> 00:08:50,919
So I'm going to try to cast every single character to an integer and then add it to my running

121
00:08:50,919 --> 00:08:55,319
total.

122
00:08:55,319 --> 00:08:59,960
Most of the time that's going to work if the input is a digit, but sometimes the users

123
00:08:59,960 --> 00:09:03,319
give me something that's non-digit.

124
00:09:03,319 --> 00:09:07,360
In that case, you saw what happens, the code throws a value error.

125
00:09:07,360 --> 00:09:12,240
So if we didn't have the accept block, nor the try block, the code crashes immediately,

126
00:09:12,240 --> 00:09:14,320
no answer is even given.

127
00:09:14,320 --> 00:09:20,919
But with the accept block, Python will say, oh, in this particular for loop run, I had

128
00:09:20,919 --> 00:09:23,600
an exception raised.

129
00:09:23,600 --> 00:09:26,240
So I'm going to execute whatever's inside the accept block.

130
00:09:26,240 --> 00:09:31,320
And the accept block says print, can't convert, and then the character that it couldn't convert

131
00:09:31,320 --> 00:09:33,759
that time through the loop.

132
00:09:33,759 --> 00:09:42,200
And then that loop iteration is done and it goes on to the next character in the sequence.

133
00:09:42,200 --> 00:09:45,439
So let's run the code.

134
00:09:45,439 --> 00:09:48,439
And this is the sum digits with the accept.

135
00:09:48,439 --> 00:09:53,200
So here I've got the user giving me perfectly fine input.

136
00:09:53,200 --> 00:09:54,439
No exceptions were raised.

137
00:09:54,439 --> 00:09:57,000
The code worked well.

138
00:09:57,000 --> 00:10:01,559
If the user gives me some characters within there, the loops go through.

139
00:10:01,559 --> 00:10:04,159
It adds 1 plus 2 plus 3.

140
00:10:04,159 --> 00:10:10,199
But then when it tries to cast to an integer, the a over here, as the iteration goes to

141
00:10:10,199 --> 00:10:16,359
a, it's going to say this raises a value error, as we just saw.

142
00:10:16,359 --> 00:10:18,759
And I'm going to execute whatever's inside the accept block.

143
00:10:18,759 --> 00:10:20,799
So prints couldn't convert character.

144
00:10:20,799 --> 00:10:21,799
There it is.

145
00:10:21,799 --> 00:10:24,479
And then I actually gave the user the character it couldn't convert.

146
00:10:24,479 --> 00:10:28,799
It goes on to the next iteration, the next character in the sequence, the b.

147
00:10:28,799 --> 00:10:30,479
Again, tries to convert b.

148
00:10:30,479 --> 00:10:32,439
It can't cast a to an integer.

149
00:10:32,439 --> 00:10:34,479
So we print couldn't convert b.

150
00:10:34,479 --> 00:10:37,959
And then lastly, the same with the c.

151
00:10:37,959 --> 00:10:38,959
Does that make sense?

152
00:10:38,959 --> 00:10:40,559
Is that all right so far?

153
00:10:40,559 --> 00:10:43,599
So kind of like a little if else situation going on here.

154
00:10:47,439 --> 00:10:52,279
Nice places to put try accept blocks are when you're dealing with user input.

155
00:10:52,279 --> 00:10:58,559
Because the users, when they give you some inputs, for using the actual input command,

156
00:10:58,559 --> 00:11:00,039
they're very unpredictable.

157
00:11:00,039 --> 00:11:04,319
We don't know what kinds of things they'll give you, even though you give them clear instructions

158
00:11:04,319 --> 00:11:08,439
to tell me one number or tell me another number.

159
00:11:08,439 --> 00:11:18,879
So in this, in these three lines of code down here, I've got the user giving me two numbers.

160
00:11:18,879 --> 00:11:22,719
And then I print the first one divided by the second one.

161
00:11:22,719 --> 00:11:24,439
So I'm a nice user.

162
00:11:24,439 --> 00:11:25,439
I do what I'm told.

163
00:11:25,439 --> 00:11:28,039
So I'm going to do five divided by eight.

164
00:11:28,039 --> 00:11:29,039
Perfect.

165
00:11:29,039 --> 00:11:32,399
The code runs well.

166
00:11:32,399 --> 00:11:34,000
Let's see, somebody else runs the code.

167
00:11:34,000 --> 00:11:41,240
And this time they decide to do seven divided by, I don't know, five like that.

168
00:11:41,240 --> 00:11:43,679
Value error.

169
00:11:43,679 --> 00:11:45,279
So that's one thing that could go wrong.

170
00:11:45,279 --> 00:11:49,199
The user tries to be funny.

171
00:11:49,199 --> 00:11:52,799
And then another thing that could go wrong is, let's say, the user gives me a zero for

172
00:11:52,799 --> 00:11:54,919
the second number.

173
00:11:54,919 --> 00:11:56,879
So in this case, I get a zero division error.

174
00:11:57,120 --> 00:12:00,000
You can see Python doesn't know how to divide by zero.

175
00:12:00,000 --> 00:12:05,120
So it raises an exception, this thing's zero division error.

176
00:12:05,120 --> 00:12:10,559
So these are, this is a case where I'm dealing with potentially problematic input.

177
00:12:10,559 --> 00:12:16,120
So I'm going to wrap my potentially problematic lines of code in a try and accept block.

178
00:12:16,120 --> 00:12:18,519
So I've got those three lines that I'm going to try to do.

179
00:12:18,519 --> 00:12:23,120
And if anything goes wrong, I'm going to execute whatever's in the accept block.

180
00:12:23,120 --> 00:12:27,560
And all I do is say print bug and user input.

181
00:12:27,560 --> 00:12:29,560
So let's run that.

182
00:12:29,560 --> 00:12:32,720
That's this one here.

183
00:12:32,720 --> 00:12:37,799
So here again, proper input works well.

184
00:12:37,799 --> 00:12:42,560
If the user gives me a letter, bug and user input.

185
00:12:42,560 --> 00:12:45,960
So much nicer, friendlier way to crash the program, right?

186
00:12:45,960 --> 00:12:49,039
Then value error, whatever it was.

187
00:12:49,039 --> 00:12:53,360
And then again, if the user gives me a zero, bug and user input.

188
00:12:53,360 --> 00:12:59,039
Again, much nicer way to crash the program.

189
00:12:59,039 --> 00:13:06,480
So what we can actually do is give specific, have specific behaviors,

190
00:13:06,480 --> 00:13:09,799
depending on what exceptions are raised, right?

191
00:13:09,799 --> 00:13:14,159
So maybe I don't want a generic text that says bug and user input for

192
00:13:14,159 --> 00:13:16,319
both of those cases, right?

193
00:13:16,320 --> 00:13:20,040
Maybe if the user divides by zero, I want to give them a different message than

194
00:13:20,040 --> 00:13:23,440
if the user gave me a letter, right?

195
00:13:23,440 --> 00:13:27,960
So in that case, what I can do is I can have different accept blocks for

196
00:13:27,960 --> 00:13:31,240
every different error that I know might come up, right?

197
00:13:31,240 --> 00:13:35,320
So as I'm writing this code, I can think ahead, right?

198
00:13:35,320 --> 00:13:38,080
And I can try to catch specific errors.

199
00:13:38,080 --> 00:13:42,240
So here, I can catch the value error.

200
00:13:42,240 --> 00:13:46,200
So I say accept and then I say the name of the error that I'd like to catch.

201
00:13:47,080 --> 00:13:53,640
And this block of code, this accept block of code will be run only if the code in the

202
00:13:53,640 --> 00:13:58,680
tri-block crashes with that specific value error, right?

203
00:13:58,680 --> 00:14:02,680
And then I can also catch my zero division error down here.

204
00:14:02,680 --> 00:14:08,960
And in this particular case, only this accept block is only run when the zero

205
00:14:08,960 --> 00:14:12,600
division error is raised, right?

206
00:14:12,600 --> 00:14:17,480
So here, in the value error, I'm going to print for the user I could not convert to a number.

207
00:14:17,480 --> 00:14:21,279
So a more specific error message so they know what's up.

208
00:14:21,279 --> 00:14:25,600
And in the zero division error, I can also flag that there was an issue.

209
00:14:25,600 --> 00:14:28,320
I can't divide by zero by printing that to the screen.

210
00:14:28,320 --> 00:14:31,600
And then I can say, you know, a divided by b is infinity.

211
00:14:31,600 --> 00:14:37,480
And I can continue the last statement that was supposed to be done in the tri-block,

212
00:14:37,480 --> 00:14:38,399
a plus b.

213
00:14:38,399 --> 00:14:43,199
I can give the answer to a plus b because we can add a zero to a no problem.

214
00:14:44,959 --> 00:14:50,840
The last accept block down here is catching anything else that's not a value error and not

215
00:14:50,840 --> 00:14:52,319
a zero division error.

216
00:14:52,319 --> 00:14:55,799
So I can't think of anything that could go wrong.

217
00:14:55,799 --> 00:15:00,279
So if we happen to go in here, something went very wrong.

218
00:15:00,279 --> 00:15:06,799
I would say the only thing I can think of is if our computer is almost out of memory

219
00:15:06,799 --> 00:15:10,479
and running this little piece of code pushes it over the edge.

220
00:15:10,479 --> 00:15:14,399
Then the Python will probably crash and maybe it'll print that error

221
00:15:14,399 --> 00:15:17,479
before completely shutting down the computer or something.

222
00:15:17,479 --> 00:15:20,199
But that last one should never really run.

223
00:15:21,319 --> 00:15:27,279
So let me show you what happens when we run the code with these specific accept blocks now.

224
00:15:27,279 --> 00:15:30,399
So if the user gives me perfectly nice input,

225
00:15:30,399 --> 00:15:32,159
then the program proceeds as normal.

226
00:15:32,159 --> 00:15:35,879
Every line of code inside the tri-block is executed over here.

227
00:15:35,879 --> 00:15:38,200
None of the accept blocks are executed.

228
00:15:39,200 --> 00:15:41,279
The user gives me a letter.

229
00:15:43,279 --> 00:15:46,879
I end the program gracefully with the message could not convert to a number.

230
00:15:46,879 --> 00:15:48,879
So then they know that I caught them.

231
00:15:49,879 --> 00:15:54,879
And then the last one is if I try to divide by zero, again,

232
00:15:54,879 --> 00:15:57,240
I've got the little message can't divide by zero.

233
00:15:57,240 --> 00:16:01,320
And then I give them their division to be infinity and a plus b is six.

234
00:16:01,320 --> 00:16:04,159
So I do all the lines of code that are caught over here.

235
00:16:06,879 --> 00:16:07,879
Questions so far.

236
00:16:08,879 --> 00:16:09,879
Seems alright so far.

237
00:16:10,879 --> 00:16:11,879
Okay.

238
00:16:11,879 --> 00:16:17,879
So really nice ways for us to deal with with exceptions that get raised in our programs.

239
00:16:17,879 --> 00:16:24,879
Now, the things that I told you that we can associate with a tri-block is an accept block, right?

240
00:16:24,879 --> 00:16:25,879
So we've done that.

241
00:16:25,879 --> 00:16:29,879
But we can actually associate a couple other things with tri-blocks.

242
00:16:29,879 --> 00:16:31,879
And we don't really use them in this class.

243
00:16:31,879 --> 00:16:32,879
But I just thought I'd mention them.

244
00:16:33,879 --> 00:16:44,879
So if you have an else block associated with a tri-block, that means the lines of code inside the else block will execute whenever everything inside the tri-block is executed perfectly.

245
00:16:44,879 --> 00:16:50,879
So if everything goes according to plan, whatever you put inside the else block will also get executed.

246
00:16:50,879 --> 00:16:53,879
And then you can have a finally block as well.

247
00:16:53,879 --> 00:16:59,879
So, you know, just like we have a try and accept, you can also have a finally associated with those.

248
00:16:59,879 --> 00:17:02,879
And the body of the finally will be executed no matter what.

249
00:17:02,879 --> 00:17:05,880
If an exception was raised, you also execute the finally.

250
00:17:05,880 --> 00:17:10,880
If the code work perfectly fine without raising any errors, the finally also gets executed.

251
00:17:10,880 --> 00:17:16,880
So I gave an example here of something that you might put inside the finally block, sort of clean up code.

252
00:17:16,880 --> 00:17:23,880
So if you're, you know, writing code that opens files from the file system, a good idea is to close them before you finish your program.

253
00:17:23,880 --> 00:17:26,880
So that's something that you might want to do inside the finally block.

254
00:17:26,880 --> 00:17:33,880
Just close files before shutting down the, before your program terminates.

255
00:17:33,880 --> 00:17:38,880
Okay, so I've shown you how to deal with exceptions.

256
00:17:38,880 --> 00:17:41,880
But now what do we do inside the accept blocks?

257
00:17:41,880 --> 00:17:46,880
Okay, we've done a couple different things, mostly printing out that something went wrong.

258
00:17:46,880 --> 00:17:49,880
But we can do various other things.

259
00:17:49,880 --> 00:17:52,880
One thing, and I don't recommend doing this, is to just fail silently.

260
00:17:52,880 --> 00:17:58,880
Certainly we could write code that basically, you know, has a, yeah, there's a question.

261
00:17:58,880 --> 00:18:07,880
So this is an else that we'd associate with a try.

262
00:18:07,880 --> 00:18:17,880
So we would do something like else, and then you would, you know, print something here, success or something.

263
00:18:17,880 --> 00:18:27,880
And then if the code executes perfectly without an error, then you will also print success.

264
00:18:27,880 --> 00:18:31,880
So what do we do inside the, inside the accept blocks?

265
00:18:31,880 --> 00:18:38,880
One thing is to fail silently, which means that, well, you could say, you could try your entire piece of code.

266
00:18:38,880 --> 00:18:40,880
And then you could say accept.

267
00:18:40,880 --> 00:18:43,880
And then the only line you have in accept is maybe a line that says pass.

268
00:18:43,880 --> 00:18:52,880
So that means any error that happens, you would catch, but you'd do absolutely nothing and let the program continue with a potentially bad value being passed along.

269
00:18:52,880 --> 00:18:54,880
That's not a good idea.

270
00:18:54,880 --> 00:19:02,880
You could also silently substitute values that you know might be, might be problematic without, you know, flagging things happening.

271
00:19:02,880 --> 00:19:04,880
Also not good ideas.

272
00:19:04,880 --> 00:19:10,880
At the very least, you should flag something to the output that something weird has happened.

273
00:19:10,880 --> 00:19:21,880
Another thing you could do is return some error values so you could have a whole bunch of variables in your code that you could set to some values, like flags kind of thing.

274
00:19:21,880 --> 00:19:26,880
Whenever your code runs into an exception block, right?

275
00:19:26,880 --> 00:19:33,880
But the problem with that is that you have to now check for all these values further on in your code, right?

276
00:19:33,880 --> 00:19:43,880
So now your code becomes overly complicated because you have a whole bunch of extra variables you're constantly checking to see if any errors were flagged or something like that.

277
00:19:43,880 --> 00:19:48,880
One last thing, and this is what I'll show you you can do is to actually still stop the execution.

278
00:19:48,880 --> 00:20:00,880
So much like when we input, when we tried to run the, the some digits program and it crashed with a value error, we could still make our program crash, but it's on our own terms.

279
00:20:00,880 --> 00:20:08,880
So we can raise our own value errors or whatever kind of error you'd like to raise with your own custom message.

280
00:20:08,880 --> 00:20:22,880
So the code still crashes, which is fine because maybe you don't want problematic code to move on, but you're basically having a crash with a custom message and a custom error type of being raised.

281
00:20:22,880 --> 00:20:31,880
So this is a keyword in Python, you raise your own value error, and then the parentheses you put whatever message you'd like to put.

282
00:20:31,880 --> 00:20:34,880
So here's an example of the some digits where we raise our own exception.

283
00:20:34,880 --> 00:20:50,880
So let's say that indeed we only wanted the user to give us digits and we don't actually want this function to keep running and passing along the total if the user ever gave us a string that contains letters.

284
00:20:50,880 --> 00:21:01,880
So in that particular case, I'm going to still put a try block and an accept block around a try block around the problematic code and accept block to catch any errors.

285
00:21:01,880 --> 00:21:12,880
But now instead of printing something and letting the code carry on with the loop, we're going to raise a value error with our own message.

286
00:21:12,880 --> 00:21:15,880
So my message is that the string contained a character.

287
00:21:15,880 --> 00:21:25,880
So if I run this code, and it's actually up here, if I run this code with perfectly fine inputs, there's no issue, right?

288
00:21:25,880 --> 00:21:28,880
We just calculate the total as we want.

289
00:21:28,880 --> 00:21:45,880
But if the user gives us some code that some string that does contain extra characters, which maybe we don't actually want to have happened, you see, I still have a value error, which is the same kind of exception that was raised without the try and accept.

290
00:21:45,880 --> 00:21:57,880
But now the message that I've passed in is string contained a character as opposed to invalid literal for whatever that, you know, that cryptic message was.

291
00:21:57,880 --> 00:22:09,880
So this is a much nicer way to flag or to stop the program to terminate the program, but do it on your own terms.

292
00:22:09,880 --> 00:22:12,880
So let's have you work on this for a couple minutes.

293
00:22:12,880 --> 00:22:19,880
You'll raise your own value errors. I'd like you to write this function that's called pairwise division. It takes in two lists.

294
00:22:19,880 --> 00:22:28,880
The lists should be not empty and they're equal lengths, right? So as per this example, here's two lists that are not empty and they're the same length.

295
00:22:28,880 --> 00:22:42,880
And I would like the code to basically go element by element and create a new list where each element is going to be, for example, four divided by one, five divided by two and six divided by three.

296
00:22:42,880 --> 00:22:48,880
So pairwise you do the division, put all those elements in a new list and return that list.

297
00:22:48,880 --> 00:22:59,880
If the denominator, so the second parameter passed in, L, denom contains any zeros, raise a value error.

298
00:22:59,880 --> 00:23:06,880
So don't let the code crash with the zero division error, but instead raise a value error with a nice message.

299
00:23:06,880 --> 00:23:14,880
So start with just the code to do the task and then add the value error bit at the end.

300
00:23:14,880 --> 00:23:20,880
Okay, does anyone have a start? How would you like to solve this problem? How do you want to write it?

301
00:23:20,880 --> 00:23:23,880
Yeah.

302
00:23:23,880 --> 00:23:26,880
Yep.

303
00:23:26,880 --> 00:23:31,880
And then try to do this.

304
00:23:31,880 --> 00:23:40,880
Like how it will scrap it, I'll know I'll write it. Sorry, I can't.

305
00:23:40,880 --> 00:23:49,880
So, I'll nom at I divided by L, denom at I.

306
00:23:49,880 --> 00:24:00,880
So we do the division for I in.

307
00:24:00,880 --> 00:24:05,880
So here, what is I? Is it the element or is it an index? Yeah.

308
00:24:05,880 --> 00:24:12,880
So how do we grab basically numbers zero through the length of one of these lists?

309
00:24:12,880 --> 00:24:15,880
If you want to do, yeah.

310
00:24:15,880 --> 00:24:28,880
Oh, for I and then, yeah, so we have to do range. Remember, yeah, range, L, den, L, denom.

311
00:24:28,880 --> 00:24:33,880
I think those are my parentheses. That's cool. That you did list comprehension right away.

312
00:24:33,880 --> 00:24:44,880
Does anyone want to rewrite this using if or using a loop?

313
00:24:44,880 --> 00:24:49,880
It's two. Oh, yeah.

314
00:24:49,880 --> 00:24:54,880
Yep.

315
00:24:54,880 --> 00:25:04,880
Or I got to take L to do L dot of 10 to help.

316
00:25:04,880 --> 00:25:09,880
So we still want to use the index, right? Because if we're looking at the element in L num,

317
00:25:09,880 --> 00:25:12,880
it's going to be hard for us to grab the same element in L denom.

318
00:25:12,880 --> 00:25:18,880
So let's iterate through the, like zero through the range, right?

319
00:25:18,880 --> 00:25:22,880
So basically what we did up there, range, length, and then pick one of them.

320
00:25:22,880 --> 00:25:27,880
Because they're the same length. So now, let's change this to I, just so we're not confused.

321
00:25:27,880 --> 00:25:32,880
I would say I is zero, one, two, three, four, right? So now we know this is the index.

322
00:25:32,880 --> 00:25:39,880
So with this index in hand, this is the right start, right? L num at I gives me the element in L num.

323
00:25:39,880 --> 00:25:46,880
Divide by L denom exactly at I.

324
00:25:46,880 --> 00:25:57,880
Yeah. L. We can do L dot append, something like that.

325
00:25:57,880 --> 00:26:04,880
We can't say L at I equals that because our L is not made exactly, yes.

326
00:26:04,880 --> 00:26:13,880
Perfect. So we could do like this. This is just another way.

327
00:26:13,880 --> 00:26:20,880
And then at the end, we can return our variable, right? L.

328
00:26:20,880 --> 00:26:25,880
Okay, so that solves our problem. How do we add the piece where we raise a value?

329
00:26:25,880 --> 00:26:31,880
So how do you want to check that there's a, that L denom has a zero?

330
00:26:31,880 --> 00:26:39,880
Because this should hopefully run work with our code without, oops, did I do it twice? Sorry, yes I did.

331
00:26:39,880 --> 00:26:44,880
Let me just comment one of these out. Oops.

332
00:26:44,880 --> 00:26:51,880
There. So how do I add the piece about values? Yes.

333
00:26:51,880 --> 00:26:59,880
You put the L dot append on your try and then you add accept, raise value there, help the number of the team.

334
00:26:59,880 --> 00:27:07,880
Yep, so we can pop this into a try and then accept and raise value error.

335
00:27:07,880 --> 00:27:16,880
Yep. And with some nice message here. Nice message.

336
00:27:16,880 --> 00:27:21,880
And we can also put the entire for loop under the try. The code is not very long that it does.

337
00:27:21,880 --> 00:27:29,880
It wouldn't make a difference. So if we try to run it like that now, I've got my value error with my nice message.

338
00:27:29,880 --> 00:27:39,880
Another, yeah, another way we could raise the value error just for completion sake is to say something like you can even raise things inside if statements.

339
00:27:39,880 --> 00:27:43,880
You don't have to be part of accept blocks before we even do anything with the code.

340
00:27:43,880 --> 00:27:54,880
We can say if zero is in L denom, raise value error. That would also be a fine thing to do.

341
00:27:54,880 --> 00:27:59,880
So we can raise value is wherever we'd like.

342
00:27:59,880 --> 00:28:06,880
So now I'd like to talk a little bit about assertions. So assertions are actually still exceptions that get raised.

343
00:28:06,880 --> 00:28:13,880
They're just a very special type of exceptions that we mostly use as a defensive programming tool.

344
00:28:13,880 --> 00:28:24,880
So assertions are basically used to enforce these contracts that we make between somebody who writes a function and somebody who uses a function.

345
00:28:24,880 --> 00:28:27,880
So that's basically the function dog strings, right?

346
00:28:27,880 --> 00:28:36,880
When we talked about dog strings, I said that it's very hard for us to enforce the text within the dog string, right?

347
00:28:36,880 --> 00:28:47,880
Because it's just the person who's writing the function saying, you know, the input list should not be empty or, you know, these two input lists like in the previous example should be the same length.

348
00:28:47,880 --> 00:28:55,880
And there's no way for us to really enforce that. It's just something that's nice to have. And we're going to guarantee that the code runs if these things are upheld.

349
00:28:55,880 --> 00:29:06,880
But it turns out that assertions are actually a nice way for us to add to a nice thing to add to our functions that do try to enforce these this contract through the specification.

350
00:29:06,880 --> 00:29:13,880
So the way we create an assert, we say assert. And I'm asserting that this statement is true.

351
00:29:13,880 --> 00:29:21,880
So if I want that the input length for a function to be non zero, I would assert that the length L is not equal to zero or something like that.

352
00:29:22,880 --> 00:29:36,880
And if the assertion is true, right, if that condition is met, then the code carries on as normal. But if the assertion is not true, then Python ends with an assertion error and then some message that the condition was not true.

353
00:29:36,880 --> 00:29:43,880
And these are really nice because it holds the execution of a program as soon as that contract is not held, right?

354
00:29:43,880 --> 00:30:03,880
As soon as something within the specification has gone wrong, then the program terminates with those assertion errors. And it's nice to see them because if you're debugging your code, you don't want to propagate bad values or bad, bad, bad values through functions because that value might get propagated later and later and later.

355
00:30:03,880 --> 00:30:06,880
And then it would make your debugging very hard.

356
00:30:06,880 --> 00:30:20,880
So if you stop the execution as soon as something is just strange or off as in something like an assumption on parameters not met, then that's good.

357
00:30:20,880 --> 00:30:38,880
So in our some digits example, here is the code that we wrote last so total down to the bottom is exactly what we had before. All we're going to add is this assert statement up here that the length of s is done empty because part of my contract here is that s is a non empty string.

358
00:30:38,880 --> 00:30:44,880
So that's a nice thing to assert if the user ever gives us an empty string, the program will terminate.

359
00:30:44,880 --> 00:30:59,880
So in this example here, I've got the some digits with the assert. So if the user gives us an empty string, no total was created and the assert was immediately false, right?

360
00:30:59,880 --> 00:31:10,880
So length s was equal to zero. The assert assertion error was raised with the message s is empty. So what I had here.

361
00:31:10,880 --> 00:31:21,880
If I have fine input, then no assertion is raised and the code carries on as norm. So that's nice.

362
00:31:22,880 --> 00:31:38,880
So let's have you add one more line of code to your the program that we just wrote just add an assert statement that enforces the contract. So I have LNUM and LDNUM are non empty lists of equal length.

363
00:31:38,880 --> 00:31:52,880
So you can do this all in one assert statement or you can put two separate assert statements with two separate messages. However, you'd like it is fine with me. So I'll give you a minute to work on that and then we can write it.

364
00:31:52,880 --> 00:32:07,880
All right. What assertions should I put in here?

365
00:32:07,880 --> 00:32:20,880
So the thing I'm asserting should be true. So do I want them to be equal? Yes. Exactly. So what we I want LNUM to equal LLDNUM.

366
00:32:20,880 --> 00:32:36,880
Yeah, DNUM like that. Yep, that's one. Right. So the thing you want you're asserting that this is true. And if not, comma, we're going to put a message, right? List lengths different or something like that.

367
00:32:36,880 --> 00:32:46,880
Do you want to do the other assert statement or does somebody else want to take a crack at the other assert?

368
00:32:46,880 --> 00:32:51,880
So the other one is that they are non empty lists.

369
00:32:51,880 --> 00:32:54,880
Yeah.

370
00:33:06,880 --> 00:33:13,880
Yep. So we can definitely do that not equal to zero comma.

371
00:33:13,880 --> 00:33:17,880
Yeah.

372
00:33:17,880 --> 00:33:19,880
Empty list or something like that.

373
00:33:19,880 --> 00:33:29,880
Yep. Very nice. So here we're trying to enforce our nice contracts and I've got two examples down here. So here I've got two different lengths of lists. So there you go.

374
00:33:29,880 --> 00:33:41,880
My assertion has raised was raised with the nice message length differ. And then the code would immediately stop and it would force us to check to see why these lengths are different.

375
00:33:41,880 --> 00:33:56,880
So these bad lists won't propagate any further if I had larger pieces of code. And then same here. I've got this assertion error that I have an empty list.

376
00:33:56,880 --> 00:34:02,880
Any questions so far?

377
00:34:02,880 --> 00:34:16,880
One more example I want to go through. I'm not going to actually run this one, but it is in the Python slides. I just wanted to give you another example of how we can use exceptions assertions in just a different setting.

378
00:34:16,880 --> 00:34:35,880
And it hopefully shows that as a programmer you get to choose how how you add these exceptions and assertions. Right. So wherever they they seem reasonable to add, you should add them. So in this particular example, we're assuming that we have a class list.

379
00:34:35,880 --> 00:34:54,880
In this case, I only have two students in my class. So these are their test grades. So I've got a list that looks like this. It looks complicated, but I'll walk you through it. This is one student in my list. And this is another student in my list.

380
00:34:54,880 --> 00:35:06,880
So I've got a list of lists. Right. Where these things that I've highlighted in red is my students. And for each student, I have more lists as part of their sort of information.

381
00:35:06,880 --> 00:35:15,880
So the first list related to one student is their name. Right. The first element is their first name, second element is their last name.

382
00:35:15,880 --> 00:35:24,880
And then the second list for that student is their grades in the class. So just another list of all the grades in the class.

383
00:35:24,880 --> 00:35:37,880
So what I would like to do, and this is the code I'm going to I'm going to go through is what is I'd like to create a new list based on the original grade test grades.

384
00:35:37,880 --> 00:35:57,880
That contains the same information as before. So you can see I still have two lists of students, the first row and the second row. And in each student's information, I again still have their name and their list of grades. But I'm adding one more item at the end for each student, which is the average of the list of grades.

385
00:35:57,880 --> 00:36:05,880
So I've taken the average of these and plopped it as my integer or float at the end and same with my next student.

386
00:36:05,880 --> 00:36:17,880
So the code that's going to do this looks like this. I've got that's just the original list to give you an example to look at because I find it hard to see things without examples.

387
00:36:17,880 --> 00:36:27,880
So this is the code that gets the stats for the class so that creates this new list containing my average at the end for each student in the class list.

388
00:36:27,880 --> 00:36:33,880
So for example, student here, stew is going to be this list of two lists.

389
00:36:33,880 --> 00:36:49,880
What I'm going to do in my new list that I'm creating here, new stats is I'm going to pen student at zero, which is just their name. So just a straight copy and paste student at one, which is just their grades again, a straight up copy and paste of all their list of grades.

390
00:36:49,880 --> 00:36:59,880
And then I'm going to apply a function named average to the list of student grades.

391
00:36:59,880 --> 00:37:10,880
And what we're going to see in the next couple slides is we're going to see a few variations of this average function and what happens when we when we apply these different, these different functions.

392
00:37:10,880 --> 00:37:25,880
But for now, I will assume that this code will do the job. So the original average function will take in a list of grades. So this grades here will look like this blue box here.

393
00:37:25,880 --> 00:37:36,880
Right, so just a list of numbers. It's going to sum all the grades. So some of all the elements inside that list and divide by how many there are average.

394
00:37:36,880 --> 00:37:52,880
Okay, now let's say that I have a student that contains no quiz grades or no grades at all. In that case, their list of grades will be empty.

395
00:37:52,880 --> 00:38:02,880
So if I try to apply the sum of all the grades divided by the length of the grades for somebody who has no grades information, that length will be zero.

396
00:38:02,880 --> 00:38:09,880
So I'm going to get a zero division error when I run my code and it will crash.

397
00:38:09,880 --> 00:38:21,880
So what I'd like to do is to change my average function to try to catch such an error. So I'm going to try to do the sum divided by the length.

398
00:38:21,880 --> 00:38:29,880
And I'm going to catch this zero division error inside this except block and all I'm going to do is print warning no grades data.

399
00:38:29,880 --> 00:38:42,880
So for any student that actually has grades information here, the code will work for the code to get the average will work just fine because it will do the sum divided by the length.

400
00:38:42,880 --> 00:38:48,880
But and then so that means the tri block will succeed and we're going to return the sum divided by the length.

401
00:38:48,880 --> 00:38:56,880
But if any student enters the zero division error here, we're going to print something and what do we return?

402
00:38:56,880 --> 00:39:10,880
What is the function return if we enter the except block?

403
00:39:10,880 --> 00:39:15,880
That's what's going to be printed. But what does this function actually return? What value?

404
00:39:15,880 --> 00:39:22,880
None, exactly, right? There's no return inside the except block and no code after it either.

405
00:39:22,880 --> 00:39:29,880
So you can see here if it successfully completes for these three students, we've got our numbers, that's what we return.

406
00:39:29,880 --> 00:39:36,880
But for the last student that has no grades information, we're returning none.

407
00:39:36,880 --> 00:39:42,880
I don't like that. What I would like in my grades book is to have numbers as my as my value there.

408
00:39:42,880 --> 00:39:50,880
So instead, let's add a return for that except for that except block.

409
00:39:50,880 --> 00:39:55,880
So we're still going to flag the error. We still want to know that something weird has happened.

410
00:39:55,880 --> 00:40:01,880
I don't just want to replace return a zero without actually telling the user that something something's gone down.

411
00:40:01,880 --> 00:40:06,880
I still flag the error, but then I can return a zero so that it's still a number.

412
00:40:06,880 --> 00:40:11,880
And then if I do something with numbers at the end, then it all works out.

413
00:40:11,880 --> 00:40:18,880
This was a particularly hard first quiz, 10, 10, 80.

414
00:40:18,880 --> 00:40:23,880
Okay, one last thing we can do is to just assert.

415
00:40:23,880 --> 00:40:36,880
So if we want to make sure that every student had some sort of grades information, maybe if the grades data was empty, something weird happened from a previous function that might have been called, I don't know.

416
00:40:36,880 --> 00:40:42,880
But maybe we say, let's just assert that the length of the grades is not zero.

417
00:40:42,880 --> 00:40:46,880
So we only want this code to execute if there are some grades information.

418
00:40:46,880 --> 00:40:50,880
And if not, let's just raise an assertion error just in case.

419
00:40:50,880 --> 00:40:54,880
So we can assert that the length of grades is not equal to zero.

420
00:40:54,880 --> 00:41:02,880
And in that case, the code will terminate as soon as we try to get that last student's information.

421
00:41:02,880 --> 00:41:07,880
It will crash and it will crash with this assert statement that there's no grades data.

422
00:41:07,880 --> 00:41:15,880
And then we can go back to the code and see, did we actually expect the student to have information or not, and then we can try to work through it.

423
00:41:16,880 --> 00:41:20,880
So just a quick summary of exceptions and assertions.

424
00:41:20,880 --> 00:41:28,880
Hopefully this lecture kind of demystified some of these exceptions that we've been getting.

425
00:41:28,880 --> 00:41:33,880
It showed you they're not as scary as they might have seemed originally.

426
00:41:33,880 --> 00:41:38,880
They don't always have to terminate the program, right?

427
00:41:38,880 --> 00:41:45,880
You can catch them. You can deal with them in whatever way that makes sense for that particular function or program.

428
00:41:45,880 --> 00:41:50,880
You can print a nice output to the screen. You can set some default values.

429
00:41:50,880 --> 00:42:01,880
You can still terminate the program, but do it on your own terms with your own errors, with your own custom messages, so that the users can see something nicer than the default Python messages.

430
00:42:01,880 --> 00:42:12,880
So exceptions, exception handling is a very important part of writing a program, especially if you expect weird things to happen.

431
00:42:12,880 --> 00:42:23,880
Assertions, on the other hand, are a type of exception, and they're useful, as I've mentioned, to try to enforce these contracts, these specifications.

432
00:42:24,880 --> 00:42:29,880
You basically use assertions because you don't want bad values to propagate.

433
00:42:29,880 --> 00:42:46,880
So as soon as something that isn't as you expected to be happens, assertion error is raised, and the programming media terminates allowing you to check to see why exactly those conditions were not met.

434
00:42:46,880 --> 00:42:48,880
So that's it. That's all I had.

