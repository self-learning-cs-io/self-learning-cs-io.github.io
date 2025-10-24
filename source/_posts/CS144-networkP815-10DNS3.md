---
title: CS144 NetworkP815 10DNS3
---

1
00:00:00,000 --> 00:00:06,000
This video digs into the details of actually what a DNS query response series looks like.

2
00:00:06,000 --> 00:00:09,599
So, as soon as you know what resource records are and what their structure is, in the high

3
00:00:09,599 --> 00:00:15,000
little view, this idea of a client issuing a recursive query, which is then non-recursively

4
00:00:15,000 --> 00:00:18,600
issued to other servers in the network.

5
00:00:18,600 --> 00:00:22,920
And by details, I mean that at this high level, there's this idea that I issue a recursive

6
00:00:22,920 --> 00:00:29,960
query, and then this results in resolver issuing a series of non-recursive queries.

7
00:00:29,960 --> 00:00:36,960
To give me my final answer of what the address record is, Stanford.edu is, what are the actual

8
00:00:36,960 --> 00:00:40,960
contents of these queries, and what are the actual contents of their responses?

9
00:00:40,960 --> 00:00:46,960
And what is the information that each of these servers has to know?

10
00:00:46,960 --> 00:00:50,960
So this is really important when you're actually setting up a name system, you're actually setting

11
00:00:50,960 --> 00:00:54,960
up a domain, and you need to configure name servers in the networks that you'll be able to

12
00:00:54,960 --> 00:01:01,960
actually ask questions and people are able to access your machines and your names.

13
00:01:01,960 --> 00:01:06,960
So the big challenge, one of the big challenges comes from this concept of traversing zones.

14
00:01:06,960 --> 00:01:09,960
So at some point, my name server has a root cache file.

15
00:01:09,960 --> 00:01:12,960
So let's just give some IP addresses of root servers.

16
00:01:12,960 --> 00:01:14,960
And this is the bootstraping process.

17
00:01:14,960 --> 00:01:19,960
If I just have those IP addresses, then from there, I can get TLD, TLD name server addresses

18
00:01:19,960 --> 00:01:23,960
from there I can get domain, name server addresses, and subdomains, etc.

19
00:01:23,959 --> 00:01:26,959
So at a high level, it certainly makes sense.

20
00:01:26,959 --> 00:01:30,959
Oh, I ask about edu, I ask about Stanford, but there turned out to be a couple of tricks.

21
00:01:30,959 --> 00:01:35,959
So think about an NS record.

22
00:01:35,959 --> 00:01:41,959
So if we recall, a name server record, if I ask for what the name server is of a domain,

23
00:01:41,959 --> 00:01:45,959
a name server record contains a hostname.

24
00:01:45,959 --> 00:01:52,959
So for example, if I ask, what is the name server of Stanford.edu, the answer is a hostname.

25
00:01:52,959 --> 00:01:59,959
So here, let's dig for the name server of Stanford.edu.

26
00:01:59,959 --> 00:02:05,959
And the answer is we get four answers, these host names.

27
00:02:05,959 --> 00:02:13,959
Avalone.Stanford.edu, August.Stanford.edu, Adelante.Stanford.edu, and Arthea.Stanford.edu.

28
00:02:13,959 --> 00:02:17,959
But the problem is these are all names in Stanford.

29
00:02:17,960 --> 00:02:27,960
How can we get the address of these name servers, unless we know the IP address of these name servers?

30
00:02:27,960 --> 00:02:30,960
These are the servers we would ask for what those names are.

31
00:02:30,960 --> 00:02:33,960
So there's this chicken and egg problem. How do we get started?

32
00:02:33,960 --> 00:02:38,960
Given that we're being given host names.

33
00:02:38,960 --> 00:02:43,960
And so the solution to this in the name system, or the domain name system,

34
00:02:43,960 --> 00:02:46,960
is something called a glue record.

35
00:02:46,960 --> 00:02:55,960
And what this is is that when say Stanford goes to the edu servers and says, hey, these are the name servers for Stanford.

36
00:02:55,960 --> 00:03:02,960
It gives them not only NS records, specifying the names of the servers, but also associated A records.

