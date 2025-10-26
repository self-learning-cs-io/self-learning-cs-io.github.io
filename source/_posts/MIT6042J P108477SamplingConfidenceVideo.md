---
title: MIT6042J P108477SamplingConfidenceVideo
---

1
00:00:00,000 --> 00:00:06,600
Now let's work out an example that shows how to use the pairwise independent sampling theorem

2
00:00:06,600 --> 00:00:10,240
to actually do some sampling and estimation.

3
00:00:10,240 --> 00:00:20,160
So let's remember that our basic theorem says that if we have n independent random variables,

4
00:00:20,160 --> 00:00:23,760
pairwise independent with the same mean and variance.

5
00:00:23,760 --> 00:00:28,560
And we look at their average, the probability that their average differs from the mean by

6
00:00:28,559 --> 00:00:35,839
more than a given tolerance delta is less than or equal to this formula here, which is

7
00:00:35,839 --> 00:00:40,039
the standard deviation over delta squared times 1 over n.

8
00:00:40,039 --> 00:00:43,840
Now we're just going to be plugging into this formula, but I want to state it here for

9
00:00:43,840 --> 00:00:47,119
the record to remember that this is the pairwise independent sampling theorem that we're

10
00:00:47,119 --> 00:00:54,159
given, which is what we've seen in general allows us to calculate the degree of confidence

11
00:00:54,159 --> 00:01:00,879
we can have, the probability that we have given n or the n that we need given how confident

12
00:01:00,879 --> 00:01:02,679
we want to be.

13
00:01:02,679 --> 00:01:04,840
So let's go ahead and do the example.

14
00:01:04,840 --> 00:01:08,959
And what I want to think about is the possibility of swimming in the Charles.

15
00:01:08,959 --> 00:01:15,719
The Charles has a caliform count califormer, some rather undesirable bacteria that are associated

16
00:01:15,719 --> 00:01:18,640
with fecal matter.

17
00:01:18,640 --> 00:01:22,359
And we want to know whether it's safe to swim in the Charles.

18
00:01:22,359 --> 00:01:27,920
It's a petri dish showing a kind of sample of bacteria that you might grow, culture to see

19
00:01:27,920 --> 00:01:29,159
what's going on.

20
00:01:29,159 --> 00:01:34,480
The environmental protection agency requires that the average CMD, the caliform microbial

21
00:01:34,480 --> 00:01:40,319
density on the dish, is less than 200.

22
00:01:40,319 --> 00:01:47,439
And what we want to do is figure out whether when we do a sample of CMDs around the river

23
00:01:47,439 --> 00:01:53,920
and we get some numbers out, whether in fact we will conclude that the caliform, that the

24
00:01:53,920 --> 00:01:55,879
average CMD is less than 200.

25
00:01:55,879 --> 00:01:57,920
We need to convince the EPA of that.

26
00:01:57,920 --> 00:02:00,200
Now we're never going to be certain.

27
00:02:00,200 --> 00:02:05,959
But what we're going to do is take 32 measurements at random times the locations around the river.

28
00:02:05,959 --> 00:02:10,000
And we're going to collect these 32 measurements of CMD.

29
00:02:10,000 --> 00:02:17,319
And it's going to turn out that although a few of them are over 200, the average is

30
00:02:17,319 --> 00:02:18,319
well under 200.

31
00:02:18,319 --> 00:02:23,079
The average of the 32 samples that we've taken is 180.

32
00:02:23,079 --> 00:02:30,479
And our task now is to convince the environmental protection agency that on the basis of our data,

33
00:02:30,479 --> 00:02:34,159
that the average in the whole river is really less than 200.

34
00:02:34,159 --> 00:02:38,599
Even though there were a couple of places it was over 100, but on average it was 180.

35
00:02:38,599 --> 00:02:44,879
Can we convince the EPA that the actual average is less than 200?

36
00:02:44,879 --> 00:02:49,780
And so we're trying to convince them that our estimate based on the sample is within

37
00:02:49,780 --> 00:02:52,599
20 of the actual average.

38
00:02:52,599 --> 00:02:54,120
We got 180.

39
00:02:54,120 --> 00:03:01,759
So if our estimate is when 20 of the truth, then in fact the average is less than 200.

40
00:03:01,759 --> 00:03:03,759
Well, how are we going to do that?

41
00:03:03,759 --> 00:03:08,560
Well, let's look at the parameters in the pairwise independent sampling theorem and see

