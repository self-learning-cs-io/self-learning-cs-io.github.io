---
title: MIT6042J P96451ExpectationVideo
---

1
00:00:00,000 --> 00:00:04,799
We ask about averages all the time and in the context of random variables,

2
00:00:04,799 --> 00:00:10,620
averages get abstracted into a lovely concept called the expectation of the

3
00:00:10,620 --> 00:00:15,480
random variable. Let's begin with a motivating example which as is often the

4
00:00:15,480 --> 00:00:21,120
case will come from gambling. So there's a game that's actually played in

5
00:00:21,120 --> 00:00:28,620
Casino's called Carnival Dice where you have three dice and the way you play is

6
00:00:28,620 --> 00:00:32,340
you pick your favorite number from one to six whatever it happens to be and

7
00:00:32,340 --> 00:00:36,420
then you roll the three dice. The dice are assumed to be fair so each one of

8
00:00:36,420 --> 00:00:41,579
them has one one in six chance of coming up with any given number and then the

9
00:00:41,579 --> 00:00:47,219
payoff goes as follows. For every match of your favorite number you get a

10
00:00:47,219 --> 00:00:52,460
dollar and if none of your favorite, if none of the dice show your favorite

11
00:00:52,460 --> 00:00:58,480
number then you lose a dollar. Okay let's do an example. Suppose your

12
00:00:58,479 --> 00:01:02,199
favorite number was five you announced that to the to the house or the dealer and

13
00:01:02,199 --> 00:01:07,519
then the dice start rolling. Now if your role happened to come up with the

14
00:01:07,519 --> 00:01:10,599
numbers two three and four well there's no fives there so you've lost a dollar.

15
00:01:10,599 --> 00:01:15,259
On the other hand if your roles came out five four six there's one five you've

16
00:01:15,259 --> 00:01:18,799
won a dollar if it came out five four five there's two fives you've won a dollar

17
00:01:18,799 --> 00:01:23,799
and if it was all five you've actually won three dollars. Now real Carnival Dice is

18
00:01:23,799 --> 00:01:27,519
often played where either winner lose a dollar depending on whether there's any

19
00:01:27,519 --> 00:01:31,359
match at all but we're playing a more generous game where if you double match

20
00:01:31,359 --> 00:01:34,920
you get two dollars if you triple match you get three dollars. So the basic

21
00:01:34,920 --> 00:01:40,519
question about this is is this a fair game is this worth playing and how can we

22
00:01:40,519 --> 00:01:44,799
think about that? Well we're gonna think about it probabilistically. So let's

23
00:01:44,799 --> 00:01:50,640
think about the probability of rolling no fives if five is my favorite number

24
00:01:50,640 --> 00:01:54,699
what's the probability that I rolled none of them? Well there's a five out of

25
00:01:54,700 --> 00:01:59,180
six chance that I don't roll a five on the first die and on the second die and

26
00:01:59,180 --> 00:02:02,840
on the third die and since the die roles are assumed to be independent the

27
00:02:02,840 --> 00:02:08,740
dies are independent. The probability of no fives is five six to the third which

28
00:02:08,740 --> 00:02:13,740
comes out to be 125, 216ths I'm running this out because we're gonna put all

29
00:02:13,740 --> 00:02:17,900
the numbers over 216th to make them easier to compare. Okay what's the

30
00:02:17,900 --> 00:02:23,780
probability of one five? Well the probability of any single sequence of die

31
00:02:23,780 --> 00:02:31,060
roles with a single five is five sixth of no five times five six of no five times

32
00:02:31,060 --> 00:02:37,099
one sixth of one five and there are three choose one possible sequences of

33
00:02:37,099 --> 00:02:44,259
dice roles with one five and the others non-fives. Likewise for two fives there's

34
00:02:44,259 --> 00:02:54,780
three choose two times five six to the one which is one way of choosing the

35
00:02:54,780 --> 00:03:00,139
place that does not have a five and one six times one sixth which is the

