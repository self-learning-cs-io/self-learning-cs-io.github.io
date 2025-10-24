---
title: CS144 NetworkP805 9DNS2
---

1
00:00:00,000 --> 00:00:07,000
This video goes into the details of what DNS queries actually look like and their format and their structure.

2
00:00:07,000 --> 00:00:10,000
So queries and the resource records that compose them.

3
00:00:10,000 --> 00:00:22,000
So recall, a DNS query starts from a client, say it asks a resolver, what's www.stampford.edu, and is there a cursor query?

4
00:00:22,000 --> 00:00:36,000
And then a resolver might either answer from its cache or use cache entries, and if it doesn't have a cache entry for any stage of the query, it can ask questions from external servers.

5
00:00:36,000 --> 00:00:44,000
So who would I ask about edu? Who would I ask about stanford.edu?

6
00:00:44,000 --> 00:00:52,000
Hey, what's www.stampford.edu?

7
00:00:52,000 --> 00:01:07,000
Each of these are non-recursive queries, and the resolver then caches those results.

8
00:01:07,000 --> 00:01:12,000
So edu stanford.edu and www.stampford.edu.

9
00:01:12,000 --> 00:01:25,000
So that's a query at a high level, but the way DNS works is that all DNS information, so every DNS message, is represented in terms of things called resource records, RRs.

10
00:01:25,000 --> 00:01:28,000
And the form of resource record is generally pretty simple.

11
00:01:28,000 --> 00:01:35,000
It has a name, also a kind of resource record, sort of the name of the name associated with this record.

12
00:01:35,000 --> 00:01:41,000
There can be a time to live in a class, then there's the type of record, and then the record data.

13
00:01:41,000 --> 00:01:47,000
So for example, a resource record would be named, say www.stampford.edu.

14
00:01:47,000 --> 00:01:51,000
So this is a record for www.stampford.edu.

15
00:01:51,000 --> 00:01:57,000
TTL, how long is this record good? Class? This is the address class.

16
00:01:57,000 --> 00:02:04,000
So typically it's almost always I am one of the, it's class one, so for this for an internet, for the internet.

17
00:02:04,000 --> 00:02:08,000
There's the type of the record, and then the data.

18
00:02:08,000 --> 00:02:14,000
And so here I'm going to walk through two critical RR types, resource record types.

19
00:02:14,000 --> 00:02:20,000
Type A, which is an IPv4 address, and NS, which is a name server.

20
00:02:20,000 --> 00:02:24,000
So an A record tells you an address associated with the name.

21
00:02:24,000 --> 00:02:29,000
So it'll say type A, the R data is an address associated with the name.

22
00:02:29,000 --> 00:02:38,000
Whereas a name server record, an NS record, will tell you the address of a name server associated with the name.

23
00:02:38,000 --> 00:02:49,000
So greatly to explore DNS, and what records look like, and what kinds of records you get, is to use this tool called DIG, which I'll use several times.

24
00:02:50,000 --> 00:02:56,000
A DNS message, an actual DNS message, it's structure looks like this, it's specified in RFC 1035.

25
00:02:56,000 --> 00:03:01,000
So beginning there's a header, which describes overall what's in the message.

26
00:03:01,000 --> 00:03:06,000
There's the question that this message is for, if it's a query, then it's the question of the query.

27
00:03:06,000 --> 00:03:10,000
If it's a response, then it's the question it's a response to.

28
00:03:10,000 --> 00:03:17,000
And then there are other sections, which are empty and queries, the answer, authority, and additional sections.

29
00:03:17,000 --> 00:03:23,000
So it's possible, for example, to send a DNS query with multiple questions, and if you want, each of these can have multiple entries.

30
00:03:23,000 --> 00:03:30,000
So there's a header, and the question, answer, authority, and additional sections are all made up of resource records.

31
00:03:30,000 --> 00:03:33,000
So let's look at an example of this.

32
00:03:33,000 --> 00:03:41,000
So if I dig www.stanford.edu, now this simply is a dig.

