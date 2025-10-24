---
title: CS144 NetworkP715 4Nats
---

1
00:00:00,000 --> 00:00:04,360
So in this video, I'm going to talk with the details of how a NAT operates, and that is

2
00:00:04,360 --> 00:00:09,919
the rules and recommendations that are given in terms of NAT behavior for handling both

3
00:00:09,919 --> 00:00:14,960
incoming and outgoing connections, possible packets that traverse, as well as how a NAT

4
00:00:14,960 --> 00:00:17,440
responds when it's not acting as a NAT.

5
00:00:17,440 --> 00:00:26,920
To recall that a NAT, a network address translation box, will set up a mapings from internal IP address

6
00:00:26,920 --> 00:00:33,719
port pairs for transport protocol to external IP address port pairs.

7
00:00:33,719 --> 00:00:38,640
So here we have a NAT whose external IP address is 128, 34, 22, 8.

8
00:00:38,640 --> 00:00:46,799
So it has an internal interface and an external interface.

9
00:00:46,799 --> 00:00:50,280
To the external world, this NAT appears as 128, 34, 22, 8.

10
00:00:50,280 --> 00:00:57,280
To the internal world, it has another IP address, say 10.0.0.1.

11
00:00:57,280 --> 00:01:06,439
Now a host A can, by sending a TCP connection open, a send message to server S on port 80,

12
00:01:06,439 --> 00:01:12,840
the NAT will observe that will translate host A's internal address in port 10.0 to 0101, 4512,

13
00:01:12,840 --> 00:01:16,799
to the external address in port 128, 34, 22.8.

14
00:01:16,799 --> 00:01:21,840
That's going to assign an external port, in this case 6641, for this mapping, you'll

15
00:01:21,840 --> 00:01:25,159
set up this mapping.

16
00:01:25,159 --> 00:01:31,200
So one question you can ask is that if some arbitrary packet comes into the NAT, how should

17
00:01:31,200 --> 00:01:32,959
the NAT respond?

18
00:01:32,959 --> 00:01:43,479
So now if the NAT starts receiving TCP packets from 128, 34, 22.8, sorry, packets to 128, 34,

19
00:01:43,479 --> 00:01:46,560
22.8, port 66, 41, it should translate them.

20
00:01:46,560 --> 00:01:49,519
So the mapping says, now it might have restrictions on that, based on whether it's full

21
00:01:49,519 --> 00:01:52,879
cone, port restricted, etc.

22
00:01:52,879 --> 00:01:57,320
But generally speaking, packets which match this will traverse.

23
00:01:57,320 --> 00:02:05,840
But what happens if it receives a packet destined to its external address, so 128, 34, 22.8,

24
00:02:05,840 --> 00:02:13,599
and port some random port of 55,127.

25
00:02:13,599 --> 00:02:14,599
What should that do?

26
00:02:15,319 --> 00:02:18,159
Well, in the end, the NAT is itself an IP device.

27
00:02:18,159 --> 00:02:24,879
And the fact that some of its ports happen to result in translation is independent of the

28
00:02:24,879 --> 00:02:26,280
fact that the how it responds.

29
00:02:26,280 --> 00:02:30,479
So imagine that there are no port mapping setup, that there are no internal nodes to the

30
00:02:30,479 --> 00:02:33,280
NAT, that nobody had opened any connections.

31
00:02:33,280 --> 00:02:36,680
How would the NAT respond if you tried to open a connection to it?

32
00:02:36,680 --> 00:02:39,799
In this case, it responded as it always would.

33
00:02:39,800 --> 00:02:45,439
So for this particular case, I might do a connection refuse, like a reset packet, or

34
00:02:45,439 --> 00:02:49,840
depending on what message what packet comes in, it could send an ICMP error.

35
00:02:49,840 --> 00:02:55,680
And so generally speaking, the NAT behaves like a normal IP device, or an IP router, with

36
00:02:55,680 --> 00:03:05,200
the exception of when packets come to the external interface that have a mapping, or when

37
00:03:05,200 --> 00:03:09,480
packets traverse from the internal interface and generate a mapping.

38
00:03:09,479 --> 00:03:14,159
And so beside that, if you imagine if you had no such A or B, or any node behind it,

39
00:03:14,159 --> 00:03:18,919
then that behaves just like a normal IP device.

40
00:03:18,919 --> 00:03:24,639
So for example, many NATs, such as your home router, in fact run a web server on port 80.

41
00:03:24,639 --> 00:03:29,060
So if you have a home wireless router, it runs web server on port 80, which is what lets

