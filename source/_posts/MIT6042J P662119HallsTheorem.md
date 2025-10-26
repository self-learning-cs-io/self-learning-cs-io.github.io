---
title: MIT6042J P662119HallsTheorem
---

1
00:00:00,000 --> 00:00:06,500
So let's get set state-holes theorem in a way that doesn't mention boys and girls,

2
00:00:06,500 --> 00:00:09,000
but let's remember the girl boy set up to start.

3
00:00:09,000 --> 00:00:13,000
So the general set up is a bipartite graph H.

4
00:00:13,000 --> 00:00:16,000
And a bipartite graph has two sets of vertices.

5
00:00:16,000 --> 00:00:24,000
The girl vertices and the boy vertices formally, there's a set L of H called the left vertices of H,

6
00:00:24,000 --> 00:00:29,000
and a set R of H called the right vertices of H. The vertices of H all together are L of H,

7
00:00:29,000 --> 00:00:34,000
both of these are non-empty, and they don't overlap.

8
00:00:34,000 --> 00:00:39,000
Then the edges of H have the property that they only go between L of H and R of H.

9
00:00:39,000 --> 00:00:43,000
That is the definition of a bipartite graph.

10
00:00:43,000 --> 00:00:46,000
Now we're interested in a matching in a bipartite graph.

11
00:00:46,000 --> 00:00:51,000
So let's be precise again of what's a matching without having to mention boys and girls and likes.

12
00:00:51,000 --> 00:00:58,000
A match is a total injective function from the left vertices to the right vertices.

13
00:00:58,000 --> 00:01:08,000
So that means every L vertex or girl has a match M of L that is on the other side.

14
00:01:08,000 --> 00:01:13,000
And we need this total injective function, match function M, to follow the edges.

15
00:01:13,000 --> 00:01:15,000
What does follow the edges mean precisely?

16
00:01:15,000 --> 00:01:21,000
It simply means that the edge L, M of L, is a legitimate edge of H.

17
00:01:21,000 --> 00:01:27,000
Another way to say that is that the graph of this total injective function is a subset of the edges of H.

18
00:01:27,000 --> 00:01:32,000
So we can state the no-bottle neck condition, Hall's condition as follows.

19
00:01:32,000 --> 00:01:42,000
If the size of S is less than or equal to its image under the edges for every set of left vertices H,

20
00:01:42,000 --> 00:01:49,000
that's called Hall's condition, that the size of S is less than or equal to the image of S for every S,

21
00:01:49,000 --> 00:01:52,000
then there is a match.

22
00:01:52,000 --> 00:01:56,000
So this is a way of precisely stating Hall's theorem. No boys and girls mentioned.

23
00:01:56,000 --> 00:02:01,000
We'll be comfortable going back to the boy girl language because it's more memorable and easier to talk about.

24
00:02:01,000 --> 00:02:13,000
But just for the record, we have now formally stated defined by part-tight graphs, matches and by part-tight graphs, and Hall's theorem really,

25
00:02:13,000 --> 00:02:20,000
that there is a match when Hall's condition is satisfied without mentioning boys and girls.

26
00:02:20,000 --> 00:02:25,000
Okay. The puzzle is, how do you verify that there are no bottlenecks?

27
00:02:25,000 --> 00:02:33,000
It's pretty hard. The bottleneck condition involves checking that every subset S of L of H satisfies this cardinality condition,

28
00:02:33,000 --> 00:02:41,000
and there are a lot of subsets of L of H relative to the size of the graph, exponentially many.

29
00:02:41,000 --> 00:02:46,000
So we can ask, how do you verify that there are no bottlenecks? Well, it turns out in algorithms classes,

30
00:02:46,000 --> 00:02:58,000
you will learn a fairly efficient matching procedure runs about quadratically for finding perfect matches when they exist.

31
00:02:58,000 --> 00:03:08,000
But there's one particular special case that ensures no bottlenecks that we'll have to make, that we'll be making use of several times in the term.

