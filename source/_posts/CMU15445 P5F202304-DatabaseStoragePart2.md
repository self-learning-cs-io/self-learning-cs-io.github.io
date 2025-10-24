---
title: CMU15445 P5F202304 DatabaseStoragePart2
---

1
00:00:00,000 --> 00:00:27,280
Let's get started.

2
00:00:27,280 --> 00:00:34,280
So you got to show this weekend, right?

3
00:00:34,280 --> 00:00:35,280
Yeah.

4
00:00:35,280 --> 00:00:36,280
You don't know where it is.

5
00:00:36,280 --> 00:00:37,280
No.

6
00:00:37,280 --> 00:00:38,280
You don't know when it is.

7
00:00:38,280 --> 00:00:39,280
When it is.

8
00:00:39,280 --> 00:00:40,280
When it is.

9
00:00:40,280 --> 00:00:41,280
When it is.

10
00:00:41,280 --> 00:00:42,280
When it is.

11
00:00:42,280 --> 00:00:43,280
When it is.

12
00:00:43,280 --> 00:00:44,280
When it is.

13
00:00:44,280 --> 00:00:45,280
When it is.

14
00:00:45,280 --> 00:00:46,280
When it is.

15
00:00:46,280 --> 00:00:47,280
When it is.

16
00:00:47,280 --> 00:00:48,280
When it is.

17
00:00:48,280 --> 00:00:49,280
When it is.

18
00:00:49,280 --> 00:00:50,280
When it is.

19
00:00:50,280 --> 00:00:51,280
When it is.

20
00:00:51,280 --> 00:00:52,280
When it is.

21
00:00:52,280 --> 00:00:53,280
When it is.

22
00:00:53,280 --> 00:00:54,280
When it is.

23
00:00:54,280 --> 00:00:55,280
When it is.

24
00:00:55,280 --> 00:00:56,280
When it is.

25
00:00:56,280 --> 00:00:57,280
When it is.

26
00:00:57,280 --> 00:01:03,600
So, on the dock of you guys, obviously Project Zero was due last night.

27
00:01:03,600 --> 00:01:06,359
We haven't gone through yet and looked at results for everyone.

28
00:01:06,359 --> 00:01:09,000
I think we had about 150 something people completed.

29
00:01:09,000 --> 00:01:11,200
That's good.

30
00:01:11,200 --> 00:01:16,359
Project One is out and that will be due on, sorry, homework One has been out for a while,

31
00:01:16,359 --> 00:01:21,319
but we bumped the deadline up to this, like, 15, four days from now.

32
00:01:21,319 --> 00:01:23,560
So that should be reflected in grade scope.

33
00:01:23,560 --> 00:01:27,640
And then Project One is out and that will be due on October 1st.

34
00:01:27,640 --> 00:01:29,640
Any questions about homework One?

35
00:01:29,640 --> 00:01:34,320
I know there's so many posts on Piazza about Project One, the leaderboard assignment doesn't

36
00:01:34,320 --> 00:01:35,320
work yet.

37
00:01:35,320 --> 00:01:41,760
We're fixing that and we'll push that on GitHub later this week.

38
00:01:41,760 --> 00:01:47,000
Then I'll announce on Wednesday what the leaderboard is, what the implications of it are, and

39
00:01:47,000 --> 00:01:48,000
why it matters.

40
00:01:48,000 --> 00:01:49,000
Okay?

41
00:01:49,000 --> 00:01:51,040
All right.

42
00:01:51,040 --> 00:01:53,720
The other thing is going on for additional things.

43
00:01:53,720 --> 00:01:57,160
If you want to learn beyond the stuff we're talking about in the course, there's a couple

44
00:01:57,160 --> 00:02:00,440
of database talks that are coming up.

45
00:02:00,440 --> 00:02:05,040
So today, after class at 430, we're having the quadrant guys at a Germany.

46
00:02:05,040 --> 00:02:10,960
They're one of these vector databases that target LLMs or chat TVT kind of setups.

47
00:02:10,960 --> 00:02:15,640
They'll be talking about the internals of their system and that'll be again 430 over Zoom.

48
00:02:15,640 --> 00:02:19,759
Tomorrow at 6pm, the Databricks people are giving talks somewhere.

49
00:02:19,759 --> 00:02:24,639
It's a recording talk, but that means they're probably going to feed you.

50
00:02:24,639 --> 00:02:27,879
And then you can talk to them about getting jobs there.

51
00:02:27,879 --> 00:02:31,919
Databricks has hired pretty much almost all my best students in the last two or three

52
00:02:31,919 --> 00:02:32,919
years.

53
00:02:32,919 --> 00:02:37,959
They've all gone to Databricks and I was there in July and they're all doing great.

54
00:02:37,959 --> 00:02:40,319
They have a lot of money and they don't give us any.

55
00:02:40,319 --> 00:02:42,199
It's a little problem.

56
00:02:42,199 --> 00:02:47,199
And then Auditron is actually my startup, but my former PhD student who's a co-founder

57
00:02:47,199 --> 00:02:52,199
with the Dan of Anakon, she'll be giving a talk about what we're doing using machine

58
00:02:52,199 --> 00:02:53,519
learning optimized database systems.

59
00:02:53,519 --> 00:02:55,519
I've posted this my sequel next week.

60
00:02:55,519 --> 00:02:56,519
Yes.

61
00:02:56,519 --> 00:02:59,280
We're going to have an information about the location of these.

62
00:02:59,280 --> 00:03:02,919
So my talks, the Quadrant one, the Q-Outer-2 one, that's on Zoom.

63
00:03:02,919 --> 00:03:07,039
And then if you go on the slides, the link here will take you to whatever it is on the calendar.

64
00:03:07,039 --> 00:03:08,560
It's somewhere in Gates.

65
00:03:08,560 --> 00:03:09,560
Okay.

66
00:03:09,560 --> 00:03:10,560
For the Databricks one.

67
00:03:10,560 --> 00:03:11,560
Okay, it's all over the slide.

68
00:03:11,560 --> 00:03:12,560
Yeah.

69
00:03:12,560 --> 00:03:13,560
Other questions?

70
00:03:13,560 --> 00:03:14,560
Again, these are optional.

71
00:03:14,560 --> 00:03:17,000
These are like, if you want to go beyond the stuff, the document, the course.

72
00:03:17,000 --> 00:03:20,439
What I like about these kind of talks is, even if you don't understand anything right

73
00:03:20,439 --> 00:03:24,080
away, we'll hit these, a lot of these topics throughout the semester.

74
00:03:24,080 --> 00:03:28,240
And then you realize, I'm not crazy, well, I'm crazy, but not that crazy, but I'm not

75
00:03:28,240 --> 00:03:29,240
making stuff up.

76
00:03:29,240 --> 00:03:33,039
These are the things we're talking about in the semester, you need to know or clickable

77
00:03:33,039 --> 00:03:35,039
to building real systems.

78
00:03:35,039 --> 00:03:36,039
Okay.

79
00:03:36,039 --> 00:03:37,039
All right.

80
00:03:37,039 --> 00:03:43,560
So last class, we talked about the initial setup from what the framework you're going

81
00:03:43,560 --> 00:03:47,400
to have in our minds for describing how we're going to build a data management system.

82
00:03:47,400 --> 00:03:54,560
And we discussed how it was a disk oriented architecture where all the components in the

83
00:03:54,560 --> 00:04:01,120
system are really going to be based around this key premise that the primary search location

84
00:04:01,120 --> 00:04:06,640
of the database, when it is at rest, will be on some non-volatile disk.

85
00:04:06,640 --> 00:04:07,640
Right?

86
00:04:07,640 --> 00:04:09,800
An SSD spinning disk hard drive doesn't matter.

87
00:04:09,800 --> 00:04:14,200
And that the components of the system are really about moving the data back and forth

88
00:04:14,200 --> 00:04:17,120
between disk and memory because it's a Von Nomen architecture.

89
00:04:17,120 --> 00:04:19,879
You can't operate on it while it's at rest.

90
00:04:19,879 --> 00:04:20,879
Right?

91
00:04:20,879 --> 00:04:24,800
So that's really what the big picture of what we're trying to achieve.

92
00:04:24,800 --> 00:04:28,720
And of course, now since disk is slow, we need to do a bunch of tricks and a bunch of

93
00:04:28,720 --> 00:04:33,600
other techniques to hide the stalls of going to disk.

94
00:04:33,600 --> 00:04:36,000
They're maximizing the amount of squint or IO.

95
00:04:36,600 --> 00:04:40,439
And we'll see in the beginning right away today, we'll talk about a different method alternative

96
00:04:40,439 --> 00:04:43,680
to what we talked about last class that tries to maximize the squint or IO.

97
00:04:43,680 --> 00:04:47,639
And then again, there'll be other things like filters and indexes the way to reduce the

98
00:04:47,639 --> 00:04:50,800
amount of data we have to actually look at when we run queries.

99
00:04:50,800 --> 00:04:54,680
Then we also talked about a page oriented storage scheme.

100
00:04:54,680 --> 00:04:59,759
There's a lot of page architecture where it was allowed to store tuples of arbitrary length,

101
00:04:59,759 --> 00:05:02,839
variable length sizes across these heap files.

102
00:05:02,839 --> 00:05:08,959
And then we could expand the size of the tuple as needed, according to whether it fit in

103
00:05:08,959 --> 00:05:12,439
the page or not.

104
00:05:12,439 --> 00:05:17,519
So I would say what we were describing last time is what I'll loosely turn to as a tuple

105
00:05:17,519 --> 00:05:19,599
oriented storage scheme.

106
00:05:19,599 --> 00:05:23,159
What that really means is that the system is really about, I got a tuple, I got to put

107
00:05:23,159 --> 00:05:24,159
it somewhere.

108
00:05:24,159 --> 00:05:29,079
And the pages of the layout, the layouts of the pages are really based around this like,

109
00:05:29,079 --> 00:05:32,079
I got a tuple, let me store it.

110
00:05:32,079 --> 00:05:36,680
And so in this architecture, if we wanted to insert a new tuple, the way we do it is you

111
00:05:36,680 --> 00:05:42,519
go look in the page directory and find somewhere in your heap files a page of the free slot.

112
00:05:42,519 --> 00:05:46,079
Or if you said that the page directory would maintain metadata about what's what space

113
00:05:46,079 --> 00:05:48,120
is available.

114
00:05:48,120 --> 00:05:53,000
And then once we have our page, we want to insert the tuple into if it's not memory, sorry,

115
00:05:53,000 --> 00:05:56,039
if it's not memory, they've got to go to disk, disk and fetch it in, which we'll talk

116
00:05:56,039 --> 00:05:57,279
about next week, how we do that.

117
00:05:57,279 --> 00:06:00,240
But you know, think of like reading a file, bringing the memory.

118
00:06:00,240 --> 00:06:04,360
And then once we have that page, we go look in that slot array and we say, you know, what's

119
00:06:04,360 --> 00:06:08,879
the next free slot where we can store this tuple, update the slot array, put the tuple inside

120
00:06:08,879 --> 00:06:13,160
the page and then we're done.

121
00:06:13,160 --> 00:06:18,079
The updated tuple in this environment is basically the same thing where we're going to have some

122
00:06:18,079 --> 00:06:20,199
way to get the record ID of a tuple.

123
00:06:20,199 --> 00:06:25,040
We said this is typically the page ID and the offset or the slot number.

124
00:06:25,040 --> 00:06:30,080
Ignoring how we got that, which is what index will do for us, ignoring that, assuming we

125
00:06:30,080 --> 00:06:34,120
could do that, we go go in the page directory again, find the location of this page.

126
00:06:34,120 --> 00:06:35,920
If it's in memory, we're good.

127
00:06:35,920 --> 00:06:37,800
If not, we got to go disk and get it.

128
00:06:37,800 --> 00:06:40,320
Then look in the page in the slot array, find the offset.

129
00:06:40,320 --> 00:06:44,840
And then if the new tuple we're trying to, the updated tuple we're trying to install, if

130
00:06:44,840 --> 00:06:49,720
that's the same size of the original tuple, the existing tuple, then we just overwrite it.

131
00:06:49,720 --> 00:06:52,720
If not, then maybe you got to find another page that could accommodate it.

132
00:06:52,720 --> 00:06:56,440
There's no space in the page we're looking at.

133
00:06:56,440 --> 00:07:04,080
This is the core idea of what the heat files with the page or architecture and it's based

134
00:07:04,080 --> 00:07:05,080
on tuples.

135
00:07:05,080 --> 00:07:09,440
This is basically how any system would actually work.

136
00:07:09,440 --> 00:07:11,280
What are some problems with this?

137
00:07:11,280 --> 00:07:18,880
We touched on some of these last class.

138
00:07:18,879 --> 00:07:22,839
Is it efficient?

