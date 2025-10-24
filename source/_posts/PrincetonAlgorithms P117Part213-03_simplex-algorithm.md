---
title: PrincetonAlgorithms P117Part213 03_simplex Algorithm
---

1
00:00:00,000 --> 00:00:08,720
Now we'll look at an algorithm for solving the linear programming problem and we'll use

2
00:00:08,720 --> 00:00:11,980
the brewers problem as an example.

3
00:00:11,980 --> 00:00:20,300
This algorithm was developed by George Danzig right after World War II and it was in response

4
00:00:20,300 --> 00:00:29,140
to a very important practical problem which was the logistics of the Berlin airlift.

5
00:00:29,140 --> 00:00:38,939
And again scarce resources in particular constraints and you want to maximize an objective function

6
00:00:38,939 --> 00:00:45,140
this algorithm that was developed by Danzig again is very, very widely used today and certainly

7
00:00:45,140 --> 00:00:51,179
one of the top ten scientific algorithms ever I'd say.

8
00:00:51,179 --> 00:00:54,100
So it's a very simple generic idea.

9
00:00:54,100 --> 00:00:59,260
We're going to start at some extreme point and then we're going to perform this operation

10
00:00:59,260 --> 00:01:07,700
called pivoting that moves us from one extreme point to an adjacent one that at least doesn't

11
00:01:07,700 --> 00:01:13,859
increase the objective function and we just keep going until we get stuck where it's an

12
00:01:13,859 --> 00:01:22,219
extreme point that is not better than any of its adjacent ones and then we've got an optimal

13
00:01:22,219 --> 00:01:24,140
solution.

14
00:01:24,140 --> 00:01:29,659
So in our brewers problem we start at the origin and just simply move from one extreme point

15
00:01:29,659 --> 00:01:34,900
to the other until we find an optimal solution.

16
00:01:34,900 --> 00:01:43,700
And what's remarkable is that really linear algebra sets us up to do this solution.

17
00:01:43,700 --> 00:01:47,739
You're familiar with solving simultaneous equations.

18
00:01:47,739 --> 00:01:51,659
This uses the same basic idea.

19
00:01:51,659 --> 00:01:59,819
The difference is that we've got many more unknowns and equations usually certainly not

20
00:01:59,819 --> 00:02:07,420
equal number and so we have to take care of that situation and also we have the objective

21
00:02:07,420 --> 00:02:10,300
function playing a role.

22
00:02:10,300 --> 00:02:18,819
So but still the basic idea is to get it down so to solving simultaneous equations.

23
00:02:18,819 --> 00:02:21,099
So there's first the idea of a basis.

24
00:02:21,099 --> 00:02:24,539
That's just the subset of the variables.

25
00:02:24,539 --> 00:02:33,259
And so we pick a subset of the variables and then we're always going to be working with

26
00:02:33,259 --> 00:02:37,979
something called a basic feasible solution.

27
00:02:37,979 --> 00:02:43,859
So the idea is you have a subset of the variables.

28
00:02:43,860 --> 00:02:51,780
So that's M in this case there's three variables in the basis.

29
00:02:51,780 --> 00:02:55,900
In the idea is you set the other variables to zero.

30
00:02:55,900 --> 00:03:09,980
So now you've got an M equations in M unknowns because you just set in my set of them to zero.

31
00:03:09,979 --> 00:03:15,539
And so that gives you values for your basis.

32
00:03:15,539 --> 00:03:25,500
And the idea is that a basic feasible solution corresponds to an extreme point on the simplex.

33
00:03:25,500 --> 00:03:33,739
So for example, if all the slack variables are in the basis, then we set the others to zero.

34
00:03:33,739 --> 00:03:36,939
We set A and B to zero.

35
00:03:36,939 --> 00:03:38,219
And that's what that says.

36
00:03:38,219 --> 00:03:43,699
That's the value of A and B when the slack variables are all in the basis.

37
00:03:43,699 --> 00:03:53,460
If B is in the basis and SH and SM are in the basis, then B is zero.

38
00:03:53,460 --> 00:03:59,579
And then if you solve for the three equations you get that A equals 32 and so forth.

39
00:03:59,580 --> 00:04:11,140
So basic feasible solution is if you have M constraints, it's a subset of size M.

