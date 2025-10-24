---
title: PrincetonAlgorithms P118Part213 04_simplex Implementations
---

1
00:00:00,000 --> 00:00:11,200
Let's take a look at what's needed to implement the simplex algorithm in Java.

2
00:00:11,200 --> 00:00:17,280
So there's a basic idea that's very straightforward.

3
00:00:17,280 --> 00:00:22,320
And that's the first thing we have to do is just put everything in an array.

4
00:00:22,320 --> 00:00:24,960
And that's going to be a simple thing to do.

5
00:00:24,960 --> 00:00:39,679
So we have, in this case, our input is our recipe for AL and a recipe for beer in our profit,

6
00:00:39,679 --> 00:00:46,200
which is our objective function, and then the all the slack variables.

7
00:00:46,200 --> 00:00:54,359
So we put our matrix A, our M equations, and N unknowns in this part of the array.

8
00:00:54,359 --> 00:01:00,920
And then we put our slack variables next to them, and then the right-hand side to the equations,

9
00:01:00,920 --> 00:01:08,319
which is B, and then the initial values of the objective function.

10
00:01:08,319 --> 00:01:13,439
And we don't have to put in the constraints that everything's positive.

11
00:01:13,439 --> 00:01:15,799
So that's what we start with, the tableau.

12
00:01:15,799 --> 00:01:23,319
It's really the matrices and vectors that we have as input to the problem, all put into

13
00:01:23,319 --> 00:01:25,639
a single array.

14
00:01:25,639 --> 00:01:32,559
And that's, again, just to reduce the amount of code we have to worry about.

15
00:01:32,559 --> 00:01:41,639
So the idea is that when we run the algorithm, all we're doing is transforming a few entries

16
00:01:41,639 --> 00:01:43,439
in this array.

17
00:01:43,439 --> 00:01:50,399
And when we're done, this is the representation of the equations that we ended up with before.

18
00:01:50,400 --> 00:02:02,000
And what they tell us is the immediately they tell us the value of the objective function.

19
00:02:02,000 --> 00:02:06,000
And not only that, they tell us how many barrels of beer and ale to make,

20
00:02:06,000 --> 00:02:15,200
because we're sitting at a point where we have our AMB in the basis,

21
00:02:15,199 --> 00:02:21,280
and therefore the slack variables are zero.

22
00:02:21,280 --> 00:02:29,239
So it just tells us immediately that we better make 28 barrels of beer and 12 barrels of ale.

23
00:02:29,239 --> 00:02:31,719
So that's the idea.

24
00:02:31,719 --> 00:02:34,959
We only just work with the elements in this tableau.

25
00:02:34,959 --> 00:02:40,479
And then all we're going to do is write the code to build the tableau and then to do the

26
00:02:40,479 --> 00:02:42,039
pivots.

27
00:02:42,039 --> 00:02:46,879
And this is very straightforward Java code.

28
00:02:46,879 --> 00:02:49,959
So it's going to be two-dimensional array clearly.

29
00:02:49,959 --> 00:02:54,639
We have our number of constraints and our number of variables.

30
00:02:54,639 --> 00:03:07,439
So we'll write a constructor that takes the constraints and then the writing side for

31
00:03:07,439 --> 00:03:15,199
the constraints in the coefficients for the objective function as argument.

32
00:03:15,199 --> 00:03:20,000
So it picks out M and M. And so how big an array do we need?

33
00:03:20,000 --> 00:03:24,039
M plus 1 times M plus N plus 1.

34
00:03:24,039 --> 00:03:30,000
So we just make that array and just fill it in from our argument.

35
00:03:30,000 --> 00:03:40,879
So in first the coefficients and then put the initial values of the slack variables along

36
00:03:40,879 --> 00:03:43,719
the diagonal here.

37
00:03:43,719 --> 00:03:45,319
Java arrays are initialized to zero.

38
00:03:45,319 --> 00:03:48,560
So we're not going to have to initialize all the others.

39
00:03:48,560 --> 00:03:55,920
And then you put the objective function and the writing side of the constraint equations

40
00:03:55,920 --> 00:03:56,920
into the tableau.

41
00:03:56,920 --> 00:03:58,240
Simple as that.

42
00:03:58,240 --> 00:04:02,920
So every one of those lines of that code is completely transparent.

43
00:04:02,920 --> 00:04:10,320
That's building the initial value of the tableau.

44
00:04:10,320 --> 00:04:19,400
So now we have to find the column that is going to, we're going to pivot on.

45
00:04:19,400 --> 00:04:25,160
So we're going to need to pivot on some entry in the array.

46
00:04:25,160 --> 00:04:29,560
It's going to have B and Rope B and column Q. And the rule we've given, which is called

