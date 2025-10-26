---
title: MIT6042J P104467VarianceVideo
---

1
00:00:00,000 --> 00:00:02,839
If we're going to make use of JPEG,

2
00:00:02,839 --> 00:00:05,919
Chebs bound and other results that depend on the variance,

3
00:00:05,919 --> 00:00:11,040
we'll need some methods for calculating variance in various circumstances.

4
00:00:11,040 --> 00:00:13,280
So let's develop that here.

5
00:00:13,280 --> 00:00:19,600
A basic place to begin is to ask about the indicator variables in their variance.

6
00:00:19,600 --> 00:00:24,160
Remember, i as an indicator variable means that it's 0, 1 valued.

7
00:00:24,160 --> 00:00:26,480
It's also called a Bernoulli variable.

8
00:00:26,559 --> 00:00:30,800
And if the probability that it equals 1 is p, that's also its expectation.

9
00:00:30,800 --> 00:00:35,600
So we have an indicator variable with expectation of the indicator is p,

10
00:00:35,600 --> 00:00:42,240
and we're asking what's its variance, which by definition is the expectation of i minus p squared.

11
00:00:42,240 --> 00:00:47,519
Well, this is one of these sort of almost mechanical proofs that follows simply by algebra

12
00:00:47,519 --> 00:00:49,760
and linearity of expectation.

13
00:00:49,760 --> 00:00:54,640
But let's walk through a step-by-step just to reassure you that that's all that's involved.

14
00:00:54,640 --> 00:00:58,240
I would recommend against really trying to memorize this because it's...

15
00:00:58,240 --> 00:00:59,280
I can never remember it anyway.

16
00:00:59,280 --> 00:01:01,280
I just reproof it every time I need it.

17
00:01:02,079 --> 00:01:04,719
And so let's see how the proof would go.

18
00:01:04,719 --> 00:01:11,359
So step one would be to expand this i minus p squared algebraically.

19
00:01:11,359 --> 00:01:15,920
So we're talking about the expectation of i squared minus 2pi plus p squared.

20
00:01:16,560 --> 00:01:19,280
Now we can just apply linearity of expectation.

21
00:01:19,280 --> 00:01:24,319
And I get the expectation of i squared minus 2p times the expectation of i

22
00:01:24,319 --> 00:01:27,279
plus p squared. Of course, the expectation of a constant is the constant.

23
00:01:27,279 --> 00:01:30,719
So when I take expectation of p squared, I get p squared.

24
00:01:30,719 --> 00:01:31,599
But now look at this.

25
00:01:32,479 --> 00:01:34,079
i squared is 0 1 valued.

26
00:01:34,079 --> 00:01:35,919
So in fact, i squared is equal to i.

27
00:01:36,799 --> 00:01:39,679
And the expectation of i has now appeared here.

28
00:01:39,679 --> 00:01:40,239
That's p.

29
00:01:40,959 --> 00:01:44,159
So this term simplifies to expectation of i.

30
00:01:44,159 --> 00:01:47,599
And this term becomes 2p times p plus p squared.

31
00:01:47,599 --> 00:01:49,519
Of course, that expectation of i is a p.

32
00:01:49,519 --> 00:01:52,560
So I got p minus 2p squared plus p squared.

33
00:01:53,439 --> 00:01:54,719
The p squared cancels.

34
00:01:54,719 --> 00:01:56,719
And I get p minus p squared.

35
00:01:56,719 --> 00:01:59,920
If you factor out p, that's p times 1 minus p.

36
00:01:59,920 --> 00:02:05,760
Or pq, which is the standard way that you write the variance of an indicator variable.

37
00:02:05,760 --> 00:02:07,600
It's p times 1 minus p.

38
00:02:08,479 --> 00:02:09,680
Okay, that was easy.

39
00:02:09,680 --> 00:02:11,439
And again, completely mechanical.

40
00:02:13,439 --> 00:02:18,960
There's a couple of other rules for calculating variance of new variables from all

41
00:02:18,960 --> 00:02:22,640
the ones that are basic, like additivity of expectation.

42
00:02:22,640 --> 00:02:24,879
But it doesn't quite work so simply for variance.

43
00:02:25,520 --> 00:02:31,680
So the first rule is that if you ask about the variance of a constant times r plus b,

44
00:02:32,480 --> 00:02:37,920
that turns out to be the same as a squared times the variance of b of r.

45
00:02:37,920 --> 00:02:40,319
The b doesn't, the additive b doesn't matter.

