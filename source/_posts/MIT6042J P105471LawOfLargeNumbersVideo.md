---
title: MIT6042J P105471LawOfLargeNumbersVideo
---

1
00:00:00,000 --> 00:00:15,000
The law of large numbers gives a precise formal statement of the basic intuitive idea that underlies probability theory and in particular are interest in random variables and their expectations, their means.

2
00:00:15,000 --> 00:00:27,000
So let's begin by asking what the mean means. Why are we so interested in it? For example, if you roll a fair die with faces 1 through 6,

3
00:00:27,000 --> 00:00:38,000
the mean value, it's expected value is 3.5 and you'll never roll 3.5 because there is no 3.5 face. So why do we care about what this mean is if we're never going to roll it?

4
00:00:38,000 --> 00:00:52,000
And the answer is that we believe that after many rolls, if we take the average of the numbers that show on the dice, that average is going to be near the mean. It's going to be near 3.5.

5
00:00:53,000 --> 00:01:03,000
Let's look at an even more basic example. If it's a fair die, the probability of rolling a 6 with any other number is 1.6.

6
00:01:03,000 --> 00:01:20,000
And the very meaning of the fact that the probability of rolling a 6 is 1.6 is that we expect that if you roll a lot of times, if you roll about n times, the fraction of 6 is going to be around n over 6.

7
00:01:20,000 --> 00:01:27,000
The fraction of 6 is going to be about 1.6 of n rolls. You'll get about n over 6.6.

8
00:01:27,000 --> 00:01:37,000
That's almost a definition. Or the intuitive idea behind what we mean when we assign probability to some outcome.

9
00:01:37,000 --> 00:01:47,000
If we did it repeatedly, the fraction of times that it came up would be equal to its probability, or at least closely equal to it in the long run.

10
00:01:47,000 --> 00:01:57,000
So let's look at what Jacob Bernoulli, who is the discoverer of the law of large numbers, had to say on the subject. He was born in 1659, died in 1705.

11
00:01:57,000 --> 00:02:06,000
And his famous book, The Art of Guessing, R.S. Conjectante, was actually published posthumously by his cousin.

12
00:02:06,000 --> 00:02:14,000
Bernoulli says, even the stupidest man by some instinctive nature per se and by no previous instruction, this is truly amazing.

13
00:02:14,000 --> 00:02:23,000
Knows for sure that the more observations that are taken, the less the danger will be of straining from the mark.

14
00:02:23,000 --> 00:02:47,000
What does he mean? Well, it's what we said a moment ago. If you roll the fair die n times and the probability of a roll of is a sixth, then the average number of 6s, which is the number of 6s rolled divided by n, we believe intuitively that that number is going to approach 1.6 as n approaches infinity.

15
00:02:47,000 --> 00:02:57,000
That's what Bernoulli is saying that everybody understands that they intuitively are sure of it and who knows how they figure that out, but that's what everyone thinks. And he might be right.

16
00:02:57,000 --> 00:03:08,000
Now, of course, when you're doing this experiment of rolling n times and counting the number of 6s and seeing if the fraction is close to a sixth, you might be unlucky.

17
00:03:08,000 --> 00:03:14,000
And it's possible that you'd get an average that actually was way off 1.6, but that would be unlucky.

18
00:03:14,000 --> 00:03:26,000
And the question is how unlikely is it to be that you'd get a number of a fraction of 6s that wasn't really close to a sixth.

19
00:03:26,000 --> 00:03:38,000
And with the law of large numbers is getting a grip on that. And in fact, subsequently, we'll get a more even quantitative grip on it, which will be crucial for applications in sampling and hypothesis testing.

20
00:03:38,000 --> 00:03:40,000
But let's go on.

21
00:03:40,000 --> 00:03:55,000
So let's look at some actual numbers, which I calculated. If you roll a die n times, where n is 6, 6, 6, 6, 1200, 3000 or 6,000, the probability that you're going to be within 10%

22
00:03:55,000 --> 00:04:15,000
of the expected number of 6s is given here. So it turns out, of course, that in order to be within 10, if you're going to roll 6 times, the only way to be within 10% of the 1 expected 6 that you should roll is to roll exactly 1 6 in 6 tries.

23
00:04:15,000 --> 00:04:37,000
And the probability of that is about 40% 0.4 as you can check yourself easily. Then it turns out that if you flip a roll 60 times, the probability of being between 66, sorry, the expected number in 60 rolls is going to be 10.

24
00:04:37,000 --> 00:04:59,000
So the probability of there being within 10% of 10 or 9 to 11, 6s is 0.26. And likewise, the probability of there being within 10% of 100, which is the expected number of 6s when you roll 600 times is 0.72 and so on.

