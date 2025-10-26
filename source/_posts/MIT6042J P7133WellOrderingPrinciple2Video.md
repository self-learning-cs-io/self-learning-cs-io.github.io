---
title: MIT6042J P7133WellOrderingPrinciple2Video
---

1
00:00:00,000 --> 00:00:09,419
So let's look at two examples of using the well-ordering principle.

2
00:00:09,419 --> 00:00:15,880
One of them is pretty obvious and the other one is not hard but a little bit more interesting.

3
00:00:15,880 --> 00:00:21,320
So what we're going to prove is that every integer greater than one is a product of primes.

4
00:00:21,320 --> 00:00:31,560
So remember a prime is an integer greater than one that is only divisible by itself and the number one.

5
00:00:31,560 --> 00:00:38,120
It can't be expressed as the product of other numbers greater than one.

6
00:00:38,120 --> 00:00:42,799
So the way we're going to prove this by contradiction and we're going to begin by assuming,

7
00:00:42,799 --> 00:00:48,320
suppose that there were some numbers that were non-products of primes.

8
00:00:48,320 --> 00:00:53,039
Okay, that is to say the set of non-products is non-empty.

9
00:00:53,039 --> 00:00:58,439
So applying the well-ordering principle to this non-empty set of non-products,

10
00:00:58,439 --> 00:01:00,320
there's got to be a least one.

11
00:01:00,320 --> 00:01:05,560
So M is a number greater than one that is not a product of primes.

12
00:01:05,560 --> 00:01:08,799
Now by convention, if M itself was a prime,

13
00:01:08,799 --> 00:01:10,879
it's considered to be a product of one prime.

14
00:01:10,879 --> 00:01:13,840
So we know that M is not a prime.

15
00:01:19,199 --> 00:01:23,199
Now look, M is not a prime or if it was a prime,

16
00:01:23,199 --> 00:01:25,199
it would be a product of just itself.

17
00:01:25,199 --> 00:01:28,839
So that means that it must be a product of two numbers,

18
00:01:28,839 --> 00:01:33,199
called them J and K, where J and K are greater than one and less than M.

19
00:01:33,199 --> 00:01:34,759
That's what it means to be a non-prime.

20
00:01:34,759 --> 00:01:37,119
It's a product of J and K.

21
00:01:37,119 --> 00:01:40,359
Well, J and K are less than M.

22
00:01:40,359 --> 00:01:46,519
So that means that they must be prime products because they're less than M and greater than one.

23
00:01:46,519 --> 00:01:50,560
And M is the smallest such number that's not a product of primes.

24
00:01:50,560 --> 00:01:56,079
So we can assume that J is equal to some product of primes say P1 through P94.

25
00:01:56,079 --> 00:02:00,359
And K is some other product of primes Q1 through Q13.

26
00:02:01,560 --> 00:02:03,159
So you can see where this is going.

27
00:02:03,159 --> 00:02:06,679
Now what we have is that M, which is JK,

28
00:02:06,679 --> 00:02:11,759
is simply the product of those P's followed by the product of those Q's.

29
00:02:11,759 --> 00:02:15,599
M is in fact a prime product, which is a contradiction.

30
00:02:15,599 --> 00:02:18,479
So what did we assume that led to the contradiction?

31
00:02:18,479 --> 00:02:22,719
We assumed that there were some counter examples and there must not be any.

32
00:02:22,719 --> 00:02:27,719
And no counter examples means that in fact every single integer greater than one

33
00:02:27,719 --> 00:02:30,400
is indeed a product of primes as clear.

34
00:02:31,400 --> 00:02:35,359
Let's start looking at a slightly more interesting example using the well-ordered principle

35
00:02:35,359 --> 00:02:37,799
to reasoning about postage.

36
00:02:37,799 --> 00:02:42,400
So suppose that we have a bunch of 5 cents stamps and 3 cents stamps.

37
00:02:42,400 --> 00:02:48,879
And what I want to analyze is what amounts of postage can you make out of 5 cents stamps and 3 cents stamps?

38
00:02:48,879 --> 00:02:53,120
So I'm going to introduce a technical definition for convenience.

39
00:02:53,120 --> 00:02:57,000
Let's say that a number N is postal.

