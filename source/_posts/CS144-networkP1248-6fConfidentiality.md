---
title: CS144 NetworkP1248 6fConfidentiality
---

1
00:00:00,000 --> 00:00:06,600
So the answer is A, 0x, eb, eb, 0, 0, 27.

2
00:00:06,600 --> 00:00:11,460
Look at the path that L0 takes through the network.

3
00:00:11,460 --> 00:00:17,760
R2 is equal to L0, XOR with P1.

4
00:00:17,760 --> 00:00:21,359
Since we know L0, the first plain text is all zeros.

5
00:00:21,359 --> 00:00:27,400
This means that P1 is equal to R2, or 0x, 7b, 7, 7,

6
00:00:27,399 --> 00:00:30,000
dc8, 2.

7
00:00:30,000 --> 00:00:34,920
Since we know P1, we can then compute L0 of the second plain text

8
00:00:34,920 --> 00:00:38,600
by XORing.

9
00:00:38,600 --> 00:00:41,719
It's R2 with the second with the key.

10
00:00:41,719 --> 00:00:50,879
If you XOR, 0x, 7b, 7, 7, dc8, 2 with 0x, 0dc, dc8, 5,

11
00:00:50,880 --> 00:00:58,160
you obtain 0x, eb, a, b, 0, 0, 27.

12
00:00:58,160 --> 00:00:59,480
If you didn't want to do the full XOR,

13
00:00:59,480 --> 00:01:01,359
you could just look at the bottom byte.

14
00:01:01,359 --> 00:01:05,359
A2, XOR with 85, is 27.

15
00:01:05,359 --> 00:01:08,560
Whereas 2, XOR, because 2, XOR with 5, is 7,

16
00:01:08,560 --> 00:01:10,079
and A, XOR with 8, is 2.

