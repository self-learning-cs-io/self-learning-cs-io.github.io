---
title: MIT6042J P22184StrongInductionVideo
---

1
00:00:00,000 --> 00:00:12,240
So now we come to an interesting variant of ordinary induction called strong induction.

2
00:00:12,240 --> 00:00:13,759
And here's how it works.

3
00:00:13,759 --> 00:00:18,519
Strong induction just as with ordinary induction, you prove the base case p of 0.

4
00:00:18,519 --> 00:00:20,160
You're trying to prove for all np of n.

5
00:00:20,160 --> 00:00:22,039
So you prove p of 0.

6
00:00:22,039 --> 00:00:29,780
But now in order to prove p of n plus 1 in the inductive step, assuming p of n with ordinary

7
00:00:29,780 --> 00:00:35,740
induction with strong induction, you can assume not just p of n, but you can assume p of 0,

8
00:00:35,740 --> 00:00:45,039
p of 1 all of the properties that all the numbers up through n have the property.

9
00:00:45,039 --> 00:00:48,960
And from this, of course, you could conclude that everything has the property that for all

10
00:00:48,960 --> 00:00:49,960
np of n.

11
00:00:49,960 --> 00:00:53,600
Now an intuitive way to justify this is you think about it, the way the induction works

12
00:00:53,600 --> 00:00:59,200
is you start off at 0 and then you make a step to 1 and you make another step to 2 and

13
00:00:59,200 --> 00:01:01,160
you make another step to 3.

14
00:01:01,160 --> 00:01:05,680
And the induction step going from n to n plus 1 justifies each of those steps.

15
00:01:05,680 --> 00:01:10,280
By the time you get to n and you have to prove you can get to n plus 1, you've already been

16
00:01:10,280 --> 00:01:12,519
through 0, 1 up to n.

17
00:01:12,519 --> 00:01:14,680
You might as well take advantage of that fact.

18
00:01:14,680 --> 00:01:18,319
And instead of only remembering that you're at the n step, you might as well remember that

19
00:01:18,319 --> 00:01:19,599
you got there.

20
00:01:19,599 --> 00:01:25,239
And this is an intuitive hand-wavy argument which can be justified formally in a way that

21
00:01:25,239 --> 00:01:26,879
will emerge in the next segment.

22
00:01:26,879 --> 00:01:32,439
So let's hold off on that and just bite the bullet and accept this as a basic principle

23
00:01:32,439 --> 00:01:35,879
of math that we're going to live with and use.

24
00:01:35,879 --> 00:01:37,280
All right.

25
00:01:37,280 --> 00:01:42,359
As an application of it, let's prove something that we've already proved by well-ordering.

26
00:01:42,359 --> 00:01:47,319
In fact, strong induction of well-ordering are closely related as we'll also discuss later.

27
00:01:47,319 --> 00:01:53,439
So let's prove that using 3 and 5 cent stamps that you can get any amount of postage greater

28
00:01:53,439 --> 00:01:56,919
than or equal to 8 cent stamps.

29
00:01:56,919 --> 00:02:00,119
And I'm going to prove this by strong induction.

30
00:02:00,119 --> 00:02:06,199
With the induction hypothesis, p of n that says I can form n plus 8 cent stamps.

31
00:02:06,199 --> 00:02:10,840
Clearly, if I can prove for all n, p of n, then I've proved that I can get for every

32
00:02:10,840 --> 00:02:15,079
amount greater than or equal to 8 cent stamps.

33
00:02:15,080 --> 00:02:18,280
And let's do the base case.

34
00:02:18,280 --> 00:02:22,760
Well, the base case, p of 0, can I make 8 cent stamps, sure, 3 and 5?

35
00:02:22,760 --> 00:02:24,760
That's that one and that's okay.

36
00:02:24,760 --> 00:02:35,000
For the inductive step, I have to get m allowed to assume rather that I can get m plus 8

37
00:02:35,000 --> 00:02:42,360
cents for any m from n down to 0 instead of just assuming that I can get n plus 8 cents

38
00:02:42,360 --> 00:02:44,720
to get n plus 1 plus 8 cents.

39
00:02:44,719 --> 00:02:49,080
I can assume any amount less than what I'm aiming for.

40
00:02:49,080 --> 00:02:56,079
So I may as well assume that I can get any amount of postage from 8 up to n plus 8 cents.

41
00:02:56,079 --> 00:03:02,840
And my objective then is to get n plus 1 plus 8 cents, namely n plus 9 cents.

42
00:03:02,840 --> 00:03:08,960
So I have to prove that for all n greater than or equal to 0, I can get n plus 9 cents.

43
00:03:08,960 --> 00:03:12,520
Assuming I can get from 8 to n plus 8 cents.

44
00:03:12,520 --> 00:03:14,920
Well, that's not too hard to do.

45
00:03:14,920 --> 00:03:19,760
The inductive step is actually going to break up into a couple of cases depending on the

46
00:03:19,760 --> 00:03:20,760
value of n.

47
00:03:20,760 --> 00:03:23,280
I have to prove n plus 9 cents for all n.

