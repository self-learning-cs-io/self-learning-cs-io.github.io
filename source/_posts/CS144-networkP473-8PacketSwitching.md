---
title: CS144 NetworkP473 8PacketSwitching
---

1
00:00:00,000 --> 00:00:04,000
This video is a continuation of our first video on how packet switches work.

2
00:00:04,000 --> 00:00:08,000
In the first video we saw that there are two basic operations to a packet switch.

3
00:00:08,000 --> 00:00:12,000
First, packet addresses have to be looked up into a forwarding table,

4
00:00:12,000 --> 00:00:18,000
and then the packet has to be switched or transferred to the correct output port

5
00:00:18,000 --> 00:00:20,000
so that it could be sent under the correct outgoing link.

6
00:00:20,000 --> 00:00:26,000
In the last video we saw how addresses are looked up in tables for Ethernet switches and Internet routers,

7
00:00:26,000 --> 00:00:30,000
and in this video I'm going to explain how packets are switched to the correct egress port.

8
00:00:30,000 --> 00:00:34,000
I'm going to look at a number of different techniques, output queuing, input queuing, and virtual output queues.

9
00:00:34,000 --> 00:00:40,000
We'll see and get a sense for how these packet switches are actually built.

10
00:00:42,000 --> 00:00:48,000
I'm going to start with the basic vanilla switch, which is the one I showed you before.

11
00:00:48,000 --> 00:00:52,000
We have the address look up on the left over here,

12
00:00:52,000 --> 00:00:56,000
and then on the, this is the forwarding table where we look up the addresses,

13
00:00:56,000 --> 00:01:02,000
and then we have the packet queuing logic and then the buffer memory where the packets are held

14
00:01:02,000 --> 00:01:04,000
during times of congestion.

15
00:01:04,000 --> 00:01:10,000
When packets arrive, here are three packets arriving with different egress ports

16
00:01:10,000 --> 00:01:12,000
indicated by the color of the head of the packet.

17
00:01:12,000 --> 00:01:18,000
So the red one at the top is going to the red port over here, the one in the middle.

18
00:01:18,000 --> 00:01:26,000
So when these packets traverse the back plane, we see that the blue one is able to go to its output.

19
00:01:26,000 --> 00:01:32,000
One of the red ones can be delivered immediately, and the other one is held in the output queue waiting for its turn.

20
00:01:32,000 --> 00:01:40,000
So as soon as the first two have left, this one can then depart in FIFO order.

21
00:01:40,000 --> 00:01:46,000
We often refer to a switch like this as an output queued switch, because the queues are at the output.

22
00:01:46,000 --> 00:01:50,000
And this has a certain ramification for the performance of the switch.

23
00:01:50,000 --> 00:01:52,000
Let's take a look at that.

24
00:01:52,000 --> 00:02:00,000
When we have packets arriving, it's possible in the worst case that all the packets coming in at the same time from the outside

25
00:02:00,000 --> 00:02:04,000
will be wanting to go to the same output queue.

26
00:02:04,000 --> 00:02:06,000
Let's say this one here.

27
00:02:06,000 --> 00:02:12,000
So if we have n ports, each running at rate are, and there are, let's say there are n of them,

28
00:02:12,000 --> 00:02:20,000
then in the worst case, we could actually have a writing rate of n times r into this output queue.

29
00:02:20,000 --> 00:02:26,000
Similarly, we always have a reading rate from this queue of rate r.

30
00:02:26,000 --> 00:02:36,000
So we say in the output queued switch that this memory must run an aggregate, a total rate of up to n plus 1 times r.

31
00:02:36,000 --> 00:02:46,000
The so-and-enoying thing or frustrating thing about this is that long term, it can't possibly be the case that we're writing into this queue at rate n times r.

32
00:02:46,000 --> 00:02:48,000
The system could not sustain that.

33
00:02:48,000 --> 00:02:58,000
This only really works if some mechanism is at play like congestion control to hold the average rate of writing into this queue at no more than 1 r.

34
00:02:58,000 --> 00:03:04,000
So it feels as though the maximum rate that we should need is 2 times r.

35
00:03:04,000 --> 00:03:06,000
That was what we would strive for.

36
00:03:06,000 --> 00:03:08,000
Unfortunately, you're paying this penalty of n.

37
00:03:08,000 --> 00:03:12,000
An n could be a large number. It could be hundreds or even thousands.

38
00:03:12,000 --> 00:03:14,000
So this memory has to run much faster.

39
00:03:14,000 --> 00:03:24,000
Output queued switches are said to be limited by this problem that they have to have memories that run very, very fast.

40
00:03:24,000 --> 00:03:36,000
It becomes quite a challenge when building scalable output queued switches to find or use memories or create a memory hierarchy that will run fast enough.

41
00:03:36,000 --> 00:03:42,000
One obvious way to solve this problem is to move the queues from the output over to the input.

42
00:03:42,000 --> 00:03:44,000
Let's take a look at what happens when we do this.

43
00:03:44,000 --> 00:03:48,000
For obvious reason we call this an input queued packet switch.