47
00:04:29,560 --> 00:04:30,560
Blan's Rule.

48
00:04:30,560 --> 00:04:39,960
And remember, Blan does the one who wrote the classic scientific American article about beer.

49
00:04:39,960 --> 00:04:46,080
So we use Blan's Rule to just go through and look at the last row, which is the objective

50
00:04:46,080 --> 00:04:48,080
function and look for positive.

51
00:04:48,080 --> 00:04:51,680
So it does, it just goes through and looks for positive.

52
00:04:51,680 --> 00:04:54,079
If it finds positive, it returns that column.

53
00:04:54,079 --> 00:04:56,519
And that's what we're going to use.

54
00:04:56,519 --> 00:04:57,879
So it's the first one that's positive.

55
00:04:57,879 --> 00:05:01,400
If it's a lot of them are positive, it always returns the first one.

56
00:05:01,400 --> 00:05:03,879
And if it can't find one, then it's optimal.

57
00:05:03,879 --> 00:05:04,879
We can stop.

58
00:05:04,879 --> 00:05:07,240
So that's the entering column.

59
00:05:07,240 --> 00:05:11,000
We also have to find the entering row.

60
00:05:11,000 --> 00:05:15,120
And to find the entering row, we use the minimum ratio rule.

61
00:05:15,120 --> 00:05:21,480
So we just go through for all the possible rows.

62
00:05:21,480 --> 00:05:30,640
We just do this calculation involving the ratio between the current element and the element

63
00:05:30,640 --> 00:05:32,480
that we would pivot on.

64
00:05:32,480 --> 00:05:35,160
We only worry about the positive ones.

65
00:05:35,160 --> 00:05:37,720
And so it's just a little check.

66
00:05:37,720 --> 00:05:45,560
And again, if there's a tie, you choose the first one and a simple calculation going through

67
00:05:45,560 --> 00:05:50,560
all the entries to figure out which row gives you the minimum ratio and then return P.

68
00:05:50,560 --> 00:05:55,240
So now we have P and Q where we want to pivot.

69
00:05:55,240 --> 00:06:03,840
And so we have the values P and Q. And we just go through and do the pivot.

70
00:06:03,840 --> 00:06:10,439
And then this is the same calculation that you do for Gaussian elimination.

71
00:06:10,439 --> 00:06:14,840
Scale everything zero up on Q and then scale the row.

72
00:06:14,840 --> 00:06:18,319
And I'm not going to do the details of that calculation.

73
00:06:18,319 --> 00:06:23,000
That's what you get when you solve for one variable sub-tune into the other equations.

74
00:06:23,000 --> 00:06:30,240
It's the same calculation as for when you're solving simultaneous equations.

75
00:06:30,240 --> 00:06:32,240
And that's it.

76
00:06:32,240 --> 00:06:40,600
The simplex algorithm is just until you get a minus one return from bland, you just compute

77
00:06:40,600 --> 00:06:47,480
Q, you compute P and pivot and keep going until you're done.

78
00:06:47,480 --> 00:06:54,400
And then to look at your maximize value, I just look in the corner.

79
00:06:54,400 --> 00:06:58,400
Not too much code to implement D-bear bones, implementation of simplex.

80
00:06:58,400 --> 00:07:02,320
It's fairly straightforward algorithm.

81
00:07:02,320 --> 00:07:09,800
Now what's remarkable about it is remember in multiple dimensions, the number of points

82
00:07:09,800 --> 00:07:12,560
in the simplex could be high, could be exponential.

83
00:07:12,560 --> 00:07:17,879
But what's remarkable about the simplex algorithm is still today even somewhat mysterious.

84
00:07:17,879 --> 00:07:23,639
But certainly very mysterious for the first several decades that we've used is that it seems

85
00:07:23,639 --> 00:07:28,519
to find the answer after just the linear number of pivots.

86
00:07:28,519 --> 00:07:32,360
There's all those points out there on the simplex.

87
00:07:32,360 --> 00:07:37,280
But when Delta Airlines is scheduling its airline pirates or an oil company is looking

88
00:07:37,279 --> 00:07:42,159
for where to drill or wherever, our Walmart's trying to move its trucks around, these huge

89
00:07:42,159 --> 00:07:45,519
problems with millions of variables, it's linear time.

90
00:07:45,519 --> 00:07:48,599
It could be exponential time, but it's linear time.

91
00:07:48,599 --> 00:07:51,839
That's why it's been so effective.

92
00:07:51,839 --> 00:07:57,519
Now you could use other pivoting rules and there has certainly been a huge amount of research

93
00:07:57,519 --> 00:08:01,799
on trying to figure out exactly what to do.

