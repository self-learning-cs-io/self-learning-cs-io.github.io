---
title: MIT6042J P271104StructuralInductionVideo
---

1
00:00:00,000 --> 00:00:10,000
So whenever you define a recursive data type,

2
00:00:10,000 --> 00:00:17,000
part of the implicit in the definition is a method for proving things about it called structural induction.

3
00:00:17,000 --> 00:00:26,000
And the way structural induction works is that if you want to prove that every element in some recursively defined data type has a particular property p,

4
00:00:26,000 --> 00:00:38,000
then you proceed by showing that every one of the elements in the base case that are in R has property p,

5
00:00:38,000 --> 00:00:48,000
and moreover that if you apply a constructor to an element x, then it has property p whenever x has property p,

6
00:00:48,000 --> 00:00:59,000
that as you can assume as an as a structural induction hypothesis, p of x, and then you need to show that p of c of x holds and this applies for each constructor c.

7
00:00:59,000 --> 00:01:04,000
Some constructors take more than one arguments, but this is meant to illustrate the general pattern.

8
00:01:04,000 --> 00:01:17,000
Let's do an easy example. First, this is when we've actually seen and we took for granted this method of proof without highlighting it when we argued that the set e that was recursively defined in the last presentation,

9
00:01:17,000 --> 00:01:29,000
contained the even only even numbers. So remember the definition of e was that 0 is in e, and we're going to be proving that x is even by induction.

10
00:01:29,000 --> 00:01:38,000
So we need to check the base case, yes, 0 is even. And then we need to show that assuming the structural induction hypothesis that n is even,

11
00:01:38,000 --> 00:01:49,000
then when we apply the constructor n plus 2, it's even, well obviously it is, or if we apply the constructor minus n, that's also even. And it is as well.

12
00:01:49,000 --> 00:01:59,000
And that's why structural induction tells us that in fact every string in the set e is even.

13
00:01:59,000 --> 00:02:07,000
Now let's look at a somewhat more interesting example, which was the set m of matching right and left brackets.

14
00:02:07,000 --> 00:02:18,000
And what I want to prove by structural induction is that every string in m has the same number of left brackets and right brackets.

15
00:02:19,000 --> 00:02:33,000
Alright, I can restate this by defining or nt are in m, then so is s, which you get by putting brackets around r and following it by t.

16
00:02:33,000 --> 00:02:45,000
Well, here's the argument. We're allowed to assume when we're trying to prove that s has an equal number of left and right brackets, and we're allowed to assume that r does and so does t.

17
00:02:45,000 --> 00:02:57,000
So let's look at the number of right brackets in s, well where do they come from? The right brackets in s consist of, well, the first symbol in s is a left bracket, so that doesn't matter.

18
00:02:57,000 --> 00:03:07,000
Then it's the right brackets in r, and then there is a new right bracket that gets added, and then there are the right brackets in t.

19
00:03:07,000 --> 00:03:20,000
So what I can say is that the right brackets in s are simply the number of them is the sum of the number in r plus the number in t plus one more, because the constructors are through in one more right bracket.

20
00:03:20,000 --> 00:03:30,000
By exactly the same reasoning, the number of left brackets in s is the number of left in r left in t plus one.

21
00:03:31,000 --> 00:03:49,000
Now, because of hypothesis p of r, the number of right and left brackets in r are equal. And likewise, by the induction hypothesis p of t, the number of right and left brackets in t are equal.

22
00:03:50,000 --> 00:03:58,000
And so the right hand sides of both of these equations are equal, and that means that the left hand sides are equal.

23
00:03:58,000 --> 00:04:15,000
We've just proved that the number of right brackets in s and the number of left brackets in s are the same. So p of s is true, the constructor case is covered, and we can conclude by structural induction that every s in the set m,

24
00:04:15,000 --> 00:04:28,000
or cursively defined set of strings of match brackets is in fact has an equal number of left and right brackets, which means that m is a subset of q as claim.

25
00:04:28,000 --> 00:04:39,000
While those were pretty easy structural inductions, and as with regular induction proofs, when you get the right induction hypothesis, the proofs tend to be easy.

26
00:04:39,000 --> 00:05:06,000
And we are going to work on an interesting example having to do with the f 18 functions, one of the reasons why the f 18s are what's considered in first term calculus is that if you look at all of those functions, remember you got them by taking constant functions and the identity function, and the function sine x, and then you could combine them in various ways by adding multiplying, exponentially, and composing, taking inverses.

27
00:05:06,000 --> 00:05:22,000
That we didn't need to add a constructor of taking the derivative, because it turns out that you can prove by structural induction that the f 18s are closed under taking derivatives, and that makes a lovely class problem.

