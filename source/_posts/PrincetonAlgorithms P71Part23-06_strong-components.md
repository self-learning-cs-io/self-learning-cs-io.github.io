---
title: PrincetonAlgorithms P71Part23 06_strong Components
---

1
00:00:00,000 --> 00:00:12,560
As our final die graph processing algorithm, we'll take a look at computing strong components.

2
00:00:12,560 --> 00:00:19,800
So definition two vertices, V and W in a die graph, are strongly connected if there's

3
00:00:19,800 --> 00:00:26,839
a directed path from V to W and another directed path from W to V. And the thing about strongly

4
00:00:26,839 --> 00:00:33,799
connected is that it's an equivalence relation. That is, each vertex is strongly connected

5
00:00:33,799 --> 00:00:42,039
to itself. If V is connected to W strongly and W is strongly connected to V, that just

6
00:00:42,039 --> 00:00:47,640
means this direct path is connecting them. And it's also transitive. If V is connected

7
00:00:47,640 --> 00:00:55,120
to W and W to X, then V is strongly connected to X. To get from V to X, you go from V to

8
00:00:55,119 --> 00:01:03,000
W and W to X, you get from X to V, you go from X to W and W to V. So that means that since

9
00:01:03,000 --> 00:01:09,239
it's an equivalence relation, it divides the die graph up into components, into sets,

10
00:01:09,239 --> 00:01:14,840
called strongly connected components, that have the property that there's directed paths

11
00:01:14,840 --> 00:01:24,439
connecting each pair of vertices in the set. So for example, nine in 12 are strongly connected

12
00:01:24,439 --> 00:01:34,280
as a path from 12 to 9, another one from 9 to 12 and so forth. So our challenge is to compute

13
00:01:34,280 --> 00:01:44,039
the strong components in die graphs. And it's worth comparing this to what we did for

14
00:01:44,039 --> 00:01:51,799
connected components in undirected graphs. So this is just a quick review in an undirected

15
00:01:51,799 --> 00:01:56,359
graph. If there's a path between two vertices, they're connected, that's an equivalence relation,

16
00:01:56,359 --> 00:02:05,359
divides them up into connected components. And what we did was our design pattern is to build

17
00:02:05,359 --> 00:02:11,960
our graph processing algorithm as a constructor that takes a graph and does the pre-processing

18
00:02:11,960 --> 00:02:19,719
to create a table like this one, which assigns a unique ID to all the vertices in each given

19
00:02:19,719 --> 00:02:27,520
component so that we can have a constant time client query to check whether two given vertices

20
00:02:27,520 --> 00:02:34,000
are in the same connected component or not. So linear time processing, pre-processing in the

21
00:02:34,000 --> 00:02:41,879
constructor to build the table constant time client queries. And that's as good performance as we

22
00:02:41,879 --> 00:02:48,759
could expect to have for a graph processing algorithm. Remarkably, we're able to do the same

23
00:02:48,759 --> 00:02:57,159
thing for strong connectivity. It's a much more sophisticated algorithm, but the design pattern

24
00:02:57,159 --> 00:03:03,639
in the bottom line for the client is the same. There's a constructor that processes the graph in

25
00:03:03,639 --> 00:03:10,439
linear time and it signs a unique ID to each one of the strongly connected components in the graph.

26
00:03:10,599 --> 00:03:19,079
So one's in a component by itself, 0, 2, 3, 4, and 5, 6, and 8, 7, and 9, 10, and 12. There's five

27
00:03:19,079 --> 00:03:24,759
different strongly connected components in this graph. The constructor builds that array and the

28
00:03:24,759 --> 00:03:33,079
client gets to in constant time, whether two vertices are strongly connected or not. It's quite

29
00:03:33,080 --> 00:03:40,440
amazing that we can solve this problem in this way. And as I mentioned, it's got an interesting

30
00:03:40,440 --> 00:03:47,240
history that I'll talk about in a second. So here's an example of strong component application.

