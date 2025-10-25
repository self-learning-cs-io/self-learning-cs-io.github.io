---
title: CS143 P81Week611 06 Stack Machines
---

1
00:00:00,000 --> 00:00:08,500
In this video, we're going to move beyond our discussion of runtime organization and begin

2
00:00:08,500 --> 00:00:11,080
talking about code generation.

3
00:00:11,080 --> 00:00:15,839
And in this first, you know, it will be quite a long series of videos on code generation.

4
00:00:15,839 --> 00:00:20,179
We're going to talk about the simplest model for code generation, which is called a stack

5
00:00:20,179 --> 00:00:25,660
machine.

6
00:00:25,660 --> 00:00:30,179
So in a stack machine, you might guess that the primary storage is some kind of a stack,

7
00:00:30,179 --> 00:00:31,179
and you would be right.

8
00:00:31,179 --> 00:00:35,740
In fact, the only storage that a stack machine has is a stack.

9
00:00:35,740 --> 00:00:40,780
And the way a stack machine works is that it executes an instruction.

10
00:00:40,780 --> 00:00:42,740
All instructions have the form.

11
00:00:42,740 --> 00:00:49,060
There's some function of some arguments, and they produce one result.

12
00:00:49,060 --> 00:00:52,620
And what that does is it'll pop in operands from the stack.

13
00:00:52,619 --> 00:00:57,179
So the arguments A1 through AN are stored at the top of the stack.

14
00:00:57,179 --> 00:01:03,379
It will then compute the function F using those operands, and it will push the result

15
00:01:03,379 --> 00:01:05,859
R back on top of the stack.

16
00:01:05,859 --> 00:01:09,420
Okay, so let's take a look at a simple example.

17
00:01:09,420 --> 00:01:14,859
Let's see how we would compute 7 plus 5 using a stack machine.

18
00:01:14,859 --> 00:01:18,259
So we would have our stack.

19
00:01:18,260 --> 00:01:23,500
And initially the stack might have already have some stuff on it, but we don't care what

20
00:01:23,500 --> 00:01:24,500
that stuff is.

21
00:01:24,500 --> 00:01:27,540
And so it executes 7 plus 5.

22
00:01:27,540 --> 00:01:31,820
What we would do, well, first we will have to get the 7 and the 5 onto the stack.

23
00:01:31,820 --> 00:01:35,780
So as we get pushed onto the stack, and we'll say more about how that happens in a minute.

24
00:01:35,780 --> 00:01:39,100
Let's say that 7 and 5 are both on the stack.

25
00:01:39,100 --> 00:01:41,580
And so now we want to compute the addition of 7 and 5.

26
00:01:41,580 --> 00:01:44,260
So addition takes two arguments.

27
00:01:44,260 --> 00:01:48,500
So we would pop the two arguments off the stack.

28
00:01:48,500 --> 00:01:51,180
And we wind up with the 5 and the 7.

29
00:01:51,180 --> 00:01:52,260
Popped off the stack.

30
00:01:52,260 --> 00:01:55,460
We would perform the operation plus.

31
00:01:55,460 --> 00:01:58,700
And then the result would get pushed back onto the stack.

32
00:01:58,700 --> 00:02:00,900
So this would be equal to 12.

33
00:02:00,900 --> 00:02:05,100
And then 12 would get pushed back onto our stack.

34
00:02:07,340 --> 00:02:12,939
Okay, and now notice that I did indicate that there might be some other stuff on the stack

35
00:02:12,939 --> 00:02:13,439
already.

36
00:02:13,439 --> 00:02:15,719
Let me just give that stuff a name.

37
00:02:15,719 --> 00:02:18,960
And let me talk about one very important property of the stack machine.

38
00:02:18,960 --> 00:02:25,120
So notice that when we evaluated 7 plus 5, we wound up in a situation where the result

39
00:02:25,120 --> 00:02:27,759
of that operation was on top of the stack.

40
00:02:27,759 --> 00:02:30,520
Okay, and the initial stack contents was unchanged.

41
00:02:30,520 --> 00:02:34,840
This stack, the stuff that was below the arguments that we were interested in, didn't

42
00:02:34,840 --> 00:02:35,840
get modified.

43
00:02:35,840 --> 00:02:41,520
Okay, so it survived through all the operations unchanged.

