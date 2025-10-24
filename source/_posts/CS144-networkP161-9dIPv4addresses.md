---
title: CS144 NetworkP161 9dIPv4addresses
---

1
00:00:00,000 --> 00:00:03,000
So how are IP addresses assigned?

2
00:00:03,000 --> 00:00:07,000
Originally, they were broken up into three classes, Class A, Class B and Class C.

3
00:00:07,000 --> 00:00:11,000
Each class separated an IP address into two parts, Network and Host.

4
00:00:11,000 --> 00:00:14,000
The network part of the address denoted and administered to the main such as MIT,

5
00:00:14,000 --> 00:00:16,000
BBN, or Stanford University.

6
00:00:16,000 --> 00:00:19,000
The host part of the address donated a witch device on that network.

7
00:00:19,000 --> 00:00:24,000
Class A addresses, how does it lead in zero, seven bits of network for 128 networks,

8
00:00:24,000 --> 00:00:28,000
and 24 bits of host, so a class I could cover 16 million computers.

9
00:00:28,000 --> 00:00:33,000
Class B addresses had 16 bits of host, so it could cover 65,536 computers.

10
00:00:33,000 --> 00:00:38,000
Class C addresses had 8 bits of host, so it could cover 256 computers.

11
00:00:38,000 --> 00:00:44,000
While Class A, B, and C are simple, we quickly found out they were not flexible enough.

12
00:00:44,000 --> 00:00:48,000
For example, both MIT and Stanford received one of the first Class A address blocks,

13
00:00:48,000 --> 00:00:50,000
over 4 million addresses.

14
00:00:50,000 --> 00:00:54,000
For a while, MIT would give each of its dorms the equivalent of a Class B,

15
00:00:54,000 --> 00:00:58,000
65,000 addresses for a few hundred people at most.

16
00:00:58,000 --> 00:01:01,000
When IP addresses were plentiful, this was a problem, but as their use increased,

17
00:01:01,000 --> 00:01:03,000
we needed a better allocation policy.

18
00:01:03,000 --> 00:01:09,000
Useful note, Stanford gave a bits Class A block in 1999, MIT still has it.

19
00:01:09,000 --> 00:01:13,000
Today, IPv4 addresses are structured through something called CIDER,

20
00:01:13,000 --> 00:01:15,000
or Classless Interdomain Routing.

21
00:01:15,000 --> 00:01:19,000
Rather than have prefixes only of length 8, 16, and 24 bits,

22
00:01:19,000 --> 00:01:22,000
CIDER allows prefixes to be any number of bits.

23
00:01:22,000 --> 00:01:28,000
This means all CIDER prefixes define a block of addresses that is a power of two in size.

24
00:01:28,000 --> 00:01:31,000
When we talk about CIDER addresses, we refer to its net mask length.

25
00:01:31,000 --> 00:01:36,000
So, for example, we talk about a slash 16, we mean a net mask of length 16.

26
00:01:36,000 --> 00:01:42,000
This CIDER block describes two of the 16 addresses, or 60,5,536 addresses.

27
00:01:42,000 --> 00:01:46,000
When we talk about a slash 20, we mean a net mask of length 20.

28
00:01:46,000 --> 00:01:52,000
This CIDER block describes two of the 12 addresses, or 4,096 addresses.

29
00:01:52,000 --> 00:01:56,000
CIDER blocks are how addresses are structured, addressed, and managed today.

30
00:01:56,000 --> 00:02:03,000
Today, Stanford has five slash 16 blocks, about 325,000 IPv4 addresses.

31
00:02:03,000 --> 00:02:06,000
So, how are IPv4 addresses allocated and managed?

32
00:02:06,000 --> 00:02:11,000
There's an organization called IANA, or for the Internet Assign Numbers Authority.

33
00:02:11,000 --> 00:02:15,000
The ultimate authority is ICANN, the Internet Corporation for the Assignment of Names and Numbers.

34
00:02:15,000 --> 00:02:17,000
I can't delegate the work to IANA.

35
00:02:17,000 --> 00:02:24,000
IANA gives us slash 8s, describing 16 million addresses to regional Internet registries called RIRs.

36
00:02:24,000 --> 00:02:27,000
Each continent has its own RIR.

37
00:02:27,000 --> 00:02:32,000
The RIR for the United States is Aaron, where the RIR for the Western Pacific is AppNIC.

38
00:02:32,000 --> 00:02:38,000
These RIRs each have their own policy for how they break up the slash 8s into smaller blocks of addresses

39
00:02:38,000 --> 00:02:40,000
and assign them to parties who need them.

40
00:02:40,000 --> 00:02:43,000
You might have read in the news that we have run out of IP addresses.

41
00:02:43,000 --> 00:02:46,000
This isn't true. There are many unused addresses today.

42
00:02:46,000 --> 00:02:53,000
What did happen is that IANA ran out of slash 8s to give out, reached a special encase in its charter.

43
00:02:53,000 --> 00:02:59,000
When reduced to its last five slash 8 blocks, IANA gave one slash 8 to each RIR.

44
00:02:59,000 --> 00:03:02,000
Now, address management and allocation is up to the RIRs.

45
00:03:02,000 --> 00:03:06,000
In 2012, John Peterson, who is then a member of the Internet Architecture Board,

46
00:03:06,000 --> 00:03:11,000
gave a target Stanford and some of the political, economic, and technical complications that this raises.

47
00:03:11,000 --> 00:03:17,000
This talk isn't required material for the course, but I recommended highly, and you should be able to find it on the website.

48
00:03:17,000 --> 00:03:24,000
So now you've seen the structure of IP before addresses, how they're allocated, and how end-host make their first-hop writing decisions.

49
00:03:24,000 --> 00:03:28,000
That is, whether it is sent to a local load or to their gateway router.

50
00:03:28,000 --> 00:03:33,000
Addresses there are managed in terms of side-er blocks, whose size is defined by their prefix length.

51
00:03:33,000 --> 00:03:39,000
A shorter prefix, say a slash 8, is a larger block than a longer prefix, say a slash 10.

