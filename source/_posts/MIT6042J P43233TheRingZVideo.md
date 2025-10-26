---
title: MIT6042J P43233TheRingZVideo
---

1
00:00:00,000 --> 00:00:05,080
Another way to talk about congruence and remainder arithmetic is to work strictly with

2
00:00:05,080 --> 00:00:08,359
remainders, which makes things a little simpler because you don't have to worry

3
00:00:08,359 --> 00:00:11,880
about the fact that the product of two remainders may, for example, be too big to

4
00:00:11,880 --> 00:00:15,599
be remainder, to knock it back in range. You have to take the remainder again. And

5
00:00:15,599 --> 00:00:21,800
that's what this abstract idea of the ring of integers, modulo n, the ring z sub n,

6
00:00:21,800 --> 00:00:27,039
captures in a quite elegant way. So it's going to allow us to talk strictly about

7
00:00:27,039 --> 00:00:34,159
equality instead of congruence. And let's remind ourselves that the basic idea behind

8
00:00:34,159 --> 00:00:40,119
working with a remainder arithmetic was that every time we got a number that was too big

9
00:00:40,119 --> 00:00:45,759
to be a remainder, we just hit it with the remainder operation again to bring it back in range.

10
00:00:45,759 --> 00:00:53,000
And so the operations in z n work exactly that way. The elements of z n are the remainders.

11
00:00:53,000 --> 00:00:58,240
That is, the numbers from 0, including 0, up to n, but not including n. So there are

12
00:00:58,240 --> 00:01:04,280
n of them from 0, 1, up to n minus 1. And the definitions of the operations in z n are

13
00:01:04,280 --> 00:01:09,240
given right here. Addition just means take the sum, but then take the remainder immediately

14
00:01:09,240 --> 00:01:15,200
and just in case it's too big. And likewise, the product in z n is simply multiply them

15
00:01:15,200 --> 00:01:21,640
and take the remainder. This isn't really a very dramatic idea, but it turns out to pay

16
00:01:21,640 --> 00:01:25,879
off in making some things just a little bit easier to say, because we're talking about

17
00:01:25,879 --> 00:01:32,640
equality instead of congruence. So this package together, this mathematical structure, consisting

18
00:01:32,640 --> 00:01:37,519
of the integers in this interval, remember this notation, square bracket means inclusive

19
00:01:37,519 --> 00:01:43,560
and round parenthesis means exclusive. So this includes 0 and doesn't include n. The integers

20
00:01:43,560 --> 00:01:51,519
in that interval under the operations of plus and times modulo z n, as defined here, is

21
00:01:51,519 --> 00:01:57,439
called the ring of integers z n. So it's got two operations and a bunch of things that

22
00:01:57,439 --> 00:02:04,319
are operated on. Now, I guess it's worth highlighting. That's what z n is. The ring of integers

23
00:02:04,319 --> 00:02:10,000
mod n or modulo n. Now arithmetic in z n is really just

