---
title: CMU15445 P4F202303 DatabaseStoragePart1
---

1
00:00:00,000 --> 00:00:22,460
Music

2
00:00:22,460 --> 00:00:29,460
Alright, DJ TPL.

3
00:00:29,460 --> 00:00:32,700
Thank you.

4
00:00:32,700 --> 00:00:34,859
I heard a wild rumor.

5
00:00:34,859 --> 00:00:37,859
I heard he used to date Larry Allison's girlfriend.

6
00:00:37,859 --> 00:00:41,659
Oh, you heard that?

7
00:00:41,659 --> 00:00:44,659
What are you?

8
00:00:44,659 --> 00:00:45,659
What happened?

9
00:00:45,659 --> 00:00:46,659
He stole it from you?

10
00:00:46,659 --> 00:00:47,659
Man, you guys.

11
00:00:47,659 --> 00:00:48,659
Alright.

12
00:00:48,659 --> 00:00:56,979
Alright, we'll come back to that later.

13
00:00:56,979 --> 00:00:58,579
Larry Allison is the founder oracle.

14
00:00:58,579 --> 00:01:01,459
He is the fifth richest person in the world.

15
00:01:01,459 --> 00:01:03,459
He owns a Hawaiian island.

16
00:01:03,459 --> 00:01:05,379
All paid for by databases.

17
00:01:05,379 --> 00:01:07,459
That's why this class exists.

18
00:01:07,459 --> 00:01:08,459
Alright.

19
00:01:08,459 --> 00:01:10,739
So I'm administrative stuff.

20
00:01:10,739 --> 00:01:15,739
So the homework one, we do this coming Sunday on a 10th.

21
00:01:15,739 --> 00:01:17,340
Project Zero is also doing the 10th.

22
00:01:17,340 --> 00:01:20,340
Who here is not started Project Zero?

23
00:01:20,340 --> 00:01:22,140
One, why not?

24
00:01:22,140 --> 00:01:24,140
Two.

25
00:01:24,140 --> 00:01:26,740
Do you know C++?

26
00:01:26,740 --> 00:01:27,740
That's a no.

27
00:01:27,740 --> 00:01:29,939
Do you know C++?

28
00:01:29,939 --> 00:01:36,140
You should really start because if you know 0 C++, it will be a struggle.

29
00:01:36,140 --> 00:01:38,540
And again, we're not trying to do this to torture you.

30
00:01:38,540 --> 00:01:41,700
It's really meant to be like, this is what the rest of the course is going to be like

31
00:01:41,700 --> 00:01:43,100
in terms of the projects.

32
00:01:43,100 --> 00:01:47,140
If you don't know how to write C++ and don't have to debug it, you're going to have problems.

33
00:01:47,140 --> 00:01:51,460
Print F or standard C out is not a debug method.

34
00:01:51,460 --> 00:01:52,460
Okay?

35
00:01:52,460 --> 00:01:54,659
You know, you want to use a debugger.

36
00:01:54,659 --> 00:01:56,460
And then Project One will be released.

37
00:01:56,460 --> 00:02:00,540
If we suppose to go out today, probably will come out Friday.

38
00:02:00,540 --> 00:02:03,980
And that will be on the buffer pool, which we'll start teaching in a week and a half.

39
00:02:03,980 --> 00:02:04,980
Okay?

40
00:02:04,980 --> 00:02:07,980
Any questions about homework one or Project Zero?

41
00:02:07,980 --> 00:02:08,979
Okay.

42
00:02:08,979 --> 00:02:12,500
Alright, jump into the material.

43
00:02:12,500 --> 00:02:18,379
So last class, we spent time talking about SQL and the modern things you can do with

44
00:02:18,379 --> 00:02:22,900
the CTEs, lateral joins, nested queries, wind of functions, so forth.

45
00:02:22,900 --> 00:02:26,500
Prior to that, we talked about the relational model and relational algebra.

46
00:02:26,500 --> 00:02:31,979
And so at this point, that's the logical view of what the database system is going to look

47
00:02:31,979 --> 00:02:32,979
like that.

48
00:02:32,979 --> 00:02:35,939
We're going to sort of mentally construct throughout the rest of the semester.

49
00:02:35,939 --> 00:02:39,060
So we're not going to go back to these discuss these things, but we'll see how we need to

50
00:02:39,060 --> 00:02:40,979
know what SQL looks like what relational model is.

51
00:02:40,979 --> 00:02:45,060
In order to build the various parts of the system, we'll be discussing going forward.

52
00:02:45,060 --> 00:02:49,339
So as I said at the end of last class, this point forward and the semester going forward,

53
00:02:49,339 --> 00:02:54,659
up and around Thanksgiving is going to be how to build a sort of a classic or canonical

54
00:02:54,659 --> 00:02:58,939
database, relational database management system.

55
00:02:58,939 --> 00:03:04,939
So the outline for going forward, we've already discussed what relational databases are.

56
00:03:04,939 --> 00:03:09,859
But the first four topics here is storage, execution, concurrency, go to recovery.

57
00:03:09,860 --> 00:03:18,300
These are the aspects you would need to have to build a full-featured, safe, reliable database

58
00:03:18,300 --> 00:03:19,780
management system.

59
00:03:19,780 --> 00:03:24,700
And we'll assume it's going to run on a single node, because it makes our life easier.

60
00:03:24,700 --> 00:03:26,580
Don't go to distribute until you have to.

61
00:03:26,580 --> 00:03:31,100
And then once we understand what a single node database system looks like, we'll then discuss

62
00:03:31,100 --> 00:03:33,860
how to expand this and do distributed databases.

63
00:03:33,860 --> 00:03:37,420
And at the end of the semester, we'll talk a little bit also to about how what other additional

64
00:03:37,420 --> 00:03:39,820
features and optimizations we can apply.

65
00:03:39,819 --> 00:03:44,819
Which then will be a segue into the advanced class if you want to take that in the spring.

66
00:03:44,819 --> 00:03:48,859
So the way to think about a database management system and the way the course is laid out

67
00:03:48,859 --> 00:03:51,340
is a bunch of layers.

68
00:03:51,340 --> 00:03:54,019
And the different layers are going to provide different functionality to capabilities

69
00:03:54,019 --> 00:03:56,060
for the database system.

70
00:03:56,060 --> 00:04:00,419
And they're going to expose an API to whatever the layer is above it.

71
00:04:00,419 --> 00:04:04,740
And the topics we've discussed again, basically how to construct those layers, put them all

72
00:04:04,740 --> 00:04:07,939
together, and have a full-featured database management system.

73
00:04:07,939 --> 00:04:12,699
So the way to think about it is that the most simple view point would be the application

74
00:04:12,699 --> 00:04:15,939
comes along and they're going to issue a SQL query.

75
00:04:15,939 --> 00:04:18,300
And that's going to first show up and get parsed.

76
00:04:18,300 --> 00:04:20,300
The string of text of the SQL query is parsed.

77
00:04:20,300 --> 00:04:23,259
We're going to run through the query optimizer.

78
00:04:23,259 --> 00:04:25,860
Below that, then we'll start executing whatever the query plan is.

79
00:04:25,860 --> 00:04:31,980
The B access methods to actually talk to the tables or indexes or whatever trying to access.

80
00:04:31,980 --> 00:04:35,699
There'll be a buffable manager to manage the memory for our database system.

81
00:04:35,699 --> 00:04:39,500
And then at the lowest level, it'll be a disk manager that'll be responsible for reading

82
00:04:39,500 --> 00:04:42,379
writing data to disk.

83
00:04:42,379 --> 00:04:47,300
And so today's class, we're going to start getting the semester, return to the bottom,

84
00:04:47,300 --> 00:04:49,139
and then work our way up.

85
00:04:49,139 --> 00:04:52,379
When we get to something like a current general recovery, that's going to permeate throughout

86
00:04:52,379 --> 00:04:53,379
the entire system.

87
00:04:53,379 --> 00:04:55,699
So we're going to have to come back and revisit all these things.

88
00:04:55,699 --> 00:04:59,939
Like, when we're running transactions, we need to know what's on disk.

89
00:04:59,939 --> 00:05:05,379
We need to know what we're accessing, how we're accessing it, what queries we're executing.

90
00:05:05,379 --> 00:05:09,180
So the storage execution will get us through the entire stack.

91
00:05:09,180 --> 00:05:11,939
And then we'll come back and touch it all over again.

92
00:05:11,939 --> 00:05:12,939
That sounds weird.

93
00:05:12,939 --> 00:05:17,180
We'll look at it all over again when we talk about concurrent general recovery.

94
00:05:17,180 --> 00:05:18,939
And it's saying we're going to distribute a database.

95
00:05:18,939 --> 00:05:23,980
We have to know about all these things in order to build a full reliable, safe, distributed

96
00:05:23,980 --> 00:05:24,980
database system.

97
00:05:24,980 --> 00:05:25,980
Okay?

98
00:05:25,980 --> 00:05:28,939
All right.

99
00:05:28,939 --> 00:05:34,180
So for the system, we're going to discuss the methods we're going to discuss this semester.

100
00:05:34,180 --> 00:05:37,780
We're going to assume that the architecture of what we're trying to build, again, think

101
00:05:37,780 --> 00:05:40,620
it conceptually, we're going to construct in our minds a daily, daily system.

102
00:05:40,620 --> 00:05:42,500
And bus hub is one implementation of this.

103
00:05:42,500 --> 00:05:46,060
We're going to assume we're building what is called a disk-based database system, or a

104
00:05:46,060 --> 00:05:48,699
disk-oriented architecture.

105
00:05:48,699 --> 00:05:52,740
And this is where the database minimum system itself is going to assume that the primary

106
00:05:52,740 --> 00:05:56,899
storage location of the database is going to be on some non-volatile disk.

107
00:05:56,899 --> 00:06:00,340
It could be an SSD, a spending disk hard drive.

108
00:06:00,340 --> 00:06:02,220
If you're running in the cloud, it could be S3.

109
00:06:02,220 --> 00:06:06,100
But we're assuming that it's going to be disk-based.

110
00:06:06,100 --> 00:06:09,860
And all the things we're going to build in our database-minute system are really designed

111
00:06:09,860 --> 00:06:17,980
to now coordinate or orchestrate the movement of data back and forth from disk into memory.

112
00:06:17,980 --> 00:06:19,980
This should not be news for anyone.

113
00:06:19,980 --> 00:06:24,620
This is the classic, bond-normen architecture where the data is at rest on disk.

114
00:06:24,620 --> 00:06:26,940
We can't operate it unless we bring it into memory.

115
00:06:26,940 --> 00:06:29,620
And then the CPU can do whatever it needs to.

116
00:06:29,620 --> 00:06:33,220
And this is the overall theme of what we're trying to build.

117
00:06:33,220 --> 00:06:35,220
And this is obviously going to be super hard.

118
00:06:35,220 --> 00:06:38,939
And if you're an application developer, you don't want to be doing this yourself in your

119
00:06:38,939 --> 00:06:40,620
application code.

120
00:06:40,620 --> 00:06:44,379
You want a database system that knows how to do this reliably and safely and correctly

121
00:06:44,379 --> 00:06:49,459
and efficiently to do it for you.

122
00:06:49,459 --> 00:06:54,660
So the way to think about what storage looks like from our perspective as a database system

123
00:06:54,660 --> 00:06:56,259
is in terms of this hierarchy.

124
00:06:56,259 --> 00:06:59,819
You might have seen this in other classes or other textbooks.

125
00:06:59,819 --> 00:07:06,019
And the way to think about this is that going from the bottom to the top, the storage devices

126
00:07:06,019 --> 00:07:10,699
are going to get faster, but smaller and more expensive.

127
00:07:10,699 --> 00:07:14,339
So at the bottom layer here, you have something like network storage.

128
00:07:14,339 --> 00:07:16,819
This would be like EBS or S3.

129
00:07:16,819 --> 00:07:19,300
I think in the textbook, there's a layer below this.

130
00:07:19,300 --> 00:07:24,339
I think we have tape drives, but nobody runs data systems all those anymore.

131
00:07:24,339 --> 00:07:28,339
But as you go up after network storage and you have a locally attached spinning disk

132
00:07:28,339 --> 00:07:31,060
hard drive, and then you have maybe like an SSD.

133
00:07:31,060 --> 00:07:35,699
And then after that, you have DRAM and CPU cashes and then now CPU registers.

134
00:07:35,699 --> 00:07:37,539
CPU registers are super fast.

135
00:07:37,539 --> 00:07:42,779
It's the fastest kind of storage you can have, but we're talking you have maybe 32 registers

136
00:07:42,779 --> 00:07:43,779
on your CPU.

137
00:07:43,779 --> 00:07:46,219
And each one's going to be 64 bits.

138
00:07:46,219 --> 00:07:50,299
You can't store a lot of space in there, store a lot of things in there.

139
00:07:50,299 --> 00:07:53,019
But they're going to be super fast.

140
00:07:53,019 --> 00:07:57,539
So from our perspective in this semester, the only thing we really care about is this division

141
00:07:57,539 --> 00:07:59,139
line here.

142
00:07:59,139 --> 00:08:01,299
And that's between volatile and non-volatile storage.

143
00:08:01,299 --> 00:08:03,500
Obviously, what does volatile mean?

144
00:08:03,500 --> 00:08:06,620
We have volatile storage.

145
00:08:06,620 --> 00:08:07,620
What's that?

146
00:08:07,620 --> 00:08:11,419
Yeah, it says data's going when you, when you've power is going on.

147
00:08:11,419 --> 00:08:15,620
You pull the plug on your DRAM or your CPU registers, like everything gets wiped out.

148
00:08:15,620 --> 00:08:18,259
When you boot the system back up, nothing's still there.

149
00:08:18,259 --> 00:08:23,379
And volatile basically means that you write data to the device and assuming that you make

150
00:08:23,379 --> 00:08:28,339
the right calls to tell it to get flushed or you get back an announcement, we'll cover

151
00:08:28,339 --> 00:08:29,339
that later.

152
00:08:29,339 --> 00:08:32,580
Then we assume that data is going to be persistent.

153
00:08:32,580 --> 00:08:37,100
And that no matter if we restart the system, pull the power, take the machine out, put it

154
00:08:37,100 --> 00:08:40,659
into another location, whatever, when we come back that our data will be there.

155
00:08:40,659 --> 00:08:43,620
Of course, database systems, we don't trust the hardware.

156
00:08:43,620 --> 00:08:44,620
We don't trust the OS too.

157
00:08:44,620 --> 00:08:45,620
We'll get that in a second.

158
00:08:45,620 --> 00:08:46,620
We don't trust any of the ***.

159
00:08:46,620 --> 00:08:50,259
We're going to do much extra stuff to make sure that if we write stuff, maybe we write

160
00:08:50,259 --> 00:08:52,700
to multiple locations or we write a backup for it, right?

161
00:08:52,700 --> 00:08:56,820
The bunch of things we'll do to make sure that we, we truly get non-volatile storage.

162
00:08:56,820 --> 00:09:02,539
But from the design of the architecture itself, we'll assume that it's, you know, it's

163
00:09:02,539 --> 00:09:05,379
volatile versus non-volatile.

164
00:09:05,379 --> 00:09:09,139
Another key difference we're going to see between volatile and non-volatile is how we can

165
00:09:09,139 --> 00:09:10,899
access the data.

166
00:09:10,899 --> 00:09:14,980
So non-volatile storage will be considered to be bite addressable.

167
00:09:14,980 --> 00:09:15,980
Because that means.

168
00:09:15,980 --> 00:09:19,980
It's creating each individual bite.

169
00:09:19,980 --> 00:09:22,820
It says you can query each individual bite, correct.

170
00:09:22,820 --> 00:09:23,820
Yeah.

171
00:09:23,820 --> 00:09:26,019
So let's say I have a 1 megabyte file.

172
00:09:26,019 --> 00:09:32,899
If I want the, I want to get 64 bits at some random offset, I can do that in memory.

173
00:09:32,899 --> 00:09:33,899
There's cache lines.

174
00:09:33,899 --> 00:09:36,820
It's not exactly true, but for now we can ignore that.

175
00:09:36,820 --> 00:09:41,700
In a non-volatile storage, like thinking of it as SSD, you can't go get exactly 64 bits

176
00:09:41,700 --> 00:09:43,379
in a 1 megabyte file.

177
00:09:43,379 --> 00:09:47,539
So that way we get the block that that, that 64 bits is in, bring that in a memory and

178
00:09:47,539 --> 00:09:49,139
then do whatever you need on it.

179
00:09:49,139 --> 00:09:50,139
Right?

