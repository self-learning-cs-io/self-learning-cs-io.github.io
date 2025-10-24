---
title: MIT6824 P16Lecture15continued OptimisticConcurrencyControlFaRMpt2
---

1
00:00:00,000 --> 00:00:11,759
Okay, good afternoon. Good evening or good night or good morning. Whatever time you're

2
00:00:11,759 --> 00:00:19,480
in and watching this lecture. Just double checking on the south. People can hear me.

3
00:00:19,480 --> 00:00:27,080
Yes. Yes. Okay.

4
00:00:27,079 --> 00:00:32,320
Okay. I'm going to talk about two things today. I want to finish our discussion

5
00:00:32,320 --> 00:00:38,599
on the farm and then I'll talk about Spark. Just to remind everybody else or

6
00:00:38,599 --> 00:00:43,320
everybody where we were in the farm, we talked about executing a

7
00:00:43,320 --> 00:00:48,519
transaction without any failures and we looked at one example of whether

8
00:00:48,519 --> 00:00:53,079
actually the transaction provided external consistency or

9
00:00:53,079 --> 00:00:59,600
your strict serializability. I want to talk about one more example to look

10
00:00:59,600 --> 00:01:05,079
about serializability and then talk a little bit about fault holds. But before

11
00:01:05,079 --> 00:01:11,719
doing so, it's probably helpful to remind ourselves exactly how a transaction

12
00:01:11,719 --> 00:01:17,599
works if there are no failures. In farm and application goes for two phases,

13
00:01:17,599 --> 00:01:24,039
the execution phase where it fetches objects from different shards and then

14
00:01:24,039 --> 00:01:30,000
the commit phase. We move back at this picture here. There's an execution phase

15
00:01:30,000 --> 00:01:40,479
three occupants are being read. One for each different chart. We have

16
00:01:40,479 --> 00:01:45,519
chart one, chart two and chart three and every chart has one backup. This system

17
00:01:45,519 --> 00:01:51,560
can tolerate one failure. So the object to read, the two objects are being

18
00:01:51,560 --> 00:01:57,719
modified as we've seen in the second and then once the free

19
00:01:57,719 --> 00:02:01,640
object to read and to be modified, the application might decide to commit and

20
00:02:01,640 --> 00:02:07,599
then the whole commit phase goes into action. This whole story from steps one through

21
00:02:07,599 --> 00:02:14,039
five. In step one, the transaction takes out locks on the objects that have

22
00:02:14,039 --> 00:02:19,039
been written written. We see here there have been two objects that have been

23
00:02:19,039 --> 00:02:23,959
written to abide the transaction and so we're propagating what's called lock

24
00:02:23,959 --> 00:02:31,840
records to every primary. Every primary is going to have a lock record for

25
00:02:31,840 --> 00:02:38,759
this transaction and for the objects involved in that transaction. The lock

26
00:02:38,759 --> 00:02:43,479
records contains an object ID which identifies the object uniquely

27
00:02:43,479 --> 00:02:50,599
a version number. So at the time that the transaction reads an object, it gets

28
00:02:50,599 --> 00:02:56,359
back a version number. In fact, it gets back this 64 bit number which is

29
00:02:56,359 --> 00:03:06,120
top is a lock bit and the rest is the version number. And then a new value.

30
00:03:06,120 --> 00:03:13,599
So you know primary one and primary two is going to have primary one is going to

31
00:03:13,599 --> 00:03:17,039
have the lock record for object one. Primary two is going to have the lock object

32
00:03:17,039 --> 00:03:21,800
for primary before object two. Then there's a separate phase for the

33
00:03:21,800 --> 00:03:27,200
validation of the read-only operations or operations object that have only

34
00:03:27,200 --> 00:03:32,120
been read but not modified. And as we can see in those in this validation step,

35
00:03:32,120 --> 00:03:42,920
the dotted lines represent one sided RDMAs. And as we talked about on Tuesday,

36
00:03:42,920 --> 00:03:48,319
those basically involve no server involvement. The sender can just read an

37
00:03:48,319 --> 00:03:52,759
object out of the memory of the server. We've actually had, we've had

38
00:03:52,759 --> 00:03:55,719
actually having to interrupt the computation that's actually running on the

39
00:03:55,719 --> 00:04:01,240
server. So they take it very fast. Unlike these operations that we saw here,

