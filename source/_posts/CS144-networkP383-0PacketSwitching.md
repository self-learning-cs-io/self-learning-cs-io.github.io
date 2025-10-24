---
title: CS144 NetworkP383 0PacketSwitching
---

1
00:00:00,000 --> 00:00:03,000
In this unit, you will learn a lot about packet switching.

2
00:00:03,000 --> 00:00:08,000
It's quite an intense unit, and your head might be spinning with packets by the end of it.

3
00:00:08,000 --> 00:00:10,000
But that's why we have videos.

4
00:00:10,000 --> 00:00:14,000
You can cover the material of your own pace and review it several times.

5
00:00:14,000 --> 00:00:23,000
We'll start out with a visually look at why the internet and almost all modern networks are built on foundation of packet switching.

6
00:00:23,000 --> 00:00:32,000
Packet switching is simple in the sense that each packet is a self-contained unit of data that carries information necessary for it to reach destination.

7
00:00:32,000 --> 00:00:42,000
Packet switching is efficient in the sense that it keeps a link busy whenever there is work to be done, rather than have dedicated capacity reserved for each user or each application.

8
00:00:42,000 --> 00:00:48,000
So after a leisurely introduction to packet switching, we'll dive deeply into some of the consequences.

9
00:00:48,000 --> 00:00:53,000
We'll take a journey that includes more math than you'll see in any other unit in this course.

10
00:00:53,000 --> 00:00:57,000
The math might seem a little daunting at first, but it's actually quite simple.

11
00:00:57,000 --> 00:01:03,000
Once you learn the math, so many other details and complex questions become really easy to answer and understand.

12
00:01:03,000 --> 00:01:10,000
For example, you'll learn why two packets traveling between the same two end hosts might encounter a different delay.

13
00:01:10,000 --> 00:01:18,000
While the time they spend traversing each link is the same, the packets might take different paths and experience different queuing delays in the route of office.

14
00:01:18,000 --> 00:01:28,000
Make sure you fully understand the three main components of packet delay, the packetization delay, the propagation delay, and the queuing delay.

15
00:01:28,000 --> 00:01:32,000
And that you understand the physical processes that cause them.

16
00:01:32,000 --> 00:01:39,000
By the end of this unit, you'll be able to answer questions like, how long does it take a packet to get from here to London?

17
00:01:39,000 --> 00:01:43,000
Or how many packets can I fit in space between the moon and Mars?

18
00:01:43,000 --> 00:01:49,000
You'll understand why the router's buffers and how queuing delay leads to uncertainty about when packets will arrive.

19
00:01:49,000 --> 00:02:00,000
For most applications, this isn't an issue, but for real-time streaming applications like Skype and YouTube, they need to play back smooth, pick up free audio and video to the user.

20
00:02:00,000 --> 00:02:08,000
It's the need to absorb the variation delay across the internet. You'll learn how playback buffers are designed for this exact purpose.

21
00:02:08,000 --> 00:02:12,000
Finally, you'll learn about how packet switches work in practice.

22
00:02:12,000 --> 00:02:19,000
At the end of the unit, you'll also be able to answer the question, how does an internet router actually work and how is it different from an ethernet switch?

23
00:02:19,000 --> 00:02:23,000
How does a router arrange its lookup tables internally?

24
00:02:23,000 --> 00:02:32,000
It's quite a whistle stop tour of packet switching, and by the end of the unit, you should have a good intuition of how packet switching actually works in the internet.

