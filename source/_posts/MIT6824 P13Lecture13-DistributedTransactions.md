---
title: MIT6824 P13Lecture13 DistributedTransactions
---

1
00:00:00,000 --> 00:00:05,520
Okay, thank you. Okay, so good afternoon, good evening, good morning, good night, whatever you are.

2
00:00:06,719 --> 00:00:13,359
We're going to talk to you about transactions. And you probably noticed the reading material for

3
00:00:13,359 --> 00:00:18,240
today is a little bit more tutorial in nature. We're not studying a particular system and see how

4
00:00:20,160 --> 00:00:25,359
set of IDs are implemented in that set of in that system instead. What we're going to be doing is

5
00:00:25,359 --> 00:00:34,320
talking about the concept of transactions because it shows up in the next two papers that will be

6
00:00:34,320 --> 00:00:41,920
studying and those two papers have quite a lot of material in them and assume that you familiar

7
00:00:41,920 --> 00:00:47,439
with transactions in a particular that you're familiar with the two core ideas that we'll see in

8
00:00:47,439 --> 00:00:57,839
the database lecture namely two-phase locking and two-phase commit.

9
00:01:06,400 --> 00:01:12,959
And sometimes they abbreviated as two PC for two-phase commit and two PL for two-phase locking.

10
00:01:13,919 --> 00:01:20,319
One point of confusion that the two terms really don't have to do much, don't have to, don't do it.

11
00:01:21,359 --> 00:01:30,000
I really don't that much related. They happen to have both the two-phase in it but they

12
00:01:30,000 --> 00:01:35,199
solve completely different problems. They happen to also show up on typically the context of

13
00:01:35,199 --> 00:01:41,759
transactions but they're even outside of transactions. They are good ideas or worthy ideas.

14
00:01:42,959 --> 00:01:47,919
They don't let yourself confuse by the fact that they both have two-phase and they're pretty

15
00:01:47,919 --> 00:01:54,319
unrelated. Okay, so I'm just going to dive in a little bit and start talking about transactions in

16
00:01:54,319 --> 00:02:02,639
general. And the reason that we're going to care about transactions a lot is that we want to be

17
00:02:02,639 --> 00:02:08,479
able to do cross-machine operations. So the problem that we're going to try to tackle

18
00:02:08,560 --> 00:02:15,599
in this lecture as well as in the two upcoming papers is cross-machine

19
00:02:20,799 --> 00:02:30,319
atomic ops. And so for example just to make it a little bit concrete let's say we have a client.

20
00:02:31,280 --> 00:02:40,400
We have two we have a chart of key value server. So some of the keys are on key value server one.

21
00:02:41,840 --> 00:02:48,079
So many are on key value server two. So the keys are split across them. So for example maybe

22
00:02:48,079 --> 00:02:55,599
key V1 has X, key A2 has Y. And we basically want to do the atomic operation across those two

23
00:02:55,599 --> 00:03:01,919
keys. And the easy way of the classic example in the context of transactions is always doing a

24
00:03:01,919 --> 00:03:11,039
transfer. So let's say the client wants to do a transfer from X to Y. Here's our client. And

25
00:03:11,519 --> 00:03:21,599
it's going to do basically a put to X to maybe add or subtract from the account. So let's do X

26
00:03:21,599 --> 00:03:29,919
minus one. And then the client is going to do a put of Y plus one. Transfer

27
00:03:29,919 --> 00:03:37,280
basically one dollar from the account X to the account Y. And our goal is basically going to be

28
00:03:38,240 --> 00:03:49,840
we want automissivity. We respect the failures and concurrency.

29
00:03:56,080 --> 00:04:03,520
So even if we're going to want the first key value server fails after the put,

30
00:04:04,000 --> 00:04:09,520
then we want to like to arrange it that basically the transfer didn't happen at all. So generally

31
00:04:09,520 --> 00:04:14,400
the semantics that we're looking for is that both operations happen or need a one of them happens.

32
00:04:15,200 --> 00:04:20,000
And so similarly from a concurrency perspective if another client is running and also tries to

33
00:04:20,000 --> 00:04:25,280
inspect these accounts, then what we would like to do the case is that both puts show up

34
00:04:25,280 --> 00:04:30,560
atomically. And so another transaction cannot observe an intermediate result. So if we're an

35
00:04:30,560 --> 00:04:35,120
intermediate result, as for example, the money is deducted from X but hasn't been added to Y yet.

36
00:04:36,720 --> 00:04:39,680
So these are the type of things we want to do. And it's come right,

37
00:04:39,680 --> 00:04:45,199
Kwaman, the distributed system is going to know that you would like to do operation across charge.

38
00:04:48,079 --> 00:04:55,600
So that's sort of the context of what we'd like to do. And the general plan for doing this

39
00:04:55,680 --> 00:05:00,560
is come to actually from the database community. And as a general plan is transactions.

40
00:05:09,840 --> 00:05:14,879
And what we like to do is basically group these operations, for example, in the case of the

41
00:05:14,879 --> 00:05:20,640
transfer to two boot operations into a single transaction. And we like then the property that

42
00:05:20,719 --> 00:05:26,719
this transaction executes atomically. And so typically, this requires some programmer annotations.

43
00:05:28,800 --> 00:05:35,599
So begin transaction to indicate that the client wants to do start-up transaction, maybe then

44
00:05:36,879 --> 00:05:48,639
the operations like X minus 1 and then at Y plus 1. And then you have to indicate that when

45
00:05:48,639 --> 00:05:55,360
the transaction actually is complete. And so typically, we come to make it a commit.

46
00:05:57,599 --> 00:06:03,439
And so the semantics that we're looking for is that these operations are executed atomically

47
00:06:03,439 --> 00:06:08,800
with respect to concurrency and respect to failure. And just to make it a little bit more exciting,

48
00:06:08,800 --> 00:06:13,680
let's look at the second transaction. So we can look at some case studies about how

49
00:06:13,680 --> 00:06:22,079
transaction actually interact. We might have a second transaction begin X, which reads actually

50
00:06:22,079 --> 00:06:41,920
these accounts. So t1 gets X and then t2 gets Y and then print t1, t2 and then it will commit.

51
00:06:44,639 --> 00:06:51,680
So we have a second transaction that basically reads the accounts X and Y and then prints the values.

52
00:06:52,240 --> 00:06:57,600
And one reason that we have two transactions is that we can look from the concurrency perspective

53
00:06:57,600 --> 00:07:01,439
how these transactions actually are ordered and what are legal outcomes and what are

54
00:07:01,439 --> 00:07:09,519
legal outcomes. Now transactions tend to be a general, almost like a piece of magic,

55
00:07:09,519 --> 00:07:15,839
you know, basically programmers can annotate these begin and operations and that takes a whole

56
00:07:15,839 --> 00:07:20,639
group of operations together, make them atomic and use the system, we'll take care of everything,

57
00:07:20,639 --> 00:07:24,799
it will take care of the walking, it will take care of the recovery, it's all like the program

58
00:07:24,799 --> 00:07:32,079
doesn't have to worry about it. The transactions are very, very powerful constructs. And they're

59
00:07:32,079 --> 00:07:38,560
useful in non-distributed systems. You have a single database machine or multi-core database machine

60
00:07:38,560 --> 00:07:43,120
and clients are remaining transactions to it. Then the transaction systems will execute these

61
00:07:43,120 --> 00:07:49,040
transactions as much as concurrently as possible. But also even if machine fails and comes back up,

62
00:07:49,040 --> 00:07:56,480
now you can actually expect the results to be there. And our focus of course is going to be

63
00:07:57,279 --> 00:08:05,920
distributed transactions. Of the ones that I had on the previous slide, namely

64
00:08:08,560 --> 00:08:13,120
one is example of cross-sharks, which is a common case in data centers.

65
00:08:14,879 --> 00:08:19,600
The typical API of a transaction also has one more operation that I didn't list here,

66
00:08:20,240 --> 00:08:26,000
and that is a board. So the two transactions that I showed here are both committing,

67
00:08:26,560 --> 00:08:30,399
but you could easily have a transaction that decides to board. For example,

68
00:08:31,359 --> 00:08:38,959
you might discover that, for example, transaction T1, my check that X has sufficient money in it

69
00:08:38,959 --> 00:08:44,720
in the account, and if the account doesn't have sufficient money, instead of calling it commit,

70
00:08:44,720 --> 00:08:50,879
it would call a board. And that payment point of the transaction would be canceled. And even if

71
00:08:50,879 --> 00:08:55,279
the transaction board is sort of halfway through and maybe has done some put operations,

72
00:08:55,840 --> 00:08:59,679
the still the semantics should be that none of those put operations actually happens.

73
00:09:00,720 --> 00:09:07,199
So in all cases, when it's a boarder commit, either all of them have or none of them have

74
00:09:07,759 --> 00:09:13,759
never a partial result. A board also might be called by the transaction system itself.

75
00:09:14,559 --> 00:09:21,039
So for example, as we'll see later, if there's a deadlock between two transactions,

76
00:09:21,039 --> 00:09:26,240
then the transaction system actually can abort one of those transactions so that the other

77
00:09:26,240 --> 00:09:30,240
transaction can continue and maybe retry later the transaction that was aborted.

78
00:09:32,639 --> 00:09:36,960
Okay, so this is sort of the primitives. You begin transaction commit and abort,

