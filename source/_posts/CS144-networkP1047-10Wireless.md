---
title: CS144 NetworkP1047 10Wireless
---

1
00:00:00,000 --> 00:00:05,000
In this video, I'm going to talk about Request to Send Clear to Send, a wireless media access control algorithm.

2
00:00:05,000 --> 00:00:13,000
Request to Send Clear to Send or RTSCTS uses a short sequence of control packets to determine whether or not it's safe to transmit data.

3
00:00:13,000 --> 00:00:23,000
I'm showing three nodes, A, B, and C, where A can hear B and B can hear C, etc. but A and C cannot hear each other.

4
00:00:24,000 --> 00:00:33,000
And so in an RTSCTS exchange, rather than just immediately send a data packet to B like you do in say, CSMA-CA, A, CNUS, Transmit,

5
00:00:33,000 --> 00:00:42,000
instead the first step is that A sends what's called a Request to Send packet or RTS.

6
00:00:42,000 --> 00:00:49,000
There's a short control packet and an ASC-B can I send you a packet of this duration, say?

7
00:00:50,000 --> 00:01:03,000
If B successfully receives the RTS and it believes that it's possible for it to receive, for example, it doesn't think anyone else can be transmitting nearby, then it can respond with a clear to Send, a CTS.

8
00:01:03,000 --> 00:01:07,000
And it can tell A you are clear to send for this period of time.

9
00:01:07,000 --> 00:01:15,000
And the key thing here is that C can overhear this clear to Send packet and know that B is going to be receiving data.

10
00:01:15,000 --> 00:01:19,000
Because B knows that B is going to be receiving data, it knows it shouldn't transmit during that time.

11
00:01:19,000 --> 00:01:28,000
And so this clear to Send can prevent C from transmitting and therefore prevent, in theory, the hidden terminal problem that we see in CSMA-CA networks.

12
00:01:28,000 --> 00:01:38,000
So next, A sends the data followed by B sending an acknowledgement back.

13
00:01:38,000 --> 00:01:45,000
So this is the basic RTS-CTS exchange, and RTS followed by CTS followed by data followed by an AC.

14
00:01:45,000 --> 00:01:49,000
Now of course, if A sends an RTS to B and doesn't hear a clear to Send, then it can always retry later.

15
00:01:49,000 --> 00:01:55,000
There's standard back-off approaches that you see, for example, exponential back-off that you see in data transmissions in CSMA-CA.

16
00:01:55,000 --> 00:02:06,000
And so the point here is it's not that RTS-CTS has a lower probability of, say, the hidden terminal problem, but rather what it's doing is it's pushing that problem to the control packet exchange.

17
00:02:06,000 --> 00:02:20,000
For example, it very well be that ANC tried to simultaneously transmit an RTS and that causes a collision, but this won't appear as a data packet loss from A to B.

18
00:02:20,000 --> 00:02:23,000
Instead, it'll cause just additional RTS packets.

19
00:02:23,000 --> 00:02:41,000
RTS-CTS is pushing losses and collisions to the control packet exchange.

20
00:02:41,000 --> 00:02:44,000
So let's go back to the problems of CSMA-CA.

21
00:02:44,000 --> 00:02:51,000
Hidden terminals, exposed terminals, and collision or low SNR. So you can ask one by one whether or not RTS-CTS helps or solves these problems.

22
00:02:51,000 --> 00:03:01,000
So first, hidden terminals. RTS-CTS can't solve this problem. It's always possible, for example, that RTS aren't heard, CTS aren't heard.

23
00:03:01,000 --> 00:03:17,000
But for example, we have B sending a CTS to A, but some other notice transmitting and so C ends up not hearing it.

24
00:03:17,000 --> 00:03:24,000
So it's possible that hidden terminals will occur, but RTS-CTS greatly reduces them by having this clear to SNPAC and clearing the channel around receiver.

25
00:03:24,000 --> 00:03:29,000
So for the most part, it doesn't solve it, but it greatly helps.

26
00:03:29,000 --> 00:03:43,000
So how about exposed terminals? So recall exposed terminals are when we have a node here, let's say C.

