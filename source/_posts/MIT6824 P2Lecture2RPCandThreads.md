---
title: MIT6824 P2Lecture2RPCandThreads
---

1
00:00:00,000 --> 00:00:07,000
Okay, so the topic for today is threats and RPC,

2
00:00:07,000 --> 00:00:11,000
sort of second lecture in 1624.

3
00:00:11,000 --> 00:00:15,000
And we're going to mostly look at threats and RPC in the context of GO,

4
00:00:15,000 --> 00:00:18,000
the programming language that we're using in the labs.

5
00:00:18,000 --> 00:00:22,000
And in fact, most of this lecture is really tailored to work,

6
00:00:22,000 --> 00:00:27,000
helping you do GO programming for the labs.

7
00:00:28,000 --> 00:00:33,000
So all you've done hopefully the tutorial and the crawler exercise,

8
00:00:33,000 --> 00:00:37,000
which we'll discuss in quite a bit of detail later in the lecture.

9
00:00:37,000 --> 00:00:45,000
But before jumping into the details, let me do a little bit more of cold calling to break the ice and let get people to ask questions.

10
00:00:45,000 --> 00:00:50,000
So maybe you can answer the question, you know, where are you and how do you enjoy the tutorial?

11
00:00:50,000 --> 00:00:53,000
What is your first impression of GO?

12
00:00:54,000 --> 00:00:59,000
Maybe all how about even Zeldin?

13
00:00:59,000 --> 00:01:07,000
Hi folks, I'm Batman. I'm in Newton, which is on the outskirts of Greater Boston.

14
00:01:07,000 --> 00:01:13,000
Turtle was interesting. It was my first exposure to, you know, a non object oriented language.

15
00:01:13,000 --> 00:01:19,000
So it's kind of a change, a change in framework that was interesting to adapt to.

16
00:01:19,000 --> 00:01:22,000
How about Brendan?

17
00:01:28,000 --> 00:01:30,000
Brendan, are you there?

18
00:01:30,000 --> 00:01:32,000
Yeah, sorry, I was just finding the mute buttons.

19
00:01:32,000 --> 00:01:34,000
Sorry, what was the question I just joined?

20
00:01:34,000 --> 00:01:37,000
Oh, where are you in there? What is your first impression of GO?

21
00:01:37,000 --> 00:01:41,000
Yeah, it's, I had used GO before for an internship,

22
00:01:41,000 --> 00:01:44,000
but it was my first time actually dealing with the concurrency stuff.

23
00:01:44,000 --> 00:01:46,000
I was like really working with GO routines.

24
00:01:46,000 --> 00:01:50,000
So kind of initially it was like tricky to think through like,

25
00:01:50,000 --> 00:01:54,000
like as soon as the main thread ends, all the GO routines are ended.

26
00:01:54,000 --> 00:01:57,000
So kind of working through those early kind of conceptual issues,

27
00:01:57,000 --> 00:02:00,000
but it's interesting to kind of think through.

28
00:02:00,000 --> 00:02:03,000
How about the Connor crispy?

29
00:02:03,000 --> 00:02:13,000
Connor, are you there?

30
00:02:13,000 --> 00:02:19,000
Yeah, try somebody else.

31
00:02:19,000 --> 00:02:27,000
Dory Shen.

32
00:02:27,000 --> 00:02:33,000
Hi, I'm in Cambridge right now, and I found GO to be really pretty interesting.

33
00:02:33,000 --> 00:02:36,000
I thought through like the first part of the tutorial,

34
00:02:36,000 --> 00:02:39,000
I like learning about the four loops and the ways they do for loops.

35
00:02:39,000 --> 00:02:43,000
I thought that was pretty interesting and like the way it's kind of structured.

36
00:02:43,000 --> 00:02:47,000
I think the, I like the threads.

37
00:02:47,000 --> 00:02:52,000
I found to be a little bit like more difficult about like when it ended and like when.

38
00:02:52,000 --> 00:02:57,000
Like sometimes like the function went and before all the routines like end is so that was like.

39
00:02:57,000 --> 00:03:00,000
Interesting to think about and like I learned more about that.

40
00:03:00,000 --> 00:03:02,000
So it's pretty cool. I liked it.

41
00:03:02,000 --> 00:03:07,000
Well, I hope all of you are going to have a very positive experience with GO.

42
00:03:07,000 --> 00:03:10,000
In the semester.

43
00:03:10,000 --> 00:03:15,000
And so let me say a little bit like, you know, why go.

44
00:03:15,000 --> 00:03:21,000
In principle, you know, there are a lot of programming languages that you could have used there for doing distributed programming and goes absolutely not the only one.

45
00:03:21,000 --> 00:03:26,000
But some reasons why we, why we chose go in a to four.

46
00:03:26,000 --> 00:03:30,000
You know, first of all, it has good support.

47
00:03:30,000 --> 00:03:35,000
For threats and our PC.

48
00:03:35,000 --> 00:03:38,000
And those two are very important for distributed programming.

49
00:03:38,000 --> 00:03:43,000
So it makes sense to, you know, and those is a good match for that.

50
00:03:43,000 --> 00:03:46,000
Second reason that we like it a lot is, you know, that has a garbage collector.

51
00:03:46,000 --> 00:03:53,000
And if you do shared memory style parallelism where multiple threats share a structure were variable.

52
00:03:53,000 --> 00:03:59,000
Then having a garb collector is nice because then the threats don't have to decide who's the last.

53
00:03:59,000 --> 00:04:07,000
A threat that actually has a reference to this memory and shoot therefore, dialocated the guards collector just takes care of all those problems.

54
00:04:07,000 --> 00:04:09,000
So that's convenient.

55
00:04:09,000 --> 00:04:14,000
It's tight safe.

56
00:04:14,000 --> 00:04:17,000
It is simple.

57
00:04:17,000 --> 00:04:20,000
It's a reasonable simple programming language quite easy to learn.

58
00:04:20,000 --> 00:04:25,000
And in fact, you know, that years, hopefully you got that experience with doing the go tutorial that they want you to go to tutorial.

59
00:04:25,000 --> 00:04:28,000
You mostly got most of go.

60
00:04:28,000 --> 00:04:31,000
And then finally, it actually has a compiler.

61
00:04:31,000 --> 00:04:33,000
So it's compiled.

62
00:04:33,000 --> 00:04:39,000
Like Python or, you know, actually, the combined producer is actually your code.

63
00:04:39,000 --> 00:04:43,000
And so the rent I'm overhead is not as large.

64
00:04:43,000 --> 00:04:49,000
I guess sort of the final reason why we are for eight to four is in the ego is actually I enjoy writing.

65
00:04:49,000 --> 00:04:55,000
Go programs. And so that may be also an important reason.

66
00:04:55,000 --> 00:05:00,000
So what I'm going to do is I'm going to talk a little bit about threats in general or a machine general.

67
00:05:00,000 --> 00:05:06,000
And you know, talk a little bit about different aspects of programming with threats.

68
00:05:06,000 --> 00:05:08,000
Some of that is pretty tutorial.

69
00:05:08,000 --> 00:05:12,000
So if you have seen this before, you know, my apologies.

70
00:05:12,000 --> 00:05:14,000
I'm going to go reasonable quickly through it.

71
00:05:14,000 --> 00:05:18,000
It's definitely not a comprehensive introduction to good programming.

72
00:05:18,000 --> 00:05:23,000
But just hopefully enough to remind you what the issues are and what you should look at for.

73
00:05:23,000 --> 00:05:27,000
And we'll hopefully spend some time quite a bit of time on the crawler.

74
00:05:27,000 --> 00:05:28,000
So sort of see the solution.

75
00:05:28,000 --> 00:05:31,000
I will share you the solution that are two solutions.

76
00:05:31,000 --> 00:05:34,000
One using channels and one's using new Texas.

77
00:05:34,000 --> 00:05:36,000
And I will go through both of them.

78
00:05:36,000 --> 00:05:45,000
Any questions so far before I dive in.

79
00:05:45,000 --> 00:05:50,000
Okay, let me get started with threats.

80
00:05:50,000 --> 00:05:59,000
So Fred is basically shorthand of the Fred of execution.

81
00:05:59,000 --> 00:06:17,000
And so the way to think about it is that like when you do go run, no, the go will create a process, you know, on your operating system.

82
00:06:17,000 --> 00:06:21,000
And in the site of a process is going to go runtime system.

83
00:06:21,000 --> 00:06:25,000
And when go start, it actually has one Fred of execution, the main Fred.

84
00:06:25,000 --> 00:06:28,000
And then you can do a primitive to create new threats.

85
00:06:28,000 --> 00:06:29,000
And so you can think about this.

86
00:06:29,000 --> 00:06:31,000
Those are many, many threats and execution.

87
00:06:31,000 --> 00:06:33,000
You know, running parallel.

88
00:06:33,000 --> 00:06:38,000
And you can think about a single Fred is basically sort of a sequential program running.

89
00:06:38,000 --> 00:06:43,000
So the program has a program counter has his own stack.

90
00:06:43,000 --> 00:06:48,000
It has his own set of registers.

91
00:06:48,000 --> 00:06:51,000
And so this is a page like a sequential program.

92
00:06:51,000 --> 00:06:55,000
And execute the structure one and execute two then structure three and four.

93
00:06:55,000 --> 00:06:58,000
And they make a procedure call, allocate memory on the stack.

94
00:06:58,000 --> 00:07:01,000
Return for own a procedure call, recursive call.

95
00:07:01,000 --> 00:07:04,000
Also if you're standing to the point where I tell you about programming.

