---
title: MIT6100 P8P08FunctionsasObjects
---

1
00:00:00,000 --> 00:00:12,560
All right, everyone.

2
00:00:12,560 --> 00:00:15,480
So let's get started.

3
00:00:15,480 --> 00:00:19,280
Last lecture we introduced functions.

4
00:00:19,280 --> 00:00:23,600
And we saw some syntax around how to create functions, but mostly we were interested in

5
00:00:23,600 --> 00:00:28,640
kind of motivating functions as a way for us to start writing really clean code.

6
00:00:28,640 --> 00:00:32,880
That's easy to debug and code that's easy to read in the future.

7
00:00:32,880 --> 00:00:40,560
Today we will continue our fun adventure with functions and we'll see what it means to

8
00:00:40,560 --> 00:00:43,480
treat functions as objects.

9
00:00:43,480 --> 00:00:47,719
So let's recall the example we talked about last lecture.

10
00:00:47,719 --> 00:00:51,719
We created this function is even.

11
00:00:51,719 --> 00:00:57,400
So the syntax for creating a function is basically the keyword df.

12
00:00:57,399 --> 00:00:59,839
So Python we're defining a function.

13
00:00:59,839 --> 00:01:02,359
We decide what name to give our function.

14
00:01:02,359 --> 00:01:04,640
parentheses tells Python in here.

15
00:01:04,640 --> 00:01:08,799
We're going to name all the arguments, all the inputs to the function.

16
00:01:08,799 --> 00:01:12,239
The colon starts the body of the function.

17
00:01:12,239 --> 00:01:19,319
The first part, it's not required, but should always kind of be in there as a way for us

18
00:01:19,319 --> 00:01:23,120
to implement abstraction is called the doc string.

19
00:01:23,120 --> 00:01:25,319
So this in green is the doc string.

20
00:01:25,319 --> 00:01:29,479
The doc string starts our doc string and triple quotes ends the doc string.

21
00:01:29,479 --> 00:01:36,479
And you think of the doc string also known as a specification as just a really long comment.

22
00:01:36,479 --> 00:01:41,519
And in it, it's and the doc string is kind of I called it a contract between the person

23
00:01:41,519 --> 00:01:45,799
who writes the function and a person who uses the function.

24
00:01:45,799 --> 00:01:50,439
And in the contract, the person who writes the function basically says this function is

25
00:01:50,439 --> 00:01:52,679
going to take these inputs.

26
00:01:52,679 --> 00:01:57,920
And I guarantee this function to work correctly when you give me these inputs of these types

27
00:01:57,920 --> 00:02:01,120
and these restrictions on them, things like that.

28
00:02:01,120 --> 00:02:04,840
And then you also state what the function is going to do.

29
00:02:04,840 --> 00:02:09,280
And then you also state what the function will return.

30
00:02:09,280 --> 00:02:12,960
In this particular function, we have only one line.

31
00:02:12,960 --> 00:02:15,079
This is the body of the function.

32
00:02:15,079 --> 00:02:19,159
But you've hopefully seen functions that are a little bit longer as you did the practice

33
00:02:19,159 --> 00:02:21,719
from last lecture.

34
00:02:21,719 --> 00:02:25,680
And the body of the function itself, so the lines of code are basically lines of code that

35
00:02:25,680 --> 00:02:27,519
we've seen before.

36
00:02:27,519 --> 00:02:33,960
There's nothing sort of special about that except for lines that start with a return.

37
00:02:33,960 --> 00:02:40,000
So lines that start with a return basically tell Python that as soon as I see this line

38
00:02:40,000 --> 00:02:46,800
with a return hit in when I'm executing my function, I need to stop executing this function,

39
00:02:46,800 --> 00:02:53,360
and make the value associated with this return and pass it back to whoever called me.

40
00:02:53,360 --> 00:02:56,640
A function always returns something.

41
00:02:56,640 --> 00:03:01,400
In this particular case, the function will return either true or false, a Boolean.

42
00:03:01,400 --> 00:03:08,920
But you can write functions, I return integers, floats, strings, things like that.

43
00:03:08,920 --> 00:03:11,080
In this case, yeah, this is what is returned.

44
00:03:11,080 --> 00:03:12,080
It is possible.

45
00:03:12,080 --> 00:03:15,600
And we actually saw this in one of the utriots as we were writing our code.

46
00:03:15,599 --> 00:03:20,919
It is possible to write a function that doesn't actually return anything explicitly.

47
00:03:20,919 --> 00:03:23,599
So here is even function.

48
00:03:23,599 --> 00:03:28,400
And inside the body, the only change I've made is I've eliminated the little return keyword.

49
00:03:28,400 --> 00:03:31,079
But otherwise, the work that is done is the same.

50
00:03:31,079 --> 00:03:35,519
So here, I'm just calculating whether the remainder is zero or not.

51
00:03:35,519 --> 00:03:42,199
So this line of code when the function is executed is replaced with either true or false.

52
00:03:42,199 --> 00:03:44,799
Notice this function doesn't have a return keyword.

53
00:03:44,800 --> 00:03:46,840
But all functions return something.

54
00:03:46,840 --> 00:03:52,680
So while function is being executed because of a function call, if the function reaches

55
00:03:52,680 --> 00:03:59,200
the end of all of these indented lines here, right, everything that's indented, if it reaches

56
00:03:59,200 --> 00:04:04,720
the end and no return statement has been hit, then Python automatically returns none.

57
00:04:04,720 --> 00:04:07,240
Okay, so this is the line without a return statement.

58
00:04:07,240 --> 00:04:12,320
You can think of this code as basically behind the scenes, Python putting this little line

59
00:04:12,319 --> 00:04:14,759
at the bottom that says return none.

60
00:04:14,759 --> 00:04:18,800
Okay, now this is not something that we would ever write.

61
00:04:18,800 --> 00:04:23,000
You just do the operations, maybe you print some stuff out, and then you just omit the

62
00:04:23,000 --> 00:04:27,199
return keyword if you want to return none from the function.

63
00:04:27,199 --> 00:04:33,480
And none is this, uh, none type is, is of, of value that is of type none type.

64
00:04:33,480 --> 00:04:37,639
We talked about it back in maybe lecture one or two, and we haven't really used it that

65
00:04:37,639 --> 00:04:39,560
much since.

66
00:04:39,639 --> 00:04:44,360
But basically you think of it as just having the type none type, and there's just one value

67
00:04:44,360 --> 00:04:45,360
associated with it.

68
00:04:45,360 --> 00:04:46,360
Not.

69
00:04:46,360 --> 00:04:52,040
And usually we use this value to represent the absence of a value in our code.

70
00:04:52,040 --> 00:04:57,319
So let me just run some code first, just to show you exactly some of the kind of, uh, things

71
00:04:57,319 --> 00:05:02,160
you might observe when you, when you write code that doesn't have a return statement.

72
00:05:02,160 --> 00:05:06,199
So here, uh, I promise this is the last time we're going to see is even.

73
00:05:06,199 --> 00:05:10,519
So here I have two versions of the is even function.

74
00:05:10,519 --> 00:05:15,879
So I have one that I named is even with return, and I have one that is named is even without

75
00:05:15,879 --> 00:05:16,879
return.

76
00:05:16,879 --> 00:05:17,879
Okay.

77
00:05:17,879 --> 00:05:20,000
They do very similar things.

78
00:05:20,000 --> 00:05:25,279
The difference is that this one has a return statement where I return whether the remainder

79
00:05:25,279 --> 00:05:31,379
is equal to zero, and this one has no return statement, but it just prints whether the

80
00:05:31,379 --> 00:05:33,839
returns, the remainder is equal to zero.

81
00:05:34,399 --> 00:05:35,399
Okay.

82
00:05:35,399 --> 00:05:40,000
So let's look at, uh, running the code with, uh, is even with return.

83
00:05:40,000 --> 00:05:45,959
And as we're doing so, this first, uh, function will be a recap of last lecture, kind of tracing

84
00:05:45,959 --> 00:05:49,319
through what happens when we make a function call.

85
00:05:49,319 --> 00:05:55,959
So I've uncommented this line, and now I'm running line 13.

86
00:05:55,959 --> 00:06:01,039
So when Python sees this file, it basically sees this function definition, and this is

87
00:06:01,039 --> 00:06:03,120
not code that runs yet, right?

88
00:06:03,199 --> 00:06:07,399
It's just telling Python that I've created this function inside memory.

89
00:06:07,399 --> 00:06:13,920
When I have this line being run, that's when the function is actually being called, and

90
00:06:13,920 --> 00:06:15,959
actually being run.

91
00:06:15,959 --> 00:06:23,720
So I is replaced with a parameter three, and at this point, the body of the function is

92
00:06:23,720 --> 00:06:24,720
executed.

93
00:06:24,720 --> 00:06:29,879
So the first thing that we tell the function to do is print the string with return.

94
00:06:29,879 --> 00:06:33,560
So if I run it, you'll see it prints with return.

95
00:06:33,560 --> 00:06:37,920
Then it calculates this variable remainder, which is going to be one, right?

96
00:06:37,920 --> 00:06:40,120
Because 3% 2 equals one.

97
00:06:40,120 --> 00:06:43,879
And then I'm going to return whether one equal to zero.

98
00:06:43,879 --> 00:06:45,360
So that's going to be false.

99
00:06:45,360 --> 00:06:50,560
So as soon as we see this return statement, Python returns out of this function call, and

100
00:06:50,560 --> 00:06:55,360
replaces the function call entirely with the return value.

101
00:06:55,360 --> 00:07:00,600
So this entire line after the function call is executed is replaced with false.

102
00:07:00,600 --> 00:07:03,199
So I've just noted that here.

103
00:07:03,199 --> 00:07:05,560
We're not doing anything with this return, right?

104
00:07:05,560 --> 00:07:13,600
All we're doing is making the function call, and it just kind of sits online 13.

105
00:07:13,600 --> 00:07:20,360
In order to see the result of the function call, we saw last lecture that we actually wrap

106
00:07:20,360 --> 00:07:23,560
the function call around a print statement, right?

107
00:07:23,560 --> 00:07:27,319
The function calls in that sense are kind of just expressions, right?

108
00:07:27,319 --> 00:07:28,680
They do some work.

109
00:07:28,680 --> 00:07:33,959
Python evaluates them to some value, and then replaces that function call with the value.

110
00:07:33,959 --> 00:07:40,120
So if we wrap is even with return 3, this function call around with a print statement.

111
00:07:40,120 --> 00:07:41,399
Python does the whole thing again.

112
00:07:41,399 --> 00:07:42,480
I use 3.

113
00:07:42,480 --> 00:07:44,680
It returns false.

114
00:07:44,680 --> 00:07:48,680
And this line effectively becomes print parentheses false.

115
00:07:48,680 --> 00:07:49,920
And we know what that does, right?

116
00:07:49,920 --> 00:07:52,879
It just prints false to the screen.

117
00:07:52,879 --> 00:07:54,519
There it goes.

118
00:07:54,519 --> 00:07:59,680
Notice we still did this print statement because as part of the function body, we tell it to

119
00:07:59,680 --> 00:08:02,000
do this print.

120
00:08:02,000 --> 00:08:06,839
Everyone okay so far?

121
00:08:06,839 --> 00:08:13,439
So now let's see what happens when we run this function is even without return.

122
00:08:13,439 --> 00:08:14,439
So very similar.

123
00:08:14,439 --> 00:08:21,879
I've just created an extra parameter here or variable here just to show you that you can.

124
00:08:21,879 --> 00:08:27,800
So this function is even without return 3 is being run on line 27.

125
00:08:27,800 --> 00:08:30,600
So I is 3.

