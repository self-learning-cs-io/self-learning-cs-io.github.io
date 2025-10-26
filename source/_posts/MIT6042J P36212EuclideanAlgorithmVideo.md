---
title: MIT6042J P36212EuclideanAlgorithmVideo
---

1
00:00:00,000 --> 00:00:16,000
The greatest common divisor of two numbers is easy to compute, and that's a fact that will play a crucial role in the number theory that we're going to develop, and the properties of some of the modern codes that are based on number theory.

2
00:00:17,000 --> 00:00:31,000
The efficient way to compute the GCD of two numbers is based on a classical algorithm known as Euclidean algorithm, which is several thousand years old, and let's describe how it works now.

3
00:00:32,000 --> 00:01:00,000
The Euclidean algorithm is based on the following lemma, which we'll call the remainder lemma, and it says that if A and B are two integers, then the greatest common divisor of A and B is the same as the greatest common divisor of B and the remainder of A divided by B, providing, of course, B is not zero, because otherwise you can't divide by B. How do you make sense out of this?

4
00:01:00,000 --> 00:01:09,000
Why is this true? Well, it's actually a very easy proof. Remember that by the so-called division algorithm, or it's really a theorem.

5
00:01:09,000 --> 00:01:24,000
If you divide A by B and we're doing interdivision, what that means is you find a quotient of A divided by B in the quotient and a remainder, and the quotient has the property that Q times B plus the remainder is equal to A.

6
00:01:24,000 --> 00:01:31,000
The remainder is always going to be smaller than A. It'll be in the range from zero up to but not including A.

7
00:01:31,000 --> 00:01:45,000
If you look at this simple expression, what becomes apparent is that if you've got a divisor of two out of three of these terms, then it's going to divide the third term.

8
00:01:45,000 --> 00:01:57,000
So for example, if you have a divisor of B and R, then some of those two things is also going to have the same divisor, which means that A will have that divisor.

9
00:01:57,000 --> 00:02:10,000
If something divides both A and B, then it divides R, and if it divides B and R, it divides A, and that means that A and B and B and R have exactly the same divisors.

10
00:02:10,000 --> 00:02:18,000
They not only have the same greatest common divisor, all their divisors are the same, so obviously the greatest one is the same.

11
00:02:18,000 --> 00:02:21,000
And that proves this key remainder lemma.

12
00:02:21,000 --> 00:02:27,000
Well, the remainder lemma now gives us a very lovely way to compute the GCD, and here's an example.

13
00:02:27,000 --> 00:02:34,000
Suppose I want to compute the GCD of 899 and 493. A is 899, B is 493.

14
00:02:34,000 --> 00:02:48,000
Well, so I want this GCD, 899 and 493. Well, according to the remainder lemma, if I divide 899 by 493, I get a quotient of 1 and a remainder of 406.

15
00:02:48,000 --> 00:02:59,000
So that means that 899 and 493 have the same GCD as 493 and 406.

16
00:03:00,000 --> 00:03:04,000
Well, that is as the original number B and the new remainder 406.

17
00:03:04,000 --> 00:03:11,000
But now I can divide 493 by 406. I get a quotient of 0 and a remainder of 87.

18
00:03:11,000 --> 00:03:15,000
So 406 and 87 have the same GCD.

19
00:03:15,000 --> 00:03:36,000
And now I win because look, when I divide 58 by 29, I get a remainder of 0.

20
00:03:36,000 --> 00:03:43,000
So the GCD of anything N0 is that thing. So the GCD of 29 and 0 is 0.

21
00:03:43,000 --> 00:03:49,000
I guess the only exception is the GCD of 0 and 0, which is not defined.

22
00:03:49,000 --> 00:03:54,000
But if it's not 0, then the GCD of X and 0 is X. And there it is.

23
00:03:54,000 --> 00:03:59,000
So I've just found that the GCD of 899 and 493 is 299.

24
00:04:00,000 --> 00:04:05,000
And this is a quite fast algorithm because I keep dividing the numbers that I have by each other.

25
00:04:05,000 --> 00:04:09,000
And it gets small fast. We'll be more precise about that.

26
00:04:09,000 --> 00:04:18,000
Okay. It's a good exercise in state machine thinking and practice and program verification to reformulate the Euclidean algorithm.

27
00:04:18,000 --> 00:04:22,000
We're formulated explicitly as a state machine. It's a very simple kind of state machine.

28
00:04:22,000 --> 00:04:26,000
The states of this Euclidean algorithm state machine will be pairs of non-negative integers.

29
00:04:26,000 --> 00:04:32,000
So the states are N cross N, the Cartesian product of the non-negative integers with itself.

30
00:04:32,000 --> 00:04:37,000
The start state is going to be the pair AB, whose GCD I want to compute.

31
00:04:37,000 --> 00:04:43,000
And the transitions are simply repeatedly applying the remainder limit.

32
00:04:43,000 --> 00:04:52,000
Namely, if I have a domain state XY where you think of X's and Y is the GCD that I'm trying to compute,

33
00:04:52,000 --> 00:04:58,000
I simply convert X and Y to Y and the remainder of X divided by Y.