31
00:03:47,240 --> 00:03:55,240
So the food-wed graph, this is a very small subset of that graph. The vertices are all the species

32
00:03:56,200 --> 00:04:05,640
and an edge goes from producer to consumer. So if an animal A eats animal B, there's an edge from A to B.

33
00:04:06,760 --> 00:04:14,280
And what a strong component corresponds to in this graph is kind of a subset of species that

34
00:04:14,280 --> 00:04:21,960
have a common energy flow. They mutually eat each other. And that's extremely important in ecological

35
00:04:21,959 --> 00:04:32,439
studies. Another example is, again, in processing software, big software is made up of modules.

36
00:04:33,319 --> 00:04:42,519
And the vertices are the modules and the edges if one depends on another. And so a strong

37
00:04:42,519 --> 00:04:50,279
component in this graph is a subset of mutually interacting modules. In a huge program like internet

38
00:04:50,279 --> 00:04:55,719
explorer, you want to know what the strong components are so that you can package them together

39
00:04:56,439 --> 00:05:05,639
and maybe improve the design. So again, these graphs can be huge. And this kind of graph processing

40
00:05:05,639 --> 00:05:14,839
can be extremely important in improving the design of software. Now again, this algorithm has

41
00:05:14,919 --> 00:05:21,399
an interesting history, along with scheduling and other things. It's a core problem in operations

42
00:05:21,399 --> 00:05:30,120
research that was widely studied but really not understood how difficult it was. In Targets paper

43
00:05:30,120 --> 00:05:39,879
in 1972 was a big surprise that this could be solved in a linear time with depth for search.

44
00:05:40,439 --> 00:05:48,120
Now, this algorithm had a couple of other data structures and is, I guess, a diligent student in

45
00:05:48,120 --> 00:05:55,399
this class could understand it with quite a bit of work. But it really demonstrated the importance

46
00:05:55,399 --> 00:06:02,199
of depth for search in graph processing. Now, the algorithm that we're going to talk about today

47
00:06:02,759 --> 00:06:11,639
actually was invented in the 80s by Kossaraju independently by Shireer. The story goes that Kossaraju

48
00:06:12,519 --> 00:06:18,680
had to go lecture about Targets' algorithm and he forgot his notes and he had taught it a number

49
00:06:18,680 --> 00:06:24,199
of times. He was trying to figure out what Targets' algorithm did and he developed this other

50
00:06:24,199 --> 00:06:30,360
algorithm that's extremely simple to implement. That's what we're going to look at today.

51
00:06:31,319 --> 00:06:42,040
And actually, in the 1990s, Gebao and Melhorn, particularly Melhorn, had to implement this algorithm

52
00:06:42,840 --> 00:06:50,360
for a big software package and I found another simple linear time algorithm. So this story

53
00:06:50,360 --> 00:06:57,960
indicates even from fundamental problems in graph processing, there's algorithms out there

54
00:06:57,959 --> 00:07:05,399
still waiting to be discovered. This algorithm is a good example of that. So I get the intuition

55
00:07:05,399 --> 00:07:10,599
in the code and you see how the algorithm works. Fully convincing yourself or approving

56
00:07:11,959 --> 00:07:18,679
why it works is a bit more of a challenge. We'll leave that mostly for the book. But let's describe

57
00:07:18,679 --> 00:07:27,639
what it is. So the first idea is to think about the reverse graph. So if we take a graph and we

58
00:07:27,639 --> 00:07:33,000
reverse the sense of all the edges, we're going to get the same strong components. We need edges

59
00:07:33,000 --> 00:07:37,560
in both directions. So if we switch the directions, we're still going to have edges in both directions.

60
00:07:39,240 --> 00:07:47,719
The second concept is called the kernel DAG. And what that does is it kind of, you think about

61
00:07:48,360 --> 00:07:55,319
contracting each strong component into a single vertex and then just worry about the edges that

62
00:07:56,040 --> 00:08:07,000
go from one strong component to another. So the digraph that you get that way turns out to be a