126
00:08:30,600 --> 00:08:33,439
This function will print without return.

127
00:08:33,439 --> 00:08:37,320
And then it calculates remainder to be 1.

128
00:08:37,320 --> 00:08:41,519
And then has rem will be false, right?

129
00:08:41,519 --> 00:08:45,200
So the variable has rem will have a value of false.

130
00:08:45,200 --> 00:08:50,480
And then as part of the function body, we're going to print the value of has rem, which is

131
00:08:50,480 --> 00:08:51,759
false.

132
00:08:51,759 --> 00:08:56,039
So this line here will actually print for me without return.

133
00:08:56,039 --> 00:09:01,759
And then this thing false.

134
00:09:01,759 --> 00:09:06,319
And then the function has no return statement explicitly in there.

135
00:09:06,319 --> 00:09:12,960
So you think about it like Python implicitly adds this return none at the end of the function

136
00:09:12,960 --> 00:09:13,960
call.

137
00:09:13,960 --> 00:09:14,960
We don't add this.

138
00:09:14,960 --> 00:09:18,519
I just wrote it there just to show you that Python would add a line such as this when

139
00:09:18,519 --> 00:09:22,879
it reaches the end of the function, but you would never add it.

140
00:09:22,879 --> 00:09:29,960
So that means that the entire function call is replaced with none.

141
00:09:29,960 --> 00:09:30,960
Okay.

142
00:09:30,960 --> 00:09:37,879
So what happens when you put print in the definition?

143
00:09:37,879 --> 00:09:43,079
What happens when you put print in the definition versus around the function call?

144
00:09:43,079 --> 00:09:45,480
Versus that what you put return in the definition.

145
00:09:45,480 --> 00:09:47,120
Versus when you put return in the definition.

146
00:09:47,120 --> 00:09:48,319
So that's the next line.

147
00:09:48,320 --> 00:09:54,760
So in the next one, if we were to do what we did before, which is let's print the result

148
00:09:54,760 --> 00:09:56,640
of the function call.

149
00:09:56,640 --> 00:09:59,920
Well, Python will do everything we just did, right?

150
00:09:59,920 --> 00:10:02,200
So it'll print without return.

151
00:10:02,200 --> 00:10:04,120
It'll print false.

152
00:10:04,120 --> 00:10:09,560
But then it'll additionally print the return from the function call.

153
00:10:09,560 --> 00:10:16,040
So if the return is none, this line effectively becomes print none.

154
00:10:16,039 --> 00:10:19,799
So what we end up seeing or what the user would end up seeing if they actually run this

155
00:10:19,799 --> 00:10:24,879
program is they'll see without return, they see false, and then they see this extraneous

156
00:10:24,879 --> 00:10:27,959
none in the console.

157
00:10:27,959 --> 00:10:31,199
So you'll see probably this in problem set two.

158
00:10:31,199 --> 00:10:35,039
You'll probably encounter an error such as this and maybe problem set three.

159
00:10:35,039 --> 00:10:36,679
But don't be scared.

160
00:10:36,679 --> 00:10:40,879
Whenever you see a none out in the console, it just means you have to be careful about the

161
00:10:40,879 --> 00:10:42,879
function that was called, right?

162
00:10:42,879 --> 00:10:45,879
You probably forgot to return something.

163
00:10:45,879 --> 00:10:50,480
And instead, we're just printing the correct value within the function, but just never

164
00:10:50,480 --> 00:10:51,480
returned it.

165
00:10:51,480 --> 00:10:52,480
Right?

166
00:10:52,480 --> 00:10:54,960
So that's just something to be wary of.

167
00:10:54,960 --> 00:10:58,159
So should you always be good for anything?

168
00:10:58,159 --> 00:10:59,679
Yeah, so that's a good question.

169
00:10:59,679 --> 00:11:00,919
Should you always use return?

170
00:11:00,919 --> 00:11:03,120
It depends on what you want the function to do.

171
00:11:03,120 --> 00:11:06,200
Most functions are useful because they go off on their own.

172
00:11:06,200 --> 00:11:09,000
They do a task and they get a value at the end.

173
00:11:09,000 --> 00:11:11,720
And they pass the value back to whoever called it.

174
00:11:11,720 --> 00:11:14,600
And then you can use that function with many different inputs to give you many different

175
00:11:14,600 --> 00:11:15,600
outputs.

176
00:11:15,600 --> 00:11:19,480
So usually you'd want to make functions that return something that you can then do something

177
00:11:19,480 --> 00:11:24,560
else with in another part of the program.

178
00:11:24,560 --> 00:11:31,960
The prints within the functions should usually be maybe for debugging or for the status of

179
00:11:31,960 --> 00:11:35,800
the function, what part is it's executing or something like that.

180
00:11:35,800 --> 00:11:36,800
Okay.

181
00:11:36,800 --> 00:11:40,320
And then when you run the function that it will give you the return, it could create in

182
00:11:40,320 --> 00:11:42,640
the function that's what it does to not.

183
00:11:42,640 --> 00:11:43,640
Exactly.

184
00:11:43,640 --> 00:11:47,920
If the function is not returning anything, then it'll do ill print none.

185
00:11:47,920 --> 00:11:48,920
Right?

186
00:11:48,920 --> 00:11:49,920
Yeah.

187
00:11:49,920 --> 00:11:53,120
But if the function is returning something, it will print, right?

188
00:11:53,120 --> 00:11:58,520
If you wrap it with a print, it'll print whatever it got returned.

189
00:11:58,520 --> 00:12:01,280
Okay.

190
00:12:01,280 --> 00:12:04,440
So let's have you work on this.

191
00:12:04,440 --> 00:12:07,520
Actually there's nothing to write, but think about it.

192
00:12:07,519 --> 00:12:10,279
So I've got four lines of code here.

193
00:12:10,279 --> 00:12:15,480
Add 1,2, wrap that around the print statement, multiple three comma four, and then add that

194
00:12:15,480 --> 00:12:16,559
around a print statement.

195
00:12:16,559 --> 00:12:24,960
So try to trace through and tell me what outputs each function call will give me.

196
00:12:24,960 --> 00:12:26,960
So add 1,2, what happens?

197
00:12:26,960 --> 00:12:28,519
What do you think the output of this function is?

198
00:12:28,519 --> 00:12:36,840
What gets printed to the screen?

199
00:12:36,840 --> 00:12:41,639
What does it?

200
00:12:41,639 --> 00:12:44,000
Am I telling it to print anything?

201
00:12:44,000 --> 00:12:45,000
That's the question.

202
00:12:45,000 --> 00:12:46,000
Yeah.

203
00:12:46,000 --> 00:12:48,560
So nothing is actually printed to the screen, right?

204
00:12:48,560 --> 00:12:53,960
Because in the function call add comma two, right, we basically map the parameters one at

205
00:12:53,960 --> 00:12:54,960
a time.

206
00:12:54,960 --> 00:12:56,480
X is 1, Y is 2.

207
00:12:56,480 --> 00:12:57,320
That was good.

208
00:12:57,320 --> 00:12:59,680
We return 3.

209
00:12:59,680 --> 00:13:05,720
And so this entire function call is replaced with 3.

210
00:13:05,720 --> 00:13:09,759
But we never told that line of code to print that result, right?

211
00:13:09,759 --> 00:13:12,080
So there's nothing printed in this case.

212
00:13:12,080 --> 00:13:22,519
Well, what if we wrap this in a print statement?

213
00:13:22,519 --> 00:13:24,800
Is anything printed in this case?

214
00:13:24,800 --> 00:13:25,800
Yes.

215
00:13:25,800 --> 00:13:26,800
What is printed?

216
00:13:26,800 --> 00:13:28,120
Yeah, exactly, right.

217
00:13:28,120 --> 00:13:34,279
The add itself gives me 5, and so I'm telling it to print 5.

218
00:13:34,279 --> 00:13:36,199
What about the next one?

219
00:13:36,199 --> 00:13:38,199
Mult, what was that?

220
00:13:38,199 --> 00:13:40,360
4, 3, 4.

221
00:13:40,360 --> 00:13:46,480
Is anything printed as a result of running this line?

222
00:13:46,480 --> 00:13:49,839
I heard some yes, some no.

223
00:13:49,839 --> 00:13:52,159
Yeah, the print is in the function exactly.

224
00:13:52,159 --> 00:13:57,480
So just because it's a function call doesn't mean we don't print anything, right?

225
00:13:57,480 --> 00:14:00,600
We need to check out what the function is actually doing.

226
00:14:00,600 --> 00:14:07,879
So in Mult, X gets map to 3, Y gets map to 4, and the function body itself says to print

227
00:14:07,879 --> 00:14:09,600
the result.

228
00:14:09,600 --> 00:14:20,240
So this will print as part of the body, right?

229
00:14:20,240 --> 00:14:23,879
Prince the 12.

230
00:14:23,879 --> 00:14:29,120
Anything else, Apprentice?

231
00:14:29,120 --> 00:14:34,200
Lastly, what if we put a print statement around the Mult?

232
00:14:34,200 --> 00:14:37,200
4, 5.

233
00:14:37,200 --> 00:14:39,200
What will that print?

234
00:14:39,200 --> 00:14:41,840
Yeah, exactly, 20 than none.

235
00:14:41,840 --> 00:14:49,960
So the Mult itself is going to print, same as there, it prints the 20.

236
00:14:49,960 --> 00:14:56,039
So the function call returns none.

237
00:14:56,039 --> 00:15:00,839
So this entire function call basically is replaced with none, and the line then becomes

238
00:15:00,839 --> 00:15:02,120
a print none.

239
00:15:02,120 --> 00:15:05,480
So this will print the none to the screen.

240
00:15:05,480 --> 00:15:11,319
So there's actually four printouts generated from these four lines, right?

241
00:15:11,319 --> 00:15:18,759
The first one generates nothing, but the last one generates two lines of printouts.

242
00:15:18,759 --> 00:15:20,759
Any questions about this example?

243
00:15:20,759 --> 00:15:21,759
Yes?

244
00:15:21,759 --> 00:15:23,360
You go over the white print something on.

245
00:15:23,360 --> 00:15:24,360
This one here?

246
00:15:24,680 --> 00:15:28,480
Yes, so the Mult, check out what it's doing.

247
00:15:28,480 --> 00:15:34,200
It's doing a print statement, so that 20 gets printed out to the console.

248
00:15:34,200 --> 00:15:38,840
But what's the return value of Mult?

249
00:15:38,840 --> 00:15:40,000
There is no return, right?

250
00:15:40,000 --> 00:15:43,840
So if there's no return, Python adds the none.

251
00:15:43,840 --> 00:15:46,240
That's just something that's implicitly done.

252
00:15:46,240 --> 00:15:50,120
So the return from Mult, because it doesn't actually have an explicit return, is none.

253
00:15:50,120 --> 00:15:55,200
So we're asking it to print the return, which is none.

254
00:15:55,200 --> 00:15:57,200
OK.

255
00:15:57,200 --> 00:15:59,960
So a couple words on return versus print.

256
00:15:59,960 --> 00:16:05,240
So the return only has a meaning inside a function.

257
00:16:05,240 --> 00:16:12,759
So as an example, if I just have this file open, and I have returned five, just randomly,

258
00:16:12,759 --> 00:16:15,200
that's not within a function definition.

259
00:16:15,200 --> 00:16:16,519
Already, I'm in trouble.

260
00:16:16,519 --> 00:16:17,519
You see that red X.

261
00:16:17,519 --> 00:16:21,199
And if I run that code, Python gives me a syntax error.

262
00:16:21,199 --> 00:16:22,600
This one's pretty easy to debug.

