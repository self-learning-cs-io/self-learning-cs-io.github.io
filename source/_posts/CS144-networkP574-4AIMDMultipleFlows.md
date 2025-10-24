---
title: CS144 NetworkP574 4AIMDMultipleFlows
---

1
00:00:00,000 --> 00:00:07,000
In the last video I explained how the AIMD algorithm controls congestion in the special case

2
00:00:07,000 --> 00:00:13,439
where we have only one flow in the network. AIMD, which as you recall is short for additive

3
00:00:13,439 --> 00:00:18,839
increase with multiplicative decrease, controls congestion by controlling the window size,

4
00:00:18,839 --> 00:00:23,839
and therefore it controls the number of outstanding packets in the network.

5
00:00:23,839 --> 00:00:28,440
Outstanding packets are also called unacknowledged packets because they are the packets that we've

6
00:00:28,440 --> 00:00:33,600
sent but for which we've not yet received an acknowledgement to tell us that they arrive

7
00:00:33,600 --> 00:00:40,840
safely at their destination. While it's common to hear people say that AIMD controls the

8
00:00:40,840 --> 00:00:47,439
rate at which packets are sent, it's not strictly true. You'll hear this mistake made a lot.

9
00:00:47,439 --> 00:00:53,280
All AIMD does is to control the number of outstanding packets in the network and that's

10
00:00:53,280 --> 00:00:59,640
really important to remember. When the network is empty and un-conjusted, it has room for

11
00:00:59,640 --> 00:01:07,640
a flow to send more packets to have more outstanding unacknowledged packets in the network. But when

12
00:01:07,640 --> 00:01:14,480
the network is full of packets and it's congested, we have to reduce the number of packets that

13
00:01:14,480 --> 00:01:19,200
our flows have outstanding so that we don't overfill the buffers because that's where they're

14
00:01:19,200 --> 00:01:25,120
being held and if we overfill them then of course we're going to drop packets. It's in this way

15
00:01:25,120 --> 00:01:32,159
that AIMD there is the window size in order to find out how much room there is to place additional

16
00:01:32,159 --> 00:01:39,079
packets or bytes in the network. So it's constantly proving to figure out how big it can make the

17
00:01:39,079 --> 00:01:45,600
window size because that's the only thing it has to control. The single flow case helped us

18
00:01:45,599 --> 00:01:51,399
understand the basics of AIMD. It particularly helps us understand networks in which there's one

19
00:01:51,399 --> 00:01:56,239
dominant flow in the network at the time. For example, in your home network when you're streaming

20
00:01:56,239 --> 00:02:05,159
video. But out in the crazy wilds of the internet, it's very common for a router to have thousands

21
00:02:05,159 --> 00:02:11,759
or even a million flows passing through it at the same time. The situation is very far removed

22
00:02:11,919 --> 00:02:17,039
from that simple case with a single dominant flow and you'd expect that the dynamics of AIMD

23
00:02:17,039 --> 00:02:22,239
would be very different when there are so many flows present and you'd be right. The dynamics

24
00:02:22,239 --> 00:02:26,719
are very very different when a network carries many flows at the same time and so in this video

25
00:02:26,719 --> 00:02:31,599
I'm going to explain how AIMD works in this case in a network with multiple flows.

26
00:02:33,599 --> 00:02:39,599
First let's recap how we calculate the throughput of a flow. Imagine that server A has packets

27
00:02:39,599 --> 00:02:43,919
to send a server B. Right now the window size is three packets which server A sends.

28
00:02:45,439 --> 00:02:50,319
B replies with three acknowledgments which arrive after one round trip time or RTT.

29
00:02:51,199 --> 00:02:55,199
Server A can now increase the window size by one packet and sends four packets.

30
00:02:56,079 --> 00:03:01,199
After another RTT, it can send five packets and so on until the window size grows to fill all the

