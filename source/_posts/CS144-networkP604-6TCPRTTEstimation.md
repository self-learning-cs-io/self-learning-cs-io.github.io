---
title: CS144 NetworkP604 6TCPRTTEstimation
---

1
00:00:00,000 --> 00:00:08,240
TSP Tahoe made three major improvements that solved the congestion collapse problem

2
00:00:08,240 --> 00:00:09,599
on the internet and counter it.

3
00:00:09,599 --> 00:00:14,240
In the prior video, I talked about how it incorporated a congestion window into its two

4
00:00:14,240 --> 00:00:18,960
states of operation, slow start and congestion avoidance.

5
00:00:18,960 --> 00:00:23,480
In this video, I'll explain the other two mechanisms, RTTS, Tommation, and Self-Clocking.

6
00:00:30,000 --> 00:00:33,719
Recall that a TCP implementation boils down to three questions.

7
00:00:33,719 --> 00:00:35,840
The first is when you send data.

8
00:00:35,840 --> 00:00:39,320
TSP's answer is to use a congestion window to limit its transmissions when the network

9
00:00:39,320 --> 00:00:40,320
is congested.

10
00:00:40,320 --> 00:00:43,359
Next, let's answer the second question.

11
00:00:43,359 --> 00:00:53,840
When should TCP retransmit data?

12
00:00:53,840 --> 00:00:58,240
It turns out that estimating retransmission timeouts well can have a significant effect

13
00:00:58,240 --> 00:01:00,679
on TCP's behavior.

14
00:01:00,679 --> 00:01:05,960
Choosing timeouts that are too long will cause TCP to stall, waiting for acknowledgments.

15
00:01:05,960 --> 00:01:10,280
Choosing timeouts that are too short will cause TCP to back off too aggressively, dropping

16
00:01:10,280 --> 00:01:12,120
into the slow start state.

17
00:01:12,120 --> 00:01:16,520
So, TCP Tahoe introduced some improvements to timeout estimation.

18
00:01:16,520 --> 00:01:20,599
These improvements have turned out to be a generally good way to estimate noisy signals in network

19
00:01:20,599 --> 00:01:24,200
systems so learning them can give guidance on designing other protocols.

20
00:01:28,239 --> 00:01:38,079
Since TCP transitions to the slow start state and retransments on the timeout, having a

21
00:01:38,079 --> 00:01:40,799
good timeout value is critical.

22
00:01:40,799 --> 00:01:45,399
If the round trip time is a constant, then the optimal transmission timeout is just a tiny

23
00:01:45,399 --> 00:01:49,159
bit larger than the round trip time because a successfully received packet acknowledgment

24
00:01:49,159 --> 00:01:53,039
should take an RTT after the packet transmission.

25
00:01:53,039 --> 00:01:54,799
But round trip times are not constant.

26
00:01:54,799 --> 00:01:56,280
They can be highly dynamic.

27
00:01:56,280 --> 00:01:59,359
Furthermore, they can vary significantly with load.

28
00:01:59,359 --> 00:02:04,320
As a flow sends segments faster, it might start filling cues along the route, increasing

29
00:02:04,320 --> 00:02:05,799
its RTT.

30
00:02:05,799 --> 00:02:09,639
Verse of traffic from other sources can also vary the cueing delay.

31
00:02:09,639 --> 00:02:14,920
Given all of this noise, we need robust way to estimate how long before assuming a packet

32
00:02:14,920 --> 00:02:20,960
was lost.

33
00:02:20,960 --> 00:02:27,560
Before TCP Tahoe, TCP kept track of a single variable R, its RTT estimate.

34
00:02:27,560 --> 00:02:33,080
Each time it received a new acknowledgment, it would calculate an RTT estimate M from

35
00:02:33,080 --> 00:02:37,920
the time between when the segment was sent and the acknowledgment was received.

36
00:02:37,920 --> 00:02:41,760
R was an exponentially weighted moving average of those measurements.

37
00:02:41,760 --> 00:02:46,640
If there was no acknowledgment for a segment after 2R, TCP assumed it was lost and triggered

38
00:02:46,640 --> 00:02:49,560
a retransmission.

39
00:02:49,560 --> 00:02:52,640
So what's the problem with this approach?

40
00:02:52,640 --> 00:02:57,840
The basic problem is that it assumes that the variance of RTT measurements is a constant