263
00:16:22,600 --> 00:16:24,600
There's a return outside of a function.

264
00:16:24,600 --> 00:16:25,840
Yep, there it is.

265
00:16:25,840 --> 00:16:28,079
OK.

266
00:16:28,079 --> 00:16:30,360
So return only has a meaning inside a function.

267
00:16:30,360 --> 00:16:34,519
It basically says this function has done some work for me, and it's returning back this

268
00:16:34,519 --> 00:16:36,000
value.

269
00:16:36,000 --> 00:16:38,519
Print statements can be put wherever you'd like.

270
00:16:38,519 --> 00:16:44,000
Inside functions, outside functions, wherever you'd like, and they all get executed.

271
00:16:44,000 --> 00:16:48,279
You can have many return statements inside a function, like if you have a function that

272
00:16:48,279 --> 00:16:54,000
returns zero if some condition applies or one if some other condition applies, then

273
00:16:54,000 --> 00:16:56,480
you can have those two return statements.

274
00:16:56,480 --> 00:17:02,879
But as soon as Python, during execution, hits one return statement, it immediately ends

275
00:17:02,879 --> 00:17:07,720
the function, takes that return value, and pops it back to whoever called it.

276
00:17:07,720 --> 00:17:12,680
So it's not going to run more than one return statement.

277
00:17:12,680 --> 00:17:16,519
And on the other hand, you can run as many print statements as you'd like inside the

278
00:17:16,519 --> 00:17:17,519
program.

279
00:17:17,519 --> 00:17:27,480
And they can all be hit, and they can all generate some sort of output to the console.

280
00:17:27,480 --> 00:17:31,720
So the return statement has a value associated with it.

281
00:17:31,720 --> 00:17:36,360
So return five, return, we had remainder equals zero, whatever.

282
00:17:36,360 --> 00:17:39,200
There's the associated value with that return statement.

283
00:17:39,200 --> 00:17:43,600
That value is what gets passed back to whoever called the function.

284
00:17:43,600 --> 00:17:47,920
The print statement also you can think of it as having a value associated with it.

285
00:17:47,920 --> 00:17:51,160
That's the thing that gets put out to the console.

286
00:17:51,160 --> 00:17:57,279
But that value associated with the print statement is just something that's outputted to the console.

287
00:17:57,279 --> 00:18:00,120
It's not being passed around through the program at all.

288
00:18:00,120 --> 00:18:01,200
It's just kind of static.

289
00:18:01,200 --> 00:18:03,640
It gets put to the console, and then that's it.

290
00:18:03,640 --> 00:18:07,720
Nobody else can really use that value, unless it's a variable, and then you're just using

291
00:18:07,720 --> 00:18:10,600
a regular variable.

292
00:18:10,600 --> 00:18:14,039
The last thing I want to show you, this is kind of cool.

293
00:18:14,039 --> 00:18:22,799
So if we have a print statement, just in here, and we run it, obviously that prints that

294
00:18:22,799 --> 00:18:23,799
to the console.

295
00:18:23,799 --> 00:18:26,079
But what is this print?

296
00:18:26,079 --> 00:18:27,559
It's a function.

297
00:18:27,559 --> 00:18:30,440
It has all the telltale signs of a function.

298
00:18:30,440 --> 00:18:33,039
The name is print.

299
00:18:33,039 --> 00:18:38,680
The parentheses are there, and I'm giving it 1 parameter 5.

300
00:18:38,680 --> 00:18:47,680
So if I print the return of the print function, so if I wrap my print function in another print

301
00:18:47,680 --> 00:18:50,319
function, what do you think this is going to output?

302
00:18:50,319 --> 00:19:00,319
I'll run it.

303
00:19:01,319 --> 00:19:04,079
It outputs none.

304
00:19:04,079 --> 00:19:07,359
So the first 5 is due to this.

305
00:19:07,359 --> 00:19:09,519
This shows up on the console.

306
00:19:09,519 --> 00:19:13,039
But print being a function, it doesn't actually return anything.

307
00:19:13,039 --> 00:19:18,879
It does something useful, like take whatever you want, and show it on the console.

308
00:19:18,879 --> 00:19:22,240
But it doesn't return anything back to whoever called it.

309
00:19:22,240 --> 00:19:27,439
And so if I wrap my print function around another print function, I'm basically printing

310
00:19:27,440 --> 00:19:30,840
the return of the print function, which is none.

311
00:19:30,840 --> 00:19:34,480
So that's where the second none comes in.

312
00:19:34,480 --> 00:19:39,240
So thought of another way, you can make a variable A equals print 5.

313
00:19:39,240 --> 00:19:44,960
And if I print A, basically we're saying the return of that first print function is just

314
00:19:44,960 --> 00:19:45,960
none.

315
00:19:45,960 --> 00:19:46,960
Yeah.

316
00:19:46,960 --> 00:19:47,960
Oops.

317
00:19:47,960 --> 00:19:54,960
Okay.

318
00:19:54,960 --> 00:20:01,600
So I'm going to have you work on this code for a little bit.

319
00:20:01,600 --> 00:20:05,120
Nothing to write, but there is something to fix.

320
00:20:05,120 --> 00:20:07,480
So here's a function called is triangular.

321
00:20:07,480 --> 00:20:12,480
It takes in one parameter, and it's a number, an integer greater than zero.

322
00:20:12,480 --> 00:20:17,840
I want this function to return true if n is triangular and false otherwise.

323
00:20:17,839 --> 00:20:24,839
So triangular just means it's a whole number such that it's equal to 1 plus 2 plus 3 plus

324
00:20:24,839 --> 00:20:28,079
some summation like that.

325
00:20:28,079 --> 00:20:34,759
So 1 is triangular, 3 is triangular, 6 is triangular, and so on and so on.

326
00:20:34,759 --> 00:20:38,240
So take a look at this code.

327
00:20:38,240 --> 00:20:44,119
It's online around 49-ish.

328
00:20:44,119 --> 00:20:50,759
So start by running it, seeing what you get, and I'll give you about a minute or so to see

329
00:20:50,759 --> 00:20:52,519
if you can try to fix it.

330
00:20:52,519 --> 00:20:56,919
Make sure it runs with all these test cases here.

331
00:20:56,919 --> 00:20:59,039
Okay.

332
00:20:59,039 --> 00:21:03,599
What's the first thing you should do when you're asked to fix some code that's buggy?

333
00:21:03,599 --> 00:21:06,599
Yes.

334
00:21:06,599 --> 00:21:13,399
We can do that, but first let's run it with something, right?

335
00:21:13,400 --> 00:21:17,080
So let's run it with the first one.

336
00:21:17,080 --> 00:21:21,680
Print is triangular for, so we know the answer should be false.

337
00:21:21,680 --> 00:21:26,040
I mean I told you, so that's good.

338
00:21:26,040 --> 00:21:34,920
Yes, it does give me false, which is good, but it also prints out a none.

339
00:21:34,920 --> 00:21:37,560
What does that mean for us?

340
00:21:37,560 --> 00:21:38,560
Yes.

341
00:21:38,559 --> 00:21:45,839
Yeah, exactly.

342
00:21:45,839 --> 00:21:46,839
Perfect.

343
00:21:46,839 --> 00:21:48,559
So there's no actual return statement, right?

344
00:21:48,559 --> 00:21:54,440
Like I mentioned in with this, even example, if you're seeing some nuns show up in places,

345
00:21:54,440 --> 00:21:56,039
check your returns.

346
00:21:56,039 --> 00:21:58,440
So is this function actually returning something?

347
00:21:58,440 --> 00:21:59,440
No.

348
00:21:59,440 --> 00:22:01,119
It's just printing the result.

349
00:22:01,119 --> 00:22:04,759
So it's printing the right thing in this case, right?

350
00:22:04,759 --> 00:22:09,079
So let's start by changing the prints to returns.

351
00:22:09,079 --> 00:22:10,079
Right?

352
00:22:10,079 --> 00:22:11,079
Yeah.

353
00:22:11,079 --> 00:22:12,079
I love it.

354
00:22:12,079 --> 00:22:14,879
It says true and then false.

355
00:22:14,879 --> 00:22:16,480
Or this one?

356
00:22:16,480 --> 00:22:17,480
Yeah.

357
00:22:17,480 --> 00:22:21,319
Oh, remember, I think I just read it.

358
00:22:21,319 --> 00:22:22,319
Okay.

359
00:22:22,319 --> 00:22:23,319
All right.

360
00:22:23,319 --> 00:22:24,319
Let's run it.

361
00:22:24,319 --> 00:22:25,319
Perfect.

362
00:22:25,319 --> 00:22:26,319
Yeah.

363
00:22:26,319 --> 00:22:33,000
So that seems to have fixed it.

364
00:22:33,000 --> 00:22:34,519
What should we do next?

365
00:22:34,519 --> 00:22:35,519
Yes.

366
00:22:35,519 --> 00:22:41,519
Check the rest of the prints statements.

367
00:22:41,519 --> 00:22:45,519
It doesn't work.

368
00:22:45,519 --> 00:22:46,519
Yes.

369
00:22:46,519 --> 00:22:47,519
Exactly.

370
00:22:47,519 --> 00:22:50,400
Let's check the rest of the prints statements.

371
00:22:50,400 --> 00:22:53,400
So the second one, six, is triangular.

372
00:22:53,400 --> 00:22:56,240
So that prints true.

373
00:22:56,240 --> 00:23:00,879
And last one, as you mentioned, is going to fail on us.

374
00:23:00,879 --> 00:23:04,119
It prints false, but one is triangular, right?

375
00:23:04,119 --> 00:23:06,000
Because one is just the sum of one.

376
00:23:06,000 --> 00:23:08,439
So do you know what a fix could be?

377
00:23:08,439 --> 00:23:10,679
The range of two and false one?

378
00:23:10,679 --> 00:23:11,679
Yeah, exactly.

379
00:23:11,679 --> 00:23:13,199
So you've spotted it.

380
00:23:13,199 --> 00:23:15,479
The range should be n plus one.

381
00:23:15,479 --> 00:23:20,479
If you didn't spot that right away, as I think somebody mentioned there, the first thing

382
00:23:20,479 --> 00:23:22,959
we should do is just start putting some prints statements.

383
00:23:22,959 --> 00:23:26,159
And inside the loop is a great place to put a print statement.

384
00:23:26,159 --> 00:23:29,399
We can see what thing we're iterating over.

385
00:23:29,399 --> 00:23:30,399
Right?

386
00:23:30,399 --> 00:23:34,079
And so if this was still n, and we didn't manage to fix it, and we run it, we can see

387
00:23:34,079 --> 00:23:39,559
that we've iterated when i is zero, right here.

388
00:23:39,559 --> 00:23:43,079
And we never actually hit one.

389
00:23:43,079 --> 00:23:47,279
So the fix for that is make sure we go up to n including n.

390
00:23:47,279 --> 00:23:51,759
And now if we run it and remove this print statement, because it might be a little

391
00:23:51,759 --> 00:23:57,240
confusing, that now gives me the correct answer.

392
00:23:57,240 --> 00:24:00,839
Last step should probably be to run the other two cases again.

393
00:24:00,839 --> 00:24:04,919
Just in case my fix broke something else, and it didn't.

394
00:24:04,919 --> 00:24:09,359
The other two cases are still the same.

395
00:24:09,359 --> 00:24:10,959
Questions about this code?

396
00:24:10,959 --> 00:24:12,279
Does it make sense?

397
00:24:20,079 --> 00:24:24,639
OK, so now last lecture, I mentioned that once we write functions, it's really easy to

398
00:24:24,639 --> 00:24:27,240
include these functions in larger pieces of code.

