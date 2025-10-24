---
title: CS144 NetworkP1258 6gConfidentiality
---

1
00:00:00,000 --> 00:00:04,000
So let's suppose we have a good block cipher.

2
00:00:04,000 --> 00:00:05,000
How do we use it?

3
00:00:05,000 --> 00:00:11,000
Messages are typically longer than 164 or 128-bit block.

4
00:00:11,000 --> 00:00:15,000
One straight forward approach is something called ECB or electronic codebook mode.

5
00:00:15,000 --> 00:00:16,000
This is simple.

6
00:00:16,000 --> 00:00:21,000
We take our message M and break it into blocks, M1 and M2 and M3 and M4.

7
00:00:21,000 --> 00:00:28,000
We encrypt each one individually, so M1 becomes C1, M2 becomes C2, etc.

8
00:00:28,000 --> 00:00:34,000
This is fast because we can do them all in parallel, something great on modern multi-car processors.

9
00:00:34,000 --> 00:00:40,000
Assuming that our encryption algorithm is secure, then an adversary can't decrypt any block and so our message is secure.

10
00:00:40,000 --> 00:00:45,000
Furthermore, we can reuse our keys since every blocking encrypted with the cipher will be sure.

11
00:00:45,000 --> 00:00:46,000
We'll be secure.

12
00:00:46,000 --> 00:00:51,000
Simple, fast and secure.

13
00:00:51,000 --> 00:00:54,000
Nope, it's not secure at all.

14
00:00:54,000 --> 00:00:59,000
Using electronic codebook mode, an attacker will learn repeated plaintext blocks.

15
00:00:59,000 --> 00:01:05,000
Since encryption is deterministic, then if M1 equals M2, C1 will equal C2.

16
00:01:05,000 --> 00:01:09,000
For example, if we're transmitting a sparse file, this is really bad.

17
00:01:09,000 --> 00:01:13,000
An adversary can see where the non-zero regions of the file are.

18
00:01:13,000 --> 00:01:17,000
Here's a visual example of the problem using an image of talks.

19
00:01:17,000 --> 00:01:22,000
The center image shows the result of encrypting the image on the left with ECB.

20
00:01:22,000 --> 00:01:28,000
Identical regions of the image, such as the white space, show up identically, and you can see a general outline of talks.

21
00:01:28,000 --> 00:01:37,000
The image on the right is more like what we want, or there's no pattern and an adversary can't learn anything from the cipher text.

22
00:01:42,000 --> 00:01:49,000
One way to achieve this desired degree of confidentiality is cipher block chaining or CBC mode.

23
00:01:49,000 --> 00:01:56,000
In CBC mode, you choose an initialization vector iV, the same size of the block.

24
00:01:56,000 --> 00:02:03,000
You XOR M1 with this initialization vector, and encrypt the result of that to produce C1.

25
00:02:03,000 --> 00:02:11,000
You then take C1 and XOR with M2 before encrypting it to produce C2.

26
00:02:11,000 --> 00:02:15,000
If you want to use a key to encrypt only one message, then iV can be zero.

27
00:02:15,000 --> 00:02:20,000
The basic tanger is that you don't want to reuse an initialization vector.

28
00:02:20,000 --> 00:02:22,000
Suppose you do.

29
00:02:22,000 --> 00:02:27,000
So you set iV to be zero for one message, then reuse an iV of zero for a second message.

30
00:02:27,000 --> 00:02:35,000
If the plain text are identical, then the cipher text will be identical, and you've leaked information to the adversary.

31
00:02:36,000 --> 00:02:45,000
If we use cBC mode on the text image, on the text image, and we end up computing a cipher text on the right, so problem solved.

32
00:02:45,000 --> 00:02:55,000
But again, for this to work across multiple messages and remain secure, you need to be careful about how you pick and use initialization vectors.

33
00:02:56,000 --> 00:03:02,000
Electronic codebook mode, cipher block chaining mode are just two ways to use block ciphers.

34
00:03:02,000 --> 00:03:06,000
There are many more with different properties, strengths, and weaknesses.

35
00:03:06,000 --> 00:03:11,000
Cipher feedback mode, for example, XORs the message with an encryption of the prior cipher text.

36
00:03:11,000 --> 00:03:17,000
This is useful if the message isn't the multiple of the block size and you don't want to pat it with zeros.

37
00:03:17,000 --> 00:03:23,000
In ECB and CBC mode, you pass the message block to encrypt, then you can't trim the cipher text.

38
00:03:24,000 --> 00:03:31,000
Or there's output feedback mode where you're repeatedly encrypt the initialization vector and use it like a stream cipher.

39
00:03:31,000 --> 00:03:36,000
Or counter mode where you encrypt incrementing values of the key in XOR than with message blocks.

40
00:03:36,000 --> 00:03:46,000
This is easily easily parallelizable, but means that you can only use a key for one message and let's you do something smart with the value i.

41
00:03:46,000 --> 00:03:48,000
So let's do one final quiz.

42
00:03:48,000 --> 00:03:53,000
Suppose we have a shared secret key which only you and the other party know.

43
00:03:53,000 --> 00:03:59,000
You encrypt your messages with a good cipher using cbc mode and transmit those messages over a network.

44
00:03:59,000 --> 00:04:01,000
Are these messages secure?

