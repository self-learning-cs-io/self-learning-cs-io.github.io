---
title: CS144 NetworkP453 6PacketSwitching
---

1
00:00:00,000 --> 00:00:04,719
Continuing with our theme of packet switching, in this video I'm going to tell you about some

2
00:00:04,719 --> 00:00:08,720
useful probators of cues. These are going to come in handy whenever we're thinking about

3
00:00:08,720 --> 00:00:14,320
how a cue evolves, how a packet buffer changes to affect the cueing delay of packets through

4
00:00:14,320 --> 00:00:21,760
a network. As I was seen before, we can think of a network as a set of cues interconnected

5
00:00:21,760 --> 00:00:26,560
by some links and those links are carrying the traffic or the packets for many many different

6
00:00:26,559 --> 00:00:31,599
users and when multiplexed together, when statistically multiplexed together, that whole

7
00:00:31,599 --> 00:00:37,839
process of packet arrivals is very, very complicated. We usually think of the arrival processes as

8
00:00:37,839 --> 00:00:43,039
being random events. Each one was, of course, deterministically generated, but the aggregate we

9
00:00:43,039 --> 00:00:50,560
can think of as a random process. It's going to be good for us to understand how cues with random

10
00:00:50,560 --> 00:00:56,079
arrival processes work. That's going to be the topic that I'm going to be discussing today.

11
00:00:56,079 --> 00:01:01,039
Usually arrival processes are complicated in systems like networks, so we often model

12
00:01:01,039 --> 00:01:06,480
them using random processes. This study of cues with random arrival processes is called

13
00:01:06,480 --> 00:01:11,519
Cueing Theory. Cueing Theory you've probably heard of before has a reputation for having very

14
00:01:11,519 --> 00:01:17,599
hairy mathematics. Despite that hairy mathematics, cues with random arrival processes have some

15
00:01:17,599 --> 00:01:21,120
really interesting probators that are going to be good for us to understand. They're going to

16
00:01:21,120 --> 00:01:28,079
really help us understand the dynamics of networks. I'm going to go through a set of probators.

17
00:01:28,079 --> 00:01:33,520
I'm going to be starting with this one here that the burstiness tends to increase delay and it's

18
00:01:33,520 --> 00:01:39,439
at this level that I want you to remember these probators. The details and mathematics we're

19
00:01:39,439 --> 00:01:44,640
not going to worry about so much. I want you to understand these basic intuitive probators of

20
00:01:44,640 --> 00:01:50,880
Cueing Systems. It all comes down to the way that the cue evolves. I'm going to just sketch here

21
00:01:51,520 --> 00:01:57,840
my cue again. This is the arrivals to the cue of our packets. You'll hear people call customers

22
00:01:57,840 --> 00:02:02,960
as well because Cueing Theory applies to many other systems. If I say customers, I mean packets

23
00:02:02,960 --> 00:02:07,920
in this context. This is our arrivals. These are our departures. We're going to be thinking about

24
00:02:07,920 --> 00:02:15,840
the evolution of the cue occupancy, cue of T, cue as a function of time. On this timeline down here,

25
00:02:15,840 --> 00:02:21,039
I've drawn a sequence of arrivals and departures. Packet arrivals happening at these blue

26
00:02:21,039 --> 00:02:26,000
downward arrows, representing the time or the epoch of the arrival, and then these red up what

27
00:02:26,000 --> 00:02:32,159
arrow is being the departures, the times at which the cue was serviced. Just like in many cues

28
00:02:32,159 --> 00:02:38,879
for networks, we're going to think of this as representing a link of a fixed rate R,

29
00:02:38,879 --> 00:02:47,039
which means that the interdeparture opportunities are at one over R apart. Now let's look at the

30
00:02:47,039 --> 00:02:53,039
evolution of the cue. The cue here has the first arrival, the blue one, which takes it up the one,

31
00:02:53,039 --> 00:02:57,199
and then we have the service that the output red arrow, which is going to take us to zero. There's

32
00:02:57,199 --> 00:03:00,960
a new arrival, which is going to take us back to one again. Then there's this departure here,

33
00:03:00,960 --> 00:03:05,919
which is going to take us to zero, then back up to one again, then zero, etc. At this point here,

34
00:03:05,919 --> 00:03:10,399
we've had two arrivals in a row, which is going to take us back to a cue occupancy of two,

35
00:03:10,959 --> 00:03:18,159
and so on. This is going to be the evolution of the cue. Now let's look at this one here,