37
00:03:02,960 --> 00:03:10,960
These are glue records because it means that the edu servers are going to serve up address records, A records, for Stanford.edu.

38
00:03:10,960 --> 00:03:17,960
Only for the name servers of Stanford.edu, but nonetheless, they're serving A records for Stanford.edu.

39
00:03:17,960 --> 00:03:21,960
And so, we go back to this example.

40
00:03:21,960 --> 00:03:31,960
You can see that on one hand, I'm asking, what are the name servers of Stanford.edu, but the additional section, then also gives me address records for them.

41
00:03:31,960 --> 00:03:37,960
And these address records are stored within the edu name servers.

42
00:03:37,960 --> 00:03:40,960
So let me just walk through an example of this.

43
00:03:40,960 --> 00:03:46,960
So what I'm going to do is I'm going to look up, www.scs.standford.edu, assuming there's no cache.

44
00:03:46,960 --> 00:03:51,960
I'm going to explicitly walk through the series of queries that would be issued.

45
00:03:51,960 --> 00:03:58,960
And then what I'm going to do that is with this no-rec option, which means do not ask for a cursive query.

46
00:03:58,960 --> 00:04:12,960
And so, as the first step, let's dig.

47
00:04:12,960 --> 00:04:21,960
So this is going to, I'm going to contact one of the root servers, so the A root servers, and say, hey, who do I talk to for edu?

48
00:04:21,959 --> 00:04:29,959
Because it's non-recursive. And I get a response, which says, here are some of the servers to use.

49
00:04:29,959 --> 00:04:41,959
So let's say here is the A edu server. So these are the name servers that you can use.

50
00:04:41,959 --> 00:04:51,959
So I'm going to use the A edu server. I'm going to say, hey, who should I ask about stanford.edu?

51
00:04:51,959 --> 00:04:57,959
And it's going to tell me to ask argus.stanford.edu.

52
00:04:57,959 --> 00:05:12,959
As you can see, it's also giving me the A records, the A record for argus. So I actually have an IP address to ask.

53
00:05:12,959 --> 00:05:26,959
Then I'm going to ask argus, hey, who would I ask about that? And argus is going to answer, oh, you should ask ns1.fs.net.

54
00:05:26,959 --> 00:05:33,959
Or you can also ask mission.scs.stanford.edu. And here's the address record for mission.scs.stanford.edu.

55
00:05:33,959 --> 00:05:49,959
And so in its response, I now know the IP address to contact. And I can put that record into my cache. And so if I then do mission.scs.stanford.edu, I'm going to get the A record.

56
00:05:49,959 --> 00:06:03,959
And in fact, that's what mission.stanford.edu.scs.stanford.edu gives me the A record for www.scs.stanford.edu, the time to live with 3600. And IP address of 171.66.3.9.

57
00:06:03,959 --> 00:06:09,959
So when record that we saw briefly, besides an A record and an s record, it's something called the scene name record, a canonical name.

58
00:06:09,959 --> 00:06:23,959
What the canonical name record tells you in DNS is that a name is an alias. So as you saw before, if you dig www.stanford.edu, you'll see that that's actually an alias for another name.

59
00:06:23,959 --> 00:06:35,959
So that's a www.v6.stanford.edu. And so if there's a scene name record for a name, there can't be any other records for the name. It's telling you, oh this is just a pointer.

60
00:06:35,959 --> 00:06:47,959
And so often what will happen is that if you ask a query about a canonical name, it'll tell you, oh for an alias name, it'll tell you, oh this is an alias for this canonical name. And then here are the records you want for the canonical name.

61
00:06:47,959 --> 00:06:57,959
So for example, if you dig www.stanford.edu, it'll tell you the canonical name is this other name. Oh and here's the A record for that other name.

62
00:06:57,959 --> 00:07:05,959
Another kind of DNS record, and this one is really valuable is, well, all really valuable, is what's called an MX record. It's a mail exchange record.

63
00:07:05,959 --> 00:07:09,959
And it tells you, what's the mail server for a domain?

64
00:07:09,959 --> 00:07:21,959
So for example, there's no host, scs.stanford.edu. You can't ping it, try. But you can send email to scs.stanford.edu. People have email addresses of that domain.