25
00:04:59,000 --> 00:05:16,000
Until finally, the probability of being within 10% of 1000, which is the expected number when you roll 6,000 times that is between 900 and 1100, 6s in 6,000 rolls is 0.999.

26
00:05:16,000 --> 00:05:33,000
And triple 9s, in fact, it's a little bit bigger. So it's really only about one chance in 1000 that your number of 6s won't fall in that interval within 10% of the expected number.

27
00:05:33,000 --> 00:05:52,000
Well, suppose I ask for a tighter tolerance, and I'd like to know what's the probability of being within 5%? Well, first of all, notice of course that as the number of rolls get larger, the probability of being in this given interval is of getting getting higher and higher, which is what Bernoulli said and what we intuitively believe.

28
00:05:52,000 --> 00:06:08,000
The more rolls, the more likely you are to be close to what you expect. If you tighten the tolerance, of course, then the probabilities wind up getting smaller that you'll do so well.

29
00:06:08,000 --> 00:06:18,000
So if you want to be within 5% of the average in 6 rolls, it means you still have to roll exactly 1.6, which means the probability is still 0.4.

30
00:06:18,000 --> 00:06:34,000
But if you're trying to be within 5% of the expected number 10 in 60 rolls, meaning between 5 and 15, that probability is only 0.14 compared to the probability of 0.26 of being within 10%.

31
00:06:34,000 --> 00:06:59,000
And if we jump down here, say to 3,000 rolls, the probability of being within 10% of 500, which is the expected number in 3,000 rolls, within 10% is 0.98, but within being within 5% of 500, it's 0.78, or about 3, little over 3 quarters.

32
00:06:59,000 --> 00:07:18,000
So what does that tell us? Well, it means that if you roll 3,000 times and you did not get within 10% of the expected number 500, that is you did not get in the interval between 450 and 556s, you could be 98% confident that your die is loaded.

33
00:07:18,000 --> 00:07:48,000
And this is exactly why the law of large numbers is so important to us, because it allows us to do an experiment, and then assess the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way as the probability of being in the same way, that is the expected number 500, which means that the probability of being in the same way is 0.75, or about 5% of the expected number 500, that is the expected number 100, that is the expected number 100, that is the expected number 100, that is the expected

34
00:07:48,000 --> 00:08:18,000
number 100, that is the expected number 100, that is the expected number 50, that is the expected number 100, that is the expected number 100, that is the expected unit

35
00:08:18,000 --> 00:08:23,000
whether some degree of certainty is given which one can never exceed.

36
00:08:23,000 --> 00:08:30,000
Now that's a 17th century English that may be a little bit hard to parse.

37
00:08:30,000 --> 00:08:35,000
So let's translate it into math language.

38
00:08:35,000 --> 00:08:38,000
What is it that Bernoulli is asking?

39
00:08:38,000 --> 00:08:43,000
So what Bernoulli means is that he wants to think about taking a random variable

40
00:08:43,000 --> 00:08:47,000
r with an expectation or mean of mu.

41
00:08:47,000 --> 00:08:53,000
And he wants to make n trial observations of r and take the average of those observations

42
00:08:53,000 --> 00:08:56,000
and see how close they are to mu.

43
00:08:56,000 --> 00:09:00,000
All right, what does n trial observations mean?

44
00:09:00,000 --> 00:09:04,000
Well formally the way we're going to capture it is we're going to think of having

45
00:09:04,000 --> 00:09:09,000
a bunch of mutually independent identically distributed random variables

46
00:09:09,000 --> 00:09:11,000
r1 through rn.

47
00:09:11,000 --> 00:09:16,000
This phrase identically, independent identically distributed comes up so often that there's a standard abbreviation

48
00:09:16,000 --> 00:09:18,000
iid random variables.

49
00:09:18,000 --> 00:09:26,000
So we're going to have n of them and think of those as being the n observations that we make of a given random variable r.

50
00:09:26,000 --> 00:09:32,000
So r1 through rn each have exactly the same distribution as r and they're mutually independent.

51
00:09:32,000 --> 00:09:41,000
And again, since they have identical distributions, they all have the same mean mu as the random variable r that we were trying to investigate.

52
00:09:41,000 --> 00:09:50,000
So we model n independent trials, repeated trials by saying that we have n random variables that are iid.

53
00:09:50,000 --> 00:09:51,000
Okay.

54
00:09:51,000 --> 00:09:57,000
Now what Bernoulli is proposing is that you take the average of those n random variables.

