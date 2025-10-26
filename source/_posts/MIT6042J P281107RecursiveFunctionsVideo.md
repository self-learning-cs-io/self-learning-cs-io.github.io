---
title: MIT6042J P281107RecursiveFunctionsVideo
---

1
00:00:00,000 --> 00:00:11,279
Now the standard thing you do with a recursive data type in programming is you define recursive

2
00:00:11,279 --> 00:00:13,160
procedures on them.

3
00:00:13,160 --> 00:00:17,120
So let's look at how that works.

4
00:00:17,120 --> 00:00:22,320
I'm going to define a function f on a recursively defined data type r.

5
00:00:22,320 --> 00:00:29,800
Now what I'm going to do is I'm going to define f of b explicitly in terms of b and operations

6
00:00:29,800 --> 00:00:37,160
that are already understood for all of the base cases of b in r.

7
00:00:37,160 --> 00:00:47,799
And then I'm going to define f of a constructor applied to x in terms of x and f of x.

8
00:00:47,799 --> 00:00:53,560
And if I keep to that structure, that gives me a recursive definition of the function f

9
00:00:53,560 --> 00:00:56,640
on the recursively defined data set r.

10
00:00:56,640 --> 00:01:01,560
Let's look at an example to make this recipe explicit and clearer.

11
00:01:01,560 --> 00:01:05,599
Let's think about a recursive function on the set of matched brackets.

12
00:01:05,599 --> 00:01:08,640
This is a somewhat interesting one.

13
00:01:08,640 --> 00:01:14,519
Let's define the depth of a string as follows and the idea is how deeply nested are the

14
00:01:14,519 --> 00:01:18,319
successive pairs of left and right brackets.

15
00:01:18,319 --> 00:01:21,680
Well, the depth of the empty string is zero.

16
00:01:22,200 --> 00:01:24,040
You've got to start somewhere.

17
00:01:24,040 --> 00:01:25,840
It's got no brackets.

18
00:01:25,840 --> 00:01:28,400
We'll call it depth zero.

19
00:01:28,400 --> 00:01:35,200
Now what about the depth of the constructor putting brackets around s and then following

20
00:01:35,200 --> 00:01:36,360
it by t?

21
00:01:36,360 --> 00:01:43,120
Well, putting brackets around s gives you a string that's one deeper than s's.

22
00:01:43,120 --> 00:01:46,800
And then you follow it by t and it's as deep as t is.

23
00:01:46,799 --> 00:01:55,000
So the result is that the depth of the constructor is a string whose is a number which is equal

24
00:01:55,000 --> 00:02:02,399
to one plus the depth of s and the depth of t, whichever is larger, the max of one plus

25
00:02:02,399 --> 00:02:05,039
depth of s and depth of t.

26
00:02:05,039 --> 00:02:09,919
And that's our recursive definition of depth.

27
00:02:09,919 --> 00:02:13,159
Let's look at maybe another even more familiar example of a recursive definition.

28
00:02:13,159 --> 00:02:19,960
Let's define the nth power of an integer or real number k.

29
00:02:19,960 --> 00:02:25,840
The zero of power of k is defined to be one and the n plus first power of k is defined

30
00:02:25,840 --> 00:02:31,000
to be k times the nth power of k.

31
00:02:31,000 --> 00:02:37,199
This would be an executable definition of the exponentiation function in a lot of programming

32
00:02:37,199 --> 00:02:39,919
languages.

33
00:02:39,919 --> 00:02:46,079
And my point here is that this familiar recursive definition on a non-negative integer

34
00:02:46,079 --> 00:02:55,519
n is in fact a structural induction using the fact that the negative integers can be defined

35
00:02:55,519 --> 00:02:57,159
recursively as follows.

36
00:02:57,159 --> 00:03:04,279
Zero is a non-negative integer and if n is a non-negative integer then n plus one

37
00:03:04,279 --> 00:03:06,799
is a non-negative integer.

38
00:03:06,800 --> 00:03:13,160
So to summarize the recipe for a recursive function definition is you define f going

39
00:03:13,160 --> 00:03:17,240
from the recursive data type to values, whatever kind of values you want to assign to these

40
00:03:17,240 --> 00:03:18,719
recursive data.

41
00:03:18,719 --> 00:03:25,040
f of b is defined directly for the base case b of base cases b and f of the constructor

42
00:03:25,040 --> 00:03:30,960
of x is defined using f of x and x.

