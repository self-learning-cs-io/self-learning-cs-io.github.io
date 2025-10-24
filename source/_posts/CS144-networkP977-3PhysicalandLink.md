---
title: CS144 NetworkP977 3PhysicalandLink
---

1
00:00:00,000 --> 00:00:05,000
In the next two videos, I'm going to be telling you about clocks and clock recovery.

2
00:00:05,000 --> 00:00:11,000
Whenever we send data over a link, for example an Ethernet link, we normally assume a data rate,

3
00:00:11,000 --> 00:00:14,000
like 10 megabits per second or a gigabit per second.

4
00:00:14,000 --> 00:00:19,000
When we send a 10 megabits per second, we're assuming that each bit lasts 100 nanoseconds,

5
00:00:19,000 --> 00:00:26,000
or 10 million of them per second. And at a gigabit per second, we're assuming each bit lasts a nanosecond.

6
00:00:26,000 --> 00:00:31,000
So there must be some notion of a clock somewhere, the clock that was used by the transmitter

7
00:00:31,000 --> 00:00:36,000
in order to send those bits in the first place. And the receiver needs to know that clock as well

8
00:00:36,000 --> 00:00:39,000
in order to be able to correctly decode them.

9
00:00:39,000 --> 00:00:45,000
The problem is that there is no universal reference for a clock, which is precisely the same in two places.

10
00:00:45,000 --> 00:00:51,000
So the clock that's used or the frequency that's used by the transmitter is not precisely known to the receiver.

11
00:00:51,000 --> 00:00:56,000
It has to figure it out so it can figure out where one bit ends and another bit begins.

12
00:00:56,000 --> 00:01:01,000
So in this video, I'm going to be describing what the general problem is,

13
00:01:01,000 --> 00:01:07,000
how we encode clock information with the data to make the life easier for the receiver,

14
00:01:07,000 --> 00:01:13,000
and then how the receiver can extract the clock and use it to transfer it into its own clock domain,

15
00:01:13,000 --> 00:01:20,000
its own frequency of clock, and then use it and manipulate it as it would like in at the receiver.

16
00:01:20,000 --> 00:01:23,000
So the outline of what we're going to be seeing is this.

17
00:01:23,000 --> 00:01:26,000
I'm going to be describing how data is transmitted using a clock,

18
00:01:26,000 --> 00:01:32,000
and the receiver needs to know when to sample the incoming bits in order to recover them correctly.

19
00:01:32,000 --> 00:01:37,000
We'll see this in the context of what's called asynchronous communications for short messages,

20
00:01:37,000 --> 00:01:44,000
but then the more common case is synchronous communication. That's what's used in Ethernet and systems like that,

21
00:01:44,000 --> 00:01:51,000
where the data is encoded along with the clock, making it easier for the receiver to recover the clock at the far end,

22
00:01:51,000 --> 00:01:53,000
and then move it into its own clock domain.

23
00:01:56,000 --> 00:02:00,000
When we transmit data, we always send it using a clock.

24
00:02:00,000 --> 00:02:03,000
That's because we want it to have a particular frequency.

25
00:02:03,000 --> 00:02:07,000
So for example, here I show a server, a sending data,

26
00:02:07,000 --> 00:02:14,000
and I've sort of zoomed in on the final stage of processing just before the data goes out on the wire.

27
00:02:14,000 --> 00:02:20,000
This is a flip flop, which is just merely timing the data according to the outgoing clock,

28
00:02:20,000 --> 00:02:26,000
which is here 10 megahertz. In other words, there's a 100 nanosecond period to this clock.

29
00:02:26,000 --> 00:02:30,000
So this is a clock that we might use for sending it 10 megabits per second.

30
00:02:30,000 --> 00:02:33,000
When we want to receive that data at the other end,

31
00:02:33,000 --> 00:02:41,000
ideally there would be a second wire coming from here that could be used in order to clock the data in at the other end,

32
00:02:41,000 --> 00:02:48,000
so that this would come in as the data, and then would go to the receiver at the other end.

33
00:02:48,000 --> 00:02:52,000
This would take two wires. We'd have to send both the data and the clock,

34
00:02:52,000 --> 00:02:58,000
and in most cases we can't afford to do that. It would be much more efficient if we could just send one of them.

35
00:02:58,000 --> 00:03:05,000
So on here we would have the, if we were to do this, we'd have the data that could be the sequence 0, 1, 0, 1, 1,