36
00:03:00,139 --> 00:03:04,780
probability of getting fives in the other places. I didn't say that well but you

37
00:03:04,780 --> 00:03:10,019
can get it straight. Okay the probability of three fives is the probability of one

38
00:03:10,019 --> 00:03:13,699
sixth of getting a five on the first die one six the getting a five on the second

39
00:03:13,699 --> 00:03:18,899
die one six the getting a five on the third die simply one six cubed. Okay so we

40
00:03:18,899 --> 00:03:22,739
can easily calculate these probabilities this is a familiar exercise. Let's

41
00:03:22,739 --> 00:03:27,739
put them in a chart. So what we figured out is that zero matches has a probability

42
00:03:27,739 --> 00:03:34,739
of 125 over 216ths and in that case I lose a buck. One match turns out to have a

43
00:03:34,739 --> 00:03:41,259
probability of 75 out of 216th and I win a dollar. Two matches is 15 out of 216th

44
00:03:41,259 --> 00:03:46,500
and I win two dollars and three matches there's one chance in 216 that I win the

45
00:03:46,500 --> 00:03:53,519
three dollars. Okay so now I can ask about what do I expect to win suppose I

46
00:03:53,519 --> 00:03:58,620
play 216 games and the game split exactly according to these probabilities.

47
00:03:58,620 --> 00:04:05,139
Then what I would expect is that I would wind up with zero matches about 125

48
00:04:05,139 --> 00:04:10,219
times that was the probability of there being no matches it was 125 216th. So if I

49
00:04:10,219 --> 00:04:15,740
play two 16 games I expect about 125 we're gonna I'm gonna win nothing or I'm

50
00:04:15,740 --> 00:04:20,100
gonna get no matches which actually means I'll lose a dollar on each. One match I

51
00:04:20,100 --> 00:04:26,779
expect about 75 times two matches 15 times three matches once. So my average

52
00:04:26,779 --> 00:04:34,939
win is gonna be 125 times minus one 75 times one 15 times two plus one times

53
00:04:34,939 --> 00:04:42,500
three divided by 216th. So these numbers on the top where have the 216th roll split

54
00:04:42,500 --> 00:04:46,740
among my choices of losing a dollar winning a dollar winning two dollars and

55
00:04:46,740 --> 00:04:50,100
winning three dollars and it comes out to be slightly negative it's actually

56
00:04:50,100 --> 00:04:58,339
minus 8 cents minus to 17 216ths of a dollar which is about minus 8 cents. So I'm

57
00:04:58,339 --> 00:05:03,659
losing on the average 8 cents per roll this is not a fair game it's really biased

58
00:05:03,660 --> 00:05:07,860
against me and if I keep playing long enough I'm gonna find that I average out a

59
00:05:07,860 --> 00:05:15,700
kind of steady loss of about 8 cents a play. So we would summarize this by saying

60
00:05:15,700 --> 00:05:20,620
that you expect to lose 8 cents meaning that your average loss is 8 cents and you

61
00:05:20,620 --> 00:05:24,180
expect that that's gonna be the phenomenon that comes up if you keep playing the

62
00:05:24,180 --> 00:05:28,060
game repeatedly repeatedly. It's important to notice of course you never actually

63
00:05:28,060 --> 00:05:32,860
lose 8 cents on any single play so what you ex you this notion of you're

64
00:05:32,860 --> 00:05:37,800
expecting to lose 8 cents it never happens. It's just your average loss. No

65
00:05:37,800 --> 00:05:41,620
every single player either gonna lose a dollar win a dollar win two dollars win

66
00:05:41,620 --> 00:05:48,100
three dollars there's no 8 cents at all. Showing up. Okay so now let's abstract the

67
00:05:48,100 --> 00:05:53,340
expected value of a random variable all. So random variables is this the thing

68
00:05:53,340 --> 00:05:57,139
that probabilistically takes on different values with different probabilities

69
00:05:57,139 --> 00:06:02,540
and its expected value is defined to be its average value where the different