44
00:02:41,520 --> 00:02:46,480
And this is an important property of a stack machine that we will exploit.

45
00:02:46,480 --> 00:02:52,520
And the general, and just to say what the general property is, when you evaluate an expression,

46
00:02:52,520 --> 00:02:55,280
the result of the expression will be on top of the stack.

47
00:02:55,280 --> 00:03:01,280
And the contents of the stack prior to beginning evaluation of the expression will be preserved.

48
00:03:01,280 --> 00:03:07,360
So now let's think about how we could program a stack machine.

49
00:03:07,360 --> 00:03:11,720
So let's have a language with just two instructions in it.

50
00:03:11,720 --> 00:03:16,760
We can push an integer onto the stack, and then we have the operation add, which will add

51
00:03:16,760 --> 00:03:19,000
the two integers at the top of the stack.

52
00:03:19,000 --> 00:03:24,200
And now let's take a look at this program, which pushes 7 and then pushes 5 and then doesn't

53
00:03:24,200 --> 00:03:25,200
add.

54
00:03:25,200 --> 00:03:27,840
And so let's think about how this program would work.

55
00:03:27,840 --> 00:03:30,720
Okay, so we have our stack contents.

56
00:03:30,720 --> 00:03:34,160
And now the first instruction is to push 7.

57
00:03:34,159 --> 00:03:38,400
So we wind up with a 7 on the stack, added to the stack.

58
00:03:38,400 --> 00:03:40,359
And now we push 5.

59
00:03:40,359 --> 00:03:48,199
Okay, so in the next step, we'll have 5 and 7 on top of the stack.

60
00:03:48,199 --> 00:03:52,840
Then we'll perform the add, and that will pop these two elements off the stack and add

61
00:03:52,840 --> 00:03:57,199
them and push the result back on.

62
00:03:57,199 --> 00:04:01,000
And we'll wind up with 12 on the stack.

63
00:04:01,000 --> 00:04:07,639
And again, the original stack contents are preserved.

64
00:04:07,639 --> 00:04:12,240
Now one interesting property of stack machine code is that the location of the operands and

65
00:04:12,240 --> 00:04:16,240
result is not explicitly stated in the instruction.

66
00:04:16,240 --> 00:04:20,879
And that's because these instructions always refer to the top of the stack.

67
00:04:20,879 --> 00:04:25,720
And this is in contrast to a register machine or register instructions that explicitly

68
00:04:25,720 --> 00:04:30,560
name where they take their operands from and where they put their results.

69
00:04:30,560 --> 00:04:35,600
So for example, you might be familiar from seeing some machine code or assembly code in

70
00:04:35,600 --> 00:04:41,199
the past that an add instruction might typically take three registers, two for the arguments

71
00:04:41,199 --> 00:04:48,000
that are going to be added together and one for the destination for the result.

72
00:04:48,000 --> 00:04:54,480
Whereas in the stack machine, we just have a single word add and no explicit naming of

73
00:04:54,480 --> 00:04:57,879
the arguments because it's fixed where the arguments will come from.

74
00:04:57,879 --> 00:05:01,759
The arguments will always be popped from the stack and the result will always be placed

75
00:05:01,759 --> 00:05:03,759
back on top of the stack.

76
00:05:03,759 --> 00:05:08,480
And the interesting property here is that this leads to more compact programs because you

77
00:05:08,480 --> 00:05:14,079
have to say less in the instructions, the programs themselves are actually quite a bit smaller

78
00:05:14,079 --> 00:05:16,959
than register machine programs.

79
00:05:16,959 --> 00:05:22,959
And this is one of the reasons that Java bytecode uses a stack evaluation model because

80
00:05:23,039 --> 00:05:29,560
it leads to more compact programs and especially in the early days of Java when it was fairly

81
00:05:29,560 --> 00:05:35,560
expensive to ship these programs around the internet to download them having very small

82
00:05:35,560 --> 00:05:37,519
compact code was a good property.

83
00:05:37,519 --> 00:05:42,599
Now you might wonder why would we prefer a register machine?

84
00:05:42,599 --> 00:05:46,399
And the answer is that register machine code is generally faster because we can place

85
00:05:46,399 --> 00:05:49,959
the data exactly where we wanted it to be.

