---
title: MIT6042J P95444RandomVariablesUniformBinomialVideo
---

1
00:00:00,000 --> 00:00:03,480
Certain kinds of random variables keep coming up.

2
00:00:03,480 --> 00:00:05,639
So let's look at two basic examples now,

3
00:00:05,639 --> 00:00:12,640
namely uniform random variables and binomial random variables.

4
00:00:12,640 --> 00:00:15,480
Let's begin with uniform because we've seen those already.

5
00:00:15,480 --> 00:00:18,600
So a uniform random variable means that all the values

6
00:00:18,600 --> 00:00:21,519
that it takes, it takes with equal probability.

7
00:00:21,519 --> 00:00:24,920
So the threshold variable z took all the values

8
00:00:24,920 --> 00:00:28,679
from 0 to 6 inclusive, each with probability 1, 7.

9
00:00:28,679 --> 00:00:33,920
So it was a basic example of a uniform variable.

10
00:00:33,920 --> 00:00:38,439
And other examples that come up, if d is the outcome

11
00:00:38,439 --> 00:00:43,480
of a fair die, dies are six-sided, dies are six-sided.

12
00:00:43,480 --> 00:00:47,960
So the probability that it comes up one or two or six

13
00:00:47,960 --> 00:00:50,039
is 1-sixth each.

14
00:00:50,039 --> 00:00:52,799
Another game is the four-digit lottery number,

15
00:00:52,799 --> 00:00:55,359
where it's supposed to be the case that the four digits

16
00:00:55,359 --> 00:00:57,879
are each chosen at random, which means

17
00:00:57,880 --> 00:01:02,040
that the possibilities range from 4 zeros up through 4 nines

18
00:01:02,040 --> 00:01:04,320
for 10,000 numbers.

19
00:01:04,320 --> 00:01:06,799
And they're supposed to be all equally likely.

20
00:01:06,799 --> 00:01:10,980
So the probability that the lottery winds up with 0,

21
00:01:10,980 --> 00:01:13,400
0 is the same as that it ends up with 1,

22
00:01:13,400 --> 00:01:15,320
is the same that it ends up with 4 nines.

23
00:01:15,320 --> 00:01:17,079
It's 1, 10,000.

24
00:01:17,079 --> 00:01:19,280
So that's another uniform random variable.

25
00:01:22,120 --> 00:01:25,079
Let's prove a little lemma that will be of use later.

26
00:01:25,079 --> 00:01:28,359
It's just some practice with uniformity.

27
00:01:28,359 --> 00:01:30,679
Suppose that I have R1, R2, R3,

28
00:01:30,679 --> 00:01:32,079
are three random variables.

29
00:01:32,079 --> 00:01:34,759
They're mutually independent.

30
00:01:34,759 --> 00:01:37,439
And R1 is uniform.

31
00:01:37,439 --> 00:01:39,480
I don't really care about the other two.

32
00:01:39,480 --> 00:01:44,079
I do care technically that they are only taking the values.

33
00:01:44,079 --> 00:01:47,280
They only take values that R1 can take as well.

34
00:01:47,280 --> 00:01:48,039
So I haven't said that.

35
00:01:48,039 --> 00:01:48,560
I'm just slide.

36
00:01:48,560 --> 00:01:50,959
But that's what we're assuming.

37
00:01:50,959 --> 00:01:54,840
And then I claim is that each of the pairs,

38
00:01:54,840 --> 00:02:00,719
the probability that R1 equals R2 is independent of the event

39
00:02:00,719 --> 00:02:03,159
that R1 is equal to R2 is independent of the event

40
00:02:03,159 --> 00:02:07,120
that R2 is equal to R3, which is independent of the event

41
00:02:07,120 --> 00:02:09,520
that R1 is equal to R3.

42
00:02:09,520 --> 00:02:11,480
Now these events overlap.

43
00:02:11,480 --> 00:02:13,439
There's an R1 here.

44
00:02:13,439 --> 00:02:16,879
There's an R1 there, and there's an R2 here and an R2 there.

45
00:02:16,879 --> 00:02:21,039
So even though the R1, R2, R3 are mutually independent,

46
00:02:21,039 --> 00:02:22,280
it's not completely clear.

47
00:02:22,280 --> 00:02:26,319
In fact, it isn't really clear that these events

48
00:02:26,319 --> 00:02:29,080
are mutually independent.

49
00:02:29,080 --> 00:02:31,759
But in fact, they're not mutually independent.

50
00:02:31,759 --> 00:02:34,400
In fact, they're pairwise independent.

51
00:02:34,400 --> 00:02:36,680
They're obviously not three-way independent.

52
00:02:36,680 --> 00:02:37,639
That is mutually independent.

53
00:02:37,639 --> 00:02:40,199
Because if I know that R1 is equal to R2,

