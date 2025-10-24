---
title: CS144 NetworkP664 11CongestionControl
---

1
00:00:00,000 --> 00:00:03,160
In this unit, you've seen how transport and packets

2
00:00:03,160 --> 00:00:06,400
whenching interact through congestion control.

3
00:00:06,400 --> 00:00:08,800
Flow control is about the end hosts.

4
00:00:08,800 --> 00:00:11,320
It ensures that the source host doesn't overwhelm

5
00:00:11,320 --> 00:00:15,280
the destination host by sending more than it can receive.

6
00:00:15,280 --> 00:00:17,199
Congestion control, on the other hand,

7
00:00:17,199 --> 00:00:18,879
is about preventing the source hosts

8
00:00:18,879 --> 00:00:22,160
from overwhelming the links and routers in between.

9
00:00:22,160 --> 00:00:25,160
When a source host put too many packets into the network,

10
00:00:25,160 --> 00:00:27,879
or when lots of sources put packets into the network,

11
00:00:27,879 --> 00:00:31,119
they can fill up the router queues until they overflow.

12
00:00:31,119 --> 00:00:35,159
In TCP, a congestion control algorithm running on the sending host

13
00:00:35,159 --> 00:00:38,640
tells it how many packets it can have outstanding in the network,

14
00:00:38,640 --> 00:00:41,759
so as not to overfill the router queues.

15
00:00:41,759 --> 00:00:45,320
TCP will always lead to some packets being dropped,

16
00:00:45,320 --> 00:00:47,399
because this is the feedback signal it uses

17
00:00:47,399 --> 00:00:49,840
to know when the router queues are full.

18
00:00:49,840 --> 00:00:53,960
But when it's working well, TCP keeps the packet drop rate low,

19
00:00:53,960 --> 00:00:58,120
links nice and full, and allows the flow to have a high throughput.

20
00:01:00,280 --> 00:01:04,760
First, Nick explained the principles of network congestion.

21
00:01:04,760 --> 00:01:06,280
We learned what happens in a router structure

22
00:01:06,280 --> 00:01:09,719
receiving packets faster than it can send them.

23
00:01:09,719 --> 00:01:11,680
If the congestion is short-lived,

24
00:01:11,680 --> 00:01:14,000
then a router can absorb the such a traffic into a queue

25
00:01:14,000 --> 00:01:15,760
and drain the queue.

26
00:01:15,760 --> 00:01:18,520
If the congestion is long-lived, long-lived enough

27
00:01:18,520 --> 00:01:23,079
that the queue overflows, then the router has to drop some packets.

28
00:01:23,079 --> 00:01:26,519
Nick introduced a very valuable way to think about this.

29
00:01:26,519 --> 00:01:29,359
Rather than come up with a scheme for dropping packets,

30
00:01:29,359 --> 00:01:33,439
think about what you want the overall network behavior to be.

31
00:01:33,439 --> 00:01:35,319
We want the network to be fair,

32
00:01:35,319 --> 00:01:36,920
and explain what that means,

33
00:01:36,920 --> 00:01:40,280
introducing the concept of max min fairness.

34
00:01:40,280 --> 00:01:42,599
Max min fairness says that the network is fair

35
00:01:42,599 --> 00:01:45,560
if you can't increase the rate of a flow

36
00:01:45,560 --> 00:01:49,759
without decreasing the rate of a flow with a lower rate.

37
00:01:50,560 --> 00:01:52,359
There are a lot of ways to achieve this goal,

38
00:01:52,359 --> 00:01:55,280
and now that they have many different mechanisms.

39
00:01:55,280 --> 00:01:57,760
But we focused on one in particular,

40
00:01:57,760 --> 00:02:02,560
how TCP can control the number of outstanding packets in the network.

41
00:02:02,560 --> 00:02:04,680
We learned the basic algorithm TCP uses

42
00:02:04,680 --> 00:02:08,520
called additive increase, multiplicative decrease, or AIMD.

43
00:02:09,680 --> 00:02:13,120
When running smoothly, TCP increases the number of bytes

44
00:02:13,120 --> 00:02:16,439
it can have outstanding by one segment size per run trip time.

45
00:02:17,400 --> 00:02:19,560
When TCP detects a packet is dropped,

46
00:02:19,560 --> 00:02:22,039
it has the number of bytes it can have outstanding.

47
00:02:23,520 --> 00:02:25,120
You learn what this behavior looks like

48
00:02:25,120 --> 00:02:27,319
using a TCP sawtooth diagram.

