---
title: CS144 NetworkP493 10PacketSwitching
---

1
00:00:00,000 --> 00:00:04,879
In this video I'm going to continue the description of packet switching and in

2
00:00:04,879 --> 00:00:08,900
particular I'm going to tell you about how we can guarantee delays from one end of

3
00:00:08,900 --> 00:00:12,300
a network to another. This may come as a bit of a surprise because in earlier

4
00:00:12,300 --> 00:00:17,080
videos I was telling about how the queuing delay is variable and so we

5
00:00:17,080 --> 00:00:20,960
generally cannot control the delay through the network. But we're going to use

6
00:00:20,960 --> 00:00:24,879
special techniques that rely on the weighted fair queuing that we learned in the

7
00:00:24,879 --> 00:00:30,239
rate guarantee video so you should make sure you watch that one first. Let me

8
00:00:30,239 --> 00:00:34,479
start with giving us some intuition on how delay guarantees are going to work.

9
00:00:34,479 --> 00:00:40,640
So recall our end-to-end delay equation which tells us the delay from one end of

10
00:00:40,640 --> 00:00:46,560
the network to the other as a function of the packetization delay that is the

11
00:00:46,560 --> 00:00:52,599
fixed component of the packet length divided by the rate plus the propagation

12
00:00:52,600 --> 00:00:57,480
delay which is the length of the link divided by the propagation delay or the

13
00:00:57,480 --> 00:01:03,120
speed of light plus the queuing delay. And the first two terms are defined as

14
00:01:03,120 --> 00:01:08,519
fixed functions of the network. They depend on things under our control.

15
00:01:08,519 --> 00:01:12,840
Normally the queuing delay is not under our control. So if we want to provide an

16
00:01:12,840 --> 00:01:17,159
end-to-end delay guarantee then we're going to have to provide a delay for the queue

17
00:01:17,159 --> 00:01:23,519
through every router along the path. Okay so the basic idea is if we know the

18
00:01:23,519 --> 00:01:28,840
upper bound on Q1, Q2 and Q3 then we know the upper bound of the end-to-end delay

19
00:01:28,840 --> 00:01:36,640
over all from this equation. So how do we do that? So if in a router I know which

20
00:01:36,640 --> 00:01:43,439
queues a packet passes through and I know the size of the buffer. So let's say

21
00:01:43,439 --> 00:01:48,359
I'm looking at packets that are going to go through this queue here inside the

22
00:01:48,359 --> 00:01:53,759
router. I know the size of the buffer it's going to go through and I know the rate at

23
00:01:53,759 --> 00:01:58,000
which that buffer is going to be served. Then I know the maximum delay that a

24
00:01:58,000 --> 00:02:04,200
packet can encounter through this router because WFQ, weighted for queuing that

25
00:02:04,200 --> 00:02:11,079
we saw in the in the rate guarantee video, gives me a rate R1 and then I can

26
00:02:11,080 --> 00:02:15,560
simply say that the delay through this router will be bounded by the size of the

27
00:02:15,560 --> 00:02:24,600
buffer divided by R1, the rate that it achieved. So and remember that R1 equals the

28
00:02:24,600 --> 00:02:29,800
weight that I was going to give to that first one divided by the sum of all the

29
00:02:29,800 --> 00:02:39,400
weights times R. So I can control R R1, I can pick a B therefore I can pick the

30
00:02:39,400 --> 00:02:44,960
delay through the router. How do I actually do this in practice? Let's take a

31
00:02:44,960 --> 00:02:50,719
look at that. So we can control the delay of the packets from things that we

32
00:02:50,719 --> 00:02:54,680
already know. What we already know how to control is the rate at which a queue is

33
00:02:54,680 --> 00:03:01,759
served using WFQ and the size of each queue. This suggests a model for a router

34
00:03:01,759 --> 00:03:06,960
where we classify the packets as they come in. So this is the arriving packets

35
00:03:06,960 --> 00:03:11,040
and I'm going to classify them. I'm going to decide the flow to which they

