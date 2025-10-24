---
title: PrincetonAlgorithms P119Part213 05_linear Programming Reductions
---

1
00:00:00,000 --> 00:00:12,560
So we'll finish off by taking a brief look at reductions to linear programming problems.

2
00:00:12,560 --> 00:00:21,000
So first of all, the idea of reducing to the standard form.

3
00:00:21,000 --> 00:00:25,719
When we first posed the brews problem, we did it in terms of inequalities and there's

4
00:00:25,719 --> 00:00:32,200
all sorts of different versions that you might imagine are more convenient for different

5
00:00:32,200 --> 00:00:35,679
types of problems with fewer restrictions.

6
00:00:35,679 --> 00:00:42,759
So as we've talked about, there's easy ways to deal with each of them.

7
00:00:42,759 --> 00:00:48,280
The standard form is not that different than the types of things people might want to

8
00:00:48,280 --> 00:00:49,280
do.

9
00:00:49,280 --> 00:00:52,039
So one thing is maybe somebody wants to minimize.

10
00:00:52,039 --> 00:00:57,719
So if somebody wants to minimize, you replace that minimization with the standard forms

11
00:00:57,719 --> 00:01:00,519
is maximize, so you just negate everything.

12
00:01:00,519 --> 00:01:03,119
So that's equivalent.

13
00:01:03,119 --> 00:01:07,920
If you have inequalities, add a slack variable.

14
00:01:07,920 --> 00:01:08,920
Subtract the slack variable.

15
00:01:08,920 --> 00:01:15,560
It's got to be positive that converts a greater than or equal constraint to an equality just

16
00:01:15,560 --> 00:01:18,159
by adding a variable.

17
00:01:18,159 --> 00:01:23,560
And if you have variables that are supposed to be unrestricted, just replace it as a difference

18
00:01:23,560 --> 00:01:27,959
between two variables that both have to be positive.

19
00:01:27,959 --> 00:01:38,519
So those are just examples of taking a non-standard form and reducing it to a problem that's in

20
00:01:38,519 --> 00:01:41,120
the standard form.

21
00:01:41,120 --> 00:01:49,240
So for any particular problem that we might want to come up, then we can use these less

22
00:01:49,240 --> 00:01:57,560
restrictive non-standard knowing that it's easy for the LP solver to do the reduction from

23
00:01:57,560 --> 00:02:00,800
our non-standard form to the standard form.

24
00:02:00,800 --> 00:02:06,240
And certainly that's something that the solver can do for us.

25
00:02:06,239 --> 00:02:12,039
So I didn't mention at the beginning as to why is it called linear programming.

26
00:02:12,039 --> 00:02:17,199
We're used to programming, let's say, right Java code to solve a problem.

27
00:02:17,199 --> 00:02:23,359
But after you remember, this is 1947, that's actually well before computers came into use.

28
00:02:23,359 --> 00:02:27,479
And people were writing programs to do this stuff.

29
00:02:27,479 --> 00:02:32,800
Actually for smaller variables, you can basically solve it by hand.

30
00:02:32,800 --> 00:02:42,719
So what they meant by programming was more what there was another term used called planning.

31
00:02:42,719 --> 00:02:46,920
And so that was more, take your problem and put it into a form that we can solve.

32
00:02:46,920 --> 00:02:52,760
Nowadays we call that reduction to a linear programming problem.

33
00:02:52,760 --> 00:02:59,640
So it's the process of formulating your problem as a linear programming problem.

34
00:02:59,639 --> 00:03:06,679
And so again, it's reduction, solution to the linear program gives the solution to your problem.

35
00:03:06,679 --> 00:03:07,679
So what do you have to do?

36
00:03:07,679 --> 00:03:10,079
You have to identify what are the variables.

37
00:03:10,079 --> 00:03:13,839
You have to define the constraints, the inequalities and equations.

38
00:03:13,839 --> 00:03:16,639
And you have to identify and define an objective function.

39
00:03:16,639 --> 00:03:18,239
That's all you have to do though.

40
00:03:18,239 --> 00:03:24,879
Once you have those things, then pretty much you have a linear programming problem.

41
00:03:24,879 --> 00:03:28,839
And you do have to convert the standard form, but usually you've encountered a software

42
00:03:28,840 --> 00:03:31,200
to go ahead and do that.

43
00:03:31,200 --> 00:03:37,640
So let's look at some examples that I've said reduced to linear programming problems

44
00:03:37,640 --> 00:03:40,800
or can be modeled as linear programming problems.

45
00:03:40,800 --> 00:03:44,280
And we'll just use the modern term of reduction.

46
00:03:44,280 --> 00:03:48,280
So for example, Max-flow problem.

