---
title: MIT6824 P1Lecture1 Introduction
---

1
00:00:00,000 --> 00:00:09,500
As you probably have noticed, I put up the year on the my share screen, the web page, most

2
00:00:09,500 --> 00:00:11,500
of the classes driven from the schedule.

3
00:00:11,500 --> 00:00:16,500
I'll talk a little bit later about it, but hopefully you'll find the URL and you'll find

4
00:00:16,500 --> 00:00:17,500
the schedule.

5
00:00:17,500 --> 00:00:23,500
I'll return it out a little bit later in more detail.

6
00:00:23,500 --> 00:00:29,000
Okay, so what's the point for today?

7
00:00:30,000 --> 00:00:34,000
I'm going to talk a little bit about what is a distributed system.

8
00:00:34,000 --> 00:00:36,000
So what is it?

9
00:00:36,000 --> 00:00:42,000
And maybe get a little bit of historical context, you know, how distributed systems have

10
00:00:42,000 --> 00:00:48,000
developed over the last couple of decades.

11
00:00:48,000 --> 00:00:57,000
Then hit a little bit on the course structure, like what you should expect.

12
00:00:57,000 --> 00:01:02,679
Then talk what are the main topics, what are the main recurring topics that we'll see

13
00:01:02,679 --> 00:01:05,960
throughout the term.

14
00:01:05,960 --> 00:01:11,920
And then we'll see actually the first illustration of those main topics by the case study that

15
00:01:11,920 --> 00:01:17,319
was assigned for today to paper and that produced, which is also the topic of the first lap.

16
00:01:17,319 --> 00:01:25,719
And you watch the piyata, you know, we just posted that lap on piyata, the URL so that you

17
00:01:25,719 --> 00:01:29,719
can get going and it's you next Friday.

18
00:01:29,719 --> 00:01:32,719
All right, so let's start with the basics.

19
00:01:32,719 --> 00:01:37,719
I'll talk a little bit about what is a distributed system.

20
00:01:44,719 --> 00:01:49,719
And sort of a, you know, maybe you'd use you to start with a little picture.

21
00:01:49,719 --> 00:01:55,719
The Internet Cloud.

22
00:01:55,719 --> 00:02:09,719
People's connected to clients and maybe servers, maybe have servers that actually are complete data centers.

23
00:02:09,719 --> 00:02:12,719
Clients.

24
00:02:12,719 --> 00:02:16,719
And the data sends themselves, you know, maybe internally distributed systems that are connected

25
00:02:16,719 --> 00:02:19,719
by internal networks.

26
00:02:19,719 --> 00:02:25,719
The data centers themselves might be internal connections, you know, outside of the Internet.

27
00:02:25,719 --> 00:02:28,719
It's a large collection of computers connected by networks.

28
00:02:28,719 --> 00:02:37,719
And you know, sort of informally, you know, the way I think about it, what the distributed system is, there's a multiple, you know, more than one computer.

29
00:02:37,719 --> 00:02:43,719
Networked, you know, so they can interact only through, you know, sending or receiving packets.

30
00:02:43,719 --> 00:02:54,719
And you're supposed to say a multi processor where you can interact with shared memory and they're cooperating to deliver some service.

31
00:02:54,719 --> 00:03:01,719
For the four keywords, you know, that define, you know, for me, you distribute the systems.

32
00:03:01,719 --> 00:03:09,719
Often, you know, you might not be aware of the interacting of the distributed system, you know, you might be using some clients, for example, the zoom client.

33
00:03:09,719 --> 00:03:18,719
And then back in the zoom client, you know, there are huge data centers or multiple data centers supporting actually, you know, this particular distributed application.

34
00:03:18,719 --> 00:03:26,719
And in some ways, you know, we wouldn't be having these zoom lectures if there are more than the, you know, even there were into the distributed systems.

35
00:03:26,719 --> 00:03:34,719
And so they often form, you know, the backbone of the infrastructure that supports applications.

36
00:03:34,719 --> 00:03:50,719
So why are distributed systems interesting or, you know, what, what, what, what are the main sort of use cases, you know, for distributed systems.

37
00:03:50,719 --> 00:03:56,719
And then you know, there's a broadly speaking, they're basically four main reasons.

38
00:03:56,719 --> 00:04:12,719
One is to just connect physically separated machines.

39
00:04:12,719 --> 00:04:18,720
You know, you might have, you know, we're in both all of us over here with many of us.

40
00:04:18,720 --> 00:04:35,720
We just saw an introduction in our, in different locations. And you get in the inner we're connecting with our laptop or our phone or our iPad, you know, to some server that actually sits in a completely different part of the world.

41
00:04:35,720 --> 00:04:43,720
example, usually we can get around more than thousand children of the lanes the site is.

42
00:04:43,720 --> 00:04:55,720
Because of the Hangover Try maj for most of our reads, just to make sure we have opened all of them after, you know, a giveaway called read, a giveaway.

43
00:04:55,720 --> 00:04:58,680
to the same computer, then actually we can start sharing data.

44
00:04:58,680 --> 00:05:03,720
And that enables all kinds of collaborative possibilities.

45
00:05:03,720 --> 00:05:08,360
And whether it is file sharing, whether it is sharing of screens,

46
00:05:08,360 --> 00:05:12,280
whether it's sharing of computing infrastructure,

47
00:05:12,280 --> 00:05:15,160
it's all enabled because we can connect to physically

48
00:05:15,160 --> 00:05:17,080
separated machines.

49
00:05:17,080 --> 00:05:19,720
So that'd probably a very important reason.

50
00:05:19,720 --> 00:05:21,880
And a couple other really important reasons

51
00:05:21,879 --> 00:05:26,519
one is to, another one is to increase capacity,

52
00:05:29,399 --> 00:05:31,480
you know, through parallelism.

53
00:05:33,639 --> 00:05:35,879
And you know, the paper that we signed for today

54
00:05:35,879 --> 00:05:37,639
and with us the topic of the first lab,

55
00:05:37,639 --> 00:05:40,360
the map to do this paper, there was a good example of that.

56
00:05:41,399 --> 00:05:43,399
But the other example is, you know, for example,

57
00:05:43,399 --> 00:05:45,879
there are many many Zoom sessions going on at the same time.

58
00:05:45,879 --> 00:05:48,680
And you know, zoom.com has to support it all.

59
00:05:48,680 --> 00:05:50,040
And that requires a lot of computers,

60
00:05:50,040 --> 00:05:51,960
basically, you know, increased capacity,

61
00:05:51,960 --> 00:05:55,879
so that you can support all those in parallel Zoom sessions.

62
00:05:57,240 --> 00:05:59,640
Another important reason is, you know, to tolerate false.

63
00:06:05,960 --> 00:06:10,520
So for example, you know, because computers might be physically separated,

64
00:06:10,520 --> 00:06:12,759
you know, one part can go down and hopefully

65
00:06:12,759 --> 00:06:15,800
bone affect another part of another part of the surface.

66
00:06:15,800 --> 00:06:17,720
So that, you know, the service can always do delivered,

67
00:06:17,720 --> 00:06:19,320
you know, so you can get high availability.

68
00:06:20,120 --> 00:06:23,080
And we'll see that as a major theme, you know, for this class.

69
00:06:24,200 --> 00:06:27,560
And then the final one is, you know, sort of be, you know,

70
00:06:27,560 --> 00:06:30,439
also sort of takes advantage of this physical separation,

71
00:06:31,240 --> 00:06:32,760
which is going to achieve security.

72
00:06:37,080 --> 00:06:43,400
And for example, if you have a very sensitive surface,

73
00:06:43,400 --> 00:06:46,439
you know, the surface that manages your password for your,

74
00:06:46,439 --> 00:06:48,439
you know, customers, you know, for login,

75
00:06:49,079 --> 00:06:52,360
through your service, you know, you would like to really

76
00:06:53,719 --> 00:06:57,160
guard that one, you know, machine, then not share it with anybody else,

77
00:06:57,160 --> 00:07:00,040
or not share any other application or run any applications on it.

78
00:07:00,040 --> 00:07:02,279
So you have a very narrow interface, you know,

79
00:07:02,279 --> 00:07:03,160
to that machine.

80
00:07:03,160 --> 00:07:05,000
And then how about you hopefully, you know,

81
00:07:05,000 --> 00:07:08,600
to get better security because you just have to protect that one small interface.

82
00:07:08,600 --> 00:07:13,000
And so by putting things in separate, you know, computers and isolate them,

83
00:07:13,879 --> 00:07:17,159
you know, you might actually be able to, it's a good stepping stone to get security.

84
00:07:18,439 --> 00:07:20,199
These are major regions,

85
00:07:22,360 --> 00:07:25,560
main four regions, I think why one wants to,

86
00:07:26,360 --> 00:07:27,639
why interest system are popular.

87
00:07:29,399 --> 00:07:30,920
I want to talk a little bit about, you know,

88
00:07:30,920 --> 00:07:33,079
keeping a little bit of historical context, you know,

89
00:07:33,079 --> 00:07:34,839
for distributed systems.

90
00:07:35,399 --> 00:07:36,920
And so where did it came from?

91
00:07:36,920 --> 00:07:41,879
And what sort of has happened over the decades, actually.

92
00:07:48,839 --> 00:07:55,560
And it's sort of basically sort of the distributed systems as we sort of now look at them,

93
00:07:55,560 --> 00:08:00,759
or the way we recognize them, probably started around the same time the local area networks happened.

94
00:08:05,480 --> 00:08:07,720
Here, you know, I think early 80s.

95
00:08:11,959 --> 00:08:14,600
And so, for example, you would have a campus network like at MIT,

96
00:08:15,480 --> 00:08:19,560
and connecting, for example, the workstations like in Athena Cluster,

97
00:08:19,560 --> 00:08:21,800
you know, to the Athena servers like AFS.

98
00:08:22,840 --> 00:08:25,879
And so that was sort of the typical distributed system at that point.

99
00:08:25,879 --> 00:08:28,680
And AFS also dates, you know, from that period of time.

100
00:08:30,439 --> 00:08:32,040
Of course, the Internet was there too,

101
00:08:32,600 --> 00:08:36,279
but there was really not sort of large scale Internet applications the way we,

102
00:08:36,279 --> 00:08:38,120
you know, are using them now.

103
00:08:38,120 --> 00:08:41,960
And so the main sort of Internet scale side type distributed systems,

104
00:08:41,960 --> 00:08:44,120
you know, was DNS, the domain name system.

105
00:08:44,519 --> 00:08:46,440
We still use and basically email.

106
00:08:48,759 --> 00:08:52,039
And so when I, early in the early days, when I'd like to do distributed systems,

107
00:08:52,039 --> 00:08:57,240
you know, those are basically the main examples that we have to discuss.

108
00:08:57,720 --> 00:09:00,759
Now, things have changed quite dramatically since the 1980s,

109
00:09:00,759 --> 00:09:04,039
and the importance of distributed systems has just tremendously increased.

110
00:09:04,919 --> 00:09:10,919
And one, you know, significant point was data centers, the rise of data centers.

111
00:09:11,639 --> 00:09:15,559
And that went along with basically the big websites.

