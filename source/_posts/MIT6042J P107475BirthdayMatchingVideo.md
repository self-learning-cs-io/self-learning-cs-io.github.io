---
title: MIT6042J P107475BirthdayMatchingVideo
---

1
00:00:00,000 --> 00:00:09,000
Now you may remember a discussion of the birthday paradox, which says that if you have a group

2
00:00:09,000 --> 00:00:16,399
of 27 random people, the probability is almost two thirds that some two of them are going

3
00:00:16,399 --> 00:00:22,960
to have a matching birthday, even though there are 365 birthdays in the year, and you might

4
00:00:22,960 --> 00:00:30,039
simply think that with 27 people there'd only be a 27 out of 365 or some chance like that,

5
00:00:30,039 --> 00:00:32,120
it's actually two thirds.

6
00:00:32,120 --> 00:00:37,120
And by the time you get to a class of 110, which is what we'll be, we have data for and

7
00:00:37,120 --> 00:00:41,760
we're going to be looking at, it turns out that the odds are almost three quarters of a

8
00:00:41,760 --> 00:00:46,719
million to one that you'll have a couple of people with matching birthdays.

9
00:00:46,719 --> 00:00:50,320
So let's look at the matching birthday problem a little bit more today.

10
00:00:50,320 --> 00:00:54,320
And the reason we're looking at it is because it's a lovely example where there really

11
00:00:54,320 --> 00:00:58,039
is pairwise independence and not mutual independence.

12
00:00:58,039 --> 00:01:04,359
So it's reinforcing the key idea behind the additivity of variance and the pairwise independence

13
00:01:04,359 --> 00:01:05,359
sampling theorem.

14
00:01:05,359 --> 00:01:08,599
We're not going to use the sampling theorem here, but just pairwise independence, but it's

15
00:01:08,599 --> 00:01:09,599
worth looking at.

16
00:01:09,599 --> 00:01:13,920
Now before I go further, let me mention that this, the birthday problem is just what we're

17
00:01:13,920 --> 00:01:21,200
doing for fun, but in fact, it has some real applications in, within one area, but the

18
00:01:21,200 --> 00:01:25,760
most famous one is the so-called birthday attack on a crypto system, which involves being

19
00:01:25,760 --> 00:01:32,480
able to search for matching pairs of keys with a relatively small sample.

20
00:01:32,480 --> 00:01:36,320
And you're very likely to find at least some two that match.

21
00:01:36,320 --> 00:01:43,320
So with that motivation claimed, but not examined, let's just go back to thinking about birthdays.

22
00:01:44,319 --> 00:01:49,599
So let's suppose that I have some group of N people and there are D days in the year just

23
00:01:49,599 --> 00:01:55,000
to keep the parameters abstract and not get too stuck on the numbers, keeping the parameters,

24
00:01:55,000 --> 00:01:57,519
makes it actually a bit clearer to reason about.

25
00:01:57,519 --> 00:02:04,039
So we're implicitly assuming here that each person is kind of a random variable or a random

26
00:02:04,039 --> 00:02:07,319
choice of a birthday.

27
00:02:07,319 --> 00:02:14,599
So each of these people are really random variables that return the value of a birthday.

28
00:02:14,599 --> 00:02:18,280
And as a matter of fact, we're going to assume that all the birthdays are equally likely.

29
00:02:18,280 --> 00:02:19,560
Real birthdays aren't there.

30
00:02:19,560 --> 00:02:22,919
They tend to be, January tends to be a popular month.

31
00:02:22,919 --> 00:02:27,240
November tends to be a more popular month than other times.

32
00:02:27,240 --> 00:02:33,400
But let's ignore that because if the applications in crypto, things really are uniform and it

33
00:02:33,400 --> 00:02:39,400
makes our analysis still plausible, but easy if we assume that birthdays are equally likely.

34
00:02:39,400 --> 00:02:40,400
Okay.

35
00:02:40,400 --> 00:02:46,800
Pay is the number of pairs of birthdays that match in this population of N people.

36
00:02:46,800 --> 00:02:47,800
Okay.

37
00:02:47,800 --> 00:02:52,000
Let's get a grip on P by thinking of it as a sum of indicator variables.

38
00:02:52,000 --> 00:02:57,200
So let's let MIGA be the indicator variable that the I think J's people among the N have

39
00:02:57,200 --> 00:02:59,599
a matching birthday.

