---
title: CS144 NetworkP997 5PhysicalandLink
---

1
00:00:00,000 --> 00:00:06,400
When we connect our computer to the network today, we're usually using Wi-Fi for wireless

2
00:00:06,400 --> 00:00:12,679
or Ethernet for a wired connection. Ethernet is by far the most widely used link layer mechanism

3
00:00:12,679 --> 00:00:18,519
in the internet today. So the link layer covers how an end host is connected to a router, how

4
00:00:18,519 --> 00:00:23,960
one router is connected to the next, and generally as we've seen, packets at the IP layer are

5
00:00:23,960 --> 00:00:29,120
encapsulated into a link layer frame most often Ethernet in order to be sent off to the

6
00:00:29,120 --> 00:00:34,399
first router. So in this video and the next I'm going to be describing something called

7
00:00:34,399 --> 00:00:41,480
CSMACD, which is right at the heart of how Ethernet works and was very much a part of the

8
00:00:41,480 --> 00:00:46,480
original Ethernet. And I'll be describing how Ethernet started out, its evolution over

9
00:00:46,480 --> 00:00:52,000
the years, and then how Ethernet switching became a very common way to extend the scope

10
00:00:52,000 --> 00:00:59,880
of a link to cover many many end hosts connected to a single router. You'll often hear

11
00:00:59,880 --> 00:01:05,159
Ethernet referred to as layer 2, and this goes back to the 7 layer OSI model that we saw

12
00:01:05,159 --> 00:01:11,280
in an earlier video. Whereas in the 4 layer internet model, Ethernet is the lowest layer.

13
00:01:11,280 --> 00:01:16,159
In the 7 layer OSI model, Ethernet encompassed both the link and the physical layers, both

14
00:01:16,159 --> 00:01:21,480
of the lower 2. So Ethernet is often referred to as layer 2 because of the link. The link

15
00:01:21,480 --> 00:01:26,640
really just covers the frame format and the algorithm that decides when a packet can be sent

16
00:01:26,640 --> 00:01:32,040
onto the wire. And we're going to see that a little bit later, that's the CSMACD mechanism.

17
00:01:32,040 --> 00:01:36,120
The physical layer covers things like the connectors and the electrical signals that are used

18
00:01:36,120 --> 00:01:41,880
on the wire. Ethernet started out as a means to connect multiple computers together on a

19
00:01:41,880 --> 00:01:49,600
single cable. That single cable was arranged as a long string or a bus as shown here. It

20
00:01:49,599 --> 00:01:54,359
was in fact a big thick yellow cable that snaked around either in the walls, the ceiling,

21
00:01:54,359 --> 00:01:59,239
or under the floor. And computers would be connected down into it. And then they're all

22
00:01:59,239 --> 00:02:05,319
sharing access to this same common wire. And the idea was that they would share it in order

23
00:02:05,319 --> 00:02:11,560
to be able to send packets between themselves. But there only one packet would be allowed

24
00:02:11,560 --> 00:02:16,319
onto the cable at a time because otherwise it would collide or corrupt and interfere with

25
00:02:16,319 --> 00:02:23,239
other packets. So this is what we call sharing a medium. And Ethernet is an example of when

26
00:02:23,239 --> 00:02:30,639
multiple hosts share a common cable. That's what we mean by medium. So to share the medium,

27
00:02:30,639 --> 00:02:36,039
we need to decide who gets to send and when. Because if only one packet can be sent on

28
00:02:36,039 --> 00:02:40,879
the medium at a time, we need to decide when the medium becomes free. Who is it that gets

29
00:02:40,879 --> 00:02:45,560
to use it next? Do they do it in round robin order? Do they do it randomly? Whoever gets

30
00:02:45,560 --> 00:02:50,039
to send first, what is the mechanism for doing so? And there's generally a class of what

31
00:02:50,039 --> 00:02:56,400
are called medium access control protocols or Mac protocols. And these are the protocols