42
00:03:08,560 --> 00:03:09,560
what we have.

43
00:03:09,560 --> 00:03:12,960
So C is the actual average CMD in the river.

44
00:03:12,960 --> 00:03:14,359
That's what we don't know.

45
00:03:14,360 --> 00:03:17,360
We're trying to estimate it.

46
00:03:17,360 --> 00:03:21,440
So our samples correspond to a random variable.

47
00:03:21,440 --> 00:03:25,880
We're taking a measurement of the CMD at a random time and place.

48
00:03:25,880 --> 00:03:31,560
And that defines a random variable whose expectation is the unknown city.

49
00:03:31,560 --> 00:03:36,600
So we've defined by our sampling process a random variable with mean mu.

50
00:03:36,600 --> 00:03:39,400
In fact, we've done it with 32 variables.

51
00:03:39,400 --> 00:03:46,960
So n samples mean n mutually independent random variables all with mean equal to the number

52
00:03:46,960 --> 00:03:49,159
that I'm trying to estimate.

53
00:03:49,159 --> 00:03:53,080
And an is the average of the n CMD samples.

54
00:03:53,080 --> 00:03:57,719
So we have an a32 that we're trying to understand.

55
00:03:57,719 --> 00:04:00,159
So here's the independent sampling theorem formula.

56
00:04:00,159 --> 00:04:01,560
And let's see what I know already.

57
00:04:01,560 --> 00:04:03,599
I'm going to plug in the knowns.

58
00:04:03,599 --> 00:04:05,879
What I know is that n is 32.

59
00:04:05,879 --> 00:04:09,479
mu is the unknown C that we're trying to estimate.

60
00:04:09,479 --> 00:04:16,800
And the delta that it matters to us is 20 because we want to argue that if our average of 180,

61
00:04:16,800 --> 00:04:23,000
our measurement of 180 was within 20 of the truth, then in fact, we're under the 200 that

62
00:04:23,000 --> 00:04:25,360
the EPA specifies.

63
00:04:25,360 --> 00:04:34,040
So let's plug in our known parameters, 32 for n and 20 for the tolerance.

64
00:04:34,040 --> 00:04:35,879
And they plug in here.

65
00:04:35,879 --> 00:04:41,920
And that leaves me with the standard deviation, which the formula requires.

66
00:04:41,920 --> 00:04:42,920
And I have to plug in.

67
00:04:42,920 --> 00:04:48,480
And that is a problem because we don't know what the standard deviation is.

68
00:04:48,480 --> 00:04:53,560
Now sometimes you can kind of argue that you can figure out what the standard deviation

69
00:04:53,560 --> 00:04:58,240
is because you have a theory of what the random distribution is of these measurements.

70
00:04:58,240 --> 00:05:03,960
And therefore, you can calculate what its standard deviation should be.

71
00:05:03,959 --> 00:05:08,839
Other times you can actually take a sample of the deviation of your sample.

72
00:05:08,839 --> 00:05:13,560
And use that as an estimate of the sample of the actual standard deviation.

73
00:05:13,560 --> 00:05:16,680
But that's kind of circular and we're not going to go there.

74
00:05:16,680 --> 00:05:23,159
But another way to do it is to say that if you had some bounds on the maximum possible

75
00:05:23,159 --> 00:05:28,199
discrepancy of your measurements, if you had done these kinds of sampling testings of

76
00:05:28,199 --> 00:05:35,159
CMDs for a long time, and you had never observed two that were more than 50 apart, then what

77
00:05:35,159 --> 00:05:43,120
you could argue is that the range of measurements is going to be only 50.

78
00:05:43,120 --> 00:05:48,240
So what we can do is if we say that L is the maximum possible difference that will ever

79
00:05:48,240 --> 00:05:55,919
measure among samples, then in fact, what you can say is that the worst possible standard

80
00:05:55,920 --> 00:06:02,560
deviation when your random variable is ranging over an interval L is L over 2.

81
00:06:02,560 --> 00:06:05,360
And you can check that algebraically.

82
00:06:05,360 --> 00:06:07,240
But for now, let's just take that as a fact.

83
00:06:07,240 --> 00:06:12,360
If you know that when your measurements are going to differ by at most L between max and

84
00:06:12,360 --> 00:06:16,439
min, the standard deviation can't be more than L over 2.