36
00:03:11,040 --> 00:03:16,400
belong and then I'm going to stick them into that queue. So if they had gone into

37
00:03:16,400 --> 00:03:19,640
another queue down here that might have been possible which is going to be

38
00:03:19,640 --> 00:03:25,640
serviced at that rate R1 and this one would be at rate Rn and then they're going

39
00:03:25,640 --> 00:03:33,360
to come together and go under the outgoing line of rate R. So if I can set this

40
00:03:33,360 --> 00:03:37,000
at the correct rate I can set the size of the buffer then I can control the

41
00:03:37,000 --> 00:03:40,960
delay. Any packing packet arriving to the router will have a bounded delay and

42
00:03:40,960 --> 00:03:44,320
if we add up all the components of delay correctly using our equation then we

43
00:03:44,320 --> 00:03:48,720
can make it work end-to-end according to what we know. This works for packets

44
00:03:48,720 --> 00:03:55,480
that make it all the way through but here's the problem. What if a packet

45
00:03:55,480 --> 00:04:00,960
arrives at such a rate that it overflows the buffer here and falls under the

46
00:04:00,960 --> 00:04:05,280
ground in other words that we fill up this buffer just because of the arrival

47
00:04:05,280 --> 00:04:09,480
process to this queue. So this is really the remaining problem that we have to

48
00:04:09,480 --> 00:04:12,719
solve because there's no point in having an end-to-end delay guarantee if

49
00:04:12,719 --> 00:04:15,600
packets are going to get dropped along the way that's not really a delay

50
00:04:15,600 --> 00:04:20,560
guarantee. So we need to figure out how we can how we can prevent that buffer

51
00:04:20,560 --> 00:04:24,160
from overflowing and if we can do this then we've we've solved our overall

52
00:04:24,160 --> 00:04:30,560
problem. So how do we make sure that no packets are dropped? So we're going to

53
00:04:30,560 --> 00:04:34,360
zoom in on one queue and take a look at this and we're going to go back to

54
00:04:34,360 --> 00:04:40,839
something that we saw before which was our our our simple deterministic model of

55
00:04:40,839 --> 00:04:45,720
the dynamics of a queue. So you'll remember that we had for a queue like this we

56
00:04:45,720 --> 00:04:53,840
could model it as the cumulative bytes so cumulative bits or bytes. Actually I'll

57
00:04:53,840 --> 00:04:57,800
I'll say bits because it's going to make it a little easier to explain as a

58
00:04:57,800 --> 00:05:04,199
function of time. So this is the time evolution and you remember that we that we

59
00:05:04,199 --> 00:05:09,240
said we have the cumulative arrival process which might look something like

60
00:05:09,240 --> 00:05:15,040
this and then we're going to have the cumulative departure process which is

61
00:05:15,040 --> 00:05:18,800
going to be the times at which the queue is empty. We're going to serve it at

62
00:05:18,800 --> 00:05:23,280
some fixed rate and then it'll pause until there's there's enough accumulated

63
00:05:23,280 --> 00:05:27,720
some accumulated and then so on and then it'll pause and so the rate at this

64
00:05:27,720 --> 00:05:33,440
point is slightly less than the arrival rate. So here we have a of t the

65
00:05:33,440 --> 00:05:38,760
arrival process, the cumulative arrival process and here we have d of t the

66
00:05:38,760 --> 00:05:43,440
cumulative departure process. And you remember that if we were interested in in

67
00:05:43,440 --> 00:05:47,600
the delay of individual packets through this queue or in this case individual

68
00:05:47,600 --> 00:05:53,520
bits we take the horizontal distance. This is the time that a bit arrived. This

69
00:05:53,519 --> 00:05:59,279
is the time that that bit departed because it's a 5.0 queue that we have. Then the

70
00:05:59,279 --> 00:06:06,199
little d of t the delay is simply the horizontal distance and the maximum size

