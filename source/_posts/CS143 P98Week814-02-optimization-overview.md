---
title: CS143 P98Week814 02 Optimization Overview
---

1
00:00:00,000 --> 00:00:07,719
We're now ready to begin our next major topic, program optimization.

2
00:00:07,719 --> 00:00:11,640
In this video, we're just going to give an overview discussing why we want to perform

3
00:00:11,640 --> 00:00:17,760
optimization and what the trade-offs are for compilers in deciding what kinds of optimizations

4
00:00:17,760 --> 00:00:22,519
to implement.

5
00:00:22,519 --> 00:00:25,839
Optimization is the last compiler phase that we're going to discuss.

6
00:00:25,839 --> 00:00:28,920
Let's just very briefly review the compiler phases.

7
00:00:28,920 --> 00:00:34,440
First, there's electrical analysis and then that's followed by parsing.

8
00:00:34,440 --> 00:00:40,480
Then we have semantic analysis.

9
00:00:40,480 --> 00:00:47,040
And after that, we talked about code generation.

10
00:00:47,040 --> 00:00:49,760
And now we're going to talk about optimization.

11
00:00:49,760 --> 00:00:54,040
So optimization actually comes before code generation because we want to improve the program

12
00:00:54,040 --> 00:00:57,280
before we commit it to machine code.

13
00:00:57,280 --> 00:00:59,200
But it is, of course, the last one that we've discussed.

14
00:00:59,200 --> 00:01:03,980
But just to point out here, optimization fits in between generally semantic analysis and

15
00:01:03,980 --> 00:01:05,379
code generation.

16
00:01:05,379 --> 00:01:09,120
And in modern compilers, this is where most of the action is.

17
00:01:09,120 --> 00:01:15,640
It usually has, by far, the most code and it's also the most complex part of the compiler.

18
00:01:15,640 --> 00:01:20,960
Now, a very basic question is when we should perform optimizations and we actually have some

19
00:01:20,960 --> 00:01:22,439
choices.

20
00:01:22,439 --> 00:01:25,560
We could perform them on the abstract syntax tree.

21
00:01:25,560 --> 00:01:29,240
And a big advantage of that is that it's machine independent.

22
00:01:29,240 --> 00:01:34,600
But for many optimizations we want to do, it turns out that the abstract syntax tree

23
00:01:34,600 --> 00:01:39,879
will be too high level that we can't actually even express the optimizations we want to perform

24
00:01:39,879 --> 00:01:45,960
because those optimizations depend on lower level details of the machine or of the kind

25
00:01:45,960 --> 00:01:50,640
of machine that we're generating code for that aren't present in the abstract syntax tree.

26
00:01:50,640 --> 00:01:55,640
Another possibility would be to perform optimizations directly on assembly language.

27
00:01:55,640 --> 00:02:00,200
And the advantage here is that all the details of the machine are exposed.

28
00:02:00,200 --> 00:02:03,120
We can see everything that the machine is doing.

29
00:02:03,120 --> 00:02:05,719
We can talk about all of the resources of the machine.

30
00:02:05,719 --> 00:02:10,280
And so, in principle, any optimization we want to perform can be expressed at the assembly

31
00:02:10,280 --> 00:02:11,280
language level.

32
00:02:11,280 --> 00:02:16,439
Now, a disadvantage of doing optimizations on assembly language is that they are machine

33
00:02:16,439 --> 00:02:17,439
dependent.

34
00:02:17,439 --> 00:02:24,000
We have to potentially re-implement our optimizations for each new kind of architecture.

35
00:02:24,000 --> 00:02:30,879
And so, as we mentioned in the previous video, another option is to use an intermediate

36
00:02:30,879 --> 00:02:31,879
language.

37
00:02:31,879 --> 00:02:36,400
And the intermediate language has the advantage potentially, if we're designed well,

38
00:02:36,400 --> 00:02:37,919
of still being machine independent.