32
00:02:56,400 --> 00:03:01,560
or algorithms for determining who gets to send next. We're going to look at some examples.

33
00:03:01,560 --> 00:03:05,960
But one thing to note here is you've probably heard Ethernet addresses being referred to

34
00:03:05,960 --> 00:03:11,240
as Mac addresses before. And you may even see this written on the bottom of your computer.

35
00:03:11,240 --> 00:03:16,040
Mac stands for medium access control. Even though we'll see later Ethernet doesn't use this

36
00:03:16,040 --> 00:03:22,000
mechanism very much anymore. That's just a vestige of the earlier 10 megabit per second

37
00:03:22,000 --> 00:03:28,040
version of Ethernet. Let's take a look at some examples of medium access control protocols.

38
00:03:28,040 --> 00:03:32,200
There actually been dozens or hundreds of them described, published, and invented over

39
00:03:32,200 --> 00:03:36,800
the years. And many of them were standardized. But because many of them have gone out of

40
00:03:36,800 --> 00:03:42,400
fashion, I'm really going to be focusing on just one Ethernet or carry a sense multiple

41
00:03:42,400 --> 00:03:47,680
access with collision detection, CSMACD. That's the one we're going to be focusing on.

42
00:03:47,680 --> 00:03:52,840
But I just want to set it into context a little bit. So there are Mac protocols which are simple

43
00:03:52,840 --> 00:04:00,040
and random, the simplest of which is something called a loha that I will describe in a moment.

44
00:04:00,040 --> 00:04:04,360
And at the other extreme is a method called token passing. Let me describe roughly how

45
00:04:04,360 --> 00:04:09,720
these work. Let me start with a simple and random mechanisms. A random access protocol is

46
00:04:09,720 --> 00:04:16,160
one where every host can try to send at any time that it has data to send. It doesn't need to

47
00:04:16,160 --> 00:04:22,600
wait for some central authority to give it permission or until its turn comes around. It just tries

48
00:04:22,600 --> 00:04:27,639
to send. It might listen and see whether anyone else is speaking or it just may go right ahead.

49
00:04:27,639 --> 00:04:33,960
So it's random in the sense that it just may start speaking at any time. The other extreme

50
00:04:34,839 --> 00:04:41,879
deterministic protocols like token passing have some means to explicitly control who gets to

51
00:04:41,879 --> 00:04:47,879
go next. In other words, which host gets to send a packet next? The most common method is called

52
00:04:47,879 --> 00:04:55,159
token passing in which a special packet or a token is sent from one host to the next. So they might

53
00:04:55,159 --> 00:05:03,719
be arranged for example in a ring and there will be a packet called a token that goes around. This

54
00:05:03,720 --> 00:05:08,520
would be the token packet. And when you hold the token, you're allowed to send a packet. So it

55
00:05:08,520 --> 00:05:14,440
might then send a packet onto another host. So this would be the packet being sent. And then when

56
00:05:14,440 --> 00:05:19,320
it's finished sending the packet, it then passes on the token to its neighbor who then gets the

57
00:05:19,320 --> 00:05:24,760
opportunity to send a packet and then we'll send the token on again. So the token will go around

58
00:05:24,760 --> 00:05:30,440
like the conch shell in Lord of the Flies if you've read that book or in any mechanism where we have

59
00:05:30,439 --> 00:05:35,959
a round robin opportunity to send. And the token is indicating who gets to send next.

60
00:05:37,879 --> 00:05:44,120
This gives every host the chance to send in a deterministic order. But it does require us to

61
00:05:44,120 --> 00:05:48,759
both generate and maintain this token. And it turns out that there are lots of ways in which this

62
00:05:48,759 --> 00:05:55,159
mechanism can fail. And the token get lost or the token can get duplicated. And so these have

63
00:05:55,160 --> 00:06:02,040
generally fallen out of favor of being replaced by the simpler Ethernet mechanism in which every