31
00:03:01,199 --> 00:03:07,359
buffers and a packet has to be dropped. You can see that in any cycle the throughput equals the

32
00:03:07,360 --> 00:03:16,400
window size divided by the RTT. Let's take a look at the packet buffer inside a router that is a

33
00:03:16,400 --> 00:03:22,640
bottleneck for lots of flows. At any one time the router buffer has lots of packets in it from lots

34
00:03:22,640 --> 00:03:28,720
and lots of different flows. It's not uncommon for a router buffer to be able to hold hundreds of

35
00:03:28,720 --> 00:03:34,160
thousands of packets and they will come from many many different flows. It's just a log jam through

36
00:03:34,240 --> 00:03:39,199
this buffer. In the picture I've used different colors to represent packets from different flows.

37
00:03:39,199 --> 00:03:43,759
I don't have enough colors in PowerPoint to show all the different flows but you can see

38
00:03:43,759 --> 00:03:49,439
immediately that the packets belonging to any one individual flow only make up a tiny fraction

39
00:03:49,439 --> 00:03:55,519
of all the packets in the buffer. You can imagine that if 10,000 flows are sharing a buffer with

40
00:03:55,519 --> 00:04:01,680
with room for 10,000 packets each flow will typically have just one packet in the buffer at a time.

41
00:04:01,680 --> 00:04:08,719
Occasionally a packet will arrive and find the buffer full. The packet is dropped and its flow will

42
00:04:08,719 --> 00:04:14,240
halve its window size. With so many flows in the system you can see that the flows will experience

43
00:04:14,240 --> 00:04:20,399
packet drops pretty much at random. It just depends on when a flows packet happens to arrive and

44
00:04:20,399 --> 00:04:25,120
find the buffer full. Most of the time the buffer won't be full but just occasionally a flow gets

45
00:04:25,120 --> 00:04:29,519
unlucky and its packet arrives when the buffer is full and the flows packet is dropped.

46
00:04:29,919 --> 00:04:35,759
Remember that each flow follows its own independent AIMDs sort-tooth process.

47
00:04:36,799 --> 00:04:42,399
When a flow has one of its packets dropped the flow will halve its window size but all the other

48
00:04:42,399 --> 00:04:47,839
flows will be unaffected. They'll keep merrily increasing their window size until they get a drop

49
00:04:47,839 --> 00:04:53,680
too. The more flows there are the smoother the occupancy of the queue will be with each flow

50
00:04:53,680 --> 00:05:01,120
experience occasional random drops. If we zoom in on any one individual flow as I've done here

51
00:05:01,120 --> 00:05:07,439
in red then you can see that it will still follow the AIMDs sort-tooth but the drops will happen

52
00:05:07,439 --> 00:05:13,040
at random times because it really depends on when the flow happens to encounter a packet drop

53
00:05:13,040 --> 00:05:20,240
and halves its window size. And so and this is a really important point to remember. It's very

54
00:05:20,319 --> 00:05:26,319
reasonable to think of the RTT the roundtrip time as being essentially constant when there are many

55
00:05:26,319 --> 00:05:32,240
flows. There are minor fluctuations when a packet is dropped but the rest of the time the congested

56
00:05:32,240 --> 00:05:40,720
buffer is full. So as a consequence we can assume that the RTT stays constant for packets passing

57
00:05:40,720 --> 00:05:46,639
through the congested router. This means that the throughput of a flow which which in each cycle is

58
00:05:46,639 --> 00:05:52,800
equal to its window size divided by RTT will be directly proportional to the window size. In other

59
00:05:52,800 --> 00:06:00,560
words the average throughput is the average window size divided by the constant RTT. You should contrast

60
00:06:00,560 --> 00:06:05,279
this with the single flow case that we saw in the last video which was completely different.

61
00:06:06,319 --> 00:06:13,919
We saw that the RTT changed in lockstep with the AIMDs sort-tooth. In both cases we can accurately