36
00:03:05,000 --> 00:03:14,000
and then 0, 0. And then down here would just be the clock that we would use in order to be able to encode it at one end and decode it at the other.

37
00:03:14,000 --> 00:03:19,000
We're going to be looking at a number of different examples where the clock is not sent.

38
00:03:19,000 --> 00:03:24,000
There's no specific or separate clock line, and in fact this is how it's done in practice.

39
00:03:24,000 --> 00:03:31,000
There's no separate clock that's sent. Everything has to be determined from the signal itself.

40
00:03:31,000 --> 00:03:36,000
To illustrate the problem, let me start with an example.

41
00:03:36,000 --> 00:03:44,000
Imagine that we have a clock here, and this is the clock that is being used by the transmitter in order to clock the data out onto the wire.

42
00:03:44,000 --> 00:03:49,000
Okay, so I've put the guidelines here just to help me draw that. So this is the TX clock.

43
00:03:49,000 --> 00:03:52,000
Alright, that is TX, CLK.

44
00:03:52,000 --> 00:04:01,000
The data that's being sent, let's say in this example, we're going to, every time there's a downward transition in the clock,

45
00:04:01,000 --> 00:04:10,000
we're going to change the data that's put on the wire. So for example, let's say that it started out idle, and then it went to a 1,

46
00:04:10,000 --> 00:04:19,000
and then it went for a 1 here, and then it continued as a 1 in the data down to here, and then we wanted to send a 0,

47
00:04:19,000 --> 00:04:30,000
and then a, and so on. So the data that's being sent is 0, 1, 1, 0, 1, and then we're sending another 1 again here.

48
00:04:30,000 --> 00:04:39,000
And so, at the receiver, let's look at the receiver's clock, and let's assume that the receiver's clock is nominally running at the same frequency,

49
00:04:39,000 --> 00:04:46,000
although we didn't get exactly right, because we were generating it locally, and we were using a different oscillator, for example, in order to generate that.

50
00:04:46,000 --> 00:04:51,000
And they were designed to be the same normally, but they're very slightly different.

51
00:04:51,000 --> 00:04:57,000
And so in this case, we're going to assume that that receiver clock is operating just a tad slower.

52
00:04:57,000 --> 00:05:06,000
So it may have its transition at the same place at the beginning, but because it's running a little bit slower, its first transition is a little bit later than this one.

53
00:05:06,000 --> 00:05:16,000
And so its next transition is a little bit later again, it's going to get a little later, and then it's going to get a little later, and then eventually, just because it's running a little bit slower,

54
00:05:16,000 --> 00:05:26,000
it's going to start falling behind, and you can see that by the time we get all the way over to here, its upward transition is about the same time as the transmit clock's downward transition.

55
00:05:26,000 --> 00:05:34,000
So it's about out by half a phase. Now I've exaggerated it here, in practice there'd be much closer than this, but I'm just exaggerating to show you what's going on.

56
00:05:35,000 --> 00:05:56,000
Okay, now the data on when we were sending it was being changed on the downward transition, and it kind of makes sense for the receiver to try and identify the middle of the bit and sample a bit in the middle, so here and here, and here if it can, because this is furthest away from the edges, and so the data is going to be at its most stable.

57
00:05:56,000 --> 00:06:09,000
So we're looking to look into sample that in the middle. So for example, if we started sampling here, right at the beginning from the receiver, we would pretty accurately detect that as a zero, so we would see that as a zero, and everything would be good.

58
00:06:09,000 --> 00:06:18,000
Then we're going to sample it again here, we're a little later than we would have been than we would have liked, but we're still going to reliably see that as a one, so things are good.

59
00:06:19,000 --> 00:06:27,000
We're going to sample it here, we're getting a bit close to that edge, let's give ourselves the benefit of the doubt and say that we just caught that one there.

60
00:06:27,000 --> 00:06:37,000
By the time we come over here and sample again, we're actually sampling right here, and we're going to miss this zero completely, so when we sample here, we're going to see a one again.

61
00:06:37,000 --> 00:06:48,000
This was zero that happened in the middle, this zero that was sent here. We didn't sample, though, we're no up arrows during that bit period of the receiver, so we didn't see it, we missed it completely.

62
00:06:48,000 --> 00:07:01,000
So clearly our ability to detect this is going to depend on a couple of things. One is how different are these clocks? I really exaggerated the difference here, in practice they're very, very similar within a fraction of a percent.