70
00:06:02,540 --> 00:06:07,160
values are weighted by their probabilities. We can write this out as a precise

71
00:06:07,160 --> 00:06:15,060
formula. The expectation of a random variable R is defined to be the sum over all

72
00:06:15,060 --> 00:06:18,740
its possible values. It doesn't indicate what the summation is but that's over

73
00:06:18,740 --> 00:06:25,660
all possible values V of V times the probability that V comes up the probability

74
00:06:25,660 --> 00:06:30,780
that R equals V. So this is the basic definition of the expected value of a random

75
00:06:30,779 --> 00:06:37,099
variable. Now let me mention here that this sum works because since we're

76
00:06:37,099 --> 00:06:43,059
assuming a countable sample space R is defined on only countably many outcomes

77
00:06:43,059 --> 00:06:47,539
which means it can only take countably many values. So this is a countable sum

78
00:06:47,539 --> 00:06:52,139
over all the possible values that R takes because there are only

79
00:06:52,139 --> 00:06:58,179
accountably many. Accountably many of them. Okay and what we've just concluded

80
00:06:58,180 --> 00:07:06,459
then is the expected win in the Carnival dice game is minus 17, 216. Check this

81
00:07:06,459 --> 00:07:11,100
formal definition of the expectation of a random variable versus the random

82
00:07:11,100 --> 00:07:17,939
variable defined to be how much you win on a given play of Carnival dice and it

83
00:07:17,939 --> 00:07:24,819
comes out to be that average minus minus 17 over 216. Now there's a technical

84
00:07:24,819 --> 00:07:30,099
result that's useful in some proofs and that says that there's another way to

85
00:07:30,099 --> 00:07:34,540
get the expectation. The expectation can also be expressed by saying it's the

86
00:07:34,540 --> 00:07:38,740
sum over all the possible outcomes in the sample space. This is the sample

87
00:07:38,740 --> 00:07:45,219
space of the value of the random variable at that outcome times the probability of

88
00:07:45,219 --> 00:07:52,219
that outcome. So this is another definition, an alternative definition of compared to

89
00:07:52,220 --> 00:07:59,420
saying that it's the sum over all the values times the probability of that

90
00:07:59,420 --> 00:08:04,460
value. Here it's the sum over all the outcomes of the value of the random

91
00:08:04,460 --> 00:08:07,820
variable at the outcome times the probability of the outcome. It's not entirely

92
00:08:07,820 --> 00:08:11,420
obvious that those two definitions are equivalent. This form of the

93
00:08:11,420 --> 00:08:15,500
definition turns out to be technically helpful in some proofs although outside

94
00:08:15,500 --> 00:08:19,460
approves you don't use it so much in applications but it's not a bad

95
00:08:19,459 --> 00:08:23,539
exercise to prove this equivalence. So I'm going to walk you through it but if

96
00:08:23,539 --> 00:08:27,779
it's boring it's kind of a boring series of equations on slides and you're

97
00:08:27,779 --> 00:08:32,100
welcome to skip past it. It is a derivation that I expect you to be able to

98
00:08:32,100 --> 00:08:35,980
carry out. So let's just carry out this derivation. I'm going to prove that the

99
00:08:35,980 --> 00:08:40,699
expectation is equal to the sum over all the outcomes of the value of the

100
00:08:40,699 --> 00:08:44,860
random variable at the outcome times the probability of the outcome and let's

101
00:08:44,860 --> 00:08:48,940
prove it. In order to prove it let's begin with one little remark that's used

102
00:08:48,940 --> 00:08:55,340
okay. Remember that this notation r equals v describes the event that the random

103
00:08:55,340 --> 00:09:00,139
variable takes the value of v which by definition is an event is the set of

104
00:09:00,139 --> 00:09:05,980
outcomes where this property holds. So it's the set of outcomes omega where r of

105
00:09:05,980 --> 00:09:12,340
omega is equal to v. So let's just remember that. That brackets r equals v is the

