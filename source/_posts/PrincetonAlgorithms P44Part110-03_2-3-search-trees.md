---
title: PrincetonAlgorithms P44Part110 03_2 3 Search Trees
---

1
00:00:00,000 --> 00:00:04,520
Welcome back.

2
00:00:04,520 --> 00:00:08,419
Today we're going to talk about balance search trees, which will lead us to an ultimate

3
00:00:08,419 --> 00:00:15,560
symbol table implementation that can provide fast performance for all the symbol table operations.

4
00:00:15,560 --> 00:00:18,400
We've looked at guaranteed.

5
00:00:18,400 --> 00:00:23,320
So here's a review of where we were with symbol tables.

6
00:00:23,320 --> 00:00:30,480
We took a look at the last time at the binary search tree, which if things are well modeled

7
00:00:30,480 --> 00:00:34,399
by random insertions have great performance.

8
00:00:34,399 --> 00:00:39,000
They get searched and it's searched on a time proportional to log base two event, and they

9
00:00:39,000 --> 00:00:41,840
support ordered operations.

10
00:00:41,840 --> 00:00:47,560
But really our goal is to have these operations be guaranteed to take time proportional to

11
00:00:47,560 --> 00:00:53,820
log in because we don't have control over the order of operations and they may not be

12
00:00:53,820 --> 00:00:55,280
random at all.

13
00:00:55,280 --> 00:01:00,400
And in fact in many real applications they're not very random.

14
00:01:00,400 --> 00:01:04,920
So that's what we're going to look at now is try to find an implementation that can guarantee

15
00:01:04,920 --> 00:01:09,480
to be fast for all the symbol table operations.

16
00:01:09,480 --> 00:01:12,200
That's our challenge.

17
00:01:12,200 --> 00:01:19,040
So what we're going to talk about to do is an algorithm that actually pretty old algorithm

18
00:01:19,040 --> 00:01:25,480
called two three trees in a particular implementation that requires very little code called left-leaning

19
00:01:25,480 --> 00:01:27,520
red-black BSTs.

20
00:01:27,520 --> 00:01:31,040
And then we'll talk about a generalization called Btrees.

21
00:01:31,040 --> 00:01:39,240
And these methods are all widely used throughout our computational infrastructure.

22
00:01:39,239 --> 00:01:45,079
To start we'll talk about two three search trees which is a model that underlies the

23
00:01:45,079 --> 00:01:51,159
concise and efficient implementation that we're going to look at.

24
00:01:51,159 --> 00:01:57,959
So a two three tree is a way to generalize BSTs to provide the flexibility that we need

25
00:01:57,959 --> 00:02:00,239
to guarantee fast performance.

26
00:02:00,239 --> 00:02:02,319
And the idea is very simple.

27
00:02:02,319 --> 00:02:05,399
We allow one or two keys per node.

28
00:02:05,400 --> 00:02:10,640
That is we allow for the possibility of something called a three node that can hold two keys,

29
00:02:10,640 --> 00:02:13,080
but then it has to have three children.

30
00:02:13,080 --> 00:02:18,520
In a regular BST node, a two node we have one link for the keys that are less than the key

31
00:02:18,520 --> 00:02:21,759
in the node and one link for the keys that are greater.

32
00:02:21,759 --> 00:02:27,879
In a three node we need three links, one for less, one for between and one for greater.

33
00:02:27,879 --> 00:02:32,520
Another property of these two three trees is that we're going to have perfect balance.

34
00:02:32,520 --> 00:02:39,560
That is every path from the root to a null link is going to have the same length in a two three tree.

35
00:02:39,560 --> 00:02:47,080
So as I mentioned, the symmetric order is part of the definition of a two three tree.

36
00:02:47,080 --> 00:02:50,560
Every three node has three links and two keys.

37
00:02:50,560 --> 00:02:56,120
The left link is for the keys that are, that points to a two three tree with the keys that

38
00:02:56,120 --> 00:03:00,000
are smaller than the smaller of the two keys in the three node.

39
00:03:00,000 --> 00:03:05,479
The middle link points to a two three tree that contains all the keys that are between the two keys.

40
00:03:05,479 --> 00:03:12,840
And the right link points to a two three tree containing all the keys that are larger than the larger the two keys in the three node.

41
00:03:12,840 --> 00:03:17,759
Okay, let's take a look at a demo of searching in a two three tree.

42
00:03:17,759 --> 00:03:25,520
So say we have this two three tree here and we want to search for whether or not H is one of the keys in the tree.

