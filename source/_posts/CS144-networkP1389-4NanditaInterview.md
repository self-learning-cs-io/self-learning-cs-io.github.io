---
title: CS144 NetworkP1389 4NanditaInterview
---

1
00:00:00,000 --> 00:00:04,000
Today I'm going to be talking to Dr. Nandita Dukapati.

2
00:00:04,000 --> 00:00:08,000
Nandita did her PhD here at Stanford, graduating a number of years ago,

3
00:00:08,000 --> 00:00:14,000
and she worked on TCP, congestion control algorithms, and alternatives to TCP.

4
00:00:14,000 --> 00:00:19,000
She popularized, in particular, the term flow completion time as a metric for TCP.

5
00:00:19,000 --> 00:00:24,000
In addition to some of the other metrics we normally use like fair share, high throughput.

6
00:00:24,000 --> 00:00:30,000
And she proposed specific alternatives to TCP that bring mechanisms into the network

7
00:00:30,000 --> 00:00:32,000
to try and reduce the flow completion time.

8
00:00:32,000 --> 00:00:38,000
Anyway, today she works at Google where she continues to work on a number of different congestion control mechanisms.

9
00:00:38,000 --> 00:00:44,000
And I invited her here today to talk with us about some of the things she's learned along the way.

10
00:00:44,000 --> 00:00:51,000
Nandita, what are the shortcomings of TCP and the congestion control algorithms that we learn about in class,

11
00:00:51,000 --> 00:00:55,000
such as TCP, Reno, New Reno, etc.?

12
00:00:55,000 --> 00:01:07,000
Yeah, so over time essentially where as the network bandwidth increased and as various different kinds of applications came over the internet,

13
00:01:07,000 --> 00:01:13,000
these networks and applications challenge TCPs in many new ways.

14
00:01:13,000 --> 00:01:15,000
Let me give you a few examples.

15
00:01:15,000 --> 00:01:23,000
The first one being TCP Reno, New Reno, and even the new app congestion control algorithms, such as QVAC,

16
00:01:23,000 --> 00:01:35,000
are fundamentally lost based algorithms wherein they pump bits into the network until the cues in the network overflow and losses triggered.

17
00:01:35,000 --> 00:01:44,000
In response to which they modulate the rate, the problem is that these TCPs required the loss rate to be extremely small.

18
00:01:44,000 --> 00:01:54,000
Such as one in 80,000 segments to sustain a link rate of 10 e to bits per second over 200 milliseconds length.

19
00:01:54,000 --> 00:02:06,000
So that turned out to be one of the big problems a decade back when a physicist was transferring large amounts of data over trans-ocean-8 links.

20
00:02:06,000 --> 00:02:14,000
But besides that, we have a slew of newer problems, for example, considered the web traffic,

21
00:02:14,000 --> 00:02:22,000
which have extremely short transactions, request response transactions, such as one would find an HTTP,

22
00:02:22,000 --> 00:02:30,000
or even RPCs that is remote procedure calls within a data center. These are all request response transactions.

23
00:02:30,000 --> 00:02:38,000
The problem is, consider every connection TCP connection starts with a one-RPD overhead.

24
00:02:38,000 --> 00:02:46,000
This can be significant if the request is just a single packet, or the response is just a 50% overhead.

25
00:02:46,000 --> 00:02:54,000
Or consider the slow start where the algorithm ramps up its congestion window over time.

26
00:02:54,000 --> 00:02:58,000
It starts with a small congestion window and ramps up in every round-trick time.

27
00:02:58,000 --> 00:03:04,000
That is to slow for short transfers, such as what you find in web transactions.

28
00:03:04,000 --> 00:03:13,000
Not just that, even the loss mechanisms in TCP are not very optimal for short flow performance.

29
00:03:13,000 --> 00:03:27,000
In fact, measurements on Google Servers show that lossy HTTP responses take about 10 times longer than those which have experienced no losses over very similar networks.

30
00:03:27,000 --> 00:03:39,000
Then there are several other problems, such as over the internet these days, switches and routers are vastly have large amounts of buffering.

