---
title: CMU15721 P8S202407 JITQueryCompilationCodeGenerationCMUAdvancedDatabaseSyste
---

1
00:00:00,000 --> 00:00:06,000
Canneke Mellon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience.

3
00:00:14,000 --> 00:00:17,000
Let's get started. We have a lot to discuss.

4
00:00:17,000 --> 00:00:22,000
Okay, so this class, I'm going to try to jam as much as I can in about

5
00:00:22,000 --> 00:00:24,000
talk about query compilation and co-generation.

6
00:00:24,000 --> 00:00:26,000
And again, sort of like the vectorization stuff.

7
00:00:26,000 --> 00:00:30,000
So in the last class, we spent time talking about how we're going to use

8
00:00:30,000 --> 00:00:34,000
SIMD to vectorize some of the core database algorithms we have in our system.

9
00:00:34,000 --> 00:00:38,000
So that when we run just virtual scans, we can achieve data parallelism,

10
00:00:38,000 --> 00:00:42,000
where we allow the data system to execute the same number of instructions,

11
00:00:42,000 --> 00:00:46,000
but operate on multiple tuples at the same time.

12
00:00:46,000 --> 00:00:50,000
Again, this is the data parallelism or inter query parallelism.

13
00:00:50,000 --> 00:00:52,000
It's another way to describe this.

14
00:00:52,000 --> 00:00:58,000
So the paper I had you guys read today is from 2011.

15
00:00:58,000 --> 00:01:02,000
And it's a really seminal paper on query compilation and co-generation.

16
00:01:02,000 --> 00:01:06,000
It certainly was not the first. It wasn't the modern area.

17
00:01:06,000 --> 00:01:10,000
It wasn't the first to say here's how to do it.

18
00:01:10,000 --> 00:01:16,000
But it sort of set off this investigation from multiple systems and multi-researchers

19
00:01:16,000 --> 00:01:20,000
using the LLVM to optimize things.

20
00:01:20,000 --> 00:01:26,000
So a lot of the papers in the early to mid 2010s sort of give the false impression

21
00:01:26,000 --> 00:01:30,000
that if you're doing vectorization, you can't do compilation,

22
00:01:30,000 --> 00:01:32,000
if you're doing compilation, you can't do vectorization.

23
00:01:32,000 --> 00:01:36,000
And the hyperpavorite you guys read, you know, they talk about what you don't need to do

24
00:01:36,000 --> 00:01:40,000
vectorization because they can do this push-based model and data-centric

25
00:01:40,000 --> 00:01:42,000
up data-centric optimizations.

26
00:01:42,000 --> 00:01:46,000
But we'll see at the end, like, you know, these aren't really exclusive and you can do both.

27
00:01:46,000 --> 00:01:52,000
So we showed this slide before that again, that since we're trying to execute

28
00:01:52,000 --> 00:01:58,000
sequential scans in our overlap database system, we know we have to rely on

29
00:01:58,000 --> 00:02:02,000
making the database system actually the execution engine as fast as possible

30
00:02:02,000 --> 00:02:06,000
so that, you know, we can get better results and make the system more efficient.

31
00:02:06,000 --> 00:02:10,000
All right, so we've gone through a bunch of these already, right?

32
00:02:10,000 --> 00:02:12,000
So how to reduce instruction count, reduce cycles for instruction,

33
00:02:12,000 --> 00:02:16,000
and then paralyze things, which again, we'll cover more of that in the next week.

34
00:02:16,000 --> 00:02:20,000
But today's class, we're really going to be focusing on this first one here.

35
00:02:20,000 --> 00:02:24,000
Now we care about reducing number of cycles, certainly.

36
00:02:24,000 --> 00:02:28,000
But the compilation of the code specialization technique we're going to talk about here today

37
00:02:28,000 --> 00:02:32,000
is really about how to make sure that the database system does exactly what,

38
00:02:32,000 --> 00:02:36,000
or only execute instructions for exactly what it needs for that query.

39
00:02:36,000 --> 00:02:41,000
And then the idea is almost like hard-coding a program to do nothing but execute that query.

40
00:02:41,000 --> 00:02:47,000
Right, so we've already done this, you know, we, as part of doing this,

41
00:02:47,000 --> 00:02:55,000
we can also design the code generation components in our system to be aware of what the CP wants

42
00:02:55,000 --> 00:02:59,000
and generate code for us that's going to be optimal for this.

43
00:02:59,000 --> 00:03:05,000
So the reason why code compilation and, so code specialization and query complation

44
00:03:05,000 --> 00:03:13,000
is going to be important is because we're bringing all these files from disk into memory

45
00:03:13,000 --> 00:03:17,000
and we assume that there's not going to be any distals in while we're processing queries.

46
00:03:17,000 --> 00:03:21,000
Right, if you do asynchronous IO, we can let something in the background go fetch the data that we need.

47
00:03:21,000 --> 00:03:25,000
Obviously there's a pause in order to get the first thing maybe we need into memory.

48
00:03:25,000 --> 00:03:29,000
But while we're crunching over these large parquet or files, again, think of them in like hundreds of megabytes,

49
00:03:29,000 --> 00:03:31,000
not, you know, 4K by pages.

50
00:03:31,000 --> 00:03:37,000
The while we're crunching over those files, something else is the background is going to go fetch the data we need next

51
00:03:37,000 --> 00:03:39,000
and bring that into memory.

52
00:03:39,000 --> 00:03:43,000
So that when execution ends and it comes around says, okay, let me do more work, the stuff you need is already in memory.

53
00:03:43,000 --> 00:03:48,000
So we don't worry about distals in this environment, something else is going to sort of hide that those stalls were.

54
00:03:48,000 --> 00:03:53,000
Plus, as I said before, the disk and network have gotten really fast, so it's less of an issue.

55
00:03:53,000 --> 00:04:00,000
So there's this great paper from Microsoft in 2011 where they talk about what it would actually take to build a database system

56
00:04:00,000 --> 00:04:03,000
to run, you know, orders a magnitude faster.

57
00:04:03,000 --> 00:04:08,000
If you're just trying to reduce the number of instructions that you have to execute while you run queries.

58
00:04:08,000 --> 00:04:16,000
And they made this observation that if you want your database system to run 10X faster, then you need to execute 90% for your instructions than you normally would.

59
00:04:16,000 --> 00:04:19,000
Seems like a lot, but that's actually doable, right?

60
00:04:19,000 --> 00:04:24,000
It's not, it's not far from fast that we could achieve this.

61
00:04:24,000 --> 00:04:29,000
But if you want a belt system that goes 100X faster, now you're down to really cutting the bone.

62
00:04:29,000 --> 00:04:33,000
Because now you got to execute 99% for your instructions than what you were doing before.

63
00:04:33,000 --> 00:04:38,000
And there isn't a flag in GCC, like, oh, 100, it's going to achieve this for us.

64
00:04:38,000 --> 00:04:45,000
It's going to be through care for engineering and through this code specialization and compilation stuff we're talking about today is how we can actually achieve that.

65
00:04:45,000 --> 00:04:50,000
And of course, as I said, it's not just reducing the number of instructions.

66
00:04:50,000 --> 00:05:00,000
We also care about the cycles per instruction because we don't want, we can actually view our instructions that will keep stalling going out to memory because the things we need aren't in L3 cache.

67
00:05:00,000 --> 00:05:05,000
Then we're not going to get the benefit we thought we were going to get.

68
00:05:05,000 --> 00:05:16,000
So today's class is really about, although we're never going to get this, get 99% for instructions, but we can do a pretty good job and get somewhere in the middle.

69
00:05:16,000 --> 00:05:23,000
So first, I want to talk about the background of today why, to help moving, why we want to do code generation and query compilation.

70
00:05:23,000 --> 00:05:28,000
And then we'll talk about the two main techniques. There's the source-to-source compilation, the transpilation.

71
00:05:28,000 --> 00:05:33,000
That'll be from an earlier work before the Hyper1. I think the Hyper1 paper talks about it.

72
00:05:33,000 --> 00:05:38,000
Basically, how to write C++ code or Rust code, wherever you want, to generate another programming language code.

73
00:05:38,000 --> 00:05:41,000
And then you run a traditional compiler on that.

74
00:05:41,000 --> 00:05:53,000
And then the Hyper1 paper you guys read, this is about generating a low-level representation like some IR within your database system for the query and then using something like an embedded compiler like LLVM to compile that.

75
00:05:53,000 --> 00:06:02,000
So at a high level, they're the same. They're still achieving the same thing. They're doing code specialization for a query, but there's two different ways to approach it.

76
00:06:02,000 --> 00:06:09,000
And there's going to be engineering and compilation costs trade-offs between the two approaches.

77
00:06:09,000 --> 00:06:15,000
And then we'll go through a quick smattering of a bunch of different systems that are going to do these different techniques.

78
00:06:15,000 --> 00:06:25,000
And then we'll finish up talking about quick Q&A about how things are going with the projects.

79
00:06:25,000 --> 00:06:30,000
So the, as I already said, the way we're going to be able to reduce the number of structures we have is through code specialization.

80
00:06:30,000 --> 00:06:45,000
So what we're going to do is, we're going to do a little idea here is instead of having in our database system these giant switch statements that are going to check to see what the query operator type is, the plan operator is, or what the data type is, or what expression you're trying to run in your wear clause.

81
00:06:45,000 --> 00:06:55,000
Instead of having these switch statements to iterate over these things, the exact piece of code you want, we're literally going to hard code some sequence of instructions that do exactly what the query wants to do.

82
00:06:55,000 --> 00:07:02,000
And again, the great thing about SQL and the relational model is because everything is declarative, we know exactly what the data looks like.

83
00:07:02,000 --> 00:07:09,000
We know exactly what the SQL query wants to do. So it's not like we can, you know, roll the dice and get things wrong.

84
00:07:09,000 --> 00:07:13,000
Right, we can journey, we can look at the catalog and know exactly what we want.

85
00:07:13,000 --> 00:07:22,000
And again, and then kiss something like a parquet file or a org file, even if we've never seen the file before, we could look at the header and figure out, you know, is this schema matching up what we expect?

86
00:07:22,000 --> 00:07:27,000
And then we can do code specialization based on that.

87
00:07:27,000 --> 00:07:46,000
So the one of the ways we're going to get in addition to maybe hard coding things, another big difference is that there's going to be this, there's the way humans write code that, as I said before, may not be the best way to generate code for a model of CPU.

