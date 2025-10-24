---
title: PrincetonAlgorithms P50Part111 05_interval Search Trees
---

1
00:00:00,000 --> 00:00:09,800
Okay, next we're going to look at another extension of geometric algorithms to process slightly

2
00:00:09,800 --> 00:00:14,439
more complicated objects and then we'll see an important application.

3
00:00:14,439 --> 00:00:16,879
This is called interval search.

4
00:00:16,879 --> 00:00:22,120
So now instead of points, our data is intervals.

5
00:00:22,120 --> 00:00:26,719
So this is, we'll start with one dimension as before.

6
00:00:26,719 --> 00:00:31,559
In a right away, I can see that it's a more complicated problem than we've been dealing

7
00:00:31,559 --> 00:00:32,560
with.

8
00:00:32,560 --> 00:00:35,359
So we want to support the following operations.

9
00:00:35,359 --> 00:00:37,759
We want to be able to insert an interval.

10
00:00:37,759 --> 00:00:43,039
So an interval is just a left endpoint, right endpoint of one dimensional data or points

11
00:00:43,039 --> 00:00:44,039
on the line.

12
00:00:44,039 --> 00:00:51,519
We want to be able to insert an interval, search for an interval, delete an interval.

13
00:00:51,519 --> 00:00:55,920
But the main thing is we want the interval intersection query.

14
00:00:55,920 --> 00:01:01,840
So given a query interval, we want to find all intervals in the data structure that overlap

15
00:01:01,840 --> 00:01:04,159
that interval or finding any interval.

16
00:01:04,159 --> 00:01:07,640
We'll start with that simpler problem.

17
00:01:07,640 --> 00:01:09,519
So how are we going to support that?

18
00:01:09,519 --> 00:01:16,040
So this is the API in Java code.

19
00:01:16,040 --> 00:01:20,480
So we have intervals.

20
00:01:20,480 --> 00:01:24,159
So instead of one key, we have two, which is the left and right endpoints of the interval

21
00:01:24,159 --> 00:01:25,879
for put.

22
00:01:25,879 --> 00:01:29,599
And then we have delete and then we're going to have the intersects.

23
00:01:29,599 --> 00:01:34,119
And again, to simplify the code, we're going to make the non-degeneracy assumption that

24
00:01:34,119 --> 00:01:39,679
no two intervals have the same left endpoint.

25
00:01:39,679 --> 00:01:47,719
And that's easy to fix, but we don't simplify the code.

26
00:01:47,719 --> 00:01:52,679
So now we'll look at a data structure called an interval search tree that helps to solve

27
00:01:52,679 --> 00:01:54,879
this problem.

28
00:01:55,879 --> 00:02:02,479
It's an extremely simple algorithm, but surprisingly complicated to understand.

29
00:02:02,479 --> 00:02:04,599
So we'll go slowly.

30
00:02:04,599 --> 00:02:10,759
So the first thing is what we're going to do is use the left endpoint of each interval

31
00:02:10,759 --> 00:02:13,199
as the binary search tree key.

32
00:02:13,199 --> 00:02:19,919
So our node store intervals, but we only use the left endpoint as the key.

33
00:02:19,919 --> 00:02:27,839
So this is the binary search tree that's built from those six intervals in our example.

34
00:02:27,839 --> 00:02:29,519
17, 19s at the root.

35
00:02:29,519 --> 00:02:34,119
So everybody with a left endpoint less than 17s to the left and everybody with a left endpoint

36
00:02:34,119 --> 00:02:37,879
greater than 17s to the right and so forth.

37
00:02:37,879 --> 00:02:40,759
So that's a binary search tree built from those intervals.

38
00:02:40,759 --> 00:02:42,079
So that's easy.

39
00:02:42,079 --> 00:02:44,119
Just build a binary search tree.

40
00:02:44,119 --> 00:02:48,119
Just use the left endpoint as the search key.

41
00:02:48,120 --> 00:02:51,640
But we're also in the each node of the tree.

42
00:02:51,640 --> 00:02:58,080
We're going to store not just the interval, but we're going to store the largest endpoint

43
00:02:58,080 --> 00:03:00,879
in the subtree rooted at that node.

44
00:03:00,879 --> 00:03:05,520
So at every node, we're going to store the maximum endpoint in subtree rooted at that node.

