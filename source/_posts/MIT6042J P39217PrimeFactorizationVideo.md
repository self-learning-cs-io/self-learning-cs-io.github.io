---
title: MIT6042J P39217PrimeFactorizationVideo
---

1
00:00:00,000 --> 00:00:06,600
Now we come to a more serious application of the fact that the GCD is a linear combination.

2
00:00:06,600 --> 00:00:11,400
We're going to use it to prove the prime factorization theorem, which we've talked about earlier.

3
00:00:11,400 --> 00:00:14,400
This is the unique prime factorization theorem.

4
00:00:14,400 --> 00:00:23,199
So let's begin by looking at a technical property of primes, which is familiar,

5
00:00:23,199 --> 00:00:29,199
but we're going to need to prove it if you believe in prime factorization,

6
00:00:29,199 --> 00:00:36,799
then this lemma, which says that if P divides a product, it divides one or the other of the components of the product.

7
00:00:36,799 --> 00:00:40,799
That's an immediate consequence of the prime factorization theorem, but we must improve it that way

8
00:00:40,799 --> 00:00:44,600
because we're trying to use this to prove prime factorization.

9
00:00:44,600 --> 00:00:52,799
So how can I prove based on the facts of what we know about GCDs without appealing to prime factorization

10
00:00:52,799 --> 00:01:02,199
that if P is a prime and P divides a product, then it divides one of the components of the product,

11
00:01:02,199 --> 00:01:05,000
either the multiplier or the multiplicand.

12
00:01:05,000 --> 00:01:08,000
Okay, well here's how to prove that.

13
00:01:08,000 --> 00:01:15,000
Suppose that P divides A, B, but it doesn't divide A. Of course, if it does divide A, I'm done.

14
00:01:15,000 --> 00:01:18,400
So we may as well assume that it doesn't divide A.

15
00:01:18,600 --> 00:01:25,000
Now that means that since the only divisors of the only divisors of P are P and 1,

16
00:01:25,000 --> 00:01:32,600
the only positive divisors of P are P and 1, that if P doesn't divide A, the GCD of A and P is 1.

17
00:01:32,600 --> 00:01:36,200
All right, now comes a linear combination trick.

18
00:01:36,200 --> 00:01:43,400
Given that the GCD of P and A is 1, that means that I have a linear combination of A and P that's equal to 1.

19
00:01:43,400 --> 00:01:49,000
SA plus Tp is equal to 1 for some coefficients, S and T, cool.

20
00:01:49,000 --> 00:01:52,400
Multiply everything by B on the right.

21
00:01:52,400 --> 00:02:00,000
So that means that SAB plus TpB is equal to 1 times B, but look what we have now.

22
00:02:00,000 --> 00:02:08,200
The first term on the left is something times A, B and P divides A, B, so that first term is divisible by P.

23
00:02:08,200 --> 00:02:12,000
The second term explicitly has a P in it, so it's certainly divisible by P.

24
00:02:12,000 --> 00:02:20,599
So the left-hand side is a linear combination of multiples of P and therefore itself is a multiple of P,

25
00:02:20,599 --> 00:02:27,599
which means the right-hand side is a multiple of P and the right-hand side is B, so sure enough P divides B.

26
00:02:27,599 --> 00:02:29,599
We're done.

27
00:02:29,599 --> 00:02:39,599
The very elegant little proof that follows immediately from the fact that you can express the GCD of two numbers as a linear combination of those numbers.

28
00:02:39,599 --> 00:02:45,199
Now this is the key technical lemma that we need to prove unique factorization.

29
00:02:45,199 --> 00:02:50,799
A corollary of this that I'm actually going to need is that if P divides a product of more than two things,

30
00:02:50,799 --> 00:02:56,199
if P divides a product of a lot of things, it has to divide at least one of them.

31
00:02:56,199 --> 00:03:03,199
And this you could prove by induction with the base case being that it works for M equals 2,

32
00:03:03,199 --> 00:03:06,799
but it's not very interesting and we're going to take that for granted.

33
00:03:06,800 --> 00:03:12,400
If P divides a product of any size, it divides one of the components of the product.

34
00:03:12,400 --> 00:03:13,400
All right.

35
00:03:13,400 --> 00:03:25,000
Now we're ready to prove what's called the fundamental theorem for arithmetic, which says that every integer greater than one factors uniquely into a weekly decreasing sequence of primes.

36
00:03:25,000 --> 00:03:30,400
Now the statement of weekly decreasing is a little bit technical and unexpected.

37
00:03:30,400 --> 00:03:36,400
What we want to say is that a number factors into the same set of primes.

38
00:03:36,400 --> 00:03:42,400
Well, that's not quite right because the set of primes doesn't take into account how many times each prime occurs.

39
00:03:42,400 --> 00:03:51,400
You could try to make a statement about every number uniquely is a multiple of a certain number of each kind of prime.

40
00:03:51,400 --> 00:03:58,000
But a slick way to do that is simply to say, take all the prime factors, including multiple occurrences of a prime.

41
00:03:58,000 --> 00:04:01,599
And line them up in weekly decreasing order.

