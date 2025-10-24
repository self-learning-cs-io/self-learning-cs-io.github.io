---
title: CMU15721 P7S202406 VectorizedQueryExecutionUsingSIMDCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Carnegie Mellon University's Advanced Database Systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:09,000 --> 00:00:11,000
I don't want to know what kind of club.

4
00:00:11,000 --> 00:00:13,000
I just want to know.

5
00:00:13,000 --> 00:00:18,000
So today we're going to talk about vectorized career execution.

6
00:00:18,000 --> 00:00:21,000
Again, this has been the thing we've been leading up to the entire semester.

7
00:00:21,000 --> 00:00:25,000
Like, we've been saying this is the one of the ways that a modern

8
00:00:25,000 --> 00:00:27,000
OLAP system is going to get good career performance.

9
00:00:27,000 --> 00:00:31,000
We'll see why and why and why it doesn't always do this.

10
00:00:31,000 --> 00:00:35,000
So last class we talked about how to take a query plan,

11
00:00:35,000 --> 00:00:38,000
divide it up into pipelines and run them in parallel.

12
00:00:38,000 --> 00:00:42,000
So this is a method of task parallelization.

13
00:00:42,000 --> 00:00:47,000
So how to take a query plan, bring up the task, and run those in parallel.

14
00:00:47,000 --> 00:00:50,000
We haven't said how to schedule them and where to schedule them.

15
00:00:50,000 --> 00:00:54,000
That'll be in next week.

16
00:00:55,000 --> 00:00:57,000
But at a high level we understand we could run things in parallel.

17
00:00:57,000 --> 00:01:00,000
We'd be called less things with exchange operators.

18
00:01:00,000 --> 00:01:03,000
And then we also discussed how the davis system would actually evaluate

19
00:01:03,000 --> 00:01:08,000
any kind of expressions and wear clause or a join clause.

20
00:01:08,000 --> 00:01:13,000
And we saw this as being a sort of preview to query compilation stuff

21
00:01:13,000 --> 00:01:17,000
that we'll talk about on or just a non-compliance in the code generation stuff

22
00:01:17,000 --> 00:01:20,000
we'll talk about on Wednesday this week.

23
00:01:20,000 --> 00:01:23,000
And then we also introduced the idea of query at adaptivity.

24
00:01:23,000 --> 00:01:26,000
We're not going to push in this too much just yet.

25
00:01:26,000 --> 00:01:29,000
But it's the idea that the optimizer spits out a query plan

26
00:01:29,000 --> 00:01:32,000
and that it run time while the davis system is executing that query,

27
00:01:32,000 --> 00:01:35,000
it can decide whether that query plan was a good idea or not

28
00:01:35,000 --> 00:01:41,000
and can make some changes either to change the ordering that it checks predicates,

29
00:01:41,000 --> 00:01:44,000
what code path it would use to do certain things.

30
00:01:44,000 --> 00:01:47,000
But then we'll see later in the semester how to do bigger things

31
00:01:47,000 --> 00:01:51,000
like change the actual query plan on the fly while we're running.

32
00:01:52,000 --> 00:01:59,000
So today's task or today's class is going to be about vectorization.

33
00:01:59,000 --> 00:02:03,000
And the idea here is that we want to take the scalar algorithms that we discussed

34
00:02:03,000 --> 00:02:09,000
in the introduction class where we're going to operate on a single tuple at a time

35
00:02:09,000 --> 00:02:12,000
and in some cases even a single operand at a time.

36
00:02:12,000 --> 00:02:18,000
And we're going to convert them into a vectorized form and rely on

37
00:02:18,000 --> 00:02:24,000
simd instructions that the CPUs provide for us to be able to run multiple operations

38
00:02:24,000 --> 00:02:30,000
within an operator or expression, whatever we're trying to do, at the same time.

39
00:02:30,000 --> 00:02:34,000
And so this is to be notion as data parallelization that we're going to have

40
00:02:34,000 --> 00:02:39,000
multiple computations occurring at the same time for multiple pieces of data.

41
00:02:39,000 --> 00:02:44,000
And then simd is going to achieve this.

42
00:02:45,000 --> 00:02:50,000
So why does this matter? Well, again, the same way that scaling out across multiple threads,

43
00:02:50,000 --> 00:02:54,000
processes or nodes, it's going to give us additional improvement performance

44
00:02:54,000 --> 00:02:58,000
because we're not restricted to what a single thread on a single query can do.

45
00:02:58,000 --> 00:03:03,000
In some cases, we can get even bigger speed up because of simd because that also can run parallel

46
00:03:03,000 --> 00:03:09,000
across multiple cores. And then the speed up we'll get will be multiplicative.

47
00:03:09,000 --> 00:03:13,000
So every core we can run have a data parallel algorithm and across all those cores

48
00:03:14,000 --> 00:03:18,000
they're all running at the same time. So let's say that I'm on a machine that has 32 cores,

49
00:03:18,000 --> 00:03:25,000
assuming I can scale out perfectly linearly, then I can divide my task up into 32 discrete tasks.

50
00:03:25,000 --> 00:03:31,000
So that's a 32x speed up. And then if I can have a portion of that computation,

51
00:03:31,000 --> 00:03:37,000
knowing how we get 2ples in and out for now, that can run on using simd and it can do

52
00:03:38,000 --> 00:03:44,000
process 4 2ples at a time. So then it's 32x times 4x. So in theory, for the scenario here,

53
00:03:44,000 --> 00:03:49,000
we could get up to 128x improvement in performance. And that's just on a single node.

54
00:03:49,000 --> 00:03:54,000
And that's pretty significant. Anything that's at least an order magnitude is a huge win.

55
00:03:54,000 --> 00:04:01,000
2 orders magnitude is the unheard of. Now, we're never going to come close to this because as I was saying,

56
00:04:01,000 --> 00:04:04,000
there's a bunch of stuff we have to do to get things in and out of the registers,

57
00:04:05,000 --> 00:04:08,000
in and out, through operators, copying things from disks, anything over the network.

58
00:04:08,000 --> 00:04:12,000
Like this, we're never even going to come close. And in some best cases scenario,

59
00:04:12,000 --> 00:04:18,000
when we look at some vectorized algorithms, we might get 1.4x speed up if we're lucky.

60
00:04:22,000 --> 00:04:26,000
But that doesn't mean we shouldn't be doing this. So we covered this, I think early in the semester,

61
00:04:26,000 --> 00:04:30,000
we did a quick preview of what simd actually is. So I don't want to spend too much time in it.

62
00:04:31,000 --> 00:04:36,000
Again, the idea goes back to this notion of this classification of what these instructions are actually going to be,

63
00:04:36,000 --> 00:04:42,000
goes back to the 1960s. There was this thing called Flynn's taxonomy where he described what system instructions are,

64
00:04:42,000 --> 00:04:47,000
simd, and I think memd as well. And I think at the time they're all theoretical,

65
00:04:47,000 --> 00:04:51,000
like you could have these things in the 60s, but obviously now in the 2020s,

66
00:04:51,000 --> 00:04:58,000
these things have been around for quite a while. So we can exploit them and use them inside of our database systems.

67
00:04:59,000 --> 00:05:07,000
So simd is going to be a class of CPU instructions that can allow our processor to do the same operation

68
00:05:07,000 --> 00:05:13,000
on multiple pieces of data at the same time. And the way this is going to work is that we're going to rely on these special simd registers

69
00:05:13,000 --> 00:05:17,000
as a way to get things into these instructions and out of these instructions.

70
00:05:17,000 --> 00:05:22,000
And the overall goal as we go through is that we want to keep things out in the simd registers

71
00:05:22,000 --> 00:05:25,000
for as long as possible, do as much processing as we can.

72
00:05:26,000 --> 00:05:31,000
And then Papy you guys read talked about because AVX512, we can achieve this now better than we used to.

73
00:05:31,000 --> 00:05:37,000
You want to keep things out in the simd registers as long as possible and only bring it out to the CPU cache or memory

74
00:05:37,000 --> 00:05:41,000
when we're done with whatever it is we're going to do.

75
00:05:41,000 --> 00:05:49,000
So we're going to focus most of this lecture on AVX512, but this is showing here that every other ISA has their own variants of them.

76
00:05:50,000 --> 00:05:55,000
And in the case of Intel, it goes back to the 1990s when they first put up these in the next stuff.

77
00:05:59,000 --> 00:06:01,000
Question is PowerPC still a thing?

78
00:06:03,000 --> 00:06:05,000
I mean, what do you mean still a thing?

79
00:06:05,000 --> 00:06:07,000
Like does it exist? Yes, or people paying a lot of money?

80
00:06:07,000 --> 00:06:12,000
Oh, what's the market share of PowerPC for databases? I mean pretty small.

81
00:06:13,000 --> 00:06:21,000
But there's enough legacy software that's running on some really old systems that we need to run the PowerPC.

82
00:06:21,000 --> 00:06:27,000
I mean, I am asked to still like the number one, I think about NLN this too.

83
00:06:27,000 --> 00:06:32,000
I saw some reports saying IBM makes most of its money on from IMS more than any other piece of software.

84
00:06:32,000 --> 00:06:34,000
And they invented that for the Apollo Moon mission in the 60s.

85
00:06:34,000 --> 00:06:37,000
Because there's all these banks that are still running on this stuff.

86
00:06:38,000 --> 00:06:40,000
Again, if it's mission critical, you don't want to mess around.

87
00:06:40,000 --> 00:06:43,000
Like, let me just switch to something else.

88
00:06:43,000 --> 00:06:46,000
Because there's the major engineering effort.

89
00:06:46,000 --> 00:06:48,000
And if it fails, then your business is screwed.

90
00:06:48,000 --> 00:06:55,000
PowerPC has some other advantages over X86 for a variety of things.

91
00:06:55,000 --> 00:06:58,000
Yeah, if you were to go back and do start with today, would you use PowerPC?

92
00:06:58,000 --> 00:06:59,000
No.

93
00:06:59,000 --> 00:07:02,000
I mean, you can't get it from any of the cloud vendors.

94
00:07:08,000 --> 00:07:10,000
Right? Yes.

95
00:07:10,000 --> 00:07:18,000
I mean, so again, this is just saying that these, there's other categories, I mean, not remember the categories,

96
00:07:18,000 --> 00:07:24,000
or releases of SIMD instructions for different platforms, the ISAs, not just the AVX stuff.

97
00:07:24,000 --> 00:07:30,000
But again, we're going to focus on this because this is, when they re-intil put this out,

98
00:07:30,000 --> 00:07:34,000
they added some additional things that make it better for database systems in a way that we didn't have before.

99
00:07:34,000 --> 00:07:37,000
Or we didn't sort of emulate stuff ourselves.

100
00:07:37,000 --> 00:07:39,000
So this is the example that I showed before.

101
00:07:39,000 --> 00:07:41,000
We wanted to do a simple operation.

102
00:07:41,000 --> 00:07:46,000
Take two matrices, X plus Y, add them together, and produce the new matrix, Z.

103
00:07:46,000 --> 00:07:51,000
So again, if you're going to write this with scalar code or using system instructions,

104
00:07:51,000 --> 00:07:57,000
you just have a for loop that iterates over every element of X and I, and then write out the Z.

105
00:07:57,000 --> 00:08:03,000
So your linearity is going through the each element of the two arrays, one by one,

106
00:08:03,000 --> 00:08:10,000
running one instruction, adding together, and then one store instruction to put it out into the output buffer Z.

107
00:08:10,000 --> 00:08:16,000
And, you know, it's like a pilot going to be smart about this, so it can unroll it, right, to speed things up.

