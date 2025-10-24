---
title: CMU15445 P18F202317 TimestampOrderingConcurrencyControl
---

1
00:00:00,000 --> 00:00:28,440
Alright, that was awesome.

2
00:00:28,440 --> 00:00:29,440
That's great.

3
00:00:29,440 --> 00:00:33,760
So I know you have a whole bunch of gigs still left before coming up this week.

4
00:00:33,760 --> 00:00:37,200
If the Cigetin C-MU does Diwali party down there, Diwali party.

5
00:00:37,200 --> 00:00:39,000
Okay, that sounds great.

6
00:00:39,000 --> 00:00:45,600
And hopefully it's helping you put a little bit of a dent in the C-Mutuition rate or insignificant.

7
00:00:45,600 --> 00:00:46,799
I don't think you've seen this.

8
00:00:46,799 --> 00:00:47,799
Okay, okay.

9
00:00:47,799 --> 00:00:49,799
Alright, alright.

10
00:00:49,799 --> 00:00:51,799
But you're getting a great education in return, right?

11
00:00:51,799 --> 00:00:53,040
So it's all going to be worth it.

12
00:00:53,040 --> 00:00:54,040
Do you think you get any change?

13
00:00:54,040 --> 00:00:55,040
I love it.

14
00:00:55,040 --> 00:00:56,040
That's awesome.

15
00:00:56,040 --> 00:00:57,040
Great.

16
00:00:57,039 --> 00:01:04,079
Indeed, if one of you less than coming, it's still valid till 2024.

17
00:01:04,079 --> 00:01:06,039
So you have a year to go.

18
00:01:06,039 --> 00:01:07,039
Alright.

19
00:01:07,039 --> 00:01:08,680
Okay, so let's get started.

20
00:01:08,680 --> 00:01:11,480
We have a ton of material to cover today.

21
00:01:11,480 --> 00:01:15,120
We are going to pick up where we left off in the last class.

22
00:01:15,120 --> 00:01:18,960
And if you remember, we had talked about two-phase locking and then we had started to talk

23
00:01:18,960 --> 00:01:24,920
about hierarchical two-phase locking, which was a way to balance the number of locks you

24
00:01:24,920 --> 00:01:26,840
have to acquire.

25
00:01:26,840 --> 00:01:30,600
This is allowing powerism in the system.

26
00:01:30,600 --> 00:01:35,400
And the types of things that we would do with that, if you remember, there was this compactible

27
00:01:35,400 --> 00:01:36,400
table.

28
00:01:36,400 --> 00:01:40,120
So life is no longer just a shared lock and an exclusive lock.

29
00:01:40,120 --> 00:01:44,560
But now we also have these other different lock modes, including these weird things called

30
00:01:44,560 --> 00:01:50,920
IS and IX, which are intention to do something as you traverse down the hierarchy.

31
00:01:50,920 --> 00:01:55,159
And there's a very interesting lock mode called six lock, which is I have a shared lock

32
00:01:55,159 --> 00:01:57,280
on everything else below.

33
00:01:57,280 --> 00:02:02,239
But if I need to grab something in an exclusive lock mode, I will grab an X-lock explicitly.

34
00:02:02,239 --> 00:02:06,640
But S-locks the entire hierarchy at which that six lock is sent.

35
00:02:06,640 --> 00:02:08,519
So how do we use these?

36
00:02:08,519 --> 00:02:11,359
Let's go look at a couple examples.

37
00:02:11,359 --> 00:02:17,919
Imagine we have a very simple database, one table and a bunch of tuples below it.

38
00:02:17,919 --> 00:02:20,599
So we have a bunch of transactions.

39
00:02:20,599 --> 00:02:24,759
And remember the thing that we're trying to do is to get as much parallelism in the system

40
00:02:24,759 --> 00:02:30,159
as possible without having to acquire a lot of locks because acquiring locks has overhead.

41
00:02:30,159 --> 00:02:33,459
So you have to put stuff in the lock table and you have to do deadlock management and all

42
00:02:33,459 --> 00:02:35,120
kinds of other stuff.

43
00:02:35,120 --> 00:02:41,079
So we were working with Andy and his bookies example where you want to read Andy's record

44
00:02:41,079 --> 00:02:42,079
from this table.

45
00:02:42,079 --> 00:02:43,840
So that's transaction T1.

46
00:02:43,840 --> 00:02:47,479
And so we'll start by accessing the record.

47
00:02:47,479 --> 00:02:49,840
You'll always access the record through the hierarchy.

48
00:02:49,840 --> 00:02:52,079
The hierarchy mirrors the storage hierarchy.

49
00:02:52,080 --> 00:02:55,480
So you'll open up the file and start a scan on that.

50
00:02:55,480 --> 00:02:59,320
And you start to read these records as you go through it.

51
00:02:59,320 --> 00:03:04,880
And the way you would go about doing this is you will set an intention to share lock in

52
00:03:04,880 --> 00:03:05,880
the table.

53
00:03:05,880 --> 00:03:06,880
Right?

54
00:03:06,880 --> 00:03:10,600
You're not grabbing a S-lock on the table because you don't want to block everyone.

55
00:03:10,600 --> 00:03:13,080
You just grab an IS lock in that table.

56
00:03:13,080 --> 00:03:20,880
So if you go back again to this lock hierarchy, as you can see in the lock hierarchy, the lock

57
00:03:20,879 --> 00:03:23,359
modes that are really restrictive is like X.

58
00:03:23,359 --> 00:03:24,359
Right?

59
00:03:24,359 --> 00:03:25,680
Nothing is compatible with it.

60
00:03:25,680 --> 00:03:29,199
You want lock modes with lock mode green in the rows corresponding to that.

61
00:03:29,199 --> 00:03:30,199
Right?

62
00:03:30,199 --> 00:03:33,359
So you can see how IS lock has a lock mode greens with that.

63
00:03:33,359 --> 00:03:35,000
Lock mode things are compatible with it.

64
00:03:35,000 --> 00:03:37,680
But it's not an explicit shared lock mode.

65
00:03:37,680 --> 00:03:41,639
You have to grab that explicit lock mode as you go further down.

66
00:03:41,639 --> 00:03:48,120
So coming back over here, to our example, to read a record, you'll grab an IS lock on

67
00:03:48,120 --> 00:03:49,599
the table.

68
00:03:49,599 --> 00:03:51,360
The other lock modes are still permissible.

69
00:03:51,360 --> 00:03:54,920
So other transactions who need those compatible lock modes can still proceed.

70
00:03:54,920 --> 00:04:00,319
And then you start to go and grab the S-lock on the record that you go need to read.

71
00:04:00,319 --> 00:04:01,319
Okay?

72
00:04:01,319 --> 00:04:02,319
For now, assume indices are not present.

73
00:04:02,319 --> 00:04:06,439
We'll talk about that briefly today if not in the next lecture.

74
00:04:06,439 --> 00:04:11,920
But transaction T1 grab only two locks and IS lock and an S-lock.

75
00:04:11,920 --> 00:04:17,680
So far, that seems like if I only had S and X-lock and I'm only reading one record, I

76
00:04:17,680 --> 00:04:18,680
grabbed one extra lock.

77
00:04:18,680 --> 00:04:19,680
Right?

78
00:04:19,680 --> 00:04:21,240
I grabbed an IS lock plus an S-lock.

79
00:04:21,240 --> 00:04:23,360
So did I do worse here?

80
00:04:23,360 --> 00:04:24,360
Maybe.

81
00:04:24,360 --> 00:04:25,680
But why do we have these lock modes?

82
00:04:25,680 --> 00:04:31,560
Let's go and imagine what happens in this case if you didn't know where Andy's record

83
00:04:31,560 --> 00:04:32,560
is.

84
00:04:32,560 --> 00:04:36,720
And so you might actually be going through and grabbing a whole bunch of locks on these

85
00:04:36,720 --> 00:04:37,960
tables.

86
00:04:37,960 --> 00:04:42,000
So now let's go take a look at another board.

87
00:04:42,000 --> 00:04:44,519
So let me just back up from there.

88
00:04:44,519 --> 00:04:47,280
We're assuming no indices.

89
00:04:47,279 --> 00:04:51,119
So if you know exactly whether in this case, we still assume that we know kind of where

90
00:04:51,119 --> 00:04:52,839
Andy's record is, tuple one.

91
00:04:52,839 --> 00:04:54,239
So we just have these two lock modes.

92
00:04:54,239 --> 00:04:55,239
Right?

93
00:04:55,239 --> 00:04:58,559
If you didn't know, you would go and grab S-locks as you go further down.

94
00:04:58,559 --> 00:05:03,839
If you knew that you needed to grab all the read locks on the records below, what you

95
00:05:03,839 --> 00:05:08,719
would have done is on the table, you would have grabbed a S-lock or a S-I-X-lock.

96
00:05:08,719 --> 00:05:12,000
And more likely, just in this case, you would have just grabbed an S-lock.

97
00:05:12,000 --> 00:05:13,319
So that is permitted.

98
00:05:13,319 --> 00:05:18,159
If you knew that you're going to touch every record, there's nothing that stops you from

99
00:05:18,159 --> 00:05:20,240
grabbing an S-lock on the table itself.

100
00:05:20,240 --> 00:05:21,560
So that's still permitted.

101
00:05:21,560 --> 00:05:25,719
But when you think you don't need that lock at a higher level and you can do with the

102
00:05:25,719 --> 00:05:30,639
weaker lock because you kind of know what your access path is going to be below, you can

103
00:05:30,639 --> 00:05:33,000
grab a weaker lock mode up above.

104
00:05:33,000 --> 00:05:36,639
So let's go into this with a little bit better example.

105
00:05:36,639 --> 00:05:37,639
Yep.

106
00:05:37,639 --> 00:05:41,360
So what really is like the perfect, you guys have it with my S-lock?

107
00:05:41,360 --> 00:05:42,360
Yeah.

108
00:05:42,360 --> 00:05:44,480
So the question is, what's the purpose of an I-X-lock?

109
00:05:44,480 --> 00:05:46,680
It's exactly what we are going to do right now.

110
00:05:46,680 --> 00:05:51,920
Imagine I had grabbed an S-lock on the table and that's all I had done before.

111
00:05:51,920 --> 00:05:53,920
I didn't have these different lock modes.

112
00:05:53,920 --> 00:05:58,840
A concurrent transaction that wanted to go and update the bookies record and Andy and

113
00:05:58,840 --> 00:06:02,360
the bookies records are obviously different records.

114
00:06:02,360 --> 00:06:07,759
So what is permissible now because you have different lock modes is that second transaction

115
00:06:07,759 --> 00:06:12,360
can say, I'm going to access the table and some record below it.

116
00:06:12,360 --> 00:06:14,959
But the table I'm only going to lock in an I-X mode.

117
00:06:14,959 --> 00:06:18,599
I intend to lock a record down below.

118
00:06:18,599 --> 00:06:23,439
And then on the record, it wants to write which is the bookies record, which is this last

119
00:06:23,439 --> 00:06:26,000
record in that case, it'll grab a right lock.

120
00:06:26,000 --> 00:06:32,800
So now we allow a read to some portion of this table to happen while a write was happening

121
00:06:32,800 --> 00:06:36,159
to some other portion of the table.

122
00:06:36,160 --> 00:06:38,280
And we had these two different lock modes.

123
00:06:38,280 --> 00:06:41,520
So we are allowing more of these things to happen.

124
00:06:41,520 --> 00:06:46,880
And these different lock modes also allow us to go, nothing stops us from grabbing an S-lock

125
00:06:46,880 --> 00:06:49,480
on the table and switching over to a protocol like that.

126
00:06:49,480 --> 00:06:52,760
We just have more toys to play with now.

127
00:06:52,760 --> 00:06:53,760
Question?

128
00:06:53,760 --> 00:06:54,760
Yeah.

129
00:06:54,760 --> 00:06:58,400
This case on the graph and I-X-lock, what if we do the sequential task?

130
00:06:58,400 --> 00:06:59,400
Yeah.

131
00:06:59,400 --> 00:07:00,600
Please stop it and then.

132
00:07:00,600 --> 00:07:01,600
Yes.

133
00:07:01,600 --> 00:07:02,600
Yeah.

134
00:07:02,600 --> 00:07:03,600
Yeah.

135
00:07:03,600 --> 00:07:04,600
So maybe I confused the situation a little bit.

136
00:07:04,600 --> 00:07:10,240
I said ignore the indices, but then in Andy's case, I basically just still only set one lock.

137
00:07:10,240 --> 00:07:14,040
So the national question is, oh, how did you know that tuple one was Andy's lock?

138
00:07:14,040 --> 00:07:15,800
So I'm assuming I know that.

139
00:07:15,800 --> 00:07:20,800
If I didn't know that, if I didn't know that, and if I had to grab an S-lock on everything,

140
00:07:20,800 --> 00:07:25,360
then if I did an IS-lock on the table for the first transaction, then as I go further down,

141
00:07:25,360 --> 00:07:27,360
I would have to grab S-locks on everything.

142
00:07:27,360 --> 00:07:31,760
At that point, I could decide whether the S-locks is on the page or the tuple, but I'm still

143
00:07:31,760 --> 00:07:33,040
grabbing way more locks.

144
00:07:33,040 --> 00:07:38,240
But as I said, if I knew I'm a read-only transaction, I will not do the IS-lock on the table.

145
00:07:38,240 --> 00:07:40,160
I will just grab an S-lock on the table.

146
00:07:40,160 --> 00:07:43,040
I'm still allowed to play all the games I was playing before.

147
00:07:43,040 --> 00:07:46,080
I just have more room now to play around with things.

148
00:07:46,080 --> 00:07:50,280
Now, if I knew there was an index and a new record one is where it was, that's where this

149
00:07:50,280 --> 00:07:51,280
really shines.

150
00:07:51,280 --> 00:07:55,200
So I'm not showing an index as a separate access path, but the general theory works out

151
00:07:55,200 --> 00:07:59,840
where this resource hierarchy of where the data is organized is not necessarily a tree,

152
00:07:59,839 --> 00:08:03,239
like a database to tables to records, but a DAG.

153
00:08:03,239 --> 00:08:07,639
So it could be a database to table to indices to records, and you could have index and records

154
00:08:07,639 --> 00:08:10,439
go through that, and this whole theory still works.

155
00:08:10,439 --> 00:08:13,359
So I, and again, plug for the advanced database class.

156
00:08:13,359 --> 00:08:17,519
We'll talk about DAG structures and stuff like that, but that's what was happening over here.

157
00:08:17,519 --> 00:08:20,719
Kind of new tuple one is where it was, but I didn't show you the index, which seemed

158
00:08:20,719 --> 00:08:22,039
a little confusing.

159
00:08:22,039 --> 00:08:25,919
But the main point is, I can still, if I wanted to grab an S-lock, I could still do everything

160
00:08:25,919 --> 00:08:29,399
I could do with just two lock modes I can do a lot more down.

161
00:08:29,399 --> 00:08:43,759
So, yeah, so the question is like, can I grab an S-lock and release it, and then go and

162
00:08:43,759 --> 00:08:48,439
grab the next lock, like the latch coupling we were doing in the B-3 to keep it, the answer

163
00:08:48,439 --> 00:08:51,039
is, what will we violate?

164
00:08:51,039 --> 00:08:56,079
2PL, you will violate 2PL, that means I no longer have a serializable schedule.

165
00:08:56,079 --> 00:08:58,960
So we shall not do that if we want 2PL semantics.

166
00:08:58,960 --> 00:09:04,280
Furthermore, to do a strong straight 2PL, we keep those locks till the very end.

167
00:09:04,280 --> 00:09:07,720
But that's, you know, as we'll start to play around with the advanced concurrency control

168
00:09:07,720 --> 00:09:10,960
protocols that we are going to start on today, you'll see we'll start to do that.