180
00:09:50,139 --> 00:09:54,980
So you can only address blocks, not individual, individual bites.

181
00:09:54,980 --> 00:10:00,059
And so the reason why this matters is that there'll be certain algorithms will choose in

182
00:10:00,059 --> 00:10:05,100
the design of our system where we know we're fetching blocks instead of single bites or

183
00:10:05,100 --> 00:10:06,220
bite offsets.

184
00:10:06,220 --> 00:10:10,580
And therefore we'll choose maybe an algorithm that is better for block-adjustable data.

185
00:10:10,580 --> 00:10:16,240
Actually this we're also going to choose potentially algorithms that are, that are maximized

186
00:10:16,240 --> 00:10:18,139
amount of sequential access of our data.

187
00:10:18,139 --> 00:10:21,980
So what do I mean by this?

188
00:10:21,980 --> 00:10:25,220
Yes.

189
00:10:25,220 --> 00:10:27,980
Accessing adjacent blocks by cheaper.

190
00:10:27,980 --> 00:10:29,220
So we want to do some questions.

191
00:10:29,220 --> 00:10:30,220
Right.

192
00:10:30,220 --> 00:10:32,060
So he said accessing adjacent blocks are cheaper.

193
00:10:32,060 --> 00:10:33,820
So we want to do that as much as possible.

194
00:10:33,820 --> 00:10:38,420
So again, say I want to get, I want to get 10 megabytes.

195
00:10:38,419 --> 00:10:42,179
And I have, and they're broken onto one megabyte blocks.

196
00:10:42,179 --> 00:10:45,339
If those one megabyte blocks are scattered in different locations, then I got to, it's

197
00:10:45,339 --> 00:10:46,339
called random access.

198
00:10:46,339 --> 00:10:49,019
Go jump to those different locations to get that data.

199
00:10:49,019 --> 00:10:53,500
Or alternatively if it's all aligned together and contiguous, then in theory I can do one

200
00:10:53,500 --> 00:10:57,979
fetch command, not saying what the device is, but it's one fetch command to go get those

201
00:10:57,979 --> 00:11:00,179
10 meg, one megabyte blocks.

202
00:11:00,179 --> 00:11:02,339
And that's going to be way more efficient.

203
00:11:02,339 --> 00:11:03,339
Right?

204
00:11:03,339 --> 00:11:07,779
If you just take it like on a website or you're downloading some of the internet, if I can go

205
00:11:07,779 --> 00:11:10,539
open up a single connection and get all the data I need rather than opening up different

206
00:11:10,539 --> 00:11:13,779
connections, the one fetch is going to be faster.

207
00:11:13,779 --> 00:11:16,819
At the hardware level, think of like a spinning disk hard drive.

208
00:11:16,819 --> 00:11:18,379
And laptops don't come with these anymore.

209
00:11:18,379 --> 00:11:20,339
They still exist in the enterprise world.

210
00:11:20,339 --> 00:11:25,059
But there's a physical arm that's spinning around in a platter like a vinyl record, right?

211
00:11:25,059 --> 00:11:26,419
Like that old people have.

212
00:11:26,419 --> 00:11:29,939
And so if you have to plot, move the arm, they get data.

213
00:11:29,939 --> 00:11:32,059
Moving that arm is, it's a physical thing.

214
00:11:32,059 --> 00:11:33,059
It's expensive.

215
00:11:33,059 --> 00:11:36,220
It's actually moving something through, through helium.

216
00:11:36,540 --> 00:11:39,620
You're moving something, moving the arm on the platter.

217
00:11:39,620 --> 00:11:44,300
So if I have to, if I can just move the arm once and then read a bunch of data without

218
00:11:44,300 --> 00:11:46,100
moving it again, that's the quantum access.

219
00:11:46,100 --> 00:11:47,100
That's going to be faster.

220
00:11:47,100 --> 00:11:49,820
If I had to pick the arm up and move it over and over again, then that's going to be much

221
00:11:49,820 --> 00:11:50,820
slower.

222
00:11:50,820 --> 00:11:55,779
And again, we'll see this when we, this come up also with the execution algorithms that

223
00:11:55,779 --> 00:12:00,340
will be certain algorithms that will choose that will maximize quantum access.

224
00:12:00,340 --> 00:12:02,220
And we'll choose those over something that's more random access.

225
00:12:02,220 --> 00:12:06,180
And this is different than maybe how you think about algorithms in interclasses because

226
00:12:06,739 --> 00:12:10,539
in that world, they assume everything's always going to be, the memory access is always the

227
00:12:10,539 --> 00:12:12,219
same.

228
00:12:12,219 --> 00:12:13,579
In our world, we're dealing with real hardware.

229
00:12:13,579 --> 00:12:14,939
So we can't make that assumption.

230
00:12:17,419 --> 00:12:22,620
So let me tell you what, so the way we think about this is that I'll use the term memory

231
00:12:22,620 --> 00:12:23,620
in this class.

232
00:12:23,620 --> 00:12:26,859
And I'll just mean here, I'll just mean DRAM.

233
00:12:26,859 --> 00:12:30,019
And when I say disk, I'm going to mean anything below that, right?

234
00:12:30,019 --> 00:12:34,219
So an SSD, it's spending this hard drive or a network cloud storage.

235
00:12:35,220 --> 00:12:40,259
The ones up here, the CPU registers, we won't discuss these in this class.

236
00:12:40,259 --> 00:12:43,940
In the advanced class, we'll talk about different algorithms of the methods to kind of maximize

237
00:12:43,940 --> 00:12:49,500
the amount of processing being due of data in CPU registers or like L3, L2 caches.

238
00:12:49,500 --> 00:12:51,060
And in that world, you can make a huge difference.

239
00:12:53,060 --> 00:12:56,779
It's also a word noting that are some sort of merging hardware devices or hardware that's

240
00:12:56,779 --> 00:12:59,820
available today that spans different layers.

241
00:13:00,820 --> 00:13:05,060
So you can get sort of fast network storage or disaggregated storage or disaggregated

242
00:13:05,060 --> 00:13:11,420
memory where this looks like it potentially could be bite addressable, but you're going

243
00:13:11,420 --> 00:13:15,300
over a physical network, so it's a little bit slower.

244
00:13:15,300 --> 00:13:18,460
So it sort of straddles in between here.

245
00:13:18,460 --> 00:13:22,860
And then there was something called persistent memory that people have been dreaming about

246
00:13:22,860 --> 00:13:28,020
for a long time that would have sort of the best benefit of, or have they bite address

247
00:13:28,019 --> 00:13:32,419
ability of DRAM, but also the persistence of NSSD.

248
00:13:32,419 --> 00:13:38,059
And we'd actually sit in the dim slot so you could write to it as if it was a memory,

249
00:13:38,059 --> 00:13:40,379
but if you pull the plug, everything gets retained.

250
00:13:40,379 --> 00:13:47,819
And this is something when I first started CMU 10 years ago, we were spending a lot of

251
00:13:47,819 --> 00:13:48,819
time researching this.

252
00:13:48,819 --> 00:13:53,340
This is something we was very interested in because if we had this persistent memory, basically

253
00:13:53,340 --> 00:13:57,940
all the stuff that I'm going to talk about in two weeks, actually Project 1 in this class

254
00:13:57,940 --> 00:13:59,940
basically goes away, right?

255
00:13:59,940 --> 00:14:02,620
Because I don't need to worry about moving things in and out of disk.

256
00:14:02,620 --> 00:14:04,420
Everything, my memory's persistent.

257
00:14:04,420 --> 00:14:09,740
There may be no, if anybody actually should have made this persistent, non-volta memory.

258
00:14:09,740 --> 00:14:10,740
Yes.

259
00:14:10,740 --> 00:14:13,899
I guess you could try to look at an SSD or hardware and something attached to like Intel,

260
00:14:13,899 --> 00:14:14,899
off-camera, something?

261
00:14:14,899 --> 00:14:15,899
Boom, there you go.

262
00:14:15,899 --> 00:14:17,900
You look at the SSD and you look at the SSD.

263
00:14:17,900 --> 00:14:21,740
Yes, so he said you could try this with an SSD, yes, people do that, but that's not

264
00:14:21,740 --> 00:14:23,259
true persistent memory.

265
00:14:23,259 --> 00:14:24,940
Or then you said Intel Optane.

266
00:14:24,940 --> 00:14:26,460
Intel Optane actually was an SSD.

267
00:14:26,460 --> 00:14:27,860
It was actually phase change memory.

268
00:14:27,860 --> 00:14:32,220
It was actually was a physical device that could do, it was persistent memory, right?

269
00:14:32,220 --> 00:14:35,539
HP had memory, there was IBM, rumor had something, right?

270
00:14:35,539 --> 00:14:38,659
Intel is the only one that actually made this.

271
00:14:38,659 --> 00:14:40,620
Who here has heard of Intel Optane?

272
00:14:40,620 --> 00:14:41,860
Well he obviously yes.

273
00:14:41,860 --> 00:14:43,659
Very, very few.

274
00:14:43,659 --> 00:14:45,779
It's already dead.

275
00:14:45,779 --> 00:14:48,659
So Intel killed it last year.

276
00:14:48,659 --> 00:14:52,899
Hopefully Intel hired a new CEO and they cut a bunch of divisions and unfortunately they

277
00:14:52,899 --> 00:14:53,899
cut this.

278
00:14:53,899 --> 00:14:58,419
And this sucks because to me this would have been a game changer but Intel couldn't make

279
00:14:58,419 --> 00:14:59,419
any money off of it.

280
00:14:59,419 --> 00:15:03,860
And what sucks also too is now no one's going to try this for another decade because if

281
00:15:03,860 --> 00:15:07,899
Intel could make money off of it, who will?

282
00:15:07,899 --> 00:15:10,740
But there was a various project at different database companies.

283
00:15:10,740 --> 00:15:15,220
They were trying to build database systems just around persistent memory.

284
00:15:15,220 --> 00:15:17,740
Because again a bunch of the stuff we're going to have to do with moving data back and forth

285
00:15:17,740 --> 00:15:21,300
between disk and memory goes away with this.

286
00:15:21,300 --> 00:15:23,379
So that's a shame.

287
00:15:23,379 --> 00:15:25,180
Okay.

288
00:15:25,180 --> 00:15:28,899
So the reason why we have to be cognizant of what the storage is going to look like is because

289
00:15:28,899 --> 00:15:33,300
the performance characteristics as I said, between these different devices are going to be

290
00:15:33,300 --> 00:15:35,620
dramatically different.

291
00:15:35,620 --> 00:15:40,899
And we're going to try to maximize the amount of work we can do for data when it's in memory.

292
00:15:40,899 --> 00:15:44,660
When we bring something off a disk into memory, we want to do as much work as we can on

293
00:15:45,139 --> 00:15:49,100
that data before we throw it away and bring something else into memory.

294
00:15:49,100 --> 00:15:52,379
In an ideal world, our database would fit entirely in memory.

295
00:15:52,379 --> 00:15:56,779
Even then you start the right out the disk but in some cases that's not always possible.

296
00:15:56,779 --> 00:16:03,579
So the way to take it is at the CPU level, a cache miss is going to basically one nanosecond.

297
00:16:03,579 --> 00:16:09,399
It's getting out of DRAMs, 100 nanoseconds, and SSD is about 16 microseconds or 16,000

298
00:16:09,399 --> 00:16:10,399
nanoseconds.

299
00:16:10,399 --> 00:16:11,399
That's actually pretty good.

300
00:16:11,399 --> 00:16:14,059
Spitting this hard drive, two million nanoseconds.

301
00:16:14,059 --> 00:16:18,459
And then EBS can fluctuate, sometimes you get 50 milliseconds, sometimes you get 500 milliseconds,

302
00:16:18,459 --> 00:16:20,379
depends on how hot the data is.

303
00:16:20,379 --> 00:16:23,859
And then tape archives, again, this is glacial.

304
00:16:23,859 --> 00:16:26,099
You don't want to build any system off of this.

305
00:16:26,099 --> 00:16:29,899
So this data comes from, this particular data here comes out.

306
00:16:29,899 --> 00:16:31,619
There's a Berkeley website and a link there.

307
00:16:31,619 --> 00:16:35,099
You sort of show you the trends of the hardware performance, the speeds of these devices

308
00:16:35,099 --> 00:16:36,299
over time.

309
00:16:36,299 --> 00:16:40,699
This table has been attributed to Jeff Dean from the early 2000s.

310
00:16:40,700 --> 00:16:44,620
I think it might predate him before that.

311
00:16:44,620 --> 00:16:48,140
So as humans, it's hard for us to reason about nanoseconds, right?

312
00:16:48,140 --> 00:16:49,660
Like one nanosecond, what does that actually mean?

313
00:16:49,660 --> 00:16:53,259
Or two million nanoseconds, is that a long time?

314
00:16:53,259 --> 00:16:58,379
And so there's a simple trick you can do to realize how bad this actually is or how much

315
00:16:58,379 --> 00:17:04,380
slower things actually get if you just change one nanosecond to one second.

316
00:17:04,380 --> 00:17:09,220
So this is a trick that, or this is something that Jim Gray used to do in the 90s.

317
00:17:09,220 --> 00:17:14,299
If you just change one nanosecond to one second, now you see how massively slower these

318
00:17:14,299 --> 00:17:15,299
other devices are.

319
00:17:15,299 --> 00:17:19,420
You see why you want to keep everything in memory as much as possible.

320
00:17:19,420 --> 00:17:25,420
And so if I have to read a page from a book and say, doing an L1 cache miss would be

321
00:17:25,420 --> 00:17:28,180
me walking at this table and looking in the book.

322
00:17:28,180 --> 00:17:31,700
Or if I had to read from an SSD or DRAM, maybe it's walking over to the library and then

323
00:17:31,700 --> 00:17:33,700
finding the book.

324
00:17:33,700 --> 00:17:35,900
But if I had to read from a tape archive, it's 31 years.

325
00:17:35,900 --> 00:17:40,100
And that's equivalent to flying to Pluto, the planet, and then reading one book.

326
00:17:40,100 --> 00:17:43,100
So we want to avoid all of this as much as possible.

327
00:17:43,100 --> 00:17:45,540
Okay?

328
00:17:45,540 --> 00:17:48,580
So this Quential versus Randomly, we've recurred this, we discussed this already.

329
00:17:48,580 --> 00:17:52,259
But again, this is going to be a reoccurring theme throughout the entire semester where,

330
00:17:52,259 --> 00:17:56,820
again, the database system is going to prefer Squential access over random access for both

331
00:17:56,820 --> 00:17:57,820
reads and writes.

332
00:17:57,820 --> 00:18:00,900
When spending this hard drive, again, it makes a huge difference.

333
00:18:00,900 --> 00:18:05,019
But even on SSD, because of the way they actually work underneath the covers with the ASICs

334
00:18:05,019 --> 00:18:10,460
and then doing compaction and so forth, you're better off doing batch reads and writes sequentially

335
00:18:10,460 --> 00:18:13,259
as much as possible.

336
00:18:13,259 --> 00:18:14,259
Right?

337
00:18:14,259 --> 00:18:15,259
Right.

338
00:18:15,259 --> 00:18:19,579
So the other system design goals we're going to have and how we choose how we want to build

339
00:18:19,579 --> 00:18:26,379
our system is that we want to give the illusion that we are operating with the database entirely

340
00:18:26,379 --> 00:18:27,379
in memory.

341
00:18:27,379 --> 00:18:31,940
Again, for most databases aren't that big, most databases are less than 10 gigabytes.

342
00:18:31,940 --> 00:18:32,940
Right?

343
00:18:33,900 --> 00:18:38,779
But if a really massive database is like in the terabytes or gigabytes and terabytes and petabytes,

344
00:18:38,779 --> 00:18:43,420
ideally you want to give the appearance that everything's already in memory even though it

345
00:18:43,420 --> 00:18:44,940
actually isn't.

346
00:18:44,940 --> 00:18:48,460
And there's tricks we can do to hide the distals and so forth.

347
00:18:48,460 --> 00:18:54,360
And then as since reading, writing disk is so expensive, we want to do a bunch of other

348
00:18:54,360 --> 00:18:59,660
tricks in our design of our system to avoid prolonged stalls or having a system appear

349
00:18:59,660 --> 00:19:01,779
unresponsive.

350
00:19:01,779 --> 00:19:04,759
Because one that will frustrate the application or frustrate the user because they think

351
00:19:04,759 --> 00:19:08,620
the system is stuck, but you're really fetching things from disk.