55
00:09:57,000 --> 00:10:01,000
So you take r1 through some of r1, r2 up through r and divide by n.

56
00:10:01,000 --> 00:10:08,000
That's the average value called that a sub n, the average of the n observations of the n rolls.

57
00:10:08,000 --> 00:10:15,000
And Bernoulli's question is, is this average probably close to the mean mu if n is big?

58
00:10:15,000 --> 00:10:17,000
What exactly does that mean?

59
00:10:17,000 --> 00:10:26,000
Probably close to mu means that the probability that the distance between the average and mu is less than or equal to delta

60
00:10:26,000 --> 00:10:27,000
is what?

61
00:10:27,000 --> 00:10:30,000
So delta is talking about how close you are.

62
00:10:30,000 --> 00:10:31,000
Delta is a parameter.

63
00:10:31,000 --> 00:10:33,000
We expect it's got to be positive.

64
00:10:33,000 --> 00:10:37,000
We're asking, think of whatever close means to you.

65
00:10:37,000 --> 00:10:39,000
Does it mean point 1?

66
00:10:39,000 --> 00:10:41,000
Does it mean point 0?1?

67
00:10:41,000 --> 00:10:49,000
What amount would persuade you that the average was close to what it ought to be?

68
00:10:50,000 --> 00:10:59,000
And we ask then whether the distance between the average and the mean is close less than or equal to delta.

69
00:10:59,000 --> 00:11:06,000
And Bernoulli wants to know what is the probability of that.

70
00:11:06,000 --> 00:11:15,000
And what he goes on to say is therefore this is the problem which I now said fourth and make known after I have pondered over it for 20 years.

71
00:11:15,000 --> 00:11:25,000
So it's novelty and it's very great usefulness coupled with its great difficulty can exceed and weight and value all the remaining chapters of this thesis.

72
00:11:25,000 --> 00:11:33,000
Now Bernoulli was right on about the usefulness of this result, at least in its quantitative form.

73
00:11:33,000 --> 00:11:36,000
And at the time it was really pretty difficult for him.

74
00:11:36,000 --> 00:11:41,000
It took him like 200 pages to complete his proof in ours, Conjecton D.

75
00:11:41,000 --> 00:11:51,000
Nowadays we are going to do it in about a lecture worth of material and you'll be seeing that in some subsequent video segments.

76
00:11:51,000 --> 00:11:56,000
So that's what happens with 300 years to or 350 years to tune up a result.

77
00:11:56,000 --> 00:12:00,000
What took 200 pages then now takes 10 or less pages.

78
00:12:00,000 --> 00:12:04,000
In fact, if it was really concise it could be done in a few in three pages.

79
00:12:05,000 --> 00:12:08,000
Alright, so again coming back to Bernoulli's question.

80
00:12:08,000 --> 00:12:21,000
Bernoulli's question is what is the probability that the average, that the distance between the average and the mean is less than or equal to delta as you take more and more tries as n goes to infinity.

81
00:12:21,000 --> 00:12:26,000
And Bernoulli's answer to the question is that the probability is one.

82
00:12:26,000 --> 00:12:41,000
That is, if you want to have a certain degree of certainty of being close to the mean, if you take enough trials, you can be as certain as you want that you'll be as close as you want.

83
00:12:41,000 --> 00:12:45,000
And that is called the weak law of large numbers.

84
00:12:45,000 --> 00:12:52,000
And it's one of the basic transcendent rules and theorems of probability theory.

85
00:12:52,000 --> 00:13:03,000
It's usually stated in the other way as that the limit of the probability that the average distance away from the mean delta is zero.

86
00:13:03,000 --> 00:13:07,000
It's the probability that it's extremely unlikely.

87
00:13:07,000 --> 00:13:16,000
It can be as unlikely as you want to make it that it's more than any given tolerance from the mean as if you've taken large enough number of trials.

88
00:13:16,000 --> 00:13:19,000
Now in this form, it's not yet really useful.

89
00:13:19,000 --> 00:13:23,000
This is a romantic qualitative limit limiting result.

90
00:13:23,000 --> 00:13:31,000
And to really use it, you need to know something rather about the rate of which it approaches the limit, which is what we're going to be seeing in a subsequent video.

91
00:13:31,000 --> 00:13:45,000
And in fact, the proof of this is going to follow easily from the Chebyshev inequality bound and variance properties when we go about trying to get the quantitative version that explains the rate at which the limit is zero.

92
00:13:45,000 --> 00:13:51,000
And in this case, we're going to see the probability of which the limit is approached.

