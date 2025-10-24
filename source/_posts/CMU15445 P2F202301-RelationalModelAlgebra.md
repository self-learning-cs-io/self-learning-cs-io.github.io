---
title: CMU15445 P2F202301 RelationalModelAlgebra
---

1
00:00:00,000 --> 00:00:29,679
I'm clearly violating fire code here.

2
00:00:29,679 --> 00:00:36,679
I guess you can kind of maybe sit up there at front or you sit on the floor.

3
00:00:36,679 --> 00:00:45,679
So, let's talk about, first of all, we have a DJ again, a round of applause from DJ2PL.

4
00:00:45,679 --> 00:00:50,679
You're the fiercest DJ that's not in jail right now. Do you want to do a quick preview?

5
00:00:50,679 --> 00:00:58,679
What would you do to everyone?

6
00:00:58,679 --> 00:01:03,679
The other big announcement too is that for the first time we now have two faculty teaching

7
00:01:03,679 --> 00:01:08,680
at this place, J. Ganesh Patel, who's in the front row here.

8
00:01:08,680 --> 00:01:18,680
Wisconsin. We're happy that he's here, so it will be help me throughout the sector.

9
00:01:18,680 --> 00:01:25,680
Okay, so I'll get going. I'll post it on Piazza. There's another course lecture we've already talked about.

10
00:01:25,680 --> 00:01:32,680
I get moved to that in jail. So, of the course. So, we're not going to go over like a bunch of those things all over again.

11
00:01:32,680 --> 00:01:36,680
I just want to cover some things that if you might have missed that are important to understand throughout this lecture,

12
00:01:36,680 --> 00:01:39,680
and then we'll jump right into the material.

13
00:01:39,680 --> 00:01:45,680
All right, so the first thing we have a course sponsor, single store, cloud-based database system

14
00:01:45,680 --> 00:01:50,680
that supports hybrid workloads, transactions, analytics. As I said in the first lecture,

15
00:01:50,680 --> 00:01:55,680
it is a in-memory column store that uses skip list with just in time query.

16
00:01:55,680 --> 00:02:00,680
It's distributed, shared nothing. If no, that means anything to you right now. That's fine.

17
00:02:00,680 --> 00:02:04,680
Things. Basically coming at the end of the semester to give a guest lecture,

18
00:02:04,680 --> 00:02:11,680
a guest for a long time, they really called men's sequel, and then they changed the name to single store.

19
00:02:12,680 --> 00:02:18,680
It's a state-of-the-art database system that's going to incorporate a lot of the stuff that we'll discuss throughout the semester.

20
00:02:18,680 --> 00:02:23,680
The crowd is huge. Obviously, not everyone is going to be here. They're trying to get the wait list.

21
00:02:23,680 --> 00:02:29,680
The bad news is because the wait list is so huge, the department took it away from us, and we have no controller.

22
00:02:29,680 --> 00:02:35,680
They're trying to figure out who needs a graduate, who needs to get the system elective and all that stuff.

23
00:02:36,680 --> 00:02:41,680
If you comment and ask us, hey, can I get off the wait list? The bad news is that we don't control it anymore.

24
00:02:41,680 --> 00:02:46,680
The good news is because we have Gignesh now that we'll be teaching this class every semester.

25
00:02:46,680 --> 00:02:50,680
If you can't get in this semester, you'll be able to get it next semester.

26
00:02:50,680 --> 00:02:56,680
The admins will move people off the wait list as people drop and at the end of the class become available.

27
00:03:06,680 --> 00:03:14,680
Different departments, different departments, different departments, different things I found out since I came faculty.

28
00:03:14,680 --> 00:03:20,680
The bad news is that if you're not enrolled now, you're unlikely to be in the spring.

29
00:03:20,680 --> 00:03:28,680
For all the important announcements, everything will be in Piazza, Project Zero, which we talked about last in the first lecture.

30
00:03:29,680 --> 00:03:32,680
That's now available on Gradescope and on the website.

31
00:03:32,680 --> 00:03:37,680
The final grades we show through Canvas and everything will be submitted through Gradescope.

32
00:03:37,680 --> 00:03:44,680
Again, because people watch these lectures that aren't at CMU, they're going to be outside of our university.

33
00:03:44,680 --> 00:03:51,680
If you want to test your projects, same way that CMU students are, there's a separate Gradescope account.

34
00:03:51,680 --> 00:03:55,680
You can go to using that code there and you can start them and test things out.

35
00:03:56,680 --> 00:03:58,680
I'll release those projects as...

36
00:04:01,680 --> 00:04:02,680
In exchange for...

37
00:04:04,680 --> 00:04:05,680
...for people to watch this.

38
00:04:06,680 --> 00:04:09,680
In exchange, to make this all available to you, we need to...

39
00:04:11,680 --> 00:04:12,680
I don't think you have one yet, do you?

40
00:04:12,680 --> 00:04:16,680
My God, band, because first thing I get about there is sort of true.

41
00:04:16,680 --> 00:04:19,680
But they said I was born in the streets of Baltimore.

42
00:04:19,680 --> 00:04:20,680
I am from Baltimore.

43
00:04:26,680 --> 00:04:28,680
So, whatever.

44
00:04:28,680 --> 00:04:29,680
And...

45
00:04:30,680 --> 00:04:32,680
Someone could finish that, that'd be great.

46
00:04:32,680 --> 00:04:35,680
And I did write, I'd comment, hey, I am from Baltimore.

47
00:04:35,680 --> 00:04:36,680
That's not from the streets.

48
00:04:37,680 --> 00:04:40,680
So, I want to cover for logistics.

49
00:04:40,680 --> 00:04:42,680
This is a big class.

50
00:04:42,680 --> 00:04:45,680
Obviously, there's a lot of people here that may have different backgrounds.

51
00:04:45,680 --> 00:04:48,680
And so, we want you to interrupt us as we're going throughout the semester.

52
00:04:48,680 --> 00:04:51,680
And if you have questions about talking about...

53
00:04:56,680 --> 00:04:57,680
That's a fine question.

54
00:04:58,680 --> 00:05:00,680
I also get very excited when I talk about this.

55
00:05:00,680 --> 00:05:05,680
Again, my life, my biological daughter, number one, is databases and then nothing else.

56
00:05:05,680 --> 00:05:06,680
Like, I don't talk about...

57
00:05:06,680 --> 00:05:09,680
I have to talk about, obviously, literally, just databases.

58
00:05:09,680 --> 00:05:10,680
You can confirm.

59
00:05:11,680 --> 00:05:12,680
It is just databases, yes.

60
00:05:12,680 --> 00:05:14,680
My parents are Trump supporters, we don't talk to them.

61
00:05:14,680 --> 00:05:16,680
Like, it is just databases.

62
00:05:19,680 --> 00:05:20,680
It's funny to you, right?

63
00:05:21,680 --> 00:05:27,680
All right, so again, so if you're on the phone fast, or if you have questions, you interrupt us.

64
00:05:27,680 --> 00:05:32,680
What we're not going to do is that at the end of the class, have people line up and say,

65
00:05:32,680 --> 00:05:34,680
what about 4 or 5?

66
00:05:36,680 --> 00:05:38,680
The material we discussed during the lecture, as we go along, because...

67
00:05:39,680 --> 00:05:41,680
I want you to interrupt us as we're talking.

68
00:05:41,680 --> 00:05:44,680
Because if you have questions, then somebody else is likely to have questions too,

69
00:05:44,680 --> 00:05:45,680
for us to...

70
00:05:46,680 --> 00:05:48,680
For us to answer these things and discuss it.

71
00:05:48,680 --> 00:05:52,680
And from a pedagogical standpoint, it's better for us as well, because I go back and watch...

72
00:05:52,680 --> 00:05:56,680
And I see where people ask questions, and I see, oh, that's the way we didn't get quite right.

73
00:05:56,680 --> 00:05:57,680
You go fix this lot.

74
00:05:57,680 --> 00:05:58,680
So having the questions...

75
00:06:03,680 --> 00:06:05,680
All right, any questions about these logistics?

76
00:06:07,680 --> 00:06:08,680
All right, boom.

77
00:06:08,680 --> 00:06:09,680
Let's go right into it.

78
00:06:09,680 --> 00:06:10,680
Okay.

79
00:06:10,680 --> 00:06:12,680
So we're going to talk about sort of...

80
00:06:13,680 --> 00:06:16,680
Round of what databases are, why we need database management systems.

81
00:06:16,680 --> 00:06:17,680
By this course exists.

82
00:06:18,680 --> 00:06:20,680
Not just because we do stupid things.

83
00:06:20,680 --> 00:06:22,680
It's a super important topic.

84
00:06:22,680 --> 00:06:24,680
And then we'll talk about the...

85
00:06:24,680 --> 00:06:30,680
In my opinion, the dominant model for how you want to build or use in a database system.

86
00:06:30,680 --> 00:06:36,680
Then we'll talk about relational algebra, the mechanism, or the operators we're used to interact with a relational model database.

87
00:06:36,680 --> 00:06:41,680
And we'll finish up because we have to be talking about alternative models that people think...

88
00:06:41,680 --> 00:06:45,680
...to a relational model, and I have strong opinions of why they're wrong.

89
00:06:45,680 --> 00:06:46,680
Okay?

90
00:06:46,680 --> 00:06:48,680
All right, so...

91
00:06:50,680 --> 00:06:52,680
The second most important thing I like.

92
00:06:52,680 --> 00:06:53,680
Can I...?

93
00:06:58,680 --> 00:06:59,680
SQL Server?

94
00:06:59,680 --> 00:07:00,680
SQL Server?

95
00:07:00,680 --> 00:07:01,680
Yes.

96
00:07:01,680 --> 00:07:03,680
If you're in the waiting list, can you get access to PSA?

97
00:07:03,680 --> 00:07:06,680
Yes, if you're in the waiting list, can you get access to PSA?

98
00:07:06,680 --> 00:07:08,680
Yes, we'll post the...

99
00:07:08,680 --> 00:07:10,680
...now, we'll make that available.

100
00:07:10,680 --> 00:07:11,680
Yes.

101
00:07:11,680 --> 00:07:13,680
See, here's a SQL Server in the back.

102
00:07:15,680 --> 00:07:16,680
My SQL...

103
00:07:17,680 --> 00:07:18,680
Yes.

104
00:07:19,680 --> 00:07:21,680
I don't know if it'd be one more.

105
00:07:22,680 --> 00:07:23,680
Good sound, job.

106
00:07:25,680 --> 00:07:28,680
I think everybody's listed in SQL Server PuzzGust Mongo.

107
00:07:28,680 --> 00:07:30,680
There's all database management systems.

108
00:07:30,680 --> 00:07:31,680
Right?

109
00:07:31,680 --> 00:07:33,680
We're talking databases.

110
00:07:33,680 --> 00:07:36,680
And don't feel bad that it's not the only one making this mistake.

111
00:07:36,680 --> 00:07:38,680
This is Jesse.

112
00:07:38,680 --> 00:07:40,680
I think this year.

113
00:07:41,680 --> 00:07:42,680
See what it plays.

114
00:07:43,680 --> 00:07:45,680
TechB for 4Place.

115
00:07:45,680 --> 00:07:51,680
A relational one of these systems presents the information to be stored and retrieved in rows and columns.

116
00:07:51,680 --> 00:07:52,680
Justin...

117
00:07:52,680 --> 00:07:53,680
What is the matrix?

118
00:07:53,680 --> 00:07:54,680
No.

119
00:07:54,680 --> 00:07:55,680
Fuck that.

120
00:07:55,680 --> 00:07:56,680
All right.

121
00:08:00,680 --> 00:08:01,680
It'll get worse.

122
00:08:01,680 --> 00:08:02,680
Okay.

123
00:08:02,680 --> 00:08:03,680
Okay.

124
00:08:03,680 --> 00:08:04,680
Okay.

125
00:08:04,680 --> 00:08:05,680
Based.

126
00:08:05,680 --> 00:08:06,680
Not in it.

127
00:08:06,680 --> 00:08:08,680
I'm being pedantic here, but it's good to understand the distinction between the two.

128
00:08:08,680 --> 00:08:09,680
Because when we...

129
00:08:09,680 --> 00:08:11,680
Just talk about the data models, the understanding like, okay.

130
00:08:11,680 --> 00:08:13,680
We don't care about this maintenance.

131
00:08:13,680 --> 00:08:14,680
Yeah.

132
00:08:14,680 --> 00:08:15,680
Or about what data actually is.

133
00:08:15,680 --> 00:08:16,680
And how we're going to interact with it.

134
00:08:16,680 --> 00:08:17,680
So,

135
00:08:17,680 --> 00:08:22,680
I'll organize collection of data that's related to each other.

136
00:08:22,680 --> 00:08:24,680
That's meant to model some aspect...

137
00:08:25,680 --> 00:08:27,680
Everybody lists data systems.

138
00:08:27,680 --> 00:08:31,680
An example of a database though would be the university database that keeps track of data.

139
00:08:31,680 --> 00:08:35,680
And the university database that keeps track of what students are enrolled in what classes in your grades.

140
00:08:35,680 --> 00:08:36,680
Right?

