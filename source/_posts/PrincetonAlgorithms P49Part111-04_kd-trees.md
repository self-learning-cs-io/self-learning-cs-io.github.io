---
title: PrincetonAlgorithms P49Part111 04_kd Trees
---

1
00:00:00,000 --> 00:00:08,359
Now we're going to look at KD trees, which is an extension of BSTs that allow us to do

2
00:00:08,359 --> 00:00:16,240
efficient processing of sets of points in space, and it's very flexible and very useful

3
00:00:16,240 --> 00:00:19,359
in lots of applications.

4
00:00:19,359 --> 00:00:26,560
So now we're going to extend the API to talk about two-dimensional keys.

5
00:00:26,559 --> 00:00:35,839
So that's just, you can think of two-dimensional keys as points in two-dimensional geometric space.

6
00:00:35,839 --> 00:00:39,039
We're going to talk about insertion and search.

7
00:00:39,039 --> 00:00:43,759
We want to talk about deletion and then range search and range count.

8
00:00:43,759 --> 00:00:49,320
So we want to be able to insert and delete points and think of a two-dimensional key as

9
00:00:49,320 --> 00:00:51,239
a point in two-dimensional space.

10
00:00:51,239 --> 00:00:56,239
And we want to be able to find all keys that lie within a two-dimensional range.

11
00:00:56,240 --> 00:01:02,320
It's a rectangle, as I mentioned at the beginning, or count the number of keys that lie in a two-dimensional range.

12
00:01:02,320 --> 00:01:18,159
So again, the geometric interpretation is the keys are points in the plane, and we have a range, 2D range, is a rectangle, or is oriented to align with the horizontal vertical axes.

13
00:01:18,159 --> 00:01:24,159
And we want to be able to find or count the points in a given rectangle.

14
00:01:24,159 --> 00:01:31,119
And this one has many, many applications, and we'll talk about some of them later on.

15
00:01:31,119 --> 00:01:44,920
And even if it's not points in the plane, just databases, you might ask for all the people with incomes between 1 million and 10 million who are between at 40 and 50 years of age.

16
00:01:44,920 --> 00:01:51,560
And this kind of algorithm and data structure would be useful for that kind of situation too.

17
00:01:51,560 --> 00:02:04,719
So how are we going to solve this problem, implement this API, rebuild a data structure containing points that can efficiently support range searching and range counting?

18
00:02:04,719 --> 00:02:11,439
Well, one easy way to do it is to just think about dividing space into a grid of squares.

19
00:02:11,439 --> 00:02:17,159
So we'll pick a parameter M and divide space into an N by M grid of squares.

20
00:02:17,159 --> 00:02:24,199
And then process all the points and make a list of points that are contained in each square.

21
00:02:24,199 --> 00:02:31,639
We can use a two-dimensional array to directly index relevant squares.

22
00:02:31,639 --> 00:02:40,719
And for insert, you just take x, y, figure out which square belongs to, simply divide by both coordinates by M and

23
00:02:40,719 --> 00:02:47,120
look in the two-dimensional array, and just add the point to the list for the corresponding square.

24
00:02:47,120 --> 00:02:55,560
Then range search is only find the squares that intersect the query and process the points in that square.

25
00:02:55,560 --> 00:03:01,680
And depending on the value of the parameter M, you have a space-time trade-off.

26
00:03:01,680 --> 00:03:07,759
The amount of space required is M squared for the grid plus N.

27
00:03:07,759 --> 00:03:12,759
You have to have a linked list element or whatever for each point.

28
00:03:12,759 --> 00:03:17,120
And then the time, though, gets divided by M squared.

29
00:03:17,120 --> 00:03:23,199
Your number of points M are spread out over the M squared different squares.

30
00:03:23,199 --> 00:03:30,000
And so on average, you examine N over M squared points per square.

31
00:03:30,000 --> 00:03:32,000
So you don't want to make M too big.

32
00:03:32,000 --> 00:03:33,319
I'll be too much space.

33
00:03:33,319 --> 00:03:35,359
You don't want to make M too small.

34
00:03:35,359 --> 00:03:38,079
Be too much time.

