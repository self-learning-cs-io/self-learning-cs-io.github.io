---
title: CS144 NetworkP957 1PhysicalandLinkPrinciples
---

1
00:00:00,000 --> 00:00:03,680
So in this video about the physical layer, I'm going to talk about two things.

2
00:00:03,680 --> 00:00:05,000
First, capacity.

3
00:00:05,000 --> 00:00:09,599
That is, how do we determine how many bits per second are given physical layer and support?

4
00:00:09,599 --> 00:00:10,599
And then modulation.

5
00:00:10,599 --> 00:00:14,560
How is it that you represent these bits on the medium itself?

6
00:00:14,560 --> 00:00:19,039
So it turns out that there's a theoretical limit on how much information a given channel

7
00:00:19,039 --> 00:00:20,039
can carry.

8
00:00:20,039 --> 00:00:25,199
Where this case, a channel means a medium in which you're putting your information.

9
00:00:25,199 --> 00:00:28,439
This channel could be say a wire or a wireless.

10
00:00:28,439 --> 00:00:31,640
It could be sound waves, whatever you want.

11
00:00:31,640 --> 00:00:36,019
I mean, just a term that's used to talk about the way in which the information is being

12
00:00:36,019 --> 00:00:37,019
communicated.

13
00:00:37,019 --> 00:00:43,079
And so this limit is called the Shannon limit, after Claude Shannon, who established it.

14
00:00:43,079 --> 00:00:48,519
And so that turns out that if you look at a given communication channel and under a certain

15
00:00:48,519 --> 00:00:52,000
set of assumptions, which often hold pretty well, there's a very good approximation,

16
00:00:52,000 --> 00:00:56,200
it gives you a good sense as to what's possible.

17
00:00:56,200 --> 00:01:03,079
The channel capacity, or the number of bits per second you can send over a given channel,

18
00:01:03,079 --> 00:01:08,280
is B, base two log, one plus the signal to noise ratio.

19
00:01:08,280 --> 00:01:11,000
Where B is the bandwidth of your communication.

20
00:01:11,000 --> 00:01:13,400
That is what's the range of frequencies you can use.

21
00:01:13,400 --> 00:01:20,039
This is assuming that we're doing things with, basically, sound subtle waves, et cetera.

22
00:01:20,040 --> 00:01:25,560
This is the signal strength, the how strong is the signal when it arrives at the receiver.

23
00:01:25,560 --> 00:01:27,040
And N is the noise.

24
00:01:27,040 --> 00:01:31,719
So any receiver is going to have some kind of noise in the same way that when you're listening,

25
00:01:31,719 --> 00:01:36,960
you might think you hear silence, but there are sounds that are too faint for you to hear.

26
00:01:36,960 --> 00:01:41,000
It's because those sounds are blow essentially the noise sensitivity of your ears.

27
00:01:41,000 --> 00:01:44,719
Or in the same way, if there's a white noise generator in the room, it can make it harder

28
00:01:44,719 --> 00:01:48,360
to hear things because there's this noise.

29
00:01:48,359 --> 00:01:53,280
And so all communication devices have noise.

30
00:01:53,280 --> 00:01:55,799
Often it's just due to thermal properties of the hardware.

31
00:01:55,799 --> 00:01:58,480
They're just stray electrons from thermal effects.

32
00:01:58,480 --> 00:02:00,159
And so that introduces some noise in the system.

33
00:02:00,159 --> 00:02:01,480
It's a big thing in your engineering them.

34
00:02:01,480 --> 00:02:04,599
How do you bring the noise down?

35
00:02:04,599 --> 00:02:10,199
And so what the basic point here is that the amount that we can send is proportional to

36
00:02:10,199 --> 00:02:15,400
the amount of bandwidth we have, like how large a chunk of frequencies can we use.

37
00:02:15,400 --> 00:02:17,800
And then the signal to noise ratio.

38
00:02:17,800 --> 00:02:22,200
Now if we wanted higher signal to noise ratio, it was just the signal divided by the noise.

39
00:02:22,200 --> 00:02:25,480
It requires either of lower noise that can be really expensive.

40
00:02:25,480 --> 00:02:28,360
It's harder to make hardware with lower noise.

41
00:02:28,360 --> 00:02:31,360
Or a stronger signal requires that the signal be louder.

42
00:02:31,360 --> 00:02:35,720
This is for example why when you have more bars on your phone, it goes faster because the

43
00:02:35,720 --> 00:02:41,520
signal to noise ratio of the data is faster because the signal to noise ratio is higher.

44
00:02:41,520 --> 00:02:45,120
And it turns out that building hardware for very high bandwidth, so signals that have a