141
00:08:36,680 --> 00:08:38,680
Because that's trying to model a...

142
00:08:38,680 --> 00:08:43,680
The real university interactions that students are taking classes and getting grades.

143
00:08:47,680 --> 00:08:54,680
This course is so important because the database, a array, a database, is going to be the fundamental component.

144
00:08:54,680 --> 00:08:58,680
The unrelentive any application or anything you're going to do with your life.

145
00:08:59,679 --> 00:09:01,679
So, matter if you go off and get a job doing...

146
00:09:01,679 --> 00:09:04,679
Doing CS related things or you don't do...

147
00:09:04,679 --> 00:09:06,679
You're not a programmer.

148
00:09:06,679 --> 00:09:09,679
At the end of the day, you're always going to be interacting with the database.

149
00:09:09,679 --> 00:09:11,679
Even if it's an Excel spreadsheet,

150
00:09:11,679 --> 00:09:13,679
the database.

151
00:09:13,679 --> 00:09:14,679
Right?

152
00:09:14,679 --> 00:09:16,679
That is one.

153
00:09:16,679 --> 00:09:19,679
And this course is important because...

154
00:09:19,679 --> 00:09:22,679
Because you're going to be interacting with database systems,

155
00:09:22,679 --> 00:09:24,679
you need to understand what's acting on the inside.

156
00:09:25,679 --> 00:09:31,679
Even if it's a small application like running on your cell phone or a new application with the device that data,

157
00:09:31,679 --> 00:09:35,679
it's important to understand the queries or when you did the database system,

158
00:09:35,679 --> 00:09:37,679
what is it actually doing?

159
00:09:37,679 --> 00:09:38,679
Right?

160
00:09:38,679 --> 00:09:44,679
And what are the trade-offs you would make for how you use one data model versus another or one database approach versus another?

161
00:09:44,679 --> 00:09:47,679
So, what's the most widely deployed database system in the world?

162
00:09:47,679 --> 00:09:49,679
Am I taking a guess?

163
00:09:51,679 --> 00:09:53,679
Everyone has a cell phone, right?

164
00:09:53,679 --> 00:09:55,679
Sequel light is on every cell phone.

165
00:09:55,679 --> 00:09:59,679
And it's written by one dude down in North Carolina.

166
00:09:59,679 --> 00:10:00,679
I've got a...

167
00:10:00,679 --> 00:10:02,679
Like, helper doesn't have an address.

168
00:10:02,679 --> 00:10:04,679
He's like a... he's like a nomad.

169
00:10:04,679 --> 00:10:05,679
Right?

170
00:10:05,679 --> 00:10:06,679
So, this is going to be an example of a database.

171
00:10:06,679 --> 00:10:08,679
So, we talk to the university application.

172
00:10:08,679 --> 00:10:10,679
We can talk about...

173
00:10:10,679 --> 00:10:12,679
We have something more relevant to everyone here.

174
00:10:12,679 --> 00:10:17,679
So, I think it's like Spotify or like Bandcamp or iTunes or Keynote of Music.

175
00:10:17,679 --> 00:10:22,679
So, we can create a really simple database that has basically two entities.

176
00:10:22,679 --> 00:10:25,679
There are problems with artists appearing albums.

177
00:10:25,679 --> 00:10:31,679
So, the thing we need to store in our data is it's going to be like for every single artist, you know, what is their name, what country...

178
00:10:31,679 --> 00:10:35,679
But they start and they have to be like, what's the name of the album?

179
00:10:35,679 --> 00:10:36,679
When did it come out?

180
00:10:36,679 --> 00:10:38,679
What artists appear on it?

181
00:10:38,679 --> 00:10:44,679
And so, what we talk about now, we'll do a sort of straw man implementation of a database...

182
00:10:44,679 --> 00:10:46,679
...and such this database.

183
00:10:46,679 --> 00:10:48,679
And we'll see why it's stupid.

184
00:10:48,679 --> 00:10:50,679
We see all the problems that it's going to have.

185
00:10:50,679 --> 00:10:54,679
And then that again, that'll help motivate why we actually want to build a full-fledged database.

186
00:10:54,679 --> 00:10:57,679
It's a rely on a full-fledged database.

187
00:10:57,679 --> 00:11:05,679
So, the easiest way to implement a database system of the manager's data is to just use files on disk.

188
00:11:05,679 --> 00:11:07,679
So, for every single...

189
00:11:07,679 --> 00:11:12,679
For my two entities, I have an album, I have an artist, I have a CSV file, a comma-severative value file.

190
00:11:12,679 --> 00:11:14,679
And every single file...

191
00:11:14,679 --> 00:11:17,679
...tax, every single line...

192
00:11:18,679 --> 00:11:20,679
...right?

193
00:11:20,679 --> 00:11:25,679
It's the time I want to find something in my...

194
00:11:25,679 --> 00:11:32,679
I'm going to open it up, you know, parse it, line my line and try to find the data that I'm looking for.

195
00:11:32,679 --> 00:11:33,679
Right?

196
00:11:33,679 --> 00:11:36,679
So, say I want to do something with...

197
00:11:36,679 --> 00:11:38,679
...right?

198
00:11:44,679 --> 00:11:50,679
...parse as the CSV, magic work parts basically, it's just splitting on the commas.

199
00:11:50,679 --> 00:11:55,679
And then if I find that the name of the...

200
00:11:55,679 --> 00:11:58,679
...then I print it out.

201
00:12:00,679 --> 00:12:02,679
Right?

202
00:12:02,679 --> 00:12:04,679
It works.

203
00:12:05,679 --> 00:12:08,679
It is bad. Why?

204
00:12:10,679 --> 00:12:11,679
Yes.

205
00:12:13,679 --> 00:12:14,679
It says it's...

206
00:12:14,679 --> 00:12:16,679
...I'm really, really slow, I'm really slow, I'm really slow, I'm really slow, I'm really slow, I'm really slow, I'm really slow, I'm really slow.

207
00:12:16,679 --> 00:12:20,679
Yes, I always think of an extremes in software, it says...

208
00:12:20,679 --> 00:12:22,679
...three records here.

209
00:12:22,679 --> 00:12:24,679
Yeah, I can load that up in a single page and parse that pretty quickly.

210
00:12:24,679 --> 00:12:27,679
But if I have three billion records...

211
00:12:27,679 --> 00:12:32,679
...then yeah, and if jizz is the last entry, then I got to parse every single line my line.

212
00:12:33,679 --> 00:12:35,679
Yes, somebody's...

213
00:12:38,679 --> 00:12:43,679
...insertion continuation was the word of our goal of considering like system restrictions.

214
00:12:43,679 --> 00:12:47,679
She says that the insertion deletion would be really horrible given the system restrictions.

215
00:12:47,679 --> 00:12:48,679
So...

216
00:12:48,679 --> 00:12:50,679
...insertion wouldn't be that bad, right?

217
00:12:50,679 --> 00:12:52,679
Because if I just append to the end of it, who cares?

218
00:12:52,679 --> 00:12:53,679
Right?

219
00:12:54,679 --> 00:12:56,679
...I think it's a little...

220
00:12:59,679 --> 00:13:02,679
...right, so she said, what if I keep thinking forwarded by release year?

221
00:13:02,679 --> 00:13:06,679
Then yeah, I have to go find where it should be...

222
00:13:06,679 --> 00:13:08,679
...that would suck, right?

223
00:13:08,679 --> 00:13:11,679
You also said update or delete, right?

224
00:13:11,679 --> 00:13:15,679
If I wanted to delete entry, I get it to the same problem as looking for it, I got to find the thing I'm looking for and delete it.

225
00:13:15,679 --> 00:13:20,679
Those are implementation issues, but there's some other problems as well.

226
00:13:21,679 --> 00:13:23,679
So, in from the problem, back to the first thing, if there's any kind of...

227
00:13:23,679 --> 00:13:25,679
...in that, then you didn't go on that way.

228
00:13:25,679 --> 00:13:29,679
So, your statement is that I'm representing everything as say strings, and if there's a what?

229
00:13:29,679 --> 00:13:32,679
Also, in the 40s, we are working with 90, 90s.

230
00:13:32,679 --> 00:13:35,679
So, it's actually somebody who's stuck...

231
00:13:38,679 --> 00:13:40,679
...not in there.

232
00:13:40,679 --> 00:13:41,679
Yeah, correct, yeah.

233
00:13:41,679 --> 00:13:42,679
So, her comment is...

234
00:13:42,679 --> 00:13:43,679
...I'm not going to say that.

235
00:13:43,679 --> 00:13:44,679
...but I'm not going to say that.

236
00:13:44,679 --> 00:13:45,679
So, I'm not going to say that.

237
00:13:45,679 --> 00:13:46,679
I'm not going to say that.

238
00:13:46,679 --> 00:13:47,679
I'm not going to say that.

239
00:13:48,679 --> 00:13:49,679
...not going to say that.

240
00:13:49,679 --> 00:13:50,679
Yeah, correct, yeah.

241
00:13:50,679 --> 00:13:51,679
So, her comment is...

242
00:13:51,679 --> 00:13:52,679
...I'm still...

243
00:13:52,679 --> 00:13:56,679
...I'm still in the years, and in this case, it's text files, so it's asking text.

244
00:13:56,679 --> 00:14:04,679
But my magic parse function, which I haven't defined, is somehow knowing, oh, this should be an integer, and it's going to call A to I.

245
00:14:04,679 --> 00:14:08,679
It's going to cast the bar far into a string to an integer.

246
00:14:08,679 --> 00:14:10,679
And then, someone's in the back...

247
00:14:10,679 --> 00:14:13,679
...it's just a bunch of files on disk.

248
00:14:14,679 --> 00:14:15,679
A parsing error.

249
00:14:15,679 --> 00:14:16,679
It's a crop.

250
00:14:16,679 --> 00:14:17,679
That's a good one.

251
00:14:21,679 --> 00:14:22,679
What are some other problems?

252
00:14:22,679 --> 00:14:25,679
...reading and writing the file gets you.

253
00:14:25,679 --> 00:14:27,679
You say, reading and writing the file is like...

254
00:14:27,679 --> 00:14:28,679
...maybe we sort of covered that, right?

255
00:14:28,679 --> 00:14:31,679
Like, if you're inserting the end, no big deal.

256
00:14:32,679 --> 00:14:33,679
Reading...

257
00:14:33,679 --> 00:14:35,679
...could make it...

258
00:14:35,679 --> 00:14:36,679
...well...

259
00:14:36,679 --> 00:14:37,679
...yes.

260
00:14:38,679 --> 00:14:40,679
...like, you're...

261
00:14:40,679 --> 00:14:42,679
...it's the comment in the name, right, break.

262
00:14:42,679 --> 00:14:43,679
The...

263
00:14:43,679 --> 00:14:45,679
...like, Python packages for...

264
00:14:45,679 --> 00:14:46,679
...it's a part of that.

265
00:14:46,679 --> 00:14:47,679
Yes.

266
00:14:47,679 --> 00:14:50,679
...you're not able to have like, this branch...

267
00:14:50,679 --> 00:14:52,679
...you're not able to have current use of the file.

268
00:14:52,679 --> 00:14:54,679
...you're not able to have current use of the file.

269
00:14:54,679 --> 00:14:56,679
...the writers, things get a little dicey.

270
00:14:56,679 --> 00:14:57,679
Yeah.

271
00:14:57,679 --> 00:14:58,679
...alright.

272
00:14:59,679 --> 00:15:02,679
...the way the fact that this is the OSN figures...

273
00:15:02,679 --> 00:15:03,679
...is...

274
00:15:03,679 --> 00:15:04,679
...the way it is.

275
00:15:04,679 --> 00:15:05,679
Yeah, per-s.

276
00:15:05,679 --> 00:15:07,679
...and then...

277
00:15:11,679 --> 00:15:13,679
...then...

278
00:15:29,679 --> 00:15:31,679
...so the small sort of...

279
00:15:31,679 --> 00:15:32,679
...so the file...

280
00:15:32,679 --> 00:15:33,679
...the small sort of the...

281
00:15:33,679 --> 00:15:34,679
...the form of the...

282
00:15:34,679 --> 00:15:37,739
is implicitly relevant.

283
00:15:37,739 --> 00:15:38,799
That'll cause problems.

284
00:15:38,799 --> 00:15:41,039
We'll see in a second.

285
00:15:41,039 --> 00:15:43,599
So we covered all the things.

286
00:15:43,599 --> 00:15:51,000
So how do we make sure that going back or quickly?

287
00:15:54,599 --> 00:15:54,839
Right?

288
00:15:54,839 --> 00:15:55,599
So I have woo-s.

289
00:16:01,479 --> 00:16:02,719
So I'm going to go fix it.

290
00:16:02,719 --> 00:16:04,519
I've got to make sure that every single place where

291
00:16:04,519 --> 00:16:08,720
I have, oh, it all gets updated the same.

292
00:16:08,720 --> 00:16:10,600
I guess these are just a little bit different.

293
00:16:10,600 --> 00:16:14,360
The operating system does the file system doesn't know.

294
00:16:14,360 --> 00:16:18,439
It just knows that whatever you want to read right.

