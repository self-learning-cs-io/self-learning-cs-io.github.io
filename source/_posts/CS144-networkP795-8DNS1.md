---
title: CS144 NetworkP795 8DNS1
---

1
00:00:00,000 --> 00:00:05,000
This is the first of three videos about the domain name system or DNS.

2
00:00:05,000 --> 00:00:08,000
So let's look at a URL for a second.

3
00:00:08,000 --> 00:00:14,000
If we look at a basic URL like you would put in your web browser, it has three basic parts.

4
00:00:14,000 --> 00:00:18,000
It has first, at the front, the application protocol and port.

5
00:00:18,000 --> 00:00:24,000
So this is saying that we're going to be requesting a file over HTTP and by default,

6
00:00:24,000 --> 00:00:27,000
that means port 80, TCP port 80.

7
00:00:27,000 --> 00:00:33,000
You could also tell this URL after the host to be some other things, say port 1,001 or something,

8
00:00:33,000 --> 00:00:36,000
but by default this means port 80.

9
00:00:36,000 --> 00:00:39,000
The middle part of the name is specifying a host.

10
00:00:39,000 --> 00:00:42,000
So in this case, cs144.scs.stantford.edu.

11
00:00:42,000 --> 00:00:46,000
It's a human readable name, delimited by periods and the four parts.

12
00:00:46,000 --> 00:00:50,000
I mean, it's specifying the actual node that we want to contact.

13
00:00:50,000 --> 00:00:51,000
The last is then the file.

14
00:00:51,000 --> 00:00:54,000
This is the application level for HTTP.

15
00:00:54,000 --> 00:01:00,000
The application level specification of what file we want to request, HTTP.

16
00:01:00,000 --> 00:01:05,000
And so the question is, so far we've been talking about the internet in terms of IP addresses,

17
00:01:05,000 --> 00:01:07,000
usually IPv4 addresses.

18
00:01:07,000 --> 00:01:14,000
When we type a URL, we have this human readable name describing the computer that will host through on a contact.

19
00:01:15,000 --> 00:01:20,000
The question is, how do we translate this human readable name to an IP address?

20
00:01:20,000 --> 00:01:25,000
Well, it turns out you can, of course, enter a URL without using a host name,

21
00:01:25,000 --> 00:01:27,000
instead of just by entering the IP address.

22
00:01:27,000 --> 00:01:37,000
So you could rather than typing cs144.scs.stantford.edu, you could actually write the IP address that's associated with that name, if you'd like.

23
00:01:37,000 --> 00:01:40,000
But these human readable names are very, very useful.

24
00:01:41,000 --> 00:01:46,000
And people realize the human readable names are useful just from the beginnings of the internet.

25
00:01:46,000 --> 00:01:51,000
And so way back when the internet was tiny, there was this file called host.txt,

26
00:01:51,000 --> 00:01:56,000
and it turns out that every single host on the internet was in this file, host.txt,

27
00:01:56,000 --> 00:01:59,000
and it was maintained by the network information center.

28
00:01:59,000 --> 00:02:06,000
So it was maintained at SRI, so the SRINIC.ARPA, at this particular IP address.

29
00:02:06,000 --> 00:02:10,000
So you go and read RSC952, it talks a bit about this.

30
00:02:10,000 --> 00:02:17,000
And essentially, if you are a node on the internet, what you do is periodically contact this node at SRI,

31
00:02:17,000 --> 00:02:20,000
and use a file transfer protocol to download a new version of it.

32
00:02:20,000 --> 00:02:26,000
And this new version would have all the new hosts, and then you'd be able to map those host names to IP addresses.

33
00:02:26,000 --> 00:02:31,000
Of course, if you don't have too many hosts, this isn't bad, but generally speaking,

34
00:02:31,000 --> 00:02:34,000
the network capacity required by this scales of the end square,

35
00:02:34,000 --> 00:02:38,000
and that periodically end nodes are going to across the file that's ordered and in length.

36
00:02:38,000 --> 00:02:42,000
So this was not seen as a scalable, good long-term solution.