45
00:02:45,120 --> 00:02:47,599
tremendous bandwidth, it's actually really hard.

46
00:02:47,599 --> 00:02:49,120
All these complications come into play.

47
00:02:49,120 --> 00:02:53,360
So it's not like you can just easily build a communication system with arbitrary channel

48
00:02:53,360 --> 00:02:54,360
capacity.

49
00:02:54,360 --> 00:02:57,319
There are always engineering things that come into play, which is why we don't suddenly

50
00:02:57,319 --> 00:03:03,360
see a terabit ethernet.

51
00:03:03,360 --> 00:03:06,319
But so fun moments when we're talking about the capacity of a channel, it's talking about

52
00:03:06,319 --> 00:03:08,520
bandwidth and signals noise.

53
00:03:08,520 --> 00:03:13,080
The way to think about this is in this how we generally represent signals is in terms of

54
00:03:13,080 --> 00:03:14,080
analog signals.

55
00:03:14,080 --> 00:03:18,280
So we think sinusoid.

56
00:03:18,280 --> 00:03:24,040
And so when we're talking about sinusoidal waves, here's a simple one here.

57
00:03:24,040 --> 00:03:25,560
There are a couple properties we care about.

58
00:03:25,560 --> 00:03:28,920
They're going to talk about in the rest of this and some future videos.

59
00:03:28,920 --> 00:03:31,000
The first is the amplitude of the wave.

60
00:03:31,000 --> 00:03:40,000
So this is, so the amplitude denotes the actual one way to think of it is that how loud

61
00:03:40,000 --> 00:03:44,000
it is, the signal strength, loudness.

62
00:03:44,000 --> 00:03:48,840
The signal strength.

63
00:03:48,840 --> 00:03:50,919
Second property is the wavelength.

64
00:03:50,919 --> 00:03:53,479
So how long is one of these waves?

65
00:03:53,479 --> 00:04:01,120
So the speed of light is approximately, so C, and in fact, it's approximately one foot

66
00:04:01,120 --> 00:04:03,319
per nanosecond.

67
00:04:03,319 --> 00:04:05,319
That's a good rough rule of thumb.

68
00:04:05,319 --> 00:04:16,399
So one billion feet per second.

69
00:04:16,399 --> 00:04:24,279
And so if, for example, I'm sending a signal whose wavelength is one foot, this would

70
00:04:24,279 --> 00:04:32,719
mean that it has a wavelength of one foot since the wave is traveling one billion feet

71
00:04:32,719 --> 00:04:33,719
per second.

72
00:04:33,720 --> 00:04:36,720
It means there must be one billion waves per second.

73
00:04:36,720 --> 00:04:40,680
Because this wave is traveling at a billion feet per second, the wavelength is a foot,

74
00:04:40,680 --> 00:04:43,840
unless the billion waves per second, this gives me the frequency.

75
00:04:43,840 --> 00:04:45,720
So how many waves do I expect a second?

76
00:04:45,720 --> 00:04:50,120
So one billion per second turns to be one gigahertz.

77
00:04:50,120 --> 00:04:57,160
So one gigahertz wave in, this is electromagnetic, this is light, just at lower frequencies,

78
00:04:57,160 --> 00:05:01,840
a one-foot, a one gigahertz signal has a wavelength of about a foot.

79
00:05:01,839 --> 00:05:09,359
So Wi-Fi today, for example, operates at 2.4 gigahertz or around five gigahertz.

80
00:05:09,359 --> 00:05:22,159
So these have wavelengths of approximately five inches and 2.4 inches.

81
00:05:22,159 --> 00:05:26,079
So here I'm talking about the frequency, the wavelength of a given wave, the amplitude

82
00:05:26,079 --> 00:05:27,079
of a given wave.

83
00:05:27,079 --> 00:05:30,399
But it turns out that we send signals, you don't use a single frequency, you actually use

84
00:05:30,399 --> 00:05:31,399
a range of frequencies.

85
00:05:31,759 --> 00:05:35,039
The bandwidth is the size of the frequency ranges that we use.

86
00:05:35,039 --> 00:05:41,439
For example, if you look at one Wi-Fi standard 802.11b, it's an older one, you use that as

87
00:05:41,439 --> 00:05:45,000
a common example because it's one of the simpler ones since it's older.

88
00:05:45,000 --> 00:05:49,879
In 802.11b, if you, those you have used it, you have to select a channel.

89
00:05:49,879 --> 00:05:53,759
So channels one through 11.

90
00:05:53,759 --> 00:05:58,319
Often people use one six and 11.

91
00:05:58,319 --> 00:06:03,360
Each of these channels is 20 megahertz wide.

