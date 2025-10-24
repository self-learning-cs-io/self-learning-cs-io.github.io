---
title: PrincetonAlgorithms P45Part110 04_red Black Bsts
---

1
00:00:00,000 --> 00:00:08,480
Now we'll look at red-black BSTs, which is a simple data structure that allows us to implement

2
00:00:08,480 --> 00:00:16,800
two-three trees with very little extra code beyond the basic binary research tree code.

3
00:00:16,800 --> 00:00:24,240
So this is actually the version that we're looking at is called left-leaning red-black BSTs.

4
00:00:24,959 --> 00:00:31,439
On a personal note, I wrote a research paper on this topic in 1979 with Leo Givas,

5
00:00:31,439 --> 00:00:36,320
and we thought we pretty well understood these data structures at that time,

6
00:00:37,200 --> 00:00:42,320
and people around the world use them in implementing various different systems.

7
00:00:43,119 --> 00:00:50,959
But just a few years ago, for this course, I found a much simpler implementation of red-black trees,

8
00:00:51,439 --> 00:00:57,520
and this is just a case study showing that there are simple algorithms still out there waiting

9
00:00:57,520 --> 00:01:00,160
to be discovered, and this is one of them that we're going to talk about.

10
00:01:01,280 --> 00:01:08,240
So the idea is that we are going to represent every two-three tree as a binary search tree,

11
00:01:08,799 --> 00:01:13,680
in order to get that done, we just need a simple representation for three nodes.

12
00:01:14,320 --> 00:01:22,000
So what we're going to do is use internal left-leaning links to glue the three nodes together.

13
00:01:22,480 --> 00:01:28,480
So the larger of the two nodes in the three node will always be the root of a little binary

14
00:01:28,480 --> 00:01:35,680
search tree of size two for the three node. In the link between the two nodes, the left link that

15
00:01:35,680 --> 00:01:42,480
links the larger key to the smaller one will call a red, and that's to distinguish those links from

16
00:01:42,480 --> 00:01:48,560
the other links in the binary tree, so that we can tell when we're inserting things which nodes

17
00:01:49,280 --> 00:01:56,719
belong to three nodes and which ones don't. And you can see from this transformation that it's easy to

18
00:01:58,800 --> 00:02:04,719
perform this, see this correspondence, the middle link between A and B, those are the keys that are

19
00:02:04,719 --> 00:02:12,479
less than B and larger than A, so that takes two comparisons to get to them. The ones that are

20
00:02:12,479 --> 00:02:17,199
less than A and less than B less than A, that's two comparisons from that, the ones that are greater

21
00:02:17,199 --> 00:02:23,280
than B are the right link of B. So just following those three cases, see that this correspondence is

22
00:02:23,280 --> 00:02:31,120
going to work. So any two-three tree corresponds to a left-leaning red-black BST in this way.

23
00:02:31,599 --> 00:02:40,960
Just take the three nodes and split them into little binary search trees of size two held together

24
00:02:40,960 --> 00:02:49,680
by a red link. And correspondingly, given a red-black BST, then you can get the two-three tree if you

25
00:02:49,680 --> 00:02:56,719
wanted it. But just look at the properties of looking at the properties of a left-leaning red-black

26
00:02:56,719 --> 00:03:05,680
BST, with reference to what we know about two-three trees. First of all, no node has two red links

27
00:03:05,680 --> 00:03:12,319
connected to it because the only red links are internal to three nodes and those have to have

28
00:03:12,319 --> 00:03:19,840
external links or tree links connecting them to some other node. Every path from the root down

29
00:03:19,840 --> 00:03:26,079
to a no-link has the same number of black links that just follows directly from the corresponding

30
00:03:26,080 --> 00:03:33,920
property for two-three trees. A left-leaning red-black BST has perfect black balance in all the red

31
00:03:33,920 --> 00:03:40,960
links lean left. So given a BST with some of the links colored red that has those properties,

32
00:03:40,960 --> 00:03:47,840
that's going to correspond to a two-three tree. And that's a key property is this one-to-one correspondence