96
00:07:04,000 --> 00:07:09,000
It's just like happens as a sequential Fred basically.

97
00:07:09,000 --> 00:07:16,000
The interesting thing is that, you know, the threads may actually share memory with other friends.

98
00:07:16,000 --> 00:07:23,000
So since all the threads are running in the same address space, the same operating system address space.

99
00:07:23,000 --> 00:07:25,000
Or the same process address space.

100
00:07:25,000 --> 00:07:27,000
They can actually share a memory.

101
00:07:27,000 --> 00:07:31,000
So one Fred can write through location, say, you know, 10.

102
00:07:31,000 --> 00:07:34,000
And then another Fred can actually read that location 10.

103
00:07:34,000 --> 00:07:39,000
And so that way they can actually communicate information.

104
00:07:39,000 --> 00:07:49,000
One way to think about Fred, two is to sort of think about it as sort of an abstraction, you know, supported by the runtime and the runtime as a number of operations on a threat.

105
00:07:49,000 --> 00:07:56,000
So one operation, you know, we've seen many times, if you've seen how many times is to actually start a threat, but create a threat.

106
00:07:56,000 --> 00:08:01,000
You know, this is the goal, synthet, you know, to go keyword.

107
00:08:01,000 --> 00:08:03,000
Fred can exit.

108
00:08:03,000 --> 00:08:12,000
And generally this just means the exit actions would be implicit like when the Fred returns from this.

109
00:08:12,000 --> 00:08:20,000
If you create a function using go the go keyword and you know, you return out of the function and implicitly the Fred X me exits.

110
00:08:20,000 --> 00:08:28,000
The go runtime also has a couple other sort of under the hoots operations, if you will, one, it can actually stop a threat.

111
00:08:28,000 --> 00:08:33,000
And so, you know, the Fred, the Fred writes to a channel and there's no reader on the channel yet.

112
00:08:33,000 --> 00:08:36,000
Then the Fred might get blocked.

113
00:08:36,000 --> 00:08:43,000
And so the go runtime sort of stops the Fred, you know, puts his site so that it connects with running other Fred on the processor.

114
00:08:43,000 --> 00:08:46,000
And then maybe later on resumes that Fred.

115
00:08:46,000 --> 00:08:51,000
So they're in sort of a third, you know, final primitive that actually is through zoom for us.

116
00:08:51,000 --> 00:08:57,000
And really what it means to stop and zoom a Fred is basically taking the state of the Fred like a program counter, the step corner in the red.

117
00:08:57,000 --> 00:09:02,000
So that's what it doesn't site run it other, you know, Fred on the processor.

118
00:09:02,000 --> 00:09:09,000
And then at some point, you know, decide to resume the processor, which means basically loading the program counter to step pointer and the register is back into the processor.

119
00:09:09,000 --> 00:09:20,000
So that's sort of a very mechanical few of the Fred is.

120
00:09:20,000 --> 00:09:28,000
And then we have for it's in the first place, that seems like an important point to discuss.

121
00:09:28,000 --> 00:09:34,000
But there's in some ways, and the only thing that Fred do is make your life more complicated as a programmer.

122
00:09:34,000 --> 00:09:38,000
Like writing to country code is actually just easier than writing parallel code.

123
00:09:38,000 --> 00:09:49,000
And the main reason to have it, and the main reason we care a lot about everything in six, eight, and four years through express and concurrency.

124
00:09:49,000 --> 00:09:55,000
And sort of three different, you know, sort of two, we're two or three different types of concurrency that we actually care about.

125
00:09:55,000 --> 00:10:01,000
So you think about our, you know, process, we got that runtime with our Fred's running.

126
00:10:01,000 --> 00:10:09,000
You know, one type of concurrency that we care a lot about is Ioc concurrency.

127
00:10:09,000 --> 00:10:17,000
One of these threads, you know, that is running here, you know, might actually make a network call connecting to some other machine on the network.

128
00:10:17,000 --> 00:10:21,000
You know, to implement a distributed application like that produce.

129
00:10:21,000 --> 00:10:26,000
And you know, as it makes that call, you know, it's going to be blocked, you know, waiting for response.

130
00:10:26,000 --> 00:10:32,000
And while it's blocked and they're waiting for response, every new nice to actually run some other threats.

131
00:10:32,000 --> 00:10:38,000
But we're not, we're not, we're not, we want to issue multiple requests to multiple machines.

132
00:10:38,000 --> 00:10:49,000
Sort of roughly parallel, you know, we could just do that with fire rock long go routine and fire not the code team, not a go routine that all kind of sent and make connections to other remote machines.

133
00:10:49,000 --> 00:10:51,000
That's one reason I'll be care a lot about it.

134
00:10:51,000 --> 00:11:03,000
Ioc concurrency. The second reason I would care about it is, you know, allow for multi core parallelism.

135
00:11:03,000 --> 00:11:09,000
So we have multiple course in our, you know, computer or processor.

136
00:11:09,000 --> 00:11:17,000
Then we can have one threat running on the one go routine running on one core and another Fred or another go routine running on another core.

137
00:11:17,000 --> 00:11:20,000
And then we can start with the straightening parallel.

138
00:11:20,000 --> 00:11:27,000
And as an example, we implement a like a key value service, then we could process, maybe request for different keys in the key value service.

139
00:11:27,000 --> 00:11:32,000
We use on different course completely parallel, you know, increasing our throughput.

140
00:11:32,000 --> 00:11:38,000
So those are the sort of two main reasons that we care a lot about concurrency by threats.

141
00:11:38,000 --> 00:11:44,000
So we have a little bit of convenience.

142
00:11:44,000 --> 00:11:53,000
There's going to be a number of cases in the lab, for example, where we want to have something happen periodically, maybe every second or every two and a milliseconds.

143
00:11:53,000 --> 00:11:56,000
And we can just launch a threat that are going to routine for that.

144
00:11:56,000 --> 00:12:01,000
You just sleep for two and a milliseconds. You know, does what it needs to do. And then it goes back to sleep for two and a milliseconds.

145
00:12:01,000 --> 00:12:13,000
And so it's convenient to sort of have these sort of background activities that we can be done periodically and you can express that using threats. Of course, you can express them in other ways, but threats are actually convenient.

146
00:12:13,000 --> 00:12:20,000
And all the question that comes up often and I think came up in some of the lecture questions today, like how many threats you create.

147
00:12:20,000 --> 00:12:26,000
And I think the go design us the way they want you to think about it is that you should create as many threats as you need.

148
00:12:26,000 --> 00:12:31,000
They're definitely not free when they tie up some memory, because we have to have a stack.

149
00:12:31,000 --> 00:12:37,000
There's a performance overhead starting them, but they should think about them as very lightweight.

150
00:12:37,000 --> 00:12:44,000
And so you should be encouraging or your encourage to create the threats as you go.

151
00:12:44,000 --> 00:12:55,000
And the questions about sort of this basic reason would like to have threats.

152
00:12:55,000 --> 00:13:03,000
Okay, let me then, you know, as I mentioned earlier, threats actually have challenges.

153
00:13:03,000 --> 00:13:08,000
Programming with threats as challenges. So let me talk a little bit about the challenges.

154
00:13:08,000 --> 00:13:17,000
I'm not going to go in great amount of depth here. I assume that you know, there's a thing that will make sense and that will become more clear if we look at some of the examples.

155
00:13:17,000 --> 00:13:31,000
And probably the main reason that you know, for that section, you are challenging is that you can have race conditions.

156
00:13:31,000 --> 00:13:40,000
And just like a basic example of race condition, let's say you have two threats, you know, your T1, used to you.

157
00:13:40,000 --> 00:13:46,000
And they share a variable and let's say the initial value zero.

158
00:13:46,000 --> 00:13:53,000
And they both execute, you know, both threats, executed statement before, you know, as, you know, the increment end by one.

159
00:13:53,000 --> 00:13:58,000
Of course, you might think that statement is an atomic operation or something that is indivisible, but it isn't.

160
00:13:58,000 --> 00:14:04,000
Right. You know, the growth statement that is compiled, you know, to whatever instructions the process is executing.

161
00:14:04,000 --> 00:14:19,000
And so we cannot assume that it's an atomic instruction. And in fact, you know, it's, it consists of basically like a load, you know, to which store is the end, the content of ending to a register, then increment the register and then we're stored a registry back into memory.

162
00:14:19,000 --> 00:14:34,000
And so if you're very unlucky, you know, the two threats basically try to anchor both execute this pickle instruction, then we can have a very important sequence of events where like both threats, you know, form the load instruction.

163
00:14:34,000 --> 00:14:42,000
You know, the variable in, you know, the register, let's say, R0, you know, you're also an R0.

164
00:14:42,000 --> 00:14:47,000
Now, the increment it's our hero becomes one.

165
00:14:47,000 --> 00:14:57,000
One and then write it back now to the store instruction that actually results, you know, stores results back into the variable memory.

166
00:14:57,000 --> 00:15:11,000
And so it just happens at this particular in this scenario where this happens to look truly concurrently. Now, what does the value end after these two threat that open increment?

167
00:15:11,000 --> 00:15:22,000
Which is one. Yeah, it's one. And what is the, what is the value supposed to be or what we expected to be?

168
00:15:22,000 --> 00:15:29,000
Two. Yeah, expected to be two, right? And so one is definitely not equal to two. And there's a bar.

169
00:15:29,000 --> 00:15:44,000
And so, and this is like, you know, the sort of the heart of race conditions, which is not, you know, if an unsports an unfortunate sequence of events where threats share state, the updates actually might not be reflective correctly.

