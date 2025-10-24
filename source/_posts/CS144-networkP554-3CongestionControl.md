---
title: CS144 NetworkP554 3CongestionControl
---

1
00:00:00,000 --> 00:00:06,320
In the last video, I told you how we can use the additive increase multiplicative decrease method to

2
00:00:06,320 --> 00:00:12,439
modulate the size of the TCP sliding window and therefore control the number of bytes that are

3
00:00:12,439 --> 00:00:19,120
outstanding in the network. If we want to increase the number of bytes that are outstanding,

4
00:00:19,120 --> 00:00:23,480
we might contribute to more congestion. If there is congestion and we want to reduce it,

5
00:00:23,480 --> 00:00:28,240
then we might reduce the number of outstanding bytes, in other words reduce the window size.

6
00:00:28,719 --> 00:00:34,719
So using this window size modulation, we can vary the number of outstanding bytes and therefore

7
00:00:34,719 --> 00:00:39,920
affect or control the amount of congestion in the network. Notice this has been done by

8
00:00:39,920 --> 00:00:46,719
the end host only without any explicit support from the network. In order to understand how

9
00:00:46,719 --> 00:00:52,719
AIMD works and then later how TCP congestion control works, we're going to start by looking in

10
00:00:52,719 --> 00:00:58,960
some detail at how AIMD works with a single flow. If we can understand how it works with a single

11
00:00:58,960 --> 00:01:03,439
flow, then we have a chance of understanding how it works in a more complicated network with many,

12
00:01:03,439 --> 00:01:12,879
many flows through a router at the same time. So we saw before AIMD works as follows. Each time a

13
00:01:12,879 --> 00:01:18,799
packet is received okay, we increase the window by 1 over W. Therefore, once we've received the

14
00:01:18,799 --> 00:01:25,200
whole windows worth of packets, the window size will be increased by 1. Every time a packet is dropped,

15
00:01:26,079 --> 00:01:32,319
we're going to decrease the window size multiplicatively. We're going to reduce it by a factor of 2,

16
00:01:32,879 --> 00:01:41,840
and this is the dynamics that we saw before. Now let's look at an animation of the AIMD process working

17
00:01:41,840 --> 00:01:50,640
in practice. We're going to take a good look at this animation of a single AIMD flow over a single

18
00:01:50,640 --> 00:01:58,480
bottleneck link. If we look on the let me explain what's going on with the figure, the congestion

19
00:01:58,480 --> 00:02:05,920
window size W is shown on the graph down here varying as a function of time. So this is a C-wind,

20
00:02:06,480 --> 00:02:12,640
the congestion window, and this is the same as the value here at the source. So this is the source,

21
00:02:13,280 --> 00:02:19,920
this is the destination, and this is the router in between. The router has a buffer, and it's going to

22
00:02:19,920 --> 00:02:26,479
buffer packets that are waiting to go onto the egress link. The egress link is this one here, and this is

23
00:02:26,479 --> 00:02:33,120
the bottleneck link between the source and the destination. This link here on the left is running

24
00:02:33,120 --> 00:02:38,159
faster than the link on the right, which is why every now and again there's a build up of packets

25
00:02:38,159 --> 00:02:43,599
in this buffer because they're arriving faster than they are departing. The reason that the packets

26
00:02:43,599 --> 00:02:47,840
look little or on the left than they do on the right is just supposed to represent the fact that the

27
00:02:47,840 --> 00:02:52,800
link on the left is running faster than the one on the right. In other words, I have a higher data

28
00:02:52,800 --> 00:02:59,599
rate, and so the packetization delay is shorter, and so the packets appear a little bit shorter on

29
00:02:59,599 --> 00:03:04,400
the left. So packets are going to flow from the source to the destination. They're the blue ones,

30
00:03:05,039 --> 00:03:10,639
and then for each packet there is an acknowledgement coming back to the source. That's what the red ones

31
00:03:10,639 --> 00:03:18,400
are at the top, and you can see that the arrival of the acknowledgments is clocking the transmission

32
00:03:18,400 --> 00:03:24,159
of the next packet. So we often say that an algorithm like this is self-clocking, and we'll see later

33
00:03:24,240 --> 00:03:30,319
the TCP is self-clocking. The packets are triggered by an acknowledgement coming back.

34
00:03:31,439 --> 00:03:35,120
Okay, now that I've explained this, I'm going to restart it so that we can look at some of the

35
00:03:35,120 --> 00:03:41,039
some of the dynamics. I'm actually going to give you our URL to this same animation, so you can play

36
00:03:41,039 --> 00:03:51,120
around with this on your own time. So starting again, we can see that the

