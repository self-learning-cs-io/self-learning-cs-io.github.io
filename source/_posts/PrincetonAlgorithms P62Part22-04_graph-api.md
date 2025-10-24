---
title: PrincetonAlgorithms P62Part22 04 graph Api
---

1
00:00:00,000 --> 00:00:10,380
As we'll see in a little bit later in the lecture, the way that we're going to set up our

2
00:00:10,380 --> 00:00:16,519
graph processing algorithms is to develop an API to cover our representation of the graph

3
00:00:16,519 --> 00:00:22,719
and provide a simple set of methods for clients to call to process the graph.

4
00:00:22,719 --> 00:00:26,519
So let's take a look at that in detail.

5
00:00:26,519 --> 00:00:32,519
So the idea is we have to represent a graph within the computer.

6
00:00:32,519 --> 00:00:40,519
One of the first things to remember is that you can draw a graph and maybe that provides

7
00:00:40,519 --> 00:00:45,000
some kind of intuition about the structure.

8
00:00:45,000 --> 00:00:51,239
But you could have two drawings that represent the same graph that look pretty different.

9
00:00:51,240 --> 00:00:56,520
So one of the things to remember in any graph representation is that it can give you some

10
00:00:56,520 --> 00:01:00,760
intuition, but that intuition may be misleading.

11
00:01:00,760 --> 00:01:05,359
And we'll just remember that as we look at different representations.

12
00:01:05,359 --> 00:01:09,320
So first thing is how to represent the vertices.

13
00:01:09,320 --> 00:01:14,640
So what we're going to do in this lecture is just use integers between zero and v minus

14
00:01:14,640 --> 00:01:15,640
one.

15
00:01:15,719 --> 00:01:24,200
The reason we do that is it allows us to use vertex index arrays within the graph representation.

16
00:01:24,200 --> 00:01:31,400
And we understand from earlier algorithms lectures that we can use a symbol table to convert

17
00:01:31,400 --> 00:01:36,120
names to integers with a symbol table.

18
00:01:36,120 --> 00:01:43,400
And so we'll leave that part as a symbol table application and just work with graphs with

19
00:01:43,480 --> 00:01:46,280
vertex names between zero and v minus one.

20
00:01:46,280 --> 00:01:49,719
We're vis the number of vertices.

21
00:01:49,719 --> 00:01:58,719
Now we have to remember when we're doing representations that we can have various anomalies in the

22
00:01:58,719 --> 00:01:59,960
graph.

23
00:01:59,960 --> 00:02:05,480
So we can we draw edges, but actually in real data we might have multiple edges or we might

24
00:02:05,480 --> 00:02:07,320
have a self loop.

25
00:02:07,319 --> 00:02:14,000
And we'll take that into account when we look at the representation, graph representation.

26
00:02:14,000 --> 00:02:16,919
So here's the API that we're going to use.

27
00:02:16,919 --> 00:02:21,799
So again our graph processing algorithms are going to be clients of this API.

28
00:02:21,799 --> 00:02:29,240
The idea is that we'll use this to build graphs and then our processing programs will be

29
00:02:29,240 --> 00:02:31,439
a client of this program.

30
00:02:31,439 --> 00:02:34,280
And it's a this API.

31
00:02:34,439 --> 00:02:39,960
The idea is that most of them have just a few very simple operations that they need to do.

32
00:02:39,960 --> 00:02:42,599
And those are the ones that we put in the API.

33
00:02:42,599 --> 00:02:44,719
So we have two constructors.

34
00:02:44,719 --> 00:02:47,639
One that creates an empty graph with v vertices.

35
00:02:47,639 --> 00:02:51,879
Another one that creates a graph from an input stream.

36
00:02:51,879 --> 00:02:56,759
Then the basic operation for building a graph is just at edge.

37
00:02:56,759 --> 00:03:02,719
So that adds an edge connecting two given vertices v and w.

38
00:03:02,719 --> 00:03:05,800
It's basic operations for processing a graph.

39
00:03:05,800 --> 00:03:09,560
Well there's V and E that gives the number of edges and vertices.

40
00:03:09,560 --> 00:03:16,560
But then there's an iterator that takes a vertex as an argument and iterates through the

