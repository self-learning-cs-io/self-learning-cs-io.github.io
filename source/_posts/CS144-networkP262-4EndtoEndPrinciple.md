---
title: CS144 NetworkP262 4EndtoEndPrinciple
---

1
00:00:00,000 --> 00:00:05,000
The end to end principle holds a very special place in the design of the internet.

2
00:00:05,000 --> 00:00:10,000
This is because it really refers to two different principles, the first deals with correctness.

3
00:00:10,000 --> 00:00:15,000
If you don't follow the end to end principle when you design your network system, then chances are it has a flaw,

4
00:00:15,000 --> 00:00:17,000
a might transfer data incorrectly.

5
00:00:17,000 --> 00:00:23,000
The second, which we call the strong end to end principle, is much broader and general.

6
00:00:23,000 --> 00:00:27,000
So let's say we want to transfer a file from one computer to another.

7
00:00:27,000 --> 00:00:31,000
Our application opens a connection between A and B.

8
00:00:31,000 --> 00:00:37,000
It reads a file on computer A and writes it to the TCP connection.

9
00:00:37,000 --> 00:00:43,000
B reads the data from the socket and writes the data to a file on computer B.

10
00:00:43,000 --> 00:00:47,000
The network in this case does very little. It just forwards packets from A to B.

11
00:00:47,000 --> 00:00:52,000
A and B set up the connection and the application reads and writes the data.

12
00:00:52,000 --> 00:00:55,000
Why doesn't the network do more?

13
00:00:55,000 --> 00:00:59,000
It turns out there are a lot of things it could do to make the file transfer faster.

14
00:00:59,000 --> 00:01:03,000
The network could automatically compress packets between A and B.

15
00:01:03,000 --> 00:01:08,000
If the file is plain English text, this could reduce the transfer size tenfold.

16
00:01:08,000 --> 00:01:12,000
The network could reformat or improve requests.

17
00:01:12,000 --> 00:01:15,000
Let's say A wants to transfer two files to B.

18
00:01:15,000 --> 00:01:19,000
The network could see this and combine the two transfers into a singular request.

19
00:01:19,000 --> 00:01:26,000
Or it could be the A's files already stored on another computer C that's closer and faster to B than A is.

20
00:01:26,000 --> 00:01:31,000
The network could transfer the file from C rather than A.

21
00:01:31,000 --> 00:01:35,000
Or the network could automatically add security, encrypting the data so bad guys can read the file.

22
00:01:35,000 --> 00:01:40,000
If the network does this for us, then we don't have to worry about it in our application.

23
00:01:40,000 --> 00:01:45,000
The network could add mobility support, such that computer A moves through a network,

24
00:01:45,000 --> 00:01:48,000
and it could automatically update and packets continue to flow to it.

25
00:01:48,000 --> 00:01:52,000
With the support, we could even possibly migrate connections across the network,

26
00:01:52,000 --> 00:01:56,000
moving something like a Skype video stream from our phone to our laptop.

27
00:01:56,000 --> 00:02:02,000
It turns out that there are many things the network could do to improve our application and make designing it easier.

28
00:02:02,000 --> 00:02:06,000
But generally speaking, it doesn't. Why?

29
00:02:06,000 --> 00:02:09,000
The reason is the end-to-end principle.

30
00:02:09,000 --> 00:02:14,000
The end-to-end principle was first described by Salsa Read & Clock in a 1984 paper.

31
00:02:14,000 --> 00:02:18,000
You'll meet David Clark later in the course when he gives a guest lecture.

32
00:02:18,000 --> 00:02:23,000
The end-to-end principle, as they describe it, is shown here.

33
00:02:23,000 --> 00:02:30,000
The function in question can completely and correctly be implemented only with the knowledge and help of the application,

34
00:02:30,000 --> 00:02:33,000
standing at the end points of the communication system.

