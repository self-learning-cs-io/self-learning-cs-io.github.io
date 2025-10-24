---
title: CS144 NetworkP362 11Reliablecomm
---

1
00:00:00,000 --> 00:00:04,719
So this video I'm going to dig into the details of TCP connection setup in Teradown.

2
00:00:04,719 --> 00:00:09,000
This is a deeper look than the initial service model presented, looking at a couple of edge

3
00:00:09,000 --> 00:00:12,160
cases and the entire TCP state diagram.

4
00:00:12,160 --> 00:00:16,280
So we'll look at through a handshake, something called simultaneous open, which turns out

5
00:00:16,280 --> 00:00:20,960
to be really important today in peer-to-peer applications, and actually show the full TCP state

6
00:00:20,960 --> 00:00:23,679
machine for connection setup in Teradown.

7
00:00:23,679 --> 00:00:26,600
So the high level problem here is if we want to communicate reliably, it turns out it's

8
00:00:26,600 --> 00:00:29,520
very helpful to have state on one or both ends of the connection.

9
00:00:29,520 --> 00:00:33,920
You can, in fact, turn turns out you can communicate reliably with having something

10
00:00:33,920 --> 00:00:37,000
stateless on one end or the other, but it's much less efficient.

11
00:00:37,000 --> 00:00:38,480
Having a little bit of state is great.

12
00:00:38,480 --> 00:00:42,960
It'll make you have much better throughput, et cetera.

13
00:00:42,960 --> 00:00:46,480
But if we have this state, there's this problem of how do we set up that state?

14
00:00:46,480 --> 00:00:47,480
What is it?

15
00:00:47,480 --> 00:00:48,880
So connection establishment.

16
00:00:48,880 --> 00:00:54,120
But then also, given the states can a state take up RAM in your machine, when can your

17
00:00:54,119 --> 00:00:55,119
Teradown?

18
00:00:55,119 --> 00:00:58,719
When is, can you sort of garbage collect this state and reuse it?

19
00:00:58,719 --> 00:01:02,799
So examples of the memory structures using for your TCP connection, the buffers, or also

20
00:01:02,799 --> 00:01:04,239
the port numbers that you've used.

21
00:01:04,239 --> 00:01:08,239
So there are these problems of connection establishment and Teradown.

22
00:01:08,239 --> 00:01:19,359
So here's the standard TCP header with its standard 20 byte payload and then options.

23
00:01:19,359 --> 00:01:23,599
So for connection setup, as we've seen before, there are four parts of the header that are

24
00:01:23,599 --> 00:01:24,599
used.

25
00:01:24,599 --> 00:01:29,519
The sequence number, the acknowledgement number, the actbit, and the sin bit.

26
00:01:29,519 --> 00:01:32,519
So here I'm going to walk through the through a handshake in a little bit more detail as

27
00:01:32,519 --> 00:01:34,679
to what happens in the packets that are exchanged.

28
00:01:34,679 --> 00:01:39,560
So recall, in the standard through a handshake model, we have an active opener and a passive

29
00:01:39,560 --> 00:01:40,560
opener.

30
00:01:40,560 --> 00:01:43,799
The passive opener is sitting, listening, waiting for connection requests, such as a web

31
00:01:43,799 --> 00:01:44,799
server.

32
00:01:44,799 --> 00:01:50,919
The active opener is the one who initiates the request to start the connection.

33
00:01:50,920 --> 00:02:00,000
So in the first step, the active opener sends a TCP segment with the sin bit set to indicate

34
00:02:00,000 --> 00:02:03,400
that it's synchronizing the passive side to the beginning of its stream.

35
00:02:03,400 --> 00:02:05,840
It's saying, what is the first sequence number of my stream?

36
00:02:05,840 --> 00:02:07,920
So let's call it S sub A.

37
00:02:07,920 --> 00:02:13,960
So you do this rather than just say, assume zero for a bunch of reasons.

38
00:02:13,960 --> 00:02:18,960
Number one, it's very helpful to randomize your starting sequence number for security reasons.