62
00:06:13,920 --> 00:06:19,280
say that the throughput equals the window size divided by the RTT but in the single flow case the

63
00:06:19,280 --> 00:06:25,920
window size moves in lockstep with the RTT whereas in the multiple flow case the window size varies

64
00:06:25,920 --> 00:06:32,879
but the RTT stays constant. One more thing for me to point out in the picture. You may have noticed

65
00:06:32,879 --> 00:06:38,879
that I'm drawing the sort-tooth a little differently in this video. When I drew it for a single flow

66
00:06:38,879 --> 00:06:45,040
the top edge was curved because RTT increased with window size. Each horizontal step was longer than

67
00:06:45,040 --> 00:06:50,879
the one before. When we have multiple flows we can assume that the RTT is constant and so each

68
00:06:50,879 --> 00:06:55,519
horizontal step is the same length and the sort-tooth is a triangle with straight edges.

69
00:06:58,399 --> 00:07:03,920
Now let's look at the throughput of a flow. The throughput is simply the number of bytes or packets

70
00:07:03,920 --> 00:07:09,280
it sends per second. In the first RTT it sends three packets when the packets are successfully

71
00:07:09,280 --> 00:07:15,040
acknowledged it can send four packets in the next RTT and so on. You can see the way the throughput

72
00:07:15,040 --> 00:07:21,200
is inversely proportional to the RTT. It's worth asking how the throughput depends on the drop

73
00:07:21,200 --> 00:07:28,560
probability as well. So I'm now going to show you a simple intuitive geometric relationship between

74
00:07:28,560 --> 00:07:36,480
throughput and RTT and the drop probability. Here is our familiar AIMD model showing the

75
00:07:36,480 --> 00:07:41,920
sort-tooth going through the additive increase, multiplicative decrease. I'm assuming we've entered

76
00:07:41,920 --> 00:07:48,160
the AIMD phase and each time the window size reaches W max the buffer fills and a packet is dropped.

77
00:07:48,160 --> 00:07:53,120
The window size is half the W max over 2 and remember there is a packet dropper at each peak of

78
00:07:53,120 --> 00:07:59,920
the sort-tooth leading to a halving of the window size. The first observation is that the shaded

79
00:07:59,920 --> 00:08:06,240
area shown here tells us how many packets we send in one cycle between two successive packet drops.

80
00:08:06,879 --> 00:08:11,680
The line is really a staircase of window sizes with the window size increasing by one at each step.

81
00:08:13,280 --> 00:08:20,399
The width of the shaded area is RTT times W max over 2 because it takes W max over 2 steps for

82
00:08:20,399 --> 00:08:27,679
the window size to climb from W max over 2 back to W max again. Remember we're assuming RTT

83
00:08:27,679 --> 00:08:34,079
is a constant because there are lots of flows in the networks. The height of the shaded area is W max

84
00:08:34,079 --> 00:08:42,240
and so the area A is simply 3 over 8 times W max squared. One way to think about it is that the

85
00:08:42,240 --> 00:08:48,960
lower square is W max over 2 on each side so it has an area of W max squared over 4. The area is 1.5

86
00:08:48,960 --> 00:08:55,120
times the size of the lower square. 1.5 times the quarter is 3 eighths so A equals 3 eighths of

87
00:08:55,120 --> 00:09:03,519
W max squared. Now we know A we can write an expression for throughput because we know that we send

88
00:09:03,519 --> 00:09:12,800
A bytes every W max over 2 times RTT seconds. Thruppard equals A divided by W max over 2 RTT.

89
00:09:13,199 --> 00:09:20,479
The second observation that we can make is that we know the relationship between area A and the

90
00:09:20,479 --> 00:09:26,159
packet drop probability. This is because exactly one packet is dropped every time we send A packets.

91
00:09:26,719 --> 00:09:32,959
In other words P equals 1 over A. We're now ready to derive the throughput as a function of RTT and P.