40
00:02:59,599 --> 00:03:06,799
Well, the number of matching birthdays is then simply the sum over all the possible pairs

41
00:03:06,799 --> 00:03:10,799
of people of whether or not they have a matching birthday.

42
00:03:10,799 --> 00:03:14,199
It's the sum of these indicator variables, MIGA.

43
00:03:14,199 --> 00:03:18,599
And the number of these indicator variables is of course all the ways of choosing to out

44
00:03:18,599 --> 00:03:20,719
of N people.

45
00:03:20,719 --> 00:03:27,359
So in short, if I look at the expectation of MIGA, let's think about that for a minute.

46
00:03:27,360 --> 00:03:30,360
We're assuming that all the birthdays are equally likely.

47
00:03:30,360 --> 00:03:33,520
And so I'm asking whether the I think the J's people have the same birthday.

48
00:03:33,520 --> 00:03:38,360
Well, whatever the I think person's birthday turns out to be, let's say it's November

49
00:03:38,360 --> 00:03:46,000
5th, the J's person who has a uniform probability of equaling any birthday still has a uniform

50
00:03:46,000 --> 00:03:47,000
probability.

51
00:03:47,000 --> 00:03:52,240
One chance indeed of equaling November 5th, which happens to be my birthday.

52
00:03:52,240 --> 00:03:53,240
Okay.

53
00:03:53,240 --> 00:03:59,400
And short, the probability that any two people have a matching birthday is one chance

54
00:03:59,400 --> 00:04:00,719
indeed.

55
00:04:00,719 --> 00:04:06,520
And that means that the expectation of the indicator variable for that event, MIGA, is 1 over

56
00:04:06,520 --> 00:04:12,800
D. And that tells us by linearity of expectation that the expected number of pairs is simply

57
00:04:12,800 --> 00:04:19,139
the number of those pairs times the expected number per pair and choose 2 times 1 over

58
00:04:19,139 --> 00:04:20,139
D.

59
00:04:20,539 --> 00:04:23,259
Well, as I said, we have data for 110 students.

60
00:04:23,259 --> 00:04:31,259
So the expected number of pairs in a collection of a student body of 110 is 110 choose 2 times

61
00:04:31,259 --> 00:04:40,779
1 over 365 or about 16.4 pairs is the expected number of pairs of matching birthdays.

62
00:04:40,779 --> 00:04:42,279
Okay.

63
00:04:42,279 --> 00:04:44,180
Now that's an expected value.

64
00:04:44,180 --> 00:04:49,379
How likely is it to be if I take a selection of 110 students and I count how many pairs

65
00:04:49,379 --> 00:04:50,879
of birthdays are there?

66
00:04:50,879 --> 00:04:54,500
Do I really expect to get close to 16.4 or not?

67
00:04:54,500 --> 00:05:01,579
Well, what we're asking for is the probability that P is near its mean, that the distance between

68
00:05:01,579 --> 00:05:09,620
P and 16.4 is greater than K. I hope that as K gets bigger, this probability is small.

69
00:05:09,620 --> 00:05:17,459
And so I'm really quite likely to have close to 16.4 birthdays in the sample of 110.

70
00:05:17,459 --> 00:05:21,339
But this probability is one that's a mess to calculate.

71
00:05:21,339 --> 00:05:27,859
But we can get a grip on it because the variance of P is easy to calculate and that will allow

72
00:05:27,859 --> 00:05:33,379
us to apply the Chubby-Chief bound and get some kind of an estimate on the likelihood

73
00:05:33,379 --> 00:05:37,779
that P is near its expectation.

74
00:05:37,779 --> 00:05:46,019
So the key observation that we need is that the indicator variables are pairwise independent.

75
00:05:46,019 --> 00:05:50,799
So let's think about the indicator variable for the event that the Ithin and the Jth people

76
00:05:50,799 --> 00:05:51,799
have the same birthday.

77
00:05:51,799 --> 00:05:53,740
Let's call them Albert and Drew.

78
00:05:53,740 --> 00:05:56,779
So Albert's the Ith person, Drew is the Jth person.

79
00:05:56,779 --> 00:06:01,259
And I'm interested in the event that Albert and Drew have the same birthday.

80
00:06:01,259 --> 00:06:05,819
And let's compare that to another pair of people and whether or not they have the same

81
00:06:05,819 --> 00:06:06,819
birthday.