64
00:06:02,040 --> 00:06:07,960
host just basically randomly sends. But we'll see how that's controlled using this CSMA CD mechanism

65
00:06:07,960 --> 00:06:13,640
in a moment. So generally speaking, random access protocols are simple and to implement,

66
00:06:14,600 --> 00:06:19,400
give really good performance when there are a small number of senders sending data at random times.

67
00:06:19,400 --> 00:06:23,640
But they work less well under very heavy load because they can spend a lot of time colliding with

68
00:06:23,639 --> 00:06:26,839
each other and corrupting each other until they figure out an opportunity to send.

69
00:06:31,079 --> 00:06:37,399
So when we're designing a Mac protocol or choosing one, then we generally have some goals in mind.

70
00:06:37,399 --> 00:06:42,199
We would like to have high utilization of the shared channel. We'd like to make sure that most

71
00:06:42,199 --> 00:06:48,919
of the time is spent sending data not trying to recover from collisions or when multiple end hosts

72
00:06:48,920 --> 00:06:55,319
are talking at the same time. We'd like it to be fair. We'd like it to be fair in the sense that

73
00:06:55,319 --> 00:07:01,800
everybody gets an equal opportunity to send averaged over a long period. We'd like it to be simple

74
00:07:01,800 --> 00:07:08,280
and low cost to implement so that it can be very widely deployed. And we'd like it to be robust

75
00:07:08,280 --> 00:07:13,639
to errors. So we'd like it that if an end host fails, then the chances are it's not going to bring

76
00:07:13,639 --> 00:07:22,519
the whole network down. Let me start with an example. And the example that I'm going to be using is

77
00:07:23,959 --> 00:07:30,039
one of the earliest media maxes control protocols called the aloha protocol that was used in the aloha

78
00:07:30,039 --> 00:07:36,279
network in Hawaii. So here are the Hawaiian Islands. Basically, there was a central station in

79
00:07:36,279 --> 00:07:45,000
Oahu, where Honolulu is. And then there were relays or end attachments at radio transmitters

80
00:07:45,000 --> 00:07:51,879
on the islands of Kauai, Molokai, Maui and Hawaii. And every packet that was sent would be sent from

81
00:07:51,879 --> 00:07:59,639
an end host into the central station, which would then re-broadcast it out to everybody. And so this

82
00:07:59,639 --> 00:08:04,279
was radio based, RF based. There was no wire. And so the medium in this case was the air.

83
00:08:04,599 --> 00:08:12,039
The way that aloha worked was all hosts would transmit on one frequency. So if a host has something

84
00:08:12,039 --> 00:08:17,799
to send, it would send on say frequency zero. This blue is just representing the channel corresponding

85
00:08:17,799 --> 00:08:24,039
to frequency zero. This would be sent up to the main relay station or the central relay station

86
00:08:24,039 --> 00:08:31,079
in Oahu. And then that would be re-transmitted. The packet data would be re-transmitted out over

87
00:08:31,079 --> 00:08:36,679
frequency one, a separate frequency. So essentially, a separate orthogonal channel that would then be

88
00:08:36,679 --> 00:08:43,319
repeated to all end hosts. So we need a way to decide who can send when. And for this, we need a

89
00:08:43,319 --> 00:08:49,720
protocol that everybody agrees upon so that the system will work correctly. And the first aloha

90
00:08:49,720 --> 00:08:55,639
network to use the aloha Mac protocol, which is very simple. If you have data's as sent, transmit it.

91
00:08:56,360 --> 00:09:03,319
If your transmission collides with another, retry later. That was it. So very simple. You send.

92
00:09:03,960 --> 00:09:08,360
And then if you discover that it collided, then you would retry later. How do you know that it collided?

93
00:09:08,360 --> 00:09:14,439
Well, you would send on frequency zero. And you would listen on frequency one. And if what came

94
00:09:14,439 --> 00:09:21,319
back was not a correct copy of what you would send on frequency zero, you know it must have collided.