92
00:06:03,360 --> 00:06:08,439
And so when you look at a frequency map for 802.11b, you can see that all these channels,

93
00:06:08,439 --> 00:06:14,959
and here's one, and here's 11, and they take up about 20 megahertz of the frequency range,

94
00:06:14,959 --> 00:06:18,959
like so.

95
00:06:18,959 --> 00:06:22,199
And so you actually use a range of frequencies, and I'll show you why this happens and how

96
00:06:22,199 --> 00:06:23,800
this happens.

97
00:06:23,800 --> 00:06:27,319
So finally, there's what we call phase.

98
00:06:27,319 --> 00:06:30,920
And so this is actually the timing of the waves within a wavelength.

99
00:06:30,920 --> 00:06:35,800
So here we have, here's a wave, which is at this particular phase where the peak is

100
00:06:35,800 --> 00:06:36,800
occurring here.

101
00:06:36,800 --> 00:06:39,279
So let's call this T0.

102
00:06:39,279 --> 00:06:48,560
It's of course possible to send this exact same wave, but at a different phase.

103
00:06:48,560 --> 00:06:54,240
For example, we could send it like this.

104
00:06:54,240 --> 00:07:03,639
It's the same wave, but its phase is off set by one half of the wavelength, and therefore

105
00:07:03,639 --> 00:07:05,639
180 degrees.

106
00:07:05,639 --> 00:07:09,920
So it turns out that things we do to control, as we'll see in a second, that we do to control

107
00:07:09,920 --> 00:07:14,160
waves, that we do to send signals involved changing the amplitude of waves, changing the frequency

108
00:07:14,160 --> 00:07:16,319
of waves, as well as changing the phase of these waves.

109
00:07:16,319 --> 00:07:20,480
But fundamentally, these waves are what's going on underneath in the system.

110
00:07:20,480 --> 00:07:24,160
So given that we're using waves, there's a whole bunch of waves we can represent bits.

111
00:07:24,160 --> 00:07:28,480
So in the simplest way, this is what we call amplitude shift keying, or ASK.

112
00:07:28,480 --> 00:07:30,640
And this process is called modulation.

113
00:07:30,640 --> 00:07:35,320
How do I take a signal, or take a particular bit of piece of data, and then modulate my

114
00:07:35,320 --> 00:07:38,000
waves to represent that signal?

115
00:07:38,000 --> 00:07:42,200
So here, to represent that data, how do I modulate the signal to represent the data?

116
00:07:42,200 --> 00:07:47,440
So here, for example, I have an amplitude shift keying where one has a small amplitude,

117
00:07:47,440 --> 00:07:50,480
I'm sorry, zero has a small amplitude, and one has a larger amplitude.

118
00:07:50,480 --> 00:07:51,720
So I want to send a zero.

119
00:07:51,720 --> 00:07:56,680
I send this smaller wave, and one has a smaller one, and one has a larger one.

120
00:07:56,680 --> 00:08:00,360
Another approach that you can use is called frequency shift keying, where you use two separate

121
00:08:00,360 --> 00:08:01,520
frequencies.

122
00:08:01,520 --> 00:08:03,280
And so here's a one, and here's a zero.

123
00:08:03,280 --> 00:08:07,040
The zero happens to be the higher frequency, the one is the lower frequency.

124
00:08:07,040 --> 00:08:10,920
And then as I want to send out a stream of zeroes and ones, I just move these frequencies

125
00:08:10,920 --> 00:08:11,920
back and forth.

126
00:08:11,920 --> 00:08:15,480
Oh, I'm sending one on one, so it's longer, longer, longer, than zero, zero, zero, zero,

127
00:08:15,480 --> 00:08:17,160
shorter, shorter, shorter, shorter.

128
00:08:17,160 --> 00:08:20,400
The other side can decode these and then figure out what bits are being sent.

129
00:08:20,399 --> 00:08:25,399
So amplitude shift keying turns out to be very, it's very commonly used, especially in

130
00:08:25,399 --> 00:08:26,399
wired networks.

131
00:08:26,399 --> 00:08:30,079
And the reason is that when you have a wire, your meeting is controlled, the signal you

132
00:08:30,079 --> 00:08:33,679
put on one side, it decreases a little bit on the other side, but not by very much.

133
00:08:33,679 --> 00:08:38,399
Wires do not have a lot of resistance, that's why they use them to carry power.

134
00:08:38,399 --> 00:08:42,639
And so amplitude shift keying is commonly used in wired systems, just because it's very

135
00:08:42,639 --> 00:08:44,879
simple, and it works great.

136
00:08:44,879 --> 00:08:49,480
So most common wired ethernet today uses amplitude shift keying.

