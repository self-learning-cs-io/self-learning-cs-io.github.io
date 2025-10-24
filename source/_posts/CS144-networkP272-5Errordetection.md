---
title: CS144 NetworkP272 5Errordetection
---

1
00:00:00,000 --> 00:00:05,000
Networks aren't perfect and neither are the hosts that run on them.

2
00:00:05,000 --> 00:00:11,000
They can introduce errors and for a network to be able to run properly, it needs to be able to detect these errors.

3
00:00:11,000 --> 00:00:17,000
For example, let's say that a router along our path has a bad memory cell, such that sometimes it flips a bit in a packet.

4
00:00:17,000 --> 00:00:24,000
Imagine, for example, if the bit flipped is the most significant bit of the amount of charge or credit card.

5
00:00:24,000 --> 00:00:29,000
We need to be able to detect that error occurred so we don't accept the corrupted data as correct data.

6
00:00:29,000 --> 00:00:33,000
Networks today usually use three different error detection algorithms.

7
00:00:33,000 --> 00:00:39,000
Check sums, cyclobodontic codes, or CRCs, and message authentication codes, or MACS.

8
00:00:39,000 --> 00:00:43,000
Each of them has very different characteristics. Understanding their differences is important.

9
00:00:43,000 --> 00:00:48,000
I've actually been in meetings in the IETF where a few people weren't aware of the differences.

10
00:00:48,000 --> 00:00:52,000
If you don't know, you might make a bad protocol decision or protocol analysis.

11
00:00:59,000 --> 00:01:20,000
At a high level, error detection looks like this. We have a payload of data.

12
00:01:20,000 --> 00:01:27,000
We calculate some error detection bits over that data and either append or prepend it to the payload.

13
00:01:27,000 --> 00:01:35,000
For example, Ethernet appends a cyclic redundancy code or CRC, while transportation security, TLS, appends a message authentication code.

14
00:01:35,000 --> 00:01:39,000
IP prepends a check sum, which replaces the IP header.

15
00:01:39,000 --> 00:01:46,000
TLS and Ethernet have a footer, protocol information, which follows the payload, which is where they put the CRC and MAC.

16
00:01:57,000 --> 00:02:24,000
The first of the three commonly used error detection algorithms is a check sum. You just add up all the data of the packet.

17
00:02:24,000 --> 00:02:30,000
It's what TCP and IP use. Chexons are nice because they are very fast and cheap to compute, even in software.

18
00:02:30,000 --> 00:02:33,000
Back with the internet started and everything was in software, this was valuable.

19
00:02:33,000 --> 00:02:37,000
Their major drawback is that they have pretty weak error detection guarantees.

20
00:02:37,000 --> 00:02:42,000
While they can catch a lot of random errors, it's easy to fool a check sum with as few as two bit errors.

21
00:02:42,000 --> 00:02:50,000
If the two bit errors count to each other out. For example, if one bit error adds 32, and another bit error subtracts 32, the check sum won't catch the error.

22
00:02:50,000 --> 00:02:56,000
So check sum can catch a lot of errors, but it turns out to very weak guarantees on what errors it will catch.

23
00:02:56,000 --> 00:03:01,000
The second of the three commonly used error detection algorithms is a cyclic redundancy code or CRC.

24
00:03:01,000 --> 00:03:09,000
A CRC is much more computationally expensive than a check sum, but also much more robust. It computes the remainder of a polynomial.

25
00:03:09,000 --> 00:03:11,000
I'll show what this means in how it works in a few minutes.

26
00:03:11,000 --> 00:03:17,000
With today's processors, it's easy to do, and it's really easy to do on hardware. It's what Ethernet and many Linklares use.

27
00:03:17,000 --> 00:03:22,000
In some ways, TCP and IP can get away with check sums because Linklares use CRCs.

28
00:03:22,000 --> 00:03:35,000
If you have a CRC that's C bits long, a CRC can detect any one bit error, any two bit error, and any single burst of errors less than or equal to C bits long, as well as any odd number of errors.

29
00:03:35,000 --> 00:03:40,000
So you can detect a lot of errors, much stronger guarantees than a check sum.

30
00:03:41,000 --> 00:03:51,000
The final algorithm is something called a Message Authentication Coder Mac. A Message Authentication code combined with the packet with some secret information to generate a value.

31
00:03:51,000 --> 00:03:55,000
In theory, someone can only generate or check the Mac if they have the secret.