352
00:19:08,620 --> 00:19:12,300
But this also is going to cause other problems because if we're holding a lock on something

353
00:19:12,300 --> 00:19:15,779
and we stall because we have to get something from disk or write something from disk, that's

354
00:19:15,779 --> 00:19:19,620
going to slow down everybody else behind us and have a convoy effect.

355
00:19:19,620 --> 00:19:21,420
So there's a bunch of things.

356
00:19:21,420 --> 00:19:24,259
For this reason we want to avoid this as much as possible.

357
00:19:24,259 --> 00:19:28,500
And again, because random access is slower than a sweatshirt access, we want to maximize

358
00:19:28,500 --> 00:19:31,859
much access.

359
00:19:31,859 --> 00:19:35,500
So what does this all sound like?

360
00:19:35,500 --> 00:19:39,740
Having the appearance that we have more memory than we actually do.

361
00:19:39,740 --> 00:19:40,740
Virtual memory.

362
00:19:40,740 --> 00:19:42,259
All right, so we'll get this in a second.

363
00:19:42,259 --> 00:19:45,099
I'll explain why we don't want to do virtual memory than the OS.

364
00:19:45,099 --> 00:19:50,099
And why as a database system developer, engineer building the actual system, we always want

365
00:19:50,099 --> 00:19:55,299
to do as much as we can ourselves and not rely on the OS to do anything.

366
00:19:55,299 --> 00:19:56,299
So this is our diagram.

367
00:19:56,299 --> 00:19:58,299
This is what we're building.

368
00:19:58,299 --> 00:20:02,259
So we have some database file or files plural.

369
00:20:02,259 --> 00:20:03,259
It doesn't matter.

370
00:20:03,259 --> 00:20:05,099
We can discuss the differences.

371
00:20:05,099 --> 00:20:09,500
We have some database file that's on disk and we're going to break it up into pages.

372
00:20:09,500 --> 00:20:12,460
Now, describe what a page is in the second.

373
00:20:12,460 --> 00:20:15,099
And there'll be some directory that's going to say, here's what pages I have, here's

374
00:20:15,099 --> 00:20:17,980
where to find them at this offset and so forth.

375
00:20:17,980 --> 00:20:23,740
And then there'll be some buffer pool where of memory, the data system is allocated, basically

376
00:20:23,740 --> 00:20:26,700
called malloc against the OS, got some memory.

377
00:20:26,700 --> 00:20:31,779
And then we're going to use that as the staging area where we bring pages in from disk.

378
00:20:31,779 --> 00:20:35,779
So now if the execution engine, the thing that's going to run our query, it comes along.

379
00:20:35,779 --> 00:20:38,580
And it wants to get page number two.

380
00:20:38,580 --> 00:20:42,940
We can ignore how it knows it wants page number two for now.

381
00:20:42,940 --> 00:20:45,380
But it assumes that's what it wants, it wants page number two.

382
00:20:45,380 --> 00:20:47,980
So the very first thing we got to do is bring in the page directory because that's going

383
00:20:47,980 --> 00:20:52,259
to tell us where on disk the pages are.

384
00:20:52,259 --> 00:20:58,019
And then it'll make a call to the OS or whatever the device that's storing the database file

385
00:20:58,019 --> 00:21:00,500
and it'll bring that page into memory.

386
00:21:00,500 --> 00:21:06,059
And then now the buffer pool will give back the execution engine a pointer in memory,

387
00:21:06,059 --> 00:21:11,700
a 64 bit pointer in memory, where this page exists.

388
00:21:11,700 --> 00:21:14,660
And now it's up to the execution engine or the access method, the operators to then

389
00:21:14,660 --> 00:21:16,940
interpret what's inside that page.

390
00:21:16,940 --> 00:21:20,220
Because all that's opaque to the rest of the system.

391
00:21:20,220 --> 00:21:24,220
It's not entirely true, but at this point they don't really know.

392
00:21:24,220 --> 00:21:27,980
And then let's say once you do about the updates, it makes changes to whatever's in page number

393
00:21:27,980 --> 00:21:28,980
two.

394
00:21:28,980 --> 00:21:32,220
I'm not saying whether it's a two-blum, nothing, but it doesn't matter.

395
00:21:32,220 --> 00:21:35,980
And then now the data system is responsible for writing this back out to disk to make sure

396
00:21:35,980 --> 00:21:39,220
that any changes are persistent.

397
00:21:39,220 --> 00:21:43,259
So this is effectively where we're going for the next three or four lectures.

398
00:21:43,259 --> 00:21:45,579
This is the architecture we're going to be building.

399
00:21:45,579 --> 00:21:50,859
So we'll discuss what pages look like in the next three lectures, three, four, and five.

400
00:21:50,859 --> 00:21:57,460
We'll discuss how to write things out the disk in six and how to manage memory in six.

401
00:21:57,460 --> 00:22:01,819
And then we'll discuss how to execute the queries up here in 12 and 13.

402
00:22:01,819 --> 00:22:03,819
Okay?

403
00:22:03,819 --> 00:22:08,179
So our focus really today is what are these things on disk?

404
00:22:08,179 --> 00:22:09,899
Okay?

405
00:22:09,899 --> 00:22:13,259
So I said before, what does this sound like?

406
00:22:13,259 --> 00:22:14,419
Everyone said virtual memory.

407
00:22:14,820 --> 00:22:19,140
And you say, okay, well, why do any of this, why take the next three lectures, talking about

408
00:22:19,140 --> 00:22:23,860
what's it, what's, you need this lecture, why take the next two lectures after that,

409
00:22:23,860 --> 00:22:28,259
talk about how to manage memory back on fourth from disk, when the OS can do that for us.

410
00:22:28,259 --> 00:22:33,740
If anybody knows what's the sys call you would use to use virtual memory in this way.

411
00:22:33,740 --> 00:22:35,500
And that, beautiful, excellent.

412
00:22:35,500 --> 00:22:37,019
Sensor memory map file.

413
00:22:37,019 --> 00:22:38,820
So this is in the positive standard.

414
00:22:38,820 --> 00:22:40,500
Windows has their own version of it.

415
00:22:40,500 --> 00:22:45,339
But this allows you to take the contents of a file that's on disk and you map it into

416
00:22:45,339 --> 00:22:50,140
virtual memory in your process, in the address base of your process.

417
00:22:50,140 --> 00:22:56,460
And then now that process can jump to any offset in that address base in memory.

418
00:22:56,460 --> 00:23:00,460
And the OS is responsible for deciding, oh, is the thing you need in memory or not, if

419
00:23:00,460 --> 00:23:04,700
not, then it goes and fetches the page you need and brings it in memory.

420
00:23:04,700 --> 00:23:05,700
Right?

421
00:23:05,700 --> 00:23:08,460
So the database doesn't, it's not doing any of the reason rights.

422
00:23:08,460 --> 00:23:13,220
It just, an MAP opens the file and the OS does all the management of the data, moving the

423
00:23:13,220 --> 00:23:14,660
data back and forth for us.

424
00:23:14,660 --> 00:23:16,420
All right, so it looks like that.

425
00:23:16,420 --> 00:23:19,779
So we have an R and disk file, we have a bunch of pages, right?

426
00:23:19,779 --> 00:23:21,740
We call MAP to open it up.

427
00:23:21,740 --> 00:23:25,019
And then we'll have a concept of virtual memory and physical memory.

428
00:23:25,019 --> 00:23:28,380
So virtual memory would be what I see in my process address base.

429
00:23:28,380 --> 00:23:33,779
And again, at some starting location, I'll get the, I'll get the MAP file.

430
00:23:33,779 --> 00:23:36,100
And then these virtual memory has to be backed by physical pages.

431
00:23:36,099 --> 00:23:41,059
So as I touch a page, the OS has to go then put it into some space in physical memory

432
00:23:41,059 --> 00:23:44,259
and then update the wiring for the virtual memory table.

433
00:23:44,259 --> 00:23:45,259
All right?

434
00:23:45,259 --> 00:23:48,339
So let's say that my process wants to touch page one.

435
00:23:48,339 --> 00:23:52,379
So we would have a page fault because the OS would recognize I don't have page one in

436
00:23:52,379 --> 00:23:53,379
physical memory.

437
00:23:53,379 --> 00:23:57,379
It would go out the disk, fetch it for me, put it in, update virtual memory to now point

438
00:23:57,379 --> 00:23:58,379
to it.

439
00:23:58,379 --> 00:24:01,899
And then my process can touch it or do whatever once with it.

440
00:24:01,899 --> 00:24:03,379
Same thing now if I want page three.

441
00:24:03,379 --> 00:24:04,379
It's not in there.

442
00:24:04,379 --> 00:24:05,379
I get a page fault.

443
00:24:05,380 --> 00:24:09,820
The OS blocks my process when I do the, when I access it, it goes fetch the page

444
00:24:09,820 --> 00:24:15,460
and need from disk, updates the wiring and then my process can start running again.

445
00:24:15,460 --> 00:24:17,900
My thread can start running again.

446
00:24:17,900 --> 00:24:21,300
What happens when I, if I want to touch page two?

447
00:24:21,300 --> 00:24:22,300
What's that?

448
00:24:22,300 --> 00:24:25,620
It's you get rid of it, right?

449
00:24:25,620 --> 00:24:28,940
But what happens while I'm getting rid of it?

450
00:24:28,940 --> 00:24:30,340
My process stalls, right?

451
00:24:30,340 --> 00:24:34,460
I go to, the OS is going to block me while it says, okay, well, I don't have any more

452
00:24:34,460 --> 00:24:35,460
physical memory.

453
00:24:35,460 --> 00:24:38,539
Let me go out and figure out what do these, you know, page one or three, which one should

454
00:24:38,539 --> 00:24:39,539
I throw away?

455
00:24:39,539 --> 00:24:40,539
Right?

456
00:24:40,539 --> 00:24:46,220
But the OS is going to have its own internal statistics about how these pages are being

457
00:24:46,220 --> 00:24:51,740
accessed and it, it's going to make a decision about what page do it.

458
00:24:51,740 --> 00:24:54,539
But it doesn't know anything about what we're doing inside the database system because it

459
00:24:54,539 --> 00:24:55,539
just sees reason rights.

460
00:24:55,539 --> 00:24:57,539
It doesn't, like, like, like, as a course screen.

461
00:24:57,539 --> 00:24:58,539
It doesn't know what queries are.

462
00:24:58,539 --> 00:25:00,539
Doesn't know what's in these data pages.

463
00:25:00,539 --> 00:25:02,340
What's in these files?

464
00:25:03,019 --> 00:25:07,139
So the OS is going to try to make a decision on how to swap things out.

465
00:25:07,139 --> 00:25:08,459
And that's just, you know, for eviction.

466
00:25:08,459 --> 00:25:12,179
There's a whole bunch of other problems that we're going to face if we rely on the OS

467
00:25:12,179 --> 00:25:15,419
to do this for us.

468
00:25:15,419 --> 00:25:20,259
So in my first example here, I showed one thread, right, or one process with accessing it.

469
00:25:20,259 --> 00:25:23,419
But again, we're going to try to build a database, a modern database system that can take

470
00:25:23,419 --> 00:25:27,139
advantage of multiple cores or multiple CPUs.

471
00:25:27,139 --> 00:25:29,699
And so we need to have multiple threads access them.

472
00:25:29,700 --> 00:25:34,900
And now what if one of them, you know, one of them, touch something, writes it, and then

473
00:25:34,900 --> 00:25:38,580
another guy tries to read it, but it gets stalled because it gets evicted, right?

474
00:25:38,580 --> 00:25:40,340
The ordering can get kind of screwy.

475
00:25:40,340 --> 00:25:43,960
And again, the opportunism doesn't know anything that's going on, what's running inside the

476
00:25:43,960 --> 00:25:46,340
system at the same time.

477
00:25:46,340 --> 00:25:47,340
So everything's read-only.

478
00:25:47,340 --> 00:25:48,340
It's okay, right?

479
00:25:48,340 --> 00:25:50,340
Because we're not dirtying any pages.

480
00:25:50,340 --> 00:25:51,860
The OS can swap things out.

481
00:25:51,860 --> 00:25:53,660
It'll be good enough.

482
00:25:53,660 --> 00:25:58,000
And there are some cases, there are some data systems that do use MAP, just for sort of

483
00:25:58,000 --> 00:26:01,039
read-only parts of the system.

484
00:26:01,039 --> 00:26:04,640
But if you now need to have multiple writers, which again, in a real system, we're going

485
00:26:04,640 --> 00:26:09,359
to want this, then there's a bunch of other problems.

486
00:26:09,359 --> 00:26:11,000
So the first one is transaction safety.

487
00:26:11,000 --> 00:26:12,720
This is the one I sort of mentioned.

488
00:26:12,720 --> 00:26:18,920
Like if I have a transaction that updates multiple pages, I need to make sure that these pages

489
00:26:18,920 --> 00:26:21,000
are actually written out in the right order.

490
00:26:21,000 --> 00:26:24,680
And the OS doesn't know that because this solves these dirty pages, it doesn't know anything

491
00:26:24,680 --> 00:26:29,960
about does this page need to be written before this other page.

492
00:26:29,960 --> 00:26:33,840
You can do some things like you can lock the page using Mlock, but that only prevents

493
00:26:33,840 --> 00:26:35,240
the OS from swapping it out.

494
00:26:35,240 --> 00:26:37,120
It doesn't prevent it from writing out.

495
00:26:37,120 --> 00:26:39,480
So now it may write out a dirty page that it shouldn't have.

496
00:26:39,480 --> 00:26:43,920
I crash and come back, and now I have changes that shouldn't have been written at disk.

497
00:26:43,920 --> 00:26:50,360
And I have to go figure out how to reverse that or deal with the bad data and inconsistent

498
00:26:50,360 --> 00:26:52,360
data.

499
00:26:52,439 --> 00:26:55,039
We've already talked about doing stalls.

500
00:26:55,039 --> 00:26:57,919
Again, if you try to access something that's not in memory, you get a major page fault.

501
00:26:57,919 --> 00:27:00,199
It blocks your thread, it de-schedules you.

502
00:27:00,199 --> 00:27:03,639
The disk schedule goes, gets your page, brings it in, and when it's available, then you

503
00:27:03,639 --> 00:27:04,639
get re-scheduled.

504
00:27:04,639 --> 00:27:06,159
Your thread gets re-scheduled again.

505
00:27:06,159 --> 00:27:10,039
But now your thread is blocked and doing nothing.

506
00:27:10,039 --> 00:27:14,240
And maybe there are other queries you could possibly run while you're waiting for that

507
00:27:14,240 --> 00:27:16,639
thing to get fetched from disk.

508
00:27:16,639 --> 00:27:19,919
So then you say, OK, well, maybe I'll make a dispatcher or a scheduler.

509
00:27:19,920 --> 00:27:21,920
So there's only one thread that goes and gets things.

510
00:27:21,920 --> 00:27:24,960
If there's a page fault, he gets blocked, then I can run out of the threads.

511
00:27:24,960 --> 00:27:32,360
But now you're building more infrastructure around the limitations of MAP.

512
00:27:32,360 --> 00:27:36,680
Next problem you have is how do you handle errors?

513
00:27:36,680 --> 00:27:43,240
If I, in MAP, if I try to access a page that, for whatever reason, it's corrupted or

514
00:27:43,240 --> 00:27:48,360
not available, there's some harm to problem, you don't get an exception as you would if

515
00:27:48,359 --> 00:27:52,679
you write it in user space code, you get a sig bus interrupt.

516
00:27:52,679 --> 00:27:56,039
Now you need a signal handler all throughout the rest of your system because you may be

517
00:27:56,039 --> 00:28:01,359
doing something that is in a critical section that you don't want to get interrupted or

518
00:28:01,359 --> 00:28:02,359
break.

519
00:28:02,359 --> 00:28:05,199
So therefore you have to have an interrupt handler to make sure you can go back to the thing

520
00:28:05,199 --> 00:28:10,240
you were doing before to handle this interrupt.

521
00:28:10,240 --> 00:28:15,359
Because this is the only sort of, this is how the operating system tells you things are

522
00:28:15,359 --> 00:28:16,639
going back.

523
00:28:16,640 --> 00:28:20,640
You can't get back an error code, you get back an interrupt.

524
00:28:20,640 --> 00:28:24,720
It's a lot of engineering to handle this.

525
00:28:24,720 --> 00:28:26,200
You don't want to do this.

526
00:28:26,200 --> 00:28:29,720
And then there's obviously going to be performance issues.

527
00:28:29,720 --> 00:28:33,240
And this is because the operating system is going to have its own internal data structures