65
00:07:21,959 --> 00:07:32,959
And so what this is, is that there's an MX record for scs.stanford.edu that says, oh, if you want to send mail to this domain, this is the server you should talk to.

66
00:07:32,959 --> 00:07:46,959
And furthermore, an MX record causes a record processing. So if I say, hey, what's the MX record, then it'll say, oh, this is the name of the server for mail. And here's the A record for that server.

67
00:07:46,959 --> 00:07:55,959
So for example, let's dig MX.scs.stanford.edu.

68
00:07:56,959 --> 00:08:15,959
And we'll see, okay, answer section. The MX record for scs.stanford.edu, the TTL 3600, its internet, is market4.scs.stanford.edu. Furthermore, the address record for market4.scs.stanford.edu is 171.66.3.10.

69
00:08:15,959 --> 00:08:21,959
And this 10 is a preference value to tell you if there's maybe different servers that you want, which one is best.

70
00:08:21,959 --> 00:08:32,960
So there we can request the MX record. So this starts to get a little funny. So what happens if the mail server name doesn't have an A record?

71
00:08:32,960 --> 00:08:45,960
So let's try digging this bad MX. So let's do dig MX.scs.stanford.edu.

72
00:08:46,960 --> 00:09:00,960
And it's going to say, well, bad MX is cs144.scs.stanford.edu. But now we don't have an A record for...

73
00:09:00,960 --> 00:09:09,960
But this is weird. Why don't we have an A record for cs144.scs.stanford.edu? That's a valid host name.

74
00:09:09,960 --> 00:09:21,960
But for some reason, the name server is not able to give us an A record. So if we look up, let's just dig cs144.scs.stanford.edu.

75
00:09:21,960 --> 00:09:33,960
If we look up here, it turns out that cs144.stanford.edu is a CNAME for www.scs.stanford.edu. So it's actually an alias for this.

76
00:09:33,960 --> 00:09:40,960
And this is where you get one of these interesting edge cases in protocols, these things where the way it's designed, turns out there are some implications that you maybe didn't foresee.

77
00:09:40,960 --> 00:09:48,960
Or it's actually kind of a maybe a good idea. The point is that your MX record isn't something which people are looking at. It's something which just machines use.

78
00:09:48,960 --> 00:10:00,960
So you shouldn't have be pointing at it aliases. If you're pointing at it aliases, then you're forcing another level of interaction to DNS hierarchy, which isn't helpful given that it's just machines. It's not people.

79
00:10:00,960 --> 00:10:12,960
So recall, when you look up an MX record, you'll also get processing for these associated A records. But cs144 does not have an A record. It has a CNAME record.

80
00:10:12,960 --> 00:10:28,960
And the fact that it has a CNAME record means it cannot have any other record. And so there's this approach where if you point your MX record at an alias, it forces people to do another look up. And so there's this way to create a negative incentive for you to do that.

81
00:10:28,960 --> 00:10:37,960
And so here's this interaction, which is two different kinds of records, the way that they're processed, which is a way to kind of construct the system to be more efficient.

82
00:10:37,960 --> 00:10:45,960
So in addition to A records, Qwade records, NS records, MX records, and CNAME records, there are all kinds of other records.

83
00:10:45,960 --> 00:10:51,960
There are start of authority records, which give you information about the actual caching of DNS information.

84
00:10:52,960 --> 00:10:58,960
There's some called a text record, which is a way to put arbitrary text. So you can associate arbitrary text for the name.

85
00:10:58,960 --> 00:11:11,960
This is a great way for extensions, people have explored all kinds of new services using text records, allows you to play with something in the opera and the working internet and then maybe transition to a new kind of specific record.

86
00:11:12,960 --> 00:11:22,960
There are also things called pointer records, which do the reverse mapping. You look up a pointer record for an address and you'll give you a name if one exists, or if it knows of it.

87
00:11:22,960 --> 00:11:31,960
And then as we've seen before, there were Qwade records or IPv6 address records. They have full 128 bit IPv6 addresses in them.

88
00:11:31,960 --> 00:11:43,960
And so those are the nitty-gritty details of DNS, the information that's cached, how you use glue records to stitch together zones, and some of the different kinds of records that you have besides this simple NS and A records.

