---
title: PrincetonAlgorithms P81Part25 05_edge Weighted Dags
---

1
00:00:00,000 --> 00:00:08,640
Now we're going to look at shortest paths in edge weighted digs.

2
00:00:08,640 --> 00:00:15,919
This is a very common situation and we'll see a couple of important applications.

3
00:00:15,919 --> 00:00:22,440
Suppose that you've got an edge weighted digraph that's our input to shortest paths but

4
00:00:22,440 --> 00:00:28,039
there you know there's no directed cycle and actually that's true in many applications

5
00:00:28,039 --> 00:00:29,400
that we'll see some.

6
00:00:29,399 --> 00:00:34,839
The question is does the fact that it has no directed cycles make it easier to find

7
00:00:34,839 --> 00:00:38,640
shortest paths than in a general digraph?

8
00:00:38,640 --> 00:00:42,200
In the answer is yes, it certainly does.

9
00:00:42,200 --> 00:00:44,799
So let's take a look at what happens.

10
00:00:44,799 --> 00:00:47,959
And the algorithm is very simple.

11
00:00:47,959 --> 00:00:53,439
What we're going to do is just consider the vertices in topological order.

12
00:00:53,439 --> 00:00:59,200
Since there's no cycles we know there's a topological ordering where...

13
00:00:59,200 --> 00:01:05,359
we can lay out the graph and all the edges point to vertices that we haven't seen yet.

14
00:01:05,359 --> 00:01:10,040
And so we're just relax all edges pointing from each vertex taking them in topological

15
00:01:10,040 --> 00:01:11,040
order.

16
00:01:11,040 --> 00:01:15,599
Again this will be easy to see in an example.

17
00:01:15,599 --> 00:01:22,079
All right so here's an edge weighted directed acyclic graph.

18
00:01:22,079 --> 00:01:28,200
The first thing that we do is sort of the vertices in topological order.

19
00:01:28,200 --> 00:01:34,520
And we talked about an algorithm for doing that a couple of lectures ago.

20
00:01:34,520 --> 00:01:37,439
So just using depth for search.

21
00:01:37,439 --> 00:01:43,400
So we consider vertex 0 and relax all the edges coming from vertex 0.

22
00:01:43,400 --> 00:01:53,159
And that gives us shortest paths to 1, 4 and 7.

23
00:01:53,159 --> 00:01:57,480
So next we consider vertex 1.

24
00:01:57,480 --> 00:02:03,000
We don't do anything except take the next vertex in topological order.

25
00:02:03,000 --> 00:02:06,680
We could have also taken 4 in this case.

26
00:02:06,680 --> 00:02:12,960
And so we're going to add that and then just relax along all the edges coming from that

27
00:02:12,960 --> 00:02:14,800
vertex.

28
00:02:14,800 --> 00:02:22,360
In this case that gives us a new shortest path to 2 and to 3.

29
00:02:22,360 --> 00:02:24,240
Next is 4.

30
00:02:24,240 --> 00:02:30,280
And that gives us new shortest paths to 5 and 6.

31
00:02:30,280 --> 00:02:33,320
Next in topological order is 7.

32
00:02:33,320 --> 00:02:34,320
Relax.

33
00:02:34,320 --> 00:02:39,719
And that gives us the new shortest path to 2 but not to 5.

34
00:02:39,719 --> 00:02:44,080
The path that we already had to 5 is better.

35
00:02:44,080 --> 00:02:47,000
So next to the order is 5.

36
00:02:47,000 --> 00:02:48,000
Relax along edges.

37
00:02:48,000 --> 00:02:53,640
And it gives us better ways to get to both 2 and to 6.

38
00:02:53,639 --> 00:02:58,279
And then we do 3 and relax.

39
00:02:58,279 --> 00:02:59,479
And that's as a help.

40
00:02:59,479 --> 00:03:02,479
And then we do 6.

41
00:03:02,479 --> 00:03:08,000
And when we're done, all we did was consider the edges in topological order and relax.

42
00:03:08,000 --> 00:03:21,119
Then we have a shortest path to 3 from the source to every vertex in the directed a-cyclic

43
00:03:21,120 --> 00:03:25,680
weighted diagram.

44
00:03:25,680 --> 00:03:29,520
So that's a demo of a simple algorithm for that case.

45
00:03:29,520 --> 00:03:30,520
All right.

46
00:03:30,520 --> 00:03:37,400
Why does that algorithm considering the vertices in topological order work for iterated

47
00:03:37,400 --> 00:03:39,200
digs?

48
00:03:39,200 --> 00:03:44,759
Now one thing that's pretty important about this is that the edge of weights could even