37
00:03:54,159 --> 00:03:59,120
window size here is telling us how many packets there can be outstanding in the network.

38
00:03:59,120 --> 00:04:05,199
And I like to think of it as there's a kind of a bag that is representing the network as a whole,

39
00:04:05,199 --> 00:04:10,000
and we're trying to figure out how big that bag is. How many packets can we put into that bag

40
00:04:10,000 --> 00:04:14,560
before they overflow and drop on the drop on the floor? And I find this a useful way to think about

41
00:04:14,560 --> 00:04:21,920
AIMD. So we're basically trying to figure out where those packets can be, and how many there can be

42
00:04:21,920 --> 00:04:26,800
in the in the link. And really, there's only a couple of two or three different places that they

43
00:04:26,800 --> 00:04:34,000
can be. First of all, the packets can be on this link here, on this fixed capacity pipe. There are

44
00:04:34,000 --> 00:04:38,800
a certain number of packets that we could fit under that under that into that pipe. There are a certain

45
00:04:38,800 --> 00:04:43,280
number that we could put here, and there are a certain number that are represented by the

46
00:04:43,280 --> 00:04:47,920
acknowledgments coming in the opposite direction. So all of those are fixed. The only variable

47
00:04:47,920 --> 00:04:54,400
portion is how many that we have currently got in the buffer in the middle. So it's like a

48
00:04:54,400 --> 00:05:00,080
concertina. There's this concertina that to start with, that concertina is closed, and we're putting

49
00:05:00,080 --> 00:05:06,000
the packets into the network. And then as we as we fill up the links, after the links are full,

50
00:05:06,000 --> 00:05:11,840
the only place they can go is into the buffer. And the buffer will absorb for every extra

51
00:05:11,839 --> 00:05:17,519
window, every extra time that we open the window, we are essentially putting an extra packet into

52
00:05:17,519 --> 00:05:23,039
that packet buffer. So initially, when the window is at its minimum value, all the links are full,

53
00:05:23,039 --> 00:05:29,439
but the buffer is empty. If we increase the window by size one, the links are full, so it can't be

54
00:05:29,439 --> 00:05:35,120
placed into the into the link. The only place that it can be placed is into the buffer. So the buffer

55
00:05:35,120 --> 00:05:40,639
will increase by one. If we then increase the window by one again, it'll go into the buffer,

56
00:05:40,639 --> 00:05:44,879
increase it by one again, it'll go into the buffer. Eventually the buffer overflows,

57
00:05:45,919 --> 00:05:53,199
we drop a packet, and then the AIMD rules are that we drop the outstanding window size by half,

58
00:05:53,759 --> 00:05:59,839
eventually the buffer will go empty again, and then we start again. So really, all we're doing by

59
00:05:59,839 --> 00:06:05,839
changing the window size is modulating the occupancy of the buffer at the bottleneck. If we look here

60
00:06:05,839 --> 00:06:12,239
on the simulation, we can see that, we can see that happening. So right now the window size is

61
00:06:12,239 --> 00:06:17,359
nine, so that we will see at any instant, there are nine packets and acknowledgments outstanding

62
00:06:17,359 --> 00:06:23,759
in the network. But because the links are full, this outgoing link here is full, our bottleneck link is full,

63
00:06:24,639 --> 00:06:31,199
the only place that those packets can go once we increase the window size is here. So we filled it up,

64
00:06:31,199 --> 00:06:36,719
any additional ones are inside the buffer. And every now and again you'll see that we've received a

65
00:06:36,719 --> 00:06:42,959
full window's worth, and then we increase the, there we go, we will increase the window size by one,

66
00:06:42,959 --> 00:06:48,560
it's currently at 13, in a moment it'll increase to 14, and every time we increase the window size,

67
00:06:48,560 --> 00:06:55,519
the buffer will have one more packet in it. And down here you can see that every time we

68
00:06:56,479 --> 00:07:02,560
receive a full window's worth, it will actually go up by one, and therefore that's how the window

69
00:07:02,560 --> 00:07:08,319
is going to evolve over time. So we're almost getting to the point where the buffer is full,

70
00:07:08,959 --> 00:07:15,839
we've got to a point where the the window is 16, and at the moment the rate at which packets are

71
00:07:15,839 --> 00:07:21,519
coming in is exactly matching the rate at which they're going out. In a moment, we're going to

72
00:07:21,519 --> 00:07:26,479
actually put one extra packet into the network and you see it got dropped, and the knowledge of that

73
00:07:26,479 --> 00:07:32,000
drop is propagating through the network, it will now go on to the outgoing link, it will come back

74
00:07:32,000 --> 00:07:36,319
actually through the absence of it acknowledgement, but that doesn't matter. And so therefore the window