295
00:16:18,439 --> 00:16:21,519
So we now in the application to go,

296
00:16:21,519 --> 00:16:26,639
we make sure all the entries will be in the instructions.

297
00:16:26,639 --> 00:16:28,720
She brought up the issue of what someone overrights a year

298
00:16:28,720 --> 00:16:29,879
with them valid string.

299
00:16:29,879 --> 00:16:31,600
We throw a parsing error.

300
00:16:31,600 --> 00:16:34,319
In my example here, I'm assuming there's

301
00:16:34,320 --> 00:16:39,920
one correspondence between one and one artist.

302
00:16:39,920 --> 00:16:43,040
But obviously we know that's not the case in a lot of albums.

303
00:16:43,040 --> 00:16:48,720
So how do I go change my files now to go account for that?

304
00:16:48,720 --> 00:16:51,840
What is a lead and artist who has albums?

305
00:16:51,840 --> 00:16:53,920
What's the name of that?

306
00:16:53,920 --> 00:16:54,420
Right?

307
00:16:54,420 --> 00:16:56,720
Well, in my example here, nothing will happen.

308
00:16:56,720 --> 00:16:59,320
And now I got a bunch of albums that have an artist name

309
00:16:59,320 --> 00:17:03,360
that doesn't map anything to the reference

310
00:17:03,360 --> 00:17:06,160
on the tag that he gets broken.

311
00:17:06,160 --> 00:17:08,079
We brought a lot of the implementation issues already.

312
00:17:08,079 --> 00:17:09,599
Like how do you find it?

313
00:17:09,599 --> 00:17:12,599
In my example here, it's it's O N. Right?

314
00:17:12,599 --> 00:17:15,599
It's a I have to do a brute force scan,

315
00:17:15,599 --> 00:17:16,880
screenshot scan across the entire file

316
00:17:16,880 --> 00:17:18,880
to find the thing I'm looking for.

317
00:17:18,880 --> 00:17:23,839
Now, if I assume that there's only one person that, you know,

318
00:17:23,839 --> 00:17:26,640
only one artist with a given name, then I can start

319
00:17:26,640 --> 00:17:28,160
because I'm done.

320
00:17:28,160 --> 00:17:29,799
Part of the same name all the time.

321
00:17:30,519 --> 00:17:34,119
Albums that, I don't know, Jizo puts out,

322
00:17:34,119 --> 00:17:36,200
just like Jizo and Florida or something like that.

323
00:17:36,200 --> 00:17:38,839
I got to keep scanning the entire file.

324
00:17:38,839 --> 00:17:40,960
And that's going to be N or N, order N.

325
00:17:42,960 --> 00:17:45,399
In my example here, I have a little bit of a

326
00:17:45,399 --> 00:17:47,919
that's operating on the files.

327
00:17:47,919 --> 00:17:50,240
But let's say I want to rewrite it to now run it.

328
00:17:50,240 --> 00:17:52,440
I want to write a new application that uses the same database,

329
00:17:52,440 --> 00:17:55,480
but I want to write it in Rust because that's the hot thing.

330
00:17:55,480 --> 00:17:58,639
So now I got to go make sure that whatever information

331
00:17:58,640 --> 00:18:01,440
it implicit scheme I had in my Python code now maps over

332
00:18:01,440 --> 00:18:02,960
to my Rust code.

333
00:18:02,960 --> 00:18:05,600
But then now if my files change, I got to make sure I go change

334
00:18:05,600 --> 00:18:07,800
both the Python code and the Rust code.

335
00:18:07,800 --> 00:18:11,360
And you say the guy that wrote the Python code is in jail

336
00:18:11,360 --> 00:18:13,960
and we can't update it.

337
00:18:13,960 --> 00:18:14,480
Right?

338
00:18:14,480 --> 00:18:16,759
Now what do I do?

339
00:18:16,759 --> 00:18:18,480
I'm going to break.

340
00:18:18,480 --> 00:18:21,960
What if the app is on the same machine where my Python code is

341
00:18:21,960 --> 00:18:22,480
running?

342
00:18:22,480 --> 00:18:22,720
Right?

343
00:18:22,720 --> 00:18:25,120
It's running like a microservice on a separate box.

344
00:18:25,120 --> 00:18:27,280
How do I get access to that other?

345
00:18:27,359 --> 00:18:31,000
How do I get access to that file?

346
00:18:31,000 --> 00:18:36,319
And then what happens if you have two threads trying to write

347
00:18:36,319 --> 00:18:38,599
to the same file, the same?

348
00:18:38,599 --> 00:18:42,680
Well, you can rely on the operating system to do.

349
00:18:42,680 --> 00:18:44,680
But again, if I have a billion records, and I want to update

350
00:18:44,680 --> 00:18:47,160
one of them, I want to lock a billion records,

351
00:18:47,160 --> 00:18:48,519
just do that one up.

352
00:18:48,519 --> 00:18:50,399
I really want to have something more fine-grained that

353
00:18:50,399 --> 00:18:51,759
can have multiple threads.

354
00:18:51,759 --> 00:18:59,200
And then no matter what it was, I had to make sure that our data

355
00:18:59,200 --> 00:19:00,160
is safe.

356
00:19:00,160 --> 00:19:00,960
There's a crash.

357
00:19:00,960 --> 00:19:01,960
Right?

358
00:19:01,960 --> 00:19:06,680
I need a file.

359
00:19:06,680 --> 00:19:11,519
And then I crash before I fsync, some of that data actually

360
00:19:11,519 --> 00:19:13,160
might have gotten out the disk.

361
00:19:13,160 --> 00:19:19,879
So when my computer is going to be 20, which is not what I want,

362
00:19:19,960 --> 00:19:23,040
because now I've cropped the data.

363
00:19:23,040 --> 00:19:26,600
Or now my disk is really big, and I have a lot of people

364
00:19:26,600 --> 00:19:27,760
want to access it.

365
00:19:27,760 --> 00:19:31,000
How do I make sure that I can duplicate and replicate across

366
00:19:31,000 --> 00:19:34,400
multiple machines so they can all service reads at the same time?

367
00:19:34,400 --> 00:19:36,920
So my application can scale out.

368
00:19:36,920 --> 00:19:40,040
Files aren't going to do that for me.

369
00:19:40,040 --> 00:19:45,520
So this is just a quick smattering of the management system,

370
00:19:45,520 --> 00:19:48,640
and why, of course, like this, in my opinion.

371
00:19:48,640 --> 00:19:52,440
So as our management management system is going to be the software

372
00:19:52,440 --> 00:19:55,840
that can allow applications to store and analyze information

373
00:19:55,840 --> 00:20:00,240
in a database, and ideally not have to worry about all the things

374
00:20:00,240 --> 00:20:02,040
that we just talked about.

375
00:20:02,040 --> 00:20:03,360
That's not always been the case.

376
00:20:03,360 --> 00:20:06,480
There's me trade-offs to the big app.

377
00:20:09,600 --> 00:20:13,480
You know, the big thing is it exchange for performance.

378
00:20:13,480 --> 00:20:15,920
And a general purpose system typically

379
00:20:15,920 --> 00:20:18,840
allow you to adjust what the trade-offs actually are.

380
00:20:21,880 --> 00:20:28,960
And so the data system is going to define or specify

381
00:20:28,960 --> 00:20:31,880
inherent instantivitation how you can go create databases,

382
00:20:31,880 --> 00:20:34,840
how you can query them, how you can change it,

383
00:20:34,840 --> 00:20:36,600
you can administer the databases, making

384
00:20:36,600 --> 00:20:39,920
some changes in other things, and sort of correspondence

385
00:20:39,920 --> 00:20:42,880
of some kind of data model.

386
00:20:42,880 --> 00:20:44,960
Well, I'll say also, too, that this is, again,

387
00:20:44,960 --> 00:20:48,360
no matter whether you go off and actually build database systems

388
00:20:48,360 --> 00:20:51,120
in your data job, this is going to be important, again,

389
00:20:51,120 --> 00:20:52,960
where you go, because at some point you're

390
00:20:52,960 --> 00:20:55,360
going to build some application, you have to decide what

391
00:20:55,360 --> 00:20:57,240
database management system I want to use.

392
00:20:57,240 --> 00:20:58,960
And that's going to always be the first choice.

393
00:20:58,960 --> 00:21:01,640
But you don't want to do my, but here,

394
00:21:01,640 --> 00:21:06,720
it's going to be a lot of problems.

395
00:21:06,720 --> 00:21:09,000
I was like, do you think you're at a startup

396
00:21:09,000 --> 00:21:13,519
and you're trying to build an application, a brick application?

397
00:21:13,519 --> 00:21:14,799
Start doesn't have a lot of money.

398
00:21:14,799 --> 00:21:17,319
You're stressed for time to try to get things out the door.

399
00:21:17,319 --> 00:21:18,839
They get the first version out the door.

400
00:21:18,839 --> 00:21:20,139
Do you really want to be spending your time

401
00:21:20,139 --> 00:21:23,799
making sure that your data is safe, and there's a crash?

402
00:21:23,799 --> 00:21:25,720
Because at the end, that's not a just in-eaching feature

403
00:21:25,720 --> 00:21:27,359
of your business or your application.

404
00:21:27,359 --> 00:21:29,960
Nobody cares, and if you actually lose data,

405
00:21:29,960 --> 00:21:31,839
or if you crash, you don't lose data.

406
00:21:31,839 --> 00:21:35,519
That's considered, like, at this point,

407
00:21:35,519 --> 00:21:38,240
in modern computing systems.

408
00:21:38,240 --> 00:21:40,559
And so rather than spending all this time trying to

409
00:21:40,559 --> 00:21:42,679
get your own bespoke database system,

410
00:21:42,679 --> 00:21:44,919
you should use something else.

411
00:21:44,919 --> 00:21:47,079
Changes are its private-based press

412
00:21:47,079 --> 00:21:49,879
in that of 100.

413
00:21:49,879 --> 00:21:51,879
That's the first choice you should use.

414
00:21:51,879 --> 00:21:53,879
Maybe steeply.

415
00:21:53,879 --> 00:21:56,559
But post-culture pretty far.

416
00:21:59,839 --> 00:22:03,839
That I'm talking about here.

417
00:22:03,839 --> 00:22:06,240
So again, a data model is going to be,

418
00:22:06,240 --> 00:22:10,279
and how we're going to represent entities,

419
00:22:10,279 --> 00:22:13,160
or the collection of data in our database.

420
00:22:13,160 --> 00:22:21,240
So the data model is this high-level abstraction,

421
00:22:21,240 --> 00:22:24,279
specifies how we represent individual entities,

422
00:22:24,279 --> 00:22:26,960
and potentially the relationship.

423
00:22:26,960 --> 00:22:28,480
Again, we're trying to model some aspects

424
00:22:28,480 --> 00:22:29,160
of the real world.

425
00:22:29,160 --> 00:22:30,120
Students take classes.

426
00:22:30,120 --> 00:22:32,079
Students get grades.

427
00:22:32,079 --> 00:22:35,359
They're at home department.

428
00:22:35,359 --> 00:22:38,839
And then the schema is going to represent the definition,

429
00:22:38,839 --> 00:22:46,199
or the description, of what those entities in our database

430
00:22:46,199 --> 00:22:47,919
look like.

431
00:22:47,919 --> 00:22:48,919
Students have names.

432
00:22:48,919 --> 00:22:52,159
Students have birthdays, have email addresses, and so forth.

433
00:22:52,159 --> 00:22:54,879
You would specify all of those in our schema.

434
00:22:54,879 --> 00:22:58,159
And then we would instantiate instances of a database

435
00:22:58,159 --> 00:23:02,959
based on a data model according to the schema.

436
00:23:02,959 --> 00:23:05,199
So there's a bunch of different data models that are out there.

437
00:23:05,720 --> 00:23:07,880
This goes back to the very beginning of databases.

438
00:23:07,880 --> 00:23:10,400
People were sort of realized, oh, we need a database.

439
00:23:10,400 --> 00:23:13,519
Is in a database.

440
00:23:13,519 --> 00:23:17,559
So most database systems today, something that

441
00:23:17,559 --> 00:23:19,480
looks like the relational database,

442
00:23:19,480 --> 00:23:21,519
relational data model.

443
00:23:21,519 --> 00:23:23,360
There's things called object relational,

444
00:23:23,360 --> 00:23:24,200
what postgres is.

445
00:23:24,200 --> 00:23:26,039
It just means you can have user-defined types

446
00:23:26,039 --> 00:23:29,840
to extend what your relations are, extend.

447
00:23:29,840 --> 00:23:32,880
But in a high-level, most database systems

448
00:23:32,880 --> 00:23:34,200
are going to be relational.

449
00:23:34,200 --> 00:23:37,120
I think there's that DB engines, the ranking,

450
00:23:37,120 --> 00:23:38,519
the most popular database.

451
00:23:38,519 --> 00:23:40,720
I think the four out of the five most popular databases

452
00:23:40,720 --> 00:23:42,240
are going to be all relational.

453
00:23:42,240 --> 00:23:45,519
Mongo is the other.

454
00:23:45,519 --> 00:23:47,840
Then there's a bunch of these other data models

