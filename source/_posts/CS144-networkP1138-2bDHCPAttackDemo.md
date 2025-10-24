---
title: CS144 NetworkP1138 2bDHCPAttackDemo
---

1
00:00:00,000 --> 00:00:06,600
In the following video, I'm going to demo how an attacker can masquerade as a DHCP server,

2
00:00:06,600 --> 00:00:10,439
forcing Alice's machine to be incorrectly configured.

3
00:00:10,439 --> 00:00:15,160
In the example, she's going to be forced to use a rogue DNS server, taking her to the

4
00:00:15,160 --> 00:00:21,559
wrong IP addresses for web servers she's trying to access.

5
00:00:21,559 --> 00:00:25,879
In our demo, three hosts are connected to Switch S1.

6
00:00:25,879 --> 00:00:30,799
Host H1 is Alice's machine, which is running a good DHCP client.

7
00:00:30,799 --> 00:00:35,960
The host DHCP runs a good DHCP server.

8
00:00:35,960 --> 00:00:44,640
The DHCP server configures Alice's machine to use a good DNS server out in the internet.

9
00:00:44,640 --> 00:00:51,560
Host Evil is run by Eve the attacker and runs a rogue DHCP server, a rogue DNS server,

10
00:00:51,560 --> 00:00:53,879
and a rogue web server.

11
00:00:54,440 --> 00:00:58,800
Initially, we'll assume that Eve has not started her attack.

12
00:00:58,800 --> 00:01:03,400
And we'll see a mini net demo of the good DHCP server correctly configuring Alice's

13
00:01:03,400 --> 00:01:06,799
machine so that she can access the internet just fine.

14
00:01:06,799 --> 00:01:12,359
Then we'll see what happens if Eve's machine masquerades as the local DHCP server,

15
00:01:12,359 --> 00:01:15,960
replying faster than the good DHCP server.

16
00:01:15,960 --> 00:01:21,359
Eve will configure Alice's machine to use the rogue DNS server directing Eve's web traffic

17
00:01:21,359 --> 00:01:23,800
to Eve's web server as well.

18
00:01:23,799 --> 00:01:25,599
Let's see what happens.

19
00:01:25,599 --> 00:01:30,399
The demonstration shows how simple a DHCP attack is, if the attacker has access to the local

20
00:01:30,399 --> 00:01:34,879
network and can install a rogue DHCP client close to the victim.

21
00:01:34,879 --> 00:01:38,719
The demo I'm going to show you runs in the mini net emulation system, which means you

22
00:01:38,719 --> 00:01:42,239
can easily and safely run it yourself on your own computer, and I'll tell you shortly

23
00:01:42,239 --> 00:01:43,920
how you can do that.

24
00:01:43,920 --> 00:01:48,039
It also means the same code can easily be replicated into a real network.

25
00:01:48,039 --> 00:01:52,359
This demo was created by Bob Lance at the Open Networking Lab in Palo Alto.

26
00:01:52,359 --> 00:01:57,840
DH1 runs a DHCP client and is initially configured correctly by a nearby host running a good

27
00:01:57,840 --> 00:02:01,079
DHCP server for the local network.

28
00:02:01,079 --> 00:02:06,439
Evil is run by Eve the attacker and runs a rogue DHCP server.

29
00:02:06,439 --> 00:02:13,639
The DHCP server host is connected to S1 via a 500 ms link to delay its DHCP responses

30
00:02:13,639 --> 00:02:14,960
to Alice.

31
00:02:14,960 --> 00:02:20,680
We need the delay to be sure Alice will hear the evil DHCP responses before the good ones.

32
00:02:20,680 --> 00:02:25,120
Alice uses host H1 to browse the web using her Firefox browser.

33
00:02:25,120 --> 00:02:29,159
As we can see, she successfully can reach the Stanford website.

34
00:02:29,159 --> 00:02:34,400
Her computer H1 runs a DHCP client to configure her IP address, the address of her local router

35
00:02:34,400 --> 00:02:37,200
and her DNS server.

36
00:02:37,200 --> 00:02:42,319
If we use the dig command to look up another name like Amazon.com, we can see that the DNS

