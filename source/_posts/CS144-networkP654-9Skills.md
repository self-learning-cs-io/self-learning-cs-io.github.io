---
title: CS144 NetworkP654 9Skills
---

1
00:00:00,000 --> 00:00:05,100
So this video is about how to read an RFC or a quest for comments, the standards document

2
00:00:05,100 --> 00:00:07,560
of the ITO of the internet.

3
00:00:07,560 --> 00:00:11,839
So reading RFC is critical if you want to get a deeper understanding of how the internet

4
00:00:11,839 --> 00:00:16,300
works, how its protocols are specified, but there are documents that have evolved over

5
00:00:16,300 --> 00:00:19,600
several decades to have certain structures and certain approaches in this video is going

6
00:00:19,600 --> 00:00:23,039
to explain what that looks like and why.

7
00:00:23,039 --> 00:00:29,320
There's actually an RFC or a quest for comments, a 2500 555 which describes the history of RFC,

8
00:00:29,320 --> 00:00:31,620
sort of a historical retrospective.

9
00:00:31,620 --> 00:00:36,700
The first RFC, RFC1, was entitled Host Software.

10
00:00:36,700 --> 00:00:41,719
And this quote from RFC1 talks about where that name came from, the idea that these documents

11
00:00:41,719 --> 00:00:47,659
aren't statements of control or assertion of control would rather part of a dialogue.

12
00:00:47,659 --> 00:00:52,840
And while RFCs today are a bit more formal than this first one, some thoughts on how to

13
00:00:52,840 --> 00:00:56,200
structure host software, that still remains.

14
00:00:56,200 --> 00:01:01,240
There's nobody who enforces RFCs rather their statements of a group of people about what

15
00:01:01,240 --> 00:01:02,800
you need to do to interoperate.

16
00:01:02,800 --> 00:01:06,200
You can always write things that don't follow RFCs, but if you want to interoperate, this

17
00:01:06,200 --> 00:01:08,200
is what you do need to do.

18
00:01:08,200 --> 00:01:16,240
So over time, RFCs came to have a standardized format, so there's the structure of the document,

19
00:01:16,240 --> 00:01:21,120
concerns of intellectual property, and also specific terms that RFCs use.

20
00:01:21,120 --> 00:01:25,200
Often you see them in capital words that have very, capital letters of very specific meaning,

21
00:01:25,200 --> 00:01:29,400
or all defined at RFC 2119.

22
00:01:29,400 --> 00:01:34,799
Modern RFCs, for example, always have or required to have two sections, security considerations

23
00:01:34,799 --> 00:01:36,760
and considerations for IANA.

24
00:01:36,760 --> 00:01:38,640
So security has obvious reasons.

25
00:01:38,640 --> 00:01:44,760
IANA is if this RFC needs new value registries, say, a protocol field or whether it allocates

26
00:01:44,760 --> 00:01:48,760
fields in other protocols.

27
00:01:48,760 --> 00:01:52,840
Now one thing that often a first-time reader doesn't quite realize, and it can be a bit

28
00:01:52,840 --> 00:01:56,760
confusing, is that there are actually multiple types of RFCs.

29
00:01:56,760 --> 00:02:00,359
And they actually have very different meanings and very different implications towards the

30
00:02:00,359 --> 00:02:02,840
standards process of the internet.

31
00:02:02,840 --> 00:02:07,439
So for example, there are proposed standards, standards track, informational, experimental

32
00:02:07,439 --> 00:02:08,439
and best-current practice.

33
00:02:08,439 --> 00:02:13,400
And the way to think of those is that there's a spectrum of whether or not there's an idea,

34
00:02:13,400 --> 00:02:20,159
a couple of people have proposed, say, experimental, whether or not it's a specification, or it's

35
00:02:20,159 --> 00:02:24,599
simply some valuable information that's an informational RFC can be not a protocol, but

36
00:02:24,599 --> 00:02:28,199
rather a valuable information for the community.

37
00:02:28,199 --> 00:02:29,879
Then you have proposed standards.

38
00:02:29,879 --> 00:02:34,519
So here's something which a group of people believe should become a common standard of

39
00:02:34,519 --> 00:02:37,079
the internet, and then standards track.