33
00:03:47,840 --> 00:03:54,320
between two-three trees and left-leaning red-black trees. Given a two-three tree, we saw how to do it,

34
00:03:54,319 --> 00:04:03,840
given a red-black tree, we just make the red links horizontal and merge the nodes together to be three nodes.

35
00:04:04,639 --> 00:04:10,639
So all of the operations that we're going to look at for red-black trees can be understood in terms

36
00:04:10,639 --> 00:04:17,360
of the corresponding operations on two-three trees. Now, the first and really one of the most

37
00:04:17,360 --> 00:04:27,120
critical observations is that search in a red-black BST is exactly the same as for an elementary BST.

38
00:04:27,120 --> 00:04:33,199
We just ignore the color. Now, it's going to be much faster because of better balance in the tree,

39
00:04:33,199 --> 00:04:39,199
but in terms of the code, we don't have to change the code at all. Our regular search code doesn't

40
00:04:39,199 --> 00:04:46,879
examine the color of a link. And so we can just use it exactly as is. And in fact, most of the other

41
00:04:46,879 --> 00:04:52,800
operations that we implemented on BSTs are also identical. They don't need the colors, but they can

42
00:04:52,800 --> 00:05:01,279
all benefit from the fact that the trees are much better balanced. So this aspect of red-black BSTs

43
00:05:01,279 --> 00:05:09,519
is an extremely nice one because the operations that we implemented for regular BSTs involve some

44
00:05:09,519 --> 00:05:15,040
complicated code for floor and ceiling and rank and so forth. And we don't have to change that code at

45
00:05:15,040 --> 00:05:25,120
all. We just during the insertion make sure that we maintain the properties, the balanced properties.

46
00:05:25,920 --> 00:05:31,280
And by doing that, we wind up with balance trees and we make all the operations quick, and we don't

47
00:05:31,280 --> 00:05:39,280
have to re-implement, we don't have to change them at all. So, before we get to the code for insertion,

48
00:05:39,279 --> 00:05:46,319
we have to look at the red representation. We didn't actually have explicit representation of links.

49
00:05:46,959 --> 00:05:55,359
Our links in trees are just references to nodes. You could implement this by building explicit links,

50
00:05:55,359 --> 00:06:02,799
but an easier thing to do is to notice that every node is referenced by just one link in a tree,

51
00:06:03,520 --> 00:06:11,280
the one from its parents. So you can put the color of a link in the node that it references. So in this case,

52
00:06:13,360 --> 00:06:23,840
we have a red link connecting E and C. What we do is put a bit, a color bit in each in the node class.

53
00:06:23,839 --> 00:06:34,719
And then if the link coming into a node is red, we set that to true. So this simple thing just tests is a node red.

54
00:06:34,719 --> 00:06:44,959
We consider all null nodes to be black. No links to be black. We don't have red links dangling off that would be incomplete three nodes.

55
00:06:45,120 --> 00:06:54,319
Otherwise, if the color is red, we return true. Otherwise, return false to test whether or not it's red.

56
00:06:54,319 --> 00:07:05,839
So in this tree, the color of h.left is red. The color of h.right is black and so forth. So that's the way we represent colors.

57
00:07:05,839 --> 00:07:11,679
By putting a color bit in the node for the color of the link that points to it.

58
00:07:11,920 --> 00:07:21,600
All right. So now there's a couple of elementary operations that we have to perform on red black trees called rotations.

59
00:07:21,600 --> 00:07:32,399
And the idea is that during the construction of a tree, during an insertion operation, sometimes we wind up with red links that are leaning in the wrong direction.

60
00:07:33,279 --> 00:07:48,479
So we'll need what's called a left rotation. And the job of that operation is to take a right leaning red link that is there for whatever reason and reorient it to lean to the left.

61
00:07:50,479 --> 00:07:58,079
So in this case, we have the right link of e points to s and s is red. So that's a right leaning red link.