35
00:03:38,080 --> 00:03:43,680
So what we want to choose is the square size that would best balance these two needs.

36
00:03:43,680 --> 00:03:49,720
And then it's easy to see that what you should choose is M to be about square root of N.

37
00:03:49,720 --> 00:03:58,480
So then your space is within a constant factor of N and your time is constant.

38
00:03:58,480 --> 00:04:02,600
So if the points are randomly distributed, then this is ideal.

39
00:04:02,599 --> 00:04:07,799
It takes a linear time to initialize the data structure.

40
00:04:07,799 --> 00:04:12,400
And to insert and search, it takes constant time per point in the range.

41
00:04:12,400 --> 00:04:19,079
And this is absolutely a fine method that is not that difficult to implement in the case

42
00:04:19,079 --> 00:04:22,079
that the points are evenly distributed.

43
00:04:22,079 --> 00:04:31,000
Unfortunately, it's usually the case that in geometric data that the points are not evenly distributed.

44
00:04:31,000 --> 00:04:34,279
So well-known phenomena known as clustering.

45
00:04:34,279 --> 00:04:40,839
It says that the points aren't going to be evenly distributed all over the whole thing.

46
00:04:40,839 --> 00:04:45,759
In the case of the grid implementation, they might all fall in the same square.

47
00:04:45,759 --> 00:04:48,360
And so the average list length is short.

48
00:04:48,360 --> 00:04:51,240
This is like what we're countered with hashing.

49
00:04:51,240 --> 00:04:57,360
If you take all the points in one square in zero and all the rest of them,

50
00:04:57,360 --> 00:05:00,600
your average is still in over M squared.

51
00:05:00,600 --> 00:05:03,319
But they're all in that long list.

52
00:05:03,319 --> 00:05:09,040
And you're going to have a slow algorithm if it's based on this.

53
00:05:09,040 --> 00:05:16,199
So we need a data structure that more gracefully adapts to the distribution of the data.

54
00:05:16,199 --> 00:05:22,360
And again, it's well known that most geometric data has this kind of problem.

55
00:05:22,360 --> 00:05:28,639
So for example, here's some data which is cities in the US.

56
00:05:28,639 --> 00:05:30,520
It's got 13,000 points.

57
00:05:30,520 --> 00:05:34,800
But if you tried to use the grid implementation for this,

58
00:05:34,800 --> 00:05:39,120
you find that half the squares would be empty.

59
00:05:39,120 --> 00:05:43,199
And half the points are in just 10% of the squares.

60
00:05:43,199 --> 00:05:48,879
So the clustering in the data is going to make the implementation inefficient.

61
00:05:48,879 --> 00:05:51,160
We need to adapt to the data.

62
00:05:51,160 --> 00:05:55,200
And this is very, very typical in geometric data,

63
00:05:55,200 --> 00:06:00,360
particularly in higher dimensional data, as we'll see in a minute.

64
00:06:00,360 --> 00:06:08,360
So people have developed all different kinds of methods for adapting in this way.

65
00:06:08,360 --> 00:06:12,080
And what we're going to look at is one of the most widely used,

66
00:06:12,080 --> 00:06:18,400
which is basically to use a tree to represent a recursive subdivision of the plane

67
00:06:18,400 --> 00:06:20,800
of two-dimensional space.

68
00:06:20,800 --> 00:06:22,079
It's going to be recursive.

69
00:06:22,079 --> 00:06:26,560
It's going to be based on the points, the way in which we divide into half planes.

70
00:06:26,560 --> 00:06:32,120
And it's one of many different algorithms that have been studied for this.

71
00:06:32,120 --> 00:06:37,160
But again, it's a simple one and widely used.

72
00:06:37,160 --> 00:06:43,560
So for example, if you've played the game Doom or used a flight simulator,

73
00:06:43,560 --> 00:06:50,240
that these types of graphical simulations and animations

74
00:06:50,240 --> 00:06:56,280
are made possible only through the use of space partitioning trees,

75
00:06:56,280 --> 00:06:58,960
like 2D trees and quadrrees.

