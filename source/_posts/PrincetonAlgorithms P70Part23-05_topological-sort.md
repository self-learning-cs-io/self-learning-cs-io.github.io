---
title: PrincetonAlgorithms P70Part23 05_topological Sort
---

1
00:00:00,000 --> 00:00:09,660
Now we'll look at topological sorting, a digraph processing application that doesn't quite

2
00:00:09,660 --> 00:00:13,259
have a parallel with undirected graphs.

3
00:00:13,259 --> 00:00:18,039
And it's a very general model that is very widely used.

4
00:00:18,039 --> 00:00:22,480
And here's a simplest example of it called precedent scheduling.

5
00:00:22,480 --> 00:00:27,760
So the idea is that you've got a set of tasks that have to be completed, but there's

6
00:00:27,760 --> 00:00:30,080
precedence constraints.

7
00:00:30,080 --> 00:00:34,120
And you want to know in what order should you schedule the tasks?

8
00:00:34,120 --> 00:00:40,000
So you might think of this as like courses in a university curriculum.

9
00:00:40,000 --> 00:00:46,680
So as a model, we'll use the vertices will be the tasks and the edges will be the precedence

10
00:00:46,680 --> 00:00:47,680
constraint.

11
00:00:47,680 --> 00:00:51,920
And all this says is there's an edge from 3 to 6.

12
00:00:51,920 --> 00:00:56,760
That means you have to take introduction to computer science before you take advanced

13
00:00:56,759 --> 00:00:58,600
programming.

14
00:00:58,600 --> 00:01:05,359
And so there's all these sorts of constraints in the graph.

15
00:01:05,359 --> 00:01:10,159
And so what you want is a what's called a feasible schedule.

16
00:01:10,159 --> 00:01:14,759
So that's just an order in which you can take the linear order in which you can take the

17
00:01:14,759 --> 00:01:19,000
courses one after the other that respects the precedence.

18
00:01:19,000 --> 00:01:25,959
So that corresponds to drawing the graphs such that all the edges point upwards.

19
00:01:25,959 --> 00:01:33,280
And this model is used to study manufacturing processes and many other applications.

20
00:01:33,280 --> 00:01:36,359
So that's the topological sorting problem.

21
00:01:36,359 --> 00:01:40,759
So first thing is the topological sort works on a dag, so-called dag.

22
00:01:40,759 --> 00:01:45,159
That's a die graph that has no cycles.

23
00:01:45,159 --> 00:01:50,919
If you have a cycle, there's no way you're going to be able to solve the problem.

24
00:01:50,920 --> 00:01:58,519
In fact, a simpler graph-brushing problem is just find out if a graph has a cycle.

25
00:01:58,519 --> 00:02:02,719
We'll talk about that in a second, but let's do topological sort first.

26
00:02:02,719 --> 00:02:04,960
So we know that the graph has no cycles.

27
00:02:04,960 --> 00:02:08,439
It's a directed acyclic graph.

28
00:02:08,439 --> 00:02:16,759
And what we want to do is find a way to redraw the dag so that all the edges point upwards

29
00:02:16,759 --> 00:02:21,479
or give a bottom to top order so that all the edges are pointing upwards.

30
00:02:21,479 --> 00:02:24,799
That's called a topological order of the graph.

31
00:02:24,799 --> 00:02:28,679
And that'll give, in this case, an order in which maybe you could take the courses

32
00:02:28,679 --> 00:02:33,639
or perform the manufacturing process or whatever else.

33
00:02:33,639 --> 00:02:35,959
So that's the problem.

34
00:02:35,959 --> 00:02:39,560
So how we're going to solve it, well, we're going to use DFS.

35
00:02:39,560 --> 00:02:47,840
In fact, one of the lessons for, particularly for die graph processing is DFS is going to

36
00:02:47,840 --> 00:02:53,800
provide a way to solve it and it might be hard to find a different way.

37
00:02:53,800 --> 00:02:58,080
So let's look at a demo of topological sort.

38
00:02:58,080 --> 00:03:07,360
And all it is is just run DFS, but there's a particular point at which we want to take

39
00:03:07,360 --> 00:03:10,120
the vertices out or to get the order.

40
00:03:10,120 --> 00:03:13,760
And that's called reverse DFS post order.

41
00:03:13,760 --> 00:03:16,600
So let's look at how that works.

42
00:03:16,600 --> 00:03:24,280
All we do is when we do the DFS, when we're done with the vertex, we put it on a stack

43
00:03:24,280 --> 00:03:25,280
or put it out.

44
00:03:25,280 --> 00:03:28,280
So let's look at how that works.

45
00:03:28,280 --> 00:03:36,760
So we just run DFS the same as before, but we're not keeping track of anything except

