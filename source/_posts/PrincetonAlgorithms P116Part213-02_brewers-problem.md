---
title: PrincetonAlgorithms P116Part213 02_brewers Problem
---

1
00:00:00,000 --> 00:00:08,839
Today we're going to talk about linear programming, including the simplex algorithm, which ranks

2
00:00:08,839 --> 00:00:14,240
as one of the most important algorithms of the 20th century, so certainly has to be included

3
00:00:14,240 --> 00:00:17,359
in any course on algorithms.

4
00:00:17,359 --> 00:00:19,960
So what is linear programming?

5
00:00:19,960 --> 00:00:26,760
Well you'll have a fairly clear idea after the end of the lecture, and in fact you can

6
00:00:26,760 --> 00:00:34,600
take an entire course on linear programming or actually do graduate study in linear programming

7
00:00:34,600 --> 00:00:41,280
or get a high paying job in linear programming, so it's quite a bit to define.

8
00:00:41,280 --> 00:00:46,280
So we talked about shortest paths in max-low as problem solving models.

9
00:00:46,280 --> 00:00:53,280
In linear programming it's a general problem solving model that works in a lot of context.

10
00:00:53,280 --> 00:00:59,520
So shortest path max-low that's finding the minimum, the maximum of some kind of quantity.

11
00:00:59,520 --> 00:01:09,520
A good way to think of linear programming is programming where it's most often used in practice is you want to allocate scarce resources

12
00:01:09,520 --> 00:01:17,640
among a number of competing activities and you want to do it in a way that minimizes costs or maximizes something.

13
00:01:17,680 --> 00:01:20,079
That's the basic idea.

14
00:01:20,079 --> 00:01:29,319
And it encompasses a huge number of problems that we've considered in even plenty of problems that we have

15
00:01:29,319 --> 00:01:30,920
and considered.

16
00:01:30,920 --> 00:01:38,560
So this is an example of a linear program that we're going to use throughout this lecture.

17
00:01:38,560 --> 00:01:46,439
So it's got a couple of components, so one of them is called an objective function.

18
00:01:46,439 --> 00:01:52,200
And so we say we have some variables and we want to maximize the objective function.

19
00:01:52,200 --> 00:01:59,759
So our goal is to find values of the variables that will maximize the objective function, subject to constraints.

20
00:01:59,759 --> 00:02:08,919
And the constraints are linear inequality and usually including that the variables are positive.

21
00:02:08,919 --> 00:02:11,759
So there's two steps.

22
00:02:11,759 --> 00:02:15,960
The first is whatever problem you have, sort of max-low and like that.

23
00:02:15,960 --> 00:02:18,840
You have to formulate it like this.

24
00:02:18,840 --> 00:02:20,439
That's reduction.

25
00:02:20,439 --> 00:02:24,680
You take your problem and you convert it into this form.

26
00:02:24,680 --> 00:02:27,560
And then the second thing is to solve it.

27
00:02:27,560 --> 00:02:31,120
That's what linear programming is.

28
00:02:31,120 --> 00:02:37,240
And it's significant because it's widely applicable to real world problems.

29
00:02:37,240 --> 00:02:45,360
There's fast commercial programs out there that will solve huge linear programs.

30
00:02:45,360 --> 00:02:48,960
And it's a key subroutine for solving even more difficult problems.

31
00:02:48,960 --> 00:02:56,720
But it's the idea that it's a widely applicable model that we can actually do solutions for huge problems.

32
00:02:56,720 --> 00:03:03,400
For example, airlines use linear programming to schedule planes and pilots and flights.

33
00:03:03,400 --> 00:03:12,800
And Delta recently claimed that linear programming saves it over $100 million per year.

34
00:03:12,800 --> 00:03:16,640
So it's a general and we can solve problems.

35
00:03:16,640 --> 00:03:19,439
That's what linear programming is.

36
00:03:19,439 --> 00:03:21,240
And very general.

37
00:03:21,240 --> 00:03:28,840
Here's just a short list of problems where you can find papers where people use linear programming