76
00:06:58,960 --> 00:07:05,160
And also in all different types of scientific data processing,

77
00:07:05,160 --> 00:07:07,840
these things are extremely important.

78
00:07:07,840 --> 00:07:10,560
Whenever you're processing geometric data,

79
00:07:10,560 --> 00:07:12,960
you're doing some kind of geometric search.

80
00:07:12,960 --> 00:07:14,400
Where's the closest thing?

81
00:07:14,400 --> 00:07:17,000
How am I going to find the closest thing efficiently?

82
00:07:17,000 --> 00:07:19,879
What things are nearby, and so forth?

83
00:07:19,879 --> 00:07:27,319
So rest assured, these types of algorithms lie at the heart of any program that you use

84
00:07:27,319 --> 00:07:32,199
that is evolving a lot of geometric data.

85
00:07:32,199 --> 00:07:36,040
So those are just two examples.

86
00:07:36,040 --> 00:07:37,759
So let's look at how it looks now.

87
00:07:37,759 --> 00:07:45,560
So 2D tree is, again, it's going to be a data structure based on a bunch of points

88
00:07:45,560 --> 00:07:50,000
that's going to facilitate efficient data processing of these points.

89
00:07:50,000 --> 00:07:57,000
So just as we do for symbol tables where we take keys, now we're going to take points,

90
00:07:57,000 --> 00:07:59,920
and we're going to build a data structure based on these points.

91
00:07:59,920 --> 00:08:08,399
And the idea is to build a tree that corresponds to recursively partitioning the plane.

92
00:08:08,399 --> 00:08:13,680
So arbitrarily, our first point, we're going to divide the plane into two parts

93
00:08:13,680 --> 00:08:17,000
based on a vertical line through that point.

94
00:08:17,000 --> 00:08:23,879
So now in the tree, on the right there, all the points that fall to the left of the first

95
00:08:23,879 --> 00:08:28,160
point are going to be on the left, and all the points that fall to the right of that first

96
00:08:28,160 --> 00:08:30,639
point are going to be on the right.

97
00:08:30,639 --> 00:08:36,919
But then we get to the next point, we'll switch, and we'll partition on a horizontal line.

98
00:08:36,919 --> 00:08:44,759
So now our second point in the tree, the left subtree corresponds to everybody below

99
00:08:44,759 --> 00:08:51,759
that horizontal line, and the right subtree corresponds to everybody above it.

100
00:08:51,759 --> 00:08:53,559
It's similar.

101
00:08:53,559 --> 00:08:59,039
If our third point comes on the left, again, we'll partition according to the horizontal

102
00:08:59,039 --> 00:09:01,480
line through that point on the left.

103
00:09:01,480 --> 00:09:08,080
So if we go left and then left, that means all the points to the left of one and above

104
00:09:08,080 --> 00:09:16,600
three, so the square in the upper left is represented by that node in the tree.

105
00:09:16,600 --> 00:09:22,560
And again, now when we go to one level below, we switch again to vertical, alternate between

106
00:09:22,560 --> 00:09:26,680
horizontal and vertical partitioning of the plane.

107
00:09:26,679 --> 00:09:32,000
So it's a regular binary search tree, but it's got this interpretation based on the geometric

108
00:09:32,000 --> 00:09:39,559
data where we switch which key we use for the comparison, the x-quarn or the y-carn at

109
00:09:39,559 --> 00:09:44,439
each level, and that corresponds to this partitioning of the plane.

110
00:09:44,439 --> 00:09:48,839
So now five comes in, that's to the left of four, because it was partitioned on a vertical,

111
00:09:48,839 --> 00:09:52,439
and five's going to partition on a horizontal.

112
00:09:52,440 --> 00:10:02,240
And this is a simple and completely well-defined partitioning of the plane corresponding to a

113
00:10:02,240 --> 00:10:05,600
binary tree.

114
00:10:05,600 --> 00:10:11,080
Now the ninth point, well, is to the left of eight, above two, to the left of eight, and then

115
00:10:11,080 --> 00:10:14,640
corresponds to horizontal partitioning.

