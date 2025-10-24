---
title: CS144 NetworkP483 9PacketSwitching
---

1
00:00:00,000 --> 00:00:04,000
In this video, I'm going to start out by telling some of the shortcomings of a

2
00:00:04,000 --> 00:00:08,199
FIFO output queue and some of the problems that it causes. And I'm going to

3
00:00:08,199 --> 00:00:13,519
describe two alternatives. Switches that provide strict priorities to give

4
00:00:13,519 --> 00:00:18,160
priority and low priority traffic and those that can give a guaranteed rate to

5
00:00:18,160 --> 00:00:23,160
each of the flows passing through it. Let's start by reviewing what an

6
00:00:23,160 --> 00:00:27,400
output-cute packet switch looks like. This is an example we saw before where we

7
00:00:27,399 --> 00:00:31,160
had three packets arriving. Their addresses will be looked up and they will be

8
00:00:31,160 --> 00:00:35,199
switched to the correct output. In this particular case, two red packets, meaning

9
00:00:35,199 --> 00:00:40,719
they'll go to that middle red output and blue one to the top. One of the red

10
00:00:40,719 --> 00:00:44,239
packets gets to go. The other one is held back, waiting for the link to be free,

11
00:00:44,239 --> 00:00:49,480
and then it goes on its way afterwards. So implicit here is the assumption that

12
00:00:49,480 --> 00:00:54,119
the the output queue is a FIFO, first in first out. And that's a pretty

13
00:00:54,119 --> 00:00:58,399
reasonable assumption for most router queues. But in what we're going to be

14
00:00:58,399 --> 00:01:03,000
looking at next, we're going to be focusing on this output queue and seeing what

15
00:01:03,000 --> 00:01:10,000
some of the consequences are of it being a FIFO. So a FIFO queue is sometimes

16
00:01:10,000 --> 00:01:14,640
called a free-for-all queue. There are many packets flowing through this queue

17
00:01:14,640 --> 00:01:17,759
coming from the different inputs. I've drawn here three inputs to the queue

18
00:01:17,759 --> 00:01:22,840
representing the three inputs to the other inputs to the switch. So these are all

19
00:01:22,840 --> 00:01:26,120
packets that are coming through that are part of flows that are going to this

20
00:01:26,120 --> 00:01:30,960
one output. So we'll see packets coming out of here coming from all of those

21
00:01:30,960 --> 00:01:35,200
inputs and presumably at any one time when we have congestion, we'll see packets

22
00:01:35,200 --> 00:01:41,640
queued up in this FIFO queue. If there are many flows passing through the queue

23
00:01:41,640 --> 00:01:46,960
whoever sends at the highest rate, whoever sends the most packets will in fact

24
00:01:46,960 --> 00:01:51,560
receive the highest usage of this output link. So in other words, if this one

25
00:01:51,560 --> 00:01:55,600
up here is able to get a whole load of packets into here, well this one down

26
00:01:55,600 --> 00:02:00,719
here, this the bottom input is only able to get a small number, this guy up here is

27
00:02:00,719 --> 00:02:06,400
going to hog this output link. So if there's a really big hog of a flow going

28
00:02:06,400 --> 00:02:11,480
through, a little flow could easily get squeezed out completely. People say that

29
00:02:11,480 --> 00:02:16,599
this this kind of FIFO queue, well it's nice and simple, it encourages bad

30
00:02:16,599 --> 00:02:20,719
behavior because the best thing for a flow to do is to try and crowd out every

31
00:02:20,719 --> 00:02:24,280
other flow by sending as fast as it can. It would be a little bit like when you're

32
00:02:24,280 --> 00:02:28,759
downloading a web page, the thing to do would be to try and get your packets sent

33
00:02:28,759 --> 00:02:32,240
towards you at the highest possible rate to maximize the amount of the

34
00:02:32,240 --> 00:02:36,400
amount of the queue that you can get. It's not very friendly behavior and it

35
00:02:36,400 --> 00:02:41,840
doesn't provide a good incentive for good behavior. Now imagine that some of

36
00:02:41,840 --> 00:02:46,800
the traffic was very urgent, for example some control traffic. So let's say we

37
00:02:46,800 --> 00:02:53,320
had some urgent red packets here and then we had some less urgent green packets

