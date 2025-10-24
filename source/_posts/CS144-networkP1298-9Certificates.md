---
title: CS144 NetworkP1298 9Certificates
---

1
00:00:00,000 --> 00:00:04,000
There's one last security permit that's very common today.

2
00:00:04,000 --> 00:00:09,000
Use it every time you establish an SSH or HGTP session.

3
00:00:09,000 --> 00:00:17,000
There's certificates. Public key cryptography lets us verify that someone with a private key associated with a public key signed a document.

4
00:00:17,000 --> 00:00:21,000
But how do we know what the right public key is?

5
00:00:21,000 --> 00:00:26,000
How do we know that www.ebay.com has a public key?

6
00:00:26,000 --> 00:00:31,000
The answer is certificates.

7
00:00:31,000 --> 00:00:37,000
So let's say we want to securely communicate with a server such as www.ebay.amazon.com.

8
00:00:37,000 --> 00:00:47,000
Now, using public key cryptography, if I know www.ebay.amazon.com's public key, then I can communicate securely with that server.

9
00:00:47,000 --> 00:00:54,000
I can verify that www.ebay.amazon.com has a private key associated with a public key I'm using.

10
00:00:54,000 --> 00:01:00,000
We can then use public key encryption to exchange symmetric keys all as well.

11
00:01:00,000 --> 00:01:03,000
But there's a missing step here.

12
00:01:03,000 --> 00:01:06,000
How do I get the server's public key?

13
00:01:06,000 --> 00:01:08,000
Do I find it on a web page?

14
00:01:08,000 --> 00:01:18,000
If I just found it somewhere random or insecure, then how can I be sure it's really that server's public key and not an adversary pretending to be that server?

15
00:01:18,000 --> 00:01:21,000
For example, imagine this very simple attack.

16
00:01:21,000 --> 00:01:24,000
I want to communicate with a server so I ask it first public key.

17
00:01:24,000 --> 00:01:29,000
It gives me the key, then I can verify that it has the associated private key.

18
00:01:29,000 --> 00:01:32,000
This is completely open to a man in the middle of the attack.

19
00:01:32,000 --> 00:01:36,000
An attacker can pretend to be the server and give me its own public key.

20
00:01:36,000 --> 00:01:39,000
I have no way of telling whose key is right.

21
00:01:39,000 --> 00:01:44,000
The attacker looks just like the server except that it has a different key.

22
00:01:44,000 --> 00:01:48,000
The attacker then can open up a connection to the server and pretend to be you.

23
00:01:48,000 --> 00:01:54,000
It sees everything you send since you're communicating with it and it forges along to that server.

24
00:01:54,000 --> 00:02:02,000
It could rewrite or suppress anything you send or even insert new traffic, really passwords, all kinds of stuff.

25
00:02:02,000 --> 00:02:12,000
So we need it some way to be able to receive the public key for www.amazon.com and be reasonably sure it's actually www.amazon.com.

26
00:02:12,000 --> 00:02:20,000
In the best case, I'd have someone I trust tell me what www.amazon.com's key is.

27
00:02:24,000 --> 00:02:26,000
That's exactly what a certificate does.

28
00:02:26,000 --> 00:02:32,000
I'm struckly a certificate is a digital document just to chuck up bytes that bind a name to a value.

29
00:02:32,000 --> 00:02:38,000
This document is signed by the private key, K, via private key, K inverse, K1 inverse.

30
00:02:38,000 --> 00:02:46,000
If I already have the public key K1 that I can verify this was signed with the right public private key.

31
00:02:46,000 --> 00:02:56,000
If I trust the party who is K1 inverse, then I can trust their claim the name, for example a host name, has the public key K2.

32
00:02:56,000 --> 00:03:02,000
I can then use K2 when communicating with N. In this way I establish a chain of trust.

33
00:03:02,000 --> 00:03:09,000
If I start with the public key of one party that I trust, then this party can give me public keys for other parties.

34
00:03:09,000 --> 00:03:12,000
Those parties can give me further public keys.

35
00:03:15,000 --> 00:03:20,000
If you browse the web a lot, you've probably seen an error message like this one come up many times.

36
00:03:20,000 --> 00:03:26,000
This one is for Firefox. It tells you that you can't trust the site as secure. Why?

37
00:03:26,000 --> 00:03:31,000
Generally, you see this error because there's a mistaken certificate.