116
00:10:14,639 --> 00:10:20,919
The ninth point is to the right of one, it's below two, so we go to the left, and it's

117
00:10:20,919 --> 00:10:25,279
to the right of seven, so we go to the right.

118
00:10:25,279 --> 00:10:34,679
So that's a way to build a binary tree corresponding to partitioning of the plane.

119
00:10:34,679 --> 00:10:39,919
And it's really the same as a binary search tree, it's just that we alternate which coordinate

120
00:10:39,919 --> 00:10:41,919
we use as the key.

121
00:10:41,919 --> 00:10:46,639
At the even levels, we think of a vertical line, and the left subtrees all the points to

122
00:10:46,639 --> 00:10:49,879
the left, and the right subtrees all the points to the right.

123
00:10:49,879 --> 00:10:54,319
On odd levels, we use a horizontal line, and the left subtrees all points below, and the

124
00:10:54,319 --> 00:10:57,519
right subtrees all points above.

125
00:10:57,519 --> 00:11:03,759
And the code for this is, you know, the same as for binary search trees, it's simply which

126
00:11:03,759 --> 00:11:08,360
coordinate we use for the comparison, that's the only difference.

127
00:11:08,360 --> 00:11:11,720
So that's 2D tree implementation.

128
00:11:11,720 --> 00:11:18,279
So now what about solving a problem like this rain search problem for a 2D tree?

129
00:11:18,279 --> 00:11:24,200
So now we have a query like this green rectangle, and what we want to find is all the points

130
00:11:24,200 --> 00:11:27,440
in the data structure that fall within that rectangle.

131
00:11:27,440 --> 00:11:33,600
Well, we're going to use the 2D tree represents our points, and we're going to use the structure

132
00:11:33,600 --> 00:11:41,680
and definition of that tree to go ahead and help us find the points that are in the rectangle.

133
00:11:41,680 --> 00:11:46,840
If the root node lies in the rectangle, then we're done.

134
00:11:46,840 --> 00:11:54,519
We can return that point, but we have to look on both sides to look for more, but if the

135
00:11:54,519 --> 00:12:00,160
rectangle lies to the left of the root node, then we only have to look in the left and

136
00:12:00,160 --> 00:12:01,160
so forth.

137
00:12:01,159 --> 00:12:07,000
So look at how this works in a demo.

138
00:12:07,000 --> 00:12:10,839
All right, so we're going to try to find all the points that are contained in that green

139
00:12:10,839 --> 00:12:13,279
query rectangle.

140
00:12:13,279 --> 00:12:18,480
So first thing is to check if our rectangle contains the node of the root, in this case

141
00:12:18,480 --> 00:12:20,079
it doesn't.

142
00:12:20,079 --> 00:12:25,399
So since it's to the left of the splitting line of the root, we only have to search in the

143
00:12:25,399 --> 00:12:27,240
left sub tree.

144
00:12:27,240 --> 00:12:33,320
Now we search the left sub tree, we're going to check if it contains 0.3.

145
00:12:33,320 --> 00:12:39,799
It does not contain 0.3, but now what sub trees do we search?

146
00:12:39,799 --> 00:12:46,279
In this case, the rectangle intersects our splitting line, so we have to search both subtrees,

147
00:12:46,279 --> 00:12:49,519
both above and below.

148
00:12:49,519 --> 00:12:54,399
So first we search the left sub tree, that's the one below.

149
00:12:54,399 --> 00:12:55,720
Does it contain 0.4?

150
00:12:55,720 --> 00:12:57,559
No.

151
00:12:57,559 --> 00:13:02,960
It's to the left, so we only have to search the left sub tree of 0.4.

152
00:13:02,960 --> 00:13:07,480
So we search the left sub tree and we check if it contains 0.5 and it does, that's the

153
00:13:07,480 --> 00:13:10,279
one that we return.

154
00:13:10,279 --> 00:13:13,759
It also intersects the splitting lines.

155
00:13:13,759 --> 00:13:18,360
We have to search both the subtrees, in this case they're both empty.

156
00:13:18,360 --> 00:13:23,259
So we're done with that, but now we have to go back and we have to search the other

