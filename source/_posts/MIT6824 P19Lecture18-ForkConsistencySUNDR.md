---
title: MIT6824 P19Lecture18 ForkConsistencySUNDR
---

1
00:00:00,000 --> 00:00:08,000
Okay, good afternoon. Can everybody hear me?

2
00:00:08,000 --> 00:00:09,000
Yep.

3
00:00:09,000 --> 00:00:14,000
Thank you. Yes, I will post the election notes at the end of lecture.

4
00:00:14,000 --> 00:00:17,000
In response to the.

5
00:00:17,000 --> 00:00:18,000
Jeff.

6
00:00:18,000 --> 00:00:21,000
Okay, so.

7
00:00:21,000 --> 00:00:26,000
Today, basically, I want to start with a new topic in.

8
00:00:26,000 --> 00:00:31,000
In a two four, there's sort of a the last topic that we'll be discussing.

9
00:00:31,000 --> 00:00:45,000
The topic is really decentralized systems.

10
00:00:45,000 --> 00:00:48,000
And these are typically decentralized.

11
00:00:48,000 --> 00:00:54,000
We're really first to the fact that there's no single affordee that is in control of the system.

12
00:00:54,000 --> 00:01:02,000
And a lot of the systems that we've seen so far, you know, all the machines and server sort of cooperate and are on the.

13
00:01:02,000 --> 00:01:07,000
Under the control of a single institution or an individual affordee.

14
00:01:07,000 --> 00:01:12,000
And the systems over and a lot of you ask questions about like, how would it work if.

15
00:01:12,000 --> 00:01:15,000
There's no central point of trust.

16
00:01:15,000 --> 00:01:18,000
And so.

17
00:01:18,000 --> 00:01:24,000
And so, you know, on the three systems where the three papers that we're going to be discussing all sit in this form of decentralized systems.

18
00:01:24,000 --> 00:01:32,000
And, and these centralized systems are harder to build than the sort of single trust systems.

19
00:01:32,000 --> 00:01:46,000
Because, you know, you have to account for business in failure for business business in participants.

20
00:01:46,000 --> 00:01:49,000
And these are participants that you know, sometimes follow the protocol.

21
00:01:49,000 --> 00:01:51,000
Sometimes they don't follow the protocol.

22
00:01:51,000 --> 00:01:55,000
So, again, the really think about it that they are basically at his areas.

23
00:01:55,000 --> 00:02:01,000
And they may try to abuse or trick other.

24
00:02:01,000 --> 00:02:07,000
Partition is in systems for the wrong goods, but not maybe for others.

25
00:02:07,000 --> 00:02:09,000
And.

26
00:02:09,000 --> 00:02:16,000
And so that makes actually system design with these distributed system designs much more more challenging and much more difficult to reason about.

27
00:02:16,000 --> 00:02:20,000
We feel like in the last, you know, 18, whatever lectures.

28
00:02:20,000 --> 00:02:25,000
Mostly, you know, what we talked about when we designed protocol or thought about raft.

29
00:02:25,000 --> 00:02:31,000
You know, we just assume that actually every participant in the protocol follows the rules.

30
00:02:31,000 --> 00:02:35,000
And in a business in, you know, with business and participants that is not the case anymore.

31
00:02:35,000 --> 00:02:43,000
And so, you know, the participants that can cook up new messages, you know, send messages out of order, trick other participants.

32
00:02:43,000 --> 00:02:59,000
And so the thinking that those kind of protocols is much more difficult because we have to consider like what we have the adversary could do to sort of make our life to break basically the properties of the protocols that we're shooting for.

33
00:02:59,000 --> 00:03:05,000
And so we make the problem much harder.

34
00:03:05,000 --> 00:03:17,000
And really, you know, we're what this sort of topic is is so sits on the intersection of distributed systems and security.

35
00:03:17,000 --> 00:03:22,000
And as we'll see in the, you know, the next, this paper, the next paper.

36
00:03:22,000 --> 00:03:31,000
And so, you know, the photography or security ideas like signing and hashing and are going to be a crucial role to actually make forward progress.

37
00:03:31,000 --> 00:03:39,000
In fact, you know, the paper actually that we're reading for today is also a paper that we use in 6858.

38
00:03:39,000 --> 00:03:54,000
And in the 658 last spring, we talked about this paper too, although then for mostly from the perspective of security today, I'm going to mostly focus it is on the perspective of distributed systems.

39
00:03:54,000 --> 00:04:03,000
The sundaer itself, a lot of people asked a lot of you ask, you know, is some there being used.

40
00:04:03,000 --> 00:04:18,000
And as far as I know, there's actually no systems that actually implement some there directly or they directly based on some other than lap four in 6858 in lap four.

41
00:04:18,000 --> 00:04:26,000
If you do the lap four, the default project, which is lap four in 858, then you actually implement sundaer.

42
00:04:26,000 --> 00:04:41,000
Now, the reason, and so you might wonder why we're studying this paper at all, the reason we're studying it because it actually proposes a number of very powerful technical, powerful ideas.

43
00:04:41,000 --> 00:04:50,000
And so, particularly the same log, even though it is a sort of a strawman design or conceptual design is incredibly powerful.

44
00:04:50,000 --> 00:05:03,000
And you see back that same idea here in lots of other decentralized systems, you know, ranging from systems like it to, you know, systems like Bitcoin or any other sort of cryptographic ledger.

45
00:05:03,000 --> 00:05:08,000
Now, we're going to be talking about Monday or even next Tuesday.

46
00:05:08,000 --> 00:05:17,000
I know one system that actually is directly influenced by sundaer, which is a system called key base.

47
00:05:17,000 --> 00:05:32,000
Keybase users, some there techniques and many more, you know, familiar with key base and actually was reasonably acquired by zoom, which is originally all familiar with.

48
00:05:32,000 --> 00:05:51,000
Okay, so that's what I'm for the quick intro to this paper before I'll dive into the more of the setting any sort of questions before diving a little bit deeper in the table.

49
00:05:51,000 --> 00:06:11,000
Okay, so let's talk a little bit about the setting of this paper or the motivation of this paper show the setting in that the hour that the officer said forward is a network file system.

50
00:06:11,000 --> 00:06:26,000
And you can think of this a little bit into style of a northern paper that we've read from to Pani, where the top it also was to implement and consistent, you know, that work file system.

51
00:06:26,000 --> 00:06:31,000
And so we have a file server.

52
00:06:31,000 --> 00:06:40,000
We have clients that interact with the file server, you know, somebody might actually create a file, F.

53
00:06:40,000 --> 00:06:46,000
And maybe in VDAF, another client.

54
00:06:46,000 --> 00:06:56,000
And you know, the setting that we're in is that basically the file server as opposed to in the front, F.

55
00:06:56,000 --> 00:07:03,000
The file server actually can be visited.

56
00:07:03,000 --> 00:07:11,000
And a visit in really is an extremely powerful front model where you know gives the attacker a hell amount of power.

57
00:07:11,000 --> 00:07:20,000
So in visit in the server might send different RTCs back, you know, cook up its own RTCs.

58
00:07:20,000 --> 00:07:38,000
And so take over the machine, you know, a bright administrator and everything is basically, you know, the way to think about it is that the access area gets completely control of the file server.

59
00:07:38,000 --> 00:07:53,000
And you can ever sort of a wide range of, you know, sort of more common attacks where like in the typical attacks that you might see in the real system, so real attacks one boxing software.

60
00:07:53,000 --> 00:08:14,000
And there's a bug in the software, then you know, the access area can exploit that bottom maybe to obtain privileges and, you know, the visiting model completely encompasses that or you know, this system administrator might have a week.

61
00:08:14,000 --> 00:08:18,000
And then you can see the password.

62
00:08:18,000 --> 00:08:29,000
The attacker compromises and then they have to control over the system, you know, that's also covered by visiting physical breaking.

63
00:08:29,000 --> 00:08:34,000
And then there were Rangers gets access to the physical machine.

64
00:08:34,000 --> 00:08:39,000
And you know, can therefore control the physical parts of the machine.

65
00:08:39,000 --> 00:08:51,000
Again, that's all covered by this, you know, visiting front model or even, you know, maybe the attacker bribes.

66
00:08:51,000 --> 00:09:02,000
And then the attacker, or collutes with a malicious clients, you know, that is also covered by this model.

67
00:09:02,000 --> 00:09:11,000
So this is a threat model that is very, very gives a lot of power to the access area and covers a lot of sort of standard attacks.

68
00:09:11,000 --> 00:09:16,000
And you know, the first thing sort of the observed, you know, the game that.

69
00:09:16,000 --> 00:09:29,000
Some of their place is that instead of actually, you know, sort of maintaining the whole file system on the file server, the file server is as simple as possible.

70
00:09:29,000 --> 00:09:39,000
And in fact, you know, the file server is very much like almost like pedal. It's almost like a block device will a little bit more.

71
00:09:39,000 --> 00:09:44,000
So the sort of central place where all the blocks are stored.

72
00:09:44,000 --> 00:09:55,000
And but the clients really able to the file system. So it's not really, you know, that the client sends a create for a file that actually, you know, sends blocks and reach blocks.

73
00:09:55,000 --> 00:09:59,000
From, you know, the block server and.

74
00:09:59,000 --> 00:10:09,000
And basically constructs from the blocks that reach a right, you know, it's only view of the file system and search, you know, file system operations basically on a straight on the client.

75
00:10:09,000 --> 00:10:12,000
And so here really, you know, create.

76
00:10:12,000 --> 00:10:13,000
You know, F.

77
00:10:13,000 --> 00:10:16,000
Read, et cetera.

78
00:10:16,000 --> 00:10:25,000
So very, very similar to the front smile, accepting the big difference in front of the is that pedal and all the clients were completely trusted.

79
00:10:25,000 --> 00:10:34,000
And in this setting, you know, the clients are not trusted. And the file surface that can be also is also not trusted.

80
00:10:34,000 --> 00:10:42,000
Okay.

81
00:10:42,000 --> 00:10:48,000
So the paper focus on a particular set of security properties.

82
00:10:48,000 --> 00:10:55,000
And the focus is really on.

83
00:10:55,000 --> 00:11:01,000
The focus is on what is called integrity properties.

84
00:11:01,000 --> 00:11:07,000
And in contrast to confidentiality, confidentiality is about protecting data for so that nobody else can read it.

85
00:11:07,000 --> 00:11:12,000
Integrities is just ensuring that the system structure is correct.

86
00:11:12,000 --> 00:11:22,000
And the modifications illegal modifications to the data are being detected. And whether the data is public or not public, you know, sort of sites the point here.

87
00:11:22,000 --> 00:11:34,000
And to make it a little bit more concrete, you know, what they're sort of the thing that they have in their minds is we have a set of, you know, we have developers.

88
00:11:34,000 --> 00:11:49,000
And that one, you know, that to you, they may share, you know, some machine that contains the source code repository of some, you know, source from projects, the developers, you know, collaborating on that project.

89
00:11:49,000 --> 00:12:03,000
And, and sort of think about this as the example that the paper mentions is in the paper, maybe this is the development machines and server for devian Linux.

90
00:12:03,000 --> 00:12:12,000
And the one of again, defend against is trap or a trad or.

91
00:12:12,000 --> 00:12:28,000
So the, you know, an attacker, you know, takes over control breaks into the machine that contains the source repo, modifies the software in notice.

92
00:12:28,000 --> 00:12:35,000
And then it's all going out of that software gets deployed, you know, for example, devian Linux gets deployed a lot of lots of machines.

93
00:12:35,000 --> 00:12:44,000
And now the attacker has control over those machines because it can exploit the trap to one.

94
00:12:44,000 --> 00:12:53,000
The paper talks about this attack, this particularly instance in of devian Linux in 2003.

95
00:12:53,000 --> 00:12:59,000
Where, you know, the attacker was able to compromise, you know, the development server or cluster.

96
00:12:59,000 --> 00:13:03,000
And recovering from these kinds of attacks is very painful.

97
00:13:03,000 --> 00:13:18,000
In fact, in 2003, you know, they report that the devian Linux and the search for rose development for a couple days, while they were trying to sort out which, you know, part of their short repo, we still, you know, correct, in which part were actually modified by a attacker.

98
00:13:18,000 --> 00:13:21,000
And these attacks happen sort of periodically.

99
00:13:21,000 --> 00:13:29,000
I think last year, you know, you're going to have a similar type of problem in 2018 or 2019, I remember exactly.

100
00:13:29,000 --> 00:13:37,000
And there was a similar case where the one of the core development servers was broken into.

101
00:13:37,000 --> 00:13:47,000
And you know, they have to sort of short out what were we, what were the seed which suffered, which files got affected affected by that breaking.

102
00:13:47,000 --> 00:13:52,000
Okay, so that's sort of the setting of the paper.

103
00:13:52,000 --> 00:14:04,000
And I'm going to make a little bit more concrete and a little bit of a point example to help us go through the techniques that this paper actually uses.

104
00:14:04,000 --> 00:14:16,000
So the example that I'm going to use is part of the inspired by 6858 is, you know, let's say, you know, we have a file system.

105
00:14:16,000 --> 00:14:19,000
You're doing the.

106
00:14:19,000 --> 00:14:27,000
And the file system contains, you know, the source code for this application that we use in 888 called zoo bar.

107
00:14:27,000 --> 00:14:39,000
And in zoo bar, he's sort of a virtual bank type application where users of the system register users of the systems can transfer or zoo bars to each other.

108
00:14:39,000 --> 00:14:45,000
And so it has a file called off dot p y, you know, that does an off education.

109
00:14:45,000 --> 00:14:51,000
And if that's a file that basically, you know, it's sort of the bank bank, you know, bank, p y.

110
00:14:51,000 --> 00:15:00,000
And so, you know, let's consider the case where, you know, we have a set of develop us, a, b and c.

111
00:15:00,000 --> 00:15:08,000
And you know, they decide that they want to sort of increase the usability of zoo bar and action to deploy it for real.