40
00:04:01,240 --> 00:04:05,159
which are actually right RDMAs.

41
00:04:07,240 --> 00:04:11,080
The cool two in the sense that you get the right to the

42
00:04:11,080 --> 00:04:15,520
append through this log record without actually interrupting the server, but the

43
00:04:15,520 --> 00:04:20,160
server actually has to process these log records and the server in this case,

44
00:04:20,160 --> 00:04:24,199
once it actually process one of these log records, it tries to take out the

45
00:04:24,199 --> 00:04:28,199
lock. If it succeeds trying to take the lock, the version number hasn't changed

46
00:04:28,199 --> 00:04:33,159
or the lock bit or no other transaction is taking the lock, then it will reply

47
00:04:33,159 --> 00:04:40,279
back, you know, uses another one of right RDMAs saying okay. And so, you know, we see

48
00:04:40,279 --> 00:04:45,000
that on the acquiring the lock requires action on the server, but the one

49
00:04:45,000 --> 00:04:50,199
sided RDMAs who reads validation doesn't require any action on the server.

50
00:04:50,199 --> 00:04:57,879
Then there's the, if everything turns out to be okay, so the transaction is

51
00:04:57,879 --> 00:05:03,719
basically able to obtain all those right locks and validate the read operations.

52
00:05:03,719 --> 00:05:11,079
It actually makes the decision to commit and to commit it first communicates to

53
00:05:11,079 --> 00:05:22,120
every backup. The change. So, it's a commit backup record.

54
00:05:22,120 --> 00:05:31,800
And it depends that to every, to the backups of the objects that have been modified.

55
00:05:31,800 --> 00:05:35,879
And again, you know, it's basically copy of the lock record, you know,

56
00:05:35,879 --> 00:05:39,160
the ID goes in there, the version number goes in there, and the new value.

57
00:05:39,160 --> 00:05:49,879
Once, you know, all the backwats, you know, have reported that they actually have a copy of the object.

58
00:05:49,879 --> 00:05:53,800
Now, we're basically in pretty good shape, correct, because the primary has a copy,

59
00:05:53,800 --> 00:05:58,120
the backup has a copy, except the primary, you don't really know if the transaction has been

60
00:05:58,120 --> 00:06:05,159
committed yet or not. And so, a final step is that actually the, the coordinator,

61
00:06:05,159 --> 00:06:10,680
or the detection coordinator, writes out the commit record and commit primary record.

62
00:06:10,680 --> 00:06:22,519
Informing the primary that actually the transaction actually has committed.

63
00:06:23,480 --> 00:06:27,000
And as soon as it gets an acknowledgement from one of the nicks, you know,

64
00:06:27,000 --> 00:06:32,920
indicated by the dotted lines, it actually reports back to the application saying that the

65
00:06:32,920 --> 00:06:33,879
transaction commit.

66
00:06:33,879 --> 00:06:40,680
So, what we want to do now is look at two cases.

67
00:06:40,680 --> 00:06:44,279
One, we want to talk a little bit more about the serialized ability,

68
00:06:44,279 --> 00:06:47,719
just to see if the concurrency control worked out, and then we'll talk a little bit about fault

69
00:06:47,719 --> 00:06:49,639
tolerance and see if the fault tolerance story works out.

70
00:06:51,639 --> 00:06:55,319
So, let me first start with serialized ability.

71
00:06:56,439 --> 00:06:58,759
Or actually, maybe before doing that, let me just ask if,

72
00:06:59,719 --> 00:07:03,399
if there's any questions, you know, so far, or in what everybody sort of has swapped,

73
00:07:04,360 --> 00:07:08,360
successfully swapped, far and back into, into your memories.

74
00:07:12,199 --> 00:07:16,120
What does the rectangle mean in this picture?

75
00:07:16,759 --> 00:07:19,959
So, what's the rectangle? What does it signify?

76
00:07:19,959 --> 00:07:20,519
A long gap?

77
00:07:20,519 --> 00:07:21,159
Oh, it's an object.

78
00:07:22,039 --> 00:07:23,159
Oh, it's an object, okay.

79
00:07:26,120 --> 00:07:28,279
Okay. Any other questions?

80
00:07:29,319 --> 00:07:39,240
Okay. Good. Let's, so let's look at the correctness from the concurrency perspective.

81
00:07:40,279 --> 00:07:43,480
So, the correctness correctness straight serialized ability.

