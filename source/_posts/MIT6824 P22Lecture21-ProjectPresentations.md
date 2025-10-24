---
title: MIT6824 P22Lecture21 ProjectPresentations
---

1
00:00:00,000 --> 00:00:16,000
So, it's 105. So, feel free to get started whenever you want to be ready.

2
00:00:16,000 --> 00:00:24,000
All right, should we start then? Please.

3
00:00:24,000 --> 00:00:34,000
All right. Hey, everyone. My name is Felipe. I'm working with Catalina. And today we're going to be presenting on our project on distributed private electronic voting.

4
00:00:34,000 --> 00:00:44,000
So, motivating this project was, you know, actually sort of sort of easy given the current events and elections that have to happen with COVID restrictions.

5
00:00:44,000 --> 00:00:59,000
So, we asked the question, you know, how would internet voting work? And we're focusing specifically on maintaining voter privacy or keeping votes private.

6
00:00:59,000 --> 00:01:14,000
And so, here's a sketch of how a voting system might work. You have a bunch of voters, in this case, you know, five, and then a vote counter. And the voters send the votes to the vote counter.

7
00:01:14,000 --> 00:01:28,000
And the vote counter is, you know, maybe they sent them encrypted or some sort of security vote counter decrypts them, make sure that each voter votes at most ones and computer winner.

8
00:01:28,000 --> 00:01:44,000
And so, you know, the key thing to notice here is that in order for the vote counter to determine that every voter votes at most ones, each vote has to be in some way linked to the voter, which is dangerous.

9
00:01:44,000 --> 00:02:05,000
And so, we're going to explain our threat model here, which is we're giving the attacker two sort of capacity or two sort of powers. The first is to create fell stop failures, but but not visiting failure. So the attacker can crash server, but it cannot sort of make make it miss behave.

10
00:02:05,000 --> 00:02:16,000
And, you know, whether it is a reasonable assumption is a question for another day, but we think there are other protocols that deal with this issues. We're not dealing with visiting failures.

11
00:02:16,000 --> 00:02:35,000
The second power we give them is to passively spy on a vote counter. And so this is problematic because as we said, votes are linked with their voters. And so a passive attacker that's that's spying on the server can sort of de-anonymize these votes.

12
00:02:35,000 --> 00:02:57,000
And so here's where we come in and present our distributed voting design. We're first going to deal with the first problem, which is, you know, the the adversary crashing the servers. And so we are going to have several vote counters. And the idea is the each voter will send their votes to all the vote counters.

13
00:02:57,000 --> 00:03:06,000
And the vote counters will use the same protocols before and compute winners, the winners. Sorry.

14
00:03:06,000 --> 00:03:19,000
And it's this is good because an other certain crash sort of like N minus one vote counters as long as one of them is up and running will be able to compute a winner.

15
00:03:19,000 --> 00:03:38,000
However, it's very, you know, arguably more unsafe for the second type of attack, which was like passively spying because as long as, you know, as the as the adversary or the attacker can compromise it even one server, you know, it can de-anonymize all the votes.

16
00:03:38,000 --> 00:03:49,000
And so that's where we're going to introduce Shemir secret sharing for Shemir secret sharing. We have a voter that's going to, you know, choose a vote at zero or one.

17
00:03:49,000 --> 00:03:59,000
And we're going to, you know, I'm not going to explain how Shemir actually works. It's a cryptographic protocol. But we're going to just, you know, show what it allows us to do.

18
00:03:59,000 --> 00:04:11,000
And you pass a vote through Shemir, where you give it two parameters, N and K, and it's going to create n parts, which allow you to recompute that the vote.

19
00:04:11,000 --> 00:04:22,000
The n parts completely random. And in fact, what is sort of powerful, but Shemir is that even K minus one shares give you no information about the original vote.

20
00:04:22,000 --> 00:04:30,000
But given K or more shares, you can use Shemir to recompute that vote.

21
00:04:30,000 --> 00:04:33,000
So we're going to go into Shemir voting scheme.

22
00:04:33,000 --> 00:04:45,000
So, you know, for the Shemir voting scheme, voting scheme. So first, all the voters are going to choose their vote and share parts to the vote countries not the complete vote on the different parts.

23
00:04:45,000 --> 00:04:55,000
And so the vote countries are going to receive the parts and when they have the parts of all the voters, they're going to sum this parts and share the sum with the vote countries.

24
00:04:55,000 --> 00:05:08,000
So here it's important to know that the sum it looks completely at random. And so by sharing it with the vote countries, the other vote countries they cannot learn anything about the parts that a received.

25
00:05:08,000 --> 00:05:14,000
So this can show us that the privacy of the voters is maintained.

26
00:05:14,000 --> 00:05:25,000
So they exchange their votes. And when a vote country has received K sums from other voters, including their part, they can finally compute the winner.

27
00:05:25,000 --> 00:05:39,000
So using Shemir's secret sharing again, that box, it will like recompute the sum. And if we get like something that is greater than half of the number of voters, then the winner is one. And if it is less than the winner would be zero.

28
00:05:39,000 --> 00:05:42,000
And yes, so we finally have a winner.

29
00:05:42,000 --> 00:05:54,000
Now some of the assumptions of our scheme are first at the voters and the vote countries all are well behave and follow the protocol and their parts some to what they say some, you know, like good intentions.

30
00:05:54,000 --> 00:06:00,000
And we only handle a fail stop failures with this scheme.

31
00:06:00,000 --> 00:06:18,000
So yeah, now to handle some of the scenarios first, if we have a unreliable network, a scenario, all of the RPC that we send in our servers are going to be sent periodically until we receive an acknowledgement that it has been received.

32
00:06:18,000 --> 00:06:27,000
And to handle vote failures, so we need to persist all of the voters like persist the parts that they computed and their vote.

33
00:06:27,000 --> 00:06:35,000
Because if we like recompute parts and then the vote countries had different parts, then the correctness of the scheme will be done and they would not be able to correct the sum.

34
00:06:35,000 --> 00:06:43,000
So it's important to like always share like parts from the same computation and not like change parts.

35
00:06:43,000 --> 00:06:50,000
Finally, to handle the vote counter failures, here we rely on Shamir secret sharing scheme.

36
00:06:50,000 --> 00:06:55,000
And so as we mentioned before, we only need K servers to compute the winner.

37
00:06:55,000 --> 00:07:01,000
So the system is a resilient to N minus K crashes of vote countries.

38
00:07:01,000 --> 00:07:09,000
And now it is demo time. So I'll stop sharing screen and share another screen.

39
00:07:09,000 --> 00:07:19,000
So here is our demo. Basically, we have five voters here. So we have three vote countries, five voters and K is equal to two.

40
00:07:19,000 --> 00:07:27,000
This means that the network is unreliable. And now if we run it.

41
00:07:27,000 --> 00:07:35,000
So we got three and we get that the winner is one. We can also crash one of the servers since K is equal to two.

42
00:07:35,000 --> 00:07:45,000
We can still compute a winner by having only two servers up. And so now if we run it, we get the winner of election is the one again.

43
00:07:45,000 --> 00:07:50,000
And this is the end of our presentation. Thank you very much for listening and we'll take some questions.

44
00:07:57,000 --> 00:08:12,000
Hopefully for you, we ask questions.

45
00:08:12,000 --> 00:08:23,000
I'm curious how extensively you tested this system. Like do you have you try in a much different field of configurations? Do you have performance numbers?

46
00:08:23,000 --> 00:08:37,000
Sure. So we did have like different sizes of we create a whole test suite and make sure to test like voter failures, server failures have different like sizes.

47
00:08:37,000 --> 00:08:56,000
And we don't have performance numbers. We didn't test that. But in terms of like failures and different like numbers of voters of vote counters. Yeah, we have a full test suite and that's we should have put the link and get a forget up, but we can send it to you if you want.

48
00:08:56,000 --> 00:09:00,000
So you can check like look over implementation.

49
00:09:00,000 --> 00:09:10,000
And testing.

50
00:09:10,000 --> 00:09:13,000
And there are no more.

51
00:09:13,000 --> 00:09:21,000
Can you say something maybe a little bit about like what I do some 6824 where you're able to apply in the system.

52
00:09:21,000 --> 00:09:25,000
Other than using the testing framework.

53
00:09:25,000 --> 00:09:28,000
I kind of do want to take this one or should I say?

54
00:09:28,000 --> 00:09:48,000
So yeah, here I guess that this is came actually comes from a piece of it from the cryptography class. And so it was fun to look at it from a different perspective. So now we're not like focusing that much on the security and it but more like, oh, what happens if the individual like servers if they fail.

55
00:09:48,000 --> 00:10:04,000
So both like handling vote, voter failures handling a vote counter failures problems with the network. I guess we didn't address specifically partitions because it would work similar to a vote country crashed.

56
00:10:04,000 --> 00:10:06,000
But yeah, it was.

57
00:10:06,000 --> 00:10:12,000
Yeah, it was fun to look at this from that perspective.

58
00:10:12,000 --> 00:10:15,000
Yeah, thanks.

59
00:10:15,000 --> 00:10:18,000
Yeah, something to say we're out of time a bit. So.

60
00:10:18,000 --> 00:10:22,000
Yeah, cool. Awesome. One nice job. Thanks for sharing.

61
00:10:22,000 --> 00:10:29,000
Okay, actually, we have a presentation on private analytics.

62
00:10:29,000 --> 00:10:34,000
If Kevin is ready to share it. Awesome. Take it away. Everybody.

63
00:10:34,000 --> 00:10:38,000
Okay, you guys can hear me and you guys can see my winner. Yes.

64
00:10:38,000 --> 00:10:40,000
Right. Okay, cool.

65
00:10:40,000 --> 00:10:50,000
Hello, everyone. I'm Kevin and today I'm going to be presenting this very creative reading system called sis. And this is a system for collecting aggregate statistics in a privacy preserving way.

66
00:10:50,000 --> 00:11:01,000
And so the last presentation was good leading to my project. So for the most part in 684, we've talked about how we can build reliable systems in the presence of visiting or fail stop failures.

67
00:11:01,000 --> 00:11:15,000
So servers can crash and clients are generally will behave. But from this talk, I hope you learned some new concepts on how you can build systems with stronger entities in the presence of visiting failures on behalf of both clients and serving the system.

68
00:11:15,000 --> 00:11:27,000
And the main tools that we're going to use to achieve these guarantees are traffic primitives such as multi party competition and zero knowledge proofs and also distributed computing primitives such as broadcast.