88
00:07:46,000 --> 00:07:52,000
Meaning like there's ways of set up code using volcano models example that from engineering perspective, it's great.

89
00:07:52,000 --> 00:07:58,000
Seize it into bugs, ease it right, it's composable, we can move these operators around and not worry about what's below it.

90
00:07:58,000 --> 00:08:03,000
But as I said, all that indirection, all that branching is bad for a super scaler CPU.

91
00:08:03,000 --> 00:08:12,000
So instead, we can design our code specialization components in our database system to emit code that no human would ever write willingly.

92
00:08:12,000 --> 00:08:17,000
But it's going to be best, you know, woman capilot into machine code for the CPU.

93
00:08:17,000 --> 00:08:24,000
Right? So if you do a really simple thing like this, and soon again, we're doing the volcano model, we have a three way join on tables, A, B, and C.

94
00:08:24,000 --> 00:08:32,000
And you see roughly the query for them like this, you're scanning, you know, the leaf notes are scanning, you do some aggregation, you do some filtering, and there's a final join at the top.

95
00:08:33,000 --> 00:08:39,000
So again, just assuming that it's the volcano model, the implementations of these operators would look roughly like this.

96
00:08:39,000 --> 00:08:47,000
Right? You're iterating over each input tuple from your child, you're adding some predicate, and you're pushing things up.

97
00:08:47,000 --> 00:08:53,000
And again, whether or not this was vectorized or two bought a time, you know, for our purposes here, it doesn't matter.

98
00:08:53,000 --> 00:09:01,000
So again, but in this case here, think about how you'd actually implement C++ code, you would have a pointer to some root node in the query plan.

99
00:09:01,000 --> 00:09:10,000
And then at runtime, if assuming it's in C++, there'll be a virtual function table lookup to say, oh, at the very top, I'm doing a join, so they call it the join operator.

100
00:09:10,000 --> 00:09:17,000
Right? And even that, you could have different types of joins, you could have an abstract class with a join, and then you have specialization for team them.

101
00:09:17,000 --> 00:09:22,000
But still, there's going to be function pointer lookups at runtime to figure out what you actually want to do.

102
00:09:22,000 --> 00:09:29,000
Right? And that's bad for, again, for our modern CPU. Same thing when we want to compile or run expressions. Right?

103
00:09:29,000 --> 00:09:36,000
Similarly, we have just this wear clause in here inside of nested query. Well, that will be represented by some abstract expression tree.

104
00:09:36,000 --> 00:09:43,000
We have the different operators, and then the inputs are corresponding to the different elements that you're accessing in the query.

105
00:09:43,000 --> 00:09:58,000
So the dumbest thing to do to actually run this would be, again, traversing the tree, just walking down, evaluating every single node, looking up on whatever the context that's provided for the query, substituting the values, pushing things up, and then going down the tree around like this.

106
00:09:58,000 --> 00:10:11,000
Right? So again, this is like, would be a naive implementation. Some systems actually do this, but in postgres a little bit smarter, other systems are a little bit smarter, even before doing compilation or code specialization.

107
00:10:11,000 --> 00:10:24,000
But this is roughly what you're doing at runtime. Right? The giant switch statements or function lookups to go for what this is. So, all right, well, this is like, you know, it's a three, three, three level tree. Is that really big of a deal?

108
00:10:24,000 --> 00:10:34,000
Always think of extremes and databases. If I have to do this for a billion tuples, as I'm scanning long table B, then this is going to be super expensive to do this over and over again.

109
00:10:34,000 --> 00:10:48,000
All right? I'm going to get too much detail with postgres as we'll see this in a second. They do get compilation now for the wear clause. Prior to this, they were using a technique called direct threading thing like it's an interpreter where you have this in a rail pointers and they're calling to that.

110
00:10:48,000 --> 00:10:57,000
But even again, because they're doing it on a tube out of time, that sucks if you're doing a lab. And the jit will help a little bit for that.

111
00:10:57,000 --> 00:11:07,000
All right. So the idea is that again, we want to specialize code in our database system for anything that's going to be CPU intensive for anything that we know going to spending most of our time while we run a query.

112
00:11:07,000 --> 00:11:18,000
We want to even other parts of the system, but for now we assume it's queries. We want to try to specialize that so that there's no in direction, no lookups to figure out what the type is, what the table is, anything like that.

113
00:11:18,000 --> 00:11:27,000
It's literally just hard coding as a human wrote for exactly the query plan. So you can do this for access methods like the scans. Some systems will do this for storage seizures.

114
00:11:27,000 --> 00:11:41,000
Let's see if this is the case of Oracle. They'll compile a PL SQL UDF into their version of C, like sort of like it's called pro star C. Some like C not here at CMU. Like it's a restricted version of C, then they'll compile that to machine code.

115
00:11:41,000 --> 00:11:58,000
Operator, operator execution like the joins, the aggregations, all that you can compile. Predicate valuation. We just saw how to convert a wear clause or predicate inside your query and convert this compression tree into actual program.

116
00:11:58,000 --> 00:12:13,000
And then logging operations. I don't think anybody really does this, but the idea would be if I'm doing like recovery, could I compile the interpretation of log records for our class here this semester. We don't care about this because we're not aware of that recovery, but some systems can do that as well.

117
00:12:14,000 --> 00:12:36,000
So the when when we're actually going to do this for anything that's going to be focusing on queries. We're going to code generation or code specialization when we have the physical plan. So SQL query shows up. We go through the the parser, go through the binder, go through the query optimizer. And then now we have a physical plan. Then we convert that into specialized code.

118
00:12:36,000 --> 00:12:47,000
Because we want to reason about physical plans and not something more higher level or abstract for other things like storm procedures, you would do this compilation when they call create function or something.

119
00:12:48,000 --> 00:13:05,000
So most systems are going to be doing this or some variation of predicate valuation. So we'll see high q, we'll see hyper. They're doing what we'll call holistic query compilation. So they take the entire query plan and then specializing and compiling that systems like postgres, spark.

120
00:13:06,000 --> 00:13:27,000
And all versions of spark and Quest eb, a couple others, they'll be doing something like this. Like because the idea is that you have an existing system that is doing interpretation for executing the query plan. But the the wear calls often is a miscellaneous thing. But then rather than rewriting the entire engine to be now do code generation, you just do code generation for the for the wear clauses.

121
00:13:27,000 --> 00:13:56,000
It's a less of less of an engineering blast to make that change. I would say also too that there's there's we're not going to have any security concerns in this for what we're talking about pretty much in the entire semester because I don't care about that stuff too much. Of course, until they still my credit card I care, but it would be like I don't we're not worried about like someone doing code injection of like sending us a funky query that we then convert to C code that then can like you know leak out SSH keys or something like that.

122
00:13:57,000 --> 00:14:07,000
We're assuming that somebody else has sanitized anything that that we're given right so we ignore all that if you do care about those things again in the case of

123
00:14:07,000 --> 00:14:16,000
in hackathon and Microsoft SQL server and in an Oracle right that's what they convert you to have a strict version of C to prevent you from from doing stupid things.

124
00:14:16,000 --> 00:14:29,000
But again, we assume that the that the code generation code is written by us the new system developers people building the systems and that we're not going to do malicious things in our own code. We can ignore all that.

125
00:14:29,000 --> 00:14:52,000
So some of this I've already said before the way the benefits we're going to get is since we know all the attribute types a priori we don't have to do anything and look up to figure out what the type actually is like we know it like this column at this offset it's this type of this size and furthermore if it's encoded in a compresses a certain way we know exactly what the compression scheme is right there's no surprises in this because we know everything ahead of time.

126
00:14:52,000 --> 00:15:10,000
Likewise we're going to know all the data types ahead of time and we can try to distill it down to the low level primitives like greater than less than equal to which there are hardware instructions for us to make that run really really fast right again complex data types or user find types sometimes

127
00:15:10,000 --> 00:15:25,000
that's not tricky but we could ignore that. And then we're going to try to avoid any function calls in loops as much as possible now we'll see in the case of vector wise and the system that do the pre pre kapo primitives they are going to have function calls in loops.

128
00:15:25,000 --> 00:15:39,000
But they're going to advertise that function call lookup cost or the jump cause because we're doing on batches of tuples right if you have to do a single tuple that would suck but if it's you know a batch of of eight tuples or something like that that's less of an issue.

129
00:15:41,000 --> 00:15:54,000
So as I said before there's basically two ways to do this and again at high level they basically look the same it's just different ways to think about how to generate the code we want to then compile for our queries or predicate or whatever we're doing.

130
00:15:55,000 --> 00:16:09,000
So transpiration is also sometimes called source to source compilation the ideas here that we have code in our database system that can generate other code and then we just run a traditional compiler to generate the native code which we are sorry the machine code.

131
00:16:10,000 --> 00:16:22,000
So that we then link in and execute as if it was like a shared object or is a shared object in our system right so often you'll see like you know how see post us code that generates see post code which you then compile.

132
00:16:23,000 --> 00:16:35,000
Amazon redshift is famous for this and then the paper you guys read in in for hyper they're going to do basically have their own intermediate representation IR for those generate some lower level.

133
00:16:36,000 --> 00:16:57,000
Low level implementation of the query then they would compile that into native code or in case of hyper we'll see in a second they actually can interpret it or generate assembly they do crazy stuff that's in the later version that's an on breath but they they they don't you know not taking typical see post code they're taking some lower level lower level representation.

134
00:16:57,000 --> 00:17:05,000
Again we'll see the trade off between the two of these so we'll go through translation first and then we'll talk about hyper to compilation next.

135
00:17:06,000 --> 00:17:22,000
So the first system in the modern era when I say like the late 2000's early 2010's that would do customization of query compilation is was this thing called IQ and it was an academic system at a university at in barrel.

136
00:17:22,000 --> 00:17:40,000
And so what they would do is for any query that shows up they would have see post code in their system generate more see post code then they would do a fork exact into GCC which then compile it into a shared object and then you then link that into the database system process.

137
00:17:41,000 --> 00:17:55,000
And the way this will work is that you would have to have a the program that you're generating for the query would have to implement a known function with a signature so that the database of news had a call into that to that shared object and run the code right.

138
00:17:56,000 --> 00:18:01,000
That's a good like a standard entry point like think of like the main function for any C program without obviously calling it mean.

