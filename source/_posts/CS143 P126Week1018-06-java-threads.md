---
title: CS143 P126Week1018 06 Java Threads
---

1
00:00:00,000 --> 00:00:07,600
In this video, we're going to talk a little bit about concurrency and programming languages,

2
00:00:07,600 --> 00:00:11,519
and in particular, Java's use of threads.

3
00:00:11,519 --> 00:00:21,100
Java has concurrency built in through threads, and I'm not going to explain what a thread

4
00:00:21,100 --> 00:00:23,800
is from first principles in this video.

5
00:00:23,800 --> 00:00:27,719
So I'm going to assume a little bit of background, but we'll say a few words here about what threads

6
00:00:27,719 --> 00:00:28,719
are.

7
00:00:28,719 --> 00:00:31,399
So a thread is like its own program.

8
00:00:31,399 --> 00:00:35,839
It has its own program counter, meaning it has an instruction that it's executing, and

9
00:00:35,839 --> 00:00:39,239
it has its own set of local variables and activation records.

10
00:00:39,239 --> 00:00:44,679
And a Java program, or any program written in a language with threads, may have multiple

11
00:00:44,679 --> 00:00:46,079
threads at the same time.

12
00:00:46,079 --> 00:00:52,960
So abstractly, we can think of threads as being a series of statements that are executed.

13
00:00:52,960 --> 00:00:58,320
Each one of these threads, again, has its own set of local variables.

14
00:00:58,320 --> 00:01:02,960
But the threads may refer to common data in the heat, so they could refer to the same

15
00:01:02,960 --> 00:01:04,960
heap data structures.

16
00:01:04,960 --> 00:01:08,439
And each thread is executing a particular instruction.

17
00:01:08,439 --> 00:01:10,000
So let's say that the threads are all here.

18
00:01:10,000 --> 00:01:17,359
We have three threads, one, two, and three, and they're each at some instruction or some

19
00:01:17,359 --> 00:01:20,039
statement in the program.

20
00:01:20,039 --> 00:01:23,039
And then there is a scheduler.

21
00:01:23,040 --> 00:01:32,400
And at each step of execution, the scheduler will pick one thread to execute, and it'll

22
00:01:32,400 --> 00:01:34,000
execute one statement.

23
00:01:34,000 --> 00:01:42,440
And this is conceptual, meaning this is an exactly the way it's usually implemented.

24
00:01:42,440 --> 00:01:43,920
And then it will repeat this loop.

25
00:01:43,920 --> 00:01:46,920
So it'll pick a thread, it'll execute one statement of that thread, and it'll just keep

26
00:01:46,920 --> 00:01:48,560
doing that over and over again.

27
00:01:48,560 --> 00:01:52,920
So we might, for example, the schedule might pick thread one and execute this first statement.

28
00:01:52,920 --> 00:01:56,840
And then it might pick thread two and execute this statement.

29
00:01:56,840 --> 00:01:59,439
And then it might pick thread three and execute that statement.

30
00:01:59,439 --> 00:02:02,400
And then it might decide, well, it'll execute another statement of thread two.

31
00:02:02,400 --> 00:02:05,640
And then it might execute several statements of thread one.

32
00:02:05,640 --> 00:02:08,680
And then it might come back and execute a couple statements of thread three.

33
00:02:08,680 --> 00:02:12,639
And then thread two might get to go again for a while.

34
00:02:12,639 --> 00:02:13,639
And so on.

35
00:02:13,639 --> 00:02:18,039
All right, so the threads execute in some order.

36
00:02:18,039 --> 00:02:22,560
And it's non-deterministic at each step of execution, which thread will execute?

37
00:02:22,560 --> 00:02:26,479
How many of its instructions will be executed?

38
00:02:26,479 --> 00:02:32,120
And thus the threads may interleave the instructions when the thread is made interleave in a relatively

39
00:02:32,120 --> 00:02:35,039
or in fact completely arbitrary order.

40
00:02:35,039 --> 00:02:36,039
All right.

41
00:02:36,039 --> 00:02:41,640
Now, coming back to how this is done in Java, thread objects in Java all have class threads.

42
00:02:41,640 --> 00:02:45,640
So there's a special class that you have to inherit from an order to be a thread.

43
00:02:45,640 --> 00:02:51,199
And what you get when you inherit from a thread class is you will have start and stop methods

44
00:02:51,199 --> 00:02:53,679
for beginning and ending the thread.

