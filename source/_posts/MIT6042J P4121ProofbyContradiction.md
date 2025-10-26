---
title: MIT6042J P4121ProofbyContradiction
---

1
00:00:00,000 --> 00:00:10,200
It's doubtful if you really understand something if you can't explain why it's true.

2
00:00:10,200 --> 00:00:15,240
And that's what proofs are about in mathematics and in computer science.

3
00:00:15,240 --> 00:00:20,559
So we're going to be talking about proofs of lots of things that we're trying to understand.

4
00:00:20,559 --> 00:00:26,679
And in particular, we're going to look at a proof technique now called proof by contradiction,

5
00:00:26,679 --> 00:00:30,839
which is probably so familiar that you never noticed you were using it.

6
00:00:30,839 --> 00:00:36,519
And now we're going to call it, split it to attention to it and think about it.

7
00:00:36,519 --> 00:00:39,600
So let's do an example first to see what's going on.

8
00:00:39,600 --> 00:00:46,399
Suppose that I wanted to prove that the cube root of 1332 was less than or equal to 11,

9
00:00:46,399 --> 00:00:50,159
or more precisely, suppose I didn't know, and I'm asking this question,

10
00:00:50,159 --> 00:00:54,480
is the cube root of 1332 less than or equal to 11?

11
00:00:54,479 --> 00:00:59,559
Well, one way to do it would be to simply compute the cube root of 1332,

12
00:00:59,559 --> 00:01:02,679
which is a small bother, but manageable.

13
00:01:02,679 --> 00:01:08,719
But there's a simpler way that figuring out how to compute a square root of a 4 digit,

14
00:01:08,719 --> 00:01:10,679
a cube root of a 4 digit number.

15
00:01:10,679 --> 00:01:12,959
Let's just suppose that this inequality was true.

16
00:01:12,959 --> 00:01:18,359
That is, that the cube root of 1332 was less than or equal to 11.

17
00:01:18,359 --> 00:01:23,719
Well, if that was true, then what I could do is cube both sides.

18
00:01:23,719 --> 00:01:29,280
And I'll conclude that 1332 is less than or equal to 11 cubed.

19
00:01:29,280 --> 00:01:35,000
Now 11 cubed is a lot easier to compute than the cube root of 1332.

20
00:01:35,000 --> 00:01:39,960
As a matter of fact, 11 cubed is 1331.

21
00:01:39,960 --> 00:01:41,079
Wait a minute.

22
00:01:41,079 --> 00:01:47,200
I've just concluded that 1332 is less than 1331.

23
00:01:47,200 --> 00:01:53,159
That's obviously not true, which means that my assumption that this inequality

24
00:01:53,159 --> 00:01:55,119
held doesn't make sense.

25
00:01:55,119 --> 00:01:59,119
It leads to this immediate contradiction, which means that in fact,

26
00:01:59,119 --> 00:02:03,679
the inequality doesn't hold, and I have now precisely and unambiguously,

27
00:02:03,679 --> 00:02:10,680
and I hope clearly proved that the cube root of 1332 is greater than 11,

28
00:02:10,680 --> 00:02:15,719
even though we never actually computed the cube root of 1332.

29
00:02:15,719 --> 00:02:20,879
Well, this is kind of a toy and simple one example to illustrate proof by contradiction.

30
00:02:20,879 --> 00:02:24,960
So let's step back and explain and say what it is in general.

31
00:02:24,960 --> 00:02:30,280
If an assertion implies something false, then the assertion itself must be false.

32
00:02:30,280 --> 00:02:32,240
That's what's going on here.

33
00:02:32,240 --> 00:02:37,800
If you're reasoning step by step, and at every step, your reasoning is good,

34
00:02:37,800 --> 00:02:42,800
which means that if you had something true and then you reached a conclusion

35
00:02:42,800 --> 00:02:47,319
from it in one step, the conclusion that you reached was also true.

36
00:02:47,319 --> 00:02:50,840
Then if you start off with some assumption and you keep proving

37
00:02:50,840 --> 00:02:56,319
step by step in a way that preserves truth, and you arrive at something false,