170
00:15:44,000 --> 00:15:53,000
And of course, most of the time this will work out fine because you have to be in this sort of very sort of this very specific case before it shows up.

171
00:15:53,000 --> 00:16:10,000
So, for example, I think one one of you reported like, I didn't have my locks or my race, you know, my, my, my locks in order in my program just work fine. And not as actually the issue with race conditions that typically just work fine, but sometimes it goes wrong.

172
00:16:10,000 --> 00:16:14,000
So the two ways to address race conditions.

173
00:16:14,000 --> 00:16:18,000
And the first way is to avoid sharing.

174
00:16:18,000 --> 00:16:21,000
Don't share variables.

175
00:16:21,000 --> 00:16:29,000
And this is one style programming that, you know, go encourages about using channels, you know, channels, you just communicate the values, but you don't really direct and share memory.

176
00:16:29,000 --> 00:16:39,000
So that's one way you're doing it. No, no, so avoid sharing is one big approach. The other approach is actually to use locks.

177
00:16:39,000 --> 00:16:46,000
And then you can do making the making sequence of instructions in the atomic operation. And we'll talk a lot more about that in a second.

178
00:16:46,000 --> 00:16:53,000
One of the things that I want to point out that is really cool about what the usual tool is go actually have a race detector.

179
00:16:53,000 --> 00:17:08,000
And most of the labs that you were doing will encourage you to basically run go using the dash race flag. And that will actually not catch every possible race, but it definitely extremely good job of actually indentifying the races.

180
00:17:08,000 --> 00:17:13,000
So you should, but default run go with the race detector enabled.

181
00:17:13,000 --> 00:17:20,000
Okay, so that's one challenge for threats. The second challenge for threats is actually coordination.

182
00:17:20,000 --> 00:17:27,000
So it's often the case that one has to, you know, one fret must wait on another fret for something is accomplished.

183
00:17:27,000 --> 00:17:38,000
And there's a number of the go exercises in the tutorial and I had that kind of for and there's two ways, you know, go actually two primitives for dealing with that one again channels.

184
00:17:38,000 --> 00:17:54,000
You know, channels basically allow you to communicate and to coordinate at the same time, or, you know, talk a little bit later about, you know, condition variables.

185
00:17:54,000 --> 00:18:00,000
And both can be useful. I'll talk a little bit more about that. And then finally, sort of final challenge.

186
00:18:00,000 --> 00:18:06,000
Big sort of conceptual channel is you can get that lock.

187
00:18:06,000 --> 00:18:17,000
So they've one friend waits in like T1 ways on T2 and T2 waits in T1, you know, before example, release a lock before some other sequencing you can basically sort of what they call death being race.

188
00:18:17,000 --> 00:18:23,000
And then you can get a number of things that you can do for both or reading in the other and as well nothing makes for progress.

189
00:18:23,000 --> 00:18:32,000
Attribute your way of getting, you know, say, that lock in ago would be like you have a single fret. No other threads at all.

190
00:18:32,000 --> 00:18:36,000
And you're right to channel.

191
00:18:36,000 --> 00:18:41,000
And that will block that one thread until somebody else, you know, reach some other friends reach from the channel.

192
00:18:41,000 --> 00:18:45,000
And then you know, you know, you know, you can get a number of other friends at all, you know, that will be all in a death lock.

193
00:18:45,000 --> 00:18:49,000
This is like the simplest possible, that lock possible.

194
00:18:49,000 --> 00:18:57,000
And you know, go actually will catch this case and will run a reason run, I may are saying like no frets can run, you know, you have a deadlock.

195
00:18:57,000 --> 00:19:01,000
But there could be more complicated that watching, we're involved in multiple frets.

196
00:19:01,000 --> 00:19:08,000
As you're going through the labs and dismissal you, I'm sure you were running to some.

197
00:19:08,000 --> 00:19:18,000
I'm a little bit of a step back here and think about, you know, go for, you know, these challenges.

198
00:19:18,000 --> 00:19:20,000
That I just talked about.

199
00:19:20,000 --> 00:19:29,000
Roughly speaking, go as sort of two plans to handle these concurrency challenges.

200
00:19:29,000 --> 00:19:35,000
And one plan is, you know, these we around channels.

201
00:19:35,000 --> 00:19:40,000
And there's another plan, they just we around locks.

202
00:19:40,000 --> 00:19:50,000
In condition variables.

203
00:19:50,000 --> 00:20:00,000
And the way I think about it, you know, so people are quite dogmatic about this and think one plans better than the other plan.

204
00:20:00,000 --> 00:20:05,000
And the general approach here is like I do want to plan that it's most suitable for the case that I'm looking at.

205
00:20:05,000 --> 00:20:11,000
Or that I'm running into and generally, you know, I've no sharing.

206
00:20:11,000 --> 00:20:16,000
And basically I need two threats that basically to communicate, but I don't really share any memory.

207
00:20:16,000 --> 00:20:19,000
I tend to use the channels.

208
00:20:19,000 --> 00:20:27,000
And there are two threats that can do share memory because it's convenient to share memory, for example, I write a key value servers and I want to share the key value table.

209
00:20:27,000 --> 00:20:39,000
Then I use locks and condition variables.

210
00:20:39,000 --> 00:20:49,000
And you know, my general approach is not so the media medic and you know, take whatever approach, you know, that actually is most convenient for the problem at hand.

211
00:20:49,000 --> 00:20:58,000
The tutorial just pretty good job of actually teaching me about channels, mentioned locks, doesn't seem much about condition variables.

212
00:20:58,000 --> 00:21:06,000
So I think it's worthwhile to talk a little bit about condition variables to make sure that you're aware that they exist.

213
00:21:06,000 --> 00:21:11,000
And I'm going to do that using a tiny little example to sort of illustrate the issues.

214
00:21:11,000 --> 00:21:19,000
The tiny little example is we have a, you know, sort of a little bit inspired to a little bit inspired by the labs.

215
00:21:19,000 --> 00:21:27,000
And I have a threat to you one and T1 needs to collect a number of votes for all remote machines.

216
00:21:27,000 --> 00:21:34,000
And for example, it needs to decide that it has a majority so that actually proceeds to commit some value.

217
00:21:34,000 --> 00:21:40,000
And you'll see that later in like this shows up in the raft lab of one of the sub primitives that you need.

218
00:21:40,000 --> 00:21:47,000
And so to do that, you know, the T1 will fork, you know, other threats, you know, say to you to.

219
00:21:47,000 --> 00:21:53,000
And T2 amazingly does something expensive like, you know, talk to some remote machines to actually get its vote.

220
00:21:53,000 --> 00:22:04,000
And then you know report back, you know, that vote to T1 and T1 basically needs to collect all the votes, head them up and then assume that the majority, you know, declare sort of victory.

221
00:22:04,000 --> 00:22:11,000
So there's a pretty straightforward simple program, but because you're a little bit of a likes me to illustrate your couple of issues.

222
00:22:11,000 --> 00:22:16,000
So we're going to switch to the screen.

223
00:22:16,000 --> 00:22:22,000
Can everybody see this?

224
00:22:22,000 --> 00:22:30,000
So here I have a very simple implementation of this program, the vote thing.

225
00:22:30,000 --> 00:22:43,000
And again, it's a little bit of a totally example, but just hopefully gets the points across the two variables shared here, count and then I just count to count to number votes, finished, you know, count for when we're done.

226
00:22:43,000 --> 00:22:53,000
So, you know, there's a loop, you know, going for 10 creating a go creating of, you know, launching and.

227
00:22:53,000 --> 00:23:03,000
An anonymous function and then an anonymous function, you know, concurrently, you know, calls this function request votes, request vote, basically, you know, assimilates doing a long.

228
00:23:03,000 --> 00:23:18,000
And then the answer of operation on some remote and seeing the way it assimilates it is by just going to sleep, it's like, walks a little while, then returns and then, you know, returns, voted yes, then the count goes up and the count of fact that actually we had one more.

229
00:23:18,000 --> 00:23:21,000
Fred voting and then we're done.

230
00:23:21,000 --> 00:23:32,000
So that's the four of 10 threads, you know, the each of you request vote and report the result and then at the end we'll check if the count is smaller than the wife, you know, we know that we failed.

231
00:23:32,000 --> 00:23:43,000
We lost the election and we have votes equal larger than five, you know, will basically one the election, so this is sort of the simple, very simple program.

232
00:23:43,000 --> 00:23:46,000
This is all makes sense.

233
00:23:46,000 --> 00:23:53,000
Let me run it just for the kicks.

234
00:23:54,000 --> 00:23:59,000
You know, we're running a couple times, sometimes we lose, sometimes win, you know, makes sense.

235
00:23:59,000 --> 00:24:04,000
And so this program looks, you know, working.

236
00:24:04,000 --> 00:24:10,000
And correct, is it actually correct.

237
00:24:10,000 --> 00:24:13,000
Sorry, was the question whether this program is actually correct.

238
00:24:13,000 --> 00:24:16,000
Yeah, it seems to produce results.

239
00:24:16,000 --> 00:24:21,000
I think there's a race condition, isn't there?

240
00:24:21,000 --> 00:24:25,000
Like you have all of these different threads incrementing the count and finished variables.

241
00:24:25,000 --> 00:24:26,000
Yeah.

242
00:24:26,000 --> 00:24:32,000
And it's also.

243
00:24:32,000 --> 00:24:36,000
It's not clear to me that finished necessarily always reaches 10.

244
00:24:36,000 --> 00:24:39,000
Is it possible that it doesn't.

245
00:24:39,000 --> 00:24:44,000
Let me let me take these one one by one and just go for your first point, which is either one or one or was after.