455
00:23:47,840 --> 00:23:52,480
that fall under this umbrella term of a few thing

456
00:23:52,480 --> 00:23:53,319
on new SQL systems.

457
00:23:53,319 --> 00:23:57,799
It's usually the document data model from JSON, one of these.

458
00:23:57,799 --> 00:24:01,000
Cassandra essentially has become one of these.

459
00:24:01,000 --> 00:24:03,920
But there's key value stores, F databases,

460
00:24:03,960 --> 00:24:06,720
and then what the company is, is it sort of the best right?

461
00:24:23,880 --> 00:24:26,840
There's array, matrix, and vector data models.

462
00:24:26,840 --> 00:24:29,759
These are primarily used for machine learning

463
00:24:29,759 --> 00:24:32,279
or scientific equations.

464
00:24:32,279 --> 00:24:34,519
I think of a satellite going around, take a bunch of photos.

465
00:24:34,519 --> 00:24:39,039
You can store that as an array, or tensors to trains

466
00:24:39,039 --> 00:24:40,039
with a model.

467
00:24:40,039 --> 00:24:42,200
You represent that as well.

468
00:24:42,200 --> 00:24:43,480
And so there's specialized database

469
00:24:43,480 --> 00:24:47,799
that can be made to represent a array.

470
00:24:47,799 --> 00:24:50,319
And then there's ones at the end for old people,

471
00:24:50,319 --> 00:24:54,200
hierarchical network and multi-value.

472
00:24:54,200 --> 00:24:58,160
These are considered obsolete at this point.

473
00:24:58,160 --> 00:25:02,040
So they still make a lot of money.

474
00:25:02,040 --> 00:25:05,519
The hierarchical model is used in IMF.

475
00:25:05,519 --> 00:25:08,200
IBM's first database system that they built

476
00:25:08,200 --> 00:25:15,080
of all the parts for the department in the 1960s.

477
00:25:15,080 --> 00:25:18,320
Let's move on.

478
00:25:18,320 --> 00:25:21,519
Every ATM basically uses, I mean, not the box itself,

479
00:25:21,519 --> 00:25:24,240
when you communicate to the bank.

480
00:25:24,240 --> 00:25:26,320
A lot of these systems are using IMF.

481
00:25:26,319 --> 00:25:35,119
So these things exist, but you feel brand new part of it.

482
00:25:35,119 --> 00:25:37,919
You're not going to use IMS, or I'm going to use IDMS.

483
00:25:37,919 --> 00:25:40,119
Like, you'd be insane to do that.

484
00:25:40,119 --> 00:25:44,519
But again, not at all, because it's not really relevant here.

485
00:25:44,519 --> 00:25:47,679
For this course, we will have some database

486
00:25:47,679 --> 00:25:50,200
as an evolution data model.

487
00:25:50,200 --> 00:25:51,759
And this is why we always pissed off about the Japanese

488
00:25:51,759 --> 00:25:53,720
because we go back to it.

489
00:25:53,720 --> 00:25:57,000
Justin, the judges have reviewed your response of matrix

490
00:25:57,000 --> 00:25:58,240
in the tech-beat category.

491
00:25:58,240 --> 00:26:00,799
And they have decided that it is correct.

492
00:26:00,799 --> 00:26:02,759
We've added $800 to your score.

493
00:26:02,759 --> 00:26:06,920
And all of your wagers were made on the adjusted score.

494
00:26:06,920 --> 00:26:10,319
There's no such thing as a relational matrix.

495
00:26:10,319 --> 00:26:11,079
I send them an email.

496
00:26:11,079 --> 00:26:11,920
They didn't respond.

497
00:26:11,920 --> 00:26:12,920
OK.

498
00:26:12,920 --> 00:26:14,920
OK.

499
00:26:14,920 --> 00:26:21,519
Anyway, I think it's a neuroscience, but like, no, whatever.

500
00:26:21,519 --> 00:26:25,319
So hopefully, if nothing else ends this course,

501
00:26:25,319 --> 00:26:26,240
you can answer that question.

502
00:26:29,319 --> 00:26:31,639
So let's go back to the 1960.

503
00:26:31,639 --> 00:26:33,879
And this will get to motivate why the relational model

504
00:26:33,879 --> 00:26:34,839
came about.

505
00:26:34,839 --> 00:26:38,200
And it'll set us up for once, and why it's still prevalent

506
00:26:38,200 --> 00:26:39,759
in the VU today.

507
00:26:39,759 --> 00:26:42,559
And pin it in for any new.

508
00:26:42,559 --> 00:26:43,559
Yeah.

509
00:26:45,559 --> 00:26:48,119
Back in the 1960s, early 1970s.

510
00:26:52,039 --> 00:26:52,960
There wasn't a relational model.

511
00:26:52,960 --> 00:26:54,000
It wasn't relational database.

512
00:26:54,000 --> 00:26:54,799
There wasn't Postgres.

513
00:26:54,799 --> 00:26:56,319
There wasn't my SQL SQLite Mongo.

514
00:26:56,319 --> 00:26:57,319
Right?

515
00:26:57,319 --> 00:27:02,319
The first 80s, the first 80s, people were building were not

516
00:27:02,319 --> 00:27:03,559
meant to be general purpose.

517
00:27:03,559 --> 00:27:06,279
But then they realized, oh, instead of building these bespoke

518
00:27:06,279 --> 00:27:09,200
database applications or database systems for just this one

519
00:27:09,200 --> 00:27:11,599
application, I can make a bit more general.

520
00:27:11,599 --> 00:27:14,279
And now I can support any possible application.

521
00:27:14,279 --> 00:27:17,920
So as far as the first 80s system ever existed,

522
00:27:18,640 --> 00:27:24,279
but built by General Electric, then sold to Honeywell,

523
00:27:24,279 --> 00:27:25,200
1960s.

524
00:27:25,200 --> 00:27:29,360
But IDS, they originally built to keep the Seattle.

525
00:27:29,360 --> 00:27:31,640
And then they realized, oh, instead of building this just

526
00:27:31,640 --> 00:27:34,039
for the company, we can make some tweaks and make it

527
00:27:34,039 --> 00:27:37,440
so the company could use it or a company could use it.

528
00:27:37,440 --> 00:27:39,600
And that sort of became the one of the first general purpose

529
00:27:39,600 --> 00:27:41,080
database systems that ever built.

530
00:27:41,579 --> 00:27:48,079
So I'd say, I'd say, oh, we could use this for other applications,

531
00:27:48,079 --> 00:27:56,199
and they generalized it.

532
00:27:56,199 --> 00:28:02,000
And then COSIL is a standards that defined the late 60s

533
00:28:02,000 --> 00:28:08,240
or 70s as a way to interact with data systems.

534
00:28:08,240 --> 00:28:10,240
People realize instead of having these

535
00:28:10,240 --> 00:28:14,240
one, the aim of the system is that we're being built at the time,

536
00:28:14,240 --> 00:28:16,240
we would have an enterprise way for how

537
00:28:16,240 --> 00:28:18,240
good applications are.

538
00:28:18,240 --> 00:28:22,240
Less than 5%.

539
00:28:22,240 --> 00:28:24,240
Or 5%.

540
00:28:24,240 --> 00:28:27,240
I'm assuming two here are going to have to code a seal.

541
00:28:27,240 --> 00:28:28,240
One.

542
00:28:28,240 --> 00:28:29,240
Okay.

543
00:28:29,240 --> 00:28:31,240
So why?

544
00:28:31,240 --> 00:28:33,240
You're writing the book.

545
00:28:33,240 --> 00:28:35,240
You're writing the book.

546
00:28:35,240 --> 00:28:36,240
Yeah.

547
00:28:36,240 --> 00:28:42,240
So people, and these early systems,

548
00:28:42,240 --> 00:28:45,240
this is the way we'd enact the system.

549
00:28:45,240 --> 00:28:49,240
And a lot of the things that were inherent in these first

550
00:28:49,240 --> 00:28:52,240
implementations are things you would not want to do today.

551
00:28:52,240 --> 00:28:54,240
And the one that big things was in these first systems,

552
00:28:54,240 --> 00:28:57,240
they had this tight coupling between the logical layer,

553
00:28:57,240 --> 00:29:00,240
like the schema, what entities that I have,

554
00:29:00,240 --> 00:29:04,240
what are their attributes, and then a physical layer in the system.

555
00:29:04,240 --> 00:29:07,240
Meaning how is actually being represented on disk or in memory,

556
00:29:07,240 --> 00:29:10,240
and how would I actually interact with them.

557
00:29:10,240 --> 00:29:11,240
Right?

558
00:29:11,240 --> 00:29:14,240
And so what happens is if you were a programmer at the time,

559
00:29:14,240 --> 00:29:16,240
and you wanted to use one of these database systems,

560
00:29:16,240 --> 00:29:20,240
you had to know exactly how the database is restoring your database.

561
00:29:20,240 --> 00:29:22,240
And so that, because that would expose a different API to you

562
00:29:22,240 --> 00:29:24,240
to interact with it.

563
00:29:24,240 --> 00:29:27,240
Well, IMS, you could store the data as either as a hash table

564
00:29:27,240 --> 00:29:29,240
or a B plus tree or tree structure.

565
00:29:29,240 --> 00:29:32,240
And then you got different APIs because,

566
00:29:32,240 --> 00:29:34,240
depending on which data structure we're using,

567
00:29:34,240 --> 00:29:37,240
because hash tables you can't do scans.

568
00:29:37,240 --> 00:29:41,240
Right? But in tree structures.

569
00:29:41,240 --> 00:29:43,240
So now the problem with this is that,

570
00:29:43,240 --> 00:29:45,240
any single time I made it,

571
00:29:45,240 --> 00:29:48,240
I want to make a change to the schema at both the logical layer

572
00:29:48,240 --> 00:29:51,240
and the physical layer, I had to go rewrite my application,

573
00:29:51,240 --> 00:29:55,240
almost scratch, because all how the database was represented

574
00:29:55,240 --> 00:29:57,240
on disk changed.

575
00:29:57,240 --> 00:29:59,240
So other issues with the data model,

576
00:29:59,240 --> 00:30:01,240
we don't need to really go.

577
00:30:01,240 --> 00:30:04,240
Basically, like in the higher click model,

578
00:30:04,240 --> 00:30:08,240
you had to sort of have these four loops traverse one collection

579
00:30:08,240 --> 00:30:10,240
for some other collection.

580
00:30:10,240 --> 00:30:16,240
It was really inefficient way to interact with the data system.

581
00:30:16,240 --> 00:30:18,240
What happened was in the late 1960s,

582
00:30:18,240 --> 00:30:20,240
there was this guy Ted Codd,

583
00:30:20,240 --> 00:30:26,240
who was pen, who was a user.

584
00:30:26,240 --> 00:30:30,240
And he was walking up in New York with the big ladders,

585
00:30:30,240 --> 00:30:35,240
and he saw all these IBM developers primarily working on,

586
00:30:35,240 --> 00:30:39,240
saw them rewriting the database applications over and over again,

587
00:30:39,240 --> 00:30:41,240
every single time there was a schema change,

588
00:30:41,240 --> 00:30:44,240
every single time there was a physical layout change.

589
00:30:44,240 --> 00:30:46,240
Right?

590
00:30:46,240 --> 00:30:48,240
And the humans were rapidly.

591
00:30:48,240 --> 00:30:50,240
So people were like,

592
00:30:50,240 --> 00:30:52,240
okay, we're just more humans at the problem,

593
00:30:52,240 --> 00:30:56,240
and that's better than buying a...

594
00:30:56,240 --> 00:30:59,240
So my ex-album, he pointed out,

595
00:30:59,240 --> 00:31:02,240
embedded in my app.

596
00:31:02,240 --> 00:31:04,240
It's all a game problem.

597
00:31:04,240 --> 00:31:06,240
Well, think of it now.

598
00:31:06,240 --> 00:31:09,240
That was like the idea.

599
00:31:09,240 --> 00:31:11,240
I had to go rewrite.

600
00:31:11,240 --> 00:31:13,240
I meant the all.

601
00:31:13,240 --> 00:31:15,240
I had to try to be an example,

602
00:31:15,240 --> 00:31:18,240
but that was the kind of shit they were doing back in the day.

603
00:31:18,240 --> 00:31:20,240
So Codd's all, as Ted says,

604
00:31:20,240 --> 00:31:22,240
he's got to be a better way.

605
00:31:22,240 --> 00:31:25,240
And he's a model,

606
00:31:25,240 --> 00:31:30,240
as an abstract and how to represent a database,

607
00:31:30,240 --> 00:31:35,240
and the relationships between entities in a database,

608
00:31:35,240 --> 00:31:39,240
and avoid having the tight coupling between physical layer

609
00:31:39,240 --> 00:31:41,240
and the logical layer.

610
00:31:41,240 --> 00:31:44,240
Meaning, if we define it in mathematical terms,

611
00:31:44,240 --> 00:31:45,240
I had these relations,

612
00:31:45,240 --> 00:31:46,240
here's the manipulations or changes,

613
00:31:46,240 --> 00:31:47,240
or lookups I can do on them,

614
00:31:47,240 --> 00:31:48,240
and I don't know,