82
00:06:06,819 --> 00:06:08,620
So let's first of all think about David Mike.

83
00:06:08,620 --> 00:06:10,740
Whether David Mike have the same birthday.

84
00:06:10,740 --> 00:06:14,459
And I want to know are these two events independent?

85
00:06:14,459 --> 00:06:19,219
Well remember we are assuming that Albert's birthday is independent of Drew's birthday

86
00:06:19,219 --> 00:06:21,779
is independent of David's independence of Mike.

87
00:06:21,779 --> 00:06:27,019
Each of the people is supposedly chosen independently and their birthdays are independently

88
00:06:27,019 --> 00:06:28,419
are independent.

89
00:06:28,419 --> 00:06:33,500
So it's obvious that these two pairs that don't overlap have nothing to do with each other.

90
00:06:33,500 --> 00:06:34,740
And we don't have to worry about them.

91
00:06:34,740 --> 00:06:40,019
You could prove that formally but it is obvious because each of the individual birthdays

92
00:06:40,019 --> 00:06:42,459
are independent.

93
00:06:42,459 --> 00:06:48,579
Now what's more interesting is the case when I ask whether or not Albert and Drew having

94
00:06:48,579 --> 00:06:53,579
the same birthday is independent of Albert and Mike having the same birthday.

95
00:06:53,579 --> 00:06:55,419
And that one is not so obvious.

96
00:06:55,419 --> 00:07:00,179
Here's a way to think about what could go wrong.

97
00:07:00,179 --> 00:07:03,500
Suppose that in fact the birthdays weren't uniform.

98
00:07:03,500 --> 00:07:06,019
Suppose that some birthday was more common than others.

99
00:07:06,019 --> 00:07:07,019
Okay.

100
00:07:07,019 --> 00:07:11,179
That makes it more likely that if Albert and Drew have the same birthday.

101
00:07:11,180 --> 00:07:17,220
It slants things so that they are more likely to have this very common birthday than they

102
00:07:17,220 --> 00:07:20,459
would have been otherwise.

103
00:07:20,459 --> 00:07:26,500
And now once I know that they match and therefore are more likely to have the common birthday

104
00:07:26,500 --> 00:07:28,899
than they would have without any information.

105
00:07:28,899 --> 00:07:34,379
I know that Albert is more likely to have this common birthday than otherwise.

106
00:07:34,379 --> 00:07:40,379
And that means that Mike is even more likely to match Albert because Albert's got the common

107
00:07:40,379 --> 00:07:47,899
birthday than Mike was to match Albert without any further information about what Albert's

108
00:07:47,899 --> 00:07:48,899
likely birthday was.

109
00:07:48,899 --> 00:07:52,459
You can think about that and it can be worked out numerically easily enough.

110
00:07:52,459 --> 00:07:57,540
So uniformity is going to be a crucial factor here in order to conclude that Albert and

111
00:07:57,540 --> 00:08:05,259
Drew and Albert and Mike are mutually independent events.

112
00:08:05,259 --> 00:08:06,579
But let's go back and think about it.

113
00:08:06,579 --> 00:08:10,579
What we really need is that Mike is uniform in order to conclude that these two events

114
00:08:10,579 --> 00:08:15,620
are independent because we know that Mike and Drew and Albert separately are independent

115
00:08:15,620 --> 00:08:16,620
of each other.

116
00:08:16,620 --> 00:08:18,379
Their birthdays are chosen independently.

117
00:08:18,379 --> 00:08:23,939
So that intuitively means that the probability that Mike has any given birthday doesn't really

118
00:08:23,939 --> 00:08:27,579
matter what's going on with Albert and Drew because Mike is independent of Albert and

119
00:08:27,579 --> 00:08:28,579
Drew.

120
00:08:28,579 --> 00:08:35,939
And if we know that Mike's probability of having a birthday is uniform then whatever the

121
00:08:35,940 --> 00:08:41,540
birthday that Albert has, whether he matches Drew or not, Mike has a one chance in the

122
00:08:41,540 --> 00:08:46,940
of hitting the same birthday as whatever Albert wound up having.

123
00:08:46,940 --> 00:08:52,100
And that means that the probability that Mike matches Albert is the same one overdue

124
00:08:52,100 --> 00:08:56,420
than it would have been if we had no further information.

125
00:08:56,420 --> 00:09:01,460
This is an argument that in fact is made rigorous in some class problems and a problem set