32
00:03:55,000 --> 00:04:00,000
So if you receive a packet and the Mac is correct, then you're pretty sure the computer the computer the Mac has the secret.

33
00:04:00,000 --> 00:04:05,000
Unless I have the secret, it's amazingly difficult to generate the correct Mac for a packet.

34
00:04:05,000 --> 00:04:16,000
So a bad guy can't easily generate a new packet. In fact, if you have a strong Mac algorithm, then given one packet and its Mac, I have zero information on what the Mac will look like if I flip a single bit.

35
00:04:16,000 --> 00:04:28,000
Message Authentication Codes are therefore robust to malicious modifications. Message Authentication Codes are used in Transport Layer Security, TLS, which is what you use in your browse web page, securely, HGPS.

36
00:04:28,000 --> 00:04:39,000
But they're actually not great for catching errors. If I flip a single bit in the packet, there is one and two to the C-chance that the changed packet will have the same Mac.

37
00:04:39,000 --> 00:04:51,000
I've seen people make this mistake with TogMatera correction, thinking of Mac as just as good as a CRC. It's not. If I have a 16-bit CRC, I'm assured that I'll detect a first of errors that are 16-bits longer shorter.

38
00:04:51,000 --> 00:05:05,000
If I have a 16-bit Mac, I'm only assured that I'll detect a bit errors with very high probability, 99.90% or 165,536. That's high, but think about how many packets you've watched just receiving this video.

39
00:05:05,000 --> 00:05:09,000
I'll now go into each of these algorithms in greater detail.

40
00:05:09,000 --> 00:05:23,000
Let's start with a checksum. IP, UDP, and TCP use one's complement checksums. This means they add up the packet using one's complement arithmetic, a version of binary arithmetic some older computers used. Most of the day, use two's complement arithmetic.

41
00:05:23,000 --> 00:05:37,000
The algorithm is pretty simple. You start by sending the checksum field a little packet to zero. Then you add every 16-bit word in the packet. Any time you have to carry, because the sum is greater than two to the 16 or 65,535, you carry the back of the bit back in.

42
00:05:37,000 --> 00:05:53,000
So 60,000 plus 8,000 is 68,000 minus 65,535 plus 1, or 2,466. Once you've added up the complete packet, flip the bits in your sum and make this the checksum of the packet.

43
00:05:53,000 --> 00:06:01,000
Then, if you add up the complete packet, including this checksum value, you should get 0xFFF, all ones.

44
00:06:01,000 --> 00:06:12,000
There's one edge case. If the computer checksum is all ones, you don't make the checksum field zero and you make it all ones. In IP, UDP, and TCP, it checksum field of zero means there's no checksum.

45
00:06:12,000 --> 00:06:21,000
That's it. You can write this in just a few lines of seco. It's fast, easy to compute, and easy to check. All you need to do is add the bytes of a packet and check that the checksum is all ones.

46
00:06:21,000 --> 00:06:28,000
Given that most early internet implementations were in software, this is really helpful.

47
00:06:29,000 --> 00:06:41,000
The drawback is that it's not really that door bust. While it definitely detects a lot of random errors, the guarantees it can give on what errors it detects are really weak. In practice, it can only promise to catch single bit errors.

48
00:06:41,000 --> 00:06:45,000
But it works pretty well, and LinkLayer is doing a lot of heavy lifting for us.

49
00:06:45,000 --> 00:06:50,000
LinkLayer is doing their heavy lifting with something called a cyclic redundancy check, or CRC.

50
00:06:51,000 --> 00:06:59,000
The idea of a CRC is that I want to take the end bits of source data, and someone to still them down to see bits of error detection data, or see as much smaller than that.

51
00:06:59,000 --> 00:07:08,000
For example, I might have a 1500 byte ethernet frame, with a 4 byte 32 bit CRC. USB and Bluetooth use 16 bit CRCs.

52
00:07:08,000 --> 00:07:17,000
Of course, we can't detect all errors. Given some other random packet, the chances that CRC matches is 2 to the minus c, or 1 and 2 to the c.

53
00:07:17,000 --> 00:07:27,000
For example, if I use an 8 bit CRC, then out of the space of all packets, 1 and 256, or 0.4%, had the same CRC as my packet.

54
00:07:27,000 --> 00:07:39,000
But CRCs are stronger than check sums. They can detect there's an error in any packet with an odd number of errors, 2 bit errors, or any single burst of errors equal to or less than c bits long.