45
00:03:05,520 --> 00:03:13,080
So at the root, the maximum endpoint of the rightmost point covered by an interval is 24.

46
00:03:13,080 --> 00:03:14,560
So we start 24th root.

47
00:03:14,560 --> 00:03:16,640
And of course, the right subtree.

48
00:03:16,639 --> 00:03:21,399
On the left subtree, the max endpoint is at 18.

49
00:03:21,399 --> 00:03:27,199
So that's what we store for the associated data with the node to the left of the root

50
00:03:27,199 --> 00:03:29,199
and so forth.

51
00:03:29,199 --> 00:03:34,879
So we're going to have to, that's data that we're going to have to maintain when we do an

52
00:03:34,879 --> 00:03:41,599
insert in its data that we'll use when we're doing an interval intersection search.

53
00:03:41,599 --> 00:03:51,599
So let's take a look at an insertion into an interval search tree with a demo.

54
00:03:51,599 --> 00:03:59,000
All right, so the insertion algorithm is pretty simple.

55
00:03:59,000 --> 00:04:04,319
We do the BST insertion just so we have to do that update of the maximum in each node

56
00:04:04,319 --> 00:04:06,000
on the search path.

57
00:04:06,000 --> 00:04:15,400
So to insert 16, 22 in this tree, well, we use the left endpoint as a search key.

58
00:04:15,400 --> 00:04:19,920
16 is the left endpoint of our insert interval.

59
00:04:19,920 --> 00:04:24,120
We compare that with 17 and therefore go left.

60
00:04:24,120 --> 00:04:29,959
Now 16 is bigger than 5, so we go right.

61
00:04:29,959 --> 00:04:35,600
Now 16 is bigger than 15, so we go right.

62
00:04:35,600 --> 00:04:42,879
And that's null, so that's where we insert our new interval.

63
00:04:42,879 --> 00:04:49,400
So now we're going to go back up the tree and for every node that we encounter, it could

64
00:04:49,400 --> 00:04:55,680
be that our right endpoint of our interval is bigger than what was there, so we have to

65
00:04:55,680 --> 00:05:02,240
check all the way up the path, the maximum in each node on the path.

66
00:05:02,240 --> 00:05:08,560
So we have to check each node to see if 22 is bigger and for the three nodes to the

67
00:05:08,560 --> 00:05:15,000
left it is bigger than 18, for the node at the root, it's not that stays to be 24.

68
00:05:15,000 --> 00:05:22,160
So it's just binary tree insertion, but then after the insertion on the way up, we go

69
00:05:22,160 --> 00:05:29,160
ahead and check if the maximum that we have is bigger than the maximum there and updated

70
00:05:29,160 --> 00:05:30,400
if necessary.

71
00:05:30,399 --> 00:05:35,879
So easy to code.

72
00:05:35,879 --> 00:05:40,279
So now about how do we do a search?

73
00:05:40,279 --> 00:05:46,719
So the search is definitely more complicated and kind of mysterious, but let's look at

74
00:05:46,719 --> 00:05:52,479
the rules for search in an interval search tree.

75
00:05:52,479 --> 00:05:58,839
All right, so now we're going to look to see if we have an intersection.

76
00:05:58,839 --> 00:06:04,759
We want to find just any interval that intersects the square interval 2325.

77
00:06:04,759 --> 00:06:08,639
We're not going to try to find a wall, we'll get back to that in a minute, try to find

78
00:06:08,639 --> 00:06:11,679
any interval that intersects our query interval.

79
00:06:11,679 --> 00:06:14,919
So let's see what we have to do.

80
00:06:14,919 --> 00:06:21,279
So first thing is, if at the root we have an intersection, then we're done, we just

81
00:06:21,279 --> 00:06:22,279
return.

82
00:06:22,279 --> 00:06:32,759
So in case 2325 does not intersect 1719, so we have to go down the tree somewhere.

83
00:06:32,759 --> 00:06:36,719
So left subtree is null, go right, okay.

84
00:06:36,719 --> 00:06:44,879
Otherwise we have to check whether the max endpoint in the left subtree is less than the

85
00:06:44,879 --> 00:06:46,039
low point in our interval.

