---
title: CS144 NetworkP1318 10bTLS
---

1
00:00:00,000 --> 00:00:11,759
So, TLS random values are 32 bytes long. There's a 4 byte timestamp and 28 bytes of randomness.

2
00:00:11,759 --> 00:00:20,120
The premaster secret is 48 bytes long, 2 bytes of protocol version and 46 bytes of randomness.

3
00:00:20,120 --> 00:00:27,080
Suppose your TLS session uses these to generate 1,024 bytes of keys.

4
00:00:27,079 --> 00:00:33,239
One of the maximum number of tries in an adversary might have to make to crack the session keys,

5
00:00:33,239 --> 00:00:36,239
assume an exhaustive attack.

6
00:00:36,239 --> 00:00:41,719
Assume the adversary can correctly compute the output of a pseudo random function from its input.

7
00:00:41,719 --> 00:00:46,840
So they can see the random function, they can see the random values, they don't see the premaster secret,

8
00:00:46,840 --> 00:00:50,560
and they can compute the pseudo random functions.

9
00:00:50,560 --> 00:00:56,560
Write your answers the base 2 exponent. For example, if you would take 2 to 31 tries, then write 31.

10
00:00:57,079 --> 00:01:02,159
...

11
00:01:02,659 --> 00:01:03,420
The answer is-