399
00:24:27,240 --> 00:24:31,440
And it makes those larger pieces of code very nicely readable.

400
00:24:31,440 --> 00:24:35,160
So let's try to do the same with a slightly more complex example.

401
00:24:35,160 --> 00:24:42,039
Let's try to create, take our bisection root code, right, and make it into a function.

402
00:24:42,039 --> 00:24:45,960
And then there's going to be an exercise in a couple of slides where you get to use this

403
00:24:45,960 --> 00:24:47,480
function.

404
00:24:47,480 --> 00:24:56,400
So the inside of this function here is basically what we had like three lectures ago.

405
00:24:56,400 --> 00:24:59,280
OK, it's just the bisection square root code.

406
00:24:59,280 --> 00:25:03,440
The only thing I've done is I've wrapped it around a function definition.

407
00:25:03,440 --> 00:25:09,200
So DEF, I gave it a name, bisection root is a pretty nice name, and figured out what input

408
00:25:09,200 --> 00:25:10,360
this function should take.

409
00:25:10,360 --> 00:25:16,160
So the input should be the x, I would like to approximate the square root of.

410
00:25:16,160 --> 00:25:19,720
One thing I didn't do is put a doc string on this.

411
00:25:19,720 --> 00:25:22,040
So that's my bad.

412
00:25:22,039 --> 00:25:27,839
But the doc string would say x is a positive integer greater than one, and returns the

413
00:25:27,839 --> 00:25:33,359
approximation to the square root of x or something like that.

414
00:25:33,359 --> 00:25:37,920
OK, so here we're hard coding epsilon to be 0.01.

415
00:25:37,920 --> 00:25:42,720
We've got our low and high end points, just remembering what the bisection root does.

416
00:25:42,720 --> 00:25:48,279
And we're starting out with a guess that's right in between the low and high.

417
00:25:48,279 --> 00:25:52,559
The while loop here is going to do the work for us.

418
00:25:52,559 --> 00:25:59,720
So the while loop condition is while the difference, the absolute value, the difference between

419
00:25:59,720 --> 00:26:02,240
our guess squared and the actual x.

420
00:26:02,240 --> 00:26:05,839
We're trying to find the square root of is bigger than epsilon, so while we're still farther

421
00:26:05,839 --> 00:26:10,119
away than epsilon, we have more guesses to make.

422
00:26:10,119 --> 00:26:14,519
The way we make the guesses is by updating the low end point or the high end point.

423
00:26:14,519 --> 00:26:17,279
Depending on whether our guess was too low or too high.

424
00:26:17,279 --> 00:26:19,559
This should be review, hopefully.

425
00:26:19,559 --> 00:26:25,920
And then after we've decided on which end point to update, we update our new guess to be

426
00:26:25,920 --> 00:26:27,960
whatever high plus low is divided by 2 again.

427
00:26:27,960 --> 00:26:34,200
So the midpoint of those where either high or low would have just changed, right, because

428
00:26:34,200 --> 00:26:35,759
of this if else.

429
00:26:35,759 --> 00:26:38,839
And this loop will just keep going over and over and over again, making better and better

430
00:26:38,839 --> 00:26:45,839
approximations until we come within plus or minus epsilon of the square root of x.

431
00:26:45,839 --> 00:26:54,279
The difference between this code and what we wrote a few lectures ago is this part down

432
00:26:54,279 --> 00:26:55,439
here.

433
00:26:55,439 --> 00:27:02,119
So a few lectures ago, we all we could do really was write a print statement where we took

434
00:27:02,119 --> 00:27:07,159
our guess that we ended up with, right, and we printed it along with, you know, that

435
00:27:07,159 --> 00:27:12,799
guess is close to the root of our original x.

436
00:27:12,799 --> 00:27:18,000
But instead, since we're writing a function, I would like to take the result, right, my

437
00:27:18,000 --> 00:27:21,039
approximation to x and return it.

438
00:27:21,039 --> 00:27:26,399
So somebody can call this function many, many, many times with different values of x and

439
00:27:26,399 --> 00:27:31,559
figure out a bunch of different approximations for all of these different x's.

440
00:27:31,559 --> 00:27:37,480
So here I have the function calls, right, so I've got bisection root with 4 and bisection

441
00:27:37,480 --> 00:27:39,359
root with 123.

442
00:27:39,359 --> 00:27:42,200
And then I can just print the results of these.

443
00:27:42,200 --> 00:27:46,200
So here is the bisection root function.

444
00:27:46,200 --> 00:27:51,279
I've got my printout commented out because I don't actually need it.

445
00:27:51,279 --> 00:27:55,120
The rest of the code will do something useful with the approximations, right?

446
00:27:55,120 --> 00:28:00,799
So in this case, bisection root of 4 was, gave me a 2.0, so that's the approximation.

447
00:28:00,799 --> 00:28:05,640
And the bisection root of 123 was approximated to 11.09.

448
00:28:05,640 --> 00:28:11,440
Okay.

449
00:28:11,440 --> 00:28:16,799
So what I would like you to do, and this is going to be a little bit involved code, it'll

450
00:28:16,799 --> 00:28:22,640
require some thinking, is to write a function called count the numbers with the square root

451
00:28:22,640 --> 00:28:28,160
close to n plus or minus epsilon.

452
00:28:28,160 --> 00:28:33,640
And I'll help you out by drawing something on the board, but I would like you to do the

453
00:28:33,640 --> 00:28:35,440
code for it.

454
00:28:35,440 --> 00:28:42,240
So the idea here is that you have some n that's given as an input, and you have an epsilon,

455
00:28:42,240 --> 00:28:44,160
that's also given as an input.

456
00:28:44,160 --> 00:28:53,240
What you'd like to find out is how many whole numbers have their square root within plus

457
00:28:53,240 --> 00:28:56,000
or minus epsilon of n.

458
00:28:56,000 --> 00:29:01,440
So this is kind of hard to wrap your mind around without actually drawing a picture.

459
00:29:01,440 --> 00:29:05,200
So this is also something you should try to do in quiz situations, he sets things

460
00:29:05,200 --> 00:29:09,600
like that, don't code right away, try to draw a picture, kind of depicting what we're

461
00:29:09,600 --> 00:29:11,559
asking for here.

462
00:29:11,559 --> 00:29:15,799
So here, we'll start with a line.

463
00:29:15,799 --> 00:29:20,960
This is our number line, because we're doing the square root.

464
00:29:20,960 --> 00:29:24,960
We want to know how many integers have a square root with an epsilon of n.

465
00:29:24,960 --> 00:29:30,039
So let's start with an n, right?

466
00:29:30,039 --> 00:29:33,480
And we have something plus or minus epsilon, right?

467
00:29:33,480 --> 00:29:40,039
So this is epsilon, and this is also epsilon, right?

468
00:29:40,039 --> 00:29:47,319
In the end, we want to know how many integers have a square root, square root of i, so

469
00:29:47,319 --> 00:29:48,319
actually I'll do it.

470
00:29:48,319 --> 00:29:54,440
The square root of i is equal to somewhere in this range.

471
00:29:54,440 --> 00:29:57,640
Does that make sense so far?

472
00:29:57,640 --> 00:29:58,640
That's what we're trying to figure out.

473
00:29:58,640 --> 00:30:02,599
The square root of i is somewhere in this range.

474
00:30:02,599 --> 00:30:08,039
So that means i is going to be some giant number out here, right?

475
00:30:08,039 --> 00:30:13,159
So this line can go further out.

476
00:30:13,159 --> 00:30:19,519
So in the example here, I've got n is equal to 10.

477
00:30:19,519 --> 00:30:27,119
So I know for sure that an i of 100, just kind of us as humans, would work, right?

478
00:30:27,119 --> 00:30:31,279
Because the square root of 100 is probably going to be approximated to pretty darn close

479
00:30:31,279 --> 00:30:33,079
to 10.

480
00:30:33,079 --> 00:30:38,079
So I know that that value will be within plus or minus epsilon of 10.

481
00:30:38,079 --> 00:30:44,759
But there's probably a couple numbers around 100 that also match this criteria, right?

482
00:30:44,759 --> 00:30:52,480
If I take the square root of 99, according to this example, that approximation puts me

483
00:30:52,480 --> 00:30:55,160
within plus or minus epsilon of 10, right?

484
00:30:55,160 --> 00:30:59,279
So it's going to be, you know, square root of 99 is going to be like 9 point, whatever

485
00:30:59,279 --> 00:31:00,279
is here.

486
00:31:00,279 --> 00:31:02,879
9, 5, right?

487
00:31:02,879 --> 00:31:05,720
So that's within plus or minus epsilon.

488
00:31:05,720 --> 00:31:11,039
And similarly, right, square root of 101 and 102 also work.

489
00:31:11,039 --> 00:31:16,519
Because if I take the square root of these guys, that will also put me within plus or minus

490
00:31:16,519 --> 00:31:20,039
epsilon of 10.

491
00:31:20,039 --> 00:31:26,240
So the goal here is basically to figure out these numbers, 99, 101 and 102.

492
00:31:26,240 --> 00:31:31,599
You should use the power of computation and computers being able to do a task really,

493
00:31:31,599 --> 00:31:37,400
really quickly to basically say, I'm just going to brute force my way through this problem

494
00:31:37,400 --> 00:31:46,839
and say, I'm going to test each number one at a time all the way up to some pretty large

495
00:31:46,839 --> 00:31:47,839
number, right?

496
00:31:47,839 --> 00:31:54,279
So you want to make sure you hit 99, 101, 102, maybe going up to maybe n cubed, right?

497
00:31:54,279 --> 00:31:59,839
If you go and take the square root of some i cubed, you know you're going to hit all

498
00:31:59,839 --> 00:32:02,720
these values within plus or minus epsilon.

499
00:32:02,720 --> 00:32:08,240
So you're just going to brute force, look at all the integers between zero and n cubed,

500
00:32:08,240 --> 00:32:13,960
and figure out if this, if they're square root, the approximation of this square root is

501
00:32:13,960 --> 00:32:16,879
within plus or minus epsilon of n.

502
00:32:16,879 --> 00:32:22,960
If it is, keep a counter and increment it, and if it's not, ignore it.

503
00:32:22,960 --> 00:32:28,680
And that's the idea to this question.

504
00:32:28,680 --> 00:32:33,759
Loop and a check, that's it.

505
00:32:33,759 --> 00:32:39,680
And you can definitely feel free to make use of the bisection function that we wrote in

506
00:32:39,680 --> 00:32:40,680
our code, right?

507
00:32:40,680 --> 00:32:44,279
You should definitely use it, because it's very helpful.

508
00:32:44,279 --> 00:32:51,279
So around line 96 is where you can write your code.

509
00:32:51,279 --> 00:33:00,720
All right, does anyone have a start for writing this code, or how would you think about it?

510
00:33:00,720 --> 00:33:01,720
Yes?

511
00:33:01,720 --> 00:33:13,839
For i, for i in range, n cubed.

512
00:33:13,839 --> 00:33:15,839
We can do that.

513
00:33:15,839 --> 00:33:23,319
So this will give me number zero through n cubed.

514
00:33:23,319 --> 00:33:26,319
So I've generated basically this sequence now.

515
00:33:26,319 --> 00:33:28,559
What do I want to do once I have i?

516
00:33:28,559 --> 00:33:32,599
And you can always write a little comment for yourself, what you want to do once you have

517
00:33:32,599 --> 00:33:34,119
i.

518
00:33:34,119 --> 00:33:40,559
So in English, what would you want to do once you have a number like this?

519
00:33:40,559 --> 00:33:42,000
Write the square root, yeah.