40
00:02:57,000 --> 00:03:01,719
If I can make N plus 8 cents postage from 3 and 5 cents stamps.

41
00:03:04,680 --> 00:03:07,280
So this is what I'm going to prove.

42
00:03:07,280 --> 00:03:09,319
I claim that every number is postal.

43
00:03:09,319 --> 00:03:14,159
In other words, I can make every amount of postage from 8 cents up.

44
00:03:15,560 --> 00:03:18,919
Okay, I'm going to prove this by applying the well-ordering principle.

45
00:03:18,919 --> 00:03:25,079
And as usual with well-ordering principles will begin by supposing that there was a number that wasn't postal.

46
00:03:25,079 --> 00:03:26,919
That would be a counter example.

47
00:03:26,919 --> 00:03:34,599
So if there's any number that's not postal, then there's a least one M by the well-ordering principle

48
00:03:34,599 --> 00:03:37,079
because the set of counter examples is not empty.

49
00:03:37,080 --> 00:03:40,360
If some number is not postal, so there's a least one.

50
00:03:41,320 --> 00:03:46,200
So what we know, in other words, is that this least M that's not postal has the property.

51
00:03:46,200 --> 00:03:47,520
It's not postal.

52
00:03:47,520 --> 00:03:51,240
And any number less than it is postal.

53
00:03:52,400 --> 00:03:53,720
See what we can figure out about M.

54
00:03:53,720 --> 00:04:02,720
First of all, M is not 0.0 is postal because 0 plus 8 cents can be made with a 3 cents stamp and a 5 cents stamp.

55
00:04:02,719 --> 00:04:07,039
M is not 0 because M is supposed to be not postal.

56
00:04:08,560 --> 00:04:15,280
As a matter of fact, by the same reasoning, M is not 1 because you can make 1 plus 8 cents with 3 threes.

57
00:04:15,280 --> 00:04:21,240
And M is not 2 because you can make 2 plus 8 cents, 10 cents using 2 fives.

58
00:04:22,279 --> 00:04:30,160
So we've just figured out that this least counter example has to be greater than or equal to 3 because 0, 1 and 2 are not counter examples.

59
00:04:31,160 --> 00:04:35,600
So we've got that M is greater than or equal to 3, the least non-postal number.

60
00:04:35,600 --> 00:04:40,880
So if I look at M minus 3, that means it's a number that's greater equal to 0 and it's less than M.

61
00:04:40,880 --> 00:04:44,360
So it's postal because M is the least non-postal one.

62
00:04:44,360 --> 00:04:48,360
Alright, so in other words, I can make out of 3 and 5 cents stamps.

63
00:04:48,360 --> 00:04:51,320
I can make M minus 3 plus 8 cents.

64
00:04:51,320 --> 00:04:58,600
But look, if I can make M minus 3 plus 8 cents, then obviously M is postal also because I just add 3 cents

65
00:04:59,080 --> 00:05:07,280
to that M minus 3 number and I wind up with M plus 8 cents, which says that M is postal and it's a contradiction.

66
00:05:07,280 --> 00:05:15,840
So assuming that there was at least non-postal number, I reach a contradiction and therefore there is no non-postal number.

67
00:05:15,840 --> 00:05:22,360
Every number is postal, 0 plus 8 is postal, 1 plus 8 is postal, 2 plus 8 is postal.

68
00:05:22,360 --> 00:05:27,080
Every number greater than or equal to 8 cents can be made out of 3 and 5 cents stamps.

69
00:05:28,600 --> 00:05:33,560
So if I can make M minus 3 plus 8 cents, then I can make M minus 3 plus 8 cents stamps.

70
00:05:33,560 --> 00:05:38,560
So if I can make M minus 3 plus 8 cents, then I can make M minus 3 plus 8 cents stamps.

71
00:05:38,560 --> 00:05:43,560
So if I can make M minus 3 plus 8 cents stamps, then I can make M minus 3 plus 8 cents stamps.

72
00:05:43,560 --> 00:05:48,560
So if I can make M minus 3 plus 8 cents stamps, then I can make M minus 3 plus 8 cents stamps.

73
00:05:48,560 --> 00:05:53,560
So if I can make M minus 3 plus 8 cents stamps, then I can make M minus 3 plus 8 cents stamps.

