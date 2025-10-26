---
title: MIT6042J P68313GeometricSumsVideo
---

1
00:00:00,000 --> 00:00:07,120
We've considered arithmetic sums where each term is a fixed amount larger than the previous

2
00:00:07,120 --> 00:00:09,359
term by an additive amount.

3
00:00:09,359 --> 00:00:12,720
Another kind of sum called geometric sums, which we're going to look at now, come about

4
00:00:12,720 --> 00:00:17,320
where each sum is a fixed multiple of the previous sum.

5
00:00:17,320 --> 00:00:19,440
These come up all the time in lots of different settings.

6
00:00:19,440 --> 00:00:24,080
In this particular case, we're going to look an example of how it applies to analyzing the

7
00:00:24,080 --> 00:00:26,359
value of money in the future.

8
00:00:26,359 --> 00:00:28,600
Let's begin with a geometric sum.

9
00:00:28,600 --> 00:00:30,879
There's the standard form of it.

10
00:00:30,879 --> 00:00:36,480
Geometric sum is of the form 1 plus x plus x squared up through the nth power of x.

11
00:00:36,480 --> 00:00:40,240
For uniformity, notice that one is actually x to the zero.

12
00:00:40,240 --> 00:00:47,000
We're taking the sum from k equals zero to n of x to the k.

13
00:00:47,000 --> 00:00:51,879
What I'd like to do is find a nice closed form for this without those ellipses and having

14
00:00:51,879 --> 00:00:53,600
a growing number of terms n.

15
00:00:53,600 --> 00:00:58,000
There's a simple trick with the arithmetic sum, the way Gauss got it and the way we got

16
00:00:58,000 --> 00:01:01,200
it was by reversing the sum and adding the things together.

17
00:01:01,200 --> 00:01:06,400
This time, the trick is to multiply gn by x.

18
00:01:06,400 --> 00:01:12,439
What's that going to do is it's going to increase the power of x in each term by 1, which

19
00:01:12,439 --> 00:01:14,799
is tantamount to a right shift.

20
00:01:14,799 --> 00:01:16,040
Let's look at that.

21
00:01:16,040 --> 00:01:17,280
There's xg of n.

22
00:01:17,280 --> 00:01:22,840
So 1 times x, of course, I'm subtracting looking ahead.

23
00:01:22,840 --> 00:01:27,120
So 1 times x is minus x.

24
00:01:27,120 --> 00:01:29,799
x times x is x squared.

25
00:01:29,799 --> 00:01:35,719
I'm going to subtract it down through x to the n minus 1 times x gives me the x to the

26
00:01:35,719 --> 00:01:36,719
n term.

27
00:01:36,719 --> 00:01:41,120
And finally, I have an extra term from right shifting x to the n to be x to the n plus

28
00:01:41,120 --> 00:01:42,120
1.

29
00:01:42,120 --> 00:01:45,159
Now, let's do this subtraction.

30
00:01:45,159 --> 00:01:48,959
But of course, I'm going to line the terms up so that they're easy to subtract.

31
00:01:48,959 --> 00:01:52,840
And now, all the terms in the middle cancel, which is very cool, because we've just figured

32
00:01:52,840 --> 00:01:59,120
out that gn minus xgn is 1 minus x to the n plus 1.

33
00:01:59,120 --> 00:02:01,599
So we have this nice elegant formula.

34
00:02:01,599 --> 00:02:06,840
Now I can factor out gn and I get a gn times 1 minus x on the left.

35
00:02:06,840 --> 00:02:14,120
And the result is that I get the gn is 1 minus x to the n plus 1 over 1 minus x.

36
00:02:14,120 --> 00:02:17,319
This is actually a formula that we proved before by induction.

37
00:02:17,319 --> 00:02:21,560
But when we did it by induction, there was no clue about who was the clever person to

38
00:02:21,560 --> 00:02:22,960
think of this formula.

39
00:02:22,960 --> 00:02:26,719
Now you know how that clever person found it.

