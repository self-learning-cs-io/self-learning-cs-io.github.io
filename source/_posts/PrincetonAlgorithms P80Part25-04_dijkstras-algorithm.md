---
title: PrincetonAlgorithms P80Part25 04_dijkstras Algorithm
---

1
00:00:00,000 --> 00:00:09,880
Now we'll look at Dijkstra's algorithm for finding shortest paths in graphs with non-negative

2
00:00:09,880 --> 00:00:11,880
edge weights.

3
00:00:11,880 --> 00:00:18,160
Dijkstra is a famous figure in computer science and you can amuse yourself by reading some

4
00:00:18,160 --> 00:00:20,080
of the things that he wrote.

5
00:00:20,080 --> 00:00:28,280
He was a very prolific writer and kept notebooks and here really some of his famous quotes.

6
00:00:28,280 --> 00:00:33,439
Now you need to maybe know something about old languages to appreciate some of these.

7
00:00:33,439 --> 00:00:40,280
For example, Kobal was one of the first business-oriented languages, programming languages.

8
00:00:40,280 --> 00:00:48,079
And it tried to make it so that programs kind of read like English language sentences.

9
00:00:48,079 --> 00:00:56,040
But purists in computer science such as Dijkstra really didn't like that language as you can

10
00:00:56,039 --> 00:00:57,039
tell.

11
00:00:57,039 --> 00:00:59,000
The use of Kobal cripples the mind.

12
00:00:59,000 --> 00:01:03,280
Its teaching should therefore be regarded as a criminal offense.

13
00:01:03,280 --> 00:01:07,519
Actually, when I first came to Princeton was setting up the department here.

14
00:01:07,519 --> 00:01:13,799
One of, there was a big donor who actually wanted to have me fired in the department close

15
00:01:13,799 --> 00:01:16,480
down because we wouldn't teach Kobal.

16
00:01:16,480 --> 00:01:21,640
I didn't know about Dijkstra's quote at that time I wish I had.

17
00:01:21,640 --> 00:01:25,000
And there's some other opinions that Dijkstra had.

18
00:01:25,000 --> 00:01:29,519
You can amuse yourself on the web reading some of his writings.

19
00:01:29,519 --> 00:01:35,879
But he was, here's another one that's actually pretty relevant today.

20
00:01:35,879 --> 00:01:40,319
Object-oriented programming is an exceptionally bad idea which only could have originated

21
00:01:40,319 --> 00:01:42,799
in California.

22
00:01:42,799 --> 00:01:53,560
Dijkstra worked in Texas University of Texas for a while and of course came from the Netherlands.

23
00:01:53,560 --> 00:02:03,120
But Dijkstra did invent a very, very important algorithm that's very widely used for solving

24
00:02:03,120 --> 00:02:05,359
the shortest paths problem.

25
00:02:05,359 --> 00:02:12,640
It's the one that's in your maps app and in your car and many, many other applications.

26
00:02:12,640 --> 00:02:15,480
So let's take a look at how that algorithm works.

27
00:02:15,480 --> 00:02:18,840
It's a very simple algorithm.

28
00:02:18,840 --> 00:02:26,039
We consider what we're going to do is consider the vertices in increasing order of their distance

29
00:02:26,039 --> 00:02:28,719
from the source.

30
00:02:28,719 --> 00:02:35,360
So in the way we're going to do that is take the next vertex, add it to the tree and relax

31
00:02:35,360 --> 00:02:39,759
all the edges that point from that vertex.

32
00:02:39,759 --> 00:02:47,680
So let's talk about it in terms of a demo and then we'll look at the code.

33
00:02:47,680 --> 00:02:55,000
So our mandate is to consider vertices in increasing order of distance from the source.

34
00:02:55,000 --> 00:02:58,120
So our source is zero in this case.

35
00:02:58,120 --> 00:03:03,319
So what vertices are closest to the source?

36
00:03:03,319 --> 00:03:10,159
Well we can look at the edges that point from that vertex.