39
00:02:37,919 --> 00:02:43,159
Meaning it can be a little bit above the level of the concrete details of very, very specific

40
00:02:43,159 --> 00:02:44,159
architectures.

41
00:02:44,159 --> 00:02:48,879
Now, I mean, it can still represent a large family of machines.

42
00:02:48,879 --> 00:02:54,599
But while at the same time exposing enough optimization opportunities that the compiler can

43
00:02:54,599 --> 00:03:00,840
do a good job of improving the program's performance.

44
00:03:00,840 --> 00:03:07,680
So we will be looking at optimizations that work on intermediate language that has operations

45
00:03:07,680 --> 00:03:09,560
given by this grammar.

46
00:03:09,560 --> 00:03:15,240
So in this case, a program is a sequence of statements and a statement consists of either

47
00:03:15,240 --> 00:03:22,680
an assignment, which could be a simple copy or a unary or binary operation.

48
00:03:22,680 --> 00:03:25,840
We can push and pop things from a stack.

49
00:03:25,840 --> 00:03:28,879
And then we have a couple of different kinds of jumps.

50
00:03:28,879 --> 00:03:33,680
We have a comparison and jump where we compare the values of two registers and then conditionally

51
00:03:33,680 --> 00:03:35,439
jump to a label.

52
00:03:35,439 --> 00:03:37,319
We have unconditional jumps.

53
00:03:37,319 --> 00:03:40,800
And finally, there are labels, the targets of jumps.

54
00:03:40,800 --> 00:03:43,479
And the identifiers here are the register names.

55
00:03:43,479 --> 00:03:49,879
And we could also use immediate values on the right-hand side of operations instead of registers.

56
00:03:49,879 --> 00:03:54,079
And the typical operators, we're just going to assume some typical family of operators,

57
00:03:54,079 --> 00:03:58,879
like plus, minus times, et cetera.

58
00:03:58,879 --> 00:04:03,000
Now optimizations typically work on groups of statements.

59
00:04:03,000 --> 00:04:08,360
And one of the most important and useful statement groupings is the basic block.

60
00:04:08,360 --> 00:04:11,120
So a basic block is a sequence of instructions.

61
00:04:11,120 --> 00:04:14,520
And typically, we want it to be the longest possible sequence of instructions.

62
00:04:14,520 --> 00:04:16,319
So we want it to be maximal.

63
00:04:16,319 --> 00:04:19,120
And this sequence has two properties.

64
00:04:19,120 --> 00:04:23,480
First of all, there are no labels except possibly for the very first instruction.

65
00:04:23,480 --> 00:04:28,920
And there are no jumps anywhere in the sequence of instructions except possibly for the last

66
00:04:28,920 --> 00:04:30,839
instruction.

67
00:04:30,839 --> 00:04:36,079
And the basic block, the idea behind a basic block, and the reason we require these two properties,

68
00:04:36,079 --> 00:04:39,079
is that it's guaranteed to flow.

69
00:04:39,079 --> 00:04:43,079
The execution is guaranteed to proceed from the first statement in the block to the last

70
00:04:43,079 --> 00:04:44,079
statement in the block.

71
00:04:44,079 --> 00:04:49,479
So the flow of control within a basic block is completely predictable.

72
00:04:49,479 --> 00:04:53,359
Once we enter the block, once we begin at the first statement of the block, which might

73
00:04:53,359 --> 00:05:00,319
have a label, there will be a sequence of statements that must all execute before we

74
00:05:00,319 --> 00:05:04,920
reach the last statement, which could potentially be a jump to some other part of the code.

75
00:05:04,920 --> 00:05:09,519
But once we get here, once we get to this very first statement, that we're guaranteed

76
00:05:09,519 --> 00:05:13,920
to execute the entire block without jumping out.

77
00:05:13,920 --> 00:05:15,800
And furthermore, there's no way to jump into the block.

78
00:05:15,800 --> 00:05:20,120
You couldn't just come from some other random part of the program and begin executions,

