---
title: CMU15445 P17F202316 Two PhaseLockingConcurrencyControl
---

1
00:00:00,000 --> 00:00:28,519
Thank you DJ, that's great.

2
00:00:28,519 --> 00:00:35,240
So did you have any takers for your Tiki Bar thing and the other performances that you had?

3
00:00:35,240 --> 00:00:40,039
I thought I was going to pay no attention.

4
00:00:40,039 --> 00:00:42,000
Okay, okay, that's great.

5
00:00:42,000 --> 00:00:49,640
All right, so we are going to get started and needed to clean up a couple things that from

6
00:00:49,640 --> 00:00:51,039
last lecture.

7
00:00:51,039 --> 00:00:57,239
Remember this slide where we are looking at the interleaving when we are thinking about schedules

8
00:00:57,240 --> 00:01:03,320
and we had this schedule and this schedule is actually a correct schedule, right, even though

9
00:01:03,320 --> 00:01:12,120
there is interleaving because T1 makes change to A, then T2 makes change to A by giving 6%

10
00:01:12,120 --> 00:01:13,120
interest.

11
00:01:13,120 --> 00:01:19,200
T1 then comes back and makes changes to B, so puts back the $100 from A to B. So now A and

12
00:01:19,200 --> 00:01:21,879
B, the sum of that is consistent.

13
00:01:21,879 --> 00:01:28,280
So now when T2 goes and adds 6% interest to B, this correct, even though there was interleaving,

14
00:01:28,280 --> 00:01:33,159
that interleaving was safe and you ended up with one of the two legitimate ways in which

15
00:01:33,159 --> 00:01:39,519
to do this transaction because you had the right final value in the database.

16
00:01:39,519 --> 00:01:45,159
Okay, so even though this interleaving at first seems like, oh, it shouldn't work out, if

17
00:01:45,159 --> 00:01:49,319
this B happened before this read of B, then we would be off.

18
00:01:49,319 --> 00:01:51,159
Okay, does that make sense?

19
00:01:51,159 --> 00:01:59,560
The bottom value will still be the same because this is the same as having run T1 followed

20
00:01:59,560 --> 00:02:01,280
by T2 and that is the whole point.

21
00:02:01,280 --> 00:02:03,640
This schedule is okay, all right.

22
00:02:03,640 --> 00:02:08,840
So the main point is some interleaving is okay, some interleaving is not and the whole

23
00:02:08,840 --> 00:02:13,840
purpose with what we will talk about today is when to determine, is there a mechanism

24
00:02:13,840 --> 00:02:17,199
to go and determine how to make everything safe.

25
00:02:17,199 --> 00:02:23,679
The next slide was something that is not safe, which is essentially, T1 starts to make

26
00:02:23,679 --> 00:02:31,399
change to A, then T2 starts to make changes to both A and B and then T1 makes the remaining

27
00:02:31,399 --> 00:02:37,679
change that needed to make in its transaction to B and so bad value for A was seen by T2

28
00:02:37,679 --> 00:02:42,560
and the final result for the values of A and B doesn't correspond to anyone of the serial

29
00:02:42,560 --> 00:02:43,560
schedules.

30
00:02:43,560 --> 00:02:48,360
So we talked about why specifically that T2 is equal to like that, the specific number

31
00:02:48,360 --> 00:02:55,159
was okay and like how we have to determine specifically that value.

32
00:02:55,159 --> 00:02:58,120
We talked about that last class, but let me go back to that, right?

33
00:02:58,120 --> 00:03:02,719
So the whole definition because it's important, the whole definition of serial schedule is

34
00:03:02,719 --> 00:03:10,759
that if I've got these two transactions, T1 and T2 and I can have a schedule in which T1

35
00:03:10,759 --> 00:03:14,840
runs followed by T2 and I'll get a certain number or vice versa.

36
00:03:14,840 --> 00:03:21,479
So here is the diagram which we'll come back again in a different form in a little bit

37
00:03:21,479 --> 00:03:23,399
in about 40 minutes from now.

38
00:03:23,399 --> 00:03:29,959
Let me just go to that slide in which we had the serial schedule, skip, skip, skip.

39
00:03:29,959 --> 00:03:33,719
I guess what I was saying, what is there not that?

40
00:03:33,719 --> 00:03:39,079
If you remember to, and then there's all of these things, but the point would be 3D.

41
00:03:39,080 --> 00:03:40,719
Yeah, that's, so okay.

42
00:03:40,719 --> 00:03:43,560
So this is the motion of correctness.

43
00:03:43,560 --> 00:03:48,400
So the question is, T1 followed by T2, there were two possible ways in which the database

44
00:03:48,400 --> 00:03:50,280
could end up with, right?

45
00:03:50,280 --> 00:03:52,680
And what we are saying is both of them are correct.

46
00:03:52,680 --> 00:03:57,960
Both are not correct because we are operating under the serializable assumption that these

47
00:03:57,960 --> 00:03:59,760
are conflict serializable.

48
00:03:59,760 --> 00:04:04,200
If we were to say strictly serializable that there's only one order T1 followed by T2 because

49
00:04:04,199 --> 00:04:11,799
T1 started first, that would be a more restrictive form of a concurrency control and we wouldn't

50
00:04:11,799 --> 00:04:15,519
allow as much parallelism with transactions overlapping with each other.

51
00:04:15,519 --> 00:04:17,399
So we are doing something that seems funny.

52
00:04:17,399 --> 00:04:23,839
We are saying it's okay if T1 came first, but the way in which the database state is,

53
00:04:23,839 --> 00:04:27,800
looks like T2 ran all of it followed by T1 and that order is okay.

54
00:04:27,800 --> 00:04:33,560
So we are accepting that little discrepancy because we want to allow more parallelization.

55
00:04:33,560 --> 00:04:36,959
If we didn't want to, we could do something, we can come up with a new concurrency control

56
00:04:36,959 --> 00:04:41,800
protocol in which a simple one, not a good idea, but a simple one that will work with that

57
00:04:41,800 --> 00:04:48,000
intuitive notion is say if T1 arrives before T2, T1 locks the entire database and then T2

58
00:04:48,000 --> 00:04:49,000
runs.

59
00:04:49,000 --> 00:04:53,199
That was the default mechanism by which we would get this isolation property, but it

60
00:04:53,199 --> 00:04:54,199
would work.

61
00:04:54,199 --> 00:04:58,800
Everything would seem logical, but you wouldn't allow enough parallelism in the system.

62
00:04:59,360 --> 00:05:05,759
Okay, and as I mentioned last time is Spanner has this notion where this T1 followed by T2

63
00:05:05,759 --> 00:05:07,000
is feeling odd, right?

64
00:05:07,000 --> 00:05:12,040
Because we are saying a schedule in which T2 finishes and changes the state of the database

65
00:05:12,040 --> 00:05:18,120
and T1 runs is a fine final state for the database that seems odd because T1 arrives first

66
00:05:18,120 --> 00:05:20,000
in all the examples we have.

67
00:05:20,000 --> 00:05:26,840
So Spanner has this additional notion of strict serializable in which it says if they arrive

68
00:05:26,839 --> 00:05:31,239
in a certain order, then we will actually make it more meaningful while still in a long

69
00:05:31,239 --> 00:05:32,239
parallelism.

70
00:05:32,239 --> 00:05:36,919
The protocol is really complicated and I flashed that slide at the end to say if you're interested

71
00:05:36,919 --> 00:05:40,639
go take a look at that paper and there's all kinds of interesting stuff.

72
00:05:40,639 --> 00:05:45,439
And Cockroach DB is Spanner like, but doesn't require the atomic clocks that Spanner requires.

73
00:05:45,439 --> 00:05:50,000
They actually Google keeps the data centers synced the clocks on each of those synced

74
00:05:50,000 --> 00:05:54,719
that allows them to figure out how much should I hold back a transaction so that I can know

75
00:05:54,720 --> 00:05:58,280
if some of the transactions started in real time before it so that you're done in the

76
00:05:58,280 --> 00:05:59,280
same time order.

77
00:05:59,280 --> 00:06:03,920
So it's complicated and take the advanced database class for that but the confusion you

78
00:06:03,920 --> 00:06:07,520
having and the questions that you guys are asking is like, doesn't it seem failed

79
00:06:07,520 --> 00:06:08,520
weird?

80
00:06:08,520 --> 00:06:14,080
It does feel weird because we are operating under this more relaxed notion of a conflict

81
00:06:14,080 --> 00:06:15,080
serializer.

82
00:06:15,080 --> 00:06:20,680
We are saying we'll allow these schedules because the performance that we need is high enough

83
00:06:20,680 --> 00:06:24,079
and the change in semantics is reasonable that we think applications are going to be

84
00:06:24,079 --> 00:06:25,079
fine with it.

85
00:06:25,079 --> 00:06:32,319
So this is a universal result or like solution.

86
00:06:32,319 --> 00:06:33,319
Yeah.

87
00:06:33,319 --> 00:06:37,160
So the question is what's the universe of solutions if there's a universe of schedules?

88
00:06:37,160 --> 00:06:41,680
They will mirror that because conflict serializable will give a certain set of potential solutions

89
00:06:41,680 --> 00:06:42,759
for the end database, right?

90
00:06:42,759 --> 00:06:46,439
If you have two transactions, anyone of those two, if there are three, the permutation

91
00:06:46,439 --> 00:06:47,439
of that.

92
00:06:47,680 --> 00:06:51,439
It also embodies what's final state of the database if you had concurrent actions.

93
00:06:51,439 --> 00:06:52,439
They mirror each other.

94
00:06:52,439 --> 00:06:59,319
So if I understand your question correct, it's about like what can you say about the

95
00:06:59,319 --> 00:07:01,680
properties of the final values in the database?

96
00:07:01,680 --> 00:07:03,519
They exactly are the definition of this.

97
00:07:03,519 --> 00:07:04,879
They are one and the same.

98
00:07:04,879 --> 00:07:05,879
Yep.

99
00:07:05,879 --> 00:07:07,120
All right.

100
00:07:07,120 --> 00:07:12,159
Other questions on this before we move on to the topic for today?

101
00:07:12,159 --> 00:07:15,399
We'll come back to this diagram in a different form.

102
00:07:15,399 --> 00:07:20,599
So let's close this out and bring up the next deck.

103
00:07:20,599 --> 00:07:22,399
All right.

104
00:07:22,399 --> 00:07:31,000
So today we'll talk about two-faced locking and the part that we will worry about is how

105
00:07:31,000 --> 00:07:32,759
do we make all of these mechanisms happen?

106
00:07:32,759 --> 00:07:35,239
We talked about dependence graphs in the last slide.

107
00:07:35,239 --> 00:07:39,560
But before we jump into today's topic, just there was a request for Project 3 to push

108
00:07:39,560 --> 00:07:42,679
back the date because we were a few days out in getting that to you.

109
00:07:42,680 --> 00:07:44,560
So we moved it back by seven days.

110
00:07:44,560 --> 00:07:46,120
Hopefully you don't need all the seven days.

111
00:07:46,120 --> 00:07:48,120
But if you do, you have it.

112
00:07:48,120 --> 00:07:51,959
As I mentioned in the last class, there are lots of moving parts in the project.

113
00:07:51,959 --> 00:07:55,199
So don't wait till like two days before the deadline to do it.

114
00:07:55,199 --> 00:07:59,000
It will seem harder than it is if you wait that long.

115
00:07:59,000 --> 00:08:00,000
Okay.

116
00:08:00,000 --> 00:08:02,000
Knock out the simple things first.

117
00:08:02,000 --> 00:08:08,840
Humber 4 got pushed out earlier today and that's due on November 12th.

118
00:08:08,840 --> 00:08:09,840
All right.

119
00:08:10,479 --> 00:08:10,839
Okay.

120
00:08:10,839 --> 00:08:14,519
So let's jump into the topic for today.

121
00:08:14,519 --> 00:08:19,919
We will concern ourselves with this conflict serializable class of schedules that we want

122
00:08:19,919 --> 00:08:21,599
to allow.

123
00:08:21,599 --> 00:08:25,519
And remember, we also talked about view serializable in which if I knew a little bit about the application

124
00:08:25,519 --> 00:08:30,719
semantics, I could allow a few more schedules, that tends to be very hard to enforce and practice

125
00:08:30,719 --> 00:08:36,559
no one does that, but the textbooks have it so that you just know what those things are.

126
00:08:36,559 --> 00:08:38,959
It's good to understand that.

127
00:08:38,960 --> 00:08:43,000
But we'll focus on conflict serializable and how do we make that work.

128
00:08:43,000 --> 00:08:48,040
So last class, we said, if you start to draw the dependence graph, you see a cycle we

129
00:08:48,040 --> 00:08:49,840
are in trouble, right?

130
00:08:49,840 --> 00:08:54,360
But how do you draw the cycle and we are drawing the cycle after the schedule was done?

131
00:08:54,360 --> 00:08:56,000
So it's like, is it too late?

132
00:08:56,000 --> 00:08:58,840
How do you make sure that these cycles don't form?

133
00:08:58,840 --> 00:09:02,759
AKA, give us this notion of correctness that we are looking for, right?

134
00:09:02,759 --> 00:09:04,400
When is it safe to interleave actions?

135
00:09:04,400 --> 00:09:06,240
So that's what we'll talk about.

136
00:09:06,240 --> 00:09:09,080
And there are multiple ways to do it.

137
00:09:09,080 --> 00:09:14,639
We're going to talk about locks as a mechanism to do that today.

138
00:09:14,639 --> 00:09:19,360
And if you remember last class, we said there are two broad classes of algorithms.

139
00:09:19,360 --> 00:09:22,200
One is pessimistic and the other one is optimistic.

140
00:09:22,200 --> 00:09:23,200
Locks are optimistic.

141
00:09:23,200 --> 00:09:25,200
Locks are sorry, pessimistic.

142
00:09:25,200 --> 00:09:29,720
They will try to stop a cycle from forming very early on.

143
00:09:29,720 --> 00:09:34,200
And when we talk about optimistic, conference control protocols in the next class, we'll

144
00:09:34,200 --> 00:09:35,519
see they will do the opposite.

145
00:09:35,519 --> 00:09:37,720
They'll say, let everything go.

146
00:09:37,720 --> 00:09:41,840
And in the end, I will check if something is unsafe, I know how to back out of the unsafe

147
00:09:41,840 --> 00:09:42,840
parts.

148
00:09:42,840 --> 00:09:47,879
And locking says, if two things are trying to conflict with each other, they will probably

149
00:09:47,879 --> 00:09:48,879
do bad things.

150
00:09:48,879 --> 00:09:50,960
Let me stop them at first touch.

151
00:09:50,960 --> 00:09:56,079
So that's what we will talk about today, the lock based pessimistic, concurrency control

152
00:09:56,079 --> 00:09:58,000
mechanisms.

153
00:09:58,000 --> 00:09:59,559
So what does it mean?

154
00:09:59,559 --> 00:10:03,039
You played around with latches, which you did in your very first C++ assignment.

155
00:10:03,039 --> 00:10:06,319
At that time, you were protecting a data structure in memory.

156
00:10:06,319 --> 00:10:09,719
You put mechanism, the latch mechanism.

