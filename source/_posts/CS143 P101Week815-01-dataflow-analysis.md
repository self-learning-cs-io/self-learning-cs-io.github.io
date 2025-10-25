---
title: CS143 P101Week815 01 Dataflow Analysis
---

1
00:00:00,000 --> 00:00:08,000
In this video, we're going to begin our discussion of global program optimization.

2
00:00:08,000 --> 00:00:11,000
Turns out that in order to talk about global optimization,

3
00:00:11,000 --> 00:00:16,000
there's another topic that we have to deal with first known as data flow analysis.

4
00:00:16,000 --> 00:00:22,000
Let's begin by reviewing the simple basic block optimizations,

5
00:00:22,000 --> 00:00:26,000
a particular constant propagation and dead co-inlimination.

6
00:00:26,000 --> 00:00:32,000
Here's a little piece of code, and we'll notice that there's an assignment of a constant to x.

7
00:00:32,000 --> 00:00:40,000
We know from our lecture on local optimizations that that constant assignment can be propagated forward to the uses of x.

8
00:00:40,000 --> 00:00:45,000
If the basic block is in single assignment form, this is particularly easy to do.

9
00:00:45,000 --> 00:00:53,000
If the value of x here is not used anyplace else in the program, that statement is dead and can be deleted.

10
00:00:53,000 --> 00:01:02,000
Here's a simple example over a basic block combining constant propagation and dead co-inlimination.

11
00:01:02,000 --> 00:01:07,000
These optimizations can be extended to an entire control flow graph.

12
00:01:07,000 --> 00:01:10,000
Here now we have a non-shave-ill-control flow graph.

13
00:01:10,000 --> 00:01:14,000
Remember, a control flow graph is a graph of basic blocks,

14
00:01:14,000 --> 00:01:21,000
where the nodes are the basic blocks and the edges show the transfers of control between basic blocks.

15
00:01:21,000 --> 00:01:26,000
This first basic block here has a testinant and if statement.