169
00:09:10,960 --> 00:09:15,639
We'll try to let go of stuff, or we'll do things with timestamps to try and guess what

170
00:09:15,639 --> 00:09:20,560
would happen the best way to do it, and give us a little bit more room to rearrange stuff.

171
00:09:20,560 --> 00:09:26,960
This is locks are a pessimistic form of transaction of concurrency control, and they are basically

172
00:09:26,960 --> 00:09:30,480
doing it in the order in which things are happening.

173
00:09:30,480 --> 00:09:34,560
As we do timestamps and stuff, you'll see we can start to play around with other games.

174
00:09:34,560 --> 00:09:40,600
So I guess, chicken from the practical difference between having an Ix on the table and not having

175
00:09:40,600 --> 00:09:41,600
life on the table.

176
00:09:41,600 --> 00:09:45,920
Like, if we just had an X and an S down and go, the practical difference is that if we wanted

177
00:09:45,920 --> 00:09:48,519
to do an X lock on the table, then we have a concur.

178
00:09:48,519 --> 00:09:50,519
Yeah, the Ix swap would not have been allowed.

179
00:09:50,519 --> 00:09:51,560
T2 would not have it.

180
00:09:51,560 --> 00:09:52,920
So the exactly, that's right.

181
00:09:52,919 --> 00:09:57,120
So the question was, what's the role of the Ix in this situation?

182
00:09:57,120 --> 00:09:59,159
Imagine, I do and needed to read all the records.

183
00:09:59,159 --> 00:10:02,639
I would grab an S lock on the table, and that would block everything.

184
00:10:02,639 --> 00:10:06,679
But imagine, I also had this index, and I said, you know, I really don't think I'm reading

185
00:10:06,679 --> 00:10:07,679
the whole table.

186
00:10:07,679 --> 00:10:09,159
I'm just reading a few records.

187
00:10:09,159 --> 00:10:12,559
I'll determine that by going to the index, which is not shown here, since you're trying

188
00:10:12,559 --> 00:10:14,919
to keep the material simple.

189
00:10:14,919 --> 00:10:17,839
But that index is going to tell me, go to tuple one.

190
00:10:17,839 --> 00:10:19,599
And on that, I will grab an S lock.

191
00:10:19,600 --> 00:10:24,759
And index is also telling, go to tuple n for the bookies record, and that grab an S lock

192
00:10:24,759 --> 00:10:26,759
and so I can go make all of this happen.

193
00:10:26,759 --> 00:10:31,200
As he said, you can still do the S and X lock stuff at any level as before.

194
00:10:31,200 --> 00:10:33,519
You just have more playroom now.

195
00:10:33,519 --> 00:10:34,519
Okay?

196
00:10:34,519 --> 00:10:35,519
Yep.

197
00:10:35,519 --> 00:10:36,519
Yeah.

198
00:10:36,519 --> 00:10:37,519
Yeah.

199
00:10:37,519 --> 00:10:48,040
So the question is, how does this all relate to the S lock?

200
00:10:48,039 --> 00:10:51,599
So the question is, how does this all relate to the lock coupling stuff that we did in the

201
00:10:51,599 --> 00:10:52,599
Beatry?

202
00:10:52,599 --> 00:10:55,360
I would say, those are separate things.

203
00:10:55,360 --> 00:10:59,439
The intentional lock is to work with any arbitrary storage hierarchy in which you have this

204
00:10:59,439 --> 00:11:04,480
containment like semantics that I've got some organizational structure like a table below

205
00:11:04,480 --> 00:11:09,279
that is another structure pages, and then records, I didn't show pages over here.

206
00:11:09,279 --> 00:11:13,639
The lock coupling stuff that you used in the Beatry stuff was very specifically in the

207
00:11:13,639 --> 00:11:14,639
Beatry.

208
00:11:14,639 --> 00:11:19,319
So you were letting go off these latches that you were creating and then going forward.

209
00:11:19,319 --> 00:11:22,360
There's semantically what we are trying to do is that I'm going to treat the Beatry as

210
00:11:22,360 --> 00:11:27,319
a logical structure, and I'm going to allow maximum parallelism in that.

211
00:11:27,319 --> 00:11:32,519
All I need of the Beatry is to retain its semantical structure so that I go looking for keys.

212
00:11:32,519 --> 00:11:35,199
I will find it if I have it and if I don't have it, I don't.

213
00:11:35,199 --> 00:11:38,600
So we are playing around with tricks over there by releasing stuff.

214
00:11:38,600 --> 00:11:43,399
You'll start to violate strict 2PL stuff, but the tree as a whole will look like it is

215
00:11:43,399 --> 00:11:46,639
still behaving in the broader scheme as a semantical structure.

216
00:11:46,639 --> 00:11:51,840
So it's kind of like the nuance over here needs a full lecture, but think about it this

217
00:11:51,840 --> 00:11:52,840
way.

218
00:11:52,840 --> 00:11:57,439
When we talked about conflict serializable and view serializable, remember we said view

219
00:11:57,439 --> 00:12:03,559
serializable, if I know the application semantics, then I can play games that seem wrong, but

220
00:12:03,559 --> 00:12:08,480
the application semantics is all I care about and I could get more admissible schedules.

221
00:12:08,480 --> 00:12:11,399
Kind of what we are doing inside the Beatry is keeping its structure intact.

222
00:12:11,399 --> 00:12:14,159
We are playing all these games because we know what a Beatry semantics is.

223
00:12:14,159 --> 00:12:17,600
We are playing with the semantics to get more parallelism in there.

224
00:12:17,600 --> 00:12:23,199
This is a completely general scheme that works without, I don't know, if I have a page

225
00:12:23,199 --> 00:12:25,959
and a record, all I'm saying is the page is a collection of records.

226
00:12:25,959 --> 00:12:29,240
It's a slotted page, whatever, doesn't matter.

227
00:12:29,240 --> 00:12:32,600
If it's, you could apply this to LSMs, this will still work.

228
00:12:32,600 --> 00:12:36,399
Any hierarchical structure to this will work.

229
00:12:36,399 --> 00:12:39,600
And again, this is a plug for the advanced database class where we spend a whole semester

230
00:12:39,600 --> 00:12:47,440
or half a semester talking about these types of things.

231
00:12:47,440 --> 00:12:51,040
This illustrator, so the question is does this illustrate the difference between latches

232
00:12:51,040 --> 00:12:52,040
and locks?

233
00:12:52,040 --> 00:12:53,320
Yes, definitely.

234
00:12:53,320 --> 00:12:57,360
What we were doing in the Beatry was latches, but remembered latches and locks are trying

235
00:12:57,360 --> 00:13:01,399
at some level to say I want to make some form of parallelism safe.

236
00:13:01,399 --> 00:13:05,680
So that's kind of the interesting thing is like there are ideas that can be crossed over

237
00:13:05,679 --> 00:13:07,559
from here to the other side.

238
00:13:07,559 --> 00:13:11,239
Should there be hierarchical latches?

239
00:13:11,239 --> 00:13:14,199
Nothing in the theory here says you can't play around with games like that.

240
00:13:14,199 --> 00:13:17,799
Now would that be an overkill for the types of things you need to do?

241
00:13:17,799 --> 00:13:19,879
Maybe, maybe not, but these are open questions.

242
00:13:19,879 --> 00:13:22,000
They're trying to go after the same types of questions.

243
00:13:22,000 --> 00:13:27,279
They've come from different places, but the concepts, the concepts you're talking about

244
00:13:27,279 --> 00:13:33,279
over here where two faced locking and intentional locks are very general.

245
00:13:33,279 --> 00:13:35,360
There are more than two types of latches now, right?

246
00:13:35,360 --> 00:13:38,879
In many advanced programming languages, there are more latch modes and they'll start to

247
00:13:38,879 --> 00:13:41,559
play games that look like that.

248
00:13:41,559 --> 00:13:43,319
Great question.

249
00:13:43,319 --> 00:13:48,079
Both of them are trying to make parallel higher parallelism while making some notion of safety

250
00:13:48,079 --> 00:13:49,559
hold in the application.

251
00:13:49,559 --> 00:13:50,559
Right?

252
00:13:50,559 --> 00:13:52,319
They stare that same philosophy.

253
00:13:52,319 --> 00:13:56,559
And then, if you're taking an operating systems class, you think you're always encouraged

254
00:13:56,559 --> 00:13:59,399
to think about mechanisms, right?

255
00:13:59,399 --> 00:14:00,399
Mechanisms are general.

256
00:14:00,399 --> 00:14:02,519
They're tool sets that you can use for doing things.

257
00:14:02,519 --> 00:14:09,360
This is a general mechanism that works with any hierarchical structure to make it safe.

258
00:14:09,360 --> 00:14:13,159
You might apply this in all kinds of places, even outside databases, once you understand

259
00:14:13,159 --> 00:14:14,159
the concept.

260
00:14:14,159 --> 00:14:15,159
Okay.

261
00:14:15,159 --> 00:14:16,159
Great questions.

262
00:14:16,159 --> 00:14:17,159
All right.

263
00:14:17,159 --> 00:14:21,559
So, now you can see what we are doing over here with these intentional locks.

264
00:14:21,559 --> 00:14:27,879
Let's keep going and take a look at how we might play around with three transactions.

265
00:14:27,879 --> 00:14:32,279
So here's a transaction that's going to scan all the records.

266
00:14:32,279 --> 00:14:34,919
It needs to scan all the records in this transaction.

267
00:14:34,919 --> 00:14:42,039
And what it can do is can grab a SIX lock, a six-swock, six-swock says, I have a shared lock

268
00:14:42,039 --> 00:14:45,799
on this and by that, it means everything below.

269
00:14:45,799 --> 00:14:50,279
Notice in all the hierarchical structure, we require that all access to records at the

270
00:14:50,279 --> 00:14:53,360
bottom of the tree in this case records have to go from top to bottom.

271
00:14:53,360 --> 00:14:55,639
So you have to follow that protocol, top down.

272
00:14:55,639 --> 00:14:59,000
If you read, again, in the advanced database class, it talks about it more formally.

273
00:14:59,000 --> 00:15:01,759
You always have to go top down and release top bottom up.

274
00:15:01,759 --> 00:15:04,519
You know all of that if you don't because it will be like an hour conversation.

275
00:15:04,519 --> 00:15:06,879
But there's a protocol you have to follow to do this.

276
00:15:06,879 --> 00:15:08,279
Just top down is what we need for now.

277
00:15:08,279 --> 00:15:10,200
So you'll follow top down.

278
00:15:10,200 --> 00:15:14,559
This means no one can go grab a S-swock on a record because they have to come through

279
00:15:14,559 --> 00:15:15,559
me.

280
00:15:15,559 --> 00:15:16,840
They have to come through the hierarchy.

281
00:15:16,840 --> 00:15:20,759
So I'm putting a lock there saying I have a shared lock plus something else.

282
00:15:20,759 --> 00:15:24,720
I may grow actually get an X-swock on some records below.

283
00:15:24,720 --> 00:15:28,919
So this is a transaction that may want to read all the bank accounts, for example, and give

284
00:15:28,919 --> 00:15:31,240
$50 more to the highest bank account.

285
00:15:31,240 --> 00:15:35,799
First it needs to determine which the highest bank account is or accounts are if they are

286
00:15:35,799 --> 00:15:39,000
the same value and then do some updates to that.

287
00:15:39,000 --> 00:15:42,680
Read everything and update a few things.

288
00:15:42,680 --> 00:15:47,279
So we'll start and it is allowed with the protocol and the hierarchy.

289
00:15:47,279 --> 00:15:48,399
I'll let you work that out.

290
00:15:48,399 --> 00:15:55,039
But after a six-swock, I can allow it to take an X-swock on the record below in the same

291
00:15:55,039 --> 00:15:56,039
transaction.

292
00:15:56,039 --> 00:15:58,720
That is allowed by the protocol.

293
00:15:58,720 --> 00:16:02,320
That's what the six-swock allowed us to do as we were further going down.

294
00:16:02,320 --> 00:16:07,920
Now, a second transaction that just wants to read a single record comes in.

295
00:16:07,920 --> 00:16:09,399
That's the only record it wants to read.

296
00:16:09,399 --> 00:16:14,759
As you can see, there's no conflict between these two transactions because they are doing

297
00:16:14,759 --> 00:16:15,759
different things.

298
00:16:15,759 --> 00:16:17,320
They're not conflicting on that record.

299
00:16:17,320 --> 00:16:22,040
But if I didn't have a six-swock, I would have to grab an X-swock on the table.

300
00:16:22,040 --> 00:16:24,160
If that's the only level of hierarchy I had.

301
00:16:24,160 --> 00:16:27,960
If I only allowed table level locks, then that's what I would do and I wouldn't get

302
00:16:27,960 --> 00:16:28,960
an X-swock in general.

303
00:16:28,960 --> 00:16:33,400
Remember, we talked about how MongoDB had a global database lock, right, so of course,

304
00:16:33,400 --> 00:16:35,040
they don't do that now.

305
00:16:35,040 --> 00:16:41,720
But in this case, what I can do is I can go and grab an IS lock intention to share which

306
00:16:41,720 --> 00:16:46,259
is compatible with the six lock in the matrix and I'm allowed to proceed.

307
00:16:46,259 --> 00:16:51,860
Now, notice what happened, transaction T1 only grabbed 2 locks.

308
00:16:51,860 --> 00:16:58,539
So it's efficient, two locks, and only lock exactly what it needed to do.

309
00:16:58,539 --> 00:17:03,460
And transaction T1 grabbed two locks, and you know, yeah, you might say it grabbed the

310
00:17:03,460 --> 00:17:08,620
IS lock, but it wouldn't have if it was operating under a simpler scheme, but that's going to

311
00:17:08,620 --> 00:17:09,660
be a little bit of tradeoff.

312
00:17:09,660 --> 00:17:13,339
Some transactions are going to have to take a little bit more locks, but the bigger ones

313
00:17:13,339 --> 00:17:16,220
are going to get a lot less locking locks that they have to do.

314
00:17:16,220 --> 00:17:17,220
It's a trade-off, right?

315
00:17:17,220 --> 00:17:20,420
And again, as I said, nothing tells you you have to use all the locks.

316
00:17:20,420 --> 00:17:24,860
It's just saying if you want to play these games, you now have the way to do it.

317
00:17:24,860 --> 00:17:31,740
This other transaction that wants to read all the records, it can go in, but obviously it

318
00:17:31,740 --> 00:17:38,900
has, it can try to grab an IS lock, for example, on the table, and that won't be compatible

319
00:17:38,900 --> 00:17:40,539
with these locks, so it's going to have to wait, right?

320
00:17:40,539 --> 00:17:44,140
And the compatibility matrix, that's not allowed.

321
00:17:44,140 --> 00:17:47,060
So doesn't mean transactions never have to wait.

322
00:17:47,060 --> 00:17:49,740
Some of them will have to wait, but you're going to get more parallelism and you're trying

323
00:17:49,740 --> 00:17:53,620
to do this balance between how many locks do transactions have to acquire and how much

324
00:17:53,620 --> 00:17:56,620
parallelism you go allow in the system.

325
00:17:56,620 --> 00:17:59,220
Okay, questions?

326
00:17:59,220 --> 00:18:00,220
Yep.

327
00:18:00,220 --> 00:18:04,539
Is there a way to upgrade locks?

328
00:18:04,539 --> 00:18:08,779
Yes, and we will defer that to the advanced database class because it could be that you

329
00:18:08,779 --> 00:18:09,779
might say, you know what?

330
00:18:09,779 --> 00:18:12,940
I'm doing a lot of X locks on the Tuple Transaction T1.

331
00:18:12,940 --> 00:18:15,700
Can I go and update my six lock on the table to an X lock?

332
00:18:15,700 --> 00:18:16,700
That's allowed.

