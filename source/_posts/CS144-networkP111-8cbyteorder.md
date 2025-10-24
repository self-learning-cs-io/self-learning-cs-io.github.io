---
title: CS144 NetworkP111 8cbyteorder
---

1
00:00:00,000 --> 00:00:08,640
53 is represented in little Indian. 53 is 3 times 16 plus 5 and so 0x35, the least

2
00:00:08,640 --> 00:00:16,539
significant bite, is in the first bite, so it's little Indian. 4,116 is big

3
00:00:16,539 --> 00:00:29,000
Indian. 4,116 is equal to 4,096 plus 20. So the two bites are 0x10, 4,096 and 0x14 for 20.

4
00:00:29,000 --> 00:00:35,759
With 0x10 being the bite representing the more significant bits, those are 4,096. So the

5
00:00:35,759 --> 00:00:43,280
hexadecimal 0x1014, this means the most significant bite, 0x10, comes first and it's

6
00:00:43,280 --> 00:00:48,879
big Indian. 5 is big Indian. The least significant bite is last and has the highest

7
00:00:48,879 --> 00:00:57,320
address. 83,886 and 80, it's little Indian. It's 5 times 2 to the 24th. So this means that

8
00:00:57,320 --> 00:01:08,280
0x05 is the most significant bite. Finally, 305 million, 414,945 is little Indian.

9
00:01:08,280 --> 00:01:12,620
Rather than try to figure out all the digits on this one, I've looked at the least

10
00:01:12,620 --> 00:01:18,439
significant bit. The least significant bit is either part of 0x21 at the lowest

11
00:01:18,439 --> 00:01:24,760
address or 0x12 at the highest address. If it's 0x21, then the least significant bit

12
00:01:25,120 --> 00:01:31,120
is 0 and the number is even. Since 305 million, 414,945 is odd, this means 0x21 is the least

13
00:01:31,120 --> 00:01:45,100
significant bite and the number is being stored in Indian because this is at the lowest memory

14
00:01:45,100 --> 00:01:45,600
address.