86
00:05:49,959 --> 00:05:55,359
We will generally have fewer intermediate operations and less manipulation of the stack,

87
00:05:55,359 --> 00:05:58,639
pushing and popping stuff to get to the data that we want.

88
00:05:58,639 --> 00:06:02,599
And it turns out that there is an intermediate point between a pure stack machine and a pure

89
00:06:02,599 --> 00:06:04,599
register machine that's interesting.

90
00:06:04,599 --> 00:06:07,560
This is called an N register stack machine.

91
00:06:07,560 --> 00:06:12,560
And conceptually the idea behind an N register stack machine is just to keep the top and locations

92
00:06:12,560 --> 00:06:15,479
of the stack in registers.

93
00:06:15,480 --> 00:06:20,000
And the particular variant of the N register stack machine that we will be particularly

94
00:06:20,000 --> 00:06:23,759
interested in is the one register stack machine because it turns out that you get quite a

95
00:06:23,759 --> 00:06:30,600
bit of benefit by even having a single register that's dedicated to the top of the stack.

96
00:06:30,600 --> 00:06:33,120
This register is called the accumulator.

97
00:06:33,120 --> 00:06:36,200
So the dedicated register here is called the accumulator.

98
00:06:36,200 --> 00:06:41,720
It's called that because intuitively it accumulates the results of operations and then all the

99
00:06:41,720 --> 00:06:44,759
other data lives on the stack.

100
00:06:45,759 --> 00:06:48,759
So what is the advantage of a one register stack machine?

101
00:06:48,759 --> 00:06:54,039
Well, let's think about the add instruction and how it works in the pure stack machine.

102
00:06:54,039 --> 00:06:57,079
So in the pure stack machine, what is the add instruction going to do?

103
00:06:57,079 --> 00:07:04,240
Well, it's going to pop two arguments from the stack, say five and seven.

104
00:07:04,240 --> 00:07:06,439
And it's going to add them.

105
00:07:06,439 --> 00:07:11,079
And then it's going to put the result back onto the stack.

106
00:07:12,079 --> 00:07:15,159
Let's just name the rest of the stack contents there.

107
00:07:15,159 --> 00:07:17,680
And that requires three memory operations.

108
00:07:17,680 --> 00:07:23,120
Have to load two arguments and then store one result.

109
00:07:23,120 --> 00:07:27,199
But in the one register stack machine, the add operation actually does a lot of its work

110
00:07:27,199 --> 00:07:29,599
out of the one register.

111
00:07:29,599 --> 00:07:34,680
So one of the arguments is already stored in the register because that's the conceptually

112
00:07:34,680 --> 00:07:37,079
the top of the stack.

113
00:07:37,079 --> 00:07:40,620
And the result will be pushed back onto the top of the stack, which again is just the

114
00:07:40,620 --> 00:07:41,620
accumulator register.

115
00:07:41,620 --> 00:07:45,800
So here one of the arguments and the right are both taken from registers.

116
00:07:45,800 --> 00:07:50,759
And there's only one memory reference to get the second argument from the portion of

117
00:07:50,759 --> 00:07:55,439
the stack that's stored in memory.

118
00:07:55,439 --> 00:08:00,639
So in general, let's think about how we would evaluate an arbitrary expression using a

119
00:08:00,639 --> 00:08:01,639
stack machine.

120
00:08:01,639 --> 00:08:04,839
So now this isn't, I should say, you know, just stack machine code like we were looking

121
00:08:04,839 --> 00:08:05,839
before.

122
00:08:05,839 --> 00:08:08,959
This is not just a sequence of byte code level operations.

123
00:08:08,959 --> 00:08:12,519
This is actually a full expression as you might find in cool.

124
00:08:12,519 --> 00:08:17,560
So there are other complex expressions nested inside of some operation.

125
00:08:17,560 --> 00:08:18,560
All right.

126
00:08:18,560 --> 00:08:22,559
And so if we have an operation that takes n arguments and those arguments are expressions

127
00:08:22,559 --> 00:08:27,399
that themselves need to be evaluated, here's a general strategy for doing that with a stack

128
00:08:27,399 --> 00:08:28,399
machine.

129
00:08:28,399 --> 00:08:34,240
So for each of the sub-expressions, each of the arguments in order, we're going to evaluate