71
00:06:06,199 --> 00:06:10,479
of the buffer that we need is the maximum horizontal distance between these two

72
00:06:10,479 --> 00:06:13,560
lines because that's the maximum distance between what's arrived and what's

73
00:06:13,560 --> 00:06:22,439
departed. So if that vertical distance grows too big, grows to larger than b. So

74
00:06:22,439 --> 00:06:26,560
this here is queue of t right the amount that we have in the queue at only one

75
00:06:26,560 --> 00:06:32,600
time. If queue of t grows to be greater than or equal to b then we're going to have

76
00:06:32,600 --> 00:06:36,100
packets that are going to get dropped onto the floor. How do we going to make

77
00:06:36,100 --> 00:06:40,360
sure that this doesn't happen? This is what we're going to look at next and as I

78
00:06:40,360 --> 00:06:43,600
said if we can solve this then we can provide the delay guarantee through the

79
00:06:43,600 --> 00:06:48,519
router that we're looking for. The way that we're going to approach it is as

80
00:06:48,519 --> 00:06:58,519
follows. I'm going to resketch this this deterministic queue model. So this is

81
00:06:58,519 --> 00:07:04,079
this is our and I'm going to focus now just on the arrival process. So this is a

82
00:07:04,079 --> 00:07:10,199
accumulative arrival process a of t. It just needs to be non-decreasing to be

83
00:07:10,199 --> 00:07:18,479
plausible. And we're going to say that in any time interval so in any time

84
00:07:18,480 --> 00:07:24,240
interval let's take a time interval like this. If we can guarantee that no more

85
00:07:24,240 --> 00:07:36,040
than b plus r1 times t where t is the time interval we can say that no more than

86
00:07:36,040 --> 00:07:44,879
b plus r1 time t bits arrive then the buffer can't possibly overflow. So this

87
00:07:44,879 --> 00:07:50,079
would be over any time interval t because we know it's being drained at rate r1

88
00:07:50,079 --> 00:07:54,079
so r1 times t will have departed. We just need to make sure that we have an

89
00:07:54,079 --> 00:07:58,680
accumulated more than b in any time interval. So if we make this t any value and

90
00:07:58,680 --> 00:08:05,000
we never violate this then we can be sure that we've never overflowed the queue.

91
00:08:05,500 --> 00:08:15,560
So in other words a of t at the time t plus capital T minus the occupancy or

92
00:08:15,560 --> 00:08:20,399
the cumulative arrivals at time little t is less than or equal to this

93
00:08:20,399 --> 00:08:29,639
expression here b plus r1 times t. So if we can make sure that this guarantee is

94
00:08:29,639 --> 00:08:37,840
met and in other words this expression defined here is met. Then the queue

95
00:08:37,840 --> 00:08:41,480
will never overflow so we know the delay is guaranteed because we're serving at

96
00:08:41,480 --> 00:08:47,279
rate r1 and we've given quite a lot of leeway to the arrival process a of t.

97
00:08:47,279 --> 00:08:52,279
We've constrained it to make sure that it must fit within this requirement that

98
00:08:52,279 --> 00:08:56,960
in this time frame no more than b plus r1 t but we've given it some leeway on

99
00:08:56,960 --> 00:09:02,080
how it accomplishes this. So let's look at this in a bit more in a bit more

100
00:09:02,080 --> 00:09:08,480
detail. We're going to constrain the traffic and we're going to use a fairly

101
00:09:08,480 --> 00:09:12,600
well-known technique for doing this. There's something that's called sigma row

102
00:09:12,600 --> 00:09:16,560
regulation. I'll tell you what sigma row regulation is. It's basically the idea

103
00:09:16,560 --> 00:09:21,920
I just I just told you. So if this blue squiggly line here is our rival

104
00:09:21,919 --> 00:09:27,319
process, our cumulative arrival process a of t, I'm going to say that the number

105
00:09:27,319 --> 00:09:33,199
of bits that can arrive in any period of length t is bounded plus by sigma plus

