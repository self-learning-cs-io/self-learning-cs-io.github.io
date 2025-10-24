---
title: PrincetonAlgorithms P83Part26 03_introduction To Maxflow
---

1
00:00:00,000 --> 00:00:08,320
Today we're going to finish off our discussion of graph processing by looking at max flow

2
00:00:08,320 --> 00:00:09,820
algorithms.

3
00:00:09,820 --> 00:00:14,640
This is another general problem solving model for which we have efficient algorithms.

4
00:00:14,640 --> 00:00:19,440
So where are the difference between having a good algorithm and not having one makes a difference

5
00:00:19,440 --> 00:00:24,280
between being able to solve all kinds of practical problems and not being able to address them

6
00:00:24,280 --> 00:00:26,080
at all.

7
00:00:26,079 --> 00:00:31,379
This introduction will take a look at what the problem is and some of its implications.

8
00:00:31,379 --> 00:00:35,439
So first we'll start with what's called the min cut problem.

9
00:00:35,439 --> 00:00:45,159
So this is a, takes his input, an edge weighted diagram and now we're going to assume that

10
00:00:45,159 --> 00:00:51,239
the edge weights are positive and we refer to the weight as a capacity and you'll see why

11
00:00:51,239 --> 00:00:53,459
in just a minute.

12
00:00:53,460 --> 00:00:57,259
And also we specify a source and a target vertex.

13
00:00:57,259 --> 00:01:03,660
It's not an absolute requirement but it'll simplify our discussion for the lecture.

14
00:01:03,660 --> 00:01:08,760
So we have an edge weighted diagram with a source and target vertex and every edge has a positive

15
00:01:08,760 --> 00:01:11,260
capacity.

16
00:01:11,260 --> 00:01:20,140
Now a cut, an ST cut, a S&T or specified remember, is a partition of the vertices into two

17
00:01:20,140 --> 00:01:25,579
disjoint sets where S is in one set and T is in the other.

18
00:01:25,579 --> 00:01:31,939
And we'll indicate a cut as we've done before by coloring the vertices in one set.

19
00:01:31,939 --> 00:01:38,140
So in this case the cut consists of S in one set and all the other vertices in the other.

20
00:01:38,140 --> 00:01:43,780
So S is in one set and T is in the other that's an ST cut.

21
00:01:43,780 --> 00:01:49,219
Now given a cut we talk about the capacity of the cut.

22
00:01:49,219 --> 00:01:55,179
And that's going to be the sum of the capacity of the edges that go from the set containing

23
00:01:55,179 --> 00:02:00,900
S to the set containing B. If you have edge going the other way we don't count it.

24
00:02:00,900 --> 00:02:07,819
So in this case the this cut with the vertex containing just S in one set has capacity

25
00:02:07,819 --> 00:02:11,780
30, 10 plus 5 plus 15.

26
00:02:11,780 --> 00:02:13,939
Here's another cut.

27
00:02:13,939 --> 00:02:18,740
This one contains three vertices, S and two at the bottom there.

28
00:02:18,740 --> 00:02:23,419
Again it's an ST cut because S is colored and T is not.

29
00:02:23,419 --> 00:02:26,740
And then we can look at the capacity of that cut.

30
00:02:26,740 --> 00:02:32,699
Again we count the vertices, the edges that go from the cut containing S to the cut containing

31
00:02:32,699 --> 00:02:39,419
B. In this case is 10 plus 8 plus 16, that's the edge is going out, is 34.

32
00:02:39,419 --> 00:02:40,900
That's the capacity.

33
00:02:40,900 --> 00:02:47,219
We don't count the edges that go in from the second candy T to the second candy S.

34
00:02:47,219 --> 00:02:52,219
Capacity of the cut is the sum of the capacity of the edge is going out.

35
00:02:52,219 --> 00:02:54,140
Here's a third example.

36
00:02:54,140 --> 00:02:57,460
In this one's got capacity 28.

37
00:02:57,460 --> 00:03:01,900
Now the three cuts that we've seen you notice have different capacities.

38
00:03:01,900 --> 00:03:04,980
30, 34, 28.

39
00:03:04,979 --> 00:03:11,579
So the min cut problem clearly is to find the minimum capacity cut.

40
00:03:11,579 --> 00:03:14,339
Find a way to divide the vertices into two sets.

41
00:03:14,339 --> 00:03:19,099
One containing S and the other containing T with the property that the capacity of the

42
00:03:19,099 --> 00:03:21,259
cut is minimized.

43
00:03:21,259 --> 00:03:23,339
That's the min cut problem.

44
00:03:23,339 --> 00:03:28,379
And this is an important practical problem with all kinds of applications.