32
00:03:08,000 --> 00:03:21,000
And that special situation is when it turns out that every girl likes at least D boys and every boy likes at most D girls.

33
00:03:21,000 --> 00:03:31,000
This is called a degree constrained graph. If a graph is D constrained, is degree constrained, then there are no bottlenecks.

34
00:03:31,000 --> 00:03:48,000
So this condition that there are at least D, the, each girl likes at least D boys and every boy likes at most D girls could have been rephrased as saying that the minimum degree of the girls is greater than or equal to the maximum degree of the boys,

35
00:03:48,000 --> 00:03:53,000
but I think expressing it in terms of D is maybe makes it a little clearer.

36
00:03:53,000 --> 00:04:07,000
Okay, let's prove this. I'm going to prove that if you have a degree constrained bipartite graph, then in fact, satisfies Hall's condition, there are no bottlenecks.

37
00:04:07,000 --> 00:04:16,000
So we have that if every girl likes at least D boys and every boy likes at most D girls, there are no bottlenecks, the proof goes as follows.

38
00:04:16,000 --> 00:04:29,000
Let's look at some arbitrary set S of girls and suppose that the total number of edges that are incident to S are, has cardinality E.

39
00:04:29,000 --> 00:04:34,000
There are E edges that touch vertices in S. Okay.

40
00:04:34,000 --> 00:04:48,000
Well, that tells us that since every vertex in S has at least D edges out, maybe more, D times the size of S has to be less than or equal to the total number of edges coming out of S.

41
00:04:48,000 --> 00:05:01,000
Likewise, all of the edges that come out of S go by definition into E of S and each vertex in E of S can only absorb D edges, D girls.

42
00:05:01,000 --> 00:05:14,000
So that means that the total number of edges absorbed by E of S, that is at most D times E of S, had better be bigger than the number of edges that have to be absorbed E.

43
00:05:14,000 --> 00:05:27,000
So we get that D times the size of S is less than or equal to the total number of edges incident to S, which is less than or equal to D times the total number of vertices in E of S.

44
00:05:27,000 --> 00:05:52,000
Well, cancel the D's and we have that the size of S is less than or equal to the size of its image. That's the definition of a bottleneck. The violation of that would be a bottleneck. This says there's no bottlenecks and we have proved the degree constrained condition is sufficient to verify Hall's condition and by Hall's theorem it's sufficient to guarantee that there is a match.

45
00:05:52,000 --> 00:06:02,000
Now, there's a lot of graphs with matches that are not degree constrained. This is not an if and only if theorem. It's just a sufficient condition that comes up often enough that it's worth mentioning.

46
00:06:02,000 --> 00:06:08,000
The degree constrained implies Hall's condition is satisfied, which implies that there's a perfect match.

47
00:06:09,000 --> 00:06:22,000
So let's turn now to the general case of Hall's theorem and let's talk about proving Hall's theorem. Hall's theorem says that if there's no bottleneck then there is a match.

48
00:06:23,000 --> 00:06:42,000
So let's begin by setting up a lemma that will play a crucial role. The strategy for showing a for proving it is basically going to be to try to break the problem of finding a match for a large set of vertices into some problems of finding matches for smaller sets of vertices.

49
00:06:42,000 --> 00:06:55,000
And by strong induction Hall's condition will apply to the subsets and will win. Let's look at that more carefully. So let's begin by supposing that there are no bottlenecks in some bipartite graph H.

50
00:06:55,000 --> 00:07:11,000
Well, in particular if there's no bottlenecks anywhere that if you restrict yourself to some set S of girls no subset of that set S is going to have a bottleneck obviously because a bottleneck within S would be a bottleneck within the whole graph.

51
00:07:11,000 --> 00:07:28,000
So that parts trivial what's not trivial and takes a little bit of arguing is that suppose you have a set of girls that with the property that the number of boys that are compatible with that set of girls is exactly the same as the number of girls.

