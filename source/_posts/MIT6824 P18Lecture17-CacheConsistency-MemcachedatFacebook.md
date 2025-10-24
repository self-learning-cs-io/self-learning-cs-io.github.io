---
title: MIT6824 P18Lecture17 CacheConsistency MemcachedatFacebook
---

1
00:00:00,000 --> 00:00:03,680
So I want to talk today about the MAMCache.

2
00:00:03,680 --> 00:00:08,640
This is a paper from Facebook from 2013.

3
00:00:08,640 --> 00:00:12,880
The MAMCache is still widely used in many websites.

4
00:00:12,880 --> 00:00:14,880
We're big internet websites.

5
00:00:14,880 --> 00:00:18,719
You can use have ideas or architecture for similar to it.

6
00:00:18,719 --> 00:00:23,359
The paper is an experienced paper.

7
00:00:30,000 --> 00:00:36,960
The goal of the paper is not to introduce new ideas or new concepts or innovative ways of building

8
00:00:37,679 --> 00:00:44,320
systems that are more to report on practical experience in trying to build systems that

9
00:00:44,320 --> 00:00:49,760
in this particular case can support a billion requests per second or multiple billion requests per

10
00:00:49,760 --> 00:00:50,159
seconds.

11
00:00:51,119 --> 00:00:57,199
And so there are three lessons that you can take away from this particular paper.

12
00:01:02,159 --> 00:01:07,920
One is that you have very impressive performance out of building a system

13
00:01:09,120 --> 00:01:11,359
with an off-the-shelf component.

14
00:01:11,359 --> 00:01:20,640
And so the system consists of an extended open software packages like

15
00:01:20,640 --> 00:01:26,719
mySQL, MAMCache.D, and then they combine that together to actually build a system

16
00:01:26,719 --> 00:01:29,439
where it's built that out to a system that can actually support an ability in the

17
00:01:29,439 --> 00:01:30,239
other requests per seconds.

18
00:01:31,760 --> 00:01:39,200
As you will see in this lecture, there's sort of continuously attention between performance.

19
00:01:42,319 --> 00:01:43,280
And consistency.

20
00:01:48,719 --> 00:01:52,799
And as you will see in this paper, the design is mostly driven by performance.

21
00:01:54,159 --> 00:02:01,280
But they want to provide some degree of consistency and the sort of that is sort of added to

22
00:02:02,239 --> 00:02:06,719
make the system be used for the application that actually faces the cases.

23
00:02:06,799 --> 00:02:12,800
In fact, the consistency model is quite different from the consistency models that we've seen before.

24
00:02:12,800 --> 00:02:18,079
Most of the systems we talked about so far actually provide the external consistency or linear

25
00:02:18,079 --> 00:02:24,159
isability. They're very strong for consistency. And in case of Facebook,

26
00:02:25,199 --> 00:02:32,159
their application don't really need linear isability. If a user is reading news articles and the

27
00:02:32,240 --> 00:02:38,879
news feed is a couple of seconds behind, doesn't really matter. And so they have absolutely not the goal

28
00:02:38,879 --> 00:02:45,759
of providing linear isability or strict consistency. So that's an important thing to keep in mind.

29
00:02:48,240 --> 00:02:53,039
Despite that they're not shooting for strong consistency, there are some sort of carcassionary

30
00:02:53,120 --> 00:03:01,759
pales in the paper that you know, adding consistency measures is not easy. And it can be sort of

31
00:03:01,759 --> 00:03:08,319
not have for your parent's room until the front of the start. But nevertheless, you know,

32
00:03:08,319 --> 00:03:15,759
that you really can't argue with the success of the system. It's really very successful and

33
00:03:15,759 --> 00:03:22,079
allows Facebook and websites that follow or in their companies, the follow-up strategies to

34
00:03:22,080 --> 00:03:30,240
actually scale the large, large number of users. So my point for this lecture is basically first

35
00:03:30,240 --> 00:03:35,680
to talk about performance. Really, the performance is the driving force behind this design. And then

36
00:03:35,680 --> 00:03:43,280
at the end, you know, talk more about consistency. Before jumping into, let me know if there's any questions.

37
00:03:44,080 --> 00:03:56,319
Okay, so let me start with sort of a little bit of a broader introduction to performance. And

38
00:03:56,319 --> 00:04:08,800
basically, so talk about like website evolution. I'm sure many of you actually have built websites.

39
00:04:09,439 --> 00:04:13,280
And you know, if you sort of start out and you don't have many users, you know, this is pretty

40
00:04:13,280 --> 00:04:18,560
straightforward. You know, you buy a machine where rent a machine on Amazon or anywhere else.

41
00:04:19,600 --> 00:04:24,400
And you just have basically need three components. You know, you need a web server. So let's say

42
00:04:24,400 --> 00:04:33,360
Apache. You need sort of an application framework to build your website in. Maybe it's PHP,

43
00:04:33,360 --> 00:04:41,439
maybe it's Python, in case of Facebook data, I think they use PHP. And you need the database

44
00:04:41,439 --> 00:04:46,639
that actually stores the data. I'll see your website. So it'll be definitely my use, you know,

45
00:04:46,639 --> 00:04:53,199
whatever my SQL. That's Facebook is doing. And so, you know, clients, you know, connect through your

46
00:04:53,199 --> 00:05:01,360
website, run, you know, whatever application code, whatever application service the website provides,

47
00:05:01,680 --> 00:05:08,879
and store and retrieve data using the database and the database provides transactions. It has

48
00:05:09,439 --> 00:05:16,720
SQLs. It's easy to query over the data in different ways. And all the persistent status,

49
00:05:16,720 --> 00:05:20,800
you know, short in the database. So, you know, you just have to back up the database and you're

50
00:05:20,800 --> 00:05:26,639
basically having a grid sort of fault tolerance plan. And that's sort of the, and for any website,

51
00:05:26,719 --> 00:05:32,240
that's a small number of users. This is completely sufficient. And the way many websites are built.

52
00:05:32,959 --> 00:05:38,479
However, you know, when the number of users increases, you probably need to go to much

53
00:05:38,479 --> 00:05:43,439
a little bit more sophisticated design. So this is sort of step one in the evolution. And then

54
00:05:43,439 --> 00:05:55,279
step two, this sort of tried to address the first bottleneck that you were running to when you

55
00:05:55,279 --> 00:05:59,679
have a larger number of users. And typically, the bottleneck that you were running to is basically

56
00:05:59,679 --> 00:06:03,679
the computation that cycles being used, you know, by the applications. So if you have found

57
00:06:03,679 --> 00:06:08,879
new users running at the website at the same time, or 10,000 or whatever number of users it is,

58
00:06:09,679 --> 00:06:14,719
and, you know, just the running, you know, the application code on a single CPU or a single

59
00:06:14,719 --> 00:06:21,679
computer gets to, you know, is the, you know, drive space where you do the CPU load up to 100%,

60
00:06:21,680 --> 00:06:27,040
and then, you know, you can't support more. And so, fortunately, it isn't actually straightforwardly

61
00:06:27,040 --> 00:06:32,879
solved because, you know, the database actually has all the persistent state. So the difficulty

62
00:06:32,879 --> 00:06:37,280
is all the basis, you know, you keep the one machine with the database, and run, keep the machine

63
00:06:37,280 --> 00:06:41,360
on the database, and then just buy a bunch of different machines for the front ends. And I'm just

64
00:06:41,360 --> 00:06:46,800
going to talk about the front end of one thing, which is, you know, typically the website,

65
00:06:46,879 --> 00:06:51,840
hatchy plus, you know, some application code. And you're going to, you're going to get more users,

66
00:06:51,840 --> 00:07:03,120
you'll buy more machines. You know, they all connect to the database, you know, to get their data,

67
00:07:04,240 --> 00:07:09,920
and, and not actually this design works out extremely well, because basically the front ends

68
00:07:10,240 --> 00:07:17,920
are stateless. All this data, again, is in the database. And so adding a new server, you know,

69
00:07:17,920 --> 00:07:23,120
it's pretty trivial. All the front ends, actually, we'll see the latest rights because all the data

70
00:07:23,120 --> 00:07:27,200
is actually stored in the database. So there are no consistency issues. In terms of fault

71
00:07:27,200 --> 00:07:32,800
tolerance is easy. If one of these machines fails, you know, no problem at all. And maybe the other

72
00:07:32,800 --> 00:07:36,960
machines have to take over the load, or you have to bring on a new machine of line, but you know,

73
00:07:36,959 --> 00:07:43,199
actually you have to do anything in terms of complicated data restoration or restoration,

74
00:07:43,199 --> 00:07:49,519
because all the data is actually in the database. And so this is a good, just typically the

75
00:07:49,519 --> 00:07:59,279
first thing that happens as a website to your scales. Now, of course, if your website scales further,

76
00:08:00,319 --> 00:08:06,879
and you need to support more than say, you know, for example, a simple old MySQL setup can probably

77
00:08:06,879 --> 00:08:14,879
support 100,000 simple read transactions or simple read queries per second, probably, you know,

78
00:08:14,879 --> 00:08:21,040
thousands of write transactions. And so if the total number requests from your users actually go

79
00:08:21,040 --> 00:08:30,159
to over 100,000, then you need a different plan. And so then the next plan is typically sharpings.

80
00:08:37,840 --> 00:08:43,919
And so far, this is all pretty standard. And so what you do is actually you take the storage,

81
00:08:43,919 --> 00:08:51,439
you know, machine, and you split it in multiple machines. The front end is basically state-of-same.

82
00:08:51,439 --> 00:08:54,240
We still have our any front end machines.

83
00:08:54,720 --> 00:09:10,799
And here we have our charted database. And basically, you know, some range of the keys

84
00:09:10,799 --> 00:09:19,200
lives on, you know, whatever, maybe one, two, 40 live-on, you know, chart one, 42, whatever,

85
00:09:19,200 --> 00:09:25,680
70 live-on, chart two, and 70 to 100, you know, just to make stuff up, lives in chart three.

86
00:09:25,680 --> 00:09:31,360
So basically you take the tables in the database or the rows in the database and chart them by key.

87
00:09:32,800 --> 00:09:37,840
And so when a friend that needs to know, of course, which database there are, and even though it

88
00:09:37,840 --> 00:09:43,040
needs to get, you know, key 32, you know, we'll go to chart one, it needs to get me to key,

89
00:09:43,039 --> 00:09:50,240
we'll say 50 years ago to chart two. And so this gives us like database parallelism.

90
00:09:56,240 --> 00:10:04,000
So like every, most requests actually are two different charts, you know, basically instead of

91
00:10:04,000 --> 00:10:08,959
actually limited by the one machine, we're actually getting the proof boot of one machine, say,

92
00:10:09,040 --> 00:10:18,080
100,000 times in the number of machines that we have. And so that is typically the next step.

93
00:10:18,080 --> 00:10:23,040
And of course, this actually has this step is a little bit more painful than the first step.

94
00:10:24,480 --> 00:10:30,000
Because now you might actually have cross-charge transactions if you need them, or if you want to

95
00:10:30,000 --> 00:10:35,360
avoid them, you've got to sort of group the keys, you know, that go together on the same machine,

96
00:10:36,080 --> 00:10:42,240
otherwise, you know, you need some two-phase commit type protocol if you do transactions

97
00:10:42,240 --> 00:10:47,120
across sharks. So this is the step from the first, you know, design two to design three,

98
00:10:47,840 --> 00:10:50,879
is sort of a significant, a significant step.

99
00:10:54,480 --> 00:10:59,920
Now, if you grow further and further, you might think, well, you know, you can just

100
00:10:59,919 --> 00:11:05,839
shark the database further and further, sure, a few keys per server, but that actually increases,

101
00:11:06,559 --> 00:11:11,839
you know, this, the risk that you actually have to do cross-shark transactions.

102
00:11:13,360 --> 00:11:18,879
So there's another way of going, which is to observe that like, well, maybe it's not really important

103
00:11:18,879 --> 00:11:24,480
that the database actually supports the reach. You know, we can re-offload the reach,

104
00:11:24,480 --> 00:11:29,599
you know, from the database, and basically the database only does the rights, then maybe you

105
00:11:29,759 --> 00:11:35,759
can get a big, you know, performance game. And so that's basically the next, you know, common step

106
00:11:35,759 --> 00:11:41,120
that websites take. If this can look is, you know, at cash.

107
00:11:51,680 --> 00:11:56,480
And, you know, it could be in the form of MEN cash, or RADIS, you know, sort of popular,

108
00:11:56,480 --> 00:12:02,639
you know, open source packages, you know, for cashing. And then the basic plan is, you know,

109
00:12:02,639 --> 00:12:06,960
sell it, it's roughly as follows. You have a lot of front ends before.

110
00:12:13,759 --> 00:12:18,720
And we have a set of cashes on the site. We'll talk a little bit about that in a second,

111
00:12:18,720 --> 00:12:24,960
a little bit more. In the case, okay, okay, we got here are cashes, cash layer,

112
00:12:26,560 --> 00:12:32,639
cash one, cash two, cash three. And in the case of Facebook, these are called, each individual

113
00:12:32,639 --> 00:12:38,960
survey is called a MEN cash D-Demon. And the whole cluster, the collection of cash is called MEN cash.

114
00:12:43,519 --> 00:12:46,320
And, you know, there's still our database, I'm going to start it

115
00:12:48,000 --> 00:12:54,159
across maybe multiple machines. There's sort of the storage layer.

116
00:12:57,440 --> 00:13:04,080
And then sort of the idea is, you know, pretty straightforward. If, you know, front end needs to

117
00:13:05,039 --> 00:13:12,240
want to read a particular key, it first tries to cash. And hopefully, you know, we'll hit into cash,

118
00:13:12,240 --> 00:13:18,720
and so basically get a quick response back, you know, from the cash. If it's not into cash,

119
00:13:18,720 --> 00:13:25,360
then it can retrieve it from the storage system and then install, you know, the data into cash.

120
00:13:27,360 --> 00:13:30,560
And writes, you know, basically go straight to the storage server.

121
00:13:37,680 --> 00:13:41,039
And this, you know, this sort of kind of design, you know, we'll talk about it in much more

122
00:13:41,039 --> 00:13:45,279
in the details in a second, but this sort of kind of design way at the cash layer works extremely

123
00:13:45,279 --> 00:13:50,399
well for read heavy workloads. And so if you think about Facebook, it is going to be, you know,

