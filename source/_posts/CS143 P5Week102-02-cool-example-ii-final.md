---
title: CS143 P5Week102 02 Cool Example Ii Final
---

1
00:00:00,000 --> 00:00:04,879
Welcome back.

2
00:00:04,879 --> 00:00:15,359
In this video, we're going to look at another example of cool programming.

3
00:00:15,359 --> 00:00:19,839
This time, let's move beyond the simple hello world kind of examples and onto something

4
00:00:19,839 --> 00:00:23,519
more exciting, say the ever popular factorial function.

5
00:00:23,519 --> 00:00:29,039
So in order to write factorial, we'll need to open up a file in which we can write some

6
00:00:29,039 --> 00:00:30,039
code.

7
00:00:30,039 --> 00:00:33,240
Let me start that.

8
00:00:33,240 --> 00:00:38,379
And recall from last time that every cool program has to have a main class, and the main

9
00:00:38,379 --> 00:00:41,879
class is required to have a main method.

10
00:00:41,879 --> 00:00:44,159
And we don't care what the main method returns.

11
00:00:44,159 --> 00:00:47,079
So we'll just have it return something of type object.

12
00:00:47,079 --> 00:00:52,719
And let me just fill in the skeleton here of the file.

13
00:00:52,719 --> 00:00:54,239
And so now we're ready to write some code.

14
00:00:54,239 --> 00:00:58,120
So what are we going to have the main method do?

15
00:00:58,119 --> 00:01:02,079
Well, before we can actually write factorial before we can get to the guts of this program,

16
00:01:02,079 --> 00:01:06,519
which is actually not very difficult, we need to talk about IOs some more because we're

17
00:01:06,519 --> 00:01:11,679
going to need to be able to read and write numbers.

18
00:01:11,679 --> 00:01:15,920
We're going to be able to read numbers from the user who's running the program and print

19
00:01:15,920 --> 00:01:17,200
them back out.

20
00:01:17,200 --> 00:01:19,280
So let's just review a little bit about IO.

21
00:01:19,280 --> 00:01:22,799
So in order to invoke the IO functions, we need an IO object.

22
00:01:22,799 --> 00:01:27,319
And one of the IO functions is something that prints out a string.

23
00:01:27,319 --> 00:01:32,879
So let's just write a program that we already know how to do just to confirm that we remember

24
00:01:32,879 --> 00:01:34,719
that.

25
00:01:34,719 --> 00:01:43,839
And now we can compile this program and it should just print one.

26
00:01:43,839 --> 00:01:45,519
And let's see, indeed it does.

27
00:01:45,519 --> 00:01:48,000
Okay, so it prints out the number one.

28
00:01:48,000 --> 00:01:53,639
And so now let's come back here and let's talk about how to do input.

29
00:01:53,640 --> 00:01:58,159
So instead of just printing out the number one, let's print out a string that the user

30
00:01:58,159 --> 00:01:59,159
types in.

31
00:01:59,159 --> 00:02:01,719
So in here, we're going to read a string.

32
00:02:01,719 --> 00:02:07,200
And in order to that, we need an IO object because there is another function, another method

33
00:02:07,200 --> 00:02:10,000
called in string.

34
00:02:10,000 --> 00:02:15,599
And so this will read in a string and return a string.

35
00:02:15,599 --> 00:02:21,879
And then to make sure that we get the nice output, let's concatenate onto that string

36
00:02:21,879 --> 00:02:22,879
in new line.

37
00:02:22,879 --> 00:02:29,240
This is just to, when it prints the string back out, it'll be printed on its own line.

38
00:02:29,240 --> 00:02:39,719
So let's try compiling this and stake the compiles.

39
00:02:39,719 --> 00:02:41,000
And now we can run the spin.

40
00:02:41,000 --> 00:02:46,800
Remember the bang command in Unix runs the previous command that began with the same letters.

41
00:02:46,800 --> 00:02:50,560
And now the program runs and it waits because it's waiting for me to type something.

42
00:02:50,560 --> 00:02:53,840
And if I type in one, it prints back one.

43
00:02:53,840 --> 00:02:57,759
And if I type in 42, it gets me back 42.

44
00:02:57,759 --> 00:03:04,759
Alright, so now the next thing we need to talk about is how to convert strings into integers

45
00:03:04,759 --> 00:03:07,960
because if we're going to do factorial, we want to work on integers and not strings.

46
00:03:07,960 --> 00:03:11,199
And at the moment, we're just reading and writing strings.

47
00:03:11,199 --> 00:03:17,879
So there is a library written in cool that does conversion between integers and strings.