38
00:02:53,320 --> 00:02:57,120
elsewhere. Maybe there's another one that squeezed in in front of that and a

39
00:02:57,120 --> 00:03:01,320
green packet down here and a green packet down here. Maybe let's just add in

40
00:03:01,320 --> 00:03:06,060
another red packet for good measure. So if these ones were more important, what

41
00:03:06,060 --> 00:03:11,040
the FIFO queue will do is simply send them out in the order in which they came

42
00:03:11,040 --> 00:03:15,960
in. So if we were to number the order in which they arrived, say this was number

43
00:03:15,960 --> 00:03:20,080
one, this was number two, this was the third one to arrive, this one was the

44
00:03:20,080 --> 00:03:23,320
fourth one, this the fifth one and the sixth one, they're obviously just going to go

45
00:03:23,320 --> 00:03:29,200
out in that order of one, two, three, four, five, six on the outgoing line. So not

46
00:03:29,200 --> 00:03:32,600
very good for the urgent control traffic or perhaps it's some important

47
00:03:32,600 --> 00:03:36,360
video traffic. So the FIFO doesn't have any way to distinguish important. It just

48
00:03:36,360 --> 00:03:40,800
says if you got here first and there was room in the queue, you are the most

49
00:03:40,800 --> 00:03:45,840
important packet. So we can't say anything meaningful about the rate of

50
00:03:45,840 --> 00:03:51,719
each flow sharing this queue. One little observation that's going to prove

51
00:03:51,719 --> 00:03:57,840
useful later and it's why I've labeled this as the size of the queue as B and the

52
00:03:57,840 --> 00:04:02,000
rate at which it's being served the outgoing link are. Notice that if a packet

53
00:04:02,000 --> 00:04:06,360
does make it into the queue, so if I have a packet that does make it into the queue,

54
00:04:06,360 --> 00:04:11,400
let's say this one ends up at the tail of the queue, the maximum time it has to

55
00:04:11,400 --> 00:04:18,439
wait is B over R. So the delay through that queue we know is less than or equal

56
00:04:18,439 --> 00:04:21,480
to B over R. So I'm going to remember this, we're going to use this observation

57
00:04:21,480 --> 00:04:26,120
later. In this video, I'm going to describe two alternatives to

58
00:04:26,120 --> 00:04:31,639
simple FIFO queuing. The first one is called strict priorities where we give

59
00:04:31,639 --> 00:04:35,639
higher priority to some flows over others and the second one is rate

60
00:04:35,639 --> 00:04:39,120
guarantees where we give a guaranteed rate or a guaranteed fraction of the

61
00:04:39,120 --> 00:04:43,560
outgoing link to each of the flows. So basically we're going to take our single

62
00:04:43,560 --> 00:04:47,959
FIFO that we had before and replace it with a more complicated mechanism here.

63
00:04:47,959 --> 00:04:52,319
We've simply replaced it with a high priority queue and a low priority queue. So

64
00:04:52,319 --> 00:04:55,879
the inputs are just the same as before. These are where packets arrive from the

65
00:04:55,879 --> 00:05:00,879
incoming links. But now as a packet arrives, we're going to decide whether to place

66
00:05:00,879 --> 00:05:04,079
it into the high priority queue or into a low priority queue and we do this

67
00:05:04,079 --> 00:05:08,720
based on bits in the header. So when a packet arrives, it might have a bit in the

68
00:05:08,720 --> 00:05:13,160
header and in IP there's a specific field for this. It's called the type of

69
00:05:13,160 --> 00:05:19,160
service field. And we might use that to decide which traffic is high priority and

70
00:05:19,160 --> 00:05:24,560
which is low priority. We might do this for example to say that video traffic is

71
00:05:24,560 --> 00:05:28,640
more important than email. So we might want to put the video in the high priority

72
00:05:28,640 --> 00:05:33,440
queue and the email in the low priority queue. Or we might say that control

73
00:05:33,440 --> 00:05:38,000
traffic is more important than data because we always want to have high

74
00:05:38,000 --> 00:05:43,720
priority for the management traffic on the network. Or an operator might say

75
00:05:43,720 --> 00:05:48,079
that their goal uses, that their traffic takes strict preference over their

76
00:05:48,079 --> 00:05:54,000
silver customers. And so that's a way of classifying users and giving preference