33
00:03:41,000 --> 00:03:50,000
I'm asking, I'm basically saying I'd like to send a DNS query for the address of www.stanford.edu.

34
00:03:50,000 --> 00:03:53,000
And this is what we see come back.

35
00:03:53,000 --> 00:04:03,000
So here's the day output, I'll tell you the version of dig, here's the header, some header information, I'll talk a little bit more about that later.

36
00:04:03,000 --> 00:04:08,000
So here's the question, I was asking for an address record of www.stanford.edu.

37
00:04:08,000 --> 00:04:12,000
So you see here's a resource record within the question section.

38
00:04:12,000 --> 00:04:16,000
And the answer has two records in it.

39
00:04:16,000 --> 00:04:22,000
The first is what's called a C name record, which I'll talk a little bit more later.

40
00:04:22,000 --> 00:04:32,000
Basically it says that www.stanford.edu is actually the canonical name for that, so it's C name stands for, C name stands for, is www-v6.stanford.edu.

41
00:04:32,000 --> 00:04:38,000
So there are six different, maybe there are six different, uh, well-o-app servers for stanford.

42
00:04:38,000 --> 00:04:48,000
Then the address of www-v6, uh, here's, here's the internet, uh, I ends, it's I-N-1, that's the class, TTL's 1800.

43
00:04:48,000 --> 00:04:52,000
This is an A record, and it's for this address.

44
00:04:52,000 --> 00:05:00,000
In addition to that, the authority section, uh, is telling me who are the authoritative names, these are the NS, the name server records for stanford.edu.

45
00:05:00,000 --> 00:05:05,000
So here are all of these different servers I could ask about addresses in stanford.

46
00:05:05,000 --> 00:05:09,000
Um, an additional section then gives me a whole bunch of just additional stuff.

47
00:05:09,000 --> 00:05:20,000
Like here's the address record for argus, here's the address record for erathea, here's the address record for Atlanta, here's the uh, Atlanta, here's the address record for avalan.

48
00:05:20,000 --> 00:05:27,000
This one where you think of what DNS is often doing, and the reason why you see this message is so big is that, given that it's going to send a response,

49
00:05:27,000 --> 00:05:33,000
it tries to send you a whole bunch of extra data, a whole bunch of extra information just to maybe prevent you from asking over query.

50
00:05:33,000 --> 00:05:40,000
And so these are A records, these are IPv4 addresses, uh, so quad A records, AA, AA, these are IPv6 addresses.

51
00:05:40,000 --> 00:05:53,000
And so it turns out stanfords, uh, DNS server is giving me not only the address records, um, of the stanford name servers, but also there, not only the A record, but also the IPv6, in case I want to query them over IPv6.

52
00:05:53,000 --> 00:06:06,000
So this is what a response to a DNS query looks like. So you can see that there's the header, there's the question section, the answer section, the authority section, and then the additional section.

53
00:06:06,000 --> 00:06:20,000
So if you look inside the header, um, it's specified in our c10, uh, 35, um, the header is, uh, 10 bytes long, uh, sorry, 12 bytes long, so it's pretty short.

54
00:06:20,000 --> 00:06:31,000
Uh, the first two bytes are an ID, this you compare queries and responses. Um, and then the second, so the first two bytes is an ID, the second two bytes are a bunch of flags.

55
00:06:31,000 --> 00:06:40,000
So there's the first that bet I mentioned, whether this is a query or response, there is an op code, uh, so standard queries.

56
00:06:40,000 --> 00:06:50,000
And there's a return code, if there's an error code, there's a bunch of flags. Um, so is this an authoritative answer is this truncated all of these, uh, such a thing.

57
00:06:50,000 --> 00:06:58,000
So you can see here, and the bottom recursion desired recursion available. So there are ways where you can, in fact, ask your resolver, a fri non recursive query, if you want.

58
00:06:58,000 --> 00:07:08,000
Then after these first four bytes, there are four two byte values, which say how many, uh, resource records are there in each section.

