---
title: MIT6824 P7Lecture7 FaultTolerance Raft2
---

1
00:00:00,000 --> 00:00:07,000
Okay, good afternoon.

2
00:00:07,000 --> 00:00:10,000
Sam check.

3
00:00:10,000 --> 00:00:13,000
Double checking.

4
00:00:13,000 --> 00:00:17,000
You can hear me.

5
00:00:17,000 --> 00:00:18,000
Yeah.

6
00:00:18,000 --> 00:00:19,000
Thank you.

7
00:00:19,000 --> 00:00:23,000
Okay, good afternoon. Good evening. Good morning. Good night.

8
00:00:23,000 --> 00:00:24,000
Where we are.

9
00:00:24,000 --> 00:00:27,000
So I'm going to talk today more about draft.

10
00:00:27,000 --> 00:00:30,000
I'm going to talk about draft.

11
00:00:30,000 --> 00:00:33,000
I'm going to talk about draft.

12
00:00:33,000 --> 00:00:36,000
And we want to cover the following different topics,

13
00:00:36,000 --> 00:00:39,000
which are going to be rather than to lapse.

14
00:00:39,000 --> 00:00:43,000
So first of all, I want to talk a little bit more about walk divergence.

15
00:00:43,000 --> 00:00:47,000
He sort of had a cliffhanger at the end of last lecture where we got in a discussion of figure six.

16
00:00:47,000 --> 00:00:49,000
I want to resume that discussion.

17
00:00:49,000 --> 00:00:52,000
I want to talk about log catch up.

18
00:00:52,000 --> 00:00:55,000
And how do we follow a first catch up.

19
00:00:55,000 --> 00:00:57,000
Then a little bit of a persistence.

20
00:00:57,000 --> 00:01:01,000
Like what state must be.

21
00:01:01,000 --> 00:01:07,000
What state in a draft action must be persistence and storage, which has been really, really relevant for two C and 2D.

22
00:01:07,000 --> 00:01:12,000
And also talk about latest to that to snapshots.

23
00:01:12,000 --> 00:01:15,000
Yeah.

24
00:01:15,000 --> 00:01:18,000
There's any questions please feel for ask.

25
00:01:18,000 --> 00:01:21,000
And then finally, I want to talk about linearizability and correctness.

26
00:01:21,000 --> 00:01:27,000
Cuterium that comes up quite often is in the paper used also in a bunch of places.

27
00:01:27,000 --> 00:01:33,000
And this will allow us to talk a little bit again about like how does a serve of user after.

28
00:01:33,000 --> 00:01:36,000
So those are the top of certain time to talk about.

29
00:01:36,000 --> 00:01:39,000
Any questions right now please feel free to ask.

30
00:01:39,000 --> 00:01:47,000
And of course, always jump in any point.

31
00:01:47,000 --> 00:01:50,000
Okay, so.

32
00:01:50,000 --> 00:01:58,000
So we sound less to we restarted talking about draft, you know, we sound the leader has sort of this job of replicating its log on to the.

33
00:01:58,000 --> 00:02:00,000
On to followers.

34
00:02:00,000 --> 00:02:05,000
And but you know due to crashes and leader election.

35
00:02:05,000 --> 00:02:12,000
The state of the system, you know, the logs can actually quite can diverse quite quite a bit.

36
00:02:12,000 --> 00:02:15,000
And so there's a lot of different scenarios.

37
00:02:15,000 --> 00:02:18,000
And that's where the system can end up in.

38
00:02:18,000 --> 00:02:29,000
And so the figure six or 57 actually shows a bunch of those.

39
00:02:29,000 --> 00:02:30,000
And the.

40
00:02:30,000 --> 00:02:37,000
And the main reason for the figure is that it actually sharpens up the leader election rule.

41
00:02:37,000 --> 00:02:42,000
So once the leader goes down and we need to elect a new leader.

42
00:02:42,000 --> 00:03:01,000
There's actually some restrictions that must be applied to actually make sure that we can get to converge on the right log in the end.

43
00:03:01,000 --> 00:03:11,000
And so first of all, one part of that is that any leader needs to achieve a majority.

44
00:03:11,000 --> 00:03:22,000
And this is a part of that idea to actually avoid just bringing split syndrome or split brain syndrome so that we can actually make sure that you know any two subsequent elections.

45
00:03:22,000 --> 00:03:27,000
There's going to be at least one note that participated in both.

46
00:03:27,000 --> 00:03:37,000
Majorities because you know, that can only be with your two majors must overlap and that node must actually have, you know, the operations for them are recent.

47
00:03:37,000 --> 00:03:39,000
From the recent term.

48
00:03:39,000 --> 00:03:43,000
The majority is important, but turns out you know it's actually a little bit more subtle.

49
00:03:43,000 --> 00:03:50,000
You might think that like the longers log that should be sufficient because the longers log has much more information.

50
00:03:50,000 --> 00:03:54,000
So we'll just pick that as the next leader and then we're in good shape.

51
00:03:54,000 --> 00:03:58,000
And that turns out to be not the case.

52
00:03:58,000 --> 00:04:01,000
And so.

53
00:04:01,000 --> 00:04:03,000
And the leader rules a little bit more subtle.

54
00:04:03,000 --> 00:04:10,000
So this is a majority plot plus at least as a date, least.

55
00:04:10,000 --> 00:04:16,000
But that's too late.

56
00:04:16,000 --> 00:04:22,000
So so if two, you know, the leading election is running.

57
00:04:22,000 --> 00:04:34,000
So if the candidate is starting to run a leader election approaches a bunch of followers and then the followers respond with a positive vote.

58
00:04:34,000 --> 00:04:38,000
If the candidate actually is at least up to date as they are.

59
00:04:38,000 --> 00:04:49,000
And what that means is that the last log entry must actually have the same term or in if you know they actually have the same term.

60
00:04:49,000 --> 00:04:59,000
And so that's the leader election rule and you know we looked at this sort of this problem last week.

61
00:04:59,000 --> 00:05:07,000
It's part of the homework and like what happens if you know this note, you know that was about to lead the leader actually dead.

62
00:05:07,000 --> 00:05:10,000
As gone, you know and who could become leaders.

63
00:05:10,000 --> 00:05:15,000
And you know quickly discovered that you know the there's a bunch of them that cannot become leader.

64
00:05:15,000 --> 00:05:20,000
But then there's potentially a number of scenarios in which some can become leaders.

65
00:05:20,000 --> 00:05:24,000
And so particular, you know, we can identify that it can become leader.

66
00:05:24,000 --> 00:05:26,000
So you can become leader.

67
00:05:26,000 --> 00:05:30,000
Indeed, we can come leader.

68
00:05:30,000 --> 00:05:31,000
And so then.

69
00:05:31,000 --> 00:05:35,000
And so there's probably the most important part of this whole discussion.

70
00:05:35,000 --> 00:05:36,000
Like who can become leader.

71
00:05:36,000 --> 00:05:38,000
That's the question.

72
00:05:38,000 --> 00:05:39,000
Is there.

73
00:05:39,000 --> 00:05:42,000
Hold on.

74
00:05:42,000 --> 00:05:44,000
Okay.

75
00:05:44,000 --> 00:05:45,000
So who become.

76
00:05:45,000 --> 00:05:46,000
That's the most important part.

77
00:05:46,000 --> 00:05:50,000
So there's a bunch of different scenarios in which a can become a leader.

78
00:05:50,000 --> 00:05:55,000
There's a scenario where C become become a leader and a scenario where D become become a leader.

79
00:05:55,000 --> 00:05:58,000
Then the discussion folks a little bit about their like well.

80
00:05:58,000 --> 00:06:01,000
And at least there's one particular scenario in which one of these can become leader.

81
00:06:01,000 --> 00:06:10,000
And then there's a lot of other, you know, multiple scenarios in which they come to leader, particularly this focus this discussion focused on a.

82
00:06:10,000 --> 00:06:15,000
Because the one way that a can become a leader is when.

83
00:06:15,000 --> 00:06:17,000
C and D.

84
00:06:17,000 --> 00:06:22,000
Or down.

85
00:06:22,000 --> 00:06:25,000
Because C and D are down.

86
00:06:25,000 --> 00:06:28,000
A will talk to B E and F.

87
00:06:28,000 --> 00:06:30,000
For majority.

88
00:06:30,000 --> 00:06:32,000
If I have four.

89
00:06:32,000 --> 00:06:35,000
It has the most up to date log.

90
00:06:35,000 --> 00:06:39,000
Notice that you know, even though F is a longer log.

91
00:06:39,000 --> 00:06:42,000
It actually is not the most up to date one.

92
00:06:42,000 --> 00:06:45,000
And so I will actually will succeed in becoming the leader.

93
00:06:45,000 --> 00:06:48,000
And then things proceed from there.

94
00:06:48,000 --> 00:07:00,000
And the interesting question that came up is are there other scenarios in which a can become a leader in particular are is the scenario where like even if C and D are up.

95
00:07:00,000 --> 00:07:06,000
What a reachable or participate is a possibility becomes a leader.

96
00:07:06,000 --> 00:07:08,000
And so we've been seeing D and up.

97
00:07:08,000 --> 00:07:14,000
And so the question is does C and D always vote for a if a is to candidate.

98
00:07:14,000 --> 00:07:17,000
And so it turns out this answer is slightly complicated.

99
00:07:17,000 --> 00:07:19,000
It is not completely straight for it.

100
00:07:19,000 --> 00:07:28,000
So if a starts this election, you know, presumably it will start the election into seven.

101
00:07:28,000 --> 00:07:31,000
And so even context is C and D.

102
00:07:31,000 --> 00:07:35,000
You know, C will be perfectly fine with that because the.

103
00:07:35,000 --> 00:07:39,000
The A's at least up to date.

104
00:07:39,000 --> 00:07:47,000
And so we'll be able to achieve a majority, but you know, it is possible correct the D.

105
00:07:47,000 --> 00:07:52,000
There's one additional rule that if.

106
00:07:52,000 --> 00:08:03,000
D actually has a if a follower or if it yeah, if a follower has a higher term has seen a higher term, it's current terms higher than the candidate.

107
00:08:03,000 --> 00:08:13,000
And so it actually can it's can stop the election because it will respond saying like hey, my term is higher than your height or my term my current terms higher than your term.

108
00:08:13,000 --> 00:08:16,000
And so therefore you have to become a follower so able then we.

109
00:08:16,000 --> 00:08:19,000
We change back from candidate to follow it.

110
00:08:19,000 --> 00:08:21,000
And this can happen correctly in case of D.

111
00:08:21,000 --> 00:08:28,000
This D might actually have seen term eight and we can't really tell from this picture what actually the outcome is going to be.

112
00:08:28,000 --> 00:08:32,000
But let's assume that for example, you know, the.

113
00:08:32,000 --> 00:08:39,000
It has run once and accents increased its term to eight.

114
00:08:39,000 --> 00:08:41,000
Maybe didn't become succeeded a leader.

115
00:08:41,000 --> 00:08:44,000
And then it's current term will eight and so it will vote.

116
00:08:44,000 --> 00:08:49,000
Actually ask it to for its vote and people say no, I won't vote for you.

117
00:08:49,000 --> 00:08:54,000
And furthermore, my current term is eight. So a will see that message is higher than seven.

118
00:08:54,000 --> 00:08:58,000
And so a will actually step down and become just a follower.

119
00:08:58,000 --> 00:09:06,000
And then some more later, presumably, you know, D will run its election time or a little bit off and actually it will run.

120
00:09:06,000 --> 00:09:17,000
So the short story of this, you know, the morale of this is going to really this picture is that it's absolutely possible that AC and you can go leader in different types of scenarios.

121
00:09:17,000 --> 00:09:20,000
And that's probably the main thing to get out of this.

122
00:09:20,000 --> 00:09:21,000
Professor.

123
00:09:21,000 --> 00:09:22,000
Yeah.

124
00:09:22,000 --> 00:09:32,000
So I just want to ask because I think I'm not sure if I understood correctly, but you said, a might be elected in term seven.

125
00:09:32,000 --> 00:09:39,000
It is a non-sue that I cannot for any reason be elected in term seven.

126
00:09:39,000 --> 00:09:50,000
Even if he was down, right, because people like the like already got a majority right in seven.

127
00:09:50,000 --> 00:10:00,000
Do you got a majority in seven because it actually was able to get something done. So zoomly in right you're right, you know, the good oxidation.

128
00:10:00,000 --> 00:10:05,000
So it has to be the case that there's a number of people that actually are ready in turn seven.

129
00:10:05,000 --> 00:10:06,000
Correct.

130
00:10:06,000 --> 00:10:08,000
And the pictures just incomplete.

131
00:10:08,000 --> 00:10:12,000
We don't really know what the current term is that people have seen so far.

132
00:10:12,000 --> 00:10:13,000
Yeah.

133
00:10:13,000 --> 00:10:14,000
Right.

134
00:10:14,000 --> 00:10:23,000
But yeah, I mean, the only thing is like, I think like a majority of the servers already voted for someone in term seven.

135
00:10:23,000 --> 00:10:24,000
So they will.

136
00:10:24,000 --> 00:10:27,000
So they presumably able to go to term eight.

137
00:10:27,000 --> 00:10:33,000
And you know, we'll run the election for term eight, but you know, for the same reason, you might already be in nine.

138
00:10:33,000 --> 00:10:41,000
And so it all depends on what the current term is, but these actually these participants are in.

139
00:10:41,000 --> 00:10:49,000
But the main conclusion correct the main top level conclusion is that a can become leader, certainly even see a DR offline.

140
00:10:49,000 --> 00:10:54,000
C can become a leader and D can become a leader.

141
00:10:54,000 --> 00:10:58,000
Thanks.

142
00:10:58,000 --> 00:10:59,000
Good.

143
00:10:59,000 --> 00:11:01,000
Okay.

144
00:11:01,000 --> 00:11:11,000
Then, let's, so we now know that the, you know, the raft can sort of ended with the states where the logs are diverged.

145
00:11:11,000 --> 00:11:13,000
And so that needs to be repaired.

146
00:11:13,000 --> 00:11:21,000
And so I can want to keep component of the raft protocol is to do that like log catch up as they called.

147
00:11:21,000 --> 00:11:30,000
So I want to talk that a little bit about that.

148
00:11:30,000 --> 00:11:39,000
And this is basically what you're sort of half the deal with in part B of the lab.

149
00:11:39,000 --> 00:11:44,000
And so maybe easy to illustrate this picture.

150
00:11:44,000 --> 00:11:47,000
And so let's, it's going to make it a little bit simple.

151
00:11:47,000 --> 00:11:50,000
Let's have free servers.

152
00:11:50,000 --> 00:11:52,000
So this is one thing here's S1.

153
00:11:52,000 --> 00:11:55,000
It has, you know,

154
00:11:55,000 --> 00:11:58,000
free in index 10.

155
00:11:58,000 --> 00:12:04,000
In this index 11 has no entries in 10, 11, 12, 13.

156
00:12:04,000 --> 00:12:10,000
Here we have s2.

157
00:12:10,000 --> 00:12:16,000
And s2 has entries free, free, and 5.

158
00:12:16,000 --> 00:12:20,620
This is index 10, 11, 12, and 13, 13,

159
00:12:20,620 --> 00:12:22,460
just to make it complete.

160
00:12:22,460 --> 00:12:27,139
And here is S4, sorry, S3.

161
00:12:27,139 --> 00:12:32,460
And let's tune, we're in the scenario 3, 3, 4, and 10,

162
00:12:32,460 --> 00:12:36,259
11, 12, and 13.

163
00:12:36,259 --> 00:12:39,860
And I'm not showing the indexes before 10.

164
00:12:39,860 --> 00:12:42,700
It's a lot of these very relevant.

165
00:12:42,700 --> 00:12:46,900
Let's use the timeline, these different surfaces.

166
00:12:46,900 --> 00:12:51,700
And just let's start out assuming that S2 becomes the leader.

167
00:12:51,700 --> 00:12:56,460
Because it has the highest, it is most of the date.

168
00:12:56,460 --> 00:12:59,300
It has the highest turn number in the last large entry.

169
00:12:59,300 --> 00:13:00,860
So it becomes leader.

170
00:13:00,860 --> 00:13:04,620
And now we need to understand how about the protocol

171
00:13:04,620 --> 00:13:07,220
is to synchronize these particular logs.

172
00:13:07,220 --> 00:13:10,100
And the way this almost happens is a side effect

173
00:13:10,700 --> 00:13:13,899
either the append entries because new log entries

174
00:13:13,899 --> 00:13:15,580
are appended or because of hardbeats,

175
00:13:15,580 --> 00:13:19,740
which basically are append entries with zero new entries.

176
00:13:19,740 --> 00:13:22,100
So let's assume that the leader actually sends a heartbeat out.

177
00:13:22,100 --> 00:13:24,060
In fact, the dot hit correct after every election

178
00:13:24,060 --> 00:13:26,060
and neatly sends out a heartbeat.

179
00:13:26,060 --> 00:13:28,340
And so it will send out a heartbeat.

180
00:13:28,340 --> 00:13:32,300
And the heartbeat basically has no log entries.

181
00:13:32,300 --> 00:13:35,420
But it also indicates two other pieces of information,

182
00:13:35,420 --> 00:13:39,980
namely the previous term, which

183
00:13:39,980 --> 00:13:43,019
in this case is going to be five.

184
00:13:43,019 --> 00:13:48,139
And the previous index is going to be 12.

185
00:13:48,139 --> 00:13:52,100
So it sends it off to the leader, S2 sensor to S3.

186
00:13:52,100 --> 00:13:55,740
And S3 looks at this and says, well, when we look,

187
00:13:55,740 --> 00:14:00,220
my previous term is actually is not five,

188
00:14:00,220 --> 00:14:02,340
it's actually even four.

189
00:14:02,340 --> 00:14:05,460
And so it actually sends back an message saying, no.

190
00:14:06,300 --> 00:14:11,300
I'm in a live in principle, but I cannot do your append.

191
00:14:13,019 --> 00:14:15,019
So I'm not at the date.

192
00:14:15,019 --> 00:14:20,259
And so now S2 has some information to actually bring it up the date.

193
00:14:20,259 --> 00:14:25,300
And the way it works is there's two variables that are important.

194
00:14:25,300 --> 00:14:28,740
One for every note,

195
00:14:28,740 --> 00:14:32,139
S2 keeps a variable next index.

196
00:14:36,460 --> 00:14:39,300
And next index, when it initializes it,

197
00:14:39,300 --> 00:14:44,220
when it becomes leader, it is sort of an optimistic variable.

198
00:14:44,220 --> 00:14:48,060
It just assumes that the logs are actually up to date.

199
00:14:48,060 --> 00:14:54,060
And so when S2 becomes leader, it actually just sets it to 13.

200
00:14:54,060 --> 00:14:57,060
The same value that actually it has for itself.

201
00:14:57,060 --> 00:15:00,420
And that's perfectly fine because it just

202
00:15:00,420 --> 00:15:03,740
gets about what actually the where S3 might be.

203
00:15:04,740 --> 00:15:07,340
And then because there's no message,

204
00:15:07,340 --> 00:15:10,220
the leader actually learns that.