106
00:09:33,199 --> 00:09:40,159
root t. So this is just like my b plus r1 t equation just now. We can think of

107
00:09:40,159 --> 00:09:47,120
this as in any time that we can draw that sigma plus r, sigma plus r, t by this

108
00:09:47,120 --> 00:09:52,759
blue line here. And we could start it at any point and you can see that it's

109
00:09:52,759 --> 00:09:57,639
basically saying that if we touch it down on any point of a of t, a of t in the

110
00:09:57,639 --> 00:10:03,080
future must lie below that line. So wherever we start wherever we slide this it

111
00:10:03,080 --> 00:10:08,320
must always lie, the a of t must always lie underneath it. If that is true then

112
00:10:08,320 --> 00:10:16,480
this equation holds and we say that a of t is sigma row regulated. You can see

113
00:10:16,480 --> 00:10:20,879
that a of t has quite a lot of leeway on how it fits under that. It just was never

114
00:10:20,879 --> 00:10:25,440
exceed it starting from any one point. So in our example sigma equals b and

115
00:10:25,440 --> 00:10:29,480
row equals r1. And the only reason I'm telling about sigma row regulation is that

116
00:10:29,480 --> 00:10:33,560
you'll find it commonly described in textbooks as sigma row regulation. And in

117
00:10:33,560 --> 00:10:40,519
our example I just happen to use b and r1 for the qi was looking at. Okay to

118
00:10:40,519 --> 00:10:45,399
reiterate this point then if I've got sigma row constrained arrivals and a

119
00:10:45,399 --> 00:10:49,840
minimum service rate. So my minimum service rate here is r1 that's the

120
00:10:49,840 --> 00:10:55,959
rate at which the q is being served. I've got a cumulative arrival process here,

121
00:10:55,959 --> 00:11:02,559
the green blue line, and then the departure process here the red line. And I'm

122
00:11:02,559 --> 00:11:08,319
going to constrain a of t to always lie below this sigma row line, the sigma

123
00:11:08,319 --> 00:11:14,840
plus row t line. Remember that this constraint must be held for all times

124
00:11:14,840 --> 00:11:19,160
wherever I start the sigma plus row t. So if I slide it along, for example

125
00:11:19,160 --> 00:11:23,759
starting here and starting here, it must be true on all of those occasions. But

126
00:11:23,759 --> 00:11:28,560
if I do that then I know that the the distance between a of t and d of t is

127
00:11:28,560 --> 00:11:35,160
less than the distance between this blue line and d of t. And so therefore I can

128
00:11:35,160 --> 00:11:40,720
constrain both b max. That's the maximum q occupancy I need to never overflow.

129
00:11:40,720 --> 00:11:48,320
And d max the maximum delay of any bit through the q. So in summary for no

130
00:11:48,320 --> 00:11:53,080
packet loss I need that b is greater than or equal to sigma. And if the rate at

131
00:11:53,080 --> 00:11:58,120
which I'm serving is greater than this row then the delay is less than or equal

132
00:11:58,120 --> 00:12:02,800
to b over r1. So I've now bounded the delay based on things that I can control

133
00:12:02,800 --> 00:12:09,440
b and r1. Still doesn't tell me how I'm going to do this. It just tells me that

134
00:12:09,440 --> 00:12:14,520
if I can constrain d of t then this will all hold. And so what I'm going to tell

135
00:12:14,520 --> 00:12:19,320
you next is it and describe this that if the flows are what we're going to call

136
00:12:19,320 --> 00:12:24,080
leaky bucket constrained and the routers use weighted for queuing then end-to-end

137
00:12:24,080 --> 00:12:28,960
delay guarantees are possible. So what is this leaky bucket constrained? Well it

138
00:12:28,960 --> 00:12:32,960
turns out the leaky bucket is something that implements the sigma row

139
00:12:32,960 --> 00:12:37,880
regulator and therefore makes all of this work. Let's take a look at what that

140
00:12:37,879 --> 00:12:43,720
leaky bucket is. So the leaky bucket regulator looks like this. Packets are