59
00:07:08,000 --> 00:07:19,000
So, um, how many queries are there? How many, um, answers are there? How many, uh, uh, authorities are there? Um, and how many additional records are there?

60
00:07:19,000 --> 00:07:27,000
Now then within each of these, of the, the four sections that have resource records, resource records is pretty simple.

61
00:07:27,000 --> 00:07:42,000
Um, it has a name that could be a variable number of, of bytes long playing along it is, um, then there's a type class, the TTL, um, within an RD length field specifying the R data.

62
00:07:42,000 --> 00:07:49,000
So here, here's the basic DNS name, then the type, then the class TTL RD length, our data.

63
00:07:49,000 --> 00:07:56,000
And so this is what the, sort of the on the wire with the byte format of a resource record looks like.

64
00:07:56,000 --> 00:08:03,000
Now notice that the beginning of a resource record is a name, but it doesn't say how long the name is. That's because the length of the name is self describing.

65
00:08:03,000 --> 00:08:10,000
Um, it turns out the DNS does a lot of name compression because it's trying to pack everything into 512 bytes.

66
00:08:10,000 --> 00:08:18,000
Uh, then names that are repeated through the packet are just rather than repeated are just referenced.

67
00:08:18,000 --> 00:08:27,000
Um, and so imagine if I'm asking a query about say, uh, www.standford.edu, um, I don't know if you want to have the repeated many times in the packet.

68
00:08:27,000 --> 00:08:29,000
I can just put it once and then refer to it.

69
00:08:29,000 --> 00:08:36,000
So the first thing that DNS does is it breaks a name into separate labels related to the steps of the hierarchy.

70
00:08:36,000 --> 00:08:43,000
So www.standford.edu is three separate labels, www.standford.edu.

71
00:08:43,000 --> 00:08:49,000
Then each label is encoded as a length and then text values.

72
00:08:49,000 --> 00:08:56,000
The length is in binary. So it's basically, uh, some number. It's just one, um, one byte.

73
00:08:56,000 --> 00:08:59,000
Um, and then the text is in ASCII.

74
00:08:59,000 --> 00:09:06,000
So for example, uh, if I were to include three, www. So www is 0x77.

75
00:09:06,000 --> 00:09:10,000
The way this is encoded in the bits in the packet is 037777777.

76
00:09:10,000 --> 00:09:14,000
So this tells me these are three bytes and here they are.

77
00:09:14,000 --> 00:09:23,000
Um, now one trick then that the name compression uses in order to take advantage of the fact the names will be longer repeated several times in the packet.

78
00:09:23,000 --> 00:09:35,000
Um, is if the length field here in the label is greater than 192, um, that is some of the hierarchy of bits are set.

79
00:09:35,000 --> 00:09:41,000
Um, then the next 14 bits specify an offset in the packet.

80
00:09:41,000 --> 00:09:51,000
Um, and so the way you think of this is that if I see here that the first two bits of the length, um, so 128 plus 64 is 192, or 11,

81
00:09:51,000 --> 00:10:03,000
then this length is actually two bytes long, this length field, and the later 14 bits specify, specify an offset in the packet.

82
00:10:03,000 --> 00:10:19,000
So for example, if I see 0x, 0, 0c, this means that the name that this label, that this label of first two is at this value minus, um, take out those first two bits is at offset 12 within the packet.

83
00:10:19,000 --> 00:10:31,000
So if I were to go to offset 12, that's the label of this refers to. So if I something like Stanford, which is eight characters long, rather than repeat Stanford many times, would actually be the ninth to the length, right?

84
00:10:31,000 --> 00:10:46,000
I'd be 0 at, I'd be 0x, 0, 8, then the bytes of Stanford, I can just say 0x, c0, and then the offset of Stanford, it'll be only two bytes long.

85
00:10:46,000 --> 00:10:53,000
So this is a little bit detailed, but it's important for when I'm going to open up bar, so I can show you what some DNS queries and responses look like.

