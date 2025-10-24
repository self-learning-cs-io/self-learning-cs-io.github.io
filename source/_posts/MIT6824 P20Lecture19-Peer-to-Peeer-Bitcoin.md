---
title: MIT6824 P20Lecture19 Peer To Peeer Bitcoin
---

1
00:00:00,000 --> 00:00:12,780
Okay, good afternoon. Good morning. Good night. Let's get started. Today I want to talk about

2
00:00:12,780 --> 00:00:20,780
Bitcoin. The reason I want to talk about it is it solves a heart problem, namely achieving

3
00:00:20,780 --> 00:00:44,299
consensus with Byzantine participants. And it solves it. So the Byzantine and the

4
00:00:44,299 --> 00:00:51,099
Byzantine participants might be malicious or adversarial. And it solves this problem in the

5
00:00:51,099 --> 00:00:58,539
context of completely open systems. People can join and leave the system and will. And some

6
00:00:58,539 --> 00:01:06,700
of them may be malicious and yet achieve consensus on the order in which transaction happens.

7
00:01:06,700 --> 00:01:12,939
So those are actually in a very challenging context, we're actually really doing it with money involved.

8
00:01:15,100 --> 00:01:23,099
The design looks a little bit like it has aspects of Sunder. Since there's a sidewalk

9
00:01:25,260 --> 00:01:31,579
of operations, in these cases, transactions. But unlike in Sunder, that actually can handle

10
00:01:31,579 --> 00:01:44,459
forks. So most of the many aspects are interesting to talk about the respect of Bitcoin. But

11
00:01:44,459 --> 00:01:49,180
mostly I'm going to focus on sort of the sort of the distributed systems aspect of this particular

12
00:01:49,180 --> 00:01:58,620
paper. This paper is a bit unusual or quite unusual. First of all, this is not a paper out of the

13
00:01:58,620 --> 00:02:03,660
sort of scientific literature that I've been reading so far. It comes out of a different part of

14
00:02:03,660 --> 00:02:19,500
the world. It is pseudo-anonymous. And it has a particularly gripe with financial institutions.

15
00:02:20,620 --> 00:02:27,340
And you can have a lot of opinions about where Bitcoin in general and cryptocurrencies in general.

16
00:02:28,140 --> 00:02:32,939
But from the perspective of the system, this is a YouTube-stressful system. This is really

17
00:02:32,939 --> 00:02:39,740
truly an open system that can tolerate the business participants in achieved consensus.

18
00:02:39,740 --> 00:02:44,300
And so really, the focus on this lecture is trying to understand how actually you choose that

19
00:02:44,300 --> 00:02:52,219
particular aspect. Any questions? Just to you for a dive in.

20
00:02:57,659 --> 00:03:09,659
Okay, so, as I mentioned, the context is here, the financial transactions. And so there's

21
00:03:09,659 --> 00:03:16,620
a free, overriding of concerns. When transactions are involved, or money transactions are involved,

22
00:03:16,620 --> 00:03:20,140
first of all, of course, there's a concern of outright forgery.

23
00:03:20,219 --> 00:03:33,339
Where basically, people cook up transactions out of finair and enter them in the log and try to

24
00:03:33,339 --> 00:03:40,060
do mislead other participants that actually are spending their own money while spending somebody

25
00:03:40,060 --> 00:03:45,099
else's money. And this problem is reasonable straightforward for us all, and in a very similar

26
00:03:45,180 --> 00:03:52,699
style to Sunder. But basically, citing operations, make it hard to actually forge.

27
00:03:52,699 --> 00:03:56,699
And in fact, in general, setting the year for it is the same as in Sunder, well,

28
00:03:56,699 --> 00:04:02,060
you know, the Byzantine participants are very, very, very powerful. We're going to be assuming that

29
00:04:02,060 --> 00:04:09,259
the crypto systems actually work and cannot become compromised. And so a lot of the core functionality,

30
00:04:10,539 --> 00:04:14,539
or the basis of which, we might conclude that actually things are our superior are all going to come

31
00:04:15,340 --> 00:04:18,860
down to the fact that the underlying cryptography is correct.

32
00:04:20,779 --> 00:04:25,740
So that's one challenge. The second challenge, which is the one that the paper spends most,

33
00:04:25,740 --> 00:04:28,139
it's time talking about, is double spending.

34
00:04:33,740 --> 00:04:38,219
So you literally have some good bitcoins that you accumulated,

35
00:04:38,700 --> 00:04:46,860
and Byzantium participants are going to try to spend twice that same bitcoin. And of course,

36
00:04:46,860 --> 00:04:51,900
we want to avoid that particular problem, that they don't idea. And the main idea is we'll see

37
00:04:51,900 --> 00:04:59,020
is there's a public ledger or a public log of all the transactions, so you can see if the

38
00:04:59,020 --> 00:05:04,060
transaction actually without money was already spending early transaction. And really trying to

39
00:05:04,060 --> 00:05:09,339
achieve consensus on what is actually in the log is the heart of the paper.

40
00:05:10,620 --> 00:05:16,220
Then of course, in addition to these two, there should be obvious other problem,

41
00:05:16,220 --> 00:05:19,340
which the paper doesn't really talk much about, and we're also not going to talk much about,

42
00:05:19,980 --> 00:05:26,379
which is just theft. Where somebody actually steals somebody else's private key,

43
00:05:26,379 --> 00:05:31,740
and therefore they can spend money or bitcoins using that particular private key. And it turns

44
00:05:31,740 --> 00:05:38,860
out to be in practice a serious problem. People store their wallets with their signing keys,

45
00:05:39,900 --> 00:05:46,220
computers can be broken into, and therefore people can break over to steal somebody else's money.

46
00:05:47,740 --> 00:05:52,939
And I think a serious problem in practice. I'm not going to be spending much time talking about

47
00:05:52,939 --> 00:05:56,060
in fact, and again, I would want to focus on the distributed systems aspects.

48
00:05:56,220 --> 00:06:00,459
Any questions about the challenges?

49
00:06:06,459 --> 00:06:10,060
Okay, now let's look at the transaction then. What's actually in it?

50
00:06:11,579 --> 00:06:13,500
So this is basically what is in the ledger.

51
00:06:13,500 --> 00:06:28,300
I think the simplify is greatly, because in some of the detailed actions, it doesn't really matter

52
00:06:28,300 --> 00:06:32,620
to the discussion that we're going to have. And the first order you can just think about it is

53
00:06:32,939 --> 00:06:38,220
every transaction is a record, and the record has a public key

54
00:06:43,819 --> 00:06:49,660
of the user for which the money is intended. So this is the destination.

55
00:06:51,740 --> 00:06:59,420
The hash of the previous transaction for this particular Bitcoin.

56
00:07:00,220 --> 00:07:06,540
And a signature, and we have the private key.

57
00:07:11,180 --> 00:07:17,340
You too, you know, we're basically the preview owner of that particular Bitcoin.

58
00:07:19,340 --> 00:07:23,259
And that's sort of you can think about this as the source. So basically, you too is making,

59
00:07:23,980 --> 00:07:29,180
granting Bitcoin, or transferring Bitcoins from you to what? So that you want to

60
00:07:29,180 --> 00:07:34,379
and that can spend it. Of course, there's no other stuff in it like there's no mount in it,

61
00:07:34,379 --> 00:07:40,779
and it's a fractional amount. There are many destinations and many sources possible, many inns and out.

62
00:07:43,259 --> 00:07:49,019
The reasons are basically all ignored and just focus on the simplified description.

63
00:07:49,019 --> 00:07:54,219
Turns out that the injections are coded also, not sort of like passive records, but

64
00:07:54,859 --> 00:08:00,620
basically in a little scripting language, and also going to ignore all those aspects.

65
00:08:02,379 --> 00:08:06,219
And this technique I want to focus on this thing, and you know, talk a little bit, show a little

66
00:08:06,219 --> 00:08:11,180
example, so that we give a little bit of a handle of actually what we're looking at in terms of the

67
00:08:11,180 --> 00:08:19,819
challenge. So let's sort of look at an example ledger and sort of try to understand actually,

68
00:08:19,819 --> 00:08:25,980
what it means to be a Bitcoin or what a coin is, because it's not like, you know, it's sort of a

69
00:08:25,980 --> 00:08:31,899
single thing that really comes down to it's actually sort of a, the shall one of the last transaction

70
00:08:31,899 --> 00:08:40,620
that is sort of what a coin is. So let's say, you know, why owns a coin and received from X.

71
00:08:41,340 --> 00:08:44,459
And so that means that there's somewhere in the ledger, there's sort of some sort of

72
00:08:44,459 --> 00:08:50,779
example of transactions that transfer the money or the coin or parts of the coin to Y.

73
00:08:50,779 --> 00:08:56,220
And so let's see, like somewhere maybe there's an entry in the ledger somewhere in some

74
00:08:56,220 --> 00:09:06,940
period of time where X actually received some bitcoins. And then, you know, this sort of

75
00:09:06,940 --> 00:09:15,019
grancer that has given it to Y. So there's another transaction in the ledger that basically

76
00:09:15,019 --> 00:09:23,340
records that fact. And so that might have the key of Y, destination, the hash of the transaction

77
00:09:23,340 --> 00:09:31,980
six. And so that uniquely identifies a shorthand handle for X and uniquely identifying transaction six.

78
00:09:31,980 --> 00:09:35,660
And so we have the ledger or record that we think is transaction six. And then we can

79
00:09:35,660 --> 00:09:40,540
re-pupute the hash of that transaction compared to the one that stored into section seven. And

80
00:09:40,540 --> 00:09:45,899
we're truly determined that basically, ah, transaction six, what's the source, you know, for this

81
00:09:45,899 --> 00:09:51,259
transaction seven. And we're based the previous transaction, what's transaction six for this particular

82
00:09:51,259 --> 00:10:03,259
coin. And it's assigned by X. Now, so this is sort of a situation where Y obtained, you know,

83
00:10:03,259 --> 00:10:08,939
basically, you know, some bitcoins, you know, for X. And now, Y wants to spend, I spent, for

84
00:10:08,939 --> 00:10:15,100
example, maybe Y wants to buy a latte, you know, from Z. And so it's going to transfer some money

85
00:10:15,740 --> 00:10:22,139
to Z. So maybe we'll see another transaction in the ledger, which is going to be a perform.

86
00:10:22,139 --> 00:10:24,139
You know, this is one that actually Y is going to add.

87
00:10:30,540 --> 00:10:40,540
Z hash of the, you know, previous coin, which is the last injection for that coin. So that's T seven.

88
00:10:40,539 --> 00:10:49,099
And it's assigned by Y. And basically, you know, C wants to, before you can see actually,

89
00:10:49,099 --> 00:10:53,819
hands over the latte to Y. You know, C, you need to do some verification to make sure that

90
00:10:53,819 --> 00:11:01,179
there's actually is a legit, you know, transaction. So, you know, we'll look up, you know, transaction seven.

91
00:11:02,699 --> 00:11:06,779
And, you know, compute, you know, the hash of it, you know, double check that the hash, actually

92
00:11:06,779 --> 00:11:13,819
corresponds to the one that actually is listed in transaction, in transaction eight. If, you know,

93
00:11:13,819 --> 00:11:18,299
the hash, you know, checks out, so it's transaction seven is indeed, you know, we believe that the

94
00:11:18,299 --> 00:11:24,699
one that actually turns out to be actually refers to, you know, Z looks up the the public key in

95
00:11:25,419 --> 00:11:32,299
transaction seven for Y, which usually is the public Y, then, you know, verifies that do that

96
00:11:32,299 --> 00:11:36,939
public key to verify the signature, you know, of this transaction and the signature of course,