40
00:02:37,079 --> 00:02:42,159
And the transition between proposed standards and standards track, or standards track is further

41
00:02:42,159 --> 00:02:47,519
along the process towards becoming a really stable standard of the internet, has to do with

42
00:02:47,520 --> 00:02:51,159
how many implementations there are, whether they can interoperate, and there's some formal

43
00:02:51,159 --> 00:02:53,640
process for making the transition.

44
00:02:53,640 --> 00:02:58,520
There are also RFCs that are best-current practice, which are based on our current knowledge

45
00:02:58,520 --> 00:02:59,520
today.

46
00:02:59,520 --> 00:03:01,760
These are the things that you really want to do best practice.

47
00:03:01,760 --> 00:03:02,760
Best practices.

48
00:03:02,760 --> 00:03:07,760
So for example, there are best-current practices about how to implement TCP and its congestion

49
00:03:07,760 --> 00:03:10,160
control algorithms.

50
00:03:10,160 --> 00:03:13,200
So that's what an RFC looks like.

51
00:03:13,199 --> 00:03:18,039
This is the basic process that an RFC takes, or a document takes to create an RFC.

52
00:03:18,039 --> 00:03:24,560
This is a bit simplified, and this is actually my personal experience when working on the

53
00:03:24,560 --> 00:03:29,560
RFC for this algorithm that came out of my research trickle.

54
00:03:29,560 --> 00:03:32,879
So generally what happens is that the document starts as a draft.

55
00:03:32,879 --> 00:03:36,759
And so when you see documents in the ITF named draft, they are not RFCs.

56
00:03:36,759 --> 00:03:39,599
They are not formal documents.

57
00:03:39,599 --> 00:03:44,120
Instead, they are works in progress, and correspondingly they actually time out, so people don't update

58
00:03:44,120 --> 00:03:45,120
the draft.

59
00:03:45,120 --> 00:03:47,719
Eventually, it disappears off the ITF servers.

60
00:03:47,719 --> 00:03:48,799
And so you start with the draft.

61
00:03:48,799 --> 00:03:51,280
I mean, you notice that it's draft-levels.

62
00:03:51,280 --> 00:03:52,879
This means that it's a personal draft.

63
00:03:52,879 --> 00:03:57,120
It's a private, it's a personal submission that somebody, just a person, or maybe a few

64
00:03:57,120 --> 00:04:02,039
people, are suggesting this document might be of interest to the internet.

65
00:04:02,039 --> 00:04:03,039
And then there's some information.

66
00:04:03,039 --> 00:04:05,479
In this case, levels, that's me.

67
00:04:05,479 --> 00:04:10,319
Levels was the ITF working group that it was the draft was being proposed for, the routing

68
00:04:10,319 --> 00:04:12,239
over low power and lossy links.

69
00:04:12,239 --> 00:04:15,280
And then a descriptive name, trickle, the trickle algorithm, and then a number.

70
00:04:15,280 --> 00:04:20,199
So this is version zero of this draft, so the first version of it.

71
00:04:20,199 --> 00:04:24,240
Then you can submit that to a working group for some consideration discussion.

72
00:04:24,240 --> 00:04:28,560
Maybe it iterates a couple of times, you make some improvements, some modifications, and

73
00:04:28,560 --> 00:04:33,560
the numbers increment, so trickle zero zero, trickle zero one, trickle zero two.

74
00:04:33,560 --> 00:04:38,720
And at some point, the chair of a working group can say, or ask the working group, do

75
00:04:38,720 --> 00:04:42,720
we think that this is something which should become a working group work item?

76
00:04:42,720 --> 00:04:48,720
Is this a document or an idea or a protocol, which the working group thinks as part of

77
00:04:48,720 --> 00:04:52,959
its charter and should make more formal?

78
00:04:52,959 --> 00:04:57,519
When it becomes a working group document, then the name changes from draft someone's name,

79
00:04:57,519 --> 00:05:02,279
draft levels, to draft ITF, to show that this is now a document under the full auspices

80
00:05:02,279 --> 00:05:03,319
of a working group.

81
00:05:03,319 --> 00:05:05,480
And you can see that it's still the role working group.

82
00:05:05,480 --> 00:05:09,040
At this point, the version number resets to zero zero.

83
00:05:09,040 --> 00:05:10,680
Then it goes through revisions.