38
00:03:28,840 --> 00:03:30,680
to solve these problems.

39
00:03:30,680 --> 00:03:36,840
From direct mail advertising to, as I mentioned, airline crew assignment,

40
00:03:36,840 --> 00:03:47,800
there's problems in science, icing spin glasses and physics, sports scheduling, baseball and basketball.

41
00:03:47,800 --> 00:03:53,120
In electrical engineering and designing computers or blending petroleum products,

42
00:03:53,120 --> 00:03:54,199
all kinds of things.

43
00:03:54,199 --> 00:03:56,159
A huge number of applications.

44
00:03:56,159 --> 00:04:00,159
It's a very general model.

45
00:04:00,159 --> 00:04:07,000
So let's take a look at a little more detail of a full application.

46
00:04:07,000 --> 00:04:13,639
And we're going to do it based on a classic paper in scientific America in 1980.

47
00:04:13,639 --> 00:04:19,560
That certainly, I don't know if it was intended, but certainly does appeal to college students

48
00:04:19,560 --> 00:04:26,959
because it's all about using linear programming to decide how to best make beer and ale.

49
00:04:26,959 --> 00:04:29,920
That's why it's called the Brewer's Problem.

50
00:04:29,920 --> 00:04:30,920
So here's the idea.

51
00:04:30,920 --> 00:04:38,360
It's a toy example to try to make sure that everybody understands what linear programming

52
00:04:38,360 --> 00:04:39,360
really is.

53
00:04:39,360 --> 00:04:46,600
It was developed by Bob Blan, who also contributed to a lot of the practice of linear programming

54
00:04:46,600 --> 00:04:47,600
as well.

55
00:04:47,600 --> 00:04:54,000
Okay, so the small brewery is supposed to produce both ale and beer.

56
00:04:54,000 --> 00:04:58,840
Now there's raw materials that go into both ale and beer.

57
00:04:58,839 --> 00:05:06,159
There's a few other things, but the main ones are corn, hops and malt.

58
00:05:06,159 --> 00:05:09,519
And the brewery has a certain amount of each one.

59
00:05:09,519 --> 00:05:19,839
Say it's got 40 and 80 pounds of corn, 160 ounces of hops and 1190 pounds of malt.

60
00:05:19,839 --> 00:05:23,199
So that's the resources that are available.

61
00:05:23,199 --> 00:05:27,039
Now they know how to make two things.

62
00:05:27,040 --> 00:05:30,240
They know how to make ale and they know how to make beer.

63
00:05:30,240 --> 00:05:36,240
And there's a recipe for the ale and the beer that uses these scarce resources.

64
00:05:36,240 --> 00:05:42,720
So to make a barrel of ale, you need five pounds of corn, four ounces of hops and 35 pounds

65
00:05:42,720 --> 00:05:44,520
of malt.

66
00:05:44,520 --> 00:05:51,879
And to make a barrel of beer, you need much more corn and less malt and a little bit more

67
00:05:51,879 --> 00:05:52,720
hops.

68
00:05:52,720 --> 00:05:56,920
So that's the recipes for those two things.

69
00:05:56,920 --> 00:06:00,200
And the other thing is that there's different profitability.

70
00:06:00,200 --> 00:06:08,200
So you can make $13 per barrel of ale and $23 per barrel of beer.

71
00:06:08,200 --> 00:06:11,880
So the brewery's problem is what do we do?

72
00:06:11,880 --> 00:06:16,040
How much ale and how much beer should we make?

73
00:06:16,040 --> 00:06:24,360
So the situation is that depending on how much ale or how much beer you make, you have

74
00:06:24,360 --> 00:06:26,280
different amount of profit.

75
00:06:26,280 --> 00:06:33,520
So let's say someone says, well, let's make it all out of ale.

76
00:06:33,520 --> 00:06:37,759
Let's make as much ale as we possibly can.

77
00:06:37,759 --> 00:06:42,960
So it turns out that 34 barrels of ale is the most that you could possibly make because

78
00:06:42,960 --> 00:06:45,040
that uses up all your malt.