130
00:08:34,240 --> 00:08:38,279
it recursively using the same stack machine strategy.

131
00:08:38,279 --> 00:08:44,279
And that will end up putting the result when we evaluate EI recursively, the result will

132
00:08:44,279 --> 00:08:45,879
be in the accumulator.

133
00:08:45,879 --> 00:08:46,879
Okay.

134
00:08:46,879 --> 00:08:49,240
So the result is in the accumulator.

135
00:08:49,240 --> 00:08:51,240
All right.

136
00:08:51,240 --> 00:08:53,919
And then we're going to push that result onto the memory stack.

137
00:08:53,919 --> 00:08:57,120
So we're going to take that result and we're going to free up the accumulator and save

138
00:08:57,120 --> 00:09:01,919
it on the stack, the portion of the stack that's in memory.

139
00:09:01,919 --> 00:09:02,919
Okay.

140
00:09:02,919 --> 00:09:08,240
Now we do this evaluating the sub-expressions for the first n minus one argument.

141
00:09:08,240 --> 00:09:10,399
So everything except the last one.

142
00:09:10,399 --> 00:09:11,399
Okay.

143
00:09:11,399 --> 00:09:12,919
We're going to use this same strategy.

144
00:09:12,919 --> 00:09:18,599
For the last one, for EN, we just evaluate.

145
00:09:18,599 --> 00:09:20,639
We don't push the result on the stack.

146
00:09:20,639 --> 00:09:23,360
That just means that the result is left in the accumulator.

147
00:09:23,360 --> 00:09:24,360
Okay.

148
00:09:24,360 --> 00:09:29,480
So now we have one of the arguments of op in the accumulator, the last one we evaluated,

149
00:09:29,480 --> 00:09:33,879
and the other n minus one are on the top of the portion of the stack that's in memory.

150
00:09:33,879 --> 00:09:39,920
So then what we have to do is we pop n minus one values from the stack and then compute

151
00:09:39,920 --> 00:09:44,879
op using those n minus one values plus the value in the accumulator and we store the result

152
00:09:44,879 --> 00:09:46,240
back into the accumulator.

153
00:09:46,240 --> 00:09:47,240
Okay.

154
00:09:47,240 --> 00:09:53,480
So that's the general strategy for evaluating an expression using a stack machine.

155
00:09:53,480 --> 00:09:56,159
So let's do this now for a simple example.

156
00:09:56,159 --> 00:10:01,519
Let's take our same example that we've been using and let's evaluate the expression 7

157
00:10:01,519 --> 00:10:03,079
plus 5.

158
00:10:03,079 --> 00:10:04,079
So how would we do that?

159
00:10:04,079 --> 00:10:08,120
Well, we're evaluating a plus expression and that takes two arguments, two expressions

160
00:10:08,120 --> 00:10:10,319
and so we had to evaluate each of those.

161
00:10:10,319 --> 00:10:12,360
So first we evaluate the expression 7.

162
00:10:12,360 --> 00:10:16,639
Let me actually draw our stack here.

163
00:10:16,639 --> 00:10:17,639
Okay.

164
00:10:17,639 --> 00:10:20,039
So we have our initial contents of the stack.

165
00:10:20,039 --> 00:10:22,240
We have our initial accumulator.

166
00:10:22,960 --> 00:10:25,159
So now we're evaluating 7.

167
00:10:25,159 --> 00:10:26,159
Okay.

168
00:10:26,159 --> 00:10:29,440
And of course a constant will just evaluate to itself and the result is stored in the

169
00:10:29,440 --> 00:10:30,440
accumulator.

170
00:10:30,440 --> 00:10:31,440
Okay.

171
00:10:31,440 --> 00:10:33,639
So that's the first step after evaluating 7.

172
00:10:33,639 --> 00:10:38,399
And now because that's the first argument to plus it has to get pushed on to the stack,

173
00:10:38,399 --> 00:10:40,039
the portion of the stack in main memory.

174
00:10:40,039 --> 00:10:46,080
So now we have a situation that looks like this.

175
00:10:46,080 --> 00:10:47,080
All right.

176
00:10:47,080 --> 00:10:50,879
And of course the 7 is still in the accumulator but we're now about to overwrite.

177
00:10:50,879 --> 00:10:53,600
We're not going to use that value again.