157
00:13:23,259 --> 00:13:25,960
sub tree of 0.3.

158
00:13:25,960 --> 00:13:33,560
That's the above, so now we check is 0.6 in the rectangle, in this case it's not.

159
00:13:33,560 --> 00:13:38,519
It's to the left, so we have to search the left sub tree of 0.6 and that one's empty,

160
00:13:38,519 --> 00:13:41,759
and now we return and we're done.

161
00:13:41,759 --> 00:13:45,080
So we don't always go down just one branch.

162
00:13:45,080 --> 00:13:50,560
If our splitting line hits our rectangle we have to go down both branches, but still this

163
00:13:50,560 --> 00:13:53,440
is a very efficient algorithm.

164
00:13:53,440 --> 00:13:57,800
Particularly think about the rectangle being small, it's going to be not that different

165
00:13:57,800 --> 00:14:02,840
than a regular search in a binary search tree.

166
00:14:02,840 --> 00:14:07,840
All right, so what about the analysis of how long is this going to take?

167
00:14:07,840 --> 00:14:15,759
Well again, the typical case, the rectangle's small, that we're only going to examine really

168
00:14:15,759 --> 00:14:21,000
a path of the tree, maybe a couple of other nodes along the path, in the running time will

169
00:14:21,000 --> 00:14:27,080
be proportional to the number of points returned plus log n.

170
00:14:27,080 --> 00:14:33,440
Would geometric data, the worst case, can be bad, so like all the points could be arranged

171
00:14:33,440 --> 00:14:41,240
in a circle, all different types of problems might occur, and with some difficulty it's

172
00:14:41,240 --> 00:14:47,120
possible to prove that even if the tree's balanced you can get a worst case proportional

173
00:14:47,120 --> 00:14:49,120
to square root of that.

174
00:14:49,120 --> 00:14:58,040
So analysis of 2D trees is a bit beyond our scope, but for many practical applications

175
00:14:58,040 --> 00:15:01,680
they're easy to implement and worth using.

176
00:15:01,679 --> 00:15:06,759
Let's look at another using 2D trees to solve another problem, so-called nearest neighbor

177
00:15:06,759 --> 00:15:07,959
search.

178
00:15:07,959 --> 00:15:13,399
So now instead of a rectangle we have a query point and our goal is to find the closest

179
00:15:13,399 --> 00:15:15,319
point to that point.

180
00:15:15,319 --> 00:15:22,120
So in this case our query point is over here in green and the algorithm is going to want

181
00:15:22,120 --> 00:15:26,959
to return 0.5, that's the closest one to the query point.

182
00:15:26,960 --> 00:15:32,639
So let's see how that looks in a demo.

183
00:15:32,639 --> 00:15:37,480
So again we start at the root and what do we want to do?

184
00:15:37,480 --> 00:15:43,000
Well we're going to check, whenever we're out of node it represents a point, so we're

185
00:15:43,000 --> 00:15:50,280
going to check that point and we'll compute the distance from that point to our query point.

186
00:15:50,279 --> 00:15:57,399
And if that distance is less than the best found so far then we'll keep that as the

187
00:15:57,399 --> 00:15:58,399
champion.

188
00:15:58,399 --> 00:16:03,439
So the first point that's the closest we found so far to the query point so we'll save

189
00:16:03,439 --> 00:16:04,959
number one as the distance.

190
00:16:04,959 --> 00:16:10,720
And we'll only worry about the possibility of finding something closer than that.

191
00:16:10,720 --> 00:16:18,959
And so just using that distance we recursively search any part of the tree that could contain

192
00:16:18,960 --> 00:16:22,200
a closer point.

193
00:16:22,200 --> 00:16:26,120
And so that's what we'll continue to do.

194
00:16:26,120 --> 00:16:34,120
So in this case the query point is to the left of the splitting line and we'll always go

195
00:16:34,120 --> 00:16:36,720
towards the query point first.

196
00:16:36,720 --> 00:16:43,240
So in this case we have to search both, there might possibly be a closer point than one

197
00:16:43,240 --> 00:16:44,400
over in the right.