49
00:03:44,759 --> 00:03:48,680
be negative, doesn't matter to this algorithm.

50
00:03:48,680 --> 00:03:51,200
So let's look again.

51
00:03:51,200 --> 00:03:55,560
Every edge is relaxed exactly one.

52
00:03:55,560 --> 00:04:04,040
When we add a vertex to the tree, we relax each of the edges that go from that vertex.

53
00:04:04,040 --> 00:04:10,439
And again, just as with Dykstra, after we're done with the relaxation, we have this condition

54
00:04:10,439 --> 00:04:16,720
hold that distance w is less than or equal distance to v plus the edge weight.

55
00:04:16,720 --> 00:04:21,920
Either it was beforehand and we ignored the weight or we made it equal.

56
00:04:21,920 --> 00:04:30,040
And so when we relax an edge, we have that condition.

57
00:04:30,040 --> 00:04:35,520
And again, the inequality holds until the algorithm terminates.

58
00:04:35,520 --> 00:04:43,600
Well first, again, we only decrease values in the distru array.

59
00:04:43,600 --> 00:04:44,600
We don't change at the increase.

60
00:04:44,600 --> 00:04:49,960
So the only thing that can happen to distru w is that it gets smaller and that's not going

61
00:04:49,960 --> 00:04:52,920
to violate the inequality.

62
00:04:52,920 --> 00:04:58,920
And then the other thing is distru v is not going to change because of the topological

63
00:04:58,920 --> 00:05:00,240
order.

64
00:05:00,240 --> 00:05:04,260
When we process v's in topological order, that means we're not going to find an edge that

65
00:05:04,260 --> 00:05:05,920
points to v.

66
00:05:05,920 --> 00:05:10,240
So distru v is not going to change and the edge weight doesn't change.

67
00:05:10,240 --> 00:05:12,160
So the inequality holds.

68
00:05:12,160 --> 00:05:16,800
This is true even if the edge weights are negative.

69
00:05:16,800 --> 00:05:20,439
So shortest path up the malady conditions hold.

70
00:05:20,439 --> 00:05:28,080
And so this simple algorithm finds shortest path in the edge weighted directed acycocraft,

71
00:05:28,080 --> 00:05:35,960
whether or not the edge weights are positive or negative.

72
00:05:35,960 --> 00:05:38,680
Pretty easy algorithm to implement.

73
00:05:38,680 --> 00:05:42,840
So this is acyclic shortest path.

74
00:05:42,840 --> 00:05:46,280
So the goal is to compute edge 2 and distru.

75
00:05:46,280 --> 00:05:50,360
And then we use those to respond to client queries of the length of the shortest path in

76
00:05:50,360 --> 00:05:52,960
the path itself.

77
00:05:52,960 --> 00:05:54,920
This is the constructor.

78
00:05:54,920 --> 00:05:56,600
We build the array.

79
00:05:56,600 --> 00:06:02,319
We initialize his distances to infinity, distance to source to zero.

80
00:06:02,319 --> 00:06:11,319
And then we use our topological sort algorithm on digraph to compute an interval that gives

81
00:06:11,319 --> 00:06:15,040
us the vertices in topological order.

82
00:06:15,040 --> 00:06:19,079
And that's the order method in this topological class.

83
00:06:19,079 --> 00:06:27,240
That's using the API that we set up for topological sorting, which has to be adapted to weighted

84
00:06:27,240 --> 00:06:28,240
digraphs.

85
00:06:28,240 --> 00:06:34,240
But that's just adding some moment clature.

86
00:06:34,240 --> 00:06:37,759
So we take the vertices in topological order.

87
00:06:37,759 --> 00:06:43,439
We take for every vertex in topological order, take in topological order, we take every

88
00:06:43,439 --> 00:06:46,680
edge that emanates from that vertex and relax it.

89
00:06:46,680 --> 00:06:49,040
That couldn't be simpler.

90
00:06:49,040 --> 00:06:50,040
And then we're done.

91
00:06:50,040 --> 00:06:56,840
We have the shortest path in that work, even for negative edge weights.

92
00:06:56,840 --> 00:06:58,560
Pretty simple.

93
00:06:58,560 --> 00:07:08,320
Now as an example of a familiar application of shortest paths in digs and weighted digs,

94
00:07:08,320 --> 00:07:12,520
we'll look at the idea of seam carving.

95
00:07:12,520 --> 00:07:18,560
This is a relatively recent algorithm that was developed that has an important application

96
00:07:18,560 --> 00:07:23,120
that you'll see in this YouTube film clip.

97
00:07:23,120 --> 00:07:27,639
Seem carving for content aware image resizing.