157
00:10:09,719 --> 00:10:13,279
So that two threads, if they're trying to make changes, that would have destroyed the data

158
00:10:13,279 --> 00:10:15,199
structure, left it in a corrupt state.

159
00:10:15,199 --> 00:10:16,719
That doesn't happen.

160
00:10:16,719 --> 00:10:19,799
Locks do the same thing, but for database stuff.

161
00:10:19,799 --> 00:10:24,199
And what locks, the way you would do things with locks is imagine I have a schedule, I'm

162
00:10:24,199 --> 00:10:25,279
reading and writing objects.

163
00:10:25,279 --> 00:10:29,399
So here, you see true transaction, Steve, on NT2.

164
00:10:29,399 --> 00:10:32,799
And what we'll do is we will put locks.

165
00:10:32,799 --> 00:10:39,079
Before we read or write an object, we will acquire the lock before we make that read or write

166
00:10:39,079 --> 00:10:40,079
operation.

167
00:10:40,079 --> 00:10:42,159
And locks will come in different forms.

168
00:10:42,159 --> 00:10:43,439
We'll get to that in a second.

169
00:10:43,439 --> 00:10:47,120
But now just as you, before we read A, we will apply the lock.

170
00:10:47,120 --> 00:10:52,839
And as you see transaction, T1, as it goes a bit further down, after it is done with all

171
00:10:52,839 --> 00:10:57,279
the stuff it needed to make changes to the lock, it doesn't unlock.

172
00:10:57,279 --> 00:11:02,159
Very much like what we've been using with the latches in the data structures you were trying

173
00:11:02,159 --> 00:11:03,159
to protect.

174
00:11:03,159 --> 00:11:05,839
And similarly, T2 will follow that same protocol.

175
00:11:05,839 --> 00:11:11,879
And so effectively, there's this lock manager, which maintains a data structure.

176
00:11:11,879 --> 00:11:17,159
And it's going to get requests for saying, here's the object I want to lock.

177
00:11:17,159 --> 00:11:20,279
And as you'll see in a little bit, it'll also have information about the mode in which

178
00:11:20,279 --> 00:11:22,159
it wants to lock, exclusive and shared.

179
00:11:22,159 --> 00:11:23,879
And saying, here's who I am.

180
00:11:23,879 --> 00:11:25,279
I'm transaction T.

181
00:11:25,279 --> 00:11:27,639
And please lock this object for me.

182
00:11:27,639 --> 00:11:30,360
We won't get into the details of what that lock manager looks like.

183
00:11:30,360 --> 00:11:35,519
But it's often organized as a hash table on the object ID that is being locked.

184
00:11:35,519 --> 00:11:42,060
And then it will keep track of all the lock holders or holders who are requests to become

185
00:11:42,060 --> 00:11:44,840
lock holders that have been put on a pending queue.

186
00:11:44,840 --> 00:11:49,399
That's all I'll say about the lock data structure, how to maintain that and do that efficiently.

187
00:11:49,399 --> 00:11:50,720
Is this super interesting topic?

188
00:11:50,720 --> 00:11:54,039
If you are interested in those details, we can talk offline.

189
00:11:54,039 --> 00:11:57,320
So it's a structure that's going to keep track of the locks.

190
00:11:57,320 --> 00:12:01,960
And then at some point here, for example, that second lock request is to the same object

191
00:12:01,960 --> 00:12:05,960
A. A is being held already by transaction T1.

192
00:12:05,960 --> 00:12:07,480
So that's what the lock manager will do.

193
00:12:07,480 --> 00:12:10,560
It'll say, whoops, you made that request.

194
00:12:10,560 --> 00:12:12,160
I can't grant you that request.

195
00:12:12,160 --> 00:12:17,240
So transaction T2 gets blocked till that later point in time where the unlock request from

196
00:12:17,240 --> 00:12:22,080
T1 comes in, the locks now open and T2 can get that request.

197
00:12:22,080 --> 00:12:28,440
So same thing as you have with latches, locks are doing this here for database objects.

198
00:12:28,440 --> 00:12:29,440
Okay.

199
00:12:29,440 --> 00:12:34,040
This is said for now, you can just assume these objects A, B and C are records, but towards

200
00:12:34,040 --> 00:12:39,160
the end of the class, we'll talk about locking at different granularities and so on.

201
00:12:39,160 --> 00:12:42,440
This transaction process and the lock manager will do its thing.

202
00:12:42,440 --> 00:12:43,440
All right.

203
00:12:43,440 --> 00:12:45,280
So today we'll talk about these different lock types.

204
00:12:45,280 --> 00:12:49,000
We'll talk about a protocol called two-phase locking.

205
00:12:49,000 --> 00:12:52,960
And then we'll talk about some of the bad things that can happen when you do locking called

206
00:12:52,960 --> 00:12:55,639
deadlocks and how we get around that.

207
00:12:55,639 --> 00:13:00,679
And then time permitting will get to the hierarchical locking where we lock at different levels

208
00:13:00,679 --> 00:13:09,320
in the tree, entire database, a table, a page, a record or even a column in a record.

209
00:13:09,320 --> 00:13:14,759
Before we go, if you've taken an operating system class, you'll probably find the terminology

210
00:13:14,759 --> 00:13:20,439
over here confusing where when database folks talk about locks, they're talking about

211
00:13:20,439 --> 00:13:25,759
things that you're doing to protect objects, database objects that sit on disk and have

212
00:13:25,759 --> 00:13:30,919
a lifespan beyond its life and memory.

213
00:13:30,919 --> 00:13:35,360
We call latches as the things that we want to protect in memory.

214
00:13:35,360 --> 00:13:38,039
So this terminology is super important.

215
00:13:38,039 --> 00:13:40,720
So let's just go through what the differences are.

216
00:13:40,720 --> 00:13:44,399
And for the longest time, the database folks could never talk to the operating system folks

217
00:13:44,399 --> 00:13:48,399
because you'd get into like 80s and 90s and you'd say, I'm locking stuff and for them,

218
00:13:48,399 --> 00:13:52,240
it was locking is the same as latching and the terminology was just way off.

219
00:13:52,240 --> 00:13:56,679
But this is, even if you become an operating systems person, try to use the better terms

220
00:13:56,679 --> 00:13:59,240
because they're very different.

221
00:13:59,240 --> 00:14:02,879
So locks are database concepts.

222
00:14:02,879 --> 00:14:06,000
They try to separate user transactions, the T1s and C2.

223
00:14:06,000 --> 00:14:09,279
We are trying to keep all these concurrent transactions from stepping on each other's

224
00:14:09,919 --> 00:14:13,879
latches are trying to keep the threads that are executing on a common data structure in

225
00:14:13,879 --> 00:14:16,519
memory from stepping on each other's doors.

226
00:14:16,519 --> 00:14:22,319
Similar things but at very different levels in terms of what they are trying to do.

227
00:14:22,319 --> 00:14:26,000
Locks are trying to protect the database contents latches are trying to protect some in memory

228
00:14:26,000 --> 00:14:28,120
data structure.

229
00:14:28,120 --> 00:14:33,480
The duration of a lock is the entire transaction whereas the duration of the latch is just

230
00:14:33,480 --> 00:14:36,799
for the critical sections that the programmer writes.

231
00:14:36,799 --> 00:14:40,919
Now we're starting to see some of the differences that are going to emerge as we go further down.

232
00:14:40,919 --> 00:14:45,039
The different modes for the locks often locks have dozens of different modes.

233
00:14:45,039 --> 00:14:47,599
We'll talk about that briefly today.

234
00:14:47,599 --> 00:14:50,079
Latches are typically simple, weed and right.

235
00:14:50,079 --> 00:14:54,559
Though latches have also started to become more sophisticated in many programming environments.

236
00:14:54,559 --> 00:14:57,399
Besides, weed and writes are different levels in there.

237
00:14:57,399 --> 00:15:02,199
And we'll talk about that within the context of locks towards the end of this lecture.

238
00:15:02,199 --> 00:15:06,599
Locks end up needing some mechanism when you get into trouble with locks that are acquired

239
00:15:06,600 --> 00:15:08,200
so that no progress can be made.

240
00:15:08,200 --> 00:15:12,720
It's called deadlocks in the locking scenario and we'll talk about mechanisms to deal with that.

241
00:15:12,720 --> 00:15:17,000
Latches the way you avoid that situation where a thread has grabbed the resource,

242
00:15:17,000 --> 00:15:21,159
another thread has grabbed another resource and now they try to ask for the opposite set of

243
00:15:21,159 --> 00:15:21,960
resource.

244
00:15:21,960 --> 00:15:23,639
They will get into trouble.

245
00:15:23,639 --> 00:15:28,519
The way you avoid that with latches is you say, I as a programmer will write the code so

246
00:15:28,519 --> 00:15:30,080
that it never happens.

247
00:15:30,080 --> 00:15:33,000
So it's a programmer's responsibility.

248
00:15:33,000 --> 00:15:34,160
Database guys are nice.

249
00:15:34,159 --> 00:15:37,519
We actually put into the system mechanism so that if that happens, we can catch it and

250
00:15:37,519 --> 00:15:39,000
come out of that.

251
00:15:39,000 --> 00:15:43,319
And typically when you're using latches in some C++ code, for example, you will say, I'll

252
00:15:43,319 --> 00:15:44,759
always follow a sequence.

253
00:15:44,759 --> 00:15:49,439
I'll do action a followed by b followed by c so that you can never end up in this deadlock

254
00:15:49,439 --> 00:15:50,439
situation.

255
00:15:50,439 --> 00:15:55,279
But it's the programmer's responsibility to go and do that right.

256
00:15:55,279 --> 00:15:59,319
Locks have these inbuilt deadlock mechanisms that allow you to get out of that trouble if

257
00:15:59,319 --> 00:16:00,919
you get into that.

258
00:16:00,919 --> 00:16:05,079
And the mechanisms for deadlocks as we'll see, I'll wait for and time out mechanisms, programmers

259
00:16:05,079 --> 00:16:09,319
have to do that when they're using latches.

260
00:16:09,319 --> 00:16:14,519
Locks the state for the locks, who has what's being requested by who is kept in the lock

261
00:16:14,519 --> 00:16:15,839
manager.

262
00:16:15,839 --> 00:16:19,719
And for latches when you're writing that in your C++ code, it's going to be some protected

263
00:16:19,719 --> 00:16:20,719
data structure, right?

264
00:16:20,719 --> 00:16:27,919
You might have a variable that you're using to keep track of that latch object and that's

265
00:16:27,919 --> 00:16:28,919
what you do.

266
00:16:28,919 --> 00:16:32,559
Latches are in memory, protect threats from getting into trouble.

267
00:16:32,559 --> 00:16:38,519
Lot of programmer discipline is needed to make sure you don't get into trouble.

268
00:16:38,519 --> 00:16:43,120
Locks are for things that are on disk so they get help for a longer amount of time.

269
00:16:43,120 --> 00:16:48,120
If you remember the graph, the chart that we had in terms of how much time does it take

270
00:16:48,120 --> 00:16:52,639
to reach an object on disk versus in memory, there were many orders of magnitude.

271
00:16:52,639 --> 00:16:56,799
So locks are going to be helped for longer amounts of time and they have a lot more mechanisms

272
00:16:56,799 --> 00:16:59,279
associated with them like deadlock detection.

273
00:16:59,279 --> 00:17:00,279
Question.

274
00:17:00,279 --> 00:17:05,519
So there's a different between the lock manager and the protected data structure.

275
00:17:05,519 --> 00:17:07,559
Very good question.

276
00:17:07,559 --> 00:17:11,759
So what's the difference between the lock manager and the protected data structure?

277
00:17:11,759 --> 00:17:16,159
The lock manager that I mentioned, which is this hash table, will be written and protected

278
00:17:16,159 --> 00:17:17,159
by a latch.

279
00:17:17,159 --> 00:17:21,680
So now he's the lock manager that's protected by a latch, which is all compatible still.

280
00:17:21,680 --> 00:17:23,559
Lock manager is sitting in memory.

281
00:17:23,559 --> 00:17:26,000
It's a in memory data structure.

282
00:17:26,000 --> 00:17:29,119
So transactions are trying to access it.

283
00:17:29,119 --> 00:17:33,880
So you'll protect the lock manager by a latch, which is an in memory stuff.

284
00:17:33,880 --> 00:17:34,880
So they're compatible.

285
00:17:34,880 --> 00:17:39,079
A latch, the protected data structure, so these are not incompatible.

286
00:17:39,079 --> 00:17:41,079
In database, you'll actually see latches.

287
00:17:41,079 --> 00:17:43,799
Lockmatch is a great example because that itself is latched.

288
00:17:43,799 --> 00:17:46,599
And you probably don't want to put a latch on the entire lock table.

289
00:17:46,599 --> 00:17:51,599
So you'll put latches on some chunks of it so that a single request is in block everywhere

290
00:17:51,599 --> 00:17:54,559
because otherwise the lock manager will become the bottleneck.

291
00:17:54,559 --> 00:17:59,799
What's the difference between the proximity on the side?

292
00:17:59,799 --> 00:18:01,480
They're protecting very different things.

293
00:18:01,480 --> 00:18:03,079
So think about the lock manager.

294
00:18:03,079 --> 00:18:05,879
It's protecting an in memory structure.

295
00:18:05,879 --> 00:18:11,319
And the lock manager is protecting the record A and record B. That is in the buffer pool,

296
00:18:11,319 --> 00:18:18,720
it may get evicted and go on this, but the lock is still held till the transaction is done.

297
00:18:18,720 --> 00:18:22,440
And now there's a related question is like when do these locks get acquired?

298
00:18:22,440 --> 00:18:25,960
Now latch, when you acquire, you explicitly as a programmer writing a code to say acquire

299
00:18:25,960 --> 00:18:28,640
this latch in this mode.

300
00:18:28,640 --> 00:18:35,039
Locks, as you'll see, get acquired implicitly by the database system and your in very rare

301
00:18:35,039 --> 00:18:40,120
cases explicitly as a programmer in SQL specifying grab this lock.

302
00:18:40,120 --> 00:18:45,000
And the simplest way you can understand that if you're locking at the page level is your

303
00:18:45,000 --> 00:18:46,799
buffer pool that you wrote.

304
00:18:46,799 --> 00:18:50,360
Imagine the call to the buffer pool also said, hey, please identify which transaction

305
00:18:50,360 --> 00:18:51,360
you are.

306
00:18:51,359 --> 00:18:56,039
And oh, by the way, tell me whether you are a read lock or an exclusive lock.

307
00:18:56,039 --> 00:19:01,199
In which case, the buffer manager called to the page can itself go and make the request

308
00:19:01,199 --> 00:19:04,519
to the lock manager on behalf of the transaction's work.

309
00:19:04,519 --> 00:19:07,719
So that is at the page level, at the record level, it gets more complicated.

310
00:19:07,719 --> 00:19:11,759
But that's how databases written is that at appropriate points where the data access

311
00:19:11,759 --> 00:19:14,719
happened, the locking request will be inbuilt into that.

312
00:19:14,719 --> 00:19:18,359
So you as a database programmer don't have to put lock request all over your code.

313
00:19:18,359 --> 00:19:21,919
The right abstraction will take care of putting in that request.