205
00:15:10,220 --> 00:15:12,620
And so in fact, one that gets this no message

206
00:15:12,620 --> 00:15:16,259
in the unoptimized version.

207
00:15:16,259 --> 00:15:19,259
So I'm just first talking about the unoptimized version.

208
00:15:22,899 --> 00:15:25,980
The leader just decrements the next index by one.

209
00:15:25,980 --> 00:15:29,139
And so it decreends 13 to 12.

210
00:15:29,139 --> 00:15:33,259
And then we got to what some point will send another append entries.

211
00:15:33,299 --> 00:15:35,779
And this time around, it will actually say,

212
00:15:35,779 --> 00:15:37,419
okay, I'll next in this is 12.

213
00:15:37,419 --> 00:15:39,779
I've got a sense log entry five.

214
00:15:41,019 --> 00:15:46,019
And the previous term is going to be three.

215
00:15:47,340 --> 00:15:51,860
And the previous index is going to be 11.

216
00:15:53,899 --> 00:15:58,139
And so when S3 actually receives this message,

217
00:15:58,139 --> 00:15:59,460
it checks the previous term.

218
00:15:59,460 --> 00:16:02,539
It's three, the previous index is 11, that all works out.

219
00:16:02,539 --> 00:16:04,539
It sees that it has to append five.

220
00:16:04,539 --> 00:16:09,539
And so it will erase the four and stick a five in there

221
00:16:09,539 --> 00:16:13,299
and basically response and yep, good.

222
00:16:16,459 --> 00:16:21,459
And so at this point, the leader knows

223
00:16:21,459 --> 00:16:23,379
that actually the log is up to date

224
00:16:23,379 --> 00:16:25,939
because it got an okay message back.

225
00:16:27,500 --> 00:16:29,019
So then there's the second variable

226
00:16:29,019 --> 00:16:31,740
that plays an important role in all this,

227
00:16:31,740 --> 00:16:36,299
which is match index, which graph also maintains

228
00:16:36,299 --> 00:16:40,500
for when the leader also maintains for every faller.

229
00:16:40,500 --> 00:16:42,700
And so there's a next index for S3,

230
00:16:42,700 --> 00:16:43,980
there's a next index for S1.

231
00:16:43,980 --> 00:16:45,700
And same alert, there's a match index

232
00:16:45,700 --> 00:16:47,740
for S1, S2, S3, too.

233
00:16:48,700 --> 00:16:50,180
And this one is sort of like you can figure out,

234
00:16:50,180 --> 00:16:53,779
this is pessimistic, or lower bound.

235
00:16:55,299 --> 00:16:58,700
So when the leader actually becomes a leader,

236
00:16:58,700 --> 00:17:00,580
it actually just valid just to zero.

237
00:17:02,019 --> 00:17:04,700
And to indicate that basically a farjit knows

238
00:17:05,740 --> 00:17:09,539
the S3 doesn't really have any log entries at all.

239
00:17:10,539 --> 00:17:15,539
And so it hasn't delivered any log entries to the application.

240
00:17:15,700 --> 00:17:18,019
And so for S2 also has to be very careful

241
00:17:18,019 --> 00:17:20,620
about what actually it can be delivered to the application.

242
00:17:20,620 --> 00:17:22,420
Because you know, it needs to know

243
00:17:22,420 --> 00:17:25,420
that at least the majority of the followers actually has

244
00:17:25,420 --> 00:17:28,180
a copy of a particular log entry before it can deliver it.

245
00:17:29,180 --> 00:17:33,740
And so it just starts out to be pessimistic.

246
00:17:33,740 --> 00:17:36,620
But then once it learns that your example,

247
00:17:37,700 --> 00:17:42,539
once it learns actually that the follower is okay,

248
00:17:42,539 --> 00:17:44,660
and we've got an okay on the append message,

249
00:17:44,660 --> 00:17:48,539
it can actually update the pessimistic lower bound

250
00:17:48,539 --> 00:17:53,060
or the match index from zero to actually 13.

251
00:17:53,060 --> 00:17:57,740
Because it has learned that the follower is actually

252
00:17:57,740 --> 00:18:01,059
up to date to 13 and that is the next index

253
00:18:01,059 --> 00:18:02,940
that is expect is 13.

254
00:18:03,900 --> 00:18:05,339
And at this point in time, you know,

255
00:18:05,339 --> 00:18:07,900
basically it has learned from two different,

256
00:18:07,900 --> 00:18:11,859
in those of the particular log entry five

257
00:18:11,859 --> 00:18:14,099
is actually now replicated at least in two notes.

258
00:18:16,900 --> 00:18:18,660
And so you might think, well, it's good.

259
00:18:18,660 --> 00:18:20,819
It has been replicated in two notes.

260
00:18:20,819 --> 00:18:22,339
We can deliver to the application

261
00:18:22,339 --> 00:18:24,180
because the majority clearly has it

262
00:18:24,940 --> 00:18:26,539
and we're in good shape.

263
00:18:27,539 --> 00:18:31,500
And unfortunately, that actually turns out not to be the case.

264
00:18:31,500 --> 00:18:34,420
It's close to true but not completely true.

265
00:18:34,420 --> 00:18:38,299
And this actually has to do with figure eight.

266
00:18:38,299 --> 00:18:39,899
So I wanna talk a little bit about figure eight.

267
00:18:39,899 --> 00:18:41,779
And the real reason what's going on here

268
00:18:41,779 --> 00:18:43,180
is what can make this slightly complicated

269
00:18:43,180 --> 00:18:44,460
and you also should think, you know,

270
00:18:44,460 --> 00:18:45,819
it's a little bit fishy.

271
00:18:45,819 --> 00:18:49,299
So this leader has to just erase a value

272
00:18:49,299 --> 00:18:54,299
out of the log off S3 and somebody put that in

273
00:18:55,299 --> 00:19:00,299
and you're, you know, erasing it seems a little bit dangerous.

274
00:19:00,819 --> 00:19:05,500
And so it turns out there is a coordinate case

275
00:19:06,379 --> 00:19:09,700
where you have to be a little bit careful

276
00:19:09,700 --> 00:19:12,940
by when you deliver, when you declare a message

277
00:19:12,940 --> 00:19:13,779
actually committed.

278
00:19:14,940 --> 00:19:16,500
And it turns out that basically,

279
00:19:18,899 --> 00:19:21,339
so figure eight illustrates that.

280
00:19:22,339 --> 00:19:24,179
So let me talk a little bit about this,

281
00:19:24,179 --> 00:19:27,699
erasing log entries.

282
00:19:31,539 --> 00:19:33,939
And what we will see is that the rule for actually

283
00:19:33,939 --> 00:19:35,699
when the message can be delivered, you know,

284
00:19:35,699 --> 00:19:40,779
to the application is slightly more subtle

285
00:19:40,779 --> 00:19:44,220
than just counting the replicas.

286
00:19:47,139 --> 00:19:49,899
Let's see if they get to figure eight, load it in.

287
00:19:50,900 --> 00:19:52,140
Okay, so here's figure eight.

288
00:19:53,820 --> 00:19:55,820
And so this is usual structure.

289
00:19:58,980 --> 00:20:00,940
Okay, let me get back to the questioning the,

290
00:20:02,980 --> 00:20:04,700
in the chat in a second.

291
00:20:05,980 --> 00:20:07,420
So here's figure eight.

292
00:20:07,420 --> 00:20:08,900
And so once it was walked through

293
00:20:08,900 --> 00:20:10,620
what the scenario here is,

294
00:20:10,620 --> 00:20:14,019
correct in figure A, you know, log in through one

295
00:20:14,019 --> 00:20:16,180
has been committed by everybody.

296
00:20:17,180 --> 00:20:22,180
You know, the S1 or S2 became leader in entry in term two.

297
00:20:25,539 --> 00:20:27,420
They committed or they started

298
00:20:27,420 --> 00:20:31,140
depending on entry two hasn't been committed yet

299
00:20:31,140 --> 00:20:33,580
because it's not on the majority for sure.

300
00:20:33,580 --> 00:20:35,060
Then in B, what actually happens,

301
00:20:35,060 --> 00:20:37,060
you know, S5 must be disconnected,

302
00:20:37,060 --> 00:20:39,299
has learned of this term two,

303
00:20:39,299 --> 00:20:40,980
became a leader in term three,

304
00:20:40,980 --> 00:20:44,460
appended an entry to its log.

305
00:20:44,460 --> 00:20:45,500
That certainly is not committed

306
00:20:45,619 --> 00:20:46,900
because there's no majority.

307
00:20:46,900 --> 00:20:51,900
Then we end up in C, maybe the S5 actually got disconnected again,

308
00:20:53,500 --> 00:20:57,099
S1 becomes a leader in term four

309
00:20:57,099 --> 00:20:59,380
and then starts replicating entry,

310
00:20:59,380 --> 00:21:01,779
this log entry two to other nodes.

311
00:21:02,779 --> 00:21:04,940
And in fact, you know,

312
00:21:04,940 --> 00:21:07,259
it delivers it, you know, it gets back,

313
00:21:07,259 --> 00:21:09,380
you know, it's like it's up to show on the previous slide.

314
00:21:10,420 --> 00:21:11,859
It knows it's actually on S2

315
00:21:11,859 --> 00:21:13,380
and it knows it actually is on S3.

316
00:21:14,380 --> 00:21:18,380
And in terms of, you know, that actually,

317
00:21:18,380 --> 00:21:20,260
you might think, okay, well, you know,

318
00:21:20,260 --> 00:21:23,460
as one knows, you know, that actually,

319
00:21:23,460 --> 00:21:26,540
the free nodes that actually have a copy

320
00:21:26,540 --> 00:21:29,380
of this particular entry and so I might be able to deliver it.

321
00:21:29,380 --> 00:21:30,940
And it turns out that's not true.

322
00:21:32,100 --> 00:21:37,100
And there's a more subtle reasoning

323
00:21:37,500 --> 00:21:40,420
that needs to happen to actually commit.

324
00:21:40,420 --> 00:21:42,540
And namely, you can only commit,

325
00:21:42,539 --> 00:21:43,379
oops, sorry.

326
00:21:46,940 --> 00:21:50,940
You can commit after the leader has committed

327
00:22:00,379 --> 00:22:04,019
one entry in its own term.

328
00:22:04,299 --> 00:22:05,299
And if we think about this,

329
00:22:05,299 --> 00:22:06,819
it's going to number two,

330
00:22:06,819 --> 00:22:10,139
it actually is in term, the leaders in term four.

331
00:22:10,139 --> 00:22:14,539
And so the commit rule wouldn't allow actually committing two

332
00:22:14,539 --> 00:22:26,500
immediately to the surface because that actually is one

333
00:22:26,500 --> 00:22:28,700
from a previous term and not from the current term.

334
00:22:28,700 --> 00:22:31,460
And so, for example, your code to decide

335
00:22:31,460 --> 00:22:33,980
whether actually something can be delivered on the applied channel,

336
00:22:34,099 --> 00:22:36,099
we need to take that as an account.

337
00:22:36,099 --> 00:22:38,180
And the reason you need to take the account is illustrated

338
00:22:38,180 --> 00:22:39,019
by DNA.

339
00:22:40,460 --> 00:22:43,740
Where basically what can happen is that, you know,

340
00:22:43,740 --> 00:22:47,180
four, you know, as one actually, you might,

341
00:22:48,220 --> 00:22:50,740
we might actually end up in a different situation

342
00:22:50,740 --> 00:22:55,220
where D actually becomes the,

343
00:22:56,579 --> 00:22:57,380
after,

344
00:22:57,620 --> 00:22:58,620
you know,

345
00:23:00,620 --> 00:23:03,060
D actually becomes the leader,

346
00:23:03,060 --> 00:23:06,580
after, for example, as one of which has been disconnected

347
00:23:06,580 --> 00:23:09,780
and it might actually start connecting,

348
00:23:09,780 --> 00:23:11,220
it can form a majority.

349
00:23:11,220 --> 00:23:14,820
And actually it starts copying its particular,

350
00:23:14,820 --> 00:23:16,180
its entries to actually,

351
00:23:18,700 --> 00:23:22,180
it raises the two's and actually copies it's free

352
00:23:22,180 --> 00:23:24,660
in like the entry for its term three

353
00:23:24,660 --> 00:23:27,220
into whatever it used to be to.

354
00:23:27,339 --> 00:23:29,460
And this is the raising that we talked about

355
00:23:29,460 --> 00:23:30,460
on the previous slide.

356
00:23:31,819 --> 00:23:36,339
And so we'll see actually that even though T

357
00:23:36,339 --> 00:23:38,259
was on the majority of the notes,

358
00:23:38,259 --> 00:23:40,539
what on the majority of notes had got erased.

359
00:23:41,500 --> 00:23:45,900
And so the rule, and therefore the rule is as stated here

360
00:23:45,900 --> 00:23:50,500
because once, this is illustrated by E,

361
00:23:50,500 --> 00:23:55,299
once actually S3, S1, commits an entry in its own term.

362
00:23:56,139 --> 00:23:58,180
And so it knows that every,

363
00:23:58,180 --> 00:24:00,539
no, there's a majority in its own term.

364
00:24:00,539 --> 00:24:03,059
So at this point, it can actually deliver four,

365
00:24:03,059 --> 00:24:04,740
you know, through the application.

366
00:24:04,740 --> 00:24:06,259
And as a result of that,

367
00:24:06,259 --> 00:24:09,059
you know, any notes that were committed in previous terms

368
00:24:09,059 --> 00:24:12,180
can also be delivered, you know, to the application.

369
00:24:13,180 --> 00:24:15,980
And so you see here that there's a raising with log entries,

370
00:24:15,980 --> 00:24:17,180
and it basically commits the,

371
00:24:17,180 --> 00:24:20,619
makes the commit rule quite slightly more complicated.

372
00:24:20,619 --> 00:24:22,139
And that's just the design decisions,

373
00:24:22,139 --> 00:24:23,779
the design of a raft,

374
00:24:25,460 --> 00:24:27,940
made, and they could have done it differently.

375
00:24:27,940 --> 00:24:31,419
They could have counted and made basically two survived

376
00:24:31,419 --> 00:24:32,419
if they wanted to,

377
00:24:32,419 --> 00:24:34,379
but they decided to go for this particular approach,

378
00:24:34,379 --> 00:24:36,779
you know, on the grounds that they think it's simpler.

379
00:24:39,740 --> 00:24:43,220
Okay, so this is a subtly that will show up,

380
00:24:43,220 --> 00:24:46,019
you know, in the test cases for the last.

381
00:24:46,019 --> 00:24:48,579
And so you have to be a little bit careful

382
00:24:48,579 --> 00:24:49,659
with your commit rule.

383
00:24:52,019 --> 00:24:53,740
And the given point is correct.

384
00:24:56,099 --> 00:25:03,099
Okay, so far, you know, if you go back to this particular picture,

385
00:25:03,099 --> 00:25:06,379
the unoptimized version of this protocol

386
00:25:08,059 --> 00:25:11,220
is a little bit of a bummer, right?

387
00:25:11,220 --> 00:25:14,259
Like if you think a little bit about this,

388
00:25:14,259 --> 00:25:18,659
let's look at actually what happens with S1.

389
00:25:20,180 --> 00:25:22,980
So let's say, let me switch things.

390
00:25:23,140 --> 00:25:25,500
Let's say S2 tries to bring S1 up today,

391
00:25:25,500 --> 00:25:27,299
you can all do the same thing,

392
00:25:27,299 --> 00:25:29,059
you know, send in a pen entries, you know,

393
00:25:29,059 --> 00:25:32,299
with Nail entries, pass term, you know,

394
00:25:32,299 --> 00:25:34,140
previous term to be five.

395
00:25:36,539 --> 00:25:41,539
And previous index to be 12, it will say no, right?

396
00:25:43,460 --> 00:25:44,620
I'll actually use that index,

397
00:25:44,620 --> 00:25:48,500
you know, previous index is actually a 10 with term free.

398
00:25:48,500 --> 00:25:49,339
So it will,

399
00:25:50,339 --> 00:25:54,339
this guy will decrease its next index going from 13 to 12.

400
00:25:56,819 --> 00:25:59,459
Then we'll do the same thing again, you know,

401
00:25:59,459 --> 00:26:03,259
we'll send, I guess it's going to send five,

402
00:26:03,259 --> 00:26:07,299
the lock entry five, it will send the previous term to be free.

403
00:26:07,299 --> 00:26:10,779
And index, previous index to be 11.

404
00:26:10,779 --> 00:26:13,139
It's going to get a no back.

405
00:26:13,139 --> 00:26:15,939
You know, then the index goes to 12 to 11.

406
00:26:16,939 --> 00:26:19,139
And now basically it's going to work.

407
00:26:19,259 --> 00:26:20,780
And so what we see here that basically

408
00:26:20,780 --> 00:26:23,820
for every lock entry, we're going to have a round trip,

409
00:26:23,820 --> 00:26:26,140
you know, sort of one of these append entries.

410
00:26:26,140 --> 00:26:29,220
And turns out, you know, that can be expensive.

411
00:26:29,220 --> 00:26:30,540
Like left through,

412
00:26:30,540 --> 00:26:31,860
and the real question is like, you know,

413
00:26:31,860 --> 00:26:34,420
can the follower be far, far behind?

414
00:26:35,500 --> 00:26:36,940
Yeah, and let me ask that,

415
00:26:36,940 --> 00:26:38,020
we're positive for a second,

416
00:26:38,020 --> 00:26:41,220
and so you can reflect and think about that case.

417
00:26:41,220 --> 00:26:44,540
Is this possible that the follower can be far, far behind

418
00:26:44,540 --> 00:26:45,900
for a given leader?

419
00:26:49,540 --> 00:26:52,140
If a new machine joins the cluster.

420
00:26:52,140 --> 00:26:54,580
Yeah, if a new machine joins the cluster,

421
00:26:54,580 --> 00:26:56,140
there's a good example, any other cases?

422
00:26:57,940 --> 00:27:00,340
A machine crashed and is only coming back online

423
00:27:00,340 --> 00:27:01,780
after several terms?

424
00:27:01,780 --> 00:27:03,060
Yeah, exactly.

425
00:27:03,060 --> 00:27:04,860
It comes back after a day, right?

426
00:27:04,860 --> 00:27:07,060
So it might be far, far behind.

427
00:27:07,060 --> 00:27:09,300
And so that would mean like in the vertical,

428
00:27:09,300 --> 00:27:11,259
and I'm an optimized version that you're going to go back

429
00:27:11,259 --> 00:27:13,380
one by one from the lock entry.

430
00:27:13,380 --> 00:27:15,020
And so that's a little bit expensive.

431
00:27:15,020 --> 00:27:18,420
And so the paper actually discusses an optimization.

432
00:27:18,420 --> 00:27:19,779
So to catch up quickly.

433
00:27:30,900 --> 00:27:35,900
And the idea basically is instead of like backing off,

434
00:27:38,980 --> 00:27:41,740
so suddenly the next index is basically optimistic.

435
00:27:41,740 --> 00:27:42,740
It just gets, right?

436
00:27:42,740 --> 00:27:45,580
And it doesn't really have to be that accurate.