141
00:12:43,720 --> 00:12:48,000
going to arrive. So here are my packets arriving here and they're going to go into

142
00:12:48,000 --> 00:12:52,559
the packet buffer. And the rule is that I can send or I can take packets out of

143
00:12:52,559 --> 00:12:58,919
the buffer only if there are enough tokens and the tokens are being made

144
00:12:58,919 --> 00:13:04,639
available here at a particular rate row and the token bucket size is of sigma.

145
00:13:04,639 --> 00:13:08,240
So the tokens here are just a scheduling mechanism. The tokens don't go out

146
00:13:08,240 --> 00:13:13,919
under the wire. This token bucket is just a way of holding and implementing the

147
00:13:13,919 --> 00:13:18,039
scheduling mechanism that constrains the traffic. So this is something we're going

148
00:13:18,039 --> 00:13:22,279
to do at the source at a when it's sending the packets under the line. We're going

149
00:13:22,279 --> 00:13:25,840
to make sure that they are sigma row constrained using the leaky bucket

150
00:13:25,840 --> 00:13:30,960
regulator. It can send them under the wire if and only if there are enough

151
00:13:30,960 --> 00:13:37,720
tokens in its bucket. So it's going to accumulate a rate row with burst in a

152
00:13:37,720 --> 00:13:41,200
sigma. And in other words the maximum that it can have in that bucket is sigma.

153
00:13:41,200 --> 00:13:45,360
And then it will send a packet if there are sufficient tokens that allow to send

154
00:13:45,360 --> 00:13:49,560
a packet of that size. So if the tokens are in bits they don't have enough

155
00:13:49,560 --> 00:13:53,680
tokens to represent the packet that you're trying to send. And as soon as you

156
00:13:53,680 --> 00:13:57,560
send them then you use up the tokens and you put away for more to be to be put

157
00:13:57,559 --> 00:14:01,319
in. And you can probably see how this will make sure that we're allowing for

158
00:14:01,319 --> 00:14:07,399
bursts of up to sigma. But over on the long term rate is only row. And so they'll

159
00:14:07,399 --> 00:14:11,479
meet the constraint that we want. So putting it all together then what have we

160
00:14:11,479 --> 00:14:18,959
got? We have a sigma row constrained traffic here. So this would be our sigma

161
00:14:18,959 --> 00:14:24,519
row constrained traffic going in that's coming out of our leaky bucket at

162
00:14:24,519 --> 00:14:32,120
at a. Each each router is going to run WFQ waited for queuing in order to make

163
00:14:32,120 --> 00:14:37,919
sure that we get a service rate of R1 for that particular flow and a buffer

164
00:14:37,919 --> 00:14:42,879
size of at least the B that we need. And that will be at each one. So we'll have R2

165
00:14:42,879 --> 00:14:49,960
here and B. And along the path we're going to take the packets and make sure

166
00:14:49,960 --> 00:14:53,840
they're going into the correct queue that is being serviced at that rate. So we

167
00:14:53,840 --> 00:14:57,280
call that packet classification to put it into the correct queue and then

168
00:14:57,280 --> 00:15:00,440
eventually it will find its way.

169
00:15:03,560 --> 00:15:09,160
Then we can use our equation for end to end delay in order to calculate the

170
00:15:09,160 --> 00:15:15,560
entire delay along the path. So you may be wondering how are these values of

171
00:15:15,560 --> 00:15:23,600
sigma and row and the values of R1 and B and R2 and B get told to the routers

172
00:15:23,600 --> 00:15:28,279
and the source along the way. So there's actually a protocol for doing this

173
00:15:28,279 --> 00:15:33,399
for setting this up initially. And this is something that's called RSVP or the

174
00:15:33,399 --> 00:15:40,600
resource reservation protocol. And there is an ITF RFC that will tell us all

175
00:15:40,600 --> 00:15:44,639
about what we're supposed to do and it's number 2205. You can find this in any