82
00:07:49,240 --> 00:07:56,439
And on Tuesday, we looked at a transaction that didn't really involve a right validation,

83
00:07:56,439 --> 00:08:00,680
because there was no object that was ret, but not written.

84
00:08:00,680 --> 00:08:03,480
And so, I'm going to look at another transaction this time around where actually

85
00:08:03,480 --> 00:08:05,000
the validation phase plays a role.

86
00:08:05,639 --> 00:08:07,160
And so, I'm going to look at two transactions.

87
00:08:08,360 --> 00:08:13,000
And this is sort of, this example is a classic example to test

88
00:08:13,879 --> 00:08:16,600
whether a protocol provides your serialized ability or not.

89
00:08:16,600 --> 00:08:20,279
Of course, it's not going to be approved, but it's sort of one of the key examples that

90
00:08:20,279 --> 00:08:24,120
generally is very helpful to see, to understand, whether how the protocol works.

91
00:08:24,759 --> 00:08:28,920
So, the protocol, the transactions are if x is zero, then we're going to say,

92
00:08:28,920 --> 00:08:29,720
y to one.

93
00:08:30,439 --> 00:08:33,879
So, if object x is zero, we'll say, object y to one,

94
00:08:33,879 --> 00:08:36,200
which is acting to the sort of the opposite.

95
00:08:36,679 --> 00:08:41,799
It looks if y is zero, and if y is zero, we'll set x to one.

96
00:08:43,960 --> 00:08:47,879
And the reason that these, sort of, this is a good test for serialized ability

97
00:08:48,759 --> 00:08:53,480
is that either transaction one should go after two to correct, or two to go after t1.

98
00:08:54,440 --> 00:08:59,000
And depending on which order you run, either y is one or x is one,

99
00:08:59,000 --> 00:09:03,960
but you never should have, you never should have the outcome, so x is one,

100
00:09:05,159 --> 00:09:09,639
but x is one, and y is one.

101
00:09:11,480 --> 00:09:15,080
And that should not be a lot because nothing would be definitely violates your

102
00:09:15,080 --> 00:09:17,000
serialized ability. Does that make sense?

103
00:09:22,520 --> 00:09:24,920
Okay, so what we want to do is you know, test whether

104
00:09:26,520 --> 00:09:31,320
pharma actually is successful, or we want to understand where pharma,

105
00:09:31,320 --> 00:09:36,680
and indeed it is not possible that x is one and y is one get produced.

106
00:09:37,240 --> 00:09:38,920
So, let's look at the timeline.

107
00:09:39,480 --> 00:09:42,520
Let's say we have t1, we have t2,

108
00:09:43,480 --> 00:09:47,960
there's the timeline, so they both, you know,

109
00:09:47,960 --> 00:09:51,879
in their sort of preparation or an execution phase, they both reach objects, so

110
00:09:52,679 --> 00:09:55,799
let's say they run true to concurrency, we do a read of x,

111
00:09:55,799 --> 00:10:00,600
get a version of zero, we do a read of y, version of zero, same here.

112
00:10:04,279 --> 00:10:09,079
And of course, in t1, we'll update y, t2, we'll update x,

113
00:10:09,639 --> 00:10:13,879
and they base at some point, you know, both starts to the commit phase.

114
00:10:19,400 --> 00:10:26,600
And you know, let's, so let's say the t1 start first and basically grabs the, you know,

115
00:10:26,600 --> 00:10:34,440
it needs the lock on y, since it's going to be writing y, so let's say it successfully

116
00:10:34,440 --> 00:10:39,000
grabs the log and y, and so that actually will set, you know, the log bit,

117
00:10:39,000 --> 00:10:42,760
you know, great, in the version number of the y object.

118
00:10:44,920 --> 00:10:48,440
And then, you know, let's say, you know, actually, since it's going to read,

119
00:10:48,440 --> 00:10:53,800
as has red x, but it's not, it's has a red x, but it is not modifying x,

120
00:10:53,800 --> 00:10:55,240
you know, it's going to be a validation of x,

121
00:10:55,240 --> 00:10:59,480
you know, x was read in version number zero,

122
00:10:59,480 --> 00:11:06,519
the, you know, a validation phase, you know, nothing extra nice, change, yes, with x,

123
00:11:06,519 --> 00:11:11,080
so the that version number still zero there, and we run executed in this order.