97
00:11:36,939 --> 00:11:41,500
you know, publish, you know, the whole transaction. And if the signature checks out, you know, then,

98
00:11:42,620 --> 00:11:48,379
you know, Z can be sort of confident, you know, that actually the ledger, you know, contains

99
00:11:48,379 --> 00:11:53,979
and transaction that basically transfers, you know, some of the money from Y to Z. And so at this

100
00:11:53,980 --> 00:12:03,740
point, you know, the verification, you know, Z verifies and it's okay, you know, whatever,

101
00:12:03,740 --> 00:12:15,980
ship the latte, and not, you know, reject. And again, like before, you know, the Sunder and

102
00:12:15,980 --> 00:12:22,460
the Nuldu sort of schemes, you know, we're lying here in the fact that basically Y, you know,

103
00:12:22,460 --> 00:12:35,259
it's careful with its private key. So, you know, we have to assume that Y didn't disclose

104
00:12:36,940 --> 00:12:46,860
in any way its private key. Because if anybody, I was going to have this private key, then basically anybody

105
00:12:46,860 --> 00:12:51,420
could come up with a signature and, you know, is able to spend basically Y's money.

106
00:12:53,420 --> 00:12:55,900
Although maybe from the perspective of Z, you don't really care.

107
00:12:57,900 --> 00:13:08,220
Okay, so that's sort of the basic plan in terms of, you know, having a record. And then, you know,

108
00:13:08,220 --> 00:13:15,900
this is pretty good, right? I mean, the record of the transaction that happened, when C, you know,

109
00:13:15,900 --> 00:13:20,060
received some transaction that could check whether this is a valid transaction. And,

110
00:13:20,059 --> 00:13:25,259
that, you know, lots of the side where if you actually accept the money and deliver the goods.

111
00:13:26,619 --> 00:13:37,099
So, one key challenge, and now it's sort of left, you know, we sort of seen that outright forgery is

112
00:13:37,099 --> 00:13:44,699
difficult. But, you know, we need to think a little bit about the double spending. And so, the double

113
00:13:44,700 --> 00:13:49,100
spending problem is just follows. Let's say instead of, you know, creating two record and one record,

114
00:13:49,100 --> 00:13:58,860
as in this particular example in the transaction aid, Z actually integrates over a Y creates two records.

115
00:14:07,420 --> 00:14:12,940
One record is basically giving the one that we just saw, you know, our T8.

116
00:14:14,860 --> 00:14:17,259
Y2z with the hash of seven.

117
00:14:19,900 --> 00:14:26,780
And then let's assume that actually Y also tries to double spend its money. So, it creates a second

118
00:14:26,780 --> 00:14:31,980
transaction, you know, T8 prime, where, you know, the record is basically the same except,

119
00:14:31,980 --> 00:14:38,940
you know, the money, you know, maybe goes to Q. And that's the hash of T7. And of course, you know,

120
00:14:38,940 --> 00:14:42,060
signed by Y, you know, signed by Y.

121
00:14:47,340 --> 00:14:52,940
Now, you know, let's say, you know, both QZ are like a lot of these stores. If, you know,

122
00:14:54,220 --> 00:15:00,140
ZXF-T8, as it would because, you know, everything will check out, as we saw in the previous

123
00:15:00,140 --> 00:15:06,700
dislike. Then Z would actually ship a lot day to Y. When Q, not knowing anything, maybe about

124
00:15:06,700 --> 00:15:13,020
this other T8 transaction, sees this T8 transaction, you know, checks out. It's indeed the case that,

125
00:15:13,020 --> 00:15:18,620
you know, the money in T7 was transferred to Y. The thing is, you know, checked, you know, with the

126
00:15:18,620 --> 00:15:23,660
second year for Y, you know, it's developed. And it will say, oh, I got great, you know, all

127
00:15:23,660 --> 00:15:27,820
thank you for the money, all shipped you also a lot day. And now, so we're in this bad, you know,

128
00:15:27,820 --> 00:15:35,180
position where Y by double spending or succeeded in double spending and got two lot tips. And,

129
00:15:35,259 --> 00:15:40,059
just the problem that basically the paper image really focused on trying to solve.

130
00:15:44,620 --> 00:15:52,459
And the basic approach is sort of similar to what, you know, some of the reviews, you know,

131
00:15:52,459 --> 00:15:55,819
let's keep a complete lot of all transactions. Since the beginning of time.

132
00:15:55,980 --> 00:16:07,820
And, you know, the log contains all the transactions, including in the order.

133
00:16:13,020 --> 00:16:17,980
And so, you know, let's see, you know, so we, we sort of put the disinjections in, you know,

134
00:16:17,980 --> 00:16:25,100
whatever year we have, you know, T6, here we have T7. So if there's a public record that is

135
00:16:25,100 --> 00:16:29,420
ordered of all the transactions, you know, T8 or TA prime goes first, let's say TA goes first.

136
00:16:30,620 --> 00:16:38,779
And then TA prime goes in the log. And, you know, if this would happen, then, you know, no problem at

137
00:16:38,779 --> 00:16:45,899
all, right, because this was the rejection from Y to Z. This was the rejection from Y to Q.

138
00:16:47,180 --> 00:16:53,980
And, you know, basically when Q validates, you know, when Z to validate the injection,

139
00:16:53,980 --> 00:16:58,860
everything looks perfect as exactly as before, when Q validates the transaction, in addition to the

140
00:16:58,860 --> 00:17:04,140
checks, you know, which is looked at, it actually looks into log, you know, Q looks in log.

141
00:17:07,420 --> 00:17:10,140
Log to see if T7 basically always was already spent.

142
00:17:10,300 --> 00:17:27,180
And then, of course, it scans back in log, you know, runs into TY, T8, and you know, sees that the

143
00:17:27,180 --> 00:17:32,220
action the money has been spent. And so therefore, it will reject, you know, T8 prime.

144
00:17:32,940 --> 00:17:40,620
All right. So, so that's the basic plan. And so, basically, you know, we reduced this one problem,

145
00:17:40,620 --> 00:17:48,140
which is like, how do we actually ensure that all participants in the systems actually agree on

146
00:17:48,140 --> 00:17:53,900
this log. And, you know, all the transactions are in the same slot everywhere, and contain the same

147
00:17:53,900 --> 00:17:58,779
content, the same hash, the same signature, so that we can actually verify the transactions,

148
00:17:58,779 --> 00:18:03,019
you know, using the scheme that the, the, the, the sort of laid out on this slide.

149
00:18:03,819 --> 00:18:10,940
And so, this is where the sort of consensus problem comes in, and sometimes people refer to

150
00:18:10,940 --> 00:18:17,579
the solution here as the Nakamoto consensus protocol. Now, before diving into that protocol,

151
00:18:18,460 --> 00:18:24,619
want to sort of sketch out, you know, possible solutions that are not going to work,

152
00:18:25,339 --> 00:18:28,619
just to get a little bit of better sense, and by like, you know, what the challenges are,

153
00:18:28,619 --> 00:18:37,819
that, you know, this sort of Nakamoto consensus actually, salts. So, design one,

154
00:18:39,739 --> 00:18:45,099
there's not really design. It's more sort of an idea to sort of think about, and then reject.

155
00:18:46,459 --> 00:18:52,379
Design one, you know, maybe the easiest design is, let's assume we have a server S,

156
00:18:52,460 --> 00:19:00,460
and the server actually is just trusted. And then we have clients, you know, that, you know,

157
00:19:01,340 --> 00:19:03,580
submit transactions, whatever, T6,

158
00:19:08,780 --> 00:19:15,740
one, two, whatever, we do X, Y, Z, and they just submit, you know, these transactions through the,

159
00:19:16,700 --> 00:19:21,900
through the Strustless server, you know, if we, all the clients can trust the server,

160
00:19:21,900 --> 00:19:25,500
and the server can just produce a log, all right, we have all the transactions in it,

161
00:19:27,259 --> 00:19:29,980
and you know, order them appropriately, et cetera, et cetera.

162
00:19:31,819 --> 00:19:35,259
So, if we assume, you know, there's a trustless server, and then this problem is actually

163
00:19:35,259 --> 00:19:38,220
reasonable, and straightforward to solve, and you know, if that's the setting that we're in,

164
00:19:38,220 --> 00:19:43,019
then we're in great shape. You know, maybe we'll replicate the server using, you know,

165
00:19:43,099 --> 00:19:50,700
so, raft, and a type of protocol, and we have a full-time server, and you know, really the only

166
00:19:50,700 --> 00:19:55,019
downside, you know, to this particular process is that the clients can just not agree on a single

167
00:19:55,019 --> 00:20:00,379
trusted server. And so, you know, for example, in the case of Bitcoin, and where you want to do

168
00:20:00,379 --> 00:20:07,180
transactions, you know, maybe the, you know, the rest of the world will not trust the US government

169
00:20:07,259 --> 00:20:13,420
to actually, you know, implement the server correctly and produce a log, and in that case,

170
00:20:13,420 --> 00:20:19,180
you know, we have multiple different clients, which cannot agree on a trusted server,

171
00:20:19,180 --> 00:20:28,060
then this, this solution is just a server doesn't work. So, that's one solution. It's the easy one,

172
00:20:28,060 --> 00:20:32,860
but in the case of decentralized design, where the participants, and don't trust any central

173
00:20:32,859 --> 00:20:39,899
component, this is not a workable solution. So, now we consider, you know, using sort of the

174
00:20:39,899 --> 00:20:46,139
more thunder-like approach, modified just scheme slightly, and say, like, okay, good, we now actually

175
00:20:46,139 --> 00:20:51,179
have to deal with untrust the server. In fact, we were at a paper about it last week, and so,

176
00:20:51,899 --> 00:20:56,859
let's assume that this server's actually untrust it. And, you know, it basically, you know,

177
00:20:56,859 --> 00:21:01,819
played a Thunder game, the clients produce the logs, we eat the logs from the server,

178
00:21:01,819 --> 00:21:07,259
a penta-rockets to the, the clients of penta-rockets to the log, submit it back to the server.

179
00:21:07,259 --> 00:21:10,939
And so, the server's basically doing almost nothing else, and then so, we're laying logs,

180
00:21:10,939 --> 00:21:15,579
you know, between different clients. And, you know, we've seen in last week that that

181
00:21:15,579 --> 00:21:23,659
approach works really well, and you know, can be used, but, you know, it has one shortcoming,

182
00:21:23,659 --> 00:21:30,059
as we saw, namely, the server can present two different views of the world by basically

183
00:21:30,139 --> 00:21:36,059
forking the log. So, maybe the log has some prefix, you know, whatever, T1, T5, T5, T6, T6, T7,

184
00:21:36,059 --> 00:21:42,619
but, you know, it has, you know, T8 in this one, and it has another log, which indeed has T7,

185
00:21:44,779 --> 00:21:52,379
and T8 prime. And so, one fork, you know, we got our T8 on the other fork, we have T8 prime,

186
00:21:53,020 --> 00:22:02,300
and now, like, we became really resettled in one particular fork, and the server sort of

187
00:22:02,300 --> 00:22:06,380
persistently, you know, keeps the two worlds apart, so, like, so why is it in the, of a

188
00:22:06,380 --> 00:22:12,460
season one area of the world's accused another in the world? Why always gets the first sort of log,

189
00:22:12,460 --> 00:22:17,580
and the, and Zio always gets the second one log, or two, the other way around, then,

190
00:22:17,740 --> 00:22:22,619
you know, then they will pretend, they're going to get it, they're going to get it, there's no money