94
00:08:01,799 --> 00:08:06,639
Nobody knows a pivot rule that'll guarantee that the algorithm is faster, it runs a polynomial

95
00:08:06,639 --> 00:08:08,199
time.

96
00:08:08,199 --> 00:08:14,199
Most of them are known to be exponential in the worst case, but again the real problems maybe

97
00:08:14,199 --> 00:08:16,719
aren't worst case.

98
00:08:16,719 --> 00:08:23,079
And certainly people have looked at all different ways to look at it to try to understand why

99
00:08:23,079 --> 00:08:27,079
the simplex algorithm usually takes some polynomial time.

100
00:08:27,079 --> 00:08:31,599
This is a recent paper on the topic.

101
00:08:31,600 --> 00:08:38,120
Now there are things that can happen during the execution of the algorithm that we've

102
00:08:38,120 --> 00:08:40,720
lost over.

103
00:08:40,720 --> 00:08:48,920
One thing is that you could get stuck in that you could have a new basis, you could make

104
00:08:48,920 --> 00:08:53,080
your substitution, but still wind up at the same extreme point.

105
00:08:53,080 --> 00:08:58,519
Like if a bunch of lines intersect at the same extreme point.

106
00:08:58,519 --> 00:09:01,160
So it's called stalling.

107
00:09:01,159 --> 00:09:06,600
That's not a good situation that you have to watch out for.

108
00:09:06,600 --> 00:09:11,719
And the other thing is when you have this kind of degeneracy you could get in a cycle

109
00:09:11,719 --> 00:09:17,839
where you go through different bases, always corresponding to the same extreme point.

110
00:09:17,839 --> 00:09:21,639
It doesn't seem to occur in practice.

111
00:09:21,639 --> 00:09:26,000
And the way that we implement it and the way that we implement it, just choosing the

112
00:09:26,000 --> 00:09:32,039
first one that's planned for rule is going to guarantee that at least you don't get caught

113
00:09:32,039 --> 00:09:34,200
in an infinite loop which would be bad.

114
00:09:34,200 --> 00:09:35,559
That doesn't seem to happen anyway.

115
00:09:35,559 --> 00:09:38,279
But it's a problem to think about.

116
00:09:38,279 --> 00:09:43,759
There's another thing that has to be thought about in order to actually try to use this

117
00:09:43,759 --> 00:09:47,240
to schedule airlines or whatever.

118
00:09:47,240 --> 00:09:52,960
So you certainly have to be careful to avoid stalling.

119
00:09:52,960 --> 00:10:01,759
One thing is that most of the equations tend to involve relatively fee variables in people

120
00:10:01,759 --> 00:10:05,360
who have experience with calculating systems of equations.

121
00:10:05,360 --> 00:10:13,080
Know that in some situations you can find yourself filled up with lots of non-zero values.

122
00:10:13,080 --> 00:10:21,400
So you want to take a rule that implements the thing with sparse matrix width.

123
00:10:21,400 --> 00:10:27,360
So your amount of space you take is proportional to the number of non-zero entries.

124
00:10:27,360 --> 00:10:33,920
So we look a couple of times at some data structures of that sort and that's certainly a consideration

125
00:10:33,920 --> 00:10:36,639
in simplex implementations.

126
00:10:36,639 --> 00:10:40,560
The other thing that we haven't talked about much in this course, but whenever you're

127
00:10:40,559 --> 00:10:46,079
working with floating point approximations of real numbers and you're making a lot of calculations,

128
00:10:46,079 --> 00:10:51,039
you have to make sure that you have control over the errors in the calculations.

129
00:10:51,039 --> 00:10:56,959
And scientific computation is certainly concerned with keeping control of that situation.

130
00:10:56,959 --> 00:11:02,399
It's something that we haven't talked about much in this course.

131
00:11:02,399 --> 00:11:10,439
And the other thing is that actually it could be the case that your constraints are infeasible

132
00:11:10,440 --> 00:11:12,760
there's no way to satisfy them.

133
00:11:12,760 --> 00:11:20,040
And it's a bad idea to run simplex for infeasible situations because we won't ever get to the optimum.

134
00:11:20,040 --> 00:11:27,040
So typically what we have to do in practice is run a different simplex algorithm

135
00:11:27,040 --> 00:11:30,760
on a transformed version of the problem.

136
00:11:30,760 --> 00:11:34,680
And there's really interesting theory behind that all.

137
00:11:34,680 --> 00:11:40,400
And it's used the same code to figure out an infeasibility, but it has something that has to be done.

138
00:11:40,399 --> 00:11:44,480
And the other possibilities are not enough constraints.

139
00:11:44,480 --> 00:11:51,840
So that you missed one of those half planes, you missed somewhere and then it gets infinite.