52
00:07:28,000 --> 00:07:46,000
So technically the size of S is equal to the size of E of S. In that case we can argue that there aren't any bottlenecks within the complement of S and the complement of E of S either.

53
00:07:46,000 --> 00:07:57,000
Well, let's look at a picture to illustrate what's going on. So here we have a bipartite graph and there's S and its image on the right E of S.

54
00:07:57,000 --> 00:08:15,000
Now we're interested and we know that a bottleneck here would employ a bottleneck in the whole graph. What we want to argue is that a bottleneck in the complement of S would employ a bottleneck in the complement of E of S. So there's the complement of E of S and there's the complement of S.

55
00:08:15,000 --> 00:08:32,000
Now notice that some edges that come out of the complement of S may very well go into E of S. That is this would be a point that's both in E of S and in E of S complement. But we're not allowed to use that point because we're trying to find a match only within S bar and E of S bar.

56
00:08:32,000 --> 00:08:49,000
And what we're really trying to argue is that a bottleneck here would employ a bottleneck in the whole graph. So let's see if we can argue this. There's no, we want to claim that there's no bottleneck between S bar and E of S bar given that there's no bottleneck anywhere.

57
00:08:49,000 --> 00:09:18,000
So let's suppose that we had a set T over here that was a subset of S bar and let's look at its image over here in orange. So we've got that the image of this set T when we restricted just to the part that's in the complement of S. Notice I'm leaving out this point here. I'm not taking the image of T. I'm taking the image of T restricted to the point that's in E of S bar.

58
00:09:18,000 --> 00:09:39,000
So let's go into the points that are not in the image of S. And what I want to know is could that cause a bottleneck? After all, I've left out some points that used to be included in the image of T. And so the image of T might have been small. So the image of T might have been bigger than T because of those extra points that I'm leaving out. I have to be sure that that doesn't happen.

59
00:09:39,000 --> 00:09:51,000
So let's say there'd be a bottleneck that has been created by these points that I've left out. Could there be a bottleneck in E of T intersection, the complement of E of S? Could that orange guy be a bottleneck?

60
00:09:51,000 --> 00:10:07,000
Well, if it was a bottleneck, then I'd have a bottleneck in the whole graph. And that's because S and E of S are the same size because all I do is if I had a bottleneck there, I would take this set T along with S.

61
00:10:07,000 --> 00:10:25,000
And this set orange along with E of S, and that would be a bottleneck. Because now if you look at the size of T, I've added the same amount to the size of T as I've added to that orange set because E of S and S are the same size.

62
00:10:25,000 --> 00:10:37,000
So if this orange part was smaller than T, then orange part along with E of S is smaller than T union S. And that defines a bottleneck in the whole graph.

63
00:10:37,000 --> 00:10:46,000
So again, if there was a bottleneck in here caused by restricting images to the complement of E of S, it means there was a bottleneck in the whole graph.

64
00:10:46,000 --> 00:10:59,000
If there's no bottleneck at all, then indeed there's no bottleneck in this other part of the complement of S and the complement of E of S. And this gives me a hook on proving whole theorem.

65
00:10:59,000 --> 00:11:05,000
Because that's basically the way I'm going to split the problem into two separate matching parts.

66
00:11:05,000 --> 00:11:14,000
So let's now proceed to prove that if there are no bottlenecks in a graph, then there's a perfect match. And it's going to be by strong induction on the number of girls.

67
00:11:14,000 --> 00:11:21,000
So case one is the case that we just examined. That there's a non-empty subset of girls, a proper subset, not all the girls.

68
00:11:21,000 --> 00:11:28,000
Some subset of girls, another way to say it is there's a subset of girls that's not empty and its complement is not empty either.

69
00:11:28,000 --> 00:11:39,000
And the size of S is the same as the size of E of S. That is the number of boys that are compatible with this set of girls is exactly the same size as this set of girls.

