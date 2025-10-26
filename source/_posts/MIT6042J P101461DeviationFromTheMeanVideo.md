---
title: MIT6042J P101461DeviationFromTheMeanVideo
---

1
00:00:00,000 --> 00:00:07,000
In the last lecture we spent time talking about the mean or expectation and its properties,

2
00:00:07,000 --> 00:00:09,000
most important one being linearity.

3
00:00:09,000 --> 00:00:13,000
But let's step back now and think about what is it that the mean means.

4
00:00:13,000 --> 00:00:15,000
Why do we care about it?

5
00:00:15,000 --> 00:00:18,000
We have this intuitive idea that if you do things long enough,

6
00:00:18,000 --> 00:00:24,000
if you keep experimenting with the same random variable collecting its values,

7
00:00:24,000 --> 00:00:28,000
its long run average will be about the same as its mean.

8
00:00:28,000 --> 00:00:31,000
Now we're going to try to make that more precise.

9
00:00:31,000 --> 00:00:34,000
So we're going to talk about the topic of deviation from the mean,

10
00:00:34,000 --> 00:00:37,000
or as I like to say, what does the mean really mean?

11
00:00:37,000 --> 00:00:40,000
Why do we care about it?

12
00:00:40,000 --> 00:00:46,000
Well, let's look at an example that's familiar to get a grip on the specific ideas that were interested in.

13
00:00:46,000 --> 00:00:49,000
So I suppose I'd toss a fair coin 101 times.

14
00:00:49,000 --> 00:00:57,000
Then I know that the expected number, since all the values from 0 through 101 are possible,

15
00:00:57,000 --> 00:01:02,000
and the middle value is the expectation, it's 50 and a half heads.

16
00:01:02,000 --> 00:01:06,000
Now I'm never going to get exactly 50 and a half heads.

17
00:01:06,000 --> 00:01:11,000
The probability in 101 flips of getting 50 and a half heads is 0,

18
00:01:11,000 --> 00:01:14,000
because there's no way to flip half a head.

19
00:01:14,000 --> 00:01:18,000
So you don't expect the expectation in that sense.

20
00:01:18,000 --> 00:01:22,000
No given measurement, no given experiment is going to yield the expectation.

21
00:01:22,000 --> 00:01:26,000
The expectation is this thing that we expect to come out on the average.

22
00:01:26,000 --> 00:01:33,000
Well, we can ask what's the probability of getting as close as you could hope to get to the expectation,

23
00:01:33,000 --> 00:01:37,000
namely what's the probability of getting exactly 50 heads?

24
00:01:37,000 --> 00:01:43,000
And it's about 1 13th, or if you ask what's the probability of getting either 50 or 51 heads,

25
00:01:43,000 --> 00:01:49,000
but being within plus or minus 1 of the expectation, it's about 1 7th.

26
00:01:49,000 --> 00:01:52,000
Okay, let's flip more coins and see what happens.

27
00:01:52,000 --> 00:01:55,000
This time I'm going to flip a thousand in one coins.

28
00:01:55,000 --> 00:02:01,000
And again, the expected number of heads is 500 and a half, which I'll never get exactly.

29
00:02:01,000 --> 00:02:09,000
The probability of getting exactly 500 heads is 139th and the probability of getting within one of the expectation,

30
00:02:09,000 --> 00:02:15,000
that is either 500 or 501 heads is about 1 19th.

31
00:02:15,000 --> 00:02:18,000
Now these numbers have gone down from the previous numbers.

32
00:02:18,000 --> 00:02:22,000
Remember, it was about 1 7th and we've gone down to 1 19th.

33
00:02:22,000 --> 00:02:29,000
So it's actually we're less likely to be within a fixed distance, within one of the expectation,

34
00:02:29,000 --> 00:02:31,000
when we flip more coins.

35
00:02:31,000 --> 00:02:39,000
So as the number of tosses grows, the number of heads gets less likely to be within any given fixed distance of the mean.

36
00:02:39,000 --> 00:02:42,000
But things get better when we start looking at percentages.

37
00:02:42,000 --> 00:02:50,000
So what's the probability of being within 1% of the mean, if I toss a thousand in one coins?

38
00:02:50,000 --> 00:02:54,000
Well, 1% of a thousand in one is about 10.

39
00:02:54,000 --> 00:02:57,000
So we're talking about 1% of the thousand in one.

40
00:02:57,000 --> 00:03:14,000
And the probability of being within 10 of 500 and 5, that is to say the probability of being within 510 and 490 is about 0.49.

41
00:03:14,000 --> 00:03:18,000
It's almost 5050, which is not really so bad.

42
00:03:18,000 --> 00:03:27,000
So we have a 5050 chance of actually being within 1% of the expected number when I flip a thousand in one coins.

43
00:03:27,000 --> 00:03:35,000
So what we can start to say is that when we're trying to give the meaning to the mean, if I let you be the standard abbreviation for expectation of R,