615
00:31:48,240 --> 00:31:51,240
how the database system underneath the covers is actually going to store it.

616
00:31:51,240 --> 00:31:53,240
Because the database system knows what the data is,

617
00:31:53,240 --> 00:31:54,240
knows what the queries are.

618
00:31:54,240 --> 00:31:57,240
It can be a better position to decide how to...

619
00:31:57,240 --> 00:32:00,240
When could.

620
00:32:00,240 --> 00:32:04,240
So I just proposed the relational data model in 19...

621
00:32:04,240 --> 00:32:05,240
There's this...

622
00:32:05,240 --> 00:32:07,240
It's tech report paper.

623
00:32:07,240 --> 00:32:09,240
That's not...

624
00:32:09,240 --> 00:32:12,240
I think...

625
00:32:12,240 --> 00:32:15,240
I think...

626
00:32:15,240 --> 00:32:17,240
That...

627
00:32:17,240 --> 00:32:19,240
Again, mathematician.

628
00:32:19,240 --> 00:32:21,240
He didn't define programming language,

629
00:32:21,240 --> 00:32:24,240
so he's not saying how you actually implement this.

630
00:32:24,240 --> 00:32:27,240
He's just defining what relations are,

631
00:32:27,240 --> 00:32:30,240
and the algebra to manipulate them.

632
00:32:30,240 --> 00:32:32,240
Right?

633
00:32:32,240 --> 00:32:36,240
So there's three key tenets of...

634
00:32:36,240 --> 00:32:40,240
These are the three ones that we're going to care about the most.

635
00:32:40,240 --> 00:32:44,240
So the first is that we'll store all our collection of data

636
00:32:44,240 --> 00:32:46,240
in simple data structures.

637
00:32:46,240 --> 00:32:48,240
For the nation.

638
00:32:48,240 --> 00:32:50,240
I'm just going to say that's the mathematical term.

639
00:32:50,240 --> 00:32:52,240
Same thing as the table.

640
00:32:52,240 --> 00:32:54,240
If we're coming from the Mongo World, they call it a collection.

641
00:32:54,240 --> 00:32:56,240
It's the same idea.

642
00:32:56,240 --> 00:32:58,240
All these are simple data structures.

643
00:32:58,240 --> 00:33:02,240
I need to worry about all the member types that all these other data...

644
00:33:02,240 --> 00:33:08,240
Second is that you're going to keep the physical representation of the database

645
00:33:08,240 --> 00:33:12,240
itself, like the actual bits and bytes on disk or in memory.

646
00:33:12,240 --> 00:33:14,240
You're going to leave that...

647
00:33:14,240 --> 00:33:16,240
You're not going to...

648
00:33:16,240 --> 00:33:18,240
In your relational data model.

649
00:33:18,240 --> 00:33:21,240
Leave that for the data system to figure out what's the best way to do it.

650
00:33:21,240 --> 00:33:24,240
Because the idea now is that if I store the data in one way,

651
00:33:24,240 --> 00:33:27,240
but then as I see, we're kind of putting data and putting in...

652
00:33:27,240 --> 00:33:29,240
What kind of question is that?

653
00:33:29,240 --> 00:33:32,240
Data system is saying, oh, I really want to store this on two machines

654
00:33:32,240 --> 00:33:35,240
or two cells, or break it up in different ways, or sort it in one way.

655
00:33:35,240 --> 00:33:38,240
And now, application doesn't change,

656
00:33:38,240 --> 00:33:41,240
because you're just writing things queries at a high level,

657
00:33:41,240 --> 00:33:45,240
and you don't really care how certain it needs to cover.

658
00:33:45,240 --> 00:33:46,240
Right?

659
00:33:46,240 --> 00:33:47,240
And that's the line out here.

660
00:33:47,240 --> 00:33:49,240
You're going to find at a high level...

661
00:33:49,240 --> 00:33:51,240
You're going to access data through a high level language,

662
00:33:51,240 --> 00:33:55,240
and then let the data system figure out what's the best way to...

663
00:33:55,240 --> 00:33:57,240
To retrieve the data that you're looking for,

664
00:33:57,240 --> 00:34:00,240
or to do whatever operation you wanted to do.

665
00:34:00,240 --> 00:34:03,240
So, cod won the Touring Word for this in 1981.

666
00:34:03,240 --> 00:34:06,240
The site of Enicodosil, he won it in like 72,

667
00:34:06,240 --> 00:34:09,239
but it took 10 years for people to realize he was wrong.

668
00:34:09,239 --> 00:34:12,239
And then, he's going to be Touring Words.

669
00:34:12,239 --> 00:34:15,239
Odd is deaf, the code...

670
00:34:15,239 --> 00:34:21,239
And then the other guy that won the Touring Word in Data...

671
00:34:21,239 --> 00:34:24,239
Gray, he got lost in 2006,

672
00:34:24,239 --> 00:34:26,239
and then the last...

673
00:34:26,239 --> 00:34:28,239
Touring Word in Data, this is Mike Sturmberger,

674
00:34:28,239 --> 00:34:32,239
and he's post-credit, and was IPC advisor.

675
00:34:32,239 --> 00:34:34,239
Well, covered Sturmberger...

676
00:34:34,239 --> 00:34:37,239
So, there's three key aspects of the digital data model.

677
00:34:37,239 --> 00:34:41,239
There's the structure, how we define what the data...

678
00:34:41,239 --> 00:34:44,239
Data is actually is, what's in our relations,

679
00:34:44,239 --> 00:34:46,239
what are their attributes, and the types.

680
00:34:46,239 --> 00:34:52,239
There's the integrity methods, and specify what data is allowed to be stored in the database.

681
00:34:52,239 --> 00:34:55,239
To make sure that every email address...

682
00:34:55,239 --> 00:34:57,239
I don't have many records without an email address,

683
00:34:57,239 --> 00:35:04,239
or in my example, I can't have an album that has an artist that doesn't exist in the artist.

684
00:35:05,239 --> 00:35:11,239
And then, the manipulation mechanisms allow us to find how we're going to access the data and update it.

685
00:35:11,239 --> 00:35:16,239
And the last one was what we talked about when we started talking about...

686
00:35:18,239 --> 00:35:20,239
Math...

687
00:35:20,239 --> 00:35:27,239
An on-order set of data that's going to be the relationship of attributes that represent some entity in the real world.

688
00:35:27,239 --> 00:35:31,239
So, the relation model doesn't mean the relation between tables.

689
00:35:31,239 --> 00:35:35,239
It's really the relationship between attributes within...

690
00:35:35,239 --> 00:35:42,239
So, again, a student has an email address, they have a phone number, a birthday, a home address,

691
00:35:42,239 --> 00:35:43,239
right?

692
00:35:43,239 --> 00:35:48,239
It's that relation of those attributes combined together that represent some...

693
00:35:50,239 --> 00:35:53,239
So, again, so we'll have a set of attributes.

694
00:35:53,239 --> 00:35:58,239
We'll use the word Chippewl, but it also means record or row.

695
00:35:59,239 --> 00:36:02,239
And then, at a high level, they all mean the same thing.

696
00:36:02,239 --> 00:36:07,239
And so, for every single batch in the original...

697
00:36:07,239 --> 00:36:12,239
original definition of the relation of data model, all the barriers have to be atomic or scalar.

698
00:36:12,239 --> 00:36:15,239
But, again, as things have evolved over time,

699
00:36:19,239 --> 00:36:22,239
again, Cod didn't foresee these things back in the 70s.

700
00:36:22,239 --> 00:36:25,239
This is the support of this today.

701
00:36:25,239 --> 00:36:28,239
And of course, I'll go for all of them to be there.

702
00:36:28,239 --> 00:36:35,239
So, in some cases, some attributes could have a value that is null, meaning it's unknown at the time.

703
00:36:35,239 --> 00:36:40,239
And, again, you can specify in the schema what you want an attribute to support.

704
00:36:43,239 --> 00:36:51,239
So, in every relation, there's going to be a primary key that's going to be used to uniquely identify a tuple.

705
00:36:51,239 --> 00:36:56,239
Again, think of like your student ID or Android ID here at the university.

706
00:36:56,239 --> 00:37:00,239
And that allows us to know exactly, you know,

707
00:37:00,239 --> 00:37:03,239
a little record that we want.

708
00:37:03,239 --> 00:37:05,239
Right, what we're doing to...

709
00:37:05,239 --> 00:37:08,239
Alright, example here...

710
00:37:08,239 --> 00:37:17,239
Okay, a particular entry in our list.

711
00:37:17,239 --> 00:37:28,239
But, again, your Android ID is unique.

712
00:37:28,239 --> 00:37:32,239
And that would be a primary key for the university database.

713
00:37:33,239 --> 00:37:42,239
What you can do in cases where you don't have a primary key,

714
00:37:42,239 --> 00:37:47,239
the identity column, the primary key.

715
00:37:47,239 --> 00:37:53,239
You see this a lot in Orems, like Anger SQL, SQL, IZ, or using Node.js.

716
00:37:53,239 --> 00:37:59,239
A lot of times, these frameworks will make these primary keys for you.

717
00:37:59,239 --> 00:38:00,239
Right.

718
00:38:00,239 --> 00:38:07,239
And so, the primary key is a constraint that the database management system will enforce for you on your relational data.

719
00:38:07,239 --> 00:38:14,239
Make sure that, within any given relation, there does not exist a multiple records with the same primary key.

720
00:38:17,239 --> 00:38:20,239
I talked about how to automatically identify columns throughout the semester.

721
00:38:20,239 --> 00:38:26,239
But, there's basically ways database management systems will congenrate these columns for you.

722
00:38:27,239 --> 00:38:29,239
We're calling foreign keys.

723
00:38:29,239 --> 00:38:35,239
And this is to enforce a reference for integrity to make sure that if I have a...

724
00:38:35,239 --> 00:38:40,239
In one relation, the first to another tuple in another relation,

725
00:38:40,239 --> 00:38:46,239
that the database management system, you don't have an orphan or a broken...

726
00:38:46,239 --> 00:38:52,239
Because you delete the record from one row, still a dangly point in another row.

727
00:38:52,239 --> 00:38:55,239
Going back here to our database...

728
00:39:07,239 --> 00:39:09,239
In this tape...

729
00:39:09,239 --> 00:39:12,239
But, let me say we have this next tape here.

730
00:39:12,239 --> 00:39:15,239
We have a bunch of artists appear on it.

731
00:39:15,239 --> 00:39:17,239
How do we actually...

732
00:39:18,239 --> 00:39:19,239
On this mixed tape.

733
00:39:19,239 --> 00:39:22,239
And I say, before a relational data, I'm going to explore the arrays,

734
00:39:22,239 --> 00:39:24,239
at least the original version of it.

735
00:39:29,239 --> 00:39:34,239
So, in the data model, if you do this, you would have a cross-reference table,

736
00:39:34,239 --> 00:39:40,239
where you can keep track of the unique pairs of the relationships between the artists and the albums.

737
00:39:48,239 --> 00:39:49,239
Right.

738
00:39:49,239 --> 00:39:50,239
And now, again...

739
00:40:18,239 --> 00:40:20,239
Again, it shows it for you.

740
00:40:20,239 --> 00:40:23,239
So, you just write the same delete command, and...

741
00:40:23,239 --> 00:40:25,239
The key is not all I'm going to do.

742
00:40:25,239 --> 00:40:26,239
For you.

743
00:40:26,239 --> 00:40:29,239
My script with Python code...

744
00:40:29,239 --> 00:40:33,239
I'd have to do all that myself in my application code to follow those pointers,

745
00:40:33,239 --> 00:40:36,239
to go find the things I'm looking for, to make sure that I don't have these...

746
00:40:36,239 --> 00:40:38,239
These dependencies.

747
00:40:40,239 --> 00:40:42,239
To be the way you do this is...

748
00:40:43,239 --> 00:40:45,239
To be the way you do this is...

749
00:41:01,239 --> 00:41:02,239
So much...

750
00:41:05,239 --> 00:41:07,239
Pro-Aiders, if you're going to violate...

751
00:41:08,239 --> 00:41:09,239
All right.

752
00:41:09,239 --> 00:41:13,239
The last thing you can have, or call it, make strings...

753
00:41:13,239 --> 00:41:18,239
are protection mechanisms that you can have the data system enforce to make sure that...

754
00:41:18,239 --> 00:41:20,239
data follows the proper...

755
00:41:20,239 --> 00:41:25,239
has values that conform to some kind of domain, or that you...

756
00:41:25,239 --> 00:41:28,239
You don't have values or tuples that...

757
00:41:28,239 --> 00:41:31,239
make a screen and another thing.

758
00:41:31,239 --> 00:41:36,239
The idea is that you can specify for a given attribute,

759
00:41:36,239 --> 00:41:38,239
or within the global...

760
00:41:38,239 --> 00:41:41,239
within a given attribute, or given table, or across multiple tables...

761
00:41:41,239 --> 00:41:43,239
I can have...

762
00:41:43,239 --> 00:41:47,239
Every single time I make a modification, or any of these constraints being violated...

763
00:41:47,239 --> 00:41:51,239
If yes, then I throw an error, and I don't let you make any changes.

