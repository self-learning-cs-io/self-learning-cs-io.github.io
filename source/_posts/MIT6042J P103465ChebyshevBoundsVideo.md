---
title: MIT6042J P103465ChebyshevBoundsVideo
---

1
00:00:00,000 --> 00:00:05,560
Our topic is deviation from the mean, meaning the probability that a random variable

2
00:00:05,560 --> 00:00:10,919
returns a value that differs significantly from its mean. Now the Markov bound

3
00:00:10,919 --> 00:00:18,719
gave you a coarse bound on the probability that r was overly large using very

4
00:00:18,719 --> 00:00:22,480
little information about r. Not surprisingly if you know a little bit more about

5
00:00:22,480 --> 00:00:27,039
the distribution of r than simply that it's not negative, you can state tighter

6
00:00:27,039 --> 00:00:33,879
bounds. And this was noticed by a mathematician named Chebcichev and he has a

7
00:00:33,879 --> 00:00:38,240
bound called the Chebcichev bound. Now it's interesting that the Markov bound

8
00:00:38,240 --> 00:00:43,840
even though it's very weak and seems not very useful, the Chebcichev bound

9
00:00:43,840 --> 00:00:47,599
which generally gives you a significantly stronger and valueably stronger

10
00:00:47,599 --> 00:00:51,840
bound on the probability that a random variable differs much from its mean is

11
00:00:51,840 --> 00:00:56,719
actually a trivial corollary of Markov's theorem. So it's just a very

12
00:00:56,719 --> 00:01:01,759
simple ingenious way to use Markov's bound to derive Chebcichev's bound. And

13
00:01:01,759 --> 00:01:08,560
let's look at how. So we're interested in the probability that a random variable

14
00:01:08,560 --> 00:01:13,120
r differs from its mean by an amount x. The distance between r and its mean the

15
00:01:13,120 --> 00:01:17,340
absolute value of r minus mu is greater or equal to x. We're trying to get a

16
00:01:17,340 --> 00:01:23,879
grip on that probability as a function of x. Now the point is that the event that

17
00:01:23,879 --> 00:01:29,920
the distance between r and its mean is greater or equal to x. Another way to

18
00:01:29,920 --> 00:01:35,039
say that is to square both sides of this inequality. It says that the event

19
00:01:35,039 --> 00:01:40,840
that r minus mu squared is greater or equal to x squared happens. These two

20
00:01:40,840 --> 00:01:43,840
events are just different ways of saying the same thing. So therefore their

21
00:01:43,840 --> 00:01:50,479
probabilities are equal trivially. Now what's nice about this is of course that r

22
00:01:50,480 --> 00:01:55,439
minus mu squared is a non-negative random variable to which Markov's theorem

23
00:01:55,439 --> 00:02:01,000
applies. The square of a real number is always going to be non-negative. So

24
00:02:01,000 --> 00:02:06,040
let's just apply Markov's theorem to this new random variable r minus mu

25
00:02:06,040 --> 00:02:13,240
squared. And what does Markov's bound tell us about this probability that the

26
00:02:13,240 --> 00:02:18,040
square variable is greater or equal to an amount x squared. Well just plug in

27
00:02:18,039 --> 00:02:25,239
Markov and it tells you that this probability that the square variable is bigger

28
00:02:25,239 --> 00:02:34,079
than a x squared, then it says big is x squared is simply the expectation of that

29
00:02:34,079 --> 00:02:39,439
squared variable divided by x squared. This is just applying Markov's bound to

30
00:02:39,439 --> 00:02:46,759
this variable r minus mu squared. Now this numerator is a weird thing to stare at

31
00:02:46,759 --> 00:02:51,879
expectation of r minus mu squared and may not seem very memorable but you

32
00:02:51,879 --> 00:02:54,799
should remember it because it's so important that has a million main

33
00:02:54,799 --> 00:02:59,000
all its own. It's called the variance of r and this is an extra bit of

34
00:02:59,000 --> 00:03:04,039
information about the shape of the distribution of r that turns out to allow

35
00:03:04,039 --> 00:03:10,280
you to state much more powerful theorems in general about the probability that r

36
00:03:10,280 --> 00:03:16,519
deviates from its mean by a given amount. So we could just restate the Chebyshev

37
00:03:16,520 --> 00:03:21,960
bound just replacing that expectation formula in terms of its name, variance of r.

