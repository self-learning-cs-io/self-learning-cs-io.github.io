---
title: CS144 NetworkP1369 2KevinFall
---

1
00:00:00,000 --> 00:00:09,200
Hi, so I'm here with Kevin Fall at the Computer Science Conference at the symposium on Operating

2
00:00:09,200 --> 00:00:10,200
Systems Principles.

3
00:00:10,200 --> 00:00:14,720
I was really lucky to run into him here, and so I thought that actually hearing a bit about

4
00:00:14,720 --> 00:00:19,400
he has to say about the internet would be interesting.

5
00:00:19,400 --> 00:00:23,199
So Kevin, you're currently the author of TCPIP illustrated.

6
00:00:23,199 --> 00:00:24,800
So how did that happen?

7
00:00:24,800 --> 00:00:29,760
Like what's your relationship with TCPIP and the stuff that you've done in the past?

8
00:00:29,760 --> 00:00:32,760
What's your background with TCPIP?

9
00:00:32,760 --> 00:00:41,400
So I guess when I was right after I graduated, and shortly after I got to Berkeley, somebody

10
00:00:41,400 --> 00:00:46,920
demonstrated to me that I could send some packet to Europe and back to Berkeley in under a

11
00:00:46,920 --> 00:00:51,880
second with a networking became sort of an interesting thing to look at.

12
00:00:51,880 --> 00:00:57,840
Fast forward a number of years, I worked on the networking implementation in Berkeley

13
00:00:57,840 --> 00:00:59,840
in Xana Cray.

14
00:00:59,840 --> 00:01:00,840
It should grow a while.

15
00:01:00,840 --> 00:01:04,920
It got me into the little bit of the HBC community.

16
00:01:04,920 --> 00:01:12,280
But then I worked at Lawrence Berkeley National Lab after my graduate work at UC San Diego.

17
00:01:12,280 --> 00:01:16,600
So at UC San Diego I was doing some protocol work and some operating system work.

18
00:01:16,600 --> 00:01:21,920
But then with the networking group, that was all quite a bit in the networking side and

19
00:01:21,920 --> 00:01:26,879
worked on network simulators and S simulator and so on.

20
00:01:26,879 --> 00:01:34,399
What happened though is I got to know this stuff pretty well and by the early 90s or sort

21
00:01:34,399 --> 00:01:39,759
of mid 90s when the internet was becoming more widely known, people took an interest in

22
00:01:39,759 --> 00:01:40,759
this.

23
00:01:40,759 --> 00:01:42,640
What is this TCPIP stuff?

24
00:01:42,640 --> 00:01:48,519
And this particular book, TCPIP I've illustrated was the standard reference text and the volume

25
00:01:48,519 --> 00:01:50,479
month is still quite a good book.

26
00:01:50,479 --> 00:01:56,039
I was teaching out of it, teaching sort of professionals from industries, Cisco and places

27
00:01:56,040 --> 00:01:59,040
like that.

28
00:01:59,040 --> 00:02:03,880
And so I got to know the material quite well, but as the years went on and on and on,

29
00:02:03,880 --> 00:02:08,520
there were things that it would be nice to be updated in that book.

30
00:02:08,520 --> 00:02:14,680
And so I've been at places where I've heard some people were approached to rewrite it.

31
00:02:14,680 --> 00:02:20,800
Other people approached the editor or author, Addison, to rewrite it.

32
00:02:20,800 --> 00:02:22,480
And for whatever reason it never happened.

33
00:02:22,479 --> 00:02:28,599
So I threw in my table of contents in the sample chapter and got the job in some seven

34
00:02:28,599 --> 00:02:32,919
years later finished off the entire task with something that's over a thousand pages

35
00:02:32,919 --> 00:02:33,919
long.

36
00:02:33,919 --> 00:02:37,759
Well, so that's an example of something that you thought sort of a change is needed to

37
00:02:37,759 --> 00:02:42,079
be introduced, but wasn't in the original.

38
00:02:42,079 --> 00:02:44,079
One of the major ones is security.

39
00:02:44,079 --> 00:02:50,759
So there's I think a hundred pages of security that goes through the introduction of what

40
00:02:50,759 --> 00:02:53,799
are the sort of basic primitives, what are the sort of things you might want to protect

41
00:02:53,799 --> 00:02:54,799
against.

42
00:02:54,799 --> 00:03:00,079
And then all the various details of the protocols that actually does that.

43
00:03:00,079 --> 00:03:04,359
Really security, not only the cryptographic parts of security, but things like firewalls

44
00:03:04,359 --> 00:03:09,439
and stuff really barely existed when the first work was done.

45
00:03:09,439 --> 00:03:13,879
There's also a new chapter at the beginning as sort of the architectural underpinnings,

46
00:03:13,879 --> 00:03:18,879
which is what was in the minds of people when they were thinking about how the design