63
00:07:01,000 --> 00:07:19,000
In fact, we usually use units of parts per million, ppm, parts per million. So for example, if we say that a clock is within plus or minus a hundred parts per million, we mean it's within plus or minus that would be 0.01%.

64
00:07:19,000 --> 00:07:31,000
That's because that's 10 to the minus 10 to the minus 4. So that would be a typical value. In fact, you can get clocks that are as much as close as 50 parts per million.

65
00:07:31,000 --> 00:07:43,000
Still, if we go over enough bits, so if it's 100 parts per million, we would have to go over about 10,000 bit times, and we would actually have shifted by a complete bit in either direction.

66
00:07:43,000 --> 00:07:52,000
And we don't know whether the receiver is running faster or slower than the transmitter, so we don't know whether we're going to accidentally double sample a bit, or we're going to miss a bit completely.

67
00:07:52,000 --> 00:08:06,000
Generally speaking though, they hold at a fairly constant frequency. In other words, if one is faster, it's likely to stay faster for quite a while. They're not drifting very quickly relative to each other, they may just have a fixed offset.

68
00:08:06,000 --> 00:08:13,000
So here we see the problem where we've actually incorrectly decoded the data because we didn't have the clock.

69
00:08:13,000 --> 00:08:23,000
Now, in some cases, we can still communicate without having to explicitly understand what the clock is or be able to recover it.

70
00:08:25,000 --> 00:08:35,000
In what's called asynchronous communication. Although we don't use this for networks like Ethernet, it's used by things like infrared remote control for a TV.

71
00:08:35,000 --> 00:08:45,000
Or for short communications. It's also used on the serial bus that's used to connect computers, although that's not used very much anymore.

72
00:08:45,000 --> 00:08:53,000
So for very short communications, so long as we know normally that the transmit and the receive clock are about the same, we can make this work.

73
00:08:53,000 --> 00:08:58,000
So for example, imagine that we had a very short packet here consisting of just seven bits.

74
00:08:58,000 --> 00:09:11,000
At the beginning, it has this big bit at the beginning, which looks like it has a bigger amplitude, just to tell us that this is the start of the packet, and there's one at the end to tell us that it's the end of the packet.

75
00:09:11,000 --> 00:09:19,000
So the start bit, let's stop it. Then we have the sequence 0, 1, 1, 0, 1, 0, 0. This is just the data inside the packet.

76
00:09:19,000 --> 00:09:30,000
So the transmit clock, that's what was used in order to encode this in the first place. That's correctly detecting the middle of each of these bits.

77
00:09:30,000 --> 00:09:36,000
0, 1, 1, right in the center of all those bits, because that's what was used to transmit it in the first place.

78
00:09:36,000 --> 00:09:41,000
And here might be the receive clock. The receive clock here is running a little slower than the transmit clock.

79
00:09:41,000 --> 00:09:50,000
You can see that there's a slight gap between here and here, and that gap is going to grow as we go on closer to the end of the bit.

80
00:09:50,000 --> 00:10:02,000
So long as before we get to the end of the packet, the receiver, it can still correctly decode the bits, and here it's correctly decode that 0.

81
00:10:02,000 --> 00:10:09,000
Then we're okay. So how did all of this work? Well, after the start bit, the receiver said,

82
00:10:09,000 --> 00:10:21,000
I'm going to start sampling half a bit time later. So it sees that start bit, it sees that falling edge here, and then it times until it samples, and then it correctly samples the 0 here.

83
00:10:21,000 --> 00:10:30,000
And then it waits for another clock period, and then it samples again, and it will correctly sample that one, and so on all the way to the end.

84
00:10:31,000 --> 00:10:40,000
How you can see that if the packet was longer, because of this drift of the receive clock, it's getting later and later and later, eventually it will miss a bit.

85
00:10:40,000 --> 00:10:56,000
So so long as we can make sure that the packet is not too long, in other words, we control P, and if we know that the tolerance between these two clocks, the difference between them, then knowing those two numbers, we can make sure that we can reliably decode the packet.

86
00:10:56,000 --> 00:11:14,000
So for short packets, this works fine. In practice though, this doesn't work very well for long packets, because we'd like P to be thousands or hundreds of thousands of bits, and we would have to make the tolerance of the receive clock so tight that this would not be practical to do in a real system.

