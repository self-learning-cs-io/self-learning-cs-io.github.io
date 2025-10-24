---
title: CS144 NetworkP1178 4SecurityV
---

1
00:00:00,000 --> 00:00:04,960
In this final video, as part of the attack series, we're going to talk about denial of service.

2
00:00:04,960 --> 00:00:10,960
In February of 2000, Yahoo's router one day just started crashing.

3
00:00:10,960 --> 00:00:15,759
And the engineers had had problems with the router previously, but this time it was worse.

4
00:00:15,759 --> 00:00:18,160
They couldn't figure out what was going wrong.

5
00:00:18,160 --> 00:00:20,800
Why every time they brought up the router, it kept crashing.

6
00:00:20,800 --> 00:00:28,560
And it took them many hours to figure out that they were being flooded with ICMP Echo reply packets.

7
00:00:28,559 --> 00:00:32,560
At such a high rate that it was causing their router to crash.

8
00:00:32,560 --> 00:00:43,519
And in the weeks and months of followed, there were many of these so-called distributed denial of service or DDoS attacks against a bunch of high profile sites.

9
00:00:43,519 --> 00:00:51,519
So basically, what a denial of service attack is is something that prevents a service from being available.

10
00:00:51,520 --> 00:01:03,520
And the easiest denial of service attack you can do is to overload either a server or network with too many packets so that it can no longer function properly and serve legitimate clients.

11
00:01:03,520 --> 00:01:14,480
And of course, as an attacker, you want to maximize the cost of each packet to the server in terms of network resources, CPU, and memory.

12
00:01:14,480 --> 00:01:22,480
The reason distributed denial of service or DDoS is so effective is that the attack comes from all over the place.

13
00:01:22,480 --> 00:01:25,480
It's hard to just filter out one bad person.

14
00:01:25,480 --> 00:01:32,480
Also, because it's coming from a number of hosts, each of those hosts has some of the resources.

15
00:01:32,480 --> 00:01:38,480
So you've got a lot of traffic coming in if it's a widely distributed DDoS attack.

16
00:01:38,480 --> 00:01:44,480
How do attackers do this? Well, they can penetrate many machines in a semi-automatic fashion with malware.

17
00:01:44,480 --> 00:01:48,480
And then they turn the hosts into zombies that will basically attack on command.

18
00:01:48,480 --> 00:01:52,480
And then at some point, they later decide, hey, I want to attack this victim like Yahoo.com.

19
00:01:52,480 --> 00:01:58,480
You know, push a button and boom, all of these compromised machines will start flooding Yahoo with packets.

20
00:01:58,480 --> 00:02:04,480
Now, in general, DDoS attacks are attacks that just target availability.

21
00:02:04,480 --> 00:02:09,480
And you may wonder, well, why is that useful?

22
00:02:09,480 --> 00:02:13,480
It's not like you're breaking into a bank and convincing it to send you money or something.

23
00:02:13,480 --> 00:02:19,480
But it turns out that a lot of people perform these DDoS attacks for a number of reasons.

24
00:02:19,480 --> 00:02:29,480
One is extortion. You go to the attackers will go to some company, maybe the company is doing something a little bit friends, like an offshore gambling site or something.

25
00:02:29,479 --> 00:02:33,479
They'll say, hey, pay us a small amount of money or we're going to take down your site.

26
00:02:33,479 --> 00:02:38,479
And at that point, the people who run the site may think, well, we don't really want to go to the FBI with this.

27
00:02:38,479 --> 00:02:48,479
Maybe we should just pay the money. But of course, if they do that, probably even, you know, a month later, the price will double because they've now proven that they're willing to give into the extortion.

28
00:02:48,479 --> 00:02:51,479
But nonetheless, people try to do this.

29
00:02:51,479 --> 00:02:54,479
Another thing is that people use it for revenge.

30
00:02:54,479 --> 00:03:03,479
So, for example, spammers mounted a denial service attack that permanently shut down an anti-spam company called Blue Security once.

31
00:03:03,479 --> 00:03:08,479
And, you know, finally, of course, people do it for bragging rights.

32
00:03:08,479 --> 00:03:13,479
So, denial service can happen at many different layers of abstraction.

33
00:03:13,479 --> 00:03:19,479
You can do it at the link layer, at the network layer, transfer layer, or at the application layer.

34
00:03:19,479 --> 00:03:23,479
So, here's kind of a warm up, some very simple denial service attacks.

35
00:03:23,479 --> 00:03:39,479
One is jam a wireless network at the physical layer, right? So, you could maybe even just buy some off-the-shelf cordless phone or build a very simple circuit that would make a wireless network inoperable essentially.

36
00:03:39,479 --> 00:03:44,479
Another thing you could do is exploit properties or features of the link layer.

37
00:03:44,479 --> 00:03:52,479
So, for example, 802.11, there's this feature called the Net Allocation Vector, which is used to suggest when the network might be free.