79
00:06:45,040 --> 00:06:51,000
So you need 35 pounds of malt per barrel and 34 times 35 is 1190.

80
00:06:51,000 --> 00:06:53,439
That's all that you have.

81
00:06:53,439 --> 00:07:00,000
So if you make 34 barrels of ale, less than max that you could make.

82
00:07:00,000 --> 00:07:10,560
And then if you do that, 34 times 13 is $442 of profit that you make if you make all ale.

83
00:07:10,560 --> 00:07:11,800
What if you make all beer?

84
00:07:12,600 --> 00:07:17,000
Well, if you make all beer, then corn is the limiting resource.

85
00:07:17,000 --> 00:07:19,560
You need a lot of corn to make beer.

86
00:07:19,560 --> 00:07:21,920
You only 15 pounds per barrel.

87
00:07:21,920 --> 00:07:23,920
You can only make 32 barrels.

88
00:07:23,920 --> 00:07:27,639
And you have plenty of the other resources.

89
00:07:27,639 --> 00:07:31,759
But if you did make all beer, you'd make $736.

90
00:07:31,759 --> 00:07:36,800
So if you're going to make all beer or all ale, you're going to go with the all beer.

91
00:07:36,800 --> 00:07:40,759
But you can do things in between.

92
00:07:40,759 --> 00:07:48,439
If you used up all the hops that would be 19 and a half, well, you can't really make a half barrel.

93
00:07:48,439 --> 00:07:51,199
So we're not going to consider that case.

94
00:07:51,199 --> 00:07:55,439
But if you could, so wouldn't be as good as all beer.

95
00:07:55,439 --> 00:07:57,560
But what about this mix here?

96
00:07:57,560 --> 00:08:07,719
If we were to make 12 barrels of ale and 28 barrels of beer,

97
00:08:07,720 --> 00:08:14,800
then the amount of hops that you need, you can multiply it out, that would use up all the hops,

98
00:08:14,800 --> 00:08:19,880
the 160 ounces of hops that you've got.

99
00:08:19,880 --> 00:08:23,040
So that's restricted by the number of hops.

100
00:08:23,040 --> 00:08:26,840
And also use up all the corn that you've got.

101
00:08:26,840 --> 00:08:35,960
And if you do 12 times 13 for the ale and 28 times 23 for the beer, you make a profit of $800.

102
00:08:36,040 --> 00:08:38,879
So out of these alternatives, that's the one you're going to choose.

103
00:08:38,879 --> 00:08:46,440
Make 12 barrels of ale and 28 barrels of beer, and you're going to maximize your profits.

104
00:08:46,440 --> 00:08:49,280
That's the brewer's problem.

105
00:08:49,280 --> 00:08:51,920
Now, the question is, can we do better?

106
00:08:51,920 --> 00:08:58,720
We've just been fooling around a little bit and seeing which one uses up resources,

107
00:08:58,720 --> 00:09:01,160
is there some way that we can do better?

108
00:09:01,160 --> 00:09:04,320
So that's really the brewer's problem.

109
00:09:04,320 --> 00:09:06,560
I've got the scarce resources.

110
00:09:06,560 --> 00:09:17,920
I've got the objective function, and I want to maximize my profits while sticking to the resource constraints.

111
00:09:17,920 --> 00:09:22,960
So this is a linear programming formulation of the brewer's problem.

112
00:09:22,960 --> 00:09:27,920
It's a mathematical formulation of the problem.

113
00:09:27,919 --> 00:09:34,479
All we're doing is expressing these various constraints with math.

114
00:09:34,479 --> 00:09:40,919
So A is the number of barrels of ale that I want to make, and B is the number of barrels of beer.

115
00:09:40,919 --> 00:09:46,319
My profit is $13 for each barrel of ale and $23 for each barrel of B.

116
00:09:46,319 --> 00:09:51,039
So I want to maximize 13A plus B.

117
00:09:51,039 --> 00:09:57,120
And then I'm subject to all these constraints that are given to me by the recipes.

118
00:09:57,120 --> 00:10:07,799
For the ale, it's five units of corn, four units of hop, and 35 units of mall.