69
00:11:27,000 --> 00:11:38,000
Okay, so for simplicity, let's say we just want to build a system that computes songs. So we're going to have an aggregation server that stores a key value store. So the keys are just going to be indices for some statistics.

70
00:11:38,000 --> 00:11:41,000
And then the values are going to be tuples of sums.

71
00:11:41,000 --> 00:11:52,000
And then we're going to have a bunch of clients. So each client is going to have some identity say it's client IP address. It's going to have index of the statistic they want to bump. And then it's also going to have its private inputs.

72
00:11:52,000 --> 00:11:59,000
So the most straightforward thing to do is we can just have all the clients send their inputs to the server as is and it can compete the sums.

73
00:11:59,000 --> 00:12:09,000
That is this is bad because now this leaks everything right the server will learn the clients identity. It'll learn the index being bumped and learn their private input.

74
00:12:09,000 --> 00:12:15,000
So we can do a little bit better. We can compete these sums privately if we deploy to non colluding servers.

75
00:12:15,000 --> 00:12:20,000
And then we're going to have each client secret share their input to each of these servers.

76
00:12:20,000 --> 00:12:27,000
So as I said, been the previous presentation. So each server of each secret share alone leaks no information about the clients private input.

77
00:12:27,000 --> 00:12:34,000
But still the servers can add up these shares and compute a local version of the key value store.

78
00:12:34,000 --> 00:12:42,000
And the later when the servers want to recover the actual sums, they can combine their local key value stores to reconstruct the global key value store.

79
00:12:42,000 --> 00:12:48,000
And this is a little bit better. At least if one of these servers is honest and the servers are still going to learn the clients identity.

80
00:12:48,000 --> 00:12:57,000
They're still going to learn the clients index. But now instead of learning each individual clients input, they're going to learn the sums of all clients and inputs.

81
00:12:57,000 --> 00:13:04,000
Okay, so that's better. But still a problem, namely that this identity index relation can still leak a lot of information.

82
00:13:04,000 --> 00:13:10,000
So how can you fix this? We can make things anonymous. So we're still going to adapt the setup from before.

83
00:13:10,000 --> 00:13:14,000
But now we're going to give each server a public key for encryption.

84
00:13:14,000 --> 00:13:18,000
And that each client is going to encrypt each of their shares.

85
00:13:18,000 --> 00:13:25,000
And instead of having the client send their shares directly to the servers, now we're going to have a layer of forwarding proxies in between.

86
00:13:25,000 --> 00:13:32,000
And so what's going to happen is the client's going to send their encrypted shares via broadcast to these are these proxies.

87
00:13:32,000 --> 00:13:41,000
And the proxies will route each share to the respective servers. And then the aggregation can go as explain.

88
00:13:41,000 --> 00:13:43,000
And so what are the privacy guarantees here?

89
00:13:43,000 --> 00:13:52,000
If at least one of these proxies is honest, then the proxy will still learn the clients identity and it'll learn some timing information based on when the client sent the share.

90
00:13:52,000 --> 00:13:58,000
But nothing else because these encrypt shares are encrypted to the servers so they'll learn nothing from that.

91
00:13:58,000 --> 00:14:05,000
And then if at least one of the servers is honest, then the servers will also learn some timing information based on when the proxy forwarded it.

92
00:14:05,000 --> 00:14:09,000
It'll certainly learn the index of the statistic and it'll learn the sum.

93
00:14:09,000 --> 00:14:20,000
But most importantly, as long as not both a proxy and a server are compromised at the same time, then this design unlinks the identity from the index being dumped, which is exactly what we wanted.

94
00:14:20,000 --> 00:14:30,000
So this is great, but this also leads to another problem mainly that now clients can hide behind the privacy and anonymity guarantees of the system to send bad inputs.

95
00:14:30,000 --> 00:14:36,000
Right. So let's say the system expected client inputs to be zero and once will behind this real privacy.

96
00:14:36,000 --> 00:14:39,000
Now the client can send the secret share of like a billion through the system.

97
00:14:39,000 --> 00:14:45,000
And now it can undetectively skew this sum. So clearly this is bad.

98
00:14:45,000 --> 00:14:57,000
And fix this we want to make the system more robust. So what we're going to do is we're going to have each client generate what's called a zero knowledge proof or their shares and send these to the servers.

99
00:14:57,000 --> 00:15:09,000
And then when the servers collect these zero and proofs, they can interactively check that the clients inputs actually the client shares actually reconstruct to some well formed input.

100
00:15:09,000 --> 00:15:16,000
And because this proof is in zero knowledge, it leaks nothing about the input other than that it's well formed.

101
00:15:16,000 --> 00:15:22,000
And so again, our privacy properties stay the same. The proxy still learns that clients identity is still learning some timing information.

102
00:15:22,000 --> 00:15:26,000
The server learns timing information to learn index and learns the sums.

103
00:15:26,000 --> 00:15:32,000
But now we've protected the system against malicious clients because it'll only accept well formed inputs.

104
00:15:32,000 --> 00:15:43,000
And this is great. Still, there's another problem, which is that servers can crash and we can lose data. So we obviously need both servers to be online in order to reconstruct the global key value store.

105
00:15:43,000 --> 00:15:48,000
And so if we want to make this system more reliable, we can do what we know best, which is to replicate the servers.

106
00:15:48,000 --> 00:15:53,000
And so we can use a rast cyber application or we can also use primary backup style of the patient.

107
00:15:53,000 --> 00:16:01,000
And now the question is, okay, with all this replication, all this cryptographic machinery and all this message ready can we still achieve good throughput.

108
00:16:01,000 --> 00:16:08,000
And it turns out that we can actually paralyze the server step here that does proof checking aggregation, which is likely to be the bottleneck of the system.

109
00:16:08,000 --> 00:16:13,000
And so what's going to happen is the proxies are going to hash partition inputs to each of these servers.

110
00:16:13,000 --> 00:16:21,000
And then each of these servers in a sort of reduced step will combine their intermediate key value stores to reconstruct the global key value store containing all the sums.

111
00:16:21,000 --> 00:16:23,000
Okay.

112
00:16:23,000 --> 00:16:27,000
And so now the final question is, did I implement all of this before the due date?

113
00:16:27,000 --> 00:16:35,000
Unfortunately, no, but I did make it much of the way there. So I'm going to show a quick demo of the non replicated and non-polliver in a bit.

114
00:16:35,000 --> 00:16:43,000
So I'm going to quickly switch to my other laptop.

115
00:16:43,000 --> 00:16:47,000
I get to stop sharing this one first.

116
00:16:47,000 --> 00:16:52,000
Yes.

117
00:16:52,000 --> 00:16:55,000
Cool. Okay. So great.

118
00:16:55,000 --> 00:17:00,000
So on these right two terminals are going to be the servers. I'm going to run them.

119
00:17:00,000 --> 00:17:07,000
This is implemented in Rust. Now I'm going to hook up these two proxies in the middle.

120
00:17:07,000 --> 00:17:12,000
And then on the left terminal, I'm just going to simulate a thousand honest clients.

121
00:17:12,000 --> 00:17:18,000
And so what's happening is all the clients are generating their input share and generating zero knowledge proofs and send them to the proxies.

122
00:17:18,000 --> 00:17:21,000
And the proxies are simply forwarding them to the servers.

123
00:17:21,000 --> 00:17:25,000
And then here, finally, on the server side, they're going to be checking all of the proofs.

124
00:17:25,000 --> 00:17:30,000
And if the invaders are in fact, well, for them, it's going to add it to its local key value store.

125
00:17:30,000 --> 00:17:37,000
And then at some time later, when these servers want to reconstruct the final statistics, they can just combine their key value source to recover the sums.

126
00:17:37,000 --> 00:17:46,000
And that's it for my presentation. And happy to take any questions.

127
00:17:46,000 --> 00:17:54,000
Any questions from the audience?

128
00:17:54,000 --> 00:18:06,000
I guess I have a question. So like with what you implemented so far, what sort of like what point do you accept or what point do tolerate failures and like stuff like that?

129
00:18:06,000 --> 00:18:12,000
Like can you talk about the reliability of your current implementation?

130
00:18:12,000 --> 00:18:19,000
The reliability of the current implementation is not great mostly because the servers aren't complicated.

131
00:18:19,000 --> 00:18:27,000
So for the proxies, because the client's broadcast the proxies, all we require is that one of the proxies is up.

132
00:18:27,000 --> 00:18:34,000
So if we have two proxies, we have we can tolerate one failure of the proxies and we'll still get the messages to the servers.

133
00:18:34,000 --> 00:18:42,000
And if any of the servers goes down, then you're just not going to be able to reconstruct on the data for that.

134
00:18:42,000 --> 00:18:50,000
Is that only for sums or did you implemented for like any general function that operates on all those inputs?

135
00:18:50,000 --> 00:18:59,000
Yeah, for now. I've only implemented it for sums, but basically with this added a secret sharing scheme, you can compute any linear confunction you want.

136
00:18:59,000 --> 00:19:04,000
And maybe more complex ones are possible, but still haven't explored those yet.

137
00:19:04,000 --> 00:19:11,000
Turns out, at least in practice, it sounds probably get you like 90% of the way there.

138
00:19:11,000 --> 00:19:22,000
So what do you, some of the numbers looked like performance numbers. Yeah. So the main things we want to measure are for the client side client on computation and client bandwidth.

139
00:19:22,000 --> 00:19:31,000
So I have some numbers at least for client computation, generating these shares and these proofs takes like less than a few milliseconds. So it's very lightweight.

140
00:19:31,000 --> 00:19:44,000
The bandwidth is just a few kilobytes. And then for the throughput on the server side, I actually ran on EC2, but I only allocated four cores to each server because I only had 64 cores and I wanted most of them to be on the client.

141
00:19:44,000 --> 00:20:04,000
So I could remove that bottleneck. And so with four cores, I think, what is that? Probably like 1000 queries per second. And then estimating, I guess, if you parallelize by 20 servers for each logic machine, they can probably achieve close to 22,000 queries per second.

142
00:20:04,000 --> 00:20:12,000
But this is all around run on the same data center. So it doesn't factor into latency. So like the actual numbers will probably be a little bit lower than that.

143
00:20:12,000 --> 00:20:22,000
I had a question about your implementation. How did you do? So how do you actually implement your knowledge proofs and code like non theoretical?