84
00:05:10,680 --> 00:05:12,800
You presented at working group meetings.

85
00:05:12,800 --> 00:05:17,399
You get feedback, comments on the mailing lists, questions, concerns.

86
00:05:17,399 --> 00:05:22,039
The document iterates over versions, zero ones, zero two, zero three.

87
00:05:22,039 --> 00:05:27,439
At some point, the working group chair, one of the working group chairs, they decide that

88
00:05:27,439 --> 00:05:31,240
the document is ready for publication.

89
00:05:32,240 --> 00:05:34,639
And so the working group chair can say, look, I feel like this document has been through

90
00:05:34,639 --> 00:05:35,639
a lot of revision.

91
00:05:35,639 --> 00:05:36,639
We agree.

92
00:05:36,639 --> 00:05:37,639
It seems like it's a good position.

93
00:05:37,639 --> 00:05:40,040
It's something that's part of the working group's work.

94
00:05:40,040 --> 00:05:42,360
We want to make this an RFC.

95
00:05:42,360 --> 00:05:44,840
At that point, there's a last call issued.

96
00:05:44,840 --> 00:05:46,639
First, the working group and then to the ITF.

97
00:05:46,639 --> 00:05:50,519
So the working group is given a chance, a period to respond, any final comments to improve

98
00:05:50,519 --> 00:05:52,120
the document.

99
00:05:52,120 --> 00:05:55,240
After which, then, it's given a last call to the entire ITF.

100
00:05:55,240 --> 00:05:59,519
Anyone can comment on it and suggest things to improve it.

101
00:05:59,519 --> 00:06:03,759
After it's passed to those last calls, that is, all of the issues that people have seen

102
00:06:03,759 --> 00:06:07,680
have been addressed to the satisfaction of the working group chair.

103
00:06:07,680 --> 00:06:11,199
It goes to the IESG, the steering group, the internet engineering steering group, which

104
00:06:11,199 --> 00:06:14,560
has representatives from all of the major areas of the internet.

105
00:06:14,560 --> 00:06:16,159
So you have both tremendous depth.

106
00:06:16,159 --> 00:06:21,359
People who say experts in transport, experts in real-time application infrastructure.

107
00:06:21,359 --> 00:06:25,199
But then, because it's all of the experts, it also has tremendous breadth.

108
00:06:25,199 --> 00:06:31,759
Everything from the network to operations to transport.

109
00:06:31,759 --> 00:06:34,959
The IESG reviews it, gives feedback, gives comments.

110
00:06:34,959 --> 00:06:37,519
Sometimes they refuse to publish it as an RFC.

111
00:06:37,519 --> 00:06:41,599
They say that this is not, this has substantive issues, which we see.

112
00:06:41,599 --> 00:06:44,480
You need to completely rework it.

113
00:06:44,480 --> 00:06:48,240
But if things go well, the IESG gives some comments to address those comments, and then the

114
00:06:48,240 --> 00:06:51,079
document is approved as an RFC.

115
00:06:51,079 --> 00:06:53,560
Request for comments.

116
00:06:53,560 --> 00:07:01,319
So as described in RFC 2119, there are certain terms which are used in RFCs, which have very

117
00:07:01,319 --> 00:07:06,040
specific meanings with respect to interoperability and proposed standards.

118
00:07:06,040 --> 00:07:09,920
So these are those terms, and when they're used, they're used in all caps.

119
00:07:09,920 --> 00:07:12,680
So the first is must required in shall.

120
00:07:12,680 --> 00:07:16,600
If you see this term used in an RFC, then this is an absolute requirement.

121
00:07:16,600 --> 00:07:23,120
If a protocol or an implementation does not follow this statement, then it does not follow

122
00:07:23,120 --> 00:07:24,120
the RFC.

123
00:07:24,120 --> 00:07:25,720
It is not compliant.

124
00:07:25,720 --> 00:07:27,959
Then there should recommend it.

125
00:07:27,959 --> 00:07:31,720
And so that shouldn't recommend it or things you really generally want to do.

126
00:07:31,720 --> 00:07:35,399
It's really advised that you do it, but it's understood that there might be times when

127
00:07:35,399 --> 00:07:37,079
you don't for whatever reason.

