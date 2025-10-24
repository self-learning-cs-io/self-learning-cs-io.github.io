---
title: CS144 NetworkP1399 5DavidWard
---

1
00:00:00,000 --> 00:00:05,500
So, hey David, thanks for making this call.

2
00:00:05,500 --> 00:00:07,000
Hey, you got Phil.

3
00:00:07,000 --> 00:00:08,000
Good to see you again.

4
00:00:08,000 --> 00:00:10,000
Good to see you.

5
00:00:10,000 --> 00:00:16,000
So, first of all, funny story we're trying to do this online video call recording.

6
00:00:16,000 --> 00:00:23,000
I tried lots of stuff and then of course David, given who he is, just snap some fingers and then some magical people made it all happen.

7
00:00:23,000 --> 00:00:25,000
You think so, pretty awesome technology.

8
00:00:25,000 --> 00:00:29,000
So David, what do you do and how do you get there?

9
00:00:30,000 --> 00:00:36,000
So, I'm the Chief Architect at Cisco and the story how I got here is actually quite...

10
00:00:36,000 --> 00:00:46,000
It's probably longer than it is interesting to be honest, but nonetheless I started off in grad school back at the University of Minnesota in the mid-90s.

11
00:00:46,000 --> 00:01:03,000
And I was working on a project directing a research center trying to prove that a cluster of workstations around the University of Minnesota connected to a very high speed network could outcompete and outcompute, super computers.

12
00:01:03,000 --> 00:01:13,000
And so, what was interesting about this is that we ended up building and deploying the world's first production ATM network amongst a bunch of sun and SGI workstations.

13
00:01:14,000 --> 00:01:29,000
I know most people in this call probably have only heard about those companies perhaps in the annals of history or in some.c textbook, but nonetheless we proved in fact, given the right experiment that we could outcompute a supercomputer.

14
00:01:29,000 --> 00:01:34,000
But the problem was to be able to prove this, we needed to connect super computers together.

15
00:01:35,000 --> 00:01:44,000
So, to do that we built the first production wide area network ATM network to connect Pittsburgh Supercomputer, Minnesota, San Diego, all the big ones together.

16
00:01:45,000 --> 00:01:52,000
But then there was a small problem that once we built this out, this high speed network was called VBS again, one of the very first big WAN networks.

17
00:01:53,000 --> 00:02:00,000
But the problem was that super computers spoke to each other over this protocol called Hippie High Performance Parallel Interface.

18
00:02:01,000 --> 00:02:07,000
And there weren't a whole lot of Hippie interfaces available for super computers. So, we had to invent a Hippie switch.

19
00:02:08,000 --> 00:02:21,000
And then we, with a group of folks that started to invent a Hippie over ATM. Now, what was really interesting about this bill actually from an engineering point of view is that a Hippie packet in those days was two gigs.

20
00:02:21,000 --> 00:02:31,000
And in 18th, I was 53 bytes. And across the wide area network when you dropped 53 bytes, here comes two gigs again.

21
00:02:32,000 --> 00:02:38,000
And so, we learned a whole lot about how to build extremely good wide area network packet generators.

22
00:02:39,000 --> 00:02:49,000
But as I move forward, I found out in my experiment, my work that we also needed to upgrade the Midwest University network, which is called CI-CNet,

23
00:02:49,000 --> 00:02:53,000
and how the University of Minnesota was connected to the Internet, which was NSFnet in those days.

24
00:02:54,000 --> 00:03:03,000
And so, we started working and upgraded Minnesota's connection to NSFnet. And again, this is all pre-commercial Internet, which again, are down in the annals of history.

25
00:03:04,000 --> 00:03:13,000
So, we had to do an upgrade of that wide area network. And towards this end, we started building, again, more WAN interfaces and more Hippie's LAN pieces.

26
00:03:14,000 --> 00:03:22,000
And then I found, you know, scratching my head, while the PhD I was getting in physical organic chemistry, that's hard.

27
00:03:23,000 --> 00:03:32,000
And this networking stuff is kind of easier, and it's really kind of cool. And while doing all the Hippie networking, I actually met the woman who became my wife.

28
00:03:33,000 --> 00:03:36,000
So, I'm like, wow, you can pick up girls too. This is all working out for us as well.

29
00:03:37,000 --> 00:03:44,000
So, then I went to a startup that was building these Hippie switches, and we thought we had a great business plan.

30
00:03:45,000 --> 00:03:51,000
We are going to network all of the supercomputers on the planet. There was one small problem with this business plan.

31
00:03:52,000 --> 00:04:00,000
One was that you only need one switch to connect like all of NASA Goddard, all of these massive supercomputers. You only need one switch.

32
00:04:01,000 --> 00:04:09,000
Second business problem, if it wasn't volume, it was that a supercomputer goes for $35 million or some on Goddard's number of tens of millions of dollars.

33
00:04:10,000 --> 00:04:16,000
And a switch goes for about $350,000. And we sold full onto the wide area network.

34
00:04:17,000 --> 00:04:27,000
The only notion of admission control is on load engineering using historical mechanisms and trying to use past histories to predict future performance.

35
00:04:28,000 --> 00:04:39,000
Now, it doesn't work very well in the stock market, and it doesn't work very well on networks because we are subject to complete instantaneous, unknown, unknowingly caused fluctuations in load on the network.

36
00:04:40,000 --> 00:04:44,000
Yes, we can see diurnal patterns, but we don't want to engineer only to diurnal patterns.

37
00:04:45,000 --> 00:04:49,000
But why did we ever leave admission control and loaded admission control out of IPMPLS?

