---
title: MIT6042J P102463MarkovBoundsVideo
---

1
00:00:00,000 --> 00:00:07,719
The simplest bound that a random variable differs by much from its expectation is due to a guy named Markov

2
00:00:07,719 --> 00:00:12,380
Russian probability theorist, and this is Markov's bound that we're going to talk about.

3
00:00:12,380 --> 00:00:16,080
Let's illustrate it with a memorable example of IQ.

4
00:00:16,080 --> 00:00:24,560
In the MIT context, we may be a radical idea, but IQ was this thing that was invented for intelligence

5
00:00:24,559 --> 00:00:31,519
quotient in the late 19th century, I believe, might have been early 20th.

6
00:00:31,519 --> 00:00:39,320
It was meant as an effort to break the mold at Harvard of hiring the children of wealthy

7
00:00:39,320 --> 00:00:44,320
alumni, and the idea was to have merit-based admissions, and there was going to be some objective

8
00:00:44,320 --> 00:00:50,000
measure that did not depend on social class of the ability that people had, and Harvard

9
00:00:50,000 --> 00:00:54,759
was going to admit students based on merit and their intelligence quotient.

10
00:00:54,759 --> 00:00:59,039
So the original design of the intelligent quotient by a bunch of psychologists was that the

11
00:00:59,039 --> 00:01:07,840
average was supposed to be 100 over the whole population, which, of course, is around here.

12
00:01:07,840 --> 00:01:11,960
There just aren't very many people with an IQ of just 100.

13
00:01:11,960 --> 00:01:15,640
Anyway, let's ask this extreme question.

14
00:01:15,640 --> 00:01:19,040
Yes, there's around the elite universities.

15
00:01:19,040 --> 00:01:25,439
There are a lot of people with IQ is much higher than 100, but what fraction of the population

16
00:01:25,439 --> 00:01:28,560
could possibly have an IQ as high as 300?

17
00:01:28,560 --> 00:01:32,960
Now, I'm not sure that an IQ of as high as 300 has ever been recorded, but we're talking

18
00:01:32,960 --> 00:01:33,960
logically here.

19
00:01:33,960 --> 00:01:38,960
Is it possible for a lot of people to have an IQ of greater than equal to 100?

20
00:01:38,960 --> 00:01:40,760
And the answer is no.

21
00:01:40,760 --> 00:01:46,320
It can't possibly have more than a third of the population have an IQ of 300, because

22
00:01:46,320 --> 00:01:52,719
if more than a third had an IQ of 300, then that third alone would contribute one third

23
00:01:52,719 --> 00:01:56,719
of 300 to the average, which would be greater than 100.

24
00:01:56,719 --> 00:02:04,719
So you can't have more than a third of the population have an IQ of triple the expected

25
00:02:04,719 --> 00:02:06,320
value of the IQ.

26
00:02:06,320 --> 00:02:10,240
So that's the basic bound.

27
00:02:10,240 --> 00:02:11,800
So we can restate it this way.

28
00:02:11,800 --> 00:02:17,240
The probability that a randomly chosen person has an IQ of greater than equal to 100, we

29
00:02:17,240 --> 00:02:23,159
can say is absolutely less than or equal to the expected value of IQ, namely 100 divided

30
00:02:23,159 --> 00:02:25,000
by 300.

31
00:02:25,000 --> 00:02:31,800
And just parameterizing it, if we ask, what's the probability that the IQ is greater

32
00:02:31,800 --> 00:02:38,640
equal to some amount x, it's less than or equal to 100 over x by exactly that reasoning.

33
00:02:38,639 --> 00:02:41,039
And this is basically Markov's bound.

34
00:02:41,039 --> 00:02:46,439
Except there's one implicit fact that we're using in deriving the previous identity or

35
00:02:46,439 --> 00:02:49,639
inequality that IQ is bounded by 100.

36
00:02:49,639 --> 00:02:54,519
Our logic was that you can't have more than population x with an IQ of more than 100

37
00:02:54,519 --> 00:03:00,639
x, because that would contribute x times 100 over x or more than 100 to the average, and