38
00:03:31,000 --> 00:03:37,000
For example, the host at Stanford, my research group runs, sing.standford.edu.

39
00:03:37,000 --> 00:03:41,000
It has a few other names such as tinywest.standford.edu.

40
00:03:41,000 --> 00:03:48,000
Stanford provided me with a certificate that says that these names are associated with the server's public key.

41
00:03:48,000 --> 00:03:59,000
But if I added a name to Stanford's DNS such as badsang.standford.edu, then this certificate wouldn't have that name.

42
00:03:59,000 --> 00:04:09,000
If you tried to connect to badsang.standford.edu over HTTPS, you'd receive an error like this one because the certificate Stanford gave me doesn't cover that name.

43
00:04:09,000 --> 00:04:16,000
So you often run into this error when someone has aliases for a host or is a certificate for an old name and has an updated there.

44
00:04:16,000 --> 00:04:21,000
But it could be an adversary running a different server and trying to convince you it's trustable.

45
00:04:21,000 --> 00:04:27,000
Generally speaking, seeing this error means someone has misconfigured their system for security.

46
00:04:27,000 --> 00:04:33,000
When I see an error like this, I never say okay, even if it's just a little mistake.

47
00:04:33,000 --> 00:04:44,000
Given how subtle and hard security is, and how obvious this mistake is, I don't trust. I don't want to trust this server.

48
00:04:44,000 --> 00:04:47,000
And so this is how things work today.

49
00:04:47,000 --> 00:04:50,000
Everyone trusts a few signing authorities and knows their public keys.

50
00:04:50,000 --> 00:04:53,000
These keys are hard baked into your browser or operating system.

51
00:04:53,000 --> 00:04:56,000
Good reason to check your programs for integrity.

52
00:04:56,000 --> 00:05:00,000
Here, let's take a look at the keys installed on my Mac.

53
00:05:00,000 --> 00:05:07,000
I open up applications, utilities, keychain access.

54
00:05:13,000 --> 00:05:19,000
And you can see all these different keys that are pre-installed on my Macintosh.

55
00:05:19,000 --> 00:05:23,000
These are root keys which they have already been installed.

56
00:05:23,000 --> 00:05:26,000
And these are public keys that I can trust.

57
00:05:29,000 --> 00:05:33,000
There they are. The public keys are hard baked into the operating system.

58
00:05:33,000 --> 00:05:42,000
You can see a vericine down here and up here you can see Apple.

59
00:05:43,000 --> 00:05:49,000
These root authorities can assign keys for other parties.

60
00:05:49,000 --> 00:05:55,000
For example, let's go to Google. I'm accessing Google over HTTPS.

61
00:05:55,000 --> 00:06:00,000
I've also installed a plugin for Firefox called CypherFox that lets me look at certificate details.

62
00:06:00,000 --> 00:06:05,000
I can click on the lock and now see the certificate.

63
00:06:05,000 --> 00:06:19,000
You can see that www.google.com is signed by the Google Internet Authority,

64
00:06:19,000 --> 00:06:26,000
which is in turn signed by the Geotrust Global Certificate Authority.

65
00:06:26,000 --> 00:06:29,000
So here's the certificate hierarchy.

66
00:06:30,000 --> 00:06:36,000
Signing authorities are often called CAs for certificate authorities.

67
00:06:36,000 --> 00:06:46,000
But realize that all certificate says is that it testifies someone testifies a host has this key.

68
00:06:46,000 --> 00:06:50,000
If there's an adversary along certificate chain, then you could be fooled.

69
00:06:50,000 --> 00:06:54,000
It turns out there are actually many different kinds of certificates for this reason.

70
00:06:54,000 --> 00:07:00,000
Some such as the one I have on the same.stant4d.edu doesn't require much more than filling out a web form.

71
00:07:00,000 --> 00:07:05,000
Others require paper validation and possibly meeting someone in person.

72
00:07:05,000 --> 00:07:12,000
So this is how TLS HTTPS work today when you see the padlock on your browser bar.

73
00:07:12,000 --> 00:07:16,000
You connect to a server and it provides a certificate with its public key.

74
00:07:16,000 --> 00:07:24,000
It's if the certificate chain ends in a rude certificate authority that you trust that is already of the public key for suks and verified signature,

75
00:07:24,000 --> 00:07:28,000
then you trust the key in the certificate and encrypt data of the server.

76
00:07:28,000 --> 00:07:31,000
I'll explain the details of this in the TLS video.

