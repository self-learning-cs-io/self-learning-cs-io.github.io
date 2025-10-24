---
title: CS144 NetworkP1409 6BGPPuttingtheInterinInternetProfessorJenniferRexfordPrinceton
---

1
00:00:00,000 --> 00:00:08,279
influence on the way that AT&T used and deployed BGP and routing in its network.

2
00:00:08,279 --> 00:00:09,640
Since she's been a Princeton,

3
00:00:09,640 --> 00:00:12,000
has done a lot of research in routing,

4
00:00:12,000 --> 00:00:13,919
inter-domain routing, BGP,

5
00:00:13,919 --> 00:00:16,320
and laid some of the groundwork for what we now know as

6
00:00:16,320 --> 00:00:19,359
software-defined networking through her work on 40.

7
00:00:19,359 --> 00:00:21,120
Hi, Jen. How you doing?

8
00:00:21,120 --> 00:00:22,640
Yeah, I'm about yourself.

9
00:00:22,640 --> 00:00:27,920
This is one of the interviews that we're doing for

10
00:00:27,920 --> 00:00:31,480
the online class at Stanford called CS144,

11
00:00:31,480 --> 00:00:33,440
an introduction to computer networks.

12
00:00:33,440 --> 00:00:37,520
This is the first of the interviews that we're doing using Hangout.

13
00:00:37,520 --> 00:00:38,920
We're going to see how this goes.

14
00:00:38,920 --> 00:00:42,480
Excuse us if we get some of the technicalities a little bit wrong.

15
00:00:42,480 --> 00:00:45,120
I wanted to ask you a question to start with.

16
00:00:45,120 --> 00:00:48,840
Can you give us just as a brief history of BGP,

17
00:00:48,840 --> 00:00:51,320
how it came about, what were the basic ideas,

18
00:00:51,320 --> 00:00:53,840
and why it's lasted so long?

19
00:00:54,240 --> 00:00:56,840
BGP is essentially the glue that holds

20
00:00:56,840 --> 00:00:58,640
the disparate parts of the internet together.

21
00:00:58,640 --> 00:01:01,520
It grew up hand in hand with the internet.

22
00:01:01,520 --> 00:01:05,000
When the ARP-NET was running in the 80s,

23
00:01:05,000 --> 00:01:07,439
there was really one core network,

24
00:01:07,439 --> 00:01:09,359
the ARP-NET itself, and a lot of other networks

25
00:01:09,359 --> 00:01:10,640
that connected to it.

26
00:01:10,640 --> 00:01:12,960
There wasn't really a need for a sophisticated

27
00:01:12,960 --> 00:01:14,200
inter-domain routing protocol.

28
00:01:14,200 --> 00:01:16,120
The network was essentially a tree.

29
00:01:16,120 --> 00:01:18,640
Once the NSF-NET was being commissioned,

30
00:01:18,640 --> 00:01:21,280
there was a need to support much more flexible ways

31
00:01:21,280 --> 00:01:22,920
for networks to connect to one another.

32
00:01:22,920 --> 00:01:24,879
In particular, networks might connect to each other,

33
00:01:24,879 --> 00:01:26,920
not only to the NSF-NET backbone.

34
00:01:26,920 --> 00:01:29,359
It became necessary to deal with loops,

35
00:01:29,359 --> 00:01:32,079
because the topologies were now potentially cyclic.

36
00:01:32,079 --> 00:01:33,920
BGP was designed to support routing

37
00:01:33,920 --> 00:01:36,320
on more general topologies.

38
00:01:36,320 --> 00:01:38,560
Over time, it's really grown along with the internet

39
00:01:38,560 --> 00:01:40,280
to have to grapple with a lot of issues,

40
00:01:40,280 --> 00:01:43,760
dealing with scaleability, running out of address space,

41
00:01:43,760 --> 00:01:45,760
having a large number of address blocks

42
00:01:45,760 --> 00:01:48,280
that have to be carried within the protocol.

43
00:01:48,280 --> 00:01:50,520
It has also grown as the business relationships

44
00:01:50,520 --> 00:01:52,200
between domains and the services

45
00:01:52,200 --> 00:01:55,560
that providers want to offer to their customers have evolved.

46
00:01:55,560 --> 00:01:58,040
Now there's much more of a need years later

47
00:01:58,040 --> 00:02:00,560
to be able to allow a service provider to pick one path

48
00:02:00,560 --> 00:02:02,640
that might be longer than another,

49
00:02:02,640 --> 00:02:04,680
because it might be economically advantageous.

50
00:02:04,680 --> 00:02:07,040
Maybe it's cheaper, maybe it has better performance

51
00:02:07,040 --> 00:02:08,680
despite being longer.

52
00:02:08,680 --> 00:02:10,800
Similarly, for providers to offer services

53
00:02:10,800 --> 00:02:12,280
like virtual private networks,

54
00:02:12,280 --> 00:02:14,680
that don't even connect to the internet at all.

55
00:02:14,680 --> 00:02:17,480
We've seen over time BGP adapt in many ways

56
00:02:17,480 --> 00:02:20,280
to address both of those kinds of concerns.

57
00:02:20,280 --> 00:02:21,879
So when you look at BGP now,

58
00:02:21,879 --> 00:02:24,599
what do you think of its main good and bad attributes?