45
00:03:28,379 --> 00:03:32,979
Just for fun we take an application from the 1950s.

46
00:03:32,979 --> 00:03:38,099
This is around the time these sorts of problems were first articulated.

47
00:03:38,099 --> 00:03:46,219
So this has to do with the Cold War and these are rail networks that connects the Soviet

48
00:03:46,219 --> 00:03:51,620
Union with the countries in Eastern Europe.

49
00:03:51,620 --> 00:03:56,299
This map actually wasn't declassified until 1999.

50
00:03:56,300 --> 00:04:05,540
But it shows a graph with vertices directed graph with vertices corresponding to cities

51
00:04:05,540 --> 00:04:08,500
and edges corresponding to rail lines.

52
00:04:08,500 --> 00:04:15,980
And if you look closely you can see that each of the edges is labeled with a capacity.

53
00:04:15,980 --> 00:04:25,860
The goal of the free world say if there was going to be a real war was to find a way to

54
00:04:25,860 --> 00:04:30,780
cut the Soviet Union from Eastern Europe.

55
00:04:30,780 --> 00:04:31,780
And they want to do that.

56
00:04:31,780 --> 00:04:36,819
You can assume maybe the cost of cutting a rail line is proportional to its capacity.

57
00:04:36,819 --> 00:04:44,259
So they want to find the cheapest way to cut off supplies from Soviet Union to Eastern Europe.

58
00:04:44,259 --> 00:04:46,900
That's an example of a min cut application.

59
00:04:46,900 --> 00:04:49,780
We'll look at some other applications later on.

60
00:04:49,780 --> 00:04:55,420
Well look at a future maybe this is a cut for today's world.

61
00:04:55,420 --> 00:05:03,520
So now you have a huge graph maybe a social network and maybe there's a government and

62
00:05:03,520 --> 00:05:10,100
power in some area of the world and the goal of that government would be to cut off the

63
00:05:10,100 --> 00:05:12,740
communication to some set of people.

64
00:05:12,740 --> 00:05:16,700
And again they want to do that in the cheapest way possible.

65
00:05:16,700 --> 00:05:21,379
Find a minimum way to cut off communication.

66
00:05:21,379 --> 00:05:28,040
And certainly people are writing programs to process graphs like this with such goals

67
00:05:28,040 --> 00:05:29,980
in mind nowadays.

68
00:05:29,980 --> 00:05:34,939
These are huge, huge graphs and certainly are going to need efficient algorithms.

69
00:05:34,939 --> 00:05:41,480
In the 1950s the graphs were pretty huge by 1950 standards and wanted efficient algorithms

70
00:05:41,480 --> 00:05:45,300
then to for sure because computers were slower.

71
00:05:45,300 --> 00:05:47,860
All right that's one problem.

72
00:05:47,860 --> 00:05:51,660
Now let's talk about a different problem called the max flow problem.

73
00:05:51,660 --> 00:05:53,660
And it's the same setup.

74
00:05:53,660 --> 00:05:58,420
It inputs an edge-weighted diagram source for Texas S and the target for Texas T. Every

75
00:05:58,420 --> 00:06:01,180
edge has a positive capacity.

76
00:06:01,180 --> 00:06:04,699
And now what we're going to talk about is what's called a flow.

77
00:06:04,699 --> 00:06:07,939
It's an assignment of values to the edges.

78
00:06:07,939 --> 00:06:13,460
So we have the capacities and we're going to sign another integer to each edge called

79
00:06:13,460 --> 00:06:14,860
its flow.

80
00:06:14,860 --> 00:06:18,580
And the flow has to satisfy two properties.

81
00:06:18,580 --> 00:06:23,220
The first one is that the flows have to be positive and they can't be greater than the

82
00:06:23,220 --> 00:06:24,740
capacity.

83
00:06:24,740 --> 00:06:31,699
You can think of the edges again as a rail line containing some commodity or a pipe containing

84
00:06:31,699 --> 00:06:32,980
some fluid.

85
00:06:32,980 --> 00:06:36,860
So the flow is how much stuff can you put through that edge.

86
00:06:36,860 --> 00:06:41,939
You can put more than zero but you can't put more than the capacity.

87
00:06:41,939 --> 00:06:49,019
The other thing about a flow is that there has to be local equilibrium at the vertices.

88
00:06:49,019 --> 00:06:51,660
And again that's a natural constraint.

89
00:06:51,660 --> 00:06:58,819
If you think about stuff flowing in on rail lines to a city and you want to keep things

90
00:06:58,819 --> 00:07:05,220
going, the local equilibrium constraint says that the stuff coming in has to equal the

91
00:07:05,220 --> 00:07:09,060
stuff going out at every vertex.

92
00:07:09,060 --> 00:07:13,459
Except for the source, everything leaves from the source and the target.

