---
title: PrincetonAlgorithms P121Part214 03_search Problems
---

1
00:00:00,000 --> 00:00:10,480
To get started, we're going to introduce the idea of a search problem which encompasses

2
00:00:10,480 --> 00:00:14,839
many of the fundamental problems that we want to try to solve.

3
00:00:14,839 --> 00:00:18,240
So here's a familiar problem from secondary school.

4
00:00:18,240 --> 00:00:20,440
We'll call it L-solve.

5
00:00:20,440 --> 00:00:27,039
So the problem is given a system of linear equations find a solution.

6
00:00:27,039 --> 00:00:33,839
So we've got simultaneous equations involving the variables x1, x0, x1, and x2.

7
00:00:33,839 --> 00:00:36,479
And what we need to do is find a solution.

8
00:00:36,479 --> 00:00:43,320
In this case, these three equations have the solution x0 equals minus 1, x1 equals 2,

9
00:00:43,320 --> 00:00:45,239
and x2 equals 2.

10
00:00:45,239 --> 00:00:52,960
If you plug those values in for x0, x1, and x2 in those equations, you'll find that they

11
00:00:52,960 --> 00:00:55,679
satisfy those equations.

12
00:00:55,679 --> 00:01:00,240
And in secondary school, you learn how to solve those with Gaussian elimination or

13
00:01:00,240 --> 00:01:02,759
eliminate variable at a time.

14
00:01:02,759 --> 00:01:05,359
So that's L-solve.

15
00:01:05,359 --> 00:01:12,359
Now last time we talked about linear programming, and that's the similar problem that you

16
00:01:12,359 --> 00:01:19,560
could almost cast as the following, given a system of linear inequality find a solution.

17
00:01:19,560 --> 00:01:25,400
Actually for LP, we do a little bit more, as we're also trying to optimize.

18
00:01:25,400 --> 00:01:30,040
But this is a fine characterization or way to formulate the problem.

19
00:01:30,040 --> 00:01:33,159
So now we just have inequalities.

20
00:01:33,159 --> 00:01:37,680
And again, there's a solution.

21
00:01:37,680 --> 00:01:41,280
Actually the first part of the computational burden in linear programming is to know whether

22
00:01:41,280 --> 00:01:46,120
there's a solution or not before you can even apply this in Plex method.

23
00:01:46,120 --> 00:01:51,200
So in this case, there's some equations on the left and on the right there's values

24
00:01:51,200 --> 00:01:54,960
that if you plug those values into those equations, they satisfy it.

25
00:01:54,960 --> 00:02:01,600
So that's linear inequality, satisfied building.

26
00:02:01,600 --> 00:02:03,480
Here's another one.

27
00:02:03,480 --> 00:02:08,560
Suppose that, again, we have inequalities, but suppose that we insist that the variables

28
00:02:08,560 --> 00:02:11,280
be 0 or 1.

29
00:02:11,280 --> 00:02:18,840
And actually this is a special case of linear programming that comes up to be useful as a model

30
00:02:18,840 --> 00:02:27,520
in many situations where the variables models, say what's going on in the electric circuit

31
00:02:27,520 --> 00:02:32,439
or many other situations where we just want to be 0 or 1.

32
00:02:32,439 --> 00:02:36,599
And we had an example of this when we were talking about bipartite matching reduction

33
00:02:36,599 --> 00:02:40,520
to linear programming.

34
00:02:40,520 --> 00:02:42,000
So that's in this case.

35
00:02:42,000 --> 00:02:49,879
You take those equations as inequalities and you put in those values and turn up next

36
00:02:49,879 --> 00:02:56,000
one plus x2 is bigger than one, x2 is bigger than one, but some of the three elements less

37
00:02:56,000 --> 00:03:00,280
than or equal to two, so that's a solution.

38
00:03:00,280 --> 00:03:02,760
And this is just one more.

39
00:03:02,760 --> 00:03:04,800
So those are all called satisfiability problems.

40
00:03:04,800 --> 00:03:08,879
You have a bunch of equations with variables and you have values of the variables.

41
00:03:08,879 --> 00:03:12,519
You want to know if the variable satisfied the equation.

42
00:03:12,519 --> 00:03:20,120
And the simplest satisfiability problem is the one that just uses Boolean values, given

43
00:03:20,120 --> 00:03:25,759
a system of Boolean equations where the variables are either true or false and then the equations

44
00:03:25,759 --> 00:03:32,639
are just made up of a OR and a connective in the pronunciation and you're checking whether

45
00:03:32,639 --> 00:03:40,559
a bunch of unexpression involving truth values is true or false.

46
00:03:40,559 --> 00:03:42,199
And the prime means not.

47
00:03:42,199 --> 00:03:48,719
So not x1 or not x2 and x0 or x2 equals true.