119
00:10:07,799 --> 00:10:11,360
And for the beer, it's 15, 4, 20.

120
00:10:11,360 --> 00:10:16,919
So if I make A barrels of ale and B barrels of beer, then I'm subject to this constraint.

121
00:10:16,919 --> 00:10:19,159
That's all the corn that I have and so forth.

122
00:10:19,159 --> 00:10:24,560
And of course, I have to make a positive number of barrels of ale and beer.

123
00:10:24,559 --> 00:10:28,159
That's a mathematical formulation of the problem.

124
00:10:28,159 --> 00:10:36,799
So that's a linear program that's reducing the brewer's problem to a mathematical formulation.

125
00:10:36,799 --> 00:10:45,759
So now we want to look at try to get a better understanding or a geometric intuition on what this thing means.

126
00:10:45,759 --> 00:10:52,079
And so the key idea is there's a thing called the feasible region.

127
00:10:52,080 --> 00:10:53,280
So we have two variables.

128
00:10:53,280 --> 00:11:03,840
So we're going to plot all the possible points, all the possible amounts of ale and beer that we could make in just in the X, Y,

129
00:11:03,840 --> 00:11:04,680
plain.

130
00:11:04,680 --> 00:11:10,520
So it's a positive X, Y, plain because we're going to make a positive amount of beer and a positive amount of ale.

131
00:11:10,520 --> 00:11:16,400
In the other constraints, actually define half planes.

132
00:11:16,399 --> 00:11:24,000
So that is the amount of corn has to be, you have to have 5A plus 15B less than or equal 480.

133
00:11:24,000 --> 00:11:33,279
If you draw the line, 5A plus 15B equals 480, which is this line here and an intersection way out there.

134
00:11:33,279 --> 00:11:37,480
Then everything above this line is not feasible.

135
00:11:37,480 --> 00:11:41,879
We don't have that much and everything below that line is possibly feasible.

136
00:11:41,879 --> 00:11:52,679
And actually all we do is just intersect all the half planes, including the half plane above the X axis and to the right of the Y axis.

137
00:11:52,679 --> 00:12:00,399
And if you do that, you get a complex convex polygon.

138
00:12:00,399 --> 00:12:06,039
And all the points inside are things that we could possibly do.

139
00:12:06,039 --> 00:12:08,480
That's the first idea.

140
00:12:08,480 --> 00:12:21,159
We have inequalities that satisfy all those inequalities simultaneously defines a complex region like this.

141
00:12:21,159 --> 00:12:22,719
And what about the objective function?

142
00:12:22,719 --> 00:12:25,719
Well, that's just another line.

143
00:12:25,720 --> 00:12:29,560
And so that's a line of slope.

144
00:12:29,560 --> 00:12:37,040
If you take 13A plus 23B, that's the objective function.

145
00:12:37,040 --> 00:12:55,360
And any point, if you look at where this line of the same slope intersects the convex region, you can see that what we're going to be looking at is we want the one that goes up the highest.

146
00:12:55,360 --> 00:12:57,600
You can't get higher profit.

147
00:12:57,600 --> 00:13:04,279
If you have a line that is a bigger number, then you're not going to be in the feasible region.

148
00:13:04,279 --> 00:13:07,879
So that you can see the objective function defines the slope of a line.

149
00:13:07,879 --> 00:13:16,320
And what we want to find is, you think of it the other way, the line coming in from positive infinity, where does it hit the feasible region?

150
00:13:16,320 --> 00:13:21,120
That's where our profit is going to be maximized.

151
00:13:21,120 --> 00:13:28,440
So just the geometry tells us that the optimal solution is going to be at an extreme point.

152
00:13:28,440 --> 00:13:35,960
In this case, when we have two variables, it's where two constraints intersect.

153
00:13:35,960 --> 00:13:49,680
So that's already a huge improvement in terms of solving the problem, rather than having to consider this infinite number of points that describe the amount of AL, the amount of beer that we might make.

154
00:13:49,679 --> 00:13:55,959
We only have to consider this finite set of points, which are the extreme points in the feasible region.

