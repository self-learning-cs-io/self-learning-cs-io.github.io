---
title: MIT6042J P45243ReducingFactoringToSATVideo
---

1
00:00:00,000 --> 00:00:06,640
We've mentioned the P equals and P question a number of times now as the most important

2
00:00:06,640 --> 00:00:09,000
question theoretical computer science.

3
00:00:09,000 --> 00:00:13,640
And we've said that one way to formulate it is exactly to ask whether there's an efficient

4
00:00:13,640 --> 00:00:20,879
that is polynomial time procedure to test whether or not a formula in propositional logic

5
00:00:20,879 --> 00:00:23,559
is satisfiable.

6
00:00:23,559 --> 00:00:25,760
Now why is that such an important problem?

7
00:00:25,760 --> 00:00:30,480
I mean, you know, we're not just logicians and we want to know whether or not some

8
00:00:30,480 --> 00:00:31,920
formula is satisfiable.

9
00:00:31,920 --> 00:00:36,719
How did it take on this enormous importance and apply to so many fields?

10
00:00:36,719 --> 00:00:43,920
And illustrating how you could use a satisfiability tester to factor efficiently is a good hint

11
00:00:43,920 --> 00:00:49,320
about why it is that all sorts of things reduce to sad and why it in fact is such a centrally

12
00:00:49,320 --> 00:00:50,680
important problem.

13
00:00:50,679 --> 00:00:57,320
So let's suppose that we have a satisfiability tester and use it to find the, how to factor

14
00:00:57,320 --> 00:00:59,759
a number n.

15
00:00:59,759 --> 00:01:06,599
Now the observation begins with how you use a sad solver is that you can begin by writing

16
00:01:06,599 --> 00:01:11,960
a, or observing that it's easy enough to design a digital circuit that multiplies, that

17
00:01:11,960 --> 00:01:12,960
does arithmetic multiplication.

18
00:01:12,960 --> 00:01:18,640
So in other words, it's got some number of bits reserved for an input x, a k bits and

19
00:01:18,640 --> 00:01:26,640
another k bits for an input y and it's got two k output lines that produce the digits

20
00:01:26,640 --> 00:01:28,560
of x times y.

21
00:01:28,560 --> 00:01:31,200
You might need one extra digit, but never mind that.

22
00:01:31,200 --> 00:01:36,760
Okay, so this is a multiplier circuit takes an x, a k bit x in and a k bit y in and it

23
00:01:36,760 --> 00:01:42,079
spits out the product, which is another two k bit number.

24
00:01:42,079 --> 00:01:44,040
And this is not a terribly big circuit.

25
00:01:44,040 --> 00:01:49,240
The naive way to design it would use a number of gates that was about, and a number of wires

26
00:01:49,240 --> 00:01:52,400
that was about quadratic in the number k.

27
00:01:52,400 --> 00:01:56,960
It's easy enough to design one of these things where the size is literally bounded by five

28
00:01:56,960 --> 00:02:01,600
times k squared, maybe plus a constant.

29
00:02:01,600 --> 00:02:05,960
And so this definitely a small polynomial.

30
00:02:05,960 --> 00:02:12,800
We can give the number of bits that I'm working with, it's easy enough to build this multiplier

31
00:02:12,800 --> 00:02:13,800
circuit.

32
00:02:13,800 --> 00:02:20,120
Okay, now suppose that I have a way to test satire's fiability of circuits, how am I going

33
00:02:20,120 --> 00:02:23,160
to use this multiplier circuit to factor?

34
00:02:23,160 --> 00:02:26,460
Well, the first thing I'm going to do is let's suppose the number that I'm factoring

35
00:02:26,460 --> 00:02:29,400
is called is n and it's the product of two primes p and q.

36
00:02:29,400 --> 00:02:32,720
Those are the kinds of ends that we'd be using in RSA.

37
00:02:32,720 --> 00:02:37,120
And let me also observe that it's very easy to design an n tester.

38
00:02:37,120 --> 00:02:45,640
That is a little digital circuit that has two k input lines and produces a one on its

39
00:02:45,640 --> 00:02:51,840
one output line precisely when the input is the binary representation of n.

40
00:02:51,840 --> 00:02:56,759
So let's attach this equality tester that does nothing but ask whether it's being fed

41
00:02:56,759 --> 00:03:03,680
the digits of n as input and it produces an output yes, for one for n and zero if the

42
00:03:03,680 --> 00:03:08,400
input pattern is the digital representation, the binary representation of anything other

43
00:03:08,400 --> 00:03:09,400
than n.

44
00:03:09,400 --> 00:03:12,280
That's another trivial circuit to build.

45
00:03:12,280 --> 00:03:17,640
So we put those two together and now watch what happens.

46
00:03:17,640 --> 00:03:24,840
I'm going to take the circuit and set the first of the input bits to zero.

47
00:03:24,840 --> 00:03:30,719
And then I'm going to ask the sat solver the following question, is there a way to set

48
00:03:30,800 --> 00:03:34,520
the remaining input bits other than zero.

49
00:03:34,520 --> 00:03:35,879
So I've set the first one to zero.