86
00:10:53,000 --> 00:11:00,000
Otherwise, it can be really hard to figure out what these resource records and what are these weird values that aren't actually specifying names.

87
00:11:00,000 --> 00:11:06,000
So just to give you an idea, so what a DNS, what a DNS A or address record looks like.

88
00:11:06,000 --> 00:11:18,000
So this is say for market.scs.stantford.edu. So the first the name region would say market.scs.stantford.edu. This might be compressed, so it might be much shorter.

89
00:11:18,000 --> 00:11:25,000
Then the next two bytes would say 1, this is an address record, the next two bytes would say 1, this is for the internet.

90
00:11:25,000 --> 00:11:36,000
The next four bytes say 3600, so the TTL of this record the time to live is an hour.

91
00:11:36,000 --> 00:11:43,000
Then the length of the R data, the length of the internet address is 4 bytes, and then here are the 4 bytes.

92
00:11:43,000 --> 00:11:52,000
And so if you see it printed out, say if you're using dig, you'd see this, but the overall record actually looks like this.

93
00:11:52,000 --> 00:12:00,000
And an s record say the name server record for scs.stantford.edu looks similar, where here we have scs.stantford.edu in the name section.

94
00:12:00,000 --> 00:12:09,000
Again, it might be compressed, then we have two saying that this is an ns record against the internet, time to live 3600.

95
00:12:09,000 --> 00:12:18,000
And then the length is say 10, because it turns out that scs.stantford.edu is compressed because, well, it's been mentioned elsewhere.

96
00:12:18,000 --> 00:12:36,000
So really have mission, 1, 2, 3, 4, 5, 6, 7, right? And then we have the 1, the 1, the length for mission, and then the 2, which is the compressed indication of scs.stantford.edu.

97
00:12:36,000 --> 00:12:47,000
So the first two bytes in the R data are going to point to scs.stantford.edu, then we have a byte saying the length of mission is 7, and the 7 mission bytes for a total of 10 bytes.

98
00:12:47,000 --> 00:12:54,000
So let's dig for market.scs.stantford.edu. So just use the tool, see what happens.

99
00:12:54,000 --> 00:13:00,000
So we're asking what is the address of market.scs.stantford.edu? So we're asking for an address record. We get the answer.

100
00:13:00,000 --> 00:13:07,000
It's address is 17166.3.10, and here's the time to live of 2050.

101
00:13:07,000 --> 00:13:16,000
30 section. Here are the name servers that answered, can answer this question. Here's a bunch of them.fs.n, mission.scs.stantford.edu.

102
00:13:16,000 --> 00:13:22,000
And here's some additional information, address records for these name servers.

103
00:13:22,000 --> 00:13:37,000
So that's what this looks like when you asked it. We can also ask dig what is the NS record for market for scs.stantford.edu.

104
00:13:37,000 --> 00:13:45,000
And so here's recurring for the NS record.scs.stantford.edu. You can see there's a whole bunch of name servers that serve scs.stantford.edu.

105
00:13:45,000 --> 00:13:53,000
NS3, NS1, garage, market, mission. And then here's the additional section which is giving you their IP addresses.

106
00:13:53,000 --> 00:14:00,000
Some of them are just IPv4 addresses. Some of them are IPv4 and IPv6 addresses.

107
00:14:00,000 --> 00:14:08,000
And so here we can see there's so many name servers and what that means is that if any one of these goes down, I can still ask, I can still go to another one.

108
00:14:08,000 --> 00:14:20,000
So even if say three of these name servers went down, let's say the NS3, garage, and market, I can still contact NS1 or mission to ask questions about names in scs.stantford.edu.

109
00:14:20,000 --> 00:14:31,000
So now let's see what those queries look like in Wireshark. So here I've opened a Wireshark and I set up a filter at UDPport53. So that's the DNS port and IP address.

110
00:14:31,000 --> 00:14:38,000
There's going to look at DNS requests and responses from my machine.

