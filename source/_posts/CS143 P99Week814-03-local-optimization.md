---
title: CS143 P99Week814 03 Local Optimization
---

1
00:00:00,000 --> 00:00:09,359
Now we're ready to begin talking about actual program optimizations and we'll begin with local

2
00:00:09,359 --> 00:00:13,560
optimizations.

3
00:00:13,560 --> 00:00:18,679
Local optimization is the simplest form of program optimization because it focuses on optimizing

4
00:00:18,679 --> 00:00:22,800
just a single basic block, so just one basic block.

5
00:00:22,800 --> 00:00:26,560
And in particular, there's no need to worry about complicated control flow.

6
00:00:26,559 --> 00:00:32,039
We're not going to be looking at the entire method or procedure body.

7
00:00:32,039 --> 00:00:36,359
Let's dive right in and take a look at a couple of simple local optimizations.

8
00:00:36,359 --> 00:00:40,879
If x is an integer valued variable and from here on, we'll assume that x has type in.

9
00:00:40,879 --> 00:00:41,879
So we'll just write that down.

10
00:00:41,879 --> 00:00:46,879
We're going to assume that x has type in in all of our examples on this slide.

11
00:00:46,879 --> 00:00:51,239
Then the statement x equals x plus zero, well, that doesn't change the value of x.

12
00:00:51,239 --> 00:00:54,039
Zero is the additive identity for plus.

13
00:00:54,039 --> 00:00:56,359
We're just going to assign x to value it currently has.

14
00:00:56,359 --> 00:01:00,759
And so this statement is actually useless and can just be deleted from the program.

15
00:01:00,759 --> 00:01:06,319
Similarly for x equals x times one, multiplying by one will not change the value of x.

16
00:01:06,319 --> 00:01:08,079
And so that statement can also be removed.

17
00:01:08,079 --> 00:01:15,280
In this case, these are great optimizations because we actually save an entire instruction.

18
00:01:15,280 --> 00:01:19,159
Now some statements can't be deleted, but they can be simplified.

19
00:01:19,159 --> 00:01:24,039
The simple example of that is if we have x equals x times zero, so that can be replaced

20
00:01:24,039 --> 00:01:26,000
by the assignment x equals zero.

21
00:01:26,000 --> 00:01:28,000
And again, we still have a statement here.

22
00:01:28,000 --> 00:01:33,239
We still have to execute a statement, but this statement may execute more quickly because

23
00:01:33,239 --> 00:01:39,239
it doesn't involve actually running the time's operator.

24
00:01:39,239 --> 00:01:44,000
It doesn't involve referencing the value of x, presumably x is registered.

25
00:01:44,000 --> 00:01:45,719
That doesn't really cost anything.

26
00:01:45,719 --> 00:01:50,560
But it's possible that this instruction over here will execute faster than this instruction

27
00:01:50,560 --> 00:01:51,560
over here.

28
00:01:51,560 --> 00:01:53,319
Now on many machines, that's not the case.

29
00:01:53,319 --> 00:01:59,560
In fact, this assignment on the right will take the same amount of time as the multiplication

30
00:01:59,560 --> 00:02:00,560
on the left.

31
00:02:00,560 --> 00:02:06,280
But as we will see, having an assignment of a constant to a variable will actually enable

32
00:02:06,280 --> 00:02:07,560
other optimizations.

33
00:02:07,560 --> 00:02:12,719
So this is still a very worthwhile transformation to do.

34
00:02:12,719 --> 00:02:19,599
An example that's almost certainly an optimization is replacing the exponentiation operator, raising

35
00:02:19,599 --> 00:02:23,800
a value to the power of two by an explicit multiply.

36
00:02:23,800 --> 00:02:25,560
So here we're computing y squared.

37
00:02:25,560 --> 00:02:29,039
And over here we just replaced that by y times y.

38
00:02:29,039 --> 00:02:30,479
Why is this a good idea?

39
00:02:30,479 --> 00:02:37,960
Well, this exponentiation operator here is almost certainly not a built-in machine instruction.

40
00:02:37,960 --> 00:02:42,479
Probably that's going to wind up in our generated code being a call to some built-in math

41
00:02:42,479 --> 00:02:43,599
library.

42
00:02:43,599 --> 00:02:45,919
And then we'll involve a function call overhead.

43
00:02:45,919 --> 00:02:51,120
And then there'll be some kind of general loop in there to do the right number of multiplies,

44
00:02:51,120 --> 00:02:53,039
depending on what the exponent is.

45
00:02:53,039 --> 00:02:56,719
So in the special case where we know that the exponent is too, it's much, much more efficient

46
00:02:56,719 --> 00:03:03,000
to just replace that call to exponentiation by an explicit multiply.

