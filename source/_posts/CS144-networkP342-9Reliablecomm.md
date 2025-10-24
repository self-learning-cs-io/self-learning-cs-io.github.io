---
title: CS144 NetworkP342 9Reliablecomm
---

1
00:00:00,000 --> 00:00:08,000
So in this video, I'm going to talk about retransmission strategies for transport protocols in order to achieve reliability, in particular for sliding window protocols.

2
00:00:08,000 --> 00:00:16,000
The basic question is we have with some sliding window reliable transport, a window of packets that are in flight.

3
00:00:16,000 --> 00:00:21,000
Say 1, 2, 3, 4.

4
00:00:22,000 --> 00:00:24,000
We're using cumulative acknowledgments.

5
00:00:24,000 --> 00:00:33,000
And so all we get is something back, such as, act 1, act 2, act 3, act 4.

6
00:00:33,000 --> 00:00:38,000
Just the last byte that was successfully received, the last packet that was successfully received.

7
00:00:38,000 --> 00:00:43,000
We're maintaining a retransmission timer for each of these packets based on when they were sent.

8
00:00:43,000 --> 00:00:49,000
And essentially maintaining a consular investment, if we haven't received an acknowledgement for the packet by this time,

9
00:00:49,000 --> 00:00:56,000
then this means that it is almost certain that the packet was lost, and so we should retransmit it.

10
00:00:56,000 --> 00:01:03,000
And so the question is, given this set of parameters which are generally used for reliable transport, how is the protocol going to behave?

11
00:01:03,000 --> 00:01:06,000
What does its retransmission strategy going to look like?

12
00:01:06,000 --> 00:01:10,000
So we'll see is that there are essentially two strategies you end up seeing.

13
00:01:10,000 --> 00:01:13,000
You end up set up emerging from different protocols.

14
00:01:13,000 --> 00:01:15,000
So first is we go go back in.

15
00:01:15,000 --> 00:01:24,000
So what we think is that go back in is a very pessimistic approach or pessimistic behavior, which is that if a single packet is lost,

16
00:01:24,000 --> 00:01:28,000
then we're going to retransmit the entire outstanding window of packets.

17
00:01:28,000 --> 00:01:36,000
Go back in. So if the window of size n, we lose some packet, we're going to go back and transmissions, retransmit all of them.

18
00:01:36,000 --> 00:01:41,000
The second is selective repeat, which we think it is optimistic.

19
00:01:41,000 --> 00:01:46,000
So where go back in assumes that if one packet is lost, all of them are lost in the window.

20
00:01:46,000 --> 00:01:50,000
Selective repeat assumes that if one packet is lost, only that packet was lost.

21
00:01:50,000 --> 00:01:56,000
So in selective repeat, if we lose a packet, it's not acknowledged, we'll retransmit that packet and only that packet.

22
00:01:56,000 --> 00:02:02,000
So let's look at what go back in appears like a word. What's the behavior that you see?

23
00:02:02,000 --> 00:02:06,000
So let's say that we have a window of size equal to four.

24
00:02:06,000 --> 00:02:11,000
So the sender sends packet one, two, three, four.

25
00:02:11,000 --> 00:02:15,000
And packet two is lost.

26
00:02:15,000 --> 00:02:17,000
So here are four transmissions.

27
00:02:17,000 --> 00:02:25,000
Well in response to packet one, the receiver is going to send acknowledgement and acknowledgement one.

28
00:02:25,000 --> 00:02:28,000
But it's not going to send acknowledgement two.

29
00:02:28,000 --> 00:02:34,000
And so what will happen is at some point, we're going to have retransmit timer go off.

30
00:02:34,000 --> 00:02:43,000
And then in a go back end protocol, what the sender is going to do is it's going to retransmit the entire outstanding window.

31
00:02:43,000 --> 00:02:45,000
There's some kind of timing.

32
00:02:45,000 --> 00:02:50,000
And so don't forget, the window is going to include five because in response to this act one, it can send five.

33
00:02:50,000 --> 00:02:54,000
But so the transmitter, seeing the packet was two, is lost.

34
00:02:54,000 --> 00:03:00,000
It's going to assume that the entire window was lost and retransmit the entire window.

35
00:03:00,000 --> 00:03:04,000
So it's very conservative, very, very pessimistic.

36
00:03:04,000 --> 00:03:08,000
So now let's see what a selective repeat protocol will do.

37
00:03:08,000 --> 00:03:15,000
So again, n equals four.

38
00:03:15,000 --> 00:03:19,000
We transmit one, two, three, four.

39
00:03:19,000 --> 00:03:23,000
One, two, three, four. Packet two is lost.

40
00:03:23,000 --> 00:03:27,000
Packet one is acknowledged, which lets us send five.

41
00:03:27,000 --> 00:03:33,000
In a selective repeat protocol, the transmitter is going to retransmit two.

42
00:03:33,000 --> 00:03:47,000
And then we'll continue execution and transmit six, seven, eight, nine, dot, dot, dot.

43
00:03:47,000 --> 00:03:53,000
So it'll retransmit only the packets that were not acknowledged.

44
00:03:53,000 --> 00:04:01,000
So one question that comes up is why given a selective repeat doesn't send fewer packets, why would you ever want to do go back in?

45
00:04:01,000 --> 00:04:02,000
Well, there are a couple of reasons.

46
00:04:02,000 --> 00:04:16,000
One is that selective repeat, if actually all of those packets were lost, if packet two, three, four, or the packets two, three, four, and five were all lost, in order to do each of these retransmissions involves timers and round chiptimes,