62
00:07:58,879 --> 00:08:06,639
And so that's the before. And what we want to do is reorient things so that it leans to the left.

63
00:08:06,639 --> 00:08:21,919
And again, that has to be a local operation that only changes a few links. And just from the diagram, it's not difficult to see that this little bit of code will do the job.

64
00:08:22,879 --> 00:08:42,480
If we start with the right leaning red link. So first thing we do is take the reference of h.write and save that in x. So that's the node that's going to be the new root of the three nodes, so to speak.

65
00:08:43,440 --> 00:08:59,039
And then x.left after the rotation is going to be h. And also whatever color h was, well, looks like it should be black, but actually this situation's where it could be red.

66
00:08:59,039 --> 00:09:06,480
Then x is going to have that color because the link coming into h is going to be the link coming into x.

67
00:09:07,200 --> 00:09:16,399
And then h is color is going to be black afterwards. And then we return x to link further up the tree, which happens during our standard recursive insert.

68
00:09:19,279 --> 00:09:29,840
So that's a rotate left operation. Now the property of this operation, that's very important is it maintains a symmetric order.

69
00:09:29,840 --> 00:09:37,759
The keys between E and s are still there. We just changed the way we get to them in the keys less than E and so forth.

70
00:09:37,759 --> 00:09:57,920
And also we maintain perfect black balance because we didn't change the black height of anything by doing this transformation. All those subtrees, those three subtrees are exactly the same relative to the top and bottom of the tree as they were before the rotation.

71
00:10:00,800 --> 00:10:19,600
Now paradoxically, and you'll see why very soon, it also turns out that to get the insertion done properly, we sometimes need to take a left leaning red link and temporarily make it lean right.

72
00:10:20,159 --> 00:10:26,399
Later on, we'll get it back to the left again, but anyway, that's a basic operation that we sometimes need.

73
00:10:27,920 --> 00:10:42,159
So that's just the symmetric code to the code that we just did. Now x is h dot left and h dot left is going to be x dot right after the rotation.

74
00:10:42,319 --> 00:10:49,759
x is color still going to be h is color and h is color is going to be red in the right rotation implements this.

75
00:10:52,399 --> 00:11:03,120
And again, that's going to maintain a symmetric order in perfect black balance. We changed the way the red goes, but we didn't change anything about the black.

76
00:11:04,080 --> 00:11:05,919
Okay, that's a right rotation.

77
00:11:07,600 --> 00:11:13,039
Now here's the third elementary operation that we're going to perform. It's called a color flip.

78
00:11:13,919 --> 00:11:21,440
Sometimes during the insertion, we might wind up with a node that's got two red links coming out of it.

79
00:11:22,000 --> 00:11:28,560
That's corresponds precisely to our temporary forenode when we're doing two three trees.

80
00:11:29,199 --> 00:11:35,279
And what we wanted to do with the temporary forenode was to split it and pass the center node up to the root.

81
00:11:35,759 --> 00:11:39,039
Well, you can see from this structure that we're all set to do that.

82
00:11:40,079 --> 00:11:44,239
All we need to do actually is not change any links, just change all the colors.

83
00:11:45,439 --> 00:11:52,879
And so that is we changed the link from e to a and from e to s to be black. That essentially splits the forenode.

84
00:11:53,600 --> 00:12:01,840
And then we want to insert the e into its parent. And we just do that by changing its link to be red.

85
00:12:02,639 --> 00:12:09,679
So that's flipping the colors. And that's the way we split a temporary forenode in a left-leaning red black tree.

86
00:12:10,240 --> 00:12:14,639
And again, that's just flipping colors. It doesn't change any links. So it's still, of course,

87
00:12:14,639 --> 00:12:20,960
maintain symmetric order and perfect black balance. So those are the three basic operations we're going to use.

88
00:12:20,960 --> 00:12:28,399
Rotate left, rotate right, and flip colors. So the basic strategy is with those operations,

89
00:12:28,720 --> 00:12:37,360
maintain one-to-one correspondence with two three trees when we do insertions. So here's an example.