139
00:07:22,839 --> 00:07:24,319
For reads maybe, right?

140
00:07:24,319 --> 00:07:28,360
If I need the entire tuple, I go to one page and get it.

141
00:07:28,360 --> 00:07:29,680
That's okay.

142
00:07:29,680 --> 00:07:33,560
But if I start updating things, I'm starting making rights, doing inserts, updates, deletes,

143
00:07:33,560 --> 00:07:36,719
I could end up with fragmentation in my pages.

144
00:07:36,719 --> 00:07:42,279
I could have pages that are not fully utilized, meaning I have a little empty space where I

145
00:07:42,279 --> 00:07:43,759
can't fit any new tuple.

146
00:07:43,759 --> 00:07:47,800
It's not big enough for a new tuple, but I can't use it, but it's just wasted.

147
00:07:47,800 --> 00:07:51,840
It's just there.

148
00:07:51,840 --> 00:07:57,040
Or even before if I don't run that space, if I have to insert into a tuple, I got to allocate

149
00:07:57,040 --> 00:07:58,040
it.

150
00:07:58,040 --> 00:07:59,040
It's assuming I have nothing on my table.

151
00:07:59,040 --> 00:08:00,040
I inserted into a tuple.

152
00:08:00,040 --> 00:08:01,040
I allocated a page.

153
00:08:01,040 --> 00:08:02,759
I insert one tuple in that page.

154
00:08:02,759 --> 00:08:04,840
There's nothing else in that page.

155
00:08:04,840 --> 00:08:10,120
Depending on the size of my pages, which could be different per systems, there's a bunch

156
00:08:10,120 --> 00:08:14,319
of these spaces that's not being used.

157
00:08:14,319 --> 00:08:16,960
Next challenge you face is much useless disk IO.

158
00:08:16,959 --> 00:08:20,599
If I got update one tuple, if it's not in memory, I got to go disk and fetch it.

159
00:08:20,599 --> 00:08:23,439
But if it's in that side, that page, what am I getting?

160
00:08:23,439 --> 00:08:27,039
We're not storing one tuple per page.

161
00:08:27,039 --> 00:08:31,439
You typically don't want to do that.

162
00:08:31,439 --> 00:08:34,919
So now if I got to go update one page, or sorry, on one tuple, I got to fetch that entire

163
00:08:34,919 --> 00:08:38,199
page and bring in a bunch of data that may not even be what I need.

164
00:08:38,199 --> 00:08:41,919
There's a bunch of other tuples that I'm not updating.

165
00:08:41,919 --> 00:08:44,199
Same thing when I'm going to do a right.

166
00:08:44,200 --> 00:08:47,920
If I'm only updating one tuple, I had to bring in 20 tuples in the page into memory.

167
00:08:47,920 --> 00:08:52,720
Now I got to write those 22ples back out.

168
00:08:52,720 --> 00:08:56,720
And the last issue is that we're going to get a potentially a lot of random disk IO.

169
00:08:56,720 --> 00:09:03,240
Again, the sort of a cop out answer for people asking, is this more efficient or what approach

170
00:09:03,240 --> 00:09:04,240
is better?

171
00:09:04,240 --> 00:09:07,160
The answer is it always depends on databases.

172
00:09:07,160 --> 00:09:11,800
So if your workload is only updating a single tuple at a time for a per query, then maybe

173
00:09:11,800 --> 00:09:13,600
this architecture isn't so bad.

174
00:09:13,600 --> 00:09:18,960
But if I'm updating 20 tuples at a time, and those 22ples are in 20 separate pages,

175
00:09:18,960 --> 00:09:22,320
I got to go read 20 separate pages from disk into memory.

176
00:09:22,320 --> 00:09:23,320
I got to update them.

177
00:09:23,320 --> 00:09:27,519
I got to write out 20 different pages in memory, or start from memory to disk.

178
00:09:27,519 --> 00:09:28,759
Now that's random IO.

179
00:09:28,759 --> 00:09:33,200
And that's going to be slower.

180
00:09:33,200 --> 00:09:37,560
And then not necessarily a problem with the architecture itself, but it may be the case

181
00:09:37,560 --> 00:09:42,160
that we're operating in an environment where we can't do those in place updates that we

182
00:09:42,159 --> 00:09:44,399
assume we could do in a slot of page architecture.

183
00:09:44,399 --> 00:09:49,120
I mean, I can't fetch a page that's in disk, bringing it to memory, update it, and then

184
00:09:49,120 --> 00:09:52,559
write it back to where I got it from.

185
00:09:52,559 --> 00:09:56,480
You can't do this in some cloud storage systems.

186
00:09:56,480 --> 00:10:01,360
As three, you can trick it out using versioning, but I can't do in place updates in some

187
00:10:01,360 --> 00:10:02,839
cloud database systems.

188
00:10:02,839 --> 00:10:07,240
And the Hadoop file system is not that common anymore, but there's another good example

189
00:10:07,240 --> 00:10:10,959
of like, that's a to share the file system where again, I can't do in place updates, I

190
00:10:10,960 --> 00:10:13,240
can only do a pens.

191
00:10:13,240 --> 00:10:16,879
So this tube-oriented slide of page architecture wouldn't work in this environment because I

192
00:10:16,879 --> 00:10:21,080
can't do, I can't modify a page and write it back where I got it.

193
00:10:21,080 --> 00:10:24,320
All right, so this is why we need to look at potentially alternative methods.

194
00:10:24,320 --> 00:10:28,040
In particular, all the problems that I just talked about, there'll be solved with the

195
00:10:28,040 --> 00:10:32,320
log-structured storage scheme.

196
00:10:32,320 --> 00:10:36,280
And beyond the sort of heat file of the slide of the page architecture, log-structured storage

197
00:10:36,280 --> 00:10:39,400
is probably the second most common approach people take in database systems.

198
00:10:39,399 --> 00:10:44,439
It's probably even more common today because of embedded storage managers like RocksDB,

199
00:10:44,439 --> 00:10:45,439
which are log-structured.

200
00:10:45,439 --> 00:10:49,600
So if you've ever seen a database system that's using RocksDB, they're inherently log-structured

201
00:10:49,600 --> 00:10:52,840
because RocksDB is log-structured.

202
00:10:52,840 --> 00:10:55,600
And then we'll talk about another approach, not exactly log-structured, it's sort of a

203
00:10:55,600 --> 00:10:58,480
malgamation of the two, will be index-organized storage.

204
00:10:58,480 --> 00:11:02,039
This is what my SQL and SQLite and other use, and then we'll finish off talking about

205
00:11:02,039 --> 00:11:05,199
how to actually represent the data of attributes in tuples.

206
00:11:05,199 --> 00:11:09,240
All right, we're sort of, again, we were working out what a file looks like, what a page looks

207
00:11:09,240 --> 00:11:12,120
like, what a stostutter in that world, and then we'll spend more time talking about what

208
00:11:12,120 --> 00:11:15,840
actual individual tuples look like, the values in the individual tuples.

209
00:11:15,840 --> 00:11:16,840
Okay?

210
00:11:16,840 --> 00:11:18,240
All right.

211
00:11:18,240 --> 00:11:25,200
So log-structured storage is an old idea.

212
00:11:25,200 --> 00:11:30,200
It's loosely related to log-structured file systems, which predates it about 10 years.

213
00:11:30,200 --> 00:11:32,560
Log-structured file systems were like in the 1980s.

214
00:11:32,560 --> 00:11:37,759
The log-structured storage was first proposed in the mid-90s.

215
00:11:38,319 --> 00:11:41,679
Actually, in the textbook they'll call log-structured merstries.

216
00:11:41,679 --> 00:11:44,759
I'm not going to describe what the actual log-structured merstries looks like, because I don't

217
00:11:44,759 --> 00:11:48,000
think you need to know the details of the tree part of it.

218
00:11:48,000 --> 00:11:49,159
All right?

219
00:11:49,159 --> 00:11:53,879
So I'll describe basically the same idea, but without bringing in the tree, because that

220
00:11:53,879 --> 00:11:56,840
mixed things is something more complicated.

221
00:11:56,840 --> 00:12:00,279
But the highlight is what I care about, what I want you guys to understand.

222
00:12:00,279 --> 00:12:06,360
So the basic idea of log-structured storage is that instead of storing individual tuples,

223
00:12:06,360 --> 00:12:10,680
we're going to maintain a log record of the changes to those tuples.

224
00:12:10,680 --> 00:12:14,279
I think it's like a key value store, key value system.

225
00:12:14,279 --> 00:12:19,680
So I'm going to have the, some operation, either just put in delete, and then I'm going

226
00:12:19,680 --> 00:12:23,600
to have a key value pair with the key corresponding to some tuple identifier.

227
00:12:23,600 --> 00:12:27,039
You can't use the record idea we did before, because we're not going to have pages.

228
00:12:27,039 --> 00:12:28,440
We're not going to have all sets and slots.

229
00:12:28,440 --> 00:12:29,600
So we're not going to be that.

230
00:12:29,600 --> 00:12:35,120
But it'll be some key identifier, and then the payload will be, here's the actual tuple

231
00:12:35,120 --> 00:12:36,120
itself.

232
00:12:36,120 --> 00:12:40,039
And then I'm trying to install for the put.

233
00:12:40,039 --> 00:12:44,639
And so as the application inserts data, it makes changes.

234
00:12:44,639 --> 00:12:50,720
We're going to pin new log entries to an in-memory buffer, just in the order that they arrive.

235
00:12:50,720 --> 00:12:53,560
And then at some point, the buffer is going to get full, and we're going to write it out

236
00:12:53,560 --> 00:12:54,560
the desk.

237
00:12:54,560 --> 00:12:56,960
Pretty simple, right?

238
00:12:56,960 --> 00:13:00,159
All right, so let's see the example here.

239
00:13:00,159 --> 00:13:03,560
So again, the only two operations we're going to have are put in delete.

240
00:13:03,560 --> 00:13:04,560
Right?

241
00:13:04,559 --> 00:13:06,159
No insert, because that's just a put.

242
00:13:06,159 --> 00:13:10,239
There's no update, because that just a put on doing blind right over top of whatever is

243
00:13:10,239 --> 00:13:12,399
there before.

244
00:13:12,399 --> 00:13:18,679
And so in our log file in memory, we're going to go from oldest to newest.

245
00:13:18,679 --> 00:13:22,759
So at the beginning of the file or beginning of the buffer, that'll be the oldest entries,

246
00:13:22,759 --> 00:13:26,639
and then we're just impending to them as we make changes.

247
00:13:26,639 --> 00:13:32,239
All right, so the application may say, I want to go ahead and do a put on record 103.

248
00:13:32,239 --> 00:13:33,239
Where the 103 came from?

249
00:13:33,240 --> 00:13:34,240
We don't care.

250
00:13:34,240 --> 00:13:38,519
It's something that's some other upper part of the system that figured that out for us.

251
00:13:38,519 --> 00:13:42,820
And then again, the payload in the log record to be, we're setting the value to whatever

252
00:13:42,820 --> 00:13:47,320
record 103 is to 1, A1.

253
00:13:47,320 --> 00:13:48,320
Same thing.

254
00:13:48,320 --> 00:13:49,320
Next guy comes along.

255
00:13:49,320 --> 00:13:53,039
He wants to do a put on 104, and then updates that record.

256
00:13:53,039 --> 00:13:54,039
Right?

257
00:13:54,039 --> 00:13:59,879
And then if we have a delete, we just again, we just delete, have a delete operation in

258
00:13:59,879 --> 00:14:03,399
a log record, and then with again, the same two-point identifier.

259
00:14:03,399 --> 00:14:05,960
Keep it pending to the log as we go along.

260
00:14:05,960 --> 00:14:08,960
Right?

261
00:14:08,960 --> 00:14:16,399
So in this example here, we don't need to go actually read what the original record was,

262
00:14:16,399 --> 00:14:21,600
the original two-point was, any time you want to update the log.

263
00:14:21,600 --> 00:14:23,840
At least again, this is the lower bounds of the system.

264
00:14:23,840 --> 00:14:29,720
Obviously, if I'm doing a query like update table set ID or set value equals value plus

265
00:14:29,720 --> 00:14:32,040
1, I got to know what the original value was.

266
00:14:32,040 --> 00:14:33,040
Right?

267
00:14:33,040 --> 00:14:34,759
And that's essentially doing a read, followed by a write.

268
00:14:34,759 --> 00:14:40,440
But at this lowest level of the system, we don't have to know what the original value

269
00:14:40,440 --> 00:14:43,440
was for a given key.

270
00:14:43,440 --> 00:14:44,440
Right?

271
00:14:44,440 --> 00:14:50,639
And again, that's different than the two-point oriented architecture where I had to go fetch

272
00:14:50,639 --> 00:14:54,240
the page that had the original two-point, and then I can update it.