191
00:22:22,619 --> 00:22:31,179
earlier spent in T7, in this log, so, you know, T8, Q will actually accept, you know, T8 prime in this

192
00:22:31,179 --> 00:22:36,779
world, and here Z will accept, you know, T8, and so why is succeeded in actually double spend?

193
00:22:38,460 --> 00:22:45,980
And so, so this design doesn't work, for the particular problem at hand, we need some solution,

194
00:22:45,980 --> 00:22:50,700
and this is where the consensus comes in, we need some solution, basically, for the untrusted

195
00:22:50,700 --> 00:23:00,620
clients, to basically be able to settle on which, you know, fork they are. Okay, so, in, so let's

196
00:23:00,620 --> 00:23:04,620
sort of think a little bit about that, so, like, so think about it more, more decentralized design,

197
00:23:04,620 --> 00:23:07,980
where, you know, we're just going to replace the server with a network of computers.

198
00:23:09,019 --> 00:23:14,620
That's it, and this is there, and this goes there sort of to get the closer to the Bitcoin design,

199
00:23:14,619 --> 00:23:21,579
where there's indeed a network of, you know, peers that sort of all collaborate together,

200
00:23:21,579 --> 00:23:27,579
if you should provide, you know, this single log, although even some of the participants actually

201
00:23:27,579 --> 00:23:31,099
might have, you might make some, try to do something different. And so, basically, idea is that,

202
00:23:31,099 --> 00:23:36,299
you know, when a client actually, you know, have to create some transaction, you know,

203
00:23:36,299 --> 00:23:41,259
the intersection, actually, distributed across a network, you know, of peers.

204
00:23:41,420 --> 00:23:46,940
So, in fact, the client one might be appear in self, so the transaction is spread around.

205
00:23:50,700 --> 00:23:56,859
And, you know, everybody, you know, in a network actually maintains a log, and

206
00:23:56,859 --> 00:23:59,099
it depends, you know, the transaction to its log.

207
00:24:03,740 --> 00:24:08,700
And the problem that we sort of have left is, like, you know, how to agree on an order.

208
00:24:11,259 --> 00:24:25,019
And, you know, we actually have seen, you know, this kind of sort of systems before, like, in fact,

209
00:24:25,019 --> 00:24:29,339
in RAP, you know, we had multiple computers, and they were able to agree on an order, right?

210
00:24:29,339 --> 00:24:34,619
And the basic trick, you know, with your sort of basic insight is, you know, to basically compute,

211
00:24:34,619 --> 00:24:39,740
you know, some majority, and have majority of the nodes agree that in slot, you know, six is

212
00:24:39,740 --> 00:24:47,259
going to be transaction T8, and in slot seven is going to be T8 prime. And the,

213
00:24:48,940 --> 00:24:53,900
and that works great, correct? If we know exactly how many nodes there are in the system,

214
00:24:55,180 --> 00:25:00,700
we know there are five nodes in the system, the node, and the majority is free, and so if we

215
00:25:00,700 --> 00:25:05,180
receive a response from free, you know, participants, you know, we know we can commit to that,

216
00:25:05,180 --> 00:25:09,660
that's going to be a problem. And the problem here really here is that this is a decentralized system,

217
00:25:09,660 --> 00:25:17,820
that's completely open. The system knows what it may even, may leave and come in any particular

218
00:25:17,820 --> 00:25:22,299
point of time, and then I'm like, there is no list of all the participants in the system. So,

219
00:25:22,299 --> 00:25:26,779
there's also no, you know, clear what actually, what is a majority system like that.

220
00:25:31,180 --> 00:25:34,060
Because it's completely open, and so it's like in the notion of a majority,

221
00:25:34,059 --> 00:25:39,980
it's completely able to find. So, you know, we need some sort of sort of like our sort of

222
00:25:39,980 --> 00:25:46,379
usual game of sort of doing voting on a majority, and then accept the result of the majority,

223
00:25:46,379 --> 00:25:51,419
is not going to sort of play out. And so this sort of the game, this sort of raft, you know,

224
00:25:51,419 --> 00:25:54,779
even though it's a consensus protocol, it's not going to really work out because, you know,

225
00:25:55,819 --> 00:26:01,019
the setting order we're dealing with is a decentralized open distributed system, as opposed to

226
00:26:01,019 --> 00:26:09,099
a closed system, as in the setting of raft. Does this make sense so far?

227
00:26:10,779 --> 00:26:13,740
Let me pause for a second before getting into the more technical part.

228
00:26:20,940 --> 00:26:21,259
All right.

229
00:26:26,059 --> 00:26:29,819
Okay, so how this Bitcoin solved this problem?

230
00:26:31,339 --> 00:26:38,619
And the key idea is something that's called proof of work.

231
00:26:45,819 --> 00:26:56,139
Basically, the rule is that there's a minor work, a note means you do to actually be able to

232
00:26:56,140 --> 00:27:07,100
extend the log. And the base rule is that the winner in proof of work,

233
00:27:08,700 --> 00:27:15,580
the machine that's able to solve the puzzle first, this decides on the next log entry.

234
00:27:15,579 --> 00:27:32,059
And the basic idea that this might actually get, so the integration of why this actually will work out,

235
00:27:32,059 --> 00:27:34,699
is because it's basically hard to impersonate the winner.

236
00:27:34,700 --> 00:27:51,580
To actually solve the particular proof of work puzzle that needs to be able to add to the log,

237
00:27:51,580 --> 00:27:59,980
actually requires a real computer, a month, get roughly a computer time to actually solve the problem.

238
00:27:59,980 --> 00:28:03,819
And so if you can solve and demonstrate yourself the problem, you know, you know, for sure that

239
00:28:03,819 --> 00:28:09,180
somebody actually spend a month of work actually doing it. And this is sort of enough of to

240
00:28:12,460 --> 00:28:20,539
convince the rest of the system that the real resources were actually spent to

241
00:28:21,740 --> 00:28:27,500
append to be able to append to the log entry. And you can maybe think of other types of schemes,

242
00:28:27,500 --> 00:28:32,299
like you know, whatever, unique IP addresses or things like that, but all those kind of things

243
00:28:32,299 --> 00:28:39,660
can be actually easily falsified. And so, and sort of proof of work idea is sort of your core

244
00:28:39,660 --> 00:28:48,619
to demonstrate that, yeah, actually really put a month effort into actually to figure out what

245
00:28:48,619 --> 00:28:53,579
the next door to compute be able to be able to append to the log entry to the log.

246
00:28:57,339 --> 00:29:01,979
One, you know, just to get that only me the other way, one downside of the sort of proof of work

247
00:29:01,979 --> 00:29:05,339
approach is that it actually can waste energy.

248
00:29:11,099 --> 00:29:16,699
And in fact, if your, you know, Bitcoin has become so successful that a lot of people are down,

249
00:29:16,700 --> 00:29:22,299
there are, you know, mining and doing this proof of work, the energy bill or the energy

250
00:29:22,299 --> 00:29:31,900
consumption of all the combined miners together is incredibly significant and huge. And so,

251
00:29:33,340 --> 00:29:40,779
fully downside of this approach is the waste of energy. In recent years, you know, there have

252
00:29:40,779 --> 00:29:47,180
been other crypto currencies or other designs that are based on a different idea. Instead of

253
00:29:47,180 --> 00:29:49,899
proof of work, they're actually based on some of that's called proof of stake.

254
00:29:56,859 --> 00:30:01,660
And this basically sort of the game there is that like, you know, let's say your own 3% of,

255
00:30:01,660 --> 00:30:10,139
you know, the currency, then you get the, because of your own 3%, you can actually decide, you know,

256
00:30:10,140 --> 00:30:16,220
for 3% of the log entry, you know, which ones are going to be dependent. And so, the,

257
00:30:17,180 --> 00:30:22,700
and so this is a completely different approach and that doesn't require solving computational

258
00:30:22,700 --> 00:30:31,340
intensive puzzles. And it seems to get quite a bit of actually attention and, you know, there are

259
00:30:31,340 --> 00:30:35,900
cryptocurrencies that use it. And in fact, it looks like one of the more major major ones,

260
00:30:35,980 --> 00:30:41,259
Ethereum seems to be sort of slated or going in the direction of a proof of stake approach.

261
00:30:42,300 --> 00:30:47,580
But Bitcoin, they use a proof of work approach. And so, we're going to just going to proceed, you know,

262
00:30:47,580 --> 00:30:52,540
with that design. Any questions?

263
00:30:55,340 --> 00:31:01,500
So, let's, so I'm just wondering of how it's hard to impersonate the winner. So, let's say that we

264
00:31:01,500 --> 00:31:08,299
have server 8 and server 8 and server 8 wants to append entry, let's say E1 and server 8 wants to

265
00:31:08,299 --> 00:31:15,180
append entry E2. So, server 8 solves the puzzle and publishes the solution, right? And I'm assuming

266
00:31:15,180 --> 00:31:20,700
that the solution is easy to check. So, then server b sees the solution and checks that it's correct.

267
00:31:22,619 --> 00:31:29,579
So, it cannot work that server b just simply republishes the solution with its own name and

268
00:31:29,579 --> 00:31:34,779
signing it by its own name because the puzzle for E2 is different from the puzzle for E1, right?

269
00:31:36,139 --> 00:31:39,659
Yeah, we, yeah, exactly. And we'll see, you know, we'll get into this in more detail in the second.

270
00:31:40,619 --> 00:31:43,899
In court, this year, this is sort of the basic insight, you know, it's of course not enough.

271
00:31:45,419 --> 00:31:49,899
But it won't turn out to be enough to basically settle on a fork. So, we're going to accept

272
00:31:49,899 --> 00:31:54,059
there going to be forks and then we're going to have, you know, Bitcoin basically accepts their

273
00:31:54,059 --> 00:31:58,699
forks, like in Sunder, but then has a way of basically deciding which fork to settle on.

274
00:32:00,059 --> 00:32:05,419
Yeah. So, I had a question about network traditions.

275
00:32:05,980 --> 00:32:13,579
Yeah. And I was wondering how, like, you know, if you were able to make a partition, like on the

276
00:32:13,579 --> 00:32:19,179
internet, which, you know, it's probably like unreasonable, but you're able to partition the internet,

277
00:32:19,179 --> 00:32:28,460
like the whole internet. And could you convince, like, you know, one, like double spend by like

278
00:32:28,460 --> 00:32:32,860
spending on both sides of the partition? Yeah, the partition never heals.

279
00:32:34,140 --> 00:32:40,940
If you succeed, like eventually, you'd assume it heals, but then by then, like,

280
00:32:41,660 --> 00:32:45,819
you probably would've gotten like something shipped or... Yeah. So, in general, we'll see you

281
00:32:45,819 --> 00:32:49,259
with, we'll talk a little bit more about it, but like, the, the, the, the, the, the, the, the,

282
00:32:49,259 --> 00:32:52,140
the, the, the, the, the, the, the, there's ways of creating forks and when you're describing

283
00:32:52,220 --> 00:32:56,780
is basically for it, that persists for a long period of time. And, you know, we'll see the, the,

284
00:32:58,060 --> 00:33:03,580
basically, the, and I'm Bitcoin, the, basically produces these blocks, the transactions, sort of,

285
00:33:03,580 --> 00:33:08,300
every 10 minutes. And, you know, if you're very conservative or you're, you're, you're going to be

286
00:33:08,300 --> 00:33:14,860
careful, you know, not to be, uh, uh, avoid double spending or making sure that there's nothing

287
00:33:14,860 --> 00:33:19,820
worth double spend, you generally wait, you know, for multiple these blocks to appear, like five,

288
00:33:19,819 --> 00:33:25,019
six, so basically an hour before actually decide to actually accept, you know, the, to say, oh,