37
00:03:10,159 --> 00:03:15,280
Well start out with vertex is zero is at distance zero from the source so we pick it.

38
00:03:15,280 --> 00:03:20,560
And then we add that vertex to the shortest pass tree and relax all its edges.

39
00:03:20,560 --> 00:03:26,240
And relaxing all the edges, pointing from zero in this case is just going to update this

40
00:03:26,240 --> 00:03:30,759
two and edge two entries for 589.

41
00:03:30,759 --> 00:03:39,479
So in this case this says that the shortest path from zero to one is to go along zero

42
00:03:39,479 --> 00:03:42,919
one and it's distance five from zero to four.

43
00:03:42,919 --> 00:03:47,399
It's go along zero four and that's distance nine and zero to seven.

44
00:03:47,399 --> 00:03:51,120
Let's go take a zero seven that's distance eight.

45
00:03:51,120 --> 00:03:53,799
And the edge weights are positive.

46
00:03:53,799 --> 00:04:02,079
We're not going to find a shorter path to anyone of the sorry the edge weights are positive.

47
00:04:02,079 --> 00:04:07,280
And those are the shortest paths that we know so far to those vertices.

48
00:04:07,280 --> 00:04:11,879
Now the first key point of the algorithm is take the closest one.

49
00:04:11,879 --> 00:04:16,560
If you take the closest one in this case it's one then we know we're not going to find a

50
00:04:16,560 --> 00:04:18,560
shorter path to one.

51
00:04:18,560 --> 00:04:24,439
The only other way to go out of zero is to take one of these other edges and they're longer.

52
00:04:24,439 --> 00:04:29,600
So in all the edge weights are positive so we're not going to find a shorter way from zero

53
00:04:29,600 --> 00:04:32,759
to one then to take the edge zero one.

54
00:04:32,759 --> 00:04:36,199
So that means that edge zero once on the shortest path tree.

55
00:04:36,199 --> 00:04:38,079
So that's what the algorithm says.

56
00:04:38,079 --> 00:04:44,560
Take the next closest vertex to the source in this case it's one.

57
00:04:44,560 --> 00:04:51,159
And then we're going to add that edge that vertex to the tree and relax all the edges

58
00:04:51,159 --> 00:04:52,800
at the point from that.

59
00:04:52,800 --> 00:04:57,360
So now both zero and one are on the tree so now let's look at the edges pointing to that.

60
00:04:57,360 --> 00:04:59,800
And we have to relax each one of those.

61
00:04:59,800 --> 00:05:08,720
So in this case if you go from one to four then we look at four we know a path of length

62
00:05:08,720 --> 00:05:15,400
nine and one to four doesn't give us a shorter path so we leave that edge alone.

63
00:05:15,400 --> 00:05:21,519
One to three gives us a shorter path to three which is going to be 20 because you went

64
00:05:21,519 --> 00:05:27,160
from zero to one and then one to three is of length 20 and one to two also we didn't

65
00:05:27,160 --> 00:05:36,080
know a way to two and now we know one or better one is 17 so that completes the relaxation

66
00:05:36,080 --> 00:05:39,360
of all the edges pointing from one.

67
00:05:39,360 --> 00:05:49,200
So now we have zero and one on the tree and we would consider next the next closest vertex

68
00:05:49,200 --> 00:05:50,560
to the source.

69
00:05:50,560 --> 00:05:57,120
So what we have in this two is the shortest path to all the vertices that we see in

70
00:05:57,160 --> 00:06:05,759
so far and this one says that the and we've been to zero and one so the next closest one

71
00:06:05,759 --> 00:06:11,560
is seven which is distance eight so we're going to choose vertex seven.

72
00:06:11,560 --> 00:06:16,519
And again that's the shortest path we've seen so far we're not going to find a shorter

73
00:06:16,519 --> 00:06:22,439
one because to get to every other vertex is longer and so we know it's on the shortest

74
00:06:22,519 --> 00:06:29,000
path tree and now we're going to relax all the edges pointing from seven.