43
00:03:30,960 --> 00:03:37,159
Now once you've gotten a function defined recursively you can start proving things about

44
00:03:37,159 --> 00:03:45,640
it by structural induction or by induction on its own definition, its own recursive definition.

45
00:03:45,640 --> 00:03:48,480
So let's look at an example of that.

46
00:03:48,480 --> 00:03:56,400
I want to prove the following property of the depth of strings in m, namely that if I

47
00:03:56,400 --> 00:04:03,400
look at the length of a string r plus 2, so the brackets around r means the number of

48
00:04:03,400 --> 00:04:09,560
r, sorry the vertical bars around r mean the number of brackets in the string r plus

49
00:04:09,560 --> 00:04:16,480
2 is less than or equal to 2 to the power depth plus 1 twice the 2 to the depth of the

50
00:04:16,480 --> 00:04:19,079
string.

51
00:04:19,079 --> 00:04:24,199
And I want to prove that this holds for all strings r of matched brackets and I'm going

52
00:04:24,199 --> 00:04:27,159
to prove it by structural induction.

53
00:04:27,159 --> 00:04:30,000
Just as a walkthrough here is how the proof is going to go.

54
00:04:30,000 --> 00:04:32,800
Let's suppose that r is the base case.

55
00:04:32,800 --> 00:04:37,159
Is it the case that this inequality holds for the empty string?

56
00:04:37,159 --> 00:04:45,560
Well the length of r is 0, so length of r plus 2 is 0 plus 2 or 2, which is the same as

57
00:04:45,560 --> 00:04:51,719
2 to the 0 plus 1, which is in fact equal to 2 to the depth of the empty string plus 1.

58
00:04:51,720 --> 00:04:58,760
So this inequality actually holds as an equality in the base case and we're good there.

59
00:04:58,760 --> 00:05:03,540
What we next need to show is that this inequality holds in the constructor case.

60
00:05:03,540 --> 00:05:12,360
So we're looking at an arbitrary string r that's built out of s and t and r is left bracket

61
00:05:12,360 --> 00:05:14,960
s, right bracket t.

62
00:05:14,960 --> 00:05:19,640
And I want to show that r satisfies this inequality.

63
00:05:19,639 --> 00:05:24,039
So by induction hypothesis I can assume that s and t satisfy the inequality.

64
00:05:24,039 --> 00:05:29,439
So I have that the length of s plus 2 is at most 2 to the depth of s plus 1 and the length

65
00:05:29,439 --> 00:05:33,079
of t plus 2 is at most 2 to the depth of t plus 1.

66
00:05:33,079 --> 00:05:36,560
And let's just walk through the proof.

67
00:05:36,560 --> 00:05:38,560
You can slow this down and replay it if need be.

68
00:05:38,560 --> 00:05:41,360
So I'm just going to go through it quickly.

69
00:05:41,360 --> 00:05:46,680
The length of r plus 2 is after all brackets s t.

70
00:05:46,680 --> 00:05:50,800
So it's simply the length of that string plus 2 by the definition of r.

71
00:05:50,800 --> 00:05:57,860
The length of brackets s t is the length of t plus the length of s plus the 2 for the

72
00:05:57,860 --> 00:05:59,960
2 brackets that we've added.

73
00:05:59,960 --> 00:06:05,040
And so we're plugging that in to the previous term and getting that plus 2.

74
00:06:05,040 --> 00:06:06,720
Then just rearrange the terms.

75
00:06:06,720 --> 00:06:10,879
It's the same as the size of s plus 2 plus the size of t plus 2.

76
00:06:10,879 --> 00:06:16,639
And I arranged it that way because by induction hypothesis I know that the size of s plus

77
00:06:16,800 --> 00:06:22,680
2 is less than or equal to 2 to the depth of s plus 1 and likewise for t.

78
00:06:22,680 --> 00:06:28,319
Now I just play a nice trick to get these two exponents to look alike.

79
00:06:28,319 --> 00:06:34,879
I say that the depth of s is less than or equal to the max of the depth of s and the depth

80
00:06:34,879 --> 00:06:37,240
of t and likewise for the depth of t.

81
00:06:37,240 --> 00:06:44,479
So in both of those terms here I can replace the exponent or replace the depth of s by the

82
00:06:44,480 --> 00:06:48,800
max of depth s and t and likewise here.

83
00:06:48,800 --> 00:06:51,640
Now I've got the same term twice.

