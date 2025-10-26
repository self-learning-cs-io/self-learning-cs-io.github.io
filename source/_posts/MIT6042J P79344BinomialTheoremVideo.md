---
title: MIT6042J P79344BinomialTheoremVideo
---

1
00:00:00,000 --> 00:00:07,000
We're going to spend a couple of minutes talking about the binomial theorem, which is probably familiar to you from high school.

2
00:00:07,000 --> 00:00:14,000
And it is a nice illustration, first illustration of the connection between algebra and computation.

3
00:00:14,000 --> 00:00:23,000
So the idea that underlies the connection is illustrated by the distributive law.

4
00:00:23,000 --> 00:00:32,000
And I'm purposely writing it in this wacky way of, it's purely symbolic, where I'm going to multiply three beanies by two both neckties.

5
00:00:32,000 --> 00:00:36,000
What do I get if I multiply three beanies by two neckties?

6
00:00:36,000 --> 00:00:49,000
Well, Apple applying the distributive law says that we get every possible pairing of a, of a beanie and a necktie multiplied together and it emollop.

7
00:00:49,000 --> 00:00:56,000
So there are three terms here and two terms there. I'm going to wind up with six terms, which you see laid out.

8
00:00:56,000 --> 00:01:14,000
The basic rule is that a product of sums by the distributive law becomes a sum of products and the sums that you get involves products of all of the terms from each of the components in every possible way.

9
00:01:15,000 --> 00:01:19,000
Let's look at that as it applies to the binomial theorem.

10
00:01:19,000 --> 00:01:28,000
So the binomial theorem is interested in the question of, let's look at the expression 1 plus x raised to the nth power.

11
00:01:28,000 --> 00:01:41,000
And we know that this will be a polynomial of degree n, so it can be written in the form a constant c0 plus c1 times x to the 1, c2, x to the 2, cn, x to the n.

12
00:01:41,000 --> 00:01:56,000
So we like to ask, what are the expressions for ck? So for example, here's a layout of the first four powers of x. Let's say 1 plus x to the 4th is 1 plus 4x plus 6x squared, 4x cubed, 1x4th.

13
00:01:56,000 --> 00:02:03,000
What's the pattern that underlies those coefficients? 1, 4, 6, 4, 1.

14
00:02:03,000 --> 00:02:14,000
Well, one way to think about it is that if I wrote out 1 plus x to the n fully, it is of course a product of n occurrences of 1 plus x times 1 plus x.

15
00:02:14,000 --> 00:02:22,000
And applying the distributive law, the product of sums equals sum of products rule, but this time there are n products.

16
00:02:22,000 --> 00:02:37,000
And what I wind up with is 2 to the n terms that I'm adding up, each of them is a product of a selection of n items, 1 from each of the factors.

17
00:02:37,000 --> 00:02:43,000
So a term among these 2 to the n terms corresponds to selecting a 1 or an x from each of the n factors.

18
00:02:43,000 --> 00:02:51,000
So if I started off, for example, by selecting a 1, a 1, a 1 from each of the n factors, I get the term 1 to the n.

19
00:02:51,000 --> 00:02:57,000
If I selected an x and x and x and x from each of the terms, I get this last term x to the n.

20
00:02:57,000 --> 00:03:19,000
And if I made some arbitrary selection like I selected an x from the first one and a 1 from the second one and a 1 from the second one, from the third one, I'm reading this term, 1 from the fourth and so on, and a 1 from the next, and x from the next to the last and a 1 from the last, I would get this particular term, which is not the next one that would occur enough in medical order, but it's just an example.

21
00:03:19,000 --> 00:03:39,000
So that's the simple idea. If you multiply out n terms, each of which is a sum of two things, you're going to wind up with 2 to the n terms corresponding to every possible way of selecting 1 or the other of the terms of the components from each of the n products.

22
00:03:39,000 --> 00:03:58,000
So what's the coefficient of x to the k? Well, the coefficient of x to the k is the number of those terms among the 2 to the n in which the power of x is k, that is in which I selected k-x's and willing n-k1's.

23
00:03:58,000 --> 00:04:13,000
Well, how many ways are there to select k-x's among these n terms? And we know the answer to that, it's n choose k. It's all the ways of choosing a subset of k items out of n items.

24
00:04:13,000 --> 00:04:26,000
And that's the answer, ck is simply n choose k, and this is called the binomial formulas. So now we know that 1 plus x to the n is n choose 0 plus n choose 1 x and choose 2 x squared.

25
00:04:26,000 --> 00:04:37,000
n choose k x to the k is the general term ending with n choose n to the x to the n. So this expression, 1 plus x is called a binomial expression.

26
00:04:37,000 --> 00:04:48,000
And the choose numbers, which we've seen previously, is the number of ways to choose, say, in this case, k out of n elements are called binomial coefficients.

27
00:04:48,000 --> 00:05:00,000
And this is why they're called binomial coefficients. So if I was going to express it more generally, I didn't need it to be 1, I used 1 plus x just because it was easy to follow the structure of the formula.

28
00:05:00,000 --> 00:05:11,000
But if I look at x plus y to the nth power, again, the coefficients are the same, it's n choose 0, but this time, y to the n, n choose 1 x, y to the n minus 1.

29
00:05:11,000 --> 00:05:24,000
What's happening now is that I'm choosing an x or a y instead of an x or a 1 from each of the terms, so that the x, y terms are always going to have a sum of degrees that's equal to n.

30
00:05:24,000 --> 00:05:31,000
If I choose k x's, I must have chosen n minus k y's.

31
00:05:31,000 --> 00:05:38,000
And there it is, expressed in a more concise form using sigma notation. That is the binomial formula.