108
00:08:16,000 --> 00:08:21,000
But for now, at the end of the day, it's still going to execute a single instruction to add two numbers together,

109
00:08:21,000 --> 00:08:25,000
to write it out to another register, or another read out memory.

110
00:08:25,000 --> 00:08:31,000
So SIMD, what we can do is we can take a vector of values,

111
00:08:31,000 --> 00:08:37,000
and assuming here we're doing 32 bit numbers for elements, so 120 bit bit register,

112
00:08:37,000 --> 00:08:41,000
can A, V, X, 5, 12, it's going to be 512 bit registers, so we can put more things in there.

113
00:08:41,000 --> 00:08:48,000
So now it's going to be one SIMD instruction to add up the offsets, the matching offsets across the two registers,

114
00:08:48,000 --> 00:08:50,000
and produce a single output.

115
00:08:50,000 --> 00:08:52,000
And then do the same thing for the other one, add it together and produce the output.

116
00:08:52,000 --> 00:08:59,000
So what took before eight instructions to do eight addition instructions, now we can do it down to two.

117
00:08:59,000 --> 00:09:03,000
Right? This is why this is going to be important, obviously for databases,

118
00:09:03,000 --> 00:09:11,000
if we're trying to rip through columns and columns of billions of tuples, we want to be able to take advantage of this.

119
00:09:11,000 --> 00:09:17,000
So there's two type of vectorization we can have in our system, in our data system.

120
00:09:17,000 --> 00:09:23,000
The first is what I just showed, or the first would be what is called horizontal vectorization,

121
00:09:23,000 --> 00:09:28,000
where the idea is that you're going to have some instruction that's going to take all the elements within a SIMD register,

122
00:09:28,000 --> 00:09:30,000
and then produce a single scalar output.

123
00:09:30,000 --> 00:09:36,000
Like if I want to get the summation of all the elements within this four-lane register here,

124
00:09:36,000 --> 00:09:42,000
there's some instruction that can do that, and that produces some scalar output there.

125
00:09:42,000 --> 00:09:48,000
Early CPUs don't support this, it's mostly found in the newer CPUs that can do, or at least on the X86,

126
00:09:48,000 --> 00:09:53,000
like a new AVX2, which is the precursor to AVX512.

127
00:09:53,000 --> 00:09:56,000
But this is not going to be entirely useful for the stuff we want to do in databases.

128
00:09:56,000 --> 00:10:02,000
The one we care about is vertical vectorization, where the idea, again, is that we have two registers,

129
00:10:02,000 --> 00:10:06,000
and they're lined up across lanes, so assuming the values are all fixed length at the same size,

130
00:10:06,000 --> 00:10:12,000
and we just need one instruction to do some operation on the combination of the two,

131
00:10:12,000 --> 00:10:16,000
and then produce a new output.

132
00:10:16,000 --> 00:10:24,000
So this is way more common. This is the technique we're mostly going to be using in our database of going forward,

133
00:10:24,000 --> 00:10:28,000
but again, you could do this as well.

134
00:10:30,000 --> 00:10:34,000
Actually, yeah, so I think the stop one here, I think this shows, like, think of like a summation,

135
00:10:34,000 --> 00:10:41,000
if I want to add up all the values in the column, you could use horizontal vectorization for that.

136
00:10:41,000 --> 00:10:43,000
So this is a table just showing that, yes.

137
00:10:43,000 --> 00:10:51,000
I know for a population, for a number of vectors, it's like using any field.

138
00:10:51,000 --> 00:10:53,000
Is it using assessment? I think so, yes.

139
00:10:53,000 --> 00:11:00,000
I think we have an example of clickouts, clickouts is doing this for summation.

140
00:11:00,000 --> 00:11:06,000
So this is the table showing the history of the different simile extensions that Intel has put out over the years.

141
00:11:06,000 --> 00:11:10,000
And again, the one we care about here is the bottom that came out in 2017, AVX512.

142
00:11:11,000 --> 00:11:19,000
So the registers are going to be 5 on 12 bits. It's going to support integers, single precision and double precision floating numbers.

143
00:11:19,000 --> 00:11:32,000
And then the big one is going to be that you read in the papers that they're going to support these permutations or predicate masks that allow us to keep track of or specify which lane should an operation actually apply on.

144
00:11:32,000 --> 00:11:39,000
And prior to that, this coming out in AVX512, this is something that the database is going to have to do themselves by basically using a set of data.

145
00:11:39,000 --> 00:11:49,000
And then using a separate register to store like bitmask like that, where it's now in the case of the XF12, there's explicit registers to do those things.

146
00:11:49,000 --> 00:11:57,000
So this link here will take you to a great presentation by James Nandiris. He was an Intel fellow from any 2017 or so.

147
00:11:57,000 --> 00:12:02,000
But he gives a good history of all these things and why this matter and what some of the cool things in AVX512.

148
00:12:02,000 --> 00:12:07,000
So if you're interested in this kind of stuff, you can go check it out.

149
00:12:07,000 --> 00:12:14,000
So as I said, AVX512 is the one that we care about. It's not to say that people weren't doing vectorization and data this is before this.

150
00:12:14,000 --> 00:12:18,000
It just makes everything a lot easier.

151
00:12:18,000 --> 00:12:29,000
And so in addition to having the new instructions and new data conversions and scatter operations, which is what we'll cover in a second, the permutations is the big one.

152
00:12:29,000 --> 00:12:38,000
So I'll be able to say here's some bitmask that says I want certain operations, the operation I'm going to apply to only occur at these different lanes.

153
00:12:38,000 --> 00:12:51,000
And so the downside though is that unlike in AVX2 and SSE234, like in these earlier extensions to X86 or SIMD, they were all all or nothing.

154
00:12:51,000 --> 00:12:58,000
Meaning like if I said my CPU is supported AVX2, I got all the capabilities and instructions that I would expect to have in AVX2.

155
00:12:58,000 --> 00:13:04,000
For whatever reason, it's an Intel thing that when AVX512 came out, they broke it up into groups.

156
00:13:04,000 --> 00:13:11,000
So now when you buy a processor, you have to go check the CPU flags to see what instructions you actually support.

157
00:13:11,000 --> 00:13:20,000
And we'll see an example again from Clickhouse. Well, they'll have if blocks in their code that says, am I compiling to AVX512 with this group or that group versus that group?

158
00:13:20,000 --> 00:13:30,000
Because they'll have different instructions and different capabilities. So to give you an idea of how confusing it is, like this is from Wikipedia, they're just showing all the different groups you could have for AVX512.

159
00:13:30,000 --> 00:13:39,000
And then which iterations of the ISA going back to the Xeon 5 actually supports these. And as you can see, not everyone has everything.

160
00:13:39,000 --> 00:13:46,000
There's another chart here from I think one of the papers that again, they're showing you how these things have been sort of added over time.

161
00:13:46,000 --> 00:13:54,000
But then now within, well, here's a little something that AVX512, but like there's newer versions that don't have things that are really versatile.

162
00:13:54,000 --> 00:14:00,000
So even though you say you support 8X512, the system has to go check what actually it has.

163
00:14:00,000 --> 00:14:09,000
Again, we'll look at a Clickhouse and see them in a second. They have if clauses in their source code that figures out what CPU capabilities are available.

164
00:14:09,000 --> 00:14:17,000
So again, there'll be other issues with AVX512 in a second where I won't spoil it just yet.

165
00:14:17,000 --> 00:14:24,000
So even though I'm going to spend a little time with the hey, great, you can do this. If you do this, the back of your mind realize like, you may not always be able to do this.

166
00:14:24,000 --> 00:14:30,000
In some cases, do you actually run slower if you use the X512 when I'll explain why in a second?

167
00:14:30,000 --> 00:14:35,000
All right, so how do we actually want to get, how do you want to actually use this?

168
00:14:35,000 --> 00:14:42,000
There's basic three approaches. Do I want the compiler to figure out what can vectorize? Do I want to get hints to the compiler to say how to vectorize things?

169
00:14:42,000 --> 00:14:46,000
Or do I want to do the vectorization myself?

170
00:14:46,000 --> 00:14:53,000
And so the way to think about these three approaches is that the top one is the easiest to use because you don't want to think about it in some ways.

171
00:14:53,000 --> 00:15:00,000
Sometimes you do, sometimes you don't. And just hope the compiler can figure out how to compile things and vectorize your algorithm.

172
00:15:00,000 --> 00:15:12,000
And if you design your database system in such a way that you break things up into small and up chunks that are looping over arrays, then the compiler could potentially be able to figure it out. But not always.

173
00:15:12,000 --> 00:15:18,000
The compiler hints at this giving a little nudge to the compiler say hey look, you really can vectorize this, I think you should, and hope it tries to figure it out.

174
00:15:18,000 --> 00:15:29,000
And then the last one is like you write the actual instructions in your code to actually invoke the exact simm-y instructions you want.

175
00:15:29,000 --> 00:15:32,000
So let's go through these one by one.

176
00:15:32,000 --> 00:15:42,000
So they said on actualization the idea is that the compiler can potentially identify when certain instructions inside of a tight loop could be rewritten as vectorized instructions.

177
00:15:42,000 --> 00:15:54,000
And so my example that I shouldn't very beginning that iterating over in array to arrays and adding them together, that's something obviously that the compiler should be able to figure out.

178
00:15:54,000 --> 00:16:05,000
So this is only going to work for simple loops. And in some cases in database systems it doesn't always pan out. This has gotten better than the GCC and Clang.

179
00:16:05,000 --> 00:16:09,000
And certainly ICC have gotten a lot better where it can start figuring these things out without hints.

180
00:16:09,000 --> 00:16:18,000
But maybe five years ago this was an issue. And obviously if you don't have simm-y instructions in your CPU that you're compiling on, the compiler is not going to try to use it.

181
00:16:18,000 --> 00:16:25,000
So if you say you compile on your laptop that doesn't have 8x512 you take that binary, plop it up on your enterprise grade, Xeon server.

182
00:16:25,000 --> 00:16:30,000
Even though the Xeon server is going to have 512 it was compiled without it at the time because it's a pile on your laptop.

183
00:16:30,000 --> 00:16:35,000
So you've got to be mindful of where you're actually compiling and running things.

184
00:16:35,000 --> 00:16:38,000
So this is our example that we have before.

185
00:16:38,000 --> 00:16:47,000
So that's where we're now going to pass in pointers to erase x, y, and z. And we're going to loop over them by some max value and add them together.

186
00:16:47,000 --> 00:16:59,000
Right? Can we auto-vectorize this? She's taking her head yes. Raise your hand if you think yes. Raise your hand if you say no. Why no?

187
00:16:59,000 --> 00:17:05,000
Well he says need to restrict. What does that mean? Why? Why?

188
00:17:05,000 --> 00:17:09,000
Because it's a pointer that is overclassed.

189
00:17:09,000 --> 00:17:18,000
Yes. So if the pointer is overlapped then there's dependency. So again, think of compile time. Do I know what the pointers of x, y, and z are pointing to?

190
00:17:18,000 --> 00:17:26,000
No. Right? That's a runtime thing. So in this case here the compiler will say hey, x, y, and z could actually be pointing to the same thing.

191
00:17:26,000 --> 00:17:48,000
So I can't vectorize this because let's say that z is just one byte more than the memory address of x. So now if I'm ripping through my code at runtime in the scalar version for one iteration of x, run the iteration of the loop, I'll overwrite what the next value should be.

192
00:17:48,000 --> 00:18:01,000
Right? And so now in the next iteration I'll get a different computation. But if I vectorize that with simd, then when I do the computation of the second iteration, it won't see the effects of the first iteration. So it actually produce a different result.