84
00:06:51,640 --> 00:06:58,280
So I can say that it's simply twice the max depth.

85
00:06:58,280 --> 00:07:05,160
And of course that is equal to by definition of the depth of r twice 2 to the depth of

86
00:07:05,160 --> 00:07:08,960
r which is of course 2 to the depth of r plus 1.

87
00:07:08,959 --> 00:07:16,039
And I have by more or less automatically plugging into the definitions and a structural

88
00:07:16,039 --> 00:07:24,919
induction I've proved that this inequality holds for the recursively defined depth function.

89
00:07:24,919 --> 00:07:25,759
And we're done.

90
00:07:25,759 --> 00:07:28,839
Let's look at one more familiar example.

91
00:07:28,839 --> 00:07:34,039
I want to give a recursive definition of the positive powers of 2.

92
00:07:34,040 --> 00:07:38,920
So the base case is the 2 is a positive power of 2.

93
00:07:38,920 --> 00:07:43,960
And the constructor is just one constructor I'm going to use that if x and y are positive

94
00:07:43,960 --> 00:07:48,640
powers of 2 then their product is a positive power of 2.

95
00:07:48,640 --> 00:07:50,720
So let's look at some examples.

96
00:07:50,720 --> 00:07:54,879
I can start with 2 and then the only thing I can do as a constructor is multiply 2 by

97
00:07:54,879 --> 00:07:56,240
2 to get 4.

98
00:07:56,240 --> 00:08:02,840
Once I got 4 I can do 4 times 2 to get 8 and I can do 4 times 4 to get 16 and I can do 4

99
00:08:02,839 --> 00:08:12,239
times 8 to get 32 and all of these are positive powers of 2.

100
00:08:12,239 --> 00:08:18,919
Now let's define the log to the base 2 of a positive power of 2 recursively.

101
00:08:18,919 --> 00:08:22,000
Well the log to the base 2 of 2 is 1.

102
00:08:22,000 --> 00:08:27,519
I have to define log to the base 2 in the base case and that's easy to do.

103
00:08:27,519 --> 00:08:29,439
What about in the constructor case?

104
00:08:29,439 --> 00:08:35,840
Well the log to the base 2 of xy is equal to the log to the base 2 of x plus the log to

105
00:08:35,840 --> 00:08:41,080
the base 2 of y for all the xy's that are positive powers of 2.

106
00:08:41,080 --> 00:08:49,159
And so I have to find a log of the constructor xy in terms of the function log of x and

107
00:08:49,159 --> 00:08:50,960
the function log applied to y.

108
00:08:50,960 --> 00:08:58,399
It conforms to the standard definition of a recursive function on a recursively defined

109
00:08:58,399 --> 00:09:01,519
data type the positive powers of 2.

110
00:09:01,519 --> 00:09:03,240
This looks okay.

111
00:09:03,240 --> 00:09:04,679
Let's just check it out.

112
00:09:04,679 --> 00:09:16,840
So log of 4 is log of 2 times 2 which is by the definition of log plus the log of 2 which

113
00:09:16,840 --> 00:09:21,240
is 1 plus 1 which is equal to 2 and guess what that's correct.

114
00:09:21,240 --> 00:09:24,720
The log of 8, well 8 is 2 times 4.

115
00:09:24,720 --> 00:09:31,960
So by the recursive definition that's the log of 2 plus the log of 4 which we previously

116
00:09:31,960 --> 00:09:36,240
figured out log of 4 was 2 so we get 3 and the answer comes out right.

117
00:09:36,240 --> 00:09:41,360
Now remember you're not supposed to in this reasoning use the properties that you know

118
00:09:41,360 --> 00:09:47,440
that log to the base 2 has because we're defining this function which we're calling log

119
00:09:47,440 --> 00:09:50,840
to the base 2 and implicitly claiming that it's right.

120
00:09:50,840 --> 00:09:56,879
But in order to prove that it's right we need to be using just the structural definition

121
00:09:56,879 --> 00:09:59,600
of log to the base 2 to prove its properties.

122
00:09:59,600 --> 00:10:06,240
So that was what I was illustrating with this reasoning that just plugging in the constructor

123
00:10:06,240 --> 00:10:11,960
case of log of xy is log of x plus log of y I can get these numbers out.

124
00:10:11,960 --> 00:10:15,680
So the point of this is just to make the following definition look reasonable.