112
00:15:08,000 --> 00:15:19,000
And to make it real, basically, you know, they decide to divide the workers follows a is going to modify off the UI.

113
00:15:19,000 --> 00:15:31,000
To support MIT certificates for MIT certs, the curbors ticket, or certificates.

114
00:15:31,000 --> 00:15:46,000
And with the idea that they know what they're going to do is, you know, you're going to off the ice going to be modified so that the lane, the budget, MIT community members actually can log into the file server,

115
00:15:46,000 --> 00:15:54,000
or into zoo bar, and sort of we actually know, you know, who it actually really is that is associated with that particular MIT certificate.

116
00:15:54,000 --> 00:16:04,000
And then they make it a little bit more useful, you know, b is going to actually modify the bank, p y, directly link it to cash tag.

117
00:16:04,000 --> 00:16:25,000
And so, you know, basically, we can actually use the zoo bars from the system, of course, you can have a doodab, but like we can use the zoo bar system to actually transfer money, you know, real money instead of zoo bars between users that are registered with this service.

118
00:16:25,000 --> 00:16:36,000
Now, this ends, of course, like a crazy idea, and you know, really do it, but you know, it's not completely ridiculous, you know, because the off P.O.I really checks who it actually is based on the MIT certificate.

119
00:16:36,000 --> 00:16:43,000
And so maybe it's not in regional that, you know, we could connect, you know, back to P.O.I to actually tech catch.

120
00:16:43,000 --> 00:16:52,000
And then basically see in our scenarios is going to be a person that's actually going to deploy the software.

121
00:16:53,000 --> 00:17:01,000
And find machine takes itself or installs it there and runs it and opens it up to the MIT community.

122
00:17:01,000 --> 00:17:13,000
Now, in the case, now let's consider what, you know, what could happen, what could go wrong, if actually the file server was compromised. And so it was visited.

123
00:17:14,000 --> 00:17:23,000
Well, the obvious, you know, problem is a couple of obvious problems, you know, bad outcomes possible.

124
00:17:23,000 --> 00:17:26,000
So let's consider them.

125
00:17:26,000 --> 00:17:38,000
Bad outcome one, which is the one we've always been talking about in the previous examples is going to basically the adversary gives arbitrary code to see.

126
00:17:39,000 --> 00:17:41,000
In an adversary.

127
00:17:46,000 --> 00:17:51,000
Provides own code to see.

128
00:17:54,000 --> 00:18:05,000
That's sort of the, or maybe the answers are slightly subtle about it or clever about it, you know, whatever makes it a little bit hard to spot that actually modified off P.O.I.

129
00:18:06,000 --> 00:18:18,000
For example, the DLT MIT certificates, but there's basically, you know, there's really no way for C to check that actually it got the software that A and B produced and without any modifications from the adversary.

130
00:18:18,000 --> 00:18:26,000
So that's sort of the obvious a problem with me talking a lot about it. Then there's a second sort of bad outcome, which will maybe a little more subtle.

131
00:18:27,000 --> 00:18:32,000
Which is that the adversary.

132
00:18:32,000 --> 00:18:38,000
Provides the changes, you know, to beg with on P.O.I.

133
00:18:38,000 --> 00:18:43,000
Without the changes.

134
00:18:43,000 --> 00:18:48,000
To off to.

135
00:18:49,000 --> 00:19:00,000
And so at this point, you know, this is pretty problematic, right? Because you know, beg people I linked to tech cash now, but we actually don't have appropriate application of the users anymore.

136
00:19:00,000 --> 00:19:06,000
In fact, anybody that actually creates a super account can now actually interact with the tech cash.

137
00:19:06,000 --> 00:19:11,000
And so clearly very, very undesirable.

138
00:19:12,000 --> 00:19:35,000
And so it's really, you know, of course, the tax, you know, the paper.

139
00:19:36,000 --> 00:19:45,000
But there are a lot of some of the subtle issues actually are brought out by the sort of second case that we'll be talking about.

140
00:19:45,000 --> 00:19:49,000
Any questions so far?

141
00:19:49,000 --> 00:19:54,000
About the setting and by the motivation.

142
00:19:54,000 --> 00:19:58,000
Before I'm going to try to discuss solutions.

143
00:19:59,000 --> 00:20:06,000
And the second case is that the user that the author, the authentication does not authenticate.

144
00:20:06,000 --> 00:20:13,000
Yeah, there's a dozen use MIT certificates anymore. And so we don't really know actually who wants in.

145
00:20:13,000 --> 00:20:15,000
Thank you.

146
00:20:15,000 --> 00:20:18,000
What about the case where.

147
00:20:18,000 --> 00:20:24,000
A or like B won't see is like the fork.

148
00:20:24,000 --> 00:20:36,000
Let's assume for a second that a and B actually, you know, I have talked to each other and divided up the work that I know that they're supposed to be doing this together.

149
00:20:37,000 --> 00:20:39,000
And so we're in the team.

150
00:20:39,000 --> 00:20:51,000
They're in close collaboration and contact, you know, and they've divided up the work. And so they know we're, you know, B tells A when he's done B tells A when he's done and then they tell see where I'll go ahead. We're all done.

151
00:20:51,000 --> 00:20:54,000
Okay.

152
00:20:54,000 --> 00:20:56,000
Okay, so.

153
00:20:56,000 --> 00:21:03,000
Let's start with considering a simple design does it's too simple meaning another work.

154
00:21:03,000 --> 00:21:11,000
And you know, starting points for more sophisticated design that you know, hopefully might work.

155
00:21:11,000 --> 00:21:17,000
And so the simple plan is that a and B or any.

156
00:21:17,000 --> 00:21:30,000
All the files are going to be signed with the person who modified it. So when like a modifies you off the PY.

157
00:21:30,000 --> 00:21:34,000
And so the actually produces a signature.

158
00:21:34,000 --> 00:21:39,000
And that signed with the public key.

159
00:21:39,000 --> 00:21:45,000
What signature signed that the public key of a.

160
00:21:45,000 --> 00:21:52,000
And you know that signature covers the data of the file.

161
00:21:52,000 --> 00:22:06,000
So when see, you know downloads, you know, the off not PY, you know, checks the signature.

162
00:22:06,000 --> 00:22:10,000
And if the signature checks out, you know, then I see those that actually this file was produced.

163
00:22:10,000 --> 00:22:13,000
There's my files induced produced by a.

164
00:22:13,000 --> 00:22:17,000
And you know, I don't believe that things are good.

165
00:22:17,000 --> 00:22:22,000
And that's the basic plan. And you know, we'll talk a little bit about it to get where the keys are coming from.

166
00:22:22,000 --> 00:22:28,000
Although the issue is sort of public key distribution. It really an eight five eight topics. I'm not going to talk too much about it.

167
00:22:28,000 --> 00:22:33,000
But just assume for now that every user has a key.

168
00:22:33,000 --> 00:22:36,000
A private key pair.

169
00:22:36,000 --> 00:22:40,000
And the private keys are key secrets and the public keys are public.

170
00:22:40,000 --> 00:22:45,000
And every user knows who's public key belongs to who.

171
00:22:45,000 --> 00:22:49,000
So now let's consider some.

172
00:22:49,000 --> 00:22:51,000
Attacks.

173
00:22:51,000 --> 00:22:56,000
And see which one sort of, you know, fail, which ones, you know, work.

174
00:22:56,000 --> 00:23:01,000
So of course, the obviously tech was number one that we talked about on the previous slide.

175
00:23:01,000 --> 00:23:03,000
Misses modifies.

176
00:23:03,000 --> 00:23:06,000
Files.

177
00:23:06,000 --> 00:23:09,000
And that is not a little bit.

178
00:23:09,000 --> 00:23:11,000
That's not directly.

179
00:23:11,000 --> 00:23:14,000
As modifies out of the guy.

180
00:23:14,000 --> 00:23:17,000
That's going to not really going to be possible anymore.

181
00:23:17,000 --> 00:23:23,000
Because when C downloads the file and the signature and checks it.

182
00:23:23,000 --> 00:23:32,000
And it will see that the signature different check because the data that actually was signed is different than the data that actually the server produced.

183
00:23:32,000 --> 00:23:40,000
And so it's not really possible for the server really to modify off the PY without actually being attacked or be without being detected.

184
00:23:40,000 --> 00:23:45,000
So, you know, this is where we're sort of in good shape here on this attack.

185
00:23:45,000 --> 00:23:48,000
And that's sort of the core attack, right?

186
00:23:48,000 --> 00:23:51,000
But there's a lot of other things that.

187
00:23:51,000 --> 00:23:52,000
It still could do.

188
00:23:52,000 --> 00:23:55,000
So let's consider some of the other things.

189
00:23:55,000 --> 00:24:01,000
S, you know, could actually in the way I described that we send another file.

190
00:24:01,000 --> 00:24:07,000
It pretends to be off that PY.

191
00:24:07,000 --> 00:24:12,000
Because the signature doesn't really say which actually file the data belongs to.

192
00:24:12,000 --> 00:24:17,000
And so as could just, you know, produce some other files.

193
00:24:17,000 --> 00:24:20,000
So you don't know, you know, see this is actually off the PY.

194
00:24:20,000 --> 00:24:26,000
You could believe me in years that the science, the signature that was of course produced the S.

195
00:24:26,000 --> 00:24:28,000
So, of course, this could be fixed.

196
00:24:28,000 --> 00:24:35,000
You know, maybe the signature should not only include the data, but also probably should include the file name.

197
00:24:35,000 --> 00:24:42,000
So, you know, maybe not too, too bad in something that could be addressed.

198
00:24:42,000 --> 00:24:47,000
A first, you know, another, you know, another possibility is to for.

199
00:24:47,000 --> 00:24:52,000
S to basically send the contents of old files.

200
00:24:52,000 --> 00:24:55,000
Old content.

201
00:24:55,000 --> 00:25:03,000
And maybe some new.

202
00:25:03,000 --> 00:25:07,000
And that's a little bit more difficult now for us to.

203
00:25:07,000 --> 00:25:10,000
To handle correct in this two simple plan.

204
00:25:10,000 --> 00:25:17,000
Because the, there's no way, you know, basically the files are individually authenticated, but not together.

205
00:25:17,000 --> 00:25:18,000
It's not that.

206
00:25:18,000 --> 00:25:21,000
See gets sort of a consistent picture of the file system.

207
00:25:21,000 --> 00:25:24,000
It just gets like sign files.

208
00:25:24,000 --> 00:25:31,000
And how does sign files relate to each other in terms of their histories is completely not covered in this two simple design.

209
00:25:31,000 --> 00:25:37,000
This is exactly, of course, you know, the issue that there's more subtle tech that now could just completely work out.

210
00:25:37,000 --> 00:25:41,000
Because, you know, S could send the.

211
00:25:41,000 --> 00:25:45,000
As could send the old version of off the PY.

212
00:25:45,000 --> 00:25:47,000
And we'll completely check out.

213
00:25:47,000 --> 00:25:51,000
And then send the new version of the.

214
00:25:51,000 --> 00:25:56,000
Of the bank that PY, which actually talks to the link to tech cash.

215
00:25:56,000 --> 00:26:06,000
Now exactly back in the worst case, we're, you know, we have an old version of off the PY or not the changes to off the PY, not the certificate changes to the off the PY.

216
00:26:06,000 --> 00:26:10,000
And the new version that actually linked to tech cash.

217
00:26:10,000 --> 00:26:12,000
And so this is not so good.

218
00:26:12,000 --> 00:26:18,000
So, and the simple point that we have here just doesn't deal with this.

219
00:26:18,000 --> 00:26:32,000
Similar sort of another sort of version of this that we're, you know, of course, you know, asking also just claim that the file doesn't exist.

220
00:26:32,000 --> 00:26:43,000
And see, doesn't really have any way of checking whether that actually is true or not, because again, they don't have a global picture where it is a consistent view of the files.

221
00:26:43,000 --> 00:26:53,000
And so, you can see that the simple design, or maybe good starting point, but we need something more.

222
00:26:53,000 --> 00:27:04,000
More complete, particularly we need something that really ties you know, all the file systems, all the files together that types of directors together to count it up the directors together.

223
00:27:04,000 --> 00:27:10,000
And we have to be able to decide in some way again, what is the leaders version of the file system.

224
00:27:10,000 --> 00:27:19,000
And so that you can't be tricked into in this sort of problem, out of case, where one file is installed and the other other file is not installed.

225
00:27:19,000 --> 00:27:27,000
And so that's really what the some of the paper tries to address.

226
00:27:27,000 --> 00:27:36,000
And the big idea in the paper, and it just turns out to be just a big idea in general.

227
00:27:36,000 --> 00:27:44,000
And it's a conceptual idea. You can know the paper action doesn't really implement this big idea directly, it implements it in a more indirect way.

228
00:27:44,000 --> 00:27:48,000
It is an incredibly powerful idea.

229
00:27:48,000 --> 00:28:02,000
And the big idea is to have a signed law of operations.

230
00:28:02,000 --> 00:28:17,000
And of course, you know, you're well familiar with blocks of operations. And you know, you can, and this is basically a sort of beefed up version of it where there are signatures on the walk entries that both consider cover the entry as well as kind of proceeding entries.

231
00:28:17,000 --> 00:28:32,000
And this turns out to be, as you've seen in all the previous decisions systems and failure recovery protocols, we talked about the log is actually a very powerful idea to think about like the correctness of the system.

232
00:28:32,000 --> 00:28:39,000
And in the same way that ideas are carried forward here in this business in context.

233
00:28:39,000 --> 00:28:46,000
And so what you know, let me draw, you know, in a simple log.

234
00:28:46,000 --> 00:28:56,000
And we're going to capture some of the in this in the paper. So a lot, whatever has some entries and let's say, you know, we're covering covering the things that we are talking about. So there's a modification.

