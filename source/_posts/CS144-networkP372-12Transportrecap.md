---
title: CS144 NetworkP372 12Transportrecap
---

1
00:00:00,000 --> 00:00:07,000
In this unit, you learned about the transport layer. Specifically, you learned about the three most important transport layers and used today.

2
00:00:07,000 --> 00:00:13,000
The first TCP or the transmission control protocol is used by over 95% of Internet applications.

3
00:00:13,000 --> 00:00:21,000
TCP is almost universally used because it provides the reliable end-to-end by directional byte stream service that almost all applications desire.

4
00:00:21,000 --> 00:00:28,000
Most of the videos in this unit were about TCP you learned how we detect that a packet was not delivered or was corrupted along the way.

5
00:00:28,000 --> 00:00:34,000
And you learned about the mechanisms TCP uses to successfully retransmit data until it's correctly delivered.

6
00:00:34,000 --> 00:00:40,000
We spent three videos exploring different methods for reliably delivering data across the unreliable Internet.

7
00:00:40,000 --> 00:00:45,000
The second transport layer we studied is UDP or the user data ground protocol.

8
00:00:45,000 --> 00:00:55,000
UDP is used by applications that don't need the guaranteed delivery service of TCP, either because the application handles retransmissions in its own private way,

9
00:00:55,000 --> 00:00:59,000
or because the application just doesn't need the reliable delivery.

10
00:00:59,000 --> 00:01:04,000
All UDP does is take application data and create a UDP data ground.

11
00:01:04,000 --> 00:01:10,000
The UDP data ground identifies the application that the data should be sent to at the other end. That's about it.

12
00:01:10,000 --> 00:01:20,000
Although very few applications use UDP, we saw examples of DNS and DHCP which are both simple request response query protocols.

13
00:01:21,000 --> 00:01:26,000
The third transport layer we studied is ICMP or the Internet Control Message Protocol.

14
00:01:26,000 --> 00:01:30,000
ICMP's main job is to send feedback if things are going wrong.

15
00:01:30,000 --> 00:01:38,000
For example, if a router receives an IP data ground but doesn't know where to send it next, then it sends an IP and ICMP message back to the source to let it know.

16
00:01:38,000 --> 00:01:44,000
ICMP is very useful for understanding why end-to-end communications are not working properly.

17
00:01:44,000 --> 00:01:53,000
Finally, you learned about one of the most important overarching architectural principles that guided the design of the Internet and continues to guide our thinking today.

18
00:01:53,000 --> 00:01:55,000
It's called the end-to-end principle.

19
00:01:55,000 --> 00:02:04,000
We learned about two versions of the end-to-end principle, the milder version, says that there are some functions that can only be correctly implemented at the edges or fringe of the network.

20
00:02:04,000 --> 00:02:07,000
These clearly need to be implemented there.

21
00:02:07,000 --> 00:02:11,000
End-to-end reliable file transfer and security are two examples that we saw.

22
00:02:11,000 --> 00:02:18,000
It's okay to help these features by adding functions to the network, but these can only help not replace the end-to-end functionality.

23
00:02:18,000 --> 00:02:25,000
The second stronger version of the end-to-end principle says that if we can implement a function at the end-hosts, then we should.

24
00:02:25,000 --> 00:02:32,000
The basic idea is that network should be kept simple, streamlined with as few features to go wrong to slow things down or require upgrading.

25
00:02:32,000 --> 00:02:40,000
It assumes that the end-hosts are quite intelligent, such as a laptop or a smartphone, and can implement many of the features needed by the application.

26
00:02:41,000 --> 00:02:45,000
In this unit, you studied five main topics.

27
00:02:45,000 --> 00:02:47,000
One.

28
00:02:47,000 --> 00:02:50,000
Three widely used transport layers.

29
00:02:50,000 --> 00:02:53,000
TCP for a liable delivery of a byte stream between applications.

30
00:02:53,000 --> 00:03:01,000
UDP is an unreliable delivery of datagrams between applications, and ICMP is a way to detect when things go wrong.

31
00:03:01,000 --> 00:03:09,000
Two. How TCP works, with a particular emphasis on how it reliably delivers bytes between two applications.

32
00:03:09,000 --> 00:03:19,000
You learned how data errors and missing packets are detected, and how packets are retransmitted as well as several different retransmission strategies, including selective repeat and go back end.

33
00:03:19,000 --> 00:03:26,000
You learn about how the basic TCP mechanism is to go back end and keeps track of the outstanding unacknowledged bytes using a sliding window.

34
00:03:26,000 --> 00:03:32,000
You also learned about the TCP state machine that keeps track of the current status of the TCP connection.

35
00:03:32,000 --> 00:03:38,000
Three. You learned how UDP works, and why it's used by a small number of applications.

36
00:03:40,000 --> 00:03:49,000
Four. You learned how ICMP works, and how it helps us detect when communications go wrong to monitor the performance of a route between two end hosts.

37
00:03:49,000 --> 00:03:59,000
Finally, you learned about the end-to-end principle, which is an important overarching principle used in the design of the internet and many other communication systems.

38
00:03:59,000 --> 00:04:10,000
Throughout this class, and after you go out into the world to use your networking expertise, you'll find many people talking about this principle to help guide their design decisions.

39
00:04:10,000 --> 00:04:19,000
So you should now have a good understanding of three transport layers. You should understand different retransmission strategies, and why TCP uses a sliding window.

40
00:04:19,000 --> 00:04:30,000
You should know why TCP uses connections, how they are established, and the finite state machine that maintains them, and finally, you should be able to explain the end-to-end principle.