437
00:27:46,419 --> 00:27:49,419
And so the optimization is that we don't really

438
00:27:49,419 --> 00:27:51,179
have to go one by one back.

439
00:27:51,179 --> 00:27:53,899
It's perfectly fine, for example, to go a whole turn back.

440
00:27:53,899 --> 00:27:58,220
And in fact, the logical maybe that is the node.

441
00:27:58,220 --> 00:27:59,819
It's a couple of terms back.

442
00:27:59,819 --> 00:28:01,299
And so we back off a couple of terms,

443
00:28:01,299 --> 00:28:04,379
and then we'll skin from there.

444
00:28:04,379 --> 00:28:07,579
So to illustrate a little bit how that works,

445
00:28:07,579 --> 00:28:09,980
when you use the following sample.

446
00:28:09,980 --> 00:28:12,859
And I'm just going to two servers, even though there might

447
00:28:12,859 --> 00:28:15,019
be a meat free, two or a half majority,

448
00:28:15,019 --> 00:28:17,019
but let's assume there's a third one.

449
00:28:17,019 --> 00:28:19,740
And it just plays happily along.

450
00:28:19,740 --> 00:28:23,460
So here's S1, here's S2.

451
00:28:23,460 --> 00:28:33,779
And let's see, this guy has 5, 5, 5, 4, 5.

452
00:28:33,779 --> 00:28:39,660
And this is 1, 2, 3, 4, 5, indexes.

453
00:28:40,540 --> 00:28:47,460
Let's say this S2 has four, basically, all sixes.

454
00:28:47,460 --> 00:28:50,820
So basically, S1 is quite wide, correct?

455
00:28:50,820 --> 00:28:52,580
Because I've been only placed where

456
00:28:52,580 --> 00:28:55,220
the action line up is in the first entry,

457
00:28:55,220 --> 00:28:58,540
in the first four, which has turned four.

458
00:28:58,540 --> 00:29:01,340
And so in the unoptimized scheme, we would back off

459
00:29:01,340 --> 00:29:06,060
like one by one, one by one, until we finally got there.

460
00:29:06,059 --> 00:29:10,619
To optimize this, the paper describes an optimization.

461
00:29:10,619 --> 00:29:12,299
Unfortunately, the optimization is not

462
00:29:12,299 --> 00:29:15,139
as described in the same amount of detail as a figure 2.

463
00:29:15,139 --> 00:29:18,259
And so in fact, if you get a URL for 2C,

464
00:29:18,259 --> 00:29:20,179
it actually passed 2C, you do actually have

465
00:29:20,179 --> 00:29:24,419
to have this optimisation of volume of this optimization

466
00:29:24,419 --> 00:29:25,179
implemented.

467
00:29:25,179 --> 00:29:27,059
But you're reasonable free, actually, how to implement it.

468
00:29:27,059 --> 00:29:29,460
Because the paper action doesn't describe very precisely

469
00:29:29,460 --> 00:29:30,659
which, how you should do it, then you

470
00:29:30,659 --> 00:29:32,460
will have to do a little bit of work.

471
00:29:32,460 --> 00:29:35,139
But the basic idea is just follows.

472
00:29:35,140 --> 00:29:38,660
And just instead of just voting, or just saying no, or yes,

473
00:29:38,660 --> 00:29:43,420
as we on the previous slide, the rejection,

474
00:29:43,420 --> 00:29:46,220
so you say no, the rejection includes

475
00:29:46,220 --> 00:29:47,660
a little bit of more information.

476
00:29:47,660 --> 00:29:50,620
And that information is going to help the leader

477
00:29:50,620 --> 00:29:53,220
to basically back off quicker.

478
00:29:53,220 --> 00:29:56,259
And so it includes something about the call,

479
00:29:56,259 --> 00:29:59,820
the conflicting term, in the response,

480
00:29:59,820 --> 00:30:01,020
and the conflicting index.

481
00:30:01,299 --> 00:30:10,940
And the conflicting term is basically the if,

482
00:30:10,940 --> 00:30:13,220
let me actually make this a little bit more clear.

483
00:30:13,220 --> 00:30:18,259
Let's say we're S1, the timeline, here's S2.

484
00:30:18,259 --> 00:30:21,420
So S2 sense of, you know, is elected leader in 7,

485
00:30:21,420 --> 00:30:21,940
correct?

486
00:30:21,940 --> 00:30:24,779
Because it has the most up-to-date log.

487
00:30:24,779 --> 00:30:28,339
It sends a message to S1, a heartbeat.

488
00:30:28,339 --> 00:30:31,179
And in the heartbeat, it will say, you know,

489
00:30:31,179 --> 00:30:36,179
the previous term was 6.

490
00:30:36,179 --> 00:30:42,740
And the previous index was 5.

491
00:30:42,740 --> 00:30:45,740
And now when S1 gets this, you know, it looks at this log,

492
00:30:45,740 --> 00:30:49,019
and it sees that actually the previous term was 5.

493
00:30:49,019 --> 00:30:52,659
And so instead of actually, and so it will include in response,

494
00:30:52,659 --> 00:30:55,579
you know, the conflicting term, the term where it

495
00:30:55,579 --> 00:30:58,740
conflicts on in that index, and that was 5.

496
00:30:58,740 --> 00:31:00,299
We're going to find a entry.

497
00:31:00,299 --> 00:31:04,659
And then it also includes what the first index of that term

498
00:31:04,659 --> 00:31:05,539
is in this log.

499
00:31:05,539 --> 00:31:08,419
So we look at this term, like a 555.

500
00:31:08,419 --> 00:31:10,579
And the first time, like the index 5 showed up,

501
00:31:10,579 --> 00:31:12,179
it's a log is at the index 2.

502
00:31:12,179 --> 00:31:14,179
And so it will include that 2.

503
00:31:14,179 --> 00:31:17,019
And we'll send that back to the leader.

504
00:31:17,019 --> 00:31:19,220
So here's S2, which is our leader.

505
00:31:19,220 --> 00:31:22,859
And so we're going to send back, you know, 5,

506
00:31:22,859 --> 00:31:26,179
comma 2, that's the conflicting information.

507
00:31:26,179 --> 00:31:30,740
And the leader uses that information to basically skip

508
00:31:30,740 --> 00:31:32,459
back or trigger, in fact, you know, it

509
00:31:32,459 --> 00:31:33,699
skips back, you know, from.

510
00:31:33,699 --> 00:31:42,699
So initially, its guess was next index for S1 was 6.

511
00:31:42,699 --> 00:31:44,219
And based on this information,

512
00:31:44,219 --> 00:31:46,379
that extra scales it back to 2.

513
00:31:46,379 --> 00:31:48,059
So it turns it into 2.

514
00:31:48,059 --> 00:31:50,819
And then the next appendentries is going

515
00:31:50,819 --> 00:31:54,019
to include everything from 2.

516
00:31:54,019 --> 00:31:58,259
So it's going to include 5, 5, 5.

517
00:31:58,259 --> 00:32:01,059
And previous term is 4.

518
00:32:01,059 --> 00:32:04,779
And previous index is 1.

519
00:32:04,779 --> 00:32:08,460
And now S1, one swap, all swap, basically copy,

520
00:32:08,460 --> 00:32:10,500
you know, the new log entries over, you know,

521
00:32:10,500 --> 00:32:14,379
the entries 2, 3, 4, 5, and that's in the back of the date.

522
00:32:14,379 --> 00:32:16,859
And so this basically, you know, reduces the number of sort

523
00:32:16,859 --> 00:32:19,619
of hard beats, you know, to catch up,

524
00:32:19,619 --> 00:32:23,059
a follower by one per term instead of one per entry.

525
00:32:31,019 --> 00:32:33,619
Any questions?

526
00:32:33,619 --> 00:32:36,379
How do we make sure that we don't, you know,

527
00:32:36,379 --> 00:32:37,500
overload the bandwidth?

528
00:32:37,500 --> 00:32:40,059
Is it imagine if you have like a, if you're

529
00:32:40,059 --> 00:32:42,459
trying to send back like all of these log entries,

530
00:32:42,459 --> 00:32:44,579
could that cause problems in terms of like packets

531
00:32:44,579 --> 00:32:46,179
that are too large?

532
00:32:46,179 --> 00:32:48,179
Yeah, sort of a great question.

533
00:32:48,460 --> 00:32:51,700
And because it sort of indicates an alternative scheme,

534
00:32:51,700 --> 00:32:56,900
that you know, back here is that instead of actually making

535
00:32:56,900 --> 00:32:59,779
this optimistic guess, you know, why make a guess at all?

536
00:32:59,779 --> 00:33:01,220
Just send everything.

537
00:33:01,220 --> 00:33:03,820
The leader could have sent like, though, it's whole log

538
00:33:03,820 --> 00:33:04,860
and it would be perfectly fine.

539
00:33:04,860 --> 00:33:06,779
And then basically, you know, any of the followers

540
00:33:06,779 --> 00:33:09,019
can sort of fish out the ones they need, right?

541
00:33:11,700 --> 00:33:14,220
And then we'd be in an alternative implementation.

542
00:33:14,220 --> 00:33:17,180
And presumably we don't like that implementation,

543
00:33:17,180 --> 00:33:21,539
because the log might be large and that would be problematic.

544
00:33:22,700 --> 00:33:25,700
So I think, you know, the basic guess here that's going on

545
00:33:25,700 --> 00:33:30,700
is that in the normal, in the typical situations,

546
00:33:30,700 --> 00:33:33,779
the followers are, you know, hopefully reasonable close

547
00:33:33,779 --> 00:33:34,620
together.

548
00:33:34,620 --> 00:33:37,820
And so backing off a couple of entries is extra sufficient.

549
00:33:37,820 --> 00:33:39,940
And if not, then, you know, we might as well back

550
00:33:39,940 --> 00:33:43,460
of one term, but not all terms.

551
00:33:43,460 --> 00:33:46,620
And so we'll send the log entries for one term.

552
00:33:46,859 --> 00:33:47,819
That might be a log.

553
00:33:47,819 --> 00:33:48,939
Right. That might be a lot.

554
00:33:48,939 --> 00:33:51,139
And we'll see in a second, like, how we get around that, right?

555
00:33:51,139 --> 00:33:54,699
Like, snapshotting is going to help reducing the number

556
00:33:54,699 --> 00:33:56,379
of log entries that we have to send.

557
00:33:59,619 --> 00:34:01,419
So there was question of do you need to implement this sort

558
00:34:01,419 --> 00:34:05,139
of a version of this optimization scheme in lab 2C?

559
00:34:05,139 --> 00:34:05,939
And yes, yes.

560
00:34:07,099 --> 00:34:09,940
At least I believe I haven't been able to pass the test

561
00:34:09,940 --> 00:34:11,940
without implementing some optimization.

562
00:34:12,940 --> 00:34:14,940
So I have a question.

563
00:34:14,940 --> 00:34:19,940
So I, in my code, I did the optimization by backing off

564
00:34:19,940 --> 00:34:20,940
to, like, to the commit.

565
00:34:20,940 --> 00:34:25,940
So I made the reply, include the last commit index.

566
00:34:25,940 --> 00:34:27,940
And then I started from there.

567
00:34:27,940 --> 00:34:29,940
Is that much worse?

568
00:34:29,940 --> 00:34:34,940
I do mind running trouble in the, so that the tests keep track

569
00:34:34,940 --> 00:34:37,940
of how many bytes you sent and gives you a budget.

570
00:34:37,940 --> 00:34:40,940
And if you're like, I go across the board,

571
00:34:40,940 --> 00:34:43,940
I go across the budget, you know, by too much.

572
00:34:43,940 --> 00:34:48,940
Then the test will say, like, well, you're just sending too much data.

573
00:34:48,940 --> 00:34:50,940
Yes.

574
00:34:50,940 --> 00:34:53,940
Because in your scheme, it might be the case that I think you will send

575
00:34:53,940 --> 00:34:55,940
more data than really necessary.

576
00:34:55,940 --> 00:34:57,940
Whatever necessary means.

577
00:34:57,940 --> 00:35:00,940
But.

578
00:35:00,940 --> 00:35:02,940
There is a question in chat.

579
00:35:02,940 --> 00:35:03,940
Yeah.

580
00:35:03,940 --> 00:35:05,940
Did I say draw the wrong thing?

581
00:35:05,940 --> 00:35:06,940
Yeah, 6666.

582
00:35:06,940 --> 00:35:07,940
Sorry.

583
00:35:07,940 --> 00:35:09,940
Thank you.

584
00:35:09,940 --> 00:35:16,940
I don't want to follow or rain the leaders.

585
00:35:16,940 --> 00:35:18,940
Mark Andrews.

586
00:35:18,940 --> 00:35:19,940
Sorry about that.

587
00:35:19,940 --> 00:35:23,940
Good catch.

588
00:35:23,940 --> 00:35:32,940
Any questions?

589
00:35:32,940 --> 00:35:33,940
Okay.

590
00:35:33,940 --> 00:35:39,940
Okay.

591
00:35:39,940 --> 00:35:40,940
Okay.

592
00:35:40,940 --> 00:35:44,940
So the, when you talk a little bit about the persistence.

593
00:35:44,940 --> 00:35:47,940
We have one question in the chat first.

594
00:35:47,940 --> 00:35:48,940
Okay.

595
00:35:48,940 --> 00:35:52,940
They're wondering why the rejection has send back the rejected term

596
00:35:52,940 --> 00:35:56,940
number as well as the index.

597
00:35:56,940 --> 00:36:01,940
Well, that depends very much how you actually implement the,

598
00:36:01,940 --> 00:36:07,940
how what kind of state you maintain on the leader and how the leader decides to back off.

599
00:36:07,940 --> 00:36:13,940
You need to know, send some terms back because you need to explore.

600
00:36:13,940 --> 00:36:16,940
If you're in response to get delayed for a long period of time,

601
00:36:16,940 --> 00:36:22,940
you certainly should reject, you know, information from terms that are completely not relevant anymore.

602
00:36:22,940 --> 00:36:24,940
So.

603
00:36:24,940 --> 00:36:30,940
I know this is slightly vague answer, but it really very much dependent on the jacket, how you implement it.

604
00:36:30,940 --> 00:36:38,940
Okay.

605
00:36:38,940 --> 00:36:45,940
Persistence.

606
00:36:45,940 --> 00:36:49,940
We talked about persistence a little bit.

607
00:36:49,940 --> 00:36:55,940
In the last draft of the first draft lecture, we're, you know, we noted that, you know, the,

608
00:36:55,940 --> 00:37:00,940
but the state that we all are can only vote for one candidate in a per term.

609
00:37:00,940 --> 00:37:02,940
And therefore, it needs to remember.

610
00:37:02,940 --> 00:37:06,940
It's, you would vote for in what actually recurrent term is.

611
00:37:06,940 --> 00:37:11,940
But there is a sort of a larger issue around persistence.

612
00:37:12,940 --> 00:37:17,940
And that came up in one of the questions you're one of you just asked, which is.

613
00:37:17,940 --> 00:37:21,940
You know, what happens on reboot.

614
00:37:21,940 --> 00:37:25,019
There's two possible strategy you could think of.

615
00:37:25,019 --> 00:37:36,139
One strategy is strategy one is basically the node joins

616
00:37:36,139 --> 00:37:37,980
sort of freshly.

617
00:37:37,980 --> 00:37:40,059
So, of joins.

618
00:37:40,059 --> 00:37:44,780
Basically, when a node crashes and comes back up,

619
00:37:44,780 --> 00:37:46,220
it's just doesn't participate anymore.

620
00:37:46,220 --> 00:37:51,700
It has to rejoin the raft cluster.

621
00:37:52,500 --> 00:37:59,380
And that means, you know, when a rejoin should have to replay the log,

622
00:37:59,380 --> 00:38:02,380
where it basically has to receive every entry in the log,

623
00:38:02,380 --> 00:38:05,780
and then, you know, replay that.

624
00:38:05,780 --> 00:38:10,220
And of course, you know, like if a node has been down,

625
00:38:10,220 --> 00:38:13,300
or you know, a node crashes and is down for a day or two days,

626
00:38:13,300 --> 00:38:16,340
or even if it just goes down for a second,

627
00:38:16,340 --> 00:38:19,099
but, you know, the system has been up for a year,

628
00:38:19,139 --> 00:38:22,420
that number mean, like, you have to replay a lot of log entries.

629
00:38:22,420 --> 00:38:23,779
And so, that's a little bit annoying.

630
00:38:23,779 --> 00:38:28,059
And so, people prefer that strategy two, which is,

631
00:38:29,059 --> 00:38:30,259
you know, you come back up,

632
00:38:31,940 --> 00:38:34,179
and you just basically participate again.

633
00:38:35,500 --> 00:38:37,940
So, you catch up from, you know, you basically,

634
00:38:37,940 --> 00:38:40,059
you start from your persistent state.

635
00:38:50,099 --> 00:38:52,179
And the idea being that, you know,

636
00:38:52,179 --> 00:38:54,059
it's just a quick reboot, you crash,

637
00:38:54,059 --> 00:38:54,980
you come back up on the way,

638
00:38:54,980 --> 00:38:57,219
or it was a quick network failure.

639
00:38:57,219 --> 00:38:59,099
And so, maybe, you know, the rest, you know,

640
00:38:59,099 --> 00:39:03,139
moved one term along, you basically have all the state,

641
00:39:03,139 --> 00:39:06,179
and you know, should be reasonable quick to catch up.

642
00:39:06,179 --> 00:39:08,699
So, then the real question is, like, what needs to be,

643
00:39:08,699 --> 00:39:12,099
what state needs to be persistent across reboots?

644
00:39:12,980 --> 00:39:15,900
On, you know, where did he talk about voted for?

645
00:39:15,900 --> 00:39:17,460
That needs to be persistent.

646
00:39:19,819 --> 00:39:21,339
Because you are not allowed, you know,

647
00:39:21,339 --> 00:39:25,699
to vote for another candidate in the same term.

648
00:39:27,259 --> 00:39:28,860
And, but the, the rafting obtains

649
00:39:28,860 --> 00:39:30,339
a little bit more information.

650
00:39:30,339 --> 00:39:35,339
It also maintains the log on disk or inconsistent state

651
00:39:35,699 --> 00:39:37,579
and the current term.

652
00:39:42,980 --> 00:39:45,659
And for each one, we should ask ourselves the question,

653
00:39:46,659 --> 00:39:49,819
you know, why you maintain a persistent state?

654
00:39:49,819 --> 00:39:53,179
Because like, it means that whenever we update that state,

655
00:39:53,179 --> 00:39:56,099
you know, whenever we append an entry to the log,

656
00:39:56,099 --> 00:39:58,420
or whenever we increment the term,

657
00:39:58,420 --> 00:40:00,819
or you know, whenever we change forward of work,

658
00:40:00,819 --> 00:40:02,819
we actually have to write the disk and,

659
00:40:02,819 --> 00:40:03,899
or through stable storage.

660
00:40:03,899 --> 00:40:05,619
And the stable storage is expensive.

661
00:40:05,619 --> 00:40:08,099
And so, it's very likely that, like,

662
00:40:08,099 --> 00:40:13,099
for example, the writing to stable storage could be,