124
00:11:11,080 --> 00:11:16,600
And so, you know, things are sort of, are fine, and it, you know, at some point, you know,

125
00:11:16,600 --> 00:11:24,120
this transaction might commit. So let's look at t2, and let's say, you know, t2,

126
00:11:24,120 --> 00:11:35,000
runs after the validation of x, so it grabs the log, and then, you know, the,

127
00:11:35,000 --> 00:11:41,399
it has red y, so it needs to do a validation of y. So it's going to do a validation of y,

128
00:11:42,120 --> 00:11:47,080
and the question is, is that validation could succeed or not?

129
00:11:47,080 --> 00:11:56,440
No, because the previous, the other operation has a log and modified the value,

130
00:11:56,440 --> 00:12:01,080
so it's not the same that was originally red. Yeah, so the, the version number might mean

131
00:12:01,080 --> 00:12:05,639
they're still the same, but the y, you know, for you one x has set the log bit, right,

132
00:12:05,639 --> 00:12:09,240
for the object of y, and so at this point, this validation will fail,

133
00:12:10,840 --> 00:12:15,960
because it's not the same, or the log bit has been set, and so to t2,

134
00:12:15,960 --> 00:12:21,240
transaction, the t2 transaction will abort. Okay, so that makes sense?

135
00:12:22,920 --> 00:12:28,440
So we see at least in this particular example that, you know, it is the case that t1 and t2

136
00:12:28,440 --> 00:12:35,960
both don't commit, which would result in this incorrect outcome. Any questions about this?

137
00:12:35,960 --> 00:12:46,280
I had a question. Yeah. Yeah, so, like for the transactions,

138
00:12:46,759 --> 00:12:51,480
so these are like, these have to be like update transactions, like, like,

139
00:12:51,480 --> 00:12:58,040
like, right, correct? I can always read. It could do it. Yeah, go ahead.

140
00:12:58,840 --> 00:13:04,759
I just wonder if they were like, read operations, you could do that, like, log free, right?

141
00:13:04,919 --> 00:13:09,240
And as long as the... Yeah, so this is actually good. Let's go back to this picture here,

142
00:13:09,240 --> 00:13:13,879
correct? Then let's look at the, let's say there were no rights involved in this transaction at all,

143
00:13:13,879 --> 00:13:17,080
correct? Like so, for example, the two obvious that are being read, correct, or stored at,

144
00:13:17,799 --> 00:13:23,559
p1 and p2. So let's assume that these guys are actually not involved, so those objects

145
00:13:23,559 --> 00:13:27,480
were not written, so that the only operation that's happening is a read of that object.

146
00:13:28,039 --> 00:13:34,200
And if you see in, and so the protocol is carefully designed, so that if you only do read,

147
00:13:34,759 --> 00:13:41,399
you only do one sided RDMAs, correct? Here in the execution phase, and then one RDC day to do

148
00:13:41,399 --> 00:13:48,439
the validation. And no locks are taken out, no rights are being done, no records are being

149
00:13:48,439 --> 00:13:55,639
appended. That's the only thing that happens. And so this is one of the cool features about farm

150
00:13:55,639 --> 00:14:04,439
is that these transactions that only do read can be executed without, with only one sided RDMAs,

151
00:14:04,919 --> 00:14:13,319
and only, with no rights to any locks or grabbing any locks. And so that's why one reason that they

152
00:14:13,319 --> 00:14:19,960
get extremely high performance. And this is also the reason why, for example, the lock phase,

153
00:14:19,960 --> 00:14:25,799
the lock step, and the validation steps are two separate things, because in for read-only

154
00:14:25,799 --> 00:14:34,519
transactions, there's no lock step. Okay? Actually, I'll turn on that.

155
00:14:35,480 --> 00:14:42,279
For read-only transactions, why do we need the second value, why do we need the validation phase?

156
00:14:42,279 --> 00:14:46,279
Because aren't you like reading a value, and then you're immediately validating right after it,

157
00:14:46,279 --> 00:14:52,200
like the version? It seems like... There could be another transaction that has been modified the object,

158
00:14:52,200 --> 00:15:00,279
yeah? So if an transaction ran or started and committed before... Okay, a concurrent transaction

159
00:15:00,279 --> 00:15:06,600
that's your rights might modify the object. And I'll be back, right? So the