43
00:03:25,520 --> 00:03:38,520
So we start at the root, compare the search key against the key or keys in the node and follow the link corresponding to the interval that we know must contain the search key by the definition of the tree.

44
00:03:38,520 --> 00:03:41,439
And then we recursively continue the search.

45
00:03:41,439 --> 00:03:50,160
So if we're looking for H, it's less than M. So the only place it could be in this two three tree is in the two three tree on the left link.

46
00:03:50,160 --> 00:03:52,960
So we follow the left link.

47
00:03:52,960 --> 00:03:56,960
Now we compare H with E and J and in this case it's between.

48
00:03:56,960 --> 00:03:58,599
So now we're going to take the middle link.

49
00:03:58,599 --> 00:04:02,159
That's the only place that H possibly could be.

50
00:04:02,159 --> 00:04:09,600
And in this case, that node, one node to three tree contains H. So that's a search hit.

51
00:04:09,600 --> 00:04:12,840
Let's take another example for unsuccessful search.

52
00:04:12,840 --> 00:04:15,680
A key that's not in the tree.

53
00:04:15,680 --> 00:04:17,199
As usual, we start at the root.

54
00:04:17,199 --> 00:04:19,800
It's less so we go left.

55
00:04:19,800 --> 00:04:21,360
It's less than both keys.

56
00:04:21,360 --> 00:04:25,360
So if it's in the tree, it would have to be in the left link.

57
00:04:25,360 --> 00:04:27,160
And it's between those two keys.

58
00:04:27,160 --> 00:04:30,400
So if it's in the tree, it would have to be on the middle link.

59
00:04:30,400 --> 00:04:34,120
And that link is null, so that's a search miss.

60
00:04:34,120 --> 00:04:41,280
So the search is a natural generalization of the search in binary search trees.

61
00:04:41,280 --> 00:04:43,120
Now what about inserting?

62
00:04:43,120 --> 00:04:50,600
Well, it's a similar type of strategy as with regular binary search trees,

63
00:04:50,600 --> 00:04:56,040
except that we manipulate the two and three nodes to keep perfect balance in the tree.

64
00:04:56,040 --> 00:05:00,920
So the easy case is if the key winds up in a two node at the bottom like this one.

65
00:05:00,920 --> 00:05:06,519
Suppose we're inserting K. K is less than M, so we go left.

66
00:05:06,519 --> 00:05:10,519
K is greater than both keys, so we go right.

67
00:05:10,519 --> 00:05:16,359
K is less than L, so the search ends at the left link of L.

68
00:05:16,359 --> 00:05:22,199
And to perform an insertion, all we need to do is replace that two node with a three

69
00:05:22,199 --> 00:05:24,599
node containing K.

70
00:05:24,599 --> 00:05:30,319
Now K is inserted into the two three tree and it satisfies all the rules.

71
00:05:30,319 --> 00:05:34,639
Now if we're inserting into a three node at the bottom, we have to do more work.

72
00:05:34,639 --> 00:05:40,319
And specifically, the work we do is we add the key to a three node to create a temporary

73
00:05:40,319 --> 00:05:45,959
four node and then split up that four node and move its middle key into the parent.

74
00:05:45,959 --> 00:05:49,319
So let's see an example.

75
00:05:49,319 --> 00:05:55,040
If we're going to insert Z into this tree, it's greater than N, so we go to the right.

76
00:05:55,040 --> 00:05:58,120
It's greater than R, so we go to the right.

77
00:05:58,120 --> 00:06:03,959
Now it's greater than X and that's an L link to the right of X, so the search ends there

78
00:06:03,959 --> 00:06:09,159
and what we'd want to do is insert Z into that three node.

79
00:06:09,160 --> 00:06:16,760
And the way we do it is first make a temporary four node that replaces that three node.

80
00:06:16,760 --> 00:06:22,640
And then that's not a two three tree because it's got that one four node with three keys

81
00:06:22,640 --> 00:06:24,720
and four links.

82
00:06:24,720 --> 00:06:31,640
But what we can do is split that four node and pass the middle key up to its parent.

83
00:06:31,640 --> 00:06:37,720
So split it into two two nodes and pass the middle key to the parent.

84
00:06:37,720 --> 00:06:43,680
That's kind of a magical operation and believe me, it's easier to get it done in the implementation

85
00:06:43,680 --> 00:06:45,280
than the graphics.

86
00:06:45,280 --> 00:06:52,040
But now you can see that that local transformation on the two three tree completes the insertion.

87
00:06:52,040 --> 00:06:56,240
Now if that parent were a three node, it would become a temporary four node and would