663
00:40:13,099 --> 00:40:14,339
it could be become a bottleneck.

664
00:40:15,940 --> 00:40:17,339
So, we're already talking about voting for,

665
00:40:17,339 --> 00:40:18,339
so I'm not going to cover again,

666
00:40:18,339 --> 00:40:19,859
but let's talk about the log.

667
00:40:19,859 --> 00:40:21,579
You know, why does the log have to be written

668
00:40:21,579 --> 00:40:22,899
through persistent storage?

669
00:40:24,819 --> 00:40:26,059
And we re-integrate.

670
00:40:38,940 --> 00:40:41,019
Another way of asking, let's say we don't write

671
00:40:41,019 --> 00:40:42,980
if you're stable storage, what would break?

672
00:40:45,659 --> 00:40:46,659
Okay.

673
00:40:55,460 --> 00:40:56,299
Yeah.

674
00:40:56,299 --> 00:40:57,299
And someone need to chat,

675
00:40:57,299 --> 00:40:59,420
to just answer this question in which

676
00:40:59,420 --> 00:41:01,500
you could lose the majority on the commit at right entries.

677
00:41:01,500 --> 00:41:02,579
Right?

678
00:41:02,579 --> 00:41:04,420
So, like, here's the scenario.

679
00:41:05,500 --> 00:41:10,339
The graph replicated the operation

680
00:41:10,339 --> 00:41:12,379
on a majority of the nodes.

681
00:41:12,380 --> 00:41:14,660
So somebody, you know,

682
00:41:14,660 --> 00:41:17,180
what George of the know is actually committed

683
00:41:17,180 --> 00:41:19,220
to actually delivering,

684
00:41:19,220 --> 00:41:20,619
and we haven't delivered,

685
00:41:20,619 --> 00:41:23,720
having accepted that log entry.

686
00:41:23,720 --> 00:41:26,980
So the leader sees the commitments,

687
00:41:26,980 --> 00:41:29,300
he delivers the message with their operation

688
00:41:29,300 --> 00:41:31,180
on the applied channel to the surface,

689
00:41:31,180 --> 00:41:33,660
the service after the activity operation,

690
00:41:33,660 --> 00:41:36,220
and lets the client know the operation has succeeded.

691
00:41:37,740 --> 00:41:40,380
So now, you know, basically we exposed the fact

692
00:41:40,380 --> 00:41:42,900
that this action operation was actually

693
00:41:42,900 --> 00:41:45,539
replicated in the majority of the know, it's to the client.

694
00:41:45,539 --> 00:41:48,380
And so it will not, if the followers

695
00:41:48,380 --> 00:41:50,940
that actually received that entry did not put it on,

696
00:41:50,940 --> 00:41:51,940
first on disk,

697
00:41:52,820 --> 00:41:56,780
and so that when they reboot, they still have it,

698
00:41:56,780 --> 00:41:57,980
we could run into the case,

699
00:41:57,980 --> 00:42:00,019
and that in exactly as the entry in the chat,

700
00:42:00,019 --> 00:42:02,019
that, you know, we lose the majority

701
00:42:02,019 --> 00:42:02,940
on a committed entry,

702
00:42:02,940 --> 00:42:04,619
and that entry will not be delivered

703
00:42:04,619 --> 00:42:08,539
on the remaining replicas to the surface,

704
00:42:08,539 --> 00:42:10,500
and so the client will see something strange,

705
00:42:10,500 --> 00:42:13,539
where it sees that an operation that it did actually happened,

706
00:42:13,539 --> 00:42:14,579
we'll a little bit later,

707
00:42:14,579 --> 00:42:17,860
actually that operation hasn't happened.

708
00:42:17,860 --> 00:42:19,019
And so it actually is important

709
00:42:19,019 --> 00:42:20,659
that this actually is unstable storage,

710
00:42:20,659 --> 00:42:23,500
and we basically promised the leader to commit it.

711
00:42:28,699 --> 00:42:30,619
And we cannot back out of that promise.

712
00:42:33,579 --> 00:42:36,300
Okay, any questions about this?

713
00:42:38,539 --> 00:42:39,380
Okay.

714
00:42:43,860 --> 00:42:47,500
Why do we need to remember the current term for disk,

715
00:42:47,500 --> 00:42:49,619
and why don't we, does that need to be stored stable?

716
00:42:53,659 --> 00:42:54,980
Well, the term,

717
00:42:57,460 --> 00:42:59,420
you vote for a different person in every term,

718
00:42:59,420 --> 00:43:01,300
so if you don't keep track of what term it is,

719
00:43:01,300 --> 00:43:02,699
then you don't really,

720
00:43:02,699 --> 00:43:04,900
you don't actually know who you voted for, right?

721
00:43:04,900 --> 00:43:06,380
Yeah, exactly, you know, you know,

722
00:43:06,380 --> 00:43:07,219
when you voted for it,

723
00:43:07,219 --> 00:43:09,939
one problem also, current terms always have to go up,

724
00:43:09,939 --> 00:43:12,500
right, you cannot go down in term,

725
00:43:12,500 --> 00:43:14,980
because you're gonna use that to detect RPCs

726
00:43:14,980 --> 00:43:18,579
from a state of leaders and state candidates.

727
00:43:20,019 --> 00:43:21,299
But this always has to go up.

728
00:43:30,939 --> 00:43:31,779
Okay.

729
00:43:34,739 --> 00:43:36,379
Any questions about persistence?

730
00:43:38,059 --> 00:43:38,899
Okay.

731
00:43:47,139 --> 00:43:51,980
I guess I'm a number one, which is more about the way

732
00:43:51,980 --> 00:43:55,619
you laid out stuff, but you say it's too strategy, right?

733
00:43:55,619 --> 00:44:00,619
Yeah, we play the log and starting from persistence state.

734
00:44:01,819 --> 00:44:03,339
Yeah.

735
00:44:03,339 --> 00:44:04,619
And so, I mean,

736
00:44:05,539 --> 00:44:08,460
the way you describe starting from a persistent state,

737
00:44:11,179 --> 00:44:14,259
do you, like, do you,

738
00:44:15,900 --> 00:44:20,900
replay, like, I guess it doesn't say in the slide,

739
00:44:21,339 --> 00:44:24,420
like if you have, does that assume you also have

740
00:44:24,420 --> 00:44:29,339
like the snapshot of your state?

741
00:44:29,339 --> 00:44:31,460
I have not talked about snapshot at all yet,

742
00:44:31,460 --> 00:44:32,859
which we'll talk about in a second.

743
00:44:32,860 --> 00:44:35,220
That's actually the next topic.

744
00:44:35,220 --> 00:44:37,340
Okay, but the point is, okay,

745
00:44:37,340 --> 00:44:39,980
there's two strategies after a node crashes.

746
00:44:39,980 --> 00:44:42,059
There's two ways to treat that node.

747
00:44:42,059 --> 00:44:44,380
One has a complete new node that never existed

748
00:44:44,380 --> 00:44:46,220
in a system ever.

749
00:44:46,220 --> 00:44:49,539
And so when it comes up, you add it to the cluster

750
00:44:49,539 --> 00:44:50,660
as as if it's a new node.

751
00:44:50,660 --> 00:44:53,940
So basically the cluster goes from, you know,

752
00:44:53,940 --> 00:44:55,500
let's say you started with seven nodes,

753
00:44:55,500 --> 00:44:57,980
one guy crashes, the cluster has six nodes,

754
00:44:57,980 --> 00:44:59,460
it just can happily proceed, you know,

755
00:44:59,460 --> 00:45:01,460
whatever the other nodes do their application

756
00:45:01,460 --> 00:45:02,740
and all that kind of stuff.

757
00:45:02,779 --> 00:45:06,539
And then the seven node actually comes back up.

758
00:45:06,539 --> 00:45:08,539
And so there's two ways of, you know,

759
00:45:08,539 --> 00:45:10,979
then join one way to say like, well,

760
00:45:10,979 --> 00:45:12,779
I just forget everything I did ever,

761
00:45:12,779 --> 00:45:15,179
I'll join the cluster again.

762
00:45:15,179 --> 00:45:17,419
And the other six nodes will bring me up to date.

763
00:45:17,419 --> 00:45:18,699
That will send the log to me

764
00:45:18,699 --> 00:45:20,500
and all we redo do operations.

765
00:45:21,859 --> 00:45:25,219
And that can be costly, even with snapshots.

766
00:45:25,219 --> 00:45:27,659
So the second strategy is to say, well,

767
00:45:27,659 --> 00:45:30,659
you know, if the same node seven comes back up again,

768
00:45:30,659 --> 00:45:34,259
it tries to reintegrate with its persistent state

769
00:45:34,259 --> 00:45:35,099
that it has.

770
00:45:36,819 --> 00:45:38,619
And basically the hope that, you know,

771
00:45:38,619 --> 00:45:40,420
if, for example, I did you went down for like,

772
00:45:40,420 --> 00:45:42,179
you know, a couple nanoseconds, a microsecond,

773
00:45:42,179 --> 00:45:43,179
or a millisecond,

774
00:45:43,179 --> 00:45:44,980
and it's basically not much catching up to do it all

775
00:45:44,980 --> 00:45:46,940
because it has all the state.

776
00:45:49,619 --> 00:45:51,659
But it would like,

777
00:45:53,699 --> 00:45:56,259
aside from the log, there's also like a state machine, right?

778
00:45:56,259 --> 00:45:58,699
That you've been like applying changes to.

779
00:45:58,699 --> 00:45:59,699
Yeah, I know.

780
00:45:59,699 --> 00:46:01,460
So yeah, let's talk about that.

781
00:46:01,460 --> 00:46:03,179
So there's nothing that's the next topic.

782
00:46:03,179 --> 00:46:04,019
Okay.

783
00:46:05,859 --> 00:46:06,859
I think you're here.

784
00:46:06,859 --> 00:46:09,460
So, you know, what about service recovery?

785
00:46:16,299 --> 00:46:19,379
Sorry, I actually have another question on persistence.

786
00:46:19,379 --> 00:46:20,699
Yep.

787
00:46:20,699 --> 00:46:23,619
When does the server decide to persist?

788
00:46:24,539 --> 00:46:26,179
Ah, good, great question.

789
00:46:26,179 --> 00:46:27,619
You know, what do you think?

790
00:46:28,980 --> 00:46:30,299
I'm sure you thought about this.

791
00:46:33,339 --> 00:46:37,579
I mean, I think a simple answer would be every time

792
00:46:37,579 --> 00:46:39,699
one of these variables changes,

793
00:46:39,699 --> 00:46:44,219
but that seems like a very costly thing to do.

794
00:46:44,219 --> 00:46:46,179
I think that this is the correct answer.

795
00:46:47,219 --> 00:46:48,699
Whenever one of these variable changes,

796
00:46:48,699 --> 00:46:51,819
you actually flush it to disk or you write it to the,

797
00:46:51,819 --> 00:46:53,659
in our case, correct it in the labs,

798
00:46:53,659 --> 00:46:56,500
you know, you write to the persistent module.

799
00:46:57,500 --> 00:46:58,500
Okay, and it does.

800
00:46:58,500 --> 00:47:00,500
So for example, when the leader, you know,

801
00:47:00,500 --> 00:47:03,500
accepts an entry, you know, for start and a pen,

802
00:47:03,500 --> 00:47:05,500
it's to reach local, it's log,

803
00:47:05,500 --> 00:47:08,500
it actually has to persist that entry.

804
00:47:13,500 --> 00:47:16,500
All right, and so does the persisting work incrementally?

805
00:47:16,500 --> 00:47:19,500
So it like once you get a new log entry,

806
00:47:19,500 --> 00:47:22,500
you append or just like take the entire state

807
00:47:22,500 --> 00:47:24,500
and like rewrite it into the file.

808
00:47:25,500 --> 00:47:27,500
Okay, in real life, you know, we repent, right?

809
00:47:27,500 --> 00:47:29,380
And you would not rewrite the whole log,

810
00:47:29,380 --> 00:47:31,219
you would just repent at one entry to the log.

811
00:47:31,219 --> 00:47:34,179
And that's actually one of the reasons that logs are cool,

812
00:47:34,179 --> 00:47:37,380
because you know, you can just sort of append at the end,

813
00:47:37,380 --> 00:47:38,219
incrementally.

814
00:47:39,380 --> 00:47:42,659
In our lab, you know, the whole thing is fake.

815
00:47:42,659 --> 00:47:44,980
The persisting actually doesn't really persist.

816
00:47:47,059 --> 00:47:50,940
It keeps the object around between crashes,

817
00:47:50,940 --> 00:47:52,739
because crashes are also sort of fake.

818
00:47:52,739 --> 00:47:54,299
You know, the test they're basically, you know,

819
00:47:54,299 --> 00:47:56,139
stops nodes, you know, re-starts them,

820
00:47:56,139 --> 00:47:57,739
and basically gives them the new state.

821
00:48:00,019 --> 00:48:03,139
But in real system, you would depend.

822
00:48:03,139 --> 00:48:04,619
So the log would be a file,

823
00:48:04,619 --> 00:48:06,619
and you would append an entry to the file.

824
00:48:07,619 --> 00:48:08,459
Thank you.

825
00:48:14,379 --> 00:48:17,019
And yes, you know, we actually, you all have to,

826
00:48:17,019 --> 00:48:19,459
in real system, you know, if you append a log entry,

827
00:48:19,459 --> 00:48:20,819
you're your first append log entering,

828
00:48:20,820 --> 00:48:21,820
then you respond.

829
00:48:21,820 --> 00:48:24,900
Like so in the append entries, if you update the log,

830
00:48:24,900 --> 00:48:28,940
and you add append, sorry, append entries on the follower,

831
00:48:28,940 --> 00:48:30,700
it receives a new set of log entries,

832
00:48:30,700 --> 00:48:33,860
it depends them to its, you know, local persistent log,

833
00:48:33,860 --> 00:48:36,059
and then it can respond, because you, you,

834
00:48:36,059 --> 00:48:38,620
it would be bad to respond before appending,

835
00:48:38,620 --> 00:48:42,059
because then you might lose, you know,

836
00:48:42,059 --> 00:48:43,260
if you responded before appending,

837
00:48:43,260 --> 00:48:46,660
you might run in a situation where, just before actually,

838
00:48:46,660 --> 00:48:48,420
the actual pen happens to your crashes,

839
00:48:48,420 --> 00:48:51,340
and so you actually did not persist the log entries,

840
00:48:51,340 --> 00:48:55,539
and so you would, you know, you could lose committed entries.

841
00:49:00,420 --> 00:49:01,260
Okay.

842
00:49:02,740 --> 00:49:05,099
Okay, so how about service recovery?

843
00:49:05,099 --> 00:49:07,420
So the service keeps its own state,

844
00:49:08,420 --> 00:49:09,860
for example, a lot of pre-earrampalmenting

845
00:49:09,860 --> 00:49:12,900
and key value store, and so the key value store

846
00:49:12,900 --> 00:49:17,900
maintains basically a hash map from a key to value,

847
00:49:18,099 --> 00:49:21,380
and you need to replay that state.

848
00:49:21,380 --> 00:49:26,380
And again, there are two possible ways of going about it.

849
00:49:26,380 --> 00:49:29,460
One strategy one is to replay the log

850
00:49:29,460 --> 00:49:31,180
to actually reconstruct that state.

851
00:49:34,300 --> 00:49:36,500
So basically if you're,

852
00:49:37,740 --> 00:49:39,420
this is sort of similar to the strategy one,

853
00:49:39,420 --> 00:49:40,860
on the previous slide, you know,

854
00:49:40,860 --> 00:49:44,139
you just take the log, you just replay all the entries

855
00:49:44,139 --> 00:49:46,180
in the log, and that should, you know,

856
00:49:46,179 --> 00:49:48,339
basically create exactly the same state,

857
00:49:49,819 --> 00:49:52,819
as if, as before, right?

858
00:49:52,819 --> 00:49:54,980
Because, you know, the whole point

859
00:49:54,980 --> 00:49:56,980
of this replicated state machine approach

860
00:49:56,980 --> 00:50:01,699
is that all the operations are actually being in total order.

861
00:50:01,699 --> 00:50:03,299
The operations have no side effect,

862
00:50:03,299 --> 00:50:04,739
so if you start in the same state,

863
00:50:04,739 --> 00:50:07,619
like nothing, and you're gonna replay all the operations,

864
00:50:07,619 --> 00:50:10,059
you should end up exactly in the same state,

865
00:50:10,059 --> 00:50:11,139
as any other node.

866
00:50:12,659 --> 00:50:14,699
And so that's one possible,

867
00:50:14,699 --> 00:50:17,179
and so that was a one way to recreate the state.

868
00:50:24,579 --> 00:50:26,819
And you know, obviously that's just expensive, you know,

869
00:50:26,819 --> 00:50:29,259
if the search actually has been running, you know,

870
00:50:29,259 --> 00:50:31,460
for a couple of years, and you know,

871
00:50:31,460 --> 00:50:33,379
who have to replay the logs, you know,

872
00:50:33,379 --> 00:50:35,579
from the beginning of time, you know, that is not,

873
00:50:35,579 --> 00:50:37,739
you know, so desirable.

874
00:50:37,739 --> 00:50:38,619
And so, you know, like,

875
00:50:38,619 --> 00:50:42,579
like people don't really follow strategy one,

876
00:50:42,579 --> 00:50:43,980
but they follow another strategy,

877
00:50:43,980 --> 00:50:46,659
and we're just like basically making periodic snapshots.

878
00:50:47,659 --> 00:50:49,940
And there are two reasons to do that.

879
00:50:49,940 --> 00:50:51,980
One, you basically reconstruct, you know,

880
00:50:51,980 --> 00:50:53,820
the server state in the fast manner.

881
00:50:53,820 --> 00:50:55,099
And the second reason to do that

882
00:50:55,099 --> 00:50:58,860
is to be able to compact the log, you know,

883
00:50:58,860 --> 00:51:03,860
even the raft state itself can be cut off

884
00:51:05,460 --> 00:51:08,099
from it that the prefix can be cut off.

885
00:51:08,099 --> 00:51:09,780
And the basic observation is that,

886
00:51:11,139 --> 00:51:12,740
if the application is running for a while,

887
00:51:12,739 --> 00:51:15,139
and it just has to apply to the first thousand operations,

888
00:51:15,139 --> 00:51:16,819
or the first million operations,

889
00:51:17,779 --> 00:51:20,419
then the state that is constructed at that point,

890
00:51:22,579 --> 00:51:27,579
the states will contain all ox, you know,

891
00:51:28,619 --> 00:51:32,339
say through I, where I may be a thousand,

892
00:51:32,339 --> 00:51:34,539
or a million, whatever, whatever you,

893
00:51:34,539 --> 00:51:38,739
so one way to think about is that,

894
00:51:38,739 --> 00:51:42,259
there's sort of a duality between state replication

895
00:51:42,260 --> 00:51:45,540
and log replication or replay.

896
00:51:47,540 --> 00:51:49,860
You can save the state after a thousand operations,

897
00:51:49,860 --> 00:51:52,180
and then you've got exactly the same thing as actually

