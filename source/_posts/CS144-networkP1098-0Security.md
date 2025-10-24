---
title: CS144 NetworkP1098 0Security
---

1
00:00:00,000 --> 00:00:05,000
So in this unit, we're going to be learning about network security.

2
00:00:05,000 --> 00:00:08,000
Usually when we read about the internet and networks in the newspaper,

3
00:00:08,000 --> 00:00:13,000
it's because of some security vulnerability that's been exploited or found.

4
00:00:13,000 --> 00:00:16,000
Of course, we read about them, these are exploits in software,

5
00:00:16,000 --> 00:00:20,000
but sometimes you read about them, the infrastructure itself.

6
00:00:20,000 --> 00:00:24,000
And these usually expose because an individual company or a country

7
00:00:24,000 --> 00:00:29,000
is attacking someone in order to be able to discover or tamper with their

8
00:00:29,000 --> 00:00:35,000
data. We're going to start by learning about the types of attack that are quite common.

9
00:00:35,000 --> 00:00:38,000
There are many ways to attack a network, and you're going to be seeing a collection of

10
00:00:38,000 --> 00:00:41,000
methods that work in a variety of different ways.

11
00:00:41,000 --> 00:00:44,000
The first of most common one is to simply eavesdrop or listen on someone else's

12
00:00:44,000 --> 00:00:48,000
communication. In some networks, this is surprisingly easy, and you're going to

13
00:00:48,000 --> 00:00:53,000
be surprised at some of the methods that I use and can be used, and will even

14
00:00:53,000 --> 00:00:58,000
demonstrate some of these to you. You can either eavesdrop on a broadcast network

15
00:00:58,000 --> 00:01:03,000
like a wireless network, or you can force the network to expose or broadcast

16
00:01:03,000 --> 00:01:07,000
in a way that will make it easier for you to do it.

17
00:01:07,000 --> 00:01:12,000
Another type of attack is to masquerade or behaviors if you're a piece of the

18
00:01:12,000 --> 00:01:17,000
infrastructure that is providing information back to a sending post.

19
00:01:17,000 --> 00:01:24,000
For example, you can forge up responses, you can spoof the response from a

20
00:01:24,000 --> 00:01:30,000
DNS server, and cause a client to send data to a place other than it was thinking of

21
00:01:30,000 --> 00:01:36,000
sending it. So you can either get the data redirected to you, where you can look

22
00:01:36,000 --> 00:01:39,000
at it, in fact, that they might be able to see what we're saying.

23
00:01:39,000 --> 00:01:43,000
If you have confidentiality, then you can communicate with another party, other people can

24
00:01:43,000 --> 00:01:47,000
observe this communication, but not be able to know what you're saying.

25
00:01:47,000 --> 00:01:51,000
Second principle is integrity. Confidentiality lets us communicate without people

26
00:01:51,000 --> 00:01:55,000
know what we're saying, but people can still metal with it. But integrity, and we can

27
00:01:55,000 --> 00:01:59,000
be sure that our communications aren't tempered with. So the message that makes

28
00:01:59,000 --> 00:02:03,000
sent to me was actually the message that makes sent to me. It wasn't that somebody

29
00:02:03,000 --> 00:02:08,000
fussed with it in between. The third principle is authenticity.

30
00:02:08,000 --> 00:02:12,000
Can I actually be sure that the other party I'm talking with is who they say they are?

31
00:02:12,000 --> 00:02:17,000
It turns out there are some ways to do this. But the basic techniques for all of

32
00:02:17,000 --> 00:02:21,000
confidentiality, and integrity, and authenticity that uses cryptography.

33
00:02:21,000 --> 00:02:27,000
So mathematical tools and secrecy and codes. And the idea is that if you use the right

34
00:02:27,000 --> 00:02:32,000
cryptographic tools, then we can have secure communication, even over an insecure

35
00:02:32,000 --> 00:02:36,000
network, like the internet. And so you're going to learn about some basic cryptographic

36
00:02:36,000 --> 00:02:40,000
tools, such as cryptographic hashes, message authentication codes, symmetric

37
00:02:40,000 --> 00:02:44,000
cipher, public key cryptography, certificates, and signatures, which are all

38
00:02:44,000 --> 00:02:49,000
used in the internet today. And so, at the end of this unit, you should start to have a

39
00:02:49,000 --> 00:02:53,000
sense as to how you should secure your network going forward.

