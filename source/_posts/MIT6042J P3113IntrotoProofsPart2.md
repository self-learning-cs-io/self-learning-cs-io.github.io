---
title: MIT6042J P3113IntrotoProofsPart2
---

1
00:00:00,000 --> 00:00:08,000
There's other kinds of bogus proofs that come up.

2
00:00:08,000 --> 00:00:09,759
Let's just run through this one quickly.

3
00:00:09,759 --> 00:00:12,300
Here's a fact that you know about roots of polynomials.

4
00:00:12,300 --> 00:00:15,720
Every polynomial has two roots, at least over the complex numbers,

5
00:00:15,720 --> 00:00:17,960
over C. And how do you prove that?

6
00:00:17,960 --> 00:00:19,800
Well, you just write down the formulas for the roots.

7
00:00:19,800 --> 00:00:21,199
You know the quadratic formula.

8
00:00:21,199 --> 00:00:25,600
One root is minus B plus this square root of square root

9
00:00:25,600 --> 00:00:26,640
is quantically over 2A.

10
00:00:26,640 --> 00:00:30,839
And the other root is minus B minus this square root of B

11
00:00:30,839 --> 00:00:32,520
squared minus 4AC over 2A.

12
00:00:32,520 --> 00:00:33,640
And that's the end of the proof.

13
00:00:33,640 --> 00:00:36,880
You can just plug in this formula for R1

14
00:00:36,880 --> 00:00:39,799
into this, for X into this polynomial.

15
00:00:39,799 --> 00:00:42,399
And it would simplify to be 0, which

16
00:00:42,399 --> 00:00:43,760
shows that this is a root.

17
00:00:43,760 --> 00:00:46,719
You could plug that one into this formula for X

18
00:00:46,719 --> 00:00:48,040
and simplify algebraic.

19
00:00:48,040 --> 00:00:51,359
And the discoverer was 0 proving that R2 is a root.

20
00:00:51,359 --> 00:00:54,840
We've just proved that every polynomial has two roots.

21
00:00:54,840 --> 00:00:56,439
Well, that's not true.

22
00:00:56,439 --> 00:00:57,719
We haven't proved it.

23
00:00:57,719 --> 00:01:00,559
This is a proofed by calculation that has problems.

24
00:01:00,559 --> 00:01:01,239
What's the problem?

25
00:01:01,239 --> 00:01:02,839
Well, let's look at a counter example.

26
00:01:02,839 --> 00:01:06,200
What about the polynomial 0x squared plus 0x plus 1?

27
00:01:06,200 --> 00:01:07,120
It doesn't have any roots.

28
00:01:07,120 --> 00:01:09,799
It's just a constant 1.

29
00:01:09,799 --> 00:01:12,400
And which never crosses the origin.

30
00:01:12,400 --> 00:01:14,079
So it's got no roots.

31
00:01:14,079 --> 00:01:17,719
What about 0x squared plus 1x plus 1?

32
00:01:17,719 --> 00:01:22,920
Well, that's a 45 degree line, the x line,

33
00:01:22,920 --> 00:01:25,519
and the y equals x line.

34
00:01:25,519 --> 00:01:27,920
And it only crosses the origin once.

35
00:01:27,920 --> 00:01:29,079
It has only one root.

36
00:01:29,079 --> 00:01:33,000
What happened to the two formulas are 1 and R2?

37
00:01:33,000 --> 00:01:35,519
And the answer was that in this case,

38
00:01:35,519 --> 00:01:37,439
we had it divide by 0 error.

39
00:01:37,439 --> 00:01:40,679
If you look at that formula, there's a quotient.

40
00:01:40,679 --> 00:01:42,979
There's a denominator of 2a.

41
00:01:42,979 --> 00:01:46,599
Divide by 0, and these formulas don't work right.

42
00:01:46,599 --> 00:01:48,039
They aren't the roots.

43
00:01:48,039 --> 00:01:51,439
And so implicitly, in order to have two roots,

44
00:01:51,439 --> 00:01:54,159
we need to assume that the denominator,

45
00:01:54,159 --> 00:01:56,079
OK, the leading coefficient of the polynomial

46
00:01:56,079 --> 00:01:56,920
is not 0.

47
00:01:56,920 --> 00:01:59,439
So that fixes those two bugs.

48
00:01:59,439 --> 00:02:00,719
Is that a wall?

49
00:02:00,719 --> 00:02:06,399
Well, no, because look at this polynomial of 1x squared plus 0x

50
00:02:06,399 --> 00:02:11,519
plus 0 has one root, the only possible root of this