314
00:19:21,919 --> 00:19:24,839
And the page level stuff is the easiest to understand because you guys have written a

315
00:19:24,839 --> 00:19:27,879
buffer pool so you can see how that would work.

316
00:19:27,879 --> 00:19:31,799
Record level would go a little bit below at the access path for the record when you get

317
00:19:31,799 --> 00:19:33,159
to the file.

318
00:19:33,159 --> 00:19:36,799
And as you're writing all this insert calls and other stuff in this project, you will

319
00:19:36,799 --> 00:19:40,399
start to think about it like, oh, if I had a transaction management system, which is

320
00:19:40,399 --> 00:19:43,399
by the way, coming as the next project, where would I put it?

321
00:19:43,399 --> 00:19:46,559
It would be at one of these levels.

322
00:19:46,559 --> 00:19:48,559
And the questions?

323
00:19:48,559 --> 00:19:51,200
All right.

324
00:19:51,200 --> 00:19:54,159
So we already started to allude towards that.

325
00:19:54,159 --> 00:19:55,919
Locks come in at least two flavors.

326
00:19:55,919 --> 00:19:57,200
There are many more.

327
00:19:57,200 --> 00:20:03,679
A shared lock that says, I'm reading a someone else wants to read a, I don't care.

328
00:20:03,679 --> 00:20:07,480
The shared lock is compatible with another shared lock.

329
00:20:07,480 --> 00:20:10,639
And this is the compatibility matrix.

330
00:20:10,639 --> 00:20:15,359
And as we'll see, sometimes there are a lot more lock types besides shared and exclusive.

331
00:20:15,359 --> 00:20:18,559
And so this compatibility matrix can get bigger.

332
00:20:18,559 --> 00:20:23,240
And all this is says is a shared lock is compatible with a shared lock, exclusive lock.

333
00:20:23,240 --> 00:20:28,079
If someone has it on an object, you can get another exclusive lock on that object.

334
00:20:28,079 --> 00:20:30,399
You can get another shared lock on that object.

335
00:20:30,399 --> 00:20:32,879
It basically blocks everyone when they're waiting for it.

336
00:20:32,879 --> 00:20:33,879
Yep.

337
00:20:33,879 --> 00:20:35,559
Yeah, we'll come to that.

338
00:20:35,559 --> 00:20:36,559
Just hold on to that.

339
00:20:36,559 --> 00:20:39,119
It sounds bizarre that there are other kinds of locks.

340
00:20:39,119 --> 00:20:43,039
There are all database systems have at least a dozen different types of locks to allow

341
00:20:43,039 --> 00:20:45,759
even more parallelism than what we will allow.

342
00:20:45,759 --> 00:20:50,159
So first we'll just work with these simple locks and make everything safe.

343
00:20:50,159 --> 00:20:53,159
And then we'll very briefly talk about multiple different types of locks.

344
00:20:53,159 --> 00:20:55,680
And there is a vast amount of material in that.

345
00:20:55,680 --> 00:20:59,920
So again, this is like a plug for the advanced database class where we can go into that.

346
00:20:59,920 --> 00:21:01,319
It's to allow more parallelism.

347
00:21:01,319 --> 00:21:05,440
So let's work with just these simple locks and try and make it safe first.

348
00:21:05,440 --> 00:21:06,440
Okay.

349
00:21:06,440 --> 00:21:07,440
That's a great question.

350
00:21:07,440 --> 00:21:09,079
Why many locks?

351
00:21:09,079 --> 00:21:14,679
There are systems that have over 50 different types of locks and a compatibility matrix which

352
00:21:14,679 --> 00:21:16,720
will be like that to allow more parallelism.

353
00:21:16,720 --> 00:21:18,279
It will allow more parallelism.

354
00:21:18,279 --> 00:21:21,359
And I'll get to the intuition of that with the exclusive locks in a little bit.

355
00:21:21,359 --> 00:21:24,519
It seems like I don't think there should be additional lock types.

356
00:21:24,519 --> 00:21:26,000
But here's an example.

357
00:21:26,000 --> 00:21:31,480
The different systems over here, they will all let some form publish some information about

358
00:21:31,480 --> 00:21:33,799
the different lock types that they have.

359
00:21:33,799 --> 00:21:37,919
And what you saw flash up on screen, maybe I'll just go back to it and let it come back

360
00:21:37,920 --> 00:21:42,160
again is the compatibility matrix of things that have been disclosed.

361
00:21:42,160 --> 00:21:45,640
And as you can see, there are tons and tons of different lock types.

362
00:21:45,640 --> 00:21:47,720
It's just not a two by two matrix.

363
00:21:47,720 --> 00:21:49,720
It's a much, much bigger matrix.

364
00:21:49,720 --> 00:21:51,759
Okay.

365
00:21:51,759 --> 00:21:52,759
And you can take a look.

366
00:21:52,759 --> 00:21:55,880
You can actually find post-cresses information pretty readily.

367
00:21:55,880 --> 00:21:58,160
I have another screenshot coming in the last slide.

368
00:21:58,160 --> 00:22:02,360
But the manual is there and you can start to see some of that lock modes in there.

369
00:22:02,360 --> 00:22:06,240
All of that is to allow more parallelism and make everything we talk about today also

370
00:22:06,240 --> 00:22:07,240
safe.

371
00:22:08,200 --> 00:22:12,200
But the first idea is like how do we work with locks correctly?

372
00:22:12,200 --> 00:22:14,319
So let's start on that topic first.

373
00:22:14,319 --> 00:22:16,480
Staying with just two lock modes now.

374
00:22:16,480 --> 00:22:17,240
All right.

375
00:22:17,240 --> 00:22:22,720
So we will have transaction request locks.

376
00:22:22,720 --> 00:22:26,160
And this is also a notion of lock upgrades which you're basically going to ignore in this

377
00:22:26,160 --> 00:22:27,160
class.

378
00:22:27,160 --> 00:22:30,720
Again, the advanced database class covers that.

379
00:22:30,720 --> 00:22:34,319
Because sometimes like if you take this buffer pool, if you're locking at the page level,

380
00:22:34,319 --> 00:22:39,639
you ask a request for a page in a SQL query and in an application that is a SQL query that

381
00:22:39,639 --> 00:22:41,279
just scans all the records.

382
00:22:41,279 --> 00:22:44,759
And then maybe in the next query in that same transaction, it says, I'm going to update

383
00:22:44,759 --> 00:22:46,559
some of the records I saw.

384
00:22:46,559 --> 00:22:48,639
So grab all the student records.

385
00:22:48,639 --> 00:22:53,799
Oh, and for the students that have a B, make it a B plus.

386
00:22:53,799 --> 00:22:57,919
So it's only going to update some of the records that it scanned in the first one.

387
00:22:57,919 --> 00:23:02,279
So the first one first query, it's all part of the same transaction.

388
00:23:02,279 --> 00:23:06,119
We just issue requests to fetch in pages to the buffer pool if you're doing page level

389
00:23:06,119 --> 00:23:09,519
locking and just grab read locks on it.

390
00:23:09,519 --> 00:23:13,119
But then some of those pages in which the records of interest are present, you want to

391
00:23:13,119 --> 00:23:15,960
go and make it a write lock and exclusive lock.

392
00:23:15,960 --> 00:23:17,720
So that's called a lock upgrade.

393
00:23:17,720 --> 00:23:22,119
When the query is running, you don't know what's going to happen next.

394
00:23:22,119 --> 00:23:25,119
When you're creating that operation to read the page, you know what you want.

395
00:23:25,119 --> 00:23:27,440
I want to read it because I'm a select query.

396
00:23:27,440 --> 00:23:28,759
The next one is an update grade.

397
00:23:28,759 --> 00:23:31,039
Now it needs to update stuff.

398
00:23:31,039 --> 00:23:36,720
So there are this notion of lock upgrades, which is I, as a transaction, can have asked

399
00:23:36,720 --> 00:23:37,720
for a read lock.

400
00:23:37,720 --> 00:23:40,000
By the way, I'm not asking it directly.

401
00:23:40,000 --> 00:23:41,879
Someone's asking on my behalf.

402
00:23:41,879 --> 00:23:43,480
I'm just disclosing what my operation is.

403
00:23:43,480 --> 00:23:48,159
I'm reading a file and the buffer pool in this case could be asking for read level page

404
00:23:48,159 --> 00:23:49,159
locks.

405
00:23:49,159 --> 00:23:52,279
And the update transaction says, I'm getting this page from the buffer pool.

406
00:23:52,279 --> 00:23:54,559
But oh, by the way, I'm going to change stuff on it.

407
00:23:54,559 --> 00:23:58,599
So grab exclusive lock at the page level.

408
00:23:58,599 --> 00:24:04,079
So in the same transaction, first of all, might come back to that same object, a, for a read

409
00:24:04,079 --> 00:24:06,519
request, for a read lock.

410
00:24:06,519 --> 00:24:10,119
And later on, it may get upgraded to an exclusive lock.

411
00:24:10,119 --> 00:24:11,519
So those upgrades happen.

412
00:24:11,519 --> 00:24:13,799
Everything we talk about works with that scheme.

413
00:24:13,799 --> 00:24:15,799
There are a few more complications to deal about.

414
00:24:15,799 --> 00:24:20,039
We will largely ignore that, but just wanted to know that these upgrades happen.

415
00:24:20,039 --> 00:24:23,919
And the lock flow, the request is getting made on behalf of the queries that are being

416
00:24:23,920 --> 00:24:29,120
sent at some appropriate abstraction in the database engine.

417
00:24:29,120 --> 00:24:33,279
The database programmer is not writing explicit lock calls everywhere.

418
00:24:33,279 --> 00:24:35,800
I'm lying a little bit when you have these dozen different lock modes.

419
00:24:35,800 --> 00:24:39,920
In the B3 code, for example, you start to see the B3 programmer will have put in a bunch

420
00:24:39,920 --> 00:24:42,000
of explicit lock calls.

421
00:24:42,000 --> 00:24:43,600
So ignore that piece, right?

422
00:24:43,600 --> 00:24:47,279
When you get into multiple lock modes, then you start to see lock calls start to show

423
00:24:47,279 --> 00:24:48,800
off in specific place.

424
00:24:48,800 --> 00:24:52,080
And when it's a, you know, exclusive lock is too strict here.

425
00:24:52,079 --> 00:24:55,839
And this weaker form of exclusive lock, because I know just what I'm doing.

426
00:24:55,839 --> 00:24:58,399
And you already have some intuition for that type of stuff, right?

427
00:24:58,399 --> 00:25:03,720
When you did the lock coupling in the B3, it was like, it was like latches at that time.

428
00:25:03,720 --> 00:25:07,639
But you could see how you could let go of something at some point and be okay with being

429
00:25:07,639 --> 00:25:11,679
quote unquote unsafe, because you know, semantically, all you care about is the structure of the

430
00:25:11,679 --> 00:25:12,679
tree.

431
00:25:12,679 --> 00:25:15,839
So you didn't need to hold on to things for the whole time.

432
00:25:15,839 --> 00:25:18,079
So it's tricks like that that get played around.

433
00:25:18,079 --> 00:25:22,000
That's how you get this explosion of lock modes.

434
00:25:22,000 --> 00:25:25,960
But again, for now, we'll just talk about locks in that regular sense and lock upgrades

435
00:25:25,960 --> 00:25:26,960
happen.

436
00:25:26,960 --> 00:25:30,599
Lock manager will either grant the request or not grant a request.

437
00:25:30,599 --> 00:25:33,799
We'll play around with just these shared and exclusive locks.

438
00:25:33,799 --> 00:25:38,519
And when an upgrade, when an up when a request comes in, it's going to update this hash table

439
00:25:38,519 --> 00:25:42,680
structure, which is protected by a latch to keep track of all the requests that have been

440
00:25:42,680 --> 00:25:45,640
granted and all the requests that are pending.

441
00:25:45,640 --> 00:25:47,400
All right.

442
00:25:47,400 --> 00:25:50,599
So now let's go back to our example.

443
00:25:50,599 --> 00:25:52,959
We now have two different types of locks.

444
00:25:52,959 --> 00:25:55,919
So on transaction T1, it's not making just a lock request.

445
00:25:55,919 --> 00:25:59,159
It's going to say, I have an X lock request because I'm making changes to it.

446
00:25:59,159 --> 00:26:00,919
I'm an update query.

447
00:26:00,919 --> 00:26:02,399
And then it unlocks it.

448
00:26:02,399 --> 00:26:06,159
Similarly, transaction T2 has an X lock request.

449
00:26:06,159 --> 00:26:10,879
The second request from transaction T1 is a shared lock request for a because all it is

450
00:26:10,879 --> 00:26:12,519
doing is reading it.

451
00:26:12,519 --> 00:26:14,519
So now a protocol is slightly different.

452
00:26:14,519 --> 00:26:18,439
We are not just going to say lock unlock, but we're also going to say which type.

453
00:26:18,440 --> 00:26:22,240
And then we shared locks are compatible with shared locks and the lock manager is going

454
00:26:22,240 --> 00:26:25,360
to make all that grant and blocking requests.

455
00:26:25,360 --> 00:26:26,360
Okay.

456
00:26:26,360 --> 00:26:27,360
So pretty straightforward.

457
00:26:27,360 --> 00:26:28,880
No magic so far.

458
00:26:28,880 --> 00:26:29,880
All right.

459
00:26:29,880 --> 00:26:31,120
Yup, question.

460
00:26:31,120 --> 00:26:35,840
We will do that in a second.

461
00:26:35,840 --> 00:26:36,840
We will.

462
00:26:36,840 --> 00:26:39,120
So right now, this is not correct.

463
00:26:39,120 --> 00:26:42,000
So if that's what you're thinking is like, hey, did locks make it work?

464
00:26:42,000 --> 00:26:43,519
That's exactly what we are saying.

465
00:26:43,519 --> 00:26:47,360
This doesn't mean if you just follow that protocol, I told you, which is not yet a protocol,

466
00:26:47,359 --> 00:26:49,959
it's just an idea saying lock stuff.

467
00:26:49,959 --> 00:26:51,639
It is not correct.

468
00:26:51,639 --> 00:26:53,079
And we will make it correct in a second.

469
00:26:53,079 --> 00:27:00,359
So over here is exactly the scenario where we have this lock request, but see this unlock

470
00:27:00,359 --> 00:27:03,399
for object A happened in T1.

471
00:27:03,399 --> 00:27:09,399
And then that got read that got written by T2.

472
00:27:09,399 --> 00:27:13,000
And then T1 reads back what T2 wrote.

473
00:27:13,000 --> 00:27:16,759
So obviously now if you draw the dependence graph, we have formed a cycle.

474
00:27:16,759 --> 00:27:19,160
Right there's a right right request.

475
00:27:19,160 --> 00:27:21,720
And then there's a right read request.

476
00:27:21,720 --> 00:27:26,480
And we have a schedule that is not serializable, right?

477
00:27:26,480 --> 00:27:28,400
That is not conflict serializable.

478
00:27:28,400 --> 00:27:29,400
So this is a bad schedule.

479
00:27:29,400 --> 00:27:30,319
We don't want to allow this.

480
00:27:30,319 --> 00:27:33,920
This is leaves a database in an incorrect state.

481
00:27:33,920 --> 00:27:34,920
Okay.