528
00:28:33,240 --> 00:28:37,440
about what's in memory and not memory, what's getting scheduled and not getting scheduled.

529
00:28:37,440 --> 00:28:41,320
And it has to protect those critical sections inside its own data structures with new

530
00:28:41,319 --> 00:28:44,000
text or whatever.

531
00:28:44,000 --> 00:28:46,799
And now that's going to be a contention point.

532
00:28:46,799 --> 00:28:50,379
Whereas in a database system, we know what queries are trying to do because, again,

533
00:28:50,379 --> 00:28:53,359
it's eagles declarative, we know what the queries want to do because we have the physical

534
00:28:53,359 --> 00:28:57,240
plan, we know what the data is trying to access, and therefore we can, we're in a better

535
00:28:57,240 --> 00:28:59,879
decision to decide how to schedule things.

536
00:28:59,879 --> 00:29:00,879
Yes?

537
00:29:00,879 --> 00:29:06,439
The database system is going to work with the data systems.

538
00:29:06,439 --> 00:29:09,599
His question is the database systems have the privilege to work with harder directly.

539
00:29:09,599 --> 00:29:16,839
There are methods called kernel bypass where you can, for NDE, there's ways to make calls

540
00:29:16,839 --> 00:29:20,000
to hardware without having to rely on the OS.

541
00:29:20,000 --> 00:29:24,419
The problem with those things are you basically have to implement a bunch of the OS back

542
00:29:24,419 --> 00:29:26,559
and up inside the database system.

543
00:29:26,559 --> 00:29:30,119
So there's something called, this is a tangent.

544
00:29:30,119 --> 00:29:34,599
Like, if you don't want to have to use the OS's TCP stack for networking, there's something

545
00:29:34,599 --> 00:29:42,119
called the DVDK from Intel, the data plane, the data kit, or development kit.

546
00:29:42,119 --> 00:29:46,000
Basically, it's a way to hook directly into hardware and you get raw packets out.

547
00:29:46,000 --> 00:29:47,000
But again, it's raw packets.

548
00:29:47,000 --> 00:29:51,799
If it's a TCP connection, now you got to keep track of the TCP headers and a lot of f***ing

549
00:29:51,799 --> 00:29:54,240
right.

550
00:29:54,240 --> 00:29:55,240
Very few database systems do this.

551
00:29:55,240 --> 00:29:56,759
I only know two.

552
00:29:56,759 --> 00:29:58,839
One was, one's yellow brick.

553
00:29:58,839 --> 00:30:00,799
We'll discuss them throughout the semester.

554
00:30:00,799 --> 00:30:01,799
They went to amazing stuff.

555
00:30:01,799 --> 00:30:04,399
They basically rewrite their own.

556
00:30:04,399 --> 00:30:08,359
They basically only use the OS to turn the thing on and they never call Malik again.

557
00:30:08,359 --> 00:30:10,519
They allocate all the memory, everything beginning.

558
00:30:10,519 --> 00:30:12,519
They wrote their own PCIe drivers.

559
00:30:12,519 --> 00:30:14,559
They do much amazing engineering.

560
00:30:14,559 --> 00:30:15,559
Few people do that.

561
00:30:15,559 --> 00:30:20,200
They know it was a ScaliaDB, but the DVDK was so difficult to handle that.

562
00:30:20,200 --> 00:30:21,200
It was huge pains.

563
00:30:21,200 --> 00:30:22,200
They don't do it.

564
00:30:22,200 --> 00:30:30,720
So the answer to the question is, for some things, you have to go through the OS.

565
00:30:30,720 --> 00:30:34,279
In the 80s, they got really crazy.

566
00:30:34,279 --> 00:30:37,440
Instead of using a file system, they wrote their own storage layer on top of like raw

567
00:30:37,440 --> 00:30:38,440
block devices.

568
00:30:38,440 --> 00:30:40,680
People try this over the years.

569
00:30:40,680 --> 00:30:45,480
From an engineering perspective, it's oftentimes you do have to rely on the OS, but you

570
00:30:45,480 --> 00:30:49,920
want to minimize your contact with it because the OS is going to be your enemy.

571
00:30:49,920 --> 00:30:51,920
Other questions?

572
00:30:51,920 --> 00:30:52,920
All right.

573
00:30:52,920 --> 00:30:56,240
I don't spend too much time on MAP.

574
00:30:56,640 --> 00:30:57,960
Suffice it, it's a bad idea.

575
00:30:57,960 --> 00:30:59,880
Don't do it.

576
00:30:59,880 --> 00:31:06,039
If I die, you can put on my tombstone, never use MAP for your database.

577
00:31:06,039 --> 00:31:10,079
The reason why I was going to bring this up is because we invite a lot of these different

578
00:31:10,079 --> 00:31:12,920
database companies and startups to come and give talks at CMU.

579
00:31:12,920 --> 00:31:16,519
And surprisingly over the last couple of years, a lot of them mentioned they're using MAP.

580
00:31:16,519 --> 00:31:17,519
And we ask them why.

581
00:31:17,519 --> 00:31:19,960
And they say, oh, because it's quick and easy to use.

582
00:31:19,960 --> 00:31:22,559
And then when we go talk to them a few years later, like, oh yeah, that was a huge mistake.

583
00:31:22,559 --> 00:31:23,440
We should not have done MAP.

584
00:31:23,440 --> 00:31:26,000
We should have done what lecture six is going to teach you.

585
00:31:26,000 --> 00:31:27,000
Right?

586
00:31:27,000 --> 00:31:29,000
So here's a listing of some systems that I know using MAP.

587
00:31:29,000 --> 00:31:30,400
There's a couple others I'm sure I'm missing.

588
00:31:30,400 --> 00:31:32,799
There's a bunch of hobby projects.

589
00:31:32,799 --> 00:31:34,400
So the ones at the top, these are full usage.

590
00:31:34,400 --> 00:31:39,200
These are systems that were they entirely use MAP for all data back and forth from disk

591
00:31:39,200 --> 00:31:41,480
and memory.

592
00:31:41,480 --> 00:31:44,279
The most famous one of these is polyelastic.

593
00:31:44,279 --> 00:31:51,680
Moan ADB was a commsroid out of CWI, the same place that build.db.

594
00:31:51,680 --> 00:31:55,320
The LMDB does poly the exact opposite of me where I'm saying never use MAP.

595
00:31:55,320 --> 00:31:57,400
He's like always, always use MAP.

596
00:31:57,400 --> 00:32:00,160
And he's been banned on a bunch of different databases mailing lists because he would email

597
00:32:00,160 --> 00:32:02,960
them and say, like, you guys should be using, you should be using LMDB.

598
00:32:02,960 --> 00:32:04,720
You should be using MAP, right?

599
00:32:04,720 --> 00:32:06,960
He's wrong.

600
00:32:06,960 --> 00:32:09,799
He's s*** is weird.

601
00:32:09,799 --> 00:32:12,759
But here's the ones at the bottom that weren't partially using it.

602
00:32:12,759 --> 00:32:14,799
Actually, I would put manga as full usage.

603
00:32:14,799 --> 00:32:16,200
They should really be at the top.

604
00:32:16,200 --> 00:32:19,640
But the ones at the bottom here, they all got rid of it, right?

605
00:32:19,640 --> 00:32:21,560
Because of all the issues that I mentioned before.

606
00:32:21,559 --> 00:32:25,359
You can get something up and running pretty quickly to use MAP because you don't have to

607
00:32:25,359 --> 00:32:27,000
build your own buffer pool manager.

608
00:32:27,000 --> 00:32:30,359
But because you're lying on the OS to move data back and forth, it's going to make horrible

609
00:32:30,359 --> 00:32:32,599
decisions, right?

610
00:32:32,599 --> 00:32:36,119
I don't want to pick on Mongo, but Mongo is the best example of this.

611
00:32:36,119 --> 00:32:39,960
Mongo started off with an MAP based storage engine, storage manager.

612
00:32:39,960 --> 00:32:42,480
They were the hot database in the 2010s.

613
00:32:42,480 --> 00:32:44,919
They raised a ton of investor money.

614
00:32:44,919 --> 00:32:46,960
They had really good engineers.

615
00:32:46,960 --> 00:32:48,480
They were based on a ton of MAP.

616
00:32:48,480 --> 00:32:51,880
But MAP was the right choice.

617
00:32:51,880 --> 00:32:53,920
They could have made that work.

618
00:32:53,920 --> 00:32:54,920
But what did they do?

619
00:32:54,920 --> 00:32:56,680
They threw it all away and they bought wire tiger.

620
00:32:56,680 --> 00:33:00,480
It was a storage manager that doesn't use MAP.

621
00:33:00,480 --> 00:33:05,680
So again, just to reiterate, we don't want to use the OS to manage memory because the

622
00:33:05,680 --> 00:33:08,759
data system is always going to be a better position to do this.

623
00:33:08,759 --> 00:33:11,400
It's not just for managing memory, it's basically for everything.

624
00:33:11,400 --> 00:33:12,680
We don't need the OS for scheduling.

625
00:33:12,680 --> 00:33:16,160
We don't need the OS for caching rights.

626
00:33:16,160 --> 00:33:21,759
We don't need the OS for the network stuff you need to.

627
00:33:21,759 --> 00:33:23,759
But there's a trick for that.

628
00:33:23,759 --> 00:33:27,480
But OS is always going to be a problem.

629
00:33:27,480 --> 00:33:30,640
Again, for MAP, I'll send this link on Piazza.

630
00:33:30,640 --> 00:33:32,560
We wrote a paper about this and why you don't want to use this.

631
00:33:32,560 --> 00:33:38,519
Then there's a 10 minute YouTube video cartoon about all the problems.

632
00:33:38,519 --> 00:33:45,920
The OS is going to be a problem for us and we have to design our system to deal with it.

633
00:33:45,920 --> 00:33:50,279
So for database storage, there's two problems we have to deal with.

634
00:33:50,279 --> 00:33:54,240
How are we going to represent the database on these files on disk?

635
00:33:54,240 --> 00:33:59,519
And then once we have those, how do we move data back and forth from disk into memory?

636
00:33:59,519 --> 00:34:04,640
So today's lecture is going to be on the first problem here and then we'll cover the

637
00:34:04,640 --> 00:34:11,400
second problem in the upcoming lectures.

638
00:34:11,400 --> 00:34:17,280
So there's going to be three layers of what data is going to look like on these disk pages.

639
00:34:17,280 --> 00:34:22,920
So the first question is, what do these files actually look like?

640
00:34:22,920 --> 00:34:24,960
And then within a file, there's going to be pages.

641
00:34:24,960 --> 00:34:27,480
We're going to have to break it up into different chunks.

642
00:34:27,480 --> 00:34:30,400
And then we'll discuss what these pages look like.

643
00:34:30,400 --> 00:34:35,240
And then within that page, we're going to have tuples, the data itself, the tables.

644
00:34:35,240 --> 00:34:37,039
We can ignore indexes for now.

645
00:34:37,039 --> 00:34:40,039
And you have to decide what do those actually tuples look like.

646
00:34:40,039 --> 00:34:44,199
So we're going to start at the top and then go deeper, deeper inside of these files to

647
00:34:44,199 --> 00:34:49,000
understand what they actually contain.

648
00:34:49,000 --> 00:34:52,239
So as I said before, the database system is going to maintain a database as one more

649
00:34:52,239 --> 00:34:56,639
files on disk, SQLite, DuckDB, those are all single file databases.

650
00:34:56,639 --> 00:34:58,840
All the enterprise databases are postgres my SQL.

651
00:34:58,840 --> 00:35:05,000
Every other system, more full feature system, is going to be running, maintaining multiple

652
00:35:05,000 --> 00:35:08,119
files for your tables and databases.

653
00:35:08,119 --> 00:35:14,480
And so the format that these files are going to be based on is typically going to be

654
00:35:14,480 --> 00:35:18,719
a proprietary or custom to whatever the database system actually is.

655
00:35:18,719 --> 00:35:19,719
Right?

656
00:35:19,719 --> 00:35:24,880
Meaning you can't take the postgres database files and open them up in my SQL or open them

657
00:35:24,880 --> 00:35:25,880
up in SQLite.

658
00:35:25,880 --> 00:35:30,920
Now, DuckDB, because they want to be portable and compatible with SQLite, they have connectors

659
00:35:30,920 --> 00:35:34,000
to read SQLite files and other things.

660
00:35:34,000 --> 00:35:38,360
But in general, all the major database systems are going to have their own proprietary format.

661
00:35:38,360 --> 00:35:40,519
And the OS doesn't know anything about what's inside of these files.

662
00:35:40,519 --> 00:35:42,039
There's a no what's inside of a page.

663
00:35:42,039 --> 00:35:44,440
There's a no where indexes are, where it's the tables are, it just knows nothing, just

664
00:35:44,440 --> 00:35:46,559
sees much of files.

665
00:35:46,559 --> 00:35:52,159
So next class, we'll talk about portal file formats, things like parquet, avro, org, arrow, these

666
00:35:52,159 --> 00:35:58,199
are going to be open source specifications for what a database file could look like.

667
00:35:58,199 --> 00:36:01,320
And then there's a bunch of different systems that know how to read them and access them and

668
00:36:01,320 --> 00:36:02,320
write them.

669
00:36:02,320 --> 00:36:04,320
So we'll we'll we'll we'll write those later.

670
00:36:04,320 --> 00:36:10,800
And as I said before, in the 1980s, there was a sort of a lot of the earlier database systems

671
00:36:10,800 --> 00:36:15,760
decided that they not only were they going to have customized file formats, they were also

672
00:36:15,760 --> 00:36:17,400
going to have customized file systems.

673
00:36:17,400 --> 00:36:22,960
And they were going to use the EXT3 didn't exist, you know, B3FS didn't exist back then.

674
00:36:22,960 --> 00:36:26,440
But they whatever the equipment was in the 80s, they didn't even rely on what the OS said

675
00:36:26,440 --> 00:36:28,039
what the file system was.

676
00:36:28,039 --> 00:36:30,039
They wanted to do everything themselves.

677
00:36:30,039 --> 00:36:32,920
And that's a lot of engineering work and nobody does that today.

678
00:36:32,920 --> 00:36:36,119
And it's usually a marginal benefit.

679
00:36:36,119 --> 00:36:39,360
The only systems that still do this would be like what I'll call enterprise systems.

680
00:36:39,360 --> 00:36:44,000
So this would be Oracle, the DB2s, the Teradata's, these are like million dollar database systems

681
00:36:44,000 --> 00:36:47,679
that are trying to get as much, you know, much performances you can.

682
00:36:47,679 --> 00:36:57,960
These systems will support this in addition to running off the generic OS file systems.

683
00:36:57,960 --> 00:37:02,480
So then the part of the database system is going to be responsible for maintaining and

684
00:37:02,480 --> 00:37:07,039
coordinating these different files that we'll call generically as the storage manager.

685
00:37:07,039 --> 00:37:12,119
Sometimes it's called the storage engine, right, it's the same idea.

686
00:37:12,119 --> 00:37:17,760
And it's going to be the part of the system that communicates with either the hardware,

687
00:37:17,760 --> 00:37:22,119
or communicates with the hardware, or whatever the storage device is either through the OS

688
00:37:22,119 --> 00:37:31,679
or using direct access to retrieve data and bring it into the database systems memory.

689
00:37:31,679 --> 00:37:32,920
And so we'll discuss this next class.

690
00:37:32,920 --> 00:37:36,279
I keep saying this, but there's so many things to discuss.

691
00:37:36,279 --> 00:37:40,799
A bunch of these systems will maintain their own, sort of, disk scheduler, disk batcher

692
00:37:40,799 --> 00:37:43,839
that decides when, what pages to read and what order.

693
00:37:43,839 --> 00:37:47,279
Because otherwise, if you just go do more effort, it's going to say, oh, the OS is going

694
00:37:47,279 --> 00:37:48,880
to figure out how to order things.

695
00:37:48,880 --> 00:37:52,800
Right again, the data system is in a better position to know what it actually needs and

696
00:37:52,800 --> 00:37:53,840
in what order.

697
00:37:53,840 --> 00:37:59,880
So various systems can have their own thread decide how to schedule their own disk reads.

698
00:37:59,880 --> 00:38:03,200
And you want to do this because you want to minimize the amount of thrashing of bringing

699
00:38:03,200 --> 00:38:05,559
things in a memory how to throw it out right away.

700
00:38:05,559 --> 00:38:09,519
So if you know two queries need the same page, maybe you bring that in first, but more

