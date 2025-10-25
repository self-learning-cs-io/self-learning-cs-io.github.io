---
title: CS143 P109Week916 02 B+Graph+Coloring
---

1
00:00:00,000 --> 00:00:06,000
So far, we've talked about what an register interference graph is and defined the notion of graph coloring,

2
00:00:06,000 --> 00:00:09,000
but we haven't actually talked about how to compute graph coloring.

3
00:00:09,000 --> 00:00:12,000
So that's the next issue that we have to deal with.

4
00:00:12,000 --> 00:00:14,000
And unfortunately, it isn't easy.

5
00:00:14,000 --> 00:00:17,000
So graph coloring is a very hard problem.

6
00:00:17,000 --> 00:00:21,000
If you had a computer science theory class, then it will mean something to you,

7
00:00:21,000 --> 00:00:26,000
and I say that it's an NP-hard problem to compute a coloring of a graph.

8
00:00:26,000 --> 00:00:32,000
If you have not heard about NP-hardness before, that's not a problem.

9
00:00:32,000 --> 00:00:36,000
The important thing is that nobody knows an efficient algorithm for this problem,

10
00:00:36,000 --> 00:00:39,000
so there's no fast procedure known.

11
00:00:39,000 --> 00:00:43,000
And so the solution that we will talk about, the one that every compiler uses,

12
00:00:43,000 --> 00:00:49,000
is to use some heuristics or, basically, approximation techniques that don't solve the problem completely.

13
00:00:49,000 --> 00:00:55,000
But there's a second problem, which is that a coloring might not even exist for a given number of registers.

14
00:00:55,000 --> 00:00:58,000
It might be that we only have eight registers on our machine,

15
00:00:58,000 --> 00:01:03,000
and there is no coloring of the graph that uses fewer than say nine or ten colors.

16
00:01:03,000 --> 00:01:06,000
And so we're going to have to have a way to deal with that.

17
00:01:06,000 --> 00:01:08,000
And we'll talk about that later.

18
00:01:08,000 --> 00:01:12,000
I won't say anything more about the solution to that problem just now.

19
00:01:12,000 --> 00:01:15,000
So now I'll present the most popular heuristic for coloring,

20
00:01:15,000 --> 00:01:16,000
register interference graphs.

21
00:01:16,000 --> 00:01:18,000
And the basic idea is very, very simple.

22
00:01:18,000 --> 00:01:24,000
So what we'll do is we'll pick a node, a t, that has fewer than k neighbors in the graph.

23
00:01:24,000 --> 00:01:26,000
And this is actually the key thing.

24
00:01:26,000 --> 00:01:29,000
So just find any node in the graph that has fewer than k neighbors.

25
00:01:29,000 --> 00:01:32,000
And then we'll eliminate t and its edges from the register interference graphs.

26
00:01:32,000 --> 00:01:36,000
We'll just delete that node and all the edges adjacent to it.

27
00:01:36,000 --> 00:01:41,000
And then if the resulting subgraph is k-colourable, then so is the original graph.

28
00:01:41,000 --> 00:01:44,000
So the idea here is to do a divide and conquer kind of approach.

29
00:01:44,000 --> 00:01:45,000
We pick one node.

30
00:01:45,000 --> 00:01:47,000
We delete it from the graph.

31
00:01:47,000 --> 00:01:49,000
We color the remainder of the graph.

32
00:01:49,000 --> 00:01:52,000
That's a smaller problem with one fewer than k neighbors.

33
00:01:52,000 --> 00:01:54,000
That's a smaller problem with one fewer nodes.

34
00:01:54,000 --> 00:02:00,000
And then when we're done with that, I claim that we can find a coloring for the original graph.

35
00:02:00,000 --> 00:02:02,000
And why is that?

36
00:02:02,000 --> 00:02:04,000
Well, let's draw a picture here.

37
00:02:04,000 --> 00:02:08,000
So let's say we have a node that has fewer than k neighbors.