482
00:27:34,920 --> 00:27:36,480
So we want to stop that.

483
00:27:36,480 --> 00:27:40,720
So now locks are not enough, but they are necessary.

484
00:27:40,720 --> 00:27:42,720
We need a little bit more.

485
00:27:42,720 --> 00:27:45,480
And we need this thing called two phase locking.

486
00:27:45,480 --> 00:27:50,400
And this was a breakthrough when the whole theory of two phase locking came about Jim Gray

487
00:27:50,400 --> 00:27:53,440
and bunch of IBM folks invented that.

488
00:27:53,440 --> 00:27:58,799
And Jim Gray got a Turing Award, a large part of that was based on this one paper in which

489
00:27:58,799 --> 00:28:02,360
he talks about the whole theory of two phase locking and the strict two phase locking,

490
00:28:02,360 --> 00:28:05,440
which we'll talk about in a little bit, and lock hierarchies and all of that are the

491
00:28:05,440 --> 00:28:06,680
fun stuff.

492
00:28:06,680 --> 00:28:13,839
So two phase locking is a protocol that we need to start following to make locks actually

493
00:28:13,839 --> 00:28:20,639
work to give us this serializable schedule, semantics that we want.

494
00:28:20,639 --> 00:28:22,919
So we'll do the following.

495
00:28:22,919 --> 00:28:24,279
We will acquire locks.

496
00:28:24,279 --> 00:28:26,519
There was no problem with that so far.

497
00:28:26,519 --> 00:28:29,759
We must acquire locks before we make changes to the objects.

498
00:28:29,759 --> 00:28:34,599
But the problem was when we acquired the locks, we let go of it too soon.

499
00:28:34,599 --> 00:28:37,879
And others could start seeing incorrect data.

500
00:28:37,879 --> 00:28:41,480
The problem was not that we have these locks in the wrong place.

501
00:28:41,480 --> 00:28:47,240
The problem is this unlock of A happened to soon and we could start to see this transaction

502
00:28:47,240 --> 00:28:51,200
T2 could start pick up changes of the transaction that has not yet committed.

503
00:28:51,200 --> 00:28:54,360
So that's what two phase locking is going to solve.

504
00:28:54,360 --> 00:28:58,880
And saying we break up all requests from a transaction in two phases.

505
00:28:58,880 --> 00:29:02,519
One is a growing phase in which they can keep making requests to the lock manager.

506
00:29:02,519 --> 00:29:04,920
I as a lock manager is going to keep track.

507
00:29:04,920 --> 00:29:08,640
Transaction T1 has made a request making more requests stuff like that.

508
00:29:08,640 --> 00:29:12,720
The minute transaction starts to make an first unlock request.

509
00:29:12,720 --> 00:29:17,640
I'm going to throw a flag in my lock manager and say T1 has left the growing phase is now

510
00:29:17,640 --> 00:29:20,160
in the shrinking phase.

511
00:29:20,160 --> 00:29:22,040
It's starting to release locks.

512
00:29:22,040 --> 00:29:26,720
And two phase protocols says once you go into the shrinking phase, you are not allowed

513
00:29:26,720 --> 00:29:29,040
to ask for any more locks.

514
00:29:29,040 --> 00:29:32,680
If you ask for any more locks, the lock manager will reject it.

515
00:29:32,680 --> 00:29:36,759
You have to abort the transaction and start all over.

516
00:29:36,759 --> 00:29:38,280
So why does it work?

517
00:29:38,279 --> 00:29:40,720
Let's see what does that mean.

518
00:29:40,720 --> 00:29:46,599
If I look at the life of a single transaction, which is what is shown here.

519
00:29:46,599 --> 00:29:51,039
And this is a single transaction with time on the x axis.

520
00:29:51,039 --> 00:29:52,399
Y axis is the number of locks.

521
00:29:52,399 --> 00:29:56,559
As you can see, the first phase where it is growing the locks, it's acquiring locks,

522
00:29:56,559 --> 00:30:00,200
acquiring locks, you know, maybe that greed request has come in the select query.

523
00:30:00,200 --> 00:30:05,079
And it reaches a certain point and then it stays with all those locks and then starts dropping.

524
00:30:05,079 --> 00:30:10,119
So it is shrinking in this phase over here and once it shrinks, it cannot go back up and

525
00:30:10,119 --> 00:30:13,199
start to acquire new locks.

526
00:30:13,199 --> 00:30:21,439
So for in this case, this point, which is the point at which it had grabbed all the locks

527
00:30:21,439 --> 00:30:23,879
that needed is called the lock point.

528
00:30:23,879 --> 00:30:28,279
And it's this magical point which I'll come back to in terms of what it real, what it

529
00:30:28,279 --> 00:30:33,639
means in terms of the dependence graph that is getting induced behind the scenes.

530
00:30:33,640 --> 00:30:37,960
So everyone with me so far as to what the protocol is for two phase locking.

531
00:30:37,960 --> 00:30:41,080
So we can go up and then start to come down.

532
00:30:41,080 --> 00:30:43,680
So it's got to look like a mountain with no valleys.

533
00:30:43,680 --> 00:30:45,759
It cannot have this valley.

534
00:30:45,759 --> 00:30:47,000
Right?

535
00:30:47,000 --> 00:30:49,680
It cannot be I start reaching that lock point.

536
00:30:49,680 --> 00:30:51,960
I start dropping locks and I start to go up again.

537
00:30:51,960 --> 00:30:52,960
Cannot do that.

538
00:30:52,960 --> 00:30:55,759
That will cause a trouble cause trouble.

539
00:30:55,759 --> 00:30:57,840
And the intuition is the following.

540
00:30:57,840 --> 00:31:01,880
This is a two phase 2 PL violation, two phase locking violation.

541
00:31:01,880 --> 00:31:06,480
The intuition, which I hope you can work out by yourself is why there's two phase locking

542
00:31:06,480 --> 00:31:07,480
work.

543
00:31:07,480 --> 00:31:11,960
It's because if I've got two transactions, I'll go back to this slide.

544
00:31:11,960 --> 00:31:15,640
If I've got two transactions like this is one transaction, another transaction will have

545
00:31:15,640 --> 00:31:17,800
its own curve, right?

546
00:31:17,800 --> 00:31:24,520
The transaction that reaches the lock point first is the one that will be the first transaction

547
00:31:24,520 --> 00:31:27,280
in that final serial schedule.

548
00:31:27,280 --> 00:31:30,320
So anyone who gets to all the locks they need that they want to conflict with.

549
00:31:30,319 --> 00:31:33,799
So it's like who reaches the top of the mountain first I'm before you.

550
00:31:33,799 --> 00:31:39,439
That's going to determine the database update in terms of that serializable schedule.

551
00:31:39,439 --> 00:31:43,799
Okay, so that's the intuition and that's why it works.

552
00:31:43,799 --> 00:31:44,799
Okay.

553
00:31:44,799 --> 00:31:45,799
Question?

554
00:31:45,799 --> 00:31:46,799
It's all a lot of time.

555
00:31:46,799 --> 00:31:47,799
It's 111 and it's the order of the transaction.

556
00:31:47,799 --> 00:31:48,799
Yeah.

557
00:31:48,799 --> 00:31:49,799
That's the order of the transaction.

558
00:31:49,799 --> 00:31:52,799
How are we making sure that it's only 312?

559
00:31:52,799 --> 00:32:03,960
Yeah, so that's a great question.

560
00:32:03,960 --> 00:32:09,440
So the question is how are we going to allow T1 from reaching the lock point first?

561
00:32:09,440 --> 00:32:12,240
We are not going to, here's what's going to happen.

562
00:32:12,240 --> 00:32:16,839
T1 and T2 can start doing the work as we look at the protocol in a little bit.

563
00:32:16,839 --> 00:32:23,519
As soon as T1, either one of those T1 or T2, either one of them reaches the lock point first,

564
00:32:23,519 --> 00:32:24,519
that will be the order.

565
00:32:24,519 --> 00:32:29,160
If T2 reaches it first, see imagine T1 and T2 are running in two threads and they keep

566
00:32:29,160 --> 00:32:31,319
contact switching or something like that, right?

567
00:32:31,319 --> 00:32:35,559
And if T2 reaches the lock point first, it will be like the final state of the database is

568
00:32:35,559 --> 00:32:37,440
T2 followed by T1.

569
00:32:37,440 --> 00:32:42,880
So we can allow any arbitrary interleaving now and as long as we follow the two-faced

570
00:32:42,880 --> 00:32:44,519
protocol, it doesn't matter.

571
00:32:44,519 --> 00:32:50,360
Whoever reaches that first is going to be ahead in that serial schedule.

572
00:32:50,360 --> 00:32:51,640
And that's the beauty, right?

573
00:32:51,640 --> 00:32:53,960
You don't have to do anything else with the timing.

574
00:32:53,960 --> 00:32:55,600
Let the threads all run with each other.

575
00:32:55,600 --> 00:32:58,640
Let there be hundreds of threads.

576
00:32:58,640 --> 00:33:02,799
They can all compete for, they can still go after the same database.

577
00:33:02,799 --> 00:33:06,240
As long as they all follow the lock protocol and two-faced locking, life is going to be

578
00:33:06,240 --> 00:33:07,240
good.

579
00:33:07,240 --> 00:33:08,240
Okay?

580
00:33:08,240 --> 00:33:09,240
Question.

581
00:33:09,240 --> 00:33:13,880
Q. Is this also what T1 creates of the failed threads and T2 is going to be contacted at

582
00:33:13,880 --> 00:33:14,880
three threads?

583
00:33:14,880 --> 00:33:16,319
Yeah, we'll get to that.

584
00:33:16,319 --> 00:33:18,720
That induces a deadlock and we'll talk about that.

585
00:33:18,720 --> 00:33:22,799
It won't prevent a deadlock and we have mechanisms to deal with that in a second.

586
00:33:22,799 --> 00:33:24,359
So hold that question.

587
00:33:24,359 --> 00:33:29,279
If they go in opposite order, there's a case where two-faced locking can still end up

588
00:33:29,279 --> 00:33:33,039
with a situation where no progress is made, that's called deadlocks and we'll break it.

589
00:33:33,039 --> 00:33:34,039
Okay?

590
00:33:34,039 --> 00:33:36,039
Good thinking.

591
00:33:36,039 --> 00:33:37,039
Question.

592
00:33:37,039 --> 00:33:41,039
Q. Is the object in a preset order required?

593
00:33:41,039 --> 00:33:42,039
Yes.

594
00:33:42,039 --> 00:33:46,319
The question is, couldn't you acquire the order, the objects in a preset order?

595
00:33:46,319 --> 00:33:47,839
You could, but it may get difficult.

596
00:33:47,839 --> 00:33:52,879
Imagine I've got a table R and one transaction is doing a file scan on it.

597
00:33:52,879 --> 00:33:54,759
The other one is accessing it through an index.

598
00:33:54,759 --> 00:33:56,399
I don't know what the order is going to come from.

599
00:33:56,399 --> 00:33:57,879
The index could be unclustered.

600
00:33:57,879 --> 00:34:02,279
So I can't always, because we want all these access paths for efficiency, we can't induce

601
00:34:02,279 --> 00:34:04,519
the order in a very strict way.

602
00:34:04,519 --> 00:34:05,519
Yeah?

603
00:34:05,519 --> 00:34:08,800
And that was where, in latches, you said the program has to do that, but if you ever write

604
00:34:08,800 --> 00:34:14,039
a complex C++ application with latches, you'll find it's very hard to get all parts of

605
00:34:14,039 --> 00:34:17,719
the code to follow the same order in which they go through data structures and all kinds

606
00:34:17,719 --> 00:34:19,519
of crazy bugs pop up.

607
00:34:19,519 --> 00:34:20,519
Okay?

608
00:34:20,519 --> 00:34:21,519
Great question.

609
00:34:21,519 --> 00:34:23,519
I like how you guys are thinking.

610
00:34:23,519 --> 00:34:24,519
Yep.

611
00:34:24,519 --> 00:34:25,519
That is correct.

612
00:34:25,519 --> 00:34:38,280
So the question was, can we say that as long as everyone follows two phase locking, the

613
00:34:38,280 --> 00:34:40,320
final schedule is conflict serializable?

614
00:34:40,320 --> 00:34:41,320
Yes.

615
00:34:41,320 --> 00:34:45,000
And it's also yes that we are not guaranteeing anything about deadlocks.

616
00:34:45,000 --> 00:34:46,360
Deadlocks can still happen.

617
00:34:46,360 --> 00:34:48,679
We'll find a way to break it.

618
00:34:48,679 --> 00:34:49,679
Very good.

619
00:34:49,679 --> 00:34:50,679
Yep.

620
00:34:50,679 --> 00:34:51,679
Exactly right.

621
00:34:51,679 --> 00:34:52,679
Yep.

622
00:34:53,679 --> 00:34:54,679
Does this, sorry?

623
00:34:54,679 --> 00:34:55,679
Yes.

624
00:34:55,679 --> 00:34:56,679
Okay.

625
00:34:56,679 --> 00:35:00,279
Which one is not shrinking?

626
00:35:00,279 --> 00:35:03,639
This is just a flat line saying all the locks are now being held for a little while.

627
00:35:03,639 --> 00:35:04,639
Is that what you mean?

628
00:35:04,639 --> 00:35:05,639
Yeah, yeah, yeah.

629
00:35:05,639 --> 00:35:08,919
So I scanned my file, I acquired all my locks.

630
00:35:08,919 --> 00:35:11,679
Now I'm just adding all of them up because I have an aggregate stuff.

631
00:35:11,679 --> 00:35:12,679
So it's flat.

632
00:35:12,679 --> 00:35:14,559
Then I start to drop the locks.

633
00:35:14,559 --> 00:35:17,480
So it's just to show that the lock point is when you reach the peak.

634
00:35:17,480 --> 00:35:20,079
After that, if you're plateauing out because you're holding the locks while you're doing

635
00:35:20,079 --> 00:35:22,319
something, the lock point is when you reach the peak.

636
00:35:22,320 --> 00:35:25,640
So it's a very precise definition of when that event happened.

637
00:35:25,640 --> 00:35:26,640
Okay.

638
00:35:26,640 --> 00:35:27,640
Yep.

639
00:35:27,640 --> 00:35:32,640
Is the lock point have a graph for like nothing, nothing, nothing, nothing, nothing.

640
00:35:32,640 --> 00:35:34,680
I've acquired one and then dropped everything.

641
00:35:34,680 --> 00:35:36,360
Yes, absolutely.

642
00:35:36,360 --> 00:35:38,160
That will still be fine.

643
00:35:38,160 --> 00:35:41,120
So as long as I'm going to a peak and then dropping, it's fine.

644
00:35:41,120 --> 00:35:42,120
Is it bad?

645
00:35:42,120 --> 00:35:43,400
No, it's not bad in some way.

646
00:35:43,400 --> 00:35:46,800
In fact, you will see that we will need to do something like that.

647
00:35:46,800 --> 00:35:50,760
Weak a version of that to make a certain problem in this go away.

648
00:35:50,760 --> 00:35:51,760
Okay.

649
00:35:51,760 --> 00:35:53,960
There's still one tiny problem in two-phase locking.