88
00:06:56,240 --> 00:07:00,240
continue the process moving up the tree.

89
00:07:00,240 --> 00:07:04,200
That's a demo of searching insertion in a two three tree.

90
00:07:04,200 --> 00:07:07,120
So let's look at a double split like that.

91
00:07:07,120 --> 00:07:11,240
So say we're inserting L into this tree.

92
00:07:11,240 --> 00:07:16,560
So it goes down to the middle and winds up needing to be inserted in the three node in

93
00:07:16,560 --> 00:07:17,959
the middle.

94
00:07:17,959 --> 00:07:20,600
So we're going to convert that into a four node.

95
00:07:20,600 --> 00:07:22,920
Now L is the middle key of that one.

96
00:07:22,920 --> 00:07:31,240
So we're going to split that four node into two two nodes and move L to the parent.

97
00:07:31,240 --> 00:07:36,560
The four node had four links and the two two nodes have four links.

98
00:07:36,560 --> 00:07:39,519
So nothing has to be changed below.

99
00:07:39,519 --> 00:07:45,720
And then this insertion into the parent changed it from a three node into a four node, essentially

100
00:07:45,720 --> 00:07:50,720
adding a link because of the split with the two two nodes where there was only one three

101
00:07:50,720 --> 00:07:52,240
node before.

102
00:07:52,240 --> 00:07:53,959
But now that's not a two three tree.

103
00:07:53,959 --> 00:07:55,840
So we have to split again.

104
00:07:55,840 --> 00:07:58,000
And in this case, there's no parent.

105
00:07:58,000 --> 00:08:03,639
So we create a new one and the height of the tree increases by one.

106
00:08:03,639 --> 00:08:08,360
It's the only time the height of a two three tree changes when the root splits the height

107
00:08:08,360 --> 00:08:12,959
introduces increases by one.

108
00:08:12,959 --> 00:08:19,120
So that's a demo of insertion into a three node at the bottom in a two three tree that

109
00:08:19,120 --> 00:08:21,439
percolates all the way to the top.

110
00:08:21,439 --> 00:08:26,439
Now let's look at constructing a two three tree from an initially empty tree.

111
00:08:26,439 --> 00:08:30,839
So if we start by just inserting a key, well, that just creates a two node containing

112
00:08:30,839 --> 00:08:33,319
that key.

113
00:08:33,320 --> 00:08:34,680
And that's a legal two three tree.

114
00:08:34,680 --> 00:08:35,800
So we're fine.

115
00:08:35,800 --> 00:08:43,720
Now inserting e into that, well, it's going to be if it's in the tree left of S, that's

116
00:08:43,720 --> 00:08:44,720
a null link.

117
00:08:44,720 --> 00:08:49,240
So we need to convert that two node into a three node.

118
00:08:49,240 --> 00:08:51,160
Okay, and that's a legal two three tree.

119
00:08:51,160 --> 00:08:52,160
So we stop.

120
00:08:52,160 --> 00:08:58,040
And inserting a into that, we convert that three node into a temporary four node.

121
00:08:58,040 --> 00:09:01,800
But then we need to split that four node moving e to the parent.

122
00:09:01,799 --> 00:09:06,639
And that creates a new root node and increases the size of the tree by one.

123
00:09:06,639 --> 00:09:08,439
But now that's a legal two three tree.

124
00:09:08,439 --> 00:09:10,679
So we stop.

125
00:09:10,679 --> 00:09:16,879
Insert r into that, it goes to the right of e, convert into a three node.

126
00:09:16,879 --> 00:09:23,479
Now insert c into that, goes to the left of e, has to be joined with a into a new three

127
00:09:23,479 --> 00:09:24,479
node.

128
00:09:24,479 --> 00:09:27,759
Again, that's a legal two three tree and we stop.

129
00:09:27,759 --> 00:09:31,659
Now we insert h, the guy that goes to the right of e, that three

130
00:09:31,659 --> 00:09:34,259
node gets converted into a four node.

131
00:09:34,259 --> 00:09:35,699
That's a temporary four node.

132
00:09:35,699 --> 00:09:40,379
We split and move r to the parent.

133
00:09:40,379 --> 00:09:44,579
Now that parent's a legal three node and there's nothing more to be done.

134
00:09:44,579 --> 00:09:48,059
We have a legal three three, two three tree.

135
00:09:48,059 --> 00:09:51,819
Insert x, bigger than r, goes to the right.

136
00:09:51,819 --> 00:09:56,939
There's a two node, there's room for the x.

