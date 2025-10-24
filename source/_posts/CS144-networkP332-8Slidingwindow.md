---
title: CS144 NetworkP332 8Slidingwindow
---

1
00:00:00,000 --> 00:00:10,000
This video I'm going to talk about a slightly advanced flow control algorithm called sliding window used in most high performance protocols today.

2
00:00:10,000 --> 00:00:17,000
So we're called a simple flow control algorithm, not called stop and wait, has it most one packet in flight and any time.

3
00:00:17,000 --> 00:00:23,000
So this is the basic simple protocol you might say algorithmally try to implement the first time you're doing reliable communication.

4
00:00:23,000 --> 00:00:33,000
So sender sends a packet or a chunk of data, receiver sends acknowledgement, there's sender if it doesn't receive the acknowledgement times out tries to be sending, if it gets the acknowledgement it sends more data.

5
00:00:33,000 --> 00:00:42,000
And there's some issues with duplicates you can maintain a counter or one bit counter to figure out if there's a duplicate act or an actor duplicate or new data.

6
00:00:42,000 --> 00:00:48,000
As long as things aren't duplicated for more than around trip time, stop and wait works, it's great, it's simple.

7
00:00:49,000 --> 00:00:55,000
So while stop and wait works correctly, it has one major problem.

8
00:00:55,000 --> 00:00:58,000
Let's see your journey communicate between Boston and San Francisco.

9
00:00:58,000 --> 00:01:02,000
And how the bottleneck is say 10 megabits per second.

10
00:01:02,000 --> 00:01:09,000
So there's a 10 megabits per second link here or let's say the Boston node can receive a 10 megabits per second.

11
00:01:09,000 --> 00:01:12,000
That's the way to which you can process to.

12
00:01:12,000 --> 00:01:15,000
In around trip time is 50 milliseconds.

13
00:01:15,000 --> 00:01:19,000
And let's just say for simplicity sake we're sending Ethernet frames.

14
00:01:19,000 --> 00:01:29,000
So that's the size of the data, so which are basically 1.5 kilobytes or 12 kilobits.

15
00:01:29,000 --> 00:01:37,000
Now around trip time is 50 milliseconds. That means that San Francisco can send one packet, 50 in if that packets receive successfully, 50 milliseconds later will get an acknowledgement.

16
00:01:38,000 --> 00:01:44,000
So we have 1000 milliseconds per second, divided by 50 milliseconds.

17
00:01:44,000 --> 00:01:51,000
This means that we can send it most 20 packets per second on this on this path.

18
00:01:51,000 --> 00:02:06,000
20 packets per second times 12 kilobits per packet is equal to 240 kilobits per second.

19
00:02:06,000 --> 00:02:16,000
So this path between San Francisco and Boston using the stop and wait protocol can send at most 240 kilobits per second, assuming no packets are lost, just constant RTT 50 milliseconds.

20
00:02:16,000 --> 00:02:19,000
But the bottleneck is 10 megabits per second.

21
00:02:19,000 --> 00:02:30,000
This means that this stop and wait protocol is using 2% of the capacity of what the communication can be.

22
00:02:30,000 --> 00:02:36,000
So stop and wait while it works can be astoundingly inefficient.

23
00:02:36,000 --> 00:02:43,000
San Francisco could be sending it a much faster than what stop and wait allows.

24
00:02:43,000 --> 00:02:49,000
So the basic solution that most protocols use today for this problem is something called a sliding window.

25
00:02:49,000 --> 00:02:52,000
And sliding windows are a generalization of stop and wait.

26
00:02:52,000 --> 00:02:55,000
So a stop and wait allows one packet in flight at any time.

27
00:02:55,000 --> 00:02:59,000
A sliding window protocol allows up to end packets in flight.

28
00:02:59,000 --> 00:03:04,000
So when n equals is equal to 1, a sliding window protocol behaves like stop and wait.

29
00:03:04,000 --> 00:03:10,000
And so let's say we have a sliding window protocol with an n equal to say 5 packets.

30
00:03:10,000 --> 00:03:18,000
So this means that San Francisco can have 5 packets in flight.

31
00:03:18,000 --> 00:03:28,000
And simultaneously there can be 5 acknowledgments coming back from Boston.

32
00:03:28,000 --> 00:03:37,000
And the idea here is that if you adapt, if you can set n to be the correct value,

