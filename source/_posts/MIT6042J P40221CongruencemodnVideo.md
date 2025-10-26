---
title: MIT6042J P40221CongruencemodnVideo
---

1
00:00:00,000 --> 00:00:06,839
The idea of congruence was introduced to the world by Gauss in the early 18th century.

2
00:00:06,839 --> 00:00:10,120
You've heard of him before, I think.

3
00:00:10,120 --> 00:00:14,080
He's responsible for some work on magnetism also.

4
00:00:14,080 --> 00:00:20,920
And it turns out that this idea, after several centuries, remains an active field of application and research.

5
00:00:20,920 --> 00:00:27,480
And in particular, in computer science, it's used significantly in crypto,

6
00:00:27,480 --> 00:00:32,600
which is what we're going to be leading up to now in this unit.

7
00:00:32,600 --> 00:00:41,719
It also plays a role in hashing, which is a key method for managing data in memory.

8
00:00:41,719 --> 00:00:44,880
But we are not going to go into that application.

9
00:00:44,880 --> 00:00:47,560
Anyway, the definition of congruence is real simple.

10
00:00:47,560 --> 00:00:52,240
Congruence is a relation between two numbers, A and B.

11
00:00:52,240 --> 00:00:57,040
It's determined by another parameter, N, where N is considered to be greater than 1.

12
00:00:57,039 --> 00:00:59,079
All of these are usual integers.

13
00:00:59,079 --> 00:01:02,159
And the definition is simply that A is congruent to B mod N.

14
00:01:02,159 --> 00:01:09,959
If N divides A minus B, or A minus B is a multiple of N.

15
00:01:09,959 --> 00:01:12,359
So that's a key definition to remember.

16
00:01:12,359 --> 00:01:13,519
There's other ways to define it.

17
00:01:13,519 --> 00:01:18,239
We'll see very shortly an equivalent formulation that could equally well have been used as a definition.

18
00:01:18,239 --> 00:01:20,799
But this is a standard one.

19
00:01:20,799 --> 00:01:25,799
A is equivalent to B means that A minus B is a multiple of N.

20
00:01:25,799 --> 00:01:27,560
Well, let's just practice.

21
00:01:27,560 --> 00:01:37,719
30 is equivalent to 12 mod 9, because 30 minus 12 is 18 and 9 divides 18.

22
00:01:37,719 --> 00:01:38,560
OK.

23
00:01:38,560 --> 00:01:49,439
An immediate application is that this number with a lot of 6 is ending in a 3 is equivalent to 788, 253, modulo 10.

24
00:01:49,439 --> 00:01:50,560
Now, why is that?

25
00:01:50,560 --> 00:01:51,920
Well, there's a very simple reason.

26
00:01:51,920 --> 00:01:58,079
If you think about subtracting the 6 number ending in 3 from the 7 number ending in 3,

27
00:01:58,079 --> 00:02:02,400
what you can immediately see without doing much of any of the subtraction just do the lot

28
00:02:02,400 --> 00:02:07,680
sign with the 3 horizontal bars is red is both equivalent and congruent.

29
00:02:07,680 --> 00:02:12,400
And I will be bouncing in fact between the two pronunciations indiscriminately.

30
00:02:12,400 --> 00:02:13,400
There's synonyms.

31
00:02:13,400 --> 00:02:14,400
OK.

32
00:02:14,400 --> 00:02:19,159
Let's think about proving this remainder lemma just for practice.

33
00:02:19,159 --> 00:02:23,960
In order to fit on the slide, I'm going to have to abbreviate this idea of the remainder

34
00:02:23,960 --> 00:02:28,759
of B divided by N with a shorter notation R sub BN just to fit.

35
00:02:28,759 --> 00:02:29,759
OK.

36
00:02:29,759 --> 00:02:34,560
So the if direction of proving the remainder lemma that they're congruent if and only if

37
00:02:34,560 --> 00:02:40,319
they have the same remainder, the if direction here is in if and only if is from right to left

38
00:02:40,319 --> 00:02:46,319
is that I've got to prove that if they have the same remainder then they're congruent.

39
00:02:46,319 --> 00:02:52,000
So there are the two numbers by A and B by the division theorem or division algorithm.

40
00:02:52,000 --> 00:02:59,400
They can each be expressed as a quotient of A divided by N times the quotient sub A plus