333
00:18:16,700 --> 00:18:21,580
You go through an upgrade protocol, the lock table which I told you has a hash table,

334
00:18:21,580 --> 00:18:26,500
has things that are waiting for it, and there are upgrade requests too, and upgrade requests

335
00:18:26,500 --> 00:18:31,940
are treated differently than people just waiting for it because you might want to give them

336
00:18:31,940 --> 00:18:36,539
higher priority to get ahead of the queue and get the work done if it doesn't conflict.

337
00:18:36,539 --> 00:18:38,539
Okay, other questions?

338
00:18:38,539 --> 00:18:50,940
Yes, so an SIX lock versus Slock, so let's just go back here.

339
00:18:50,940 --> 00:18:58,259
Yeah, so you would do a shared lock and again it will depend upon how you're implementing

340
00:18:58,259 --> 00:18:59,259
it.

341
00:18:59,259 --> 00:19:02,379
So if you say, I know in this transaction that I'm going to read everything, then I will

342
00:19:02,379 --> 00:19:06,940
grab an S lock on the table, I'm going to read every record, but the other transaction

343
00:19:06,940 --> 00:19:11,340
took a six lock because it said, I want to also update some, so it will depend upon the

344
00:19:11,340 --> 00:19:14,700
operation that the transaction wants to do.

345
00:19:14,700 --> 00:19:17,779
And you'll try to grab the weakest lock mode at the highest level.

346
00:19:17,779 --> 00:19:24,779
What is one to do like a subset of the record?

347
00:19:24,779 --> 00:19:25,779
Yeah, yeah.

348
00:19:25,779 --> 00:19:34,180
So whether, so thank you for another connection, thank you.

349
00:19:34,180 --> 00:19:38,380
So yeah, the question is, what if I have to lock a subset of the object?

350
00:19:38,380 --> 00:19:42,740
So let's take the transaction T1 and after this, I'm going to stop because we are now like,

351
00:19:42,740 --> 00:19:46,100
we need three lectures and I love it, but I need to get through some of the material,

352
00:19:46,100 --> 00:19:47,180
but this, these are great questions.

353
00:19:47,180 --> 00:19:51,580
So you're asking a very interesting and important question.

354
00:19:51,580 --> 00:19:55,420
I am transaction T1, okay, so just let's focus on that.

355
00:19:55,420 --> 00:20:02,220
It, let's say when it started, it was a transaction that the code was written as begin transaction,

356
00:20:02,220 --> 00:20:06,140
ban all the records to find the interesting bank accounts and then for those interesting

357
00:20:06,140 --> 00:20:09,539
bank accounts, second SQL statement, go and update them and transaction.

358
00:20:09,539 --> 00:20:12,579
So transaction is going to two pieces of work.

359
00:20:12,579 --> 00:20:16,940
Does it know how many records are going to be updated in that second phase for which it

360
00:20:16,940 --> 00:20:17,940
needs an X lock?

361
00:20:17,940 --> 00:20:21,180
What if it is all the bank account numbers are exactly the same?

362
00:20:21,180 --> 00:20:23,980
They're all the highest and everyone needs to be given 50 bucks.

363
00:20:23,980 --> 00:20:27,420
Or what if the number of things that they need to update is more than, you know, more than

364
00:20:27,420 --> 00:20:28,420
one?

365
00:20:28,420 --> 00:20:30,299
Maybe it is all the half of the records.

366
00:20:30,299 --> 00:20:31,299
Should I have?

367
00:20:31,299 --> 00:20:36,059
Imagine I was reading everything and then when I start to update, I find I'm updating everything,

368
00:20:36,059 --> 00:20:40,099
wouldn't I have been better by just grabbing an X lock on the table up front?

369
00:20:40,099 --> 00:20:45,019
The answer is yes, but that could go through the lock upgrade request, for example.

370
00:20:45,019 --> 00:20:50,659
And so these protocols are then defined in more detail as to what you do, what's the way

371
00:20:50,659 --> 00:20:56,099
in which you follow the general rule is try to grab the slowest lock at each level of

372
00:20:56,099 --> 00:20:58,460
the hierarchy as you go down.

373
00:20:58,860 --> 00:21:01,940
That way you're allowing as many others to go through.

374
00:21:01,940 --> 00:21:04,700
And then if you start to find whoops, I'm grabbing a lot of X lock.

375
00:21:04,700 --> 00:21:06,860
I should upgrade my table level lock to an X lock.

376
00:21:06,860 --> 00:21:08,740
You'll go through an upgrade path.

377
00:21:08,740 --> 00:21:10,380
So don't make static decisions.

378
00:21:10,380 --> 00:21:14,140
You'll try to make more dynamic decisions because you don't know till you actually start

379
00:21:14,140 --> 00:21:16,900
to look at the values.

380
00:21:16,900 --> 00:21:22,100
So again, you know, this is a full lecture in the advanced database class.

381
00:21:22,100 --> 00:21:23,539
But you guys are thinking of the right things.

382
00:21:23,539 --> 00:21:25,660
It's like, what am I winning and how do I win?

383
00:21:25,660 --> 00:21:28,100
And it's a complicated answer.

384
00:21:28,099 --> 00:21:32,299
The only thing you need to know is now you have more points to play with.

385
00:21:32,299 --> 00:21:36,139
And you can follow the protocol and everything is safe.

386
00:21:36,139 --> 00:21:41,219
All of 2PL holes will grab these locks whether they're intentional or real locks.

387
00:21:41,219 --> 00:21:44,059
Hold them till the end of transaction and strong sick 2PL.

388
00:21:44,059 --> 00:21:49,539
You'll hold them till the very end won't go through that monotonically decreasing phase.

389
00:21:49,539 --> 00:21:50,539
Okay?

390
00:21:50,539 --> 00:21:54,459
So all the things we talked about 2PL work with hierarchical locks.

391
00:21:54,459 --> 00:21:55,500
And that's beautiful.

392
00:21:56,500 --> 00:21:57,500
Right?

393
00:21:57,500 --> 00:21:58,500
And you can prove that.

394
00:21:58,500 --> 00:22:02,740
And there's a paper that proves that formula and says, don't have to take my vote for it.

395
00:22:02,740 --> 00:22:05,019
But here's the proof.

396
00:22:05,019 --> 00:22:06,019
All right.

397
00:22:06,019 --> 00:22:07,019
Lock escalation.

398
00:22:07,019 --> 00:22:08,019
We just talked about that.

399
00:22:08,019 --> 00:22:11,779
If I have to switch over and upgrade a lock to something else, then you that's called

400
00:22:11,779 --> 00:22:13,380
lock escalation.

401
00:22:13,380 --> 00:22:16,819
And there are protocols that you go follow through that too.

402
00:22:16,819 --> 00:22:18,819
All right?

403
00:22:18,819 --> 00:22:23,220
Notice with all of these things, just reiterating from the last class, you're not acquiring these

404
00:22:23,220 --> 00:22:28,339
locks manually like you as a SQL application programmer is not acquiring the locks manually

405
00:22:28,339 --> 00:22:29,339
typically.

406
00:22:29,339 --> 00:22:34,299
Those SQL statements do have options to allow you to lock entire tables.

407
00:22:34,299 --> 00:22:35,299
Not recommended.

408
00:22:35,299 --> 00:22:40,019
You'd only do that if you're a power user that really knows what you're doing.

409
00:22:40,019 --> 00:22:43,180
But in general, these will get acquired at the right point in the system.

410
00:22:43,180 --> 00:22:47,259
You as a database system programmer, if you're the person developing the database system,

411
00:22:47,259 --> 00:22:49,740
you will have to worry about that and find the right abstraction.

412
00:22:49,740 --> 00:22:55,579
It's on the call to the buffer pool or the call to the open of the page, open of the file

413
00:22:55,579 --> 00:22:57,900
or open of the page or open of the index.

414
00:22:57,900 --> 00:23:01,180
You'll have to go start making these lock calls in there.

415
00:23:01,180 --> 00:23:04,500
But the application programmer generally doesn't.

416
00:23:04,500 --> 00:23:10,299
However, SQL has many database systems have options to allow.

417
00:23:10,299 --> 00:23:13,660
This explicit locking of tables.

418
00:23:13,660 --> 00:23:15,980
It's not part of standard SQL.

419
00:23:15,980 --> 00:23:22,259
For example, in Oracle Postgres and DB2, they have a similar syntax or the same syntax.

420
00:23:22,259 --> 00:23:26,980
You can say lock table, name of the table in and give an explicit mode.

421
00:23:26,980 --> 00:23:30,460
They'll only allow you to give you shared and exclusive locks as requests.

422
00:23:30,460 --> 00:23:33,740
You're saying, look, I know you're going to do all this hierarchical locking and stuff

423
00:23:33,740 --> 00:23:34,740
like that.

424
00:23:34,740 --> 00:23:35,819
But I know what I'm doing.

425
00:23:35,819 --> 00:23:37,140
I want a shared lock.

426
00:23:37,140 --> 00:23:39,059
Don't try to do this other stuff.

427
00:23:39,059 --> 00:23:40,660
They may not be doing hierarchical locking.

428
00:23:40,660 --> 00:23:44,500
They may be doing some of the locking protocol or timestamp based protocol.

429
00:23:44,500 --> 00:23:49,019
We'll see MVCC, which is what Postgres does.

430
00:23:49,019 --> 00:23:51,220
But this allows you to say, I know what I'm doing.

431
00:23:51,220 --> 00:23:52,220
Go ahead and grab that.

432
00:23:52,220 --> 00:23:56,740
But now, along with great power comes greater responsibility than the application code better

433
00:23:56,740 --> 00:23:58,220
know what they're doing.

434
00:23:58,220 --> 00:23:59,579
Generally, not recommended.

435
00:23:59,579 --> 00:24:02,539
You start splintering your SQL code with all of that stuff.

436
00:24:02,539 --> 00:24:07,660
We'll talk about isolation levels, which you can set at the database level to say, I want

437
00:24:07,660 --> 00:24:11,579
read committer or read uncommitted, but that's the lecture that we're going to start on

438
00:24:11,579 --> 00:24:12,579
next.

439
00:24:12,579 --> 00:24:13,579
Okay?

440
00:24:14,139 --> 00:24:23,659
So you can also, SQL also has modes for when you're doing a select query and then you want

441
00:24:23,659 --> 00:24:26,339
to set an exclusive lock on the matching records.

442
00:24:26,339 --> 00:24:28,980
You can do that kind of like the transactions that I was saying.

443
00:24:28,980 --> 00:24:31,339
I'm going to read all of this stuff and then some part of it.

444
00:24:31,339 --> 00:24:32,779
I'm going to do updates.

445
00:24:32,779 --> 00:24:37,220
So there are all kinds of ways in which you can start to give SQL hints in terms of what

446
00:24:37,220 --> 00:24:40,779
to do so that you get locks at the appropriate time.

447
00:24:40,779 --> 00:24:41,779
You don't have to.

448
00:24:41,779 --> 00:24:46,019
The system will do the right thing, but if you want to, it's kind of like query optimization.

449
00:24:46,019 --> 00:24:51,220
The system does things by itself, but every database system also has hints where you can

450
00:24:51,220 --> 00:24:56,180
say, oh, R is joined with S to join that first and then use a hash join for it.

451
00:24:56,180 --> 00:24:57,779
Don't try something else for it.

452
00:24:57,779 --> 00:25:00,660
So SQL also has optional hints.

453
00:25:00,660 --> 00:25:04,379
They again, those hints are not part of SQL, but you can give hints to tell.

454
00:25:04,379 --> 00:25:08,139
I'm going to tell the optimizer what to do or at least tell you where to look.

455
00:25:08,140 --> 00:25:12,140
Similarly, there are things where you can explicitly start taking over some of these transaction

456
00:25:12,140 --> 00:25:14,180
mechanisms.

457
00:25:14,180 --> 00:25:22,580
So wrapping up the 2PL part is this two phase locking is used in almost every database system

458
00:25:22,580 --> 00:25:28,300
because you this whole idea of how to get this concurrency control is super important

459
00:25:28,300 --> 00:25:32,460
in that theory is what all the products are built off.

460
00:25:32,460 --> 00:25:37,620
We talked about locks and the protocols to PL and strong sick to PL.

461
00:25:37,619 --> 00:25:41,179
When you do locking, that doesn't mean you are completely out of trouble.

462
00:25:41,179 --> 00:25:42,459
You can still get into deadlock.

463
00:25:42,459 --> 00:25:46,779
So you need deadlock prevention mechanisms and you can detect the deadlock and handle it

464
00:25:46,779 --> 00:25:48,259
or you can do deadlock prevention.

465
00:25:48,259 --> 00:25:52,379
And of course, we talked about hierarchical locking and all the other fun stuff that comes

466
00:25:52,379 --> 00:25:53,379
with it.

467
00:25:53,379 --> 00:25:54,379
All right.

468
00:25:54,379 --> 00:25:59,139
Let's wrap this part up and now go.

469
00:25:59,139 --> 00:26:04,219
We are running behind in the semester and as you're probably guessed.

470
00:26:04,220 --> 00:26:07,620
The good thing is if you keep asking questions and make us run behind, then there's less

471
00:26:07,620 --> 00:26:10,299
stuff we can ask you questions in the final exam.

472
00:26:10,299 --> 00:26:13,779
But that's also means the last chapters we hope to get through, we won't get through.

473
00:26:13,779 --> 00:26:15,100
So it's like a trade off.

474
00:26:15,100 --> 00:26:16,980
But keep asking questions.

475
00:26:16,980 --> 00:26:18,220
It's good.

476
00:26:18,220 --> 00:26:21,420
All right.

477
00:26:21,420 --> 00:26:27,019
So now we are going to talk about a different way to do concurrency control.

478
00:26:27,019 --> 00:26:31,059
We said locking and we looked at all the protocols.

479
00:26:31,059 --> 00:26:35,940
And effectively the main theory we got from everything we've discussed before is we want

480
00:26:35,940 --> 00:26:41,899
this notion of serializable schedules so that we can allow arbitrary interleaving of

481
00:26:41,899 --> 00:26:45,379
actions from concurrent transactions, maximize the parallelism.

482
00:26:45,379 --> 00:26:51,259
But at the end of the day, guarantee that the database is in some consistent state as

483
00:26:51,259 --> 00:26:54,099
set up by the theory of the serializable schedule.

484
00:26:54,099 --> 00:26:55,099
Okay.

485
00:26:55,099 --> 00:26:58,139
And we largely focused on this conflict serializable stuff and we said this is notion of

486
00:26:58,140 --> 00:27:01,740
view serializable that allows a little bit more and we'll touch a little bit on that

487
00:27:01,740 --> 00:27:06,940
view serialization today with a different protocol.

488
00:27:06,940 --> 00:27:08,940
So two-phase locking.

489
00:27:08,940 --> 00:27:09,940
What are we trying to achieve?

490
00:27:09,940 --> 00:27:14,940
We're trying to do this concurrency control, the isolation part of acid.

491
00:27:14,940 --> 00:27:16,700
It is the eye in the acid.

492
00:27:16,700 --> 00:27:19,259
We're still on that topic.

493
00:27:19,259 --> 00:27:24,860
And when we introduced that topic, we had noted that there are pessimistic protocols, locks

494
00:27:24,860 --> 00:27:26,820
are a pessimistic protocol.

495
00:27:26,819 --> 00:27:30,500
If you and I are going to have a read write conflict or a write write conflict or a write

496
00:27:30,500 --> 00:27:35,139
read conflict, the lock is basically a way of saying I'm noting that down and I will stop

497
00:27:35,139 --> 00:27:37,899
it at the first arc and I'm not going to let the arc close.

498
00:27:37,899 --> 00:27:41,939
I'm just going to, as soon as the arc forms, I'm going to suspend one of the transactions.

499
00:27:41,939 --> 00:27:44,899
So I'm not going to let the loop close.