45
00:02:53,679 --> 00:02:54,679
All right.

46
00:02:54,679 --> 00:02:57,639
And there's some other special properties of threads.

47
00:02:57,639 --> 00:03:03,839
And in particular, one thing that threads can do is to synchronize on objects.

48
00:03:03,839 --> 00:03:11,719
So a thread can acquire a lock on object through the synchronized construct.

49
00:03:11,719 --> 00:03:19,879
And so if I say synchronized XE in Java, what that means is that the program will acquire

50
00:03:19,879 --> 00:03:23,359
a lock on X before it executes E.

51
00:03:23,359 --> 00:03:33,799
So the procedure here will be to lock X, then evaluate E, and then unlock X.

52
00:03:33,799 --> 00:03:34,799
All right.

53
00:03:34,799 --> 00:03:37,199
So it's a structured synchronization construct.

54
00:03:37,199 --> 00:03:43,439
And within while it's executing the expression E, it will hold a lock on X.

55
00:03:43,439 --> 00:03:51,280
And this is the primary way, really almost the only way in Java, to get synchronization between

56
00:03:51,280 --> 00:03:52,599
multiple threads.

57
00:03:52,599 --> 00:03:57,079
So this is how we, when we can control the set of innerleavings, because while one thread

58
00:03:57,079 --> 00:04:03,639
is executing this particular block of code, no other thread can execute this block of

59
00:04:03,639 --> 00:04:06,960
code and also hold a lock on the same object X.

60
00:04:06,960 --> 00:04:12,360
Now, two threads could execute this same syntactic construct if they were locking, if they're

61
00:04:12,360 --> 00:04:14,840
local variables X, refer to different objects.

62
00:04:14,840 --> 00:04:19,319
But they're guaranteed not to interfere with each other, not to interleave if they try

63
00:04:19,319 --> 00:04:21,360
to lock the same object X.

64
00:04:21,360 --> 00:04:22,360
All right.

65
00:04:22,360 --> 00:04:27,400
Now, and then there's one shorthand in Java, which is used more commonly than this form

66
00:04:27,400 --> 00:04:28,560
of the synchronized construct.

67
00:04:28,560 --> 00:04:37,160
And as a synchronization can be put on methods, we can say synchronized F, where this is

68
00:04:37,160 --> 00:04:38,920
a method definition.

69
00:04:38,920 --> 00:04:40,680
All right.

70
00:04:40,680 --> 00:04:44,959
And what this means is that when this method is called, that this object will be locked.

71
00:04:44,959 --> 00:04:48,240
So here, the object that's going to be locked is implicit.

72
00:04:48,240 --> 00:04:53,199
And when synchronized is attached to a method name or method declaration, that always means

73
00:04:53,199 --> 00:04:59,720
that this parameter will be the synchronized or locked object.

74
00:04:59,720 --> 00:05:04,120
Let's take a look at a simple example and think about what happens if we have two methods,

75
00:05:04,120 --> 00:05:08,319
one of which calls the method two of the class simple and one of which calls the method

76
00:05:08,319 --> 00:05:09,319
fro.

77
00:05:09,399 --> 00:05:10,519
So let's take a look at that.

78
00:05:10,519 --> 00:05:15,480
Let's say we have thread one and we have thread two.

79
00:05:15,480 --> 00:05:21,680
And now thread one is going to invoke the method two and thread two is going to invoke

80
00:05:21,680 --> 00:05:22,680
the method fro.

81
00:05:22,680 --> 00:05:23,680
All right.

82
00:05:23,680 --> 00:05:29,360
So one possibility here, let's say that two gets to run all the way to completion before

83
00:05:29,360 --> 00:05:31,039
throw, excuse anything.

84
00:05:31,039 --> 00:05:34,839
So then we'll have a equals three and b equals four.

85
00:05:34,839 --> 00:05:35,839
Okay.

86
00:05:35,839 --> 00:05:45,279
And then fro will run and it will print out the string equals three, b equals four.

87
00:05:45,279 --> 00:05:47,479
Okay.

88
00:05:47,479 --> 00:05:50,839
So that's a relatively simple straightforward case.

89
00:05:50,839 --> 00:05:57,599
You know, another possibility is that thread two gets to run before thread one ever does

90
00:05:57,599 --> 00:05:58,599
anything.

91
00:05:58,599 --> 00:06:02,959
So thread two, excuse all of its instructions before thread one, excuse anything at all,

92
00:06:02,959 --> 00:06:05,399
in which case what will be printed.