650
00:35:53,960 --> 00:35:56,400
So wait for two slides.

651
00:35:56,400 --> 00:35:58,880
Other questions?

652
00:35:58,880 --> 00:36:02,560
Because if you get this intuition, then you have the foundation to understand 50 different

653
00:36:02,560 --> 00:36:04,680
lock modes and all kinds of other crazy stuff.

654
00:36:04,680 --> 00:36:09,120
But if you don't get this intuition, there's no hope of getting to something more sophisticated.

655
00:36:09,120 --> 00:36:10,440
All right.

656
00:36:10,440 --> 00:36:13,200
So two-phase violation, peak's bad, right?

657
00:36:13,200 --> 00:36:15,280
No valleys.

658
00:36:15,280 --> 00:36:17,480
So now let's go back.

659
00:36:17,480 --> 00:36:18,600
This is going to be very trivial.

660
00:36:18,600 --> 00:36:20,320
Looks like all of you guys got it.

661
00:36:20,320 --> 00:36:22,680
You acquired the lock, that'll get granted.

662
00:36:22,680 --> 00:36:29,600
Now when you get that second request for the X-lock, it will get pushed down so that you

663
00:36:29,600 --> 00:36:38,240
won't be granted that request and you will start to see some of that issues.

664
00:36:38,240 --> 00:36:39,600
What's happening in the dependence graph?

665
00:36:39,600 --> 00:36:42,039
That was the question that was asked, right?

666
00:36:42,039 --> 00:36:44,240
The first X-lock is for the transaction.

667
00:36:44,240 --> 00:36:45,240
See the dependence graph?

668
00:36:45,240 --> 00:36:47,000
We have 2T1 and T2.

669
00:36:47,000 --> 00:36:50,519
The second X-lock said, I can't allow you to go any further.

670
00:36:50,519 --> 00:36:55,480
It's basically saying, if I let you go forward, I will form an arc from T1 to T2 and I'm going

671
00:36:55,480 --> 00:36:56,480
to kill that.

672
00:36:56,480 --> 00:36:58,239
I'm not going to let that happen.

673
00:36:58,239 --> 00:37:03,119
If I don't allow that to happen, there is no cycle to be formed because I'm allowing

674
00:37:03,119 --> 00:37:06,840
disallowing arcs from happening.

675
00:37:06,840 --> 00:37:09,079
And so it's a pessimistic form.

676
00:37:09,079 --> 00:37:11,960
It's pessimistic because maybe just one arc is okay.

677
00:37:11,960 --> 00:37:15,599
The cycle has not been completed and so we'll talk about the optimistic stuff later.

678
00:37:15,599 --> 00:37:20,679
But that's kind of the intuition and connecting back to where all this dependence graph is when

679
00:37:20,679 --> 00:37:26,039
it gets and why that makes sense and why locking works is because it's breaking these arcs

680
00:37:26,039 --> 00:37:28,039
as they are getting far.

681
00:37:28,039 --> 00:37:30,039
Let's say I have two of these guys.

682
00:37:30,039 --> 00:37:34,360
Let's say they look at the guy on the right, right after the X-lock A, the X-lock B,

683
00:37:34,360 --> 00:37:35,360
right?

684
00:37:35,360 --> 00:37:36,360
So one C, and then it gets.

685
00:37:36,360 --> 00:37:41,319
But X-lock A won't be, so the question is, after X-lock A, T2 has an X-lock B, but X-lock

686
00:37:41,319 --> 00:37:43,039
A won't be granted, so it's going to be waiting.

687
00:37:43,039 --> 00:37:44,039
So that's the way.

688
00:37:44,039 --> 00:37:45,039
Yes.

689
00:37:45,039 --> 00:37:46,039
So you want it to be.

690
00:37:46,039 --> 00:37:50,039
So we could see right away if the B-step is independent, we could be using it.

691
00:37:50,039 --> 00:37:51,039
Yeah, yeah, yeah.

692
00:37:51,039 --> 00:37:52,039
So hold on for the deadlock stuff.

693
00:37:52,039 --> 00:37:56,960
Yes, but if you did that and if T1 wanted to use B later, that could be a difference.

694
00:37:56,960 --> 00:38:04,719
So your question is, oh, if T2 wanted A and B could it say that I tried to get A, but

695
00:38:04,719 --> 00:38:07,400
it is locked, can I keep making progress with B?

696
00:38:07,400 --> 00:38:08,559
It can.

697
00:38:08,559 --> 00:38:09,559
And there are sophisticated protocols.

698
00:38:09,559 --> 00:38:13,000
I'll do that and many of these different locking modes will say, do you really want

699
00:38:13,000 --> 00:38:16,840
an X-lock right away or do you just want to check that you can get it and stuff like that?

700
00:38:16,840 --> 00:38:20,880
So we'll get to more sophisticated protocols, most of it in the advanced class, but we'll

701
00:38:20,880 --> 00:38:23,639
allude to some of those techniques like that towards the end of this lecture.

702
00:38:23,639 --> 00:38:24,639
Yeah.

703
00:38:24,639 --> 00:38:28,559
It's probably also an advanced protocol, but like, could you do like priorities, if like

704
00:38:28,559 --> 00:38:31,840
one of them is going to be like, it's going to lock in and like unlock immediately,

705
00:38:31,840 --> 00:38:33,679
the other one is going to hold for like an hour.

706
00:38:33,679 --> 00:38:34,679
Yeah.

707
00:38:34,679 --> 00:38:35,679
Then we want to prioritize.

708
00:38:35,679 --> 00:38:36,679
Absolutely.

709
00:38:36,679 --> 00:38:37,679
You can do all kinds of that.

710
00:38:37,679 --> 00:38:40,519
And we'll talk about granularities of locking, where you might say, if I've got a scanning

711
00:38:40,519 --> 00:38:45,360
of file with a billion rows, acquiring a billion locks is very expensive.

712
00:38:45,360 --> 00:38:47,440
It's more expensive than reading the record.

713
00:38:47,440 --> 00:38:48,440
Can I do something better?

714
00:38:48,440 --> 00:38:51,119
So hold on to that.

715
00:38:51,119 --> 00:38:52,119
Okay.

716
00:38:52,119 --> 00:38:53,119
Great.

717
00:38:53,119 --> 00:38:54,119
All right.

718
00:38:54,119 --> 00:38:57,199
So basically, all this is saying is that this is why locking works because we are trying

719
00:38:57,199 --> 00:38:58,199
to break these arcs.

720
00:38:58,199 --> 00:39:02,599
It brings form from the dependence graph that we talked about, the dependency graph that

721
00:39:02,599 --> 00:39:05,480
we talked about in the last class.

722
00:39:05,480 --> 00:39:10,960
So two-phase locking works, but it has one problem.

723
00:39:10,960 --> 00:39:13,719
That problem is called cascading a bots.

724
00:39:13,719 --> 00:39:18,599
Remember databases start a transaction with the begin statement.

725
00:39:18,599 --> 00:39:23,320
And then transaction could end with a commit, which means make all the changes and make

726
00:39:23,320 --> 00:39:24,320
it permanent.

727
00:39:24,320 --> 00:39:27,679
What could end within a bot saying whoops, undo everything.

728
00:39:27,679 --> 00:39:32,960
It is the, and you want to do this all on nothing component with transactions.

729
00:39:32,960 --> 00:39:36,159
But the point is a bots can also happen.

730
00:39:36,159 --> 00:39:37,840
Transaction could get a bot.

731
00:39:37,840 --> 00:39:43,559
And now in the presence of a bots, you start to have this situation where even if I'm

732
00:39:43,559 --> 00:39:50,039
falling two-phase locking protocol, I have a hole that I've dug myself into and I can

733
00:39:50,039 --> 00:39:51,039
get out of it.

734
00:39:51,039 --> 00:39:52,039
What's that hole?

735
00:39:52,039 --> 00:39:54,280
Let's illustrate that with an example.

736
00:39:54,280 --> 00:39:58,559
So here is a schedule in which transaction T1 starts.

737
00:39:58,559 --> 00:40:03,880
This following two-phase protocol, T2 is also doing the same and acquires its lock.

738
00:40:03,880 --> 00:40:09,599
Then unlocks it because it doesn't need any of A anymore.

739
00:40:09,599 --> 00:40:14,559
So it reaches its lock point and now after unlock all two-phase locking says you can't do

740
00:40:14,559 --> 00:40:16,360
any more locks.

741
00:40:16,360 --> 00:40:21,440
But it's still continuing to work on B because it has an unlocked B.

742
00:40:21,440 --> 00:40:25,000
T2 gets the lock for A because that was released.

743
00:40:25,000 --> 00:40:26,719
What should do its work?

744
00:40:26,719 --> 00:40:34,239
But later on, T1 proceeds and says, oh no, something's wrong, I need to abort.

745
00:40:34,239 --> 00:40:41,880
Now we are all following two-phase locking but T2 has read a value A that has to be undone.

746
00:40:41,880 --> 00:40:44,440
So it's read a dirty value.

747
00:40:44,440 --> 00:40:46,559
It's a dirty read.

748
00:40:46,559 --> 00:40:51,320
Now we can't unwind ourselves from this even though we are following two-phase locking.

749
00:40:51,320 --> 00:40:52,320
We are in trouble.

750
00:40:52,320 --> 00:40:54,120
So we reached the abort call comes to the database.

751
00:40:54,120 --> 00:40:55,120
What are you going to do?

752
00:40:55,120 --> 00:40:56,800
You have to now undo T2.

753
00:40:56,800 --> 00:41:00,920
What if T2 was already committed and had already paid out that $25?

754
00:41:00,920 --> 00:41:02,720
You can't undo that.

755
00:41:02,720 --> 00:41:11,039
So we can't let T2 go if it has got a dependency on T1 and T1's not committed.

756
00:41:11,039 --> 00:41:15,400
So how can you make two-phase locking safer to this type of problem?

757
00:41:15,400 --> 00:41:18,440
It's already safe for serializable purposes.

758
00:41:18,440 --> 00:41:22,840
But now it still will require us to deal with this cascading abort problem because

759
00:41:22,840 --> 00:41:24,360
transactions can abort.

760
00:41:24,360 --> 00:41:27,720
Everyone does that make sense?

761
00:41:27,720 --> 00:41:35,599
So the way to make it safe is to do something a little bit more with the two-phase locking.

762
00:41:35,599 --> 00:41:42,000
So this permissible schedule, we want to make it unadmitable in a new protocol and the

763
00:41:42,000 --> 00:41:45,720
protocol is called strong strict two-phase locking.

764
00:41:45,719 --> 00:41:49,079
The textbook also calls rigorous two-phase locking.

765
00:41:49,079 --> 00:41:52,359
And if you understand this lock point business that we talked about, right?

766
00:41:52,359 --> 00:41:57,079
So if you go back here, can you think about what you would do to this graph to make this

767
00:41:57,079 --> 00:41:58,480
problem better?

768
00:41:58,480 --> 00:42:01,199
So this is the correct protocol that we've been following so far.

769
00:42:01,199 --> 00:42:03,599
But cascading abort happens.

770
00:42:03,599 --> 00:42:04,599
What?

771
00:42:04,599 --> 00:42:10,079
Can you think of something to do to the shape of this graph to stop cascading abort?

772
00:42:10,079 --> 00:42:11,359
What was the root cause of cascading?

773
00:42:11,359 --> 00:42:12,359
Yup.

774
00:42:13,360 --> 00:42:14,360
Correct.

775
00:42:14,360 --> 00:42:15,720
Release all at once.

776
00:42:15,720 --> 00:42:17,519
And when do you release it?

777
00:42:17,519 --> 00:42:19,519
Or adopted.

778
00:42:19,519 --> 00:42:20,519
Exactly.

779
00:42:20,519 --> 00:42:21,519
So what did we say?

780
00:42:21,519 --> 00:42:24,960
You climbed the mountain and there's a plateau and then there's a cliff.

781
00:42:24,960 --> 00:42:27,000
Which means you never unlock early.

782
00:42:27,000 --> 00:42:34,320
No one can see that A transaction, the A object that was grabbed was basically, see, now

783
00:42:34,320 --> 00:42:38,280
if you had come up with that in 1970s, you would have won an award.

784
00:42:38,280 --> 00:42:44,480
So, but it was very hard at that time to just get your head around all of this stuff.

785
00:42:44,480 --> 00:42:46,800
It becomes easy because now I've shown you the graph.

786
00:42:46,800 --> 00:42:50,360
This is always the case where when someone explains to you something, simply you say, oh,

787
00:42:50,360 --> 00:42:51,360
it is trivial.

788
00:42:51,360 --> 00:42:55,519
But if you didn't have that, it just took a long time to conceptualize that and abstraction

789
00:42:55,519 --> 00:42:59,600
in that right way is the art of coming up with breakthroughs.

790
00:42:59,600 --> 00:43:02,280
So this is what we do.

791
00:43:02,280 --> 00:43:07,080
The problem we ran into is unlock of A allowed the other transaction to come in who was following

792
00:43:07,079 --> 00:43:10,119
two-phase locking and start to see bad stuff.

793
00:43:10,119 --> 00:43:14,199
But now if you do this strict, strong, strict two-phase locking, you say, climb the mountain,

794
00:43:14,199 --> 00:43:19,039
it's a plateau all the way through and then in the end, drop all the locks simultaneously.

795
00:43:19,039 --> 00:43:23,880
In just a little tidbit, obviously you won't drop all the locks simultaneously.

796
00:43:23,880 --> 00:43:25,799
It'll be get dropped one at a time.

797
00:43:25,799 --> 00:43:27,519
Multiple operations are happening to the hash table.

798
00:43:27,519 --> 00:43:31,719
So it's a little bit of semantics, but even though it takes a little bit of time, you

799
00:43:31,719 --> 00:43:33,719
can commit the transaction at that cliff.

800
00:43:33,719 --> 00:43:36,319
As we talk about durability, you'll write that commit log.

801
00:43:36,320 --> 00:43:38,200
And then you can start to draw.

802
00:43:38,200 --> 00:43:42,400
So there's this different type of mechanism to make that peak look like a peak, like that

803
00:43:42,400 --> 00:43:46,000
sharp edge look like an edge, but ignore that for now.

804
00:43:46,000 --> 00:43:50,400
Obviously, if you drop a billion rocks, you can't make a billion operations to the hash

805
00:43:50,400 --> 00:43:51,400
table instantaneously, right?

806
00:43:51,400 --> 00:43:56,960
It'll take some time to make that happen.

807
00:43:56,960 --> 00:43:58,760
But now hopefully this intuition makes sense.

808
00:43:58,760 --> 00:44:04,360
This way whoever reaches the lock point is ahead in the dependency graph that you draw,

809
00:44:04,360 --> 00:44:05,360
right?

810
00:44:05,360 --> 00:44:09,400
No one can see changes made by a transaction till it's committed or abort it.

811
00:44:09,400 --> 00:44:14,200
So no dirty reads will get passed across and the later abort doesn't cause you to unwind

812
00:44:14,200 --> 00:44:19,480
a transaction whose state might have already been determined.

813
00:44:19,480 --> 00:44:20,480
Questions?

814
00:44:20,480 --> 00:44:39,559
So if I understand the question correctly, is that the transaction that reaches the lock

