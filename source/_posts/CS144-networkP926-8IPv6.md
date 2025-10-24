---
title: CS144 NetworkP926 8IPv6
---

1
00:00:00,000 --> 00:00:08,000
Another kind of IP address is Internet Protocol Version 6 or IPv6.

2
00:00:08,000 --> 00:00:16,000
So what we call the purpose of an IPv4 address originally was to allow you to stage multiple different networks together.

3
00:00:16,000 --> 00:00:24,000
So provide this globally unique identifier which would be usable across many different networks.

4
00:00:24,000 --> 00:00:33,000
But one of the problems that's emerged especially recently is that the IPv4 address space has only 32 bits.

5
00:00:33,000 --> 00:00:38,000
So the only 2 to 32 IPv4 addresses are approximately 4 billion.

6
00:00:38,000 --> 00:00:42,000
This seemed tremendous at the time back when the Internet was 60 nodes.

7
00:00:42,000 --> 00:00:46,000
But today it's actually a limiting factor.

8
00:00:46,000 --> 00:00:52,000
Generally for a variety of reasons, on any kind of numbering scheme like this, you look at telephone numbers etc.

9
00:00:52,000 --> 00:00:55,000
Or utilization never going to be 100%.

10
00:00:55,000 --> 00:01:04,000
So in fact, utilization of the IPv4 address space is around 35%, only 35% of the IPv4 address that are active at any time.

11
00:01:04,000 --> 00:01:12,000
And the challenge here is that if you don't have an IPv4 address then there is a way to communicate with IPv4.

12
00:01:12,000 --> 00:01:17,000
You need an IPv4 address to have IPv4 communication.

13
00:01:17,000 --> 00:01:22,000
The other side needs an address to send an IP packet to.

14
00:01:22,000 --> 00:01:32,000
And so realizing there's possibly this shortness, this scarcity of IPv4 addresses plus a couple of sort of crafty things that people saw on IPv4,

15
00:01:32,000 --> 00:01:40,000
work started on a new version of the Internet Protocol in 1994 called IPv6 or Internet Protocol Version 6.

16
00:01:40,000 --> 00:01:47,000
The basic protocol for IPv6 was published in 1998 and RFC 2460.

17
00:01:47,000 --> 00:01:50,000
And then there was a wall for a good while.

18
00:01:50,000 --> 00:01:59,000
Well still, let me think in 1998, this is just before a couple of two years, one year before the first.com Blooming Bubble.

19
00:01:59,000 --> 00:02:04,000
The Internet is taking off, but by no means the IPv4 address space is close to exhaustion.

20
00:02:04,000 --> 00:02:11,000
There is a wall of work, but there is an increased interest in around the 2003, 2006 timeframe.

21
00:02:11,000 --> 00:02:17,000
People started to get a better handle as to what were the challenges in IPv4 networks, what's important, what's not.

22
00:02:17,000 --> 00:02:23,000
How should we use IPv6 addresses based on current oricodalization and designs?

23
00:02:23,000 --> 00:02:30,000
And so today there's actually a hard push within the IETF as well as several governments to adopt IPv6.

24
00:02:30,000 --> 00:02:40,000
You can imagine especially countries or regions where growth of connectivity is very large, say in China.

25
00:02:40,000 --> 00:02:45,000
Their discursive IPv4 addresses is perhaps a greater concern.

26
00:02:45,000 --> 00:02:52,000
And so there's a big push today to get IPv6 deployed in use in the Internet as a whole.

27
00:02:52,000 --> 00:02:55,000
So what does an IPv6 address look like?

28
00:02:55,000 --> 00:03:03,000
So IPv6 rather than being limited to 2 to the 32 has 128 bits of address.

29
00:03:03,000 --> 00:03:10,000
So this is absolutely enormous, 2 to the 120. It's approximately 3.4 times 10 to the 38 addresses.

30
00:03:10,000 --> 00:03:16,000
This means that you could have 21 IPv6 addresses per square inch of the world's surface.

31
00:03:16,000 --> 00:03:22,000
So at least for the idea that an IPv6 address is going to name a device,

32
00:03:22,000 --> 00:03:29,000
as long as we have fewer than 21 devices per square inch, we'll be able to hold up at least on the Earth.

33
00:03:29,000 --> 00:03:34,000
Of course it might well be that these addresses are used for more than that, but still.