55
00:07:39,000 --> 00:07:52,000
They can't guarantee detecting errors besides these, but they do a good job at it. For example, a 16 bit CRC can't guarantee you'll detect 2 bursts of 3 bit errors spaced far apart in the packet, but it's likely it will detect it.

56
00:07:52,000 --> 00:08:01,000
Link layers typically use CRCs. The pretty robust, and as many link layers are vulnerable to burst of errors, the burst detection capabilities of CRCs is useful.

57
00:08:01,000 --> 00:08:10,000
It's not hard to make a hardware compute them quickly, and you can compute them incrementally as you read or write the packet.

58
00:08:10,000 --> 00:08:20,000
So how does a CRC work? It distills these n bits and decebits using something called polynomial long division. You take bits of a message and use them to describe a polynomial m.

59
00:08:20,000 --> 00:08:29,000
Each bit in a packet is the coefficient of one term of the polynomial. If the bit is 0, the term is absent. If the bit is 1, the term is present.

60
00:08:29,000 --> 00:08:50,000
So, for example, a message of 1,00, 111, 01 is the polynomial x to the 7th plus x to the 4th plus x to the 3rd plus x squared plus 1, which is x to the 0. This is because the 7th, 4th, 3rd, 2nd, and 0th bits are set in the message.

61
00:08:50,000 --> 00:09:06,000
When we calculate a CRC, we have something called a generator polynomial. This is defined by the CRC algorithm. For example, the CRC, 16 algorithm used by USB, has a generator polynomial of x to the 16th plus x to the 15th plus x squared plus 1.

62
00:09:06,000 --> 00:09:20,000
For frustrating historical reasons, the generator polynomial is one term longer than this number of bits. The first term is always 1. So the CRC 16 generator polynomial is written as 0x, 8,005, even though it has an x to the 16th term.

63
00:09:21,000 --> 00:09:42,000
To compute a CRC, you take the message M, pat it with 0 is equal to the CRC length, and divide this pated value by G. The remainder is the CRC, which you append to the message. To check a CRC, you divide the message plus CRC by the generator polynomial G, if the remainder is 0, then the CRC passes.

64
00:09:42,000 --> 00:09:48,000
I won't go into the details of how this works mathematically, but it turns out it can be implemented very quickly and efficiently in hardware.

65
00:09:48,000 --> 00:10:03,000
The strength of your CRC algorithm depends on what generator polynomial G you pick. This puts a lot of study of this, and so many good options which have the error detection properties I mentioned earlier, which you might not get the same error detection strength if you pick your own generator polynomial.

66
00:10:03,000 --> 00:10:15,000
The third and final kind of error detection algorithm you commonly see in networks is a message authentication code or MAC. Like CRC, there's a deep and rich mathematical background on how message authentication codes work. There are good ones and bad ones.

67
00:10:15,000 --> 00:10:30,000
So you generally want to use an existing scheme rather than an inventory room. Thankfully, standard usually specify what MAC to use, and though there are some mistakes in the late 90s or standards picked for algorithms, nowadays security is important enough that everyone relies on a small number of really well studied approaches.

68
00:10:30,000 --> 00:10:40,000
Message authentication codes use cryptography, branch of mathematics that deals with secrets. The idea behind most message authentication codes is that the two parties share a secret S.

69
00:10:40,000 --> 00:10:52,000
The secret is just a set of randomly generated bits, random so it's hard to guess. To calculate a message authentication code C, you apply the MAC algorithm to the message N and the secret S.

70
00:10:52,000 --> 00:11:03,000
MAC algorithms are the property that if you don't have S, then it's really hard to generate the correct C for a message M. Furthermore, it's very hard to create a message M whose message authentication code is C.

71
00:11:03,000 --> 00:11:10,000
By hard, I mean is that the best case you just have to exhaustively try, having M in C gives you almost no information on what S is.

72
00:11:10,000 --> 00:11:20,000
This means that if you receive a message M with the correct message authentication code, this means the computer that generated the message probably has the secret.

73
00:11:20,000 --> 00:11:25,000
Or someone replayed a message generated by that computer.

74
00:11:25,000 --> 00:11:42,000
Because the goal is to keep S a secret, cryptographically strong message authentication codes an interesting property, you change a single bit in M, then this results in a completely new CRC, where the probability any bit in C is 0 or 1 is seemingly random, independent of the earlier C.