137
00:09:56,939 --> 00:10:01,620
Insert p, that goes between e and r.

138
00:10:01,620 --> 00:10:06,740
The two node containing h, right link is null, so we convert that two node into a three

139
00:10:06,740 --> 00:10:07,740
node.

140
00:10:07,740 --> 00:10:10,179
And now we have a legal two three tree.

141
00:10:10,179 --> 00:10:15,820
Now you can see this next insertion is going to cause some splitting wherever it is.

142
00:10:15,820 --> 00:10:19,179
So insert l, that's between e and r.

143
00:10:19,179 --> 00:10:22,860
So it goes in the three node containing h and p.

144
00:10:22,860 --> 00:10:29,940
We convert that into a temporary four node, split that four node moving l to the parent.

145
00:10:29,940 --> 00:10:36,640
Now that parent's a four node and that has to be split and we create a new root node

146
00:10:36,640 --> 00:10:39,820
and then the height of the tree grows by one.

147
00:10:39,820 --> 00:10:43,060
And that's a legal two three tree, so we stop.

148
00:10:43,060 --> 00:10:48,620
So those local transformations converting a two node to a three node or converting a three

149
00:10:48,620 --> 00:10:53,460
to a four and then splitting and passing a node up, those are the operating operations

150
00:10:53,460 --> 00:10:59,700
we need to consider to get balance in our search trees.

151
00:10:59,700 --> 00:11:06,500
All right, so as I've mentioned in this diagram shows the splitting of four node in a two

152
00:11:06,500 --> 00:11:09,259
three tree is a local transformation.

153
00:11:09,259 --> 00:11:13,220
It only involves changing a constant number of links.

154
00:11:13,220 --> 00:11:21,019
So in this example shows the general situation when the four node to be split is the middle

155
00:11:21,019 --> 00:11:24,220
link but the same is true if it's a left or right.

156
00:11:24,220 --> 00:11:28,179
And those six sub trees drawn could be huge.

157
00:11:28,179 --> 00:11:32,419
They can contain millions of keys but it doesn't matter what they contain.

158
00:11:32,419 --> 00:11:33,779
We don't touch them at all.

159
00:11:33,779 --> 00:11:40,019
Nor do we touch anything above this node in the tree until the split happens.

160
00:11:40,019 --> 00:11:46,419
So the transformation that splits that BCD node and inserts the c into the three node at

161
00:11:46,419 --> 00:11:54,939
the root just involves making that three node into a temporary four node and making that

162
00:11:54,939 --> 00:11:59,500
four node into two two nodes and adjusting the links appropriately.

163
00:11:59,500 --> 00:12:09,099
Just a constant number of operations and that's why this operation is in general efficient.

164
00:12:09,100 --> 00:12:18,540
So let's look at just the global properties that these manipulations preserve.

165
00:12:18,540 --> 00:12:24,779
The two things that are critical is that in a two three tree we always have some metric

166
00:12:24,779 --> 00:12:32,220
order that is the order that we defined for two nodes and three nodes and we also have

167
00:12:32,220 --> 00:12:33,220
perfect balance.

168
00:12:33,220 --> 00:12:36,460
The distance from the root to the bottom is always the same.

169
00:12:36,460 --> 00:12:42,019
And to prove that we just need to show that each transformation maintains symmetric order

170
00:12:42,019 --> 00:12:43,900
and perfect balance.

171
00:12:43,900 --> 00:12:48,060
And these are all the possible transformations that we could do.

172
00:12:48,060 --> 00:12:53,900
If we split the root then that's what happens at the root and if there was perfect balance

173
00:12:53,900 --> 00:12:58,060
before there's perfect balance after with the height one bigger.

174
00:12:58,060 --> 00:13:04,580
If the parent was a two node then the transformation is a local transformation and if you look at

175
00:13:04,580 --> 00:13:09,980
where the links are then it's easy to see by induction that if there was perfect balance

176
00:13:09,980 --> 00:13:14,620
before there's perfect balance afterward because we didn't change anything about the

177
00:13:14,620 --> 00:13:17,020
perfect balance in any of those subtrees.

178
00:13:17,020 --> 00:13:19,139
And that's true in every case.

179
00:13:19,139 --> 00:13:25,180
If the three nodes at the right and this one is one higher and those four are one lower

180
00:13:25,180 --> 00:13:26,820
and afterwards it's the same.

181
00:13:26,820 --> 00:13:30,820
If there was perfect balance before there's perfect balance afterwards because we didn't