112
00:09:19,399 --> 00:09:25,719
And here, you know, we're talking sort of the roughly speaking in the 1990s or early 1990s.

113
00:09:26,439 --> 00:09:29,159
And so what happened basically is that, you know,

114
00:09:29,159 --> 00:09:33,639
somewhere in the late 80s, or in the early 80s, the government or Congress,

115
00:09:33,639 --> 00:09:37,719
they allowed commercial traffic on the Internet.

116
00:09:38,200 --> 00:09:43,240
And that basically resulted in in boom, where, you know, you started getting big websites that

117
00:09:43,240 --> 00:09:48,120
were supporting large, large number of users. And, you know, the applications from those times,

118
00:09:48,120 --> 00:09:54,120
like, for example, you know, web search, you know, being able to search all the different,

119
00:09:54,120 --> 00:09:59,000
you know, web pages that actually were on the, on the worldwide web, you know, shopping.

120
00:10:00,840 --> 00:10:05,240
And so these, you know, applications, you know, gave rise to, you know, two sort of things.

121
00:10:05,240 --> 00:10:09,399
One, huge datasets, you know, sort of indexing, you know, to support web search, you have to

122
00:10:09,399 --> 00:10:14,039
index all the web pages on the Internet. So I don't mean like to have to gather a crawl all the

123
00:10:14,039 --> 00:10:18,279
web pages, then compute a reverse index. And then, you know, you could use that for your search engine.

124
00:10:19,159 --> 00:10:22,919
That was just a tremendous amount of data that didn't fit on one computer. And the amount of

125
00:10:22,919 --> 00:10:27,480
computation to actually do the reverse indexing, you know, there was also two, much for a single computer.

126
00:10:27,480 --> 00:10:31,879
As a result, you know, you know, sort of the data centers came about, where, you know, companies started,

127
00:10:31,879 --> 00:10:35,080
you know, put lots and lots of computers in data centers so that it can support those kinds of

128
00:10:35,080 --> 00:10:40,679
applications. So that's one lot of data. And the second one is there's a lot, a lot of users,

129
00:10:41,879 --> 00:10:46,039
not uncommon for you know, pick up websites that hundreds of millions of users. And that just

130
00:10:46,039 --> 00:10:50,679
requires a lot of machines to actually support all those users. And so we see,

131
00:10:51,799 --> 00:10:58,600
tremendous amount of innovation in this spirit of time, or still continuing. And some of the papers

132
00:10:58,600 --> 00:11:03,720
that we read, like the MapReduce paper actually sort of started from that period of time.

133
00:11:05,879 --> 00:11:10,759
That whole thing sort of, sort of, sort of, excelent that held development accelerated with the

134
00:11:10,759 --> 00:11:21,480
emergency of cloud computing. And other early, you know, whatever, mid to late, you know, two

135
00:11:21,480 --> 00:11:27,480
thousands. And so here, where we see you move, where users, where customers,

136
00:11:28,279 --> 00:11:33,480
basically move their computation and the data to data centers, you know, and by other people,

137
00:11:33,480 --> 00:11:42,200
like Amazon, you know, Google, Microsoft, you know, you name it. And so a lot of the computation,

138
00:11:42,200 --> 00:11:46,840
data computation that people used to run on their, you know, their desktop or on the laptop,

139
00:11:46,840 --> 00:11:51,160
just moves inside of the cloud computing and like application change, you know, all that,

140
00:11:51,160 --> 00:11:55,320
instead of like running an application on your local computer, you run actually the application

141
00:11:55,320 --> 00:11:59,399
inside of the cloud. And that means, you know, that these data centers, you know, have to grow

142
00:11:59,399 --> 00:12:05,879
further and support, you know, this new set of applications. And not only that, you know, the,

143
00:12:05,879 --> 00:12:11,000
so for customers that were outsourcing their computing to cloud computing,

144
00:12:11,080 --> 00:12:17,320
also started to run large websites themselves. And you know, do gigantic competitions on

145
00:12:17,320 --> 00:12:22,759
themselves, you know, whether it's machine learning or large data sets or any other kind of type

146
00:12:22,759 --> 00:12:28,919
of computation. And so you see is that, you know, the users themselves, one of the builds large

147
00:12:28,919 --> 00:12:33,240
scale distributed systems. And that meant like the cloud providers, you know, starting building a

148
00:12:33,240 --> 00:12:38,120
lot of infrastructure to allow other people to scale up, you know, their, you know, their,

149
00:12:38,120 --> 00:12:43,639
their systems through, you know, large number of machines and achieve, you know, high parallelism,

150
00:12:43,639 --> 00:12:49,960
high performance and store lots of data. And so, you know, as a result, you know, with the

151
00:12:49,960 --> 00:12:57,159
current state is basically that, you know, it's a very active area of research as well as development.

152
00:13:00,600 --> 00:13:05,240
In fact, you know, so hard, or so active, that is difficult, you know, to sort of keep,

153
00:13:05,240 --> 00:13:11,720
keep up to date. There's a lot of developments. And, you know, even in this class, you know,

154
00:13:11,720 --> 00:13:16,039
we're going to spend a full semester in distributed systems, you know, we're going to only, you know,

155
00:13:16,039 --> 00:13:22,600
be able to sort of look at, you know, a number of small fraction of like older stuff,

156
00:13:22,600 --> 00:13:25,560
all the kind of distributed systems actually that people are building in practice now.

157
00:13:27,560 --> 00:13:33,240
One thing that is cool for us, you know, as teachers and students who have distributed systems

158
00:13:33,240 --> 00:13:39,080
is that the people that build these data centers early on, even though they were building

159
00:13:39,080 --> 00:13:44,360
the system for their own internal infrastructure, they published papers about it. And we can read

160
00:13:44,360 --> 00:13:48,519
those papers. And so, in fact, you know, during the semester, we'll read a number of those,

161
00:13:48,519 --> 00:13:53,480
you know, papers that were built by people that, you know, really have large scale-descited system

162
00:13:53,480 --> 00:13:59,720
challenges. And, you know, we can see how they were solved and learn from them. This accelerated,

163
00:13:59,720 --> 00:14:04,680
even war with cloud computing where, you know, in the early days of data centers, many of these

164
00:14:04,680 --> 00:14:10,759
services were internal for, you know, the, you know, for Microsoft, Google or Amazon or Yahoo,

165
00:14:10,759 --> 00:14:15,480
or for themselves. With the rise of cloud computing, you know, these services became public

166
00:14:15,480 --> 00:14:20,519
services that were used by other people. And so, suddenly, there's even more sort of systems

167
00:14:20,519 --> 00:14:27,639
infrastructure that is well documented and usable. And so, we can even, you know, we will study some

168
00:14:27,720 --> 00:14:32,679
of those cases too. And so, you just sort of look over these sort of four decades, you know,

169
00:14:32,679 --> 00:14:39,080
to tremendous rise of the importance of distributed computing. As I said, we earlier, I did my,

170
00:14:39,720 --> 00:14:43,559
doctoral thesis in distributed systems, actually somewhere in the 1980s. And even so, like,

171
00:14:43,559 --> 00:14:49,080
it was an important field, but not, you know, didn't blow your way in terms of significance. And,

172
00:14:50,360 --> 00:14:53,960
and the practicality, you know, was sort of limited to more of these local area plastics.

173
00:14:54,759 --> 00:15:01,080
And now, you know, it's just like completely booming research field and development field.

174
00:15:03,960 --> 00:15:07,639
Any questions a little about the historical context for distributed systems?

175
00:15:15,720 --> 00:15:21,400
Okay, let me talk a little bit about the challenges. And many of them, you're going to

176
00:15:21,559 --> 00:15:34,439
face head-on in the labs. So, so why is it, you know, hard and worth, you know, basically spending a

177
00:15:34,439 --> 00:15:41,639
semester learning about distributed systems? And there's sort of two things that drive, you know,

178
00:15:41,639 --> 00:15:48,120
the complexity and why distributed systems at heart. One is there are many concurrent parts.

179
00:15:51,879 --> 00:15:57,639
I mean, these data warehouses, you know, today computers are going to run, you know, 10,000,

180
00:15:57,639 --> 00:16:02,439
100,000 computers in parallel and sometimes know all in the same job. Like, we've seen the

181
00:16:02,439 --> 00:16:06,679
map-produced paper today, which is like from the early 90s, you know, 2,000 machines, you know,

182
00:16:06,679 --> 00:16:12,519
trying to work on one single problem. So, there's a lot of concurrent, you know, there's a lot of

183
00:16:12,519 --> 00:16:16,360
concurrent software, a lot of things happening concurrently, and so it's very hard to reason that through,

184
00:16:16,360 --> 00:16:25,240
like, understand why, you know, things are correct. And this is compounded by the fact that, you

185
00:16:25,240 --> 00:16:41,240
know, these systems must deal with partial failure. So, you know, one of these machines actually

186
00:16:41,240 --> 00:16:45,480
might go down, but that doesn't mean that the whole competition stops. In fact, you know,

187
00:16:45,560 --> 00:16:49,159
the rest of the machines probably, you know, hopefully, can continue running and maybe, you know,

188
00:16:49,159 --> 00:16:54,920
take over from the responsibility of the machine that failed. But this drives, you know, these two

189
00:16:54,920 --> 00:17:01,159
things together, basically drive complexity because it comes harder and harder to reason about why,

190
00:17:01,159 --> 00:17:05,720
you know, the system actually is working. And particularly partial failure makes things very

191
00:17:05,720 --> 00:17:10,120
complicated because one system, one part of the system might think that another part of the system

192
00:17:10,120 --> 00:17:14,120
is down, but it's not really the case. You know, the only thing that might actually happen is that

193
00:17:14,119 --> 00:17:19,079
there's a network partition. And so, both sides of the distributed system, you know, basically

194
00:17:19,079 --> 00:17:25,159
are keep on computing and maybe interact with, you know, clients, maybe even interact with the same

195
00:17:25,159 --> 00:17:28,759
set of clients because the clients can talk to do both parts, but, you know, the two-in-a-halfs

196
00:17:28,759 --> 00:17:35,399
cannot talk to each other. And so, this is a problem known as the split brain syndrome. And that,

197
00:17:35,399 --> 00:17:39,879
you know, makes, you know, designing the distributed system as a verticals with the systems that

198
00:17:39,960 --> 00:17:45,000
are complicated as we'll see. And so, there's really sort of deep intellectual problems here.

199
00:17:45,800 --> 00:17:52,440
And finally, sort of really aspect in terms of challenges is actually tricky to realize

200
00:17:53,480 --> 00:18:00,040
the performance benefits that in principle are possible with distributed systems.

201
00:18:05,480 --> 00:18:08,840
So, so far, it may actually be talking is like, you know, you want to increase the capacity or you

202
00:18:08,839 --> 00:18:12,679
want to run things forward in parallel, you buy more machines, you know, or you buy another data center.

203
00:18:13,799 --> 00:18:19,319
And, you know, of course, you know, only when the task is completely embarrassing parallel, does that

204
00:18:19,319 --> 00:18:23,879
work. And often in practice, others just not the case. And so, actually achieving that sort of

205
00:18:24,759 --> 00:18:31,480
high throughput and throughput scaling within the room machines turns out to be not straightforward at all.