235
00:28:56,000 --> 00:29:08,000
You know, mod off not p y, you know, by a signed by a, you know, there's a mod.

236
00:29:08,000 --> 00:29:21,000
And if you go to all, you know, the amount of the bank, the p y signed by the.

237
00:29:21,000 --> 00:29:33,000
And as we'll talk about in a second, it turns out that not only are the modifications in the log, but also the fetch, you know, the read operations.

238
00:29:33,000 --> 00:29:57,000
And then we'll talk about the fetch operations of the fetch operations a little bit.

239
00:29:57,000 --> 00:30:05,000
So the first one I want to talk about the preceding operations for the modifications.

240
00:30:05,000 --> 00:30:24,000
So first of all, the one is important to realize is the distinct here that is in the record that only covers the current record, but it also covers all the records before.

241
00:30:24,000 --> 00:30:30,000
So you've stopped for a second here because I'm not 100% sure if actually can everybody still hear me.

242
00:30:30,000 --> 00:30:33,000
Yeah.

243
00:30:33,000 --> 00:30:39,000
Okay, I got my iPad logged out of the zoom session, almost logged in twice.

244
00:30:39,000 --> 00:30:47,000
My iPad logged out. So I just want to make sure that I'm still talking to you and you can hear me.

245
00:30:47,000 --> 00:31:17,000
And then I just want to make sure that I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm

246
00:31:17,000 --> 00:31:22,259
100% sure if I'm not 100% sure if I'm not if I'm not 100% sure if I'm not 50% sure if I'm not 100% sure if I'm not 100% sure If I'm not 100%. Sure if I'm not 100% sure if I'm on farm equity then I'm

247
00:31:22,259 --> 00:31:30,559
100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100% sure if I'm not 100%. I think we lost, friends.

248
00:31:47,000 --> 00:32:05,680
Can people hear me now?

249
00:32:05,680 --> 00:32:09,880
Does anybody hear me?

250
00:32:09,880 --> 00:32:10,880
Yeah.

251
00:32:10,880 --> 00:32:11,880
Yes.

252
00:32:11,880 --> 00:32:12,880
Oh, okay, good, good.

253
00:32:12,880 --> 00:32:13,880
Okay.

254
00:32:13,880 --> 00:32:20,880
I don't know if anything weird happened in your end, but in my end, I got logged out of

255
00:32:20,880 --> 00:32:24,600
Zoom and logged back in.

256
00:32:24,600 --> 00:32:28,720
Maybe there's a business insurer at work.

257
00:32:28,720 --> 00:32:31,240
Okay.

258
00:32:31,240 --> 00:32:35,080
Let me hold on one second and get myself in.

259
00:32:43,960 --> 00:33:04,560
Let me just let me get your off.

260
00:33:04,560 --> 00:33:09,240
Okay.

261
00:33:09,240 --> 00:33:11,680
Let me know if I'm good.

262
00:33:11,680 --> 00:33:12,680
Okay.

263
00:33:12,680 --> 00:33:13,680
Good.

264
00:33:13,680 --> 00:33:14,680
Good.

265
00:33:14,680 --> 00:33:16,680
I was pre-searing yet, but yeah.

266
00:33:16,680 --> 00:33:17,680
Okay.

267
00:33:17,680 --> 00:33:18,680
I'm hoping this works better.

268
00:33:18,680 --> 00:33:19,680
Okay.

269
00:33:19,680 --> 00:33:27,680
So I was at this important point where the signal you're just not covered the log entry itself,

270
00:33:27,680 --> 00:33:32,680
but it also covers all the preceding log entries.

271
00:33:32,680 --> 00:33:37,680
And so when, you know, a as this modification to off qy to the log,

272
00:33:37,680 --> 00:33:41,680
it signs the log records itself, plus the preceding log.

273
00:33:41,680 --> 00:33:55,680
And you can think about this that the preceding log is maybe represented by the content of the preceding log is a cryptographic hash and in the record basically of the modification to off the people

274
00:33:55,680 --> 00:34:04,680
that you off the people either the cryptographic hash of the preceding part of the log is included and covered by the signature.

275
00:34:04,680 --> 00:34:07,680
Just to be clear, we still can't see the screen.

276
00:34:07,680 --> 00:34:08,680
Can't see the screen.

277
00:34:08,680 --> 00:34:18,680
Oh, the screen hasn't changed yet, but let me see if I can do something about that.

278
00:34:18,679 --> 00:34:20,679
I guess.

279
00:34:20,679 --> 00:34:33,679
I assume still things that there's actually sharing the screen that doesn't look like an excellent.

280
00:34:33,679 --> 00:34:37,679
How about this?

281
00:34:37,679 --> 00:34:38,679
Yep.

282
00:34:38,679 --> 00:34:39,679
I can see now.

283
00:34:39,679 --> 00:34:40,679
Okay. Thank you.

284
00:34:40,679 --> 00:34:42,679
Okay. So I didn't change anything yet.

285
00:34:42,679 --> 00:34:50,679
I think I was going to draw the next era, which basically when B signs, you know, it's actually covered all the preceding entries to.

286
00:34:50,679 --> 00:34:56,679
And this is sort of good, correct? Because when.

287
00:34:56,679 --> 00:35:04,679
The client, you know, C actually receives, you know, or gets actually sees the log entry for B, then.

288
00:35:04,679 --> 00:35:15,679
So it's impossible for the server to drop the log entry of a because you know that will be detected when C actually detected signature on the log entry of B.

289
00:35:15,679 --> 00:35:25,679
So we already made sort of a big step forward in the sense that it's much harder for the server now to selectively draw block entries.

290
00:35:25,679 --> 00:35:36,679
So that's it. So that we're pretty good pretty good shit. You know, the server cannot drop any.

291
00:35:36,679 --> 00:35:44,679
And keep these modifications.

292
00:35:44,679 --> 00:35:47,679
So that's actually a big, big, big step forward.

293
00:35:47,679 --> 00:35:53,679
And this is look a little bit more in detail. How does it actually is going to play out. So we're declined C.

294
00:35:53,679 --> 00:36:01,679
And you know, we're fetching the log to basically roll out, you know, the distribution of the software to install it on a particular machine.

295
00:36:01,679 --> 00:36:14,679
The first thing the client does, you know, it actually checks all the signatures.

296
00:36:14,679 --> 00:36:21,679
So always the question of course is like when, you know, you want to check the signal of the log entry, you know, which public key do you use.

297
00:36:21,679 --> 00:36:33,679
And because you want to make sure that you're not being tricked in accepting your signature open modification by a, but turns out that actually was not the person actually who signed it.

298
00:36:33,679 --> 00:36:43,679
And it turns out that basically, in to figure out like with key to use to actually verify the signature, the key uses the owner of the file.

299
00:36:43,679 --> 00:36:48,679
So the public key needs to correspond to the owner of the files.

300
00:36:48,679 --> 00:36:53,679
And ignoring groups for now.

301
00:36:53,679 --> 00:36:57,679
You know, basically only the owner of the file is allowed to modify file.

302
00:36:57,679 --> 00:37:04,679
So for this simple, for this, for this, like simplified, you know, we can think about it that they're going to off the PIs owned by a.

303
00:37:04,679 --> 00:37:08,679
And the idea of the files basically the public key of a.

304
00:37:08,679 --> 00:37:17,679
And so we know which public key to use and, and get verified the signature with it.

305
00:37:17,679 --> 00:37:23,679
And so if somebody else, you know, makes a modification that pretends to be a, that actually is not going to check out.

306
00:37:23,679 --> 00:37:28,679
So it's really only a that connects and make the modifications and similar for people.

307
00:37:28,679 --> 00:37:40,679
So that's part of the, you know, one thing that's actually clever about some of them, which I'm not really going to be talking about in some sense, the file system is actually doubling both as a file system as an as a public key.

308
00:37:40,679 --> 00:37:46,679
Public key infrastructure distribution infrastructure.

309
00:37:46,679 --> 00:37:53,679
And so it is actually possible to use some of the basically the right we determine like in which user has which public key.

310
00:37:53,679 --> 00:38:01,679
But I'm not really going to talk about this. I really want to focus on the consistency aspects and the more distributed systems aspects.

311
00:38:01,679 --> 00:38:06,679
The second thing that the client does is check.

312
00:38:06,679 --> 00:38:13,679
It's own last entry.

313
00:38:13,679 --> 00:38:18,679
And this is to protect, you know, the client from actually being rolled back by the server in time.

314
00:38:18,679 --> 00:38:22,679
The server can't actually buy the client check always is last entry.

315
00:38:22,679 --> 00:38:32,679
If it's last entry is in the log still, then you know, the only way forward for the attacker is to actually get a role the file system for a can roll backwards.

316
00:38:32,679 --> 00:38:39,679
So see will check whether or then you have its previous operations are in it and you know confirm that there is still in it.

317
00:38:39,679 --> 00:38:42,679
Actually, it's last entry still in it.

318
00:38:42,679 --> 00:38:44,679
So question here.

319
00:38:44,679 --> 00:38:47,679
This only.

320
00:38:47,679 --> 00:38:57,679
I think this attack from the server to roll back would only work if no other client wrote to the log.

321
00:38:57,679 --> 00:39:05,679
But like after this clients last entry, right, because otherwise checking signatures would figure that out.

322
00:39:05,679 --> 00:39:11,679
Yeah, although the, you know, let's talk about it in a second. Maybe you can always play a fork attack, right?

323
00:39:11,679 --> 00:39:16,679
So you can always split, you know, the view of the file system, the most views.

324
00:39:16,679 --> 00:39:21,679
But you can at least not roll back to client once the client saw a particular file system.

325
00:39:21,679 --> 00:39:24,679
You can go back for some time.

326
00:39:24,679 --> 00:39:32,679
Now the client can, the server can present different file systems in future, but you can't roll back.

327
00:39:32,679 --> 00:39:35,679
Third part.

328
00:39:35,679 --> 00:39:42,679
Good. The third part would be quite industrious and constructive file system.

329
00:39:42,679 --> 00:39:47,679
So after, you know, it knows that it's actually it's not a rule to pass the version of the file system.

330
00:39:47,679 --> 00:39:51,679
It basically applies all the modifications and basically builds a file system tree.

331
00:39:51,679 --> 00:39:53,679
You know, on the client.

332
00:39:53,679 --> 00:39:59,679
And then, you know, perform for whatever operation it is wants to perform. So let's say in the case of.

333
00:39:59,679 --> 00:40:13,679
So let's see what it will do is, you know, it will read, you know, off WY and append an entry to the log.

334
00:40:13,679 --> 00:40:17,679
And site it.

335
00:40:17,679 --> 00:40:25,679
So in the case, when it reads off WY, it will produce basically a signature and entry for this log entry.

336
00:40:25,679 --> 00:40:37,679
And then it will be basically then, and then the final step in this year of protocol is it uploads the log to the file server.

337
00:40:37,679 --> 00:40:42,679
And clearly this vertical is completely in practical.

338
00:40:42,679 --> 00:40:53,679
And really what it is, it's sort of more conceptual protocol to help us understand why we actually might even be successful in achieving security in the context of.

339
00:40:53,679 --> 00:40:57,679
It's, you know, wireless feature calls not only to진� Caleb.

340
00:40:57,679 --> 00:41:03,679
And there's that look on the盟 has to go friends birthdays for.

341
00:41:03,679 --> 00:41:05,679
The City of istit zero and all updates.

342
00:41:05,679 --> 00:41:08,679
And here's what you can't do.

343
00:41:08,679 --> 00:41:09,679
This a conservative���.

344
00:41:09,679 --> 00:41:11,679
I think it's just takes some time on this about.

345
00:41:11,679 --> 00:41:14,679
And than there's, rather.

346
00:41:14,679 --> 00:41:17,679
There's a fair amount of community that post, more alcant prep for every closet.

347
00:41:17,679 --> 00:41:20,799
And there's a performance, but it will help us understand

348
00:41:22,639 --> 00:41:26,319
when we look at the implementation of a scheme

349
00:41:26,319 --> 00:41:28,839
where it actually has the same sort of properties

350
00:41:28,839 --> 00:41:31,960
that they sort of conceptual design has.

351
00:41:31,960 --> 00:41:35,319
And we'll see later, for example, in the case of Bitcoin,

352
00:41:35,319 --> 00:41:37,399
that really does actually have a log.

353
00:41:37,399 --> 00:41:40,359
And since the beginning of time, we've all operations in it.

354
00:41:40,359 --> 00:41:45,359
And so maybe it was a crazy idea, maybe in the context of 2004,

355
00:41:45,360 --> 00:41:49,079
but people actually do have these sort of sign logs

356
00:41:49,079 --> 00:41:50,840
and they really maintained it.

357
00:41:50,840 --> 00:41:54,160
And so in that sense, it's not only a big conceptual idea,

358
00:41:54,160 --> 00:41:55,720
actually people do it in practice.

359
00:41:58,440 --> 00:41:59,640
Any questions so far?

360
00:42:04,519 --> 00:42:09,519
Okay, so the one thing that you're probably

361
00:42:09,960 --> 00:42:14,960
more wondering about that was proposed as a question

362
00:42:15,240 --> 00:42:18,840
for the reading today is, what is up with these metrics?

363
00:42:18,840 --> 00:42:21,840
Why are the fetches in the log two?

364
00:42:25,679 --> 00:42:27,039
Because you might think, you know,

365
00:42:27,039 --> 00:42:28,199
the only thing that we really care about,

366
00:42:28,199 --> 00:42:31,360
like if we think about the way we care about it,

367
00:42:31,360 --> 00:42:33,679
there's only the modifications you have to be in the log,

368
00:42:33,679 --> 00:42:34,800
because that actually other things

369
00:42:34,800 --> 00:42:36,199
that actually modify the file system,

370
00:42:36,199 --> 00:42:37,920
really modify this file system.

371
00:42:37,920 --> 00:42:39,440
So what's the problem?