93
00:06:05,399 --> 00:06:12,199
Well, the fro will print out a equals one, b equals two.

94
00:06:12,199 --> 00:06:13,359
All right.

95
00:06:13,359 --> 00:06:18,359
And two will then run and it'll set after this execute.

96
00:06:18,359 --> 00:06:23,879
So after this, after fro finishes executing, it will then set a equal to three and b equal

97
00:06:23,879 --> 00:06:24,879
to four.

98
00:06:24,879 --> 00:06:25,879
So that's another possibility.

99
00:06:25,879 --> 00:06:26,879
And both of those are fine.

100
00:06:26,879 --> 00:06:27,879
All right.

101
00:06:27,879 --> 00:06:28,879
But then there's some other odd possibilities.

102
00:06:28,879 --> 00:06:31,599
And let's take a look at one of those.

103
00:06:31,600 --> 00:06:37,680
What happens if the threads actually interleave in a non-trivial way?

104
00:06:37,680 --> 00:06:39,520
So let's consider the following possibility.

105
00:06:39,520 --> 00:06:45,000
Let's say that two executes the assignment a is equal to three.

106
00:06:45,000 --> 00:06:50,320
And now fro executes the first part of the print.

107
00:06:50,320 --> 00:06:56,280
So it does the read of a and starts building up this output string.

108
00:06:56,280 --> 00:06:57,280
Okay.

109
00:06:57,279 --> 00:07:03,000
So it's going to print out here a is equal to three.

110
00:07:03,000 --> 00:07:05,279
All right.

111
00:07:05,279 --> 00:07:09,479
And then now let's say that fro actually goes ahead and gets to run some more and also

112
00:07:09,479 --> 00:07:12,599
goes ahead and prints out the rest of this.

113
00:07:12,599 --> 00:07:13,599
Okay.

114
00:07:13,599 --> 00:07:15,839
So it actually does the second read of b.

115
00:07:15,839 --> 00:07:19,519
So then it will print b is equal to two.

116
00:07:19,519 --> 00:07:22,559
All right.

117
00:07:22,560 --> 00:07:29,000
And then one will run the rest of the way through, excuse me, b is equal to four.

118
00:07:29,000 --> 00:07:32,680
And so here we got an output that doesn't seem quite right.

119
00:07:32,680 --> 00:07:40,360
Here we got we were able to see an intermediate state where thread one had only executed partially.

120
00:07:40,360 --> 00:07:48,720
And so what came out over here in fro show you just a partial update of the variables a

121
00:07:48,720 --> 00:07:49,720
and b.

122
00:07:49,720 --> 00:07:52,000
So one had been written but not the other.

123
00:07:52,000 --> 00:07:56,879
And if we didn't want to do that if we thought this was wrong, we would have to use synchronization

124
00:07:56,879 --> 00:07:58,519
in order to control that.

125
00:07:58,519 --> 00:08:04,199
So let's take a look then at using synchronization to try to prevent this from happening.

126
00:08:04,199 --> 00:08:09,319
And I'll tell you right up front that this piece of code or this attempt is incorrect.

127
00:08:09,319 --> 00:08:11,439
And actually doesn't solve the problem at all.

128
00:08:11,439 --> 00:08:17,120
But it also illustrates probably the most common thread programming error that Java programmers

129
00:08:17,120 --> 00:08:18,120
make.

130
00:08:18,120 --> 00:08:23,120
People including professional programmers make this mistake and lots of production Java

131
00:08:23,120 --> 00:08:26,800
programs have this particular mistake in them.

132
00:08:26,800 --> 00:08:30,040
So it's a very instructive example I think.

133
00:08:30,040 --> 00:08:31,040
So let's take a look here.

134
00:08:31,040 --> 00:08:33,679
So we have the two threads again.

135
00:08:33,679 --> 00:08:38,519
The thread that's going to call two and the thread that's going to call fro.

136
00:08:38,519 --> 00:08:42,120
And let's say that in our heap there is only one object simple.

137
00:08:42,120 --> 00:08:44,879
And let's just call it s.

138
00:08:44,879 --> 00:08:51,559
So it's globally in the entire heap just one object s of the simple class.

139
00:08:51,559 --> 00:08:55,639
So what is, let's say that thread one is going to go first.

140
00:08:55,639 --> 00:09:01,120
And the first thing is going to do because it's a synchronized method is it's going to lock