500
00:27:44,899 --> 00:27:50,539
And hopefully you got that as we discussed this over the last two lectures.

501
00:27:50,539 --> 00:27:54,740
There's something that we're going to start talking about today called time stamp ordering

502
00:27:54,740 --> 00:27:56,379
that's not going to need locks.

503
00:27:56,380 --> 00:27:58,900
All this discussion we had today is like locks are expensive.

504
00:27:58,900 --> 00:27:59,980
You have to grab these many locks.

505
00:27:59,980 --> 00:28:02,380
You have to figure this out with hierarchical locking.

506
00:28:02,380 --> 00:28:04,540
Yes, we made life a lot better.

507
00:28:04,540 --> 00:28:05,860
But is there a different way?

508
00:28:05,860 --> 00:28:09,020
And that's what we are going to look at with these types of protocols at a time stamp based

509
00:28:09,020 --> 00:28:10,780
protocols.

510
00:28:10,780 --> 00:28:15,740
And we'll start with a very simple textbook example of time stamp protocol called time stamp

511
00:28:15,740 --> 00:28:16,740
ordering.

512
00:28:16,740 --> 00:28:20,020
That's the name of the protocol.

513
00:28:20,020 --> 00:28:22,100
And no one uses that.

514
00:28:22,099 --> 00:28:26,539
But it introduces the concepts on which we build the rest of it for the optimistic

515
00:28:26,539 --> 00:28:31,619
conferencing control and NBCC which a lot of systems use, which is the topic for the next

516
00:28:31,619 --> 00:28:32,619
lecture.

517
00:28:32,619 --> 00:28:35,299
So it's the foundation stuff we are going to talk about.

518
00:28:35,299 --> 00:28:39,859
Now as we start talking about these protocols, a quick note, they will have names like time stamp

519
00:28:39,859 --> 00:28:40,859
ordering.

520
00:28:40,859 --> 00:28:44,299
Those were the names that were given when those protocols were invented in the 70s and

521
00:28:44,299 --> 00:28:47,419
80s or optimistic conferencing control.

522
00:28:47,419 --> 00:28:51,859
But as you'll see, the terms that gets used over there will feel a little confusing.

523
00:28:51,859 --> 00:28:56,339
Everything that we talk about now, because the terms were just getting evolved at that

524
00:28:56,339 --> 00:28:57,339
time.

525
00:28:57,339 --> 00:28:58,339
So bear with us.

526
00:28:58,339 --> 00:29:00,659
We want to keep that historical name for what the protocol is.

527
00:29:00,659 --> 00:29:04,500
And I'll try to point out where the name presents mean what it seems like it means.

528
00:29:04,500 --> 00:29:07,099
But we'll still keep that name around.

529
00:29:07,099 --> 00:29:08,099
All right.

530
00:29:08,099 --> 00:29:13,139
So if we can, we're going to try and get through both the time stamp ordering and the

531
00:29:13,139 --> 00:29:15,740
optimistic conferencing control protocols today.

532
00:29:15,740 --> 00:29:17,299
I don't expect it will get through that.

533
00:29:17,299 --> 00:29:19,139
So we'll try it.

534
00:29:19,139 --> 00:29:20,179
All right.

535
00:29:20,180 --> 00:29:25,299
So the time stamp ordering protocol has philosophically a different way.

536
00:29:25,299 --> 00:29:27,860
We're going to use time stamps.

537
00:29:27,860 --> 00:29:32,539
And the way we use time stamps is we'll have associated with records.

538
00:29:32,539 --> 00:29:34,500
Let's assume we are doing everything at a record level.

539
00:29:34,500 --> 00:29:35,500
Right.

540
00:29:35,500 --> 00:29:36,500
So keep life simple.

541
00:29:36,500 --> 00:29:37,980
We'll mark when it was read.

542
00:29:37,980 --> 00:29:38,980
Mark when it was written.

543
00:29:38,980 --> 00:29:41,140
So we keep time stamps like that around.

544
00:29:41,140 --> 00:29:44,259
And it's not all these two time stamps as you'll see with the optimistic conferencing control

545
00:29:44,259 --> 00:29:46,019
to be just one time stamp.

546
00:29:46,019 --> 00:29:49,220
But the general idea is we're going to use the time stamps.

547
00:29:49,220 --> 00:29:53,180
And if I can mark every time I read or write an object, then I can use those time stamps

548
00:29:53,180 --> 00:29:57,420
and say, hey, these two records, two transactions wrote or read to it.

549
00:29:57,420 --> 00:29:58,420
Are they conflicting?

550
00:29:58,420 --> 00:30:01,539
If they read in very different times, then I'm okay going forward with that.

551
00:30:01,539 --> 00:30:05,620
If they're conflicting, then can I resolve the conflict by finding a serial order?

552
00:30:05,620 --> 00:30:09,100
In which it all works out and have to do this across all the records that transactions

553
00:30:09,100 --> 00:30:10,100
touch.

554
00:30:10,100 --> 00:30:10,940
Okay.

555
00:30:10,940 --> 00:30:16,460
So we'll also give transactions numbers.

556
00:30:16,460 --> 00:30:19,539
And those numbers now are not just going to be just random numbers, but they're going

557
00:30:19,539 --> 00:30:21,059
to mean something.

558
00:30:21,059 --> 00:30:27,420
So if I transaction 10 and your transaction 20, then all my work should be done before

559
00:30:27,420 --> 00:30:28,819
your work.

560
00:30:28,819 --> 00:30:33,779
Are numbers correspond to the serial execution schedules order?

561
00:30:33,779 --> 00:30:40,100
So lower transaction stuff must be done first in that equivalent serial schedule than the

562
00:30:40,100 --> 00:30:41,460
other transactions.

563
00:30:41,460 --> 00:30:44,900
Of course, the work is happening all in parallel, but eventually we have to support a serial

564
00:30:44,900 --> 00:30:46,140
schedule, right?

565
00:30:46,140 --> 00:30:49,140
And the serial schedule, remember when we had two transactions, we said is T1 followed

566
00:30:49,140 --> 00:30:51,700
by T2 or T2 followed by T1.

567
00:30:51,700 --> 00:30:57,020
Now these T1s and T2s, the numbers are going to mean numbers and we're going to need to ensure

568
00:30:57,020 --> 00:31:00,980
one happens before two if those are transaction numbers.

569
00:31:00,980 --> 00:31:01,980
Okay.

570
00:31:01,980 --> 00:31:04,540
And then we'll use the time stamps and we'll play around with tricks to say, let's assign

571
00:31:04,540 --> 00:31:07,180
the numbers carefully to get more parallelism.

572
00:31:07,180 --> 00:31:08,980
So we'll see how we do that.

573
00:31:08,980 --> 00:31:14,020
So everyone, okay, with the basic material that we now need, time stamps and transaction

574
00:31:14,019 --> 00:31:15,019
numbers now matter.

575
00:31:15,019 --> 00:31:16,379
They're not random numbers.

576
00:31:16,379 --> 00:31:22,779
They determine the order of the serial schedule, serializable schedule, config serializable

577
00:31:22,779 --> 00:31:26,339
schedule that we are trying to achieve.

578
00:31:26,339 --> 00:31:27,339
All right.

579
00:31:27,339 --> 00:31:30,220
Now where do these time stamps come from?

580
00:31:30,220 --> 00:31:32,819
What do they look like?

581
00:31:32,819 --> 00:31:34,420
Some systems will use a time stamp.

582
00:31:34,420 --> 00:31:35,619
That's a wall clock time.

583
00:31:35,619 --> 00:31:38,339
Just grab the wall clock and that's my time stamp.

584
00:31:38,339 --> 00:31:41,299
But obviously if you're a distributed system, the clocks may be out.

585
00:31:41,299 --> 00:31:42,900
You can't quite do that.

586
00:31:42,900 --> 00:31:48,140
That's what people will say is there's a global counter and I can read it and then get

587
00:31:48,140 --> 00:31:49,140
my number.

588
00:31:49,140 --> 00:31:52,820
But of course, two people may try to read that number and increment it at the same time.

589
00:31:52,820 --> 00:31:57,060
Luckily in hardware, you've got instructions that an atomic one cycle will allow you to

590
00:31:57,060 --> 00:31:58,420
read an updated number.

591
00:31:58,420 --> 00:32:03,820
So if I had a global counter, I protected with one of those instructions that the hardware

592
00:32:03,820 --> 00:32:08,700
says I can do it automatically, then I can build a counter that I can counter.

593
00:32:08,700 --> 00:32:10,620
But again, that works if I have a single machine.

594
00:32:10,619 --> 00:32:14,379
If I have distributed machines I have to do something else, which is kind of what Spanner

595
00:32:14,379 --> 00:32:16,699
has to do and all these distributed systems have to do.

596
00:32:16,699 --> 00:32:20,259
So that's like a logical counter or some combination of that.

597
00:32:20,259 --> 00:32:23,339
It's not as important when these numbers come from.

598
00:32:23,339 --> 00:32:25,619
It is of course important if you have to implement it.

599
00:32:25,619 --> 00:32:29,339
But the material today will just assume that some way that we are getting these numbers

600
00:32:29,339 --> 00:32:33,179
from because even that counter stuff has to be protected because multiple people may be

601
00:32:33,179 --> 00:32:36,139
trying to write to that counter at the same time.

602
00:32:36,139 --> 00:32:37,379
So it's the non-previal thing.

603
00:32:37,379 --> 00:32:39,619
You can't ignore that if you're trying to implement something.

604
00:32:40,619 --> 00:32:41,859
So we have a number.

605
00:32:41,859 --> 00:32:43,059
We have these timestamps.

606
00:32:43,059 --> 00:32:50,539
Let's start with the basic time-order protocol which has the following components.

607
00:32:50,539 --> 00:32:54,539
Transactions are going to read and write objects, but there's no locks now.

608
00:32:54,539 --> 00:32:56,699
This is a competing scheme.

609
00:32:56,699 --> 00:32:58,419
No locks are needed.

610
00:32:58,419 --> 00:33:05,299
Now, but remember, split 2PL and 2PL was all about getting a serial schedule.

611
00:33:05,299 --> 00:33:10,019
So we will still get a serializable schedule but without doing any of that stuff.

612
00:33:10,019 --> 00:33:13,460
So completely different way of thinking about it.

613
00:33:13,460 --> 00:33:18,339
Every object will be grabbed, will be tagged with the timestamp of the last transaction

614
00:33:18,339 --> 00:33:20,139
that read and wrote it.

615
00:33:20,139 --> 00:33:22,619
So again, every object has these two timestamps.

616
00:33:22,619 --> 00:33:26,379
And when they say object just referred to it as a record, but it's generalizable to other

617
00:33:26,379 --> 00:33:27,379
things.

618
00:33:27,379 --> 00:33:29,019
If I'm doing page level locking, the object is a page.

619
00:33:29,019 --> 00:33:34,859
If I'm doing file level locking, it's a file and depends on what that notion is.

620
00:33:35,859 --> 00:33:40,419
Now, if a transaction tries to the main principle we'll do is the one that's written up over

621
00:33:40,419 --> 00:33:44,979
here at the bottom is, we'll use these timestamps philosophically in the following way.

622
00:33:44,979 --> 00:33:49,619
If I'm trying to do something to an object, read or write, I'll look at the timestamps

623
00:33:49,619 --> 00:33:52,979
there and say, whoops, what do these timestamps tell me?

624
00:33:52,979 --> 00:33:56,779
Did someone do something to this object, read or write?

625
00:33:56,779 --> 00:34:01,419
And they're ahead of me in that transaction number order or that logical order.

626
00:34:01,420 --> 00:34:06,940
If so, I need to back out of it because if I insert my operation now, I will end up,

627
00:34:06,940 --> 00:34:10,820
I'm guaranteed to end up with a non-serializable schedule.

628
00:34:10,820 --> 00:34:16,700
So now, a problem just becomes how we develop these conditions, these simple equations that

629
00:34:16,700 --> 00:34:19,460
tell us when I shouldn't do bad stuff.

630
00:34:19,460 --> 00:34:23,340
And of course, every time I do some operation on an object, I better go update the timestamps,

631
00:34:23,340 --> 00:34:24,340
right?

632
00:34:24,340 --> 00:34:28,940
So that I can leave that marker behind saying, I was here and this is what I did to it.

633
00:34:28,940 --> 00:34:29,940
Okay?

634
00:34:30,780 --> 00:34:32,700
So let's get going.

635
00:34:32,700 --> 00:34:40,139
So the basic TO protocol, again, as I said, it's not practical, but it just provides us a foundation,

636
00:34:40,139 --> 00:34:45,659
is every time a transaction wants to read an object, it does the following, right?

637
00:34:45,659 --> 00:34:50,659
It is going to look at the, you're going to start to get a little bit more familiar with

638
00:34:50,659 --> 00:34:51,659
these equations.

639
00:34:51,659 --> 00:34:53,420
So let's just store down on these slides.

640
00:34:53,420 --> 00:34:59,340
You'll see T s of ti, that is the timestamp of that transaction ti.

641
00:34:59,340 --> 00:35:02,579
Think of it as a transaction number, if that's all we have, right?

642
00:35:02,579 --> 00:35:06,059
And then the right that is happening to that object X.

643
00:35:06,059 --> 00:35:08,059
So I'm trying to do something to object X.

644
00:35:08,059 --> 00:35:11,940
In this case, transaction ti wants to read object X, right?

645
00:35:11,940 --> 00:35:13,820
That's the action, noted at the top.

646
00:35:13,820 --> 00:35:23,220
And if I see that the timestamp, the right timestamp of that object is bigger than my timestamp,

647
00:35:23,219 --> 00:35:30,459
then something happened to the object that's a future value that X should not be seen, right?

648
00:35:30,459 --> 00:35:33,779
Because these timestamps, these numbers now mean something.

649
00:35:33,779 --> 00:35:35,779
These timestamps mean something, right?

650
00:35:35,779 --> 00:35:41,059
So I cannot basically, the most intuitive way to think about it is to say, I cannot read

651
00:35:41,059 --> 00:35:43,299
stuff from the future.

652
00:35:43,299 --> 00:35:45,500
Okay?

653
00:35:45,500 --> 00:35:47,219
I cannot see stuff in the future.

654
00:35:47,219 --> 00:35:52,299
Because otherwise, if I start doing that, then I'm going to get some sort of a normally,

655
00:35:52,300 --> 00:35:57,100
like I'll get a WR, normally very easily, if I start doing that or an RW anomaly.

656
00:35:57,100 --> 00:35:59,380
Let's start in this case, it would be RW.

657
00:35:59,380 --> 00:36:01,060
So okay?

658
00:36:01,060 --> 00:36:05,100
So if I hit that condition, when I'm seeing something in the future, I'll abort.

659
00:36:05,100 --> 00:36:07,820
Otherwise, I will read.

660
00:36:07,820 --> 00:36:11,700
But now I need to let the world know that I read it.

661
00:36:11,700 --> 00:36:19,180
So I will update the read timestamp to be little tricky here, to be the maximum of my

662
00:36:19,179 --> 00:36:22,379
timestamp and whatever was already there.

663
00:36:22,379 --> 00:36:25,539
Since reads are compatible with each other and you'll see that in an example in a little

664
00:36:25,539 --> 00:36:30,059
bit, if reads are compatible with each other, this max is saying if another future reader

665
00:36:30,059 --> 00:36:32,339
got ahead of me, I don't care.

666
00:36:32,339 --> 00:36:34,460
I should simply not write.

667
00:36:34,460 --> 00:36:37,699
I should not have seen some future transactions write.

668
00:36:37,699 --> 00:36:39,699
Okay?

669
00:36:39,699 --> 00:36:41,859
So that max stuff you'll see in a second.

670
00:36:41,859 --> 00:36:48,179
And now one more thing that we will do here is we will go and say that we are going to