137
00:08:49,480 --> 00:08:56,200
For example, 100 base T and 1000 base T, there's 100 megabit and gigabit ethernet, use what's

138
00:08:56,200 --> 00:09:01,039
called PAM5, which means five levels of amplitude modulation.

139
00:09:01,039 --> 00:09:06,080
It's called pulses, kyrsion, these pulses of these different amplitudes.

140
00:09:06,080 --> 00:09:12,200
So think of these basically as voltages minus two, minus one, zero, plus one, plus two.

141
00:09:12,200 --> 00:09:18,879
And so you're sending these different voltages along the wire.

142
00:09:18,879 --> 00:09:26,159
There's a 10 base T or 10 gigabit ethernet, more of the upcoming standard people are adopting.

143
00:09:26,159 --> 00:09:30,439
Needs to use more levels of amplitudes in order to get all of its data through it.

144
00:09:30,439 --> 00:09:36,639
So it uses PAM16, so 16 levels rather than five.

145
00:09:36,639 --> 00:09:41,919
So another form of modulation that's really popular is what's called phase shift keying.

146
00:09:41,919 --> 00:09:45,759
So unlike amplitude shift keying, you're adjusting the amps through the waves, or frequency shift

147
00:09:45,759 --> 00:09:47,240
keying, we're using different frequencies.

148
00:09:47,240 --> 00:09:50,399
With phase shift keying, you adjust the phase of the waves.

149
00:09:50,399 --> 00:09:56,159
So here, for example, let's say zero, this is a phase of zero degrees.

150
00:09:56,159 --> 00:09:59,000
But then to send a one, as you can see, my phase is reversed.

151
00:09:59,000 --> 00:10:03,120
This is a phase of 180 degrees, right, or minus 180 degrees.

152
00:10:03,120 --> 00:10:04,759
The two are the same.

153
00:10:04,759 --> 00:10:10,519
And then here to send a zero again, I start sending at a phase of zero degrees again.

154
00:10:10,519 --> 00:10:16,579
The phase shift keying is really useful when your channel, when your medium is such that

155
00:10:16,579 --> 00:10:19,600
you can have significant variations in signal strength.

156
00:10:19,600 --> 00:10:22,639
So amplitude shift keying needs to be able to figure out all the different amplitudes are.

157
00:10:22,639 --> 00:10:28,340
So when the actual attenuation with signal strength is stable, like in a wire that's great.

158
00:10:28,340 --> 00:10:32,199
But for example, in wireless situations, amplitude is a bit harder.

159
00:10:32,199 --> 00:10:34,360
Phase is much can be easier.

160
00:10:34,360 --> 00:10:38,679
So situations where phase shift keying is used are, I'd say, DSL digital subscriber lines,

161
00:10:38,679 --> 00:10:45,120
you'll get a long long phone lines where there could be weather and wire shaking and bad connections.

162
00:10:45,120 --> 00:10:49,799
But really long wires, cable modems, right, that are stretching out through an entire neighborhood.

163
00:10:49,799 --> 00:10:53,039
Wireless systems, these all use phase shift keying.

164
00:10:53,039 --> 00:10:59,319
I'm selling them also use amplitude, but they, unlike wire ethernet, all these systems use phase.

165
00:10:59,319 --> 00:11:04,000
And so one kind of phase shift keying is binary phase shift keying, or BPSK.

166
00:11:04,000 --> 00:11:09,840
And so you basically have two phases, zero, zero degrees, and pi are 180 degrees.

167
00:11:09,840 --> 00:11:22,679
And so like in that prior picture, you're either sending something at this phase, let's say that zero,

168
00:11:22,679 --> 00:11:26,799
or you're sending it at this phase, which is say 180 degrees.

169
00:11:26,799 --> 00:11:29,959
So this is 180 degrees, pi.

170
00:11:34,959 --> 00:11:37,879
This is zero, zero.

171
00:11:37,879 --> 00:11:44,719
So for example, BPSK is used in 802.11b and older Wi-Fi standard at low speeds, one megabit and two megabit per second.

172
00:11:46,879 --> 00:11:50,399
There's also a quadrature phase shift keying, keying, QPSK.

173
00:11:50,399 --> 00:11:52,039
We're now we have four phases.

174
00:11:52,039 --> 00:11:56,679
And as you can imagine, just as we have zero and 180 degrees with QPSK,

175
00:11:56,679 --> 00:12:05,079
we have zero, 90 degrees, 180 degrees, 270, or zero pi over two, pi, three pi over two, radians and computers respectively.

176
00:12:05,079 --> 00:12:09,120
So it turns out QPSK is also used in this older Wi-Fi standard AO2.11b.