206
00:18:31,799 --> 00:18:41,480
So, that brings me to sort of the next topic, like why you know, it takes 68 to 4, at least, you know.

207
00:18:50,440 --> 00:18:53,880
You know, so I think there's sort of four reasons. One, it's interesting.

208
00:18:53,880 --> 00:19:04,840
And it's a set like heart technical problems and with their powerful solutions. So, heart problems,

209
00:19:09,560 --> 00:19:14,200
but powerful solutions. We'll see, you know, those solutions through the term.

210
00:19:20,200 --> 00:19:22,280
Second reason is, no, they're used in the real world.

211
00:19:24,040 --> 00:19:33,000
And the norm of amount of appetite, you know, who people that actually understand and can build distributed systems.

212
00:19:33,800 --> 00:19:37,720
If you were a grad student or were an undergrad in thinking about research, you know, that's a great area.

213
00:19:37,720 --> 00:19:39,560
Because it's a very active area of research.

214
00:19:43,480 --> 00:19:50,280
There's still many open problems. And as we go through the semester, we know all, all, well, encounter them.

215
00:19:50,839 --> 00:19:54,839
So, it's a good area for research. And finally, you know, if you like building things,

216
00:19:55,480 --> 00:20:01,559
it's sort of a unique style of programming. And so, in case of 8 to 4, you're going to get hands-on

217
00:20:01,559 --> 00:20:09,720
experience with that by building, you know, distributed systems in the labs. And you'll discover that,

218
00:20:11,879 --> 00:20:17,399
one, it's hard to get them right. And, you know, it sort of builds up another skill,

219
00:20:17,400 --> 00:20:20,200
type of skill of programming that you might have not have done in the past.

220
00:20:23,560 --> 00:20:25,640
Let me pass for a second here and see if there are any questions.

221
00:20:27,640 --> 00:20:31,880
Also, feel free to post in the chat. I'll try to monitor chat if there are questions there,

222
00:20:31,880 --> 00:20:38,200
or, you know, raise your hand if you have any questions. And I'm sure the TAs will also be paying

223
00:20:38,200 --> 00:20:43,960
attention to the raising hands and the chat. So, in case I miss something, you know, they'll remind me.

224
00:20:44,440 --> 00:20:47,960
Any questions so far? I think it's crystal clear.

225
00:20:55,319 --> 00:20:58,600
I'll interpret the silences. Things are crystal clear.

226
00:21:01,079 --> 00:21:03,240
So, let me talk a little bit about the course structure.

227
00:21:04,840 --> 00:21:08,360
Now, after this sort of quick introduction to distributed systems.

228
00:21:14,440 --> 00:21:17,079
So, the course structure is as follows. We have lectures,

229
00:21:18,440 --> 00:21:21,640
like the one today, and basically focuses on big ideas.

230
00:21:25,000 --> 00:21:32,360
The lectures are typically driven by a paper that we all sign. And these papers are often a

231
00:21:32,360 --> 00:21:36,200
case study, you know, the particular big idea that we're covering in lecture.

232
00:21:36,200 --> 00:21:44,920
I can read the papers are all published or posted on the schedule page.

233
00:21:44,920 --> 00:21:50,920
And more for most papers, we ask you to answer a question as well as ask a question.

234
00:21:50,920 --> 00:21:56,120
And we'll try to cover those questions or answer them during the lecture.

235
00:21:56,120 --> 00:22:00,120
And so, it's important, you know, part of the reason we do that is because we'd like you to

236
00:22:00,120 --> 00:22:04,440
read the paper in advance of the lecture so that we can go a little bit deeper

237
00:22:05,320 --> 00:22:11,640
into these papers. So, I'm strongly encouraging you to read them in before class.

238
00:22:14,440 --> 00:22:19,480
So, another component of the class is the labs, the programming labs.

239
00:22:20,680 --> 00:22:27,559
There are four of them. They're split in parts, but the four major ones, one is the map

240
00:22:27,720 --> 00:22:33,720
reduced lab that we just posted today. And that's due next Friday. And where you build the

241
00:22:33,720 --> 00:22:40,200
basically your own map reduced library, as similar to the one that actually described in the paper.

242
00:22:41,480 --> 00:22:48,919
The second lab is a lab that focuses on replication in the presence of failures and

243
00:22:48,919 --> 00:22:56,279
in the partition networks. We're going to implement replication using a protocol that's called

244
00:22:56,359 --> 00:23:06,279
raft. And this is a lab that consists of multiple components, but at the end of it, you'll have a

245
00:23:06,279 --> 00:23:12,200
library that you can use to what's called, which is you can use to build replicated state machines,

246
00:23:12,200 --> 00:23:19,879
namely replicating a state machine or multiple machines so that if one of them goes down,

247
00:23:19,879 --> 00:23:25,559
one of those machines goes down that the service actually keeps running. And you're going to use that

248
00:23:25,559 --> 00:23:30,200
library to actually build a replicated service. And the fact you're going to build a replicated

249
00:23:31,720 --> 00:23:32,679
key value service.

250
00:23:40,679 --> 00:23:44,119
In lab three, so lab three is going to basically use multiple machines.

251
00:23:45,399 --> 00:23:48,119
For fault tolerance or for applications to build one service.

252
00:23:49,000 --> 00:23:53,319
Unfortunately, you know, as well, so you'll have more is that just replication decision,

253
00:23:53,319 --> 00:23:57,639
those should give you more performance, you know, because you can just machine actually have to

254
00:23:57,639 --> 00:24:04,679
perform the operating in a particular order. And so to actually get performance, what we're in lab four,

255
00:24:04,679 --> 00:24:08,039
you can build, you're going to be able to chart it key value service.

256
00:24:13,319 --> 00:24:19,159
And that basically consists of many instances of lab three running currently,

257
00:24:19,960 --> 00:24:25,480
and basically taking care of a part or a chart of the key value service. And so that you get

258
00:24:25,480 --> 00:24:30,120
parallelism. And so that you can actually use this to actually drive throughput.

259
00:24:31,880 --> 00:24:36,840
And furthermore, we're going to actually move keys or key value pair, one machine to another

260
00:24:36,840 --> 00:24:44,360
machine in response to one load changes. So the last piece, we last two, three and four

261
00:24:44,439 --> 00:24:49,639
build on top of each other. So if you have a bug in lab two, that might affect you actually in lab four.

262
00:24:51,079 --> 00:24:55,159
We provide test cases for all of them. So all the test cases are public.

263
00:25:03,079 --> 00:25:07,319
And we grade you on those test cases. So you submit your solution. We run the same tests on

264
00:25:07,319 --> 00:25:13,159
our computers and double check, you know, that you're passing the test. And if you pass all the tests,

265
00:25:13,160 --> 00:25:22,759
you get full score. Turns out, you know, these test cases are tricky. And we'll try to

266
00:25:22,759 --> 00:25:29,720
tickle all kinds of corners in your systems. And so it turns out they are actually reasonable

267
00:25:29,720 --> 00:25:35,880
hard to pass. And so, and they're tricky to debug. You might actually have in a particular corner

268
00:25:35,880 --> 00:25:40,759
case an error. And it may be very difficult to track down when this that happened, why does it

269
00:25:40,759 --> 00:25:45,559
happen? So you know how to fix it. And so my advice to you is to start to lab you early.

270
00:25:46,839 --> 00:25:50,039
It's often the case that, you know, if you just start the night or the two nights before,

271
00:25:51,160 --> 00:25:55,400
you're going to have difficulty passing all the tests because you're going to get stuck,

272
00:25:55,400 --> 00:26:00,519
you know, trying to debug one particular aspect and run out of time to basically get the other

273
00:26:00,519 --> 00:26:12,359
test cases to work. There's an optional project. So instead of doing lab four,

274
00:26:13,559 --> 00:26:18,359
you can do a project. And the idea of the project is that you can work together or collaborate

275
00:26:18,359 --> 00:26:25,240
with a group of two or three students and do a project year in year-old. And the projects are

276
00:26:25,240 --> 00:26:30,359
form or similar type systems that we read about in the papers. You propose one that you would

277
00:26:30,359 --> 00:26:37,639
like to build. We'll give you some feedback and we'll tell you, well, maybe you should just do lab four.

278
00:26:38,439 --> 00:26:42,839
But if you're excited about doing project, you know, we sort of like to stimulate that and you

279
00:26:42,839 --> 00:26:47,959
should start thinking now. And then hopefully we can have some discussion and settle on something that

280
00:26:47,959 --> 00:26:56,039
may not be cool to do. Okay, and finally, the one other component of the course is actually two

281
00:26:56,039 --> 00:27:04,680
exams. One roughly halfway the semester on one in the final week. And, you know, we expect

282
00:27:04,680 --> 00:27:10,920
your course to do all the labs, submit a read right homework questions for the papers and do the two

283
00:27:10,920 --> 00:27:19,000
exams. If you look at the web pages for 682A or 6824, you'll see exactly the balance in terms of

284
00:27:19,000 --> 00:27:25,399
grading for the different components. You know, the labs come for most. The two exams, I think are

285
00:27:25,400 --> 00:27:33,800
20 or 30% and then some class participation. But the details are on the web page. To get you through

286
00:27:33,800 --> 00:27:41,000
the semester and help you along, we have excellent course staff. We have four TAs.

287
00:27:41,800 --> 00:27:46,680
We're all in, we're running office hours and to help you basically, you know, get your labs. And

288
00:27:47,480 --> 00:27:52,920
let me do a quick round. Maybe the TAs can introduce themselves so they can at least know who they are.

289
00:27:53,880 --> 00:28:01,640
Lily, you want to go first? Sure. So, I'm Lily. I am a third year grad student in PIDAS and

290
00:28:01,640 --> 00:28:07,240
Franz is actually my advisor. So, I know just tell good to use a teaching so you're in for a treat.

291
00:28:08,519 --> 00:28:13,240
Yeah, I'm looking forward to working with you this semester. I'll pass it off to David.

292
00:28:15,640 --> 00:28:21,080
Hi, everyone. I'm David. I am a second semester student. I took 6824 last spring when it was like

293
00:28:21,079 --> 00:28:26,359
having person half remote. So, hopefully we can get the best of both worlds for the semester. I'm excited.

294
00:28:27,720 --> 00:28:34,759
Yeah, but Jose. Hi, Jose. I'm a four year grad student working on machine learning

295
00:28:34,759 --> 00:28:40,839
problems. I took this class my first year of the grad student and I really, really enjoyed it. So,

296
00:28:40,839 --> 00:28:48,519
yeah, looking forward to teaching it. So, yeah, I'm cell. I use data and pronouns. I'm first year

297
00:28:48,519 --> 00:28:54,119
master's student in PIDAS, like some of the others. And I took this class few years back.

298
00:28:54,119 --> 00:28:57,639
I had a great time taking it. So, I'm excited to help everyone learn it.

299
00:29:01,559 --> 00:29:06,839
Okay, thank you. So, there was a question in the chat. How is the system, how does the

300
00:29:06,839 --> 00:29:14,359
system where the lab run? Is the machine systems simulated? Yes, we're basically simulating

301
00:29:14,359 --> 00:29:18,439
many, many machines by running many, many different processes. In fact, the labs have