85
00:06:16,439 --> 00:06:21,920
And if we know that L is 50, then I got a number finally to plug in because now I can plug

86
00:06:21,920 --> 00:06:23,759
in 25 for sigma.

87
00:06:23,759 --> 00:06:25,159
So let's do that.

88
00:06:25,159 --> 00:06:32,519
And when I do that, I come out with this calculation that says that the probability that my average minus

89
00:06:32,519 --> 00:06:41,360
C was greater than 20, that my 1A32, which we said was 180, was more than 20 away from

90
00:06:41,360 --> 00:06:46,079
the truth is less than .05.

91
00:06:46,079 --> 00:06:53,000
Or flipping it around, the probability that my average is within 20 of the truth is greater

92
00:06:53,000 --> 00:06:55,959
than .095.

93
00:06:55,959 --> 00:07:03,199
And so we would like to be able to say now that the probability that the unknown C is the

94
00:07:03,199 --> 00:07:08,040
180 that we measured for A32 plus or minus 20 is at least 95%.

95
00:07:08,040 --> 00:07:10,319
That seems to be what the theorem told us.

96
00:07:10,319 --> 00:07:15,560
Let's go back to the theorem says that the probability that A32, which we measured to be 180 minus

97
00:07:15,560 --> 00:07:20,000
C is less than or equal to 20, is greater than 0.95.

98
00:07:20,000 --> 00:07:27,759
So we should go back and tell the EPA that the probability is that C is less than 200

99
00:07:27,759 --> 00:07:30,000
with probability 0.95.

100
00:07:30,000 --> 00:07:32,360
And we'd be pretty tempted to say that.

101
00:07:32,360 --> 00:07:33,680
But it's not right.

102
00:07:33,680 --> 00:07:36,360
It's technically the wrong thing to say.

103
00:07:36,360 --> 00:07:37,560
And why is that?

104
00:07:37,560 --> 00:07:44,680
Well, it's an important idea, which is that we're talking about something other than probability

105
00:07:44,680 --> 00:07:45,680
here.

106
00:07:45,680 --> 00:07:48,079
We're talking about confidence, not probability.

107
00:07:48,079 --> 00:07:50,079
And let's explain that a little bit more.

108
00:07:50,079 --> 00:07:51,599
Here's the issue.

109
00:07:51,599 --> 00:07:54,719
The number C is a number in the real world.

110
00:07:54,719 --> 00:08:00,399
It's an actual physical quantity, which is the average CMD in the river.

111
00:08:00,399 --> 00:08:04,279
We don't know what it is, but that does not make it a random variable.

112
00:08:04,279 --> 00:08:09,519
It is or it isn't within less than 200 or more than 200 and so on.

113
00:08:09,519 --> 00:08:17,519
What's going on is that we have created a probabilistic model of sampling that is

114
00:08:17,519 --> 00:08:23,279
designed to have in our probabilistic model this unknown constant.

115
00:08:23,279 --> 00:08:26,719
There's nothing probabilistic about the constant.

116
00:08:26,719 --> 00:08:33,519
We've introduced the probability by thinking of our random sampling as random variables.

117
00:08:33,519 --> 00:08:34,840
We control the randomness.

118
00:08:34,840 --> 00:08:36,720
We can't say that C is random.

119
00:08:36,720 --> 00:08:38,079
Our measurements are random.

120
00:08:38,079 --> 00:08:44,799
So the right thing we can say is that the possible outcomes of our sampling process can

121
00:08:44,799 --> 00:08:48,159
be persuasively modeled as a random variable.

122
00:08:48,159 --> 00:08:53,199
So what we can say is that the probability that our sampling process will yield an average

123
00:08:53,199 --> 00:08:58,519
that's within 20 of the true average is at least 0.95.

124
00:08:58,519 --> 00:08:59,919
So that's a funny thing to say.

125
00:08:59,919 --> 00:09:06,120
What you do is you go and tell the EPA, it says, look, we don't know what the real average

126
00:09:06,120 --> 00:09:07,120
is.

127
00:09:07,120 --> 00:09:13,319
But we have a process that gets the right answer 95% of the time to within plus or minus

128
00:09:13,320 --> 00:09:20,840
20 and we measured it and our process that we is right 95% of the time came in with an

129
00:09:20,840 --> 00:09:24,520
answer that said it's less than 200.

130
00:09:24,520 --> 00:09:25,520
OK.

131
00:09:25,520 --> 00:09:27,840
Now that's the right thing to say.