44
00:03:35,000 --> 00:03:38,000
I'm doing that just so it'll fit on the slide nicely and formulas.

45
00:03:38,000 --> 00:03:40,000
So mu is the expectation of R.

46
00:03:40,000 --> 00:03:43,000
The basic question we're asking is two basic questions.

47
00:03:43,000 --> 00:03:49,000
One is what's the probability that the random variable is far from its mean mu?

48
00:03:49,000 --> 00:03:56,000
And you could praise that as what's the probability that the distance from R to mu, the absolute value of R minus mu,

49
00:03:56,000 --> 00:03:58,000
is greater than some amount of x.

50
00:03:58,000 --> 00:04:02,000
And the second question that we want to ask is what's the average deviation?

51
00:04:02,000 --> 00:04:07,000
What's the expectation of the distance between R minus mu?

52
00:04:07,000 --> 00:04:10,000
What's the expected value of R minus mu?

53
00:04:11,000 --> 00:04:19,000
Now, of course, we're trying to make sense of the meaning of the expectation in terms of the expectation of the distance between R and this expectation.

54
00:04:19,000 --> 00:04:24,000
So there's a little bit of circularity there, but let's live with it and proceed.

55
00:04:24,000 --> 00:04:27,000
Let's look at an example to crystallize the ideas a little.

56
00:04:27,000 --> 00:04:29,000
Let's look at two dice with the same mean.

57
00:04:29,000 --> 00:04:39,000
The green die is going to be a standard fair die in which each of the numbers 1 through 6 has an equal probability of showing up.

58
00:04:39,000 --> 00:04:49,000
And its expected value is exactly going to be the midpoint between 1 and 6 or 3 and a half.

59
00:04:49,000 --> 00:04:58,000
Now, suppose I look at a loaded die, die 2, which only throws a 1 or a 6, but with equal probability.

60
00:04:58,000 --> 00:05:03,000
Then its expectation is also 3 and a half by the same reasoning.

61
00:05:03,000 --> 00:05:06,000
So here are these two different die.

62
00:05:06,000 --> 00:05:14,000
One takes the values 1 through 6 equally likely and the other takes only the two values 1 and 6, but they have the same expectation.

63
00:05:14,000 --> 00:05:17,000
So how do I capture the difference?

64
00:05:17,000 --> 00:05:25,000
Well, if I look at the expected distance of the fair die to its mean, I claim it's 1 and a half.

65
00:05:25,000 --> 00:05:32,000
But the expected distance of the loaded die from its mean, same mean remember 3 and a half, is actually 2 and a half.

66
00:05:32,000 --> 00:05:38,000
In fact, the second die is always exactly 2 and a half from its expected value.

67
00:05:38,000 --> 00:05:42,000
Let's look at the PDFs to get a grip on understanding what's going on.

68
00:05:42,000 --> 00:05:46,000
So here's the PDF for the fair die.

69
00:05:46,000 --> 00:05:57,000
Over 1 through 6 the probability is 1, 6. So each of those green spikes is columns is 1, 6th high.

70
00:05:57,000 --> 00:06:07,000
And their total is the probability that the fair die takes one of those values 1 through 6 with equal likelihood.

71
00:06:07,000 --> 00:06:12,000
Now, the expected value is exactly in the middle at 3 and a half.

72
00:06:13,000 --> 00:06:20,000
And the average distance of these points, well you can see that a third of the time you're at distance a half,

73
00:06:20,000 --> 00:06:26,000
a third of the time that is when you take the values 2 and 5 you are at distance exactly 1 and a half,

74
00:06:26,000 --> 00:06:32,000
and another third of the time you're at distance 2 and a half when you take 1 and 6.

75
00:06:32,000 --> 00:06:36,000
And that averages out to the middle value of 1 and a half.

76
00:06:36,000 --> 00:06:41,000
So the expected deviation, the expected distance of the fair die from its mean is 1 and a half.

77
00:06:41,000 --> 00:06:47,000
On the other hand, for the loaded die as we said, it's always exactly 2 and a half from its expected value,

78
00:06:47,000 --> 00:06:51,000
which means its expected value is also 2 and a half.

79
00:06:51,000 --> 00:06:59,000
So we can start to see the difference between these two distributions and these two kinds of die

80
00:06:59,000 --> 00:07:09,000
by even though they have the same expectation, one of them is more likely and has a greater expected distance from its mean.

81
00:07:09,000 --> 00:07:15,000
And the moral of this short piece is that the mean alone is not a good predictor of a random variable's behavior.

82
00:07:15,000 --> 00:07:21,000
As you might suppose, one parameter, one number is not going to capture the shape of a PDF,

83
00:07:21,000 --> 00:07:27,000
which gives you the more full information about the distribution of values of a random variable.

84
00:07:27,000 --> 00:07:31,000
And we need some more information than just the expectation.

85
00:07:31,000 --> 00:07:45,000
And especially valuable, extra piece of information that's still well less than the overall shape of the PDF of the random variable is knowing its probable deviation from its mean.