144
00:20:22,000 --> 00:20:29,000
Yeah, that's a great question. I can send you the paper that I implemented it out of.

145
00:20:29,000 --> 00:20:38,000
But it's not too complicated. Basically, it's just a bunch of finite field operations. And so if you find your finite field library, just follow the paper and follow the steps.

146
00:20:38,000 --> 00:20:44,000
It's a somewhat straightforward from that point, as long as you can decrypt the paper.

147
00:20:44,000 --> 00:20:52,000
Okay. And is that and if it possible, it's like test that. Like, how would you know that if working or not working?

148
00:20:52,000 --> 00:21:03,000
Yeah, so I guess yeah, I only showed the simulation with honest clients, but you could also generate a submission with that with clients that are submit like bad proofs. And then you can see them being rejected.

149
00:21:03,000 --> 00:21:05,000
Okay, yeah, that makes sense.

150
00:21:11,000 --> 00:21:13,000
Thanks for your speed.

151
00:21:13,000 --> 00:21:18,000
Is the next group ready to go?

152
00:21:18,000 --> 00:21:21,000
Awesome.

153
00:21:23,000 --> 00:21:33,000
Hello, I'm Shannon and I'm making you on here. So your on ticket away.

154
00:21:33,000 --> 00:21:43,000
Thank you, Shannon. So what we talking about book at ox. Look at ox is a descriptive collaborative editor. It's similar to good ox, but just a little bit better.

155
00:21:43,000 --> 00:21:46,000
So I'm going to come from next.

156
00:21:46,000 --> 00:21:48,000
Can you like next.

157
00:21:48,000 --> 00:21:54,000
Okay. So as you have seen in this class, achieving consistency is very hard to do in a district system.

158
00:21:54,000 --> 00:22:07,000
There are many ways that consistency could go wrong. So a very simple example is if the order that you received RBC is different in each peer, you might end up with an inconsistent state.

159
00:22:07,000 --> 00:22:27,000
There's a data structure called CRDT's which we use in our system to mitigate this issue. CRDT's achieve eventual consistency by making every single operation that you make on the document globally unique, not just unique to every single peer, but globally unique.

160
00:22:27,000 --> 00:22:34,000
So if I press the letter A on my editor, it's different from Shannon or lip pressing the letter A on their editor.

161
00:22:34,000 --> 00:22:55,000
So for example, here, even if the bottom tier, for example, here, as a new turtle to a document, even if they receive remove requests from the other two gears, they will never remove the golden turtle because the operation is different from remove.

162
00:22:55,000 --> 00:23:00,000
But remove green turtle is different from remove golden turtle.

163
00:23:00,000 --> 00:23:11,000
And this, this is how we achieve eventual consistency. So from here, I believe Nick is going to talk a little bit more about what a serial how we implement certainties.

164
00:23:12,000 --> 00:23:21,000
So for who could box we chose to use a CRDT called LC, which represents a sequence of elements with variable length keys.

165
00:23:21,000 --> 00:23:28,000
So the goal is let's say we want a sequence that represents the alphabet and so far we have the letters A and C.

166
00:23:28,000 --> 00:23:37,000
So one editor might choose to try adding the letter B between them and another editor may choose to try adding the letter D after see.

167
00:23:37,000 --> 00:23:42,000
So that with eventual consistency, we'll eventually reach the state ADCD.

168
00:23:42,000 --> 00:23:47,000
So the way that LC achieves this is by using a start and an end token.

169
00:23:47,000 --> 00:23:53,000
And then it gives every character in the document, an individual token that is between the start and the end.

170
00:23:53,000 --> 00:23:56,000
So we can insert H between certain end.

171
00:23:56,000 --> 00:24:02,000
And if we want the letter I after age, then we can insert that at seven, which is between four and eight.

172
00:24:02,000 --> 00:24:06,000
So we can insert an exclamation point between I and the end of the document.

173
00:24:06,000 --> 00:24:15,000
We can insert it with the keys seven comma to to increase key link or to to create a key between two other keys that are adjacent.

174
00:24:15,000 --> 00:24:23,000
So in this way, we can always create a key between any two other keys. So we can always insert.

175
00:24:23,000 --> 00:24:31,000
And I'll seek forms well in that it reaches eventual consistency with very little effort for coordination.

176
00:24:31,000 --> 00:24:37,000
And it has some optimizations that cause the length of the keys to grow relatively slowly.

177
00:24:37,000 --> 00:24:46,000
However, some cons are that in order to support deletion of these elements, it relies on causal delivery and exactly once delivery.

178
00:24:46,000 --> 00:24:50,000
And we didn't really want to implement this since it was based off a number of other works.

179
00:24:50,000 --> 00:24:54,000
So these are slightly simpler approach, which was a deletion set.

180
00:24:54,000 --> 00:25:04,000
So this is a grow only set where we add in elements. So for instance, to delete letters H and I, we would add in 4 set and into this deletion set.

181
00:25:04,000 --> 00:25:15,000
Then this whole state becomes equivalent to just having the start and end tokens and the acclamation point at key seven to.

182
00:25:15,000 --> 00:25:32,000
So we build the book of the service similar to how we implemented KV raft. We have multiple servers multiple clients and multiple clients. They only talk to one server at a time and they continuously try the operations until they get a successful reply from the server.

183
00:25:32,000 --> 00:25:34,000
Okay.

184
00:25:34,000 --> 00:25:43,000
Clients and servers both maintain an AVL tree of characters in the document as well as our own deletion set of removed keys.

185
00:25:43,000 --> 00:25:50,000
We chose to store characters in AVL tree for I guess performance reasons.

186
00:25:50,000 --> 00:25:56,000
The chain of events gives something like this. So the client will send an insertion and deletion to the server.

187
00:25:56,000 --> 00:26:01,000
A server will update its own AVL tree and deletion set and persist that.

188
00:26:01,000 --> 00:26:08,000
And for those updates to all the other servers and clients and then the server will respond success to the light.

189
00:26:08,000 --> 00:26:16,000
So we're going to demo it. We build a very simple UI for it here.

190
00:26:16,000 --> 00:26:19,000
So, you know,

191
00:26:19,000 --> 00:26:27,000
Johan and Nick are also accessing this from different lines right now. So you can see them typing.

192
00:26:27,000 --> 00:26:35,000
You can type something else. I'm typing here.

193
00:26:35,000 --> 00:26:42,000
I think Johan is typing high. Nick is typing something here.

194
00:26:42,000 --> 00:26:56,000
We can edit each other's.

195
00:26:56,000 --> 00:27:06,000
We can edit each other's.

196
00:27:06,000 --> 00:27:14,000
We can edit each other's.

197
00:27:14,000 --> 00:27:23,000
So, I'm going to type in the text.

198
00:27:23,000 --> 00:27:31,000
I'm going to type in the text.

199
00:27:31,000 --> 00:27:38,000
I'm going to type in the text.

200
00:27:38,000 --> 00:27:48,000
So, I'm going to type in the text.

201
00:27:48,000 --> 00:27:56,000
I'm going to type in the text.

202
00:27:56,000 --> 00:28:06,000
I'm going to type in the text.

203
00:28:06,000 --> 00:28:14,000
I'm going to type in the text.

204
00:28:14,000 --> 00:28:21,000
I'm going to type in the text.

205
00:28:21,000 --> 00:28:31,000
I'm going to type in the text.

206
00:28:31,000 --> 00:28:39,000
I'm going to type in the text.

207
00:28:39,000 --> 00:28:49,000
I'm going to type in the text.

208
00:28:49,000 --> 00:28:57,000
I'm going to type in the text.

209
00:28:57,000 --> 00:29:07,000
I'm going to type in the text.

210
00:29:07,000 --> 00:29:15,000
I'll see mainly just because it was one of the first ones we found and we wanted to get started.

211
00:29:15,000 --> 00:29:25,000
So, I'm going to type in the text.

212
00:29:25,000 --> 00:29:33,000
So, I'm going to type in the text.

213
00:29:33,000 --> 00:29:43,000
I'm going to type in the text.

214
00:29:43,000 --> 00:29:51,000
I'm going to type in the text.

215
00:29:51,000 --> 00:30:01,000
I'm going to type in the text.

216
00:30:01,000 --> 00:30:09,000
I'm going to type in the text.

217
00:30:09,000 --> 00:30:19,000
I'm going to type in the text.

218
00:30:19,000 --> 00:30:27,000
I'm going to type in the text.

219
00:30:27,000 --> 00:30:37,000
I'm going to type in the text.

220
00:30:37,000 --> 00:30:45,000
I'm going to type in the text.

221
00:30:45,000 --> 00:30:55,000
I'm going to type in the text.

222
00:30:55,000 --> 00:31:03,000
I'm going to type in the text.

223
00:31:03,000 --> 00:31:25,000
I'm going to type in the text.

224
00:31:25,000 --> 00:31:35,000
I'm going to type in the text.

225
00:31:35,000 --> 00:31:43,000
I'm going to type in the text.

226
00:31:43,000 --> 00:31:53,000
I'm going to type in the text.

227
00:31:53,000 --> 00:32:01,000
I'm going to type in the text.

228
00:32:01,000 --> 00:32:19,000
I'm going to type in the text.

229
00:32:19,000 --> 00:32:39,000
I'm going to type in the text.

230
00:32:39,000 --> 00:32:49,000
I'm going to type in the text.

231
00:32:49,000 --> 00:32:57,000
I'm going to type in the text.

232
00:32:57,000 --> 00:33:07,000
I'm going to type in the text.

233
00:33:07,000 --> 00:33:15,000
I'm going to type in the text.

234
00:33:15,000 --> 00:33:25,000
I'm going to type in the text.

235
00:33:25,000 --> 00:33:33,000
I'm going to type in the text.

236
00:33:33,000 --> 00:33:51,000
I'm going to type in the text.

237
00:33:51,000 --> 00:34:01,000
I'm going to type in the text.

238
00:34:01,000 --> 00:34:09,000
I'm going to type in the text.

239
00:34:09,000 --> 00:34:19,000
I'm going to type in the text.

240
00:34:19,000 --> 00:34:27,000
I'm going to type in the text.

241
00:34:27,000 --> 00:34:37,000
I'm going to type in the text.

242
00:34:37,000 --> 00:34:45,000
I'm going to type in the text.

243
00:34:45,000 --> 00:35:03,000
I'm going to type in the text.

244
00:35:03,000 --> 00:35:13,000
I'm going to type in the text.