132
00:09:27,840 --> 00:09:29,040
That's the truth.

133
00:09:29,040 --> 00:09:34,640
We're making a probabilistic statement about our, the general properties of our sampling

134
00:09:34,640 --> 00:09:38,720
process and saying, OK, our sampling process is usually right.

135
00:09:38,720 --> 00:09:41,920
The sampling process said less than 200.

136
00:09:41,920 --> 00:09:43,759
So we think that that's probably right.

137
00:09:43,759 --> 00:09:47,480
But we can't say it is right and we can't even say it's right with any probability.

138
00:09:47,480 --> 00:09:53,600
It's just the way that our mostly reliable process yielded an answer.

139
00:09:53,600 --> 00:09:56,960
And that's an important idea to distinguish.

140
00:09:56,960 --> 00:10:05,240
So it's our estimate that's correct with probability 0.95.

141
00:10:05,240 --> 00:10:10,919
Now this is a long thing to say to the EPA and what we'd like to go back is language

142
00:10:10,919 --> 00:10:20,159
that says that we think that the real average C is within 20 of 180 is probably within 20

143
00:10:20,159 --> 00:10:23,200
of 180 because that's what our tests seem to say.

144
00:10:23,200 --> 00:10:26,840
But we're not allowed to talk about the probability that C has some value or other.

145
00:10:26,840 --> 00:10:32,240
So instead we summarize the story about how we measured C using a probabilistic process

146
00:10:32,240 --> 00:10:41,240
that's right 95% of the time by saying that C is 180 plus or minus 20 at the 95% confidence

147
00:10:41,240 --> 00:10:42,960
level.

148
00:10:42,960 --> 00:10:47,879
And that is the, that's a shorthand way of saying we've got this process that we believe

149
00:10:47,879 --> 00:10:54,360
in that measured this unknown quantity and told us what it was.

150
00:10:54,360 --> 00:10:59,200
So the moral here that we'll wrap up this little video with is that when you're told

151
00:10:59,200 --> 00:11:04,320
that some fact holds at a high confidence level because of some tester or some random

152
00:11:04,320 --> 00:11:10,759
experiment or some polar poster, you have to remember that is that what that implies is

153
00:11:10,759 --> 00:11:19,040
that somebody designed a random experiment to try to get an estimate of reality.

154
00:11:19,040 --> 00:11:23,360
And you can always question whether you believe in that random experiment.

155
00:11:23,360 --> 00:11:27,000
It's important to understand that there is some random experiment back there and you

156
00:11:27,000 --> 00:11:31,720
should be wondering about what is it and do I believe in it.

157
00:11:31,720 --> 00:11:37,159
And even more important question to ask is why are you hearing about this particular

158
00:11:37,159 --> 00:11:38,639
experiment?

159
00:11:38,639 --> 00:11:41,960
How many other experiments were tried and not reported?

160
00:11:41,960 --> 00:11:49,360
The point is that people can perform various kinds of tests and at the 95% or higher confidence

161
00:11:49,360 --> 00:11:50,360
level.

162
00:11:50,360 --> 00:11:54,720
But when the tests don't come up with an interesting result, they don't bother to publish

163
00:11:54,879 --> 00:11:56,279
them or announce them.

164
00:11:56,279 --> 00:12:00,759
And of course when they come up with a surprising result which is going to be wrong one at a

165
00:12:00,759 --> 00:12:06,560
20 times, those are the results that they publish and submit and advertise because they sound

166
00:12:06,560 --> 00:12:07,560
good.

167
00:12:07,560 --> 00:12:15,040
In fact, the major drug company, Blackshoe Smith Klein, after paying $3 billion as a judgment

168
00:12:15,040 --> 00:12:20,320
against them in 2012 for suppressing the results, negative results of clinical trials, just

169
00:12:20,320 --> 00:12:26,000
agreed to now make public in February 2013, all of the clinical trials that they perform

170
00:12:26,000 --> 00:12:30,440
so that you're not just learning about the cherry-peck positive results but about the negative

171
00:12:30,440 --> 00:12:32,200
ones as well.

172
00:12:32,200 --> 00:12:43,560
And in fact, get this point home.

173
00:12:43,560 --> 00:12:49,960
You might want to look at the cartoon at XKCD, which explains how it is that there's a problem

174
00:12:49,960 --> 00:12:54,160
with green jelly beans at the 95% confidence level.