93
00:07:13,459 --> 00:07:15,740
Everything goes to the target.

94
00:07:15,740 --> 00:07:21,780
And those have, the source has no inflow and the target has no outflow.

95
00:07:21,780 --> 00:07:30,019
So what you want is the inflow at a vertex, say in this example, inflow at V. There's

96
00:07:30,019 --> 00:07:35,459
five coming in on this edge and five coming in on that edge.

97
00:07:35,459 --> 00:07:41,060
So that's a total of 10 coming in and there has to be just 10 going out.

98
00:07:41,060 --> 00:07:43,979
So that happens on this one edge.

99
00:07:43,979 --> 00:07:46,939
And that has to be satisfied at every vertex.

100
00:07:46,939 --> 00:07:52,500
So this flows, got five coming in there and five going out, 10 going in there and five

101
00:07:52,500 --> 00:07:55,019
going out each way and so forth.

102
00:07:55,019 --> 00:07:59,740
Every vertex except S and T. And we can even make it true at S and T if I can draw an edge

103
00:07:59,740 --> 00:08:02,500
from T all the way back to S.

104
00:08:02,500 --> 00:08:04,899
So that's the max flow problem.

105
00:08:04,899 --> 00:08:11,339
Well, that's a definition of a flow and of course the max flow problem is to assign a

106
00:08:11,339 --> 00:08:12,339
value to the flow.

107
00:08:12,339 --> 00:08:16,420
Well, that's how much stuff can you get to the source?

108
00:08:16,420 --> 00:08:21,459
To the target or equivalently how much stuff can you push out of the source?

109
00:08:21,459 --> 00:08:27,220
And so the value is how much can you get into the target.

110
00:08:27,220 --> 00:08:31,500
There's lots of different ways to assign flows to the network to satisfy the capacity

111
00:08:31,500 --> 00:08:33,539
of the equilibrium constraint.

112
00:08:33,539 --> 00:08:35,860
Which one maximizes the flow?

113
00:08:35,860 --> 00:08:40,580
That's the maximum S T flow problem or the max flow problem.

114
00:08:40,580 --> 00:08:41,860
So that's two different problems.

115
00:08:41,860 --> 00:08:47,860
The min cut problem, how do we cut the graph efficiently with the minimal amount of work?

116
00:08:47,860 --> 00:08:51,539
And the max flow problem, what's the maximum amount of stuff that we can get through the

117
00:08:51,539 --> 00:08:52,539
graph?

118
00:08:53,059 --> 00:09:02,819
And again, if we look at 1950s graph, what the Soviet Union wanted to do was find a way

119
00:09:02,819 --> 00:09:06,459
to maximize the flow of supplies to Eastern Europe.

120
00:09:06,459 --> 00:09:09,699
That was their goal in this case.

121
00:09:09,699 --> 00:09:16,899
And again, you can see in this old map, this is an assignment of a flow to this network

122
00:09:16,899 --> 00:09:19,339
that does maximize the flow for this network.

123
00:09:19,339 --> 00:09:21,740
So they figured it out.

124
00:09:21,740 --> 00:09:27,060
And nowadays, in the huge graph, maybe the free world wants to do the opposite.

125
00:09:27,060 --> 00:09:32,340
They want to maximize the flow of information to some specified set of people.

126
00:09:32,340 --> 00:09:34,340
How do we get the most information in there?

127
00:09:34,340 --> 00:09:36,139
There's another way to think of it.

128
00:09:36,139 --> 00:09:40,139
And again, these are huge graphs and we want efficient algorithms.

129
00:09:40,139 --> 00:09:43,460
So that's two problems.

130
00:09:43,460 --> 00:09:48,019
They both have an input weighted diagram with a specified source in target.

131
00:09:48,019 --> 00:09:50,779
In-cut problem is find them in capacity cut.

132
00:09:50,779 --> 00:09:54,059
Max flow problem is find the maximum value flow.

133
00:09:54,059 --> 00:09:56,220
There's a lot of computation to do.

134
00:09:56,220 --> 00:10:00,699
For example, in the max flow problem, we have to assign a value to each edge.

135
00:10:00,699 --> 00:10:06,860
So that's more work than just finding a path as we've done in other graph processing problems.

136
00:10:06,860 --> 00:10:08,740
So it's more complicated.

137
00:10:08,740 --> 00:10:12,799
And the amazing thing about these two problems is that actually they're pretty much the same

138
00:10:12,799 --> 00:10:14,460
problem.

139
00:10:14,460 --> 00:10:20,940
So what we call dual, if you solve one, you're able to solve the other.

140
00:10:20,940 --> 00:10:23,700
That's an introduction to max flow min cut.

