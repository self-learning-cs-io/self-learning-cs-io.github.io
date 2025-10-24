---
title: PrincetonAlgorithms P43Part19 07_deletion In Bsts
---

1
00:00:00,000 --> 00:00:07,900
If our symbol table is really going to be dynamic, we need to be able to delete key value

2
00:00:07,900 --> 00:00:10,099
pairs from the table.

3
00:00:10,099 --> 00:00:16,440
As we'll see, all symbol table implementations have lead to complications when we try to do

4
00:00:16,440 --> 00:00:18,199
this operation.

5
00:00:18,199 --> 00:00:23,640
Binary search trees is our first example.

6
00:00:23,640 --> 00:00:26,400
So we need to fill in this one table.

7
00:00:26,399 --> 00:00:29,199
What's the cost of deletion in a binary search tree?

8
00:00:29,199 --> 00:00:32,199
How are we going to really do that?

9
00:00:32,199 --> 00:00:37,359
Well, let's take a look at a very lazy approach, which we set up for in our basic conventions

10
00:00:37,359 --> 00:00:39,640
for symbol tables.

11
00:00:39,640 --> 00:00:46,759
What we can do to remove a node with a given key is just mark it with a tombstone.

12
00:00:46,759 --> 00:00:52,599
Say, well, we'll leave the key in the tree to guide searches, but we won't count it as

13
00:00:52,599 --> 00:00:54,679
being in the symbol table.

14
00:00:54,679 --> 00:01:00,759
And actually, you can make some progress with this kind of method leaving tombstones throughout

15
00:01:00,759 --> 00:01:07,879
the tree and make sure that you keep, as long as there aren't too many deletions, you can

16
00:01:07,879 --> 00:01:13,840
keep the search cost and deletion and the search cost to be logarithmic.

17
00:01:13,840 --> 00:01:19,560
But it definitely becomes inconvenient to manage large numbers of tombstones in highly dynamic

18
00:01:19,560 --> 00:01:23,560
situations with large numbers of keys and values.

19
00:01:23,560 --> 00:01:27,680
Eventually, you're going to get an overload of memory and you're going to have to rebuild

20
00:01:27,680 --> 00:01:30,240
the thing or clean out the tombstones in some way.

21
00:01:30,240 --> 00:01:32,560
So we need to look for a better way.

22
00:01:32,560 --> 00:01:37,640
This is a general method that people often use in all different types of implementations,

23
00:01:37,640 --> 00:01:40,879
but in modern systems it's rather unsatisfactory.

24
00:01:40,879 --> 00:01:43,719
Well, let's look at a simpler problem.

25
00:01:43,719 --> 00:01:47,120
What about deleting the minimum?

26
00:01:47,120 --> 00:01:54,800
Well, actually, that's maybe not too difficult to delete the minimum in a binary search tree.

27
00:01:54,800 --> 00:01:59,320
Again, we just go to the left until we get an all-left link.

28
00:01:59,320 --> 00:02:03,040
And then what we can do is just return that node's right link.

29
00:02:03,040 --> 00:02:08,280
Then that old node nobody's pointing to it, so it's available for garbage collection.

30
00:02:08,280 --> 00:02:14,159
And then we use our usual trick of returning the link that we went down to update the other

31
00:02:14,159 --> 00:02:17,280
links after the recursive calls.

32
00:02:17,280 --> 00:02:21,599
And also, we have to update the counts, something happened down below.

33
00:02:21,599 --> 00:02:26,439
We use that code to update the counts in a consistent way.

34
00:02:26,439 --> 00:02:32,240
So this code implements delete men, not too bad at all.

35
00:02:32,240 --> 00:02:36,759
If x dot left equals null, return x right.

36
00:02:36,759 --> 00:02:41,240
Otherwise, x left equals delete men x left.

37
00:02:41,240 --> 00:02:46,040
And then when you're done with that, you fix the count.

38
00:02:46,040 --> 00:02:55,800
So maybe a node got deleted down there, but always the invariant is that the count of the node is one plus the size of the left and right.

39
00:02:55,800 --> 00:03:00,320
And then return x and fix the links and the counts on the way up.

40
00:03:00,320 --> 00:03:05,400
That's a fine implementation for delete men, and it also works for delete max.

41
00:03:06,120 --> 00:03:14,319
And that's the basis for a general method for deleting nodes from BSTs, known as Hibberd deletion.

42
00:03:14,319 --> 00:03:17,520
So that's the second case.