37
00:02:42,319 --> 00:02:49,000
server, in this case a public DNS server run by Google at IP address 8.8.8.8 is responding

38
00:02:49,000 --> 00:02:54,759
to the query with Amazon's IP addresses and the site loads as expected in Firefox.

39
00:02:54,759 --> 00:02:59,479
Eve the attacker starts three processes on the evil host, a rogue DHCP server, a rogue

40
00:02:59,479 --> 00:03:02,000
DNS server and a web server.

41
00:03:02,000 --> 00:03:06,639
Eve is going to force all of Alice's web accesses to go to Eve's web server instead.

42
00:03:06,639 --> 00:03:12,280
Every so often our DHCP client is required to renew its lease on its IP address.

43
00:03:12,280 --> 00:03:20,520
In YShart we can see that when H1 issues a DHCP discover, the good DHCP server at 10.0.0.0.50

44
00:03:20,520 --> 00:03:25,560
responds with an offer that contains the address of the legitimate DNS server at 8.8.8.8.8.

45
00:03:25,560 --> 00:03:30,680
But unfortunately, Alice's machine hears the offer from the rogue DHCP first and accepts

46
00:03:30,680 --> 00:03:31,680
it.

47
00:03:31,680 --> 00:03:32,680
Alice is now in trouble.

48
00:03:32,680 --> 00:03:39,439
Alice's machine now uses Eve's rogue DNS server, which is also at 10.0.0.66.

49
00:03:39,439 --> 00:03:44,319
When Alice's browser asks for the IP address of Google.com, the rogue DNS server tells Alice's

50
00:03:44,319 --> 00:03:51,199
machine to use Eve's web server instead and this is what happens.

51
00:03:51,199 --> 00:03:56,719
When she revisits Amazon.com, most of the correct site appears since Firefox has cached

52
00:03:56,719 --> 00:03:58,599
the DNS result.

53
00:03:58,599 --> 00:04:03,960
But as soon as Firefox does a new DNS look up, which we can force by pressing Shift Refresh,

54
00:04:03,960 --> 00:04:08,840
she's given the IP address of Eve's rogue web server instead.

55
00:04:08,840 --> 00:04:13,920
If she visits a new site like Yahoo.com, then she'll also end up at the rogue site.

56
00:04:13,920 --> 00:04:16,600
You can imagine many bad things that Eve could do.

57
00:04:16,600 --> 00:04:21,120
She could simply deny or block access to particular websites for Alice.

58
00:04:21,120 --> 00:04:25,160
Or she could copy the look and feel of those websites that Alice visits, and masquerade

59
00:04:25,160 --> 00:04:30,439
as an e-commerce site, forcing Alice to reveal her credit card or other personal information.

60
00:04:30,439 --> 00:04:35,680
Or she could simply sit as a transparent proxy watching and recording all of Alice's traffic.

61
00:04:35,680 --> 00:04:40,600
When we switch off the evil DHCP client and the DNS server, Alice will eventually go back

62
00:04:40,600 --> 00:04:43,879
to using the correct local DHCP server.

63
00:04:43,879 --> 00:04:48,639
The first time she revisits the same website, her browser, in this case Firefox, might have

64
00:04:48,639 --> 00:04:53,120
cached the bad DNS look up and still try and go to the evil web server.

65
00:04:53,120 --> 00:04:56,879
But eventually Alice's host will start using the correct DNS server and her network will

66
00:04:56,879 --> 00:05:01,399
start working correctly again.

67
00:05:01,399 --> 00:05:07,199
The video shows just how easy it is to attack a network if you have access to the local traffic.

68
00:05:07,199 --> 00:05:11,839
If you can intercept and beat the DHCP traffic flowing in the network, then you can install

69
00:05:11,839 --> 00:05:17,199
a DNS server, you can then install and redirect traffic to your own web server or any other

70
00:05:17,199 --> 00:05:19,000
type of traffic.

71
00:05:19,000 --> 00:05:22,039
Very easy if you have access to the local network.

72
00:05:22,039 --> 00:05:26,199
If you want to run this demo for yourself, then you can just download the scripts shown

73
00:05:26,199 --> 00:05:30,399
below at the URL on the screen and then run it in your own miniat instance.

