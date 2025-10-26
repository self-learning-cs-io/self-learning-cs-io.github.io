---
title: MIT6042J P111483PageRankVideo
---

1
00:00:00,000 --> 00:00:24,000
PageRank is a measure of the importance of a web page, but let me immediately correct my own confusion that I suffered from for some time until very recently, which is that even though PageRank is used for ranking pages, it's called PageRank after its discoverer developer Larry Page, who is one of the co-founders along with Serge Brinn of Google.

2
00:00:25,000 --> 00:00:43,000
So the motivation is that when you, at least before Google, when you did a standard retrieval on a web page using keyword search and the similar kinds of criteria, you'd get back millions of hits, most of which were really low quality and you weren't interested in.

3
00:00:43,000 --> 00:00:56,000
And with a few useful pages buried in the millions and the question was, all of these documents are indistinguishable in terms of keyword search and textual patterns. How do you figure out which of the important ones?

4
00:00:56,000 --> 00:01:07,000
And the idea that Page came up with was to use the web structure itself, the structure of the worldwide web, to identify the important documents.

5
00:01:07,000 --> 00:01:25,000
So we can think of the whole internet as a graph, where a user is on a page and we think of a URL as a link to another page as a directed edge, and users are kind of randomly traveling around in the worldwide web.

6
00:01:25,000 --> 00:01:32,000
And they're in a page, they randomly click a link to get to another page, and they keep doing a walk on the web graph.

7
00:01:32,000 --> 00:01:44,000
And every once in a while they're going to find that the thread that they're on is kind of losing steam where they find themselves in some kind of a cycle and they will randomly start over again at some other page.

8
00:01:44,000 --> 00:01:56,000
And we want to argue or hypothesize that a page is more important when it's viewed a large fraction of the time by these random browsers and random users.

9
00:01:56,000 --> 00:02:04,000
So to be formal, we're going to take the entire worldwide web trillions of vertices as a digraph.

10
00:02:04,000 --> 00:02:26,000
And there's going to be an edge from one URL to another from V to W if there's a link from the page V to the page W or the URL W, W might not even be a page, it might be a document which means it doesn't have any links on it, but for the real vertices are the web pages that have links on them.

11
00:02:26,000 --> 00:02:39,000
Okay, that's the model and we're going to make it into a random walk graph by saying that if you look at a URL, the vertex V, all of the edges out of it are equally likely.

12
00:02:39,000 --> 00:02:44,000
It's a simple model and it might or might not work, but in fact it did work pretty well.

13
00:02:44,000 --> 00:02:50,000
That is the model of the worldwide web as a random walk graph.

14
00:02:50,000 --> 00:03:04,000
So to be more precise, the probability of the edge that goes from V to W is 1 over the out degree of V. That is all of the out degree of V edges leaving vertex V get equal weight.

15
00:03:04,000 --> 00:03:16,000
Now, a model of this aspect that the users start over again if they get bored or they get stuck, we can formally add to the digraph a hypothetical super node,

16
00:03:16,000 --> 00:03:23,000
and with the property that there's an edge from the super node to every other node with equally likelihood.

17
00:03:23,000 --> 00:03:30,000
So I want you to hit the super mode, then following an edge is tantamount to say, pick a random page and start over again.

18
00:03:30,000 --> 00:03:40,000
To get to the super node, we have edges back from other nodes in the graph back to the super node.

19
00:03:40,000 --> 00:03:51,000
Now, in the reading, we said that we were going to have nodes back from terminal nodes that had no edges out, for example a document or something like that.

20
00:03:51,000 --> 00:04:07,000
That's actually not sufficient because for the page rank to work in the theoretical way that we wanted to, because even if there is no dead nodes, you might be in a clump of nodes which you can't get out of, and you'd want to be able to...

21
00:04:07,000 --> 00:04:18,000
And even though none of them was a dead end because they all had arrows going out to each other, and so you'd really want a node from an edge from a clump like that back to the super node to model starting over there,

22
00:04:18,000 --> 00:04:24,000
the simplest way to do it really is to simply say that there's an edge to the super node from every vertex.

23
00:04:24,000 --> 00:04:36,000
So wherever you are, you can randomly decide to start over, but a page and their co-authors in the original paper on page rank suggested that the edge part of the edge part of the node is a single node.

24
00:04:36,000 --> 00:04:50,000
So if you're interested, that the edge back from a vertex to the super vertex might get a special probability, it might be customized as opposed to being equally likely with all of the other edges leading a vertex.

25
00:04:50,000 --> 00:05:01,000
In fact, I think they decided that there should be a 0.15 probability from each vertex of jumping it random to the super node.

26
00:05:01,000 --> 00:05:25,000
Okay, let's just illustrate this with an example. This is a random walk graph that we've seen before modeling coin flipping, and when I add the super node, there's this one new vertex super, and there's an edge from the super vertex to every other one of the vertices in the graph, and from each vertex in the graph, there is an edge going back.

