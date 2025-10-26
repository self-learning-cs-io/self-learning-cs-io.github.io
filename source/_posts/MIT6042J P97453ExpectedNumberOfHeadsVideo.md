---
title: MIT6042J P97453ExpectedNumberOfHeadsVideo
---

1
00:00:00,000 --> 00:00:07,000
So, for practice with expectation, let's calculate the expected number of heads in N coin flips

2
00:00:07,000 --> 00:00:14,000
and just working directly from the definition because we have tools to do that.

3
00:00:14,000 --> 00:00:19,000
So, we're imagining N independent flips of a coin with bias piece.

4
00:00:19,000 --> 00:00:23,000
So, the coins might not be fair. The probability of heads is P.

5
00:00:23,000 --> 00:00:29,000
It would be biased in favor of heads if P is greater than 1,000 and biased against heads if P is less than 1,000.

6
00:00:29,000 --> 00:00:32,000
And we want to know how many heads are expected.

7
00:00:32,000 --> 00:00:40,000
This is a basic question that will come up again and again when we look at random variables in probability theory.

8
00:00:40,000 --> 00:00:47,000
So, what's the expected number of heads? Well, we already know we've examined the binomial distribution BNP.

9
00:00:47,000 --> 00:00:52,000
Our BNP is telling us how many heads there are in independent flips.

10
00:00:52,000 --> 00:00:57,000
So, we're asking about the expectation of the binomial variable BNP.

11
00:00:57,000 --> 00:01:09,000
Well, let's look at the definition. The definition of that BNP is it's the sum over all the possible values of B, namely all the numbers from 0 to N.

12
00:01:09,000 --> 00:01:19,000
That's K. Of the probability of getting K heads and this formula here is the probability of getting K heads, which we've worked out previously.

13
00:01:19,000 --> 00:01:25,000
And choose K times P to the K1 minus P to the N minus K. Well, let's introduce an abbreviation, a standard abbreviation.

14
00:01:25,000 --> 00:01:35,000
Let's replace 1 minus P by Q, where so P plus Q equals 1 and they're both not negative and between 0 and 1.

15
00:01:35,000 --> 00:01:44,000
And when I express the expectation this way, it starts to look like something a little bit familiar.

16
00:01:44,000 --> 00:01:54,000
And our strategy is going to be to use the binomial theorem and then the trick of differentiating it is going to wind up giving us a closed formula for this expression.

17
00:01:54,000 --> 00:02:11,000
For the expectation of the binomial variable. So, let's remember the binomial theorem says that the nth power of x plus y is the sum of from K equals 0 to N of N, choose K, x to the K, y to the N minus K.

18
00:02:12,000 --> 00:02:24,000
And if I differentiate this, what happens is that on the left hand side, if I differentiate with respect to x, I get x plus y to the N minus 1 times N.

19
00:02:24,000 --> 00:02:40,000
And if I differentiate the right hand side, let's differentiate a term by term. And differentiating with respect to x is going to turn this n, choose K, x to the K, y to the N minus K into an x to the K minus 1 times K term.

20
00:02:40,000 --> 00:03:00,000
But I'd like to keep the n and the K here and the K there matching. So that, after differentiating that becomes an x to the K minus 1, let's multiply it by x to make it x to the K. And of course, after undo that multiplication by dividing the whole thing by 1 over x.

21
00:03:00,000 --> 00:03:20,000
So by differentiating the binomial formula, we get the following formula for this sum that is starting to look just like the expectation of b and p, one over x times the sum from K equals 0 to 1 of K times N, choose K, x to the K, y to the N minus K.

22
00:03:20,000 --> 00:03:35,000
Well, let's compare the two terms. So here's this term, this one, I'm going to replace this line by the formula for expectation of the binomial random variable. So this is what we're trying to evaluate. And I have this great theorem you can see how they match up.

23
00:03:35,000 --> 00:03:49,000
So what I'm going to do is replace p and q, replace x and y in this general formula that I got by differentiating the binomial theorem with p and q and what happens.

24
00:03:49,000 --> 00:03:58,000
So I just plug in the p and q. Now the left hand side, p plus q is 1. So the left hand side is going to become N.

25
00:03:59,000 --> 00:04:27,000
And this right hand side now is exactly the expectation of b and p, this part of it anyway. So what I'm going to wind up with is that N is equal to the expectation of b and p. In other words, the expectation of b and p is n times p. And that is the basic formula that we were deriving by first principles without using any general proper.

26
00:04:27,000 --> 00:04:38,000
So any general properties of expectation, just the definition of expectation and the stuff that we had already worked out in terms of the binomial theorem.