79
00:09:36,960 --> 00:09:47,039
and then for the interface operations. And then the semantics of transactions are typically summarized

80
00:09:47,919 --> 00:09:58,959
by a single word, namely asset. And that stands for like four key properties of transactions. One,

81
00:10:00,399 --> 00:10:08,639
it's atomic. And here, really, atomic refers through the case where we have two transaction running,

82
00:10:09,599 --> 00:10:14,719
and you've one transaction does multiple put operations or multiple add operations. All those

83
00:10:14,720 --> 00:10:18,879
results will be all visible to the other transaction or none of them will be visible.

84
00:10:19,920 --> 00:10:21,840
So that's one aspect. Sorry.

85
00:10:26,879 --> 00:10:33,759
I said this wrong. So atomic actually means through the crash recovery case. So if a transaction

86
00:10:33,759 --> 00:10:41,680
actually is multiple put operations, the transaction crashes halfway, the rule is that all the

87
00:10:41,679 --> 00:10:46,559
rights are visible, all the rights are on a stable storage or none of them. Because the

88
00:10:46,559 --> 00:10:54,079
atomic sort of respect to crash recovery, the C stands for consistent, which is something we're

89
00:10:54,079 --> 00:10:59,679
mostly not going to talk about as more related to databases. It's often the case that database

90
00:10:59,679 --> 00:11:07,439
have internal invariance like referential integrity is one of them. And the transaction is supposed

91
00:11:07,840 --> 00:11:13,920
to maintain that consistency. So no internal persistencies. This is going to be less of a topic for

92
00:11:13,920 --> 00:11:26,160
us today. And free is isolated. The I stands for isolated. And isolated was the what I just said

93
00:11:26,160 --> 00:11:29,840
earlier. And correctly, isolated actually refers to the case where we're running two transactions.

94
00:11:30,400 --> 00:11:35,360
And they don't see the shouldn't observe intermediate results from each other. So again,

95
00:11:36,000 --> 00:11:43,600
all the rights are applied. All or nothing for respect to the disability do another transaction.

96
00:11:44,560 --> 00:11:51,039
And then finally, the D stands for durable. Meaning that if the transaction commits,

97
00:11:52,080 --> 00:11:57,360
then the results are written to a stable storage so that if the system crashes, comes back up later,

98
00:11:58,159 --> 00:12:04,159
the latest rights or the latest transactions, the latest committed transactions are actually recorded

99
00:12:04,159 --> 00:12:11,919
on stable storage. Any questions about sort of the quick introduction to transactions?

100
00:12:22,319 --> 00:12:30,159
Okay, so I'm going to talk basically about two topics, quite a bit, namely the A part of the

101
00:12:30,240 --> 00:12:37,360
transactions and the I part of transactions. I'm going to start with the I part and talk a little

102
00:12:37,360 --> 00:12:46,959
bit about what actually correct isolation means. So basically what we're looking for is a definition

103
00:12:47,600 --> 00:12:54,240
for a correct execution of multiple transactions, for ground transactions. In the typical definition,

104
00:12:54,320 --> 00:12:58,480
or the gold standard in the database literature is called serializable.

105
00:13:05,200 --> 00:13:12,159
Or serializability. And what that means is that if you have two transactions or

106
00:13:12,159 --> 00:13:18,799
many transactions and they execute concurrently, then the outcome has to be some serial order.

107
00:13:19,039 --> 00:13:30,639
So either T1 executes before T2 or T2 executes before T1, but there's some serial order.

108
00:13:35,919 --> 00:13:39,919
And the serial order has to produce the same outcome.

109
00:13:43,039 --> 00:13:47,839
That's the concurrent execution. So if you're on two transactions concurrently, they produce some

110
00:13:47,840 --> 00:13:55,600
outcome. That outcome is only valid or legal or correct. It could have been the result of a serial

111
00:13:55,600 --> 00:14:03,440
execution. So just to make a concrete for example, let's say in the account case, X is start

112
00:14:03,440 --> 00:14:10,960
out as being 10, Y starts out as being 10. We run these two transactions that we had earlier on

113
00:14:10,960 --> 00:14:17,519
the board. So we might be able to do the two transactions are. And one basically moves one between

114
00:14:17,519 --> 00:14:22,720
two accounts and the other one prints the result of the two. So we think a little bit about it.

115
00:14:22,720 --> 00:14:31,840
If T1 goes first, then the outcome is going to be 9, 10. And the print statement is going to be

116
00:14:32,320 --> 00:14:34,399
uh

117
00:14:40,399 --> 00:14:46,240
uh yeah. And the print statement is going to say 9, 10, we're sure 9, 11, that's why I got confused.

118
00:14:47,519 --> 00:14:53,280
And the print statement is also going to say X was the one that we subtracted to a 9, 11.

119
00:14:54,560 --> 00:15:00,160
So we get a string 9, 11 out and the two dollars of the accounts are 9 and 9 and 11.

120
00:15:00,959 --> 00:15:09,279
If T2 goes first, then the outcome is 10, 10 because nothing nobody has moved yet. And then

121
00:15:11,199 --> 00:15:17,839
T1 goes. And so that's the possible outcome. So that is the two legal outcomes of the two

122
00:15:17,839 --> 00:15:23,679
transactions that we're actually uh if we execute the two transactions concurrently and

123
00:15:24,479 --> 00:15:31,199
the system guarantee serializability. Now you notice that serializability has probably a lot of

124
00:15:32,399 --> 00:15:37,759
flavor of like the terminology that we used before, namely linearizability. The key difference

125
00:15:37,759 --> 00:15:42,879
between serializability and linearizability is that in linearizability there's a real time

126
00:15:43,439 --> 00:15:52,000
a real time component that if it turns actually T2 starch after a T1 ends, then T2 has to show up later

127
00:15:52,000 --> 00:15:57,039
in the total order, in the serial order. And serializability now does not require. So even the

128
00:15:57,039 --> 00:16:01,600
of the transaction started you know a wall clock time a little bit later than another transaction

129
00:16:02,000 --> 00:16:09,519
stopped or finished and the system is still allowed to re-order that. So serializability in some

130
00:16:09,519 --> 00:16:17,600
ways is a little bit weaker than linearizability. Nevertheless serializability is a very convenient

131
00:16:17,600 --> 00:16:23,360
programming area, because from a programming perspective you can always think about transactions

132
00:16:23,360 --> 00:16:28,720
executing some serial order. And then you don't have to consider all kinds of interleaders.

133
00:16:31,360 --> 00:16:37,360
Okay so even though you know serializability is slightly weaker than linearizability,

134
00:16:38,240 --> 00:16:45,680
it actually disallows a whole bunch of problematic cases. So let me talk a little bit about that

135
00:16:45,759 --> 00:16:50,159
just to make clear that law actually serializability means.

136
00:16:52,879 --> 00:16:58,479
And what sort of executions the transaction system actually has to forbid.

137
00:17:00,959 --> 00:17:08,480
So let's you know two cases like here we have the first transaction, we have the second

138
00:17:08,480 --> 00:17:18,720
transaction running. So T1 runs T2 and you know one outcome that we could have is like one possible

139
00:17:18,720 --> 00:17:26,400
execution that could might happen is if we don't do some special you know T1 gets x.

140
00:17:29,039 --> 00:17:33,200
You know here the transfer happens so the updates to x and y happen.

141
00:17:33,360 --> 00:17:46,640
And then you know T2 does to get a y. And you know is this illegal or is this a serializable execution?

142
00:17:46,640 --> 00:17:51,360
That's the sort of question we have to ask. And what is the answer to that one?

143
00:17:54,480 --> 00:18:00,559
This is not serializable. Yeah and because you know the outcome you know if you write down what

144
00:18:00,559 --> 00:18:06,079
the outcome is correct then the outcome is going to be 9.11 here and this is going to write down

145
00:18:08,319 --> 00:18:15,839
10 11 right? I think so. And if we go back you know through our previous slides not there's not one

146
00:18:15,839 --> 00:18:22,480
of the two illegal outcomes. So this is not good. So when we think about the implementation of

147
00:18:22,480 --> 00:18:28,879
a transaction system you know it has to be the case that it forbids this particular execution schedule.

148
00:18:29,840 --> 00:18:33,840
And you know there's a similar version. Our transactions on these two exams are not so complicated

149
00:18:33,840 --> 00:18:38,400
so they're not that many in the leaving you have to that you can consider and that could go wrong.

150
00:18:38,400 --> 00:18:45,920
But there's at least one other one that can result in the not an incorrect outcome which is we do the

151
00:18:46,800 --> 00:18:56,560
proof x first. So here we go. Then you know we actually print the two to do gets.

152
00:18:56,559 --> 00:19:09,919
So get x get y and we do the food of y. And is there a serializable execution?

153
00:19:09,920 --> 00:19:27,279
This is an execution that we should be forbidden by the serializable transaction system or is it

154
00:19:27,279 --> 00:19:34,000
an okay execution? It should be forbidden. Yeah it should be forbidden correct because as an

155
00:19:34,000 --> 00:19:41,759
outcome that could have not happened if we executed t1 first followed by t2 or t2 for followed by t1

156
00:19:41,759 --> 00:19:48,400
right? Okay so you know what we clearly see is that the serializability you know excludes

157
00:19:49,359 --> 00:19:56,400
executions just to in order to actually make it easier for programmers to think about actually

