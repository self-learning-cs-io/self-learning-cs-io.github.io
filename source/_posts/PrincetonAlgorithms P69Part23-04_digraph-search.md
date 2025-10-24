---
title: PrincetonAlgorithms P69Part23 04_digraph Search
---

1
00:00:00,000 --> 00:00:08,000
Okay, first we're going to look at the search algorithm for

2
00:00:08,000 --> 00:00:13,000
digraphs. And this is the finding the paths or

3
00:00:13,000 --> 00:00:19,000
what are all the vertices that we can get to from a given vertex along a directed path.

4
00:00:19,000 --> 00:00:25,000
And again, this is a little more complex for a digraph that would seem

5
00:00:25,000 --> 00:00:33,000
then for a graph. So in this case, that's a set of vertices that you can get to from the given vertex

6
00:00:33,000 --> 00:00:42,000
x. Yes, notice that this set is characterized by every edge crossing the boundary goes in.

7
00:00:42,000 --> 00:00:48,000
If there were an edge that went out, that would give another member of the set.

8
00:00:49,000 --> 00:00:57,000
Well, actually, it looks more complicated to a human, but to the computer, it looks exactly precisely the same.

9
00:00:57,000 --> 00:01:06,000
In fact, the method that we looked at for undirected graphs is actually a digraph processing algorithm.

10
00:01:06,000 --> 00:01:15,000
It treats every connection between two vertices as two directed edges, one in each direction.

11
00:01:15,000 --> 00:01:23,000
So, DFS that we looked at last time is actually a digraph algorithm, and we use precisely the same code.

12
00:01:23,000 --> 00:01:34,000
So the visitor vertex v, we mark the vertex is visited and recursively visit all unmarked vertices w that you can get to from v.

13
00:01:34,000 --> 00:01:40,000
Let's look at the demo just to reinforce that.

14
00:01:41,000 --> 00:01:49,000
So here's a sampled digraph with the edges over at the right. Let's look at depth first search on that digraph.

15
00:01:49,000 --> 00:01:55,000
So we're going to look at the vertices that we can get to from vertex 0 in this digraph.

16
00:01:55,000 --> 00:02:07,000
Again, we have two vertex indexed arrays, one called marked, which says whether we can get there from v, and the other called edge 2, which gives us the vertex that took us there.

17
00:02:08,000 --> 00:02:15,000
With that, we can recover the paths from vertex 0 to each vertex, then can we reach from vertex 0.

18
00:02:15,000 --> 00:02:25,000
So we start off by visiting vertex 0, and now check the edges that are adjacent to it with directed edges going out.

19
00:02:25,000 --> 00:02:33,000
So there's 5, and then there's going to be 1, but 5 is unmarked, so we have to recursively visit 5.

20
00:02:33,000 --> 00:02:37,000
So we mark 5, and we say we got there from 0.

21
00:02:37,000 --> 00:02:44,000
So the path from to 5 is 0 to 5.

22
00:02:44,000 --> 00:02:51,000
And so now we're going to recursively visit all the unmarked vertices, 0.2 from 5.

23
00:02:51,000 --> 00:03:00,000
In this case, it's just 4. My 4 is unmarked, so we're going to recursively visit 4 and say we got there from 5.

24
00:03:00,000 --> 00:03:06,000
And now recursively, we have to check all the unmarked vertices pointing from 4.

25
00:03:06,000 --> 00:03:11,000
There's 3 and 2. First, we do 3, and that's unmarked.

26
00:03:11,000 --> 00:03:16,000
So we've got to visit 3 and say that we got there from 4.

27
00:03:16,000 --> 00:03:21,000
And now to visit 3, we looked at all the vertices pointing from 3.

28
00:03:21,000 --> 00:03:27,000
We can check 5. We've already been to 5. That's marked, so we don't have to do anything.

29
00:03:27,000 --> 00:03:35,000
And then we check 2. 2 is unmarked, so we continue with the depth first search and visit 2.