36
00:03:18,159 --> 00:03:24,719
this departure opportunity. The reason I've drawn this is a dotted line. This is sometimes people

37
00:03:24,719 --> 00:03:29,039
call this a shadow departure. It was a departure opportunity when we could have set a packet,

38
00:03:29,039 --> 00:03:33,919
but the cue was empty, so that we never actually sent the packet, because we can't actually go down

39
00:03:33,919 --> 00:03:40,639
to a negative cue occupancy. That wouldn't be possible. The cue sticks at zero, even though we missed

40
00:03:40,639 --> 00:03:45,919
this opportunity. It's going to turn out that these missed opportunities are quite important.

41
00:03:45,919 --> 00:03:51,519
You can't have a negative cue occupancy, so some people say you don't get credit for good behavior

42
00:03:51,519 --> 00:03:57,759
by not having an arrival during this interval here. It meant that the cue occupancy stuck at zero,

43
00:03:57,840 --> 00:04:05,679
but we're not going to credit for it. If we have random arrivals with arrivals that are spread out,

44
00:04:05,679 --> 00:04:11,280
if we miss an opportunity to send, it's tough. We never get that back again. Let's now take a look at

45
00:04:11,280 --> 00:04:18,719
the first property I wanted to explain. That is that burstiness or bursty arrivals tend to increase

46
00:04:18,719 --> 00:04:25,920
delay. To start with a very simple example where there is no burstiness, where we have the simplest

47
00:04:25,920 --> 00:04:33,280
arrival process, which is a sequence of arrivals, all exactly one second apart. This is one packet per

48
00:04:33,280 --> 00:04:40,160
second, and in fact it's one packet exactly every second. Nothing random about this at all. Let's

49
00:04:40,160 --> 00:04:46,160
look at the sequence of departures. I'm going to assume that there is one departure every second.

50
00:04:46,160 --> 00:04:52,000
If we were to sketch the cue occupancy here, I won't sketch the graph, I'll just put the numbers in.

51
00:04:52,000 --> 00:04:58,480
If we were to sample the occupancy here, there'd be an arrival but no departure, so we'd have one,

52
00:04:58,480 --> 00:05:05,439
and then zero, and then it's one again, and then zero, one, zero. There's the way I've drawn it here.

53
00:05:05,439 --> 00:05:11,040
There are long periods of zero, and then the short periods of one when there's been arrival but no

54
00:05:11,040 --> 00:05:16,399
departure. Of course, I could shift either the arrivals at a departure and make those of zeroes and

55
00:05:16,399 --> 00:05:21,600
ones be of different durations. That'll just carry on because there are things nice and

56
00:05:21,600 --> 00:05:28,080
periodic. The interesting thing to note here is, Q of T, the cue occupancy, is either zero or one,

57
00:05:28,080 --> 00:05:33,680
so we can say it's always less than or equal to one. The average cue occupancy is going to be

58
00:05:33,680 --> 00:05:38,640
some way between zero and one. We know that for sure, just because of the structure of the problem.

59
00:05:38,640 --> 00:05:44,560
So periodic arrivals make for a nice, simple understanding of that cue evolution. Now let's look

60
00:05:44,560 --> 00:05:50,879
at a different example when things are more bursty. Just as before, the arrivals are going to be

61
00:05:50,879 --> 00:05:56,480
at the rate of one per second, but they're going to arrive in bursts. In fact, we're going to have

62
00:05:56,480 --> 00:06:05,360
n arrivals, when we have n arrivals, n arrivals, every n seconds. So n packets every n seconds,

63
00:06:05,360 --> 00:06:10,000
but they're going to come in these bursts of n. In this particular case, it's five packets every five

64
00:06:10,000 --> 00:06:17,439
seconds. The service opportunity is, although the departure is going to be the same as before,

65
00:06:17,439 --> 00:06:22,959
we're going to have one per second. So in terms of the rates, the arrival rate and the departure

66
00:06:22,959 --> 00:06:27,519
rate, everything is exactly the same as before. It's one packet per second. It's just that the

67
00:06:27,519 --> 00:06:31,920
burstiness of the arrivals is going to change things and let's look at the way in which they

68
00:06:31,920 --> 00:06:39,519
change. So here we've got a sudden burst of arrivals of five. So depending on whether, when we

69
00:06:39,519 --> 00:06:46,240
sample it, sample the cue occupancy, we're going to have Q of T equals zero all the way through to