125
00:10:15,680 --> 00:10:19,120
I'm going to define a new function which I'm going to call the loggy function.

126
00:10:19,120 --> 00:10:23,759
It's another function on the positive powers of 2 and here's the definition of the loggy

127
00:10:23,759 --> 00:10:24,759
function.

128
00:10:24,759 --> 00:10:31,279
The loggy of 2 is going to be 1 just as the log is but the loggy of xy is going to be

129
00:10:31,279 --> 00:10:37,879
x plus the loggy of y for all xy in positive powers of 2.

130
00:10:37,879 --> 00:10:40,799
Let's try that definition.

131
00:10:40,799 --> 00:10:51,000
Loggy of 4 is loggy of 2 times 2 which according to the recursive definition is 2 plus the loggy

132
00:10:51,000 --> 00:10:56,039
of 2 which is 1 namely it's 3.

133
00:10:56,039 --> 00:11:04,079
Loggy of 8, well 8 is 2 times 4 so the loggy of 8 is 2 plus the loggy of 4.

134
00:11:04,079 --> 00:11:08,359
We just figured out that the loggy of 4 was 3 so it's 2 plus 3 is 5.

135
00:11:08,440 --> 00:11:19,440
And finally loggy of 16, well 16 is 8 times 2 so the loggy of 8 times 2 is 8 plus the loggy

136
00:11:19,440 --> 00:11:24,600
of 2 which we know is 1 it's 9.

137
00:11:24,600 --> 00:11:31,600
So we've just figured out the loggy of 16 is 9 but now comes the problem.

138
00:11:31,600 --> 00:11:35,680
16 of course is not only 8 times 2 but it's 2 times 8.

139
00:11:35,679 --> 00:11:41,399
And so the loggy of 2 times 8 is 2 plus the loggy of 8, loggy of 8 we've previously figured

140
00:11:41,399 --> 00:11:45,319
out was 5 so the loggy of 16 is 7.

141
00:11:45,319 --> 00:11:47,759
And now I have an inconsistency.

142
00:11:47,759 --> 00:11:53,639
I have used this recursive definition of loggy to conclude that the loggy of 16 is both

143
00:11:53,639 --> 00:11:56,839
9 and 7 and we got a problem.

144
00:11:56,839 --> 00:11:59,279
It's not a good definition of a function.

145
00:11:59,279 --> 00:12:02,839
The problem is a simple one called ambiguity.

146
00:12:02,840 --> 00:12:07,800
There's more than one way to construct the elements of PP2, of positive power sub 2 from

147
00:12:07,800 --> 00:12:11,920
the constructor x times y.

148
00:12:11,920 --> 00:12:20,600
16 was 8 times 2 but it's also 2 times 8 and of course it's also 4 times 4 and depending

149
00:12:20,600 --> 00:12:27,120
on which constructor you use to construct 16 you're going to get out different values

150
00:12:27,120 --> 00:12:32,400
assigned to the loggy function.

151
00:12:32,399 --> 00:12:41,480
So when you have an ambiguously defined recursive data structure, for example, F18 is very ambiguous,

152
00:12:41,480 --> 00:12:49,399
then defining recursive functions on that definition is not going to work well and you have

153
00:12:49,399 --> 00:12:55,559
to very carefully prove that a recursive definition actually works in a single value.

154
00:12:55,559 --> 00:13:00,600
So for example, log to the base 2 does work but that would require proof it doesn't follow

155
00:13:00,680 --> 00:13:08,279
on general principles when you define a recursive function on an ambiguous data type.

156
00:13:08,279 --> 00:13:15,440
On the other hand, the reason why we chose that somewhat unexpected single constructor for

157
00:13:15,440 --> 00:13:22,759
the balanced strings and the balanced bracket strings was that it turns out to be unambiguous

158
00:13:22,759 --> 00:13:31,200
and so that definition of depth is a good definition as is any definition based on the

159
00:13:31,200 --> 00:13:35,639
recursive definition of the set M. So the general problem we have to watch out for

160
00:13:35,639 --> 00:13:49,439
is the constructor created the data me if there's more than one way to construct e then

161
00:13:49,440 --> 00:13:56,440
you're going to you're not quite sure which case up to use to define the function F and

162
00:13:56,440 --> 00:14:03,840
that's why this issue of whether or not the data structures in PIG US is critical to getting

163
00:14:03,840 --> 00:14:06,200
good definitions of recursive functions.