898
00:51:52,180 --> 00:51:56,740
reapplying or redoing every operation from zero to the fast.

899
00:51:57,820 --> 00:52:01,140
And so this means that once you have a snapshot,

900
00:52:01,140 --> 00:52:03,820
and you store the snapshot stably in disk,

901
00:52:03,820 --> 00:52:06,660
in persistent state, you can cut off,

902
00:52:07,820 --> 00:52:09,660
you can cut the log,

903
00:52:12,420 --> 00:52:13,260
you know, through I.

904
00:52:16,940 --> 00:52:19,900
And so this allows you to control the size of the log,

905
00:52:19,900 --> 00:52:24,340
you know, basically by periodically asking the surface

906
00:52:24,340 --> 00:52:25,540
to actually take snapshots,

907
00:52:25,540 --> 00:52:27,660
and then you know, the service telling the raft library,

908
00:52:27,660 --> 00:52:29,900
yes, I've taken a snapshot through I,

909
00:52:29,900 --> 00:52:31,460
then the raft can say, okay, good.

910
00:52:31,460 --> 00:52:34,220
I just don't have to remember anything from I,

911
00:52:34,220 --> 00:52:37,220
or until I, that means of course that the snapshot

912
00:52:37,220 --> 00:52:39,260
has to be stored, I'll save the storage.

913
00:52:43,220 --> 00:52:46,820
And this is also good for recovery, correct?

914
00:52:46,820 --> 00:52:49,100
And so it makes our recovery scheme slightly more complicated

915
00:52:49,100 --> 00:52:50,900
than I just described in the previous slide,

916
00:52:50,900 --> 00:52:54,980
and what it has to happen is that when a follower,

917
00:52:54,980 --> 00:52:57,180
you know, comes back up after a quick, you know, say,

918
00:52:57,180 --> 00:53:00,540
reboot, it loads its persistent state,

919
00:53:00,540 --> 00:53:01,580
you know, that includes, you know,

920
00:53:01,580 --> 00:53:03,980
the persistent state that we talked about on the previous slide,

921
00:53:03,980 --> 00:53:05,260
that's disinformation.

922
00:53:06,540 --> 00:53:10,180
But also it's last, you know, snapshot,

923
00:53:10,179 --> 00:53:12,299
installs that last, you know, basically loads

924
00:53:12,299 --> 00:53:14,819
that snapshot into memory, the surface does.

925
00:53:14,819 --> 00:53:17,659
And then, you know, we can sort of replay any log entries

926
00:53:17,659 --> 00:53:19,659
to basically bring the follower up to date.

927
00:53:20,940 --> 00:53:21,779
Okay.

928
00:53:29,539 --> 00:53:30,659
Any questions about this?

929
00:53:32,259 --> 00:53:34,619
I have one question.

930
00:53:34,619 --> 00:53:37,619
I'm not sure if I'm gonna be able to phrase it super clearly.

931
00:53:38,619 --> 00:53:41,619
But I guess, like, I was under impression.

932
00:53:41,619 --> 00:53:46,619
So I guess like, does this not break some layer of abstraction

933
00:53:46,619 --> 00:53:50,619
that truly existed between the application on top of raft

934
00:53:50,619 --> 00:53:53,380
and raft itself, where it now needs to understand

935
00:53:53,380 --> 00:53:56,099
how to state machine, like how to apply commands

936
00:53:56,099 --> 00:53:58,900
to the state machine instead of just like giving commands

937
00:53:58,900 --> 00:54:01,619
to some external state machine?

938
00:54:01,619 --> 00:54:04,139
Yeah, great after that.

939
00:54:04,139 --> 00:54:05,139
I'm gonna take it.

940
00:54:05,139 --> 00:54:09,139
Clearly, you know, there is some, you have to play together,

941
00:54:11,139 --> 00:54:13,139
right, the raft library and the surface.

942
00:54:14,420 --> 00:54:16,539
Because first of all, the surface lies about, like,

943
00:54:16,539 --> 00:54:18,059
you know, gives the wrong information about, like,

944
00:54:18,059 --> 00:54:20,019
how far as natural applied, then, you know,

945
00:54:20,019 --> 00:54:21,500
we get inconsistent results.

946
00:54:21,500 --> 00:54:23,980
But anyway, so we don't assume wires anyway,

947
00:54:23,980 --> 00:54:27,299
but it's clearly the case that the surface

948
00:54:27,299 --> 00:54:30,420
and the raft library have to cooperate.

949
00:54:30,420 --> 00:54:34,059
And you can call that an abstraction violation.

950
00:54:35,420 --> 00:54:39,220
I think the reason they need to do it is to limit

951
00:54:39,220 --> 00:54:41,980
the amount of state that the raft library has to maintain.

952
00:54:41,980 --> 00:54:43,579
Otherwise, the raft library wouldn't know

953
00:54:43,579 --> 00:54:45,740
when it can cut the log.

954
00:54:45,740 --> 00:54:47,780
And so there's basically no way around it

955
00:54:47,780 --> 00:54:49,700
that the surface actually tells it, like,

956
00:54:49,700 --> 00:54:51,820
well, I got a snapshot through I.

957
00:54:51,820 --> 00:54:55,019
And so it's okay for you to remove log entries

958
00:54:55,019 --> 00:54:56,019
from zero for I.

959
00:54:57,980 --> 00:54:59,019
And you'll see that.

960
00:54:59,019 --> 00:55:01,940
And so this is going to be a good point.

961
00:55:01,940 --> 00:55:03,820
This is going to come up in 2D, right?

962
00:55:03,820 --> 00:55:06,980
But log 2D is going to is all about snapshots

963
00:55:06,980 --> 00:55:11,579
and log compaction, as it's also called in the paper.

964
00:55:13,980 --> 00:55:17,420
There has to be some API between the servers

965
00:55:17,420 --> 00:55:19,340
and raft to be able to collaborate.

966
00:55:19,340 --> 00:55:23,259
And basically in 2A and 2B, that API, in fact,

967
00:55:23,259 --> 00:55:26,460
even in 2C, that API is extremely simple.

968
00:55:26,460 --> 00:55:28,619
The only API that exists is basically

969
00:55:28,619 --> 00:55:31,659
delivering log message on the apply channel, right?

970
00:55:31,659 --> 00:55:34,539
And almost nothing flows down from the servers

971
00:55:34,539 --> 00:55:35,300
to the raft library.

972
00:55:35,300 --> 00:55:39,380
Other than that, the servers may start a raft,

973
00:55:40,500 --> 00:55:42,940
try to append an entry to the log using a start.

974
00:55:44,740 --> 00:55:49,340
And so in 2D, there has to be a little bit more of an API

975
00:55:49,340 --> 00:55:53,220
between the servers and raft library.

976
00:55:53,220 --> 00:55:55,940
And the third time, like, you can design that API

977
00:55:55,940 --> 00:55:57,179
in many possible ways.

978
00:55:57,179 --> 00:55:58,980
There are quite a number of ways of doing it.

979
00:55:58,980 --> 00:55:59,940
There's not particularly one.

980
00:55:59,940 --> 00:56:02,940
And the paper doesn't lay out what API you should use.

981
00:56:04,380 --> 00:56:06,420
The paper's actually just nothing about this.

982
00:56:06,420 --> 00:56:10,019
And so it's up to you, it's up to us,

983
00:56:10,019 --> 00:56:11,059
to figure out what the API is.

984
00:56:11,059 --> 00:56:16,059
And to be able to do 2D, we have to declare an API

985
00:56:16,300 --> 00:56:18,820
between the servers and raft.

986
00:56:18,820 --> 00:56:23,820
And you'll see what you do to the API has some funny,

987
00:56:26,820 --> 00:56:29,380
might be a little bit more different than you might expect.

988
00:56:29,380 --> 00:56:33,420
And we have to pick one particular API.

989
00:56:33,420 --> 00:56:38,420
And in that API, there's an operation called

990
00:56:38,460 --> 00:56:43,460
through a conditional install that has a semantics

991
00:56:43,460 --> 00:56:47,099
that allows you to change the raft state

992
00:56:47,099 --> 00:56:48,780
and the server state automatically

993
00:56:48,780 --> 00:56:50,260
in one single operation.

994
00:56:51,260 --> 00:56:55,260
And that partly, that operation exists

995
00:56:55,260 --> 00:57:00,260
to try to limit the abstraction boundaries.

996
00:57:03,260 --> 00:57:06,100
And it turns out you can do it in different ways.

997
00:57:06,100 --> 00:57:07,580
You don't really need to go.

998
00:57:07,580 --> 00:57:09,060
You could have written it in different ways,

999
00:57:09,060 --> 00:57:11,780
but our personal thing is actually one of the more

1000
00:57:11,780 --> 00:57:12,780
simple ways of doing it.

1001
00:57:13,780 --> 00:57:15,420
But that will become more clear in 2D.

1002
00:57:15,420 --> 00:57:17,860
And you'll see indeed that there's sort of an interaction

1003
00:57:17,860 --> 00:57:21,460
between the servers and raft in a way

1004
00:57:21,460 --> 00:57:22,780
that they have to play along.

1005
00:57:28,860 --> 00:57:30,579
I could repeat when raft communicates

1006
00:57:30,579 --> 00:57:32,620
with the servers in the snapshot process.

1007
00:57:32,620 --> 00:57:37,140
So the snapshots are driven by the service.

1008
00:57:37,140 --> 00:57:40,420
So the service just says once in a while to raft,

1009
00:57:40,420 --> 00:57:43,340
I've made a snapshot, here's my snapshot.

1010
00:57:43,340 --> 00:57:44,340
And this is a snapshot,

1011
00:57:44,340 --> 00:57:46,900
includes all the operations through I.

1012
00:57:46,900 --> 00:57:51,900
And then raft writes the snapshot and truncates a blog

1013
00:57:51,980 --> 00:57:55,660
to I and writes all that information to the disk.

1014
00:57:57,619 --> 00:57:59,700
And that's basically all what happens

1015
00:57:59,700 --> 00:58:01,340
in sort of regular operation.

1016
00:58:01,340 --> 00:58:04,260
Periodically, snapshots happen, snapshots happens.

1017
00:58:04,260 --> 00:58:07,059
Then the other case, you'll have to consider

1018
00:58:07,059 --> 00:58:09,740
is like when reboot happens.

1019
00:58:09,740 --> 00:58:11,460
And so when the follower reboots,

1020
00:58:11,460 --> 00:58:15,740
it actually reboots from its persistent state.

1021
00:58:15,739 --> 00:58:18,219
And so including its snapshot.

1022
00:58:18,219 --> 00:58:20,579
And so when the follower reboots,

1023
00:58:20,579 --> 00:58:23,819
it basically loads the snapshot from a memory

1024
00:58:23,819 --> 00:58:26,339
from the persistent disk and actually reconstructs

1025
00:58:26,339 --> 00:58:28,659
the application state, the key value store.

1026
00:58:28,659 --> 00:58:29,939
And you will do this in lot free.

1027
00:58:29,939 --> 00:58:32,299
So this is not going to be an issue in lot two.

1028
00:58:32,299 --> 00:58:34,059
The only thing that is going to be an issue in lot two

1029
00:58:34,059 --> 00:58:37,779
is that because the followers,

1030
00:58:37,779 --> 00:58:38,779
or because the,

1031
00:58:42,419 --> 00:58:44,500
because the log has been cut,

1032
00:58:45,460 --> 00:58:48,179
instead of like having all the entries from zero to I

1033
00:58:48,179 --> 00:58:50,539
in the log plus more.

1034
00:58:50,539 --> 00:58:51,659
So I,

1035
00:58:51,659 --> 00:58:55,780
and the log is cut from I to N.

1036
00:58:57,940 --> 00:59:01,500
And that's part of the log compaction.

1037
00:59:01,500 --> 00:59:05,059
That also means that if a follower is far behind,

1038
00:59:05,059 --> 00:59:07,539
like for example, a new node joins the system

1039
00:59:07,539 --> 00:59:11,340
and doesn't actually have the beginning of the log

1040
00:59:11,340 --> 00:59:13,860
or the snapshot,

1041
00:59:13,860 --> 00:59:18,860
then the raft has to communicate the snapshot to that follower.

1042
00:59:19,620 --> 00:59:22,780
So in the case that the follower is before I,

1043
00:59:22,780 --> 00:59:27,180
because it rejoined the raft,

1044
00:59:27,180 --> 00:59:28,180
posture,

1045
00:59:29,780 --> 00:59:33,780
leader actually has to set the snapshot to the follower

1046
00:59:33,780 --> 00:59:36,420
and the follower basically starts from there.

1047
00:59:36,420 --> 00:59:37,900
And that will show up in 2D.

1048
00:59:37,900 --> 00:59:40,940
And so there's an additional RPC called

1049
00:59:40,940 --> 00:59:45,380
the snapshot RPC or install snapshot RPC.

1050
00:59:45,380 --> 00:59:46,900
That's described in the paper,

1051
00:59:46,900 --> 00:59:48,980
and that you will have to implement in 2D.

1052
00:59:50,059 --> 00:59:54,220
In fact, this brings me to a good point.

1053
00:59:54,220 --> 00:59:55,740
Actually, let me first go to,

1054
00:59:56,980 --> 00:59:58,980
can you basically bring me to the homework question,

1055
00:59:58,980 --> 01:00:00,300
which is,

1056
01:00:03,019 --> 01:00:03,860
years the,

1057
01:00:05,659 --> 01:00:10,340
install snapshot RPCs or equivalent to figure two,

1058
01:00:10,340 --> 01:00:12,620
but then just for the snapshot RPC

1059
01:00:12,620 --> 01:00:14,780
and you actually have to implement that.

1060
01:00:16,460 --> 01:00:17,740
And in 2D.

1061
01:00:17,740 --> 01:00:20,980
And one issue that came up in the,

1062
01:00:20,980 --> 01:00:22,940
which was the homework question for today

1063
01:00:22,940 --> 01:00:23,940
is,

1064
01:00:23,940 --> 01:00:28,620
isn't every possible in raft or what avoids it,

1065
01:00:28,620 --> 01:00:29,900
if it's not possible,

1066
01:00:29,900 --> 01:00:32,460
that the state machine rolls back.

1067
01:00:32,460 --> 01:00:35,740
So example, a leader sends maybe,

1068
01:00:35,740 --> 01:00:39,460
maybe an old snapshot shows up at a follower.

1069
01:00:39,460 --> 01:00:41,900
Is it possible that,

1070
01:00:43,139 --> 01:00:43,980
if it's possible,

1071
01:00:43,980 --> 01:00:46,820
if not the follower would install that snapshot

1072
01:00:46,820 --> 01:00:49,900
and then implicitly basically roll back to state machine,

1073
01:00:49,900 --> 01:00:52,900
right, maybe it already has seen more information.

1074
01:00:52,900 --> 01:00:54,699
You know, clearly that seems not right.

1075
01:00:54,699 --> 01:00:56,460
And so the question is,

1076
01:00:56,460 --> 01:00:58,780
you know, how does Ravgett around it?

1077
01:00:58,780 --> 01:01:01,300
And so maybe this is a great place

1078
01:01:01,300 --> 01:01:03,539
to actually do a quick breakout

1079
01:01:03,539 --> 01:01:05,059
and you can debate, you know,

1080
01:01:05,059 --> 01:01:06,179
that, you know,

1081
01:01:06,179 --> 01:01:08,619
that the homework question for a couple of minutes,

1082
01:01:08,739 --> 01:01:09,699
five minutes,

1083
01:01:09,699 --> 01:01:13,539
and then we'll come back and talk about,

1084
01:01:13,539 --> 01:01:14,900
a little bit more about snapshots.

1085
01:01:16,940 --> 01:01:19,619
Really would it be like on the one hand?

1086
01:01:19,619 --> 01:01:22,059
No, Lily, how about I try?

1087
01:01:22,059 --> 01:01:22,900
You can make it.

1088
01:01:22,900 --> 01:01:24,500
Yeah, I'll go for it.

1089
01:01:24,500 --> 01:01:26,500
Yeah, hold on, I'll probably have to make you,

1090
01:01:32,099 --> 01:01:33,739
host and then you can do it.

1091
01:01:35,420 --> 01:01:37,219
Okay, you should be host now.

1092
01:01:37,219 --> 01:01:38,059
Awesome.

1093
01:02:08,659 --> 01:02:09,460
Okay, good.

1094
01:02:09,460 --> 01:02:10,299
Nothing gets too much.

1095
01:02:10,299 --> 01:02:11,299
Thank you, you're welcome.

1096
01:08:08,980 --> 01:08:09,940
Make you host again.

1097
01:08:09,940 --> 01:08:10,779
Yeah, that'd be great.

1098
01:08:10,779 --> 01:08:11,619
Thank you.

1099
01:08:11,619 --> 01:08:12,460
Okay.

1100
01:08:35,619 --> 01:08:36,619
Let me see that guy.

1101
01:08:36,619 --> 01:08:37,619
Let me share my screen.

1102
01:08:41,739 --> 01:08:42,739
Yeah, let me see.

1103
01:08:55,180 --> 01:08:56,579
Okay, everybody back online.

1104
01:09:00,180 --> 01:09:01,739
We're good to go.

1105
01:09:01,739 --> 01:09:03,539
If somebody can respond, that'd be great.

1106
01:09:05,539 --> 01:09:06,539
I'm already here.

1107
01:09:06,539 --> 01:09:07,819
Okay, good, good, good.

1108
01:09:07,819 --> 01:09:08,659
Okay, great.

1109
01:09:08,659 --> 01:09:11,220
I hear it at, like, sometimes people,

1110
01:09:11,220 --> 01:09:12,460
because of the breakout rooms,

1111
01:09:12,460 --> 01:09:14,460
I think that when you drop that of soon,

1112
01:09:14,460 --> 01:09:16,100
I think it would be important.

1113
01:09:16,100 --> 01:09:18,500
The key is that somebody's going to do it.

1114
01:09:18,500 --> 01:09:21,940
Past rooms, breakout, but hopefully,

1115
01:09:23,539 --> 01:09:25,780
and I know exactly what to do about that.

1116
01:09:25,780 --> 01:09:28,140
I guess we're class and fault tolerance.

1117
01:09:28,140 --> 01:09:30,740
It's a little bit unfortunate that people could just drop.

1118
01:09:32,860 --> 01:09:37,579
Okay, so any, I think the homework question this time

1119
01:09:37,579 --> 01:09:39,860
around was going to be the most sort of straightforward.

1120
01:09:39,859 --> 01:09:44,859
It has to be the case that you cannot install an old snapshot

1121
01:09:44,899 --> 01:09:49,059
because a server that might have had a more recent snapshot

1122
01:09:49,059 --> 01:09:50,699
might have responded to the client saying,

1123
01:09:50,699 --> 01:09:53,179
like, yeah, the operation succeeded.

1124
01:09:53,179 --> 01:09:55,460
And then if you would install an old snapshot,

1125
01:09:55,460 --> 01:09:57,699
then you basically back out to the state

1126
01:09:57,699 --> 01:09:59,659
and the client would see the certainly an old version

1127
01:09:59,659 --> 01:10:00,500
of the server.

1128
01:10:00,500 --> 01:10:02,299
So that's certainly not legit.