671
00:36:48,179 --> 00:36:57,179
also, going to make a local copy of that object that we just read so that we can start to

672
00:36:57,179 --> 00:37:01,579
make sure that if I need to repeat that read, I'm okay with doing that.

673
00:37:01,579 --> 00:37:03,059
And you'll see that in a second, right?

674
00:37:03,059 --> 00:37:04,940
Because x is value will keep getting changed.

675
00:37:04,940 --> 00:37:09,379
If I want to make sure repeatable reads, remember we had that repeatable read anomaly, right?

676
00:37:09,379 --> 00:37:13,659
If I want to prevent repeatable reads, then I need to make a copy for myself.

677
00:37:13,659 --> 00:37:14,659
Yep.

678
00:37:14,659 --> 00:37:19,980
We'll talk about that in a bit.

679
00:37:19,980 --> 00:37:25,480
Yes, this can cause starvation, like deadlocks could cause deadlocks, this will cause starvation

680
00:37:25,480 --> 00:37:26,739
and their ways of getting around that.

681
00:37:26,739 --> 00:37:29,619
Just hold on to that question for about five minutes.

682
00:37:29,619 --> 00:37:30,619
Good question.

683
00:37:30,619 --> 00:37:34,779
Starvation will happen and then we'll just make sure that timestamps are assigned in a way

684
00:37:34,779 --> 00:37:37,379
that we don't infinitely start someone.

685
00:37:37,379 --> 00:37:38,379
That's a quick answer.

686
00:37:38,379 --> 00:37:40,940
Okay, now we figured out what to do with reads.

687
00:37:40,940 --> 00:37:42,940
Now let's figure out what to do with writes.

688
00:37:42,940 --> 00:37:45,139
So for writes, the conditions are a little complicated.

689
00:37:45,139 --> 00:37:48,500
Tsti is the transaction that's trying to write, right?

690
00:37:48,500 --> 00:37:50,900
So that's the timestamp of the transaction.

691
00:37:50,900 --> 00:37:55,220
And then we check if the read or the write timestamp of the object we are trying to read

692
00:37:55,220 --> 00:37:56,539
is in the future.

693
00:37:56,539 --> 00:38:00,659
Okay, again, similar to that, but for the writes, we have to check both the read and the

694
00:38:00,659 --> 00:38:01,659
write timestamp.

695
00:38:01,659 --> 00:38:04,059
For the reads, we just have to check the write timestamp.

696
00:38:04,059 --> 00:38:10,500
If you want to keep a mental model, the previous slide was about the RW anomaly.

697
00:38:10,500 --> 00:38:13,260
This is about the WR and WW.

698
00:38:13,260 --> 00:38:18,340
And if you understand dependency graph and cycles are bad, you can take any complicated

699
00:38:18,340 --> 00:38:21,940
protocol, put your head to it and it'll start to look simpler.

700
00:38:21,940 --> 00:38:24,179
Okay.

701
00:38:24,179 --> 00:38:29,019
So now this basically says I cannot write if a future transaction has read or written to

702
00:38:29,019 --> 00:38:30,500
an object.

703
00:38:30,500 --> 00:38:32,980
And I will abort if I detect that condition.

704
00:38:32,980 --> 00:38:33,980
Otherwise, I will write.

705
00:38:33,980 --> 00:38:36,539
I know I better tell the world about that.

706
00:38:36,539 --> 00:38:39,500
So I need to go and update the write timestamp.

707
00:38:40,340 --> 00:38:41,340
Okay.

708
00:38:41,340 --> 00:38:43,820
All right, let's say, yep.

709
00:38:43,820 --> 00:38:49,820
When do you assign the RTS and the WTS?

710
00:38:49,820 --> 00:38:55,820
So let's actually go into that right now with this example and that will make it clear.

711
00:38:55,820 --> 00:38:56,820
Okay.

712
00:38:56,820 --> 00:38:58,019
So here's an example.

713
00:38:58,019 --> 00:39:01,380
I've got a schedule in which transactions are happening.

714
00:39:01,380 --> 00:39:03,780
I've got big in and reads and writes.

715
00:39:03,780 --> 00:39:08,300
I've got a database and now associated with each object.

716
00:39:08,300 --> 00:39:10,180
We'll have a read and a write timestamp.

717
00:39:10,180 --> 00:39:14,460
So every object is going to need those two values that are associated with it.

718
00:39:14,460 --> 00:39:18,220
And let's start with the big in transaction and let's assume right now that that's when

719
00:39:18,220 --> 00:39:19,740
we assign the timestamp.

720
00:39:19,740 --> 00:39:21,940
So transaction T1 actually is one.

721
00:39:21,940 --> 00:39:22,940
That's its number.

722
00:39:22,940 --> 00:39:27,060
Now this number has a meaning, which means all of T1 must happen before T2.

723
00:39:27,060 --> 00:39:30,140
In this schedule, we are going to allow.

724
00:39:30,140 --> 00:39:31,660
Okay.

725
00:39:31,660 --> 00:39:34,060
Now read happens.

726
00:39:34,060 --> 00:39:35,140
So now this is the first part.

727
00:39:35,140 --> 00:39:36,140
Remember two slides ago.

728
00:39:36,139 --> 00:39:40,460
We'll read and say, hey, what's the right timestamp of this object B?

729
00:39:40,460 --> 00:39:41,460
Oh, zero.

730
00:39:41,460 --> 00:39:42,460
Fine.

731
00:39:42,460 --> 00:39:43,460
It's in the past.

732
00:39:43,460 --> 00:39:46,739
I can go read that and that's totally fine.

733
00:39:46,739 --> 00:39:49,059
And oh, I need to record that I read it.

734
00:39:49,059 --> 00:39:53,460
So I'll take the max of zero and one, which is one and I put one there.

735
00:39:53,460 --> 00:39:54,460
Okay.

736
00:39:54,460 --> 00:39:55,460
There was that max call.

737
00:39:55,460 --> 00:39:58,379
If you remember, in the read portion of this protocol.

738
00:39:58,379 --> 00:39:59,379
All right.

739
00:39:59,379 --> 00:40:01,859
Now I go to the second transaction.

740
00:40:01,859 --> 00:40:02,859
Context switches over.

741
00:40:02,859 --> 00:40:04,900
Let's say the second transaction gets to run.

742
00:40:04,900 --> 00:40:05,900
Read assigned.

743
00:40:05,900 --> 00:40:07,380
It's get transaction ID 2.

744
00:40:07,380 --> 00:40:11,980
So now all of its action must happen in the final state of the database after transaction

745
00:40:11,980 --> 00:40:14,380
1 and then read it.

746
00:40:14,380 --> 00:40:18,180
Read B and say, oh, I'm two.

747
00:40:18,180 --> 00:40:19,340
Right timestamp is zero.

748
00:40:19,340 --> 00:40:20,340
That's fine.

749
00:40:20,340 --> 00:40:22,660
I'll just make sure that everyone knows that I've read it.

750
00:40:22,660 --> 00:40:26,700
So I update the read timestamp to two and I move on.

751
00:40:26,700 --> 00:40:29,019
Now I get to write.

752
00:40:29,019 --> 00:40:31,740
I have to write to this object B.

753
00:40:32,059 --> 00:40:33,699
The right timestamp just before that happens.

754
00:40:33,699 --> 00:40:36,539
If I go back was zero, I'm fine.

755
00:40:36,539 --> 00:40:39,139
The read timestamp is two, not in the future.

756
00:40:39,139 --> 00:40:40,139
Right.

757
00:40:40,139 --> 00:40:40,979
So I look both at the read and write timestamp.

758
00:40:40,979 --> 00:40:42,419
They're not in the future.

759
00:40:42,419 --> 00:40:48,299
I can do that right and make sure the right timestamp is now my timestamp.

760
00:40:48,299 --> 00:40:49,299
Right.

761
00:40:49,299 --> 00:40:50,299
So that answers your question.

762
00:40:50,299 --> 00:40:51,299
Okay.

763
00:40:51,299 --> 00:40:54,859
Then context switches over to T1.

764
00:40:54,859 --> 00:40:58,539
It says I have to read of A.

765
00:40:59,460 --> 00:41:02,340
And that's okay because A was not read.

766
00:41:02,340 --> 00:41:04,099
So I'll just let everyone know that A is read.

767
00:41:04,099 --> 00:41:09,019
So I made the A, which is an object we hadn't touched so far, set it to be one.

768
00:41:09,019 --> 00:41:10,460
Same thing happens there.

769
00:41:10,460 --> 00:41:12,380
Very similar to what happened to be.

770
00:41:12,380 --> 00:41:17,460
And then I go back to read this value A.

771
00:41:17,460 --> 00:41:20,579
And that's okay because the right timestamp is zero.

772
00:41:21,820 --> 00:41:24,139
T2 has interfered with me, but only on read.

773
00:41:24,139 --> 00:41:24,900
So it doesn't matter.

774
00:41:24,900 --> 00:41:26,659
Read's don't interfere with reads.

775
00:41:26,659 --> 00:41:29,539
So notice how on the read side, I checked the right timestamp.

776
00:41:29,539 --> 00:41:33,019
And now you can see why I didn't need to worry about the read timestamp on the read side.

777
00:41:34,259 --> 00:41:35,779
There's no R, R anomaly.

778
00:41:38,099 --> 00:41:40,739
Now this is okay.

779
00:41:40,739 --> 00:41:43,179
T1 is less than T2, but that's fine.

780
00:41:43,179 --> 00:41:44,139
That's allowed.

781
00:41:44,139 --> 00:41:45,299
Right happens.

782
00:41:45,299 --> 00:41:47,139
Then we go update the right timestamp.

783
00:41:47,139 --> 00:41:48,179
That's also allowed.

784
00:41:48,179 --> 00:41:49,500
And this transaction comets.

785
00:41:49,500 --> 00:41:53,940
And it's as if even though we had this interleaving, the final state of the database is T1 followed by T2.

786
00:41:54,940 --> 00:41:55,940
Okay.

787
00:41:55,940 --> 00:42:01,500
Somehow totally different mechanism that doesn't use locks can use timestamps, but we have to use it properly.

788
00:42:04,500 --> 00:42:05,659
Let's keep going.

789
00:42:05,659 --> 00:42:06,659
Second example.

790
00:42:09,420 --> 00:42:10,420
Read A.

791
00:42:10,420 --> 00:42:12,099
Now you guys know how that works.

792
00:42:12,099 --> 00:42:14,019
You're going to go update that.

793
00:42:14,019 --> 00:42:15,300
Right of A happens.

794
00:42:15,300 --> 00:42:16,099
We go do that.

795
00:42:16,099 --> 00:42:21,460
So after the read write, the transaction has A values read timestamp 1, right timestamp 2.

796
00:42:22,300 --> 00:42:24,820
Pretty similar to what we did so far.

797
00:42:24,820 --> 00:42:26,179
Now T2 comets.

798
00:42:27,220 --> 00:42:28,220
Right.

799
00:42:28,220 --> 00:42:32,500
T1 has to go right to a value A.

800
00:42:34,740 --> 00:42:35,740
What should happen here?

801
00:42:38,740 --> 00:42:40,420
Can it write to the value A?

802
00:42:41,539 --> 00:42:43,220
Because the right timestamp is 2, right?

803
00:42:43,220 --> 00:42:46,019
So following that protocol that we just said, it cannot.

804
00:42:46,099 --> 00:42:49,860
So it violates that piece because it's an object in the future.

805
00:42:49,860 --> 00:42:50,900
I'm only one.

806
00:42:50,900 --> 00:42:55,139
My serial order in the config simulator as well is 1 followed by 2.

807
00:42:55,139 --> 00:42:56,500
How can I see two stuff?

808
00:42:56,500 --> 00:42:57,420
That's wrong.

809
00:42:57,420 --> 00:42:59,460
So I cannot overwrite that.

810
00:42:59,460 --> 00:43:08,380
So transaction 2 has to go and basically abort and has to restart.

811
00:43:08,380 --> 00:43:09,619
At that point it restarts.

812
00:43:09,619 --> 00:43:12,420
It'll grab a new timestamp and go about doing its own business.

813
00:43:13,260 --> 00:43:14,260
Okay.

814
00:43:14,260 --> 00:43:17,059
And when it gets a new timestamp, it's time stuff will be more recent.

815
00:43:17,059 --> 00:43:18,900
But as we'll talk about there are other ways of doing that.

816
00:43:18,900 --> 00:43:19,700
Yep, question.

817
00:43:19,700 --> 00:43:31,780
So you're asking, so the question is related to the cascading abort kind of situation, right?

818
00:43:31,780 --> 00:43:37,780
What if T2, if there was some other interview in the right and the read and there was a cascading abort situation.

819
00:43:37,780 --> 00:43:39,539
So can cascading abort happen?

820
00:43:39,539 --> 00:43:40,099
Yes.

821
00:43:40,099 --> 00:43:41,380
In the similar kind of way.

822
00:43:41,380 --> 00:43:45,780
This is during the same type of server doing that for to avoid cascading abort.

823
00:43:45,780 --> 00:43:48,180
You would basically say any aborting transaction.

824
00:43:48,180 --> 00:43:49,539
You'll do the same thing as we talked about.

825
00:43:49,539 --> 00:43:52,099
You'll have to do the you'll have to have the commit graph.

826
00:43:52,099 --> 00:43:54,340
It's called the commit graph saying who's committed?

827
00:43:54,340 --> 00:43:57,539
When can I commit and then keep track of that to keep around?

828
00:43:57,539 --> 00:44:03,059
And again, it's like I will defer that topic because we could go down a rabbit hole to go figure that part out.

829
00:44:03,059 --> 00:44:08,180
But this is very similar in philosophy to what happens with all the abort stuff.

830
00:44:08,180 --> 00:44:08,820
Go for it.

831
00:44:11,380 --> 00:44:13,940
That's what this is kind of really bad.

832
00:44:13,940 --> 00:44:14,740
Yeah.

833
00:44:14,740 --> 00:44:16,579
Yes, correct.

834
00:44:16,579 --> 00:44:19,059
So this is a bad protocol from that perspective.

835
00:44:19,059 --> 00:44:23,460
Now, a record, just even the reader, a pure reader is going to have to update timestamps.

836
00:44:23,460 --> 00:44:28,260
So it's making updates to some place in the database and that is expensive.

837
00:44:28,260 --> 00:44:32,579
So no one implements this as, you know, there's just an example to get us going.

838
00:44:32,579 --> 00:44:34,740
But we'll talk about more efficient ways to do this.

839
00:44:34,740 --> 00:44:35,380
Absolutely.

840
00:44:35,380 --> 00:44:39,780
The pattern at runtime where it just like the end of planning off-line is fixed.

841
00:44:39,780 --> 00:44:41,380
What part happens at runtime?

842
00:44:41,380 --> 00:44:42,580
Can you be more specific?

843
00:44:42,580 --> 00:44:43,780
The timestamp stuff?

844
00:44:43,780 --> 00:44:44,340
Yes, yes.

845
00:44:44,340 --> 00:44:45,780
Like checking more conflicts, checking more.

846
00:44:45,780 --> 00:44:46,420
At runtime.

847
00:44:46,420 --> 00:44:52,420
So the question is does a timestamp check happen at runtime or some place else runtime when I'm accessing the record I'll check?

848
00:44:53,620 --> 00:44:54,019
Yeah.

849
00:45:02,740 --> 00:45:03,220
That's correct.

850
00:45:04,019 --> 00:45:08,980
Infer leaving quarter, might be different for the same query, but the same thing.

851
00:45:08,980 --> 00:45:09,459
Yep.

852
00:45:09,459 --> 00:45:10,659
You totally got that.

853
00:45:10,659 --> 00:45:16,259
So it all has to happen at runtime because otherwise the only thing you can do at static time is to grab an X lock on the database.

854
00:45:16,259 --> 00:45:17,939
Because you don't know what you're going to touch, right?