38
00:04:50,000 --> 00:04:56,000
I can't tell you, I've been working on this stuff for 20 years. Why didn't we ever just solve PVCs? I can't tell you.

39
00:04:57,000 --> 00:05:08,000
We went all the way to switch virtual circuits and left a couple of the most fundamental building blocks of network engineering and network planning not even on the table.

40
00:05:09,000 --> 00:05:19,000
I need to go back to the design of the Internet Protocol, David Clark's paper. He talks about here the design consideration of goal.

41
00:05:20,000 --> 00:05:24,000
And certainly, our resource accounting is one of them, but it's low down on the list.

42
00:05:25,000 --> 00:05:28,000
And so it didn't end up being taken care of very much.

43
00:05:28,000 --> 00:05:37,000
It was very nice a couple of weeks ago, he gave a, I guess, lecture and went back and revisited these principles, news ideas and kind of their thoughts.

44
00:05:37,000 --> 00:05:41,000
Hey, we never thought about security. Maybe that's something we should have thought of originally.

45
00:05:42,000 --> 00:05:53,000
I think, you know, back when it was starting, it didn't seem like a big deal, but now some of those principles which were not, you know, weren't given high priority are now becoming more and more important.

46
00:05:54,000 --> 00:06:01,000
Oh, yeah. And frankly, low based engineering is one of them. Now let's talk just a quick trip down history lane.

47
00:06:02,000 --> 00:06:08,000
Back in the day, even before there was NSF net, there was ARPANET. And a lot of my, a lot of my colleagues worked on ARPANET.

48
00:06:09,000 --> 00:06:18,000
And what they tried to do was based upon delay or queuing, you know, queuing delay across the network, they would fiddle with an IGP metric like OSPF.

49
00:06:18,000 --> 00:06:26,000
And if there was high delay, they would give a link worst preference. And if there was low delay, they would give it very high preference, meaning attracting traffic.

50
00:06:27,000 --> 00:06:42,000
Yeah, of course. But, you know what, man, that was back in the 80s. And to this day, from that lesson, we have not been able to have an adult conversation between consenting adults even about guiding the engineering.

51
00:06:43,000 --> 00:06:56,000
And look, it's taken, I'll be honest, the next thing that I now want to get to the next topic, but the next thing we've been working on, of course, is adding useful information into these protocols that are flooding this around the network.

52
00:06:57,000 --> 00:07:07,000
So here's where I'm building this up. We just added, here's the shocker fill, the delay of a link to be passed with the traffic engineering mechanism, traffic engineering metrics.

53
00:07:07,000 --> 00:07:22,000
Here is the utilization of a link. Here is the jitter. In fact, here's some packet loss information that, you know, frankly, we're dropping packets across this link. Now, without getting into the ARP Net War, I said, look, I'm not even trying to create an SPF out of this.

54
00:07:23,000 --> 00:07:35,000
I'm not even trying to run a dyke story and reroute your traffic. Instead, if you could use this really modern computer science idea of pushing this data out of the network up to a centralized controller.

55
00:07:36,000 --> 00:07:48,000
Instead of that goddamn protocol, SNMP where I need to go poll every device to get the load and then somehow through some serious machinations, match that up with the topology to understand what the load engine, the load looks like on my network.

56
00:07:49,000 --> 00:08:01,000
Hey, man, I'm pushing traffic out, I'm pushing this data out in real time. I'm pushing this data out and I see the real time state of the topology and the utilization and the delay and the packet loss.

57
00:08:01,000 --> 00:08:12,000
I now can take that centralized controller and do some really cool shit. And what I can do is place traffic on the network, overcoming best path routing or shortest path routing.

58
00:08:13,000 --> 00:08:28,000
And I can fully utilize all the bandwidth that I have deployed and I can make new protection restoration decisions. But what becomes really interesting is if I know when I want to place load on the network, I can program that load to be placed on the network.

59
00:08:29,000 --> 00:08:38,000
Basic stuff. Back up my data center, load my content caches. Here comes an elephant of traffic that I'm going to send down my network. Man, I just can't do this.

60
00:08:39,000 --> 00:08:54,000
Dying all the way back, I just can't do this with a head end view of load engineering onto a network. I can't do this via polling interfaces to 10,000 or more devices and trying to create some crazy matrix in the sky. That'll never be real time.

61
00:08:54,000 --> 00:09:05,000
Instead, we'll use these modern computer science concepts. And I'm no tongue is in my cheek of push the information out of the network that you want to have it in a logically centralized place.

62
00:09:06,000 --> 00:09:19,000
And in particular, start removing state because once I have that centralized view and I'm not doing head end traffic engineering or load engineering, I don't need RSVP. I don't need to do, I don't need these protocols. I can do it in a much, much more efficient way.

63
00:09:20,000 --> 00:09:26,000
These fundamental concepts are really at the forefront of routing protocols, routing technology and the way in.

64
00:09:28,000 --> 00:09:40,000
This was, as always, the fire hose. Fantasticly cool information, David. I can't thank you enough. But I think I've taken enough of your time. You've got to go save the internet.

65
00:09:41,000 --> 00:09:53,000
I've got to go do something, that's for sure. But hey, if you've got students out there that or other folks that want to get involved in this type of work, we're doing it all in the open. It's all in standards bodies.

66
00:09:54,000 --> 00:10:06,000
We're doing quite a bit of open source and a lot of it is available. Again, I'd like to move the conversation about SDN and orchestration away from say just the data center stuff and what you can do with some of these other projects.

67
00:10:07,000 --> 00:10:09,000
But routing is still a cool man.

68
00:10:10,000 --> 00:10:15,000
Well, how great. Thanks again so much.