198
00:16:44,400 --> 00:16:47,280
If you come straight across there might be a closer point.

199
00:16:47,279 --> 00:16:50,799
We're going to have to look at both as far as we know now.

200
00:16:50,799 --> 00:16:56,759
But we'll go towards the query point and see if we can find something closer.

201
00:16:56,759 --> 00:17:03,959
So in that case now we go to root 0.3, compute the distance of that point to the query point.

202
00:17:03,959 --> 00:17:09,359
It's closer so we update three to be our new champion.

203
00:17:09,359 --> 00:17:14,160
And so now we're only going to look in parts of the tree that could give us a point that's

204
00:17:14,160 --> 00:17:17,880
closer to our query point than three.

205
00:17:17,880 --> 00:17:23,680
Notice already that'll mean when we get back to point one we won't search the right sub-tree

206
00:17:23,680 --> 00:17:30,240
because there could be no point on the right sub-tree, the right of this splitting line that's

207
00:17:30,240 --> 00:17:32,840
closer to the query point than three.

208
00:17:32,840 --> 00:17:37,800
And so that idea of getting closer and closer to the query point is going to cut out different

209
00:17:37,800 --> 00:17:41,320
parts of the tree as we process.

210
00:17:41,319 --> 00:17:46,000
So in any way starting at point three as far as we know we're going to have to look at

211
00:17:46,000 --> 00:17:47,759
both sub-trees.

212
00:17:47,759 --> 00:17:52,839
So sometimes we look at both sub-trees but as we get closer and closer we only look at

213
00:17:52,839 --> 00:17:53,839
one.

214
00:17:53,839 --> 00:17:56,759
So let's look at point three now.

215
00:17:56,759 --> 00:18:02,599
So again go towards the query point so we'll go to the top first and that takes us to

216
00:18:02,599 --> 00:18:03,599
six.

217
00:18:03,599 --> 00:18:07,000
Six is not any closer to three was.

218
00:18:07,000 --> 00:18:13,079
So that's not going to update our champion.

219
00:18:13,079 --> 00:18:20,279
And so we'll search six is less sub-tree which is empty and then it's right sub-tree.

220
00:18:20,279 --> 00:18:25,200
And while the nearest neighbor can't we don't have to go down the right sub-tree of six

221
00:18:25,200 --> 00:18:31,960
because you can't have a point in that rectangle that's closer to the query point than three.

222
00:18:31,960 --> 00:18:38,240
So now we can return from that and now we have to look at the bottom sub-tree associated

223
00:18:38,240 --> 00:18:40,240
with three.

224
00:18:40,240 --> 00:18:47,279
And so that takes us to four and that one is not closer so we still have three as our

225
00:18:47,279 --> 00:18:49,480
current champion.

226
00:18:49,480 --> 00:18:55,360
So now we'll search the left sub-tree of four first because that query point is to the

227
00:18:55,360 --> 00:18:59,039
left of that splitting line and that takes us to five.

228
00:18:59,039 --> 00:19:05,240
And five is our new champion so that's the closest point that we know about.

229
00:19:05,240 --> 00:19:12,639
Could there be a node that's closer to five to our query point then five in the right

230
00:19:12,639 --> 00:19:16,279
sub-tree of four?

231
00:19:16,279 --> 00:19:20,399
We have to go above sorry to look at the top sub-tree associated with five and find

232
00:19:20,399 --> 00:19:21,639
that it's empty.

233
00:19:21,639 --> 00:19:26,319
And now we're back at four do we have to search the right sub-tree of four?

234
00:19:26,319 --> 00:19:32,639
No because there can't be a closer point than five in the right sub-tree of four.

235
00:19:32,639 --> 00:19:43,679
So we're done with four and we returned to come to three and now we search the,

236
00:19:43,679 --> 00:19:46,919
supposed to search and we turned from there and we're now at one, supposed to search

237
00:19:46,919 --> 00:19:51,799
the right sub-tree of one next but we can prune that nearest neighbor couldn't be in

238
00:19:51,799 --> 00:19:52,799
there.

