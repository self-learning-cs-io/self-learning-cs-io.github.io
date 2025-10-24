---
title: CS144 NetworkP11 0TheInternetandIPIntroduction
---

1
00:00:00,000 --> 00:00:04,000
Welcome to the first unit. This is the unit where you'll learn the big picture,

2
00:00:04,000 --> 00:00:08,000
as well as a few details. You're going to learn the basics of how the Internet works.

3
00:00:08,000 --> 00:00:12,000
You might even get to figure out which one of us is Nick, and which one of us is Phil.

4
00:00:12,000 --> 00:00:16,000
We hope to help you understand why the Internet is designed the way that it is.

5
00:00:16,000 --> 00:00:19,000
What is on the mood? Strengths and its weaknesses.

6
00:00:19,000 --> 00:00:23,000
We'll also teach you some of the commonly accepted network design principles,

7
00:00:23,000 --> 00:00:26,000
such as layering, encapsulation, and packet switching.

8
00:00:26,000 --> 00:00:29,000
At the end of this unit, you should be able to answer questions like,

9
00:00:29,000 --> 00:00:32,000
what is the Internet? What is an Internet address?

10
00:00:32,000 --> 00:00:36,000
And how do applications such as the web, Skype, and BitTarant work?

11
00:00:36,000 --> 00:00:40,000
These principles will help you design better networks in the future.

12
00:00:40,000 --> 00:00:45,000
At the end of this first unit, you should be familiar with something called the four-layered model of the Internet.

13
00:00:45,000 --> 00:00:49,000
It describes how the Internet is broken down into four distinct layers.

14
00:00:49,000 --> 00:00:54,000
You'll learn what those layers are, and why they're a basic principle of good network design.

15
00:00:54,000 --> 00:00:57,000
You'll learn what the Internet's four layers are, and how they work together.

16
00:00:57,000 --> 00:01:02,000
You'll learn that most applications as a transport layer call the transmission control protocol,

17
00:01:02,000 --> 00:01:06,000
or TCP, and how some applications use it.

18
00:01:06,000 --> 00:01:11,000
You'll also learn that the Internet works by breaking up data into small units called packets.

19
00:01:11,000 --> 00:01:15,000
For example, when you request a web page, your computer sends some packets to the web server.

20
00:01:15,000 --> 00:01:20,000
The Internet decides how those packets of data arrive to the right destination.

21
00:01:20,000 --> 00:01:26,000
So this unit also examines one layer, in particular, in greater detail. It's the network layer.

22
00:01:26,000 --> 00:01:29,000
You might have heard of IP, the Internet Protocol.

23
00:01:29,000 --> 00:01:34,000
It's the protocol named after the Internet because it's the glue that lets the whole thing work.

24
00:01:34,000 --> 00:01:41,000
You can change all of the other layers, but to be using the Internet, you need to be using the Internet Protocol at the network layer.

25
00:01:41,000 --> 00:01:45,000
You'll learn about what the Internet Protocol does, and how it does it.

26
00:01:45,000 --> 00:01:49,000
You'll learn about the Internet Protocol addresses and how they're assigned.

27
00:01:49,000 --> 00:01:55,000
You'll start to learn how the Internet decides the path the packet should take, based on its Internet address.

28
00:01:55,000 --> 00:02:00,000
Finally, let's show you a few software tools that you can use to inspect how your computer is using the Internet.

29
00:02:00,000 --> 00:02:06,000
So you can apply what you've learned in this unit the next time you browse the web.

