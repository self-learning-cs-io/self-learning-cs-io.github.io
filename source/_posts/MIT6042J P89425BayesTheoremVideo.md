---
title: MIT6042J P89425BayesTheoremVideo
---

1
00:00:00,000 --> 00:00:10,000
One of the most important applications of conditional probability is in analyzing the results of diagnostic tests of uncertain reliability.

2
00:00:10,000 --> 00:00:14,000
So let's look at a fundamental example.

3
00:00:14,000 --> 00:00:22,000
Suppose that I have a diagnostic test for tuberculosis. It really sounds great because it's going to be 99% accurate.

4
00:00:22,000 --> 00:00:27,000
In fact, more than 99% accurate, really. Because here the properties that this test has.

5
00:00:27,000 --> 00:00:33,000
If you have TB, this test is guaranteed to detect it and say, yes, you have TB.

6
00:00:33,000 --> 00:00:45,000
If you don't have TB, 99% of the time the test says correctly that you don't have TB and 1% of the time it gets it wrong.

7
00:00:45,000 --> 00:00:52,000
Now suppose the doctor gives you the test and the test comes up saying that you have TB. That's kind of scary.

8
00:00:52,000 --> 00:01:07,000
Because TB is a quite serious disease. It's getting worse because there are all of these antibiotic resistant versions of TB now in Asia where all the known antibiotics are not very effective if it's all curing it.

9
00:01:07,000 --> 00:01:16,000
And this test that was 99% accurate says I have this disease. It sounds really worrisome.

10
00:01:16,000 --> 00:01:27,000
But in fact, we can ask more technically, should you really be worried? What is the probability given that this apparently highly accurate test says you have TB?

11
00:01:27,000 --> 00:01:33,000
What's the probability that you actually have TB? That's what we want to calculate. What's the probability that you have it?

12
00:01:33,000 --> 00:01:40,000
So in other words, I want the conditional probability of that I have TB given that the test comes in positive.

13
00:01:40,000 --> 00:01:48,000
The test says yes you have TB. The test positive is a big word that I won't have room for another slide.

14
00:01:48,000 --> 00:01:56,000
So that's just abbreviated by plus, plus means in green that the test said yes positive it has you have TB.

15
00:01:56,000 --> 00:02:01,000
Okay, so that's the probability that we're trying to calculate this conditional probability.

16
00:02:01,000 --> 00:02:07,000
What do we know about the test? Let's translate the information we have about the tests into the language of conditional probability.

17
00:02:07,000 --> 00:02:12,000
And the first thing we said was the test is guaranteed to get it right if you have TB.

18
00:02:12,000 --> 00:02:20,000
So given that you have TB, the probability that the test will say so it will return a positive result is one.

19
00:02:20,000 --> 00:02:35,000
Okay, given that you don't have TB, the probability that the test will say that you do have TB is only one in 100th because 99% of the time it correctly says you don't have TB and 1% of the time it says oops you do have TB.

20
00:02:35,000 --> 00:02:46,000
So this is what's called a false positive rate. It's falsely claiming that you have TB when you really don't and that rate where hypothesizing is only 1%.

21
00:02:46,000 --> 00:02:56,000
Now what we're trying to calculate again is the probability that you have TB given that the test came in positive and said you had TB.

22
00:02:56,000 --> 00:03:15,000
Well, let's look at the definition of conditional probability. The probability that you have TB given that the test came in positive that said you do is simply the probability that both the test comes in positive and you have TB divided by the probability that the test comes in positive.

23
00:03:15,000 --> 00:03:34,000
Well, using the definition of conditional probability again, this intersection, this end of having TB and the test coming in positive is simply the probability that the test comes in positive given that you have TB times the probability that you have TB.

24
00:03:34,000 --> 00:03:43,000
Now this one we know it's one because the test is perfect if you have TB, the test is definitely going to say positive. So that let's me simplify things nicely.

25
00:03:43,000 --> 00:04:00,000
What I've just figured out is the probability that you have TB given that the test says you do is simply the quotient of the probability that you have TB given no other information and the probability that the test comes in positive.

26
00:04:01,000 --> 00:04:08,000
Well, what is that probability that the test comes in positive? How are we going to calculate that? That's the key unknown here.

27
00:04:08,000 --> 00:04:26,000
And we're going to use the probability rule. The total probability rule. The total probability says that you do where you don't have TB. So the way to calculate the probability that the test comes in positive is to look at the probability that the test comes in positive when you do and don't have TB.

28
00:04:26,000 --> 00:04:46,000
And we know those numbers. So let's look at the total probability formula. The probability that the test comes in positive is simply the probability that it comes in positive if you have TB times the probability you have TB plus the probability comes in positive given that you don't have TB times the probability you don't have TB.

29
00:04:46,000 --> 00:04:55,000
Well, we know a lot of these terms. Let's work them out. Well, the probability that the test comes in positive given that you have TB is one.

30
00:04:55,000 --> 00:05:03,000
And the probability that the test comes in positive given that you don't have TB is one 100. That's the false positive rate. We figured that already.

31
00:05:03,000 --> 00:05:10,000
What about the probability that you don't have TB? Well, that's simply one minus the probability that you do have TB.

32
00:05:10,000 --> 00:05:30,000
Now I have this nice arithmetic formula in the probability of TB. So I wind up with a probability of TB plus 100 minus 100th of the probability of TB. It leaves me with 100th plus the 9900th of TB.