98
00:07:27,639 --> 00:07:31,560
Digital media today has the ability to support dynamic page layouts.

99
00:07:31,560 --> 00:07:35,680
By changing the window or display size, we can change the layout of a document.

100
00:07:35,680 --> 00:07:40,759
However, images embedded in a document typically remain rigid in size and shape.

101
00:07:40,759 --> 00:07:44,800
Resizing is also important to fit images into different displays.

102
00:07:44,800 --> 00:07:48,480
Some techniques, including cropping or scaling, are limited in their abilities to capture

103
00:07:48,480 --> 00:07:51,560
the image content.

104
00:07:51,560 --> 00:07:54,920
We present a method for content aware resizing of images.

105
00:07:54,920 --> 00:07:59,120
Our technique enables resizing while adapting the image content and layout.

106
00:07:59,120 --> 00:08:06,560
This is sometimes called retargeting.

107
00:08:06,560 --> 00:08:12,960
We also define a flexible multi-size representation for images that supports continuous resizing.

108
00:08:13,959 --> 00:08:18,479
An image can be shrunken and non-uniform in a manner while preserving its features,

109
00:08:18,479 --> 00:08:24,319
but it can also be extended beyond its original size.

110
00:08:24,319 --> 00:08:28,399
Instead of scrolling through images that do not fit in a given display, we gracefully

111
00:08:28,399 --> 00:08:34,480
resize them to fit inside the window.

112
00:08:34,480 --> 00:08:37,720
For example, assume that we need to change the width of an image.

113
00:08:37,720 --> 00:08:41,879
The simplest way to do this is to remove columns of pixels from the image.

114
00:08:41,879 --> 00:08:46,679
The best column to remove would be the least noticeable or least important column.

115
00:08:46,679 --> 00:08:50,799
We can search for this column by defining an important Sir Energy function on the image.

116
00:08:50,799 --> 00:08:54,879
In this example, we use the gradient magnitude of the image.

117
00:08:54,879 --> 00:08:58,360
Next we look for the column which contains the least energy and remove it.

118
00:08:58,360 --> 00:09:02,039
However, using such an approach quickly leads to serious artifacts.

119
00:09:02,039 --> 00:09:06,240
Therefore, instead of using rigid columns, we search for connected paths of pixels or

120
00:09:06,240 --> 00:09:11,679
seams from one side of the image to the other that contain the least energy.

121
00:09:11,679 --> 00:09:15,519
This can be done using a simple dynamic programming algorithm that is described in the paper

122
00:09:15,519 --> 00:09:19,159
in both vertical and horizontal directions.

123
00:09:19,159 --> 00:09:23,599
Here is another example of an image, its energy function, and the least noticeable horizontal

124
00:09:23,599 --> 00:09:27,279
and vertical seams.

125
00:09:27,279 --> 00:09:32,279
By successfully removing horizontal and vertical seams, the image can be resized in a non-uniform

126
00:09:32,279 --> 00:09:33,919
manner.

127
00:09:33,919 --> 00:09:38,120
The order of seam removal in an image defines an order on the pixels of the image.

128
00:09:38,120 --> 00:09:44,960
By storing the simple indexing information, we create content to wear multi-size images.

129
00:09:44,960 --> 00:09:53,240
So that's an amazingly powerful image processing process.

130
00:09:53,240 --> 00:10:01,000
You'll find it all over image processing applications from Photoshop to GIMP to Image Magic.

131
00:10:01,000 --> 00:10:08,919
And actually nowadays, almost any image that you see on your cell phone or your tablet.

132
00:10:08,919 --> 00:10:12,480
What really does that have to do with shortest paths?

133
00:10:12,480 --> 00:10:21,919
Well, it's actually a direct application of shortest paths on a directed acyclic graph.

134
00:10:21,919 --> 00:10:25,600
So what we do is build a huge directed acyclic graph.

135
00:10:25,600 --> 00:10:32,800
This is a really huge graph because images now at high resolution can have millions or

136
00:10:32,800 --> 00:10:35,600
billions of pixels.

137
00:10:35,600 --> 00:10:41,000
And so every pixel corresponds to a vertex in this graph.

138
00:10:41,000 --> 00:10:47,639
And the edges are going to be just directed edges from every pixel to its three downward

139
00:10:47,639 --> 00:10:50,440
neighbors.

140
00:10:50,440 --> 00:10:53,639
And then there's what weight do we assign to the pixels?

141
00:10:53,639 --> 00:10:58,679
Well, there's an energy function that has to do with the image processing.

142
00:10:58,679 --> 00:11:03,759
That is a function of the eight neighboring pixels.