124
00:13:50,399 --> 00:13:55,840
a whole lot of users. And what they're doing is reading other people's posts, you know,

125
00:13:55,840 --> 00:14:04,399
looking at the timelines, you know, maybe watching, looking at pictures, reading the news articles,

126
00:14:04,399 --> 00:14:08,000
etc. So it's a very heavily oriented,

127
00:14:10,639 --> 00:14:17,840
worked, worked, worked, oriented to reach. And you know, in this case, you know, the reads are going

128
00:14:17,840 --> 00:14:24,240
to be all surfed from these cashers. And these cashers can be like good simple. And think about

129
00:14:26,480 --> 00:14:30,800
caching the key value server that you build in lab 3, you know, the key value server itself is

130
00:14:30,800 --> 00:14:35,280
actually nothing more than a hash table. Maybe, you know, you want to be a little bit smart about

131
00:14:35,920 --> 00:14:41,519
having locked per bucket and sort of you have a bunch of concurrency within the cash server itself

132
00:14:42,480 --> 00:14:46,080
or the key value server itself. But it is basically pretty straightforward.

133
00:14:46,240 --> 00:14:56,320
The two challenges that come along with this, where the main challenge basically is

134
00:14:58,080 --> 00:15:03,600
how to keep the database and the cash persistent.

135
00:15:09,360 --> 00:15:15,360
So challenge one. And you know, a lot of the paper is devoted to talking about that.

136
00:15:17,040 --> 00:15:23,440
And the second challenge, which I know is the main theme from the paper, is how to make sure that

137
00:15:23,440 --> 00:15:27,440
the database doesn't get overloaded.

138
00:15:36,000 --> 00:15:42,879
And the issue here is that once your scale up say to a billion requests per second,

139
00:15:43,039 --> 00:15:50,320
by using cash if any of the cashers fail, that load will shift from the front ends,

140
00:15:50,320 --> 00:15:56,159
you know, perhaps to the database. And of course, you know, the database is completely not

141
00:15:56,159 --> 00:16:02,240
designed to support that kind of workload. And basically will follow over. And so a key challenge

142
00:16:02,240 --> 00:16:09,279
in the whole sort of lessons that you learn from this particular paper is the techniques to

143
00:16:09,279 --> 00:16:14,240
basically void, you know, going through the database so that there's no risk that actually you

144
00:16:14,240 --> 00:16:20,959
overload the database. Okay, any sort of questions so far?

145
00:16:27,279 --> 00:16:32,079
Let me say a little bit about consistency, because that will be, although I'm going to talk

146
00:16:32,079 --> 00:16:36,799
mostly about performance, it's going to be important to keep in mind even in this sort of section

147
00:16:36,799 --> 00:16:41,919
about consistency, about performance. That's an adequate question. Sorry.

148
00:16:43,039 --> 00:16:48,559
It goes back to like having the state like the clients be stateless.

149
00:16:50,240 --> 00:16:54,559
So what, yeah, there we go on the second part of website evolution. Why is it important

150
00:16:54,559 --> 00:17:00,559
that the clients will be stateless? The makes the replication easy, right? The clients don't actually,

151
00:17:00,559 --> 00:17:03,039
you don't replicate the data, so you don't have to keep the data persistent.

152
00:17:03,439 --> 00:17:08,240
You know, old data lives in one place, maybe the database server.

153
00:17:09,279 --> 00:17:14,960
Okay, yeah. So the idea is like any, any client can like fail and it doesn't matter.

154
00:17:14,960 --> 00:17:20,240
Yeah, it doesn't matter. You know, keep your income computing and you're going to have to worry

155
00:17:20,240 --> 00:17:22,960
about actually keeping data consistent because data is only in one place.

156
00:17:25,200 --> 00:17:27,599
Like a lot of the things that we've been talking about this semester are going to

157
00:17:27,599 --> 00:17:37,599
and it doesn't show up in this particular design. Okay. Okay. So I'll get them back to sort of

158
00:17:38,559 --> 00:17:42,480
once you do actually catch data, you do have this consistency issue, right?

159
00:17:44,879 --> 00:17:48,559
And so, you know, the interesting question is like, I want this database, what is their Facebook

160
00:17:48,559 --> 00:17:52,879
shooting for? And something that's typical that's called almost like it's called the

161
00:17:52,880 --> 00:17:59,040
eventual consistency, which is a pretty vague term. But basically, you know, maybe the contrast

162
00:17:59,040 --> 00:18:06,080
it is to say, I actually don't know, shoot for linearizability. And then, in fact, you know, what they

163
00:18:06,080 --> 00:18:09,600
should have shooting for is, you know, they do want, you know, right order.

164
00:18:14,320 --> 00:18:20,080
So, uh, raise our old plates in some consistent, you know, total order so that you don't get weird,

165
00:18:20,079 --> 00:18:24,399
you know, going back and tie in problems. And that is all done basically by the database.

166
00:18:28,159 --> 00:18:33,039
So, not really a big concern, you know, for the men catch a leader itself.

167
00:18:34,720 --> 00:18:38,559
And through the reads, it's okay if reads are behind.

168
00:18:38,559 --> 00:18:52,559
And that is really the property of the applications that Facebook wants to support.

169
00:18:53,200 --> 00:18:58,960
Again, you know, the data that's in these sketches is, you know, the data that the user's

170
00:18:58,960 --> 00:19:06,079
actually consume, you know, the web pages, posts, timelines, friend lists, and all the kind of

171
00:19:06,079 --> 00:19:13,519
stuff. And or status. And none of that, actually, it's really that important for users to see a very,

172
00:19:14,879 --> 00:19:18,720
you know, up to date, you know, picture, you know, it is a white behind a little bit, you know,

173
00:19:18,720 --> 00:19:23,119
one to two seconds, no problem at all. Certainly, it's left behind for, you know, on this

174
00:19:23,119 --> 00:19:26,960
in milliseconds, you know, the user won't even notice, you know, there's an unacceptable.

175
00:19:27,919 --> 00:19:31,919
And so it's okay to use it behind. Of course, you don't want to be behind for hours, you know,

176
00:19:31,920 --> 00:19:36,640
you can use it by actually notice. But you know, for a little while behind this, actually, you're not

177
00:19:36,640 --> 00:19:43,039
a particular big deal. So they don't really shoot, you know, for straight lines and linearized

178
00:19:43,039 --> 00:19:48,480
ability where read observed the last right, you know, even some reason right, you know, that's fine.

179
00:19:49,680 --> 00:19:53,759
There's one exception to that. And which is that they do want to arrange that, you know,

180
00:19:53,759 --> 00:19:56,160
sort of clients, read their own threats.

181
00:20:02,000 --> 00:20:14,720
And, and meaning that, you know, if a one client, you know, updates a key K, and then immediately

182
00:20:14,720 --> 00:20:19,840
read you later that key K, it's very desirable that that client actually does observe its own

183
00:20:21,120 --> 00:20:25,920
right. Because actually links is more complicated to otherwise, we're writing complications would

184
00:20:25,920 --> 00:20:32,720
be even more complicated. So this is roughly what they're shooting for. And, you know, this is

185
00:20:32,720 --> 00:20:37,279
quite a bit weaker than some of the models that we have seen before. And we're mentioning maybe a

186
00:20:37,279 --> 00:20:44,720
little bit, you know, from the, but the zookeeper sort of style of contract, you know, it can provide.

187
00:20:48,320 --> 00:20:54,160
Okay, so one other thing, I want to say, you go back a little bit. So we need to keep the database

188
00:20:54,160 --> 00:21:02,720
in the cash system in some manner. And so the basic plan that things will follow is

189
00:21:05,519 --> 00:21:10,160
a new validation plan or a cash validation plan.

190
00:21:16,800 --> 00:21:22,960
And we'll see later in the lecture on why that is the case. Basically what happens if a front end

191
00:21:23,039 --> 00:21:31,200
does right, you know, it goes actually through the database. Here's my SQL.

192
00:21:35,279 --> 00:21:41,440
But they run next to the database, you know, another program, you know, whatever it calls Q.

193
00:21:45,200 --> 00:21:50,559
And basically, you know, it looks at the transaction log. So mySQL, we're going to maintain some

194
00:21:50,559 --> 00:21:55,919
transaction log, you know, things like transactions. And you know, it looks like this transaction log

195
00:21:55,919 --> 00:22:03,919
sees, you know, what things get modified. And basically, if there's a, you know, a key that gets

196
00:22:03,919 --> 00:22:09,200
modified. So it sees like KK gets modified. And it will send an validation message to the cash,

197
00:22:10,000 --> 00:22:17,279
basically deleting. Actually, it's usually the meat of that key K, you know, to the appropriate

198
00:22:17,279 --> 00:22:23,759
catch. And that way, you know, the data will be removed. And then at some point later, when a client

199
00:22:23,759 --> 00:22:34,879
comes along, does a read, it will get a miss. In the cash, read, it retrieves the data from

200
00:22:37,920 --> 00:22:44,160
reasons from there. So here does it get, let me call this a get, is a read, gets the data from the

201
00:22:44,160 --> 00:22:49,840
read and then actually installs it in the cash. And so one thing you might wonder, and I like,

202
00:22:49,840 --> 00:22:55,759
why actually does the application itself install the data into the cash? So it doesn't put.

203
00:22:57,680 --> 00:23:01,519
And this has to do with actually that these cash is, you know, what they're called are look aside

204
00:23:01,519 --> 00:23:08,800
cash. And the reason they're sort of look aside is that because typically what the application will do

205
00:23:08,800 --> 00:23:12,880
with the data that actually reads from the database is maybe a massager delivered. Now, there's some

206
00:23:12,880 --> 00:23:17,600
computation on it, namely, it'll take the text of the page and actually turn it into an HTML

207
00:23:17,600 --> 00:23:23,760
pilot page or HTML file and that's the result of that HTML version of the page actually into the

208
00:23:23,760 --> 00:23:28,960
cash, where maybe, you know, the reach of budget different records aggregates, you know, some data

209
00:23:28,960 --> 00:23:35,920
and puts the aggregated result in the cash. So the application is sort of in control in this design

210
00:23:35,920 --> 00:23:41,440
of what to put in the cash and it puts a little bit more burden on the on the front end or in the

211
00:23:41,440 --> 00:23:46,799
application or decline to this case. But it has the advantage, you know, that you can sort of

212
00:23:46,799 --> 00:23:51,680
do some pre-processing before actually sticking something into cash. And this sort of in contrast

213
00:23:51,680 --> 00:23:55,440
where the cash would be transparent, where the cash would be sitting between the front ends

214
00:23:55,440 --> 00:23:59,039
and the storage server and if you miss in the cash then the cash would choose the data.

215
00:24:00,320 --> 00:24:04,080
But of course the cash in the database don't really know what the application exactly wants to store

216
00:24:04,080 --> 00:24:11,120
in the cash. And so in the look aside design, this is the application is sort of in control of the cash.

217
00:24:11,680 --> 00:24:20,080
So in a little bit more detail, we can look at this picture that looks like how actually

218
00:24:21,120 --> 00:24:29,279
we derive to implement it. So here's the reads. Oops, sorry.

219
00:24:29,279 --> 00:24:43,680
So this is a sort of figure two from the paper.

220
00:24:47,200 --> 00:24:49,599
And so here's our web server that is our client.

221
00:24:51,839 --> 00:24:56,879
You have the client to get a retrieved paper from the memcash. And as we'll see in a second,

222
00:24:56,880 --> 00:25:02,000
you know, typically they'll ask for a whole bunch of keys. And there's not uncommon that, you know,

223
00:25:02,000 --> 00:25:07,840
the web server will ask for 2200 of keys, you know, presumably in starting to compute some web page,

224
00:25:07,840 --> 00:25:13,440
the web page contains aggregates data from lots of different places. And for every peaches data that

225
00:25:13,440 --> 00:25:21,760
needs to be put into that web page, the client issues a get request, we may perhaps have many, many, many keys.

226
00:25:21,759 --> 00:25:30,000
Then it goes to memcash, it gets results back and you know, when sending that gap to the memcash,

227
00:25:30,000 --> 00:25:35,759
you know, it might contact many memcash D servers. The results come back to the web server.

228
00:25:36,799 --> 00:25:42,319
If anything is missing, you know, it can process the ones that actually return the positive result,

229
00:25:42,319 --> 00:25:50,400
but you know, we get nil back, then the client, you know, goes and doesn't select on the database,

230
00:25:50,400 --> 00:25:58,320
it runs an SQL query, that returns some data. And the results, you know, of that, and the client might

231
00:25:58,320 --> 00:26:05,120
do some computation and then actually install the processed values that came back from the select into

232
00:26:05,120 --> 00:26:11,440
memcash. That's sort of the read site. And again, again, you can sort of see the lookest, the lookest site,

233
00:26:11,440 --> 00:26:16,160
you know, property or aspect of this design, where memcash is not really sitting straight between

234
00:26:16,240 --> 00:26:20,240
the Web server and the database, but sits on the site and is managed by the client.

235
00:26:22,320 --> 00:26:24,800
So here's the right site.

236
00:26:28,080 --> 00:26:35,759
So for example, if the Web server or the application needs to whatever add a post or, you know,

237
00:26:35,759 --> 00:26:43,680
put a picture in the post or whatever, the server does not update, you know, sends basically

238
00:26:43,759 --> 00:26:49,920
the update to the database. This is just performed like a normal transaction.

239
00:26:51,200 --> 00:26:55,120
And then of course, on the database and the site, you know, as we saw before, you know, we'll do

240
00:26:55,120 --> 00:27:06,480
invalidations using, you know, this the SQL demon. But that SQL demon, you operate asynchronously.

241
00:27:06,480 --> 00:27:23,680
And so the client, the right doesn't really wait until that invalidation has happened. Again,

242
00:27:23,680 --> 00:27:29,680
once the update is done in the database, the transaction has completely completed, it will turn

243
00:27:29,680 --> 00:27:35,279
to the client and then in parallel, the SQL does the invalidations.

244
00:27:37,039 --> 00:27:42,000
And because, you know, the SQL does the invalidations asynchronously,

245
00:27:43,360 --> 00:27:49,680
the Web server just to precaution does the delete of the key in the memcash immediately.

246
00:27:50,240 --> 00:27:56,000
And so when the reason for that delete is only because we want to read our own rights.

247
00:28:00,160 --> 00:28:13,840
So when the Web server, for example, looked for that key K right after it did the update,

248
00:28:13,840 --> 00:28:19,840
then it will miss in memcash.d and it will go and actually retrieve the new value and then install it.