47
00:03:48,280 --> 00:03:52,039
So this is the Max-flow problem that we consider.

48
00:03:52,039 --> 00:03:57,159
And its input is a weighted diagram.

49
00:03:57,159 --> 00:04:04,560
And there's a source vertex s and a sink vertex t.

50
00:04:04,560 --> 00:04:09,199
And there's the weights indicate capacities.

51
00:04:09,199 --> 00:04:14,399
And what we're supposed to find out is what's the maximum flow from s to t.

52
00:04:14,399 --> 00:04:17,480
It doesn't seem to be that much related to linear programming,

53
00:04:17,480 --> 00:04:21,959
but if you just look at the idea, well, what are the variables going to be?

54
00:04:21,959 --> 00:04:27,879
There's going to be in what are the constraints going to be, in what are the variables?

55
00:04:27,879 --> 00:04:34,399
Well, the variables are the amount of flow along each edge.

56
00:04:34,399 --> 00:04:41,599
In the constraints, there's got to be positive flow and it's constrained by the capacity.

57
00:04:41,599 --> 00:04:46,039
So it's just a mathematical formulation of the problem.

58
00:04:46,039 --> 00:04:50,639
From 0 to 1, you have to have flow this between 0 and 1.

59
00:04:50,639 --> 00:04:54,839
And from 0 to 2, you have to have flow this between 0 and 3 and like that.

60
00:04:54,839 --> 00:04:58,079
So that's all saying that's what the capacity constraints are.

61
00:04:58,079 --> 00:05:05,439
And the other thing about the flow is that we said the in-flow has to equal the outflow at every vertex.

62
00:05:05,439 --> 00:05:10,599
So we have a variable corresponding to the flow in each edge.

63
00:05:10,599 --> 00:05:14,680
And then we can just express the flow conservation constraints.

64
00:05:14,680 --> 00:05:20,599
The amount that comes into vertex 1, which is x0, 1, has to equal the amount that comes out.

65
00:05:20,600 --> 00:05:23,640
Which is x1, 3, plus 1, 4.

66
00:05:23,640 --> 00:05:29,320
And you have one of those constraints for each one of the vertices.

67
00:05:29,320 --> 00:05:30,879
And then what's the objective function?

68
00:05:30,879 --> 00:05:40,040
We want to maximize the amount of flow that goes into number 5, which is x3, 5, plus x4, 5.

69
00:05:40,040 --> 00:05:43,640
That's an LP formulation of the max flow problem.

70
00:05:43,639 --> 00:05:54,599
It really illustrates how really easy it is to represent a maximization problem as an LP problem.

71
00:05:54,599 --> 00:05:57,719
And again, you have an LP solver.

72
00:05:57,719 --> 00:06:02,039
You just put in those constraints.

73
00:06:02,039 --> 00:06:03,519
So the variables are positive.

74
00:06:03,519 --> 00:06:07,240
That's just all inequality and a couple of equations.

75
00:06:07,240 --> 00:06:11,000
Then the software converts it to the standard form and gives you the solution.

76
00:06:11,000 --> 00:06:22,439
Now, it might take longer than our specialized algorithm that we looked at based on searching in the graph and so forth.

77
00:06:22,439 --> 00:06:27,639
Which is a very wonderful algorithm and very useful in lots of applications.

78
00:06:27,639 --> 00:06:40,399
But the advantage of the LP formulation is that if the problem gets more complicated, say we also want to insist maybe this cost the sign with each flow.

79
00:06:40,399 --> 00:06:42,560
And so we want to maximize it.

80
00:06:42,560 --> 00:06:51,199
But we also want to keep the cost under control or any kind of specialized constraint that might come up in the LP formulation.

81
00:06:51,199 --> 00:06:55,039
You just add those constraints in our other formulation.

82
00:06:55,039 --> 00:06:58,279
It might completely ruin our approach to the problem.

83
00:06:58,279 --> 00:07:03,039
That's the advantage of LP and why it's so widely used.

84
00:07:03,039 --> 00:07:04,039
Here's another example.

85
00:07:04,040 --> 00:07:11,200
This doesn't seem at all to have that much to do with linear programming.

86
00:07:11,200 --> 00:07:17,840
But it's the maximum cardinality by partite matching problem that we consider.

87
00:07:17,840 --> 00:07:21,000
And that's matching students to jobs.

88
00:07:21,000 --> 00:07:26,840
And so this is for we've got a bipartite graph.

89
00:07:26,840 --> 00:07:29,000
One set of nodes corresponds to students.

90
00:07:29,000 --> 00:07:34,600
The other set of nodes corresponds to jobs and of edges corresponding to job offer.

