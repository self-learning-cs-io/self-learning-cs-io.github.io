---
title: CS144 NetworkP1338 10dTLS
---

1
00:00:00,000 --> 00:00:12,000
So let's take a look at layering and how it implications the security.

2
00:00:12,000 --> 00:00:17,000
So you've seen layering many times. It's a general important principle in the design of computer networks.

3
00:00:17,000 --> 00:00:25,000
You've seen its benefits, separation of concerns, independent evolution, ease of adaptability, of adaptability to future technologies.

4
00:00:25,000 --> 00:00:28,000
But it sometimes does get in the way.

5
00:00:29,000 --> 00:00:34,000
So TLS is used today for secure web transactions over HTTPS.

6
00:00:34,000 --> 00:00:40,000
But it's often the case that a web server actually runs multiple websites through something called virtual hosts.

7
00:00:40,000 --> 00:00:44,000
The legitimate domain names of all the websites map the same IP address of the server.

8
00:00:44,000 --> 00:00:46,000
Clients connect to all of them report 80.

9
00:00:46,000 --> 00:00:53,000
It's not until the HTTP request comes in that the web server process knows which site the request is for.

10
00:00:54,000 --> 00:00:57,000
The host header field of the HTTP request tells it.

11
00:00:57,000 --> 00:01:03,000
For example, if you go to sing.stanford.edu and tiny west.stanford.edu, the same server.

12
00:01:03,000 --> 00:01:07,000
I can configure Apache State lookup different web pages.

13
00:01:07,000 --> 00:01:13,000
Apache would look inside the request, see the host header, and choose which web pages to serve based on that.

14
00:01:15,000 --> 00:01:19,000
This can break TLS such that it can't fully work properly. Why?

15
00:01:20,000 --> 00:01:27,000
Is it because it breaks server authentication? Does it break the key exchange? Does it break randomness generation?

16
00:01:27,000 --> 00:01:33,000
Does it break routing the handshake messages? Or does it break pre master secret generation?

17
00:01:40,000 --> 00:01:43,000
The answer is that it breaks server authentication.

18
00:01:43,000 --> 00:01:49,000
The TLS handshake and secure session setup occur before there is any application data.

19
00:01:49,000 --> 00:01:55,000
As a part of this exchange, the server needs to provide a certificate that binds a public key to a name.

20
00:01:55,000 --> 00:01:59,000
But it doesn't know what name to use.

21
00:01:59,000 --> 00:02:05,000
For example, my server can tell whether a connection is coming in for tiny west.stanford.edu or sing.stanford.edu.

22
00:02:05,000 --> 00:02:10,000
So it doesn't know whether to provide a certificate for tiny west or sing.

23
00:02:11,000 --> 00:02:22,000
In my case, I have a certificate that says both. But if I wanted to add a new host name to the server, say a name, website named www.networkinclass.com, then TLS would throw an error.

24
00:02:25,000 --> 00:02:31,000
The problem here is that the session layer, layer 5, needs to know the host name that the client is trying to contact.

25
00:02:31,000 --> 00:02:36,000
But that name is only available in the application layer, layer 7.

26
00:02:36,000 --> 00:02:40,000
The client is translated the name to an IP address, so a layer 3 name.

27
00:02:40,000 --> 00:02:47,000
So here's an example of layers. How layer the encapsulation functionality can cause a conflict and actually get in a way.