31
00:03:39,000 --> 00:03:51,000
Now, back in two decades back, where throughput was a concern, these congestion control algorithms were designed to fill up these buffers until the buffers actually overflow.

32
00:03:51,000 --> 00:04:06,000
But the problem is buffers have gotten larger, introduced, and as a result, these introduced large amounts of delays, especially for short transactions that just was by and lost an RTD or a couple of RTDs.

33
00:04:06,000 --> 00:04:15,000
And there are also problems at the other extreme end. We also have switches and routers with extremely small amounts of buffering.

34
00:04:16,000 --> 00:04:32,000
And that is also a problem for TCP, because extremely small amounts of buffering causes losses in bursts or packet trains of packet arriving, lose a packet or two almost accidentally.

35
00:04:32,000 --> 00:04:46,000
TCP, things, treats these burst related losses as congestion losses and drastically reduces its congestion window. And as a result, the links are not being able to be filled completely.

36
00:04:46,000 --> 00:04:53,000
So, so in both extremes, TCP's congestion control actually does not work very well.

37
00:04:53,000 --> 00:05:01,000
The more interesting problem that has come up in recent times is the interaction between browsers and TCP.

38
00:05:01,000 --> 00:05:13,000
So, the way browsers work today is they open several dozens of connections in order to be able to download the resources from the webpages.

39
00:05:13,000 --> 00:05:27,000
So, for example, if you go to images.google.com, and search for say cats and kittens, then it makes several connections to images 1.google.com, images 2.google.com, and so on.

40
00:05:28,000 --> 00:05:39,000
And so, you have a sudden influx of these HDTV responses coming to your cable or DSL link. It's almost like a flash crowd scenario.

41
00:05:39,000 --> 00:05:56,000
There isn't much of congestion control. You can exert on each of these responses, because each of these is a very tiny entity, but taken together, they actually create some bad problems, such as overflowing the buffers, increased delay, human latency, and so on.

42
00:05:57,000 --> 00:06:07,000
In addition to these, the newer mobile networks are also posing some performance challenges for congestion control in TCP.

43
00:06:07,000 --> 00:06:16,000
For example, the link fading and the link up and down, which is very common in layer 2 in cellular networks.

44
00:06:17,000 --> 00:06:28,000
Tricks TCP to thinking that there is extreme congestion in the network, and therefore it should back off and do an exponential retransmission timeout.

45
00:06:28,000 --> 00:06:39,000
So, these are the kind of problems that we actually routinely see in more for when TCP interacts with modern applications and networks.

46
00:06:39,000 --> 00:06:47,000
What are some of the mechanisms and improvements that have been put in place over the years to try and overcome these limitations and shortcomings of TCP?

47
00:06:47,000 --> 00:06:53,000
So, one can think of these mechanisms as falling into three broad classes.

48
00:06:53,000 --> 00:07:05,000
So, one can, there are end-host only mechanisms, such as, so these changes require only server-side or only client-side changes.

49
00:07:06,000 --> 00:07:12,000
And then the second category of mechanisms are those which require only changes to the switches and routers.

50
00:07:12,000 --> 00:07:32,000
For example, the active queue management algorithms, such as the most recent ones have been Codal, Control Delay, and Pi, which selectively drop packets in order to send a signal to the TCP senders that there is,

51
00:07:32,000 --> 00:07:37,000
there are queues being built up at the routers of switches and it's time to slow down.

52
00:07:37,000 --> 00:08:00,000
And then there are these mechanisms such as RCP, Read Control Protocol, or XCP, MaxNet, or DCTCP that actually require changes for both the intermediatory network devices, as well as the end systems, where the end systems get an explicit either a one-bed notification in case of ECN,

53
00:08:00,000 --> 00:08:08,000
or a multi-bed notification in the case of RCP, XAP, that tells them explicitly how to modulate their rate.

54
00:08:08,000 --> 00:08:21,000
However, the most successful amongst these categories have been the first one, which is really the end system, changes firmly because they are easier to deploy, get through metal boxes, and so on and so forth.