41
00:02:57,840 --> 00:03:00,319
factor of its value.

42
00:03:00,319 --> 00:03:04,719
Imagine for example that you have a path of the high, low variance delay.

43
00:03:04,719 --> 00:03:08,879
For example, you have an underutilized link across the ocean floor.

44
00:03:08,879 --> 00:03:17,439
Even if the RTT is 80 milliseconds, with 99.99% of RTT being between 80 and 81 milliseconds,

45
00:03:17,439 --> 00:03:22,800
this TCP algorithm would wait 160 milliseconds before triggering the retransmit timer.

46
00:03:22,800 --> 00:03:26,599
This is almost an entire wasted RTT.

47
00:03:26,599 --> 00:03:30,560
Or imagine the opposite case, where the average RTT is 20 milliseconds, but it's very high

48
00:03:30,560 --> 00:03:35,240
variance, such that RTTs are sometimes as high as 80 milliseconds.

49
00:03:35,240 --> 00:03:40,879
Despite the fact that a significant fraction of packets have a high RTT, TCP will assume

50
00:03:40,879 --> 00:03:51,039
these packets are lost, shrink its congestion window to 1, and retransmit them.

51
00:03:51,039 --> 00:03:57,960
So TCP Tahoe incorporates an estimate of the RTT variance in its retransmission timeout.

52
00:03:57,960 --> 00:04:03,280
It maintains an exponentially weighted moving average of the RTT estimates as before.

53
00:04:03,280 --> 00:04:08,879
It also measures how much the measurement differs from the estimate, that is, the error

54
00:04:08,879 --> 00:04:11,759
between the estimate and the most recent measurement.

55
00:04:11,759 --> 00:04:16,399
It applies exponentially weighted moving average to this variance V as well.

56
00:04:16,399 --> 00:04:21,600
It calculates a timeout as the RTT estimate plus four times the variance.

57
00:04:21,600 --> 00:04:26,639
So if the connection is a very stable RTT, timeouts will be only slightly larger than the average

58
00:04:26,639 --> 00:04:28,120
RTT.

59
00:04:28,120 --> 00:04:34,639
But if there's large variation in the RTT, TCP will choose a much larger timeout.

60
00:04:34,639 --> 00:04:40,599
If the retransmission fails, that is, it isn't acknowledged, then TCP retransmits again

61
00:04:40,599 --> 00:04:43,240
with an exponentially increasing timer.

62
00:04:43,240 --> 00:04:47,519
TCP assumes that this means there's tremendous congestion, so continues its multiplicative

63
00:04:47,519 --> 00:04:54,839
decrease by increasing the interval between its retransmitted segments.

64
00:04:54,839 --> 00:04:58,759
The two values, G and beta, they were selected after a bit of experimentation.

65
00:04:58,759 --> 00:05:01,639
This approach is really robust to slight changes in them.

66
00:05:01,639 --> 00:05:12,800
There isn't any special magic behind them, they just tend to work well in practice.

67
00:05:12,800 --> 00:05:16,439
Here are two plots taken from the original TCP congestion control paper.

68
00:05:16,439 --> 00:05:21,719
They show both the RTT that TCP observes, the bottom, light line with data points, and

69
00:05:21,719 --> 00:05:25,959
the timeout estimate TCP maintains the dark line on top.

70
00:05:25,959 --> 00:05:31,319
TCP Tahoe of pre-Tahoe is very conservative, the large gap between the measurements and

71
00:05:31,319 --> 00:05:33,799
the timeout value.

72
00:05:33,799 --> 00:05:39,439
Represent wasted time when TCP should has been waiting too long to retransmit, also around

73
00:05:39,439 --> 00:05:46,759
packets 60 when the RTT spikes upward, pre-Tahoe would retransmit in slow start unnecessarily.

74
00:05:46,759 --> 00:05:53,439
In contrast, RTT estimation for TCP Tahoe shown on the right much more closely tracks the

75
00:05:53,439 --> 00:05:55,479
RTT values.

76
00:05:55,480 --> 00:05:57,560
Now we've answered the second question.

77
00:05:57,560 --> 00:06:01,439
When does TCP retransmit data?

78
00:06:01,439 --> 00:06:07,220
The lesson from this is that one needs to re-transmission a retry timer when one needs