178
00:10:53,600 --> 00:10:57,039
Because the next thing we're going to do is evaluate the second argument, two plus

179
00:10:57,039 --> 00:11:01,240
and that happens to be in this case also a constant expression 5.

180
00:11:01,240 --> 00:11:04,240
And so that will get evaluated and then stored in the accumulator.

181
00:11:04,240 --> 00:11:05,240
Okay.

182
00:11:05,240 --> 00:11:06,240
So I will overwrite the 7.

183
00:11:06,240 --> 00:11:07,240
Okay.

184
00:11:07,240 --> 00:11:09,240
So it'll be a 5 there.

185
00:11:09,240 --> 00:11:10,240
All right.

186
00:11:10,240 --> 00:11:13,080
And now we've evaluated both arguments.

187
00:11:13,080 --> 00:11:14,080
Okay.

188
00:11:14,080 --> 00:11:18,120
And remember, in the case of just having two arguments, the first argument gets evaluated

189
00:11:18,120 --> 00:11:19,120
and saved on the stack.

190
00:11:19,120 --> 00:11:22,399
So we don't lose the value when we evaluate the second argument.

191
00:11:22,399 --> 00:11:27,000
And the second argument since it's the last one we can just leave in the accumulator.

192
00:11:27,000 --> 00:11:29,279
And now we actually evaluate the plus.

193
00:11:29,279 --> 00:11:30,279
Okay.

194
00:11:30,279 --> 00:11:41,639
So we do the accumulator gets the accumulator plus the top of the memory stack.

195
00:11:41,639 --> 00:11:47,080
So in this case that results in adding 7 and 5.

196
00:11:47,080 --> 00:11:51,480
And we wind up and we of course we pop the argument from the memory stack.

197
00:11:51,480 --> 00:11:52,480
All right.

198
00:11:52,480 --> 00:11:56,040
So we have just the original contents there.

199
00:11:56,040 --> 00:11:57,720
And now the value 12.

200
00:11:57,720 --> 00:12:02,960
In the accumulator.

201
00:12:02,960 --> 00:12:09,759
So as I think you can see from the example, the invariant that we're going to maintain

202
00:12:09,759 --> 00:12:15,360
with a stack machine is that after we evaluate an expression E, the accumulator holds the

203
00:12:15,360 --> 00:12:19,800
value of E. So the result of evaluating E winds up in the accumulator and the stack is

204
00:12:19,800 --> 00:12:20,800
unchanged.

205
00:12:20,800 --> 00:12:21,800
Okay.

206
00:12:21,800 --> 00:12:27,560
So the stack, the memory portion of the stack is whatever it was before we started evaluating

207
00:12:27,560 --> 00:12:31,960
E. And this is a very, very important property.

208
00:12:31,960 --> 00:12:39,759
Expression evaluation preserves the stack.

209
00:12:39,759 --> 00:12:43,799
So now let's look at a more elaborate example, just slightly more elaborate.

210
00:12:43,799 --> 00:12:47,960
Three plus seven plus five.

211
00:12:47,960 --> 00:12:52,840
And the interesting thing about this example is that now one of the arguments to the outer

212
00:12:52,840 --> 00:12:56,399
plus is itself a compound expression.

213
00:12:56,399 --> 00:13:01,319
So we'll have to be that will have to be evaluated recursively as part of evaluating the entire

214
00:13:01,319 --> 00:13:02,319
expression.

215
00:13:02,319 --> 00:13:04,039
So let's see how this works.

216
00:13:04,039 --> 00:13:07,439
So the first thing is going to happen where we're evaluating the outer plus.

217
00:13:07,440 --> 00:13:09,960
We're going to evaluate the first argument to that plus.

218
00:13:09,960 --> 00:13:11,480
That's just the constant three.

219
00:13:11,480 --> 00:13:13,800
So that will get loaded into the accumulator.

220
00:13:13,800 --> 00:13:14,800
Okay.

221
00:13:14,800 --> 00:13:17,160
And that's the result of evaluating three.

222
00:13:17,160 --> 00:13:21,160
And now because it's the first argument to the plus, we have to save it for when we

223
00:13:21,160 --> 00:13:24,120
get around to evaluating the addition itself.

224
00:13:24,120 --> 00:13:30,880
So that result gets pushed onto the stack.