139
00:18:01,000 --> 00:18:14,000
So the for this they were just using an off the shelf compiler I think was just GCC or they weren't trying to embed anything this is a precursor to to the L of the M.

140
00:18:15,000 --> 00:18:18,000
So what's one big problem with this yes.

141
00:18:19,000 --> 00:18:20,000
Compilation slow why.

142
00:18:24,000 --> 00:18:26,000
GCC slow why.

143
00:18:27,000 --> 00:18:29,000
It's a bit of a lot of time.

144
00:18:30,000 --> 00:18:32,000
It's a bit of a lot of time.

145
00:18:33,000 --> 00:18:35,000
Now this is this for L of the M.

146
00:18:36,000 --> 00:18:41,000
So it's doing the fork exact so it's running GCC as a separate process what is GCC do when it starts.

147
00:18:42,000 --> 00:18:48,000
Goes really much to the big files and see what you know as if like you're running from the command line right it's not really meant to be run.

148
00:18:48,000 --> 00:18:58,000
It wasn't designed to be run like in the critical path of any query or you know in a database system it's like a general purpose compiler so it does a bunch of stuff that a general purpose.

149
00:18:59,000 --> 00:19:05,000
Kind of a do like go look to see where my libraries are linked those in parts config files and figure out what I'm allowed to do right.

150
00:19:06,000 --> 00:19:15,000
And of course it's a fork call so now I got to talk to the OS goes spawn a new process and run that on the side right it's going out GCC is going to allocate memory do bunch of stuff right.

151
00:19:16,000 --> 00:19:28,000
So that's going to be one of the big problems with this approach but we'll see why this actually is from engineering perspective going to be easier to maintain and debug going forward compared to the L of the M stuff.

152
00:19:30,000 --> 00:19:36,000
So the high level looks like that so say this is that some simple query and it's like pseudo python code right.

153
00:19:36,000 --> 00:19:49,000
So for this get to operation if you're doing an attributed plan you first go look what table my accessing go look into catalog to figure out what the scheme is now you wouldn't do this on a per two basis you would obviously catch this before outside the for the but you have to do it at least once.

154
00:19:50,000 --> 00:20:05,000
Then you're going to say okay if I want to go get this to pull within a page or block was the offset I'm not the little table size that got to return a pointer to the two pull and then now in this if clause about the predicate I'm traversing that that that expression tree that I showed before.

155
00:20:06,000 --> 00:20:22,000
Pulling the values up check and see whether things match and then deciding whether to terminate early or keep going or short circuit things and then return true of false and maybe you have to cast things in the right data type as you go along based on you know based on what the attributes are looking at.

156
00:20:23,000 --> 00:20:27,000
So again this is like an over complicated it's a high level.

157
00:20:27,000 --> 00:20:38,000
High level explanation of what the queries actually do and maybe again some of these things you can cash up this part here but again we're doing if you're doing this on a per two basis it's a bunch of ways to work to do the same thing over and over again.

158
00:20:39,000 --> 00:20:56,000
So what I could do is I'll generate sort of stub code like this where you set up some some parameters that are given to you at at when you vote this I think of this as a function for the query and then now within my my for loop you know now I'm not doing any look up to say what's the time.

159
00:20:57,000 --> 00:21:03,000
So I'm going to decide the two or what we're offset are all that's baked into the code like little hard coded values.

160
00:21:04,000 --> 00:21:14,000
And standing to the valuation same thing I mean you know the compiler can recognize that some number plus one it can it can can fold that in and evaluate that once and not repeat it over and over again right.

161
00:21:15,000 --> 00:21:16,000
Yes.

162
00:21:16,000 --> 00:21:27,000
So this is the question is that yeah this e-bout predicate is like we we we we we we we we we we we we we we say oh it's plus one and we hard code that in the program.

163
00:21:28,000 --> 00:21:31,000
Is there ever a case where the expression tree is not people.

164
00:21:32,000 --> 00:21:37,000
Is there ever a case where the expression tree cannot be expressed in C++ no why wouldn't it.

165
00:21:37,000 --> 00:21:40,000
Like literally like yeah I can't think of anything.

166
00:21:42,000 --> 00:21:47,000
I mean for in clauses you can't put me generate exact like you might mean you may not be able to use like.

167
00:21:48,000 --> 00:22:00,000
Not standard library like like I think everything you could use the standard library like in clauses or raise or vectors you can use a STL library for that but everything else you can get it down to me.

168
00:22:00,000 --> 00:22:01,000
It's exact instructions.

169
00:22:02,000 --> 00:22:05,000
I can think of like going back whatever that career was.

170
00:22:07,000 --> 00:22:10,000
I don't know query sorry the.

171
00:22:11,000 --> 00:22:28,000
Like if the expression was where we know where value equals input parameter plus one that plus one you don't want to interpret over again since you have the input value like you baked that into the exact C++ code and then now the equal equal sign is just again the W sign and in C++.

172
00:22:28,000 --> 00:22:32,000
And the compiler knows how to go to town on that and optimize that as much as possible.

173
00:22:33,000 --> 00:22:38,000
So the plus one is from SQL. Yeah maybe I might have removed the SQL query by accident.

174
00:22:39,000 --> 00:22:43,000
Yeah the query is like basic select star from tapes.

175
00:22:44,000 --> 00:22:49,000
So next star from table where value equals predict it value equals input parameter plus one.

176
00:22:49,000 --> 00:23:02,000
And then whether or not the query optimizer does that you know evaluates the plus one before it gives it forward actually runs it.

177
00:23:03,000 --> 00:23:04,000
It depends on the optimization.

178
00:23:05,000 --> 00:23:06,000
Yes.

179
00:23:06,000 --> 00:23:11,000
So there's a question like for systems that use expression compilation.

180
00:23:12,000 --> 00:23:17,000
Do they are often just like not to expression following the view that says.

181
00:23:18,000 --> 00:23:24,000
Yeah it's a question and the go question like for the systems that do predicate compilation.

182
00:23:25,000 --> 00:23:34,000
Do they do their query optimizers not do any of this folding stuff ahead of time and did that is puntile of the compiler did all for you.

183
00:23:34,000 --> 00:23:45,000
For systems that they retrofitted the like the compilation after the fact like I think post-gust does this like they'll do that because it didn't have the other thing before.

184
00:23:46,000 --> 00:23:54,000
But obviously if you know you're always going to compile stuff then you can just take advantage of that as well as additional optimizations that you know the traditional source code compiler will give you.

185
00:23:54,000 --> 00:24:21,000
So what's interesting about the high q approach is that the since it's us as the data system engineer developing the the code generation piece we can do anything we want in that.

186
00:24:21,000 --> 00:24:27,000
Meaning like we can invoke any other part of the system inside of our generated code.

187
00:24:28,000 --> 00:24:39,000
So that means like we could call out to the network code to send messages if we wanted to we could go get data in and out of the buffer pool manager if we wanted to run transactions right.

188
00:24:40,000 --> 00:24:50,000
So we can pretty much do anything we want because it's just it's as if the code was regenerating which shipped with the database system when it was being built by the engineers right.

189
00:24:51,000 --> 00:24:59,000
And that means that we don't have to have any specialized bridges to call out to other parts of the system which is invoked as if was a you know a function built in.

190
00:25:00,000 --> 00:25:16,000
And you see this a lot in it's not exactly code specialization but you see this in a lot of the extensions for postgres because they're just linking and shared objects for better or worse they call all the parts of the database system because you can because it's just C code.

191
00:25:16,000 --> 00:25:19,000
Of course you have to manage memory that's a whole another issue.

192
00:25:20,000 --> 00:25:45,000
So the one key advantage though even though the compilation is going to be slower a key advantage of the translation approach is that debugging is going to be relatively easier easier relative to the the jit compilation from hyper because what are you generating C++ code what if it crashes what do you have C++ code you can walk through in a debugger you have nice facts traces you have nice symbols.

193
00:25:46,000 --> 00:26:07,000
So you can figure out what what broke now you got to do a little extra work to maybe annotate the generated C++ code or C code whatever generating to reference back what part of the main system generated that code because again I don't want to debug the the thing I just co-gend I want to debug the system that generated the code right but you can put annotations in there to figure out where this thing came from.

194
00:26:07,000 --> 00:26:11,000
So now you just take any off the shelf.

195
00:26:11,000 --> 00:26:22,000
See those program or whoever it is and they're not a usdb in theory and they know how to can then debug your program you don't really need specialized people that have to understand lvm or assembly to make all this work.

196
00:26:22,000 --> 00:26:42,000
And that will be one of the things we see in redshift and when we read the photon paper later on from data bricks they talk about the debugging of a lvm jit compiled system is the engineering burden is very very high and so they decide to avoid it.

197
00:26:42,000 --> 00:26:52,000
So the show some results from the high coup paper and they're going to compare it against for their implementations.

198
00:26:52,000 --> 00:27:01,000
So the first would be like a generic volcano style database system that is using generic predicates or expression trees and vibrating them.

199
00:27:01,000 --> 00:27:13,000
So it's like the version zero of any database and so many builds. Think of like bus stop. Then they'll have type of specific iterators using I think c++ templates to in line as much as possible.

200
00:27:13,000 --> 00:27:23,000
Then they'll have a hard code implementation sort of first pass written by a grad student. Then you have an optimized version written by another grad student and then you have the high coup code.

201
00:27:23,000 --> 00:27:35,000
So the one is generating the c++ code. So in this here the measurement they actually measured l1 catch misses but it's so small we're going to ignore that.

202
00:27:35,000 --> 00:27:44,000
And it's as you expected right the generic implementation the textbook implementation database system is going to slow us but as you go along and you start adding more optimizations things are getting better and better.

203
00:27:44,000 --> 00:27:57,000
So the thing that we really care about is this part over here where the grad student was able to generate optimized invitations of like again hand writing the query plans.

204
00:27:57,000 --> 00:28:11,000
This is what this is TPCH I think or this is joined query up here and the number the difference is quite small but the high coup system is actually generate is able to generate c++ code that's better than the hand generated code.

205
00:28:12,000 --> 00:28:25,000
Again and this is because you think about it you only need to build the the code and piece once and you can put all the tricks you know how to make the queries run fast within that one implementation.

206
00:28:25,000 --> 00:28:32,000
Whereas if you're really hard coding the queries you got to read you know optimize every single one individually.

