---
title: CS144 NetworkP322 7Stopandwait
---

1
00:00:00,000 --> 00:00:06,000
This video is about flow control, one of the basic building blocks of reliable, efficient communication.

2
00:00:06,000 --> 00:00:13,000
Describes the basics of flow control, as well as its simplest implementation, something called the stop and wait protocol.

3
00:00:13,000 --> 00:00:20,000
The basic problem flow control tries to solve is when a sender can send data faster than the receiver can process it.

4
00:00:20,000 --> 00:00:27,000
So here we have a case where the sender A can send some 500,000 packets per second,

5
00:00:27,000 --> 00:00:38,000
but the receiver B can only receive 200,000 packets per second. This might be because B has a slower processor, its networking card is good or whatever reason.

6
00:00:38,000 --> 00:00:49,000
And so the issue is that if A sends data at this full rate of 500,000 packets per second, then 300,000 of those are going to have to be dropped at B.

7
00:00:49,000 --> 00:00:58,000
That is B will not be able to process them, and so only 40% of the packets will come through. And so there's a lot of wasted effort on A's part, and it's a lot of wasted effort in the network.

8
00:00:58,000 --> 00:01:07,000
And it's also going to completely saturate B's. There's no reason for A to be sending data faster than the rate of which B can receive it.

9
00:01:07,000 --> 00:01:16,000
And so the basic approach the flow control takes is to make it that the sender doesn't send packets faster than the receiver can process them.

10
00:01:16,000 --> 00:01:26,000
And the way that usually works is the receiver gives the sender some kind of feedback, whether it's implicit feedback or explicit, whether it's slow down or speed up or to set a rate.

11
00:01:26,000 --> 00:01:36,000
So two basic approaches used in most protocols today. The first stop and wait, talk about in this video, which is very simple, very simple and very simple fun and sting machine.

12
00:01:36,000 --> 00:01:44,000
The second is what's called sliding window, so talk about in a later video, which is a bit more complex, but can provide better performance.

13
00:01:44,000 --> 00:01:54,000
So just a refresher on finite state machine diagrams. So when we draw a finite state machine of a protocol, we show the states that can enter here, state 1, state 2, state 3.

14
00:01:54,000 --> 00:02:07,000
And then edges between the states have two pieces of information. First, the event that can cause a state transition on top and then below the action the protocol takes on making that state transition.

15
00:02:08,000 --> 00:02:16,000
The stop and wait algorithm is very simple. It has at most one packet in flight at any time from the sender to the receiver.

16
00:02:16,000 --> 00:02:22,000
So the basic algorithm is a sender sends one packet. It then waits for an acknowledgement from the receiver.

17
00:02:22,000 --> 00:02:28,000
When it receives the acknowledgement, it then, if it has more data to send, sends another packet.

18
00:02:29,000 --> 00:02:35,000
If it waits for some time and reaches a timeout and hasn't heard an acknowledgement, then it assumes that the packet has been lost.

19
00:02:35,000 --> 00:02:42,000
It has left the network, it has dropped on a router, it has dropped to the receiver, something happened, and where the acknowledgement was dropped.

20
00:02:42,000 --> 00:02:49,000
And it resends the data. So there's a timeout, which point it tries again. That's the basic algorithm.

21
00:02:49,000 --> 00:02:57,000
So the receiver has a one state finite state machine, which is wait for packets. When it receives new data, it sends an acknowledgement or a receiver.

22
00:02:57,000 --> 00:03:06,000
It receives a data that sends an acknowledgement for that data. And if the data is new, it delivers that data to the application.

23
00:03:06,000 --> 00:03:12,000
The sender finite state machine has two states. The first state, it's waiting for data from the applications.

24
00:03:12,000 --> 00:03:17,000
This is where it's ready to send, but the data application is not yet provided to the send.

25
00:03:18,000 --> 00:03:27,000
When the application calls send, the protocol sends a packet with that data, or as much as you can fit in a packet.

26
00:03:27,000 --> 00:03:34,000
It then enters the wait for X state. In this state, there are two transitions. The first is, if it receives an acknowledgement.

27
00:03:34,000 --> 00:03:41,000
If the protocol receives an acknowledgement, then it does nothing and goes back to wait for data. If there's more data to send, it'll send new data.

28
00:03:41,000 --> 00:03:45,000
Or if there's no more data to send, it'll wait until the software calls send.

29
00:03:45,000 --> 00:03:52,000
The second transition is when it's a timeout. This is the case where it has sent a packet of data, but it hasn't received the acknowledgement.

30
00:03:52,000 --> 00:03:56,000
It's waiting and it's waiting and it's waiting and it times up. Then it just tries rescending.

31
00:03:56,000 --> 00:04:02,000
So it wants to pick this timeout that it's conservative. It's pretty sure that the data or the subsequent acknowledgement has been lost.