87
00:11:14,000 --> 00:11:25,000
So asynchronous communication sometimes used for links with short packets, in for remote control or serial links, or for example, those connecting directly to a printer locally.

88
00:11:25,000 --> 00:11:37,000
Okay, so we've seen how data is transmitted using a clock, and we've seen that the receiver needs to know when to sample the arriving data, and we've also seen an example of asynchronous communications.

89
00:11:37,000 --> 00:11:44,000
Now we're going to go under the real meet, which is the synchronous communications, which is what we use in practice.

90
00:11:44,000 --> 00:11:50,000
Let me start with sort of a block diagram of how the system might look.

91
00:11:50,000 --> 00:11:57,000
Don't be intimidated. I'm going to go through each of these pieces in turn, and we're going to understand what each of them is doing.

92
00:11:57,000 --> 00:12:11,000
So the problem is different hosts, and here we have a server A that's sending to the router on the right, different hosts are using locally generated clocks of normally the same frequency, but slightly different.

93
00:12:11,000 --> 00:12:22,000
So we have 10 megahertz plus or minus 100 parts per million. Again, this example here is a 10 mega bit per second link, because I'm sending data using this 10 megahertz clock.

94
00:12:22,000 --> 00:12:32,000
And I'm sending to the router, sending to my first router, of course this could be another host or an Ethernet switch, anything which is the other end of an Ethernet link.

95
00:12:32,000 --> 00:12:44,000
When the data arrives, because I'm only sending one over one piece of wire, what the receiver is going to do is going to try and figure out the clock that was used by the sender.

96
00:12:44,000 --> 00:12:55,000
And this is in what's called a clock recovery unit or a clock recovery circuit. These are special circuits that take the incoming signal and determine the clock that was used by the sender.

97
00:12:55,000 --> 00:13:02,000
It does this by examining the frequency and the phase of the arriving bits, so those bits that were on the wire.

98
00:13:02,000 --> 00:13:15,000
So it's going to look at the bits and say, aha, if I can actually detect when there's a transition, then I can actually determine what the frequency was and actually where one bit starts and another bit and that bit ends.

99
00:13:15,000 --> 00:13:18,000
So it's able to recover this.

100
00:13:19,000 --> 00:13:31,000
So when the bit pattern could be anything, if there's a strong enough component in the spectrum from the sender's clock of what its frequency was, then there's a receiver will find it and use it to sample the bits.

101
00:13:31,000 --> 00:13:44,000
There are many types of circuit that are used for clock recovery unit, but the most common one is called a phase lock loop or a PLL phase locked loop and delay lock loops called DLLs, that kind of a digital equivalent.

102
00:13:44,000 --> 00:13:54,000
Or they could actually be a very precise filter. There's something called a SOAR filter or a surface acoustic wave, which is also used as a clock recovery device.

103
00:13:54,000 --> 00:14:04,000
In the next slide, I'm going to tell you about how we make life easier for this clock recovery unit by encoding the clock and the data together before we transmit it.

104
00:14:04,000 --> 00:14:08,000
Let's go on and see what the other pieces are here.

105
00:14:08,000 --> 00:14:17,000
So there's a flip flop that's used at the receiver in order to clock that data in. And you can see that, let me just redraw that, here's the flip flop.

106
00:14:17,000 --> 00:14:29,000
And it's being clocked using the senders clock. So in other words, we've figured out what this clock was in the clock recovery unit and we're using that to clock here.

107
00:14:29,000 --> 00:14:41,000
Even though we've used the senders clock in order to recover the data, eventually we need to process it using a clock that's been generated locally using an oscillator that is running inside the router.

108
00:14:41,000 --> 00:14:52,000
So it needs to be able to clock this in. And this is why we say that the clock that's once we've moved it into the into the clock domain of the receiver, we call this the receive clock domain.

109
00:14:52,000 --> 00:15:03,000
So up until this point here, this transition, this dotted line, we're using the transmitters clock domain because we've recovered the senders clock. And so we're operating using its clock.

110
00:15:03,000 --> 00:15:15,000
But the clock of the transmitter is not much used to us at the receiver if we're wanting to process the data in order to calculate check sums and retransmit the data according to our local clock.

111
00:15:15,000 --> 00:15:23,000
So we have to somehow move from one domain to the other. We have to do this very carefully so that we don't lose bits in between.

112
00:15:23,000 --> 00:15:33,000
So once the data has been sampled by the flip flop, it's placed into a small 5.0 and that's the 5.0 shown here.