47
00:03:18,879 --> 00:03:20,879
decisions about this sort of stuff was made.

48
00:03:20,879 --> 00:03:25,879
Because I always found that quite interesting and being an operating systems guy originally,

49
00:03:25,879 --> 00:03:32,159
how people came up with abstractions and how programs access those things and not quite

50
00:03:32,159 --> 00:03:33,479
users necessarily.

51
00:03:33,479 --> 00:03:37,599
But what are the sort of architectural concerns?

52
00:03:37,599 --> 00:03:42,680
And so I always was quite interested in papers and thoughts and sort of the architectural

53
00:03:42,680 --> 00:03:43,680
area.

54
00:03:43,680 --> 00:03:48,479
So last night we were talking and you said that there is like a today people use the terms

55
00:03:48,479 --> 00:03:53,199
of data ground, packet interchangeably, but those were not interchangeable terms.

56
00:03:53,199 --> 00:03:57,560
They actually meant something quite different, which now is lost in the sort of lost

57
00:03:57,560 --> 00:03:58,560
in time.

58
00:03:58,560 --> 00:04:07,280
I think I mentioned this in that part of the book, but packets were sort of a fascinating

59
00:04:07,280 --> 00:04:12,239
new concept that you could divide your larger messages into little parts and move them

60
00:04:12,239 --> 00:04:13,919
around the network.

61
00:04:13,919 --> 00:04:18,039
But they were originally at least some variant were as part of virtual circuits.

62
00:04:18,039 --> 00:04:24,360
And so for example, the destination in a packet was the destination of an index in the table

63
00:04:24,360 --> 00:04:25,360
of the next top.

64
00:04:25,360 --> 00:04:28,519
So you would sort of set up the route ahead of time.

65
00:04:28,519 --> 00:04:32,159
And then if that failed for some reason, you'd have a bunch of work to do to sort of go

66
00:04:32,159 --> 00:04:35,360
back and there's all the history of circuits and so on.

67
00:04:35,360 --> 00:04:42,079
But the data ground was maybe even more radical idea in which the destination, the final destination

68
00:04:42,079 --> 00:04:47,439
was identified in the packet sort of structure, which the way I would teach out of this class

69
00:04:47,439 --> 00:04:51,680
would say, you know, if I laid out the network in a two-dimensional space with this data

70
00:04:51,680 --> 00:04:56,159
ground type property, I could take it and drop it from the air down onto any router and

71
00:04:56,159 --> 00:04:59,919
it would just find its way through because the final destination is listed.

72
00:04:59,919 --> 00:05:03,759
But of course that was a trade-off because now you have more bits to you have to allocate

73
00:05:03,759 --> 00:05:07,319
because there's presumably a larger number of possible destinations that would be

74
00:05:07,319 --> 00:05:08,319
maybe available.

75
00:05:08,399 --> 00:05:13,920
So these were the kind of nuances that were actually pretty neat to sort of get the details

76
00:05:13,920 --> 00:05:18,319
from by going back in the architectural history and thinking and learning about what people

77
00:05:18,319 --> 00:05:20,319
were sort of arguing at the time.

78
00:05:20,319 --> 00:05:23,439
Cool. So what are you working on now?

79
00:05:23,439 --> 00:05:27,519
So like what are the most interesting things do you think in networking and the internet

80
00:05:27,519 --> 00:05:31,519
and systems that you're trying to tackle?

81
00:05:31,519 --> 00:05:37,199
So there's a couple areas that I think are fun and sort of worth mentioning.

82
00:05:37,199 --> 00:05:40,399
At least one of which we have some work on.

83
00:05:40,399 --> 00:05:47,360
The first one is just we don't have so much work on but is the, and I mentioned you

84
00:05:47,360 --> 00:05:53,839
lick lighter and I'd make reference to that in the book as well, but the him and some sort

85
00:05:53,839 --> 00:05:57,839
of his colleagues and predecessors had envisioned that not only do we have a thing that

86
00:05:57,839 --> 00:06:02,240
winds up essentially being today's internet that there's communication and these communities,

87
00:06:02,240 --> 00:06:05,279
but there's also a physical way of moving things around, which is like a global,

88
00:06:05,279 --> 00:06:09,279
pneumatic tube system. So you could take your thing and shove it and it would find its way,

89
00:06:09,279 --> 00:06:12,719
which would be a very cool thing to have, but I don't think we're quite there yet,

90
00:06:12,719 --> 00:06:15,279
and I'm not sure where ever we're going to really wind up at that.

91
00:06:15,279 --> 00:06:19,279
Maybe they sort of be a positive, not pneumatic, but it's not quite pneumatic.

92
00:06:19,279 --> 00:06:25,679
But on the other hand, I think the sort of 3D printing technology as combined with what's going on

