---
title: CS143 P3Week101 03 The Economy Of Programming Languages
---

1
00:00:00,000 --> 00:00:08,080
Hello, in this video we're going to talk about something that I refer to as the economy

2
00:00:08,080 --> 00:00:16,480
of programming languages.

3
00:00:16,480 --> 00:00:20,879
So the idea behind this video is that before we get into the details of how languages are

4
00:00:20,879 --> 00:00:27,800
implemented or designed, I want to say something about how languages work in the real world

5
00:00:27,800 --> 00:00:31,280
and why certain languages are used and others are not.

6
00:00:31,280 --> 00:00:35,200
And if you look around, there's actually a few obvious questions that come up to anybody

7
00:00:35,200 --> 00:00:39,399
who thinks about programming languages for more than a few minutes.

8
00:00:39,399 --> 00:00:41,960
One question is, why are there so many of these things?

9
00:00:41,960 --> 00:00:43,920
We have hundreds.

10
00:00:43,920 --> 00:00:48,920
If not thousands of programming languages in everyday use, and why do all of these things

11
00:00:48,920 --> 00:00:49,920
need to exist?

12
00:00:49,920 --> 00:00:53,159
Why wouldn't one programming language, for example, be enough?

13
00:00:53,159 --> 00:00:57,359
A related question, but slightly different, is why are there new programming languages?

14
00:00:57,359 --> 00:01:03,439
Given that we have so many programming languages already, what is the need for new ones

15
00:01:03,439 --> 00:01:05,799
to be created?

16
00:01:05,799 --> 00:01:09,159
And finally, how do we know a good programming language when we see it?

17
00:01:09,159 --> 00:01:12,680
What makes a good programming language and what makes a bad programming language?

18
00:01:12,680 --> 00:01:19,159
And I just want to spend this video anyway, talking about these three questions.

19
00:01:19,159 --> 00:01:24,400
And as we'll see, I think the answers to these questions are largely independent of the

20
00:01:24,400 --> 00:01:33,800
technical aspects of language design and implementation, but very interesting in their own right.

21
00:01:33,800 --> 00:01:37,760
So let's begin with the question of why there are so many programming languages.

22
00:01:37,760 --> 00:01:42,080
And at least a partial answer to this question is not too hard to come by.

23
00:01:42,080 --> 00:01:46,040
If you think for a few minutes, you'd realize that the application domains for programming

24
00:01:46,040 --> 00:01:49,920
have very distinctive and conflicting needs.

25
00:01:49,920 --> 00:01:56,640
It is very hard to design one language that would actually do everything in every situation

26
00:01:56,640 --> 00:01:58,760
for all programmers.

27
00:01:58,760 --> 00:02:01,120
And let's just go through some examples.

28
00:02:01,120 --> 00:02:09,000
One domain that you might not think about very much is scientific computing.

29
00:02:09,000 --> 00:02:15,000
So these are all the big calculations that are done for engineering applications primarily,

30
00:02:15,000 --> 00:02:23,000
but also big science and long running experiments, simulation experiments.

31
00:02:23,000 --> 00:02:26,400
And what are the needs for such computations?

32
00:02:26,400 --> 00:02:30,280
Well, typically you need very good floating point support.

33
00:02:30,280 --> 00:02:32,599
I'll abbreviate that as FP.

34
00:02:32,599 --> 00:02:40,360
You need good support for arrays and operations on arrays, because the most common data type

35
00:02:40,360 --> 00:02:45,320
in most scientific applications is large arrays of floating point numbers.

36
00:02:45,320 --> 00:02:49,240
And you also need parallelism.

37
00:02:49,240 --> 00:02:51,240
Okay.

38
00:02:51,240 --> 00:02:57,400
Today to get sufficient performance, you really have to exploit parallelism in these applications.

39
00:02:57,400 --> 00:03:01,040
And not every language actually supports all of these things well.

40
00:03:01,040 --> 00:03:04,360
This is actually not an exhaustive list of the things you need, but it's a few distinctive

41
00:03:04,360 --> 00:03:06,440
things that are needed.

42
00:03:06,439 --> 00:03:11,159
But one language that has traditionally done a very good job of supporting these things

43
00:03:11,159 --> 00:03:12,560
is Fortran.

44
00:03:12,560 --> 00:03:16,079
And Fortran is still heavily used in the scientific community.

