---
title: MIT6042J P106473IndependentSamplingTheoremVideo
---

1
00:00:00,000 --> 00:00:04,540
Now we're ready to prove the law of large numbers and while we're at it to get a

2
00:00:04,540 --> 00:00:09,720
quantitative version which would be the basis for theory of sampling and estimation.

3
00:00:09,720 --> 00:00:16,059
So let's remember that the law of large numbers says that if you have n

4
00:00:16,059 --> 00:00:23,000
independent identically distributed random variables with mean mu and we let

5
00:00:23,000 --> 00:00:28,679
a and b their average then for every positive number delta the probability

6
00:00:28,679 --> 00:00:35,039
that the average differs from the mean by more than delta goes to zero as the

7
00:00:35,039 --> 00:00:40,019
number of trials increases. Remember that means that if you tell me what you

8
00:00:40,019 --> 00:00:45,960
think close means and what you think very likely means then I can guarantee

9
00:00:45,960 --> 00:00:53,120
that by doing enough trials the likelihood that the mean will be that close

10
00:00:53,120 --> 00:00:58,079
to the average within will be outside the tolerance is as small as you

11
00:00:58,079 --> 00:01:04,120
thought small should be and we're ready for the proof but in the proof there's

12
00:01:04,120 --> 00:01:07,959
one extra fact that we're going to use that we didn't explicitly mention which

13
00:01:07,959 --> 00:01:12,840
is that not only are all of these random variables identically distributed and

14
00:01:12,840 --> 00:01:16,680
independent but we're actually going to assume that they have a variance. Now

15
00:01:16,680 --> 00:01:21,719
not every random variable has a finite variance even if it has a finite mean

16
00:01:21,719 --> 00:01:24,920
in fact there are random variables that don't even have finite means and we'll

17
00:01:24,920 --> 00:01:31,079
look at them on the last type of class but so we're going to explicitly assume

18
00:01:31,079 --> 00:01:36,719
that all of these random variables have the same variance namely the standard

19
00:01:36,719 --> 00:01:41,960
deviation sigma squared and we'll be using that fact in the proof. All right now

20
00:01:41,960 --> 00:01:46,520
the first question to ask is what is the expectation of the average and the

21
00:01:46,520 --> 00:01:50,060
expectation of the average is simply the expectation let's prove that the

22
00:01:50,060 --> 00:01:53,640
expectation of the average is by definition the expectation of the sum of the

23
00:01:53,640 --> 00:02:02,359
R's over n and by additivity of expectation that's the sum of the expectation of

24
00:02:02,359 --> 00:02:08,199
each of the R's over n but each of them has expectation mu so the numerator is

25
00:02:08,199 --> 00:02:13,159
n mu and the n's cancel and so and sure enough the average has the same

26
00:02:13,159 --> 00:02:20,840
expectation as each of the individual variables each of the trials. Now that

27
00:02:20,840 --> 00:02:26,960
lets us apply the Chebyechev bound to the random variable a n because now we

28
00:02:26,960 --> 00:02:31,480
know what its mean is and its mean is independent of n we can ask and we can

29
00:02:31,480 --> 00:02:36,680
apply Chebyechev to the probability that the average of n trials differs from

30
00:02:36,680 --> 00:02:41,599
its mean by more than delta and according to Chebyechev that's bounded by

31
00:02:41,599 --> 00:02:49,400
the variance of the average divided by n squared. So I will have proved the

32
00:02:49,400 --> 00:02:54,920
law of large numbers if I can prove that the limit as n approaches infinity of

33
00:02:54,920 --> 00:02:59,060
the variance goes to zero because that means that the right hand side will be

34
00:02:59,060 --> 00:03:03,360
going to zero over delta squared namely going to zero which is what the law of

35
00:03:03,360 --> 00:03:08,800
large numbers says. So we've reduced the proof of the law of large numbers to

36
00:03:08,800 --> 00:03:14,240
proving that the variance goes to zero as n approaches infinity where a n is

37
00:03:14,240 --> 00:03:21,120
the average of n identically distributed variables with common mean mu and

38
00:03:21,120 --> 00:03:27,760
standard deviation sigma. Well let's calculate the variance of a n. A n again is