143
00:11:03,759 --> 00:11:08,199
Every pixel has a relationship with all its neighboring pixels.

144
00:11:08,199 --> 00:11:19,439
And the energy function is an image processing concept that is perfect for assigning weights

145
00:11:19,439 --> 00:11:22,080
in this instance.

146
00:11:22,080 --> 00:11:24,840
And so that is the weights.

147
00:11:24,840 --> 00:11:31,320
And then a seam is just the shortest path that goes from the top to the bottom.

148
00:11:31,320 --> 00:11:39,600
So you can imagine the imaginary source that goes all to the top ones and just run the shortest

149
00:11:39,600 --> 00:11:42,560
path algorithm that we just gave.

150
00:11:42,560 --> 00:11:45,960
And it'll find a seam.

151
00:11:45,960 --> 00:11:51,639
So that's the lowest energy one pixel cut through the image.

152
00:11:51,639 --> 00:12:00,519
And then the resizing algorithm just deletes one pixel on each row along that seam and that's

153
00:12:00,519 --> 00:12:01,519
the algorithm.

154
00:12:01,519 --> 00:12:12,120
So the shortest path algorithm that allows and enables the resizing for a really huge graph.

155
00:12:12,120 --> 00:12:18,080
And it's really important to realize that you have to have an efficient implementation

156
00:12:18,080 --> 00:12:22,320
of the shortest path algorithm because there's so many pixels.

157
00:12:22,320 --> 00:12:27,120
And certainly the topological sort algorithm that we gave is extremely efficient linear

158
00:12:27,120 --> 00:12:28,679
time algorithm.

159
00:12:28,679 --> 00:12:33,879
And you can see the effects of that efficient algorithm all around you.

160
00:12:33,879 --> 00:12:41,919
Here's another completely different application of shortest paths in directed acyclic graph.

161
00:12:41,919 --> 00:12:51,439
And the idea is that actually since negative weights are allowed, we can find longest path

162
00:12:51,439 --> 00:12:57,639
in educated dags just by negating all the weights.

163
00:12:57,639 --> 00:13:06,319
So what I want is I have an educated dag.

164
00:13:06,319 --> 00:13:10,319
And what I want is this is with I guess five of the source.

165
00:13:10,320 --> 00:13:13,120
I don't want the shortest path from five to two.

166
00:13:13,120 --> 00:13:16,160
I want the longest path from five to two.

167
00:13:16,160 --> 00:13:20,120
I will see an application why that's important in a minute.

168
00:13:20,120 --> 00:13:26,680
In order to get that, all I do is just negate all the weights and then run shortest path.

169
00:13:26,680 --> 00:13:33,200
And if you add up negative weights to get the smallest negative number, then negate the

170
00:13:33,200 --> 00:13:34,200
answer.

171
00:13:34,200 --> 00:13:36,920
That's the longest path.

172
00:13:36,919 --> 00:13:43,039
And it works because the algorithm topological sort algorithm doesn't care whether the weights

173
00:13:43,039 --> 00:13:45,039
are positive or negative.

174
00:13:45,039 --> 00:13:50,120
In general graphs, it does matter as we'll see in a minute, but for acyclic graph doesn't

175
00:13:50,120 --> 00:13:51,120
matter.

176
00:13:51,120 --> 00:13:56,240
We can find longest paths in acyclic graphs just by negating all the weights.

177
00:13:56,240 --> 00:14:00,599
Therefore we can solve the longest paths problem.

178
00:14:00,599 --> 00:14:02,199
So that's a key point.

179
00:14:02,199 --> 00:14:05,839
And now we can look at applications of that problem.

180
00:14:05,840 --> 00:14:11,200
And there's a really important application for longest path in aged weighted, directed

181
00:14:11,200 --> 00:14:12,960
acyclic graphs.

182
00:14:12,960 --> 00:14:16,120
And that's called the job scheduling problem.

183
00:14:16,120 --> 00:14:21,560
And this is just another example to show the importance of the shortest paths problem as

184
00:14:21,560 --> 00:14:24,280
a problem solving model.

185
00:14:24,280 --> 00:14:28,440
This particular problem doesn't seem related to shortest paths at all, but we'll show how

186
00:14:28,440 --> 00:14:31,320
to formulate it as a shortest path problem.

187
00:14:31,320 --> 00:14:34,879
And that's great because we have an efficient solution to the shortest path problem.

188
00:14:34,879 --> 00:14:38,600
Or actually it's the longest path problem in this case.

189
00:14:38,600 --> 00:14:45,960
So this is just an example that arises in manufacturing or other applications.

190
00:14:45,960 --> 00:14:49,279
We have a complex set of interacting processes.