855
00:45:17,939 --> 00:45:22,019
And as we talked about, you know, you're building a database and are rushing for time.

856
00:45:22,019 --> 00:45:22,819
You want to get it correct.

857
00:45:22,819 --> 00:45:26,980
That's what you'll do, but it will be a very slow database system.

858
00:45:28,579 --> 00:45:28,980
Questions?

859
00:45:29,059 --> 00:45:37,300
Can you analyze the transactions directly?

860
00:45:37,300 --> 00:45:41,219
So for that, I would need to know all the transactions that are going to come by, I'm running.

861
00:45:41,219 --> 00:45:42,740
I don't know how long I'm going to run.

862
00:45:42,740 --> 00:45:44,260
I don't know what's going to come while I'm running.

863
00:45:44,820 --> 00:45:50,820
So if I had a schedule of transactions, if I said I have a database system that on Monday morning,

864
00:45:50,820 --> 00:45:55,139
only does these two transactions and they touch only these two records and a perfect plan,

865
00:45:55,139 --> 00:45:58,579
then yes, but everything is, you know, you can't do that, right?

866
00:45:58,579 --> 00:46:03,779
The database is going to get queries when it gets queries and you don't know how much stuff it's going to take or touch

867
00:46:04,980 --> 00:46:06,579
in the data till it actually starts running.

868
00:46:08,179 --> 00:46:08,900
But it's good.

869
00:46:08,900 --> 00:46:10,019
You're thinking in the right ways.

870
00:46:10,019 --> 00:46:12,659
It's like, oh, can I get better at this?

871
00:46:12,659 --> 00:46:18,019
If I knew something about the timing and if I knew something about the properties of these transactions,

872
00:46:18,019 --> 00:46:22,980
and what we want to do is to build something completely safe in general that no matter what happens,

873
00:46:22,980 --> 00:46:27,699
we are efficient and correct, which is hard, which is hard.

874
00:46:29,460 --> 00:46:31,059
All right. Are the questions?

875
00:46:38,099 --> 00:46:39,619
Both of these are committed right now.

876
00:46:40,820 --> 00:46:43,139
So the question is, do you about T2?

877
00:46:43,139 --> 00:46:44,099
Do you about T2?

878
00:46:44,099 --> 00:46:46,340
Sorry, T2 has already committed, so it's fine.

879
00:46:46,340 --> 00:46:47,860
T1 is the one that we'll abort.

880
00:46:48,820 --> 00:46:52,340
Doesn't T1 come before like R1 or A?

881
00:46:52,340 --> 00:46:52,420
Yeah.

882
00:46:54,420 --> 00:46:58,660
Yeah, so you're asking a good question because I said T1 got transaction number one,

883
00:46:58,660 --> 00:47:02,260
so it's as if it is in the serial schedule ahead of T2.

884
00:47:02,260 --> 00:47:05,780
That is true, but right now there's no dependency from T1 to T2, right?

885
00:47:06,260 --> 00:47:08,900
T2 is reading stuff that was already there before.

886
00:47:08,900 --> 00:47:15,460
So effectively, once we abort T1, it's as if the world had started with only T2 in the picture.

887
00:47:17,860 --> 00:47:21,460
When that mess up the right, then it's retried with T1 after that right?

888
00:47:22,420 --> 00:47:24,019
No, no, which rights?

889
00:47:24,019 --> 00:47:26,420
So right now we are on the right of A and T1.

890
00:47:26,420 --> 00:47:28,099
We'll abort it so that right won't go through.

891
00:47:29,380 --> 00:47:30,579
Yeah, so what is that right?

892
00:47:30,579 --> 00:47:32,260
So it's happy before the T2, right?

893
00:47:36,579 --> 00:47:38,500
Yeah, yeah, yeah, I know exactly what you're saying.

894
00:47:38,500 --> 00:47:42,500
So you're saying, I started by saying T1 and T2, if they're both in the system,

895
00:47:42,500 --> 00:47:45,140
I want the serial schedule of T1 followed by T2.

896
00:47:45,219 --> 00:47:46,659
I'm playing a little loose over here.

897
00:47:47,219 --> 00:47:48,819
We are aborting T1.

898
00:47:48,819 --> 00:47:50,339
So it's as if I'm saying, oh, you know what?

899
00:47:50,339 --> 00:47:53,699
I went and fixed it in a correct way so that T1 never existed.

900
00:47:54,259 --> 00:47:58,019
So when a abort happens in a serial schedule, it's all related to all this cascading about

901
00:47:58,019 --> 00:47:59,219
another stuff too.

902
00:47:59,219 --> 00:48:06,420
We've always talked about equivalent serial schedules as being transactions, T1 and T2,

903
00:48:06,420 --> 00:48:09,059
but implicitly, we've always been saying T1 and T2 commit.

904
00:48:09,059 --> 00:48:09,539
We know that.

905
00:48:10,339 --> 00:48:12,819
But if it's a abort, it's like they never existed before.

906
00:48:12,820 --> 00:48:13,860
So it's a little trick.

907
00:48:13,860 --> 00:48:15,700
On the slide, I can only fit two examples.

908
00:48:15,700 --> 00:48:22,100
But if you imagine T1, T2, T3, it's as if T1 aborted because of some violation and T2 and T3 safely

909
00:48:22,100 --> 00:48:22,900
could get along.

910
00:48:22,900 --> 00:48:26,820
It's as if it happened as two followed by three and the aborted transaction never existed.

911
00:48:26,820 --> 00:48:30,260
It's kind of like I could go and read out the history from the past when the aborted transaction.

912
00:48:30,820 --> 00:48:32,100
Yeah, but that's a great observation.

913
00:48:32,100 --> 00:48:35,539
It's like, whoa, whoa, you're telling me one followed by two, but you took away one.

914
00:48:35,539 --> 00:48:38,500
You took away one because we're going and changing the rules in that different way.

915
00:48:39,140 --> 00:48:39,380
Yeah.

916
00:48:39,380 --> 00:48:44,340
There's someone you feel like intelligently scheduled because it's pretty clear by looking at it.

917
00:48:44,340 --> 00:48:48,579
So the question is, can you intelligently schedule this?

918
00:48:48,579 --> 00:48:51,780
Yes, but I don't know what T1 is going to do when T1 starts.

919
00:48:51,780 --> 00:48:53,700
I don't know if it's going to write to A.

920
00:48:53,700 --> 00:48:57,140
It will only know what it's reading and writing as it proceeds in the transaction.

921
00:48:57,140 --> 00:48:58,340
That's a whole game.

922
00:48:58,340 --> 00:49:02,260
We don't know what the transaction is going to do until it starts to do its work.

923
00:49:02,260 --> 00:49:03,460
Is there any way to analyze it?

924
00:49:04,180 --> 00:49:08,980
Not necessarily because if I said I've got a transaction in which I'm going to read all the bank

925
00:49:08,980 --> 00:49:14,340
records and only the ones that are the highest I'm going to give a $50 bonus.

926
00:49:14,900 --> 00:49:17,780
Unless I look at the data statically, I cannot tell anything.

927
00:49:20,659 --> 00:49:24,500
You can tell what columns you're going, but that's going to not do you much because you don't know

928
00:49:25,619 --> 00:49:27,780
which of those columns you're eventually going to go update.

929
00:49:34,260 --> 00:49:38,500
The transaction, see, time is proceeding from top to bottom in all our schedules.

930
00:49:38,980 --> 00:49:42,820
At any point in time, you can imagine it's as if we were at the beginning of T1.

931
00:49:42,820 --> 00:49:45,619
We don't know what the world's going to look like at the next time take.

932
00:49:46,420 --> 00:49:48,179
A read may come, a write may come.

933
00:49:48,179 --> 00:49:53,300
We are saying no matter what you throw at me, I want to make all of that safe and happen for you.

934
00:49:55,139 --> 00:49:59,219
Your question could be, if I knew exactly what it's exactly the question that was asked before.

935
00:49:59,219 --> 00:50:03,619
If I knew exactly what the transaction was going to do, every transaction in my system only reads A

936
00:50:03,699 --> 00:50:09,539
and the other and writes A. The other transactions read A, write A and read B and write B.

937
00:50:09,539 --> 00:50:14,019
If that's all I was doing, I can do all kinds of crazy schedule, but that's a database system

938
00:50:14,019 --> 00:50:20,179
that can do much. We don't know what read and writes are going to come till the transaction proceeds.

939
00:50:20,819 --> 00:50:23,619
So, yep.

940
00:50:27,619 --> 00:50:28,099
Sorry.

941
00:50:32,819 --> 00:50:33,699
Ask again, sorry.

942
00:50:35,539 --> 00:50:36,659
What we are for T1?

943
00:50:36,659 --> 00:50:38,419
Yeah. When you see a bought T1.

944
00:50:42,019 --> 00:50:44,339
Yeah, yeah. Yeah, exactly.

945
00:50:44,500 --> 00:50:50,100
So, if T1 is a bought it, then it will get rerun by some mechanism that mechanism could be you

946
00:50:50,100 --> 00:50:54,900
as the SQL programmer could have said, if I get an abort from this, you write the SQL code,

947
00:50:54,900 --> 00:50:58,579
you check for error condition. So, if I get a bought, read right again and you might say,

948
00:50:58,579 --> 00:51:02,579
read right five times or some number of times. So, the application code will typically have some

949
00:51:02,579 --> 00:51:08,100
handling of that. Okay, all right. I need to keep moving. I'm on slide 10 of 85.

950
00:51:09,140 --> 00:51:14,100
All right. Great. So, some of you might have noticed that,

951
00:51:14,099 --> 00:51:18,980
you could have told me here that that right of A going back to the question that was just asked

952
00:51:18,980 --> 00:51:25,539
here, hey, what if I just wrote that A through that right of A, because I know I, all that's

953
00:51:25,539 --> 00:51:31,380
happening. If I wanted to really follow that T1 followed by T2, the database already has a

954
00:51:31,380 --> 00:51:35,860
right of T2, which is all I need to end up with, I could just have thrown this right of A and let

955
00:51:35,860 --> 00:51:42,900
T1 actually commit. And turns out that in very specific conditions like this, where you have a

956
00:51:42,980 --> 00:51:49,300
right over someone else's right, but you are the previous transaction, you could actually under

957
00:51:49,300 --> 00:51:54,900
some conditions through that right of A and allow this to proceed. So, you are perhaps starting to

958
00:51:54,900 --> 00:51:59,380
think like that when you ask that question. There's a rule called the Thomas right rule, which

959
00:51:59,380 --> 00:52:06,180
effectively says that in a more mathematical form, saying that when you have that specific

960
00:52:06,180 --> 00:52:11,059
condition of a right followed by a right based on this timestamp that the previous transaction

961
00:52:11,059 --> 00:52:17,539
is just trying to write that, you could allow that right to proceed. And effectively what this

962
00:52:17,539 --> 00:52:22,820
allows is with the Thomas right rule, you are now allowing schedules that become, that are view

963
00:52:22,820 --> 00:52:27,779
serializable and a little bit bigger than just the conflict serializable set of schedules. And I

964
00:52:27,779 --> 00:52:31,940
won't prove it, but I will just leave that as a thought exercise, right? You are allowing more

965
00:52:31,940 --> 00:52:37,460
schedules than you would strictly allow, okay? So, there's a proper rule, it's not that important,

966
00:52:37,460 --> 00:52:42,500
as I said, no one writes transaction management system with this TO protocol that we talked about,

967
00:52:42,500 --> 00:52:47,380
and the right rule is very famous in database systems. So, if you ever talk to a transaction person,

968
00:52:47,380 --> 00:52:52,260
they'll know about it, they'll sometimes refer to it. But in practice, it's not a rule that gets used

969
00:52:52,260 --> 00:52:56,340
because, as you talked about view serializable stuff, it's not what we typically end up trying to

970
00:52:56,340 --> 00:53:03,619
get it super hard to implement. So, I'm going to just leave with one note that Andy had,

971
00:53:03,619 --> 00:53:08,179
Andy likes to go dig up all these things, it's like, okay, who's this Thomas guy? And so, when he

972
00:53:08,179 --> 00:53:14,659
dug this up, what he found was that this is a guy who was at BBN, which was a networking company that

973
00:53:14,659 --> 00:53:19,219
did one of the earliest internet, but they were also like a think tank and they did a whole bunch of

974
00:53:19,219 --> 00:53:26,339
actually super interesting database stuff in the late 70s and early 80s. And Andy suspects that

975
00:53:26,339 --> 00:53:31,059
this is the same guy who also wrote the first computer worm, there's a Wikipedia article that

976
00:53:31,059 --> 00:53:37,940
talks about the first computer worm was written by someone called Bob Thomas also at BBN. So,

977
00:53:37,940 --> 00:53:42,500
it's probably the same person. And if you guys know in the security literature, there's always a

978
00:53:42,500 --> 00:53:46,340
Bob and Alice, right? They always have Bob and Alice trying to do something that someone else is

979
00:53:46,340 --> 00:53:53,539
trying to interfere with. So, very likely it is the same guy. I just leave that in the slides over

980
00:53:53,539 --> 00:53:58,739
here, you might find that interesting. All right, all right, also gives you a little bit of relief from

981
00:53:58,739 --> 00:54:04,819
thinking about transactions, which can start to weigh you down. But let's get moving. Here's

982
00:54:04,819 --> 00:54:12,899
another example with a basic time order protocol. And here what we are going to do is basically just

983
00:54:12,899 --> 00:54:19,619
start going through this. Read happens, write happens, same thing as before. Then this comment

984
00:54:19,619 --> 00:54:24,900
happens and now, oops, lost my slide, the write for A that happens,

985
00:54:28,099 --> 00:54:33,859
interferes because the write for two has a much higher value, right? So, we do not update that

986
00:54:33,859 --> 00:54:38,179
write timestamp. Now, we could skip doing this actual write as we talked about with the Thomas

987
00:54:38,179 --> 00:54:44,339
write rule if we were supporting that. But there's a read following that, right? So, what you have to do

988
00:54:44,340 --> 00:54:50,500
is you do the write, but you keep it to the local copy so that the read is within your transaction

989
00:54:50,500 --> 00:54:54,260
itself, you should be reading what you just wrote and not seconds value, right? So, you're going to

990
00:54:54,260 --> 00:55:00,420
start making a copy of stuff that you write to if you wanted to support that advanced mode,

991
00:55:01,220 --> 00:55:05,700
so that the reads in your transaction, which are now allowed, they shouldn't see the second write,

992
00:55:05,700 --> 00:55:11,300
they should see your write. And so, you're making local copies of things. And we use this mechanism

993
00:55:11,300 --> 00:55:17,300
of local copies for the next protocol that we're going to talk about. All right. So,

994
00:55:17,300 --> 00:55:20,420
we've already covered this, I'm going to skim over it because your questions cover that.

995
00:55:21,940 --> 00:55:27,060
There's no deadlocks because, you know, we don't have that. There's a possibility of starvation,

996
00:55:27,060 --> 00:55:30,740
the question that was just asked over here, a little while back. If I've got a long running

997
00:55:30,740 --> 00:55:35,700
transaction, I start on this end of the file, I may have a billion records to go through and I'm doing

998
00:55:35,700 --> 00:55:40,100
this at the record level. By the time I get there, someone's probably gone in the head off me and I have

999
00:55:40,099 --> 00:55:44,980
to go restart and start to do other kinds of things with it. Now, if that happens, there are all kinds

1000
00:55:44,980 --> 00:55:48,980
of things you could do with it, including things at some point, you might say, I just have to pause all

1001
00:55:48,980 --> 00:55:53,380
these other guys so that I can go through that. But there are other protocols to go follow that.

1002
00:55:53,380 --> 00:55:59,219
All that is kind of not super important right now, as I said, no one ever builds this basic protocol,