34
00:03:34,000 --> 00:03:39,000
And generally speaking, an IPv6 address is separated into two parts.

35
00:03:39,000 --> 00:03:43,000
There's the subnet prefix, the subnet prefix, which is, I say, length n,

36
00:03:43,000 --> 00:03:48,000
and the interface ID within that subnet 128 minus n bits long.

37
00:03:48,000 --> 00:03:55,000
So think of this similar to a site or a site or a site or class where you have the net mask

38
00:03:55,000 --> 00:04:01,000
describing what's the network identifier and then the set of nodes within that.

39
00:04:01,000 --> 00:04:09,000
Now you don't really want to write 128 bit addresses as 16 little octets.

40
00:04:09,000 --> 00:04:13,000
Plus often they have big regions of zeros and repetitions.

41
00:04:13,000 --> 00:04:16,000
And so IPv6 addresses are written differently than IPv4.

42
00:04:16,000 --> 00:04:29,000
Where IPv4 is written as a simple series of period-delimited integer values.

43
00:04:29,000 --> 00:04:34,000
IPv6 addresses are written in hexadecimal as eight blocks of 16 bits.

44
00:04:34,000 --> 00:04:37,000
So here's 16 bits.

45
00:04:37,000 --> 00:04:43,000
This is two hexadecimal. There's two zeros, there are one.

46
00:04:43,000 --> 00:04:48,000
And here's the second. There's a leading zero here, which has been highlighted.

47
00:04:48,000 --> 00:04:53,000
0, 4, 7, 0, 8, 0, 6, D, 1, colon, colon, 9.

48
00:04:53,000 --> 00:04:59,000
If you have a long run of zeros, you can omit a single one of those with colon, colon.

49
00:04:59,000 --> 00:05:02,000
So what this is really saying is, here's our first block.

50
00:05:02,000 --> 00:05:06,000
Here's our second block. Here's our third block.

51
00:05:06,000 --> 00:05:10,000
Here's our fourth block. This is our eighth block.

52
00:05:10,000 --> 00:05:14,000
Fifth, sixth, and seventh are all equal to zero.

53
00:05:14,000 --> 00:05:31,000
So if I were to write this address out fully, you'd see 2001, colon, 470, colon, 8, 0, 6, D, colon, 1, colon, 0, colon, 0, colon, 9.

54
00:05:31,000 --> 00:05:45,000
And there's a pre-fixling here of 64 saying that the subnet is 64, the last 64 bits to note the actual address of the note, which in this case is this.

55
00:05:45,000 --> 00:05:53,000
You can also, if you want to use an ipv6 address in HTTP and URL, say in a web browser, you can do it by putting into brackets.

56
00:05:53,000 --> 00:06:01,000
So this says to contact this node, this ipv6 address, port 80 in the URL.

57
00:06:01,000 --> 00:06:06,000
And it's also possible if you want to write the low 32 bits like ipv4, it was an ipv4 address.

58
00:06:06,000 --> 00:06:21,000
This because that's one way to make ipv4 addresses addressable from ipv6, is you have a leading 96 bits denoting this is an ipv4 address, and then you stick the ipv4 address at the end.

59
00:06:21,000 --> 00:06:29,000
So we have these enormous 120 bit addresses, which allow us to add many more devices to the internet.

60
00:06:29,000 --> 00:06:49,000
So how do you assign them? Currently, see look at ipv4, you have anna and anikan and rir's handing us slash 8s, then the rir's take the slash 8s, the blocks of 16 million addresses, and distribute them to companies or organizations or whatever as asked.

61
00:06:49,000 --> 00:06:58,000
And so it turns out that actually how you assign ipv6 addresses is gone through a couple of iterations, as people have gained better experience under Feynman.

62
00:06:58,000 --> 00:07:14,000
So for example, the first star of season this rc3177 said that generally want to give people slash 48, sometimes you want to give them a slash 64, very, very rarely give them a slash 128.

63
00:07:14,000 --> 00:07:37,000
So this would be that we have 48 bits identifying the network, 80 bits for this, then they can use the interface ID, sometimes we would get 64, we're then 64 to note the interface ID, and occasionally we have just essentially the single 128 bit to give them just one address to somebody.

64
00:07:37,000 --> 00:07:44,000
rfc6177 after many years of experience, this is a great idea.