193
00:18:01,000 --> 00:18:15,000
So the compiler is me very, very careful to make sure that if it vectorizes your code, it doesn't produce something that generates a different value for a different computation than it would have a scalar code.

194
00:18:15,000 --> 00:18:36,000
Yes. So can the compiler do loop-on-roading? Can't the compiler do loop-on-rolling then auto vectorize that? But again, you don't know what z is actually pointing to potentially. Right?

195
00:18:36,000 --> 00:18:49,000
So it's going to be very conservative. It doesn't want to avoid any kind of problems. So in this case here, it's going to say, I don't know what x, y, and z are actually pointing to. So I can't vectorize this. So his, sorry, question.

196
00:18:49,000 --> 00:18:58,000
For us, we actually can say that. Well, he said the same thing as for us. You can't do that. Yes. We'll get that in a second.

197
00:18:58,000 --> 00:19:18,000
We're in c++ cLan. All right. So the, he said, Patrick said, oh, you could use the shikki word. And that's an example of a compiler hint. So that's, it's we as the programmer can tell the compiler something about our code to make it more like a compiler.

198
00:19:18,000 --> 00:19:31,000
To make it more likely to try to auto vectorize something. And so the, the shikki word to see in a second, that's an example of giving explicit information about memory locations to say these things can't overlap. They're not going to change.

199
00:19:31,000 --> 00:19:46,000
While this loop is running, therefore you can auto vectorize it. They more, a more brute force approach. You just tell the compiler, hey, turn off any checks for dependencies, really, this thing here. Right? And just vectorize it. Trust me. Like, you know, driving without the seat belt. All right.

200
00:19:46,000 --> 00:19:57,000
So going back to function before, as he said, if you add the shikki word, which is in c99, but it's not in the seat of the full standard, but it pretty much every c++ compiler supports it.

201
00:19:57,000 --> 00:20:08,000
Right. You add the shikki word, and that's telling you that these arrays are going to be distinct locations. That were the, the, the, it's, for the lifetime of the pointer, they're not going to change.

202
00:20:08,000 --> 00:20:15,000
So, at least within this function. So therefore, it's, it knows that it's safe to actually vectorize this. So this approach is, is widely used.

203
00:20:15,000 --> 00:20:22,000
Like, so if you go looking like it in duck DB, you just search for restrict, and then in c++, the, it's underscore underscore restrict.

204
00:20:22,000 --> 00:20:27,000
So you see all these functions are set up to do this kind of stuff. Right.

205
00:20:27,000 --> 00:20:36,000
And the goal here is that the, you know, duck DB wants the compiler to figure out how to auto vectorize this. So it's passing that hint to, hint to it.

206
00:20:36,000 --> 00:20:42,000
The point also to here, you can see sort of two versions of the, of doing this check here, right.

207
00:20:42,000 --> 00:20:51,000
There's the, is, is all the bit mask I'm getting, is everything, is that, if everything is not valid, then I have to check my bit mask to see whether it's valid.

208
00:20:51,000 --> 00:21:00,000
If I know everything is valid, then I can skip that extra check. Right. So that's, we saw that sort of technique with, um, checking for nulls with, with Velocs. Right.

209
00:21:00,000 --> 00:21:07,000
So you know there's a conditional here. It's worth it not to do that additional check on rows.

210
00:21:07,000 --> 00:21:17,000
This is a click house. Click house does the same thing up above. So this is to do a, an aggregate, some computation, which I think would be horizontal vectorization.

211
00:21:17,000 --> 00:21:33,000
Again, you see this underscore underscore restrict on the pointer. But then they had this other beast in here, which is, uh, they're actually checking again what AVX 512 group the CPU actually has, then it has different implementations to, to do that computation. Yes.

212
00:21:33,000 --> 00:21:36,000
You should be able to get that right.

213
00:21:36,000 --> 00:21:41,000
This question should be to if death this, these are all like macros too. Yeah.

214
00:21:41,000 --> 00:21:48,000
Yeah, when these are all like crazy macros, we get, uh, you know, the code. I don't, I don't know about.

215
00:21:48,000 --> 00:21:55,000
Yeah. I think that's probably, that's probably also pounded F. As well. If death.

216
00:21:55,000 --> 00:22:05,000
And it's probably, I think it's a nip death. Manning above you have like, uh, use multi target CPU code.

217
00:22:05,000 --> 00:22:22,000
Yeah, it would be dead code. Yes. Yeah. But the punge, this is a good example like, hey, here's, you know, there's two versions of AVX 512. There's AVX 2. There's SSE 4 was to pre-curse AVX 2. Right.

218
00:22:22,000 --> 00:22:31,000
So the main thing I came out of here is like, it's AVX 512. Oh, no, no, not really yet. You have to check what group you actually have. Right.

219
00:22:31,000 --> 00:22:41,000
So restricted, probably most common one on alternative is use these pragmas, uh, IV depth, uh, which is basically ignore, uh, vector dependencies, vectorization dependencies.

220
00:22:41,000 --> 00:22:48,000
Open MP, the big parallelization framework library, they have like, uh, pragmas, send, send, there's different versions of this.

221
00:22:48,000 --> 00:22:55,000
This basically says ignore any of your aliasing checks when you do an auto vectorize this. Right. And you would end up the same thing.

222
00:22:55,000 --> 00:23:05,000
And again, this is up to the data programmer to make sure that this is done correctly because the compiler would do whatever you, will likely do whatever you wanted to do.

223
00:23:05,000 --> 00:23:13,000
The last alternative is to explicit vectorization. And for this one, we're going to have to rely on what's in trinx or CPU in trinx.

224
00:23:13,000 --> 00:23:22,000
And you think of it in trinx as like a, uh, like a virtual function, but it's like a fake function in the, in your C++ code.

225
00:23:22,000 --> 00:23:33,000
It looks like a function, but it has an underscore or double underscore in front of it. And it really is translating into these ac, Cindy instruction that you want the compiler to, to emit for that, that line of code.

226
00:23:33,000 --> 00:23:44,000
Right. And that's how you call it explicitly the, the Cindy operation that you want, or you know, put things into registers and what registers you want to touch and so forth.

227
00:23:44,000 --> 00:23:51,000
Now, the problem with this is that, you know, you want exact control of your database system. This is what, you know, you need to use this.

228
00:23:51,000 --> 00:23:59,000
And talking to friends in industry, this is what BigQuery does. This is what, uh, this is what Redshift does in some other systems.

229
00:23:59,000 --> 00:24:05,000
And in that environment, because they're hosted database systems, they control the hardware, they know what VMs they're running on in the cloud.

230
00:24:05,000 --> 00:24:10,000
So they can, they can make that choice. Then, you know, they're not trying to run a power PC, for example.

231
00:24:10,000 --> 00:24:16,000
But obviously, if you use like an x86 in trinx, you can't run on arm or some other CPU.

232
00:24:16,000 --> 00:24:26,000
Now, there are some libraries that can hide some of these Cindy's in trinx and have ways to step down to, uh, to, you know, the smaller register size as needed,

233
00:24:26,000 --> 00:24:33,000
or, they don't want grouping or extensions to support. Google HiWay is probably the most common one. I don't know of any data system that actually uses this.

234
00:24:33,000 --> 00:24:37,000
I guess we could just, you know, grab the source code of the source ones to figure it out.

235
00:24:37,000 --> 00:24:42,000
Um, let Cindy is another one that's, that's why he's, again, I'm not sure outside of the data system.

236
00:24:42,000 --> 00:24:48,000
Ross has his own, uh, Cindy library, but I think it's only turned on for experimental nightly.

237
00:24:48,000 --> 00:24:51,000
Um, I've never used it.

238
00:24:51,000 --> 00:24:57,000
Uh, the one student that was here before, she, he says he just uses, you just, let's alter vectorization handle everything.

239
00:24:57,000 --> 00:25:07,000
And as you said, because the compiler is in better shape to understand where our things will collide, because there's more explicit control over, uh, memory locations.

240
00:25:07,000 --> 00:25:11,000
All right. So if you were going to use in trinx, so that one of these libraries, it would essentially look like this.

241
00:25:11,000 --> 00:25:20,000
Right? They had these, on the score underscore, underscore, and then the, the prefix of what sort of group of Cindy extensions you're using, then you say, what size the register you want?

242
00:25:20,000 --> 00:25:28,000
You know, in, in I means you're showing integer. So all we're doing here is casting the, the integer vectors we were given, putting them into the Cindy registers.

243
00:25:28,000 --> 00:25:35,000
And then now we can do our, our, do our loop and do Cindy addition and then store it in the, uh, in the output vector we want.

244
00:25:35,000 --> 00:25:40,000
And now you can see here our loop, we're going, we're doing four additions at the same time.

245
00:25:40,000 --> 00:25:45,000
So we don't, we need, you know, divide the number of iterations we would have divided by four.

246
00:25:45,000 --> 00:25:47,000
Right?

247
00:25:47,000 --> 00:25:50,000
So this is roughly what, what it looks like.

248
00:25:50,000 --> 00:25:56,000
All right. So which one do you think is the best explicit?

249
00:25:56,000 --> 00:25:59,000
There's control.

250
00:25:59,000 --> 00:26:02,000
Why can't we raise that?

251
00:26:02,000 --> 00:26:05,000
What is the best performance?

252
00:26:05,000 --> 00:26:08,000
Explosive.

253
00:26:08,000 --> 00:26:10,000
What's the easiest to write?

254
00:26:10,000 --> 00:26:19,000
Yeah, so, so let's see, uh, let's see how, what, so let's see what the performance difference you get from like explicitly writing, uh, vectorized code.

255
00:26:19,000 --> 00:26:33,000
So this is the paper we did with the Germans a few years ago, um, where we compared against, uh, the vectorized, the vectorized approach for, for doing, for processing and then the, the hyper approach, which will cover next class.

256
00:26:33,000 --> 00:26:40,000
Um, and the, the student in Germany wrote sort of one system that supported both, both these techniques and did a bakeoff between the two of them.

257
00:26:40,000 --> 00:26:52,000
The idea is to strip out all the extra stuff that, that, that differentiates between, you know, vectorized or hyperother system, get it down to a, a common substrate to the extent that you can, um, for these two approaches.

258
00:26:52,000 --> 00:26:56,000
And then that way you have a pure, you know, apples, apples comparison between the different approaches.

259
00:26:56,000 --> 00:26:57,000
Right?

260
00:26:57,000 --> 00:27:06,000
Because there's, there's other things that would come up like the way hyper does numerics would be different than vector wise and some queries and TPCH, you know, that would make actually a big difference.

261
00:27:06,000 --> 00:27:12,000
So it was a single test bed system that did both vector wise and, and hyper which will cover next class.

262
00:27:12,000 --> 00:27:20,000
And we just wanted to measure how well a compiler can, uh, can auto vectorize a bunch of the vector wise primitives.

263
00:27:20,000 --> 00:27:31,000
Um, so again, thing of like a perimeter being a single function that takes in array or a vector of, of, of two balls of a certain type and runs like, you know, there's something less than something is something greater than something.

264
00:27:31,000 --> 00:27:35,000
Like how well could it vectorize those sort of small loops of code, similar to what I showed before.

265
00:27:35,000 --> 00:27:40,000
And so we compared against, we used clang, GCC and ICC, which is Intel's compiler.

266
00:27:40,000 --> 00:27:53,000
We, ICC, it's not free, it's not open source, but this is obviously way better at auto vectorizing, at least a few years ago than, than GCC and clang, but again, GCC and clang, I've gotten better, but at the time ICC was, was much, much better.