44
00:03:48,000 --> 00:03:54,000
Now the queues where packets will be held are at the input side of the switch.

45
00:03:54,000 --> 00:04:02,000
The advantage of this will perhaps be obvious in a moment if we consider packets arriving to the switch.

46
00:04:02,000 --> 00:04:06,000
Same pattern as before. Two reds, one blue.

47
00:04:06,000 --> 00:04:10,000
In this case, what we would do is all of the packets would come through the switch.

48
00:04:10,000 --> 00:04:14,000
Only one of them needs to be held. That's the one down here.

49
00:04:14,000 --> 00:04:20,000
Waiting for its turn to go across the switch. That's because its output line is busy and there's no queue at the output to hold it.

50
00:04:20,000 --> 00:04:22,000
So we hold it back at the input.

51
00:04:22,000 --> 00:04:26,000
Later, when its turn comes, it can depart just like it would from an output queued.

52
00:04:26,000 --> 00:04:28,000
So it's showing the face of it.

53
00:04:28,000 --> 00:04:32,000
The good news is that things look like they work the same.

54
00:04:32,000 --> 00:04:41,000
The better news is that the buffer memory here is now only has to accept one packet, at most one packet from the ingress at a time.

55
00:04:41,000 --> 00:04:47,000
It has to only send one packet into the switch in a packet time.

56
00:04:47,000 --> 00:04:55,000
So its speed has been reduced from n plus one times r just down to our minimum and our goal, which was two times r.

57
00:04:55,000 --> 00:04:58,000
So a factor of almost n reduction.

58
00:04:58,000 --> 00:05:00,000
So this makes a huge difference.

59
00:05:00,000 --> 00:05:04,000
For this reason, people often say that input queued switches are much more scalable.

60
00:05:04,000 --> 00:05:08,000
Quite a few big switches made this way, but with a caveat.

61
00:05:08,000 --> 00:05:13,000
And there is a problem that we're going to have a take a look at right now.

62
00:05:13,000 --> 00:05:17,000
In an input queued switch, the problem is something called head of line blocking.

63
00:05:17,000 --> 00:05:20,000
And this problem is something that you'll see in many contacts.

64
00:05:20,000 --> 00:05:25,000
I want to explain it here. So you'll recognize it when you see it in other environments.

65
00:05:25,000 --> 00:05:27,000
Let me go through an example.

66
00:05:27,000 --> 00:05:32,000
These are three inputs representing the inputs of the switch.

67
00:05:32,000 --> 00:05:38,000
So these are the input buffers. I've taken away everything else on the switch just to make it a little bit clearer.

68
00:05:38,000 --> 00:05:43,000
And we're going to see packets arrive to these. Here they are.

69
00:05:43,000 --> 00:05:49,000
They're red ones going to the red output, black ones to the black output, green ones to the green output.

70
00:05:49,000 --> 00:05:55,000
And imagine that you have the task of deciding which packets to go.

71
00:05:55,000 --> 00:05:59,000
And you look at the packets at the head of line of this and see that they're all red.

72
00:05:59,000 --> 00:06:03,000
The problem is that you could only send one of them at a time.

73
00:06:03,000 --> 00:06:08,000
And so in this particular instance, we'd only be able to send the red one.

74
00:06:08,000 --> 00:06:15,000
Even though there are green and black packets in the system that could go to these unused outputs,

75
00:06:15,000 --> 00:06:22,000
because we've arranged everything as a single queue, we get this head of line blocking effect.

76
00:06:22,000 --> 00:06:27,000
Natural solution to this, which is pretty widely used, is something called virtual output queues,

77
00:06:27,000 --> 00:06:32,000
where each input maintains a separate queue for each output.

78
00:06:32,000 --> 00:06:44,000
So in this case, we have a 3x3 switch. So this queue here is a 5.0 queue of packets waiting to go to output 1, the red output, for output 2 and for output 3.

79
00:06:44,000 --> 00:06:49,000
So when packets arrive, they're the same set of packets arriving as before.

80
00:06:49,000 --> 00:06:54,000
But now they get pre-classified and placed into a queue corresponding the output they're going to.

81
00:06:54,000 --> 00:07:00,000
That's why we call them virtual output queues. It's a queue of packets going to the all going to the same output.

82
00:07:00,000 --> 00:07:05,000
The good news now is that because each queue holds packets going to the same output,

83
00:07:05,000 --> 00:07:10,000
no packet can be held up by a packet ahead of it going to a different output.

84
00:07:10,000 --> 00:07:17,000
So it can't be held up because its head of line is blocked by someone who is stuck.

85
00:07:17,000 --> 00:07:24,000
So now we can look at this and say, aha, we have visibility into all of the head of line packets,

86
00:07:24,000 --> 00:07:29,000
and we can deliver all three in one go and therefore get a higher instantaneous throughput.

87
00:07:29,000 --> 00:07:34,000
It's an obvious solution. It can be a little tricky to implement in practice.

88
00:07:34,000 --> 00:07:38,000
But the nice thing is that it overcomes this head of line blocking entirely.