158
00:19:56,640 --> 00:20:05,600
what a database does. And there are two broad approaches to forbidding executions and

159
00:20:06,960 --> 00:20:15,360
you suppose this approach to a so forbidding is called concurrency control.

160
00:20:16,079 --> 00:20:29,279
In the first approach or the first category of solutions is both called pessimistic solutions.

161
00:20:35,439 --> 00:20:37,759
And the pessimistic distribution basically evolved walks.

162
00:20:38,400 --> 00:20:47,119
So the idea is that like when the transaction runs or starts it requires the necessary

163
00:20:47,119 --> 00:20:55,759
locks to maintain serializability and only release the locks. So when it's guaranteed that the

164
00:20:55,759 --> 00:21:01,039
execution will result in a serializable execution. So that's the one approach and we're going to talk

165
00:21:01,039 --> 00:21:06,879
a little bit more about it in a second. The second approach is optimistic.

166
00:21:07,759 --> 00:21:18,480
And in the optimistic approach is basically no locks. And in the optimistic approach you're just

167
00:21:18,480 --> 00:21:23,279
assuming things are going to work out. And basically when you get to the commit point

168
00:21:24,799 --> 00:21:30,480
you know there's actually system to sort of ask yourself the question well you know all given the

169
00:21:30,480 --> 00:21:35,359
operation I've done in the past is that actually could that be the result of a linearizable

170
00:21:35,359 --> 00:21:41,679
execution? Or could that be the result of a serializable execution? And if so think

171
00:21:41,679 --> 00:21:48,639
to find and no problem at all then you know we're good if it is the result does correspond to a

172
00:21:48,639 --> 00:21:51,039
serialization execution then we're basically just aboard.

173
00:21:51,359 --> 00:22:09,759
And maybe and then we'll retry probably. So we'll see I'm not going to talk much about

174
00:22:09,759 --> 00:22:14,799
optimistic concurrent control right now but next week we're two weeks from now and we're reading

175
00:22:14,879 --> 00:22:21,279
the farm paper and we'll see an optimistic transaction system, a distributed transaction system

176
00:22:21,279 --> 00:22:25,759
of the type that we're considering that uses an optimistic concurrent to your

177
00:22:26,480 --> 00:22:31,519
concurrent control approach. But the focus for today is going to be on pessimistic.

178
00:22:33,759 --> 00:22:41,839
And one you know sort of the flip way that these two approaches are described in the literature

179
00:22:41,839 --> 00:22:46,799
often is that sort of pessimistic is you know you ask for permission first and then you do your

180
00:22:46,799 --> 00:22:52,799
operations and the optimistic sort of the other way around you just go ahead and you do your operations

181
00:22:52,799 --> 00:22:55,359
and if it turns out to be your wrong you usually apologize later.

182
00:22:57,679 --> 00:23:03,759
And that is the analogy if you will sort of do between the two different approaches.

183
00:23:05,199 --> 00:23:10,000
And with an each approach you know whether it's a pessimistic or optimistic there are many

184
00:23:10,000 --> 00:23:16,720
different concurrent control plants you know to either increase your concurrency or provide weaker

185
00:23:16,720 --> 00:23:22,160
consistency and with more concurrency and so there's like a there's a huge huge literature.

186
00:23:23,839 --> 00:23:31,119
And I'm just going to talk about one particular approach which is very popular,

187
00:23:31,759 --> 00:23:36,319
particularly if you want to achieve serialized ability. It turns out that not although I said

188
00:23:36,319 --> 00:23:40,319
like serialized abilities are gold standard for databases it's often the case that

189
00:23:41,679 --> 00:23:46,240
databases offer multiple degrees of isolation. So you know as a programmer you can sort of pick

190
00:23:46,240 --> 00:23:51,039
you know the degree of isolation that you like and the reason that you want to make a weaker

191
00:23:51,039 --> 00:23:55,919
degree of isolation is so that you can get more concurrency. Now we're going to just stick to

192
00:23:55,919 --> 00:24:00,399
the sort of the gold standard of concurrency which is namely serialized ability and if you do

193
00:24:00,400 --> 00:24:04,560
serialized ability then a common approach is two-faced locking.

194
00:24:15,840 --> 00:24:19,040
And in two-faced locking you know the basically you sort of a walk the record.

195
00:24:21,040 --> 00:24:27,440
That's the starting point for database record and you know in our little example that would be

196
00:24:27,440 --> 00:24:35,759
sort of a lock per variable and I lock per for x and I lock for y. And there's basically two rules.

197
00:24:37,360 --> 00:24:42,240
One intersection acquires a lock

198
00:24:46,080 --> 00:24:46,799
before using.

199
00:24:46,799 --> 00:24:58,319
And so the idea is before you know you can read or write you know to x or y you first have to

200
00:24:58,319 --> 00:25:01,200
obtain the lock and the transaction system will do this for you.

201
00:25:03,519 --> 00:25:12,319
And two the t holds a lock and once you're acquired you're not allowed to release it until commit

202
00:25:12,319 --> 00:25:19,119
or abort whatever whatever is the end of the transaction.

203
00:25:21,119 --> 00:25:30,639
And so in our particular case if we are like t1 running and we have t2 running and t1 walks x first

204
00:25:31,359 --> 00:25:37,759
and then you know a lock y and it has to maintain those locks until x2 reads its commit points.

205
00:25:37,759 --> 00:25:46,480
So if t2 runs at the same time we're roughly at the same time if t2 starts a little bit later

206
00:25:46,960 --> 00:25:54,160
and tries to grab the lock and x t1 will have it if t2 started a little bit later and at that point

207
00:25:54,160 --> 00:26:01,920
you know basically t2 has to wait. That sort of standard locking protocol. And the basic idea of

208
00:26:01,920 --> 00:26:08,560
two-faced locking is that it's sort of a refinement or an improvement over this simple locking

209
00:26:08,560 --> 00:26:14,640
scheme that is described in the document and which sometimes is called simple locking or strict

210
00:26:14,640 --> 00:26:18,720
locking. We're basically at the beginning of the transaction you grab all the locks you need

211
00:26:18,720 --> 00:26:22,000
for the whole transaction you hold them until the end and then you release them.

212
00:26:22,640 --> 00:26:29,759
And two-faced locking is a little bit more fine-grained in that even if the transactions might

213
00:26:32,400 --> 00:26:35,759
and then they don't require the locks and me and me all at the same time at the beginning.

214
00:26:36,480 --> 00:26:40,640
And instead they require the locks incrementally as the transaction runs

215
00:26:40,640 --> 00:26:45,680
you know which allows you know certain concurrently patterns that are disallowed by strict locking.

216
00:26:47,680 --> 00:26:53,840
Now the first rule seems pretty clear you know why you need it. The second rule might be

217
00:26:53,840 --> 00:27:00,320
or maybe less obvious and so it's probably a good idea to actually see what goes wrong if you

218
00:27:00,319 --> 00:27:06,559
did not maintain the second rule. And so let's say talk a little bit about Intel commit.

219
00:27:12,319 --> 00:27:21,279
And so here we have our two transactions. T1 and T2, the transfer and the print statement.

220
00:27:21,919 --> 00:27:28,079
And so let's say you know here we do our put-of-x and so that means before the put-of-x the

221
00:27:28,079 --> 00:27:34,960
transaction system locks x. And let's say that we're not following the two-faced locking rule

222
00:27:34,960 --> 00:27:40,879
and we actually release the lock x right after the put because we're done with it. Actually it

223
00:27:40,879 --> 00:27:45,519
doesn't show up in transaction T1 anymore. You know there will be a later put-of-x that does the put-of-y.

224
00:27:47,599 --> 00:27:54,480
And let's assume that before actually we get to the locking and y you know T2 runs and actually T2

225
00:27:54,480 --> 00:28:05,680
basically the whole you know the two gets the get of x and the get of y run. And so since you know

226
00:28:05,680 --> 00:28:13,039
T1 released the lock and x you know it can get the lock and x. Since T1 hasn't gone to the put-of-y

227
00:28:13,039 --> 00:28:22,000
yet you know it can also get the lock on y and so print x and y and reset and then release the locks.

228
00:28:24,480 --> 00:28:36,000
So is this would this be a serializable execution?

229
00:28:41,200 --> 00:28:45,680
No it's the same as before. Yeah it's exactly the same as before because basically the

230
00:28:47,039 --> 00:28:51,599
print statements like here they sort of split in between the two to put in the get and the y

231
00:28:52,079 --> 00:28:56,799
between the two puts of the x and y and we already concluded earlier that is not a serializable

232
00:28:56,799 --> 00:29:02,879
conclusion. A serializable execution. So this is wrong and so this is an example of demonstrating that

233
00:29:02,879 --> 00:29:09,919
if you release the lock to early in this case T1 released the x to early you're not going to get a

234
00:29:09,919 --> 00:29:15,439
serialized execution. And one way to think about it basically is that whenever there's sort of an

235
00:29:15,440 --> 00:29:24,080
intersection between you know two locksets so T1 has a lock set of x and y, T2 has a lock set of x

236
00:29:24,080 --> 00:29:31,600
and y2 is important that you know during these two transactions get ordered in a particular way and

237
00:29:31,600 --> 00:29:37,519
that means that if the lock sets intersect you know we have to make sure some polar order it.

238
00:29:37,519 --> 00:29:42,080
And that means that we actually have to hold the locks you know to the end until the commit point