90
00:12:38,320 --> 00:12:48,320
If we want to insert c into this red black tree, which is a representation of this two three tree,

91
00:12:49,039 --> 00:12:58,159
then c is going to be less than e greater than a. So it'll get added as the right link of a.

92
00:12:58,159 --> 00:13:07,039
And every time we add a node, we just create a red link to its parents. And so that's changing the two node into a three node.

93
00:13:07,519 --> 00:13:14,320
In this case, it's a three node that's oriented the wrong way, so we need to do a left rotate.

94
00:13:14,320 --> 00:13:22,720
After we do the left rotate, we have a legal left-leaning red black tree, and it exactly corresponds to that two three tree.

95
00:13:22,720 --> 00:13:27,759
So the insertion of c gives us exactly what we'd want, the correspondence with the two three tree.

96
00:13:28,320 --> 00:13:35,600
We have to work through other cases that can arise, but there's not too many, so we'll work through them.

97
00:13:35,680 --> 00:13:39,600
And we have the basic operations, left rotate, right rotate, and flip colors.

98
00:13:40,320 --> 00:13:45,040
All right, so first warm up, insert into a tree with exactly one node.

99
00:13:46,000 --> 00:13:50,879
Well, if it goes on the left, then we just make a red link and add it on, and we're done.

100
00:13:51,920 --> 00:13:57,200
If it goes on the right, then we attach a new node with a red link on the right,

101
00:13:57,200 --> 00:14:00,560
but we have to rotate it to the left to make a legal three node.

102
00:14:01,279 --> 00:14:06,479
So that's insert into a tree with a one node and make it a tree with two nodes.

103
00:14:08,319 --> 00:14:14,239
And that one generalizes to help us insert into a two node at the bottom.

104
00:14:15,599 --> 00:14:26,399
So we do the standard VST insert, color the new link red, and then if that new three node happens to

105
00:14:26,399 --> 00:14:29,840
lean right, rotate it to the left. That's the case that we just did.

106
00:14:31,919 --> 00:14:37,919
So now let's look at a second warm up. So say we have just two nodes in the tree, so it's a,

107
00:14:38,639 --> 00:14:41,679
we have two nodes, and that means it's a single three node.

108
00:14:42,879 --> 00:14:50,319
Then there's three cases. So one is that the new one is larger than both of the keys.

109
00:14:51,040 --> 00:14:55,520
If that's true, then we attach the new node with a red link as always,

110
00:14:56,240 --> 00:15:01,840
and that gives us a temporary four node. And what we want to do is split that four node,

111
00:15:02,560 --> 00:15:07,200
and in this case, since we're at the root, that's all, so that just flips the colors.

112
00:15:07,760 --> 00:15:12,800
Now the color of the root in our code would temporarily turn red and then would turn a black again.

113
00:15:13,759 --> 00:15:22,000
So that's inserting into a tree that's a single three node, a node that's larger than both of them,

114
00:15:22,000 --> 00:15:25,679
a key that's larger than both of them, and we get wind up with a four node.

115
00:15:25,679 --> 00:15:31,839
But let's look at the other two cases, and these understanding these is crucial to understanding the whole algorithm.

116
00:15:32,719 --> 00:15:36,559
Let's say the new key is smaller than both of the keys in our three node.

117
00:15:37,199 --> 00:15:42,639
We attach a new link at the left of the smaller node,

118
00:15:43,519 --> 00:15:48,159
and now we've got to find BST, but it has two red links in a row.

119
00:15:48,879 --> 00:15:55,919
And that's something that's not allowed. So what we're going to do is we're going to rotate the top link to the right.

120
00:15:57,439 --> 00:16:02,639
So that puts B at the root, and now it's got two red children.

121
00:16:02,720 --> 00:16:16,960
It reduces it to this case, and we flip the colors, and we have a single four node, sorry, a red-black tree that's got three two nodes in no red links.

122
00:16:18,159 --> 00:16:25,600
Same situation as before. So we had a single temporary four node, and we split it up into two two nodes, and I connected to a two node.