289
00:33:25,019 --> 00:33:29,740
yeah, that this is, I'm on the right fork. Thanks.

290
00:33:39,019 --> 00:33:46,700
Okay, so, let's look at how the pieces fit together. Um, so it turns out, you know, the,

291
00:33:46,779 --> 00:33:51,580
you know, do a proof of work, you know, for transaction, uh, that would be crazy, uh, because you're,

292
00:33:51,580 --> 00:33:55,180
you gotta spend a lot of computational power, you know, for them, for that one single transaction,

293
00:33:55,180 --> 00:34:00,620
that will limit the number of transactions you can actually do per second. And so, uh, the way

294
00:34:00,620 --> 00:34:07,100
actually this is done is basically transaction or, uh, grouping blocks and the proof of work, uh,

295
00:34:07,100 --> 00:34:11,579
is done on a, on a block basis. And so we have our network,

296
00:34:11,659 --> 00:34:19,099
you know, the way that actually works is that we're not making a lot of blogs, but like we, you know,

297
00:34:19,099 --> 00:34:23,340
we, uh, a lot of transactions, we make actually a lot of, uh, blocks, which are called, you know,

298
00:34:23,340 --> 00:34:24,460
basically a blockchain.

299
00:34:28,699 --> 00:34:35,819
And so, you've got our network, you know, we appears or around the world. And, uh, you know,

300
00:34:35,819 --> 00:34:38,940
the blog, you know, is basically, you know, sequence of blocks.

301
00:34:42,539 --> 00:34:47,340
And so, appears, you know, copies of these, you know, they may compute new ones, you know,

302
00:34:47,340 --> 00:34:53,099
append them and distribute them and flood them across the network. And so what is in a, in a block?

303
00:34:55,099 --> 00:35:00,299
You had a very high level. Again, there's many more details that I'm just going to ignore.

304
00:35:01,099 --> 00:35:06,539
It's going to be the hash of the previous block. So, you know, B minus 1.

305
00:35:07,500 --> 00:35:13,420
And so if this is block 5, you know, this is going to be then, uh, you know, B4, so B minus 1.

306
00:35:14,460 --> 00:35:20,139
So the unique identifier of the, basically, the previous block in the, in the chain, the transactions

307
00:35:20,139 --> 00:35:28,300
that are part of this block. And then a nonce, we'll talk about in a second, but this is the

308
00:35:28,300 --> 00:35:34,139
thing that is going to play crucial role in the, uh, the puzzle and the timestamp.

309
00:35:37,019 --> 00:35:44,380
And, you know, this is about, typically, I want to see you a little bit, you know, think about

310
00:35:44,380 --> 00:35:52,460
this as roughly a megabyte block. So basically, the, the game is, you know, the, the, the

311
00:35:52,460 --> 00:36:00,139
peers of collect transactions, uh, then, uh, basically solve the puzzle. Uh, and once they solve

312
00:36:00,139 --> 00:36:05,099
the puzzle, they're going to ship the block to, uh, everybody in the, in the network.

313
00:36:05,819 --> 00:36:10,859
Everybody can check whether the peer actually solves the puzzle correctly. And it is, you know,

314
00:36:10,859 --> 00:36:14,539
the possible is correct. You solve correctly in the transaction checkout and, you know,

315
00:36:14,539 --> 00:36:18,059
everything the hash is check out. And then they're going to basically accept that block as the

316
00:36:18,059 --> 00:36:28,460
next block in the chain. So a little bit more detail. Uh, you know, when, you know, basically the

317
00:36:28,460 --> 00:36:35,340
winner gets to the site, uh, on the next block. So we have a new block.

318
00:36:39,740 --> 00:36:43,900
Uh, and this is basically going to be the proof of work, which is done typically that the

319
00:36:43,900 --> 00:36:48,380
party that does the proof of work is called the miners. And we'll see in a second why.

320
00:36:50,059 --> 00:36:57,500
Um, and basically the, uh, the game that the, uh, we're going to play is that the, um,

321
00:36:58,460 --> 00:37:06,860
uh, the miner has to compute a hash of this new block for that basically has,

322
00:37:09,099 --> 00:37:12,780
has N leading zeros.

323
00:37:17,579 --> 00:37:24,139
So, and the way, you know, the, the miner can do that is basically by changing the knot. So

324
00:37:24,139 --> 00:37:29,980
basically the miner makes, you know, random guesses for a nonce, uh, compute the hash and,

325
00:37:29,980 --> 00:37:34,940
and checks, you know, the number of leading zeros. And if the leading number of leading zeros is,

326
00:37:34,940 --> 00:37:38,940
you know, in a larger, then, you know, basically that is a block that's going to be accepted.

327
00:37:39,900 --> 00:37:44,299
The only way you can think about it is that basically the hash value is below some particular,

328
00:37:45,659 --> 00:37:51,500
uh, uh, bloatial, particular difficulty value. Uh, this end can be tuned,

329
00:37:52,139 --> 00:37:59,820
over time. Also, seeing the second later, uh, to, you know, adjust the difficulty, um, uh, and,

330
00:37:59,820 --> 00:38:05,340
but on average, you know, what, you know, the amount of work that is necessary, you know,

331
00:38:05,340 --> 00:38:11,179
sort of the targeting is about like, you know, roughly a CPU month of, you know, computation.

332
00:38:12,699 --> 00:38:15,739
And it's not really expressing that ways with the expression terms of number of hash,

333
00:38:15,739 --> 00:38:20,459
you can do per second, uh, but then it compoyles down to sort of shooting, shooting without kind of

334
00:38:20,459 --> 00:38:25,419
a number. Of course, a lot of peers, you know, do this in parallel, you know, they're, I think,

335
00:38:25,419 --> 00:38:29,899
the network is currently around 10,000 nodes, so 10,000 nodes might be, and there might be many more

336
00:38:29,899 --> 00:38:35,500
miners, um, I think the hundreds of thousands of miners, and you know, they might get lucky,

337
00:38:35,500 --> 00:38:40,619
right? And, you know, you pick, you know, the right ones, if we're quickly, um, and some of them actually,

338
00:38:40,619 --> 00:38:45,819
uh, uh, get quickly, and so what they're shooting sort of roughly is that, you know,

339
00:38:45,819 --> 00:38:49,819
that the first one, you know, to actually solve the puzzle, that takes about 10 minutes.

340
00:38:54,380 --> 00:39:00,460
And, you know, by adjusting the difficulty, you know, the, the, the, the vertical, it's just,

341
00:39:00,460 --> 00:39:05,420
you know, the time, where the, the, the time it will take to actually, you know, compute one of

342
00:39:05,420 --> 00:39:10,139
these hashish and the, sort of the energy that one has to put into to actually solve the, the possible

343
00:39:11,099 --> 00:39:17,739
and so whenever, uh, you know, the, whatever miner, you know, sort of solves this puzzle first,

344
00:39:17,739 --> 00:39:22,699
basically gets to, uh, spread the block across the network, and basically has sort of about 10

345
00:39:22,699 --> 00:39:27,259
minutes, you know, to do so, right? And so, you know, one reason to, the, the 10 minutes is there,

346
00:39:27,259 --> 00:39:30,859
is that, you know, we'll take a little bit of time to move that one thing about a block, you know,

347
00:39:30,859 --> 00:39:36,139
across, you know, the many, many peers that are in the network, and, uh, you want to make sure that

348
00:39:36,219 --> 00:39:43,579
there's enough time to sort of get the, uh, the block out to many of the peers, uh, so that you can

349
00:39:43,579 --> 00:39:49,179
avoid forks, as we'll see in a second. And so before that somebody else actually, you know, solves the

350
00:39:49,179 --> 00:40:01,099
puzzle too. Um, Professor. Yeah. So, um, this, the number of leading zeros that, uh, hash needs,

351
00:40:01,739 --> 00:40:06,539
like to be accepted by node, is that number like set by each node individually? Like,

352
00:40:06,539 --> 00:40:09,579
no, no, no, no, this is part of the protocol. This is a really brief part of,

353
00:40:10,059 --> 00:40:16,539
right, but, but like, the census on the, uh, what ends? Um, but what, what I mean is like, it's part

354
00:40:16,539 --> 00:40:28,299
of the protocol, but like, um, so, so, so, well, behave nodes will follow it, but they, but,

355
00:40:28,300 --> 00:40:35,100
who calculates it? Is it a central server that, uh, that calculates the same and sends it out or

356
00:40:35,100 --> 00:40:40,060
every, no, no, no, we'll see in a second later actually how it's computed. Uh, but basically what,

357
00:40:40,060 --> 00:40:45,260
I can give you a hint about how it's computed. One reason the timestamps are in these things,

358
00:40:46,539 --> 00:40:52,700
uh, is that like, if the time between blocks becomes too low, then the difficulty goes up.

359
00:40:52,699 --> 00:40:57,739
Mm-hmm. And, you know, these timestamps, of course, are validated, you know, using the

360
00:40:57,739 --> 00:41:01,659
hashers and all the kind of stuff and sitting in the blockchain. Everybody sees the same blockchain,

361
00:41:01,659 --> 00:41:05,579
uh, so they will compute the, you know, the same difference between the timestamps and, you know,

362
00:41:05,579 --> 00:41:10,299
therefore, they make the same adjustment in terms of difficulty. Right. Um, and this is one of the

363
00:41:10,299 --> 00:41:13,899
cool parts, right? We're having a log of everything that's in there. Like, if, you know, I have some

364
00:41:13,899 --> 00:41:17,899
determinants, you could compute any deterministic function, you're like the content of the log.

365
00:41:18,700 --> 00:41:25,260
Right. Okay. Um, so, so it would be a deterministic function, but, but at the end of the day, like,

366
00:41:25,260 --> 00:41:33,820
if, if I like try and get away with like sending less than n, like zeros, then each

367
00:41:33,820 --> 00:41:38,700
individual node in the network should call me out. Yeah, the whole injector solution, because you're

368
00:41:38,700 --> 00:41:45,660
out, don't have a real solution. Okay. Thanks. So what stops an attacker from just constantly

369
00:41:45,659 --> 00:41:50,539
flooding the network with wrong solutions? Yeah, they're not a search attack. And hopefully,

370
00:41:50,539 --> 00:41:56,859
they did one of the turns out that the checking solution is very easy. Right. And so it's easy to

371
00:41:56,859 --> 00:42:05,659
quickly reject an incorrect solution. Thank you. And how are the timestamps determined due,

372
00:42:05,659 --> 00:42:10,779
like does each block set the timestamp on its own? Yeah. Now, the minor that successfully

373
00:42:10,780 --> 00:42:18,780
minds can set some timestamp in the block. And what if they just set the timestamp to be, like,

374
00:42:18,780 --> 00:42:23,340
longer than it took so that it becomes less difficult? Well, they can't lie too much.

375
00:42:23,340 --> 00:42:27,500
Great. Like, they have a 10 minute window sort of roughly to why I don't really know exactly how

376
00:42:27,500 --> 00:42:32,620
the timestamp is checked. I don't know them. By dimension with this solvable.

377
00:42:34,940 --> 00:42:40,460
Okay. Piers get like to the transactions that want to be appended to the block.

378
00:42:41,500 --> 00:42:47,019
Thank you. That's the next one. So, so blocks and transactions.

379
00:42:57,580 --> 00:43:02,300
So let's assume, like, there's some, you know, block B5 that already has been computed.

380
00:43:02,860 --> 00:43:09,260
That sits in the log, you know, points for every two B4. And so we're a minor.

381
00:43:09,900 --> 00:43:16,220
We're working on, you know, we got a blog with, you know, that is sort of we're reminding on. So,

