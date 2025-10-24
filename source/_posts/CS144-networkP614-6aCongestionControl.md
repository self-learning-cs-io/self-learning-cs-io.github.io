---
title: CS144 NetworkP614 6aCongestionControl
---

1
00:00:00,000 --> 00:00:04,160
So in this video, I'm going to talk about two additional mechanisms that TCP Tahoe introduced to

2
00:00:04,160 --> 00:00:09,200
control congestion. Better RTT around triptime estimation and self-clocking.

3
00:00:13,599 --> 00:00:18,879
To recall the TCP Tahoe introduced three basic mechanisms that allowed it to tame congestion and

4
00:00:18,879 --> 00:00:24,000
essentially allow the internet to work again. The prior video talked about a congestion window

5
00:00:24,000 --> 00:00:29,519
and this idea of the slow start and the condition of wooden states. Now let's talk about the second

6
00:00:29,519 --> 00:00:37,359
mechanism timeout estimation. So it turns out that estimating around triptime is really critical

7
00:00:37,359 --> 00:00:42,159
for retransmissions and for timeouts. If your round trip time is estimated to be too short,

8
00:00:42,159 --> 00:00:46,000
that is, you estimate to be shorter than what it is, then this means that you're going to waste

9
00:00:46,000 --> 00:00:51,039
capacity. You are going to think that the packet wasn't successfully received when it has been

10
00:00:51,039 --> 00:00:55,760
and retransmit unnecessarily. This is then going to trigger slow start. So this is really bad.

11
00:00:55,759 --> 00:01:00,559
In the sense of I have a nice window size, I'm sending data, but my RTT estimates are too short.

12
00:01:00,559 --> 00:01:07,120
I'm now entering slow start unnecessarily. Now, if the RTT estimation is too long, that's also a

13
00:01:07,120 --> 00:01:12,159
problem because it could be that really I could have retransmined a long time ago. The packet didn't

14
00:01:12,159 --> 00:01:16,000
get there, but say let's say I estimated an RTT of five minutes when it's only a couple hundred

15
00:01:16,000 --> 00:01:21,840
milliseconds. Your protocol is going to sit there dead for five minutes before it issues a timeout

16
00:01:21,920 --> 00:01:27,920
and tries to do a retransmission. This is fine, but the real challenge is that especially on the

17
00:01:27,920 --> 00:01:33,040
internet, as we've seen with packet switching, RTT can be highly dynamic. Furthermore, it can vary

18
00:01:33,040 --> 00:01:37,359
significantly with load, even as you are starting to send things faster, you can change your own RTT,

19
00:01:37,359 --> 00:01:42,400
even if the rest of the world remain the same. So how do you estimate RTT, very inexpensively,

20
00:01:42,400 --> 00:01:49,600
very quickly, given these constraints? So before TCPTaho, there is a very simple mechanism,

21
00:01:49,599 --> 00:01:54,239
which is that R is your RTT estimate. English initialize it to something reasonable. Okay,

22
00:01:54,239 --> 00:02:00,399
we'll guess 500 milliseconds or something. Then you are generating a measurement from the most

23
00:02:00,399 --> 00:02:05,439
recently axed data packet. So you say, okay, I sent packet five at this time. I now got the

24
00:02:05,439 --> 00:02:11,840
act at time plus 57 milliseconds or say 200 milliseconds, and then going to estimate M will be

25
00:02:12,319 --> 00:02:18,719
57 or 200 milliseconds. I then maintain an expensively weighted moving average. Alpha

26
00:02:18,879 --> 00:02:25,280
R plus 1 minus alpha M. This is basically saying take my existing estimate and incorporate

27
00:02:25,280 --> 00:02:32,159
some fraction of my new estimate. So if I say, let's just say R is equal to 100 milliseconds,

28
00:02:33,039 --> 00:02:39,680
and my measurement is equal to 80 milliseconds, and alpha, which are the weighting of history to

29
00:02:39,680 --> 00:02:45,680
the present sample, let's just say alpha is equal to 0.9. So I'm going to weight history a lot,