40
00:02:26,719 --> 00:02:30,920
And that's kind of a standard trick that we'll see more of when we look at generating functions.

41
00:02:30,920 --> 00:02:36,319
But for now, it's a simple trick for getting a nice closed form for a sum.

42
00:02:36,319 --> 00:02:38,280
We refer to it as the perturbation method.

43
00:02:38,280 --> 00:02:42,280
You take the sum, you perturb it a little, see how it relates to itself, get an arithmetic

44
00:02:42,280 --> 00:02:46,879
relation and solve for a formula for the sum.

45
00:02:46,879 --> 00:02:52,439
OK, a geometric series, I use the word sum for a finite sum.

46
00:02:52,439 --> 00:02:55,120
Geometric series is when you take an infinite sum.

47
00:02:55,120 --> 00:03:00,319
So the infinite geometric sum is the sum 1 plus x plus x squared x to the n.

48
00:03:00,319 --> 00:03:01,319
And it keeps going.

49
00:03:01,319 --> 00:03:05,759
It's the sum from i equals 0 to infinity of x to the i.

50
00:03:05,759 --> 00:03:07,800
And there's a simple formula for that too.

51
00:03:07,800 --> 00:03:09,479
It's even simpler actually.

52
00:03:09,479 --> 00:03:14,719
Because the definition of an infinite sum is it's the limit of the truncated sums.

53
00:03:14,719 --> 00:03:20,159
It's the limit of the sum of the first n terms as n goes to infinity, assuming that limit

54
00:03:20,159 --> 00:03:21,239
exists.

55
00:03:21,239 --> 00:03:28,519
And so for the value of this infinite series is the limit of gn, which is the sum up to

56
00:03:28,519 --> 00:03:30,039
n.

57
00:03:30,039 --> 00:03:31,359
And let's look at that.

58
00:03:31,359 --> 00:03:36,479
Well, it's, what, it's gn is 1 minus x to the n plus 1 over 1 minus x.

59
00:03:36,479 --> 00:03:42,319
So the limit of that, the limits distribute past the 1 down to, and the x doesn't have

60
00:03:42,319 --> 00:03:43,319
an n in it.

61
00:03:43,319 --> 00:03:49,159
So it winds up being 1 minus the limit is n approaches infinity of x to the n plus 1 divided

62
00:03:49,159 --> 00:03:50,719
by 1 minus x.

63
00:03:50,719 --> 00:03:55,799
And as long as x is less than 1, x to the n plus 1 is going to go to 0.

64
00:03:55,799 --> 00:04:03,039
And I wind up with this nice simple formula that the infinite series, the sum from i equals

65
00:04:03,039 --> 00:04:09,120
0 to infinity of x to the i, is equal to 1 over 1 minus x, providing that the magnitude

66
00:04:09,120 --> 00:04:11,000
of x is less than 1.

67
00:04:11,000 --> 00:04:20,079
Okay, that's the basics, mathematical preliminaries of geometric sums and geometric series.

68
00:04:20,079 --> 00:04:26,759
Now let's look at a typical application, having to do with the future value of money.

69
00:04:26,759 --> 00:04:28,319
Suppose we want to make the following deal.

70
00:04:28,319 --> 00:04:35,279
I promise I will pay you $100 in one year if you will pay me a fixed amount now.

71
00:04:35,279 --> 00:04:36,959
So let's call it x dollars.

72
00:04:36,959 --> 00:04:40,639
And the puzzle is, how much money is $100 worth?

73
00:04:40,639 --> 00:04:43,279
If you can't have it now, you can only have it in one year.

74
00:04:43,279 --> 00:04:44,600
It's worth x dollars.

75
00:04:44,600 --> 00:04:46,439
How are we going to figure out what x should be?

76
00:04:46,439 --> 00:04:51,600
What would be a fair amount for you to pay me so that I'm willing to pay you $100 in

77
00:04:51,600 --> 00:04:52,600
one year?

78
00:04:52,600 --> 00:04:53,600
And it's fair.