46
00:02:40,960 --> 00:02:47,360
And the, because the variance is really the expectation of something squared

47
00:02:47,440 --> 00:02:53,440
when you get rid of that constant a, you're factoring out an a squared.

48
00:02:53,440 --> 00:02:55,840
And this is the rule that you get here.

49
00:02:56,320 --> 00:02:56,640
Okay.

50
00:02:58,240 --> 00:03:00,960
Another basic rule that's often convenient,

51
00:03:00,960 --> 00:03:07,040
instead of working with variance in the form of the expectation of r minus mu squared,

52
00:03:07,040 --> 00:03:14,720
is to say that it's the expectation of r squared minus the square of the expectation of r.

53
00:03:15,680 --> 00:03:19,680
Now, this expression, the square of the expectation of r,

54
00:03:19,680 --> 00:03:23,759
comes up so often that there's a shorthand for it where it's that are writing perennies,

55
00:03:23,759 --> 00:03:29,039
you write e squared of r, just means the same as expectation of r squared.

56
00:03:29,680 --> 00:03:34,560
And so much for the second rule, which we'll use all the time, because it's a convenient rule to have.

57
00:03:34,560 --> 00:03:38,159
I'm going to prove the second one, just again, to show you nothing to worry about,

58
00:03:38,159 --> 00:03:42,639
you don't even have to remember how the proof goes, because you can reconstruct it every time.

59
00:03:42,719 --> 00:03:48,719
So this, it's again, simple proofs just by linearity of expectation and doing the algebra.

60
00:03:49,279 --> 00:03:55,279
So the variance of r is, by definition, the expectation of r minus mu squared.

61
00:03:55,839 --> 00:03:58,079
Let's expand r minus mu squared.

62
00:03:58,079 --> 00:04:02,239
It's the expectation of r squared minus 2 mu r plus mu squared.

63
00:04:02,239 --> 00:04:04,399
Now, we apply linearity to that.

64
00:04:04,399 --> 00:04:12,399
I get the expectation of r squared minus 2 mu expectation of r plus the expectation of mu squared.

65
00:04:12,400 --> 00:04:16,560
If I'm really being completely mechanical about linearity of expectation,

66
00:04:16,560 --> 00:04:20,160
an expectation of a constant mu squared is simply mu squared.

67
00:04:20,160 --> 00:04:23,600
And here I've got the expectation of r, that's mu again.

68
00:04:23,600 --> 00:04:28,720
So I wind up with the expectation of r squared minus 2 mu mu plus r squared.

69
00:04:29,199 --> 00:04:33,280
The, this is 2 mu squared minus 2 mu squared plus mu squared.

70
00:04:33,280 --> 00:04:35,680
It winds up with minus mu squared.

71
00:04:35,680 --> 00:04:40,000
And of course, mu squared is the expectation squared of r.

72
00:04:40,079 --> 00:04:47,839
I've proved the formula again as claimed there's nothing interesting here, just algebra and linearity

73
00:04:47,839 --> 00:04:48,720
of expectation.

74
00:04:49,680 --> 00:04:55,120
And the first result about factoring out in a and squaring it follows from a similar proof,

75
00:04:55,120 --> 00:04:56,560
which I'm not going to include here.

76
00:04:58,560 --> 00:05:05,120
So let's look at the space station, Merigan, which we used as an example of calculating mean time

77
00:05:05,120 --> 00:05:12,480
to failure. So the hypothesis that we're making is that with probability p, the Mer space station

78
00:05:12,480 --> 00:05:17,600
will run into some huge space garbage that will clobber it.

79
00:05:18,240 --> 00:05:22,319
And the probability of that happening in any given hour is probability p.

80
00:05:23,199 --> 00:05:30,000
So we know that that means that the expected number of hours for the Mer to fail is one over pay.

81
00:05:30,000 --> 00:05:31,920
That's the mean time to failure.

82
00:05:31,920 --> 00:05:35,360
And what we're asking is what's the variance of f?

83
00:05:35,360 --> 00:05:39,519
If f is the number of hours to failure, what's variance of f?

84
00:05:41,040 --> 00:05:46,639
Well, one way we can do it is just plug in the definition of expectation.

85
00:05:46,639 --> 00:05:48,000
And this will work.

86
00:05:48,000 --> 00:05:54,959
The probability that it takes k hours to fail is, we know the geometric distribution,

87
00:05:54,959 --> 00:06:02,079
the probability of not failing for k minus 1 hours and failing after that, q to the k minus 1 times p.