63
00:08:07,000 --> 00:08:15,560
cyclic. If it was cyclic, it would involve, it would create a bigger strong component,

64
00:08:15,560 --> 00:08:24,519
a couple of strong components into one. So we think about that processing that kernel DAG,

65
00:08:24,519 --> 00:08:31,319
that's the edges that go between strong components. And we get a DAG and we know how to deal with a

66
00:08:31,319 --> 00:08:40,600
DAG. So the idea of the algorithm is to go ahead and compute the topological order or the reverse

67
00:08:40,600 --> 00:08:49,720
post order in the kernel DAG. At least put out the edges of the original digraph in order so that

68
00:08:49,720 --> 00:08:55,000
all the edges in the kernel DAG point from right to left. That's like a topological sort.

69
00:08:56,120 --> 00:09:03,560
And then we run DFS, but instead of considering the vertices in numerical order for the DFS,

70
00:09:03,560 --> 00:09:11,240
we consider them in that reverse topological order. So it's extremely easy to implement this algorithm.

71
00:09:11,240 --> 00:09:20,200
So of course we're going to use DFS. So let's look at a demo at how the algorithm works.

72
00:09:24,200 --> 00:09:29,720
Okay, so this is a diagram and our goal is to compute the strong components. And we're going to do it in

73
00:09:29,720 --> 00:09:37,159
two phases, two DFSs. One is to compute the reverse post order in the reverse of the graph.

74
00:09:38,039 --> 00:09:43,719
And the other is to run the DFS, but for the order in which we visit the vertices, we use

75
00:09:44,279 --> 00:09:52,439
that reverse post order that we compute it. So here goes. So first we'll do the DFS in the reverse graph.

76
00:09:54,360 --> 00:10:01,559
So that's the graph. That's the reverse graph. Remember these two have the same strong components.

77
00:10:02,519 --> 00:10:08,759
So there's our marked array. We do the DFS and reverse post order means that when we're done with

78
00:10:08,759 --> 00:10:21,639
the vertex, we put it out. So check six on mark, check eight on mark, check six, it's marked. So we're

79
00:10:21,639 --> 00:10:27,639
done with eight. And so that's the reverse post order. And again, as before, we put it on a stack,

80
00:10:28,600 --> 00:10:38,199
but we'll just list them in reverse order in this demo. So each done, so six, lots of places to go from six.

81
00:10:39,000 --> 00:10:45,480
So let's check seven. That's unmarked. So we go to seven. No place to go from seven. So we're done

82
00:10:45,480 --> 00:10:52,200
with seven. We put it on the reverse post order list. We're also done with six, because four and

83
00:10:52,200 --> 00:11:00,840
nine are coming in in this example. So put it on the list. Next place to go from zero is two. So we

84
00:11:00,840 --> 00:11:09,400
check two. That's unmarked. So we mark it in reverse and we check the vertices adjacent to two.

85
00:11:10,200 --> 00:11:19,720
First four, that's unmarked. So we go to four. We got to go to 11 first in reverse. So now we're at 11.

86
00:11:19,720 --> 00:11:28,120
And from 11, we go to nine, which is unmarked. So we have a pretty long recursive stack right here.

87
00:11:29,000 --> 00:11:36,200
So from nine, we have to check a bunch of things. We'll check 12 first. And then visit 12. It's unmarked.

88
00:11:37,160 --> 00:11:43,560
From 12, we check 11, which is marked. Now we're at a go. Then we check 10. That's unmarked. So we go to 10.

89
00:11:44,519 --> 00:11:50,759
Visit 10. It's unmarked. So we're a recurs. And then go to nine.

90
00:11:52,119 --> 00:11:57,079
And that's marked. And that's everywhere we get from 10. So we're done with 10. So we put it on the list

91
00:11:58,199 --> 00:12:05,000
in return. And now we're done with 12. So we put it on the list in return. And now at nine, we have to

92
00:12:05,000 --> 00:12:10,199
check seven, which is marked and six, which is marked. And then we're done. So we put it on the list.