75
00:07:36,319 --> 00:07:42,639
size will be halved, that's what's going on over here. The buffer will have will drain because we're

76
00:07:42,639 --> 00:07:48,240
only allowed to have half as many outstanding packets in the network, therefore we stop sending the,

77
00:07:48,720 --> 00:07:54,960
the buffer drained because it drains at the full rate, and then we start the whole process off again.

78
00:07:56,800 --> 00:08:02,639
The first thing I want you to notice is that the outgoing link is kept busy all the time, 100%

79
00:08:02,639 --> 00:08:08,560
of the time, even though this window process is concertinaing, it's going full up and then

80
00:08:08,560 --> 00:08:13,280
full down when we have a drop, full up and then full down. So even though this window is going through

81
00:08:13,359 --> 00:08:19,359
this sawtooth motion, the egress that bottleneck link in the network is staying busy all the time.

82
00:08:20,399 --> 00:08:25,839
In other words, the rate at which packets are being sent is staying constant, and this is a really

83
00:08:25,839 --> 00:08:32,159
important property of AIMD, particularly with a single link. It's not really adjusting the rate,

84
00:08:32,159 --> 00:08:37,679
it's actually affecting the number of packets that can be outstanding in the network. And this subtle

85
00:08:37,679 --> 00:08:42,079
distinction will become very important in a moment when I tell you a little bit more about the dynamics

86
00:08:42,560 --> 00:08:48,560
of AIMD. And then it'll help us understand what's going on when there are multiple flows in the network.

87
00:08:56,400 --> 00:09:01,280
To increase our understanding of what's going on, let's look at the dynamics of that single flow.

88
00:09:01,280 --> 00:09:07,840
This is from a simulation in a well-known network simulator called NS of a single TCP flow

89
00:09:07,840 --> 00:09:14,000
over a bottleneck link. The graph at the top here is telling us the evolution of the congestion

90
00:09:14,000 --> 00:09:19,759
window or C-wind like we had before. That's the red one. The green one is the RTT, the round trip time.

91
00:09:21,040 --> 00:09:26,160
This red line here is the utilization of the bottleneck link. In other words, how busy is that bottleneck

92
00:09:26,160 --> 00:09:31,600
link kept? And down here is the occupancy of the buffer, and we can see that evolving. So it's very

93
00:09:31,600 --> 00:09:39,040
similar to the simulation that we just saw, the animation that we just saw. So notice that the

94
00:09:40,399 --> 00:09:48,000
congestion window is moving in this beautiful sawtooth. But because every time we put one more packet

95
00:09:48,000 --> 00:09:54,800
into the network, we increase the occupancy of the buffer. So every time we increase W, the only

96
00:09:54,800 --> 00:09:59,759
place that that extra packet can go is in the buffer. So it's going to move in perfect lock step with

97
00:10:00,319 --> 00:10:06,000
with C-wind. But because we're increasing the occupancy of the buffer, we're increasing the delay

98
00:10:06,000 --> 00:10:12,159
that packets experience as they go through the network. So therefore, the RTT, the round trip time,

99
00:10:12,159 --> 00:10:22,080
is also going and following the same, exactly the same shape. So C-wind and the RTT actually follow

100
00:10:22,080 --> 00:10:31,280
the same shape. The consequence of this is that the sending rate for a single flow,

101
00:10:32,160 --> 00:10:41,040
which we can define to be the number of bytes that we send in one window divided by the round

102
00:10:41,040 --> 00:10:48,960
trip time. Because the round trip time is varying with the window size, W over RTT is actually a

103
00:10:48,960 --> 00:10:55,519
going to be a constant. This is actually going to be a constant. Why is that? The reason that

104
00:10:55,519 --> 00:11:00,879
it's constant is because W and RTT are moving in lock step, they're essentially the same.

105
00:11:02,080 --> 00:11:08,240
And we saw that in the animation. The Egress link was kept busy at all times. So we're not really

106
00:11:08,240 --> 00:11:12,480
modulating the rate. In fact, we don't want to modulate the rate when everything is constant and

107
00:11:12,480 --> 00:11:17,600
when you've got a single flow. We want to keep the outgoing link busy. All that the window is

108
00:11:17,600 --> 00:11:23,360
doing is probing to see how big the bag is, how many more bytes we can put into the network without

109
00:11:23,360 --> 00:11:29,680
it overflowing. And it's constantly probing and changing that window size just in case the conditions

110
00:11:29,680 --> 00:11:35,120
change and the capacity increases and therefore there's more room in the bag to put more packets.

111
00:11:37,680 --> 00:11:45,600
Just to just to belabor the point a little, the window size is going to move like this. RTT will