239
00:29:42,079 --> 00:29:46,319
so that no intermediate results with the transaction are actually visible to other transactions.

240
00:29:47,519 --> 00:29:52,319
And we release the locks before the commit point you know we might actually make a result visible

241
00:29:52,319 --> 00:29:56,639
even though you know maybe later it's actually even aborted right and then the whole change will go

242
00:29:56,639 --> 00:30:01,439
away. So this is reason why you know locks must be held to the end.

243
00:30:03,839 --> 00:30:11,119
Now an obvious problem the many of you asked about and two-faced locking is and there's a

244
00:30:11,119 --> 00:30:18,799
chance of deathlock. If you're requiring the locks and the sort of the transactions execute.

245
00:30:19,439 --> 00:30:25,759
And so let's and this is absolutely the case and so let's modify T2 slightly.

246
00:30:26,399 --> 00:30:32,159
So T2 used to be you know T1 you know gets x and step we're going to do within the opposite order

247
00:30:32,160 --> 00:30:41,440
we're first going to get y and then T2 gets x and we remain we keep T1 the same.

248
00:30:41,440 --> 00:30:44,880
We're going to T1 actually still does first to put to x and then to put the y.

249
00:30:45,519 --> 00:30:53,759
So now we can easily get into trouble so this is T2 prime and this is just the ordinary T1 that

250
00:30:53,759 --> 00:31:01,360
we already have it does a put of x you know before doing the put of x it needs to get the lock on x

251
00:31:01,359 --> 00:31:09,359
so we'll count locks x now let's say that the ordering worked out as follows you know the same time

252
00:31:09,359 --> 00:31:19,759
to T2 prime runs it does to get y so that means it got the lock on y and now you can easily see

253
00:31:19,759 --> 00:31:27,679
if it goes wrong here now T1 is going to do a put of y or wants to do a put of y so it needs to get

254
00:31:27,680 --> 00:31:35,920
the lock on y but it can't get it because you know T2 prime actually has the lock so it has the

255
00:31:35,920 --> 00:31:40,400
weight here that's the block you know the same thing is going to happen of course in the other side

256
00:31:40,400 --> 00:31:50,320
to get the one before doing to get off x T2 needs to get the lock off x and you know it can get

257
00:31:50,319 --> 00:31:59,839
the lock of x because t1 has it and so this has to weigh two and now we have you know T1 waiting

258
00:31:59,839 --> 00:32:04,879
on T2 prime and we have T2 prime waiting on T1 we're basically going to have a deadlock

259
00:32:06,960 --> 00:32:13,519
and now what is the cool part about transaction systems is that we have there's a board operation

260
00:32:14,480 --> 00:32:20,720
and so if the transaction system could detect a deadlock could use a board one of the two transactions

261
00:32:21,759 --> 00:32:26,639
let the other one proceed and hopefully that will actually get to the end and commit and

262
00:32:27,279 --> 00:32:32,480
aboard the other one and then the client or the application can decide what to do with your

263
00:32:32,480 --> 00:32:36,160
board of transaction that can actually retry it you know maybe so wait a little bit and then

264
00:32:36,160 --> 00:32:43,200
retry it and in the hope that at that point you're not going to run into a deadlock and so one

265
00:32:43,200 --> 00:32:47,279
way to think a little bit about two-phase locking is that it has a little bit of a sort of an

266
00:32:47,920 --> 00:32:53,840
optimistic flavor to it in the sense that it's not guaranteed that it won't run into problems

267
00:32:53,840 --> 00:32:59,600
but even if it runs into problems you know you can always abort and then recover from that problem

268
00:33:03,039 --> 00:33:04,160
any questions about this

269
00:33:04,480 --> 00:33:13,120
so how do you how do you find the deadlock?

270
00:33:13,120 --> 00:33:19,440
ah that's exactly what's hoping that somebody was asking that question so the way the sort of two

271
00:33:19,440 --> 00:33:30,880
broad approaches that people use one is one is not a solid as you will one is basically on a time

272
00:33:30,880 --> 00:33:35,760
out basis like if the transactions are running for a long time and you know then they don't see the

273
00:33:35,760 --> 00:33:42,880
make-for-a-progress you just aboard one of them and so this is time out based it's the more systematic

274
00:33:42,880 --> 00:33:49,600
sort of way of thinking about it is to construct and wait for graph as the transaction systems you know

275
00:33:50,080 --> 00:33:56,880
are moving so for example if you know T1 runs so in the wait-for-graph the transactions are the notes

276
00:33:56,960 --> 00:34:02,560
so we can have a note T1 and we make a note T2 when they start with T2 prime if you will

277
00:34:03,280 --> 00:34:08,960
and when T1 runs you know it gets x nothing bigger then you know it gets to the lock of y it can't do

278
00:34:08,960 --> 00:34:16,880
it so we'll make an arrow for you know T1 to T2 prime to indicate that T1 is waiting for T2 prime

279
00:34:17,680 --> 00:34:23,760
then at some point like on T2 is running you know T2 hits that's T2 prime hits this point

280
00:34:23,760 --> 00:34:29,360
where it wants to lock x it can't do it so you know we'll look at like we're waiting for who's

281
00:34:29,360 --> 00:34:35,520
holding the lock well it's T1 and so we'll put an edge you know in the wait-for-graph from T2

282
00:34:35,520 --> 00:34:43,680
to T2 prime to T1 and now we see that there's a cycle and whenever there's a cycle that means

283
00:34:43,680 --> 00:34:47,680
that it's a depth lock right because one is waiting in the other and the other is waiting on the

284
00:34:47,679 --> 00:34:55,679
other and so the transaction system can sort of construct these graphs on the fly detect one there's

285
00:34:55,679 --> 00:35:03,599
a cycling to graph and then we'll arrange either a board T1 or a board T2 prime so let's go to wait

286
00:35:04,079 --> 00:35:14,559
for graph what happens after the abort?

287
00:35:16,159 --> 00:35:24,799
uh well uh so let's say we abort T2 just for as an experiment so we're going to kill this guy

288
00:35:25,360 --> 00:35:31,039
so T2 basically this transaction system is going to arrange as we'll see in a second

289
00:35:31,039 --> 00:35:37,360
it's going to arrange that basically none results of T2 are T2 prime invisible at that point

290
00:35:37,360 --> 00:35:44,320
you know the lock is released right and the abort will force the lock release off the Y because T2

291
00:35:44,320 --> 00:35:49,920
prime is backing out that means that you know T1 can get the lock on Y and proceed to finish

292
00:35:51,199 --> 00:35:56,320
the client that called T2 prime is going to learn that the transaction aborted and for

293
00:35:56,320 --> 00:36:05,280
example it can just choose to rerun it again so that doesn't make sense?

294
00:36:10,960 --> 00:36:16,559
okay so this is sort of the first part uh you know actually all of what I wanted to say about

295
00:36:16,559 --> 00:36:22,559
two-phase locking except I wanted to address the sort of homework assignment again which is like

296
00:36:22,559 --> 00:36:28,079
in what situations does two-phase locking allow for more concurrency than strip locking right we're

297
00:36:28,079 --> 00:36:35,279
strip locking what's the protocol where the transaction acquires all the locks in advance and this

298
00:36:35,279 --> 00:36:40,320
requires that the programmer or like the beginning of the transaction basically declares which locks

299
00:36:40,320 --> 00:36:45,920
that transaction actually needs and so to slightly undesirable like less programmer friendly but it has

300
00:36:45,920 --> 00:36:53,119
the advantage that you know you don't actually you can run into these you don't have to abort

301
00:36:53,119 --> 00:36:59,920
an transaction at the end in the case you run into a deadlock so two-phase locking you're allowed for

302
00:36:59,920 --> 00:37:05,599
more concurrency in principle or it should live for more concurrency then the strip locking or

303
00:37:05,599 --> 00:37:11,680
the simple locking scheme and so I would like to do is a quick breakout room for a couple minutes

304
00:37:11,679 --> 00:37:18,960
like five minutes again and you know convince yourself or constructing case we're simple locking with

305
00:37:19,519 --> 00:37:24,319
this allows some concurrency that two-phase locking was actually able to exploit.

306
00:37:24,800 --> 00:37:29,680
All right let's do breakout rooms.

307
00:37:34,400 --> 00:37:41,600
Okay see you in five minutes.

308
00:43:54,320 --> 00:44:08,080
We can't hear you.

309
00:44:17,760 --> 00:44:18,880
I think you're muted.

310
00:44:24,880 --> 00:44:40,559
I have a question about one of the previous slides that you're talking about.

311
00:44:40,559 --> 00:44:43,119
Yeah.

312
00:44:43,119 --> 00:44:46,320
Let me double check if everybody can hear me now.

313
00:44:46,320 --> 00:44:48,320
Yes.

314
00:44:48,320 --> 00:44:50,320
Oh yeah good.

315
00:44:50,320 --> 00:44:52,320
Go ahead.

316
00:44:52,320 --> 00:44:57,119
On one of your previous or I guess this is just a general question but is the lock point always the same as the commit point

317
00:44:57,119 --> 00:45:01,519
or is it possible to start relinquishing locks before your commit point?

318
00:45:01,519 --> 00:45:06,159
Okay this is a very good question so it depends.

319
00:45:06,960 --> 00:45:13,279
So if you only do exclusive locking as we've done so far at least in my examples then the commit point