177
00:12:09,120 --> 00:12:14,199
It's used at the higher speeds, 5.5 megabits per second and 11 megabits per second.

178
00:12:14,199 --> 00:12:21,839
Now one thing that should come out from this is that the reason why we might use QPSK versus BPSK or PAM16 rather than PAM5

179
00:12:21,839 --> 00:12:25,359
is that for a given signal we're sending, we can send more information.

180
00:12:25,360 --> 00:12:29,960
So for example, BPSK, each wave we send carries one bit of information.

181
00:12:29,960 --> 00:12:31,720
Is it zero or pi?

182
00:12:31,720 --> 00:12:35,800
In contrast for QPSK, each symbol that we send on the waves,

183
00:12:35,800 --> 00:12:39,720
each little chunk of data we're sending at the physical air contains two bits.

184
00:12:39,720 --> 00:12:43,440
Is it zero, pi over two, pi, or three pi over two?

185
00:12:43,440 --> 00:12:48,080
You could say represent those as zero, zero, one, one, one, one.

186
00:12:48,080 --> 00:12:52,840
That's not actually how it's done, but the idea is you can actually, by having these denser representations,

187
00:12:52,840 --> 00:12:55,320
you're sending more information per unit time.

188
00:12:55,360 --> 00:12:59,960
Now one reason why phase shift king is where popters actually turns out it's very easy to shift phase.

189
00:12:59,960 --> 00:13:05,120
So for example, here if I just have a carrier wave at say zero degrees,

190
00:13:05,120 --> 00:13:08,640
and another carrier wave, you know, minus 90 degrees,

191
00:13:08,640 --> 00:13:13,000
then any linear combination of these two allows me to create any intermediate frequency.

192
00:13:13,000 --> 00:13:18,120
So for example, here if I combine zero degrees with minus 90 degrees, just add these two waves up,

193
00:13:18,120 --> 00:13:20,760
I'll get something at minus 45 degrees.

194
00:13:20,760 --> 00:13:24,520
That's if it's a, you know, sort of one to one equality.

195
00:13:24,519 --> 00:13:31,039
If, for example, instead I did 0.5, one, then we'd have something a little closer to,

196
00:13:31,039 --> 00:13:33,919
uh, to the zero degrees, right?

197
00:13:33,919 --> 00:13:37,519
Assuming that this is the minus 90 degrees, and this is the zero degrees.

198
00:13:37,519 --> 00:13:45,039
Similarly, if I did, uh, rather than one one, if I did minus one one, so this is minus 90 degrees,

199
00:13:45,039 --> 00:13:50,840
this is zero degrees, then what we'd see is rather than a wave between these two,

200
00:13:51,120 --> 00:13:53,120
the wave would be,

201
00:13:57,040 --> 00:13:59,399
the wave would be here, right?

202
00:13:59,399 --> 00:14:03,560
It would be at plus 45 degrees with this setting.

203
00:14:03,560 --> 00:14:07,200
And so just for these two things, you can combine and create any intermediate frequency you want,

204
00:14:07,200 --> 00:14:09,160
which turns to be really useful in hardware.

205
00:14:09,160 --> 00:14:13,440
And in fact, that's exactly how hardware does it, using something called IQ modulation.

206
00:14:13,440 --> 00:14:16,400
Uh, so I means the in phase component, so at zero degrees,

207
00:14:16,400 --> 00:14:18,680
Q is the quadratriter component and minus 90 degrees,

208
00:14:18,679 --> 00:14:25,959
there's just a complex way of saying, hey, if we want to create any, any, uh, phase between zero and,

209
00:14:25,959 --> 00:14:30,559
you know, say 300, you know, zero and basically minus zero wrapping around, um,

210
00:14:30,559 --> 00:14:35,519
we can just combine these two I and Q with some linear factor and get that.

211
00:14:35,519 --> 00:14:38,599
Um, so for example, let's look at those two,

212
00:14:38,599 --> 00:14:41,519
there's two things we had of BPS, PK and QPSK.

213
00:14:41,519 --> 00:14:45,799
So BPSK has two phases, zero and 180 degrees.

214
00:14:45,799 --> 00:14:47,799
What are the IQ values of those?

215
00:14:49,079 --> 00:14:55,599
Well, so for zero degrees, it's going to be 1, zero, right?

216
00:14:55,599 --> 00:14:58,079
We want fully at zero degrees.

217
00:14:58,079 --> 00:15:03,319
For 180 degrees, well, that's the opposite of zero, right?

218
00:15:03,319 --> 00:15:08,879
It's if you were to think about it, you know, on the unit circle, say, here's zero,

219
00:15:08,879 --> 00:15:11,000
here's 180 degrees.