106
00:09:12,340 --> 00:09:17,460
event that r is equal to v meaning the set of outcomes where that's true. So what

107
00:09:17,460 --> 00:09:20,980
that tells us in particular is that the probability of r equals v is by

108
00:09:20,980 --> 00:09:27,340
definition the sum of the probabilities of the outcomes in the event. So it's the

109
00:09:27,340 --> 00:09:34,100
sum over all those outcomes. Now let's go back to the original definition of

110
00:09:34,100 --> 00:09:38,980
the expectation of r. The original definition is an the standard one is it's the

111
00:09:38,980 --> 00:09:44,340
sum over all the values of the value times the probability that the random

112
00:09:44,340 --> 00:09:48,940
variable is equal to the value. Now on the previous slide we just had a formula

113
00:09:48,940 --> 00:09:54,539
for the probability that r is equal to v. It's simply the sum over all the

114
00:09:54,539 --> 00:10:00,779
outcomes of where r is equal to v of the probability of that outcome. So I can

115
00:10:00,779 --> 00:10:05,659
replace that term by the sum over all the outcomes of the probability of the

116
00:10:05,659 --> 00:10:10,500
outcome. Okay. So I'm trying to head towards an expression that's only outcomes

117
00:10:10,500 --> 00:10:14,459
which is kind of the top level strategy here. So the first thing I did was I got

118
00:10:14,459 --> 00:10:19,019
rid of that probability of v and replaced it by the sum of all these

119
00:10:19,019 --> 00:10:23,379
probability of the probabilities of all the outcomes where r is v. Well next

120
00:10:23,379 --> 00:10:29,459
step is I'm going to just distribute the v over the inner sum and I get that

121
00:10:29,459 --> 00:10:34,299
this thing is equal to the sum over again over all those outcomes in r equals

122
00:10:34,299 --> 00:10:41,099
v of v times the probability of the outcome. But look the out these outcomes are

123
00:10:41,099 --> 00:10:50,379
the outcomes where r is equal to v. So I can replace that v by r of omega. That

124
00:10:50,379 --> 00:10:54,939
one slip sideways a little bit. So let's watch that. This v is simply going to

125
00:10:54,939 --> 00:11:00,699
become an r of omega. Well I'm still summing over the same set of

126
00:11:00,700 --> 00:11:06,500
omega. But now I've gotten pretty much everything but the omega. So I've got

127
00:11:06,500 --> 00:11:13,060
this inner sum of over all possible omega in r of v of r of omega times the

128
00:11:13,060 --> 00:11:17,259
probability of omega. And I'm summing over all possible v. But if I'm summing

129
00:11:17,259 --> 00:11:21,580
over all possible v and then all possible outcomes where r is equal to v, I

130
00:11:21,580 --> 00:11:26,900
wind up summing over all possible outcomes. And so I've finished the proof

131
00:11:26,899 --> 00:11:32,819
that the expectation of r is equal to the sum over all the outcomes of r of

132
00:11:32,819 --> 00:11:38,779
omega times the probability of omega. Now I'd never do a proof like this in a

133
00:11:38,779 --> 00:11:42,740
lecture because I think watching a lecturer write stuff on the board a whole

134
00:11:42,740 --> 00:11:46,500
bunch of symbols and manipulating equations is really incipit and boring. Most

135
00:11:46,500 --> 00:11:50,259
people can't follow it anyway. I'm hoping that in the video where you can go

136
00:11:50,259 --> 00:11:53,740
back if you wish and replay it and watch it more slowly or at your own speed,

137
00:11:53,740 --> 00:11:58,779
the derivation will be of some value to you. But let's step back a little bit

138
00:11:58,779 --> 00:12:04,659
and notice some top-level technical things that we never really paid attention to

139
00:12:04,659 --> 00:12:09,100
in the process of doing this manipulative proof. So the top-level observation

140
00:12:09,100 --> 00:12:13,779
first of all is that this proof like many proofs in basic foundations of

141
00:12:13,779 --> 00:12:18,500
probability theory and random variables in particular involves taking sums and