320
00:45:13,279 --> 00:45:17,679
is similar to the lock point is similar to the commit point in the board point.

321
00:45:18,239 --> 00:45:26,079
If you have read right locking so locks that allow both read locks and write locks then it's

322
00:45:26,079 --> 00:45:30,239
possible to release read locks earlier with some restrictions.

323
00:45:32,799 --> 00:45:34,799
Thank you.

324
00:45:34,960 --> 00:45:42,640
Okay so can somebody give me one example of where two phase locking is a lot of

325
00:45:42,640 --> 00:45:47,280
for more concurrency than simple locking just to make sure that we all on the same page?

326
00:45:52,320 --> 00:45:59,360
The audit function example like you can release the lock as soon as you read this person's

327
00:46:00,240 --> 00:46:02,960
amount like you don't have to wait until you read everyone's.

328
00:46:04,400 --> 00:46:08,079
This is an example of exploring the read read locks if you have read locks.

329
00:46:15,200 --> 00:46:16,000
Any other examples?

330
00:46:20,000 --> 00:46:24,480
If you have a transaction where there's like a condition that only rarely like

331
00:46:24,719 --> 00:46:30,639
is true and you read a piece of data when it's true so at the beginning you don't need to acquire

332
00:46:30,639 --> 00:46:33,599
the lock for that only when you actually need to read it.

333
00:46:33,599 --> 00:46:37,119
Yep that's a great example. I have a person like that example a lot. That's a great one.

334
00:46:39,039 --> 00:46:44,960
Good okay good so let's move on basically into the second topic of this lecture which is

335
00:46:44,960 --> 00:46:45,840
two phase commit.

336
00:46:49,360 --> 00:46:51,039
And this is really dealing with crashes.

337
00:46:51,840 --> 00:46:54,800
Switch back to blue.

338
00:47:01,840 --> 00:47:03,199
We can't see the slides either yet.

339
00:47:03,199 --> 00:47:08,559
Oh I mean yeah fixed on it.

340
00:47:11,039 --> 00:47:12,400
And the loop hold out.

341
00:47:16,000 --> 00:47:16,800
Share screen.

342
00:47:16,960 --> 00:47:17,760
Okay.

343
00:47:17,760 --> 00:47:19,760
How about now?

344
00:47:19,760 --> 00:47:20,560
All good.

345
00:47:20,560 --> 00:47:21,280
Okay.

346
00:47:21,280 --> 00:47:21,760
Good thing.

347
00:47:21,760 --> 00:47:22,560
Thank you.

348
00:47:22,560 --> 00:47:24,560
All right so two phase commit.

349
00:47:28,560 --> 00:47:30,560
We're two PC.

350
00:47:30,560 --> 00:47:32,560
This is popular called.

351
00:47:32,560 --> 00:47:38,560
Again this is a very well known popular protocol.

352
00:47:38,560 --> 00:47:44,080
I'm going to talk about the base sort of simple straightforward or the most common

353
00:47:44,079 --> 00:47:46,079
version of the protocol.

354
00:47:46,079 --> 00:47:54,239
There are all kinds of variations of it but you know in they all sort of have the same

355
00:47:56,880 --> 00:47:58,000
underlying idea.

356
00:47:58,000 --> 00:48:04,799
And so again typically in two phase protocol and I'm going to do it in the context of the

357
00:48:04,799 --> 00:48:06,400
transfer transaction.

358
00:48:06,400 --> 00:48:13,360
So a client that actually wants to do a transfer you know basically submits the transfer

359
00:48:13,360 --> 00:48:14,880
transaction through the transaction system.

360
00:48:16,640 --> 00:48:20,880
And the machine sort of receives that transaction is called the coordinate.

361
00:48:23,519 --> 00:48:31,200
And that machines in charge of running the transaction through the transaction system.

362
00:48:31,840 --> 00:48:35,680
And so the coordinator will talk in our case to two different machines.

363
00:48:36,639 --> 00:48:42,879
And a and b were a holds you know x and b holds y.

364
00:48:45,199 --> 00:48:53,440
And and basically the you know one way that this typically goes is that the coordinator

365
00:48:53,440 --> 00:48:57,119
first sort of does the whole transaction but in a tentative way.

366
00:48:57,119 --> 00:49:03,279
So the put x you know results in a message to a you know locking a

367
00:49:04,240 --> 00:49:11,760
modifying a you know put put x except you know the put is not actually visible yet in the

368
00:49:11,760 --> 00:49:12,240
database.

369
00:49:12,240 --> 00:49:19,680
What is done is put in a log very much like in sort of in the frontipani style where we have

370
00:49:19,680 --> 00:49:24,160
a right-of-hand log all the upgrades that we at some point want to materialize in the database

371
00:49:24,160 --> 00:49:24,640
itself.

372
00:49:24,640 --> 00:49:30,400
We first put in the log until later in the discipline case until we hit commit and then we actually

373
00:49:30,400 --> 00:49:32,400
will install everything in the database.

374
00:49:33,280 --> 00:49:37,119
So we'll do the put we do a second put so you have to y.

375
00:49:40,320 --> 00:49:44,880
And not the same thing happens there you know the we get a lock on y.

376
00:49:44,880 --> 00:49:48,960
Okay so this should have been lock and x and we'll do the put on y.

377
00:49:50,800 --> 00:49:55,920
And again we're going to not actually you know really put the value in the database we

378
00:49:56,000 --> 00:49:59,920
use are going to log x so we're log y and here we're log x.

379
00:50:01,519 --> 00:50:08,400
Okay and now the coordinate has done two you know the transactions the two of the main

380
00:50:08,400 --> 00:50:14,639
operations and now it's already to commit and here's where the two-phase part comes in.

381
00:50:15,599 --> 00:50:22,159
And so the coordinator will send a prepare message and I'm first going to describe this

382
00:50:22,159 --> 00:50:28,159
protocol in the case there's no failures and just everything works out just a storage should

383
00:50:28,159 --> 00:50:30,559
of the easy cases it will.

384
00:50:31,599 --> 00:50:40,960
Since a prepare message to prepare a prepare B

385
00:50:45,279 --> 00:50:50,159
and the prepare message of course it includes the transaction ID that is actually used for

386
00:50:50,159 --> 00:50:56,000
you know this transaction so every transaction has an transaction ID and all the message are tagged

387
00:50:56,000 --> 00:50:59,679
now with the transaction ID so we always know about which transaction we're talking about.

388
00:51:01,759 --> 00:51:07,599
When a and b received these prepare messages you know they look at their state and

389
00:51:08,399 --> 00:51:12,719
you know see if they indeed can actually execute the transaction you know they're holding the lock

390
00:51:12,719 --> 00:51:19,359
on x in this case the x is actually in the log and so they sent back you know saying yep

391
00:51:19,360 --> 00:51:30,880
while I'm ready to commit so yes yes and at this particular point you know sort of the crucial sort

392
00:51:30,880 --> 00:51:38,320
of step is the coordinator now knows that basically both a and b are prepared to commit and

393
00:51:38,320 --> 00:51:46,480
then so and I have basically promised to commit by actually responding to the y and at this point the

394
00:51:46,480 --> 00:51:55,360
coordinator commits and then you know since messages you know again to the a saying commit

395
00:51:57,039 --> 00:52:03,760
and the transaction TID similar message to B you know commit TID

396
00:52:07,119 --> 00:52:13,280
and at this particular point a and b actually perform the operation so they basically install

397
00:52:14,080 --> 00:52:20,320
you know at this point you know they install you know the log version of y your

398
00:52:20,320 --> 00:52:28,960
instance actually this participants installs the x and they release the locks so release

399
00:52:28,960 --> 00:52:38,880
of y and here they release of x and they respond back you know to the coordinator saying like yep

400
00:52:38,960 --> 00:52:46,480
all done and at that point the you know the transaction is completely done and in the fact you know

401
00:52:46,480 --> 00:52:50,000
the coordinator doesn't really have to remember anything anymore about this particular transaction

402
00:52:50,800 --> 00:52:55,680
and also we see later you know a and b you know need to remember that state a little bit longer

403
00:52:55,680 --> 00:53:02,160
until they hear about the next intersection okay so this is the core basic cave when there's

404
00:53:02,159 --> 00:53:08,799
absolutely no failure and we see what we actually get you desired outcome correct you know

405
00:53:08,799 --> 00:53:12,399
when does the coordinator commit the coordinator commits only

406
00:53:19,359 --> 00:53:23,519
if a and b agree

407
00:53:23,920 --> 00:53:34,480
okay it could be the case that we know example when the coordinator sends a message to

408
00:53:34,480 --> 00:53:41,599
b that b decides well I can't really commit maybe so it could be multiple or the reasons for it

409
00:53:42,320 --> 00:53:50,400
maybe the b actually is in a situation where there's a debt lock with y or you know

410
00:53:50,720 --> 00:53:57,599
there's no space in the log anymore or there's not enough money in the account of y and so you know

411
00:53:57,599 --> 00:54:04,320
the b could respond we even know let's say in this so the other possible outcome is you know

412
00:54:04,320 --> 00:54:11,039
the preparedness can actually be consenting that the no back and in that case the coordinator gets

413
00:54:11,039 --> 00:54:17,039
one yes you know from a no from b so both do not agree and in that case you know the coordinator

