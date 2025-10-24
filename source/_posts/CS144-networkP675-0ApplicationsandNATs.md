---
title: CS144 NetworkP675 0ApplicationsandNATs
---

1
00:00:00,000 --> 00:00:06,000
So welcome to Unit 5. So in Unit 5, we're going to talk about applications.

2
00:00:06,000 --> 00:00:10,000
And so is all of the internet, what it's about is being able to drive these applications.

3
00:00:10,000 --> 00:00:15,000
It's kind of what makes the whole thing useful and interesting and such a dynamic engine change.

4
00:00:15,000 --> 00:00:22,000
So in this unit, we're going to talk about three applications in particular that are really cornerstones of the modern internet.

5
00:00:22,000 --> 00:00:28,000
The first is DNS, the domain name system, which you've seen mentioned a couple of times before, but we're going to go into it in depth.

6
00:00:28,000 --> 00:00:37,000
So DNS uses UDP as its transport portal call. It's a simple client server exchange you can ask for names and get information about those.

7
00:00:37,000 --> 00:00:41,000
The second application we're going to go into is HTTP or the World Wide Web.

8
00:00:41,000 --> 00:00:47,000
So HTTP operates over TCP, so a different transport portal call. But again, it's a client server exchange.

9
00:00:47,000 --> 00:00:55,000
So we're going to see how HTTP requests look like. And some changes that have happened in the past couple years or so with more recent versions of HTTP that are emergency.

10
00:00:56,000 --> 00:00:57,000
been picked up by applications based on Google

11
00:00:58,000 --> 00:01:06,040
so

12
00:01:07,939 --> 00:01:10,000
Finally, we're looking at BitTorn.

13
00:01:13,000 --> 00:01:19,960
Here's the session with noninstitutional, there is a little bit stress here and there's a little bit pressure here.

14
00:01:19,959 --> 00:01:23,799
We're going to start with Net's network address translation devices.

15
00:01:23,799 --> 00:01:26,559
You've seen them before in Unit 1.

16
00:01:26,559 --> 00:01:30,639
And in what we're going to be describing in the first few videos,

17
00:01:30,639 --> 00:01:33,319
we're going to look at not only how they've

18
00:01:33,319 --> 00:01:35,679
allowed growth of the edges of the Internet,

19
00:01:35,679 --> 00:01:39,560
but how they allow multiple endpoints to hide,

20
00:01:39,560 --> 00:01:43,759
to essentially look behind a single IP address.

21
00:01:43,759 --> 00:01:46,719
Started as really solving two problems.

22
00:01:46,719 --> 00:01:52,239
One was making it easy for a network to appear behind one IP address.

23
00:01:52,239 --> 00:01:55,079
So that if you're allocated one IP address by a provider,

24
00:01:55,079 --> 00:01:58,920
you can then provide a number of private IP addresses that sit behind.

25
00:01:58,920 --> 00:02:02,680
And probably your own home Wi-Fi router works this way.

26
00:02:02,680 --> 00:02:06,239
The second thing is that because that translating address

27
00:02:06,239 --> 00:02:09,560
is primarily in the direction that goes from the edge towards the core,

28
00:02:09,560 --> 00:02:12,439
they don't naturally accept incoming connections.

29
00:02:12,439 --> 00:02:15,240
So they provide us a root-manferated security feature,

30
00:02:15,240 --> 00:02:18,800
which is that it makes it hard for a connection to be opened up to an edge device

31
00:02:18,800 --> 00:02:20,280
and therefore to attack it.

32
00:02:20,280 --> 00:02:22,520
However, the consequence of this is there

33
00:02:22,520 --> 00:02:26,800
has significant implications and ramifications for applications.

34
00:02:26,800 --> 00:02:30,040
Basically, it makes it a lot harder for any kind of application

35
00:02:30,040 --> 00:02:33,160
that wants to initiate communication with an edge device.

36
00:02:33,160 --> 00:02:37,320
So there've been all sorts of things that we're going to learn about in this unit,

37
00:02:37,320 --> 00:02:41,120
about not only how in that spill, but what some of the implications are

38
00:02:41,120 --> 00:02:44,240
and some of the things that people have done to try and get round those.

39
00:02:44,240 --> 00:02:48,000
If you build an internet application today, you have to work on Rats, Maths,

40
00:02:48,000 --> 00:02:50,400
you have to know how they work and they're going to be a big headache.

41
00:02:50,400 --> 00:02:52,920
So I think it's really important to learn how they work down in detail,

42
00:02:52,920 --> 00:02:56,400
all different kinds of Maths and why they're complicated to handle.

43
00:02:56,400 --> 00:02:59,760
So hopefully by the end of this unit, you'll be able to really build your

44
00:02:59,760 --> 00:03:03,879
new, fantastic application that will take the internet on its next steps.