123
00:16:26,560 --> 00:16:37,360
And then, so that's the case when it's smaller. Now we have to look at the third case, which is when the new node is inserted as in between, and comes out at this link here.

124
00:16:38,399 --> 00:16:47,200
Again, we just add a red link, and now we have a BST with two red links along a path connected to a, and that's not allowed.

125
00:16:48,160 --> 00:16:55,759
In this case, it's a bit trickier to fix the situation. What we do is we rotate the bottom link left.

126
00:16:57,600 --> 00:17:09,759
So, and that gives us this, and reduce it to the other situation that we had before, and then we rotate the top link right, and then we flip the colors.

127
00:17:10,559 --> 00:17:16,319
So this one, we use all three of our operations. Rotate left, rotate right, and flip the colors.

128
00:17:16,960 --> 00:17:26,960
And that gets us an insertion into a tree that has, from a tree that is a single three node, to a tree that is three two nodes containing three keys.

129
00:17:28,960 --> 00:17:36,640
So that sort of operation is going to work in a big tree when we insert into a new three node at the bottom.

130
00:17:37,360 --> 00:17:57,440
We do the standard BST insert, color the new link red, and we do the rotations that we need, either one or two rotations to balance the temporary four node, and then we flip colors to pass the red link up one level, and then we might need to rotate to that and to make that one lean left.

131
00:17:57,440 --> 00:18:05,120
So, for example, if we insert H into this tree here, it comes off as the left link to var.

132
00:18:05,919 --> 00:18:14,319
So that gives us a temporary four node that's not balanced, so we need to rotate the link from S to the right.

133
00:18:15,519 --> 00:18:21,519
And that gives us now a temporary four node that is balanced. And again, these are all local transformations.

134
00:18:21,519 --> 00:18:23,519
It's not changing the rest of the tree.

135
00:18:24,319 --> 00:18:34,719
Now we flip colors, and that gives us a good red black tree, except that one red line.

136
00:18:34,720 --> 00:18:39,920
Red link that we just made is leaning the wrong way, so now we need to rotate left.

137
00:18:40,559 --> 00:18:44,880
And then once we've done that, now we have a legal left leaning red black tree.

138
00:18:46,079 --> 00:18:51,519
So that's a insertion into a three node at the bottom.

139
00:18:53,120 --> 00:19:03,519
So here's another one that involves, remember we passed that red link up, if that gets passed up to a three node,

140
00:19:03,519 --> 00:19:12,000
then we have to continue moving up the tree and just treat it in the same way as we just treated

141
00:19:12,639 --> 00:19:17,920
inserting at the bottom. We have a new red link appearing into some three node.

142
00:19:18,400 --> 00:19:27,119
There's the three cases that could happen. Here's an example. So say we're inserting P into this

143
00:19:27,119 --> 00:19:33,359
left leaning red black tree. It goes to the right of M, so we get a temporary four node that's got

144
00:19:34,159 --> 00:19:38,799
two red links, both children are red and that thing, so we want to flip the colors.

145
00:19:39,759 --> 00:19:48,479
We flip the colors, and now our temporary four node is up higher in the tree, but it's not balanced.

146
00:19:48,479 --> 00:19:51,679
So we're going to have to do two rotations to make that balanced.

147
00:19:51,840 --> 00:20:00,480
First one is to make the bottom link left leaning, and then the second one is to make the top link right leaning

148
00:20:01,120 --> 00:20:04,240
so that we can have the temporary four node balanced.

149
00:20:05,120 --> 00:20:10,640
And then the last thing we do is flip the colors, and now that's the result of that insertion.

150
00:20:11,200 --> 00:20:17,440
It's a bunch of transformations, but they're all simple using our flip colors or left or right rotation.

151
00:20:17,920 --> 00:20:28,400
And that one happened to be at the root. If that red link were way down in the tree, and there were another three node above it, we might have to do it again.

152
00:20:28,720 --> 00:20:31,600
Again, exactly as would happen in a two, three tree.

