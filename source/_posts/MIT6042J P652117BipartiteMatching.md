---
title: MIT6042J P652117BipartiteMatching
---

1
00:00:00,000 --> 00:00:07,000
The stable match problem that we just looked at is one example of a bipartite matching problem.

2
00:00:07,000 --> 00:00:14,000
So the setup with a bipartite matching problem is you've got a simple graph and the vertices are split into two groups.

3
00:00:14,000 --> 00:00:21,000
As in the stable matching problem, we can call them the girls and the boys, the G and the B.

4
00:00:21,000 --> 00:00:37,000
So the definition of a bipartite graph is a graph where there are some vertices called the left vertices and a disjoint set of vertices called the right vertices and every vertex is either left or right and edges only go between a left vertex and a right vertex.

5
00:00:37,000 --> 00:00:48,000
Now in this case, the matching problem that we want to consider is that there's a specification that each girl is willing to be paired with certain boys.

6
00:00:48,000 --> 00:01:00,000
But not all of them. So we can specify that by adding edges where if this is the first girl on the list and she is willing to be paired with the second boy and the last boy.

7
00:01:00,000 --> 00:01:08,000
And that's what those two edges indicate. So edges are signaling compatibility constraints on matching up the girls and the boys.

8
00:01:08,000 --> 00:01:17,000
And what we're trying to accomplish is getting all of the girls matched with a unique boy. Match each girl to a unique compatible boy.

9
00:01:17,000 --> 00:01:35,000
So there's an example of a match where there's one highlighted magenta edge out of each girl and they go to different boys. So we formally we want a bijection from the girls to the boys that is that follows edges.

10
00:01:35,000 --> 00:01:47,000
Well, let's look at a case where I can't find a match. Suppose that that edge was missing. We use that edge in the match. But let's suppose it was not there. Let's get rid of it.

11
00:01:47,000 --> 00:01:57,000
And what we find now is that this last girl no longer can be matched to be to this second boy, which is what we previously had.

12
00:01:57,000 --> 00:02:11,000
So let's try to find some other match and there isn't any. The reason is that if you look at this group of three girls on the left and you look at all of the boys on the right that they are collectively compatible with.

13
00:02:11,000 --> 00:02:20,000
That is one of these three girls at least is willing to be paired with one of the boys on the right. There are only two boys that have to be shared among three girls.

14
00:02:20,000 --> 00:02:35,000
And that is one example of what's called a bottleneck. So we have three girls and collectively they only like two boys. They're just are not enough boys to go around for these girls. That proves that a match is not going to be possible.

15
00:02:36,000 --> 00:02:53,000
So more generally if you have a set s of girls on the left and you look at the image of s under the edge relation that is e of s, which is collectively the set of all of the boys that are compatible with one or more of the girls in s.

16
00:02:54,000 --> 00:03:06,000
So we previously just had an example where s was three and e of s was two and because three was greater than two because s was greater than e of s we were bottlenecked and we couldn't possibly find a match.

17
00:03:06,000 --> 00:03:17,000
And more generally the definition of a bottleneck is that if you have a set where the size of s is greater than the size of the image of s, then that's called a bottleneck.

18
00:03:18,000 --> 00:03:26,000
And the first observation we can make is the bottleneck lemma says that a bottleneck is a set s of girls without enough boys.

19
00:03:26,000 --> 00:03:37,000
And if s is greater than e of s that's called a bottleneck and when there is one no match is possible. Obviously.

20
00:03:38,000 --> 00:03:52,000
So this is a reason why there might not be a match is that there's a bottleneck. Now a rather deep theorem is conversely. If there are no bottlenecks then in fact there is a match. This is known as whole theorem.

21
00:03:52,000 --> 00:03:59,000
It's not obvious although we'll find an understandable proof of it and that's what we're going to do in the next segment.