245
00:35:13,000 --> 00:35:21,000
I'm going to type in the text.

246
00:35:21,000 --> 00:35:31,000
I'm going to type in the text.

247
00:35:31,000 --> 00:35:39,000
I'm going to type in the text.

248
00:35:39,000 --> 00:35:49,000
I'm going to type in the text.

249
00:35:49,000 --> 00:35:57,000
I'm going to type in the text.

250
00:35:57,000 --> 00:36:07,000
I'm going to type in the text.

251
00:36:07,000 --> 00:36:15,000
I'm going to type in the text.

252
00:36:15,000 --> 00:36:25,000
I'm going to type in the text.

253
00:36:25,000 --> 00:36:33,000
I'm going to type in the text.

254
00:36:33,000 --> 00:36:43,000
I'm going to type in the text.

255
00:36:43,000 --> 00:36:51,000
I'm going to type in the text.

256
00:36:51,000 --> 00:37:01,000
I'm going to type in the text.

257
00:37:01,000 --> 00:37:09,000
I'm going to type in the text.

258
00:37:09,000 --> 00:37:19,000
I'm going to type in the text.

259
00:37:19,000 --> 00:37:27,000
I'm going to type in the text.

260
00:37:27,000 --> 00:37:37,000
I'm going to type in the text.

261
00:37:37,000 --> 00:37:45,000
I'm going to type in the text.

262
00:37:45,000 --> 00:37:55,000
I'm going to type in the text.

263
00:37:55,000 --> 00:38:03,000
I'm going to type in the text.

264
00:38:03,000 --> 00:38:13,000
I'm going to type in the text.

265
00:38:13,000 --> 00:38:21,000
I'm going to type in the text.

266
00:38:21,000 --> 00:38:31,000
I'm going to type in the text.

267
00:38:31,000 --> 00:38:39,000
I'm going to type in the text.

268
00:38:39,000 --> 00:38:49,000
I'm going to type in the text.

269
00:38:49,000 --> 00:38:57,000
I'm going to type in the text.

270
00:38:57,000 --> 00:39:07,000
I'm going to type in the text.

271
00:39:07,000 --> 00:39:15,000
I'm going to type in the text.

272
00:39:15,000 --> 00:39:25,000
I'm going to type in the text.

273
00:39:25,000 --> 00:39:33,000
I'm going to type in the text.

274
00:39:33,000 --> 00:39:43,000
I'm going to type in the text.

275
00:39:43,000 --> 00:39:51,000
I'm going to type in the text.

276
00:39:51,000 --> 00:40:01,000
I'm going to type in the text.

277
00:40:01,000 --> 00:40:09,000
I'm going to type in the text.

278
00:40:09,000 --> 00:40:19,000
I'm going to type in the text.

279
00:40:19,000 --> 00:40:27,000
I'm going to type in the text.

280
00:40:27,000 --> 00:40:37,000
I'm going to type in the text.

281
00:40:37,000 --> 00:40:45,000
I'm going to type in the text.

282
00:40:45,000 --> 00:40:55,000
I'm going to type in the text.

283
00:40:55,000 --> 00:41:03,000
I'm going to type in the text.

284
00:41:03,000 --> 00:41:13,000
I'm going to type in the text.

285
00:41:13,000 --> 00:41:21,000
I'm going to type in the text.

286
00:41:21,000 --> 00:41:31,000
I'm going to type in the text.

287
00:41:31,000 --> 00:41:39,000
I'm going to type in the text.

288
00:41:39,000 --> 00:41:49,000
I'm going to type in the text.

289
00:41:49,000 --> 00:41:57,000
I'm going to type in the text.

290
00:41:57,000 --> 00:42:07,000
I'm going to type in the text.

291
00:42:07,000 --> 00:42:15,000
I'm going to type in the text.

292
00:42:15,000 --> 00:42:25,000
I'm going to type in the text.

293
00:42:25,000 --> 00:42:33,000
I'm going to type in the text.

294
00:42:33,000 --> 00:42:43,000
I'm going to type in the text.

295
00:42:43,000 --> 00:42:51,000
I'm going to type in the text.

296
00:42:51,000 --> 00:43:11,000
I'm going to type in the text.

297
00:43:11,000 --> 00:43:21,000
I'm going to type in the text.

298
00:43:21,000 --> 00:43:29,000
I'm going to type in the text.

299
00:43:29,000 --> 00:43:39,000
I'm going to type in the text.

300
00:43:39,000 --> 00:43:47,000
I'm going to type in the text.

301
00:43:47,000 --> 00:43:57,000
I'm going to type in the text.

302
00:43:57,000 --> 00:44:07,000
I'm going to type in the text.

303
00:44:07,000 --> 00:44:15,000
I'm going to type in the text.

304
00:44:15,000 --> 00:44:25,000
I'm going to type in the text.

305
00:44:25,000 --> 00:44:33,000
I'm going to type in the text.

306
00:44:33,000 --> 00:44:43,000
I'm going to type in the text.

307
00:44:43,000 --> 00:44:51,000
I'm going to type in the text.

308
00:44:51,000 --> 00:45:01,000
I'm going to type in the text.

309
00:45:01,000 --> 00:45:09,000
I'm going to type in the text.

310
00:45:09,000 --> 00:45:19,000
I'm going to type in the text.

311
00:45:19,000 --> 00:45:27,000
I'm going to type in the text.

312
00:45:27,000 --> 00:45:37,000
I'm going to type in the text.

313
00:45:37,000 --> 00:45:45,000
I'm going to type in the text.

314
00:45:45,000 --> 00:45:55,000
I'm going to type in the text.

315
00:45:55,000 --> 00:46:03,000
I'm going to type in the text.

316
00:46:03,000 --> 00:46:13,000
I'm going to type in the text.

317
00:46:13,000 --> 00:46:21,000
I'm going to type in the text.

318
00:46:21,000 --> 00:46:31,000
I'm going to type in the text.

319
00:46:31,000 --> 00:46:39,000
I'm going to type in the text.

320
00:46:39,000 --> 00:46:49,000
I'm going to type in the text.

321
00:46:49,000 --> 00:46:57,000
I'm going to type in the text.

322
00:46:57,000 --> 00:47:07,000
I'm going to type in the text.

323
00:47:07,000 --> 00:47:15,000
I'm going to type in the text.

324
00:47:15,000 --> 00:47:25,000
I'm going to type in the text.

325
00:47:25,000 --> 00:47:33,000
I'm going to type in the text.

326
00:47:33,000 --> 00:47:43,000
I'm going to type in the text.

327
00:47:43,000 --> 00:47:51,000
I'm going to type in the text.

328
00:47:51,000 --> 00:48:01,000
I'm going to type in the text.

329
00:48:01,000 --> 00:48:09,000
I'm going to type in the text.

330
00:48:09,000 --> 00:48:19,000
I'm going to type in the text.

331
00:48:19,000 --> 00:48:27,000
I'm going to type in the text.

332
00:48:27,000 --> 00:48:37,000
I'm going to type in the text.

333
00:48:37,000 --> 00:48:45,000
I'm going to type in the text.

334
00:48:45,000 --> 00:48:55,000
I'm going to type in the text.

335
00:48:55,000 --> 00:49:03,000
I'm going to type in the text.

336
00:49:03,000 --> 00:49:13,000
I'm going to type in the text.

337
00:49:13,000 --> 00:49:21,000
I'm going to type in the text.

338
00:49:21,000 --> 00:49:31,000
I'm going to type in the text.

339
00:49:31,000 --> 00:49:39,000
I'm going to type in the text.

340
00:49:39,000 --> 00:49:49,000
I'm going to type in the text.

341
00:49:49,000 --> 00:49:57,000
I'm going to type in the text.

342
00:49:57,000 --> 00:50:07,000
I'm going to type in the text.

343
00:50:07,000 --> 00:50:15,000
This is actually connecting to an s3 bucket that we have.

344
00:50:15,000 --> 00:50:29,000
If I want to create a new key, or I need to do is say cat.

345
00:50:29,000 --> 00:50:43,000
Instead of having to use AWS's custom library in order to write a file system or do a file system operation to create a file and write to it.

346
00:50:43,000 --> 00:50:53,000
Then an s3 should show up as a new key now.

347
00:50:53,000 --> 00:51:01,000
Where does the fault tolerance part come in here?

348
00:51:01,000 --> 00:51:11,000
The fault tolerance part comes in here.

349
00:51:11,000 --> 00:51:25,000
We can slice it this 9p interface to replicate and modify services.

350
00:51:25,000 --> 00:51:35,000
If I am able to replicate all these operations to different instances of service, then the service gets replicated pretty without having to modify it at all.

351
00:51:35,000 --> 00:51:45,000
I use the name D as configuration service.

352
00:51:45,000 --> 00:51:47,000
You can think this is a kind of zookeeper.

353
00:51:47,000 --> 00:51:59,000
I replicate two different services without any modification and in memory file system and a service which exposes durable storage from local machines.

354
00:51:59,000 --> 00:52:11,000
I'll quickly show them that.

355
00:52:11,000 --> 00:52:33,000
For example, I can start off a bunch of replicas.

356
00:52:33,000 --> 00:52:45,000
If I look into the 9p namespace, you see this mammothized replica.

357
00:52:45,000 --> 00:52:59,000
I can see that we have five replicas up.

358
00:52:59,000 --> 00:53:13,000
I can read from another one of the replicas and we should get the same result out.

359
00:53:13,000 --> 00:53:23,000
I can even crash in replicas.

360
00:53:23,000 --> 00:53:33,000
Let's kill one of these guys.

361
00:53:33,000 --> 00:53:43,000
We can see that there are only four replicas left now in the name space.

362
00:53:43,000 --> 00:53:53,000
I can then write a difference to this file.

363
00:53:53,000 --> 00:54:03,000
I can see that there are only three replicas left.

364
00:54:03,000 --> 00:54:13,000
I can see that there are only three replicas left.

365
00:54:13,000 --> 00:54:23,000
I think that's sort of concludes my presentation.

366
00:54:23,000 --> 00:54:33,000
I'd be happy to say any more questions.

367
00:54:33,000 --> 00:54:37,000
Evergrette not wearing my plan nine shirt this time.

368
00:54:37,000 --> 00:54:47,000
I'm curious though.

369
00:54:47,000 --> 00:54:53,000
I worked on something that was similar earlier this semester, except there was no replication.

370
00:54:53,000 --> 00:55:01,000
I imagine there are other replication schemes that are available for this sort of a thing.