207
00:28:33,000 --> 00:28:45,000
So the the the optimized ones are just going to be faster because there's fewer branch misses there's allocating less memory there's less fewer memory jumps and you know for functions because everything is almost like in mind yes.

208
00:28:45,000 --> 00:28:52,000
How do you know when else do cash occurs.

209
00:28:52,000 --> 00:28:56,000
How do you cut this data.

210
00:28:56,000 --> 00:29:01,000
I didn't teach you guys about performance counters basically CPU can track all this for you.

211
00:29:01,000 --> 00:29:12,000
Every CPU has what called performance counters so they're in the inside the CPU is maintaining all this information about your programs and you use a tool like Intel is VTune the source of the presentation called perf.

212
00:29:12,000 --> 00:29:25,000
It's almost like it like if you're used like Valgrin but like Valgrin is instrumenting the code as it runs this is like you don't do any instrument implementation of the code the CPU just counts it all for you and they can turn on perf.

213
00:29:25,000 --> 00:29:32,000
There's a very little performance overhead and then dumps out like a perf file that you can then look through and see where the cash misses work so what.

214
00:29:32,000 --> 00:29:36,000
Yeah actually who here is familiar with perf.

215
00:29:36,000 --> 00:29:43,000
Alright about half right so maybe what we can cover that in a week or two just crash course of how to do performance debugging.

216
00:29:43,000 --> 00:29:47,000
Yeah CPU is a great CPU can measure all the stuff for you.

217
00:29:47,000 --> 00:29:56,000
And again we can measure down like L1 but cash misses but we're ignoring that because it would be way too small.

218
00:29:56,000 --> 00:30:14,000
Alright so again this paper is 13 years old right 14 years now I think 2008 yeah 14 years old so this is running on a really old CPU that's obviously been you know exceeded by everything else according to duo but that that part I don't what's that.

219
00:30:14,000 --> 00:30:15,000
Sorry.

220
00:30:15,000 --> 00:30:27,000
So the exact numbers I don't care about is the relative performance difference that matters right and even we had a modern CPU I would expect that it would still look the same way.

221
00:30:27,000 --> 00:30:33,000
So again as you said what's the problem with this approach the compilation cost alright so how much time does that take.

222
00:30:33,000 --> 00:31:02,000
So in here they're comparing the the high q generated source code the compilation cost for either running with O1 or O2 and as I said we don't we don't ship database system software with O3 compilation because it might put things might put things out of order and actually me and running slower than it then it would just O2 so O2 is what you want to ship source code with obviously when you use O1 if like if you're trying to debug something then you know you run with O1.

223
00:31:02,000 --> 00:31:31,000
But obviously O1 is going to be less aggressive on the optimizations so that's why the compilation cost is lower right again old hardware back in the day but it just goes to show that like the first of all you see almost a three X difference in compilation cost 0 0 0 0 2 but again now we're talking in case for the square here 600 milliseconds to compile it right for scale factor 1 you can probably run this query in 10 milliseconds.

224
00:31:31,000 --> 00:31:48,000
20 milliseconds. So this is a big problem because you know if you're if you're if you're queries going to run for a fraction of a fraction of the compilation cost you might just be better off does not running the compilation step at all just run the old interpreter version.

225
00:31:48,000 --> 00:31:59,000
Now if you're queries going to run for like five hours and it takes 600 milliseconds of the pilot yeah who cares but again the the distance gotten faster than that was gotten faster CPUs not as much but like the

226
00:31:59,000 --> 00:32:12,000
you know with a well inch minutes or well built execution engine you'll be able to get through some queries can finish in less than 10 more seconds your compilation cost is going to be a big problem.

227
00:32:12,000 --> 00:32:24,000
Now the hyperpavary guys read didn't doesn't solve it they solve it afterwards will cover that in a second but in that case again because this is a fork in GCC there's it's a much more expensive compilation process yes.

228
00:32:24,000 --> 00:32:35,000
What do you do after the question is what is high could do what what do people do.

229
00:32:35,000 --> 00:32:51,000
Yes so it's questions what do people do with the compiled code do they just throw it away and discard it or can they cash it will see rest of the second they cash they cash it and cash everything and high could it means an academic system I don't know but you can obviously imagine it like

230
00:32:51,000 --> 00:33:13,000
because if I can parameterize it potentially to put it into like you know it's a function of making a function where I pass in the maybe input value and I don't get maybe the concept for that I would want but at least now the compilation cost would be less and then you essentially end up with vector wise is because that's what that's what they're doing but they're pre-compiling everything when you ship the database system not at runtime for queries.

231
00:33:13,000 --> 00:33:20,000
But you have cash in with help if it's a paired statement you can cash it can you know you're going to see it over again right yes.

232
00:33:20,000 --> 00:33:34,000
Is that what is that what is aqua aqua is aqua is a harbor accelerator that's which we won't cover that even before you get to aqua they they catch things yes.

233
00:33:34,000 --> 00:34:03,000
Okay so as I said then the relational operators are a great way to reason about queries and we have these composable query plans we can move operators down anywhere we want and not worry about what's feeding into what because it's just sending tuples but that's going to be problematic when we come this time to execute it if we do it was a little translation of the relation algebra query plan into some of the query plan that we want to do is we can do that.

234
00:34:03,000 --> 00:34:10,000
So we can do that for query plan into siposloss or whatever we want to compile into that may not may not always be the most efficient way to do this.

235
00:34:10,000 --> 00:34:23,000
And they said there's a long compilation cost in siposloss and the case of hiku they were not supporting full pipelining they were still processing one tuba at a time from one operative to the next.

236
00:34:23,000 --> 00:34:33,000
Because it's from 2008 and the vectorization stuff and the other stuff we talked about so far that came much later.

237
00:34:33,000 --> 00:34:44,000
So the hyperpipier you guys read is not an easy paper to read so hopefully no one spent too much time in the appendix on that hello the the IR stuff I think it's said not to read it right.

238
00:34:44,000 --> 00:34:59,000
So what he's going to do in hyper is that again rather than generating siposloss code they're going to generate a lot of them IR directly and then they would then go ahead and compile that into machine code.

239
00:34:59,000 --> 00:35:12,000
So you end up with the same you would end up so the same machine code theory as the hiku approach but you're not going to siposloss and then converting that to a machine code or of course the gz is going to put that in the same IR.

240
00:35:12,000 --> 00:35:21,000
You're just going directly to the IR with a bunch of siposloss macros that then compose a query plan handed off to lvm and then lvm can go ahead and compile it.

241
00:35:21,000 --> 00:35:33,000
Now the the challenges paper also to is because he's a genius he's introducing two key concepts he's introducing this code compilation stuff with lvm but he's also introducing the push based execution.

242
00:35:33,000 --> 00:35:52,000
And he and that makes it seem like you can't have one without the other it's not true but he's showing you how to can design these using operative fusion design these query plans be very efficient try to ride query tuples up in cp registers for as long as possible and the push based approach is how you do that.

243
00:35:52,000 --> 00:35:57,000
So let's just look over really simple examples so this is the query we showed before.

244
00:35:57,000 --> 00:36:01,000
So we know how to divide up the query plan into pipeline.

245
00:36:01,000 --> 00:36:12,000
So there's a pipeline break that says that we can't start executing another pipeline until all the the tuples are processed by the the the the child pipeline below it.

246
00:36:12,000 --> 00:36:19,000
Now we'll cover next class how do we take these pipelines and divide them up to task we run them on different cores and they're nodes and schedule them.

247
00:36:19,000 --> 00:36:33,000
That's next week for now we'll just assume that it's a very simple dependency grab to know we got to run run one and two can run in parallel but two three can't run until two finishes and four can't run until one and three finish.

248
00:36:33,000 --> 00:36:46,000
So what hybrids going to do is that they're going to generate these essentially much a nest of for loops right it's the push based model so so these nest of for lips are going to be able to within when one pipeline.

249
00:36:46,000 --> 00:36:59,000
Do as much work you can for a single tuple and I'll go back to the next iteration of the for the once you've done everything you can with that to pull right so you think of the boundaries here are these pipelines like this right.

250
00:36:59,000 --> 00:37:14,000
And at the end you have this long pipeline for just entering every people see probing to the hash table probing the second hash table and then admit it when it's done right and so in this case here for any two but that that's going to match the join on the join clauses for for the other two tables.

251
00:37:14,000 --> 00:37:35,000
I'm going to all that processing up the pipeline before I go back and I keep there to be very careful keeping all the this data in like the CV registers themselves rather saying hey here's here's it's in memory I hope it makes it there actually be very careful try to put it into the registers and not put anything else in there to go back and get another to pull.

252
00:37:35,000 --> 00:37:40,000
And he's again these are just showing the dependencies between them.

253
00:37:40,000 --> 00:37:54,000
So when you compare so he's going to compare against the initial version of of hyper that he wrote the due cogeneration use that was like the high q approach with C++ and then he had his L of them base approach.

254
00:37:54,000 --> 00:38:02,000
But he's also going to pair against vector wise mode adb and hyper again this is what 2011 2010 so these were sort of state of the art.

255
00:38:02,000 --> 00:38:13,000
O lap systems at the time case of Oracle with their showing like here's what happens if you have a volcano based system it's not a column store it's like the worst case scenario.

256
00:38:13,000 --> 00:38:23,000
I think he calls it db Davis X in the paper right that's because Oracle has a new contract or license screen that says you can't name by name in any account.

257
00:38:23,000 --> 00:38:24,000
What's that.

258
00:38:24,000 --> 00:38:25,000
I didn't know it was awful.

259
00:38:25,000 --> 00:38:26,000
It's Oracle.

260
00:38:26,000 --> 00:38:27,000
Yeah.

261
00:38:27,000 --> 00:38:34,000
So but I get the papers 10 years old who cares right maybe they care.

262
00:38:34,000 --> 00:38:42,000
Why is it better than why why is Oracle better than q4.

263
00:38:42,000 --> 00:38:44,000
Yeah that one I don't know.

264
00:38:44,000 --> 00:38:48,000
Yeah I don't know that.

265
00:38:48,000 --> 00:39:02,000
It could be the query optimizer so this mode adb at this point was maybe 10 years old Oracle was 30.

266
00:39:02,000 --> 00:39:10,000
35 years old so like they've had you know millions of dollars port in the query optimizer where's mony db was a small academic team.