1003
00:55:59,219 --> 00:56:05,699
we're just going to use that to understand the other mechanisms. But notice, even in this next mechanism,

1004
00:56:05,699 --> 00:56:10,099
we'll talk about this going to be this overhead, which is this overhead of copying data into the

1005
00:56:10,099 --> 00:56:15,299
transactions workspace, workspace. So as you saw, if you wanted to allow that read and T1 to happen,

1006
00:56:15,299 --> 00:56:19,219
if you're operating on the Thomas' right rule, I needed to make a copy of that. We'll do a lot more

1007
00:56:19,219 --> 00:56:26,019
of that in the OCC protocol. We're going to do that even more aggressively and that comes at a cost.

1008
00:56:26,659 --> 00:56:31,379
Locks have a cost, copies have a cost, right? So we're making different choices here.

1009
00:56:32,340 --> 00:56:38,579
And long running transactions can get solved and we'll move on with that.

1010
00:56:40,420 --> 00:56:45,140
The key observation, however, and this is important, why didn't we stop at locking?

1011
00:56:45,140 --> 00:56:49,300
Why are we so interested in these protocols and their properties? It's because if I have

1012
00:56:49,300 --> 00:56:54,099
transactions that are mostly short-lived, which is what happens a lot in OLTP systems, right?

1013
00:56:54,099 --> 00:56:57,619
Your shopping cart application is just going to look from all the customers and just pull up

1014
00:56:57,619 --> 00:57:03,380
your customer record. These OLTP applications, they read and write very few records. They might

1015
00:57:03,380 --> 00:57:07,940
have billions or trillions of records, but every transaction is just touching very, very small number

1016
00:57:07,940 --> 00:57:13,219
of records, reading and writing them. And so if everything is short-lived, then forcing transactions

1017
00:57:13,219 --> 00:57:16,980
even to come down with a hierarchical locking through the entire hierarchy and grabbing all those

1018
00:57:16,980 --> 00:57:22,500
locks seems like a little expensive. And these protocols that we are going to start looking,

1019
00:57:22,579 --> 00:57:28,260
as we're starting to look at now, with the timestamp and MVCC, which we'll talk about in the next class,

1020
00:57:28,260 --> 00:57:33,940
they'll perform a lot better in those cases. Now, if you have a lot of conflicts, even if I have an

1021
00:57:33,940 --> 00:57:39,300
OLTP transaction, but let's say there's a pink Barbie doll at Christmas time, and then everyone wants

1022
00:57:39,300 --> 00:57:44,659
to buy that pink Barbie doll and there's a lock you need to grab on that object for the inventory

1023
00:57:44,659 --> 00:57:48,980
count, then nothing's going to save you, right? Everything's going to just conflict. So it's not just

1024
00:57:48,980 --> 00:57:55,059
short-lived, but it's also like I'm relatively not interfering with someone else, you can allow more

1025
00:57:55,059 --> 00:57:59,460
of that parallelism to happen with these schemes and these different trade-offs you're making.

1026
00:58:01,059 --> 00:58:05,940
So the protocol we are going to now look at is the optimistic on currency control protocol,

1027
00:58:06,579 --> 00:58:11,940
and that was actually invented over here. The locking stuff happened in the 70s, late 70s,

1028
00:58:11,940 --> 00:58:17,460
and H.T. Congo was here at Carnegie Mellon and came up with this beautiful protocol. It's a

1029
00:58:17,460 --> 00:58:23,139
short paper. You'll read it in the advanced graduate level class, but even if you don't take that

1030
00:58:23,139 --> 00:58:28,019
class, just read this paper. It's so beautifully written. Like in the, some of the short papers,

1031
00:58:28,019 --> 00:58:31,940
they have everything that you need to know about this protocol is in that paper, but it's not like

1032
00:58:31,940 --> 00:58:36,980
20 pages, and every word in there matters. So if you skip a word, you'll be like, whoops, I missed

1033
00:58:36,980 --> 00:58:43,139
an important detail. And obviously, we won't go into the gory details of all of this paper, but

1034
00:58:43,139 --> 00:58:49,859
we'll get through the essence of the main parts that's in this paper. So what we will do is objects

1035
00:58:50,579 --> 00:58:56,659
are going to read stuff and they'll create the workspace, like we were starting to create that

1036
00:58:56,659 --> 00:59:02,819
object A for transaction one. We'll create a workspace where we will keep all the objects,

1037
00:59:02,819 --> 00:59:07,139
and now we'll keep in that workspace everything we read or write in the transaction.

1038
00:59:07,779 --> 00:59:14,179
Not just things that we write, okay? And you'll see examples in a second. And modifications that

1039
00:59:14,179 --> 00:59:17,859
you'll make to the transaction is all going to happen to a local workspace. So it's kind of like GitHub,

1040
00:59:17,859 --> 00:59:22,739
you check out the curve, and maybe just check out just what you need. You make all the changes there,

1041
00:59:23,059 --> 00:59:26,579
and then at some point you're going to say, I'm going to commit that back, like GitHub commit,

1042
00:59:26,579 --> 00:59:31,059
right? So it's kind of work like that. When you've checked out, there's no interference. If both you and

1043
00:59:31,059 --> 00:59:36,739
your other members of your team are working on completely separate pieces of code, and the commit

1044
00:59:36,739 --> 00:59:41,779
is all going to merge in and do just fine, right? So the ideas are like that. You're going to do

1045
00:59:41,779 --> 00:59:46,339
everything in your workspace, and then eventually you will have to write. You'll have to do that

1046
00:59:46,339 --> 00:59:52,419
final right to the master, and when you write into what is called the global database,

1047
00:59:52,419 --> 00:59:57,619
before that you go and make checks and make sure that everything is safe and correct, okay?

1048
00:59:58,419 --> 01:00:01,059
All right, so let's get going on that.

1049
01:00:01,059 --> 01:00:07,139
And today this camera is just refusing to stay focused.

1050
01:00:10,019 --> 01:00:18,820
All right, so there are three phases. Now this way the terminology is going to start to look a little

1051
01:00:18,820 --> 01:00:24,099
weird. The first phase you're going to call a read phase. It's a read phase because from the

1052
01:00:24,099 --> 01:00:30,420
global database perspective, all that each transaction is doing in the read phase is just reading stuff.

1053
01:00:31,299 --> 01:00:34,659
But in that read phase is when all the work of that transaction is going to happen. It's actually

1054
01:00:34,659 --> 01:00:38,500
going to make the changes and all of that stuff. The read write, all of that stuff is happening,

1055
01:00:38,500 --> 01:00:42,579
but happening on local copies of the database, just like you checked out your GitHub code,

1056
01:00:42,579 --> 01:00:47,380
to the GitHub repo, it just looked like you read it, right? And then it's only later on that the

1057
01:00:47,380 --> 01:00:53,299
right comes in. Similar. Now it'll go through a validation phase. In the validation phase,

1058
01:00:53,940 --> 01:00:58,900
we're going to check, is it safe for me to do the final thing which is actually make that right

1059
01:00:58,900 --> 01:01:03,780
and make all my changes from my workspace permanent. And all the changes is just going to mean the right.

1060
01:01:05,780 --> 01:01:12,579
So let's go into that with a couple with an example first. So now we have a database.

1061
01:01:13,460 --> 01:01:18,660
We have the notion of checking stuff out right into our own workspace. And we'll do that

1062
01:01:18,660 --> 01:01:22,340
unlike GitHub where you have to check out the whole repo here, we'll just start creating into a

1063
01:01:22,340 --> 01:01:28,019
workspace object as we need it. As we talked about, the transaction as it is running doesn't know

1064
01:01:28,019 --> 01:01:32,420
upfront. Everything is going to read and write. All that is just going to evolve, right? As the

1065
01:01:32,420 --> 01:01:36,659
database systems concern, it's just going to get read and write requests. It just has to make sure

1066
01:01:36,659 --> 01:01:41,619
all those requests can be done as efficiently as possible, allow as many concurrent requests and make

1067
01:01:41,619 --> 01:01:45,940
it all safe. Correctness is important, right? So same thing. We don't know what's getting checked out.

1068
01:01:45,940 --> 01:01:51,460
So that's where the GitHub analogy is now going to start breaking up, okay? So we start, we have a

1069
01:01:51,539 --> 01:01:59,780
transaction T1 starts and reads object A. Notice now in the global database, this is the main database,

1070
01:01:59,780 --> 01:02:04,740
right? There's only one timestamp with the objects, which is a right timestamp. Don't need the

1071
01:02:04,740 --> 01:02:10,659
read timestamp. So we just talked about how previously in the TO protocol, every transaction was

1072
01:02:10,659 --> 01:02:16,579
updating reads and write timestamps and that's kind of very expensive because even a reader has to

1073
01:02:16,579 --> 01:02:21,139
do that. Here now we have only one timestamp and we worry about it only on writes. So still we have

1074
01:02:21,619 --> 01:02:26,579
one more field in the object but a lot better than like was just a few slides ago.

1075
01:02:28,099 --> 01:02:34,980
So the transaction is now in the protocol going to have read and there's going to be this new thing

1076
01:02:34,980 --> 01:02:41,059
called validate and there's a write and as I said these are the protocol terms. The write is different

1077
01:02:41,059 --> 01:02:46,099
than the w of a which is the right to the object. The red stuff is the steps in the transaction. So

1078
01:02:46,099 --> 01:02:51,299
don't confuse that right with the right of a. As I said we are retaining the names from the

1079
01:02:51,299 --> 01:02:55,860
original terminology in that paper but hopefully you get that right. It's just the right phase of

1080
01:02:55,860 --> 01:03:03,699
the protocol, hence shown in a different color in different parts. Okay? So read and as soon as you

1081
01:03:03,699 --> 01:03:09,940
start that read stuff you create a workspace which is empty and you'll read into that the object

1082
01:03:09,940 --> 01:03:15,139
A. So A has a value of 123 and you're going to pull that in. You can think of this workspace as

1083
01:03:15,139 --> 01:03:20,819
being organized as a key value store right. Yes the object and the value is whatever it is plus

1084
01:03:20,819 --> 01:03:29,059
the right time stamp and so now it is it is zero then t j starts and now notice I don't have t1

1085
01:03:29,059 --> 01:03:35,619
and t2. I'm calling it ti and tj because whether i comes before j or j comes before i we're going to

1086
01:03:35,619 --> 01:03:44,019
decide in a little bit right. So now we are using variables and then t2 comes in it's grabbing from

1087
01:03:44,019 --> 01:03:50,659
the master database that same stuff doing its thing and at some point it reaches the validate phase

1088
01:03:50,659 --> 01:03:56,420
and the validated phase it says and what do I need to do with my stuff and it'll look at its time

1089
01:03:56,420 --> 01:04:00,739
stamp I'll talk about the protocol in a little bit and it'll look at its time stamp and at that

1090
01:04:00,739 --> 01:04:06,980
point it's going to grab the time stamp. So till now it's as if ti and tj are babies they were born

1091
01:04:06,980 --> 01:04:12,500
without a name and now we assign them a name and that name is a number and that decides the order.

1092
01:04:13,460 --> 01:04:18,260
Okay so we delayed it we delayed assigning that number because we are trying to be optimistic

1093
01:04:18,260 --> 01:04:23,460
optimistic protocol philosophically says compared to the pessimistic protocol saying I think life is

1094
01:04:23,460 --> 01:04:28,739
good most transactions won't interfere with each other so let them keep doing their stuff if I pick

1095
01:04:28,739 --> 01:04:35,860
ti and tj's give proper names right up front then I'm giving myself less room to go and allow

1096
01:04:35,860 --> 01:04:40,340
parallelism and I'll just leave that as a statement you have to read the paper or take the advanced

1097
01:04:40,340 --> 01:04:44,579
database class to really understand that and I'll leave this a tidbit in fact you could delay this

1098
01:04:44,579 --> 01:04:49,780
even further even not at the end of read phase you could delay till the end of the right phase

1099
01:04:49,780 --> 01:04:53,940
and you could say readers I don't even give you a number so it says if your ghost transaction never

1100
01:04:53,940 --> 01:04:58,820
happened didn't interfere with everyone you could just go ahead so it's like very cool tricks you

1101
01:04:58,820 --> 01:05:03,460
can play while still maintaining correctness with when you assign these transaction numbers when do

1102
01:05:03,460 --> 01:05:08,500
you name your transactions when you give them the names which are numbers in a case so you assign that

1103
01:05:08,500 --> 01:05:15,539
the name now it does a write and when it does the write and commit so that write will happen in

1104
01:05:15,539 --> 01:05:22,659
its workspace and then finally it will get committed t2 will do its right do its own sorry that

1105
01:05:22,659 --> 01:05:27,780
right stuff over here was that right phase which had nothing to do in this case because all it did

1106
01:05:27,780 --> 01:05:33,940
was a read only transaction t2 actually has a right right right to an object and so notice what

1107
01:05:33,940 --> 01:05:39,619
happens to the timestamp in the local copy it sets it to infinity it doesn't have a name yet it

1108
01:05:39,619 --> 01:05:44,500
doesn't have that number yet so infinity says something in the future this is think of the

1109
01:05:44,500 --> 01:05:50,019
right time stamp is saying it's valid till infinity for now and then it actually gets a number let's say

1110
01:05:50,019 --> 01:05:56,659
it is two it puts that and then finally two becomes a permanent copy in the global database validate

1111
01:05:56,659 --> 01:06:02,340
checks that am I safe to go or not and if it says safe that's when it goes forward all right

1112
01:06:02,579 --> 01:06:08,660
so sound like a lot of stuff which is actually super simple remember I told you about 30 minutes ago

1113
01:06:08,660 --> 01:06:18,660
saying if you really understand dependence e graphs and anomalies the WRW and RW and you can really

1114
01:06:18,660 --> 01:06:24,260
picture that as happening as you do any protocol it will be super easy to understand that so if you

1115
01:06:24,260 --> 01:06:29,059
the first time I read the OCC protocol the first five times I read it I found it super complicated

1116
01:06:29,539 --> 01:06:34,579
and you kind of get it but you don't get it and you miss certain corner cases till I drew the

1117
01:06:34,579 --> 01:06:39,299
pictures which I'm going to show you next and then it just became super clear so before we get

1118
01:06:39,299 --> 01:06:44,659
into the pictures the main thing is in the read phase we are now going to keep these local copies

1119
01:06:45,299 --> 01:06:51,460
and in these local copies we are going to do all of our rights and the dbms will copy all the

1120
01:06:51,460 --> 01:06:55,860
topple the transaction accesses from the shared space to the works base it's kind of like the

1121
01:06:55,860 --> 01:07:00,980
checkout system right if you're checking out just a file or a directory and for now we will ignore

1122
01:07:01,620 --> 01:07:07,700
what happens if these region rights to records happen via indices and we will actually not cover

1123
01:07:07,700 --> 01:07:14,340
that at all for optimistic methods in this class at all so just assume how do I get to object x if

1124
01:07:14,340 --> 01:07:18,420
I'm coming through an index or updating an index all of that stuff you're just going to brush

1125
01:07:18,420 --> 01:07:24,099
under the covers but these things all work with that that's all I need you to know okay all right so

1126
01:07:25,059 --> 01:07:30,259
where are these pictures that I've been promising so we're going to optimistic concurrency control

1127
01:07:30,259 --> 01:07:35,779
works in three phases read is where I'm going to do all my work in my local copies check out from

1128
01:07:35,779 --> 01:07:41,380
the database only the objects I touched you then read and write and then I will enter the validation

1129
01:07:41,380 --> 01:07:47,779
phase and for the purpose of this of course we are saying at the end of the read phases when I get

1130
01:07:47,780 --> 01:07:55,300
named I get my transaction number then in the validation phase I'm going to check do I violate if

1131
01:07:55,300 --> 01:08:02,100
I take what I've checked out and if I put it back am I going to cause some violation of the serial