153
00:20:33,440 --> 00:20:40,240
So let's do a demo of constructing the red black BST from our standard set of keys.

154
00:20:41,039 --> 00:20:50,799
So we start with a single key, and now if we want to insert E, it goes to the left, that's fine.

155
00:20:51,039 --> 00:21:03,039
That's a legal left leaning red black tree. A would go to the left of E, two left in a row, so we have to rotate S right, and then we have to flip the colors.

156
00:21:03,680 --> 00:21:05,839
And that's a legal red black BST.

157
00:21:07,119 --> 00:21:16,480
So now if we insert R into this one, then it goes on a red link to the left of X, S, and that's fine, it's a red black BST.

158
00:21:17,599 --> 00:21:22,799
Now if we insert C into this one, it goes less than E greater than A.

159
00:21:23,759 --> 00:21:29,839
It's a red link connecting A and C, but it's leaning the wrong way, so we have to do a left rotation.

160
00:21:29,919 --> 00:21:41,199
Legal red black BST. We want to insert H, that goes to the left of R, two reds in a row, rotate the top.

161
00:21:42,240 --> 00:21:45,679
Rotate the top, our temporary four notice balanced, flip colors.

162
00:21:47,439 --> 00:21:53,919
Now we have a three node, but the red link is leaning right, so we have to rotate.

163
00:21:53,920 --> 00:22:06,000
And then now we have a legal red black BST. Insert X into that one, it goes to the right of S, that's certainly leaning the wrong way, rotate left.

164
00:22:08,480 --> 00:22:14,480
Insert M into this one, it goes to the right of H, leaning the wrong way, rotate left.

165
00:22:14,720 --> 00:22:29,360
Most of the operations are simple ones like this happening at the bottom. Insert P, that goes to the right of M, that makes M a temporary four node that happens to be balanced, so flip the colors.

166
00:22:31,200 --> 00:22:36,720
Flip the colors, now we have a temporary four node that's out of balance, so we need a double rotation.

167
00:22:36,799 --> 00:22:48,480
First rotate E to make that link point lean to the left, then rotate R to bring the temporary four node into balance, and then flip the colors.

168
00:22:48,640 --> 00:22:59,279
And that's a legal red black BST. Insert L into that one, goes to the right of H, leaning the wrong way, rotate left.

169
00:22:59,359 --> 00:23:07,039
And that's an example of building a red black BST from our standard set of keys.

170
00:23:09,599 --> 00:23:17,440
Now we're ready to look at the implementation of the code for inserting into a left leaning red black tree.

171
00:23:18,000 --> 00:23:25,360
And the key to understanding this code is to realize that the same code handles all of the cases.

172
00:23:26,400 --> 00:23:31,279
And the way that it works is we're always reducing one case to another.

173
00:23:32,320 --> 00:23:41,440
We got this most complicated case, we did a left rotate on the bottom node, and that transformed it to this case where they're both leaning left.

174
00:23:42,000 --> 00:23:52,000
And then we did a right rotate on the top node, and that transformed to the case where our temporary four node is balanced, and then we flip colors on that.

175
00:23:52,720 --> 00:23:58,080
So for a particular insertion, we can take advantage of this, reduce one case to another,

176
00:23:59,279 --> 00:24:10,960
by in the way that we're moving in the tree to get everything happen with just a few extra lines of code in our standard binary search tree.

177
00:24:11,519 --> 00:24:16,720
So in gray is our standard insertion code for binary search trees.

178
00:24:17,759 --> 00:24:32,880
And remember, we took some pains to think about the recursive implementation where when we go down a link, we replace that link by whatever the recursive routine gives us back.

179
00:24:33,760 --> 00:24:38,240
And that strategy is going to pay off in giving us a really simple code.

180
00:24:39,920 --> 00:24:47,200
And because in this implementation for left leaning red black trees, we're going to return the link whenever we're done.

181
00:24:47,920 --> 00:24:54,320
And then that'll get that link installed up in the node above, whether it be left or right.