30
00:02:45,680 --> 00:02:51,920
this is the way to sort of smooth out noise. Then the new R is going to be 0.9 times 100 milliseconds,

31
00:02:52,480 --> 00:03:00,240
plus 0.1 times 80 milliseconds, equal to 90 milliseconds. And so this one sample of 80 milliseconds

32
00:03:00,240 --> 00:03:04,159
is going to sort of go one tenth of the way between R and M.

33
00:03:07,360 --> 00:03:11,120
So you can imagine a lower alpha value means that you're going to weight the current measurements

34
00:03:11,120 --> 00:03:19,120
more versus a higher alpha value weight history more. Then your timeout is based on this factor beta

35
00:03:19,120 --> 00:03:26,719
R and beta was 2. And so if you see that you don't get an acknowledgement for twice your average,

36
00:03:26,719 --> 00:03:31,680
then you assume there's a timeout and then you trigger a timeout. So this seems like a totally

37
00:03:31,680 --> 00:03:37,040
reasonable algorithm, you know, in first blush. So what's the problem? It turns out that the problem

38
00:03:37,039 --> 00:03:44,319
is that the fact that R is a certain value should not say anything about what the distribution of

39
00:03:44,319 --> 00:03:48,799
RTT values is like. So one way to imagine is let's say, you know, here's a graph and I'm looking at

40
00:03:48,799 --> 00:03:53,120
a distribution of the round trip times packets. They're not constant, they're varying over time.

41
00:03:53,840 --> 00:03:59,599
Well, in some cases, I might have, here's my average, let's call it A, I might have a distribution

42
00:03:59,680 --> 00:04:10,000
like this, right? Where in fact, if I were to look at 2A, that less than 0.0001 percent of packets take

43
00:04:10,000 --> 00:04:14,639
that long. At which point beta, a beta of 2 is a tremendously conservative estimate.

44
00:04:16,959 --> 00:04:21,680
But it could also be, obviously, a different case. We're here, let's just say I have another link

45
00:04:21,680 --> 00:04:27,199
or another path, which is B, where my distribution looks more like this.

46
00:04:30,560 --> 00:04:40,000
Where if I look at 2B, some say 20 percent of packets tend to have an RTT of that long.

47
00:04:40,879 --> 00:04:44,639
Depending on the dynamics of the network, you can have very different distribution of RTTs.

48
00:04:45,599 --> 00:04:52,000
And this approach didn't keep that in mind. And so for TCP connections that had very, very tight

49
00:04:52,000 --> 00:04:57,519
distributions, beta is way too conservative. And you end up being idle when you don't need to be,

50
00:04:57,519 --> 00:05:04,719
it nestimates to large in RTT. But when the RTT has a very broad distribution,

51
00:05:04,719 --> 00:05:11,439
a beta equals 2 is far too aggressive. And you end up retransmitting on this,

52
00:05:11,439 --> 00:05:17,920
necessarily. So TCP Tahoe solved this problem by essentially including the notion of the

53
00:05:17,920 --> 00:05:23,920
variance of the RTT in its estimates. And so this is the algorithm that was proposed,

54
00:05:23,920 --> 00:05:28,159
which is used. And essentially what you're going to do is just like before you're doing an

55
00:05:28,159 --> 00:05:36,879
exponentially weighted moving average, you have this RTT estimate. And what you're doing is also

56
00:05:36,879 --> 00:05:42,159
measuring your error in the estimate. And so given I have this estimate R, and I have

57
00:05:42,159 --> 00:05:47,680
an measurement M, I measure the error to be M minus R. And I multiply it by this gain factor,

58
00:05:47,680 --> 00:05:52,399
because these terms are essentially multiplying by minus R. So there's the alpha factor

59
00:05:53,439 --> 00:05:59,120
that we saw in the prior approach. And then we measure the variance. And so the variance is,

60
00:05:59,120 --> 00:06:02,800
again, with weighted averages, the gain factor of the error minus the variance.

61
00:06:03,439 --> 00:06:10,639
But the basic idea here is we're measuring not only an exponentially weighted moving average of R,