520
00:33:42,000 --> 00:33:46,359
Take the square root of i.

521
00:33:46,359 --> 00:33:51,759
How do you want to take the square root of i?

522
00:33:51,759 --> 00:33:57,240
We can, shall we use our bisection root?

523
00:33:57,240 --> 00:33:59,240
We can too.

524
00:33:59,240 --> 00:34:02,839
Yep, we can do both.

525
00:34:02,839 --> 00:34:05,919
So let's use the function we just wrote.

526
00:34:05,920 --> 00:34:13,240
So bisection root of i, this gives me square root.

527
00:34:13,240 --> 00:34:18,880
So now, sqrt is going to be some value here, right?

528
00:34:18,880 --> 00:34:19,880
It could be 10.

529
00:34:19,880 --> 00:34:20,880
It could be 99.5.

530
00:34:20,880 --> 00:34:23,880
It could be 99.7.

531
00:34:23,880 --> 00:34:28,880
What do I do with this number now?

532
00:34:28,880 --> 00:34:30,880
Yes?

533
00:34:30,880 --> 00:34:39,280
Yes, exactly.

534
00:34:39,280 --> 00:34:40,119
Let's use an if statement.

535
00:34:40,119 --> 00:34:44,720
So if, and there's many ways we can, if, if, if, use the if statement, we could do absolute

536
00:34:44,720 --> 00:34:45,720
value, right?

537
00:34:45,720 --> 00:34:47,640
That's what we've been doing already.

538
00:34:47,640 --> 00:34:57,039
So if we take n minus the square root, right?

539
00:34:57,039 --> 00:35:05,079
So n minus this value, we just calculated, is less than epsilon.

540
00:35:05,079 --> 00:35:06,320
All right?

541
00:35:06,320 --> 00:35:19,039
So here we know that square root is within epsilon.

542
00:35:19,039 --> 00:35:20,039
And what do we want to do?

543
00:35:20,039 --> 00:35:27,880
We know that the square is within epsilon.

544
00:35:27,880 --> 00:35:31,480
Well, if we don't know, we can look at the doc string.

545
00:35:31,480 --> 00:35:36,719
So we need to return how many integers have that square root within epsilon of n.

546
00:35:36,719 --> 00:35:38,800
Yeah, exactly.

547
00:35:38,800 --> 00:35:40,039
Keep count of it, right?

548
00:35:40,039 --> 00:35:46,679
So count plus equals one.

549
00:35:46,679 --> 00:35:47,279
Yes.

550
00:35:47,280 --> 00:35:52,840
And I do have to initialize count, count equals zero, right before my limit.

551
00:35:52,840 --> 00:35:54,760
Okay.

552
00:35:54,760 --> 00:35:57,920
Anything else?

553
00:35:57,920 --> 00:36:01,480
Yeah, we do need to return.

554
00:36:01,480 --> 00:36:06,320
So at the end of the loop, we can return our count.

555
00:36:06,320 --> 00:36:07,320
Okay?

556
00:36:07,320 --> 00:36:09,320
Run it.

557
00:36:09,320 --> 00:36:10,320
What is this from?

558
00:36:10,320 --> 00:36:16,920
Oh, this is from the other two lines here.

559
00:36:16,920 --> 00:36:18,000
So four.

560
00:36:18,000 --> 00:36:23,000
I think that works because from the example, there were four numbers that worked.

561
00:36:23,000 --> 00:36:29,320
To double check, we can, or if something went wrong, and the number you got was what you

562
00:36:29,320 --> 00:36:31,920
were expecting.

563
00:36:31,920 --> 00:36:33,960
Again, print statements, very useful.

564
00:36:33,960 --> 00:36:36,400
So we could print the value of i.

565
00:36:36,400 --> 00:36:40,079
So this thing here, we're trying to find the square root of.

566
00:36:40,079 --> 00:36:43,200
And we can print the square root of that value, right?

567
00:36:43,199 --> 00:36:49,119
And so if we actually add it to the code here, we see the four values that we grabbed,

568
00:36:49,119 --> 00:36:53,000
99, 100, 100, 100, 102.

569
00:36:53,000 --> 00:36:59,039
And now that we wrote this code, we can actually make really simple changes to it.

570
00:36:59,039 --> 00:37:01,079
And we have some pretty useful code, right?

571
00:37:01,079 --> 00:37:07,079
So if we make our boundary bigger, 10 plus or minus one, we're going to get more values

572
00:37:07,079 --> 00:37:09,000
that match this criteria, right?

573
00:37:09,000 --> 00:37:12,119
So in fact, we got 40 of them, right?

574
00:37:12,119 --> 00:37:16,960
All the way from 81, all the way up to 120.

575
00:37:16,960 --> 00:37:21,119
They all match the criteria, which is when you take the square root of that value, it's

576
00:37:21,119 --> 00:37:31,319
plus or minus 9 to 11.

577
00:37:31,319 --> 00:37:32,639
Any questions about this example?

578
00:37:32,639 --> 00:37:38,000
I know it's kind of involved, but I hope that actually drawing a picture helped explain

579
00:37:38,000 --> 00:37:39,639
what we were trying to get at.

580
00:37:39,639 --> 00:37:44,559
And at that point, it should have been pretty easy to figure out the structure of the code

581
00:37:44,559 --> 00:37:45,719
itself.

582
00:37:45,719 --> 00:37:46,719
Any questions?

583
00:37:46,719 --> 00:37:47,719
Yes.

584
00:37:47,719 --> 00:37:57,879
It could be smaller.

585
00:37:57,879 --> 00:38:01,839
Yeah, I mean, we could have done an n to the power of four.

586
00:38:01,839 --> 00:38:08,839
We just couldn't do n squared because then we would definitely miss 101 and 102 in that

587
00:38:08,840 --> 00:38:10,720
particular example.

588
00:38:10,720 --> 00:38:17,600
And in fact, if our epsilon is really big, we might, actually, I'm not sure about the

589
00:38:17,600 --> 00:38:21,800
math, but if our epsilon is really big, we might actually need to go bigger than n cubed

590
00:38:21,800 --> 00:38:22,800
as well.

591
00:38:22,800 --> 00:38:24,800
I'd have to think about that.

592
00:38:24,800 --> 00:38:25,800
But we just, it's okay.

593
00:38:25,800 --> 00:38:27,920
I mean, it's fine to make it big.

594
00:38:27,920 --> 00:38:33,000
It doesn't take that much longer to compute because running the function is very quick to

595
00:38:33,000 --> 00:38:34,000
Python anyway.

596
00:38:34,000 --> 00:38:35,000
Yeah.

597
00:38:35,000 --> 00:38:37,000
Yeah, there's a question.

598
00:38:37,000 --> 00:38:38,920
Yeah, I had a similar question.

599
00:38:38,920 --> 00:38:40,920
So is there a reason why we chose n cubed?

600
00:38:40,920 --> 00:38:43,320
It's like a arbitrary number that's big enough.

601
00:38:43,320 --> 00:38:47,039
Yeah, arbitrary number that's big enough.

602
00:38:47,039 --> 00:38:51,039
What we could have also done just along those lines is we could have done something a little

603
00:38:51,039 --> 00:38:57,480
bit smarter in here, where once we find this a number that actually works, like once we

604
00:38:57,480 --> 00:39:03,000
start incrementing our count, we could have some sort of flag that keeps track of as long

605
00:39:03,000 --> 00:39:05,559
as we're incrementing the count, right?

606
00:39:05,559 --> 00:39:09,759
It's going, but at some point you know you're going to reach a number that's too big.

607
00:39:09,759 --> 00:39:13,079
And at that point you can just end the function early, right?

608
00:39:13,079 --> 00:39:17,960
You can just break out of the loop and you don't need to keep looking at, you know, all

609
00:39:17,960 --> 00:39:19,759
the way up to n cubed.

610
00:39:19,759 --> 00:39:24,320
So we could have done something a little bit smarter to make the function just a little

611
00:39:24,320 --> 00:39:29,920
faster with flags.

612
00:39:29,920 --> 00:39:31,000
Would you can try?

613
00:39:31,000 --> 00:39:35,279
So you see if you can have the program stop as soon as you hit 103, right?

614
00:39:35,280 --> 00:39:39,400
See if you can write the program that uses a flag to trigger that event.

615
00:39:39,400 --> 00:39:43,000
And then when that event is true, just break out of the loop or return immediately or something

616
00:39:43,000 --> 00:39:46,519
like that.

617
00:39:46,519 --> 00:39:49,120
Other questions?

618
00:39:49,120 --> 00:39:53,440
Okay.

619
00:39:53,440 --> 00:39:56,000
So let's sum out a little bit on functions.

620
00:39:56,000 --> 00:39:57,880
We did this a little bit last lecture.

621
00:39:57,880 --> 00:39:59,880
This is a function that we actually wrote last lecture.

622
00:39:59,880 --> 00:40:02,920
It was some of odd numbers between a and b.

623
00:40:02,920 --> 00:40:04,960
This was essentially our black box, right?

624
00:40:04,960 --> 00:40:07,519
Remember that now we're writing functions.

625
00:40:07,519 --> 00:40:12,639
We are kind of separating ourselves as a programmer who writes a function, right?

626
00:40:12,639 --> 00:40:18,559
You basically make this nice modular piece of code that can be reused over and over again.

627
00:40:18,559 --> 00:40:22,880
So we're separating that aspect from somebody who's using a function.

628
00:40:22,880 --> 00:40:26,840
So once there's a function already written for you, you just use it in code, right?

629
00:40:26,840 --> 00:40:29,440
Like we use the bisection route here, right?

630
00:40:29,440 --> 00:40:32,360
I know we wrote it, but I guess technically I wrote it.

631
00:40:32,360 --> 00:40:34,880
But here we just kind of used it, right?

632
00:40:34,880 --> 00:40:40,000
And we used it to write this nicer, more complex piece of code.

633
00:40:40,000 --> 00:40:41,200
And so this is what we do.

634
00:40:41,200 --> 00:40:43,039
We basically create this black box.

635
00:40:43,039 --> 00:40:46,160
And once you know the specification or the dox string of the black box, you don't need

636
00:40:46,160 --> 00:40:50,440
to know how it's implemented in order to use it.

637
00:40:50,440 --> 00:40:55,880
But what I wanted to mention is something I mentioned last lecture is the function definition

638
00:40:55,880 --> 00:41:02,320
is just creating a function object inside the memory.

639
00:41:02,320 --> 00:41:05,480
And the name of this function object is the name of the function.

640
00:41:05,480 --> 00:41:12,000
So if we're thinking about the program there as the orange box, we have an object that just

641
00:41:12,000 --> 00:41:19,720
happens to be a function which has some code associated with it whose name is some odd.

642
00:41:19,720 --> 00:41:24,400
And kind of drawing a parallel to that is when we create just the variable as we have been

643
00:41:24,400 --> 00:41:25,720
so far, right?

644
00:41:25,720 --> 00:41:29,160
Here we're creating an object to whose name is low.

645
00:41:29,679 --> 00:41:35,519
So in that same way that black box is basically saying I am creating a function object that

646
00:41:35,519 --> 00:41:39,879
has some code associated with it whose name is some odd.

647
00:41:39,879 --> 00:41:44,759
So in this case, I've got some odd, low, and high as three sort of objects inside my

648
00:41:44,759 --> 00:41:46,279
program.

649
00:41:46,279 --> 00:41:53,000
And then only when I make a function call does the code associated with the function object

650
00:41:53,000 --> 00:41:54,000
run, right?

651
00:41:54,000 --> 00:41:56,799
So up when I'm defining the function, it does not run.

652
00:41:56,800 --> 00:42:01,039
It just stays inside computer memory as an object that exists.