701
00:38:09,519 --> 00:38:10,880
some other pages.

702
00:38:10,880 --> 00:38:16,079
And then you throw away the first page once you know those two queries are done with them.

703
00:38:16,079 --> 00:38:20,079
So the database follows are going to be broken up into what are called pages.

704
00:38:20,079 --> 00:38:24,000
And the data system is going to be your response, sort of, keeping track of what data has been

705
00:38:24,000 --> 00:38:28,000
read and written to these various pages.

706
00:38:28,000 --> 00:38:30,119
And then keeps track of how much space is available in each of them.

707
00:38:30,119 --> 00:38:35,480
Because again, if I need to start a new toople, I need to find a page that has space for

708
00:38:35,480 --> 00:38:36,480
me.

709
00:38:36,480 --> 00:38:39,400
So I'll keep track of some directory that says this page has this amount of space and go

710
00:38:39,400 --> 00:38:41,840
put it in there.

711
00:38:41,840 --> 00:38:46,720
Now the data system itself, the storage manager layer that part we're talking about here,

712
00:38:46,720 --> 00:38:52,360
it's not going to maintain multiple copies of these pages for redundancy replication purposes.

713
00:38:52,360 --> 00:38:56,800
We assume that's going to happen either both above and below this part of the system in

714
00:38:56,800 --> 00:38:57,880
the stack.

715
00:38:57,880 --> 00:39:03,280
So above would be like something that knows if a query shows up and wants to do a write,

716
00:39:03,280 --> 00:39:07,000
send it to another physical box or another node and have both of those machines do the

717
00:39:07,000 --> 00:39:08,000
right.

718
00:39:08,000 --> 00:39:10,960
And then below it would be like if you're running rate or some kind of storage appliance that

719
00:39:10,960 --> 00:39:15,679
knows how to replicate pages, then down below it'll do that as well.

720
00:39:15,679 --> 00:39:18,720
Typically database systems will not maintain multiple copies themselves because it's a

721
00:39:18,720 --> 00:39:25,280
bunch of extra work that ideally you don't want to have to do.

722
00:39:25,280 --> 00:39:26,800
All right, so what is a page?

723
00:39:26,800 --> 00:39:32,519
So in our view, from a data perspective, a page is going to be a fixed size block of data

724
00:39:32,519 --> 00:39:36,280
and it can contain data from any part of the database itself.

725
00:39:37,120 --> 00:39:41,760
For this lecture, we assume it's just two pulls or records, but it can create indexes, log

726
00:39:41,760 --> 00:39:46,200
information, additional metadata of the catalog, statistics, right.

727
00:39:46,200 --> 00:39:52,360
It doesn't matter, but it's still going to be broken up into these fixed size blocks.

728
00:39:52,360 --> 00:39:57,120
Most systems are not going to mix page types, meaning you don't take a one megabyte page

729
00:39:57,120 --> 00:40:02,760
and put in data from this table and this table and index and stuff like that, right.

730
00:40:02,760 --> 00:40:07,720
For simplicity, you're going to assume that one page belongs to some object in the database,

731
00:40:07,720 --> 00:40:13,880
a table or index and so forth, and it would only contain data for that particular object.

732
00:40:13,880 --> 00:40:18,080
Some systems are going to require every page to be self-contained, meaning all the information,

733
00:40:18,080 --> 00:40:22,520
all the metadata you need to have to understand what's inside that page has to be included

734
00:40:22,520 --> 00:40:24,480
in the page itself.

735
00:40:24,480 --> 00:40:27,240
So Oracle's probably the most famous one that does this, right.

736
00:40:27,240 --> 00:40:31,360
So within a page, you have to keep track of like, it belongs to this table and has these

737
00:40:31,360 --> 00:40:34,559
columns, these types and so forth.

738
00:40:34,559 --> 00:40:39,840
The reason why they want to do this is because if there's some corruption in the database

739
00:40:39,840 --> 00:40:45,120
files, you don't want to have some page that contains the metadata about the table,

740
00:40:45,120 --> 00:40:50,320
get blown away and then now you can't understand what's in any other page, right.

741
00:40:50,320 --> 00:40:53,440
Again, replication can solve this problem.

742
00:40:53,440 --> 00:40:58,240
Harbor has certainly got a lot more reliable in modern times than it did before.

743
00:40:58,239 --> 00:41:01,679
Like hard drives, super flaky before.

744
00:41:01,679 --> 00:41:04,679
They're still not ideal, but they're much better than they used to be.

745
00:41:04,679 --> 00:41:10,159
So this maybe this, having every page be self-contained is less of an issue today, but

746
00:41:10,159 --> 00:41:15,199
there's a design choice that Oracle made very early on.

747
00:41:15,199 --> 00:41:19,719
Now every page in our database file is going to be given a unique identifier, like a page

748
00:41:19,719 --> 00:41:24,159
ID, like some number, 64 bit integer, 30 bit integer.

749
00:41:24,159 --> 00:41:28,119
And then there'll be some method or some mechanism that the dataset is going to use that

750
00:41:28,119 --> 00:41:33,279
allow it to map a page ID to some physical location on our storage device.

751
00:41:33,279 --> 00:41:37,799
And again, that could be like a file name inside of a directory at some offset.

752
00:41:37,799 --> 00:41:41,839
If we're running on like a cloud storage, it could be an S3 bucket at some offset and so

753
00:41:41,839 --> 00:41:42,839
forth, right.

754
00:41:42,839 --> 00:41:44,599
From our purpose, it doesn't matter.

755
00:41:44,599 --> 00:41:48,799
We just have a way to say, if we're looking at page 123, there's some method to say, here's

756
00:41:48,799 --> 00:41:53,079
where to go find it.

757
00:41:53,079 --> 00:41:57,039
And now, what's sort of confusing in the constant databases is that there's three different

758
00:41:57,039 --> 00:42:00,440
notions of what a page actually is.

759
00:42:00,440 --> 00:42:03,440
And so at the lowest level, you have what is called a hardware page.

760
00:42:03,440 --> 00:42:07,199
And this is typically four kilobytes.

761
00:42:07,199 --> 00:42:17,360
And this is going to be the largest size or the smallest size of a page or a block of data

762
00:42:17,360 --> 00:42:21,880
that the hardware can guarantee that it can do atomic rights.

763
00:42:21,880 --> 00:42:22,880
So what do I mean by that?

764
00:42:22,880 --> 00:42:23,880
It's atomic rights.

765
00:42:23,880 --> 00:42:27,880
Is this all or nothing?

766
00:42:27,880 --> 00:42:28,880
Right.

767
00:42:28,880 --> 00:42:33,920
So it means that if I tell the hardware, I want to write four kilobytes and I get back

768
00:42:33,920 --> 00:42:38,920
an acknowledgement that yes, I wrote four kilobytes, then I can assume that it made it.

769
00:42:38,920 --> 00:42:44,320
If I need to write eight kilobytes, and I send that as two four kilobyte blocks down to

770
00:42:44,320 --> 00:42:49,960
the OS, or started to the hardware, I may write the first four kilobytes and then crash

771
00:42:49,960 --> 00:42:54,679
and then come back and then the second four kilobytes did make it.

772
00:42:54,679 --> 00:42:58,159
There's no guarantee, the hardware can't guarantee that it can do that all automatically, like

773
00:42:58,159 --> 00:42:59,679
all or nothing.

774
00:42:59,679 --> 00:43:03,320
And so because of this, we're going to do much other extra stuff inside our database system

775
00:43:03,320 --> 00:43:05,920
to deal with that.

776
00:43:05,920 --> 00:43:07,720
We'll get to that later.

777
00:43:07,720 --> 00:43:12,000
And then above the hardware, now the operating system is going to have its own notion of a

778
00:43:12,000 --> 00:43:13,000
page.

779
00:43:13,000 --> 00:43:16,880
And in Linux, by default, this is four kilobytes.

780
00:43:16,880 --> 00:43:20,599
And again, this is like mapping something that's on the hardware to something that's in

781
00:43:20,599 --> 00:43:22,440
virtual memory.

782
00:43:22,440 --> 00:43:29,079
Now in X64, they also support two different modes or sort of huge pages as they're called.

783
00:43:29,079 --> 00:43:31,880
So you can get page sizes actually two megabytes and one gigabyte.

784
00:43:31,880 --> 00:43:36,320
And again, the hardware can't guarantee that it can write out four kilobytes automatically.

785
00:43:36,320 --> 00:43:41,079
This is just to reduce the amount of bookkeeping that the OS does for the pages that it brings

786
00:43:41,079 --> 00:43:43,440
into memory.

787
00:43:43,440 --> 00:43:47,280
And then within that now, above that, the database system is going to have its own notion of a

788
00:43:47,280 --> 00:43:50,880
page as well.

789
00:43:50,880 --> 00:43:54,920
And typically, this is going to be anywhere in the range of 512 bytes.

790
00:43:54,920 --> 00:43:57,159
This is what SQLite does.

791
00:43:57,159 --> 00:44:02,920
Up to I think 32 kilobytes, some systems let you go up to 64 kilobytes.

792
00:44:02,920 --> 00:44:09,119
And so the page size is going to be the way we'll represent where to find, sorry, the page

793
00:44:09,119 --> 00:44:17,319
ID is a way to represent at what offset in some file for a given page size, can we find

794
00:44:17,319 --> 00:44:20,000
the data that we're looking for?

795
00:44:20,000 --> 00:44:24,079
So again, most systems are the defaults going to be four kilobytes.

796
00:44:24,079 --> 00:44:28,079
In SQL server and Postgres, the page size is going to be eight kilobytes.

797
00:44:28,079 --> 00:44:31,519
And then in my SQL, they go up to 16 kilobytes.

798
00:44:31,519 --> 00:44:36,039
For something like a DB2 and an enterprise system, actually for DB2 on a per table basis,

799
00:44:36,039 --> 00:44:38,039
you can change the page size.

800
00:44:38,039 --> 00:44:43,639
And then take a guess, would anybody take a guess why one page size, a larger page size

801
00:44:43,639 --> 00:44:48,960
might be a better idea?

802
00:44:48,960 --> 00:44:49,960
What did I say in the beginning?

803
00:44:49,960 --> 00:44:51,159
What do we want to try to maximize?

804
00:44:51,159 --> 00:44:52,960
So, sequential access, correct.

805
00:44:52,960 --> 00:44:53,960
Yes.

806
00:44:53,960 --> 00:45:02,800
So, if I'm organizing on disk 16 kilobytes blocks and I need to read 16 kilobytes of data,

807
00:45:02,800 --> 00:45:09,960
then it's one sort of call to our dispassion in the data system that makes one call on

808
00:45:09,960 --> 00:45:14,640
the OS to go grab continuous 16 kilobytes.

809
00:45:14,640 --> 00:45:19,920
If I'm using four kilobyte pages, then I got to make separate lookups that go get the

810
00:45:19,920 --> 00:45:23,480
data in potentially random locations.

811
00:45:23,480 --> 00:45:28,000
And there's, there's, there's, cyscalls you can make to the OS are, to the device itself

812
00:45:28,000 --> 00:45:32,080
that when you allocate data that you want things to be ideally contiguously aligned, you

813
00:45:32,079 --> 00:45:37,880
can like pre-allocate and extend to say allocate me a 10 megabyte block of data and then

814
00:45:37,880 --> 00:45:42,759
then the data can divide that 10 megabyte block into, you know, 8 kilobytes chunks or

815
00:45:42,759 --> 00:45:44,759
whatever the block size it wants.

816
00:45:44,759 --> 00:45:45,759
Yes.

817
00:45:45,759 --> 00:45:46,759
Right.

818
00:45:46,759 --> 00:45:53,599
So, then he says, and he's correct, doesn't this mean that large pay sizes make rights

819
00:45:53,599 --> 00:45:54,599
more expensive?

820
00:45:54,599 --> 00:45:58,239
Because now, if I only have to write one kilobytes, but I'm storing as a 16 kilobytes page,

821
00:45:58,239 --> 00:46:00,119
I got to write it all 16 kilobytes.

822
00:46:00,119 --> 00:46:01,119
Absolutely.

823
00:46:01,119 --> 00:46:02,119
So, this is a good point.

824
00:46:02,119 --> 00:46:04,920
This is something I would say throughout the entire semester.

825
00:46:04,920 --> 00:46:08,239
It's, I mean, not just for data basis, computer science in general.

826
00:46:08,239 --> 00:46:09,239
There's no free lunch.

827
00:46:09,239 --> 00:46:13,719
There's, we pros and cons to each of these and then different situations, one approach

828
00:46:13,719 --> 00:46:15,199
might be better than another.

829
00:46:15,199 --> 00:46:18,759
If my workload is entirely read only, if I never write anything, then yeah, I want large

830
00:46:18,759 --> 00:46:21,599
page sizes, assuming I'm doing large, smithral scans.

831
00:46:21,599 --> 00:46:23,880
If I'm doing much of rights, then maybe I want something smaller.

832
00:46:23,880 --> 00:46:25,799
But what the right amount is?

833
00:46:25,799 --> 00:46:26,799
Depends.

834
00:46:26,799 --> 00:46:27,799
Yes.

835
00:46:27,800 --> 00:46:51,760
So, his statement is, if I do 16 kilobytes reads, and I'm still using four kilobytes of

836
00:46:51,760 --> 00:46:57,760
data, assuming that 16 kilobytes is contiguous, then can't I go make a, uh,

837
00:46:57,760 --> 00:47:01,520
you know, go make a single call to get 16 kilobytes that are contiguous.

838
00:47:01,520 --> 00:47:04,760
And then if I had the right individual, within the individual four kilobytes, I could still

839
00:47:04,760 --> 00:47:05,760
write those out.

840
00:47:05,760 --> 00:47:06,760
Absolutely.

841
00:47:06,760 --> 00:47:07,760
Yes.

842
00:47:07,760 --> 00:47:08,760
And this is what I was saying before.

843
00:47:08,760 --> 00:47:12,760
We will then choose algorithms or methods that try to write the data out, so that it is

844
00:47:12,760 --> 00:47:15,760
contiguous so that we can do those fetches.

845
00:47:15,760 --> 00:47:16,760
Right?

846
00:47:16,760 --> 00:47:20,040
And again, this is something that data system could do for us, because we know what the query

847
00:47:20,040 --> 00:47:22,080
is, we know what data you're going to potentially read.

848
00:47:22,080 --> 00:47:26,560
And so we can read ahead for you and try to fetch things that are, uh, before you actually

849
00:47:26,560 --> 00:47:27,560
need them.

850
00:47:27,559 --> 00:47:31,400
Now the OS can do that with prefetching as well, but it can only prefetch things that are

851
00:47:31,400 --> 00:47:35,360
contiguous, uh, in both directions, I think, in Linux, yes.

852
00:47:35,360 --> 00:47:38,920
But it can't do, in fact, the prefetched things that aren't contiguous, it can't do that

853
00:47:38,920 --> 00:47:39,920
for me.

854
00:47:39,920 --> 00:47:43,079
All right, so is this clear?

855
00:47:43,079 --> 00:47:47,000
So again, there'll be some page ID, and we'll see this in a second how this is being used.

856
00:47:47,000 --> 00:47:50,759
That's going to allow us to say, from page, uh, page one to three, here's where to go find

857
00:47:50,759 --> 00:47:51,759
it.

858
00:47:51,759 --> 00:47:52,759
All right.

859
00:47:52,760 --> 00:48:00,160
So now we're going to talk about how do we actually keep track of that mapping of page

860
00:48:00,160 --> 00:48:03,600
IDs to locations.

861
00:48:03,600 --> 00:48:06,840
And there's a, this would be one of the big differences of how the data systems are going

862
00:48:06,840 --> 00:48:09,400
to organize the, and their pages.

863
00:48:09,400 --> 00:48:12,880
Um, and again, there's not, I'm not saying one way is better than another.

864
00:48:12,880 --> 00:48:17,840
I'll describe the heat file approaches than those common one, uh, but certainly a bunch

865
00:48:17,840 --> 00:48:21,360
of other systems are doing different things, uh, and they're, and they're trade outs for

866
00:48:21,360 --> 00:48:23,440
all these ones.

867
00:48:23,440 --> 00:48:27,400
So at this point, where we're in our discussion, we don't need to know anything about what's

868
00:48:27,400 --> 00:48:28,400
inside of our pages.

869
00:48:28,400 --> 00:48:31,079
Like again, we don't care whether there's indexes or tuples.

870
00:48:31,079 --> 00:48:34,800
We just need to know for a given page, where, how do I go find it and how to keep track