371
00:55:01,000 --> 00:55:11,000
I think there are other replicas over the same namespace that look like a small machine.

372
00:55:11,000 --> 00:55:21,000
I just did chain replication because it seemed like a simple starting point, I guess.

373
00:55:21,000 --> 00:55:31,000
I could also throw this on top of a rough computation like the F from class or anything like that.

374
00:55:31,000 --> 00:55:37,000
Does your system support adding additional replicas after it started?

375
00:55:37,000 --> 00:55:45,000
Yeah, great question. So currently no, that's a working progress.

376
00:55:45,000 --> 00:55:57,000
But yeah, currently we don't support adding additional replicas out of box.

377
00:55:57,000 --> 00:56:06,000
This is an open question. It's sort of like that you may not have this is this wasn't the express intended the purpose, but one of the things that's really cool about plan nine and 9 p is that you treat network connections like their files as well.

378
00:56:06,000 --> 00:56:14,000
So you're like you have like my my best you have from what I saw a scheduler to you that was implemented to set a files.

379
00:56:14,000 --> 00:56:22,000
Do you and this is sort of an open question because the question of whether network stuff over file interfaces is scalable is difficult to answer.

380
00:56:22,000 --> 00:56:33,000
But do you also implement this in sort of that way or do you use more traditional positive in devices to like when the clients use this thing they presume they use traditional sockets and things to communicate.

381
00:56:33,000 --> 00:56:44,000
Yeah, yeah, yeah, no good question. So yeah, everything. So all the clients and services communicate over TCP at the moment.

382
00:56:44,000 --> 00:56:51,000
And yeah, it is a good question as to whether the 9 p interface is actually going to be performed enough for what we're going to do with it.

383
00:56:51,000 --> 00:56:55,000
As far as we can see now there's not.

384
00:56:55,000 --> 00:57:05,000
So we've done some performance benchmarking to see how well like we've written a scheduler over 9 p.

385
00:57:05,000 --> 00:57:20,000
And we've done some performance benchmarking to see how it performs and it seems to not add a ton of overhead at the moment, but a we can imagine those trade off changing for different types of services and as the scheduler becomes more less of a subscriber.

386
00:57:21,000 --> 00:57:43,000
I guess I guess to clarify so sorry I'm taking up some take it up a lot of your time, but just briefly the whole 9 p if you if you were able to and this is again very open, but if you were able to treat network connections as files you have replicas right you could have something for each card and then shard network traffic over those network cards, which I guess this is serverless anyway, so probably doesn't make that much difference.

387
00:57:43,000 --> 00:57:46,000
Yeah, forget it.

388
00:57:46,000 --> 00:57:51,000
Because you already have the handles for you.

389
00:57:51,000 --> 00:57:53,000
Thank you.

390
00:57:53,000 --> 00:57:55,000
Thank you.

391
00:57:55,000 --> 00:58:00,000
All right, so let's hear about some verification stuff.

392
00:58:00,000 --> 00:58:03,000
If you're ready.

393
00:58:03,000 --> 00:58:05,000
Can you guys hear me?

394
00:58:05,000 --> 00:58:06,000
Yes.

395
00:58:06,000 --> 00:58:08,000
All right, excellent.

396
00:58:08,000 --> 00:58:15,000
So indeed, I'm going to talk to you about my project which is focused on modular verification for distributed systems.

397
00:58:15,000 --> 00:58:21,000
Let's start by answering the obvious question, which is why bother with any other stuff.

398
00:58:21,000 --> 00:58:29,000
And I think anyone that's worked on the labs for eight to four must have discovered at some point that getting distributed systems right is hard.

399
00:58:29,000 --> 00:58:33,000
There's a lot of non-atermism caused by concurrency and network failure.

400
00:58:33,000 --> 00:58:44,000
And that makes it very difficult to exhaust the test to make sure that there's no corner case bugs verification is an alternative to you know alternative approaches testing to try and get correctness.

401
00:58:44,000 --> 00:58:48,000
And in principle, it can entirely rule out bugs with verification.

402
00:58:48,000 --> 00:58:54,000
You basically mathematically model your system and improve some theorem about that model.

403
00:58:54,000 --> 00:59:03,000
And you know, one of the the downs of the verification is that it's quite a lot of work during these formal proofs is by no means easy.

404
00:59:03,000 --> 00:59:09,000
And even if it was easy verification still wouldn't be a perfect silver bullet for one in verification.

405
00:59:09,000 --> 00:59:12,000
You have to make sure that you get your specification right.

406
00:59:12,000 --> 00:59:20,000
If the mathematical theorem you're proving by your system doesn't actually say what you really wanted it to say, then what you've proved is useless.

407
00:59:20,000 --> 00:59:25,000
And relatedly, you have to make sure that the model that you have to your system is also complete.

408
00:59:25,000 --> 00:59:35,000
If you fail to model some execution that can happen reality, but that you don't consider, then your theorem won't apply to to the real world.

409
00:59:35,000 --> 00:59:42,000
And some of you that are familiar with some distributed verification work might say, oh, don't we already know how to do this.

410
00:59:42,000 --> 00:59:51,000
Indeed, distributed systems have always been hard and people have recently worked on projects to try to verify actual implementation of the service systems.

411
00:59:51,000 --> 00:59:54,000
So some of these projects include iron fleets and birdie.

412
00:59:54,000 --> 01:00:04,000
However, these projects didn't focus much on modularity or trying to prove reusable specifications for components of systems, try to build more complicated systems out of them.

413
01:00:05,000 --> 01:00:09,000
And I'd argue that that's the way that distributed systems are actually built.

414
01:00:09,000 --> 01:00:25,000
The way you build a distributed system is by oftentimes using building blocks like key value services and lock services or zookeeper and putting them together with some added code and novel functionality to build your more interesting and more useful system.

415
01:00:25,000 --> 01:00:32,000
And our sort of thesis, if you will, is that verification can and should exploit this compositionality.

416
01:00:33,000 --> 01:00:50,000
As one sort of target goal, we aim to prove specifications for clients of systems prior work like iron fleets and birdie, simply a reason about what the behavior of the actual server side to school, like, and don't explicitly model or prove anything about what the client programs actually do.

417
01:00:50,000 --> 01:00:55,000
And oftentimes there's a bit of logic in the client that's crucial for getting correctness.

418
01:00:55,000 --> 01:01:10,000
The approach we use is to use advances in concurrent separation logic, which is a compositional means of reasoning about concurrent programs that's lately become popular for popular and then demonstrate to be successful at the reason about real code.

419
01:01:10,000 --> 01:01:15,000
So the first example that we worked on was verifying a charted key value system.

420
01:01:15,000 --> 01:01:23,000
The keys in this are, you know, statically split up into shards and shards themselves can be moved between the shard servers.

421
01:01:23,000 --> 01:01:32,000
So it's very similar to lab four of eight to four, except that it's not replicated so there's no, there's no raft ring in this and it's purely in memory.

422
01:01:32,000 --> 01:01:45,000
And besides that our system also has shard servers and a coordinator server and the coordinator is the one that tells other shard servers to move shard between themselves as you know what to join or as you need to read balance.

423
01:01:45,000 --> 01:02:03,000
The top of a library that we provide and that we want to prove a specification for is you know we call it a key to clerk, which is to client object that one can use and can call these three functions on to actually interact with the server so that you know there's a put you say what value what put in the key there's a get which will return the current value in the key.

424
01:02:03,000 --> 01:02:11,000
And then there's a conditional put which will only put the new value if the old value is the expected one.

425
01:02:11,000 --> 01:02:26,000
And we aim to basically implement and implement a linearizable key value service and the proof a specification that shows it's linearizable and the way you do this and the separation logic style is basically by right amount specification to look a lot like this.

426
01:02:26,000 --> 01:02:49,000
This basically says that if you know the object CK is a key value clerk, then you have you know specifications for the put and get functions that say, for example, if you start running the put function with the precondition that K key has value w then by the end of it you'll know that K key has K as value V.

427
01:02:49,000 --> 01:02:59,000
Similarly, if you do a get and you know that key K has value V at the beginning, then that's the thing that's going to be returned and you're still going to know that that's the value of the key.

428
01:02:59,000 --> 01:03:18,000
And these specifications look pretty simple and like you know I think like of course that's what the key value service does and that's sort of the point that these top level client specifications are as simple as they can be and and basically hide all the details of the fact that there's multiple sharp servers and that this clerk library might need to talk to servers multiple times.

429
01:03:18,000 --> 01:03:35,000
If I need to refresh its information about which server owns the you know which keys and we basically you know prove the spec that allows you to forget all that and use the key values service just by calling these puts and gets and having this idealized notion of what the key value mapping actually looks like.

430
01:03:35,000 --> 01:03:39,000
So I won't talk too much more in detail about what the actual proof looks like.

431
01:03:39,000 --> 01:03:47,000
And instead of focused to should focus towards the next thing we were just doing, which is actually doing something with a bit of false tolerance to this.

432
01:03:47,000 --> 01:04:01,000
So like I mentioned the key value service itself is not replicated and isn't false tolerant and so we started by trying to figure out how to verify the simplest possible false tolerance sort of protocol and we basically started with single degree packs.

433
01:04:01,000 --> 01:04:05,000
Single degree back so as a classic protocol for getting concepts on a single value.

434
01:04:05,000 --> 01:04:17,000
So whereas with a raft you can get you replicate entire log and you keep upending new entries to log single degree packs is the the crux of multi packs and basically functions of right once register.

435
01:04:17,000 --> 01:04:29,000
If you want to set the value to something you can attempt to to write to it and if someone else beat you then you know that's too bad for you and now the values already been decided and it's never going to change again.

436
01:04:29,000 --> 01:04:38,000
So we implemented and partially verified a single degree packs of simple notation and basically prove a specification that shows that it's a right once register.

437
01:04:38,000 --> 01:04:54,000
And the key idea in the specification and the proof is that when you commit value in single degree packs you get irrevocable knowledge of what that committed value is and you basically know that from here on out if anybody else ever sees any committed value.

438
01:04:54,000 --> 01:04:58,000
And the same thing that you see right now.

439
01:04:58,000 --> 01:05:02,000
And thinking about this a little bit after we worked on the proof a bit.

440
01:05:02,000 --> 01:05:12,000
We started thinking that we sort of notice that there's a slight generalization you can do to single degree packs which we call monotone packs for lack of a better name.