89
00:07:38,000 --> 00:07:46,000
So the good news overall is we've reduced the speed of the queues to two times our speed of the memories,

90
00:07:46,000 --> 00:07:51,000
because remember we can only have one packet come in at a time and only one packet departed at a time.

91
00:07:51,000 --> 00:07:57,000
And we're able to sustain the same throughput performance as before.

92
00:07:57,000 --> 00:08:00,000
Just to look at this on a graph, we often see graphs that look like this.

93
00:08:00,000 --> 00:08:08,000
This is a plot of the delay or the average delay that a packet would experience as a function of the load.

94
00:08:08,000 --> 00:08:12,000
This is basically how busy the ingress lines are.

95
00:08:12,000 --> 00:08:17,000
The best that any queuing system can achieve is this line here.

96
00:08:17,000 --> 00:08:27,000
And this corresponds to a system in which as the load approaches 100%, the delay increases or the average delay increases and is asymptotic to 100%.

97
00:08:27,000 --> 00:08:31,000
In fact, this is what we will see with an output queued switch.

98
00:08:31,000 --> 00:08:41,000
An output queued switch is perfect in the sense that you can't achieve a higher throughput or you can't achieve a low average delay.

99
00:08:41,000 --> 00:08:45,000
Let's take a look at the main properties of output queued switches.

100
00:08:45,000 --> 00:08:47,000
First we say they are work conserving.

101
00:08:47,000 --> 00:08:54,000
Work conserving means that an output line is never idle when there is a packet in the system waiting to go to it.

102
00:08:54,000 --> 00:08:59,000
That means there's no blocking internally preventing a packet getting to that line.

103
00:08:59,000 --> 00:09:04,000
Whenever that line is idle, there is no packet in the system waiting for it.

104
00:09:05,000 --> 00:09:13,000
As a consequence, throughput is maximized because you cannot have a higher throughput than keeping all the lines busy whenever there is a packet available for them.

105
00:09:13,000 --> 00:09:21,000
And the expected delay is minimized because we are always doing useful work delivering packets under the outgoing line.

106
00:09:21,000 --> 00:09:29,000
Just to recap the performance that we suffer from with head of line blocking, this was our perfect output switch, output queued switch here on the right.

107
00:09:29,000 --> 00:09:44,000
We have a nice performance here. With head of line blocking, it is a well known result that the throughput can be reduced in other words, this asymptote when things fall apart gets reduced to 2 minus square root of 2 or approximately 58%.

108
00:09:44,000 --> 00:09:49,000
We lose almost half the performance of the system as a consequence of this head of line blocking.

109
00:09:49,000 --> 00:09:56,000
The actual number will vary depending on the particular arrival pattern but in general it is pretty bad news.

110
00:09:57,000 --> 00:10:06,000
But if we use virtual output queues, this 58% gets pushed back up again to the full 100% of the system.

111
00:10:06,000 --> 00:10:12,000
It doesn't entirely match the output queued switch, the asymptote will still be 100% over here.

112
00:10:12,000 --> 00:10:20,000
Actually with virtual output queues, the delay will be slightly higher but the asymptote is to 100%.

113
00:10:20,000 --> 00:10:24,000
I'd like to say a few last words about virtual output queues.

114
00:10:24,000 --> 00:10:30,000
Virtual output queues are actually used very widely and you may even have noticed them when driving on the street.

115
00:10:30,000 --> 00:10:37,000
So in the US where we drive on the right, it's very common to have a left hand turn lane like the one that's shown here.

116
00:10:37,000 --> 00:10:45,000
This is to hold cars that are arriving and that are blocked because of cars coming the other way.

117
00:10:45,000 --> 00:10:49,000
These ones are blocked and can't turn left until there's nothing coming the other way.

118
00:10:49,000 --> 00:10:54,000
However, cars in this lane here can keep going straight on or can turn right.

119
00:10:54,000 --> 00:11:03,000
They are not held up or blocked because of a packet ahead of it going to an output that in this case over here which is temporarily unavailable.

120
00:11:03,000 --> 00:11:09,000
So in countries where you drive on the left hand side then a right hand turn lane is quite common as well.

121
00:11:09,000 --> 00:11:14,000
So next time you're driving and you see one of these, just remember this is virtual output queuing.

122
00:11:15,000 --> 00:11:19,000
So in summary we've seen that packet switches perform two basic operations.

123
00:11:19,000 --> 00:11:26,000
They look up addresses in a forwarding table. We saw examples of that in the last video for Ethernet switches and for Internet routers.

124
00:11:26,000 --> 00:11:30,000
And they also once they're decided where a packet is going they have to switch it.

125
00:11:30,000 --> 00:11:35,000
They have to deliver it to the correct egress port so it can go under the correct output link.

126
00:11:35,000 --> 00:11:42,000
The simplest and slower switch is use output queuing because this maximizes the throughput and minimizes the expected delay of packets.

127
00:11:42,000 --> 00:11:50,000
Whereas more scalable switches often use input queues with virtual output queues to maximize the throughput.

128
00:11:50,000 --> 00:11:53,000
That's the end of this video.