33
00:05:30,000 --> 00:05:47,000
So that's what this simplifies to. The probability that the test comes in positive given no other information is 99100th of the probability that a person has TB plus 100th will come back to this formula.

34
00:05:47,000 --> 00:06:05,000
Well, we were working on the probability that you have TB given the test came in positive. We figured out that it was this quotient. And now I know what the denominator is. The denominator is 99100th times the probability of TB plus 100th multiplied numerator with denominator through by 100.

35
00:06:05,000 --> 00:06:18,000
And you get that the probability that you have TB given that the test says you do is 100th times the probability that you have TB divided by 99th times the probability that you have TB plus 1.

36
00:06:18,000 --> 00:06:31,000
So let's hold that formula. Notice the key unknown here is the probability that you have TB given independent of the test, the probability that a random person in the population has TB.

37
00:06:31,000 --> 00:06:52,000
If we can figure that out or if we can look that up, then we know what this unknown is, the probability that you have TB given the test says you do. Well, what is the probability that a person in the United, a random person has TB? Well, there were 11,000 cases of TB reported in 2011 according to the Center for Disease Control in the United States.

38
00:06:52,000 --> 00:07:02,000
And you can assume that there's going to be a lot of unreported cases if there are 11,000 reported ones because a lot of people don't even know they have the disease.

39
00:07:02,000 --> 00:07:15,000
So let's estimate on that basis given that the population of the US around 350 million, a billion, a million, that the probability of TB is about 110,000th.

40
00:07:15,000 --> 00:07:31,000
Let's plug that into our formula. The probability that you have TB given the test is positive is this formula, when I plug in 110,000th for TB, I get 100 over 10,000 and 99 over 10,000 plus 1.

41
00:07:31,000 --> 00:07:41,000
Well, now I can see the denominator is essentially 1. It's 1.01 and the numerator is 100. And this is basically about 1,100th.

42
00:07:41,000 --> 00:08:03,000
In other words, it's not very likely that you have TB because of the relatively high false positive rate that was relatively high of 1%, that false positive rate washed out the actual number of TB cases, which were the TB rate was only 0.01%.

43
00:08:03,000 --> 00:08:20,000
So that almost all of the reports of TB were caused by the high false positive rate. And that means that when you have a report that you've got TB, you still only have a 1% chance that you actually have the TB.

44
00:08:20,000 --> 00:08:37,000
So the 99% accurate test was not very useful here for you to figure out what kind of action to take and what kind of medicine to take your treatment to take, given that the test came in positive with 1 and 100th chance, the odds are you won't do anything in which case you could wonder why did your doctor give you the test.

45
00:08:37,000 --> 00:08:50,000
Well, the 99% test sounds good. We figured out that it isn't and a hint about why 99% accurate isn't really so useful is that there's an obvious test that's 99.99% accurate.

46
00:08:50,000 --> 00:09:01,000
What's the test? Always say no. After all, the probability is only 1 in 10,000 that you're going to be wrong. And that's the 99.99% rate.

47
00:09:01,000 --> 00:09:30,000
So it sounds as though this test is really worthless, but no, it's not. If you think about it a little bit, it will be useful. I'll explain that a minute. I forgot I'm getting ahead of myself because the basic formula that we used here was we figured out what the probability of TB given that the test said you had TB in terms of the inverse probabilities, which we know that is the probability that the test came in positive given that you had TB.

48
00:09:30,000 --> 00:09:48,000
This was an example of what's a famous rule in probability theory. It's called Bayes rule or Bayes law. This is it's just stated in terms of arbitrary events a and b. It expresses the probability of b given a in terms of the probability of a given b and the probabilities of a and b independently.

49
00:09:48,000 --> 00:09:59,000
Now I can actually never remember this law, but I read the right time every time I need to do it as we've done in the previous slides. It's really a quite straightforward order to arrive and prove.

50
00:09:59,000 --> 00:10:14,000
But let's go back to this 99% accurate test that seemed worthless since there was a trivial test that was 99.9% accurate. But in fact, it's really helpful because it did increase the probability that you had TB by a factor of 100.

51
00:10:14,000 --> 00:10:21,000
Before you took the test and before you know anything, you thought that your probability was the same as everybody else is about 1 in 10,000.

52
00:10:21,000 --> 00:10:37,000
Now the test says the probability that you have TB is 1 in 100. That's 100 times larger. What's the value of that? Well, suppose you only had 5 million doses of medicine to treat this American population of 350 million people.

53
00:10:37,000 --> 00:10:53,000
Who should you medicate? Well, if you medicate a random 5 million people out of 350 million, the likelihood that you're going to get in very many of the real TB cases is small. It's only going to be about 1 in 30.

54
00:10:53,000 --> 00:11:15,000
You'll only get about 1 30th of the cases. But if you use your 5 million doses to medicate the 3.5 million people who would test positive under this 99% accurate test, then when you test all 350 million people, you're going to get about 3.5 million who test positive.

55
00:11:15,000 --> 00:11:25,000
You have enough medication to treat all of them. And if you treat all of them, you're almost certain to get all of the actual TB cases, all 10,000 of them.

56
00:11:25,000 --> 00:11:38,000
So the 99% accurate test does have an important use in this final setting. A lot more so than the 99.99% accurate test that simply always said no. Food for thought.

