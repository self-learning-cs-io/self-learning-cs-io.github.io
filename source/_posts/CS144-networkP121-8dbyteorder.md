---
title: CS144 NetworkP121 8dbyteorder
---

1
00:00:00,000 --> 00:00:05,520
So why does this matter? If two computers are going to communicate, they need to

2
00:00:05,520 --> 00:00:09,439
agree on whether the represent numbers using big, Indian or little, Indian formats.

3
00:00:09,439 --> 00:00:13,280
This is complicated by the fact that different processors use different

4
00:00:13,280 --> 00:00:19,519
Indian-ness. For example, X86 processors from Intel and AMD are little Indian, the least

5
00:00:19,519 --> 00:00:24,800
significant buy comes first. Armed processors and contrasts such as those used in the iPhone are big

6
00:00:24,800 --> 00:00:30,000
Indian where the most significant buy comes first. We don't want two computers to care

7
00:00:30,000 --> 00:00:35,120
or know whether the other side is big, Indian or little, Indian. So protocol specification bodies

8
00:00:35,120 --> 00:00:39,920
typically pick one and stick with it. For the internet, this means big, Indian. All protocols that

9
00:00:39,920 --> 00:00:46,159
are internet specifications use a big, Indian format. Here's an example snippet of C code that will

10
00:00:46,159 --> 00:00:50,719
tell you whether your computer is big, Indian or little, Indian. It takes X16 by value and

11
00:00:50,719 --> 00:00:54,799
casts up one or two it that lets the code look at the bytes individually. If the byte

12
00:00:54,799 --> 00:01:01,359
in index 0 is 0x40, this means the most significant buy comes first and the computer is big, Indian.

13
00:01:02,000 --> 00:01:08,400
If the byte in index 1 is 0x40, then it's little Indian. Wait, this creates a complication.

14
00:01:09,280 --> 00:01:14,079
You need an internet packet to be in big, Indian format, but what if your processor is little Indian?

15
00:01:14,079 --> 00:01:19,439
Let's say for example that you want to set the port number of TCP segment to be 80, the HTTP port.

16
00:01:19,439 --> 00:01:23,599
A simple way to do this might be to create a C-struct that has a field port at the right offset.

17
00:01:24,319 --> 00:01:30,560
If you use a value 80 to compare the port field, that 80 will be stored little Indian

18
00:01:30,560 --> 00:01:37,039
with 0x50 as the first byte. Big Indian needs 0x50 stored in the second byte. So although the

19
00:01:37,039 --> 00:01:44,400
port field in the segment is 80 and you have 80 as your value, this test will fail. To make this

20
00:01:44,400 --> 00:01:48,959
easier, see networking libraries provide utility functions that convert between hosting network order.

21
00:01:49,519 --> 00:01:56,799
The function h2ns for example takes a host short 16 bit value as a parameter and returns a value in

22
00:01:56,799 --> 00:02:03,120
network order. There's also functions for converting a network short to a host short and functions

23
00:02:03,120 --> 00:02:09,360
for longs 30-sew bit values. So the right way to test whether the packet port is 80 is to read the

24
00:02:09,360 --> 00:02:16,079
port field with packet structure and call N2HS to convert it from network order to height host order.

25
00:02:16,160 --> 00:02:21,360
You can then compare it with 80 and get the correct result. In the case of a little Indian

26
00:02:21,360 --> 00:02:26,560
architecture, N2HS and h2ns reverse the order of the two bytes. In the case of a big Indian

27
00:02:26,560 --> 00:02:32,320
architecture, architecture, they just return the value unchanged. These functions provide you the

28
00:02:32,320 --> 00:02:36,640
mechanisms by which you can write networking code that's independent of your processor architecture.

29
00:02:36,640 --> 00:02:42,480
But be careful. I can really can't stress this enough. Be careful whenever you handle network data.

