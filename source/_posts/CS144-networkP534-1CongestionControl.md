---
title: CS144 NetworkP534 1CongestionControl
---

1
00:00:00,000 --> 00:00:04,799
In the next few videos we're going to be looking at congestion control.

2
00:00:04,799 --> 00:00:10,080
Congestion control is a really important topic for networking because whenever we

3
00:00:10,080 --> 00:00:13,839
have a network, particularly a packet switched network like the internet, it will

4
00:00:13,839 --> 00:00:17,400
always encounter congestion either for short periods or long periods.

5
00:00:17,400 --> 00:00:22,320
Controlling that congestion to stop the network from collapsing is really,

6
00:00:22,320 --> 00:00:28,560
really important and so we're going to be learning about what congestion is and how

7
00:00:28,559 --> 00:00:33,119
to control it, basic approaches to congestion control, and then we're going to look

8
00:00:33,119 --> 00:00:35,960
specifically at what happens in the internet.

9
00:00:35,960 --> 00:00:42,799
And congestion control happens inside the TCP protocol and TCP has explicit support

10
00:00:42,799 --> 00:00:46,879
for congestion control and we're going to be looking at how it does that and how

11
00:00:46,879 --> 00:00:50,920
that's evolved over time and then what some of the consequences are of those

12
00:00:50,920 --> 00:00:55,519
decisions. Let's start by thinking about what congestion is.

13
00:00:55,760 --> 00:00:59,920
Congestion can take place at multiple time scales. I'm going to offer you three

14
00:00:59,920 --> 00:01:05,600
examples here and the first one is at a very short time scale when packets are

15
00:01:05,600 --> 00:01:10,480
colliding at a router. So for example imagine that we've got two

16
00:01:10,480 --> 00:01:14,960
packets, the first one arriving here in red and the second one arriving shortly

17
00:01:14,960 --> 00:01:19,680
afterwards both test into the same output and because they've both arrived at

18
00:01:19,680 --> 00:01:22,800
the same time one of them will get to leave, the other one will be queued and

19
00:01:22,799 --> 00:01:26,799
there will be a temporary buildup of the queue in the router.

20
00:01:26,799 --> 00:01:31,120
A second form of congestion at a slightly longer time scale is at the flow

21
00:01:31,120 --> 00:01:35,039
level operating at the time scale of round trip times or multiple round trip

22
00:01:35,039 --> 00:01:40,640
times. If you think of a flow as a communication like a TCP flow where the

23
00:01:40,640 --> 00:01:44,959
communication is taking place over a fairly long period over multiple round trip

24
00:01:44,959 --> 00:01:49,840
times for example downloading a web page or sending an email then the rate of

25
00:01:49,840 --> 00:01:54,799
the flow might change and I've shown one here in red and one here in green

26
00:01:54,799 --> 00:02:00,000
and these may both be passing through the buffer of a router trying to get out

27
00:02:00,000 --> 00:02:05,760
to the same outgoing link. If they combine rates exceed the outgoing

28
00:02:05,760 --> 00:02:10,400
link rate as seems to be the case here then the buffer will build up and eventually

29
00:02:10,400 --> 00:02:15,280
it will overflow and so we'll need to do something to prevent those flows from

30
00:02:15,280 --> 00:02:18,879
continuing to overwhelm that link otherwise we're just going to drop a

31
00:02:18,879 --> 00:02:23,599
whole load of packets and have a collapse in the

32
00:02:23,599 --> 00:02:29,120
and the performance of the network. The third type is at a much longer time scale

33
00:02:29,120 --> 00:02:33,280
which is there are a human time scale when there are just simply too many users

34
00:02:33,280 --> 00:02:37,199
using a link during a peak hour. This might be a link connecting to a very

35
00:02:37,199 --> 00:02:43,519
busy web server like cnn.com or google.com and in the morning people may come in

36
00:02:43,519 --> 00:02:48,240
and all want to access the same link while they're reading their coffee and