37
00:02:42,000 --> 00:02:49,000
It's fine with us, there's a couple of hosts, but as the internet grew, it quickly became a problem.

38
00:02:49,000 --> 00:02:54,000
And this is what led to the birth of what's called the domain name system, or DNS.

39
00:02:54,000 --> 00:02:59,000
The basic problem DNS is trying to solve, the basic tasks trying to complete,

40
00:02:59,000 --> 00:03:04,000
is to map names, human-related names, to addresses, or more generally these days to values.

41
00:03:04,000 --> 00:03:08,000
Originally, this to map to IP addresses, it turns out nowadays you can do it for much more.

42
00:03:08,000 --> 00:03:12,000
And there are a couple of design considerations for the domain name system.

43
00:03:12,000 --> 00:03:16,000
The first is we like to be able to handle a huge number of records, right?

44
00:03:16,000 --> 00:03:22,000
There are two to the 32 IP addresses, we should be able to map names in that kind of order.

45
00:03:22,000 --> 00:03:25,000
Furthermore, we'd like to have distributed control.

46
00:03:25,000 --> 00:03:29,000
One of the problems with host.tax is there's the single centralized repository.

47
00:03:29,000 --> 00:03:34,000
It should be that we can say this set of names you can manage, then this other set of names you can manage them.

48
00:03:34,000 --> 00:03:42,000
So Stanford, you can manage names, understand for it, but Amazon, you can manage names under Amazon.

49
00:03:42,000 --> 00:03:46,000
Furthermore, we'd like this system to be robust individual node failures.

50
00:03:46,000 --> 00:03:50,000
It shouldn't be that one node goes down, the entire domain name system comes down.

51
00:03:50,000 --> 00:03:56,000
Because if that's the case, then suddenly we can no longer map names to addresses and lots of things are going to hold.

52
00:03:56,000 --> 00:03:59,000
So we want to be robust.

53
00:03:59,000 --> 00:04:03,000
It's this might seem like an amazingly challenging problem.

54
00:04:03,000 --> 00:04:10,000
We want to handle billions of records, distribute it hierarchically across the entire internet, which is robust to failures.

55
00:04:10,000 --> 00:04:15,000
But there are two things which turn out to make this problem tractable.

56
00:04:15,000 --> 00:04:17,000
Make the design feasible.

57
00:04:18,000 --> 00:04:25,000
The first is that this database that maps names to values is read only or read mostly and that there are updates to it.

58
00:04:25,000 --> 00:04:29,000
But you generally expect that it is going to be read much more than it's written.

59
00:04:29,000 --> 00:04:36,000
It's not like there are nodes coming in and out all the time, but nothing compared to the rate which we're looking nodes up.

60
00:04:36,000 --> 00:04:39,000
Furthermore, we don't need perfect consistency.

61
00:04:39,000 --> 00:04:41,000
You can also call loose consistency.

62
00:04:42,000 --> 00:04:51,000
So if a node connects to the internet or if say a node a mapping between a name and an address changes, it's okay if there's some delay before everyone sees that.

63
00:04:51,000 --> 00:04:56,000
It might be some people see it a little earlier than others, but it's okay if there's some delay.

64
00:04:56,000 --> 00:05:08,000
And so it turns out that these two properties together that it's a read mostly database and that it's okay if things are slightly out of date, allows DNS to have extensive caching.

65
00:05:08,000 --> 00:05:16,000
The idea is that once you have a result, you can hold on to it for a long time and then maybe when it expires, request a new result.

66
00:05:16,000 --> 00:05:24,000
But rather than have one place say that has to be asked for everything, you can ask someplace once and then cash that result and answer it for other people.

67
00:05:24,000 --> 00:05:31,000
So you can look up a name and then keep the result for a long time and then use it to answer other queries.

68
00:05:32,000 --> 00:05:38,000
So recall that one of the requirements is that names be hierarchically administered that you can distribute the administration names.

69
00:05:38,000 --> 00:05:43,000
And to accomplish that DNS uses a hierarchy of names and we're all familiar with this.