267
00:39:10,000 --> 00:39:13,000
So maybe it could case mony db is picking a bad query plan but I don't know.

268
00:39:13,000 --> 00:39:17,000
We'll see bad query plans later on.

269
00:39:17,000 --> 00:39:22,000
So right in the case is here for q2 I think vector wise.

270
00:39:22,000 --> 00:39:25,000
They didn't get a result.

271
00:39:25,000 --> 00:39:30,000
So again I don't care about so much the difference between Oracle and everything else.

272
00:39:30,000 --> 00:39:36,000
The thing we sort of care about is like the the hybrid LLM based version and everyone else right.

273
00:39:36,000 --> 00:39:43,000
And the case actually for mony db it's using it has an interpreter that's going to use op codes that's going to look like like SQL light we'll see in a second.

274
00:39:43,000 --> 00:39:47,000
So it isn't just you know it isn't doing function.

275
00:39:47,000 --> 00:39:50,000
It isn't traversing the trees the query plan trees that's what we said before.

276
00:39:50,000 --> 00:39:53,000
It's a little bit better than that.

277
00:39:53,000 --> 00:40:00,000
But it's still not again it's still not you know exact program for the for the query plan.

278
00:40:00,000 --> 00:40:12,000
So the reason why the hyper one is going to do better than say the super low version of hyper is that they're going to be more aggressive pipelining to try to ride tuples up in CPU registers because they have low level control of what art was goes in those registers.

279
00:40:12,000 --> 00:40:20,000
Because of generating the IR whereas in C++ you're hoping that compiler can figure that out for you and it doesn't always do that.

280
00:40:20,000 --> 00:40:26,000
Whereas in the LLM stuff you can't have exact because that control.

281
00:40:26,000 --> 00:40:33,000
In the case of key one it's just a wear clause and an aggregate there's no joins.

282
00:40:33,000 --> 00:40:44,000
The wear clause is simple enough but it's again the writing things up that single pipeline as far as possible is why they're going to get better performance.

283
00:40:44,000 --> 00:40:54,000
So again compared to other systems you know this is pretty significant again this is measured in milliseconds it's it's it's over 10 years over this point.

284
00:40:54,000 --> 00:40:57,000
Skew factor one is only one gigabyte so it's not that big.

285
00:40:57,000 --> 00:41:07,000
But you kind of see how like we're getting to almost the bone the bear bones of like how much better you can actually get in these systems yesterday is bigger but like if you have the process more data.

286
00:41:07,000 --> 00:41:18,000
You know there's not you know there isn't a 100 to make the extra number of structures that they're going to go away so code specialization is going to get us to the bare metal speeds.

287
00:41:18,000 --> 00:41:22,000
So these are these results are pretty good.

288
00:41:22,000 --> 00:41:46,000
So to imagine now the compilation costs this is not in this wasn't in the paper you guys read and this is not like a true scientific evaluation of these two approaches because I'm taking the numbers from the the the high-coup paper and the numbers from the hyper paper which you can't get from running on different hardware at the time but again it's you can kind of see roughly the performance difference between the two systems right.

289
00:41:46,000 --> 00:42:09,000
So again high-coup is doing transpolation so it's generally see public code and looking GCC taking the shared object and linking that in and running it whereas in the LLVM hyper in the LLVM it's all in the same address space separate thread runs the compilation stop and you can you know you can initialize LLVM when the system starts up and you don't have to re re-initialize that re-initialize it over and over again.

290
00:42:09,000 --> 00:42:18,000
As you see the compilation times are getting down into you know under 20 milliseconds which is not great but it's it's acceptable yes.

291
00:42:18,000 --> 00:42:47,000
So hyper-sipylthalous is an approximation of high-coup right it's actually better than high-coup because I still think this is I mean it's still two-po at a time but I think he's still

292
00:42:47,000 --> 00:43:17,000
doing the push-based model of this I think right. In a case of vector wise you know they're doing pretty good for primitives but it is it is actually doing vectorized execution. Now I don't know whether they're in simd on this again 2011 2012 maybe AVAX2 or something like that but there's other factors as well like it's not it's not the same before it's not always me a true apopsy comparison because like the way hyper does fixed point decimals for a

293
00:43:17,000 --> 00:43:28,000
Q1 is really efficient versus like I think vector wise at the time is doing something similar to like Postgres right in case of hyper it's literally a 120 bit number that is ripped through instructions with that.

294
00:43:28,000 --> 00:43:46,000
We have to do any lookups or do casting of you know bar charts to figure out what the decimal point is so like you know this difference between this isn't tied just because it's due in compilation but I was saying for these it's the same data types so these it's a good good difference of the two approaches.

295
00:43:46,000 --> 00:44:13,000
Okay so as I said multiple times today the big problem is going to be the compilation time if you can do ahead of time before the query runs fantastic but you know oftentimes in OLAP system you've never seen the query before maybe that exact query so you go get a good pilot in the case of hyper they observe that the compilation time of a query is going to grow super linearly relative to the complexity of the query so not so much how much data you're accessing.

296
00:44:13,000 --> 00:44:19,000
Like what is in what is in the actual query the number joins the aggregations the predicates the where calls to the so forth right.

297
00:44:19,000 --> 00:44:34,000
So for all the TP not that big of a deal because most applications we're running with the exact same queries over and ever again maybe just parameterized and the data systems can all of them convert them to prepared statements so they can compile a once in and reuse it.

298
00:44:34,000 --> 00:45:03,000
OLAP queries as I said if we've never seen the query before then this is going to be a problem and so the I don't think again I don't think it's in the paper but the the one examples that they told me was after hyper got acquired by tablo they had to make it process compatible because it was shipped in the tablet product as like a query accelerator and what would happen is people would install hyper and the very first thing they would do is hook up PG admin to it which is like a

299
00:45:03,000 --> 00:45:10,000
graphical interface a web interface to post-cress databases you can see all your tables you can write queries and so forth right.

300
00:45:10,000 --> 00:45:18,000
And so when you turn on PG admin the very first thing it does to figure out what tables you have is does queries against the catalog to figure out I have these tables this type and so forth right.

301
00:45:18,000 --> 00:45:32,000
And so just regular PG admin pointing it to regular post-cress database you know queries even start instantaneously but in case a hyper because they had it all this compilation stuff it would be like a 20 second pause for these again two

302
00:45:32,000 --> 00:45:45,000
two was queries and aren't grabbing a lot of data but it had a bunch of complex joins against the process catalog and the system the the administrative interface with pause for 20 seconds right so it looked like you know everything was unresponsive.

303
00:45:45,000 --> 00:45:55,000
20 seconds doesn't seem like a lot does not seem like a lot but if you're used to having instantaneous access to your post-cress database to PG admin it's something's wrong.

304
00:45:55,000 --> 00:46:24,000
So then they came out with another approach of follow up to paper you guys read in 2018 using a technique called adaptive execution and the idea here is that they're still going to do the same thing in the paper you guys read where they generate the LLVM IR but then instead of you know not running the query until you finish the compilation step they're going to have this interpreter that they wrote start interpreting the LLVM IR start running the query right away then in the background then then they're going to run the LLVM compiler they can file that IR into.

305
00:46:24,000 --> 00:46:53,000
They are into machine code and then if the compilation finishes before the query finishes then they just slide in the shared object and replace the interpreter and the queries and runs super fast after that right and we'll see in the paper guys read next class the morsels paper there's this natural boundary between the query task or the plant task where you process some some chunk of data the worker thread processes some chunk of data and then when it's done.

306
00:46:53,000 --> 00:47:20,000
And then when it's done it says oh it's the next thing we're going to do for the same query and when it does retrieve that task and go look up to see is the compiled version of that task ready for me and if it is and it just slides in so it's not like you're interpreting and then you cut off in the middle of the before loop there's again when I'm done running my batch I go get the next thing and I may be pulling a compiled version of that task rather than the interpreter version right so all of the done done seamlessly.

307
00:47:20,000 --> 00:47:27,000
So the over the diagram here is going to show numbers that they reported in their paper so this is going to walk through how this all works.

308
00:47:27,000 --> 00:47:33,000
So the SQL query shows up you run it through the query optimizer for them that takes roughly 0.2 milliseconds.

309
00:47:33,000 --> 00:47:41,000
Hyper also has one of the state of your query optimizers we'll cover that later but that's a pretty good optimization time.

310
00:47:42,000 --> 00:47:55,000
Then they'll take the physical query plan that run through the co generator that's going to generate the LLM IR and that takes roughly 0.7 milliseconds right so this is pretty trivial to do this you're measuring micro seconds.

311
00:47:56,000 --> 00:48:16,000
So now at this point there will be three different branches and these can run in parallel so the first thing is that you take this LLM IR generator here and then you're going to run your own bytecode compiler that can then generate some convert the IR to your own bytecode and then they have an interpreter that they wrote that compiles this right.

312
00:48:17,000 --> 00:48:26,000
I think they told me they all this they wrote themselves there were open source LLM IR interpreters but Thomas didn't like any of them so he wrote his own in two weeks.

313
00:48:29,000 --> 00:48:32,000
We got we imported our own German here.

314
00:48:35,000 --> 00:48:45,000
Well he is a busy master we got our own German and it took him about a semester right the same thing right so it's not impossible came down and you don't actually have to implement your own your all your you don't know that all the entire thing.

315
00:48:46,000 --> 00:48:53,000
So you can do that in the LLM IR right you just need whatever you're you know whatever this thing is going to generate right and you control the whole sack so you can do this.

316
00:48:54,000 --> 00:49:06,000
So then in the background they're going to take also take this LLM IR and they'll just run the regular LLM compiler thick of like this running this 0 1 or sorry 0 0 and that's going to generate some x86 code and when that's available we can slide that in.

317
00:49:07,000 --> 00:49:15,000
So the bytecode compiler there to you know 0.4 milliseconds say this one takes 6 milliseconds so the query still running after 6 milliseconds then you can slide that in.

318
00:49:16,000 --> 00:49:31,000
So if you're really taking much longer then you can kick off the more expensive compilation steps like running 0 0 2 and that takes 25 milliseconds and then you do just some oppositions run that the optimized version of the compiler and then you have more x2 code there right.

319
00:49:33,000 --> 00:49:35,000
So yes.

320
00:49:35,000 --> 00:49:37,000
Yeah. Is it bytecode?

