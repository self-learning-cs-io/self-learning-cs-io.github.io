---
title: CS143 P58Week509 05 B+Type+Checking
---

1
00:00:00,000 --> 00:00:05,000
To summarize, type checking proves facts of the form e has type t.

2
00:00:05,000 --> 00:00:09,000
Notice that this proof is on the structure of the abstract syntax tree.

3
00:00:09,000 --> 00:00:17,000
So for the expression 1 plus 2, we prove something about 1 plus 2, but by first proving something about each of the sub-expressions.

4
00:00:17,000 --> 00:00:25,000
So we prove that the sub-expressions had type int, and then we managed to prove that the whole thing had type int.

5
00:00:25,000 --> 00:00:32,000
And so the proof has the same shape as the abstract syntax tree. You can look at this proof as a tree.

6
00:00:32,000 --> 00:00:37,000
Now the root of the tree in the case of the proof is at the bottom usually we draw the abstract syntax tree with the root at the top.

7
00:00:37,000 --> 00:00:43,000
So this tree looks like this, whereas we often draw the abstract syntax tree in the other way around.

8
00:00:43,000 --> 00:00:51,000
But the important thing here is that the proof has the shape of the abstract syntax tree, and there's one type rule that's used for each abstract syntax tree node.

9
00:00:51,000 --> 00:00:58,000
So there's a very direct correspondence between the structure of the proof and the shape of the abstract syntax tree.

10
00:00:58,000 --> 00:01:07,000
And in general, the type rule used for a particular node of the abstract syntax tree, the hypotheses, are going to be the proofs of the types of e's sub-expressions.

11
00:01:07,000 --> 00:01:17,000
So whatever expressions make up e, we're going to need types for them first, and the conclusion at that particular node will be the type of the entire expression e.

12
00:01:17,000 --> 00:01:22,000
And then this way you can see the types are computed in a bottom-up pass over the abstract syntax tree.

13
00:01:22,000 --> 00:01:30,000
That is, I sign first types to the leaves, like here I know that one has type int and two has type int, and then the types flow towards the root.

14
00:01:30,000 --> 00:01:34,000
I'm able to compute then the next level of the abstract syntax tree and so on.

15
00:01:34,000 --> 00:01:42,000
And once I've computed the types of all the sub-expressions of a node, then I can compute the type at that node.

