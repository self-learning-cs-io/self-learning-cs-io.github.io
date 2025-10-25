---
title: CS143 P4Week102 01 Cool Overview Final
---

1
00:00:00,000 --> 00:00:09,800
Hello, in this and the next few videos I'm going to be giving an overview of Cool, the programming

2
00:00:09,800 --> 00:00:16,719
language for which you'll be writing a compiler.

3
00:00:16,719 --> 00:00:23,800
Cool is the classroom object-oriented language, and the acronym of course is Cool.

4
00:00:23,800 --> 00:00:29,679
And the unique design requirement for Cool is that the compiler has to be able to be written

5
00:00:29,679 --> 00:00:31,440
in a relatively short period of time.

6
00:00:31,440 --> 00:00:38,320
We only have one quarter or in some cases a semester for students to write the compilers.

7
00:00:38,320 --> 00:00:43,000
And so Cool has to be implementable quickly.

8
00:00:43,000 --> 00:00:48,960
And actually since it's used primarily for teaching compilers, the number of Cool compilers

9
00:00:48,960 --> 00:00:53,600
in the world vastly exceeds the number of Cool programs.

10
00:00:53,600 --> 00:00:56,560
So there are many, many more compilers have been written.

11
00:00:56,560 --> 00:00:59,960
There are many questions of compilers, maybe tens of thousands of compilers have been

12
00:00:59,960 --> 00:01:04,799
written for Cool, but probably only some dozens or hundreds of Cool programs.

13
00:01:04,799 --> 00:01:10,120
And so it's probably the only language in existence for which this is true, that the number

14
00:01:10,120 --> 00:01:13,760
of compilers actually exceeds the number of programs.

15
00:01:13,760 --> 00:01:16,359
But it does tell you about the main design requirement.

16
00:01:16,359 --> 00:01:21,439
It's much more important in Cool that the compiler would be easy to write than that it would

17
00:01:21,439 --> 00:01:23,320
be easy to write programs in.

18
00:01:23,319 --> 00:01:28,639
And so there are some quirks in the language, things that have been done specifically to

19
00:01:28,639 --> 00:01:35,519
make it easier to implement, where that wouldn't take away from the teaching value of the

20
00:01:35,519 --> 00:01:40,159
language, but that would make it inconvenient to use the language on a day-to-day basis as

21
00:01:40,159 --> 00:01:43,119
a working programmer.

22
00:01:43,119 --> 00:01:44,280
So what is in the language?

23
00:01:44,280 --> 00:01:49,159
Well, we've tried to design it so that it would give you a taste of modern notions of

24
00:01:49,159 --> 00:01:53,959
abstraction, static typing, reuse through inheritance, automatic memory management.

25
00:01:53,959 --> 00:01:58,840
And there's actually a few more things that we'll talk about when we come to them.

26
00:01:58,840 --> 00:02:00,399
But many things are left out.

27
00:02:00,399 --> 00:02:03,799
We're not going to be able to put everything in the language and have it be implementable

28
00:02:03,799 --> 00:02:04,799
quickly.

29
00:02:04,799 --> 00:02:09,400
We'll be able to cover some things in the lectures, but unfortunately there'll even be some interesting

30
00:02:09,400 --> 00:02:16,199
language ideas that we won't be able to get to in this class.

31
00:02:16,199 --> 00:02:19,280
So the course project is to build a complete compiler.

32
00:02:19,280 --> 00:02:24,239
And specifically you're going to compile cool into MIPS assembly language.

33
00:02:24,239 --> 00:02:27,159
So MIPS is a real instruction set.

34
00:02:27,159 --> 00:02:30,399
It was for a machine that was designed in the 1980s.

35
00:02:30,399 --> 00:02:34,439
And there is a simulator for MIPS that runs on just about any kind of hardware.

36
00:02:34,439 --> 00:02:37,319
And so this makes the whole project very portable.

37
00:02:37,319 --> 00:02:39,799
We can run your compiler.

38
00:02:39,799 --> 00:02:42,319
You can generate MIPS assembly language.