48
00:03:23,280 --> 00:03:26,640
So suppose n equals 0, I have to get 9 cents.

49
00:03:26,640 --> 00:03:28,520
Well, 3, 3s.

50
00:03:28,520 --> 00:03:32,920
If n is 1, I have to get 1 plus 9 cents or 10 cents to 5s.

51
00:03:32,920 --> 00:03:35,600
So those cases are disposed of.

52
00:03:35,600 --> 00:03:42,200
So now my job is to get n plus 9 cents, where n is greater than or equal to 2.

53
00:03:42,199 --> 00:03:47,159
The nice thing about n being greater than or equal to 2 is that if I subtract 2 from

54
00:03:47,159 --> 00:03:52,000
it, it's a smaller number and it's still non-negative.

55
00:03:52,000 --> 00:03:58,399
And that means that I can get that amount plus 8 cents stamps.

56
00:03:58,399 --> 00:04:06,560
So in this nice situation where I, by strong induction, I can get n minus 2 plus 8 cents

57
00:04:06,560 --> 00:04:08,239
stamps there they are.

58
00:04:08,240 --> 00:04:10,360
And how do I get to n plus 9?

59
00:04:10,360 --> 00:04:15,520
Well it's easy, I get a 3 cents stamp and you have n plus 9 cents which completes the

60
00:04:15,520 --> 00:04:21,439
proof of the induction case and the whole theorem is proved.

61
00:04:21,439 --> 00:04:27,720
We can conclude then that it works for all n and that you can indeed get n plus 8 cents

62
00:04:27,720 --> 00:04:34,120
using 3 and 5 cents stamps for all of them.

63
00:04:34,120 --> 00:04:36,000
So much for that example.

64
00:04:36,560 --> 00:04:38,560
Alright, let's look at another example.

65
00:04:38,560 --> 00:04:41,160
This is a game that we used to play in class.

66
00:04:41,160 --> 00:04:44,439
You start off with a stack of blocks, say 10 blocks.

67
00:04:44,439 --> 00:04:49,959
And you're allowed to make a move that consists of splitting the stack into two smaller

68
00:04:49,959 --> 00:04:51,160
stacks.

69
00:04:51,160 --> 00:04:57,279
So if the stack has height a plus b, you can split it into a stack of height a and a

70
00:04:57,279 --> 00:04:58,800
stack of height b.

71
00:04:58,800 --> 00:05:00,439
And you get a score for that move.

72
00:05:00,439 --> 00:05:03,360
The score is a times b.

73
00:05:03,360 --> 00:05:06,920
And then you keep doing that until you can't make any more moves.

74
00:05:06,920 --> 00:05:12,920
That is when all you have left are stacks of height 1 which you can't split anymore.

75
00:05:12,920 --> 00:05:19,560
And then your overall score is the total that you got for all the moves that you made until

76
00:05:19,560 --> 00:05:22,400
that point.

77
00:05:22,400 --> 00:05:27,480
Now when we played this in class we would have students competing and they would try

78
00:05:27,480 --> 00:05:28,960
various strategies.

79
00:05:28,960 --> 00:05:33,240
So one strategy, the simplest strategy, maybe not the best, but the simplest strategy

80
00:05:33,240 --> 00:05:35,480
would be you start off with a stack of 10.

81
00:05:35,480 --> 00:05:38,879
So you take one off and that leaves you with a stack of 1 and 9.

82
00:05:38,879 --> 00:05:39,879
Your score is 9.

83
00:05:39,879 --> 00:05:44,680
Then you take another one off of the stack of 9 and you left with a 1 and an 8.

84
00:05:44,680 --> 00:05:46,439
Your score is 8 and so on.

85
00:05:46,439 --> 00:05:53,280
And you can see in fact if you took the 1 at a time process then your score with a stack

86
00:05:53,280 --> 00:05:59,280
of height n would be n minus 1 plus n minus 2 down to 2 plus 1.

87
00:05:59,280 --> 00:06:02,759
Another strategy that might be sort of more in the spirit of computer science would be

88
00:06:02,759 --> 00:06:04,839
to keep splitting in 2.

89
00:06:04,839 --> 00:06:09,560
So for example if you had a stack of height 10 you can split it into 2 5's and then you

90
00:06:09,560 --> 00:06:14,360
take one of the 5's and split it into a 3 and a 2 and then you split the 2 into 2 1's

91
00:06:14,360 --> 00:06:15,560
and so on.

92
00:06:15,560 --> 00:06:22,120
Splitting is evenly as you can each time and it seems like it might be a better strategy.

93
00:06:22,120 --> 00:06:26,879
And again we would have students try various strategies and guess what?

94
00:06:26,879 --> 00:06:31,159
They all came in in a tie and that's what we're going to prove now.

95
00:06:31,160 --> 00:06:34,240
Every way of unstacking n blocks gives the same score.

96
00:06:34,240 --> 00:06:35,240
Well what score?

97
00:06:35,240 --> 00:06:39,640
Well we know that the score for the simple strategy of taking one block off at a time is