79
00:05:20,120 --> 00:05:22,079
say, at the second or third instruction.

80
00:05:22,079 --> 00:05:26,519
The only way into the block is through the first statement, and the only way out is through

81
00:05:26,519 --> 00:05:28,480
the last statement.

82
00:05:29,480 --> 00:05:32,480
So here's an example, basic block.

83
00:05:32,480 --> 00:05:39,240
And just to show you why basic blocks are useful, let's observe that we can actually optimize

84
00:05:39,240 --> 00:05:40,720
this piece of code.

85
00:05:40,720 --> 00:05:46,200
Because three always executes after two, this instruction here, always executes after this

86
00:05:46,200 --> 00:05:52,120
instruction, we could change that third instruction to be w equals three times x.

87
00:05:52,120 --> 00:05:58,519
Because we can see here that t is getting x plus x or two times x, and here we're adding

88
00:05:58,519 --> 00:06:04,000
in another x, and so w is actually always equal to three times x.

89
00:06:04,000 --> 00:06:09,840
And a question then, so that is certainly a correct optimization, and it's correct exactly

90
00:06:09,840 --> 00:06:15,759
because statement 2 is always guaranteed to execute before statement 3.

91
00:06:15,759 --> 00:06:18,959
Another question we might be is whether we could eliminate this statement.

92
00:06:18,959 --> 00:06:27,560
So once we replace this by three times x, you know, maybe we don't need this assignment

93
00:06:27,560 --> 00:06:28,560
anymore.

94
00:06:28,560 --> 00:06:32,759
This was the only place that t was used, if t was a temporary value that was computed

95
00:06:32,759 --> 00:06:38,479
only to compute the value w, and then we can delete this statement.

96
00:06:38,479 --> 00:06:40,959
And this depends on the rest of the program.

97
00:06:40,959 --> 00:06:46,319
We have to know whether t has any other uses someplace else in the program, which we can't

98
00:06:46,319 --> 00:06:51,079
see just by looking at the single basic block.

99
00:06:51,079 --> 00:06:56,199
The next important grouping of statements is a control flow graph, and a control flow graph

100
00:06:56,199 --> 00:06:59,560
is a just a graph of basic blocks.

101
00:06:59,560 --> 00:07:05,360
And so there is an edge from block a to block b, if execution can pass from the last instruction

102
00:07:05,360 --> 00:07:08,319
in a to the first instruction of b.

103
00:07:08,319 --> 00:07:12,399
So essentially the control flow graph just shows how control flow can pass between the

104
00:07:12,399 --> 00:07:13,399
blocks.

105
00:07:13,479 --> 00:07:16,399
And there isn't, of course, no interesting control flow within a block.

106
00:07:16,399 --> 00:07:21,399
We know that the basic block will just execute from the first instruction to the last instruction.

107
00:07:21,399 --> 00:07:28,560
So the control flow graph is a way of summarizing the interesting decision points in a procedure

108
00:07:28,560 --> 00:07:36,319
or other piece of code showing where some interesting control flow decision is actually made.

109
00:07:36,319 --> 00:07:38,359
So here's a simple control flow graph.

110
00:07:38,360 --> 00:07:40,680
We consist of two basic blocks.

111
00:07:40,680 --> 00:07:45,840
The first basic block is outside of a loop and consists of some initialization code.

112
00:07:45,840 --> 00:07:48,680
And then we have one basic block here in the loop.

113
00:07:48,680 --> 00:07:51,639
The basic block consists of these three instructions.

114
00:07:51,639 --> 00:07:57,080
The bottom of the block is a branch, or a testing branch, where either we exit and go

115
00:07:57,080 --> 00:08:04,759
someplace else or we loop around and execute the loop body again.

116
00:08:04,759 --> 00:08:08,719
And the body of a method can always be represented as a control flow graph.

117
00:08:08,719 --> 00:08:11,599
The convention that we'll use is always a distinguished entry node.