55
00:08:21,000 --> 00:08:39,000
And in this category, we've seen a slew of new congestion control algorithms such as QBIC TCP, high-speed TCP, fast TCP, which aim to solve the problem of maintaining high throughput in large bandwidth delay product networks.

56
00:08:39,000 --> 00:08:55,000
So the way they improve over Reno, New Reno is that they do not react as drastically to losses, and they ramp up much faster when there's free available bandwidth.

57
00:08:55,000 --> 00:09:15,000
QBIC TCP and high-speed TCPs are still fundamentally loss-based TCPs, in the sense they cut down the congestion window in response to losses, whereas fast TCP is a delay-based algorithm that is more agnostic to losses, but modulates its congestion window based on the measured changes in the round-trick time.

58
00:09:16,000 --> 00:09:26,000
And in addition to these off-late, there have been a slew of mechanisms to make short transactions over the internet faster.

59
00:09:26,000 --> 00:09:37,000
Naturally, to make the web pages download faster, among these a few of these examples are TCP fast open.

60
00:09:37,000 --> 00:09:46,000
Fast open essentially allows you to send, allows one to send data along with the send packet.

61
00:09:46,000 --> 00:10:00,000
So one can imagine that if a client is issuing a web request and the request typically fits within one packet, you don't have to wait around trip time before actually being able to send the request to the server.

62
00:10:00,000 --> 00:10:09,000
You can now send the request in the send packet itself. So that's a significant reduction in the page load time.

63
00:10:09,000 --> 00:10:19,000
When you do this over and over again, you actually begin to notice significant differences in user experience latencies.

64
00:10:20,000 --> 00:10:29,000
Then there are a few other changes such as TCP's initial congestion window has stood at three segments for long time.

65
00:10:29,000 --> 00:10:40,000
Recently, it's been increased to 10 segments in many of the notable open source operating systems.

66
00:10:41,000 --> 00:10:49,000
There are other changes, for example, proportional rate reduction, which actually makes the fast retransment algorithm more efficient.

67
00:10:49,000 --> 00:10:56,000
The fast retransment algorithm in TCP has been found it's either extremely bursty or too timid.

68
00:10:56,000 --> 00:11:15,000
What proportional rate reduction does is it actually smooths out the fast retransment and the fast recovery to pump in just the amount of data that has been delivered to the receiver and therefore makes the recovery of losses in short flows much smoother.

69
00:11:16,000 --> 00:11:22,000
The final area where there is being improvement is in the retransmission timeout.

70
00:11:22,000 --> 00:11:32,000
RTOs are painful for short flows and RTO base recovery is 10 to 100 times longer than the fast retransment of fast recovery.

71
00:11:33,000 --> 00:11:44,000
Recently, there is a proposal called the tail loss probe which actually converts an RTO into a fast retransment even for short flows.

72
00:11:44,000 --> 00:11:57,000
This is significant in reducing the tail latency of short flows because most of the losses in short transfers happen to be tail losses about 70 percent of the RTOs.

73
00:11:58,000 --> 00:12:04,000
As a result, the only way that they can recover is an RTO which often is too long.

74
00:12:04,000 --> 00:12:17,000
In big data centers owned by companies like Google where you work or Facebook, Amazon, Microsoft and so on, there's an opportunity to change TCP at both ends of the connection, both at the server and at the client.

75
00:12:17,000 --> 00:12:23,000
This might be worthwhile if you're trying to overcome a limitation that is particular to data centers.

76
00:12:24,000 --> 00:12:30,000
What are the sorts of things that companies are doing in data centers to try and improve TCP and congestion control?

77
00:12:30,000 --> 00:12:41,000
A lot of the problems in data centers are in many ways similar to the internet and yet there are some significant differences.

78
00:12:41,000 --> 00:12:45,000
The similarities are the problems that I've spoken to you about.

79
00:12:45,000 --> 00:12:47,000
The key performance metrics are the same.

80
00:12:47,000 --> 00:13:02,000
The data is still carefully about tail latency, either massive over buffering, or also known as a buffer load or massive under buffering, or is still a problem.

81
00:13:02,000 --> 00:13:12,000
The major differences are that we can change both the end of the server and the receiver.