98
00:06:39,640 --> 00:06:46,720
this sum from 1 to n minus 1 and that has a nice formula n times n minus 1 over 2 so

99
00:06:46,720 --> 00:06:52,960
we can formulate our claim that no matter how you play the unstacking game with a stack

100
00:06:52,960 --> 00:06:59,560
of size n your final score will be n times n minus 1 over 2.

101
00:06:59,560 --> 00:07:05,079
And we're going to prove this by strong induction with this statement called a claim of n is

102
00:07:05,079 --> 00:07:07,879
going to be the induction hypothesis.

103
00:07:07,879 --> 00:07:10,399
That's what we're trying to prove.

104
00:07:10,399 --> 00:07:12,280
Let's start in the usual way.

105
00:07:12,280 --> 00:07:14,800
The base case is n equals 0.

106
00:07:14,800 --> 00:07:16,680
Well you might be bothered that's no blocks.

107
00:07:16,680 --> 00:07:17,680
Well let's see what happens.

108
00:07:17,680 --> 00:07:22,199
With no blocks the score is 0 because there's nothing to do and indeed the formula that

109
00:07:22,199 --> 00:07:28,040
is alleged to be your score comes out to be 0 so the base case n equals 0 works.

110
00:07:28,040 --> 00:07:30,720
This continues for the inductive case.

111
00:07:30,720 --> 00:07:38,920
I have to assume that the given score formula holds for all stacks of height n or less and

112
00:07:38,920 --> 00:07:43,400
I have to prove that it holds for a stack of height n plus 1.

113
00:07:43,400 --> 00:07:49,160
That is that an n plus 1 stack score is n plus 1 times n over 2.

114
00:07:49,160 --> 00:07:50,960
Well how shall I do that?

115
00:07:50,960 --> 00:07:56,240
Well I'm going to split the inductive case into two cases.

116
00:07:56,240 --> 00:08:05,519
It turns out that I need to prove that C of n plus 1 holds assuming C of n for n and

117
00:08:05,519 --> 00:08:07,120
less than n.

118
00:08:07,120 --> 00:08:10,920
But in particular let's just deal with the case that n plus 1 is 1 the smallest value

119
00:08:10,920 --> 00:08:14,079
it could have and knock that one off separately.

120
00:08:14,079 --> 00:08:19,199
Namely if the stack is of height 1 again my score is 0 because there's no move to make

121
00:08:19,199 --> 00:08:22,280
and the formula still evaluates to 0.

122
00:08:22,279 --> 00:08:28,159
So in the case that n plus 1 is 1 I've proved the claim at n plus 1 which I was obligated

123
00:08:28,159 --> 00:08:31,239
to do for the base case for the inductive step.

124
00:08:31,239 --> 00:08:36,639
Well the other case in the inductive step is that n plus 1 is greater than 1.

125
00:08:36,639 --> 00:08:40,240
This is the interesting one because now it's possible to make a move.

126
00:08:40,240 --> 00:08:45,480
So since n plus 1 is greater than 1 it's two or more blocks I can make a move into two

127
00:08:45,480 --> 00:08:48,000
stacks that are both of positive size.

128
00:08:48,000 --> 00:08:49,159
So suppose I do that.

129
00:08:49,159 --> 00:08:54,000
Suppose I split the stack of size n plus 1 into an a stack and a b stack where a and

130
00:08:54,000 --> 00:08:57,679
b sum to n plus 1.

131
00:08:57,679 --> 00:09:00,240
And what's my score going to be then?

132
00:09:00,240 --> 00:09:04,600
Well my score on that move that I make where I split into the a stack and the b stack is

133
00:09:04,600 --> 00:09:12,719
a b and the rest of the game consists of playing as well as I can on the a stack and as well

134
00:09:12,719 --> 00:09:15,079
as I can on the b stack.

135
00:09:15,080 --> 00:09:17,759
But a and b are smaller than n plus 1.

136
00:09:17,759 --> 00:09:23,480
They're less than or equal to n which means that by strong induction I know that no matter

137
00:09:23,480 --> 00:09:27,759
how I play on the a stack I'm going to wind up with this score a times a minus 1 over

138
00:09:27,759 --> 00:09:28,759
2.

139
00:09:28,759 --> 00:09:33,480
No matter how I play on the b stack I'm going to wind up with b times b minus 1 over 2.

140
00:09:33,480 --> 00:09:39,800
So that means that my score on the a plus b stack is going to be this formula a b plus

141
00:09:39,800 --> 00:09:43,520
a times a minus 1 over 2 plus b times b minus 1 over 2.

142
00:09:43,519 --> 00:09:49,360
So you simplify that into to organize it so it's a plus b times a plus b minus 1 which

143
00:09:49,360 --> 00:09:55,679
is exactly n plus 1 times n over 2 which is what we were trying to prove.

144
00:09:55,679 --> 00:09:58,759
We've proved c of n plus 1.

145
00:09:58,759 --> 00:10:03,559
The inductive step is complete and indeed we've proved that no matter how big the stack

146
00:10:03,559 --> 00:10:05,799
is your score comes out the same.