118
00:08:11,599 --> 00:08:14,319
So there's a distinguished start node of the control flow graph.

119
00:08:14,319 --> 00:08:17,439
And typically it'll just be obvious to be the one listed at the top.

120
00:08:17,439 --> 00:08:23,000
And then there'll be some return nodes or one, some nodes which you can return from.

121
00:08:23,000 --> 00:08:25,879
And you know, you have every turn statements in the procedure.

122
00:08:25,879 --> 00:08:31,560
And return nodes or places where you exit the procedure will always be terminal, meaning

123
00:08:31,560 --> 00:08:36,799
there'll be no edges out of those blocks.

124
00:08:36,799 --> 00:08:41,799
Now the purpose of optimization is to improve a program's resource utilization.

125
00:08:41,799 --> 00:08:46,320
And for the purposes of this class, when we talk about optimization in our examples and

126
00:08:46,320 --> 00:08:49,279
in the videos, we're going to be talking about execution time.

127
00:08:49,279 --> 00:08:52,919
Now we're going to be talking about making the program run faster.

128
00:08:52,919 --> 00:08:55,879
And this is mostly what people are interested in.

129
00:08:55,879 --> 00:09:01,080
So most compilers do spend quite a bit of effort on making programs run faster.

130
00:09:01,080 --> 00:09:05,639
But it's important to realize that there are many other resources that we could optimize

131
00:09:05,639 --> 00:09:06,639
for.

132
00:09:06,639 --> 00:09:11,840
And actually for any resource that you can imagine, there probably is a compiler out there

133
00:09:11,840 --> 00:09:18,480
that spends some effort optimizing for it in certain domain, domains of application.

134
00:09:18,480 --> 00:09:22,800
So for example, there are compilers we might care about code size.

135
00:09:22,800 --> 00:09:25,560
We might care about the number of network messages sent.

136
00:09:25,559 --> 00:09:31,799
One of the things that are commonly optimized for our memory usage, disk accesses.

137
00:09:31,799 --> 00:09:37,679
So databases, for example, try to minimize the number of times you access the disk and

138
00:09:37,679 --> 00:09:41,519
power for battery powered devices.

139
00:09:41,519 --> 00:09:46,159
And the important thing about optimization is that it should not alter what the program

140
00:09:46,159 --> 00:09:47,159
computes.

141
00:09:47,159 --> 00:09:49,719
The answer still must be the same.

142
00:09:49,719 --> 00:09:55,239
So we're allowed to improve the program's resource utilization, but we can't change what

143
00:09:55,240 --> 00:10:00,639
the program will produce.

144
00:10:00,639 --> 00:10:05,240
For languages like C and Cool and all the languages that you're probably familiar with, there

145
00:10:05,240 --> 00:10:09,919
are three granularities of optimization that people typically talk about.

146
00:10:09,919 --> 00:10:11,840
One is called local optimization.

147
00:10:11,840 --> 00:10:15,519
And those are optimizations that apply to a basic block in isolation.

148
00:10:15,519 --> 00:10:20,600
So these are optimizations that occur within a single basic block.

149
00:10:20,600 --> 00:10:22,759
And they're what are called global optimizations.

150
00:10:22,759 --> 00:10:27,720
And this is really misnamed because it's not global across the entire program.

151
00:10:27,720 --> 00:10:32,159
What people mean by global optimization is it implies to a control flow graph.

152
00:10:32,159 --> 00:10:35,320
It's global across an entire function.

153
00:10:35,320 --> 00:10:41,200
So global optimizations would apply to a single function and optimize across all the basic

154
00:10:41,200 --> 00:10:44,120
blocks of that function.

155
00:10:44,120 --> 00:10:46,480
And finally, there are inter-procedural optimizations.

156
00:10:46,480 --> 00:10:49,680
These are optimizations that work across method boundaries.

157
00:10:49,679 --> 00:10:54,039
They take multiple functions and move things around to try to optimize the collection of