91
00:07:34,600 --> 00:07:38,839
And if we want to know the maximum set of edges connecting one to another,

92
00:07:38,839 --> 00:07:45,040
a student to a job.

93
00:07:45,040 --> 00:07:51,360
And we did that one by reducing it to max flow actually.

94
00:07:51,360 --> 00:07:59,040
But also you can just specify it as an LP formulation of an LP problem.

95
00:07:59,040 --> 00:08:06,319
So it's going to be everything's got to be zero.

96
00:08:06,319 --> 00:08:12,520
And it's just going to maximize this as all the possible matching.

97
00:08:12,520 --> 00:08:17,199
And then the constraints are there has to be at most one job per person.

98
00:08:17,199 --> 00:08:25,039
So if a has three edges, just say x zero plus x a equals to 52 less than or equal to one,

99
00:08:25,039 --> 00:08:26,759
and do that for each person.

100
00:08:26,759 --> 00:08:30,199
And then it most one person per job, just do it that way.

101
00:08:30,199 --> 00:08:35,639
Now this is not a trivial reduction.

102
00:08:35,639 --> 00:08:38,519
There was some math, quite a bit of math done early on,

103
00:08:38,519 --> 00:08:42,120
including a funnormon was involved.

104
00:08:42,120 --> 00:08:52,960
So if you have a polyhedron like this, where the right hand sides of the inequalities are all one,

105
00:08:52,960 --> 00:08:59,600
all the extreme points of this polyhedron have integer coordinates that are either zero or one.

106
00:08:59,600 --> 00:09:01,240
So we need that theorem.

107
00:09:01,240 --> 00:09:07,600
But it's not always so lucky, but in this case you can do it.

108
00:09:07,600 --> 00:09:12,840
And you can just use this linear programming, linear program to solve the matching problem.

109
00:09:12,840 --> 00:09:14,560
Again, no specialized algorithm.

110
00:09:14,560 --> 00:09:19,840
I just throw in your constraints and you have the solution.

111
00:09:19,840 --> 00:09:23,159
Use your LP solver.

112
00:09:23,159 --> 00:09:25,279
So that's just two examples.

113
00:09:25,279 --> 00:09:27,600
And there's many, many more examples.

114
00:09:27,600 --> 00:09:34,240
And again, as I said, you can take a problem like one that we solved and just add more things.

115
00:09:34,240 --> 00:09:37,960
So I want the shortest path that doesn't go through a certain node or

116
00:09:37,960 --> 00:09:43,480
then only has a certain number of nodes on it or whatever else in there, the kind of constraints that you might think of.

117
00:09:43,480 --> 00:09:44,680
You can just throw them in.

118
00:09:44,680 --> 00:09:52,879
If you've got an optimization problem, one thing you can do is definitely use an algorithm that you learned and

119
00:09:52,879 --> 00:09:55,680
go to the literature and try to find a solution.

120
00:09:55,680 --> 00:10:01,919
And that is certainly very effective for many of the fundamental problems that we've considered.

121
00:10:01,919 --> 00:10:08,120
But if things start to get complicated, it's really a good idea to think about using linear programming.

122
00:10:08,120 --> 00:10:14,079
Because it's often easy to model your problem as a linear program.

123
00:10:14,079 --> 00:10:21,639
And you can solve it with a commercial solver or available, if it's a small one, or an available solver.

124
00:10:21,639 --> 00:10:28,679
It might take a little longer than your specialized solution if you had one, but you might not care and you might not have one.

125
00:10:28,679 --> 00:10:34,519
And the idea is it really is a good idea to learn to use an LP solver.

126
00:10:34,519 --> 00:10:44,839
The really the takeaway from this is there's a lot of problems that reduce right to linear programming.

127
00:10:44,839 --> 00:10:47,239
And we've got a fast way to solve it.

128
00:10:47,239 --> 00:10:53,879
So that's a powerful problem solving model with broad scope.

129
00:10:53,879 --> 00:11:00,679
We can solve it and we can reduce a lot of important practical problems to it.

130
00:11:00,679 --> 00:11:03,480
And that's why it's important.

131
00:11:03,480 --> 00:11:09,879
So this leads us to a really profound question that's called the PNP question.

132
00:11:09,879 --> 00:11:14,120
And that'll tell us and we'll talk about this in detail in the next lecture.

133
00:11:14,120 --> 00:11:23,720
That there's a condition that is very fundamental to the efficiency of computation.

134
00:11:23,720 --> 00:11:29,720
That'll tell us that people don't think that there is a universal problem solving model.

135
00:11:29,720 --> 00:11:37,720
For the time being, however, in the last 50 years, the closest thing that we have to a universal problem solving model is linear programming.