225
00:13:30,880 --> 00:13:34,960
And now we're going to evaluate the second argument to the outer plus.

226
00:13:34,960 --> 00:13:36,759
And that itself has two arguments.

227
00:13:36,759 --> 00:13:41,160
And the first argument to that to the inner plus is seven.

228
00:13:41,160 --> 00:13:43,200
And so that winds up getting stored in the accumulator.

229
00:13:43,200 --> 00:13:45,519
That's the result of evaluating seven.

230
00:13:45,519 --> 00:13:49,920
And then because the inner plus has two arguments and we have to evaluate the second

231
00:13:49,920 --> 00:13:53,560
argument to the inner plus, the seven has to get saved on the stack.

232
00:13:53,560 --> 00:14:01,040
So now the stack has seven, three, and whatever it had before we started.

233
00:14:01,039 --> 00:14:05,559
Next we're going to evaluate the second argument to the inner plus.

234
00:14:05,559 --> 00:14:10,959
And so evaluating the constant five will result in five being loaded into the accumulator.

235
00:14:10,959 --> 00:14:14,559
And now we've evaluated all the arguments to the inner plus.

236
00:14:14,559 --> 00:14:19,959
And so we know from our stack discipline that the last argument is in the accumulator

237
00:14:19,959 --> 00:14:23,399
and the first argument will be on top of the stack.

238
00:14:23,399 --> 00:14:27,120
So the next thing that will happen is that we'll pop that second argument from the stack

239
00:14:27,120 --> 00:14:30,559
added to the accumulator and store it back into the accumulator.

240
00:14:30,559 --> 00:14:36,639
So now we have the result of the inner plus in the accumulator.

241
00:14:36,639 --> 00:14:42,399
We also have to pop the seven from the stack.

242
00:14:42,399 --> 00:14:48,359
And finally, now we've evaluated the second argument to the outer plus.

243
00:14:48,359 --> 00:14:51,799
So now we can perform the outer addition.

244
00:14:51,799 --> 00:14:55,919
And what does that involve that takes the stack contents and adds it to the value that's currently

245
00:14:55,919 --> 00:15:00,319
on the top of the stack, which is the value three, which is what we saved a long time ago

246
00:15:00,320 --> 00:15:05,160
to remember it from what we wanted to do the outer addition.

247
00:15:05,160 --> 00:15:12,160
And we wind up after we pop the stack with 15 in the accumulator, that's the result of

248
00:15:12,160 --> 00:15:13,520
the entire expression.

249
00:15:13,520 --> 00:15:17,600
And notice it's the same stack that we started with.

250
00:15:17,600 --> 00:15:22,760
So evaluating this entire expression resulted in the result being in the accumulator and

251
00:15:22,760 --> 00:15:26,200
the stack being unchanged.

252
00:15:26,200 --> 00:15:29,800
And if you look at the sub-expressions, you can see that the same thing happened.

253
00:15:29,799 --> 00:15:34,519
So let's take a look at the evaluation of seven plus five.

254
00:15:34,519 --> 00:15:35,519
So where did that take place?

255
00:15:35,519 --> 00:15:41,679
Well, that started here, okay, started at this instruction.

256
00:15:41,679 --> 00:15:45,679
And it lasted down to here.

257
00:15:45,679 --> 00:15:50,639
And you can see that the evaluation of seven plus five, which encompasses these five expressions,

258
00:15:50,639 --> 00:15:52,839
resulted in 12 being put on top of the stack.

259
00:15:52,839 --> 00:15:54,639
That's the result of seven plus five.

260
00:15:54,639 --> 00:15:59,759
And it didn't affect the contents, I'm sorry, it resulted in 12 being placed in the

261
00:15:59,799 --> 00:16:01,120
accumulator.

262
00:16:01,120 --> 00:16:05,399
And it left the stack unchanged from where it was when the evaluation of seven plus five

263
00:16:05,399 --> 00:16:06,399
began.

264
00:16:06,399 --> 00:16:07,639
So here's where it began.

265
00:16:07,639 --> 00:16:10,000
And the value we had saved, three was on the top of the stack.

266
00:16:10,000 --> 00:16:14,759
And when we're done evaluating seven plus five, indeed again the value three and all the

267
00:16:14,759 --> 00:16:19,759
other stuff that was there before, are still on the stack.