39
00:02:18,960 --> 00:02:23,879
It means that people can guess where your stream starts and try to insert data on you.

40
00:02:23,879 --> 00:02:28,080
Also it's useful if there happen to be old packets flying around the internet, which sometimes

41
00:02:28,080 --> 00:02:30,439
happens you can have tremendous delays somewhere.

42
00:02:30,439 --> 00:02:34,719
If you randomize your starting sequence number, then it becomes very unlikely that some random

43
00:02:34,719 --> 00:02:42,319
segment or perhaps a corrupted segment is going to overlap your own sequence window.

44
00:02:42,319 --> 00:02:47,240
So the active side sends a sin saying, this is my starting sequence number, S sub A.

45
00:02:47,240 --> 00:02:55,200
The passive side responds also with a sin saying, okay, I'm going to synchronize you.

46
00:02:55,200 --> 00:02:59,480
My starting sequence number is that's a SAP for passive.

47
00:02:59,480 --> 00:03:02,400
But I'm also going to set the ACBIT, which means that the acknowledgment sequence number

48
00:03:02,400 --> 00:03:04,560
in the packet is valid.

49
00:03:04,560 --> 00:03:07,960
And I'm going to ACCA plus one.

50
00:03:07,960 --> 00:03:13,600
Recall that the node acknowledges not the last byte received, but rather the first byte

51
00:03:13,600 --> 00:03:14,600
that hasn't been received.

52
00:03:14,599 --> 00:03:20,439
By sending ACCA plus one, the passive side has acknowledged that it received the sin,

53
00:03:20,439 --> 00:03:26,240
which is effectively byte S sub A. The active side then responds.

54
00:03:26,240 --> 00:03:28,439
It doesn't need to send a sin because it's synchronized.

55
00:03:28,439 --> 00:03:37,359
So it sends a packet with sequence number SP plus one that's commonly that was used.

56
00:03:37,360 --> 00:03:49,380
And AC, I'm sorry, sends a packet with S A plus one, and AC SP plus one.

57
00:03:49,380 --> 00:03:53,540
And so now it's acknowledging saying, I have received your sin and I'm acknowledging

58
00:03:53,540 --> 00:03:54,540
that.

59
00:03:54,540 --> 00:03:58,800
Now this initial packet, the sequence number is SA plus one, but it tends to be of zero

60
00:03:58,800 --> 00:04:00,920
length.

61
00:04:00,920 --> 00:04:05,200
So if there were a byte in the packet, it would be SA plus one.

62
00:04:05,200 --> 00:04:06,200
But it's not.

63
00:04:06,200 --> 00:04:07,200
And so it's of length zero.

64
00:04:07,199 --> 00:04:09,159
It's just a simple control packet.

65
00:04:09,159 --> 00:04:14,539
And so there's the sequence number of which the bytes would start, but there are no bytes.

66
00:04:14,539 --> 00:04:16,560
So that's the basic connection setup.

67
00:04:16,560 --> 00:04:23,759
Sin, sin, AC, AC, A plus one, P, P plus one, and then an empty segment just for connection

68
00:04:23,759 --> 00:04:25,919
establishment.

69
00:04:25,919 --> 00:04:28,599
So it turns out TCP also supports another way of opening a connection.

70
00:04:28,599 --> 00:04:32,120
Something that's called simultaneous open, which as I said is used a lot as we'll see

71
00:04:32,120 --> 00:04:35,240
later in the course in peer-to-peer applications.

72
00:04:35,240 --> 00:04:39,800
It's a reverse thing called network address translation boxes.

73
00:04:39,800 --> 00:04:44,800
And so the way simultaneous open works is this happens if both the active, if the two sides,

74
00:04:44,800 --> 00:04:48,960
we call them active and passive, but now they're really both active, both know each other's

75
00:04:48,960 --> 00:04:49,960
port numbers.

76
00:04:49,960 --> 00:04:55,160
So the note on the left knows that the port that the note on the right is issuing a connection

77
00:04:55,160 --> 00:04:56,160
request from.