160
00:15:09,799 --> 00:15:15,639
intersection that writes, then the transaction that actually follows it, you know, should,

161
00:15:15,639 --> 00:15:21,959
you know, see observed that last right. But if the, correct the same time, then we can reorder them

162
00:15:21,959 --> 00:15:27,559
either way. Yeah, exactly at the same time, we can order, reorder, reorder them, yeah.

163
00:15:30,759 --> 00:15:37,319
So it still seems to me like the second validation, because the first time you read it,

164
00:15:37,319 --> 00:15:42,279
the second time you just immediately ping and see if the version is the same. It still seems to me

165
00:15:42,279 --> 00:15:48,839
like the second validation is like almost unnecessary. You might be right, I haven't found

166
00:15:48,839 --> 00:15:55,240
it very hard about this, that there... If there are transactions, there are only read-only

167
00:15:55,240 --> 00:15:59,079
transactions, you know, then the validation is undoubtedly not necessary. I haven't very

168
00:15:59,080 --> 00:16:03,320
carefully thought about like when there's a mix of transactions, where there's a case where you need

169
00:16:03,320 --> 00:16:09,320
the validation. Yeah, what did that be the case where like you have, like if you read a value,

170
00:16:10,600 --> 00:16:15,480
like you respect to read like two values atonemently, you read a value, after you read a value,

171
00:16:15,480 --> 00:16:22,280
like some transaction modifies the other value. Yeah, that'd be really one of the possibilities.

172
00:16:22,919 --> 00:16:32,360
Yeah. Yeah, actually, I'm not quite sure actually, in that case, that's a problem.

173
00:16:33,240 --> 00:16:37,159
Like in, for example, in this case, you know, this T1 and T2 case, it's not really crucial,

174
00:16:37,159 --> 00:16:43,000
but why actually does the validation, correct? Even though actually that's an injection,

175
00:16:43,799 --> 00:16:46,759
T1 only reads why.

176
00:16:49,720 --> 00:16:59,000
Right? What is transaction 2 was just x equals 1 instead of like without that statement.

177
00:16:59,000 --> 00:17:00,120
And a blind right?

178
00:17:03,000 --> 00:17:08,759
If it's just a blind right. Yeah, it's just x equals 1 and then it executes after the validation

179
00:17:08,759 --> 00:17:12,119
of T1. Yeah, that's fine, correct?

180
00:17:19,559 --> 00:17:21,720
But we didn't end up not sure what the question is.

181
00:17:23,160 --> 00:17:30,279
If T2 is just like, you know, right x equals 1, within the validation step,

182
00:17:31,720 --> 00:17:34,599
and it executes after the validation step of T1,

183
00:17:35,079 --> 00:17:43,879
wouldn't then XT1 think that X equals 0, but then X becomes 1 before the commit.

184
00:17:47,719 --> 00:17:53,159
Okay, so let me maybe we can hold this up because I got to, you know, redraw the whole picture,

185
00:17:53,159 --> 00:17:58,519
figure out exactly what the scenario you're talking about. Okay, so maybe we can go back to this at the end.

186
00:17:59,480 --> 00:18:05,720
So I had a question. What is the use case for a non-interaction?

187
00:18:10,759 --> 00:18:16,599
If you think back at Spanner and this paper, like, there's often the case in these workloads,

188
00:18:17,480 --> 00:18:22,920
the TPC workload and the TACP workload where, you know, there's a transaction that only does

189
00:18:22,920 --> 00:18:28,120
reach, for example, I've composed the balances of a set of accounts. Nothing is being written,

190
00:18:28,120 --> 00:18:30,680
but, you know, a lot of things, a lot of accounts are being read.

191
00:18:33,640 --> 00:18:34,120
Thank you.

192
00:18:38,200 --> 00:18:41,560
Okay, so we see here that there's actually the validations that have faced is crucial, correct?

193
00:18:41,560 --> 00:18:48,279
For this T1 and 2TK transaction, and furthermore that actually brings out work out correctly.

194
00:18:48,279 --> 00:18:51,400
You know, we get strict share relies ability. Of course, this is not a proof, but it gives you,

195
00:18:52,360 --> 00:18:57,240
you know, this example that sort of tried to get at the tricky case, you know, actually,

196
00:18:57,240 --> 00:19:04,280
a farm seems to work out correctly. Okay, so that's on the concurrency control.