92
00:09:34,719 --> 00:09:39,839
In practice we don't know what W max is but because we know A as a function of P we can substitute

93
00:09:39,840 --> 00:09:42,879
P into the equation and we end up with a rate equation that looks like this.

94
00:09:45,040 --> 00:09:52,960
Thruppard equals the square root of 3 over 2 divided by RTT times the square root of P.

95
00:09:54,720 --> 00:09:58,480
So look at it for a moment it's more than just an equation. It tells us something about the

96
00:09:58,480 --> 00:10:03,680
property of AIMD when we have a large number of flows. It tells us first that the rate that a

97
00:10:03,680 --> 00:10:09,120
flow experience is proportional to 1 over its RTT. In other words the bigger the RTT the lower the

98
00:10:09,120 --> 00:10:15,120
rate. It means that when we're communicating with a server that's further away we can expect a lower

99
00:10:15,120 --> 00:10:20,960
rate. This is not the property that we want from a congestion control algorithm. We don't necessarily

100
00:10:20,960 --> 00:10:26,159
want to penalize flows that are further away and so this is generally considered a weakness of AIMD.

101
00:10:28,080 --> 00:10:33,120
The second thing to notice about the throughput equation is that throughput is quite sensitive to

102
00:10:33,120 --> 00:10:41,039
the drop probability 2, 1 over square root of P. It also might seem a little paradoxical. If the drop

103
00:10:41,039 --> 00:10:47,120
probability goes to 0 does that mean the rate goes to infinity? But if you think about it this is

104
00:10:47,120 --> 00:10:52,320
exactly what AIMD does. If there are no drops the window size will just keep growing and growing

105
00:10:52,320 --> 00:10:56,960
forever and the window size will tend to infinity. In other words there will be no breaks on the

106
00:10:56,960 --> 00:11:03,120
sender and it will send as fast as it possibly can all the time. This confirms what we already know

107
00:11:03,120 --> 00:11:09,920
which is the packet drops are an essential part of how AIMD congestion control works. The packet

108
00:11:09,920 --> 00:11:15,120
drops indicate to the sender that the window sizes open up too far and we have too many outstanding

109
00:11:15,120 --> 00:11:20,480
packets in the networks. We need to ratchet it down and that is what congestion control is all about.

110
00:11:20,800 --> 00:11:30,960
So in summary what have we learned about AIMD so far? We've learned that the throughput of an AIMD

111
00:11:30,960 --> 00:11:37,680
flow is sensitive to the drop probability and very sensitive to the RTT. We've learned that when

112
00:11:37,680 --> 00:11:43,440
the network is carrying many flows each flow follows the AIMD rules just like the single flow.

113
00:11:44,080 --> 00:11:49,279
The window will contract and expand according to the AIMD equations while the sender probes how

114
00:11:49,279 --> 00:11:53,519
many bytes it can safely place into the pipe between the sender and the receiver.

115
00:11:55,600 --> 00:11:59,919
We've also learned that if the bottleneck contains packets belonging to many different flows

116
00:11:59,919 --> 00:12:06,079
then the buffer is going to remain highly occupied all the time. This means the RTT seen by packets is

117
00:12:06,079 --> 00:12:10,000
about the same and we can safely assume RTT is constant in this case.

118
00:12:12,959 --> 00:12:17,120
Now you've learned about AIMD you're going to see in the next few videos that it is one of the

119
00:12:17,120 --> 00:12:23,440
main mechanisms underlying TCP's congestion control algorithms. There are quite a few other

120
00:12:23,440 --> 00:12:28,480
mechanisms that we're going to be learning about two over the next few videos AIMD is one of them.

121
00:12:28,480 --> 00:12:31,759
You're going to be learning that there are lots of other tricks in the TCP toolbox that have

122
00:12:31,759 --> 00:12:36,960
been introduced over the years to turn it into an extremely effective congestion control mechanism.

