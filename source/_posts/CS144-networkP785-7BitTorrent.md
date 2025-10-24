---
title: CS144 NetworkP785 7BitTorrent
---

1
00:00:00,000 --> 00:00:04,500
So let's talk about BitTorn. It's a fast-ending internet application with a lot of interesting

2
00:00:04,500 --> 00:00:08,939
algorithms and approaches. There are reasons why it works so well.

3
00:00:08,939 --> 00:00:12,200
BitTorn allows people to share and exchange large files.

4
00:00:12,200 --> 00:00:15,860
BitTorn client requests documents from other clients.

5
00:00:15,860 --> 00:00:19,019
So the single client can request from many others in parallel.

6
00:00:19,019 --> 00:00:22,219
BitTorn breaks up files on a chunks of data called pieces.

7
00:00:22,219 --> 00:00:24,800
When a client downloads a piece from another client,

8
00:00:24,800 --> 00:00:28,400
then it tells other clients that have that piece so they can download it too.

9
00:00:28,399 --> 00:00:31,699
These collections of collaborating clients are called swarms.

10
00:00:31,699 --> 00:00:35,659
So we can talk about a client joining or leaving the swarm.

11
00:00:35,659 --> 00:00:40,320
A client joins a swarm by downloading a Torn file that tells the information about the

12
00:00:40,320 --> 00:00:44,280
file, such as how big it is, the size of its pieces, and how to start contacting other

13
00:00:44,280 --> 00:00:45,980
clients.

14
00:00:45,980 --> 00:00:49,579
It used to be the Torn when a tracker, a computer that keeps track of what clients

15
00:00:49,579 --> 00:00:53,759
are part of the swarm. When a client joins the swarm, it requests a list of other clients

16
00:00:53,759 --> 00:00:58,079
from the tracker. Then starts contacting these clients over TCP.

17
00:00:58,079 --> 00:01:04,420
A BitTorn client can have on the order of 100 open TCP connections at once.

18
00:01:04,420 --> 00:01:08,920
After tracker started receiving a lot of unwanted attention in late 2000s, most clients'

19
00:01:08,920 --> 00:01:14,000
transitions to using tracker list currents. These torrents contact a host that tells them

20
00:01:14,000 --> 00:01:17,359
how to join something called the Distributed Hash Table or DHT.

21
00:01:17,359 --> 00:01:23,000
DHT is a way to map hash value to a node where a set of nodes supporting that DHT can

22
00:01:23,000 --> 00:01:27,719
change a lot, you can still find the node. So rather than use a centralized table for

23
00:01:27,719 --> 00:01:32,480
this lookup, the mapping is actually distributed across all of the participating nodes.

24
00:01:32,480 --> 00:01:37,760
It's basically a way for some nodes to collaboratively store some data. In this case, the strong

25
00:01:37,760 --> 00:01:41,519
lists of which clients are part of a swarm.

26
00:01:41,519 --> 00:01:49,400
BitTorn breaks a file up into N pieces. Each piece is 256 kilobytes or larger. This size

27
00:01:49,400 --> 00:01:54,519
is intended to ensure a TCP stream transferring the file is long lived enough that its congestion

28
00:01:54,519 --> 00:01:58,599
window can grow to a reasonable size and so support good throughput.

29
00:01:58,599 --> 00:02:03,640
But BitTorn also breaks up pieces into sub-pieces so that it can request parts of pieces from

30
00:02:03,640 --> 00:02:07,359
multiple peers and so reduce latency.

31
00:02:07,359 --> 00:02:13,240
A piece is also the unit that BitTorn uses to check integrity with. A torrent contains

32
00:02:13,240 --> 00:02:19,639
the SHA1 hashes of each piece. SHA1 is something called the cryptographic hash function. If the

33
00:02:19,639 --> 00:02:25,599
primitive used in mis-message authentication codes. A strong cryptographic hash function

34
00:02:25,599 --> 00:02:30,199
has the properties that, given a hash, it's really hard to create a piece of data that

35
00:02:30,199 --> 00:02:36,759
has that hash value. That means that if the torrent says that the hash of piece 5 is

36
00:02:36,759 --> 00:02:42,599
H, it's hard to come up with a piece that isn't piece 5, which also has hash H. So you

37
00:02:42,599 --> 00:02:46,639
can't start replacing the pieces of the torrent and screw it up without a client noticing

38
00:02:46,639 --> 00:02:51,799
that the hash isn't right in retrying. So this actually brings up an interesting story.

39
00:02:51,799 --> 00:02:57,879
In 2006, HBO had a new series called Rome. There were several different torrents for it,

40
00:02:57,879 --> 00:03:03,079
each of which had very large swarms. But many people found their clients couldn't download

41
00:03:03,079 --> 00:03:08,679
the series. Looking into it, it turns out there are a bunch of very, very fast peers that

42
00:03:08,679 --> 00:03:14,159
many clients were connecting to and downloading from. But these peers provided pieces that

43
00:03:14,159 --> 00:03:19,639
didn't have the right hash. So a client would download the piece, find the hash is wrong,

44
00:03:19,639 --> 00:03:25,639
throw away the piece and retry. Back then, the clients assumed that this was just an error

45
00:03:25,639 --> 00:03:30,840
and so kept on requesting from the same peer. So many clients would just enter an unending

46
00:03:30,840 --> 00:03:36,840
loop of trying to download the same bad piece. The hypothesis was that this was an effort

47
00:03:36,840 --> 00:03:42,800
by HBO to prevent downloads. Nowadays, clients can blacklist peers that serve up many bad

