---
title: MIT6042J P73323AsymptoticPropertiesVideo
---

1
00:00:00,000 --> 00:00:11,000
An advantage of expressing the asymptotic notations in terms of limits is that a bunch of their properties then become immediately obvious.

2
00:00:11,000 --> 00:00:25,000
Here's one. If f is little of j, or f is asymptotically equal to j, then in fact, f is big O of j. Well, we could reason about this informally by saying that the first one means that f is much less than j.

3
00:00:25,000 --> 00:00:31,000
And the second one means that f is about the same as j, and the final one means that f is roughly less.

4
00:00:31,000 --> 00:00:44,000
So being about the same and definitely less is certainly this implies roughly less. But we can in fact be entirely precise just using the definitions because f equals O of j means the limit of f over g is zero.

5
00:00:44,000 --> 00:00:57,000
And f is asymptotically equal to g means that the limit of f over g is one, and the definition of f equals big O of g is that the limit is finite. And clearly if it's zero or one, then it's finite.

6
00:00:57,000 --> 00:01:10,000
Another such property is that if f is much less than g, then g is not roughly less than f. More precisely, if f is little O of g, then g is not big O of f.

7
00:01:10,000 --> 00:01:26,000
The left hand side says that the limit of f over g is zero. But that implies that the limit of g over f is one over zero or infinity, which means it's not finite. So g is not big O of f.

8
00:01:26,000 --> 00:01:43,000
Now the usual way that big O is defined in the literature doesn't mention limits at all. And in fact, as I said, the definition really isn't a limit. It's a limb soup. And let me show you the standard definition and then explain why the limb soup captures it and is needed.

9
00:01:43,000 --> 00:02:03,000
So the definition of f is big O of g is that there's some constant multiplier, c, that you can amplify g by such that once g is amplified by the factor c, then in fact, f is less than or equal to c times g.

10
00:02:03,000 --> 00:02:10,000
But this doesn't may not hold right at the beginning. There's a certain point and zero after which it holds forever.

11
00:02:10,000 --> 00:02:25,000
Let's try to illustrate this complicated alternation of quantifiers expression with a diagram that may make it clearer. So suppose that I want to express the fact that f is big O of g, where f is a green line.

12
00:02:25,000 --> 00:02:43,000
So that green line is the graph of f of x, the function. And g in blue is shown. And as a matter of fact, g of x is less than or equal to f of x. But nevertheless, f is going to be little O big O of g.

13
00:02:43,000 --> 00:03:00,000
Because if you multiply g by a constant, it becomes sort of shifting it up to it be this constant times g. It becomes this purple curve. And the purple curve, it gets to be above the green curve from a certain point on. That's n zero.

14
00:03:00,000 --> 00:03:16,000
So by raising up the blue curve g by an amount c to get it to be this purple curve, the purple curve gets above f from a certain point n zero on. And that's why f is big O of g.

15
00:03:16,000 --> 00:03:39,000
Now of course multiplying the blue curve g by a constant doesn't raise it up a fixed amount. It alters it. But if we imagine that our curve was a log scale, then in fact multiplying g by c is the same as adding log c on a log scale. So the picture is actually accurate if the vertical scale is logarithmic.

16
00:03:39,000 --> 00:04:02,000
So using this standard definition, I can explain why in the equivalent definition in terms of limit, I couldn't say limit, I needed to say, lim soup. Here's what lim soup does for us. Suppose I have a function f that's less than or equal to 2g, which means that surely f is big O of g according to the previous definition. Because you amplify g by 2 and you get above f.

17
00:04:02,000 --> 00:04:15,000
The problem is that f of n over g of n may have no limit. So I can't simply say that f is O of g because the limit of f over g is finite.

18
00:04:15,000 --> 00:04:37,000
Let's see what how that could happen. Suppose that f is in fact equal to g times the number that varies between 1 and 2. Here's that's an example where sine of n pi over 2 varies between 0, 1 and minus 1. And you square it, it becomes 0 or 1. And you add 1 to it, it becomes 1 or 2.

19
00:04:37,000 --> 00:05:01,000
So this is an expression which as n grows, alternates between the values 1 and 2. And I'm multiplying g of n by this constant that's either 1 or 2. But the limit of f of n over g of n does not exist. It's alternating between 1 and 2.

20
00:05:01,000 --> 00:05:13,000
On the other hand, the limsoop of f of n over g is 2, which is finite and therefore according to the limsoop definition indeed, f is O of g.