47
00:03:03,000 --> 00:03:08,120
Another example of supposing one kind of operation for another in a special situation is if

48
00:03:08,120 --> 00:03:14,319
we have a multiplication by a power of two, we can replace that by a left bit shift.

49
00:03:14,319 --> 00:03:16,439
So here we're multiplying by eight.

50
00:03:16,439 --> 00:03:23,360
That's the same as shifting the binary representation of x over by three bits.

51
00:03:23,360 --> 00:03:27,599
And that will in fact compute the same thing.

52
00:03:27,599 --> 00:03:30,879
And it doesn't even have to be a power of two.

53
00:03:30,879 --> 00:03:35,960
If we have a multiplication by some other number that's not a power of two, that can be replaced

54
00:03:35,960 --> 00:03:40,280
by some combination of shifting and subtractions.

55
00:03:40,280 --> 00:03:46,280
As we can replace the multiply by some combination of shifts and arithmetic operations, simpler

56
00:03:46,280 --> 00:03:48,240
arithmetic operations.

57
00:03:48,240 --> 00:03:52,719
Now these last two here, I should point out, these are interesting transformations on modern

58
00:03:52,719 --> 00:03:53,719
machines.

59
00:03:53,719 --> 00:03:58,879
Generally, this will not result in any kind of speed up because on modern machines, the integer

60
00:03:58,879 --> 00:04:03,000
multiply operation is just as fast as any other single instruction.

61
00:04:03,000 --> 00:04:07,439
And historical machines, these were actually significant optimizations.

62
00:04:07,439 --> 00:04:13,639
So all of these instructions together are examples of algebraic simplifications.

63
00:04:13,639 --> 00:04:21,439
So that just means exploiting properties of the mathematical operators to replace more

64
00:04:21,439 --> 00:04:28,040
complex instructions or more complex operations by simpler ones.

65
00:04:28,040 --> 00:04:33,760
One of the most important and useful local optimizations is to compute the results of

66
00:04:33,760 --> 00:04:39,600
operations at compile time rather than at runtime if the arguments are known at compile time.

67
00:04:39,600 --> 00:04:44,000
So for example, let's say we have a three address instruction, x equals y up z.

68
00:04:44,000 --> 00:04:46,560
And it happens that y and z are both constants.

69
00:04:46,560 --> 00:04:48,120
These are both immediate values.

70
00:04:48,120 --> 00:04:51,080
These are, you know, literals in the instruction.

71
00:04:51,080 --> 00:04:56,160
Then we can actually compute the result of the right hand side at compile time and replace

72
00:04:56,320 --> 00:04:58,880
this by assignment to a constant.

73
00:04:58,880 --> 00:05:03,880
So for example, if we have the instruction x equals 2 plus 2, that can be replaced by

74
00:05:03,880 --> 00:05:07,040
the assignment x equals 4.

75
00:05:07,040 --> 00:05:11,880
And another example, which is very common and important one, is if the predicate of a

76
00:05:11,880 --> 00:05:17,680
conditional consists only of immediate values, then we can pre-compute the result of that

77
00:05:17,680 --> 00:05:22,960
conditional and decide what the target of the conditional will be, what the next instruction

78
00:05:22,960 --> 00:05:24,560
will be at compile time.

79
00:05:24,560 --> 00:05:29,199
So in this case, we have a predicate, which is going to be false because 2 is not less

80
00:05:29,199 --> 00:05:30,199
than 0.

81
00:05:30,199 --> 00:05:32,160
And so we will not take the jump.

82
00:05:32,160 --> 00:05:35,639
And so this instruction can just be deleted from the program.

83
00:05:35,639 --> 00:05:40,920
If we had the other case, if 2 was greater than 0, it's just, so this was some predicate

84
00:05:40,920 --> 00:05:47,920
that was guaranteed to evaluate true, then we would replace this conditional by the jump.

85
00:05:47,920 --> 00:05:50,720
Okay, this would become an unconditional jump.

86
00:05:51,560 --> 00:05:54,760
And this class of optimizations is called constant folding.

87
00:05:54,760 --> 00:06:02,880
And as I said, this is one of the most common and most important optimizations that compilers

88
00:06:02,880 --> 00:06:05,680
perform.

89
00:06:05,680 --> 00:06:10,080
Now there is one situation that you should be aware of in which constant folding can be

90
00:06:10,080 --> 00:06:11,080
very dangerous.

91
00:06:11,080 --> 00:06:14,480
And this situation is actually very instructive as well.

92
00:06:14,480 --> 00:06:20,000
And so while it isn't that common, I want to mention it because it's something that really

93
00:06:20,000 --> 00:06:26,160
illustrates some of the subtleties of program optimization and programming language semantics.

94
00:06:26,160 --> 00:06:30,000
So what is this dangerous situation?

