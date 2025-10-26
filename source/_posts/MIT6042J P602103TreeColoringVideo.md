---
title: MIT6042J P602103TreeColoringVideo
---

1
00:00:00,000 --> 00:00:07,000
Now we can use the unique path characterization of trees to very quickly figure out that every tree is two colorables.

2
00:00:07,000 --> 00:00:20,000
So we know that a tree is a graph with unique paths between every pair of vertices and as a consequence the chromatic number of a tree with two or more vertices is two.

3
00:00:20,000 --> 00:00:28,000
The proof is just to show you how to color it. You clearly can't get by with one color if you've got any two adjacent vertices.

4
00:00:28,000 --> 00:00:38,000
The two colorable way is that you just choose an arbitrary vertex and call it the root but you make the arbitrary choice on what the root is.

5
00:00:38,000 --> 00:00:47,000
And there's a unique path from every vertex, from the root to every vertex using this unique path characterization.

6
00:00:47,000 --> 00:00:53,000
And so we're just going to color vertices by whether the path from the root is of odd or even length.

7
00:00:53,000 --> 00:01:01,000
If it's of even length color at red and if it's odd length color at blue or color at green and so we wind up alternating red and green.

8
00:01:01,000 --> 00:01:10,000
And the fact is that adjacent nodes are going to be at a distance where one is an odd distance and one is an even distance which is why this method of coloring is going to work.

9
00:01:10,000 --> 00:01:23,000
A general property of two coloring is that to figure out whether or not a graph is two colorable and how to do it is you just start pick an arbitrary vertex, give it a color at red and then color all the vertices adjacent to a green.

10
00:01:23,000 --> 00:01:32,000
And keep going in that way coloring a vertex with a color different from an adjacent vertex that's colored until you get stuck.

11
00:01:32,000 --> 00:01:41,000
If you don't get stuck it's too colorable and if it's not too colorable you're guaranteed to get stuck so it's a very easy way to figure out if a graph is too colorable.

12
00:01:41,000 --> 00:01:54,000
Another characterization of two colorability in general is that a graph is too colorable providing that all the cycles that it has if any are of even length.

13
00:01:54,000 --> 00:01:58,000
Of course a tree has no cycles so that makes it too colorable for sure.

14
00:02:02,000 --> 00:02:05,000
You