59
00:02:24,599 --> 00:02:27,599
What are its strengths and weaknesses?

60
00:02:27,599 --> 00:02:30,120
So basically, anything that makes the internet the internet,

61
00:02:30,120 --> 00:02:31,439
which is essentially what BGP does,

62
00:02:31,439 --> 00:02:33,560
is sort of puts the internet in internet,

63
00:02:33,560 --> 00:02:37,280
has to reconcile the competing and conflicting goals

64
00:02:37,280 --> 00:02:38,560
of the different service providers

65
00:02:38,560 --> 00:02:40,080
and other parties that connect to the network.

66
00:02:40,080 --> 00:02:43,240
So no matter what we do, whether it's BGP or something else,

67
00:02:43,240 --> 00:02:44,759
something has to actually reconcile

68
00:02:44,759 --> 00:02:47,800
that there is no global agreement on what paths are good,

69
00:02:47,800 --> 00:02:49,759
or even which paths should be made available

70
00:02:49,759 --> 00:02:51,359
from one domain to another.

71
00:02:51,359 --> 00:02:54,039
And so in that sense, BGP solving a very difficult problem,

72
00:02:54,039 --> 00:02:55,879
and it is at least a viable solution to it.

73
00:02:55,879 --> 00:02:58,759
And it's been remarkably able to adapt over time

74
00:02:58,759 --> 00:03:00,759
to address exactly the security,

75
00:03:00,759 --> 00:03:04,000
scalability concerns, the concerns about business relationships

76
00:03:04,000 --> 00:03:07,599
and even security concerns that have arisen as you've

77
00:03:07,599 --> 00:03:10,199
tried to move the internet from a research network,

78
00:03:10,199 --> 00:03:13,079
essentially a research experiment that escaped from the lab

79
00:03:13,079 --> 00:03:16,879
into something that actually is a global commercial enterprise.

80
00:03:16,879 --> 00:03:17,799
So that's all good.

81
00:03:17,799 --> 00:03:19,560
It has managed to weather the storm,

82
00:03:19,560 --> 00:03:22,680
but it is hard to make scale.

83
00:03:22,680 --> 00:03:23,960
It's complex to configure.

84
00:03:23,960 --> 00:03:26,800
In fact, the protocol itself is in some ways pretty simple.

85
00:03:26,800 --> 00:03:28,640
I advertise paths to my neighbors.

86
00:03:28,640 --> 00:03:30,960
They add themselves to the beginning of the path.

87
00:03:30,960 --> 00:03:32,199
They pick the path they like best

88
00:03:32,199 --> 00:03:34,159
and advertise it onward to their neighbors.

89
00:03:34,159 --> 00:03:36,319
So it's pretty simple, but all the action

90
00:03:36,319 --> 00:03:38,199
is in how BGP is configured.

91
00:03:38,199 --> 00:03:40,400
And that's one of the reasons BGP is hard to teach,

92
00:03:40,400 --> 00:03:41,960
because if you look at the protocol spec

93
00:03:41,960 --> 00:03:45,680
or even a textbook about BGP, it mainly just captures that

94
00:03:45,680 --> 00:03:49,240
hop by hop, path-based dissemination of routing information

95
00:03:49,240 --> 00:03:52,120
and says very little about how configuration is done.

96
00:03:52,120 --> 00:03:53,800
So it's a pretty steep learning curve.

97
00:03:53,800 --> 00:03:57,960
People make mistakes and configuring BGP out of Naivete

98
00:03:57,960 --> 00:04:01,640
and out of fairly low-level group configuration mechanisms

99
00:04:01,640 --> 00:04:02,360
and the routers.

100
00:04:02,360 --> 00:04:06,840
And so we see lots of outages just caused by operator error.

101
00:04:06,840 --> 00:04:09,680
A really good example was a number of years ago.

102
00:04:09,680 --> 00:04:12,840
Pakistan Telecom was trying to block access to YouTube

103
00:04:12,840 --> 00:04:15,200
within Pakistan and accidentally blocked it

104
00:04:15,200 --> 00:04:18,759
for the entire world by announcing that they were the best way

105
00:04:18,759 --> 00:04:20,399
to reach YouTube.

106
00:04:20,399 --> 00:04:22,360
And everybody on the internet believed it.

107
00:04:22,360 --> 00:04:24,759
So BGP is definitely vulnerable to these sort of butterfly

108
00:04:24,759 --> 00:04:27,879
effects, where a small failure or a small configuration

109
00:04:27,879 --> 00:04:29,199
mistake in one part of the internet

110
00:04:29,199 --> 00:04:31,959
can have these pretty significant global consequences

111
00:04:31,959 --> 00:04:33,680
to the extent that people might not be

112
00:04:33,680 --> 00:04:35,639
able to watch videos of cats flushing toilets

113
00:04:35,639 --> 00:04:38,120
for multiple hours at a time.

114
00:04:38,120 --> 00:04:40,920
So from that point of view, it wasn't really designed

115
00:04:40,920 --> 00:04:44,399
to be a robust and secure protocol that one might want

116
00:04:44,399 --> 00:04:48,480
for a critical infrastructure like the internet is become.

117
00:04:49,000 --> 00:04:52,720
We always hear stories of attackers being

118
00:04:52,720 --> 00:04:55,520
able to sort of surreptitiously advertise a route,