45
00:03:16,079 --> 00:03:23,479
It was originally designed for scientific applications, if you recall, the name means formula translation.

46
00:03:23,479 --> 00:03:26,079
And it has evolved over time.

47
00:03:26,079 --> 00:03:30,360
It doesn't really look much like the original language anymore, but it's always retained

48
00:03:30,360 --> 00:03:35,479
this core constituency in scientific computing and remains one of the leading languages in

49
00:03:35,479 --> 00:03:36,479
that domain.

50
00:03:36,479 --> 00:03:47,319
Now, a completely different kind of domain is business applications.

51
00:03:47,319 --> 00:03:48,319
And so what do you need here?

52
00:03:48,319 --> 00:03:52,639
Well, so here you're going to need things like persistence.

53
00:03:52,639 --> 00:03:54,239
You don't want to lose your data.

54
00:03:54,239 --> 00:03:59,679
You know, businesses go to a lot of trouble to get the data, and they need a way to hold

55
00:03:59,679 --> 00:04:00,679
on to it.

56
00:04:00,679 --> 00:04:03,799
You know, and they want that to be extremely reliable.

57
00:04:03,800 --> 00:04:06,880
You're going to need good report facilities.

58
00:04:06,880 --> 00:04:12,480
It's typically you want to do something with the data, so you need good facilities for

59
00:04:12,480 --> 00:04:15,040
report generation.

60
00:04:15,040 --> 00:04:17,800
And also, you want to be able to exploit the data.

61
00:04:17,800 --> 00:04:22,480
The data is actually in many modern businesses, one of the most valuable assets.

62
00:04:22,480 --> 00:04:26,720
And so you need good facilities for asking questions about your data.

63
00:04:26,720 --> 00:04:28,319
Let's call it data analysis.

64
00:04:28,719 --> 00:04:34,639
And again, this is not an exhaustive list of things that you need, but it is representative,

65
00:04:34,639 --> 00:04:35,639
I would say.

66
00:04:35,639 --> 00:04:42,079
And probably the most common or one of the most common, we used languages for this class

67
00:04:42,079 --> 00:04:46,240
of applications is SQL, the database query language.

68
00:04:46,240 --> 00:04:52,120
So relational databases and their associated programming language languages, I should say,

69
00:04:52,120 --> 00:04:59,120
but most notably SQL really dominate in this application domain.

70
00:04:59,120 --> 00:05:06,639
And then another domain, let's do one more, is systems programming.

71
00:05:06,639 --> 00:05:12,519
So by this, I mean things like embedded systems, things to control devices, operating systems,

72
00:05:12,519 --> 00:05:13,519
things like that.

73
00:05:13,519 --> 00:05:15,519
And what are the characteristics here?

74
00:05:15,519 --> 00:05:19,680
Well, we need very low level control of the resources.

75
00:05:19,680 --> 00:05:24,240
The whole point of systems programming is to do a good job of managing resources.

76
00:05:24,240 --> 00:05:29,840
And so we really want fine grain control over the resources.

77
00:05:29,840 --> 00:05:32,319
And often there's a time aspect.

78
00:05:32,319 --> 00:05:41,040
So you might be have some real time constraints, you need to be able to reason about time.

79
00:05:41,040 --> 00:05:46,439
Because these are actually, again, devices and they need to be able to react with certain

80
00:05:46,439 --> 00:05:47,439
amounts of time.

81
00:05:47,439 --> 00:05:51,839
If it's a network device or something like that, you need to be responsive to the network.

82
00:05:51,839 --> 00:05:56,120
Lots and lots of things, lots and lots of examples where timing is important.

83
00:05:56,120 --> 00:06:00,759
These are just two aspects and I'm running out of space here, so I'll just stop with that.

84
00:06:00,759 --> 00:06:05,920
But again, these are representative of the kinds of things you need in systems programming.

85
00:06:05,920 --> 00:06:10,519
And probably today, still the most widely used systems programming language or family

86
00:06:10,519 --> 00:06:19,159
of systems programming languages is the C and some extent C++ family of languages.

87
00:06:19,159 --> 00:06:23,680
And as you can see, the requirements in these different domains are just completely different

88
00:06:23,680 --> 00:06:24,680
from each other.

89
00:06:24,680 --> 00:06:28,839
What's important in one domain or most important in one domain is not the same as in another

90
00:06:28,839 --> 00:06:29,839
domain.