141
00:09:01,120 --> 00:09:02,439
to this parameter of the call.

142
00:09:02,439 --> 00:09:07,679
Since there's only one simple, only one object of the simple class that has to be the object

143
00:09:07,679 --> 00:09:08,679
s.

144
00:09:08,679 --> 00:09:10,440
So it's going to lock s.

145
00:09:10,440 --> 00:09:16,220
And that will prevent any other thread from acquiring the lock on s while thread one

146
00:09:16,220 --> 00:09:18,240
holds that lock.

147
00:09:18,240 --> 00:09:22,720
So then thread one could go ahead and execute the statement equals three.

148
00:09:22,720 --> 00:09:26,640
And now though we could have an interruption and thread two could get to run.

149
00:09:26,640 --> 00:09:30,160
And notice here that thread two doesn't check the lock.

150
00:09:30,160 --> 00:09:35,360
It goes ahead and executes this code over here in the fro method.

151
00:09:35,360 --> 00:09:36,560
But that's not synchronized.

152
00:09:36,560 --> 00:09:38,560
There's no synchronized keyword there.

153
00:09:38,559 --> 00:09:45,119
And so just the fact that somebody else holds the lock on a simple object doesn't prevent

154
00:09:45,119 --> 00:09:50,919
another method from accessing the fields or the date of that object.

155
00:09:50,919 --> 00:09:54,439
If that other method doesn't itself check the lock.

156
00:09:54,439 --> 00:10:01,359
So if the other method is not synchronized, it will just go ahead and execute ignoring

157
00:10:01,359 --> 00:10:06,159
the fact that another thread holds the lock on the object.

158
00:10:06,159 --> 00:10:13,439
So in this case, this will just run the completion and we'll print out a equals three b equals

159
00:10:13,439 --> 00:10:14,439
two.

160
00:10:14,439 --> 00:10:18,679
Okay, so we only see one of the two updates.

161
00:10:18,679 --> 00:10:28,279
And then the scheduler could come back in, let the other thread run and we'll run the completion

162
00:10:28,279 --> 00:10:32,720
and unlock the object at the end.

163
00:10:32,720 --> 00:10:37,879
And you can see here that this particular attempted fix has achieved nothing.

164
00:10:37,879 --> 00:10:44,759
Actually all the possible interleavings of the two methods that existed without any synchronization

165
00:10:44,759 --> 00:10:47,879
still exist if only one of the two methods is synchronized.

166
00:10:47,879 --> 00:10:54,440
And the reason this error is common is because frequently people think, well, reads are okay.

167
00:10:54,440 --> 00:10:59,080
I can always read from things in parallel and that won't cause any problems because I'm

168
00:10:59,080 --> 00:11:00,320
not altering any data.

169
00:11:00,320 --> 00:11:02,800
That's my rights that have to be synchronized.

170
00:11:02,800 --> 00:11:08,400
So if I'm going to write to fields of objects, well, that needs to be coordinated with other

171
00:11:08,400 --> 00:11:13,320
methods because rights are dangerous, but read somehow don't interfere.

172
00:11:13,320 --> 00:11:19,480
And the point here is that if having only one method or only having one half of the accesses

173
00:11:19,480 --> 00:11:27,360
to the two accesses to shared data be synchronized doesn't help because synchronization only works

174
00:11:27,360 --> 00:11:29,880
if everybody is checking the lock.

175
00:11:29,879 --> 00:11:35,320
So both the reader and the writer need to check the lock in order to restrict the set of

176
00:11:35,320 --> 00:11:38,360
possible interleavings of these two methods.

177
00:11:38,360 --> 00:11:39,720
So what would be a correct way to do it?

178
00:11:39,720 --> 00:11:43,600
Well, it's to put the synchronized keyword on both methods.

179
00:11:43,600 --> 00:11:47,080
And now it's not possible to have the interleaving we saw before.

180
00:11:47,080 --> 00:11:50,720
So now there's only two possible outputs.

181
00:11:50,720 --> 00:11:54,720
One and only two possible strings that could be printed.

182
00:11:54,720 --> 00:11:58,759
One is that A is equal to one and B is equal to two.

183
00:11:58,759 --> 00:12:03,480
So in this case, the fro method executes before the two methods.

184
00:12:03,480 --> 00:12:06,519
So that's a fro before two.

185
00:12:06,519 --> 00:12:11,319
Okay, I mean all of fro before all of the two methods.

186
00:12:11,319 --> 00:12:15,120
And the other possibility is A is equal to three.

