---
title: CS144 NetworkP171 10aLongestprefixmatchLPM
---

1
00:00:00,000 --> 00:00:03,839
Internet routers can have many links.

2
00:00:03,839 --> 00:00:07,360
So they have many options for which direction to forward receive packet.

3
00:00:07,360 --> 00:00:11,679
To select which link to forward packet over, router today typically using algorithm called

4
00:00:11,679 --> 00:00:14,720
longest prefix match.

5
00:00:14,720 --> 00:00:19,039
In this example, a client wants to open a TCP connection to a server on port 80, the typical

6
00:00:19,039 --> 00:00:20,359
port for web servers.

7
00:00:20,359 --> 00:00:24,199
The packets to set up the connection and transfer data take many hops between the client

8
00:00:24,199 --> 00:00:25,199
and server.

9
00:00:25,199 --> 00:00:31,320
On each hop of each packet, a router decides which link to forward the packet over.

10
00:00:31,320 --> 00:00:32,920
How does a router make this decision?

11
00:00:32,920 --> 00:00:36,920
It does so through something called a forwarding table, shown here on the right.

12
00:00:36,920 --> 00:00:40,039
A forwarding table consists of a set of partial IP addresses.

13
00:00:40,039 --> 00:00:42,359
The Xs show that the addresses are partial.

14
00:00:42,359 --> 00:00:44,079
The Xs represent wild cards.

15
00:00:44,079 --> 00:00:50,840
For example, the second entry, reading 171.33.x.x means any IP address whose first byte is 171

16
00:00:50,840 --> 00:00:52,960
and whose second byte is 33.

17
00:00:52,960 --> 00:01:01,079
This particular entry, for example, includes 171.33.5.245, as well as 171.33.1.1.1.

18
00:01:01,079 --> 00:01:05,439
When a packet arrives, the router checks which forwarding table best matches the packet

19
00:01:05,439 --> 00:01:09,319
and forward the packet along the link associated with that forwarding table entry.

20
00:01:09,319 --> 00:01:11,719
By best, I mean most specific.

21
00:01:11,719 --> 00:01:13,920
The default route is effectively all wild cards.

22
00:01:13,920 --> 00:01:15,760
It matches any IP address.

23
00:01:15,760 --> 00:01:19,120
If when a packet arrives, there isn't a more specific route than the default route,

24
00:01:19,120 --> 00:01:21,920
the router will just use the default one.

25
00:01:21,920 --> 00:01:27,760
When a prefix match, our LPM, is the algorithm IP routers used to decide how to forward a packet.

26
00:01:27,760 --> 00:01:30,079
Every router has the forwarding table.

27
00:01:30,079 --> 00:01:34,760
Entries in this forwarding table have two parts, a citer entry describing a block of addresses

28
00:01:34,760 --> 00:01:37,960
and a next-top for packets that match that citer entry.

29
00:01:37,960 --> 00:01:40,920
An address might belong to multiple citer entries.

30
00:01:40,920 --> 00:01:44,760
For example, in this routing table on the right, there are two entries, one for the default

31
00:01:44,760 --> 00:01:51,439
route which has a prefix of length 0 and one for 171.33.0.0.0 slash 16.

32
00:01:51,439 --> 00:01:55,879
By default, all packets will match the top entry and go over link 1.

33
00:01:55,879 --> 00:02:01,599
However, the first 16 bits are two octets of the packet destination address matches 171.33.

34
00:02:01,599 --> 00:02:03,799
The router will send it over link 5.

35
00:02:03,799 --> 00:02:07,599
This is because a 16 bit prefix is a longer prefix than 0 bits.

36
00:02:07,599 --> 00:02:09,120
It's more specific.

37
00:02:09,120 --> 00:02:12,479
So let's go back to our earlier example where we should forwarding table with X's denoting

38
00:02:12,479 --> 00:02:13,479
wild cards.

39
00:02:13,479 --> 00:02:16,360
Here's the router and its forwarding table.

40
00:02:16,360 --> 00:02:20,199
If we represent this forwarding table as citer entries, this is what it looks like.

41
00:02:20,199 --> 00:02:24,799
Since in this simple example, all the prefixes are in terms of bytes, all of the prefixes

42
00:02:24,799 --> 00:02:28,199
have length 0, 8, 16 or 24 bits.