95
00:06:30,000 --> 00:06:34,240
So let's consider the scenario where we have two machines.

96
00:06:34,240 --> 00:06:38,639
We have a machine X and we have a machine Y.

97
00:06:38,639 --> 00:06:41,360
Okay.

98
00:06:41,360 --> 00:06:48,120
And now the compiler is being run on machine X.

99
00:06:48,120 --> 00:06:52,759
And the compiler is producing code generated code.

100
00:06:52,759 --> 00:06:57,000
This is the generated code produced to the output of the compiler over here.

101
00:06:57,000 --> 00:06:58,920
That's going to be run on machine Y.

102
00:06:58,920 --> 00:07:01,519
So this is a cross compiler.

103
00:07:01,519 --> 00:07:03,040
Okay.

104
00:07:03,040 --> 00:07:08,600
So you are running the compiler on one machine, but you're generating code for a different

105
00:07:08,600 --> 00:07:09,680
machine.

106
00:07:09,680 --> 00:07:11,199
And why would you want to do that?

107
00:07:11,199 --> 00:07:16,319
Well, the common situation in which you want to do this is that this machine Y over here

108
00:07:16,319 --> 00:07:19,079
is a very weak machine.

109
00:07:19,079 --> 00:07:23,920
So weak in the sense that it's very slow, has very limited memory, maybe very limited

110
00:07:23,920 --> 00:07:30,319
power, that it's beneficial to develop your program and even compile it on a much more

111
00:07:30,319 --> 00:07:31,680
powerful machine.

112
00:07:31,680 --> 00:07:36,519
So many embedded systems codes are developed in exactly this way.

113
00:07:36,519 --> 00:07:42,079
The code is developed on some powerful workstation, but you're actually compiling it for some small

114
00:07:42,079 --> 00:07:45,920
embedded device that will actually execute the code.

115
00:07:45,920 --> 00:07:50,000
Now the problem comes if X and Y are different.

116
00:07:50,000 --> 00:07:55,240
So consider the situation where X and Y are different machines, different architectures.

117
00:07:55,240 --> 00:07:56,240
All right.

118
00:07:56,240 --> 00:07:58,840
And I've been implying that they are, but they don't have to be.

119
00:07:58,840 --> 00:08:03,600
I mean, you could compile on one kind of architecture and run the same code on the same

120
00:08:03,600 --> 00:08:04,600
architecture.

121
00:08:04,600 --> 00:08:08,960
But the interesting situation is when X and Y are different architectures.

122
00:08:08,960 --> 00:08:12,319
And so let's consider something like going in machine X.

123
00:08:12,319 --> 00:08:21,319
Let's say we have the instruction A equals 1.5 plus 3.7.

124
00:08:21,319 --> 00:08:28,439
And you would like to constant fold that down to A equals 5.2.

125
00:08:28,439 --> 00:08:35,439
Now the problem is that if you simply execute this as a floating point operation on architecture

126
00:08:35,439 --> 00:08:42,279
X, the round off and the floating point semantics on architecture X may be slightly different.

127
00:08:42,279 --> 00:08:49,279
From the semantics on architecture Y, it could be that if you did an architecture Y directly

128
00:08:49,279 --> 00:08:53,279
that you get something like A equals 5.19.

129
00:08:53,279 --> 00:08:58,279
It might be a small difference in the floating point result depending on whether you execute

130
00:08:58,279 --> 00:09:01,360
the instruction here or here.

131
00:09:01,360 --> 00:09:06,559
And this becomes significant in the case of constant folding and cross compilation because

132
00:09:06,559 --> 00:09:11,679
some algorithms really depend on the floating point numbers being treated very, very consistently.

133
00:09:11,679 --> 00:09:15,479
So if you're going to round off in what the operation in one way, you need to do it that way

134
00:09:15,479 --> 00:09:18,919
for every time you do that particular operation.

135
00:09:18,919 --> 00:09:24,919
And by shifting the computation from runtime, when it would have executed an architecture Y,

136
00:09:24,919 --> 00:09:29,199
back into the compiler, when it ends up executing an architecture X, you can change the results

137
00:09:29,199 --> 00:09:30,559
of the program.

138
00:09:30,559 --> 00:09:32,679
So how to cross compilers actually deal with this.

139
00:09:32,679 --> 00:09:36,719
So compilers that want to be careful about this kind of thing, what they will do is they

140
00:09:36,720 --> 00:09:41,920
will represent the floating point numbers as strings inside the compiler and they will

141
00:09:41,920 --> 00:09:47,560
do the obvious long form addition and multiplication division operations, all the floating point

142
00:09:47,560 --> 00:09:53,320
operations directly on the strings, keep the full precision inside the compiler and then

