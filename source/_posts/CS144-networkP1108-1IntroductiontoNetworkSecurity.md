---
title: CS144 NetworkP1108 1IntroductiontoNetworkSecurity
---

1
00:00:00,000 --> 00:00:06,000
When we read about computer networks in the newspaper, it's often because they've been attacked or compromised.

2
00:00:06,000 --> 00:00:13,000
Almost every week we read about hackers breaking in and walking off with millions of credit card numbers and other private data.

3
00:00:13,000 --> 00:00:20,000
Perhaps following a fishing attack or by exploiting some other vulnerability to access a supposedly private network.

4
00:00:20,000 --> 00:00:31,000
Or we might read about a new worm that is designed to take over computers turning them into an army of botnets, such as the infamous code red and slammer worms of the early 2000s.

5
00:00:31,000 --> 00:00:38,000
Botnets are armies of infected computers controlled by a master that are commonly used to send spam.

6
00:00:38,000 --> 00:00:49,000
While spam levels appear to be dropping slightly, reports suggest that between 75% and 95% of all emails send every day a spam, adding up to hundreds of millions of emails per day.

7
00:00:50,000 --> 00:01:00,000
Worms are also sent by one government to another, for example when the 2010 Stuttenets worm, which is widely believed to have been created by the US and Israeli governments,

8
00:01:00,000 --> 00:01:05,000
was used to attack centrifuges used for processing nuclear material in Iran.

9
00:01:05,000 --> 00:01:15,000
In this video, we're going to look at some ways that a network can be compromised by an attacker and I'll explain the security characteristics we want from a network.

10
00:01:16,000 --> 00:01:20,000
Let's start by exploring the different ways a communication can be compromised.

11
00:01:20,000 --> 00:01:26,000
The first and simplest way is for an attacker that eavesdrop on someone else's private communication.

12
00:01:26,000 --> 00:01:37,000
This means passively sniffing and recording network data, or it could mean listening to the metadata, such as noting that a connection has been made without necessarily recording the data inside the connection.

13
00:01:37,000 --> 00:01:47,000
Connection metadata was made infamous recently when the NSA acknowledged recording information about calls and connections made without supposedly recording the contents.

14
00:01:47,000 --> 00:01:55,000
There are many ways to tap a network. For example, the physical layer, an attacker might passively tap an electrical or optical cable.

15
00:01:55,000 --> 00:02:02,000
Or if you've seen before, we can listen in to Wi-Fi because the packets are broadcast for everyone to hear.

16
00:02:02,000 --> 00:02:08,000
A third way is for an attacker to persuade a router to duplicate and forward copies of packets.

17
00:02:08,000 --> 00:02:16,000
In each case, the attacker can use standard tools such as Wireshark to decode the protocols and understand the user's data.

18
00:02:16,000 --> 00:02:22,000
A second type of compromise is when an attacker modifies deletes or inserts data as it passes through the network.

19
00:02:22,000 --> 00:02:31,000
In other words, they're actively tampering with our data, changing the contents of the packets, redirecting packets to a different rogue server without us knowing or taking control over our entire network.

20
00:02:31,000 --> 00:02:41,000
This might happen by persuading us to download malware based on a phishing attack or by exploiting a vulnerability in our computer or the way that we communicate.

21
00:02:41,000 --> 00:02:48,000
For example, later we'll see how it's possible to hijack an ongoing TCP connection without either end knowing.

22
00:02:48,000 --> 00:02:55,000
Finally, an attacker might just want the prevent us from communicating at all. This kind of attack is usually called an Isle of Service attack.

23
00:02:55,000 --> 00:03:03,000
Sometimes these attacks are performed by swapping servers or entire networks by generating billions of messages from different botnets spread around the internet.

24
00:03:03,000 --> 00:03:09,000
We'll learn more about denial of service attacks in a later video.

25
00:03:09,000 --> 00:03:13,000
Let's take a look at an example of eavesdropping.

26
00:03:13,000 --> 00:03:24,000
Imagine that Alice is making a purchase online from an e-commerce site. She's using a laptop connected to her local Wi-Fi access point, then over the internet to Amazon.com.

27
00:03:25,000 --> 00:03:30,000
She browses the site and makes her credit card purchase using vanilla HTTP.

28
00:03:30,000 --> 00:03:38,000
Unfortunately, what she doesn't know is that the bad guy attacker is listening in to what she's doing.

29
00:03:38,000 --> 00:03:47,000
There are a few ways the attacker can eavesdrop. For example, by listening to or sniffing the Wi-Fi packets broadcast into the air.

30
00:03:48,000 --> 00:03:54,000
Anyone with a laptop on the wire-shark tool can listen to packets in the air and if they're not encrypted, they code their contents.

31
00:03:54,000 --> 00:04:03,000
Alternatively, the attacker can eavesdrop on the physical wire by placing a passive detector that pick up small electromagnetic signals that leak from the cable.