38
00:02:56,319 --> 00:02:59,799
it's inevitable that what you started with must have been false

39
00:02:59,799 --> 00:03:02,239
or else the thing you finished with would have been true.

40
00:03:02,239 --> 00:03:04,000
Okay.

41
00:03:04,000 --> 00:03:08,400
Let's look at a real example of this, an amazing fact that was known thousands

42
00:03:08,400 --> 00:03:13,840
of years ago to the ancient Greeks, which is that the square root of two is irrational.

43
00:03:14,840 --> 00:03:18,680
Now let's remember that a rational number is a fraction.

44
00:03:18,680 --> 00:03:22,400
A rational number is a quotient of integers.

45
00:03:22,400 --> 00:03:26,199
And the way we're going to prove that the square root of two is not a quotient

46
00:03:26,199 --> 00:03:29,599
of integers is by assuming that it was.

47
00:03:29,599 --> 00:03:34,480
So let's assume that the square root of two was a rational number,

48
00:03:34,480 --> 00:03:39,879
which means that we've got integers n and d without common prime factors

49
00:03:39,879 --> 00:03:43,599
such that the square root of two is equal to n over d.

50
00:03:43,759 --> 00:03:47,039
What I'm doing here is I'm saying the square root of two is a fraction,

51
00:03:47,039 --> 00:03:51,039
n over d, and we know that you can always reduce a fraction to lowest terms,

52
00:03:51,039 --> 00:03:53,400
which means there are no common factor.

53
00:03:53,400 --> 00:03:54,959
So let's get that done.

54
00:03:54,959 --> 00:03:59,919
We have the square root of two is equal to n over d with no prime that divides

55
00:03:59,919 --> 00:04:06,199
both n and d. From this assumption, I'm going to prove to you that both n and d

56
00:04:06,199 --> 00:04:07,840
are even.

57
00:04:07,840 --> 00:04:11,759
And that of course is an immediate contradiction because then both n and d

58
00:04:11,759 --> 00:04:14,000
have a common factor, too.

59
00:04:14,000 --> 00:04:18,360
So all I've got to do in order to conclude that the square root of two is

60
00:04:18,360 --> 00:04:19,439
an irrational number.

61
00:04:19,439 --> 00:04:25,879
It's not a fraction is prove to you that n and d are both even if the square root

62
00:04:25,879 --> 00:04:28,560
of two is equal to n over d.

63
00:04:28,560 --> 00:04:30,159
Well, let's do that.

64
00:04:30,159 --> 00:04:33,759
We'll start off with what I'm assuming, square root of two is n over d,

65
00:04:33,759 --> 00:04:35,439
and let's get rid of the denominator.

66
00:04:35,439 --> 00:04:39,399
So let's multiply through both sides by d and get that the square root of two

67
00:04:39,399 --> 00:04:41,560
times d is equal to n.

68
00:04:41,560 --> 00:04:44,360
Let's get rid of the square root of two now by squaring both sides.

69
00:04:44,360 --> 00:04:47,800
And I get 2d squared is n squared.

70
00:04:47,800 --> 00:04:51,920
Well, that's great because look, the left hand side is divisible by two.

71
00:04:51,920 --> 00:04:55,360
There it is, which means that n squared is divisible by two.

72
00:04:55,360 --> 00:04:57,480
The right hand side is even.

73
00:04:57,480 --> 00:05:01,000
But if n squared is even, then n is even.

74
00:05:01,000 --> 00:05:03,120
And I'm halfway there.

75
00:05:03,120 --> 00:05:05,120
I've shown that the numerator is even.

76
00:05:05,120 --> 00:05:07,160
OK, let's keep going.

77
00:05:07,160 --> 00:05:10,519
Now since n is even, it's equal to twice something.

78
00:05:10,519 --> 00:05:12,839
So n is 2k for some number k.

79
00:05:12,839 --> 00:05:15,399
I don't care what k is.

80
00:05:15,399 --> 00:05:23,039
Let's square both sides of that and conclude that n squared is equal to 4k squared.