54
00:02:40,199 --> 00:02:45,360
and I know that R2 is equal to R3, it follows that R1 is equal to R3.

55
00:02:45,360 --> 00:02:48,000
So given these two, the probability

56
00:02:48,000 --> 00:02:54,840
of this changes dramatically to certainty.

57
00:02:54,840 --> 00:02:57,800
So this is the useful lemma, which

58
00:02:57,800 --> 00:03:00,759
is that if I have the three variables, and I look at the three

59
00:03:00,759 --> 00:03:04,800
possible pairs of various values that might be equal,

60
00:03:04,800 --> 00:03:10,479
that whether any two of them are equal is independent of each other.

61
00:03:10,479 --> 00:03:12,520
Now let me give a hand-waving argument.

62
00:03:12,520 --> 00:03:16,879
There's a rigorous argument based on total probability

63
00:03:16,879 --> 00:03:19,759
that appears as a problem in the text.

64
00:03:19,759 --> 00:03:21,840
But the intuitive idea is let's look at the case

65
00:03:21,840 --> 00:03:24,759
that R1 is the uniform variable.

66
00:03:24,759 --> 00:03:28,319
And R1 is independent of R2 and R3.

67
00:03:28,319 --> 00:03:32,120
So certainly that implies that R1 is independent of the event

68
00:03:32,120 --> 00:03:33,560
that R2 is equal to R3.

69
00:03:33,560 --> 00:03:36,319
Because R1 is mutually independent, both R1 and R2,

70
00:03:36,319 --> 00:03:37,680
doesn't matter what they do.

71
00:03:37,680 --> 00:03:41,680
So it's independent of this event that R2 is equal to R3.

72
00:03:41,680 --> 00:03:46,680
Now because R1 is uniform, it has

73
00:03:46,680 --> 00:03:52,800
probability p of equaling every possible value that it can take.

74
00:03:52,800 --> 00:03:58,560
And since R2 and R3 only take a value that R1 could take,

75
00:03:58,560 --> 00:04:02,960
the probability that R1 hits the value that R2 and R3

76
00:04:02,960 --> 00:04:05,240
happens to have is still p.

77
00:04:05,240 --> 00:04:06,640
That's the informal argument.

78
00:04:06,640 --> 00:04:10,520
So in other words, the claim is that the probability that R1 is equal to R2,

79
00:04:10,520 --> 00:04:14,480
given that R2 is equal to R3, is simply the probability

80
00:04:14,479 --> 00:04:19,079
that R1 happens to hit R2, whatever values R2 has.

81
00:04:19,079 --> 00:04:24,199
This equation says that R1 equals R2 is independent of R2, R3.

82
00:04:24,199 --> 00:04:26,959
And in fact, in both cases, it's the same probability

83
00:04:26,959 --> 00:04:29,599
that R1 is equal to any given value.

84
00:04:29,599 --> 00:04:32,560
The probability of that R being uniform

85
00:04:32,560 --> 00:04:35,680
has of equaling each of its possible values.

86
00:04:35,680 --> 00:04:37,959
You can think about that, see if it's persuasive.

87
00:04:37,959 --> 00:04:39,879
It's actually an OK argument.

88
00:04:39,879 --> 00:04:40,920
But I was bothered by it.

89
00:04:40,920 --> 00:04:42,719
I found that it took me.

90
00:04:42,720 --> 00:04:44,960
I wasn't happy with it until I sat down

91
00:04:44,960 --> 00:04:47,880
and really worked it out formally to justify

92
00:04:47,880 --> 00:04:52,040
this somewhat hand-wavy proof of the lemma.

93
00:04:52,040 --> 00:04:53,800
All right.

94
00:04:53,800 --> 00:04:56,000
Let's turn from uniform random variables

95
00:04:56,000 --> 00:04:57,560
to binomial random variables.

96
00:04:57,560 --> 00:04:59,840
They're probably the most important single example

97
00:04:59,840 --> 00:05:02,400
of random variable that comes up all the time.

98
00:05:02,400 --> 00:05:05,440
So the simplest definition of a binomial random variable

99
00:05:05,440 --> 00:05:07,680
is the one that you get by flipping

100
00:05:07,680 --> 00:05:11,560
n mutually independent coins.

101
00:05:11,560 --> 00:05:14,319
Or they have an order.

102
00:05:14,319 --> 00:05:15,480
So you can tell them apart.

103
00:05:15,480 --> 00:05:20,480
Or again, you could say that you flip one coin n times,

104
00:05:20,480 --> 00:05:23,840
but each of the flips is independent of all the others.

105
00:05:23,840 --> 00:05:26,399
Now, there's two parameters here and n and a p,

106
00:05:26,399 --> 00:05:29,160
because we don't assume that the flips are fair.

107
00:05:29,160 --> 00:05:32,960
So there's one parameter is how many flips there are.