46
00:03:36,759 --> 00:03:39,199
the vertices that we're done with.

47
00:03:39,199 --> 00:03:41,879
So visit for vertex zero.

48
00:03:41,879 --> 00:03:44,560
We have to check the places that you can get to from zero.

49
00:03:44,560 --> 00:03:46,679
It's 1, 2, and 5.

50
00:03:46,679 --> 00:03:48,759
So we check 1.

51
00:03:48,759 --> 00:03:50,759
1 is unmarked.

52
00:03:50,759 --> 00:03:57,239
So we're going to mark it and recursively visit 1.

53
00:03:57,239 --> 00:03:58,239
So we do that.

54
00:03:58,239 --> 00:04:00,319
We have to check 4.

55
00:04:00,319 --> 00:04:01,959
And 4 again is unmarked.

56
00:04:01,959 --> 00:04:03,959
So we recurse.

57
00:04:03,960 --> 00:04:08,400
But now both of the edges to 4 are in.

58
00:04:08,400 --> 00:04:10,800
So there's nowhere to go from 4.

59
00:04:10,800 --> 00:04:12,640
So we're done with 4.

60
00:04:12,640 --> 00:04:18,480
When we're done with 4, we actually put it on a stack.

61
00:04:18,480 --> 00:04:23,120
So that's order, the order in which we're done with the vertices.

62
00:04:23,120 --> 00:04:26,360
That's called post order.

63
00:04:26,360 --> 00:04:29,360
So now once we're done with 4, now we're done with 1.

64
00:04:29,360 --> 00:04:30,360
There's nowhere else to go.

65
00:04:30,360 --> 00:04:33,360
So we put it on the post order.

66
00:04:33,360 --> 00:04:36,879
And now we're back at 0.

67
00:04:36,879 --> 00:04:40,400
And we have to check the other vertices you get to from 0.

68
00:04:40,400 --> 00:04:41,240
So here's 2.

69
00:04:41,240 --> 00:04:43,759
We can get to from 2.

70
00:04:43,759 --> 00:04:47,520
And it's unmarked.

71
00:04:47,520 --> 00:04:49,400
So we visit it.

72
00:04:49,400 --> 00:04:50,720
But there's no place to go.

73
00:04:50,720 --> 00:04:51,560
So we're done with it.

74
00:04:51,560 --> 00:04:54,800
So we put it on the post order and go back to 0.

75
00:04:54,800 --> 00:04:56,439
Then we go to 5.

76
00:04:56,439 --> 00:04:56,960
Unmarked.

77
00:04:56,960 --> 00:04:59,280
So we visit it.

78
00:04:59,280 --> 00:05:02,319
Then we check 2, which is mark.

79
00:05:02,319 --> 00:05:03,800
So nothing to do.

80
00:05:03,800 --> 00:05:06,519
And then we're done with 5.

81
00:05:06,519 --> 00:05:11,959
And once we're done with 5, then we're done with 0.

82
00:05:11,959 --> 00:05:17,480
And that's the post order, the vertices

83
00:05:17,480 --> 00:05:20,079
that you get to from 0.

84
00:05:20,079 --> 00:05:24,120
So now we have to check all the other vertices in the graph.

85
00:05:24,120 --> 00:05:27,439
But we have to find some other place.

86
00:05:27,439 --> 00:05:30,959
And so we just check the vertices in order.

87
00:05:30,959 --> 00:05:35,560
Next one that we find that's unmarked is 3.

88
00:05:35,560 --> 00:05:41,319
So to visit 3, we have to check 2, 4, 5, and 6.

89
00:05:41,319 --> 00:05:47,319
And 2, 4, and 5 are all marked.

90
00:05:47,319 --> 00:05:48,919
So nothing to do.

91
00:05:48,919 --> 00:05:50,560
6 is unmarked.

92
00:05:50,560 --> 00:05:53,079
So we go visit 6.

93
00:05:53,079 --> 00:05:58,359
When we visit 6, 0 and 4 are already marked.

94
00:05:58,359 --> 00:05:59,759
So there's nothing to do.

95
00:05:59,759 --> 00:06:01,399
And we're done with 6.

96
00:06:01,399 --> 00:06:03,639
And finally, we're done with 3.

97
00:06:03,639 --> 00:06:05,519
When we're done with the vertex, we put it out.

98
00:06:05,519 --> 00:06:06,639
That's post order.

99
00:06:06,639 --> 00:06:12,159
Or if we put it on a stack, then we get reverse post order.

100
00:06:12,159 --> 00:06:15,360
And that turns out is the answer that we need.

101
00:06:18,439 --> 00:06:21,000
So the code is pretty simple.

