---
title: CS144 NetworkP91 8abyteorder
---

1
00:00:00,000 --> 00:00:04,000
For two parties to communicate, they need to agree on the message they exchange.

2
00:00:04,000 --> 00:00:08,000
If one party assumes messages are in Spanish, and the other assumes they're in Cambodian,

3
00:00:08,000 --> 00:00:12,000
they will not be able to communicate. For computers, this means agreeing on what

4
00:00:12,000 --> 00:00:16,000
fields messages have, how they are arranged and formatted, and how they are represented.

5
00:00:16,000 --> 00:00:20,000
To generate a message to send, a software typically has to create a copy of it in memory

6
00:00:20,000 --> 00:00:24,000
which then passes to the networking card. Similarly, when a computer receives a message,

7
00:00:24,000 --> 00:00:28,000
the networking card puts that message in memory, which the software can then access.

8
00:00:28,000 --> 00:00:32,000
Understanding how this works and some of the pitfalls you can encounter is important

9
00:00:32,000 --> 00:00:36,000
if you want to understand network protocols and right network protocol software.

10
00:00:36,000 --> 00:00:40,000
So let's start with a simple model of computer memory.

11
00:00:40,000 --> 00:00:44,000
In most computers today, memory is organized in terms of bytes, eight-bit chunks of memory.

12
00:00:44,000 --> 00:00:48,000
A program has an address space starting at address 0.

13
00:00:48,000 --> 00:00:52,000
Most computers today are 64 bits. This means that memory addresses are 64 bits long

14
00:00:52,000 --> 00:00:56,000
so computers up to 2 to the 64 bytes or 186-tillion bytes.

15
00:00:56,000 --> 00:01:00,000
In practice, computers today do not have this much memory. They have gigabytes,

16
00:01:00,000 --> 00:01:04,000
which is 2 to the 30th. In this example, our computer is 8 gigabytes of memory,

17
00:01:04,000 --> 00:01:10,000
showing the left. So its largest address in the, is the hexadecimal value shown of 0x, 02,

18
00:01:10,000 --> 00:01:18,000
0, 0, 0, 0, 0, 0, 0, 0. Software can access each byte of this memory or access

19
00:01:18,000 --> 00:01:24,000
byte in groups, such as loading a 64-bit integer from 8 continuous bytes also of memory in a single instruction.

20
00:01:24,000 --> 00:01:28,000
But how does a computer represent a multi-bite value?

21
00:01:28,000 --> 00:01:36,000
Let's say we want to represent the number 1024, which in hexadecimal 0x, 0, 4, 0, 0, or 4 times 256.

22
00:01:36,000 --> 00:01:42,000
This value requires 16 bits or 2 bytes, which by comes first, 0x, 0, 0, or 0x, 0, 4.

23
00:01:42,000 --> 00:01:48,000
How you lay out a multi-bite value in memory is called endianness, and there are two options.

24
00:01:48,000 --> 00:01:52,000
In little endian, the least significant byte is at the lowest address.

25
00:01:52,000 --> 00:01:56,000
So the least significant byte comes first in memory.

26
00:01:56,000 --> 00:02:00,000
It turns out that from a computational architectural standpoint, this can make the most sense.

27
00:02:00,000 --> 00:02:06,000
The other option is a big endian, where the most significant byte is the lowest address.

28
00:02:06,000 --> 00:02:12,000
Big endian makes more sense to a human reader reading left to right, because it's how we write numbers with the most significant digits first.