119
00:04:55,520 --> 00:04:59,280
or there's the potential for it through a BGP hearing session

120
00:04:59,280 --> 00:05:03,840
and therefore be able to subvert the routing that takes place.

121
00:05:03,840 --> 00:05:05,680
Do you think that this happens a lot in practice?

122
00:05:05,680 --> 00:05:08,280
This is a common way to attack the network?

123
00:05:08,280 --> 00:05:11,120
So I think in practice a lot of the bad guys on the internet

124
00:05:11,120 --> 00:05:13,080
actually want the internet to stay up,

125
00:05:13,080 --> 00:05:14,480
because what they're actually trying to do

126
00:05:14,480 --> 00:05:16,280
is either launch a denial of service attack

127
00:05:16,280 --> 00:05:18,439
on a particular victim or to do a fishing

128
00:05:18,879 --> 00:05:19,879
attack.

129
00:05:19,879 --> 00:05:21,399
So I think in general most of the bad guys don't want the

130
00:05:21,399 --> 00:05:23,800
don't want BGP to go down.

131
00:05:23,800 --> 00:05:26,600
A second reason it might not happen a lot is that

132
00:05:26,600 --> 00:05:29,839
adversaries often don't have access to a BGP speaking router

133
00:05:29,839 --> 00:05:32,279
of their own to be able to manipulate or just don't have

134
00:05:32,279 --> 00:05:33,800
the skill set to do it.

135
00:05:33,800 --> 00:05:35,639
So I would certainly say it's not as prevalent

136
00:05:35,639 --> 00:05:38,480
as some of the other forms of cyber attacks we see

137
00:05:38,480 --> 00:05:39,399
on the internet.

138
00:05:39,399 --> 00:05:41,959
That said, we see several times a year of very high profile

139
00:05:41,959 --> 00:05:45,959
outages caused sometimes by operator error, sometimes in

140
00:05:45,959 --> 00:05:48,079
sometimes in ways where it may not be clear if it's actually

141
00:05:48,079 --> 00:05:49,680
intentional or an accident.

142
00:05:49,680 --> 00:05:51,120
So it's certainly a huge vulnerability.

143
00:05:51,120 --> 00:05:54,839
And when it does fail can have much more global consequences

144
00:05:54,839 --> 00:05:56,639
than an attack on a single victim might.

145
00:05:56,639 --> 00:05:57,639
Yes.

146
00:05:57,639 --> 00:05:59,560
So I think it's still a big security concern,

147
00:05:59,560 --> 00:06:02,639
but arguably it's not as prevalent as some of the more

148
00:06:02,639 --> 00:06:04,919
targeted forms of attack we see on end hosts.

149
00:06:04,919 --> 00:06:06,079
Right.

150
00:06:06,079 --> 00:06:09,639
So one of the limitations that's often cited of the way

151
00:06:09,639 --> 00:06:13,639
that the path vector is transmitted or advertised to neighbors

152
00:06:13,639 --> 00:06:17,680
is that of course when someone when a peer

153
00:06:17,680 --> 00:06:20,599
advertises a path to me, I don't know whether they're

154
00:06:20,599 --> 00:06:22,959
actually going to follow that path.

155
00:06:22,959 --> 00:06:25,279
The second thing is they're choosing amongst the many paths

156
00:06:25,279 --> 00:06:28,959
that they can advertise to me, which one they want to

157
00:06:28,959 --> 00:06:29,680
advertise to me.

158
00:06:29,680 --> 00:06:31,759
And so there may be alternatives that I would prefer

159
00:06:31,759 --> 00:06:33,719
that they don't even tell me about.

160
00:06:33,719 --> 00:06:38,399
So is this a big limitation in practice?

161
00:06:38,399 --> 00:06:42,199
Or is this just the concern of the sort of the academicians?

162
00:06:42,199 --> 00:06:44,240
I think it's some mode of a concern in practice

163
00:06:44,240 --> 00:06:47,719
in that it may very well be that a customer of an ISP

164
00:06:47,719 --> 00:06:50,199
would like to pick a path that avoids a particular country

165
00:06:50,199 --> 00:06:52,519
that might do wiretapping or censorship.

166
00:06:52,519 --> 00:06:54,680
There's a really good example where you may want to pick paths

167
00:06:54,680 --> 00:06:57,120
that avoid a particular intermediate domain.

168
00:06:57,120 --> 00:06:59,839
And they're not able to do so because maybe all of your providers

169
00:06:59,839 --> 00:07:02,240
have neglected to offer you such a path,

170
00:07:02,240 --> 00:07:03,319
even though there might be one that

171
00:07:03,319 --> 00:07:05,079
exists on the actual graph.

172
00:07:05,079 --> 00:07:07,039
And there can also be cases because routing decisions

173
00:07:07,039 --> 00:07:10,240
aren't based on performance that there might be a path

174
00:07:10,240 --> 00:07:12,199
with really good performance that's actually available

175
00:07:12,199 --> 00:07:14,079
on the graph that you don't see.

176
00:07:14,079 --> 00:07:15,560
I mean, a really good example when the Middle East

177
00:07:15,560 --> 00:07:19,240
Fibercut happened in the Mediterranean a number of years ago,

178
00:07:19,240 --> 00:07:22,720
a lot of people started routing the other way around the globe.