79
00:06:07,220 --> 00:06:12,720
to re-transmission a retry timer in a network protocol, consider not only the observed round

80
00:06:12,720 --> 00:06:15,720
trip time, but also its variant.

81
00:06:15,720 --> 00:06:26,480
So now I've come to the third question.

82
00:06:26,480 --> 00:06:33,160
When should TCP send acknowledgments?

83
00:06:33,160 --> 00:06:36,680
It turns out the answer is generally with as little delay as possible.

84
00:06:36,680 --> 00:06:42,040
If TCP follows this policy, it leads to a very important powerful behavior called self-clocking.

85
00:06:42,040 --> 00:06:52,080
Self-clocking means that if TCP sends acknowledgments aggressively, then it turns out the old space

86
00:06:52,080 --> 00:06:56,360
out in time according to the throughput of the bottleneck link.

87
00:06:56,360 --> 00:07:00,520
The sender will receive acknowledgments spaced out over time.

88
00:07:00,520 --> 00:07:04,920
Since the sender will send new data as soon as the sender window advances, this means that

89
00:07:04,920 --> 00:07:10,120
it will send segments at the rate that the bottleneck link can support.

90
00:07:10,120 --> 00:07:13,439
This figure shows that behavior visually.

91
00:07:13,439 --> 00:07:18,879
The throughput of the network is shown as the width of the path, and time is shown as the

92
00:07:18,879 --> 00:07:22,399
length of the path.

93
00:07:22,399 --> 00:07:27,959
Packets sent on fat, high bandwidth links, take a small amount of time.

94
00:07:27,959 --> 00:07:34,000
The same packets sent over a low bandwidth link have a longer transmission time in Q&A

95
00:07:34,000 --> 00:07:36,319
and so take more time.

96
00:07:36,319 --> 00:07:50,240
When they emerge out of a bottleneck link, they will be fast again, but spaced out in

97
00:07:50,240 --> 00:07:54,360
time according to the rate at which they exit the bottleneck.

98
00:07:54,360 --> 00:07:58,620
Since acknowledgments packets are small and assuming the bottleneck is not on the reverse

99
00:07:58,620 --> 00:08:03,560
path, this means the acknowledgments will arrive at the sender at approximately the

100
00:08:03,560 --> 00:08:09,000
rate of which they traverse the bottleneck link.

101
00:08:09,000 --> 00:08:11,839
This policy has an additional benefit.

102
00:08:11,839 --> 00:08:16,519
TCP only puts new packets into the network when it receives an acknowledgment, that is,

103
00:08:16,519 --> 00:08:19,639
when one of its existing packets has left the network.

104
00:08:19,639 --> 00:08:23,879
From a congestion standpoint, this means TCP is keeping the number of outstanding packets

105
00:08:23,879 --> 00:08:26,720
that if the utilization of queuing capacity in the network is stable.

106
00:08:34,399 --> 00:08:40,279
So the self-clocking principle means that TCP sends acknowledgments aggressively as soon

107
00:08:40,279 --> 00:08:42,439
as it receives data segments.

108
00:08:42,439 --> 00:08:46,179
This is to signal to the sender that data has left the network as well as to give RTTS

109
00:08:46,179 --> 00:08:50,399
estimates and allow it to self-clock its transmissions.

110
00:08:50,399 --> 00:08:55,159
So in summary, TCP Tao introduced three major mechanisms that allow it to effectively

111
00:08:55,159 --> 00:08:59,239
manage congestion and obtain good performance even in busy networks.

112
00:08:59,240 --> 00:09:04,639
The first is that it introduces a congestion window and maintains an AMD-like state

113
00:09:04,639 --> 00:09:09,000
machine that transitions between the slow-starting congestion avoidance states.

114
00:09:09,000 --> 00:09:13,080
This state machine controls how the congestion window updates.

115
00:09:13,080 --> 00:09:17,560
The second is that it calculates retransition timers using both an exponentially weighted

116
00:09:17,560 --> 00:09:22,360
moving average as well as the variance thereby reducing both false positives as well as

117
00:09:22,360 --> 00:09:24,039
false negatives.

118
00:09:24,039 --> 00:09:28,919
Finally, by sending acknowledgments aggressively, its self-clocked data transmissions to

119
00:09:28,919 --> 00:09:30,919
match the speed of the bottleneck link.