78
00:04:56,160 --> 00:04:58,639
The note on the right knows the same for the note on the left.

79
00:04:58,639 --> 00:05:00,480
And so they're using the correct port numbers.

80
00:05:00,480 --> 00:05:04,480
And they do this to negotiate the SA beforehand.

81
00:05:04,480 --> 00:05:11,000
So what happens with simultaneous open is both sides send sins at the same time.

82
00:05:11,000 --> 00:05:14,759
And so here the one on the left sends a sin.

83
00:05:14,759 --> 00:05:17,000
Let's call it just S, S, A again.

84
00:05:17,000 --> 00:05:18,000
S, A.

85
00:05:18,000 --> 00:05:25,520
But at the same time, the note on the right sends a sin, S, P. Well, the note on the left

86
00:05:25,519 --> 00:05:40,680
responds and it sends sin, S, S, A, A, S, P plus one.

87
00:05:40,680 --> 00:05:50,399
Similarly the note on the right responds with sin, S, P, A, S, A, plus one.

88
00:05:50,399 --> 00:05:52,079
At this point, we've now established the connection.

89
00:05:52,079 --> 00:05:53,079
Both sides are synchronized.

90
00:05:53,079 --> 00:05:55,719
The starting sequence numbers, they've acknowledged that.

91
00:05:55,719 --> 00:05:58,399
Note that this takes four messages rather than three.

92
00:05:58,399 --> 00:06:02,319
So let's see this just to standard through a handshake and practice.

93
00:06:02,319 --> 00:06:08,079
So here I've opened up Warrashark, filtering on port 80 and a certain IP address.

94
00:06:08,079 --> 00:06:13,039
And so I'm just going to tell net to port 80 on that host and we'll see the sin, sin

95
00:06:13,039 --> 00:06:14,799
act, act set up.

96
00:06:14,799 --> 00:06:15,799
So there it is.

97
00:06:15,799 --> 00:06:19,519
So here's the first packet sent from my host to the destination.

98
00:06:19,519 --> 00:06:27,240
And we see that it's an HTTP port 80 sin sequence number zero and there's no act set.

99
00:06:27,240 --> 00:06:28,240
There's no act bit.

100
00:06:28,240 --> 00:06:31,159
And so the acknowledgement fields and valets is not displayed.

101
00:06:31,159 --> 00:06:33,560
Now it turns out the sequence number in this packet isn't actually zero.

102
00:06:33,560 --> 00:06:37,879
What tools like Warrashark do just to make things easier to read is they use relative sequence

103
00:06:37,879 --> 00:06:38,879
numbers.

104
00:06:38,879 --> 00:06:43,439
They show you what the sequence number is relative to the beginning of the stream.

105
00:06:43,439 --> 00:06:46,560
And since we're just starting the scene, we see sequence number zero.

106
00:06:46,560 --> 00:06:48,560
We dig inside the packet down here at the bottom.

107
00:06:48,560 --> 00:06:54,280
You can see where Warrashark tells you sequence number zero relative sequence number.

108
00:06:54,280 --> 00:06:59,000
And if we then look at the actual field, it's CCBD1DBB.

109
00:06:59,000 --> 00:07:02,360
And so it's much larger than zero.

110
00:07:02,360 --> 00:07:06,199
Now what we then see is for the second packet that's acknowledging this, it's going to

111
00:07:06,199 --> 00:07:12,879
acknowledge with CCBD1DBC.

112
00:07:12,879 --> 00:07:16,040
Here again, it's using relative act numbers, but that's what we see.

113
00:07:16,040 --> 00:07:19,080
CCBD1DBC.

114
00:07:19,080 --> 00:07:20,760
It's also sending a sin.

115
00:07:20,760 --> 00:07:22,920
So here's the sin act.

116
00:07:22,920 --> 00:07:30,200
And so the sequence number again, a relative sequence number of zero, but it's 341135AE.

117
00:07:30,200 --> 00:07:32,520
So this is from my host to the server.