182
00:24:55,039 --> 00:25:10,399
Typical implementations of red black trees that do not use this recursive strategy wind up having lots of cases depending on whether left or right or double rotate to the left or double rotate to the right.

183
00:25:11,119 --> 00:25:16,000
It can be critical of this code because my own code was this way for the first three editions of the book.

184
00:25:16,639 --> 00:25:22,000
It's only a misadition that we figured out how to make the code this simple.

185
00:25:22,960 --> 00:25:26,160
Okay, so one of the things that have to be done, let's just check.

186
00:25:27,599 --> 00:25:37,440
When we insert a new node, all we want to do is create a new node with the given associating the given value with the given key as before.

187
00:25:38,160 --> 00:25:47,759
But now we just make that node red. So that's adding a new node with a red link at the bottom, inserting that into whatever.

188
00:25:47,839 --> 00:25:52,319
Two or three nodes attached to.

189
00:25:53,519 --> 00:26:16,000
And then we do the comparisons as before and that's all fine. Now when it's returned, then that's the point at which we're going to check whether the links are leaning to the left as they're supposed to and whether or not there are any double links or not.

190
00:26:16,640 --> 00:26:33,119
So the first thing is if is red h dot right and not is red h dot left. So that means h is h dot right is red.

191
00:26:33,679 --> 00:26:41,359
So that means that the right link of h is leaning the wrong way. h is a three node leaning the wrong way.

192
00:26:41,599 --> 00:26:52,799
So we just rotate left h. So whenever we find a right link or sitting on a right red link, we just rotate it left and return that.

193
00:26:52,959 --> 00:26:57,439
So that would be in this case here, would rotate it left and reduce it to that one.

194
00:26:57,519 --> 00:27:11,519
Or in the case one, we're just inserting a new node and it turns out to be the right red link attached to a black one.

195
00:27:12,160 --> 00:27:25,039
So that handles that case. Now if h dot left is red and h dot left that left is also red, that's this case here where we have two left leaning red links.

196
00:27:25,359 --> 00:27:36,879
Then in that case we just rotate the top one right and that brings us to this one. So notice that we're in this case we do this rotation first, we're on this node.

197
00:27:37,599 --> 00:27:45,440
And then that returns when we come up to a deal with the situation on this node after the return and then we do that rotation.

198
00:27:46,000 --> 00:27:55,039
And then after that rotation or if there were no rotations at all if the insertion happened over here, then we test and flip the colors.

199
00:27:55,840 --> 00:28:09,360
It's a little mind bending at first because of the recursive structure, but it won't take you long to convince yourself that this little bit of extra code completes the implementation of left leaning red black trees.

200
00:28:09,440 --> 00:28:13,759
It's quite remarkable actually. So let's look at a visualization.

201
00:28:16,400 --> 00:28:27,440
Watching about this is a balanced tree getting constructed in the worst case where everything that comes in is in ascending order.

202
00:28:28,000 --> 00:28:35,279
A regular binary search tree would just be all string out in a single line and would have quadratic time for this input.

203
00:28:36,000 --> 00:28:45,120
But a left leaning red black tree actually when it whenever it becomes a power of two is completely balanced as you can see from this example.

204
00:28:46,320 --> 00:28:52,400
Even though they came in ascending order the tree winds up being perfectly balanced.

205
00:28:53,759 --> 00:29:06,559
And what about descending order? Well it's left leaning and the process is a little bit different and sometimes the left path can get long but not that long.

206
00:29:07,119 --> 00:29:11,039
The worst that can happen is that it alternates red and black.

207
00:29:13,039 --> 00:29:21,839
And then after it gets to that worst case it also winds up being completely balanced when we have a power of two.

208
00:29:22,480 --> 00:29:30,319
Interesting to think just about this case and to prove to yourself that it's always going to be perfectly balanced when it's descending.

209
00:29:30,960 --> 00:29:34,639
And this is just for random insertions.

210
00:29:36,879 --> 00:29:51,519
The tree stays very balanced. It's guaranteed that the longest path which is alternating red and black can be no more than twice as long as the shortest path which is all blacks.