37
00:02:48,240 --> 00:02:52,320
it might overwhelm it and so this would be at a longer time scale.

38
00:02:52,320 --> 00:02:55,600
The one that we're going to be most interested in when we're talking about

39
00:02:55,600 --> 00:03:00,159
congestion control is this one in the middle. We're going to look at how

40
00:03:00,159 --> 00:03:04,879
congestion can be controlled for TCP flows in particular

41
00:03:04,879 --> 00:03:08,560
that are lasting multiple round trip times where we have the opportunity

42
00:03:08,560 --> 00:03:13,760
to communicate to the sender or send information back to the sender or for the

43
00:03:13,760 --> 00:03:17,360
sender simply to learn that it should change the amount of data that it

44
00:03:17,360 --> 00:03:21,360
puts into the network so as to prevent sustained congestion from happening

45
00:03:21,360 --> 00:03:24,960
over the routers. Let's take this a little bit further and think about

46
00:03:24,960 --> 00:03:31,520
what congestion is by way of an example. So we look at the example here where

47
00:03:31,520 --> 00:03:36,480
sources A and B are trained to send to the same destination

48
00:03:36,480 --> 00:03:43,360
X and their flows are they're both wanting to send at 12 megabits per second

49
00:03:43,360 --> 00:03:49,600
at a sustained rate but the link from the router to X is only capable of sending

50
00:03:49,600 --> 00:03:52,800
at 12 megabits per second. By the way there's nothing magical about the

51
00:03:52,800 --> 00:03:56,240
numbers 12 here other than it's going to make the math a little bit easier.

52
00:03:56,240 --> 00:04:02,320
So A has a consented a sustained rate of 12, B consented a sustained rate of 12

53
00:04:02,320 --> 00:04:07,600
and this link here which is the departure rate from the router buffer

54
00:04:07,600 --> 00:04:13,280
and the just before the outgoing link is only able to send at rate 12.

55
00:04:13,759 --> 00:04:17,839
So if we look at one of our deterministic

56
00:04:17,839 --> 00:04:23,920
queue models and just assume that this is at a sustained rate so this will be T

57
00:04:23,920 --> 00:04:29,199
and this will be the cumulative data send so we'll just think of this as the

58
00:04:29,199 --> 00:04:37,840
cumulative bits sent on a link. We will have A1 of T

59
00:04:38,720 --> 00:04:42,319
it will accumulate at 12 megabits per second so the gradient of this will be

60
00:04:42,319 --> 00:04:47,759
12 megabits per second and so will A2 of T. I'm not going to try and draw that

61
00:04:47,759 --> 00:04:56,639
superimpose that but so will D of T. So if we look at the sum of A1 plus A2

62
00:04:56,639 --> 00:05:05,039
so this would be A1 plus A2 and of course this here let me draw this in a

63
00:05:05,039 --> 00:05:12,000
different color this would be D of T. Then we can see that there will be a queue

64
00:05:12,000 --> 00:05:18,639
that will build up queue of T and queue of T is just going to grow and grow and grow

65
00:05:19,439 --> 00:05:25,040
just going to keep growing as because the the arrival rate is exceeding the departure rate.

66
00:05:25,040 --> 00:05:29,680
So hence eventually packets will be dropped and retransmitted. Notice that the

67
00:05:30,639 --> 00:05:35,120
the transmissions are going to add to the traffic in the network because there's going to be more

68
00:05:35,120 --> 00:05:40,959
traffic sent down here because of these retransmissions and it's going to make it even more congested.

69
00:05:40,959 --> 00:05:46,079
So congestion can actually have a feedback effect of making things worse by causing even more

70
00:05:46,079 --> 00:05:55,359
traffic to be sent in into the network. Also it means that the the arrival rate here although

71
00:05:55,359 --> 00:06:00,879
it will be a sustained arrival rate into the queue it must in some sense be truncated because

