---
title: CS143 P108Week916 02 A+Graph+Coloring
---

1
00:00:00,000 --> 00:00:08,279
In this video, we are going to continue our discussion of register interference graphs and talk

2
00:00:08,279 --> 00:00:12,880
about how to use rigs to come up with register assignments for procedures.

3
00:00:12,880 --> 00:00:20,920
And we're going to look at one particular technique that's popular called graph coloring.

4
00:00:20,920 --> 00:00:22,719
So first a couple of definitions.

5
00:00:22,719 --> 00:00:27,480
A graph coloring is an assignment of colors to nodes such that the nodes connected by an

6
00:00:27,480 --> 00:00:29,400
edge have different colors.

7
00:00:29,399 --> 00:00:37,000
So if I have a graph, let's say with three nodes and it's fully connected so every

8
00:00:37,000 --> 00:00:39,719
node connected to every other node.

9
00:00:39,719 --> 00:00:45,119
And then a coloring of this graph would be an assignment of colors such that every pair

10
00:00:45,119 --> 00:00:47,359
of nodes are connected by an edge have a different color.

11
00:00:47,359 --> 00:00:54,000
So for example, I could color this node blue and I could color this node green and I could

12
00:00:54,000 --> 00:00:56,280
color this node black.

13
00:00:56,280 --> 00:01:01,520
And then that would be a valid coloring of the graph because each pair of neighbors has

14
00:01:01,520 --> 00:01:03,079
a different color.

15
00:01:03,079 --> 00:01:11,960
And then a graph is K colorable if it has a coloring that uses K or fewer colors.

16
00:01:11,960 --> 00:01:14,599
In our problem, the colors correspond to registers.

17
00:01:14,599 --> 00:01:19,960
So what we want to do is to assign colors or registers to the graph nodes and we're going

18
00:01:19,960 --> 00:01:25,480
to let K, the maximum number of colors are allowed to use, be the number of machine registers.

19
00:01:25,480 --> 00:01:29,160
So the actual number of registers present on the architecture for which we're generating

20
00:01:29,160 --> 00:01:30,439
code.

21
00:01:30,439 --> 00:01:34,880
And then if a rig, if a register interference graph is K colorable, then there's going

22
00:01:34,880 --> 00:01:40,880
to be a register assignment that uses no more than K registers.

23
00:01:40,880 --> 00:01:42,920
So let's take a look at an example rig.

24
00:01:42,920 --> 00:01:46,560
And for this particular graph, there is no coloring.

25
00:01:46,560 --> 00:01:51,080
It turns out that it uses fewer than four colors.

26
00:01:51,080 --> 00:01:54,000
But there is at least one four coloring of this graph.

27
00:01:54,000 --> 00:01:55,400
And here it is.

28
00:01:55,400 --> 00:02:03,439
So I've used colored labels, but also register names so that you can see what registers we

29
00:02:03,439 --> 00:02:05,040
might assign to each of the nodes.

30
00:02:05,040 --> 00:02:10,199
And just notice that although there are many more than four, temperatures or four nodes

31
00:02:10,199 --> 00:02:13,680
in this graph, we do manage to color it with only four colors.

32
00:02:13,680 --> 00:02:15,439
And some of the nodes have the same color.

33
00:02:15,439 --> 00:02:23,960
So for example, D and B are allocated the same color as our E and A.

34
00:02:23,960 --> 00:02:27,680
Just to remind ourselves where this register interference graph came from, here is the

35
00:02:27,680 --> 00:02:31,320
original control flow graph again.

36
00:02:31,320 --> 00:02:35,439
And once we have the coloring of the graph, now we can do the register assignment.

37
00:02:35,439 --> 00:02:38,920
We can replace the temperatures by their corresponding register names.

38
00:02:38,920 --> 00:02:41,480
And then we get this control flow graph.

39
00:02:41,480 --> 00:02:48,879
So here we've just renamed each of the variables in the program with its register that it

40
00:02:48,879 --> 00:02:50,400
was assigned to.

41
00:02:50,400 --> 00:02:55,719
And now we're very close, as you can see, to having code that we can emit and execute

42
00:02:55,719 --> 00:02:56,879
on the target architecture.