33
00:03:37,000 --> 00:03:39,000
then you can keep the pipe full.

34
00:03:39,000 --> 00:03:46,000
That is San Francisco could send data to Boston at 10 megabits per second.

35
00:03:46,000 --> 00:03:48,000
So let's say that's Boston's rate.

36
00:03:48,000 --> 00:03:57,000
And so Boston can by configuring the sliding window size can have San Francisco send data to rate equal to 10 megabits per second.

37
00:03:57,000 --> 00:04:05,000
And so in this particular case, if we have an RTT of 50 milliseconds and a bottleneck of 10 megabits per second,

38
00:04:05,000 --> 00:04:12,000
let's say that we're sending Ethernet frames, right, 10 kilobits per packet.

39
00:04:12,000 --> 00:04:16,000
And we have 20 round trip times.

40
00:04:16,000 --> 00:04:24,000
That essentially means that the sliding window is going to be 10 megabits per second,

41
00:04:24,000 --> 00:04:36,000
divided by 20 round trip times, which is equal to 500 kilobits per round trip time.

42
00:04:36,000 --> 00:04:48,000
So we're looking at a sliding window of around 41 packets, right, 40 is 480 kilobits per round trip time.

43
00:04:48,000 --> 00:04:51,000
So 41 would be 492.

44
00:04:51,000 --> 00:05:03,000
And so if we had a sliding window of 40 packets, then we'd actually be able to sustain a 10 megabit connection from San Francisco to Boston with a round trip time of 50 milliseconds.

45
00:05:03,000 --> 00:05:07,000
So just to draw a picture, can show what this looks like.

46
00:05:07,000 --> 00:05:14,000
So here is the original, here's the stop and wait with this one bit counter, a data zero, a data one, a data zero, a data zero, a data one, a data zero, a data zero.

47
00:05:14,000 --> 00:05:22,000
So the sliding window, let's say we have a sliding window of size three.

48
00:05:22,000 --> 00:05:27,000
Well, the sender will send three packets.

49
00:05:27,000 --> 00:05:32,000
Let's call them D zero, D one, D two.

50
00:05:32,000 --> 00:05:36,000
And the receiver can then acknowledge them.

51
00:05:36,000 --> 00:05:40,000
Right, act zero, act one, act two.

52
00:05:40,000 --> 00:05:45,000
Well, as soon as the acknowledge been zero arrives, the sender can send data three.

53
00:05:45,000 --> 00:05:48,000
As soon as the acknowledge one arrives, the sender can send data four.

54
00:05:48,000 --> 00:05:53,000
As soon as the acknowledge one two arrives, the sender can send data five.

55
00:05:53,000 --> 00:05:57,000
So this is the basic idea, rather than having this one packet, you could have many packets.

56
00:05:57,000 --> 00:06:04,000
So in the case of having a sending window of size 40, you can imagine there are tons and tons and tons of packets in flight.

57
00:06:04,000 --> 00:06:11,000
So let's look at more concretely with this algorithm looks like for both the sender and the receiver, just as we did for stop and wait.

58
00:06:11,000 --> 00:06:18,000
So a sliding window sender, first in a sliding window protocol, every segment has a sequence number.

59
00:06:18,000 --> 00:06:23,000
So in protocols like TCP, this is usually done in terms of bytes because they can be variable size.

60
00:06:23,000 --> 00:06:27,000
For simplicity's sake, we'll just do it in terms of packet numbers.

61
00:06:27,000 --> 00:06:31,000
So there's a sequence number for every segment.

62
00:06:31,000 --> 00:06:43,000
So the sender maintains three variables, the size of its sending window, the last acknowledgment it received from the receiver, and the last segment it sent.

63
00:06:43,000 --> 00:06:52,000
And the sender's job is to maintain this invariant that the last segment sent minus the last acknowledgment received has to be less than or equal to the send window size.

64
00:06:52,000 --> 00:07:07,000
So this means that if it has received packet N by a packet with a sequence number of N, the sender cannot send a packet past N plus SWS.

65
00:07:07,000 --> 00:07:16,000
So let's say we have a sending window is equal to five, an elastic acknowledgment that's been received is equal to 11.

66
00:07:16,000 --> 00:07:25,000
Then this means that the sender cannot send a packet past 12, 13, 14, 15, 16.

67
00:07:25,000 --> 00:07:29,000
It's not allowed to send 17 until it gets the acknowledgment for 12.