43
00:03:17,520 --> 00:03:24,599
The first case for Hibberd deletion is what we want to do to delete a node with key case.

44
00:03:24,599 --> 00:03:27,560
We search for the node that contains the key.

45
00:03:27,560 --> 00:03:31,480
And the easiest case is that node has no children.

46
00:03:31,479 --> 00:03:38,399
So to delete a node that has no children, just return null.

47
00:03:38,399 --> 00:03:41,479
And then go back up to update the counts as usual.

48
00:03:41,479 --> 00:03:44,399
That's the easy case.

49
00:03:44,399 --> 00:03:49,799
The next most difficult case is like the delete men case.

50
00:03:49,799 --> 00:03:55,519
We find a node t that contains our key, so like deleting r in this tree.

51
00:03:55,519 --> 00:03:57,359
It only has one child.

52
00:03:57,359 --> 00:04:01,000
Just go ahead and return the link to that child.

53
00:04:01,000 --> 00:04:04,840
And that updates the link and everything works fine.

54
00:04:04,840 --> 00:04:10,520
And the node that was deleted available for garbage collection is nobody's pointing to it.

55
00:04:10,520 --> 00:04:13,879
And again, update all the counts after the recursive calls.

56
00:04:13,879 --> 00:04:17,600
So zero children, no problem, one child, no problem.

57
00:04:17,600 --> 00:04:22,040
The problem is what happens when there's two children.

58
00:04:22,040 --> 00:04:26,279
So say we want to delete node e in this tree.

59
00:04:26,279 --> 00:04:29,800
We have only one link, and we can get rid of the node.

60
00:04:29,800 --> 00:04:35,000
But we have only one link pointing to it, but we have two links pointing down from it.

61
00:04:35,000 --> 00:04:37,960
So what are we going to do with those two links?

62
00:04:37,960 --> 00:04:44,240
Well, the hybrid deletion mechanism, which is pretty old 50 years ago, was proposed,

63
00:04:44,240 --> 00:04:51,319
says go ahead and find the next smallest node in the right subtree of that tree.

64
00:04:51,319 --> 00:04:56,720
So in this case, that's h.

65
00:04:56,720 --> 00:04:57,800
And what's that node?

66
00:04:57,800 --> 00:05:02,079
Well, it's the minimum in T's right subtree.

67
00:05:02,079 --> 00:05:03,879
And we know how to delete the minimum.

68
00:05:03,879 --> 00:05:08,040
So we just find that minimum node.

69
00:05:08,040 --> 00:05:11,480
And in this case, it's h.

70
00:05:11,480 --> 00:05:16,439
And we put that node in T spot and then delete the minimum.

71
00:05:16,439 --> 00:05:18,400
So find the h.

72
00:05:18,400 --> 00:05:19,080
That's the minimum.

73
00:05:19,080 --> 00:05:20,840
Hang on to it.

74
00:05:20,840 --> 00:05:23,879
And then delete the minimum in T's subtree.

75
00:05:23,879 --> 00:05:30,240
And then so we take the e, replace it with the h, and delete the h, and then everything's fine.

76
00:05:30,240 --> 00:05:32,000
It's still a BST.

77
00:05:32,000 --> 00:05:37,399
So essentially, we're finding a node that has only one link, and deleting that node,

78
00:05:37,399 --> 00:05:40,800
and then replacing the node that we need to delete with that one.

79
00:05:40,800 --> 00:05:42,920
That's hybrid deletion.

80
00:05:42,920 --> 00:05:44,240
It's a little bit asymmetric.

81
00:05:44,240 --> 00:05:47,040
Why are we using the successor and not the predecessor?

82
00:05:47,040 --> 00:05:49,879
No real reason.

83
00:05:49,879 --> 00:05:53,000
And it's not really satisfactory because of that.

84
00:05:53,000 --> 00:05:56,319
And we'll come back to this, but it works.

85
00:05:56,319 --> 00:06:00,519
So this is the code for hybrid deletion.

86
00:06:00,519 --> 00:06:02,519
So we search for the key.

87
00:06:02,519 --> 00:06:04,399
If it's got no right child, we're fine.

88
00:06:04,399 --> 00:06:09,879
We just return x dot left, and at the handles both k0 and 1.

89
00:06:09,879 --> 00:06:12,399
If it does have a right child, then we do this.

90
00:06:12,399 --> 00:06:19,000
Find the minimum on the right, delete men on the right, and then fix the links,

91
00:06:19,000 --> 00:06:21,720
and then update our count, and it covers all cases.