39
00:02:42,319 --> 00:02:45,679
And then that MIPS assembly language can be simulated on just about whatever kind of

40
00:02:45,680 --> 00:02:48,159
machine you have access to.

41
00:02:48,159 --> 00:02:50,760
The project is broken up into five assignments.

42
00:02:50,760 --> 00:02:53,200
First you're going to write a cool program.

43
00:02:53,200 --> 00:02:56,439
And that program itself will be an interpreter to give you a little bit of experience with

44
00:02:56,439 --> 00:02:57,800
writing a simple interpreter.

45
00:02:57,800 --> 00:03:03,600
And then the compiler itself will consist of the four phases that we discussed, lexical

46
00:03:03,600 --> 00:03:07,319
analysis, parsing, semantic analysis, and code generation.

47
00:03:07,319 --> 00:03:11,240
And all of these phases I should emphasize are plug compatible.

48
00:03:11,240 --> 00:03:16,120
Meaning that we have separate implementations, separate reference implementations of each

49
00:03:16,120 --> 00:03:17,200
of these.

50
00:03:17,200 --> 00:03:21,800
And so for example, when you are working on semantic analysis, you'll be able to take the

51
00:03:21,800 --> 00:03:28,160
lexical analysis, parsing, and code generation components from the reference compiler and

52
00:03:28,160 --> 00:03:35,520
plug your semantic analysis into that framework and test it against the reference components.

53
00:03:35,520 --> 00:03:39,400
And so this way if you have trouble with one component or aren't sure that one of your

54
00:03:39,400 --> 00:03:43,800
components is working very well, you won't have a problem in working on a different component

55
00:03:43,800 --> 00:03:46,719
because you're able to test that independently.

56
00:03:46,719 --> 00:03:52,879
And finally, there's no required optimization assignment, but we do have some suggestions

57
00:03:52,879 --> 00:03:55,040
for optimizations that you can do.

58
00:03:55,040 --> 00:03:59,560
And many people have written optimizations for cool.

59
00:03:59,560 --> 00:04:05,040
And so this is an optional assignment if you're interested in learning something about

60
00:04:05,040 --> 00:04:06,080
program optimization.

61
00:04:10,400 --> 00:04:16,720
So let's write the simplest possible cool program.

62
00:04:16,720 --> 00:04:22,280
And the first thing to know is that cool source files end in the extension.cl for cool.

63
00:04:22,280 --> 00:04:25,560
And you can use whatever editor you like to write your programs.

64
00:04:25,560 --> 00:04:28,560
I happen to use Emacs.

65
00:04:28,560 --> 00:04:31,120
You can use some other editor if you like.

66
00:04:31,120 --> 00:04:37,360
And every cool program has to have a class called main.

67
00:04:37,360 --> 00:04:40,199
And let's talk about that for a second.

68
00:04:40,199 --> 00:04:44,439
So a class declaration in cool begins with the keyword class followed by the name of the

69
00:04:44,439 --> 00:04:45,439
class.

70
00:04:45,439 --> 00:04:50,480
So in this case main followed by a pair of curly braces.

71
00:04:50,480 --> 00:04:55,560
And inside the curly braces is where all the stuff that belongs to the class goes.

72
00:04:55,560 --> 00:04:59,280
And every class declaration must be terminated by a semicolon.

73
00:04:59,280 --> 00:05:06,360
So a program consists of a list of class declarations each class declaration terminated by a semicolon.

74
00:05:06,360 --> 00:05:09,040
So that's the structure of a class.

75
00:05:09,040 --> 00:05:12,360
And now we need this class to actually do something.

76
00:05:12,360 --> 00:05:15,120
So we're going to have a method in this class.

77
00:05:15,120 --> 00:05:18,040
And let's call the method main.

78
00:05:18,040 --> 00:05:22,639
In fact, the main method of the main class must always exist.

79
00:05:22,639 --> 00:05:25,840
This is the method that's run to start the program.

80
00:05:25,840 --> 00:05:28,400
And furthermore, this method must take no arguments.