118
00:07:32,520 --> 00:07:34,800
This is the server back of the sin act.

119
00:07:34,800 --> 00:07:37,240
Then my host responds to the an act.

120
00:07:37,240 --> 00:07:40,600
And so you can see sequence number one, acknowledgement number one.

121
00:07:40,600 --> 00:07:43,320
So it's acknowledging the sin that was sent from the server.

122
00:07:43,319 --> 00:07:46,759
And it gives a sequence number one, but it's a length of zero.

123
00:07:46,759 --> 00:07:50,879
And so it's saying, aha, you know, I, this packet contains the stream starting at byte

124
00:07:50,879 --> 00:07:52,040
one, but there's nothing in it.

125
00:07:52,040 --> 00:07:53,759
So there's actually no data.

126
00:07:53,759 --> 00:07:55,959
So there we see a simple three way hand shake.

127
00:07:55,959 --> 00:07:58,319
So now let's look at a TSP connection when there is data.

128
00:07:58,319 --> 00:08:02,159
So we're going to see the sin, sin act, and then some data communication.

129
00:08:02,159 --> 00:08:07,560
So I can do the same things before except this time rather than tell netting to port 80 where

130
00:08:07,560 --> 00:08:11,959
there's no data transfer, I'm just going to do a standard web request to port 80.

131
00:08:11,959 --> 00:08:20,919
And so here we see a TSP connection.

132
00:08:20,919 --> 00:08:24,240
And so here we have the sin sin act act.

133
00:08:24,240 --> 00:08:28,439
So now the connection is then established and then data transmission starts.

134
00:08:28,439 --> 00:08:31,519
And so here's a packet showing its HTTP.

135
00:08:31,519 --> 00:08:38,000
And if we look inside this particular TSP segment, see sequence number one.

136
00:08:38,000 --> 00:08:40,000
So it's the start of the data stream.

137
00:08:40,000 --> 00:08:41,399
Now length 474.

138
00:08:41,399 --> 00:08:45,639
So this particular chunk of data was 474 bytes long.

139
00:08:45,639 --> 00:08:48,480
So the next sequence number would be 475.

140
00:08:48,480 --> 00:08:50,440
Still act one.

141
00:08:50,440 --> 00:08:53,879
And so there's the data that we're sending as there's request to the web server, then the

142
00:08:53,879 --> 00:08:58,000
web server responds and responds with act 475.

143
00:08:58,000 --> 00:08:59,000
Right.

144
00:08:59,000 --> 00:09:02,840
So at the next byte to expect is 475.

145
00:09:02,840 --> 00:09:04,320
But sequence number one.

146
00:09:04,320 --> 00:09:06,159
So this is just length zero.

147
00:09:06,159 --> 00:09:08,720
This act, it has no data in it.

148
00:09:08,720 --> 00:09:12,680
This was recall sort of off just an act packet.

149
00:09:12,680 --> 00:09:18,320
And so it has no TSP segment data, but is acknowledging the data that it's received.

150
00:09:18,320 --> 00:09:21,879
The next packet though from the server actually has data in it.

151
00:09:21,879 --> 00:09:25,240
So you can see here length 1448, but sequence number one.

152
00:09:25,240 --> 00:09:31,040
So it's one to 1449.

153
00:09:31,040 --> 00:09:32,519
And here's the next TCP segment.

154
00:09:32,519 --> 00:09:38,399
And then we see here putting that together, there's the HTTP response, which it's put together.

155
00:09:38,399 --> 00:09:40,439
And so there we see the connection to establishment.

156
00:09:40,439 --> 00:09:44,240
And now the sequence and acknowledgement number spaces are walking forward according

157
00:09:44,240 --> 00:09:45,639
to the data communication.

158
00:09:45,639 --> 00:09:49,399
So next we're going to look at how TCP tears down a connection.

159
00:09:49,399 --> 00:09:54,319
Like a connection setup, this uses the sequence number and acknowledgement number fields.

160
00:09:54,319 --> 00:09:58,399
But unlike connection setup, which uses the synchronization bit to synchronize sequence