102
00:06:21,000 --> 00:06:23,439
But we'll have to look a little more carefully

103
00:06:23,439 --> 00:06:25,839
to be convinced that it works.

104
00:06:25,839 --> 00:06:27,680
So it's depth first search.

105
00:06:27,680 --> 00:06:30,079
But we have an additional data structure, which

106
00:06:30,079 --> 00:06:33,639
is a stack of integers, which is the vertices

107
00:06:33,639 --> 00:06:35,759
in reverse post order.

108
00:06:35,759 --> 00:06:38,680
The constructor just creates that stack.

109
00:06:38,680 --> 00:06:41,120
And then the only thing we change to DFS

110
00:06:41,120 --> 00:06:44,439
is when we're done with a vertex before exiting,

111
00:06:44,439 --> 00:06:50,280
we put that vertex on the reverse post stack.

112
00:06:50,280 --> 00:06:55,079
And then the client simply gets the stack returned.

113
00:06:55,079 --> 00:06:57,839
That's an iterable iterating through that

114
00:06:57,839 --> 00:07:03,240
will give the vertices in the reverse DFS post order,

115
00:07:03,240 --> 00:07:07,560
which is the topologically sorted order.

116
00:07:07,560 --> 00:07:11,639
It's a very simple and compelling use of DFS.

117
00:07:14,759 --> 00:07:17,919
Actually, this is an amazingly simple algorithm,

118
00:07:17,919 --> 00:07:19,919
but it went undiscovered for many years.

119
00:07:19,919 --> 00:07:22,360
People were using much more complicated algorithms

120
00:07:22,360 --> 00:07:24,560
for this problem.

121
00:07:24,560 --> 00:07:28,759
OK, so reverse DFS post order of a DAG

122
00:07:28,759 --> 00:07:30,399
is the topological order.

123
00:07:30,399 --> 00:07:35,600
That's the correctness proof that we have to consider.

124
00:07:35,600 --> 00:07:41,079
This diagram over here is a record of the recursive calls

125
00:07:41,079 --> 00:07:43,720
for that example that we just did.

126
00:07:43,720 --> 00:07:47,079
To visit 0, we call it visit 1, and then we visit 4,

127
00:07:47,079 --> 00:07:49,560
and then we're done with 4, and then we're done with 1,

128
00:07:49,560 --> 00:07:53,600
and then we visit 2, and then 2, then 2, 5, which checks 2,

129
00:07:53,600 --> 00:07:55,160
and 5 done, and so forth.

130
00:07:55,160 --> 00:07:57,840
So this gives a record of the calls just

131
00:07:57,840 --> 00:08:01,960
for reference in this proof for that example.

132
00:08:01,960 --> 00:08:05,920
All right, so now we want to consider any edge where V

133
00:08:05,920 --> 00:08:08,920
points to W, and we want to consider the point

134
00:08:08,920 --> 00:08:12,120
where DFS of V is called.

135
00:08:12,120 --> 00:08:14,640
And there's a bunch of cases.

136
00:08:14,640 --> 00:08:22,760
So one case is that DFS W has already been called and returned.

137
00:08:22,759 --> 00:08:29,800
So in this example, when V equals 3, W equals 2, 4, or 5,

138
00:08:29,800 --> 00:08:31,800
they were already done.

139
00:08:31,800 --> 00:08:37,439
So if we put out those vertex numbers

140
00:08:37,439 --> 00:08:41,120
before we put 3 out, then the arrow from V to W

141
00:08:41,120 --> 00:08:42,120
is going to point up.

142
00:08:42,120 --> 00:08:43,559
They were already done.

143
00:08:43,559 --> 00:08:44,480
So that's case 1.

144
00:08:44,480 --> 00:08:46,600
That's an easy case.

145
00:08:46,600 --> 00:08:49,399
Case 2, they're all easy cases.

146
00:08:49,399 --> 00:08:52,720
Case 2 is, DFS W hasn't been called yet.

147
00:08:53,600 --> 00:08:58,879
But if there's an edge from V to W, we're going to call it.

148
00:08:58,879 --> 00:09:00,680
And then it's recursive.

149
00:09:00,680 --> 00:09:04,000
It's going to finish before we're done with 3.

150
00:09:04,000 --> 00:09:10,360
So again, the edge from V to W is going to point up 3 to 6.

151
00:09:10,360 --> 00:09:15,320
In the only other possible case might be that DFS W

152
00:09:15,320 --> 00:09:18,920
has already been called but not returned.

153
00:09:18,920 --> 00:09:21,920
But that can't happen.

154
00:09:21,919 --> 00:09:24,799
Because there's no cycles.

155
00:09:24,799 --> 00:09:29,679
If DFS W had been called but not yet returned,