273
00:14:54,240 --> 00:14:57,160
I don't have to do that with this.

274
00:14:57,160 --> 00:14:58,160
Right?

275
00:14:58,719 --> 00:15:04,719
So again, at some point, this memory page will get full, and we got to write about the

276
00:15:04,719 --> 00:15:05,719
disk.

277
00:15:05,719 --> 00:15:06,719
Right?

278
00:15:06,719 --> 00:15:10,120
And that's just literally just taking the entire contents of the memory page and plopping

279
00:15:10,120 --> 00:15:12,639
it down to a bunch of pages on the disk.

280
00:15:12,639 --> 00:15:17,719
Clear out my memory buffer and then start filling it up with new log entries.

281
00:15:17,719 --> 00:15:20,559
And then when that gets full, same thing.

282
00:15:20,559 --> 00:15:22,959
I write that out.

283
00:15:22,959 --> 00:15:26,959
Now, important thing about this, there are just two important things to point out when

284
00:15:26,959 --> 00:15:27,959
we do this right.

285
00:15:27,960 --> 00:15:31,160
First of all, this is all sequential IO now.

286
00:15:31,160 --> 00:15:32,160
Right?

287
00:15:32,160 --> 00:15:36,720
Because my memory page could be like a megabyte, 10 megabytes.

288
00:15:36,720 --> 00:15:41,400
When that gets full, I write out sequential, there's 10 megabytes to the file and disk.

289
00:15:41,400 --> 00:15:45,120
So no matter, again, in the two-point oriented architecture or the page oriented architecture,

290
00:15:45,120 --> 00:15:50,840
where I would have 20 two-point spent across 20 different pages, in this environment, with

291
00:15:50,840 --> 00:15:54,920
this setup, those 22-points are always going to be on the same page when I write them

292
00:15:54,920 --> 00:15:55,920
out.

293
00:15:55,919 --> 00:15:59,240
Because there's depending log records.

294
00:15:59,240 --> 00:16:03,639
The other important thing in this architecture is that once a page is written to disk, it's

295
00:16:03,639 --> 00:16:04,639
immutable.

296
00:16:04,639 --> 00:16:09,479
And then we can never go back and do in-place updates.

297
00:16:09,479 --> 00:16:10,959
Well, compact it.

298
00:16:10,959 --> 00:16:11,959
We'll see that in a second.

299
00:16:11,959 --> 00:16:13,559
Basically, we do in garbage collection.

300
00:16:13,559 --> 00:16:17,639
But we never can overwrite a log record that I was already there before.

301
00:16:17,639 --> 00:16:22,240
We're not going to distribute the data since just yet, but there is some advantage to making

302
00:16:22,240 --> 00:16:23,599
sure your files are immutable.

303
00:16:24,320 --> 00:16:29,480
Ignoring the, oh, well, if I'm on a cloud storage, I can't do in-place updates.

304
00:16:29,480 --> 00:16:32,080
But it does make it easy now if it's just depending the log.

305
00:16:32,080 --> 00:16:36,040
Because essentially, what packs us or something a raft is doing, there's adding log records.

306
00:16:36,040 --> 00:16:37,040
Log records.

307
00:16:37,040 --> 00:16:38,920
And never go back and making changes.

308
00:16:38,920 --> 00:16:43,040
Because if you change in the log, it's going to be a new log entry.

309
00:16:43,040 --> 00:16:48,160
So this makes the architecture a lot easier once it's on disk and you don't update it.

310
00:16:48,160 --> 00:16:53,360
Now, for now, we're going to ignore what happens if I need to write the memory buffer out

311
00:16:53,360 --> 00:16:56,919
before I want to, before it's completely full.

312
00:16:56,919 --> 00:17:00,680
Like if I have running a query or transaction that wants to make sure that my changes are

313
00:17:00,680 --> 00:17:05,319
written to disk before I tell the outside world that the data is safely written to disk,

314
00:17:05,319 --> 00:17:11,539
I may write this log buffer out before it's finished or before it's full, but I'll write

315
00:17:11,539 --> 00:17:15,480
it to a separate location like a local disk where I can do these kinds of writes.

316
00:17:15,480 --> 00:17:19,079
But we'll ignore that for now.

317
00:17:20,079 --> 00:17:24,879
Again, so in a log-shake-and-architecture, this is going to make our writes really fast,

318
00:17:24,879 --> 00:17:27,480
much faster than in a two-porian architecture.

319
00:17:27,480 --> 00:17:31,919
Because again, we're just depending log records and we write them out sequentially.

320
00:17:31,919 --> 00:17:35,000
What's potentially going to be slower now?

321
00:17:35,000 --> 00:17:36,000
Read, right?

322
00:17:36,000 --> 00:17:39,119
Again, in computer science and database systems, there's no free lunch.

323
00:17:39,119 --> 00:17:43,399
So we're making the writes go faster, but now the reads potentially go slower.

324
00:17:43,399 --> 00:17:45,199
So to do a read, what do we have to do?

325
00:17:45,200 --> 00:17:51,559
So again, assuming something in our system has figured out the ID or the key of the log

326
00:17:51,559 --> 00:17:57,160
record I want, like 102, 103, 104, we ignore that for now.

327
00:17:57,160 --> 00:18:02,519
In order for us to find the log record for a given key, we first want to check the

328
00:18:02,519 --> 00:18:08,880
InMemory page, start at the end, because that's the newest records, and they just scan

329
00:18:08,880 --> 00:18:14,480
it sequentially in reverse order going back to the beginning until we find the log entry

330
00:18:14,480 --> 00:18:17,280
that we want.

331
00:18:17,280 --> 00:18:19,680
If it's not there, we may have to go to disk.

332
00:18:19,680 --> 00:18:22,760
We'll cover that in a second.

333
00:18:22,760 --> 00:18:25,280
So is this efficient?

334
00:18:25,280 --> 00:18:26,960
No, right?

335
00:18:26,960 --> 00:18:29,960
So the way to get around this, and this is where that log structure, and the text book comes

336
00:18:29,960 --> 00:18:34,920
in, but again, we don't have to worry about the details, is that they're going to maintain

337
00:18:34,920 --> 00:18:36,920
some kind of index, right?

338
00:18:36,920 --> 00:18:42,880
So for every single record ID, it'll tell you where in the InMemory buffer page is it

339
00:18:42,880 --> 00:18:47,519
located, or if it's not in memory, where is it on disk?

340
00:18:47,519 --> 00:18:48,519
Right?

341
00:18:48,519 --> 00:18:52,720
So to get record ID 104, I just do some look up in this index.

342
00:18:52,720 --> 00:18:55,000
I'm not telling you what data structure it is, it doesn't matter.

343
00:18:55,000 --> 00:18:59,360
It's typically going to be a B plus tree, but some systems you just try, some systems you

344
00:18:59,360 --> 00:19:00,759
skip list, it doesn't matter.

345
00:19:00,759 --> 00:19:01,759
Right?

346
00:19:01,759 --> 00:19:05,800
Do my look up at 5104, and then I'll tell you what offset in the memory page, in the

347
00:19:05,799 --> 00:19:08,440
memory buffer, has the data that I'm looking for.

348
00:19:08,440 --> 00:19:09,440
Right?

349
00:19:09,440 --> 00:19:13,399
In the case I want to look at 103, then I got to go out to disk and get it.

350
00:19:13,399 --> 00:19:14,399
Right?

351
00:19:14,399 --> 00:19:17,879
So far, so good?

352
00:19:17,879 --> 00:19:18,879
Yes.

353
00:19:18,879 --> 00:19:25,919
So without getting into details about what the index is, is it possible that it's implemented

354
00:19:25,919 --> 00:19:29,960
in a pad on where the policy is?

355
00:19:29,960 --> 00:19:38,960
So your question is, is it possible to implement the index in a pen-only file system?

356
00:19:38,960 --> 00:19:39,960
Yeah.

357
00:19:39,960 --> 00:19:47,400
So, yeah, so the way you would do this is like, you can sort of just treat this as a log

358
00:19:47,400 --> 00:19:52,000
itself, and then in memory you build a data structure on top of it.

359
00:19:52,000 --> 00:19:57,640
So like, in a B plus tree, in a typical, the typical is done, is like, when you write the

360
00:19:57,640 --> 00:20:03,440
pages out the disk, you're still maintaining the data structure itself, like the pointers

361
00:20:03,440 --> 00:20:05,960
between the children and parents and so forth.

362
00:20:05,960 --> 00:20:11,640
In this environment, you would basically reconstruct the in-memory index by replaying the log.

363
00:20:11,640 --> 00:20:14,960
So you could do it in a read-only file system.

364
00:20:14,960 --> 00:20:19,840
Actually, I don't know what ROX DB does.

365
00:20:19,840 --> 00:20:20,840
Yes?

366
00:20:20,839 --> 00:20:27,959
Is this index the same index as what we get when we run great index in SQLite?

367
00:20:27,959 --> 00:20:33,679
Question is, is this index the same index you would get when you run great index in SQLite?

368
00:20:33,679 --> 00:20:35,679
And specifically SQLite?

369
00:20:35,679 --> 00:20:36,679
No.

370
00:20:36,679 --> 00:20:42,279
Well, SQLite is not log structured.

371
00:20:42,279 --> 00:20:51,759
Basically, is this the same index as a primary key index?

372
00:20:51,759 --> 00:20:54,960
Potentially yes, but not always.

373
00:20:54,960 --> 00:20:55,960
SQLite is kind of complicated.

374
00:20:55,960 --> 00:21:02,960
They're indexed or negative pages, and they can have the non-indexes and the primary key

375
00:21:02,960 --> 00:21:08,000
table indexes give me a second to that.

376
00:21:08,000 --> 00:21:13,839
Think of this as like the internal bookkeeping of fine records.

377
00:21:13,839 --> 00:21:21,079
It's not something you would need to expose to the SQL queries themselves, but you could

378
00:21:21,079 --> 00:21:23,079
use them for that.

379
00:21:23,079 --> 00:21:24,079
Yes?

380
00:21:24,079 --> 00:21:31,079
So the only thing that we're ever looking at is the index is that point into the memory

381
00:21:31,079 --> 00:21:32,079
page.

382
00:21:32,079 --> 00:21:36,919
So why would we just maintain a bunch of pointers to the latest update rather than sorry

383
00:21:36,919 --> 00:21:38,639
everything that's happened?

384
00:21:38,639 --> 00:21:43,799
So your question is, you see that this index is pointing to things that happen in memory,

385
00:21:43,799 --> 00:21:44,799
which is not true, right?

386
00:21:44,799 --> 00:21:45,799
You could point down the disk.

387
00:21:45,799 --> 00:21:47,799
Sorry, it's only points in one thing.

388
00:21:47,799 --> 00:21:50,759
It's only point in the latest version of the yes.

389
00:21:50,759 --> 00:21:53,079
Why would we store everything?

390
00:21:53,079 --> 00:21:54,079
Why would we store everything down here?

391
00:21:54,079 --> 00:21:56,079
We'll get it out in a second.

392
00:21:56,079 --> 00:22:02,000
But like, in this case here, I have, what was it?

393
00:22:02,000 --> 00:22:03,399
ID equals 103.

394
00:22:03,399 --> 00:22:04,399
It's not in memory.

395
00:22:04,399 --> 00:22:05,399
It's somewhere on disk.

396
00:22:05,399 --> 00:22:07,399
So, but where?

397
00:22:07,399 --> 00:22:08,399
Right?

398
00:22:08,399 --> 00:22:09,879
I can't just blow away the whole file.

399
00:22:09,879 --> 00:22:12,000
I would have to pull it out.

400
00:22:12,000 --> 00:22:13,000
Right?

401
00:22:13,000 --> 00:22:14,000
And that's expensive.

402
00:22:14,000 --> 00:22:15,000
And that's compaction.

403
00:22:15,000 --> 00:22:17,000
We'll get that in a second.

404
00:22:17,000 --> 00:22:18,000
Yes?

405
00:22:18,000 --> 00:22:22,000
Why do we need to store the latest loglet before delete?

406
00:22:22,000 --> 00:22:29,000
Because if it's not present then it just isn't there.

407
00:22:29,000 --> 00:22:30,000
And all of it is.

408
00:22:30,000 --> 00:22:35,200
So, statement is, why do we need to store this delete record?

409
00:22:35,200 --> 00:22:43,079
If it's been deleted, why do you even store that?

410
00:22:43,079 --> 00:22:47,480
Because there's going to be a put for like, this, they wanted to, there's a put before

411
00:22:47,480 --> 00:22:48,480
it, right?

412
00:22:48,480 --> 00:22:50,759
Because say there was another put that got written out the disk.

413
00:22:50,759 --> 00:22:59,839
I, again, think of like, I'm going back in time and I want to make sure that like, if I,