48
00:03:17,879 --> 00:03:24,400
And we're going to give the main class here the functionality of that class, which is called

49
00:03:24,400 --> 00:03:28,199
A2i for ASCII to integer.

50
00:03:28,199 --> 00:03:33,079
And that defines a bunch of methods that can convert between strings and integers.

51
00:03:33,079 --> 00:03:36,400
So let's add those commands in here.

52
00:03:36,400 --> 00:03:43,960
So here, here's our string that we've read in.

53
00:03:43,960 --> 00:03:50,400
And what we want to do now is to convert this into an integer.

54
00:03:50,400 --> 00:03:54,600
So let me just add a couple of perenns here.

55
00:03:54,600 --> 00:03:57,319
So there's our string.

56
00:03:57,319 --> 00:04:03,680
And now we're going to invoke on that the method, sorry, we're going to call on that the

57
00:04:03,680 --> 00:04:08,040
function, the method A2i.

58
00:04:08,040 --> 00:04:13,000
And let's just double check here that we've got friends in the right place.

59
00:04:13,000 --> 00:04:14,280
So that's the argument to A2i.

60
00:04:14,280 --> 00:04:18,680
Now recall that when we have a dispatch to a method, it's just sitting by itself with

61
00:04:18,680 --> 00:04:19,680
no object.

62
00:04:19,680 --> 00:04:22,680
It's a dispatch to the self object.

63
00:04:22,680 --> 00:04:25,600
And the self object is the object of the current class that we're in.

64
00:04:25,600 --> 00:04:30,240
In this case, the main object, which has inherited the A2i methods.

65
00:04:30,240 --> 00:04:33,519
And so the A2i function should be defined in there.

66
00:04:33,519 --> 00:04:36,040
Now we have an integer.

67
00:04:36,040 --> 00:04:38,480
And we can do something with that integer if we like.

68
00:04:38,480 --> 00:04:41,160
So let's add more perenns here.

69
00:04:41,160 --> 00:04:44,480
And let's say we just add one to the integer.

70
00:04:44,480 --> 00:04:48,240
And then once we're done with our integer, whatever operation it is that we want to do

71
00:04:48,240 --> 00:04:52,800
on the integer, we need to convert it back to a string so that we can print it out.

72
00:04:52,800 --> 00:04:57,480
And there's an inverse function I2a that will do that.

73
00:04:57,480 --> 00:05:01,160
So I don't know if we have all the perenns in the right places at this point.

74
00:05:01,160 --> 00:05:02,480
So let's just check.

75
00:05:02,480 --> 00:05:06,360
Yes, that looks like that should work.

76
00:05:06,360 --> 00:05:13,080
So this will read in a string, convert it to an integer, add one to it, convert it

77
00:05:13,080 --> 00:05:17,439
back to a string, concatenate on a new line and print it out.

78
00:05:17,439 --> 00:05:19,040
And let's see if all that actually works.

79
00:05:19,040 --> 00:05:20,360
So let's run the compiler.

80
00:05:20,360 --> 00:05:22,199
And we got a problem here.

81
00:05:22,199 --> 00:05:27,160
Ah, it says that we have an undefined class A2i.

82
00:05:27,160 --> 00:05:29,319
And the reason is we didn't supply the code for A2i.

83
00:05:29,319 --> 00:05:33,920
So if we look in our directory here, we'll see I've already copied in the class file for

84
00:05:33,920 --> 00:05:34,920
A2i.

85
00:05:34,920 --> 00:05:36,680
And encourage you to go and look at that code.

86
00:05:36,680 --> 00:05:40,720
It's actually an interesting code to see how the conversions are written and cool.

87
00:05:40,720 --> 00:05:45,319
But now we need to talk about how to compile a program that uses a library.

88
00:05:45,319 --> 00:05:47,920
And the way you do it, it's very simple.

89
00:05:47,920 --> 00:05:52,400
You just list all the class files on the command line when you call the compiler.

90
00:05:52,400 --> 00:05:55,200
And it will read them all in and treat them as a single program.

91
00:05:55,200 --> 00:06:00,000
So in this case, we compile a fact together with A2i.

92
00:06:00,000 --> 00:06:02,080
And that compiles.

93
00:06:02,080 --> 00:06:04,879
And then we can run it.

94
00:06:04,879 --> 00:06:08,920
And now, if I type in three, it prints four.

95
00:06:08,920 --> 00:06:12,079
And if I type in one, it prints two.

96
00:06:12,079 --> 00:06:14,759
And so the program seems to be working.

97
00:06:14,759 --> 00:06:18,319
And now we're almost ready to write our factorial function.