128
00:07:37,079 --> 00:07:44,079
And so the terminology that's used in 2119 is that you really should understand the implications

129
00:07:44,079 --> 00:07:47,600
of not doing this if you're going to choose to not do it.

130
00:07:47,600 --> 00:07:49,280
And then finally, there's may optional.

131
00:07:49,280 --> 00:07:51,600
And so this is totally up to you.

132
00:07:51,600 --> 00:07:52,600
You can do it.

133
00:07:52,600 --> 00:07:53,600
You cannot do it.

134
00:07:53,600 --> 00:07:57,080
It is not required for interoperability in any way.

135
00:07:57,080 --> 00:07:59,840
And so when you read an RFC, it's important to see these terms and how they're used and

136
00:07:59,840 --> 00:08:04,560
then understand what the RFC is really saying you have to do to be compliant.

137
00:08:04,560 --> 00:08:09,080
So I thought as an example, we could walk through RFC 5681.

138
00:08:09,080 --> 00:08:10,760
This is TCP congestion control.

139
00:08:10,760 --> 00:08:14,200
As you can see, it's standards track.

140
00:08:14,200 --> 00:08:15,520
So this is pretty well along.

141
00:08:15,520 --> 00:08:21,280
It is written back in 2009 by a bunch of folks who are bigwigs in the internet.

142
00:08:22,079 --> 00:08:29,479
And so one thing you can see is, in fact, the history of this document in terms of drafts.

143
00:08:29,479 --> 00:08:31,919
So it was draft IATF.

144
00:08:31,919 --> 00:08:33,559
And it went through all of these revisions.

145
00:08:33,559 --> 00:08:35,120
And you can see what the revisions are.

146
00:08:35,120 --> 00:08:38,079
The earlier vision that this is what this obsolete is 2581.

147
00:08:38,079 --> 00:08:42,039
And so this particular RATF draft went through seven revisions before becoming an RFC.

148
00:08:42,039 --> 00:08:45,039
So let's go back to the RFC.

149
00:08:45,039 --> 00:08:48,360
So as you can see, there's an abstract sort of stating what it's about.

150
00:08:48,360 --> 00:08:54,519
So you can see the copyright notice, but intellectual property, some background.

151
00:08:54,519 --> 00:08:57,440
It defines a bunch of terms which are used in this.

152
00:08:57,440 --> 00:09:04,240
But if we jump forward, so here, say in section three, it's defining the congestion control

153
00:09:04,240 --> 00:09:06,680
algorithms of TCP.

154
00:09:06,680 --> 00:09:10,960
So start congestion avoidance, faster transmit and fast recovery.

155
00:09:10,960 --> 00:09:17,480
And so you know it, for example, one of the first requirements this document states is that

156
00:09:17,480 --> 00:09:23,519
it's okay for TCP senders to send more slowly than what these algorithms say in order to back

157
00:09:23,519 --> 00:09:27,840
off more aggressively to congestion, but it must not be more aggressive.

158
00:09:27,840 --> 00:09:32,560
That these, what this document describes are basically the upper bounds of what TCP should

159
00:09:32,560 --> 00:09:33,560
do.

160
00:09:33,560 --> 00:09:36,480
It should never send faster than this because to do so might cause a problem.

161
00:09:36,480 --> 00:09:38,840
So then here's another specification.

162
00:09:38,840 --> 00:09:41,360
It says the initial value of the congestion window.

163
00:09:41,360 --> 00:09:45,920
So when you start a TCP connection, what the congestion window's initial window is, it

164
00:09:45,919 --> 00:09:48,360
must be set following these parameters.

165
00:09:48,360 --> 00:09:51,959
So basically if you have large segment sizes, then it should be two segments.

166
00:09:51,959 --> 00:09:55,399
If you have medium size segments, it can be up to three segments.

167
00:09:55,399 --> 00:09:58,039
And if you have small segments, it can be up to four segments.

168
00:09:58,039 --> 00:10:01,759
There's a statement of if you want to follow a TCP congestion control properly, here's

169
00:10:01,759 --> 00:10:05,679
which initial segment size can be the initial congestion window size.

170
00:10:05,679 --> 00:10:07,279
So those are examples of must and must not.

171
00:10:07,279 --> 00:10:09,360
Here's an example of a should.