42
00:03:29,060 --> 00:03:30,439
you configure it.

43
00:03:30,439 --> 00:03:32,879
Or sometimes it's not port 80, but some other port.

44
00:03:32,879 --> 00:03:39,120
The idea that the NAT itself can respond to connections, whether they be for a web management

45
00:03:39,120 --> 00:03:47,480
interface, or for other services, that's a perfectly reasonable and allowed behavior.

46
00:03:47,480 --> 00:03:51,520
So one question that comes up with me having that is what causes you to set up these

47
00:03:51,520 --> 00:03:52,520
mappings.

48
00:03:52,520 --> 00:03:59,640
So you can imagine in the case of UDP, this is generally when a packet comes from the

49
00:03:59,640 --> 00:04:05,719
internal interface going to something external.

50
00:04:05,719 --> 00:04:10,560
And NAT sets up a mapping, mapping that IP address port to an external IP address port.

51
00:04:10,560 --> 00:04:14,479
Of course, the NAT needs to be careful about these allocations so that it's not reusing

52
00:04:14,479 --> 00:04:15,479
them.

53
00:04:15,479 --> 00:04:26,120
TCP, well, if you see a TCP sin, then you notice that a mapping, or you could even be a little

54
00:04:26,120 --> 00:04:30,560
more liberal and say, look, if we see any TCP packets coming from inside, then we assume

55
00:04:30,560 --> 00:04:33,600
there should be a mapping and just set up the mapping.

56
00:04:33,600 --> 00:04:36,480
Here's of course a question then, so this is how you create mappings when you tear them

57
00:04:36,480 --> 00:04:37,480
down.

58
00:04:37,480 --> 00:04:44,040
Well, UDP, since there is no control sequence, generally these are on a timeout.

59
00:04:44,040 --> 00:04:45,200
Mappings are torn down on a timeout.

60
00:04:45,200 --> 00:04:49,160
You do need to reclaim them, otherwise you could run out of external ports to use.

61
00:04:49,160 --> 00:04:57,240
TCP, well, if you see a proper fin, Ack exchange to tear down the connection, then you know

62
00:04:57,240 --> 00:05:02,920
that you can garbage collect the connection state, the inter and the mapping will look more

63
00:05:02,920 --> 00:05:03,920
quickly.

64
00:05:03,920 --> 00:05:04,920
Of course, there are some edge cases here.

65
00:05:04,920 --> 00:05:06,720
You need to be sure it actually was discarded.

66
00:05:06,720 --> 00:05:12,080
You want to make sure that you don't enter some state where it's possible to lose data.

67
00:05:12,080 --> 00:05:17,000
So it turns out that there are of C's that go into detail exactly how NAT should behave.

68
00:05:17,000 --> 00:05:22,560
These behavioral recommendations came out after almost a decade of experience with these

69
00:05:22,560 --> 00:05:27,639
devices and how they can possibly disrupt applications through strange behavior.

70
00:05:27,639 --> 00:05:33,039
So there are some early documents that tried to state based on somebody who went out

71
00:05:33,039 --> 00:05:38,159
actually calling Jennings, went out basically to fries electronics and bought 25 different

72
00:05:38,159 --> 00:05:42,959
NAT boxes and just measured them and saw what they did and they did all kinds of crazy

73
00:05:42,959 --> 00:05:43,959
things.

74
00:05:43,959 --> 00:05:48,279
So based on that and based on application behavior, the ITF came up with a pair of recommendations,

75
00:05:48,279 --> 00:05:53,240
one for UDP, one for TCP, there's also for other behavioral recommendations on how

76
00:05:53,240 --> 00:05:54,240
NAT should behave.

77
00:05:54,240 --> 00:05:59,800
UDP is specified in RFC 4787.

78
00:05:59,800 --> 00:06:01,840
So here's RFC 4787.

79
00:06:01,840 --> 00:06:09,079
As you can see, it's a PASS CON practice, number 127, best current practice.

80
00:06:09,079 --> 00:06:17,560
And so generally speaking, these documents have, there's a list of terminology.

81
00:06:17,560 --> 00:06:21,960
They have a set of behavioral recommendations.

82
00:06:21,959 --> 00:06:31,620
So here for example is recommendation one or requirement one and that must have an end

83
00:06:31,620 --> 00:06:35,120
point independent mapping behavior.

84
00:06:35,120 --> 00:06:40,719
So what this means is that if we return to the terminologies to describe NATs, what

85
00:06:40,719 --> 00:06:44,959
this essentially is saying in terms of that classification terminology, if you'd read