382
00:43:16,220 --> 00:43:22,780
it has a bunch of transactions. And we're basically, you know, trying to compute, you know,

383
00:43:22,780 --> 00:43:29,100
the solution to this puzzle. And so new transactions come in, right? They arrive. And so the new

384
00:43:29,100 --> 00:43:33,580
transactions actually, you know, they called a memory buffer buffer. They're going to some buffer.

385
00:43:33,659 --> 00:43:43,019
And basically, they're going to, when the next walk, there will be some point. This guy,

386
00:43:43,019 --> 00:43:50,219
you know, let's say this is one minor. So let's say minor, I was the lucky one, you know, actually,

387
00:43:51,900 --> 00:43:59,420
minor, I compute, you know, the new B6. And so at some point, B6 is the new

388
00:44:00,220 --> 00:44:06,940
next head of the log, you know, which contains a bunch of transactions. And so while, you know,

389
00:44:06,940 --> 00:44:11,420
sort of minor, I was actually trying to hash, you know, computing many, many, many,

390
00:44:11,420 --> 00:44:17,420
hashers directly solve the puzzle. New transactions come in. And so soon, as the minor, I

391
00:44:17,420 --> 00:44:22,460
is done, you know, with B6, it basically selects, you know, the number of transactions,

392
00:44:22,460 --> 00:44:26,300
puts a new block together, a partial block. It's not the one that is solved yet.

393
00:44:27,100 --> 00:44:31,740
You know, the transaction is in from the pool, you know, whatever updates, you know, whatever

394
00:44:31,740 --> 00:44:36,780
an engine engine needs to be updated. And then start hatching on that one. And hoping to solve it

395
00:44:36,780 --> 00:44:40,860
so that that can be added, you know, to the transaction log. And some point later, if it succeeds.

396
00:44:41,740 --> 00:44:48,380
Of course, if somebody else succeeds in solving the producing B7 before minor, I, you know,

397
00:44:48,380 --> 00:44:54,060
minor, I was going to switch, you know, to the B7 of that block, remove any transactions that

398
00:44:54,059 --> 00:44:59,019
ended up already in B7 and continue with the transaction that are left and are not in B7 yet.

399
00:45:01,179 --> 00:45:07,259
Okay, so that's sort of the plan for how transactions of blogs interact

400
00:45:08,940 --> 00:45:09,659
than I love them.

401
00:45:12,460 --> 00:45:20,860
So as transactions come in, like, you know, you're trying to calculate the non-serve block,

402
00:45:21,820 --> 00:45:28,860
that'll give you, you know, end-leaking zeros. New transactions will come in, right?

403
00:45:28,860 --> 00:45:29,660
As you can see.

404
00:45:29,660 --> 00:45:33,660
They're not part of that block. They're not going to be sitting on the site, therefore the next block.

405
00:45:34,300 --> 00:45:40,860
Okay. Could you, could you add, could you add them to the block?

406
00:45:40,860 --> 00:45:41,740
No, it changed the hatch.

407
00:45:43,099 --> 00:45:48,860
Right. But I mean, you just need to keep trying to get like a valid non-s, right?

408
00:45:49,340 --> 00:45:53,099
You also have, there's a limit on the block size, you know, the block size can't be bigger than one

409
00:45:53,099 --> 00:45:58,460
of the one, one some particular predefined consulate by the protocol. You know, there's a bunch of

410
00:45:58,460 --> 00:46:02,300
other reasons, you know, once you're filled up the blog, you know, with your transactions, you

411
00:46:02,300 --> 00:46:05,099
keep going, and passing until, you know, you find the solution.

412
00:46:05,099 --> 00:46:06,059
Okay.

413
00:46:07,180 --> 00:46:12,220
Or, or you get, or you receive a new one and then you reject and you go work on the next one.

414
00:46:12,620 --> 00:46:13,019
Okay.

415
00:46:15,180 --> 00:46:15,420
Thanks.

416
00:46:16,380 --> 00:46:23,500
So when, when someone, when a minor like loses, and do they like, I guess it's possible for a

417
00:46:23,500 --> 00:46:28,380
minor never to make profit out of this because they keep like losing because they have no

418
00:46:28,380 --> 00:46:28,860
competitors.

419
00:46:28,860 --> 00:46:33,980
Yeah, absolutely. If, if I would start mining with my laptop, I'm pretty sure I would make no money.

420
00:46:37,099 --> 00:46:39,980
And the transaction pool, it is local?

421
00:46:40,940 --> 00:46:46,460
Yeah, every, every note maintains this transaction pool, where as they receive transactions from

422
00:46:48,860 --> 00:46:52,619
from other notes in the network, you know, they keep that transaction pool and, you know,

423
00:46:52,619 --> 00:46:55,579
they use that transaction pool basically to fill the next block.

424
00:46:57,420 --> 00:46:58,219
So you want to tell me?

425
00:46:58,219 --> 00:47:02,539
In all kinds of rules, you know, and how you select transactions, which I'm not going to talk about.

426
00:47:02,940 --> 00:47:03,260
Okay.

427
00:47:03,900 --> 00:47:06,460
So to a pen, you need to tell your transaction to everyone.

428
00:47:07,820 --> 00:47:08,139
Yes.

429
00:47:08,940 --> 00:47:14,299
Or you, you tell a bunch of peers and they will flood it for the rest of you to the rest of the network.

430
00:47:17,099 --> 00:47:24,699
Oh, so for my understanding, when a minor successfully mines or verifies a transaction,

431
00:47:25,500 --> 00:47:27,659
they get rewarded.

432
00:47:27,659 --> 00:47:27,980
Yeah.

433
00:47:27,980 --> 00:47:33,659
As they did this verification, but they can also lie when it comes to the timestamp.

434
00:47:33,659 --> 00:47:37,420
So let's say that you have two verifiers and they're both working on the same block.

435
00:47:37,420 --> 00:47:41,260
And they almost simultaneously verify at the same time.

436
00:47:41,260 --> 00:47:47,099
But one of them was, you know, they lied and they made the timestamp a bit earlier.

437
00:47:47,900 --> 00:47:52,619
So kind of they, but there's difficulties chosen for a period of time.

438
00:47:52,619 --> 00:47:56,940
Like for the next like 20, you know, as a whole bunch of years of block, it only changes periodically.

439
00:47:57,420 --> 00:47:58,860
You can't change it arbitrarily.

440
00:47:59,820 --> 00:48:02,300
So what that, I'm sorry, I think I missed that one.

441
00:48:02,860 --> 00:48:06,300
The difficulty is not changed on every block.

442
00:48:07,180 --> 00:48:11,740
It is periodically changed after some number of blocks have been computed.

443
00:48:12,460 --> 00:48:14,220
And so, you know, it's done in the back.

444
00:48:14,220 --> 00:48:16,460
You know, everybody can see what these timestamps are.

445
00:48:16,460 --> 00:48:20,620
You know, every, I think it's every, I forgot what that exact number of blocks is.

446
00:48:20,620 --> 00:48:24,300
Where when, you know, the difficulty is adjusted.

447
00:48:25,180 --> 00:48:25,500
I see.

448
00:48:26,220 --> 00:48:26,460
Thank you.

449
00:48:27,900 --> 00:48:30,700
So at that point, you already agreed on all those blogs in the past.

450
00:48:30,779 --> 00:48:32,539
So everybody's on agreement of like what the

451
00:48:33,419 --> 00:48:37,259
timestamps are that we're going to actually use to actually compute a new, a, a valid block.

452
00:48:39,579 --> 00:48:46,779
Um, so, so I had, I had one, um, one question about, um, like achieving consensus.

453
00:48:46,779 --> 00:48:52,779
I guess like all of this like relies on like pretty much every node running

454
00:48:53,659 --> 00:48:54,699
the same code, right?

455
00:48:54,699 --> 00:48:58,859
Or are these following the, the rules vary very precisely.

456
00:48:58,940 --> 00:48:59,500
Yep.

457
00:48:59,500 --> 00:49:03,180
Like what happens if there's a bug in like my code and the code that I'm running,

458
00:49:03,820 --> 00:49:07,900
um, and you know, maybe cut a bug in like a bunch of different nodes.

459
00:49:09,660 --> 00:49:14,539
Does that like throw off like, like all like notions of like consistency potentially?

460
00:49:15,579 --> 00:49:19,740
Well, you know, the, the, the, the, the, the, the, the, as long as the majority is, we'll talk a little bit more about it.

461
00:49:19,740 --> 00:49:23,260
I think there's a majority of the nodes, I think the right, the runs the right code, you know,

462
00:49:23,260 --> 00:49:24,539
I have to make some work out.

463
00:49:24,539 --> 00:49:24,700
Right.

464
00:49:25,019 --> 00:49:29,659
But like if there's a trap door in the code, yeah, you got a problem.

465
00:49:29,659 --> 00:49:31,899
Like if there's a trap or in Linux, you got a problem too.

466
00:49:33,899 --> 00:49:39,179
So, so do, does every node run like the same code or are there different?

467
00:49:39,179 --> 00:49:41,659
No, there are a couple of different bitcoins versions around.

468
00:49:41,659 --> 00:49:43,259
We'll talk a little bit more about it in a second.

469
00:49:43,259 --> 00:49:48,379
Uh, but there are, uh, so the main, you know, core, uh, they're called, you know,

470
00:49:48,379 --> 00:49:52,139
and they're like, it's like an open source project and like, like, Linux is, you know,

471
00:49:52,139 --> 00:49:55,500
has maintainers and, you know, code review, I know all that kind of stuff.

472
00:49:56,859 --> 00:50:01,019
And most of the, like, the wallets and most of the sort of the, uh, appears will run,

473
00:50:01,019 --> 00:50:03,659
they know, one of the, the standardized version basically.

474
00:50:04,699 --> 00:50:06,699
Thanks.

475
00:50:11,339 --> 00:50:12,139
Uh, okay, forked.

476
00:50:13,819 --> 00:50:20,460
So, uh, so we know now, like, what the rule is, you know, who can actually extend, uh, the,

477
00:50:20,460 --> 00:50:24,380
the log, uh, or the chain, the blockchain, you can still have forks.

478
00:50:25,179 --> 00:50:27,099
Okay, because you know, there's a new chart chain,

479
00:50:27,980 --> 00:50:30,940
you know, we're B5, you know, B6.

480
00:50:31,659 --> 00:50:35,260
And you know, we, you know, somebody who to do might actually guess, sort of lucky,

481
00:50:35,260 --> 00:50:39,019
and so roughly compute is going to be seven, you know, two B7s at the same time.

482
00:50:39,019 --> 00:50:43,500
So, can you, we got B7 prime, and here we got B7 double prime.

483
00:50:45,980 --> 00:50:48,539
Uh, and that would be problematic for us, right?

484
00:50:48,619 --> 00:50:54,460
Because maybe, you know, one of these, this chain, uh, has the dissection, you know, the,

485
00:50:54,460 --> 00:50:56,860
the Y2, whatever it's Y2Z.

486
00:50:57,980 --> 00:51:00,139
Yeah, and maybe this one has the Y2Q.

487
00:51:02,300 --> 00:51:06,059
So I can, you know, we're on a sort of mature that we actually settle in the end of one chain.

488
00:51:06,860 --> 00:51:09,420
You know, so there's two reasons that are why these chains might develop.

489
00:51:10,059 --> 00:51:15,579
You know, one is, you know, the, people or participants find, uh, the,

490
00:51:15,579 --> 00:51:18,539
uh, find the non-s at the same time.

491
00:51:22,460 --> 00:51:23,659
Or roughly at the same time.