38
00:02:08,000 --> 00:02:11,000
And let's just say for the sake of argument that it has two neighbors.

39
00:02:11,000 --> 00:02:12,000
And here's the rest of the graph.

40
00:02:12,000 --> 00:02:14,000
So this big circle is the rest of the graph.

41
00:02:14,000 --> 00:02:16,000
Here's the node t that we're going to delete.

42
00:02:16,000 --> 00:02:19,000
And let's say that it just has two neighbors.

43
00:02:19,000 --> 00:02:23,000
So now what we're going to do is we're going to conceptually delete t from the graph.

44
00:02:23,000 --> 00:02:26,000
And so then we're going to color the subgraph.

45
00:02:26,000 --> 00:02:29,000
And let's say that we succeed in coloring the subgraph.

46
00:02:29,000 --> 00:02:32,000
So we now have a coloring for this big ball in red.

47
00:02:32,000 --> 00:02:37,000
And now we want to construct a coloring for that big ball plus this node t.

48
00:02:37,000 --> 00:02:44,000
Well, since we've said there are fewer than k colors needed to color the subgraph.

49
00:02:44,000 --> 00:02:46,000
And at two is certainly less than k.

50
00:02:46,000 --> 00:02:49,000
Well, then there must be a leftover color for t.

51
00:02:49,000 --> 00:02:53,000
We can look at all the colors of the nodes that are adjacent to t.

52
00:02:53,000 --> 00:02:56,000
Since they're a fewer than k of these, they can't use all k of the colors.

53
00:02:56,000 --> 00:03:01,000
And then we can pick one of the leftover colors for t.

54
00:03:01,000 --> 00:03:04,000
So here's a procedure that works very well in practice.

55
00:03:04,000 --> 00:03:08,000
First, we pick a node t that has fewer than k neighbors.

56
00:03:08,000 --> 00:03:11,000
We put t on a stack and remove it from the restrain or interference graph.

57
00:03:11,000 --> 00:03:12,000
And then we recurse.

58
00:03:12,000 --> 00:03:15,000
We repeat this procedure until the graph is empty.

59
00:03:15,000 --> 00:03:18,000
So we just keep choosing nodes that have fewer than k neighbors,

60
00:03:18,000 --> 00:03:20,000
pushing them onto a stack and leaving them from the graph.

61
00:03:20,000 --> 00:03:23,000
And we do that until the graph is completely emptied out.

62
00:03:23,000 --> 00:03:24,000
And that's the first phase.

63
00:03:24,000 --> 00:03:26,000
So that's part one.

64
00:03:26,000 --> 00:03:31,000
And then in part two, we assign a coloring.

65
00:03:31,000 --> 00:03:34,000
We build a coloring for the nodes on the stack.

66
00:03:34,000 --> 00:03:37,000
And the nodes are processed in reverse order they were added.

67
00:03:37,000 --> 00:03:40,000
So the last node added to the stack is process first.

68
00:03:40,000 --> 00:03:44,000
And in each step, what we do is we pick a color that is different

69
00:03:44,000 --> 00:03:47,000
from those assigned to the already colored neighbors.

70
00:03:47,000 --> 00:03:49,000
So the idea is we pick a node off the stack.

71
00:03:49,000 --> 00:03:51,000
We pop it off the stack.

72
00:03:51,000 --> 00:03:55,000
Now we add it back into the graph along with the edges that had the original graph.

73
00:03:55,000 --> 00:03:57,000
And then we color it.

74
00:03:57,000 --> 00:04:00,000
So then we look at its neighbors.

75
00:04:00,000 --> 00:04:03,000
And since we had fewer than k neighbors at the time it was deleted,

76
00:04:03,000 --> 00:04:05,000
it will have fewer than k at the time it's added back in.

77
00:04:05,000 --> 00:04:07,000
There will be a color available for it.

78
00:04:07,000 --> 00:04:08,000
We color it.