35
00:02:33,000 --> 00:02:40,000
Therefore, providing that question function as a feature of the communication itself is not possible.

36
00:02:40,000 --> 00:02:46,000
Sometimes, an incomplete version of the function provided by the communication system may be useful as a performance enhancement.

37
00:02:46,000 --> 00:02:51,000
We call this line of reasoning the end-to-end argument.

38
00:02:51,000 --> 00:02:56,000
Put another way. The network could possibly do all kinds of things to help.

39
00:02:56,000 --> 00:02:58,000
But that's all it can do. Help.

40
00:02:58,000 --> 00:03:04,000
If the system is going to work correctly, then the end points need to be responsible for making sure it does.

41
00:03:04,000 --> 00:03:07,000
Nobody else has the information necessary to do this correctly.

42
00:03:07,000 --> 00:03:10,000
The network can help you, but you can't depend on it.

43
00:03:10,000 --> 00:03:17,000
For example, if you want to be sure your application is secure, you need to have end-to-end security implemented in the application.

44
00:03:17,000 --> 00:03:23,000
The network might add additional security, but end-to-end security can only be correctly done by the application itself.

45
00:03:23,000 --> 00:03:30,000
So making security a feature of the network so that applications don't have to worry about it is not possible.

46
00:03:31,000 --> 00:03:36,000
Let's go back to our example of transferring a file between two computers.

47
00:03:36,000 --> 00:03:43,000
It would be this exact problem, along with others, that let's seltzer-clock and read to formulate the end-to-end argument.

48
00:03:43,000 --> 00:03:47,000
You want to make sure the file arrives completely and uncorrupted.

49
00:03:47,000 --> 00:03:51,000
The file data is going to pass through several computers between the source and the destination.

50
00:03:51,000 --> 00:03:58,000
So the file, coming from the source, passes through computers c, d and e before arriving at the destination.

51
00:03:58,000 --> 00:04:05,000
Each link, source to c, c to d, d to e, and e to destination, has a row detection.

52
00:04:05,000 --> 00:04:11,000
If a packet of data is corrupted in transmission, then the recipient can detect this and reject the packet.

53
00:04:11,000 --> 00:04:17,000
The sender will figure out the packet didn't arrive successfully, for example, through TCP acknowledgments and rescind it.

54
00:04:17,000 --> 00:04:23,000
Now one could say, look, I know the packet won't be corrupted on any link because I have my checks.

55
00:04:24,000 --> 00:04:28,000
Since it won't be corrupted on any link, it won't be corrupted at all.

56
00:04:28,000 --> 00:04:34,000
Therefore, if it arrives successfully at the destination, there's no corruption, and the file has arrived successfully.

57
00:04:34,000 --> 00:04:43,000
This is exactly what some programmers at MIT did. Since the network provided error detection, they assumed it would detect all errors.

58
00:04:43,000 --> 00:04:50,000
This assumption turned out to be wrong, and because of this mistake, the developers ended up losing a lot of their source code.

59
00:04:50,000 --> 00:04:59,000
This is what happened. One of the computers on the transfer path, let's say computer d, had buggy memory, such that sometimes some bits would be flipped.

60
00:04:59,000 --> 00:05:04,000
D received packets of data, checked them, and found them correct.

61
00:05:04,000 --> 00:05:09,000
It would then move them into main memory, at which point they would become corrupted.

62
00:05:09,000 --> 00:05:19,000
D would then forward the packet, but because error detection occurs in the link, from the links perspective, the packet looked like a packet of data.

63
00:05:19,000 --> 00:05:30,000
The packet looked fine, and it would pass east check. The link error detection was designed for errors in transmission, not errors in storage.

64
00:05:30,000 --> 00:05:38,000
The only way to flip the next top, wireless links can sometimes be more like 50% or 80%.

65
00:05:38,000 --> 00:05:42,000
And it turns out TCP doesn't work well when you have lower reliability.