30
00:02:43,119 --> 00:02:47,359
If you aren't principled and rigorous about when you translate between hosting network order,

31
00:02:47,359 --> 00:02:51,359
you'll give yourself a tremendous headache because you've forgotten to convert or have

32
00:02:51,359 --> 00:02:55,280
invented, inadvertently converted twice and suddenly your protocol is behaving wrongly or

33
00:02:55,280 --> 00:03:00,319
triggering all kinds of weird bugs. I've certainly done this many times and so you want to avoid it

34
00:03:00,319 --> 00:03:06,079
as much as you can. Now that we know internet specifications lay out multi-bite values in

35
00:03:06,079 --> 00:03:11,039
network order or big Indian, we can look at how internet specifications describe their packet formats.

36
00:03:11,840 --> 00:03:17,599
For historical reasons, internet specifications are written in plain ASCII text. The block on the

37
00:03:17,599 --> 00:03:24,399
text on the left is taken verbatim from Request for Commons RFC 791, which specifies the internet

38
00:03:24,399 --> 00:03:31,759
protocol version 4 or IPv4. The top shows the bits from 0 to 31. Packets are written 4 bytes wide.

39
00:03:32,399 --> 00:03:38,799
Since IPv4 has five rows of required fields, this means that an IPv4 header is at least 20 bytes long.

40
00:03:39,439 --> 00:03:43,040
Nick and I often use a simpler visual format when we show packets like the one on the right.

41
00:03:44,320 --> 00:03:50,719
To use this as an example, the total length field of an IPv4 packet is 2 bytes or 16 bits long.

42
00:03:50,719 --> 00:03:57,120
You can see in the upper right. This means that an IPv4 packet can't be longer than 65,535 bytes.

43
00:03:57,920 --> 00:04:04,400
That field in the packet is stored big Indian. A packet length of 1400 bytes is stored at 0x, 5,

44
00:04:04,400 --> 00:04:11,120
7, 8. So the third byte of an IP packet of that length is 0x, 0, 5. Let's see this in Warrowshark.

45
00:04:11,520 --> 00:04:16,720
I'm just going to start Warrowshark and listen for packets. This first packet is for someone

46
00:04:16,720 --> 00:04:21,519
called TLS, a Transport Layer Security. It will web browsers use for secure connections,

47
00:04:21,519 --> 00:04:28,079
HTTPS. TLS hides the date of the packet from us, but we can still see its headers. Using Warrowshark,

48
00:04:28,079 --> 00:04:33,920
we can see that a TLS payload is inside a TCP segment to port 443, the standard TLS port.

49
00:04:34,479 --> 00:04:40,560
This TCP segment is inside an IPv4 header. Looking in detail at the IPv4 header,

50
00:04:40,560 --> 00:04:49,279
we can see that the packet's total length field is 1,230. The hexadecimal for 1230 is 0x, 0,4CE,

51
00:04:50,000 --> 00:04:59,199
1024 or 4x256 plus 106 or 0xCE. At the bottom, Warrowshark shows us the actual bytes of the packet,

52
00:04:59,279 --> 00:05:04,000
and there it is, 0,4CE, in Big Andian, our network order.

53
00:05:05,199 --> 00:05:09,199
You've seen how different processors lay out numbers differently, but since network particles

54
00:05:09,199 --> 00:05:13,680
need to agree, particles specifications decide how the numbers are laid out in their packets,

55
00:05:13,680 --> 00:05:16,719
which can differ from your processor. To help you with this,

56
00:05:16,719 --> 00:05:20,000
scene networking libraries provide helper functions that convert between hosts and network

57
00:05:20,000 --> 00:05:25,599
order, but use them carefully. Using them have hazardly can easily lead you to many lost

58
00:05:25,600 --> 00:05:29,240
stars of debugging which can be prevented by being careful when you start and deciding

59
00:05:29,240 --> 00:05:31,480
on a principled approach to converting in your code.