653
00:42:01,039 --> 00:42:05,200
And when I make my function call is when I use that object.

654
00:42:05,200 --> 00:42:14,640
So the function call basically takes my variables and matches them to the function definition.

655
00:42:14,640 --> 00:42:18,920
So A gets matched to low and B gets matched to high.

656
00:42:18,920 --> 00:42:23,840
And low and high in the function call have actual values associated with them, two and

657
00:42:23,840 --> 00:42:26,000
seven.

658
00:42:26,000 --> 00:42:29,159
And so that function will then go ahead and do the work.

659
00:42:29,159 --> 00:42:32,920
And at the end, it's going to return something, either an actual value or none.

660
00:42:32,920 --> 00:42:36,400
And then that actual value replaces the entire function call.

661
00:42:36,400 --> 00:42:42,639
So in my program, the variable my sum here is going to be equal to the right here.

662
00:42:42,639 --> 00:42:47,920
Just a little recap, but hopefully this kind of keeps bringing that point home.

663
00:42:47,920 --> 00:42:53,000
So now we're going to talk about in more detail what exactly happens when we make a function

664
00:42:53,000 --> 00:42:54,000
call.

665
00:42:54,000 --> 00:43:00,320
You can think of the program as sort of taking a pause, right?

666
00:43:00,320 --> 00:43:04,039
I've got my main program and in my main program, I have a function call.

667
00:43:04,039 --> 00:43:06,960
That main program will just pause for a bit.

668
00:43:06,960 --> 00:43:11,280
And that function call, you can treat it as sort of a little mini program that needs to

669
00:43:11,280 --> 00:43:18,920
run and terminate return of value before the main program can resume executing.

670
00:43:18,920 --> 00:43:23,960
So that little mini program, that function call basically creates its own little

671
00:43:24,000 --> 00:43:26,559
environment that it lives in.

672
00:43:26,559 --> 00:43:31,559
So in that little environment, it can create variables just like we would in a regular program.

673
00:43:31,559 --> 00:43:33,199
It can modify variables.

674
00:43:33,199 --> 00:43:35,320
It can print things.

675
00:43:35,320 --> 00:43:38,320
It can do all this work within its body.

676
00:43:38,320 --> 00:43:43,599
And at some point, it'll finish its job, finish its task, and it'll have some value that's

677
00:43:43,599 --> 00:43:46,360
the result of all of that work that it did.

678
00:43:46,360 --> 00:43:50,480
And that value is what it hopefully returns back to the main program and then the main

679
00:43:50,480 --> 00:43:55,920
program can finish its job.

680
00:43:55,920 --> 00:44:00,360
So what's key here is that every time you make a function call, you basically create a

681
00:44:00,360 --> 00:44:02,639
new environment.

682
00:44:02,639 --> 00:44:07,679
And that environment is completely separate from the main program environment.

683
00:44:07,679 --> 00:44:13,119
As soon as the function call terminates, that function call environment disappears.

684
00:44:13,119 --> 00:44:18,400
So any variables that were created within that environment of the function call will also

685
00:44:18,400 --> 00:44:19,400
disappear.

686
00:44:19,400 --> 00:44:23,320
So all we're left with is just what's in the main program.

687
00:44:23,320 --> 00:44:26,480
So now we're going to talk a little bit about environments.

688
00:44:26,480 --> 00:44:32,720
And if you understand this, you'll understand 80% of functions and what to do with them.

689
00:44:32,720 --> 00:44:37,360
So basically, when you first run your program, the program enters what we call the global

690
00:44:37,360 --> 00:44:40,880
environment, the main program environment.

691
00:44:40,880 --> 00:44:45,480
And any time you make a function call, we're creating this new environment.

692
00:44:45,480 --> 00:44:50,519
So what exactly happens when we do these function calls?

693
00:44:50,519 --> 00:44:53,480
How do these environments interact?

694
00:44:53,480 --> 00:44:56,840
And the answer is they don't actually interfere with each other that much.

695
00:44:56,840 --> 00:45:02,800
They only interfere with each other through passing in parameters and through returning

696
00:45:02,800 --> 00:45:04,320
values.

697
00:45:04,320 --> 00:45:08,760
But beyond that, these two different environments, the main program environment and a function

698
00:45:08,760 --> 00:45:13,280
call environment, can actually have variables that have the same name.

699
00:45:13,280 --> 00:45:17,440
But don't interfere with each other because they exist in different environments.

700
00:45:17,440 --> 00:45:22,080
So we're going to look at this example to showcase that.

701
00:45:22,080 --> 00:45:23,600
So here's a function.

702
00:45:23,600 --> 00:45:24,920
It's pretty simple.

703
00:45:24,920 --> 00:45:26,480
It does not do much.

704
00:45:26,480 --> 00:45:31,840
It takes in one parameter, probably a number, and adds one to it.

705
00:45:31,840 --> 00:45:37,160
So it takes in an x and does x plus one, reassigns x to it.

706
00:45:37,160 --> 00:45:41,720
And then it does this print statement and then returns the new value of x.

707
00:45:41,719 --> 00:45:48,079
So it added one to whatever you passed into it and it returns that new value.

708
00:45:48,079 --> 00:45:49,679
So that's the definition.

709
00:45:49,679 --> 00:45:51,799
Again, this just sits in Python memory.

710
00:45:51,799 --> 00:45:55,480
It doesn't actually get run until we make a function call.

711
00:45:55,480 --> 00:46:01,039
The parameters here, when we wrote our function, are called formal parameters because there's

712
00:46:01,039 --> 00:46:03,759
no actual value associated with them.

713
00:46:03,759 --> 00:46:07,599
We're writing this function, assuming that at some point we're going to get a value for

714
00:46:07,599 --> 00:46:09,279
x.

715
00:46:09,280 --> 00:46:12,800
But at the time we're writing the function, there's no value for x.

716
00:46:12,800 --> 00:46:16,080
It's just this abstract variable.

717
00:46:16,080 --> 00:46:20,920
And we're using that variable x within the function body, assuming that at some point we're

718
00:46:20,920 --> 00:46:23,040
going to get an initial value for x.

719
00:46:23,040 --> 00:46:24,160
So x is equal to 3.

720
00:46:24,160 --> 00:46:28,040
And at which point the body can execute.

721
00:46:28,040 --> 00:46:33,600
Now when you make a function call in the main program scope, that's when you make a function

722
00:46:33,600 --> 00:46:36,240
call with an actual parameter.

723
00:46:36,239 --> 00:46:42,159
So here you'll notice I'm using the same name x, but this x inside the main program is

724
00:46:42,159 --> 00:46:47,959
different than the x that's this formal parameter of the function.

725
00:46:47,959 --> 00:46:53,799
This actual parameter, when we make the function call, is mapped to the formal parameter.

726
00:46:53,799 --> 00:46:59,079
So at that point the formal parameter can get the value of the function call, which is

727
00:46:59,079 --> 00:47:00,079
3.

728
00:47:00,799 --> 00:47:06,639
And in fact, it doesn't actually matter what we name this variable out here.

729
00:47:06,639 --> 00:47:11,599
We can name x is equal to 3 and make the function call f of x.

730
00:47:11,599 --> 00:47:17,000
But we can also have y is equal to 3 and we make the exact same function call f of y.

731
00:47:17,000 --> 00:47:20,679
Because we want to pass in 3 as a parameter to this function call.

732
00:47:23,920 --> 00:47:27,400
So this x out here is different than this x over here.

733
00:47:28,400 --> 00:47:30,400
So the re, oh yeah, go ahead.

734
00:47:30,400 --> 00:47:35,400
The formal is the one from the function definition.

735
00:47:35,400 --> 00:47:40,400
We say it's formal because there's no value associated with it when you first write the function.

736
00:47:40,400 --> 00:47:44,400
You write the function first, there's nothing going on here.

737
00:47:44,400 --> 00:47:50,400
And then you have some code that actually now is taking on some values and you can run it.

738
00:47:51,400 --> 00:47:53,400
Yeah.

739
00:47:53,400 --> 00:48:00,400
So let's trace through this code little by little to see exactly what environments get created as we make function calls.

740
00:48:00,400 --> 00:48:02,400
So again, this is my black box.

741
00:48:02,400 --> 00:48:04,400
It's a function.

742
00:48:04,400 --> 00:48:08,400
When I first run the program, we finished the function definition.

743
00:48:08,400 --> 00:48:11,400
So we're at this point in our program right before we do x is equal to 3.

744
00:48:11,400 --> 00:48:19,400
Inside my sort of computer Python memory, what I have is one environment created and that's the environment of the main program.

745
00:48:20,400 --> 00:48:23,400
The only thing I have in this environment is by f, right?

746
00:48:23,400 --> 00:48:29,400
Because at this point in the program where the red arrow is, I just had a function definition.

747
00:48:29,400 --> 00:48:31,400
So again, it's a definition.

748
00:48:31,400 --> 00:48:36,400
It's a function whose name is f and it's an object, right?

749
00:48:36,400 --> 00:48:38,400
It's not being run quite yet.

750
00:48:38,400 --> 00:48:41,400
It's an object that contains some code.

751
00:48:41,400 --> 00:48:43,400
Now we have x is equal to 3.

752
00:48:43,400 --> 00:48:47,400
So that's pretty easy inside my main program environment.

753
00:48:47,400 --> 00:48:50,400
I've got a variable name x whose values 3.

754
00:48:50,400 --> 00:48:53,400
And then I have my function call.

755
00:48:53,400 --> 00:48:59,400
So as soon as Python sees a function call, it creates a new environment.

756
00:48:59,400 --> 00:49:05,400
And the current environment where the call is being made from, so the main program one, will be put on hold.

757
00:49:05,400 --> 00:49:08,400
So here I'm calling function f.

758
00:49:08,400 --> 00:49:16,400
So now I'm creating this new environment that, if I think of it like this many program, this little task that needs to get done before the main program can continue.

759
00:49:16,400 --> 00:49:21,400
So I need to figure out what's going on in this mini program, right?

760
00:49:21,400 --> 00:49:24,400
In this function call to f.

761
00:49:24,400 --> 00:49:28,400
All right, so here's my new environment, the scope of f.

762
00:49:28,400 --> 00:49:31,400
The first thing that we need to do is figure out what are the parameters of f.

763
00:49:31,400 --> 00:49:36,400
So we look at the function definition and we see it has one parameter named x.

764
00:49:36,400 --> 00:49:43,400
So we're going to take that x and the first thing we're going to do is map the formal parameter to the actual parameter.

765
00:49:43,400 --> 00:49:48,400
So we're going to make the formal parameter of f named x.

766
00:49:48,400 --> 00:49:52,400
Take on the value 3.

767
00:49:52,400 --> 00:49:58,400
That's kind of what we've been doing already, but now this is getting down to sort of details.

768
00:49:58,400 --> 00:50:01,400
We've mapped all the parameters.

769
00:50:01,400 --> 00:50:04,400
The body of the function executes.

770
00:50:04,400 --> 00:50:09,400
I've kind of blurred out this one because we're not in this global scope.

771
00:50:09,400 --> 00:50:12,400
We're trying to figure out what f is doing.

772
00:50:12,400 --> 00:50:17,400
The body of f says take x, add one to it, and reassign it to x.

773
00:50:17,400 --> 00:50:19,400
So what's x inside my function?

774
00:50:19,400 --> 00:50:26,400
It's three. We add one to it, and we make x before.

775
00:50:26,400 --> 00:50:34,400
I skipped one thing, which is if in my main program I had y is equal to 3 and f of y, nothing really would have changed.