176
00:15:44,639 --> 00:15:49,120
textbook. You can go and look at the RFC or if you look it up in Wikipedia you'll

177
00:15:49,120 --> 00:15:54,279
find a good description of this. So this is how we populate these values in the

178
00:15:54,279 --> 00:15:59,840
first place. How it is that end to end the control system is able to install

179
00:15:59,840 --> 00:16:05,519
these values along the path. So let's look at a worked example of this now. So

180
00:16:05,519 --> 00:16:12,279
imagine that in the network below we want an application to be able to send

181
00:16:12,279 --> 00:16:17,919
at a rate of 10 megabits per second and have an end to end delay of less than

182
00:16:17,919 --> 00:16:22,679
five milliseconds when it sends thousand byte packets. Let's see how we would do

183
00:16:22,679 --> 00:16:28,279
that. So first of all let's calculate the fixed portion because there's nothing we

184
00:16:28,279 --> 00:16:31,679
can do about the fixed portion of the end to end delay that's going to be made

185
00:16:31,679 --> 00:16:36,719
up by the packetization delay and the propagation delay. So let's look at the

186
00:16:36,719 --> 00:16:44,599
packetization delay first. Packetization delay and to end is going to be well

187
00:16:44,600 --> 00:16:49,279
it's the sum of the packetization delay across all of the links. So on the

188
00:16:49,279 --> 00:16:53,639
first link I've got thousand byte packets that I'm sending so they are a

189
00:16:53,639 --> 00:16:59,360
thousand times eight bits divided by the rate that they're going to go over the

190
00:16:59,360 --> 00:17:05,559
first link which is a one gigabit per second. So that's 10 to the power of nine.

191
00:17:06,059 --> 00:17:15,639
And plus, oops, plus, I need the same thing for the thousand byte packets going

192
00:17:15,639 --> 00:17:20,960
over the hundred megabit per second which is 10 to the eight and then I'm

193
00:17:20,960 --> 00:17:24,359
going to have the same thing over here for this. So I'm just going to multiply this

194
00:17:24,359 --> 00:17:32,399
by two because the last link is the same. And then I've got the propagation delay,

195
00:17:32,400 --> 00:17:41,400
the propagation delay along all of these links which is going to be the

196
00:17:41,400 --> 00:17:46,940
the length of the link which is 10 kilometers divided by the rate. So I've got

197
00:17:46,940 --> 00:17:53,080
120 kilometers in total, 120 kilometers so that's 10 times 10 to the three

198
00:17:53,080 --> 00:17:57,759
meters divided by the propagation speed which I'm just going to assume is two

199
00:17:57,759 --> 00:18:02,359
times 10 to the eight meters per second. And so if I add these two together I've

200
00:18:02,359 --> 00:18:09,720
already done that and that comes out as 0.696, 696 milliseconds. So I've got a

201
00:18:09,720 --> 00:18:15,039
fixed propagation delay of 0.696 milliseconds and so therefore I need the

202
00:18:15,039 --> 00:18:20,519
sum of all the queuing delays along the path to be less than or equal to the

203
00:18:20,519 --> 00:18:24,359
difference between that and five milliseconds. So that needs to be less than

204
00:18:24,359 --> 00:18:32,240
4.304 milliseconds. Okay, so we're going to remember this number because I'm going

205
00:18:32,240 --> 00:18:38,199
to clear this and then we're going to figure out how to make that work. So let's

206
00:18:38,199 --> 00:18:43,919
choose to split the delay that are the queuing delay equally amongst the two

207
00:18:43,919 --> 00:18:48,000
routers. I can actually do this in any way I want. It's going to make the math

208
00:18:48,000 --> 00:18:52,679
easier if I split it equally. In other words it's going to be just over two

209
00:18:52,680 --> 00:18:58,840
milliseconds for each one. So let's clear that. So I'm going to make it so that

210
00:18:58,840 --> 00:19:08,360
the delay through here is less than or equal to 2.152 milliseconds and the