172
00:10:09,360 --> 00:10:15,599
So this SS threshold is saying what is the initial slow start threshold, the initial threshold

173
00:10:15,600 --> 00:10:20,360
at which we're going to transition from slow start to congestion avoidance.

174
00:10:20,360 --> 00:10:22,920
And so this document says that the initial value should be very, very high.

175
00:10:22,920 --> 00:10:28,200
So that you just do slow start until essentially you get a loss and then you drop into congestion

176
00:10:28,200 --> 00:10:29,680
avoidance.

177
00:10:29,680 --> 00:10:33,720
However, you know, it can be smaller if you'd like.

178
00:10:33,720 --> 00:10:37,560
And so it should be set arbitrarily high, but you cannot set it arbitrarily high.

179
00:10:37,560 --> 00:10:43,000
You should understand who are the implications of what will happen if you do this.

180
00:10:43,000 --> 00:10:47,200
So here's an example of in fact a may and a should and a must not.

181
00:10:47,200 --> 00:10:51,600
So it's talking about when TCP is in congestion avoidance and it's incrementing its congestion

182
00:10:51,600 --> 00:10:55,919
window, it says, oh, you may increment congestion mean to buy certain number of bytes.

183
00:10:55,919 --> 00:10:57,240
You had, in fact, you don't have to.

184
00:10:57,240 --> 00:10:58,879
You could just not if you want to.

185
00:10:58,879 --> 00:11:00,799
You could not increase it.

186
00:11:00,799 --> 00:11:06,279
But it should increment it once per RTT by this equation equation.

187
00:11:06,279 --> 00:11:09,440
And it must not increment it more than this amount.

188
00:11:09,440 --> 00:11:13,280
So this is basically saying, hey, here's the upper bound.

189
00:11:13,280 --> 00:11:17,040
And you should not ever do it more than that upper bound.

190
00:11:17,040 --> 00:11:18,800
But you generally want to follow this equation.

191
00:11:18,800 --> 00:11:20,280
You should follow this equation.

192
00:11:20,280 --> 00:11:26,240
So all this aside, remember, so this document is saying something about how large the congestion,

193
00:11:26,240 --> 00:11:29,000
how large the initial window size should be.

194
00:11:29,000 --> 00:11:33,000
It must be this number of segments, two segments for large segment sizes, three for medium

195
00:11:33,000 --> 00:11:35,880
size, four for small segments.

196
00:11:35,880 --> 00:11:38,640
But remember, this is just an RC, right?

197
00:11:38,799 --> 00:11:42,000
You can say that somebody isn't compliant, but nobody is going to enforce it.

198
00:11:42,000 --> 00:11:45,519
In fact, if you look at this web page here, there is this really interesting blog question

199
00:11:45,519 --> 00:11:51,120
about two years ago about how Google and Microsoft were not following this RFC.

200
00:11:51,120 --> 00:11:52,600
So if you want, you can look this up.

201
00:11:52,600 --> 00:11:53,919
This is Ben Strong's blog.

202
00:11:53,919 --> 00:11:57,039
If you search for Google Microsoft congestion window cheat.

203
00:11:57,039 --> 00:12:02,199
And essentially what he found is that when you first connect to Google or Microsoft sites,

204
00:12:02,199 --> 00:12:05,439
their initial window is significantly larger than two.

205
00:12:05,440 --> 00:12:09,520
But as they will send you more than two segments, essentially, so that they can send you their

206
00:12:09,520 --> 00:12:14,040
whole web page in just one round trip time and not having to wait for the congestion window

207
00:12:14,040 --> 00:12:15,040
to increase.

208
00:12:15,040 --> 00:12:19,760
And so he walks through all the experimental evidence that he gathered and he shows that

209
00:12:19,760 --> 00:12:21,160
these guys were not following the rules.

210
00:12:21,160 --> 00:12:24,800
Since there's been then discussion in the ITF about maybe we need to increase these sizes,

211
00:12:24,800 --> 00:12:26,400
networks are getting faster.

212
00:12:26,400 --> 00:12:29,520
But the point here being that just because it's written in our RFC and it says you must

213
00:12:29,520 --> 00:12:32,160
do something, doesn't necessarily mean that everyone always does.