302
00:29:18,439 --> 00:29:25,959
an own RPC library that like pretend you're running on a separated physical machines,

303
00:29:25,959 --> 00:29:28,839
but in fact, you're running many, many processes on the same machine.

304
00:29:33,719 --> 00:29:38,199
Okay, any questions so far before I sort of continue into the direction of

305
00:29:38,200 --> 00:29:48,200
actualization technical content? Is the result of lab four? Is it similar to any existing

306
00:29:49,720 --> 00:29:55,559
programs that exist? Yeah, in fact, what do we be building? It has a lot of similarity to

307
00:29:55,559 --> 00:30:00,519
sort of popular key value services, you know, thing reddit or, you know, some of the other ones.

308
00:30:01,480 --> 00:30:05,559
You know, there will be differences after we'll discover when we grow through this semester,

309
00:30:06,200 --> 00:30:13,000
but the key value service is a pretty well-known and a common service inside of a data center

310
00:30:13,000 --> 00:30:17,799
area run by many companies and a couple very popular ones that use by lots of people.

311
00:30:18,359 --> 00:30:21,480
And they basically struggle with exactly the same issues as you were going to be struggling

312
00:30:21,480 --> 00:30:26,200
within the labs. We're going to build a one that actually has pretty strong semantics,

313
00:30:26,919 --> 00:30:29,960
sometimes a little bit stronger semantics than some people who are actually doing practice,

314
00:30:29,960 --> 00:30:33,480
and you know, we'll discuss why that why that happens too, but you guys are very close to

315
00:30:33,559 --> 00:30:37,799
when people are doing practice. Rapt is white, we'll use some practice for example.

316
00:30:42,279 --> 00:30:43,240
Any other questions?

317
00:30:49,319 --> 00:30:57,559
Yeah, it's a good question about the labs. Again, if we have a bug on lab two that maybe they'll

318
00:30:57,559 --> 00:31:06,279
even get caught by the testers somehow, do we get an answer for the following labs or do we

319
00:31:06,279 --> 00:31:10,759
just continue to use our code? You're going to continue using your code.

320
00:31:12,599 --> 00:31:16,359
We did our best, you know, through the labs and the testers, it's just as good as possible,

321
00:31:17,079 --> 00:31:20,440
but I'm sure there are cases that we, you know, it's hard to do a complete good job.

322
00:31:23,079 --> 00:31:27,000
But, you know, every time we discover something that we missed, we basically improve the tests.

323
00:31:27,559 --> 00:31:31,720
So, you're building, you know, once you pass the test, you know, we're optimistic that you actually

324
00:31:31,720 --> 00:31:36,119
have an implementation that actually can support the other use cases that we're doing the rest of the semester.

325
00:31:39,079 --> 00:31:42,919
It's not uncommon for people to rewrite their implementation once and twice.

326
00:31:43,799 --> 00:31:48,759
As you will see in lab two and lab three, you know, the structure, you know, you have to spend quite a

327
00:31:48,759 --> 00:31:54,519
bit of time thinking about the structure of your application or your library, and you know, as you

328
00:31:54,519 --> 00:32:00,440
sort of learn, you may want to go back and redo it. To help you along a little bit,

329
00:32:00,440 --> 00:32:03,400
this year we're doing something different that we've done in the past years.

330
00:32:03,400 --> 00:32:08,440
We're going to do around a couple of Q&A lectures where I'll share, we'll share our solutions

331
00:32:09,000 --> 00:32:14,440
with you or we'll walk through our solutions and hopefully that will, you know, tell you a little

332
00:32:14,440 --> 00:32:18,440
bit about, you know, you can learn from that and see how that contrasts with your own solution and

333
00:32:18,440 --> 00:32:21,319
maybe, you know, pick up some ideas for future labs.

334
00:32:25,160 --> 00:32:27,879
Any other questions?

335
00:32:34,759 --> 00:32:40,519
Okay. Again, interrupt me at any time. I'd like to make this more and more

336
00:32:40,519 --> 00:32:44,039
interact. We'll take a couple lectures, but hopefully we'll get there.

337
00:32:46,279 --> 00:32:53,799
Okay. I want to talk a little bit, you know, sort of set ourselves up for the case study from today.

338
00:32:54,599 --> 00:32:58,920
But before doing that, I want to talk a little bit about the perspective for the class.

339
00:32:58,920 --> 00:33:02,839
Our focus in the class is going to be on infrastructure. You can more or less can tell that from

340
00:33:02,839 --> 00:33:09,079
the labs that, you know, we're, we just discussed. So, you know, there's going to be somebody who's

341
00:33:09,079 --> 00:33:13,720
writing applications on these distributed systems and we're not really concerned too much

342
00:33:13,720 --> 00:33:18,359
with the applications at all. We're going to be mostly concerned with the infrastructure that

343
00:33:18,359 --> 00:33:22,759
supports these applications. And the infrastructure falls out in three different categories,

344
00:33:22,759 --> 00:33:28,519
where very broadly speaking storage, infrastructure, so like devaluing servers,

345
00:33:28,519 --> 00:33:31,720
or just file systems, not kind of thing, computation,

346
00:33:36,519 --> 00:33:41,079
you know, from frameworks to actually orchestrate or build a distributed application.

347
00:33:41,799 --> 00:33:45,960
And you know, the example is the classic example is map produce, and we'll talk about it in a

348
00:33:45,960 --> 00:33:49,319
second. And then that gets the first category is communication.

349
00:33:53,559 --> 00:33:58,519
And we'll spend less time on communication, and it's almost more topic of, you know, six, eight to

350
00:33:58,519 --> 00:34:03,559
nine network systems. But it will show up, you know, in the sense that there's going to be some

351
00:34:03,559 --> 00:34:08,679
contract, you know, between the network system and the distributed system. And I will,

352
00:34:09,800 --> 00:34:13,720
the serious topic, you know, for example, first day we're going to be talking about, we,

353
00:34:14,039 --> 00:34:21,480
we're more a procedure call, RPC, and that's like the building block in which all labs are built,

354
00:34:21,480 --> 00:34:26,839
and that's our communication model. And the questions there are, you know, what kind of semantics

355
00:34:26,839 --> 00:34:31,799
does actually the RPC system provide? You know, is it at most ones, exactly ones, at least ones,

356
00:34:32,359 --> 00:34:37,879
and we'll talk about that in first day's lecture. But that's where we're sort of communication

357
00:34:37,879 --> 00:34:43,480
and distributed systems, you know, intersect. So if you look at these three, so basically storage,

358
00:34:43,480 --> 00:34:49,480
you know, the store data for durably, you know, computation to run competitions and communication

359
00:34:49,480 --> 00:34:53,719
to actually have these different pieces communicate with each other. And so those are the three basic,

360
00:34:53,719 --> 00:34:58,039
you know, things that sort of from which we will build distributed systems. And what are we

361
00:34:58,039 --> 00:35:03,079
looking for are sort of abstractions that have been proven to be very helpful in building

362
00:35:03,079 --> 00:35:10,039
distributed systems? And abstractions are like the remote procedure call, or like a map-produced

363
00:35:10,039 --> 00:35:16,639
library, or in a storage system like a key value service. And often, you know, our

364
00:35:16,639 --> 00:35:21,960
funer goal will be to make the abstractions distributed abstraction look very much like, you know,

365
00:35:21,960 --> 00:35:26,679
the sort of normal standard sequential abstractions that you may familiar with. So, for example,

366
00:35:26,679 --> 00:35:31,239
when we build a storage system, we want our basically distributed storage system more or less

367
00:35:31,239 --> 00:35:37,880
behave like, you know, a single machine sequential storage server, like your regular file system on

368
00:35:37,880 --> 00:35:42,599
your laptop. Except, you know, that, you know, we hope that the storage system is more fall

369
00:35:42,599 --> 00:35:47,079
tolerance, you know, because may use replication, maybe much more high performance, because we use

370
00:35:47,079 --> 00:35:51,640
many, many machines, but like the behavior of the system that we're looking for is sort of similar

371
00:35:51,640 --> 00:35:56,680
with the abstractions we're looking for is similar to the single one. Turns out, in practice,

372
00:35:56,680 --> 00:36:00,760
this actually is very hard to achieve. And, you know, we'll see that, you know, it looks like it,

373
00:36:00,760 --> 00:36:07,720
but it's not exactly. And this is a topic that will show up multiple times. In fact, you know,

374
00:36:07,719 --> 00:36:16,519
that brings me to sort of like the main recurring themes in this class. We'll see over and over.

375
00:36:23,239 --> 00:36:32,919
And the main topics are fall dollars. Not surprising. And that has sort of two aspects,

376
00:36:33,880 --> 00:36:38,680
I have to say to define a little bit what fall tolerance means. One is availability.

377
00:36:39,800 --> 00:36:46,039
So we're going to be looking at techniques. We're going to be looking at techniques to

378
00:36:48,280 --> 00:36:54,760
make systems highly available. And so what we mean that is that they continue to deliver their

379
00:36:54,760 --> 00:36:59,880
service despite, you know, there are being failures. And so this is often expressed as like a number of

380
00:36:59,880 --> 00:37:07,559
nice, you know, 0.9999 reliability. And so that's going to be one aspect of fall tones. The second

381
00:37:07,559 --> 00:37:11,480
aspect of the fall tones that we care a lot about is what I'm going to call recovery ability.

382
00:37:17,800 --> 00:37:25,640
And when a machine crashes or fails, we like to bring it back into the system once it reboots,

383
00:37:25,639 --> 00:37:29,559
you know, so that we can keep up the availability because we didn't like repair the system.

384
00:37:29,559 --> 00:37:33,879
And basically all the machines would die one by one until we have zero machines. And then we

385
00:37:33,879 --> 00:37:38,759
have no service anymore. So it's important that we repair the distributed system. The way we repair

386
00:37:38,759 --> 00:37:42,359
the distributed system is basically when the machine comes back up, you know, we want to

387
00:37:43,079 --> 00:37:47,000
it needs to recover its state and then you know, start participating back into the distributed

388
00:37:47,000 --> 00:37:54,440
systems. And it turns out that is actually heart, that's a hard aspect. And a key techniques,

389
00:37:54,440 --> 00:38:01,480
you know, for availability is going to be a replication. And the key technique we're

390
00:38:02,039 --> 00:38:07,320
that we're going to use for recoverability is basically something called logging or transactions.

391
00:38:09,320 --> 00:38:15,639
Writing things through durable storage. So that may or one, the power goes out, but the machine

392
00:38:15,639 --> 00:38:21,559
comes back up afterwards, you know, we're half the data still there on disk.

393
00:38:24,679 --> 00:38:33,480
So that's the fault-tauld site. The second part is, you know, something we're going to call consistency.

394
00:38:38,840 --> 00:38:46,679
And this is basically the contract, you know, that the server is going to provide or for operations

395
00:38:46,679 --> 00:38:52,279
with respect to concurrency and failure. And so, loosely speaking, you know, what we

396
00:38:54,119 --> 00:39:01,960
when we think about consistency, basically the ideal is the same behavior as that a single machine

