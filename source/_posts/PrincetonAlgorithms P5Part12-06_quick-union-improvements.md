---
title: PrincetonAlgorithms P5Part12 06_quick Union Improvements
---

1
00:00:00,000 --> 00:00:09,000
Okay, so we've looked at the quick union and quick find algorithms, both of which are easy

2
00:00:09,000 --> 00:00:14,919
to implement, but simply can't support huge dynamic commentativity problems.

3
00:00:14,919 --> 00:00:16,519
So how are we going to do better?

4
00:00:16,519 --> 00:00:20,519
That's what we'll look at next.

5
00:00:20,519 --> 00:00:23,960
A very effective improvement is called waiting, and it might have occurred to you while we're

6
00:00:23,960 --> 00:00:26,400
looking at these algorithms.

7
00:00:26,399 --> 00:00:33,719
The idea is to, when implementing the quick union algorithm, take steps to avoid having

8
00:00:33,719 --> 00:00:36,280
tall trees.

9
00:00:36,280 --> 00:00:43,719
If you've got a large tree and a small tree to combine together, what you want to try

10
00:00:43,719 --> 00:00:47,359
to do is avoid putting the large tree lower.

11
00:00:47,359 --> 00:00:50,480
That's going to lead to long tall trees.

12
00:00:50,480 --> 00:00:53,200
And there's a relatively easy way to do that.

13
00:00:53,200 --> 00:00:59,480
What we'll do is we'll keep track of the number of objects in each tree, and then we'll

14
00:00:59,480 --> 00:01:06,240
maintain balance by always making sure that we link the root of the smaller tree to the

15
00:01:06,240 --> 00:01:08,439
root of the larger tree.

16
00:01:08,439 --> 00:01:14,560
So we avoid this first situation here where we put the larger tree lower.

17
00:01:14,560 --> 00:01:18,480
In the weighted algorithm, we always put the smaller tree lower.

18
00:01:18,480 --> 00:01:20,280
How we, let's see how we implement that.

19
00:01:20,680 --> 00:01:22,840
I'll see a demo first.

20
00:01:22,840 --> 00:01:33,320
Okay, so again, we start out in our normal starting position where everybody's in their own

21
00:01:33,320 --> 00:01:35,120
tree.

22
00:01:35,120 --> 00:01:43,760
And when there's only two items to link, it works the same way as before.

23
00:01:43,760 --> 00:01:49,799
But now when we have eight to merge with four and three, we put the eight as the child

24
00:01:49,799 --> 00:01:56,799
and the matter which order the arguments came because it's the smaller tree.

25
00:01:56,799 --> 00:02:03,000
So six and five doesn't matter, whichever one goes down doesn't matter.

26
00:02:03,000 --> 00:02:04,000
Nine and four.

27
00:02:04,000 --> 00:02:08,039
So now nine's the small one, four's the big one, so nine's going to be the one that goes

28
00:02:08,039 --> 00:02:12,240
down below.

29
00:02:12,240 --> 00:02:16,479
Two and one.

30
00:02:16,479 --> 00:02:17,960
Five and zero.

31
00:02:17,960 --> 00:02:28,159
So now five and zero, five's in the bigger tree, so zero goes below.

32
00:02:28,159 --> 00:02:38,319
Seven and two, two's in the bigger tree, so seven goes below.

33
00:02:38,319 --> 00:02:49,400
Six and one, they're in equal size trees.

34
00:02:49,400 --> 00:02:57,159
And seven and three, three's in the smaller tree, so it goes below.

35
00:02:57,159 --> 00:03:08,560
So the weighted algorithm always makes sure that the smaller tree goes below.

36
00:03:08,560 --> 00:03:13,639
And again, we wind up with a single tree representing all the objects, but this time we have

37
00:03:13,639 --> 00:03:18,120
some guarantee that no item is too far from the root.

38
00:03:18,120 --> 00:03:23,199
And we'll talk about that explicitly in a second.

39
00:03:23,199 --> 00:03:30,560
So here's an example that shows the effect of doing the weighted quick union where we

40
00:03:30,560 --> 00:03:37,919
always put the smaller tree down below for the same set of union commands.

41
00:03:37,919 --> 00:03:41,799
This is with a hundred sites and 88 union operations.

42
00:03:41,799 --> 00:03:48,280
You can see in the top the big tree has some trees, some nodes, a fair distance from the

43
00:03:48,280 --> 00:03:50,039
root.

44
00:03:50,039 --> 00:03:55,799
And the bottom for the weighted algorithm, all the nodes are within distance four from the

45
00:03:55,799 --> 00:04:01,519
average distance to the root is much, much lower.