88
00:06:02,079 --> 00:06:08,240
So the variance of f using our previous formula about the expectation of f squared minus the expectation

89
00:06:08,240 --> 00:06:14,399
squared of f, this becomes a minus 1 over p squared. And we can forget about that. We want to focus

90
00:06:14,399 --> 00:06:22,399
on calculating the expectation of f squared. So f is 1, 2, 3. And so on, that means f squared is

91
00:06:22,399 --> 00:06:28,479
1, 4, 9, k squared. The point being that the only values that f squared can take are squares.

92
00:06:28,479 --> 00:06:33,519
So we don't have to worry about counting them in the sum that defines the expectation.

93
00:06:33,519 --> 00:06:40,560
So let's go look at that. So the expectation of f squared is the sum over the possible values that f

94
00:06:40,560 --> 00:06:46,959
squared can take, namely the sum from k equals 1 to infinity of k squared times the probability that f

95
00:06:46,959 --> 00:06:50,959
squared is equal to k squared. Well, of course, the probability that f squared is equal to k squared is

96
00:06:50,959 --> 00:06:58,959
the same as the probability that f equals k. So I can, and we know what the probability that f equals

97
00:06:58,959 --> 00:07:07,359
k is. It's a geometric distribution. So the probability that f equals k is q to the k minus 1 times p.

98
00:07:07,359 --> 00:07:14,479
If I factor out a p over q, this simplifies to the sum from k equals 0 to infinity of k squared

99
00:07:14,479 --> 00:07:20,240
q to the k. And this is a kind of sum that we've seen before. And that has a closed form. And we could

100
00:07:20,240 --> 00:07:26,240
perfectly well calculate then the expectation of f squared by appealing to our generating

101
00:07:26,240 --> 00:07:31,120
function information to get a closed form for this. And then remember to subtract 1 minus p squared

102
00:07:31,120 --> 00:07:37,840
because the variance is this term minus the square of the expectation of f. But let's go

103
00:07:37,840 --> 00:07:43,840
another way and use the same technique of total expectation that we used before. That is the

104
00:07:43,919 --> 00:07:51,679
expectation of f squared of the failure time squared is equal by the law of total probability to

105
00:07:51,679 --> 00:07:58,319
the expectation of f squared given that f is 1. That, as we fail, on the first step times

106
00:07:58,319 --> 00:08:03,839
the probability that we fail on the first step. Plus the expectation of f squared given

107
00:08:03,839 --> 00:08:09,519
that we don't fail on the first step. That f is greater than 1 times the probability that f is

108
00:08:09,519 --> 00:08:11,000
greater than 1.

109
00:08:11,000 --> 00:08:13,199
Now, what's going to make this manageable

110
00:08:13,199 --> 00:08:16,299
is that this expression, the expectation of f squared

111
00:08:16,299 --> 00:08:18,839
when f is greater than 1, will turn out

112
00:08:18,839 --> 00:08:23,599
to be something that we can easily convert into a non-conditional

113
00:08:23,599 --> 00:08:26,719
probability and find a value for.

114
00:08:26,719 --> 00:08:29,240
So the limit that we're using here is the following.

115
00:08:29,240 --> 00:08:32,039
When I'm thinking about mean time to failure,

116
00:08:32,039 --> 00:08:34,319
if I think of any function whatsoever,

117
00:08:34,319 --> 00:08:36,840
g of the mean time to failure.

118
00:08:36,840 --> 00:08:40,240
And I'm interested in the expectation of g of f.

119
00:08:40,240 --> 00:08:42,480
And I'm interested in the expectation of g of f

120
00:08:42,480 --> 00:08:45,000
given that f is greater than n.

121
00:08:45,000 --> 00:08:48,639
That is, it's already taken n steps to get where I am.

122
00:08:48,639 --> 00:08:50,840
Then the thing about mean time to failure

123
00:08:50,840 --> 00:08:55,480
is that at any moment that you haven't failed,

124
00:08:55,480 --> 00:08:57,879
you're starting off in essentially the same situation

125
00:08:57,879 --> 00:09:01,120
you were at the beginning in waiting for the next failure

126
00:09:01,120 --> 00:09:01,840
to occur.

127
00:09:01,840 --> 00:09:04,480
And the probability of failing in one more step

128
00:09:04,480 --> 00:09:07,960
is the same probability, is the same p

129
00:09:07,960 --> 00:09:10,879
and the probability of you're failing in two more steps