397
00:39:01,960 --> 00:39:06,119
would deliver. So we have a replicated fault tolerance high-performance file system,

398
00:39:06,119 --> 00:39:10,199
considering many machines. We like to behave it to be, I'm almost identical to the sequential

399
00:39:10,199 --> 00:39:16,359
machine. And so the key question always here is sort of on the forum, let's say we have a key

400
00:39:16,360 --> 00:39:26,280
value server, you know, does to get operation, return value of the last put.

401
00:39:34,280 --> 00:39:38,599
And if you run a single machine, you have nothing, you know, concurrent operations. So you run

402
00:39:38,599 --> 00:39:44,120
every operation one by one, like you do, put, put, put, then get, then again, then again. Then of course,

403
00:39:44,599 --> 00:39:49,239
this is a discussion of terminal to answer, you would assume that the return value is stored

404
00:39:49,239 --> 00:39:55,639
by the last put. But once we have concurrency and we failures and we have many machines, this is

405
00:39:55,639 --> 00:40:02,920
actually not so obvious. You know, what the right way, what the what a good contract is. And we'll see

406
00:40:02,920 --> 00:40:07,719
actually many different contracts. We see ones that have strong consistency, you know, the

407
00:40:07,719 --> 00:40:13,799
almost behave like a sequential machine or ones that have a very loose guarantees

408
00:40:17,239 --> 00:40:22,199
and provide very different semantics, for example, they provide eventual consistency. Eventually,

409
00:40:22,199 --> 00:40:29,879
you will see a get will return the result of a put, but not immediately. And the reason

410
00:40:30,599 --> 00:40:34,679
there are sort of different types of consistency that's directly related with performance.

411
00:40:37,719 --> 00:40:41,879
You know, often one of the goals of the civil system is to deliver high performance, you know,

412
00:40:41,879 --> 00:40:48,679
scale example within number of machines. And you know, to achieve that performance, that's sort of

413
00:40:48,679 --> 00:40:54,599
almost in conflict with, you know, consistency and fault tolerance. You know, to actually achieve

414
00:40:54,599 --> 00:40:59,159
strong consistency requires communication between the different machines, which might actually

415
00:40:59,159 --> 00:41:04,039
reduce performance. Similarly, you know, to achieve fault tones, you know, we need to replicate

416
00:41:04,039 --> 00:41:08,759
data. That means we have to communicate data from one machine to another machine. And if we

417
00:41:08,759 --> 00:41:13,320
were, I have to write that machine data also to durable storage, you know, that X-bit operation is

418
00:41:13,320 --> 00:41:20,920
expensive. And so the replication can cost the performance. And so, uh, achieving these sort of free

419
00:41:20,920 --> 00:41:25,639
things at the same time, uh, it turns out to be extremely difficult. And in fact, what people do

420
00:41:25,639 --> 00:41:29,800
in practice is they make different trade-offs, you know, they will sacrifice some consistency to get

421
00:41:29,800 --> 00:41:33,639
better performance, or maybe some fault tolerance to get better performance. And so we'll see,

422
00:41:34,039 --> 00:41:39,880
throughout the semester, a wide spectrum of different types of designs that, you know, make that

423
00:41:39,880 --> 00:41:47,480
trade-off differently. Just a small note of performance, there's two aspects to it, like one

424
00:41:48,039 --> 00:41:56,039
is throughput. So you buy more machines, hopefully the throughput scales with the number of machines.

425
00:41:56,599 --> 00:42:01,400
But there's another sort of part of aspect performance is basically much harder to achieve,

426
00:42:01,480 --> 00:42:08,280
which is like low latency. And this is particularly important, like in these websites, where you have

427
00:42:08,280 --> 00:42:12,760
thousands of thousands of machines, and, you know, maybe one user request, you know, when you click on

428
00:42:12,760 --> 00:42:17,880
a URL, actually costs a lot of these machines to participate. And if one of those machines is very

429
00:42:17,880 --> 00:42:22,680
slow, you know, maybe it has, you know, some mechanical issues, or maybe the disk is not working

430
00:42:22,680 --> 00:42:31,160
100% or some other aspect where it doesn't really work well. That one slow machine can cost the

431
00:42:31,159 --> 00:42:39,000
whole user experience to be slow. And this is often referred to as 10 latency. And there's a concern

432
00:42:39,000 --> 00:42:44,519
that we'll show up over and over, you know, throughout the semester, as we were discussing different

433
00:42:44,519 --> 00:42:51,399
machines, and even shows up in the today's paper, in the MapReduce beta. So one other final topic that

434
00:42:51,400 --> 00:42:57,800
will show up a lot, at least in the class, particularly in the lab, is implementation

435
00:43:02,039 --> 00:43:07,639
aspects. And here is really like how to manage, you know, concurrency, how to do remote procedure

436
00:43:07,639 --> 00:43:13,880
calling, implementation, and just building the systems by themselves, going to have actually

437
00:43:13,880 --> 00:43:17,880
serious implementation challenges, and that will come over and over and over and over, and have

438
00:43:17,960 --> 00:43:22,280
through that to semester. And that partly is because you know, we want to achieve performance

439
00:43:22,280 --> 00:43:27,480
consistency in fault holes in the crashes, crashes, and concurrency, which just makes, you know, just

440
00:43:27,480 --> 00:43:37,320
drives complexity. So those are the main topics. Any questions about the spark?

441
00:43:37,800 --> 00:43:53,000
Okay, then let's sort of dive in and look at the first case study, and through the MapReduce paper.

442
00:43:53,000 --> 00:44:08,760
And there's an illustration of many of the topics in 6.8 to 4, you know, we're going to be talking

443
00:44:08,760 --> 00:44:14,199
about fault tolerance, we're going to talk about performance, tail latency, all kinds of issues

444
00:44:14,199 --> 00:44:19,159
that actually we see throughout the semester, and we'll see one cut or one system that deals with that.

445
00:44:20,039 --> 00:44:23,480
So good illustration of many of the topics.

446
00:44:28,519 --> 00:44:30,119
The paper is also very influential.

447
00:44:35,639 --> 00:44:40,199
Although Google internally doesn't use MapReduce, you know, just write this paper exactly,

448
00:44:40,199 --> 00:44:44,759
you know, they have systems directly derived, you know, from this MapReduce system,

449
00:44:44,840 --> 00:44:51,640
that they are still using day to day. There are other libraries that look a lot like MapReduce,

450
00:44:52,200 --> 00:44:57,000
that they are widely used. It also inspired different types of computation models

451
00:44:57,720 --> 00:45:02,760
than MapReduce itself, and we'll see you want to do more later in this semester. So

452
00:45:02,760 --> 00:45:09,320
hugely influential paper. And then finally, you know, there's actually the topic of Lab1,

453
00:45:09,320 --> 00:45:14,360
which is another good reason to talk about it. Now many probably have, you have seen

454
00:45:14,840 --> 00:45:19,720
the MapReduce paper show up in 633, if you're an undergrad, you're an MIT,

455
00:45:20,680 --> 00:45:26,440
otherwise you might have seen it in other places. But we're going to go a little bit deeper

456
00:45:27,480 --> 00:45:31,560
than, for example, 633, because you actually have to implement your own MapReduce library.

457
00:45:33,240 --> 00:45:39,160
As always, when you implement something, you know, problems that you might not have really

458
00:45:39,159 --> 00:45:44,440
fought hard about before, you know, certainly start popping up. And so by the end of it,

459
00:45:44,440 --> 00:45:50,920
you really understand MapReduce. Any questions?

460
00:45:50,920 --> 00:46:10,119
Let me give you a little bit of context for this paper. This paper is written by, you know,

461
00:46:10,119 --> 00:46:20,280
two engineers from Google, very well known. And the context is sort of these early data centers.

462
00:46:20,280 --> 00:46:27,720
So Google has a search engine needed to build a reverse index of the word white web,

463
00:46:27,720 --> 00:46:34,120
you know, to basically allow users to query the internet. And these, these kind of computations,

464
00:46:34,120 --> 00:46:45,160
you know, take multi hours to run. And they, you know, process terabyte of data.

465
00:46:45,239 --> 00:46:50,759
Okay, our computations,

466
00:46:55,480 --> 00:47:02,440
terabyte of data, terabytes of data. And so thank you, thank you,

467
00:47:02,440 --> 00:47:09,879
Web Indexing, Web Crawling, others, particularly Web Indexing. This is one of the driving application.

468
00:47:10,840 --> 00:47:17,320
And you know, as Google built these sort of applications internally, you know, like SunJay and

469
00:47:17,320 --> 00:47:21,800
JetDing, you know, the two offers, you know, they were very good at that kind of stuff. But they've

470
00:47:21,800 --> 00:47:27,079
discovered that basically where many other Google engineers, you know, one of the right those kind

471
00:47:27,079 --> 00:47:31,400
of certain types of applications too, they wanted to be able to write their own data analysis

472
00:47:31,400 --> 00:47:37,400
over all the web pages that have been crawled. And so, and they realized, you know,

473
00:47:37,400 --> 00:47:41,160
they're writing these kinds of applications. It was difficult because if you're running

474
00:47:41,160 --> 00:47:45,800
multi-hour computation in many, many machines, it is very likely that one of those machines will

475
00:47:45,800 --> 00:47:50,599
crash during that computation. And therefore, you know, you have to build in some plant

476
00:47:50,599 --> 00:47:55,480
fault tolerance. And, you know, once you start doing that, then basically requires that you're

477
00:47:55,480 --> 00:48:00,440
basically, you know, have taken something like 6824 and able to build, you know, these kinds of

478
00:48:00,440 --> 00:48:05,240
complicated systems. And their goal was to basically get out of that sort of

479
00:48:05,239 --> 00:48:11,719
dilemma and make it basically easy for non-experts

480
00:48:17,879 --> 00:48:27,719
to write the simple applications. And so, that's the motivation for this paper and why you're

481
00:48:28,359 --> 00:48:36,199
very excited about it. And so, the approach they take that produce takes is, it is not a general

482
00:48:36,199 --> 00:48:42,199
purpose library. You know, you can't like write, take any application and use map reduced through

483
00:48:42,199 --> 00:48:47,959
actually make it basically fault-collar. And so, it has to be written in a particular style name

484
00:48:47,959 --> 00:48:52,759
and using these map functions and reduce functions. And those functions are basically functional

485
00:48:53,400 --> 00:49:01,320
or stateless. And the program will write these scripts, sequential code.

486
00:49:06,280 --> 00:49:09,320
And enhance, you know, these two functions, you know, to map into reduced function,

487
00:49:09,320 --> 00:49:14,520
two sort of the framework and then the framework to map reduced framework deals with all the

488
00:49:14,840 --> 00:49:27,960
distributedness. So, it will arrange that, you know, the application, the

489
00:49:27,960 --> 00:49:31,719
binary for the programs, they run on many machines or install the many machines,

490
00:49:31,719 --> 00:49:36,360
runs on many machines, it deals with load balancing, it deals with certain machines that are slow,

491
00:49:37,159 --> 00:49:40,679
it will deal with the machines that crash. And so, the application writer itself,

492
00:49:40,839 --> 00:49:44,679
who wrote the map reduced function, don't really have to be concerned about this at all.