372
00:42:41,400 --> 00:42:44,320
And so I think I want to do a quick breakout here

373
00:42:44,480 --> 00:42:46,200
and sort of, you can brainstorm each other,

374
00:42:46,200 --> 00:42:49,160
but what you thought the answer to this particular question was,

375
00:42:49,160 --> 00:42:54,160
and hopefully maybe this initial coverage of like a sunday,

376
00:42:56,200 --> 00:42:59,280
you know, maybe hasn't improved your understanding

377
00:42:59,280 --> 00:43:01,480
and you can sort of figure out like what the answer is

378
00:43:01,480 --> 00:43:02,840
or talk about something else.

379
00:43:02,840 --> 00:43:06,880
So I would like to take a maybe do a five minute breakout room.

380
00:43:44,320 --> 00:43:46,320
So I would like to take a few more questions.

381
00:43:46,320 --> 00:43:48,320
I would like to ask you guys,

382
00:43:48,320 --> 00:43:50,320
if you have any questions,

383
00:43:50,320 --> 00:43:52,320
please let me know.

384
00:43:52,320 --> 00:43:54,320
I would like to ask you guys a few questions.

385
00:43:54,320 --> 00:43:56,320
I would like to ask you guys a few questions.

386
00:43:56,320 --> 00:43:58,320
I would like to ask you guys a few questions.

387
00:43:58,320 --> 00:44:00,320
I would like to ask you guys a few questions.

388
00:44:00,320 --> 00:44:02,320
I would like to ask you guys a few questions.

389
00:44:02,320 --> 00:44:04,320
I would like to ask you guys a few questions.

390
00:44:04,320 --> 00:44:06,320
I would like to ask you guys a few questions.

391
00:44:06,320 --> 00:44:08,320
I would like to ask you guys a few questions.

392
00:44:08,320 --> 00:44:10,320
I would like to ask you guys a few questions.

393
00:44:10,320 --> 00:44:12,320
I would like to ask you guys a few questions.

394
00:44:12,320 --> 00:44:14,320
I would like to ask you guys a few questions.

395
00:44:14,320 --> 00:44:16,320
I would like to ask you guys a few questions.

396
00:44:16,320 --> 00:44:18,320
I would like to ask you guys a few questions.

397
00:44:18,320 --> 00:44:20,320
I would like to ask you guys a few questions.

398
00:44:20,320 --> 00:44:22,320
I would like to ask you guys a few questions.

399
00:44:22,320 --> 00:44:24,320
I would like to ask you guys a few questions.

400
00:44:24,320 --> 00:44:26,320
I would like to ask you guys a few questions.

401
00:44:26,320 --> 00:44:28,320
I would like to ask you guys a few questions.

402
00:44:28,320 --> 00:44:30,320
I would like to ask you guys a few questions.

403
00:44:30,320 --> 00:44:32,320
I would like to ask you guys a few questions.

404
00:44:32,320 --> 00:44:34,320
I would like to ask you guys a few questions.

405
00:44:34,320 --> 00:44:36,320
I would like to ask you guys a few questions.

406
00:44:36,320 --> 00:44:38,320
I would like to ask you guys a few questions.

407
00:44:38,320 --> 00:44:40,320
I would like to ask you guys a few questions.

408
00:44:40,320 --> 00:44:42,320
I would like to ask you guys a few questions.

409
00:44:42,320 --> 00:44:44,320
I would like to ask you guys a few questions.

410
00:44:44,320 --> 00:44:46,320
I would like to ask you guys a few questions.

411
00:44:46,320 --> 00:44:48,320
I would like to ask you guys a few questions.

412
00:44:48,320 --> 00:44:50,320
I would like to ask you guys a few questions.

413
00:44:50,320 --> 00:44:52,320
I would like to ask you guys a few questions.

414
00:44:52,320 --> 00:44:54,320
I would like to ask you guys a few questions.

415
00:44:54,320 --> 00:44:56,320
I would like to ask you guys a few questions.

416
00:44:56,320 --> 00:44:58,320
I would like to ask you guys a few questions.

417
00:44:58,320 --> 00:45:00,320
I would like to ask you guys a few questions.

418
00:45:00,320 --> 00:45:02,320
I would like to ask you guys a few questions.

419
00:45:02,320 --> 00:45:04,320
I would like to ask you guys a few questions.

420
00:45:04,320 --> 00:45:06,320
I would like to ask you guys a few questions.

421
00:45:06,320 --> 00:45:08,320
I would like to ask you guys a few questions.

422
00:45:08,320 --> 00:45:10,320
I would like to ask you guys a few questions.

423
00:45:10,320 --> 00:45:12,320
I would like to ask you guys a few questions.

424
00:45:12,320 --> 00:45:14,320
I would like to ask you guys a few questions.

425
00:45:14,320 --> 00:45:16,320
I would like to ask you guys a few questions.

426
00:45:16,320 --> 00:45:18,320
I would like to ask you guys a few questions.

427
00:45:18,320 --> 00:45:20,320
I would like to ask you guys a few questions.

428
00:45:20,320 --> 00:45:22,320
I would like to ask you guys a few questions.

429
00:45:22,320 --> 00:45:24,320
I would like to ask you guys a few questions.

430
00:45:24,320 --> 00:45:26,320
I would like to ask you guys a few questions.

431
00:45:26,320 --> 00:45:28,320
I would like to ask you guys a few questions.

432
00:45:28,320 --> 00:45:30,320
I would like to ask you guys a few questions.

433
00:45:30,320 --> 00:45:32,320
I would like to ask you guys a few questions.

434
00:45:32,320 --> 00:45:34,320
I would like to ask you guys a few questions.

435
00:45:34,320 --> 00:45:36,320
I would like to ask you guys a few questions.

436
00:45:36,320 --> 00:45:38,320
I would like to ask you guys a few questions.

437
00:45:38,320 --> 00:45:40,320
I would like to ask you guys a few questions.

438
00:45:40,320 --> 00:45:42,320
I would like to ask you guys a few questions.

439
00:45:42,320 --> 00:45:44,320
I would like to ask you guys a few questions.

440
00:45:44,320 --> 00:45:46,320
I would like to ask you guys a few questions.

441
00:45:46,320 --> 00:45:48,320
I would like to ask you guys a few questions.

442
00:45:48,320 --> 00:45:50,320
I would like to ask you guys a few questions.

443
00:45:50,320 --> 00:45:52,320
I would like to ask you guys a few questions.

444
00:45:52,320 --> 00:45:54,320
I would like to ask you guys a few questions.

445
00:45:54,320 --> 00:45:56,320
I would like to ask you guys a few questions.

446
00:45:56,320 --> 00:45:58,320
I would like to ask you guys a few questions.

447
00:45:58,320 --> 00:46:00,320
I would like to ask you guys a few questions.

448
00:46:00,320 --> 00:46:02,320
I would like to ask you guys a few questions.

449
00:46:02,320 --> 00:46:04,320
I would like to ask you guys a few questions.

450
00:46:04,320 --> 00:46:06,320
I would like to ask you guys a few questions.

451
00:46:06,320 --> 00:46:08,320
I would like to ask you guys a few questions.

452
00:46:08,320 --> 00:46:10,320
I would like to ask you guys a few questions.

453
00:46:10,320 --> 00:46:12,320
I would like to ask you guys a few questions.

454
00:46:12,320 --> 00:46:14,320
I would like to ask you guys a few questions.

455
00:46:14,320 --> 00:46:16,320
I would like to ask you guys a few questions.

456
00:46:16,320 --> 00:46:18,320
I would like to ask you guys a few questions.

457
00:46:18,320 --> 00:46:20,320
I would like to ask you guys a few questions.

458
00:46:20,320 --> 00:46:22,320
I would like to ask you guys a few questions.

459
00:46:22,320 --> 00:46:24,320
I would like to ask you guys a few questions.

460
00:46:24,320 --> 00:46:26,320
I would like to ask you guys a few questions.

461
00:46:26,320 --> 00:46:28,320
I would like to ask you guys a few questions.

462
00:46:28,320 --> 00:46:30,320
I would like to ask you guys a few questions.

463
00:46:30,320 --> 00:46:32,320
I would like to ask you guys a few questions.

464
00:46:32,320 --> 00:46:34,320
I would like to ask you guys a few questions.

465
00:46:34,320 --> 00:46:36,320
I would like to ask you guys a few questions.

466
00:46:36,320 --> 00:46:38,320
I would like to ask you guys a few questions.

467
00:46:38,320 --> 00:46:40,320
I would like to ask you guys a few questions.

468
00:46:40,320 --> 00:46:42,320
I would like to ask you guys a few questions.

469
00:46:42,320 --> 00:46:44,320
I would like to ask you guys a few questions.

470
00:46:44,320 --> 00:46:46,320
I would like to ask you guys a few questions.

471
00:46:46,320 --> 00:46:48,320
I would like to ask you guys a few questions.

472
00:46:48,320 --> 00:46:50,320
I would like to ask you guys a few questions.

473
00:46:50,320 --> 00:46:52,320
I would like to ask you guys a few questions.

474
00:46:52,320 --> 00:46:54,320
I would like to ask you guys a few questions.

475
00:46:54,320 --> 00:46:56,320
I would like to ask you guys a few questions.

476
00:46:56,320 --> 00:46:58,320
I would like to ask you guys a few questions.

477
00:46:58,320 --> 00:47:00,320
I would like to ask you guys a few questions.

478
00:47:00,320 --> 00:47:02,320
I would like to ask you guys a few questions.

479
00:47:02,320 --> 00:47:04,320
I would like to ask you guys a few questions.

480
00:47:04,320 --> 00:47:06,320
I would like to ask you guys a few questions.

481
00:47:06,320 --> 00:47:08,320
I would like to ask you guys a few questions.

482
00:47:08,320 --> 00:47:10,320
I would like to ask you guys a few questions.

483
00:47:10,320 --> 00:47:12,320
I would like to ask you guys a few questions.

484
00:47:12,320 --> 00:47:14,320
I would like to ask you guys a few questions.

485
00:47:14,320 --> 00:47:16,320
I would like to ask you guys a few questions.

486
00:47:16,320 --> 00:47:18,320
I would like to ask you guys a few questions.

487
00:47:18,320 --> 00:47:20,320
I would like to ask you guys a few questions.

488
00:47:20,320 --> 00:47:22,320
I would like to ask you guys a few questions.

489
00:47:22,320 --> 00:47:24,320
I would like to ask you guys a few questions.

490
00:47:24,320 --> 00:47:26,320
I would like to ask you guys a few questions.

491
00:47:26,320 --> 00:47:28,320
I would like to ask you guys a few questions.

492
00:47:28,320 --> 00:47:30,320
I would like to ask you guys a few questions.

493
00:47:30,320 --> 00:47:32,320
I would like to ask you guys a few questions.

494
00:47:32,320 --> 00:47:34,320
I would like to ask you guys a few questions.

495
00:47:34,320 --> 00:47:36,320
I would like to ask you guys a few questions.

496
00:47:36,320 --> 00:47:38,320
I would like to ask you guys a few questions.

497
00:47:38,320 --> 00:47:40,320
I would like to ask you guys a few questions.

498
00:47:40,320 --> 00:47:42,320
I would like to ask you guys a few questions.

499
00:47:42,320 --> 00:47:44,320
I would like to ask you guys a few questions.

500
00:47:44,320 --> 00:47:46,320
I would like to ask you guys a few questions.

501
00:47:46,320 --> 00:47:48,320
I would like to ask you guys a few questions.

502
00:47:48,320 --> 00:47:50,320
I would like to ask you guys a few questions.

503
00:47:50,320 --> 00:47:52,320
I would like to ask you guys a few questions.

504
00:47:52,320 --> 00:47:54,320
I would like to ask you guys a few questions.

505
00:47:54,320 --> 00:47:56,320
I would like to ask you guys a few questions.

506
00:47:56,320 --> 00:47:58,320
I would like to ask you guys a few questions.

507
00:47:58,320 --> 00:48:00,320
I would like to ask you guys a few questions.

508
00:48:00,320 --> 00:48:02,320
I would like to ask you guys a few questions.

509
00:48:02,320 --> 00:48:04,320
I would like to ask you guys a few questions.

510
00:48:04,320 --> 00:48:06,320
I would like to ask you guys a few questions.

511
00:48:06,320 --> 00:48:08,320
I would like to ask you guys a few questions.

512
00:48:08,320 --> 00:48:10,320
I would like to ask you guys a few questions.

513
00:48:10,320 --> 00:48:12,320
I would like to ask you guys a few questions.

514
00:48:12,320 --> 00:48:14,320
I would like to ask you guys a few questions.

515
00:48:14,320 --> 00:48:16,320
I would like to ask you guys a few questions.

516
00:48:16,320 --> 00:48:18,320
I would like to ask you guys a few questions.

517
00:48:18,320 --> 00:48:20,320
I would like to ask you guys a few questions.

518
00:48:20,320 --> 00:48:22,320
I would like to ask you guys a few questions.

519
00:48:22,320 --> 00:48:24,320
I would like to ask you guys a few questions.

520
00:48:24,320 --> 00:48:25,320
I would like to ask you guys a few questions.

521
00:48:25,320 --> 00:48:27,320
I would like to ask you guys a few questions.

522
00:48:27,320 --> 00:48:29,320
I would like to ask you guys a few questions.

523
00:48:29,320 --> 00:48:31,320
I would like to ask you guys a few questions.

524
00:48:31,320 --> 00:48:33,320
I would like to ask you guys a few questions.

525
00:48:33,320 --> 00:48:35,320
I would like to ask you guys a few questions.

526
00:48:35,320 --> 00:48:37,320
I would like to ask you guys a few questions.

527
00:48:37,320 --> 00:48:39,320
I would like to ask you guys a few questions.

528
00:48:39,320 --> 00:48:41,320
I would like to ask you guys a few questions.