27
00:03:43,000 --> 00:03:50,000
So B wants to transmit to A, C wants to transmit to D, and C won't transmit because it hears B transmitting.

28
00:03:50,000 --> 00:03:58,000
So in theory, it's very well possible that C could transmit to D. So B is going to send an RTS, then there will be a CTS.

29
00:03:58,000 --> 00:04:04,000
C doesn't hear the RTS, there doesn't hear the CTS, so it knows it can transmit. But in practice, this doesn't really work.

30
00:04:04,000 --> 00:04:12,000
The reason being that C doesn't want to transmit to D because A is going to send the acknowledgement.

31
00:04:12,000 --> 00:04:17,000
And so generally RTS-CTS won't really help you with exposed terminals.

32
00:04:17,000 --> 00:04:27,000
So how about collision or low SNR? Well given that RTS-CTS can reduce collisions hidden terminals, it can help with collision or low SNR.

33
00:04:27,000 --> 00:04:34,000
In a sense of when data losses do occur, it's more likely that they're low SNR, that there's a probability that their collision is lower.

34
00:04:34,000 --> 00:04:37,000
It can't solve the problem, but it can help.

35
00:04:42,000 --> 00:04:50,000
So given that RTS-CTS can help and it can prevent really help with hidden terminal problems, which is pretty common, especially in heavily used networks, why don't we use it?

36
00:04:50,000 --> 00:04:54,000
Why is it the most Wi-Fi systems today use CSMACA?

37
00:04:54,000 --> 00:05:02,000
So the reason is overhead. So recall, we have this packet exchange. We have an RTS, then we have a CTS.

38
00:05:02,000 --> 00:05:08,000
So the question is how long do these packets take? Well, they're little control packets.

39
00:05:08,000 --> 00:05:15,000
But still, just the way Wi-Fi, for example, works is that these control packets actually have to take a significant amount of time.

40
00:05:15,000 --> 00:05:27,000
The reason being that unlike a data packet, which you can send at a really high speed, just to the destination knowing that it's going to have a high signal to noise ratio, so you can use dense constellation, you can send it really, really fast.

41
00:05:27,000 --> 00:05:31,000
These control packets need to be heard by everyone. They always have to be sent at a very low speed.

42
00:05:31,000 --> 00:05:37,000
So wireless physical errors are made from speeds, and you always have to send these control packets at the lowest speed.

43
00:05:38,000 --> 00:05:47,000
And so if you look, let's say this is just this some data student of mine collected just using 802.11b, so it has four speeds, 1, 2, 5.5, and 11 megabits per second.

44
00:05:47,000 --> 00:06:00,000
And this was the observed throughput in megabits per second, of data systems throughput observed up at the network layer, so you're exchanging these frames.

45
00:06:01,000 --> 00:06:09,000
And so you see if you're exchanging data frames at 1 megabit per second, this small control exchange is not a big deal, it's just 4%.

46
00:06:09,000 --> 00:06:14,000
Because these control packets, the actual data packets themselves, are being sent at 1 megabits, these control packets are small.

47
00:06:14,000 --> 00:06:21,000
But as the data rate goes up, if the data packets get shorter and shorter in times, they're faster and faster, the overhead goes up.

48
00:06:21,000 --> 00:06:25,000
These small control packets become a larger and larger fraction of the airtime.

49
00:06:25,000 --> 00:06:39,000
The point in which if you're transmitting at 11 megabits per second, you can get about 5.89 megabits per second out of CSMA, about 4.42 out of RTSCTS, this is a 25% overhead, so you're reducing the throughput of your network by a quarter using RTSCTS.

50
00:06:39,000 --> 00:06:45,000
And so if you don't have collisions, if you're not having hidden terminals, the network is idle, you're taking a big hit.

51
00:06:46,000 --> 00:06:57,000
So one approach people have talked about is that if you see very few losses, things are working great use CSMA, but then if you start seeing collisions, start seeing losses, then switch over to RTSCTS to get better arbitration.

52
00:06:57,000 --> 00:07:01,000
So there's been some research on this, but generally speaking, people often just use CSMA.