68
00:07:29,000 --> 00:07:42,000
When you get a new acknowledgment, you advance LAR as necessary, and you buffer up to sending window size segments in case suddenly you get an acknowledgment and then you want to send a whole bunch of data.

69
00:07:42,000 --> 00:07:47,000
And let's pretend for a second we have a sending window size equal to three.

70
00:07:47,000 --> 00:07:55,000
And so here's packets of zero, one, two, three, say zero, I've been sent and acknowledged.

71
00:07:55,000 --> 00:08:01,000
So our sending window size is three, the last acknowledgment for the receiver is zero.

72
00:08:01,000 --> 00:08:06,000
So LAR is equal to zero, SWS is equal to three.

73
00:08:06,000 --> 00:08:12,000
This means that the last segment sent is equal to three.

74
00:08:12,000 --> 00:08:18,000
So now when an acknowledgment arrives say for one, then the sending window can advance.

75
00:08:18,000 --> 00:08:22,000
And so now the protocol can send four.

76
00:08:22,000 --> 00:08:31,000
And let's say an acknowledgment for four arrives, then the window can advance and it can send five, six, and seven.

77
00:08:31,000 --> 00:08:39,000
Now one thing that's important here is that let's say we have a send window which includes five, six, and seven, and five is lost.

78
00:08:39,000 --> 00:08:43,000
But six and seven arrive at the receiver and are acknowledged.

79
00:08:43,000 --> 00:08:48,000
The sender cannot advance the window past five until five is acknowledged.

80
00:08:48,000 --> 00:08:58,000
And so the window is what's called stonk, the window can stall, where although most of the data in the window has been delivered, it can't move past the first unacknowledged piece of data.

81
00:08:58,000 --> 00:09:01,000
So you can't advance the window past five.

82
00:09:01,000 --> 00:09:05,000
The receiver also maintains three variables.

83
00:09:05,000 --> 00:09:07,000
It has received window size.

84
00:09:07,000 --> 00:09:13,000
The last acceptable segments is the last segment that it will receive when we drop on the floor.

85
00:09:13,000 --> 00:09:19,000
If it receives a segment past this value, it'll assume something is wrong or it's not going to buffer it and it'll just discard it.

86
00:09:19,000 --> 00:09:22,000
Then there's a last segment it's actually received.

87
00:09:22,000 --> 00:09:33,000
And so the receiver is then maintaining this invariant that the last acceptable segment minus the last segment received must be less than or equal to the receipt window size.

88
00:09:33,000 --> 00:09:48,000
And so if you have received window size equal to five and a last segment received equal to three, then it's not going to excite anything past four, five, six, seven, eight.

89
00:09:48,000 --> 00:09:54,000
So if it receives suddenly segment 10, it won't accept it and it will drop it.

90
00:09:54,000 --> 00:10:00,000
Now, if the received packet is less than this acceptable segment, then it will send an acknowledgement.

91
00:10:00,000 --> 00:10:07,000
And so if it receives any of these packets, it will send an acknowledgement.

92
00:10:07,000 --> 00:10:17,000
Now, in the basic case, the way most sliding window particles work, these acknowledgments are what are called cumulative acknowledgments, such that you send an acknowledge.

93
00:10:17,000 --> 00:10:36,000
You send an acknowledgement for not the data you received, but rather what is the end of the contiguous data that you receive this cumulative, if I acknowledge three, that means that I've received three and everything before it, not just three.

94
00:10:36,000 --> 00:10:41,000
And so it represents a cumulative state of reception across the entire communication.

95
00:10:41,000 --> 00:10:51,000
So in this example, if a receiver is received one, two, three, and five, and then suddenly receives five, it doesn't acknowledge five, it acknowledges three.

96
00:10:51,000 --> 00:11:05,000
Now, there are some protocols that can do things like actually selective acknowledgments, but the basic case is that you use cumulative acknowledgments, which is cumulatively what is the contiguous chunk of data that you've received.

97
00:11:05,000 --> 00:11:15,000
So one little detail here, TCP doesn't acknowledge the data it's received, but rather n plus one.

98
00:11:15,000 --> 00:11:18,000
So TCP acknowledgments are in terms of bytes.

99
00:11:18,000 --> 00:11:24,000
And so if TCP is received up to byte n, its acknowledgement packets will say n plus one.