70
00:06:46,240 --> 00:06:52,400
five, depending on when we sample. During this time here, it's four, then three, then two, then

71
00:06:52,400 --> 00:06:58,240
one, then zero, and then it's going to go up to five again sometime in here and four, and so on,

72
00:06:58,240 --> 00:07:05,199
and so on and so on. Okay? So before our cue occupancy was zero or one, but now even with the same

73
00:07:05,199 --> 00:07:10,400
arrival rate and even with the same departure rate, our cue occupancy can go between zero and five.

74
00:07:10,399 --> 00:07:16,719
So our arrival, our average cue occupancy is higher and the variance of the cue occupancy is higher

75
00:07:16,719 --> 00:07:23,199
too because it's varying all the way across zero to five. So average and the variance have both

76
00:07:23,199 --> 00:07:27,679
increased even though the rate hasn't changed. So clearly the burstiness is going to make a big

77
00:07:27,679 --> 00:07:33,759
big difference. And in general, we say burstiness increases delay and that simple example illustrates

78
00:07:33,759 --> 00:07:38,560
it. It doesn't prove it, but hopefully it gives you intuition as to why burstiness will increase

79
00:07:38,560 --> 00:07:43,280
delay. The second property, which is very similar to the first, it's almost the

80
00:07:44,079 --> 00:07:47,839
the counterbalance of the first, is that determinism tends to minimize delay.

81
00:07:49,600 --> 00:07:54,560
But it's enough for us to know that in general, determinism minimizes delay. In other words, random

82
00:07:54,560 --> 00:08:01,279
arrivals wait longer on average than simple periodic arrivals. Okay, let me move on to the third

83
00:08:01,279 --> 00:08:06,000
property I'd like you to know about and that is a well-known result called littles result.

84
00:08:06,959 --> 00:08:14,079
Cue is very complicated and as you've, as I've already given you an indication, the mathematics tends

85
00:08:14,079 --> 00:08:19,120
to get very hairy. But there are some simple results that you really need to know and it's important

86
00:08:19,120 --> 00:08:24,560
first to understand because they're going to come in handy when we're understanding the basic

87
00:08:24,560 --> 00:08:31,519
properties of Cue's. And this one littles the result is deceptively simple. So in any cueing system

88
00:08:31,519 --> 00:08:40,799
like the one shown here, there's a following property which is a little surprising. If I've got a

89
00:08:40,799 --> 00:08:51,199
well-defined arrival rate, let's call that lambda. And I've got an average number of cues in the

90
00:08:51,199 --> 00:09:01,120
system L. And I want to know what the average delay is and I'm going to call this d equals average

91
00:09:01,120 --> 00:09:12,720
delay of a customer or a packet through the cue. Then littles result tells us that there is in general

92
00:09:12,720 --> 00:09:20,480
the number of customers in the system equals the average arrival rate times the average delay

93
00:09:20,480 --> 00:09:27,919
of a customer through the cue. That's it. This deceptively simple result applies for any cueing system

94
00:09:28,399 --> 00:09:36,079
for which there are no customers that are lost or dropped. So if none, lost or dropped.

95
00:09:41,039 --> 00:09:46,240
So it doesn't matter what the arrival process is. It doesn't matter how bursty, how non-bursty.

96
00:09:46,240 --> 00:09:51,279
So long as it has a well-defined arrival rate lambda, then we can make this calculation.

97
00:09:52,159 --> 00:09:55,360
So you can go to any cue and we'll look at some examples in a moment.

98
00:09:57,279 --> 00:10:01,279
And you can calculate the average number in the cue as a function of the arrival rate and the

99
00:10:01,279 --> 00:10:05,919
average delay. Or of course if you know L and lambda, then you can figure out the average delay

100
00:10:05,919 --> 00:10:13,439
that's going to be seen by a customer through this cue. Now L is the average number that are in the

101
00:10:13,439 --> 00:10:20,159
cue plus currently being serviced. So long as d is the average delay of customers that arrive

102
00:10:20,159 --> 00:10:27,919
until they've completed service. Turns out this result also holds if we say L is the average time,

103
00:10:27,919 --> 00:10:33,679
sorry, the average number of customers in just the cue but not yet entering service. So long as d

104
00:10:33,679 --> 00:10:39,199
also equals the average delay through the cue prior to entering service. So both of those are true.

105
00:10:41,759 --> 00:10:44,879
We're going to be using this result quite a lot throughout the quarter.

