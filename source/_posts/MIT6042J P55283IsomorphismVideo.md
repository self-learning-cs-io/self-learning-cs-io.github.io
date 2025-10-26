---
title: MIT6042J P55283IsomorphismVideo
---

1
00:00:00,000 --> 00:00:12,000
We've briefly looked at graph isomorphism in the context of digraphs and it comes up in even more fundamental way really for simple graphs where the definition is a bit simpler.

2
00:00:12,000 --> 00:00:20,000
So let's just look at this graph abstraction idea and how isomorphism connects with it.

3
00:00:20,000 --> 00:00:35,000
This is an example of two different ways of drawing the same graph. That is, here's a 257 and there's 257. It's connected directly to 122 as here and also 257 is connected to 99 as here.

4
00:00:35,000 --> 00:00:46,000
If you check, it's exactly the same six vertices and exactly the same seven eight edges but they're just drawn differently.

5
00:00:46,000 --> 00:00:56,000
So we don't want to confuse a drawing of a graph like these two. With the graph itself, the graph itself consists of just the set of nodes and the set of edges.

6
00:00:56,000 --> 00:01:03,000
If you extracted that from these two diagrams, you would get the same set of nodes and the same set of edges.

7
00:01:03,000 --> 00:01:17,000
So same graph, different layouts. But here's a case where it's really the same layout. You can see these two pictures if you ignore the labels or exactly the same with the two grays and the two grays in the red and the red.

8
00:01:17,000 --> 00:01:40,000
The difference now is that I've renamed the vertices. So we've assigned different labels to those vertices and the connection between the two graphs now, this graph with vertices which are integers and this graph with vertices that are the names of people, is that they are isomorphic.

9
00:01:40,000 --> 00:01:56,000
What isomorphism means is that all that matters between two graphs are their connections. So graphs with the same connections among the same number of vertices are said to be isomorphic.

10
00:01:57,000 --> 00:02:07,000
To say more precisely, two graphs are isomorphic when there's an edge preserving matching between their vertices. Matching meaning by ejection between their vertices.

11
00:02:07,000 --> 00:02:15,000
An edge preserving means that where there's an edge on one side, there's an edge between the corresponding vertices on the other side. Let's look at an example.

12
00:02:15,000 --> 00:02:30,000
Here are two graphs and I claim that they are isomorphic on the left. We got a bunch of animals, dog pig cow cat and on the right we have a bunch of animal foods, hay corn, beef tuna and it's a hint on how we're going to do the matching.

13
00:02:30,000 --> 00:02:45,000
So I'm going to tell you that the dog vertex on the left corresponds to the beef vertex on the right. So I'm defining a function of ejection from the vertices on the left in blue to the vertices on the right in red and f of dog is beef.

14
00:02:45,000 --> 00:03:00,000
Likewise, f of cat catsie tuna, I'm going to map cat to tuna and continuing for the remaining two vertices, I'm going to map cow to hay which is what they eat and pig to corn which is frequently what's fed to pigs.

15
00:03:01,000 --> 00:03:15,000
So this is a bijection. It's a perfect correspondence between the four vertices on the left and the four vertices on the right but I have to check now that the edges are preserved. What does that mean? Well, let's do an example.

16
00:03:15,000 --> 00:03:32,000
There's an edge on the left between dog and pig. That means that there should be an edge on the right between where they go to. So there ought to be an edge between beef and corn because that's where dog and pig go and indeed there's an edge there. So that parts good.

17
00:03:32,000 --> 00:03:47,000
And you can check the others. The other thing that we have to check on the left is since the edge preserving is an if and only if there's an edge on the right, if and only if there's an edge on the left, that's the same as saying there's no edge on the left, if and only if there's no edge on the right.

18
00:03:47,000 --> 00:04:01,000
So let's check non edges on the left. There's no edge between cow and pig and indeed cow goes to hay and pig goes to corn and sure enough there is no edge on the right between hay and corn.

19
00:04:01,000 --> 00:04:13,000
And you can check the remaining cases. These two graphs are isomorphic and that function F is in fact the edge preserving bijection.

20
00:04:13,000 --> 00:04:30,000
So stating it again, an isomorphism between two graphs, G1 and G2 is a bijection between the vertices V1 of G1 and the vertices V2 of G2 with the property that there's an edge UV in G1.

21
00:04:30,000 --> 00:04:40,000
G1 and E1 edge if and only if F of you F of V is an edge in the second graph in E2.

22
00:04:40,000 --> 00:04:49,000
And it's an if and only if that's edge preserving. So if there's an edge here, there's an edge there, if there's no edge on the left, there's no edge on the right.

23
00:04:49,000 --> 00:04:58,000
And that's the definition that's worth remembering. It's basically the same as the a die graph case except in the die graph case, the edges have a direction.

24
00:04:58,000 --> 00:05:11,000
So there's it would be an edge from you to V if and only if there's an edge from F of you to F of V. But since we don't have to worry about direction in the simple correct case, the definition gets slightly simpler.