39
00:03:27,760 --> 00:03:33,580
the is the average the sum of the r's over n and since we're assuming

40
00:03:33,580 --> 00:03:39,240
independence of the r's the variance sum rule and it just tells us that this is

41
00:03:39,240 --> 00:03:45,320
the sum of the variances. Now if we factor out the r who went over n now this

42
00:03:45,320 --> 00:03:50,879
is a factor of 1 over n times this sum when we factor a constant out of the

43
00:03:50,879 --> 00:03:56,040
variance it squares so the denominator here becomes n squared and that's

44
00:03:56,040 --> 00:04:01,200
critical and the numerator is the sum of the n variances. Now each variance is

45
00:04:01,200 --> 00:04:05,700
sigma squared and we've got n of them so we wind up with n sigma squared over n

46
00:04:05,699 --> 00:04:11,379
squared which is of course equal to sigma squared over n and sigma squared is

47
00:04:11,379 --> 00:04:17,899
a constant and n is going to infinity so sure enough the right hand side goes to

48
00:04:17,899 --> 00:04:23,659
zero as n increases which is all we needed to do to conclude the weak law of

49
00:04:23,659 --> 00:04:28,620
large numbers. Now if we go back and look at this proof the only thing that it

50
00:04:28,620 --> 00:04:34,620
used about the r's was that they had the same mean mu and they actually had the

51
00:04:34,620 --> 00:04:42,139
same variance sigma squared and they that the variances added that was the

52
00:04:42,139 --> 00:04:45,819
key step in the proof that the variance of the sum of the r's was equal to the

53
00:04:45,819 --> 00:04:49,620
sum of the variances. Now, additivity of variances only requires

54
00:04:49,620 --> 00:04:53,060
pairwise independence and didn't even require the hypothesis that they were

55
00:04:53,060 --> 00:04:57,720
mutually independent and it didn't require the previous proof that we went

56
00:04:57,720 --> 00:05:01,699
through did not ever use the fact that the r's had the same distribution that

57
00:05:01,699 --> 00:05:05,579
they need not be identically distributed it was sufficient that they have the

58
00:05:05,579 --> 00:05:09,139
same mean and we can summarize what we really proved when we thought we were

59
00:05:09,139 --> 00:05:13,300
proving the law of large numbers we actually proved a precise quantitative

60
00:05:13,300 --> 00:05:18,300
theorem that says that if r1 through r and r pairwise independent random

61
00:05:18,300 --> 00:05:24,899
variables with the same finite mean mu and variance sigma squared and we let

62
00:05:24,899 --> 00:05:31,859
a and b the average of those r of those n variables then the probability that

63
00:05:31,859 --> 00:05:37,739
the average differs from the mean by more than delta is less than or equal to

64
00:05:37,739 --> 00:05:44,379
this definite number that we derived one over n times sigma over delta squared

65
00:05:44,379 --> 00:05:48,139
and this was what we previously proved when we thought we were just proving the

66
00:05:48,139 --> 00:05:53,579
law of large numbers we actually got this much tighter quantitative theorem. Now

67
00:05:53,579 --> 00:05:59,099
what this tells us here is that now if you tell me what delta is and you tell me

68
00:05:59,099 --> 00:06:04,079
how small you want this to be well I know what I'm given sigma and I and you

69
00:06:04,079 --> 00:06:08,579
give me the delta that you specified and since if you tell me how small you

70
00:06:08,579 --> 00:06:14,199
want this to be I will know how big an n to choose so this tells me how big a

71
00:06:14,199 --> 00:06:20,379
sample I need how many tries I have to make in order to get the probability that

72
00:06:20,379 --> 00:06:24,740
the mean is close within a specified tolerance delta as small as you

73
00:06:24,740 --> 00:06:28,980
specified and that is our independent sampling that's why it's called

74
00:06:28,980 --> 00:06:33,139
independent sampling because we now know how big a sample is needed to

75
00:06:33,139 --> 00:06:38,860
estimate the mean of any random variable with any desired tolerance and any

76
00:06:38,860 --> 00:06:43,500
desired probability or of course the variance has to be finite the tolerance has

77
00:06:43,500 --> 00:06:50,219
to be positive tolerance is delta and the probability has to be less than one.