81
00:05:28,400 --> 00:05:32,720
So the argument list for the main method is always empty.

82
00:05:32,720 --> 00:05:35,960
And let's say the main method.

83
00:05:35,960 --> 00:05:39,640
It's body always goes in a pair of curly braces.

84
00:05:39,640 --> 00:05:42,600
So the main method always goes inside curly braces.

85
00:05:42,600 --> 00:05:46,400
And a class consists of a list of such declarations.

86
00:05:46,400 --> 00:05:50,480
And again, those declarations must all be separated by semicolon.

87
00:05:50,480 --> 00:05:53,200
So in or terminate, excuse me, by semicolons.

88
00:05:53,200 --> 00:05:58,760
So in this case, we only have one method in the class, but still has to have it semicolon.

89
00:05:58,760 --> 00:06:00,920
And now we can say what we want the method to actually do.

90
00:06:00,920 --> 00:06:03,800
So this is the place where the code for the method goes.

91
00:06:03,800 --> 00:06:08,480
And let's just have the simplest possible method, the one that just evaluates to the number

92
00:06:08,480 --> 00:06:09,480
one.

93
00:06:09,480 --> 00:06:10,800
OK?

94
00:06:10,800 --> 00:06:17,680
So the cool is an expression language, which means that wherever a piece of code can go,

95
00:06:17,680 --> 00:06:19,240
you can put an arbitrary expression.

96
00:06:19,240 --> 00:06:21,280
Any expression can go there.

97
00:06:21,280 --> 00:06:24,560
There's no explicit return statement for a method.

98
00:06:24,560 --> 00:06:27,960
It's just the value of the method body is the value of the method.

99
00:06:27,960 --> 00:06:30,280
So in this case, we just put the number one in there.

100
00:06:30,279 --> 00:06:33,399
And that will be the value of this method when we run it.

101
00:06:33,399 --> 00:06:35,799
So let's save that.

102
00:06:35,799 --> 00:06:40,199
And now we can try compiling this simple program.

103
00:06:40,199 --> 00:06:41,759
So how do we compile?

104
00:06:41,759 --> 00:06:45,239
The compiler is called cool c for the cool compiler.

105
00:06:45,239 --> 00:06:50,479
And you just give the cool compiler a list of cool source files.

106
00:06:50,479 --> 00:06:53,159
So in this case, there's just one file, one dot CL.

107
00:06:53,159 --> 00:06:57,319
Hit enter and we got a syntax error.

108
00:06:57,319 --> 00:07:00,039
So we have to come back and fix that.

109
00:07:00,040 --> 00:07:08,120
The error says that app or near the open curly brace, online three, there is a mistake.

110
00:07:08,120 --> 00:07:11,960
And I know what the mistake is because I'm a competent cool programmer, at least somewhat

111
00:07:11,960 --> 00:07:14,120
competent cool programmer.

112
00:07:14,120 --> 00:07:16,960
Cool methods must declare their return types.

113
00:07:16,960 --> 00:07:18,879
So we need to put a type here.

114
00:07:18,879 --> 00:07:22,360
And the syntax for the declaration is to put a colon after the name of the method and

115
00:07:22,360 --> 00:07:23,720
the argument list.

116
00:07:23,720 --> 00:07:24,720
And then the name of a type.

117
00:07:24,720 --> 00:07:30,840
And since we're returning the number one for this program, sorry for this method, we might

118
00:07:30,840 --> 00:07:35,200
as well say that the main method is going to return an integer.

119
00:07:35,200 --> 00:07:37,880
So save that.

120
00:07:37,880 --> 00:07:43,640
Go back over to our compilation window and let's compile the program again.

121
00:07:43,640 --> 00:07:45,600
And this time it compiled successfully.

122
00:07:45,600 --> 00:07:52,800
And now if we look in our directory, we see that there is a new file called one dot s.

123
00:07:52,800 --> 00:07:56,240
That's the assembly code for the program one.

124
00:07:56,240 --> 00:07:59,000
And now we can try to run this code.