25
00:05:11,000 --> 00:05:27,000
What about non isomorphism? How do you show the two graphs or not isomorphism? I can show you the two graphs. Are isomorphic by simply telling you what the bijection between their vertices is and then it becomes a simple matter of checking whether the edges that should be there or there or not.

26
00:05:28,000 --> 00:05:45,000
How do you figure out the two graphs are not isomorphic that there isn't any bijection that edge preserves edge as well. For a start, these both have four vertices. So it's possible perfectly. There are lots of bijections between the four vertices on the left and the four vertices on the right. Why isn't there an edge preserving one?

27
00:05:45,000 --> 00:06:01,000
Well, if you look at the graph on the left, it's actually got two vertices of degree two marked in red here. There's a degree two vertex. There's a degree two vertex. And on the right, every vertex is degree three if you check.

28
00:06:02,000 --> 00:06:19,000
Now, one of the things that properties of isomorphism is that the edges that come out of the red, these two edges, have to correspond to two edges that come out of wherever it's mapped to.

29
00:06:19,000 --> 00:06:29,000
So a degree two vertex can only map to a degree two vertex. There aren't any. That's a proof that there can't be an isomorphism between the two graphs.

30
00:06:29,000 --> 00:06:52,000
So in general, the idea is that we're looking at properties that are preserved by isomorphism. This is almost like a state machine invariant kind of idea. So a property is preserved by isomorphism means that if two graphs, if graph one has the property and graph one is isomorphic to graph two, then graph two has the property.

31
00:06:52,000 --> 00:07:03,000
And clearly, if there's a property that's preserved by isomorphism and one graph has it and the other graph doesn't have it, that's a proof that they can't be isomorphic.

32
00:07:03,000 --> 00:07:11,000
So what are some of these properties that are preserved by isomorphism? Well, the number of nodes clearly, there's got to be a bijection. So they have to have the same number of nodes.

33
00:07:11,000 --> 00:07:19,000
They have to have the same number of edges for similar reasons because the edges are preserved and edge on one side corresponds to an edge on the other side.

34
00:07:19,000 --> 00:07:28,000
Other things that matter is we've just sort of made this argument that the degrees are preserved as a consequence of the preserving of the edges.

35
00:07:28,000 --> 00:07:45,000
And all sorts of other structural properties are going to be preserved by isomorphism like for example, the existence of circular paths and distances between vertices and things like that. Those will all be properties that are preserved by isomorphism.

36
00:07:46,000 --> 00:07:53,000
So that gives you a hook on trying to figure out whether or not two graphs are or are not isomorphic.

37
00:07:53,000 --> 00:08:03,000
But in general, there will be if you've got a graph with a few hundred or a thousand vertices, there are an awful lot of potential bijections between them to check.

38
00:08:03,000 --> 00:08:12,000
And the question is, how do you do it? It's a huge search that can't really be effectively done exhaustively.

39
00:08:13,000 --> 00:08:34,000
So what you look for is properties that are preserved by isomorphisms that give you a guide. So for example, if the graph on the left happens to have a degree four vertex and that degree four vertex is adjacent to a degree three vertex, then the adjacency of a degree four and a degree three is a typical property that's preserved by isomorphism.

40
00:08:34,000 --> 00:08:51,000
So you know for sure that if there's going to be a bijection between the first graph and the second graph, this pair of adjacent vertices of degree four and degree three can only map to another pair of adjacent vertices in the second graph that also have degrees four and three.

41
00:08:51,000 --> 00:09:09,000
So that will cut down enormously the number of places that this given vertex can map to in the other graph and it gives you some structure to use to try to narrow down the search for the number of isomorphisms and where the isomorphism is and whether or not it exists.

42
00:09:10,000 --> 00:09:34,000
So being having a three four adjacent to a degree three, for example, is a typical property that's preserved under isomorphism. But even so, if I give you two very large graphs and these are actually extracted graphs from some communication network and image of them, it's very hard to tell whether or not there are some more.

43
00:09:34,000 --> 00:09:47,000
Well, you could guess because of course we took the same picture and copied it twice, but if there was some subtle difference between these two like I erased one edge somewhere in the middle of that mess, how would you figure out that the two graphs were not isomorphic in that case.

44
00:09:47,000 --> 00:10:02,000
And the answer is that like these NP complete problems, there is no known procedure to check whether or not two graphs are isomorphic that is guaranteed to be efficient and to run in polynomial time.

45
00:10:03,000 --> 00:10:15,000
On the other hand, there are technical reasons that technical properties that says that graph isomorphism is not one of these NP complete problems unless peacles NP or something like that.

46
00:10:15,000 --> 00:10:31,000
And so that's one distinguishing characteristic of this problem. The important one is that as a matter of fact in practice, there are some really good isomorphism programs around that will in many cases.

47
00:10:32,000 --> 00:10:40,000
Figure out given two graphs whether or not they are isomorphic in time that's approximately the size of the two graphs.

48
00:10:40,000 --> 00:10:53,000
So pragmatically graph isomorphism seems to be a manageable problem. Although theoretically you can't be sure that these efficient procedures that work most of the time are going to work always.

49
00:10:53,000 --> 00:10:59,000
Well, non procedures in fact blow up exponentially on some example or another.

