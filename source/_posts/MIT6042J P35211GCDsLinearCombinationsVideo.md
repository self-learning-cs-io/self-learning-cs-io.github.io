---
title: MIT6042J P35211GCDsLinearCombinationsVideo
---

1
00:00:00,000 --> 00:00:05,000
So now we begin on four classes on number theory.

2
00:00:05,000 --> 00:00:10,000
The purpose of taking it up now is that we're still practicing proofs and

3
00:00:10,000 --> 00:00:17,000
number theory is a nice self-contained elementary subject as we'll treat it,

4
00:00:17,000 --> 00:00:22,000
which has some quite elegant proofs and illustrates contradiction and

5
00:00:22,000 --> 00:00:26,000
other structure structures that we've learned about.

6
00:00:26,000 --> 00:00:30,000
A little bit of induction and definitely some applications of the well-ordered

7
00:00:30,000 --> 00:00:32,000
principle.

8
00:00:32,000 --> 00:00:38,000
The ultimate punchline of the whole unit is to understand the RSA crypto system

9
00:00:38,000 --> 00:00:40,000
and how it works.

10
00:00:40,000 --> 00:00:46,000
Along the way we will today actually establish one of those mother's milk facts

11
00:00:46,000 --> 00:00:51,000
that we will take for granted about unique factorization of integers into primes.

12
00:00:51,000 --> 00:00:56,000
But in fact that's a theorem that merits some proof as an example in the

13
00:00:56,000 --> 00:01:02,000
homework shows where we exhibited a system of numbers which didn't

14
00:01:02,000 --> 00:01:04,000
factor uniquely.

15
00:01:04,000 --> 00:01:09,000
And finally we will be able to knock off the die hard story once and for

16
00:01:09,000 --> 00:01:14,000
all.

17
00:01:14,000 --> 00:01:18,000
So let's begin by stating the rules of the game.

18
00:01:19,000 --> 00:01:23,000
We're going to assume all of the usual algebraic rules for addition of

19
00:01:23,000 --> 00:01:25,000
multiplication and subtraction.

20
00:01:25,000 --> 00:01:29,000
So you may know some of these rules have names like the first equality is called

21
00:01:29,000 --> 00:01:35,000
distributivity of multiplication over plus times over plus and then the second

22
00:01:35,000 --> 00:01:40,000
rule here is called commutativity of multiplication.

23
00:01:40,000 --> 00:01:43,000
And here are some more familiar rules.

24
00:01:43,000 --> 00:01:46,000
This is called associativity of multiplication.

25
00:01:46,000 --> 00:01:53,000
This is called the additive identity a minus a is zero or actually additive inverse zero

26
00:01:53,000 --> 00:01:58,000
is the additive identity and minus a is the inverse of a.

27
00:01:58,000 --> 00:02:05,000
A plus zero equals a is the definition of zero being an additive identity.

28
00:02:05,000 --> 00:02:07,000
A plus one is greater than a.

29
00:02:07,000 --> 00:02:10,000
So these are all standard algebraic facts that we're going to take for granted and not worry about.

30
00:02:11,000 --> 00:02:17,000
And one more fact that we also know and we're going to take as an axiom.

31
00:02:17,000 --> 00:02:20,000
If I divide a number positive number.

32
00:02:20,000 --> 00:02:26,000
Sorry if I divide a number a by a positive number b then when we're talking about

33
00:02:26,000 --> 00:02:30,000
integers what I'm going to get is a quotient and a remainder.

34
00:02:30,000 --> 00:02:32,000
What's the definition of the quotient and a remainder?

35
00:02:32,000 --> 00:02:38,000
Well the division theorem says that if I divide a by b that means if I divide a by

36
00:02:38,000 --> 00:02:44,000
b that means if I take the quotient times b plus the remainder I get a.

37
00:02:44,000 --> 00:02:51,000
And in fact there's a unique quotient of a divided by b and is unique remainder of a divided by b

38
00:02:51,000 --> 00:02:56,000
where the remainder what makes it unique is the remainder is constrained to be in the

39
00:02:56,000 --> 00:03:02,000
interval greater than or equal to zero and less than the divisor b.

40
00:03:03,000 --> 00:03:12,000
So we're going to take this fact for granted to proving it is not worth thinking about too

41
00:03:12,000 --> 00:03:17,000
hard because it's one of those facts that's so elementary that it's hard to think of other things that

42
00:03:17,000 --> 00:03:19,000
would more legitimately prove it.

43
00:03:19,000 --> 00:03:22,000
I'm sure it could be proved by induction but I haven't really flipped that through.

44
00:03:22,000 --> 00:03:25,000
Okay.

45
00:03:25,000 --> 00:03:30,000
A key relation that we're going to be looking at today is the relation of divisibility

46
00:03:30,000 --> 00:03:32,000
between integers.

47
00:03:32,000 --> 00:03:39,000
So by the way all of the variables for the next week or so are going to be understood to range over the integers.

48
00:03:39,000 --> 00:03:46,000
So when I say number I mean integer when I talk about variables a and c and k I mean that they're taking integer values.

49
00:03:46,000 --> 00:03:50,000
So I'm going to define c divides a using this vertical bar notation.