77
00:05:54,000 --> 00:06:00,560
to those who pay more. The way that this actually works is when the packets

78
00:06:00,560 --> 00:06:04,920
arrive, so they would be placed and I'm going to put red packets in here and I'm

79
00:06:04,920 --> 00:06:09,680
going to put green packets in here for lower priority. The basic discipline is

80
00:06:09,680 --> 00:06:16,199
this. There's a scheduler that sits at the output here and it's always going to

81
00:06:16,199 --> 00:06:21,080
take packets from the high priority if they are there. And it's only going to

82
00:06:21,080 --> 00:06:25,360
serve the low priority if there's nothing in the high priority queue. The

83
00:06:25,360 --> 00:06:29,840
consequence is that high priority traffic doesn't see the low priority traffic.

84
00:06:29,840 --> 00:06:34,240
It's unaffected by it because we only serve the low priority queue if the high

85
00:06:34,240 --> 00:06:38,280
priority queue is empty. It's as if the high priority traffic has its own

86
00:06:38,280 --> 00:06:42,400
private network and doesn't see the low priority traffic at all. This is great

87
00:06:42,400 --> 00:06:46,360
for many types of many occasions where we want to give strict preference to

88
00:06:46,360 --> 00:06:50,120
another one, but it does run the danger of starving out the low priority

89
00:06:50,120 --> 00:06:53,920
traffic. So you can only use it when there's a reasonably small amount of high

90
00:06:53,920 --> 00:06:58,720
high priority traffic. We don't want to completely hog the link and starve out

91
00:06:58,720 --> 00:07:02,120
this low priority traffic at all. But it is quite widely used and many switches

92
00:07:02,120 --> 00:07:07,280
around to support this capability today. What if instead of strict

93
00:07:07,280 --> 00:07:12,639
priorities, we wanted to have weighted priorities. What I mean by that is if a

94
00:07:12,639 --> 00:07:20,120
packet arrives into this queue here and packets arrive into this queue here, I

95
00:07:20,120 --> 00:07:25,000
want the in some sense for the traffic here to be considered to be twice as

96
00:07:25,000 --> 00:07:30,280
important as this here. Not not always having strict preference, but having twice

97
00:07:30,279 --> 00:07:36,399
as many opportunities to send. More precisely, I'm going to say that the rate at

98
00:07:36,399 --> 00:07:42,799
which this queue is served is going to be 2 over 2 plus 1. So in other words, 2 is

99
00:07:42,799 --> 00:07:48,079
a fraction of the total rate of the Egress link. Likewise, I'm going to say that

100
00:07:48,079 --> 00:07:53,759
the rate that this one is going to be served is 1 that's its weight divided by

101
00:07:53,759 --> 00:07:58,959
the total weight times the outgoing link rate. Okay, that's what I'm trying to

102
00:07:58,959 --> 00:08:05,079
accomplish. I can generalize this to many queues as follows. This is simply just

103
00:08:05,079 --> 00:08:15,399
just increasing it from 2 to n where qi is going to receive W sub i bits of service

104
00:08:15,399 --> 00:08:22,519
and that's the that that's its its weight. So for example, W1 here will have a rate

105
00:08:22,519 --> 00:08:30,680
r1 is W1 divided by the sum of all of the weights. Alright, that is the sum over i

106
00:08:30,680 --> 00:08:39,439
of W i times r. All the way down to of course, W sub n just as before r of n equals

107
00:08:39,439 --> 00:08:46,279
W of n over the sum. I'll just write it like that times r of the outgoing link. If

108
00:08:46,279 --> 00:08:50,279
all the packets were of the same length, this would actually be pretty easy. We

109
00:08:50,279 --> 00:08:58,839
would simply visit each of the queues in turn and we will call that a round. So one round

110
00:08:58,839 --> 00:09:06,000
is when we visited all of the queues in turn and then we would send W sub i units. So they

111
00:09:06,000 --> 00:09:12,159
could be bits or complete packets from each queue in each round. So on the outgoing line,

112
00:09:12,159 --> 00:09:18,159
we could have we could have W sub 1 bits from here. Then we would have all the way through

113
00:09:18,159 --> 00:09:23,879
to W sub n bits from this one and then all the intervening queues as well. And so this