111
00:14:38,000 --> 00:14:44,000
And so if we were to ask this question, digmarket.scs.stantford.edu.

112
00:14:44,000 --> 00:14:52,000
And we see we get a query and a response. And so here's the standard DNS query.

113
00:14:52,000 --> 00:15:01,000
Again, internet protocol version four source. There's my DNS server.

114
00:15:01,000 --> 00:15:04,000
And so here's the query.

115
00:15:04,000 --> 00:15:11,000
There's a standard query. There's one question, no other records.

116
00:15:11,000 --> 00:15:25,000
And so the question is market.scs.stantford.edu. Type A. So I'm asking for an address record class, I-N, name market.scs.stantford.edu, type A, host address, class, internet.

117
00:15:25,000 --> 00:15:35,000
And so here, in fact, we're looking inside the bytes of the packet. Here's all this information about the size, right? We can see here down in these bytes, 0, 0, 0, 0, 0, 0.

118
00:15:35,000 --> 00:15:50,000
Here is, this is the header of the DNS transaction ID right there, 0x3eA, flags, questions, etc. 0, 0. Then here's the query itself.

119
00:15:50,000 --> 00:16:03,000
So this is the query section. This is market.scs.stantford.edu. If you look down at the bytes, this byte, this first byte for market is 06. That's because market is six characters long.

120
00:16:03,000 --> 00:16:22,000
So we have 06, then M-A-R-K-E-T, then SCS, which is three. So three long, three SCS. Then Stanford, which is eight long. So here's eight ST-AN-F-OR-D, then three long EDU.

121
00:16:22,000 --> 00:16:33,000
And then that's the, and then type A, so 0, 1, class, IN, 0, 1. Great. Now if we look at the response, it's a lot more complicated.

122
00:16:33,000 --> 00:16:45,000
Because remember how many entries there are in response. So let's look inside this. So it's telling us it's for the transaction ID, 0, 3eA-A, Santa Cruz, sponsor, or error. There is one question.

123
00:16:45,000 --> 00:17:03,000
One answer, five authorities, seven additional. Now let's look at the query section. So the query here, you can see again market.scs.stantford.edu, type A, class, IN. And so here's the answer.

124
00:17:03,000 --> 00:17:29,000
Market.scs.stantford.edu, but well, here's the address. But now if you look at this, the name section of this resource record is only two bytes long. It's using name compression. So here's that C-0, 0, C. When it's saying is that C, the first two bits are one, this is a compressed name. And the start of the name is it offset 0, C, or 12 within the packet.

125
00:17:29,000 --> 00:17:45,000
And if you were to count the bytes within the DNS packet, you'd see that market starts at byte 12. So this saying this name is right there. And so then here's type A, IN, 30, etc.

126
00:17:45,000 --> 00:18:08,000
So that you can see. So we're going to take market.scs.stantford.edu and compress the name entirely. But it turns that you can reduce some other types of compression. So here is the authoritative. Here's an answer for SCS.stantford.edu. And so we see again this name for SCS.stantford.edu is compressed. So C0, it's compressed 13.

127
00:18:09,000 --> 00:18:28,000
So this is an address, the first one represents 16. So this is address 19 within the packet or offset 19. So why 19? Well, if you think the original market.scs name, which is an offset 12, then there's the length byte for market and then the six market bytes. So total is seven bytes.

128
00:18:29,000 --> 00:18:39,000
And so offset 19 within the packet is SCS.stantford.edu. So you can address not only into the beginning of the series of labels, but any label within there.

129
00:18:40,000 --> 00:18:56,000
And so you'll see this happen many times. And so if you start doing some digging some requests and opened up a bar shop, you'll see this kind of name compression. And what this means in practice right is that this packet, which had all of this information in it.

130
00:18:56,000 --> 00:19:08,000
Right. Look at all this stuff that's in this packet. All of these different records, address records, name server records, quad address records, fits in 311 bytes. It's a 311 byte DNS response.