30
00:03:35,000 --> 00:03:39,000
So now to visit, we mark 2 and say we got there from 3.

31
00:03:39,000 --> 00:03:43,000
And now we check the vertices we can get to from 2.

32
00:03:43,000 --> 00:03:48,000
In this case, it's 0, which we've already been to, and 3, which we've already been to.

33
00:03:48,000 --> 00:03:58,000
So now we're done with vertex 2, and we can return and continue the search from 3.

34
00:03:58,000 --> 00:04:02,000
Well, actually, that was the last one from 3, so we're done with 3 as well.

35
00:04:02,000 --> 00:04:07,000
So now we're at 4. We still haven't checked the edge from 4 to 2.

36
00:04:07,000 --> 00:04:12,000
So now we do that. And of course, we've been to 2, so we don't have any further processing.

37
00:04:12,000 --> 00:04:15,000
And we're done with 4.

38
00:04:16,000 --> 00:04:22,000
4 was the only edge we get to from 5, so we're going to be done with 5 as well.

39
00:04:22,000 --> 00:04:33,000
And then what about 0? Well, we have to check 1. 1's not visited, so we visit 1 market, and we turn, and then we're done with 0.

40
00:04:33,000 --> 00:04:39,000
And that gives the set of all vertices that are reachable from 0.

41
00:04:39,000 --> 00:04:53,000
And not only that, the edge 2 array gives the information that we need to reconstruct a path from any of those, from 0 to any of those vertices using precisely the same method that we used before.

42
00:04:53,000 --> 00:05:02,000
We get to 4 from 5, we get to 5 from 0, so 0, 5, 4 is a path to 4, and we can do that for any vertex in that set.

43
00:05:02,000 --> 00:05:11,000
Okay, so what about the code? The code is exactly the same as for undirected graphs.

44
00:05:11,000 --> 00:05:18,000
That's the code for undirected graphs that we looked at last time to get the code for diagrams. We just change the names.

45
00:05:18,000 --> 00:05:21,000
It's the same code, otherwise.

46
00:05:21,000 --> 00:05:36,000
The recursive constructor builds the array of marked vertices, and also builds edge 2, just to avoid clutter, left that one off this slide, and then it makes the call on DFS.

47
00:05:36,000 --> 00:05:45,000
Then the recursive DFS does the work. It marks the vertex, and for every adjacent vertex, if it's not marked, it does the DFS.

48
00:05:45,000 --> 00:05:53,000
And then the client can ask whether any given vertex is reachable from us after the constructor has done its work.

49
00:05:53,000 --> 00:05:58,000
That's depth-first search in directed graphs, actually, we already did it.

50
00:05:58,000 --> 00:06:04,000
Now, here's just a couple of applications where this kind of code is used.

51
00:06:04,000 --> 00:06:21,000
One is so-called program control flow analysis. Actually, every program can be viewed as a diagram where vertices are basic blocks of instructions that are just executed one after another with no conditionals.

52
00:06:21,000 --> 00:06:32,000
Then, edges represent a jump if there's an if statement vertex left two edges going out of it or a loop, which involves a conditional.

53
00:06:32,000 --> 00:06:43,000
So, analyzing the program, people write systems to analyze programs to look at their structure by studying the diagrams.

54
00:06:43,000 --> 00:06:59,000
For example, one thing that happens often is there's unreachable code. Another thing you might want to do is determine whether you can get to the exit or not by doing this die-graph processing.

55
00:07:00,000 --> 00:07:14,000
So, that's actually a widely used technique in development software system development to try to improve code by doing this kind of die-graph processing.

56
00:07:14,000 --> 00:07:38,000
And, of course, these die-graphs can be huge. Another classic use of depth-first search in die-graphs is garbage collection that's used in systems like Java, where data structures or die-graphs, we build objects, and then we create references to other objects.