41
00:03:16,560 --> 00:03:19,879
vertices adjacent to that vertex.

42
00:03:19,879 --> 00:03:26,000
All our graph processing can be cast in terms of this iterator.

43
00:03:26,000 --> 00:03:32,960
So down here is an example of a client program that prints out every edge in the graph.

44
00:03:32,960 --> 00:03:40,960
So we create an input stream maybe with a given file name, create a graph from that input

45
00:03:40,960 --> 00:03:46,280
stream and look at the code for that.

46
00:03:46,280 --> 00:03:50,639
And then the client program for every vertex.

47
00:03:50,639 --> 00:03:57,000
Remember the vertices are number between 0 and g dot number of vertices minus 1.

48
00:03:57,000 --> 00:04:05,559
So for every vertex we iterate through all the vertices adjacent to that vertex and print

49
00:04:05,559 --> 00:04:06,559
out an edge.

50
00:04:06,559 --> 00:04:15,199
If this edge connecting v and w we print out v and then a little dash to indicate an edge

51
00:04:15,199 --> 00:04:16,599
and then w.

52
00:04:16,600 --> 00:04:23,160
This actually prints out every edge twice in an undirected graph because if v and w are

53
00:04:23,160 --> 00:04:30,260
connected by an edge then w appears in v's adjacency list and v appears in w's adjacency

54
00:04:30,260 --> 00:04:32,040
list.

55
00:04:32,040 --> 00:04:37,960
So here's an example of running that client.

56
00:04:37,960 --> 00:04:42,400
If we have a file tiny g dot text our standard is.

57
00:04:42,399 --> 00:04:48,079
We have the number of vertices as an integer in the first, as the first integer in the

58
00:04:48,079 --> 00:04:55,919
file number of edges as the second integer in the file and then pairs a vertex name.

59
00:04:55,919 --> 00:05:01,959
And so the constructor will read those two things and then call that edge for all of these

60
00:05:01,959 --> 00:05:10,799
pairs of things and that enables this client to, if we run it for that graph to print out

61
00:05:10,799 --> 00:05:12,120
all the edges.

62
00:05:12,120 --> 00:05:19,040
So everybody adjacent to 0, 6, 2, 1 and 5, everybody adjacent to 1 is just 0 and so you notice

63
00:05:19,040 --> 00:05:22,639
the edge 0, 1 appears twice in the list.

64
00:05:22,639 --> 00:05:29,280
So that's the sample client of our basic graph API.

65
00:05:29,280 --> 00:05:36,639
And so here's some typical and simple graph processing code that uses the API.

66
00:05:36,639 --> 00:05:47,039
So you can write a static method that takes a graph and a vertex as argument in returns

67
00:05:47,039 --> 00:05:52,560
the degree, the number of edges that are connected, number of vertices that are connected by an

68
00:05:52,560 --> 00:06:01,199
edge to v. So all it does is set a local variable degree to 0 and then iterate through all

69
00:06:01,199 --> 00:06:06,439
the vertices adjacent to v and increment that and return it.

70
00:06:06,439 --> 00:06:14,079
Similarly, you can compute the maximum degree of a vertex in a graph and that's for every

71
00:06:14,079 --> 00:06:18,879
vertex, compute the degree and find the biggest one.

72
00:06:18,879 --> 00:06:25,480
Or the average degree, well, average degree, if you think about it, it's just twice the

73
00:06:25,480 --> 00:06:28,439
number of edges divided by the vertex.

74
00:06:28,439 --> 00:06:32,279
Or you could go through all the way through every vertex and edge and compute the total

75
00:06:32,279 --> 00:06:36,800
and divide, but this is probably a much more efficient way to do it.

76
00:06:36,800 --> 00:06:39,439
Or say, number of self loops.

77
00:06:39,439 --> 00:06:45,279
And so that involves going through the whole graph for every vertex, for every edge adjacent

78
00:06:45,279 --> 00:06:51,759
to that vertex, you check whether it's v if you've got a self loop.

79
00:06:52,719 --> 00:06:59,839
If it does, then you return the number of self loops that divided by two because every edge

80
00:06:59,839 --> 00:07:01,319
is counted twice.