91
00:06:29,839 --> 00:06:34,000
And it's easy, I think, to imagine at least that it would be difficult to integrate all

92
00:06:34,000 --> 00:06:43,759
of these into one system that would do a good job on all of these things.

93
00:06:43,759 --> 00:06:47,279
That brings us to our second question, why are there new programming languages?

94
00:06:47,279 --> 00:06:48,279
Okay?

95
00:06:48,279 --> 00:06:53,959
There are so many languages in existence, why would we ever need to design a new one?

96
00:06:53,959 --> 00:06:58,600
And I'm going to begin the answer to this question with an observation that at first a glance

97
00:06:58,600 --> 00:07:01,519
has nothing to do with the question at all.

98
00:07:01,519 --> 00:07:03,199
So let me just take a moment to explain it.

99
00:07:03,199 --> 00:07:07,319
I claim that programmer training is the dominant cost for programming language.

100
00:07:07,319 --> 00:07:08,759
And I think this is really important.

101
00:07:08,759 --> 00:07:13,800
So I'm just going to emphasize the bit that's important here.

102
00:07:13,800 --> 00:07:18,240
It's the programmer training, the cost of educating the programmers in the language.

103
00:07:18,240 --> 00:07:22,519
So if you think about a programming language, there are several things that have to happen

104
00:07:22,519 --> 00:07:25,039
for that language to get used.

105
00:07:25,039 --> 00:07:27,719
Somebody has to design it, but that's really not very expensive.

106
00:07:27,719 --> 00:07:31,279
That's just one or a very few people, typically.

107
00:07:31,279 --> 00:07:35,879
Somebody has to build a compiler, but that is also not actually all that expensive.

108
00:07:35,879 --> 00:07:42,279
Maybe 10 to 20 people for a really large compiler project can build quite a good compiler.

109
00:07:42,279 --> 00:07:45,319
The real cost is in all the users and educating them.

110
00:07:45,319 --> 00:07:52,079
So if you have thousands or hundreds of thousands or millions of users of a language, the time

111
00:07:52,079 --> 00:07:57,039
and money that it takes to teach them all the language is really the dominant cost.

112
00:07:57,040 --> 00:08:02,319
And here I don't mean just the actual dollar expense of buying textbooks and taking

113
00:08:02,319 --> 00:08:04,200
classes and things like that.

114
00:08:04,200 --> 00:08:08,160
It's also the fact that the programmers have to decide that it's worth it for them to

115
00:08:08,160 --> 00:08:13,480
learn this language and many programmers learn on their own time, but that's a use of

116
00:08:13,480 --> 00:08:18,480
their time and the expense of their time is a real economic cost.

117
00:08:18,480 --> 00:08:22,320
And so if you think about the number of hours that it takes to teach a population of a

118
00:08:22,319 --> 00:08:29,759
million programmers a language, that's really quite a significant economic investment.

119
00:08:29,759 --> 00:08:30,759
All right.

120
00:08:30,759 --> 00:08:35,360
Now from this observation, we can make a couple of predictions pretty easily.

121
00:08:35,360 --> 00:08:42,240
And again, these are just predictions now that follow from this claim, if you believe

122
00:08:42,240 --> 00:08:44,080
that it's true.

123
00:08:44,080 --> 00:08:45,480
So let me erase that and fix it.

124
00:08:45,480 --> 00:09:01,600
So first prediction is that widely used languages will be slow to change.

125
00:09:01,600 --> 00:09:02,840
And why should that be true?

126
00:09:02,840 --> 00:09:09,320
Well, if I make a change to a language that lots of people use, I have to educate everybody

127
00:09:09,320 --> 00:09:11,320
in that community about the change.

128
00:09:11,320 --> 00:09:18,560
And so even relatively minor language extensions, small changes to syntax, small new features,

129
00:09:18,560 --> 00:09:21,400
even just simple changes in the interface of the compiler.

130
00:09:21,400 --> 00:09:26,520
If you have a lot of users, it takes a very long time and is quite expensive to teach them

131
00:09:26,520 --> 00:09:28,160
all about that.

132
00:09:28,160 --> 00:09:34,879
So as these languages become widely used, the rate of change, their rate of change will

133
00:09:34,879 --> 00:09:36,600
slow down.

134
00:09:36,600 --> 00:09:40,760
And this predicts it over time as the world of programming grows as we have more and more

135
00:09:40,759 --> 00:09:42,000
programmers in the world.