57
00:07:38,000 --> 00:08:00,000
And so, the data that any program is used is really set as a die-graph. So, there's the idea of roots. So, your program has some live objects that it can access through whatever state it's in.

58
00:08:00,000 --> 00:08:20,000
But, language like Java, there's automatic garbage collection, which means the programmer, when it's done with an object, maybe it overrides one of these pointers or something, there's going to be some blocks that are not directly accessible by the program.

59
00:08:21,000 --> 00:08:31,000
And so, what's interesting is the set of reachable objects that can be indirectly accessed by the program, starting and following a chain of pointers.

60
00:08:32,000 --> 00:08:39,000
So, those are the ones that can't be collected or reclaimed by the system for reusing the memory.

61
00:08:39,000 --> 00:08:52,000
But, all the other ones, the gray ones, they can't be reached by the program. There's no reason to keep them live, may as well collect them and return them for reuse.

62
00:08:53,000 --> 00:09:13,000
So, this is so-called Mark and Sweep algorithm that actually dates back to 1960, where they run DFS to mark all reachable objects and then go through and sweep through all possible objects, and if it's object is unmarked, it's garbage so added to the list of free memory.

63
00:09:14,000 --> 00:09:30,000
And that's a classic method that's still widely used. It uses an extra bit per object because you have to have that for the Mark, but still it's an effective and useful die-graph solution.

64
00:09:31,000 --> 00:09:46,000
So, DFS with reachability that we just showed in pathfinding is similar, and there's a couple of other simple die-graph problems that we'll consider. These are so far examples.

65
00:09:47,000 --> 00:09:55,000
But, it's also interesting that DFS is the basis for solving die-graph problems that are not so simple or immediate to solve.

66
00:09:56,000 --> 00:10:11,000
And this was pointed out 40 years ago by Bob Tarjan in the seminal paper that showed that deaf first search can allow us to solve problems that seem pretty complicated actually in linear time.

67
00:10:12,000 --> 00:10:16,000
And we're going to look at an example of that later on.

68
00:10:17,000 --> 00:10:31,000
So, that's deaf first search. What about rep first search? Well, in the same way that we saw for deaf first search, every undirected graph is actually a die-graph that has edges in both direction.

69
00:10:32,000 --> 00:10:45,000
So, BFS is really a directed graph algorithm, and we can use exactly the same code to find shortest paths from a source to any given vertex.

70
00:10:46,000 --> 00:10:59,000
So, we use a queue. We put the source on a queue and market is visited. And then as long as the queue is non-empty, we remove the least recently added vertex and add to the queue.

71
00:10:59,000 --> 00:11:05,000
And then the market is visited all the unmarked vertices that you can get to from that vertex.

72
00:11:06,000 --> 00:11:19,000
And the same proof shows that BFS can compute shortest paths, the ones with the fewest number of edges, from S to each other vertex in a die-graph in time proportional to in linear time.

73
00:11:20,000 --> 00:11:28,000
So, you want the GPS in your car to use BFS when driving around lower Manhattan.

74
00:11:29,000 --> 00:11:38,000
So, let's look at a demo. Again, just to see the distinction between breadth first search in die-graphs and see how it works.

75
00:11:39,000 --> 00:11:46,000
So, this is a smaller die-graph again with six vertices in eight edges.

76
00:11:47,000 --> 00:11:52,000
We take a queue and we take our source vertex and put it on the queue to get started.

77
00:11:53,000 --> 00:12:00,000
Then, a queue is non-empty, so we remove zero and we check all the vertices that are adjacent that we get to.

78
00:12:01,000 --> 00:12:06,000
So, we're going to, in zero is zero distance from zero.

79
00:12:08,000 --> 00:12:18,000
So, first we'll check two. And that one is not marked. Now, so we mark it and put it on the queue.

80
00:12:19,000 --> 00:12:24,000
And then we'll check one and that one's not marked, so we mark it and put it on the queue.