492
00:51:24,380 --> 00:51:27,500
And the second one is that, you know, there may be slow networks.

493
00:51:30,860 --> 00:51:35,980
And so, you know, up here might receive, you know, from two nodes that are in different ends of

494
00:51:35,980 --> 00:51:38,139
the network, at some point, these two new solutions.

495
00:51:39,179 --> 00:51:43,819
Um, and basically, you know, when a node ends up in this situation,

496
00:51:43,820 --> 00:51:49,740
basically does not, and usually keeps the fork around and just waits to see which fork gets extended.

497
00:51:50,300 --> 00:51:54,460
And so, you know, maybe this fork, the bottom one, you know, will get extended with, you know,

498
00:51:54,460 --> 00:51:59,740
B8. And then the rules very simple, uh, you know, the piers switches,

499
00:52:04,220 --> 00:52:05,500
switches to the longest fork.

500
00:52:05,820 --> 00:52:17,099
And, uh, and so, uh, and so we're basically, you know, all the designations, you know,

501
00:52:17,099 --> 00:52:21,739
that might have learned about the, this fork, in the top fork, I'm just going to disappear.

502
00:52:21,739 --> 00:52:26,539
You know, there's going to not matter in the, the system, uh, because in the end, you know,

503
00:52:26,539 --> 00:52:30,059
all those sort of good nodes, a little actually agree on the longest chain.

504
00:52:30,059 --> 00:52:33,739
And, you know, basically proceed, you know, mining along the longest chain.

505
00:52:34,699 --> 00:52:40,539
That's the basic plan. And so let's look a little bit about like how would that solve our double,

506
00:52:40,539 --> 00:52:46,859
double spending problem? Wait, I have a question on the obvious slide.

507
00:52:47,500 --> 00:52:50,059
Yep, I'm going to continue on the previous slide in this slide.

508
00:52:50,059 --> 00:52:53,899
But okay, so, um, but, but, man, that's the question. So,

509
00:52:54,859 --> 00:53:02,699
so, even if the, in the, in the second cause, like the slow network, can you, um, detect that if

510
00:53:02,779 --> 00:53:07,659
you're using, if the miner included the timestamp where they, when they found the solution?

511
00:53:09,019 --> 00:53:15,419
Uh, okay. The, the, the, the, the, the, the, the, the, the, the, the, the, the, you might get

512
00:53:15,419 --> 00:53:19,659
already be suspicious or may agree on what actually the next, you know, what the right problem,

513
00:53:19,659 --> 00:53:23,819
the right chain is, but it will be confirmed later by future blocks.

514
00:53:24,859 --> 00:53:28,139
And, you know, you use the future blocks that we really decide what's the longest chain is.

515
00:53:28,139 --> 00:53:30,139
Okay.

516
00:53:30,139 --> 00:53:32,139
Okay.

517
00:53:32,139 --> 00:53:34,139
Okay.

518
00:53:34,139 --> 00:53:36,139
Double spinning.

519
00:53:36,139 --> 00:53:40,139
So let's talk about sort of two easy two cases.

520
00:53:40,139 --> 00:53:42,139
The first one is easy.

521
00:53:42,139 --> 00:53:46,139
You know, why, you know, sense.

522
00:53:46,139 --> 00:53:48,139
You know, the why to Z.

523
00:53:48,139 --> 00:53:51,139
And why to Q.

524
00:53:51,139 --> 00:53:55,139
To some peer or to the peers.

525
00:53:55,139 --> 00:54:01,139
And basically what will happen quick in this case is that if it's a well behaving peer, you'll see like, hey, you know, two transactions.

526
00:54:01,139 --> 00:54:04,139
That actually spent the same money.

527
00:54:04,139 --> 00:54:05,139
Twice.

528
00:54:05,139 --> 00:54:07,139
I'm just going to reject that.

529
00:54:07,139 --> 00:54:12,139
So appeared up to use, you know, is trying to go or minor, that it's going to construct a blog.

530
00:54:12,139 --> 00:54:16,139
You know, we'll actually validate all the transactions before they stick them in the blog.

531
00:54:16,139 --> 00:54:24,139
So this will, you know, don't really, this is not going to work. My name is going to reject. Good minor.

532
00:54:24,139 --> 00:54:30,139
Okay. The second question, the more interesting thing that in cases, basically, why, since.

533
00:54:30,139 --> 00:54:32,139
You know, why to Z.

534
00:54:32,139 --> 00:54:36,139
You know, to some set of the peers.

535
00:54:36,139 --> 00:54:39,139
And, you know, why to Q.

536
00:54:39,139 --> 00:54:47,139
To another set of peers.

537
00:54:47,139 --> 00:54:55,139
And you know, we, and, and my, you know, maybe, you know, the, maybe one pool is bigger than the other pool.

538
00:54:55,139 --> 00:54:59,139
But the crew actually end up in the situation where basically, you know, we got the chain.

539
00:54:59,139 --> 00:55:01,139
Okay. So before.

540
00:55:01,139 --> 00:55:05,139
And basically, there are one set of peers, you know, computes.

541
00:55:05,139 --> 00:55:09,139
You know, the hash where that includes why to Q.

542
00:55:09,139 --> 00:55:14,139
And the other one computes a block, you know, actually contains why to Z.

543
00:55:14,139 --> 00:55:17,139
And so this looks like a double spending thing.

544
00:55:17,139 --> 00:55:25,139
And so if you're Z, quick, like, two years, the version that there's going to decide whether to accept, you know, this transaction and hand out of the.

545
00:55:25,139 --> 00:55:26,139
Hand out the latte.

546
00:55:26,139 --> 00:55:29,139
What you do is you're going to wait.

547
00:55:29,139 --> 00:55:31,139
And you're going to wait until.

548
00:55:31,139 --> 00:55:34,139
There's a bunch of more blocks that are behind it.

549
00:55:34,139 --> 00:55:37,139
So typically it's five six up to five six.

550
00:55:37,139 --> 00:55:41,139
You know, for a better available transaction, maybe not for a latte, but if you're buying a car.

551
00:55:41,139 --> 00:55:45,139
You know, you really want to make them sure that you're going to get your money.

552
00:55:45,139 --> 00:55:49,139
And that, you know, why didn't double spend the money.

553
00:55:49,139 --> 00:55:51,139
And so.

554
00:55:51,139 --> 00:55:54,139
You may work in a way for a while.

555
00:55:54,139 --> 00:56:00,139
Until new hatch. I mean, end it to a new block, so be extended to the blockchain.

556
00:56:00,139 --> 00:56:04,139
And you know, I want you to five or six.

557
00:56:04,139 --> 00:56:06,139
And that's the paper, but some calculations.

558
00:56:06,139 --> 00:56:07,139
You can be pretty confident.

559
00:56:07,139 --> 00:56:10,139
Very confident that.

560
00:56:10,139 --> 00:56:18,139
It's unlikely, you know, for a attacker to basically compute a new chain and sort of overtake, you know, the longer chain.

561
00:56:18,139 --> 00:56:20,139
Right. Let's say this is the attacker.

562
00:56:20,139 --> 00:56:28,139
The attacker has less computational power, you know, presumably, you know, this is the assumption behind this whole paper and has less computational power to know the good people.

563
00:56:28,139 --> 00:56:31,139
And so the good people have more computational power.

564
00:56:31,139 --> 00:56:36,139
It's going to be impossible for the attacker or unlikely or.

565
00:56:36,139 --> 00:56:45,139
Then the ledges will be impossible or unlikely for the attacker to basically compute faster and actually make a chain that's longer than the good chain.

566
00:56:45,139 --> 00:56:49,139
So that's sort of the key assumption that's behind all this.

567
00:56:49,139 --> 00:56:54,139
Among this reason, among this reason reason.

568
00:56:54,139 --> 00:57:11,139
So you know, just has to wait for a while until the good guys like extended the chain long enough that you know the Z is completely convinced that you know, impossible for a set of attackers to actually out compute, you know, the good people.

569
00:57:11,139 --> 00:57:16,139
And at that point, you know, the Z can just accept the transaction and say like, oh, this is legit injection.

570
00:57:16,139 --> 00:57:26,139
If everything else checks out and hand over the latte or the car, you know, to to see or to the why I guess.

571
00:57:26,139 --> 00:57:31,139
Sorry, good question. Who distributes the puzzles.

572
00:57:31,139 --> 00:57:37,139
There's no distribution deposits necessary, right?

573
00:57:37,139 --> 00:57:49,139
The puzzle is, you know, predetermined, you know, the puzzle is you have to compute a hash over the block that has enough leading zeros.

574
00:57:49,139 --> 00:57:59,139
So there's no distribution or deposit, no thing that's distributed. Maybe it's the difficulty, but as we talked a little bit earlier, that sort of adjusted over time in a two minutes to go away.

575
00:57:59,139 --> 00:58:01,139
Thank you.

576
00:58:01,139 --> 00:58:10,139
So there's all these transactions that are happening and then through some gossip protocol or something, the transactions distributed to all the nodes.

577
00:58:10,139 --> 00:58:21,139
And then somehow there's agreement on what set of transactions are packaged into a block. So everyone has agreement on what the block is.

578
00:58:21,139 --> 00:58:28,139
No, no, no, no, no, no, no, no, the minor received transactions, right?

579
00:58:28,139 --> 00:58:33,139
But we hear where was it.

580
00:58:33,139 --> 00:58:38,139
Blocked over some slide. I think the next one.

581
00:58:38,139 --> 00:58:47,139
Yeah, blocks and transactions. So the minor, mainly minor, I, you know, use received transactions over the network and it just decides which transactions go in that block.

582
00:58:47,139 --> 00:58:53,139
And if it starts computing and if it wins, that is the transaction that going that block.

583
00:58:53,139 --> 00:59:03,139
So that determines that the total order, right? You know, the total order is determined by all the previous blocks can upwash this new block and within the block, you know, basically a minor eye is decided what goes in.

584
00:59:03,139 --> 00:59:11,139
There's some complicated rules that you know, minor should supposed to follow, but you know, basically the minor gets to this side.

585
00:59:11,139 --> 00:59:16,139
Thank you.

586
00:59:16,139 --> 00:59:21,139
And there's some incentive systems for the miners to do the right thing.

587
00:59:21,139 --> 00:59:24,139
So let me talk a little bit about this.

588
00:59:24,139 --> 00:59:36,139
So so far, you know, we're seeing the disposal of that sort of the core, this proven work idea to is that's the core of actually achieving consensus.

589
00:59:36,139 --> 00:59:40,139
But you know, this requires the miners actually to quite a bit of work.

590
00:59:40,139 --> 00:59:44,139
Like they have to hash, hash, hash, have to have to say, here's computer.

591
00:59:44,139 --> 00:59:47,139
It's one one. These are roughly a month of work, right?

592
00:59:47,139 --> 01:00:03,139
And so why wouldn't minor do that? And so there's an incentive system for to encourage miners to actually play this role.

593
01:00:03,139 --> 01:00:14,139
You know, there's a rule that basically the, there's a bunch of sort of Bitcoin reserved in the pool, like when the refers bits, you know, Bitcoin transaction versus created.

594
01:00:14,139 --> 01:00:23,139
And miners get paid or rewarded out of that pool. And so basically the first transaction.

595
01:00:23,139 --> 01:00:33,139
And the first transaction in the blog is basically reward for the minor.

596
01:00:33,139 --> 01:00:49,139
And so basically the minor can insert an transaction in the first of the contours and transaction first slot where that basically lists, you know, the miners public key and transferring money out of the cool to himself.

597
01:00:49,139 --> 01:01:00,139
And that was the way the miners get actually get named the lead sort of return or reward for actually the work they do.