815
00:44:39,559 --> 00:44:44,920
point first, can you make it commit first?

816
00:44:44,920 --> 00:44:46,960
So it depends upon why is the plateau?

817
00:44:46,960 --> 00:44:51,039
The plateau is because I've gotten all my data, locked all the data I need.

818
00:44:51,039 --> 00:44:55,119
Now I'm processing the data like computing an aggregate and computing a joint or something

819
00:44:55,119 --> 00:44:56,119
like that.

820
00:44:56,119 --> 00:44:59,760
So that time here is still going to be taken for doing the work that I want to do for

821
00:44:59,760 --> 00:45:00,760
the query.

822
00:45:00,760 --> 00:45:02,240
So I can't just drop it right there.

823
00:45:02,240 --> 00:45:05,119
I have to wait till all of that work is done.

824
00:45:05,119 --> 00:45:11,440
Does that make sense or maybe I didn't understand your question?

825
00:45:11,440 --> 00:45:15,079
I thought your question is why do we have a plateau?

826
00:45:15,079 --> 00:45:16,920
Why can't we just drop at the lock point?

827
00:45:16,920 --> 00:45:17,920
Correct?

828
00:45:17,920 --> 00:45:23,360
Yeah, because the plateau is where the work on that lock on all the things that we have

829
00:45:23,360 --> 00:45:26,559
read is probably getting done.

830
00:45:26,559 --> 00:45:28,280
So could you have a transaction?

831
00:45:28,280 --> 00:45:30,079
Could the plateau be zero in some cases?

832
00:45:30,079 --> 00:45:31,079
Yes.

833
00:45:31,079 --> 00:45:35,480
If all the work it needed, for example, if this were an update query and the last thing

834
00:45:35,480 --> 00:45:39,159
that when it reached the lock point was the last record it needed to update, it updated

835
00:45:39,159 --> 00:45:42,159
and drops it, the plateau will be very small.

836
00:45:42,159 --> 00:45:43,159
Yeah.

837
00:45:43,159 --> 00:45:46,840
Does that make sense?

838
00:45:46,840 --> 00:45:51,200
It's also possible that I grab a lock here and then I'm plathing for a long time before

839
00:45:51,200 --> 00:45:53,039
I grab a the locks.

840
00:45:53,039 --> 00:45:56,579
You know, I read a table, then I'm going to do some work with it, then I decide I want

841
00:45:56,579 --> 00:45:59,440
to do something else based upon the contents of what I read.

842
00:45:59,440 --> 00:46:02,039
So it's not, you know, the plateaus and peaks.

843
00:46:02,039 --> 00:46:06,519
All we have is that the growing phase is only going up, it's monotonically increasing, plateau

844
00:46:06,519 --> 00:46:07,519
and then drop.

845
00:46:07,519 --> 00:46:14,079
And two phase locking, it's a monotonically increasing and then monotonically decreasing curve.

846
00:46:14,079 --> 00:46:16,079
It can be platoes on both sides.

847
00:46:16,079 --> 00:46:26,519
You can have that, but that causes cascading a bot, right?

848
00:46:26,519 --> 00:46:27,759
That was the whole point.

849
00:46:27,759 --> 00:46:29,079
If, yeah, go ahead.

850
00:46:29,079 --> 00:46:34,079
First thing that's in the first thing, is that the second thing, we're supposed to be

851
00:46:34,079 --> 00:46:35,079
30% abort.

852
00:46:35,079 --> 00:46:36,079
Yeah, I see what you're saying.

853
00:46:36,079 --> 00:46:37,079
Very good, very good.

854
00:46:37,079 --> 00:46:39,319
So you are saying, oh, you know what?

855
00:46:39,320 --> 00:46:41,760
There wasn't really a problem here.

856
00:46:41,760 --> 00:46:48,240
What if you said, let this guy go, don't let it come it till the outcome is done.

857
00:46:48,240 --> 00:46:50,120
That's exactly what some protocols do.

858
00:46:50,120 --> 00:46:54,720
Like Microsoft, Hackathon server, Hackathon system, and I worked on that with a whole bunch

859
00:46:54,720 --> 00:46:56,720
of really smart people at Microsoft.

860
00:46:56,720 --> 00:47:02,360
Internally, we'll keep track of this dependent stuff and then won't let that transaction

861
00:47:02,360 --> 00:47:06,800
T2 to come it because it has taken a dependence on some of the transaction.

862
00:47:06,800 --> 00:47:10,400
So even if you say, come it here, it'll say, no, no, no, I got to hold you because you've

863
00:47:10,400 --> 00:47:11,400
read something else.

864
00:47:11,400 --> 00:47:13,560
I need to know that before I let you go.

865
00:47:13,560 --> 00:47:14,560
Absolutely, absolutely.

866
00:47:14,560 --> 00:47:17,080
So the more advanced protocols will do stuff like that.

867
00:47:17,080 --> 00:47:18,080
So that's great.

868
00:47:18,080 --> 00:47:21,640
You're already designing the next generation of protocols, which is good.

869
00:47:21,640 --> 00:47:22,640
Yeah.

870
00:47:22,640 --> 00:47:24,640
Other questions?

871
00:47:24,640 --> 00:47:25,640
Yeah.

872
00:47:25,639 --> 00:47:38,279
So the question is, the longer I hold the lock, am I not reducing the parallelism?

873
00:47:38,279 --> 00:47:39,279
Absolutely.

874
00:47:39,279 --> 00:47:41,480
That's why more lock modes.

875
00:47:41,480 --> 00:47:44,599
They will hold the locks, but weaker locks so other locks can get in.

876
00:47:44,599 --> 00:47:47,920
So wait for that and we may not get to it today, but that's okay.

877
00:47:47,920 --> 00:47:50,519
We'll get to it.

878
00:47:50,519 --> 00:47:51,519
All right.

879
00:47:51,519 --> 00:47:53,119
So let's keep moving.

880
00:47:53,119 --> 00:48:00,400
Hopefully this makes sense to everyone and we now have a solution that works and gets

881
00:48:00,400 --> 00:48:03,719
us out of this cascading approach.

882
00:48:03,719 --> 00:48:04,719
All right.

883
00:48:04,719 --> 00:48:09,359
So let's take a look at this example really quickly just to make sure everything is solidified.

884
00:48:09,359 --> 00:48:13,319
I think everyone got it based on this discussion, but just give you a little bit of time to digest

885
00:48:13,319 --> 00:48:14,319
this too.

886
00:48:14,319 --> 00:48:17,119
Consider two transactions, T1 and T2.

887
00:48:17,119 --> 00:48:18,839
Andy tells me he has a bookie.

888
00:48:18,840 --> 00:48:24,160
So he keeps transferring money from his account to his bookies account and then you need to go

889
00:48:24,160 --> 00:48:26,640
and compute the total across both those accounts.

890
00:48:26,640 --> 00:48:28,840
So those are the two transactions.

891
00:48:28,840 --> 00:48:33,640
A non-2PL example, and this is again to make sure we are all on the same page.

892
00:48:33,640 --> 00:48:39,039
You'll acquire that S lock and then you'll get into the situation where you end up with

893
00:48:39,039 --> 00:48:40,039
an incorrect value.

894
00:48:40,039 --> 00:48:41,039
Right.

895
00:48:41,039 --> 00:48:43,039
By now, I think everyone gets that.

896
00:48:43,039 --> 00:48:45,400
That's the type of bad stuff that can happen.

897
00:48:45,400 --> 00:48:51,200
Two-phase locking, if we end up doing that, we'll use the locks and then move things around

898
00:48:51,200 --> 00:48:53,599
so that we end up with the correct state.

899
00:48:53,599 --> 00:48:54,599
Right.

900
00:48:54,599 --> 00:48:57,920
Still doesn't avoid cascading boards which we just talked about, but you can now, you can

901
00:48:57,920 --> 00:49:02,639
take this thing, put in an independent graph and do that by yourself and see that we broke

902
00:49:02,639 --> 00:49:03,639
that cycle.

903
00:49:03,639 --> 00:49:05,639
We didn't let the cycle get far.

904
00:49:05,639 --> 00:49:06,639
Okay.

905
00:49:06,639 --> 00:49:07,639
All right.

906
00:49:07,639 --> 00:49:12,920
And strong strict two-phase locking in this case would basically require that A and B

907
00:49:12,920 --> 00:49:21,079
both be held till the end and you basically effectively running T1 after T2.

908
00:49:21,079 --> 00:49:22,079
Right.

909
00:49:22,079 --> 00:49:24,320
There's no parallelism there in this case.

910
00:49:24,320 --> 00:49:25,320
Okay.

911
00:49:25,320 --> 00:49:27,639
All right.

912
00:49:27,639 --> 00:49:31,920
So going back to this, serial schedule, right.

913
00:49:31,920 --> 00:49:33,440
A bigger subset of that.

914
00:49:33,440 --> 00:49:35,559
We are doing that because we want to allow more stuff.

915
00:49:35,559 --> 00:49:38,480
Use the database, make it more efficient.

916
00:49:38,480 --> 00:49:42,760
Use serializable theoretical, but good to know what it does.

917
00:49:42,760 --> 00:49:44,719
Cascading about picture looks like this.

918
00:49:44,719 --> 00:49:46,480
It cuts across that.

919
00:49:46,480 --> 00:49:52,639
There are some complex serializable schedule that it will remove from consideration but make

920
00:49:52,639 --> 00:49:54,920
it safer so that you don't have the cascading about case.

921
00:49:54,920 --> 00:49:58,000
So we restricted that space a little bit more.

922
00:49:58,000 --> 00:49:59,000
Okay.

923
00:49:59,000 --> 00:50:02,360
Obviously, a serial schedule is not going to have that because you know the outcome before

924
00:50:02,360 --> 00:50:03,360
you go.

925
00:50:03,360 --> 00:50:05,000
So it's covered under that stuff.

926
00:50:05,000 --> 00:50:08,719
But when we start to do strict two-phase locking, we're saying we're going to have a little

927
00:50:08,719 --> 00:50:10,119
less parallelism.

928
00:50:10,119 --> 00:50:14,199
But we're doing that because we want to avoid these cascading about.

929
00:50:14,199 --> 00:50:15,719
Okay.

930
00:50:15,719 --> 00:50:18,039
All right.

931
00:50:18,039 --> 00:50:20,280
Questions on this?

932
00:50:20,280 --> 00:50:22,079
All right.

933
00:50:22,079 --> 00:50:27,000
So now let's just make sure we have everything together.

934
00:50:27,000 --> 00:50:29,880
We talked about the strong strict two-phase locking.

935
00:50:29,880 --> 00:50:36,119
As many of you have already asked, what about that situation where transactions T1 and T2

936
00:50:36,119 --> 00:50:38,960
go after two objects A and B in a different order.

937
00:50:38,960 --> 00:50:41,200
That's exactly the example here.

938
00:50:41,200 --> 00:50:50,320
A locks a transaction T1 locks A. Transaction T2 locks B. T1 and then asked for A. Lock manager

939
00:50:50,320 --> 00:50:52,559
says, whoa, I need to put you on the pending queue.

940
00:50:52,559 --> 00:50:53,559
You need to wait.

941
00:50:53,559 --> 00:51:02,000
T2 later comes back and says, I need B. T2 can't get A because T1 has it and vice versa.

942
00:51:02,000 --> 00:51:03,799
So this is a deadlock.

943
00:51:03,799 --> 00:51:05,119
No progress is going to be made.

944
00:51:05,119 --> 00:51:06,799
We follow strict two-phase locking.

945
00:51:06,799 --> 00:51:09,519
We can still get ourselves into this trouble.

946
00:51:09,519 --> 00:51:10,599
Okay.

947
00:51:10,599 --> 00:51:12,039
So we need to get out of this.

948
00:51:12,039 --> 00:51:15,920
And for that, there are these mechanisms to find deadlocks.

949
00:51:15,920 --> 00:51:18,880
So that situation is called a deadlock.

950
00:51:18,880 --> 00:51:21,920
And there are two ways that you can deal with deadlocks.

951
00:51:21,920 --> 00:51:24,400
The first one is called deadlock detection.

952
00:51:24,400 --> 00:51:28,880
Periodically, you will run some background thread to go look through the lock manager and

953
00:51:28,880 --> 00:51:30,480
say, do I see a deadlock cycle?

954
00:51:30,480 --> 00:51:32,680
We'll talk about that in a second.

955
00:51:32,680 --> 00:51:36,200
And if so, I'm going to kill one of the transactions and break the cycle.

956
00:51:36,200 --> 00:51:37,920
This is a cycle for deadlocks.

957
00:51:37,920 --> 00:51:40,800
Different than the cycle for dependency graph.

958
00:51:40,800 --> 00:51:44,519
And then deadlock prevention, which is in some sense, think of it as being pessimistic.

959
00:51:44,519 --> 00:51:48,200
It's going to say, I'm going to stop you as early as possible.

960
00:51:48,200 --> 00:51:50,079
But now this is for deadlocks, right?

961
00:51:50,079 --> 00:51:52,360
Not for the dependency graph stuff.

962
00:51:52,360 --> 00:51:57,059
Similar concepts, but different applications, different problems that we are trying to solve.

963
00:51:57,059 --> 00:52:01,039
So we create these things called the wait for graphs.

964
00:52:01,039 --> 00:52:05,119
They look like dependency graphs, similar ideas, but for deadlocks.

965
00:52:05,119 --> 00:52:06,119
Okay.

966
00:52:06,119 --> 00:52:07,119
All right.

967
00:52:07,119 --> 00:52:12,440
So imagine I have wait for graphs, the are going to be constructed from the lock manager

968
00:52:12,440 --> 00:52:15,519
state of what's been locked, right?

969
00:52:15,519 --> 00:52:18,599
Not in terms of the read write stuff, which is what the dependency graph stuff.

970
00:52:18,599 --> 00:52:19,599
But they're different.

971
00:52:19,599 --> 00:52:20,599
Don't get those confused.

972
00:52:20,599 --> 00:52:21,599
Okay.

973
00:52:21,599 --> 00:52:24,319
But they're also related.

974
00:52:24,319 --> 00:52:28,079
If you think about it a little bit, and we can have a separate conversation, but the concepts

975
00:52:28,079 --> 00:52:29,079
are different.

976
00:52:29,079 --> 00:52:31,559
This will get built from the lock manager.

977
00:52:31,559 --> 00:52:35,839
The lock manager knows which transaction has been granted, which type of lock for which

978
00:52:35,839 --> 00:52:37,799
object and who's waiting for that.

979
00:52:37,799 --> 00:52:41,239
And from that information, you can put this and put this thing together.

980
00:52:41,239 --> 00:52:44,519
So here's a schedule of three transactions.

981
00:52:44,519 --> 00:52:48,360
T1, locks A, and then tries to lock B.

982
00:52:48,360 --> 00:52:53,440
T2 locks B, then tries to lock C. And T3 tries to lock C, and then A.

983
00:52:53,440 --> 00:52:58,400
So just showing an example with like three transactions previously saw a deadlock with two

984
00:52:58,400 --> 00:53:02,119
transactions, but they can happen across three transactions.

985
00:53:02,119 --> 00:53:06,599
So as you can see, this thing is done slightly differently in the lock manager.