764
00:41:51,239 --> 00:41:54,239
So again, back to the example she brought up before,

765
00:41:54,239 --> 00:41:59,239
what if someone writes a string character in your column for my C.A.E.P.A.

766
00:41:59,239 --> 00:42:01,239
The data system will actually prevent you from doing that...

767
00:42:01,239 --> 00:42:03,239
if you had these in Kenerger's instance, because you would know...

768
00:42:03,239 --> 00:42:05,239
Okay, you're trying to sort something...

769
00:42:05,239 --> 00:42:07,239
you're trying to sort a character into an integer column...

770
00:42:07,239 --> 00:42:10,239
I can't let you do that in an error.

771
00:42:10,239 --> 00:42:14,239
You can do other things like make sure that the year has been...

772
00:42:14,239 --> 00:42:17,239
1900, a greater than zero.

773
00:42:17,239 --> 00:42:20,239
All right, and the data system will enforce that for you.

774
00:42:20,239 --> 00:42:23,239
The most common constraints that are out there...

775
00:42:23,239 --> 00:42:27,239
things could happen for you...

776
00:42:27,239 --> 00:42:30,239
or...

777
00:42:44,239 --> 00:42:46,239
All right, and doesn't let you make the change.

778
00:42:52,239 --> 00:42:56,239
But again, we thought in our schema, and the racial data system will make sure that...

779
00:42:56,239 --> 00:42:58,239
we're going to enforce.

780
00:42:58,239 --> 00:43:00,239
So now, matter if...

781
00:43:00,239 --> 00:43:03,239
Python code, he's general...

782
00:43:03,239 --> 00:43:05,239
you have to start making changes...

783
00:43:05,239 --> 00:43:07,239
you know, what's going on in the database...

784
00:43:07,239 --> 00:43:09,239
data system will prevent you from shooting yourself from the foot...

785
00:43:09,239 --> 00:43:11,239
and making changes...

786
00:43:11,239 --> 00:43:14,239
these constraints...

787
00:43:14,239 --> 00:43:17,239
for...

788
00:43:19,239 --> 00:43:22,239
All right, so now we've got to talk about how we actually want to enter into the database.

789
00:43:22,239 --> 00:43:27,239
Right, assuming we set up the scheme, we define what our database and relations are going to look like...

790
00:43:27,239 --> 00:43:31,239
we want to talk about how we actually want to...

791
00:43:31,239 --> 00:43:33,239
to run queries on it.

792
00:43:33,239 --> 00:43:36,239
So, at a high level, there's two basic approaches to do this.

793
00:43:36,239 --> 00:43:39,239
There's the procedural and non-procedural languages.

794
00:43:39,239 --> 00:43:43,239
So, the exact...

795
00:43:43,239 --> 00:43:46,239
what the data system does...

796
00:43:46,239 --> 00:43:49,239
whatever it is that you want to...

797
00:43:49,239 --> 00:43:52,239
the...

798
00:43:52,239 --> 00:43:55,239
a non-procedural one is where you would say,

799
00:43:55,239 --> 00:43:57,239
here's the answer I want you to compute.

800
00:43:57,239 --> 00:44:01,239
I don't know how to compute it, you figure it out.

801
00:44:01,239 --> 00:44:04,239
So, relational...

802
00:44:04,239 --> 00:44:09,239
and the SQL or relational calculus is going to be non-procedural, declarative.

803
00:44:09,239 --> 00:44:11,239
We're not going to cover relational calculus because you don't...

804
00:44:11,239 --> 00:44:13,239
you know what?

805
00:44:13,239 --> 00:44:16,239
I've never used relational calculus in view.

806
00:44:16,239 --> 00:44:18,239
Never.

807
00:44:18,239 --> 00:44:20,239
All in the theory papers, which we're not doing.

808
00:44:20,239 --> 00:44:22,239
We don't care about those.

809
00:44:22,239 --> 00:44:23,239
But it is...

810
00:44:23,239 --> 00:44:25,239
it is how it's going to work.

811
00:44:25,239 --> 00:44:29,239
If you're baby-learning a query optimized relational calculus, but in the real world...

812
00:44:29,239 --> 00:44:33,239
but relational algebra is not something you don't think is a program.

813
00:44:33,239 --> 00:44:39,239
But this is what we want to do to run queries and build execution engine,

814
00:44:39,239 --> 00:44:41,239
all the things we do later on.

815
00:44:41,239 --> 00:44:42,239
We want to...

816
00:44:42,239 --> 00:44:44,239
relational algebra is at a high level and then...

817
00:44:44,239 --> 00:44:45,239
over the...

818
00:44:45,239 --> 00:44:51,239
the correct course of SQL is the modern variance of it.

819
00:44:51,239 --> 00:44:54,239
All right, so the...

820
00:44:54,239 --> 00:45:03,239
relational algebra in 1969, you also define the algebra that you would use to interact with the database system.

821
00:45:03,239 --> 00:45:08,239
And it's me way to extract data from it and...

822
00:45:08,239 --> 00:45:11,239
and compute answers that you want.

823
00:45:11,239 --> 00:45:15,239
So in the original paper, he defined seven fundamental operators.

824
00:45:15,239 --> 00:45:16,239
It's been...

825
00:45:16,239 --> 00:45:17,239
additional...

826
00:45:17,239 --> 00:45:20,239
additional operations you need in modern applications.

827
00:45:20,239 --> 00:45:22,239
Like this doesn't have sorting.

828
00:45:22,239 --> 00:45:25,239
And obviously in the applications you need sorting, so that came later.

829
00:45:25,239 --> 00:45:28,239
But all this is going to be based on...

830
00:45:28,239 --> 00:45:30,239
on...

831
00:45:30,239 --> 00:45:34,239
ordered lists of records or duplicates...

832
00:45:34,239 --> 00:45:39,239
on order lists of tuples, but without any duplicates.

833
00:45:39,239 --> 00:45:43,239
Now, what's me slightly confusing is that in SQL, by default,

834
00:45:43,239 --> 00:45:49,239
it's going to try to use bag algebra, which is basically an unordered set that does have duplicates.

835
00:45:49,239 --> 00:45:51,239
Or sometimes called a multi-set.

836
00:45:51,239 --> 00:45:54,239
And the reason why SQL wants to use bags instead of sets,

837
00:45:54,239 --> 00:45:55,239
because it's actually...

838
00:45:55,239 --> 00:45:58,239
you need more efficient if you don't care about removing duplicates later on.

839
00:45:58,239 --> 00:45:59,239
But in the...

840
00:45:59,239 --> 00:46:03,239
algebra that we care about here, we assume we're going to do duplicates.

841
00:46:03,239 --> 00:46:07,239
So the basic idea of all these operators is that you're going to take in some...

842
00:46:07,239 --> 00:46:11,239
some relation as your input, or one or more relations as your inputs.

843
00:46:11,239 --> 00:46:16,239
And then you're going to do some operation on them, and then produce a new relation as the output.

844
00:46:16,239 --> 00:46:18,239
And you can start changing all these...

845
00:46:18,239 --> 00:46:22,239
these operators together to do more complex things.

846
00:46:22,239 --> 00:46:25,239
So we'll go through each of these one by one.

847
00:46:25,239 --> 00:46:26,239
Animations aren't working.

848
00:46:26,239 --> 00:46:28,239
I don't know why, but that's okay.

849
00:46:28,239 --> 00:46:31,239
Just showing everything all at once.

850
00:46:31,239 --> 00:46:33,239
But...

851
00:46:38,239 --> 00:46:42,239
The first thing you say is select, but I think the original paper calls that restrict.

852
00:46:42,239 --> 00:46:44,239
The I-T-T thing, right?

853
00:46:44,239 --> 00:46:47,239
But you're trying to restrict the two-part etiquette.

854
00:46:47,239 --> 00:46:52,239
And the idea in your select operator, you're going to find first order of predicate logic

855
00:46:52,239 --> 00:46:58,239
to specify what tuples will match with what other select operator is trying to do.

856
00:46:58,239 --> 00:47:00,239
It's a Boolean logic.

857
00:47:00,239 --> 00:47:03,239
Like, it's something equals something, or something less than something.

858
00:47:03,239 --> 00:47:06,239
But you can have conjunctions and or disjunctions or...

859
00:47:06,239 --> 00:47:08,239
Right.

860
00:47:36,239 --> 00:47:43,239
Predicate the add down below...

861
00:47:43,239 --> 00:47:50,239
on whatever your target table is.

862
00:47:50,239 --> 00:47:53,239
Next operator is projection.

863
00:47:53,239 --> 00:47:55,239
I'm not going to greet symbols for this one.

864
00:47:55,239 --> 00:47:59,239
It's easy to remember because it's a low-py symbol for people to see.

865
00:47:59,239 --> 00:48:06,239
And the idea here is your input and specify what you want to be in the output of the operator.

866
00:48:06,239 --> 00:48:11,239
So you can rearrange the ordering of the attributes.

867
00:48:11,239 --> 00:48:14,239
You can remove the attributes you don't...

868
00:48:14,239 --> 00:48:20,239
And then you can manipulate the values of the attributes to generate new drives.

869
00:48:20,239 --> 00:48:26,239
And then you can manipulate the values of the attributes to generate new drives.

870
00:48:26,239 --> 00:48:33,239
But it's only operating on whatever...

871
00:48:33,239 --> 00:48:38,239
That's given to it.

872
00:48:38,239 --> 00:49:07,239
So now we turn the operators of that...

873
00:49:07,239 --> 00:49:14,239
that take multiple relations as their input.

874
00:49:14,239 --> 00:49:17,239
So in the union operator, it's a binary operator.

875
00:49:17,239 --> 00:49:20,239
You can get an operation from set theory.

876
00:49:20,239 --> 00:49:27,239
The general relation that contains all the symbols that either appear on one relations or both of relations.

877
00:49:27,239 --> 00:49:30,239
So here, I take the...

878
00:49:38,239 --> 00:49:44,239
The union clause.

879
00:49:44,239 --> 00:49:47,239
So union will get...

880
00:49:47,239 --> 00:49:50,239
And SQL will get rid of the duplicates.

881
00:49:50,239 --> 00:49:56,239
If you want to keep the duplicates to make it run faster, you would add union all, A-L-L.

882
00:49:56,239 --> 00:49:59,239
We won't go over about that.

883
00:49:59,239 --> 00:50:01,239
Just like union, we also have intersection.

884
00:50:01,239 --> 00:50:02,239
Same thing.

885
00:50:02,239 --> 00:50:04,239
We take the...

886
00:50:04,239 --> 00:50:05,239
Take two...

887
00:50:05,239 --> 00:50:06,239
Two...

888
00:50:06,239 --> 00:50:07,239
And...

889
00:50:07,239 --> 00:50:08,239
We...

890
00:50:08,239 --> 00:50:12,239
We have to appear...

891
00:50:12,239 --> 00:50:16,239
And it's...

892
00:50:16,239 --> 00:50:23,239
It's to take all two relations and spit out all the ones that appear in the first one, but not the second one.

893
00:50:23,239 --> 00:50:26,239
And SQL, you would use this with the...

894
00:50:26,239 --> 00:50:29,239
This is basic set theory.

895
00:50:29,239 --> 00:50:33,239
This is not anything that should be surprising anyone.

896
00:50:33,239 --> 00:50:38,239
So any questions before we move on to the two important interesting things?

897
00:50:38,239 --> 00:50:39,239
Yeah.

898
00:50:39,239 --> 00:50:40,239
Well, this is...

899
00:50:40,239 --> 00:50:46,239
In this case, the more relations have to be exactly the same and you have like the...

900
00:50:46,239 --> 00:50:47,239
Yeah, perfect.

901
00:50:47,239 --> 00:50:48,239
So, yes.

902
00:50:48,239 --> 00:50:49,239
Question is...

903
00:50:49,239 --> 00:50:50,239
Thank you for bringing this up.

904
00:50:50,239 --> 00:50:55,239
Question is, in all these examples so far, do the two input relations have to have the exact same schema?

905
00:50:55,239 --> 00:50:56,239
Yes.

906
00:50:56,239 --> 00:50:57,239
So you...

907
00:50:57,239 --> 00:50:58,239
Hold on to your user.

908
00:50:58,239 --> 00:51:03,239
Yes.

909
00:51:03,239 --> 00:51:10,239
Right.

910
00:51:10,239 --> 00:51:12,239
So, the next...

911
00:51:12,239 --> 00:51:13,239
So, we're...

912
00:51:13,239 --> 00:51:20,239
If we start looking at how to combine together the relations, and actually potentially look at what's actually in the values of them.

913
00:51:20,239 --> 00:51:23,239
So the first one we're going to use is the...

914
00:51:23,239 --> 00:51:26,239
Product operator...

915
00:51:26,239 --> 00:51:29,239
Or in SQL, it's called a cross-line.

916
00:51:29,239 --> 00:51:33,239
The idea here is that you're basically going to concatenate the...

917
00:51:33,239 --> 00:51:34,239
The actual...

918
00:51:34,239 --> 00:51:37,239
The first relation and the...

919
00:51:37,239 --> 00:51:39,239
The two-pole...

920
00:51:39,239 --> 00:51:40,239
Both.