776
00:50:34,400 --> 00:50:45,400
My formal parameter of f is still x, and I'm still mapping x to the value that's in my here, in the actual parameter.

777
00:50:45,400 --> 00:50:49,400
So in my scope of f, I've got x is 3.

778
00:50:49,400 --> 00:50:54,400
I incremented by 1, gives me 4, and I resave it back into x.

779
00:50:54,400 --> 00:50:59,400
And again, there's no collision here, right, in terms of naming.

780
00:50:59,400 --> 00:51:07,400
Because the scope of f, the environment at f, has a variable named x, and I'm just doing stuff with the x that f knows.

781
00:51:07,400 --> 00:51:13,400
I do have another x inside my global scope, but that one's put on hold for now.

782
00:51:13,400 --> 00:51:17,400
So I've done x equals x plus 1, then I do the print statement.

783
00:51:17,400 --> 00:51:20,400
So in f of x, x equals 4, that gets printed out.

784
00:51:20,400 --> 00:51:25,400
And then I return x, so the thing that gets returned is the value of x, the 4.

785
00:51:25,400 --> 00:51:34,400
And this, again, replaces the function call, so this gets returned back to whoever called me, and the environment that called me was just by main program.

786
00:51:34,400 --> 00:51:38,400
And here I'm going to return 4, and this is going to replace that with 4.

787
00:51:38,400 --> 00:51:44,400
As soon as the function sees the return, and returns that value back, it goes away.

788
00:51:44,400 --> 00:51:47,400
So notice that x that we had created is gone.

789
00:51:47,400 --> 00:51:51,400
Now we're in the main program, there's no confusion, right?

790
00:51:51,400 --> 00:52:03,400
My main program has its own x, that other x that was part of the execution of f is gone, because that function finished its job, and it doesn't need its environment anymore.

791
00:52:03,400 --> 00:52:09,400
So now the return of the function replaces f of x, and we see z is equal to 4.

792
00:52:09,400 --> 00:52:18,400
That was super detailed, but that's kind of what happens step by step when we make a function call with the new environment being created.

793
00:52:18,400 --> 00:52:37,400
So if you can understand that, it should be pretty straightforward, and you won't get confused when you see an x out here, you have f of x as one function, and then maybe another function that has g of x, and so on.

794
00:52:37,400 --> 00:52:43,400
So in order to know the scope that you're in, the environment that you in, you need to know what expression you're evaluating, right?

795
00:52:43,400 --> 00:52:52,400
So here we were evaluating this function call, so that means that we were inside the environment of f.

796
00:52:52,400 --> 00:53:03,400
Another example, and this one's a little bit weird, it shows some of the nuances of Python, and these aren't necessarily true in other languages.

797
00:53:03,400 --> 00:53:10,400
So I'm just going to do the drawing of the scopes out here. So let's start with the one on the left.

798
00:53:10,400 --> 00:53:18,400
So you can see here I've got one function f of y, and I've got the main program that creates x is equal to 5, and then a call to y.

799
00:53:18,400 --> 00:53:25,400
So inside my main program, I've got x is equal to 5, and then I have a function called to f.

800
00:53:26,400 --> 00:53:36,400
Function call means we need to create a new scope. So this one's put on hold for now until we figure out what f parenthesis x is right here.

801
00:53:36,400 --> 00:53:47,400
So the first thing we need to do is grab f, and take all the formal parameters of f. There's one, its name is y, and map them to the actual parameters.

802
00:53:47,400 --> 00:53:54,400
So I'm calling f with 5, so I'm going to map y to 5.

803
00:53:54,400 --> 00:54:06,400
This function is going to take, now do the body of its function, x is equal to 1, so it creates also an x whose value is 1, just within its scope.

804
00:54:06,400 --> 00:54:16,400
It adds 1 to x, so this becomes 2, and then it prints x, so it's going to print 2, and then the function terminates.

805
00:54:16,400 --> 00:54:40,400
So the returns none, right? There's no return statement, and the function is done, so this line has now finished, and the last thing that the function does, after it's done the return is the scope goes away, and the last thing we need to do now is print x, so this will print the value of x in the global scope, which is 5.

806
00:54:40,400 --> 00:54:49,400
So what I'm going to do is put a little piece of code on the left side here is 2 and 5.

807
00:54:49,400 --> 00:55:02,400
Okay, what about the middle code? Similarly, I've got a function definition, and then I create x is equal to 5, and then I make a call to g.

808
00:55:02,400 --> 00:55:20,400
So as soon as I see a function call, I need to create a new scope, and I need to map all the formal parameters of g, it has one formal parameter, its name is y, that one will be mapped to whatever I made the function call with, 5, right?

809
00:55:20,400 --> 00:55:26,400
x is 5 out here, so that gets mapped to 5.

810
00:55:26,400 --> 00:55:52,400
What is this function going to do? Well, it prints x. What's x inside the scope of g? Do I have a g inside x inside g? No. So this is something that Python does, it says, well, if your environment doesn't have a variable named x in this case, look further out and see who called you.

811
00:55:52,400 --> 00:56:05,400
Well, which environment called this g? The main one, right? Does your bigger environment, the one who called you have a variable named x? It does, right? It's 5.

812
00:56:05,400 --> 00:56:17,400
So Python grabs the value associated with that larger environment, and if that larger environment didn't have one, it would look further out and further out until it doesn't have an environment to look at.

813
00:56:17,400 --> 00:56:42,400
So g is going to print the value of x, which is 5, and then it's going to print x plus 1, which is 6, and then it's done. It returns none, and then as soon as it returns none, this scope goes away, and what we're left with is the global program, and we print x, which is still 5.

814
00:56:43,400 --> 00:56:59,400
What I want you to notice is that that function g printed x plus 1, but never modified x. Right? We never said, you know, something like x is equal to x plus 1 or something like that. We just figured out what x plus 1 was and printed it.

815
00:56:59,400 --> 00:57:21,400
Okay. One more example, and this one will actually end up in an error. So here I've got x is equal to 5, just like before, and then I have a function called to h. So again, a function called means a new scope is created. I've got one variable y.

816
00:57:21,400 --> 00:57:39,400
That's my formal parameter. It gets mapped to whatever I call the function with 5. And then what is this function doing? That line x plus equals 1 is x is equal to x plus 1.

817
00:57:39,400 --> 00:57:56,400
This is actually an error. Python doesn't let you do that. And the error gives you is actually what it says there. So unbound local error, local variable x is referenced before an assignment.

818
00:57:56,400 --> 00:58:12,400
So it doesn't actually grab the value from the outer scope like we did in the middle bit. It doesn't grab it because it thinks you're trying to create a variable named x inside h.

819
00:58:12,400 --> 00:58:27,400
And you're trying to add 1 to x. But you never had a line that said x is equal to something originally inside h.

820
00:58:27,400 --> 00:58:41,400
And so when you're trying to say x is equal to x plus 1, it's trying to look for an x inside the scope of h. But it doesn't have one. And so that's where we get that error from.

821
00:58:41,400 --> 00:58:55,400
And this is not something. I mean, it's just a nuance of Python, but it's kind of important to understand that you can access variables, but you can't change variables outside of your scope.

822
00:58:55,400 --> 00:59:14,400
So the middle one just accesses a variable adds 1 to it and prints it, but we never said x is equal to this value. And it's kind of like, I guess the error you get is kind of like if you made this be something completely different like z, you would get the same error.

823
00:59:14,400 --> 00:59:24,400
You know, it would be a variable z reference before assignment. Right? So I can grab x plus 1, but I don't know what z is.

824
00:59:24,400 --> 00:59:53,400
So if you know because if you want to explicitly say that you're taking it from outside, there's a keyword called global that you need to write that explicitly says, hey, I'm grabbing this variable that is not part of the word.

825
00:59:53,400 --> 01:00:01,400
That is not part of me. It's part of the main program, the global stuff.

826
01:00:01,400 --> 01:00:22,400
Okay, the last thing I want to talk about is using functions as arguments to other functions. So the way I've sort of been explaining a function definition is basically saying that when we define a function, Python essentially puts some code in memory whose name is the function name.

827
01:00:22,400 --> 01:00:34,400
Right? So basically the function name creates for me an object inside memory that happens to be a function object. And just to show you sort of what that means is we have a function is even right.

828
01:00:34,400 --> 01:00:47,400
We've definitely created it. If we say the type of is even its function. Right? So the function is even actually has a type and its type is a function in Python.

829
01:00:47,400 --> 01:01:02,400
So functions are basically just objects, just like an integers and object, a Boolean is an object, a float is an object, right? A function, it's an object, it just looks different. It has a bunch of code associated with it.

830
01:01:02,400 --> 01:01:10,400
So if a function is an object, what that means is we can use an assignment operator on a function name.

831
01:01:10,400 --> 01:01:24,400
So we can have two names, that functions that point to the same function code. We can use a function as an argument to another function, like a parameter to a function, or we can return a function from another function.

832
01:01:25,400 --> 01:01:38,400
So here's an example. Pretend that this is our code file. We've got the memory. The first line of code here, the definition basically creates this function object for me in memory.

833
01:01:39,400 --> 01:01:50,400
It's kind of like a variable, right, is underscore even is the name of this function object, and this variable is bound to my function object with some code associated with it.

834
01:01:50,400 --> 01:02:03,400
So you think of the function as just an object. Similarly, right, when we write r is equal to two, I think of that as the same thing, right, r is the name, and I've got an integer object whose values two.

835
01:02:03,400 --> 01:02:16,400
That's exactly what happens when we create a function definition. Similarly, pi is equal to 22 over seven, right, pi is the name associated with the float object that has that value.

836
01:02:16,400 --> 01:02:29,400
So what we can do, right, now that we've established that a function is basically an object with a name, we can say a line like this, my funk equals to is even.

837
01:02:29,400 --> 01:02:45,400
The right hand side here is just the name of my function. It's not a function call, right, notice there's no parentheses after is even there's no parameter, none of that. It's literally the name of my function.

838
01:02:45,400 --> 01:02:57,400
So inside memory, what I've ended up doing is I have two, oops, I have two names, my funk and is even that both point to the exact same function object.

839
01:02:57,400 --> 01:03:14,400
So that means that that function object, so this is even function can be referenced by both of these names. So on the next two lines here, a equals this and b equals this, I'm running the same code just referenced by different names.

840
01:03:14,400 --> 01:03:25,400
So then a is going to be bound to false and b is bound to true because I'm accessing the same code fundamentally by different names. Does that make sense?

841
01:03:25,400 --> 01:03:32,400
Yes, awesome. So everything in Python is an object, including functions, it's strange to think, but there you have it.

842
01:03:33,400 --> 01:03:44,400
So let's look at this code. I've got three function definitions and only one function call.

843
01:03:44,400 --> 01:03:57,400
What are the functions, function definitions? One, I have named calc, it takes in three parameters. One, I have add, it takes in two parameters and one, I have div, it takes in two parameters.

844
01:03:57,400 --> 01:04:08,400
Add does something pretty simple, div has maybe a print statement, but also does something pretty simple. Calc is the one that's really strange, right?

845
01:04:08,400 --> 01:04:22,400
Because it takes in these three parameters, but what's the thing it's doing in here? It's kind of treating one of the parameters, OP, operation as a function.

846
01:04:23,400 --> 01:04:28,400
That's what's strange about calc. So now let's trace through the code to see exactly what that means for us.

847
01:04:28,400 --> 01:04:46,400
So when I first run my program, I have three function definitions. So I'm creating three function objects inside memory. Calc, a function object that has some code, add a function object that has some code, and div, a function object that has some code.

848
01:04:46,400 --> 01:05:02,400
And then we get to the good stuff, res equals the function call. So res is going to be a variable that's going to have a value. What value? We need to figure that out. Calc is a function call.