179
00:07:22,720 --> 00:07:24,240
And I heard from this from a number of carriers

180
00:07:24,240 --> 00:07:26,600
where they, you know, it wasn't that there weren't routes

181
00:07:26,600 --> 00:07:28,040
available, but because the routes they

182
00:07:28,040 --> 00:07:30,000
happened to learn were much more restricted.

183
00:07:30,000 --> 00:07:32,199
There were also, there were forced to take traffic

184
00:07:32,199 --> 00:07:34,160
on a path the other way around the globe, sometimes

185
00:07:34,160 --> 00:07:35,480
with much higher latency.

186
00:07:35,480 --> 00:07:36,280
I see.

187
00:07:36,280 --> 00:07:37,280
I see.

188
00:07:37,280 --> 00:07:38,280
I see.

189
00:07:38,280 --> 00:07:40,120
So I do think those things matter.

190
00:07:40,199 --> 00:07:44,160
But I think it's quite fair that if you have multiple providers,

191
00:07:44,160 --> 00:07:45,560
you may get one path from each of them

192
00:07:45,560 --> 00:07:47,759
and still get some of that same path diversity

193
00:07:47,759 --> 00:07:51,519
that you might wish you could get from one provider.

194
00:07:51,519 --> 00:07:53,680
Do you think it's common for a path that's

195
00:07:53,680 --> 00:07:56,399
advertised to me to be then different from the one

196
00:07:56,399 --> 00:07:59,639
that the advertiser uses in practice?

197
00:07:59,639 --> 00:08:02,280
In other words, they advertise one path to me.

198
00:08:02,280 --> 00:08:05,240
Like that path, it fits with my local policy.

199
00:08:05,240 --> 00:08:07,759
And then they actually use a different one in practice.

200
00:08:07,759 --> 00:08:08,800
Yeah, that can certainly happen.

201
00:08:08,800 --> 00:08:10,680
And it can happen for legitimate reasons.

202
00:08:10,680 --> 00:08:12,920
For example, route aggregation, where I might be riding

203
00:08:12,920 --> 00:08:15,439
through in a very coarse grain, big address block.

204
00:08:15,439 --> 00:08:17,560
And inside the provider's domain, they've

205
00:08:17,560 --> 00:08:20,000
broken that into a much larger number of smaller address

206
00:08:20,000 --> 00:08:21,720
blocks that have different paths.

207
00:08:21,720 --> 00:08:23,920
So in some cases, it might just naturally happen

208
00:08:23,920 --> 00:08:26,879
because of the scalability mechanisms in the protocol.

209
00:08:26,879 --> 00:08:29,720
And you can certainly imagine less benign

210
00:08:29,720 --> 00:08:32,560
reasons where that might happen, where a path might be

211
00:08:32,560 --> 00:08:35,399
advertised to me because I'll be more likely to pick it.

212
00:08:35,399 --> 00:08:37,240
And some of them might be trying to attract my traffic

213
00:08:37,240 --> 00:08:38,480
into their network.

214
00:08:38,480 --> 00:08:40,600
And then send the traffic on the path that's actually

215
00:08:40,600 --> 00:08:42,600
most financially advantageous for them.

216
00:08:42,600 --> 00:08:44,320
And it's been some very nice research work showing

217
00:08:44,320 --> 00:08:47,080
that those kind of gaming mechanisms are possible.

218
00:08:47,080 --> 00:08:48,680
And I think what's particularly interesting about that

219
00:08:48,680 --> 00:08:52,279
intellectually is that even the best security extensions

220
00:08:52,279 --> 00:08:55,680
to BGP, which are not deployed at all today, don't prevent

221
00:08:55,680 --> 00:08:59,519
that because they mainly secure that BGP messages themselves

222
00:08:59,519 --> 00:09:02,120
really did go through the sequence of autonomous systems

223
00:09:02,120 --> 00:09:03,920
that are listed in the AS path.

224
00:09:03,920 --> 00:09:06,039
But all bets are off when you send the packets

225
00:09:06,039 --> 00:09:06,720
on the data plan.

226
00:09:06,720 --> 00:09:08,960
It's really very little stopping a domain

227
00:09:08,960 --> 00:09:12,160
from installing a different entry and affording table

228
00:09:12,160 --> 00:09:14,480
that will send my packets a completely different way.

229
00:09:14,480 --> 00:09:16,800
So it makes it difficult to do something like,

230
00:09:16,800 --> 00:09:18,840
let's suppose a government says, I only

231
00:09:18,840 --> 00:09:21,000
want my traffic to traverse networks that

232
00:09:21,000 --> 00:09:22,440
are in my own country.

233
00:09:22,440 --> 00:09:24,480
Or I want to avoid another country.

234
00:09:24,480 --> 00:09:27,120
Even though BGP will let you pick paths based on what

235
00:09:27,120 --> 00:09:29,800
autonomous systems are there, if you really care

236
00:09:29,800 --> 00:09:31,440
to make sure that property holds,

237
00:09:31,440 --> 00:09:34,440
you may not really be able to count on BGP to give that to you.

238
00:09:34,440 --> 00:09:35,720
I see.

239
00:09:35,720 --> 00:09:38,879
So another often cited problem with BGP

240
00:09:38,879 --> 00:09:41,279
is the rate that it converges after there's