197
00:19:05,560 --> 00:19:09,240
Then the second part we want to talk a little bit about is fault tolerance.

198
00:19:11,560 --> 00:19:20,360
And I'm not going to go with great amount of depth here. I just want to talk about the key challenge.

199
00:19:20,919 --> 00:19:26,439
And see, you know, and build some intuition why we might actually be hopeful that

200
00:19:27,879 --> 00:19:33,240
far and actually addresses that key challenge. And so the key challenge,

201
00:19:34,599 --> 00:19:39,639
I think so maybe actually that the key challenge is that the transaction order crashes

202
00:19:43,719 --> 00:19:46,519
after telling the application.

203
00:19:51,000 --> 00:19:57,959
And then it has to be the case, right, that the transaction persists.

204
00:20:00,439 --> 00:20:04,039
Because we've informed the application that the transaction is committed, so we can't actually

205
00:20:04,039 --> 00:20:10,759
lose, you know, any rights that the transaction has done. And so we can look at this picture again

206
00:20:12,199 --> 00:20:15,399
and see if we're going to be hopeful that it is the case.

207
00:20:21,319 --> 00:20:28,039
So, you know, there are a couple of things to observe. After, you know, the lock phase,

208
00:20:29,479 --> 00:20:36,119
it is the case that after the lock phase, it is the case that the two primaries,

209
00:20:36,119 --> 00:20:45,879
Q1 and Q2 have a lock record, which describes the update. We don't really know the transaction,

210
00:20:46,680 --> 00:20:52,600
that record doesn't say what the record actually, where did the transaction has committed,

211
00:20:52,600 --> 00:20:58,520
but we have information about the transaction. Then after this step, the commit backup step,

212
00:20:59,160 --> 00:21:06,280
now we know that you know, back up key want B1 and B2 have the commit record.

213
00:21:06,759 --> 00:21:19,160
And then before, you know, the transaction, you know, the transaction coordinator reports to the

214
00:21:19,160 --> 00:21:26,200
application that it has been successful, we know that one of the primaries, or let's say P1,

215
00:21:26,200 --> 00:21:27,399
also has to commit record.

216
00:21:28,120 --> 00:21:38,200
So, you know, let's assume there's a crash, you know, like right here, so at that particular

217
00:21:38,200 --> 00:21:43,480
just after that commit point, you know, and the system crashes. And what we want to convince ourselves

218
00:21:43,480 --> 00:21:49,800
off is that if there's one failure, you know, for each chart, you know, things actually work out

219
00:21:49,799 --> 00:21:55,960
correct. And so the worsen case basically, correct, is that you know, B2 fails.

220
00:21:58,519 --> 00:22:06,599
So, here where is B2? Here's B2, B2 fails. And so we lose, you know, that commit record that

221
00:22:06,599 --> 00:22:13,799
has actually there. The primary might actually have not a commit record yet, because it cracks after

222
00:22:13,799 --> 00:22:19,079
we just see if the acknowledgement of one primary, so let's say the P1 must actually have to commit

223
00:22:19,079 --> 00:22:27,879
record. So in this case, P1 will have to commit record. And of course, you know, the backup has

224
00:22:27,879 --> 00:22:33,799
a commit record for B1. And so this is enough information, correct, for to convince the

225
00:22:34,759 --> 00:22:40,199
during recovery that actually the transaction has committed, because you know, we have a commit record,

226
00:22:40,199 --> 00:22:45,079
you know, which is just what the TIG is that's committed. And we actually have all the information

227
00:22:45,159 --> 00:22:51,240
at the backups, namely the, the commit records, which describe the right transformations

228
00:22:52,599 --> 00:22:57,000
on the backup. And so during recovery, we actually have enough information to decide, you know,

229
00:22:57,000 --> 00:23:04,119
that the transaction actually has committed. And so that's sufficient. Of course, there's a complex

230
00:23:04,119 --> 00:23:08,519
protocol that actually needs to go into action and sort of look at all the pieces that are left behind

231
00:23:08,519 --> 00:23:12,439
by the transaction. But there are enough pieces left behind for the transaction for the coordinate,

232
00:23:12,440 --> 00:23:18,120
for the sort of new coordinate or the recovery process to decide that some distance action indeed

233
00:23:18,120 --> 00:23:22,759
has committed and should be persistent. Okay.