32
00:04:02,000 --> 00:04:06,000
So it only has one packet in the network at any time.

33
00:04:06,000 --> 00:04:10,000
So that's the basic stop and wait algorithm. So here are four sample executions.

34
00:04:10,000 --> 00:04:19,000
The first is when there's no loss. Everything works perfectly. The sender sends its data. They receive a receive it, sends acknowledgement.

35
00:04:19,000 --> 00:04:23,000
And now the sender, if it had more data, it could send more.

36
00:04:23,000 --> 00:04:28,000
The second case, data is lost. Now the sender sends data. It's lost in the network.

37
00:04:28,000 --> 00:04:38,000
So the sender times out and tries rescending the data. So it's sitting in that waiting for X state. The timeout hits and it rescends.

38
00:04:39,000 --> 00:04:45,000
Here's a third case where the data is successfully delivered, but the acknowledgement is lost.

39
00:04:45,000 --> 00:04:50,000
It's now the sender is in the wait for X state. The time's out. It rescends the data.

40
00:04:50,000 --> 00:05:00,000
And then this causes the receiver to send a new acknowledgement, at which point then the sender gets the acknowledgement and continues as in the first case.

41
00:05:01,000 --> 00:05:09,000
So the fourth case is a little more complicated. It actually shows a failure with the basic algorithm as I described before.

42
00:05:09,000 --> 00:05:15,000
Which is the sender sends some data and the receiver sends an acknowledgement.

43
00:05:15,000 --> 00:05:20,000
But let's say something happens in the network. Suddenly the link becomes very slow or there's a big cue somewhere in the network.

44
00:05:21,000 --> 00:05:27,000
And the acknowledgement is delayed past the time of the timeout.

45
00:05:27,000 --> 00:05:34,000
And so the sender sends some data and the acknowledgement comes. But the sender rescends the data before the acknowledgement arrives.

46
00:05:34,000 --> 00:05:37,000
The acknowledgement that arrives very shortly.

47
00:05:37,000 --> 00:05:44,000
And so now the sender knows that the data was acknowledged and it sends another data packet.

48
00:05:44,000 --> 00:05:48,000
But let's say that in fact this data packet is lost.

49
00:05:48,000 --> 00:05:57,000
So now this first retransmission, this first retransmission of the first data packet arrives at the receiver. The receiver acknowledges it.

50
00:05:57,000 --> 00:06:10,000
The sender doesn't know whether this acknowledgement here, this act, is for the retransmission here of the data or it's for the new data packet.

51
00:06:10,000 --> 00:06:20,000
And so here we can have an error where if it assumes it was for the retransmission of the old data, it's only used to keep track of that.

52
00:06:20,000 --> 00:06:29,000
Something the finite state machines to keep track of. If it assumes it's for the new data, that data might not have arrived. It could be assuming the data has arrived which hasn't.

53
00:06:29,000 --> 00:06:35,000
So this is a basic problem that comes up in any reliable protocol. It comes up in flow control.

54
00:06:35,000 --> 00:06:44,000
Which is how do you detect duplicates? How do you know when acknowledgments are from retransmissions or duplicated copies of packets versus new data?

55
00:06:44,000 --> 00:06:49,000
And so in the case of stop and wait, we can solve this problem with a one big counter.

56
00:06:49,000 --> 00:06:54,000
And so the idea is that use this one big counter on all data acknowledgement and acknowledgement packets.

57
00:06:54,000 --> 00:07:00,000
So a sender sends data zero, then it receives a Xero, data one, a one, data zero, a Xero.

58
00:07:00,000 --> 00:07:05,000
And so now the receiver can tell if this is new data or duplicate.

59
00:07:05,000 --> 00:07:15,000
And so in that prior case, I showed you be able to distinguish between the acknowledgement for the retransmission of packet zero and an acknowledgement for the first transmission of packet one.

60
00:07:15,000 --> 00:07:21,000
Now a single bit counter makes a couple of simplifying assumptions. This doesn't work all the time.

61
00:07:21,000 --> 00:07:32,000
So what if a packet is delayed for many round trip times? It could be for example that this data zero is delayed all the way here.

62
00:07:32,000 --> 00:07:39,000
And then the receiver acts it, but it turns out it's actually just a copy of old data.

63
00:07:39,000 --> 00:07:45,000
And so this particular one bit counter approach makes two simplifying assumptions.

64
00:07:45,000 --> 00:07:50,000
First, the network isn't duplicating packets itself. Second, the packets are not being delayed for multiple timeouts.

65
00:07:50,000 --> 00:08:02,000
Now you can solve these problems by increasing the sequence number space, but for the simplifying assumptions to simple protocol operating environment, this one bit counter can help a lot.