142
00:12:18,500 --> 00:12:23,340
rearranging the terms in the sums a lot. So the first question is why sums?

143
00:12:23,340 --> 00:12:29,980
Remember here we were summing over all the possible variables, all the possible

144
00:12:29,980 --> 00:12:35,620
values of some random variable. Why is that a sum? Well it's a sum because we

145
00:12:35,620 --> 00:12:41,019
were assuming that the sample space was countable. There were only a countable

146
00:12:41,019 --> 00:12:49,820
number of values r of omega 0, r of omega 1, r of omega and so on. And so we can

147
00:12:49,820 --> 00:12:53,540
be sure that the sum over all the possible values of the random variable is

148
00:12:53,540 --> 00:12:58,740
accountable sum. It's a sum and we don't have to worry about integrals which is

149
00:12:58,740 --> 00:13:03,420
the main technical reason why we're doing discrete probability and assuming that

150
00:13:03,420 --> 00:13:07,900
there are only a countable number of outcomes. There's a second very important

151
00:13:07,900 --> 00:13:13,020
technicality that's worth mentioning. All the proofs involved rearranging terms in

152
00:13:13,019 --> 00:13:20,340
sums freely and without care. But that means that we're implicitly assuming

153
00:13:20,340 --> 00:13:25,620
that it's safe to do that and that in particular that the defining sum for

154
00:13:25,620 --> 00:13:31,139
expectations needs to be absolutely convergent and all of these sums need to be

155
00:13:31,139 --> 00:13:35,460
absolutely convergent in order for that kind of rearrangement to make sense.

156
00:13:35,460 --> 00:13:41,419
So remember that absolute convergence means that the sum of the absolute

157
00:13:41,419 --> 00:13:47,979
values of all the terms in the sum converge. So if we look at this definition of

158
00:13:47,979 --> 00:13:52,099
expectation it said it was the sum over all the values in the range. We know

159
00:13:52,099 --> 00:13:56,299
that's accountable sum of the value times the probability that r was equal to

160
00:13:56,299 --> 00:14:01,979
that value. But the very definition never specified the order in which these

161
00:14:01,979 --> 00:14:07,019
terms v times probability r equals v got added up. It better not make a difference.

162
00:14:07,019 --> 00:14:13,419
So we're implicitly assuming absolute convergence of this sum in order for

163
00:14:13,419 --> 00:14:17,740
the expectation to even be well defined. As a matter of fact the terrible pathology

164
00:14:17,740 --> 00:14:21,100
that happens and you may have learned about this in first-term calculus and we

165
00:14:21,100 --> 00:14:25,259
actually have a problem in the text about it is that you can have sums like

166
00:14:25,259 --> 00:14:31,259
this that are not absolutely convergent and and then you pick your favorite

167
00:14:31,259 --> 00:14:35,860
value and I can rearrange the terms in the sum so that it converges to that

168
00:14:35,860 --> 00:14:43,980
value. When you're dealing with non-absolute value sums rearranging is a no-no

169
00:14:43,980 --> 00:14:49,820
the sum depends crucially on the order in which the terms appear and all of the

170
00:14:49,820 --> 00:14:53,860
reasoning and probability theory would be an applicable. So we are implicitly

171
00:14:53,860 --> 00:15:01,539
assuming that all of these sums are absolutely convergent. Well just to get

172
00:15:01,539 --> 00:15:05,220
some vocabulary in place the expected value is also known as the mean value

173
00:15:05,220 --> 00:15:12,540
or the mean or the expectation of the random variable. Now let's connect up

174
00:15:12,540 --> 00:15:17,340
expectations with averages in a more precise way. We said that the expectation

175
00:15:17,340 --> 00:15:21,220
was kind of an abstraction of averages but it's more intimately connected to

176
00:15:21,220 --> 00:15:24,779
averages than that even. Let's take an example where suppose you have a pile of

177
00:15:24,779 --> 00:15:31,019
graded exams and you pick one at random. Let's let s be the score of the randomly