441
01:05:12,000 --> 01:05:25,000
So the idea is rather than gaining knowledge about the exact value upon a commit you instead can we modify the protocol so that you only gain a knowledge about a lower bound on value.

442
01:05:25,000 --> 01:05:40,000
So basically when you commit a value for example if you commit the number 15 to this right once register rather than knowing that 15 is the only value anybody else in the future is ever going to see you'll know that any value that people see in the future as committed is going to be at least 15.

443
01:05:40,000 --> 01:05:46,000
And so of course doing this requires having some notion of what larger than actually means for the value type.

444
01:05:46,000 --> 01:06:02,000
And the key idea is a replica can always find out with the latest committed value is and choose to increase it and other replicas can continually find out larger and larger lower bounds on basically what the value so far is.

445
01:06:02,000 --> 01:06:27,000
And once we sort of came up with this idea of monotone packs we realized immediately that we can do log replication with this so the set of values V we can choose to simply be all the logs that you might want to replicate your logs of operations and we can define one log to be bigger than another one if the smaller one is a prefix of you know it's all one of the prefix about to.

446
01:06:27,000 --> 01:06:45,000
And this basically allows us to you know this sort of yields a protocol which you'll sort of have to trust me to not really showing you the code for it in which you can gain information about what the prefix of the log is and over time you can add new things to log by making it larger and larger and that's pretty much exactly what we mean when we say long replication.

447
01:06:46,000 --> 01:07:14,000
The problem with this exact protocol is that naively if we sort of implement the most naive version of this monotone taxes thing you would need to send around the full log and every single RPC in single degree taxes you send around the full value on all the RPCs and the you know trivial generalization of it to monotone taxes would have you send around the full log that's not really useful to log and get larger and larger and larger and you know the beginning of log is no longer relevant by the time everybody's agreed to commit it and and all that.

448
01:07:14,000 --> 01:07:32,000
So you could try to optimize this by only passing around a suffix of the log and indeed there's a whole you know sequence of optimizations you can make to this monotone taxos based long replication and as you start doing more and more of this you'll realize that this looked exactly like ratch and in fact.

449
01:07:32,000 --> 01:08:01,000
We aim basically to use our idea of monotone taxes not to implement a new replication protocol but rather to verify a raft like system so you know we have this proof for single degree taxes we have this clear generalization to this monotone taxes thing and our hope is that we can use the idea of monotone taxes to basically verify raft directly as opposed to relying on the much more complicated correctness arguments for raft that have been described in sort of other state machine type styles.

450
01:08:02,000 --> 01:08:20,000
So this is sort of our future work and the key takeaway I sort of want to leave leave you guys with is that reasoning both formal and informal about distributed systems should be as compositional as writing code is the way you scale writing code is modularity and that's the way reasoning should also scale.

451
01:08:22,000 --> 01:08:26,000
And that's all for my presentation i'm happy to take questions.

452
01:08:33,000 --> 01:08:45,000
If the answer is too long you cannot like link me in the chat but I was curious I know there's a class in this but do you have any resources for somebody interested in getting into at the from a software perspective like any brief recommendations.

453
01:08:46,000 --> 01:09:01,000
Are you so yeah I guess i'm not quite sure what the so are you interested in like I should mess with the effort but like if you're interested I guess in the sort of most lightweight version of verification I think daffney is a great tool to learn because it's.

454
01:09:02,000 --> 01:09:20,000
A pretty simple starting point you can write sort of real code and get a feel for things I think a lot of it a lot of verification is pretty academic and not super close to being really useful really verification like this so i'm not sure how useful it really would be for real software during just yet so the hope is that one day it will be.

455
01:09:20,000 --> 01:09:21,000
Thanks.

456
01:09:24,000 --> 01:09:29,000
Did you implement this version of taxes you're talking about.

457
01:09:30,000 --> 01:09:32,000
This monotone taxes thing.

458
01:09:32,000 --> 01:09:57,000
So yeah I implemented rather than implementing like a generic monotone taxes thing which wouldn't really make sense and go anyways I implemented directly the log replication over monotone taxes so in you know in this monotone this monotone log replication thing all the rpc center on the full log so if you run it for a long time it's going to get way too slow because the rpc's are sending too much stuff but yeah I did implement it and I think we're working on actually trying to reason about it.

459
01:09:57,000 --> 01:10:05,000
Basically did you manage to fear how forward actions that being or how well works in practice.

460
01:10:06,000 --> 01:10:12,000
So I think the exact code that we have right now is not code you want to run and my.

461
01:10:12,000 --> 01:10:21,000
In a sense it's it ought to be as performant as raft sort of is and we don't really have an optimization it's all I haven't actually bothered getting performance numbers for it at all.

462
01:10:22,000 --> 01:10:24,000
It's probably pretty slow not really sure.

463
01:10:28,000 --> 01:10:30,000
Great thank you.

464
01:10:30,000 --> 01:10:40,000
Yeah even if we verify my programs and sure all this will lock somewhere but that's here from pp2 now.

465
01:10:40,000 --> 01:10:47,000
All right number one C.

466
01:10:47,000 --> 01:11:02,000
Great so we are the pigeon protocol to me and me and Jay to me and we are we present a simple distributed file system.

467
01:11:02,000 --> 01:11:12,000
And the reason we selected a distributed file system is that users oftentimes want to sort data privately in a really accessible way without the implications of using the cloud company where you don't own your own data.

468
01:11:13,000 --> 01:11:20,000
So we wanted to create a solution where you self host your data in a fault tolerant distributed manner on commodity hardware.

469
01:11:21,000 --> 01:11:29,000
And our file system is really similar to frangipani except that it uses raft and sort of pedal and the file system is on the servers instead of the clients.

470
01:11:29,000 --> 01:11:36,000
In terms of files and parameters we also have a 44,096 byte block size and a two megabyte maximum file size.

471
01:11:37,000 --> 01:11:43,000
We theoretically have a 32 gigabyte maximum disk capacity however this is actually constrained by your RAM so if you only have eight gigabytes of RAM.

472
01:11:44,000 --> 01:11:49,000
You would have however much is left over after your after whatever your system takes up.

473
01:11:50,000 --> 01:12:03,000
And we support as many servers and clients as we can within reason obviously the more servers and clients that you add due to locking contention there will be less performance as you start to access the same file over and over again.

474
01:12:04,000 --> 01:12:18,000
And in terms of performance while we were very heavily focused on availability and crash recovery so we didn't we didn't measure performance and we think it's probably pretty bad because our system is built on top of raft which is not known to be the most performant of systems.

475
01:12:20,000 --> 01:12:22,000
So over to Jay.

476
01:12:23,000 --> 01:12:35,000
So again for performance is not the biggest thing that we have but we do have very very strong consistency guarantees in particular we enforce positive consistency which is a form of strong consistency you usually see on local file systems.

477
01:12:35,000 --> 01:12:45,000
So we enforce the invariant that after a file right after you do a successful file right any read of your previously written bytes from anywhere will return the data specified by that previous right.

478
01:12:45,000 --> 01:12:52,000
Similarly any new rights over that data will be will result in visible over rights of that data from the perspective of other readers.

479
01:12:53,000 --> 01:13:08,000
So in order to achieve this we have a data mode journal that is built into this sort of block layer that is again distributed with raft and replicated and which is effectively a right ahead log that guarantees the adamacy of rights strong semantics and the presence of crashes the same as raft pretty much.

480
01:13:08,000 --> 01:13:19,000
And also the concurrent the consistency model that we offer above so servers also in order to help with this we issued distributed blocking so we can have this very primitive block cache as you would see in a local file system.

481
01:13:19,000 --> 01:13:24,000
And also you have you know we've leases to make sure that there's mutually exclusive access to all of these blocks.

482
01:13:25,000 --> 01:13:44,000
Right so to allow our clients to use our file system we created a positive like interface where users can interact with files we mainly have four functions open closed read and write open and close our pretty explanatory they just open and close file descriptors on our file system.

483
01:13:44,000 --> 01:14:02,000
Read it just takes a file descriptor and read the fixed number of bytes at the current file position right also takes a file descriptor and read and flushes sorry right takes a file descriptor and just writes the data to the file notice.

484
01:14:02,000 --> 01:14:12,000
But it's in a different way than a normal posics right because a instead flushes the buffer copy of the file and then depends the new data on this.

485
01:14:12,000 --> 01:14:28,000
So instead of a normal posics right where we just write to a file descriptor with a buffer and the number of bytes to write it does what I just said instead and we have a demo to represent clients interactable to system.

486
01:14:28,000 --> 01:14:42,000
So this is just a quick demonstration of our files has been being run both serially and concurrently so what's going to happen is console one or I should say left console is going to open up a file called TT just testing thing.

487
01:14:42,000 --> 01:14:55,000
It's going to write something to the file and then the console on the right is going to read from it afterwards per the consistency model they should see the same thing as the left console wrote and indeed after a minute.

488
01:14:56,000 --> 01:15:14,000
We see that okay so the next thing that's going to happen is both console one and console two are going to try to flush their local copies of this file at the same time this is not a traditional posics right they're both taking the copies of the file they have and trying to put them on to disk at the same time.

489
01:15:14,000 --> 01:15:38,000
So it's sort of like two rights from offset zero one of these is going to win and we can look at the log on the left console as it commits and actually see after a moment that both transactions run concurrently they both take up different parts of the log but at the end of the day the left consoles transaction is going to win so they was completely atomic everything works.

490
01:15:44,000 --> 01:16:12,000
So I think you got muted sorry I muted due to time there are more there's some limitations and features we can add to our file system so firstly we only have one route directory so adding more will definitely be a plus next we only we should persist blocks to disk rather than RAM because that's what we're currently doing.

491
01:16:12,000 --> 01:16:37,000
That what we're doing has a lot of rights so it could be pretty bad if we just keep writing doing having a lot of rights for just one operation we also only have direct I know blocks rather than having direct and indirect I know so that would be a plus to add those and secondly there should be a better way for clients to interact with this file system so there could be a fuse layer or they could just be better pauses compliance in general.

492
01:16:38,000 --> 01:16:40,000
That concludes our presentation.

493
01:16:42,000 --> 01:16:52,000
You want to talk a little bit about how you tested this.

494
01:16:52,000 --> 01:17:09,000
Sure so we had a pretty at your recommendation we had a pretty broad set of tests we had so it's been in each component so each you know the block layer regular individual graph Q values we had the journal and we had all these things we basically mocked every layer underneath each layer we were testing and tested.