72
00:06:00,879 --> 00:06:05,039
the departure rate obviously can't exceed 12 megabits per second.

73
00:06:05,360 --> 00:06:15,200
Now let's assume for a moment that the buffers are infinite and think about what we would actually

74
00:06:15,200 --> 00:06:23,200
like to have happen here. Let's say that instead of A1 of T this is rate R1 that the first

75
00:06:23,200 --> 00:06:30,800
that A would like to send in it and we'll call this one R2 and we'll say that the rate here is R

76
00:06:30,800 --> 00:06:36,560
because then of course these could be any values in practice. It's reasonable to expect that if R1

77
00:06:36,560 --> 00:06:44,720
and R2 are both larger than R over 2 then we would give each one of them, we would actually assign

78
00:06:44,720 --> 00:06:50,800
to each one of them the rate R over 2. So if they both want more than half of that outgoing link

79
00:06:50,800 --> 00:06:57,840
then it would seem to make sense that they would both get R2, R over 2. So this example is very simple.

80
00:06:58,799 --> 00:07:04,799
In general congestion can happen at any point in the network with one flow, two flows or any

81
00:07:04,799 --> 00:07:09,039
number of flows. Some of the flows might have that bottleneck at this particular congested router.

82
00:07:09,759 --> 00:07:14,399
Others might not, they might have flows that are that they might be congested at a different

83
00:07:14,399 --> 00:07:19,039
router somewhere else in the network. So let's look at a slightly more complicated example.

84
00:07:19,439 --> 00:07:31,120
Let's first look at what's going on. We've got our sources A and B again wanting to send at 12

85
00:07:31,120 --> 00:07:37,520
megabits per second and we've got a third source now wanting to send at 12 megabits per second

86
00:07:37,520 --> 00:07:43,600
and we've got a second router and all the links, both of the links here are 12 megabits per second

87
00:07:43,600 --> 00:07:49,920
again. First notice that there are definitely going to be packets dropped if the flows from A, B

88
00:07:49,920 --> 00:07:54,879
and C run at the sustained 12 megabits per second. Clearly there's congestion in the network and they

89
00:07:54,879 --> 00:08:00,800
can all going to contribute to that congestion. Second notice that any packets from A and B that make

90
00:08:00,800 --> 00:08:08,080
it through the first router and are then dropped at the second router. So if they are then dropped

91
00:08:08,080 --> 00:08:12,400
because of the congestion at the second link are going to be a waste of network traffic. In other

92
00:08:12,399 --> 00:08:18,239
words they've used this precious congested resource here. If they then dropped here then there was

93
00:08:18,239 --> 00:08:23,120
no not really any point in sending them. So it's worthwhile thinking about how we get the information

94
00:08:23,120 --> 00:08:28,079
back to the source so that it isn't going to send unnecessary traffic through the network only to

95
00:08:28,079 --> 00:08:36,799
be dropped at a downstream router. Third notice that it's not obvious what the split of the last link

96
00:08:36,799 --> 00:08:43,679
should be. If the router simply split the usage at each bottleneck, in other words we split it

97
00:08:43,679 --> 00:08:51,759
50-50, then at this point here, over this link here we would see six megabits from A and six megabits

98
00:08:51,759 --> 00:08:58,959
from per second from B. And then if we would have split here 50-50 then we would see six megabits per

99
00:08:58,959 --> 00:09:05,599
second from C and we would see half of whatever came in through the second router. So we would see

100
00:09:05,600 --> 00:09:12,080
three from A and three from B summing to 12. So I'm clear that that's what we want. It might be

101
00:09:12,080 --> 00:09:17,200
that we actually want each of them to get four. That might be a more reasonable thing so that they each

102
00:09:17,200 --> 00:09:23,680
get equal access if that last router. So it's going to be important to think about how we divide up the

103
00:09:23,680 --> 00:09:31,040
capacity that's available. Now let's make it slightly more complicated. Imagine that we've got an extra