986
00:53:06,599 --> 00:53:11,360
We will go in the backward fashion in this to say, oh, who is waiting for what?

987
00:53:11,360 --> 00:53:13,800
And that's what becomes an arc here.

988
00:53:14,200 --> 00:53:15,840
The dependence graph was this way, right?

989
00:53:15,840 --> 00:53:20,519
In time, here this graph is this way, in time.

990
00:53:20,519 --> 00:53:25,760
So say, T1 is waiting for something from T2.

991
00:53:25,760 --> 00:53:30,160
T2 is waiting for something from T3.

992
00:53:30,160 --> 00:53:33,760
And the deadlock completes when that last request comes in.

993
00:53:33,760 --> 00:53:36,440
At this point, no progress will be made across these three transactions.

994
00:53:36,440 --> 00:53:42,000
The system will just wait forever unless we break it.

995
00:53:42,000 --> 00:53:44,000
Questions? Does that make sense?

996
00:53:46,000 --> 00:53:48,079
Any cycle in the waste for graph?

997
00:53:48,079 --> 00:53:51,000
Any cycle in the waste for graph will be a deadlock.

998
00:53:51,000 --> 00:53:56,519
And a cool observation has been that most cycles tend to be of length two.

999
00:53:56,519 --> 00:54:01,119
So a deadlock detection itself is a complex algorithm to run, computationally very expensive.

1000
00:54:01,119 --> 00:54:05,840
So many times people will run, you know, so there's a question of how frequently should I run this background thread

1001
00:54:05,840 --> 00:54:10,159
to go through all the locks in the lock manager and compute this graph?

1002
00:54:10,159 --> 00:54:13,119
The lock manager could have millions of entries in it.

1003
00:54:13,119 --> 00:54:15,799
So computing this graph can be very expensive.

1004
00:54:15,799 --> 00:54:20,159
But there are cheaper algorithms to say find cycles of length two,

1005
00:54:20,159 --> 00:54:22,239
which can be done a lot faster.

1006
00:54:22,239 --> 00:54:27,159
And wow, balloons went up over here because of this whole camera thing here.

1007
00:54:28,399 --> 00:54:36,039
So you can have the background thread run more frequently to just find cycles of length two,

1008
00:54:36,039 --> 00:54:38,039
but less frequently for the bigger cycles.

1009
00:54:39,039 --> 00:54:41,039
Okay, that's just a tidbit.

1010
00:54:41,039 --> 00:54:47,039
In case you get super interested and excited about the deadlock detection stuff.

1011
00:54:47,039 --> 00:54:53,039
The main point is finding this graph if you've got a large lock manager table,

1012
00:54:53,039 --> 00:54:55,039
where there are lots of entries is expensive.

1013
00:54:55,039 --> 00:54:57,039
So you can just run this all the time.

1014
00:54:57,039 --> 00:54:59,039
You're going to have to run it periodically.

1015
00:54:59,039 --> 00:55:04,039
Okay, so that's the tradeoff between the frequency of checking and how long the transactions wait.

1016
00:55:05,039 --> 00:55:06,039
You can check all the time.

1017
00:55:06,039 --> 00:55:10,039
You'll find the deadlock quickly, but you're spending a lot of cycles in just finding deadlocks.

1018
00:55:10,039 --> 00:55:14,039
If you check, let's say every day, then a deadlock that's been formed for a day,

1019
00:55:14,039 --> 00:55:16,039
you won't find it for a long time.

1020
00:55:16,039 --> 00:55:20,039
So if you follow the container draft,

1021
00:55:20,039 --> 00:55:24,039
the lock can check for the client find the dynamite.

1022
00:55:24,039 --> 00:55:25,039
Yeah.

1023
00:55:25,039 --> 00:55:33,039
So the question is, can I maintain this lock graph dynamically every time I do?

1024
00:55:33,039 --> 00:55:38,039
And entry, if you make a request to the lock manager, you could, but then that will add more cost.

1025
00:55:38,039 --> 00:55:41,039
See, you're trying to make this lock manager go really fast.

1026
00:55:41,039 --> 00:55:42,039
I'm acquiring a lock, let it go.

1027
00:55:42,039 --> 00:55:46,039
And if you start to say I also need to update and graph, that's a tradeoff you're making.

1028
00:55:46,039 --> 00:55:49,039
It will double triple the time of each lock requests.

1029
00:55:49,039 --> 00:55:53,039
And so what you would rather do is to have these locks,

1030
00:55:53,039 --> 00:55:59,039
not have as many chance of having these types of conflicts, stop them early.

1031
00:55:59,039 --> 00:56:02,039
That's what the hierarchical locking will do as we'll see in a little bit.

1032
00:56:02,039 --> 00:56:10,039
And so there are all kinds of methods, but there's a cost to dynamically keeping that graph in memory all the time.

1033
00:56:10,039 --> 00:56:14,039
And sometimes when you're in a distributed system, that state is not in one place.

1034
00:56:14,039 --> 00:56:17,039
The lock manager is at each node and the deadlock detection.

1035
00:56:17,039 --> 00:56:21,039
Someone is to bring all of it together to one node and then do this stuff.

1036
00:56:21,039 --> 00:56:25,039
So you don't even have a global graph till you bring it together in a distributed system.

1037
00:56:25,039 --> 00:56:29,039
And most database systems like Snowflake, Databricks,

1038
00:56:29,039 --> 00:56:33,039
all the things that Microsoft, Amazon and Google offer, they're distributed.

1039
00:56:33,039 --> 00:56:36,039
And so it's starting to one place.

1040
00:56:36,039 --> 00:56:38,039
So even more expensive.

1041
00:56:38,039 --> 00:56:42,039
Are the questions?

1042
00:56:42,039 --> 00:56:44,039
Okay, so deadlock detection.

1043
00:56:44,039 --> 00:56:46,039
How are we going to do that?

1044
00:56:46,039 --> 00:56:48,039
Let's say we found a cycle.

1045
00:56:48,039 --> 00:56:52,039
Now we have to choose which node to kill, which transaction to abort.

1046
00:56:52,039 --> 00:56:56,039
And this is remember last time we talked about how a transaction we start.

1047
00:56:56,039 --> 00:56:59,039
And sometimes the database may abort the transaction for you.

1048
00:56:59,039 --> 00:57:02,039
So you as an application programmer write your code.

1049
00:57:02,039 --> 00:57:06,039
And you have to be ready for what happens if it gets aborted.

1050
00:57:06,039 --> 00:57:12,039
So often in good applications, you'll say if a bot retry five times or whatever before you give up and throw an application error.

1051
00:57:12,039 --> 00:57:16,039
Why would someone, why would the database abort that deadlock happen?

1052
00:57:16,039 --> 00:57:17,039
Is the common reason, right?

1053
00:57:17,039 --> 00:57:20,039
You were doing something, some of the application code was doing something.

1054
00:57:20,039 --> 00:57:22,039
And the database detects a deadlock.

1055
00:57:22,039 --> 00:57:27,039
One of those application code, one of those SQL queries has to get aborted.

1056
00:57:27,039 --> 00:57:34,039
And that's the bot is not because the programmer had an explicit bot call is because the database has to abort for a deadlock.

1057
00:57:34,039 --> 00:57:37,039
And how would you choose what the victim is?

1058
00:57:37,039 --> 00:57:41,039
There are multiple ways you could say, no, a timestamp.

1059
00:57:41,039 --> 00:57:45,039
Or you could say, I will abort the transaction that has done the least amount of work.

1060
00:57:45,039 --> 00:57:51,039
You might have some definition of work saying, oh, you fired 10 queries in the between the beginning and end statements.

1061
00:57:51,039 --> 00:57:58,039
10 have been fired. The other one is just fired to some going to go kill the transaction, which has done less amount of work.

1062
00:57:58,039 --> 00:58:03,039
By the number of items that are locked in the lock table, because that may be a proxy of the amount of work that some one's done.

1063
00:58:03,039 --> 00:58:06,039
Basically, when you abort a transaction, you're losing all that work, right?

1064
00:58:06,039 --> 00:58:10,039
Then you'll have to get redone. So you're trying to optimize for that.

1065
00:58:10,039 --> 00:58:17,039
But the balancing part is that if you abort a transaction that has done the least amount of work or made the least amount of progress,

1066
00:58:17,039 --> 00:58:23,039
then you could end up starving some transaction that can never make progress, because the older transactions could always be ahead of it.

1067
00:58:23,039 --> 00:58:34,039
So you want to avoid starvation. And so sometimes what you happen, what you end up doing is to say, if I'm using a timestamp based protocol, which is pretty common, then when I abort the transaction and gets resend,

1068
00:58:34,039 --> 00:58:42,039
I will keep the original timestamp. So the transaction gets higher and higher priority so that it has some chance of finishing at some point in time.

1069
00:58:42,039 --> 00:58:45,039
If you give it a new timestamp, it may never get run.

1070
00:58:45,039 --> 00:58:56,039
All right. So now when you have to undo a transaction and it has to be killed, there are two different ways to do it.

1071
00:58:56,039 --> 00:59:05,039
One is you could abort the entire transaction. And in SQL, you're also allowed, let's see, you're writing application code in which there are 10 SQL statements that the application needs, right?

1072
00:59:05,039 --> 00:59:16,039
The first one is your flight has been confirmed. The hotel has been confirmed. Stuff like that. And you reach the, reach the ninth step and realize the last query is the one that costs trouble.

1073
00:59:16,039 --> 00:59:24,039
You may want to say, don't abort everything. Just roll back to the previous save point. So you can explicitly put save point calls.

1074
00:59:24,039 --> 00:59:30,039
So you as a programmer have to do that. And then you can say, if it aborts, just roll back to that and I'll try again just that last step.

1075
00:59:30,039 --> 00:59:37,039
So you as an application programmer have to explicitly put these save points, but there's a mechanism so that you can tell the database.

1076
00:59:37,039 --> 00:59:43,039
If you need to abort me, just abort me to this level. All right.

1077
00:59:43,039 --> 00:59:53,039
The other side of dealing with deadlocks is deadlock prevention. So what it's going to do is I'm going to stop the deadlock at the first touch.

1078
00:59:54,039 --> 01:00:10,039
And so here's what it will do is imagine two transactions, T1 and T2 are have come into the system and T1 is older than T2.

1079
01:00:10,039 --> 01:00:16,039
So the first protocol called weight die says if the transaction that is requesting has a higher priority.

1080
01:00:16,039 --> 01:00:26,039
So it's older than the transaction who already has the lock. Then what I'm going to do is to allow that requesting transaction.

1081
01:00:29,039 --> 01:00:36,039
Then the requesting transaction can wait for it. So if I'm an older transaction, I'm allowed to wait for the younger transaction who has the lock.

1082
01:00:37,039 --> 01:00:47,039
So that's the way tie the wound weight is a little terrible. If you think the old and the young analogy is like family old transaction and the young person has it.

1083
01:00:47,039 --> 01:00:59,039
I can abort it involuntarily and take away its locks. So it's called wound weight, which means I wound the transaction because I'm older and I get the locks that they have.

1084
01:00:59,039 --> 01:01:06,039
Both of them will prevent that cycle from happening because the minute someone starts to wait and all starts to form you saying, whoops, let's kill it.

1085
01:01:06,039 --> 01:01:13,039
So it's a little aggressive, but it doesn't require maintaining the weight for graphs and it doesn't require going through this lock table and stuff like that.

1086
01:01:13,039 --> 01:01:17,039
And hence it is simpler in that way, but maybe more ways for.

1087
01:01:18,039 --> 01:01:26,039
And so if you want to look at an example up over here, let's just go look at that.

1088
01:01:26,039 --> 01:01:35,039
You've got the first situation where there's T1 followed by T2 will go by timestamp. So T1 is older than T2 in both these examples.

1089
01:01:36,039 --> 01:01:45,039
And so when T1 is waiting for T2 because T2 already at the lock on A in the weight die, T1 is allowed to wait. It's older so it can wait.

1090
01:01:45,039 --> 01:01:52,039
But if it is wound weight, T1 will be nasty. It will kill T2 and make progress.

1091
01:01:53,039 --> 01:02:02,039
The other way around is T2 comes in and now wants to make a request for something that the older transaction has.

1092
01:02:02,039 --> 01:02:11,039
The situation flips around in weight die. T2 will abort. It's like young people can't wait for old people and wound weight says, yeah, fine, if you're younger, you can wait.

1093
01:02:12,039 --> 01:02:17,039
So you follow one of those protocols, you can mismatch like that, right? Or there is a point work. So you just follow one of the protocols.

1094
01:02:17,039 --> 01:02:24,039
Essentially it says, as soon as I decide in some way in which the direction of the R codes in that waits for a graph.

1095
01:02:24,039 --> 01:02:35,039
And as soon as I see an R capping, I stop it. That doesn't mean the cycle is formed. I just don't form Oxford. If you don't allow Oxford to form, no cycles will form.

1096
01:02:36,039 --> 01:02:44,039
Don't mix and match in the same system. You have to follow only one. Otherwise it won't work. You'll get into a mess.

1097
01:02:44,039 --> 01:02:51,039
So you can't mix and match and say, for this part, I'll do that. It's just like follow one protocol.

1098
01:02:51,039 --> 01:02:53,039
So what's better for what scenarios?

1099
01:02:53,039 --> 01:03:02,039
That's a great question. There isn't a very good answer for both of that. I think it depends on the application and the workload and the scenario.

1100
01:03:03,039 --> 01:03:14,039
But people still research into what ways to break deadlocks and what to do with that. So it's an open question. But there isn't a not that I know of a very approved that says is better than me.

1101
01:03:16,039 --> 01:03:17,039
If you find one, let me know.

1102
01:03:18,039 --> 01:03:32,039
Okay. So we've talked about why these guarantees, why these systems work, you know, hopefully getting to understand that when we deal with transactions, we like to visualize things that graphs and cycles are bad.

1103
01:03:32,039 --> 01:03:40,039
And all that's happening across the dependence graph and wait for graphs is we are trying to, we are basically finding ways to not have these cycles get formed.

1104
01:03:41,039 --> 01:03:51,039
All right. So so far what we talked about is all these schemes that we have have a one to one mapping from the database objects to the locks.

1105
01:03:51,039 --> 01:03:59,039
And if you want to update a billion records, as we just mentioned towards the beginning of the class, will be acquired a billion locks.

1106
01:03:59,039 --> 01:04:06,039
And that's very expensive, right. Baking changes to the hash table is pretty expensive and can we do better.

1107
01:04:07,039 --> 01:04:20,039
So there is this notion called hierarchies of locking and space on a very simple observation saying database objects.

1108
01:04:20,039 --> 01:04:29,039
Let's think about a record doesn't sit by itself. We put record into pages. We put pages into tables tables into databases.

1109
01:04:30,039 --> 01:04:39,039
So we have a hierarchical structure for how we've organized the data. And in fact, that hierarchical structure is also how we access the data, right.

1110
01:04:39,039 --> 01:04:45,039
In the execution code that you wrote for your operators, you open a file and start scanning the record, right.

1111
01:04:45,039 --> 01:04:53,039
First you start with the database, then the table and then the pages and then the records. So you're following that hierarchical structure.

1112
01:04:53,039 --> 01:05:00,039
So the question is can we try to acquire locks at different granularities.