191
00:14:49,279 --> 00:14:52,960
So this is called job scheduling, parallel job scheduling.

192
00:14:52,960 --> 00:14:58,559
So I've got a bunch of, as I say, a factory manager has a bunch of jobs to manage and

193
00:14:58,559 --> 00:15:03,240
they have durations and precedence constraints.

194
00:15:03,240 --> 00:15:07,440
So durations just means the job takes a certain amount of time.

195
00:15:07,440 --> 00:15:14,720
And precedence constraints means that you can't start job one until after job zero is done.

196
00:15:14,720 --> 00:15:21,879
Or seven or nine, one seven and nine, have to start sometime after job zero.

197
00:15:21,879 --> 00:15:27,320
And similarly three and eight have to start after six and so forth.

198
00:15:27,320 --> 00:15:29,759
So maybe this is manufacturing a car.

199
00:15:30,600 --> 00:15:36,480
You can paint the car until after you put the doors on or whatever else you can imagine.

200
00:15:36,480 --> 00:15:46,799
Easily setting up precedence constraints that are natural for trying to complete this whole set of job.

201
00:15:46,799 --> 00:15:56,279
And so what we want to do is find a start time for each job that minimizes the completion time.

202
00:15:56,279 --> 00:16:00,799
While still respecting all the precedence constraints.

203
00:16:00,799 --> 00:16:02,559
So when do we start each job?

204
00:16:02,559 --> 00:16:05,240
That's the parallel job scheduling problem.

205
00:16:05,240 --> 00:16:10,079
We assume that we've got enough workers that we can have a bunch of jobs going on at the same time.

206
00:16:10,079 --> 00:16:11,879
Same time.

207
00:16:11,879 --> 00:16:25,079
So this graph model shows that we can change the job scheduling problem into a graph processing problem.

208
00:16:25,080 --> 00:16:31,680
So what we're going to do is create an edge weighted directed a cyclic graph the following way.

209
00:16:31,680 --> 00:16:41,680
We're going to have a source and sink vertex that the source is begin everything and the sink is end everything.

210
00:16:41,680 --> 00:16:47,960
And then we'll have a zero weight edge from the for every job.

211
00:16:47,960 --> 00:16:51,200
We'll have a start and a finish vertex for that job.

212
00:16:51,200 --> 00:16:55,759
And then we'll have an edge whose weight is the duration.

213
00:16:55,759 --> 00:17:06,360
And from the finish vertex of every job, we'll have edges to the start vertex of the jobs that it has to complete before that those are the precedence constraints.

214
00:17:06,360 --> 00:17:19,680
We have a zero weight edge from the overall source to every job start and a zero weight edge from the overall from every job finish to the sink vertex.

215
00:17:19,680 --> 00:17:24,880
And so in summary, there's three edges for every job.

216
00:17:24,880 --> 00:17:34,279
This is from the beginning to the end, the start to the finish, weighted by the duration from the source to the beginning zero weight and from the end of the sink zero weight.

217
00:17:34,279 --> 00:17:39,720
And the edges for the precedence constraints also have zero weight.

218
00:17:39,720 --> 00:17:41,840
So that's a graph model.

219
00:17:41,839 --> 00:17:45,759
We took our scheduling problem and now we have a graph.

220
00:17:45,759 --> 00:17:58,879
And what relates this to what we've been talking about is the longest path from the source to each job turns out to give a schedule.

221
00:17:58,879 --> 00:18:09,319
So the job scheduling problem corresponds to a solution to the longest path problem in directed acyclic graph.

222
00:18:09,319 --> 00:18:16,679
By the way, this graph doesn't have any cycles because that would mean you'd have to do a job before another job.

223
00:18:16,679 --> 00:18:21,799
It insists that one be done after zero and the two be done after one.

224
00:18:21,799 --> 00:18:31,599
You can't also insist that zero be done after two because that would be a precedence cycle that couldn't be satisfied at all.

225
00:18:31,599 --> 00:18:42,799
And so now you have to think about this quite a while to understand why the longest path from the source will schedule each job.

226
00:18:42,799 --> 00:18:50,439
But that's a fact in that it means then we have a fast linear time algorithm for solving this problem.

227
00:18:50,439 --> 00:18:57,839
On the gate all the weights run shortest paths with topological sort and the gate the answer and you have the start time for every job.

228
00:18:57,839 --> 00:19:08,480
In fact, in the book in the book site you'll find code that solves this schedule and parallel job scheduling problem using the critical path method.

229
00:19:08,480 --> 00:19:15,679
Again, showing how important it is to have a fast and efficient solution to the shortest paths problem.