921
00:51:40,239 --> 00:51:44,239
And it's for all unique combinations of two-poles from one relation and the other.

922
00:51:44,239 --> 00:51:46,239
So you certainly think this is like two four-lips, right?

923
00:51:46,239 --> 00:51:49,239
Where there's four-lips spinning over R for every single...

924
00:51:49,239 --> 00:51:52,239
In two-poles in R, you're going to concatenate it with every single two-poles in S.

925
00:51:52,239 --> 00:51:55,239
And you're going to...

926
00:51:55,239 --> 00:52:01,239
Of all...

927
00:52:01,239 --> 00:52:12,239
Everything I guess, why this would actually...

928
00:52:12,239 --> 00:52:17,239
Why would I actually want this?

929
00:52:17,239 --> 00:52:23,039
I can think of testing.

930
00:52:23,039 --> 00:52:27,159
If you're trying to find all unique combinations of some two inputs to test some piece of software

931
00:52:27,159 --> 00:52:34,639
or something, then you could use this.

932
00:52:34,639 --> 00:52:38,159
But beyond that, as far as I know, there's not widely used at all.

933
00:52:38,159 --> 00:52:42,000
And oftentimes this shows up because you may take, like, you forgot a wear clause and you

934
00:52:42,000 --> 00:52:43,000
get this by accident.

935
00:52:43,000 --> 00:52:50,000
What do you mean, sorry?

936
00:52:50,000 --> 00:52:53,000
Oh, yeah.

937
00:52:53,000 --> 00:52:58,840
Yeah, so the same is like an in-un table where they're trying to, like, but that's like for

938
00:52:58,840 --> 00:52:59,840
inputs, right?

939
00:52:59,840 --> 00:53:05,840
They're trying to get all possible in-un as input to something.

940
00:53:05,840 --> 00:53:06,840
All right.

941
00:53:06,840 --> 00:53:14,720
The super useful is to do a joints.

942
00:53:14,720 --> 00:53:22,920
And the idea here is that when you're in a generic, and the combinations of the two input

943
00:53:22,920 --> 00:53:26,760
relations will assume two for net, you know, it's a binary operator.

944
00:53:26,760 --> 00:53:30,960
There are multi-way joints where you can take multiple inputs, multiple relations.

945
00:53:30,960 --> 00:53:32,680
We can ignore that for now.

946
00:53:32,679 --> 00:53:38,119
You want to generate a new integer output that's going to contain all the tuples that match

947
00:53:38,119 --> 00:53:43,799
on the overlapping attributes in the first iteration and the overlapping attributes with the

948
00:53:43,799 --> 00:53:44,799
second relation.

949
00:53:44,799 --> 00:53:45,799
All right.

950
00:53:45,799 --> 00:53:49,799
So different than the intersection.

951
00:53:49,799 --> 00:53:56,480
The intersection has to have the exact- in this case here, I don't have to- I want to

952
00:53:56,480 --> 00:53:59,000
find the attributes where I do overlap.

953
00:53:59,000 --> 00:54:25,000
I want to check that.

954
00:54:25,000 --> 00:54:30,079
And so in my- in the original relation algebra here, you would actually- you don't show the

955
00:54:30,079 --> 00:54:40,679
duplicate columns, like the a.i.d from r and a.i.d from s.

956
00:54:40,679 --> 00:54:44,320
So there's a bunch of different ways to write this in SQL.

957
00:54:44,320 --> 00:55:04,000
There's a natural joint, or a keyword in SQL.

958
00:55:04,000 --> 00:55:05,000
All right.

959
00:55:05,000 --> 00:55:06,000
If you want to-

960
00:55:34,500 --> 00:55:54,000
sitting somewhere, you just add a little more Python, then when it sessions something, when

961
00:55:54,000 --> 00:56:03,039
it sessions you add more Python then.

962
00:56:03,039 --> 00:56:09,039
would match with, for example, in this case, there's only a change value for S.

963
00:56:09,039 --> 00:56:15,039
So then with an absolute C like A, ID, D, A, and BOW, and then it's part...

964
00:56:45,039 --> 00:57:05,039
there's a C external.

965
00:57:06,019 --> 00:57:07,300
32

966
00:57:10,219 --> 00:57:12,039
Wtf you are ascending

967
00:57:35,039 --> 00:57:42,039
Both of them. Yes. Yes.

968
00:58:05,039 --> 00:58:28,300
Does Prince

969
00:58:58,300 --> 00:59:08,420
So these are the ones that I showed you with the fundamental ones that Ted defined.

970
00:59:08,420 --> 00:59:14,100
In the late 1970s, they got extended with a bunch of additional things and building real

971
00:59:14,100 --> 00:59:19,220
applications, you need more than you do here in the original relational model, relational

972
00:59:19,220 --> 00:59:20,220
algebra.

973
00:59:20,219 --> 00:59:31,699
The renaming is like a projection of signing attributes to important duplicate emanate

974
00:59:31,699 --> 00:59:38,699
elimination, distinct clauses, things like that.

975
00:59:38,699 --> 00:59:45,699
I don't know if I can find the count access.

976
00:59:45,699 --> 00:59:56,699
I used a teacher, we don't teach anymore because you never find it.

977
00:59:56,699 --> 01:00:04,219
Especially the divisions, the way to find the two-pollion run relation that matches all

978
01:00:04,219 --> 01:00:07,980
two-polls in another relation.

979
01:00:07,980 --> 01:00:08,980
It doesn't appear in the real world.

980
01:00:08,980 --> 01:00:09,980
It's not common.

981
01:00:09,980 --> 01:00:11,980
We don't want to worry about it.

982
01:00:11,980 --> 01:00:18,659
The bottom line again, the core of every relational database system is we built on these algebra

983
01:00:18,659 --> 01:00:27,179
and then we can define a round of these sort of roles that allow us to support very expressive

984
01:00:27,179 --> 01:00:32,179
and complex SQL queries.

985
01:00:32,179 --> 01:00:39,179
That's what we need.

986
01:00:39,179 --> 01:00:47,179
You can find a duplicate elimination on things of the primary key.

987
01:00:47,179 --> 01:01:08,179
The relation, query, still sort of a piece of software that the system actually executed.

988
01:01:08,179 --> 01:01:15,179
So one order versus another.

989
01:01:15,179 --> 01:01:18,179
So say I do a query where there's the Sb.

990
01:01:38,179 --> 01:02:03,179
I'm going to build two-pollion two-polls together, one-pollion two-polls together right away.

991
01:02:03,179 --> 01:02:10,179
So I'm going to write you out for your show of specifying how you want the data system to execute things.

992
01:02:10,179 --> 01:02:13,179
So a better approach, and this is the motivation for the course, is that we want to tell the database system that

993
01:02:13,179 --> 01:02:15,179
here's the answer we want.

994
01:02:15,179 --> 01:02:18,179
We don't know how, we don't care how you actually want to trust.

995
01:02:18,179 --> 01:02:20,179
This is what we want you to do for us.

996
01:02:20,179 --> 01:02:24,179
So that's what I'm specifying the exact algebra steps I want to compute.

997
01:02:24,179 --> 01:02:32,179
Hey, retrieve the two-polls from RNS, and find me all those where the ID.

998
01:02:32,179 --> 01:02:47,179
And then now the data system can take into account how the data being stored, what kind of where things are actually physically located, what the CPU can support, what kind of CPU do I have, do I have a GPU, do I have an FPGA, do I have other things.

999
01:02:47,179 --> 01:02:55,179
All of that can be in its decision for how to execute the query one way versus the other.

1000
01:02:56,179 --> 01:03:14,179
And now, again, think of like if I'm a developer, I can write a bunch of code in my laptop, write some SQL on my little test database, and then the same SQL statement will then work exactly the same, or it will produce the same correct result when I deploy in production on a giant machine that has a lot of memory.

1001
01:03:14,179 --> 01:03:17,179
And I don't have to change my application code.

1002
01:03:17,179 --> 01:03:30,179
So that's the beauty of the recipe, or why you're going to want a declarative language, but the core concept of how that declarative language is going to work is being predicated on relational algebra.

1003
01:03:30,179 --> 01:03:37,179
Right? So SQL is going to be the factor of standard as we'll discuss.

1004
01:03:48,179 --> 01:03:52,179
Okay?

1005
01:03:52,179 --> 01:03:53,179
Okay.

1006
01:03:54,179 --> 01:03:55,179
Perfect.

1007
01:03:58,179 --> 01:04:00,179
Click before we go. I want to talk about all the data models.

1008
01:04:00,179 --> 01:04:03,179
So.

1009
01:04:07,179 --> 01:04:11,179
I.

1010
01:04:11,179 --> 01:04:14,179
And it calls vector databases is the hot thing on hacker news.

1011
01:04:14,179 --> 01:04:16,179
It's worth discussing what they actually are.

1012
01:04:16,179 --> 01:04:22,179
So you guys understand why it's all bullshit, you see it in the real world.

1013
01:04:22,179 --> 01:04:24,739
So the document data model is old.

1014
01:04:24,739 --> 01:04:26,980
So MongoDB came out in 2008.

1015
01:04:26,980 --> 01:04:28,059
It's all this groundbreaking.

1016
01:04:28,059 --> 01:04:29,619
We're storing things as JSON.

1017
01:04:29,619 --> 01:04:32,619
But the ideas go back to the 1980s.

1018
01:04:32,619 --> 01:04:34,859
Early 1990s, there were object data.

1019
01:04:34,859 --> 01:04:36,940
Object oriented program was a high thing.

1020
01:04:36,940 --> 01:04:38,940
So people said rather than storing things of relations,

1021
01:04:38,940 --> 01:04:41,379
we want to store things as objects.

1022
01:04:41,379 --> 01:04:43,659
And then they had these sort of specialized programming languages

1023
01:04:43,659 --> 01:04:47,219
that knew how to write code in your office.

1024
01:04:47,219 --> 01:04:53,939
It's like a, it would database system.

1025
01:04:53,939 --> 01:04:57,339
But those, basically, those objects are the same thing as JSON.

1026
01:04:57,339 --> 01:04:58,379
They're the same thing as XML.

1027
01:04:58,379 --> 01:05:01,019
XML databases were the hot thing and 90,000s.

1028
01:05:01,019 --> 01:05:04,339
So at high level, all of them are equivalent.

1029
01:05:04,339 --> 01:05:10,819
So the data structure, we have these named fields.

1030
01:05:10,819 --> 01:05:16,379
And the values of the name field can be an array, a scalar type,

1031
01:05:16,380 --> 01:05:19,539
and so forth.

1032
01:05:19,539 --> 01:05:22,220
And again, all the modern systems use JSON.

1033
01:05:22,220 --> 01:05:26,140
So now the reason why these document data systems exist

1034
01:05:26,140 --> 01:05:30,980
is this problem that comes up called the relationship object

1035
01:05:30,980 --> 01:05:32,980
impedance mismatch.

1036
01:05:32,980 --> 01:05:36,940
That's the problem of if I break my data up

1037
01:05:36,940 --> 01:05:40,619
in these different relations, but I write my application code

1038
01:05:40,619 --> 01:05:44,180
in Python or whatever, in objects, now

1039
01:05:44,179 --> 01:05:46,099
when I want to go retrieve data from the data,

1040
01:05:46,099 --> 01:05:50,659
it's a bunch of joins, tits together the form that I

1041
01:05:50,659 --> 01:05:52,659
want to operate on my application.

1042
01:05:52,659 --> 01:05:56,539
But the data is once a layer or separate.

1043
01:05:56,539 --> 01:06:07,739
And so the, and I would argue, yeah, for some things,

1044
01:06:07,739 --> 01:06:08,859
that makes sense.

1045
01:06:08,859 --> 01:06:10,739
But for other things, it's actually a bad idea,

1046
01:06:10,739 --> 01:06:13,219
because now you're going to have a bunch of duplicate data.

1047
01:06:13,219 --> 01:06:14,699
You have all the problems you saw before where

1048
01:06:14,699 --> 01:06:17,739
I've got to make sure that if I change something that's

1049
01:06:17,739 --> 01:06:20,859
duplicated in a file or in my database,

1050
01:06:20,859 --> 01:06:22,219
I make the changes all over the place.

1051
01:06:26,219 --> 01:06:32,539
So we go back to our example before of the BG.

1052
01:06:32,539 --> 01:06:34,019
The high data I'll have to research.

1053
01:06:36,980 --> 01:06:39,939
So if I have an object that wants to get for a given artist,

1054
01:06:39,939 --> 01:06:42,019
here's all the albums that they appear on.

1055
01:06:42,019 --> 01:06:56,019
Right? Now, you can do this in a single single state member, but you know, it's not perfect,

1056
01:06:56,019 --> 01:07:04,019
but there's ways to do it. So, the dogman deities people say, you don't need this guy here,

1057
01:07:04,019 --> 01:07:07,019
you get this. And if you're application code, is it

1058
01:07:07,019 --> 01:07:10,019
code, is it?

1059
01:07:27,019 --> 01:07:32,019
The same promise before, like, if I, if I'm an artist appearing on the same album,

1060
01:07:32,019 --> 01:07:36,019
I could have duplicate entries in all their JSON documents. If I make updates,