114
00:09:23,879 --> 00:09:28,799
would be a round when we visited all of the queues. And you can see that the proportion

115
00:09:28,799 --> 00:09:33,759
that each queue has has been served in that round is in proportion to the weights, which

116
00:09:33,759 --> 00:09:40,079
is exactly what we wanted. So if we could serve the packets as bits at a time and actually

117
00:09:40,079 --> 00:09:43,919
send them out as bits in a time, which of course we can't, but if we could, then this would

118
00:09:43,919 --> 00:09:48,559
actually pretty easy to accomplish what we wanted. We would simply classify the packets as they

119
00:09:48,559 --> 00:09:55,360
arrive into the queue that they are destined for. And then we would serve those queues according to

120
00:09:55,360 --> 00:10:04,319
the W sub i bits in each round and then send them out. Of course, packets are variable length and

121
00:10:04,319 --> 00:10:12,959
they don't consist of single bits. And the problem is that real packets vary in size from something

122
00:10:12,960 --> 00:10:19,920
like 64 bytes all the way to, in the case of Ethernet, about 1,500 bytes. There are jumbo

123
00:10:19,920 --> 00:10:25,759
frames that are even longer than this. But even here, we've got two orders of magnitude difference

124
00:10:25,759 --> 00:10:30,639
in packet size. So if we were to serve this packet by packet instead of bit by bit, it would

125
00:10:30,639 --> 00:10:35,840
really mess up the weights and we wouldn't accomplish what we were trying to do. Clearly, we must

126
00:10:35,840 --> 00:10:40,560
take into account the packet lengths if we want to prevent long packets from creating out a short

127
00:10:40,639 --> 00:10:48,319
ones. So let me describe how we do this. I'm going to first describe it in terms of a kind of a

128
00:10:48,319 --> 00:10:54,559
thought experiment. I'm going to use this notion of rounds again where we visit each queue in turn

129
00:10:54,559 --> 00:11:01,759
in a round. And then we're going to send W sub i bits from each queue during that round.

130
00:11:03,919 --> 00:11:10,159
But I'm going to assume that in addition to the queues that I have here, that I have another

131
00:11:10,159 --> 00:11:15,839
I'm going to call it a magic queue just to remind us that this isn't really a queue. It's just

132
00:11:15,839 --> 00:11:19,919
going to be a processing element just to help us think about the problem. We're going to get rid of

133
00:11:19,919 --> 00:11:27,360
this in a minute. So in a round, the first queue gets to send W sub one bits and the last queue gets

134
00:11:27,360 --> 00:11:34,879
to send W n bits. And what we're going to do is we're going to imagine that we're going to serve

135
00:11:34,879 --> 00:11:40,720
each of these queues by that number of bits in each round. And then when we get to an end of

136
00:11:40,720 --> 00:11:46,559
packet marker, which is the last bit in the last bit in a packet. So this would be the end of packet

137
00:11:46,559 --> 00:11:52,159
here. And then let's say this is the end of packet here. Once we've got to that end of packet marker,

138
00:11:52,159 --> 00:11:56,879
we will construct complete packets and send them onto the outgoing link. So that's what this magic

139
00:11:56,879 --> 00:12:04,159
queue is going to do. It's going to turn those bit by bit into packet by packet. And so this will

140
00:12:04,159 --> 00:12:10,719
be the end of packet bit here. And this is the end of packet bit here. But this is recognizing that

141
00:12:11,360 --> 00:12:16,000
we can't send them out as bits. We wait until a full packet is accumulated and then send them out.

142
00:12:17,120 --> 00:12:22,959
So the question is, in what order should we be sending these out onto the line? When should we send

143
00:12:22,959 --> 00:12:30,000
them? Because our goal is to meet the rate guarantees where each queue gets that weighted fair share

144
00:12:30,000 --> 00:12:34,879
of the outgoing line. So in what order should we send this packets in order to accomplish that?

145
00:12:35,519 --> 00:12:42,240
I'm going to describe that next. So just as before, we're going to assume that time proceeds in rounds.

146
00:12:42,879 --> 00:12:49,600
So our unit of time is going to be rounds. And we're going to figure out if we were to service

147
00:12:49,600 --> 00:12:58,000
the packets bit by bit, which round would they have finished in? Okay, so if we were to serve them bit