62
00:06:11,680 --> 00:06:17,680
but we're also measuring an exponentially moving average of the variance over time.

63
00:06:18,800 --> 00:06:24,080
And then our timeout is equal to the average plus four times the variance, where beta is four.

64
00:06:24,079 --> 00:06:32,000
So this way, if we have, as before, if we have a very tight distribution, then with the variance

65
00:06:32,800 --> 00:06:37,599
like this, then we're going to timeout when the packet, when the variance is just, when you have a

66
00:06:37,599 --> 00:06:42,799
packet that's just four times the variance out. Similarly, if you have a very broad distribution,

67
00:06:44,240 --> 00:06:49,680
your variance is going to be out here. Then you'll end up timing out when the very, when the,

68
00:06:50,400 --> 00:06:55,680
it's four times that value. And so it's very likely that the packet was actually lost.

69
00:06:57,040 --> 00:07:02,079
In the case of tremendous congestion, you're not getting estimates, you're nothing is happening.

70
00:07:02,079 --> 00:07:07,920
You exponentially increase this timeout. So here are two graphs from Vengeance paper, which show

71
00:07:07,920 --> 00:07:17,040
the performance of this RTTS dimension. And so what the faint line on the bottom shows is the actual

72
00:07:17,040 --> 00:07:23,600
measured RTTS of packets from acknowledgments. And the solid line above shows the timeout estimate

73
00:07:24,400 --> 00:07:31,920
for the TCP algorithm. And so the idea is that a perfect world that the timeout would

74
00:07:32,879 --> 00:07:37,840
perfectly mirror this such that gosh, we didn't get it. And if we just wait a little longer,

75
00:07:37,840 --> 00:07:41,920
then we know to retransmit. So there are two points. This figure on the left, you can see that there's

76
00:07:41,920 --> 00:07:46,240
this huge gap. So TCP is sitting idle for a long time when really it could have retransmit

77
00:07:46,240 --> 00:07:52,319
much sooner. There's also cases where it crosses. So this is kind of bad where this means that the

78
00:07:52,319 --> 00:07:59,759
packet took longer. You know, the estimate was in fact two, was too short. And so if you look,

79
00:07:59,759 --> 00:08:03,600
this is the pre-Tahoe algorithm on the right is the post-Tahoe algorithm. We see that it's tracking

80
00:08:04,560 --> 00:08:10,400
the RTTS much, much better, right? That the gap here between the observed RTTS and the timeouts

81
00:08:10,399 --> 00:08:17,679
is much closer. So the third improvement that TCP Tahoe brought was something called self-clocking.

82
00:08:18,399 --> 00:08:25,519
And this in some ways the greatest conceptual contribution of TCP Tahoe. This idea that

83
00:08:26,639 --> 00:08:31,679
you want to essentially clock out the packets that you send based on the acknowledgments to receive.

84
00:08:33,360 --> 00:08:39,679
And so this is the conceptual model that Van Jacobson laid out. So let's say I have a sender that

85
00:08:39,679 --> 00:08:44,559
has a really big pipe. We show it by sort of being fat here where the volume of these packets is

86
00:08:44,559 --> 00:08:50,000
constant. And the receiver also has a fat pipe. But there is this bottleneck link in the middle.

87
00:08:50,000 --> 00:08:53,519
Well, since there's this bottleneck link, what's going to happen is these packets that are sent very

88
00:08:53,519 --> 00:08:57,519
fast from the sender are going to be stretched out in time. They're going to take longer. And they're

89
00:08:57,519 --> 00:09:03,919
then going to be spaced out in time at the receiver. The receiver, if it generates acknowledgments

90
00:09:03,919 --> 00:09:09,359
directly in response to these packets, then it's going to be sending acknowledgments back with the

91
00:09:09,360 --> 00:09:16,720
same timing that it's receiving them, which is determined by this bottleneck congestion link.

92
00:09:18,080 --> 00:09:22,639
Then those acts are going to arrive. They traverse the bottleneck link. You can see they're

93
00:09:22,639 --> 00:09:27,360
much shorter. So they're not filling it. They only take a part of it. And then these acknowledgments