106
00:10:45,600 --> 00:10:53,120
Having told you about those three probators of cues, something I need to tell you before we

107
00:10:53,120 --> 00:10:58,159
get on to the fourth property. And that is the Poisson process. You're going to hear a lot about the

108
00:10:58,159 --> 00:11:05,679
Poisson process whenever you study cues or any complicated system that we model probabilistically.

109
00:11:06,320 --> 00:11:09,840
You know, a physical can tell you what the Poisson process is. Then I'm going to tell you why it's

110
00:11:09,840 --> 00:11:16,800
interesting and some caveats about using it. So the Poisson process is an arrival process in our case

111
00:11:17,440 --> 00:11:24,480
and an arrival process we say is Poisson if, in fact, an only if, the probability of there being

112
00:11:24,480 --> 00:11:29,920
k arrivals in an interval of t seconds is given by this expression here, kind of a hairy expression.

113
00:11:29,920 --> 00:11:37,280
But the important thing is that that we can express this as the expected number of arrivals within

114
00:11:37,279 --> 00:11:41,279
an interval t is simply lambda t where lambda is the arrival rate.

115
00:11:44,480 --> 00:11:50,399
Also, successive inter arrival times are independence. What this means is that once we've picked one

116
00:11:50,399 --> 00:11:57,439
arrival from this expression here, this will lead to an arrival event happening. Then the next

117
00:11:57,439 --> 00:12:02,079
arrival is independent of the first one. And in fact, if we take a sliding window and move that over

118
00:12:02,080 --> 00:12:08,160
the arrival process within any period, the inter arrival times within one period are independent

119
00:12:08,160 --> 00:12:12,720
of the next. That means that there's no burst in S or coupling of one arrival to another.

120
00:12:13,600 --> 00:12:17,840
Okay, that's what the Poisson process is. If you pick up any book on probability,

121
00:12:17,840 --> 00:12:22,320
then you can find a more detailed description if that's something that's new to you.

122
00:12:23,120 --> 00:12:28,480
So why the Poisson process? Why are we interested in the Poisson process? Well, the Poisson process

123
00:12:28,480 --> 00:12:33,759
happens to model an aggregation of many independent random events very well.

124
00:12:34,639 --> 00:12:41,600
For example, it's used in models of new funcals arriving to a switch. So when we have a telephone

125
00:12:41,600 --> 00:12:47,519
switch and we say we want to model the arrival of a new funcule that is being placed through the day,

126
00:12:47,519 --> 00:12:53,680
then a Poisson process is a very good model of this. Or the decay of many independent nuclear

127
00:12:53,679 --> 00:12:59,359
particles where we have a huge number of particles, all operating independently of each other.

128
00:12:59,359 --> 00:13:05,839
They will decay at certain times that decay as a aggregation of many random events tends to

129
00:13:05,839 --> 00:13:10,559
a Poisson process as we have a large number of particles. And you may also be familiar with

130
00:13:10,559 --> 00:13:14,799
shot noise in an electrical circuit, which is also modeled as a Poisson process.

131
00:13:15,439 --> 00:13:19,679
The final thing, despite the complexity of the equation on the on the on the previous slide,

132
00:13:19,679 --> 00:13:25,759
it actually makes the math very easy. And this is a big reason that it gets used very widely as well.

133
00:13:27,919 --> 00:13:34,000
At this point, I should give you some warnings. Network traffic is very bursty. There's nothing,

134
00:13:34,000 --> 00:13:39,919
nothing independent about one packet arrival after another. As we will see later packets tend

135
00:13:39,919 --> 00:13:45,120
very frequently to arrive in bursts. And many things in the network help actually to keep them

136
00:13:45,120 --> 00:13:51,200
that way and make them very bursty. So packet arrivals are not, and I can't overemphasize this,

137
00:13:51,200 --> 00:13:55,600
they are not Poisson. There's been some classic papers, research papers that have shown this.

138
00:13:56,320 --> 00:14:03,440
However, it does model quite well the arrival of new flows of new communications. For example,

139
00:14:03,440 --> 00:14:09,919
the inter-arrival times of web requests or sending emails. For anyone individual, they may be

140
00:14:09,919 --> 00:14:14,879
somewhat Poisson, but when you take the aggregation of many users putting their network traffic into

141
00:14:14,879 --> 00:14:21,759
the network, that is actually modeled quite well by a Poisson process. And sometimes, sometimes we

142
00:14:21,759 --> 00:14:27,519
can use some of the results that apply to queues with Poisson arrivals to give us an intuition