108
00:05:32,960 --> 00:05:35,560
The other parameter is the probability of a head,

109
00:05:35,560 --> 00:05:38,680
which might be biased that heads are more likely or less

110
00:05:38,680 --> 00:05:40,000
likely than tails.

111
00:05:40,000 --> 00:05:43,120
The fair case would be when p was 1,5.

112
00:05:43,120 --> 00:05:47,800
So for example, if n is 5 and p is 2 thirds,

113
00:05:47,800 --> 00:05:51,399
what's the probability that we consecutively flip?

114
00:05:51,399 --> 00:05:53,840
Head, head, tail, tail, head?

115
00:05:53,840 --> 00:05:55,680
Well, because they're independent,

116
00:05:55,680 --> 00:05:58,800
the probability of this is simply the product

117
00:05:58,800 --> 00:06:01,840
of the probability that I flip ahead on the first toss,

118
00:06:01,840 --> 00:06:05,519
which is probability of h, which is p, probability of h,

119
00:06:05,799 --> 00:06:08,199
on the second toss, probability of t on the third,

120
00:06:08,199 --> 00:06:10,240
t on the fourth, t on the fifth.

121
00:06:10,240 --> 00:06:13,439
So I can replace each of those by 2 thirds,

122
00:06:13,439 --> 00:06:15,959
is the probability of a head, 2 thirds, 1 thirds,

123
00:06:15,959 --> 00:06:20,719
1 minus 2 thirds is probability of a tail, 1 thirds, 2 thirds.

124
00:06:20,719 --> 00:06:24,680
And I discover that the probability of h, h, t, t, h

125
00:06:24,680 --> 00:06:30,639
is 2 thirds cubed and 1 third squared.

126
00:06:30,719 --> 00:06:35,639
Or abstracting the probability of a sequence of n tosses

127
00:06:38,319 --> 00:06:41,199
in which there are i heads and the rest of tails,

128
00:06:41,199 --> 00:06:46,199
n minus i tails is simply the probability of a head

129
00:06:47,439 --> 00:06:50,279
raised to the i th power times the probability

130
00:06:50,279 --> 00:06:52,399
of a tail, namely 1 minus p,

131
00:06:52,399 --> 00:06:55,599
raised to the n minus i th power.

132
00:06:55,599 --> 00:06:59,800
Given any particular sequence of hs and t's of length n,

133
00:06:59,800 --> 00:07:03,079
this is the probability that's assigned to that sequence.

134
00:07:03,079 --> 00:07:05,120
So all sequences with the same number of hs

135
00:07:05,120 --> 00:07:07,680
have the same probability, but of course,

136
00:07:07,680 --> 00:07:09,400
with different numbers of hs, they have different

137
00:07:09,400 --> 00:07:11,120
probabilities.

138
00:07:11,120 --> 00:07:13,520
Well, what's the probability that you actually

139
00:07:13,520 --> 00:07:17,480
toss i heads and n minus i tails in the n tosses?

140
00:07:17,480 --> 00:07:21,720
That's gonna be equal to the number of possible sequences

141
00:07:21,720 --> 00:07:25,680
that have this property of i heads and n minus i tails.

142
00:07:25,680 --> 00:07:28,240
Well, the number of such sequences is simply,

143
00:07:28,240 --> 00:07:33,240
choose the i places for the n heads out of the n tosses.

144
00:07:34,439 --> 00:07:36,160
So it's gonna be n choose i.

145
00:07:36,160 --> 00:07:38,519
So we've just figured out that the probability

146
00:07:38,519 --> 00:07:43,319
of tossing i heads and n minus i tails is simply n choose i

147
00:07:43,319 --> 00:07:47,400
times p to the i, 1 minus p to the n minus i.

148
00:07:48,400 --> 00:07:53,400
In short, the probability that the number of heads is i

149
00:07:53,800 --> 00:07:55,840
is equal to this number.

150
00:07:55,839 --> 00:08:00,839
And this is the probability that's associated with whether

151
00:08:00,959 --> 00:08:04,679
the binomial variable with parameters n and p is equal to i

152
00:08:04,679 --> 00:08:07,719
is n choose i p to the i, 1 minus p to the n minus i.

153
00:08:07,719 --> 00:08:09,399
This is a pretty basic formula.

154
00:08:09,399 --> 00:08:11,479
If you can't memorize it, then make sure it's written

155
00:08:11,479 --> 00:08:13,519
on any crib sheet you take to an exam.

156
00:08:15,799 --> 00:08:18,799
So the probability density function,

157
00:08:18,799 --> 00:08:21,879
it abstracts out some properties of random variables.

158
00:08:21,879 --> 00:08:24,719
Basically, it just tells you what's the probability

159
00:08:24,720 --> 00:08:26,760
that the random variable takes a given value

