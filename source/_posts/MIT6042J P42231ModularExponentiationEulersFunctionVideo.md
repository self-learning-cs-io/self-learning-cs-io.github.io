---
title: MIT6042J P42231ModularExponentiationEulersFunctionVideo
---

1
00:00:00,000 --> 00:00:05,500
The elements that have inverse is modulo and will be particularly important to us.

2
00:00:05,500 --> 00:00:08,800
So the first question is how many of them are there,

3
00:00:08,800 --> 00:00:11,599
which is what Euler's function tells us.

4
00:00:11,599 --> 00:00:14,800
So the definition of Euler's function phi,

5
00:00:14,800 --> 00:00:22,800
phi of n is it's the number of integers in the remainder interval from 0 to n minus 1,

6
00:00:22,800 --> 00:00:25,400
such that k is relatively prime to n.

7
00:00:25,400 --> 00:00:29,400
So remember there's the notation for the remainder interval that includes 0 and x

8
00:00:29,399 --> 00:00:30,799
includes n.

9
00:00:30,799 --> 00:00:41,200
And another way to say relatively prime to n is to say the GCD of k and n is 1.

10
00:00:41,200 --> 00:00:45,700
So let's define that set of numbers that were interested in GCD,

11
00:00:45,700 --> 00:00:53,000
let GCD1 of n be those numbers that have a GCD of 1 within.

12
00:00:53,000 --> 00:00:57,399
That is the numbers that have inverses and the numbers that are cancelable.

13
00:00:57,399 --> 00:00:58,600
Modulo n.

14
00:00:58,600 --> 00:01:05,599
So what it means is that phi of n is precisely equal to the size of GCD1 of n.

15
00:01:05,599 --> 00:01:09,200
Now some authors call GCD1 of n and star.

16
00:01:09,200 --> 00:01:12,200
I didn't find that a very informative notation.

17
00:01:12,200 --> 00:01:14,000
And so I'm not using it.

18
00:01:14,000 --> 00:01:18,799
phi of n is also for your information called Euler's quotient function,

19
00:01:18,799 --> 00:01:23,599
but we'll just stick to calling it phi or Euler's phi.

20
00:01:23,599 --> 00:01:25,599
So let's look at an example.

21
00:01:25,599 --> 00:01:30,199
GCD1 of 7, the numbers that are relatively prime to 7,

22
00:01:30,199 --> 00:01:34,000
are all the positive numbers less than 7 because 7 is prime.

23
00:01:34,000 --> 00:01:38,199
So it's the set 1, 2, 3, 4, 5, 6.

24
00:01:38,199 --> 00:01:45,199
GCD1 of 12 is the numbers that have no factor in common with 12.

25
00:01:45,199 --> 00:01:48,399
They're the numbers in green below.

26
00:01:48,399 --> 00:01:52,199
And the other red numbers do have a number in common with 12.

27
00:01:52,199 --> 00:01:54,199
I do have a prime in common with 12.

28
00:01:54,200 --> 00:01:57,799
The pattern here is not so apparent.

29
00:01:57,799 --> 00:02:04,200
Anyway, phi of 7 is the size of GCD1 of 7, namely the size of the set 1 through 6,

30
00:02:04,200 --> 00:02:06,200
which is 6.

31
00:02:06,200 --> 00:02:10,199
GCD12 determines phi of 12.

32
00:02:10,199 --> 00:02:16,800
phi of 12 is the number of green elements, which is 4.

33
00:02:16,800 --> 00:02:18,800
OK.

34
00:02:18,800 --> 00:02:22,400
A simple rule for calculating phi when phi is prime,

35
00:02:22,400 --> 00:02:23,800
we've already indicated.

36
00:02:23,800 --> 00:02:29,599
Namely, everything, every positive number less than p is relatively prime to p,

37
00:02:29,599 --> 00:02:33,400
and so phi of p is simply p minus 1.

38
00:02:33,400 --> 00:02:39,000
Let's look at a more important example or illustrative example, namely phi of 9.

39
00:02:39,000 --> 00:02:42,400
So there are the candidate numbers from 0 through 8,