100
00:11:24,000 --> 00:11:27,000
So it's the first byte of data that's expected.

101
00:11:27,000 --> 00:11:32,000
So if you ever looking at TCP trace or trying to see how the TCP protocol works, just keep this in mind.

102
00:11:32,000 --> 00:11:41,000
The acknowledgement value in the TCP header isn't the last byte received the cumulative acknowledgment rather than the next byte, the first missing byte.

103
00:11:41,000 --> 00:11:52,000
So one of the things we talked about in the stop and wave protocol was that a counter of one bit counter was sufficient, assuming the packets weren't delayed more than around trip time.

104
00:11:53,000 --> 00:12:00,000
So what about in sliding window protocol? Suddenly if we receive window wave, the send window, how big is sequence number space do we need?

105
00:12:00,000 --> 00:12:06,000
So as the receive window is always greater than one, send window is always greater than one, rather than equal to one.

106
00:12:06,000 --> 00:12:11,000
And the receive window is greater than, is less than or equal to the send window.

107
00:12:11,000 --> 00:12:16,000
This is because if the receive window is ever greater than the send window, it's a waste.

108
00:12:16,000 --> 00:12:22,000
So when the sender would never have those packets in flight, and so there's this extra buffer space which will never be used.

109
00:12:22,000 --> 00:12:27,000
However, there are cases where the receive window can be smaller than the send window and the protocol still works.

110
00:12:27,000 --> 00:12:31,000
So here's one interesting basic case of that called go back in.

111
00:12:31,000 --> 00:12:38,000
Let's say we receive window of size one and a sending window that's larger than one.

112
00:12:38,000 --> 00:12:42,000
Well in this case we need sending window size plus one sequence numbers.

113
00:12:42,000 --> 00:12:49,000
So what does this protocol look like? Well the sender says, let's say it has a send window size is equal to three.

114
00:12:49,000 --> 00:12:52,000
So the sender sends zero, one, and two.

115
00:12:52,000 --> 00:13:00,000
And let's say those are acknowledged. And so the receiver acknowledges zero and acknowledges one and acknowledges two.

116
00:13:00,000 --> 00:13:05,000
Well when the acknowledge is zero, the sender is going to send three, slide the window forward when the acknowledge is one.

117
00:13:05,000 --> 00:13:11,000
It's going to send four. And when the acknowledge is two, it's going to send five.

118
00:13:11,000 --> 00:13:16,000
So now let's say that three is dropped.

119
00:13:16,000 --> 00:13:22,000
Now the sender, the receiver, it's going to still receive four and five. And so I can act two.

120
00:13:22,000 --> 00:13:26,000
It's going to send act two, act two.

121
00:13:26,000 --> 00:13:30,000
The sender is going to time out and we send three.

122
00:13:30,000 --> 00:13:39,000
So this called a go back end protocol because the receive window with size one, the receiver could not buffer four or five.

123
00:13:39,000 --> 00:13:47,000
And so when a single packet is lost in this case three, the sender has to go back in. It has to retransmit the entire send window with the packets.

124
00:13:47,000 --> 00:13:51,000
It has to retransmit three. It'll have to retransmit four and it'll have to retransmit five.

125
00:13:51,000 --> 00:13:57,000
In contrast, if the receive window size had been three, then the receiver could have buffered four and five.

126
00:13:57,000 --> 00:14:07,000
The sender would only have had to retransmit three. Then you get an act five and it could go on and send six, seven, nine, eight.

127
00:14:07,000 --> 00:14:14,000
And so here in the case of a go back end protocol, you need the send window size plus one sequence numbers.

128
00:14:14,000 --> 00:14:21,000
Because you imagine if you have only the send window size, there's zero, one, two.

129
00:14:21,000 --> 00:14:25,000
And then remember what happened in the stop and wait when there's a packet delayed.

130
00:14:25,000 --> 00:14:31,000
Or hey, let's say that the act four zero is delayed.

131
00:14:31,000 --> 00:14:43,000
There's a timeout, you retransmit zero. Now you can't distinguish whether or not the delayed acknowledgement was for the retransmission or for the old data.

132
00:14:43,000 --> 00:14:52,000
So in speaking, if the two windows are the same size, you need twice basically their sum. And so that's the generalization that you need RWS plus SWS sequence numbers.

133
00:14:52,000 --> 00:14:56,000
You need sequence number spaces, least as big as the sum of the window sizes.