75
00:06:29,000 --> 00:06:35,000
In this case both of them the one from seven to two gives us a shorter way to two than

76
00:06:35,000 --> 00:06:40,000
what we knew before and the one from seven to five gives us a shorter way to five than

77
00:06:40,000 --> 00:06:41,000
we knew before.

78
00:06:41,000 --> 00:06:45,800
Well we hadn't been to five before so that relaxes seven so now seven's on the shortest

79
00:06:45,800 --> 00:06:48,160
path tree.

80
00:06:48,160 --> 00:06:56,160
So now four is the next closest path for text to the source from the edge zero four which

81
00:06:56,160 --> 00:07:00,160
is a length nine so that's the one we're going to pick next for the tree we're not going

82
00:07:00,160 --> 00:07:06,600
to find a shorter path there and we relax along all its edges.

83
00:07:06,600 --> 00:07:12,680
In this case we find a shorter path to five than we knew before and a shorter path to

84
00:07:12,680 --> 00:07:16,079
six well we visit six for the first time.

85
00:07:16,079 --> 00:07:24,240
Okay so that's four so now we just have to worry about two three five and six and five

86
00:07:24,240 --> 00:07:30,720
is the winner there so we select vertex five relax along its edges.

87
00:07:30,720 --> 00:07:37,480
In this case those edges both give us better paths than we knew before so now we're left

88
00:07:37,560 --> 00:07:44,560
with three vertices and two is the winner this is the two from the sources 14 to three

89
00:07:44,560 --> 00:07:48,000
it's 20 and six is 26.

90
00:07:48,000 --> 00:07:55,160
We relax its edges and it gives us again new shorter paths to both three and six and

91
00:07:55,160 --> 00:08:03,879
then the next the last step is to pick three and that does not give us a new way to six

92
00:08:03,959 --> 00:08:13,600
and then finally we pick six and then we now know the shortest paths to all the vertices

93
00:08:13,600 --> 00:08:23,439
from vertex zero if we just take the edge two edges that's from one to one you take zero

94
00:08:23,439 --> 00:08:29,759
to five you take two and so forth you get the shortest paths tree and that gives the shortest

95
00:08:29,759 --> 00:08:36,759
way to get from the source to every vertex that's the simulation of dikesters algorithm.

96
00:08:36,759 --> 00:08:45,759
Here's a demo of dikesters algorithm running in a large digraph so the source is the vertex

97
00:08:46,600 --> 00:08:53,399
in the center with the open circle and you can see it considers the vertices in the graph

98
00:08:53,399 --> 00:08:57,600
in order of their distance from the source.

99
00:08:57,600 --> 00:09:03,399
Now you can see this is maybe like a lake in the middle of the graph and so it's not

100
00:09:03,399 --> 00:09:07,720
going to move on from those vertices it's going to take a little while to get around the

101
00:09:07,720 --> 00:09:14,720
lake and again if this visualization is produced by our code and it gives a very natural feeling

102
00:09:14,720 --> 00:09:21,720
for the way that the algorithm works.

103
00:09:21,720 --> 00:09:28,720
This in principle and I think in fact in many cases is what your tar does when you turn

104
00:09:28,720 --> 00:09:33,720
the map system on, computes the shortest path everywhere and then it's already when you ask

105
00:09:33,720 --> 00:09:37,720
for a certain place how to get there.

106
00:09:37,720 --> 00:09:44,720
So he's just starting from another point in the graph.

107
00:09:44,720 --> 00:09:53,720
If you happen to live at a corner of the earth then it's going to be slightly longer to get

108
00:09:53,720 --> 00:10:00,720
to the other corner and a nice feeling for how the algorithm gets its job done.

109
00:10:00,720 --> 00:10:05,720
Again when it gets into those blank areas it takes a little while to get it over to the

110
00:10:05,720 --> 00:10:12,720
other side.

111
00:10:12,720 --> 00:10:17,120
And of course if we had islands, if we had little roads in the middle there that we're not