143
00:09:53,320 --> 00:09:58,960
in the generated code produce the literal, that is, the full precision floating point number

144
00:09:58,960 --> 00:10:04,519
and then let the architecture, the architecture Y decide how it wants to round that off.

145
00:10:04,519 --> 00:10:08,679
So that's the really careful way to do constant folding on floating point numbers if you're

146
00:10:08,679 --> 00:10:12,799
worried about cross compilation.

147
00:10:12,799 --> 00:10:17,360
Continuing on with local optimizations, another important one is to eliminate unreachable

148
00:10:17,360 --> 00:10:18,360
basic blocks.

149
00:10:18,360 --> 00:10:20,159
So what's an unreachable basic block?

150
00:10:20,159 --> 00:10:23,840
That is one that is not the target of any jump or fall through.

151
00:10:23,840 --> 00:10:28,360
So if I have a piece of code that can never execute and it might never execute because there's

152
00:10:28,360 --> 00:10:34,039
no jump that jumps to the beginning of that piece of code and it doesn't follow after

153
00:10:34,039 --> 00:10:37,399
another instruction that can fall through to it, well, in that piece of code that basic

154
00:10:37,399 --> 00:10:41,240
block is just not going to be used.

155
00:10:41,240 --> 00:10:44,959
It's unreachable and it can be deleted from the program.

156
00:10:44,959 --> 00:10:47,719
This has the advantage of making the code smaller.

157
00:10:47,719 --> 00:10:53,439
So obviously since the basic block is unreachable, it's not contributing to the execution cost

158
00:10:53,439 --> 00:10:55,559
of the program in terms of the instruction count.

159
00:10:55,559 --> 00:10:57,319
So the code is never executed.

160
00:10:57,319 --> 00:11:02,799
So it's not really slowing down the code because extra instructions are being executed.

161
00:11:02,799 --> 00:11:07,919
But making the program smaller can actually make it run faster because of cache effects.

162
00:11:07,919 --> 00:11:12,919
So the instructions have to fit into memory just like the data.

163
00:11:12,919 --> 00:11:16,479
And if you make the program smaller, it makes it easier to fit the program in memory.

164
00:11:16,479 --> 00:11:19,759
You may increase the spatial locality of the program.

165
00:11:19,759 --> 00:11:23,519
Instructions that are used together may now be closer to each other and that can make the

166
00:11:23,519 --> 00:11:28,599
program run more quickly.

167
00:11:28,600 --> 00:11:33,200
Before continuing on, I want to say a word or two about why unreachable basic blocks occur.

168
00:11:33,200 --> 00:11:38,240
So why would a programmer in their right mind ever write a program that had code in it that

169
00:11:38,240 --> 00:11:40,560
wasn't going to be executed?

170
00:11:40,560 --> 00:11:43,879
And there's several actually ways in which unreachable code can arise.

171
00:11:43,879 --> 00:11:45,240
And it's actually quite common.

172
00:11:45,240 --> 00:11:49,440
So this is an important optimization, getting rid of the unreachable code is actually fairly

173
00:11:49,440 --> 00:11:50,639
important.

174
00:11:50,639 --> 00:11:56,639
Perhaps the most common situation is that the code is actually parameterized with code that

175
00:11:56,639 --> 00:12:00,039
is only compiled and used in certain situations.

176
00:12:00,039 --> 00:12:06,240
So for example, in C, it would be sort of typical to see some code that looks like this.

177
00:12:06,240 --> 00:12:12,879
If debug then execute something where debug is a pound defined constant.

178
00:12:12,879 --> 00:12:15,879
So in C, you can define names for literals.

179
00:12:15,879 --> 00:12:18,199
So you say something like this.

180
00:12:18,199 --> 00:12:23,399
You might define debug to be zero.

181
00:12:23,399 --> 00:12:27,279
And so you might see a program that had this piece of code in it.

182
00:12:27,279 --> 00:12:33,559
And what this literally means is that this piece of code is equivalent to if zero then blah,

183
00:12:33,559 --> 00:12:34,559
blah, blah.

184
00:12:34,559 --> 00:12:38,840
So when you're compiling without debugging, you have debug defined to zero.

185
00:12:38,840 --> 00:12:43,319
When you're compiling with debugging, you would change this line to define debug to be

186
00:12:43,319 --> 00:12:45,639
some non-zero constant.

187
00:12:45,639 --> 00:12:49,360
So in this case, when you're compiling without debugging, what will happen?

188
00:12:49,360 --> 00:12:52,600
Well, we'll see that this predicate is guaranteed to be zero.

189
00:12:52,600 --> 00:12:54,800
Constant folding will take care of that.

190
00:12:54,800 --> 00:12:58,120
And that will result in an unreachable basic block on the then branch.