104
00:09:31,759 --> 00:09:39,759
sender D that wants to send just at one megabits per second. So D wants to send less than at a rate which

105
00:09:39,759 --> 00:09:45,519
is less than the others. So what rate should it be allowed to send at? We might say that everyone should

106
00:09:45,519 --> 00:09:52,639
send at less than their requested rate because the link is congested. In other words because the link

107
00:09:52,639 --> 00:09:58,719
over here is going to be congested because there's 12, 24, 36, 37 megabits per second that wants to

108
00:09:58,720 --> 00:10:05,200
flow over it. Everybody should run slower as a consequence. On the other hand, we might say that

109
00:10:05,200 --> 00:10:10,320
because D is asking for less than its fair share of the link. So there's one link here and four of them

110
00:10:10,320 --> 00:10:14,480
because it's asking for less than three megabits per second. Maybe we should give it its full one.

111
00:10:15,759 --> 00:10:20,639
So we're going to see some more examples of this in a definition of fairness in a little while.

112
00:10:20,639 --> 00:10:25,040
Something else to note is that congestion is unavoidable in a packet switch network. I mean,

113
00:10:25,039 --> 00:10:30,639
arguably it's actually a good thing. We use packet switching because it makes efficient use of

114
00:10:30,639 --> 00:10:35,919
the links because of statistical multiplexing. Therefore the buffers in the routers are frequently

115
00:10:35,919 --> 00:10:43,759
occupied and quite likely to overflow. In fact, if the buffers were always empty, then the links

116
00:10:43,759 --> 00:10:49,759
would be quiet much of the time. So delay would be low but our usage of the network would be low

117
00:10:49,759 --> 00:10:54,319
and so therefore would be using the network quite inefficiently. If buffers are always occupied,

118
00:10:54,320 --> 00:10:58,000
while the delay is high, we'd be seeing the network used very efficiently because it would be

119
00:10:58,000 --> 00:11:03,200
busy all of the time. So we're going to see congestion is a really inevitable property of the

120
00:11:03,200 --> 00:11:07,600
network and having a little bit of congestion is a good thing because it keeps the usage of the

121
00:11:07,600 --> 00:11:13,840
network high. We just need to be able to control it to stop us making the delay so high, the drop so

122
00:11:13,840 --> 00:11:19,520
high that the network becomes unusable. So some observations of what we've seen so far.

123
00:11:19,519 --> 00:11:24,720
Congestion is inevitable and arguably desirable. Congestion happens at different time scales from

124
00:11:24,720 --> 00:11:29,679
packets colliding to some flow sending too quickly to flash crowds appearing in the network.

125
00:11:30,720 --> 00:11:36,000
If packets are dropped, then retransmissions can make congestion even worse. When packets are

126
00:11:36,000 --> 00:11:41,039
dropped, they waste resources upstream before they were dropped, so that's a bad thing. And we're

127
00:11:41,039 --> 00:11:46,480
going to need a definition of fairness to decide how we want flows to share a bottleneck link.

128
00:11:47,440 --> 00:11:51,360
Next, we're going to explore the kind of fairness that we would like in the network because this

129
00:11:51,360 --> 00:11:57,920
is going to help us think about how to design a congestion control mechanism. So let's consider an

130
00:11:57,920 --> 00:12:06,879
example of when I have three routers in a network. Here are the three routers connected by links.

131
00:12:06,879 --> 00:12:14,879
And the first link I'm going to assume is of rate two, the second one of rate one. And then I'm

132
00:12:14,879 --> 00:12:24,000
going to have three sources, a, b, and c, all connected. And they're going to be sending flows like this

133
00:12:24,000 --> 00:12:30,159
through the network. First one goes, b's goes through the second router and then stops,

134
00:12:30,720 --> 00:12:36,080
c's comes in at the second router and then goes out through the third. So the question is, what

135
00:12:36,080 --> 00:12:42,720
would be a fair allocation of rates if they all want to send at maximum rate through the network?