143
00:14:27,519 --> 00:14:32,879
and understanding of maybe what's happening even at the packet level, but we must do that very, very carefully.

144
00:14:36,480 --> 00:14:41,039
Let's look at a very common example of why we use the Poisson process. This is something called the

145
00:14:41,039 --> 00:14:48,719
MM1Q. The MM1Q is about the simplest type of queue that is commonly analyzed. The notation is that

146
00:14:49,279 --> 00:14:57,919
the M stands for a macovian arrival process, which in our case is Poisson. Macovian service process,

147
00:14:57,919 --> 00:15:04,639
which is exponential in our case, which means that the time that it takes to service a packet is

148
00:15:04,639 --> 00:15:10,720
exponentially distributed, and each one has a service time independent of all of the others,

149
00:15:11,279 --> 00:15:15,679
and that there is one server, in other words, that there's one outgoing line servicing this queue.

150
00:15:16,799 --> 00:15:22,879
This is very widely used, because it assumes a nice simple Poisson arrival with independent

151
00:15:22,879 --> 00:15:30,159
arrivals from one packet to the next. But it's also used because the math is nice and simple,

152
00:15:30,159 --> 00:15:36,879
and the result is very intuitive. So if we would have analyzed this and we can analyze it using

153
00:15:38,639 --> 00:15:41,519
continuous time macov chains, we will discover that the

154
00:15:42,959 --> 00:15:47,759
average delay of a packet going through this queue is given by the simple expression,

155
00:15:47,759 --> 00:15:57,360
one over mu minus lambda. What this tells us is that it's one over the difference between the

156
00:15:57,360 --> 00:16:02,399
service rate and the arrival rate. So as the load increases and the load gets closer and closer

157
00:16:02,399 --> 00:16:06,800
to the service rate, then this number will grow very rapidly. And if we plot this on a graph,

158
00:16:07,919 --> 00:16:17,279
so as a function of lambda over mu, so that's lambda over mu, as we get closer and closer to one,

159
00:16:17,279 --> 00:16:22,960
in other words, where they're equal, the average delay of a packet through this queue will

160
00:16:23,600 --> 00:16:30,240
increase very, very steeply. And this is the case for almost any queueing system, not just the

161
00:16:30,240 --> 00:16:36,480
MM1 queue. The reason that we use the MM1 queue sometimes as a placeholder for a more complicated

162
00:16:36,480 --> 00:16:41,280
system is only that the math is simpler and this expression is simple, but you see a very similar

163
00:16:41,280 --> 00:16:48,000
shape for almost any queueing system. We can use little's result to figure out what the average queue

164
00:16:48,080 --> 00:16:56,000
occupancy is and we know that L equals lambda times D, which in this case is simply going to be

165
00:16:56,879 --> 00:17:04,400
lambda over mu divided by one minus lambda over mu. The reason for writing it in terms of lambda

166
00:17:04,400 --> 00:17:10,079
over mu is simply that lambda over mu represents the intensity just as I sketched on the graph here.

167
00:17:11,200 --> 00:17:17,119
As lambda approaches mu, lambda over mu approaches one and the denominator turns to zero and the

168
00:17:17,199 --> 00:17:23,279
queue occupancy and the average delay will blow up and tend towards infinity. So the MM1 queue

169
00:17:23,279 --> 00:17:29,359
provides us a good intuition. Don't ever assume that this is the actual representative measure of

170
00:17:30,079 --> 00:17:35,199
the queue occupancy or the average delay, but it can often help to give it an intuitive sense of

171
00:17:35,199 --> 00:17:42,879
what's going on in a network. So in summary, the main queue properties I want you to take away from

172
00:17:42,880 --> 00:17:48,640
this video are that burstiness tends to increase delay. So bursty arrivals tend to make queuing

173
00:17:48,640 --> 00:17:54,800
delays longer. Little's result gives us a nice relationship between the average occupancy of a queue,

174
00:17:54,800 --> 00:17:59,920
L, lambda the arrival rate and D, the average delay of a customer through that queue.

175
00:18:00,960 --> 00:18:07,520
While packet arrivals are not Poisson, some events are such as web requests and new flow arrivals.

176
00:18:07,519 --> 00:18:12,639
And Poisson process also forms the basis of the MM1 queue, which is a simple queuing model that

177
00:18:12,639 --> 00:18:18,639
often can give us some intuition about the delay properties of a network. That's the end of this video.