529
00:48:41,320 --> 00:48:43,320
I would like to ask you guys a few questions.

530
00:48:43,320 --> 00:48:45,320
I would like to ask you guys a few questions.

531
00:48:45,320 --> 00:48:47,320
I would like to ask you guys a few questions.

532
00:48:47,320 --> 00:48:49,320
I would like to ask you guys a few questions.

533
00:48:49,320 --> 00:48:51,320
I would like to ask you guys a few questions.

534
00:48:51,320 --> 00:48:53,320
I would like to ask you guys a few questions.

535
00:48:53,320 --> 00:48:54,320
I would like to ask you guys a few questions.

536
00:48:55,320 --> 00:48:58,320
I could ask you guys a few questions.

537
00:49:00,320 --> 00:49:04,320
I could ask you guys a few questions.

538
00:49:04,320 --> 00:49:06,320
I could ask you guys a few questions.

539
00:49:06,320 --> 00:49:14,320
I could ask you guys a few questions.

540
00:49:14,320 --> 00:49:20,320
I could ask you guys a few questions.

541
00:49:20,320 --> 00:49:23,320
I could ask you guys a few numbers.

542
00:49:23,320 --> 00:49:24,980
Thank you.

543
00:49:24,980 --> 00:49:26,680
Okay, so what does it look like,

544
00:49:26,680 --> 00:49:28,220
let's start with homework questions.

545
00:49:29,160 --> 00:49:30,160
We don't have a question.

546
00:49:30,160 --> 00:49:32,360
Why are the fetches in the law?

547
00:49:38,400 --> 00:49:39,240
Anybody?

548
00:49:41,720 --> 00:49:44,240
If you have a redone list ever,

549
00:49:44,240 --> 00:49:45,480
if there are no fetches,

550
00:49:45,480 --> 00:49:48,880
this the call system can give it anything.

551
00:49:48,880 --> 00:49:50,280
Can it?

552
00:49:50,280 --> 00:49:52,160
Can it give it because it,

553
00:49:52,159 --> 00:49:53,879
because there are no fetches in the log,

554
00:49:53,879 --> 00:49:58,079
that would mean that there are,

555
00:49:58,079 --> 00:50:00,119
the, the,

556
00:50:00,119 --> 00:50:04,799
the redone list service would not be doing a lot of the checks

557
00:50:04,799 --> 00:50:06,079
that we talked about before.

558
00:50:06,079 --> 00:50:09,679
So the, the go back in time, for example,

559
00:50:09,679 --> 00:50:13,159
might maybe not work because it did not put anything

560
00:50:13,159 --> 00:50:15,839
in the log because it's only fetches.

561
00:50:15,839 --> 00:50:16,679
Yeah, yeah.

562
00:50:16,679 --> 00:50:17,519
Okay, good, good.

563
00:50:17,519 --> 00:50:20,519
So I think you're totally in the right track.

564
00:50:20,519 --> 00:50:22,880
It was like trying to make it a little bit more precise

565
00:50:22,880 --> 00:50:24,239
or more concrete.

566
00:50:24,239 --> 00:50:25,440
I think it is correct.

567
00:50:25,440 --> 00:50:27,159
So let's assume this is the log looked like

568
00:50:27,159 --> 00:50:29,119
and the C's fetches are not in it.

569
00:50:30,280 --> 00:50:31,759
And let's, you know,

570
00:50:31,759 --> 00:50:35,840
this is the log before I actually see downloads the log.

571
00:50:35,840 --> 00:50:37,360
And so let's say, you know, we're,

572
00:50:37,360 --> 00:50:38,719
see a fetish,

573
00:50:40,679 --> 00:50:43,800
fetish, fetish, off the PY,

574
00:50:43,800 --> 00:50:46,960
right, this is the file that was modified by eight.

575
00:50:46,960 --> 00:50:49,320
And basically, but the server does.

576
00:50:50,280 --> 00:50:54,240
The server instead of actually providing both

577
00:50:54,240 --> 00:50:57,000
the modifications A and B because it has it, right,

578
00:50:57,000 --> 00:50:59,720
which A and B were done with its modifications,

579
00:50:59,720 --> 00:51:02,480
it sends the C,

580
00:51:05,280 --> 00:51:06,519
basically prefix,

581
00:51:09,039 --> 00:51:12,120
since the prefix, that excludes

582
00:51:13,920 --> 00:51:16,000
the modifications to A and B.

583
00:51:17,000 --> 00:51:20,159
So we've have mods A and B.

584
00:51:22,559 --> 00:51:25,559
Right, and so C fetches this file,

585
00:51:25,559 --> 00:51:26,960
it's a fetish of the log.

586
00:51:26,960 --> 00:51:29,480
And so there's basically it's this part of the log,

587
00:51:29,480 --> 00:51:30,639
here's the prefix.

588
00:51:34,159 --> 00:51:36,639
C checks the signature,

589
00:51:36,639 --> 00:51:39,440
checks whether it's proceeding operations or in it.

590
00:51:39,440 --> 00:51:41,519
And they're all there because she hasn't done

591
00:51:41,519 --> 00:51:43,039
any other operation yet.

592
00:51:43,039 --> 00:51:44,719
And so basically we'll accept the log

593
00:51:45,559 --> 00:51:47,919
and the log is it is or the prefix as it is.

594
00:51:47,919 --> 00:51:50,879
And basically returns, you know, off the PY

595
00:51:50,879 --> 00:51:54,519
to whatever application that is copying the software

596
00:51:54,519 --> 00:51:56,319
into the machine that actually is going to run

597
00:51:56,319 --> 00:51:58,199
the installed software.

598
00:51:58,199 --> 00:52:00,199
So then see fetish,

599
00:52:04,199 --> 00:52:05,199
negative PY.

600
00:52:08,679 --> 00:52:11,079
And this time around the server

601
00:52:12,079 --> 00:52:14,399
sends the whole log.

602
00:52:15,719 --> 00:52:19,719
And you know, the C,

603
00:52:23,959 --> 00:52:27,199
see looks at these entries and the valid log.

604
00:52:28,719 --> 00:52:31,759
In some of our cases are usually in the prefix,

605
00:52:31,759 --> 00:52:33,799
since we didn't care about fetches,

606
00:52:33,799 --> 00:52:35,079
it's of course not in the log.

607
00:52:36,079 --> 00:52:38,639
And so everything looks good.

608
00:52:38,639 --> 00:52:40,639
These are valid modifications,

609
00:52:40,639 --> 00:52:42,719
nothing has been changed.

610
00:52:42,719 --> 00:52:47,719
And so we've had the fetish in the log,

611
00:52:47,959 --> 00:52:50,599
see we'll actually accept these log

612
00:52:50,599 --> 00:52:53,759
and basically build a file system that has

613
00:52:56,159 --> 00:52:58,759
that includes the modifications to the AMB

614
00:52:58,759 --> 00:53:03,199
and returns the result to the application for backed up PY.

615
00:53:05,639 --> 00:53:07,199
So that can install the machine

616
00:53:07,199 --> 00:53:09,599
that actually is going to run the service.

617
00:53:09,599 --> 00:53:10,799
And as you can see,

618
00:53:10,800 --> 00:53:12,760
now we're in sort of in a bad situation, right?

619
00:53:12,760 --> 00:53:17,080
Because we took the old version of off-the-out PY

620
00:53:18,400 --> 00:53:21,240
and the new version of thank you to those PYs.

621
00:53:23,120 --> 00:53:25,840
And the one way you could think about this is that,

622
00:53:25,840 --> 00:53:26,760
you know, from, you know,

623
00:53:26,760 --> 00:53:28,680
C's perspective,

624
00:53:28,680 --> 00:53:30,560
what really seemed to be that happened is that,

625
00:53:30,560 --> 00:53:31,560
well,

626
00:53:34,360 --> 00:53:37,560
while you know, it was reading off the PY,

627
00:53:37,560 --> 00:53:40,480
you know, there were concurrent modifications to AMB

628
00:53:40,639 --> 00:53:42,280
and it just happened basically at the same time

629
00:53:42,280 --> 00:53:43,960
or at least the server is pretending

630
00:53:43,960 --> 00:53:45,760
it happened at the same time.

631
00:53:45,760 --> 00:53:50,039
And so it gets confused or it can detect

632
00:53:50,039 --> 00:53:52,800
that the fact these applications were did happen

633
00:53:52,800 --> 00:53:53,960
before any time.

634
00:53:55,199 --> 00:53:57,599
And so this is the problem that, you know,

635
00:53:57,599 --> 00:53:59,519
basically putting the fetish in the log,

636
00:53:59,519 --> 00:54:01,360
a solvus, solvus,

637
00:54:01,360 --> 00:54:06,199
and let's make that actually just also complete.

638
00:54:07,039 --> 00:54:12,039
So C and Y actually do this problem with a solvus in that case?

639
00:54:14,480 --> 00:54:16,199
Because I had a question.

640
00:54:16,199 --> 00:54:17,039
Yep.

641
00:54:18,000 --> 00:54:22,519
So I am having a little trouble understanding what the,

642
00:54:24,119 --> 00:54:29,119
like sort of like the interface for fetching modify

643
00:54:29,839 --> 00:54:30,679
is like what?

644
00:54:32,199 --> 00:54:35,839
I thought you fetched pretty much like the whole tree

645
00:54:35,840 --> 00:54:38,559
and had to rebuild the whole file system,

646
00:54:38,559 --> 00:54:39,800
basic example.

647
00:54:40,800 --> 00:54:45,039
But in this slide before you're fetching like specific files.

648
00:54:45,039 --> 00:54:49,559
Yeah, the server is the one that returns the log, correct?

649
00:54:49,559 --> 00:54:52,800
And so the server can decide what entries they include.

650
00:54:52,800 --> 00:54:53,640
Yeah.

651
00:54:53,640 --> 00:54:56,320
And we're seeing that it can't really delete anything

652
00:54:56,320 --> 00:54:57,600
out of the middle of the log, right?

653
00:54:57,600 --> 00:54:59,240
That's not really possible.

654
00:54:59,240 --> 00:55:01,320
But it's always in the prefix of the log

655
00:55:01,320 --> 00:55:04,160
because the prefix is always consistent with itself.

656
00:55:04,160 --> 00:55:05,000
Yeah.

657
00:55:05,000 --> 00:55:08,159
And so in this first case, correct?

658
00:55:08,159 --> 00:55:09,679
It sent the prefix.

659
00:55:09,679 --> 00:55:11,840
And in the second case, it sent the whole log.

660
00:55:11,840 --> 00:55:12,840
Yeah.

661
00:55:12,840 --> 00:55:14,480
And so the server can decide to do that, right?

662
00:55:14,480 --> 00:55:16,400
But it's like nothing that the client can,

663
00:55:16,400 --> 00:55:18,920
or lease it like so far, you know, we've discussed.

664
00:55:18,920 --> 00:55:20,000
And there's nothing that the client,

665
00:55:20,000 --> 00:55:23,199
how the client can detect that it didn't get like the whole log.

666
00:55:23,199 --> 00:55:24,039
Right.

667
00:55:24,039 --> 00:55:25,039
Right.

668
00:55:25,039 --> 00:55:27,880
My question is more towards like what the interface is

669
00:55:27,880 --> 00:55:30,679
for clients to use like fetch and modify.

670
00:55:30,679 --> 00:55:33,840
Like like, because I thought initially I thought,

671
00:55:33,840 --> 00:55:37,079
okay, like fetch, fetch is like the whole file system.

672
00:55:37,079 --> 00:55:37,920
No, no, no, no, no.

673
00:55:37,920 --> 00:55:39,400
In fetch is a single file.

674
00:55:39,400 --> 00:55:40,400
Okay.

675
00:55:40,400 --> 00:55:43,720
And so basically what a fetch does is to get to the log,

676
00:55:43,720 --> 00:55:45,240
like modification effects, okay.

677
00:55:45,240 --> 00:55:48,360
So modifications are only operations that modify the file.

678
00:55:48,360 --> 00:55:51,160
And like if you go back to a slight little bit earlier,

679
00:55:51,160 --> 00:55:52,600
you know, in the modification record,

680
00:55:52,600 --> 00:55:55,480
it's such a specifically which file is being modified.

681
00:55:55,480 --> 00:55:56,480
Mm-hmm.

682
00:55:56,480 --> 00:55:59,360
And you know, what's being sent is similarly in the fetch,

683
00:55:59,360 --> 00:56:01,920
actually it says which file likes this client's software.

684
00:56:02,920 --> 00:56:03,920
Okay.

685
00:56:03,920 --> 00:56:08,920
And then so, so, so for fetch like a client goes through the log,

686
00:56:11,440 --> 00:56:13,280
but only looks at.

687
00:56:13,280 --> 00:56:15,159
Yeah, the final thing it does is actually read the file

688
00:56:15,159 --> 00:56:16,720
that actually is looking for.

689
00:56:16,720 --> 00:56:19,559
Okay, but doesn't check every single entry in the log.

690
00:56:19,559 --> 00:56:21,519
Anyways, for the signature or.

691
00:56:21,519 --> 00:56:22,920
Yeah, yeah, yeah, yeah.

692
00:56:22,920 --> 00:56:25,760
Okay, first step is always checking the whole log.

693
00:56:25,760 --> 00:56:26,760
Go for it.

694
00:56:26,760 --> 00:56:29,200
And make sure that your last, you know,

695
00:56:29,199 --> 00:56:31,679
operations in it where it's a fetch or modify.

696
00:56:31,679 --> 00:56:32,519
Yeah.

697
00:56:32,519 --> 00:56:34,679
Although in this broken scheme, you know,

698
00:56:34,679 --> 00:56:36,799
we drop the fetch.

699
00:56:36,799 --> 00:56:40,039
It applies all the checks all the signatures.

700
00:56:40,039 --> 00:56:43,119
And then it builds up the file system.

701
00:56:43,119 --> 00:56:45,199
By replaying the log from the beginning of the time