155
00:13:55,959 --> 00:14:01,799
And one of those is going to be our optimal.

156
00:14:01,799 --> 00:14:07,879
So that brings us to the standard form of a linear program in general.

157
00:14:07,879 --> 00:14:13,719
In general, we have way more than two variables.

158
00:14:13,719 --> 00:14:19,039
And we have lots of different linear equations.

159
00:14:19,039 --> 00:14:27,919
So what we're going to do is, and actually we're going to get rid of inequalities and just deal with the qualities.

160
00:14:27,919 --> 00:14:31,559
And we'll talk about that in a minute.

161
00:14:31,559 --> 00:14:39,519
And this is just to try to get a form that makes all the problems seem the same so that we can work with them.

162
00:14:39,519 --> 00:14:41,439
And this again is the power of reduction.

163
00:14:41,439 --> 00:14:48,799
We're just using reduction to get the problem in a form that we can fully understand and solve it.

164
00:14:48,799 --> 00:14:57,679
So the general statement of a linear program is going to be, you've got some variables.

165
00:14:57,679 --> 00:15:02,919
And the, you want to, in the variables, you're going to assist our all positive.

166
00:15:02,919 --> 00:15:06,120
And the objective function is a linear combination of those variables.

167
00:15:06,120 --> 00:15:09,879
That just means we multiply by constant and atom.

168
00:15:09,879 --> 00:15:13,959
All the constraints also will be linear equations.

169
00:15:13,960 --> 00:15:18,920
However many constraints there are, there could be any number of constraints.

170
00:15:18,920 --> 00:15:21,360
The constraints might be redundant.

171
00:15:21,360 --> 00:15:23,360
The problem might be over constrained.

172
00:15:23,360 --> 00:15:28,040
All of that has to be dealt with in that linear programming solution.

173
00:15:28,040 --> 00:15:33,040
And you don't have things like multiplying together variables or anything like that.

174
00:15:33,040 --> 00:15:43,360
So your input is the coefficients for the objective function and also the coefficients for all the linear equations and also the radian sides.

175
00:15:43,360 --> 00:15:56,080
And your output, the result of solving the linear programming problem is the values of the x's that maximize objective function subject to all the constraints.

176
00:15:56,080 --> 00:16:01,240
Now, people define standard forms of linear programs in different ways.

177
00:16:01,240 --> 00:16:06,519
You can find all different sorts of slightly different standard forms.

178
00:16:06,519 --> 00:16:15,759
And this one is really convenient to express as a matrix where A is a matrix and B and C are vectors.

179
00:16:15,759 --> 00:16:21,720
And it's just those, and in x is a vector, column vector.

180
00:16:21,720 --> 00:16:32,840
You just satisfying, maximizing the, it's just saying the same thing in much more compact notation.

181
00:16:32,840 --> 00:16:36,600
So as I mentioned, there's no really widely agreed notion of standard form.

182
00:16:36,600 --> 00:16:41,879
So you'll find different standard forms in different contexts usually.

183
00:16:41,879 --> 00:16:49,560
So now our brewers problem didn't have equalities that had any qualities.

184
00:16:49,560 --> 00:16:53,800
So we have to convert that to the standard form.

185
00:16:53,800 --> 00:16:56,960
Basically get rid of the inequalities and it's really easy to do.

186
00:16:56,960 --> 00:17:03,200
And once you get used to this idea, and we'll use it again later on.

187
00:17:03,200 --> 00:17:17,039
So the first thing is, so instead of maximizing a linear combination, we're actually going to just maximize a single variable.

188
00:17:17,039 --> 00:17:22,400
And we're going to add that and then make the objective function equation.

189
00:17:22,400 --> 00:17:33,600
So when I maximize the subject to the constraint that 13A plus 23B minus E equals zero, that's the same as max five and 13A plus 23B.

190
00:17:33,600 --> 00:17:43,040
And then we just add slack variables to convert each of the inequality to a quality, it's called a variable that takes up the slack.