140
00:11:51,840 --> 00:11:56,000
And that's also a situation that you want to avoid.

141
00:11:56,000 --> 00:12:01,679
And with the code that we gave, that would be the case where you've planned for you to find a column

142
00:12:01,679 --> 00:12:04,639
and looking for a row and there's no row.

143
00:12:04,639 --> 00:12:07,199
So you have to check for that as well.

144
00:12:07,200 --> 00:12:13,759
And each one of these things is complicated enough that in this case we've probably say the best practices

145
00:12:13,759 --> 00:12:23,879
don't go in and try to implement simplex unless you're prepared to devote really substantial amount of time to it.

146
00:12:23,879 --> 00:12:32,759
And there's really no need to do that nowadays because basic implementations of simplex are readily available

147
00:12:32,759 --> 00:12:36,600
in many different programming environments.

148
00:12:36,600 --> 00:12:44,200
And routinely nowadays people solve LPs with millions of variables.

149
00:12:44,200 --> 00:12:49,639
The airline, and they're so easy to reduce practical problems to an AP.

150
00:12:49,639 --> 00:12:52,000
And LPs just throw in another constraint.

151
00:12:52,000 --> 00:13:00,200
Any constraints that you might have, certain pilot doesn't want to be scheduled early in the day or late in the day or union rules or whatever.

152
00:13:00,200 --> 00:13:08,920
You just put all these things in as constraints without worrying that much about it and then add more variables whatever you need to do.

153
00:13:08,920 --> 00:13:18,759
And then send it to an industrial strength solver and people nowadays solve LPs with huge numbers of variables.

154
00:13:18,759 --> 00:13:30,160
And not only are there solvers nowadays there's modeling languages that make it even easier to write down the LP.

155
00:13:30,159 --> 00:13:39,600
And so there's plenty of resources available to make use of the simplex algorithm nowadays.

156
00:13:39,600 --> 00:13:47,319
And it's important, this is a important quote from just a few years ago that's worth reviewing.

157
00:13:47,319 --> 00:13:55,600
So they have, this is so widely used, they have benchmarks on how well linear programming implementations do.

158
00:13:55,680 --> 00:14:05,320
So even in 1988, not all that far back, they have a benchmark that would have taken 82 years to solve.

159
00:14:05,320 --> 00:14:08,519
And even that's just a guess.

160
00:14:08,519 --> 00:14:13,279
And using the best linear programming algorithms the day would take 82 years.

161
00:14:13,279 --> 00:14:17,920
But just 15 years later, you could solve the same problem in one minute.

162
00:14:17,920 --> 00:14:21,680
That's a factor of 43 million.

163
00:14:21,679 --> 00:14:25,559
Of this factor of 1,000 was due to increased processor speed.

164
00:14:25,559 --> 00:14:29,359
So 15 years we have computers that are a thousand times faster.

165
00:14:29,359 --> 00:14:34,159
But 43,000 is due to algorithm improvements.

166
00:14:34,159 --> 00:14:37,279
And there's been more even since then.

167
00:14:37,279 --> 00:14:46,399
So the importance of knowing good algorithms and working with good algorithms is unquestioned in this case.

168
00:14:46,399 --> 00:14:52,959
And of course, this algorithm is still being heavily, heavily studied.

169
00:14:52,959 --> 00:15:03,079
So starting with Danzig's simplex algorithm and other basic knowledge about the algorithm and about linear programming.

170
00:15:03,079 --> 00:15:09,840
That was applied in practice in 1948.

171
00:15:09,840 --> 00:15:19,440
And it's basic idea of linear programming actually precedes Danzig and actually went up with the Nobel Prize.

172
00:15:19,440 --> 00:15:29,000
But what's interesting is there was, the algorithm was so good, there was actually not much development for about three decades.

173
00:15:29,000 --> 00:15:38,759
But then an amazing surprising result, Kachian proved that you could solve linear programming problems

174
00:15:38,759 --> 00:15:40,200
in polynomial time.

175
00:15:40,200 --> 00:15:42,600
That was quite a shock at the time.

176
00:15:42,600 --> 00:15:47,480
And we'll talk more about that in the last lecture of the course.

177
00:15:47,480 --> 00:15:55,000
And then since then, knowing that there are algorithms that potentially could beat simplex,

178
00:15:55,000 --> 00:15:58,840
people have actually developed algorithms that do beat simplex.

179
00:15:58,840 --> 00:16:05,799
And so there's still a great deal of research going on on the simplex,

180
00:16:05,799 --> 00:16:09,959
on implementations of linear programming solvers.

181
00:16:09,959 --> 00:16:14,359
That's a quick outline of what it means to implement and solve linear programming.