113
00:15:33,000 --> 00:15:37,000
And this 5.0 is very critical to how the whole system works.

114
00:15:37,000 --> 00:15:43,000
The 5.0 is another special circuit to help us take the bit from the senders clock domain into the receivers clock domain.

115
00:15:43,000 --> 00:15:49,000
Why? Because we need to get the bit into the clock domain of the receiver so it can process the packet using its own clock.

116
00:15:49,000 --> 00:15:57,000
To do this, the bit is written into the 5.0 so it's written into the 5.0 here using the transmitters clock.

117
00:15:57,000 --> 00:16:03,000
And then it's read out of the 5.0 using the receivers clock.

118
00:16:03,000 --> 00:16:09,000
So the 5.0 is different from the ones we used before where we assume that the clock is the same on both sides.

119
00:16:09,000 --> 00:16:13,000
This 5.0 is very carefully designed to let us do this using two clocks.

120
00:16:13,000 --> 00:16:21,000
Once the bit emerges on the other side, it is now in the clock domain of the receiver and we can safely process it using its clock.

121
00:16:21,000 --> 00:16:29,000
This 5.0 is called an elasticity buffer.

122
00:16:29,000 --> 00:16:43,000
And we call it an elasticity buffer because it's taking up the slack between the two clocks and we're going to see in a minute how this is going to go up and down according to the relative speeds of the two clocks.

123
00:16:43,000 --> 00:16:51,000
And in a few minutes I'll explain how we design the whole system so we never overflow or underflow this elasticity buffer.

124
00:16:51,000 --> 00:17:00,000
But first, I'm going to describe how we encode the signal in the first place so that the clock can be recovered by this clock recovery unit.

125
00:17:00,000 --> 00:17:11,000
If the clock was sent separately, as I described in an example earlier, as it would be on a circuit board of a computer or between different parts of a circuit on a chip, life would be pretty simple.

126
00:17:11,000 --> 00:17:19,000
We could simply use the clock to feed into the flip flop and capture the bits in the same clock domain everywhere.

127
00:17:19,000 --> 00:17:25,000
But if the clock is not sent separately, the data stream must have sufficient transitions in it.

128
00:17:25,000 --> 00:17:34,000
We must make sure that there are enough transitions in it in order for the receiver to be able to determine the clock at the other end.

129
00:17:34,000 --> 00:17:42,000
We might be looking at this and saying, what if I was to send a stream of all ones so that this actually was like this, it would have no transitions in it at all.

130
00:17:42,000 --> 00:17:47,000
And so the receiver wouldn't be able to determine what the clock is. So we need to prevent that from happening.

131
00:17:47,000 --> 00:18:01,000
Likewise, if it was to send all zeros, there would be no transitions. Or if it was to send a signal that looked like this, that had that changed half as often as the clock, then we might be confused and believe that the clock frequency was half what in fact it was.

132
00:18:01,000 --> 00:18:12,000
So we need to think about this carefully. And the method that is typically used is to encode the data and when we send it in order to make sure there are sufficient transitions.

133
00:18:12,000 --> 00:18:20,000
So I'm going to start by describing what the original 10 megabit per second ethernet used. It used something called Manchester coding or Manchester encoding.

134
00:18:20,000 --> 00:18:31,000
Manchester coding is a very, very simple mechanism. It's used occasionally these days, not as much as it was and we'll see why that is in a minute. But it's perhaps the simplest one to understand.

135
00:18:31,000 --> 00:18:40,000
Here at the top is the data that we want to send. So this is the 0-1-1-1, sorry, 0-1-1-0-1-1, which is the data that we want to send.

136
00:18:40,000 --> 00:18:46,000
And the way that that's going to be encoded before placing it onto the wire is as follows.

137
00:18:47,000 --> 00:18:53,000
We're going to look at the middle, we're going to look at the bit and make sure that there is a transition during every bit time.

138
00:18:53,000 --> 00:19:01,000
So this is this signal here is the one that's going to go under the wire. Whenever we see a 0, we can have a downward transition.

139
00:19:01,000 --> 00:19:11,000
Whenever we see a 1, we can have an upward transition. So here we can see 1 is encoded by an upward transition. 0 is encoded by a downward transition.

140
00:19:12,000 --> 00:19:17,000
So this would be what would go on the line and then to make it a continuous signal, we do this.