41
00:02:59,400 --> 00:03:03,959
the remainder of A divided by N. And likewise B can be expressed in terms of quotient and

42
00:03:03,959 --> 00:03:05,479
remainder.

43
00:03:05,479 --> 00:03:09,319
And what we're given here is that the remainders are equal.

44
00:03:09,319 --> 00:03:15,439
But if the remainders are equal then clearly when I subtract A minus B, I get QA minus QB

45
00:03:15,439 --> 00:03:21,039
times N sure enough A minus B is a multiple of N and that takes care of that one.

46
00:03:21,039 --> 00:03:24,039
The only of direction now goes from left to right.

47
00:03:24,039 --> 00:03:29,840
So in the converse I'm going to assume that N divides A minus B or A and B are expressed

48
00:03:29,840 --> 00:03:36,159
in this form by the division algorithm or division theorem.

49
00:03:36,159 --> 00:03:41,240
So if N divides A minus B looking at A minus B in that form, what we're seeing is that

50
00:03:41,240 --> 00:03:48,040
N divides this QA minus QB times N plus the difference of the remainders.

51
00:03:48,040 --> 00:03:54,439
That's what I get just by subtracting A and B. But if you look at this N divides that

52
00:03:54,439 --> 00:04:03,800
term the quotient times N. And it therefore has to divide the other term as well.

53
00:04:03,800 --> 00:04:08,040
Because the only way that N can divide a sum when it divides one of the summons is if

54
00:04:08,040 --> 00:04:09,960
it divides the other sum N.

55
00:04:09,960 --> 00:04:17,040
So N divides R A minus the remainder of A divided by N from B divided by N. But remember these

56
00:04:17,040 --> 00:04:18,319
are remainders.

57
00:04:18,319 --> 00:04:23,000
So that means that they're both small.

58
00:04:23,000 --> 00:04:26,000
And that also merits a highlight.

59
00:04:26,000 --> 00:04:27,000
Okay.

60
00:04:27,000 --> 00:04:33,759
Now, in addition to these properties like equality that congruence has, it also interacts

61
00:04:33,759 --> 00:04:37,199
very well with the operations which is why it's called a congruence.

62
00:04:37,199 --> 00:04:43,599
The congruence is an equality-like relation that respects the operations that are relevant

63
00:04:43,599 --> 00:04:44,599
to the discussion.

64
00:04:44,599 --> 00:04:47,240
In this case, we're going to be talking about plus and times.

65
00:04:47,240 --> 00:04:52,920
And the first fact about congruence says that if A and B are congruent, then A plus

66
00:04:52,920 --> 00:04:55,919
C and B plus C are congruent.

67
00:04:55,919 --> 00:04:59,039
The proof of that follows trivially from the definition.

68
00:04:59,039 --> 00:05:04,159
Because the A congruent to B mod N says that N divides A minus B. And if N divides A minus

69
00:05:04,160 --> 00:05:10,600
B, obviously N divides A plus C minus B plus C because say plus C minus B plus C is equal

70
00:05:10,600 --> 00:05:17,160
to A minus B. That one is deceptively trivial.

71
00:05:17,160 --> 00:05:21,240
It's also the case that if A is kind of going to be then A times C is kind of going to

72
00:05:21,240 --> 00:05:26,520
B times C. This one takes a one-line proof.

73
00:05:26,520 --> 00:05:33,440
We're given that N divides A minus B. That certainly implies that N divides any multiple

74
00:05:33,439 --> 00:05:37,639
of A minus B. So multiply it by C and then apply distributivity.

75
00:05:37,639 --> 00:05:44,639
And you discover that N divides A C minus B C, which means A C is congruent to B C mod

76
00:05:44,639 --> 00:05:51,399
to L O N. It's a small step that I'm going to omit to go from adding the same constant

77
00:05:51,399 --> 00:05:55,319
to both sides to adding any two congruent numbers to the same size.

78
00:05:55,319 --> 00:06:01,360
So if A is congruent to B and C is congruent to D, then in fact A plus C is congruent to

79
00:06:01,360 --> 00:06:03,120
B plus D.

80
00:06:03,120 --> 00:06:06,720
So again, congruence is acting a lot like ordinary equality.

