---
title: CS144 NetworkP634 7aTCPReno
---

1
00:00:00,000 --> 00:00:05,179
In this video, I'm going to talk about two performance improvements used in TCP, fast read

2
00:00:05,179 --> 00:00:10,380
transmit and fast recovery.

3
00:00:10,380 --> 00:00:15,720
In addition to the congestion avoidance state, improve RTT estimation and self-clocking, TCP

4
00:00:15,720 --> 00:00:18,160
uses three more mechanisms.

5
00:00:18,160 --> 00:00:24,000
These mechanisms improve TCP's performance by softening its response to a packet loss.

6
00:00:24,000 --> 00:00:28,960
Recall that the mechanisms for TCP Tahoe caused it to behave more conservatively than AIMD.

7
00:00:28,960 --> 00:00:34,120
Packet is lost, TCP Tahoe drops to the slow start state at which point it exponentially

8
00:00:34,120 --> 00:00:37,200
increases the congestion window up to SS Thresh.

9
00:00:37,200 --> 00:00:41,120
At that point, it enters additive increase.

10
00:00:41,120 --> 00:00:45,880
The first mechanism, called fast read transmit, was part of TCP Tahoe.

11
00:00:45,880 --> 00:00:51,079
If a TCP Tahoe's sender receives three duplicate acknowledgments, so four acts for the same

12
00:00:51,079 --> 00:00:56,719
sequence number, it assumes the next segment was lost and retransments immediately retransments

13
00:00:56,719 --> 00:01:00,799
this segment immediately without waiting for a timeout.

14
00:01:00,799 --> 00:01:05,400
Assuming this retransmission succeeds, this reduces the delay before the sender receives

15
00:01:05,400 --> 00:01:10,039
an acknowledgment and can move the send window forward to send new data.

16
00:01:10,039 --> 00:01:15,960
TCP Tahoe treats these three triple duplicate acknowledgments as a loss and sets the congestion

17
00:01:15,960 --> 00:01:20,480
to one, dropping into the slow start state.

18
00:01:21,120 --> 00:01:29,040
TCP Reno, a later version of TCP, added a second algorithm, calls fast recovery, which has two mechanisms.

19
00:01:29,040 --> 00:01:34,760
The first is that when a loss is detected by a triple duplicate act, TCP Reno does not send

20
00:01:34,760 --> 00:01:36,520
the congestion window to one.

21
00:01:36,520 --> 00:01:39,680
It does not drop into the slow start state.

22
00:01:39,680 --> 00:01:42,960
Instead, it has the congestion window.

23
00:01:42,960 --> 00:01:48,680
Since SS Thresh is set to half the congestion window, this means that TCP Reno does not exit

24
00:01:48,680 --> 00:01:51,080
the congestion avoidance state.

25
00:01:51,080 --> 00:01:57,520
Using this algorithm, TCP Reno, in a steady state with no timeouts, follows an AAMD policy.

26
00:01:57,520 --> 00:02:03,400
On a loss, it halves the congestion window, multiplicative decrease, and uses additive increase.

27
00:02:03,400 --> 00:02:11,400
On a timeout, TCP Reno behaves as in TCP Tahoe, setting the congestion window to one.

28
00:02:11,400 --> 00:02:17,719
The second mechanism that TCP Reno added is that while in the fast recovery state, it inflates

29
00:02:17,719 --> 00:02:21,879
the congestion window by one for each duplicate acknowledgment.

30
00:02:21,879 --> 00:02:26,120
This is to prevent the problem that, in the case of a single loss, TCP cannot send data

31
00:02:26,120 --> 00:02:29,800
for an entire round trip time because it is waiting for an acknowledgment to advance its

32
00:02:29,800 --> 00:02:31,919
send window.

33
00:02:31,919 --> 00:02:36,159
Since each duplicate acknowledgment means the segment has left the network successfully,

34
00:02:36,159 --> 00:02:43,759
TCP could, in theory, send a new segment without congestion the network, congestion the network.

35
00:02:43,759 --> 00:02:49,280
Because the old congestion window size was C, increasingly congestion window by one for

36
00:02:49,280 --> 00:02:55,599
each duplicate act, the congestion window grows from C divided by 2, faster recovery, to

37
00:02:55,599 --> 00:03:00,120
C plus C divided by 2, or 3C over 2.

38
00:03:00,120 --> 00:03:06,759
This means that for these duplicate acknowledgments, from C over 2 to C, TCP can send a new segment,

39
00:03:06,759 --> 00:03:11,479
the second half of duplicate acknowledgments, TCP can send a new segment, as the congestion

40
00:03:11,479 --> 00:03:14,399
window has advanced further ahead.