48
00:03:48,719 --> 00:03:54,479
That's going to be true in that case.

49
00:03:54,479 --> 00:03:59,079
That's going to be satisfied in that case because x1 equals false, so not x1 is true.

50
00:03:59,080 --> 00:04:03,400
So the first term is true here.

51
00:04:03,400 --> 00:04:07,240
Not x1 is true, so that or whatever is true.

52
00:04:07,240 --> 00:04:12,920
And then this term here, x0 or x2 is true, so both those terms are true and we're

53
00:04:12,920 --> 00:04:14,800
ending in, so it's true.

54
00:04:14,800 --> 00:04:18,520
And you should go through and check each of the equations to make sure that those truth

55
00:04:18,520 --> 00:04:21,199
values satisfy those equations.

56
00:04:21,199 --> 00:04:22,759
So those are fundamental problems.

57
00:04:22,759 --> 00:04:25,080
They're very similar in nature.

58
00:04:25,079 --> 00:04:29,519
And there's lots and lots of applications where people want to find efficient solutions

59
00:04:29,519 --> 00:04:32,159
for these problems.

60
00:04:32,159 --> 00:04:35,399
So the question is how do these things fit into our theory?

61
00:04:35,399 --> 00:04:40,399
Which of these problems have algorithms that are guaranteed to run in polynomial time?

62
00:04:40,399 --> 00:04:41,399
Look at the problems.

63
00:04:41,399 --> 00:04:43,839
They didn't look really all that much different.

64
00:04:43,839 --> 00:04:47,959
Well, for L-solve, we have Gaussian elimination and other ways to solve.

65
00:04:47,959 --> 00:04:53,519
But Gaussian elimination works in M-cube time or into three half-time or in size of

66
00:04:53,519 --> 00:04:55,719
the input.

67
00:04:55,719 --> 00:04:57,199
But what about the other ones?

68
00:04:57,199 --> 00:05:00,279
Do they have polynomial time algorithms?

69
00:05:00,279 --> 00:05:04,839
Well, LP, I mentioned briefly at the end of the last lecture.

70
00:05:04,839 --> 00:05:09,599
Yeah, it was proven, but actually it was open for decades.

71
00:05:09,599 --> 00:05:16,639
It was until Cachins result where we knew that there existed a guaranteed polynomial time

72
00:05:16,639 --> 00:05:19,079
algorithm for linear programming.

73
00:05:19,079 --> 00:05:24,560
And then it was decades later before those algorithms were brought to the point where

74
00:05:24,560 --> 00:05:27,359
they could compete with simplex in practice.

75
00:05:27,359 --> 00:05:28,359
But it happened.

76
00:05:28,359 --> 00:05:30,359
That was a problem.

77
00:05:30,359 --> 00:05:34,120
We didn't know whether there was a polynomial time algorithm for many, many years, even though

78
00:05:34,120 --> 00:05:36,479
people were trying to find it.

79
00:05:36,479 --> 00:05:43,159
But with articulating this division in the theory, helped with the idea of let's find a

80
00:05:43,159 --> 00:05:46,560
polynomial time algorithm and someone did.

81
00:05:46,560 --> 00:05:54,680
And so that was certainly difficult to bring that about, but it happened.

82
00:05:54,680 --> 00:05:58,639
And then you might say, well, that gives some hope that we could do others.

83
00:05:58,639 --> 00:06:04,480
But actually, for integer linear programming, you just take linear programming and restrict

84
00:06:04,480 --> 00:06:07,279
the variables as there are one values.

85
00:06:07,279 --> 00:06:10,240
Or Boolean-satisfiability.

86
00:06:10,240 --> 00:06:12,279
Nobody knows the polynomial time algorithm.

87
00:06:12,279 --> 00:06:17,819
And in fact, few people believe that a polynomial time algorithm, guaranteed polynomial time

88
00:06:17,819 --> 00:06:21,119
algorithm, exists for these problems.

89
00:06:21,119 --> 00:06:23,599
But we still don't know for sure.

90
00:06:23,599 --> 00:06:27,519
That's the topic of today's lecture.

91
00:06:27,519 --> 00:06:32,039
Now all of these things are examples of search problems.

92
00:06:32,039 --> 00:06:38,000
And we characterize them this way because it's an intuitive way to describe weedy all the

93
00:06:38,000 --> 00:06:41,799
problems that we want to solve.

94
00:06:41,800 --> 00:06:48,840
So the idea is that the problem has lots of problem instances its inputs.

95
00:06:48,840 --> 00:06:55,040
And what you want to do in a search problem is find a solution or report that there's

96
00:06:55,040 --> 00:06:58,199
no solution.

97
00:06:58,199 --> 00:07:00,519
So there's just one requirement.

98
00:07:00,519 --> 00:07:07,879
And the requirement that distinguishes search problems from just any problem is that we