161
00:09:58,399 --> 00:10:02,360
numbers, connection turned on uses the fin bit to denote that there's no word data sense.

162
00:10:02,360 --> 00:10:04,840
It uses the act and fin bits.

163
00:10:04,840 --> 00:10:09,040
And so when TCP sends a packet with a fin bit, what this means is that that sender has

164
00:10:09,040 --> 00:10:10,280
no more data descent.

165
00:10:10,280 --> 00:10:12,120
This is the end of the stream.

166
00:10:12,120 --> 00:10:17,920
This is cause when you say call close or shutdown in the application.

167
00:10:17,920 --> 00:10:22,040
But TCP connections like most reliable connections are bidirectional.

168
00:10:22,040 --> 00:10:26,639
And so it's not until both sides have nothing to send that you actually terminate the connection

169
00:10:26,639 --> 00:10:30,800
because it's going to be one side it's done, but the other side has more to send.

170
00:10:30,800 --> 00:10:34,200
And so it's not until both sides have finned and you've acknowledged those that you can

171
00:10:34,200 --> 00:10:35,520
tear things down.

172
00:10:35,520 --> 00:10:41,200
So a typical tear down exchange looks like this where we say if A and B who are communicating

173
00:10:41,200 --> 00:10:43,040
and A closes first.

174
00:10:43,040 --> 00:10:48,640
And so it sends a packet with the fin bit with sequence number s sub A and acknowledging

175
00:10:48,640 --> 00:10:50,440
a s sub B.

176
00:10:50,440 --> 00:10:53,160
B then sends a packet to acknowledge this fin.

177
00:10:53,160 --> 00:10:56,200
So acts s sub A plus one.

178
00:10:56,200 --> 00:10:59,400
Then at some point later, B decides it needs to close its side of the connection.

179
00:10:59,399 --> 00:11:04,879
So it sends a fin sequence number s sub B, acknowledgement s sub one, it's still acknowledging

180
00:11:04,879 --> 00:11:06,480
s A plus one.

181
00:11:06,480 --> 00:11:09,879
Which then A responds saying A, I'll acknowledge s B plus one.

182
00:11:09,879 --> 00:11:14,840
So fin like sin represents of the last bite of the connection, the way that you like sin

183
00:11:14,840 --> 00:11:19,159
represents the first bite of the way you acknowledge is by acknowledging plus one.

184
00:11:19,159 --> 00:11:23,079
With fin, you acknowledge you received a by acknowledging plus one.

185
00:11:23,079 --> 00:11:27,199
Of course, you can also have simultaneous close where they send the fins in parallel

186
00:11:27,200 --> 00:11:30,680
and the same exchange occurs.

187
00:11:30,680 --> 00:11:31,680
Great.

188
00:11:31,680 --> 00:11:34,680
So now we've exchanged these messages and we've acknowledged them.

189
00:11:34,680 --> 00:11:36,280
When can we actually tear down the connection?

190
00:11:36,280 --> 00:11:38,720
When can we actually delete the state?

191
00:11:38,720 --> 00:11:40,840
When can we reuse the ports?

192
00:11:40,840 --> 00:11:41,840
This turns out to be non-trivial.

193
00:11:41,840 --> 00:11:43,840
You can't do it immediately.

194
00:11:43,840 --> 00:11:48,080
So for example, what happens if this final act is lost in the network?

195
00:11:48,080 --> 00:11:55,240
So I've sent fin, then I receive a fin and I act it, I can't immediately tear down my

196
00:11:55,240 --> 00:11:58,820
connection because what happens if that act is lost, the other side is never going to

197
00:11:58,820 --> 00:12:04,120
hear it, it's never going to know whether the connection was torn down.

198
00:12:04,120 --> 00:12:08,680
Another issue is it could be that we do a fin, fin act and acknowledge and tear down and

199
00:12:08,680 --> 00:12:13,440
then these same port pair, the same port pair is used immediately for a new connection.

200
00:12:13,440 --> 00:12:17,759
We want to make sure that we don't by accident then corrupt the data because the sequence