246
00:24:44,000 --> 00:24:52,000
You know, clear this has a visitor again, the fact that we have two variables a year correct.

247
00:24:52,000 --> 00:24:55,000
You know, count of finished, they're accessed by different go routines.

248
00:24:55,000 --> 00:24:57,000
So this is a merely a red flag.

249
00:24:57,000 --> 00:24:59,000
Could you see a problem here?

250
00:24:59,000 --> 00:25:05,000
Like as soon as you have a variable that has access to or modified and by two different go routines, you know, there's a kind of be a problem.

251
00:25:05,000 --> 00:25:10,000
And so you know, interesting to run the race detector and see if it actually catches it.

252
00:25:10,000 --> 00:25:18,000
And as you expect it, you know, the go the race detector, it tells you exactly, you know, there is indeed to get some problems here that this program.

253
00:25:18,000 --> 00:25:23,000
And you know, list the line number, you know, or things actually can go wrong.

254
00:25:23,000 --> 00:25:28,000
So that gives you actually pretty good clue that something is not up to snuff this program.

255
00:25:28,000 --> 00:25:37,000
And so we're going to like repair it in small steps and, you know, that will hopefully shed some more light on competitive programming.

256
00:25:37,000 --> 00:25:41,000
So let me use my second solution to this program.

257
00:25:41,000 --> 00:25:53,000
And in this case, I'll talk about channels a little bit later because I wanted to illustrate the locks and condition variables first, because the less emphasis in the tutorial.

258
00:25:53,000 --> 00:25:58,000
So you know, simple solution, you know, the correct here introduce a lock.

259
00:25:58,000 --> 00:26:02,000
The lock is completely independent of the variables.

260
00:26:02,000 --> 00:26:08,000
And you follow some convention, which says like, well, this lock knew protects counter finish.

261
00:26:08,000 --> 00:26:14,000
And so whenever, you know, you access in counter finish, you have to wrap that into the lock and then unlock statement.

262
00:26:14,000 --> 00:26:19,000
And so here we see two like this is their go function could run separately.

263
00:26:19,000 --> 00:26:25,000
And after you know the request code, it's about to update the vote and finish. So we take a lock out.

264
00:26:25,000 --> 00:26:30,000
And then go has this nice feature called the defer statement.

265
00:26:30,000 --> 00:26:41,000
If you exit the basic block, you know, will run the function that is declared by the bird or that is after the key word deferred.

266
00:26:41,000 --> 00:26:47,000
And this means like we execute, we leave to go function here will automatically unlock.

267
00:26:47,000 --> 00:26:50,000
This is convenient because then you want to forget to unlock.

268
00:26:50,000 --> 00:26:55,000
And so it's nice to do that right at point where you do the lock. And so you can write immediately defer in lock.

269
00:26:55,000 --> 00:27:03,000
And then you have to worry about the multiple exit paths out of the go routine or out of function that you forget to unlock.

270
00:27:03,000 --> 00:27:12,000
So, you know, basically in a critical section where we hold the lock, we update voting count and then of course the function returns and locks automatically.

271
00:27:12,000 --> 00:27:21,000
And similarly at the, at the end, you know, we got a, every time we access, you know, counter finish.

272
00:27:21,000 --> 00:27:27,000
Since they share it, you know, we need to surround it with locks and then you're a simple way of doing it.

273
00:27:27,000 --> 00:27:31,000
We could have written deeper unlock in your two in the body, but I would be fine.

274
00:27:31,000 --> 00:27:34,000
So we can actually run this program.

275
00:27:34,000 --> 00:27:36,000
Let's see.

276
00:27:36,000 --> 00:27:44,000
And so we run it, you know, the racing tech seems to be happy. So hopefully we'll have a better program.

277
00:27:44,000 --> 00:27:47,000
So I just have a question here about scoping.

278
00:27:47,000 --> 00:27:48,000
Yeah.

279
00:27:48,000 --> 00:27:55,000
So it seems that when we have the anonymous function, then we have this new and we have the count and we have the finished and it seems that the anonymous function has access to.

280
00:27:55,000 --> 00:27:59,000
Yeah, that we're defined outside of the function. So how do we open rules work?

281
00:27:59,000 --> 00:28:07,000
Yeah, I'm going to be any fun with an anonymous function and any variable that's, you know, used inside of the function is not declared inside of the function.

282
00:28:07,000 --> 00:28:12,000
Basically, it was all points to variables outside of the out of scope.

283
00:28:12,000 --> 00:28:15,000
So statically scope.

284
00:28:15,000 --> 00:28:20,000
What about the scope of the, like the mutex.

285
00:28:20,000 --> 00:28:28,000
How many times you have to declare that or, and what's the scope of it, I guess, the scope of the first statement is this block, one basic block.

286
00:28:28,000 --> 00:28:36,000
So, no, I mean, like when you actually declare like the mutex data structure, I guess.

287
00:28:36,000 --> 00:28:38,000
It's like any other variable.

288
00:28:38,000 --> 00:28:41,000
That's the same scope as finished or count.

289
00:28:41,000 --> 00:28:46,000
So it applies to any variable declared in the rest of the.

290
00:28:46,000 --> 00:28:54,000
Yeah, the way to think about it is that the new text is not directly associated with any variable. It's just a lock, you know, it's like a name.

291
00:28:54,000 --> 00:29:02,000
And it's up to you as a programmer to just say like what that lock protects.

292
00:29:02,000 --> 00:29:05,000
There are two independent concepts.

293
00:29:05,000 --> 00:29:12,000
What happens, what happens if you use I in the go retie that wouldn't work right you need to pass that end.

294
00:29:12,000 --> 00:29:22,000
Yeah, so what I like that's a good question and the number of you asked that for email to so what are what happens to like if we use I here, and I want you to do something with it like whatever.

295
00:29:22,000 --> 00:29:32,000
Count is I, this is a good plan or not.

296
00:29:32,000 --> 00:29:36,000
What value of I will be using when this friend actually happens to run.

297
00:29:36,000 --> 00:29:42,000
If it starts to function and we'll run at some point, what value of I will be using.

298
00:29:42,000 --> 00:29:48,000
Whatever I happens to be at the time, which is being changed by the for loop outside.

299
00:29:48,000 --> 00:29:58,000
Yeah, right. So you know, so this is not so great because it's probably not what we intended. We probably intended the eye that we whatever for that's illegal loop iteration.

300
00:29:58,000 --> 00:30:10,000
So how do we want to if we have to solve that how we do you could add it as a parameter to the non function and pass it in so it gets evaluated when you create the go over team.

301
00:30:10,000 --> 00:30:22,000
So we do the right this and then pass it actually in right the net up point what happens then at the point we actually create the go routine I is being captured and then passed in.

302
00:30:22,000 --> 00:30:24,000
Right then.

303
00:30:24,000 --> 00:30:27,000
Pass.

304
00:30:27,000 --> 00:30:42,000
How are the local variables allocated like if if captain finished our like local variables wouldn't they like be destroyed after the main function exits or like if this wasn't main but like another function what it's like that hitting function exit before the.

305
00:30:42,000 --> 00:30:45,000
Yeah, the principal allocated in stack.

306
00:30:45,000 --> 00:30:53,000
And you know the blue and the other functions that just memory addresses references to them. So it's indeed the case is main returns.

307
00:30:53,000 --> 00:30:57,000
Then these you know, these stack allocated variables are gone.

308
00:30:57,000 --> 00:31:06,000
Typically what you will see is that in a goal program you would allocate them in you know on the heat using new like if you make a new struct or whatever.

309
00:31:06,000 --> 00:31:09,000
So would you get a segmentation fault then or.

310
00:31:09,000 --> 00:31:12,000
Okay.

311
00:31:12,000 --> 00:31:25,000
I have a question I actually remember this is the correct like way to do it or not but instead of passing it in would it be possible to as the first line in the for loop do I colon equals I.

312
00:31:25,000 --> 00:31:37,000
And then you're like you have a I don't know how the scoping works within the like block of the for loop because I think that should create a new variable I that the go routine can access that isn't being updated again.

313
00:31:37,000 --> 00:31:39,000
So you can do that.

314
00:31:39,000 --> 00:31:43,000
That can help instead of passing it in it kind of makes it look ugly to me.

315
00:31:43,000 --> 00:31:50,000
Okay, well I like to passing in but that's another way of doing it all shows an example later.

316
00:31:50,000 --> 00:31:58,000
So to do some or somebody asked actually you know do we get a second station felt we're not really going to get a second station fault I should take that back.

317
00:31:58,000 --> 00:32:01,000
Because basically one Fred will hold still hold a reference.

318
00:32:01,000 --> 00:32:05,000
And so the garbage collector will not delete the object yet.

319
00:32:05,000 --> 00:32:13,000
Right only when the last Fred actually only when no Fred holds a reference you know the will the garbage collector delete the object.

320
00:32:13,000 --> 00:32:21,000
And this is one of the cool things about having garbage collected language and shared memory programming you don't have to worry about that scenario.

321
00:32:21,000 --> 00:32:23,000
Okay.

322
00:32:23,000 --> 00:32:26,000
Yeah.

323
00:32:26,000 --> 00:32:38,000
Like what could this code like the block because like if we if like the go routines like the first four loop will exit and then the second one will like.

324
00:32:38,000 --> 00:32:41,000
Yeah, no, never mind.

325
00:32:41,000 --> 00:32:45,000
There are definitely some issues that are not ideal yet. So let me just talk about them.

326
00:32:45,000 --> 00:32:48,000
One of them is that like this particular loop.