79
00:04:53,600 --> 00:04:54,600
Nobody loses.

80
00:04:54,600 --> 00:04:55,600
Okay.

81
00:04:55,600 --> 00:05:02,080
The basic fact that is the basis for evaluating what the value of money in the future is, is

82
00:05:02,080 --> 00:05:05,560
I'm going to assume that my bank will pay me 3% interest.

83
00:05:05,560 --> 00:05:12,400
This is a generous bank in today's economy, but it used to be a stingy offer.

84
00:05:12,400 --> 00:05:18,720
Interest rates in my lifetime have ranged between about 17% a year down to less than 1%

85
00:05:18,720 --> 00:05:22,480
a year, 3% a reasonable number to play with.

86
00:05:22,480 --> 00:05:28,900
So let's suppose that my bank commits to paying me 3% interest on a deposit now.

87
00:05:28,900 --> 00:05:35,120
That is to say, let's define the bank rate B to be 1.03 and the deal is that the bank

88
00:05:35,120 --> 00:05:41,120
will increase the money that I have now by a factor of B in one year.

89
00:05:41,120 --> 00:05:42,120
Okay.

90
00:05:42,120 --> 00:05:48,600
Well, so if I deposit your x dollars now, I means I will have B times x dollars in one

91
00:05:48,600 --> 00:05:49,600
year.

92
00:05:50,080 --> 00:05:51,080
Okay.

93
00:05:51,080 --> 00:05:55,920
Assuming that the bank is completely reliable is no risk there and I get exactly B times

94
00:05:55,920 --> 00:06:01,920
x in one year, then I won't lose any money, providing that B times x is greater than

95
00:06:01,920 --> 00:06:02,920
equal to 100.

96
00:06:02,920 --> 00:06:03,920
I need the x dollars.

97
00:06:03,920 --> 00:06:06,280
You give me now to be worth the $100.

98
00:06:06,280 --> 00:06:07,840
I'm supposed to pay you.

99
00:06:07,840 --> 00:06:11,680
I'll come out ahead if Bx is greater than equal to 100.

100
00:06:11,680 --> 00:06:14,360
I'll lose if it's less than 100.

101
00:06:14,360 --> 00:06:17,760
And it's a completely fair if Bx is equal to 100.

102
00:06:18,159 --> 00:06:18,759
All right.

103
00:06:18,759 --> 00:06:25,000
Well, that means that x is simply 100 over B, which we decided was 1.03, 9709.

104
00:06:25,000 --> 00:06:37,000
So $100 in one year is worth $97.9 or normalizing to $1.1.

105
00:06:37,000 --> 00:06:40,920
In one year is worth $0.97 essentially now.

106
00:06:40,920 --> 00:06:46,120
Well, now we can shift perspective a little bit and think back a year.

107
00:06:46,120 --> 00:06:52,040
So how much money did I need last year in order to be worth $1 today?

108
00:06:52,040 --> 00:06:56,959
Well, by the same reasoning, the bank is going to pay me B times r today.

109
00:06:56,959 --> 00:06:59,519
So I need B times r to equal $1.

110
00:06:59,519 --> 00:07:04,120
In other words, r has got to be 1 over B. r is 1 over the bank rate.

111
00:07:04,120 --> 00:07:09,639
So $1 a year ago is worth, our dollars a year ago is worth $1 today.

112
00:07:09,639 --> 00:07:19,240
And by the same reasoning, $1 paid in two years is worth n times r paid in one year,

113
00:07:19,240 --> 00:07:24,839
which is worth n times r squared paid today.

114
00:07:24,839 --> 00:07:29,879
So I can iterate this bank of this 1 over bank rate factor.

115
00:07:29,879 --> 00:07:39,519
And as time goes on, a k years out, a value of $1 paid in k years is worth n times r

116
00:07:39,519 --> 00:07:43,879
to the k today, where r is 1 over the bank rate.

117
00:07:43,879 --> 00:07:47,039
OK, that's good to know.