201
00:12:17,759 --> 00:12:20,200
number spaces overlap.

202
00:12:20,200 --> 00:12:24,560
So a solution that's used is the active closer goes into something called time weight.

203
00:12:24,639 --> 00:12:29,319
But this means that if I'm the person who sends the fin first, then once the connection

204
00:12:29,319 --> 00:12:34,000
is torn down, I have to wait a little while before I can reuse my state.

205
00:12:34,000 --> 00:12:39,039
And so you keep the socket around for two, what's sort of maximum segment lifetimes or two

206
00:12:39,039 --> 00:12:43,399
times or what you'd expect me the longest time seconds might live in the network, which

207
00:12:43,399 --> 00:12:47,399
is on the order of say a minute or so.

208
00:12:47,399 --> 00:12:53,479
So this approach of two maximum segment lifetimes can pose problems with servers in particular

209
00:12:53,480 --> 00:12:58,320
if I have a server that says tons and tons of sockets which are in this time weight state,

210
00:12:58,320 --> 00:12:59,800
this can slow things down.

211
00:12:59,800 --> 00:13:02,120
The server was the one closing first.

212
00:13:02,120 --> 00:13:07,920
So there are tricks you can send a reset, delete the socket, you can set an option to make

213
00:13:07,920 --> 00:13:10,920
the the linger time to be zero.

214
00:13:10,920 --> 00:13:14,399
Another issue is the US might not let you reuse a port because it's still in use.

215
00:13:14,399 --> 00:13:18,600
There is an option you can do called SO reuse outer that'll let you to rebind a port number.

216
00:13:18,600 --> 00:13:22,200
This is useful to say you're just debugging something and gosh I don't want to wait two

217
00:13:22,240 --> 00:13:26,520
hours just because I happen to have a fin in this in this order.

218
00:13:26,520 --> 00:13:29,360
So let's see what a connection tear down looks like.

219
00:13:29,360 --> 00:13:35,600
So here's a basic connection setup, sin, sinac, ac and then here's the tear down.

220
00:13:35,600 --> 00:13:40,080
So because we are of our exchanging data we have a big knowledge been bit set.

221
00:13:40,080 --> 00:13:45,200
So here's the fin, here's the initial fin from my host when I close the connection.

222
00:13:45,200 --> 00:13:50,000
And so it sets the fin bit, ac1, sequence number one, ac1.

223
00:13:50,000 --> 00:13:53,960
And the server in response is also closing.

224
00:13:53,960 --> 00:13:56,919
So it sends a fin sequence number one, ac2.

225
00:13:56,919 --> 00:13:59,200
So it's acknowledging my fin.

226
00:13:59,200 --> 00:14:04,840
And then my host responds with an ac for that fin sequence number two, ac2.

227
00:14:04,840 --> 00:14:09,960
So here's a simple three way handshake for tearing down the connection fin, acknowledging

228
00:14:09,960 --> 00:14:15,399
some prior data, acknowledging the fin, sending your own fin and then acknowledging the

229
00:14:15,399 --> 00:14:16,720
fin.

230
00:14:16,720 --> 00:14:21,240
So now if we put all of this together, we could see what the full TCP finite state machine

231
00:14:21,240 --> 00:14:22,240
looks like.

232
00:14:22,240 --> 00:14:24,080
And so this is something you're coming across many, many times.

233
00:14:24,080 --> 00:14:28,120
This is well established, a finite state machine that really sort of lays the ground for

234
00:14:28,120 --> 00:14:31,639
how you want to set up reliable connections.

235
00:14:31,639 --> 00:14:32,639
And so I'm going to walk through it.

236
00:14:32,639 --> 00:14:35,519
It looks pretty complicated in your first seat, but it's because there are a couple of cases

237
00:14:35,519 --> 00:14:40,120
and actually given what we've presented before, it should all be pretty simple.

238
00:14:40,120 --> 00:14:42,440
So first we're starting in the closed state.

239
00:14:42,440 --> 00:14:44,759
So this is when there are no connections open.