249
00:28:21,120 --> 00:28:26,400
And without just the case, we're what's a remealy, it reaches own, reaches out,

250
00:28:26,880 --> 00:28:30,480
reads the key K that it just actually updated a little while ago.

251
00:28:33,120 --> 00:28:40,080
Okay, when the principle is not necessary to do this delete the invalidation at some point,

252
00:28:40,080 --> 00:28:45,840
it won't happen and it will kick out that KK out of the cache. And that's fine for basically

253
00:28:45,840 --> 00:28:51,280
other clients, but just for this client, we want to make sure that actually reaches own rights.

254
00:28:52,240 --> 00:28:54,000
I have a question.

255
00:28:54,000 --> 00:28:54,480
Yeah.

256
00:28:54,480 --> 00:28:59,119
So why doesn't it set after the delete?

257
00:28:59,119 --> 00:29:03,680
Yeah, that's a very good question. Like why doesn't it do an update immediately?

258
00:29:03,680 --> 00:29:12,079
Right. And I think that's called an update scheme. And that's an principle possible here too.

259
00:29:12,799 --> 00:29:16,319
But I think it's a little bit tricky for them to make work because I think it was going to require

260
00:29:16,319 --> 00:29:22,720
some collaboration between the database, the cache and the client. And I think the issues it follows.

261
00:29:24,319 --> 00:29:32,399
Let's say we have a client C1, we have a client C2, and we'll see similar sort of tag races

262
00:29:32,399 --> 00:29:38,079
going up. And let's say client X1, since X1 is sends that through the database.

263
00:29:38,079 --> 00:29:46,960
And then, like I said, this is a hypothetical update scheme.

264
00:29:50,960 --> 00:29:55,519
And the main point of this slide will be, or this board will be sort of talking about,

265
00:29:55,519 --> 00:30:00,559
like doing action nobdade is not completely trivial. Let's say client 2 at the same time,

266
00:30:00,559 --> 00:30:04,720
we're roughly after it, you know, says X2, sends that to the database.

267
00:30:04,720 --> 00:30:11,519
And let's say the client 1 has got a little bit delayed. And so we implement your

268
00:30:11,519 --> 00:30:20,400
scheme, correct? And we immediately do a set of K22. And let me say K was zero at the end in the beginning.

269
00:30:21,200 --> 00:30:28,720
So this will update map cache D, correct? So cache is now going to be half a value of whatever K22.

270
00:30:29,440 --> 00:30:36,000
Then, you know, client 1 actually comes around to do actually its set. So it will do set here,

271
00:30:36,000 --> 00:30:47,600
or put, and set, you know, put, oops, sets K21. And so this will all correct the two. And now we have

272
00:30:47,600 --> 00:30:58,000
a stale value in the cache. And worse, you know, this value is there.

273
00:30:59,680 --> 00:31:03,759
I sort of persistently stay up. You know, any, you know, get later on, you know, we'll see

274
00:31:03,759 --> 00:31:10,160
actually the state of value. And so this is not so desirable. And so you want to avoid that. And

275
00:31:10,160 --> 00:31:16,799
of course, you can make maybe updates scheme work by, for example, order, or time stamping, or

276
00:31:17,519 --> 00:31:23,680
signing a sequence number studio updates. And then by the database, and then the key value

277
00:31:23,680 --> 00:31:30,640
server, or an M cache, you know, basically not perform updates that are out of order. But the

278
00:31:30,640 --> 00:31:34,720
scheme like that, who's going to require some participation of the database, I mean, and

279
00:31:34,720 --> 00:31:38,880
required modifications to my SQL. And one of their goals is to actually build everything from

280
00:31:38,880 --> 00:31:44,799
off to shelf components. And so, you know, they prefer to go with this infillulation scheme,

281
00:31:44,799 --> 00:31:50,400
which I think is just simpler to implement. Because basically, you know, you're the database,

282
00:31:50,400 --> 00:31:56,320
the only thing it has to do is this like additional process that sits on site. And, you know,

283
00:31:56,320 --> 00:32:01,440
users to standard delete operation on that, you know, MEN cache, Diority supports.

284
00:32:04,640 --> 00:32:06,080
Thank you. Does that make sense?

285
00:32:08,560 --> 00:32:12,720
And we'll see similarly, you should like this one show up later again, right? Because there's

286
00:32:14,160 --> 00:32:19,680
your member from the paper, there's some discussion about these tokens or leases to deal with

287
00:32:19,680 --> 00:32:25,279
stable values. But that's going to be us. We'll see stable values on the read site, or

288
00:32:26,799 --> 00:32:31,440
stable values as sort of have an interesting interaction between readers and writers. But can

289
00:32:31,440 --> 00:32:36,640
be solved totally in the context of MEN cache, D, without actually making any database modifications.

290
00:32:38,160 --> 00:32:44,320
So why do we have a separate process to basically issue the invalidation? So this is a SQL,

291
00:32:44,319 --> 00:32:51,279
I think it was called. So why do we have this process if the front end itself will issue a

292
00:32:51,279 --> 00:32:59,519
delete K anyway? We'll see later on why this is going to be very useful. And particularly,

293
00:32:59,519 --> 00:33:02,639
you know, what we're going to do is we'll see is that the cache is going to be replicated.

294
00:33:02,639 --> 00:33:05,759
And we need to set an invalidation to everywhere. Okay. Okay.

295
00:33:07,759 --> 00:33:13,119
That's what we need. We would not want to send a delete to every MEN cache replica.

296
00:33:14,480 --> 00:33:19,599
Clearly, yeah. We'll see in a second. Hold on. And then we'll see that in a second. In fact,

297
00:33:21,200 --> 00:33:30,000
we're going to talk about it right now. So so far actually most of the story is pretty standard.

298
00:33:32,000 --> 00:33:37,439
There's small changes here. And what we've talked about so far is nothing really

299
00:33:38,400 --> 00:33:45,279
too exceptional. Things get more interesting right after this. And so we get more into

300
00:33:45,279 --> 00:33:54,080
sort of Facebook specific optimizations or performance tricks. And the first thing that we're

301
00:33:54,080 --> 00:34:05,120
going to see is the first thing that actually becomes unusual is that actually Facebook basically

302
00:34:05,119 --> 00:34:10,400
replicates a complete data center. At the time of the writing of this paper that we're basically

303
00:34:10,400 --> 00:34:17,759
two data centers, one of the west coasts. So we switch back to blue. So data center one,

304
00:34:18,400 --> 00:34:29,199
they call the regions. We're here data center two. And they basically have, you know,

305
00:34:29,199 --> 00:34:36,319
they're all have a client layer. So a lot of front ends.

306
00:34:43,279 --> 00:34:44,960
And maybe this is the one on the west coast.

307
00:34:48,639 --> 00:34:54,399
And then you know, there's the MEN cache, do you hear the MEN cache layer? And both have their own

308
00:34:54,480 --> 00:35:02,320
MEN cache layer. So here they set a front ends again. A lot of front ends. So here's our lot of MEN cache

309
00:35:02,320 --> 00:35:11,599
D's. A lot of MEN cache D's. A lot of MEN cache D's here. And then you know, there's the storage layer

310
00:35:11,599 --> 00:35:19,920
in which is our you know, sort of charted, you know, databases. So a lot of machines here too.

311
00:35:20,159 --> 00:35:29,119
And basically, you know, the data center two, the one on the east coast, is a, you know, a direct

312
00:35:29,119 --> 00:35:36,000
replica of the one on the west coast. And the scheme that they use kind of for rights, because

313
00:35:36,000 --> 00:35:41,200
now we have two replicas, really, of the data, correct the data of the database is stored in two places.

314
00:35:41,200 --> 00:35:46,000
So we need to keep in some way, you know, these two copies up to date. In the basic plan,

315
00:35:46,000 --> 00:35:51,519
the links on the right side is to all the rights are going through the primary. And one of the

316
00:35:51,519 --> 00:35:57,599
regions is the primary, the other is the backup region. So this is region two. And in fact, I think in

317
00:35:57,599 --> 00:36:07,519
the paper, the west coast is the primary. And the east coast is the backup. And so all rights

318
00:36:08,480 --> 00:36:15,679
actually go through the storage layer on the primary. So even rights, no issue by the front ends,

319
00:36:16,159 --> 00:36:22,559
on the east coast, you know, go to the database here. And so the database there on the primary

320
00:36:22,559 --> 00:36:28,000
just runs the transaction. And, you know, we know and then basically propagates, you know, these

321
00:36:28,000 --> 00:36:34,159
invalidation methods, or first of all, it takes the log that actually sits on this site. And

322
00:36:34,159 --> 00:36:39,760
basically copies, or transmits it over to the other side. And so this is the squeal process that

323
00:36:39,760 --> 00:36:45,920
basically does that. And, you know, that process basically applies, you know, the log to the

324
00:36:45,920 --> 00:36:51,920
storage database on the other side. So keeping the two databases in sync. And as a side effect,

325
00:36:51,920 --> 00:36:56,800
you know, it might actually send invalidation messages or delete messages to delete keys.

326
00:37:01,040 --> 00:37:05,120
And so you might wonder like, you know, why do it in this way? You know, why not keep, for example,

327
00:37:05,119 --> 00:37:09,519
everything on the west coast. And, you know, basically double the number of, you know,

328
00:37:09,519 --> 00:37:14,480
mancaches and all that kind of stuff. But, you know, the one primary reason to do this is this

329
00:37:14,480 --> 00:37:23,920
goes, good read performance for users. Good reads for users that are actually sitting on the east

330
00:37:23,920 --> 00:37:30,239
coast. So, you know, they will connect, you know, to one of these guys. They will look up the data in

331
00:37:30,719 --> 00:37:36,079
the cache, their mancache on the east coast. And basically return the data straight out of the

332
00:37:36,079 --> 00:37:40,479
mancache. So we're basically going to get really good, you know, one we just do get our good

333
00:37:40,479 --> 00:37:44,239
read performance. In fact, you know, we can also get low latency because we're basically, you know,

334
00:37:44,239 --> 00:37:51,519
reading from a replica, now that's closed by. Of course, you know, these cache, you know, might get

335
00:37:51,519 --> 00:37:56,079
a little bit more out of sync than the example there in the single data center because like this whole

336
00:37:56,079 --> 00:37:59,199
update and the affiliation and it all happens async to this.

337
00:38:05,199 --> 00:38:09,759
But that's more or less going to be a little bit okay, correct? Because we were, you said, that we're

338
00:38:09,759 --> 00:38:14,480
actually not looking for, you know, strict consistency or reliability or shared reliability.

339
00:38:15,840 --> 00:38:24,480
I have a question. So, if someone in the east coast of a client of the east coast

340
00:38:24,480 --> 00:38:35,039
writes, it writes directly to, to the storage on west, right? Which doesn't invalidate.

341
00:38:36,480 --> 00:38:40,079
This guy also will say it invalidates to its cache.

342
00:38:42,159 --> 00:38:47,840
But we said, right, right, but we said, like the client itself to read its own right.

343
00:38:49,199 --> 00:38:53,119
Yeah, so where does that, where does that go? That of course goes through the year, correct?

344
00:38:53,199 --> 00:38:57,599
Yeah, yeah, yeah, that makes sense. Okay. Okay.

345
00:38:59,279 --> 00:39:09,359
Okay. I've got a question to you. Do clients always talk, so will a given client always talk

346
00:39:09,359 --> 00:39:17,599
to the same memcash server? No. Because I'll go back a little bit earlier and we'll talk about these

347
00:39:17,599 --> 00:39:23,920
in a second because this actually is a problem, as we'll see. So, in front of them, basically talks

348
00:39:24,719 --> 00:39:31,360
the keys are sharp across the memcash server, correct? And so, like whatever, TK1, K1,

349
00:39:31,360 --> 00:39:37,599
listen, C1, K2, listen, C2, etc, etc. And typically, in front of them, when it needs to

350
00:39:37,599 --> 00:39:42,960
construct a webpage, it needs to get a whole bunch of keys. And so, since actually these requests,

351
00:39:42,960 --> 00:39:48,720
basically parallel to the different memcash keys and gets older responses back.

352
00:39:52,480 --> 00:39:57,400
And so, in fact, the front-ends are very likely to talk to every memcash

353
00:39:57,400 --> 00:40:04,000
key in the system. I see. But for a given key, it would always talk to the same server.

354
00:40:04,000 --> 00:40:10,960
Yes. Yeah. They actually happen to use existing hashing. So, like, we'll talk a little bit

355
00:40:10,960 --> 00:40:14,880
about a second and a little bit more. But like, one of the memcash deserves goes down, correct?

356
00:40:14,880 --> 00:40:19,840
You know, can't talk to that one anymore. And so, it might be over time that the assignment from

357
00:40:20,400 --> 00:40:28,000
sharks to servers will change a little bit. Sorry, actually, just to follow up on that.

358
00:40:28,000 --> 00:40:35,519
So, the requirement for clients to read their own rights is kind of like a weak guarantee,

359
00:40:35,519 --> 00:40:40,639
right? Because if the server that it deletes from goes down, and then it has to read from a different

360
00:40:40,639 --> 00:40:45,599
replica, it might end up not reading its right. If in the presence of a similar error.

361
00:40:45,599 --> 00:40:48,239
Hold on. Hold on. Hold back. Hold back. Hold for a little while. Okay?

362
00:40:49,039 --> 00:40:52,799
There will see. There's a number of countries where races, if you will, and they have different

363
00:40:52,799 --> 00:40:59,599
techniques were solving those races. Sorry, final question. Yep. Final. I like

364
00:40:59,679 --> 00:41:12,159
that. So, we're doing, like, for read our own rights, we make sure that we go directly to the

365
00:41:12,159 --> 00:41:20,239
storage servers, right, after a right, correct? Yes. I'm not in the cache. But you also said that

366
00:41:20,799 --> 00:41:25,119
no, no, hold on. Hold on. When you do a right, you do the update in the database.

367
00:41:25,119 --> 00:41:35,199
Then you delete the K from your system. So, in this particular case, you would do a right

368
00:41:35,199 --> 00:41:41,359
to the primary, delete the K from your local cache. So, when the next time you do get,

369
00:41:42,079 --> 00:41:47,920
you're going to read from the storage server again. Right. Exactly. Yeah. But

370
00:41:47,920 --> 00:41:56,480
I was curious. So, you also said the right to storage happened asynchronously, right?