187
00:12:15,120 --> 00:12:17,120
B is equal to four.

188
00:12:17,120 --> 00:12:25,000
All right, and that would be the two method executing an instantiard before the fro method.

189
00:12:25,000 --> 00:12:30,120
So those become the only two possible interleavings when both methods here are synchronized.

190
00:12:30,120 --> 00:12:37,120
I'm going to conclude this video by making a couple of other comments on Java's threats.

191
00:12:37,120 --> 00:12:42,039
So one property we would like is that even if there is no synchronization, a variable should

192
00:12:42,039 --> 00:12:45,720
only hold values that were actually written by some threads.

193
00:12:45,720 --> 00:12:47,000
So what do I mean by that?

194
00:12:47,000 --> 00:12:50,759
Let's say that we have two assignments.

195
00:12:50,759 --> 00:12:54,879
This is in thread one where we're assigning A to the value of 3.14.

196
00:12:54,879 --> 00:13:00,279
And then in thread two, we're assigning A to the value of 2.78.

197
00:13:00,279 --> 00:13:05,319
And so after these assignments are done, after they've executed in some order, what do we expect?

198
00:13:05,319 --> 00:13:11,240
Well, we expect that A ends up being equal either to 3.14 or 2.78.

199
00:13:11,240 --> 00:13:12,240
All right?

200
00:13:12,240 --> 00:13:16,840
Now what we don't want is for A to wind up being some other value.

201
00:13:16,840 --> 00:13:17,840
Okay?

202
00:13:17,840 --> 00:13:22,320
A turned out to be 3.78, for example.

203
00:13:22,320 --> 00:13:23,320
Okay?

204
00:13:23,320 --> 00:13:24,320
This would be bad.

205
00:13:24,320 --> 00:13:26,720
We don't want this, right?

206
00:13:26,720 --> 00:13:31,320
Because this value, 3.78, was never written by either thread.

207
00:13:31,320 --> 00:13:32,320
Okay?

208
00:13:32,320 --> 00:13:33,320
This value was somehow manufactured.

209
00:13:33,320 --> 00:13:38,560
And I chose 3.78 to kind of indicate what could potentially go wrong.

210
00:13:38,560 --> 00:13:44,040
If we somehow wound up with a mix of the bits or the pieces of the number from thread

211
00:13:44,039 --> 00:13:49,199
one and thread two, if they were recombined in some strange way, then we could create a

212
00:13:49,199 --> 00:13:54,559
number that was assigned to A that didn't exist in either thread.

213
00:13:54,559 --> 00:13:55,559
Okay?

214
00:13:55,559 --> 00:13:58,079
It was never actually written in either thread.

215
00:13:58,079 --> 00:14:03,079
Now Java does guarantee that the rights of values are atomic, meaning if I write to

216
00:14:03,079 --> 00:14:07,959
a value, if I sign a primitive type to something, that is going to happen atomically and won't

217
00:14:07,959 --> 00:14:13,679
be interfered with by another assignment to the same memory location, except for floating

218
00:14:13,679 --> 00:14:14,679
point doubles.

219
00:14:14,679 --> 00:14:19,599
So this does not hold, rights to doubles are not necessarily atomic.

220
00:14:19,599 --> 00:14:21,120
Now why would that be?

221
00:14:21,120 --> 00:14:26,599
Well, a double is a floating point number, but it consumes twice the memory.

222
00:14:26,599 --> 00:14:29,639
That's why it's called a double, it consumes two words.

223
00:14:29,639 --> 00:14:30,639
Okay?

224
00:14:30,639 --> 00:14:36,639
And what that means is that if A here is a double, so let's assume that A is a double,

225
00:14:36,639 --> 00:14:42,319
that means if this right of 3.14 actually translates into two machine instructions, we

226
00:14:42,320 --> 00:14:50,000
have to write the high part of A equals something and then the low part of A. So it will be two

227
00:14:50,000 --> 00:14:55,940
machine instructions to write both of the words that represent A, have to write the high

228
00:14:55,940 --> 00:15:01,280
half and the low half, okay, because there isn't a primitive double word right on most

229
00:15:01,280 --> 00:15:03,080
machines.

230
00:15:03,080 --> 00:15:07,040
And the same thing would happen in thread 2, this would get broken up into two assignments

231
00:15:07,040 --> 00:15:08,240
to the two halves of A.

232
00:15:08,240 --> 00:15:11,840
And then just from what we discussed before, you can see that these could interleave in some