148
00:12:58,000 --> 00:13:07,039
by bit, which round would they have finished in? Well, I'm going to start by making an observation that

149
00:13:07,039 --> 00:13:12,799
will give you a give your clue as to how we're going to use this. Let's consider a packet here

150
00:13:12,799 --> 00:13:18,799
that's waiting to go. And let's consider the round in which it starts. We'll call that s of k. And

151
00:13:18,799 --> 00:13:26,720
the round in which it finishes. And we'll call that f sub k. Because we're serving everything in rounds

152
00:13:26,720 --> 00:13:32,960
and time progresses in rounds. We can say the finishing time of this packet is its starting time in

153
00:13:32,960 --> 00:13:42,399
rounds plus the length of the packet divided by w of 1. That's because that first queue will receive

154
00:13:42,399 --> 00:13:48,080
exactly w sub 1 bits of service in each round. So it's finishing round is its starting round plus

155
00:13:48,080 --> 00:13:53,279
its length divided by the number of bits it gets served per round. Okay, so this is the finishing time here.

156
00:13:53,279 --> 00:14:01,919
Now let's think about what happens when a packet arrives. So we're going to try and calculate the

157
00:14:01,919 --> 00:14:07,199
starting time of that packet when it arrives. In other words, what time will it enter service?

158
00:14:08,399 --> 00:14:12,799
And what time will it finish service? Might be surprising that we can do this, but I'm going to show

159
00:14:12,799 --> 00:14:19,519
you a way we can calculate both its starting time and its finishing time when it arrives. So the

160
00:14:19,519 --> 00:14:24,720
starting time of that packet, the time at which it starts to enter service, is going to depend on

161
00:14:24,720 --> 00:14:30,799
what's ahead of it in the queue. So if we're keeping track of the finishing time of this packet in rounds

162
00:14:31,759 --> 00:14:38,480
and we want to know what the starting time of this next packet here and its finishing time,

163
00:14:38,480 --> 00:14:43,279
we can do the following calculation. So this is the finishing time of the k minus 1 packet. It's the

164
00:14:43,279 --> 00:14:49,679
one that's ahead of it in queue. We can say that the starting time of the packet k is going to be

165
00:14:49,679 --> 00:14:56,319
simply the finishing time of the packet ahead of it because we're proceeding in rounds so it will be

166
00:14:56,319 --> 00:15:01,919
immediately entering service as soon as the one ahead of it is finished. Unless the queue happens

167
00:15:01,919 --> 00:15:06,799
to be empty and there's nothing ahead of us, in which case it will enter service now. There's going

168
00:15:06,799 --> 00:15:12,240
to be the max of these two values, the max of the finishing time of the packet ahead of it and now.

169
00:15:14,240 --> 00:15:20,559
The second thing that we can say is that the finishing time of k is its starting time plus

170
00:15:20,559 --> 00:15:26,639
l over w1 just as before because we know that's how much service. So the combination of these two

171
00:15:26,639 --> 00:15:33,839
gives us a recursion that so long as we keep calculating the finishing time and keep track of that,

172
00:15:33,839 --> 00:15:38,079
we can calculate the starting time and the finishing time of packets as they arrive.

173
00:15:38,720 --> 00:15:45,040
That's a pretty neat property. And then what we're going to do is we're going to service the packets

174
00:15:45,040 --> 00:15:48,480
in other words we're going to take the packets from head of line. So here is a scheduler. It's going

175
00:15:48,480 --> 00:15:53,280
to be examining the head of line packets and it's going to pick the one with the lowest

176
00:15:54,400 --> 00:15:59,200
f, the lowest finishing time. So it'll pick the packet with the lowest finishing time. So that's what

177
00:15:59,200 --> 00:16:06,320
the scheduler does. So we calculated the f of k when the packet came in and then when it gets to

178
00:16:06,320 --> 00:16:11,040
the head of line it's competing with all the head of line packets to leave and the scheduler is

179
00:16:11,040 --> 00:16:16,640
simply going to pick the one with the lowest finishing time. This has the nice property that

180
00:16:16,640 --> 00:16:22,400
finishing times can be determined when the packet arrives and the packets are served in order of

181
00:16:22,400 --> 00:16:26,800
their finishing time which at least intuitively seems like the best thing to do. Turns out that it's