371
00:41:57,599 --> 00:42:04,159
The replication happens asynchronously, and invalidations happen asynchronously.

372
00:42:04,159 --> 00:42:09,760
Not the rights. Okay. The rights are synchronous. So, you do the delete after you finish the right.

373
00:42:09,840 --> 00:42:21,600
Okay. Great. Thanks. So, if you do a right, and you're from the, so you're not, you're not from the

374
00:42:21,600 --> 00:42:28,080
primary region, you do a right to the primary storage, and then you invalidate your mem cache,

375
00:42:28,080 --> 00:42:34,720
and then do a read, but you do a read from your storage, and maybe your storage is not to date yet.

376
00:42:35,439 --> 00:42:41,199
So, you got the rates, and so we'll see how they solve that. That's correct.

377
00:42:41,759 --> 00:42:45,359
But first, let's talk more about performance, because there is not good enough for them yet,

378
00:42:45,359 --> 00:42:51,279
they want more performance. Until, you know, if you're sort of broadly speaking,

379
00:42:52,319 --> 00:42:58,399
there's sort of two strategies to getting performance. I'm just typing them back a little bit.

380
00:43:05,679 --> 00:43:10,799
And we already seen them a little bit in a very hard level. So, there's two ways we set up the

381
00:43:10,799 --> 00:43:14,799
plans. One is to partition or shark.

382
00:43:23,039 --> 00:43:27,759
And that's very cool, because in fact, we see that being used basically both on the storage layer

383
00:43:27,759 --> 00:43:33,119
and the mem cache layer. And so, if you're going to need more capacity, you know, you should buy

384
00:43:33,119 --> 00:43:39,039
another server, you know, change the hash and function, and suddenly you got more capacity in

385
00:43:39,039 --> 00:43:44,159
your mem cache, and you can hold more data, right? And the data can be accessed in parallel.

386
00:43:44,880 --> 00:43:46,400
So, you know, you've got a lot of capacity,

387
00:43:53,199 --> 00:43:55,440
plus in the capacity, plus in the parallelism side.

388
00:43:55,519 --> 00:44:05,280
But, you know, if you have a particular key that is extremely hot, like a lot of

389
00:44:06,000 --> 00:44:08,960
clients actually need to get that key, you know, whatever particular person,

390
00:44:08,960 --> 00:44:14,000
and phase MOOC who has a timeline that, you know, everybody's following, then, you know,

391
00:44:15,039 --> 00:44:19,679
that key is going to hit a lot. And, you know, it's being served, you know, luckily, in this case,

392
00:44:19,679 --> 00:44:23,440
it's being served maybe by two different servers, one in the West Coast, the one in the East Coast.

393
00:44:24,079 --> 00:44:27,280
But, you know, presumably a lot of clients on the East Coast and in the West Coast, we're going to

394
00:44:27,280 --> 00:44:32,480
hate the same, or the two, the mem cache deserver on the West Coast and the mem cache deserver in

395
00:44:32,480 --> 00:44:37,840
East Coast that hold that key. And so, that's not going to be that good, right? Because, like,

396
00:44:37,840 --> 00:44:42,400
that single server might actually get overloaded. And it does have the key distribution

397
00:44:43,039 --> 00:44:48,240
varies widely. And so, that's not so good. And so, the self-pronged like that, you know, the second

398
00:44:48,239 --> 00:44:56,879
server approach is to replicate. Repricate data. Here's partition data. And on the

399
00:44:56,879 --> 00:45:05,039
most replicate data. And that's great, you know, for hotkeys. If you can take the same key,

400
00:45:05,039 --> 00:45:09,519
replicated on a bunch of different mem cache deservers, then declines that all meet that key,

401
00:45:09,519 --> 00:45:13,599
can be spread across, you know, those mem cache deservers and get the keys basically parallel.

402
00:45:14,559 --> 00:45:22,400
And so, that works actually good for hotkeys. It doesn't really increase your capacity, right? So,

403
00:45:22,400 --> 00:45:30,319
you just take more. And in some ways, we can see that in the previous picture, we have replication

404
00:45:30,319 --> 00:45:34,719
in action here, correct? We have replicated one data center, you know, from the West Coast,

405
00:45:34,719 --> 00:45:38,960
completed to the East Coast. That hasn't introduced, you know, increased the total capacity

406
00:45:39,679 --> 00:45:43,280
for the mem cache deservers, because both mem cache and the mem cache layers, you know, store,

407
00:45:43,280 --> 00:45:48,800
you know, the same store, the same amount of data, you know, didn't increase the capacity of the

408
00:45:48,800 --> 00:45:54,320
the mem cache layer. But, you know, you're allowed to, you know, read from these two different

409
00:45:54,320 --> 00:45:59,679
and mem cache layers on the East and the West Coast in parallel. Okay? So, we see a little bit of

410
00:45:59,679 --> 00:46:04,800
the form of replication going on. And you might wonder, you know, what now is left to be done?

411
00:46:05,600 --> 00:46:11,519
And this comes to, there's a question I was asked a little bit earlier, let's see, more capacity now,

412
00:46:11,519 --> 00:46:15,920
right? So, well, when one solution to, you know, more capacity, even in a single data center,

413
00:46:15,920 --> 00:46:19,600
so if we get that there's two data centers, just look for the thing from the perspective of single

414
00:46:19,600 --> 00:46:25,039
data center, we want more capacity. But one option, correct, would be to whatever, just buy more

415
00:46:25,039 --> 00:46:32,880
mem cache deservers and just keep buying more of them. And that turns out to be slightly problematic.

416
00:46:33,840 --> 00:46:42,240
And one reason that is problematic is because these front-ends talk to basically every mem cache

417
00:46:43,280 --> 00:46:50,480
server. And so, they, you know, almost at least for rights, you know, we know that the

418
00:46:50,480 --> 00:46:57,920
TCP connection is open and so there's a large number of TCP connections. And for the more,

419
00:46:57,920 --> 00:47:04,639
and as we said before, if actually there's a particular key heart, the head heart, then the

420
00:47:07,039 --> 00:47:12,880
that doesn't really be solved by shard. So you can buy more machines, but if not one key is hot,

421
00:47:12,880 --> 00:47:17,200
it makes a one machine that actually is not going to really include your performance. So,

422
00:47:17,200 --> 00:47:23,440
their next step in terms of, you know, performance improvement is to actually replicate

423
00:47:23,519 --> 00:47:32,960
with inside the single data center. So, more performance. This is this idea of cluster.

424
00:47:35,760 --> 00:47:37,840
And this is really a story about replication.

425
00:47:40,960 --> 00:47:44,320
And so what they actually do is like if we look in the single data center,

426
00:47:44,320 --> 00:47:54,800
they got, we got our storage layer. And then within the storage layer,

427
00:47:55,519 --> 00:48:01,519
these we were going to replicate a set of front-ends. So, we have our front-end layer,

428
00:48:01,519 --> 00:48:12,880
and here's our mem cache layer. I'm going to take that out and just replicate it multiple times.

429
00:48:15,280 --> 00:48:24,960
And then they're called as a cluster. And the reason this is good, you know, is the intersection

430
00:48:24,960 --> 00:48:33,280
of the dual well with, you know, it's good for popular keys. The popular key will now be replicated,

431
00:48:34,000 --> 00:48:41,840
potentially multiple clusters. And so that is nice. Second, it reduces the number of connections.

432
00:48:44,320 --> 00:48:51,360
And this is actually particularly, there's multiple reasons why this is important.

433
00:48:52,880 --> 00:49:01,039
It avoids what they call the, before it's the in-cast problem, in-cast congestion.

434
00:49:04,480 --> 00:49:09,920
And so, except before, like one of these front-ends, may have to retrieve, you know, 500,

435
00:49:10,000 --> 00:49:17,920
you know, whatever, you know, tends to 100 to the keys. And so it will send them a parallel to all the

436
00:49:17,920 --> 00:49:24,400
particular mem cache that are important. They will all respond. And of course, you know, we have

437
00:49:24,400 --> 00:49:29,599
many, many more mem caches. We're going to have much more parallelism. A lot of packets will come

438
00:49:29,599 --> 00:49:38,000
back exactly at the same time. They can easily loop you into Q, Q's being overloaded or Q's being

439
00:49:38,000 --> 00:49:42,559
full and therefore, packets getting dropped. And so by reducing the number of connections,

440
00:49:42,559 --> 00:49:45,760
that actually every friend they talks to, you know, reduces the number of responses that are going

441
00:49:45,760 --> 00:49:52,320
to come back. And we avoid this in-cast congestion problem. And in general, it sort of reduces the

442
00:49:52,320 --> 00:49:59,519
pressure on the network. It's actually hard to build networks that have a bi-section bandwidth that

443
00:49:59,519 --> 00:50:06,639
can sustain a huge load. And here, by sort of making using replication, basically, the network,

444
00:50:06,639 --> 00:50:10,079
you know, for one cluster really has to support that one cluster well.

445
00:50:17,279 --> 00:50:22,879
Now, so this is all good. Of course, you know, this is the downside of the design like this is

446
00:50:22,879 --> 00:50:29,679
that if you have unpopular keys, there's unpopular keys going to get stored in multiple regions

447
00:50:29,679 --> 00:50:36,319
and basically, you know, do nothing or then contribute to improvement in performance. And so,

448
00:50:36,320 --> 00:50:41,840
in fact, you know, what they do is they have one additional sort of pool that they have, and they

449
00:50:41,840 --> 00:50:55,039
call this the regional pool. And then applications can decide to store not so popular keys into the

450
00:50:55,039 --> 00:51:05,120
regional pool to stick it at the site. And so that these, so that they don't are replicated in time

451
00:51:05,119 --> 00:51:09,279
to cross-hubble clusters. So you can think about the regional pool being shared among multiple

452
00:51:09,279 --> 00:51:15,759
clusters and use for the less popular keys or less infrequently used keys. Okay.

453
00:51:17,839 --> 00:51:25,119
So this is going to help with popular keys because each cluster is going to have its own

454
00:51:25,119 --> 00:51:28,559
mem cache. Yep. Yeah, every cluster has its own mem cache.

455
00:51:28,559 --> 00:51:34,480
That's its own front ends. That has its own mem cache.

456
00:51:37,759 --> 00:51:44,320
And basically, users, you know, the users are basically a low balance across all these clusters.

457
00:51:45,920 --> 00:51:54,159
But this still does not increase capacity, right? This not increase capacity. If you want to increase

458
00:51:54,159 --> 00:52:01,480
capacity, you will increase capacity a little bit, correct, because like all the impopular

459
00:52:01,480 --> 00:52:04,079
stuff is not being actually cast and just stuck in the regional pool.

460
00:52:05,599 --> 00:52:08,480
Okay. And so that stays in now free to actually store other keys.

461
00:52:14,480 --> 00:52:20,719
So to avoid incase congestion, they would also reduce the number of shards per cluster, right?

462
00:52:20,799 --> 00:52:23,119
Yeah, we're, you know, don't grow it.

463
00:52:25,039 --> 00:52:29,119
The alternative plan, correct, was nothing to do with clusters, but basically keep growing the

464
00:52:30,079 --> 00:52:38,000
mem cache, the number of shards in a single mem cache. And you know, that has its own limitations.

465
00:52:39,839 --> 00:52:40,799
It sends. Thank you.

466
00:52:40,800 --> 00:52:54,640
Okay. Well, so this sort of the, the base design, except there's a lot of different

467
00:52:54,640 --> 00:53:00,000
performance challenges that they have to resolve. And most of these performance challenges really

468
00:53:00,000 --> 00:53:03,760
have to do with, I think, the way to think about it is protecting the database.

469
00:53:11,120 --> 00:53:11,840
Okay.

470
00:53:22,480 --> 00:53:26,960
Like I was going back to this picture, correct, like we have now designed that apparently can support,

471
00:53:26,960 --> 00:53:34,240
you know, billions requests per second. But the storage layer itself, you know, is sharded,

472
00:53:34,399 --> 00:53:40,639
because certainly not, you know, sustained billions requests per second. And it would be a disaster,

473
00:53:41,199 --> 00:53:44,719
if, for example, let's say all the mem cache is filled, there's some way or another,

474
00:53:44,719 --> 00:53:48,639
where a whole cluster failed. And all the front ends, you know, would hit the storage servers.

475
00:53:49,439 --> 00:53:53,679
Then, you know, the storage servers would fail over, you know, couldn't handle that kind of load.

476
00:53:53,679 --> 00:54:00,239
And so they got to be very, very careful. We have actually putting, doing anything that

477
00:54:00,239 --> 00:54:06,959
requires more load than the storage servers. So, so one, for example, challenge, I'm going to talk

478
00:54:06,959 --> 00:54:17,199
about the number of them, is to bring up a new cluster. The easy way to bring up a new cluster

479
00:54:17,199 --> 00:54:23,919
would be just to, you know, build the cluster, you know, turn the machines on, install the software,

480
00:54:23,920 --> 00:54:31,039
and it'll be done. And basically, rely on the fact that, you know, if the data is not in the cache,

481
00:54:31,039 --> 00:54:34,639
you know, you'll have the miss, and then we'll miss, we'll go through the database and actually,

482
00:54:34,639 --> 00:54:41,039
you know, collect the necessary data. And, you know, what's the problem about the kind of design?

483
00:54:45,440 --> 00:54:48,800
It's going to have a lot of cache misses, because there's nothing in the cache.

484
00:54:48,800 --> 00:54:54,160
Now, if we, for example, let's say you had, you had one cluster, and you had a second cluster,

485
00:54:54,160 --> 00:54:59,039
right, and you moved half of your users to the second cluster, like that 50% of sort of your

486
00:55:00,400 --> 00:55:05,039
requests are going to miss in the cache, and they're going to hit the database. And the database will fall

487
00:55:05,039 --> 00:55:14,960
over, right? So how do they do deal with this? Got it. No, not the gutter. This is the,

488
00:55:14,960 --> 00:55:24,320
I think they were making the new cluster read some entries from the cache of an old cluster.

489
00:55:24,320 --> 00:55:30,559
Yeah, great for gets in the new cluster. If they miss in the new cluster, they go to the old cluster,

490
00:55:31,280 --> 00:55:43,760
from an existing one. And then they said in the new cluster. So basically, one way to think about

491
00:55:43,760 --> 00:55:52,400
is they fill up a new cluster or warm up a new cluster by reading from an existing cluster. And so

492
00:55:52,400 --> 00:55:56,960
that may be increased the load on an existing cluster a little bit, but at least the bone that