267
00:27:53,000 --> 00:27:59,000
And again, you pay for that because Intel, you know, Intel, chose the hardware, they obviously can write really good compilers for it too, as well.

268
00:27:59,000 --> 00:28:09,000
So we're going to basically do a comparison between hashing, selection, and projection, and some other operations that you have to run for the full query we didn't, we didn't vectorize because you can't.

269
00:28:10,000 --> 00:28:21,000
All right, so this is running across some select number queries of TPCH. And the first bar here is complete auto vectorization, let the compiler do everything.

270
00:28:21,000 --> 00:28:36,000
The black bar would be just, if you, if you do it by hand, and then the red bar would be the combination of let the, let the compiler auto vectorize everything, then we would go check and see whether, which function didn't get auto vectorize and we go back and do that and mainly here.

271
00:28:36,000 --> 00:28:48,000
And what we're measuring here is the reduction of the number instructions versus like a scalar approach when you don't do any vectorization, you don't, you don't want the compiler to do any vectorization.

272
00:28:48,000 --> 00:29:05,000
Right. So, you know, the main takeaway here is that the, in this case, higher is better, but there are some cases where the, you know, the manual one, for whatever reason, like because it was just so complicated to actually write, we always didn't get adhesion for it.

273
00:29:05,000 --> 00:29:15,000
And then we had a good adhesion for it in the reduction of number instructions, but the combination of letting what the compiler does and then going back as a human and cleaning things up.

274
00:29:15,000 --> 00:29:26,000
You know, was actually the best approach for all these. Right.

275
00:29:27,000 --> 00:29:36,000
It's a bit is like, can you, with this not working a real system because you don't want to query ahead of time. Again, we're, we're trying to vectorize the primitives, right.

276
00:29:36,000 --> 00:29:45,000
And they're not specific to any one query. Like, take a column of integers, check to see whether the, the numbers less than a single value, that's what we were auto vectorizing.

277
00:29:45,000 --> 00:29:52,000
It wasn't hard coded exactly for, you know, Q1, Q6 and so forth. Right. So technically it was still a general purpose system.

278
00:29:52,000 --> 00:29:57,000
We're just trying to auto vectorize like the actual low, low operations are permitted within them. Yes.

279
00:29:57,000 --> 00:30:01,000
Yeah, I forget what I forget why that was the case.

280
00:30:04,000 --> 00:30:13,000
Again, it's the, I think it'll be the paper. I forget why that was the case. Yes.

281
00:30:13,000 --> 00:30:24,000
Why is what, why is Q6? Why is Q6 for 4, Q3?

282
00:30:24,000 --> 00:30:31,000
I forgot. I have to go look at this. The paper, I don't, I think I've checked. It doesn't matter.

283
00:30:31,000 --> 00:30:36,000
Yeah. It might be a type of maybe this is really Q3 in this Q6, but it doesn't matter.

284
00:30:36,000 --> 00:30:42,000
So the key thing is that you should do one, like, and then, yeah, the main thing, main to this is that you should do both. Yes.

285
00:30:42,000 --> 00:30:52,000
So, certainly audio, auto and manual, was it more of a, you took away some of the manual, instruction, or you either, like, you may change how it was.

286
00:30:52,000 --> 00:31:05,000
It's question is, what is auto plus manual? So you auto vectorize everything. Then you actually look what was actually generated in the assembly, figure out what functions or primitives were not auto generated, auto vectorize. Then you go back and rewrite them, the actual C++ code, they put it, put it in the intrinsics.

287
00:31:05,000 --> 00:31:11,000
Are you saying manual was not done right?

288
00:31:11,000 --> 00:31:29,000
I mean, Germans, so like, I'm too many to do, right? And maybe, again, I have to go look at what exactly this query was. I think the idea was that the, yeah, of course, like, in theory, you could have also looked to see what this thing vectorized to, right?

289
00:31:29,000 --> 00:31:43,000
And then, right, the quid intrinsics for that. But I don't think you did that. I think the idea was like, okay, if you bring in a German who knows what they're doing, how well can they do implementing themselves?

290
00:31:43,000 --> 00:31:51,000
It might even be the overhead of moving in a vector register that actually is C-based.

291
00:31:51,000 --> 00:31:54,000
So we're going to do something.

292
00:31:54,000 --> 00:32:06,000
Again, I don't know what that results again. We can go into more detail in this class. The reason why I have you guys read this paper is because it's compilation plus vectorization at the same time.

293
00:32:06,000 --> 00:32:15,000
And one single valuation. So I, I shared picked this result out just because there's focus on vectorization. So I wanted to cover compilation first, and then we can talk a little bit as well.

294
00:32:15,000 --> 00:32:23,000
So I can follow up with, forget what's actually going on here. Everything's open source online as well. So we could check it out. What happened?

295
00:32:23,000 --> 00:32:38,000
So we're now beginning to check to see what the performance difference actually is. And so in this case, here we're measuring in what's the reduction of time of the system running these queries between the different implementations.

296
00:32:38,000 --> 00:32:50,000
So it's all relative to again the scalar function, scalar implementation. So if you're above zero, it's faster. If it blows, it's worse. And so you can see in some cases here, especially for Q6,

297
00:32:50,000 --> 00:32:59,000
even though that one code he wrote by hand had more instructions, it was actually faster than the one that was the combination of auto vectorization and manual.

298
00:32:59,000 --> 00:33:08,000
Or in the case of here, in case of Q3 going back, right, they produced a number of instructions, but it was done in such a way that it was actually slower.

299
00:33:08,000 --> 00:33:20,000
The main is always about CS. But the point I'm trying to make is to write that is hard.

300
00:33:20,000 --> 00:33:29,000
So if you have if you have the key to do it, if you have a German in house, or you can just spend the time doing it, the Reborn's probably what you want. I forget what percentage of he actually had to go touch up.

301
00:33:29,000 --> 00:33:38,000
But if you spend the time and effort, you can get, because it's almost equivalent writing assembly. And that'll be any compiler.

302
00:33:38,000 --> 00:33:48,000
So, manual or compiler, compiler, and in critical or just like level one, that's the first part.

303
00:33:48,000 --> 00:34:02,000
Manual is literally, it's manual is the last one, explosive vectorization calling transics. This is compiler hints. And this is compiler hints. And then what doesn't get vectorized, you go and put in transics.

304
00:34:02,000 --> 00:34:08,000
Yes.

305
00:34:08,000 --> 00:34:14,000
Yes. What cover was this one in a second? Yes.

306
00:34:14,000 --> 00:34:19,000
It gets a hint. Anyone know why?

307
00:34:19,000 --> 00:34:34,000
No. We'll get to the end. There's a footnote in the paper you guys read that explains it. We'll get to the end.

308
00:34:35,000 --> 00:34:43,000
I mean, make sure I didn't send anything on this.

309
00:34:43,000 --> 00:34:53,000
Same reason why most compilers do dash row three instead of two.

310
00:34:53,000 --> 00:35:03,000
So, the new version is down clock and down cycle the CPU. When you call AVX512, they turn down the clock speed.

311
00:35:03,000 --> 00:35:13,000
And some compilers were actually not auto vectorized AVX512, but always used AVX2 because of this exact reason. Because of hating issues.

312
00:35:13,000 --> 00:35:34,000
Yes. It's hating issues. In the early versions of SIMD, in the 90s, the M&X stuff, you would call scale instructions, but when you call SIMD instructions, it would stop all the SIMD instructions, switch over to SIMD mode, run that, then switch back.

313
00:35:34,000 --> 00:35:46,000
Now, with super scalars architecture, we can run these things in parallel. But as I said, I don't know what is all AVX512 instructions, but at least enough of them, it'll get down clocked.

314
00:35:46,000 --> 00:35:56,000
I don't know whether these are, I think X86 or the current crop is Intel CPUs all have this issue.

315
00:35:56,000 --> 00:36:09,000
So, Intel, we'll cover this in the end. Intel actually turns off AVX5. They fuse it off on consumer grade CPUs. Because they don't want people to get down cycle and think that the CPU is running slower than it should. Yes.

316
00:36:09,000 --> 00:36:16,000
Does one other CPU vendor X86 that you're all in? In this case, also not far.

317
00:36:16,000 --> 00:36:30,000
Questions? This AMD also do this. I don't think AMD has the AVX512. They do. They do ones. Okay. I don't know what they, they down clocked.

318
00:36:30,000 --> 00:36:33,000
Do you know the reason they had to stop the...

319
00:36:33,000 --> 00:36:35,000
He. Yeah.

320
00:36:35,000 --> 00:36:41,000
Because they're doing SIMDs, like doing a lot of stuff, you have to stop the...

321
00:36:41,000 --> 00:36:48,000
He uses the scientific term. Is it because they're doing a lot of stuff. Yes. Yes.

322
00:36:48,000 --> 00:36:57,000
This is not a class about like Intel's design decisions. I don't know the answer. I'm only telling you what you can read. Sorry, yes.

323
00:36:57,000 --> 00:37:06,000
I had to double check. They might be using AVX2. I don't know. We can cover this in a flash.

324
00:37:06,000 --> 00:37:13,000
Okay. Again, this is not like let's bash on Intel. But again, this is what I said in the beginning.

325
00:37:13,000 --> 00:37:19,000
Because it's there, it doesn't mean it's always going to work. And in some cases, AVX2 is going to be better.

326
00:37:19,000 --> 00:37:23,000
Because they won't have that down clocking, down cycle issue.

327
00:37:23,000 --> 00:37:28,000
All right. So now, let's go through the primitives that we're going to use as building blocks that allow us to do...

328
00:37:28,000 --> 00:37:35,000
You can construct and put together. So we're doing more complex functionality to actually start running when we're running queries.

329
00:37:35,000 --> 00:37:41,000
And this would be a combination of what was in the paper you guys read. And then some earlier paper that I'll cover a little bit as well.

330
00:37:41,000 --> 00:37:50,000
And these are the basic primitives that Cindy's going to provide for us. They would then put together to start doing the larger database operations or algorithms that we need.

331
00:37:50,000 --> 00:37:58,000
So the big one I said is that AVX512 added, ignoring the down clocking issue, is that they have now...

332
00:37:58,000 --> 00:38:06,000
All the instructions have these predication variants where you can pass in a bit mask that says which lane you want to be applied...

333
00:38:06,000 --> 00:38:13,000
You want the operation to be applied at. Right. Again, prior to AVX512, you could do this, but you would have to use a separate...

334
00:38:13,000 --> 00:38:17,000
You know, use one of the Cindy registers that are available to you to actually then apply.

335
00:38:17,000 --> 00:38:20,000
So now, there's specialized ones that are just for the bit masks.

336
00:38:20,000 --> 00:38:26,000
The number of registers I think in the latest version is like 32. Right. So we're not talking thousands and thousands of registers.

337
00:38:26,000 --> 00:38:35,000
AVX512 going to 32 is a lot. I think it used to be low 20s. Right. So there's more available to us, but it's still not infinite.

338
00:38:35,000 --> 00:38:43,000
So the idea is that say I have two vectors here. I want to do some operation on. And you think of these again.

339
00:38:43,000 --> 00:38:51,000
The offsets have sort of line up across the lanes. And so say... I have this bit mask here. It's set to one. So that's going to say...

340
00:38:51,000 --> 00:39:00,000
What I want my output to be... For better my instructions, it would be only apply it for the lanes where this thing is set to one.

341
00:39:00,000 --> 00:39:08,000
So say I'm just doing addition, then the output would just be 3 plus 2 and 3 plus 2 to produce the output 5 here.