95
00:09:21,320 --> 00:09:25,480
And therefore you need to send again. And you would retry at a later time.

96
00:09:27,000 --> 00:09:33,640
Nice thing about the aloha protocol was very simple. It's pretty robust against the failure of

97
00:09:33,640 --> 00:09:38,440
an end host. What do I mean by this? Well, if an end host fails and just stops sending,

98
00:09:38,440 --> 00:09:43,480
then the mechanism doesn't rely on any end host being powered on or correctly operating,

99
00:09:43,480 --> 00:09:48,760
because it'll just stop sending packets. There is a failure condition if it just starts jabbering

100
00:09:48,759 --> 00:09:54,120
away sending packets that are meaningless. It can actually bring down communication for everyone

101
00:09:54,120 --> 00:10:00,120
else. So that's why we say that it's quite robust against failure. The protocol is distributed.

102
00:10:00,120 --> 00:10:07,080
It's distributed in the sense that it's actually operating independently on all of the end hosts.

103
00:10:07,080 --> 00:10:13,319
They all independently decide for themselves. Under low load, when there are very few,

104
00:10:13,319 --> 00:10:18,519
either very few hosts sending or they're sending at a very low rate, they're sending infrequently,

105
00:10:18,519 --> 00:10:24,199
we can expect the delay to be small. Nearly any host that has data to send will find that the

106
00:10:24,199 --> 00:10:29,720
the channel is free when it wants to send its packet. So it's very likely to get through first time.

107
00:10:29,720 --> 00:10:34,039
We're very little troubled. It doesn't have to wait for some coordinating mechanism. It just sends

108
00:10:34,039 --> 00:10:41,159
discovers that it gets through and that's great. Under high load, a lot of time can be wasted sending

109
00:10:41,159 --> 00:10:45,639
packets that collide, because under high load the chances are that there are other hosts wanting to

110
00:10:45,639 --> 00:10:52,120
send at the same time. And so as a consequence, generally speaking, the Aloha protocol is

111
00:10:52,120 --> 00:10:58,039
thought to have very low performance. And in fact, studies and theory and simulations have all

112
00:10:58,039 --> 00:11:04,039
suggested that under high load, you can show that the wasted time is so high, we can only achieve

113
00:11:04,039 --> 00:11:11,159
about 20% throughput, 18% in fact. So over 80% of the time is spent on transmissions that collide

114
00:11:11,240 --> 00:11:17,399
under very heavy load. Clearly we need to improve performance. There were many, many papers in the

115
00:11:17,399 --> 00:11:23,799
1970s and 80s on this topic of how to improve networks like this. And the technique most widely

116
00:11:23,799 --> 00:11:30,759
adopted for wired networks is called CSMACD and it was used for Ethernet. And you can see some of

117
00:11:30,759 --> 00:11:36,839
the ideas here for improving performance. One is instead of just going ahead and sending,

118
00:11:36,840 --> 00:11:41,080
regardless of whether or anyone else is sending, you could actually listen for activity first.

119
00:11:41,080 --> 00:11:47,080
This is the carrier sense part of CSMACD. So you listen first of all to check whether anyone

120
00:11:47,080 --> 00:11:52,680
else is sending before sending a packet. If they are, you wait, if they're not, then probably your

121
00:11:52,680 --> 00:11:58,519
packet will get through okay. The next one is to try and detect collisions quickly and stop

122
00:11:58,519 --> 00:12:03,480
transmitting. If you take your time to detect the collision or you wait until the packet is over,

123
00:12:03,480 --> 00:12:09,080
then you've wasted all of that time. If you can detect it very, very quickly back off and then try

124
00:12:09,080 --> 00:12:15,240
again later, then you can improve the performance. And the third one is after there has been a collision,

125
00:12:15,240 --> 00:12:21,320
pick a random waiting time that is based on the load. In other words, pick a random time before

126
00:12:21,320 --> 00:12:26,759
trying again. If the load is high, then wait a long time because that'll give others the opportunity

