---
title: CS144 NetworkP947 0LowerLayers
---

1
00:00:00,000 --> 00:00:08,000
So in this unit, we're going to finally dig down below IP and answer the question, what is a link and how do they work?

2
00:00:08,000 --> 00:00:12,000
So how does the link layer work and what are the issues that you encounter at the link layer?

3
00:00:12,000 --> 00:00:16,000
And so there are two basic things that this unit is going to cover.

4
00:00:16,000 --> 00:00:19,000
The first, the fundamental principles of communication.

5
00:00:19,000 --> 00:00:24,000
This is sort of the boundary of computer science networking with electrical engineering.

6
00:00:24,000 --> 00:00:29,000
We're going to talk about things like signal and noise and how the signal to noise ratio in fact determines what's the link layer.

7
00:00:29,000 --> 00:00:32,000
And so what determines what's the potential bit rate capacity of a link?

8
00:00:32,000 --> 00:00:41,000
I mean, there's a reason why today we don't have 100 terabit per second link layers because of some of these fundamental mathematical principles of communication.

9
00:00:41,000 --> 00:00:48,000
So based on that, we're going to look at things like bid errors and how link layers can recover from them using coding error correcting codes.

10
00:00:48,000 --> 00:00:58,000
So that, for example, you add a little bit of redundancy to your link layer frames such that if there are a few bid errors done at the physical link layer, you can recover from them and still receive the frame correctly.

11
00:00:58,000 --> 00:01:04,000
So the second thing that we're going to be learning about in this in this unit are how these links are actually built.

12
00:01:04,000 --> 00:01:17,000
You'll remember from the from unit one, we learned that the thin waste of IP allows many, many physical layers of link layers to operate underneath and still use the Internet protocol and to tie them all together.

13
00:01:17,000 --> 00:01:24,000
So there are different categories of physical links and we're going to be talking about two here, two that will be very familiar with already.

14
00:01:24,000 --> 00:01:31,000
There's wired links for which the dominant wired link in use today is Ethernet. So we're learning how Ethernet works.

15
00:01:31,000 --> 00:01:36,000
The original version of Ethernet used to share the cable and so needed a way to share that cable.

16
00:01:36,000 --> 00:01:45,000
And so we'll be learning about what's called the CSMA CD protocol and access control mechanism that allows us to share that that physical cable.

17
00:01:45,000 --> 00:01:56,000
But we'll learn also how Ethernet works today, which is to use switches and learn a little bit about those already in previous unit, how they learn addresses and how those tables get operated.

18
00:01:56,000 --> 00:02:07,000
The second thing we'll be learning under the links is wireless links. Now wireless is quite different from wired, more than just the fact that it's broadcast into the air.

19
00:02:07,000 --> 00:02:12,000
There are many, many characteristics of wireless that make it fundamentally different in the way that it works.

20
00:02:12,000 --> 00:02:16,000
So we need to be mindful of these when making practical links.

21
00:02:16,000 --> 00:02:27,000
The first one is that the signal itself in the channel can vary. It's not fixed over time like it is in a wired link where it always has the same capacity operating on the same link.

22
00:02:27,000 --> 00:02:34,000
The channel can fade, there can be different types of interference, signals can take different paths of different lengths and it can fit with itself.

23
00:02:35,000 --> 00:02:45,000
And because it's broadcast, everybody can hear and so this introduces some challenges as well as well as security challenges because everybody can hear what they're saying.

24
00:02:45,000 --> 00:02:55,000
There's another type of problem that we'll learn about called the hidden terminal problem. This is when two clients that are communicating are both talking to an AP.

25
00:02:55,000 --> 00:03:01,000
They can happily talk to an AP, but they have no means to communicate to each other because they don't have any direct signal contact with each other.

26
00:03:02,000 --> 00:03:10,000
And so there needs to be some extra level of coordination in the network to make sure that they don't interfere with each other at the access point.

27
00:03:10,000 --> 00:03:17,000
Also, in addition to learning about these different types of link, we'll be learning about one of the consequences of having these different links.

28
00:03:17,000 --> 00:03:23,000
And that is different links can carry packets up to a different maximum size, the so-called maximum transmission unit.

29
00:03:23,000 --> 00:03:31,000
Ethernet, for example, can take packets up to 1,500 bytes long, but other links may take packets only up to a certain length.

30
00:03:31,000 --> 00:03:37,000
And so you'll probably remember that we've mentioned IP fragmentation in earlier parts of the class.

31
00:03:37,000 --> 00:03:52,000
This is necessary when you're going from a link with a large maximum transmission unit down to a smaller one because it's not able to carry it, the network will fragmented into a number of self-contained fragments that don't get put back together again until we get to the endos.

32
00:03:52,000 --> 00:03:56,000
Which then resembles the data and hands it up to the next layer.

33
00:03:56,000 --> 00:04:02,000
So you'll learn how that works and what the specific mechanisms are inside a IP to make that work.

34
00:04:02,000 --> 00:04:08,000
The last thing that we're going to be learning about is this sort of interesting tricky little detail of the communication channel.

35
00:04:08,000 --> 00:04:15,000
And that is that when two hosts or two ends of a link are communicating with each other, they can't possibly be using exactly the same clock.

36
00:04:15,000 --> 00:04:22,000
You can't have exactly the same frequency, exactly the same phase at two different places at the same time.

37
00:04:22,000 --> 00:04:27,000
So when a sender is sending, it's using one clock, which is potentially different from the one the receiver is using.

38
00:04:27,000 --> 00:04:36,000
So somehow we need to indicate to the receiver what clock rate and frequency and phase that we were using in order for the farmer to correctly decode the data.

39
00:04:36,000 --> 00:04:44,000
So we'll learn about encoding in order to recover the clock and use it correctly at the farm end.