240
00:14:44,759 --> 00:14:46,399
You know, I'm just sitting there.

241
00:14:46,399 --> 00:14:50,639
My application is not tried to open a connection.

242
00:14:50,639 --> 00:14:56,879
So then the first transition here to the listen state, this is the passive openers.

243
00:14:56,879 --> 00:14:57,879
This is a server.

244
00:14:57,879 --> 00:14:58,879
A server is listening for connection.

245
00:14:58,879 --> 00:15:04,039
So you can see the action is listen and there's no packets exchanged.

246
00:15:04,039 --> 00:15:06,200
If you close it, you then return to the closed state.

247
00:15:06,200 --> 00:15:10,200
So this if I'm listening for connections, I hear nothing or turn to the closed state.

248
00:15:10,200 --> 00:15:13,919
The other transition out of the closed state is the active open.

249
00:15:13,919 --> 00:15:15,439
So here's the connect.

250
00:15:15,439 --> 00:15:17,879
And connect causes a sin packet to be set.

251
00:15:17,879 --> 00:15:20,319
So this is step one of the three way handshake.

252
00:15:20,319 --> 00:15:24,360
So you send a sin and you're now in the sin send state.

253
00:15:24,360 --> 00:15:25,360
Sin sent state.

254
00:15:25,360 --> 00:15:27,000
So this is the active side.

255
00:15:27,000 --> 00:15:30,959
These red lines are showing the active opener of the three way connection.

256
00:15:30,959 --> 00:15:32,839
So sin sent.

257
00:15:32,839 --> 00:15:38,120
Then if you receive a sin and act, so this is the stage two, you send an act and now the

258
00:15:38,120 --> 00:15:40,559
connections established.

259
00:15:40,559 --> 00:15:43,480
So this path here, this is the active opener.

260
00:15:44,480 --> 00:15:46,600
Now let's watch the passive opener.

261
00:15:46,600 --> 00:15:51,120
The passive opener is in the listen state and it receives a sin from an active opener.

262
00:15:51,120 --> 00:15:55,800
In response, it sends a sin act and enters the sin received state.

263
00:15:55,800 --> 00:15:59,519
Then if it receives an acknowledgement for its sin, there's a stage three of the three

264
00:15:59,519 --> 00:16:00,519
way handshake.

265
00:16:00,519 --> 00:16:02,480
It's through a flexion of this step here.

266
00:16:02,480 --> 00:16:05,560
Then the connection has been established.

267
00:16:05,560 --> 00:16:11,800
Now if you're in the listen state, it's possible that you can also call send to then result

268
00:16:11,799 --> 00:16:17,279
in sending a sin message or you can also, in that way, you're then going to, even though

269
00:16:17,279 --> 00:16:22,240
you're in the listen state, you can actively open an active and open state.

270
00:16:22,240 --> 00:16:29,919
So now there's one more path here, which I mentioned, the four way simultaneous open,

271
00:16:29,919 --> 00:16:33,559
which is this.

272
00:16:33,559 --> 00:16:35,759
And so this is when both sides have sent sin.

273
00:16:35,759 --> 00:16:38,000
So we're just looking at one side of the connection.

274
00:16:38,039 --> 00:16:42,519
When response to a sin, you get a sin from the other side.

275
00:16:42,519 --> 00:16:44,279
And so this is the two sins crossing.

276
00:16:44,279 --> 00:16:48,200
So in response, you send sin plus act, sin received, then you act.

277
00:16:48,200 --> 00:16:54,240
And so there's the four messages, each is sent to sin, each is received to sin, and

278
00:16:54,240 --> 00:16:59,279
then received a sin, is sent to sin act, and there's an act and data change exchange

279
00:16:59,279 --> 00:17:00,279
can occur.

280
00:17:00,279 --> 00:17:01,759
And so now we're in the established state.

281
00:17:01,759 --> 00:17:05,319
Now of course, you can always transition out, we'd like to close those in resets.

282
00:17:05,319 --> 00:17:17,679
And now at this point, we've gone through connection establishment.