493
00:55:56,960 --> 00:56:02,960
actually put a lot of pressure on the database. And as we'll see in a second, that also introduces

494
00:56:02,960 --> 00:56:10,800
again some consistency issues. And we'll see that a little bit later. Okay. So that's one,

495
00:56:11,200 --> 00:56:17,680
you know, example of performance channels that address the other performance is a popular term.

496
00:56:18,560 --> 00:56:22,000
It's used in many contexts that are called the fundering-hurt problem.

497
00:56:25,360 --> 00:56:26,800
What's the fundering-hurt problem?

498
00:56:31,120 --> 00:56:34,960
I guess when there are a lot of rights and reads,

499
00:56:35,760 --> 00:56:41,840
approximately at the same time. And because there are a lot of rights, the data will be invalidated

500
00:56:42,880 --> 00:56:48,000
many times. And the database will be assaulted with requests.

501
00:56:48,000 --> 00:56:53,920
Yeah. And you can make it even simpler. Like a single write, cause an invalidation of a key.

502
00:56:55,440 --> 00:57:00,159
And you know, anybody, any client that reads the key right after it. So you could have the following

503
00:57:00,159 --> 00:57:06,319
situation. You have a very, very popular key. The you invalidate the key. So you delete the key

504
00:57:06,319 --> 00:57:13,920
from your cache. All the machines or all the front ends that meet that popular key. And we'll do

505
00:57:13,920 --> 00:57:19,759
get down that key. I'll get back NIL. And then they're all want to like read select from the database.

506
00:57:20,960 --> 00:57:24,960
And that, you know, my coach, you know, puts a lot of pressure on the database.

507
00:57:26,079 --> 00:57:29,440
So they want to avoid that problem. And so how do they do that?

508
00:57:30,239 --> 00:57:34,239
How do they avoid that problem? They use the leases.

509
00:57:34,799 --> 00:57:37,920
Yeah. Go ahead. Same work.

510
00:57:37,920 --> 00:57:45,679
Yeah. I think like they gave like a like a time like for key specific for the user. And then like

511
00:57:45,679 --> 00:57:52,000
some like some time what I understood it was like kind of a luck. And then like give another user

512
00:57:52,000 --> 00:57:57,920
tries to like use it. They were like wait and then hopefully it would be updated fast enough.

513
00:57:57,920 --> 00:58:04,480
So that in the next week try to get it. Yeah. So basically, so the get if you do get and you get

514
00:58:04,480 --> 00:58:12,480
NIL back, you get two situations. Either you got a lease. Right. The first line basically that

515
00:58:12,480 --> 00:58:17,920
doesn't get a missus. You know, gets a lease from MkG. And that MkG that needs basically gives

516
00:58:17,920 --> 00:58:22,240
it the right to an update. What tells the client like, you know, you're responsible for doing the

517
00:58:22,239 --> 00:58:30,959
update. And if you don't, you know, the first one, then you get a basically a retry message

518
00:58:32,559 --> 00:58:37,199
or result. And that basically tells the client like, you should retry soon and not immediately.

519
00:58:37,199 --> 00:58:41,839
And maybe spread around a little bit. They probably do some, you know, binary backup type style thing.

520
00:58:42,479 --> 00:58:49,359
And retry to get. And you know, most cases, the client that, you know, the first client that missed

521
00:58:50,160 --> 00:58:56,880
will have updated the key K, you know, recently soon like in the order of milliseconds. And then

522
00:58:56,880 --> 00:59:03,200
these retries actually will succeed. Right. And there's no really, and there's no explosion on the

523
00:59:03,200 --> 00:59:08,800
number of requests to date a day. So with this key, of course, it introduces, as we'll see in a second

524
00:59:08,800 --> 00:59:14,960
more, you know, race conditions. But you know, first, let's keep focusing on performance.

525
00:59:15,440 --> 00:59:26,159
There was another thing about leases, right? Where they fit like address, um, style sets.

526
00:59:26,159 --> 00:59:31,599
Yeah. So that leads it for two roles. As we'll see in a second, one for consistency and one for

527
00:59:31,599 --> 00:59:37,360
performance. This one is for performance. And so we'll talk about consistency in second,

528
00:59:37,360 --> 00:59:40,800
and then we'll see the second reviews as one way to solve one of these race conditions.

529
00:59:45,360 --> 00:59:50,880
Okay. One more. There are many more in the paper, but just one more that's sort of interesting.

530
00:59:50,880 --> 00:59:58,000
At least the iPhone interesting. You know, what happens if they have a memcash, the, you were meant to

531
00:59:58,000 --> 00:59:58,800
serve a failure?

532
00:59:58,800 --> 01:00:16,000
I think that's the whole data center that, oh, the whole collection of memcash server that failed.

533
01:00:16,000 --> 01:00:18,000
I just consider a handful.

534
01:00:19,200 --> 01:00:23,039
I've always, I've got it that someone mentioned before. Yeah.

535
01:00:23,519 --> 01:00:29,679
Said the memcash, the failed memcash, but they don't delete them.

536
01:00:30,480 --> 01:00:35,679
Yeah. So look at the scenario correct, the problematic scenario is like a memcash to you server fails.

537
01:00:37,279 --> 01:00:41,360
That will result in a bunch of misses. Those misses will hit the database and then want to

538
01:00:41,360 --> 01:00:46,639
avoid hitting the database, right? Any client that actually has a couple of keys to those servers

539
01:00:46,639 --> 01:00:52,239
is going to try to retrieve the key, wolf, fail, and then you know, we'll have to do something.

540
01:00:53,279 --> 01:00:59,679
So when it gets fails, you know, the easy solution is to go through the database,

541
01:01:00,159 --> 01:01:04,960
but I think we want to protect the database. And so that doesn't seem to do a great idea.

542
01:01:04,960 --> 01:01:09,759
And so what they do is actually have a small other cluster or another pool like the regional pool,

543
01:01:09,759 --> 01:01:10,880
they call the gutter pool.

544
01:01:15,039 --> 01:01:20,800
And the gutter pool is basically a sort of a handful of memcash TV machines that is just available.

545
01:01:21,760 --> 01:01:27,360
And they're available for sort of the short period of time that the systems are reconfigures

546
01:01:27,360 --> 01:01:32,160
and repairs itself and adds new memcash to the servers to replace the ones that fail.

547
01:01:32,960 --> 01:01:37,039
But they're not period of time. That's in the order of minutes. Maybe a little bit more.

548
01:01:38,240 --> 01:01:42,640
They don't want the get requests or the selects to go through the database.

549
01:01:42,640 --> 01:01:46,720
Instead, what they do when they get fails, you go try first the gutter pool.

550
01:01:47,519 --> 01:01:54,719
And the gutter pool will, you know, the first one that hits the gutter pool will fail or

551
01:01:54,719 --> 01:01:59,519
it will miss. Do select in the database, get the result, stick it into the gutter pool,

552
01:01:59,519 --> 01:02:04,399
and then subsequent requests or gets will actually then be answered for the gutter pool.

553
01:02:04,399 --> 01:02:08,879
And at some point, you know, the memcash D machine that was failed, you know,

554
01:02:08,879 --> 01:02:12,639
it has either been replaced or replaced with another machine or recovered.

555
01:02:12,639 --> 01:02:16,879
And then you get a load, just because shift back to this memcash TV server and the gutter pool

556
01:02:16,879 --> 01:02:21,199
sort of sits again in the site to sort of carry over between these sort of tradition periods.

557
01:02:23,599 --> 01:02:28,559
Okay. And so this sort of gets us to the, I guess the reading question for today.

558
01:02:28,559 --> 01:02:34,000
As you mentioned, the gutter pools, you don't do the lead from the gutter pool.

559
01:02:35,599 --> 01:02:38,079
In validations are actually also not sent to the gutter pool.

560
01:02:38,559 --> 01:02:43,599
And the question is like in a Y or can we speculate on Y?

561
01:02:43,599 --> 01:02:47,119
And so maybe this is a good time for a quick breakout room, a couple of minutes,

562
01:02:47,119 --> 01:02:51,599
you know, to either discuss other aspects from the memcash D design that you want to discuss,

563
01:02:51,599 --> 01:02:53,519
we're trying to figure out what the answer to that question is.

564
01:02:56,000 --> 01:02:58,079
So maybe we can do a breakout. Yes. Thank you.

565
01:08:38,079 --> 01:08:40,079
Okay.

566
01:09:03,439 --> 01:09:05,439
Okay. So everybody back.

567
01:09:08,399 --> 01:09:10,399
Yeah.

568
01:09:10,399 --> 01:09:11,119
Looks like it.

569
01:09:11,119 --> 01:09:12,720
Yep. Okay. Good.

570
01:09:13,519 --> 01:09:17,840
Okay. So anybody, you know, go to paper doesn't answer this question very precisely,

571
01:09:17,840 --> 01:09:20,559
but anybody wants to dare to speculate what the answer is.

572
01:09:21,680 --> 01:09:26,559
The delete, no, no, no, no invalidations to the gutter cluster.

573
01:09:31,039 --> 01:09:38,000
Well, we said with something like if you do, then you would have a lot of pressure on the gutter pool.

574
01:09:38,079 --> 01:09:43,359
Because there are so few machines and for every cache miss, there are two requests and for

575
01:09:43,920 --> 01:09:50,000
a cache headed just one. So if you do that after every write, you would have an extra request

576
01:09:50,559 --> 01:09:53,519
on the gutter pool and it's so small so you don't want to do that.

577
01:09:53,519 --> 01:09:58,880
And also you would protect the database as well because you would constantly query it

578
01:09:59,600 --> 01:10:01,600
after a write request.

579
01:10:01,600 --> 01:10:02,880
Yeah.

580
01:10:02,880 --> 01:10:06,800
I got it. I think in general, the delete message is also well, I have to go to two pools, correct?

581
01:10:06,800 --> 01:10:11,199
The original mancash people, all the mancash people's and he invalidated N2 together.

582
01:10:11,840 --> 01:10:15,600
And so, you know, you also double the delete traffic. So I think that's a perfectly,

583
01:10:16,480 --> 01:10:19,680
I think that's the reason, you know, it's a small set of machines.

584
01:10:19,680 --> 01:10:21,600
There's the R2 sort of over.

585
01:10:22,480 --> 01:10:29,119
Basically get the through that transformation from a deleted mancash deserber failed mancash deserber

586
01:10:29,119 --> 01:10:33,440
to a new mancash deserber. Good. Okay.

587
01:10:34,079 --> 01:10:39,359
So it's all one of the say back performance, even though there's more in the paper about performance.

588
01:10:40,559 --> 01:10:45,919
Instead, I want to talk a little bit about sort of these races that sort of come about because

589
01:10:45,919 --> 01:10:50,639
of this trying to achieve the high performance that we've been talking about.

590
01:10:51,599 --> 01:10:53,519
There's going to be three races I want to talk about.

591
01:10:53,519 --> 01:10:56,239
And in fact, I think all three you're already identified.

592
01:10:57,679 --> 01:11:00,239
And so, amazingly, most of the discussions presumably going to be about,

593
01:11:00,639 --> 01:11:03,760
you know, how they avoid that.

594
01:11:05,359 --> 01:11:08,559
And so, race one is what they call stale sets.

595
01:11:09,279 --> 01:11:11,840
And you know, it's scenarios swallows.

596
01:11:12,479 --> 01:11:13,519
But we have a client one.

597
01:11:14,239 --> 01:11:18,960
Use one region, nothing, one cluster, nothing particular special set of.

598
01:11:19,760 --> 01:11:23,359
So the client one does get up a K.

599
01:11:24,319 --> 01:11:27,279
You know, turns out to get a nail in the scenario.

600
01:11:28,079 --> 01:11:30,479
It will read the value from the database.

601
01:11:32,239 --> 01:11:34,399
Maybe this is the client that actually got the token.

602
01:11:36,079 --> 01:11:39,519
And it's the one that actually is allowed to set it.

603
01:11:40,479 --> 01:11:44,079
But before it actually gets to set, you know, another client comes in.

604
01:11:44,719 --> 01:11:49,359
And race, K is two to the database.

605
01:11:50,159 --> 01:11:53,519
And then does a put of K on two.

606
01:11:53,680 --> 01:12:01,600
And then, you know, the other client, you know, actually finally gets around to do doing

607
01:12:01,600 --> 01:12:05,440
actually it's put so there's a put of K comma.

608
01:12:05,440 --> 01:12:06,960
And this is like maybe V1.

609
01:12:07,840 --> 01:12:09,200
So K comma D1.

610
01:12:10,160 --> 01:12:15,440
And now where we have a stale value in the cache.

611
01:12:15,440 --> 01:12:18,160
And that, you know, stale value is sort of permanent there.

612
01:12:19,200 --> 01:12:20,800
Until somebody else does an update.

613
01:12:21,600 --> 01:12:22,320
Okay.

614
01:12:22,320 --> 01:12:25,680
And that's sort of indesirable where that really breaks their sort of contract.

615
01:12:25,680 --> 01:12:28,560
And the applications, they don't want to go back in time.

616
01:12:29,199 --> 01:12:32,320
I'm going to be anonymally that that should be user could have served.

617
01:12:32,320 --> 01:12:34,640
And that's what I want to try to avoid that.

618
01:12:36,960 --> 01:12:39,440
And so what do they, how do they solve this problem?

619
01:12:42,640 --> 01:12:43,440
What is this is?

620
01:12:44,800 --> 01:12:47,360
Yeah, Christian, some say this is the leases help out here.

621
01:12:47,360 --> 01:12:48,480
They already have the leases, right?

622
01:12:48,559 --> 01:12:50,000
Because this guy got a lease for,

623
01:12:51,279 --> 01:12:54,399
must have gotten lease because otherwise he's not reading from the database.

624
01:12:55,039 --> 01:12:58,799
And so at the client one presents this lease at the put.

625
01:13:02,000 --> 01:13:04,479
Or can put a, or sent the lease at the put.

626
01:13:05,679 --> 01:13:09,199
And the fact that well, and what is the additional step basically?

627
01:13:10,159 --> 01:13:21,840
To check that this hasn't expired or something, because if the other client was able to.

628
01:13:22,800 --> 01:13:25,599
I'm sorry, I just realized I made a mistake.

629
01:13:26,159 --> 01:13:28,639
So this is why the question is also not so good.

630
01:13:29,199 --> 01:13:29,599
Let me see.