51
00:02:11,519 --> 00:02:14,560
is 0.

52
00:02:14,560 --> 00:02:18,120
Because if you look at this, the only way

53
00:02:18,120 --> 00:02:23,639
to get 1 times something plus 0 to equal 0

54
00:02:23,639 --> 00:02:26,199
is if the something is 0.

55
00:02:26,199 --> 00:02:27,519
So there's only one root.

56
00:02:27,519 --> 00:02:31,159
And what's going on here, well, what's

57
00:02:31,159 --> 00:02:35,639
happened is that in this case, the two formulas are 1 and R2,

58
00:02:35,639 --> 00:02:39,000
which were different formulas, evaluate to the same thing

59
00:02:39,000 --> 00:02:41,959
when b is 0 and c is 0 and a is 1.

60
00:02:41,959 --> 00:02:44,399
And that's why they look like different formulas,

61
00:02:44,399 --> 00:02:45,839
but they evaluate to the same thing.

62
00:02:45,839 --> 00:02:47,199
So there's only one root.

63
00:02:47,199 --> 00:02:50,359
The fix to that is to require the quantity

64
00:02:50,360 --> 00:02:55,200
by which the two formulas are 1 and R2 differ to be non-zero.

65
00:02:55,200 --> 00:03:00,120
And that's the quantity that you are taking the square root of.

66
00:03:00,120 --> 00:03:03,400
The discriminant that's called b squared minus 4ac

67
00:03:03,400 --> 00:03:04,520
needs to be 0.

68
00:03:04,520 --> 00:03:08,040
And then R1 and R2 will differ and we will get the two roots.

69
00:03:10,600 --> 00:03:12,560
Now, there's still a complication.

70
00:03:12,560 --> 00:03:16,560
It sounds like we've now verified that indeed our proof

71
00:03:16,560 --> 00:03:18,040
by calculation is correct.

72
00:03:18,039 --> 00:03:19,659
Now that we put in these qualifiers,

73
00:03:19,659 --> 00:03:22,679
the a is positive and d is non-zero.

74
00:03:22,679 --> 00:03:26,719
But what happens if d is non-zero but negative?

75
00:03:26,719 --> 00:03:28,239
It's an interesting complication.

76
00:03:28,239 --> 00:03:31,519
And let's look at the formula x squared plus 1,

77
00:03:31,519 --> 00:03:36,399
where b squared minus 4ac is going to be minus 3.

78
00:03:36,399 --> 00:03:43,799
And that will turn out to have two roots, namely i and minus i.

79
00:03:43,799 --> 00:03:46,359
And it's not possible to tell which is which.

80
00:03:46,360 --> 00:03:49,560
R1 is taking the square root of minus 1 and R2

81
00:03:49,560 --> 00:03:53,000
is taking the square root of minus 1.

82
00:03:53,000 --> 00:03:54,920
One of them's adding the square root of minus 1,

83
00:03:54,920 --> 00:03:57,200
the other one subtracting the square root of minus 1.

84
00:03:57,200 --> 00:03:59,000
But which square root of minus 1 is no way

85
00:03:59,000 --> 00:04:02,520
to tell the difference between i and minus i abstractly.

86
00:04:02,520 --> 00:04:04,840
They both behave the same way.

87
00:04:04,840 --> 00:04:09,080
And so we have an ambiguity about which one is R1 and which one is R2.

88
00:04:09,080 --> 00:04:12,680
It doesn't hurt at all for the theorem that R1 and R2 are different.

89
00:04:12,680 --> 00:04:14,320
And so there are two roots.

90
00:04:14,319 --> 00:04:17,920
But ambiguity can be problematic and let me

91
00:04:17,920 --> 00:04:21,159
do an illustration of that.

92
00:04:21,159 --> 00:04:23,040
When there's ambiguity, I can do things

93
00:04:23,040 --> 00:04:25,759
like proving easily that 1 is equal to minus 1.

94
00:04:25,759 --> 00:04:27,240
Here's the proof.

95
00:04:27,240 --> 00:04:30,040
And I will let you contemplate that and try

96
00:04:30,040 --> 00:04:32,759
to figure out just where in this reasoning

97
00:04:32,759 --> 00:04:35,639
that step by step seems pretty reasonable.

98
00:04:35,639 --> 00:04:37,560
And but nevertheless, I've concluded

99
00:04:37,560 --> 00:04:40,879
that 1 is equal to minus 1, which is absurd.

100
00:04:40,879 --> 00:04:42,399
It's taking advantage of the fact