32
00:04:03,000 --> 00:04:08,000
Or the attacker might insert an electrical connection under the wire itself.

33
00:04:08,000 --> 00:04:15,000
If the attacker is eavesdropping on a long haul link in the internet backbone, they're more likely to be tapping into an optical fiber.

34
00:04:16,000 --> 00:04:27,000
This can be done by placing a device called the optical coupler which diverts a small fraction of the optical signal under a second optical fiber which can then be listened to and decoded.

35
00:04:27,000 --> 00:04:38,000
An attacker without physical access might manage to subvert the switches and routers along the path, tricking one of them into duplicating data and forwarding it to the attacker's computer.

36
00:04:39,000 --> 00:04:45,000
This can be done by remotely subverting Ethernet IP or DNS traffic. We'll see examples of all three later.

37
00:04:45,000 --> 00:04:50,000
Or the attacker might manage to break into the router console and take over the router completely.

38
00:04:50,000 --> 00:05:03,000
In our example, if the attacker successfully eavesdrop on the clear HTTP communication, he or she can learn Alice's private data such as her credit card number and a home address.

39
00:05:04,000 --> 00:05:10,000
In a later video, we'll learn about how HTTPS prevents this from happening in practice.

40
00:05:14,000 --> 00:05:30,000
If the attacker is able to insert herself into the middle of the communications between Alice and Amazon.com, then the attacker can terminate the HTTP connection in the middle pretending to be Amazon to Alice and pretending to be Alice to Amazon.

41
00:05:31,000 --> 00:05:36,000
The attacker could simply pass through the data, recording it without changing it.

42
00:05:36,000 --> 00:05:44,000
Or the attacker could alter the data, for example, the modify the shipping address causing the purchase items to be delivered to the attacker instead of Alice.

43
00:05:44,000 --> 00:05:51,000
These so-called man in the middle attacks are very hard to detect because both parties can think they're talking to a legitimate end host.

44
00:05:52,000 --> 00:06:03,000
The third line of attack is to redirect the traffic away from the server without Alice realizing that she's not actually talking to Amazon.

45
00:06:03,000 --> 00:06:12,000
If the attacker is able to fool the router to forward packets test into Amazon.com to the attacker instead, then the attacker can respond and pretend to be Amazon.

46
00:06:13,000 --> 00:06:22,000
Or the attacker might fool Alice's DNS server into returning the attacker's IP address when Alice is trying to look up Amazon's IP address.

47
00:06:22,000 --> 00:06:30,000
In each case, Alice can be forced to browse the attacker's website and be encouraged to enter her credit card information there instead.

48
00:06:35,000 --> 00:06:39,000
Clearly, Alice is not happy and would like her communication to be more secure.

49
00:06:40,000 --> 00:06:48,000
In general, when we say we want secure communications over the internet, we're saying that we want secrecy and confidentiality.

50
00:06:48,000 --> 00:06:51,000
We don't want anyone to listen in to our communication.

51
00:06:51,000 --> 00:06:57,000
For this, we're using encryption and we'll describe how it works in one of the upcoming videos.

52
00:06:57,000 --> 00:06:59,000
We want integrity.

53
00:06:59,000 --> 00:07:03,000
We don't want our messages to be altered in transit.

54
00:07:04,000 --> 00:07:10,000
The most common way to prove that a message has not been tampered with is to attach what is called a message authentication code or MAC.

55
00:07:10,000 --> 00:07:15,000
MACs are based on encryption as well, coupled with calculating a hash over the transmitted message.

56
00:07:15,000 --> 00:07:19,000
We'll study message authentication codes in an upcoming video.

57
00:07:19,000 --> 00:07:22,000
Third, we want authentication.

58
00:07:22,000 --> 00:07:26,000
We often want to confirm the identity of the other party we're communicating with.

59
00:07:26,000 --> 00:07:33,000
In our example, Alice wants to know that she is really talking to Amazon, who she trusts, before entering her credit card details.

60
00:07:33,000 --> 00:07:40,000
In a later video, we'll study digital signatures and certificates that help us ensure that we're really communicating with who we think we are.

61
00:07:40,000 --> 00:07:44,000
Finally, we want uninterrupted communication.

62
00:07:44,000 --> 00:07:48,000
We don't want someone to present it prevent us from communicating in the first place.

63
00:07:48,000 --> 00:07:55,000
You may have heard of denial of service attacks when an attacker floods a network or a set of servers to prevent them from working properly.

64
00:07:55,000 --> 00:08:00,000
We'll study denial of service attacks shortly.

65
00:08:00,000 --> 00:08:05,000
In the next few videos, we're going to study different types of attack.

66
00:08:05,000 --> 00:08:15,000
We'll study eavesdropping, redirecting Ethernet, IP and DNS traffic, hijacking a running TCP connection, and denial of service attacks.