125
00:07:59,000 --> 00:08:04,960
And the mips simulator is called spim.

126
00:08:04,960 --> 00:08:10,319
And it just takes a assembly file to simulate.

127
00:08:10,319 --> 00:08:14,560
And so we just give it one dot s hit enter and it'll run a whole bunch of stuff is printed

128
00:08:14,560 --> 00:08:15,879
out.

129
00:08:15,879 --> 00:08:21,080
But as you can see, it says part way down that the cool program successfully executed.

130
00:08:21,080 --> 00:08:22,080
So that's good.

131
00:08:22,079 --> 00:08:25,839
And then afterwards there are some statistics and things like number of instructions executed.

132
00:08:25,839 --> 00:08:31,039
The number of loads and stores, number of branches, those things would be interesting if we're

133
00:08:31,039 --> 00:08:32,199
worried about performance.

134
00:08:32,199 --> 00:08:37,319
If we were to say working on the optimization of the compiled code, but we're not doing

135
00:08:37,319 --> 00:08:39,319
that right now.

136
00:08:39,319 --> 00:08:41,120
We're just running programs.

137
00:08:41,120 --> 00:08:42,399
And we can see that this program worked.

138
00:08:42,399 --> 00:08:47,360
So the program ran and it terminates successfully, but it didn't actually produce any output.

139
00:08:47,360 --> 00:08:52,320
And that's because we didn't ask it to produce any output.

140
00:08:52,320 --> 00:08:58,200
If we want to have output, we'd have to go back and modify the program again.

141
00:08:58,200 --> 00:09:02,759
So what this program does currently is it just returns this value, but nothing is done

142
00:09:02,759 --> 00:09:03,759
with that value.

143
00:09:03,759 --> 00:09:05,680
It's not printed out or anything like that.

144
00:09:05,680 --> 00:09:10,800
If you want to have something printed out in a cool program, you have to do that explicitly.

145
00:09:10,800 --> 00:09:16,240
So there's a special class built in a primitive class called IO.

146
00:09:16,240 --> 00:09:20,919
So we can declare a what's called an attribute of this class.

147
00:09:20,919 --> 00:09:23,680
There'll be an IO attribute.

148
00:09:23,680 --> 00:09:25,840
And it'll be called I.

149
00:09:25,840 --> 00:09:30,360
Okay, and I will be an object that we can use to do IO.

150
00:09:30,360 --> 00:09:39,680
So now in our main method here, we could add a call to outstring.

151
00:09:39,680 --> 00:09:43,480
I dot outstring is how we invoke a method.

152
00:09:43,480 --> 00:09:45,519
So outstring is a method of the IO class.

153
00:09:45,519 --> 00:09:48,879
And so we use I to invoke that method.

154
00:09:48,879 --> 00:09:51,600
And then we can pass it a string that we want printed out on the screen.

155
00:09:51,600 --> 00:09:55,560
So for example, we could say hello world.

156
00:10:02,840 --> 00:10:09,279
And now we have to decide what to do with our number one there.

157
00:10:09,279 --> 00:10:11,560
And let me show you one more feature of cool.

158
00:10:11,559 --> 00:10:15,000
Let's leave the one there and let's make it part of a statement block.

159
00:10:15,000 --> 00:10:20,279
So a statement block consists of a sequence of expressions separated by semicolons.

160
00:10:20,279 --> 00:10:21,879
And you can have any number of expressions.

161
00:10:21,879 --> 00:10:28,199
And the semantics of a statement block or an expression block is to just evaluate the expressions in order.

162
00:10:28,199 --> 00:10:31,279
And the value of the block is the value of the last expression.

163
00:10:31,279 --> 00:10:37,599
And now a statement or an expression block has to be included in its own set of curly braces.

164
00:10:37,599 --> 00:10:40,439
Okay, so that now is a valid cool program.

165
00:10:40,440 --> 00:10:42,520
So let me just read this for you.

166
00:10:42,520 --> 00:10:46,560
So the body of the program is a block of expressions.