41
00:03:14,399 --> 00:03:18,679
Once TCP receives a new acknowledgment, it resets its congestion window to correct value

42
00:03:18,679 --> 00:03:22,120
so C over 2.

43
00:03:22,120 --> 00:03:30,199
So let's put this together.

44
00:03:30,199 --> 00:03:35,199
TCP Tahoe, when it has a timeout, or triple duplicate acknowledgment, takes three steps.

45
00:03:35,199 --> 00:03:39,120
First, it sets SS-thrashed half of the congestion window.

46
00:03:39,360 --> 00:03:42,439
Second, it sets the congestion window to 1.

47
00:03:42,439 --> 00:03:45,719
Third, it retransmit the missing segment.

48
00:03:45,719 --> 00:03:49,960
These first two steps mean that it enters the slow start state and exponentially increases

49
00:03:49,960 --> 00:03:58,960
its congestion window until it experiences another loss or reaches SS-thrashed.

50
00:03:58,960 --> 00:04:04,439
This leads to the behavior we saw in the earlier figure of TCP Tahoe's behavior over time.

51
00:04:10,120 --> 00:04:16,120
So now let's walk through what TCP Tahoe does when it encounters a triple duplicate acknowledgment.

52
00:04:16,120 --> 00:04:22,240
Let's say the congestion window is 8MSS and a segment is lost.

53
00:04:22,240 --> 00:04:27,519
TCP will receive a total of seven duplicate acknowledgments.

54
00:04:27,519 --> 00:04:34,079
After the third one, it retransmit the missing segment, sets its congestion window to 1MSS,

55
00:04:34,079 --> 00:04:36,920
and SS-thrashed to 4.

56
00:04:36,920 --> 00:04:41,520
When it receives the act for the retransmission, it sends one new segment.

57
00:04:41,520 --> 00:04:46,199
When it receives an act for this segment, it sets its congestion window to 2.

58
00:04:46,199 --> 00:04:53,000
When it receives acts for these two segments, it increases its congestion window to 3, then 4.

59
00:04:53,000 --> 00:04:57,080
On reaching 4, it enters the congestion of wooden state.

60
00:04:57,080 --> 00:05:02,720
The next four acts will therefore increase the congestion window by only 1MSS.

61
00:05:02,720 --> 00:05:05,720
So that's TCP Tahoe.

62
00:05:06,920 --> 00:05:14,920
TCP Reno behaves identically to TCP Tahoe on a timeout.

63
00:05:14,920 --> 00:05:20,920
On a triple duplicate act, it performs fast-retransmit sending the segment immediately.

64
00:05:20,920 --> 00:05:26,800
Instead of sending its congestion window to 1, it hows it thereby staying in the congestion

65
00:05:26,800 --> 00:05:27,800
of wooden state.

66
00:05:27,800 --> 00:05:32,080
For each duplicate acknowledgment, it inflates the congestion window by 1 such that it sends

67
00:05:32,080 --> 00:05:35,920
new segments before the retransmited segment is acknowledged.

68
00:05:36,920 --> 00:05:45,920
So the major difference between Tahoe and Reno is fast recovery.

69
00:05:45,920 --> 00:05:48,840
So this is a figure showing TCP Reno's behavior.

70
00:05:48,840 --> 00:05:54,680
It starts in the slow start state until it sees a triple duplicate act.

71
00:05:54,680 --> 00:05:58,879
It hows the congestion window, staying in the congestion of wooden state, and performs

72
00:05:58,879 --> 00:05:59,879
fast-retransmit.

73
00:05:59,879 --> 00:06:04,800
It then starts increasing the congestion window using AIMD.

74
00:06:04,800 --> 00:06:10,079
In the flat spot before AIMD, it uses congestion window inflation to send new segments, and

75
00:06:10,079 --> 00:06:12,639
I'll show the inflation in the window size.

76
00:06:12,639 --> 00:06:18,120
On a second set of triple duplicate acts, the same occurs, it performs a fast-retransmit,

77
00:06:18,120 --> 00:06:21,720
hows the window, and stays in congestion of wooden.

78
00:06:21,720 --> 00:06:30,720
On a timeout, it sets the congestion window to 1, and reenters the slow start state.

79
00:06:30,720 --> 00:06:34,000
Conjection window inflation is part of fast recovery.

80
00:06:34,000 --> 00:06:36,920
These are the details of how it works.

81
00:06:36,920 --> 00:06:42,640
When TCP Reno enters fast recovery, it inflates the congestion window by 1 for each duplicate

82
00:06:42,640 --> 00:06:43,640
acknowledgment.

83
00:06:43,640 --> 00:06:47,880
Since the congestion window has halved, this means that the congestion window can grow larger

84
00:06:47,880 --> 00:06:52,480
than it was originally up to 3 times the old value divided by 2.