1129
01:10:03,339 --> 01:10:05,659
And so this little bit, you should definitely reject

1130
01:10:05,659 --> 01:10:08,179
old snapshots, but you have to be a little bit careful.

1131
01:10:09,060 --> 01:10:13,060
If the follower has a log that goes beyond the snapshot,

1132
01:10:13,060 --> 01:10:18,060
you have to keep that remainder part of the log

1133
01:10:18,060 --> 01:10:20,659
because basically you have promised to a leader

1134
01:10:20,659 --> 01:10:22,340
that you have accepted a message.

1135
01:10:22,340 --> 01:10:26,500
And so you can't delete the rest of the log

1136
01:10:26,500 --> 01:10:30,140
that was not covered by the snapshot.

1137
01:10:30,140 --> 01:10:31,300
Okay?

1138
01:10:31,420 --> 01:10:33,460
Okay, so then, let me return.

1139
01:10:36,420 --> 01:10:39,420
We had a question actually.

1140
01:10:40,940 --> 01:10:41,940
Okay, go ahead.

1141
01:10:41,940 --> 01:10:45,100
So it says, it says in the paper, right?

1142
01:10:45,100 --> 01:10:47,420
If the follower receives a snapshot,

1143
01:10:47,420 --> 01:10:49,940
that's a prefix of its log, right?

1144
01:10:49,940 --> 01:10:50,779
Yep.

1145
01:10:50,779 --> 01:10:55,579
The log entry is covered by the snapshot.

1146
01:10:55,579 --> 01:10:57,420
I deleted, but the rest are kept.

1147
01:10:57,420 --> 01:10:58,260
Yep.

1148
01:10:58,260 --> 01:11:03,260
And that case is the state machine wouldn't be overwritten,

1149
01:11:03,260 --> 01:11:05,260
right? In this case.

1150
01:11:05,260 --> 01:11:07,260
Okay, so the interesting question is like,

1151
01:11:07,260 --> 01:11:12,260
how does the snapshot get communicated to the state machine?

1152
01:11:12,260 --> 01:11:15,260
And as you will see in lab 3,

1153
01:11:15,260 --> 01:11:17,260
that goes over the applied channel.

1154
01:11:17,260 --> 01:11:21,260
And so the state machine will get the snapshot

1155
01:11:21,260 --> 01:11:22,260
over the applied channel.

1156
01:11:22,260 --> 01:11:27,260
And then again, the state machine will get the snapshot

1157
01:11:27,260 --> 01:11:30,260
and then it's up to you to do the right thing.

1158
01:11:32,260 --> 01:11:33,260
Okay.

1159
01:11:33,260 --> 01:11:34,260
Okay.

1160
01:11:36,260 --> 01:11:37,260
Okay, good.

1161
01:11:37,260 --> 01:11:39,260
Just a follow up on that.

1162
01:11:39,260 --> 01:11:40,260
Sorry.

1163
01:11:40,260 --> 01:11:41,260
Yeah.

1164
01:11:41,260 --> 01:11:43,260
I was a little bit, so that makes sense to me.

1165
01:11:43,260 --> 01:11:48,260
The part that I was confused by is in the, in the figure 13,

1166
01:11:48,260 --> 01:11:51,260
like the box that describes the snapshot RPC.

1167
01:11:51,260 --> 01:11:53,260
Yep.

1168
01:11:53,260 --> 01:11:55,260
On six, it says,

1169
01:11:55,260 --> 01:11:58,260
the existing log entry has the same index as the term snapshot,

1170
01:11:58,260 --> 01:12:00,260
class include entry.

1171
01:12:00,260 --> 01:12:04,260
Um,

1172
01:12:04,260 --> 01:12:06,260
well, I'm,

1173
01:12:06,260 --> 01:12:08,260
I might have just mixed reddit.

1174
01:12:08,260 --> 01:12:09,260
Okay.

1175
01:12:09,260 --> 01:12:11,260
Why do you keep thinking about it and look in?

1176
01:12:11,260 --> 01:12:12,260
Yeah.

1177
01:12:12,260 --> 01:12:13,260
If I have a question.

1178
01:12:13,260 --> 01:12:14,260
I'll ask you.

1179
01:12:14,260 --> 01:12:17,260
Yeah, take it offline and we'll do it right after lecture if you want to.

1180
01:12:17,260 --> 01:12:18,260
Okay.

1181
01:12:18,260 --> 01:12:20,260
I want to go back actually for a couple minutes, you know,

1182
01:12:20,260 --> 01:12:22,260
that we have remaining and talk about actually using raft.

1183
01:12:22,260 --> 01:12:27,260
And we should sort of a discussion that we're already basically having here.

1184
01:12:27,260 --> 01:12:29,260
Now for a service.

1185
01:12:29,260 --> 01:12:34,260
Okay. So again, I'm going to focus on the replicated key value service that's going to be the top of the plot free.

1186
01:12:34,260 --> 01:12:38,260
And so just to go back to almost like one of the first, you know,

1187
01:12:38,260 --> 01:12:41,260
boards that I drew at the beginning of the ref lectures.

1188
01:12:41,260 --> 01:12:49,260
Here's like our boxes, you know, that correspond to the free replica.

1189
01:12:49,260 --> 01:12:53,260
And each replica correct, you know, has a sort of split.

1190
01:12:53,260 --> 01:12:54,260
Two pieces.

1191
01:12:54,260 --> 01:13:01,260
One is the service part.

1192
01:13:01,260 --> 01:13:04,260
And one is the raft library.

1193
01:13:04,260 --> 01:13:15,260
We know that basically they screen the case to approve the applied channel unless the way to information flow from raft to the service.

1194
01:13:15,260 --> 01:13:19,260
And so clients, you know, interact.

1195
01:13:19,260 --> 01:13:22,260
You know, with the service, you know, not directly with raft.

1196
01:13:22,260 --> 01:13:24,260
So we have a client here.

1197
01:13:24,260 --> 01:13:28,260
You know, that sends an operation like a food operator or get operation for the service.

1198
01:13:28,260 --> 01:13:31,260
The service receives, you know, this operation.

1199
01:13:31,260 --> 01:13:35,260
And it basically calls start.

1200
01:13:35,260 --> 01:13:40,260
You know, for that operation, then raft does it's a chit chat, you know, with, you know, the other.

1201
01:13:40,260 --> 01:13:44,260
Graph libraries, you know, messages can flow back.

1202
01:13:44,260 --> 01:13:46,260
And at some point the operation is committed.

1203
01:13:46,260 --> 01:13:51,260
And then it actually is, you know, raft will say, look at this operation is ready to be committed.

1204
01:13:51,260 --> 01:13:53,260
Senses on the applied channel.

1205
01:13:53,260 --> 01:13:58,260
And the service then basically execute the operation and send the response back, you know, after it executed the operation.

1206
01:13:58,260 --> 01:14:05,260
The response back to the client saying like, well, the value or the get, you know, key 20, you know, is this.

1207
01:14:05,260 --> 01:14:07,260
Right. So this is a get operation.

1208
01:14:07,260 --> 01:14:10,260
Or put.

1209
01:14:10,260 --> 01:14:16,260
And this is basically the value for the get or, you know, okay, which exceed it.

1210
01:14:16,260 --> 01:14:19,260
And we also discovered in the last lecture that.

1211
01:14:19,260 --> 01:14:26,260
It might be the case that the client, you know, sends an RPC to the service and the, you know, the RPC disappears.

1212
01:14:26,260 --> 01:14:29,260
And so the client must be more recent.

1213
01:14:29,260 --> 01:14:33,260
And by the time the recent is actually, you know, the leader might not need the leader anymore.

1214
01:14:33,260 --> 01:14:37,260
And so in that case, it has to redirect itself to another year.

1215
01:14:37,260 --> 01:14:39,260
And so basically what are a little bit of code.

1216
01:14:39,260 --> 01:14:41,260
What I want you to think about this.

1217
01:14:41,260 --> 01:14:46,260
There's a little bit of code at the client site that sort of understands replicated state machines a little bit.

1218
01:14:46,260 --> 01:14:48,260
And it maintains some information.

1219
01:14:48,260 --> 01:14:50,260
It maintains like who's the leader.

1220
01:14:50,260 --> 01:14:52,260
And who are the other followers.

1221
01:14:52,260 --> 01:14:55,260
And so that can switch, you know, between them.

1222
01:14:55,260 --> 01:14:57,260
If necessary.

1223
01:14:57,260 --> 01:15:05,260
We also last time talked a little bit about that it's possible that, you know, operation can be duplicated right because you know the.

1224
01:15:05,260 --> 01:15:10,260
The client may send an operation put operation to the servers.

1225
01:15:10,260 --> 01:15:14,260
And the, but you know, the client doesn't get a response.

1226
01:15:14,260 --> 01:15:16,260
But the service actually received it.

1227
01:15:16,260 --> 01:15:20,260
So it went through and I went through the whole operation sequence.

1228
01:15:20,260 --> 01:15:29,260
You know, starting the draft a pants can go through the graph motion and then basically sending it out to the client channel.

1229
01:15:29,260 --> 01:15:33,260
And so basically the client actually might send the second one.

1230
01:15:33,260 --> 01:15:37,260
And, you know, the, and basically for the repetition.

1231
01:15:37,260 --> 01:15:42,260
You know, that might actually go through, you know, the graph library to comes out on the applied channel.

1232
01:15:42,260 --> 01:15:45,260
And so, you know, you have to do some duplicate detection detection.

1233
01:15:45,260 --> 01:15:46,260
And then multiple ways of doing it.

1234
01:15:46,260 --> 01:15:48,260
But either way, you have to do duplicate detection.

1235
01:15:48,260 --> 01:15:55,260
And so in addition to sort of maintaining some state about like what the leader and the followers are.

1236
01:15:55,260 --> 01:15:58,260
The Putin get also actually have an idea.

1237
01:15:58,260 --> 01:16:00,260
An idea associated with it.

1238
01:16:00,260 --> 01:16:05,260
And the client needs to maintain what is the last ID that it actually is trying to get through.

1239
01:16:05,260 --> 01:16:08,260
And that is used to actually do duplicate detection.

1240
01:16:08,260 --> 01:16:12,260
And this little piece of code is often called a clerk.

1241
01:16:12,260 --> 01:16:18,260
And the clerk that interacts, you know, with the service and that does a little bit of work to collaborate with the service to actually get the right thing done.

1242
01:16:18,260 --> 01:16:27,260
And so we have multiple clients all have a clerical library, if you're real, which is a go package.

1243
01:16:27,260 --> 01:16:36,260
And you know, the clients basically talk Putin gets, you know, over that interface and inside of the clerk actually maintains these IDs.

1244
01:16:36,260 --> 01:16:43,260
Or maintains one idea for the outstanding, you know, Putin get operation as well as some information about like who's part of the cluster.

1245
01:16:43,260 --> 01:16:44,260
Okay.

1246
01:16:44,260 --> 01:16:46,260
Does that all make sense?

1247
01:16:46,260 --> 01:16:51,260
So that's sort of the basic structure, correct? And like how raft fits into a larger picture.

1248
01:16:51,260 --> 01:17:05,260
And one question that comes all the way up is like what, you know, what is the guarantees, you know, the servers and the clerk together make to declines about this Putin get operations.

1249
01:17:05,260 --> 01:17:12,260
And this really means, you know, what is the correctness criteria?

1250
01:17:12,260 --> 01:17:19,260
And the way we always have described this so far, we've been reasonable sloppy about it, where I've been sloppy about it.

1251
01:17:19,260 --> 01:17:33,260
And the thing that I've said is like, well, it should behave like a single machine.

1252
01:17:33,260 --> 01:17:43,260
And that is a little bit of an imprecise definition because what happens is two clients basically at the same time, you know, actually could have put her get operation and what actually is the correct outcome.

1253
01:17:43,260 --> 01:17:53,260
These operations. So we need really need to sort of a little bit more precisely, you know, I think like behaving like a single machine is the right intuition, but we need to a little bit of precisely definition.

1254
01:17:53,260 --> 01:18:05,260
You saw the term used in the paper in this definition is called linearizability.

1255
01:18:05,260 --> 01:18:12,260
And linearizability is basically spec, you know, specification of what values a put and get operation can return.

1256
01:18:12,260 --> 01:18:17,260
And basically, there's in since put there's really up and return operations really what get can actually return.

1257
01:18:17,260 --> 01:18:28,260
And basically says like what are allowed things to be returned and what are things that are not allowed to be returned independent of right to how you implement it, but just like a purely specification.

1258
01:18:28,260 --> 01:18:32,260
And it basically has three components to linearizability.

1259
01:18:32,260 --> 01:18:52,260
linearizability says like if you have to look at some sequence of operations and some of them executed concurrently, it has to be the case that there's a total order. So you can arrange all the operation in some total order.

1260
01:18:52,260 --> 01:18:58,260
So you can decide operations to.

1261
01:18:58,260 --> 01:19:06,260
It has to match real time.

1262
01:19:06,260 --> 01:19:24,260
With that, I mean that if an operation completed before a second operation started, even if those operations are different machines, it has to be the case that in this total order, the first operation shows up before the second operation.

1263
01:19:24,260 --> 01:19:34,260
And that sort of makes sense, right, like if it behaves like a single machine and you start an operation last after another operation, then the single machine would always return the results of the first operation.

1264
01:19:34,260 --> 01:19:37,260
So, and then finally a read operation.

1265
01:19:37,260 --> 01:19:46,260
So this is like in our case in the key value server, it only has one read operation they will get. But the read operation should always return.

1266
01:19:46,260 --> 01:19:49,260
So the results.

1267
01:19:49,260 --> 01:19:56,260
Of the last right.

1268
01:19:56,260 --> 01:20:10,260
So in our case, you know, we do a get operation and the put operation happened well before it and complete well before then that get operation suit of zero of the last.

1269
01:20:10,260 --> 01:20:22,260
So this sort of a sort of a free conditions, you know, that what to determine whether system actually has linear is ability.

1270
01:20:22,260 --> 01:20:27,260
And you can think about the interisability as well, well, you just behave like a single machine.

1271
01:20:27,260 --> 01:20:31,260
So let me make a little bit more concrete because there's a little bit abstract.

1272
01:20:31,260 --> 01:20:44,260
The way basically people think about linear is ability or like our unit of system is realized a little bit is looking at particular history or executions and then see.

1273
01:20:44,260 --> 01:20:53,260
Let's see if you can use histories if you can turn that into a total order, even though the operations actually might have actually executed concurrently.

1274
01:20:53,260 --> 01:21:04,260
Let me give you one example of a trivial example. So let's say we have three clients, you won C two, see three and they do a bunch of puts against.

1275
01:21:04,260 --> 01:21:10,260
So in a typically the way, you know, basically say there has to be some start point where the operation started.

1276
01:21:10,260 --> 01:21:13,260
And there's some end points where the operation ends.

1277
01:21:13,260 --> 01:21:19,260
So example, we're next to the client actually gets the return from the surface.

1278
01:21:19,260 --> 01:21:26,260
And so let's say this is right operation, you know, to the value to the variable X and we write one to it.

1279
01:21:26,260 --> 01:21:33,260
So the client one started at some point in operation to the very next to the right one and then it's going to at some point here.

1280
01:21:33,260 --> 01:21:39,260
Now maybe you did a second one.

1281
01:21:39,260 --> 01:21:41,260
And right to to it.

1282
01:21:41,260 --> 01:21:46,260
So we have all the action and we've linearized ability is when operation happened to curve.

1283
01:21:46,260 --> 01:21:56,260
So some operations start before another one actually finishes. So example, we might have the following operation client to does a read operation in our case would be again.

1284
01:21:56,260 --> 01:22:01,260
And there's a read of X and the value returned by this operations to.

1285
01:22:01,260 --> 01:22:08,260
And then we have a similar sort of situation where I'm client free it actually starts an operation, a read operation.

1286
01:22:08,260 --> 01:22:12,260
And at least X and returns one.

1287
01:22:12,260 --> 01:22:16,260
Let me make this a little bit more clean.

1288
01:22:16,260 --> 01:22:30,260
The read operation actually returns before you know the right to operation starts for ends and same same from our actual and then the question of the always comes up is this a linear or a visible case is this linear or a visible execution.

1289
01:22:30,260 --> 01:22:36,260
And if it's going to rise well, then basically it means like this could happen on a single machine to.

1290
01:22:36,260 --> 01:22:40,260
And so could just happen on a single machine.

1291
01:22:40,260 --> 01:22:45,260
You just like abstract and think about it without actually having.

1292
01:22:45,260 --> 01:22:51,260
Is this a legit outcome for basically where we need to look at is the outcomes of R2 and from C2 and RSC free.

1293
01:22:51,260 --> 01:22:55,260
You know, is this a legit execution.

1294
01:22:55,260 --> 01:23:03,260
I'm not sure I don't really know what it means for a right to take like a long time.

1295
01:23:03,260 --> 01:23:05,260
Well, I think about.

1296
01:23:05,260 --> 01:23:07,260
Take a long time for that matter.

1297
01:23:07,260 --> 01:23:09,260
Yeah, if you think about the.

1298
01:23:09,260 --> 01:23:13,260
From the client perspective, right, it's sent a request to the service.

1299
01:23:13,260 --> 01:23:15,260
So that's the starting of the right.

1300
01:23:15,260 --> 01:23:21,260
And I've got to return value at some point from the service and that's the end of the right.

1301
01:23:21,260 --> 01:23:29,260
So in between all kinds of stuff happens, when that's mean to the servers, the servers, you know, put it into draft, wrap, when you apply channel, blah, blah, lots of stuff happen.

1302
01:23:29,260 --> 01:23:34,260
We really care about exactly what the information does at some point in government response.

1303
01:23:34,260 --> 01:23:45,260
And so you can think about this, you know, there's basically free concurrent clients, you know, they issued concurrent operations and we are wondering if this is actually legit outcome.

1304
01:23:45,260 --> 01:23:58,260
I don't think this could happen on a single machine because the right for two, it finishes after the read starts.

1305
01:23:58,260 --> 01:24:00,260
Oh, sorry. Yeah, yeah, that's right.

1306
01:24:00,260 --> 01:24:04,260
But it seems like the right should happen before the read.

1307
01:24:04,260 --> 01:24:09,260
And in this situation, it.

1308
01:24:09,260 --> 01:24:12,260
It couldn't happen if the right started after.

1309
01:24:12,260 --> 01:24:17,260
If the right thing, if the right finishing after the rights restarted. Yeah.

1310
01:24:17,260 --> 01:24:25,260
Yeah, okay, so one point we need to think of one idea of thinking about is that we can move, you know, and we have to construct a total order, right?

1311
01:24:25,260 --> 01:24:31,260
And we can construct a total order where all the, you know, the operations line up, then, you know, it's a valid, linearizable history.

1312
01:24:31,260 --> 01:24:36,260
And so, so let's construct a total order and then go back to this question that you just asked.

1313
01:24:36,260 --> 01:24:41,260
So a total order, here's a total order that I'm going to.

1314
01:24:41,260 --> 01:24:48,260
So the first the right operation, then the read X one, then the right X to you.

1315
01:24:48,260 --> 01:24:52,260
And then our X, you know, the read of X to, right?