70
00:05:43,000 --> 00:05:49,000
So at the top, there's implicitly what's called dot or what's called the root of the DNS name space.

71
00:05:49,000 --> 00:05:53,000
It's nothing. It's a nothing, right? It's an empty name.

72
00:05:53,000 --> 00:05:55,000
So these are called the root servers, just dot.

73
00:05:56,000 --> 00:06:05,000
The beneath them are what I call the top level domains, TLDs such as edu, comm, org, US, France, China.

74
00:06:05,000 --> 00:06:15,000
Then underneath each of those top level domains, there are what we often think of as domain names, say stanford.edu or sysco.com or bidu.cn.

75
00:06:15,000 --> 00:06:22,000
And of course within those domains, the owner of those domains can hand out additional names, additional domains.

76
00:06:23,000 --> 00:06:27,000
So for example, stanford, generally there's just one level of names below stanford.

77
00:06:27,000 --> 00:06:33,000
So there's cs.stanford.edu, dub dub dub.stanford.edu. Berkeley has another layer.

78
00:06:33,000 --> 00:06:41,000
So there's cs.berk, there's the cs domain and then there are names underneath the cs domain like www.cs.berk.edu.

79
00:06:41,000 --> 00:06:44,000
Similarly, google has maps dot google.com.

80
00:06:44,000 --> 00:06:48,000
So now the way DNS servers work is that there is hierarchical zones.

81
00:06:48,000 --> 00:06:53,000
There's the root zone, then the TLDs, then the domains and then there can be subdomains.

82
00:06:53,000 --> 00:07:00,000
So stanford for example, as you may have seen so far, it does have a subdomain scs, managed by David Mazier.

83
00:07:00,000 --> 00:07:04,000
And the key thing is that each of these zones can be separately administered.

84
00:07:04,000 --> 00:07:15,000
So stanford can grant David Mazier, the domain scs, so it'll answer questions about scs, but then David can completely control all of the host names underneath scs.

85
00:07:15,000 --> 00:07:24,000
Similarly, edu can grant stanford the name stanford, but then it's completely up to stanford to manage all of the names beneath stanford.

86
00:07:24,000 --> 00:07:28,000
For the word each zone can be served from several replicated servers.

87
00:07:28,000 --> 00:07:34,000
And so rather than there's being one server that serves stanford's name, there are in fact many servers replicated.

88
00:07:34,000 --> 00:07:36,000
And there's some rules as to how they're replicated.

89
00:07:36,000 --> 00:07:42,000
The idea is that if one server goes down, there are others that can still answer questions about stanford.

90
00:07:42,000 --> 00:07:48,000
So it turns out the root zone. So the zone you'd ask for, hey, who do I ask about edu?

91
00:07:48,000 --> 00:07:53,000
There are 13 servers labeled A to M and they're highly replicated.

92
00:07:53,000 --> 00:08:01,000
And so there's this bootstropping process of your computer comes up for the first time and wants to ask a name and it knows nothing.

93
00:08:01,000 --> 00:08:08,000
Well, it needs to talk to a root server in order to contact say a top level domain server, but how does it find out the root servers?

94
00:08:08,000 --> 00:08:13,000
It turns out these are generally just IPs that are stored in a file, in a name server.

95
00:08:13,000 --> 00:08:19,000
The name server comes up and it has some IP addresses for root servers.

96
00:08:19,000 --> 00:08:22,000
And then the first query that comes in, let's say it's for stanford.edu.

97
00:08:22,000 --> 00:08:25,000
It knows that it needs to talk to the edu servers.

98
00:08:25,000 --> 00:08:28,000
And so it can ask the root servers, hey, who has edu?

99
00:08:28,000 --> 00:08:30,000
Then when it gets a response, who has edu?

100
00:08:30,000 --> 00:08:33,000
It can contact the edu servers, hey, who has stanford?

101
00:08:33,000 --> 00:08:39,000
In addition to having 13 different servers, they're highly replicated through something called anycast.

