---
title: MIT6042J P67311ArithmeticSumsVideo
---

1
00:00:00,000 --> 00:00:06,799
So now we start on a new unit called counting or combinatorics, and it's about counting things.

2
00:00:06,799 --> 00:00:13,000
Now one of the things that happens when you're counting is you're typically adding up a bunch of numbers

3
00:00:13,000 --> 00:00:17,400
that you've counted along the way, and so you wind up needing to deal with sums a lot.

4
00:00:17,400 --> 00:00:20,100
And so let's start with those mathematical preliminaries.

5
00:00:20,100 --> 00:00:24,400
We're going to look at three kinds of sums, arithmetic sums, geometric sums, and harmonic sums,

6
00:00:24,500 --> 00:00:32,299
all of which come up very regularly, and they all have reasonably nice formulas that explain what they sum to.

7
00:00:32,299 --> 00:00:36,299
Let's begin with the simplest ones of arithmetic sums.

8
00:00:36,299 --> 00:00:38,299
So there's an example.

9
00:00:38,299 --> 00:00:47,299
This supposedly is the kind of problem that was assigned to children in the 18th century to keep them busy in class.

10
00:00:48,299 --> 00:00:56,299
And the great mathematician Gauss, Karl Friedrich Gauss, who you know from magnetism and from probability theory,

11
00:00:56,299 --> 00:01:03,299
but also in fact the inventor of congruence and the number theory that we've studied,

12
00:01:03,299 --> 00:01:08,299
showed his brilliance as a child prodigy when he was nine years old supposedly.

13
00:01:08,299 --> 00:01:16,299
He noticed that in that chart of numbers that we just saw, that were 30 numbers, and each one was 13 greater than the previous one.

14
00:01:16,299 --> 00:01:20,299
The idea being that the tutor didn't want to go through the effort of summing everything up.

15
00:01:20,299 --> 00:01:26,299
He knew the trick to get the sum quickly, but he kept his students busy for hours doing that kind of problem.

16
00:01:26,299 --> 00:01:30,299
I don't know whether this is a true story or not, but it's a good story. So let's go on with it.

17
00:01:30,299 --> 00:01:43,299
So in other words, what Gauss noticed was that the numbers on that page looked like 89 and 89 plus 13 down through the 30th number 89 plus 29 times 13.

18
00:01:44,299 --> 00:01:51,299
And then he saw how to get the sum of the simple expression for the value of this sum.

19
00:01:51,299 --> 00:01:59,299
And the logic is that let's call the first term f, and then the next term is f plus 2d, f plus d, where d is 13 and f is 89.

20
00:01:59,299 --> 00:02:09,300
Next one would be f plus 2d down to the end, and I'm going to call the last term l, which is 89 plus 29 times 13.

21
00:02:09,300 --> 00:02:19,300
And let's call that sum a. We don't know what it is yet, but we're very quickly going to derive it.

22
00:02:19,300 --> 00:02:29,300
One of the standard tricks to find nice formulas for sums is to find an arithmetic relation between the sum and a slight perturbation of the sum.

23
00:02:29,300 --> 00:02:33,300
In this case, I'm just going to write the sum backwards.

24
00:02:33,300 --> 00:02:40,300
So it's the same sum a, but written where the first term is last and the last term is first.

25
00:02:40,300 --> 00:02:54,300
And now notice what happens when I add up these two sums. I get 2a, of course, but every one of these terms, this is an f plus l, this is an f plus d plus l minus d, it's f plus l.

26
00:02:54,300 --> 00:03:03,300
This last one is an f plus l. Every one of these pairwise sums, subsums, comes out to be f plus l.

27
00:03:03,300 --> 00:03:15,300
And now we have a formula for the whole series, a nice simple formula, that a is equal to the sum of the first term plus the last term divided by 2 times the number of terms.

28
00:03:15,300 --> 00:03:22,300
By the way, the first term plus the last time divided by 2 is maybe more memorable if you remember that it's the average term.

29
00:03:22,300 --> 00:03:29,300
It's the average size term times the number of terms and that's how you sum up an arithmetic sum.

30
00:03:29,300 --> 00:03:37,300
So we can wrap up with a familiar example, namely the sum of the integers from 1 to n. This is an arithmetic series, starts with 1.

31
00:03:37,300 --> 00:03:52,300
And the d that is the difference from successive terms is simply 1. 1 plus 1, 1 plus 1, 1 plus 1, down to n. And according to our formula, it's the first plus the last over 2 times the number of terms.

32
00:03:52,300 --> 00:03:58,300
And we have that familiar formula for the sum of the first n integers.