126
00:09:01,540 --> 00:09:08,139
but let's just take it as plausible enough based on this hand waving argument that I

127
00:09:08,139 --> 00:09:13,700
articulated that these two events are independent pairwise.

128
00:09:13,700 --> 00:09:22,379
And so the corresponding indicator variables, M, Albert, Drew and M, Albert, Mike are independent

129
00:09:22,379 --> 00:09:23,860
of each other.

130
00:09:23,860 --> 00:09:24,860
Yep.

131
00:09:24,860 --> 00:09:26,100
So that's what we've argued.

132
00:09:26,100 --> 00:09:30,500
But notice that these events of pairwise matching are certainly not three-way independent

133
00:09:30,500 --> 00:09:34,379
because after all, if I know that Albert and Drew have the same birthday and that Albert

134
00:09:34,379 --> 00:09:38,340
and Mike have the same birthday, I absolutely know with certainty that Drew and Mike have

135
00:09:38,340 --> 00:09:39,500
the same birthday.

136
00:09:39,500 --> 00:09:45,779
So this is a very nice basic example where you have pairwise independence but not three-way

137
00:09:45,779 --> 00:09:53,659
independence assuming that all of these random variables Albert, Drew and Mike are uniform

138
00:09:53,659 --> 00:09:56,460
in what birthday they have.

139
00:09:56,460 --> 00:09:57,460
Okay.

140
00:09:57,460 --> 00:09:59,700
So let's go back to counting birthdays.

141
00:09:59,700 --> 00:10:03,020
The variance of an indicator is PQ.

142
00:10:03,020 --> 00:10:09,460
So in this case, P is 1 over 365 and Q is 1 minus 1 over 365.

143
00:10:09,460 --> 00:10:17,540
And because of pairwise independence, the variance of P, which is the sum of the MIJ, is the variance

144
00:10:17,540 --> 00:10:23,340
of the number of birthday pairs, is the sum of those variances.

145
00:10:23,340 --> 00:10:32,019
It's 110 choose 2 times the variance of the MIJ turns out to be about 16.37, which means

146
00:10:32,019 --> 00:10:36,820
that the standard deviation sigma is less than 4.

147
00:10:36,820 --> 00:10:47,660
Now I can apply Chev HF because by the Chev HF band, the probability that 16.4 is within

148
00:10:47,660 --> 00:10:52,500
is further away than 2 sigma is only one chance in 4, which means the probability that it's

149
00:10:52,500 --> 00:10:59,000
within 2 sigma that the actual number of measured pairs is within 2 sigma of the expected

150
00:10:59,000 --> 00:11:06,179
number 16.4 is greater than 1 minus a quarter or 3 quarters.

151
00:11:06,179 --> 00:11:13,980
There's a 3 quarters chance that the number of pairs that we find is within 2 sigma of

152
00:11:13,980 --> 00:11:16,460
the expected number 16.4.

153
00:11:16,460 --> 00:11:24,420
Sigma was about 4, so this is 8, which means that we're expecting with 3 quarters probability,

154
00:11:24,420 --> 00:11:31,220
somewhere between 8.4 meaning 9 and 24.4 meaning 25 pairs.

155
00:11:31,220 --> 00:11:34,740
So 75% of the time in a class of 110.

156
00:11:34,740 --> 00:11:40,620
We're going to find between 9 and 25 pairs of birthdays.

157
00:11:40,620 --> 00:11:41,620
Did that actually happen?

158
00:11:41,620 --> 00:11:43,100
Well, it did.

159
00:11:43,100 --> 00:11:49,220
In our class of 110 for whom we had data, we actually found 21 pairs of matching birthdays.

160
00:11:49,220 --> 00:11:55,980
Literally, we found 12 pairs and 3 triples, but each triple counts as 3 matching pairs.

161
00:11:55,980 --> 00:11:59,540
And there they are, the blues or triples.

162
00:11:59,540 --> 00:12:03,500
And you can see whether your birthday is among those and knowing that you have a classmate

163
00:12:03,500 --> 00:12:07,019
or two that have the same birthday that you do.

164
00:12:07,019 --> 00:12:12,460
So there are 15 different birthdays, but they count as 21 pairs because it's 12 single

165
00:12:12,460 --> 00:12:16,420
pairs and 3 triplets each of which counts for 3 pairs.