86
00:06:46,039 --> 00:06:52,159
And it's easy to see, well if that's the case, then we're not going to find an intersection

87
00:06:52,160 --> 00:06:53,840
in the left.

88
00:06:53,840 --> 00:06:58,880
The maximum endpoint in the left is 22, and we're looking for 23, we're not going to find

89
00:06:58,880 --> 00:07:02,720
anything there, so we just want to go right.

90
00:07:02,720 --> 00:07:09,120
So in this case we'll go right, 22 to 23, no intersection on the left, so we go right.

91
00:07:09,120 --> 00:07:15,120
And now we do find an intersection 2124 does intersect with 2325 because 23 is in the middle

92
00:07:15,120 --> 00:07:18,320
there, so we find an intersection.

93
00:07:18,319 --> 00:07:26,079
Now in the other hand, let's say that we're looking for 1214, so no intersection.

94
00:07:26,079 --> 00:07:32,319
So all the algorithm says is that if you didn't go right, go left.

95
00:07:32,319 --> 00:07:34,319
So let's go left.

96
00:07:34,319 --> 00:07:41,319
In this case, so we weren't able to show that there was no intersection on the left, so

97
00:07:41,319 --> 00:07:44,519
we're going to go left.

98
00:07:44,519 --> 00:07:48,759
In this case, we compared 1214 to 58.

99
00:07:48,759 --> 00:07:50,079
So now we apply the same rules.

100
00:07:50,079 --> 00:07:53,399
It intersect, no, it doesn't intersect.

101
00:07:53,399 --> 00:08:01,159
So should we go left, well no, the maximum endpoint in the left node is 8, so we can't

102
00:08:01,159 --> 00:08:04,240
have an intersection there, so we're going to go right.

103
00:08:04,240 --> 00:08:06,240
Go right to 12 and go right.

104
00:08:06,240 --> 00:08:12,039
So now this 1214 intersect 1518, it does not.

105
00:08:12,039 --> 00:08:13,399
So there's no intersection.

106
00:08:13,399 --> 00:08:16,399
So now what do we do?

107
00:08:16,399 --> 00:08:17,399
Should we go left?

108
00:08:17,399 --> 00:08:22,439
No, the max endpoint on the left is 10, so we shouldn't go left.

109
00:08:22,439 --> 00:08:26,839
So we're going to go right.

110
00:08:26,839 --> 00:08:32,720
Those 1214 intersect 1622, it does not.

111
00:08:32,720 --> 00:08:41,319
So now left endpoint is null, and so we're just going to go right, and there's no intersection.

112
00:08:41,320 --> 00:08:47,760
So in both cases, we just went along one path in the tree to determine whether or not

113
00:08:47,760 --> 00:08:49,600
there was an interval intersection.

114
00:08:49,600 --> 00:08:54,120
Let's look at one more example, 2123.

115
00:08:54,120 --> 00:09:03,800
So let's see, 2123 to 1719, they do not intersect, so now what are we going to do next?

116
00:09:03,799 --> 00:09:14,639
So we're going to compare the left subtree, and it's not, 22 falls within our interval,

117
00:09:14,639 --> 00:09:20,039
so it's not less than, so there might be a new intersection there, so we'd better go

118
00:09:20,039 --> 00:09:21,959
to the left.

119
00:09:21,959 --> 00:09:24,879
So we do go to the left.

120
00:09:24,879 --> 00:09:30,199
Now we compare against 5'8, and there's no intersection.

121
00:09:30,200 --> 00:09:31,759
So now we're going to go left to right.

122
00:09:31,759 --> 00:09:37,560
Well, we're going to go to the right because the max endpoint in the left subtree is 8,

123
00:09:37,560 --> 00:09:44,759
and our interval is 21, so no intersection on the left, so we're going to go right.

124
00:09:44,759 --> 00:09:49,400
Intersection 2123, 1518, they do not intersect, so now we go left to right.

125
00:09:49,400 --> 00:09:57,520
Again, 10 is less than our left end point 21, so we'd better go to the right.

126
00:09:57,519 --> 00:10:03,720
And now 2123 does intersect 1622, so we return an intersection.

127
00:10:03,720 --> 00:10:08,399
Again, one path through the tree to determine an intersection.

