---
title: CS144 NetworkP413 3PacketSwitching
---

1
00:00:00,000 --> 00:00:07,759
In the first video on packet switching, I told you about what packet switching is and why it was used for the internet.

2
00:00:07,759 --> 00:00:11,359
Packet switching is going to feature very prominently throughout this course.

3
00:00:11,359 --> 00:00:13,200
So we're going to spend quite a bit of time on it.

4
00:00:13,200 --> 00:00:18,960
And many of the properties of the internet followed directly from the choice of packet switching.

5
00:00:20,960 --> 00:00:26,719
So in this video I'm going to give you some useful definitions for propagation delay and packetization delay.

6
00:00:26,879 --> 00:00:32,799
And we're going to use those definitions to come up with an expression for the end to end delay of a packet across a network.

7
00:00:32,799 --> 00:00:38,320
I'm also going to tell you about queuing delay and how it makes the end to end delay unpredictable.

8
00:00:39,280 --> 00:00:42,000
So let's start with some useful definitions.

9
00:00:43,280 --> 00:00:45,920
We'll start with the definition of propagation delay.

10
00:00:46,879 --> 00:00:52,159
So the propagation delay is the time that it takes a single bit of information to travel over a link

11
00:00:52,239 --> 00:01:00,959
at propagation speed c. So look in the picture here and you'll see we have the computer on the left

12
00:01:00,959 --> 00:01:05,679
and we're going to consider the time that it takes for a bit to propagate from the one on the left to the one

13
00:01:05,679 --> 00:01:11,280
on the right. That time the propagation delay or TsoL is simply L over c.

14
00:01:14,479 --> 00:01:19,840
So the propagation delay is simply determined by how long the link is, L in our case,

15
00:01:19,840 --> 00:01:26,799
and the speed that a bit travels c. We use the variable c in most of the links we're interested in

16
00:01:27,120 --> 00:01:32,480
because c is, or the speed of propagation is very close to the speed of light.

17
00:01:33,600 --> 00:01:40,320
For example in a twisted pair of electrical cables a bit propagates at about 70% of the speed of light

18
00:01:40,320 --> 00:01:43,760
and then an optical fiber the speed of propagation is a tiny bit slower.

19
00:01:44,640 --> 00:01:49,680
In most of our examples we'll assume that the bit propagates at two times 10 to the eight meters per

20
00:01:49,680 --> 00:01:54,160
second which is which is close enough. There you go there's the bit going along the link. Let's

21
00:01:54,160 --> 00:02:00,880
have a look at that again. So it's the speed at the time at which it takes to to propagate over the link.

22
00:02:02,800 --> 00:02:08,800
So for example if we were considering how long it would take a bit to travel a thousand kilometers

23
00:02:08,800 --> 00:02:14,080
or a million meters in an optical fiber where the propagation speed was two times 10 to the eight meters

24
00:02:14,080 --> 00:02:21,760
per second. Well TsoL is 1000 times 10 to the three divided by two times 10 to the eight or five

25
00:02:21,760 --> 00:02:26,960
milliseconds. In a little bit we're going to look at some examples and you're going to do some

26
00:02:26,960 --> 00:02:33,840
examples in the multiple choice exercises embedded in the video. Notice that the propagation delay

27
00:02:33,840 --> 00:02:38,000
doesn't depend on the data rate of the link. It doesn't matter if the link is running at one

28
00:02:38,000 --> 00:02:44,400
kilobits per second or or at 10 gigabits per second. The propagation delay is just a function of the

29
00:02:44,400 --> 00:02:55,280
speed of propagation of each bit and the length of the cable. Another useful definition is the

30
00:02:55,280 --> 00:03:02,000
packetization delay. This is the time from when the first bit of a packet is put onto the link

31
00:03:02,000 --> 00:03:07,920
until the last bit is put onto the link. Let's take a look at an example here. So see that

32
00:03:07,919 --> 00:03:14,479
packet there going onto the link. The time that it takes to put all of the bits onto the link is

33
00:03:14,479 --> 00:03:19,439
going to be a function of the number of bits we're putting onto the link and the distance between

34
00:03:19,439 --> 00:03:25,359
them or the number of bits per second that we can put onto the link. So essentially the data

35
00:03:25,359 --> 00:03:31,039
rate of a link is determined by how close together we can pack the bits. If for example the link

36
00:03:31,039 --> 00:03:36,560
runs at one gigabit per second we can put onto we can put one bit onto the link every now and a second.

37
00:03:37,360 --> 00:03:42,640
We'll see in a later video about physical links what actually limits the data rate of a link.