48
00:03:42,800 --> 00:03:49,560
pieces. Bit torrent clients, when connected, periodically exchange information on what pieces

49
00:03:49,560 --> 00:03:56,400
they have. A client tries to download the rarest piece among its peers first. If a single

50
00:03:56,400 --> 00:04:02,200
piece becomes unavailable, nobody can download the file. Also, if only if a few clients have

51
00:04:02,200 --> 00:04:06,720
a piece, they'll become a bottleneck for downloading. This is called the rarest first

52
00:04:06,720 --> 00:04:12,680
policy. The one exception to the rarest first policy is when a client reaches the end

53
00:04:12,680 --> 00:04:18,360
of the torrent and only needs a few more pieces. At this point, it requests for pieces from

54
00:04:18,360 --> 00:04:23,959
multiple peers. It does this to counter the edge case of asking for the last piece from

55
00:04:23,959 --> 00:04:29,199
a very slow peer and having to wait. So this final step means that the client might download

56
00:04:29,199 --> 00:04:34,319
multiple copies of sub-pieces and waste swarm bandwidth. But since they're often 1,000

57
00:04:34,319 --> 00:04:40,759
or so pieces in a swarm, this costs as small and so worth it. So bit torrent clients

58
00:04:40,759 --> 00:04:46,159
exchange metadata with each other to learn what pieces they have. A client starts requesting

59
00:04:46,159 --> 00:04:52,199
pieces from its peers. But if you send data to every peer, you'd have lots of very slow

60
00:04:52,199 --> 00:04:59,519
pieces. Instead of having 100 slow TCP flows, Bit torrent tries to have a smaller number

61
00:04:59,519 --> 00:05:06,759
of fast flows. The idea is you send data to peers who send you data. That way, peers who

62
00:05:06,759 --> 00:05:14,480
contribute can download faster. This creates an incentive to send pieces to peers. The way

63
00:05:14,480 --> 00:05:21,800
this works is through choking. Most peers are choked and so you send no data to them. Bit torrent

64
00:05:21,800 --> 00:05:26,519
measures the rate of which it is downloading from each of its peers and picks the P best

65
00:05:26,519 --> 00:05:31,719
of them. P is usually a small number like 4 or the square root of the number of peers. It

66
00:05:31,720 --> 00:05:38,800
chokes these P peers and sends data to them. This algorithm is called TIT for TAT. You send

67
00:05:38,800 --> 00:05:45,080
data to nodes that send you data. One problem with this algorithm is that it doesn't explore

68
00:05:45,080 --> 00:05:49,200
much. There could be a really good peer out there who could send you data very fast if

69
00:05:49,200 --> 00:05:54,760
only you started sending some data first. So every 30 seconds or so, Bit torrent unchokes

70
00:05:54,759 --> 00:06:01,240
a random peer. This peer might then find its way into the P best.

71
00:06:01,240 --> 00:06:05,680
The Bit torrent TIT for TAT algorithm seems pretty robust. You send data preferentially to

72
00:06:05,680 --> 00:06:11,519
other peers who send you data. But it's not perfect. There was a nice paper in 2007 that

73
00:06:11,519 --> 00:06:17,159
proposed a legal bit tyrant which selfishly tried to game the system. And it did. Using

74
00:06:17,159 --> 00:06:23,680
Bit torrent you could increase your Bit torrent throughput by 70%. The basic observation

75
00:06:23,680 --> 00:06:29,800
bit tyrant is that in that standard Bit torrent a peer tries to share its uplink capacity

76
00:06:29,800 --> 00:06:36,680
evenly across its unchoked peers. So if a client has P unchoked peers then each one receives

77
00:06:36,680 --> 00:06:43,120
one over P of its uplink capacity. But once you're in this top P you get all of this. So

78
00:06:43,120 --> 00:06:48,120
the trick is that you want to give a peer just enough to make your way into its top P

79
00:06:48,120 --> 00:06:53,360
and no more. You should then spend the extra capacity trying to get into another peers

80
00:06:53,360 --> 00:06:59,560
top P. So this way you give everyone just enough that they unchoke you and maximize how

81
00:06:59,560 --> 00:07:05,699
many peers unchoke you. It's a nice result. They also found that if everyone used Bit

82
00:07:05,699 --> 00:07:09,920
tyrant performance can improve slightly but you get the most benefit if you're the only

83
00:07:09,920 --> 00:07:16,040
tyrant. The URL here links to the paper. So that's a basic overview of Bit torrent. You're

84
00:07:16,040 --> 00:07:21,160
client downloads a torrent file for example over HTTP. This describes the file to download

85
00:07:21,160 --> 00:07:25,240
and how to find peers to download it from. Bit torrent breaks the file into pieces and

86
00:07:25,240 --> 00:07:29,840
peers exchange these pieces. They connect to RTCPIP and exchange metadata so they know

87
00:07:29,840 --> 00:07:34,320
what the distribution of pieces is over their part of the swarm. A client then tries to

88
00:07:34,320 --> 00:07:39,040
download the rarest piece first in order to balance availability. Client's upload data

89
00:07:39,040 --> 00:07:44,360
only to their top P. Downloaders. So most of the peers are choked and receive no data

90
00:07:44,360 --> 00:07:49,040
and the client gives data to those who give you data using a tit for tat algorithm. To discover

91
00:07:49,040 --> 00:07:53,439
potentially good new peers, the client also randomly unchokes a peer periodically.