127
00:12:26,759 --> 00:12:31,800
to be able to send. If the load is low, then wait a short time because probably you'll get through

128
00:12:31,799 --> 00:12:37,479
successfully next time. If the load is high and you wait a short time, the chances are you'll collide

129
00:12:37,479 --> 00:12:44,279
again and it'll just be a wasted opportunity. This leads us then naturally from that simple

130
00:12:44,279 --> 00:12:52,279
Aloha mechanism to the very widely used CSMACD protocol. And this is how it works. So this is what

131
00:12:52,279 --> 00:12:58,759
was used for the original 10 megabit per second ethernet. So all hosts can transmit and receive

132
00:12:58,840 --> 00:13:06,200
on the one channel, which is this wire here. This is the shared medium. Packets are a variable size,

133
00:13:06,200 --> 00:13:13,319
of course. When a host has a packet to transmit, first of all it does carry a sense. So that's the CS of

134
00:13:13,319 --> 00:13:21,159
CSMACD. It checks that the line is quiet before transmitting. So it listens. If the wire is quiet,

135
00:13:21,159 --> 00:13:27,879
then it says probably my packet will get through. Then if there is a collision, it will try and detect it

136
00:13:27,879 --> 00:13:34,600
quickly. It will detect the collision as soon as possible. If a collision is detected, it will stop

137
00:13:34,600 --> 00:13:40,919
transmitting. Wait a random time and it'll go back to one again. In other words, it will go back,

138
00:13:40,919 --> 00:13:45,559
listen for whether the wire is quiet and then try and transmit. And if there's a collision,

139
00:13:45,559 --> 00:13:50,360
it will keep doing that. And it'll just keep doing that until it's successful. This random time is

140
00:13:50,360 --> 00:13:55,960
called a binary exponential back off. And all it means is as the number of collisions

141
00:13:57,560 --> 00:14:03,399
increase for a given packet, it will wait a longer time. In other words, if there are lots of

142
00:14:03,399 --> 00:14:09,000
collisions, it means there's lots of other transmitters. And therefore, I should try and hold off a

143
00:14:09,000 --> 00:14:13,720
longer amount of time in order to be able to give everybody the opportunity to send.

144
00:14:14,680 --> 00:14:24,360
Let's look at how CSMACD works in practice. Let's say that I have a packet at A

145
00:14:27,160 --> 00:14:35,960
that wants to go to D. So it has the Ethernet address of D. A will send the packet. The packet will

146
00:14:35,960 --> 00:14:41,560
propagate down the wire. So I'm going to draw it all the way along the wire here with D in it,

147
00:14:42,119 --> 00:14:48,679
as if it's moving from left to right. It'll propagate at the speed of light down the wire.

148
00:14:48,679 --> 00:14:53,799
And then it'll come up into D. D will recognize the Ethernet address and the packet will be

149
00:14:53,799 --> 00:15:01,719
correctly delivered. That first bit, that very first bit at the front of the packet, will start out

150
00:15:01,719 --> 00:15:08,679
by being put under the wire here. And then it'll propagate along and it will take it L over C,

151
00:15:08,679 --> 00:15:14,759
if L is the length of the cable from A to D. It'll take it L over C seconds to arrive.

152
00:15:15,879 --> 00:15:23,399
D listens, here's the packet. And in the meantime, while that packet is coming in, the wire is busy.

153
00:15:23,399 --> 00:15:28,439
So B, C and D will all hear the wire is busy and won't try and send packets. So if they've got

154
00:15:28,439 --> 00:15:34,359
anything to send, they will say they'll do the carrier sense, the step one. Say the network is busy.

155
00:15:35,000 --> 00:15:43,639
I won't try and send now. I'll wait until later. Now let's look at the condition of what causes

156
00:15:43,639 --> 00:15:51,399
a collision in the network. So if A again has a packet destined for D and D has a packet that is

