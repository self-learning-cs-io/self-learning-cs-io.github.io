---
title: CS144 NetworkP1188 5SecurityPrinciples
---

1
00:00:00,000 --> 00:00:09,439
So it's a dangerous world out there.

2
00:00:09,439 --> 00:00:11,599
I want to keep our computer system secure.

3
00:00:11,599 --> 00:00:14,519
But exactly what does this mean?

4
00:00:14,519 --> 00:00:16,039
Every system in protocol is different.

5
00:00:16,039 --> 00:00:20,559
But when talking about security, we generally talk about three properties.

6
00:00:20,559 --> 00:00:26,920
Confidentiality, Integrity, and Affiliability.

7
00:00:26,920 --> 00:00:30,320
We'll call our threat model based on all the attacks we've covered,

8
00:00:30,320 --> 00:00:32,880
an adversary can snoop on all of your traffic,

9
00:00:32,880 --> 00:00:36,079
suppress any of your packets, replay packets,

10
00:00:36,079 --> 00:00:41,480
and even generate new packets that seem to come from your host and or application.

11
00:00:41,480 --> 00:00:44,600
To defend against this, we're going to use two approaches.

12
00:00:44,600 --> 00:00:48,880
The first, cryptography, is way to communicate securely end-to-end,

13
00:00:48,880 --> 00:00:51,920
despite the fact that the network in between is insecure.

14
00:00:51,920 --> 00:00:54,600
Cryptography literally means the study of codes.

15
00:00:54,600 --> 00:00:57,359
Instead of mathematical tools focused on the idea of secrets

16
00:00:57,359 --> 00:01:01,439
and the computational difficulty of understanding data without the secret.

17
00:01:01,439 --> 00:01:03,280
Using cryptography as a building block,

18
00:01:03,280 --> 00:01:05,400
it turns out that we can actually build end-to-end,

19
00:01:05,400 --> 00:01:09,120
secure communication despite the fact that the adversary might control

20
00:01:09,120 --> 00:01:11,400
and own the entire network.

21
00:01:11,400 --> 00:01:14,480
By secure, I mean the adversary can't rewrite our messages,

22
00:01:14,480 --> 00:01:18,640
generate new messages, or snoop our messages.

23
00:01:18,640 --> 00:01:22,520
The second approach is to prevent an adversary from blocking our messages.

24
00:01:22,519 --> 00:01:24,959
Even if two hosts can communicate securely,

25
00:01:24,959 --> 00:01:27,959
an adversary could prevent them from communicating at all.

26
00:01:27,959 --> 00:01:32,039
The general approach for this is the design systems to be scalable.

27
00:01:32,039 --> 00:01:34,239
Take, for example, DNS.

28
00:01:34,239 --> 00:01:36,199
The fact that there are so many root servers,

29
00:01:36,199 --> 00:01:38,519
some of which are highly replicated,

30
00:01:38,519 --> 00:01:42,439
means that it's very hard to launch a denial of service attack against it.

31
00:01:42,439 --> 00:01:45,039
I'm not going to talk much about scalable system design,

32
00:01:45,039 --> 00:01:48,560
it's a complex topic worthy of a whole course in and of itself.

33
00:01:48,560 --> 00:01:52,319
Instead, I'm going to focus on the networking part of the problem,

34
00:01:52,319 --> 00:01:54,119
secure communication.

35
00:01:57,119 --> 00:02:02,159
Cryptography is a set of mathematical principles and ideas for securing communication.

36
00:02:02,159 --> 00:02:05,799
The most important thing to know about cryptography is that it can be very subtle

37
00:02:05,799 --> 00:02:07,439
and details oriented.

38
00:02:07,439 --> 00:02:10,959
If there's a single flaw in your system, then it's not secure.

39
00:02:10,959 --> 00:02:13,400
So just taking cryptography and applying it without care

40
00:02:13,400 --> 00:02:16,639
is unlikely to make your system secure.

41
00:02:16,639 --> 00:02:21,560
Instead of inventing a whole new, your own whole new security system,

42
00:02:21,560 --> 00:02:27,319
it's much, much safer to use existing, tested, well understood ones.

43
00:02:27,319 --> 00:02:31,240
It's often the case that ideas from security are misused or misunderstood,

44
00:02:31,240 --> 00:02:35,520
such as people thinking a message authentication code, a security primitive,

45
00:02:35,520 --> 00:02:40,280
had the same error detection properties as CRC.