1316
01:24:52,260 --> 01:24:56,260
There's a total order, all the operations are now happening sequentially.

1317
01:24:56,260 --> 01:25:01,260
And, you know, we need to check whether this is our, this total order is correct.

1318
01:25:01,260 --> 01:25:07,260
We're responding to the linearizability definitions. Well, it has to be the case that operations that start.

1319
01:25:07,260 --> 01:25:12,260
If an operation starts after some of their operations ends and needs to be after in the total order.

1320
01:25:12,260 --> 01:25:19,260
And so we're going to look at this. Let's look at this. This one must start after WX one.

1321
01:25:19,260 --> 01:25:23,260
And that is true correct in this total order.

1322
01:25:23,260 --> 01:25:32,260
RX one must, you know, start after WX one because it actually returns, you know, the value, right?

1323
01:25:32,260 --> 01:25:35,260
And that's exactly in our total order that is also the case.

1324
01:25:35,260 --> 01:25:42,260
RX to, you know, must start at WX to because it's observed the result of this right.

1325
01:25:42,260 --> 01:25:45,260
And, you know, that's perfectly fine too.

1326
01:25:45,260 --> 01:25:49,260
And basically, we want a way to think about it is that, you know, even though they executed this way,

1327
01:25:49,260 --> 01:25:54,260
we've got some rearranged things now to sort of fit the total order.

1328
01:25:54,260 --> 01:26:03,260
And so if we think about this, then this is a total legit execution where, you know, the operation format over the order.

1329
01:26:03,260 --> 01:26:10,260
And so this is like what, what a single machine would do. So single machine could execute it the right double X on read X one, right X to read X to.

1330
01:26:10,260 --> 01:26:14,260
And real perfectly fine.

1331
01:26:14,260 --> 01:26:15,260
Okay.

1332
01:26:15,260 --> 01:26:20,260
So let me make me to help hold this. I think about the history that is not linearizable.

1333
01:26:20,260 --> 01:26:29,260
So let me look at the second one.

1334
01:26:29,260 --> 01:26:36,260
And I'm going to come back on this on the first day anyway. So don't worry if this, not make sense yet.

1335
01:26:36,260 --> 01:26:40,260
But here's another one. I got C one.

1336
01:26:40,260 --> 01:26:44,260
Same thing, right X one.

1337
01:26:44,260 --> 01:26:48,260
I got a sheet and a here right.

1338
01:26:48,260 --> 01:26:50,260
X to.

1339
01:26:50,260 --> 01:26:58,260
And there's going to be a read that actually goes in the X one.

1340
01:26:58,260 --> 01:27:01,260
And, what's our reaction to.

1341
01:27:01,260 --> 01:27:05,260
And then I got a C two, see free.

1342
01:27:05,260 --> 01:27:07,260
See free.

1343
01:27:07,260 --> 01:27:11,260
Start after the other read.

1344
01:27:11,260 --> 01:27:15,260
And returns one.

1345
01:27:15,260 --> 01:27:24,260
And the claim here is that it's not possible to construct the total order that you know, I'm met you some innerizability.

1346
01:27:24,260 --> 01:27:34,260
And one way, you know, one indication of this is that this read right that returned actual on started after the read that return to.

1347
01:27:34,260 --> 01:27:41,260
And I will make this a little bit more precise later, but in a real, you know, single machine system that could have never happened.

1348
01:27:41,260 --> 01:27:47,260
Right. Because that would have meant that the value change between R to an R is one.

1349
01:27:47,260 --> 01:27:58,260
And you know, 50's few operations that we have on the board that has to be the case that this R is one happened after that right.

1350
01:27:58,260 --> 01:28:08,260
And this right must have happened after that right because they're in total there, we have to respect, you know, the ordering of the single of C one.

1351
01:28:08,260 --> 01:28:14,260
And so there's no way to basically slot, you know, average one in the total order.

1352
01:28:14,260 --> 01:28:21,260
And according to this picture, it should go after our edge one.

1353
01:28:21,260 --> 01:28:34,260
And, but I can really not be true, because even the guy got our after our one that man is also after WX to so that must have read to, and not one.

1354
01:28:34,260 --> 01:28:38,260
And that is not a linearized bill, not a linearizable.

1355
01:28:38,260 --> 01:28:46,260
This is in execution.

1356
01:28:46,260 --> 01:28:53,260
And another way of saying that is that this is what what what what is arts in returning here is really returning this tail value.

1357
01:28:53,260 --> 01:28:58,260
Right. And that is not allowed.

1358
01:28:58,260 --> 01:29:03,260
If machine behaves as like a single machine or replicate a server behaves like a single machine.

1359
01:29:03,260 --> 01:29:08,260
And so I'm going to come back, you know, this to the lecture when next week when we talk about zookeeper.

1360
01:29:08,260 --> 01:29:15,260
Because this is going to be a very important like notion of later as ability sort of a thing that shows up probably into paper.

1361
01:29:15,260 --> 01:29:20,260
And there's notion of stay value is also shows up probably.

1362
01:29:20,260 --> 01:29:25,260
And so I'm running out of time and there's going to resume that next week.

1363
01:29:25,260 --> 01:29:30,260
Okay.

1364
01:29:30,260 --> 01:29:34,260
Any further questions and people that need to leave please, you know, feel free to leave.

1365
01:29:34,260 --> 01:29:37,260
And in fact, I hope you did.

1366
01:29:37,260 --> 01:29:41,260
You want to make it responsible that you miss other classes.

1367
01:29:41,260 --> 01:29:48,260
Is this considered like what type of consistency is this considered to be a strong consistency.

1368
01:29:48,260 --> 01:29:53,260
And what really is sort of a precise definition of what's strong consistency is.

1369
01:29:53,260 --> 01:30:12,260
So like our intuition about what's strong consistency is namely behaving like a single machine that the precise definition of people in using the technical literature is linearizability.

1370
01:30:12,260 --> 01:30:20,260
How did they decide to have that property like why did they decide to have that property.

1371
01:30:20,260 --> 01:30:24,260
There's a couple of things one reason, you know, the reason.

1372
01:30:24,260 --> 01:30:26,260
Okay, so it makes sort of sense.

1373
01:30:26,260 --> 01:30:29,260
So if you think from this point of view.

1374
01:30:29,260 --> 01:30:34,260
Like you want to behave, you want to make a replicated system behave like a single machine.

1375
01:30:34,260 --> 01:30:45,260
And you want to only allow outcomes that are actually correspond to executions that the single machine could have done the next linearizability is a very intuitive definition for that.

1376
01:30:45,260 --> 01:30:53,260
The database world has also some other terminology like serializability. This is also term that will show up in the term later.

1377
01:30:53,260 --> 01:31:03,260
And basically the only difference between sort of linearizability and serializability is that serializability doesn't require that matches real time.

1378
01:31:03,260 --> 01:31:07,260
And so people have sort of different definitions of strong consistency, if you will.

1379
01:31:07,260 --> 01:31:21,260
And the one that we'll see most probably is linearizability which corresponds closest to like the machine behaves that replicate serves behave like a single machine.

1380
01:31:21,260 --> 01:31:22,260
Thank you.

1381
01:31:22,260 --> 01:31:25,260
You're welcome.

1382
01:31:25,260 --> 01:31:33,260
So I'm going to ask you a question about what happens during like a network partition.

1383
01:31:33,260 --> 01:31:38,260
So I know it like so if a leader gets partition completely on their own, they'll eventually time out.

1384
01:31:38,260 --> 01:31:45,260
But if they have sort of like a few followers with them, they'll stay the leader.

1385
01:31:45,260 --> 01:31:48,260
And they won't be able to commit anything because they'll be in a minority.

1386
01:31:48,260 --> 01:31:51,260
And they'll be a new leader and they'll be so.

1387
01:31:51,260 --> 01:32:02,260
And they'll be able to do whatever sort of recognize that maybe it's a sale leader or do we just assume that eventually if the partition goes away.

1388
01:32:02,260 --> 01:32:07,260
It'll figure out because like I'm worried if there's a client that's talking to the sale leader.

1389
01:32:07,260 --> 01:32:10,260
What is that client do?

1390
01:32:11,260 --> 01:32:16,260
Okay, so this is a great question with this picture here hopefully will help.

1391
01:32:16,260 --> 01:32:20,260
So the client will talk to the talks of this guy, right? Like who's the leader?

1392
01:32:20,260 --> 01:32:23,260
You see the picture.

1393
01:32:23,260 --> 01:32:28,260
So let's say you know this first box is the leader client talks about leader.

1394
01:32:28,260 --> 01:32:32,260
The leader can't commit any operations, correct?

1395
01:32:32,260 --> 01:32:35,260
And so it won't communicate anything on the apply channel.

1396
01:32:35,260 --> 01:32:37,260
And so it will never respond to the client.

1397
01:32:37,260 --> 01:32:41,260
Because there's like no operation actually be it's operations are not being executed.

1398
01:32:41,260 --> 01:32:46,260
And so the client will just retry and just keep retry forever.

1399
01:32:46,260 --> 01:32:52,260
Until you know until the client actually maybe tries another.

1400
01:32:52,260 --> 01:32:59,260
You know one of the other followers correct that maintains you know who else is actually in the group.

1401
01:32:59,260 --> 01:33:05,260
Or until the network heals.

1402
01:33:05,260 --> 01:33:07,260
And the leader actually commit an operation.

1403
01:33:07,260 --> 01:33:13,260
Gotcha. Wait, so doesn't doesn't the leader immediately reply those saying I got your request?

1404
01:33:13,260 --> 01:33:15,260
Or doesn't wait until it's committed.

1405
01:33:15,260 --> 01:33:16,260
He like free.

1406
01:33:16,260 --> 01:33:21,260
It doesn't communicate with the client until it actually has processed the request.

1407
01:33:21,260 --> 01:33:28,260
And which means that the operation actually has run through graphed and come out of the apply channel and ask me executed by the service.

1408
01:33:28,260 --> 01:33:33,260
Okay.

1409
01:33:33,260 --> 01:33:40,260
Does that make sense? Yeah. So then so then the client could just implement a timeout where they're like if it's a certain amount of time and they haven't received the commit.

1410
01:33:40,260 --> 01:33:43,260
Assume that maybe I should try a different node.

1411
01:33:43,260 --> 01:33:46,260
And then if it gets the new leader or a follower of the new leader.

1412
01:33:46,260 --> 01:33:48,260
It'll it'll be back.

1413
01:33:48,260 --> 01:33:49,260
No, no.

1414
01:33:49,260 --> 01:33:53,260
So this clerk does exactly what this clerk should have does.

1415
01:33:53,260 --> 01:33:57,260
So replace along with the service to actually do what you're just said.

1416
01:33:57,260 --> 01:33:59,260
Got it.

1417
01:33:59,260 --> 01:34:01,260
Okay. Thank you.

1418
01:34:01,260 --> 01:34:02,260
You're welcome.

1419
01:34:02,260 --> 01:34:05,260
Sorry, can you repeat again what the clerk does?

1420
01:34:05,260 --> 01:34:11,260
The clerk is a little bit of like a stub or like a light little wide read the client links me.

1421
01:34:11,260 --> 01:34:13,260
And so the client calls puts and gets.

1422
01:34:13,260 --> 01:34:18,260
And the clerk actually is the interface that it talks to and the clerk can keep some information.

1423
01:34:18,260 --> 01:34:21,260
Like who's part of the.

1424
01:34:21,260 --> 01:34:31,260
And then the clerk is the one who's the leader and who are the followers at least what eight things is the leader in the followers.

1425
01:34:31,260 --> 01:34:37,260
And when it's in our PC, you know, to the service is a sensitive to the leader, but eight things is the current leader.

1426
01:34:37,260 --> 01:34:42,260
And the servers into the whatever things is the current leader, the leader might actually be sponsoring like hey, I'm not the leader.

1427
01:34:42,260 --> 01:34:47,260
And then it will try one of the others and updates information.

1428
01:34:47,260 --> 01:34:50,260
It also will tag every.

1429
01:34:50,260 --> 01:34:56,260
Put and get operation that the decision to client and that sense to the service, the unique ID.

1430
01:34:56,260 --> 01:35:00,260
So the service can do duplicate detection.

1431
01:35:00,260 --> 01:35:03,260
And this all comes up in lap three.

1432
01:35:03,260 --> 01:35:05,260
So you will see there.

1433
01:35:05,260 --> 01:35:13,260
And there's no real clerk because the tester basically sort of sits on top of the directly on the raft interface and that's a really interact through the clerk.

1434
01:35:13,260 --> 01:35:16,260
But in lap three will interact through a clerk.

1435
01:35:16,260 --> 01:35:20,260
So how did the clients generate unique IDs?

1436
01:35:20,260 --> 01:35:23,260
I don't know what to each other.

1437
01:35:23,260 --> 01:35:26,260
Random big random numbers.

1438
01:35:26,260 --> 01:35:31,260
So we're just guessing and hoping rather than actually guaranteeing some sort of like incremental.

1439
01:35:31,260 --> 01:35:41,260
One way to make it more guaranteedies were to take your IP address and append and random number.

1440
01:35:41,260 --> 01:35:44,260
A question about the homework question.

1441
01:35:44,260 --> 01:35:47,260
So I thought that it could go backwards in time.

1442
01:35:47,260 --> 01:35:51,260
Like I read the paper and it says on page 12,

1443
01:35:51,260 --> 01:36:00,260
it said that the if there's a conflict right then the follower just describes this entire log and it's also proceeded by the snapshot.

1444
01:36:00,260 --> 01:36:05,260
So I wonder why.

1445
01:36:05,260 --> 01:36:06,260
Let me guess.

1446
01:36:06,260 --> 01:36:09,260
I don't really know exactly the sentence where you're referring to.

1447
01:36:09,260 --> 01:36:10,260
To look it up again.

1448
01:36:10,260 --> 01:36:12,260
It's on page 12.

1449
01:36:12,260 --> 01:36:14,260
It's at the it's towards the end of page 12.

1450
01:36:14,260 --> 01:36:16,260
The second column here.

1451
01:36:16,260 --> 01:36:18,260
So the second to last paragraph.

1452
01:36:18,260 --> 01:36:21,260
So the log can go back right but not the state machine.

1453
01:36:21,260 --> 01:36:25,260
Not oh, the log can the log can go back but not the state machine.

1454
01:36:25,260 --> 01:36:30,260
What was the state machine like what you the committed entries, right?

1455
01:36:30,260 --> 01:36:34,260
Yeah, the the the the log can go back because of income.

1456
01:36:34,260 --> 01:36:36,260
Uncommitted entries can go back.

1457
01:36:36,260 --> 01:36:41,260
This is like this whole ratio stuff that we talked about earlier.

1458
01:36:41,260 --> 01:36:44,260
So actually the log can go back.

1459
01:36:44,260 --> 01:36:49,260
Yeah, not the state machine, which is basically what you committed already.

1460
01:36:49,260 --> 01:36:52,260
Yeah, the log can never go will never go back.

1461
01:36:52,260 --> 01:36:54,260
We never bail out of committed operations.

1462
01:36:54,260 --> 01:36:57,260
It can only bail out of race and committed operations.

1463
01:36:57,260 --> 01:36:59,260
Yes, that is right.

1464
01:36:59,260 --> 01:37:00,260
Okay, got it.

1465
01:37:00,260 --> 01:37:02,260
That's what I asked you.

1466
01:37:02,260 --> 01:37:04,260
Can I ask a question about the third slide?

1467
01:37:04,260 --> 01:37:08,260
Yeah, that's the one right before this one.

1468
01:37:08,260 --> 01:37:15,260
So could you just walk me through real quick what match index is doing on the right.

1469
01:37:15,260 --> 01:37:18,260
Like when S2 is communicating with S3.

1470
01:37:18,260 --> 01:37:21,260
Okay, let me start out as zero.

1471
01:37:21,260 --> 01:37:22,260
Yep.

1472
01:37:22,260 --> 01:37:26,260
So the whole mess to is communicating with who S3.

1473
01:37:26,260 --> 01:37:28,260
Yeah, so basically, okay, so here.

1474
01:37:28,260 --> 01:37:31,260
Match index is zero. Right, like so.

1475
01:37:31,260 --> 01:37:33,260
And let me write it down as zero.

1476
01:37:33,260 --> 01:37:34,260
Yeah.

1477
01:37:34,260 --> 01:37:39,260
Okay, then it gets a no back so match index stay zero.

1478
01:37:39,260 --> 01:37:40,260
Okay.

1479
01:37:40,260 --> 01:37:46,260
Nothing there, but now it gets an okay back. So what does that imply?

1480
01:37:46,260 --> 01:37:55,260
That implies that, you know, what did it send that send an heartbeat correct with four index for team.

1481
01:37:55,260 --> 01:38:00,260
And including and the.

1482
01:38:00,260 --> 01:38:03,260
So that means that S3.

1483
01:38:03,260 --> 01:38:06,260
S3 is up to date through until 13.

1484
01:38:06,260 --> 01:38:07,260
Great.

1485
01:38:07,260 --> 01:38:11,260
That is next index that it actually has expects 13.

1486
01:38:11,260 --> 01:38:15,260
And so the S2 knows now that it's log.

1487
01:38:15,260 --> 01:38:20,260
Matches until 13 after this message.

1488
01:38:20,260 --> 01:38:22,260
Is it until 13 or until 12?

1489
01:38:22,260 --> 01:38:24,260
It matches till 13.

1490
01:38:24,260 --> 01:38:29,260
So the next thing that will be sent will be going index 13.

1491
01:38:29,260 --> 01:38:33,260
So the next and the next and match index are going to be 13.

1492
01:38:33,260 --> 01:38:38,260
Yeah, the next index is not used yet correct means empty.

1493
01:38:38,260 --> 01:38:43,260
So basically the way, you know, they, you can do either way, right?

1494
01:38:43,260 --> 01:38:49,260
You can either say the last one or their in a first that's going to be the first next, you know, one.

1495
01:38:49,260 --> 01:38:53,260
And in this case, they go by the first next one.

1496
01:38:53,260 --> 01:38:57,260
So in this case, both of them are 13 for the next one.

1497
01:38:57,260 --> 01:39:03,260
Yeah, so basically if you could think about this, this stage, right before like all the green stuff has happened.

1498
01:39:03,260 --> 01:39:09,260
The match index.

1499
01:39:09,260 --> 01:39:20,260
For three is 13 and the match index for itself.

1500
01:39:20,260 --> 01:39:24,260
Two is also 13.

1501
01:39:24,260 --> 01:39:27,260
Got it.

1502
01:39:27,260 --> 01:39:29,260
Awesome. Thank you.

1503
01:39:29,260 --> 01:39:32,260
You're welcome.

1504
01:39:32,260 --> 01:39:35,260
Actually, can I ask a full off on that?

1505
01:39:35,260 --> 01:39:39,260
So when it sees as something matches.

1506
01:39:39,260 --> 01:39:45,260
So for example, here on position 11, it's all that matches.

1507
01:39:45,260 --> 01:39:49,260
So if you can't see it, then.

1508
01:39:49,260 --> 01:39:54,260
It is a guarantee that everything before that matches to.