702
00:56:45,199 --> 00:56:46,359
and get a file system.

703
00:56:46,359 --> 00:56:48,000
And then it does its operation.

704
00:56:48,000 --> 00:56:50,439
And so in this case, the operation is actually fetched off

705
00:56:50,439 --> 00:56:52,639
of the PY is basically reading it.

706
00:56:52,639 --> 00:56:53,480
Okay.

707
00:56:53,480 --> 00:56:55,319
The reason we, you know, basically we've talked about fetching

708
00:56:55,319 --> 00:56:58,199
modify is because all operations are basically falling

709
00:56:58,199 --> 00:57:02,759
one or two camps, either it's a fetch or it is a modification

710
00:57:02,759 --> 00:57:05,079
operation, like writing a file, creating a file,

711
00:57:05,079 --> 00:57:07,319
there's a whole modification operations.

712
00:57:07,319 --> 00:57:09,480
The fetch operations are reading a file,

713
00:57:09,480 --> 00:57:13,919
maybe Allison's directory, status file, that kind of thing.

714
00:57:13,919 --> 00:57:14,759
Okay.

715
00:57:14,759 --> 00:57:19,239
And then the modify is also like a modified,

716
00:57:19,239 --> 00:57:23,319
like doesn't fetch the, also fetches the log,

717
00:57:23,319 --> 00:57:26,359
but then builds the file system.

718
00:57:26,359 --> 00:57:27,199
Yeah.

719
00:57:27,599 --> 00:57:28,159
The fetch is here.

720
00:57:28,159 --> 00:57:29,879
I'm using fetch, I guess in two ways.

721
00:57:29,879 --> 00:57:33,239
One, to describe read only operations and actually to get me

722
00:57:33,239 --> 00:57:36,359
to obtain or receive the log from the server.

723
00:57:36,359 --> 00:57:37,199
Okay.

724
00:57:37,199 --> 00:57:40,519
But then modify, modify is also one single file.

725
00:57:40,519 --> 00:57:41,359
Yes.

726
00:57:41,359 --> 00:57:43,359
Yeah. For every modification in the file system,

727
00:57:43,359 --> 00:57:45,079
you're going to have a log entry.

728
00:57:45,079 --> 00:57:45,919
Okay.

729
00:57:47,359 --> 00:57:48,679
Thanks.

730
00:57:48,679 --> 00:57:50,839
Sorry, I also have a question.

731
00:57:50,839 --> 00:57:55,839
I don't really understand why this scenario is a problem.

732
00:57:56,840 --> 00:58:00,320
Because as you said, it's possible,

733
00:58:00,320 --> 00:58:01,960
like from the perspective of the client,

734
00:58:01,960 --> 00:58:08,039
it may well be that AMB got created or modified

735
00:58:08,039 --> 00:58:09,720
from the last fetch.

736
00:58:09,720 --> 00:58:09,960
Yeah.

737
00:58:09,960 --> 00:58:11,360
In principle, it could have happened,

738
00:58:11,360 --> 00:58:11,880
correct?

739
00:58:11,880 --> 00:58:13,079
It was a coding modification.

740
00:58:13,079 --> 00:58:17,320
We do know, because we were sort of look from the top.

741
00:58:17,320 --> 00:58:20,039
And we know that basically see you rent the file

742
00:58:20,039 --> 00:58:21,680
after AMB modified it.

743
00:58:22,920 --> 00:58:25,519
But the server can pretend, as if it actually happened

744
00:58:25,519 --> 00:58:26,519
concurrently.

745
00:58:26,519 --> 00:58:29,519
And in a second, we'll see that if we stick the fetching

746
00:58:29,519 --> 00:58:32,519
in the log, the server cannot create to do that.

747
00:58:32,519 --> 00:58:36,519
Okay. But even if the server pretends that,

748
00:58:36,519 --> 00:58:40,519
is that even a problem?

749
00:58:40,519 --> 00:58:41,519
Does it break anything?

750
00:58:41,519 --> 00:58:42,519
Because the client can...

751
00:58:42,519 --> 00:58:43,519
Yeah.

752
00:58:43,519 --> 00:58:44,519
Yeah.

753
00:58:44,519 --> 00:58:45,519
This is an example where it shows that it breaks something,

754
00:58:45,519 --> 00:58:46,519
correct?

755
00:58:46,519 --> 00:58:50,519
Like step one, you know, see fetch is off.py.

756
00:58:50,519 --> 00:58:53,519
The server gave it one, you know, as part of fetch,

757
00:58:53,519 --> 00:58:55,519
it gave it the prefix.

758
00:58:55,519 --> 00:58:57,519
And so the client conscripted the file system,

759
00:58:57,519 --> 00:59:01,519
executed the operation, returned off.py to the application

760
00:59:01,519 --> 00:59:04,519
and installed the server on the machine just to make a very

761
00:59:04,519 --> 00:59:05,519
crisp.

762
00:59:05,519 --> 00:59:09,519
So now the first reading off.py, that operation is done, right?

763
00:59:09,519 --> 00:59:14,519
Finished already executed and has installed the old version

764
00:59:14,519 --> 00:59:17,519
of off.py on the machine.

765
00:59:17,519 --> 00:59:22,519
Then the client, you know, confectors banged up.py.

766
00:59:22,519 --> 00:59:26,519
Now the server actually, the client or the application

767
00:59:26,519 --> 00:59:28,519
wants to read bank.py.

768
00:59:28,519 --> 00:59:30,519
So the client fetches the log from the server,

769
00:59:30,519 --> 00:59:32,519
or asks the server, please give me the log.

770
00:59:32,519 --> 00:59:35,519
The server disdain around gets the whole log.

771
00:59:35,519 --> 00:59:37,519
And not just the prefix.

772
00:59:37,519 --> 00:59:38,519
Yeah, but...

773
00:59:38,519 --> 00:59:41,519
The line it, you know, builds up the whole file system

774
00:59:41,519 --> 00:59:44,519
and returns banged up.py to the application.

775
00:59:44,519 --> 00:59:46,519
But in like, I...

776
00:59:46,519 --> 00:59:49,519
Wouldn't this happen in an incorrect implementation of the client?

777
00:59:49,519 --> 00:59:51,519
Because if the client finds that,

778
00:59:51,519 --> 00:59:55,519
receive the log and it sees an additional modification on a,

779
00:59:55,519 --> 01:00:00,519
if the client knows that it's logic depends on a and b being

780
01:00:00,519 --> 01:00:03,519
in sync, it will also fetch a again.

781
01:00:03,519 --> 01:00:04,519
Yeah, yeah, yeah.

782
01:00:04,519 --> 01:00:09,519
Okay, so the question, see doesn't know correct that.

783
01:00:09,519 --> 01:00:13,519
Is see, okay.

784
01:00:13,519 --> 01:00:16,519
In this particular scenario.

785
01:00:16,519 --> 01:00:19,519
We're trying to establish whether actually, you know,

786
01:00:19,519 --> 01:00:21,519
see can determine whether action the modification happened

787
01:00:21,519 --> 01:00:24,519
concurrently or in the past, you know, before and

788
01:00:24,519 --> 01:00:25,519
red.

789
01:00:25,519 --> 01:00:27,519
You know, we want to be in the case that it actually happened

790
01:00:27,519 --> 01:00:29,519
in the past because actually really happened in the past.

791
01:00:29,519 --> 01:00:31,519
But, you know, what this server does,

792
01:00:31,519 --> 01:00:35,519
it just pretends that the modification actually happened

793
01:00:35,519 --> 01:00:39,519
concurrently with actually see operations.

794
01:00:39,519 --> 01:00:43,519
And see doesn't really have any way to detect that.

795
01:00:43,519 --> 01:00:46,519
Other than the new, you know, maybe that, you know,

796
01:00:46,519 --> 01:00:49,519
there should have been a modification for a and b together.

797
01:00:49,519 --> 01:00:52,519
But that only could have known if there was sort of communication

798
01:00:52,519 --> 01:00:54,519
between see and a and b.

799
01:00:54,519 --> 01:00:56,519
And second, let's talk about that in a second.

800
01:00:56,519 --> 01:00:58,519
If see had not talked to a and b,

801
01:00:58,519 --> 01:01:01,519
and you know, it could have gotten the good,

802
01:01:01,519 --> 01:01:04,519
could have ended up in this scenario where it installed the old

803
01:01:04,519 --> 01:01:07,519
version and of off that divine the new version of bank that

804
01:01:07,519 --> 01:01:08,519
be why.

805
01:01:08,519 --> 01:01:11,519
And we'll see in a second that we stick the fetus in,

806
01:01:11,519 --> 01:01:14,519
then this problem just cannot happen.

807
01:01:14,519 --> 01:01:19,519
So when he asked if we timestamp everything, then, you know,

808
01:01:19,519 --> 01:01:25,519
we could detect things, hold that five for a second.

809
01:01:25,519 --> 01:01:29,519
Okay, let's look at the, the VIT fetus scenario, right?

810
01:01:29,519 --> 01:01:32,519
So see what, what actually happens in that case.

811
01:01:32,519 --> 01:01:36,519
So client fetus.

812
01:01:36,519 --> 01:01:41,519
What is the fetus of off the Y?

813
01:01:41,519 --> 01:01:48,519
Oops, what happened now?

814
01:01:48,519 --> 01:01:51,519
To hold in a second.

815
01:01:51,519 --> 01:01:53,519
Something went wrong.

816
01:01:53,519 --> 01:01:56,519
I presume we nobody can see you.

817
01:01:56,519 --> 01:02:04,519
Yeah, yeah.

818
01:02:04,519 --> 01:02:10,519
It's coming back.

819
01:02:10,519 --> 01:02:32,519
I definitely feel today there's a busy team component to a 24.

820
01:02:32,519 --> 01:02:35,519
Okay, make your stocks share in screen for a second.

821
01:03:02,519 --> 01:03:22,519
Okay, let's see.

822
01:03:22,519 --> 01:03:32,519
Okay, let's see.

823
01:03:32,519 --> 01:03:38,519
Okay, so back to this example, where now the fetus are in the log,

824
01:03:38,519 --> 01:03:43,519
see fetus the off the Y.

825
01:03:43,519 --> 01:03:52,519
So, see if it's for just.

826
01:03:52,519 --> 01:04:03,519
Fetchers off the PY, the server, you know, since the prefix.

827
01:04:03,519 --> 01:04:07,519
So basically since, you know, these modifications correctly,

828
01:04:07,519 --> 01:04:10,519
just the server can just return whatever it likes.

829
01:04:10,519 --> 01:04:15,519
And you know, in this new plan, correct, where the fetus actually are being logged,

830
01:04:15,519 --> 01:04:20,519
then see construct the file system using a and B.

831
01:04:20,519 --> 01:04:25,519
And then returns that of course, you know, off the PY to the client,

832
01:04:25,519 --> 01:04:28,519
or to the application.

833
01:04:28,519 --> 01:04:36,519
And then it adds a fetch to the log.

834
01:04:36,519 --> 01:04:42,519
And then uploads that log.

835
01:04:42,519 --> 01:04:43,519
Through the server.

836
01:04:43,519 --> 01:04:46,519
And then, you know, the.

837
01:04:46,519 --> 01:04:52,519
It does a fetch off, you know, banked up the PY.

838
01:04:52,519 --> 01:04:57,519
And, you know, the server, you know, in our previous example,

839
01:04:57,519 --> 01:05:02,519
the first attempt to set just the prefix.

840
01:05:02,519 --> 01:05:09,519
Now, you know, because of the now the client sends the whole thing.

841
01:05:09,519 --> 01:05:13,519
Right, so it sends the whole log.

842
01:05:13,519 --> 01:05:18,519
And if, but if the modifications are not in it.

843
01:05:18,519 --> 01:05:22,519
So, and we'll have to send the whole log, well, to send the whole log,

844
01:05:22,519 --> 01:05:24,519
it must include the fetch from C.

845
01:05:24,519 --> 01:05:25,519
Right.

846
01:05:25,519 --> 01:05:27,519
And so,

847
01:05:27,519 --> 01:05:32,519
and if it doesn't, you know, send the fetch we see.

848
01:05:32,519 --> 01:05:37,519
It actually sees that this C is not actually not there.

849
01:05:37,519 --> 01:05:39,519
The read operation.

850
01:05:39,519 --> 01:05:42,519
And basically the.

851
01:05:42,519 --> 01:05:47,519
Climb will reject the log because actually it's own fetch operation is actually not in it.

852
01:05:47,519 --> 01:05:50,519
So it is not possible for the.

853
01:05:50,519 --> 01:05:58,519
And then, you know, the server to pretend, you know, that to send the log later on because actually the new log should have included that fetch operation.

854
01:05:58,519 --> 01:06:00,519
That was in it.

855
01:06:00,519 --> 01:06:06,519
And the upgrade the C or the server cannot splice that fetch operation into here.

856
01:06:06,519 --> 01:06:09,519
To make it consistent what actually happened before.

857
01:06:09,519 --> 01:06:11,519
Because that would be detected.

858
01:06:11,519 --> 01:06:18,519
Because, you know, the modifications on the record of AMD are not wouldn't wouldn't check out.

859
01:06:18,519 --> 01:06:26,519
Okay. So basically what what this really does is to sort of step back instead you can think about this attack that.

860
01:06:26,519 --> 01:06:32,519
The server sort of pretends that the modification to the AMD happened concurrently with the C reading it.

861
01:06:32,519 --> 01:06:37,519
Even though we know that actually it's not the case and by sticking the fetches in it.

862
01:06:37,519 --> 01:06:43,519
The attack cannot happen.

863
01:06:43,519 --> 01:06:46,519
I have two questions.

864
01:06:46,519 --> 01:06:53,519
Maybe first just if you could like define for consistency and the fetch modified consistency.

865
01:06:53,519 --> 01:06:56,519
And then the second is in this example.