241
00:09:41,279 --> 00:09:42,200
been a routing change.

242
00:09:42,200 --> 00:09:45,160
And I know that you were very involved in work a number of years

243
00:09:45,160 --> 00:09:47,320
ago in both uncovering the problem

244
00:09:47,320 --> 00:09:50,240
and then looking for ways to looking

245
00:09:50,240 --> 00:09:51,519
ways to solve it.

246
00:09:51,519 --> 00:09:54,360
Can you give us a brief overview of the problem,

247
00:09:54,360 --> 00:09:57,759
how it was found, and then how things stand today?

248
00:09:57,759 --> 00:09:58,399
Yeah, definitely.

249
00:09:58,399 --> 00:10:00,800
So there are two issues with BGP and convergence.

250
00:10:00,800 --> 00:10:04,120
One is whether the system converges at all.

251
00:10:04,120 --> 00:10:06,679
In other words, is it possible that all of these domains

252
00:10:06,679 --> 00:10:08,560
making their own local choices about which way

253
00:10:08,560 --> 00:10:10,720
they want to send their traffic, each

254
00:10:10,720 --> 00:10:13,080
continue to convince each other to change their minds about which

255
00:10:13,080 --> 00:10:15,600
way to go and never reach a global agreement?

256
00:10:15,600 --> 00:10:17,960
And the second is even if they do reach global agreement,

257
00:10:17,960 --> 00:10:19,799
how quickly does that happen?

258
00:10:19,799 --> 00:10:22,120
And while that transition is happening,

259
00:10:22,120 --> 00:10:24,840
packets are being lost in flight, put in loops, delivered

260
00:10:24,840 --> 00:10:29,320
out of order, people have found that when Skype calls are disrupted

261
00:10:29,320 --> 00:10:31,560
or perhaps Google Hangouts as well,

262
00:10:31,559 --> 00:10:34,959
that it's most likely caused by this BGP convergence

263
00:10:34,959 --> 00:10:37,079
behavior rather than by network congestion.

264
00:10:37,079 --> 00:10:37,879
So both are issues.

265
00:10:37,879 --> 00:10:39,119
Do you converge?

266
00:10:39,119 --> 00:10:40,639
And if so, how quickly?

267
00:10:40,639 --> 00:10:43,319
So on the first question, it is certainly possible

268
00:10:43,319 --> 00:10:44,799
that I want to route through you.

269
00:10:44,799 --> 00:10:45,959
You want to route through someone else,

270
00:10:45,959 --> 00:10:47,359
and they want to route through me.

271
00:10:47,359 --> 00:10:49,399
And we each cause each other to change our minds.

272
00:10:49,399 --> 00:10:51,239
Once I decide to route through you,

273
00:10:51,239 --> 00:10:53,039
the third party no longer has available.

274
00:10:53,039 --> 00:10:54,959
They route they might have wanted through me

275
00:10:54,959 --> 00:10:57,079
and like you might as well.

276
00:10:57,079 --> 00:10:59,079
And we continue to chase our tails.

277
00:10:59,360 --> 00:11:02,520
In practice, that's thought not to happen very often.

278
00:11:02,520 --> 00:11:05,200
And the reason for that is that BGP is first and foremost

279
00:11:05,200 --> 00:11:08,800
the money route in protocol, not a packet route in protocol.

280
00:11:08,800 --> 00:11:11,320
Running a packet is kind of a nice side effect.

281
00:11:11,320 --> 00:11:13,680
And so when I pick a route as an AS,

282
00:11:13,680 --> 00:11:16,600
I'm picking based on economic factors,

283
00:11:16,600 --> 00:11:18,240
do I have to pay to send traffic through you

284
00:11:18,240 --> 00:11:19,639
because you're my provider?

285
00:11:19,639 --> 00:11:22,200
Do I get revenue from you when I send traffic through you

286
00:11:22,200 --> 00:11:23,480
because you're my customer?

287
00:11:23,480 --> 00:11:26,480
Or is it sort of financially neutral because you're my peer?

288
00:11:26,519 --> 00:11:28,879
And so in the end, these sort of protocol

289
00:11:28,879 --> 00:11:30,920
oscillations that are permanent suggest

290
00:11:30,920 --> 00:11:33,240
some sort of weird financial dynamic taking place

291
00:11:33,240 --> 00:11:35,800
where everybody's somehow making money in a cycle.

292
00:11:35,800 --> 00:11:37,440
And it doesn't really make a lot of sense

293
00:11:37,440 --> 00:11:39,519
that everybody would somehow have it

294
00:11:39,519 --> 00:11:41,800
in their financial best interest to pick routes

295
00:11:41,800 --> 00:11:43,800
that ultimately cycle back.

296
00:11:43,800 --> 00:11:46,560
So it's not that we think this doesn't actually happen.

297
00:11:46,560 --> 00:11:48,080
And some of the work I was involved in

298
00:11:48,080 --> 00:11:50,560
tried to come up with a sort of an economic model

299
00:11:50,560 --> 00:11:53,560
and proofs that under certain conditions it can't happen.

300
00:11:53,560 --> 00:11:56,200
Now, that said, we do sometimes when I was at AT&T,

301
00:11:56,200 --> 00:11:58,879
we see route oscillation within an autonomous system