38
00:03:45,439 --> 00:03:50,640
So the packetization delay is determined by how fast we can put bits on the link or the data rate

39
00:03:50,640 --> 00:03:56,080
are. If a link runs at one kilobits per second we can put a thousand new bits onto the link every

40
00:03:56,080 --> 00:04:01,759
second. If it runs at 10 gigabits per second then we can put 10 billion bits onto the link every

41
00:04:01,759 --> 00:04:09,759
second. There we go a couple of examples. If we had a 64 byte packet that's 512 bits it would take

42
00:04:09,759 --> 00:04:16,480
5.12 microseconds to be transmitted onto a hundred megabits per second link. Why is that? Well T sub

43
00:04:16,480 --> 00:04:26,959
P equals P over R. So P in our case is 64 times 8 512 divided by R and R would be 100 times 10 to

44
00:04:26,959 --> 00:04:37,599
the 6. Another example a kilobit packet takes 1.024 seconds to be transmitted onto a 1 kilobit per

45
00:04:37,599 --> 00:04:46,000
second link. So where did this 1.024 come from? Well this is useful example here because the 1 kilobit

46
00:04:46,000 --> 00:04:53,759
per second, sorry the 1 kilobit packet that we see here, 1 kilobit when we're measuring a number of

47
00:04:53,759 --> 00:04:59,839
bits in a packet or in memory, 1 kilobit as you know is a thousand and 24 or two to the power of 10.

48
00:05:01,039 --> 00:05:08,560
So that's why we have 1.024 seconds in order to transmit it onto a 1 kilobit per second link.

49
00:05:08,560 --> 00:05:13,920
So in this case it's a little bit confusing. 1 kilobit per second means 1000 bits per second

50
00:05:13,920 --> 00:05:20,560
whereas the 1 kilobit in the packet is 1,024 bits. This is standard throughout networking and we'll

51
00:05:20,560 --> 00:05:30,160
see this happen over and over again. So notice that the packetization delay is only a function of

52
00:05:30,160 --> 00:05:40,160
the length of the packet that's P here and the rate at which we can put bits onto the link or

53
00:05:40,160 --> 00:05:48,160
R bits per second. Makes no difference how long the link is or how fast bits propagate along it.

54
00:05:51,120 --> 00:05:59,839
So next we're going to see how we can use our two different types of delay to determine the overall end to end delay.

55
00:06:01,040 --> 00:06:05,199
That's the time it takes a packet to go across a network from the source to the destination.

56
00:06:08,399 --> 00:06:15,519
So the end to end delay is the time from when we send the first bit on the first link that would be over here

57
00:06:16,000 --> 00:06:21,839
until the last bit of the packet arrives at the destination B.

58
00:06:26,079 --> 00:06:31,599
So we can calculate the end to end delay by adding up the propagation and packetization delays

59
00:06:31,599 --> 00:06:38,639
on every link along the path. That is we can look at those numbers that we calculated before

60
00:06:38,639 --> 00:06:44,240
for how long it takes a packet from the first bit until the first bit is sent until the last bit

61
00:06:44,240 --> 00:06:50,800
arrives on this link here. And then we can add it to the time on here, on here and on here.

62
00:06:53,439 --> 00:06:59,680
So in our case that's going to depend on the length of the first link and the rate at which it runs.

63
00:07:01,280 --> 00:07:06,480
And then we can use our expressions to calculate the end to end delay. And we're going to come up with

64
00:07:06,480 --> 00:07:13,920
an expression that looks like this. The end to end delay t equals the sum of the first of all the

65
00:07:17,280 --> 00:07:23,920
delay here which is the packetization delay, the time that it takes to put the packet onto the link.

66
00:07:23,920 --> 00:07:28,720
And then the time it takes for one bit to propagate along that link. So we're going to sum up all

67
00:07:28,720 --> 00:07:35,920
of those to get the end to end delay. Let's look at this in a little bit more example because I think

68
00:07:35,920 --> 00:07:42,080
it'll become a bit clearer. So in our example here the packet is going to traverse four links.

69
00:07:45,120 --> 00:07:49,759
So we're going to repeat the process on every link along the path and it's going to look something

70
00:07:49,759 --> 00:07:55,680
like this. Here we're taking a closer look by stretching out the links and the switches and

71
00:07:55,680 --> 00:08:03,200
remove the rest of the network just to make a little bit clearer. This here is a timeline and this

72
00:08:03,199 --> 00:08:09,680
timeline with time increasing from the left to the right is going to show how bits propagate and how

73
00:08:09,680 --> 00:08:22,959
the whole packet propagates from A over to B. So the first bit is going to take L1 over C.