130
00:09:10,879 --> 00:09:13,920
is qp and three more steps is qp.

131
00:09:13,920 --> 00:09:17,519
The only difference is that the value of f

132
00:09:17,519 --> 00:09:19,759
has been shifted by n.

133
00:09:19,759 --> 00:09:23,440
It was, in the ordinary case, we start off with f equals 0

134
00:09:23,440 --> 00:09:25,200
and look at the probability that we've

135
00:09:25,200 --> 00:09:27,080
failing one more step, two more steps.

136
00:09:27,080 --> 00:09:30,600
Now we're starting off with f having the value f plus n

137
00:09:30,600 --> 00:09:33,639
and asking about the probability that it

138
00:09:33,639 --> 00:09:36,039
fails in the next step or the next step or in the next step.

139
00:09:36,039 --> 00:09:40,279
So the punch line is that the expectation of g of f given

140
00:09:40,279 --> 00:09:44,159
that f is greater than n is simply the expectation

141
00:09:44,159 --> 00:09:46,399
of g of f plus n.

142
00:09:46,399 --> 00:09:48,120
And I'm going to let you meditate that

143
00:09:48,120 --> 00:09:49,679
and not say any more about it.

144
00:09:49,679 --> 00:09:51,919
But the punch line is the corollary

145
00:09:51,919 --> 00:09:56,080
that the expectation of f squared given that f is greater than 1

146
00:09:56,080 --> 00:10:00,759
is simply the expectation of f plus 1 squared.

147
00:10:00,759 --> 00:10:03,919
And that lets us go back and simplify this expression

148
00:10:03,919 --> 00:10:06,200
that we had from total expectation.

149
00:10:06,200 --> 00:10:09,480
We now have, here's the expectation of f squared given

150
00:10:09,480 --> 00:10:11,200
that f is greater than 1.

151
00:10:11,200 --> 00:10:12,519
And let's look at these other terms.

152
00:10:12,519 --> 00:10:16,120
This is the expectation of f squared given that f equals 1.

153
00:10:16,120 --> 00:10:19,159
Well, the expectation of f squared given that f equals 1

154
00:10:19,159 --> 00:10:22,080
is 1 squared because we know what f is

155
00:10:22,080 --> 00:10:24,000
and that's the end of the story.

156
00:10:24,000 --> 00:10:26,080
Times the probability that f equals 1,

157
00:10:26,080 --> 00:10:29,720
that's p, the probability of failure on a given step.

158
00:10:29,800 --> 00:10:32,840
This is the probability that f is greater than 1,

159
00:10:32,840 --> 00:10:36,840
which is q that we didn't fail on the first step.

160
00:10:36,840 --> 00:10:39,920
And we just figured out that this term is the expectation

161
00:10:39,920 --> 00:10:43,639
of the square of f of f plus 1.

162
00:10:43,639 --> 00:10:45,519
So there's the 1 in the p.

163
00:10:45,519 --> 00:10:48,000
And that becomes a q and this is the expectation

164
00:10:48,000 --> 00:10:50,080
of f plus 1 squared.

165
00:10:50,080 --> 00:10:52,160
Now, again, I apply linearity.

166
00:10:52,160 --> 00:10:59,680
I'm going to expand f plus 1 squared into f squared plus 2

167
00:11:00,000 --> 00:11:02,960
f plus 1 and then apply linearity of expectation.

168
00:11:02,960 --> 00:11:05,920
And I'm going to wind up with the expectation of f squared

169
00:11:05,920 --> 00:11:08,279
plus twice the expectation of f, which

170
00:11:08,279 --> 00:11:13,759
remember is twice over 2 over p plus 1 times the q.

171
00:11:13,759 --> 00:11:18,200
And now what I've got is a simple arithmetic equation

172
00:11:18,200 --> 00:11:20,920
between the expectation of f squared

173
00:11:20,920 --> 00:11:24,759
and some other arithmetic and the expectation of f squared.

174
00:11:24,759 --> 00:11:28,040
It's easy to solve for the expectation of f squared.

175
00:11:28,039 --> 00:11:31,240
And I'll spare you that elementary simplification.

176
00:11:31,240 --> 00:11:33,439
But the punchline is when we also

177
00:11:33,439 --> 00:11:37,559
remember to subtract 1 over p squared,

178
00:11:37,559 --> 00:11:40,159
because that was the expectation of the square of f

179
00:11:40,159 --> 00:11:41,360
of the expectation of f.

