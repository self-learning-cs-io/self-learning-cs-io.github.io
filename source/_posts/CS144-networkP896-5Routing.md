---
title: CS144 NetworkP896 5Routing
---

1
00:00:00,000 --> 00:00:05,520
Continuing on a theme of routing, by now you've learned about the basics of

2
00:00:05,520 --> 00:00:10,439
routing, distance vector and link state algorithms and how routing works in the

3
00:00:10,439 --> 00:00:14,519
internet, the structure of the internet, autonomous systems, the hierarchy of

4
00:00:14,519 --> 00:00:19,640
those autonomous systems, exterior routing protocols, interior routing protocols.

5
00:00:19,640 --> 00:00:24,320
So in this video I'm going to tell you about the specific exterior routing

6
00:00:24,320 --> 00:00:28,560
protocol that all autonomous systems must use when connecting to their

7
00:00:28,559 --> 00:00:32,920
neighbors. That's BGP or the Board of Gateway Protocol currently in version

8
00:00:32,920 --> 00:00:42,320
4. Okay let's start with the basics of BGP 4. BGP is not a link state or a

9
00:00:42,320 --> 00:00:47,239
distance vector routing protocol. Instead it's used, it uses what's called a path

10
00:00:47,239 --> 00:00:53,920
vector and the way this works is that the BGP routers at the boundary of each

11
00:00:53,920 --> 00:00:59,440
autonomous system will advertise a complete path and that path has a list of

12
00:00:59,440 --> 00:01:04,480
ASs that you pass through in order to reach a particular destination prefix.

13
00:01:04,480 --> 00:01:10,000
This is also called the AS path and that's the path vector. So an example of a

14
00:01:10,000 --> 00:01:17,320
path advertisement might look like this. It says the network prefix 171.64-16

15
00:01:17,320 --> 00:01:23,640
can be reached via the path going through these three at ASs, 15 and 13. So that

16
00:01:23,640 --> 00:01:29,840
might be an example of an advertisement that the BGP might advertise to one of

17
00:01:29,840 --> 00:01:36,599
its neighbors. The consequence of sending out a path is that paths with loops are

18
00:01:36,599 --> 00:01:41,760
very easily detected locally. You just look for repetition of an AS and then you

19
00:01:41,760 --> 00:01:48,120
can simply remove those or just completely ignore those advertisements and that

20
00:01:48,120 --> 00:01:53,120
makes it very easy to find and eliminate loops. But perhaps the most important

21
00:01:53,120 --> 00:02:00,079
feature of BGP is that local policies that a private and secret to a

22
00:02:00,079 --> 00:02:05,200
particular autonomous system can pick the preferred path among those that are

23
00:02:05,200 --> 00:02:09,240
advertised to it. So if a number of neighboring autonomous systems advertise

24
00:02:09,240 --> 00:02:14,560
different paths to reach the same prefix, then the local policy can pick whichever

25
00:02:14,560 --> 00:02:19,040
one it chooses, whichever one it wants. It's not accountable to anyone else when

26
00:02:19,039 --> 00:02:24,919
it's picking that. Finally when a link or a router fails the path is withdrawn

27
00:02:24,919 --> 00:02:31,079
just like an advertisement comes with just like the one above a withdrawal

28
00:02:31,079 --> 00:02:35,099
would look very similar in which it would say this particular prefix can no

29
00:02:35,099 --> 00:02:42,719
longer be reached via this path. So BGP4 starts with a relationship between

30
00:02:42,719 --> 00:02:50,719
customers and providers. Let's take a look at this. So let's start with

31
00:02:50,719 --> 00:02:58,479
during a particular AS this would be the provider AS, the one that's the one

32
00:02:58,479 --> 00:03:07,240
sitting above in the hierarchy and then the customer AS sitting below. The

33
00:03:07,240 --> 00:03:13,800
relationship between them is although traffic can flow to or from the customer

34
00:03:13,800 --> 00:03:20,159
through the provider in either direction and may go off through multiple exit

35
00:03:20,159 --> 00:03:25,200
points because of this specific relationship between them and that relationship

36
00:03:25,200 --> 00:03:35,960
is one of two customer. It has specific implications and one of them is that the

37
00:03:35,960 --> 00:03:40,879
customer will always pay the provider to carry its packets. So if we're thinking

38
00:03:40,879 --> 00:03:47,560
of how money flows money is flowing up in this direction here the customer is

39
00:03:47,560 --> 00:03:54,400
paying the provider in order to carry its packets. So this hierarchy of customers

40
00:03:54,400 --> 00:04:00,600
to providers continues. So if we have multiple ASs so let's draw some ASs here

41
00:04:00,599 --> 00:04:07,759
and some down here these could be the access ASs that we saw before then this