21
00:05:13,000 --> 00:05:28,000
Now the technical definition of limsoop is one that you can read in the text or find in a calculus book. It's basically the largest limit point of the fraction f of n over g of n. And if you don't know what a limit point is,

22
00:05:28,000 --> 00:05:48,000
it's stuff that we don't need to go into. But I did want you to understand why formally we need limsoop. In most cases, the limit exists and we can use the simpler limit definition rather than the exists a constant such that for every number n greater than or equal to n 0, etc.

23
00:05:48,000 --> 00:05:53,000
which is a more complicated definition.

24
00:05:53,000 --> 00:06:09,000
Okay, let's collect a couple of more basic facts about little l that and big O that we're going to need. Namely, that if a is less than b, I don't know, it can be negative numbers, I don't care, but real numbers.

25
00:06:09,000 --> 00:06:25,000
If a is less than b, then x to the a is little o of x to the b. The profile is almost immediately from the definitions because to prove that x to the a is little low of x to the b, we want to look at the quotient of x to the a over x to the b.

26
00:06:25,000 --> 00:06:34,000
But of course, the quotient of x to the a over x to the b is equal to 1 over x to the b minus a. And since a is less than b, b minus a is positive.

27
00:06:34,000 --> 00:06:51,000
So that means that as x approaches infinity, the denominator is x to a positive power also goes to infinity and therefore 1 over x to that positive power goes to 0, which is the definition of x to the a being little o of x to the b.

28
00:06:52,000 --> 00:07:07,000
Another crucial fact is that logarithms grow slower than roots. So you think of epsilon as like a half or a third saying that the log of x is less than or equal to the square root, less than or equal to the cube root, less than or equal to 50, it doesn't matter.

29
00:07:07,000 --> 00:07:19,000
Okay, this is a proof that just falls back on elementary calculus. And I guess I've highlighted it because it's definitely worth remembering logarithms grow slower than roots.

30
00:07:20,000 --> 00:07:30,000
The proof begins with the immediately obvious remark that 1 over y is less than or equal to y because they're equal when y is greater equal to 1.

31
00:07:30,000 --> 00:07:40,000
1 over y is equal to y when a y is greater equal to 1 and as y increases, y gets bigger and 1 over y gets smaller so the inequality is preserved. That's easy.

32
00:07:40,000 --> 00:07:52,000
Okay, well that means that I can integrate both sides starting at 1. So if I take the integral of 1 over y from 1 to z, it's going to be less than or equal to the integral of y from 1 to z.

33
00:07:52,000 --> 00:08:03,000
Well, integral of 1 over y is log z and the integral of y is a to z is z squared over 2. So what we get is this new inequality.

34
00:08:03,000 --> 00:08:16,000
The log of z is less than or equal to z squared over 2 for z, greater equal to 1. So we're on the way there. We've got log of z is less than z squared but not z to any epsilon power.

35
00:08:16,000 --> 00:08:27,000
But we'll get that just by making a smart substitution for z. So that's the next step. We have that log of z is less than or equal to z squared over 2 for any z, greater equal to 1.

36
00:08:27,000 --> 00:08:46,000
Let's let z be the square root of x to the delta where delta is simply some positive number. So in that case, what's the log of z? Well, the log of the square root of x to the delta, the square root means it's half of log of x to the delta which is delta log x.

37
00:08:46,000 --> 00:08:58,000
So log of z is delta log of x over 2. And of course, z squared is just x to the delta. So z squared over 2 is x to the delta over 2.

38
00:08:58,000 --> 00:09:09,000
Now, I can just cancel the denominators too. And I get that log of x and then transpose the delta log of x is less than or equal to x to the delta over delta.

39
00:09:09,000 --> 00:09:24,000
But delta, as long as delta is less than epsilon, delta x to the delta is going to be little low of x to the epsilon which means that x to the delta times a constant, namely 1 over delta is also going to be little low of x to the epsilon.

40
00:09:24,000 --> 00:09:34,000
And I've just figured out that I've shown that log of x is little o of x to the epsilon as required.

41
00:09:35,000 --> 00:09:43,000
One more crucial fact that I'm going to not prove, but I'll state is that polynomials grow slower than exponentials.

42
00:09:43,000 --> 00:09:57,000
This is closely related to the fact that logs grow slower than roots. But in particular, if x is any kind of c is any constant, and a is greater than 1, then x to the c is little o of a to the x.

43
00:09:57,000 --> 00:10:09,000
And there's a bunch of ways to prove this using Lopey-Tal's rule of McLaren series. And I'll leave it to you to look up your 1801 calculus text to find a proof of that fact.