81
00:06:06,720 --> 00:06:10,280
If you add equals to equals, you get equals.

82
00:06:10,280 --> 00:06:18,920
And of course the same fact applies to multiplication if you multiply equals by equals, you get equals.

83
00:06:18,920 --> 00:06:25,519
A corollary of this is that if I have two numbers that are congruent modulo N, then if

84
00:06:25,519 --> 00:06:31,160
I have any kind of arithmetic formula involving plus and times in minus, and what I want to

85
00:06:31,160 --> 00:06:36,320
know is what it's equivalent to modulo N, I can figure that out freely substituting

86
00:06:36,320 --> 00:06:41,600
A by A prime or A prime by A. I can replace any number by a number that it's congruent

87
00:06:41,600 --> 00:06:42,600
to.

88
00:06:42,600 --> 00:06:49,920
And the final congruence result of the formula is going to remain unchanged.

89
00:06:49,920 --> 00:06:57,960
So overall, what this shows is that arithmetic modulo N is a lot like ordinary arithmetic.

90
00:06:57,959 --> 00:07:05,439
And the other crucial point though that follows from this fact about remainders is that because

91
00:07:05,439 --> 00:07:13,639
A is congruent to the remainder of A divided by N, then when I'm doing arithmetic on congruences,

92
00:07:13,639 --> 00:07:18,279
I can always keep the numbers involved in the remainder interval.

93
00:07:18,279 --> 00:07:22,079
That is in the remainder range from zero to N minus one.

94
00:07:22,079 --> 00:07:30,000
And we use this standard closed open interval notation to mean the interval from zero to N.

95
00:07:30,000 --> 00:07:31,000
So this is red.

96
00:07:31,000 --> 00:07:35,839
This is, it's sometimes used in analysis to mean the real interval of reels, but we're always

97
00:07:35,839 --> 00:07:36,839
talking about integers.

98
00:07:36,839 --> 00:07:42,479
So this means the integers that square bracket means zero is included and around parenthesis

99
00:07:42,479 --> 00:07:44,479
means that N is excluded.

100
00:07:44,479 --> 00:07:49,919
So that's exactly a description of the integers that are greater than or equal to zero and

101
00:07:49,920 --> 00:07:51,759
less than N.

102
00:07:51,759 --> 00:07:57,560
Let's do an application of this remainder arithmetic idea.

103
00:07:57,560 --> 00:08:05,560
Suppose I want to figure out what's two to the 287 to the ninth power modulo 4.

104
00:08:05,560 --> 00:08:13,280
Well for a start, if I take the remainder of 287 divided by 4, it's not very hard to

105
00:08:13,280 --> 00:08:15,759
check that that's 3.

106
00:08:15,759 --> 00:08:21,599
And that means that 287 to the ninth is congruent mod 4 to 3 to the ninth.

107
00:08:21,599 --> 00:08:26,120
So already I got rid of the 3-digit number, the base of the exponent, and replaced it

108
00:08:26,120 --> 00:08:28,719
just by a 1-digit number 3.

109
00:08:28,719 --> 00:08:29,719
That's progress.

110
00:08:29,719 --> 00:08:35,200
Well we can make more progress because 3 to the ninth can be expressed as 3 squared squared

111
00:08:35,200 --> 00:08:37,240
squared times 3.

112
00:08:37,240 --> 00:08:42,240
Because when you iterate taking powers, it means that the exponent's multiply.

113
00:08:42,240 --> 00:08:48,159
So this is 3 to the 2 times 2 times 2 or 8 times 3, which adds 1 to the exponent or 9.

114
00:08:48,159 --> 00:08:51,600
So that's simple exponent arithmetic.

115
00:08:51,600 --> 00:09:00,840
But notice that 3 squared is 9 and 9 is congruent to 1 mod 4.

116
00:09:00,840 --> 00:09:08,159
So that means I can replace 3 squared by 1 and it becomes the outer 2 squared stays.

117
00:09:08,159 --> 00:09:12,559
It becomes 1 squared squared, but that's 1 times 3.

118
00:09:12,559 --> 00:09:22,319
And the punch line is that 287 to the ninth is congruent to 3 mod 4 by a really easy calculation

119
00:09:22,319 --> 00:09:26,000
that did not involve taking any think of the ninth power.