70
00:11:39,000 --> 00:11:52,000
Well, if there's going to be a match, there has to be one in that subset. And by the lemma's, if there's no bottlenecks anywhere, there's no bottlenecks when I restrict myself to just S and E of S.

71
00:11:52,000 --> 00:12:04,000
And also by the previous lemma, there's no bottleneck in the complement of S and restricted to the vertices in E of S.

72
00:12:04,000 --> 00:12:11,000
So this is a new bipartite graph where I'm using S for the left vertices and E of S for the right vertices.

73
00:12:11,000 --> 00:12:17,000
And here I'm using the complement of S for the left vertices and the complement of E of S for the right vertices.

74
00:12:17,000 --> 00:12:26,000
And the previous lemma says that if there's no bottlenecks overall, there's no bottlenecks in either of these two restricted graphs.

75
00:12:26,000 --> 00:12:38,000
So what I can do now is by induction since there's no bottlenecks in S, E of S, I can find a match there so I can match up all of the girls in S with compatible boys in E of S.

76
00:12:38,000 --> 00:12:47,000
And I can match up all of the girls that are not in S in the complement of S with boys that I haven't used already and they'll be a perfect match there.

77
00:12:47,000 --> 00:12:56,000
And then these two separately will combine, will provide a match for the entire set of left vertices.

78
00:12:56,000 --> 00:12:59,000
S union, the complement of S will be all of the vertices.

79
00:12:59,000 --> 00:13:07,000
And these two matchings don't overlap so they're combining them gives a complete matching. That knocks off this case.

80
00:13:07,000 --> 00:13:18,000
That's the nice case where I can find some subset where the number of boys is exactly equal to the number of girls which means that that has to work by itself.

81
00:13:18,000 --> 00:13:27,000
And I work that one by itself and what's left over by itself. And that's how I can find an overall match.

82
00:13:27,000 --> 00:13:37,000
The second case is that there isn't any set of girls which are compatible with exactly the same number of boys.

83
00:13:37,000 --> 00:13:45,000
Well since holes condition holds that means that every set of girls actually has to be compatible with a larger set of boys than the number of girls.

84
00:13:45,000 --> 00:13:56,000
That is for every set S, the size of S is strictly less than the size of E of S for every non-empty and proper subset S.

85
00:13:56,000 --> 00:14:05,000
Well in that case actually finding a match is easy because now I've got slack. What I can do is just pick an arbitrary girl called G.

86
00:14:05,000 --> 00:14:13,000
And she's got to be compatible with at least one boy because there's no bottlenecks. In fact in this case she'll actually be compatible with at least two boys.

87
00:14:13,000 --> 00:14:19,000
But all we need is one boy. Since there's no bottlenecks if I pick a girl she's got to be compatible with some boy.

88
00:14:19,000 --> 00:14:23,000
And I'm just going to arbitrarily match her with that boy, match G with B.

89
00:14:23,000 --> 00:14:41,000
Now the consequence of that is that if I now remove G and B from the graph I am left with a graph in which at worst I've shrunk the set E of S by that girl that I matched with B.

90
00:14:41,000 --> 00:14:50,000
Which means that E of S which used to be strictly greater than S has gone down by at most one it's still greater than or equal to E of S.

91
00:14:50,000 --> 00:15:06,000
So I'm left that in the graph after I've removed this G paired with an arbitrary B that she's compatible with I'm left with a graph that satisfies Hall's condition and that has one fewer boy girl vertex.

92
00:15:06,000 --> 00:15:13,000
And so it has no bottlenecks and therefore it has a match.

93
00:15:13,000 --> 00:15:23,000
And that match in the sub graph where I've taken out G and B when I put back the match when I add the part of G matching with B it's a match for the whole graph.

94
00:15:23,000 --> 00:15:30,000
And that's how I get it. That completes the proof of Hall's theorem.

