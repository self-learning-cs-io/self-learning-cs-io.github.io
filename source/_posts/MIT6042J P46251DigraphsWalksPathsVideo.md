---
title: MIT6042J P46251DigraphsWalksPathsVideo
---

1
00:00:00,000 --> 00:00:06,000
In this video lecture, we're going to introduce the idea of directed graphs or

2
00:00:06,000 --> 00:00:12,000
digraphs for short. So normally, in before this class, you might have thought of graphs

3
00:00:12,000 --> 00:00:16,000
being something like this, why is a function of x and graph on the x, y,

4
00:00:16,000 --> 00:00:20,000
plane. But that's not what we want to be thinking about. Instead, we want to

5
00:00:20,000 --> 00:00:24,000
think about something like this. This is a graph to a computer scientist,

6
00:00:24,000 --> 00:00:28,000
which are a bunch of vertices, which are those points that you see, and edges, which connect

7
00:00:28,000 --> 00:00:32,000
to the vertices. Being more specific and direct about this, it's supposed to set

8
00:00:32,000 --> 00:00:40,000
v of vertices, and they set e of edges, which are composed of two v each.

9
00:00:40,000 --> 00:00:44,000
The way you write that out, an edge is v, comma w, and that specifies an edge going

10
00:00:44,000 --> 00:00:50,000
from v to w. And in the graph, it would look something like this. Note that they are

11
00:00:50,000 --> 00:00:54,000
directed. That an edge from v to w is not the same thing as an edge from w to v,

12
00:00:54,000 --> 00:01:00,000
in a directed graph. Example here we have one directed graph,

13
00:01:00,000 --> 00:01:06,000
and you write out vertices as a set of all the vertices you see there, and edges are

14
00:01:06,000 --> 00:01:10,000
pairs of vertices. You can also realize that

15
00:01:10,000 --> 00:01:16,000
digraph is the same thing as a binary relation on the vertices, because each

16
00:01:16,000 --> 00:01:20,000
edge just defines a relation from one vertex to another. So every binary

17
00:01:20,000 --> 00:01:24,000
relation can be drawn out as a graph. You just put each of the

18
00:01:24,000 --> 00:01:28,000
things in each of the sets as vertices, and edges being the things that

19
00:01:28,000 --> 00:01:34,000
relate from one set to the other. So now we're going to define

20
00:01:34,000 --> 00:01:40,000
walks and paths. Now a walk follows successive edges,

21
00:01:40,000 --> 00:01:44,000
but it can repeat vertices or edges. For example, when you start at the

22
00:01:44,000 --> 00:01:48,000
black vertices you see there, when you can go to red, blue,

23
00:01:48,000 --> 00:01:52,000
yellow, red, and we can go back to blue again.

24
00:01:52,000 --> 00:01:56,000
There's nothing stopping us. And the length of these paths is not how many

25
00:01:56,000 --> 00:02:02,000
vertices we've gone through, but the number of edges that we've gone through. So here,

26
00:02:02,000 --> 00:02:06,000
the length would be five, because we went from white to black, black to blue,

27
00:02:06,000 --> 00:02:10,000
blue to yellow, yellow, red, red, blue.

28
00:02:10,000 --> 00:02:14,000
It's not the six vertices that we went through, and you have to be careful about that,

29
00:02:14,000 --> 00:02:20,000
because that difference of one can kind of get you. A path on the other hand walks through vertices

30
00:02:20,000 --> 00:02:26,000
without repeating a single vertex. So for example, we'll start at blue,

31
00:02:26,000 --> 00:02:32,000
and go yellow, and go red, and go pink, and go green, but then we're stuck.

32
00:02:32,000 --> 00:02:36,000
You can't go back to red. We've already been there, so that's it. That would be

33
00:02:36,000 --> 00:02:40,000
the end of our path. If we went to red again, then we have, it wouldn't be a

34
00:02:40,000 --> 00:02:44,000
path, not the valid path. And here the art length is four edges,

35
00:02:44,000 --> 00:02:50,000
not five vertices. And every graph can be represented as a matrix

36
00:02:50,000 --> 00:02:54,000
representation. You draw it out like this, and what we're going to do is,

37
00:02:54,000 --> 00:03:00,000
if there's a edge that goes from one of the things on the right,

38
00:03:00,000 --> 00:03:04,000
over to one of the things on the top, we'll put a one at that position.

39
00:03:04,000 --> 00:03:08,000
For example, there's an edge that goes from the black to the red.

40
00:03:08,000 --> 00:03:14,000
So on the black row in the red column, we're going to put in a one.

41
00:03:14,000 --> 00:03:18,000
Same thing, there's one that goes from black to green. We'll put black row,

42
00:03:18,000 --> 00:03:24,000
green column, put in another one, and so on for all the edges that we have in our

43
00:03:24,000 --> 00:03:28,000
graph, and the rest we just fill in with zeros. And this is called an

44
00:03:28,000 --> 00:03:32,000
adjacency matrix. And as you can see, uniquely defined to graph,

45
00:03:32,000 --> 00:03:36,000
every edge is represented here, and every one of the vertices is represented here.

46
00:03:36,000 --> 00:03:40,000
So any graph can be drawn up this way.

