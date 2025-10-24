---
title: CS144 NetworkP352 10Reliablecomm
---

1
00:00:00,000 --> 00:00:04,459
So this video I'm going to give a brief overview of the TCP header. If you want more

2
00:00:04,459 --> 00:00:07,400
information there's of course tons of documentation online but there's just a

3
00:00:07,400 --> 00:00:11,779
brief summary of kind of what the fields in the header in their meaning. A standard

4
00:00:11,779 --> 00:00:18,859
TCP header is 20 bytes long so we can see here that there are five rows of four

5
00:00:18,859 --> 00:00:24,120
octets each. Additionally you can have options after the TCP header. I'm not

6
00:00:24,120 --> 00:00:26,560
going to go into any of those now. The basic TCP header you see in most

7
00:00:26,559 --> 00:00:32,079
connections is 20 bytes long. So the first two fields in TCP are the source

8
00:00:32,079 --> 00:00:36,839
port and destination port. Each of these are 16 bits or two octets so we talk

9
00:00:36,839 --> 00:00:42,119
about connecting to the web port port 80 that's a destination port say of 80.

10
00:00:42,119 --> 00:00:48,119
The next two fields are the TCP sequence numbers. So these denote from the

11
00:00:48,119 --> 00:00:53,560
source of this packet to its destination what is the sequence number of the data

12
00:00:53,560 --> 00:01:00,240
contained in this segment as well as what is the acknowledgement number from

13
00:01:00,240 --> 00:01:05,820
that endpoint. So for example if I want to acknowledge that I've received up to

14
00:01:05,820 --> 00:01:16,599
byte 5,000 and then this is sequence number 4,000 then as I said I will send

15
00:01:16,599 --> 00:01:22,280
sequence number 4,000 acknowledgement number 5,000. The sequence number denotes

16
00:01:22,280 --> 00:01:28,040
what the sequence number is of the first byte of the data region which follows

17
00:01:28,040 --> 00:01:33,480
the segment header. So if I had a sequence number of 4,000 and there were 500 bytes

18
00:01:33,480 --> 00:01:43,159
of data then this would mean byte 4,000 to 4,499. Now the acknowledgement number

19
00:01:43,159 --> 00:01:50,359
acknowledges the last byte received plus one and so if I were to send this

20
00:01:50,359 --> 00:01:56,879
segment 4,000 to 4,499 and the other side received it it would send an

21
00:01:56,879 --> 00:02:06,400
acknowledgement number of 4,500 that is in TCP the act is not for the last byte

22
00:02:06,400 --> 00:02:10,919
received but that plus one what is the next byte that is needed. So when we talk

23
00:02:10,919 --> 00:02:15,120
about TCP act packets what these are is these are TCP segments that have no

24
00:02:15,120 --> 00:02:18,159
data all they're doing is counting the acknowledgement numbers for this

25
00:02:18,159 --> 00:02:21,199
happens if say traffic is unidirectional sending lots of data in one

26
00:02:21,199 --> 00:02:25,439
direction but there isn't data coming back. If the flow is byteirectional then

27
00:02:25,439 --> 00:02:29,800
these acknowledgement numbers are just going to be added or padded onto or not

28
00:02:29,800 --> 00:02:34,439
padded but incorporated into the data segments that they're being sent. So after

29
00:02:34,439 --> 00:02:39,079
the sequence number and acknowledgement number we have a bunch of fields. Let's

30
00:02:39,079 --> 00:02:45,719
start with the checksum. So the checksum is computed over the TCP

31
00:02:45,719 --> 00:02:52,960
pseudo header which is the TCP header as well as some of the IP header. This

32
00:02:52,960 --> 00:02:57,280
way just add a little bit of additional resilience for the IP header like the

33
00:02:57,280 --> 00:03:04,639
IP addresses etc. So the checksum covers the pseudo header, the TCP header and

34
00:03:04,639 --> 00:03:08,719
then the data within the TCP segment. And so the checksum actually in some

35
00:03:08,719 --> 00:03:12,199
way stretches before the packet to the pseudo header filled in from the IP

36
00:03:12,199 --> 00:03:16,739
header and then stretches to the end of the segment. Simple ones complement

37
00:03:16,739 --> 00:03:23,599
checksum. The window field is the flow control window. It tells the end point. So

38
00:03:23,599 --> 00:03:27,239
the flow control window the window field within a packet is telling the other

39
00:03:27,239 --> 00:03:31,699
endpoint how much receive buffer space its sender has. So if you say say a

40
00:03:31,699 --> 00:03:36,679
window of 20,000 that means that there cannot be more than 20,000 outstanding

41
00:03:36,680 --> 00:03:42,200
unacknowledged bytes in this connection in that direction. So these bits here

42
00:03:42,200 --> 00:03:51,200
UAPRSNF are control bits. So let's start with some of the sort of less less

43
00:03:51,200 --> 00:03:55,200
common ones. So there's U which is the urgent bit. That means that this data is

44
00:03:55,200 --> 00:04:00,520
particularly urgent. So hey let's get to the application quickly. Then there's

45
00:04:00,520 --> 00:04:06,400
P which is the push bit. So the push bit says hey please push this data to