27
00:05:25,000 --> 00:05:35,000
So I just illustrated that with two way arrows, so this is really an arrow with two arrow heads, it represents an arrow in each direction.

28
00:05:35,000 --> 00:05:54,000
Now, in the original paper, actually, a page didn't talk about a super vertex instead, he talked about each vertex randomly jumping to another vertex, but that would just get the whole state diagram completely clogged up with edges, so it's more economical to have everybody jump to the super vertex.

29
00:05:54,000 --> 00:06:01,000
So the super vertex jumped back to everybody, and that saves a significant number of edges.

30
00:06:01,000 --> 00:06:22,000
So, PageRank then is obtained by computing a stationary distribution for the worldwide web. So S-bar is a vector of length trillions, the coordinates are indexed by the web pages, and we want to calculate the stable distribution.

31
00:06:22,000 --> 00:06:36,000
So, the only way to define the PageRank of A page is its probability of being there in the stationary distribution, the V component of the stationary distribution S.

32
00:06:36,000 --> 00:06:46,000
And of course, we'll rank V above S when the probability of being in V is higher than the probability of being in W.

33
00:06:46,000 --> 00:07:15,000
So, in the way, I don't have the latest figures, but I guess I've heard people have worked for Google say, and in some of the Wikipedia articles, that it takes a few weeks for the crawlers to create a new map of the web to create the new graph, and then it takes some number of hours, I think, under days, to calculate the stationary distribution on the ground.

34
00:07:15,000 --> 00:07:38,000
Doing a lot of parallel computation. So, a useful feature about the, using the stationary distribution is that ways to hack the links in the worldwide web to make a page look important will not work very well against PageRank.

35
00:07:38,000 --> 00:07:50,000
So, for example, one way to look important is to create a lot of nodes pointing to yourself fake nodes, but that's not going to matter because the fake nodes are not going to have much weight since they're fake and nobody's pointing to them.

36
00:07:50,000 --> 00:07:59,000
So, even though a large number of fake nodes point to you, their cumulative weight is low and they're not adding a lot to your own probability.

37
00:07:59,000 --> 00:08:12,000
Likewise, you could try taking links to important pages and try to make yourself look important that way, but PageRank won't make you look important at all if none of those important nodes are pointing back.

38
00:08:12,000 --> 00:08:21,000
So, both of these simple-minded ways to try to look important by manipulating links won't improve your PageRank.

39
00:08:21,000 --> 00:08:29,000
The super node is playing a technical role in making sure that the stationary distribution exists.

40
00:08:29,000 --> 00:08:42,000
So, it guarantees that there's a unique stationary distribution as far, by the way, I sometimes use the word stable and sometimes stationary. They're kind of synonyms, although I think officially we should stick to the word stationary distribution.

41
00:08:43,000 --> 00:08:58,000
As I've mentioned before, a diagram is strongly connected that is a sufficient condition for there to be a unique stable distribution that's actually proved in one of the exercises in the text at the end of the chapter.

42
00:08:59,000 --> 00:09:16,000
The super node mechanism also ensures something even stronger that every initial distribution P converges to the stationary distribution to that unique stationary distribution state, precisely mathematically.

43
00:09:17,000 --> 00:09:44,000
If you start off at an arbitrary distribution of probabilities of being in different states P, and you look at what happens to P after T steps, remember that you get by multiplying the vector P by the matrix M raised to the power T, and you take the limit as T approaches infinity, that is to say, what distribution do you approach as you do more and more updates?

44
00:09:44,000 --> 00:09:51,000
And it turns out that that limit exists and it is that stationary distribution. So, it doesn't matter where you start, you're going to wind up stable.

45
00:09:51,000 --> 00:10:05,000
And as a matter of fact, the convergence is rapid. What that means is that you can actually calculate the stable distribution reasonably quickly because you don't need a very large T in order to arrive at a very good approximation to the stable distribution.

46
00:10:06,000 --> 00:10:15,000
Now, the actual Google rank and ranking is more complicated than just page rank. Page rank was the original idea that got a lot of attention.

47
00:10:15,000 --> 00:10:26,000
And in fact, the latest information from Google is that they think it's gets over attention today in the modern world by too many commentators and people trying to simulate ranking.

48
00:10:26,000 --> 00:10:39,000
So, the actual rank rules are a closely held trade secret by Google that use text, they use location, they use payments because advertisers can pay to have their search results listed more prominently.

49
00:10:39,000 --> 00:10:47,000
And lots of other criteria that have evolved over 15 years and they continue to evolve as people find ways to manipulate the ranking.

50
00:10:47,000 --> 00:10:57,000
Google revises its ranking, criteria and algorithms. But nevertheless, page rank continues to play a significant role in the whole story.