327
00:32:48,000 --> 00:32:54,000
It's a little bit annoying right like this this this four loop is there's nothing else than waiting until count reaches five for finished.

328
00:32:54,000 --> 00:33:01,000
And the way it does it is by just spinning right so there's locks locks it looks at the valley quickly locks it and spins around again.

329
00:33:01,000 --> 00:33:04,000
So basically since it's spinning on the processor doing really nothing.

330
00:33:04,000 --> 00:33:11,000
It'd be nice to express that in a little bit better way so that like basically the go can sort of give up the core again so that another Fred can run.

331
00:33:11,000 --> 00:33:19,000
And so the way you can do that is usually condition variables and so this is my the next implementation.

332
00:33:19,000 --> 00:33:36,000
Or actually I show you one other application one way to do it out of is a little bit not you know not so nice is a example and but so much suggested this is actually sleep for a little while so instead of like giving up the spinning like crazy just sleep one period of sleep for period and then come back.

333
00:33:36,000 --> 00:33:46,000
So that's a lot of the solution will work but the downside of it is that you know how long long should you sleep right you really would like to be the case that I assume for example this guy reaches five.

334
00:33:46,000 --> 00:33:51,000
Then you know you wake you could wake up the this particular you know the main threat.

335
00:33:51,000 --> 00:33:58,000
And so I was jumping ahead a little bit but so that's what condition variables are four.

336
00:33:58,000 --> 00:34:02,000
And you're solution with condition variables.

337
00:34:02,000 --> 00:34:13,000
So we allocated the new condition to years condition variables allocated it's associated with this particular lock we'll see in a second why this is important.

338
00:34:13,000 --> 00:34:17,000
And you know basically the main Fred what it does now.

339
00:34:17,000 --> 00:34:25,000
So it's the lock because it needs to grab the lock to look at talented finish otherwise that could erase conditions and then.

340
00:34:25,000 --> 00:34:30,000
And the condition still not true and just calls weight on this condition variable.

341
00:34:30,000 --> 00:34:45,000
And what that does is actually done automatically goes to sleep as well as releasing the lock that is associated with the condition variable you know since you know me really associated the condition variable can't wait basically in locks.

342
00:34:45,000 --> 00:34:50,000
And goes to sleep in an atomic operation.

343
00:34:50,000 --> 00:34:55,000
And when it returns you know from come weight it will actually hold the lock again.

344
00:34:55,000 --> 00:35:00,000
So the color most no sooner than if come weight returns will actually help the lock again.

345
00:35:00,000 --> 00:35:05,000
And so it's safe again to look at talent and finish and then call weight again.

346
00:35:05,000 --> 00:35:09,000
Okay. So basically you know this Fred will go to sleep.

347
00:35:09,000 --> 00:35:13,000
And then the go routines that you know are collecting the votes.

348
00:35:13,000 --> 00:35:21,000
You know the same code as before my lock and then lock or defer during lock and then when you're done you know updating count to finish.

349
00:35:21,000 --> 00:35:25,000
There are two primitives on the condition variable one is signal and one is broadcast.

350
00:35:25,000 --> 00:35:30,000
And broadcast basically signal wakes up one waiter and broadcast weights of all waiters.

351
00:35:30,000 --> 00:35:35,000
You know there's only one waiter here so we could have used either one of them.

352
00:35:35,000 --> 00:35:40,000
And so basically one of reaches you know five you know at some point or 10.

353
00:35:40,000 --> 00:35:49,000
Then you know the so every time finishes and command it you know the main Fred will be working up and check the condition and then keep up.

354
00:35:49,000 --> 00:35:51,000
Okay.

355
00:35:51,000 --> 00:35:58,000
And so this is convenient sort of you can think about condition variables as a coordination primitive you know between two different threats.

356
00:35:58,000 --> 00:36:11,000
And then when you're actually using walks you know for the protect your share state.

357
00:36:11,000 --> 00:36:18,000
So here's the same implementation of this program using channels.

358
00:36:18,000 --> 00:36:23,000
And more or less work to the same way except we're of course no walks.

359
00:36:23,000 --> 00:36:31,000
The main Fred creates a channel passes the goal routine that on his function that's being created as a separate Fred.

360
00:36:31,000 --> 00:36:34,000
You're right basically the request vote to the channel.

361
00:36:34,000 --> 00:36:38,000
And then the main Fred basically blocks here correct when it starts reading from the channel.

362
00:36:38,000 --> 00:36:42,000
Ones that actually get something with something is written to the channel will in block.

363
00:36:42,000 --> 00:36:49,000
You know look at the value and it's true and add up and auto and always in commence finish.

364
00:36:49,000 --> 00:36:59,000
And what's going on here correct is we don't need locks because count and finish are not shared there's only one thread that actually updates count and finish and that's the main Fred.

365
00:36:59,000 --> 00:37:02,000
Okay.

366
00:37:02,000 --> 00:37:04,000
The.

367
00:37:04,000 --> 00:37:14,000
And this is going to the name the the the sort of request that threats you know all basically just write to this channel they write concurrently perhaps the channel.

368
00:37:14,000 --> 00:37:22,000
But the channels are one of the things that go to that Fred safe so multiple threats connected right to the channel.

369
00:37:22,000 --> 00:37:25,000
Any questions about this.

370
00:37:25,000 --> 00:37:28,000
About this solution.

371
00:37:28,000 --> 00:37:33,000
What was the thing about like having a buffer for the channel.

372
00:37:33,000 --> 00:37:43,000
Yeah so normally when you're writing to the channel and nobody's reading from the channel or no Fred is reading from the channel then the center will need to be blocked.

373
00:37:43,000 --> 00:37:53,000
You can specify that the channel has a buffer of a of 10 or 20 and that allows the channel to have multiple values.

374
00:37:53,000 --> 00:38:04,000
In 8 to 4 labs I've never used buffered channels and one of two three times I did it and I regret it so in general I don't use it.

375
00:38:04,000 --> 00:38:08,000
But this is a rationing important point.

376
00:38:08,000 --> 00:38:12,000
This program is actually still not very good.

377
00:38:12,000 --> 00:38:15,000
So for example when.

378
00:38:15,000 --> 00:38:22,000
It doesn't matter in practice in this particular example but it's not in some of the labs to goodbye to you.

379
00:38:22,000 --> 00:38:28,000
As soon as it reaches count five what will happen.

380
00:38:28,000 --> 00:38:30,000
It's not listening for.

381
00:38:30,000 --> 00:38:31,000
Yeah.

382
00:38:31,000 --> 00:38:34,000
This is the channel so any other threats are just going to be blocked.

383
00:38:34,000 --> 00:38:42,000
Yeah so basically it means like if the first five threats voted yes then the next five threats will be blocked in this channel correct.

384
00:38:42,000 --> 00:38:45,000
So they'll be hanging around.

385
00:38:45,000 --> 00:38:55,000
And in this case it won't be a problem because most of you guys are most mature if the main Fred exit and actually cleans up all the other threats too.

386
00:38:55,000 --> 00:38:58,000
But for example if this will be a long running service.

387
00:38:58,000 --> 00:39:00,000
This would be not good.

388
00:39:00,000 --> 00:39:05,000
Basically we're leaking threats here you know they're sitting blocked on the site doing nothing in that channel.

389
00:39:05,000 --> 00:39:10,000
And so that's quite egregious and this is something to watch out for.

390
00:39:10,000 --> 00:39:15,000
And this showed up in the crawler I think for many people in the.

391
00:39:15,000 --> 00:39:21,000
And the flip side of this is that is the main Fred and just early before any of the request folks are done.

392
00:39:21,000 --> 00:39:23,000
And then you also have a problem.

393
00:39:23,000 --> 00:39:29,000
And so there's this management of threats that actually is often a tricky issue.

394
00:39:29,000 --> 00:39:34,000
Is there a way to kill the thread without exiting from me.

395
00:39:34,000 --> 00:39:40,000
While you can send it a variable or a value on some channel saying like please exit.

396
00:39:40,000 --> 00:39:48,000
And you have to coordinate it yourself.

397
00:39:48,000 --> 00:39:54,000
When I go back to one of the things that actually is cool about.

398
00:39:54,000 --> 00:39:59,000
Condition variables is that.

399
00:39:59,000 --> 00:40:02,000
In principle you might think the same issue exists here.

400
00:40:02,000 --> 00:40:06,000
We're like this Fred actually runs.

401
00:40:06,000 --> 00:40:09,000
And this Fred.

402
00:40:09,000 --> 00:40:11,000
And might get blocked.

403
00:40:11,000 --> 00:40:17,000
For example, if you know reached you know five you know this main Fred will proceed doing it's thing.

404
00:40:17,000 --> 00:40:21,000
While the other guys are still maybe actually sitting in here.

405
00:40:21,000 --> 00:40:25,000
The notice these in this case they won't be blocked.

406
00:40:25,000 --> 00:40:27,000
Because you know well, grab the lock.

407
00:40:27,000 --> 00:40:32,000
Then you know does it thing does a broadcast in the broadcast is actually not a blocking operation.

408
00:40:32,000 --> 00:40:35,000
And then you know writing to a channel that is a blocking operation.

409
00:40:35,000 --> 00:40:39,000
If nobody is listening the con broadcast is not a blocking operation.

410
00:40:39,000 --> 00:40:43,000
And so this actually works out in this particular program by itself.

411
00:40:43,000 --> 00:40:50,000
Okay.

412
00:40:50,000 --> 00:40:51,000
Okay good.

413
00:40:51,000 --> 00:41:01,000
Any further questions about you know these two examples just to.

