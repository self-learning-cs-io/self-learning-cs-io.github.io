---
title: MIT6042J P71319StirlingsFormulaVideo
---

1
00:00:00,000 --> 00:00:09,000
Our method for estimating sums can also be used to estimate products basically by taking logs to turn a product into a sum.

2
00:00:09,000 --> 00:00:17,000
And we're going to use that to come up with another important estimate of a quantity that will come up really very regularly called N factorial.

3
00:00:17,000 --> 00:00:29,000
So N factorial is the product of the first N integers, one times two, up to N minus one times N. In concise product notation, it's the product that's pi capital pi for product from i equals one.

4
00:00:29,000 --> 00:00:36,000
And its standard abbreviation is to write it as N-battied pronounced N factorial.

5
00:00:36,000 --> 00:00:48,000
So what I'd like to do is get an asymptotic estimate for N factorial. Again, N factorial is one of these quantities where there isn't any exact formula that doesn't have those ellipses in it.

6
00:00:48,000 --> 00:01:00,000
There's no short formula with basic operations. Fixed size that formula that expresses N factorial. But we get a nice formula for a tight asymptotic estimate.

7
00:01:00,000 --> 00:01:07,000
So as I said, the first trick is to turn the product into a sum by taking logs.

8
00:01:07,000 --> 00:01:14,000
So log of N factorial is the log of one, the product of one through N. But a log of a product is the sum of the logs.

9
00:01:14,000 --> 00:01:25,000
So it's simply log of one plus log of two up through log of N. And expressed in some notation, it's the sum from i equals one to N of log of i.

10
00:01:25,000 --> 00:01:40,000
Now, the integral method gives us a way to estimate this sum by bracketing it between the values of some integrals. Namely, restating the integral method for bounding integrals by sums.

11
00:01:40,000 --> 00:01:51,000
This time we're looking at an increasing function because it's log of x. Let f be a weekly increasing function from positive reels to positive reels.

12
00:01:52,000 --> 00:02:07,000
I'm interested in the sum from i equals one to N of f of i. And I want to relate it and bound it by the integral from one to N of f of x, where in this case the particular f that we're interested in is f of x is log x.

13
00:02:08,000 --> 00:02:22,000
And the theorem says that with increasing functions, s is bracketed between the integral plus the last term in the sum and the integral plus the first term in the sum. Remember, since the functions weekly increasing f of one is smaller than f of n.

14
00:02:22,000 --> 00:02:35,000
So that's the way you remember which way the bounds go. So s is between i plus f of one and i plus f of n by our general formula for applying integral bounds to sums.

15
00:02:36,000 --> 00:02:52,000
Well, what that tells us then is that the sum from one to N of log of i, which is what we're interested in, is bracketed between the integral from one to N of log x and the integral from one to N of log of x plus log of zero, but a log of one rather, but that zero.

16
00:02:52,000 --> 00:02:57,000
And the integral from one to N of log of x plus the last term, which is log of n.

17
00:02:57,000 --> 00:03:12,000
Okay. In case you don't remember from first term calculus, the integral from a log of x is in fact, has the indefinite integral is x log of x over e, which you can easily check by differentiating x log x over e.

18
00:03:12,000 --> 00:03:23,000
ln means natural log. Remember in computer science, l o g log means log to the base two unless you explicitly put some base on it like log l o g sub 10.

19
00:03:23,000 --> 00:03:41,000
So ln is the natural log from calculus and plugging in this value for the indefinite integral of log of x and using the bounds one and what we come up with is that the sum of the logs is bounded between n times log n over e.

20
00:03:41,000 --> 00:03:47,000
And n times log n over e plus log of n. So pretty tight bounds.

21
00:03:47,000 --> 00:03:58,000
What that means is that informally speaking, the sum of the logs is about this term plus that term plus let's take the average value of that term, which is half this term.

22
00:03:58,000 --> 00:04:04,000
So we could say that the sum of the logs is approximately equal. That's a little vague, but live with it.

23
00:04:04,000 --> 00:04:15,000
And log n over e plus half of log n. Well, now if I'm interested remember in an estimate for n factorial. So let's exponentiate both sides.

24
00:04:15,000 --> 00:04:32,000
So taking e to the sum gives me a product of e to the e to this times e to that. Well, e to this is really it's e to the log of n over e to the nth power, which means it's n over e to the n.

25
00:04:32,000 --> 00:04:45,000
And this is e to the log of n to the power half or square root of n. So we wind up with n factorial is approximately equal to the square root of n times n over e to the n.

26
00:04:45,000 --> 00:04:55,000
Now this approximately equal is in precise. It's not asymptotically equal because we were doing an arithmetic average of zero and log n over two.

27
00:04:55,000 --> 00:05:04,000
In addition, it's very dangerous when you have two things that are approximately equal to exponentiate them and expect that they're still approximately equal, often they aren't.

28
00:05:04,000 --> 00:05:17,000
But nevertheless, this is a kind of a heuristic derivation of some kind of asymptotic estimate that we would expect that n factorial was roughly like the square root of n times n over e to the nth power.

29
00:05:17,000 --> 00:05:31,000
And it turns out that it's that this heuristic gives a pretty accurate answer. A precise approximation is that n factorial is actually asymptotically equal to the square root of two pi n times n over e to the n.

30
00:05:31,000 --> 00:05:45,000
And we're going to prove that it requires elementary calculus, but more than we want to take time for. And this crucial formula that we will be using very regularly to estimate the size of n factorial is called sterling formula.

31
00:05:45,000 --> 00:05:51,000
And it's one to have on your crib sheets if you haven't memorized it.