42
00:04:07,759 --> 00:04:15,519
relationship between them of provider towards customer could go like this. And what

43
00:04:15,519 --> 00:04:23,680
that tells us is that the as before the money is actually flowing in the other

44
00:04:23,680 --> 00:04:31,959
direction for settlement charges between them and IP traffic can go in the

45
00:04:31,959 --> 00:04:40,480
following in the following way. So IP traffic could flow from a customer up to

46
00:04:40,480 --> 00:04:46,040
its provider, up to its provider down through its customer and down through its

47
00:04:46,040 --> 00:04:53,079
customer down here. Similarly a something from here traffic from here could flow

48
00:04:53,079 --> 00:04:58,439
through this way. If there was another there was another relationship for example

49
00:04:58,439 --> 00:05:06,159
this particular one access AS down here had relationships with providers

50
00:05:06,159 --> 00:05:15,079
above it in two places. Traffic is a land to flow through any of these any of

51
00:05:15,079 --> 00:05:21,519
these paths so it could flow down this way or down this way. In general they will

52
00:05:21,519 --> 00:05:28,399
not flow through an intermediate at the same level and we'll see an example of

53
00:05:28,399 --> 00:05:35,000
that of that a little bit later. So this the reason for telling about this

54
00:05:35,000 --> 00:05:38,279
customer provider hierarchy is we're going to see it show up a little bit later

55
00:05:38,279 --> 00:05:45,479
in the policies that BGP uses. And basically the peering relationship is as

56
00:05:45,480 --> 00:05:51,360
follows. So looking at this example here where we have just as before we have

57
00:05:51,360 --> 00:05:57,920
three ASs here here and here which are the providers and then three down here

58
00:05:57,920 --> 00:06:01,920
that are the customers of those and the key here is telling us what the

59
00:06:01,920 --> 00:06:07,319
provider customer relationship and that these ones appear are peers of each

60
00:06:07,319 --> 00:06:15,439
other. So in general a peer cannot be a transit for its other peers

61
00:06:15,439 --> 00:06:20,560
in other words this particular path that's shown here the black dotted line is

62
00:06:20,560 --> 00:06:27,079
not loud because it's going through this one this this peer. That's because

63
00:06:27,079 --> 00:06:32,360
typically the relationship here between two peers is settlement free there's no

64
00:06:32,360 --> 00:06:39,600
dollars flowing across here. So peers do not provide transit between peers. Now

65
00:06:39,600 --> 00:06:42,720
let's take a look at BGP messages and then we'll look at the policies that

66
00:06:42,720 --> 00:06:47,320
BGP implements. So there are basically four types of BGP message. There's an

67
00:06:47,320 --> 00:06:51,840
open message to establish a BGP session. There's a keep alive in order to

68
00:06:51,840 --> 00:06:56,920
provide a handshake at regular intervals. That's just basically an occasional

69
00:06:56,920 --> 00:07:01,400
message just to be able to check that the BGP session is still alive between

70
00:07:01,400 --> 00:07:05,640
two routers that are connected to each other and there's a notification to

71
00:07:05,640 --> 00:07:09,920
shut down a peering session. So these three here open keep alive and

72
00:07:09,920 --> 00:07:14,720
notification are basically the ones that keep the session alive. The ones that

73
00:07:14,720 --> 00:07:19,439
actually announce and then withdraw routes are the update messages and these are

74
00:07:19,439 --> 00:07:24,439
the the most important ones. They announce new routes or they withdraw ones that

75
00:07:24,439 --> 00:07:30,720
were previously announced and these are the the we saw an example of that

76
00:07:30,720 --> 00:07:36,800
earlier with the advertisement of the particular path for a prefix. An

77
00:07:36,800 --> 00:07:44,480
announcement basically consists of the prefix and then the path attributes. So it'll

78
00:07:44,480 --> 00:07:50,560
be the path of ASS and then attributes associated with it and we'll see an

79
00:07:50,560 --> 00:07:57,800
example of that now. So the path attributes are the next top information where

80
00:07:57,800 --> 00:08:01,360
you go in order to be able to use this. In other words who it is that's

81
00:08:01,360 --> 00:08:07,960
advertising this this particular path to us. The particular AS path so that's

82
00:08:07,960 --> 00:08:12,520
the sequence of ASS that you would go through and then various other things the

83
00:08:12,520 --> 00:08:16,280
local preference and the multi-exit discriminator and there are various

84
00:08:16,280 --> 00:08:21,160
other parameters that are passed as well that tell us information that would

85
00:08:21,160 --> 00:08:28,240
allow us to pick the the particular path when we receive multiple

86
00:08:28,240 --> 00:08:32,840
advertisements from different peers. So these are used to select amongst multiple