182
00:16:26,800 --> 00:16:32,480
more than just intuitively a good thing to do. I'll show you why it actually is the right thing to do.

183
00:16:32,800 --> 00:16:41,039
If we plot the finishing time of the packets if they were being served bit by bit,

184
00:16:41,680 --> 00:16:47,200
in other words the time that the end of packet bit would leave on the outgoing line if the packet

185
00:16:47,200 --> 00:16:50,639
was being served bit by. It might look something like this. This is just something I sketched.

186
00:16:52,639 --> 00:16:58,000
If we look at the finishing time of the packet by packet scheme where each packet goes and must

187
00:16:58,000 --> 00:17:03,039
wait for the packet head of it to finish before it can go on the line, packets could end up actually

188
00:17:03,039 --> 00:17:07,359
departing a little bit later because they could be held up by a packet that's still in service.

189
00:17:07,359 --> 00:17:13,200
So there could be a little bit of a delta between when the packet would finish bit by bit and we know

190
00:17:13,200 --> 00:17:22,319
if it's bit by bit and the rate that it will receive the qi would receive will be w sub i over the

191
00:17:22,319 --> 00:17:27,279
sum of the wj's. In other words the the weight that we're looking for of the outgoing line. So

192
00:17:28,559 --> 00:17:33,920
if this was being met then we know that would be true. In the packet by packet scheme it can be

193
00:17:33,920 --> 00:17:39,039
proved that the difference in the time that it will depart under the packet by packet scheme

194
00:17:39,039 --> 00:17:47,119
is no more than lmax the maximum length packet divided by r later than under the bit by bit scheme.

195
00:17:48,319 --> 00:17:54,960
And that's true for every single packet in the system. So this is really useful because over a

196
00:17:54,960 --> 00:18:00,319
long period of time this tells us that the same number of bits will have departed as under the bit

197
00:18:00,319 --> 00:18:04,319
by bit scheme. They'll just be jiggled around a little bit. There'll be a little variance in the

198
00:18:04,319 --> 00:18:09,759
actual departure time but measured over a long period of time. So under this packet by packet scheme

199
00:18:09,759 --> 00:18:18,720
r of i will be the same as it was before. So it'll be that weight of i divided by the sum over wj

200
00:18:19,440 --> 00:18:28,640
r. So this will accomplish exactly the rates that we want. This scheme is often called wfq or weighted

201
00:18:28,640 --> 00:18:34,799
fair queuing. Weighted fair queuing is a pretty famous technique. You can find lots of references to it.

202
00:18:35,680 --> 00:18:40,319
It's also known as packet by packet generalized processor sharing but if you look under wfq you

203
00:18:40,319 --> 00:18:45,759
can find lots of references to it. But what it essentially tells us is tells us a specific mechanism

204
00:18:45,759 --> 00:18:50,879
for calculating the finishing time of packets and scheduling them so that we can give weighted

205
00:18:50,879 --> 00:18:57,039
fairness, weighted usage of the outgoing link and rate guarantees to each of the flows.

206
00:18:59,200 --> 00:19:04,720
In summary, fifo queues are a bit of a free-for-all. They have no priorities, no guaranteed rates

207
00:19:04,720 --> 00:19:10,559
and there's an incentive for a flow to send as many packets as it can into the queue so that it

208
00:19:10,559 --> 00:19:14,559
maximizes its share of the outgoing link. So they kind of encourage bad behavior.

209
00:19:15,519 --> 00:19:21,919
So instead it's quite common to use strict priorities. High priority traffic could see or experience

210
00:19:21,919 --> 00:19:26,720
a network with which appears to have no low priority traffic at all. It's unaffected by it.

211
00:19:26,720 --> 00:19:31,359
This is useful if we have limited amounts of high priority traffic like control traffic in the

212
00:19:31,359 --> 00:19:36,639
network. But if we want to do something that is more of a weighted priority then we need to use

213
00:19:36,639 --> 00:19:40,960
something like weighted fair queuing which lets us give each flow a guaranteed service rate.

214
00:19:41,600 --> 00:19:45,840
And we do that by scheduling the packets in order of their bit by bit finishing times.

215
00:19:46,880 --> 00:19:54,319
That's the end of the video.