38
00:03:00,639 --> 00:03:02,319
the average is only 100.

39
00:03:02,319 --> 00:03:11,680
That's only a problem if there are no negative terms, negative IQs to offset the excess contribution

40
00:03:11,680 --> 00:03:16,120
of the fraction of the population that has this high IQ.

41
00:03:16,120 --> 00:03:19,959
But we're implicitly using the fact that IQ is never negative.

42
00:03:19,959 --> 00:03:24,799
IQ runs from zero up to unlimited amount, but it's never negative.

43
00:03:24,799 --> 00:03:29,560
And that means that that contribution from the one third of the population that has an

44
00:03:29,560 --> 00:03:32,640
IQ of over 300 can't be offset by negative values.

45
00:03:32,640 --> 00:03:34,360
It's there and it messes up the average.

46
00:03:34,360 --> 00:03:35,680
It forces the average up.

47
00:03:35,680 --> 00:03:38,800
So we were using the fact that IQ is always non-negative.

48
00:03:38,800 --> 00:03:43,240
And by this very same reasoning, I'm not going to belabor you with a more formal proof.

49
00:03:43,240 --> 00:03:44,879
There's a trivial one in the text.

50
00:03:44,879 --> 00:03:45,879
It's easy.

51
00:03:45,879 --> 00:03:51,159
The theorem Markov's bound says that if r is non-negative, then the probability that r is

52
00:03:51,159 --> 00:03:58,879
greater than or equal to x is less than or equal to the expectation of r divided by x.

53
00:03:58,879 --> 00:04:00,759
And this holds for any x greater than zero.

54
00:04:00,759 --> 00:04:05,359
Of course, it's silly to state if this bound is greater than or equal to 1.

55
00:04:05,359 --> 00:04:08,079
It's not an interesting bound since probability is never greater than or equal to 1.

56
00:04:08,079 --> 00:04:13,680
So we might as well just restrict ourselves to x's that are greater than the expectation

57
00:04:13,680 --> 00:04:17,480
of r because those are the only x's that are going to give us a non-trivial bound

58
00:04:17,480 --> 00:04:19,360
that's less than 1.

59
00:04:19,360 --> 00:04:25,920
Again, if r is non-negative, then the probability that r exceeds an amount x is less than or

60
00:04:25,920 --> 00:04:30,120
equal to the expectation of r over x.

61
00:04:30,120 --> 00:04:33,000
And that's the Markov bound.

62
00:04:33,000 --> 00:04:38,200
If you restated in terms of deviation from the mean, you could formulate it this way,

63
00:04:38,200 --> 00:04:43,920
the probability that r is greater than or equal to a constant times its mean mu is an abbreviation

64
00:04:43,920 --> 00:04:48,800
for the expectation of r is less than or equal to 1 over c.

65
00:04:48,800 --> 00:04:54,040
So now we can understand that as a bound on the deviation from the mean above the mean

66
00:04:54,040 --> 00:05:02,520
in this case, that r as the factor of the expectation increases, the probability decreases

67
00:05:02,520 --> 00:05:05,040
proportionally.

68
00:05:05,040 --> 00:05:10,160
So the probability that r is greater than or equal to 3 times the expected amount is less

69
00:05:10,160 --> 00:05:16,520
than or equal to a third, which was what we saw with the IQ example.

70
00:05:16,520 --> 00:05:20,840
So look, this Markov bound in general is very weak.

71
00:05:20,839 --> 00:05:27,159
As I said, I don't think there's ever been an IQ recorded that was as high as 300.

72
00:05:27,159 --> 00:05:32,719
And in almost all the examples that you come across, there'll be other information that

73
00:05:32,719 --> 00:05:38,559
allows you to deduce tighter bounds on the probability that a random variable is significantly

74
00:05:38,559 --> 00:05:40,639
bigger than its expectation.

75
00:05:40,639 --> 00:05:44,039
But if you don't have any information about the random variable other than that it's

76
00:05:44,039 --> 00:05:47,039
non-negative, then as a matter of fact, Markov bound is tight.