598
01:01:00,139 --> 01:01:10,139
That reward changes over time. Currently, I think you know, for today is I think it's 6.25, you know, Bitcoin.

599
01:01:10,139 --> 01:01:24,139
To actually mind a block. But this is changing over time. It actually has sort of a half-ing rule that reduces, you know, half the like a couple years ago, which is 12 bit at 12.5 Bitcoin.

600
01:01:24,139 --> 01:01:37,139
And in a while will be whatever free point, you know, whatever the half of 6.25. And I think I remember correctly every two and every two under 10,000 blocks that number halves.

601
01:01:37,139 --> 01:01:49,139
It's until it runs into the most finest, you know, the finest Bitcoin denominator. And then it basically stops.

602
01:01:49,139 --> 01:02:00,139
But we're a while away before that actually is the case. If that happens, then the idea is that, you know, to mine actually block every transaction page a little fee.

603
01:02:00,139 --> 01:02:09,139
And the minor collects the fees, you know, from all the transactions in the block and use and reward the minor with those fees.

604
01:02:09,139 --> 01:02:17,139
Even now there are some fees. But to make sure that basically the transaction on a frivolous.

605
01:02:17,139 --> 01:02:32,139
And so really the minor actually earns not only the 6.25, but also like the fees that actually spend the fees that actually go along with the transactions.

606
01:02:32,139 --> 01:02:45,139
And so this is, as the minor incentive in Bitcoin has gotten so successful that basically there's sort of an arms range in minor.

607
01:02:45,139 --> 01:02:57,139
And this is like, for example, why, you know, if I were to want to participate and actually win and make some money, I'm going to lose the, the series minors are much better at computing.

608
01:02:57,139 --> 01:03:03,139
And then you have to have a hash that at a very high rate. Then, you know, you're standing left up.

609
01:03:03,139 --> 01:03:14,139
And so there's a couple of things that actually going on in this arms race. First of all, the minor form pools.

610
01:03:14,139 --> 01:03:23,139
So the basic idea is that the minor collaborate with each other and they share the revenue with each other. And so like, you know, if you're pooled with many, many, many notes.

611
01:03:23,139 --> 01:03:31,139
From different people, many computers from different people, the, you know, the people can share sort of the revenue stream out of mining.

612
01:03:31,139 --> 01:03:37,139
Because they do that so cool. You know, they're more likely to actually win at once in a while.

613
01:03:37,139 --> 01:03:49,139
And, you know, of course, probabilistically, they have some chance to win. And basically, you know, spread sort of the income stream in a more stable form across all the miners in the single pool.

614
01:03:49,139 --> 01:04:06,139
And if you look online today, there are some really large pools. And I think like the free biggest pools contribute, contribute more than 50%, you know, sort of the mining power.

615
01:04:06,139 --> 01:04:17,139
Sorry. Why is this why you said that each block takes like around 10 minutes to mine even though it takes a month of CPU power.

616
01:04:17,139 --> 01:04:29,139
But yeah, on average is a month, but you're going to have to walk you know, you pick the norms, you know, you can get lucky and actually pick a non that actually allows you to solve the problem much quicker.

617
01:04:29,139 --> 01:04:44,139
Right. There's always some probability that nonsense some some big number work. And if you pick the right number, you know, you can get lucky and if many, many, many miners do that, there's actually a chance that you don't take much less than a month.

618
01:04:44,139 --> 01:04:47,139
And in fact, that's why where the 10 minutes comes from.

619
01:04:47,139 --> 01:04:57,139
Wait, so is the month more important than 10 minutes more important because it like if there was only one miner, right, I'm the expect that is one month you.

620
01:04:57,139 --> 01:04:59,139
On average, you would take one month, right?

621
01:04:59,139 --> 01:05:02,139
Yeah, but the assumption is there many, many miners.

622
01:05:02,139 --> 01:05:08,139
But what what what in it like very like if there's a lot more minor miners.

623
01:05:08,139 --> 01:05:13,139
There's a lot of variation, but on average is 10 minutes.

624
01:05:13,139 --> 01:05:17,139
So it's picked that is on average, it comes out to be 10 minutes.

625
01:05:17,139 --> 01:05:18,139
Yeah.

626
01:05:18,139 --> 01:05:23,139
Is there ever possible that like a puzzle is impossible?

627
01:05:23,139 --> 01:05:29,139
Uh, no, I don't think so. You may take a long time.

628
01:05:29,139 --> 01:05:34,139
There is going to be a.

629
01:05:34,139 --> 01:05:37,139
There's going to be you get to pick the nonsense, correct?

630
01:05:37,139 --> 01:05:47,139
And you know, there's going to be a case where the hash is going to fall, you know, within the in leading zeros.

631
01:05:47,139 --> 01:05:54,139
I'm so like how so since the value of Bitcoin is actually very, let's say volatile.

632
01:05:54,139 --> 01:05:56,139
Yes.

633
01:05:56,139 --> 01:06:03,139
And so then like how can we actually ensure that the incentive system for the miners is still adequate to keep this thing going for the future?

634
01:06:03,139 --> 01:06:09,139
I mean, since the number of like since like the reward is pre determined, let's say to be 6.25, pick points.

635
01:06:09,139 --> 01:06:15,139
What if for some reason the Bitcoin value just dropped and then the incentive is not good enough for the miners and so just they just.

636
01:06:15,139 --> 01:06:18,139
Yeah, you know, like there's roughly no value for miners to do this.

637
01:06:18,139 --> 01:06:21,139
Then you know, the Bitcoin network of collapse.

638
01:06:21,139 --> 01:06:26,139
And presumably the way this is going to work out is that the transaction fee is going to go up.

639
01:06:26,139 --> 01:06:32,139
But then if the transaction fees go up, then it will it will be a counter incentive for people who.

640
01:06:32,139 --> 01:06:40,139
Yeah, but like everybody's on the Bitcoin network, you know, you want to trade goods, you know, you have to deal with somebody on the Bitcoin network.

641
01:06:40,139 --> 01:06:48,139
So there's all kinds of sort of company completed analysis that I'm not going to like predict on like what is going to be the outcome.

642
01:06:48,139 --> 01:06:49,139
That's OK.

643
01:06:49,139 --> 01:06:58,139
I guess we've seen two 2140 and that's sort of the point where I think the reward system runs out and it's going to be all based on transaction fees.

644
01:06:58,139 --> 01:07:00,139
And we have the current rate.

645
01:07:00,139 --> 01:07:09,139
OK, so the other thing that's going on is, you know, people build special hardware.

646
01:07:09,139 --> 01:07:14,139
You know, their companies that you know, delivery you boards, you know, that are really good at fast and hashing.

647
01:07:14,139 --> 01:07:18,139
And then these are where you use by the mine pulls.

648
01:07:18,139 --> 01:07:23,139
People's right, they can have high speed links to many peers.

649
01:07:23,139 --> 01:07:26,139
So that if they find a block, they can actually get it out first.

650
01:07:26,139 --> 01:07:29,139
And so they win, etc, etc.

651
01:07:29,139 --> 01:07:35,139
So this is a, you know, if you're interested in this, you're going to need lots and lots of information about an online.

652
01:07:35,139 --> 01:07:43,139
But you know, still the system seems to be sort of hanging together.

653
01:07:43,139 --> 01:07:50,139
OK, let me talk a little bit about the whole bunch of sort of practical issues that I sort of ignored, although we touched on it a bit.

654
01:07:50,139 --> 01:08:00,139
So first 10 minutes.

655
01:08:00,139 --> 01:08:15,139
I think the 10 minutes is basically use of the time, you know, the sort of an upper bound where like if you really like this sort of 10 times the time roughly to flood the network.

656
01:08:15,139 --> 01:08:25,139
So Bitcoin wants to try to avoid, you know, these sort of privilege.

657
01:08:25,139 --> 01:08:36,139
Fibless forks were basically two notes at the same time roughly compute and therefore extend kind of the chain roughly at the same time.

658
01:08:36,140 --> 01:08:49,140
And want to try to avoid that. And so one way to avoid that is to basically give enough time to the notes to sort of get the block out to many, many, many peers.

659
01:08:49,140 --> 01:08:52,140
So that most peers actually know about it.

660
01:08:52,140 --> 01:08:58,140
And that's why it is sort of the 10 minutes comes from.

661
01:08:58,140 --> 01:09:09,140
Of course, the block size determines the the number of transactions per second.

662
01:09:09,140 --> 01:09:19,140
And the blocks actually roughly megabyte. And so, you know, you're going to do one block, you know, per roughly 10 minutes.

663
01:09:19,140 --> 01:09:30,140
Then, you know, the number of transactions is limited to the number of the number of the interaction that fit in the same walk.

664
01:09:30,140 --> 01:09:34,140
And that is the number of transactions you can do.

665
01:09:34,140 --> 01:09:44,140
And turns out that for today, you know, that the number of transactions is like in the thousands per second, you sort of work out the numbers and that's sufficient.

666
01:09:44,140 --> 01:09:52,140
And for example, there's probably, you know, the knowledge that people always make, you know, sort of bigger than the sort of visa network, you know, the more transaction of visa process.

667
01:09:52,140 --> 01:10:03,140
By far, it's only not big enough to actually, you know, basically run all transactions, you know, money transaction the world across.

668
01:10:03,140 --> 01:10:08,140
Another sort of big, you know, this come back to this in a second.

669
01:10:08,140 --> 01:10:14,140
Another sort of big issue is that changes, you know, to the protocol.

670
01:10:14,140 --> 01:10:23,140
Change required consensus.

671
01:10:23,140 --> 01:10:27,140
In some cases, this is easy, right?

672
01:10:27,140 --> 01:10:32,140
Some changes are easy.

673
01:10:32,140 --> 01:10:36,140
Everyone easy changes, for example, the number of leading zeros.

674
01:10:36,140 --> 01:10:48,140
There's basically a deterministic algorithm to compute from the past log entries, what the difficulty is going to be for future puzzles.

675
01:10:48,140 --> 01:11:00,140
And that is a deterministic function of the log, you know, there's nothing in that changes are basically an easy and there's a bunch of other parameters in the protocol that have that kind of flavor.

676
01:11:00,140 --> 01:11:11,140
Some changes, however, result in a software.

677
01:11:11,140 --> 01:11:23,140
And that's a little bit about, let's say you know, you know, the main software, the main distribution to core distribution for Bitcoin wants to make a change that there are these sort of incompatible.

678
01:11:23,140 --> 01:11:30,140
Then you're going to have old clients, clients running with the old software or peers running with the old server and new peers with the new software.

679
01:11:30,140 --> 01:11:34,140
And that will temporarily, you know, may create some forks.

680
01:11:34,140 --> 01:11:42,140
So, there's, you know, there's some communication going on and in the long run, you know, probably people will settle on the new fork.

681
01:11:42,140 --> 01:11:45,140
We have the new shopper.

682
01:11:45,140 --> 01:11:54,140
Some changes actually result in a hard fork.

683
01:11:54,140 --> 01:12:08,140
So, for example, there was a couple years ago, there was a lot of discussion about this block size, because some people in the community want to increase the block size, some other people don't want to increase the block size.

684
01:12:08,140 --> 01:12:23,140
And basically, you know, they split and there's quarters of two Bitcoin or two Bitcoin forks running.

685
01:12:23,140 --> 01:12:31,140
And so, probably more than two, but like that one was all that in a hard work and hard for it split.

686
01:12:31,140 --> 01:12:47,140
And so, sort of an interesting, you know, aspect of discoursensis, kind of that kind of systems that, you know, you're going to have these kinds of practical problems that actually can really either into software or in hard for it, or people just don't want to collaborate on a particular form.