98
00:06:18,319 --> 00:06:19,719
So what do we want to do in factorial?

99
00:06:19,719 --> 00:06:23,000
Well, we want to do something other than just adding one.

100
00:06:23,000 --> 00:06:26,639
Instead, we want to call our special function factorial.

101
00:06:26,639 --> 00:06:31,079
So let's insert a called factorial in here.

102
00:06:31,079 --> 00:06:34,600
And let's get rid of the plus one.

103
00:06:34,600 --> 00:06:37,320
And let's check that we have all the perennies that we need.

104
00:06:37,320 --> 00:06:43,360
So we need to close off the A2i call, the factorial call, the I2a call.

105
00:06:43,360 --> 00:06:46,120
And then that last one should be the outstring call.

106
00:06:46,120 --> 00:06:47,840
And it is.

107
00:06:47,840 --> 00:06:51,200
And so now we can add a method fact to this class.

108
00:06:51,200 --> 00:06:54,439
And fact is going to take an integer argument.

109
00:06:54,439 --> 00:06:55,600
So we need a parameter here.

110
00:06:55,600 --> 00:06:57,800
And its type is int, of course.

111
00:06:57,800 --> 00:07:00,520
And the whole thing is going to return an integer.

112
00:07:00,519 --> 00:07:05,319
And then we need a body of our function.

113
00:07:05,319 --> 00:07:08,399
And probably a good idea here, just

114
00:07:08,399 --> 00:07:10,639
to make sure that we got this much right to do something simple.

115
00:07:10,639 --> 00:07:14,919
So let's just try to make a function that returns one more than its argument.

116
00:07:14,919 --> 00:07:18,039
So this will do exactly the same thing that we had before.

117
00:07:18,039 --> 00:07:21,959
And let's just confirm that that is working.

118
00:07:21,959 --> 00:07:25,039
So we compile with the A2i library.

119
00:07:25,039 --> 00:07:28,479
And now we have a syntax error.

120
00:07:28,480 --> 00:07:33,319
And we see that I forgot the closing semicolon here for the method.

121
00:07:33,319 --> 00:07:38,800
Remember the class body is a list of methods.

122
00:07:38,800 --> 00:07:40,560
And each method is terminated by a semicolon.

123
00:07:43,560 --> 00:07:44,960
Let's try compiling that again.

124
00:07:44,960 --> 00:07:46,080
Now it compiles.

125
00:07:46,080 --> 00:07:47,360
Let's run it.

126
00:07:47,360 --> 00:07:49,759
We type in four, gives us back five.

127
00:07:49,759 --> 00:07:53,960
All right, so it looks like we're ready now to actually write the code for factorial.

128
00:07:53,960 --> 00:07:57,800
And this is going to be anticlimactic, because it's actually a very simple code.

129
00:07:57,800 --> 00:07:59,560
If we write it recursively.

130
00:07:59,560 --> 00:08:01,240
So let's do that.

131
00:08:01,240 --> 00:08:05,000
So how is that going to work?

132
00:08:05,000 --> 00:08:08,639
Well, everybody knows the definition by heart, I hope.

133
00:08:08,639 --> 00:08:14,040
If i is equal to zero, then the factorial of zero is one.

134
00:08:14,040 --> 00:08:18,519
And we have a keyword there, then one.

135
00:08:18,519 --> 00:08:27,759
Otherwise, the factorial is going to be i times the factorial of i minus one.

136
00:08:27,759 --> 00:08:29,560
All right.

137
00:08:29,560 --> 00:08:35,319
And then the statements in cool always end in the keyword fee.

138
00:08:35,319 --> 00:08:38,120
So it's an if then else fee construct.

139
00:08:38,120 --> 00:08:40,480
And that is actually the entire definition.

140
00:08:40,480 --> 00:08:44,360
So now we should have a program that actually computes factorial.

141
00:08:44,360 --> 00:08:45,120
It compiles.

142
00:08:45,120 --> 00:08:46,519
So now let's run it.

143
00:08:46,519 --> 00:08:50,360
So factorial of three is six.

144
00:08:50,360 --> 00:08:55,559
And factorial of six is 720.

145
00:08:55,559 --> 00:08:57,159
That looks right.

146
00:08:57,159 --> 00:09:02,679
And if we try it one more time with a bigger number, we get a large number.

147
00:09:02,679 --> 00:09:04,039
We think that's probably correct.

148
00:09:04,039 --> 00:09:07,679
And so anyway, our factorial function is working.

149
00:09:07,679 --> 00:09:09,039
So now let's come back here.

150
00:09:09,039 --> 00:09:13,719
And just as an exercise, let's rewrite this code iteratively.