136
00:09:42,000 --> 00:09:46,399
We would expect the most popular languages, which will have larger and larger user bases,

137
00:09:46,399 --> 00:09:52,399
a larger and larger programmer bases to become more and more ossified, to evolve more

138
00:09:52,399 --> 00:09:53,399
and more slowly.

139
00:09:53,399 --> 00:09:59,080
And I think actually what you see in practice is very consistent with that prediction.

140
00:09:59,080 --> 00:10:06,319
Now at the other end of the spectrum, this same observation makes almost what appears to

141
00:10:06,320 --> 00:10:16,760
be contradictory prediction, which is that easy to start, it's easy to start a new language.

142
00:10:16,760 --> 00:10:21,040
That in fact, the cost of starting up a new language is very low.

143
00:10:21,040 --> 00:10:22,040
And why is that?

144
00:10:22,040 --> 00:10:23,560
Well, because you start with zero users.

145
00:10:23,560 --> 00:10:27,160
And so there's essentially zero training cost at the beginning.

146
00:10:27,160 --> 00:10:32,640
And even when you have just a few users, the cost of teaching them the changes in the language

147
00:10:32,640 --> 00:10:34,360
is not very high.

148
00:10:34,360 --> 00:10:39,039
And so new languages can evolve much more quickly.

149
00:10:39,039 --> 00:10:44,560
They can adapt much more quickly to changing situations.

150
00:10:44,560 --> 00:10:50,399
And it's just not very costly to experiment with a new language at all.

151
00:10:50,399 --> 00:10:54,240
And there's a tension between these two things.

152
00:10:54,240 --> 00:10:56,240
Okay.

153
00:10:56,240 --> 00:11:01,560
So when is a programmer going to choose between a widely used existing language that perhaps

154
00:11:01,560 --> 00:11:03,879
doesn't change very quickly?

155
00:11:03,879 --> 00:11:09,080
And in a brand new language, well, they're going to choose it if the productivity, if their

156
00:11:09,080 --> 00:11:16,039
productivity exceeds the training cost.

157
00:11:16,039 --> 00:11:21,840
So if they perceive that by spending a little bit of time and money to learn this new language,

158
00:11:21,840 --> 00:11:25,919
they're going to be much more productive over a relatively short period of time, then

159
00:11:25,919 --> 00:11:29,519
they're going to make the switch.

160
00:11:29,519 --> 00:11:32,360
And so when is this likely to happen?

161
00:11:32,360 --> 00:11:41,159
Well, putting this all together, languages are most likely to be adopted.

162
00:11:41,159 --> 00:11:47,360
It's a filo void.

163
00:11:47,360 --> 00:11:48,360
Okay.

164
00:11:48,360 --> 00:11:54,680
And again, this is a prediction that follows from the fact that programmer training is the

165
00:11:54,680 --> 00:11:55,680
main cost.

166
00:11:55,680 --> 00:11:57,080
What do I mean by this?

167
00:11:57,480 --> 00:12:03,120
Well, what I mean is that programming languages exist for a purpose.

168
00:12:03,120 --> 00:12:06,520
I mean, people use them to get work done.

169
00:12:06,520 --> 00:12:10,800
And because we're still in the middle of the information revolution, there are new application

170
00:12:10,800 --> 00:12:12,480
domains coming along all the time.

171
00:12:12,480 --> 00:12:19,120
So there are new kinds of programming that emerge every few years or even more often than

172
00:12:19,120 --> 00:12:20,120
that.

173
00:12:20,120 --> 00:12:24,680
So just in terms of recent history, mobile applications are now something that's relatively

174
00:12:24,680 --> 00:12:25,680
new.

175
00:12:25,679 --> 00:12:29,879
And there's a lot of new technology being built up to support mobile computing.

176
00:12:29,879 --> 00:12:32,000
A few years ago, it was the internet itself.

177
00:12:32,000 --> 00:12:33,719
It was a new programming platform.

178
00:12:33,719 --> 00:12:39,239
And a bunch of new programming languages like Java in particular got started during that

179
00:12:39,239 --> 00:12:41,159
time.

180
00:12:41,159 --> 00:12:46,599
So new programming niches open up because of technology changes, what people want to do

181
00:12:46,599 --> 00:12:48,399
with software changes.

182
00:12:48,399 --> 00:12:51,839
And this creates new opportunities for languages.