65
00:07:44,000 --> 00:08:01,000
So you want to give out at least slash 64s, which I mean you don't want the 64 to be any higher than that, you'd not want to be giving out 128, so give out 64s, or maybe 60s even, you know our 56s as needed.

66
00:08:01,000 --> 00:08:11,000
Now observation is that 48 is a lot much more than almost anyone needs, and there are lots of cases where people need more than 164, and so you can allocate it.

67
00:08:11,000 --> 00:08:25,000
And then kind of like how ipv4 when you go to a regional internet registry, and you ask them for a block of addresses, they're going to ask you how many, and they're going to make decisions whether or not you ask say for a slash,

68
00:08:25,000 --> 00:08:37,000
23, they're going to decide whether you really need that number of addresses in this case, 512 addresses.

69
00:08:37,000 --> 00:08:48,000
And in the same way today RIRs can decide on the allocation size, so you get a 64, you get a 60, you get a 56, et cetera.

70
00:08:48,000 --> 00:08:58,000
Great, we have this way of distributing IPv4 of IPv6 addresses, so how do we actually get an IPv6 address?

71
00:08:58,000 --> 00:09:16,000
So if you look at something like DHCP, you basically need to ask for an IPv4 address, and it's independent of anything else, but the IPv6 address space is so much larger, it might be you can do something a lot simpler and just simplify the configuration devices, and exactly what it does.

72
00:09:16,000 --> 00:09:34,000
So it turns out that if you have a slash 64 subnet, that is your organization has a slash 64, so 64 bit subnet identifier network identifier, you can then automatically generate your own IPv6 address just from this subnet identifier.

73
00:09:34,000 --> 00:09:48,000
So it turns out that ethernet cards is assuming so using ethernet, basically almost everybody uses today. Ethernet devices have 48 bit, they have a 48 bit unique identifiers, their layer to address identifies the actual device.

74
00:09:48,000 --> 00:09:54,000
It's a specified manufacturing, it's baking the card off in your group program, but it's baked into the card.

75
00:09:54,000 --> 00:10:12,000
And so the IP, the ethernet address looks something like this, where there's a manufacturer code, saying, oh, this was made say by Apple, or is made by Dell, or is made by Oracle, or is made by HP, or Cisco.

76
00:10:12,000 --> 00:10:28,000
So these codes are what organization gives out, and then when an organization needs a code, it can then use the lower 24 bits to basically produce a 16 million devices with that code.

77
00:10:28,000 --> 00:10:30,000
If it's a new code, it gets a new code.

78
00:10:30,000 --> 00:10:36,000
And the zero here is the node just for unit cast MAC address, the G is zero, and there's a unit cast MAC address.

79
00:10:36,000 --> 00:10:58,000
And so what you do is you take this ethernet address, this 48 bit ethernet unique identifier, and you perform a transformation, you basically add some ones in the middle, you flip to zero, or you flip to zero, and you add FFFE, so F, F, E into the middle.

80
00:10:58,000 --> 00:11:03,000
And you can then get a 64 bit identifier.

81
00:11:03,000 --> 00:11:24,000
So now if I know my organization's 64 bit subnet ID, let's just say it's X, and I know my ethernet address from my hardware card, which is say, you know, Y, I can then take Y, put it through this function, and now my IPv6 address is just those first 64 bits, and then these latter 64 bits.

82
00:11:25,000 --> 00:11:28,000
And so this specified an RFC 4291.

83
00:11:28,000 --> 00:11:42,000
And so here's an example of how you have with a large address space, and that the size of the address space being 128 bits, actually gives you great deal flexibility in terms of assigning addresses.

84
00:11:42,000 --> 00:11:50,000
So for example, one thing you could point out is every single ethernet device has these same two bytes in it.

85
00:11:50,000 --> 00:11:52,000
You're not, you're not going to reuse them.

86
00:11:52,000 --> 00:12:05,000
So in some ways that's flexible, because it's nice if we want to do something besides ethernet we know, as long as we don't match these bits, then we can generate an IPv6 address, which will not collide with the ethernet device.

87
00:12:05,000 --> 00:12:14,000
But essentially just that tremendous plenitude of addresses gives us a bunch of flexibility and can simplify management and simplify configuration.

88
00:12:14,000 --> 00:12:16,000
So in that way, IPv6 is really nice.