871
00:48:34,800 --> 00:48:37,680
of what pages I actually have.

872
00:48:37,680 --> 00:48:43,720
So tree files is basically store, um, you can store the, uh, like sort of, in the leaf

873
00:48:43,720 --> 00:48:47,599
nodes, you can store the actual pages themselves or you can, you can have a hash table.

874
00:48:47,599 --> 00:48:51,079
I, I say M, uh, or some sort of files.

875
00:48:51,079 --> 00:48:54,920
This is something from like the 70s, my SQL usage, it's by default.

876
00:48:54,920 --> 00:48:58,599
It's not that common anymore, but again, it's another way to sort of keep track of things.

877
00:48:58,599 --> 00:49:01,319
And then hashing file is, again, use the hash table to look up.

878
00:49:01,319 --> 00:49:03,400
Heat file is going to be the most common one.

879
00:49:03,400 --> 00:49:06,319
Um, but these other methods exist.

880
00:49:06,319 --> 00:49:08,880
And then for the log, structure stuff, we'll see that next class.

881
00:49:08,880 --> 00:49:13,119
Uh, how this is?

882
00:49:13,119 --> 00:49:14,920
The directory is really keeping track.

883
00:49:14,920 --> 00:49:17,960
You still want to use potentially heat file to keep track of what, what things are.

884
00:49:17,960 --> 00:49:20,320
Can, because we don't care about what's it, we don't care at this point with inside the

885
00:49:20,320 --> 00:49:21,320
pages.

886
00:49:21,320 --> 00:49:23,320
All right.

887
00:49:23,320 --> 00:49:27,960
So heat file is just going to be an un, uh, a collection of unorder pages, uh, where our

888
00:49:27,960 --> 00:49:29,240
tuples will be stored in random order.

889
00:49:29,240 --> 00:49:32,559
And again, the relational model allows us to do that because the relational model doesn't

890
00:49:32,559 --> 00:49:37,960
find, or doesn't says that the data doesn't have to be specified in exact order.

891
00:49:37,960 --> 00:49:42,440
Some systems might pre-sort them, uh, to make things faster for other, other effects.

892
00:49:42,440 --> 00:49:46,519
But the relational model doesn't require you to do that.

893
00:49:46,519 --> 00:49:51,440
And so the only API we need in our storage manager to support a heat file is basically

894
00:49:51,440 --> 00:49:58,240
to create pages, get a page, write to a page, uh, delete a page, and then an iterator API

895
00:49:58,240 --> 00:50:03,159
allows the two, to squench the read pages to get the list of all the page IDs that we

896
00:50:03,159 --> 00:50:05,639
have and read over them.

897
00:50:05,639 --> 00:50:09,639
So managing this heat file is really easy to do.

898
00:50:09,639 --> 00:50:14,960
If your database is a single file, like inductee, B, or like in, in, in SQLite, right?

899
00:50:14,960 --> 00:50:19,799
Because all you need to do to find a given page is just know what the page number is.

900
00:50:19,799 --> 00:50:23,159
You know what the size of the page is because they all have to be the same size.

901
00:50:23,159 --> 00:50:27,759
And now you just do a simple arithmetic like take whatever the ID I'm looking for, multiply

902
00:50:27,759 --> 00:50:32,079
it by the, the size of the page, and then I can jump to whatever that offset is in the

903
00:50:32,079 --> 00:50:33,079
file.

904
00:50:33,079 --> 00:50:36,759
I don't know exactly what I'm looking for.

905
00:50:36,760 --> 00:50:41,080
If you go look in the SQLite documentation, they, they talk about how, uh, in, in the

906
00:50:41,080 --> 00:50:44,880
header of their, of their, the data file, all sort of the, the metadata that they keep

907
00:50:44,880 --> 00:50:48,880
track of basically do, do this trick here.

908
00:50:48,880 --> 00:50:52,120
Where things get tricky is if you have multiple files, which again, most systems do,

909
00:50:52,120 --> 00:50:54,480
Postgres does, my SQL does, Oracle does.

910
00:50:54,480 --> 00:50:58,880
And then now we need a way to say, all right, for given page number two, what file and

911
00:50:58,880 --> 00:51:04,000
at what offset, you know, what directory or what file and what offset has, has the page, uh,

912
00:51:04,000 --> 00:51:07,400
that I need.

913
00:51:07,400 --> 00:51:08,400
Right?

914
00:51:08,400 --> 00:51:10,519
And this is what a heat file page directory can get for us.

915
00:51:10,519 --> 00:51:14,559
You can think of it's like a hash table where you just keep track of, it's mapping from

916
00:51:14,559 --> 00:51:19,199
the page ID to, to the pages in the data file.

917
00:51:19,199 --> 00:51:23,440
And this typical would be, uh, sort of special file, you got the header of, of the, of the,

918
00:51:23,440 --> 00:51:27,760
the single database file, or at some special location inside of, uh, the database system and

919
00:51:27,760 --> 00:51:29,039
a directory.

920
00:51:29,039 --> 00:51:31,880
And you can sort of think is, it's a database when the, the database is, it's the database

921
00:51:31,880 --> 00:51:34,119
that keeps track of what's in your database.

922
00:51:34,119 --> 00:51:35,119
Right?

923
00:51:35,119 --> 00:51:37,840
The catalog is part of that as too, but this is like keeping track of where the physical

924
00:51:37,840 --> 00:51:39,960
location things are.

925
00:51:39,960 --> 00:51:45,440
And so this has to be kept in sync with the actual files on disk because I don't want to

926
00:51:45,440 --> 00:51:48,480
create a bunch of pages, not update my page directory.

927
00:51:48,480 --> 00:51:52,880
I crash and come back and now my page directory doesn't know about these other pages and I, I

928
00:51:52,880 --> 00:51:54,480
can't get to them.

929
00:51:54,480 --> 00:51:55,480
Right?

930
00:51:55,480 --> 00:51:57,680
So there's, there's a bunch of extra tricks we have to do to make sure that these things are

931
00:51:57,680 --> 00:51:59,519
maintained or kept in sync.

932
00:52:00,320 --> 00:52:03,759
Okay, so just thinking like I have a bunch of pages, they're on some, they're on some

933
00:52:03,759 --> 00:52:06,159
location, a bunch of files, doesn't matter where.

934
00:52:06,159 --> 00:52:09,719
And then it's just a mapping to tell you where to go find it.

935
00:52:09,719 --> 00:52:13,480
Additional metadata can keep track of like for every single page, you can keep track of

936
00:52:13,480 --> 00:52:14,759
an essential location.

937
00:52:14,759 --> 00:52:18,360
The number of free slots that they actually have or free space they have.

938
00:52:18,360 --> 00:52:22,320
So now, again, if I want to insert a tuple and I got to find a page to put it in, I don't

939
00:52:22,320 --> 00:52:24,960
want to have to scan them all and figure out who's got free space.

940
00:52:24,960 --> 00:52:27,000
My page directory would tell me that.

941
00:52:27,000 --> 00:52:28,000
Right?

942
00:52:29,000 --> 00:52:32,480
And then if I run out of pages, I know how to allocate them and then update my page directory

943
00:52:32,480 --> 00:52:33,400
to point this as well.

944
00:52:36,000 --> 00:52:39,039
Again, just think, think of a hash table that I've gotten written to this, it keeps track

945
00:52:39,039 --> 00:52:40,039
of the pages that I have.

946
00:52:40,039 --> 00:52:43,719
But then I can also again iterate or scan through and say here's page one, here's page

947
00:52:43,719 --> 00:52:44,719
two, here's page three.

948
00:52:44,719 --> 00:52:48,360
Because we're going to need this if we have an access method like a Spontural Scan operator.

949
00:52:48,360 --> 00:52:49,360
Right?

950
00:52:49,360 --> 00:52:52,039
If we don't have an index, we need to be able to iterate over there, every single tuple

951
00:52:52,039 --> 00:52:53,039
in the table.

952
00:52:53,039 --> 00:52:56,039
So the page directory needs to be to expose us that API.

953
00:52:56,039 --> 00:52:57,039
Yes.

954
00:52:57,039 --> 00:52:58,400
So the page and then case of a crash.

955
00:52:58,400 --> 00:53:03,599
So that means because the directory is part of the word time memory, do I also have to

956
00:53:03,599 --> 00:53:05,360
write it through the storage from there?

957
00:53:05,360 --> 00:53:06,360
Yes.

958
00:53:06,360 --> 00:53:09,440
So this question is, because the directory has to be brought in a memory in order to

959
00:53:09,440 --> 00:53:12,279
read it, it's a non-volta memory.

960
00:53:12,279 --> 00:53:15,159
So now if I crash, I don't want to lose it.

961
00:53:15,159 --> 00:53:17,400
Does that mean any changes that make to it have to be written at disk?

962
00:53:17,400 --> 00:53:18,719
Yes.

963
00:53:18,719 --> 00:53:25,360
But it's not as bad as like, you're not updating this thing all the time.

964
00:53:25,360 --> 00:53:30,920
So if you run out of space in your data as far as the allocate more pages, you're not

965
00:53:30,920 --> 00:53:32,720
going to allocate this one page.

966
00:53:32,720 --> 00:53:33,720
Right?

967
00:53:33,720 --> 00:53:35,360
Because then you can potentially do that for every single query.

968
00:53:35,360 --> 00:53:39,320
You're going to allocate like a gigabyte of data, update your page directory, that gets

969
00:53:39,320 --> 00:53:40,519
written at disk once.

970
00:53:40,519 --> 00:53:43,039
You make sure that's persisted and it's safe.

971
00:53:43,039 --> 00:53:44,039
Then you perceive it running the query.

972
00:53:44,039 --> 00:53:47,800
So that means any update to the directory has to be written at the top.

973
00:53:47,800 --> 00:53:48,800
Yes.

974
00:53:48,800 --> 00:53:50,800
So statement says, any update to the page directory has to be written at disk?

975
00:53:50,800 --> 00:53:51,800
Absolutely, yes.

976
00:53:51,800 --> 00:53:54,280
Because otherwise you don't know what you have.

977
00:53:54,280 --> 00:53:55,280
Yes.

978
00:53:55,280 --> 00:54:05,480
Is this stored in a special database file or is it stored along with other pages?

979
00:54:05,480 --> 00:54:07,800
What do you mean by it's special?

980
00:54:07,800 --> 00:54:09,120
Just like a separate file?

981
00:54:09,120 --> 00:54:10,120
Yes.

982
00:54:10,120 --> 00:54:12,440
So some says it's a separate file.

983
00:54:12,440 --> 00:54:16,600
SQLite was stored in the header of the file.

984
00:54:16,600 --> 00:54:18,600
Particularly stored separately.

985
00:54:18,600 --> 00:54:19,600
Yes.

986
00:54:20,119 --> 00:54:21,119
Yes.

987
00:54:21,119 --> 00:54:33,039
So this question is, when I say a data system can use multiple files, what I mean within

988
00:54:33,039 --> 00:54:36,799
one table does it contain multiple files or within the database does contain multiple

989
00:54:36,799 --> 00:54:37,799
files?

990
00:54:37,799 --> 00:54:38,799
Yes.

991
00:54:38,799 --> 00:54:39,799
Anyone?

992
00:54:39,799 --> 00:54:40,799
Does it?

993
00:54:40,799 --> 00:54:45,759
So does the user one file for all the tables say, SQLite?

994
00:54:45,759 --> 00:54:48,519
But I mean, we can pop up and press grass and just look in the data record.

995
00:54:48,519 --> 00:54:52,239
There's a bunch of files in there that have numbers in them and there are various data

996
00:54:52,239 --> 00:54:53,239
files.

997
00:54:53,239 --> 00:54:54,239
And sometimes they'll be for indexes.

998
00:54:54,239 --> 00:54:55,599
Sometimes they'll be for tables.

999
00:54:55,599 --> 00:54:56,599
Right?

1000
00:54:56,599 --> 00:54:59,039
And the various systems do different things.

1001
00:54:59,039 --> 00:55:03,559
And again, not to keep repeating myself, this is the beauty of SQL.

1002
00:55:03,559 --> 00:55:04,559
I don't know.

1003
00:55:04,559 --> 00:55:05,559
Don't care.

1004
00:55:05,559 --> 00:55:08,199
In my SQL queries, whether I have one file or a thousand files, right?

1005
00:55:08,199 --> 00:55:10,679
The data systems can decide how to do that.

1006
00:55:10,679 --> 00:55:13,159
It just knows how to run your query for you.

1007
00:55:13,159 --> 00:55:14,840
So again, different data systems do different things.

1008
00:55:14,840 --> 00:55:20,280
Do you know that you want to use multiple files for one table?

1009
00:55:20,280 --> 00:55:24,200
This question is, how do you know whether you want to use multiple files for one table?

1010
00:55:24,200 --> 00:55:26,200
Again, it depends.

1011
00:55:26,200 --> 00:55:35,320
So if we won't talk about large columns yet, but like, see, you have a table that has a

1012
00:55:35,320 --> 00:55:37,760
blob field or a text field.

1013
00:55:37,760 --> 00:55:40,000
And that's like 10 megabytes.

1014
00:55:40,000 --> 00:55:43,920
You'd want to store that in separate pages, but maybe you want to store that compressed

1015
00:55:43,920 --> 00:55:45,639
because there's a bunch of text data.

1016
00:55:45,639 --> 00:55:49,000
So you have the regular columns of the integers and floats, whatever.

1017
00:55:49,000 --> 00:55:50,000
That's sort of one file.

1018
00:55:50,000 --> 00:55:53,360
And then your large stuff is sort of another file, right?

1019
00:55:53,360 --> 00:55:55,519
So that's one approach, but you can imagine also too.

1020
00:55:55,519 --> 00:55:59,519
Maybe you just have some space in a single file with the top parts of the fixed stuff,

1021
00:55:59,519 --> 00:56:01,240
the bottom of the barrel length.

1022
00:56:01,240 --> 00:56:02,240
It depends.

1023
00:56:02,240 --> 00:56:11,039
I think my SQL, up to the 5.6, used to store, I think it was one file for all tables.

1024
00:56:11,039 --> 00:56:16,400
All databases, and they mentioned, no, it was one file per database, and they split

1025
00:56:16,400 --> 00:56:19,400
up to be one file in a per table.

1026
00:56:19,400 --> 00:56:22,239
And separate files are indexes.

1027
00:56:22,239 --> 00:56:23,239
Okay.

1028
00:56:23,239 --> 00:56:30,320
All right, so now we know sort of roughly what the files look like or how the files are laid

1029
00:56:30,320 --> 00:56:32,519
out and how we keep track of where they exist.

1030
00:56:32,519 --> 00:56:37,800
So let's not talk about what's actually inside the pages themselves.

1031
00:56:37,800 --> 00:56:43,400
Every page is going to have a header that's going to tell you something about what the

1032
00:56:43,400 --> 00:56:45,280
data actually is.

1033
00:56:45,280 --> 00:56:50,360
So a common thing would be like the page size or like a check sum, right?

1034
00:56:50,360 --> 00:56:54,800
So if you crash and come back or you start the system, actually anytime you fetch something

1035
00:56:54,800 --> 00:57:00,640
from disk, you computer fast check to sum to make sure that the data isn't corrupted.

1036
00:57:00,640 --> 00:57:04,280
Maybe keep track of the version of the database system that actually created the page.

1037
00:57:04,280 --> 00:57:07,680
That way if like you put it into a version that breaks compatibility, you can have

1038
00:57:07,679 --> 00:57:10,839
some code that knows how to still read the old data.

1039
00:57:10,839 --> 00:57:14,559
We won't talk about transactions until after the midterm, but like you can keep track of

1040
00:57:14,559 --> 00:57:18,879
like what thread or what transaction wrote to what data in this and whether it's actually

1041
00:57:18,879 --> 00:57:22,000
visible to whatever, whatever query you're running.

1042
00:57:22,000 --> 00:57:27,440
If the data is compressed or encoded in a certain way, which we'll discuss next week,

1043
00:57:27,440 --> 00:57:30,839
there'll be metadata about what, how, what the question scheme actually is.

1044
00:57:30,839 --> 00:57:35,559
There'll be information about what the, the schema is or what the table schema is as we

1045
00:57:35,559 --> 00:57:37,199
talk about Oracle does.

1046
00:57:37,199 --> 00:57:41,320
Sometimes there's additional statistics about what's in the data itself.

1047
00:57:41,320 --> 00:57:45,199
So like for a given column, what's the min value and the max value?

1048
00:57:45,199 --> 00:57:48,559
Because maybe I just need to read that instead of actually reading the data to figure out