178
00:15:31,019 --> 00:15:37,620
picked exam. So I'm turning this process, this random process of picking an

179
00:15:37,620 --> 00:15:43,419
exam from the graph, from the pile, is defining a random variable s where by

180
00:15:43,419 --> 00:15:48,179
definition of picking one at random I mean uniformly. So s is actually not a

181
00:15:48,179 --> 00:15:52,259
uniform random variable but I'm picking the exams with equal probability and

182
00:15:52,259 --> 00:15:58,620
then they have different scores. So the outcomes are of uniform probability but

183
00:15:58,620 --> 00:16:02,820
s is not because there might be a lot of outcomes, a lot of exams with the

184
00:16:02,820 --> 00:16:07,779
same score. Alright, s is a random variable defined by this process of picking a

185
00:16:07,779 --> 00:16:12,860
random exam. So and then you can just check that the expectation of s now

186
00:16:12,860 --> 00:16:18,580
exactly equals the average exam score which is the typical thing that students

187
00:16:18,580 --> 00:16:22,940
want to know when the exam is done, what's the average score? Actually the average

188
00:16:22,940 --> 00:16:27,659
score is often less informative than median score, the middle score, but people

189
00:16:27,659 --> 00:16:31,860
somehow rather always want to know about the averages. The reason why the average

190
00:16:31,860 --> 00:16:37,339
may not be so informative is because it has some weird properties that are

191
00:16:37,339 --> 00:16:43,139
little straight in a second but the point here of what we did where we took the

192
00:16:43,139 --> 00:16:50,620
we got at the average score on the exam by defining a random variable based on

193
00:16:50,620 --> 00:16:56,659
picking a random exam. So that's a general process. We can estimate averages in

194
00:16:56,659 --> 00:17:02,899
some population of things by estimating the expectations of random

195
00:17:02,899 --> 00:17:08,220
variables based on picking random elements from the thing that we're

196
00:17:08,220 --> 00:17:12,740
averaging over. That's called sampling and it's a basic idea of probability

197
00:17:12,740 --> 00:17:20,099
theory that we're going to be able to get a hold of averages by abstracting the

198
00:17:20,099 --> 00:17:26,299
calculation of an average into taking defining a random variable and

199
00:17:26,299 --> 00:17:32,859
calculating its expectation. Let's look at an example. It's obviously impossible

200
00:17:32,859 --> 00:17:37,139
for all the exams to be above average because then the average would be above

201
00:17:37,139 --> 00:17:41,419
average. That's absurd. So if you translate that into a formal statement about

202
00:17:41,419 --> 00:17:45,659
expectations it translates directly by the way. I don't know how many of you

203
00:17:45,660 --> 00:17:50,620
listened to the Prairie Home Companion but one of the sign-offs there is at

204
00:17:50,620 --> 00:17:55,019
the town of Lake Wobegon in Wisconsin where all the children are above average.

205
00:17:55,019 --> 00:18:01,380
Well, take possible. That translates into this technical statement that the

206
00:18:01,380 --> 00:18:07,220
probability that a random variable is greater than its expected value is less

207
00:18:07,220 --> 00:18:14,460
than one. It can't always be greater than its expected value. That's absurd.

208
00:18:14,460 --> 00:18:21,100
On the other hand, it's actually possible for the probability that the random

209
00:18:21,100 --> 00:18:25,579
variable is bigger than its expected value to be as close to one as you want.

210
00:18:25,579 --> 00:18:31,779
One way to think about that is that for example almost everyone has an above

211
00:18:31,779 --> 00:18:36,299
average number of fingers. Think about that for a second. Almost everyone has an

212
00:18:36,299 --> 00:18:40,380
above average number of fingers. Well, the explanation is really simple. It's

213
00:18:40,380 --> 00:18:48,660
simply because amputation is much more common than polydactylism. And if you can't

214
00:18:48,660 --> 00:18:52,860
understand what I just said, look it up and think about it.