99
00:07:07,879 --> 00:07:14,600
have to be able to efficiently check that a given solution is in fact a solution.

100
00:07:14,600 --> 00:07:20,439
Say that efficiently in this lecture means guarantee polynomial time in the size of the

101
00:07:20,439 --> 00:07:22,079
input.

102
00:07:22,079 --> 00:07:28,719
And for the problems that I just gave, there definitely search problems because just

103
00:07:28,719 --> 00:07:30,560
take a look at what they are.

104
00:07:30,560 --> 00:07:38,759
So for L solve, the problem is input instances are just systems of linear equations.

105
00:07:38,759 --> 00:07:45,199
So matrix of n squared numbers, n times n plus 1 numbers.

106
00:07:45,199 --> 00:07:50,199
And solution is just three numbers and check the solution just plug in the values to verify

107
00:07:50,199 --> 00:07:51,720
each equation.

108
00:07:51,720 --> 00:07:56,120
So that's certainly polynomial time in the size of the input.

109
00:07:56,120 --> 00:07:59,600
So L solve is a search problem.

110
00:07:59,600 --> 00:08:03,320
And similarly LP is a search problem.

111
00:08:03,320 --> 00:08:06,560
LP characterizes in this way.

112
00:08:06,560 --> 00:08:11,960
Got a system of linear inequalities and you're given a solution, you can efficiently check

113
00:08:11,960 --> 00:08:17,200
that that solution satisfy those inequalities.

114
00:08:17,200 --> 00:08:21,120
These satisfiability problems are all search problems.

115
00:08:21,120 --> 00:08:24,160
In a linear probing you have the inequalities.

116
00:08:24,160 --> 00:08:26,240
You get values that are zero or one.

117
00:08:26,240 --> 00:08:28,800
You can plug them in the equations and check.

118
00:08:28,800 --> 00:08:30,639
That's what characterizes a search problem.

119
00:08:30,639 --> 00:08:37,080
It's got a small solution that we can efficiently check whether it's a solution.

120
00:08:37,080 --> 00:08:39,120
And satisfiability the same.

121
00:08:39,120 --> 00:08:42,560
You got the truth values, you got the equations.

122
00:08:42,560 --> 00:08:47,159
And then you plug in values and verify each equation.

123
00:08:47,159 --> 00:08:53,600
Now what we're doing is distinguishing search problems from other kinds of problems that

124
00:08:53,600 --> 00:08:54,600
are very similar.

125
00:08:54,600 --> 00:08:58,120
And actually the theory works for these other kinds of problems.

126
00:08:58,120 --> 00:09:05,920
One kind is called a decision problem where it's just problems that have a yes-no answer.

127
00:09:05,920 --> 00:09:11,639
And another one is optimization problems which are problems is where you want to find the

128
00:09:11,639 --> 00:09:17,080
best solution in some sense like linear probing or gaming or sure as pass.

129
00:09:17,080 --> 00:09:23,440
But the theory that we're about to lay out all the major conclusions hold for any one of

130
00:09:23,440 --> 00:09:30,920
these classes of problems is just that it's best to fix on one to make sure that there's

131
00:09:30,920 --> 00:09:34,600
no holes in any of the statements that we make.

132
00:09:34,600 --> 00:09:38,280
So we're doing that at the outset with search problems.

133
00:09:38,280 --> 00:09:48,600
Now you can imagine, so if one way to check that if you have a problem that finds a solution

134
00:09:48,600 --> 00:09:55,300
to a linear programming problem, you can specify it in such a way that it's a decision

135
00:09:55,300 --> 00:09:56,300
problem.

136
00:09:56,300 --> 00:10:03,279
Is there a solution that satisfies another given inequality linear combination of the values

137
00:10:03,279 --> 00:10:04,440
less than a certain value?

138
00:10:04,440 --> 00:10:12,040
And then you can use binary search or something to do the final maximization for linear programming

139
00:10:12,040 --> 00:10:13,040
and so forth.

140
00:10:13,040 --> 00:10:16,240
There's all kinds of ways to move among these problems.

141
00:10:16,240 --> 00:10:19,440
So we're going to focus on search problems.

142
00:10:19,440 --> 00:10:22,639
So here's another one factor.

143
00:10:22,639 --> 00:10:30,399
So given an integer finding on trivial factor, it might take a lot of computation to try

144
00:10:30,399 --> 00:10:32,680
to find a factor.

145
00:10:32,680 --> 00:10:36,680
But if somebody gives you a factor, then all you have to do is long divide.

146
00:10:36,680 --> 00:10:41,480
So again, factor is a search problem.

147
00:10:41,480 --> 00:10:46,200
So those are some examples of the basic types of problems that we're going to consider.

148
00:10:46,200 --> 00:10:48,200
When we investigate interactability.