849
01:05:02,400 --> 01:05:13,400
Every time we have a function call, we need to create a new environment. So now we are creating our calc environment.

850
01:05:13,400 --> 01:05:19,400
So we've put aside the main program scope for now, and we're focusing on what calc is going to do.

851
01:05:19,400 --> 01:05:27,400
First thing we need to do is take every single one of our parameters and map it to the actual parameters, right?

852
01:05:27,400 --> 01:05:45,400
So the first parameter is up. It gets mapped to add. The next parameter is x gets mapped to 2. The last parameter is y gets mapped to 3. Is everyone okay so far? Yes.

853
01:05:45,400 --> 01:05:59,400
Okay, I've literally just matched names of formal parameter to actual parameter. Okay, so now we finished mapping the parameters. Next we get to run the body of the function. Return, what is this?

854
01:05:59,400 --> 01:06:14,400
Let's replace op x and y with the actual values. This basically becomes return a function call add 2,3. I've just replaced the names. That's it.

855
01:06:14,400 --> 01:06:29,400
What's add 2,3? It's another function call, right? So calc is going to have to be put on hold because I have to figure out what add is going to return.

856
01:06:29,400 --> 01:06:48,400
Okay, so what's add going to return for me? Well add 2,3 is what I'm trying to figure out. So I'm going to map a to 2, b to 3. It's going to do 5 as the return. So returns 5 to whoever called it and whoever called it was calc right here.

857
01:06:48,400 --> 01:07:13,400
So this expression here op x, y which was add 2,3 is replaced with 5. Everyone okay so far? Awesome. Okay, and then calc can now finish right notice add finished its job so it went away. Now calc can finally return its value. So it can finish as well. So this one will return 5 to whoever called it which was the main program.

858
01:07:13,400 --> 01:07:29,400
And finally calc has finished its job and it returned 5. So step by step we just kind of trace through the code you know functions out to in and replacing variables wherever needed.

859
01:07:29,400 --> 01:07:38,400
So it's your turn. Tell me what's the value of res given this function called a calc and what's going to get printed.

860
01:07:44,400 --> 01:07:52,400
So we can even write our functions. So in the main program what do I have?

861
01:07:52,400 --> 01:08:09,400
Yep calc and div are my functions. That's it. Which one?

862
01:08:09,400 --> 01:08:20,399
Yeah, res will be the result. Yep. And there is we will have a question mark because we don't know what it is yet. And what's the first thing I need to do?

863
01:08:20,399 --> 01:08:30,399
Yeah, make a new scope exactly. So that's the scope of calc and we're going to map op to div.

864
01:08:30,399 --> 01:08:37,399
What do I have X and Y to 2 and 0. Thank you.

865
01:08:37,399 --> 01:08:44,399
So what's op going to do?

866
01:08:44,399 --> 01:08:54,399
Yes, exactly. We make another scope for div. A is 2 and B is 0.

867
01:08:54,399 --> 01:09:03,399
So we're kind of 2 scopes deep. What's div going to do?

868
01:09:03,399 --> 01:09:09,399
Yep, so div prints out the thing. Denon was 0. And what's div returning?

869
01:09:09,399 --> 01:09:21,399
None. Perfect. So div returns none here to calc. And then div is gone.

870
01:09:21,399 --> 01:09:31,399
And then none gets returned from calc here. And then calc is gone.

871
01:09:31,399 --> 01:09:40,399
And all I'm left with is res equals none. Exactly. The return of calc.

872
01:09:40,399 --> 01:09:50,399
One more example showing scope. Just kind of showcasing these sort of the same idea. So I've got three functions here.

873
01:09:50,399 --> 01:09:59,399
Funk A. Funk B and Funk C. Funk A takes in. You can see no parameters. Funk B takes in one parameter. Funk C takes in two parameters.

874
01:09:59,399 --> 01:10:06,399
And if we scan the code, we see that one of them is weirdly doing something. So it's actually going to be a function.

875
01:10:06,399 --> 01:10:14,399
Because you see we're calling it like a function inside here. So we know F is going to have to be a function.

876
01:10:14,399 --> 01:10:21,399
So if we run this program, first three function definitions basically put some code for us in the memory.

877
01:10:21,399 --> 01:10:28,399
When we make a funk call, sorry, funk a call, this creates a new scope.

878
01:10:28,399 --> 01:10:40,399
A has no parameter. Or funk a has no parameters. So there's nothing to bind. All this function is going to do is print inside funk a and then return none.

879
01:10:40,399 --> 01:10:49,399
So that whole thing is going to print none. Next funk B is going to be another function call right here.

880
01:10:49,399 --> 01:10:58,399
So it creates a function scope right here. We map the formal parameter Y to two.

881
01:10:58,399 --> 01:11:05,399
And then we finish mapping all the parameters and what we need to do next is do the body. So we print inside funk B.

882
01:11:05,399 --> 01:11:10,399
And it just returns the value you passed into it. So not a very smart or interesting function.

883
01:11:10,399 --> 01:11:19,399
So it prints that and returns to back to whoever called it. Whoever called it was here. So this print statement becomes print 5 plus 2.

884
01:11:19,399 --> 01:11:27,399
So that's going to print stuff into the console. And lastly the interesting one is going to be funk C.

885
01:11:27,399 --> 01:11:35,399
So funk C notice I'm calling it with an actual function I have in hand funk B. Right. One of these that I've defined here.

886
01:11:35,399 --> 01:11:46,399
So funk C is a function call. So there's my scope. I am mapping formal parameter f to funk B and Z to three.

887
01:11:46,399 --> 01:11:52,399
So just mapping one by one. And then I'm doing the body of funk C.

888
01:11:52,399 --> 01:11:59,399
So the body says now print this and return this. So we print the statement.

889
01:11:59,399 --> 01:12:09,399
And then the return basically says well what's f function call f Z. We have to figure out what the actual values are.

890
01:12:09,399 --> 01:12:14,399
And it's funk B parentheses three.

891
01:12:14,399 --> 01:12:21,399
So that's another function call which means another function scope. Again not a very smart or interesting function is funk B.

892
01:12:21,399 --> 01:12:27,399
It just takes in the three. It prints inside funk B and it returns the three back to whoever called it.

893
01:12:27,399 --> 01:12:39,399
So that function is done. And then the funk C can terminate and return three to whoever called it which was out here.

894
01:12:39,399 --> 01:12:43,399
And notice as soon as a function call terminates and does a return it immediately.

895
01:12:43,399 --> 01:12:52,399
You know all of its variables everything that got created inside that environment go away they get wiped out.

896
01:12:52,399 --> 01:12:59,399
Okay. Give you about a minute to try this. So write a function that meets the following specifications.

897
01:12:59,399 --> 01:13:04,399
So I have a function named apply criteria is a formal parameter. Right.

898
01:13:04,399 --> 01:13:07,399
So at some point you're going to have a function that does this.

899
01:13:07,399 --> 01:13:11,399
It takes an integer a number an integer and returns a Boolean.

900
01:13:11,399 --> 01:13:15,399
So however a function does that that's what's going to be passed in.

901
01:13:15,399 --> 01:13:24,399
And then an integer. And what I want you to do is tell me how many numbers from zero to n match that criteria.

902
01:13:24,399 --> 01:13:31,399
So when I apply the function criteria to number zero through n how many of those actually return true on that function.

903
01:13:31,399 --> 01:13:38,399
So just to show you something you know what this means concretely here's my function apply.

904
01:13:38,399 --> 01:13:43,399
Here's a function that I could call the apply with is even sorry I lied.

905
01:13:43,399 --> 01:13:46,399
I guess we are seeing is even a few part times in this lecture.

906
01:13:46,399 --> 01:13:54,399
So here's a function is even and basically I run apply by saying I want to run function apply with the name is even.

907
01:13:54,399 --> 01:14:00,399
So here I'm mapping name to numbers zero through ten.

908
01:14:00,399 --> 01:14:06,399
I'll give you about a minute to try it out and then I can write it just so we have some.

909
01:14:06,399 --> 01:14:09,399
So we finish on time.

910
01:14:09,399 --> 01:14:15,399
Does anyone have a start.

911
01:14:15,399 --> 01:14:22,399
So we know we want to touch each number zero through through n to see whether this criteria applies to them right.

912
01:14:22,399 --> 01:14:26,399
So what's the start to get that going.

913
01:14:26,399 --> 01:14:30,399
Yeah.

914
01:14:30,399 --> 01:14:36,399
For i and range n plus one because we want to include n.

915
01:14:36,399 --> 01:14:46,399
How do we apply the function criteria to each one of these values.

916
01:14:46,399 --> 01:14:55,399
Yeah exactly we just say criteria and this name will be replaced with whatever function we're going to call apply with i.

917
01:14:55,399 --> 01:15:01,399
And this criteria i will basically be the return of criteria.

918
01:15:01,399 --> 01:15:03,399
What did I say criteria returns.

919
01:15:03,399 --> 01:15:08,399
It takes in a number and returns a Boolean.

920
01:15:08,399 --> 01:15:12,399
So we know that this is a Boolean.

921
01:15:12,399 --> 01:15:18,399
What do I want to do with this Boolean.

922
01:15:18,399 --> 01:15:20,399
If it's true I want to count it.

923
01:15:20,399 --> 01:15:22,399
If it's not I don't.

924
01:15:22,399 --> 01:15:32,399
So if criteria i count plus equals one.

925
01:15:32,399 --> 01:15:40,399
And let's remember to initialize our count.

926
01:15:40,399 --> 01:15:41,399
And then that's it right.

927
01:15:41,399 --> 01:15:44,399
If it doesn't match then I don't care about doing anything with it.

928
01:15:44,399 --> 01:15:48,399
So then we just return count.

929
01:15:48,399 --> 01:15:55,399
So notice I'm using my function here that's just a parameter kind of like a placeholder for any other function.

930
01:15:55,399 --> 01:16:06,399
So this is even function when it's a parameter to apply will tell me six right zero two four six eight ten.

931
01:16:06,399 --> 01:16:09,399
That's six values that match this criteria.

932
01:16:09,399 --> 01:16:13,399
And what's cool is that I can actually create any function.

933
01:16:13,399 --> 01:16:23,399
So if I want a function that's called is five for example right it takes in a number and returns true if that number is equal to five.

934
01:16:23,399 --> 01:16:27,399
It's still a function that takes in an integer and returns a Boolean.

935
01:16:27,399 --> 01:16:34,399
All I need to do then is run this apply with the function is five.

936
01:16:34,399 --> 01:16:36,399
So I just changed that here.

937
01:16:36,399 --> 01:16:48,399
And then if I run it it should just give me one value right the five of course is one that matches this is five criteria between zero and ten.

938
01:16:48,399 --> 01:16:53,399
Yeah so that's basically it so we saw some function a lot more you can do with functions.

939
01:16:53,399 --> 01:16:58,399
They're basically objects and pythons so they can be manipulated just like you would any other object.

940
01:16:58,399 --> 01:17:04,399
You can have them be parameters to a function you can have them be returned from a function.

941
01:17:04,399 --> 01:17:09,399
You can assign another name to this function body things like that.

942
01:17:09,399 --> 01:17:19,399
I showed you what how to think about environments right so that the naming doesn't get confusing right as soon as a function call is made that means another environment is created.

943
01:17:19,399 --> 01:17:27,399
So variables created within that environment have no influence on other variables created another environment.

944
01:17:27,399 --> 01:17:37,399
And functions are very nice a very nice way for us to write code that can be easily built up on.

945
01:17:37,399 --> 01:17:38,399
That's it. Thank you.