82
00:13:12,000 --> 00:13:32,000
One of the simple changes, for example, over the internet, you have to keep the retransmission timeouts extremely conservative because you're trying to encompass a large category of networks such as mobile networks and even the regular wired networks.

83
00:13:32,000 --> 00:13:40,000
The initial RTOs are in the order of seconds. It's one second right now. Where does a data center network?

84
00:13:40,000 --> 00:13:57,000
There is no way that you don't need a retransmission timeout in the order of seconds because you know the RTD of the cluster within a data center is in the order of a few microseconds.

85
00:13:57,000 --> 00:14:14,000
We've been able to, so making these timers much more precise and much more tight, has been very crucial to actually reduce the tail latencies of the remote procedure calls.

86
00:14:14,000 --> 00:14:43,000
In addition to it, I think the recent work done in Microsoft Research and actually in collaboration with Stanford on DCTCP has been significant because with just a single bit of information from the switches, the endholes are able to make much better decisions on how to modulate the rates.

87
00:14:43,000 --> 00:15:07,000
So I would say a better integration of timers, making the timers much tighter, as well as getting being able to deploy mechanisms that require some participation from the switches in which data centers are different from that of the internet.

88
00:15:08,000 --> 00:15:28,000
Thanks, Andy. So for my last question, all of the improvements you've described so far are modifications and variations on the basic AIMD-based congestion control that was first proposed many years ago. They all use the same basic congestion control mechanism and modify the sliding window in different ways.

89
00:15:28,000 --> 00:15:43,000
So if you look forward 15, 20 years to the future, do you think we'll still be using the same slow start plus AIMD-based congestion control that we do today? Or do you think we'll have replaced it with one or more new schemes that work in very different ways?

90
00:15:43,000 --> 00:16:02,000
That's a great question, actually. And I was kind of secretly hoping that you would ask me that question. I sincerely hope that we don't actually continue to be using just AIMD-based protocols or just slow start AIMD and continue in that for now.

91
00:16:02,000 --> 00:16:18,000
The reason being we are already finding not such limitations, but ways in which we can do better. So far, we've been doing very point-based solutions to each of these problems.

92
00:16:18,000 --> 00:16:37,000
We have different mechanisms for web transactions, short web flows, for example, they don't even rarely go through the AIMD phase. They all finish in the slow start phase. So we try to optimize the web transactions differently.

93
00:16:37,000 --> 00:16:49,000
We try to do something different for mobile networks. We try to do something different for video flows just because the video application patterns are very different from just long FTP flows or the short web transactions.

94
00:16:49,000 --> 00:17:06,000
We treat the data center networks slightly differently just because of the extremely short latencies. Similarly, we treat the mobile networks differently. We try to do different TCPs for extremely overbuffered networks or extremely underbuffered networks.

95
00:17:06,000 --> 00:17:33,000
So really, my hope is that we stop doing these point solutions to these point problems. Instead, look at step back and look at, can we actually design congestion control that just works for old networks and for all application patterns instead of going about and treating every problem as if this is a special case problem.

96
00:17:33,000 --> 00:17:52,000
So that's exactly what we're doing today. And in that direction, I think the recent work from MIT, the Remy program that generates congestion control algorithms adaptively based on machine learning algorithms, I think that's an interesting direction.

97
00:17:52,000 --> 00:18:11,000
And I would really like to see some of these automatically generated congestion control algorithms how to play out in practice. It remains to be seen whether they can actually solve the problems of these very different variety of networks that I've spoken about.

98
00:18:11,000 --> 00:18:30,000
And in general, I think in the other direction, I think the router-based, the router-assisted congestion control haven't seen significant deployment just because they're harder to actually deploy it and do experiments on a large scale.

99
00:18:30,000 --> 00:18:46,000
But with the recent advances such as in OpenFlow as well as in SDN, I think we will see more of the network participation even in congestion control. So I'm very hopeful about these two directions going forward.

100
00:18:47,000 --> 00:18:50,000
Thank you very much for talking to us today, Nandita.

101
00:18:50,000 --> 00:18:52,000
Thank you very much. It was my pleasure.