92
00:06:21,720 --> 00:06:28,560
So actually, not that much code is complicated, but not particularly more complicated than

93
00:06:28,560 --> 00:06:35,560
other code we've seen, like rank and floor and ceiling, and that implements hybrid deletion.

94
00:06:35,560 --> 00:06:41,920
So now we have a fully dynamic symbol table where we can insert and delete the number of

95
00:06:41,920 --> 00:06:48,000
nodes that we have in the tree is always proportional to the number of key value pairs in a symbol

96
00:06:48,000 --> 00:06:49,640
table.

97
00:06:49,639 --> 00:06:55,240
And the problem is, and this was quite a surprise when it was first discovered.

98
00:06:55,240 --> 00:07:02,839
Actually, many years after, hybrid proposed the algorithm, is this lack of symmetry tends

99
00:07:02,839 --> 00:07:05,039
to lead to difficulties.

100
00:07:05,039 --> 00:07:10,279
And here we're just inserting the leading, alternating, insert and delete a random key.

101
00:07:10,279 --> 00:07:15,560
So that may be well models a situation or practical situation.

102
00:07:15,560 --> 00:07:21,519
And as you watch it go for a while, you can see that this thing about going to the right

103
00:07:21,519 --> 00:07:29,639
and taking the successor all the time, the tree's becoming much less balanced than it was.

104
00:07:29,639 --> 00:07:34,000
And this seems to be a problem.

105
00:07:34,000 --> 00:07:41,639
We can't be having, supposedly having a dynamic situation that is going to allow support

106
00:07:41,639 --> 00:07:44,240
of lots of different inserts and deletes.

107
00:07:44,240 --> 00:07:48,000
And in the end, wind up with a less balanced tree.

108
00:07:48,000 --> 00:07:51,279
What's worse, so how are we going to fix it?

109
00:07:51,279 --> 00:07:59,279
So in the end, researchers showed that after sufficiently long sequence of random inserts

110
00:07:59,279 --> 00:08:04,839
and deletes, the height of the tree becomes square root of n, not log n, spur root of n

111
00:08:04,839 --> 00:08:07,479
is usually bigger than log n.

112
00:08:07,480 --> 00:08:15,080
It might make the difference between acceptable and unacceptable performance in real applications.

113
00:08:15,080 --> 00:08:19,240
And what's worse, if you try to fix it by, say, randomly choosing between the left and

114
00:08:19,240 --> 00:08:21,040
the right, that doesn't work.

115
00:08:21,040 --> 00:08:23,600
It still becomes square root of n.

116
00:08:23,600 --> 00:08:29,680
And it's a very long-standing open problem to find a natural, simple, efficient delete

117
00:08:29,680 --> 00:08:32,360
for binary search trees.

118
00:08:32,360 --> 00:08:36,240
It's another one like merging in place that you'd think there ought to be an easy way to

119
00:08:36,240 --> 00:08:37,240
do it.

120
00:08:37,240 --> 00:08:40,440
In 50 years, no one's really discovered one.

121
00:08:40,440 --> 00:08:43,879
We're going to look at something pretty close in the next lecture.

122
00:08:43,879 --> 00:08:47,440
But here's the situation that we're left with.

123
00:08:47,440 --> 00:08:54,320
We have a binary search tree algorithm, which is fine in that it gives us log n performance

124
00:08:54,320 --> 00:08:59,960
for search and insert in a situation where we can think that these things are happening

125
00:08:59,960 --> 00:09:01,879
randomly.

126
00:09:01,879 --> 00:09:04,799
But we're kind of stuck if we allow delete.

127
00:09:04,799 --> 00:09:08,839
In fact, everything degenerates to square root of n.

128
00:09:08,839 --> 00:09:12,799
And we also have a problem with the worst case.

129
00:09:12,799 --> 00:09:17,919
If the keys happen to have some order in them, our trees are not going to be balanced at

130
00:09:17,919 --> 00:09:18,919
all.

131
00:09:18,919 --> 00:09:25,279
And that's going to make the difference between acceptable and not acceptable performance.

132
00:09:25,279 --> 00:09:30,439
What we're going to look at next time called a red black binary search tree will guarantee

133
00:09:30,439 --> 00:09:33,319
logarithmic performance for all operations.

134
00:09:33,320 --> 00:09:38,680
It's extremely significant and much better than binary search trees.

135
00:09:38,680 --> 00:09:43,920
But the delete operation for binary search trees shows us the kind of complexity that we

136
00:09:43,920 --> 00:09:46,840
can encounter with working with these kinds of data structures.