134
00:14:56,000 --> 00:15:06,000
So that's the basic sliding window algorithm. And the algorithm is that the sender and the receiver use and how the sender manages the window.

135
00:15:06,000 --> 00:15:12,000
What does this look like in TCP? So TCP is a sliding window protocol and uses that for flow control.

136
00:15:12,000 --> 00:15:25,000
And so here's the TCP header. And so the way TCP works is the receiver specifies a flow control window using the window field in the symptoms of bytes.

137
00:15:25,000 --> 00:15:33,000
And so it basically says this is the buffer size that I have on the receiver. And so the set of packets that I will accept.

138
00:15:33,000 --> 00:15:48,000
And the basic rule is that here the data sequence number and the acknowledgement sequence number. And so a TCP receiver will only handle data equal to the acknowledged sequence number plus the window.

139
00:15:48,000 --> 00:15:56,000
And so the sender isn't allowed to send data past AC plus window.

140
00:15:56,000 --> 00:16:07,000
That's to make sure it doesn't send data which the receiver is not going to buffer. And so this is a way for the receiver to essentially set what the send window size is.

141
00:16:07,000 --> 00:16:09,000
So let's walk through an example.

142
00:16:09,000 --> 00:16:21,000
So here again, I'm going to talk in terms of packets rather than in bytes like in TCP. And here's the sequence number space for the packets from zero up to 29.

143
00:16:21,000 --> 00:16:34,000
So let's say that we have a received window size equal to two and a send window size equal to three.

144
00:16:34,000 --> 00:16:44,000
So communication begins and the sender is going to send zero one and two.

145
00:16:44,000 --> 00:16:51,000
Let's say all three of those packets arrive. And so the receiver received zero is going to acknowledge zero.

146
00:16:51,000 --> 00:16:57,000
It's then going to receive one acknowledge one receive two and acknowledge two.

147
00:16:57,000 --> 00:17:05,000
When the sender hears AC zero, it'll advance the window, the send window, and it'll send three.

148
00:17:05,000 --> 00:17:17,000
When it hears the acknowledgement for one, it'll advance the window and send four. When it hears the acknowledgement for two, it'll advance the window and send five.

149
00:17:17,000 --> 00:17:28,000
Now let's say that packet three arrives successfully and is acknowledged, but packet four is lost in the network.

150
00:17:28,000 --> 00:17:32,000
So now we have this case where,

151
00:17:32,000 --> 00:17:40,000
packet three has been sent, packet four is lost, then packet five arrives at the receiver.

152
00:17:40,000 --> 00:17:49,000
Now the receiver is going to send another acknowledgement three again because of cumulative acknowledgments.

153
00:17:49,000 --> 00:17:56,000
And so now the sender heard AC three, then another AC three.

154
00:17:56,000 --> 00:18:04,000
Wades times out and resends four.

155
00:18:04,000 --> 00:18:06,000
So it'll resend four.

156
00:18:06,000 --> 00:18:09,000
Let's say four arrives.

157
00:18:09,000 --> 00:18:16,000
Now this receiver can acknowledge four so it can act four, but because it's received window is of size two,

158
00:18:16,000 --> 00:18:21,000
it actually had five buffered and so it can also acknowledge five.

159
00:18:21,000 --> 00:18:26,000
And so it'll send AC five.

160
00:18:26,000 --> 00:18:35,000
So a sliding window flow control algorithm allows an unacknowledged, so a whole window of unacknowledged packets to be in flight.

161
00:18:35,000 --> 00:18:46,000
And so this allows is if you can set that window size appropriately, it allows a sender to be able to actually fully utilize the capacity that the receiver has,

162
00:18:46,000 --> 00:18:50,000
unlike a stop and wave protocol where you can have a most one packet in flight.

163
00:18:50,000 --> 00:18:58,000
When acknowledgments arrive for new data, the sender advances the window, generally sliding window protocols use cumulative acknowledgments.

164
00:18:58,000 --> 00:19:03,000
And the exact sequence number space you use depends on the window sizes.

165
00:19:03,000 --> 00:19:09,000
So it turns out TCP uses a large sequence number space just for free.

166
00:19:09,000 --> 00:19:14,000
So if you listen to really the robust against heavily delayed packets, they're for influencing your own protocol,

167
00:19:14,000 --> 00:19:17,000
maybe you'll be able to get away with something a little bit smaller.

