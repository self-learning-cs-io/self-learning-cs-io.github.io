---
title: MIT6042J P47253DigraphsConnectedVerticesVideo
---

1
00:00:00,000 --> 00:00:06,000
The topic for this video lecture is connected vertices.

2
00:00:06,000 --> 00:00:12,000
The kind of connections we can have between different vertices to edges.

3
00:00:12,000 --> 00:00:20,000
So we're going to start by showing that the shortest walk between two vertices is a path.

4
00:00:20,000 --> 00:00:22,000
And we're going to prove it by contradiction.

5
00:00:22,000 --> 00:00:28,000
So, suppose we have some path from U to B and it crosses over itself.

6
00:00:28,000 --> 00:00:36,000
So here we have U and V and at some point you get to see and you go back to see and from there you go to V.

7
00:00:36,000 --> 00:00:40,000
So you've gone through the word some vertices C twice.

8
00:00:40,000 --> 00:00:46,000
But if you want to get the shortest path from U to V, why would you go through this loop?

9
00:00:46,000 --> 00:00:48,000
Why not just keep going straight from C to V?

10
00:00:48,000 --> 00:00:57,000
So the path without that section that goes from C back to itself also goes from U to V and is shorter.

11
00:00:57,000 --> 00:01:03,000
So if we have any path that crosses over itself, we can just get rid of that part that loops around back into itself.

12
00:01:03,000 --> 00:01:07,000
And we still have a walk from U to V.

13
00:01:07,000 --> 00:01:12,000
So therefore the shortest walk from U to V is going to be a path.

14
00:01:12,000 --> 00:01:16,000
So now we're going to talk about the length and walk relation.

15
00:01:16,000 --> 00:01:22,000
And what this means is with two vertices V and W, there is this G and relation between V and W.

16
00:01:22,000 --> 00:01:27,000
If there exists a length and walk from V to W.

17
00:01:27,000 --> 00:01:32,000
And G and is called the length and walk relation for G.

18
00:01:32,000 --> 00:01:42,000
So basically if you can find a way to go from V to W in exactly N steps, then G and applies from V to W.

19
00:01:42,000 --> 00:01:47,000
And G itself when you think about it is the length one walk relation.

20
00:01:47,000 --> 00:01:56,000
The graphs define these relations and there is an edge from one vertex to another if there is a length one edge from one vertex to another.

21
00:01:56,000 --> 00:01:59,000
It is itself.

22
00:01:59,000 --> 00:02:07,000
Now this lemma, we say that Gm and relational composition with Gn equals Gn plus N. Let's explain what this means.

23
00:02:07,000 --> 00:02:15,000
So what that relational composition means is that the relational composition between two applies from X to Y.

24
00:02:15,000 --> 00:02:24,000
If there is some vertices Z such that there is a path M from X to Z and then a path N from Z to Y.

25
00:02:24,000 --> 00:02:29,000
There is some Gn applies from X to Z and Gn applies from Z to Y.

26
00:02:29,000 --> 00:02:34,000
And Y, this is the same thing as Gn plus N, makes sense.

27
00:02:34,000 --> 00:02:42,000
If there is a path length M to Z and the path length N from there to Y, you just go from X to Z and M steps, then Z to Y ends steps.

28
00:02:42,000 --> 00:02:57,000
The length zero walk relation just makes each vertex go back to itself, like it points back to itself, the individual one.

29
00:02:57,000 --> 00:02:59,000
And the lemma is still true.

30
00:02:59,000 --> 00:03:04,000
You know, G0 composes with Gn is just Gn, which makes sense.

31
00:03:04,000 --> 00:03:10,000
You know, everything itself plus Gn just gives you Gn.

32
00:03:10,000 --> 00:03:13,000
Let's talk about composition of matrices.

33
00:03:13,000 --> 00:03:25,000
So if we have some adjacency matrix for G and we do a composition with some H, then we can get that by applying this Boolean end or matrix multiplication.