414
00:22:59,839 --> 00:23:02,799
if I don't have that delete then it does exist, right?

415
00:23:02,799 --> 00:23:05,799
Because I can't go back and just, okay, you want to do that deleted.

416
00:23:05,799 --> 00:23:07,480
Let me find a page where it's in and pull it out.

417
00:23:07,480 --> 00:23:08,480
I can't do that.

418
00:23:08,480 --> 00:23:12,680
So, I just pin a log, I can say, okay, if you're going back in time and you see 102, no,

419
00:23:12,680 --> 00:23:13,680
it's been deleted.

420
00:23:14,680 --> 00:23:20,680
And then it will call us them in a second to remove the extra entries of those things.

421
00:23:20,680 --> 00:23:22,680
Okay.

422
00:23:22,680 --> 00:23:28,440
So, as both these guys sort of alluded to is like, well, some of these log records we don't

423
00:23:28,440 --> 00:23:31,600
need to maintain these forever, right?

424
00:23:31,600 --> 00:23:35,279
And delete was, was, was, was able to this or puts over the same key over and over again,

425
00:23:35,279 --> 00:23:36,279
right?

426
00:23:36,279 --> 00:23:40,160
And so, in a log structured database system, what they're going to do is they're periodically

427
00:23:40,160 --> 00:23:47,160
going to run some background job that will compact the pages to coalesce them to reduce

428
00:23:47,160 --> 00:23:49,160
redundant operations.

429
00:23:49,160 --> 00:23:50,160
Right?

430
00:23:50,160 --> 00:23:53,880
So, in this case here, I have page one, one, page two.

431
00:23:53,880 --> 00:23:58,000
Think of this going as a newest to oldest, sorry, oldest to newest.

432
00:23:58,000 --> 00:24:00,480
So, this one is older than this one.

433
00:24:00,480 --> 00:24:04,360
And so, if I want to compact them, then all I need to do is recognize that here are the

434
00:24:04,360 --> 00:24:10,120
latest entries that I care about for the keys that are referenced in these two pages.

435
00:24:10,119 --> 00:24:11,119
Right?

436
00:24:11,119 --> 00:24:15,000
So, one of three, one of four, and then we delete one of one and one of two, and then

437
00:24:15,000 --> 00:24:16,000
the put one of five.

438
00:24:16,000 --> 00:24:17,000
Right?

439
00:24:17,000 --> 00:24:21,399
Again, so like, there's a put one of five here, but because this is newer than this put

440
00:24:21,399 --> 00:24:25,039
one of five, we know we don't, you know, we want this one, not this one.

441
00:24:25,039 --> 00:24:28,959
So, instead of storing two put one of fives, we only need to store one in our coalesces

442
00:24:28,959 --> 00:24:29,959
pages.

443
00:24:29,959 --> 00:24:30,959
Right?

444
00:24:30,959 --> 00:24:36,239
And as, as he brought up as well, like, in maybe the case that I actually don't need to

445
00:24:36,240 --> 00:24:42,000
store the deletes at this point as well, because there's some other upper part of the system

446
00:24:42,000 --> 00:24:46,240
that says, all right, I've removed one or two, one, one for my index.

447
00:24:46,240 --> 00:24:47,559
So, anybody has a look up?

448
00:24:47,559 --> 00:24:48,559
Let's see, a key not bound.

449
00:24:48,559 --> 00:24:52,160
And therefore, I don't need to store the log entry for this.

450
00:24:52,160 --> 00:24:53,160
Right?

451
00:24:53,160 --> 00:24:55,799
So, this is called compaction.

452
00:24:55,799 --> 00:24:59,640
And this is, again, no free lunch.

453
00:24:59,640 --> 00:25:03,120
The log records, the log search is towards, is going to make the inserts much faster,

454
00:25:03,120 --> 00:25:04,880
because it's just depending to the log.

455
00:25:05,040 --> 00:25:07,120
But in some point, we're going to have to go clean things up.

456
00:25:09,200 --> 00:25:10,200
Right?

457
00:25:10,200 --> 00:25:14,120
So, again, the idea is that we do this compaction.

458
00:25:14,120 --> 00:25:20,800
Now we're down to a compressed form of the log record.

459
00:25:20,800 --> 00:25:22,400
Again, this is only on disk.

460
00:25:22,400 --> 00:25:23,840
We can't do in-place updates.

461
00:25:23,840 --> 00:25:27,920
So, this is literally taking one disk page, another disk page, and then writing out a new one.

462
00:25:27,920 --> 00:25:29,920
We can't overwrite an existing one.

463
00:25:30,920 --> 00:25:37,920
Another important thing to keep track of, too, is that once it's on disk, we know that it's going to be older than,

464
00:25:37,920 --> 00:25:41,920
or once we have a page on disk, and once we've already compacted it,

465
00:25:41,920 --> 00:25:46,920
removing the redundant, or the operations on the same key over and over again,

466
00:25:46,920 --> 00:25:51,920
that means that within a disk page, we've compacted, it only contains,

467
00:25:51,920 --> 00:25:53,920
or each key is only going to be referenced once.

468
00:25:55,920 --> 00:25:58,920
At this point, we don't care about the temporal ordering anymore of the log.

469
00:25:58,920 --> 00:26:00,920
We don't care about news to orders.

470
00:26:00,920 --> 00:26:01,920
Right?

471
00:26:01,920 --> 00:26:08,920
So now, if the operation we need to support is go find me key 103, 104, 105, or whatever.

472
00:26:08,920 --> 00:26:13,920
In the disk, the temporal ordering doesn't help us, and actually what we want to do is sort the disk pages,

473
00:26:13,920 --> 00:26:19,920
sort the keys based, sort the records of the log records in the disk page based on the keys.

474
00:26:19,920 --> 00:26:21,920
Right?

475
00:26:21,920 --> 00:26:23,920
See, we do something like this.

476
00:26:24,920 --> 00:26:28,920
Because again, now all I need to know now is if I'm looking at this disk page,

477
00:26:28,920 --> 00:26:31,920
I know that these pages are older than each other.

478
00:26:31,920 --> 00:26:32,920
Right?

479
00:26:32,920 --> 00:26:37,920
So I have sort of some metadata like that, but each log record, I don't need to know whether one's older than another.

480
00:26:39,920 --> 00:26:45,920
So, when you do this compaction, and then you sort them based on the key values,

481
00:26:45,920 --> 00:26:48,920
these are sometimes called sort of string tables or SS tables.

482
00:26:49,920 --> 00:26:55,920
I think this term is coined by Jeff Dean and the Sanjay guy when they wrote level DB at Google.

483
00:26:55,920 --> 00:26:58,920
This is for a big table in the mid-2000s.

484
00:27:00,920 --> 00:27:05,920
And the advantage of this is that when I have to go fetch this disk page in,

485
00:27:05,920 --> 00:27:10,920
I'm not looking for like, give me the put for 103 at this time stamp.

486
00:27:10,920 --> 00:27:12,920
You're just looking for put 103.

487
00:27:12,920 --> 00:27:16,920
And so you want to do a look up to find that record quickly as possible.

488
00:27:17,920 --> 00:27:21,920
And so if you're sorted, you can then build like an index or a filter,

489
00:27:21,920 --> 00:27:24,920
some way to quickly jump to that record you're looking for,

490
00:27:24,920 --> 00:27:27,920
rather than having to do binary search across the entire file.

491
00:27:27,920 --> 00:27:32,920
So there's some metadata and the header for each of these SS table pages that keeps track of,

492
00:27:32,920 --> 00:27:40,920
sorry, files, comprise of multiple pages that will keep track of where the offsets are for the different keys.

493
00:27:41,920 --> 00:27:42,920
Yes.

494
00:27:47,920 --> 00:27:55,920
The question is, wouldn't the index that we're talking about already point to the exact location of where something is?

495
00:27:55,920 --> 00:27:56,920
Not necessarily.

496
00:27:56,920 --> 00:28:05,920
You may want to keep a more core screen index that says,

497
00:28:05,920 --> 00:28:10,920
here's not maybe the exact offset of the thing you're looking for, but here's the file that has it.

498
00:28:10,920 --> 00:28:14,920
And once you get to that file, it'll tell you where to find it.

499
00:28:15,920 --> 00:28:17,920
Yes, so I may not draw a good example here.

500
00:28:17,920 --> 00:28:20,920
So this, I'm saying, disk page, this could be multiple pages for an SSD file.

501
00:28:20,920 --> 00:28:24,920
These things get big, so it's not going to be a single page.

502
00:28:25,920 --> 00:28:26,920
And back, yes.

503
00:28:29,920 --> 00:28:31,920
For the SS table or the one back of memory?

504
00:28:32,920 --> 00:28:33,920
Back of memory.

505
00:28:34,920 --> 00:28:38,920
Yes, because you don't want to have to recreate it upon restart.

506
00:28:38,920 --> 00:28:43,920
And as I was saying it before, either you could just write the file, the pages themselves to disk,

507
00:28:44,920 --> 00:28:48,920
or you could just maintain a log record that says, here's how to rebuild the index.

508
00:28:50,920 --> 00:28:51,920
Yes.

509
00:28:51,920 --> 00:28:54,920
Why don't we write the pages in sorted order first place?

510
00:28:54,920 --> 00:28:56,920
Because if it's a memory, you could get rid of it.

511
00:28:56,920 --> 00:29:01,920
Yes, the question is, why don't we write the pages in sorted order at the beginning of the, that's what they do, yes.

512
00:29:02,920 --> 00:29:08,920
Yeah, we're in the confection, have any impact on the read performance because you might have to take some logs.

513
00:29:08,920 --> 00:29:09,920
Absolutely, yes.

514
00:29:09,920 --> 00:29:14,920
So this David is, and he's right, is a compaction going to have an impact on the performance of the reads?

515
00:29:14,920 --> 00:29:18,920
Because not only you're just taking logs, logs, you're doing disk IOs, right?

516
00:29:19,920 --> 00:29:22,920
Because now you're like, you're, we'll get to different types of compactions a second.

517
00:29:22,920 --> 00:29:27,920
Now you're potentially bringing in gigabytes of files in, compacting them and writing them back out.

518
00:29:27,920 --> 00:29:28,920
So absolutely, yes.

519
00:29:28,920 --> 00:29:29,920
Again, no free lunch.

520
00:29:32,920 --> 00:29:33,920
Okay.

521
00:29:36,920 --> 00:29:40,920
So there's sort of two main ways you can do compaction.

522
00:29:40,920 --> 00:29:45,920
And this terminology here is, I'll use is what to use in, in rocks DB.

523
00:29:46,920 --> 00:29:55,920
So the most simple form is called universal compaction, where you're just taking adjacent sorted log files that are on disk.

524
00:29:55,920 --> 00:29:57,920
Again, this means multiple pages.

525
00:29:57,920 --> 00:30:00,920
Think of like, again, megabytes, gigabytes, terabytes.

526
00:30:00,920 --> 00:30:06,920
And then you just want to take two, two, two sort of these sort of log files that are adjacent and then compact them.

527
00:30:06,920 --> 00:30:07,920
Right?

528
00:30:07,920 --> 00:30:19,920
So I would take these two guys, basically do a sort merge, or they're already sorted, so now I'm just doing a merge and figure out whether, you know, whether the, the different keys you're looking at, whether one is subsumed by another.

529
00:30:19,920 --> 00:30:22,920
Like, assuming that this one, but I said, this one's older than this one.

530
00:30:22,920 --> 00:30:28,920
So if I see it, an update, or put for like, you know, key one or three here, and a key one or three there, then I know I want that one.

531
00:30:28,920 --> 00:30:29,920
And I can throw the other one away.

532
00:30:31,920 --> 00:30:32,920
Right?

533
00:30:32,920 --> 00:30:37,920
And I can do the same thing for any possible combination of these, these sort of log files.

534
00:30:37,920 --> 00:30:42,920
I can keep calling them, I can send them into more compact forms.

535
00:30:42,920 --> 00:30:47,920
Another approach is to do what it's called level compaction.

536
00:30:47,920 --> 00:30:51,920
Again, this is what the level and level DB comes from.

537
00:30:51,920 --> 00:30:55,920
Actually, who here is sort of level DB?

538
00:30:55,920 --> 00:30:56,920
Very few.

539
00:30:56,920 --> 00:30:58,920
He here has heard of rocks DB.

540
00:30:58,920 --> 00:30:59,920
More.

541
00:30:59,920 --> 00:31:00,920
Okay.

542
00:31:00,920 --> 00:31:01,920
Not much more.

543
00:31:01,920 --> 00:31:04,920
Rocks DB is Facebook's fork of level DB.

544
00:31:04,920 --> 00:31:05,920
Google wrote level DB.

545
00:31:05,920 --> 00:31:07,920
Rocks DB forked it.