86
00:06:44,959 --> 00:06:51,279
through the details of the document, if that NATs cannot be symmetric, in that the mapping

87
00:06:51,279 --> 00:06:56,839
and NAT creates between, for UDP, between an internal IP address port and an external IP

88
00:06:56,839 --> 00:07:00,039
address port, must be independent of what the endpoint is.

89
00:07:00,039 --> 00:07:01,319
It can't be a symmetric network.

90
00:07:01,319 --> 00:07:06,639
It sets up a new mapping for every external IP address in port because of all the ways

91
00:07:06,639 --> 00:07:09,599
in that that tends to break applications.

92
00:07:09,599 --> 00:07:13,119
So here's a second recommendation.

93
00:07:13,119 --> 00:07:20,959
Here's a recommendation that NATs have an IP address pulling behavior of paired.

94
00:07:20,959 --> 00:07:24,439
So this is for NATs that happen to actually have multiple external addresses.

95
00:07:24,439 --> 00:07:32,039
And the idea is that hey, if we can, then UDP packets coming from the same internal IP address

96
00:07:32,039 --> 00:07:35,199
should appear to have the same external IP address.

97
00:07:35,199 --> 00:07:43,719
So here's the third recommendation that requirement, which has to do with how ports are assigned.

98
00:07:43,719 --> 00:07:49,279
So it turns out historically ports 0 to 1023 were considered system services.

99
00:07:49,279 --> 00:07:55,199
So these were ports that only administrators or super users could bind to, basically,

100
00:07:55,199 --> 00:07:57,359
root on Unix systems.

101
00:07:57,359 --> 00:08:02,079
So that's why you see things like HTTP, SMTP, they're all running on these low port numbers,

102
00:08:02,079 --> 00:08:06,719
as opposed to lots of applications, stuff like BitTorrent or Skype, which run on high port

103
00:08:06,719 --> 00:08:07,719
numbers.

104
00:08:07,719 --> 00:08:09,039
And so that's this historical artifact.

105
00:08:09,039 --> 00:08:15,439
But there are some assumptions that applications have made historically based on this.

106
00:08:15,439 --> 00:08:20,399
And so what one of this requirement says is just to kind of say, we don't break things

107
00:08:20,399 --> 00:08:25,600
that if the internal port is between 0 and 1023, then the external port should be between

108
00:08:25,600 --> 00:08:26,600
0 and 1023.

109
00:08:26,600 --> 00:08:33,080
And the opposite is also true that if it's not, if it's in 1024, 65535, then the external

110
00:08:33,080 --> 00:08:35,399
should be between 65535.

111
00:08:35,399 --> 00:08:38,600
So now can I go through all of these requirements?

112
00:08:38,600 --> 00:08:42,200
What's nice actually is if you read through these documents, is it really gives you a sense

113
00:08:42,200 --> 00:08:46,040
of all of the different kinds of application expectations that there are.

114
00:08:46,040 --> 00:08:50,320
What's nice is that there are these justifications, leave an explain like, hey, there are applications

115
00:08:50,320 --> 00:08:54,120
that make these assumptions or protocols that make these assumptions.

116
00:08:54,120 --> 00:08:57,440
And therefore, the NAT needs to do this so it doesn't break those applications.

117
00:08:57,440 --> 00:09:03,600
It gives you just this nice sort of a couple of points of interesting protocol approaches

118
00:09:03,600 --> 00:09:06,160
that happen on the internet.

119
00:09:06,159 --> 00:09:10,480
Now the TCP requirements are specified in RSC 5382.

120
00:09:10,480 --> 00:09:18,000
So we can see the first requirement for TCP NAT behavior is very similar to UDP, this endpoint

121
00:09:18,000 --> 00:09:19,519
independent mapping.

122
00:09:19,519 --> 00:09:20,759
Symmetric NATs are really bad.

123
00:09:20,759 --> 00:09:23,399
They break all kinds of things, so never build a symmetric NAT.

124
00:09:23,399 --> 00:09:25,839
That's requirement number one.

125
00:09:25,839 --> 00:09:30,039
But unlike UDP, TCP has connections and so, and connection setup.

126
00:09:30,039 --> 00:09:38,879
And so there are a couple of requirements that come out for TCP that aren't present in UDP.

127
00:09:38,879 --> 00:09:42,480
For example, and this one's kind of interesting is requirement two.

128
00:09:42,480 --> 00:09:47,599
A NAT must support all valid sequences of TCP packets for connections initiated both internally

129
00:09:47,599 --> 00:09:51,079
as well as externally when the connection is permitted by the NAT.

