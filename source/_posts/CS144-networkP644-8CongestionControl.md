---
title: CS144 NetworkP644 8CongestionControl
---

1
00:00:00,000 --> 00:00:05,000
So in the video about TCP Reno and Neurino, I said that additive increase, multiplicative

2
00:00:05,000 --> 00:00:10,439
decrease, turns out to be really powerful and very effective mechanism for congestion control.

3
00:00:10,439 --> 00:00:14,320
This video, I'm trying to give you an intuition as to why.

4
00:00:14,320 --> 00:00:19,559
Why it turns out to work so well and why it is that it's generally used on the internet.

5
00:00:19,559 --> 00:00:24,679
So the way to think about this problem of congestion control is that there really are two conflicting

6
00:00:24,679 --> 00:00:26,440
requirements in the network.

7
00:00:26,440 --> 00:00:28,320
The first is a service provider.

8
00:00:28,320 --> 00:00:31,120
What they want to do is they want to maximize their link utilization.

9
00:00:31,120 --> 00:00:33,200
That is they want their network to be completely utilized.

10
00:00:33,200 --> 00:00:39,280
They don't want to have idle capacity, which is unused.

11
00:00:39,280 --> 00:00:42,160
But users want to get a fair share of that.

12
00:00:42,160 --> 00:00:46,799
A service provider would be happy if one user just got the entire pipe, but then you're

13
00:00:46,799 --> 00:00:50,760
going to lose all of your clients and users will be unhappy.

14
00:00:50,759 --> 00:00:57,519
So the idea is that you'd like an algorithm for congestion control that has the links

15
00:00:57,519 --> 00:01:04,079
operate close to utilization, but will converge to a point where every user is assuming everything

16
00:01:04,079 --> 00:01:08,359
else is equal, we'll get approximately one ant if they're end users.

17
00:01:08,359 --> 00:01:11,280
And in doing this, it's going to avoid congestion collapse that they're still doing useful

18
00:01:11,280 --> 00:01:12,280
data.

19
00:01:12,280 --> 00:01:13,959
So these are the basic parameters of the problem.

20
00:01:13,959 --> 00:01:17,560
We want to maximize link utilization of high link utilization.

21
00:01:17,560 --> 00:01:22,519
And while everyone gets a fair share of that link utilization, and we want to make sure

22
00:01:22,519 --> 00:01:26,120
that the network does not rot itself into the ground.

23
00:01:26,120 --> 00:01:28,000
So what should your congestion window size be?

24
00:01:28,000 --> 00:01:31,680
So it turns out the optimal congestion window size, as you talked about before, is the bandwidth

25
00:01:31,680 --> 00:01:32,680
delay product.

26
00:01:32,680 --> 00:01:37,200
And this is basically the idea that let's say I have my bandwidth between San Francisco

27
00:01:37,200 --> 00:01:43,840
and Boston is 10 megabytes per second.

28
00:01:43,840 --> 00:01:48,640
And the delay is 100 milliseconds.

29
00:01:48,640 --> 00:01:53,680
Well this means that if I can support 10 megabytes per second and a congestion window

30
00:01:53,680 --> 00:01:57,760
lasts 100 milliseconds, then my congestion window should essentially be one megabyte,

31
00:01:57,760 --> 00:01:58,760
right?

32
00:01:58,760 --> 00:02:01,159
The product of 100 megabytes per second times 100 milliseconds.

33
00:02:01,159 --> 00:02:12,800
Similarly, if my bandwidth is six megabytes per second and my delay is 90 milliseconds,

34
00:02:12,800 --> 00:02:19,800
then I should be sending approximately a congestion window of 540 kilobytes.

35
00:02:19,800 --> 00:02:21,120
And this falls out from these values.

36
00:02:21,120 --> 00:02:24,680
And then if I'm sending one megabyte per congestion window and there are 10 congestion windows,

37
00:02:24,680 --> 00:02:26,360
I'll be sending 10 megabytes per second.

38
00:02:26,360 --> 00:02:28,200
But I'll be sending 10 megabytes per second.

39
00:02:28,200 --> 00:02:33,760
Similarly, if my congestion window is 540 kilobytes and that's a congestion window every

40
00:02:33,760 --> 00:02:42,360
90 milliseconds, they'll break down to six megabytes per second.

41
00:02:42,360 --> 00:02:48,200
So now a way to think about how a congestion window works over time or rather how pairs

42
00:02:48,200 --> 00:02:51,800
of congestion windows work over time is something called the Choo Jane plot.

43
00:02:51,800 --> 00:02:56,480
And this is really part of the thing which sort of laid out some of the papers that laid

44
00:02:56,480 --> 00:03:00,400
out this first idea or so Y and D is a good idea.

45
00:03:00,400 --> 00:03:03,240
So a really nice graphical way.

46
00:03:03,240 --> 00:03:07,680
So what I want to do is plot, we have two flows that are competing for the network and

47
00:03:07,680 --> 00:03:13,599
we're going to plot the rate of flow A based on its say congestion window size and the

48
00:03:13,599 --> 00:03:19,840
rate of on the x axis and the rate of flow B on the y axis is going to be a scatter plot.

49
00:03:19,840 --> 00:03:24,760
Now if the network is fair, it will be equal to B. That is the rate which A gets will be

50
00:03:24,760 --> 00:03:30,240
equal to the rate which B gets and so the point, the scatter point dot, should fall on this