93
00:12:11,160 --> 00:12:17,480
Then we're done with 11. We put it on the list. Then we're finished with four. So we check six, which is marked.

94
00:12:17,480 --> 00:12:25,080
And we check five, which is unmarked. So we recurse to five. From five, we check three, which is unmarked.

95
00:12:25,080 --> 00:12:32,120
So we recurse. Then we check four, which is marked. We check two, which is marked. And then we're done with three.

96
00:12:32,120 --> 00:12:39,720
So we put it on the list. And then from five, we check zero. It's marked. So we're done with five.

97
00:12:39,720 --> 00:12:48,759
We put on the list. And that means that we're now done with four. And then we're also done with two.

98
00:12:49,560 --> 00:12:59,080
After checking three. And then we go to zero and put it on the list. So that's all the vertices that

99
00:12:59,080 --> 00:13:06,040
you get to from zero. So we look for more vertices. And it's one in its mark. So that's the last one in

100
00:13:06,040 --> 00:13:12,680
the reverse post order. So that's a reverse post order of the reverse graph. And all we're going to do is

101
00:13:12,680 --> 00:13:20,680
take that order and use that order to check vertices at the top level in the depth first search of our

102
00:13:20,680 --> 00:13:26,280
regular graph. We have to check all the other vertices to make sure we're done. So that's phase one.

103
00:13:27,159 --> 00:13:32,439
So now we just do a DFS in the original graph using that order that we just compute it.

104
00:13:32,439 --> 00:13:40,120
So we don't start with zero the way we always have. Now we start with one. We visit one. It's unmarked.

105
00:13:41,079 --> 00:13:47,319
And now all the vertices that we visit during that DFS are going to be in the same strong component.

106
00:13:47,319 --> 00:13:53,399
That's the theorem that makes this algorithm work. In this case, there's the only the only the one. So

107
00:13:56,439 --> 00:14:01,399
vertex one is the only is it's in its own strong component with label zero.

108
00:14:02,279 --> 00:14:08,120
So now we've got to start one's all done. So now we have to start with looking for another vertex to

109
00:14:08,120 --> 00:14:14,439
search from. In this case, it's zero is second on the list. So that's where we start with zero.

110
00:14:15,079 --> 00:14:20,839
And now all the vertices that we can reach from zero are going to have a strong in this graph are

111
00:14:20,840 --> 00:14:27,480
going to have strong component label one. So we do the DFS. So first we get to five. That's in the same

112
00:14:27,480 --> 00:14:35,879
strong component. We check four and it's unmarked. So we label it. We check three. It's unmarked. We check

113
00:14:36,440 --> 00:14:45,639
five, which is marked. We check two, which is unmarked. So now we have shown that zero, two, three,

114
00:14:45,639 --> 00:14:53,319
four and five are all in the same strong component. And now we're going to find both vertices we

115
00:14:53,319 --> 00:15:00,759
get to from two or mark. So we're done with two. Then we're done with three. Four, we have to check

116
00:15:00,759 --> 00:15:08,120
two, which is marked. And then we're done with four and five. From zero, we can check one, but

117
00:15:08,120 --> 00:15:15,399
that's already marked. So that's not relevant for this search. And then we're done with zero. And we

118
00:15:15,399 --> 00:15:20,199
have established that zero, two, three, four and five are all in the same strong component.

119
00:15:21,480 --> 00:15:28,120
So that's the second one. So now we continue and we check all of those in their all marked.

120
00:15:29,240 --> 00:15:36,439
So the next vertex in the reverse post sort of reverse graph is 11. So we visit 11.

121
00:15:37,159 --> 00:15:43,240
Check four. It's already marked. Check 12. It's not so we mark it. And these are the third

122
00:15:43,240 --> 00:15:50,360
strong component. They get labeled with two. Then we get to nine. From nine, we check 11.

123
00:15:51,480 --> 00:15:57,960
And nowhere to go. Then we check 10. And so that's in the strong component. From 10, we check 12,

124
00:15:57,960 --> 00:16:03,639
which is marked. We're done with 10. We're done with nine. We're done with 12. And we're done with