49
00:02:27,319 --> 00:02:30,080
Well, each individual flow has a sawtooth.

50
00:02:30,080 --> 00:02:32,640
Over a link that shares many flows,

51
00:02:32,640 --> 00:02:36,680
these all average out to a consistently high use of the link.

52
00:02:36,680 --> 00:02:39,439
Using the sawtooth, we derive TCP's throughput

53
00:02:39,439 --> 00:02:42,240
using using symbol AIMD.

54
00:02:42,240 --> 00:02:44,599
If you assume that the network drops packets

55
00:02:44,599 --> 00:02:46,439
at a uniform rate P,

56
00:02:46,439 --> 00:02:48,920
and the throughput of a TCP flow,

57
00:02:48,919 --> 00:02:51,719
is the square root of three halves

58
00:02:51,719 --> 00:02:56,399
times the inverse of the RTT times the square root of P.

59
00:02:57,639 --> 00:03:01,479
If you increase the run trip time, throughput goes down.

60
00:03:01,479 --> 00:03:03,959
This equation makes a lot of simplifying assumptions,

61
00:03:03,959 --> 00:03:07,119
but it turns out to be generally pretty accurate in many cases,

62
00:03:07,119 --> 00:03:08,479
and so a very valuable tool

63
00:03:08,479 --> 00:03:11,079
when thinking about how a network might behave.

64
00:03:12,919 --> 00:03:16,519
You've learned how TCP realizes these principles in practice.

65
00:03:16,519 --> 00:03:18,119
Phil told you about the internet,

66
00:03:18,120 --> 00:03:21,200
collapsing in the late 1980s due to congestion,

67
00:03:21,200 --> 00:03:23,039
and the fixes made to TCP,

68
00:03:23,039 --> 00:03:25,200
which are still in use today.

69
00:03:25,200 --> 00:03:28,280
You learned about three versions of TCP, TCP Tahoe,

70
00:03:28,280 --> 00:03:30,840
TCP Reno, and TCP New Reno.

71
00:03:32,039 --> 00:03:34,200
The first important idea we covered

72
00:03:34,200 --> 00:03:38,280
is that a TCP endpoint maintains a congestion window.

73
00:03:38,280 --> 00:03:41,439
A TCP flow can have n unacknowledged bytes

74
00:03:41,439 --> 00:03:42,840
outstanding in the network,

75
00:03:42,840 --> 00:03:45,200
wherein is the minimum of its flow control window

76
00:03:45,200 --> 00:03:47,680
and its congestion control window.

77
00:03:47,680 --> 00:03:49,439
You don't put more packets into the network

78
00:03:49,439 --> 00:03:51,040
than the other end can handle,

79
00:03:51,040 --> 00:03:54,159
or more than the links and routers can handle in between.

80
00:03:55,439 --> 00:03:57,400
You learned how TCP controls the size

81
00:03:57,400 --> 00:04:00,800
of this congestion control window using two states,

82
00:04:00,800 --> 00:04:03,439
slow start and congestion avoidance.

83
00:04:03,439 --> 00:04:06,400
Slow start lets TCP quickly find something close

84
00:04:06,400 --> 00:04:08,840
to the right congestion window size.

85
00:04:08,840 --> 00:04:11,600
While congestion avoidance uses AIMD.

86
00:04:12,960 --> 00:04:15,560
TCP starts in slow start and transitions

87
00:04:15,560 --> 00:04:18,560
to congestion avoidance when it first detects a loss.

88
00:04:19,720 --> 00:04:22,000
You learned how TCP estimates the round trip time

89
00:04:22,000 --> 00:04:23,000
of its connection.

90
00:04:23,000 --> 00:04:24,560
It needs this estimate to figure out

91
00:04:24,560 --> 00:04:26,280
when an acknowledgement times out,

92
00:04:26,280 --> 00:04:27,959
by keeping track of both the average,

93
00:04:27,959 --> 00:04:29,720
as well as the variance of how long it takes

94
00:04:29,720 --> 00:04:31,480
to receive an act for a segment,

95
00:04:31,480 --> 00:04:34,279
TCP can avoid unnecessary retransmissions,

96
00:04:34,279 --> 00:04:35,680
as well as not wait too long.

97
00:04:37,079 --> 00:04:39,840
You learned how TCP controls when it puts packets into the network,

98
00:04:39,840 --> 00:04:42,680
using a technique called self-clocking.

99
00:04:42,680 --> 00:04:44,920
You first saw self-clocking when I showed you an animation

100
00:04:44,920 --> 00:04:46,400
of TCP's behavior.