1049
00:57:48,559 --> 00:57:50,840
whether there's something I need.

1050
00:57:50,840 --> 00:57:51,840
Right?

1051
00:57:51,840 --> 00:57:56,360
And again, as we are discussed, Oracle is famously self-contained, but not all systems

1052
00:57:56,360 --> 00:58:00,199
do that.

1053
00:58:00,199 --> 00:58:05,320
So now within the page itself, we need to decide how we actually want to organize the

1054
00:58:05,320 --> 00:58:06,320
tuple data.

1055
00:58:06,320 --> 00:58:07,320
Right?

1056
00:58:07,320 --> 00:58:10,800
So at this point in this lecture, we're going to assume that we're only storing tuples

1057
00:58:10,800 --> 00:58:11,800
in our pages.

1058
00:58:11,800 --> 00:58:13,640
We'll discuss indexes later.

1059
00:58:13,640 --> 00:58:17,840
And then we're going to assume that we're storing tuples in a row oriented manner.

1060
00:58:17,840 --> 00:58:21,960
Meaning like if I have five attributes, I will have a, I will have a tuple and I'll have

1061
00:58:21,960 --> 00:58:25,519
those five attributes continuously before I see the next tuple.

1062
00:58:25,519 --> 00:58:28,760
Next, or next week we'll see about column stores where you store this slightly different.

1063
00:58:28,760 --> 00:58:33,800
But for our purposes here, we assume it's, that's row oriented and we'll break this

1064
00:58:33,800 --> 00:58:34,800
next week.

1065
00:58:35,519 --> 00:58:39,120
All right, so there's 300 approaches of what could actually be in our pages.

1066
00:58:39,120 --> 00:58:42,960
So the tuple oriented storage where we're only storing tuples and the exact values that

1067
00:58:42,960 --> 00:58:46,960
those tuples have, there'll be a log structured approach where we just store deltiles of what

1068
00:58:46,960 --> 00:58:52,320
changed since the last time, since the last time these tuples updated.

1069
00:58:52,320 --> 00:58:54,760
And that should be indexed organized.

1070
00:58:54,760 --> 00:59:00,600
Indexed organized storage would be, it could be like a tree structure where in the leaf

1071
00:59:00,600 --> 00:59:03,120
nodes, I'm actually storing the data itself.

1072
00:59:03,119 --> 00:59:07,440
So today's lecture, we're only going to talk about the first one, tuple and storage.

1073
00:59:07,440 --> 00:59:10,039
And then next week we'll talk about the two other approaches.

1074
00:59:10,039 --> 00:59:11,039
Okay?

1075
00:59:11,039 --> 00:59:15,440
All right, so let's think about how do we actually want to store tuples in our pages?

1076
00:59:15,440 --> 00:59:16,440
Right?

1077
00:59:16,440 --> 00:59:20,159
So let's say we have a really simple approach where in our page header, we just keep track

1078
00:59:20,159 --> 00:59:23,719
of the number of tuples that we have.

1079
00:59:23,719 --> 00:59:28,679
And anytime we want to insert a new tuple, we just append to the end.

1080
00:59:28,679 --> 00:59:29,679
Right?

1081
00:59:29,679 --> 00:59:31,480
So we can assume our data's fixed length.

1082
00:59:31,480 --> 00:59:36,360
So if I want to insert a new tuple, I just go look at the header, see the number of tuples,

1083
00:59:36,360 --> 00:59:38,719
multiply that by the size of the tuple.

1084
00:59:38,719 --> 00:59:43,719
And that tells me where offset I want to write the page.

1085
00:59:43,719 --> 00:59:45,719
Which one?

1086
00:59:45,719 --> 00:59:47,240
Oh, lantern fly.

1087
00:59:47,240 --> 00:59:50,240
Just kill it.

1088
00:59:50,240 --> 00:59:58,240
Is anybody wanting to keep that alive?

1089
00:59:58,239 --> 01:00:02,079
For those in YouTube, we have a lantern fly infestation.

1090
01:00:02,079 --> 01:00:04,079
All right.

1091
01:00:04,079 --> 01:00:05,079
Right?

1092
01:00:05,079 --> 01:00:09,439
So is this a good idea or bad idea?

1093
01:00:09,439 --> 01:00:11,239
I said straw man, so obviously a bad idea.

1094
01:00:11,239 --> 01:00:12,239
Or why is it a bad idea?

1095
01:00:12,239 --> 01:00:17,719
If you have to delete a tuple, then it just stores everything out of order.

1096
01:00:17,719 --> 01:00:18,719
Right?

1097
01:00:18,719 --> 01:00:23,519
So if I delete a tuple, I delete tuple 2, if there was everything at order.

1098
01:00:23,519 --> 01:00:24,519
Right?

1099
01:00:25,239 --> 01:00:28,679
What I want to be able to do is insert a new tuple.

1100
01:00:28,679 --> 01:00:31,960
And I don't want to put it at the end, I want to use this spot here.

1101
01:00:31,960 --> 01:00:33,800
So number of tuples is enough.

1102
01:00:33,800 --> 01:00:39,000
It made a keep track of where things are located, second side, where to put them in.

1103
01:00:39,000 --> 01:00:42,400
But it's going beyond what I'm showing here.

1104
01:00:42,400 --> 01:00:44,239
What's another obvious problem?

1105
01:00:44,239 --> 01:00:46,639
One of the tuples is like the new store on the page.

1106
01:00:46,639 --> 01:00:49,519
He said one of the tuples is too big to store in the page.

1107
01:00:49,519 --> 01:00:52,599
Yes, but also what if they're not fixed length?

1108
01:00:52,599 --> 01:00:55,639
Which most data is, is not fixed length.

1109
01:00:55,639 --> 01:00:58,519
Email addresses aren't the same size.

1110
01:00:58,519 --> 01:01:00,759
Android IDs aren't always the same size.

1111
01:01:00,759 --> 01:01:02,719
Now I can just sort of just a chart type, but what does that do?

1112
01:01:02,719 --> 01:01:05,039
That preallocates the space I need.

1113
01:01:05,039 --> 01:01:10,719
And if the largest email address is one kilobyte, then I have to store one kilobyte

1114
01:01:10,719 --> 01:01:14,880
for every single email address, even though it's not going to be using that space.

1115
01:01:14,880 --> 01:01:19,319
Then his comment is, well, what if the table can't fit in this page?

1116
01:01:19,319 --> 01:01:21,199
How do I spam multiple pages?

1117
01:01:21,199 --> 01:01:26,000
We'll discuss that next week, but also this also would not work.

1118
01:01:26,000 --> 01:01:27,639
So clearly, this is not enough for us.

1119
01:01:27,639 --> 01:01:34,159
We need additional embedded to keep track of how we're going to store this.

1120
01:01:34,159 --> 01:01:42,000
Another problem too is, again, if four couldn't go here, I couldn't fill the gap when I deleted

1121
01:01:42,000 --> 01:01:43,000
two.

1122
01:01:43,000 --> 01:01:46,039
If four needs to go here, then I'm wasting space.

1123
01:01:46,039 --> 01:01:50,879
But if I want to maybe move three up, but now I have to tell the rest of the system that

1124
01:01:50,880 --> 01:01:57,320
I moved three, because I haven't told you how I'm pointing to three, how I find three,

1125
01:01:57,320 --> 01:02:00,760
but assuming it's going to be like some offset within this page.

1126
01:02:00,760 --> 01:02:05,079
But now if I'm moving three, then I have to go update every possible index that is maybe

1127
01:02:05,079 --> 01:02:06,079
pointing to it.

1128
01:02:06,079 --> 01:02:10,119
And that's going to be super expensive.

1129
01:02:10,119 --> 01:02:15,079
So the most common approach to handle this problem is called it's Slotted Pages.

1130
01:02:15,079 --> 01:02:19,200
And what I'll describe here isn't going to be exactly how every system does this, but

1131
01:02:19,199 --> 01:02:21,119
at a high level, this is what everyone is doing.

1132
01:02:21,119 --> 01:02:26,319
If you're a row-oriented database system that's using tuple-oriented pages, so not log

1133
01:02:26,319 --> 01:02:30,079
structured, then they're doing something that looks like this.

1134
01:02:30,079 --> 01:02:34,359
So we're going to have a header, and keep track of all the metadata we talked about

1135
01:02:34,359 --> 01:02:35,359
for.

1136
01:02:35,359 --> 01:02:42,039
Then after the header, we'll have the Slot array, where the, at every position in that

1137
01:02:42,039 --> 01:02:48,199
Slot array is going to point to some tuple in our page.

1138
01:02:48,199 --> 01:02:52,079
And the tuples will be starting at the bottom, at the end of the page.

1139
01:02:52,079 --> 01:02:55,759
So at the bottom, we'll have all the fixed length and bar length tuple data.

1140
01:02:55,759 --> 01:02:58,719
For now, assume that everything is put together.

1141
01:02:58,719 --> 01:03:03,679
So meaning like, if you have a really large value, it isn't stored in separate page.

1142
01:03:03,679 --> 01:03:07,679
The entire tuple has to be stored inside this page.

1143
01:03:07,679 --> 01:03:12,319
And so the Slot array is just going to be storing fixed length offsets to where to find

1144
01:03:12,319 --> 01:03:15,439
the starting location of individual tuples.

1145
01:03:15,440 --> 01:03:21,599
And maybe you could also store the size and the tuple in the header if you wanted to.

1146
01:03:21,599 --> 01:03:29,440
So now what's going to happen is, as we need to update the table and add new pages, sorry,

1147
01:03:29,440 --> 01:03:33,480
add new tuples inside the page, the Slot array is going to grow from the beginning to the

1148
01:03:33,480 --> 01:03:34,800
end.

1149
01:03:34,800 --> 01:03:39,679
And then all our tuple data is going to grow from the end to the beginning.

1150
01:03:39,679 --> 01:03:44,519
And at any single time, I add a new entry into my Slot array, sorry, new tuple.

1151
01:03:44,519 --> 01:03:51,159
I update the Slot array to tell me where to go find it.

1152
01:03:51,159 --> 01:03:56,639
So now if I go back to the problem I had before where I say I deleted tuple 3, well, this

1153
01:03:56,639 --> 01:04:00,559
is fine because I didn't move any other tuples.

1154
01:04:00,559 --> 01:04:03,639
The Slot array for four still points to it.

1155
01:04:03,639 --> 01:04:07,679
So I don't have to tell any other part of the system that I moved for.

1156
01:04:07,679 --> 01:04:13,280
But even if I now want to reclaim this space that I've been or three used to be and I've

1157
01:04:13,280 --> 01:04:20,240
deleted, if I want to slide three or four over to take to compact it, all they need to

1158
01:04:20,240 --> 01:04:27,640
do now is just update the Slot array to point to the new offset, which is easy to do.

1159
01:04:27,640 --> 01:04:28,640
I don't have to.

1160
01:04:28,640 --> 01:04:30,240
Again, relational model says I don't have to do this.

1161
01:04:30,240 --> 01:04:31,240
Some systems do.

1162
01:04:31,240 --> 01:04:32,240
Some systems don't.

1163
01:04:32,240 --> 01:04:34,240
We'll see this in a second.

1164
01:04:34,240 --> 01:04:37,480
And this is all fine.

1165
01:04:37,480 --> 01:04:40,240
So this is what SQLite does.

1166
01:04:40,239 --> 01:04:41,239
This is what Postgres does.

1167
01:04:41,239 --> 01:04:42,239
This is what my SQL does.

1168
01:04:42,239 --> 01:04:44,239
SQL server does this.

1169
01:04:44,239 --> 01:04:46,000
This Slot page is the most common approach.

1170
01:04:46,000 --> 01:04:50,239
This is what everyone does.

1171
01:04:50,239 --> 01:04:51,239
Yes.

1172
01:04:51,239 --> 01:04:55,239
Do you think you use the Slot number starting?

1173
01:04:55,239 --> 01:04:56,239
Like if you are doing something wrong.

1174
01:04:56,239 --> 01:05:00,559
So this question is, can I reuse Slot position three if I start a new tuple?

1175
01:05:00,559 --> 01:05:01,559
Yes.

1176
01:05:01,559 --> 01:05:03,559
But I don't have to put that in front of four.

1177
01:05:03,559 --> 01:05:04,559
I can put it anywhere.

1178
01:05:04,559 --> 01:05:05,559
Other questions?

1179
01:05:06,559 --> 01:05:07,559
Yes.

1180
01:05:07,559 --> 01:05:12,559
What does this call be like wasting a small amount of memory?

1181
01:05:12,559 --> 01:05:15,559
It's like the people are like that.

1182
01:05:15,559 --> 01:05:16,559
Yeah.

1183
01:05:16,559 --> 01:05:23,559
So her statement is her question is, wouldn't this be wasting space if the tuples are variable

1184
01:05:23,559 --> 01:05:24,559
length?

1185
01:05:24,559 --> 01:05:25,559
Yeah.

1186
01:05:25,559 --> 01:05:32,559
So again, my tuples are growing from the tuple data is going from the end to the beginning.

1187
01:05:32,559 --> 01:05:34,559
Slot array is going from the beginning to the end.

1188
01:05:34,559 --> 01:05:39,559
At some point I'm going to run out of space and there might be a little space in the middle

1189
01:05:39,559 --> 01:05:40,559
that I can't use for anything.

1190
01:05:40,559 --> 01:05:41,559
Is that wasted?

1191
01:05:41,559 --> 01:05:42,559
Yes.

1192
01:05:42,559 --> 01:05:49,559
But the advantage we get of not having to update other things any time we shuffle the order

1193
01:05:49,559 --> 01:05:58,559
of the Slot array is worth that cost.

1194
01:05:58,559 --> 01:05:59,559
Okay.

1195
01:06:00,559 --> 01:06:09,559
So now assuming we're sort of thinking of Slot array pages, now we need to wait to identify tuples.

1196
01:06:09,559 --> 01:06:13,559
And this, or this one we're going to use, this was the notion of a record ID.

1197
01:06:13,559 --> 01:06:16,559
Different data systems might call this the row ID or the row number.

1198
01:06:16,559 --> 01:06:26,559
But the high level, the way to think about it is a way to uniquely identify some logical tuple based on its physical location inside of a file

1199
01:06:26,559 --> 01:06:27,559
page.

1200
01:06:27,559 --> 01:06:36,559
And it's typically going to be a combination of like a file number, an ID number, the page number, and then the slot number that corresponds where they exist in that Slot array.

1201
01:06:36,559 --> 01:06:43,559
So that when you want to do a lookup, say, I need this tuple, if you have the record ID, you would then look in the page directory and

1202
01:06:43,559 --> 01:06:45,559
figure out what page has it.

1203
01:06:45,559 --> 01:06:53,559
To go grab that page, then use the slot number inside the Slot array to figure out where the, you know, what offset inside that page has the data you're looking for.

1204
01:06:54,559 --> 01:06:56,559
So most data, this is not stored this record ID.

1205
01:06:56,559 --> 01:06:58,559
This is something that synthesize materialize.

1206
01:06:58,559 --> 01:07:08,559
Again, based on the page directory, you know, of, of, of, or how you keep track of how to find things, meaning like within the tuple data itself, I'm not storing this record ID.

1207
01:07:08,559 --> 01:07:13,559
SQLite does store this as a separate column that you, not supposed to see, but you can get to it.

1208
01:07:13,559 --> 01:07:22,559
And the way they do the reason why they do this is because this is how they're going to, they're going to use this as the primary key to allow them to identify individual tuples.

1209
01:07:23,559 --> 01:07:28,559
So if I get, we haven't talked about secondary indexes, but I have an index that's not the primary key index.

1210
01:07:28,559 --> 01:07:37,559
My, my value when I, when I do, when I do my lookup on a key is going to be that row ID, which I then use on the primary key row ID index, the find the data I need.

1211
01:07:37,559 --> 01:07:40,559
Different systems do different things.

1212
01:07:40,559 --> 01:07:44,559
So the size of this is going to vary based on implementation.

1213
01:07:44,559 --> 01:07:46,559
So postgres is going to be six, six bytes.

1214
01:07:46,559 --> 01:07:49,559
SQLite is going to be eight bytes or 64 bits.

1215
01:07:49,559 --> 01:07:55,559
SQL Server has an eight byte one and then Oracle has a 10 byte record ID.

1216
01:07:55,559 --> 01:07:58,559
Again, you can see this directly in the database system.

1217
01:07:58,559 --> 01:08:01,559
So we can do a quick demo just to show you all this.