631
01:13:30,239 --> 01:13:31,840
The client who doesn't do a put, correct?

632
01:13:31,840 --> 01:13:33,359
That was an invalidation consistency.

633
01:13:34,079 --> 01:13:35,359
I got myself confused here.

634
01:13:35,359 --> 01:13:37,119
So what does the client actually have client to do?

635
01:13:38,000 --> 01:13:40,239
After it sets the database.

636
01:13:44,079 --> 01:13:45,279
I'm going back to the lead.

637
01:13:45,279 --> 01:13:46,319
Yeah, those are the lead.

638
01:13:47,840 --> 01:13:49,760
For the reason that we talked about the earlier era, correct?

639
01:13:49,760 --> 01:13:50,800
So it doesn't delete if K.

640
01:13:51,760 --> 01:13:56,000
And what's the side effect of what happens with the lease of a key that's being deleted?

641
01:13:59,439 --> 01:14:02,559
It doesn't like verify or it doesn't.

642
01:14:03,359 --> 01:14:04,720
Yeah, actually what happens with the site,

643
01:14:04,720 --> 01:14:10,880
as a side effect of the delete, the lease is invalidated.

644
01:14:12,640 --> 01:14:13,920
So it invalidates the lease.

645
01:14:17,600 --> 01:14:23,039
And so when the put comes along, so my timeline is a little bit here, this happens like well before.

646
01:14:24,880 --> 01:14:27,280
So the put happens after the delete.

647
01:14:28,079 --> 01:14:30,159
The put will present the lease that I've got at the get.

648
01:14:30,960 --> 01:14:33,680
But that lease has been invalidated by the delete.

649
01:14:33,840 --> 01:14:35,760
So this put gets rejected.

650
01:14:41,680 --> 01:14:46,800
So basically, one way to think about this is that they leverage the lease mechanism to

651
01:14:46,800 --> 01:14:48,640
avoid the funding herd problem.

652
01:14:50,320 --> 01:14:54,800
Extended to basically also avoid this stale set problem.

653
01:14:58,159 --> 01:14:58,960
Does that make sense?

654
01:14:59,600 --> 01:15:07,920
And now the revolution is that if we don't have this lease invalidation mechanism,

655
01:15:07,920 --> 01:15:13,199
we would still obey the like the weak consistency that you would have ordered rights that happen

656
01:15:13,199 --> 01:15:14,720
at some point in the past.

657
01:15:14,720 --> 01:15:18,800
But I believe that the thing that this thing ensures is that you observe your own rights, right?

658
01:15:18,800 --> 01:15:20,640
I think you're sure if you're all right.

659
01:15:20,640 --> 01:15:22,640
They're also sure if you don't go back in time.

660
01:15:23,600 --> 01:15:30,720
Like if you've read something, and like everybody else that comes now after this client too,

661
01:15:31,600 --> 01:15:34,000
we'll see the old V1.

662
01:15:34,000 --> 01:15:39,200
And so a client might get well behind and not see that new right for a long, long period of time.

663
01:15:39,200 --> 01:15:40,720
In fact, my team not at all.

664
01:15:40,720 --> 01:15:45,200
Yeah, but I mean, would this be actually going back in time because

665
01:15:46,000 --> 01:15:50,320
clients did not read anything after maybe back in time's their own work.

666
01:15:50,319 --> 01:15:53,279
But it won't observe V2 for a long, long time.

667
01:15:53,279 --> 01:15:54,079
I see.

668
01:15:54,079 --> 01:15:54,880
Okay.

669
01:15:54,880 --> 01:15:56,799
And now there's not something that we wanted to happen.

670
01:15:58,399 --> 01:16:01,039
It's okay to be either a little bit, but not for a long, long time.

671
01:16:03,199 --> 01:16:03,519
Okay.

672
01:16:04,719 --> 01:16:09,599
Second race, which you guys already mentioned, already identified too.

673
01:16:11,599 --> 01:16:12,719
It's the end of the journey.

674
01:16:13,920 --> 01:16:16,719
I guess, lab debugging, you know, all about races.

675
01:16:17,600 --> 01:16:19,119
Race two.

676
01:16:19,119 --> 01:16:21,520
And this is the cold cluster race.

677
01:16:25,360 --> 01:16:26,800
And sort of in a similar style.

678
01:16:28,720 --> 01:16:32,880
With two clients, client one, with client two.

679
01:16:37,280 --> 01:16:41,360
And let's say K is V1 originally.

680
01:16:41,360 --> 01:16:43,840
And so we're in both clients under the cold cluster.

681
01:16:44,000 --> 01:16:51,360
Point one sets the key to a new value in the database.

682
01:16:54,159 --> 01:16:58,720
Delete the K in the cold cluster, right?

683
01:16:58,720 --> 01:17:00,159
In the current cluster that's actually in.

684
01:17:01,279 --> 01:17:08,079
And then this client doesn't get in the cold cluster.

685
01:17:09,039 --> 01:17:15,439
C is that it actually is not there.

686
01:17:16,159 --> 01:17:22,079
And at least we're going to do get from the warm cluster.

687
01:17:23,359 --> 01:17:24,319
Get the value back.

688
01:17:26,720 --> 01:17:27,519
That's what we meant.

689
01:17:27,519 --> 01:17:34,239
Like, you know, get actually gets there before actually the cold cluster or the warm

690
01:17:34,239 --> 01:17:35,519
cluster actually has been updated.

691
01:17:36,800 --> 01:17:42,479
And so now it will do a set of the K to V1 or put.

692
01:17:42,479 --> 01:17:44,159
Sorry, let me be consistent.

693
01:17:45,679 --> 01:17:50,639
Now, K to V1 in the cold cluster.

694
01:17:50,639 --> 01:17:53,760
And now we have the sort of the same situation as before.

695
01:17:55,599 --> 01:18:01,279
We have sort of a permanent scale value in the cold cluster.

696
01:18:05,119 --> 01:18:09,359
And how do they solve that problem?

697
01:18:15,760 --> 01:18:19,840
Anyone you remember?

698
01:18:27,599 --> 01:18:30,960
So they have a small extension that avoids this problem.

699
01:18:31,760 --> 01:18:33,199
And you guess what it could be if you.

700
01:18:38,720 --> 01:18:41,520
Which is C1 and the warm cluster or cold cluster?

701
01:18:41,520 --> 01:18:42,640
You know, both in the cold cluster.

702
01:18:47,039 --> 01:18:48,319
Oh, and they're different.

703
01:18:48,319 --> 01:18:50,159
They're in different cold clusters, right?

704
01:18:52,480 --> 01:18:53,439
I'm not sure that matters.

705
01:18:54,560 --> 01:18:55,760
Yeah, actually it doesn't.

706
01:19:01,359 --> 01:19:03,199
Okay.

707
01:19:03,199 --> 01:19:05,899
any

708
01:19:05,899 --> 01:19:17,539
body

709
01:19:18,199 --> 01:19:29,479
here.

710
01:19:29,479 --> 01:19:35,880
Is anybody

711
01:19:47,539 --> 01:19:55,380
I think they mentioned like the holdoff for two seconds.

712
01:19:55,380 --> 01:19:59,539
Though I'm not entirely sure about all the details of that.

713
01:19:59,539 --> 01:20:08,539
Yeah, basically the, this actually causes, they put a hold,

714
01:20:08,539 --> 01:20:12,539
they call this a holdoff or two second holdoff.

715
01:20:13,539 --> 01:20:17,539
On any sets to that key.

716
01:20:17,539 --> 01:20:22,539
So this particular, after you do the lead in the cold cluster,

717
01:20:22,539 --> 01:20:26,539
you can't do any sets to that key for two seconds.

718
01:20:26,539 --> 01:20:31,539
And so this particular foot will be rejected.

719
01:20:31,539 --> 01:20:34,539
And this is only during the warm up to your face, correct?

720
01:20:34,539 --> 01:20:37,539
So when the cluster comes up, it's called, you know,

721
01:20:37,539 --> 01:20:40,539
for a couple hours of runs, you know, to start warming up

722
01:20:40,539 --> 01:20:42,539
and get it's content in place.

723
01:20:42,539 --> 01:20:45,539
And once, you know, sort of the warmed up,

724
01:20:45,539 --> 01:20:47,539
then, you know, they stopped doing this trick.

725
01:20:47,539 --> 01:20:50,539
But basically, you sort of do, you know,

726
01:20:50,539 --> 01:20:53,539
this paste is problem over, they, you know,

727
01:20:53,539 --> 01:20:56,539
think the two seconds is sufficient.

728
01:20:56,539 --> 01:21:00,539
And that's the sufficient for basically that right to do.

729
01:21:00,539 --> 01:21:03,539
Propagate to the cold database, too.

730
01:21:03,539 --> 01:21:08,539
Okay.

731
01:21:08,539 --> 01:21:11,539
Good. There's one more right problem.

732
01:21:11,539 --> 01:21:13,539
As I'll leave you quickly mentioned that because again,

733
01:21:13,539 --> 01:21:15,539
you already mentioned it.

734
01:21:15,539 --> 01:21:18,539
The race number three.

735
01:21:18,539 --> 01:21:19,539
That they talked about in the paper.

736
01:21:19,539 --> 01:21:21,539
And I'm sure they're more, you know, the one they say,

737
01:21:21,539 --> 01:21:23,539
the one that I talked to the paper about.

738
01:21:23,539 --> 01:21:27,539
And this is between regions.

739
01:21:27,539 --> 01:21:29,539
And it has to do with the primary and backup problem,

740
01:21:29,539 --> 01:21:32,539
primary and backup.

741
01:21:32,539 --> 01:21:36,539
And it's sort of a similar problem.

742
01:21:36,539 --> 01:21:45,539
And we're, you know, the client one does right to the database.

743
01:21:45,539 --> 01:21:47,539
The database.

744
01:21:47,539 --> 01:21:49,539
And this is a client in the backup.

745
01:21:49,539 --> 01:21:51,539
So this is a backup client sits in the backup region.

746
01:21:51,539 --> 01:21:55,539
So it doesn't right to the database in the primary region.

747
01:21:55,539 --> 01:21:57,539
So it goes off.

748
01:21:57,539 --> 01:22:02,539
And then those delete.

749
01:22:02,539 --> 01:22:08,539
And so we're going to have a couple of.

750
01:22:08,539 --> 01:22:12,539
And then we'll have the.

751
01:22:12,539 --> 01:22:15,539
Of the K in, of course, the backup region.

752
01:22:15,539 --> 01:22:19,539
For me, it's cash.

753
01:22:19,539 --> 01:22:22,539
And then in principle, it would do immediately.

754
01:22:22,539 --> 01:22:23,539
This is like one of you mentioned this.

755
01:22:23,539 --> 01:22:25,539
Like even me do get that particular K.

756
01:22:25,539 --> 01:22:27,539
Then.

757
01:22:27,539 --> 01:22:31,539
And won't see the.

758
01:22:31,539 --> 01:22:34,539
So we won't see its own.

759
01:22:34,539 --> 01:22:35,539
Right.

760
01:22:35,539 --> 01:22:38,539
Because that right is still on the way to the backup.

761
01:22:38,539 --> 01:22:41,539
Or to the primary, the primary will, you know,

762
01:22:41,539 --> 01:22:43,539
send the through the.

763
01:22:43,539 --> 01:22:44,539
The stick.

764
01:22:44,539 --> 01:22:46,539
SQL thing.

765
01:22:46,539 --> 01:22:49,539
Copy the update to the database in the.

766
01:22:49,539 --> 01:22:50,539
Backup area.

767
01:22:50,539 --> 01:22:52,539
And so only then, you know, again, in the backup,

768
01:22:52,539 --> 01:22:54,539
actually, in the backup area, in the backup region,

769
01:22:54,539 --> 01:22:56,539
we'll actually see the K change.

770
01:22:56,539 --> 01:22:59,539
And so we're, so we have a problem here, right?

771
01:22:59,539 --> 01:23:02,539
So if this K key, K would proceed.

772
01:23:02,539 --> 01:23:04,539
So we got any modifications.

773
01:23:04,539 --> 01:23:07,539
Then we would see not our own rights.

774
01:23:07,539 --> 01:23:13,539
And anybody remember how they solved this problem?

775
01:23:13,539 --> 01:23:16,539
What's the remote marker?

776
01:23:16,539 --> 01:23:17,539
Yeah, absolutely.

777
01:23:17,539 --> 01:23:19,539
It is. So when they delete this K.

778
01:23:19,539 --> 01:23:23,539
K key, are they, you know, they make it, they keep it in the

779
01:23:23,539 --> 01:23:24,539
back.

780
01:23:24,539 --> 01:23:26,539
And so we have a key of the backup.

781
01:23:26,539 --> 01:23:29,539
And market has remote.

782
01:23:29,539 --> 01:23:33,539
And so when this client.

783
01:23:33,539 --> 01:23:37,539
One doesn't get it will see, hey, I'm going to get a,

784
01:23:37,539 --> 01:23:41,539
basically gets remote back from its local.

785
01:23:41,539 --> 01:23:42,539
Mancash.

786
01:23:42,539 --> 01:23:48,539
And then it knows basically to fetch it from the primary.

787
01:23:48,539 --> 01:23:58,539
And then the primary region.

788
01:23:58,539 --> 01:23:59,539
Okay.

789
01:23:59,539 --> 01:24:02,539
But then the remote marker.

790
01:24:02,539 --> 01:24:06,539
Will be removed when it's safe to read from the back.

791
01:24:06,539 --> 01:24:11,539
Yes, I think one of the database, the backup database gets the data

792
01:24:11,539 --> 01:24:12,539
from the primary.

793
01:24:12,539 --> 01:24:17,539
It can remove the marker.

794
01:24:17,539 --> 01:24:20,539
Because then it's safe to read from the primary database.

795
01:24:20,539 --> 01:24:24,539
Over the backup database.

796
01:24:24,539 --> 01:24:27,539
Does that make sense?

797
01:24:27,539 --> 01:24:32,539
Okay, so let me do a quick summary.

798
01:24:32,539 --> 01:24:35,539
And I'm running a little bit over time.

799
01:24:35,539 --> 01:24:42,539
So quick summaries, you know, caching is vital.

800
01:24:42,539 --> 01:24:45,539
They basically get this kind of capacity that we're talking about.

801
01:24:45,539 --> 01:24:49,539
This paper like billions of operations per second.

802
01:24:49,539 --> 01:24:53,539
The sort of two strategies to sort of get this high capacity.