191
00:12:58,120 --> 00:12:59,960
And then that code can be deleted.

192
00:12:59,960 --> 00:13:04,200
And so essentially the compiler is able to go through using the optimizer and strip out

193
00:13:04,200 --> 00:13:09,200
all of the debugging code that isn't going to be used since you're compiling without debugging.

194
00:13:09,200 --> 00:13:13,840
Another case where unreachable code comes up is with libraries.

195
00:13:13,840 --> 00:13:18,680
So very frequently programs are written to use generic libraries.

196
00:13:18,679 --> 00:13:22,039
But the program might only use a very small part of the interface.

197
00:13:22,039 --> 00:13:27,759
So the library might supply 100 methods to cover all the situations that various programmers

198
00:13:27,759 --> 00:13:28,759
are interested in.

199
00:13:28,759 --> 00:13:31,719
But for your program, you might only be using three of those methods.

200
00:13:31,719 --> 00:13:36,239
And the rest of those methods could potentially be removed from the final binary to make the

201
00:13:36,239 --> 00:13:37,919
code smaller.

202
00:13:37,919 --> 00:13:41,839
And finally, another way that unreachable basic blocks occur is as the result of other

203
00:13:41,839 --> 00:13:44,439
optimizations.

204
00:13:44,440 --> 00:13:50,720
So as we will see, optimizations frequently lead to more optimizations.

205
00:13:50,720 --> 00:13:56,480
And it could be that just through other rearrangements of the code that the compiler makes some

206
00:13:56,480 --> 00:14:03,880
basic block redundant and able to be deleted.

207
00:14:03,880 --> 00:14:09,560
Now some optimizations are simpler to express if each register occurs only once on the left

208
00:14:09,560 --> 00:14:11,200
hand side of an assignment.

209
00:14:11,200 --> 00:14:15,840
So that means if each register is assigned at most once, then some of these optimizations

210
00:14:15,840 --> 00:14:17,320
are easier to talk about.

211
00:14:17,320 --> 00:14:23,240
So we're going to rewrite our intermediate code always so that it's in single assignment

212
00:14:23,240 --> 00:14:24,240
form.

213
00:14:24,240 --> 00:14:26,000
So it's called single assignment form.

214
00:14:26,000 --> 00:14:31,400
And all that means is that if we see a register being reused like over here, we have two

215
00:14:31,400 --> 00:14:34,920
assignments to the register x.

216
00:14:34,920 --> 00:14:39,879
We're just going to introduce another register name for one of those assignments.

217
00:14:39,879 --> 00:14:44,960
So in this case, I'm just going to rename the first use of x here, definition of x here

218
00:14:44,960 --> 00:14:47,039
to be some new register b.

219
00:14:47,039 --> 00:14:51,439
I'll replace the uses of that x by the name b.

220
00:14:51,439 --> 00:14:56,399
And now I have an equivalent piece of code that satisfies single assignment form.

221
00:14:56,399 --> 00:15:02,519
Every register is assigned at most once.

222
00:15:02,519 --> 00:15:06,399
Let's take a look at an optimization that depends on single assignment form.

223
00:15:06,399 --> 00:15:09,240
So we're going to assume that basic blocks are in single assignment form.

224
00:15:09,240 --> 00:15:15,120
If they are, then we're going to know that a definition of a register is the first use

225
00:15:15,120 --> 00:15:17,360
of that register in the block.

226
00:15:17,360 --> 00:15:20,440
And so in particular, we're also ruling out things like this.

227
00:15:20,440 --> 00:15:26,000
So there could be something like this where x is red and then later on x is used.

228
00:15:26,000 --> 00:15:28,720
Okay, sorry, x is red and then later on x is defined.

229
00:15:28,720 --> 00:15:31,240
So we're not going to allow this.

230
00:15:31,240 --> 00:15:35,720
This register here would have to be renamed to something else say y and then the uses of

231
00:15:35,720 --> 00:15:38,080
x later on here renamed to y.

232
00:15:38,360 --> 00:15:43,360
All right, so we're going to insist that whenever we have a definition of a register in a basic block

233
00:15:43,360 --> 00:15:47,200
that is the first use of that register in the block.

234
00:15:47,200 --> 00:15:52,080
All right, and if that's true, if we put things in that form and that's easy to do as we've seen,

235
00:15:52,080 --> 00:15:54,480
then when two assignments have the same right hand side,

236
00:15:54,480 --> 00:15:56,960
they're guaranteed to compute the same value.

237
00:15:56,960 --> 00:15:59,440
So take a look here at this example.

238
00:15:59,440 --> 00:16:02,600
So let's say we have an assignment x equals y plus z.

239
00:16:02,600 --> 00:16:05,920
And then later on we have another assignment w equals y plus z.