156
00:09:29,679 --> 00:09:36,079
then the function call stack is going to have a path

157
00:09:36,079 --> 00:09:38,759
from W to V on it.

158
00:09:38,759 --> 00:09:41,079
And so if we have an edge VW, that would give a cycle,

159
00:09:41,079 --> 00:09:43,319
but there's no cycles.

160
00:09:43,319 --> 00:09:46,519
So from those observations, we know

161
00:09:46,519 --> 00:09:51,639
that all vertices pointing from 3 are done before 3 is done.

162
00:09:51,639 --> 00:09:54,519
So they appear after 3 in the topological order

163
00:09:54,519 --> 00:09:59,279
or they point up if we put the vertices

164
00:09:59,279 --> 00:10:02,480
in reverse topological order.

165
00:10:02,480 --> 00:10:08,480
So that's the correctness proof for topological order.

166
00:10:08,480 --> 00:10:14,840
So a similar process is to detect a cycle.

167
00:10:14,840 --> 00:10:17,480
Topological sort doesn't work with a grass cut a cycle.

168
00:10:17,480 --> 00:10:19,080
So one of the things we might want to do

169
00:10:19,080 --> 00:10:22,400
is just find cycles in diagrams.

170
00:10:22,400 --> 00:10:24,320
If you're a college and you put out a curriculum

171
00:10:24,320 --> 00:10:26,360
and it's got a directed cycle, you have a problem.

172
00:10:26,360 --> 00:10:29,520
So you might want to process that first.

173
00:10:29,520 --> 00:10:33,080
So if there's a directed cycle, you

174
00:10:33,080 --> 00:10:34,480
can't have a topological order.

175
00:10:34,480 --> 00:10:38,160
If there's no directed cycle, then we just found it.

176
00:10:38,160 --> 00:10:40,440
So one thing you might want is given a diagram,

177
00:10:40,440 --> 00:10:43,720
find a directed cycle, and how are you going to do that?

178
00:10:43,720 --> 00:10:45,280
You're going to use DFS.

179
00:10:45,280 --> 00:10:47,320
And that's a simple algorithm that you

180
00:10:47,320 --> 00:10:53,840
might want to think about in a few lines in the book.

181
00:10:53,840 --> 00:10:58,800
So precedent scheduling is an excellent example

182
00:10:58,800 --> 00:11:05,440
of the use of search in a directed graph.

183
00:11:05,440 --> 00:11:10,720
And this is the cycle of length 1, of course,

184
00:11:10,720 --> 00:11:15,400
that requires itself as a prerequisite.

185
00:11:16,360 --> 00:11:22,120
This is just an example of a very widely used computation.

186
00:11:22,120 --> 00:11:25,159
And it really has many, many applications.

187
00:11:25,159 --> 00:11:28,959
So for example, the Java compiler actually

188
00:11:28,959 --> 00:11:32,199
does cycle detection.

189
00:11:32,199 --> 00:11:35,720
If you have a class A extends B and another one B extends C

190
00:11:35,720 --> 00:11:38,360
and another one C extends A, that's

191
00:11:38,360 --> 00:11:39,879
going to create a problem.

192
00:11:39,879 --> 00:11:42,840
Class hierarchy is not supposed to have cycles.

193
00:11:42,840 --> 00:11:45,519
And it'll actually, the Java compiler

194
00:11:45,519 --> 00:11:48,399
will actually give an error message saying

195
00:11:48,399 --> 00:11:50,920
there's cyclic inheritance.

196
00:11:50,920 --> 00:11:52,960
And not allowed to do that.

197
00:11:52,960 --> 00:11:59,160
So there's many applications that involve essentially

198
00:11:59,160 --> 00:12:02,399
digraphs that aren't supposed to have cycles.

199
00:12:02,399 --> 00:12:06,160
Another example is Microsoft Excel.

200
00:12:06,160 --> 00:12:11,800
So if you do a cyclic reference like this in Excel,

201
00:12:11,799 --> 00:12:16,599
which in a big spreadsheet you can imagine might happen,

202
00:12:16,599 --> 00:12:19,599
that's an error.

203
00:12:19,599 --> 00:12:25,639
And not only does Microsoft Excel flag the error,

204
00:12:25,639 --> 00:12:29,079
says you have a created a circular reference,

205
00:12:29,079 --> 00:12:31,559
try one of the following.

206
00:12:31,559 --> 00:12:35,439
And it's actually got a circular reference tool bar that

207
00:12:35,439 --> 00:12:39,159
will help you figure out what to do in that case.

208
00:12:39,159 --> 00:12:42,719
So cycle detection and topological sorting

209
00:12:42,719 --> 00:12:47,360
are important applications that depth first search and digraphs.