1061
01:07:36,019 --> 01:07:40,019
I'm going to make sure I change all of them. So,

1062
01:07:48,019 --> 01:07:50,019
and so, natively,

1063
01:07:56,019 --> 01:08:01,019
so the interesting reflection point in the database marketplace where

1064
01:08:01,019 --> 01:08:06,019
almost all the JSON databases that said, we don't want to use SQL, we don't want to use

1065
01:08:06,019 --> 01:08:11,019
relational data model, a lot of them have basically converged and become more relational like.

1066
01:08:11,019 --> 01:08:20,020
And you can run SQL on JSON. And so, over time, what we're seeing is that the

1067
01:08:20,020 --> 01:08:25,020
intellectual difference between document data and SQL databases and relational databases

1068
01:08:25,020 --> 01:08:30,020
has shrunk. And now, basically, they're all relational databases.

1069
01:08:30,020 --> 01:08:36,020
Mongo was last hold up. Mongo added support for SQL in 2021, right? But for years,

1070
01:08:36,020 --> 01:08:40,020
because we know the founders are like, oh, we're never going to support SQL, they do.

1071
01:08:40,020 --> 01:08:45,020
And then get the other, they also support JSON. So, I would

1072
01:08:45,020 --> 01:08:51,020
go to an alternate database that is contorting and stuff, look like a relational database when you just

1073
01:08:51,020 --> 01:08:56,020
have a database, plus press.

1074
01:08:56,020 --> 01:09:00,020
So, they're in the news because obviously,

1075
01:09:00,020 --> 01:09:06,020
check, if you tease the hot thing, and so, the way to think about this now is like

1076
01:09:06,020 --> 01:09:11,020
when pure building web applications 10, 15 years ago, everything was always JSON,

1077
01:09:11,020 --> 01:09:16,020
they're fine, you need a JSON database. And that's how the new SQL system is going to start.

1078
01:09:16,020 --> 01:09:22,020
Now, it's like, okay, well, I have all these vectors I'm going to come back from my

1079
01:09:22,020 --> 01:09:26,020
former HTTPT or whatever I'm using, and sort of that in a database that can

1080
01:09:26,020 --> 01:09:33,020
natively store vectors. So, I can do, but I would argue that these systems,

1081
01:09:33,020 --> 01:09:37,020
they're basically, they're, they're, they're limited to functionality, and over time,

1082
01:09:37,020 --> 01:09:40,020
they're basically going to have to morph to a relational database.

1083
01:09:40,020 --> 01:09:43,020
So, the vector data model vector is just a

1084
01:09:43,020 --> 01:09:49,020
array that, and in this approach here with these systems, it's a one-dimensional

1085
01:09:49,020 --> 01:09:54,020
array of floating point numbers. And the systems for the

1086
01:09:54,020 --> 01:09:58,020
neighbor search, either exact or proximate,

1087
01:09:58,020 --> 01:10:02,020
allow you to semantic search over your data. So, in all my predictors I share before,

1088
01:10:02,020 --> 01:10:07,020
it's like AID equals two, AID equals 102, whatever, exact matches.

1089
01:10:07,020 --> 01:10:11,020
This, with these vectors allow you to embed somehow,

1090
01:10:11,020 --> 01:10:16,020
magically through, through, through Transformers, the deeper meaning of what your

1091
01:10:16,020 --> 01:10:19,020
data actually looks like. So, you can ask high-level questions like, hey, show me,

1092
01:10:19,020 --> 01:10:24,020
you know, show me, show me how to relate to this. You know, show me,

1093
01:10:24,020 --> 01:10:28,020
you know, show me, show me, show me how to relate to this.

1094
01:10:28,020 --> 01:10:31,020
Instead of doing exact matches for the keyword CMU, I would, I would,

1095
01:10:31,020 --> 01:10:35,020
I could learn things like, oh, Shum,

1096
01:10:35,020 --> 01:10:39,020
talk about a diversity in Pittsburgh, that was fan of by,

1097
01:10:39,020 --> 01:10:45,020
like, can learn things about, that are implicit in the data,

1098
01:10:45,020 --> 01:10:48,020
I then do exact lookups. Yes.

1099
01:10:48,020 --> 01:10:51,020
What's the difference between graph data and vector data?

1100
01:10:51,020 --> 01:10:54,020
Question is, what's interesting, graph data bases and vector data bases?

1101
01:10:54,020 --> 01:10:57,020
Let's take that one off of mine. That's different. But,

1102
01:10:57,020 --> 01:11:00,020
vector's literate is one, like, one-dimensional arrays.

1103
01:11:00,020 --> 01:11:03,020
Graph data bases are storing the relationship between objects, like edges and

1104
01:11:03,020 --> 01:11:06,020
nodes and things like that. If you're looking at one degree from the current

1105
01:11:06,020 --> 01:11:09,020
node, it sounds like it's similar.

1106
01:11:09,020 --> 01:11:12,020
It's statement, if you're looking at one degree from the current node,

1107
01:11:12,020 --> 01:11:15,020
it sounds like it's similar. But, like,

1108
01:11:15,020 --> 01:11:19,020
but, like, the, how to say this? In a graph data base, you're,

1109
01:11:19,020 --> 01:11:23,020
you're explicitly storing the, that structure and your traversing it to find

1110
01:11:23,020 --> 01:11:27,020
things that you're looking for. This is like, I'm encoding as a vector,

1111
01:11:27,020 --> 01:11:31,020
and I don't know what the vector is actually representing.

1112
01:11:32,020 --> 01:11:35,020
So, pi and current is pi, hot one, a bunch of

1113
01:11:35,020 --> 01:11:40,020
things that I'm going to give a talk about two years ago.

1114
01:11:40,020 --> 01:11:43,020
I'm going to give a talk about this two years ago.

1115
01:11:43,020 --> 01:11:49,020
It's under two weeks. So, if you want to learn more of this,

1116
01:11:49,020 --> 01:11:53,020
check it out. At their core, all these vector data bases are just going to be

1117
01:11:53,020 --> 01:11:58,020
a index that allow you to do nearest neighbor search.

1118
01:11:59,020 --> 01:12:01,020
So, it looks like this.

1119
01:12:01,020 --> 01:12:04,020
So,

1120
01:12:05,020 --> 01:12:08,020
that's the problem.

1121
01:12:08,020 --> 01:12:11,020
So,

1122
01:12:11,020 --> 01:12:15,020
I'm going to give a talk about this.

1123
01:12:15,020 --> 01:12:18,020
Okay.

1124
01:12:18,020 --> 01:12:22,020
So,

1125
01:12:22,020 --> 01:12:25,020
you're going to give a talk about this.

1126
01:12:25,020 --> 01:12:27,020
So,

1127
01:12:27,020 --> 01:12:30,020
you're going to give a talk about this.

1128
01:12:30,020 --> 01:12:33,020
The neighbor never figured out. We don't know what it is.

1129
01:13:01,020 --> 01:13:06,020
Okay.

1130
01:13:06,020 --> 01:13:09,020
So,

1131
01:13:09,020 --> 01:13:14,020
you're going to give a talk about this.

1132
01:13:15,020 --> 01:13:21,020
That's the core at a super high level of what a vector

1133
01:13:21,020 --> 01:13:25,020
is doing.

1134
01:13:26,020 --> 01:13:29,020
The question, is this similar to relational calculus?

1135
01:13:29,020 --> 01:13:32,020
What is? So, we're part of this.

1136
01:13:32,020 --> 01:13:35,020
Wait.

1137
01:13:56,020 --> 01:14:02,020
What?

1138
01:14:02,020 --> 01:14:07,020
I was trying to get it in the middle.

1139
01:14:07,020 --> 01:14:12,020
They care about that.

1140
01:14:12,020 --> 01:14:16,020
They care about that.

1141
01:14:16,020 --> 01:14:19,020
I was trying to get it in the middle.

1142
01:14:19,020 --> 01:14:21,020
They care about that.

1143
01:14:22,020 --> 01:14:24,020
So,

1144
01:14:24,020 --> 01:14:28,020
I would argue

1145
01:14:28,020 --> 01:14:33,020
the core of these vector is R is just this.

1146
01:14:52,020 --> 01:14:54,020
No.

1147
01:14:54,020 --> 01:14:57,020
Right. You can do a bunch of relational database.

1148
01:14:57,020 --> 01:15:00,020
They all added this.

1149
01:15:00,020 --> 01:15:02,020
Because,

1150
01:15:02,020 --> 01:15:05,020
PG vector,

1151
01:15:05,020 --> 01:15:08,020
single store, click house,

1152
01:15:08,020 --> 01:15:11,020
beyond all the data that we need to report this.

1153
01:15:11,020 --> 01:15:13,020
Okay.

1154
01:15:13,020 --> 01:15:16,020
I just want to explain to you.

1155
01:15:16,020 --> 01:15:18,020
So, database is ubiquitous.

1156
01:15:19,020 --> 01:15:23,020
And then relational algebra will be the core fun of

1157
01:15:23,020 --> 01:15:25,020
doing these interactions.

1158
01:15:25,020 --> 01:15:28,020
And then that will define how we want to build the component of our system

1159
01:15:28,020 --> 01:15:31,020
to run queries.

1160
01:15:31,020 --> 01:15:32,020
Okay.

1161
01:15:32,020 --> 01:15:34,020
So, when this class will be on C4,

1162
01:15:34,020 --> 01:15:37,020
Project 0 is out. Please start it now.

1163
01:15:37,020 --> 01:15:39,020
It's due the 11th.

1164
01:15:39,020 --> 01:15:42,020
And then homework 1 will be out.

1165
01:15:42,020 --> 01:15:43,020
Here.

1166
01:15:43,020 --> 01:15:45,020
Hit it.

1167
01:15:48,020 --> 01:15:50,020
Hit it.

1168
01:15:50,020 --> 01:15:52,020
Hit it.

1169
01:15:52,020 --> 01:15:54,020
Hit it.

1170
01:15:54,020 --> 01:15:56,020
Hit it.

1171
01:15:56,020 --> 01:15:58,020
Hit it.

1172
01:15:58,020 --> 01:16:00,020
Hit it.

1173
01:16:00,020 --> 01:16:02,020
Hit it.

1174
01:16:02,020 --> 01:16:03,020
Hit it.

1175
01:16:03,020 --> 01:16:05,020
Hit it.

1176
01:16:05,020 --> 01:16:06,020
Hit it.

1177
01:16:06,020 --> 01:16:07,020
Hit it.

1178
01:16:07,020 --> 01:16:08,020
Hit it.

1179
01:16:08,020 --> 01:16:09,020
Hit it.

1180
01:16:09,020 --> 01:16:10,020
Hit it.

1181
01:16:10,020 --> 01:16:11,020
Hit it.

1182
01:16:11,020 --> 01:16:12,020
Hit it.

1183
01:16:12,020 --> 01:16:13,020
Hit it.

1184
01:16:13,020 --> 01:16:14,020
Hit it.

1185
01:16:14,020 --> 01:16:15,020
Hit it.

1186
01:16:15,020 --> 01:16:16,020
Hit it.

1187
01:16:16,020 --> 01:16:17,020
Hit it.

1188
01:16:17,020 --> 01:16:18,020
Hit it.

1189
01:16:18,020 --> 01:16:19,020
Hit it.

1190
01:16:19,020 --> 01:16:20,020
Hit it.

1191
01:16:20,020 --> 01:16:21,020
Hit it.

1192
01:16:21,020 --> 01:16:22,020
Hit it.

1193
01:16:22,020 --> 01:16:23,020
Hit it.

1194
01:16:23,020 --> 01:16:24,020
Hit it.

1195
01:16:24,020 --> 01:16:25,020
Hit it.

1196
01:16:25,020 --> 01:16:26,020
Hit it.

1197
01:16:26,020 --> 01:16:27,020
Hit it.

1198
01:16:27,020 --> 01:16:28,020
Hit it.

1199
01:16:28,020 --> 01:16:29,020
Hit it.

1200
01:16:29,020 --> 01:16:30,020
Hit it.

1201
01:16:30,020 --> 01:16:31,020
Hit it.

1202
01:16:31,020 --> 01:16:32,020
Hit it.

1203
01:16:32,020 --> 01:16:33,020
Hit it.

1204
01:16:33,020 --> 01:16:34,020
Hit it.

1205
01:16:34,020 --> 01:16:35,020
Hit it.

1206
01:16:35,020 --> 01:16:36,020
Hit it.

1207
01:16:36,020 --> 01:16:37,020
Hit it.

1208
01:16:37,020 --> 01:16:38,020
Hit it.

1209
01:16:38,020 --> 01:16:39,020
Hit it.

1210
01:16:39,020 --> 01:16:40,020
Hit it.

1211
01:16:40,020 --> 01:16:41,020
Hit it.

1212
01:16:41,020 --> 01:16:42,020
Hit it.

1213
01:16:42,020 --> 01:16:43,020
Hit it.

1214
01:16:43,020 --> 01:16:44,020
Hit it.

1215
01:16:44,020 --> 01:16:45,020
Hit it.

1216
01:16:45,020 --> 01:16:46,020
Hit it.