50
00:03:35,879 --> 00:03:37,080
What about these other bits?

51
00:03:37,080 --> 00:03:42,400
The sat solver can tell me whether or not it's possible to get a one out of this circuit

52
00:03:42,400 --> 00:03:45,079
with the zero there fixed.

53
00:03:45,079 --> 00:03:47,560
So let's ask the sat solver what happens.

54
00:03:47,560 --> 00:03:52,520
And the sat solver says, hey, yes, there is a way to fill in the remaining digits and

55
00:03:52,520 --> 00:03:54,280
get an output one.

56
00:03:54,280 --> 00:03:55,280
Well, what does that tell me?

57
00:03:55,280 --> 00:03:59,759
It tells me that there is a factor that starts with zero.

58
00:03:59,759 --> 00:04:04,919
So let's fix the zero based on the fact that it's possible for me to fill in the remaining

59
00:04:04,919 --> 00:04:12,439
digits with the bits of factors x and y that equal n.

60
00:04:12,439 --> 00:04:18,240
Let's try to set the second input bit to zero and see what happens.

61
00:04:18,240 --> 00:04:23,879
Well, we'll ask the sat tester, is it possible now to fill in the remaining digits to get

62
00:04:23,879 --> 00:04:29,240
the two numbers x and y that multiply and produce n and therefore output one?

63
00:04:29,240 --> 00:04:33,480
And the sat tester says, no, this is an unsatisfiable circuit.

64
00:04:33,480 --> 00:04:35,800
You can't get a one out of it anymore.

65
00:04:35,800 --> 00:04:41,420
That tells me that I'm going to have to set the second bit to one in order to have a

66
00:04:41,420 --> 00:04:47,720
factor of n where the x and y will multiply together to be n.

67
00:04:47,720 --> 00:04:48,720
All right, fine.

68
00:04:48,720 --> 00:04:49,720
Go to the third bit.

69
00:04:49,720 --> 00:04:51,759
Ask whether or not zero works.

70
00:04:51,759 --> 00:04:54,400
The sat tester says, let's say yes.

71
00:04:54,399 --> 00:04:55,399
So then I can fix zero.

72
00:04:55,399 --> 00:05:04,079
I now know the first three bits of x and of course I go on and in 2k sat tests, I know

73
00:05:04,079 --> 00:05:11,319
exactly what P and Q are and I have in fact found the factors P and Q.

74
00:05:11,319 --> 00:05:12,819
So that wraps that one up.

75
00:05:12,819 --> 00:05:14,239
That's how you use a sat tester.

76
00:05:14,239 --> 00:05:20,279
You just do the sat test, 2k times and you've factored this 2k bit number.

77
00:05:20,279 --> 00:05:25,079
And of course if the sat test is polynomial in k, then doing it 2k times just is also polynomial

78
00:05:25,079 --> 00:05:27,359
in k with one degree higher.

79
00:05:27,359 --> 00:05:28,359
Okay.

80
00:05:28,359 --> 00:05:35,479
Now, the satisfiability problem as we formulated was a problem about formulas.

81
00:05:35,479 --> 00:05:39,359
That as you wrote out a propositional formula and ask whether or not it was satisfiable

82
00:05:39,359 --> 00:05:43,439
and I'm instead asking about satisfiability of binary circuits.

83
00:05:43,439 --> 00:05:51,000
But in fact, as we did in some early exercises, you can describe a binary circuit by assigning

84
00:05:51,000 --> 00:05:55,839
a fresh variable to every wire in the circuit and then writing a little formula around each

85
00:05:55,839 --> 00:06:02,180
gate, which explains how the input wires to that gate are related to the output wire of

86
00:06:02,180 --> 00:06:03,379
that gate.

87
00:06:03,379 --> 00:06:08,500
And that little formula explains that wiring of that gate and you take the end of all those

88
00:06:08,500 --> 00:06:18,060
formulas and you have a formula that is describing the structure of the circuitry and in fact

89
00:06:18,060 --> 00:06:23,500
the formula is satisfiable if and only if the circuit can produce an output 1.

90
00:06:23,500 --> 00:06:31,379
So we really have, by assuming that I could test satisfiability of formulas, I can therefore

91
00:06:31,379 --> 00:06:35,740
test satisfiability of circuits and therefore I can fact there.

92
00:06:35,740 --> 00:06:42,660
So that's a simple trick to find a propositional formula that's equi-satisfiable to the circuit

93
00:06:42,660 --> 00:06:48,180
of the circuit produces output 1 if and only if this formula of about the same size as

94
00:06:48,180 --> 00:06:50,780
the circuit is satisfiable.

95
00:06:50,780 --> 00:06:55,980
And that's the last piece that I needed in order to completely reduce satisfiability,

96
00:06:55,980 --> 00:06:58,780
the factoring rather to the satisfiability problem.

97
00:06:58,780 --> 00:07:02,980
And you can see that this is actually a general method that will enable you to reduce

98
00:07:02,980 --> 00:07:07,939
most any kind of one-way function to a few sat-tests.