182
00:13:30,820 --> 00:13:32,900
change the height of any nodes.

183
00:13:32,899 --> 00:13:37,259
We just moved things around locally within nodes.

184
00:13:37,259 --> 00:13:42,139
And this is when the parent is a three node then there's the three cases if we split at

185
00:13:42,139 --> 00:13:45,299
the left, split at the middle and split at the right.

186
00:13:45,299 --> 00:13:52,220
And again changing the four node to two nodes and adding links if there was perfect balance

187
00:13:52,220 --> 00:13:56,699
before this perfect balance after because we didn't change the heights of anything else

188
00:13:56,699 --> 00:13:59,019
in the tree.

189
00:13:59,019 --> 00:14:05,980
So our operations maintain symmetric order in perfect balance in a two three tree.

190
00:14:05,980 --> 00:14:12,620
So that's going to give us a very easy way to describe the performance.

191
00:14:12,620 --> 00:14:19,179
The all our operations have cost that is proportional to the path length from the height

192
00:14:19,179 --> 00:14:24,659
to the bottom and every path from the root to the link has the same length.

193
00:14:24,659 --> 00:14:26,659
How long can those paths be?

194
00:14:27,059 --> 00:14:32,459
Well it's not hard to see that the in the worst case if there are all two nodes that's

195
00:14:32,459 --> 00:14:36,659
the longest they could be it's log base two of n.

196
00:14:36,659 --> 00:14:41,980
And if there are all three nodes it would be log base three of n which is less it's about

197
00:14:41,980 --> 00:14:44,980
0.63 log base two of n.

198
00:14:44,980 --> 00:14:50,459
So all the paths in a two three tree with n nodes have to have length between those two

199
00:14:50,459 --> 00:14:51,459
bounds.

200
00:14:51,660 --> 00:14:57,060
And those are pretty small numbers for a million nodes that's between 12 and 20.

201
00:14:57,060 --> 00:15:02,660
And if it's a billion nodes that's between 18 and 30.

202
00:15:02,660 --> 00:15:04,660
Those are remarkably small numbers.

203
00:15:04,660 --> 00:15:09,860
So we're going to have guaranteed performance even for a huge databases.

204
00:15:09,860 --> 00:15:14,019
We're going to be able to guarantee that we can get search and insert done with just

205
00:15:14,019 --> 00:15:15,860
18 to 30 operations.

206
00:15:15,860 --> 00:15:19,379
That's quite remarkable really.

207
00:15:19,379 --> 00:15:25,059
So here's what our table will look like when we finish the implementation of two three

208
00:15:25,059 --> 00:15:26,539
trees.

209
00:15:26,539 --> 00:15:31,179
Every operation is guaranteed to be a constant times log n.

210
00:15:31,179 --> 00:15:36,500
Now the constant depends on the implementation exactly what kind of manipulations we need

211
00:15:36,500 --> 00:15:40,659
to do to convert three nodes to four nodes and so forth.

212
00:15:40,659 --> 00:15:47,299
But it's easy to see from the demos and the diagrams that those are going to be constant.

213
00:15:47,299 --> 00:15:53,099
Guaranteed logarithmic performance for all operations, which is certainly what we want

214
00:15:53,099 --> 00:15:56,259
in a symbol table implementation.

215
00:15:56,259 --> 00:15:58,419
Now what about the implementation?

216
00:15:58,419 --> 00:16:02,299
Well we're actually not going to talk about a direct implementation of two three trees

217
00:16:02,299 --> 00:16:05,500
because it's kind of complicated.

218
00:16:05,500 --> 00:16:09,379
It's cumbersome to maintain multiple node types.

219
00:16:09,379 --> 00:16:15,179
You might need multiple compares to move down the tree if there's a three node that takes

220
00:16:15,179 --> 00:16:17,299
more compares than a two node.

221
00:16:17,299 --> 00:16:19,779
So it's complicated to analyze.

222
00:16:19,779 --> 00:16:24,939
We have to keep track of links as we go up and down the tree to take you into the splitting

223
00:16:24,939 --> 00:16:27,699
and there's a lot of cases.

224
00:16:27,699 --> 00:16:34,259
I drew all the cases and whether you're splitting into the middle of a four node or the

225
00:16:34,259 --> 00:16:37,179
right of a two node is just a lot of cases.

226
00:16:37,179 --> 00:16:44,379
So you could do it but we're not going to because there's a much easier way.

227
00:16:44,379 --> 00:16:50,340
So that's two three trees, a model for implementing balanced trees and Guaranteed logarithmic time.