1132
01:08:02,100 --> 01:08:07,540
schedule that we are all trying to achieve I have a number now so I know when I belong in that order

1133
01:08:07,540 --> 01:08:11,540
am I going to cost trouble and if I think I'm going to cost trouble I'll back out of it and abort

1134
01:08:12,420 --> 01:08:17,539
okay and if not I'll go to the right phase where I'll make add my changes happen in this

1135
01:08:17,539 --> 01:08:24,659
global database so time proceeds this way transactions life now is defined is broken up into three

1136
01:08:24,659 --> 01:08:30,739
phases T1 starts does a read phase where even the rights are happening in the local works phase

1137
01:08:30,739 --> 01:08:35,539
then the validation phase and then finally does the right phase okay so every transaction will have

1138
01:08:35,539 --> 01:08:39,539
those three phases the main work of the transaction is all happening in that read phase right the other

1139
01:08:39,539 --> 01:08:45,619
stuff is all the concurrency controls so if T2 starts and does its three phases after that no problem

1140
01:08:45,619 --> 01:08:52,340
right there's no conflict trouble starts when you have things like this T3 which started at some

1141
01:08:52,340 --> 01:09:00,340
point compared to T2 T3 started before and these T3s are not numbers 3 is not a number now right it's

1142
01:09:00,340 --> 01:09:05,380
just a just a logical name we haven't given it a real name just yet so I probably should have

1143
01:09:05,380 --> 01:09:16,819
called it ij and k so T3 has started here and then its read phase is done way later T1 started did

1144
01:09:16,819 --> 01:09:20,900
all of that stuff is in the validation phase may have done other things with it so it's these kinds

1145
01:09:20,900 --> 01:09:26,340
of things that we want to make safe okay so how do we make that safe and again the transactions are

1146
01:09:26,340 --> 01:09:33,619
signed at the end of the read phase the paper is beautiful because it says you have to worry only

1147
01:09:33,619 --> 01:09:41,059
about three things three checks okay for every pair of transactions that you're considering if

1148
01:09:41,059 --> 01:09:45,460
anyone of these checks passes those those two pairs of transactions are done apply these three

1149
01:09:45,460 --> 01:09:50,180
conditions to all the transactions and you are basically done so what are these three conditions

1150
01:09:50,739 --> 01:09:56,819
either one of them holds mis means that pair of transactions say so I've got ti and tj and let's say

1151
01:09:56,819 --> 01:10:03,220
i is before j so we have saying I want to assign i as being ahead of j in the serial schedule

1152
01:10:03,220 --> 01:10:08,980
don't make sure all of i stuff happens before j so pictorially it looks like that right if I say

1153
01:10:08,980 --> 01:10:14,980
i and j i happens before j and if all of ti happened before tj this is trivially safe

1154
01:10:15,619 --> 01:10:23,619
ti completely got done before ti completely got done before tj and I'm totally fine and it's

1155
01:10:23,619 --> 01:10:31,140
defined in the paper as saying the right phase of ti is completed before tj starts its read phase

1156
01:10:31,140 --> 01:10:38,340
very precise definition okay that means there's no overlap and it's all safe and no conflicts because

1157
01:10:38,340 --> 01:10:44,660
you can think about all all the changes in i happening before j slightly more complicated which is

1158
01:10:44,660 --> 01:10:54,660
condition number two that condition is where ti completes its right phase before ti starts its

1159
01:10:54,659 --> 01:11:01,139
right phase tj so tj could have as you can see in this example have started to read stuff that

1160
01:11:02,099 --> 01:11:09,139
ti is writing because the right phase of ti and the read phase of tj overlaps okay so we'll

1161
01:11:09,139 --> 01:11:15,859
disallow this by having a very simple check I look at the right set of ti and the read set of tj

1162
01:11:16,899 --> 01:11:22,899
if they don't conflict there's nothing in common then I will declare these are safe these two

1163
01:11:22,899 --> 01:11:30,339
transactions are safe the last hardest case is there is a bunch of overlap and the more precise

1164
01:11:30,339 --> 01:11:36,979
condition is ti completes its read phase before tj starts its read phase you're just seeing i before j

1165
01:11:38,099 --> 01:11:43,619
okay that's all this is saying everything else every other type of overlap is allowed and there's a

1166
01:11:43,619 --> 01:11:49,299
check that says check the right set of i and read set of j don't overlap which is the same condition

1167
01:11:49,300 --> 01:11:55,060
from the previous slide you can verify later and that the right sets of these two transactions don't

1168
01:11:55,060 --> 01:12:01,460
conflict and if so I can tell you it is safe now this sounds magical you give me three rules and you

1169
01:12:01,460 --> 01:12:07,619
telling me that we got serializable schedule and this is where it takes a long time to understand that

1170
01:12:07,619 --> 01:12:13,300
and this is the master picture put it like that case one case two case three can be thought of in

1171
01:12:13,300 --> 01:12:18,180
the following ways I just took exactly the same condition as before and remember case one said

1172
01:12:18,180 --> 01:12:22,420
right phase of i is done before read phase starts I just did that there's a black transaction and

1173
01:12:22,420 --> 01:12:28,100
a blue transaction and the red line just says that red is the condition that ht con had in those three

1174
01:12:28,100 --> 01:12:34,579
conditions now why is this working out and we are saying if any transaction either satisfy

1175
01:12:34,579 --> 01:12:40,420
case one they find or satisfy case two it's fine it's not and any one of these checks if two pairs

1176
01:12:40,420 --> 01:12:46,740
of transactions pass they are safe with each other okay so why is this true as I told you all

1177
01:12:46,739 --> 01:12:53,460
these think of dependency graph reanormally that cause arcs read right right read right right

1178
01:12:54,420 --> 01:13:01,460
case number one trivially says none of those happen because the everything in i is happening before j

1179
01:13:01,460 --> 01:13:07,059
so all those dependencies are taken care of because i is less than j we've given these names and they

1180
01:13:07,059 --> 01:13:13,699
mean something this means for every transaction read followed by right is taken care of by that very

1181
01:13:13,699 --> 01:13:23,139
nature of i and j right the other part is where we run into trouble now space number two is slightly

1182
01:13:23,139 --> 01:13:31,139
more general than case number one and but the right phase of p j only starts later so right

1183
01:13:31,139 --> 01:13:38,099
right dependencies are taken care of right because of the red arrow that establishes the condition

1184
01:13:38,099 --> 01:13:42,899
using right right happens in this way that's the part of the condition and so the only thing you

1185
01:13:42,899 --> 01:13:48,899
can't check which we have to do some more work for is the read set and the right set and that gives

1186
01:13:48,899 --> 01:13:55,299
me my WR dependency and if it's empty i don't have any arc of the WR type so life is good

1187
01:13:57,139 --> 01:14:01,379
and now you can see how the other part is saying i couldn't even tell that i couldn't even tell

1188
01:14:01,379 --> 01:14:06,899
that so i had to do both of those checks and that becomes the basis for doing optimistic concurrency

1189
01:14:07,859 --> 01:14:17,139
okay questions it's actually a beautiful protocol yes you're checking out these copies for which

1190
01:14:17,139 --> 01:14:25,539
there's a cost but these three conditions cover everything and you check those and you've got

1191
01:14:25,539 --> 01:14:35,699
a protocol that is correct could i explain the right right case for case two the case two the

1192
01:14:35,699 --> 01:14:40,819
condition in that if you go back to slides that was implicit in the definition of the condition

1193
01:14:41,539 --> 01:14:48,179
so case two said ti completes its right phase before tj so in the protocol what happens is that

1194
01:14:48,179 --> 01:14:53,939
when you're in the validation phase you'll check i am this transaction everyone else who's active

1195
01:14:53,939 --> 01:14:59,220
with me for them i will check each pair and for each pair i will see one of these cases passes

1196
01:14:59,220 --> 01:15:05,139
this is a if condition that says i know for this pair that the right phase of i completes before t

1197
01:15:05,140 --> 01:15:10,579
j starts its right phase so it's the condition right so it's that if an else statement that you're

1198
01:15:10,579 --> 01:15:15,140
checking you're checking these three cases in that pairs of transaction checks that you're making

1199
01:15:16,260 --> 01:15:22,900
okay so it is a said it's it's or right so one of these has to hold to it and in the worst case

1200
01:15:22,900 --> 01:15:28,180
you are always hitting case three in which case you have to do all these right right set read set

1201
01:15:28,180 --> 01:15:34,579
and right right set checks how to do that checks is let's leave it aside it's set containment which

1202
01:15:34,579 --> 01:15:41,140
you have to do efficiently but there are algorithms for doing that okay set intersection in this case

1203
01:15:41,140 --> 01:15:56,260
sorry yep yeah all of this is happening doing the validation phase up it's it's in the think about

1204
01:15:56,260 --> 01:16:02,899
it as a happening for ti and tj but the why am I hesitating with giving you an answer for simplicity

1205
01:16:02,899 --> 01:16:08,979
you can assume all of this is happening for tj ti for ti it's it's symmetric in the sense when you

1206
01:16:08,979 --> 01:16:14,179
are assigning these eyes and j's is delayed but it won't matter when it is happening you're just

1207
01:16:14,179 --> 01:16:17,699
saying if i'm going to make a decision with everything else that is active i need to make sure this

1208
01:16:17,699 --> 01:16:27,299
applies

1209
01:16:27,380 --> 01:16:34,820
your failure to read and the other side but the reads overlap they are all happening to the local

1210
01:16:34,820 --> 01:16:40,500
copy right so when the reads are happening the right set and read set they are see this

1211
01:16:40,500 --> 01:16:44,340
where the read terminology is like what is that read mean in the read phase is we are creating the

1212
01:16:44,340 --> 01:16:49,860
read set and the right set so that read phase is where all the work is happening and these right

1213
01:16:49,860 --> 01:16:54,340
and read sets are getting created so they could overlap and that's fine it only matters when they

1214
01:16:54,340 --> 01:17:01,539
are trying to write that you have to start worrying about things does that make sense no or you

1215
01:17:01,539 --> 01:17:16,980
ask something else if they overlap then you will have you will have to go and eventually one of them

1216
01:17:16,980 --> 01:17:22,020
is going to so let's say they overlap then it's one of them is going to read the right phase before

1217
01:17:22,020 --> 01:17:26,420
the other one reaches the right phase right so you then hit case number two where you have to go

1218
01:17:26,420 --> 01:17:30,900
check the right phase dependency see between any pair of transactions you have to check all these

1219
01:17:30,900 --> 01:17:35,700
conditions and say can I determine it is to be safe right if you can determine if any of these

1220
01:17:35,700 --> 01:17:40,820
conditions don't hold then the the transaction that's trying to check will abort itself and then

1221
01:17:40,820 --> 01:17:45,220
go back again and start to do things hold on let me just make sure that got answered

1222
01:17:45,380 --> 01:17:53,539
okay so I think the confusion is coming about like how can you convince me that there are only

1223
01:17:53,539 --> 01:17:58,260
these three cases and no other cases right is that the question you are asking yeah yeah yeah okay so

1224
01:17:58,260 --> 01:18:04,579
the simple answer is that if you try to construct any other case and we can take this offline it will

1225
01:18:04,579 --> 01:18:09,060
end up these are the checks that you have to do to declare safety if you can't do any of these

1226
01:18:09,060 --> 01:18:14,340
safety checks you don't know about that but the transactions because they'll enter the right phase

1227
01:18:14,340 --> 01:18:18,980
in a certain way let me just talk about the serial protocols because and I'll come back to that

1228
01:18:18,980 --> 01:18:24,900
question if it's not I know there's a question on the table this is all related to I've only

1229
01:18:24,900 --> 01:18:28,180
talked about the read phase where you're creating the read right set then the validation phase where

1230
01:18:28,180 --> 01:18:32,100
we do these checks that is this right phase where everyone's getting stuck on but that's the next

1231
01:18:32,100 --> 01:18:39,220
lie so the question is like how do I do these rights so the simplest protocol is something called

1232
01:18:39,220 --> 01:18:44,020
serial comment only one transaction is allowed to be in the right phase at a given point in time

1233
01:18:44,820 --> 01:18:50,020
so that is why case number two will not ever have a right right overlaps you try to arrange anything

1234
01:18:50,020 --> 01:18:55,220
cases it's gonna boil down to that right so if I say look all of these questions are coming because

1235
01:18:55,220 --> 01:18:59,060
oh what happens if I have some overlap that I haven't thought of that will all boil down to say

1236
01:18:59,060 --> 01:19:05,539
am I allowing the right phase to be overlap with each other in some way okay now the first version

1237
01:19:05,539 --> 01:19:12,100
of the protocol in there says that I will grab a latch and only one transactions allowed to go

1238
01:19:12,100 --> 01:19:14,979
into the right phase when they go into the right phase they do all their rights to the global

1239
01:19:14,979 --> 01:19:19,140
database it's like only a lot one person to commit to the master repo in others who have to commit

1240
01:19:19,140 --> 01:19:25,220
have to wait you can't have parallel commits and that's the serial protocol obviously that is

1241
01:19:25,220 --> 01:19:28,819
slow in that right phase but there's a parallel protocol which I won't talk about I'll just

1242
01:19:28,819 --> 01:19:34,340
unmute to that high level because it takes an hour to get through so let me just put a pin on that

1243
01:19:34,340 --> 01:19:39,140
and hopefully that clarifies the confusion and and happy to take questions offline if you need to

1244
01:19:40,980 --> 01:19:43,220
take over to the strong of case name yeah

1245
01:19:55,380 --> 01:19:58,980
yeah yeah I think I have my diagram wrong over here yeah I will go fix that yep you're right

1246
01:19:58,979 --> 01:20:03,939
slide number 25 is wrong is the one I spend like three hours on this is correct yeah

1247
01:20:05,619 --> 01:20:11,619
yeah thank you good catch okay good

1248
01:20:13,859 --> 01:20:22,019
what do you think you think I need to use the i and tb you should be and it's because like I'm

1249
01:20:22,019 --> 01:20:25,779
telling you that the serial commit protocol is in place right so I didn't tell you that that

1250
01:20:26,420 --> 01:20:31,460
until now that's why you're coming up with cases where it won't hold but that's what gets you

1251
01:20:31,460 --> 01:20:36,259
in place so the hand-viving stuff I'm going to say is that you can actually do better than the serial

1252
01:20:36,259 --> 01:20:40,579
protocol using something called the parallel commit protocol where you can actually allow parallelism

1253
01:20:40,579 --> 01:20:45,139
but its behavior is going to be identical to the serial stuff and it's a whole section in the paper

1254
01:20:45,139 --> 01:20:50,579
that talks about that and and we'll have to defer that to the advanced database class okay so

1255
01:20:51,140 --> 01:20:55,859
all right I'm gonna stop here since I know I'm a little bit over time already and then pick up

1256
01:20:55,859 --> 01:21:00,100
from slide 29 in the next class all right thank you

1257
01:21:20,659 --> 01:21:26,659
28 a gram depending on if it's good huh you ain't hit them all yet still got your sugar I smacked you with

1258
01:21:26,659 --> 01:21:31,300
the bottom of the chip to tell you look up show me what it's safe set for a blow your face back

1259
01:21:31,300 --> 01:21:36,500
I got a block on taps the feds can't trace that style is like temp a poop you can't lace that

1260
01:21:36,500 --> 01:21:42,100
the Dominican oh you got call me Dominican black scally black love a black swate dimmelins my

1261
01:21:42,100 --> 01:21:46,579
whole black dirty eight is sent you to the perigates you get the zombie trying to skate and that's

1262
01:21:46,579 --> 01:21:51,300
your first mistake I ain't lying for that take your family see you wait my grand's is happy wait

1263
01:21:51,300 --> 01:21:54,979
the Randall every state when they acting how I'm living I tell them I'm living great