38
00:03:52,479 --> 00:03:59,479
And, you can do that, you can use that repeatedly to reserve the network for the maximum number of seconds.

39
00:03:59,479 --> 00:04:07,479
And then, essentially, at that point, no one will end up transmitting you'll effectively disabled that wireless network.

40
00:04:08,479 --> 00:04:12,479
As an example, a DOSTAC, if the network layer, you can floodpng a victim.

41
00:04:12,479 --> 00:04:23,480
So, for example, on most machines, you run ping-f-victim.com and it will flood the victim with ICMP echo request packets as fast as possible.

42
00:04:24,480 --> 00:04:38,480
Of course, what makes a denial service attack, particularly devastating, is if you can somehow amplify the resources required to handle the packets of the service.

43
00:04:38,480 --> 00:04:51,480
So, what the attacker really wants is to, you know, expand the small number of resources, you know, send some stream of packets, but that somehow that costs a lot more to process the server than it does for the attacker to send.

44
00:04:51,480 --> 00:04:56,480
Well, it turns out that there are many ways to do exactly that.

45
00:04:56,480 --> 00:05:09,480
For example, EDNS has some queries that result in responses that are like 40 times the size of a query.

46
00:05:09,480 --> 00:05:16,480
And there also happen to be a large number of open DNS resolvers around the internet, say, you know, half a million or so.

47
00:05:17,480 --> 00:05:22,480
So, one of the things you could do is flood the victim with DNS responses.

48
00:05:22,480 --> 00:05:29,480
What you do is you send a request to a DNS server that's forged to look like the request is coming from the victim.

49
00:05:29,480 --> 00:05:37,480
And, you know, the request would be like some 60 byte EDNS requests, but the reply will be 3,000 bytes.

50
00:05:37,480 --> 00:05:45,480
And so, you're getting kind of a 40 times amplification in bandwidth for these requests and responses.

51
00:05:45,480 --> 00:06:01,480
And because you can send these requests to many, many different open DNS resolvers, it's very easy to amplify this attack, even from a small number of hosts that are originally sending these forged DNS requests.

52
00:06:01,480 --> 00:06:08,480
Another nice thing from the attacker's point of view is that it's not clear who's actually mounting the attack.

53
00:06:08,480 --> 00:06:16,480
By the time the request has made it to the server and the server has responded, what you get is a packet from the DNS server to the victim.

54
00:06:16,480 --> 00:06:23,480
But the attacker's identity doesn't figure anywhere in the packet.

55
00:06:23,480 --> 00:06:28,480
It's MAC addresses in there. It's IP address was never there since it was forging the IP address to begin with.

56
00:06:28,480 --> 00:06:33,480
And it's not on the path between the DNS server and the target.

57
00:06:33,480 --> 00:06:41,480
So, again, it's hard to filter out to kick the bad guy off the network as a way to try to deal with this kind of attack when it's underway.

58
00:06:41,480 --> 00:06:48,480
Yet another one of these attacks is known as the Smurf Attack. This is actually the attack that was being used against Yahoo.

59
00:06:48,480 --> 00:06:58,480
And here, taking advantage of the fact that ICMP Echo, the Ping Protocol, supports Pinging an IP broadcast interrupt.

60
00:06:58,480 --> 00:07:07,480
So, this is actually useful if you want to know what machines are on your network. You ping the broadcast address and you get an echo reply from every machine that's connected to the network.

61
00:07:07,480 --> 00:07:13,480
Unfortunately, this provides a big amplification opportunity for a flooding attack.

62
00:07:13,480 --> 00:07:18,480
Imagine that you compromised one machine on a network with, say, 200 machines.

63
00:07:18,480 --> 00:07:25,480
And then you stick a bunch of broadcast ping packets that purport to be from the victim's IP address.

64
00:07:25,480 --> 00:07:30,480
Then all 200 machines on that network are going to reply to that IP address.

65
00:07:30,480 --> 00:07:39,480
And so, again, that's what was used to take down Yahoo. The same thing was used against Buy.com and Amazon back in 2000.

66
00:07:39,480 --> 00:07:44,480
Now, moving up the Protocol Stack, you can also attack at the transport layer.

67
00:07:44,480 --> 00:07:53,480
So, you remember TCP has this initial handshake, right? The client sends a server send packet, then the server sends a SIN ACPAC back to the client.

68
00:07:53,480 --> 00:07:59,480
And finally, the client sends the server of the third ACPAC.

69
00:07:59,480 --> 00:08:10,480
So, how has this implemented at the server? Well, when the server receives a SIN packet, it allocates some data structure, sticks it in a hash table, and sends back the SIN ACPAC.

70
00:08:10,480 --> 00:08:17,480
And then it waits for this third ACPAC here for some amount of time, like a minute.

71
00:08:17,480 --> 00:08:25,480
And then, after a minute, it basically garbage collections. It's okay, I guess this connection is not happening.

72
00:08:25,480 --> 00:08:37,480
So, every time a packet comes in, every time an ACPACAC comes in, it needs to be compared to all the existing connections to see if this is an ACPAC for a partially open connection.