81
00:07:01,319 --> 00:07:09,120
So those are examples of static methods that a client might use and just the example of

82
00:07:09,120 --> 00:07:12,759
the use of the API.

83
00:07:12,759 --> 00:07:15,039
So now how are we going to implement that?

84
00:07:15,039 --> 00:07:20,159
That's our usual standard of let's look at some clients and now let's talk about a representation

85
00:07:20,160 --> 00:07:25,000
that we can use to implement the graph API.

86
00:07:25,000 --> 00:07:30,200
So one possible representation is set of edges representation.

87
00:07:30,200 --> 00:07:36,200
Where for every edge, we just maintain a list, maybe on array of edges or a linked list

88
00:07:36,200 --> 00:07:37,200
of edges.

89
00:07:37,200 --> 00:07:43,800
So for every edge in the graph, there's a representation of it.

90
00:07:43,800 --> 00:07:51,280
And that one is a possible representation, but it leads to inefficient implementations,

91
00:07:51,280 --> 00:07:58,280
much less efficient, that would make it unusable for the huge graphs that we see in practice.

92
00:07:58,280 --> 00:08:05,040
Another one's called the adjacency matrix representation, where we maintain a two-dimensional

93
00:08:05,040 --> 00:08:11,840
V by V array, Boolean array, 0, 1 or 2 or false.

94
00:08:11,840 --> 00:08:21,840
And for every edge, VW in the graph, you put true for rho V in column W and for rho W

95
00:08:21,840 --> 00:08:23,320
in column V.

96
00:08:23,320 --> 00:08:30,960
So there's actually two representations of each edge in an adjacency matrix graph representation.

97
00:08:30,959 --> 00:08:40,000
So you can immediately give it V and W test whether there's an edge connecting V and W.

98
00:08:40,000 --> 00:08:47,600
But that's one of the few operations that's efficient with this representation.

99
00:08:47,600 --> 00:08:55,960
And it's not very widely used because for a huge graph, say with billions of vertices,

100
00:08:55,960 --> 00:09:00,960
you would have to have billions squared number of entries in this array, which is going

101
00:09:00,960 --> 00:09:03,639
to be too big for your computer most likely.

102
00:09:03,639 --> 00:09:09,879
So this one actually isn't that widely used.

103
00:09:09,879 --> 00:09:14,160
The one that is most widely used in practice and the one that we'll stick with is called

104
00:09:14,160 --> 00:09:17,519
the adjacency list representation.

105
00:09:17,519 --> 00:09:25,759
And that's where we keep a vertex index array, where for every vertex, we maintain a list

106
00:09:25,759 --> 00:09:29,600
of the vertices that are adjacent to that.

107
00:09:29,600 --> 00:09:36,480
So for example, vertex 4 has 5, it's connected to 5, 6 and 3.

108
00:09:36,480 --> 00:09:40,399
So its list has 5, 6 and 3 on it.

109
00:09:40,399 --> 00:09:49,000
Now, in lower level representations, we talk about using linked lists or arrays for these,

110
00:09:49,000 --> 00:09:54,919
but actually in modern lingo, with the background that we built with algorithm,

111
00:09:54,919 --> 00:10:01,159
what we're going to use is an abstract data type, our bag representation for this,

112
00:10:01,159 --> 00:10:02,719
which is implemented with a linked list.

113
00:10:02,719 --> 00:10:06,120
But we don't have to think about it when we're talking about graphs.

114
00:10:06,120 --> 00:10:14,199
We keep the vertices, the numbers of the vertices that are adjacent to each given vertex in a bag.

115
00:10:14,199 --> 00:10:20,439
And we know that we can implement it such that we can iterate through and time proportional

116
00:10:20,440 --> 00:10:26,480
to the number of entries and the space taken is also proportional to the number of entries.

117
00:10:26,480 --> 00:10:30,440
And that's going to enable us to process huge graphs.

118
00:10:30,440 --> 00:10:39,520
So here's the full implementation of the adjacency list graph representation.

119
00:10:39,520 --> 00:10:48,920
So the private instance variables that we're going to use are the number of vertices in

120
00:10:48,919 --> 00:10:56,319
the graph and then a array of bags of integers.