302
00:11:58,879 --> 00:12:00,480
because BGP is used there as well

303
00:12:00,480 --> 00:12:03,680
to disseminate writing information within a domain.

304
00:12:03,680 --> 00:12:05,280
So it's not that the problem never happens

305
00:12:05,280 --> 00:12:08,000
but it is somewhat of a rare pathological problem

306
00:12:08,000 --> 00:12:11,000
other than something that seems to happen a lot.

307
00:12:11,000 --> 00:12:14,000
On the second question about how quickly do things converge?

308
00:12:14,000 --> 00:12:15,800
A number of years ago, BGP would converge

309
00:12:15,800 --> 00:12:18,640
in the order of minutes or even several minutes.

310
00:12:18,640 --> 00:12:22,320
Definitely quite long relative to sort of the 50 milliseconds

311
00:12:22,320 --> 00:12:25,520
or less target that a lot of real-time applications need.

312
00:12:25,519 --> 00:12:28,559
And part of that is that BGP keeps exploring alternate paths

313
00:12:28,559 --> 00:12:29,720
one after another.

314
00:12:29,720 --> 00:12:32,480
So if the path I'm using is withdrawn from me,

315
00:12:32,480 --> 00:12:36,039
I explore my next most preferred path, which may in fact

316
00:12:36,039 --> 00:12:38,720
share the same fate as the path I just lost.

317
00:12:38,720 --> 00:12:40,399
It may have a link in common.

318
00:12:40,399 --> 00:12:42,279
BGP is just advertising the whole path

319
00:12:42,279 --> 00:12:43,759
that doesn't tell you any information

320
00:12:43,759 --> 00:12:47,319
about shared resources that might affect many, many paths.

321
00:12:47,319 --> 00:12:49,240
And so one after the other, I explore them

322
00:12:49,240 --> 00:12:51,079
and my neighbors are doing the same.

323
00:12:51,079 --> 00:12:54,600
And you can end up with sort of an exponential iterative process

324
00:12:54,600 --> 00:12:56,040
of exploring those paths.

325
00:12:56,040 --> 00:13:00,360
So that's gotten better because the sort of timers, the drive,

326
00:13:00,360 --> 00:13:02,360
how quickly I can move from one decision

327
00:13:02,360 --> 00:13:05,279
to the next of shrunk over the years.

328
00:13:05,279 --> 00:13:07,560
And frankly, when we, even a number of years ago,

329
00:13:07,560 --> 00:13:09,800
when we looked at this, most of the BGP routes

330
00:13:09,800 --> 00:13:11,519
are remarkably stable.

331
00:13:11,519 --> 00:13:13,399
10 days or two weeks at a time.

332
00:13:13,399 --> 00:13:15,840
There's a small number of unstable destinations

333
00:13:15,840 --> 00:13:18,000
on the internet that go up and down quite a lot.

334
00:13:18,000 --> 00:13:21,360
And that's thought to be caused not by routing oscillation

335
00:13:21,360 --> 00:13:23,960
but by literally equipment going up or down.

336
00:13:23,960 --> 00:13:26,440
That might cause a destination to be reachable or unreachable

337
00:13:26,440 --> 00:13:27,800
back and forth.

338
00:13:27,800 --> 00:13:31,280
And in practice, those destinations are extremely unpopular.

339
00:13:31,280 --> 00:13:33,560
Now, they're either unpopular because you can't reach them

340
00:13:33,560 --> 00:13:34,600
in the first place.

341
00:13:34,600 --> 00:13:36,320
That's not much traffic going on.

342
00:13:36,320 --> 00:13:37,759
Or they're popular.

343
00:13:37,759 --> 00:13:39,759
And because they're unpopular, nobody cares enough

344
00:13:39,759 --> 00:13:42,920
to make sure the network around them is stable.

345
00:13:42,920 --> 00:13:44,519
But what that all means when you put it together

346
00:13:44,519 --> 00:13:46,840
is that the vast majority of the traffic on the internet

347
00:13:46,840 --> 00:13:49,639
is going over paths that are often stable for days

348
00:13:49,639 --> 00:13:51,920
or even a week or two at a time.

349
00:13:51,919 --> 00:13:54,519
But in some sense, between a lot of research,

350
00:13:54,519 --> 00:13:57,159
a lot of improvements in software and routers

351
00:13:57,159 --> 00:13:59,279
and improvements in operational practices

352
00:13:59,279 --> 00:14:01,959
have meant that BGP convergence while it still matters

353
00:14:01,959 --> 00:14:04,399
is nowhere near as messy a problem as it might

354
00:14:04,399 --> 00:14:06,839
have seemed like 15 years ago.

355
00:14:06,839 --> 00:14:08,839
Yeah, OK.

356
00:14:08,839 --> 00:14:10,159
One of the things you mentioned earlier

357
00:14:10,159 --> 00:14:13,679
is that one of the things that makes it hard to teach BGP

358
00:14:13,679 --> 00:14:16,079
or it makes it hard as a student to really understand

359
00:14:16,079 --> 00:14:18,879
what problem BGP is trying to solve is, in some ways,

360
00:14:18,879 --> 00:14:21,480
it doesn't feel like it's built on the same principle

361
00:14:21,480 --> 00:14:25,159
algorithms that RIP was originally an OSPF