101
00:04:42,399 --> 00:04:45,199
that you don't know whether the square root of minus 1

102
00:04:45,199 --> 00:04:48,319
means i or minus i.

103
00:04:48,319 --> 00:04:50,919
So the moral of all of this is that first of all,

104
00:04:50,919 --> 00:04:53,679
you should that you are applying the rules properly.

105
00:04:53,679 --> 00:04:58,120
There's an assumption of an algebraic rule in there that isn't true.

106
00:04:58,120 --> 00:05:02,199
And again, that kind of mindless calculation

107
00:05:02,199 --> 00:05:05,799
is risky when you don't really understand what you're doing.

108
00:05:05,799 --> 00:05:10,479
You don't have a clear memory of what the exact rules are.

109
00:05:10,480 --> 00:05:13,240
So it's understanding that bails you out

110
00:05:13,240 --> 00:05:16,319
if this kind of blunder.

111
00:05:16,319 --> 00:05:18,439
Let's look at 1 equals minus 1 a little

112
00:05:18,439 --> 00:05:22,480
because it lets us wrap up within a amusing remark.

113
00:05:22,480 --> 00:05:25,000
What's terrible about 1 equals minus 1?

114
00:05:25,000 --> 00:05:27,280
Well, it's false and you don't want to ever

115
00:05:27,280 --> 00:05:28,439
conclude something that's false.

116
00:05:28,439 --> 00:05:29,319
That's worrisome.

117
00:05:29,319 --> 00:05:31,879
It's disastrous when you conclude that something is false.

118
00:05:31,879 --> 00:05:33,960
Let me give you an illustration of why.

119
00:05:33,960 --> 00:05:36,600
Because let's suppose that 1 is equal to minus 1.

120
00:05:36,600 --> 00:05:38,720
And that's the reason, but in a correct way,

121
00:05:38,720 --> 00:05:43,040
from that assumption that we have falsely proofed,

122
00:05:43,040 --> 00:05:45,080
but let's assume that we start off with the assumption

123
00:05:45,080 --> 00:05:46,200
that 1 is minus 1.

124
00:05:46,200 --> 00:05:48,160
Well, if I multiply both sides of an equation

125
00:05:48,160 --> 00:05:49,600
by the same thing, it's equal.

126
00:05:49,600 --> 00:05:51,920
So I can multiply both sides by 1,5.

127
00:05:51,920 --> 00:05:54,400
And I get 1,5 is equal to minus 1,5.

128
00:05:54,400 --> 00:05:57,280
Now, I can also add the same thing to both sides.

129
00:05:57,280 --> 00:06:00,560
That's a perfectly sound rule for reasoning about equalities.

130
00:06:00,560 --> 00:06:04,120
If I add 3,5 to both sides, I've turned 1 equals minus 1

131
00:06:04,120 --> 00:06:06,880
into 2 is equal to 1.

132
00:06:06,879 --> 00:06:09,399
Now I'm in great shape to prove all kinds of things.

133
00:06:09,399 --> 00:06:11,560
Here's a famous one.

134
00:06:11,560 --> 00:06:14,279
Since I and the pope are clearly 2,

135
00:06:14,279 --> 00:06:16,480
we conclude that I and the pope are 1.

136
00:06:16,480 --> 00:06:18,360
That is, I am the pope.

137
00:06:18,360 --> 00:06:21,120
And I'll just prove to you this absurd fact.

138
00:06:21,120 --> 00:06:24,759
This is a joke that's attributed a witty remark that's

139
00:06:24,759 --> 00:06:28,879
attributed to Bertrand Russell, the famous philosopher

140
00:06:28,879 --> 00:06:33,399
logician pacifist Nobel Prize winner, who supposedly

141
00:06:33,399 --> 00:06:37,000
was approached by some socialite party who

142
00:06:37,000 --> 00:06:39,159
had heard that mathematicians thought

143
00:06:39,159 --> 00:06:42,319
that if 1 is equal to minus 1, then you could prove anything.

144
00:06:42,319 --> 00:06:44,679
And so she challenged and proved that you're the pope

145
00:06:44,679 --> 00:06:47,879
and supposedly Russell, who was a notoriously quick wit,

146
00:06:47,879 --> 00:06:50,439
came up with this example.

147
00:06:50,439 --> 00:06:53,719
Who knows whether it's true it's a good story.

148
00:06:53,719 --> 00:06:56,679
There's a picture of the great man.

149
00:06:56,679 --> 00:07:01,959
And you might care to learn more about this remarkable contributor

150
00:07:01,959 --> 00:07:04,599
to logic and philosophy and politics.