121
00:10:56,319 --> 00:11:01,319
So data types of set of values, set operations and those values.

122
00:11:01,319 --> 00:11:05,279
So those are the sets of values for a graph.

123
00:11:05,279 --> 00:11:11,679
So here's the constructor of an empty graph with v vertices.

124
00:11:11,679 --> 00:11:17,399
We keep the value v in the instance variable as usual.

125
00:11:17,399 --> 00:11:30,919
Then we create an array of size v and of bags of integers and store that array in the adjacency

126
00:11:30,919 --> 00:11:35,079
array of the graph to list the rate.

127
00:11:35,080 --> 00:11:45,200
And then as usual, when we create an array of objects, we go through and for every entry in the array,

128
00:11:45,200 --> 00:11:50,200
we initialize with an empty object.

129
00:11:50,200 --> 00:11:54,920
So after this code, we have v empty bags.

130
00:11:54,920 --> 00:11:57,800
And so that's the constructor.

131
00:11:57,800 --> 00:12:02,720
And then the other main engine and building graphs is adedge.

132
00:12:02,720 --> 00:12:10,960
And so to add an edge between v and w, we add w to v's bag and we add v to w's bag.

133
00:12:10,960 --> 00:12:12,720
That's it.

134
00:12:12,720 --> 00:12:20,840
And to iterate through all the vertices adjacent to a given vertex, we simply return the

135
00:12:20,840 --> 00:12:23,440
bag which is iterable.

136
00:12:23,440 --> 00:12:30,160
This is a nice example illustrating the power of abstraction because we did the low level

137
00:12:30,159 --> 00:12:39,679
processing for that's involved with our bag implementation in one of the early lectures.

138
00:12:39,679 --> 00:12:47,199
And now we get to use that to give a very compact implementation and efficient implementation

139
00:12:47,199 --> 00:12:50,000
of the graph data structure.

140
00:12:50,000 --> 00:12:54,279
So it's really important to understand this code and you should make sure that you study

141
00:12:54,279 --> 00:12:55,799
it.

142
00:12:55,799 --> 00:13:03,120
So as I mentioned in practice, we're going to be using this adjacency list representation

143
00:13:03,120 --> 00:13:08,839
because all the algorithms are based on iterating over the vertices adjacent to v.

144
00:13:08,839 --> 00:13:14,039
And this gets that done in time proportional to the number of such vertices, that's number

145
00:13:14,039 --> 00:13:15,039
one.

146
00:13:15,039 --> 00:13:22,679
And number two, in the real world, the graphs have lots of vertices but a pretty small vertex

147
00:13:22,679 --> 00:13:24,240
degree.

148
00:13:24,240 --> 00:13:31,320
So number one, we can afford to represent the graphs when we use the adjacency list

149
00:13:31,320 --> 00:13:32,320
representation.

150
00:13:32,320 --> 00:13:36,320
It's basically our space is proportional to the number of edges.

151
00:13:36,320 --> 00:13:43,519
And number two, we can afford to process it because our time taken is proportional to

152
00:13:43,519 --> 00:13:46,279
the number of edges that we examine.

153
00:13:46,279 --> 00:13:53,279
With the array of edges representation and the adjacency matrix representation, it gets

154
00:13:53,279 --> 00:14:01,919
very slow for some very simple task but mostly it's very slow for iterating over the vertices

155
00:14:01,919 --> 00:14:07,600
given to adjacent to a given vertex which is the key operation.

156
00:14:07,600 --> 00:14:13,000
List of edges you have to go through all the edges to find the ones adjacent to a given vertex.

157
00:14:13,000 --> 00:14:19,120
A adjacency matrix you have to go through all possible vertices adjacent.

158
00:14:19,120 --> 00:14:23,600
And that's just going to be much too slow and for practice because adjacency list gets

159
00:14:23,600 --> 00:14:30,720
it done in time proportional degree of v which is much smaller for the huge graphs that

160
00:14:30,720 --> 00:14:33,600
we see in the real world.

161
00:14:33,600 --> 00:14:35,080
So that's our basic API.

162
00:14:35,080 --> 00:14:38,840
Next we'll look at some algorithms that are clients of this API.