220
00:15:11,000 --> 00:15:14,079
So just as here we had plus one, here we're going to have minus one.

221
00:15:14,079 --> 00:15:17,439
So minus one, zero.

222
00:15:17,440 --> 00:15:19,720
For QPSK, we're going to have four phases.

223
00:15:19,720 --> 00:15:22,520
Let's say zero, two, seventy, one, 80 and 90.

224
00:15:22,520 --> 00:15:26,160
So again, zero is going to be one comma zero.

225
00:15:26,160 --> 00:15:31,360
But now 270, right, 270 is down here, right?

226
00:15:31,360 --> 00:15:34,560
So here's minus 90 slash 270.

227
00:15:34,560 --> 00:15:35,560
Right?

228
00:15:35,560 --> 00:15:39,760
So 270 is going to be zero comma one.

229
00:15:39,760 --> 00:15:45,000
180 is going to be just like in BPSK, minus one comma zero.

230
00:15:45,000 --> 00:15:50,840
And 90 is going to be zero comma minus one.

231
00:15:50,840 --> 00:15:57,240
And so we can just by changing the scaling factors of the i and Q, create any phase we

232
00:15:57,240 --> 00:15:58,240
want of a signal.

233
00:15:58,240 --> 00:16:01,840
That's exactly what it looks like in hardware, is that we have these IQ values coming in,

234
00:16:01,840 --> 00:16:06,200
these digital values, then we have these two carrier frequencies, and we end up adding

235
00:16:06,200 --> 00:16:09,919
them up to come out on the R. Since then what comes out of the antenna.

236
00:16:09,919 --> 00:16:14,200
So it's actually how you build a hardware with these IQ, these IQ values.

237
00:16:14,200 --> 00:16:17,560
But what's really valuable, and the reason why I'm going into them about IQ constellations

238
00:16:17,560 --> 00:16:22,960
is that they actually lend themselves to a really, really simple and easy to understand

239
00:16:22,960 --> 00:16:27,560
graphical representation of what's going on down in the physical layer.

240
00:16:27,560 --> 00:16:31,000
And so the way I think this, if we take these IQ values and we just represent them on a 2D

241
00:16:31,000 --> 00:16:36,080
grid, right, we can use what's called an IQ constellation, this 2D plot.

242
00:16:36,080 --> 00:16:41,879
In this case, in these 2D plots, the angle of your vector represents the phase of the

243
00:16:41,879 --> 00:16:49,000
signal, right, like here say we have 45 degrees, right, here we have 135 degrees, and then

244
00:16:49,000 --> 00:16:52,679
the length of this vector represents the amplitude of the signal.

245
00:16:52,679 --> 00:16:56,600
So if we look at something like on-off-king where you either send something or it's silent,

246
00:16:56,600 --> 00:17:00,840
we see here's an amplitude of 1, amplitude of 0, there's more on-off-king, right, there's

247
00:17:00,840 --> 00:17:02,919
no change in the phase.

248
00:17:02,919 --> 00:17:06,839
Amplitude shift-king where we have two different amplitudes to use, see here's a 1, and

249
00:17:06,839 --> 00:17:09,119
here's a 0, we're just changing the amplitudes.

250
00:17:09,119 --> 00:17:13,679
We're not actually changing the phase, we're just changing the value of i.

251
00:17:13,679 --> 00:17:18,919
BPSK, remember there are two phases, 0 and 180, and so that's what we see here.

252
00:17:18,919 --> 00:17:26,159
So here is 180 to say represent the 1, and here is 0, say to represent the 0.

253
00:17:26,159 --> 00:17:32,159
QPSK also has four points, with these four different phases, I could have also rotated

254
00:17:32,159 --> 00:17:36,559
them and say drawn them like this, but still easier to see them when they're these four

255
00:17:36,559 --> 00:17:38,599
corners like this.

256
00:17:38,599 --> 00:17:43,199
So this is a way to represent what the wireless signals is, it's this nice pictorial representation,

257
00:17:43,199 --> 00:17:47,240
where we start talking about signal and noise, and those ratios, things will start to make

258
00:17:47,240 --> 00:17:51,399
a little more sense, it'll be a really clear depiction of what's happening.

259
00:17:51,399 --> 00:17:57,279
And so just recall, we can represent any intermediate phase from this 0 and minus 90, there's

260
00:17:57,279 --> 00:17:59,439
just some linear combination of those two.

261
00:17:59,439 --> 00:18:04,379
Now at some point, at the link layer, we have bits, bits are coming in, we have some

262
00:18:04,380 --> 00:18:08,820
packet, from the network layer, and we have some frame at the link layer with some bits,