46
00:04:01,519 --> 00:04:06,239
Let's look at the Java implementation and then we'll look in more detail at that quantitative

47
00:04:06,239 --> 00:04:08,000
information.

48
00:04:08,000 --> 00:04:14,599
So we use the same data structure, except now we need an extra array that for each item

49
00:04:14,599 --> 00:04:19,519
gives the number of objects in the tree rooted at that item.

50
00:04:19,519 --> 00:04:22,479
That will maintain in the union operation.

51
00:04:22,479 --> 00:04:26,719
Find implementation is identical to for quick union, you're just checking whether the roots

52
00:04:26,719 --> 00:04:28,079
are equal.

53
00:04:28,079 --> 00:04:35,879
For the union implementation, we're going to modify the code to check the sizes and link

54
00:04:35,879 --> 00:04:40,560
the root of the smaller tree to the root of the larger tree in each case.

55
00:04:40,560 --> 00:04:46,159
And then after changing the ID link, we also change the size array.

56
00:04:46,160 --> 00:04:53,280
If we make ID, I, a child of J, then we have to increment the size of J's tree by the size

57
00:04:53,280 --> 00:04:54,840
of I's tree.

58
00:04:54,840 --> 00:04:58,200
Or if we do the other way around, then we have to increment the size of I's tree by the

59
00:04:58,200 --> 00:05:00,000
size of J's tree.

60
00:05:00,000 --> 00:05:05,879
So that's the full code in white for implementing quick union.

61
00:05:05,879 --> 00:05:10,840
So not very much code, but much, much better performance.

62
00:05:10,839 --> 00:05:20,799
In fact, we can analyze the running time mathematically and show that the find operation, it takes

63
00:05:20,799 --> 00:05:25,639
time proportional to how far down the trees are in the node.

64
00:05:25,639 --> 00:05:31,339
The nodes are in the tree, but we can show that it's guaranteed that the depth of any

65
00:05:31,339 --> 00:05:37,679
node in the tree is at most the logarithm to the base 2 of n.

66
00:05:37,680 --> 00:05:43,680
We use the notation LG always for logarithm to the base 2.

67
00:05:43,680 --> 00:05:46,519
And so if n is 1,000, that's going to be 10.

68
00:05:46,519 --> 00:05:50,280
If n is 1,000, that's 1,000,000, that's 30.

69
00:05:50,280 --> 00:05:53,720
It's a very small number compared to n.

70
00:05:53,720 --> 00:05:56,280
So let's look at the proof of that.

71
00:05:56,280 --> 00:06:03,240
We do some mathematical proofs in this course when they're critical, such as this one.

72
00:06:03,240 --> 00:06:08,840
And why is it true that the depth of any node x is at most log base 2 of n?

73
00:06:08,840 --> 00:06:16,240
Well, the key to understanding that is to take a look at exactly when does the depth of any node

74
00:06:16,240 --> 00:06:16,740
increase?

75
00:06:16,740 --> 00:06:19,639
When does it go down further in the tree?

76
00:06:19,639 --> 00:06:32,240
Well, the x's depth will increase by 1 when its tree, t1 in this diagram, is merged into some other tree, t2 in this diagram.

77
00:06:32,240 --> 00:06:42,240
Well, at that point, we said we'd only do that if the size of t2 was bigger than or equal to the size of t1.

78
00:06:42,240 --> 00:06:50,439
So when the depth of x increases, the size of its tree at least doubles.

79
00:06:50,439 --> 00:06:58,540
So that's the key, because that means that the size of the tree containing s can double at most log n times.

80
00:06:58,540 --> 00:07:05,140
Because if you start with 1 and double log n times you get n, and there's only n nodes in the tree.

81
00:07:05,140 --> 00:07:11,740
So that's a sketch of a proof that the depth of any node x is at most log base 2 of n.

82
00:07:11,740 --> 00:07:17,140
And that has profound impact on the performance of this algorithm.

83
00:07:17,140 --> 00:07:22,939
Now, instead of the initialization always takes time proportional to n.

84
00:07:22,939 --> 00:07:30,740
But now both the union and the connected or find operation takes time proportional to log base 2 of n.

85
00:07:30,740 --> 00:07:34,339
And that is an algorithm that scales.

86
00:07:34,339 --> 00:07:43,339
If n grows from a million to a billion, that cost goes from 20 to 30, which is quite acceptable.

87
00:07:43,339 --> 00:07:47,540
Now, this was very easy to implement, and we could stop.

88
00:07:47,540 --> 00:07:55,340
But usually what happens in the design of algorithms is now that we understand what it is that gains performance.

89
00:07:55,340 --> 00:07:58,939
We take a look and see, well, could we improve it even further?

