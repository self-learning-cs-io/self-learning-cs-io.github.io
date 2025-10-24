---
title: CS144 NetworkP524 0CongestionControl
---

1
00:00:00,000 --> 00:00:06,000
So in this unit, we're going to be learning about how to control congestion in networks.

2
00:00:06,000 --> 00:00:09,000
You already know about something called flow control.

3
00:00:09,000 --> 00:00:14,000
Flow control is when we try to prevent a sender from overwhelming a receiver.

4
00:00:14,000 --> 00:00:18,000
Why? The receiver telling the sender to slow down.

5
00:00:18,000 --> 00:00:23,000
Congestion control is essentially extending that notion to the network as a whole.

6
00:00:23,000 --> 00:00:26,000
You can imagine that if senders would send too many packets into the network,

7
00:00:26,000 --> 00:00:30,000
they're going to overwhelm the network. The buffers in the routers are going to fill out,

8
00:00:30,000 --> 00:00:33,000
the links are going to overflow, and we're going to start cropping packets.

9
00:00:33,000 --> 00:00:35,000
Probably not a very good thing to happen.

10
00:00:35,000 --> 00:00:40,000
So congestion control is about preventing the senders from overwhelming the network.