240
00:16:05,919 --> 00:16:11,319
And we said that there could only be one assignment to x in any basic block.

241
00:16:11,319 --> 00:16:16,319
So all of these instructions that are elided here, they can't be assigning to x.

242
00:16:16,319 --> 00:16:19,360
And they also can't be assigning to y and z.

243
00:16:19,360 --> 00:16:21,519
Y and z already have their definitions.

244
00:16:21,519 --> 00:16:23,439
So y and z can't be changed.

245
00:16:23,439 --> 00:16:27,879
And that means that x and w here actually compute the same value.

246
00:16:27,879 --> 00:16:35,559
And so we can replace the second computation y plus z by just the name that we already have for it x.

247
00:16:35,559 --> 00:16:39,559
And this saves us having to recompute values.

248
00:16:39,559 --> 00:16:42,799
All right, so this is called common sub expression elimination.

249
00:16:42,799 --> 00:16:55,000
Common, this is rather a long name, sub expression elimination.

250
00:16:55,000 --> 00:16:59,359
And this is another one of the more important compiler optimization.

251
00:16:59,359 --> 00:17:01,839
This is actually something that comes up surprisingly often.

252
00:17:01,840 --> 00:17:09,480
And saves quite a bit of work if you perform this optimization.

253
00:17:09,480 --> 00:17:15,960
So another use of single assignment form is that if we see the assignment w equals x in a block.

254
00:17:15,960 --> 00:17:21,240
So here the register w is being just copied from the register x.

255
00:17:21,240 --> 00:17:26,039
Then all subsequent uses of w can be replaced by uses of x.

256
00:17:26,039 --> 00:17:30,880
So for example, here we have an assignment to be.

257
00:17:30,880 --> 00:17:35,520
And then we have a copy a is equal to b.

258
00:17:35,520 --> 00:17:39,000
And then down here we have a use of a in the last instruction.

259
00:17:39,000 --> 00:17:43,480
Well, that use of a in the last instruction can be replaced by a use of b.

260
00:17:43,480 --> 00:17:48,480
And this is called copy propagation.

261
00:17:48,480 --> 00:17:51,720
We are propagating copies through the code.

262
00:17:51,720 --> 00:17:55,720
And by itself, notice that this makes absolutely no improvement in the code.

263
00:17:55,720 --> 00:18:00,360
It's really only useful in conjunction with some of the other optimizations.

264
00:18:00,359 --> 00:18:04,519
So for example, in this case, after we do the copy propagation,

265
00:18:04,519 --> 00:18:07,199
it might be the case that this instruction can be deleted.

266
00:18:07,199 --> 00:18:13,319
If a is not used any place else in the code, then this instruction can be removed.

267
00:18:13,319 --> 00:18:16,679
Now let's do a little more complex example and use some of the optimizations

268
00:18:16,679 --> 00:18:20,279
that we've discussed so far on a slightly bigger piece of code.

269
00:18:20,279 --> 00:18:23,039
So we're starting with this piece of code here on the left.

270
00:18:23,039 --> 00:18:25,799
And we're going to wind up with this piece of code on the right.

271
00:18:25,799 --> 00:18:27,159
And how does that work?

272
00:18:27,159 --> 00:18:29,759
Well, first we have a copy propagation.

273
00:18:29,759 --> 00:18:32,079
So we have a is assigned to value five.

274
00:18:32,079 --> 00:18:37,839
And so we can propagate that forward and replace the use of a later on by five.

275
00:18:37,839 --> 00:18:42,519
And I should say that when the value that's being propagated is a constant,

276
00:18:42,519 --> 00:18:46,839
rather than a register name, it's called constant propagation instead of copy propagation.

277
00:18:46,839 --> 00:18:48,200
But it's exactly the same thing.

278
00:18:48,200 --> 00:18:51,480
We have a single value assigned on the right-hand side,

279
00:18:51,480 --> 00:18:53,000
either a register name or a constant.

280
00:18:53,000 --> 00:18:58,519
And we're replacing uses of that in later instructions by that register name or constant.

281
00:18:58,519 --> 00:18:59,279
OK?

282
00:18:59,279 --> 00:19:02,359
So once we have replaced a here by five, now we can do constant folding.

283
00:19:02,359 --> 00:19:05,519
Now we have two constant arguments for this instruction.

284
00:19:05,519 --> 00:19:09,519
So this two times five can be replaced by the constant ten.

285
00:19:09,519 --> 00:19:13,960
Now notice we have another assignment of a constant to a register.

286
00:19:13,960 --> 00:19:15,759
And so we can propagate that constant forward.

287
00:19:15,759 --> 00:19:20,799
We can replace the subsequent uses of x by the number ten.