167
00:10:46,560 --> 00:10:55,200
The first one executes a outstring call to the object guy, which is going to print hello world for us.

168
00:10:55,200 --> 00:11:02,400
And then the second one evaluates to one, which is the value of the entire of the entire method.

169
00:11:02,400 --> 00:11:04,960
Okay, actually, I should say it's a value of the block.

170
00:11:04,960 --> 00:11:05,840
Okay.

171
00:11:05,840 --> 00:11:12,519
And then because the block is the body of the method, the value of the block becomes the value of the entire method.

172
00:11:12,519 --> 00:11:15,680
So one will be returned from this method call.

173
00:11:15,680 --> 00:11:16,639
So let's save this.

174
00:11:19,600 --> 00:11:22,680
Go back over here and let's compile this again.

175
00:11:22,680 --> 00:11:26,879
So it's like I failed to save it.

176
00:11:27,879 --> 00:11:36,879
So let's compile this and we see we have a syntax error.

177
00:11:36,879 --> 00:11:44,879
And so it says online for we have a syntax error at or near our closing curly brace.

178
00:11:44,879 --> 00:11:55,879
And the problem here is that a statement block or an expression block consists of a series or a sequence of expressions terminated by some of the words.

179
00:11:55,879 --> 00:12:03,879
Expression is terminated by some of the columns and we forgot to terminate the last expression in the sequence by its semicolon.

180
00:12:03,879 --> 00:12:07,879
So we have to add that.

181
00:12:07,879 --> 00:12:12,879
And now we should be able to compile this and lo and behold, it compiles correctly.

182
00:12:12,879 --> 00:12:16,600
And then we can run it.

183
00:12:16,600 --> 00:12:20,200
And now we see, oh, we got another mistake.

184
00:12:20,200 --> 00:12:26,200
So we have on when the program ran, it complained that we have a dispatch to void.

185
00:12:26,200 --> 00:12:32,200
So that online for our dispatch was to an object that didn't exist.

186
00:12:32,200 --> 00:12:35,200
And you can see the dispatch call right here to I.

187
00:12:35,200 --> 00:12:41,200
And it doesn't exist because in fact we forgot to allocate an object for I.

188
00:12:42,200 --> 00:12:47,200
So here we declare I to be of type I, but that doesn't actually create any objects.

189
00:12:47,200 --> 00:12:52,200
I just says that this creates a variable name, I, but I doesn't actually have a value.

190
00:12:52,200 --> 00:12:57,200
So if you want I to actually have a value, we have to initialize it to something.

191
00:12:57,200 --> 00:12:59,200
So we can initialize it to a new IO object.

192
00:12:59,200 --> 00:13:06,200
And new here is the way that you allocate new objects in cool and new always takes a type argument.

193
00:13:06,200 --> 00:13:12,200
So in this case, we're creating a new object of type IO and we're assigning it to this object I.

194
00:13:12,200 --> 00:13:17,200
And notice here that I is a is a is what we call a field name in Java.

195
00:13:17,200 --> 00:13:19,200
It's what we call an attribute in cool.

196
00:13:19,200 --> 00:13:25,200
So so these are the data, the data elements of the class.

197
00:13:25,200 --> 00:13:35,200
And so the class can have both names of things that are sort of attributes or fields that hold values as well as methods that can perform computation.

198
00:13:36,200 --> 00:13:40,200
So let's save this and switch back.

199
00:13:40,200 --> 00:13:45,200
And now we'll compile this again.

200
00:13:45,200 --> 00:13:50,200
So it extilt compiles and now we can run it.

201
00:13:50,200 --> 00:13:58,200
And now it runs and low and behold, as you can see down there, third line from the top, it prints out hello world.

202
00:13:59,200 --> 00:14:08,200
And that looks a little bit ugly because the successful execution message is on the same line as our hello world message.

203
00:14:08,200 --> 00:14:10,200
So let's fix that.

204
00:14:10,200 --> 00:14:12,200
Let's come back over here.

205
00:14:12,200 --> 00:14:17,200
And in our string here, we can add a new line at the end of the string.