342
00:39:08,000 --> 00:39:19,000
And then for the ones where it's 0, you pass this merge source register, and then that's just being used to fill in where the zeros are to put value there.

343
00:39:19,000 --> 00:39:29,000
So you can put any value in. There's also the variant of zero masking where you don't have to pass this explicit register. It just puts zeros where everything is.

344
00:39:29,000 --> 00:39:43,000
So that's the basic idea. So with this bit mask, which again we say we can generate because in some cases in our algorithms when we apply filters, the ones in zeros corresponding to what tuples and what all set actually satisfy the predicate.

345
00:39:43,000 --> 00:39:53,000
So that's sort of the basic concept we can carry along in our operations to determine whether a tuple zing valid or not.

346
00:39:53,000 --> 00:40:03,000
So the first thing we want to do is permute. And the idea here is that we want to copy values from an input vector, especially some offset to some other destination vector.

347
00:40:03,000 --> 00:40:13,000
And again, in the prior to 8x512, the way you had to do this is take things out of the vectors, put into memory, and then put it back in the vectors into the right order.

348
00:40:13,000 --> 00:40:22,000
But now again with 8x512, we can do all of this within register directly into register. And that's way faster. And we don't pollute the CPU caches or slow things down.

349
00:40:22,000 --> 00:40:35,000
So the idea here is that here's our input vector. Here's the index vector that's going to correspond to where we're going to write things to. So in this case here for this first value, sorry, first index value is going to this position here.

350
00:40:35,000 --> 00:40:45,000
We want the value within the input vector offset three, which is d. So that gets written here. And so it's done this all down the line. I don't know why the air is in line up.

351
00:40:45,000 --> 00:40:57,000
But it does all the down the line and then it populates that. And that's again, that's all done is a single instruction, even though I'm showing it in different, you know, different steps on power.

352
00:40:57,000 --> 00:41:06,000
The next one we have is a selective load. The idea here is we want to take some contents that we have in memory and we want to be able to write them out to some input vector.

353
00:41:06,000 --> 00:41:10,000
Yeah, well, I don't know why these aren't lining up. That's weird.

354
00:41:10,000 --> 00:41:20,000
Whatever. So again, we have a mask. And so what's going to happen is in this first position here, it's just going to skip. So it doesn't overwrite whatever's in the vector right now.

355
00:41:20,000 --> 00:41:30,000
So then it's all where the ones are and it's going to grab one of the first location that it has because you give it this offset the starting location of the input memory, the input memory buffer or address.

356
00:41:30,000 --> 00:41:37,000
And so every time it sees it one, it's going to increment over by one and then write that value up. So in this case here, we're going to write you to the second slot.

357
00:41:37,000 --> 00:41:43,000
We're going to skip this one here, leave that alone and then go to the next one, we'll write the to that slot.

358
00:41:43,000 --> 00:41:52,000
Right, again, all happens within a single instruction. Select the storage, go in the opposite direction and reverse. The top is our target, so we want to write out into memory.

359
00:41:52,000 --> 00:42:02,000
So the same thing going across, we skip the zero, the one gets written to the first position and then the skip that zero and that one's written to the second position. And then we're done.

360
00:42:02,000 --> 00:42:10,000
So this is how we're going to get things in the registers and then out of the registers. But again, more than just like blind copies, we can be clever about how we write things.

361
00:42:13,000 --> 00:42:24,000
So then we can use compressed to move things across the different vectors in different ways. So in this case here, we have our target vector is the value vector at the top, we have an input vector and then this index vector.

362
00:42:24,000 --> 00:42:37,000
So the idea here is that for the first, wherever there's a one, we're going to write out something up there. Right, so same thing here, we write the deal to that first position and then everything else is just left as zeros.

363
00:42:37,000 --> 00:42:49,000
So basically compressing down whatever was in our input vector to fill in the things in sort of beginning to the end to we run out of space or we have no more items put into it.

364
00:42:49,000 --> 00:42:58,000
Expand is the reverse, right? So we have the one here. So the first one will get, so the first value within our input vector will get written to that position.

365
00:42:58,000 --> 00:43:10,000
So that position, same thing with the next one over there and then the rest of it all to zeros. So that's taking what was compressed on this side potentially by this operation and then expanding it out back to what to a traditional form.

366
00:43:10,000 --> 00:43:15,000
So again, they're just reverses of each other.

367
00:43:15,000 --> 00:43:26,000
So then we can do a selective scatter and gather and the idea here is like how do we actually get things we specific things we want out of the out of our memory into the registers or registers back into memory.

368
00:43:26,000 --> 00:43:35,000
So in this case here, I want to take the whatever is in this offset, the suspect index vector, jump to my offset memory and then write that out to the first position.

369
00:43:35,000 --> 00:43:42,000
So two would be this position here and that's written the first position and then so forth for all the other ones there.

370
00:43:42,000 --> 00:43:51,000
So now we can basically you're changing the order of how things are written out to memory and but lining them up the way you want them inside the vector.

371
00:43:52,000 --> 00:44:09,000
And the second of the gather is a reverse. I'm taking a value vector and then specifying what memory location we want to write things into. So again, so this case here, the index vector wants to write to two. We take the first position at this lane as a and it writes to memory position two.

372
00:44:10,000 --> 00:44:24,000
So I don't know whether they require the memory location you're writing to to fit within a single cache line. There's alignment issues. I think the harbor takes care of all that for you.

373
00:44:24,000 --> 00:44:34,000
Because this index vector, this can't be a million elements. You're not going to be writing out to all different locations of memory. This thing roughly has to fit into a single cache line.

374
00:44:34,000 --> 00:44:43,000
Because L1 you can do I think one or two loads and stores per cycle. So you obviously don't want to spend a lot of cycles just filling out taking things out of the vector and putting them in.

375
00:44:43,000 --> 00:44:57,000
So again, these are the basic constructs. I'm going through them quickly just to say like, okay, there's ways to pass in these bitmasses or these index vectors to specify where you want things to go to or where you want things to come from when you move things in and out of the vectors into memory.

376
00:44:58,000 --> 00:45:09,000
So that's how we actually want to put this in the Saturday system. So I'm going to go through some basic operations that we can use. You don't use a symbi-in vectorization.

377
00:45:09,000 --> 00:45:22,000
And in most cases we're almost always going to want a favor of vertical vectorization. We're going to have different tuples within the different lanes of our symbi-register so that we can process in the parallel.

378
00:45:22,000 --> 00:45:35,000
So again, horizontal vectorization would be either trying to sum up all the values within the vector or same time to string comparison over a long string and that's breaking up into across different lanes. We're going to ignore all of that.

379
00:45:35,000 --> 00:45:48,000
And our goal here is that we want to maximize lane utilization meaning we don't want to have our computations that we're doing in our symbi-symmony instructions to operate on things we know have been a vector or know have been removed before.

380
00:45:48,000 --> 00:45:57,000
Like if something does not evaluate the true, it doesn't make sense to do a bunch more expensive computations for it. We want to ideally be able to fill it in with something else that is useful.

381
00:45:57,000 --> 00:46:03,000
And the paper you read talked about that and we'll see other ways to do it as well.

382
00:46:03,000 --> 00:46:11,000
So first talk about the basic selection scan, then we'll talk about a vector refill, and then I'll talk about two variants of doing hash tables or joins.

383
00:46:11,000 --> 00:46:17,000
And then this is not the paper you guys read, but for partitioning histograms this one is like really simple idea that thing is pretty clever.

384
00:46:17,000 --> 00:46:20,000
And again it comes to this paper in Colombia.

385
00:46:20,000 --> 00:46:25,000
So this paper here, this is from 2015, this is from some features that Colombia.

386
00:46:25,000 --> 00:46:35,000
I used to have the students you guys read this, but I don't have it read it. You don't read it anymore. I read the German one because in this one they make a bunch of assumptions that aren't real.

387
00:46:35,000 --> 00:46:42,000
Because it was 2015, it was 480x512, so they assumed all your values were 32 bits and that your pointers are always 32 bits.

388
00:46:42,000 --> 00:46:47,000
But obviously in the real workloads, real data says that's not always true.

389
00:46:47,000 --> 00:46:56,000
And then they also assume that everything's going to fit in L3 cache, which obviously does not always pay not to be true.

390
00:46:56,000 --> 00:47:00,000
So let's go back to how to do basic selection scan operation.

391
00:47:00,000 --> 00:47:10,000
So this is the code that I showed before how to do a branchless scan where we're always going to copy our output into any two places we're given to the output buffer.

392
00:47:10,000 --> 00:47:15,000
But then we run this check here and this evaluates to 0, 1.

393
00:47:15,000 --> 00:47:21,000
After we enter it together, that determines whether we move our offset up by 1.

394
00:47:21,000 --> 00:47:29,000
So there's no if clauses in SIMD. So we can't run the if and else version of this code.

395
00:47:29,000 --> 00:47:32,000
We basically always have to run this one.

396
00:47:32,000 --> 00:47:35,000
So the way to vectorize it is pretty easy.

397
00:47:35,000 --> 00:47:46,000
Because now, instead of giving a single tuple, now I'm getting a vector tuples, I load the key I want to evaluate on into some SIMD vector, or SIMD register, not specifying what size doesn't matter.

398
00:47:46,000 --> 00:48:00,000
Then I can run bitwise operations to do the comparison operations on the key that would then produce bitmasks that I can then end together and that's going to determine whether a tuple has been satisfied this predicate or not.

399
00:48:00,000 --> 00:48:07,000
Now, I'm not showing you the code that makes sure we remove things when we come back around the second iteration, we can ignore that for now.

400
00:48:07,000 --> 00:48:12,000
So, this is going to be walking through what I just said, skip all this.

401
00:48:12,000 --> 00:48:19,000
So instead of using, again, placeholders like low and high, let's actually use real values and some real data here.

402
00:48:19,000 --> 00:48:26,000
So, again, think of this as that there's eight tuples here and then the key is some single character.

403
00:48:26,000 --> 00:48:28,000
It could be dictionary code, it doesn't matter.

404
00:48:28,000 --> 00:48:36,000
So, it's not a string going across, each element, each tuple has a single character string value.

405
00:48:36,000 --> 00:48:43,000
So, to do this in SIMD is that you would first do that SIMD compare, and that's the first step here.

406
00:48:43,000 --> 00:48:48,000
Is the value within a given key greater than or equal to a low value?

407
00:48:48,000 --> 00:48:52,000
And that's a single SIMD compare instruction that then can produce a bitmask.

408
00:48:53,000 --> 00:49:03,000
Then I got to run the second half of the comparison, produce another bitmask where the key is less than or equal to the high value, the letter U.

409
00:49:03,000 --> 00:49:05,000
And that produces another bitmask.

410
00:49:05,000 --> 00:49:15,000
So, I have two now bitmasks sitting in CPU registers and I can then run a SIMD in operation and instruction to just compare those two bitmasks.

411
00:49:15,000 --> 00:49:20,000
It produces a new bitmask and that tells me here's all the tuples to actually qualify or satisfy the predicate.

412
00:49:20,000 --> 00:49:30,000
And then if I want to get, return it back to which offsets in my input vector or actually were set to true, I can then pass in a sequence 0 to 7.

413
00:49:30,000 --> 00:49:42,000
And for any bitmask that the one, I just do a SIMD compress operation to then produce a single SIMD register that has these values here.

414
00:49:42,000 --> 00:49:46,000
Right?

