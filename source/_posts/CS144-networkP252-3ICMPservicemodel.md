---
title: CS144 NetworkP252 3ICMPservicemodel
---

1
00:00:00,000 --> 00:00:07,000
In this video, I'm going to continue the topic of the four layer internet model, and I'm going to tell you about the ICMP service model.

2
00:00:07,000 --> 00:00:14,000
ICMP is the Internet Control Message Protocol, and it's used to report errors and diagnose problems with the NetWapLayer.

3
00:00:14,000 --> 00:00:21,000
You'll recall that IP doesn't provide any guarantees about delivery, but it does help, and it will prove to be a very valuable tool,

4
00:00:21,000 --> 00:00:28,000
to get some hints and some information back from the NetWapLayer to tell us about when things are going wrong.

5
00:00:28,000 --> 00:00:32,000
There are three mechanisms that we use to make the NetWapLayer work in the Internet.

6
00:00:32,000 --> 00:00:41,000
The first we've already seen is the Internet Protocol or IP. This creates IP data grams, and then delivers them hop-by-hop from end to end.

7
00:00:41,000 --> 00:00:48,000
The second are the routing tables sitting inside the routers. There are algorithms that run to populate these router-forging tables,

8
00:00:48,000 --> 00:00:53,000
so that the routers know how to deliver them hop-by-hop to the other end.

9
00:00:54,000 --> 00:00:59,000
The third mechanism, which is the purpose of this video, is ICMP or the Internet Control Message Protocol.

10
00:00:59,000 --> 00:01:05,000
ICMP helps communicate information about the NetWapLayer between the end hosts and the routers,

11
00:01:05,000 --> 00:01:08,000
and I'm going to show you a couple of examples of those in a minute.

12
00:01:08,000 --> 00:01:16,000
It's typically used to report error conditions, and helps us diagnose problems, figure out the path taken by packets, and so on.

13
00:01:17,000 --> 00:01:23,000
ICMP runs above the NetWapLayer, and so strictly speaking, it's a transport layer protocol.

14
00:01:23,000 --> 00:01:33,000
When an end host or router wants to report an error using ICMP, it puts the information that it wants to send back to the source into an ICMP payload,

15
00:01:33,000 --> 00:01:38,000
and hands it to IP to be sent as a data gram.

16
00:01:39,000 --> 00:01:52,000
Let's look at an example. As I said, ICMP typically gets used as a method for error reporting, and in fact, you've seen it if you've ever seen the message destination network unreachable.

17
00:01:52,000 --> 00:02:06,000
Let's look an example. Imagine that I have a web client running as the application here, so I've got an HTTP or web client here that's going to be accessing an HTTP server over here at B.

18
00:02:06,000 --> 00:02:20,000
As we've seen before, the application bytes that for HTTP get put into the transport layer as usual into TCP, comes down to the NetWapLayer because that longer link comes up to the router along here.

19
00:02:20,000 --> 00:02:29,000
Imagine that the address that is put in here is actually to a network that this router has no information about in its forwarding table.

20
00:02:29,000 --> 00:02:35,000
Now this would be a pretty bad situation because that router doesn't know how to forward the packet to be.

21
00:02:35,000 --> 00:02:56,000
But if that happens, then the router will send back a message, and so this will come back down through the network to A, and it will say in it, destination network unreachable.

22
00:02:57,000 --> 00:03:05,000
And that's simply saying that it has no means to deliver that packet to be, so it's alerting a by sending that back.

23
00:03:05,000 --> 00:03:09,000
And we'll see the format that it uses in a moment.

24
00:03:09,000 --> 00:03:16,000
So basically the ICMP service model is very, very simple. It allows it to send a reporting message, a self-contained message, or reporting the error.

25
00:03:16,000 --> 00:03:23,000
It's unreliable in the sense that it sends a simple datagram. It doesn't attempt to recent it. It doesn't maintain any state of the messages that it sent.

26
00:03:23,000 --> 00:03:29,000
It simply sends back a digest giving an indication of what the problem was.

27
00:03:29,000 --> 00:03:33,000
And in fact, the word how it actually works is when a message comes in.

28
00:03:33,000 --> 00:03:43,000
So for example, an IP datagram. So here is my IP datagram. Here is the header. Here is the payload or the data portion of my IP datagram.

29
00:03:43,000 --> 00:03:50,000
So this is my IP datagram. Let's say that this is just arrived, and in my previous example, this has arrived from A to the first router.

30
00:03:50,000 --> 00:03:57,000
If the first router wants to send back an ICMP message, what it does is it takes the header.

31
00:03:57,000 --> 00:04:09,000
Now this header here has source address A and destination address B. And it will populate this into, it will place this into an ICMP message.

32
00:04:09,000 --> 00:04:18,000
So it will take this header and put it into the ICMP message. So this is my ICMP message.

33
00:04:18,000 --> 00:04:27,000
And it will also take the first eight bytes of the IP payload. And it will put this into the ICMP message.

34
00:04:27,000 --> 00:04:35,000
And then it marks it with a type and a code. And we'll see some examples of these types and codes in a moment.

35
00:04:35,000 --> 00:04:43,000
And then the whole lot gets placed into a new IP datagram. So this is the data of the new IP datagram.

36
00:04:43,000 --> 00:04:51,000
And this is going to be sent back. So this is the header. And so the IP source will be the router.

37
00:04:51,000 --> 00:05:02,000
So I'll just put R for router. And the IP destination, in my example, will be A. It's going to send it back to A to tell it that this was the error.

38
00:05:02,000 --> 00:05:13,000
This is how it figures out what type of error it was. This was the data associated with that error. It's the IP datagram that was originally causing the problem.

39
00:05:13,000 --> 00:05:20,000
That's all placed into the data of the IP datagram that goes back again to A.

40
00:05:20,000 --> 00:05:28,000
There's a good example of some particular ICMP message types. There are a lot of message types. This is just a sampling of them.

41
00:05:28,000 --> 00:05:33,000
These are the six most important that we see. And you don't need to remember the types or the codes.

42
00:05:33,000 --> 00:05:41,000
You'll find those in the internet, rfc792. And you can just look that up online if you want.

43
00:05:41,000 --> 00:05:47,000
These are the ones that are most commonly used. And I'll just go through examples. We've already seen the network unreachable.

44
00:05:47,000 --> 00:05:55,000
This was type 3 code zero. And there are two other destination unreachable ones. Host unreachable. That's if a...