40
00:04:11,140 --> 00:04:17,900
So you have an M by M system equation to solve assuming the others to be zero.

41
00:04:17,900 --> 00:04:22,780
And so the algorithm, so it's called the simplex algorithm because this thing that's the intersectional

42
00:04:22,779 --> 00:04:25,459
half-planes is called a simplex.

43
00:04:25,459 --> 00:04:29,659
And it's going to move along the simplex.

44
00:04:29,659 --> 00:04:33,139
So basic feasible solutions are extreme points on the simplex.

45
00:04:33,139 --> 00:04:38,939
And the simplex algorithm is going to move along from one point to another.

46
00:04:38,939 --> 00:04:44,539
Now there's some solutions that are infeasible that are not on the simplex.

47
00:04:44,539 --> 00:04:48,659
If it's unique and feasible, it's a basic feasible solution.

48
00:04:48,660 --> 00:04:56,340
It could be like if you put A, B and S sub H to be in your basis, you set the other ones to zero.

49
00:04:56,340 --> 00:04:59,620
It's not feasible, it's outside of the simplex.

50
00:04:59,620 --> 00:05:03,020
So we want to consider those.

51
00:05:03,020 --> 00:05:11,260
Okay, so to get things started, what we need to do is initialize.

52
00:05:11,260 --> 00:05:16,900
And I'll initialize in that case at the origin when A and B are equal to zero.

53
00:05:16,899 --> 00:05:21,500
And these three slack variables are at the basis.

54
00:05:21,500 --> 00:05:24,899
And then the solution is really easy in that case.

55
00:05:24,899 --> 00:05:26,620
Here's our equations.

56
00:05:26,620 --> 00:05:29,859
We set A and B to zero so that cancels out all that stuff.

57
00:05:29,859 --> 00:05:36,979
So that tells us the values of SC, SH, and SM in that case.

58
00:05:36,979 --> 00:05:42,739
So that's easy to solve in that case.

59
00:05:42,740 --> 00:05:51,460
So one basic variable per row, certain those as the basis, that, and so they're non-basic variables to zero.

60
00:05:51,460 --> 00:05:52,699
Solve three equations.

61
00:05:52,699 --> 00:05:55,660
And if you get the answer, you don't have to do any work for that.

62
00:05:55,660 --> 00:05:57,220
So that's how we initialize things.

63
00:05:57,220 --> 00:06:01,780
And you can initialize right from the constraints of the problem.

64
00:06:01,780 --> 00:06:12,699
All that's in here is our recipe for AL and our recipe for beer and our profit margins for the two different drinks.

65
00:06:13,699 --> 00:06:16,699
Okay, so now I start to get interesting.

66
00:06:16,699 --> 00:06:19,699
We're going to perform an operation called a pivot.

67
00:06:19,699 --> 00:06:24,699
And we'll talk about how to choose the pivot in a minute.

68
00:06:24,699 --> 00:06:31,699
So right now, let's say we're going to choose the pivot on this entry right here.

69
00:06:31,699 --> 00:06:38,699
And what that means is what we're going to do is just as you do in Gaussian elimination,

70
00:06:39,699 --> 00:06:53,699
you're going to pick this element and then you're going to solve for that variable and then substitute that solution into all the other equations so that these entries become zero.

71
00:06:53,699 --> 00:07:02,699
So we solve for B equals, we take 480 minus 5A minus SC divided by 15.

72
00:07:02,699 --> 00:07:08,699
So the equation says that's what B is, substitute it in these other equations.

73
00:07:08,699 --> 00:07:15,699
And that puts B into the basis and takes some other variable out.

74
00:07:15,699 --> 00:07:23,699
And the story just might think about how do you figure out which variable it replaces.

75
00:07:23,699 --> 00:07:28,699
And if you do the math here, here's what the system of equations look like.

76
00:07:28,699 --> 00:07:34,699
So that's just substituting B into the other equations, including the objective function.

77
00:07:34,699 --> 00:07:39,699
And now our basis is BSH and SM.

78
00:07:39,699 --> 00:07:43,699
A and SC are zero.

79
00:07:43,699 --> 00:07:48,699
And our objective function says that Z equals 36, 736.

80
00:07:49,699 --> 00:07:52,699
So that's called a pivot.