495
01:17:09,000 --> 01:17:13,000
Did sort of unit testing you can't really call unit testing once you get high enough.

496
01:17:13,000 --> 01:17:36,000
Because you're so rely on time lower layers being correct but we did as best we could from there we did integration testing and you know wrote out a set of partitions one of those partitions is sort of what you just saw the most interesting of them there were five of them you can see them in our get repository and then we also to what degree we could some this didn't necessarily entirely work just some because of some of like the time limitations that we had but.

497
01:17:36,000 --> 01:17:42,000
We also attempted to do some stress testing obviously performance numbers aren't great because it's not supposed to be great but.

498
01:17:42,000 --> 01:17:46,000
I'm just best we could so we're pretty sure this is at least correct this is verified here.

499
01:17:46,000 --> 01:18:15,000
So one interesting thing is that you're basically shooting for actually slightly stronger consistently properly to positive texture required that there's two processes ready to single file there's actually not much that actually the right texture they have to do.

500
01:18:15,000 --> 01:18:27,000
Yes, that was kind of accidental but we were so it's kind of stronger yeah it was accidental but it happened so we're like cool it worked.

501
01:18:27,000 --> 01:18:43,000
The sort of I mean I think the part of the so what sort of happened was that we guarantee we I'd possibly say guarantees I talked about but we also make the guarantee that the block rights are all time and I think that's why we get this sort of stronger consistency because of the whole journaling thing yes you could be.

502
01:18:43,000 --> 01:18:51,000
Right over written if you do it some of the same time but it's always going to be clean.

503
01:18:51,000 --> 01:18:56,000
If you have a gratitude cash you might run in and don't write immediately to the.

504
01:18:56,000 --> 01:19:00,000
Log then you might get different behaviors right.

505
01:19:00,000 --> 01:19:05,000
Right this is why we don't aggressively cash we have a flock cash of size one.

506
01:19:05,000 --> 01:19:11,000
This is.

507
01:19:11,000 --> 01:19:22,000
Awesome thank you very cool right our last group is presenting a game framework remember you're ready take it away.

508
01:19:22,000 --> 01:19:40,000
So we're sure that many of you have played multiplayer games in quarantine when you're bored so let's imagine that you are a small indie game company and you're trying to develop a most player game possibly that has either several different rooms something like chat penguin where you might interact with other people.

509
01:19:40,000 --> 01:19:47,000
So you might have to have other people in the same room or perhaps it's like matchmaking based where you're in the lobby with several other players.

510
01:19:47,000 --> 01:20:04,000
Well so traditionally how these work is that everything goes against process on one central server but that central server is a bottleneck if every single player has to connect to that server to handle the game logic that server to get a bottleneck by the number of requests that comes through.

511
01:20:04,000 --> 01:20:14,000
So what we're proposing is to create a distributed game framework that instead of that's also fault.

512
01:20:14,000 --> 01:20:22,000
So instead of having all the processing being on that central server we actually distribute the game logic processing to several different worker servers.

513
01:20:22,000 --> 01:20:33,000
So to be fall tarant so one of these like worker servers goes down we need to be able to handle that game logic and further move players to some other server workers.

514
01:20:33,000 --> 01:20:46,000
So as part of that we need to actually balance latency with fault tolerance because if we make everything strictly fault tolerance we might run into like each move taking a long time to process.

515
01:20:46,000 --> 01:20:59,000
So that's why we're introducing can we know which is our fault tarant game framework that addresses all of the previous issues with.

516
01:20:59,000 --> 01:21:09,000
So to dive into the system of our framework let's imagine the game club penguin so in club penguin a user that is assigned into one room or one region.

517
01:21:09,000 --> 01:21:19,000
It only really cares about talking and interacting with other users and the objects in that one room and they don't really need to care about anything else that's having in another room.

518
01:21:19,000 --> 01:21:25,000
So there's no reason to have the request of every user be processed by one centralized servers.

519
01:21:25,000 --> 01:21:35,000
So instead we decided that we will have all of these requests be processed across multiple workers in order to do this we have workers that are assigned to different region.

520
01:21:35,000 --> 01:21:48,000
So if a player is in one region of they might be talking with the worker that is assigned to that region. So for example in here the penguin that is in worker that is assigned to the region for worker to talk with worker to only.

521
01:21:48,000 --> 01:21:52,000
But then the one in the worker and will talk with worker and.

522
01:21:52,000 --> 01:22:03,000
So we mentioned we decided that this wouldn't the the relation between worker and regions doesn't necessarily have to be one to one mapping for some rooms that might be less popular and have less traffic.

523
01:22:03,000 --> 01:22:11,000
It's possible that a worker can handle multiple of those so there's that type of relation that we need to keep track of.

524
01:22:11,000 --> 01:22:16,000
So in order to keep track of this we do need one centralized server, which is the coordinator.

525
01:22:16,000 --> 01:22:28,000
So the coordinator will be keeping track of all these mappings and some of the mapping includes the region to worker relation as well as region the worker to their replica.

526
01:22:28,000 --> 01:22:46,000
So for the fall time aspect we have that the workers will have to replica each and surely will talk talk a little bit more about what kind of information is sent to the workers from the like to their local later.

527
01:22:46,000 --> 01:23:00,000
Additionally, the coordinator because it is that one centralized server it is also a possible failure point so we have a coordinator backup and in here the coordinator's main role is just to keep track of all of these relations of the game states.

528
01:23:00,000 --> 01:23:11,000
So information about the coordinator that changes for those relations will be sent to the coordinator backup before being process completely completely.

529
01:23:11,000 --> 01:23:34,000
So now with this although we have that one server of the bulk of the traffic for games usually is players making moves and sending requests to process those move and those are now divided across multiple workers and the coordinator is in charge of just the mapping and sending heartbeat to ensure that the workers are still alive and can handle any failure cases.

530
01:23:34,000 --> 01:23:58,000
So the case that a worker goes down we have the coordinator handling the reassignment of the players who are in that worker and because the corner manages only the region mappings is also easy for us to move around regions when one of say like one worker gets overloaded this levels to perform some amount of load balancing as we mentioned earlier.

531
01:23:58,000 --> 01:24:08,000
So we are going to talk about the developer API looks like because another key feature that we wanted was for the framework to be used for a developer trying to code and you game in it.

532
01:24:08,000 --> 01:24:16,000
So we treat the game as a state machine essentially and so any move that the player makes actually fit into one of two different types of moves.

533
01:24:16,000 --> 01:24:29,000
So in order to provide a sort of choice for the developer we have two separate commands that we expose to the developer.

534
01:24:29,000 --> 01:24:40,000
The first is send fast move so this fast move makes sure that the move gets to the replica of as soon as possible so the move gets process as fast as possible on the worker.

535
01:24:40,000 --> 01:24:53,000
And we have sensible move which actually is a more fall torrent move that we expose to the developer and this ensures this is mainly used for game critical logic changes such as say trans action.

536
01:24:53,000 --> 01:25:01,000
So if you're buying something you don't want like if you've already spent that money you want to make sure that you get like wherever you spent that money on in your game.

537
01:25:01,000 --> 01:25:21,000
And so we guarantee that if that move gets fully processed and on the game it's it's stored on both of the replicas which ensures that if the worker that you're talking to goes down and the player gets transferred to a new worker that new worker will be able to reconstruct the game including that transaction.

538
01:25:21,000 --> 01:25:26,000
Guarantee isn't done for a fast move which prioritizes the latency of my site.

539
01:25:26,000 --> 01:25:44,000
But you can also see here the move structs that the developers define are pretty general so in the game that will be that we kind of built as a toy demo for our framework is kind of a chat penguin like interface so each player is in several different.

540
01:25:45,000 --> 01:26:07,000
Room and so within each room there's a chat window that you can talk to to interact with another player so the two type of main move that you can make in this game are first like a move so a developer would just define like the x y and the user name of the player moving and so the chat message is kind of the same words just like a chat message that you send into the window.

541
01:26:07,000 --> 01:26:33,000
And so we in our game we made chat messages a stable move and move as a fast move so even if like say one move gets dropped it's okay if you're like saying new kind of teleports but we don't want chat messages to randomly disappear because they could be important messages so with that I move on to the demo which is a little bare bones but should show off the functionality.

542
01:26:38,000 --> 01:26:42,000
So we have our spring minimalist front end.

543
01:26:43,000 --> 01:26:58,000
And so when we move around the penguin we can see that it's first sends a fast move and replica that same move gets sent to the other replicas assigned to the main worker so right now we're on worker zero it gets replicated to work a one and two so we have to copy.

544
01:26:58,000 --> 01:27:26,000
And the game server then receives that change and so then it can process that locally and then if we send a chat message we also have the player username identified with the chat message is sent but this is actually a stable move so it's not visible on the blogs but stable moves wait until those move are actually replicated to the workers and it's not easy to see here because normally there might be some amount of lag.

545
01:27:29,000 --> 01:27:33,000
But when we do introduce some of my flag into the network that same one would take longer.

546
01:27:35,000 --> 01:27:39,000
And now let's move it back to some future work that we want to implement.

547
01:27:44,000 --> 01:27:56,000
In terms of the back end one additional thing that we would like to do is to allow the users to move across different rooms so right now upon a user joining the game and it being initialized there are assigned to one room.

548
01:27:57,000 --> 01:28:11,000
But ideally if they want to move across to it if they want to move to a different room then they should be able to talk to the coordinator to be like hey i'm going to go to this region now can you load up the information of the game state from that region and then also now i'm going to start talking to a new worker.

549
01:28:12,000 --> 01:28:25,000
And additionally we hinted at this earlier where we wanted to deal with region based worker load balancing so the reason why we had that why we did not go for once one mapping with worker to region was to allow for this.

550
01:28:26,000 --> 01:28:33,000
And we hope to be able to do that in order to control how much load each worker will be based with.

551
01:28:34,000 --> 01:28:37,000
Thank you.

552
01:28:43,000 --> 01:28:44,000
Oh, I have a.

553
01:28:44,000 --> 01:28:49,000
Sorry, I have a question so are you are.

554
01:28:49,000 --> 01:28:58,000
I guess you have two actions sending a message and moving so those actions are all atomic right are they like.

555
01:28:59,000 --> 01:29:00,000
Yeah.

556
01:29:01,000 --> 01:29:13,000
They get to partially processed and since they're like individual moves they most of the time they only modify like some variables and they acquire the walk on those variables.