546
00:31:07,920 --> 00:31:09,920
Very first thing they did.

547
00:31:09,920 --> 00:31:10,920
Remove M-map.

548
00:31:10,920 --> 00:31:11,920
Right?

549
00:31:11,920 --> 00:31:14,920
And then they expanded and did a bunch of other stuff.

550
00:31:14,920 --> 00:31:17,920
And so this level compaction comes from level DB.

551
00:31:17,920 --> 00:31:20,920
Right, so you have your sort of file and disk.

552
00:31:20,920 --> 00:31:23,920
And at level zero, they're going to be a certain size.

553
00:31:23,920 --> 00:31:25,920
And you keep adding more sort of sort of files.

554
00:31:25,920 --> 00:31:27,920
And to a some point, you run compaction.

555
00:31:27,920 --> 00:31:31,920
And then you'll combine them down into a larger file at the next level.

556
00:31:31,920 --> 00:31:32,920
Right?

557
00:31:32,920 --> 00:31:35,920
Make, make, make a more of them at the top level.

558
00:31:35,920 --> 00:31:37,920
And at some point, that'll get merged together.

559
00:31:37,920 --> 00:31:40,920
And once I have enough at the next level, then I'll run compaction for that one.

560
00:31:40,920 --> 00:31:41,920
And produce something at the low level.

561
00:31:41,920 --> 00:31:42,920
Sort of cascading down.

562
00:31:42,920 --> 00:31:45,920
I'm getting larger and larger files as I go down.

563
00:31:45,920 --> 00:31:46,920
Right?

564
00:31:46,920 --> 00:31:56,920
So as I said, because Rocks DB has sort of become the default choice for a lot of database vendors,

565
00:31:56,920 --> 00:32:03,920
people building data systems, as like the underlying storage manager to use,

566
00:32:03,920 --> 00:32:06,920
they're essentially log structure.

567
00:32:07,920 --> 00:32:10,920
But then what they're building is how a Rocks DB is all the SQL parsing layer,

568
00:32:10,920 --> 00:32:14,920
the SQL execution, the indexes, all the additional things we'll talk about throughout the semester.

569
00:32:14,920 --> 00:32:19,920
And like the Rocks DB essentially is providing a key value API.

570
00:32:19,920 --> 00:32:24,920
Like you don't, in my example is here, I just said, here's the value,

571
00:32:24,920 --> 00:32:27,920
here's the payload I'm putting out and I'm stirring in the log.

572
00:32:27,920 --> 00:32:30,920
It has no notion of attributes or columns.

573
00:32:30,920 --> 00:32:31,920
Right?

574
00:32:31,920 --> 00:32:34,920
So even though I say I have 10 columns on my table, but I only update one of them,

575
00:32:34,920 --> 00:32:37,920
my put record has to contain all 10 columns.

576
00:32:37,920 --> 00:32:42,920
We'll see multi-versioning how we can be later in the semester after the midterm,

577
00:32:42,920 --> 00:32:46,920
but we can be smarter with this, which essentially looks a lot like log structure storage,

578
00:32:46,920 --> 00:32:48,920
but for now we can ignore that.

579
00:32:48,920 --> 00:32:54,920
It's almost how Postgres, this is how Postgres was originally envisioned in the 1980s.

580
00:32:54,920 --> 00:32:57,920
It looks a lot like this.

581
00:32:57,920 --> 00:33:02,920
So as I said, Rocks DB is super popular, and it's a focal level DB,

582
00:33:02,920 --> 00:33:08,920
and this is just a sampling of different companies that are using a log structure storage.

583
00:33:08,920 --> 00:33:12,920
Again, some are based on Rocks DB, Cockroach DB originally started off using Rocks DB.

584
00:33:12,920 --> 00:33:15,920
They threw it away and wrote their own thing and go called Pebble,

585
00:33:15,920 --> 00:33:18,920
because Sandra has their own log structure storage.

586
00:33:18,920 --> 00:33:22,920
TidyB has TidyKV, I think D graph uses Badger DB,

587
00:33:22,920 --> 00:33:27,920
but there's a bunch of these log structure systems.

588
00:33:27,920 --> 00:33:30,920
So we've already said the reads are slower, but what are some other problems?

589
00:33:30,920 --> 00:33:32,920
We would have with log structure storage.

590
00:33:32,920 --> 00:33:35,920
We said, re-with slower, and the compactroom is expensive.

591
00:33:35,920 --> 00:33:39,920
There's one more core issue with this approach.

592
00:33:39,920 --> 00:33:40,920
Yes?

593
00:33:40,920 --> 00:33:42,920
It seems less this efficient.

594
00:33:42,920 --> 00:33:44,920
What do you mean, what do you mean, disc-efficient?

595
00:33:44,920 --> 00:33:47,920
You have to store extra copies of every two-fold,

596
00:33:47,920 --> 00:33:49,920
and when you compact, you have to decrease,

597
00:33:49,920 --> 00:33:53,920
like you have to use other parts of disc to create the compacted picture.

598
00:33:53,920 --> 00:33:58,920
So the statement is that it's less efficient because you have to store

599
00:33:58,920 --> 00:34:00,920
some pinching multiple copies of a two-fold,

600
00:34:00,920 --> 00:34:02,920
because there's a bunch of puts for them.

601
00:34:02,920 --> 00:34:05,920
And then when you do compaction, you basically have to have a staging area,

602
00:34:05,920 --> 00:34:09,920
or, alas, where you had the two original files you're trying to compact,

603
00:34:09,920 --> 00:34:11,920
two or more, and then you're writing out a new one.

604
00:34:11,920 --> 00:34:12,920
Yes.

605
00:34:12,920 --> 00:34:18,920
That's, I would say, yes. That's an issue, yes.

606
00:34:18,920 --> 00:34:22,920
But what about the, related to this point of compaction, what am I doing?

607
00:34:22,920 --> 00:34:27,920
Well, at some point earlier, I had these log records in memory.

608
00:34:27,920 --> 00:34:28,920
I wrote them at the disc.

609
00:34:28,920 --> 00:34:31,920
Now for compaction, what am I doing?

610
00:34:31,920 --> 00:34:36,920
Reading it back into memory, writing out, back out the disc.

611
00:34:36,920 --> 00:34:38,920
So this is called write amplification.

612
00:34:38,920 --> 00:34:42,920
And the idea is that, the issue is that, for every sort of logical write,

613
00:34:42,920 --> 00:34:46,920
I do my application, like in sort of two-fold, update a single two-fold,

614
00:34:46,920 --> 00:34:50,920
how many times am I going to read and write it back to disc?

615
00:34:50,920 --> 00:34:56,920
And in a log-churched approach, potentially infinite.

616
00:34:56,920 --> 00:34:59,920
Right? If I just keep compacting, compacting over and over again,

617
00:34:59,920 --> 00:35:01,920
obviously that doesn't happen.

618
00:35:01,920 --> 00:35:06,920
But I could potentially do, for a single logical write,

619
00:35:06,920 --> 00:35:11,920
I could do dozens of physical writes, because I'm bringing it back to memory

620
00:35:11,920 --> 00:35:14,920
and writing it back out.

621
00:35:14,920 --> 00:35:19,920
And the page architecture with a lot of pages, we don't have this problem.

622
00:35:19,920 --> 00:35:22,920
When I do an update a single two-fold, I bring it, bring it to memory,

623
00:35:22,920 --> 00:35:25,920
I update it, I write it back out.

624
00:35:25,920 --> 00:35:29,920
And then if I never updated again, I'd never write it out again.

625
00:35:29,920 --> 00:35:32,920
We get a gnar back up, so we can ignore the right-hand log,

626
00:35:32,920 --> 00:35:34,920
we'll get to that later in the semester.

627
00:35:34,920 --> 00:35:38,920
But if I'm not reading, I'm not using it, I'm not bringing it to memory

628
00:35:38,920 --> 00:35:40,920
and writing back out.

629
00:35:40,920 --> 00:35:42,920
And in a log-churched approach, you have to.

630
00:35:42,920 --> 00:35:44,920
Okay?

631
00:35:44,920 --> 00:35:47,920
So again, if you want to go beyond this, there's the log-churched,

632
00:35:47,920 --> 00:35:49,920
commercially part of the textbook.

633
00:35:49,920 --> 00:35:52,920
I think it's a bit, it's overly complicated,

634
00:35:52,920 --> 00:35:55,920
because it's really about how do you merge these trees,

635
00:35:55,920 --> 00:35:57,920
it almost looks like the level compaction,

636
00:35:57,920 --> 00:36:00,920
but I understand that the low level data structure.

637
00:36:00,920 --> 00:36:03,920
The key thing I want you to understand is here's a different approach

638
00:36:03,920 --> 00:36:07,920
to storing tuples through these log records.

639
00:36:07,920 --> 00:36:11,920
And we'll see this idea pop up again when we talk about multivertion control

640
00:36:11,920 --> 00:36:14,920
and when we talk about distributed transactions, distributed databases.

641
00:36:14,920 --> 00:36:15,920
Yes?

642
00:36:15,920 --> 00:36:18,920
Why is level compaction in the textbook?

643
00:36:18,920 --> 00:36:21,920
The question is why is level compaction preferred over universal compaction?

644
00:36:21,920 --> 00:36:24,920
I don't know if it actually is.

645
00:36:24,920 --> 00:36:27,920
I don't think it makes a difference.

646
00:36:27,920 --> 00:36:32,920
And I don't know what the trade-offs are between the two of them.

647
00:36:32,920 --> 00:36:39,920
Other than it's like a, I think it's sort of like a cleaner architecture in terms of like,

648
00:36:39,920 --> 00:36:41,920
I know at this level, I'm going to get a compacted,

649
00:36:41,920 --> 00:36:43,920
and it's going to go to this side and go to the next level.

650
00:36:43,920 --> 00:36:46,920
Whereas in the universal compaction, you have to have some additional logic inside.

651
00:36:46,920 --> 00:36:47,920
Okay?

652
00:36:47,920 --> 00:36:49,920
If I could have merged this guy and this guy or this guy and this guy,

653
00:36:49,920 --> 00:36:51,920
which one should I do?

654
00:36:51,920 --> 00:36:56,920
But I don't think the RoxyB manual has a lot of good information on those, the blog articles.

655
00:36:56,920 --> 00:37:00,920
I can post on Piazza if you want afterwards.

656
00:37:00,920 --> 00:37:01,920
Yes?

657
00:37:01,920 --> 00:37:05,920
So you previously said that those tree audit compactions,

658
00:37:05,920 --> 00:37:06,920
what does that mean?

659
00:37:06,920 --> 00:37:09,920
Is it like funny secrets, or is it like all of every read?

660
00:37:09,920 --> 00:37:13,920
Yes, so the question is, what do I mean by peer-to-conpaction?

661
00:37:13,920 --> 00:37:17,920
You would have some kind of trigger threshold or something that says it's time to compact.

662
00:37:17,920 --> 00:37:25,920
If it's a level compaction, it could be, okay, I've got three of these guys go ahead and run compaction.

663
00:37:25,920 --> 00:37:28,920
Or it could be, I've done this many or right, let's go ahead and compact.

664
00:37:28,920 --> 00:37:35,920
It can be done basically at one hour or it's not, that's not have to be triggered by a read.

665
00:37:35,920 --> 00:37:39,920
Correct, it doesn't have to be triggered by a read, it can be done whenever it, yes.

666
00:37:39,920 --> 00:37:42,920
But it's like, how does this?

667
00:37:42,920 --> 00:37:49,920
It's like, you need to change the oil in your car.

668
00:37:49,920 --> 00:37:55,920
You can go a long time beyond the miles when you're supposed to, but it's kind of like you shouldn't.

669
00:37:55,920 --> 00:38:01,920
So it's sort of like the best practices you want to, you want to make sure you do the upkeep that you need to do.

670
00:38:01,920 --> 00:38:05,920
But of course, if you're running it every second, then that's going to make your reads go slower.

671
00:38:05,920 --> 00:38:08,920
So it's the balance how to figure out how to when to do it.

672
00:38:08,920 --> 00:38:11,920
And again, we'll see this when we talk about Postgres and Multivirginers.

673
00:38:11,920 --> 00:38:13,920
There's this thing called the auto vacuum.

674
00:38:13,920 --> 00:38:21,920
When should it run? How it should run? It depends on the workload and the hardware.

675
00:38:21,920 --> 00:38:25,920
Okay.

676
00:38:25,920 --> 00:38:35,920
So the two approaches we talked about so far, again, the log structure storage and the sort of the page orange storage.

677
00:38:35,920 --> 00:38:37,920
These are two-pointer storage.

678
00:38:37,920 --> 00:38:48,920
These are, and these approaches, we all are going to lie on indexes to find individual tuples that are separate from the sort of core storage of the tables and the tuples themselves.