85
00:06:52,480 --> 00:06:58,120
This means that the sender will send old congestion window divided by 2 new segments minus 1

86
00:06:58,120 --> 00:07:08,600
for the lost segment, almost exactly the amount that a BAMED requires.

87
00:07:08,600 --> 00:07:13,079
Recall that this is the TCP Tahoe FSM with two states, slow start and congestion of

88
00:07:13,079 --> 00:07:18,720
wooden.

89
00:07:18,720 --> 00:07:21,639
And this is the full TCP Reno FSM.

90
00:07:21,639 --> 00:07:24,399
It adds a third state, fast recovery.

91
00:07:24,399 --> 00:07:29,560
On a triple duplicate act, rather than transition to slow start, it transitions to fast recovery.

92
00:07:29,560 --> 00:07:34,799
In the fast recovery state, it transitions back to congestion avoidance when it receives

93
00:07:34,799 --> 00:07:40,399
a new acknowledgment, resetting the congestion window to be half of the congestion window

94
00:07:40,399 --> 00:07:44,919
size when it transitions to the fast recovery state.

95
00:07:44,919 --> 00:07:49,759
On a timeout, it returns to slow start just as in congestion of wooden.

96
00:07:49,759 --> 00:07:56,199
On receiving a duplicate act, it increases the congestion window by 1.

97
00:07:56,199 --> 00:08:03,240
This plus 3 here in the transition to fast recovery is to consider the 3 duplicate acknowledgments

98
00:08:03,240 --> 00:08:10,599
that were received.

99
00:08:10,599 --> 00:08:13,719
So let's walk through TCP Reno's behavior.

100
00:08:13,719 --> 00:08:18,319
Suppose we start with a congestion window size of 8 maximum segment size and a segment

101
00:08:18,319 --> 00:08:19,759
is dropped.

102
00:08:19,759 --> 00:08:23,360
The sender will receive 7 duplicate acts.

103
00:08:23,360 --> 00:08:27,959
After the first 3, it will shrink the congestion window to be 4, remaining in the congestion

104
00:08:27,959 --> 00:08:28,959
avoidance state.

105
00:08:28,959 --> 00:08:34,240
It will inflate the congestion window by 3 to 7 MSS.

106
00:08:34,240 --> 00:08:40,480
On the next, fourth duplicate acknowledgment, the congestion window grows to 8 MSS.

107
00:08:40,480 --> 00:08:46,679
The next 3 acknowledgments will increase it to 9, 10, and 11 MSS, such as the sender

108
00:08:46,679 --> 00:08:49,199
can send 3 new segments.

109
00:08:49,199 --> 00:08:56,239
At around this time, the sender will receive an acknowledgment for the retransmission,

110
00:08:56,239 --> 00:09:00,239
whose act number moves the send window up to include all of the segments that trigger

111
00:09:00,239 --> 00:09:02,639
their duplicate acknowledgments.

112
00:09:02,639 --> 00:09:06,919
At this point, TCP Reno deflates its congestion window to the correct value, half of its

113
00:09:06,919 --> 00:09:07,919
old value.

114
00:09:07,919 --> 00:09:12,639
This is the last TCP Reno to send one new segment, at which point it will wait for acknowledgments

115
00:09:12,639 --> 00:09:15,959
from the segment centering fast recovery.

116
00:09:15,960 --> 00:09:18,560
Launching control is a very hard problem.

117
00:09:18,560 --> 00:09:21,840
Recalled, it wasn't anything someone expected.

118
00:09:21,840 --> 00:09:26,360
It was an emerging behavior that the early internet developers and users observed had

119
00:09:26,360 --> 00:09:29,840
to tackle in order to make the internet work again.

120
00:09:29,840 --> 00:09:34,560
The basic approach that TCP uses today is additive increase, multiplicative decrease, or

121
00:09:34,560 --> 00:09:35,560
AIMD.

122
00:09:35,560 --> 00:09:40,920
But there are a lot of details on exactly how this works, exactly how and when TCP sends

123
00:09:40,920 --> 00:09:44,360
data, retransments data, and sends acknowledgments.

124
00:09:44,360 --> 00:09:50,759
Creating AIMD work well and stable in practice requires tackling a bunch of edge cases.

125
00:09:50,759 --> 00:09:55,879
Almost all TCP variants today have TCP Reno at their core.

126
00:09:55,879 --> 00:09:58,720
There have been some additions to the deal with modern network speeds, but when you open

127
00:09:58,720 --> 00:10:03,639
a connection to your favorite website, your OS is using TCP Reno with slow start, congestion

128
00:10:03,639 --> 00:10:06,240
avoidance, fast retransmit, and fast recovery.