415
00:49:46,000 --> 00:49:57,000
So, there's other tricks you can do. Obviously, there's like, if I can run a rank instruction to determine how many ones I actually have an end of these bitmasks, if they're all set to 0, then I can bail out and not do the other steps.

416
00:49:57,000 --> 00:50:00,000
This is all offset. That's not a bitmask, right?

417
00:50:00,000 --> 00:50:01,000
Or is it just like an instruction?

418
00:50:01,000 --> 00:50:03,000
Yes? No, no, all offset.

419
00:50:03,000 --> 00:50:06,000
Yeah, it's a question. It's just a register.

420
00:50:06,000 --> 00:50:07,000
Yeah.

421
00:50:07,000 --> 00:50:13,000
And there might be any SIMD instructions that can convert this automatically now. But I'm just visually showing it.

422
00:50:17,000 --> 00:50:19,000
Right?

423
00:50:19,000 --> 00:50:31,000
So again, like, how jacked you implement this in a real system? Well, again, if you take the vectorized approach, which we'll cover more in the next class, you would have an explicit function that says,

424
00:50:32,000 --> 00:50:45,000
string, input column of eight elements, or some number elements of a certain type, run the greater than or equal to comparison operator for a given constant.

425
00:50:45,000 --> 00:50:55,000
So you invoke that function with the pointer to the column and the constant value, and then it just loops through that and does the comparison one by one.

426
00:50:55,000 --> 00:51:06,000
So then the compiler can then alter vectorize that to do the SIMD instruction to put the data that you're trying to compare against into a SIMD register, run the SIMD compare and take the output.

427
00:51:06,000 --> 00:51:07,000
Yes?

428
00:51:07,000 --> 00:51:15,000
Does the SIMD register store take a bitmask and then the store is missing the memory? Why do you have to do some press?

429
00:51:15,000 --> 00:51:23,000
This question doesn't the select the store take a bitmask and store it in the memory where you want it?

430
00:51:24,000 --> 00:51:34,000
I'm just showing you how to take this correct as a true position list.

431
00:51:34,000 --> 00:51:41,000
Actually, he brought up a question earlier.

432
00:51:41,000 --> 00:51:46,000
How can I generate all the primitives for all possible variations of ware clauses?

433
00:51:47,000 --> 00:52:09,000
This is a good example where maybe auto vectorization isn't going to be exactly what you want because, again, the primitive that's going to deduce the valuation, if it produces this match offset, what I really want is the bitmask so that I can then take the two outputs and run the SIMD in myself.

434
00:52:10,000 --> 00:52:17,000
There are going to be variations of the primitives where sometimes you want to just produce this match offset list immediately.

435
00:52:17,000 --> 00:52:25,000
And other times you actually want to the bitmask out because then feed that into some other operation that take two bitmasks and can run them together.

436
00:52:25,000 --> 00:52:30,000
So how to auto vectorize all of this is actually not trivial.

437
00:52:31,000 --> 00:52:38,000
Again, it has to take a few minutes to come and figure out how to compose these operations together based on what you know the additional things you need to do in the query.

438
00:52:38,000 --> 00:52:44,000
Again, we'll cover more of that next class.

439
00:52:44,000 --> 00:52:50,000
So we can now go back to that paper we said before from the Germans plus me.

440
00:52:50,000 --> 00:52:53,000
And Peter von Slese Dutch, the vectorized guy.

441
00:52:53,000 --> 00:53:05,000
But now we can actually run his version of the vector wise and he's going to use the AVX512 for everything because it's easier to use the bitmap registers to do vertical vectorization.

442
00:53:06,000 --> 00:53:13,000
So I'm going to show results for three different operations within a scan.

443
00:53:13,000 --> 00:53:17,000
So the hashing to hash something put into a hash table without putting it in the hash table.

444
00:53:17,000 --> 00:53:21,000
A gather operation and then join probing it.

445
00:53:21,000 --> 00:53:26,000
And then we can see how much the SIMD stuff helps for over a scalar instructions.

446
00:53:26,000 --> 00:53:34,000
So again, to strip out the rest of the system to say, actually the core algorithm are doing the scan operations and other things in the query plan, how much does SIMD help?

447
00:53:35,000 --> 00:53:44,000
And so what you see is that across the hashing gather join, if you vectorize it, you get a bigger win for hashing and a bigger win than join over the scalar value.

448
00:53:44,000 --> 00:53:47,000
So up to 2.3X improvement performance.

449
00:53:47,000 --> 00:53:51,000
But that, again, that's just doing the bare minimum you need within that scan operation.

450
00:53:51,000 --> 00:53:55,000
Just doing the hashing or doing the join prob.

451
00:53:55,000 --> 00:54:03,000
When you bring it to the rest of the system, now we'll start worrying about getting data in and out of the registers, materializing results going from one operative to the next.

452
00:54:03,000 --> 00:54:06,000
Then you see the performance difference is not that significant anymore.

453
00:54:06,000 --> 00:54:14,000
So you put in a full query the difference between the scalar operations is in the vectorized one is actually not that much.

454
00:54:14,000 --> 00:54:19,000
And this is the best case scenario of like tanwritten code.

455
00:54:19,000 --> 00:54:21,000
It's everything's in memory.

456
00:54:21,000 --> 00:54:26,000
I forget whether it's what scale factor one, yeah, it's going to fit in CPU cache is not that big.

457
00:54:26,000 --> 00:54:29,000
Or most of it is going to fit CPU cache.

458
00:54:29,000 --> 00:54:32,000
So what gets, right?

459
00:54:32,000 --> 00:54:39,000
But again, what's going on is that it's not just a matter of like, okay, we can, you know, it's on does law.

460
00:54:39,000 --> 00:54:44,000
What portion of the query is actually going to be the part that could be vectorizing and get the biggest win?

461
00:54:44,000 --> 00:54:48,000
It's not all of it. It's not a size well chunk.

462
00:54:48,000 --> 00:54:56,000
So you're only going to get maybe, you know, 10%, 10% bump for vectorizing the state that one small piece of the code.

463
00:54:56,000 --> 00:55:02,000
So all the materialization overhead that's going to slow us down and that you can't vectorize.

464
00:55:02,000 --> 00:55:11,000
So this is somewhat deflating like again, if I just said, you know, it's spending entire lecture about how great vectorization is and how great, you know, and how much can help.

465
00:55:11,000 --> 00:55:14,000
But you know, it doesn't actually make a big difference when you run a full query.

466
00:55:14,000 --> 00:55:18,000
That's true for a lot of things in databases.

467
00:55:18,000 --> 00:55:20,000
But these things are cumulative.

468
00:55:20,000 --> 00:55:23,000
You obviously don't want to, you can build the greatest query optimizer.

469
00:55:23,000 --> 00:55:26,000
But if your query engine sucks, it's going to run slow.

470
00:55:26,000 --> 00:55:30,000
But if you have an amazingly fast query engine, but you have a bad query plan, it's going to run slow.

471
00:55:30,000 --> 00:55:35,000
So all the lectures put together is what you need to put, you know, get things to run fast.

472
00:55:35,000 --> 00:55:40,000
You know, get that order magnitude before it's difference.

473
00:55:40,000 --> 00:55:43,000
Okay.

474
00:55:43,000 --> 00:55:59,000
So one of the problems that in the paper you guys read was that they spent, I think two chapters on or two sections on, was the problem of honor utilization where you have some lanes being containing tuples that have been invalidated or should be discarded.

475
00:55:59,000 --> 00:56:08,000
But because we don't want to always move things in that of the registers, you may have to keep processing dead tuples, so to speak.

476
00:56:08,000 --> 00:56:13,000
And essentially wasting, wasting resources.

477
00:56:13,000 --> 00:56:15,000
So the situation would sort of be like this.

478
00:56:15,000 --> 00:56:19,000
So if I say I have a query select count start from table, where age is greater than 20.

479
00:56:19,000 --> 00:56:25,000
And so in my sort of pseudo code of this, again, I realize this is a branching version.

480
00:56:25,000 --> 00:56:28,000
So there's a branchless, but for now it's fine.

481
00:56:28,000 --> 00:56:32,000
As I'm scanning along the table, I may have a bunch of tuples here that would get invalidated.

482
00:56:32,000 --> 00:56:35,000
And I don't want to include them in my aggregation.

483
00:56:35,000 --> 00:56:40,000
So if it's scalar code, no big deal, right?

484
00:56:40,000 --> 00:56:44,000
Because I just loop back around and go get the next batch.

485
00:56:44,000 --> 00:56:45,000
But it's vectorized code.

486
00:56:45,000 --> 00:56:49,000
I may have, you know, eight, four to eight 12 tuples in my vector.

487
00:56:49,000 --> 00:56:59,000
And some of them might not satisfy this predicate, but now they're going to be strong along in my, in my, in my, in my, my vectors.

488
00:56:59,000 --> 00:57:03,000
So you sort of think of like this piece right here is the sort of the first pipeline.

489
00:57:03,000 --> 00:57:06,000
And then the second pipeline is this piece here.

490
00:57:06,000 --> 00:57:11,000
So we're going to avoid having to pass along dead tuples in this, right?

491
00:57:11,000 --> 00:57:20,000
And so the, the idea that I'm about to show you is basically, instead of having the materialization, you know, point B at the, at the,

492
00:57:20,000 --> 00:57:25,000
you know, a pipeline breaker, we actually could introduce artificial pipeline breakers,

493
00:57:25,000 --> 00:57:31,000
or synthetic pipeline breakers, that we, where we can materialize from results, go back in our loop, get more data,

494
00:57:31,000 --> 00:57:35,000
and keep filling up this, this mini buffer, if you will.

495
00:57:35,000 --> 00:57:39,000
And then once that's, uh, filled up, we know all the tuples there aren't dead.

496
00:57:39,000 --> 00:57:40,000
They're all useful.

497
00:57:40,000 --> 00:57:46,000
They haven't been perceived up to the rest of the, the computation in the, in the pipeline.

498
00:57:46,000 --> 00:57:47,000
So this is a paper.

499
00:57:47,000 --> 00:57:49,000
I think it's citation 16 in the paper, in the paper you guys read.

500
00:57:49,000 --> 00:57:52,000
It's a paper that I, we worked on here with my PhD student, Prashant,

501
00:57:52,000 --> 00:57:57,000
um, is now building, you know, working on the, the photon vectorized engine at, at vector wise.

502
00:57:57,000 --> 00:58:04,000
Um, so this is the idea is that we're going to decompose pipelines into sub stages that can operate on vectorize tuples,

503
00:58:04,000 --> 00:58:07,000
just as, you know, just with vectorized processing, using SIMD when possible.

504
00:58:07,000 --> 00:58:15,000
But then the idea is that we can, you know, start storing things in buffers, fill up a, a semi register,

505
00:58:15,000 --> 00:58:17,000
and then move on to the next stage.

506
00:58:18,000 --> 00:58:22,000
This, again, so we don't have wasted, waste of computation, waste of resources.

507
00:58:23,000 --> 00:58:30,000
So the idea, uh, so it's called the lact operative fusion, because the idea is like you're taking the fuse, the operator fusion approach from the hyper guys,

508
00:58:30,000 --> 00:58:35,000
and actually relaxing a little bit and introducing these, these breakpoints.

509
00:58:35,000 --> 00:58:38,000
So they think, first thing is that you, you figure out these are the vectorization candidates.

510
00:58:38,000 --> 00:58:45,000
Clearly I want to filter, I want to vectorize the filter operation, and that, but before I maybe do the aggregation step,

511
00:58:45,000 --> 00:58:53,000
I want to materialize some results, make sure that all gets filled up, and then I can do the aggregation computation using SIMD and vectorize that,