34
00:03:25,000 --> 00:03:35,000
You know, these adjacency matrices are ones and zeros, so we do matrix multiplication but with Boolean operations instead of pluses and multiplications.

35
00:03:35,000 --> 00:03:40,000
So we can compute A, G of N by fast matrix multiplication.

36
00:03:40,000 --> 00:03:42,000
How do we do that?

37
00:03:42,000 --> 00:03:53,000
Well, basically, you can do it for Gn over 2 twice and then Gn over 4 for each of those twice and go doing those Boolean operations on each.

38
00:03:53,000 --> 00:04:01,000
So A, G of N equals A, G of N over 2 applying this operator to A, G, and over 2.

39
00:04:01,000 --> 00:04:09,000
So you can just break it down in two each time so we get logarithmic number of products that we have to do.

40
00:04:09,000 --> 00:04:11,000
Now let's define another relation.

41
00:04:11,000 --> 00:04:15,000
G star is just called the walk relation of G.

42
00:04:15,000 --> 00:04:22,000
And basically, you, a G star applies from U to V, if there is a walk from U to V, no matter how long it is.

43
00:04:22,000 --> 00:04:28,000
If you can find some way to get from U to V, then it applies.

44
00:04:28,000 --> 00:04:35,000
If we want to get the walk relation, you just get everything inside the graph and apply self-loop.

45
00:04:35,000 --> 00:04:41,000
So make every, add in a edge that points back to itself for every vertex.

46
00:04:41,000 --> 00:04:51,000
And we call this G less than or equal to, and it's basically G and then add in these G0's self-verts, self-edges.

47
00:04:51,000 --> 00:04:58,000
And G less than or equal to has a length N walk if G has less than or equal to N walk.

48
00:04:58,000 --> 00:05:00,000
Now, think about that.

49
00:05:00,000 --> 00:05:10,000
If I can get from vertex x to vertex y in N minus 1 or N minus some amount of steps in G, then I can get there in N steps in G.

50
00:05:10,000 --> 00:05:15,000
Less than or equal to because I can just loop around.

51
00:05:15,000 --> 00:05:21,000
If I want to get here from red to blue, I can get there in one step without those self-loops.

52
00:05:21,000 --> 00:05:29,000
But with the self-loops, I can just keep starting from red, go around to red as many times as I want, N minus 1 times, and then do this final step.

53
00:05:29,000 --> 00:05:38,000
So I can make it, make a N length N walk for any value of N greater than 1.

54
00:05:38,000 --> 00:05:43,000
Now, let's compute the walk relation using what we've just defined.

55
00:05:43,000 --> 00:05:45,000
So G has N vertices.

56
00:05:45,000 --> 00:05:49,000
So the length of paths are going to be less than or equal to N.

57
00:05:49,000 --> 00:05:55,000
If you go, if you just go in a straight line from one thing to another, passing through each possible vertex,

58
00:05:55,000 --> 00:05:58,000
at most you're going to get N minus 1, the length.

59
00:05:58,000 --> 00:06:02,000
Because you're going to pass through N vertices, so there's N minus 1 edge disconnected.

60
00:06:02,000 --> 00:06:13,000
So G star, which is just the relation if there is a walk from U to V, is going to be this G less than or equal to to the N minus 1.

61
00:06:13,000 --> 00:06:23,000
So if we get G less than or equal to, I'm adding all these self-loops, and then find all the paths of length N minus 1 in there, which is basically all paths,

62
00:06:23,000 --> 00:06:30,000
and then G star, and G less than or equal to N minus 1, is all paths less than or equal to N minus 1.

63
00:06:30,000 --> 00:06:36,000
But since G only has paths of less than or equal to N minus 1, that's just all the paths.

64
00:06:36,000 --> 00:06:42,000
It's just every single one of the v. And so we've defined G star, and that's how we get all connected v.

65
00:06:42,000 --> 00:06:49,000
And we can do this in N squared log N time using that composition of the adjacency matrices.