1509
01:39:54,260 --> 01:39:56,260
Yes, right? Because hold on.

1510
01:39:56,260 --> 01:39:59,260
I mean double double check. You're talking about this message.

1511
01:39:59,260 --> 01:40:01,260
Yeah, yeah.

1512
01:40:01,260 --> 01:40:04,260
About like when it says okay, it checks.

1513
01:40:04,260 --> 01:40:05,260
The next one.

1514
01:40:05,260 --> 01:40:06,260
Yeah, yeah.

1515
01:40:06,260 --> 01:40:11,260
Because that is the whole reason that this previous term and previous index are communicated correct to the faller.

1516
01:40:11,260 --> 01:40:18,260
Okay, even need is the case that in the previous index 11 actually turn free.

1517
01:40:18,260 --> 01:40:21,260
And if that's true, that means that basically everything before that much match.

1518
01:40:21,260 --> 01:40:24,260
And this is like this, whatever area there.

1519
01:40:24,260 --> 01:40:28,260
Whatever the statement they call.

1520
01:40:28,260 --> 01:40:36,260
This invariant that it is maintaining that like if something matches that like one index then everything before that much match to.

1521
01:40:36,260 --> 01:40:37,260
Oh, okay.

1522
01:40:37,260 --> 01:40:38,260
This is the ingredients.

1523
01:40:38,260 --> 01:40:41,260
I think that's the first thing that I see.

1524
01:40:41,260 --> 01:40:44,260
Oh, and I had another follow up question.

1525
01:40:44,260 --> 01:40:47,260
It was related to the question.

1526
01:40:47,260 --> 01:40:50,260
On the lecture question that I wrote.

1527
01:40:50,260 --> 01:40:52,260
I asked about the copy on right.

1528
01:40:52,260 --> 01:40:54,260
For these options.

1529
01:40:54,260 --> 01:40:55,260
No.

1530
01:40:55,260 --> 01:40:58,260
And I think I don't really understand what is being copied.

1531
01:40:58,260 --> 01:41:01,260
Is it is it the page table or is it something?

1532
01:41:01,260 --> 01:41:04,260
I think I think I responded.

1533
01:41:04,260 --> 01:41:07,260
Yeah, I think email, but I just.

1534
01:41:07,260 --> 01:41:09,260
Okay.

1535
01:41:09,260 --> 01:41:10,260
Okay.

1536
01:41:10,260 --> 01:41:11,260
Okay.

1537
01:41:11,260 --> 01:41:12,260
Hold on a second.

1538
01:41:12,260 --> 01:41:14,260
We'll catch my breath.

1539
01:41:14,260 --> 01:41:15,260
The.

1540
01:41:15,260 --> 01:41:17,260
So, okay.

1541
01:41:17,260 --> 01:41:20,260
The scenario is.

1542
01:41:20,260 --> 01:41:24,260
Snap trust can be expensive because the snapshot might be large.

1543
01:41:24,260 --> 01:41:25,260
It's a gigabyte.

1544
01:41:25,260 --> 01:41:29,260
You know, key values page table.

1545
01:41:29,260 --> 01:41:31,260
It's a gigabyte.

1546
01:41:31,260 --> 01:41:33,260
You know, key value store.

1547
01:41:33,260 --> 01:41:37,260
Then, you know, you need to write that gigabyte into disk.

1548
01:41:37,260 --> 01:41:38,260
Right.

1549
01:41:38,260 --> 01:41:40,260
And while you're writing it to disk.

1550
01:41:40,260 --> 01:41:44,260
If you don't do anything clever, you cannot process any other food and get operations.

1551
01:41:44,260 --> 01:41:47,260
That come in through the.

1552
01:41:47,260 --> 01:41:48,260
The channels.

1553
01:41:48,260 --> 01:41:52,260
Let me actually pop up this picture.

1554
01:41:52,260 --> 01:41:53,260
Correct.

1555
01:41:53,260 --> 01:41:55,260
So this deserves to decide to some point to take a checkpoint.

1556
01:41:55,260 --> 01:41:56,260
You know, it's a gigabyte.

1557
01:41:56,260 --> 01:41:57,260
You have to write a gigabyte to this.

1558
01:41:57,260 --> 01:42:00,260
And then you have to write it.

1559
01:42:00,260 --> 01:42:01,260
You know, that's expensive.

1560
01:42:01,260 --> 01:42:05,260
So the plan, you know, the, I think the plan that the paper is hinting at.

1561
01:42:05,260 --> 01:42:08,260
Is that what the service does.

1562
01:42:08,260 --> 01:42:11,260
It's, you know, calls fork.

1563
01:42:11,260 --> 01:42:15,260
So when it makes, what's the make of the checkpoints, it calls fork.

1564
01:42:15,260 --> 01:42:18,260
And for it's case of copy of that process, right?

1565
01:42:18,260 --> 01:42:21,260
So now we have the operating system running.

1566
01:42:21,260 --> 01:42:26,260
And we have now basically two processes that correspond to the server,

1567
01:42:26,260 --> 01:42:29,260
the server, the server's raft, server's raft.

1568
01:42:29,260 --> 01:42:32,260
And this is the copy.

1569
01:42:32,260 --> 01:42:34,260
The child.

1570
01:42:34,260 --> 01:42:37,260
The operating system uses copy and write.

1571
01:42:37,260 --> 01:42:40,260
So when it made a copy of that second process.

1572
01:42:40,260 --> 01:42:44,260
And just copy to page table, but didn't copy physical memory.

1573
01:42:44,260 --> 01:42:52,260
So basically, these two processes shared the same physical memory.

1574
01:42:52,260 --> 01:42:55,260
And then we have the key value.

1575
01:42:55,260 --> 01:42:58,260
Which holds, you know, the, our key value store.

1576
01:42:58,260 --> 01:43:00,260
Right.

1577
01:43:00,260 --> 01:43:03,260
And so now the idea is that the child, when it starts running,

1578
01:43:03,260 --> 01:43:05,260
it starts making a checkpoint.

1579
01:43:05,260 --> 01:43:06,260
Or snapshot.

1580
01:43:06,260 --> 01:43:10,260
I can just write out, you know, the key value sort of.

1581
01:43:10,260 --> 01:43:13,260
The key value store to disk.

1582
01:43:13,260 --> 01:43:18,260
And in parallel, you know, the parent can just start processing new.

1583
01:43:18,260 --> 01:43:21,260
You know, get input operations.

1584
01:43:21,260 --> 01:43:24,260
Because if it does a put operation.

1585
01:43:24,260 --> 01:43:28,260
And it wants to modify the, it will write, you know, to.

1586
01:43:28,260 --> 01:43:33,260
The pages that correspond to the key value store that will result in a page fault.

1587
01:43:33,260 --> 01:43:34,260
Right.

1588
01:43:34,260 --> 01:43:35,260
And so the OS will get a page fault.

1589
01:43:35,260 --> 01:43:38,260
And so the OS will copy that page.

1590
01:43:38,260 --> 01:43:39,260
At that point.

1591
01:43:39,260 --> 01:43:43,260
And then, you know, the first parent process can just update it.

1592
01:43:43,260 --> 01:43:45,260
And this is all transparent to the child. Right.

1593
01:43:45,260 --> 01:43:50,260
Which the child, you know, had a consistent snapshot of the whole dress space at the point of the fork.

1594
01:43:50,260 --> 01:43:53,260
And so this allows basically the parent and child to run concurrently,

1595
01:43:53,260 --> 01:43:56,260
still make a consistent snapshot.

1596
01:43:56,260 --> 01:44:02,260
And the parent to actually make process new food and get operations.

1597
01:44:02,260 --> 01:44:03,260
Is that more clear?

1598
01:44:03,260 --> 01:44:04,260
Oh, yeah, yeah.

1599
01:44:04,260 --> 01:44:05,260
Okay. I see.

1600
01:44:05,260 --> 01:44:07,260
So the, we copy on right.

1601
01:44:07,260 --> 01:44:11,260
The memory that holds the key value store.

1602
01:44:11,260 --> 01:44:13,260
Okay. Okay. Okay.

1603
01:44:13,260 --> 01:44:15,260
I see. Yeah. This makes it very clear.

1604
01:44:15,260 --> 01:44:16,260
Thank you so much.

1605
01:44:16,260 --> 01:44:18,260
Thank you.

1606
01:44:18,260 --> 01:44:24,260
Any more questions?

1607
01:44:24,260 --> 01:44:25,260
Yeah, I have.

1608
01:44:25,260 --> 01:44:29,260
I guess this is sort of a weird scenario.

1609
01:44:29,260 --> 01:44:31,260
And I'm not sure if this could actually.

1610
01:44:31,260 --> 01:44:35,260
But what if so imagine that we're always in the same term.

1611
01:44:35,260 --> 01:44:37,260
And then.

1612
01:44:37,260 --> 01:44:42,260
You get to a point where some nodes have disconnected, but they're still the same term.

1613
01:44:42,260 --> 01:44:44,260
The leader is still in the same term.

1614
01:44:44,260 --> 01:44:48,260
And then at, at, at some point, they will.

1615
01:44:48,260 --> 01:44:50,260
They will do a snapshot.

1616
01:44:50,260 --> 01:44:52,260
And then all the logs will be compressed.

1617
01:44:52,260 --> 01:44:54,260
And then they keep going forward.

1618
01:44:54,260 --> 01:44:57,260
And now the logs are being popular again.

1619
01:44:57,260 --> 01:44:58,260
And then.

1620
01:44:58,260 --> 01:45:00,260
Let's just say.

1621
01:45:00,260 --> 01:45:02,260
15 logs have been added.

1622
01:45:02,260 --> 01:45:03,260
And then after 10.

1623
01:45:03,260 --> 01:45:04,260
They.

1624
01:45:04,260 --> 01:45:05,260
Compressed them.

1625
01:45:05,260 --> 01:45:07,260
And then they're at index.

1626
01:45:07,260 --> 01:45:08,260
They're at X five again.

1627
01:45:08,260 --> 01:45:10,260
And then the other nodes joined back in.

1628
01:45:10,260 --> 01:45:12,260
And they're also at index five of the same term.

1629
01:45:12,260 --> 01:45:13,260
Is that a problem?

1630
01:45:13,260 --> 01:45:15,260
Like how does.

1631
01:45:15,260 --> 01:45:18,260
It's almost like they're on a, on a snapshot.

1632
01:45:18,260 --> 01:45:20,260
E-poc of some sort.

1633
01:45:20,260 --> 01:45:22,260
Okay, so it's a little snapshot.

1634
01:45:22,260 --> 01:45:23,260
Of course, found to an index.

1635
01:45:23,260 --> 01:45:24,260
Right.

1636
01:45:24,260 --> 01:45:25,260
Yeah.

1637
01:45:25,260 --> 01:45:26,260
So, okay, let's.

1638
01:45:26,260 --> 01:45:27,260
Drive the drive.

1639
01:45:27,260 --> 01:45:28,260
Like maybe.

1640
01:45:28,260 --> 01:45:29,260
Drive your scenario.

1641
01:45:29,260 --> 01:45:33,260
So we got a server that has some log.

1642
01:45:33,260 --> 01:45:36,260
And you know, maybe I think you know, you're talking about 10.

1643
01:45:36,260 --> 01:45:37,260
And it took a snapshot at 10.

1644
01:45:37,260 --> 01:45:38,260
Yeah.

1645
01:45:38,260 --> 01:45:39,260
So let's say that.

1646
01:45:39,260 --> 01:45:40,260
Basically, yeah.

1647
01:45:40,260 --> 01:45:42,260
So basically the first nine operations or maybe you,

1648
01:45:42,260 --> 01:45:45,260
including 10 are in a snapshot.

1649
01:45:45,260 --> 01:45:49,260
And then, okay, so there's another note.

1650
01:45:49,260 --> 01:45:51,260
That is.

1651
01:45:51,260 --> 01:45:53,260
Same term.

1652
01:45:53,260 --> 01:45:55,260
So all these entries have the same term, right?

1653
01:45:55,260 --> 01:45:56,260
Like whatever.

1654
01:45:56,260 --> 01:45:58,260
You know, one, one, one, one, one, one, one, one, one.

1655
01:45:58,260 --> 01:45:59,260
Right.

1656
01:45:59,260 --> 01:46:00,260
Yep.

1657
01:46:00,260 --> 01:46:01,260
Yep.

1658
01:46:01,260 --> 01:46:02,260
Yep.

1659
01:46:02,260 --> 01:46:03,260
Yep.

1660
01:46:03,260 --> 01:46:06,260
And so this note actually, but this note has only through 10.

1661
01:46:06,260 --> 01:46:08,260
Greg and this guy has through 15.

1662
01:46:08,260 --> 01:46:09,260
Let's say.

1663
01:46:09,260 --> 01:46:11,260
I think that's what you're sending Greg out.

1664
01:46:11,260 --> 01:46:13,260
So you were no once.

1665
01:46:13,260 --> 01:46:23,260
Here's a one.

1666
01:46:23,260 --> 01:46:26,260
Well, I think my.

1667
01:46:26,260 --> 01:46:30,260
My thought is, well, here's here's a question I can answer.

1668
01:46:30,260 --> 01:46:33,260
You know, when you take a snapshot, do you reset your index?

1669
01:46:33,260 --> 01:46:34,260
Or do you keep counting?

1670
01:46:34,260 --> 01:46:35,260
You keep that.

1671
01:46:35,260 --> 01:46:36,260
Oh, okay.

1672
01:46:36,260 --> 01:46:39,260
I was imagining it was like an array.

1673
01:46:39,260 --> 01:46:42,260
And you saw your index goes backwards.

1674
01:46:42,260 --> 01:46:47,260
So that if so that would be possible for you to have two different entries in the same term.

1675
01:46:47,260 --> 01:46:48,260
With the same index.

1676
01:46:48,260 --> 01:46:49,260
Yeah.

1677
01:46:49,260 --> 01:46:50,260
That's not a lot.

1678
01:46:50,260 --> 01:46:51,260
Absolutely.

1679
01:46:51,260 --> 01:46:52,260
Right.

1680
01:46:52,260 --> 01:46:53,260
Yeah.

1681
01:46:53,260 --> 01:46:54,260
Okay.

1682
01:46:54,260 --> 01:46:55,260
I see.

1683
01:46:55,260 --> 01:46:56,260
So.

1684
01:46:56,260 --> 01:46:57,260
Okay.

1685
01:46:57,260 --> 01:46:58,260
Okay.

1686
01:46:58,260 --> 01:47:04,260
Okay.

1687
01:47:04,260 --> 01:47:05,260
Yeah.

1688
01:47:05,260 --> 01:47:06,260
Yeah.

1689
01:47:06,260 --> 01:47:07,260
Yeah.

1690
01:47:07,260 --> 01:47:11,260
When you cut, you know, like this part of the walk in index stays at 10.

1691
01:47:11,260 --> 01:47:12,260
Got it.

1692
01:47:12,260 --> 01:47:13,260
Got it.

1693
01:47:13,260 --> 01:47:17,260
And so in fact, you know, when you do this in 2D, this is going to be slightly knowing.

1694
01:47:17,260 --> 01:47:21,260
That because you presumably take advantage of the fact that those started the waters at 0.

1695
01:47:21,260 --> 01:47:24,260
And what you're now going to get is that the start of the later of zero walk might be 10.

1696
01:47:24,260 --> 01:47:25,260
Mm hmm.

1697
01:47:25,260 --> 01:47:26,260
So that's what I was saying.

1698
01:47:26,260 --> 01:47:27,260
I was saying that everywhere.

1699
01:47:27,260 --> 01:47:28,260
Yeah.

1700
01:47:28,260 --> 01:47:37,260
Oh, and then last thing really quickly, there, I think the reason I was confused earlier was in the, in the code for lab 2.

1701
01:47:37,260 --> 01:47:38,260
Yeah.

1702
01:47:38,260 --> 01:47:41,260
There's a comment that says we're supposed to return immediately.

1703
01:47:41,260 --> 01:47:42,260
From start.

1704
01:47:42,260 --> 01:47:43,260
Yeah.

1705
01:47:43,260 --> 01:47:44,260
Yeah.

1706
01:47:44,260 --> 01:47:46,260
Well, you, oh, yes.

1707
01:47:46,260 --> 01:47:47,260
Meaning you.

1708
01:47:47,260 --> 01:47:48,260
Okay.

1709
01:47:48,260 --> 01:47:50,260
So let me go back to this picture here.

1710
01:47:50,260 --> 01:47:51,260
Yeah.

1711
01:47:51,260 --> 01:47:52,260
Hopefully.

1712
01:47:52,260 --> 01:47:53,260
It's getting really crowded.

1713
01:47:53,260 --> 01:47:57,260
So we get an operation correct and we do the start operation.

1714
01:47:57,260 --> 01:47:59,260
We call start.

1715
01:47:59,260 --> 01:48:02,260
Oh, return immediately doesn't necessarily mean reply.

1716
01:48:02,260 --> 01:48:04,260
Is that exactly.

1717
01:48:04,260 --> 01:48:05,260
Yeah, exactly.

1718
01:48:05,260 --> 01:48:06,260
It just means reply back.

1719
01:48:06,260 --> 01:48:07,260
Return to the service.

1720
01:48:07,260 --> 01:48:10,260
Not to decline.

1721
01:48:10,260 --> 01:48:11,260
I see.

1722
01:48:11,260 --> 01:48:12,260
I see.

1723
01:48:12,260 --> 01:48:13,260
Okay.

1724
01:48:13,260 --> 01:48:14,260
Gotcha.

1725
01:48:14,260 --> 01:48:19,260
I, yeah, I guess operating under the assumption that a return always is necessarily a reply.

1726
01:48:19,260 --> 01:48:22,260
But that's not, that's not always the case.

1727
01:48:22,260 --> 01:48:23,260
No, it's not the case.

1728
01:48:23,260 --> 01:48:26,260
I think there's a way we call more clearing and lab free than they, you know, in lab 2.

1729
01:48:26,260 --> 01:48:27,260
There's a lot.

1730
01:48:27,260 --> 01:48:28,260
There's a little bit of weird.

1731
01:48:28,260 --> 01:48:29,260
Correct.

1732
01:48:29,260 --> 01:48:30,260
There's no really.

1733
01:48:30,260 --> 01:48:31,260
There's no application bill.

1734
01:48:31,260 --> 01:48:32,260
Yeah.

1735
01:48:32,260 --> 01:48:33,260
Yeah.

1736
01:48:33,260 --> 01:48:34,260
Okay. Well, thank you.

1737
01:48:34,260 --> 01:48:35,260
This was really helpful.

1738
01:48:35,260 --> 01:48:36,260
You're welcome.

1739
01:48:36,260 --> 01:48:37,260
Happy.

1740
01:48:37,260 --> 01:48:38,260
Appreciate it.

1741
01:48:38,260 --> 01:48:39,260
Yeah.

1742
01:48:39,260 --> 01:48:41,260
Have a good one.

1743
01:48:41,260 --> 01:48:42,260
Yeah, you too.

1744
01:48:42,260 --> 01:48:43,260
Bye.

1745
01:48:43,260 --> 01:48:45,260
Good luck with the last.