512
00:58:53,000 --> 00:58:57,000
without worrying about throwing out, way, throwing way on needed results.

513
00:58:59,000 --> 00:59:01,000
Right? So the code basically looks like this.

514
00:59:01,000 --> 00:59:05,000
So I'm scanning through the, the, as a vector tuple, I do my comparison.

515
00:59:05,000 --> 00:59:14,000
If my buffer is, is full, then I can go, uh, go fill up, you know, if this thing gets full, then I can go to the next stage within my pipeline.

516
00:59:14,000 --> 00:59:19,000
And do the aggregation, otherwise I loop back around and, you know, get the next batch.

517
00:59:19,000 --> 00:59:27,000
So this buffer is sort of incrementally getting, getting full of values, so then I can then fire this off, again, in vectorized manner.

518
00:59:27,000 --> 00:59:33,000
So, yeah, this, this is the first part here, and then this is the second part here, right?

519
00:59:33,000 --> 00:59:35,000
And obviously they made up the end.

520
00:59:35,000 --> 00:59:40,000
So one of the tricks that we figured out with this though is that, because you have this like staging point,

521
00:59:40,000 --> 00:59:44,000
and it's really tight loop, you actually can start doing software prefetching.

522
00:59:44,000 --> 00:59:49,000
So there's hardware prefetching where the CPU's going to try to figure out what, what pieces of memory you're going to need next,

523
00:59:49,000 --> 00:59:51,000
and start bringing it back into your CPU cache.

524
00:59:51,000 --> 00:59:57,000
Like if you're scanning along some, long stride of memory, it starts bringing in cache lines ahead of it, what, ahead of what you actually need.

525
00:59:57,000 --> 01:00:03,000
But in, in x86, you actually can pass hints to the CPU and say, hey, I'm going to need this memory region pretty soon.

526
01:00:03,000 --> 01:00:08,000
Um, it's not required to actually obey your, your, your request. It's like, it's like a hint.

527
01:00:08,000 --> 01:00:13,000
Uh, but in some cases, it actually can make a big, big difference, right?

528
01:00:13,000 --> 01:00:17,000
And this staging stuff, because it's, it's, you know, it's, you know, it's, instead of it, it's really one pipeline.

529
01:00:17,000 --> 01:00:25,000
So you're breaking up to these sub stages, it's sort of a nice natural boundary for prefetching operations.

530
01:00:25,000 --> 01:00:29,000
So again, this is sort of jumping ahead to do query compilation stuff that we, we talked about before.

531
01:00:29,000 --> 01:00:37,000
But this is showing that if you do holistic query compilation, the same way that, um, that, uh, hyper does, which will read about x class.

532
01:00:37,000 --> 01:00:42,000
But then you also introduce these, these, these, these relaxed operating fusion stages.

533
01:00:42,000 --> 01:00:44,000
Uh, you can get a pretty, pretty good form.

534
01:00:44,000 --> 01:00:48,000
In this case here, software prefetching doesn't help because there's no join.

535
01:00:48,000 --> 01:00:51,000
There, there wasn't really a good place to say, okay, let me go on prefetch.

536
01:00:51,000 --> 01:00:57,000
But in, in over here, this does make a big difference because this query, query 19 can be broken up into these, these sub stages.

537
01:00:57,000 --> 01:01:02,000
So I think you want to have the highest electricity, so it's a lot of time to log in.

538
01:01:02,000 --> 01:01:03,000
It's probably, it's probably incorrect.

539
01:01:03,000 --> 01:01:05,000
Q1 is a high selectivity, so like you're not discarding.

540
01:01:05,000 --> 01:01:07,000
It's basically taking everything.

541
01:01:10,000 --> 01:01:11,000
Okay.

542
01:01:11,000 --> 01:01:14,000
No, let me just, let me skip this, like I want to get the hashings.

543
01:01:14,000 --> 01:01:17,000
But basically, this is the old palaton system.

544
01:01:17,000 --> 01:01:20,000
So the interpreted, our interpret engine was told crap. It was, like, it was garbage.

545
01:01:20,000 --> 01:01:22,000
Uh, we converted it to compilation.

546
01:01:22,000 --> 01:01:24,000
So you got this, this amount of improvement.

547
01:01:24,000 --> 01:01:28,000
And then we're putting racked up a diffusion with Cindy plus racked, upper diffusion of Cindy plus pre-veching.

548
01:01:28,000 --> 01:01:30,000
Right, you get a pretty difficult one.

549
01:01:30,000 --> 01:01:37,000
So again, this will be next week, but going from a, this is not really like, I don't want to get any pressure.

550
01:01:37,000 --> 01:01:39,000
I'm like, oh, research compilation, you're going to get 97 improvement.

551
01:01:39,000 --> 01:01:44,000
This is like crappy student code to like, high end per shunt code, right, who's now a Databricks.

552
01:01:44,000 --> 01:01:47,000
Like that, that I'll get you 97% ended, ended day to the week.

553
01:01:47,000 --> 01:01:50,000
Uh, the thing I really care about is, is going down here.

554
01:01:50,000 --> 01:01:54,000
Again, that you can still get a pretty significant bump by introducing these, these stages,

555
01:01:54,000 --> 01:01:57,000
and vectorizing as much as possible.

556
01:01:57,000 --> 01:02:02,000
The newer version of hyper and umbra before this paper come out can actually use Cindy and vectorization.

557
01:02:02,000 --> 01:02:07,000
Uh, but at the time in 2017 or 2016, they didn't support that, because they were doing,

558
01:02:07,000 --> 01:02:15,000
you know, doing nothing with the push-based execution with complete compilation of the queries.

559
01:02:16,000 --> 01:02:21,000
Alright, so this is one way to go, sort of making sure that we were always utilizing all our buffers.

560
01:02:21,000 --> 01:02:28,000
But again, we did this before 18X512, um, and in the paper you guys read, they called this material, they called this a materialization approach.

561
01:02:28,000 --> 01:02:38,000
They also generally, uh, discussed two different algorithms you could use that try to be clever about deciding when to go back and get more tubeless from the, from the operator below you.

562
01:02:38,000 --> 01:02:42,000
I think somebody asked a question about this, and I said most systems don't do this, but this is one way to do it.

563
01:02:43,000 --> 01:02:51,000
Um, and the challenge course is going to be the bookkeeping to keep track of like, where, you know, where do I leave off from the operator below me, and where can I write results into?

564
01:02:51,000 --> 01:02:55,000
And they can do this in the X512 because there's a lot more registers now.

565
01:02:55,000 --> 01:03:04,000
So the idea is that while my operator is running, if I realize that I have unutilized lanes, I can just leave that, leave all that data in that register,

566
01:03:04,000 --> 01:03:13,000
go then execute another part of, of, of the query, and have that right to other registers, and then once that thing gets full, then I, and combine the two of them together.

567
01:03:13,000 --> 01:03:16,000
At a high level, that, that's what they're doing for these real four algorithms.

568
01:03:16,000 --> 01:03:29,000
The question is whether you do, you go get more tubeless within your own operator by iterating over the loop again, or you jump out of that operator, go below you in the query plan, and let the operator below you now start producing tubeless off the query plan.

569
01:03:30,000 --> 01:03:44,000
So the buffered one is the one where you stay in, in the same operator, and the idea is that you use addition registers to sort of stage results, and so the next iteration doesn't overwrite them, which is right into another register, and then once that gets full, you can then use some instructions to compile them.

570
01:03:44,000 --> 01:04:01,000
The partial one is where they basically spill out all the results within the current operator to a bunch of registers, go down below to another operator, have it produce more results up to the query plan, pushing it up, and then you, and then once you, once that's full, then you can combine the two of them together.

571
01:04:02,000 --> 01:04:21,000
So you think of the top one is more simple, because it's like, okay, let me just call it, you know, me calling next on my loop within my same operator, but I just make sure that I don't write the same register that I wrote before, and I don't need to keep track of where I'm actually writing to, other than like, I don't write right before.

572
01:04:21,000 --> 01:04:32,000
And this one, you're trying to be clever, and like, okay, I know that there's things up above that I could write into, but I can't right now, because these leads, we're being occupied, so try to, like, fill things in at a more fine-grained level.

573
01:04:33,000 --> 01:04:50,000
So again, other than, other than, umbra, I don't think anybody actually does this. I think everyone just naively carries along the unused buffers, carries along the dead tuples, and then just, because it's just easier at the end.

574
01:04:52,000 --> 01:05:01,000
Okay, so so far we covered selection scans, vector refills, I want to quickly go through two variations of hash tables, and then finish up with partition his grips.

575
01:05:02,000 --> 01:05:19,000
So in hash tables, the challenge here is that we have this data structure, this hash table, that Khan is not really Cindy friendly, right, because it's this long stride of memory, but then we need to be able to do comparisons within,

576
01:05:19,000 --> 01:05:28,000
in continuous regions of memory, and not within, you know, different lanes at the same time, and contain different elements, right.

577
01:05:29,000 --> 01:05:44,000
So the scalar approach would be, you have some input key, you hash it, with some hash function, finishes a hash offset, you jump to that offset, and then now you just do, again, a linear scan, looking at all the keys within the hash table, so you find your match and then you're done, right.

578
01:05:45,000 --> 01:05:59,000
So, the way to use horizontal vectorization to make this run faster is that, within each offset within the hash table, we're actually going to store four keys with four corresponding values.

579
01:06:00,000 --> 01:06:11,000
So now when I do a look up on a single key, I hash it, I, you know, and then mod it by the numbers buckets or slots, and then now I land on some memory address, now I get four keys.

580
01:06:12,000 --> 01:06:25,000
And now if I want to compare, see what I have in match, I just duplicate this key in a single register, make, you know, four copies of it, and then do the same to comparison, and that's going to produce a bit mask that says whether I have a match or not.

581
01:06:26,000 --> 01:06:34,000
And then whether or not, you know, you do the rank, see whether these are all zeros or all one, then you just do the same thing going down to leap around, right.

582
01:06:35,000 --> 01:06:37,000
So that's kind of cute, that's kind of clever.

583
01:06:37,000 --> 01:06:56,000
The problem with this one though is like, how does this, like, what if it's not, these keys, these slots might be empty.

584
01:06:56,000 --> 01:07:08,000
And so I may be going fetching some location, and there's like two out of the four keys there. So I can't guarantee that I'm always doing all my lanes to fully utilize when I do the comparison.

585
01:07:09,000 --> 01:07:16,000
So the alternative is to do vertical vectorization, and the idea is now I want to compare four keys at the same time.

586
01:07:16,000 --> 01:07:25,000
My hash table is just like before, before I do the, the, the multiple elements which are each slot, now it's just going to single slot, single, single key per slot.

587
01:07:26,000 --> 01:07:35,000
So I take my four keys, there's Cindy operations or Cindy instructions or Cindy hash functions, you can use murmur two, I think there's a Cindy version of that that vector wise use.

588
01:07:35,000 --> 01:07:45,000
And then now I'm going to do some hash vector, then I use my Cindy gather to go grab these different memory regions, put it into now Cindy vector, then do my Cindy.

589
01:07:46,000 --> 01:07:56,000
And then I can be compared to see whether I have any matches, right? Of course, now the challenge is going to be some of these two points are going to match, some of these two points aren't going to match.

590
01:07:57,000 --> 01:08:04,000
So then now in the next iteration, I need to, for the ones that don't match, they need to all go down by one in my hash table to figure out whether there's a match.

591
01:08:05,000 --> 01:08:10,000
But again, I don't want to keep, be doing the same computation over and over again for two points that didn't match.