321
00:49:37,000 --> 00:49:47,000
No, I think like jaming bytecode. It's some you know it could be LLM IR and our system we did directly LLM IR for what I think they wrote around.

322
00:49:48,000 --> 00:49:49,000
Right.

323
00:49:53,000 --> 00:50:00,000
But again I don't think it's like it's it's not doing like the heavyweight compilation like hoisting stuff like that like a GCZ climb would do.

324
00:50:01,000 --> 00:50:02,000
Right.

325
00:50:02,000 --> 00:50:17,000
So the there's a lot of you know a couple of benefits of this obviously the speed right because if my query is really simple then this thing might be enough right and this is basically what what what what SQL light does right.

326
00:50:17,000 --> 00:50:27,000
They have their own VM that interprets these op codes but if the query has been run longer then you know 5 to 8 6 milliseconds to get a machine code for this that's again that's that's a true amount of time.

327
00:50:27,000 --> 00:50:40,000
They know the benefit though is that you're you now can actually debug you know fail programs more easily because you have this thing at the top you have this this interpreter for your bytecodes.

328
00:50:41,000 --> 00:50:51,000
So if you're if you're running the copop version and it crashes you can then reverse that and figure out what lines of the code generated that that there's op codes or whatever that fail the machine code that fail for me.

329
00:50:51,000 --> 00:51:00,000
And then I can step through it with a regular debugger at the top and walk through and figure out okay here's what you know what line of code am I tripping up on.

330
00:51:01,000 --> 00:51:02,000
Yes.

331
00:51:03,000 --> 00:51:08,000
You're saying you're using the bytecodes compiler but pretty short that's going to be better than not doing it at all.

332
00:51:09,000 --> 00:51:16,000
Correct. It's what say it is am I saying that if your query short is the bytecodes compiler going to be better than doing anything down here.

333
00:51:16,000 --> 00:51:19,000
Or like not doing any of that in government just.

334
00:51:22,000 --> 00:51:28,000
I mean it's not super it's not super plus it's it's it's it's top codes it's like like the GAMM op codes.

335
00:51:29,000 --> 00:51:31,000
What are you doing with jit?

336
00:51:31,000 --> 00:51:34,000
Yeah like the jet this is the jit step.

337
00:51:36,000 --> 00:51:40,000
Like what is the phrase when you shot don't generally put it all what about class?

338
00:51:41,000 --> 00:51:42,000
What kind of code?

339
00:51:43,000 --> 00:51:45,000
Machine code or simple let's go what are you saying?

340
00:51:46,000 --> 00:51:54,000
The algebra runs master they don't do any of the like what how does by code compare to like not doing any more.

341
00:51:55,000 --> 00:51:59,000
Oh it's question is how does like if I did this don't do any cogeneration.

342
00:52:00,000 --> 00:52:08,000
Sorry if I just have like a bus tub interpret a cell system I don't do that versus having this step is this step always going to be better.

343
00:52:08,000 --> 00:52:20,000
Well I mean for like maybe really really really simple queries like one maybe but like when things are running you know more complex things than I want this absolutely.

344
00:52:21,000 --> 00:52:26,000
But like you think of like I can handle this or handle the short things without going to the expensive step.

345
00:52:27,000 --> 00:52:33,000
But then when the when the bigger queries more complex things show up bus tub is going to choke this thing is going to rip through it.

346
00:52:34,000 --> 00:52:36,000
So it can handle both.

347
00:52:36,000 --> 00:52:40,000
And you're seeing you can switch from white to white code to the X-ray.

348
00:52:42,000 --> 00:52:45,000
This question is can I switch it from the bytecode X-ray to code on the fly yes.

349
00:52:46,000 --> 00:52:55,000
I think of like I have I take a query plan I break it up into pipelines and I'll have different instances of those pipelines running like a task instance or.

350
00:52:56,000 --> 00:52:58,000
And each one's going to process a thousand two pulls.

351
00:52:59,000 --> 00:53:11,000
So I'm running my my threads running this bytecode version of it I process a thousand two pulls when I'm done I go check to say hey is the copover version ready for me if it is then I just slide that in and process the next thousand two pulls.

352
00:53:12,000 --> 00:53:21,000
And the logic is exactly the same so it's not like there's going to be like any difference in the data that's generated results generated from the bytecode version versus the copover version it's all the same.

353
00:53:22,000 --> 00:53:23,000
Yes.

354
00:53:29,000 --> 00:53:44,000
Yeah question is can we be can the optimizer be smart enough here and recognize oh well this queries select one I know I don't need to you know read any data or anything expensive so just skip all this yes.

355
00:53:45,000 --> 00:53:51,000
How but when you do a start to enjoy and we'll see this in a few weeks the optimizer is going to be way off.

356
00:53:52,000 --> 00:54:05,000
So like a simple threshold might be like do this always have to do this and then maybe just always just the background but then maybe some triggers says okay after 20 milliseconds not enough let me run this to.

357
00:54:07,000 --> 00:54:08,000
Yes.

358
00:54:08,000 --> 00:54:33,000
Can I say that on the average case it's like moving on his point and I say on the average case it might be worse but on the worst case is it would be yes but where that where that cut off between like in the best case like is the is the interpretive system would be better than then the compilation.

359
00:54:33,000 --> 00:54:36,000
It depends on the hardware depending on what you're doing right.

360
00:54:39,000 --> 00:54:40,000
Yes.

361
00:54:49,000 --> 00:54:52,000
His question is what kind of companies would with milliseconds matter.

362
00:54:53,000 --> 00:54:55,000
For one query.

363
00:54:56,000 --> 00:54:58,000
The second difference is 20 milliseconds.

364
00:54:59,000 --> 00:55:01,000
Yes. So it's like why do people care.

365
00:55:02,000 --> 00:55:16,000
So I need on the extreme case or the high-frequency trading guys right those guys are like they're snort cocaine they're running around fiber on the river like those guys they want to be they want to measure queries in microseconds.

366
00:55:17,000 --> 00:55:20,000
But is this an overlap like this for specifically all of our people.

367
00:55:20,000 --> 00:55:41,000
This could be you could use this for both right but so it's about high-frequency guys care a lot right for us mortals the conventional wisdom is 50 milliseconds and that's usually for like a transaction and that number comes from inner advertising auctions so like when you go visit a webpage and you're not using ad blocker.

368
00:55:41,000 --> 00:55:57,000
The hosting company sends or whatever is running the ad say it's Google they send a request out to the different advertising brokers the auction houses to say here's this user visiting this web page and here's everything they know about you you know they bundle that out into the request.

369
00:55:58,000 --> 00:56:06,000
And I think you then the contract is you have to respond in 50 milliseconds what your bid is for the return yet it might have gone down to like 40 30 milliseconds but that's roughly what it is.

370
00:56:06,000 --> 00:56:19,000
So the response time you have to get back is 50 milliseconds so now soon around trip times maybe some some number less than that so you got to run a query to go look up to see whether I want to sell an ad to this person within within that time.

371
00:56:21,000 --> 00:56:35,000
There's another number two I think some amelons says for every 100 milliseconds that the Amazon product pages slower they lose a million dollars like it's some I mean I don't know if that's apocryphal but it's there's some correlation between like slower pages equals.

372
00:56:36,000 --> 00:56:41,000
So it's less sales yes.

373
00:56:50,000 --> 00:56:53,000
Yes I've never met anybody says yeah my career is slower yeah great.

374
00:56:54,000 --> 00:57:03,000
Now if certainly there's a there's a cost element to it right you can pay you know millions of millions of dollars to get that micro set you know some microsecond or some millisecond latency.

375
00:57:04,000 --> 00:57:07,000
Most of you don't need that where the right tradeoff it depends but like.

376
00:57:12,000 --> 00:57:14,000
I've already went benefit from this I think.

377
00:57:15,000 --> 00:57:29,000
Okay so terms of the performance can you get from these different queries again so you have the three different phases the bytecode version the unoptimized LBM and the optimized LBM and again you can see how.

378
00:57:30,000 --> 00:57:40,000
This is log scale but you know there's a pretty big jump between the the the bytecode version and the simple LBM pass one.

379
00:57:41,000 --> 00:57:59,000
And then depending on the complexity of the query the gap between the you know 0 and 0 to between the diversion will be slightly different right again scale factor one this one that all the query running a single thread for the queries right so you can use the other the other threads to compile do the compilation stuff right.

380
00:58:00,000 --> 00:58:05,000
Again but it's not just about performance is also the debug ability and that maintenance of the system.

381
00:58:05,000 --> 00:58:34,000
All right so I want to do a quick like sort of quick run through a bunch of different systems that are doing different variations of code compilation query generate code generation of query compilation and I sort of broken up losing to four categories this is not scientific definitions is just what I think an easy way to categorize and understand things so the translation would be source of source stuff we talked about beginning with IQ the custom one will be although actually hyper should be over here.

382
00:58:35,000 --> 00:58:37,000
So I think that's the problem with the system.

383
00:58:37,000 --> 00:58:45,000
And then you know there's a lot of different systems that are doing different things sometimes they're using LBM sometimes they're not.

384
00:58:46,000 --> 00:58:56,000
Or CLR if it's in if it's a Microsoft stuff then there's a bunch of Java databases that are doing just a time compilation of JPM and then here's all the ones that are using LBM.

385
00:58:56,000 --> 00:59:02,000
So we've killed to CMU not proud of what happened.

386
00:59:03,000 --> 00:59:13,000
So the very first system that did code code specialization was one of the first relational database systems and as oftentimes in databases IBM did it first.

387
00:59:14,000 --> 00:59:25,000
So the very first relational database well the first major relational system they were building there was a precursor to system R out of the UK called Peter Peter Lee relational test vehicle.

388
00:59:26,000 --> 00:59:33,000
So it sounds like a prog rock band but that was like a prototype and the bunch of people that built that one then went to go build system R the system R was the first real one.

389
00:59:34,000 --> 00:59:44,000
So back in the 70s they they had an early implementation of code specialization or code generation for for running queries.

390
00:59:45,000 --> 00:59:50,000
Again think of like the 1970s the harder was terrible right the CPUs were slow disk was slow everything was terrible.

391
00:59:50,000 --> 00:59:57,000
So if you had it in a trouble the query plan on this really slow single threaded CPU that would just you know it would take forever.