40
00:02:42,400 --> 00:02:46,200
and which ones are relatively prime to 9?

41
00:02:46,200 --> 00:02:51,200
Well, it's relatively prime to 9 if and only if it's relatively prime to 3.

42
00:02:51,199 --> 00:02:59,000
Now, which numbers in this interval are relatively prime to 3, or rather are not relatively prime to 3?

43
00:02:59,000 --> 00:03:03,000
Well, it's every third number that's divisible by 3.

44
00:03:03,000 --> 00:03:04,799
So those are the bad ones.

45
00:03:04,799 --> 00:03:09,399
If we subtract the bad ones, we're left with the good ones, the good ones that are relatively prime.

46
00:03:09,399 --> 00:03:14,799
So phi of 9 is simply the set of all the numbers minus 1 third of 9,

47
00:03:14,799 --> 00:03:18,199
which is the bad one, bad ones, namely 6.

48
00:03:18,199 --> 00:03:20,799
This generalizes to a power of a prime.

49
00:03:20,800 --> 00:03:28,400
If k is a positive integer, then phi of p to the k, the reasoning is that a number is relatively prime to the p to the k.

50
00:03:28,400 --> 00:03:34,000
If and only if it's relatively prime to p, p divides every pth number.

51
00:03:34,000 --> 00:03:46,000
So one pth of the numbers in the interval are bad, which means that phi of p is the good ones minus 1 pth of p to the k,

52
00:03:46,000 --> 00:03:53,800
namely phi of p to the k is p to the k minus p to the k over p, which can also be expressed in a more standard form,

53
00:03:53,800 --> 00:03:58,199
p to the k minus p to the power k minus 1.

54
00:03:58,199 --> 00:04:06,199
And that knocks off the story of phi, a phi to the p for powers of primes.

55
00:04:06,199 --> 00:04:10,800
Well, suppose you're dealing with a number that's not a power of a prime,

56
00:04:11,000 --> 00:04:20,000
and there's one very elegant little fact about phi that explains how to deal with non-powers of primes, namely.

57
00:04:20,000 --> 00:04:29,800
If a and b are relatively prime, then phi of a b is simply gotten by computing phi of a and multiplying it by phi of b.

58
00:04:29,800 --> 00:04:34,800
This property of phi is called multiplicativity, by the way, comes up a lot in number theory.

59
00:04:34,800 --> 00:04:45,199
A function is multiplicative when its value at a product of relatively prime numbers is the product of the values at those two relatively prime numbers.

60
00:04:45,199 --> 00:04:47,199
So phi is multiplicative.

61
00:04:47,199 --> 00:05:00,000
Now, the proof of that, one proof is on problem set 5, and there's another proof that we'll see in a couple of weeks when we get into counting in the inclusion exclusion principle.

62
00:05:00,000 --> 00:05:09,000
Let's just use this fact about phi, the multiplicativity of phi, to see how it lets us calculate phi of an arbitrary number.

63
00:05:09,000 --> 00:05:15,000
So in particular, phi of 12, which looked complicated earlier, well, 12 is 3 times 4.

64
00:05:15,000 --> 00:05:24,000
So that means that phi of 12 is phi of 3 times phi of 4, but now I'm in great shape because 3 is a power of a prime, namely 3 to the 1,

65
00:05:24,000 --> 00:05:28,000
and 4 is a power of a prime, namely 2 squared.

66
00:05:28,000 --> 00:05:41,000
So applying the power of prime formulas, I get that phi of 3 is 3 times 1 times 2 squared minus 2 to the 2 minus 1, which simplifies to 4, which is the answer that we saw before.

67
00:05:41,000 --> 00:06:03,000
And the punchline for why we're examining phi is Euler's theorem, which tells us how powers of numbers in GCT1 of n behave, namely that if k is relatively prime to n, then if you raise k to the power phi of n, it's congruent to 1 mod n.

68
00:06:03,000 --> 00:06:06,000
And that will lead us in the next section.

69
00:06:06,000 --> 00:06:10,000
We will look at the proof of Euler's theorem.