112
00:10:17,120 --> 00:10:22,720
connected there would be no way to get to them from the source and we wouldn't see them.

113
00:10:22,720 --> 00:10:26,960
And that's fine for the way our algorithm works we just leave that out of the demo and

114
00:10:26,960 --> 00:10:33,960
approve to avoid adding an extra comment about that for every algorithm.

115
00:10:33,960 --> 00:10:40,960
That's a visualization of a Dijkstra's algorithm on a large graph.

116
00:10:40,960 --> 00:10:49,960
So how do we prove it's correct? Well essentially we prove that it's an instance of the generic algorithm.

117
00:10:49,960 --> 00:10:56,960
So first thing is that every edge is relaxed exactly once.

118
00:10:56,960 --> 00:11:05,960
Every time we put a vertex onto the tree we relax all the edges that come from that vertex and we never reconsider the vertex.

119
00:11:05,960 --> 00:11:12,960
And what does relaxation do? Relaxation ensures that after the relaxation,

120
00:11:12,960 --> 00:11:19,960
the way that was before, afterwards you have the distance to W is less than or equal to the distance to V plus

121
00:11:19,960 --> 00:11:31,960
the way to the edge. Either it's equal because we just made it that way or it's less because it was before and the edge is not relevant.

122
00:11:31,960 --> 00:11:45,960
And inequality is going to hold for every edge corresponding to every edge for this two entries corresponding to every edge.

123
00:11:45,960 --> 00:11:52,960
Because number one, the this two values are always increasing.

124
00:11:52,960 --> 00:11:57,960
I'm sorry, they're always decreasing.

125
00:11:57,960 --> 00:12:04,960
The only reason we ever change this two W is to make it smaller.

126
00:12:04,960 --> 00:12:09,960
If we find an edge that will make it bigger we ignore that edge so it's always decreasing.

127
00:12:09,960 --> 00:12:15,960
So when we change this two W we're not going to make that inequality false.

128
00:12:15,960 --> 00:12:18,960
We're just going to make it better.

129
00:12:18,960 --> 00:12:22,960
And this two V's not going to change at all.

130
00:12:22,960 --> 00:12:29,960
Once we relax an edge from a vertex, we're done with that vertex. We're not going to process it at all.

131
00:12:29,960 --> 00:12:35,960
So then when we're done we have the optimality conditions hold.

132
00:12:35,960 --> 00:12:45,960
That exactly is the optimality condition. And not all of that, we have a path from the source to every vertex.

133
00:12:45,960 --> 00:12:52,960
So that's a correctness proof for dikes-trees algorithm based on the optimality conditions.

134
00:12:52,960 --> 00:12:58,960
Here's the code. It's similar to code that we've seen before.

135
00:12:58,960 --> 00:13:09,960
We're going to use the indexed priority queue that allows us to implement the decrease key operation.

136
00:13:09,960 --> 00:13:15,960
And we have our edge-do and just two arrays that are part of the Schroers-Path's computation,

137
00:13:15,960 --> 00:13:18,960
the goal of the Schroers-Path's computation.

138
00:13:18,960 --> 00:13:27,960
So we initialize the constructor, initializes those arrays including the index minimum pq.

139
00:13:27,960 --> 00:13:35,960
And we start out with all the distances infinity except for the distance of the source is 0.

140
00:13:35,960 --> 00:13:48,960
We put the source on the priority queue. And then what we're going to do is take the edge that's closest to the source off the priority,

141
00:13:48,960 --> 00:13:54,960
that's on the priority queue off, and then relax all the edges that are adjacent to that.

142
00:13:54,960 --> 00:14:02,960
So I'm using our standard iterator to get all the edges that emanate from that vertex and relax them.

143
00:14:02,960 --> 00:14:09,960
And then the relaxed code is just like the code that we showed when describing relaxation,

144
00:14:09,960 --> 00:14:13,960
except that it also updates the priority queue.

145
00:14:13,960 --> 00:14:21,960
If the vertex that that edge goes to is on the priority queue, it gives a new shorter way to get to that.