102
00:08:39,000 --> 00:08:47,000
IP anycast, where it turns out that there are many machines that have the same IP address, which basically causes you to contact the one that is closest to you.

103
00:08:47,000 --> 00:08:50,000
So this makes the root servers highly, highly robust.

104
00:08:50,000 --> 00:08:58,000
Often when you hear about large scale distributed denial of servers or DDoS attacks against the root servers,

105
00:08:59,000 --> 00:09:01,000
this is exactly what they're talking about.

106
00:09:01,000 --> 00:09:08,000
The people are trying to attack the DNS root servers to prevent, to basically cause the DNS system to grind to a halt.

107
00:09:08,000 --> 00:09:10,000
As of yet, nobody has yet succeeded.

108
00:09:10,000 --> 00:09:14,000
There's so many of these servers, they're so robust and it turns out their job is so simple.

109
00:09:14,000 --> 00:09:19,000
People haven't been able to do it, but they keep on trying.

110
00:09:19,000 --> 00:09:21,000
So here's a map of the DNS root servers.

111
00:09:21,000 --> 00:09:27,000
So A, B, C, D, E, F, G, H, R, J, K, L, L, J, J, K, L, M.

112
00:09:28,000 --> 00:09:34,000
So here are all these different A servers, or A server, A, B, D, E, G, H, L.

113
00:09:34,000 --> 00:09:41,000
And then for the anycast instances for C, F, I, J, K, M, you can see that they're spread all over the world.

114
00:09:41,000 --> 00:09:53,000
This means that if you're somebody in, you know, we're in, say, Saudi Arabia, and you want to issue a DNS server, you don't have to go very far.

115
00:09:53,000 --> 00:09:56,000
There's some that are very close by.

116
00:09:59,000 --> 00:10:06,000
Okay, so that's the basic naming architecture and sort of a sense as to what DNS servers and how they're structured these hierarchies.

117
00:10:06,000 --> 00:10:09,000
So what does a query actually look like?

118
00:10:09,000 --> 00:10:14,000
So there are two kinds of DNS queries, recursive and non-recursive.

119
00:10:15,000 --> 00:10:24,000
Or recursive query asks the server you contact to sort of resolve the entire query.

120
00:10:24,000 --> 00:10:30,000
So you're asking it a question, and if there's many steps to the question, then it should ask each of those steps.

121
00:10:30,000 --> 00:10:36,000
As opposed to a non-recursive query, where you're going to contact a server, just going to answer one step of the query.

122
00:10:36,000 --> 00:10:39,000
And I'll show you why this difference occurs in a second.

123
00:10:39,000 --> 00:10:43,000
You specify just a bit in the query to say whether it's a recursive or non-recursive query.

124
00:10:43,000 --> 00:10:48,000
So DNS usually uses UDP port 53, and there's a 512-by-message limit.

125
00:10:48,000 --> 00:10:57,000
You can use TCP port 53, and then all the DNS messages have a 16-bit length field to sort of you know how long they are,

126
00:10:57,000 --> 00:11:00,000
since they're not diagrams, they're a stream.

127
00:11:00,000 --> 00:11:12,000
So let's say that I'm a client, so here's me, and I want to ask a question, hey, what is the IP address associated with www.stamford.edu?

128
00:11:12,000 --> 00:11:22,000
So using DHCP, I have an address for a DNS server, and so let's just, let's call this here, Resolver, and so that's some address R.

129
00:11:22,000 --> 00:11:32,000
And so I send DNS request, or DNS query, saying, I need the IP address for www.stamford.edu, and I send this message to the Resolver.

130
00:11:32,000 --> 00:11:42,000
I'm asking for address of www.stamford.edu.

131
00:11:42,000 --> 00:11:50,000
And I ask this as a recursive query, so the Resolver is going to resolve this entire query recursively for me.

132
00:11:50,000 --> 00:11:57,000
Well, let's say my Resolver has nothing cash, it doesn't know anything about the world, it just has the IP address of some root servers.