73
00:08:38,480 --> 00:08:44,480
And unfortunately, the operating system can't handle an arbitrary number of partial connections.

74
00:08:44,480 --> 00:08:50,480
I mean, especially at the time these attacks started getting popularized.

75
00:08:50,480 --> 00:09:02,480
I mean, there would only be a small number of partially open connections that the OS would be willing to cash, and then it would just drop the SIN packets.

76
00:09:02,480 --> 00:09:17,480
So, it would drop future SIN packets. So, basically, the SIN bomb attack consists of sending a stream of SIN packets all from bogus addresses, the SIN ACS go off into wherever, and at that point, the servers tables fill up.

77
00:09:17,480 --> 00:09:23,480
It stops accepting connections, and legitimate clients can't actually connect.

78
00:09:23,480 --> 00:09:30,480
And the thing that was so devastating with this attack is just a few hundred packets per second could completely disable most servers.

79
00:09:30,480 --> 00:09:36,480
So, you really didn't need a lot of horsepower to mount this attack against the server you didn't like.

80
00:09:36,480 --> 00:09:46,480
So, an example of SIN bombs in the wild, there was a worm called the MS Blaster worm that basically flooded port 80 of Windows Update.com with SIN packets.

81
00:09:46,480 --> 00:09:57,480
And it sent about 50 SIN packets per second. That's, they're each only 40 bytes each. So, really, not a lot of bandwidth being consumed.

82
00:09:57,480 --> 00:10:05,480
It randomized the last two bytes to the source IP address, making it hard to track down the exact machines that were actually infected.

83
00:10:05,480 --> 00:10:13,480
And what made this particularly devastating is that clients couldn't connect to Windows Update to actually solve the problem.

84
00:10:13,480 --> 00:10:22,480
Eventually, what Microsoft had to do was change the update URL to be Windows Update.Microsoft.com instead of Windows Update.com.

85
00:10:22,480 --> 00:10:31,480
That still wasn't good enough because there were still old machines that were infected with the Blaster worm, and we're actually trying to connect to Windows Update.com, which at that point they'd given up on.

86
00:10:31,480 --> 00:10:41,480
So, what they eventually had to do was actually use a content distribution network, Ackermy that had really high capacity to serve Windows Update.com.

87
00:10:41,480 --> 00:10:45,480
So, those machines could get updated and take care of the infection.

88
00:10:45,480 --> 00:11:00,480
Okay, other attacks that can happen. IP fragment flooding. Well, it's kind of similar to a SIN bomb attack where when you receive an IP fragment, you have to allocate some space and keep that around until the remaining fragments that are part of that.

89
00:11:00,480 --> 00:11:15,480
IP packet come in. And so, you could basically forge a host, send a stream of bogus fragments to a server and never bother to send the remaining fragments.

90
00:11:15,480 --> 00:11:21,480
So, the server will never be able to reconstruct these packets. It'll just have to time out the fragments eventually.

91
00:11:21,480 --> 00:11:28,480
Another attack is that there's a UDP service known as the Echo service, which is on port 7.

92
00:11:28,480 --> 00:11:38,480
And if you send a packet to port 7 on a server that's running the Echo service, which a lot of hosts used to by default, it will simply reply.

93
00:11:38,480 --> 00:11:52,480
So, I mean, this is kind of a really dumb attack. You could just forge a packet from port 7 on one machine, two port 7 on another machine, and the two packets, the two machines will start sending traffic back and forth until a packet is dropped.

94
00:11:52,480 --> 00:12:01,480
And so, obviously, there's a pretty easy fix, which is that a SIN Echo server should actually drop the packet on the floor if the source port is port 7.

95
00:12:01,480 --> 00:12:06,480
The source port should be something higher, like over a 1024 anyway.

96
00:12:06,480 --> 00:12:19,480
Finally, there's, of course, application level denial of service. So, examples of this are, what's anything where just something you can do on the client can be much more expensive to the server than it is to the client.

97
00:12:19,480 --> 00:12:44,480
So, for example, DNS supports both TCP and UDP, and the way the TCP protocol works is that you connect to the server, and then you send requests, but because TCP is a stream protocol, not a datagram protocol, you need to say where the boundaries are between requests and responses, and so the protocol works that you just send a 16-bit length followed by that many bytes.

98
00:12:44,480 --> 00:13:00,480
And turn out that a lot of DNS implementations blocked while reading the message. So, if you sent a large length, but didn't actually send them any bytes afterwards, you could end up causing a DNS server to hang, and just completely take it out.

99
00:13:00,480 --> 00:13:05,480
So, very little effort on the client's part, server becomes completely inoperable.

100
00:13:05,480 --> 00:13:21,480
Another example is SSL, which requires a fairly expensive public key decryption to happen at the server, and again, you can burn a lot of CPU time at the server by sending bogus connection requests, a lot more CPU time than is required at the client to mount the attack.