146
00:14:21,960 --> 00:14:28,960
So we have to decrease the key on the priority queue. If it's not on the priority queue, we insert it.

147
00:14:28,960 --> 00:14:36,960
And that's it. That's a complete implementation of Dijkstra's algorithm using modern data structures.

148
00:14:36,960 --> 00:14:40,960
Now this algorithm might seem very familiar if you've been paying attention.

149
00:14:40,960 --> 00:14:45,960
It's essentially the same algorithm as Prims algorithm.

150
00:14:45,960 --> 00:14:52,960
The difference is that in both cases we're building what's called a spanning tree of the graph.

151
00:14:53,960 --> 00:15:02,960
But in Prims algorithm, we take a vertex that's not on the tree using the rule of let's take the vertex that's closest to the tree anywhere on the tree,

152
00:15:02,960 --> 00:15:14,960
closest to some vertex on the tree. For Dijkstra's algorithm, we take next the vertex that's closest to the source through a path that goes through the tree and then into a non-tree vertex.

153
00:15:14,960 --> 00:15:16,960
That's the difference.

154
00:15:16,960 --> 00:15:28,960
Now the differences in the code have to do with the fact that Prims algorithm is for an undirected graph, Dijkstra's algorithm for a directed graph, but essentially they're the same algorithm.

155
00:15:28,960 --> 00:15:33,960
And actually, several of the algorithms that we've talked about are in the same family.

156
00:15:33,960 --> 00:15:45,960
They compute a spanning tree. You have a tree that takes care of where that records where you've been in the graph from every vertex back to where you started.

157
00:15:46,960 --> 00:16:03,960
And they use different rules for choosing what's vertex to add next. For breadth for search, you use a queue. For depth for search, you use something like a stack and then you just have to decide what to do if you encounter vertex you've been to before.

158
00:16:03,960 --> 00:16:09,960
But many graph algorithms use this same basic idea.

159
00:16:09,960 --> 00:16:23,960
So in particular, when we're talking about what the running time of Dijkstra's algorithm depends on what priority queue implementation we use in the same considerations as for Prims algorithm.

160
00:16:23,960 --> 00:16:39,960
We have V insert operations. Every vertex goes on to the priority queue. V delete min. Every vertex comes off the priority queue. And for every edge in the worst case, we could compute a decreased key operation.

161
00:16:40,960 --> 00:16:58,960
So the original implementations of Dijkstra's algorithm used in an ordered array, which would mean that it would take time proportional to V to find the minimum to find the vertex closest to the source.

162
00:16:58,960 --> 00:17:16,960
So the total running time be proportional to V squared. That's not adequate for the huge sparse graphs that we see in practice today, like the map in your car. So the binary heap data structure makes it feasible to run this algorithm.

163
00:17:16,960 --> 00:17:32,960
And that's where all the operations take time proportional to log V. We have to use the indexing trick that we talked about last time to support decreased key. But still we get a total running time of E log V, which makes it feasible.

164
00:17:32,960 --> 00:17:47,960
And just as with Prims algorithm by using an implementation of the priority queue that can do a faster decreased key, you can get a faster algorithm.

165
00:17:47,960 --> 00:18:02,960
And in practice, something like a four-way heap is going to give quite a fast algorithm. That's a more expensive to insert and to insert, but much faster to a delete min and decrease key.

166
00:18:02,960 --> 00:18:11,960
And again, there's a theoretical data structure that's not useful in practice that gets the running time down to E plus V log V.

167
00:18:11,960 --> 00:18:26,960
Of course, if your graph is dense, and again, the examples I use, they're not. The array implementation is optimal. You can't do any better. You have to go through all the edges. You might as well find the minimum at the same time.

168
00:18:26,960 --> 00:18:38,960
But in practice, people use binary heaps for sparse graphs. And maybe going to four-way if the performance is really critical.

169
00:18:38,960 --> 00:18:48,960
The bottom line is we have extremely efficient implementations for the huge graphs that arise in practice nowadays.