160
00:08:26,760 --> 00:08:28,400
for every possible value.

161
00:08:28,400 --> 00:08:32,920
So the probability density function, pdf of r,

162
00:08:32,920 --> 00:08:34,960
is a function on the real values.

163
00:08:34,960 --> 00:08:37,560
And it tells you for each a, what's the probability

164
00:08:37,560 --> 00:08:39,240
that r is equal to a?

165
00:08:41,680 --> 00:08:44,440
So what we've just said is that the probability density

166
00:08:44,440 --> 00:08:47,519
function of the binomial random variable characterized

167
00:08:47,519 --> 00:08:52,519
by parameters n and p at i is n choose i p to the i, 1 minus p

168
00:08:53,240 --> 00:08:56,079
to the n minus i, we're assuming that i is between,

169
00:08:56,079 --> 00:08:57,919
as an integer from 0 to n.

170
00:08:59,960 --> 00:09:03,840
If I look at the probability density function

171
00:09:03,840 --> 00:09:06,159
for a uniform variable, then it's constant.

172
00:09:06,159 --> 00:09:09,759
The probability density function on any possible value v

173
00:09:09,759 --> 00:09:14,480
that the uniform variable can take is the same.

174
00:09:14,480 --> 00:09:17,199
This applies for v in the range of u.

175
00:09:18,399 --> 00:09:20,319
So in fact, you can say exactly what it is.

176
00:09:20,320 --> 00:09:22,520
It's simply one over the size of the range of u,

177
00:09:22,520 --> 00:09:23,640
if u is uniform.

178
00:09:27,680 --> 00:09:31,920
Closely related function that describes a lot about the behavior

179
00:09:31,920 --> 00:09:35,600
of a random variable is the cumulative distribution function.

180
00:09:35,600 --> 00:09:39,080
It's simply the probability that r is less than or equal to a.

181
00:09:39,080 --> 00:09:41,680
So it's a function on the real numbers from realster

182
00:09:41,680 --> 00:09:47,680
reals of where pdf r of cdf r of a is the probability

183
00:09:47,680 --> 00:09:49,480
that r is less than or equal to a.

184
00:09:49,480 --> 00:09:53,879
Clearly given the pdf, you can get the cdf and given the cdf,

185
00:09:53,879 --> 00:09:57,960
you can get the pdf, but it's convenient to have both around.

186
00:09:57,960 --> 00:10:02,920
Now, the key observation about these is that once we've abstracted

187
00:10:02,920 --> 00:10:06,639
out to the pdf and the cdf, we don't have to think

188
00:10:06,639 --> 00:10:08,680
about the sample space anymore.

189
00:10:08,680 --> 00:10:10,759
They do not depend on the sample space.

190
00:10:10,759 --> 00:10:13,120
Well, they're telling you is the probability

191
00:10:13,120 --> 00:10:15,759
that the random variable takes a given value,

192
00:10:15,759 --> 00:10:18,440
which is in some ways the most important data

193
00:10:18,440 --> 00:10:20,000
about a random variable.

194
00:10:20,000 --> 00:10:22,920
You need to fall back on something more general than the pdf

195
00:10:22,920 --> 00:10:27,360
or the cdf when you start having dependent random variables

196
00:10:27,360 --> 00:10:30,320
and you need to know how the probability that r takes a value

197
00:10:30,320 --> 00:10:35,040
changes given that s has some property or takes some other value.

198
00:10:35,040 --> 00:10:38,680
But if you're just looking at the random variable alone,

199
00:10:38,680 --> 00:10:40,560
essentially everything you need to know about it

200
00:10:40,560 --> 00:10:44,400
is given by its density or distribution functions.

201
00:10:44,400 --> 00:10:47,240
And you don't have to worry about the sample space.

202
00:10:47,320 --> 00:10:50,720
And this has the advantage that both the uniform distributions

203
00:10:50,720 --> 00:10:53,399
and binomial distributions come up

204
00:11:01,879 --> 00:11:05,720
and it means that all of these different random variables

205
00:11:05,720 --> 00:11:08,159
based on different sample spaces are going

206
00:11:08,159 --> 00:11:10,560
to share a whole lot of properties,

207
00:11:10,560 --> 00:11:13,560
everything that I derive based on what the pdf is

208
00:11:13,560 --> 00:11:15,279
is going to apply to all of them.

209
00:11:15,279 --> 00:11:19,079
And that's why this abstraction of a random variable

210
00:11:19,079 --> 00:11:22,399
in terms of a probability density function is so valuable and key.

211
00:11:22,399 --> 00:11:24,679
But remember, the definition of a random variable

212
00:11:24,679 --> 00:11:28,439
is not that it is a probability density function,

213
00:11:28,439 --> 00:11:32,399
rather it's a function from the sample space to values.