74
00:08:23,919 --> 00:08:29,279
That's the length of that first link divided by the propagation speed. It's going to take that

75
00:08:29,279 --> 00:08:36,319
number of seconds to propagate from A to S1. So here we can see the bit starting from here and

76
00:08:36,319 --> 00:08:43,600
then propagating along the link. L1 over C is the time and this is it propagating the distance from A

77
00:08:43,600 --> 00:08:57,600
to S1. After we sent the first bit it's going to take P over R1 seconds until we can put the last

78
00:08:57,600 --> 00:09:05,200
bit of the packet under the link. So after P over R1 we've put the last bit under the link and then

79
00:09:05,200 --> 00:09:18,399
at the time L1C plus P over R1 that last bit will arrive at switch S1. Okay so at this point by the

80
00:09:18,399 --> 00:09:29,120
time we get to this point here the entire packet has arrived at S1. So internet routers are what we

81
00:09:29,120 --> 00:09:37,840
call store and forward devices. What that means is that the switch S1 is going to wait until the whole

82
00:09:37,840 --> 00:09:45,600
packet arrives until it looks up the address and decides where to send it next. It could instead start

83
00:09:45,600 --> 00:09:49,840
forwarding the packet after it had just seen the header and not wait for the whole packet to arrive.

84
00:09:49,840 --> 00:09:54,639
That's something we call cut through switching but internet routers generally don't do that. In a

85
00:09:54,639 --> 00:09:59,759
later video and in some of the exercises we'll see examples of cut through packet switches. But

86
00:09:59,759 --> 00:10:05,279
getting back to our example which is a store on forward network where every switch is going to store

87
00:10:05,279 --> 00:10:12,399
and forward the packets. Switch S1 is going to look at the packet after it's completely arrived and

88
00:10:12,399 --> 00:10:17,759
then it's going to send it onto the next link. It's going to send it onto S2. So here we can see

89
00:10:17,759 --> 00:10:29,039
that packet going onto S2. So just as before it takes L2 over C for the first bit to arrive at S2

90
00:10:29,039 --> 00:10:35,360
and then the last bit will arrive P over R2 seconds later. And we can just repeat this whole process

91
00:10:35,360 --> 00:10:43,120
for each of the links in turn until we get to B. So the overall end to end delay expression is

92
00:10:43,120 --> 00:10:48,800
just the sum of those from end to end which is the same expression we had before.

93
00:10:53,680 --> 00:10:58,639
Okay so it turns out I've only told you part of the story. Let me tell you the rest of the story.

94
00:10:58,639 --> 00:11:04,000
See the thing about packet switching is that your packets share the links with packets from other

95
00:11:04,000 --> 00:11:13,440
users. When several packets show up at the same time wanting to go on the same link and you can see

96
00:11:13,440 --> 00:11:19,360
this here we've got packets coming from here maybe from another link entering the packet switch

97
00:11:19,360 --> 00:11:24,960
and from here coming into the packet switch from another link all wanting to go on this outgoing

98
00:11:24,960 --> 00:11:31,679
link from S2 to S3. When this happens all of the packets are going to have to fight or contend for

99
00:11:31,679 --> 00:11:39,599
that outgoing link. So when several packets show up at the same time wanting to go on the same

100
00:11:39,599 --> 00:11:45,759
link in this case from S2 to S3 then some of the packets have to wait in the router's queue and this

101
00:11:45,759 --> 00:11:51,759
little symbol here, see this little red symbol here is the picture that I'm going to draw for a queue.

102
00:11:54,479 --> 00:11:58,959
Some people call that a packet buffer. In general let's say first come first serve queue in which

103
00:11:58,960 --> 00:12:04,000
the packets are going to depart in the same order that they arrive. We're going to say that the

104
00:12:04,000 --> 00:12:10,080
link from S2 to S3 is congested because there are lots of packets queued waiting to travel along it.

105
00:12:10,879 --> 00:12:15,120
The packet buffer helps prevent us from having to drop any packets. The bigger the buffer is

106
00:12:15,120 --> 00:12:19,600
the less likely we are to have to drop a packet that wants to travel across the link.

107
00:12:20,800 --> 00:12:27,040
So these packet buffers they're going to be in all of the switches. Every packet switch has

108
00:12:27,039 --> 00:12:32,240
buffers and they're fundamental to packets switching. If we didn't have packet buffers then we'd

109
00:12:32,240 --> 00:12:37,839
lose a packet every time two packets showed up at the same time wanting to travel across a link.

