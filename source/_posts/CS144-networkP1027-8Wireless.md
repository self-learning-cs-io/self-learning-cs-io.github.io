---
title: CS144 NetworkP1027 8Wireless
---

1
00:00:00,000 --> 00:00:04,600
In this video, I'm going to talk about wireless media access control and why it is that the

2
00:00:04,600 --> 00:00:10,240
media access control algorithms we see in wired systems like CSMA, carrier sense multiple

3
00:00:10,240 --> 00:00:13,599
access CD, closed detection, don't work in wireless.

4
00:00:13,599 --> 00:00:17,480
So we're called the basic goals of the media access control protocol.

5
00:00:17,480 --> 00:00:22,359
There's essentially three, which is that you want to arbitrary control the channel, who

6
00:00:22,359 --> 00:00:23,760
gets the transmit when?

7
00:00:23,760 --> 00:00:26,320
Well, simultaneously trying to achieve three things.

8
00:00:26,320 --> 00:00:29,480
And generally you can't achieve all of them simultaneously so you trade off between

9
00:00:29,480 --> 00:00:30,480
them.

10
00:00:30,480 --> 00:00:32,960
The first is that if there's only one node that wants to transmit, it should be able to

11
00:00:32,960 --> 00:00:34,840
get 100% of the medium.

12
00:00:34,840 --> 00:00:38,359
The second goal is that if you have multiple nodes trying to transmit, they should each

13
00:00:38,359 --> 00:00:41,159
get a fair share of the medium, so say one-anth.

14
00:00:41,159 --> 00:00:46,400
Finally, if there's lots of nodes contending, you'd like it that the medium is being used

15
00:00:46,400 --> 00:00:47,400
heavily.

16
00:00:47,400 --> 00:00:50,960
So if that one-anth is only 1,000th of the medium, that's not very useful.

17
00:00:50,960 --> 00:00:55,480
So this is the three goals that we have in a media access control protocol.

18
00:00:55,479 --> 00:01:01,559
So we call it Ethernet, CSMACD, Carrier Sense Multiple Access Collision Detection, has

19
00:01:01,559 --> 00:01:04,079
a simple approach on transmission.

20
00:01:04,079 --> 00:01:06,280
You set a counter-n.

21
00:01:06,280 --> 00:01:09,560
If the channel's idle, you just sense the voltage is under, why are you transmit?

22
00:01:09,560 --> 00:01:17,359
If it's busy, you wait until it's idle for 96-bit times, is this timing thing in Ethernet,

23
00:01:17,359 --> 00:01:20,039
and then you transmit.

24
00:01:20,039 --> 00:01:22,519
During a transmission, you can detect a collision.

25
00:01:22,519 --> 00:01:26,959
That is, you hear that you're transmitting some zeros and ones, but what you hear is different

26
00:01:26,959 --> 00:01:27,959
than that.

27
00:01:27,959 --> 00:01:30,560
That you hear some other ones and you thought you were transmitting zeros.

28
00:01:30,560 --> 00:01:33,879
So if you detect a collision, the voltage is different than what you'd expect.

29
00:01:33,879 --> 00:01:40,959
You wait 96-bit times, and then if there's no collision, then you just wait 96-bit times

30
00:01:40,959 --> 00:01:43,959
that's transmitted fine, and you will then transmit again.

31
00:01:43,959 --> 00:01:48,479
If you do detect a collision, then you send a jam signals, everyone knows that there's

32
00:01:48,480 --> 00:01:52,640
a collision just to be sure, and then you back off, and this back off is exponentially

33
00:01:52,640 --> 00:01:54,719
increasing.

34
00:01:54,719 --> 00:01:55,719
You check the channel again.

35
00:01:55,719 --> 00:02:03,079
There's this idea that you start transmitting if the channel is idle, if the channel, you

36
00:02:03,079 --> 00:02:07,920
hear a collision, then you transfer the jam signal and you back off and you wait.

37
00:02:07,920 --> 00:02:12,080
So Carrier Sense Multiple Access Collision Detection, you can detect a collision.