288
00:19:20,799 --> 00:19:23,039
And now we have more opportunities for constant folding.

289
00:19:23,039 --> 00:19:27,319
Ten plus six can be replaced by the value sixteen.

290
00:19:27,319 --> 00:19:33,079
All right? Now we have another value here, which is a constant assignment.

291
00:19:33,079 --> 00:19:37,399
Sorry, another instruction here, which is just an assignment of a constant to a register.

292
00:19:37,399 --> 00:19:39,799
So we can propagate that constant forward.

293
00:19:39,799 --> 00:19:45,079
All right? And we wind up down here with ten times sixteen.

294
00:19:45,079 --> 00:19:47,079
And I see over here in my final example here,

295
00:19:47,079 --> 00:19:50,399
I didn't bother to propagate the ten to x.

296
00:19:50,399 --> 00:19:52,200
But we could do that.

297
00:19:52,200 --> 00:19:55,639
And this, so we can either do this optimization.

298
00:19:55,640 --> 00:19:58,920
So x times sixteen, if we didn't do the propagation,

299
00:19:58,920 --> 00:20:01,720
would be equivalent to x left shifted four.

300
00:20:01,720 --> 00:20:05,680
Or we can just replace this by ten times sixteen.

301
00:20:05,680 --> 00:20:06,600
That would be even better.

302
00:20:06,600 --> 00:20:09,720
And we wind up with T being assigned the value 160.

303
00:20:12,880 --> 00:20:15,320
Returning to an idea I mentioned a couple of slides ago.

304
00:20:15,320 --> 00:20:17,520
Let's say there's an assignment in a basic block.

305
00:20:17,520 --> 00:20:21,560
Some register w is assigned some value that's computed on the right-hand side.

306
00:20:21,559 --> 00:20:25,799
So let's say that w, the register name, is not used anywhere else in the program.

307
00:20:25,799 --> 00:20:30,119
It doesn't appear anywhere, not only in this basic block,

308
00:20:30,119 --> 00:20:35,559
but in any other part of the procedure in which this statement appears.

309
00:20:35,559 --> 00:20:40,839
Well, then the statement is dead and can be just deleted from the program.

310
00:20:40,839 --> 00:20:44,759
And dead here means it does not contribute to the program's result.

311
00:20:44,759 --> 00:20:48,440
Since the value that we write into w is never referenced anywhere.

312
00:20:48,440 --> 00:20:50,200
W is never used.

313
00:20:50,200 --> 00:20:54,320
Doing the computation of w in the first place was a waste of time.

314
00:20:54,320 --> 00:20:57,000
So we can just delete that computation.

315
00:20:57,000 --> 00:20:59,000
Here's a simple example.

316
00:20:59,000 --> 00:21:03,200
Let's assume that the register a is not used anyplace else in the program.

317
00:21:03,200 --> 00:21:06,840
And the first thing we have to do, so here's our initial piece of code.

318
00:21:06,840 --> 00:21:09,519
The first thing we do is we put it in single assignment form.

319
00:21:09,519 --> 00:21:17,160
And so I've renamed here this register x to be a register b.

320
00:21:17,160 --> 00:21:19,320
And once we do that, let me do that.

321
00:21:19,320 --> 00:21:23,000
So we just say b equals z plus y and a equals b.

322
00:21:23,000 --> 00:21:26,200
And then we propagate this copy forward.

323
00:21:26,200 --> 00:21:30,519
So we've now replaced this use of a by b.

324
00:21:30,519 --> 00:21:33,160
So this takes us to this state where we have this piece of code.

325
00:21:33,160 --> 00:21:36,120
Now we can see that we have an assignment to a.

326
00:21:36,120 --> 00:21:38,920
A is not used in the subsequent instruction.

327
00:21:38,920 --> 00:21:42,320
We already said that a is not used anyplace outside of the basic block.

328
00:21:42,320 --> 00:21:45,640
And so the assignment a equals b can be deleted.

329
00:21:45,640 --> 00:21:50,320
And we wind up with this shorter basic block.

330
00:21:50,320 --> 00:21:53,840
Now each local optimization actually does very little by itself.

331
00:21:53,840 --> 00:21:58,240
And some of these optimizations, some of these transformations that I presented,

332
00:21:58,240 --> 00:22:00,880
actually don't make the program run faster at all.

333
00:22:00,880 --> 00:22:02,600
They don't make it run slower either.

334
00:22:02,600 --> 00:22:06,520
But by themselves, they don't actually make any improvement to the program.

335
00:22:06,520 --> 00:22:09,480
But typically the optimizations will interact.

336
00:22:09,480 --> 00:22:12,680
So performing one optimization will enable another.

337
00:22:12,680 --> 00:22:17,240
And we saw this in the little example that I did a few slides ago.