46
00:04:06,400 --> 00:04:13,360
the receiving application. So the other four bits there's the ACPIT, the reset

47
00:04:13,360 --> 00:04:20,399
bit, the synbit and the thin bit. So the ACPIT here this bit is set to one if

48
00:04:20,399 --> 00:04:25,360
the acknowledgement number field is valid. So the ACPIT is generally set to one

49
00:04:25,360 --> 00:04:29,560
for every single segment except for the first one that initiates a connection.

50
00:04:29,560 --> 00:04:33,720
Because when you initiate a connection you don't know what the other side

51
00:04:33,720 --> 00:04:38,040
sequence number is you can't acknowledge anything so the ACPIT is not set. So

52
00:04:38,040 --> 00:04:42,600
when you talk about TCP setup, see that the first packet sent does not have the

53
00:04:42,600 --> 00:04:46,360
ACPIT set but all other packets in the connection through its termination have

54
00:04:46,360 --> 00:04:52,400
the ACPIT set. The syn and thin bits are used to set up and tear down connections

55
00:04:52,400 --> 00:05:00,400
accordingly or respectively. So the synbit says hey this is my starting sequence

56
00:05:00,399 --> 00:05:05,879
number please synchronize to this number. And so when you first open a

57
00:05:05,879 --> 00:05:11,159
connection you send a packet with the ACPIT not set but with the synbit set and

58
00:05:11,159 --> 00:05:14,799
then a sequence number and you're telling the endpoint I would like to synchronize

59
00:05:14,799 --> 00:05:20,919
you to this sequence number which represents my first byte of data. The other side

60
00:05:20,919 --> 00:05:23,439
can then respond say all right I'm going to acknowledge that sequence number and

61
00:05:23,439 --> 00:05:28,199
send you one of mine. In this case both those fields are valid. To which then you

62
00:05:28,199 --> 00:05:30,519
can respond and say okay I'm going to acknowledge your sequence number and

63
00:05:30,519 --> 00:05:35,439
now we synchronize both know when the bytes start. So one of the things is that

64
00:05:35,439 --> 00:05:38,839
you can imagine I could always just start my sequence number at zero for every

65
00:05:38,839 --> 00:05:41,639
connection but direction but the turn out to be real security problems that

66
00:05:41,639 --> 00:05:44,360
doing that that means people can guess what your sequence number is they can

67
00:05:44,360 --> 00:05:48,879
start in dispersing packets it generally seen as a bad idea. Also because if you

68
00:05:48,879 --> 00:05:52,079
have lots of short live connections these packets with similar sequence

69
00:05:52,079 --> 00:05:55,159
numbers can be long lived in the network and you want to be able to filter them

70
00:05:55,160 --> 00:06:01,000
out. So the the F is for Finn this is for tearing down a connection so when you

71
00:06:01,000 --> 00:06:06,080
set the Finn bit you're telling the other side I have no more data to send and so

72
00:06:06,080 --> 00:06:09,280
often the exchange is you send the Finn they acknowledge the Finn they send

73
00:06:09,280 --> 00:06:12,360
later you a Finn with name or date no more data send and then you acknowledge that

74
00:06:12,360 --> 00:06:20,120
Finn. The final bit is R the reset bit which says we need to reset this

75
00:06:20,120 --> 00:06:25,720
connection something wrong has gone on. So if the urgent bit is set then this

76
00:06:25,720 --> 00:06:32,540
urgent pointer points we're in the segment that urgent data is. Finally we have

77
00:06:32,540 --> 00:06:38,740
the offset field. So the offset field is needed because it's possible for TCP

78
00:06:38,740 --> 00:06:43,519
to have options and you don't know from this header necessarily where the options

79
00:06:43,519 --> 00:06:47,079
are so what the offset tells you is at what offset within the segment does data

80
00:06:47,079 --> 00:06:51,399
begin. So if you have options then the offset tells you the size of those

81
00:06:51,399 --> 00:06:56,219
options in your TCP stack knows to look inside their four options. The options

82
00:06:56,219 --> 00:07:03,039
are padded to be four bytes four octets wide. So that's the basic TCP header with

83
00:07:03,039 --> 00:07:07,079
the source and destination ports the sequence numbers both for the data and then

84
00:07:07,079 --> 00:07:11,759
for the acknowledgments of the data that you've received. The offset field to

85
00:07:11,759 --> 00:07:16,599
tell you where data begins the urgent and push bits for urgent data or a

86
00:07:16,600 --> 00:07:19,480
data you want to push the application the acknowledgement bit indicating the

87
00:07:19,480 --> 00:07:23,320
acknowledgement number is valid. The sin bit for synchronizing the sequence

88
00:07:23,320 --> 00:07:27,160
number. The Finn bit for tearing down a connection and saying that this there's

89
00:07:27,160 --> 00:07:31,920
no more data to send. The reset bit for resetting a connection. The window for

90
00:07:31,920 --> 00:07:35,879
flow control checks on for making sure that there aren't errors in the data

91
00:07:35,879 --> 00:07:41,560
an urgent pointer for the urgent bit and then options.