81
00:07:52,699 --> 00:08:01,699
Pick a variable, substitute the other equations, puts it into the basis and makes the other entries and it's column zero.

82
00:08:01,699 --> 00:08:05,699
So why choose that particular variable?

83
00:08:05,699 --> 00:08:13,699
Well, look at the objective function and its coefficient is positive.

84
00:08:13,699 --> 00:08:24,699
So if we B's sitting at zero, if we increase it to some positive, remember we're going to increase our objective function.

85
00:08:24,699 --> 00:08:30,699
So as long as the coefficient is objective function is positive, that tells us the column.

86
00:08:30,699 --> 00:08:33,700
We could also do it on A in this case.

87
00:08:33,700 --> 00:08:36,700
And then why that row?

88
00:08:37,700 --> 00:08:46,700
Well, you have to make sure that the right-hand side always stays bigger than zero.

89
00:08:46,700 --> 00:08:52,700
And so what's used is to choose the row is the minimum ratio rule.

90
00:08:52,700 --> 00:09:04,700
So if you take the right-hand side over the coefficient, you want the one that's smallest, because when you do the substitution, that'll make sure that the right-hand side is positive.

91
00:09:04,700 --> 00:09:07,700
So that's the choice of the pivot.

92
00:09:07,700 --> 00:09:11,700
So now we're in this situation and we just do the same thing.

93
00:09:11,700 --> 00:09:16,700
So we want to look for something that's got a positive coefficient in the objective function.

94
00:09:16,700 --> 00:09:19,700
And then we want to do the minimum ratio rule.

95
00:09:19,700 --> 00:09:25,700
And that turns out to be that we pivot on column one, row two.

96
00:09:25,700 --> 00:09:31,700
That's 32 plus 4, 15th SC minus SH.

97
00:09:31,700 --> 00:09:34,700
And I divided by 8, there's just 3, 8.

98
00:09:34,700 --> 00:09:37,700
Substitute that into everything.

99
00:09:37,700 --> 00:09:43,700
And that's going to eliminate A everywhere else in it'll put.

100
00:09:43,700 --> 00:09:50,700
See, since we're substituting for A, A comes out of the basis in the objective function and something else will go in.

101
00:09:50,700 --> 00:09:54,700
And again, think about what it is that goes in.

102
00:09:54,700 --> 00:09:59,700
And then we wind up in this situation here.

103
00:09:59,700 --> 00:10:03,700
So that's again just doing the math.

104
00:10:03,700 --> 00:10:07,700
Now it's interesting about having done the math here.

105
00:10:07,700 --> 00:10:15,700
Now we don't have any positive coefficients in the objective function.

106
00:10:15,700 --> 00:10:20,700
So these two variables are zero now.

107
00:10:20,700 --> 00:10:27,700
And if we take them out of the basis and get a bigger value, that's going to be no good.

108
00:10:27,700 --> 00:10:34,700
So we're stuck and that's the same as saying that's the time that we stop pivoting.

109
00:10:34,700 --> 00:10:41,700
If we go in any direction from where we are, we're not going to do as well.

110
00:10:41,700 --> 00:10:49,700
And that is optimal because first of all, any solution is going to satisfy the current system of equations.

111
00:10:49,700 --> 00:10:59,700
So in particular, whatever values you give, S, E, and S, H, it's got to satisfy this equation.

112
00:10:59,700 --> 00:11:05,700
But since they're positive, you can't do better than 800.

113
00:11:05,700 --> 00:11:10,700
So you might as well be happy when they're zero, which is where they are.

114
00:11:10,700 --> 00:11:13,700
So it's as simple as that.

115
00:11:13,700 --> 00:11:17,700
So the current value has 800, so it's optimal. You're not going to do better.

116
00:11:17,700 --> 00:11:21,700
So that's a sketch of the simplex algorithm.

117
00:11:21,700 --> 00:11:26,700
It's simply a matter of choosing a pivot element and then pivoting.

118
00:11:26,700 --> 00:11:30,700
And then keep going until you can't choose a pivot element.

119
00:11:30,700 --> 00:11:37,700
It's a really remarkably simple when you think about it.

120
00:11:37,700 --> 00:11:41,700
That's the simplex algorithm for linear programming.

121
00:11:47,700 --> 00:11:50,700
You