414
00:41:01,000 --> 00:41:06,000
And then let's talk about the crawler.

415
00:41:06,000 --> 00:41:15,000
So the crawler is a little sort of more realistic example of return programming.

416
00:41:15,000 --> 00:41:18,000
Yeah, just to remind you.

417
00:41:18,000 --> 00:41:25,000
You know, basically the idea is that you know you start out with a URL for some web page.

418
00:41:25,000 --> 00:41:29,000
And then you just need to fetch the fetch the web page that might have more URLs.

419
00:41:29,000 --> 00:41:36,000
And you basically proceed, you know then fetching those web pages, you know looking at those URLs and keep going.

420
00:41:36,000 --> 00:41:41,000
And the idea is to crawl basically the whole internet for all the web pages that are exist.

421
00:41:41,000 --> 00:41:46,000
And of course, you know some URLs might point back to a message that you're ready to visit it.

422
00:41:46,000 --> 00:41:52,000
And so goal is to actually not visit the same web page twice.

423
00:41:52,000 --> 00:41:56,000
And so to go with the exercises a couple of goals that you want to achieve.

424
00:41:56,000 --> 00:42:03,000
One is I own concurrency.

425
00:42:03,000 --> 00:42:06,000
The fetch operation is a link take a long time.

426
00:42:06,000 --> 00:42:10,000
You know maybe it's a web page that sits on the other side of the world.

427
00:42:10,000 --> 00:42:12,000
You're maybe go over slow networks.

428
00:42:12,000 --> 00:42:19,000
And while you're sort of one for this or fetching that page, you know you would like to be able to fetch other other other pages.

429
00:42:19,000 --> 00:42:30,000
Another goal is this correctness goal or you know, form school namely, you know, fetch one that you do around once.

430
00:42:30,000 --> 00:42:42,000
And you know, normally you'd love to like to exploit multiple course. You know if you have multiple course, you can work in parallel.

431
00:42:42,000 --> 00:42:55,000
Okay. So what I like to do before actually talking about the current solution first, let me show you a simple serial solution.

432
00:42:55,000 --> 00:43:05,000
So that we, you know, we have something to talk about as a baseline.

433
00:43:05,000 --> 00:43:19,000
So, so I have three solutions in here.

434
00:43:19,000 --> 00:43:20,000
Run them.

435
00:43:20,000 --> 00:43:26,000
Run.

436
00:43:26,000 --> 00:43:41,000
And then you see that the more or less they produce the same results, you know, two found one missing two found the only differences that the order of the output is slightly different once in a while.

437
00:43:41,000 --> 00:43:44,000
Of course, it has to do with concurrency.

438
00:43:44,000 --> 00:43:48,000
Okay. So the main function.

439
00:43:48,000 --> 00:43:55,000
So we have a course in serial with the starting URL, the feature and then an empty map.

440
00:43:55,000 --> 00:44:02,000
And then serial solution is basically sort of standard sequential recursive solution.

441
00:44:02,000 --> 00:44:06,000
We first check if we already visited the URL that's passed into us.

442
00:44:06,000 --> 00:44:13,000
If we did, now we're trying to immediately otherwise market as visit will fix the URL that gives us a bunch of you URLs.

443
00:44:13,000 --> 00:44:20,000
And then we look for all the URLs and call basically serial again. Right. And this is your sequential solution. That's what I expected.

444
00:44:20,000 --> 00:44:25,000
And you know, your goal was to basically read a current version of this.

445
00:44:25,000 --> 00:44:31,000
And so what I like to do is actually to make the class a little bit interactive.

446
00:44:31,000 --> 00:44:42,000
I want to go switch over to breakout rooms. And what we're going to do is basically put four to five of you in a single breakout room for about 10 minutes.

447
00:44:42,000 --> 00:44:46,000
And what I would like you to do is share your solution with each other and discuss it.

448
00:44:46,000 --> 00:44:52,000
So maybe the best way to go about it is that one of you, you know, you get into the room.

449
00:44:52,000 --> 00:44:56,000
One of the person in the room, you know, basically stream shares their solution.

450
00:44:56,000 --> 00:45:03,000
And discuss it as you know one of the issues that he or she ran into and other people can comment or share other solutions.

451
00:45:03,000 --> 00:45:07,000
And just to get into discussion of meets and other students in the class.

452
00:45:07,000 --> 00:45:10,000
Any questions about that.

453
00:45:12,000 --> 00:45:14,000
Thank you.

454
00:45:14,000 --> 00:45:18,000
We go back to share my screen again.

455
00:45:18,000 --> 00:45:21,000
Can I already see my screen again?

456
00:45:21,000 --> 00:45:23,000
Yeah, plus good.

457
00:45:23,000 --> 00:45:29,000
Good. Thank you.

458
00:45:29,000 --> 00:45:33,000
Okay. So hopefully that was interesting.

459
00:45:33,000 --> 00:45:38,000
And let me talk about the solutions that I have.

460
00:45:38,000 --> 00:45:41,000
And I think that's a good question.

461
00:45:41,000 --> 00:45:43,000
They're posted on the schedule page.

462
00:45:43,000 --> 00:45:45,000
If you haven't.

463
00:45:45,000 --> 00:45:48,000
You can look concurrently with me if you want to.

464
00:45:48,000 --> 00:45:57,000
There should, you know, let me walk through the new text version first and then I'll walk through the channel one.

465
00:45:57,000 --> 00:45:58,000
Second.

466
00:45:58,000 --> 00:46:00,000
So here's the.

467
00:46:00,000 --> 00:46:11,000
The new text one, the new text one, the collarsher struct, you know, with the has both the map and the new text and the map needs to be protected by new text because it's going to be concurrent access to the map.

468
00:46:11,000 --> 00:46:14,000
So map by itself is not free at save.

469
00:46:14,000 --> 00:46:17,000
It's up to the programmer to actually make the map front save.

470
00:46:17,000 --> 00:46:24,000
And the content, new text one works sort of similar to the serial one, except whenever there's a shared state, basically takes a walk out.

471
00:46:24,000 --> 00:46:25,000
So we'll take the lock.

472
00:46:25,000 --> 00:46:27,000
Now, we look at the URL.

473
00:46:27,000 --> 00:46:28,000
It's been touched.

474
00:46:28,000 --> 00:46:31,000
If it hasn't been touched with market has now been fetched.

475
00:46:31,000 --> 00:46:34,000
Well, hasn't been fetched and we unlock.

476
00:46:34,000 --> 00:46:38,000
And we kept this already value to decide whether we should return or not.

477
00:46:38,000 --> 00:46:40,000
And then.

478
00:46:40,000 --> 00:46:46,000
You know, we read this go routine starts fetching a page that gets a bunch of URLs back.

479
00:46:46,000 --> 00:46:50,000
And then for every URL back.

480
00:46:50,000 --> 00:47:01,000
It creates a new go routine here on this side passes in the URL, but that go routine is supposed to fetch and crawl.

481
00:47:01,000 --> 00:47:04,000
The only sort of other interesting thing here.

482
00:47:04,000 --> 00:47:07,000
Is that it uses something called weight group.

483
00:47:07,000 --> 00:47:14,000
And wave group is a very convenient primitive to sort of keep track how many fret you still have active and when you can terminate.

484
00:47:14,000 --> 00:47:20,000
And then you can sort of a big issue in this particular assignment that if you terminator too early, then you didn't crawl the web pages.

485
00:47:20,000 --> 00:47:23,000
And so you need to keep track, whether you're.

486
00:47:23,000 --> 00:47:31,000
Whether there's still outstanding web pages to be crawled, sync weight group is very easily basically every time you call a fret you call.

487
00:47:31,000 --> 00:47:35,000
And then when the threat terminates.

488
00:47:35,000 --> 00:47:37,000
You call done.

489
00:47:37,000 --> 00:47:40,000
And you could conveniently do that in the deferral statement.

490
00:47:40,000 --> 00:47:49,000
And then the main fret that is waiting for real, the threats determinant just calls weight and weight will return until every fret that was started for every every add one.

491
00:47:49,000 --> 00:47:51,000
If all those threats actually have me.

492
00:47:51,000 --> 00:47:53,000
I did it.

493
00:47:53,000 --> 00:48:00,000
And so that's the new text version.

494
00:48:00,000 --> 00:48:07,000
And you can think about sync weight sort of being internally implemented using condition variable.

495
00:48:07,000 --> 00:48:13,000
Okay, let's look at the channel version.

496
00:48:13,000 --> 00:48:23,000
And so here's the channel versions basically sort of or or can it organize as the map reduce lab where there's a coordinator and workers.

497
00:48:23,000 --> 00:48:29,000
And so we start off, you know, we start off creating a coordinator threat.

498
00:48:29,000 --> 00:48:32,000
And the way we do that actually is we make a channel.

499
00:48:32,000 --> 00:48:35,000
And then we pass the channel into the coordinator.

500
00:48:35,000 --> 00:48:39,000
The coordinator first has to start with a URL, the beginning URLs.

501
00:48:39,000 --> 00:48:42,000
We need to supply that on the channel. That's the most convenient thing to do.

502
00:48:42,000 --> 00:48:44,000
As we'll see in a second.

503
00:48:44,000 --> 00:48:50,000
But you know, through send it on the channel, we basically have to create a go team because otherwise, you know, we deadlock here.

504
00:48:50,000 --> 00:48:52,000
We, and this is a typical feeling record.

505
00:48:52,000 --> 00:48:55,000
The goal is to just send that value on the channel.

506
00:48:55,000 --> 00:48:58,000
So let's look at the coordinator.