679
00:38:48,920 --> 00:39:01,920
Right? In the two-pointer storage, there's these pages, they're on ordered, and to get that record ID, it gives us the page number and the slot number, there's some other magical data structure index, I said, that's going to get us there.

680
00:39:01,920 --> 00:39:10,920
Same thing for the log structure storage. We need an index to tell us, for a given record ID, where to go find the data we're looking for.

681
00:39:10,920 --> 00:39:21,920
And so an alternative approach is that what if we just keep the tuples automatically sorted by just putting it inside the index itself?

682
00:39:21,920 --> 00:39:28,920
And then now you don't have a separate district between, here's the log structure storage and the index, or here's the slot of pages, and here's the index.

683
00:39:28,920 --> 00:39:31,920
It's all just indexes.

684
00:39:31,920 --> 00:39:35,920
And so this is what is called an index-organized storage or index-organized tables.

685
00:39:35,920 --> 00:39:43,920
And the idea here is that assuming we have some tree data structure, or could be a hash table, we'll for now we'll assume trees.

686
00:39:43,920 --> 00:39:57,920
Instead of having the leaf nodes in the tree with values that provide us the record ID, that tells where to go find the page that has a data we're looking for, what if the leaf nodes themselves were just the data pages with the tuples?

687
00:39:57,920 --> 00:40:10,920
So now when I do a look-up and say, find me key 102, I follow this index, and then proof at the bottom, proof at the bottom, and there's the index I'm looking for.

688
00:40:10,920 --> 00:40:14,920
Or sorry, there's the data that I'm looking for.

689
00:40:14,920 --> 00:40:16,920
So this sort of idea looks like it.

690
00:40:16,920 --> 00:40:20,920
Again, this is a rough diagram on a B tree, we'll try to cover soon.

691
00:40:20,920 --> 00:40:22,920
There's a situation in the inner nodes, and then the leaf nodes.

692
00:40:22,920 --> 00:40:27,920
The inner nodes are basically guideposts that tell you for a given key, should I go left or right?

693
00:40:27,920 --> 00:40:33,920
And then the leaf nodes themselves, these will look a lot just like slot of pages.

694
00:40:34,920 --> 00:40:48,920
But the difference is that we're going to sort them in the actual two, or in the page itself, based on the key, and not just a random location in the, based on where we had a free space in the slot of right.

695
00:40:48,920 --> 00:41:02,920
So now, again, when I want to do a look-up, find me key 102, I traverse the index, I get to a leaf node, I pop over here, and then I do binary search on the list of keys, and then that'll give me an offset to go find where the data I'm looking for.

696
00:41:03,920 --> 00:41:10,920
So this is what, this is how my SQL want to use the inner DB engine, this is what you get for SQL light, this is what you get as well.

697
00:41:10,920 --> 00:41:17,920
I think I said last class in SQL light, they had this internal primary key called the row ID, right?

698
00:41:17,920 --> 00:41:24,920
And we could see it through SQL, but it's different than the primary key you may define in your table itself, right?

699
00:41:24,920 --> 00:41:34,920
Because they're using index-organized storage, and then the row ID is the key that you do a look-ups inside of this index.

700
00:41:34,920 --> 00:41:53,920
So for the real primary, sort of the logical primary key, say like a student email address, you would have a separate index that then maps the email address to the row ID, then you do a look-up in the primary key index to get the actual two-poll you're looking for.

701
00:41:54,920 --> 00:41:55,920
Yes.

702
00:41:59,920 --> 00:42:04,920
The question is, is two keys one key for, to get to the page and one key inside the page?

703
00:42:04,920 --> 00:42:12,920
No, so like if I, again, if I'm, if I SQL light, find me row ID equals one, I just traverse this index, the keys are based on row ID.

704
00:42:12,920 --> 00:42:18,920
I land in the page, now I need to find within the page where row ID one is, and I do my look-up on this.

705
00:42:19,920 --> 00:42:20,920
The entire tree is sorted.

706
00:42:20,920 --> 00:42:25,920
The entire tree is sorted, yes. It has to be, because it's a balanced tree.

707
00:42:27,920 --> 00:42:34,920
So you get this in SQL server and, and, and, and Oracle, but not by default, you have to tell it, I want this.

708
00:42:34,920 --> 00:42:41,920
If you use my SQL Serialite, you get this by default. I don't, I don't think you can turn it off. Yes.

709
00:42:42,920 --> 00:42:47,920
Does this approach do suffer from the downside by fragmentation?

710
00:42:47,920 --> 00:42:50,920
Yes, so his question is, he's, it's, it's, it's a good point.

711
00:42:50,920 --> 00:42:59,920
Does this approach still suffer from the things we talked about before, like fragmentation and, and, uh, random IO?

712
00:42:59,920 --> 00:43:10,920
Well, so, for fragmentation, yes, it's unavoidable, because in a B plus tree, uh, it needs to at least have full, so you could, you're gonna have a bunch of leaf nodes that are, that are, that are, that are good.

713
00:43:11,920 --> 00:43:12,920
That's unavoidable.

714
00:43:12,920 --> 00:43:20,920
In terms of the random IO, if it's updates to random locations in the, in the leaf nodes, yes. That's unavoidable.

715
00:43:20,920 --> 00:43:31,920
But if you're just inserting, right? Then again, using, uh, using SQLite's row ID as an example, the row ID is just an eternal counter.

716
00:43:31,920 --> 00:43:36,920
For every new tuple, recommend that counter by one, one, two, three, four, five, six, seven. It's a monotonically increasing.

717
00:43:36,920 --> 00:43:43,920
So if I just keep inserting to SQLite, I'm just gonna keep appending to this side of the tree, and not just the other side of the tree.

718
00:43:43,920 --> 00:43:58,920
So it's not as bad as doing a bunch of random IO. It's not as good as doing the sequential IO you get law-structured, but it's better than, it may have, in a tuple-oriented storage, because, at least now, the tree is guiding me to only update pages on, on the side over here.

719
00:43:58,920 --> 00:44:00,920
So there is some benefit to it.

720
00:44:00,920 --> 00:44:02,920
Yes.

721
00:44:02,920 --> 00:44:07,920
So the row ID is used for finding a page and the key of that is finding the tuple?

722
00:44:07,920 --> 00:44:23,920
So the question is, the row ID is, the row ID is finding a page and key ID is finding a tuple. No, so, what I was trying to say is in SQLite, there's the primary key index that stores the tuples and the leaf nodes.

723
00:44:23,920 --> 00:44:30,920
But instead of getting whatever the primary key you tell it, like in your create table statement, they have an internal row ID is the primary key.

724
00:44:30,920 --> 00:44:41,920
So if you do a look up, like, you know, where email address equals Andy, there's some other index that's going to give you the row ID, and then you use that to reverse the primary key index.

725
00:44:41,920 --> 00:44:51,920
In my SQL and ODB, they don't do that with a row ID. It'll be the real primary key to declare in the create table statement. That'll be the key you're using here.

726
00:44:51,920 --> 00:44:54,920
And that's the look up that you have over here.

727
00:45:00,920 --> 00:45:11,920
Again, and then the pages look like slot architecture where the key and the offsets are growing in one direction and then the tuples are growing in another direction.

728
00:45:11,920 --> 00:45:15,920
Okay.

729
00:45:15,920 --> 00:45:31,920
So the three major approaches for storing tuples and sort of within files are going to be the heap storage with this lot of pages, the log structure storage with the pens and the SS tables getting rid of the desk, and then this index organized storage.

730
00:45:31,920 --> 00:45:38,920
And there's other one like the isams, but these are archaic or their legacy.

731
00:45:38,920 --> 00:45:41,920
We don't need to worry about it.

732
00:45:42,920 --> 00:45:46,920
All right. So let's talk about now.

733
00:45:46,920 --> 00:45:56,920
Once we got once we have a once we got to this, like a tuple, let's talk about what's actually in it now.

734
00:45:56,920 --> 00:45:59,920
So a tuple is just a sequence of bytes.

735
00:45:59,920 --> 00:46:05,920
And it's the job of the data is minute system based on the schema that it's storing in its catalog.

736
00:46:05,920 --> 00:46:10,920
Like when you call a crate table, I have these attributes of these types.

737
00:46:10,920 --> 00:46:17,920
It's the job of the data system to interpret what those bytes actually are and how to do whatever the operation is you want to want on it.

738
00:46:17,920 --> 00:46:26,920
If I have two columns, column A plus column B, the data system is going to know, okay, well column A is 32 bit integer, column B is 64 bit integer.

739
00:46:26,920 --> 00:46:32,920
Therefore, I need to do the addition operator based on those two types.

740
00:46:33,920 --> 00:46:41,920
And so you can sort of think again, just think of it as just a byte buffer, you know, a char array.

741
00:46:41,920 --> 00:46:48,920
There'll be some header that says it keeps track of like maybe the size of it, the nulls will probably be on the second.

742
00:46:48,920 --> 00:46:56,920
And then after the header is done at the first offset, you would have the first column, the ID column, here.

743
00:46:56,920 --> 00:47:01,920
And then follow, and we know the ID is the integer, so that's going to be 32 bits.

744
00:47:01,920 --> 00:47:05,920
Then after 32 bits, we'll have the value, which would be 64 bits.

745
00:47:05,920 --> 00:47:19,920
And so internally, basically the data system, if you want to do it in a C++, is looking, gets the starting location of the, of the tuple, right, using whatever the slot array method or how we get to jump to that offset in a page.

746
00:47:20,920 --> 00:47:24,920
The header is always going to be the same size for every single tuples, we now have to jump past that.

747
00:47:24,920 --> 00:47:34,920
And then now we just do simple arithmetic to say, I know that the, the, the offset of this first column that I'm looking for is this, so many bits or bytes after the header.

748
00:47:34,920 --> 00:47:37,920
All right, I want the second column how to get, how to get there.

749
00:47:37,920 --> 00:47:47,920
VAR Charters are a little complicated, you have to store the length of the field, and that could, that could be in the header, right, or, or in line for now, doesn't matter.

750
00:47:47,920 --> 00:47:57,920
But essentially what you're just doing, you're just taking some address, and you're doing the interpret, the interpret cast to say the, the system itself should treat that address.

751
00:47:57,920 --> 00:48:02,920
That's talking about that dress as a 30 bit, and you're 64 bit, and you're whatever the type is.

752
00:48:02,920 --> 00:48:03,920
Yes.

753
00:48:03,920 --> 00:48:06,920
Yes.

754
00:48:06,920 --> 00:48:10,920
Who else would be doing it?

755
00:48:10,920 --> 00:48:15,920
We're writing SQL, right, like some SQL, there's no interpret cast as SQL. This is like the implementation.

756
00:48:15,920 --> 00:48:17,920
Yeah.

757
00:48:17,920 --> 00:48:24,920
Again, this class is like we're doing this, not, not the top of the program.

758
00:48:24,920 --> 00:48:38,920
All right, so, so many brothers up last class, and, and, which is good topic, and I want to include it, is one of the things we need to be careful now of, of, in, as we start storing these bits, is dealing with alignment.

759
00:48:38,920 --> 00:48:48,920
To make sure that the data we're storing aligns to the, to how the CPU actually wants to operate on data.

760
00:48:48,920 --> 00:48:50,920
So let me admit this.

761
00:48:50,920 --> 00:48:59,920
Actually, the reason I put Andy Sucks is like, people take my slides, and they don't know what Andy Sucks means, and so, I, I Google that, and you find who's to you copies it.

762
00:49:00,920 --> 00:49:22,920
All right, so, we need to make sure that all their attributes are aligned to, based on the word boundaries of the CPU, or whatever the architecture we're running on, to ensure that we don't end up with unexpected behavior when we do operations on this data, and, and that the CPU doesn't have to do extra work.

763
00:49:22,920 --> 00:49:33,920
So let's say I have a table, I have four columns here, I have a 32-bit integer, a, 64-bit timestamp, a two, four-byte char, and then a zip code, right?

764
00:49:33,920 --> 00:49:40,920
And so, assume that we're going to, we're going to break up our char array representing this two-ball into 64-bit words.

765
00:49:40,920 --> 00:49:51,920
And the cache lines are 64 bytes, but post-crested lines are based on 64 bits, or I don't know what SQLite does, but they're all doing some variation of this.

766
00:49:51,920 --> 00:50:07,920
All right, so, the first thing we're going to do is, again, we have our, for IDCOM, that's 32 bits, we store that there, then we have this, this date timestamp, the creation date, that's 64 bits, so we just store that right after that, and so forth with the, the other ones.

767
00:50:07,920 --> 00:50:24,920
So, again, now, when I want to do a lookup in my system to do some operation on this, this, this, byte array that I've gotten for this two-ball, say on the customer date, the creation date, the problem with this is that that attribute is going to span two words, right?