392
00:59:58,000 --> 01:00:13,000
So what they would do is they would have after the query came out of the optimizer they would then co gen IBM system 370 assembly and have then the summer put that together and run that as for the query plan right.

393
01:00:13,000 --> 01:00:17,000
Sort of putting out a bunch of code templates to you know do you scan the new joins us over yes.

394
01:00:18,000 --> 01:00:20,000
What was the coaching course maybe I'm not sure.

395
01:00:21,000 --> 01:00:23,000
This is the 70s I have no idea right.

396
01:00:24,000 --> 01:00:26,000
It's quite a statement is it must have been high then.

397
01:00:29,000 --> 01:00:39,000
Yes except like they well the the function calls were always expensive because the CPU sucked it was the end most of the engineering reason was why they abandoned us.

398
01:00:39,000 --> 01:00:45,000
So they built us a system are again the way they my system are was a groundbreaking project.

399
01:00:46,000 --> 01:00:54,000
Ingress was being built at percolate same time oracle came a little bit later in the 70s but in system are they got a bunch of like eight people that all just brand new PhDs and like mathematics and CS.

400
01:00:55,000 --> 01:01:02,000
They took Ted Cos paper and then try to actually build it so they had one person you know one woman built the query optimizer the first like cost based query optimizer.

401
01:01:02,000 --> 01:01:08,000
Two other people went off and built you know design sequel and like one dude built nothing but this this co generation step right.

402
01:01:09,000 --> 01:01:21,000
And so when they when they when the system are project ended they did take some bits and pieces out of the code base and put it into the two commercial relational data systems that IBM was building.

403
01:01:22,000 --> 01:01:26,000
Sequel DS and DB two but one thing they didn't carry over and it is co gen stuff right.

404
01:01:27,000 --> 01:01:35,000
And in this there's a spread perspective paper from I think came out in 81 so at that point system are was eight or nine years old.

405
01:01:36,000 --> 01:01:47,000
And they talk about how they they decided to then do this this co generation stuff in the early version of system are but the problem was every time since it was a brand new system everything was always in flux.

406
01:01:47,000 --> 01:01:54,000
Anytime like an API change in one part of the system then you then that would break the co generation step and you had to go then rewrite all of that.

407
01:01:55,000 --> 01:02:04,000
So it just came came too much of an engineering overhead to just change this thing over and over again plus then you have to have to deal with like engineers when it when a query plan failed because of some bug in the co generation code.

408
01:02:05,000 --> 01:02:11,000
You had no way easy way to link that back to what was the this all assembly what was the assembly code that that generated that.

409
01:02:12,000 --> 01:02:16,000
So again when they built when they when IBM went off built the new systems they threw that away.

410
01:02:17,000 --> 01:02:18,000
Why did I know it was a joke?

411
01:02:19,000 --> 01:02:24,000
You couldn't say it is why did not that not deter the Germans because they wrote their debugger get better in a second.

412
01:02:25,000 --> 01:02:26,000
Yes.

413
01:02:27,000 --> 01:02:30,000
So one inspired into one.

414
01:02:31,000 --> 01:02:41,000
The understanding paper was that most of the advantages come with old afteries where the disc overhead is less important more so the bottleneck is put into use.

415
01:02:42,000 --> 01:02:47,000
So like what what the rest of I guess to say like a really need very compilation now in the 70s.

416
01:02:48,000 --> 01:02:58,000
Well first of all like there were no other relational systems built at the time. This is not like you know there was any you could look at oh they did this way we'll just follow that they were literally inventing this right.

417
01:02:59,000 --> 01:03:08,000
And again you're all usually like cell phones and like everything being super fast this was terrible in the 70s right like your cell phone is like you know hundreds of times more powerful than what they had back in the day.

418
01:03:09,000 --> 01:03:16,000
So that everything super super slow if you then have to do literally like look up say okay like you know interpret the query plan look at the types and switch something.

419
01:03:17,000 --> 01:03:22,000
The queries run forever so they're kind of like trying to make do with with the hardware that they had at the time.

420
01:03:23,000 --> 01:03:26,000
So I think it's a perfect pause what approach whether they did this.

421
01:03:27,000 --> 01:03:29,000
It's just again it's hard to maintain.

422
01:03:30,000 --> 01:03:31,000
All right.

423
01:03:32,000 --> 01:03:40,000
Vector wise we keep mentions over the game but I want to bring this up so again what they're going to do is they're not going to compile queries or primitives on the fly.

424
01:03:41,000 --> 01:03:51,000
Sorry they're not going to be could you mention the fly instead they're going to pre generate all possible combinations of anything you would want to do on data and query plans for any possible data type ahead of time.

425
01:03:52,000 --> 01:03:54,000
So like hundreds of integral.

426
01:03:55,000 --> 01:04:05,000
Integral functions to do things like for a vector of integer in 32 integers you know here's the less the inversion here's the greater than version is the greater than equal to version they're going to pre generate.

427
01:04:06,000 --> 01:04:15,000
I think you know using a bunch of scripts all these functions and then they compile all that when and then we should the binary and then your data system binary just has them all in there right.

428
01:04:16,000 --> 01:04:27,000
And then at runtime your query shows up you look at the query plan you know okay well it's a 32 column running against a less than some constant here's the go here's the pre compile primitive that I want to use for that.

429
01:04:28,000 --> 01:04:33,000
And then you just basically make now an array of function pointers to generate the pipelines for the queries.

430
01:04:34,000 --> 01:04:44,000
And as I said before jumps to functions are bad for modern CPUs but if you're passing on these batches or vectors of tuples then that function call jump cost is is amortized.

431
01:04:45,000 --> 01:04:55,000
So basically it looks like that so say you have some query like this and then you have a simple filter you have a string column equals ABC and it comes equals four.

432
01:04:56,000 --> 01:05:12,000
So then you would literally have a some kind of pseudo code thing like this that is in your source code that you then compile and you would have one for the string one for the integer and then at runtime and run time you're literally calling these one after another passing the vectors along.

433
01:05:13,000 --> 01:05:34,000
And then you can maintain you know the offset vectors of like here's the tuples that actually match now you wouldn't allocate the memory inside the function like I'm doing here but like you would pass us along and keep track of like okay what tuples actually match and then you all the Cindy stuff we talked about before deciding whether you want to keep processing we're filling or make changes.

434
01:05:34,000 --> 01:05:41,000
I don't think they shifted in the commercial version but there's a paper like my setting it see.

435
01:05:42,000 --> 01:06:03,000
Yeah this micro identity paper they have a paper where they they would take all their primitives and run all different possible compilers on them ICC GCC client with a bunch of different parameters on them and then at runtime they would run basically like an optimization program to figure out like which one is going to perform the best for you know for some you know for the CPU that I'm going to do.

436
01:06:04,000 --> 01:06:14,000
So they could switch out what implementation or what machine code implementation or comp compiled version of the primitive at runtime but again I don't think that ever went to the commercial version.

437
01:06:16,000 --> 01:06:25,000
So redshift is going to do the high coup approach of query compilation I think actually the Amazon been hired the the high coup guy from Edinburgh I think it was there for a while.

438
01:06:25,000 --> 01:06:52,000
So what they're going to do they're going to convert query plan fragments into template C++ code and then we push base execution with the characterization and then since the compilation cost of like for KCC is so expensive they're going to cash everything and not only are going to cash for whatever your database is for all your queries they're going to maintain this giant global cash for any query that anyone's ever ran on any database running on redshift.

439
01:06:53,000 --> 01:07:13,000
So this is amazing because this is a completely different way to think about how did you query optimization or cogeneration right in the case of hyper and and post-custom all the other systems like they're starting cold every single time they you know it's like you turn the system on start putting data in it and start running queries it has to you know warm up its own local cash to figure out how to cogen that compile and so forth.

440
01:07:14,000 --> 01:07:16,000
So amalanbasing says well.

441
01:07:17,000 --> 01:07:32,000
Instead of us cogening with all these previous ahead of time let's just take queries as they show up generate the the simple scope for them cash that then as new query show up we see whether we have an existing compiled version of that plan fragment for that query.

442
01:07:32,000 --> 01:07:53,000
And then we just use that so that and then the paper they say the hit rate for the global cash every single fresh update is in all Amazon is like 99.95% so no matter what query shows up you know 99.95% of the fragments are going to be in the global cash for your local cash the hit rate is like 85% but then you can go fetch things from from the global cash.

443
01:07:53,000 --> 01:07:54,000
Right and again is in the you know in the cloud is a completely different way of thinking about how to optimize things because you can see everything and you can share information across different customers now when you think about it the the the the the code they're generating doesn't have any proprietary information where you could leak things from one customer the next right again going back to the primary stuff in vector wise it's a you know you have a common integers you want to do less than on some constant it doesn't have a

444
01:08:23,000 --> 01:08:52,000
matter whether it's your database has like banking information on my database that has I don't know blog blog application at the end of the day it's just ripping over in integer or injure columns with the constants so there's no issues reusing those those cash those cash compared to plants right they do a little lecture work with every time the version of the system changes similar to the problem that that system are had where they have to maintain compatibility but in the cases where it breaks the compatibility they just have a background service that they're going to be able to do that.

445
01:08:53,000 --> 01:09:03,000
They just pre-worm the cash they have all the people let's go they generate it before and then when the new version comes out see whether breaks and if not the recompile to the new version just fix it automatically.

446
01:09:03,000 --> 01:09:04,000
Right yes.

447
01:09:04,000 --> 01:09:13,000
Is question is is fetching it from the global cash faster than compiling yourself.

448
01:09:13,000 --> 01:09:15,000
Yes, it never call.

449
01:09:15,000 --> 01:09:19,000
It's way faster than then you know run a user gcc.

450
01:09:19,000 --> 01:09:21,000
Right.

451
01:09:21,000 --> 01:09:30,000
And again you get the same benefit like now when things crash you can go you have to let's go and you can you can bug that.

452
01:09:30,000 --> 01:09:36,000
All right so or call as far as I know does not do any query compilation or predicate compilation.

453
01:09:36,000 --> 01:10:05,000
I bring them up because they do something interesting as I said where they'll take store procedures that are written in PL SQL which is like PLPG SQL it's like the it looks like data it's the it's the SQL standard how you write UDS will cover UDS later this master but they take those PL SQL UDS or serve procedures and they they transpile them into pro star C which is their internal version of C and then they go ahead and compile that native code and because the the C dialect is restricted.