211
00:29:51,519 --> 00:30:10,720
And so in this case the longest path is 10 and the average path is 7 for 255. Very close to log base 2 of n.

212
00:30:10,720 --> 00:30:23,920
So easy to prove by correspondence with two three trees that the height is guaranteed to be less than two log base 2 n.

213
00:30:24,880 --> 00:30:30,480
Every search in a left leaning red, black tree is guaranteed to take less than two log base 2 of n.

214
00:30:31,519 --> 00:30:35,519
Because every pass got the same number of black lengths. He never had two red lengths in a row.

215
00:30:36,160 --> 00:30:58,319
And actually in typical applications with any kind of randomness or even if there's a lot of order it's difficult to find situations, orders of keys that build trees that height is bigger than actually one log n.

216
00:30:58,960 --> 00:31:04,319
In in real applications it's very close to fully balanced all the time.

217
00:31:06,480 --> 00:31:15,519
So that completes our summary for symbol table implementations. With red black BSTs we have full code.

218
00:31:15,680 --> 00:31:26,879
It's the regular BST code with a couple of lines adding the calls on the basic operations to rotate right, rotate left and color flip.

219
00:31:26,879 --> 00:31:33,039
And we get guaranteed logarithmic performance. Not just for search insert in delete.

220
00:31:33,039 --> 00:31:38,079
Well delete code is a bit more complicated but it's on the book side and in the book.

221
00:31:38,960 --> 00:31:54,399
But also since it's the compare to interface and since it's a binary tree representation all the other comparable operations extended operations for ordered symbol tables are going to be implemented and take time proportional to log n.

222
00:31:55,360 --> 00:32:18,640
A lot of people ask why did we use the name red black? Well we invented this data structure of this way of looking at balanced trees at at Xerox Park which was the home of the personal computer and many other innovations that we live with today and turning graphic years in interface and internet and object oriented programming and many other things.

223
00:32:18,880 --> 00:32:32,000
But one of the things that was invented there was laser printing and we were very excited to have nearby color laser printer that could print things out in color and out of the colors the red look the best.

224
00:32:32,000 --> 00:32:43,680
So that's why we picked the color red to distinguish red links the types of links in three notes. So that's an answer the question for people that have been asking.

225
00:32:44,400 --> 00:33:03,600
There's another war story about red black bsts as I mentioned they're widely used and there was an example not that long ago where a telephone company contracted with a database provider to build a database base that could store customer information.

226
00:33:03,599 --> 00:33:25,519
And the provider implemented the database using red black bsts for search and insert. Now our original paper on red black trees was the way the paper was laid out a turnout that the delete implementation happened to be placed after all the references.

227
00:33:25,519 --> 00:33:43,440
So a lot of people didn't see the delete implementation and also we didn't have the simple left leaning representation. So it was more complicated and involved a lot more cases and so usually not all the cases were put in the textbooks.

228
00:33:43,440 --> 00:33:53,680
So people found deletion more difficult in fact that's what led to led me to analyze the situation and come up with the left leaning variant.

229
00:33:54,640 --> 00:34:12,720
So what they did in this implementation was they just put in regular hybrid deletion in the binary search in the red black bst not the deletion algorithm that's guaranteed to keep the constant black height all the time.

230
00:34:12,719 --> 00:34:42,639
But they still thought that it should be balanced and it shouldn't matter much and they had a complex error recovery process that got triggered if the height limit got too big and they rebuilt the whole tree and then because of the way they did this deletion well the end of the story was that they had an example.

231
00:34:42,639 --> 00:35:12,559
The client had extended outage because the implementer didn't use the full algorithm and there was a lawsuit and some legal testimony and happy to report that the it was clear that hybrid deletion was the problem once the expert analyze it and the expert witness whose colleague of mine said if implemented properly the height of a red black bst.

232
00:35:12,559 --> 00:35:23,519
So that's the story of red black bst's guaranteed log of performance for all symbol table operations.