47
00:04:16,000 --> 00:04:28,000
so it can be much slower. If there's a burst of losses, a selective repeat protocol will often be slower to recover, as opposed to go back in, who assumes that all the packets are lost, it retransits all of them, and it gets going faster.

48
00:04:28,000 --> 00:04:38,000
And so there's a tradeoff here between the amount of data that you send, how quickly you send it, and then how much of it is wasted versus the speed of recovery from significant errors.

49
00:04:38,000 --> 00:04:46,000
So let's walk through two example, uh, transport protocols and their configurations and see how they behave, what happens.

50
00:04:46,000 --> 00:04:57,000
So in this first one, our sender has a window of size n, and let's say this n is equal to four, just like the prior examples, and the receiver has a window of size one, so the receive window sizes one.

51
00:04:57,000 --> 00:05:04,000
So based on this, is the protocol going to behave as go back in, or a selective repeat?

52
00:05:04,000 --> 00:05:24,000
Well, so let's walk through it happens. So the sender, let's say it's going to send one, two, three, four, one, two, three, four, and let's say that packet two is lost, so it doesn't arrive.

53
00:05:24,000 --> 00:05:37,000
Well, the receiver is going to acknowledge one, which will allow the sender to send five, but the receiver is not going to acknowledge two.

54
00:05:37,000 --> 00:05:47,000
Now at some point, two's retransmission timer is going to fire, and it'll retransmit two.

55
00:05:47,000 --> 00:05:59,000
But the thing is that because the receiver has a received window size of only one, it has been unable to buffer packets three, four, and five.

56
00:05:59,000 --> 00:06:05,000
And so when it receives packet two, it's going to act two.

57
00:06:05,000 --> 00:06:12,000
The sender has not received an acknowledgement for three. It's going to have to retransmit three.

58
00:06:12,000 --> 00:06:18,000
And then the receiver can acknowledge three.

59
00:06:18,000 --> 00:06:31,000
At some point, the sender can then start using its full window again, but the point being that since this first two was lost, three, four, and five couldn't be buffered, the fact that the receiver has a window size of only one,

60
00:06:31,000 --> 00:06:39,000
is going to force the sender to retransmit every single packet in the window. So we're going to see that this behaves as go back n.

61
00:06:39,000 --> 00:06:46,000
So let's see a second example. So in this case, the sender has a window size of n, and the receiver has a window size of n.

62
00:06:46,000 --> 00:06:50,000
And let's say that for both of them, just again, for simplicity sake, this is of size four.

63
00:06:50,000 --> 00:06:58,000
So in this case, will the protocol be go back n or selective repeat?

64
00:06:58,000 --> 00:07:09,000
So let's walk through what happens. We have again one, two, three, four, two is lost.

65
00:07:09,000 --> 00:07:19,000
So we get an acknowledgement for two, for one, act one, results in packet five being sent, that at some point, two is retransmission timer fires.

66
00:07:19,000 --> 00:07:21,000
So we recent two.

67
00:07:22,000 --> 00:07:28,000
Now the receiver has been able to buffer these packets because it is a window of size n. And so it had three packets buffered.

68
00:07:28,000 --> 00:07:41,000
It can then, so if yours is its buffer, it had packets three, four, and five, packet two arrives. It can then acknowledge five.

69
00:07:41,000 --> 00:07:46,000
So it might be that the sender was a little aggressive, maybe it did retransmit three or four or something.

70
00:07:46,000 --> 00:07:55,000
But the point is that it doesn't have to. For this to operate correctly, if sage is waited for those retransmission timers or it did slow retransmissions, etc.

71
00:07:55,000 --> 00:08:03,000
That the sender is going to resend only packet two, only the out sending packet that was not acknowledged, the rest of the buffer, the receiver.

72
00:08:03,000 --> 00:08:06,000
And so we see that this behaves as selective repeat.

73
00:08:07,000 --> 00:08:18,000
So when you're implementing a transport protocol, say if you're taking, if you're, when you're doing lab two, what one thing you want to think about is how you handle the retransmissions.

74
00:08:18,000 --> 00:08:31,000
So one of the really important things is that you don't retransmit earlier than you should, by which I mean it's not okay to say start a retransmit timer based on packet one or packet two.

75
00:08:31,000 --> 00:08:43,000
And then when two is retransmit timer fires, retransmit an entire window because it could very well be that three, four, and five have been correctly received or something has happened, but you're going to retransmit them anyways.

76
00:08:43,000 --> 00:08:49,000
You're very aggressively putting additional packets in the network. You're inflating the number of packs in the network beyond your window size.

77
00:08:49,000 --> 00:08:54,000
Three, four, and five could still be in the network yet you're putting additional copies of them.

78
00:08:54,000 --> 00:09:02,000
So in that way, you want to be careful about the number of packets you put in the network and be careful about your retransmission policy.

79
00:09:02,000 --> 00:09:10,000
And so we'll see, which you can see is that on one hand, you can assume trying to be very conservative and say, look, if one packet was lost, I'm going to assume that the others are lost.

80
00:09:10,000 --> 00:09:15,000
And then I'm going to retransmit the entire window with a go back end policy.

81
00:09:15,000 --> 00:09:22,000
That will happen if say your receiver has a window size of only one or you can maybe be a bit slower.

82
00:09:22,000 --> 00:09:29,000
And say, look, one pack was lost. I'm going to wait for untruth time to transmit that. See if I get an acknowledgment. See if the acknowledgment puts me.

83
00:09:29,000 --> 00:09:35,000
And then perhaps just do a selective repeat and transmit only the packet that needs to be transmitted.