493
00:49:45,639 --> 00:49:51,719
And they basically get all that stuff, if you will, transparently. And again, to make that happen,

494
00:49:51,719 --> 00:49:55,639
you know, the library is actually not in general purpose. So, for example, if you wanted to write a

495
00:49:55,639 --> 00:49:59,480
key value service, you couldn't use the map reduced library because it assumes a particular

496
00:49:59,480 --> 00:50:04,199
computational model and, you know, your application has to fit in that. In the computational model,

497
00:50:04,199 --> 00:50:08,919
you know, it fits, it's something that they saw a lot in Google, which is like people wanted to do

498
00:50:09,720 --> 00:50:13,240
big data analysis on basically, you know, all the web pages in the world.

499
00:50:13,960 --> 00:50:17,880
And there are many types of computations that just have to process lots and lots of data

500
00:50:17,880 --> 00:50:23,079
and compute values based on that data. So, that's sort of the type of applications that

501
00:50:23,880 --> 00:50:37,239
that we've introduced targets. Any questions about the sort of context and the motivation for this paper?

502
00:50:41,799 --> 00:50:49,639
Okay, let me proceed. So, let me first draw sort of an abstract view of what's going on.

503
00:50:53,639 --> 00:51:03,239
And then we'll dive into more detail. So, sort of view that you sort of need to have in the background

504
00:51:05,880 --> 00:51:09,400
to understand actually how the app reduced works, which is going to be very important for you when

505
00:51:09,400 --> 00:51:16,599
you're doing the lab one, is there's a bunch of input files, you know, whatever. F1, F2, F3, let's say.

506
00:51:17,159 --> 00:51:21,480
Of course, they're going to be many, many more in Google's case, but just for pedagogical reasons,

507
00:51:21,480 --> 00:51:28,440
can are going to decide the size of my display. I'm going to have three files.

508
00:51:30,519 --> 00:51:37,960
Basically, for every file, this process by map function. So, one written by the programmer,

509
00:51:38,679 --> 00:51:43,960
and you know, produces some output, some intermediate output. So, for example, the classic example,

510
00:51:43,960 --> 00:51:50,760
to discuss map-producers' work out. So, basically counting how many times award occurs in

511
00:51:51,639 --> 00:51:56,760
the data sets, where the data sets consist of many, many, many files. So, for example, like, you know,

512
00:51:56,760 --> 00:52:02,920
we're running the word count function on file one, and it will produce for every word

513
00:52:03,960 --> 00:52:09,240
and a key value pair. And the key value pair consists of the key, which is the word,

514
00:52:09,240 --> 00:52:15,719
in account with one. And if you can add multiple times in this file, F1, then you know,

515
00:52:15,719 --> 00:52:19,639
it would be multiple and record from that multiple key value pairs, A1.

516
00:52:21,880 --> 00:52:27,079
And so, maybe, you know, this file contains none of many words, you know, maybe has A1 and B1.

517
00:52:27,079 --> 00:52:32,360
So, the file contains two words. You know, similarly, you know, the function, the map function

518
00:52:32,360 --> 00:52:37,240
for does the same thing for the file F2, and will produce some key values. And let's say, maybe

519
00:52:37,240 --> 00:52:46,039
there's only the word B appears in the file once. And maybe, you know, F3, the map function

520
00:52:46,119 --> 00:52:52,759
also runs in the file F3. And let's assume, let's just, we're, the, where is this, assume that A shows

521
00:52:52,759 --> 00:52:59,559
up once, and you're going to the word C shows up once. So, basically, you know, these map functions,

522
00:52:59,559 --> 00:53:04,039
all run in parallel, completely independent of each other. There's like no communication between

523
00:53:04,039 --> 00:53:08,440
them on their input files. And so, this is going to give us, you know, hopefully high throughput,

524
00:53:08,440 --> 00:53:11,800
or, you know, all of us are scaled to much, much, much, much, much from bigger data sets.

525
00:53:12,519 --> 00:53:16,760
And then, produce on these intermediate values, these key value pairs, we're not going to

526
00:53:16,760 --> 00:53:23,560
like A1, B1, you know, B1 alone, or A1, SC2. And then, sort of the second step, you know, this

527
00:53:23,560 --> 00:53:27,960
often referred to as the shovel, is that basically, you know, you're going to run the reduce

528
00:53:28,760 --> 00:53:35,560
functions on basically each row. So, here we got the row of all the A's, and we're going to run

529
00:53:36,519 --> 00:53:44,519
a reduce function. And then, the reduce function basically takes, you know, the one key aggregates all

530
00:53:44,519 --> 00:53:50,039
the, or the reduce function gets its input, the key plus the aggregated values, or not the aggregated

531
00:53:50,039 --> 00:53:55,880
value, but the, the, the combined values, you know, from the different outputs of maps. So, in this

532
00:53:55,880 --> 00:54:01,639
case, the reduce function would get, you know, two intermediate results, you know, both A,

533
00:54:01,719 --> 00:54:06,759
with the key A and two values, one and one. And in this case, in the case of a work count,

534
00:54:06,759 --> 00:54:12,279
you know, we just add them up. And so, you know, if we produce the value, you know, key value pair A2.

535
00:54:13,319 --> 00:54:17,400
And we're doing it basically, we're doing, and basically what we're doing is we're doing,

536
00:54:17,400 --> 00:54:21,000
we're doing, we're, we're, we're going to run the reduce for every, you know, row.

537
00:54:22,519 --> 00:54:27,719
And so, this will produce, you know, whatever, B2, and then, simply, you know, and you know,

538
00:54:27,719 --> 00:54:34,039
C1 for the last one. And again, you know, the, once we've done sort of the shovel, you know,

539
00:54:34,039 --> 00:54:38,039
these reduce functions can totally run independently of each other. Now, they can just, you know,

540
00:54:38,039 --> 00:54:43,959
process, you know, whatever row they, day to day had, and be done with it. And so, the only sort of

541
00:54:43,959 --> 00:54:51,079
really expensive, you know, piece in this is, is this shovel in the middle, where the reduce functions

542
00:54:51,079 --> 00:54:59,799
need to obtain, you know, their inputs for basically every mapper. So, when all the mappers are done,

543
00:54:59,799 --> 00:55:07,799
you know, the reduce function basically gets, you know, needs to contact every mapper, extract,

544
00:55:07,799 --> 00:55:14,599
you know, the output for, output for the mapper, without particular reduce function, and, you know,

545
00:55:14,599 --> 00:55:19,480
sort, you know, by T, and then, you know, basically run the reduce function. And so, basically,

546
00:55:19,480 --> 00:55:25,240
we're sort of assuming, but the paper sort of points out, expensive operation is really that

547
00:55:25,240 --> 00:55:33,320
shuffling of data between the mappers and the reduces. Any questions about this abstract picture?

548
00:55:38,840 --> 00:55:48,199
Okay. Sorry. I had a question. So, is there, I know that not all problems can be expressed

549
00:55:48,199 --> 00:55:56,919
with a, in MapReduce stage, but is, for example, like sorting an array, is it possible to do?

550
00:55:56,919 --> 00:56:01,399
Yeah. So, yeah. So, sorting is one of the applications that they, a town to lot actually, the paper,

551
00:56:01,960 --> 00:56:07,319
and it would be something that's totally done with MapReduce. So, basically, you split the input files,

552
00:56:07,319 --> 00:56:15,960
correct, and many things, the mappers sort their piece, and then they split the output, say, like,

553
00:56:16,039 --> 00:56:20,519
R buckets, and then, it's reduced functions, you know, basically sorts that particular R bucket,

554
00:56:21,320 --> 00:56:22,840
and that gives a total sorted file.

555
00:56:25,800 --> 00:56:31,159
Easy of that. And in this case, you know, in sort this interesting, because, basically, the input,

556
00:56:31,880 --> 00:56:38,039
the intermediate values, and the output are the same size. I can some other functions, like,

557
00:56:38,039 --> 00:56:43,800
maybe the map function will reduce the intermediate state to something much smaller than the input size.

558
00:56:44,440 --> 00:56:47,000
In the case of short, that is not the case.

559
00:56:49,720 --> 00:56:53,720
Okay, now let's look at the paper, actually, and get a little bit of sense, actually, how you write them.

560
00:56:58,200 --> 00:57:00,039
Now, let's see if I can actually,

561
00:57:02,920 --> 00:57:03,800
let's just ignore.

562
00:57:06,840 --> 00:57:09,960
Last menu, let's hold it one second.

563
00:57:14,039 --> 00:57:15,000
Okay.

564
00:57:21,000 --> 00:57:26,840
There's not so cool. Give me a second too. Ah, here we go.

565
00:57:26,840 --> 00:57:29,000
And there's a save.

566
00:57:29,000 --> 00:57:31,480
Okay, here we go.

567
00:57:31,480 --> 00:57:32,680
Let's go right here.

568
00:57:35,320 --> 00:57:37,160
Okay, can everybody see this?

569
00:57:37,319 --> 00:57:42,759
Okay, there's a couple questions.

570
00:57:45,879 --> 00:57:49,960
Let me you postpone some of these questions, because I will see them in,

571
00:57:49,960 --> 00:57:51,799
and we'll discuss them in a second in more detail.

572
00:57:53,000 --> 00:57:56,359
If I don't answer your question, please ask it again.

573
00:57:56,920 --> 00:58:00,039
So the first thing I want to do is actually look at one of the examples in the paper

574
00:58:00,039 --> 00:58:05,319
of a map and a reduced function corresponding to the word count example that we just sort of abstractly discussed.

575
00:58:06,039 --> 00:58:09,800
So here's the code for the map and a reduced function.

576
00:58:10,680 --> 00:58:14,200
You see that the map function takes a key value.

577
00:58:14,760 --> 00:58:16,600
The key is really not that important here.

578
00:58:16,600 --> 00:58:22,440
It's the document name, so f1 or f2, and string, the value is basically the content of the file.

579
00:58:23,240 --> 00:58:26,840
So all the words that actually appear in the file f1.

580
00:58:27,480 --> 00:58:31,800
And then basically it goes through, you know, the speed piece code goes through the

581
00:58:31,800 --> 00:58:38,840
words in the file, and as an intermediate value admits, you know, these A1, B1, C1, etc.

582
00:58:39,560 --> 00:58:42,360
But like for the programmer point of view, you're correct, you don't really see these

583
00:58:42,360 --> 00:58:44,519
intermediate key value pairs at all.

584
00:58:45,320 --> 00:58:47,480
You just write this one simple map function.

585
00:58:48,920 --> 00:58:52,680
And then the reduced function is also more or less as expected.

586
00:58:53,960 --> 00:58:59,320
It takes two arguments, you know, the key, you're like A, and values, in this case,

587
00:58:59,320 --> 00:59:03,480
we're a word count that would be 1111, so the number of times that the word A actually

588
00:59:04,280 --> 00:59:06,280
showed up in the intermediate output.

589
00:59:06,840 --> 00:59:11,640
And basically what the function does, it just, you know, goes over the iterates over the list

590
00:59:11,640 --> 00:59:17,160
of values, and then basically adds 1 plus 1 plus 1 plus 1, and then the midst, you know, the final result.