46
00:02:40,280 --> 00:02:43,640
Cryptography can give us three valuable things.

47
00:02:43,640 --> 00:02:45,560
The first is confidentiality.

48
00:02:45,560 --> 00:02:48,400
This is the ability to communicate with another party privately,

49
00:02:48,400 --> 00:02:50,400
such that no one else can read it.

50
00:02:50,400 --> 00:02:55,520
Cryptography provides confidentiality through something called encryption.

51
00:02:55,520 --> 00:02:57,520
The second is integrity.

52
00:02:57,520 --> 00:03:01,280
This is the ability to know if our messages have been tampered with.

53
00:03:01,280 --> 00:03:04,480
There are many ways to provide integrity, depending on the exact needs

54
00:03:04,480 --> 00:03:07,360
and the type of cryptography used.

55
00:03:07,360 --> 00:03:12,000
There are three basic mechanisms which future videos will cover, in depth,

56
00:03:12,000 --> 00:03:16,240
and there are cryptographic hashes, cryptographic signatures,

57
00:03:16,240 --> 00:03:19,719
and message authentication codes are max.

58
00:03:19,719 --> 00:03:22,439
Finally, there is authenticity.

59
00:03:22,439 --> 00:03:26,520
This is the ability for the party to prove they are who they say they are.

60
00:03:26,520 --> 00:03:31,280
The three basic mechanisms for authenticity, which future videos will cover in depth,

61
00:03:31,280 --> 00:03:36,280
are certificates, message authentication codes, and cryptographic signatures.

62
00:03:39,439 --> 00:03:42,079
Again, I really can't stress it enough.

63
00:03:42,079 --> 00:03:47,879
Cryptography can make your system secure, but if and only if you use it carefully and correctly.

64
00:03:47,879 --> 00:03:50,599
It's very, very easy to make a mistake.

65
00:03:50,599 --> 00:03:53,960
Don't trust systems that seem to have to tack security on later

66
00:03:53,960 --> 00:03:57,599
and don't think making a system secure is easy.

67
00:03:59,879 --> 00:04:02,479
So the first property is confidentiality.

68
00:04:02,479 --> 00:04:05,759
The idea is the two parties you will be able to exchange information secretly,

69
00:04:05,759 --> 00:04:10,000
so no one else can understand what they're sending, even if they can read the messages.

70
00:04:10,000 --> 00:04:13,039
This is really useful if you want to send a credit card number.

71
00:04:13,079 --> 00:04:18,480
A cryptosystem that is perfect confidentiality is something called a one-time pad.

72
00:04:18,480 --> 00:04:23,879
The idea is that you and I can share perfectly randoms key of zeros and ones.

73
00:04:23,879 --> 00:04:26,879
No one else has this key, this one-time pad.

74
00:04:26,879 --> 00:04:30,839
To send you a message, I just x-sort the message M with a key K,

75
00:04:30,839 --> 00:04:36,039
producing a confidential message C. I then send C to reconstruct M,

76
00:04:36,039 --> 00:04:38,959
you just x-sort C with K.

77
00:04:38,959 --> 00:04:43,680
A one-time pad is an example of perfectly secure confidentiality.

78
00:04:43,680 --> 00:04:50,000
If the one-time pad is perfectly random, then given any C, any M is equally likely.

79
00:04:50,000 --> 00:04:53,839
It's also very fast. All you have to do is x-sort.

80
00:04:53,839 --> 00:04:56,679
But a one-time pad isn't very practical.

81
00:04:56,679 --> 00:04:59,639
K has to be at least as long as M.

82
00:04:59,639 --> 00:05:04,159
If I want to exchange 100 megabytes with you, I need a 100 megabyte K.

83
00:05:04,159 --> 00:05:07,359
So in practice, cryptosystems that provide confidentiality,

84
00:05:07,360 --> 00:05:13,280
try to provide algorithms in which we can exchange a much smaller K, say 128 bits or 256 bits,

85
00:05:13,280 --> 00:05:21,319
such that 2 to the 128 are 2 to the 256 possible confidential messages possible C's.

86
00:05:21,319 --> 00:05:24,439
The second property is integrity.

87
00:05:24,439 --> 00:05:30,319
Integrity is the ability to exchange messages and be sure they are not tampered with or changed.

88
00:05:30,319 --> 00:05:34,560
For example, when I download software, I want to know it's the real version and not a hacked version