136
00:12:42,720 --> 00:12:46,800
Let's think about the rates that we're going to assign to each of these, each of these flows.

137
00:12:47,519 --> 00:12:58,000
The first allocation is one in which I'm going to give a flow of 0.25, b, a flow, a rate of 1.75,

138
00:12:58,000 --> 00:13:04,320
and c, a rate of 0.75. So you know, I've not exceeded the rate on any one of them. There's a total

139
00:13:04,320 --> 00:13:15,440
of one here and a total of two here. And the total throughput here is 1.75 plus 0.7 is 2.5 is 2.75.

140
00:13:17,840 --> 00:13:25,600
Now let me consider a different rate allocation. And I'll call that one two. And in this rate allocation,

141
00:13:25,600 --> 00:13:41,519
I give a 0.5, I give c 0.5, and I'm going to give b 1.5. This has a total of 1.5 plus 0.5 is 2, 2.5.

142
00:13:41,519 --> 00:13:45,759
So it's actually lower overall throughput. But if you look at this link here, which is kind of the

143
00:13:45,759 --> 00:13:51,680
bottleneck link of the network, I've given the same to c as I have to a. And so we might say that this

144
00:13:51,679 --> 00:13:57,439
one is more fair. So there's a trade off here between fairness, one in which we're giving equal

145
00:13:57,439 --> 00:14:03,919
usage of the bottleneck links versus the throughput where we're trying to maximize the overall throughput.

146
00:14:03,919 --> 00:14:10,319
And essentially we can see here that a is being penalized in the second in the first one, where

147
00:14:10,319 --> 00:14:15,679
at the first allocation where it only has a rate of 0.25, because it's going through multiple links

148
00:14:15,679 --> 00:14:20,319
in the in the network. We can therefore see that fairness and throughput can be a dogs with each

149
00:14:20,320 --> 00:14:25,120
other. So before we start designing or comparing ways to control congestion, we could we could do with

150
00:14:25,120 --> 00:14:30,560
the definition of the kind of fairness that we would like to achieve. So the definition that we're

151
00:14:30,560 --> 00:14:37,440
going to use is is called max min fairness or maximizing the minimum. And it's a widely used

152
00:14:37,440 --> 00:14:41,760
definition of fairness. Well, it's not the only definition we could use. It makes sense because it

153
00:14:41,760 --> 00:14:47,120
tries to maximize the rate of the little flows while making sure that every flow that would like it

154
00:14:47,120 --> 00:14:52,000
can have an equal share of its bottleneck link. So the formal definition is shown here.

155
00:14:52,000 --> 00:14:58,960
And allocation is maximum in fair. If you cannot increase the rate of one flow without decreasing the

156
00:14:58,960 --> 00:15:06,240
rate of another flow with a lower rate. Let's look at what that would mean in my example before. Actually

157
00:15:06,240 --> 00:15:14,080
the second allocation that I showed you was in fact, maximum fair, fair. Because if we increase the

158
00:15:14,080 --> 00:15:22,560
rate of B. So if we were to try and increase this one here, beyond 1.5, we would have to decrease

159
00:15:22,560 --> 00:15:33,360
R of A the rate of A. And so this is a we can only increase whenever we increase one we will decrease

160
00:15:33,360 --> 00:15:40,720
one that is lower. And therefore this is the maximum in allocare allocation. What it essentially

161
00:15:40,800 --> 00:15:49,120
means is that links that share a bottleneck. So for example here, we'll have an equal share if they

162
00:15:49,120 --> 00:15:55,120
want to use all of that link or more than their fair share, they will be curtailed to their fair share.

163
00:15:55,120 --> 00:15:59,440
So they're each getting half of that. Let me show you an example on a single link, which will be

164
00:15:59,440 --> 00:16:06,399
easier to understand. So they're a very simple and intuitive definition on a single link. So if we have