157
00:15:51,399 --> 00:15:59,879
destined for A, A will send its packet. So let's look at the first bit. I'm just now going to talk in

158
00:15:59,879 --> 00:16:05,720
terms of the first bit propagating down the wire from A to D. It'll take L over C seconds.

159
00:16:08,519 --> 00:16:16,120
If that packet is going down the wire, here is the whole packet. And D listens and says,

160
00:16:16,120 --> 00:16:22,200
aha, it's quiet right now because the first bit hasn't arrived and start sending its packet. And so

161
00:16:22,200 --> 00:16:28,519
its packet is heading down in this direction. Its first bit is going down here. And so at some point,

162
00:16:28,519 --> 00:16:33,000
that the front of this packet will collide with the front of this packet. And after that,

163
00:16:33,000 --> 00:16:37,879
they will pass through each other, corrupting each other so that everyone that sees it, first of all,

164
00:16:37,879 --> 00:16:44,199
C will see it in this case. So it will hear that there is a collision. And the way that it detects

165
00:16:44,199 --> 00:16:49,559
the collision is through a number of mechanisms. One is it just starts to get garbled messages.

166
00:16:49,559 --> 00:16:54,840
It sees a very much larger number of transitions, basically twice as many transitions on the wire,

167
00:16:54,840 --> 00:17:00,360
or the main frequency component is doubled, or the voltage level has been increased. Any of these

168
00:17:00,360 --> 00:17:08,279
mechanisms can be used to detect a collision. As the packet from D continues to head towards A,

169
00:17:08,279 --> 00:17:15,160
that collision will soon be noted at B when the front of the packet gets to B. And so it will hear

170
00:17:15,160 --> 00:17:21,240
the collision. And eventually that packet will reach A and it will hear the collision.

171
00:17:22,200 --> 00:17:29,160
And of course, this packet here will hit D. And so it will hear the collision. So at all slightly

172
00:17:29,160 --> 00:17:34,839
different times, they all hear the collision, depending on the particular time that the packets were sent.

173
00:17:37,079 --> 00:17:44,200
So, carry a sense. Listen, see whether the line is quiet. Send the packet. Listen for the collision.

174
00:17:44,200 --> 00:17:48,359
Then back off. The binary exponential back off is set so that there's a good chance that they

175
00:17:48,359 --> 00:17:53,559
will both back off by different amounts, and therefore not collide next time they send.

176
00:17:55,719 --> 00:18:01,240
See some ACD networks have a minimum packet size requirement. Let me explain why that is.

177
00:18:02,279 --> 00:18:06,839
Going back to my example of when A and D were sending packets to each other,

178
00:18:06,839 --> 00:18:13,479
imagine now that A and D are sending packets on this network of length L and speed of propagation C.

179
00:18:13,720 --> 00:18:23,160
Imagine that the first bit of the packet from A, so remember we have packet from A, oops,

180
00:18:23,160 --> 00:18:32,039
to D, and we have packets from D to A. D listens. Here that the, here's that the wire is quiet.

181
00:18:32,599 --> 00:18:41,880
And at time zero, so this is going to be T equals zero. The first bit of A from A is going to start

182
00:18:41,880 --> 00:18:50,200
propagating down here towards D. Now imagine that at a time, just a tiny tiny little bit,

183
00:18:50,200 --> 00:18:58,440
L over C minus delta, just a tiny time period before that first bit reaches D. Host D

184
00:18:58,440 --> 00:19:03,400
decides that it's going to send its packet. It listens to the wire, says that it's idle,

185
00:19:03,400 --> 00:19:08,600
and then starts to transmit its packet. So the packet almost immediately climbs,

186
00:19:09,079 --> 00:19:20,919
and at time delta later, the collision will be detected at D and D will stop transmitting almost immediately.

187
00:19:22,679 --> 00:19:27,000
Now, although D knows about the collision, A doesn't know about the collision yet because that

188
00:19:27,000 --> 00:19:34,759
information or that collision has not propagated to A. So that little fragment of what D has sent