263
00:18:08,820 --> 00:18:14,180
and 0, 1, 1, 0, 0, 1, 1, 1, organized into bytes and doctats, however.

264
00:18:14,180 --> 00:18:19,300
But now at the physical error, we don't necessarily can't necessarily transmit a whole byte.

265
00:18:19,300 --> 00:18:23,180
It might be that we can only transmit a couple bits at a time.

266
00:18:23,180 --> 00:18:25,420
And so in the physical error, we talk about symbols.

267
00:18:25,420 --> 00:18:31,900
And the symbol is the unit of transfer, the physical error can provide.

268
00:18:31,900 --> 00:18:35,880
And often we talk about things at the link layer, we talk about, oh, we add a byte, but

269
00:18:35,880 --> 00:18:38,820
that might not be the boundary down at the physical error.

270
00:18:38,820 --> 00:18:42,420
The reason is, as I talked about before, a symbol can contain more than one bit.

271
00:18:42,420 --> 00:18:45,940
So BPSK has one bit per symbol, there's two phases.

272
00:18:45,940 --> 00:18:50,259
QPSK has four phases, has two bits per symbol.

273
00:18:50,259 --> 00:18:56,019
But then you also get situations like, like, PAM5 that's used in 100 megabit and 1 gigabit

274
00:18:56,019 --> 00:18:59,300
ethernet on a cat5 cable, where there's these five voltage levels.

275
00:18:59,299 --> 00:19:03,419
There are five different symbols that you can use.

276
00:19:03,419 --> 00:19:08,099
And that doesn't necessarily even map perfectly to a number of bits, right?

277
00:19:08,099 --> 00:19:12,619
Five symbols is just over two bits.

278
00:19:12,619 --> 00:19:16,379
It's that's important to realize that although up at the link layer even passed down to the

279
00:19:16,379 --> 00:19:20,980
physical area of a sequence of bits, there's this transformation that occurs, turning that sequence

280
00:19:20,980 --> 00:19:29,139
of bits into a sequence of symbols down at the physical layer.

281
00:19:29,140 --> 00:19:36,340
So finally, I talked about amplitude king, I've talked about phase king.

282
00:19:36,340 --> 00:19:38,340
There's this approach you use today.

283
00:19:38,340 --> 00:19:39,340
It's very, very common.

284
00:19:39,340 --> 00:19:44,880
You see it almost all modern communication systems called QUAM, which really stands for

285
00:19:44,880 --> 00:19:46,660
quadrature amplitude modulation.

286
00:19:46,660 --> 00:19:57,540
Basically this means phase and amplitude king at the same time.

287
00:19:57,539 --> 00:20:02,019
And so whereas ASK, amplitude shift king is only the amplitude and phase shift king is

288
00:20:02,019 --> 00:20:05,940
only the phase and QUAM we use both.

289
00:20:05,940 --> 00:20:09,940
So to give you an example, the way this is usually talked about, say 16 QUAM means that

290
00:20:09,940 --> 00:20:11,859
we have 16 different symbols.

291
00:20:11,859 --> 00:20:14,899
And so we can represent free symbol, we can represent four bits.

292
00:20:14,899 --> 00:20:17,819
256 QUAM means there's 256 different symbols.

293
00:20:17,819 --> 00:20:21,740
And so we can represent for each symbol, we can represent eight bits.

294
00:20:21,740 --> 00:20:27,460
And so returning to the IQ plot, we're a modulation plot, here's what 16 QUAM looks like.

295
00:20:27,460 --> 00:20:34,460
So this is the constellation, the IQ constellation used in a just PDA, which is a 3G data standard.

296
00:20:34,460 --> 00:20:39,100
And so you can see there are these values from 3, 3 to minus 3, minus 3.

297
00:20:39,100 --> 00:20:41,660
And they map to different bits.

298
00:20:41,660 --> 00:20:45,620
And so here I've shown in gray the I and Q values.

299
00:20:45,620 --> 00:20:52,380
So here's an IF3, a Q of 1, IF3, Q of 3, IF-1, Q of 1, sorry.

300
00:20:52,380 --> 00:20:56,700
And then what the represented bits are above the physical layer.

301
00:20:56,700 --> 00:21:00,500
And so here's an example IQ constellation for 16 QUAM.

302
00:21:00,500 --> 00:21:06,580
As we can see, it's adjusting not only the amplitude, that is the length of the vector

303
00:21:06,580 --> 00:21:13,140
coming out of the origin, but also the phase, which is the orientation of the vector coming

304
00:21:13,140 --> 00:21:15,180
out of the origin.

305
00:21:15,180 --> 00:21:21,500
Here's an example IQ constellation used in modern 3G systems, 16 QUAM, 16 different