1113
01:05:00,039 --> 01:05:12,039
So I could have a page level lock, a record level lock, sorry, a column level lock, but also a table level lock or a database level lock and allow mix and matching of all of those.

1114
01:05:12,039 --> 01:05:20,039
Oh, and by the way, let's also have different types of locks. Some that are more relaxed. So that sounds like bizarre, but that's where the breakthrough that.

1115
01:05:20,039 --> 01:05:27,039
This this paper had and the work that IBM and Jim graded was so exciting and totally changed the field.

1116
01:05:27,039 --> 01:05:37,039
So here's how it looks. I have a database structure hierarchy databases have tables tables have pages pages, pages have records and records have columns or attributes.

1117
01:05:37,039 --> 01:05:41,039
So now what I'm going to do is I will say I'm going to allow.

1118
01:05:41,039 --> 01:05:54,039
So if I've got a transaction T1, if it wants to acquire a table level lock, it's kind of like I can lock the table object and implicitly it's locked everything below it.

1119
01:05:54,039 --> 01:06:00,039
So now instead of record locking a billion records, I'll just lock the table because I'm scanning the whole table.

1120
01:06:00,039 --> 01:06:07,039
Way cheaper, right. And I can make everything that we talked about correct. And we'll talk about this protocol at a very high level.

1121
01:06:07,039 --> 01:06:17,039
So the whole paper on it, it takes a full lecture to go through this. And again, that's going to be talked about in the database systems last, but hopefully you get the intuition for how it works.

1122
01:06:17,039 --> 01:06:21,039
So database systems will actually allow things like that. They'll say, you know what you can.

1123
01:06:21,039 --> 01:06:33,039
The locking mechanism internally can lock at the database level, which is pretty rare. We talked about how in the early days of MongoDB, that's the only lock they allowed at the database level, because it was easy to implement.

1124
01:06:33,039 --> 01:06:44,039
It's easy to implement. You get correctness, but no parallelism, right. So it performance suffers. But database systems now have these hierarchy of locking table level lock is very common for systems to have implemented.

1125
01:06:44,039 --> 01:06:51,039
Page level is also very common. It's very easy to put as you can imagine. The first time you access a patient, the buffer pool is when you can go.

1126
01:06:51,039 --> 01:06:57,039
The buffer manager can make a request for the locks table stuff when you open the file that request can be made, right.

1127
01:06:57,039 --> 01:07:08,039
If you're doing record level locking, then when you're scanning the records in the page is when that request can be made and very rarely systems also do attribute level locking.

1128
01:07:08,039 --> 01:07:16,039
So an assistant that supports attribute level locking, obviously you can do a lot more parallelism because I'm doing record level locking and two transactions.

1129
01:07:16,039 --> 01:07:28,039
One of them wants to update one column. The other one wants to update another column. They really don't conflict. But if I only do record level locking, I will make them go one after the other.

1130
01:07:28,039 --> 01:07:36,039
Right. So you go further down. You'll get more parallelism, but you'll also be do a lot more locking. So what you want is to allow if you want to do allow all of that.

1131
01:07:36,039 --> 01:07:46,039
Can you mix and match that? Can you get the best of both worlds? And the answer is yes. And to do all of that correctly, you're going to have to introduce this notion.

1132
01:07:46,039 --> 01:07:47,039
Yep.

1133
01:07:47,039 --> 01:07:59,039
I think you've tried to get as you know a lot, but they will go low to the entire thing. You had like a decomposed storage model where all the columns were particularly possible to block the columns like directly.

1134
01:07:59,039 --> 01:08:15,039
Yeah. Very good. Excellent question. If I have a column store or a decomposed storage model, can I lock an entire column? Yes. You'll just adjust the structure of this to say tables becomes columns. And so pages you'll get columns and before caught below columns, you might have pages.

1135
01:08:15,039 --> 01:08:24,039
And then it then that you would have columns. So absolutely. As long as you have a structural hierarchy for a column store, it would look different. That's a great observation.

1136
01:08:24,039 --> 01:08:43,039
Common or is it common or rare? It is pretty common because column stores get used in analytic systems. That's a way in which you would be in an analytic system. Now, if you're building the next question that you probably have is like, how common is it to do updates in a column store?

1137
01:08:43,039 --> 01:08:53,039
The answer is more and more common because now people are trying to build these things called etched app systems. So typically what people will say I've got an analytic system and I've got a transaction system.

1138
01:08:53,039 --> 01:09:05,039
But now I'm maintaining two systems. So an etched app system says I want to allow transactions and analytics and do that efficiently, but analytic workloads want column stores, whereas transactional systems wants to roast doors.

1139
01:09:05,039 --> 01:09:18,039
So there's a huge bunch of research going on on how to make that work. As long as you have a storage hierarchy, you can make the theory of this thing work. And that's the beauty of this technique. It works with any hierarchical data structure.

1140
01:09:18,039 --> 01:09:27,039
But how to make etched app systems work where I might have a row store and a column store is something that is being researched intensely in the community right now.

1141
01:09:27,039 --> 01:09:34,039
So the question that I specifically specifically like having walked in on the entire column that common in the lab system.

1142
01:09:34,039 --> 01:09:42,039
In all app systems, that's what you would do. If it is not read only, if it's not a read only database, if it's read only database, everything you're talking about won't matter.

1143
01:09:42,039 --> 01:09:54,039
Yeah, right. So there are all app systems to say, I designate you as just read only and no updates. This means none of the supplies. Right. Great.

1144
01:09:54,039 --> 01:10:07,039
Other questions. Okay, and we won't finish everything today, but that's okay. Let's see how much we can get to keep asking questions because this material takes a little time to digest.

1145
01:10:07,039 --> 01:10:20,039
So to make all these hierarchies work, if you just kept a shared and exclusive lock, we won't get much performance because you know if someone locks the entire database, there's no parallelism, right. So it will backfire on us.

1146
01:10:20,039 --> 01:10:30,039
So we need this thing called intentional locks, which sort of seems weird and connects to the question that was asked earlier. What are the more than two types of locks. Yeah, there are lots and lots of different types of locks.

1147
01:10:30,039 --> 01:10:41,039
The simplest one is going to be one where we have something called intention to share. And what this says is look, I am traversing I'm T1, I'm traversing table T1.

1148
01:10:41,039 --> 01:10:56,039
I don't want to grab a shared lock on T1 because it may be too much. I only want to look at some records in T1. Right. Maybe I'm just accessing an index and only the records that match. And I don't know what will end up. Maybe that index can.

1149
01:10:56,039 --> 01:11:06,039
Ends up the predicate ranges such that I need to access every record or it is so narrow that I might access zero records or only one record in the table. I don't know that.

1150
01:11:06,039 --> 01:11:16,039
But I have to acquire that lock as I come down this hierarchy first. So I could acquire the shared lock on the table, but that could be really bad. Very few records actually need to be read.

1151
01:11:16,039 --> 01:11:26,039
So here's what I'm going to do. I'm going to say I haven't I intend to grab a shared lock somewhere down below. So I will grab an is lock and intention to share lock.

1152
01:11:26,039 --> 01:11:39,039
And the beauty of an is lock is it's compatible with an I X lock, which is intention to right to get an exclusive lock somewhere down below. So the main line is I could grab an is lock. So other readers can of course go through.

1153
01:11:39,039 --> 01:11:47,039
I'm just saying I intend to share down when I get below and actually grab a shared lock on the thing that I'm reading, but at the top level and not bragging.

1154
01:11:47,039 --> 01:11:57,039
So I'm have this fight between if I just do let's say a tuple level locking life is good with strict strong trick to face locking.

1155
01:11:57,039 --> 01:12:04,039
But if I have to scan a lot of records, my locking overhead is too high. So I'm trying to balance the locking overhead with how much parallelism I allow.

1156
01:12:04,039 --> 01:12:23,039
So the is locks come in different flavors. The cream in flavors are intention to share intention to grab a shared lock somewhere below I X is intention to grab an exclusive lock somewhere below and shared intention to six locks is I will read everything below.

1157
01:12:23,039 --> 01:12:40,039
I know that already, but some things I may actually update so it may be I don't have index built at all let's say on a student record table student table and I want to scan everything and take everyone who's got a B minus and move them to a B.

1158
01:12:40,039 --> 01:12:45,039
I don't know which ones I'm going to grab an exclusive lock, but I know I'm going to read everything.

1159
01:12:45,039 --> 01:12:54,039
So I will say please don't make me grab shared lock down below assume I've shared locked everything so just one lock and let's say there's only one student that I need to update out of 800 students.

1160
01:12:54,039 --> 01:13:05,039
I will only grab one exclusive lock later for that one student that I need to change so it's very efficient to locks right as opposed to having to grab 100 plus locks.

1161
01:13:05,039 --> 01:13:25,039
So how does that work? We need a compatibility matrix before we can proceed and that compatibility matrix has a couple interesting points that I'd like to draw attention to one is that an is lock is compatible with an I X lock and what that is saying is that yes you intend to share.

1162
01:13:25,039 --> 01:13:54,039
So do some read below this level in the hierarchy you will grab a proper shared lock on the stuff that you actually want to read and hey if someone else wants to grab an exclusive lock down below they could say at this level I'm just an I X lock in is and I X lock are compatible right and you'll see that with an example and then the six lock is compatible with the is lock because six lock is like I've got a shared lock and everything below so of course read is compatible with a read including compatible with an intention.

1163
01:13:54,039 --> 01:14:10,039
So that is also compatible. Okay, so let's see we've got five minutes that should be enough to go through some of the core parts here. Let's take this example of getting a balance from and he's shady offshore bank account.

1164
01:14:10,039 --> 01:14:22,039
I don't think he really has one. There's just an example so don't tell people it's real and then increase the bookies account balance by 1% and let's go and look at what that looks like.

1165
01:14:22,039 --> 01:14:50,039
So we've got a table of all these bank account information and we'll start with the first transaction to read that record at that point we might only want to read that one record. So what we might say is at that I declare an I S walk on the table and then you know assuming there's only one Andy I'm only going to read that one tuple and basically write a shared lock so two locks and done and I'm going to scan the entire table I'll only grab shared locks on what I need to.

1166
01:14:50,039 --> 01:15:08,039
Now at the same time the parallelism that is allowable here is that transaction T2 could be working concurrently while those locks are being held and can grab an I X lock and as long as it does not want to update the same record that is Andy's record that transaction is allowed to proceed.

1167
01:15:20,039 --> 01:15:38,039
Yeah, so the question is if you know you're modifying the table can you grab an exclusive lock so there is some situations where you would do that for example maybe and that's again a maybe if I'm trying to make a schema change to the table that means I'm going to change everything and for that you would say oh I would need to grab an exclusive lock on the table.

1168
01:15:38,039 --> 01:15:51,039
So if you know that you're going to make changes to everything below then you would stop the hierarchy and grab the lock nothing in the hierarchy called locking says that I couldn't have grabbed an X lock on table R so it depends upon what I'm trying to do.

1169
01:15:51,039 --> 01:15:53,039
Yep.

1170
01:15:53,039 --> 01:16:05,039
So in this situation is it possible for us to grab all the way down and so we would like to go ahead and say for example in.

1171
01:16:05,039 --> 01:16:14,039
Yeah, so you're saying should transaction T2 have grabbed the read lock on the table and then upgraded to an X lock later.

1172
01:16:14,039 --> 01:16:19,039
Sure, but also could it just like both of these transactions.

1173
01:16:19,039 --> 01:16:23,039
Grab a shared lock on the entire table.

1174
01:16:23,039 --> 01:16:26,039
Yeah, because we did that for the people.

1175
01:16:26,039 --> 01:16:40,039
Yep, yep, and what are you trying to get so but that could prevent someone from doing an update this would not happen if both of them see right now we allowed an update to a record happen at the same time as a read to another record.

1176
01:16:40,039 --> 01:16:47,039
We allowed update if I grabbed an S lock on the table no updates can happen on the records.

1177
01:16:47,039 --> 01:16:55,039
So look what happened here right we allowed as long as they're touching different parts of the same table we said it's okay and this hierarchical locking allows that.

1178
01:16:55,039 --> 01:16:59,039
That's a logically we still have the intent.

1179
01:16:59,039 --> 01:17:05,039
So the protocol is you'll go down the hierarchy of the database structure.

1180
01:17:05,039 --> 01:17:11,039
You can issue an is lock I X lock or six lock any of the lock modes we talked about.

1181
01:17:11,039 --> 01:17:21,039
But if you do intention lock then down below you must grab a proper lock so if you do an is or X lock you must grab a S or an X lock below right.

1182
01:17:21,039 --> 01:17:25,039
What is the benefit.

1183
01:17:25,039 --> 01:17:38,039
Yeah, the benefit is imagine this query so here let's go to this example and that will make it clear okay so imagine I've got this transaction T1 T2 and T3 and we'll stop after this slide and pick it up in the next class.

1184
01:17:38,039 --> 01:17:43,039
T1 wants to scan all the records and update only one.

1185
01:17:43,039 --> 01:17:52,039
So now imagine this is a billion rows in it so here what we can do is T1 can come in and grab a six lock.

1186
01:17:52,039 --> 01:17:59,039
S lock says implicitly now down below go ahead and read anything you've got the free permission free rights go do that.

1187
01:17:59,039 --> 01:18:10,039
But the record you want to go update ask for an X lock if you get it go ahead and do your work only two locks as opposed to a billion locks being acquired right.

1188
01:18:10,039 --> 01:18:20,039
And another transaction could come in that wants to read a single record it is allowed to go through at the same time because it will acquire an is lock which is compatible with the six lock.

1189
01:18:20,039 --> 01:18:36,039
So more parallelism is being allowed fewer locks are being gathered are being issued efficient more parallel is allowed because at the same table that we request is allowed to go through a third transaction comes in that scans all the records.

1190
01:18:36,039 --> 01:18:57,039
So allow to do all of its work till it gets to that last record so if it's going to transaction that last transaction if it wants to grab an s lock it will wait till the table are because it has a six lock which is incompatible with an s lock so it will wait for that till it goes further down.

1191
01:18:57,039 --> 01:19:18,039
And then when it is done it goes get that request so you know you could have said oh transaction to could have grabbed an is lock and then grab the billion reads till it got to the last record even that would be allowed at the transaction so wanted to do that if it wanted to say I want to go and I don't mind paying the cost for the locks because I want to get this balance you could do that.

1192
01:19:18,039 --> 01:19:43,039
So it probably wouldn't do that because it make the protocol very hard but essentially what you saw here even with transaction T1 and T2 is that very few locks were requests were made and you allowed this level of parallelism right so you really get a much higher performance database system then you would get through the other ways if you didn't have the intentional locks and hierarchies you will not get this level of parallelism.

1193
01:19:43,039 --> 01:19:50,039
Alright I'm going to stop here I can take questions offline and then I'll pick up from this slide in the next class Shubham hit it.

1194
01:20:13,039 --> 01:20:43,039
So I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to

1195
01:20:43,039 --> 01:21:06,359
stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here I'm going to stop here in the sea I'm going to stop here I'm going to stop here I'm going to stop here in the sea I'm going to stop here yes please I'm going to stop watching here in the ocean go home I'm going to stop here

