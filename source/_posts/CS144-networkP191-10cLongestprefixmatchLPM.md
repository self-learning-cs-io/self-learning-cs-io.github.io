---
title: CS144 NetworkP191 10cLongestprefixmatchLPM
---

1
00:00:00,000 --> 00:00:05,000
The answer for 63.19.5.3 is link 3.

2
00:00:05,000 --> 00:00:12,000
63.19.5.3 matches two prefixes, the default route and prefix 63.19.5.0.

3
00:00:12,000 --> 00:00:18,000
The prefix is 30 bits long and 63.19.5.3 differs in only the last two bits.

4
00:00:18,000 --> 00:00:23,000
Flash 30 is a longer prefix than slash 0 so the router will pick link 3.

5
00:00:23,000 --> 00:00:29,000
The answer for B, 171.15.15.0 is link 4.

6
00:00:29,000 --> 00:00:32,000
B matches three entries.

7
00:00:32,000 --> 00:00:41,000
It matches the default route 171.0.0.0.0.0.8 and 171.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.

8
00:00:41,000 --> 00:00:46,000
It does not match 171.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.

9
00:00:46,000 --> 00:00:49,000
because B's second octet is 15.

10
00:00:49,000 --> 00:00:50,000
Not 0.

11
00:00:50,000 --> 00:00:56,000
The third match 171.0.0.0.0 is the slash 10 is the longest prefix, 10 bits,

12
00:00:56,000 --> 00:00:59,280
so the router sends the packet along Link 4.

13
00:00:59,280 --> 00:01:03,560
The answer for C, 63.19.5.32 is Link 1.

14
00:01:03,560 --> 00:01:06,319
The longest prefix matches the default route.

15
00:01:06,319 --> 00:01:11,719
It does not match 63.19.5.0 because it differs from the 26th bit.

16
00:01:11,719 --> 00:01:16,000
The answer for D, 44.199.230.1 is Link 1.

17
00:01:16,000 --> 00:01:19,480
The longest prefix match is the default route.

18
00:01:19,480 --> 00:01:24,519
The answer for E, 171.128.16.0 is Link 2.

19
00:01:24,519 --> 00:01:31,039
This address matches 2 prefixes, the default route and 171.0.0.0.0.0.8.

20
00:01:31,039 --> 00:01:36,399
It does not match 171.0.0.0.0.0.0.0 because it differs from the 9th bit.

21
00:01:36,399 --> 00:01:42,759
171.0.0.0.0.0.0 is the longest prefix, so the router will forward this packet on Link 2.