75
00:11:43,000 --> 00:11:52,000
If this weren't the case, then someone could take a message, flip a single bit, so it changed a dollar value, and it wouldn't be that difficult to generate the correct C.

76
00:11:52,000 --> 00:12:02,000
This means that technically message authentication codes have no error detection guarantees. If you flip a single bit, you could end up with the exact same MAC.

77
00:12:03,000 --> 00:12:07,000
Message authentication codes are very useful, but they're first and foremost a security mechanism.

78
00:12:07,000 --> 00:12:18,000
Being able to get both error detection and security one with one mechanism is efficient and nice, but their security properties mean that their error detection isn't as good as other approaches.

79
00:12:18,000 --> 00:12:27,000
Let's go over the answers. Both checksems can detect a single bit error. Remember, this is one of the errors that checks and guarantees detecting.

80
00:12:27,000 --> 00:12:31,000
Both CRCs can also detect a single bit error.

81
00:12:32,000 --> 00:12:40,000
A MAC can't guarantee that it'll detect a single bit error. For security reasons, it could be that the new MAC is the same as the old one, so it can't guarantee detecting it.

82
00:12:40,000 --> 00:12:48,000
In fact, a MAC can't guarantee detecting errors, so you can mark no for all the columns for the message authentication code.

83
00:12:48,000 --> 00:12:54,000
So how about two bit errors? Check sums can't guarantee detecting two bit errors, so no for both of them.

84
00:12:55,000 --> 00:13:06,000
CRCs, though, can detect guaranteeing bit errors runs less than or equals the length of the CRC. Since two bits is shorter than both 8 bits and 16 bits, both CRCs can detect a run of two bit errors.

85
00:13:06,000 --> 00:13:14,000
Correspondingly, an 8 bit CRC can't guarantee detecting a run of 9 bit errors, but a 16 bit CRC can.

86
00:13:14,000 --> 00:13:20,000
So no for the 8 bit CRC, and yes, for the 16 bit CRC, for a 9 bit error runs.

87
00:13:20,000 --> 00:13:27,000
How about two bit errors 100 bits apart? It turns out none of these algorithms can guarantee detecting this error, so no for all of them.

88
00:13:27,000 --> 00:13:35,000
Looking at this matrix, you might think error detection is a waste. The algorithms promise very little, but guarantee is a very strong statement.

89
00:13:35,000 --> 00:13:41,000
While an 8 bit check sum can't guarantee you will catch a run of 9 bit errors, there's a high probability it will.

90
00:13:41,000 --> 00:13:49,000
Similarly, a 16 bit CRC is a very high probability of detecting two bit errors 100 bits apart, and in practice, high probability is often good enough.

91
00:13:49,000 --> 00:13:54,000
If failures are rare, then you only sometimes have to do something more expensive to recover.

92
00:13:54,000 --> 00:14:06,000
But it means in practice, you tend to have multiple layers of error detection. The link layer detection is CRCs, IP detection, and the check sums, TCP detection with check sums, and then off the application has its own error detection.

93
00:14:06,000 --> 00:14:11,000
So I'll put together the chances of errors creeping through is very, very low.

94
00:14:11,000 --> 00:14:16,000
So we've seen three error detection schemes, check sums, CRCs, and message authentication codes.

95
00:14:17,000 --> 00:14:23,000
Data error detection is a great example of the end-to-end principle. It's actually what originally motivated the principle.

96
00:14:23,000 --> 00:14:29,000
The only way a layer can be sure that it communicates data correctly is to perform an end-to-end check.

97
00:14:29,000 --> 00:14:34,000
Ethernet needs to be sure that its frames don't have errors, so it can parse them correctly, so it has a CRC.

98
00:14:34,000 --> 00:14:38,000
IP needs to be sure that its packets are in a verice, so it can parse them correctly.

99
00:14:39,000 --> 00:14:44,000
IP can't depend on what Ethernet is doing to check for its own check.

100
00:14:44,000 --> 00:14:49,000
The Ethernet Carter driver might introduce an error after the driver checks the packet.

101
00:14:49,000 --> 00:14:53,000
So IP has to do its own end-to-end check at the network layer.

102
00:14:53,000 --> 00:14:56,000
TLS using message authentication codes is another example.

103
00:14:56,000 --> 00:15:07,000
It's especially interesting because TLS is very different error detection requirements than IP Ethernet. It wants security, so it has to provide its own end-to-end error detection scheme,

104
00:15:07,000 --> 00:15:12,000
so it's the only way it can be sure its requirements are met.