141
00:19:17,000 --> 00:19:24,000
Now notice I had to insert another transition here because I've got 1 followed by 1, so therefore I need to have a downward transition.

142
00:19:24,000 --> 00:19:32,000
And here I've got 1 followed by a 0, so I need to have a downward transition here. So this would be the sequence that I would send on the wire.

143
00:19:33,000 --> 00:19:39,000
Then the clock that I would use at the far end can be recovered by just looking for the transitions.

144
00:19:39,000 --> 00:19:49,000
See I've got a transition here, I've got a transition here, so whenever I see a transition I can be sure that I can use that to have a nice strong and easy way to recover the clock.

145
00:19:49,000 --> 00:19:57,000
I must make sure that I'm not confused, I mustn't see this transition as representing another upbeat on the clock at the other end.

146
00:19:57,000 --> 00:20:05,000
But I could do that by just having a finely tuned filter at the other end because I know that normally I'm looking for a 10 megabit per second clock.

147
00:20:05,000 --> 00:20:10,000
And so I'm not going to confuse it with one that's running at twice the speed.

148
00:20:10,000 --> 00:20:18,000
So by having a nice healthy set of transitions in the middle of the signal I can be sure that it's easy to recover it at the other end.

149
00:20:18,000 --> 00:20:23,000
So the advantages of this Manchester encoding is it guarantees one transition per bit period.

150
00:20:23,000 --> 00:20:30,000
It has a second benefit which is a little bit more subtle. It does something which is called ensuring the DC balance.

151
00:20:30,000 --> 00:20:41,000
If I send those as voltage levels on the wire with that was zero and this was plus and this was minus, this was minus.

152
00:20:41,000 --> 00:20:50,000
I'm actually sending just as many, just as much spending, just as much of the time above that line as I am below it.

153
00:20:50,000 --> 00:20:55,000
And so I'm making sure that I get DC balance in the long term.

154
00:20:55,000 --> 00:21:05,000
The benefit of this is that in order to be able to correctly differentiate a one and a zero at the other end, I just need to set my threshold to be in the middle or the average on the wire.

155
00:21:05,000 --> 00:21:10,000
So that makes it for a very reliable and robust recovery of bits at the far end.

156
00:21:10,000 --> 00:21:16,000
There's a clear disadvantage of Manchester encoding and that I'm inserting more transitions than I actually need.

157
00:21:16,000 --> 00:21:21,000
I'm doubling the bandwidth in the worst case.

158
00:21:21,000 --> 00:21:33,000
I'm doubling the bandwidth because by having more transitions, if I was to send a sequence of all ones, I would actually have a sequence of these where I've got twice as many transitions as I really need.

159
00:21:33,000 --> 00:21:42,000
So by doubling the bandwidth, I would have a dominant frequency component with the signal that has been increased.

160
00:21:42,000 --> 00:21:46,000
So we're running over a cable and trying to make it as fast as we can. This is a problem.

161
00:21:46,000 --> 00:21:51,000
We've now wasted some of the pressure span with on the wire.

162
00:21:51,000 --> 00:21:54,000
Let's look at what this spectrum looks like.

163
00:21:54,000 --> 00:21:57,000
This is the frequency spectrum for 10 megabits per second.

164
00:21:57,000 --> 00:22:04,000
So in other words, if we take it into a spectrum analyzer, something that will tell us the signal strength as a function of the frequency.

165
00:22:04,000 --> 00:22:09,000
And if we were to take the original bit sequence, we would see something like this.

166
00:22:09,000 --> 00:22:24,000
We would see at different frequencies. So this frequency here is the five megahertz, which is the average when I've got a sequence of zeros and ones, but a random sequence of zeros and ones.

167
00:22:24,000 --> 00:22:32,000
I would see some frequency component around here, but it's not strong enough to find it and lock onto it and know that that was the frequency of the clock.

168
00:22:32,000 --> 00:22:41,000
However, if I look at it with Manchester encoding, I see what suddenly emerges is this strong component at 10 megahertz.

169
00:22:41,000 --> 00:22:47,000
Everything has been moved up in the frequency band because I've encoded it and inserted more transitions.

170
00:22:47,000 --> 00:22:54,000
So the spectrum itself is starting at five megahertz roughly now. There'll be a little bit down here for long sequences of zeros or ones.

171
00:22:54,000 --> 00:22:59,000
But I'm seeing that most of that spectrum is now above five megahertz.