118
00:07:47,039 --> 00:07:48,599
Let's think about annuities now.

119
00:07:48,599 --> 00:07:55,359
And annuity is a contract that people buy to provide income for themselves without risk.

120
00:07:55,359 --> 00:08:00,359
So they will make a deal typically with insurance company, where they will pay a certain amount

121
00:08:00,359 --> 00:08:05,159
of money now to the insurance company and the insurance company promises to provide them

122
00:08:05,159 --> 00:08:09,199
a regular income sometimes for life or sometimes for a fixed period.

123
00:08:09,279 --> 00:08:10,959
So let's look at an example.

124
00:08:10,959 --> 00:08:14,680
I will pay you $100 a year for 10 years.

125
00:08:14,680 --> 00:08:17,680
If you will pay me a fixed premium, what should it be?

126
00:08:17,680 --> 00:08:22,879
So I'm going to promise as the insurance company to pay you $100 a year for 10 years,

127
00:08:22,879 --> 00:08:26,639
I want you to pay me a premium of $1 now.

128
00:08:26,639 --> 00:08:28,240
How much should you pay?

129
00:08:28,240 --> 00:08:31,199
Well, let's think about it.

130
00:08:31,199 --> 00:08:35,840
$100 in one year is worth 100 times r.

131
00:08:35,840 --> 00:08:41,240
And $100 in two years is worth 100 times r squared.

132
00:08:41,240 --> 00:08:46,280
And finally, $100 in 10 years is worth 100 times r to the 10th.

133
00:08:46,280 --> 00:08:50,440
So this is the amount that I will have to pay you in today's dollars.

134
00:08:50,440 --> 00:08:56,480
I need, in order to be paying you $100 a year for 10 years, I need a total of this amount

135
00:08:56,480 --> 00:09:01,480
of much amount of money now, because each of these terms is the amount of money that

136
00:09:01,480 --> 00:09:05,600
the $100 will be worth paid to you that many years out.

137
00:09:05,600 --> 00:09:07,879
Well, look at this sum.

138
00:09:07,879 --> 00:09:15,320
If I factor out 100 r, I'm left with 100 r times the geometric sum from 1 to r to the

139
00:09:15,320 --> 00:09:19,519
9th, where the base of the sum is r, the factor is r.

140
00:09:19,519 --> 00:09:22,120
Well, we have a nice formula for that.

141
00:09:22,120 --> 00:09:25,560
It's simply 1 minus r to the 10th over 1 minus r.

142
00:09:25,559 --> 00:09:33,239
And now plugging in r equals 1 over 1.03, I wind up with the conclusion that this annuity

143
00:09:33,239 --> 00:09:38,000
is worth $853 in two cents today.

144
00:09:38,000 --> 00:09:46,719
My promise to pay you $1,000, but spread out over the next 11 years is worth $853 in two

145
00:09:46,719 --> 00:09:52,599
cents today, assuming that the bank rate is 3% a year.

146
00:09:52,600 --> 00:09:59,200
And that's a typical case where a geometric series come up and you'll see other examples

147
00:09:59,200 --> 00:10:00,680
in problems.

148
00:10:00,680 --> 00:10:06,200
Just a quick thing to think about, suppose that the bank rates rapidly increase, unexpectedly

149
00:10:06,200 --> 00:10:07,200
increase.

150
00:10:07,200 --> 00:10:14,360
The Fed finally gets the economy moving and interest rates run up to 5% say, what happens

151
00:10:14,360 --> 00:10:15,759
on this annuity?

152
00:10:15,759 --> 00:10:19,840
You've already paid me the $853 and I've already committed to paying you $100 a year for

153
00:10:19,840 --> 00:10:22,519
the next 10 years starting in a year.

154
00:10:22,519 --> 00:10:27,040
Who comes out ahead if bank rates increase?

155
00:10:27,040 --> 00:10:32,280
You come out ahead, the deal stays fair or I come out ahead and I'll close by letting

156
00:10:32,280 --> 00:10:34,360
you think about that question.