79
00:04:08,000 --> 00:04:11,000
And then we repeat by picking another node from the stack.

80
00:04:11,000 --> 00:04:16,000
And we do that until all the nodes of the graph have been processed.

81
00:04:16,000 --> 00:04:18,000
So let's do an example.

82
00:04:18,000 --> 00:04:20,000
Here's our register interference graph.

83
00:04:20,000 --> 00:04:24,000
So we're going to process this rig with k equal to four.

84
00:04:24,000 --> 00:04:28,000
So initially we have the entire register interference graph and the stack is empty.

85
00:04:28,000 --> 00:04:33,000
So the first step is to pick some node that has fewer than four neighbors.

86
00:04:33,000 --> 00:04:35,000
So let's pick a.

87
00:04:35,000 --> 00:04:37,000
Since it only has two neighbors.

88
00:04:37,000 --> 00:04:38,000
So what do we do?

89
00:04:38,000 --> 00:04:41,000
We delete a from the graph and we push it onto the stack.

90
00:04:41,000 --> 00:04:47,000
So after that step our graph, here's our graph with a removed and here's our stack.

91
00:04:47,000 --> 00:04:51,000
All right, now we're going to pick another node that has fewer than k neighbors.

92
00:04:51,000 --> 00:04:54,000
And if we look, sorry, fewer than four neighbors.

93
00:04:54,000 --> 00:04:59,000
And if we look at this graph, we can see that we have the option of picking a few different nodes.

94
00:04:59,000 --> 00:05:02,000
We could pick D or B.

95
00:05:02,000 --> 00:05:07,000
There's only two different nodes we could pick because CE and F all have four neighbors.

96
00:05:07,000 --> 00:05:09,000
So let's remove D.

97
00:05:09,000 --> 00:05:13,000
Our arbitrary choice here doesn't matter which one we pick.

98
00:05:13,000 --> 00:05:20,000
And now the stack will have DNA on it and our graph will be down to these four nodes.

99
00:05:20,000 --> 00:05:25,000
And now something interesting to observe here is that all the nodes at this point have fewer than four neighbors.

100
00:05:25,000 --> 00:05:32,000
And so since every node in the graph has fewer neighbors than the number of colors we're allowed to use,

101
00:05:32,000 --> 00:05:37,000
at this point the graph coloring is guaranteed to succeed because every time we remove a node,

102
00:05:37,000 --> 00:05:42,000
we can only reduce the number of neighbors of every other node in the graph.

103
00:05:42,000 --> 00:05:50,000
It's also interesting to note that even though some of the nodes had four neighbors in the previous step.

104
00:05:50,000 --> 00:05:53,000
And so it might not have been colorable.

105
00:05:53,000 --> 00:05:58,000
We couldn't choose them at that step because potentially a coloring of the neighbors would use up all the colors.

106
00:05:58,000 --> 00:06:01,000
Notice that now they all have fewer than four neighbors.

107
00:06:01,000 --> 00:06:06,000
And this is one of the interesting properties or one of the good properties of this graph coloring heuristic.

108
00:06:06,000 --> 00:06:10,000
Is that even if a node has many more than K neighbors.

109
00:06:10,000 --> 00:06:17,000
Eventually we may remove enough nodes from the graph that its number of neighbors will drop below the number of colors available.

110
00:06:17,000 --> 00:06:20,000
And then we'll be able to color it.

111
00:06:20,000 --> 00:06:26,000
So anyway, now we can, it doesn't matter which node we pick because we can process them in any order at this point.

112
00:06:26,000 --> 00:06:28,000
Now we'll remove C from the graph.

113
00:06:28,000 --> 00:06:30,000
And we wind up with this graph.

114
00:06:30,000 --> 00:06:33,000
And now picking another node we can remove B.

115
00:06:33,000 --> 00:06:35,000
Now we're down to just a two-node graph.

116
00:06:35,000 --> 00:06:37,000
Let's pick E and remove it from the graph.