66
00:05:42,000 --> 00:05:47,000
So wireless link layers improve their reliability by retransmitting at the link layer.

67
00:05:47,000 --> 00:05:59,000
When your laptop sends a packet to an access point, if the access point receives the packet, it immediately, just a few microseconds later, sends a link layer acknowledgement to tell your laptop the packet was received successfully.

68
00:05:59,000 --> 00:06:06,000
If the laptop doesn't receive a link layer acknowledgement, it retransmits. It does this several times.

69
00:06:07,000 --> 00:06:18,000
Using these link layer acknowledgments can boost a poor link, would say only 80% reliability to 99% are higher. This lets TCP work much better.

70
00:06:18,000 --> 00:06:24,000
TCP will work correctly. It will reliably transfer data without this link layer help.

71
00:06:24,000 --> 00:06:28,000
But the link layer help greatly improves TCP's performance.

72
00:06:29,000 --> 00:06:35,000
So that's the end-end principle. For something to work correctly, it has to be done end-to-end.

73
00:06:35,000 --> 00:06:42,000
You can do stuff in the middle to help us perform its improvements, but if you don't rely on end-to-end, then at some point it will break.

74
00:06:45,000 --> 00:06:52,000
There's a second version of the end-to-end principle described in the IETF request for comments number 1958.

75
00:06:52,000 --> 00:06:55,000
The architectural principles of the internet.

76
00:06:55,000 --> 00:06:58,000
We call it the strong end-to-end principle, and it says,

77
00:06:58,000 --> 00:07:03,000
The network's job is to transmit data grams as efficiently and flexibly as possible.

78
00:07:03,000 --> 00:07:06,000
Everything else should be done at the fringes.

79
00:07:06,000 --> 00:07:09,000
This end-to-end principle is stronger than the first one.

80
00:07:09,000 --> 00:07:16,000
The first one said that you have to implement something end-to-end at the fringes, but that you can also implement it in the middle for performance improvements.

81
00:07:16,000 --> 00:07:22,000
This principle says to not implement it in the middle, only implement it at the fringes.

82
00:07:23,000 --> 00:07:27,000
The reasoning for the strong principle is flexibility and simplicity.

83
00:07:27,000 --> 00:07:34,000
If the network implements a piece of functionality to try to help the end-points, then it is assuming what the end-points do.

84
00:07:34,000 --> 00:07:45,000
For example, when a wireless link layer uses retransmissions to improve reliability so TCP can work better, it's assuming that the increased latency of the retransmissions is worth the reliability.

85
00:07:45,000 --> 00:07:51,000
This isn't always true. There are protocols other than TCP where reliability isn't so important,

86
00:07:51,000 --> 00:07:55,000
which might rather send a new different packet than retry sending an old one.

87
00:07:55,000 --> 00:08:01,000
But because the link layer is incorporated improved reliability, these other protocols are stuck with it.

88
00:08:01,000 --> 00:08:05,000
This can and does act as an impediment to an innovation and progress.

89
00:08:05,000 --> 00:08:13,000
As the layers start to add optimizations assuming what the layers above and below them do, it becomes harder and harder to redesign the layers.

90
00:08:13,000 --> 00:08:18,000
In the case of Wi-Fi, it's a link layer that assumes certain behavior at the network and transport layers.

91
00:08:18,000 --> 00:08:24,000
If you invent a new transport or network layer, it's likely going to assume how Wi-Fi behaves so it can perform well.

92
00:08:24,000 --> 00:08:30,000
In this way, the network design becomes calcified and ossified and really hard to change.

93
00:08:30,000 --> 00:08:37,000
In terms of long-term design and network evolution, the strong end-to-end argument is tremendously valuable.

94
00:08:37,000 --> 00:08:43,000
The tension is that in terms of short-term design and performance, network engineers and operators often don't follow it.

95
00:08:43,000 --> 00:08:48,000
So over time, the network performs better and better, but becomes harder and harder to change.