38
00:02:12,080 --> 00:02:16,439
So it turns out that this approach does not work on wireless, and the basic reason is

39
00:02:16,439 --> 00:02:17,439
this.

40
00:02:17,439 --> 00:02:24,079
So here, if collision detected, the problem is that the transmitter is transmitting a signal

41
00:02:24,079 --> 00:02:27,840
which is being received at the receiver.

42
00:02:27,840 --> 00:02:32,159
The transmitter is going to hear its own signal at a really, really high signal strength.

43
00:02:32,159 --> 00:02:34,439
You know, it's right next to itself.

44
00:02:34,439 --> 00:02:40,199
But it can't necessarily hear what's happening at the receiver in a wired network.

45
00:02:40,199 --> 00:02:43,840
Because there's so little attenuation of a distance, the receiver and transmitter share

46
00:02:43,920 --> 00:02:45,800
their observation of the environment.

47
00:02:45,800 --> 00:02:49,640
You know, if the receiver is hearing a signal, then the transmitter is going to hear that

48
00:02:49,640 --> 00:02:52,879
signal as well, because it's going to probably get along the wire with very little attenuation.

49
00:02:52,879 --> 00:02:54,840
But that's not true in wireless.

50
00:02:54,840 --> 00:02:59,439
In wireless, it could be that the interfering transmitting signal is too weak for the transmitter

51
00:02:59,439 --> 00:03:00,439
to hear.

52
00:03:00,439 --> 00:03:01,759
So here's a, let me show you an example of this.

53
00:03:01,759 --> 00:03:07,759
So here we have A, B, and C. And so A is our transmitter, and it's transmitting a packet

54
00:03:07,759 --> 00:03:13,080
to B. B is receiving this packet just fine.

55
00:03:13,080 --> 00:03:18,680
And simultaneously, C starts transmitting to B.

56
00:03:18,680 --> 00:03:22,320
Now, C is B is able to hear C signal.

57
00:03:22,320 --> 00:03:24,160
B is able to hear A signal.

58
00:03:24,160 --> 00:03:26,880
When they both arrive, it just hears garbage.

59
00:03:26,880 --> 00:03:28,280
There's interference.

60
00:03:28,280 --> 00:03:32,760
But it turns out that C signal, because it's decaying with at least the square of the

61
00:03:32,760 --> 00:03:36,280
distance, is too weak for A to hear.

62
00:03:36,280 --> 00:03:41,240
In particular, because A's own signal is so powerful, it's shouting.

63
00:03:41,240 --> 00:03:44,560
And C is coming from far away.

64
00:03:44,560 --> 00:03:50,560
Even if C signal was strong enough for A to hear, A can't hear C signal over its own,

65
00:03:50,560 --> 00:03:52,800
because its signal is way up here.

66
00:03:52,800 --> 00:03:56,840
It's something like, let's say, minus 20 dBm.

67
00:03:56,840 --> 00:04:00,640
Whereas C signals arriving at say minus 80 dBm.

68
00:04:00,640 --> 00:04:01,640
A can't hear it.

69
00:04:01,640 --> 00:04:03,640
It's trying to hear a whisper while it's shouting.

70
00:04:03,640 --> 00:04:04,640
I can't do it.

71
00:04:04,640 --> 00:04:10,800
There's a difference in contrast to a wire, where C signal would arrive, say, minus 21.

72
00:04:10,800 --> 00:04:13,600
dBm, it wouldn't attenuate very much at all.

73
00:04:13,600 --> 00:04:16,000
And so A would still be able to hear it.

74
00:04:16,000 --> 00:04:20,600
And so the problem here is that A can't detect the collision it'd be.

75
00:04:20,600 --> 00:04:23,600
So CsMACD doesn't work.

76
00:04:23,600 --> 00:04:28,600
So what this means in practice is that wireless networks, in order to be able to respond to collisions

77
00:04:28,600 --> 00:04:32,199
in order to get good utilization of the channel, use different algorithms.