117
00:06:37,000 --> 00:06:40,000
Now we're down to just a one-node graph.

118
00:06:40,000 --> 00:06:42,000
And we move F from the graph.

119
00:06:42,000 --> 00:06:44,000
And now the graph is empty and we have our stack.

120
00:06:44,000 --> 00:06:48,000
And nodes at the stack, all we've really done in this procedure.

121
00:06:48,000 --> 00:06:54,000
I mean the goal of this first phase of the procedure has been to put an order on the nodes of the graph.

122
00:06:54,000 --> 00:06:59,000
This is the order in which we should assign colors to the nodes of the graph.

123
00:06:59,000 --> 00:07:02,000
So now working backwards.

124
00:07:02,000 --> 00:07:05,000
After we're done with the first part, now we've got to do the second part.

125
00:07:05,000 --> 00:07:06,000
We actually assign the colors.

126
00:07:06,000 --> 00:07:11,000
And we're going to begin with the top of the stack.

127
00:07:11,000 --> 00:07:14,000
So we'll take node F and put it back into the graph.

128
00:07:14,000 --> 00:07:16,000
And we'll assign it a color.

129
00:07:16,000 --> 00:07:22,000
And let's just say that we're going to pick the lowest numbered register that is not used by any of its neighbors.

130
00:07:22,000 --> 00:07:27,000
And so since F is in the graph by itself, we'll just assign it register what?

131
00:07:27,000 --> 00:07:29,000
Now we add E back into the graph.

132
00:07:29,000 --> 00:07:33,000
And it has to have a different register from F.

133
00:07:33,000 --> 00:07:40,000
And so since F is using register R1, we'll just assign E register R2.

134
00:07:40,000 --> 00:07:43,000
Now we add B back into the graph.

135
00:07:43,000 --> 00:07:47,000
It has to have a different color or register than both F and E.

136
00:07:47,000 --> 00:07:50,000
So we'll assign it register R3.

137
00:07:50,000 --> 00:07:52,000
We assign C back into the graph.

138
00:07:52,000 --> 00:07:56,000
Now notice it C has both has all of F e and B as neighbors.

139
00:07:56,000 --> 00:07:58,000
They're using the first three registers.

140
00:07:58,000 --> 00:08:00,000
So C will get assigned register R4.

141
00:08:00,000 --> 00:08:02,000
And now we're out of registers.

142
00:08:02,000 --> 00:08:08,000
I mean these four nodes are using all of the registers.

143
00:08:08,000 --> 00:08:15,000
But because we deleted things in the right order in the first phase, we know that when we add in other nodes,

144
00:08:15,000 --> 00:08:18,000
the rest of the nodes on the stack, they won't have all of those nodes as neighbors.

145
00:08:18,000 --> 00:08:21,000
So there'll be some register available to assign.

146
00:08:21,000 --> 00:08:30,000
So looking at register D, I'm sorry, looking at node D here, it shares, it has its neighbors, F e and C.

147
00:08:30,000 --> 00:08:36,000
And so the only register that it can be assigned is R3, which is the same register as B.

148
00:08:36,000 --> 00:08:40,000
This is the only register that isn't used by one of its neighbors.

149
00:08:40,000 --> 00:08:42,000
So D gets assigned register R3.

150
00:08:42,000 --> 00:08:47,000
And then we assign A, sorry, we add A back into the graph.

151
00:08:47,000 --> 00:08:48,000
And we look at its neighbors.

152
00:08:48,000 --> 00:08:52,000
And they're using registers R1 and R4.

153
00:08:52,000 --> 00:08:56,000
So A could be assigned either register R2 or R3.

154
00:08:56,000 --> 00:09:00,000
And since our rule is just to use the lowest number of registers that isn't used by one of the neighbors,

155
00:09:00,000 --> 00:09:03,000
we'll assign it register R2.

156
00:09:03,000 --> 00:09:08,000
And there's our complete coloring of the graph.