454
01:10:05,000 --> 01:10:14,000
You're not worried about them like jumping to some arbitrary locations and memory and trash in the database system you can run this as a shared object directly.

455
01:10:14,000 --> 01:10:31,000
We're not going to talk about new hardware but back in the day in the previous decade after Oracle bought some microsystems some was shipping the spark CPUs which I don't think exists anymore but they started putting like database data based operations inside the silicon itself like for compression and security and others like that.

456
01:10:31,000 --> 01:10:37,000
So like this is even better than code generation right this is literally there's an instruction that does exactly what you're doing does.

457
01:10:37,000 --> 01:10:43,000
But it was only for Oracle stuff but again they don't sell that anymore.

458
01:10:43,000 --> 01:10:59,000
So hackathon is not a OVAP system it's a transactional engine but this is what they were doing they were compiling both store procedures and SQL and they compile it using I mean into C code which they would then link into with the CLR which.

459
01:10:59,000 --> 01:11:14,000
Yeah Microsoft version of like the JVM and as I said before like in this case here they do have a lot of checks to make sure that somebody doesn't try to do like buffer over a flow stuff in the SQL that's generated.

460
01:11:14,000 --> 01:11:28,000
I don't know if a father systems actually do this or not but what was cool about the last two is as I said the since everything is just linked as a shared object you can have the the generated code and folk other parts of the system.

461
01:11:28,000 --> 01:11:45,000
So in the case of where where you think a hackathon is like a like a storage engine for SQL server so the same way like my SQL you can put in rocks DB you can put in a DB hackathon was like something you could put into SQL server so then the generated code can then talk talk to other parts of of SQL server that maybe weren't the running in hackathon.

462
01:11:45,000 --> 01:11:49,000
And again you can do this because everything everything's linked together.

463
01:11:50,000 --> 01:11:56,000
All right so SQL light is the most widely deployed database system in the world and this we don't know this but they're doing some variation of code generation.

464
01:11:56,000 --> 01:12:05,000
So they're going to convert your query plan into this these op codes for this virtual machine that they design or the one guy designed.

465
01:12:05,000 --> 01:12:13,000
And then at runtime again they're just going to literally a turp it that the VM is going to interpret this by op codes as if it was like the JVM right.

466
01:12:13,000 --> 01:12:30,000
So if you ever use SQL light if you run explain you don't get the you don't get a query plan tree like you wouldn't normally in any other data system you get this you know this this this this this list of the op codes and instructions with nice little comments and tell you what is actually doing.

467
01:12:30,000 --> 01:12:37,000
If you have to get you have to get the actual query plan tree itself you have to get called explain plan and then the SQL statement.

468
01:12:38,000 --> 01:12:50,000
So the reason why they he did this is because they want to run on any possible hardware right embedded devices cell phones you know laptops any any kind of ISA.

469
01:12:50,000 --> 01:13:05,000
They're certified to run on airplanes your airplanes actually is running SQL light the satellites of space running SQL light and so when you want to port the data system to a new new platformer a new environment instead of having to modify all other parts of the system.

470
01:13:05,000 --> 01:13:15,000
You just have to modify the VM and he has test cases to make sure that this actually works so you don't care about what actually generate the op codes that's always going to be the same from one architecture the next.

471
01:13:15,000 --> 01:13:29,000
I mean there's files some stuff you have to deal with and so forth but the it's vanilla superlips code that actually maybe see yes it's vanilla C code is not doing a lot of specialized stuff all specialized stuff would be in in the VM here.

472
01:13:29,000 --> 01:13:42,000
We asked them once to also like could you actually could you build like an FBGA to actually interpret these op codes and he says it changes from one version of the next so probably wouldn't work.

473
01:13:42,000 --> 01:14:00,000
Okay so the hyper was the earlier version that of a system that the Germans built after got bought by Tableau the tableau in the source goes that went away so then Thomas was started building a new system called umbra we'll talk a little about about that again throughout the semester.

474
01:14:00,000 --> 01:14:29,000
But what's amazing about umbra is that rather than then generate the IR the element IR the way that they did in hyper he's instead going to generate an IR that then gets converted into assembly directly so it's much of these see the social macro is going to take the IR generate X80 sqc assembly I think he supports arm as well right and then now you have this assembly you can then run instead of the bicoot interpreter or by cooking a pilot you just run an assembler which is even faster.

475
01:14:29,000 --> 01:14:49,000
Because it's literally translating the assembly instructions into into machine code without any additional optimization passes so then they do the same thing we talked about before where they take the you know they run the query on the similar version then in the background they do the more extensive compilation and then when things are available they they slide it right in.

476
01:14:49,000 --> 01:15:18,000
So they have a follow up work called a number called flying start it came out two years ago I debated whether to read this paper versus the paper you guys read before the paper guys were for it's the seminal one but you know it's it's a bit dated now and this is probably the better way to do this or is the better way to use if you're going to go down this path but another way to think about this is like they basically built the wrong compiler in the database system as well as the data system itself right who does that.

477
01:15:19,000 --> 01:15:48,000
Germans are insane right then as I was saying before you still have the problem where if a query crashes you are living in assembly world where you don't have any problem on what generate that code so then they wrote their own debugger hooks for our are they hold on paper on this that it's explicitly designed for taking crash query plans or trying to bug query plan that are generated using this code generation technique and linking it back and walking through the the query what's running and she's going to do that.

478
01:15:49,000 --> 01:16:03,000
So I'm showing it back same time like here's the code lines that generated right so the papers call it on another level which I think I said to them I was like this another level and they put it as the title of the paper right.

479
01:16:03,000 --> 01:16:08,000
I can share this look there's a video they should be it's insane right.

480
01:16:08,000 --> 01:16:23,000
So in redshift doesn't do you have to do any of this because they have the giant query cache of every possible query plan before in the in the single node approach you don't have that and then this is probably the better way to do this.

481
01:16:23,000 --> 01:16:40,000
So I'm going to talk about Java databases because it's very much similar to the LLAM so we talked before it's at a high level student the same thing but instead of generating LLAM IR you're generating JVM bytecode and then you let the JVM hotspot compiler whatever's called now to compile that machine code if it's decided to.

482
01:16:40,000 --> 01:17:07,000
The one I want to bring up the two one was sparking quest DB and so the reason I'm going to bring up the spark one is because as I said they're going to abandon any co-generating query compilation stuff in the newer version photon and but this is a precursor to do this and then the paper you guys read they'll talk about how the things I was saying where if you're doing co-generation you have to have people that really know compilers and know like low level assembly and and bytecode stuff in order to optimize things where if you just.

483
01:17:07,000 --> 01:17:28,000
If you just build a vectorized engine in C++ there's a larger number of people that actually can work on those things and they found that even though this may actually run faster in the short run in the long term you would have more people try to optimize your you know the vector wise code that you have and you end up getting better results and better maintain a voting system.

484
01:17:29,000 --> 01:17:47,000
So what they would do in in in in 2015 they introduced this new tungsten engine where they would convert the wear clause expression trees into abstract syntax trees written in scholar and then they would just hand that off to the JVM JVM then convert that in the bytecode and then invoke it as a function and do that natively.

485
01:17:47,000 --> 01:18:02,000
Well see also to in the paper you guys read they'll talk about how in some cases really complex queries this AST would get massive and the JVM would choke on and say this is too big I can't I can't run this query or I can't compile it for you and then the fallback the attributed engine and if you switch over to.

486
01:18:03,000 --> 01:18:07,000
You hit over to a you know vector wise approach you don't have this problem.

487
01:18:08,000 --> 01:18:26,000
Another job of base database that does cogeneration is the single quest DB and so it's a time series column or database out of the UK it actually this is actually written by former HFT guys who you know I'm not going to optimize Java code and it's set about a database system.

488
01:18:27,000 --> 01:18:34,000
So what happens is the query shows up they just compile the ware clauses but they're going to generate an IR in Java code.

489
01:18:35,000 --> 01:18:54,000
That use asmgit which is think like it's like a light way version of the L of the M then compile that to machine code and run that and so this is from a blog or the wrote where they show two optimizations that they may they converted it to be multi threaded from single threaded and go from from a jet system to a non jet system.

490
01:18:54,000 --> 01:19:15,000
So the original version was single threaded with no jet and for some query here it takes 30 30 seconds but then if you do jitting you you shave off about 10 acts you get it down to 3.5 acts but then if you turn on multi threading and no jet you actually do even better than with the jet but then the combination the two of them you know you you you get the best result.

491
01:19:15,000 --> 01:19:34,000
For me this is curious that like the first thing they did was you know they they they built the jet part first right so this so the jet came first then they did multi threaded a year later and to me that seems surprising because the first thing I would do is obviously build parallel queries.

492
01:19:34,000 --> 01:19:46,000
I don't know why they did that was the case but in my opinion you should do multi threading first and then you want to do jet do do two two seconds and then because this result clearly shows the difference and combination to them can make a difference.

493
01:19:47,000 --> 01:19:53,000
All right we're way over time let me see if there's anything else I want to quickly show.

494
01:19:53,000 --> 01:20:19,000
Yeah maybe we're cut off here and we can pick up a little bit of this on the class because I want to we want to talk about the project as well but I didn't get to the single store I'll bring this up next class but the single store approach is the better way to do you do a compilation it basically it's like it's like the.

495
01:20:19,000 --> 01:20:40,000
It's like the hyper approach where you with the with this interpreter then you can compile it and then you have an additional meter step that that allows programmers to work through and figure out what's going on there's a failure and then the flying start one is amazing but you need to be German to actually build that kind of stuff and nobody else does what they're doing they're generating assembly the same.

496
01:20:40,000 --> 01:20:50,000
All the newer systems though are going to for the most part going to choose to do a vectorized style approach again for the reasons we'll see in the photon paper from Databricks okay.

497
01:20:51,000 --> 01:21:09,000
All right so next class would do query test scheduling maybe I'll cover some more some of the compilation stuff that we missed and then the paper you guys reading is from the Germans again this would be morsels even though it's going to be on a single node the idea of how you break up the query plant tasks into these morsels based on the data that's going to be.

498
01:21:10,000 --> 01:21:12,000
The key idea we want to build in our system.

499
01:21:40,000 --> 01:21:57,939
The

500
01:21:57,979 --> 01:21:59,939
number one

501
01:22:02,039 --> 01:22:05,039
zero