81
00:12:25,000 --> 00:12:27,000
Then, we're done with zero.

82
00:12:28,000 --> 00:12:33,000
Now, queues non-empty, so we pull the least recently added off. That's two.

83
00:12:34,000 --> 00:12:38,000
And now, we're going to check the vertices you can get to from two.

84
00:12:39,000 --> 00:12:43,000
Notice, both one and two are distance one from zero.

85
00:12:44,000 --> 00:12:49,000
And now, since we're going from two, everything that we encounter will be distance two from the source.

86
00:12:50,000 --> 00:12:54,000
So, we find four. It's distance two from the source and we get there from vertex two.

87
00:12:55,000 --> 00:12:59,000
Unmarked. So, we fill in those data structures and put it on the queue.

88
00:13:01,000 --> 00:13:06,000
And then, we're done with two. So, we go back to the queue in ones on the queue.

89
00:13:07,000 --> 00:13:09,000
So, we pull one off. It's distance one from zero.

90
00:13:10,000 --> 00:13:17,000
Remember, the proofs showed that everything on the queue is one of two distance, either k or k plus one.

91
00:13:18,000 --> 00:13:21,000
In this case, we've got one at distance one and four at distance two.

92
00:13:22,000 --> 00:13:28,000
So, now, we're going to pull one off the queue and look at the edges. You can get two places you can get two from one.

93
00:13:29,000 --> 00:13:34,000
Now, we check two, but that's already marked. So, we ignore it. And then, we're done with one.

94
00:13:35,000 --> 00:13:44,000
And now, four is left on the queue. So, we pull it off and check Jason vertices. In this case three, it's unmarked.

95
00:13:45,000 --> 00:13:52,000
So, we put it on the queue. Then, we're done with four. Then, from three, we check five. And that's unmarked.

96
00:13:53,000 --> 00:14:01,000
And it's one more distance from the source. So, we put it on the queue. And then finally, oh, we check two, which are already visited.

97
00:14:02,000 --> 00:14:06,000
So, we don't have to do anything. And then, finally, we pull five off the queue.

98
00:14:07,000 --> 00:14:11,000
We check where you get two from five and a zero, which is marked. So, we're done.

99
00:14:12,000 --> 00:14:23,000
And so, that's breadth for search, which gives us this directed tree from the source, which gives the shortest path to all the vertices that you can get to from that source.

100
00:14:24,000 --> 00:14:31,000
Now, you can use a version of this to solve a more general problem known as the multiple source shortest paths problem.

101
00:14:32,000 --> 00:14:42,000
In this problem, you're given a diagram and a set of source vertices. And you want to find the shortest path from any vertex in the set to each other vertex.

102
00:14:43,000 --> 00:14:56,000
So, for example, in this case, if the set is one, seven, and ten, what's the shortest path to four from one of those vertices? Well, it turns out in this case to be seven, six, to four.

103
00:14:57,000 --> 00:15:10,000
Shortest path to five is seven, six, zero, five. Shortest path to twelve is ten to twelve. That's a more general problem, but it's actually easy to solve.

104
00:15:11,000 --> 00:15:23,000
How do we implement this? We just use a different constructor. We just use BFS, but initialize by put all the source vertices on the queue to get started.

105
00:15:24,000 --> 00:15:36,000
So, that is every vertex is put those on the queue and they're zero from the desired source, and then any vertex you can get to from any one of those is going to be one and so forth.

106
00:15:37,000 --> 00:15:48,000
So, the result still gives away the edge to array will still give away to get from any vertex, the shortest way to get from any vertex to each of the source vertices.

107
00:15:49,000 --> 00:16:06,000
Here's an application of breadth for search. Let's say you want to crawl the whole web, while all the web that you can access from some starting web page, say like Princeton's starting web page.

108
00:16:07,000 --> 00:16:21,000
Again, the diegraph model, each vertex is a web page, each edge is a link on that web page to some other web page, and so all we want to do is get to all the other vertices on the web.