133
00:11:57,000 --> 00:12:05,000
Well, the first thing that's going to do is it needs to figure out who to ask a question about edu.

134
00:12:05,000 --> 00:12:15,000
So who does, where are the servers for edu? So it sends a query to one of the root servers, saying, hey, who do I ask about edu?

135
00:12:15,000 --> 00:12:21,000
This is a non-recursive query.

136
00:12:21,000 --> 00:12:28,000
I can't ask the root query, the root server is to answer the whole query for me and start contacting other people, there's going to answer one step.

137
00:12:28,000 --> 00:12:33,000
They'll answer, hey, who should I talk to about edu?

138
00:12:33,000 --> 00:12:39,000
And the root will send a response, saying, here's some information for who you should talk about edu.

139
00:12:39,000 --> 00:12:44,000
Now the Resolver knows, okay, now I have, I can cash the entry for edu.

140
00:12:44,000 --> 00:12:48,000
Great, I can put it in my cash, this is the IP address I should contact if I have a question about edu.

141
00:12:48,000 --> 00:12:51,000
Now let me contact that IP address.

142
00:12:51,000 --> 00:12:57,000
And it's going to ask edu, hey, who should I ask about Stanford?

143
00:12:57,000 --> 00:12:59,000
Again, this is a non-recursive query.

144
00:12:59,000 --> 00:13:09,000
The edu server, I'm going to say, okay, you hear some information about whom you should ask about Stanford.

145
00:13:09,000 --> 00:13:16,000
I can then cash that result and ask that server, it's the domain server.

146
00:13:16,000 --> 00:13:22,000
So now I'm going to say, Stanford, what's the address for WWW?

147
00:13:22,000 --> 00:13:34,000
And Stanford can respond and say, aha, here's the address for WWW.Standford.edu.

148
00:13:34,000 --> 00:13:44,000
And then the Resolver can cash this result.

149
00:13:44,000 --> 00:13:52,000
Now the Resolver can cash these values of, if I want to ask a question about edu, what DNS server should I talk to?

150
00:13:52,000 --> 00:13:56,000
If I want to ask a question about Stanford.edu, what DNS server should I talk to?

151
00:13:56,000 --> 00:14:01,000
And what's the address for WWW.Standford.edu?

152
00:14:01,000 --> 00:14:04,000
And then it can return this result to the client.

153
00:14:04,000 --> 00:14:11,000
Here's the IP address for WWW.Standford.edu.

154
00:14:11,000 --> 00:14:15,000
And that's the basic operation of a DNS query.

155
00:14:15,000 --> 00:14:18,000
It starts with the client asking for the cursive query of the Resolver.

156
00:14:18,000 --> 00:14:27,000
The Resolver may then ask non-recursive queries to servers in the network in order to generate the response which it then sends to the client.

157
00:14:27,000 --> 00:14:31,000
It could also be that the Resolver had answered this question before.

158
00:14:31,000 --> 00:14:35,000
And so rather than go and ask all these servers, just answered from its cash.

159
00:14:35,000 --> 00:14:41,000
So if a couple minutes later another client asks the same question, hey, what's the address of WWW.Standford.edu?

160
00:14:41,000 --> 00:14:46,000
There's Resolver rather than contact anyone, anyone can just return the cash result.

161
00:14:46,000 --> 00:14:55,000
So if you have here in the noise about DNS, here in the news, not the noise about DNS cash poisoning,

162
00:14:55,000 --> 00:15:01,000
there's this aspect of DNS which is a tax, which is a try to take advantage of.

163
00:15:01,000 --> 00:15:21,000
Which is that if you can get a bad record into the Resolver that somehow convinced it that WWW.Standford.edu actually points at www.evil.com or something such that if you try to go to Stanford instead of you go to some evil hackers server,

164
00:15:21,000 --> 00:15:29,000
if you can get that cash entry into the Resolver and poison the cash, then anybody who asks that question is going to get that answer.

165
00:15:29,000 --> 00:15:37,000
And so later on the course when we talk about security, we'll see some of the ways in which that can happen and some ways in which DNS can solve it.