183
00:12:51,840 --> 00:12:54,399
The old languages are slow to change.

184
00:12:54,399 --> 00:13:02,000
And so they have some difficulty adapting to fit these new domains.

185
00:13:02,000 --> 00:13:05,800
And they aren't really necessarily well suited to them for the reasons we talked about on

186
00:13:05,800 --> 00:13:11,000
the previous slide with the previous question, because it's hard to have one language that

187
00:13:11,000 --> 00:13:13,879
incorporates all the features you would want.

188
00:13:13,879 --> 00:13:20,160
And so the new languages are not necessarily perfect for these application domains.

189
00:13:20,159 --> 00:13:24,159
They're slow to adopt, to adapt to the new situation.

190
00:13:24,159 --> 00:13:26,439
And this tends to call forth new languages.

191
00:13:26,439 --> 00:13:32,319
So when there's a new opportunity and some application domain, if there are enough programmers

192
00:13:32,319 --> 00:13:38,439
to support the language, often the new language will arise.

193
00:13:38,439 --> 00:13:44,519
Just want to point out another prediction that can be made from this one observation that

194
00:13:44,519 --> 00:13:45,519
programmer training.

195
00:13:45,519 --> 00:13:46,879
And again, I'll underline that.

196
00:13:46,879 --> 00:13:49,279
This is the dominant cost for programming language.

197
00:13:49,279 --> 00:14:07,039
And that is that new languages tend to look like old languages.

198
00:14:07,039 --> 00:14:10,759
That is that new languages are rarely, if ever, completely new.

199
00:14:10,759 --> 00:14:17,879
They have a family resemblance to some predecessor language, sometimes a number of predecessor

200
00:14:17,879 --> 00:14:19,159
languages.

201
00:14:19,159 --> 00:14:20,319
And why is that?

202
00:14:20,319 --> 00:14:23,720
Well, partly that it's hard to think of truly new things.

203
00:14:23,720 --> 00:14:28,439
But also I think that there's an economic benefit to this, namely that it reduces the training

204
00:14:28,439 --> 00:14:29,439
cost.

205
00:14:29,439 --> 00:14:33,240
By having your new language look like an old language, by leveraging off what people already

206
00:14:33,240 --> 00:14:37,519
know about the old language, you make it easier for people to learn the new language.

207
00:14:37,519 --> 00:14:39,519
You make them learn it more quickly.

208
00:14:39,519 --> 00:14:47,360
And the most classic example of this is Java versus C++, where Java was designed to look

209
00:14:47,360 --> 00:14:49,639
a lot like C++.

210
00:14:49,639 --> 00:14:55,759
And that was I think very conscious to make it easy for all of the existing C++ programmers

211
00:14:55,759 --> 00:15:00,000
to start programming in Java.

212
00:15:00,000 --> 00:15:05,000
Finally, we can ask ourselves what is a good programming language.

213
00:15:05,000 --> 00:15:09,720
And here, unfortunately, the situation is much less clear.

214
00:15:09,720 --> 00:15:19,039
I would just make one claim that there is no, and I'll emphasize no, universally accepted

215
00:15:19,039 --> 00:15:26,039
metric for language design.

216
00:15:26,039 --> 00:15:28,159
And what do I mean by that?

217
00:15:28,159 --> 00:15:37,879
Well, I guess the most important part of this statement is the universally accepted bit.

218
00:15:37,879 --> 00:15:41,719
So I mean that people don't agree on what makes a good language.

219
00:15:41,719 --> 00:15:46,120
There are lots of metrics out there, and people have proposed lots of ways of measuring

220
00:15:46,120 --> 00:15:47,759
programming languages.

221
00:15:47,759 --> 00:15:54,279
But most people don't believe that these are very good measures.

222
00:15:54,279 --> 00:15:55,799
And there is certainly no consensus.

223
00:15:55,799 --> 00:16:00,079
If you just look at the world of programmers, they can't agree on what the best language

224
00:16:00,079 --> 00:16:01,079
is.

225
00:16:01,079 --> 00:16:04,759
And to convince yourselves of this, just go and take a look at any of the many news group

226
00:16:04,759 --> 00:16:11,159
posts where people get into semi-religious arguments about why one group of languages or

227
00:16:11,159 --> 00:16:15,559
particular language is better than another language.

228
00:16:15,559 --> 00:16:19,799
But even in the research community and the scientific community and among the people who