172
00:22:59,000 --> 00:23:06,000
It makes it very easy for clock recovery because I just need to find this dominant component and then use it as my clock at the far end.

173
00:23:06,000 --> 00:23:11,000
So Manchester encoding it makes it nice easy, nice and easy.

174
00:23:11,000 --> 00:23:26,000
As a second example, if I wanted to use something that was a little bit more efficient than Manchester encoding, I can take successive numbers, successive blocks of bits and encode them in a way to make sure I've got some transitions, but maybe not twice as many as I had before.

175
00:23:26,000 --> 00:23:34,000
This is in this example, I will describe something called 4B5B encoding. There are variants of this 8B10B, 15B, 16B.

176
00:23:34,000 --> 00:23:43,000
4B means it's 4B of original data that I wanted to send and I'm going to encode that into a 5-bit code.

177
00:23:43,000 --> 00:23:49,000
So just as an example here, I took 0, 0, 0, 0 and I encoded as 1, 1, 1, 1, 1, 0.

178
00:23:49,000 --> 00:23:56,000
So I'm guaranteed if I send this on the wire of 1, 1, 1, 1, 0.

179
00:23:56,000 --> 00:24:00,000
So this would be the 1, 1, 1, 1, 0.

180
00:24:00,000 --> 00:24:03,000
I'm guaranteed that there is a downward transition during that code.

181
00:24:03,000 --> 00:24:09,000
This code has two transitions in it, or actually three, from 0 to 1, 1 to 0, and then 0 to 1 again.

182
00:24:09,000 --> 00:24:11,000
This one has from 1 to 0, 0 to 1.

183
00:24:11,000 --> 00:24:16,000
So I can be sure always that there are some transitions within that 5 bits.

184
00:24:16,000 --> 00:24:23,000
If I know that at the far end, then there will be enough transitions. Then whatever the data originally included,

185
00:24:23,000 --> 00:24:28,000
I can make sure that I've got enough transitions to be able to recover the clock at the far end.

186
00:24:28,000 --> 00:24:34,000
Why can I be sure that there are transitions? Well, there are two to the four, or 16 data codes,

187
00:24:34,000 --> 00:24:38,000
and there are two to the five, or 32 codes that I'm going to put onto the wire.

188
00:24:38,000 --> 00:24:42,000
I'm just going to select those ones that have enough transitions.

189
00:24:42,000 --> 00:24:48,000
So there are twice as many to choose from. I can always be sure to find a code that has a transition in it.

190
00:24:48,000 --> 00:24:54,000
So I can be sure that the outgoing data that I put onto the wire has enough transitions in it.

191
00:24:54,000 --> 00:25:02,000
Comes at an overhead. It's more bandwidth efficient than Manchester encoding, but it has a 25% overhead.

192
00:25:02,000 --> 00:25:06,000
But that's certainly much better than having a double overhead.

193
00:25:06,000 --> 00:25:13,000
I'm actually left with some extra codes, and some people will use these for some in-band control signals.

194
00:25:13,000 --> 00:25:21,000
So I'm actually end up with 16 codes that I didn't actually need, because I've taken from four bits to five bits.

195
00:25:21,000 --> 00:25:26,000
Fewer transition definitely make the clock recovery harder than for Manchester encoding,

196
00:25:26,000 --> 00:25:31,000
but this has been around long enough that people have developed clever circuits in order to be able to do this.

197
00:25:31,000 --> 00:25:38,000
So the 4B5B and variants of this block coding is very commonly used today.

198
00:25:38,000 --> 00:25:47,000
So in summary, I have a system that looks like this. We've seen the clock that's being used here.

199
00:25:47,000 --> 00:25:52,000
I've now got encoded data. So this would be the encoded data that I'm sending.

200
00:25:52,000 --> 00:25:57,000
Could be 4B5B or Manchester encoded. It goes out over the link.

201
00:25:57,000 --> 00:26:04,000
The clock recovery unit is going to determine what the clock was that was used at the sender by examining the transitions.

202
00:26:04,000 --> 00:26:10,000
We'll use that to clock the data in, and then it's going to put it into this elasticity buffer right here.

203
00:26:10,000 --> 00:26:17,000
In the next video, I'm going to be describing how this elasticity buffer works and how we can size it correctly.

204
00:26:17,000 --> 00:26:23,000
But for now, we've seen how we send data and how we can recover it.