50
00:03:50,000 --> 00:03:58,000
It's red is divide c divides a if and only if a is equal to k times c for some k.

51
00:03:59,000 --> 00:04:16,000
And there are a variety of synonyms for a divides b like a is a a divide c sorry c divides a is to say that a is a multiple of c.

52
00:04:16,000 --> 00:04:21,000
And c is a divisor of a.

53
00:04:21,000 --> 00:04:28,000
Okay. Let's just practice this. So five divides 15 well because 15 is three times five.

54
00:04:28,000 --> 00:04:37,000
A number and divide zero every number and divide zero even zero divide zero because zero is equal to zero times n.

55
00:04:37,000 --> 00:04:42,000
So zero is a multiple of every number.

56
00:04:42,000 --> 00:04:50,000
Another trivial fact that follows from the definition is that if c divides a then c divides any constant times a.

57
00:04:50,000 --> 00:04:55,000
Well let's just check that out how it follows from the definition.

58
00:04:55,000 --> 00:05:01,000
If I'm given that c divides a that means that a is equal to k prime c for some k prime.

59
00:05:01,000 --> 00:05:09,000
That implies that if I multiply both sides of this equality by s I get that s a is equal to s k prime c.

60
00:05:09,000 --> 00:05:18,000
And if I parenthesis the s k prime I can call that to be k and I found sure enough that s a is a multiple of c.

61
00:05:18,000 --> 00:05:25,000
That's a trivial approach we're just practicing with the definitions.

62
00:05:25,000 --> 00:05:33,000
So we have just verified this fact that if c divides a then c divides a constant times a.

63
00:05:33,000 --> 00:05:42,000
As a matter of fact if c divides a and c divides b then c divides a plus b. Let's just check that one.

64
00:05:42,000 --> 00:05:54,000
What we've got is c divides a means that that a is equal to k one times c.

65
00:05:54,000 --> 00:06:00,000
And c divides b means that b is equal to k two times c.

66
00:06:00,000 --> 00:06:19,000
So that means that a plus b is simply k one plus k two times c where what I've done is here is used the distributivity law to factor c out and use the fact that multiplication is commutative so I can factor out on either side.

67
00:06:20,000 --> 00:06:32,000
Okay, let's put those facts together. If c divides a and c divides b then c divides s a plus t b where s and t are any integers at all.

68
00:06:32,000 --> 00:06:39,000
So a combination of two numbers a and b like this is called a linear combination of a and b and integer linear combination.

69
00:06:39,000 --> 00:06:45,000
But since we're only talking about integers I'm going to stop saying integer linear combination and just say linear combination.

70
00:06:45,000 --> 00:06:53,000
A linear combination of a and b is what you get by multiplying them by coefficients s and t and adding them.

71
00:06:53,000 --> 00:07:01,000
Okay, so we've just figured out that in fact if c divides a and c divides b then c divides an integer linear combination of b.

72
00:07:02,000 --> 00:07:07,000
When c divides two numbers it's called a common divisor of those two numbers.

73
00:07:07,000 --> 00:07:20,000
So we could rephrase this observation by saying common divisors of a and b divide integer linear combinations of a and b which is a good fact to just file away in your head.

74
00:07:21,000 --> 00:07:32,000
Now what we're going to be focusing on for the rest of today is the concept of the greatest common divisor of a and b called the gc d of a and b.

75
00:07:32,000 --> 00:07:42,000
The greatest common divisor of a and b exists by the well ordering principle because it's a set of non negative integers with an upper bound.

76
00:07:43,000 --> 00:07:49,000
Namely a is an upper bound on the greatest common divisor of a and b.

77
00:07:49,000 --> 00:08:04,000
And so as we did in an exercise or I think in the text that implies that there will be a greatest one among all the common divisors assuming there are any but one is always a common divisor.

78
00:08:04,000 --> 00:08:08,000
So there are going to be some.

79
00:08:08,000 --> 00:08:11,000
Let's look at some examples.

80
00:08:11,000 --> 00:08:27,000
The greatest common divisor of 10 and 12 you can check it's two mainly because the 10 factors into two times five and 12 factors into two times six and the six and the five have no common factors.

81
00:08:27,000 --> 00:08:31,000
So the only one that they share is two.

82
00:08:31,000 --> 00:08:40,000
The gc d of 13 and 12 is one. They have no common factors in common. You can see that because 13 is a prime.

83
00:08:40,000 --> 00:08:52,000
And so it has no factors other than one and 13 and 13 doesn't divide 12 because it's too big. So it's got to be one.

84
00:08:53,000 --> 00:09:07,000
The gc d of 17 and 17 is 17. That's a general phenomenon. The gc d of n and n is always n. The greatest common divisor of zero and n is equal to n for any positive n.

85
00:09:07,000 --> 00:09:18,000
And that's because everything is a divisor of zero and it means the gc d of zero and n is simply the greatest divisor of n which is of course n by itself.

86
00:09:18,000 --> 00:09:28,000
One final fact to set things up for the next segment is to think about the gc d of a prime and a number and it's either one or pay.

87
00:09:28,000 --> 00:09:40,000
The reason is that the only divisors of a prime are plus minus one and plus minus pay. So if p divides a the gc d is p and otherwise the gc d is one.