768
00:50:24,920 --> 00:50:33,920
Because this was, each word is 64 bits, the first ID field was 32 bits, so this 64 bits spans two consecutive words.

769
00:50:33,920 --> 00:50:45,920
So, if you really know what happens when you do this in a CPU, right, when you try to jump to a memory address and do some operation on something that spans the word boundaries.

770
00:50:45,920 --> 00:50:49,920
What does x86 do?

771
00:50:49,920 --> 00:50:58,920
So, x86, Intel looks to make your life easy and not buy the word about these things, so they'll do the extra reads for you.

772
00:50:58,920 --> 00:51:18,920
So, they want to hide it, they want to hide all the complexities of the architecture, so they'll do extra work, but now this is going to make your data to some run slower because what should have been, you know, one, one register read or one cashline read to go fetch something into a CPU register, now is going to be two cashline reads, right?

773
00:51:18,920 --> 00:51:37,920
But again, there's no error, Intel takes care of it for you, but not every system, not every architecture will do that. Previously before in ARM, they would give you, they would reject it, they would recognize that you're trying to do a misaligned operation and then throw an error, hoping you would catch it.

774
00:51:37,920 --> 00:51:47,920
Now, in the newer versions, I think ARM 7, they handle it now like Intel does, but it's just slower.

775
00:51:48,920 --> 00:51:59,920
This is rare, but what could happen is that it'll do the reads for you, but there's no guarantee that the bits are going to land in the right order, right?

776
00:51:59,920 --> 00:52:10,920
So, going back here, I have to do two reads to get this word and this word to get put together the date attribute, and they put the last bits in front of the other ones.

777
00:52:10,920 --> 00:52:25,920
It seems like a terrible idea, but the older CPUs would do that. Of course, that means now you program in random errors and messed up data, and people are going to notice and complain, and that's bad. Again, that's part of the reason why Intel tries to hide that from you, even though it makes your thing run slower.

778
00:52:25,920 --> 00:52:38,920
So, we need to make sure that none of the attributes in our tuple, essentially in our byte array, because again, now we're talking about things we brought into memory, that none of them are going to span these boundaries.

779
00:52:39,920 --> 00:53:00,920
So, the two approaches to handle this are padding and reordering. So, with padding, the basic idea is to recognize that if I'm breaking up to 64 bit words, as I add my attributes as going across, if I recognize that the next attribute doesn't fit within my single word, then I'll just put a bunch of zeros there and pad that.

780
00:53:01,920 --> 00:53:14,920
And then internally, the bookkeeping of a system, when it's interpreting these bytes, it knows that, okay, I need this ID here, and then the date attribute, that's going to be the next word, so just ignore these 32 bits there.

781
00:53:14,920 --> 00:53:30,920
The other approach is to reordering. I don't think any most of the systems don't do this automatically. Some of the academic systems, we built one that did this, we'll do this automatically.

782
00:53:30,920 --> 00:53:47,920
Most systems will lay out the bits exactly where you tell it, and then put padding in to make it better. The idea here is that if I keep the logical view of the table, whatever defined the table statement, I'll tell you things are sorted in this order.

783
00:53:47,920 --> 00:53:57,920
But underneath the covers, I'll just move things around to, so I can pack things in better, and then if necessary, I'll pad bits at the end like that.

784
00:53:57,920 --> 00:54:02,920
How long does a bar chart start to do this? Especially for the ordering or the filing.

785
00:54:02,920 --> 00:54:07,920
This question is, how do bar charts handle this case, especially for padding?

786
00:54:07,920 --> 00:54:21,920
Yeah, for padding. That's what I'm saying. So, in the systems that do automatic reordering, you don't store the bar charts in line, and less there's 64 bits or less.

787
00:54:21,920 --> 00:54:36,920
And instead, you store a pointer to some other location that, we'll save in a second, these external, these oversized attribute tables or pages that are sort of separated. So, you can do this reordering and not worry about verve length things.

788
00:54:36,920 --> 00:54:38,920
Yeah.

789
00:54:38,920 --> 00:54:41,920
Do we need to last words for the two things?

790
00:54:41,920 --> 00:54:46,920
Do I need this last, like this thing here? Do I need this? No.

791
00:54:50,920 --> 00:54:59,920
So, we can see this in Postgres. Postgres will not do automatic reordering, but it will do padding.

792
00:54:59,920 --> 00:55:16,920
And there's some simple things we can see about, like if we reorder the reorder, reorder the create table, say, reorder tuples that we can store things in less space.

793
00:55:16,920 --> 00:55:28,920
So, there's more Postgres syntax here, but Postgres has this nice little function called row, and essentially it just takes the comma, separated list of values you give it.

794
00:55:28,920 --> 00:55:33,920
And it makes a row, right? And then we can cast it now.

795
00:55:33,920 --> 00:55:44,920
We can add this colon colon thing at the end of all our values, and that'll basically casting the value to a given type.

796
00:55:44,920 --> 00:55:53,920
So, I can do a small ant, a regular ant, and a big ant. So, 2 byte ant, 4 byte ant, or 8 byte ant, right?

797
00:55:54,920 --> 00:56:06,920
So, now Postgres has a nice little function called PG column size that'll tell you the size of this record, this tuple, in bytes.

798
00:56:06,920 --> 00:56:15,920
So, in this case here, it's telling me the size of this row that I created for bytes. So, I go back to my previous one, and run that.

799
00:56:16,920 --> 00:56:23,920
Sorry.

800
00:56:28,920 --> 00:56:36,920
Go back to the row I had before without casting to types until these 36, right?

801
00:56:36,920 --> 00:56:56,920
Which makes sense because this last one here, I was making that 64 bit integer, or Postgres, I think in this case, it's storing it as all 8 bytes, 4 byte ant, 32 bit ant, and then a little extra space for padding.

802
00:56:57,920 --> 00:57:17,920
So, we can see this now if we take a, let me do it first without the size. So, let's make a row that has some char's, and then 2 byte, 4 byte, and 8 byte integers.

803
00:57:17,920 --> 00:57:29,920
But I'm intermixing the char's with the integers, right? So, if now if I say, I suppose, what is the size of this? I get 48 bytes.

804
00:57:29,920 --> 00:57:39,920
But if I redo it where I put all the integers first, basically reordering as I was shown before, and then put the char's all at the end, now I get down to 44 bytes.

805
00:57:39,920 --> 00:57:49,920
Again, Postgres has to pad things out to make sure that everything is 64 bit aligned. But it doesn't do this where you automatically, you have to tell Postgres I want this.

806
00:57:49,920 --> 00:57:54,920
Again, where there's some systems that can do this automatically.

807
00:57:55,920 --> 00:58:07,920
Makes sense? Again, I like this because just through SQL commands, we can get a view to the internals of the storage manager of a database system to say, how is it actually laying things out?

808
00:58:08,920 --> 00:58:09,920
Okay?

809
00:58:13,920 --> 00:58:25,920
So now, let's talk about the bar char's a little bit. Let's talk about the other sort of the core SQL data types and how the new system is actually going to represent them.

810
00:58:26,920 --> 00:58:39,920
So for all integer data types, these are essentially going to be the same thing as you get when you allocate a variable of an integer type or a large in whatever in C++.

811
00:58:39,920 --> 00:58:59,920
It's going to be the same representation because that's what the harbor supports. The harbor is going to have a standard representation for whatever two complement integers either signed or unsigned, whatever you get in C++, that follows the standard and that's what the harbor supports and that's what you get in SQL.

812
00:59:00,920 --> 00:59:16,920
For floating point numbers, there will be floating point or real numbers. Again, that's defined in the IEEE 754 standard, that specifies how harbor should represent these decimal numbers.

813
00:59:16,920 --> 00:59:25,920
But every data system is also going to have what are called fixed point decimals. So numeric or decimal, where each of those implementations are going to be different per system.

814
00:59:26,920 --> 00:59:43,920
And we can see the performance difference of the two approaches in a second. For bar char, bar binary, text and blobs, these are typically going to be stored as something that with a header that tells you the length of it, followed by the bytes of the actual value.

815
00:59:43,920 --> 00:59:55,920
And if it's too big to be stored in line in the two both itself within a page, there will be a pointer to some other page that has the data that you need for this attribute.

816
00:59:55,920 --> 01:00:10,920
So I said for a memory system, if it's less than 64 bits, they'll store it in line if it's not, then they store pointer in a dispased database system. It's going to depend on the implementation.

817
01:00:11,920 --> 01:00:26,920
And we'll see that in a second. For timestamps, dates, and intervals and so forth, these are going to be typically 32 or 64 bit integers. That's just the number of milliseconds or microseconds since the Unix e-pot by January 1, 1970.

818
01:00:26,920 --> 01:00:46,920
And if you want to store this with timestamp information, typically they'll store it as based on UTC timestamp, or GMT0, and then they store additional metadata to say what timestamp are you in, and they can convert it as needed. And the system handles that for you.

819
01:00:46,920 --> 01:01:06,920
So because for these types up here, the integer types, because we're relying on the hardware to store whatever, to store the data, how the hardware wants to represent it, that typically needs you just can't copy the files, like the raw database files that you generate from one architecture to another.

820
01:01:06,920 --> 01:01:20,920
So if it's big Indian or little Indian, like x86 is little Indian power and arm or big Indian, like you can't take the binary files from the data system and put it to another one, because the bits are going to flip and it'll get messed up.

821
01:01:20,920 --> 01:01:40,920
So SQLite avoids this problem because they store everything as actually varchars. And at runtime, they cast things based on the type in the attribute, because then they get that portability guarantee, no matter where you plop the file in, they'll always have it in the right order.

822
01:01:41,920 --> 01:01:50,920
So spend a little time talking about fluids and reels and Americs. And then again, this will be a good example of where the database systems are going to do something different.

823
01:01:51,920 --> 01:02:01,920
And the, you can't just rely on the hardware to do certain things where you, because we care about correctness of data and the hardware can't guarantee that for us.

824
01:02:02,920 --> 01:02:13,920
So for variable precision numbers, just like before in integers, we're going to rely on the SQLite's implementation for this.

825
01:02:14,920 --> 01:02:21,920
So if you call float, real or double in SQL, you'll get the same float or double you would get in SQLite's.

826
01:02:22,920 --> 01:02:29,920
So typically, these are going to be faster than the fixed point numbers, so we'll see in a second, because the hardware can natively support this.

827
01:02:32,920 --> 01:02:46,920
But the problem is though, they're not going to have the, they can't guarantee that the correctness of values when you start doing larger calculations, because they're rounding issues, because you can't store exactly, you know, decimals in hardware.

828
01:02:47,920 --> 01:02:56,920
So everyone's probably seen, you know, a simple test program like this when you first learn C or C++, right? I have two floaty point numbers, two thirty to do bit floaty point numbers.

829
01:02:57,920 --> 01:03:02,920
I want to store 0.1 and 0.2, and then I just want to add them together and see what the output is.

830
01:03:03,920 --> 01:03:12,920
So in the first version, I'll just call printf to dump out the, you know, x plus y like that, and I would expect I would get something that should look at 0.3.

831
01:03:14,920 --> 01:03:17,920
And when I run that, I actually get that, that looks, that looks okay.

832
01:03:18,920 --> 01:03:29,920
But in actual Audi, if I increase the number of digits, I'm going to write out in my printf statement, now end up with something that looks like this.

833
01:03:32,920 --> 01:03:37,920
Because again, the horror can't represent 0.3 exactly, it's going to be some approximation based on that.

834
01:03:38,920 --> 01:03:46,920
So okay, if I'm doing, you know, a simple program like before, where I was doing x plus y, and I print that out to a human, yeah, sure, maybe that's not a big deal, right?

835
01:03:47,920 --> 01:03:58,920
But if I'm doing, you know, complex calculations, because I'm trying to land something on the moon, or, you know, put a satellite in space, or if it's your bank account, and you're doing interest calculations, then this rounding arrow is actually going to matter.

836
01:03:59,920 --> 01:04:00,920
And people are going to notice in the plane.

837
01:04:02,920 --> 01:04:13,920
So for this reason, database systems are also going to provide these fixed precision numbers, or fixed point decimals, where the data systems are going to do a bunch of extra work to make sure that you don't have these rounding errors.

838
01:04:13,920 --> 01:04:20,920
You can get this in Java with big decimal, you can get this in Python, I think with decimal type as well, right?

839
01:04:21,920 --> 01:04:31,920
They're all basically, all the different systems are going to do something slightly different, but at a high level essentially they're going to store a, a, a, a very long representation of the number you're trying to represent.

840
01:04:32,920 --> 01:04:39,920
And then additional metadata tell you where the decimal point is, or whether it's signed or unsigned, or is it negative, or not a number and so forth, right?