165
00:16:06,399 --> 00:16:19,039
a router, let me draw a router here. And I have A and B that want to connect to that router at

166
00:16:20,559 --> 00:16:30,079
0.5 megabits per second, not just a 0.5 and 1. And then it has a link of rate 1 coming out of it.

167
00:16:30,320 --> 00:16:38,160
And then let's consider that as a third one, C, that wants to connect to it at 0.2. So the combined

168
00:16:39,040 --> 00:16:44,400
rate that we would like to send through here from A, B and C is 1.7, but we've only got a rate of

169
00:16:44,400 --> 00:16:50,080
1. So what would be the fair share? Well, C is the minimum. So we're going to start by allocating the

170
00:16:50,080 --> 00:16:55,920
minimum and C, once less than its fair share. In other words, the fair share would be a third each,

171
00:16:55,919 --> 00:17:03,360
at 1.2, which is less than a third. So we're going to allocate to it 0.2. That's going to leave 0.8

172
00:17:03,360 --> 00:17:11,279
on this link. And the fair share of the other two would now be 0.4, half of 0.8 each. A wants more

173
00:17:11,279 --> 00:17:21,759
than that. So it's going to be curtailed to 0.4 and B also wants more than the 0.4. So it's going to

174
00:17:21,759 --> 00:17:29,680
get 0.4 as well. So the total is going to sum to 1. If we increase the rate of any of them,

175
00:17:30,319 --> 00:17:36,079
then it would be at the expense of a slower flow. And so this is the maximum fair allocation.

176
00:17:38,240 --> 00:17:42,559
Now that you understand what congestion is, in the next few videos I'm going to look at different

177
00:17:42,559 --> 00:17:47,519
ways to design congestion control algorithms. So we're going to start from, start looking at some

178
00:17:47,519 --> 00:17:51,920
different techniques and end up with how TCP works. And look at that in some detail, and they'll look

179
00:17:51,920 --> 00:17:57,119
at some of the consequences of those designs. So with, while having some goals, so that we can bear them

180
00:17:57,119 --> 00:18:01,759
in mind when we're designing the algorithms and when we're comparing one against another. So I've

181
00:18:01,759 --> 00:18:06,720
got a list here, some of which we've seen and some of which we'll be new, but pretty obvious in why

182
00:18:06,720 --> 00:18:11,759
we're considering the first one is we want high throughput. We want to keep links busy,

183
00:18:12,480 --> 00:18:17,119
because we want to make efficient use of the network. And we want flows to be fast and to

184
00:18:17,119 --> 00:18:23,039
complete quickly. Second one is that we would like it to be fair, and we're going to typically use

185
00:18:23,039 --> 00:18:27,439
our maximum fairness goal, because it gives a nice balance between pretty good throughput through

186
00:18:27,439 --> 00:18:31,919
the network, but also making sure that all the flows that are contending for a bottleneck link

187
00:18:31,919 --> 00:18:37,519
get treated fairly, and the little ones get a good access to that link. We would like the

188
00:18:37,519 --> 00:18:42,319
congestion control mechanism to respond quickly to changing network conditions. If other flows

189
00:18:42,319 --> 00:18:47,919
arrive and the congestion increases, we need to be able to back off a little bit so that we don't

190
00:18:47,919 --> 00:18:52,960
cause too much congestion in the network. And if other flows go away and finish and more capacity

191
00:18:52,960 --> 00:18:58,720
becomes available, we'd like to be able to use that quickly so that we can make efficient usage

192
00:18:58,720 --> 00:19:03,839
of the network. And finally, we want the control to be distributed. We can't rely on there being

193
00:19:03,839 --> 00:19:08,240
some central arbiter that is going to decide the rates for the entire network. We need this to

194
00:19:08,240 --> 00:19:12,480
operate in a distributed fashion in order for it to be scalable. And these are the sorts of things

195
00:19:12,480 --> 00:19:16,480
we're going to consider over the next few videos.