77
00:05:47,040 --> 00:05:52,400
You can't possibly reach a stronger contribution because there are non-negative random variables

78
00:05:52,400 --> 00:05:58,360
where the probability that they are greater than or equal to a given amount x is in fact

79
00:05:58,360 --> 00:06:01,000
equal to their expectation divided by x.

80
00:06:01,000 --> 00:06:07,800
So the Markov bound is weak in application, but it's the strongest condition you can make

81
00:06:07,800 --> 00:06:14,000
on the very limited hypotheses that it makes about properties of the random variable.

82
00:06:14,000 --> 00:06:18,480
And it's also pretty obvious, I hope, from this example that we've talked about.

83
00:06:18,480 --> 00:06:20,079
But the amazing thing is how useful it is.

84
00:06:20,079 --> 00:06:24,199
We will get mileage out of it by using it in clever ways.

85
00:06:24,199 --> 00:06:26,759
So let's talk about the first clever way.

86
00:06:26,759 --> 00:06:32,839
And suppose that we're thinking about IQ as greater than 100, but I bring into the story

87
00:06:32,839 --> 00:06:37,480
another fact that we haven't mentioned before, which is, let's suppose that as a matter

88
00:06:37,480 --> 00:06:42,639
of fact, IQs of less than 50 just don't occur.

89
00:06:42,639 --> 00:06:47,279
I think they might actually, but there's a certain point where you just are not functioning

90
00:06:47,279 --> 00:06:51,360
at all, and it's not clear that it makes sense to ever talk about somebody who's in a coma

91
00:06:51,360 --> 00:06:52,959
is having an IQ.

92
00:06:52,959 --> 00:06:58,120
Maybe they have an IQ of zero, but let's assume that pragmatically IQ is never less than

93
00:06:58,120 --> 00:07:00,879
or equal to 50.

94
00:07:00,879 --> 00:07:06,000
Now if I tell you that I know that IQ is greater than or equal to 50, then I can actually get

95
00:07:06,000 --> 00:07:11,759
a better bound out of Markov because now knowing that IQ is greater than or equal to 50,

96
00:07:11,759 --> 00:07:19,599
IQ minus 50 becomes a non-negative random variable, which I couldn't be sure it was before

97
00:07:19,599 --> 00:07:22,039
because IQ might have gone below 50.

98
00:07:22,039 --> 00:07:26,719
Now that I know that it's always above 50, IQ minus 50 is non-negative and Markov's

99
00:07:26,719 --> 00:07:32,680
bound will apply to IQ minus 50, and applying it to IQ minus 50 will give you a better bound.

100
00:07:32,680 --> 00:07:37,319
Because now looking at the probability that the IQ is greater than or equal to 100, of course,

101
00:07:37,319 --> 00:07:44,319
the same as saying that IQ minus 50 is greater than or equal to 300 minus 50, which

102
00:07:44,319 --> 00:07:51,240
is 50.

103
00:07:51,240 --> 00:07:56,039
The average expected value of IQ minus 50 is 100 minus 50.

104
00:07:56,039 --> 00:08:05,039
So we're asking whether this non-negative random variable is greater than or equal to 250,

105
00:08:05,760 --> 00:08:13,760
and the answer is that's less than or equal to its expectation over 250, which is 150,

106
00:08:13,760 --> 00:08:17,000
over 250.

107
00:08:17,000 --> 00:08:19,840
And that's a tighter bound than the one third we had previously.

108
00:08:19,840 --> 00:08:24,960
This is a general phenomenon that helps you get slightly stronger bounds out of Markov's

109
00:08:24,960 --> 00:08:25,960
bound.

110
00:08:25,960 --> 00:08:30,600
Namely, if you have a non-negative variable, you get a better bound on it by shifting it

111
00:08:30,600 --> 00:08:32,240
so that its mean is zero.

112
00:08:32,240 --> 00:08:37,600
As a matter of fact, even if it goes negative, if you shift it up, if you can force it to

113
00:08:37,600 --> 00:08:44,600
become above zero as a minimum, then you can apply Markov's bound to it.