87
00:08:32,840 --> 00:08:37,759
options for paths because we may hear from multiple peers on how to reach a

88
00:08:37,759 --> 00:08:43,680
particular destination prefix and basically when we have a choice the the

89
00:08:43,680 --> 00:08:50,639
sequence goes something like this. So we start with the the highest local

90
00:08:50,639 --> 00:08:56,200
preference. This is the highest local preference. We'll see an example of that

91
00:08:56,200 --> 00:09:01,480
in a moment. It's a local preference that tells us how we enforce relationships

92
00:09:01,480 --> 00:09:05,480
we might prefer customer routes over peer routes and we'll see an example of

93
00:09:05,480 --> 00:09:11,320
that in a moment. If the local preference which is essentially our local policy

94
00:09:11,320 --> 00:09:15,960
if that doesn't tell us which particular path to pick when we have some choice

95
00:09:15,960 --> 00:09:20,120
the next one is we'll simply pick the shortest autonomous system path.

96
00:09:20,120 --> 00:09:24,280
Knows the shortest path to a destination and then there are various other

97
00:09:24,279 --> 00:09:27,759
parameters that we might pick that are all to do with helping us do good traffic

98
00:09:27,759 --> 00:09:32,519
engineering. What this means is that we will tend to send traffic over

99
00:09:32,519 --> 00:09:38,079
over lightly loaded paths and will cause less congestion in the network. But the

100
00:09:38,079 --> 00:09:41,240
ones that we most are most interested interested in are the highest local

101
00:09:41,240 --> 00:09:46,559
preference and the shortest day as path. If all of these fail to distinguish or

102
00:09:46,559 --> 00:09:50,399
identify a particular path that we should choose then we simply go with the

103
00:09:50,399 --> 00:09:54,439
lowest router ID. In other words that's the lowest router ID of one of our

104
00:09:54,439 --> 00:09:58,319
neighbors and that's essentially throwing up our hands in a means of breaking

105
00:09:58,319 --> 00:10:04,720
ties if there's no other way to pick between advertised routes. Let's take a

106
00:10:04,720 --> 00:10:10,919
look at how the autonomous system path the AS path attribute might work. So we're

107
00:10:10,919 --> 00:10:18,120
looking at an example of how we might pick the shortest path. So let's say that

108
00:10:18,120 --> 00:10:24,200
we are sitting over here at this particular autonomous system here and we're

109
00:10:24,200 --> 00:10:31,279
hearing about a prefix that originated down here. Here's the prefix 135.207.0.0

110
00:10:31,279 --> 00:10:38,840
slash 16 and it originated from here and so it will initially be

111
00:10:38,840 --> 00:10:43,480
advertised up here and then it'll be advertised up here and when it gets

112
00:10:43,480 --> 00:10:54,440
advertised here it will say you can reach this particular prefix 135.207.0.0 slash

113
00:10:54,440 --> 00:11:05,759
16. You can reach it via AS7018 followed by 6341 and then that will flow around

114
00:11:05,759 --> 00:11:10,639
here and then they added one AS to the path then so get advertised here. So by

115
00:11:10,639 --> 00:11:19,519
the time it comes down here we will find out that the prefix 135.207.0 slash 16

116
00:11:19,519 --> 00:11:33,000
can be reached through 1129, 1755 and so on until we get to 7018 and likewise

117
00:11:33,000 --> 00:11:37,879
there'll be an advertisement that will come around this path that will say hey

118
00:11:37,879 --> 00:11:48,559
I can get you to 135.207 slash 16 through the sequence 70183549 so it's

119
00:11:48,559 --> 00:11:54,720
over a much shorter path. So in this particular case if I haven't got a higher

120
00:11:54,720 --> 00:12:01,279
local preference then the router will say this is the shorter path and so I will

121
00:12:01,279 --> 00:12:06,679
pick as my favorite to send packets this way in order to reach this

122
00:12:06,679 --> 00:12:11,759
particular prefix and so we'll install that decision locally in its routers that

123
00:12:11,759 --> 00:12:15,719
says when I see this packet with this prefix then I'm going to send it out

124
00:12:15,719 --> 00:12:21,719
this direction and that's my choice. There could be many many choices so let's

125
00:12:21,719 --> 00:12:26,639
look at an example here. So in this particular network Frank's internet bar

126
00:12:26,639 --> 00:12:32,639
is trying to decide which route it should pick in order to reach this

127
00:12:32,639 --> 00:12:40,039
prefix 13.13 slash 16 which is down here in AS1. The nature of the relationship

128
00:12:40,039 --> 00:12:46,879
here is that Frank is connected directly to a provider AS4 it's connected to a