866
01:06:56,519 --> 01:07:04,519
So what exactly stopping the server from placing the fetch in the right place of the log.

867
01:07:04,519 --> 01:07:10,519
Because remember every log entry coverage always preceding entries.

868
01:07:10,519 --> 01:07:18,519
So the server could not splice that you know fetch after the prefix before the modifications of AMD.

869
01:07:18,519 --> 01:07:24,519
So let's say it only wants to send the modification of a knows the hash of modification of everything preceding it.

870
01:07:24,519 --> 01:07:29,519
And then it could insert like the fetch to see there because it knows that.

871
01:07:29,519 --> 01:07:31,519
It could say hash of that.

872
01:07:31,519 --> 01:07:36,519
Yeah, but then it couldn't send the modification to be.

873
01:07:36,519 --> 01:07:44,519
Because the modification would be you know is directly after a and so any must and so he can't splice it between a and b either.

874
01:07:44,519 --> 01:07:49,519
I see.

875
01:07:49,519 --> 01:07:55,519
Sorry. And what was the problem with having it where it is in the picture.

876
01:07:55,519 --> 01:08:05,519
Well, I'm learning this and out of pictures perfect. It's fine. Right. And in fact, you know, this basically suggests you know that the fetch of C actually included the modification of a B like the blue was the real log.

877
01:08:05,519 --> 01:08:18,520
And we have the fashion to see in it and you know the everything's going to be perfect.

878
01:08:18,520 --> 01:08:22,520
So just to clarify the definition of for consistency.

879
01:08:22,520 --> 01:08:23,520
Hold on. Hold a second.

880
01:08:23,520 --> 01:08:26,520
Let's just topic with this life.

881
01:08:26,520 --> 01:08:30,520
I haven't talked about the definition of for kisses yet. I'm going to do that right now.

882
01:08:30,520 --> 01:08:33,520
Okay.

883
01:08:33,520 --> 01:08:44,520
So we're talking about for consistency.

884
01:08:44,520 --> 01:08:51,520
So, so what we've seen right so far is that the server cannot really manipulate the law.

885
01:08:51,520 --> 01:08:54,520
It can only sort of send prefixes or it can hide parts.

886
01:08:54,520 --> 01:08:55,520
It can hide.

887
01:08:55,520 --> 01:08:58,520
It can send the prefix back to the client.

888
01:08:58,520 --> 01:09:06,520
And it can't really modify the law. So it just basically has an opportunity to do you know sort of show different logs to different clients.

889
01:09:06,520 --> 01:09:10,520
And that is basically what for consistency is.

890
01:09:10,520 --> 01:09:20,520
And so it cannot provide you know, so the kind of the server cannot provide the type of consistency stuff we've seen so far in the past, namely like linearizability and external consistency and things like that.

891
01:09:20,520 --> 01:09:21,520
That's just not possible.

892
01:09:21,520 --> 01:09:26,520
But it can provide us with what the paper calls are introduces is for consistency.

893
01:09:26,520 --> 01:09:30,520
And let me abstract a little bit away and explain what that is.

894
01:09:30,520 --> 01:09:35,520
So let's say we have you know client a we have the server s.

895
01:09:35,520 --> 01:09:39,520
And you know, it has a log.

896
01:09:39,520 --> 01:09:45,520
Let's say I'm just going to abstract everything away as entries a DC and D and eight.

897
01:09:45,520 --> 01:09:51,520
And you know, a you know, whatever maybe you know, kind of that entry to the log.

898
01:09:51,520 --> 01:09:56,520
And you know, and that's basically it.

899
01:09:56,520 --> 01:10:00,520
And you know, maybe we have another client B.

900
01:10:00,520 --> 01:10:08,520
And what the server can do is sort of give the other client a completely different view of the world.

901
01:10:08,520 --> 01:10:11,520
And basically have another copy of the law.

902
01:10:11,520 --> 01:10:17,520
Where it's own copy or give it the different copy of the log example, maybe that log contains direct at a.

903
01:10:17,520 --> 01:10:27,520
But then every operation of the dust, you know, goes into this log, you know, B1, B2, maybe even some operations from other clients that also get this view and of in this log.

904
01:10:27,520 --> 01:10:36,520
But they're not actually shown to a you know, a basically have you know, a made actually also add more entries to the log maybe it had BCD and E.

905
01:10:36,520 --> 01:10:39,520
And those are not actually shown to be.

906
01:10:39,520 --> 01:10:47,520
And so these two logs to the world view of a, you know, looks completely consistent because it's unaware of any of these changes.

907
01:10:47,520 --> 01:10:54,520
And to be, you know, this log looks completely consistent because they're really aware of any A changes, right?

908
01:10:54,520 --> 01:11:08,520
And in this model of the world, the only sure shared communication place that is there is the server, you know, that is sort of the, you know, the thing that you're of shows, you know, what actually is the state of the system.

909
01:11:08,520 --> 01:11:17,520
And one way you can think about it is like in terms that we've talked about before, it's sort of like a split brain.

910
01:11:17,520 --> 01:11:29,520
So, you know, we, you know, A gets the C1 view of the world, you know, cooked up by by a log that's consistent with a view and you know, B, you know, it gets another view of the world.

911
01:11:29,520 --> 01:11:33,520
And basically the server is just keeps them sort of carefully separate.

912
01:11:33,520 --> 01:11:40,520
And then for a can pretend that, you know, A is looking one, you know, she's left looking inside of its brain, B.

913
01:11:40,520 --> 01:11:43,520
He's actually the right sign of S is great.

914
01:11:43,520 --> 01:11:45,520
Okay.

915
01:11:45,520 --> 01:11:49,520
What's that makes sense?

916
01:11:49,520 --> 01:12:02,520
So that's sort of what you know, basically they're saying is like, you know, we can't really do better than for consistency because it's always possible for the server to, to basically copy of the log.

917
01:12:02,520 --> 01:12:07,520
And then from then on, you know, present different views to these clients.

918
01:12:07,520 --> 01:12:14,520
Now, S could not merge the two logs again, correct? You know, these logs have to be separate for, you know, for A and B.

919
01:12:14,520 --> 01:12:20,520
Because it can be, it's impossible for S to sort of take, you know, the logs, you know, let them grow for a while.

920
01:12:20,520 --> 01:12:23,520
And then basically splice these two logs together again.

921
01:12:23,520 --> 01:12:31,520
Because, you know, the, because these entries, you know, protect all these preceding entries, the entries, protect all the preceding entries with those.

922
01:12:31,520 --> 01:12:34,520
And so you can't like put them back together.

923
01:12:34,520 --> 01:12:41,520
And because the second you wouldn't check out because the second years, always cover the current entry, for all the preceding entries.

924
01:12:41,520 --> 01:12:51,520
And so the only thing that they are basically doing at the server can do is basically split the world for the world into different, into two different logs.

925
01:12:51,520 --> 01:13:01,520
And then the common log in the beginning, then the server forks them. And now that, you know, A and B basically operate in different worlds.

926
01:13:01,520 --> 01:13:09,520
And so that's sort of the definition of fork consistency. And that's basically the best, you know, this particular file system, this, this particular system can do.

927
01:13:09,520 --> 01:13:15,520
If there's the only communication actually happens between S.

928
01:13:15,520 --> 01:13:22,520
And the code is actually, by the way, that's sort of fork consistency is good enough for our particular applications you keep it correct.

929
01:13:22,520 --> 01:13:29,520
Because either the server shows the old version, you know, without A and B.

930
01:13:29,520 --> 01:13:38,520
Or, you know, the server shows the S, you know, the modification with A and B.

931
01:13:38,520 --> 01:13:44,520
And you do, you know, it seems like you know, maybe this is actually a problem. You know, how do you detect forks?

932
01:13:44,520 --> 01:13:52,520
And how could you.

933
01:13:52,520 --> 01:13:57,520
So how do you do tech forks? Well, there should have two schemes that the sort of paper mentions.

934
01:13:57,520 --> 01:14:10,520
One is out of band communication.

935
01:14:10,520 --> 01:14:12,520
And this is pretty straightforward.

936
01:14:12,520 --> 01:14:16,520
If you know, at A and B ever talk to each other.

937
01:14:16,520 --> 01:14:22,520
And for example, ask each other, hey, what if you're last entering the log and they get different answers.

938
01:14:22,520 --> 01:14:25,520
They know, you know, that they have been forked.

939
01:14:25,520 --> 01:14:32,520
And because either they, you know, they could have different answers, but like at least one should be the prefix of the other.

940
01:14:32,520 --> 01:14:40,520
And if that's not the case, then they know that they're actually being that people fork.

941
01:14:40,520 --> 01:14:52,520
So that's one possible scenario that they're discussing the paper is basically share, you know, the client's periodically exchanged the last log entries.

942
01:14:52,520 --> 01:14:54,520
The last entry in their log.

943
01:14:54,520 --> 01:15:03,520
Another solution, which I can use mentioned in the chat is, you know, introduce what they call sort of trusted machine.

944
01:15:03,520 --> 01:15:08,520
And that is a timestamp box.

945
01:15:08,520 --> 01:15:17,520
And basically like every, you know, few seconds, you know, it actually ends at some timestamp to the log.

946
01:15:17,520 --> 01:15:24,520
And every client knows that that, you know, basically, maybe it's a file in the file system that just contains, you know, the current time.

947
01:15:24,520 --> 01:15:35,520
The timestamp box, you know, every couple seconds, time stamp box updates that file, the clients read that file and they know there should be a new modification like every couple seconds.

948
01:15:35,520 --> 01:15:45,520
And that basically, you know, that that fork that contains the timestamp box is sort of the fork that the clients.

949
01:15:45,520 --> 01:15:52,520
The server actually has to present to the clients.

950
01:15:53,520 --> 01:15:56,520
So that's the two things that actually the paper discusses.

951
01:15:56,520 --> 01:16:06,520
And what's sort of interesting and we'll see on Tuesday is that this, you know, this whole fork detection and fork resolution approach is sort of a key problem basically in Bitcoin.

952
01:16:06,520 --> 01:16:15,520
And we, when we're talking Tuesday about Bitcoin, you know, we see a way basically to settle on a fork.

953
01:16:15,520 --> 01:16:28,520
So even if the file system or the server, the, the, the, the Byzantine servers actually have created a forks, you know, Bitcoin basically has a way of deciding, well, we're going to use the consensus on like which fork we're going to actually proceed with.

954
01:16:29,520 --> 01:16:38,520
So we'll live that up until Tuesday, but here sort of a connection between, you know, some there and actually a bit point.

955
01:16:40,520 --> 01:16:42,520
Any questions about this.

956
01:16:46,520 --> 01:16:49,520
Okay.

957
01:16:49,520 --> 01:16:50,520
Okay.

958
01:16:50,520 --> 01:16:51,520
Okay.

959
01:16:51,520 --> 01:16:59,520
I don't want to talk very quickly because I answer three minutes left about about the other.

960
01:16:59,520 --> 01:17:05,520
So the key thing I get to get at the paper is this actually this lock, conceptual view of the world.

961
01:17:05,520 --> 01:17:11,520
Of course, you know, it didn't practicalize and mentioned earlier. And so some direction has a proposal for how to do better.

962
01:17:11,520 --> 01:17:22,520
Even though like other systems like Bitcoin actually do maintain the whole lot. And so what does the somebody do to things better instead of actually maintaining a log, you know, that's actually a snapshots.

963
01:17:22,520 --> 01:17:34,520
Similar to sort of the snapshots that we've seen before, you know, in raft, you know, where we construct a part of the world based on the log, you know, we take a snapshot and that actually forms the current state.

964
01:17:34,520 --> 01:17:46,520
In fact, I'm really what the Sunder does. That actually doesn't really make literally take snapshots to really maintains a snapshot view of the files and does it per user.

965
01:17:46,520 --> 01:17:53,520
So one way to think about it is that the file system is sure started by user. Every user has its own view snapshots of the world.

966
01:17:53,520 --> 01:18:00,520
And you know, there's a little bit of a protocol to make sure that these different snapshots and different users are actually consistent.

967
01:18:00,520 --> 01:18:10,520
And like a let me talk a little bit about how actually some there actually has makes that snapshot.

968
01:18:10,520 --> 01:18:15,520
Basically in some there.

969
01:18:15,520 --> 01:18:23,520
And some there basically there's something that's called the user eye handle. And the user eye handle basically uniquely identifies a snapshot in the file system.

970
01:18:23,520 --> 01:18:39,520
And so basically it's a cryptographic hash of the high table, which includes all the I notes in the system. And you know, and for every I know there's a hash of the I note which basically covers all the data, all the blocks belong to that particular I note.

971
01:18:39,520 --> 01:18:47,520
For example, when say a modifies off the UI in my right one block.

972
01:18:47,520 --> 01:18:55,520
The client recomputes the hash of this block updates the entry here, you know, updates the entry here updates the entry here.

973
01:18:55,520 --> 01:19:02,520
And that's basically a new handle that describes basically that the capture actually on the complete in a file system.

974
01:19:02,520 --> 01:19:17,520
And then you ignore the group in the directory of block for an item for a second. So this basically gives you a complete checkpoint or snapshot of user to view of the file system.

975
01:19:17,520 --> 01:19:33,520
And then to deal with this issue of how to get some consistency across users. They have this notion of version factors.

976
01:19:33,520 --> 01:19:43,520
One of version factors is pretty straightforward. Every version vector has an eye handle like a's eye handle is in it after it modified.

977
01:19:43,520 --> 01:19:54,520
See off the UI. And then for every user in the system, the version vector has a counter for the number of modifications that were made by that user.

978
01:19:54,520 --> 01:20:09,520
So if a made this update to off the UI that counter set to one, you know, we didn't make any modifications, you know, seeing didn't make any modifications. They're all zero and this whole thing is signed.