211
00:19:08,360 --> 00:19:15,360
same thing here. Right, so I'll just draw that. That's the same value. Now I know

212
00:19:15,360 --> 00:19:19,200
what the rate is of the flow. It's 10 megabits per second. So I know the rate of

213
00:19:19,200 --> 00:19:23,519
which the queue is going to be serviced. That's going to be 10 megabits per

214
00:19:23,519 --> 00:19:27,480
second. Now I'm trying to figure out how big B should be, how big should the

215
00:19:27,480 --> 00:19:36,200
buffer be. So B, the size of the buffer, the buffer in each one, B needs to be

216
00:19:36,200 --> 00:19:40,680
large enough that I never drop anything. And so it's got to be greater than 10

217
00:19:40,680 --> 00:19:44,400
megabits per second because that's the rate at which it's going to be served.

218
00:19:44,560 --> 00:19:51,840
Times the duration of a bit through it. Well we already know that's 2.152 milliseconds.

219
00:19:51,840 --> 00:20:04,640
Okay, and so this ends up as 2,000, what is it? 21,520 bits, which is 2,690 bytes.

220
00:20:04,640 --> 00:20:10,880
So I've got roughly three packets worth of delay that I must have. So basically

221
00:20:10,880 --> 00:20:15,520
what this tells me is using weighted fair queuing, I will serve each of these

222
00:20:15,520 --> 00:20:20,240
queues at a rate of 10 megabits per second. I now I need to do that in order for

223
00:20:20,240 --> 00:20:24,000
the system to meet this 10 megabit per second requirement. And I will assign a

224
00:20:24,000 --> 00:20:33,200
buffer at each of those routers to be at least 2.690 bytes at each of those along

225
00:20:33,200 --> 00:20:38,520
the path. Then if I add up all of the delays, my overall end to end delay will be

226
00:20:38,519 --> 00:20:43,400
less than or equal to 5 milliseconds, which is what I was trying to achieve.

227
00:21:09,079 --> 00:21:27,160
So in practice, it's as I've shown you, it's technically possible to provide this end to end delay,

228
00:21:27,160 --> 00:21:31,559
but actually very few networks actually control the end to end delay. In other words, this is not

229
00:21:31,559 --> 00:21:37,160
really used very widely in practice. Why is that? Well, it turns out it's quite complicated to make

230
00:21:37,160 --> 00:21:45,640
it work. It requires coordination amongst all of the players, all of the network operators,

231
00:21:45,640 --> 00:21:51,720
the end to end, the routers along the way. And in practice, this hasn't really taken off,

232
00:21:51,720 --> 00:21:56,279
and in most networks, the combination of over provisioning and priorities of traffic,

233
00:21:56,279 --> 00:22:00,840
so giving high priority to those that need special treatment has proved to work well enough

234
00:22:00,840 --> 00:22:05,640
in most cases. I wanted to go through and tell you this because if you can understand how this

235
00:22:05,640 --> 00:22:10,200
whole weighted fair-curing mechanism works and how we can provide end to end delay guarantees,

236
00:22:10,200 --> 00:22:15,240
you understand a lot about the queuing dynamics of a packet switch network. And also,

237
00:22:15,240 --> 00:22:19,640
it's quite likely that some of these ideas will be used in some networks in the future,

238
00:22:19,640 --> 00:22:26,920
so they should prove useful to you. And so in summary, if we know the size of a queue and the rate

239
00:22:26,920 --> 00:22:32,680
at which it's being served, then we can delay the, we can bound the delay through it. We can pick

240
00:22:32,680 --> 00:22:38,440
the size of the queue and using weighted fair queuing, we can pick the rate at which the queue is served.

241
00:22:38,440 --> 00:22:44,279
Therefore, we just need a way to prevent packets from being dropped along the way. For this, we use a

242
00:22:44,279 --> 00:22:51,879
leaky bucket regulator. And with that, we can therefore bound the end to end delay. That's the end of the video.