414
00:54:17,039 --> 00:54:23,199
cannot commit the transaction and then we'd actually abort the transaction and then say the

415
00:54:23,199 --> 00:54:29,279
board messages to a b basically you know discontinuing the transaction so as soon as we're the two

416
00:54:29,279 --> 00:54:34,000
possible outcomes one in the commit case one in the board case and whether there's always a case

417
00:54:34,000 --> 00:54:39,039
that the transaction only commit the top level transaction only commits if the both of the participants

418
00:54:39,039 --> 00:54:48,880
are involved in the transaction agree to do so now that's sort of the outline of the protocols

419
00:54:48,880 --> 00:54:54,880
I want to now go through a couple of cases you know sort of to understand you know what can go wrong

420
00:54:54,880 --> 00:55:01,360
and you know how we do how to face commit arrangers that actually the still the right thing happens

421
00:55:02,000 --> 00:55:07,599
actually I have a question here um so we said that like b might decide that it needs the board

422
00:55:08,000 --> 00:55:14,400
um since back on no message what if it decides it needs to abort after it replied yes

423
00:55:14,400 --> 00:55:20,159
would that ever be possible I know we'll talk about it in a second but that's absolutely not possible

424
00:55:20,159 --> 00:55:27,199
if you promise to go commit you have to commit or you have to be ready to commit

425
00:55:27,199 --> 00:55:30,719
well you have to be ready to commit you don't commit right away you have to wait until the

426
00:55:30,719 --> 00:55:36,719
commit message of course but you cannot bail out anymore so until to prepare the b can

427
00:55:36,719 --> 00:55:42,239
you know literally abort a transaction once a promise yes it cannot you know let her be

428
00:55:42,239 --> 00:55:48,319
aborted to section anymore so is it possible were you in that lock but you can't get out of the

429
00:55:48,319 --> 00:55:56,959
that lock because everyone in that cycle has agreed to prepare a commit if everybody agrees to

430
00:55:56,959 --> 00:56:01,839
prepare and they can definitely commit then they will commit and you're still holding walks

431
00:56:02,639 --> 00:56:06,480
right but what if you're in that lock because we mentioned before how one of the reasons why you might

432
00:56:06,480 --> 00:56:09,840
want to do more of this second at lock you would you would fight it out before to prepare

433
00:56:11,199 --> 00:56:16,480
if you get a lock so why if you did not succeed in getting those necessary walks for the transaction

434
00:56:16,480 --> 00:56:24,480
uh then you know at that point right thank you okay so this is exactly the kind of discussion

435
00:56:24,480 --> 00:56:32,000
is going to come up so i'm going to go i'm going to take the same board and replicate it and consider a

436
00:56:32,000 --> 00:56:39,840
bunch of different cases so here's the same board again nothing has changed so far it's identical

437
00:56:40,400 --> 00:56:43,920
and so let's the first you know to sort of follow up on this question that we just asked

438
00:56:45,199 --> 00:56:52,400
let's first consider the case where b you know is in the prepared state

439
00:56:54,159 --> 00:56:59,360
and then crash like right after so it is prepared

440
00:57:02,239 --> 00:57:10,559
it pointed back set back to the coordinator that it actually is agreeing to go along

441
00:57:11,920 --> 00:57:17,440
and right after it sends actually the prepared message okay message that actually crashes

442
00:57:19,119 --> 00:57:26,639
what does that mean what needs to happen how how we're going to resolve this or what is the risk

443
00:57:27,199 --> 00:57:35,759
so basically b crashes uh if b crashes we need to abort the whole thing right no we cannot abort

444
00:57:35,759 --> 00:57:42,400
anymore right because you know be already promised now this is going to commit where we're going to use

445
00:57:42,400 --> 00:57:48,159
the log yeah well okay so b is going to crash and then at some point it's going to come back up

446
00:57:48,159 --> 00:57:54,719
right it's going to recover hopefully and what state doesn't need to remember across crashes

447
00:57:57,199 --> 00:58:05,039
um and it needs to remember that it prepared yeah i need to remember that it prepared for

448
00:58:05,039 --> 00:58:10,879
transaction ID whatever the t ID was and that is holding the lock on why

449
00:58:12,879 --> 00:58:18,079
and so when it comes back up the first thing it has to do is sort of look saying like how i was

450
00:58:18,079 --> 00:58:24,400
in the middle of a you know participant in a distributed transaction uh and i should look at

451
00:58:24,400 --> 00:58:31,119
the state and you'll see that it was actually prepared for transaction ID uh t ID and it was and

452
00:58:31,119 --> 00:58:36,160
and must hold the lock for lny what the lock for y before does anything else you know before

453
00:58:36,160 --> 00:58:42,160
talking to anything once it is in that state you know then it is if it didn't crash right and

454
00:58:42,880 --> 00:58:47,200
things are sort of back to normal and hopefully at some point the coordinator will retry

455
00:58:48,000 --> 00:58:53,599
the commit message the b will get that commit message for this transaction ID sees that

456
00:58:53,599 --> 00:58:59,279
uh yeah i'm indeed prepared uh and i hope the lock on why and so it just goes along and installs

457
00:58:59,279 --> 00:59:06,880
why and that's that our finishes to transaction that makes sense so basically you know there's

458
00:59:06,880 --> 00:59:13,039
a little bit of refinement here that we actually have to write some stable you know some data to

459
00:59:13,039 --> 00:59:18,400
stable storage you know as part of the transaction and what's the first part of two-phase commit this

460
00:59:18,400 --> 00:59:22,400
is one of the reason that two-phase commit is a little bit expensive right because not only we have to

461
00:59:22,400 --> 00:59:29,119
send sort of multiple random messages but also a participant actually has to write things to

462
00:59:29,119 --> 00:59:35,119
stable storage and as we talked about before writing to stable storage is quite expensive right

463
00:59:35,119 --> 00:59:40,000
it could be easily a couple milliseconds you know let's say it's one millisecond you know

464
00:59:40,000 --> 00:59:43,760
optimistically yeah that means basically that we're immediately limited to sort of a thousand

465
00:59:43,760 --> 00:59:50,000
to exactly per second right no more okay let's look at consider another case

466
00:59:51,840 --> 00:59:54,480
uh and so let me duplicate this slide again

467
01:00:01,840 --> 01:00:07,920
and consider yet another case um let's say uh

468
01:00:08,800 --> 01:00:16,079
uh we uh the coordinated crashes and so uh you know we're ready again

469
01:00:16,079 --> 01:00:23,920
uh that's cancelled and you know we got like one uh we got the prepared messages and the

470
01:00:23,920 --> 01:00:28,559
coordinator again maybe you'd set out one commit message and then crash it like right here

471
01:00:29,920 --> 01:00:36,159
uh you know what what do we need to range you know to make sure that the whole plan works out

472
01:00:38,159 --> 01:00:47,760
so the coordinator needs to store into persistent state what uh what are the commands that were

473
01:00:47,760 --> 01:00:52,639
promised to be committed but were not committed yet yeah so the commander is almost the same as

474
01:00:52,639 --> 01:00:58,320
sort of the it's an analyst and necklace to be case correct now if we commit a transaction we

475
01:00:58,320 --> 01:01:01,680
need to write to stable storage that we're actually committing the transaction so we need to write

476
01:01:01,759 --> 01:01:09,440
to stable storage you know commit TID so that then when the coordinator comes back up then

477
01:01:10,159 --> 01:01:15,599
a connection finished transaction until actually the uh amd that indeed the transaction is committed

478
01:01:15,599 --> 01:01:21,440
because amd are waiting right amd said like yeah we're happy to go along and they're just waiting

479
01:01:21,440 --> 01:01:26,000
awaiting until actually they uh hear from the coordinator to decide what's done because

480
01:01:26,800 --> 01:01:32,079
once they decided uh once they went along or once they agreed to go along you know they cannot

481
01:01:32,079 --> 01:01:37,679
do you know leverly anymore bail out correct because uh let's say they actually both said they

482
01:01:37,679 --> 01:01:43,519
agreed along uh then it means that the coordinator they they don't know they may the coordinator

483
01:01:43,519 --> 01:01:48,639
may have uh send a commit message to for example a and a actually has committed to the transaction

484
01:01:48,639 --> 01:01:53,119
you know b hasn't heard yet maybe the message got delayed then the the coordinator crashed

485
01:01:53,119 --> 01:01:57,920
and you know at that point it would be totally wrong for me to abort that the transaction

486
01:01:57,920 --> 01:02:03,519
it really has to wait until the coordinator comes back to tell when actually the outcome is of the

487
01:02:03,519 --> 01:02:17,679
transaction okay so the only uh sorry the only message that the coordinator is not going to

488
01:02:17,679 --> 01:02:24,719
resend is prepared that one if it gets like doesn't get a yes it'll just abort yeah I'll try

489
01:02:24,719 --> 01:02:32,319
to give us the next example so let's do that uh let me duplicate this board again and talk about

490
01:02:32,319 --> 01:02:41,759
that case uh so just for fun let's move it down so it looks track uh so let's say you know the following

491
01:02:41,760 --> 01:02:53,040
thing happens um the this prepared here message never makes it right and then you know the coordinator

492
01:02:53,040 --> 01:02:59,840
can unilaterally decide you know to abort right and in the fact you can tell B you know to be

493
01:02:59,840 --> 01:03:08,240
bored and you know A doesn't really need to know anything about it English uh the uh it's a word