841
01:04:39,920 --> 01:04:42,920
Again, we have to do this extra work because the horror can't guarantee this for us.

842
01:04:44,920 --> 01:04:57,920
So here's what Postgres does. So this is the numeric type of Postgres. This is actually from the source code itself, and you can see that they're going to represent the type of numeric as some kind of struct, with a bunch of additional metadata about what the number actually is.

843
01:04:58,920 --> 01:05:07,920
But the core thing they're storing that internally, along with this metadata of like, here's how to store the actual number itself, is this numeric digit array here.

844
01:05:07,920 --> 01:05:21,920
Well, that's just a typecast to an unsigned chart above. So they're literally storing your decimal as a, as a string value, and then they use this metadata to figure out, you know, how to then interpret that string to, to put it to be the correct form.

845
01:05:23,920 --> 01:05:27,920
So again, the horror doesn't know anything about this. This is what the data system has, has simple but it.

846
01:05:27,920 --> 01:05:38,920
So we can't just do x plus y, but we can in c plus plus, we've got to do more complicated arithmetic when you want to start calculating or using these numeric types in queries.

847
01:05:39,920 --> 01:05:52,920
So this is a pretty snippet of the addition function for two numerics in Postgres. And as you can see, there's a bunch of checks for that struct, where checkers see whether it's zero, or negative, or sign, or whatever. And this is just to add two numbers together.

848
01:05:52,920 --> 01:05:59,920
This is obviously way more expensive than, you know, calling a single instruction in the CPU, you know, x plus y.

849
01:06:01,920 --> 01:06:15,920
I don't want to give the impression I'm, I'm, I'm, I'm shaming Postgres. My SQL has the same issue, right? They're doing the same thing. They're going to store their, uh, set it their digits as a bar chart that can store it as a third-debit integer.

850
01:06:15,920 --> 01:06:29,920
Again, they have additional metadata to keep track of what the, what the thing, what the numeric type actually is. And just like Postgres, they're going to have a, you know, their own implementations of doing addition that does need all the additional checks.

851
01:06:31,920 --> 01:06:34,920
It's not sexy, but you know, you do need it.

852
01:06:34,920 --> 01:06:53,920
So in the sake of time, if you have time in the end, we can do a demo to show you the performance difference. But it's about 2x, right? The, the, the numeric versions, or the, the, the, the, the davis implemented versions of these decimals, it'd be about 2x slower than the, than like the hardware versions.

853
01:06:53,920 --> 01:07:08,920
All right, for nulls, the, the most common way to do this is that for every single tuple in that header will be a bitmap that keeps track of which attributes that are set the null for that to give in tuple.

854
01:07:09,920 --> 01:07:21,920
Right? And again, the, the header, the size of this bitmap will vary based on the number attributes you do have, which we know whether it could be null or not because it's in the create table statement.

855
01:07:21,920 --> 01:07:39,920
Right? Again, this is the advantage of using a schema instead of destroying JSON, whatever in there, we have a schema. We know whether a column has been been defined as not null or not. And therefore, if it, if it has been declared as not null, we don't need to store this bitmap or you don't need to store entry for it.

856
01:07:40,920 --> 01:07:48,920
So this is the most common approach. Now there's been some overhead here, right? For every single tuple now in the header, we got to have this, this, this bitmap.

857
01:07:48,920 --> 01:08:04,920
Last common, but another approach to do this would be to have special values where you basically say there's some value within the range of values I could have for each type that if I had that value, then I assume that it's, it's a null.

858
01:08:05,920 --> 01:08:17,920
So if I want to know whether a, a 30-bit engine is, is null, then I'll say the, the 30-bit min number I could have, like negative whatever it is, if my value is that, then I'll treat that as null.

859
01:08:18,920 --> 01:08:33,920
So there's one less value I could potentially store, and now there's a bunch of extra stuff I had to do in the rest of my system to keep track of, okay, if I'm looking at a 30-bit integer, if it is that min value, then I know it's null. And not, you know, not let people insert it arbitrarily.

860
01:08:34,920 --> 01:08:51,920
The worst choice, and I don't have a, I don't have a screenshot of this, actually I might, the worst choice, if I only see one system ever actually do, is for every single tuple itself, sorry, everything will attribute in the tuple, you have a little flag in front of it, tells you whether it's null or not.

861
01:08:52,920 --> 01:09:10,920
And the reason why this is terrible is because, it's like when we talked about alignment, right, I can't have a, you know, I can't have a 32-bit integer and put one bit in front of it to say, hey, this thing is null or not, I got to store another byte.

862
01:09:10,920 --> 01:09:24,920
I said, now all my 30-bit integers, and if I want to be 64-bit aligned, and maybe I got to store the double size, so like, if, to store 30-bit integer, to keep track of this null, if I'm putting this flag in front of it, I may have to store another 30-bit, just to have one bit to say that it's null or not.

863
01:09:24,920 --> 01:09:37,920
Do I have a screenshot here on the C? The only system that I know that actually did this was MemSQL, which is the earlier name of, of single store.

864
01:09:37,920 --> 01:09:47,920
So despite them, you know, sponsoring the class, I don't have the screenshot here, I'll put some slack. That was the sheetish idea, it's one of the sheetish ideas I've ever seen.

865
01:09:47,920 --> 01:09:53,920
But they got rid of it, because it's super wasteful, and they do the column header now.

866
01:09:53,920 --> 01:10:05,920
For large values, like really large values, the most data systems are not going to let you store them directly in the page itself.

867
01:10:05,920 --> 01:10:16,920
Again, a page size is defined by the data system, and every single page within that table has to have the same page size.

868
01:10:16,920 --> 01:10:23,920
There's an experimental system at a Germany that they can support via link pages, we can ignore that, nobody else does that.

869
01:10:23,920 --> 01:10:32,920
But so that means that, like at some point, I've decided, should I store this large varchar, large string in my tuple page or not?

870
01:10:33,920 --> 01:10:41,920
For this, if it exceeds, for everything that they're going to have different thresholds, say, when can you not store it, and when you have to put it into what is called an overflow page.

871
01:10:41,920 --> 01:10:48,920
So in Postgres, they call it the Toast, I forget about this actually stands for, but any attribute that's larger than two kilobytes, those storage is a separate page.

872
01:10:48,920 --> 01:10:57,920
And then in the actual tuple itself, those have a pointer, a record ID, and an offset, then points to where to go find the actual value that you're looking for.

873
01:10:58,920 --> 01:11:15,920
And again, you as the SQL programmer, you don't know this, you don't care, you call a select star on the query, and the day systems are responsible for going, reading the base tuple, recognizing that it's pointing to an overflow page, go get that data, and then copy it into the buffer that it then produces the output for you.

874
01:11:15,920 --> 01:11:19,920
So it hides underneath the covers that it's actually done this for you.

875
01:11:19,920 --> 01:11:27,920
So Postgres is two kilobytes, they're up to eight kilobytes. I think you can tune this, but it goes up to, obviously you can't exceed eight kilobytes.

876
01:11:27,920 --> 01:11:39,920
And my SQL, the overflow size is one half the current page size, and then in SQL Server, surprisingly, you can set the default is if it exceeds the size of the page, then it overflows.

877
01:11:39,920 --> 01:11:51,920
So the size of the data trying to store in this oversized attribute plus the regular data, the combination of that exceeds the size of a page, then they'll put the oversized data to another page.

878
01:11:51,920 --> 01:12:02,920
And you can chain these things together. So if you say you want to store for whatever reason, a one gigabyte video, or 10 gigabyte video, your data system couldn't let you do that.

879
01:12:02,920 --> 01:12:13,920
And then this overflow page, since they all have to be the same fixed length size as well, it could just have a pointer to say, okay, here's the data for this range of the data for this attribute, but oh, by the way, here's a pointer to the next page.

880
01:12:13,920 --> 01:12:21,920
And you've got to follow along that linked list, go get all the data and put it back together.

881
01:12:21,920 --> 01:12:35,920
So the last thing you can do is called external file storage, just short of value storage. And this is where the database system is not going to store the large attribute in pages that it manages.

882
01:12:35,920 --> 01:12:54,920
It's going to write it out to your local file system, and then internally store the URI or the URL, where that data is located, so that when you query against the table, and you go get that attribute, it goes to the OS and goes gets that data, copies it into its buffer, and then hands it back to you.

883
01:12:55,920 --> 01:13:05,920
So I think only postcard or sort of Oracle and SQL Server can do this. In Oracle, they're called B files, Microsoft called file streams.

884
01:13:05,920 --> 01:13:18,920
And again, it's just a URI to some data on this, and it does the CIS call to go get it from the operating system. And postcards, you can do this for the confrorn data wrappers.

885
01:13:18,920 --> 01:13:30,920
There's additional mechanisms to go store data and cloud storage, and then again, now within a single SQL interface, I can go fetch the data, and it haven't appeared as if it was in the table itself.

886
01:13:30,920 --> 01:13:38,920
So when we write things out to these external files, the data system cannot make any changes to it.

887
01:13:38,920 --> 01:13:53,920
It's like you're written out to the file system, I'm not going to go and make in place updates to it. I can't update it. I can only read it in, and then if I delete the two-po that's pointing to this file, there's mechanisms inside, do I just want to delete the file as well.

888
01:13:53,920 --> 01:14:07,920
And so the reason why you may want to do this is because, as I said, you don't want to store a 10 gigabyte file in your database system for management reasons, because then it's a log record, that comes expensive.

889
01:14:07,920 --> 01:14:22,920
But also, too, typically, database-minute systems are stored on higher end hardware, and that makes storage expensive. Like if you use Amazon RDS, I think they charge 4x more for storage, and they didn't get from EBS.

890
01:14:22,920 --> 01:14:35,920
And certainly EBS is even more if you have a locally attached disk. So you don't want to be storing these large files that maybe are only read directly in the data that's managed by the files that are managed by the data system.

891
01:14:35,920 --> 01:14:40,920
Let the OS on some cheaper storage handle that for you.

892
01:14:40,920 --> 01:14:50,920
So there's a paper from, I'm 15 years old now, from Jim Gray, which is one of the guys that went that the attorney went for databases in the 90s, and he invented a lot of the stuff we're talking about this semester.

893
01:14:50,920 --> 01:14:59,920
He had a paper he wrote at Microsoft a few years ago that talks about whether should you store large data in a data system or not.

894
01:14:59,920 --> 01:15:06,920
And I think for their recommendation, they said anything larger than 250 kilobytes stored externally.

895
01:15:06,920 --> 01:15:16,920
Again, this is a while ago. I don't, I wouldn't recommend that anymore. And actually we had the guy that invented SQL Light. He came to CMU, gave a talk five years ago.

896
01:15:16,920 --> 01:15:24,920
And he mentioned that in his experience, it's actually better to store things in SQL Light, like if you're running on a phone app.

897
01:15:24,920 --> 01:15:34,920
So if you have like your application has a bunch of thumbnails, images, you're better off storing that in the data system because now when you go retrieve them, your application already has the handles of the data system open.

898
01:15:34,920 --> 01:15:45,920
It's already in the files already open. So it's much faster to go get those thumbnails directly from the data system versus having to do a bunch of F opens and F reads to a bunch of files on disk.

899
01:15:45,920 --> 01:15:53,920
So I would say, I mean, this is pure conjecture. 50 megs or less is probably OK. Anything beyond that, you want to use external storage.

900
01:15:53,920 --> 01:16:02,920
And ORMs like Django and other other application frameworks, they have mechanisms to handle that for you.

901
01:16:03,920 --> 01:16:12,920
So next class, next class will continue on storage, talk about storage models and then column versus road, road storage.

902
01:16:12,920 --> 01:16:20,920
And this will be again, explain to you why ducty B is faster than SQL Light. And on that note, the ducty B people will set me stickers.

903
01:16:20,920 --> 01:16:24,920
If you want one, come get one. I have pins too. Hit it.

904
01:16:33,920 --> 01:16:51,920
I'm the poppy with the motherfucking ho ho 28 a gram depending on if it's good. You ain't hit them all yet. Still got your sugar. I smack you with the bottom of the tip to tell you.

905
01:16:52,920 --> 01:16:57,920
Show me what it's safe set for I blow your face back. I got a block on tap. The feds can't trace that.

906
01:16:57,920 --> 01:17:08,920
Style is like temp, but proof. You can't lace that at the Dominican. Oh you got. Call me Dominican. Black Skelly. Black leather. Black sweat Timberlands. My whole black 38 is sent you to the perigates.

907
01:17:08,920 --> 01:17:16,920
You get the zombie trying to skate and that's your first mistake. I ain't lying for that cake. You're famous. See you wait. My grandson's happy wait. The Randthaw ever stayed.

908
01:17:16,920 --> 01:17:23,920
When he had to how I'm living, I tell him I'm living great.