151
00:09:13,719 --> 00:09:18,439
So instead of using a recursive function, let's write it using a loop.

152
00:09:18,439 --> 00:09:24,279
And in order to do that, get rid of that code.

153
00:09:24,279 --> 00:09:25,679
What are you going to need?

154
00:09:25,679 --> 00:09:27,279
Well, we're going to need an accumulator here.

155
00:09:27,279 --> 00:09:34,059
We're going to need a local variable that we can use to accumulate the results of the

156
00:09:34,059 --> 00:09:35,919
factorial computation.

157
00:09:35,919 --> 00:09:40,919
And the way to declare local variables in cool is with let statements or let expressions.

158
00:09:40,919 --> 00:09:45,679
So let's call this variable fact for the result of the factorial.

159
00:09:45,679 --> 00:09:49,919
And notice here that I can have a variable that has the same name as the function.

160
00:09:49,919 --> 00:09:54,079
And the partnering language cool will not get confused about that because variables and

161
00:09:54,080 --> 00:09:56,800
functions play different roles.

162
00:09:56,800 --> 00:10:01,680
So we'll have factorial fact, excuse me, it's of type int.

163
00:10:01,680 --> 00:10:06,160
And we need to initialize it to 1.

164
00:10:06,160 --> 00:10:09,320
So that multiplication will work.

165
00:10:09,320 --> 00:10:12,000
I think the default for integers is to be initialized to 0.

166
00:10:12,000 --> 00:10:13,320
And that would not be good.

167
00:10:13,320 --> 00:10:17,840
If we're going to be multiplying up fact with other numbers.

168
00:10:17,840 --> 00:10:18,840
All right.

169
00:10:19,840 --> 00:10:21,800
I let has two parts.

170
00:10:21,800 --> 00:10:24,879
It has the variable or variables that you're declaring.

171
00:10:24,879 --> 00:10:26,800
This could actually be a list of variables.

172
00:10:26,800 --> 00:10:27,960
We only have one this time.

173
00:10:27,960 --> 00:10:34,120
And then it has a body, the expression or the computation in which the fact variable is

174
00:10:34,120 --> 00:10:35,639
available.

175
00:10:35,639 --> 00:10:38,600
And what do we want to do?

176
00:10:38,600 --> 00:10:41,040
So I think we're going to need to have this be a statement block.

177
00:10:41,040 --> 00:10:43,240
We're going to need to have more than one statement in sequence.

178
00:10:43,240 --> 00:10:45,200
And we'll see why in just a minute.

179
00:10:45,200 --> 00:10:46,879
But then we want to have a loop.

180
00:10:46,879 --> 00:10:49,200
And so what is our loop going to do?

181
00:10:49,200 --> 00:10:58,840
Well, we're going to say while i is not equal to 0, what do we, and what do we need to do?

182
00:10:58,840 --> 00:11:05,559
The opening for the loop body, the opening keyword is called loop.

183
00:11:05,559 --> 00:11:09,320
And now I think we're going to need another statement block here.

184
00:11:09,320 --> 00:11:10,840
So let's open up a block.

185
00:11:10,840 --> 00:11:13,279
We're going to need to do more than one thing.

186
00:11:13,279 --> 00:11:21,839
The first thing we want to do is we want to have fact be fact times i.

187
00:11:21,839 --> 00:11:23,639
So we know that i is not 0.

188
00:11:23,639 --> 00:11:29,120
And so we need to multiply the current value of i into fact to accumulate the result.

189
00:11:29,120 --> 00:11:31,879
And then we want to subtract 1 from i.

190
00:11:31,879 --> 00:11:35,240
And notice that the assignment statement in cool is this backward zero.

191
00:11:35,240 --> 00:11:36,240
That's how you do assignment.

192
00:11:36,240 --> 00:11:38,159
It's also how you do initialization.

193
00:11:38,159 --> 00:11:42,360
So initialization of assignment look the same.

194
00:11:42,360 --> 00:11:46,680
And then we can close off our statement block.

195
00:11:46,680 --> 00:11:50,080
So the body of a while loop is always a single expression.

196
00:11:50,080 --> 00:11:56,600
In this case, that expression is a block that consists of two statements.

197
00:11:56,600 --> 00:11:58,960
And then we can close the loop.

198
00:11:58,960 --> 00:12:03,519
And the closing for a loop is the pool keyword.

199
00:12:03,519 --> 00:12:05,560
And then now we're in a statement block.

200
00:12:05,560 --> 00:12:07,159
So this has to end with a semicolon.

201
00:12:07,159 --> 00:12:09,720
Notice the statement block up there from the let.