362
00:14:25,159 --> 00:14:28,120
as just a collection of policy mechanisms

363
00:14:28,120 --> 00:14:30,000
and then path routing.

364
00:14:30,000 --> 00:14:35,159
And so if you look at BGP today,

365
00:14:35,159 --> 00:14:38,120
is it a band-aid that's lived for a long time?

366
00:14:38,120 --> 00:14:42,039
Is it something that you believe and hope will be around

367
00:14:42,039 --> 00:14:43,440
as an internet-domain routing protocol

368
00:14:43,440 --> 00:14:44,600
for a long time in the future?

369
00:14:44,600 --> 00:14:46,960
Or if you've got to play God for a minute

370
00:14:46,960 --> 00:14:51,159
and wipe away BGP and replace it with a new internet-domain

371
00:14:51,159 --> 00:14:53,639
routing system, what would you do?

372
00:14:53,639 --> 00:14:55,559
Would you replace it with something

373
00:14:55,559 --> 00:14:57,519
that's similar or quite different?

374
00:14:57,519 --> 00:14:58,360
That's a great question.

375
00:14:58,360 --> 00:15:01,360
So I've BGP is the protocol I love to hate.

376
00:15:01,360 --> 00:15:03,480
So in some sense, it has proven quite

377
00:15:03,480 --> 00:15:05,879
evolveable and it has changed dramatically over the years.

378
00:15:05,879 --> 00:15:08,279
So a Yaka Brechtur and a talkie-given number of years

379
00:15:08,279 --> 00:15:10,399
ago called BGP, the triple napkin protocol

380
00:15:10,399 --> 00:15:13,519
for the three napkins in which the protocol was

381
00:15:13,519 --> 00:15:15,319
described when it was first designed.

382
00:15:15,319 --> 00:15:17,919
And I would say it's now the kitchen sink protocol

383
00:15:17,919 --> 00:15:20,480
in that the number of steps in its decision process,

384
00:15:20,480 --> 00:15:22,480
the number of attributes, pastoral,

385
00:15:22,480 --> 00:15:23,879
the number of different kinds of things

386
00:15:23,879 --> 00:15:25,960
that can be addressed in BGP, all of these things

387
00:15:25,960 --> 00:15:28,519
have gotten more and more and more complicated.

388
00:15:28,519 --> 00:15:31,240
And in part, that's a success disaster.

389
00:15:31,240 --> 00:15:34,720
It's possible to do a lot of things with BGP

390
00:15:34,720 --> 00:15:37,080
that were far beyond what it was originally designed to do.

391
00:15:37,080 --> 00:15:38,279
And so it is a testament to how

392
00:15:38,279 --> 00:15:41,519
available it is that it has been evolving in this way.

393
00:15:41,519 --> 00:15:43,440
But it means that it's just so complicated

394
00:15:43,440 --> 00:15:45,279
and so difficult to configure.

395
00:15:45,279 --> 00:15:49,480
And also very insecure because when it is originally designed,

396
00:15:49,480 --> 00:15:51,800
there were no mechanisms for signing and verifying

397
00:15:51,800 --> 00:15:55,360
of the routing information and no reliable registries

398
00:15:55,360 --> 00:15:57,080
of which autonomous systems are allowed

399
00:15:57,080 --> 00:15:59,879
to originate information for a particular address prompt.

400
00:15:59,879 --> 00:16:02,000
And so now we're trying to put the catback in the bag,

401
00:16:02,000 --> 00:16:04,720
if you will, by putting a lot of that security

402
00:16:04,720 --> 00:16:05,639
infrastructure together.

403
00:16:05,639 --> 00:16:09,080
And it's actually quite difficult to do after the fact.

404
00:16:09,080 --> 00:16:11,080
So in that sense, BGP is kind of a volatile place

405
00:16:11,080 --> 00:16:13,200
where it's fairly unwieldy.

406
00:16:13,200 --> 00:16:15,440
That said, if you replace BGP, you still

407
00:16:15,440 --> 00:16:18,240
have to reconcile the fact that different domains

408
00:16:18,240 --> 00:16:22,240
have different autonomy and have different priorities

409
00:16:22,240 --> 00:16:24,360
for how they want their traffic to be handled.

410
00:16:24,360 --> 00:16:26,879
So one thing that I'm really interested in along those lines

411
00:16:26,879 --> 00:16:30,639
is that it seems weird to me that the economic relationships

412
00:16:30,639 --> 00:16:33,000
between domains place out at the time scale

413
00:16:33,000 --> 00:16:35,600
of individual packets or routing protocol messages.

414
00:16:35,600 --> 00:16:38,560
That's a pretty small time scale for economic concerns

415
00:16:38,560 --> 00:16:39,680
to play out.

416
00:16:39,680 --> 00:16:42,320
And if you look at what's happened in servers,

417
00:16:42,320 --> 00:16:44,799
virtualization is made possible to really separate

418
00:16:44,799 --> 00:16:47,680
the owner of an infrastructure from the party that's actually

419
00:16:47,679 --> 00:16:49,919
running an application on top of that infrastructure,

420
00:16:49,919 --> 00:16:52,239
a virtual machine that might belong to a tenant,

421
00:16:52,239 --> 00:16:54,479
running on a server that might belong to a company

422
00:16:54,479 --> 00:16:56,799
like Google, Microsoft, or Amazon.