239
00:19:52,799 --> 00:20:01,639
So then we're done and we found that the nearest neighbor is five and this is going to be

240
00:20:01,639 --> 00:20:06,200
very efficient because as we get closer and closer to the query point we're cutting out

241
00:20:06,200 --> 00:20:11,960
all the sub-trees that are away and again in practice the running time of this algorithm

242
00:20:11,960 --> 00:20:14,440
is going to be close to the logarithmic.

243
00:20:14,440 --> 00:20:21,119
So in typical cases the running time of nearest neighbor search in a 2D tree is going

244
00:20:21,119 --> 00:20:23,519
to be proportional to logarithmic.

245
00:20:23,519 --> 00:20:29,519
It is possible to concoct cases where you're going to have to examine all the points.

246
00:20:29,519 --> 00:20:34,000
For example if they're all arranged in a circle in your query points in the center or

247
00:20:34,000 --> 00:20:40,799
something of that sort but for typical data it's very efficient.

248
00:20:40,799 --> 00:20:45,879
Now we're going to look at an application where we simulate a phenomenon in nature and

249
00:20:45,960 --> 00:20:53,680
this is what kind of patterns do things like starlings and geese or cranes or fish or

250
00:20:53,680 --> 00:20:59,800
fireflies how do they flock together and we're looking at a simulation that corresponds

251
00:20:59,800 --> 00:21:00,800
to that.

252
00:21:00,800 --> 00:21:07,800
And then when the moment is right they behave in a way should be impossible.

253
00:21:45,880 --> 00:21:53,920
Wow!

254
00:22:15,880 --> 00:22:17,880
I'm going to go to the next room.

255
00:22:17,880 --> 00:22:19,880
I'm going to go to the next room.

256
00:22:19,880 --> 00:22:21,880
I'm going to go to the next room.

257
00:22:21,880 --> 00:22:23,880
I'm going to go to the next room.

258
00:22:23,880 --> 00:22:25,880
I'm going to go to the next room.

259
00:22:25,880 --> 00:22:27,880
I'm going to go to the next room.

260
00:22:27,880 --> 00:22:29,880
I'm going to go to the next room.

261
00:22:29,880 --> 00:22:31,880
I'm going to go to the next room.

262
00:22:31,880 --> 00:22:33,880
I'm going to go to the next room.

263
00:22:33,880 --> 00:22:35,880
I'm going to go to the next room.

264
00:22:35,880 --> 00:22:37,880
I'm going to go to the next room.

265
00:22:37,880 --> 00:22:39,880
I'm going to go to the next room.

266
00:22:39,880 --> 00:22:41,880
I'm going to go to the next room.

267
00:22:41,880 --> 00:22:43,880
I'm going to go to the next room.

268
00:22:43,880 --> 00:22:53,880
And it happens every day right through the winter, just a couple of miles from my doorstep.

269
00:22:53,880 --> 00:22:55,880
How good is that?

270
00:22:55,880 --> 00:23:05,880
So, there's a simple model developed by Craig Reynolds a while ago for a similar in this situation called the void.

271
00:23:05,880 --> 00:23:13,880
And the idea is to use three simple rules to you get something very close to this complex flocking behavior.

272
00:23:13,880 --> 00:23:21,880
So, you have collision avoidance where you always try to point away from the K nearest boards.

273
00:23:21,880 --> 00:23:27,880
You have centering where you try to point near the center of mass of the K nearest boards.

274
00:23:27,880 --> 00:23:33,880
And velocity matching where you update your velocity to the average of the K nearest boards.

275
00:23:33,880 --> 00:23:37,880
And that algorithm works like this.

276
00:23:37,880 --> 00:23:47,880
So, as that example shows, two D-trees are extremely effective in quickly processing huge amounts of geometric data.

277
00:23:47,880 --> 00:23:51,880
And what's more, it expands to more dimensions.

278
00:23:51,880 --> 00:24:00,880
With a very simple modification, we can take a 2D tree and create a data structure known as a K-D tree, which even works for K dimensions.

279
00:24:00,880 --> 00:24:08,880
And the idea is, even if there's K dimension, what we'll do is recursively partition one dimension at a time.