206
00:14:17,200 --> 00:14:22,200
So backslash in is how you write a new line character in a string.

207
00:14:22,200 --> 00:14:24,200
Save that. Come back over here.

208
00:14:25,200 --> 00:14:26,200
Let's compile.

209
00:14:26,200 --> 00:14:36,200
So if you don't know Unix, bang will repeat the previous expression, the previous command that began with the same prefix that you type after the bang.

210
00:14:36,200 --> 00:14:40,200
So I want to run the last command that began with C, which is to compile.

211
00:14:40,200 --> 00:14:44,200
And then I want to run the last command that began with S, which is to run spin.

212
00:14:44,200 --> 00:14:47,200
And now we can see, ah, there it is, all nice.

213
00:14:47,200 --> 00:14:50,200
Hello world is on a line by itself.

214
00:14:51,200 --> 00:14:53,200
So let's continue now.

215
00:14:53,200 --> 00:14:56,200
Let's clear all this out.

216
00:14:56,200 --> 00:15:00,200
So let me just show you a few variations on the same program.

217
00:15:00,200 --> 00:15:04,200
What I'm going to do here is just rewrite it in a couple of different ways.

218
00:15:04,200 --> 00:15:12,200
So just to illustrate a few features of cool, and get you more familiar with the syntax and also just show some alternative ways to do the same thing.

219
00:15:13,200 --> 00:15:24,200
So, you know, this, this block here of expressions is kind of a clumsy way to implement the hello world program.

220
00:15:24,200 --> 00:15:25,200
So let's get rid of that.

221
00:15:25,200 --> 00:15:27,200
Let's get rid of the block.

222
00:15:27,200 --> 00:15:31,200
Let's get rid of the one here at the end.

223
00:15:31,200 --> 00:15:36,200
Okay, let's just make the statement body a single expression again.

224
00:15:37,200 --> 00:15:41,200
And now the problem we're going to have is that the types won't match.

225
00:15:41,200 --> 00:15:44,200
But just to illustrate that, let me show it to you.

226
00:15:44,200 --> 00:15:47,200
So let's do cool C of 1.cl.

227
00:15:47,200 --> 00:15:55,200
And you'll see here that it complains that the inferred return type I owe of the method main does not conform to the declared return type int.

228
00:15:55,200 --> 00:16:05,200
So coming back over here, the, to the program, the compiler figured out that this expression, i.outstring,

229
00:16:05,200 --> 00:16:07,200
yields an object of type I owe.

230
00:16:07,200 --> 00:16:11,200
So it returns the i object as the results evaluate this expression.

231
00:16:11,200 --> 00:16:13,200
And that does not match the type int.

232
00:16:13,200 --> 00:16:17,200
And so naturally the compiler says, hey, something's wrong with the types.

233
00:16:17,200 --> 00:16:18,200
Well, that's easily repaired.

234
00:16:18,200 --> 00:16:24,200
We can just change the return type of the main method to say it returns something of type I owe.

235
00:16:24,200 --> 00:16:29,200
So let's go back over here and see that that now works.

236
00:16:29,200 --> 00:16:33,200
So we compile the program.

237
00:16:33,200 --> 00:16:36,200
And then we run spin on the output.

238
00:16:36,200 --> 00:16:39,200
And yes, everything still works as expected.

239
00:16:39,200 --> 00:16:42,200
Now we don't have to be so specific about the type over here.

240
00:16:42,200 --> 00:16:46,200
Since we're not actually using the result of the method body for anything.

241
00:16:46,200 --> 00:16:50,200
I mean, the program just exits once it prints the string.

242
00:16:50,200 --> 00:16:53,200
We could have allowed ourselves more flexibility here.

243
00:16:53,200 --> 00:16:57,200
We could have just declared the result type of main to be of type object.

244
00:16:57,200 --> 00:17:01,200
So object is the root of the class hierarchy in cool.

245
00:17:01,200 --> 00:17:05,200
Every other class is a subclass of object.

246
00:17:05,200 --> 00:17:07,200
So let's come back over here.