129
00:12:46,879 --> 00:12:53,080
peer AS3 and it's connected to a customer AS2 which in turn is connected to

130
00:12:53,080 --> 00:12:58,360
another customer down here. So we could have a number of different local

131
00:12:58,360 --> 00:13:09,240
preferences and it might say I'm going to give a local preference of let's say

132
00:13:09,240 --> 00:13:15,840
100 to my peer to customer, my provided a customer relationship. In other

133
00:13:15,840 --> 00:13:22,000
words I'm going to give preference of 100 to routes that are advertised by my

134
00:13:22,000 --> 00:13:29,919
customers to me and maybe I just say I'll give a local preference of 80 to

135
00:13:29,919 --> 00:13:36,240
ones that are received from my provider and 90 to ones that are received from my

136
00:13:36,240 --> 00:13:43,600
peer. What that basically says is if I hear a route that is arrives from my

137
00:13:43,600 --> 00:13:47,559
customer I'm going to take that very seriously because that's a paying

138
00:13:47,559 --> 00:13:52,359
relationship and I would prefer to send it to my customer rather than sending it

139
00:13:52,359 --> 00:13:56,919
over to a provider where I'm going to have to pay. So I'm going to give preference

140
00:13:56,919 --> 00:14:02,959
from if they're coming up through the from from the customer. My second favorite

141
00:14:02,959 --> 00:14:06,159
choice is from a peer because I don't pay there either because it's presumably

142
00:14:06,159 --> 00:14:09,759
settlement free but where I actually have to pay for the traffic is to the

143
00:14:09,759 --> 00:14:14,679
provider. So if I hear a route that's advertised down here I'm going to not

144
00:14:14,679 --> 00:14:19,399
likely to pick that and this that's my only that's my only choice. So basically

145
00:14:19,399 --> 00:14:26,599
I'm saying in terms of my choice customer customer advertised routes are

146
00:14:26,599 --> 00:14:31,679
more better than peer advertised routes are better than provider advertised

147
00:14:31,679 --> 00:14:37,959
routes. And this is a pretty common for it's it's not baked into BGP you can

148
00:14:37,959 --> 00:14:41,199
just set the preference values to do this you could also set the preference

149
00:14:41,200 --> 00:14:45,520
values to be the opposite although that would be pretty unlikely. So when these

150
00:14:45,520 --> 00:14:51,800
these advertisements are going to arrive for this particular AS they're going to

151
00:14:51,800 --> 00:14:55,920
come up through here to Frank they're going to come up through here to Frank

152
00:14:55,920 --> 00:14:59,759
and they're going to come this way to Frank. Frank is going to pick the one that

153
00:14:59,759 --> 00:15:03,520
goes down through the customer so when he sends traffic he's going to send

154
00:15:03,520 --> 00:15:09,160
traffic down this way to AS1 because that's his favorite path because that's the

155
00:15:09,159 --> 00:15:14,120
one with the lowest local preference. So local preference is the one that I

156
00:15:14,120 --> 00:15:19,019
use first and if that doesn't tell me my my choice then I'll pick the shortest

157
00:15:19,019 --> 00:15:26,860
AS path and then I'll walk down that list that was on the previous slide. So in

158
00:15:26,860 --> 00:15:32,759
summary all autonomous systems in the internet must connect using BGP4. That's

159
00:15:32,759 --> 00:15:36,759
the exterior protocol that they must use to talk to their peers or to their

160
00:15:36,759 --> 00:15:41,559
neighbors the routers are the neighboring autonomous system. BGP4 is a path

161
00:15:41,559 --> 00:15:47,240
vector algorithm that means a list of the autonomous systems is sent along with

162
00:15:47,240 --> 00:15:52,480
every advertised prefix and this allows loops to be detected very easily and for

163
00:15:52,480 --> 00:15:57,559
a router to examine that path and choose whether it wants to use it or not

164
00:15:57,559 --> 00:16:04,120
depending on its policies. BGP4 has a rich and complex interface to let

165
00:16:04,120 --> 00:16:08,519
autonomous systems choose a local private policy based on all sorts of

166
00:16:08,519 --> 00:16:12,200
things you could you could spend a whole quarter learning about nothing else

167
00:16:12,200 --> 00:16:16,519
than how BGP works and what the consequences are there being many many papers are

168
00:16:16,519 --> 00:16:22,879
written on the on the consequences of these policies. So EJS decides a local

169
00:16:22,879 --> 00:16:27,240
policy for traffic engineering security and any other private preferences that

170
00:16:27,240 --> 00:16:31,639
might have so that it can choose amongst advertised paths coming from

171
00:16:31,639 --> 00:16:38,240
different neighboring autonomous systems. That's the end of this video about BGP.

