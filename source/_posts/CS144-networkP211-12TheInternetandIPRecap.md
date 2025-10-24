---
title: CS144 NetworkP211 12TheInternetandIPRecap
---

1
00:00:00,000 --> 00:00:04,000
In this unit, you learn some of the basics of how the internet works.

2
00:00:04,000 --> 00:00:08,000
You learn to applications like web browsing and skype work, how an application uses the internet,

3
00:00:08,000 --> 00:00:10,000
and the basic structure of the internet itself.

4
00:00:10,000 --> 00:00:14,000
You learn some of the fundamental architectural principles of networking.

5
00:00:14,000 --> 00:00:18,000
Perhaps by now, you know which one of his fill and which one of us is Nick.

6
00:00:18,000 --> 00:00:24,000
Now that you've finished the first unit, you should be familiar with this picture of the four-layer model of the internet.

7
00:00:24,000 --> 00:00:27,000
You now know that the internet has broken down to these four distinct layers,

8
00:00:27,000 --> 00:00:29,000
what they are, and how they work together.

9
00:00:29,000 --> 00:00:35,000
But even more importantly than how they work, you hopefully understand why the internet works this way,

10
00:00:35,000 --> 00:00:39,000
and why layering is a good idea in all networks, not just the internet.

11
00:00:39,000 --> 00:00:43,000
You've seen that the internet works by breaking up data into small units called packets.

12
00:00:43,000 --> 00:00:47,000
When you request a boot web page, your computer sends some packets to a web server.

13
00:00:47,000 --> 00:00:51,000
The internet decides how the little pieces of data arrive to the right-dressed destination,

14
00:00:51,000 --> 00:00:55,000
and how the packets the web server responds with, containing the page,

15
00:00:55,000 --> 00:00:57,000
make their way to you correctly as well.

16
00:00:57,000 --> 00:01:01,000
You've learned how two architectural principles, layering and packets,

17
00:01:01,000 --> 00:01:05,000
come together in the architectural principle of encapsulation.

18
00:01:05,000 --> 00:01:07,000
In encapsulation is how one takes layers,

19
00:01:07,000 --> 00:01:09,000
and lets them use packets in a clean and simple way,

20
00:01:09,000 --> 00:01:13,000
such that each layer's use of a packet is independent of the others.

21
00:01:13,000 --> 00:01:17,000
We'll talk about a few more architectural principles in future units.

22
00:01:17,000 --> 00:01:21,000
So to be specific, what we've learned so far in this unit,

23
00:01:21,000 --> 00:01:24,000
we've studied four main topics.

24
00:01:24,000 --> 00:01:27,000
First, how an application uses the internet.

25
00:01:27,000 --> 00:01:31,000
Phil explained the common way in which a variety of different applications,

26
00:01:31,000 --> 00:01:36,000
such as Skype, BitTorrent and the web, all use the internet in a very similar manner.

27
00:01:36,000 --> 00:01:39,000
You learn that most applications want to communicate over a reliable,

28
00:01:39,000 --> 00:01:43,000
bidirectional byte stream between two or more endpoints.

29
00:01:43,000 --> 00:01:47,000
The second thing that you learned about was the structure of the internet.

30
00:01:47,000 --> 00:01:49,000
And specifically, the four layer model.

31
00:01:49,000 --> 00:01:53,000
You learn what the four layer model is, the responsibility of each layer.

32
00:01:53,000 --> 00:01:56,000
You also learn why we use the internet protocol or IP.

33
00:01:56,000 --> 00:01:59,000
Every time we send packets across the internet,

34
00:01:59,000 --> 00:02:02,000
and why we call IP the thin waste of the internet.

35
00:02:02,000 --> 00:02:06,000
The third thing we learned about was specifically the internet protocol,

36
00:02:06,000 --> 00:02:07,000
what it is.

37
00:02:07,000 --> 00:02:11,000
And because IP is so important, we spent several videos describing what IP does for us,

38
00:02:11,000 --> 00:02:13,000
and how it works.

39
00:02:13,000 --> 00:02:16,000
So far, we've discussed just IP version four,

40
00:02:16,000 --> 00:02:19,000
because it's the most widely used version of IP today.

41
00:02:19,000 --> 00:02:22,000
You've learned about IP addresses, how routers look up,

42
00:02:22,000 --> 00:02:24,000
IP addresses, and so on.

43
00:02:24,000 --> 00:02:27,000
Later on, we're going to be learning about a newer version of IP,

44
00:02:27,000 --> 00:02:31,000
called IP version six.

45
00:02:31,000 --> 00:02:34,000
The fourth topic was basic architectural ideas and principles.

46
00:02:34,000 --> 00:02:37,000
You've studied three fundamental principles of networks,

47
00:02:37,000 --> 00:02:41,000
all of which are very relevant to our understanding of the internet.

48
00:02:41,000 --> 00:02:45,000
The first is packet switching, which is the simple way in which data is broken down

49
00:02:45,000 --> 00:02:48,000
into self-contained packets of information that are forwarded hot by hop,

50
00:02:48,000 --> 00:02:51,000
based on the information in the packet header.

51
00:02:51,000 --> 00:02:55,000
The second is layering, which was mentioned in detail.

52
00:02:55,000 --> 00:03:00,000
The third is encapsulation, which is the process of placing a packet processed at one layer

53
00:03:00,000 --> 00:03:04,000
inside the data portion of a packet in the layer below.

54
00:03:04,000 --> 00:03:08,000
This helps provide a clear separation of concerns between how data is processed

55
00:03:08,000 --> 00:03:11,000
at each layer in the hierarchy.

56
00:03:11,000 --> 00:03:15,000
You should now have a good understanding of the basic structure of the internet

57
00:03:15,000 --> 00:03:18,000
and three basic architectural ideas.

58
00:03:18,000 --> 00:03:20,000
You understand how applications like your web browser works,

59
00:03:20,000 --> 00:03:24,000
and now the internet delivers packets between two computers.

60
00:03:24,000 --> 00:03:29,000
You now know what TCP is and what IP is and why they're related.

61
00:03:29,000 --> 00:03:32,000
At first glance, these might seem like grunzy low-level details,

62
00:03:32,000 --> 00:03:36,000
but it turns out that these are the bedrock of what the internet is.

63
00:03:36,000 --> 00:03:39,000
Every year, new applications and uses of the internet emerge,

64
00:03:39,000 --> 00:03:42,000
but all of them use these basic principles you're learning about,

65
00:03:42,000 --> 00:03:45,000
and almost all of them use TCP IP.

66
00:03:45,000 --> 00:03:48,000
By starting with these fundamentals that have remained amazingly constant,

67
00:03:48,000 --> 00:03:51,000
you'll learn the knowledge that will continue to be important,

68
00:03:51,000 --> 00:03:54,000
even as we move on to 5G wireless networks, Web 3.0,

69
00:03:54,000 --> 00:03:56,000
and the internet of things.

70
00:03:56,000 --> 00:03:58,000
And that's part of what's exciting.

71
00:03:58,000 --> 00:04:01,000
The internet and what it can do is always expanding and changing,

72
00:04:01,000 --> 00:04:06,000
but there are some core ideas and principles which are constant through all of that evolution.

73
00:04:06,000 --> 00:04:11,000
By learning them, you not only learn how the internet works and how networks today work,

74
00:04:11,000 --> 00:04:15,000
but most likely how they'll work even in 20 years or more.