507
00:48:58,000 --> 00:49:00,000
Here's the coordinator.

508
00:49:00,000 --> 00:49:05,000
It doesn't use any locks at all because the data structures that.

509
00:49:05,000 --> 00:49:16,000
There's no data structures actually being shared like fetched, you know, the map that actually keeps track of which URLs has been fetched is actually only access within the coordinator.

510
00:49:16,000 --> 00:49:27,000
So the coordinator got a, you know, when we called it initially, we got a, it has a one URL checks the fetch map and then for every URL.

511
00:49:27,000 --> 00:49:33,000
And then it goes basically, you know, cycles through reach the channel using a range statement.

512
00:49:33,000 --> 00:49:39,000
And basically what this does is it just keeps reading the channel and it just grabs the next value, picks the next value, grabs the next value.

513
00:49:39,000 --> 00:49:41,000
So basically, it grabs the URL.

514
00:49:41,000 --> 00:49:45,000
We know there's one in it because you know, we put it on when we created it.

515
00:49:45,000 --> 00:49:51,000
And then for that URL, we sort of roughly do the same thing as the.

516
00:49:51,000 --> 00:49:54,000
Concerned as the new touch one.

517
00:49:54,000 --> 00:49:58,000
You know, we see if the URL is already been fetched.

518
00:49:58,000 --> 00:50:07,000
It hasn't been fetched then we're done. Otherwise, we'll create a grow worker to actually fetch that URL.

519
00:50:07,000 --> 00:50:11,000
And we keep track of how many outstanding workers we have.

520
00:50:11,000 --> 00:50:15,000
So N is counting normal workers and only what N zero.

521
00:50:15,000 --> 00:50:24,000
Do we terminate the coordinator to make sure that basically we have fetched all the web pages that we should post to be fetching.

522
00:50:24,000 --> 00:50:31,000
Let's you go to worker worker basically calls fetch. You know, this course now happens completely in parallel with any other workers.

523
00:50:31,000 --> 00:50:38,000
If it actually fetches some URL from that web page, basically writes all those URLs to the channel.

524
00:50:38,000 --> 00:50:43,000
And so the coordinator will get all those channels through dream statement.

525
00:50:43,000 --> 00:50:54,000
And then when it's done, you know, writing all the URL through the channel, then the coordinator or the worker exits and that will, you know, at some point.

526
00:50:54,000 --> 00:50:59,000
Decrease, you know, and then at the end.

527
00:50:59,000 --> 00:51:01,000
And that's it basically.

528
00:51:01,000 --> 00:51:02,000
Okay.

529
00:51:02,000 --> 00:51:13,000
So there was a detour solutions. Any questions about these.

530
00:51:13,000 --> 00:51:16,000
Is it all clear?

531
00:51:16,000 --> 00:51:19,000
There's a question in chat.

532
00:51:19,000 --> 00:51:33,000
Let me get my chat list back up.

533
00:51:33,000 --> 00:51:41,000
Okay. So the question is when C H has a value in it, when all other threads be idle.

534
00:51:41,000 --> 00:51:49,000
And then the case that the, since this is not a buffer channel, but you know, those are going to be only one requesting the channel at the time.

535
00:51:49,000 --> 00:51:55,000
And so all the threads, you know, will be appending to the channel one by one.

536
00:51:55,000 --> 00:52:01,000
But doesn't that make the program sequential because no two threads are running in parallel except the main thread and one.

537
00:52:01,000 --> 00:52:05,000
Well, the fetish will still happen in parallel.

538
00:52:05,000 --> 00:52:10,000
And those are presumably the expensive operation, right? Those go out across the Internet.

539
00:52:10,000 --> 00:52:14,000
Thank you.

540
00:52:14,000 --> 00:52:19,000
Okay. Let me switch back to my other screen.

541
00:52:19,000 --> 00:52:28,000
Talk a little bit about RPC, since that's the other thing tool that you need for the labs.

542
00:52:28,000 --> 00:52:39,000
I'm not going to say you're talking about it, but just RPC stands for remote procedure call.

543
00:52:39,000 --> 00:52:56,000
And basically the goal, you know, the goal of an RPC system, like the one that go has is the bank sort of RPCs behave roughly similar to procedure calls, you know, local procedure calls that you execute on the stack.

544
00:52:56,000 --> 00:53:08,000
Right. And so the goal is that, for example, if you have a client in RPC terminal, the college typically called the client and the colleagues call the server.

545
00:53:08,000 --> 00:53:19,000
And they say you have a function and you know, FN, you know, we're calling with X and Y. And then at the server, there's the implementation of this function.

546
00:53:19,000 --> 00:53:23,000
And so as a function and whatever X, you know, from a Y end.

547
00:53:23,000 --> 00:53:31,000
And you know, the returns, you know, whatever does some computation and maybe use this returns.

548
00:53:31,000 --> 00:53:34,000
X plus Y.

549
00:53:34,000 --> 00:53:56,000
So what we like sort of like to have happened, or like the model that we would like this sort of ourselves to think about is that when the client calls this function, FN, the RPC system will make sure that there's an corresponding notification happening on the server site passes the arguments X and Y, you know, to the server code runs on the server.

550
00:53:56,000 --> 00:54:15,000
And then you know, returns are resolved, you know, say you see, and that result is them communicating back to the client and, you know, and then FN will resume will return and the client will return will resume with, you know, the X plus Y in the value of X plus Y and Z.

551
00:54:15,000 --> 00:54:20,000
And it looks like, you know, even though the programs are running on different computers, you know, they're not sort of a hard binary here.

552
00:54:20,000 --> 00:54:25,000
And looks like, you know, they make a sort of regular procedure calls.

553
00:54:25,000 --> 00:54:38,000
And we'll see in a second that actually we can make a lot of similarities or it's possible to make them behave very similar, but I'll see there's also sort of a fundamental difference and I'd actually ask them to really do a distributed computing.

554
00:54:38,000 --> 00:54:43,000
But before getting there, let me first sort of sketch out how you can make this work.

555
00:54:43,000 --> 00:54:50,000
And this is sort of roughly, you know, let go dust too. So the way you know, the thing about it is that when the client.

556
00:54:50,000 --> 00:54:52,000
So near our program.

557
00:54:52,000 --> 00:54:57,000
And when the client calls the function FN with X and Y in it.

558
00:54:57,000 --> 00:55:01,000
What it does is actually calls something that's called the stuff.

559
00:55:01,000 --> 00:55:11,000
And the stuff is basically local function, you know, front FN and with the two arguments, we declare the X and Y. And basically what the stuff does.

560
00:55:11,000 --> 00:55:14,000
You think this is a stop procedure.

561
00:55:14,000 --> 00:55:18,000
But the stuff procedure basically does it and built a message.

562
00:55:18,000 --> 00:55:28,000
You know, saying, you know, which function needs to be called, you know, the arguments of the function, you know, the types of the phone of those arguments, the values of these arguments, etc, etc.

563
00:55:28,000 --> 00:55:39,000
And then what the stuff does actually, it sends it over to network to or for responding stuff to server.

564
00:55:39,000 --> 00:55:49,000
So the server receives this message and basically takes this message and they are Marshall or Marshall.

565
00:55:49,000 --> 00:55:59,000
The term that's being used to basically convert values from sort of to by the race and from by the race back to values.

566
00:55:59,000 --> 00:56:04,000
And then calls, you know, this function FN at the server.

567
00:56:04,000 --> 00:56:10,000
And X, you know, in blah, blah, blah.

568
00:56:10,000 --> 00:56:15,000
And then the stuff basically calls the function, the function returns back into the stuff.

569
00:56:15,000 --> 00:56:21,000
The stuff, Marshalls, you know, the response value, like the Z, maybe X plus Y.

570
00:56:21,000 --> 00:56:27,000
And since the back, you know, to the climb stuff and the climb stuff is still waiting.

571
00:56:27,000 --> 00:56:31,000
So basically the climb stuff, the way that actually works, it sends out the request and then waits for the response.

572
00:56:31,000 --> 00:56:38,000
And so when the response comes back in, you know, in Marshalls.

573
00:56:38,000 --> 00:56:41,000
And then you know returns the value to the clients.

574
00:56:41,000 --> 00:56:51,000
So basically these two stops sort of make a remote procedure call looked like a regular procedure call, you know, for almost you can't help.

575
00:56:51,000 --> 00:56:53,000
And the key.

576
00:56:53,000 --> 00:56:57,000
And these stops are generally automatically generated.

577
00:56:57,000 --> 00:57:02,000
So the compiler, in case of the group of pilots that actually generate the stops for you.

578
00:57:02,000 --> 00:57:07,000
And then you do the marshalling and the marshalling arguments for you.

579
00:57:07,000 --> 00:57:10,000
And that's how it goes.

580
00:57:10,000 --> 00:57:17,000
So the so when you're doing it from the server to the client, there's also another stop again.

581
00:57:17,000 --> 00:57:20,000
You basically return back to that first stop.

582
00:57:20,000 --> 00:57:25,000
So this stuff makes a procedure call to make you calls to proceed to FN.

583
00:57:25,000 --> 00:57:28,000
That procedure returns great into the stuff because the stop called it.

584
00:57:28,000 --> 00:57:30,000
Oh, it's a same stop that it goes in.

585
00:57:30,000 --> 00:57:33,000
Exactly.

586
00:57:33,000 --> 00:57:35,000
Got it.

587
00:57:35,000 --> 00:57:36,000
Okay.

588
00:57:36,000 --> 00:57:43,000
Okay. So let me show you sort of how this plays out inside of go.