191
00:17:43,039 --> 00:17:55,680
So if 5A plus 15B is going to be less than or equal to 480, that's the same as saying that 5A plus 15B plus something positive has to equal 480.

192
00:17:55,680 --> 00:17:58,480
So it's just saying the same thing.

193
00:17:58,480 --> 00:18:03,200
Add a slack variable SC and say that it's going to be positive.

194
00:18:03,200 --> 00:18:07,359
So now we have a bunch of equations and just all positive variables.

195
00:18:07,359 --> 00:18:12,879
So it's more variables, but less variability.

196
00:18:12,879 --> 00:18:17,519
We've kind of got a variable for everything in the system.

197
00:18:17,519 --> 00:18:24,719
So that's a conversion of the brewers problem to the standard form of linear program.

198
00:18:24,719 --> 00:18:30,159
Now just a little bit more about the geometry before we get to the solution.

199
00:18:30,159 --> 00:18:34,159
Again, the inequalities define half spaces.

200
00:18:34,160 --> 00:18:38,640
So when you intersect them, you get something convex.

201
00:18:38,640 --> 00:18:42,960
You can't get something like this because the half space would just chop it off.

202
00:18:42,960 --> 00:18:45,040
That's really important.

203
00:18:45,040 --> 00:18:48,160
And that's in due to mention.

204
00:18:48,160 --> 00:18:56,160
So convex just means that if you have two points that are in the set, everything on the line between it was also in the set.

205
00:18:56,160 --> 00:19:04,320
And an extreme point is something that you can't write as a linear combination of something in the set.

206
00:19:04,320 --> 00:19:07,519
So that's just the geometry of it.

207
00:19:07,519 --> 00:19:10,000
And that's in two dimensions.

208
00:19:10,000 --> 00:19:14,400
And this is very intuitive in two dimensions and higher dimensions.

209
00:19:14,400 --> 00:19:16,800
It's hard to really trust your intuition.

210
00:19:16,800 --> 00:19:22,400
So that's why we have these specific geometric definitions.

211
00:19:22,400 --> 00:19:28,000
Now the extreme point property still holds even in higher dimensions.

212
00:19:28,000 --> 00:19:29,519
This is three dimensions.

213
00:19:29,519 --> 00:19:33,759
And now after three dimensions, we really have to use our imagination.

214
00:19:33,759 --> 00:19:37,280
But still the same idea of a bunch of intersecting half,

215
00:19:37,280 --> 00:19:43,600
inter-specting half spaces in higher dimensions.

216
00:19:43,600 --> 00:19:50,720
And the same basic idea holds if you stick with the basic math definitions.

217
00:19:50,720 --> 00:19:55,680
And so they all intersect in the good news is that still,

218
00:19:55,680 --> 00:20:00,079
inside is the infinite number of all possible solutions.

219
00:20:00,079 --> 00:20:03,839
But there's only a finite number of these planes.

220
00:20:03,839 --> 00:20:07,200
And so when they intersect, there's only a finite number of intersections.

221
00:20:07,200 --> 00:20:12,079
That's a good news rather than having to examine infinite number of points,

222
00:20:12,079 --> 00:20:15,920
which is that the examin' a finite number of these extremal points.

223
00:20:15,920 --> 00:20:18,720
But the bad news is there really can be a lot of them.

224
00:20:18,720 --> 00:20:23,839
It can be exponential in the number of constraints.

225
00:20:23,839 --> 00:20:28,319
So that's the extreme point property.

226
00:20:28,319 --> 00:20:38,079
Now it's because of this idea of the extreme that has to be where the solution is.

227
00:20:38,079 --> 00:20:44,960
If you find a local optimal place that's just better than everybody connected to it,

228
00:20:44,960 --> 00:20:50,640
that's going to be actually a global often that follows from a convexity.

229
00:20:50,640 --> 00:20:57,279
So it's actually a good situation that if you can just get to a place

230
00:20:57,279 --> 00:21:02,079
that you can't improve from, then you're in good shape.

231
00:21:02,079 --> 00:21:08,799
That's the geometry of the learning of programming problem.