109
00:16:22,000 --> 00:16:39,000
And so, solution is, well, we don't actually build the diegraph. We just use an implicit diegraph because for every web page, we can find the links to other web pages on it, and we'll just build those as we encounter them.

110
00:16:40,000 --> 00:16:49,000
So, we're going to start with a source, which is the root web page. We're going to have a queue of the sites that we still need to explore.

111
00:16:50,000 --> 00:17:07,000
What we're going to do is also have a set of discovered websites. This corresponds to our marked array, but since we don't know how many vertices there are on the web, all we're going to do is keep track of the ones that we've been to.

112
00:17:08,000 --> 00:17:20,000
So, we don't use a vertex index to array. We don't even bother with because we'll just use the vertex names and do the look up as indicated we could do.

113
00:17:21,000 --> 00:17:36,000
So, all we do is, in the use-bred first search, the same method is, if the queue's non-empty, pick a website off the queue and just add to the queue all the websites to which it links.

114
00:17:36,000 --> 00:17:51,000
But all those websites, you check whether they're in the set of the ones that you've seen already. Now, you might run out of space for this set before you get to the whole web, but anyway, conceptually, this is a way that you could go.

115
00:17:51,000 --> 00:17:58,000
One thing to think about is, why not use DFS for this?

116
00:17:59,000 --> 00:18:23,000
Well, one reason is you're going to go far away in your search for the web. Maybe that's what you want. But the real problem in point of fact is there's some web pages that would trap such as search by creating new web pages and make links to them the first time that you visit them.

117
00:18:23,000 --> 00:18:34,000
So, they trap searches like that because DFS would always go to a new web page like that and it would keep creating new ones and you wouldn't get very far.

118
00:18:34,000 --> 00:18:45,000
With Bred for a search, you're taking a wide search of the pages that are close and that's often maybe what you want for such a search.

119
00:18:45,000 --> 00:18:58,000
And just to show how simple the idea is, this is a complete code for a kind of a bare bones web crawler, but it'll get to a lot of websites.

120
00:18:58,000 --> 00:19:12,000
So, let's look at, and we do this example because again, it really indicates the power of using appropriate abstractions to implement the algorithms that we're interested in.

121
00:19:13,000 --> 00:19:24,000
So, this one, we're going to use a queue, queue of strings. So, that's the websites that we have to still yet to go to.

122
00:19:24,000 --> 00:19:31,000
And then a set of strings is going to be the ones that we've already been to. That's equivalent to the marked array.

123
00:19:32,000 --> 00:19:44,000
We'll start with Princeton's website, add it to the queue of places we have to go and also mark it. Discover.ad just means a market.

124
00:19:44,000 --> 00:19:55,000
So, now, while the queue's not empty, what we're going to do is read the raw HTML from the next website in the queue.

125
00:19:55,000 --> 00:20:09,000
So, this is code using our input library that gets that job done. And then this is a little fooling around with regular expressions.

126
00:20:09,000 --> 00:20:19,000
We'll talk about algorithms like this later on that essentially tries to find all URLs within the text of that website.

127
00:20:19,000 --> 00:20:26,000
And for all of those URLs, and we'll look at what goes behind this code later on in the course.

128
00:20:26,000 --> 00:20:34,000
For all those URLs, it's going to check if it's marked, that's discovered.contains.

129
00:20:34,000 --> 00:20:40,000
And if it's not marked, it'll say it'll mark it and put it on the queue.

130
00:20:40,000 --> 00:20:48,000
A very simple program with a very powerful effect that illustrates breadth first search.

131
00:20:49,000 --> 00:20:54,000
And then, we'll look at the code.

132
00:20:54,000 --> 00:20:59,000
And then, we'll look at the code.

133
00:20:59,000 --> 00:21:04,000
And then, we'll look at the code.

134
00:21:04,000 --> 00:21:09,000
And then, we'll look at the code.