803
01:24:53,539 --> 01:24:58,539
One is petitioning.

804
01:24:58,539 --> 01:25:03,539
Which gives you sort of parallelism or sharding.

805
01:25:03,539 --> 01:25:08,539
And the other strategy is replication, which is really good for hot keys.

806
01:25:08,539 --> 01:25:12,539
Keys that being requested by lots of lots of clients.

807
01:25:12,539 --> 01:25:16,539
So that actually they keep getting replicated the multiple machines.

808
01:25:16,539 --> 01:25:18,539
And.

809
01:25:18,539 --> 01:25:20,539
And you know, what else to see?

810
01:25:20,539 --> 01:25:25,539
The sort of a bunch of sort of almost ad hoc techniques to sort of.

811
01:25:25,539 --> 01:25:33,539
Get around some the serious consistency issues that pop up even if the system is only designed to give a weak consistency.

812
01:25:33,539 --> 01:25:40,539
And so this whole sort of consistency between the database.

813
01:25:40,539 --> 01:25:42,539
And the D.

814
01:25:42,539 --> 01:25:50,539
And cash and then cash is tricky, maybe much more tricky than you might have fought.

815
01:25:50,539 --> 01:25:53,539
Because you know, what could be the problem.

816
01:25:53,539 --> 01:25:56,539
But then as you can see, you know, it's like the period of tricky.

817
01:25:56,539 --> 01:26:03,539
And in fact, there's a quite a bit of research going on trying to figure out like how could you do better?

818
01:26:03,539 --> 01:26:08,539
Okay, with that, I want to conclude that people that need to run can run more.

819
01:26:08,539 --> 01:26:11,539
So we're going to be able to do that.

820
01:26:11,539 --> 01:26:14,539
So I think that's a very good question.

821
01:26:14,539 --> 01:26:16,539
And I'll say around.

822
01:26:16,539 --> 01:26:19,539
And there are any questions if you have any questions remaining.

823
01:26:19,539 --> 01:26:21,539
And otherwise, I'll see you first thing.

824
01:26:21,539 --> 01:26:22,539
Thank you.

825
01:26:22,539 --> 01:26:25,539
Sorry, I have a question about.

826
01:26:25,539 --> 01:26:26,539
So.

827
01:26:26,539 --> 01:26:31,539
For example, for the last thing we talked about with the remote market.

828
01:26:31,539 --> 01:26:34,539
How did they know that this is going to be.

829
01:26:34,539 --> 01:26:36,539
Or relevant data race.

830
01:26:36,539 --> 01:26:45,539
Or how did they decide that it is going to be more useful to do this additional steps of remote marker.

831
01:26:45,539 --> 01:26:48,539
First, they're just getting civil data.

832
01:26:48,539 --> 01:26:55,539
Well, I think that is because they have this requirement right up front, although they, the people didn't really stipulate it very clearly.

833
01:26:55,539 --> 01:26:59,539
They really want this.

834
01:26:59,539 --> 01:27:05,539
And like, for example, you do a user adds something to their timeline.

835
01:27:05,539 --> 01:27:08,539
Read it again, and it's not there.

836
01:27:08,539 --> 01:27:12,539
And so that is a thing that could be observed directly by users.

837
01:27:12,539 --> 01:27:15,539
And strange inconsistency.

838
01:27:15,539 --> 01:27:19,539
They want to avoid that.

839
01:27:19,539 --> 01:27:21,539
Okay, that makes sense.

840
01:27:21,539 --> 01:27:29,539
And my other question was on the one of the first slides where you had invalidation of them.

841
01:27:29,539 --> 01:27:36,539
I had.

842
01:27:36,539 --> 01:27:42,539
Yeah, this is the old age like a little bit wild now.

843
01:27:42,539 --> 01:27:45,539
Oh, no, it was on the later ones.

844
01:27:45,539 --> 01:27:48,539
Well, this is also has invalidation on it.

845
01:27:48,539 --> 01:27:54,539
So, maybe the next one.

846
01:27:54,539 --> 01:27:56,539
Yes, here we go.

847
01:27:56,539 --> 01:28:04,539
Oh, yeah, the client is going to set the invalidation only for its local region.

848
01:28:04,539 --> 01:28:07,539
And the squeal is going to do it.

849
01:28:07,539 --> 01:28:12,539
Yeah, for the transfer and for the non local.

850
01:28:12,539 --> 01:28:14,539
Okay, that makes sense.

851
01:28:14,539 --> 01:28:15,539
Thank you so much.

852
01:28:16,539 --> 01:28:22,539
Professor Anne, to add your final question.

853
01:28:22,539 --> 01:28:25,539
Sorry, sorry.

854
01:28:25,539 --> 01:28:27,539
Yeah, go ahead.

855
01:28:27,539 --> 01:28:33,539
These are after class.

856
01:28:33,539 --> 01:28:43,539
So first, so servers, servers in a region are assigned what when we have clusters each one are assigned to a cluster, right?

857
01:28:43,539 --> 01:28:44,539
Yeah, yeah.

858
01:28:44,539 --> 01:28:48,539
So every every every cluster is really a replica.

859
01:28:48,539 --> 01:28:49,539
Okay, nice.

860
01:28:49,539 --> 01:28:50,539
Yeah.

861
01:28:50,539 --> 01:28:54,539
And like like server size, I'm to one single replica.

862
01:28:54,539 --> 01:28:55,539
Yeah.

863
01:28:55,539 --> 01:28:56,539
Yeah.

864
01:28:56,539 --> 01:28:57,539
Nice.

865
01:28:57,539 --> 01:29:06,539
And then the second one was like straight from the paper and very precise, but it says like, okay, here.

866
01:29:06,539 --> 01:29:17,539
So, in I think generic cash in page two, it says like the new man cash is more a general, you got the store.

867
01:29:17,539 --> 01:29:29,539
And in particular, they say it takes little effort for new services to leverage the existing Marcher infrastructure without the burden tuning, optimizing provisioning and maintaining a large short of lead.

868
01:29:29,539 --> 01:29:35,539
So I wasn't sure and I looked up and I couldn't find what up, like what's existing Marcher infrastructure.

869
01:29:35,539 --> 01:29:37,539
I actually know exactly what they're referring to.

870
01:29:37,539 --> 01:29:38,539
So, okay.

871
01:29:38,539 --> 01:29:39,539
All right.

872
01:29:39,539 --> 01:29:40,539
Cool.

873
01:29:40,539 --> 01:29:41,539
Thanks.

874
01:29:41,539 --> 01:29:42,539
Yeah.

875
01:29:42,539 --> 01:29:43,539
All right.

876
01:29:43,539 --> 01:29:44,539
Nice.

877
01:29:44,539 --> 01:29:48,539
See you.

878
01:29:48,539 --> 01:29:54,539
I want to pull up on a question that I think will you mask about a certain failure mode.

879
01:29:54,539 --> 01:29:59,539
If I'm in cash, the server fails.

880
01:29:59,539 --> 01:30:00,539
I think there was a diet.

881
01:30:00,539 --> 01:30:02,539
I'm trying to think which slide would be helpful.

882
01:30:02,539 --> 01:30:03,539
Look at.

883
01:30:03,539 --> 01:30:05,539
Um,

884
01:30:05,539 --> 01:30:10,539
Oh, maybe that one, the one you were just.

885
01:30:10,539 --> 01:30:15,539
Just anything that kind of shows them I'm cash the overall system diagram, I guess.

886
01:30:15,539 --> 01:30:16,539
Okay.

887
01:30:16,539 --> 01:30:18,539
Well, multiple doors.

888
01:30:18,539 --> 01:30:22,539
But this is the one basically you think about as a single cluster if you will.

889
01:30:22,539 --> 01:30:23,539
Yeah.

890
01:30:23,539 --> 01:30:24,539
Okay.

891
01:30:24,539 --> 01:30:25,539
Yeah.

892
01:30:25,539 --> 01:30:26,539
Yeah.

893
01:30:26,539 --> 01:30:27,539
Okay.

894
01:30:27,539 --> 01:30:31,539
We could look at another one, but I think this is sort of probably good enough.

895
01:30:31,539 --> 01:30:33,539
Yeah, I think this is, this is good.

896
01:30:33,539 --> 01:30:36,539
Yeah, I think his question was.

897
01:30:36,539 --> 01:30:38,539
So.

898
01:30:38,539 --> 01:30:39,539
Shoot.

899
01:30:39,539 --> 01:30:41,539
I tried to get rid of it.

900
01:30:41,539 --> 01:30:46,539
But it was something about like if a client, if a front end writes.

901
01:30:46,539 --> 01:30:48,539
Yeah.

902
01:30:48,539 --> 01:30:52,539
If a client writes to its memcash do server.

903
01:30:52,539 --> 01:30:55,539
And that memcash do server crashes.

904
01:30:55,539 --> 01:31:00,539
And then the client immediately tries to switch his presumably switches to another memcash do server.

905
01:31:00,539 --> 01:31:02,539
And then reads it again.

906
01:31:02,539 --> 01:31:07,539
What mechanism makes sure it doesn't see that it's seen the result of its previous right.

907
01:31:07,539 --> 01:31:12,539
I think what happens is we probably go through the gunner.

908
01:31:12,539 --> 01:31:13,539
Okay.

909
01:31:13,539 --> 01:31:18,539
We're going to memcash the fails correct that client will get a no response back.

910
01:31:18,539 --> 01:31:25,539
And when that no response comes back, it actually goes through the gunner, which has nothing in it.

911
01:31:25,539 --> 01:31:27,539
Probably in the first try.

912
01:31:27,539 --> 01:31:31,539
And we'll read it from whatever database.

913
01:31:31,539 --> 01:31:33,539
Okay, okay.

914
01:31:33,539 --> 01:31:35,539
That makes sense.

915
01:31:35,539 --> 01:31:39,539
And it's a little bit unclear exactly what happens when a new machine gets at it.

916
01:31:39,539 --> 01:31:42,539
And then we're going to talk a lot about it in the paper.

917
01:31:42,539 --> 01:31:52,539
But I presume this is actually because this is the hatching part where keys will sort of be automatically shipped it from one machine to another.

918
01:31:52,539 --> 01:31:54,539
I guess.

919
01:31:54,539 --> 01:31:57,539
Would it if there were multiple clusters.

920
01:31:57,539 --> 01:31:59,539
Wouldn't it not.

921
01:31:59,539 --> 01:32:01,539
Maybe I just need to reread about the gutter.

922
01:32:01,539 --> 01:32:04,539
But wouldn't it potentially shift to another memcash be in the.

923
01:32:04,539 --> 01:32:05,539
Oh, actually, it would.

924
01:32:05,539 --> 01:32:10,539
And then it always when a get fails to climb go through the gutter.

925
01:32:10,539 --> 01:32:11,539
Right.

926
01:32:11,539 --> 01:32:12,539
Okay. Yeah.

927
01:32:12,539 --> 01:32:16,539
These clusters are kind of self contains different and then the memcash.

928
01:32:16,539 --> 01:32:17,539
Okay.

929
01:32:17,539 --> 01:32:18,539
Okay. That makes.

930
01:32:18,539 --> 01:32:19,539
Yeah. That makes perfect sense.

931
01:32:19,539 --> 01:32:20,539
All right.

932
01:32:20,539 --> 01:32:21,539
Thank you.

933
01:32:21,539 --> 01:32:22,539
Follow up on that.

934
01:32:22,539 --> 01:32:23,539
Follow up on that.

935
01:32:23,539 --> 01:32:28,539
When it falls back to the gutter, what is like two different clusters.

936
01:32:28,539 --> 01:32:30,539
Their memcash server fails at the same time.

937
01:32:30,539 --> 01:32:32,539
And so they both go to the gutter.

938
01:32:32,539 --> 01:32:35,539
And now doing like concurrent rights to the gutter.

939
01:32:35,539 --> 01:32:41,539
How do we ensure that those rights don't go out of order.

940
01:32:41,539 --> 01:32:44,539
You know, they do sets, correct.

941
01:32:44,539 --> 01:32:55,539
And the rights always go to the database to the primary and the primary orders all of them.

942
01:32:55,539 --> 01:32:58,539
I think rights are always ordered.

943
01:32:58,539 --> 01:33:02,539
And the only thing that, you know, the.

944
01:33:02,539 --> 01:33:08,539
Clients, my due is, you know, set the value in or put a value into the kV server.

945
01:33:08,539 --> 01:33:13,539
But then they have done that after they've read from the database.

946
01:33:13,539 --> 01:33:18,539
Right. So what if someone's like doing a they do a read.

947
01:33:18,539 --> 01:33:21,539
And then they're setting it into the database.

948
01:33:21,539 --> 01:33:24,539
But like, let's say two different clusters fail.

949
01:33:24,539 --> 01:33:33,539
And then I'm not sure if this possible actually, but let's say like one cluster one first reads from a key gets back the value.

950
01:33:33,539 --> 01:33:35,539
And then there's a right in between.

951
01:33:35,539 --> 01:33:40,539
And then the second cluster then reads and then they both try to put into the memcash servers.

952
01:33:40,539 --> 01:33:42,539
But.

953
01:33:42,539 --> 01:33:45,539
But let's say those service fail.

954
01:33:45,539 --> 01:33:47,539
Yeah, maybe, maybe.

955
01:33:47,539 --> 01:33:48,539
Good question.

956
01:33:48,539 --> 01:33:51,539
I think there's all kinds of little corner cases that they're actually not the scripted case.

957
01:33:51,539 --> 01:34:00,539
I think maybe leases will help out because the server you're going to set to doesn't have the lease for the.

958
01:34:00,539 --> 01:34:05,539
The first line we did again got a lease back, correct, to do the set.

959
01:34:05,539 --> 01:34:14,539
And if you're in the meantime, the service gets replaced, the replacement server does not know that actually the lease was granted.

960
01:34:14,539 --> 01:34:18,539
And so we'll reject the set.

961
01:34:18,539 --> 01:34:20,539
I'm just speculating.

962
01:34:20,539 --> 01:34:21,539
Okay.

963
01:34:21,539 --> 01:34:25,539
Yeah, so for the gutter, how does that control leases there?

964
01:34:25,539 --> 01:34:27,539
I don't know.

965
01:34:27,539 --> 01:34:28,539
Oh, okay.

966
01:34:28,539 --> 01:34:29,539
I see.

967
01:34:29,539 --> 01:34:30,539
Sorry.