125
00:16:03,639 --> 00:16:11,159
11. So that's our third strong component, 9, 10, 11 and 12.

126
00:16:11,719 --> 00:16:19,159
So we're done with those. And now we go through the list to find another unmarked vertex.

127
00:16:19,159 --> 00:16:26,519
9's marked, 12's marked, 10's marked. We get to six from six. Nine's already marked.

128
00:16:27,799 --> 00:16:35,720
Four's already marked. Eight's not marked. So we go there. From eight, we can get to six. And that's it.

129
00:16:35,720 --> 00:16:43,160
Zero's already marked. So we can only get to eight from six at this point. And so that's a strong

130
00:16:43,160 --> 00:16:50,360
component. And then finally, we finish up by doing seven. So the end of the computation

131
00:16:51,000 --> 00:16:58,120
gives us the strong component array, which is a unique ID for each of the vertices. So that two

132
00:16:58,120 --> 00:17:05,160
vertices in the same strong component have the same ID. And that's a sports constant time,

133
00:17:05,640 --> 00:17:13,320
strong connectivity checks for clients. So the bottom line is that this algorithm is a very simple,

134
00:17:14,120 --> 00:17:21,240
even though it might be mysterious, algorithm for computing the strong component. First, run DFS

135
00:17:21,240 --> 00:17:27,720
on the reverse graph to compute the reverse post-order. Then run DFS on the original graph,

136
00:17:27,720 --> 00:17:37,319
considering the vertices in the order given by the first DFS. And so these diagrams give a

137
00:17:37,319 --> 00:17:45,240
summary of the computation. I'm not going to spend too much time explaining why and how it works

138
00:17:45,240 --> 00:17:53,319
in this lecture. But these kinds of diagrams give the detail that can give some intuition

139
00:17:54,119 --> 00:18:04,279
about how and why the algorithm works. The proof is required some mathematical sophistication

140
00:18:04,279 --> 00:18:11,799
and you'll find it in the book. But the programming of it is quite simple and prove that it's

141
00:18:12,279 --> 00:18:20,519
efficient. All it does is run DFS twice. But to really see the correctness proof, you want to

142
00:18:20,519 --> 00:18:26,839
look at the second printing of the textbook. We got it wrong in the first printing. But look

143
00:18:26,839 --> 00:18:32,920
at the implementation. So this is connected components in an undirected graph with DFS that we did

144
00:18:32,920 --> 00:18:38,920
last time. And I'm sure many of you thought it was one of the simplest algorithms that we looked at.

145
00:18:39,720 --> 00:18:45,960
We just marked the vertices and do recursive DFS and that's the end of it. If you take that code

146
00:18:46,840 --> 00:18:57,960
and just add, well, change the names. And then just instead of going for the vertices from zero

147
00:18:57,960 --> 00:19:05,960
through V minus one, if you first compute the depth first order that you get by running

148
00:19:08,360 --> 00:19:14,200
doing a depth first search of the reverse graph and then you iterate through the vertices in that

149
00:19:14,200 --> 00:19:20,279
order, you get an algorithm for strong connectivity. It's really remarkable that just changing that one

150
00:19:20,279 --> 00:19:31,080
line will perform this computation that was thought to be difficult for many years and people were

151
00:19:31,080 --> 00:19:40,360
learning quite difficult codes for many, many years. So that's a quick summary of die graph processing.

152
00:19:40,359 --> 00:19:47,719
We talked about single source reachability, getting the paths from a vertex to any vertex that

153
00:19:47,719 --> 00:19:54,199
can be reached from that vertex with a directed path. We talked about topological sort in graphs that

154
00:19:54,199 --> 00:20:02,519
have no cycles and that uses DFS. And we talked about computing strong components in a die graph with

155
00:20:02,519 --> 00:20:12,759
two DFSs. Die graph processing is really a testimony to the ingenuity that's possible in algorithmic

156
00:20:12,759 --> 00:20:14,599
graph processing.