112
00:11:45,600 --> 00:11:52,639
move like this in lock step and so this rate is a constant. So from this we can also make another

113
00:11:52,639 --> 00:11:59,600
observation and that is how big should the buffer be so that the whole system will behave correctly.

114
00:11:59,600 --> 00:12:05,120
So we saw last time that the buffer occupancy was moving in lock step with a window size process.

115
00:12:05,120 --> 00:12:10,000
This picture down here is essentially the same as our animation. Our bottleneck link over here.

116
00:12:10,320 --> 00:12:18,080
Our link here with a faster rate the router buffer between a and b. So if we were to look at that again

117
00:12:18,080 --> 00:12:25,600
in our simulation and look at the behavior, the graph on the left are the same as the ones we saw

118
00:12:25,600 --> 00:12:33,120
before and in this case the buffer occupancy equals RTT times c. In other words it's just enough

119
00:12:33,120 --> 00:12:40,720
to hold the enough packets that will fit into the round trip when the buffer is empty.

120
00:12:42,720 --> 00:12:47,120
If we were to make the buffer a little bit smaller and that's what we're doing here so the buffer

121
00:12:47,120 --> 00:12:55,600
is smaller then what happens is that the buffer after it's, well after there's been a drop which

122
00:12:55,600 --> 00:13:03,519
is taking place here when the window size decreases and is halved according to the AMD rules

123
00:13:04,399 --> 00:13:12,399
the buffer will fall because we have fewer outstanding bytes in the network. Therefore the source will

124
00:13:12,399 --> 00:13:19,440
stop sending packets the buffer will drain but it's draining an empty for some period. So if the

125
00:13:19,440 --> 00:13:24,879
router buffer is empty it means the egress link our bottleneck link our precious resource is actually

126
00:13:24,879 --> 00:13:32,399
not being used and so the utilization will drop from 100% during that time. So if we want to prevent

127
00:13:32,399 --> 00:13:37,439
this from happening and have 100% at all times we need to make sure that this doesn't happen.

128
00:13:38,000 --> 00:13:42,000
Therefore we need to make sure that the buffer never goes empty and we need a behavior like this

129
00:13:42,559 --> 00:13:49,840
from which we need a buffer of RTT times c. Now why it's specifically RTT times c you'll see in a

130
00:13:49,840 --> 00:13:56,160
problem set a little bit later but the basic intuition is that the buffer occupancy the size of the

131
00:13:56,160 --> 00:14:02,560
buffer must from the peak to the trough must be the same as the distance from the peak to the trough

132
00:14:02,560 --> 00:14:08,639
here to be able to ride out the time when the window size is halved and we have fewer outstanding

133
00:14:08,639 --> 00:14:15,040
packets placed into the network and that distance there turns out to be RTT times c and we'll see that

134
00:14:15,120 --> 00:14:22,879
later in a problem set. Let's summarize what we've learnt for a single flow. The window is going to

135
00:14:22,879 --> 00:14:29,039
expand and contract according to AIMD the additive increase multiplicative decrease which is going to

136
00:14:29,039 --> 00:14:35,599
modulate the size of the TCP sliding window in order to determine how many outstanding bytes they

137
00:14:35,599 --> 00:14:41,599
can be in the network. Essentially we're probing how many bytes that the pipe can hold from end to

138
00:14:42,000 --> 00:14:46,000
end and we're constantly going to be probing by changing the size of that window we're going to

139
00:14:46,000 --> 00:14:51,440
carefully increase it see how much space there is if we find that we overfill it we're going to drop

140
00:14:51,440 --> 00:14:55,680
back down again and then we're going to keep trying to probe it to see if there's more capacity

141
00:14:55,680 --> 00:15:01,279
that's available. So we're going to tentatively additively increase and then if we find that we're

142
00:15:01,279 --> 00:15:07,040
going to trouble we're going to very quickly in a very responsive way drop back down again to be able

143
00:15:07,039 --> 00:15:12,719
to reduce the number of outstanding bytes in the network as quickly as we can. So the soar tooth

144
00:15:12,719 --> 00:15:19,120
is actually the stable operating point of TCP there's nothing out of control just because it's

145
00:15:19,120 --> 00:15:25,759
oscillating it's exactly the behavior that we want under a stable operating condition and the

146
00:15:25,759 --> 00:15:31,360
sending rate is in fact constant so long as we have enough buffers in the network which is RTT

147
00:15:32,320 --> 00:15:37,600
so these are all the observations for a single flow. In the next video we're going to see how things

148
00:15:37,600 --> 00:15:47,279
are a little bit different when we have many flows in the network.