158
00:10:54,039 --> 00:10:57,039
functions as a whole.

159
00:10:57,039 --> 00:10:58,439
Many compilers do one.

160
00:10:58,439 --> 00:11:01,959
In fact, almost all compilers do one.

161
00:11:01,959 --> 00:11:04,959
Many, many compilers today do two.

162
00:11:04,959 --> 00:11:07,079
But not very many actually do three.

163
00:11:07,079 --> 00:11:14,279
So you see decreasing numbers of compilers doing these optimizations as you move up in

164
00:11:14,279 --> 00:11:15,919
the granularity.

165
00:11:15,919 --> 00:11:20,759
And partly that's because the optimizations are more difficult to implement.

166
00:11:20,759 --> 00:11:24,599
So it's just more work to implement the inter-procedural optimizations.

167
00:11:24,599 --> 00:11:32,240
But also because a lot of the payoff is in the more local optimizations.

168
00:11:32,240 --> 00:11:36,759
So expanding on that last point a little bit more, it turns out that in practice, while

169
00:11:36,759 --> 00:11:42,839
we know how to do many, many optimizations, often a conscious decision is made, not to

170
00:11:42,840 --> 00:11:48,600
implement the fanciest optimization that is known in the research literature.

171
00:11:48,600 --> 00:11:53,240
And that's kind of an unfortunate thing from my point of view of being somebody who's

172
00:11:53,240 --> 00:11:57,080
really likes compilers and spend a lot of time thinking about optimization.

173
00:11:57,080 --> 00:12:02,040
And maybe it's a little bit hard to accept for their professional compiler researchers

174
00:12:02,040 --> 00:12:07,720
that people don't always want to implement the latest and greatest optimizations.

175
00:12:07,720 --> 00:12:11,639
But it's worth understanding why that might not be the case.

176
00:12:11,639 --> 00:12:14,799
And it boils down, essentially, to software engineering.

177
00:12:14,799 --> 00:12:17,039
Some of these optimizations are really hard to implement.

178
00:12:17,039 --> 00:12:19,360
I mean, they're just complicated to implement.

179
00:12:19,360 --> 00:12:22,360
Some of the optimizations are costly in compilation time.

180
00:12:22,360 --> 00:12:29,319
So even though the compiling happens offline, it's not part of the running of the program.

181
00:12:29,319 --> 00:12:35,439
The program still has to wait while the optimizing compiler does its compilation.

182
00:12:35,439 --> 00:12:41,519
And if it takes hours or in some cases days to optimize a program, that's not the

183
00:12:41,519 --> 00:12:43,120
necessarily great.

184
00:12:43,120 --> 00:12:47,039
And some of these optimizations have low payoff.

185
00:12:47,039 --> 00:12:52,600
They might always improve the program, but they might only do it by a very small amount.

186
00:12:52,600 --> 00:12:57,439
And unfortunately, many of the fanciest optimizations in the literature have all three of these

187
00:12:57,439 --> 00:12:58,439
properties.

188
00:12:58,439 --> 00:12:59,439
They're complicated.

189
00:12:59,439 --> 00:13:02,679
They take a long time to run, and they don't do very much.

190
00:13:02,679 --> 00:13:09,319
And so it's not so surprising that not all of these get implemented in production compilers.

191
00:13:09,320 --> 00:13:13,280
And this actually points out what the real goal is an optimization.

192
00:13:13,280 --> 00:13:16,800
What we really want is maximum benefit for minimum cost.

193
00:13:16,800 --> 00:13:19,760
We're really talking about a cost-benefit ratio.

194
00:13:19,760 --> 00:13:25,440
So optimization costs a certain amount in code complexity, complexity of the compiler,

195
00:13:25,440 --> 00:13:30,320
in programmer time, waiting for the compiler to run.

196
00:13:30,320 --> 00:13:34,960
And the benefit, they have now that it improves the program, has to be sufficient to justify

197
00:13:34,960 --> 00:13:35,960
those costs.