189
00:19:34,759 --> 00:19:39,960
will propagate down here. So this is the collision propagating down. And so eventually the

190
00:19:39,960 --> 00:19:47,000
propagation, the first bit will reach here. If A is still sending the packet towards D, in other

191
00:19:47,000 --> 00:19:52,039
words, if it hasn't reached the end of the packet yet, then A will detect the collision as well.

192
00:19:54,759 --> 00:20:00,839
And it will detect that collision after L over C from when it started, and then another L over C

193
00:20:00,919 --> 00:20:06,519
until the packet is finished. So there's two L over C in the worst case is the time from when A

194
00:20:06,519 --> 00:20:14,759
starts sending a packet until it hears of the collision. If A had finished sending its packet,

195
00:20:15,799 --> 00:20:22,119
by the time the collision propagated to it, A wouldn't realize that the collision took place,

196
00:20:22,119 --> 00:20:26,839
and when it hears about the collision, it wouldn't know what packet had caused the collision. Had it

197
00:20:26,839 --> 00:20:32,919
been its own packet, had it been a packet from another host. So in order for a simple way for A to

198
00:20:32,919 --> 00:20:39,000
be sure that it stops and realizes that there was a collision needs to back off and retransmit the packet,

199
00:20:39,559 --> 00:20:45,720
one simple way to do this is to make sure that A is sending its packet for at least two L over C.

200
00:20:46,679 --> 00:20:51,399
In other words, in the worst case, it's guaranteed to hear about the collision before it stops

201
00:20:51,400 --> 00:20:57,960
transmitting the packet. This means that we have a requirement of P over R, the packet length

202
00:20:57,960 --> 00:21:06,759
divided by the rate, is greater than or equal to 2 L over C. This is a general requirement for

203
00:21:06,759 --> 00:21:12,360
CSMA CD networks in order to be able to detect a collision while it's still transmitting a packet.

204
00:21:13,320 --> 00:21:19,800
Let's look at an example. Imagine that I have a CSMA CD network, which is running at a rate of

205
00:21:19,879 --> 00:21:28,680
10 megabits per second, and let's say it's 10,000 meters long, 10 kilometers long.

206
00:21:29,799 --> 00:21:34,839
It's a pretty big network, and that the speed of propagation is 2 times 10 to the 8 meters per second.

207
00:21:34,839 --> 00:21:41,319
What we need P over R is greater than or equal to 2 L over C. So we can say P must be greater than or

208
00:21:41,399 --> 00:21:53,159
equal to 2 times L, 10 to the 4 times, well I have just moved the R over under the other side,

209
00:21:53,159 --> 00:22:03,000
so 10 to the 7 divided by 2 times 10 to the 8. So the 2 is going to cancel, and I've got 11 over 8 is

210
00:22:03,720 --> 00:22:09,879
1,000 bits. So what that would tell me is that for a CSMA CD network to operate correctly at

211
00:22:09,880 --> 00:22:16,600
that size and those rates, the minimum size packet has to be 1,000 bits or about 128 bytes.

212
00:22:17,400 --> 00:22:23,880
So in summary, we've seen how MediaMaxS control protocols are used starting with a low-har,

213
00:22:23,880 --> 00:22:29,800
nice simple random access protocol, and then improved in its performance to create CSMA CD.

214
00:22:30,600 --> 00:22:37,960
And we saw that CSMA CD is very simple, nice random access mechanism, and we learned that the

215
00:22:37,960 --> 00:22:44,519
minimum packet size P over R has to be greater than 2 L over C in order to be able to reliably detect

216
00:22:45,480 --> 00:22:50,920
collisions before we finish transmitting a packet. In the next video, I'm going to be explaining

217
00:22:50,920 --> 00:22:57,160
how CSMA CD was used in the original Ethernet, and then how Ethernet has evolved over time,

218
00:22:57,160 --> 00:22:59,160
and then end with Ethernet switching.