90
00:07:58,939 --> 00:08:05,939
And in this case, it's very easy to improve it much, much more.

91
00:08:05,939 --> 00:08:09,740
And that's the idea of path compression.

92
00:08:09,740 --> 00:08:19,340
And this idea is that while when we're trying to find the root of the tree containing a given node,

93
00:08:19,340 --> 00:08:25,939
we're touching all the nodes on the path from that node to the root.

94
00:08:25,939 --> 00:08:33,139
While we're doing that, we might as well make each one of those just point to the root because no reason that to.

95
00:08:33,139 --> 00:08:49,340
So when we're trying to find the root of p, after we find it, we might as well just go back and make every node on that path just point to the root.

96
00:08:49,340 --> 00:08:52,139
That's going to be a constant extra cost.

97
00:08:52,139 --> 00:08:54,139
We went up the path once to find the root.

98
00:08:54,139 --> 00:08:58,139
Now we'll go up again to just flatten the tree up.

99
00:08:58,139 --> 00:09:00,740
And the reason would be no reason not to do that.

100
00:09:00,740 --> 00:09:07,740
We had one line of code to flatten the tree amazingly.

101
00:09:07,740 --> 00:09:18,139
Actually, to make a one line of code, we use a simple variant where we make every other node in the path point to its grandparent on the way up the tree.

102
00:09:18,139 --> 00:09:24,139
That's not quite as good as totally flattening actually in practice.

103
00:09:24,139 --> 00:09:26,940
It actually is just about as good.

104
00:09:26,940 --> 00:09:32,940
So with one line of code, we can keep the trees almost completely flat.

105
00:09:32,940 --> 00:09:40,940
Now, this algorithm, people discovered rather early on after figuring out the weighting.

106
00:09:40,940 --> 00:09:48,940
And it turns out to be fascinating to analyze quite beyond our scope.

107
00:09:48,940 --> 00:09:57,940
But mention this example to illustrate how even a simple algorithm can have interesting and complex analysis.

108
00:09:57,940 --> 00:10:15,940
And what was proved by Hopper-Often-Olemann and Tarjan was that if you have an object, any sequence of M union and find operations will touch the array at most, the constant of N plus M log star N times.

109
00:10:15,940 --> 00:10:18,940
And our log star N is kind of a funny function.

110
00:10:18,940 --> 00:10:26,940
It's the number of times you have to take the log of N to get one in the way to, it's called the iterated log function.

111
00:10:26,940 --> 00:10:38,940
And in the real world, it's best to think of that as a number less than five because log star of two to the 65536 power is five.

112
00:10:38,940 --> 00:10:48,940
So that means that the running time of weighted quid union with path compression is going to be linear in the real world.

113
00:10:48,940 --> 00:10:59,940
And actually can be improved to even a more interesting function called the Ackerman function, which is even more slowly growing than log star.

114
00:10:59,940 --> 00:11:12,940
And another point about this is it's seen this is so close to being linear that is time proportional to N instead of time proportional to N times a slowly growing function in N.

115
00:11:12,940 --> 00:11:16,940
Is there a simple algorithm that is linear?

116
00:11:16,940 --> 00:11:26,940
And people look for a long time for that and actually it works out to be the case that we can prove that there is no such algorithm.

117
00:11:26,940 --> 00:11:43,940
So there's a lot of theory that goes behind the algorithms that we use and it's important for us to know that theory and that will help us decide how to choose which algorithms we're going to use in practice and where to concentrate our effort in trying to find better algorithms.

118
00:11:43,940 --> 00:11:54,940
It's an amazing fact that was eventually proved by Fredman and Sachs that there is no linear time algorithm for the union fine problem.

119
00:11:54,940 --> 00:12:03,940
But weighted quick reunion with path compression in practice is close enough that it's going to enable the solution of huge problems.

120
00:12:03,940 --> 00:12:11,940
So that's our summary for algorithms for solving the dynamic connectivity problem.

121
00:12:11,940 --> 00:12:19,940
With using weighted quick union and with path compression we can solve problems that could not otherwise be addressed.

122
00:12:19,940 --> 00:12:30,940
For example, if you have a billion operations on a billion objects, I said before it might take 30 years, we can do it in six seconds.

123
00:12:30,940 --> 00:12:39,940
And what's most important to recognize about this is that it's the algorithm design that enables the solution of the problem.

124
00:12:39,940 --> 00:12:49,940
Faster computer wouldn't help much. You could spend millions on a supercomputer and maybe you could get it done in six years instead of 30 or in two months.

125
00:12:49,940 --> 00:12:54,940
But with a fast algorithm you can do it seconds in seconds on your own PC.