687
01:12:47,140 --> 01:12:51,140
Any questions about this.

688
01:12:51,140 --> 01:13:01,140
What happens in hard forks like you have to do two different block change and clients have to choose in which fork they want to be.

689
01:13:01,140 --> 01:13:03,140
Interesting.

690
01:13:03,140 --> 01:13:07,140
Or publish their things actually in both.

691
01:13:07,140 --> 01:13:13,140
I mean, but you have like, I mean, say I have like a couple of Bitcoin.

692
01:13:13,140 --> 01:13:21,140
I have a couple like Bitcoin in both forks, right? But I can start spending them in either like.

693
01:13:21,140 --> 01:13:25,140
Well, you have you have Bitcoin in the prefix of the.

694
01:13:25,140 --> 01:13:26,140
Yeah, correct.

695
01:13:26,140 --> 01:13:28,140
So both both forks have the prefix.

696
01:13:28,140 --> 01:13:31,140
Yeah, you can't double spend your money.

697
01:13:31,140 --> 01:13:32,140
Huh.

698
01:13:32,140 --> 01:13:41,140
Well, so actually in the case of like when Bitcoin for there was a hard fork and they in the one of the new forks was called Bitcoin cash.

699
01:13:41,140 --> 01:13:43,140
All the tokens were duplicated.

700
01:13:43,140 --> 01:13:44,140
Yeah.

701
01:13:44,140 --> 01:13:48,140
But then the value of the tokens.

702
01:13:48,140 --> 01:13:56,140
It wasn't like you doubled your values like the price of Bitcoin decrease and then the difference in that decrease was the value of the Bitcoin cash.

703
01:13:56,140 --> 01:14:07,140
So it's think of it like a stock split like you get more tokens, but the actual value would stay the same because you're just increasing the supply of tokens.

704
01:14:07,140 --> 01:14:09,140
Okay.

705
01:14:09,140 --> 01:14:12,140
Thank you.

706
01:14:12,140 --> 01:14:19,140
Any other questions?

707
01:14:19,140 --> 01:14:20,140
Okay, good.

708
01:14:20,140 --> 01:14:28,140
Let me summarize them.

709
01:14:28,140 --> 01:14:37,140
So basically what we've seen here is going to distribute consensus.

710
01:14:37,140 --> 01:14:45,140
But in an open distributed systems, we have potentially potentially a bit of participants.

711
01:14:45,140 --> 01:14:47,140
Like see my program crash.

712
01:14:47,140 --> 01:15:11,140
Check.

713
01:15:11,140 --> 01:15:34,140
And the thing that actually is being reached consensus on this public measure or public law, if you will.

714
01:15:34,140 --> 01:15:40,140
And then the thing that I'm going to do is to get the order on the transaction ever since the beginning of time.

715
01:15:40,140 --> 01:15:51,140
And allow people to check what the balances are of every public key and avoid double spending.

716
01:15:51,140 --> 01:16:05,140
And the particular cause of the idea here is to basically just prove a work idea to determine actually who is allowed to extend the blockchain.

717
01:16:05,140 --> 01:16:07,140
Okay.

718
01:16:07,140 --> 01:16:10,140
So basically I have all I want to say.

719
01:16:10,140 --> 01:16:16,140
And so if you need to run and leave, feel free to leave. This is basically the end of this lecture.

720
01:16:16,140 --> 01:16:21,140
And anybody who wants to stay and ask more questions, please feel free to stay on first day.

721
01:16:21,140 --> 01:16:22,140
There's no lecture.

722
01:16:22,140 --> 01:16:23,140
It's a hacking day.

723
01:16:23,140 --> 01:16:30,140
As you know, the Fridays, the deadline for the final project or lap for whatever you would be doing.

724
01:16:30,140 --> 01:16:31,140
So good luck.

725
01:16:31,140 --> 01:16:34,140
You know, trying to get that work finished.

726
01:16:34,140 --> 01:16:39,140
And we'll talk in the next class meetings next Tuesday.

727
01:16:39,140 --> 01:16:44,140
Okay. Thank you.

728
01:16:44,140 --> 01:16:50,140
Could you talk a little more about the proof of stake?

729
01:16:50,140 --> 01:16:57,140
There's a sure I'm not sure you're going to have a ton of say about it.

730
01:16:57,140 --> 01:17:01,140
If you want to know any more details, you know, just Google proof of stake.

731
01:17:01,140 --> 01:17:05,140
You'll find a little bit of big coin currencies that use it.

732
01:17:05,140 --> 01:17:08,140
And I'll tell you more detail.

733
01:17:08,140 --> 01:17:16,140
But basically, you know, the power in the network is proportionate to your stake in the network.

734
01:17:16,140 --> 01:17:27,140
And the basic idea is that like if you own like whatever, 3% or 10% of all the bitcoins, you know, you get sort of to decide 10% of the new blocks.

735
01:17:27,140 --> 01:17:36,140
And you're going to have incentive, you know, the higher your stake, you know, the higher incentive the section is to play the game correctly.

736
01:17:36,140 --> 01:17:41,140
And it becomes more deterministic in that case, right?

737
01:17:41,140 --> 01:17:46,140
I'll depends on the details of the protocol.

738
01:17:46,140 --> 01:18:00,140
I don't think you know, basically there's a PR article of the meter, there's a committee election and then the committee decides on like, you know, what the next, you know, walk is and then, you know, there's a new meter in the new community election, et cetera, et cetera.

739
01:18:00,140 --> 01:18:15,140
And many aspects of that are, you know, probabilistic and randomized so that the attacker can like win the game.

740
01:18:15,140 --> 01:18:27,140
And these protocols are quite sophisticated.

741
01:18:27,140 --> 01:18:35,140
Also to be able to mine you have to have of the log to verify the transactions, right?

742
01:18:35,140 --> 01:18:37,140
Yes.

743
01:18:37,140 --> 01:18:42,140
Yeah, so the mind is a complete copy of the lock which is big advice.

744
01:18:42,140 --> 01:18:44,140
Isn't that a lot?

745
01:18:44,140 --> 01:18:46,140
I can turn down that to you now.

746
01:18:46,140 --> 01:18:49,140
Totally doable for a reasonable computer.

747
01:18:49,140 --> 01:18:51,140
Okay.

748
01:18:51,140 --> 01:18:52,140
Thank you.

749
01:18:52,140 --> 01:18:53,140
You're welcome.

750
01:18:57,140 --> 01:19:12,140
This is unrelated to the lecture, but you think it'd be possible to talk about during the class and time, like the design that the TAs and that you had for labs three and four, like, because those more open ended.

751
01:19:12,140 --> 01:19:13,140
So.

752
01:19:13,140 --> 01:19:14,140
Yeah, sure.

753
01:19:14,140 --> 01:19:15,140
Yeah, sure.

754
01:19:16,140 --> 01:19:22,140
I was not planning to, I don't know, we have time left to do so.

755
01:19:22,140 --> 01:19:25,140
First of all, not everybody has done lap four.

756
01:19:25,140 --> 01:19:33,140
And so I currently have no intention to do so, but of course you can reach out to an office hours and talk to the TAs and.

757
01:19:33,140 --> 01:19:39,140
Or you reach out later to me and we can talk about a lot of 3 and a lot for.

758
01:19:39,140 --> 01:19:41,140
Sounds good. Thank you.

759
01:19:41,140 --> 01:19:51,140
So I had a question about.

760
01:19:51,140 --> 01:19:55,140
It says it says on the paper like.

761
01:19:55,140 --> 01:19:59,140
Or rather, sorry.

762
01:19:59,140 --> 01:20:04,140
Yeah, once it wants the latest transaction, the coin is buried under enough block.

763
01:20:04,140 --> 01:20:10,140
And then the other spend transaction before it can be discarded to save this space.

764
01:20:10,140 --> 01:20:11,140
Yeah.

765
01:20:11,140 --> 01:20:18,140
Like I understood though that, you know, blockchain.

766
01:20:18,140 --> 01:20:20,140
Never really like like.

767
01:20:20,140 --> 01:20:22,140
Discards transactions.

768
01:20:22,140 --> 01:20:24,140
It keeps like a whole log of all the transactions.

769
01:20:24,140 --> 01:20:25,140
So.

770
01:20:25,140 --> 01:20:29,140
Why is this like why was this done in practice?

771
01:20:29,140 --> 01:20:33,140
To save space on the.

772
01:20:33,140 --> 01:20:41,140
To save stays on the while space compaction on the, you know, on the nodes and the might.

773
01:20:41,140 --> 01:20:47,140
So they know you have to keep track of every every transaction in the log and over every basically Bitcoin.

774
01:20:47,140 --> 01:20:50,140
They have to keep track of the last one.

775
01:20:50,140 --> 01:20:52,140
And efficient.

776
01:20:52,140 --> 01:20:56,140
So one way to think about it is sort of like, you know, you could compute the snapshot in time.

777
01:20:56,140 --> 01:21:00,140
Of all the values of all the points.

778
01:21:00,140 --> 01:21:04,140
And then you don't really have to remember the whole past.

779
01:21:04,140 --> 01:21:07,140
Who does keep the whole past then?

780
01:21:07,140 --> 01:21:09,140
Oh, yeah, they're still things.

781
01:21:09,140 --> 01:21:15,140
So the one is like, you know, when you check whether transaction is valid, you know, go use can the whole log.

782
01:21:15,140 --> 01:21:16,140
People don't do that.

783
01:21:16,140 --> 01:21:19,140
And the fact is that they're not going to be able to do that.

784
01:21:19,140 --> 01:21:25,140
So the data structure is not quite compact and has the last transaction for every.

785
01:21:25,140 --> 01:21:26,140
Unspent.

786
01:21:26,140 --> 01:21:28,140
You know, coin.

787
01:21:28,140 --> 01:21:32,140
The, you know, you can totally download the whole log.

788
01:21:32,140 --> 01:21:34,140
You know, from the, you want to from the internet.

789
01:21:34,140 --> 01:21:35,140
It is maintained.

790
01:21:35,140 --> 01:21:38,140
And note store it.

791
01:21:38,140 --> 01:21:42,140
You know, to basically the lose all the data that can.

792
01:21:42,140 --> 01:21:46,140
And theнее balance is going to basically.

793
01:21:46,140 --> 01:21:48,140
From running all the injection from beginning of time.

794
01:21:48,140 --> 01:21:50,140
Um, but.

795
01:21:50,140 --> 01:21:57,140
So, so like if people are, like, who maintains a whole block and the whole transactions, like.

796
01:21:57,140 --> 01:22:01,140
I'm happy to get it everywhere Anyway, like, everybody and I will want to when I can hook a copy of the law.

797
01:22:01,140 --> 01:22:02,140
Right.

798
01:22:02,140 --> 01:22:07,140
But most people are doing this and it's carting transactions.

799
01:22:07,140 --> 01:22:10,140
Like why would someone keep the whole like?

800
01:22:10,140 --> 01:22:21,140
This is not good enough to actually keep track of this allows you to decide where intersection was actually happening to pass, but it doesn't allow you to validate transactions.

801
01:22:21,140 --> 01:22:23,140
So you want to validate transaction you have to keep the past.

802
01:22:23,140 --> 01:22:25,140
Okay.

803
01:22:25,140 --> 01:22:27,140
Okay.

804
01:22:27,140 --> 01:22:28,140
Thanks.

805
01:22:28,140 --> 01:22:33,140
Welcome.

806
01:22:33,140 --> 01:22:37,140
Any more questions?

807
01:22:37,140 --> 01:22:40,140
Okay. Thanks.