589
00:57:43,000 --> 00:57:50,000
And by showing you a very simple key value server.

590
00:57:50,000 --> 00:57:56,000
And you will see, you know, it doesn't look exactly in our procedure calls, but it's pretty close.

591
00:57:56,000 --> 00:58:05,000
So the typical thing is that you actually declare typical convention sort of in go is that you declare.

592
00:58:05,000 --> 00:58:07,000
The arguments are structs.

593
00:58:07,000 --> 00:58:12,000
And so we're going to implement two procedures to remote procedures one is put and one is get.

594
00:58:12,000 --> 00:58:16,000
And put is basically put our access the arguments to the puts and put replies to the response.

595
00:58:16,000 --> 00:58:24,000
Similarly, there's a get our ex with the request one, the arguments through the request get procedure and a reply.

596
00:58:24,000 --> 00:58:27,000
And let me first look at the server. So years are two functions.

597
00:58:27,000 --> 00:58:33,000
You know, actually, the two function of we're going to be calling on the server.

598
00:58:33,000 --> 00:58:36,000
I'll skip down for now for a second.

599
00:58:36,000 --> 00:58:41,000
Maybe actually.

600
00:58:41,000 --> 00:58:45,000
So let me talk about it a little bit. So this is the client site.

601
00:58:45,000 --> 00:58:51,000
So the client calls a function get and what inside of get, you know, you.

602
00:58:51,000 --> 00:58:56,000
And then the client calls the client to connect to the server and see the second what that means.

603
00:58:56,000 --> 00:59:01,000
It fills in the arguments that allocates a response and then calls to this procedure client calls call.

604
00:59:01,000 --> 00:59:08,000
You can think about this as a generic stuff that basically takes the method that needs to be called on server and the arguments and the reply.

605
00:59:08,000 --> 00:59:14,000
And so call always has three arguments, the method, the argument and the response.

606
00:59:14,000 --> 00:59:23,000
Call internally, we'll send, mark shoulder arguments send the message to the server over the connection and wait for the response.

607
00:59:23,000 --> 00:59:28,000
The reply when the reply comes in the reply struck will be filled in by the call stub.

608
00:59:28,000 --> 00:59:33,000
And then when that's done, then return after the call call.

609
00:59:33,000 --> 00:59:37,000
And basically put loads exactly the same way.

610
00:59:37,000 --> 00:59:39,000
And then the server site.

611
00:59:39,000 --> 00:59:41,000
And let's see how that is implemented.

612
00:59:41,000 --> 00:59:47,000
The server has a key value map. This is nothing else than regular go map.

613
00:59:47,000 --> 00:59:56,000
And let me see if needed key values truck.

614
00:59:56,000 --> 00:59:59,000
And declare that somewhere.

615
00:59:59,000 --> 01:00:01,000
Oh, sorry, it was right about that.

616
01:00:01,000 --> 01:00:06,000
And then there's a truck called KV that actually has a new text and a map in it.

617
01:00:06,000 --> 01:00:11,000
And the map is like where we're going to do the Putin get operations off.

618
01:00:11,000 --> 01:00:16,000
And there's a reliable pre-hemble that you need to sort of write to sort of set up a server.

619
01:00:16,000 --> 01:00:19,000
But here it is.

620
01:00:19,000 --> 01:00:23,000
You basically allocate a new server object.

621
01:00:23,000 --> 01:00:26,000
And then this is the key operation.

622
01:00:26,000 --> 01:00:35,000
And then we will register basically all the methods that are implemented on the key fee struct with the RPC server.

623
01:00:35,000 --> 01:00:42,000
With one twist, the method only the capital main.

624
01:00:42,000 --> 01:00:46,000
Only the methods with the capital will actually be reported.

625
01:00:46,000 --> 01:00:52,000
And so basically go uses capital means to indicate public, you know, methods and.

626
01:00:52,000 --> 01:00:57,000
And method with a small, you know, small caps is in private method.

627
01:00:57,000 --> 01:01:02,000
So only, you know, basically RPC register exports only capitalized methods.

628
01:01:02,000 --> 01:01:05,000
So example here's a method below here's our get method.

629
01:01:05,000 --> 01:01:07,000
It has a capital letter.

630
01:01:07,000 --> 01:01:14,000
And by calling register that method is now callable by applying for the connection to the server.

631
01:01:14,000 --> 01:01:19,000
And so the server internally, you know, basically creates a TCP connection.

632
01:01:19,000 --> 01:01:30,000
And wage zone TCP connection to get a request for a new connection request for a TCP connection and then calls RPC serve calm to serve that TCP connection.

633
01:01:30,000 --> 01:01:34,000
And basically every message that comes in over that, you know, connection.

634
01:01:34,000 --> 01:01:43,000
It will automatically find the right methods, you know, that is associated with the message and call that method with the unmarked arguments and unmarked reply.

635
01:01:43,000 --> 01:01:51,000
So for example, if the client calls get, you know, connects to it, double call, it makes this connection into existence.

636
01:01:51,000 --> 01:01:57,000
And then if the client calls call with the get, then this get function will be run.

637
01:01:57,000 --> 01:02:04,000
And as you can see in the get function, first thing the does is that it takes a lockout because multiple clients could be calling the server.

638
01:02:04,000 --> 01:02:10,000
And so there will be multiple goal routines running at the same time, perhaps invoking get and put.

639
01:02:10,000 --> 01:02:22,000
And so they will manipulating the map concurrently. And so we need to make sure that, you know, those that is done in an atomic way, consider therefore use locks.

640
01:02:22,000 --> 01:02:30,000
So the get function looks up the key into the map looks the key, what's the key in the map and returns basically the value.

641
01:02:30,000 --> 01:02:39,000
If there's no entry in the map, it will return error, no key, otherwise will return the appropriate value. And that's it.

642
01:02:39,000 --> 01:02:53,000
And so on the server site, when this get function returns, it will marshal its response sends response back to decline decline will site of it will unmark shall it and return it to the caller.

643
01:02:53,000 --> 01:03:09,000
Okay, so that makes sense. So that's sort of a good simple key value server in action.

644
01:03:09,000 --> 01:03:32,000
And I want to make one more point, which is an important point. And that in the end, what's important to think about is what are the C's man fix are than the failures.

645
01:03:32,000 --> 01:03:38,000
So there are different types of semantics possible, something is called at least once.

646
01:03:38,000 --> 01:03:47,000
And this all has to do with what does decline do if the server fails. So let's say decline sends the request to serve a crash.

647
01:03:47,000 --> 01:03:56,000
And of course, now at some point decline will time out and just doesn't know what the operation actually happened or not happened.

648
01:03:56,000 --> 01:04:07,000
At least once RPC semantics means that the client will automatically retry and will keep going until it has executed at least once.

649
01:04:07,000 --> 01:04:18,000
The downside of course of at least once is that you know the same operation might be executed multiple times. So example, if you do a put, you know, the put might be actually executed multiple times and at least once RPC system.

650
01:04:18,000 --> 01:04:28,000
That's not appropriate for many applications. So another type of semantics that's common in RPC systems is at most once.

651
01:04:28,000 --> 01:04:37,000
So the corresponding server request actually executed either zero times once but no more than once.

652
01:04:37,000 --> 01:04:44,000
And the way you know that is typically implemented is by filtering duplicates and you will actually doing that in.

653
01:04:44,000 --> 01:04:47,000
Later labs.

654
01:04:47,000 --> 01:05:02,000
Could be the case that actually both requests actually come through maybe the network was like a temporary or petitioned and the server actually gets both requests on the server has to arrange that detects a recent request and doesn't execute it twice.

655
01:05:02,000 --> 01:05:17,000
Ideally, you might actually want exactly once because that's actually what the normal procedure code would be to write like if you call a procedure in your server in a normal sequential program that actually executes exactly once it's never possible to be at least once or close ones.

656
01:05:17,000 --> 01:05:20,000
This turns out to be actually very hard to rage.

657
01:05:20,000 --> 01:05:31,000
This requires you know, you basically have to maintain state on this and sort of tend to be expensive and in fact practice very few RPC systems are exactly once.

658
01:05:31,000 --> 01:05:39,000
Although in the labs, you're going to build actually one in lab 3, you're going to actually build an RPC system that's basically exactly once.

659
01:05:39,000 --> 01:05:41,000
Okay.

660
01:05:41,000 --> 01:05:53,000
So practice goes RPC system is as much as most ones so you do a call and you do to call across a TCP channel, the TCP channel will make sure that there are no duplicates.

661
01:05:53,000 --> 01:06:02,000
And so and RPC system will either execute once or none and all and then in the case and return an error.

662
01:06:02,000 --> 01:06:10,000
And then of course the application may retry, but now it's the application responsibility to deal with the problems with duplication and failed messages.

663
01:06:10,000 --> 01:06:21,000
Okay, so here's the sort of the key point correct the fact that the failures basically makes your RPCs not identical to procedure calls.

664
01:06:21,000 --> 01:06:35,000
So you know that the goal is to make them look as similar as possible. They're actually not identical and really the thing that exposes that differences is the failures of the surface crashing.

665
01:06:35,000 --> 01:06:47,000
Any quick questions about this quick intro for RPC.

666
01:06:47,000 --> 01:06:59,000
So if not, then I want to stop the lecture here so that people that need to go or students need to go to the next class, they can go to the next class. I'll be hanging around. So if there's any more questions, I'll be happy to.

667
01:06:59,000 --> 01:07:03,000
To enter that and stick around for a little while.

668
01:07:03,000 --> 01:07:07,000
And meantime, enjoy lap one and good luck with it.