494
01:03:08,239 --> 01:03:12,079
later you know will come up and can ask the coordinator if the coordinator doesn't know anything

495
01:03:12,079 --> 01:03:16,159
very anymore about this transaction you can just tell IA yeah yeah now that's the transaction we

496
01:03:16,159 --> 01:03:20,959
abort it because I don't have a commit record anymore and I was not waiting to inform anybody

497
01:03:22,879 --> 01:03:28,639
so in that case we can do in the board and that means that B can release the locks correct and B

498
01:03:28,639 --> 01:03:35,679
can just proceed you know happily trying to uh do other transactions that might involve uh why

499
01:03:38,799 --> 01:03:46,159
okay um sorry so what will happen if the message 2a gets lost the coordinator abords

500
01:03:47,119 --> 01:03:52,959
and then be cautious but then when it comes up it's going to wait for a commit message from

501
01:03:53,519 --> 01:04:00,719
the coordinator for the transaction has aborted already yeah or uh and so either there's two cases uh

502
01:04:00,719 --> 01:04:04,719
you know presumably you know in the most protocols actually you be well pinged the coordinator

503
01:04:04,879 --> 01:04:09,439
because the knows you used the coordinator and ask it how you what's the outcome of that transaction

504
01:04:15,839 --> 01:04:20,079
okay so one more case I want to return to one case that there's actually sort of the the most

505
01:04:20,079 --> 01:04:27,679
interesting case uh one of the more tricky cases so I just know a brief question uh yeah hold on hold on one

506
01:04:27,679 --> 01:04:35,519
sorry yeah yeah so the first question is that uh so so let's so B let's say holds the lock on Y

507
01:04:36,159 --> 01:04:40,879
all the way through between putting Y into the log until installing Y

508
01:04:41,440 --> 01:04:46,799
uh to the actual state so that's okay uh and then the second question so the locks here are

509
01:04:47,440 --> 01:04:53,519
distributed because we're dealing with across servers or uh I mean if Y only exists on the server B

510
01:04:53,519 --> 01:04:57,519
then maybe we don't need distributed lockings I'm just curious on what the setup yeah the setup

511
01:04:57,519 --> 01:05:02,880
is basically the A maintains the locks for all the shards that it has or for all the variables or

512
01:05:02,880 --> 01:05:08,239
all the records that it has and D maintains all the locks for all the records it has okay but if we

513
01:05:08,239 --> 01:05:12,960
for example have Y being on multiple servers then we need some sort of distributed lock them yeah

514
01:05:12,960 --> 01:05:16,559
yeah yeah like so this is we're talking about the shard at case right where the accounts are

515
01:05:16,559 --> 01:05:20,239
shard at across multiple servers and only one server has a particular account

516
01:05:22,559 --> 01:05:25,759
awesome thank you I'm coming back through this later actually one more time

517
01:05:26,960 --> 01:05:33,599
so the first thing I wanted to point out uh is just going back to sort of the uh the

518
01:05:36,000 --> 01:05:42,799
the case where um B or A you know said yes and then crashes

519
01:05:43,280 --> 01:05:52,640
correct um or actually yeah let me see is this the case uh no I want the case to follow case sorry

520
01:05:54,880 --> 01:06:02,400
oh fixed is lying so A, B promised their thing uh but I want to go back to the case where

521
01:06:02,400 --> 01:06:09,039
that we already discussed which is right after the commit point um the coordinate crashes

522
01:06:09,519 --> 01:06:18,880
correct and we know right this this interval of time from here to there basically

523
01:06:19,599 --> 01:06:25,759
uh B cannot unilaterally abort anymore right because it's promoted promised you know to go along

524
01:06:25,759 --> 01:06:32,159
and it might have been the case that actually A did actually already did the commit and so it

525
01:06:32,159 --> 01:06:38,559
cannot unilaterally abort anymore and so there's only one option in this case and what is that one

526
01:06:38,559 --> 01:06:40,559
option

527
01:06:52,480 --> 01:07:00,719
you just wait yeah it's unfortunate but true the only thing that B can do is wait

528
01:07:01,679 --> 01:07:06,320
and then it's still holding the lock on Y correct so that means that any other transaction that

529
01:07:06,320 --> 01:07:13,280
involves Y you know it cannot proceed um one has to wait you know until the coordinator comes

530
01:07:13,280 --> 01:07:19,200
back and announces or uh re-enounces whatever the decision was that actually was the outcome for that

531
01:07:19,200 --> 01:07:25,120
prediction of transaction and this is one of the you know sort of the two aspects uh this is one

532
01:07:25,120 --> 01:07:33,120
of the sort of aspects of the two-phase commit uh that are a bit undesirable right where um the

533
01:07:33,679 --> 01:07:41,199
uh the protocol might use block uh into a machine comes back does that make sense

534
01:07:45,679 --> 01:07:50,559
so how do people do deal deal deal this in practice well it's a little bit of fortunate

535
01:07:51,279 --> 01:07:55,759
but the years were you know some of our techniques from the past can come to rescue now what could

536
01:07:55,760 --> 01:08:00,560
we do with the coordinator to make this scenario unlikely

537
01:08:06,240 --> 01:08:10,400
and so it can make it full pattern like yeah yeah make it full tolerance how could we do it

538
01:08:13,520 --> 01:08:18,239
well there are multiple approaches but uh we can do it with making through uh

539
01:08:18,719 --> 01:08:26,079
uh wrap yeah you know run the raft to basically basically run the coordinator not on a single

540
01:08:26,079 --> 01:08:29,599
machine but basically have a replicated state machine right that implements the coordinator

541
01:08:30,399 --> 01:08:36,559
and you know we'll use a raft to sort of uh keep the replicated state machine and the

542
01:08:36,559 --> 01:08:42,239
implements the coordinator uh in sync uh and then if one of the machines that forms the

543
01:08:42,239 --> 01:08:47,119
coordinated fails are hopefully the two others are still there and so we can still proceed

544
01:08:47,279 --> 01:08:54,559
right and so it's potentially possible you know to basically you know replicate the coordinator

545
01:08:54,559 --> 01:08:59,920
or actually any of the participants to know using raft so let me actually

546
01:09:01,199 --> 01:09:04,399
so we'll put this up a little bit since a couple of little bit is more

547
01:09:09,519 --> 01:09:12,960
so a couple discussion points which is you know we could use raft

548
01:09:17,439 --> 01:09:25,840
to make the coordinator full tolerance or available if you will that's really the property we care

549
01:09:25,840 --> 01:09:26,079
about

550
01:09:31,359 --> 01:09:32,000
does that make sense?

551
01:09:36,479 --> 01:09:41,680
In fact if you will see if you do lap four instead of a project this is exactly actually

552
01:09:41,680 --> 01:09:47,920
what lap four does lap four actually has a similar scheme where you know there's a form of

553
01:09:47,920 --> 01:09:55,520
two face commit that you know and which implement and uh move the uh the the master shard or the

554
01:09:55,520 --> 01:10:03,360
master coordinator and rebalance the charge across uh a charge servers uses raft to replicate

555
01:10:03,360 --> 01:10:07,840
itself and actually the charge servers itself also replicate itself using raft and so we're

556
01:10:07,840 --> 01:10:14,159
mainly many raft groups running in parallel and that's sort of the essence of lap four

557
01:10:14,880 --> 01:10:19,760
and so this is like the typical your way you know if you're concerned about like having the

558
01:10:19,760 --> 01:10:24,239
system being blocked for a long period of time you know one way to do it is basically make the

559
01:10:25,520 --> 01:10:26,560
coordinated fault tolerance.

560
01:10:29,520 --> 01:10:35,360
um so in that means you can bridge me to something else which a lot of people asked about

561
01:10:36,000 --> 01:10:41,759
you know is raft our raft and two face commits sort of similar face

562
01:10:45,920 --> 01:10:52,399
or could you do two face commit be raft or you know they have a little bit of a parallel

563
01:10:52,399 --> 01:10:57,279
correct there's like one thing is called the coordinator or raft is called the leader we got

564
01:10:58,239 --> 01:11:01,439
you know participants you know maybe you know we can figure about these are followers

565
01:11:02,399 --> 01:11:06,399
uh you know so you know seems to have some similarities like how do we think about like what's

566
01:11:06,399 --> 01:11:09,199
the relationship between raft and two pc.

567
01:11:12,159 --> 01:11:18,000
the difference is that um in raft the the coordinator can change essentially um

568
01:11:18,000 --> 01:11:20,079
true otherwise it's like the single point of failure.

569
01:11:20,639 --> 01:11:22,799
yep good point any

570
01:11:25,199 --> 01:11:29,439
so another difference is that the raft basically depends on the concept of a majority where

571
01:11:29,439 --> 01:11:34,719
the two face commit the coordinator needs to get a response from every single uh other server that

572
01:11:34,719 --> 01:11:37,119
is involved in the uh the commitment. yep.

573
01:11:37,119 --> 01:11:38,159
yep all those are good points.

574
01:11:38,159 --> 01:11:43,199
the digital is really like protocol differences correct uh and you know we're wondering if we can

575
01:11:43,199 --> 01:11:48,479
we get to a point where like is there just conceptual difference like do they solve the same problem

576
01:11:50,079 --> 01:11:56,719
um raft is for replicating the same thing and two face commit is when you do the opposite when you