34
00:04:58,000 --> 00:05:02,000
And I keep doing that as long as Y is not zero.

35
00:05:02,000 --> 00:05:07,000
Okay. Very simple state machine, really just one transition rule.

36
00:05:07,000 --> 00:05:17,000
Well, according to the lemma, since I'm replacing the GCD of X and Y by the GCD of Y and the remainder of X divided by Y,

37
00:05:17,000 --> 00:05:26,000
the GCD is actually staying constant. This transition preserves the GCD that's left in the pair of registers X and Y.

38
00:05:26,000 --> 00:05:31,000
So what we can say is that since the GCD of X and Y doesn't change from one step to another,

39
00:05:31,000 --> 00:05:38,000
we can say that the GCD of X and Y at any point is equal to its original value, which is the GCD of A and B.

40
00:05:38,000 --> 00:05:45,000
So in other words, this equation, GCD of X and Y in the current state is equal to GCD of A and B,

41
00:05:45,000 --> 00:05:50,000
that we started with, is a preserved invariant of the state.

42
00:05:50,000 --> 00:06:01,000
So P of a state X, Y, the property that GCD of X and Y is the original GCD is a preserved invariant of the state machine.

43
00:06:01,000 --> 00:06:07,000
Moreover, P of star is trivially true because at the star X and Y, R, A equals B.

44
00:06:07,000 --> 00:06:12,000
So P of X and Y is just saying that GCD of A and B is equal to GCD of A and B.

45
00:06:12,000 --> 00:06:18,000
Cool. So I've got that this property is true at the star, and it's preserved by the transitions,

46
00:06:18,000 --> 00:06:27,000
so the invariant's principle tells me that if the program stops, I'm going to have the GCD of X and Y when it terminates,

47
00:06:27,000 --> 00:06:33,000
is equal to the actual GCD that I want, and that enables us to prove partial correctness.

48
00:06:33,000 --> 00:06:37,000
The claim is that if this program terminates, we haven't the sort of determined that it does yet,

49
00:06:37,000 --> 00:06:44,600
that it does yet. But at termination, if any, I claim that the x is left in, that the

50
00:06:44,600 --> 00:06:50,639
GCD of A and B is left in register x, the value of x at the end is going to be the GCD of

51
00:06:50,639 --> 00:06:55,759
A and B. Well, why is that? Well, look, at termination, what we know is that y is zero. That's the

52
00:06:55,759 --> 00:07:01,439
only way that this procedure stops because otherwise the transition rule is applicable.

53
00:07:01,439 --> 00:07:09,160
So that means that when y equals zero with termination, what we have is that since y is zero,

54
00:07:09,160 --> 00:07:15,639
GCD of x and y is equal to the GCD of x and zero. And that's equal to x, assuming again

55
00:07:15,639 --> 00:07:22,560
that x is positive or not zero. So x is the GCD of x and y, and by the invariant, the GCD

56
00:07:22,560 --> 00:07:28,279
of x and y is equal to the GCD of A and B. So I've proved this little fact. This procedure

57
00:07:28,279 --> 00:07:35,039
correctly computes the GCD of A and B, leaving the answer in register x if it terminates. Well,

58
00:07:35,039 --> 00:07:43,079
of course it terminates and it terminates fast. So let's see why. Notice that at each transition,

59
00:07:43,079 --> 00:07:50,639
we're going to replace x by y and y by the remainder of x divided by y. And that's just a

60
00:07:50,639 --> 00:07:58,560
sum for simplicity of the pair x, y that x is the bigger one. So there's two cases of y.

61
00:07:58,560 --> 00:08:06,319
These numbers are getting small fast. The first case is suppose that y is less than x over

62
00:08:06,319 --> 00:08:15,000
two or less than equal to x over two. Well, since at the step, you're going to replace x by y,

63
00:08:15,000 --> 00:08:20,720
it means that you're replacing x by something that's less than half x. So x gets half

64
00:08:20,720 --> 00:08:28,279
that this step. Okay. What about if y is big? Well, if y is bigger than x over two, then the

65
00:08:28,279 --> 00:08:34,679
remainder of x divided by y is simply x minus y and it's going to be less than x over two. But

66
00:08:34,679 --> 00:08:40,919
that's going to be the value of y after the next step. So y is going to be half either at this

67
00:08:40,919 --> 00:08:46,439
step or the next half step when it's replaced by the remainder of x and y. And the next result is

68
00:08:47,240 --> 00:08:55,719
that y gets cut in half or even smaller at every other step, which means that this procedure

69
00:08:55,719 --> 00:09:03,079
can't continue for more than twice the log to the base two of the original value of y, which is big.

70
00:09:04,599 --> 00:09:09,000
Number of steps because that's how many halves you can do before you start getting

71
00:09:09,000 --> 00:09:16,679
hitting zero. So we've just shown that this procedure holds a logarithmic number of steps,

72
00:09:16,679 --> 00:09:23,639
which is the same as saying that it's about the length of b in binary and even fewer steps than

73
00:09:23,639 --> 00:09:38,279
the length of b in decimal. The GCD algorithm is really very efficient.