51
00:03:30,240 --> 00:03:33,439
line.

52
00:03:33,439 --> 00:03:38,120
Now that's the user requirement.

53
00:03:38,120 --> 00:03:43,719
Now if we are maintaining the service provider requirement as we're actually running the

54
00:03:43,719 --> 00:03:48,680
network at capacity, then it should be that A plus B, the sum of these two flows equal

55
00:03:48,680 --> 00:03:50,520
to the capacity of the network.

56
00:03:50,520 --> 00:03:59,960
So this is the service provider requirement.

57
00:03:59,960 --> 00:04:04,280
And so what we'd like is a congestion control algorithm that causes, starting wherever

58
00:04:04,280 --> 00:04:09,879
we are in this design, where we pick some random point is going to cause flow A and flow

59
00:04:09,879 --> 00:04:17,000
B to gravitate towards this desired point in the center where we are fair and efficient.

60
00:04:17,000 --> 00:04:22,199
We're fully utilizing the link.

61
00:04:22,199 --> 00:04:25,519
And so what you can show this is that if we're to the right of this efficiency line that

62
00:04:25,519 --> 00:04:28,400
means we've overloaded the network, so chance our packets are going to be dropped from

63
00:04:28,399 --> 00:04:30,199
the frequency triple duplicate acts.

64
00:04:30,199 --> 00:04:34,959
If we're in the green region, then we're under load of the network.

65
00:04:34,959 --> 00:04:39,120
And so we want to get to this point where we're operating right at the network capacity,

66
00:04:39,120 --> 00:04:43,439
but we have fair capacity.

67
00:04:43,439 --> 00:04:49,519
Now what this shows you, this series of T1 through T6, et cetera, is how additive increase

68
00:04:49,519 --> 00:04:51,159
multiplicative T-crease behaves.

69
00:04:51,159 --> 00:04:57,799
So let's just pick this arbitrary point T1 where flow B is operating it well above its

70
00:04:57,800 --> 00:05:01,040
fair shares, you can see this distance.

71
00:05:01,040 --> 00:05:09,600
And the flow A is operating well below its fair share, as you can see by this distance here.

72
00:05:09,600 --> 00:05:10,600
So what's going to happen?

73
00:05:10,600 --> 00:05:12,080
Both are in additive increase mode.

74
00:05:12,080 --> 00:05:16,759
And they're both going to additively increase their congestion window size and their flow

75
00:05:16,759 --> 00:05:21,639
rate until at some point the network becomes overloaded and it drops some packets.

76
00:05:21,639 --> 00:05:26,600
At which point then they multiplicatively decrease their window size and go back into additive

77
00:05:26,600 --> 00:05:27,600
increase.

78
00:05:27,600 --> 00:05:30,160
And so here's the multiplicative decrease.

79
00:05:30,160 --> 00:05:32,040
And then they additively increase.

80
00:05:32,040 --> 00:05:37,480
Now because the multiplicative decrease decreases B's rate more than A, it's a multiplicative

81
00:05:37,480 --> 00:05:38,960
factor.

82
00:05:38,960 --> 00:05:44,000
This then makes the plot, the comparison of A and B, closer to fair.

83
00:05:44,000 --> 00:05:51,240
You can see T3 here is bringing the pair of flows closer to the fair line.

84
00:05:51,240 --> 00:05:52,240
And that's we're seeing.

85
00:05:52,240 --> 00:05:58,759
So we're reducing each flow by a multiplicative factor over time and then increasing by an additive

86
00:05:58,759 --> 00:05:59,759
factor.

87
00:05:59,759 --> 00:06:03,759
Over time, the oscillate between overload and under load.

88
00:06:03,759 --> 00:06:06,759
In the sense of they're going to push the network until it's just a little bit overloaded,

89
00:06:06,759 --> 00:06:08,480
then they back off a little bit.

90
00:06:08,480 --> 00:06:13,960
And over time, this scaling, this multiplicative decrease, causes them to converge towards

91
00:06:13,960 --> 00:06:18,439
this point.

92
00:06:18,439 --> 00:06:23,719
And so in fact, in the end case, what we'll see is that depending on exactly what overload

93
00:06:23,719 --> 00:06:29,240
point causes triple duplicate acknowledgments, because there will be some cues, et cetera,

94
00:06:29,240 --> 00:06:34,439
you'll see these two flows oscillating along the fair line, under loading the network,

95
00:06:34,439 --> 00:06:36,879
then increasing, then overloading it.

96
00:06:36,879 --> 00:06:39,360
Oh, they back off, increasing.

97
00:06:39,360 --> 00:06:45,480
And so over time, additive increase, multiplicative decrease, causes a pair of flows or a set of

98
00:06:45,480 --> 00:06:49,560
flow flows to achieve both desired properties.

99
00:06:49,560 --> 00:06:53,080
They get a fair share of the capacity of the network.

100
00:06:53,080 --> 00:06:57,759
They end up moving along this line here, but also through their additive increase, they're

101
00:06:57,759 --> 00:07:00,439
going to be close to the network capacity.

102
00:07:00,439 --> 00:07:04,720
They're going to go a little bit past, then a little bit back, then a little bit past.

103
00:07:04,720 --> 00:07:09,840
But generally speaking, additive increase multiplicative decrease will cause flows to converge

104
00:07:09,840 --> 00:07:13,120
on this point, the desired equilibrium point of the network.