306
00:21:21,500 --> 00:21:22,500
symbols.

307
00:21:22,500 --> 00:21:25,259
And here's how bits map to these symbols.

308
00:21:25,259 --> 00:21:36,819
So for example, if I wanted to send a 1, 0, 1, 1, 1, 0, 1, I would send 1, 0, 1, 1,

309
00:21:36,819 --> 00:21:37,819
1.

310
00:21:37,819 --> 00:21:39,380
So it's send this first.

311
00:21:39,380 --> 00:21:45,660
This would be the first symbol that I send, number 1.

312
00:21:45,660 --> 00:21:54,700
And 1, 0, 0, 1, I would send this symbol, second.

313
00:21:54,700 --> 00:21:58,019
And so if we're to go down and dig into and see what's happening down in the physical

314
00:21:58,019 --> 00:22:07,420
layer, we're going to see a signal transmitted with a phase of what's essentially 135 degrees,

315
00:22:07,420 --> 00:22:08,420
right?

316
00:22:08,420 --> 00:22:10,700
This is 135 degrees.

317
00:22:10,700 --> 00:22:14,259
And an amplitude, let's say, of x.

318
00:22:14,259 --> 00:22:22,819
And the next symbol is going to be with this angle, with this phase, which is approximately,

319
00:22:22,819 --> 00:22:26,339
let's say 105 degrees.

320
00:22:26,339 --> 00:22:30,099
And it's slightly smaller amplitude, because this vector is longer.

321
00:22:30,099 --> 00:22:35,819
And so that's what you actually see in terms of the ways in the physical layer.

322
00:22:35,819 --> 00:22:36,819
So what's used today?

323
00:22:36,819 --> 00:22:40,819
Well, as amplitude shift king, it's basically all a wider than it uses the amplitude

324
00:22:40,819 --> 00:22:41,819
shift king.

325
00:22:42,700 --> 00:22:45,939
It's very rare for communication systems to use frequency shift king.

326
00:22:45,939 --> 00:22:49,379
There are some examples like the National Weather Services Weather Radio and Bluetooth

327
00:22:49,379 --> 00:22:53,299
actually uses it in some forms.

328
00:22:53,299 --> 00:22:58,539
Binary phase shift king is used basically by all the Wi-Fi standards, ABGM.

329
00:22:58,539 --> 00:23:01,179
It's also used in Wi-Max.

330
00:23:01,179 --> 00:23:03,740
Quadrature phase shift king is used in Wi-Fi.

331
00:23:03,740 --> 00:23:07,419
There's low power wireless, like ZigBee called 8254.

332
00:23:07,419 --> 00:23:10,179
3G, LTE, Wi-Max.

333
00:23:10,180 --> 00:23:16,100
16 quam is used in Wi-Fi as well as these data standards for cellular phones, for mobile

334
00:23:16,100 --> 00:23:17,860
phones, mobile telephony.

335
00:23:17,860 --> 00:23:21,500
64 quam is used in Wi-Fi as well as LTE and Wi-Max.

336
00:23:21,500 --> 00:23:28,140
And so you can see that there are these, the older, that the more modern standards, the

337
00:23:28,140 --> 00:23:31,740
one that are using the denser constellations, people who made things go faster and faster.

338
00:23:31,740 --> 00:23:33,299
So there's an overview.

339
00:23:33,299 --> 00:23:38,460
There are many different ways that you can take your bits and then represent them in terms

340
00:23:38,460 --> 00:23:44,660
of a physical medium, convert them into voltages, phases, frequencies, etc.

341
00:23:44,660 --> 00:23:49,019
Wired Ethernet and wired systems often use amplitude to represent signals.

342
00:23:49,019 --> 00:23:56,380
Whereas most technologies today, wireless technologies or things that are over less control

343
00:23:56,380 --> 00:24:01,940
of media like cable modems, DSL, use phase shift king or a combination phase in amplitude

344
00:24:01,940 --> 00:24:05,660
called quam, quadrature amplitude modulation.

345
00:24:05,660 --> 00:24:09,259
One of the key things that you can represent at quam symbol, in fact any of these, as a

346
00:24:09,259 --> 00:24:12,019
linear combination of two things.

347
00:24:12,019 --> 00:24:17,540
The in-phase component i at zero degrees and the quadrature component q at minus 90 degrees.

348
00:24:17,540 --> 00:24:20,180
This is actually how circuits do it today.

349
00:24:20,180 --> 00:24:27,500
And what's really nice is that it gives you a very good pictorial representation of what

350
00:24:27,500 --> 00:24:31,420
the signal looks like and how it's controlled and how it's modulated and how those

351
00:24:31,420 --> 00:24:32,100
map to bits.