38
00:03:21,960 --> 00:03:26,439
This is what the Chebyshev bound says. The probability that the different distance

39
00:03:26,439 --> 00:03:30,840
between r and its mean is greater than or equal to x is the variance of r divided by

40
00:03:30,840 --> 00:03:36,320
x squared where variance of r is the expectation of the square of r minus mu.

41
00:03:36,320 --> 00:03:41,719
Now the very important aspect, technical aspect of the Chebyshev bound is that

42
00:03:41,719 --> 00:03:48,199
we're getting an inverse square reduction in the probability. Remember with Markov,

43
00:03:48,199 --> 00:03:54,800
the denominator was behaving linearly and here it behaves quadratically. So these

44
00:03:54,800 --> 00:04:00,800
bounds get smaller much more rapidly as we ask about the probability of

45
00:04:00,800 --> 00:04:07,240
differing by a larger amount. The variance of r maybe a way that will help you

46
00:04:07,240 --> 00:04:11,159
remember it is to remember another name that it has. It's called the mean square

47
00:04:11,159 --> 00:04:17,439
error. If you think of r minus mu as the error that r is making in how much

48
00:04:17,439 --> 00:04:22,159
it differs from what it would be then and we square it and then we take the

49
00:04:22,159 --> 00:04:30,719
average so we're taking the mean of the squared errors and here we're back to

50
00:04:30,719 --> 00:04:36,959
restating the Markov bound in terms of the variance. The variance has one

51
00:04:36,959 --> 00:04:41,879
difficulty with it and that leads us to want to look at another object which is

52
00:04:41,879 --> 00:04:45,879
just the square root of the variance called the standard deviation. So you wonder

53
00:04:45,879 --> 00:04:49,399
why I mean if you understand variance what's the point of taking the square root

54
00:04:49,399 --> 00:04:54,879
and working with that and the answer is simply that the if you think of r as a

55
00:04:54,879 --> 00:04:59,319
random variable whose values have some dimension like its seconds or dollars

56
00:04:59,319 --> 00:05:06,199
then r the variance of r is the expectation of a square variable of r minus mu

57
00:05:06,199 --> 00:05:11,439
squared which means its units are second squared or dollar squared or whatever

58
00:05:11,439 --> 00:05:19,199
and the variance of r itself is a squared value which is not reflecting the

59
00:05:19,199 --> 00:05:24,719
magnitude of the distance that you expect of the kind of errors that you expect

60
00:05:24,719 --> 00:05:29,759
to make the distance that you expect r to be from its mean. So we can get the

61
00:05:29,759 --> 00:05:36,120
units of this quantity back into matching the units of r and also get a

62
00:05:36,120 --> 00:05:40,159
number that's closer to the kind of variance that you'd expect to observe by

63
00:05:40,159 --> 00:05:44,920
just taking the square root and it's called the standard deviation of r. If it

64
00:05:44,920 --> 00:05:48,519
helps you and the standard deviation is also called the root mean square error

65
00:05:48,519 --> 00:05:52,639
and you might have heard that phrase it comes up all the time and discussions of

66
00:05:52,639 --> 00:05:58,519
experimental error. So again we're taking the error means the distance between the

67
00:05:58,519 --> 00:06:04,439
random variable and its mean. With squaring it we're taking its the expectation of

68
00:06:04,439 --> 00:06:08,959
that squared error and then we're taking the square root of it. It's the standard

69
00:06:08,959 --> 00:06:15,839
deviation. So going back to understand what the standard deviation means intuitively

70
00:06:15,839 --> 00:06:20,680
in terms of a familiar shaped distribution function for random variable r.

71
00:06:20,680 --> 00:06:25,779
Suppose that r is a random variable that has this fairly standard kind of bell

72
00:06:25,779 --> 00:06:31,779
curved shape or Gaussian shape that it's got one hump. It's a unimodal and it

73
00:06:31,779 --> 00:06:37,579
kind of trails off with some moderate rate as you get further and further away

74
00:06:37,579 --> 00:06:41,979
from the mean. Well the mean of a distribution that's shaped like this it's

75
00:06:41,979 --> 00:06:47,859
symmetric around that high point is that's going to be the mean by symmetry.

76
00:06:47,859 --> 00:06:52,859
It's equally likely to be well the value is average out to this middle value.

77
00:06:52,860 --> 00:06:59,620
The standard deviation in a for a curve like this is going to be an interval that you