93
00:06:25,679 --> 00:06:31,119
with the sort of free order or easy dissemination of information becomes quite interesting,

94
00:06:31,119 --> 00:06:34,479
especially when you can put things other than plastics and so on.

95
00:06:34,480 --> 00:06:38,879
So I had in my hand a demonstration that was a titanium 3D printed

96
00:06:39,840 --> 00:06:49,920
nose replacement part, prosthetic nose, and it was a strands of titanium printed on top of each other.

97
00:06:50,480 --> 00:06:57,439
And if you can load up your device with the right materials, pretty much any material thing you

98
00:06:57,439 --> 00:07:04,319
want to create almost could be created. So even into the world of sensor networks, things we've

99
00:07:04,480 --> 00:07:08,480
seen people will look at, well, sensing the world, maybe even actuating the world,

100
00:07:08,480 --> 00:07:12,240
but like building the world on demand and combination with those other things is pretty interesting.

101
00:07:12,240 --> 00:07:16,319
And I wonder if that's not kind of the way to get to the vision of pneumatic tubes,

102
00:07:16,319 --> 00:07:18,480
but instead of actually moving it, you just make another one.

103
00:07:18,480 --> 00:07:19,280
Yeah.

104
00:07:19,280 --> 00:07:25,439
And so how far in the future will it be that you just carry around in your car, your backpack,

105
00:07:25,439 --> 00:07:30,720
or whatever, the basic system, and then you just download whatever the thing is you happen to need?

106
00:07:31,680 --> 00:07:35,120
It even goes a little, there was literally, I think it was not a few months ago,

107
00:07:35,120 --> 00:07:40,720
there was a meeting in Washington DC about the security implications of additive manufacturing.

108
00:07:40,720 --> 00:07:42,640
Right, I mean, there's all those questions about firearms.

109
00:07:42,640 --> 00:07:45,920
Yeah, like pretty on the air, the team was more chassis.

110
00:07:46,800 --> 00:07:52,320
So generally in firearms, there's one particular piece of the gun, the one that's strongly regulated,

111
00:07:52,320 --> 00:07:54,560
it's the thing that's kind of everything has to stick on to.

112
00:07:55,920 --> 00:07:59,440
And somebody 3D printed one, it's only something you need a license for.

113
00:07:59,519 --> 00:08:03,600
Is there this interesting question about what then the implications are going for,

114
00:08:03,600 --> 00:08:05,199
all these kinds of things like DRM?

115
00:08:05,680 --> 00:08:10,399
Yeah, and so what is, I think those are, there's lots of policy questions.

116
00:08:10,399 --> 00:08:17,279
I think it's been one, as is often the case, technology will outpace the policy ability to

117
00:08:17,279 --> 00:08:22,639
comprehend and sort of instantiate reasonable laws about these things, whatever that may be.

118
00:08:23,199 --> 00:08:29,360
And so this idea that bits that are become interchangeable with physical objects,

119
00:08:29,439 --> 00:08:33,759
and we have traditionally regulated the control of physical objects, but now,

120
00:08:34,559 --> 00:08:39,679
do we have to make sure that the team includes the creation time.

121
00:08:39,679 --> 00:08:41,279
Yeah, so, it's ganging creations.

122
00:08:41,279 --> 00:08:44,559
It's pretty interesting, so that's that set of implications.

123
00:08:44,559 --> 00:08:50,159
So that's one of the topics and actually gets into other things that you can compute with,

124
00:08:50,159 --> 00:08:56,399
and maybe creating compute like synthetic biology, I want to create a little organism that

125
00:08:56,959 --> 00:08:59,679
takes one thing and something comes out the other end.

126
00:08:59,679 --> 00:09:03,840
Well, if I have biologicals in my 3D printer and I can download that and have the,

127
00:09:03,840 --> 00:09:10,319
not just download designs, but have the tools to do the designs of the biological systems.

128
00:09:10,319 --> 00:09:12,319
I think they start to start to try.

129
00:09:12,319 --> 00:09:16,559
It is very important about these implications.

130
00:09:17,679 --> 00:09:21,600
So that's one whole category I think that when I was thinking about the

131
00:09:21,600 --> 00:09:26,320
pneumatic tube system and then looking at 3D printing and its capabilities and now the price has

132
00:09:26,320 --> 00:09:28,399
gone down so people can just go get them.

133
00:09:28,399 --> 00:09:30,159
This is a pretty interesting thing.

134
00:09:30,159 --> 00:09:30,960
Cool.

135
00:09:30,960 --> 00:09:31,360
Cool.

136
00:09:31,360 --> 00:09:33,360
Well, it was great chatting with you and thank you for your time.

137
00:09:33,360 --> 00:09:34,560
Okay, and yeah, sure.

138
00:09:34,560 --> 00:09:35,360
See you next time.