94
00:09:27,360 --> 00:09:32,639
arrive at the sender corresponding to the frequency of the packets arriving at the receiver. And then

95
00:09:32,639 --> 00:09:38,879
if the sender sends new packets timed by these acknowledgments, which essentially is going to

96
00:09:38,879 --> 00:09:46,240
inherently rate limit itself for space up packets in time so that they're entering this bottleneck link

97
00:09:46,240 --> 00:09:52,000
at the right rate. That is just as a packet's leaving, like here, which then falls through to the

98
00:09:52,000 --> 00:09:57,679
neck, a new packet starts arriving. And this is the idea of self-clocking that you don't put a new

99
00:09:57,679 --> 00:10:04,159
packet in the network until one comes out. And you clock yourself based on this. Is what allows TCP

100
00:10:04,159 --> 00:10:08,879
you in a very simple mechanism to not stuff lots of packets into the network and to not suddenly

101
00:10:08,879 --> 00:10:13,120
send huge bursts of packets that saturate this link. Because you can imagine there is some queue here.

102
00:10:13,839 --> 00:10:19,600
And so even if TCP knows, oh, I can only send five packets per round trip time. If it sends a burst

103
00:10:19,600 --> 00:10:23,519
of five packets, then those packets might fall off the end of this queue. But if it's

104
00:10:23,519 --> 00:10:28,240
they're spaced out properly due to this timing, then it's going to be feeding them out at a nice

105
00:10:28,240 --> 00:10:35,680
steady rate, which will fill this pipe without overfilling the queue. And so the principle here is

106
00:10:35,680 --> 00:10:39,200
you only want to put data into the network when data is left. Otherwise, you're increasing the

107
00:10:39,200 --> 00:10:44,480
amount of data in the network in your cousin congestion. And so you send new data directly in response

108
00:10:44,480 --> 00:10:49,840
to acknowledgments. But also it's important that you send acknowledgments aggressively, such as we

109
00:10:49,840 --> 00:10:54,399
saw with duplicate acknowledgments, they're really important signals to the to the sender. And so if

110
00:10:54,399 --> 00:10:59,199
you're receiving additional segments and you have segments that you have missing segment, you should

111
00:10:59,199 --> 00:11:03,039
send acknowledgments for those segments aggressively. So it sees that there are duplicate acknowledgments

112
00:11:03,039 --> 00:11:08,159
that it gets a signal that something has been missed. It also knows on receiving those acknowledgments,

113
00:11:08,159 --> 00:11:12,079
those duplicate acknowledgments, that packets have left the network and it can make decisions

114
00:11:12,079 --> 00:11:18,559
accordingly. So this is the those three mechanisms of a congestion window, better RTT estimation that

115
00:11:18,559 --> 00:11:25,119
considers variance on self-clocking or really the foundation of TCP Tahoe. And so in 1978, in 1987,

116
00:11:25,119 --> 00:11:29,839
in 1988, van Jacobson fixed TCP with his Mac as well as a few other tricks and published the

117
00:11:29,839 --> 00:11:36,559
seminal TCP paper on TCP Tahoe. And this is basically solved TCP's congestion control problem, the

118
00:11:36,559 --> 00:11:43,679
internet started working again. And this actually spawned a huge area of research in TCP in this whole

119
00:11:43,679 --> 00:11:49,679
idea of how do you manage your sending rate to not congest the network. And so in this next,

120
00:11:49,679 --> 00:11:53,439
I've just talked about the first version TCP Tahoe, but there's a long history. So the next video

121
00:11:53,439 --> 00:11:59,039
is going to talk about TCP Reno, new Reno, trick culture to what's done today. They add a couple

122
00:11:59,039 --> 00:12:04,959
new mechanisms. And so if this is interesting, I totally recommend reading van Jacobson's

123
00:12:04,959 --> 00:12:09,359
original paper congestion of voice and control, sort of lays out a little bit of the story of what

124
00:12:09,360 --> 00:12:19,360
they saw and then these mechanisms and how they solved it.