233
00:15:11,840 --> 00:15:19,040
way and you might wind up with the unfortunate situation that the high half of the representation

234
00:15:19,040 --> 00:15:24,040
of A is written by thread 1 and the low half is written by thread 2 and then you could get

235
00:15:24,040 --> 00:15:30,280
a number like this, like something not exactly 3.78, but some mix of the bits from the

236
00:15:30,280 --> 00:15:34,360
right and thread 1 and there's the right of thread 2 and you would create what's called

237
00:15:34,360 --> 00:15:38,759
an out of thin air value.

238
00:15:38,759 --> 00:15:46,759
Okay, and clearly out of thin air values are bad, okay, you do not want those and Java

239
00:15:46,759 --> 00:15:50,639
guarantees again that the rights of almost all the primitive data types are going to be

240
00:15:50,639 --> 00:15:53,759
atomic, so you can't get out of thin air values.

241
00:15:53,759 --> 00:16:00,000
But for performance reasons, this is not the case for doubles, all right, so folks, so

242
00:16:00,000 --> 00:16:05,200
as I, what this says in the manual is that as a concession to current hardware, they

243
00:16:05,200 --> 00:16:12,200
do not require that rights to doubles be atomic unless you, the programmer, go and mark

244
00:16:12,200 --> 00:16:18,800
the type as volatile, so you have to declare doubles to be volatile and if you do that, then

245
00:16:18,800 --> 00:16:23,720
they're guaranteed to be atomic rights, okay, so if you were writing Java programs using

246
00:16:23,720 --> 00:16:30,920
Java threads and you're programming threads that read and write doubles concurrently, then

247
00:16:30,919 --> 00:16:35,120
you need to be careful to declare those double values volatile at least currently and

248
00:16:35,120 --> 00:16:38,519
this may change in the future and I'm sure they would like to change it.

249
00:16:38,519 --> 00:16:42,519
But currently you have to declare the doubles volatile to guarantee that the rights will

250
00:16:42,519 --> 00:16:45,199
be atomic.

251
00:16:45,199 --> 00:16:50,360
More generally, there are actually so much separately, there's a separate point here.

252
00:16:50,360 --> 00:16:54,360
Java concurrency semantics are actually kind of hard to understand in detail and this

253
00:16:54,360 --> 00:16:59,599
issue around out of thin air values is one aspect of this.

254
00:16:59,600 --> 00:17:07,839
There are several other aspects of it and this is really not Java's fault.

255
00:17:07,839 --> 00:17:11,480
It turns out that concurrency semantics are hard and actually this is kind of at the

256
00:17:11,480 --> 00:17:12,880
frontier of research.

257
00:17:12,880 --> 00:17:20,039
We don't really understand exactly what we want or what the right thing is to do to specify

258
00:17:20,039 --> 00:17:26,039
the behavior of languages in concurrent settings and that's not to say that we don't understand

259
00:17:26,039 --> 00:17:27,039
anything.

260
00:17:27,039 --> 00:17:30,240
We do have some languages with perfectly good concurrency semantics but in a language

261
00:17:30,240 --> 00:17:37,279
as full and rich features as Java, there are a number of things that are not completely

262
00:17:37,279 --> 00:17:42,039
clear how they should be implemented on certain machines and there's been a huge amount

263
00:17:42,039 --> 00:17:47,399
of work done on this problem specifically for Java and actually Java was the first mainstream

264
00:17:47,399 --> 00:17:53,159
language to have first class threads in it and to try to integrate that with all the other

265
00:17:53,160 --> 00:17:56,840
language features that all the other modern language features that we like.

266
00:17:56,840 --> 00:18:02,600
It's not surprising actually that we've run into some trouble understanding how they're

267
00:18:02,600 --> 00:18:04,240
supposed to work in all situations.

268
00:18:04,240 --> 00:18:11,720
This is one area of Java that I would say is still under debate and while if you do relatively

269
00:18:11,720 --> 00:18:16,040
straightforward things with threads, everything will work fine.

270
00:18:16,040 --> 00:18:21,320
There are some areas of the language where if you try to use them with threads, you can

271
00:18:21,319 --> 00:18:23,919
get into a little bit of trouble.

272
00:18:23,919 --> 00:18:29,000
So it surely pays to try to understand Java concurrency and the threads if you're writing

273
00:18:29,000 --> 00:18:53,279
significant concurrent Java programs.