110
00:12:38,719 --> 00:12:43,199
So packet buffers are our friends but the packet buffers themselves are going to change our

111
00:12:43,199 --> 00:12:51,679
expression for the end to end delay. If our packet arrives and the queue has some packets in it then

112
00:12:51,679 --> 00:12:56,879
it's going to delay the time that it can be forwarded onto the next link because it can have

113
00:12:56,879 --> 00:13:01,599
to wait for the packets that are ahead of it to leave first before our packet gets to go.

114
00:13:03,279 --> 00:13:09,359
So I've just shown this here as queue 2 of t meaning it's going over the link from S2

115
00:13:09,919 --> 00:13:14,000
and I've said it's queue 2 of t because it's going to vary with time. It's going to depend on how

116
00:13:14,000 --> 00:13:21,439
many other packets are showing up from other users. So if there are three packets ahead of us we'll

117
00:13:21,440 --> 00:13:28,880
have to wait for three packetization delays before it's our turn to go. I've shown this just in

118
00:13:28,880 --> 00:13:33,760
one queue of course this can be in all of the switches along the way just makes the figure a bit

119
00:13:33,760 --> 00:13:41,040
more complicated so I've just shown it in queue 2. So we're into end delay now has a third component

120
00:13:41,040 --> 00:13:49,040
to it. It has in it the packetization delay that we saw before that's P over R sub i then it has the

121
00:13:49,279 --> 00:13:58,319
propagation delay over the link and then it has this new expression qi of t which is the delay

122
00:13:58,319 --> 00:14:02,799
of the packet in the queue waiting for other packets and this could be zero if there are no other

123
00:14:02,799 --> 00:14:09,039
packets of course but in general it's going to be some non-deterministic value because we don't

124
00:14:09,039 --> 00:14:17,839
know whoever else is sending packets at the same time. So the most important thing to note here is

125
00:14:17,840 --> 00:14:24,960
everything is deterministic except the queueing delay. P over R sub i lie over c they're both

126
00:14:24,960 --> 00:14:31,040
deterministic it's qi sub qi of t the queueing delay that is the variable component and it

127
00:14:31,040 --> 00:14:37,600
convinced you that really in practice there is variability I'm going to show you an example in a

128
00:14:37,600 --> 00:14:44,560
moment one last thing so you may have noticed that I that I use the the British spelling for

129
00:14:44,559 --> 00:14:50,159
queuing that's not because I'm English but it's very common in when talking about the internet

130
00:14:50,159 --> 00:14:56,479
to spell queuing qeueueue ing seems like too many vowels I know but this was the convention

131
00:14:56,479 --> 00:15:02,239
adopted by Kleinrock one of the pioneers and inventors of the internet back in the 1960s but you'll see

132
00:15:02,239 --> 00:15:09,439
both both the uk and the u rs spelling and that's just fine. So in summary here's our overall expression

133
00:15:09,440 --> 00:15:16,240
for the end to end delay it's taking into consideration the queuing delay at each packet switch

134
00:15:16,240 --> 00:15:20,400
along the way it's really important to remember that the queuing delay is unpredictable it depends

135
00:15:20,400 --> 00:15:25,520
on the traffic sent by other users in the network as far as we're concerned the queuing delay is a

136
00:15:25,520 --> 00:15:30,560
random variable it's the only random variable in our expression for end to end delay everything

137
00:15:30,560 --> 00:15:36,480
else is deterministic. So in case you don't believe me that the end to end delay is unpredictable we're

138
00:15:36,480 --> 00:15:42,960
going to measure it. I'm going to use a very widely used tool called ping png to measure the end

139
00:15:42,960 --> 00:15:49,039
to end delay between my computer and other computers in the internet. Ping is going to measure this

140
00:15:49,039 --> 00:15:53,200
end to end delay in fact it's going to measure the round trip time which is the end to end it's

141
00:15:53,200 --> 00:15:57,680
some of the end to end delay in both directions you'll find the ping command on your computer and you

142
00:15:57,680 --> 00:16:02,639
can use it to repeat the measurements I'm about to do on your own computer and it's kind of a fun thing

143
00:16:02,639 --> 00:16:10,480
to do. We can measure the delay of packets across the internet using the ping command. I'm going to

144
00:16:10,480 --> 00:16:15,919
show you an example of the ping command right now so I'm going to ping from my computer to

145
00:16:16,960 --> 00:16:24,159
Princeton.edu. Princeton is university in New Jersey in the United States it's about 4000 kilometers

146
00:16:24,159 --> 00:16:31,840
or two and a half thousand miles from where I am and as I do this you can see over on the right hand