101
00:04:46,400 --> 00:04:48,759
Fill them walk you through some examples.

102
00:04:48,759 --> 00:04:52,000
With self-clocking, TCP only puts a new packet into the network

103
00:04:52,000 --> 00:04:55,360
when it receive an acknowledgement or when there's a timeout.

104
00:04:55,360 --> 00:04:57,319
This is really helpful in preventing congestion,

105
00:04:57,319 --> 00:05:00,400
as it means TCP only puts packets into the network

106
00:05:00,400 --> 00:05:02,080
when packets have left the network.

107
00:05:03,080 --> 00:05:05,759
Finally, we covered three optimizations,

108
00:05:05,759 --> 00:05:10,360
out optimizations added in TCP Reno and TCP New Reno.

109
00:05:10,360 --> 00:05:13,120
Fast retransmit lets TCP keep on making progress

110
00:05:13,120 --> 00:05:15,319
when only one packet has been dropped.

111
00:05:15,319 --> 00:05:16,600
Rather than wait for a timeout,

112
00:05:16,600 --> 00:05:18,600
TCP retransmit the segment

113
00:05:18,600 --> 00:05:21,240
when it detects three duplicate acknowledgments

114
00:05:21,240 --> 00:05:22,560
for the previous segment.

115
00:05:22,560 --> 00:05:25,959
This is a sign that TCP is continuing to receive segments,

116
00:05:25,959 --> 00:05:28,199
but hasn't received that particular one.

117
00:05:29,199 --> 00:05:33,120
Using fast recovery, TCP Reno doesn't drop back into slow start

118
00:05:33,120 --> 00:05:34,759
or on three duplicate acts.

119
00:05:34,759 --> 00:05:37,079
It just cuts the congestion window in half

120
00:05:37,079 --> 00:05:39,560
and stays in congestance avoidance.

121
00:05:39,560 --> 00:05:43,079
Finally, TCP New Reno adds an additional optimization

122
00:05:43,519 --> 00:05:46,399
window inflation such that three duplicate acts

123
00:05:46,399 --> 00:05:49,959
don't cause TCP to lose an RTT worth of transmissions

124
00:05:49,959 --> 00:05:52,399
as it waits for the missing segment to be hacked.

125
00:05:55,479 --> 00:05:58,319
Now what's really fascinating about congestion

126
00:05:58,319 --> 00:06:00,000
was that it's something that was discovered

127
00:06:00,000 --> 00:06:01,759
as the internet evolved.

128
00:06:01,759 --> 00:06:04,120
Nobody had really thought something like this might happen

129
00:06:04,120 --> 00:06:05,639
or how to control it.

130
00:06:05,639 --> 00:06:07,079
It was an immersion behavior

131
00:06:07,079 --> 00:06:10,560
once the network became large and heavily used enough.

132
00:06:10,560 --> 00:06:13,280
Nowadays, it's a basic concept in networking,

133
00:06:13,280 --> 00:06:15,680
seen as critical to building robust systems

134
00:06:15,680 --> 00:06:17,000
that have high performance.

135
00:06:18,439 --> 00:06:21,439
Modern versions of TCP are a bit more advanced

136
00:06:21,439 --> 00:06:23,600
than what we've talked about in class,

137
00:06:23,600 --> 00:06:25,399
but mostly they've evolved to handle

138
00:06:25,399 --> 00:06:27,759
much, much faster networks.

139
00:06:27,759 --> 00:06:30,360
The TCP versions shipped in operating systems

140
00:06:30,360 --> 00:06:33,759
have TCP Reno or TCP New Reno in their algorithms

141
00:06:33,759 --> 00:06:36,120
with new additional features and modes of operations

142
00:06:36,120 --> 00:06:38,000
to handle very fast networks.

143
00:06:38,000 --> 00:06:39,399
Take a look at the Linux source code

144
00:06:39,399 --> 00:06:41,879
and you'll see these algorithms in there.

145
00:06:44,479 --> 00:06:46,919
But what's also neat is that these nitty-gritty algorithms

146
00:06:46,919 --> 00:06:49,839
have a sound conceptual basis and theory behind them.

147
00:06:49,839 --> 00:06:52,599
On one hand, we can talk about RTT variance estimation

148
00:06:52,599 --> 00:06:54,639
faster covering self-clocking.

149
00:06:54,639 --> 00:06:57,799
On the other, we're also talking about AMD flows

150
00:06:57,799 --> 00:07:00,000
that can converge to maximum infernice.