979
01:20:09,520 --> 01:20:24,520
And so when B makes this modification. So I'll use the version factor for B is this a's version factor. So it's first B makes a version. It creates a new handle that includes, of course, all the modifications represent all the medications.

980
01:20:24,520 --> 01:20:44,520
And in its version handle that actually of a necessary factor, it includes which how many operations are read by a user. So it will record the fact that, for example, that it actually saw a spotification updates can abuse to be one can see to be zero and basically signs the this whole thing.

981
01:20:44,520 --> 01:21:01,520
And now see when seeing extra dust operation once the read you know off the PY and fetched and banged up the Y basically downloads all the version factors from every user.

982
01:21:01,520 --> 01:21:05,520
And in this case, we'll get the first effect is for a and B.

983
01:21:05,520 --> 01:21:19,520
Fixed the latest one, which in this case is B because actually it includes all the operations of a in it. And that's basically the represented version of the file system from that version that reached off that UI.

984
01:21:19,520 --> 01:21:24,520
And banked the Y.

985
01:21:24,520 --> 01:21:42,520
And note, you know that basically it's impossible for the server to basically present banged up the Y and not off the PY because you know it cannot, you know, it can only two sort of version factors can be returned is this version factor or this vector factor.

986
01:21:42,520 --> 01:21:47,520
A doesn't include actually the changes of bank B PY.

987
01:21:47,520 --> 01:21:59,520
If you know see actually does get the versions of bank B to Y and must actually have the versions the modification that A is made because the version factors are constructing it that way.

988
01:21:59,520 --> 01:22:11,520
And so that's basically the way for using version factors to detect that S doesn't drop changes as we as the same way that the logging system is done.

989
01:22:11,520 --> 01:22:16,520
Okay, so that's the essence of the version vector plan.

990
01:22:16,520 --> 01:22:22,520
So in summary.

991
01:22:22,520 --> 01:22:33,520
Okay, this and then participants, you know, I sort of a problem that you have to handle in decentralized systems.

992
01:22:33,520 --> 01:22:40,520
Because there's no single institution that sort of can be the sort of trust.

993
01:22:40,520 --> 01:22:49,520
And we've seen this notion of sign logs is a very powerful tool to deal with malicious servers.

994
01:22:49,520 --> 01:23:02,520
And as I said on Tuesday, we're going to continue this discussion and you'll see how the sort of design wags are used in Bitcoin and particular like how fork consistency or how.

995
01:23:02,520 --> 01:23:08,520
The fact that for sure sort of being created or being resolved in the case of Bitcoin.

996
01:23:08,520 --> 01:23:13,520
Okay, so that was it for as an introduction to sort of decentralized systems.

997
01:23:13,520 --> 01:23:23,520
And I hope the paper is a little bit more understandable than maybe when before you start reading it earlier this week or today.

998
01:23:23,520 --> 01:23:26,520
Okay, so you on Tuesday.

999
01:23:26,520 --> 01:23:31,520
And of course, there's questions, you know, peacefully, you feel free to hang around.

1000
01:23:31,520 --> 01:23:36,520
If you need to go somewhere else, absolutely go somewhere else.

1001
01:23:36,520 --> 01:23:42,520
I have a question about the data structure that they use the B plus tree or whatever.

1002
01:23:42,520 --> 01:23:45,520
Like what's the difference in that and like.

1003
01:23:45,520 --> 01:23:50,520
Yeah, like like a Merkel dad, for example, it's a Merkel data structure.

1004
01:23:50,520 --> 01:23:55,520
You know, I think the person who is the sort of credit of his ideas, Merkel.

1005
01:23:55,520 --> 01:24:00,520
And those wives often called the Merkel data tree.

1006
01:24:00,520 --> 01:24:03,520
So this is the same thing.

1007
01:24:03,520 --> 01:24:04,520
Yeah.

1008
01:24:04,520 --> 01:24:12,520
Okay. So in the basement uses a Merkel tree.

1009
01:24:12,520 --> 01:24:21,520
So when you are verifying the signatures, doesn't mean you have to like.

1010
01:24:21,520 --> 01:24:28,520
Basically, as you go, if you're 100 entries into the log, you have to compute.

1011
01:24:28,520 --> 01:24:34,520
I don't know the hash of only 100 entries concatenated and then compute.

1012
01:24:34,520 --> 01:24:35,520
And.

1013
01:24:35,520 --> 01:24:37,520
So you need to keep the running hash.

1014
01:24:37,520 --> 01:24:41,520
Okay, let's go back to verify.

1015
01:24:41,520 --> 01:24:43,520
That's.

1016
01:24:43,520 --> 01:24:46,520
That's to do.

1017
01:24:46,520 --> 01:24:49,520
So here's probably a good place to talk about it.

1018
01:24:49,520 --> 01:24:51,520
So.

1019
01:24:51,520 --> 01:24:53,520
So here.

1020
01:24:53,520 --> 01:24:58,520
So let's say, let's take the last entry, correct.

1021
01:24:58,520 --> 01:25:03,520
The last entry you will have a hash of the preceding entries.

1022
01:25:03,520 --> 01:25:06,520
And so everything, you know, from the micro, whatever records.

1023
01:25:06,520 --> 01:25:11,520
Let's say this is zero one and two, you know, zero one and two.

1024
01:25:11,520 --> 01:25:17,520
We're basically has the hash of the previous entry number two.

1025
01:25:17,520 --> 01:25:22,520
In it and that needs to be checked.

1026
01:25:22,520 --> 01:25:25,520
And the way.

1027
01:25:25,520 --> 01:25:30,520
Now this being checked is the, you know, in principle, if you start really from the beginning of the world,

1028
01:25:30,520 --> 01:25:33,520
you would have to compute the hash of record zero.

1029
01:25:33,520 --> 01:25:35,520
You find out what the hash is.

1030
01:25:35,520 --> 01:25:38,520
And double check, you know, that.

1031
01:25:38,520 --> 01:25:43,520
That corresponds to the entry that's in here and that the signature is out.

1032
01:25:43,520 --> 01:25:45,520
And so, et cetera, et cetera.

1033
01:25:45,520 --> 01:25:48,520
Now, of course, you know, in the real system, you can remember,

1034
01:25:48,520 --> 01:25:49,520
motion of the log.

1035
01:25:49,520 --> 01:25:56,520
And just double check that, like, whatever the, and start from there.

1036
01:25:56,520 --> 01:25:58,520
Oh, it's, it's inefficient.

1037
01:25:58,520 --> 01:26:01,520
So, you know, it's not a problem.

1038
01:26:01,520 --> 01:26:04,520
Yeah, you have to replay from the beginning of time.

1039
01:26:04,520 --> 01:26:08,520
You're basically an off, you know, really validate the whole lock from the beginning of time.

1040
01:26:08,520 --> 01:26:09,520
Thank you.

1041
01:26:09,520 --> 01:26:10,520
Emixence.

1042
01:26:10,520 --> 01:26:12,520
Yeah, you'll see this in the Bitcoin paper.

1043
01:26:12,520 --> 01:26:16,520
So are the hash is like almost like a Merkel chain.

1044
01:26:16,520 --> 01:26:17,520
Like this.

1045
01:26:17,520 --> 01:26:18,520
Okay.

1046
01:26:18,520 --> 01:26:19,520
Yeah.

1047
01:26:19,520 --> 01:26:20,520
Same idea.

1048
01:26:20,520 --> 01:26:23,520
So are the,

1049
01:26:23,520 --> 01:26:32,520
like, if, or is this like leaf in the sort of tree or chain, like an entire file or like blocks of a file.

1050
01:26:32,520 --> 01:26:34,520
This is a block, one block.

1051
01:26:34,520 --> 01:26:43,520
So this is four five from 96 bytes.

1052
01:26:43,520 --> 01:26:45,520
And all the other has to don't change.

1053
01:26:45,520 --> 01:26:48,520
So it's actually not that efficient in the fiction.

1054
01:26:48,520 --> 01:26:51,520
Yeah, because if you only change part of the file, it only rehashes that part.

1055
01:26:51,520 --> 01:26:56,520
You just have to rehash that one. And then you have to re re re compute to hash up the tree.

1056
01:26:56,520 --> 01:27:02,520
All the way to the users eye handle.

1057
01:27:02,520 --> 01:27:06,520
And the paper talks about the sort of a couple of optimization to make this more efficient.

1058
01:27:06,520 --> 01:27:18,520
What hashing is up in generally not that expensive. The signing is the more expensive part operation.

1059
01:27:18,520 --> 01:27:20,520
I had a question about version vectors.

1060
01:27:20,520 --> 01:27:21,520
Yeah.

1061
01:27:21,520 --> 01:27:25,520
So we use version vectors to make sure that the system can't return like an old state.

1062
01:27:25,520 --> 01:27:26,520
Yes.

1063
01:27:26,520 --> 01:27:31,520
Why can't the, why can't the system just return the old state and the old version vector if it keeps like a second copy.

1064
01:27:31,520 --> 01:27:33,520
Yeah, it's good for.

1065
01:27:33,520 --> 01:27:34,520
Right.

1066
01:27:34,520 --> 01:27:37,520
So so we, so we only have four consistency then with the, yeah.

1067
01:27:37,520 --> 01:27:39,520
I have a version of vectors only for consistency.

1068
01:27:39,520 --> 01:27:40,520
Some there for consistency.

1069
01:27:40,520 --> 01:27:41,520
No more.

1070
01:27:41,520 --> 01:27:47,520
Got it.

1071
01:27:47,520 --> 01:27:50,520
So the consistency you need the time stamp.

1072
01:27:50,520 --> 01:28:00,520
Before consistency. I mean, you know, the, uh, the server can fork the log at any particular point of time.

1073
01:28:00,520 --> 01:28:09,520
I mean, present the consistent view of the one big can merge logs back together.

1074
01:28:09,520 --> 01:28:16,520
Really this picture that the server can actually construct into different views of the world and split.

1075
01:28:16,520 --> 01:28:18,520
You know, the world in multiple worlds.

1076
01:28:18,520 --> 01:28:22,520
Uh, but it can merge the worlds back together.

1077
01:28:22,520 --> 01:28:24,520
Undetected.

1078
01:28:24,520 --> 01:28:28,520
So.

1079
01:28:28,520 --> 01:28:34,520
The best we can do is fork consistency, which allows for forking, but we can detect forking.

1080
01:28:34,520 --> 01:28:35,520
Yeah.

1081
01:28:35,520 --> 01:28:37,520
So if we detect forking.

1082
01:28:37,520 --> 01:28:40,520
Can we then get something stronger than for consistency?

1083
01:28:40,520 --> 01:28:41,520
Well, yeah.

1084
01:28:41,520 --> 01:28:43,520
Well, we can settle on a fork.

1085
01:28:43,520 --> 01:28:45,520
We're going to have forks.

1086
01:28:45,520 --> 01:28:49,520
We can try to settle like pick one fork as the one to go for it with.

1087
01:28:49,520 --> 01:28:51,520
Okay.

1088
01:28:51,520 --> 01:28:54,520
But thunder doesn't have a way to do that.

1089
01:28:54,520 --> 01:28:55,520
Nope.

1090
01:28:55,520 --> 01:28:57,520
Okay.

1091
01:28:57,520 --> 01:29:00,520
So under this.

1092
01:29:00,520 --> 01:29:03,520
I mean, some, some, some, some methods.

1093
01:29:03,520 --> 01:29:04,520
No.

1094
01:29:04,520 --> 01:29:12,520
Methods to detect and basically you get a one, basically, proposions like you use the time stamp box to use that one.

1095
01:29:12,520 --> 01:29:18,520
So.

1096
01:29:18,520 --> 01:29:20,520
Thanks.

1097
01:29:20,520 --> 01:29:22,520
You're welcome.

1098
01:29:22,520 --> 01:29:26,520
The time some, the time stamp box is just a server that depends entries and.

1099
01:29:26,520 --> 01:29:28,520
Yeah, and it's trusted.

1100
01:29:28,520 --> 01:29:35,520
So it's not under control of the adversary.

1101
01:29:35,520 --> 01:29:38,520
Thank you.

1102
01:29:38,520 --> 01:29:44,520
So, can I also ask one final question about the devian example you said in the beginning.

1103
01:29:44,520 --> 01:29:47,520
Can you say again, what happened there?

1104
01:29:47,520 --> 01:29:49,520
Yeah, sure.

1105
01:29:49,520 --> 01:29:58,520
So basically the, this is the source repo or the development machines for devian Linux in 2003.

1106
01:29:58,520 --> 01:30:05,520
Attack of compromised broke into those machines and modified files.

1107
01:30:05,520 --> 01:30:12,520
And this is the distribution that has been sort of handed off, you know, which, you know, if you run devian Linux, you're, you're.

1108
01:30:12,520 --> 01:30:18,520
Anybody who got it like the devian limbs after you tacked and I got maybe a compromised devian Linux.

1109
01:30:18,520 --> 01:30:23,520
And so when they soon as they discovered this, they didn't do any further development.

1110
01:30:23,520 --> 01:30:31,520
And they were further distributions, they sorted out like, you know, went to backups and I started comparing files from backups with the files that they have.

1111
01:30:31,520 --> 01:30:38,520
And you know, basically double check that all the changes that were in the repo are actually reading a legit.

1112
01:30:38,520 --> 01:30:43,520
Okay, roll back and roll back any changes are not legit.

1113
01:30:43,520 --> 01:30:45,520
That is a freeback.

1114
01:30:45,520 --> 01:30:46,520
Yeah, it's pretty bad.

1115
01:30:46,520 --> 01:30:50,520
Just occasionally happens. This is a real problem.

1116
01:30:50,520 --> 01:30:52,520
That's a real problem in practice.

1117
01:30:52,520 --> 01:30:56,520
Thank you so much. That was a very interesting lecture. Thank you.

1118
01:30:56,520 --> 01:30:58,520
Thank you.

1119
01:31:01,520 --> 01:31:03,520
Thank you.