592
01:08:10,000 --> 01:08:24,000
So I want to go back and get two new keys to fill in the spots that they did match before, and then now another round and I just need to keep track of which lane as I'm going along, what iteration are they at?

593
01:08:25,000 --> 01:08:28,000
What location in my hash table do they need to go look at?

594
01:08:29,000 --> 01:08:34,000
So maybe this thing is sort of waste of computation for the middle guys, but that might be okay, that would be enough.

595
01:08:35,000 --> 01:08:46,000
So then do the same thing, do the gather to go bring them into Cindy registers and do the comparison, until I satisfy all my checks.

596
01:08:47,000 --> 01:08:49,000
What is the fairly better thing?

597
01:08:50,000 --> 01:08:54,000
So it's questions, is vertical clearly better? Most times yes.

598
01:08:56,000 --> 01:08:57,000
That's it.

599
01:08:57,000 --> 01:08:59,000
What is the benefit of the four?

600
01:08:59,000 --> 01:09:01,000
Do you think you're just doing it?

601
01:09:02,000 --> 01:09:04,000
This question is what is the benefit of the horizontal one?

602
01:09:04,000 --> 01:09:06,000
What is the benefit of the horizontal one?

603
01:09:08,000 --> 01:09:17,000
Again, the paper basically trying to try for every single core operator in a Davis system, they had a vertical and horizontal variant of them to show that you could do it.

604
01:09:18,000 --> 01:09:23,000
And then the measurements of the term, oh yeah, the vertical one is always better.

605
01:09:23,000 --> 01:09:31,000
There's something else that's tricky about this that may not be obvious.

606
01:09:33,000 --> 01:09:42,000
And that is the, there's not always going to be a guarantee that the output tuples are always going to be in the same order.

607
01:09:42,000 --> 01:09:45,000
Every single time you run this algorithm, right?

608
01:09:46,000 --> 01:09:52,000
Because the, you're sort of reading the keys in a different way,

609
01:09:53,000 --> 01:09:59,000
the different order, sorry, the output is going to be in a different order than the keys as they come into the operator.

610
01:10:00,000 --> 01:10:03,000
And on a relational algorithm, that's okay, right? There is no ordering.

611
01:10:03,000 --> 01:10:12,000
But if you're trying to debug this, then sometimes you run the same query on the same data and you'll produce output in a different order.

612
01:10:12,000 --> 01:10:16,000
And it's hard to kind of debug things, try to, if there's probably trying to figure out.

613
01:10:17,000 --> 01:10:24,000
So it's not really a, you know, I would not say that's enough to discourage people not to do this.

614
01:10:25,000 --> 01:10:30,000
It's just to say that it's something to be aware of that like the, I mean, hashing always sort of randomize this thing,

615
01:10:30,000 --> 01:10:34,000
but this takes it to a higher degree, it makes things even more challenging to work through.

616
01:10:34,000 --> 01:10:38,000
Because again, the way this Cindy stuff is trying to do multiple pairs at the same time.

617
01:10:39,000 --> 01:10:45,000
All right, so I'm going to skip the, this is the result from the paper.

618
01:10:45,000 --> 01:10:47,000
I don't want to spend too much time on it.

619
01:10:47,000 --> 01:10:55,000
But basically, everything goes once you run out of CPU cache for these different limitations.

620
01:10:55,000 --> 01:10:59,000
And this is running on the Zon 5, which is an order Intel accelerator.

621
01:10:59,000 --> 01:11:03,000
I think it's an Intel version of a GPU in the 2010s.

622
01:11:03,000 --> 01:11:04,000
They don't exist anymore.

623
01:11:05,000 --> 01:11:07,000
Again, see me over here on running on Zons.

624
01:11:07,000 --> 01:11:10,000
Once you run out of cache, there is no difference.

625
01:11:13,000 --> 01:11:21,000
But the, you know, if your hash table size is actually small enough, and this is why you always put the small table on the build side, then you might be okay.

626
01:11:23,000 --> 01:11:25,000
And CPU cache has gotten way way better.

627
01:11:25,000 --> 01:11:30,000
I think there's the one AMD chip, it's like 800 megs for L3, it's insane.

628
01:11:31,000 --> 01:11:35,000
It's almost a gigabyte L3 cache on a single socket, that's insane.

629
01:11:37,000 --> 01:11:41,000
So, let me show one other cool thing I like.

630
01:11:41,000 --> 01:11:49,000
And this is a really simple way to see like, okay, how can I parallelize things with Cindy to do another basic operation in my database system?

631
01:11:49,000 --> 01:11:50,000
So how do we build it?

632
01:11:50,000 --> 01:11:51,000
We want to build a histogram.

633
01:11:51,000 --> 01:11:59,000
And so, the problem is going to be that if we just do the naive thing, say these are input keys, and we use Cindy radax,

634
01:11:59,000 --> 01:12:03,000
which we'll cover in a few weeks, we're basically like, think of poor man's hash function.

635
01:12:03,000 --> 01:12:07,000
You just basically grab the first bit, and tell you where something goes.

636
01:12:07,000 --> 01:12:14,000
And so, we want to do, get the rate of some of this, download hash keys, and then we're going to fill out some histogram.

637
01:12:14,000 --> 01:12:26,000
But the problem is going to be, we're going to have two keys, mapped to the same location in our histogram, and they're going to clobbering them, they're going to clobbering each other when I try to put things, you know, some of it together.

638
01:12:26,000 --> 01:12:30,000
Right? Because we're going to try to overwrite to the same position.

639
01:12:30,000 --> 01:12:40,000
So, to get around this problem, I can just replicate my hash table, where for every single lane in my Cindy register, I'm just going to have another array.

640
01:12:40,000 --> 01:12:47,000
And so now, I know that the, you know, lane zero is going to write to this column here, lane one is going to write to this column here.

641
01:12:48,000 --> 01:12:54,000
So, for each column, there's going to be one entry for the key in my, my hash, my histogram.

642
01:12:54,000 --> 01:13:01,000
And then, I should just use a Cindy add to put it together across the lanes, and then produce the final counts.

643
01:13:01,000 --> 01:13:13,000
Right? Again, there's a bunch of different clever ways you can combine, in the Cindy operations and structures together, to produce results, again, keeping everything in a single register.

644
01:13:13,000 --> 01:13:18,000
So, this one I like, and this is clearly when.

645
01:13:18,000 --> 01:13:24,000
Okay, so, we've covered this a lot already, we just put it out now on the slide.

646
01:13:24,000 --> 01:13:27,000
So, ADX 512 is not always going to be faster than the ADX 2.

647
01:13:27,000 --> 01:13:40,000
And as I said, the paper you guys read, there's this little footnote down here, where they mentioned that in their experiments, they didn't see any downclocking issues with either the Skylake Z on CPU or the Nights landing Z on 5.

648
01:13:41,000 --> 01:13:46,000
And that, it was always running at a stable four gigahertz clock speed.

649
01:13:46,000 --> 01:13:56,000
But there's a lot of, there's a lot of blog articles out there, and a lot of stack overflow posts about, hey, my, my program's running slow, why?

650
01:13:56,000 --> 01:14:03,000
And I trace it down to my CPU clock getting, you know, getting downcycled. Why is this the case? Right?

651
01:14:03,000 --> 01:14:16,000
And the issue has to do with, in the case of Intel, they identify whether some instructions are either light or heavy, and if you run too many heavy instructions, then they dial down the clock speed, and your thing actually runs slower.

652
01:14:16,000 --> 01:14:24,000
Think of like, if the CPU recognizes that it's getting too hot, because the fan's not running or something, it'll downclock itself, so it doesn't burn, you know, damage itself.

653
01:14:24,000 --> 01:14:32,000
He says it needs to be bigger heatsink. I don't think it's even that. I think it's like a hard wire that it just always downcycles it.

654
01:14:32,000 --> 01:14:35,000
No, I don't think it's like, try to sense the, sense the temperature. Yes.

655
01:14:35,000 --> 01:14:41,000
So I did for the research. Apparently, I'm newer in most things, I'll secute this isn't as bad but it's a bit of this.

656
01:14:41,000 --> 01:14:48,000
AMD, they do this totally different, they have five registered, six registered, and they use two of them to make the five, 12 registered and trucking work.

657
01:14:48,000 --> 01:14:51,000
So it's always faster and never downclots, but it's not as big of an advantage of this.

658
01:14:51,000 --> 01:14:59,000
Yeah. So his statement is, new versions of Intel, they've gotten a little bit better at this, but they still, I know for the consumer ones, they always turn it off, right?

659
01:14:59,000 --> 01:15:04,000
Yes, by default. No, it's actually fused off. I don't think you can even turn it back on.

660
01:15:04,000 --> 01:15:11,000
Yeah. And that AMD doesn't really do true five, 12, they do two 256 registers and they put it together.

661
01:15:11,000 --> 01:15:18,000
Yeah. And they say that's always faster. It's always faster. It should be kind of the same digits to a lot of cases, but for encoding, decoding, it's a little bit faster.

662
01:15:18,000 --> 01:15:23,000
But does it have the bitmashings of the key difference in terms of databases? Does it have, I don't know whether it has those capabilities.

663
01:15:23,000 --> 01:15:37,000
Anyway, and there's, I can post some pats, there's some blog articles from like the clang people or the GCC people were like, you know, they will always try to use ADX 2 instead of ADX 512 to avoid these issues.

664
01:15:37,000 --> 01:15:50,000
Now you may be careful, say, okay, I'm going to make sure, if I'm using intrinsic, that I make sure I only use ADX 2 to avoid this downclocking issue, but you may link in some library that then gets auto vectorized with ADX 512,

665
01:15:50,000 --> 01:16:03,000
then your databases are running slower because of some third party thing that you didn't expect. So I don't know when this all gets fixed, who knows.

666
01:16:03,000 --> 01:16:16,000
But like the safe bet is probably going to always be ADX 2, but I do know some of the commercial systems do run ADX 512 and maybe they're trying to be more careful when, if and when they use it.

667
01:16:16,000 --> 01:16:41,000
Okay, so to finish up, so vectorization is going to obviously super important, doesn't always going to be the biggest win. And ideally, you know, we want to rely on the compiler to auto vector as much as possible, but in some cases we do have to come in and either using intrinsic, which is more common, or one of those libraries that can mask the actual details of what, you know, what sending extension package we're using.

668
01:16:42,000 --> 01:16:55,000
And again, all the things we talked about so far about doing inter query parallelism, this is all in conjunction to this symbi stuff. So I recall is going to have its own set of symbi registers, and so we want to use data parallelism within each core as much as possible.

669
01:16:56,000 --> 01:17:10,000
And again, we'll cover query compilation next class, but that's another tool we can use to control the movement of data within our query plan, so that we have precise control where things, when things going registers,

670
01:17:10,000 --> 01:17:15,000
when they come out of registers, and how things are moved through memory or CPU cashes. Okay.

671
01:17:17,000 --> 01:17:36,000
Again, so next class will be compilation, so it's going to be a German paper. It's very dense. It's a lot of LL and IR. Don't don't sweat the details of that. The main thing I want to get away from it is, or out of it, is the notion what he calls sort of data center computation. It just really means the push model in this query processing approach.

672
01:17:36,000 --> 01:17:43,000
And that, again, how he's going to have fine-grained control of what goes into the CPU registers, as things move at the query plan.

673
01:17:44,000 --> 01:17:54,000
And then we talk a little bit about the project status in preparation of the status update later this month at the end of next class as well. Okay. Any final questions?

674
01:17:55,000 --> 01:17:56,000
All right guys, see ya.