557
01:29:16,000 --> 01:29:25,000
So you said earlier that you have the coordinator and coordinator backup and the replica is going to talk to either of them.

558
01:29:25,000 --> 01:29:35,000
What happens if you have a network partition that separates the coordinator and some set of replicas from the coordinator backup and some others that are replicas.

559
01:29:38,000 --> 01:29:49,000
So the coordinator backup indicates of a network partition the workers will be kind of lost like the coordinator is not a matter of the worker being able to talk to either the coordinator or the coordinator backup.

560
01:29:49,000 --> 01:29:57,000
They'll only be able to talk to the coordinator and if a coordinator goes down then the backup get brought up to actually start processing.

561
01:29:57,000 --> 01:30:10,000
So in that case of a network partition, I don't think we will be like the workers that are isolated and away from that coordinator will not be able to be processed with the like the coordinator itself.

562
01:30:10,000 --> 01:30:16,000
In terms of the user side like it can still be processed because the player just need to continue talking to that worker.

563
01:30:16,000 --> 01:30:23,000
It's just that if there's any changes in the region like the state of the game as a whole that will be processed yet.

564
01:30:23,000 --> 01:30:32,000
Yeah, additionally I want to know if we have like a partition the coordinator backup essentially acts as a coordinator for all the workers that it can talk to.

565
01:30:32,000 --> 01:30:39,000
And this is fine because we want the game to be like still running for all of the regions in the workers that the coordinator backup is talking to.

566
01:30:39,000 --> 01:31:01,000
This family becomes a problem when they do reunite and in this case the coordinator backup then takes all of its like data and it can send it to the coordinator and the coordinator can locally resolve it because there is kind of an original coordinator and a coordinator backup and they know that the backup was a backup of the coordinator because it's towards local.

567
01:31:02,000 --> 01:31:24,000
But if the coordinator backup becomes a coordinator then wouldn't it, for example, say, oh, I need to make sure that we have active replicas for all these rooms that the that are inside the partition wouldn't you have the same room host on both sides of the partition and be able to beverage.

568
01:31:24,000 --> 01:31:47,000
No, because each room belongs only to like one worker. So like so I guess like each room like can't like the replicas for the rooms would get abandoned so essentially what happens is like if a worker like in the case of a partition the coordinator wouldn't be able to access like a worker that's in the other partition so what happens is it.

569
01:31:47,000 --> 01:31:54,000
Oh, I think I'll like move the replicas over but because the players also can't contact a worker.

570
01:31:54,000 --> 01:32:05,000
None of the moves would be processed and so the more recent replicas after the partition heals would be prioritized when healing that network.

571
01:32:08,000 --> 01:32:16,000
Why did you decide on that API with move and sending a message.

572
01:32:16,000 --> 01:32:27,000
So specifically for this API we wanted to different types of moves to distinct types of moves to demonstrate one with the fast move and one with the stable move.

573
01:32:27,000 --> 01:32:37,000
Ideally stable move is used more like rarely and use more for transactions that where it's okay for it to take longer but we wanted to not be dropped at all.

574
01:32:37,000 --> 01:32:52,000
The easiest way to replicate this in a like a simple front end was with a chat package. It was kind of arbitrary but moves for sure should be fast because like we don't want it to be like we can players with a lot.

575
01:32:52,000 --> 01:33:00,000
Thank you.

576
01:33:00,000 --> 01:33:05,000
Thanks so much. That concludes the presentation. It's pretty job everyone. This was this is pretty exciting.

577
01:33:05,000 --> 01:33:11,000
I have one more question for an old presentation. That's possible.

578
01:33:11,000 --> 01:33:13,000
Yeah, go ahead.

579
01:33:13,000 --> 01:33:20,000
So for the leader, I'm sorry for the distributed election system.

580
01:33:20,000 --> 01:33:29,000
I'm not familiar a lot with photography but I guess the system where you sum up all the results of the election.

581
01:33:29,000 --> 01:33:49,000
I have a vote on a counter server. This wouldn't that hide group attacks. For example, if I have two servers and then I vote for different people on both servers but then I coordinate with someone else to also vote in the other way around will eventually get the same vote vector.

582
01:33:49,000 --> 01:33:59,000
I guess in this case to change the vote result or like the election result but I guess I would have acted incorrectly.

583
01:33:59,000 --> 01:34:04,000
So are there checks to make sure everybody voted correctly at each server?

584
01:34:04,000 --> 01:34:07,000
Yeah.

585
01:34:07,000 --> 01:34:15,000
Sorry. So we actually don't handle malicious voting, which was which is which is pretty big.

586
01:34:15,000 --> 01:34:21,000
And you know, arguably pretty important for a real world voting system.

587
01:34:21,000 --> 01:34:28,000
But yeah, I think like you know the scope of the project that we had and that we set out.

588
01:34:28,000 --> 01:34:31,000
It was just a little like too complicated.

589
01:34:31,000 --> 01:34:33,000
So we.

590
01:34:33,000 --> 01:35:01,000
Yeah, I think with focus more like on the distributed systems part, but if we wanted to like provide more security like in for security using for example, like an idea that we thought but then decided to not do was having like a public ledger where you can like give us your knowledge proofs that they what you're posting like adds up and is what you're saying that it is and things of this things to handle malicious participants.

591
01:35:01,000 --> 01:35:04,000
Yeah.

592
01:35:04,000 --> 01:35:07,000
So we're running a little bit late.

593
01:35:07,000 --> 01:35:09,000
Let me end the class in principle.

594
01:35:09,000 --> 01:35:12,000
Anybody wants to take a round of course, you know, feel free to stick around.

595
01:35:12,000 --> 01:35:16,000
I just wanted to say one or two things before closing since this is our last class meeting.

596
01:35:16,000 --> 01:35:20,000
First of all, I want to thank all of you for participating, even though it's another COVID semester.

597
01:35:20,000 --> 01:35:23,000
I feel I've interacted with many of you.

598
01:35:23,000 --> 01:35:29,000
Either for email or indirectly and exchange lots of information and I'd love to see you at some point in person.

599
01:35:29,000 --> 01:35:32,000
I know who you are.

600
01:35:32,000 --> 01:35:35,000
But I appreciate all the participation.

601
01:35:35,000 --> 01:35:38,000
The second thing I want to thank the TAs.

602
01:35:38,000 --> 01:35:40,000
It's an awesome set of TAs.

603
01:35:40,000 --> 01:35:42,000
You should probably have realized.

604
01:35:42,000 --> 01:35:47,000
Probably for many of you, they figured out some bugs and helped you get through the labs.

605
01:35:47,000 --> 01:35:50,000
And so I ran a plot for the TAs.

606
01:35:50,000 --> 01:35:55,000
I'm being very fortunate with this kind of quality.

607
01:35:55,000 --> 01:36:00,000
And I guess the last thing I want to say is I guess good luck and find.

608
01:36:00,000 --> 01:36:02,000
Hopefully not too bad.

609
01:36:02,000 --> 01:36:07,000
And I hope you learned something in six or four and enjoyed it at the same time.

610
01:36:07,000 --> 01:36:13,000
And anybody wants to stick around please stick around and you know, more questions you want to ask to the different teams.

611
01:36:13,000 --> 01:36:18,000
If the teams can stick around to that would be wonderful. Otherwise, well, this is the end.

612
01:36:18,000 --> 01:36:21,000
At least for the class meeting to a two four.

613
01:36:21,000 --> 01:36:24,000
Thank you all.

614
01:36:24,000 --> 01:36:27,000
Thank you.

615
01:36:27,000 --> 01:36:30,000
Thank you so much.

616
01:36:30,000 --> 01:36:32,000
Thank you.

617
01:36:32,000 --> 01:36:38,000
Thank you so much.

618
01:36:38,000 --> 01:36:41,000
Um.

619
01:36:41,000 --> 01:36:45,000
Sorry, quick question.

620
01:36:45,000 --> 01:36:48,000
One last question now.

621
01:36:48,000 --> 01:36:50,000
For real.

622
01:36:50,000 --> 01:36:55,000
I was wondering actually for logistics for the exam.

623
01:36:55,000 --> 01:36:58,000
I emailed you.

624
01:36:58,000 --> 01:37:02,000
Yeah, yeah, yeah, yeah, yeah, yeah, yeah, yeah, yeah, yeah, yeah, yeah.

625
01:37:02,000 --> 01:37:04,000
I haven't gotten to the point yet.

626
01:37:04,000 --> 01:37:06,000
We're dealing with logistics of the exam.

627
01:37:06,000 --> 01:37:07,000
Okay.

628
01:37:07,000 --> 01:37:08,000
A couple of.

629
01:37:08,000 --> 01:37:11,000
I'm aware of you and two free Alex.

630
01:37:11,000 --> 01:37:13,000
We have an extra good idea.

631
01:37:13,000 --> 01:37:15,000
We're shared in details.

632
01:37:15,000 --> 01:37:16,000
Okay.

633
01:37:16,000 --> 01:37:18,000
But we'll have it.

634
01:37:18,000 --> 01:37:19,000
Sounds good.

635
01:37:19,000 --> 01:37:22,000
I'm sure you'll reach out.

636
01:37:22,000 --> 01:37:24,000
Yeah.

637
01:37:24,000 --> 01:37:25,000
All right.

638
01:37:25,000 --> 01:37:26,000
Perfect.

639
01:37:26,000 --> 01:37:31,000
Thank you so much for everything for the class and, you know, the TAs.

640
01:37:31,000 --> 01:37:34,000
Thank you very much for.

641
01:37:34,000 --> 01:37:36,000
All the class.

642
01:37:36,000 --> 01:37:37,000
Very fun.

643
01:37:37,000 --> 01:37:39,000
I learned a lot.

644
01:37:39,000 --> 01:37:41,000
Thank you for participating.

645
01:37:41,000 --> 01:37:42,000
Asking over questions.

646
01:37:42,000 --> 01:37:44,000
Appreciate it.

647
01:37:44,000 --> 01:37:45,000
Yes, thank you.

648
01:37:45,000 --> 01:37:46,000
This was this was an awesome class.

649
01:37:46,000 --> 01:37:48,000
I really appreciate it.

650
01:37:48,000 --> 01:37:54,000
I think we're being active doing the class.

651
01:37:54,000 --> 01:37:55,000
All right.

652
01:37:55,000 --> 01:37:56,000
I guess that's probably it.

653
01:37:56,000 --> 01:38:00,000
So I guess what's the stop the recording.