968
01:34:30,539 --> 01:34:36,539
I can speculate, but they can all you know, you know, surely I don't know.

969
01:34:36,539 --> 01:34:39,539
Well, would you say if you hadn't speculated?

970
01:34:39,539 --> 01:34:43,539
Well, I would first have to go sit down and think of a little bit about it.

971
01:34:43,539 --> 01:34:45,539
Okay, that makes sense.

972
01:34:45,539 --> 01:34:47,539
Thank you.

973
01:34:48,539 --> 01:34:57,539
A bit of a tangential question, which is how it was really cool that they're using UDP for the get requests and the TCP for the others.

974
01:34:57,539 --> 01:34:59,539
And I was wondering like, how common that is.

975
01:34:59,539 --> 01:35:02,539
Is that like a very standard thing to do?

976
01:35:02,539 --> 01:35:06,539
Yes, yes, no.

977
01:35:06,539 --> 01:35:08,539
It is.

978
01:35:08,539 --> 01:35:14,539
I can people prefer in general to use TCP because it will provide July bill, be ordering and all the great stuff.

979
01:35:14,539 --> 01:35:21,539
And there's real overheads with it, you know, like the, you know, the statement needs to maintain per connections, per connection.

980
01:35:21,539 --> 01:35:23,539
And so there's always a little bit of a struggle.

981
01:35:23,539 --> 01:35:30,539
Like when we see in a lot of incoming out of TCP connection or a lot of out of bill connections, that always causes problems.

982
01:35:30,539 --> 01:35:38,539
And in the default, you know, if you run it that problem is to basically do you the tech stuff.

983
01:35:38,539 --> 01:35:41,539
And so this isn't like novel from this paper.

984
01:35:41,539 --> 01:35:45,539
No, I was not able to.

985
01:35:45,539 --> 01:35:50,539
Some people like to roll their own sort of like reliably transport protocol over UDP.

986
01:35:50,539 --> 01:35:52,539
Like quick.

987
01:35:52,539 --> 01:35:55,539
Yeah, example.

988
01:35:55,539 --> 01:36:02,539
Yeah, because they mentioned they also do like sequence numbers.

989
01:36:02,539 --> 01:36:10,539
But zoom with it and maintain congestion windows and all the other scaling and all the other TCP features that these P has.

990
01:36:10,539 --> 01:36:12,539
Thank you.

991
01:36:12,539 --> 01:36:18,539
You're welcome.

992
01:36:18,539 --> 01:36:20,539
Another oops, sorry.

993
01:36:20,539 --> 01:36:25,539
Go ahead.

994
01:36:25,539 --> 01:36:33,539
Okay, I guess I just wanted to quickly ask about kind of the replication between the different clusters.

995
01:36:33,539 --> 01:36:36,539
But basically they don't do any formal replication.

996
01:36:36,539 --> 01:36:38,539
Yeah, correctly.

997
01:36:38,539 --> 01:36:39,539
Well, yeah, there.

998
01:36:39,539 --> 01:36:41,539
No, well, yes and no, right?

999
01:36:41,539 --> 01:36:45,539
Because you know, the database need to be updated.

1000
01:36:45,539 --> 01:36:46,539
Hold on, hold on.

1001
01:36:46,539 --> 01:36:48,539
When I let me actually go back and see.

1002
01:36:48,539 --> 01:36:51,539
Make sure I, you know what you're talking about.

1003
01:36:51,539 --> 01:36:54,539
Let's see cluster.

1004
01:36:54,539 --> 01:36:57,539
Yeah, there's no real replication going on between the clusters, right?

1005
01:36:57,539 --> 01:37:01,539
Because there's one single storage layer.

1006
01:37:01,539 --> 01:37:10,539
Right. And so they're, are they're kind of like depending on these leases to keep the caches up to they are.

1007
01:37:10,539 --> 01:37:13,539
Every cluster is completely independent.

1008
01:37:13,539 --> 01:37:16,539
Right, they have nothing to do with each other.

1009
01:37:16,539 --> 01:37:20,539
And user are divided over these clusters.

1010
01:37:20,539 --> 01:37:23,539
And so when user talks to one cluster.

1011
01:37:23,539 --> 01:37:28,539
And then, you know, within the cluster, you know, they use leases.

1012
01:37:28,539 --> 01:37:31,539
Where.

1013
01:37:31,539 --> 01:37:36,539
And those database invalidates leases and keys.

1014
01:37:36,539 --> 01:37:37,539
Right.

1015
01:37:37,539 --> 01:37:38,539
Okay. Yeah.

1016
01:37:38,539 --> 01:37:41,539
So it's like the squeal in the storage.

1017
01:37:41,539 --> 01:37:44,539
Yeah, all the rights basically in and just go through the store.

1018
01:37:44,539 --> 01:37:45,539
Correct.

1019
01:37:45,539 --> 01:37:49,539
All rights go through here.

1020
01:37:49,539 --> 01:37:51,539
And they get ordered.

1021
01:37:51,539 --> 01:37:57,539
And you know, they pop out as the validation message.

1022
01:37:57,539 --> 01:38:03,539
Pot it. Thank you.

1023
01:38:03,539 --> 01:38:05,539
Yeah, go ahead.

1024
01:38:05,539 --> 01:38:06,539
Yeah.

1025
01:38:06,539 --> 01:38:10,539
So, a potential question.

1026
01:38:10,539 --> 01:38:15,539
And I guess I'm not sure this is because of the way we've kind of presented papers in the class.

1027
01:38:15,539 --> 01:38:19,539
But it kind of seems like.

1028
01:38:19,539 --> 01:38:24,539
Um, the way these systems are developed is like, okay, we have like.

1029
01:38:24,539 --> 01:38:27,539
These systems like our needs are continuing to scale.

1030
01:38:27,539 --> 01:38:31,539
So let's like, maybe this is also not an accurate representation.

1031
01:38:31,539 --> 01:38:34,539
But it sounds like let's add another layer.

1032
01:38:34,539 --> 01:38:38,539
To kind of handle this float or the kind of, you know, cash something or.

1033
01:38:38,539 --> 01:38:41,539
Add another layer complexity on top of it.

1034
01:38:41,539 --> 01:38:44,539
And then we're going to have to make a real problem.

1035
01:38:44,539 --> 01:38:47,539
And then we're going to have to make a real problem.

1036
01:38:47,539 --> 01:38:50,539
And then we're going to have to make a real problem.

1037
01:38:50,539 --> 01:38:51,539
Fair.

1038
01:38:51,539 --> 01:38:54,539
The state at like system development has generally been like.

1039
01:38:54,539 --> 01:38:58,539
Let's just add another layer to kind of deal with.

1040
01:38:58,539 --> 01:38:59,539
Yes, I know.

1041
01:38:59,539 --> 01:39:02,539
I think the, the, the, the standard system took a very pragmatic approach.

1042
01:39:02,539 --> 01:39:05,539
You know, figure out like, and I'll run into a real problem.

1043
01:39:05,539 --> 01:39:07,539
And it's all the real problem.

1044
01:39:07,539 --> 01:39:09,539
And basically you think about it.

1045
01:39:09,539 --> 01:39:10,539
I think it's pretty impressive.

1046
01:39:10,539 --> 01:39:12,539
And again, this kind of performance.

1047
01:39:12,539 --> 01:39:14,539
And they've lost the shelf components.

1048
01:39:14,539 --> 01:39:15,539
Right.

1049
01:39:15,539 --> 01:39:18,539
The, the, the, the, the, absolutely people also go back once in the wild.

1050
01:39:18,539 --> 01:39:22,539
It's like, okay, how would I design a system to get better performance.

1051
01:39:22,539 --> 01:39:27,539
And don't, for example, have this inconsistencies between the database and the cash.

1052
01:39:27,539 --> 01:39:32,539
And, you know, and actually turned out to be a recent problem.

1053
01:39:32,539 --> 01:39:34,539
Because people haven't really figured out how to do that.

1054
01:39:34,539 --> 01:39:38,539
And then so you'll see recent research papers that describe alternative solutions.

1055
01:39:39,539 --> 01:39:42,539
For new components of a solution because on, you know,

1056
01:39:42,539 --> 01:39:47,539
any of the proposal I know off, you know, cannot support a building operation for a second.

1057
01:39:47,539 --> 01:39:50,539
Yeah, right.

1058
01:39:50,539 --> 01:39:52,539
Okay, that's interesting.

1059
01:39:52,539 --> 01:39:53,539
Thank you.

1060
01:39:53,539 --> 01:39:55,539
Yeah, this is fascinating stuff.

1061
01:39:55,539 --> 01:39:59,539
It's like a real world system design.

1062
01:39:59,539 --> 01:40:01,539
I have a little more question if you don't mind.

1063
01:40:01,539 --> 01:40:02,539
Yeah, go ahead.

1064
01:40:02,539 --> 01:40:07,539
So in the design here where they roughly across different regions.

1065
01:40:07,539 --> 01:40:16,539
So sorry, just to clarify, when the first clarification question I have is when they replicate against different regions, each region has like a bunch of internal clusters, right?

1066
01:40:16,539 --> 01:40:17,539
Yes, yes.

1067
01:40:17,539 --> 01:40:25,539
And then my follow up questions that is it seems like everything is, yeah, everything's hitting the primary storage.

1068
01:40:25,539 --> 01:40:31,539
If let's say we wanted to scale up so that we didn't have all the rights hitting the primary storage.

1069
01:40:31,539 --> 01:40:34,539
How would you like go about designing.

1070
01:40:34,539 --> 01:40:39,539
Yeah, my suspicion is that they're actually the design is correct.

1071
01:40:39,539 --> 01:40:42,539
Okay, so there's a bunch of point of that.

1072
01:40:42,539 --> 01:40:47,539
There's a whole other paper on this topic about actually how to do the replication.

1073
01:40:47,539 --> 01:40:50,539
So this is not the only Facebook paper on scaling things up.

1074
01:40:50,539 --> 01:40:54,539
There's a system that was published in 2015 or wormhole.

1075
01:40:54,539 --> 01:41:00,539
We're, you know, they have a scalable design to propagate these rights.

1076
01:41:00,539 --> 01:41:16,539
My suspicion is also that they will or half shark the users to particular regions and make some regions the primary for those users.

1077
01:41:16,539 --> 01:41:20,539
I see. So they assign different regions, primaries with different shards.

1078
01:41:20,539 --> 01:41:21,539
Yeah, I think so.

1079
01:41:21,539 --> 01:41:24,539
That's why I would do more trying to do.

1080
01:41:24,539 --> 01:41:27,539
And I'm speculating here.

1081
01:41:27,539 --> 01:41:35,539
Would it be a wise position to do like a consensus protocol across the storage layers or would that just be like too high.

1082
01:41:35,539 --> 01:41:36,539
You could do that.

1083
01:41:36,539 --> 01:41:39,539
Like what would spend our does not correct.

1084
01:41:39,539 --> 01:41:40,539
Right.

1085
01:41:40,539 --> 01:41:43,539
And how fast is better.

1086
01:41:43,539 --> 01:41:45,539
Pretty fast.

1087
01:41:45,539 --> 01:41:48,539
Maybe we're back into it back into the table.

1088
01:41:48,539 --> 01:41:51,539
How many transactions per second could you do?

1089
01:41:51,539 --> 01:41:54,539
I do not remember the exact number.

1090
01:41:54,539 --> 01:41:57,539
I think about 100.

1091
01:41:57,539 --> 01:42:01,539
Oh, affect effect for I think why do you tend.

1092
01:42:01,539 --> 01:42:04,539
Right. This is for right transactions. Right.

1093
01:42:04,539 --> 01:42:09,539
Yeah. Right. Right. Right. The right transactions are very slow.

1094
01:42:09,539 --> 01:42:12,539
Yeah.

1095
01:42:12,539 --> 01:42:13,539
Sorry.

1096
01:42:13,539 --> 01:42:18,539
I think I realized that I did not understand race one.

1097
01:42:18,539 --> 01:42:22,539
Okay. Let me see if I can replicate it.

1098
01:42:22,539 --> 01:42:27,539
Yeah, let's see where we raise one.

1099
01:42:27,539 --> 01:42:32,539
I think I'm just confused what is V2.

1100
01:42:32,539 --> 01:42:36,539
V2 is this right.

1101
01:42:36,539 --> 01:42:42,539
Okay.

1102
01:42:42,539 --> 01:42:51,539
And the problem is that it is like wedged in between the first one.

1103
01:42:51,539 --> 01:42:54,539
Okay.

1104
01:42:54,539 --> 01:42:57,539
Okay.

1105
01:42:57,539 --> 01:43:03,539
So, but we wanted it to be deleted so that the next person can read.

1106
01:43:03,539 --> 01:43:07,539
Well, I think the database, but now it's there with the old value.

1107
01:43:07,539 --> 01:43:10,539
Yeah. So basically we have a permanent stay with out really the issues.

1108
01:43:10,539 --> 01:43:13,539
Dispermanent business.

1109
01:43:13,539 --> 01:43:17,539
We're permanent between quotes. Right. Because it's a cash.

1110
01:43:17,539 --> 01:43:26,539
So, you know, this, this, this, put that came after, you know, basically the K being K the K K,

1111
01:43:26,539 --> 01:43:32,539
like K being updated to V2. So we have K to here really. Right. That's what the right value should be.

1112
01:43:32,539 --> 01:43:36,539
And here, actually, this is even so let's say this is one.

1113
01:43:36,539 --> 01:43:43,539
What we've done here is we actually put a K one in after.

1114
01:43:43,539 --> 01:43:47,539
And that's just not the right thing.

1115
01:43:47,539 --> 01:43:48,539
Okay.

1116
01:43:48,539 --> 01:43:52,539
Everybody that comes after now and does get on K. Great.

1117
01:43:52,539 --> 01:43:55,539
It's going to get one back instead of two.

1118
01:43:55,539 --> 01:43:56,539
Okay. That makes sense.

1119
01:43:56,539 --> 01:44:00,539
Including client to which is going to be bizarre.

1120
01:44:00,539 --> 01:44:04,539
Right. Right. Okay. That makes sense. Thank you so much.

1121
01:44:04,539 --> 01:44:05,539
You're welcome.

1122
01:44:05,539 --> 01:44:10,539
I'm in the part in the beginning about the evolution was also pretty helpful.

1123
01:44:10,539 --> 01:44:13,539
Okay. Good. Good. Thank you so much.

1124
01:44:13,539 --> 01:44:14,539
You're welcome.