338
00:22:17,240 --> 00:22:21,960
So the way to think about an optimizing compiler is that it has a big bag of tricks.

339
00:22:21,960 --> 00:22:26,680
It has a lot of individual program transformations that it knows.

340
00:22:26,680 --> 00:22:30,960
And what it is going to do when faced with a program to optimize is going to rummage around

341
00:22:30,960 --> 00:22:36,000
in its bag looking for an optimization that applies to some part of the code.

342
00:22:36,000 --> 00:22:38,200
If it finds one, it will do the optimization.

343
00:22:38,200 --> 00:22:39,680
It will do the transformation.

344
00:22:39,680 --> 00:22:40,680
And then it will repeat.

345
00:22:40,680 --> 00:22:44,279
It will go back and look at the program again and see if there's another optimization that

346
00:22:44,279 --> 00:22:45,279
replies.

347
00:22:45,279 --> 00:22:50,240
And it will just keep doing this until it reaches a point where none of the authorizations

348
00:22:50,240 --> 00:22:55,440
it knows about can be applied to the program.

349
00:22:55,440 --> 00:22:59,720
Next we'll take a look at a bigger example and try applying some of the optimizations that

350
00:22:59,720 --> 00:23:02,720
we've discussed to it and see how far we get.

351
00:23:02,720 --> 00:23:07,560
And of course, this example has been constructed to illustrate many of the optimizations that

352
00:23:07,560 --> 00:23:09,360
we discussed.

353
00:23:09,359 --> 00:23:15,799
So first thing we can do, there's a couple of opportunities for algebraic simplifications.

354
00:23:15,799 --> 00:23:21,119
So we can replace the squaring up here by a multiply.

355
00:23:21,119 --> 00:23:28,919
And down here we had a multiply by two, which we can replace by a left shift of one.

356
00:23:28,919 --> 00:23:32,159
Next we can observe that we have some copies in constants.

357
00:23:32,159 --> 00:23:35,799
So we have a constant assignment to be and a copy assignment to see.

358
00:23:35,799 --> 00:23:41,480
And those can be propagated forward to the uses of B and C.

359
00:23:41,480 --> 00:23:43,359
Once we've done that, we can do constant folding.

360
00:23:43,359 --> 00:23:48,279
So here in the assignment to E, the arguments to the shift are all constants.

361
00:23:48,279 --> 00:23:54,240
And so that can be replaced by an assignment that E gets the value 6.

362
00:23:54,240 --> 00:23:57,559
Next we could observe that we have a common sub expression that we can eliminate that both

363
00:23:57,559 --> 00:24:00,639
A and D have the value x times x.

364
00:24:00,640 --> 00:24:08,680
So the assignment to D can be replaced by a copy that D now gets the value of A.

365
00:24:08,680 --> 00:24:12,240
Now we have two opportunities again for copy and constant propagation, the assignment to

366
00:24:12,240 --> 00:24:17,800
D and the assignment to E can be propagated forward.

367
00:24:17,800 --> 00:24:20,360
And finally we can do a bunch of dead code elimination.

368
00:24:20,360 --> 00:24:27,800
So assuming that none of these values, the BCD or E, is used anyplace else in the program,

369
00:24:27,800 --> 00:24:29,680
all four of these statements can be deleted.

370
00:24:29,680 --> 00:24:32,600
This is where we actually get some real performance improvement.

371
00:24:32,600 --> 00:24:37,279
So here we actually save entire instructions and that's the best kind of savings that

372
00:24:37,279 --> 00:24:40,480
we can have.

373
00:24:40,480 --> 00:24:42,799
And so we wind up with this is our final form.

374
00:24:42,799 --> 00:24:45,799
So notice that A is assigned to value x times x.

375
00:24:45,799 --> 00:24:50,320
F is then assigned to value A plus A and then G is assigned to value 6 times F.

376
00:24:50,320 --> 00:24:54,080
Now this is not quite as fast as it could be.

377
00:24:54,080 --> 00:24:58,200
There's actually one more algebraic optimization that could be done.

378
00:24:58,200 --> 00:25:05,559
We could notice here that F is actually equal to 2 times A and then we could do some rearrangement

379
00:25:05,559 --> 00:25:10,880
here to discover that G is equal to 12 times F.

380
00:25:10,880 --> 00:25:15,039
Sorry, sorry, 12 times A.

381
00:25:15,039 --> 00:25:20,400
And then this statement assignment to F might become dead code and we could delete it from

382
00:25:20,400 --> 00:25:22,200
the program.

383
00:25:22,200 --> 00:25:26,759
I think some compilers would actually find this but I believe that even current state

384
00:25:26,759 --> 00:25:33,359
there are compilers many of them would not discover this last rearrangement to the program.