180
00:11:41,360 --> 00:11:43,439
We come up with this punchline formula.

181
00:11:43,439 --> 00:11:46,159
The variance of mean time to failure

182
00:11:46,159 --> 00:11:50,559
is 1 over the probability of failure on a given step

183
00:11:50,559 --> 00:11:55,559
times 1 minus 1 over the probability of the failure

184
00:11:55,559 --> 00:11:58,319
in the first step minus 1.

185
00:11:58,319 --> 00:12:00,000
All right, let's just for practice and fun.

186
00:12:00,000 --> 00:12:02,599
Let's look at the space station mirror again.

187
00:12:02,599 --> 00:12:04,439
Suppose that I tell you that there's

188
00:12:04,439 --> 00:12:09,399
a 1 in 10,000 chance that in any given hour

189
00:12:09,399 --> 00:12:11,439
the mirror is going to crash into some debris that's

190
00:12:11,439 --> 00:12:13,000
out there in orbit.

191
00:12:13,000 --> 00:12:20,119
So the expectation of f is 10 to the fourth about 10,000 hours.

192
00:12:20,200 --> 00:12:26,539
And the sigma is going to be the variance of f,

193
00:12:26,539 --> 00:12:31,639
which is about 1 over 1, 10,000.

194
00:12:31,639 --> 00:12:34,919
That is 10,000 times 10,000 minus 1, which

195
00:12:34,919 --> 00:12:38,279
is pretty close to 10,000 squared for the variance.

196
00:12:38,279 --> 00:12:39,399
And then when I take the square root,

197
00:12:39,399 --> 00:12:40,799
I get back to 10,000.

198
00:12:40,799 --> 00:12:43,480
So sigma is just a tad less than 10,000.

199
00:12:43,480 --> 00:12:44,960
It's 10 to the fourth.

200
00:12:44,960 --> 00:12:48,279
So with those numbers, I can apply the Chebhichef theorem

201
00:12:48,279 --> 00:12:50,899
and conclude that the probability that the mirror

202
00:12:50,899 --> 00:12:54,480
lasts more than 4 times 10 to the fourth hours

203
00:12:54,480 --> 00:12:57,120
is less than 1 chance in 4.

204
00:12:57,120 --> 00:12:59,199
And we translate that into years.

205
00:12:59,199 --> 00:13:00,919
If it was really the case that there

206
00:13:00,919 --> 00:13:03,679
was a 1 in 10,000 chance of the mirror being destroyed

207
00:13:03,679 --> 00:13:05,720
in any given hour, then the probability

208
00:13:05,720 --> 00:13:07,919
that it lasts more than 4.6 years

209
00:13:07,919 --> 00:13:11,919
before destructing is less than 1 quarter.

210
00:13:12,199 --> 00:13:18,519
So another rule for calculating variance,

211
00:13:18,519 --> 00:13:21,039
and maybe the most important general one,

212
00:13:21,039 --> 00:13:23,839
is that variance is additive.

213
00:13:23,839 --> 00:13:27,959
That is, the variance of a sum is the sum of the variances.

214
00:13:27,959 --> 00:13:31,799
But unlike expectation where there's no other side condition,

215
00:13:31,799 --> 00:13:34,399
and it does not in any way depend on independence,

216
00:13:34,399 --> 00:13:37,360
it turns out that variance is additive only

217
00:13:37,360 --> 00:13:41,360
if the variables being added are pairwise independent.

218
00:13:41,360 --> 00:13:43,720
Now you might wonder where the pairwise came from.

219
00:13:43,720 --> 00:13:47,720
And it's because variance is the square of an expectation.

220
00:13:47,720 --> 00:13:52,399
So when you wind up multiplying out and doing the algebra,

221
00:13:52,399 --> 00:13:56,919
you're just getting quadratic terms for variances

222
00:13:56,919 --> 00:14:00,159
of for expectations of ri times rj.

223
00:14:00,159 --> 00:14:04,600
And so you need to factor those into expectation of r times

224
00:14:04,600 --> 00:14:07,759
xp, ri times expectation of rj, which

225
00:14:07,759 --> 00:14:09,519
only need pairwise independence for.

226
00:14:09,519 --> 00:14:11,399
So that's a fast talking through the algebra

227
00:14:11,399 --> 00:14:12,720
that I'm going to leave to you.

228
00:14:12,720 --> 00:14:16,519
It's in the text, and it's, again, one of these easy proofs.