130
00:09:51,079 --> 00:09:58,079
And the basic point here is this subpoint A, that NAT must handle TCP simultaneous open.

131
00:09:58,080 --> 00:10:02,560
So this gets back to the case you talked about NAT hole punching where it can be that two

132
00:10:02,560 --> 00:10:15,400
nodes behind NATs say A and B. They want to open connections to one another.

133
00:10:15,400 --> 00:10:17,600
They want to open a connection through the NAT.

134
00:10:17,600 --> 00:10:22,759
So what they do is they talk to some external server and their servers that provide the

135
00:10:22,759 --> 00:10:26,399
substraction things like ICE.

136
00:10:26,399 --> 00:10:29,960
Let allow them basically do some query responses to figure out what kind of NAT they're behind

137
00:10:29,960 --> 00:10:35,799
also to figure out what the external IP address in port is associated with their local IP address

138
00:10:35,799 --> 00:10:36,799
in port.

139
00:10:36,799 --> 00:10:41,799
So based on this, both A and B can figure out given their internal address in port, what's

140
00:10:41,799 --> 00:10:44,039
the external address in port.

141
00:10:44,039 --> 00:10:48,639
They somehow exchange this information through a rendezvous service.

142
00:10:48,639 --> 00:10:57,120
And then both A and B simultaneously try to open TCP connections to one another.

143
00:10:57,120 --> 00:11:03,639
Now it could be that these connections are there or the state is there.

144
00:11:03,639 --> 00:11:12,679
But the basic point is that it can very well be that B sends a sin which sets up the state

145
00:11:12,679 --> 00:11:17,719
and that sin reaches A before A has set up its translation state.

146
00:11:17,719 --> 00:11:20,359
And so the sin is not going to traverse.

147
00:11:20,359 --> 00:11:27,039
However, the state now exists on B. So B now has a translation entry.

148
00:11:27,039 --> 00:11:32,239
Now A then opens up a connection back and its sin does traverse this translation and

149
00:11:32,239 --> 00:11:37,079
now A can open a connection on B. But the thing is that this is a simultaneous open.

150
00:11:37,079 --> 00:11:39,639
B has sent a sin and the sin is outstanding.

151
00:11:39,639 --> 00:11:43,439
In terms of the TCP state diagram, it's already sent to sin.

152
00:11:43,439 --> 00:11:48,199
This is the simultaneous open when A and B sends sins to each other at the same time.

153
00:11:48,199 --> 00:11:52,279
So for peer-to-pre applications where A and B want to open a connection directly one

154
00:11:52,279 --> 00:11:58,519
another, it's important that a NAT allow this kind of TCP open.

155
00:11:58,519 --> 00:12:02,439
That it's not just that a hub, we don't support simultaneous open and so therefore we're

156
00:12:02,439 --> 00:12:07,559
not going to allow this sin to traverse because that's an incoming sin.

157
00:12:07,559 --> 00:12:10,919
But if you have a mapping, the incoming sin must be able to traverse.

158
00:12:10,919 --> 00:12:14,199
So that's what here requirement to is saying.

159
00:12:14,199 --> 00:12:19,239
But even more generally, it's saying that look, TCP has a state diagram and that you're

160
00:12:19,239 --> 00:12:23,279
supposed to be able to traverse the state diagram, to open a connection in any way that you

161
00:12:23,279 --> 00:12:26,599
want and a NAT should not restrict that.

162
00:12:26,599 --> 00:12:32,559
That is that NAT should not be somehow limiting the, be a limit the TCP implementation options.

163
00:12:32,559 --> 00:12:38,279
So here requirement three states that it should have an endpoint independent filtering

164
00:12:38,279 --> 00:12:39,279
behavior.

165
00:12:39,279 --> 00:12:43,159
So this is basically, this is back to the terminology talked about in the classification

166
00:12:43,159 --> 00:12:45,359
of NAT, this means a full cone NAT.

167
00:12:45,359 --> 00:12:50,599
That it's recommended that NATs in terms of TCP be full cone.

168
00:12:50,599 --> 00:12:55,000
And again, like the UDP recommendations, each of these behavioral recommendations, each

169
00:12:55,000 --> 00:12:56,959
of these has a justification.

170
00:12:56,959 --> 00:13:01,679
And so it can be really, very, very insightful and looming to read through what are the

171
00:13:01,679 --> 00:13:06,919
kinds of applications, what are the, sort of the edge cases that can make the NATs can

172
00:13:06,919 --> 00:13:07,919
break.

