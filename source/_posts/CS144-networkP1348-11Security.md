---
title: CS144 NetworkP1348 11Security
---

1
00:00:00,000 --> 00:00:07,000
In this unit, you learned about network security and just how dangerous the internet can be.

2
00:00:07,000 --> 00:00:12,000
You learn that when thinking about security, this is the model you should assume.

3
00:00:12,000 --> 00:00:17,000
The network is not your friend. It's controlled by the adversary.

4
00:00:17,000 --> 00:00:22,000
Specifically, an adversary can eavesdrop on anything you transmit.

5
00:00:22,000 --> 00:00:25,000
An adversary can tamper with and rewrite your messages.

6
00:00:25,000 --> 00:00:29,000
An adversary can suppress messages you send so they don't arrive.

7
00:00:29,000 --> 00:00:33,000
An adversary can spoof someone or else are you.

8
00:00:33,000 --> 00:00:35,000
An adversary can act as a man in the middle.

9
00:00:35,000 --> 00:00:38,000
An interceptor traffic before passing an arm.

10
00:00:38,000 --> 00:00:43,000
An adversary can redirect or hijack communication at layer 2 through Ethernet mechanisms.

11
00:00:43,000 --> 00:00:46,000
It'll layer 3 through ICMP or other protocols.

12
00:00:46,000 --> 00:00:50,000
And it'll layer 4 by injecting new segments into a TCP stream.

13
00:00:50,000 --> 00:00:56,000
Many mechanisms designed with the best of intentions turn out to be powerful weapons in the hands of an adversary,

14
00:00:56,000 --> 00:01:02,000
both for accessing your data and for denying access to network systems.

15
00:01:02,000 --> 00:01:04,000
But there's hope.

16
00:01:04,000 --> 00:01:11,000
You learn that three basic security principles can empower you to build secure systems even in the face of such attacks.

17
00:01:11,000 --> 00:01:17,000
The first, confidentiality, lets you communicate secretly even if someone else can read your messages.

18
00:01:17,000 --> 00:01:25,000
Using confidentiality, you can communicate with another party over an untrusted network and be confident that no one else can read your traffic.

19
00:01:25,000 --> 00:01:30,000
Or at the very least, it's computationally intractable for someone to read your traffic.

20
00:01:30,000 --> 00:01:32,000
The second principle is integrity.

21
00:01:32,000 --> 00:01:36,000
Integrity lets you be sure that no one has tampered with your data along the way.

22
00:01:36,000 --> 00:01:44,000
You learn about cryptographic mechanisms that let you very inexpensively verify that a piece of data hasn't been changed.

23
00:01:44,000 --> 00:01:47,000
The third principle is authenticity.

24
00:01:47,000 --> 00:01:51,000
With authenticity, you can be sure that the other party has a secret.

25
00:01:51,000 --> 00:01:57,000
This can be a secret you've shared beforehand or a secret that they can prove they have.

26
00:01:57,000 --> 00:02:08,000
You of course can't be sure who the other party is, but you can at least be sure that they have a secret that only one, only someone else you trust has.

27
00:02:08,000 --> 00:02:14,000
Practically speaking, you also learn a whole bunch of security tools that can achieve these principles.

28
00:02:14,000 --> 00:02:18,000
You learn about symmetric cryptography where two part is share a secret.

29
00:02:18,000 --> 00:02:22,000
You learn about block ciphers which transform fixed blocks of data.

30
00:02:22,000 --> 00:02:29,000
You learn about the dangers of electronic code book mode and how cipher block training mode solves them.

31
00:02:29,000 --> 00:02:32,000
You also learn about cryptographic hashes.

32
00:02:32,000 --> 00:02:40,000
They have the wonderful property that they are easy to compute, but it will be intractable for an attacker to generate an input which would compute to a specific hash value.

33
00:02:40,000 --> 00:02:45,000
So if someone tells you the hash value of your software, you can check it's correct.

34
00:02:45,000 --> 00:02:49,000
It's nearly impossible for someone to create a new piece of software that has the same hash value.

35
00:02:49,000 --> 00:02:53,000
This is called collision resistance.

36
00:02:53,000 --> 00:03:00,000
You learn how you can combine cryptographic hashes with a shared secret to generate a message authentication code or MAC.

37
00:03:00,000 --> 00:03:06,000
With a MAC, you can be sure that no one else has tampered with the message and that its sender has the secret.

38
00:03:06,000 --> 00:03:12,000
Simple ways of generating a MAC are fraught with peril, so you should be very careful.

39
00:03:12,000 --> 00:03:15,000
But how do we learn these secrets?

40
00:03:15,000 --> 00:03:23,000
You learn about a different kind of cryptographic system than symmetric cryptography called public key cryptography.

41
00:03:23,000 --> 00:03:28,000
With public key cryptography, there are two keys, one public and one private.

42
00:03:28,000 --> 00:03:33,000
Information encrypted with a public key can only be decrypted with the private key.

43
00:03:33,000 --> 00:03:39,000
So you can share your public key freely and everyone else can send you encrypted data that only you can read.

44
00:03:40,000 --> 00:03:53,000
There are also ways to generate method message authentication codes using public key encryption called signatures, which only a private key can create, but which the public key can verify.

45
00:03:53,000 --> 00:03:58,000
Finally, certificates are a way of establishing a chain of trust to learn public keys.

46
00:03:58,000 --> 00:04:03,000
For example, if you trust Apple, then Apple can sign as document telling you someone else's public key.

47
00:04:03,000 --> 00:04:08,000
You can then use that public key to communicate with them.

48
00:04:09,000 --> 00:04:13,000
You've learned some of the basics of network security and cryptography.

49
00:04:13,000 --> 00:04:18,000
There are a lot of details as you try to give you a sense of how these very important mechanisms work.

50
00:04:18,000 --> 00:04:24,000
But if you take away one lesson from this unit, however, it shouldn't be exactly how block cipher works.

51
00:04:24,000 --> 00:04:29,000
It should be that insecurity, it's very easy to make a mistake.

52
00:04:29,000 --> 00:04:32,000
So don't try to implement these mechanisms yourself.

53
00:04:32,000 --> 00:04:36,000
It's too easy to miss a detail that turns out to be a vulnerability.

54
00:04:36,000 --> 00:04:40,000
Use existing open source implementations of crypto systems.

55
00:04:40,000 --> 00:04:46,000
Use well tested and well understood approaches that people have examined for a very long time.

56
00:04:46,000 --> 00:04:51,000
Finally, be careful and follow best practices.

57
00:04:51,000 --> 00:04:54,000
And remember, the NSA is listening.