78
00:06:59,620 --> 00:07:04,620
can interpret as an interval around the mean and the probability that you're

79
00:07:04,620 --> 00:07:11,060
within that interval is fairly high for standard distributions. We'll see that

80
00:07:11,060 --> 00:07:15,020
the Chemi-Gembaan is not going to tell us much about for an arbitrary

81
00:07:15,020 --> 00:07:18,860
unknown distribution but in general for the typical distributions you expect to

82
00:07:18,860 --> 00:07:23,220
find that the standard deviation tells you that that's where you're most likely

83
00:07:23,220 --> 00:07:29,360
to be when you take a random value of the variable. So let's return to the

84
00:07:29,360 --> 00:07:33,819
Chemi-Gembaan as we've stated it and I'm just replacing here. I'm restating the

85
00:07:33,819 --> 00:07:38,379
Chemi-Gembaan just replacing the variance of r in the numerator by the square of

86
00:07:38,379 --> 00:07:43,980
its square root by sigma squared r. It's a useful way to restate it because by

87
00:07:43,980 --> 00:07:48,620
restating it this way it motivates another reformulation of the Chemi-Gembaan

88
00:07:48,620 --> 00:07:53,060
as we reformulated the Markov bound previously in terms of a multiple of

89
00:07:53,060 --> 00:07:58,780
something. I'm going to replace x by a constant times the standard deviation. So

90
00:07:58,780 --> 00:08:02,420
I'm going to see the probability that the error is greater than or equal to a

91
00:08:02,420 --> 00:08:07,019
constant times the standard deviation and this term is going to simplify. Once x is

92
00:08:07,019 --> 00:08:11,660
is a constant times the standard deviation the standard deviations are going to

93
00:08:11,660 --> 00:08:16,220
cancel out and I'm just going to wind up with one over x squared. So let's just

94
00:08:16,220 --> 00:08:26,900
do that and there's the formula. The probability that the distance of r from its

95
00:08:26,900 --> 00:08:32,139
mean is greater than or equal to a multiple c of its standard deviation is less

96
00:08:32,139 --> 00:08:38,180
than or equal to 1 over c squared. So it's getting much more rapidly smaller as

97
00:08:38,180 --> 00:08:45,540
c grows. Let's look at what that means for just some numbers to make the thing a

98
00:08:45,539 --> 00:08:50,539
little bit more real. What this assertion is telling us is that r is probably

99
00:08:50,539 --> 00:08:55,980
not going to return a value that's a significant multiple of its standard

100
00:08:55,980 --> 00:09:01,299
deviation. For example what does this formula tell us about the probability that

101
00:09:01,299 --> 00:09:07,459
r is going to be greater than or equal to 1 standard deviation away from its

102
00:09:07,459 --> 00:09:10,139
mean. Well it actually tells us nothing that's the case in which it's no good

103
00:09:10,139 --> 00:09:13,860
because c is 1. It's just telling us that the probability is the most one which

104
00:09:13,860 --> 00:09:17,740
we always know because probabilities are the most one. But if I ask what's the

105
00:09:17,740 --> 00:09:24,019
probability that the mean if the error of r is greater than or equal to twice the

106
00:09:24,019 --> 00:09:27,659
standard deviation then this theorem is telling me something non-trivial. It's

107
00:09:27,659 --> 00:09:31,300
telling me that the probability that it's twice the deviation is 1 over 2

108
00:09:31,300 --> 00:09:36,139
squared or 1 quarter. An arbitrary random variable with standard deviation

109
00:09:36,139 --> 00:09:41,700
sigma is going to exceed twice the error is going to exceed twice the standard

110
00:09:41,700 --> 00:09:44,820
deviation of most a quarter of the time. Three times at most a ninth of the

111
00:09:44,820 --> 00:09:50,420
time, four times at most a sixteenth of the time. So the qualitative message to

112
00:09:50,420 --> 00:09:55,140
take away is that for any random variable whatsoever as long as it has a

113
00:09:55,140 --> 00:10:00,379
standard deviation sigma then you can say some definite things about the

114
00:10:00,379 --> 00:10:06,660
probability that the random variable is going to take a value that differs by

115
00:10:06,659 --> 00:10:12,659
a large multiple of the standard deviation from its mean that probability is

116
00:10:12,659 --> 00:10:17,759
going to be small and get smaller and rapidly smaller as the multiple of the

117
00:10:17,759 --> 00:10:21,539
standard deviation continues.