89
00:05:34,560 --> 00:05:37,720
that installs malware on my machine.

90
00:05:37,720 --> 00:05:41,560
Some forms of integrity also allow you to know that the other party sent the message.

91
00:05:41,560 --> 00:05:46,480
If the two of you share a secret key, then there are forms of integrity which only someone

92
00:05:46,480 --> 00:05:50,840
with a secret key can perform correctly.

93
00:05:50,840 --> 00:05:56,720
Two very common forms of integrity are cryptographic hashes and message authentication codes.

94
00:05:56,720 --> 00:06:01,000
Cryptographic hashes are functions that turn arbitrary length data into a fixed length hash,

95
00:06:01,000 --> 00:06:03,240
just like a normal hash function.

96
00:06:03,240 --> 00:06:08,400
But cryptographic hashes have the additional property of their collision resistant.

97
00:06:08,400 --> 00:06:15,000
If I have a message x with a hash, h of x, then it's intractable for someone to find a message

98
00:06:15,000 --> 00:06:19,160
y different from x which has the same hash.

99
00:06:19,160 --> 00:06:23,319
This means for example, if I know a cryptographic hash of a program I want to download, then

100
00:06:23,319 --> 00:06:28,360
it's intractable for someone to hack the software in a way that has the same hash.

101
00:06:28,360 --> 00:06:33,920
The authentication codes, max, are like cryptographic hashes except they use a key k to both

102
00:06:33,920 --> 00:06:36,120
generate and check the MAC.

103
00:06:36,120 --> 00:06:40,720
Anyone can crypt generate a cryptographic hash but only someone with k can compute the correct

104
00:06:40,720 --> 00:06:41,720
MAC.

105
00:06:41,720 --> 00:06:46,060
With a MAC, it's intractable to generate the correct MAC of a message unless you have the key

106
00:06:46,060 --> 00:06:47,060
k.

107
00:06:47,060 --> 00:06:51,680
So if we've exchanged key, the key k beforehand and I receive a message with a correct

108
00:06:51,680 --> 00:06:56,400
MAC, then I know that no day tamper with a message and you generated the MAC.

109
00:06:56,400 --> 00:06:58,180
There's authenticity.

110
00:06:58,180 --> 00:07:02,819
This is the ability to verify someone is who they say they are.

111
00:07:02,819 --> 00:07:07,840
For example, you receive a message supposedly from the provost and want to be sure the provost

112
00:07:07,840 --> 00:07:09,860
actually sent it.

113
00:07:09,860 --> 00:07:14,220
If you and the provost have exchanged a secret beforehand, then you can do this with message

114
00:07:14,220 --> 00:07:16,100
authentication codes.

115
00:07:16,100 --> 00:07:19,980
If you receive a message that has a correct MAC, computed with the secret you've shared

116
00:07:19,980 --> 00:07:23,660
with the provost, you know that the provost sent it.

117
00:07:23,660 --> 00:07:27,860
If you don't have a secret, then you can use a chain of trust.

118
00:07:27,860 --> 00:07:31,699
If you trust one party, then that party can vouch for someone else.

119
00:07:31,699 --> 00:07:35,699
This second party can then vouch for a third party and so on.

120
00:07:35,699 --> 00:07:42,460
So, for example, suppose we have some information that lets us check Verassign's authenticity.

121
00:07:42,460 --> 00:07:48,699
Verassign can then vouch for Stanford and Stanford can vouch for the provost.

122
00:07:48,699 --> 00:07:55,699
Finally, there's how you design computer systems for high availability so they're resistant

123
00:07:55,699 --> 00:07:58,779
to done on aisle service and distributed denial of service attacks.

124
00:07:58,779 --> 00:08:02,779
There are tons of kinds of attacks out there of replication attacks, resource use attacks,

125
00:08:02,779 --> 00:08:05,339
ping attacks, botnets attacks, etc.

126
00:08:05,339 --> 00:08:08,779
Generally speaking, you can either scale out your system so it distributes the load and

127
00:08:08,779 --> 00:08:10,019
you can handle it.

128
00:08:10,019 --> 00:08:12,860
Or at some point, you can filter the traffic upstream.

129
00:08:12,860 --> 00:08:16,379
For example, if someone is dedossing your cable modem, you could possibly contact your

130
00:08:16,379 --> 00:08:18,459
ISP to filter out traffic coming at it.