81
00:05:23,039 --> 00:05:28,279
Why did I square it so that I could connect up here with the equation,

82
00:05:28,279 --> 00:05:32,000
the other equation that I had about n squared, that n squared was 2d squared.

83
00:05:32,000 --> 00:05:38,479
So combining these two, what I get is that 2d squared is equal to 4k squared.

84
00:05:38,480 --> 00:05:43,640
And of course, I can cancel 2 and get the d squared is equal to 2k squared.

85
00:05:43,640 --> 00:05:47,400
And again, I've got the right hand side is divisible by 2.

86
00:05:47,400 --> 00:05:50,319
So the left hand side is divisible by 2.

87
00:05:50,319 --> 00:05:51,840
The square is even.

88
00:05:51,840 --> 00:05:53,759
And therefore, it is even.

89
00:05:53,759 --> 00:05:56,560
And we've completed the proof as claimed.

90
00:05:56,560 --> 00:06:03,720
And the both have 2 as a common factor, contradicting the fact that they're in lowest terms.

91
00:06:03,720 --> 00:06:10,520
Now, I did assume something that is kind of obvious, namely, that if n squared is even,

92
00:06:10,520 --> 00:06:12,120
then n is even.

93
00:06:12,120 --> 00:06:13,920
Why is this true?

94
00:06:13,920 --> 00:06:16,040
Well, you might think about it for a moment.

95
00:06:16,040 --> 00:06:17,760
There's a simple way to see it.

96
00:06:17,760 --> 00:06:19,560
And it's approved by contradiction.

97
00:06:19,560 --> 00:06:24,600
We're going to use a fact that you can verify easily enough by doing a little arithmetic.

98
00:06:24,600 --> 00:06:29,760
Namely, the product of two odd numbers is odd.

99
00:06:29,760 --> 00:06:30,840
What's a summa?

100
00:06:30,839 --> 00:06:38,439
So if the product of two odd numbers is odd, if I tell you that n squared is even, and

101
00:06:38,439 --> 00:06:42,959
suppose that n was not even, well, that means it's odd.

102
00:06:42,959 --> 00:06:47,399
But that would mean that n squared was odd, contradicting the fact that n is even.

103
00:06:47,399 --> 00:06:51,839
Therefore, it's a contradiction to assume that n is odd and must be even.

104
00:06:51,839 --> 00:06:55,959
That's an ad hoc proof that has to do with evenness and oddness.

105
00:06:55,959 --> 00:07:01,079
There's a more general way to understand this that actually will come in handy.

106
00:07:01,079 --> 00:07:06,199
Namely, that what I know is that numbers factor into primes in a unique way.

107
00:07:06,199 --> 00:07:11,240
So if I tell you that n squared is even, what I know about n squared is that all the primes

108
00:07:11,240 --> 00:07:14,519
that divide n squared come from n.

109
00:07:14,519 --> 00:07:20,319
So if there's a two among the primes that divide n squared, it has to be a two that is one

110
00:07:20,319 --> 00:07:22,279
of the prime divisors of n.

111
00:07:22,279 --> 00:07:29,439
That would work even if I told you that n squared was divisible by three, it would follow

112
00:07:29,439 --> 00:07:32,639
by that reasoning that n is divisible by three.

113
00:07:32,639 --> 00:07:33,639
Now that's a powerful fact.

114
00:07:33,639 --> 00:07:38,799
I'm assuming the prime factorization of integers, and it's not obvious at all that that's

115
00:07:38,799 --> 00:07:40,319
true, although it's very familiar.

116
00:07:40,319 --> 00:07:41,319
It's okay to assume.

117
00:07:41,319 --> 00:07:45,959
In a few weeks, we'll actually look back at how to carefully prove that.

118
00:07:45,959 --> 00:07:47,879
But for now, it's okay to assume.

119
00:07:47,879 --> 00:07:53,019
And we also have the simple argument that work based on properties of even an odd that

120
00:07:53,019 --> 00:07:57,680
if n squared is even, then n is even, that's the last gap in the proof.

121
00:07:57,680 --> 00:07:58,839
And so we're done.