234
00:23:30,039 --> 00:23:37,400
Good. So let me sort of summarize farm. And before we jump into the discussion of Spark.

235
00:23:38,360 --> 00:23:46,280
So, you know, top level, you know, what it's sort of cool about. So farm is just fast.

236
00:23:46,840 --> 00:23:53,160
It can execute many, many, many transactions per second. There are some restrictions, of course,

237
00:23:53,160 --> 00:24:04,759
you know, on farm. You can't do it in all, all the time. So first of all, it assumes few

238
00:24:05,720 --> 00:24:14,119
conflicts. So it uses this optimistic concurrency control scheme. And the reason that it uses this

239
00:24:14,119 --> 00:24:17,480
optimistic concurrency control scheme because it wasn't going to take out logs because it wants to do

240
00:24:17,480 --> 00:24:23,000
these one sided R&B and A's without actually any server involvement. So it uses an optimistic

241
00:24:23,000 --> 00:24:29,000
concurrency control control scheme. That means that if you want to get good performance and, you know,

242
00:24:29,000 --> 00:24:34,200
avoid transaction boards, the workload better actually have few conflicts. And we see

243
00:24:34,200 --> 00:24:38,120
new evaluation that there are sort of the two common benchmarks that are being used in the

244
00:24:38,120 --> 00:24:44,920
transaction literature to do their system for those two benchmarks. Clearly, it's doing extremely

245
00:24:44,920 --> 00:24:51,240
well. This doesn't mean there are not that many conflicts. The second assumption that makes is that

246
00:24:51,240 --> 00:25:01,640
the data must fit in memory. So, it means that if you're having really, really big database,

247
00:25:01,640 --> 00:25:07,480
you have to buy more machines. Or if you really need a data to make and you don't want to buy

248
00:25:07,480 --> 00:25:11,560
more machines, then basically you can't use farm. And you have to sort of go back to it for more

249
00:25:11,560 --> 00:25:17,720
traditional data days that actually has an persistent storage. And so that you can read a write

250
00:25:19,240 --> 00:25:25,640
records to a much larger storage device. Replication is only

251
00:25:25,640 --> 00:25:40,280
within the data center. So in that way, in that way, expect respect is quite different from

252
00:25:41,000 --> 00:25:45,160
Spanner. The whole goal there was to do synchronous transactions across synchronous

253
00:25:45,160 --> 00:25:51,640
replication across data centers to support applications that need to be able to

254
00:25:51,640 --> 00:25:58,600
survive or continue while some data centers are down indicates a farm that is just not the

255
00:25:58,600 --> 00:26:07,160
kids. It's not targeted to those kinds of applications. And then the final point is it requires

256
00:26:09,160 --> 00:26:19,400
pretty fancy or exotic hardware, particularly in two things. This UPS, distributed UPS,

257
00:26:19,880 --> 00:26:26,759
to survive complete data center outages. And more importantly, you know, uses this RDMA

258
00:26:27,480 --> 00:26:30,360
Nix, you know, to get actually really high performance.

259
00:26:35,080 --> 00:26:42,600
Okay, there's sort of all I wanted to say about farm, unless there are any further questions.

260
00:26:49,560 --> 00:27:04,280
Okay, so that basically ends our set of papers or just ends the sort of transaction side of the

261
00:27:05,240 --> 00:27:13,320
this 824. So we've sort of done free lectures on transactions. And that's basically the end

262
00:27:13,320 --> 00:27:17,640
of talking about transactions. We'll show up in other papers, but we're not going to talk about

263
00:27:17,640 --> 00:27:23,080
that in any more detail. And in fact, we're basically sort of done with talking about, you know,

264
00:27:23,080 --> 00:27:28,120
sort of the most challenging part in the system, namely, you know, building fault-all-enstormed systems.

265
00:27:29,320 --> 00:27:34,040
And, you know, we're now seeing a broad spectrum of different designs, including designs that

266
00:27:34,040 --> 00:27:40,840
now actually support each very powerful programming abstraction of transactions. So in the next

267
00:27:41,560 --> 00:27:45,880
this lecture or the remaining of this lecture and subsequent lectures, we're going to sort of

268
00:27:45,880 --> 00:27:52,520
look at different topics that are formulated through storage systems. And so the first topic

269
00:27:53,160 --> 00:28:03,080
that we're going to be talking about is spark.