1218
01:08:04,559 --> 01:08:07,559
So you're not supposed to use this in your application, right?

1219
01:08:07,559 --> 01:08:14,559
So even though this would uniquely identify a, a tuple, again, it's, it's the physical location of it.

1220
01:08:14,559 --> 01:08:33,559
And it could change, meaning like if I insert a tuple and I get a record ID, if I, if my application then references it, the problem could be like I could run compaction or garbage collection or in postgres is called the vacuum, where I could reorganize that page where maybe now the slot number changes or the page number changes.

1221
01:08:33,559 --> 01:08:35,559
And now the thing I'm looking for isn't there anymore.

1222
01:08:35,560 --> 01:08:47,560
So again, this is the physical aspect of the database system that we're not supposed to really use in our application, but it's exposed to us because if we need to administer and maintain these systems, we need to know where the data actually is.

1223
01:08:50,560 --> 01:08:53,560
So let me log in, okay, sorry.

1224
01:08:53,560 --> 01:09:03,560
I'm going to need to reconnect, sorry.

1225
01:09:03,560 --> 01:09:06,560
All right, so we do postgres first.

1226
01:09:06,560 --> 01:09:13,560
So we're going to create a really simple table R that just has three tuples.

1227
01:09:14,560 --> 01:09:18,560
Right, 101, 101, 102.

1228
01:09:18,560 --> 01:09:21,560
So postgres has something called the CTID.

1229
01:09:21,560 --> 01:09:29,560
And this is going to be a tuple now that's going to give you the page number and then the slot number.

1230
01:09:29,560 --> 01:09:34,560
So these tuples here are page zero, slot one, slot two, slot three.

1231
01:09:34,560 --> 01:09:35,560
Right.

1232
01:09:35,560 --> 01:09:42,560
So now if I, say I actually, the second tuple, I delete 101.

1233
01:09:43,560 --> 01:09:53,560
Now when I do my scan, again, now you can see that postgres decided to delete the tuple, but it didn't move things around.

1234
01:09:53,560 --> 01:09:59,560
Right, I let the data where it actually, you know, where it actually lives.

1235
01:09:59,560 --> 01:10:02,560
But now I can run garbage, the garbage collection.

1236
01:10:02,560 --> 01:10:05,560
Actually, let me, let me start a tuple back.

1237
01:10:06,560 --> 01:10:09,560
So I'm certain one of three.

1238
01:10:09,560 --> 01:10:14,560
Now you can see again, it didn't take that, that, that O2 slot from the first tuple I deleted.

1239
01:10:14,560 --> 01:10:17,560
And just a pen it to the end put it in slot four.

1240
01:10:17,560 --> 01:10:20,560
Right.

1241
01:10:20,560 --> 01:10:28,560
So then I get, I can now run the, again, postgres, it's called the vacuum.

1242
01:10:28,560 --> 01:10:30,560
So the command is vacuum.

1243
01:10:30,560 --> 01:10:31,560
Again, this is a postgres idiom.

1244
01:10:31,560 --> 01:10:39,560
So vacuum four is going to have postgres basically compact every single page and write out a new, new, new pages, new files.

1245
01:10:39,560 --> 01:10:42,560
So I have a bunch of pages that are, that are empty.

1246
01:10:42,560 --> 01:10:46,560
It'll, it'll release them when it, when it creates a new version.

1247
01:10:46,560 --> 01:10:49,560
So now when I do that same query before, right.

1248
01:10:49,560 --> 01:10:51,560
Now you see decided to compact it, right.

1249
01:10:51,560 --> 01:10:57,560
But one, but, oh, one, oh two, oh three, right.

1250
01:10:57,560 --> 01:10:58,560
Makes sense?

1251
01:10:58,560 --> 01:10:59,560
Yes.

1252
01:10:59,560 --> 01:11:06,560
So is this, um, this is like, you refer to the, you know, page number and offset slot, slot number.

1253
01:11:06,560 --> 01:11:11,560
So is it, is a slot number, like in the, like going backward or in the slot array?

1254
01:11:11,560 --> 01:11:12,560
It's in the slot array.

1255
01:11:12,560 --> 01:11:13,560
Oh.

1256
01:11:13,560 --> 01:11:16,560
Because then you use the slot array to say what offset it within the page, right.

1257
01:11:16,560 --> 01:11:17,560
I find what I need.

1258
01:11:17,560 --> 01:11:18,560
Yes.

1259
01:11:18,560 --> 01:11:23,560
The slot array can be one index, because there's something at zero, like metadata.

1260
01:11:23,560 --> 01:11:28,560
So the question is, the, the slot array starts at zero index, even the page turns at zero index.

1261
01:11:28,560 --> 01:11:34,560
Sorry, slot array starts at one index, page turns at zero index, is there something in, uh, in one.

1262
01:11:34,560 --> 01:11:35,560
Let's find out.

1263
01:11:35,560 --> 01:11:40,560
So you're not supposed to do this, but you can do, you can actually query this, right.

1264
01:11:40,560 --> 01:11:46,560
C tidy equals, and oh, oh.

1265
01:11:46,560 --> 01:11:48,560
That doesn't have anything there.

1266
01:11:48,560 --> 01:11:49,560
But I can get the other one.

1267
01:11:49,560 --> 01:11:52,560
So I, I don't know why they do that.

1268
01:11:52,560 --> 01:11:53,560
Yes.

1269
01:11:53,560 --> 01:11:58,560
So when you say the ID, it's by, uh, on the, uh, what is that?

1270
01:11:58,560 --> 01:12:01,560
You know, it's basically, uh, the limit on the limit on the, uh, the limit.

1271
01:12:01,560 --> 01:12:07,560
Same, same it is, um, when we say a slot, uh, the, the C tidy is going to be six bytes.

1272
01:12:07,560 --> 01:12:11,560
So it's probably a four byte page number, and then a two byte offset.

1273
01:12:11,560 --> 01:12:14,560
Doesn't that limit the number of slots we can have in a page?

1274
01:12:14,560 --> 01:12:15,560
Yes.

1275
01:12:15,560 --> 01:12:17,560
But postgres is by default is eight kilobyte page sizes.

1276
01:12:17,560 --> 01:12:21,560
So you can't have a billion two-poles in a single page.

1277
01:12:21,560 --> 01:12:24,560
All right. So let's, let's look at all the systems.

1278
01:12:24,560 --> 01:12:27,560
So again, SQLite is, it's different.

1279
01:12:27,560 --> 01:12:30,560
So SQLite, uh, you have this row ID.

1280
01:12:30,560 --> 01:12:33,560
Again, and it's actually storing this, right.

1281
01:12:33,560 --> 01:12:35,560
It's a 64 bit integer, and it actually stores this.

1282
01:12:35,560 --> 01:12:38,560
So like, uh, it uses this as the primary key.

1283
01:12:38,560 --> 01:12:39,560
Yes.

1284
01:12:39,560 --> 01:12:44,560
So the size of the two will sort somewhere, typically in the header of the two-poles.

1285
01:12:44,560 --> 01:12:47,560
Yes.

1286
01:12:48,560 --> 01:12:52,560
All right. So this, so if we delete from, uh,

1287
01:12:52,560 --> 01:12:55,560
what will delete a two-pole?

1288
01:12:55,560 --> 01:12:57,560
Around the same query, right?

1289
01:12:57,560 --> 01:13:00,560
It does, it doesn't reuse the row ID.

1290
01:13:00,560 --> 01:13:03,560
Because it's actually a physical thing of the primary key.

1291
01:13:03,560 --> 01:13:10,560
All right. So let's do now, SQL server.

1292
01:13:10,560 --> 01:13:13,560
So SQL server has this different syntax.

1293
01:13:13,560 --> 01:13:16,560
It has this double, as hard to see.

1294
01:13:16,560 --> 01:13:19,560
If I highlight it, can you see it?

1295
01:13:19,560 --> 01:13:21,560
No.

1296
01:13:21,560 --> 01:13:23,560
There's two percent, there's percent signs there.

1297
01:13:23,560 --> 01:13:27,560
Trust me.

1298
01:13:27,560 --> 01:13:34,560
Sorry, let's go back.

1299
01:13:34,560 --> 01:13:36,560
All right, there you go.

1300
01:13:36,560 --> 01:13:39,560
There's percent signs. Sorry.

1301
01:13:39,560 --> 01:13:43,560
So when you run this, you get back some, some hex data like this, right?

1302
01:13:43,560 --> 01:13:45,560
What does this mean?

1303
01:13:45,560 --> 01:13:48,560
So there is a undocumented command.

1304
01:13:48,560 --> 01:13:52,560
Actually, this is all, like, this is all you're not supposed to do this, but you can't.

1305
01:13:52,560 --> 01:13:54,560
Like it's, it's not documented.

1306
01:13:54,560 --> 01:13:56,560
I mean, Microsoft doesn't officially support this.

1307
01:13:56,560 --> 01:14:00,560
But there is a command called whatever, this function here,

1308
01:14:00,560 --> 01:14:02,560
and you pass in the physical location,

1309
01:14:02,560 --> 01:14:06,560
and then you'll get back now the formatted file number,

1310
01:14:06,560 --> 01:14:10,560
the page number, and then the slot number, right?

1311
01:14:10,560 --> 01:14:12,560
And you can actually, it's interesting in,

1312
01:14:12,560 --> 01:14:15,560
I learned this today, you can actually get back what the,

1313
01:14:15,560 --> 01:14:17,560
that function is actually doing.

1314
01:14:17,560 --> 01:14:21,560
So you can get it to spit back the, what it actually does.

1315
01:14:21,560 --> 01:14:23,560
And you see here, whether they're taking that physical location,

1316
01:14:23,560 --> 01:14:26,560
and how they're jumping to different bytes to get the,

1317
01:14:26,560 --> 01:14:30,560
the page ID, file number, and the slot number, right?

1318
01:14:30,560 --> 01:14:32,560
So let's do the same thing we did before.

1319
01:14:32,560 --> 01:14:35,560
Let's delete 101.

1320
01:14:35,560 --> 01:14:40,560
Then we'll run the same query to get the page number offsets, right?

1321
01:14:40,560 --> 01:14:44,560
So in this case here, it didn't move anything, right?

1322
01:14:44,560 --> 01:14:47,560
So now if we insert our tool back,

1323
01:14:47,560 --> 01:14:52,560
or insert a new tool, run that same query.

1324
01:14:52,560 --> 01:14:55,560
Now look what it did.

1325
01:14:55,560 --> 01:15:00,560
So my tool for, with ID 102, that was that slot 2,

1326
01:15:00,560 --> 01:15:05,560
but when I inserted the new tool, it moved that second tool 102

1327
01:15:05,560 --> 01:15:09,560
into slot 2, and then put the, the new tool into slot 3.

1328
01:15:09,560 --> 01:15:11,560
Postgres didn't do that, right?

1329
01:15:11,560 --> 01:15:14,560
Postgres just kept depending on the end.

1330
01:15:14,560 --> 01:15:17,560
Is this wrong?

1331
01:15:17,560 --> 01:15:20,560
Who knows?

1332
01:15:20,560 --> 01:15:21,560
Is it better?

1333
01:15:21,560 --> 01:15:22,560
Who knows?

1334
01:15:22,560 --> 01:15:23,560
Right?

1335
01:15:23,560 --> 01:15:27,560
And the reason why you can do this is because when you fetch a page

1336
01:15:27,560 --> 01:15:30,560
and bring it to memory, and you start, you know,

1337
01:15:30,560 --> 01:15:34,560
inserting a tuple into it, you're holding the latch or the lock on that page,

1338
01:15:34,560 --> 01:15:37,560
the, the data is going to decide whether once you do compaction

1339
01:15:37,560 --> 01:15:40,560
or whatever the optimization wants to do, because it knows that no of the thread

1340
01:15:40,560 --> 01:15:42,560
can write to that page at the same time.

1341
01:15:42,560 --> 01:15:46,560
So we can decide whether or not we want to, you know,

1342
01:15:46,560 --> 01:15:50,560
compact it or not as we do it. Postgres doesn't do it, SQL Server does.

1343
01:15:50,560 --> 01:15:55,560
All right, this is the good everyone's favorite Oracle.

1344
01:15:55,560 --> 01:16:00,560
I need to create the table first, I think.

1345
01:16:00,560 --> 01:16:05,560
I don't think it's going to let me do that.

1346
01:16:05,560 --> 01:16:13,560
No, it did. All right, so, so in Oracle, they have a row ID, right?

1347
01:16:13,560 --> 01:16:18,560
But you get, again, some binary data here, right?

1348
01:16:18,560 --> 01:16:22,560
Again, this is stack of a flow, this is not me,

1349
01:16:22,560 --> 01:16:26,560
but there's much of function you can do around this, right?

1350
01:16:26,560 --> 01:16:29,560
And then you see now they're storing an logic ID, a file number,

1351
01:16:29,560 --> 01:16:34,560
a block number, or the page number, and then the row slot, right?

1352
01:16:34,560 --> 01:16:37,560
So again, this is something, taking something that's defined in the textbook,

1353
01:16:37,560 --> 01:16:41,560
describing it like a logical level, or describing it as a theoretical level,

1354
01:16:41,560 --> 01:16:44,560
here's how to organize your database system, and then you can see different

1355
01:16:44,560 --> 01:16:48,560
invitations of it. Through SQL, you can then see how they are storing slots,

1356
01:16:48,560 --> 01:16:53,560
sort of things in a lot of pages. All right?

1357
01:16:53,560 --> 01:17:02,560
All right, so in the sake of time, I think I'm going to skip.

1358
01:17:02,560 --> 01:17:12,560
I mean, this will segue into next class, but the two-bow itself is just going to be a sequence of bytes, right?

1359
01:17:12,560 --> 01:17:15,560
There's some header, and then a byte sequence.

1360
01:17:15,560 --> 01:17:19,560
And then it's up for the database system to know how to interpret those bytes based on the type,

1361
01:17:19,560 --> 01:17:23,560
and, you know, based on the values that nature looking at.

1362
01:17:23,560 --> 01:17:26,560
So again, we'll cover this next class, but the way to think about this is like,

1363
01:17:26,560 --> 01:17:29,560
there'll be some header that contains information about whether this two-bow's,

1364
01:17:29,560 --> 01:17:32,560
this or not, we can store it, you know, whether or not we want to store,

1365
01:17:32,560 --> 01:17:38,560
keep track of what columns have nulls, and then the execution engine will know how to get

1366
01:17:38,560 --> 01:17:41,560
jumped to different offsets within the tuple based on the schema.

1367
01:17:41,560 --> 01:17:48,560
So again, we'll cover this in next class, but just to finish up,

1368
01:17:48,560 --> 01:17:51,560
the, again, what are we discussed today?

1369
01:17:51,560 --> 01:17:53,560
There's a database system. It's going to be stored, it's going to be maintained database,

1370
01:17:53,560 --> 01:17:58,560
a database is going to be tracked in, across different files, and it can broken up into pages,

1371
01:17:58,560 --> 01:18:01,560
and then we have different ways of keep track of those pages, keep track of what's

1372
01:18:01,560 --> 01:18:04,560
and how to store things in those pages, and then next class we'll talk about what

1373
01:18:04,560 --> 01:18:06,560
how to store action to tuples, okay?

1374
01:18:06,560 --> 01:18:10,560
So again, let's go to the next class, have a good weekend, see ya, get in.

1375
01:18:28,560 --> 01:18:33,560
I'm the poppy with the motherfucking ho-ho 28-a-gram, depending on if it's the pop,

1376
01:18:33,560 --> 01:18:37,560
you ain't hit them all yet, still got your shirt up, I smack you with the bottom of the clip

1377
01:18:37,560 --> 01:18:41,560
and tell you, look up, show me what it's safe set for, I blow your face back,

1378
01:18:41,560 --> 01:18:45,560
I got a block on tap, the fets can't trace that, style is like temp, but proof,

1379
01:18:45,560 --> 01:18:49,560
you can't lace that, at the Dominicin, oh you the, call me Dominicin, black Skelly,

1380
01:18:49,560 --> 01:18:54,560
black, nothing, black, sweat, dimmelins, my whole black, 38, send you to the purdigate,

1381
01:18:54,560 --> 01:18:57,560
you get the zombie trying to skate, and that's your first mistake,

1382
01:18:57,560 --> 01:19:00,560
I ain't lying for that cake, your family, see ya, wait, my grand's is happy, wait,

1383
01:19:00,560 --> 01:19:03,560
they ran through every state, were they acting how I'm living,

1384
01:19:03,560 --> 01:19:05,560
I tell them I'm living great.