280
00:24:08,880 --> 00:24:12,880
So, that's called a K-D tree.

281
00:24:12,880 --> 00:24:17,880
And we use the same idea as for 2D trees.

282
00:24:17,880 --> 00:24:24,880
But instead of cycling through just horizontal vertical, we cycle through however many dimensions there are.

283
00:24:24,880 --> 00:24:32,880
So, it's in three space, we use a plane and do above and below, and then simply cycle through the dimensions.

284
00:24:32,880 --> 00:24:42,880
At level I, we put on the left the points whose I'd coordinate are less than P. And on the right we put the points whose I'd coordinates are greater than P.

285
00:24:42,880 --> 00:24:54,880
And at level, cycle through the dimensions, at level I mod K, we just use that dimension of the point to do the comparison.

286
00:24:54,880 --> 00:25:02,880
Implementation is simple, except for the comparison, and we get the same kind of partitioning for three-dimensional data.

287
00:25:02,880 --> 00:25:18,880
So, we could do boards in three dimensions. Or for databases with a large number of dimensions, you could do even much higher dimensional data and find nearest neighbors and do range searching extremely efficiently.

288
00:25:18,880 --> 00:25:26,880
It's a very efficient and simple data structure for processing K-dimensional data that's very widely used.

289
00:25:26,880 --> 00:25:32,880
And the whole idea is that data clusters, particularly in high dimensions.

290
00:25:32,880 --> 00:25:41,880
And also one point to make for this class is that this algorithm was discovered by an undergraduate in an algorithms class.

291
00:25:41,880 --> 00:25:47,880
So, that's John Bentley who discovered this while an undergraduate at Stanford.

292
00:25:47,880 --> 00:26:04,880
And so, it's a simple idea that, but expert scientists were struggling with dealing with huge amounts of geometric data and Bentley found this way to process it efficiently that's been widely used ever since.

293
00:26:04,880 --> 00:26:20,880
And in particular, just as another example, consider the idea of in-body simulation, which is a classic problem in physics, where you've got in particles mutually affected by gravity.

294
00:26:20,880 --> 00:26:31,880
And basically, the computation is based on computing the interacting force for each pair of particles.

295
00:26:31,880 --> 00:26:44,880
And so, then there'd be mutual gravitational pull. And this is what happens with large number of particles in a certain simulation.

296
00:26:44,880 --> 00:26:58,880
And people understand properties in the universe by coming up with doing these kinds of calculations and comparing against what's observed in space.

297
00:26:58,880 --> 00:27:09,880
Now, but the thing is, for each pair of particles. So, if you have n particles and you have to do it for each pair, that's n squared.

298
00:27:09,880 --> 00:27:20,880
So, the progress of scientific investigation is going to be affected by how quickly you can do this calculation for large number of particles.

299
00:27:20,880 --> 00:27:29,880
There's a lot of particles out in the universe, and you can't do a quadratic calculation for large n.

300
00:27:29,880 --> 00:27:42,880
So, another undergraduate in an algorithms class discovered this idea for in-body simulation. And that's Andrew O'Pell.

301
00:27:42,880 --> 00:28:02,880
And his idea was that if some particle is way away from some cluster of particles, we can treat that cluster as a single aggregate particle, and not do the individual force calculation between our particle and every one of those in the aggregate, but use the center of mass.

302
00:28:02,880 --> 00:28:20,880
And you get a very accurate approximation to the n body doing that. And the algorithm that he used is based on 3D trees with the n particles as nodes, and storing the center of a mass of the subtree in each node.

303
00:28:20,880 --> 00:28:37,880
And then to compute the total force traversing the tree of all the information that you need to complete the n body calculation, but in time much closer to n log n than to n squared.

304
00:28:37,880 --> 00:28:55,880
And that idea that you didn't need to take time proportional to n squared, but with a geometric algorithm like a 3D tree, you can get the time to n log n that enabled all sorts of new scientific investigation.

305
00:28:55,880 --> 00:29:01,880
And it's an example of the use of algorithms to enable new research.