283
00:17:17,679 --> 00:17:25,799
Now we're going to go into connection tear down.

284
00:17:25,799 --> 00:17:28,200
And so there are two cases here.

285
00:17:28,200 --> 00:17:32,599
One is that if we're the active closer, here we call close, that results in a sin message

286
00:17:32,599 --> 00:17:35,359
being sent, a sin packet with a thin bit.

287
00:17:35,359 --> 00:17:37,759
We now enter a fin weight one.

288
00:17:37,759 --> 00:17:41,639
The other is if we receive a fin, then we acknowledge it.

289
00:17:41,639 --> 00:17:45,079
And we're now in the passive close, state where the other side is closed, and then we

290
00:17:45,079 --> 00:17:49,679
call, when we actually call close, we'll send fin, send the less act, and be closed.

291
00:17:49,679 --> 00:17:54,559
And so here a close weight is we are still allowed to send data, right, until we call close.

292
00:17:54,559 --> 00:17:58,079
This is the other side is closed, but we haven't.

293
00:17:58,079 --> 00:18:01,399
So now when close is called, we're in the fin one state.

294
00:18:01,400 --> 00:18:03,400
And there are a bunch of transitions out of that.

295
00:18:03,400 --> 00:18:05,240
One is that we receive a fin.

296
00:18:05,240 --> 00:18:09,519
So we've sent a fin, received a fin, this is the example I showed with the TCP tear down.

297
00:18:09,519 --> 00:18:12,720
So we've sent a fin, we receive a fin, we acknowledge it, we're now in the closing

298
00:18:12,720 --> 00:18:15,960
state, we then transition to time weight.

299
00:18:15,960 --> 00:18:23,240
Another is that we receive a thin plus an act, so we can just acknowledge that and enter

300
00:18:23,240 --> 00:18:24,560
time weight.

301
00:18:24,560 --> 00:18:29,759
The final one is that we receive an act, but no fin.

302
00:18:29,759 --> 00:18:33,720
So this is, we have closed our side of the connection, the other side hasn't.

303
00:18:33,720 --> 00:18:38,879
And so it's sort of the, this state here is correlated with this state here.

304
00:18:38,879 --> 00:18:42,960
Then when we do receive the fin, we acknowledge it, enter the time weight state, and then we

305
00:18:42,960 --> 00:18:48,240
have the time up before we can actually close and recover the state.

306
00:18:48,240 --> 00:18:52,319
So you can ask, what's the difference between this transition to closing and time weight?

307
00:18:52,319 --> 00:18:56,160
The reason is that this transition to closing is when the two fins pass each other.

308
00:18:56,160 --> 00:19:01,360
So I send a fin, the other side fence sends me a fin, but hasn't acknowledged my fin,

309
00:19:01,360 --> 00:19:05,279
this is the difference between thin slash act and thin plus act slash act.

310
00:19:05,279 --> 00:19:08,960
And so then I wait for that fin to be acknowledged and then transition to time weight.

311
00:19:08,960 --> 00:19:10,960
So this is the full TCP finite state machine.

312
00:19:10,960 --> 00:19:14,680
It looks really complicated, it does have one, two, three, four, five, six, seven, eight,

313
00:19:14,680 --> 00:19:17,080
nine, ten, eleven, twelve states.

314
00:19:17,080 --> 00:19:20,160
But when you realize it breaks in these two parts connection establishment connection

315
00:19:20,160 --> 00:19:24,080
tear down, and really there's just a bunch of different possible ways the fins can be

316
00:19:24,079 --> 00:19:27,119
exchanged, it's actually not that complicated.

317
00:19:27,119 --> 00:19:31,559
And so I encourage you to open up wire shark and just open up a couple of web connections

318
00:19:31,559 --> 00:19:34,159
and just see what's happening with your TCP connections.

319
00:19:34,159 --> 00:19:38,240
And you'll be able to see how those different connections are traversing this finite state

320
00:19:38,240 --> 00:19:38,519
machine.