202
00:12:09,720 --> 00:12:15,639
Now we want the result of the let block or the let expression to be factorial.

203
00:12:15,639 --> 00:12:19,519
So whatever we got out of the while loop, whatever we computed in the while loop,

204
00:12:19,519 --> 00:12:23,560
we want that to be the result of the entire let expression.

205
00:12:23,560 --> 00:12:25,279
So that's the last statement of our block.

206
00:12:25,279 --> 00:12:31,279
Remember the last statement of a statement block is the value of the block.

207
00:12:31,279 --> 00:12:34,600
The body of the let is the result of the let.

208
00:12:34,600 --> 00:12:37,240
So the fact will also be the result of the whole let statements.

209
00:12:37,240 --> 00:12:39,240
It's just the result of the statement block.

210
00:12:39,240 --> 00:12:45,680
And since the body of the factorial of method itself is just the let expression,

211
00:12:45,680 --> 00:12:47,639
the fact will be the result of the whole thing.

212
00:12:47,639 --> 00:12:52,440
And so this, if we've written it haven't made any mistakes, should be an iterative version

213
00:12:52,440 --> 00:12:53,720
of factorial.

214
00:12:53,720 --> 00:12:56,399
So let's compile this.

215
00:12:56,399 --> 00:12:59,399
And amazingly it compiles on the first try.

216
00:12:59,399 --> 00:13:01,919
And now let's run it.

217
00:13:01,919 --> 00:13:03,240
And whoa, it actually works.

218
00:13:03,240 --> 00:13:05,039
So we got six.

219
00:13:05,039 --> 00:13:09,799
And let's just do one more test to see that it's going to start selling that things are

220
00:13:09,799 --> 00:13:12,240
working reasonably well and they are.

221
00:13:12,240 --> 00:13:18,120
Now let me just point out one common mistake that you can easily make and that I make when

222
00:13:18,120 --> 00:13:21,439
I haven't written cool programs for a little while.

223
00:13:21,439 --> 00:13:27,079
If you're a C or programmer or a Java programmer, you might think about writing assignments

224
00:13:27,079 --> 00:13:28,079
like this.

225
00:13:28,079 --> 00:13:31,719
So I just use the equal sign to write assignment that looks completely fine.

226
00:13:31,720 --> 00:13:36,720
If you're familiar with those languages or used to programming in those languages.

227
00:13:36,720 --> 00:13:40,320
And now let's see what happens when we try to compile this.

228
00:13:40,320 --> 00:13:42,600
Compile is just fine.

229
00:13:42,600 --> 00:13:44,639
And then what happens when we try to run it?

230
00:13:44,639 --> 00:13:47,800
Well, it runs as for an input.

231
00:13:47,800 --> 00:13:49,600
So let's give it an input.

232
00:13:49,600 --> 00:13:52,360
And then we see that we run out of heat.

233
00:13:52,360 --> 00:13:54,040
And that looks like an infinite loop.

234
00:13:54,040 --> 00:13:59,160
So we're going around around the loop and consuming memory for some reason.

235
00:13:59,159 --> 00:14:03,299
And we'll get to that much later in the class why this loop actually ends up consuming

236
00:14:03,299 --> 00:14:04,299
memory.

237
00:14:04,299 --> 00:14:10,759
But clearly we don't have enough memory and eventually we run out.

238
00:14:10,759 --> 00:14:13,799
So that's a sure sign of an infinite loop.

239
00:14:13,799 --> 00:14:15,000
So what's going on here?

240
00:14:15,000 --> 00:14:19,639
Well, the thing is that equals operator in cool is the comparison operator.

241
00:14:19,639 --> 00:14:24,720
So up here is you know we compared I was zero and that returns a Boolean.

242
00:14:24,720 --> 00:14:27,199
So these are perfectly valid cool expressions.

243
00:14:27,200 --> 00:14:29,840
They just happen to be Booleans.

244
00:14:29,840 --> 00:14:35,280
And so you don't ever actually update I or factorial in this program.

245
00:14:35,280 --> 00:14:40,560
You're just comparing fact with fact times I and I with I minus one.

246
00:14:40,560 --> 00:14:43,680
And programs perfectly happy to do that.

247
00:14:43,680 --> 00:14:47,480
It just doesn't compute the factorial function and never terminates because I never reaches

248
00:14:47,480 --> 00:14:49,160
zero.

249
00:14:49,160 --> 00:14:52,600
So that concludes our factorial example.

250
00:14:52,600 --> 00:14:58,920
And we'll do one more example next time of a more complicated of a cool program with

251
00:14:58,920 --> 00:15:00,519
some non-trivial data structures.