128
00:10:08,399 --> 00:10:14,960
So from those rules, you can see that the amount of code required to implement this intersecting

129
00:10:14,960 --> 00:10:17,759
interval is extremely low.

130
00:10:17,759 --> 00:10:21,360
We just check for an intersection if we find a return.

131
00:10:21,360 --> 00:10:23,799
If left is null, we go right.

132
00:10:23,799 --> 00:10:26,199
Otherwise, if the max is less than low, we go right.

133
00:10:26,199 --> 00:10:28,319
Otherwise, we go left.

134
00:10:28,319 --> 00:10:34,319
It could hardly be simpler, and really amazingly simple and efficient algorithm.

135
00:10:34,319 --> 00:10:42,039
We should convince ourselves really that it always works, and so it will spend just a moment

136
00:10:42,039 --> 00:10:44,279
on a short proof.

137
00:10:44,279 --> 00:10:48,439
So let's look at the cases that could happen.

138
00:10:48,440 --> 00:10:55,280
So first thing is, if the search goes right, then there's no intersection in the left.

139
00:10:55,280 --> 00:11:01,120
That's easy to convince ourselves that that just from what we did in the demo.

140
00:11:01,120 --> 00:11:05,160
The course of the left subtrees empty is no intersection there.

141
00:11:05,160 --> 00:11:11,200
But if the max endpoint in the left sub tree is less than low, that means every interval

142
00:11:11,200 --> 00:11:19,080
in the left sub tree has a maximum point less than low, and so therefore it can't intersect.

143
00:11:19,080 --> 00:11:22,400
So if you go right, there's no intersection in the left.

144
00:11:22,400 --> 00:11:26,640
Any possible intersection would have to be in the right.

145
00:11:26,640 --> 00:11:32,640
And then the other point is that if you go left, then either there's an intersection there,

146
00:11:32,640 --> 00:11:35,600
or there's no intersections at all.

147
00:11:35,600 --> 00:11:40,200
So let's suppose that there's no intersection.

148
00:11:40,200 --> 00:11:44,320
And that's equivalent to saying, if there's no intersection in the left, then there's

149
00:11:44,320 --> 00:11:46,360
no intersection in the right.

150
00:11:46,360 --> 00:11:49,560
So let's look at if there's no intersection in the left.

151
00:11:49,560 --> 00:11:54,920
Since we went to the left, then we've got low less than max.

152
00:11:54,919 --> 00:12:05,199
But for any interval in the right sub tree, it's got to appear after low.

153
00:12:05,199 --> 00:12:10,839
Because since there's no intersections in the left sub tree,

154
00:12:10,839 --> 00:12:18,799
high has got to be less than c, because they're sorted by left endpoint.

155
00:12:18,799 --> 00:12:23,879
And then that means that c's got to be less than a if a's in the right.

156
00:12:23,879 --> 00:12:27,240
So then therefore there can't be any intersection in the right either.

157
00:12:27,240 --> 00:12:31,600
No intersection in the left means no intersections at all.

158
00:12:31,600 --> 00:12:40,480
So those two cases is enough to show that this algorithm finds an intersection if there is one.

159
00:12:40,480 --> 00:12:46,279
And the other thing we can do with this is just use a red black BST to guarantee

160
00:12:46,279 --> 00:12:51,480
that we solve this in time proportional to law again.

161
00:12:51,480 --> 00:12:58,279
So insert, find, delete, and find any interval that intersects, all take time guaranteed proportional

162
00:12:58,279 --> 00:13:00,440
to the law again.

163
00:13:00,440 --> 00:13:08,519
And if we want to find all intervals, we just have to run the algorithm for each interval

164
00:13:08,519 --> 00:13:12,639
that's until we come up against no intersection.

165
00:13:12,639 --> 00:13:19,159
So it'll take time proportional to our law again if there's our intervals that intersect.

166
00:13:19,159 --> 00:13:25,719
The theoretical best that you could possibly do would be our plus log n when in practice

167
00:13:25,719 --> 00:13:28,319
our log n is quite efficient.

168
00:13:28,319 --> 00:13:34,600
This is an easy and very efficient algorithm to solve this interval search problem.

169
00:13:34,600 --> 00:13:40,799
And as we'll see, this algorithm is applicable to an important application that we'll see in a minute.