42
00:04:01,599 --> 00:04:05,599
And when you do that, that sequence is unique.

43
00:04:05,599 --> 00:04:06,599
Okay.

44
00:04:06,599 --> 00:04:12,400
This fundamental theorem of arithmetic is also called the prime factorization theorem.

45
00:04:12,400 --> 00:04:24,000
And here's what it says when we spell it out without using the words weekly decreasing or weekly decreasing.

46
00:04:24,000 --> 00:04:29,600
It says that every integer n greater than one has a unique factorization into primes.

47
00:04:29,600 --> 00:04:37,000
Mainly it can be, namely it can be expressed as a product of p1 through pk is equal to n.

48
00:04:37,000 --> 00:04:45,399
With p1 greater than equal to p2 greater than equal to each successive prime in the sequence with the smallest one last.

49
00:04:45,399 --> 00:04:48,000
Okay.

50
00:04:48,000 --> 00:04:49,000
Let's do an example.

51
00:04:49,000 --> 00:04:56,000
So there's a number that was not chosen by accident because I worked out what the factorization was.

52
00:04:56,000 --> 00:05:00,000
And it factors into the following weekly decreasing sequence.

53
00:05:00,000 --> 00:05:02,000
You start with the prime 53.

54
00:05:02,000 --> 00:05:07,000
You follow by three occurrences of 37 to 11, a 7 and 3 3s.

55
00:05:07,000 --> 00:05:15,000
And the point is that if you try to express this ugly number as a weekly decreasing sequence of primes,

56
00:05:15,000 --> 00:05:20,000
you're always going to get exactly this sequence. It's the only way to do it.

57
00:05:20,000 --> 00:05:22,000
All right. How are we going to prove that?

58
00:05:22,000 --> 00:05:26,000
Well, let's suppose that it wasn't true.

59
00:05:26,000 --> 00:05:30,000
Suppose that there was some number that could be factored in two different ways.

60
00:05:30,000 --> 00:05:33,000
Well, by the well-ordered principle, there's a least one.

61
00:05:33,000 --> 00:05:36,000
So we're talking about numbers that are greater than one.

62
00:05:36,000 --> 00:05:41,000
So there's a least number greater than one that can be factored in two different ways.

63
00:05:41,000 --> 00:05:43,000
Suppose that it's n.

64
00:05:43,000 --> 00:05:48,000
What I have is that n is a product p1 through pk.

65
00:05:48,000 --> 00:05:54,000
And it's equal to another product q1 through qm where the p's and the q's are all prime.

66
00:05:54,000 --> 00:05:59,000
And these two weekly decreasing sequences are not the same. They differ somehow.

67
00:05:59,000 --> 00:06:06,000
Okay. So we can assume that the p's are listed in a weekly decreasing order.

68
00:06:06,000 --> 00:06:11,000
And the q's are likewise listed in a weekly decreasing order.

69
00:06:11,000 --> 00:06:15,000
Well, the first observation is suppose that q1 is equal to p1.

70
00:06:15,000 --> 00:06:19,000
Well, that's not really possible because if q1 is equal to p1,

71
00:06:19,000 --> 00:06:24,000
then I could cancel the p1 from both sides.

72
00:06:24,000 --> 00:06:30,000
And I would get that p2 through pk is equal to q2 through qm.

73
00:06:30,000 --> 00:06:33,000
And these would still be different since they were different.

74
00:06:33,000 --> 00:06:36,000
And I took the same thing from their beginning.

75
00:06:36,000 --> 00:06:41,000
I'm left with a smaller number that does not have a unique factorization,

76
00:06:41,000 --> 00:06:44,000
contradicting the minimality of n.

77
00:06:44,000 --> 00:06:53,000
So in short, it's not possible for q1 to equal p1.

78
00:06:53,000 --> 00:06:56,000
So one of them has to be greater.

79
00:06:56,000 --> 00:06:59,000
We may as well assume that q1 is bigger than p1.

80
00:06:59,000 --> 00:07:02,000
Okay. So q1 is bigger than p1.

81
00:07:02,000 --> 00:07:04,000
And p1 is greater than or equal to all the other p's.

82
00:07:04,000 --> 00:07:09,000
So in fact, q1 is bigger than every one of the p's.

83
00:07:09,000 --> 00:07:15,000
Well, that's going to reach a contradiction because of the carolary.

84
00:07:15,000 --> 00:07:20,000
What I know is that q1 divides n and n is the product of the p's.

85
00:07:20,000 --> 00:07:26,000
And since q divides the product of the p's by the carolary,

86
00:07:26,000 --> 00:07:28,000
it's got to divide one of them.

87
00:07:28,000 --> 00:07:31,000
q1 must divide p i for some i.

88
00:07:31,000 --> 00:07:35,000
But that contradicts the fact that q1 is bigger than p i.

89
00:07:35,000 --> 00:07:38,000
That's not possible for the smaller number to divide.

90
00:07:38,000 --> 00:07:41,000
The larger number to divide the smaller number.

91
00:07:41,000 --> 00:07:44,000
And we're done.

92
00:07:44,000 --> 00:07:48,000
And we have proved the unique factorization theorem.