423
00:16:56,799 --> 00:16:58,120
And so I'm intrigued by the idea

424
00:16:58,120 --> 00:17:01,279
that we can now virtualize networks as well.

425
00:17:01,279 --> 00:17:04,039
And you've obviously worked on that I have too.

426
00:17:04,039 --> 00:17:07,759
It'd be nice if I could instead have a virtual network that

427
00:17:07,759 --> 00:17:11,279
spans the equipment owned and managed by multiple parties

428
00:17:11,279 --> 00:17:15,079
and then control my own fate on top of that virtual topology.

429
00:17:15,079 --> 00:17:17,159
So again, the business relationships still matter,

430
00:17:17,440 --> 00:17:19,440
but it's between me and the party whose infrastructure

431
00:17:19,440 --> 00:17:21,640
my virtual components are embedded in,

432
00:17:21,640 --> 00:17:24,560
rather than me and the neighbor I'm side by side with

433
00:17:24,560 --> 00:17:27,040
or worse yet, domains many hops away

434
00:17:27,040 --> 00:17:30,080
who have no accountability to me and no visibility to me.

435
00:17:30,080 --> 00:17:31,840
So I think we can make a routing system

436
00:17:31,840 --> 00:17:34,960
that is a lot more flexible and still cognizant

437
00:17:34,960 --> 00:17:37,360
of the fact that there are real autonomous

438
00:17:37,360 --> 00:17:39,480
revenue generating parties involved.

439
00:17:39,480 --> 00:17:41,400
If we took advantage of some of the innovations

440
00:17:41,400 --> 00:17:43,360
and virtualization over the past decade.

441
00:17:44,199 --> 00:17:47,000
So if someone's watching and they're thinking

442
00:17:47,000 --> 00:17:49,559
of going to grad school, interested in networking

443
00:17:49,559 --> 00:17:53,319
is interdomain routing, routing still an interesting topic?

444
00:17:53,319 --> 00:17:56,359
Is it becoming an interesting topic again?

445
00:17:56,359 --> 00:17:57,199
What do you think?

446
00:17:57,199 --> 00:17:58,039
What would be your advice?

447
00:17:58,039 --> 00:18:00,319
Well, I think it's interesting still in two ways

448
00:18:00,319 --> 00:18:02,399
that are perhaps different than it was 15 years ago.

449
00:18:02,399 --> 00:18:05,799
I think one is rethinking how domains can relate to each other

450
00:18:05,799 --> 00:18:09,439
in a new economic reality, taking advantage of virtualization,

451
00:18:09,439 --> 00:18:12,519
taking advantage of the fact that large content providers

452
00:18:12,519 --> 00:18:14,480
are very close to their customers.

453
00:18:14,480 --> 00:18:17,079
We often one or two hops away making the network

454
00:18:17,079 --> 00:18:18,839
in some ways much flatter than it was when

455
00:18:18,839 --> 00:18:20,119
BGP was designed.

456
00:18:20,119 --> 00:18:22,079
So I think revisiting how domains interconnect

457
00:18:22,079 --> 00:18:25,319
with one another with video and content distribution in mind

458
00:18:25,319 --> 00:18:26,720
and with virtualization and software

459
00:18:26,720 --> 00:18:28,359
to find networking in mind, I think

460
00:18:28,359 --> 00:18:29,879
is an interesting opportunity.

461
00:18:29,879 --> 00:18:32,160
And in general, we found within anything

462
00:18:32,160 --> 00:18:34,359
interdomain in the internet stinks

463
00:18:34,359 --> 00:18:38,720
that is very hard to deploy quality of service, security,

464
00:18:38,720 --> 00:18:42,160
IPv6, multicast, anything like that,

465
00:18:42,160 --> 00:18:43,840
the inside of domain is challenging enough,

466
00:18:43,840 --> 00:18:46,920
but as soon as you need 50,000 parties to cooperate,

467
00:18:46,920 --> 00:18:50,840
it becomes almost impossible to affect principled change.

468
00:18:50,840 --> 00:18:52,960
And so I think a lot of the more interesting work

469
00:18:52,960 --> 00:18:57,000
on BGP these days is looking more at incremental deployment

470
00:18:57,000 --> 00:19:00,519
incentives for and incremental deployment solutions

471
00:19:00,519 --> 00:19:03,160
where you get some security gain, scale,

472
00:19:03,160 --> 00:19:06,800
guilt, ability gain, economic gain, even if only a small subset

473
00:19:06,800 --> 00:19:09,160
of the internet adopts a technology change,

474
00:19:09,160 --> 00:19:10,600
and then hopefully it provides incentives

475
00:19:10,599 --> 00:19:12,559
for others to take part.

476
00:19:12,559 --> 00:19:14,839
So I think we've entered a domain where it unintended,

477
00:19:14,839 --> 00:19:18,000
a domain where work on BGP may be more focused on

478
00:19:18,000 --> 00:19:21,039
how to evolve it in a strategic way

479
00:19:21,039 --> 00:19:25,639
rather than what a clean slate design of BGP could look like.

480
00:19:26,679 --> 00:19:28,039
Thank you very much, Jen.

481
00:19:28,039 --> 00:19:29,879
This has been really interesting.

482
00:19:29,879 --> 00:19:30,719
Great, thank you.