247
00:17:07,200 --> 00:17:08,200
Let's save this first.

248
00:17:08,200 --> 00:17:11,200
And then we can come back over to our compilation window.

249
00:17:11,200 --> 00:17:14,200
We can compile it.

250
00:17:14,200 --> 00:17:16,200
And we can run it.

251
00:17:16,200 --> 00:17:18,200
And it still works.

252
00:17:18,200 --> 00:17:24,200
So now another thing we can do if we want is we could observe.

253
00:17:24,200 --> 00:17:30,200
Here that this attribute that we declare this field I isn't really necessary here.

254
00:17:30,200 --> 00:17:35,200
We allocate, you know, we have a special name I.

255
00:17:35,200 --> 00:17:39,200
When the main object is constructed to run the program.

256
00:17:39,200 --> 00:17:42,200
A new IO object is allocated to I.

257
00:17:42,200 --> 00:17:45,200
And then that gets used in the main method.

258
00:17:45,200 --> 00:17:48,200
We can actually just do all of that inside the main method itself.

259
00:17:48,200 --> 00:17:52,200
By just allocating a new IO object right here.

260
00:17:52,200 --> 00:17:56,200
And then calling out string on that object.

261
00:17:56,200 --> 00:18:00,200
So this should also work.

262
00:18:00,200 --> 00:18:06,200
And let's check it out.

263
00:18:06,200 --> 00:18:08,200
So it compiles.

264
00:18:08,200 --> 00:18:11,200
And low and behold it runs.

265
00:18:11,200 --> 00:18:13,200
So coming back over here.

266
00:18:13,200 --> 00:18:16,200
Let's illustrate one more or a couple more things that we could do.

267
00:18:16,200 --> 00:18:22,200
So we could also say that class main inherits from IO.

268
00:18:22,200 --> 00:18:27,200
So we have to have the IO functionality somewhere in order to call the outstring method.

269
00:18:27,200 --> 00:18:30,200
So we've been doing that by creating a separate object of type IO.

270
00:18:30,200 --> 00:18:33,200
But now we could say well just the main object is itself.

271
00:18:33,200 --> 00:18:38,200
And something that has all the capabilities of IO by inheriting from IO.

272
00:18:38,200 --> 00:18:43,200
And if you've seen any object oriented language before this will be a familiar concept.

273
00:18:43,200 --> 00:18:51,200
So main here gets all the attributes and methods of IO in addition to whatever attributes and methods of its own that it will have.

274
00:18:51,200 --> 00:18:58,200
And now instead of having to allocate a new IO object in order to call out string.

275
00:18:58,200 --> 00:19:04,200
We can just invoke it on self, which is the name of the current object when the main method runs.

276
00:19:04,200 --> 00:19:09,200
And other languages self is called this.

277
00:19:09,200 --> 00:19:10,200
Okay.

278
00:19:10,200 --> 00:19:12,200
And so let's we saved it.

279
00:19:12,200 --> 00:19:14,200
So now let's go over and compile this.

280
00:19:14,200 --> 00:19:15,200
So we compile it.

281
00:19:15,200 --> 00:19:18,200
It compiles and it runs.

282
00:19:18,200 --> 00:19:19,200
All right.

283
00:19:19,200 --> 00:19:23,200
So last example here.

284
00:19:23,200 --> 00:19:27,200
We don't have to name self actually in this dispatch.

285
00:19:27,200 --> 00:19:34,200
So there's a feature that allows us to call a method without explicitly naming the object on which it's dispatched.

286
00:19:34,200 --> 00:19:36,200
And that defaults to self.

287
00:19:36,200 --> 00:19:40,200
So if no object is named in a dispatch, then it's just a dispatched self.

288
00:19:40,200 --> 00:19:44,200
So this should also work.

289
00:19:44,200 --> 00:19:49,200
And indeed it does.

290
00:19:49,200 --> 00:19:51,200
So that concludes our first example.

291
00:19:51,200 --> 00:19:58,200
In the next couple of videos, we'll look at some more complex examples of cool programming.