147
00:16:31,840 --> 00:16:38,639
side it's showing me the time that it takes for the packets that I send to go to Princeton and back

148
00:16:38,639 --> 00:16:45,680
again so let's say if I can highlight these so if you see them like here these are the times of the

149
00:16:45,680 --> 00:16:51,200
packets to go there and back again. So those numbers there are about a hundred milliseconds

150
00:16:51,200 --> 00:16:55,519
corresponding to the time that it takes for a packet to go there and back over the round trip time.

151
00:16:55,519 --> 00:17:04,000
Let's see how that compares with by ping to let's try the university of Shinghua University in

152
00:17:05,039 --> 00:17:10,720
in Beijing in China. So we're going to see that's a lot further away that's about 10,000 kilometers

153
00:17:10,720 --> 00:17:17,200
away from me for about 6000 miles and you can see that the ping times are much greater so if I can

154
00:17:17,200 --> 00:17:27,920
just highlight those we can see those there more like 200 milliseconds. So I use ping to measure

155
00:17:27,920 --> 00:17:35,840
a few hundred RTT values from my computer at Stanford to Princeton and as I said earlier it's about

156
00:17:35,840 --> 00:17:44,000
4000 kilometers or two and a half thousand miles away. The graph shows the CDF that's the cumulative

157
00:17:44,000 --> 00:17:53,359
distribution function for the values that I measured. So 0% this means that none of the values were

158
00:17:53,359 --> 00:18:00,720
below this value here which is about a hundred milliseconds and a hundred percent of them were

159
00:18:01,599 --> 00:18:09,039
less than let's say 300 milliseconds little hard to tell on this graph here. So this shows the

160
00:18:09,039 --> 00:18:17,440
range and also the variation in the values that I measured. And the overall variance is about

161
00:18:18,159 --> 00:18:30,000
variation is about 50 milliseconds and the 90% of the samples fell between 100 and 120 milliseconds.

162
00:18:30,639 --> 00:18:35,119
Now let's look what happened when I repeated the experiment from Stanford to

163
00:18:35,759 --> 00:18:42,239
Jinghua University which is in Beijing in China. It's a lot further away it's about 10,000 kilometers

164
00:18:42,239 --> 00:18:48,959
away or 6000 miles and as I would expect the RTT values are much larger because the propagation

165
00:18:48,959 --> 00:18:57,599
delay is much higher. But also notice that the RTT samples have much greater variance. They vary

166
00:18:57,599 --> 00:19:03,199
by a lot more. Look at this value over here, this range of values, they're varying by a lot more than

167
00:19:03,279 --> 00:19:10,880
the ones over the shorter length from Stanford to Princeton. So that variation here comes from the

168
00:19:10,880 --> 00:19:17,120
queuing delay. My packets are encountering more cues, more congestion, more other users, more

169
00:19:17,120 --> 00:19:26,080
other users traffic when they're going across the Pacific to China. My packets meet the other

170
00:19:26,080 --> 00:19:30,400
packets in the route above as along the way and so they get held up they have to wait for longer.

171
00:19:30,400 --> 00:19:34,160
And I guess probably because there are more hops and more likely to encounter other people's

172
00:19:34,160 --> 00:19:42,560
packets along the way. With a range of about 200 milliseconds, it's about 320 down here and maybe

173
00:19:42,560 --> 00:19:48,560
they're going up to about 520. With a range of about 200 milliseconds the queuing delay is making up

174
00:19:48,560 --> 00:19:53,280
almost half of the overall end to end delay. That's pretty high. In fact that's kind of unusually

175
00:19:53,280 --> 00:19:57,280
high which is why I showed you this as an example just to get the point across.

176
00:19:57,839 --> 00:20:04,160
In summary, the end to end delay is determined by three components. The first is the propagation

177
00:20:04,160 --> 00:20:08,399
delay along the links which are determined by the lengths of the links and the propagation speed.

178
00:20:08,960 --> 00:20:13,839
The second is the packetization delay which is determined by the length of the packet and the

179
00:20:13,839 --> 00:20:18,879
data rate of each link. The third is the queuing delay which is determined by the congestion and

180
00:20:18,879 --> 00:20:25,519
the queuing delay and the buffers and the routers along the path. This is the end of the video on

181
00:20:25,519 --> 00:20:30,720
end to end delay in packet switching. In the next video I will be explaining what some of the

182
00:20:30,720 --> 00:20:35,279
consequences are of this variable queuing delay, particularly on real-time applications which

183
00:20:35,279 --> 00:20:44,720
frequently use playback buffers to absorb this variation.