229
00:16:19,799 --> 00:16:26,000
design languages, I would say that there is no universally accepted consensus on what

230
00:16:26,000 --> 00:16:28,079
makes a good language.

231
00:16:28,079 --> 00:16:31,799
And to just kind of illustrate the difficulties in trying to come up with such a metric, let

232
00:16:31,799 --> 00:16:36,759
me discuss one that I've heard people propose in all seriousness.

233
00:16:36,759 --> 00:16:50,319
And that is that a good language is one people use.

234
00:16:50,319 --> 00:16:55,679
And let me put a question mark on that because I don't believe this statement.

235
00:16:55,679 --> 00:17:02,240
And I think a moment's reflection, with a moment's reflection, I can convince you that

236
00:17:02,240 --> 00:17:05,079
this isn't a great measure.

237
00:17:05,079 --> 00:17:10,159
On the positive side, I guess the argument for this is that it's a very clear measure.

238
00:17:10,159 --> 00:17:11,679
It measures the popularity of the language.

239
00:17:11,679 --> 00:17:13,480
So how many people are actually using it?

240
00:17:13,480 --> 00:17:19,439
And presumably, languages that are more widely used are more widely used for a good reason.

241
00:17:19,439 --> 00:17:23,839
In some sense, perhaps, they are better languages.

242
00:17:23,839 --> 00:17:28,439
But this would imply, if you believe this, and follow it to its logical conclusion, that

243
00:17:28,439 --> 00:17:35,000
visual basic is the best language.

244
00:17:35,000 --> 00:17:38,759
Of all other programming languages.

245
00:17:38,759 --> 00:17:40,119
And I have nothing against visual basic.

246
00:17:40,119 --> 00:17:42,759
It's a well-designed system.

247
00:17:42,759 --> 00:17:48,680
But I don't even think the designers of visual basic would claim that it is, in fact, the

248
00:17:48,680 --> 00:17:50,759
world's best programming language.

249
00:17:50,759 --> 00:17:56,799
And as we saw in the discussion that we just had, there are many, many other factors besides

250
00:17:56,799 --> 00:18:03,279
technical excellence that go into whether a programming language is widely used or not.

251
00:18:03,279 --> 00:18:08,639
In fact, technical excellence is probably not even the most important reason that a language

252
00:18:08,639 --> 00:18:09,639
might be used.

253
00:18:09,639 --> 00:18:16,839
It has much more to do with whether it addresses a niche or an application domain for which

254
00:18:16,839 --> 00:18:18,399
there isn't a better tool.

255
00:18:18,399 --> 00:18:21,399
And then, once it's established and has lots of users, of course, there's a inertia in

256
00:18:21,399 --> 00:18:24,079
history that aided in surviving.

257
00:18:24,079 --> 00:18:30,639
That's why we still have Fortran and Coball and lots of other languages from long, long

258
00:18:30,640 --> 00:18:36,920
ago that we could, if we were starting over today, design much better.

259
00:18:36,920 --> 00:18:40,840
So to conclude this video on the Academy of Programming Languages, I think that two

260
00:18:40,840 --> 00:18:46,240
most important things to remember are that application domains have conflicting needs.

261
00:18:46,240 --> 00:18:56,800
And therefore, it's difficult to design one system that incorporates everything that

262
00:18:56,800 --> 00:18:59,280
you would like to have.

263
00:18:59,279 --> 00:19:05,200
So you can't get all the features that you would like into a single system and a coherent

264
00:19:05,200 --> 00:19:06,200
design.

265
00:19:06,200 --> 00:19:07,879
At least, it's very hard to do that.

266
00:19:07,879 --> 00:19:14,319
And so it takes a lot of time to add new features to existing systems.

267
00:19:14,319 --> 00:19:19,879
And the second point is that programmer training is the dominant cost for a programming language.

268
00:19:19,879 --> 00:19:26,839
And together, these two things, these two observations, these really explain why we get

269
00:19:26,839 --> 00:19:28,839
new programming languages.

270
00:19:28,839 --> 00:19:31,119
Because the old languages are difficult to change.

271
00:19:31,119 --> 00:19:36,759
And when we have new opportunities, it's often easier and more direct to just design a new

272
00:19:36,759 --> 00:19:43,319
language for those rather than trying to move the entire community of programmers and

273
00:19:43,319 --> 00:19:49,799
existing systems to accommodate those new applications.