577
01:11:57,199 --> 01:12:02,320
instead of having one thing you spread across different servers then you have to take the problem.

578
01:12:02,320 --> 01:12:08,079
exactly exactly uh um raft all servers do the same thing

579
01:12:13,840 --> 01:12:15,840
so the implementing a replicate state mission right

580
01:12:18,159 --> 01:12:23,360
and in two pc actually servers are all servers operate on different data

581
01:12:26,720 --> 01:12:40,560
so the first participant was actually operating on x and second participant was operating on what

582
01:12:41,360 --> 01:12:45,360
so in two pc really you know solves a completely different problem than raft.

583
01:12:45,359 --> 01:12:48,000
gonna raft is really all about high availability

584
01:12:54,880 --> 01:12:59,920
and uh two pc is really about you know atomic operations across servers

585
01:13:07,679 --> 01:13:10,000
or across data that's living on different servers.

586
01:13:10,720 --> 01:13:16,880
does not make sense? so even though like maybe they have some you know internal techniques that

587
01:13:16,880 --> 01:13:22,319
looks like very similar the two protocols you know are designed for completely different problems

588
01:13:23,600 --> 01:13:27,840
and i'm not directly related now it's interesting to see correct that we could make a raft

589
01:13:27,840 --> 01:13:31,359
we can use raft to make the coordinate in more fault tolerance or the petitions may have

590
01:13:31,359 --> 01:13:36,079
uh more highly available uh but they basically essentially they solve different problems

591
01:13:40,880 --> 01:13:49,279
with that actually wanted to end this lecture and i'm happy to entertain more questions

592
01:13:49,920 --> 01:13:55,760
um hopefully this will very helpful in the next two papers so the next two papers are both two

593
01:13:55,760 --> 01:14:05,119
transaction systems one uh one from google you want to microsoft research and second one uses

594
01:14:05,199 --> 01:14:10,399
optimistic transactions uh and you will see when you read these papers there's a lot of machinery

595
01:14:10,399 --> 01:14:15,119
they're pretty complex systems uh but hopefully at least you know some of the parts that will be

596
01:14:15,119 --> 01:14:19,119
described you will sort of know and understand because you know what two phase committees and you know

597
01:14:19,119 --> 01:14:26,880
what two phase lockings. all right with that i'll end uh yeah everybody we need to go and go and

598
01:14:26,960 --> 01:14:29,680
anybody wants to ask questions no please feel free to do so.

599
01:14:36,960 --> 01:14:43,359
uh sorry this might be a little uh a strange question but for two phase locking

600
01:14:44,079 --> 01:14:53,119
it is also about atomic operations but there it is about one um not across servers but across one

601
01:14:53,199 --> 01:14:59,439
server and two phases across multiple servers. yeah two phase locking is relevant to if you have a single

602
01:14:59,439 --> 01:15:05,359
machine like a multi-core machine and you implement a transaction system on a multi-core machine uh you

603
01:15:05,359 --> 01:15:10,399
will have to walk you know the records that are involved in the transaction uh and two phase locking is

604
01:15:10,399 --> 01:15:18,399
a perfectly good protocol for doing so. where two phase committees really have had distributed systems.

605
01:15:18,879 --> 01:15:28,239
I guess my question was is two phase two phase locking can it be part of two phase committee?

606
01:15:30,399 --> 01:15:35,759
I'm not sure I know what that means. do we I think about this they yourself two different problems.

607
01:15:38,559 --> 01:15:44,399
okay it is the case that you know you you mean maybe this is what you mean. it is the case where

608
01:15:44,399 --> 01:15:51,439
that you know there's a the coordinator or it's part of like the initial setup like when the initial

609
01:15:51,439 --> 01:15:56,719
puts are done by the transaction uh that transaction will follow two phase locking. you know

610
01:15:56,719 --> 01:16:04,079
if you hear the lock and a axis required lock and b is required. so and we're lock and y is

611
01:16:04,079 --> 01:16:08,559
acquired and so the the transaction does that in the two phase locking style. it could have done

612
01:16:08,720 --> 01:16:15,120
using strict walking too but you know from the two phase committee point of view it doesn't really matter

613
01:16:15,120 --> 01:16:19,760
like at some point you know the the sort of transaction is tentatively executed and the two phase

614
01:16:19,760 --> 01:16:25,760
committees really about uh reaching agreement uh that all parties are agreed to go along.

615
01:16:28,480 --> 01:16:33,680
yeah that makes sense thank you you're welcome. is two phase committee exclusively for like

616
01:16:33,680 --> 01:16:44,960
started data? no actually it came out uh although yes or no the original sort of three phase committee

617
01:16:44,960 --> 01:16:50,800
came out of the case where like you have different organizations and they need to agree to do

618
01:16:50,800 --> 01:16:57,920
something like you know your book a uh on some uh travel website you know you book a trip and

619
01:16:58,000 --> 01:17:03,760
another thing you book a hotel and you want to sort of commit you know to the whole trip is

620
01:17:03,760 --> 01:17:12,560
you know both the hotel website and uh uh the travel website that agreed to go along or

621
01:17:12,560 --> 01:17:17,840
sort of commit to the transaction um and that's sort of the setting where you know sort of the

622
01:17:17,840 --> 01:17:22,399
setting that where it came up is really you know you have different organizations that need to commit

623
01:17:22,399 --> 01:17:32,799
to a particular uh uh operation uh and uh for the reasons that uh in that setting actually uh basically

624
01:17:32,799 --> 01:17:38,479
people don't really want to use two phase committee uh because that would mean that uh the travel

625
01:17:38,479 --> 01:17:44,719
agency website is dependent on the hotel reservation websites and you know these are from different

626
01:17:44,719 --> 01:17:48,479
organizations and you know people you know the organizations don't really trust each other

627
01:17:48,479 --> 01:17:55,679
and if one goes down then the transaction can't proceed and that seems all bad so in fact two phase

628
01:17:55,679 --> 01:18:00,639
committee had a sort of a bit of a negative reputation um because it was really you know

629
01:18:01,679 --> 01:18:05,279
really one of the original goals of two phase committee was to solve that problem with that problem

630
01:18:05,279 --> 01:18:09,839
where people don't really want to solve with two phase committee however in the context where like

631
01:18:09,839 --> 01:18:14,399
you have a data center it's a single organization and the database is sharducked two phase committee

632
01:18:14,399 --> 01:18:25,439
is widely popular and that's typically used awesome thank you you want to could you go back to the

633
01:18:25,439 --> 01:18:32,319
first failure case that we talked about with two phase committee where um it fails e-fails after

634
01:18:32,319 --> 01:18:40,639
responding prepared okay yeah I think this is the this one uh yeah I guess I think that's wise

635
01:18:40,800 --> 01:18:49,200
about this case but yeah yeah I guess uh I was wondering why be these to persist or like why

636
01:18:49,200 --> 01:18:57,440
needs to remember that it received prepare um I guess my thinking was when it comes back up

637
01:18:58,079 --> 01:19:04,480
if it receives a commit message from the coordinator couldn't it just assume that it was prepared

638
01:19:04,480 --> 01:19:10,240
I guess where does it use that information well yeah well we could have aborted right before the

639
01:19:10,239 --> 01:19:17,840
crash I mean you need to remember what it did okay so there's another slight variation of this

640
01:19:17,840 --> 01:19:23,920
protocol where where you assume that you always commit a commit so a presumed commit one of the

641
01:19:23,920 --> 01:19:28,000
messages is slightly different uh and you know there's an optimization that you could consider

642
01:19:28,639 --> 01:19:34,960
um and it makes sense in some settings uh I didn't really talk about that particular protocol

643
01:19:34,960 --> 01:19:38,559
but it's a slight different you know sort of variation there's quite a number of variations for two

644
01:19:38,560 --> 01:19:55,039
phase commit uh the change in the minor ways uh that's it's that it for today

645
01:19:57,520 --> 01:20:04,560
sorry you said that it can it could have aborted the transaction but if it did that it will never

646
01:20:04,560 --> 01:20:11,760
receive the commit are you mean uh in response in the last question yeah yeah yeah uh you know

647
01:20:11,760 --> 01:20:16,640
the the question was like why does he have to record on stable storage what it decided to do

648
01:20:17,600 --> 01:20:23,120
and uh the injury is that uh when B comes up it knows it needs to know whether it actually

649
01:20:23,120 --> 01:20:29,039
commits agreed to commit or we're going to agree to abort um and if it doesn't write anything it doesn't

650
01:20:29,199 --> 01:20:38,239
know to what it agreed because it could have aborted after yep yeah

651
01:20:40,560 --> 01:20:44,000
okay is anything to know that to know what to do in the recovery state?

652
01:20:44,000 --> 01:20:45,279
yes exactly

653
01:20:52,239 --> 01:20:58,159
it also needs to record what it does because if it like aborts but the message number gets to

654
01:20:58,159 --> 01:21:04,559
the coordinator needs to um we send the same message right yeah uh it needs to record that it

655
01:21:04,559 --> 01:21:09,199
actually aborted that transaction idea so when the comment coordinator asks you know what do you do

656
01:21:09,199 --> 01:21:12,720
that the actual response we've been known? Todd it thank you

657
01:21:17,519 --> 01:21:21,359
thank you welcome thank you

658
01:21:21,359 --> 01:21:25,359
okay see you all next week