591
00:59:18,920 --> 00:59:23,320
And so that's basically, you know, as you can see from this code, right, like the programmer,

592
00:59:23,320 --> 00:59:27,559
basically always writes, you know, complete, straightforward sequential code.

593
00:59:27,559 --> 00:59:32,360
Now this application is, you know, very simple admittedly, but you know, the code for even more

594
00:59:32,360 --> 00:59:36,519
complex application would also be straight, you know, sequential might be more code, but it would be

595
00:59:36,519 --> 00:59:40,759
straightforward sequential code. And in this code, the programmer doesn't really worry about the

596
00:59:40,759 --> 00:59:45,159
fact that at all that machines might crash, you know, they might unloading balance. That's just

597
00:59:45,159 --> 00:59:50,599
basically all taken care of the map reduced library. So this is, and so, you know, the hope,

598
00:59:50,599 --> 00:59:54,519
and I think this has been proven out to be true, is this actually made both lots and lots of

599
00:59:54,519 --> 00:59:59,960
people to write, you know, distributed applications and process gigantic data sets that are like,

600
00:59:59,960 --> 01:00:04,599
could no way fit on a single machine. Like, damn it, the whole world, like, well,

601
01:00:07,159 --> 01:00:12,360
that does not make sense in terms of, you know, what the programmer actually sees.

602
01:00:15,719 --> 01:00:18,280
Okay, let's talk a little bit about the implementation.

603
01:00:18,440 --> 01:00:24,920
So I'm using the diagram here from the paper.

604
01:00:28,360 --> 01:00:34,200
So we've got the user program. So the user program is like the map in the reduced function that we

605
01:00:34,200 --> 01:00:42,760
just saw. You submit the map in the reduced function to the, you link it with the map reduced

606
01:00:42,760 --> 01:00:50,200
library and that forms a binary. And then you give this to the Google drop scheduler and it will

607
01:00:50,200 --> 01:00:57,160
basically find a whole bunch of machines and run what they call workers there. So like, you know,

608
01:00:57,160 --> 01:01:02,520
you're the scheduler will, for example, in the evaluation, as we'll see in a second, you know,

609
01:01:02,520 --> 01:01:07,400
there are about like 1800 machines on these 1800 machines, you know, the scheduler will run a

610
01:01:07,400 --> 01:01:13,720
worker process that actually does the actual work and invokes, you know, map and the reduced functions

611
01:01:14,280 --> 01:01:21,160
when appropriate. There's one other process that is important in the paper to call the master

612
01:01:21,160 --> 01:01:27,400
process in the lab, we'll call it the coordinator. And the coordinator begs orchestrates the workers

613
01:01:27,400 --> 01:01:36,680
and hands jobs or maps, yaks to them. So like, the terminology here is that a complete application is

614
01:01:36,679 --> 01:01:45,000
one job, a map reduced job, and then a reduced ineffication of reduce or ineffication of map is what

615
01:01:45,000 --> 01:01:54,039
is called the task. And so, you know, basically, you get the coordinator will assign files to

616
01:01:54,839 --> 01:01:58,599
particular workers and the worker will then invoke the map function on that particular

617
01:02:00,199 --> 01:02:04,759
file and that will produce some intermediate results. You know, you're the intermediate results and

618
01:02:04,760 --> 01:02:11,240
those intermediate results are stored on the local disk of the machine that actually runs that

619
01:02:11,240 --> 01:02:17,720
particular map function. And when, you know, a worker has run the complete to the particular map

620
01:02:17,720 --> 01:02:23,400
function, it basically tells the master, I'm done with that map function and, you know,

621
01:02:24,440 --> 01:02:31,480
tells the master where the intermediate results are. Then at some point, when all the sort of maps

622
01:02:31,960 --> 01:02:37,559
basically done, you know, the coordinator will start running reduced functions and the reduced

623
01:02:37,559 --> 01:02:42,280
functions will collect, you know, the intermediate results, you know, from the different map push,

624
01:02:42,280 --> 01:02:46,599
from the locations that are specified in the sort of the result record,

625
01:02:48,280 --> 01:02:52,039
retrieved that data sorted by key, and then basically reduce,

626
01:02:52,760 --> 01:02:57,480
invoke the reduced function on every key and list of values.

627
01:02:57,639 --> 01:03:02,760
And that, you know, produces an output file and that is the, you know, there's going to be one

628
01:03:02,760 --> 01:03:07,159
output file for reduced function. And, you know, you can aggregate, you know, these output files

629
01:03:07,159 --> 01:03:12,599
are going to calculate the output files to get the final output. That's sort of the structure.

630
01:03:13,240 --> 01:03:19,079
The input files live in a global file system, that's called GFS, although it will use

631
01:03:19,079 --> 01:03:24,760
a different global file system now, but, you know, the paper uses GFS and we'll actually read about GFS

632
01:03:24,760 --> 01:03:30,920
next week. And the output files also go into GFS. The intermediate files don't are not stored in

633
01:03:30,920 --> 01:03:41,080
GFS, they're stored on the local machines, where the work is run. Any questions about the sort of

634
01:03:41,080 --> 01:03:49,240
rough scheduled implementation? I have a question about the process file for the remote read.

635
01:03:49,239 --> 01:03:55,239
So in the remote read process is the file actually transferred to the reducer?

636
01:03:55,239 --> 01:04:02,599
Yes. So the, exactly. So the intermediate results are produced or stored on the disk of a

637
01:04:03,719 --> 01:04:10,519
machine that run the map, or that map function, and then the reduce goes out and basically fetches

638
01:04:10,519 --> 01:04:17,000
its, you know, set of keys from every map. And so that point, you know, the data is transferred

639
01:04:17,000 --> 01:04:20,519
across the network. So the network communication that happens is here.

640
01:04:25,000 --> 01:04:29,000
The reason that there's little network communication, no network communication here at all,

641
01:04:29,000 --> 01:04:37,480
is because the workers, the way the coordinator assigns files to workers is that basically

642
01:04:38,679 --> 01:04:44,519
the worker is run on the same machine. So every machine runs both of them, a worker process,

643
01:04:44,519 --> 01:04:50,679
and a GFS process. And the workers are basically assigned to, or the map functions run on the

644
01:04:51,880 --> 01:04:56,599
machine that actually has that file locally stored in GFS. And so basically this actually

645
01:04:56,599 --> 01:05:02,920
corresponds to basically local reach, you know, through GFS to a local disk. And then the files are

646
01:05:02,920 --> 01:05:08,280
produced or mapped, you know, produced into the intermediate files are stored on local disk too.

647
01:05:08,280 --> 01:05:11,159
So there's no communication happening in this sort of this part of the picture.

648
01:05:11,480 --> 01:05:17,000
And then when the reduce functions run, they actually retrieve the files across the network and then

649
01:05:17,000 --> 01:05:23,960
write it out in GFS. And there's going to maybe some network communication here when the workers

650
01:05:23,960 --> 01:05:33,319
actually produce the files in the global file system. I have another question. Is the, is the

651
01:05:33,320 --> 01:05:43,640
coordinator responsible for partitioning the data and putting it on each worker or

652
01:05:44,360 --> 01:05:49,960
another machine? No, not really. The, basically, the, the map produced one, you run the user

653
01:05:49,960 --> 01:05:55,640
program, you're basically saying like, and I want to run it on F1, F2, F3, F4, whatever, all the input

654
01:05:55,640 --> 01:06:03,080
files. And those input files live in GFS. And so the, part of the job specification,

655
01:06:03,079 --> 01:06:08,039
users say like which part input files need to be processed? Okay.

656
01:06:13,719 --> 01:06:23,960
Sorry, how does the sorting work does like, who does this sorting in? How does the map

657
01:06:23,960 --> 01:06:28,759
reduce library does a little bit of sorting before it hens it off to the map reduce, to the

658
01:06:28,760 --> 01:06:32,920
reduce function? So for example, the intermediate results might have like, you know, basically,

659
01:06:32,920 --> 01:06:39,160
maybe all the intermediate results for a key, A, B, and C go to one worker. And you know, there,

660
01:06:40,200 --> 01:06:47,480
there's just a whole bunch of key value pairs like A1, you know, B1, you know, whatever,

661
01:06:48,120 --> 01:06:54,760
A1 again, you know, C1, whatever. And basically what the map reduced library does,

662
01:06:54,760 --> 01:06:59,080
it sorts it first by key. So it first all the A's together, and then all the B's together,

663
01:06:59,080 --> 01:07:03,400
and then all the C's together. And then basically concatenates all the values from

664
01:07:03,400 --> 01:07:09,160
watching will keep and hens that off to the reduced function. Thank you.

665
01:07:17,880 --> 01:07:23,560
Okay, so I want to talk a little bit about fault downloads now. And sort of go back to

666
01:07:24,840 --> 01:07:26,760
the

667
01:07:32,840 --> 01:07:39,160
Can I ask a question about the map reduced paper real quick? Yeah, fun. So is the larger idea that

668
01:07:39,800 --> 01:07:46,840
a lot of functional programming could be reduced to the map reduced problem? Yes. Okay.

669
01:07:47,400 --> 01:07:52,440
So the name hinted at that, right?

670
01:07:52,440 --> 01:07:56,200
So basically there are two, you know, the notion of the map introduced function is something very

671
01:07:56,200 --> 01:08:01,559
common in functional programming languages. And use widely functional programming languages,

672
01:08:01,559 --> 01:08:06,440
where any sort of functional programming style. And so they basically, you know, that's where the

673
01:08:06,440 --> 01:08:14,200
inspiration came from. Okay. So actually, there's a good segment to fault tolerance.

674
01:08:14,599 --> 01:08:24,519
Because the idea is that, you know, if a worker fails, then the coordinators are in charge of

675
01:08:24,519 --> 01:08:30,920
noticing that the worker fails and basically restarts that task. And so the coordinator

676
01:08:31,000 --> 01:08:43,880
is a worker. Rearons map and reduce functions. Of course, the coordinator itself doesn't

677
01:08:43,880 --> 01:08:47,640
rerun them, but basically it coordinated the sites, you know, that particular map function

678
01:08:47,640 --> 01:08:53,159
needs to be run again, because it appears to the coordinator that machine that it handed,

679
01:08:54,520 --> 01:08:59,560
the task to actually is not responding. And so the typical thing is like, you know, if a machine

680
01:08:59,560 --> 01:09:03,080
doesn't respond to some certain amount of time, the coordinators are going to assume that machine

681
01:09:03,080 --> 01:09:13,800
crashed. And so, and that, that means that when another worker becomes free and, you know,

682
01:09:13,800 --> 01:09:18,920
is looking for a new, a new task, and it will hand out the same task that it actually handed out earlier,

683
01:09:18,920 --> 01:09:25,800
and it ended out again. And so that's sort of the basic plan for fault tolerance is that if the

684
01:09:25,800 --> 01:09:31,960
coordinators are here about a particular work of reporting back that the other task is done,

685
01:09:31,960 --> 01:09:36,680
it will rerun the task again. And so an instant question is, like, can a map function

686
01:09:37,640 --> 01:09:42,440
get a map run twice? Even complete twice.

687
01:09:50,039 --> 01:09:54,600
Is it possible in this framework that, you know, a particular map will run twice?