173
00:13:07,919 --> 00:13:12,519
You see a lot of them relate to peer to peer in particular voice over IP, all those kinds

174
00:13:12,519 --> 00:13:16,239
of applications where NATs work fine when simply you have a client behind the NAT opening

175
00:13:16,239 --> 00:13:20,039
connection to a server, but anything peer to peer with things behind NATs want to open

176
00:13:20,039 --> 00:13:25,599
connections to one another, you have to have an intelligent behavior and then not otherwise

177
00:13:25,599 --> 00:13:29,039
you can break those applications.

178
00:13:29,039 --> 00:13:35,360
So this one requirement for is kind of an interesting edge case, which is that so NAT must not

179
00:13:35,360 --> 00:13:39,439
respond to an unsolicited inbound sin for at least six seconds.

180
00:13:39,439 --> 00:13:42,279
So here's the, here's the case why this is important.

181
00:13:42,279 --> 00:13:47,399
Again, let's go to this example where we have ANB that are both behind NATs and they're

182
00:13:47,399 --> 00:13:50,039
trying to do a simultaneous open.

183
00:13:50,039 --> 00:13:57,000
Now it turns out that A ends up sending its simultaneous open well before B does such

184
00:13:57,000 --> 00:14:06,159
that its sin arrives before B has tried to open its connection to A.

185
00:14:06,159 --> 00:14:14,240
So if B's NAT responds with response to this unsolicited inbound sin by saying, you know,

186
00:14:14,240 --> 00:14:21,399
sorry, connection refused or by saying an ICMP error, whatever it wants to do depending

187
00:14:21,399 --> 00:14:26,959
on the circumstances, the problem then is that this might come back to the NAT and cause

188
00:14:26,959 --> 00:14:28,799
the NAT to tear down the state.

189
00:14:28,799 --> 00:14:33,919
And then when B tries to do its own simultaneous open, so here'd be the error.

190
00:14:33,919 --> 00:14:37,519
If B tries to do its own simultaneous open, that state is now torn down and that's going

191
00:14:37,519 --> 00:14:39,000
to fail.

192
00:14:39,000 --> 00:14:44,279
And so the idea here is that if B has to wait at least six seconds, the assumption is that

193
00:14:44,279 --> 00:14:48,559
B and A if they're doing a simultaneous open are going to try to do so within six seconds

194
00:14:48,559 --> 00:14:49,559
of each other.

195
00:14:49,559 --> 00:14:52,319
That's what sort of means simultaneously.

196
00:14:52,319 --> 00:14:59,879
And so the NAT will wait before issuing that response such that B has a chance to do its

197
00:14:59,879 --> 00:15:06,399
own open which could then set up the state for A.

198
00:15:06,399 --> 00:15:09,359
Note that in the second sentence, if during the interval and that receives and translates

199
00:15:09,359 --> 00:15:15,119
an outbound sin, it must suddenly drop the original unsolicited inbound sin.

200
00:15:15,120 --> 00:15:20,480
But in this case, you know, inbound sin came in, it was unsolicited, but then suddenly

201
00:15:20,480 --> 00:15:25,159
something showed that maybe it was solicited, you should just drop it.

202
00:15:25,159 --> 00:15:26,840
You shouldn't issue an error.

203
00:15:26,840 --> 00:15:31,159
You can ask the question is to whether or not you should have it traverse the NAT.

204
00:15:31,159 --> 00:15:32,480
There'll be another approach.

205
00:15:32,480 --> 00:15:35,240
You actually went back and looked through some of the archives and this just seemed to

206
00:15:35,240 --> 00:15:36,240
work pretty well.

207
00:15:36,240 --> 00:15:38,159
The mailing list archives about this discussion.

208
00:15:38,159 --> 00:15:39,159
This seemed to work pretty well.

209
00:15:39,159 --> 00:15:42,399
It means the NAT has enough to buffer these sins.

210
00:15:42,399 --> 00:15:46,759
It solves the problem and serves the least complicated answer.

211
00:15:46,759 --> 00:15:50,519
That's just a brief overview of some of the internals and NATs and their policies and

212
00:15:50,519 --> 00:15:53,600
the algorithms that they use and some of the rules that there are for their behavior to

213
00:15:53,600 --> 00:15:55,840
allow applications to work.

214
00:15:55,840 --> 00:16:00,480
If this is something interesting, I totally recommend reading these ARFCs in a bit more detail,

215
00:16:00,480 --> 00:16:05,600
especially because they give these really nice descriptions as to why these behaviors exist,

216
00:16:05,600 --> 00:16:07,519
particularly for peer-to-peer applications.