688
01:09:55,880 --> 01:10:00,360
I guess it is because if the machine is down, you can't really tell

689
01:10:01,480 --> 01:10:10,360
at which point. So how many of the map tasks that it executed during the specific map

690
01:10:10,360 --> 01:10:16,360
reducing instance were actually completed. So you would just have to rerun all of them, I guess.

691
01:10:17,400 --> 01:10:21,640
Yeah, yeah, yeah. So, mostly we just think about this one task at a time. But,

692
01:10:22,119 --> 01:10:26,920
so the machine, like, does one task, then goes back to the coordinator, asks for the next task,

693
01:10:26,920 --> 01:10:31,960
and that might be another map test. And so when the coordinator doesn't hear back,

694
01:10:31,960 --> 01:10:36,680
it will say, like, okay, we'll ask another worker to run that map test too. But it could be the case

695
01:10:36,680 --> 01:10:41,960
that is at your point exactly out that the first worker, the first machine, didn't actually crash.

696
01:10:42,680 --> 01:10:46,520
It just happened to be a network petition, or like the word coordinators not able to communicate

697
01:10:46,520 --> 01:10:51,079
with the machine, but it actually is just running happily and actually doing the map test.

698
01:10:51,079 --> 01:10:56,279
And the producer, you know, and the intermediate set of results. So the same map function,

699
01:10:56,279 --> 01:11:02,840
connect exactly your run twice. And so it's actually one of the reasons that map producer

700
01:11:02,840 --> 01:11:08,119
functional is because that's okay if it's a functional program, right? If you run the same

701
01:11:08,119 --> 01:11:13,640
program on the same input, if you run a functional program on the same input, it will produce exactly

702
01:11:13,640 --> 01:11:18,600
the same output. So it doesn't really matter that it runs twice. You know, while in both cases,

703
01:11:19,160 --> 01:11:25,160
produce the exact same output. And so these are where this functional aspect is actually really

704
01:11:25,160 --> 01:11:28,600
important. It basically has to be functional or deterministic.

705
01:11:33,000 --> 01:11:36,520
Because you know, every run of this map function must produce the same output because we're

706
01:11:36,520 --> 01:11:44,360
going to use one of them in the total computation. So similar, it can reduce function run twice.

707
01:11:48,600 --> 01:12:05,400
Yeah, so we so. Yep, exactly for the same reason, right? I mean, if the machine runs

708
01:12:05,400 --> 01:12:08,600
the reduced function, there's no different than a map test. There's really no from the

709
01:12:08,600 --> 01:12:11,880
fault-pollens perspective. There's no really big difference between a map test and a reduced

710
01:12:11,880 --> 01:12:17,880
test. If you're going to the machine running, the reduced test doesn't report back, but happens

711
01:12:17,960 --> 01:12:22,680
to also finish the job. Another machine might run be running exactly the same reduced function.

712
01:12:24,039 --> 01:12:28,680
And they will produce output. Now, the only sort of interesting aspect in this is that,

713
01:12:28,680 --> 01:12:32,680
you know, both reduced function will write, you know, to an intermediate, we will write the

714
01:12:32,680 --> 01:12:38,520
final output file into GFS. And if you're, you know, paid attention to it, you will notice that what

715
01:12:38,520 --> 01:12:43,239
they do is actually they first produce the file in an intermediate file in the global file system,

716
01:12:43,239 --> 01:12:54,439
and then do an atomic rename to name, move the file or rename the file into which actually final name.

717
01:12:56,039 --> 01:12:59,479
And because it's going to set up, make, you know, one of the two reduced functions will win,

718
01:13:00,199 --> 01:13:03,880
but it doesn't really matter which one wins because they're going to produce exactly the same outcome

719
01:13:03,880 --> 01:13:04,679
because they're functional.

720
01:13:04,760 --> 01:13:15,079
So just to double check, so if we have a machine that's doing a map task, so a single machine can do

721
01:13:15,079 --> 01:13:20,680
like multiple map tasks. So let's say that it's doing like 10 map tasks and it's in the seventh

722
01:13:20,680 --> 01:13:25,400
task. And then for some reason, it failed. And then the master knows that this machine failed.

723
01:13:25,400 --> 01:13:31,159
So then the master will order for all of the seven map tasks that were completed to be re executed

724
01:13:32,119 --> 01:13:35,000
distributively, maybe on different map machines.

725
01:13:36,359 --> 01:13:41,399
Except, you know, that's right. Although I think in general, it just goes one map at the time.

726
01:13:41,399 --> 01:13:46,119
So basically one machine runs one map function or one reduced function, not multiple.

727
01:13:47,639 --> 01:13:48,599
Okay, awesome. Thank you.

728
01:13:49,319 --> 01:13:55,639
But after a worker's done running the map task, does it immediately rate its files somewhere

729
01:13:55,639 --> 01:14:01,079
that's visible to other machines or does it just keep that file and its file system for the time being?

730
01:14:01,239 --> 01:14:05,079
It keeps a map function always produced the results on the local disk.

731
01:14:05,559 --> 01:14:07,559
So it sits in this local file system.

732
01:14:08,599 --> 01:14:14,039
Right. So then even if you were doing map tasks one at a time, in the scenario where you did

733
01:14:14,039 --> 01:14:18,439
multiple and then the machine crashed, you would lose the intermediate work, right?

734
01:14:18,439 --> 01:14:23,239
No, it sits in the file system. So when the machine comes back up, you know, maybe the stuff is there.

735
01:14:24,199 --> 01:14:28,119
Oh, I see. So the data is actually stored durability.

736
01:14:29,079 --> 01:14:29,880
Oh, I see. Okay.

737
01:14:32,119 --> 01:14:36,439
And the map or the reduced function directly talked to the map functions, the machines that

738
01:14:36,439 --> 01:14:41,479
actually have intermediate results. Okay, so let me talk quickly about a couple of other failures.

739
01:14:47,479 --> 01:14:50,119
And all the questions you're asking are great questions, where in fact,

740
01:14:50,119 --> 01:14:53,479
there's all of us will show up when you're actually implementing what map producer you'll have to

741
01:14:53,479 --> 01:14:58,839
decide exactly how you're going to do things. So a couple other things. Can the coordinate a fail?

742
01:15:09,319 --> 01:15:20,439
I don't think so. That's great. Like your cat. Excellent. Yeah. The coordinate can not fail.

743
01:15:20,679 --> 01:15:23,879
So basically when the coordinate fails, the whole job has to be rerun.

744
01:15:25,239 --> 01:15:29,559
You know, in this particular implementation, I have no plan for failures of the coordinator.

745
01:15:31,319 --> 01:15:35,479
And that's sort of making the follow coordinate in more fault tolerance is actually a little bit more tricky,

746
01:15:35,479 --> 01:15:40,599
right? Because it actually has state that gets modified every time a map function completes or

747
01:15:40,599 --> 01:15:45,319
reduced function completes. And so it actually turns out to be more complicated than so, basically,

748
01:15:45,319 --> 01:15:51,159
in this particular library, the coordinator cannot fail. And we'll see you later in some

749
01:15:51,159 --> 01:15:54,840
steps of techniques that we can use to make the coordinate of fault tolerance if we wanted to,

750
01:15:54,840 --> 01:16:00,119
but they decide not to do so. One reason they decide not to do so is because like a single machine,

751
01:16:01,079 --> 01:16:05,399
they're hoping basically that the single machine that just runs the coordinators unlikely to crash,

752
01:16:05,399 --> 01:16:09,880
while it's very likely that one of the thousands of machines that runs some map are going to crash.

753
01:16:10,840 --> 01:16:14,119
Okay. How about slow workers?

754
01:16:21,079 --> 01:16:25,480
So we have another type of failure. I'm going to discuss this issue of like where machine might be slow

755
01:16:25,480 --> 01:16:29,720
because like some other computation is running on it, like GFS is also running on the same machine.

756
01:16:29,720 --> 01:16:34,680
Maybe it actually is using a lot of the cycles or bandwidth, or maybe there are like problems with

757
01:16:34,680 --> 01:16:38,199
the hardware itself. Is there anything special they do?

758
01:16:38,199 --> 01:16:45,399
I think I have a call reading something about when the job is getting somewhat close to finishing,

759
01:16:45,399 --> 01:16:51,639
the coordinator will assign the remaining tasks to additional machines, just in case there are

760
01:16:51,639 --> 01:16:57,159
like machines that are lagging, and then they will take the results that finish first.

761
01:16:57,159 --> 01:17:00,119
Yeah, exactly. So the slow workers are called the stragglers.

762
01:17:01,720 --> 01:17:07,960
And what they do is they sort of do backup tasks. So for example, when they close to do

763
01:17:08,359 --> 01:17:11,720
indeed, as you say, when we get into the computation, almost done to say like there's a handful of

764
01:17:11,720 --> 01:17:17,639
reduced task left or a handful of map task left, the coordinator actually just basically runs a

765
01:17:17,639 --> 01:17:22,840
second instance, or maybe for instance of that task on a separate machine. And it's totally okay,

766
01:17:22,840 --> 01:17:27,800
that's totally okay to do so, correct, because it's functional. So it's not no problem. We run the same

767
01:17:27,800 --> 01:17:33,639
computation several times because it will reduce exactly the same output because it's given the same input.

768
01:17:34,600 --> 01:17:41,480
And the hope is that like one of these other guys will finish quickly. And so therefore then we

769
01:17:41,480 --> 01:17:46,760
were not the performance not limited by the slow worker, but basically the fastest of the ones that

770
01:17:46,760 --> 01:17:53,000
got replicated. And so this is like one of the issues where like, you know, basically this is a

771
01:17:53,000 --> 01:18:00,119
common idea to deal with stragglers or to deal with tail latency is to try to busy replicate tasks

772
01:18:00,920 --> 01:18:03,640
and go for the first that finishes.

773
01:18:09,399 --> 01:18:14,439
Okay, I think this is time to wrap up. So I think you can go to other classes.

774
01:18:15,479 --> 01:18:19,960
But these are sort of the major issues that show up in the map reduced library. And you know,

775
01:18:19,960 --> 01:18:23,559
you will definitely be struggling mostly, you know, the hard part of actually implementing the

776
01:18:23,559 --> 01:18:28,840
map reduced library is actually doing the fault hauls aspects. And but you should keep in mind,

777
01:18:28,840 --> 01:18:33,000
as you're doing that, all the programmers that are using your library or would use your library

778
01:18:33,000 --> 01:18:38,440
don't have to worry about all the distributedness that they would have that you have to deal with.

779
01:18:38,440 --> 01:18:43,319
So you're in the unfortunate situation. You're not the target of the map reduced paper, you know,

780
01:18:43,319 --> 01:18:48,600
making your life of grinding map reduced application DG. You're in the, so the bad side of the

781
01:18:48,600 --> 01:18:52,440
equation here, you actually have to deal with the distributedness and you know, become an expert.

782
01:18:53,399 --> 01:18:59,960
Okay, I'm going to hang around for a little while so people want to go feel free to go. If you want

783
01:18:59,960 --> 01:19:07,960
to ask a couple more questions, you know, feel free to do so. And I'll see you first then.

