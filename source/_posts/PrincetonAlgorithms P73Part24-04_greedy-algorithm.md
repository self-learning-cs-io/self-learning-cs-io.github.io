---
title: PrincetonAlgorithms P73Part24 04_greedy Algorithm
---

1
00:00:00,000 --> 00:00:08,240
To introduce the algorithms for minimum spanning tree, we're going to look at a general

2
00:00:08,240 --> 00:00:10,000
algorithm called a greedy algorithm.

3
00:00:10,000 --> 00:00:14,839
It's a good example of a general principle in algorithm design that will help us prove

4
00:00:14,839 --> 00:00:17,960
correctness of our algorithms.

5
00:00:17,960 --> 00:00:20,679
To begin, we'll make some simplifying assumptions.

6
00:00:20,679 --> 00:00:26,920
First we assume that the edge weights are all distinct and that the graph is connected.

7
00:00:26,920 --> 00:00:31,280
This is just to simplify the presentation.

8
00:00:31,280 --> 00:00:36,079
As a consequence of these two assumptions, we know that the minimum spanning tree exists

9
00:00:36,079 --> 00:00:37,880
and is unique.

10
00:00:37,880 --> 00:00:41,520
Our algorithms will still work when edge weights are not distinct.

11
00:00:41,520 --> 00:00:46,680
If the graph is not connected, it'll find some spanning trees of components.

12
00:00:46,680 --> 00:00:51,240
But these two assumptions simplify the presentation.

13
00:00:51,240 --> 00:00:56,680
Now to understand our algorithms, we're going to start with a general operation on graph

14
00:00:56,679 --> 00:00:58,920
called making a cut.

15
00:00:58,920 --> 00:01:04,040
So a cut and a graph is a partition of its vertices into two non-empty sets.

16
00:01:04,040 --> 00:01:09,239
And we'll indicate that just by coloring some of the vertices gray and others white.

17
00:01:09,239 --> 00:01:13,359
So that's a partition of the two sets, the gray vertices and the white vertices.

18
00:01:13,359 --> 00:01:18,159
Every vertex is either gray or white and there's at least one in each set.

19
00:01:18,159 --> 00:01:24,960
Now given a cut, a crossing edge connects a vertex in one set with a vertex in the other.

20
00:01:24,959 --> 00:01:30,759
So every edge that connects a gray vertex to a white vertex is a crossing edge.

21
00:01:30,759 --> 00:01:37,159
So that's a second definition that gives us a way to talk about edges and graphs when

22
00:01:37,159 --> 00:01:39,959
we compute the minimum spanning tree.

23
00:01:39,959 --> 00:01:48,000
So an important property that is relevant to MST algorithms is that given any cut at all,

24
00:01:48,000 --> 00:01:54,719
the cut defines a set of crossing edges, the minimum weight crossing edge is in the MST.

25
00:01:54,719 --> 00:02:00,519
Remember, no two edges have the same weight, so there's a single edge that has minimum

26
00:02:00,519 --> 00:02:04,359
weight in the edges and the cut.

27
00:02:04,359 --> 00:02:07,760
So in this case, the thick red edge is the minimum weight.

28
00:02:07,760 --> 00:02:12,120
It's the shortest edge connecting a gray vertex with a white one.

29
00:02:12,120 --> 00:02:16,159
And that edge has to be in the MST.

30
00:02:16,159 --> 00:02:19,639
That's the cut property.

31
00:02:19,639 --> 00:02:23,039
So here's just a quick proof of that property.

32
00:02:23,039 --> 00:02:26,719
I'll hand wave a bit through the discussions of the proof.

33
00:02:26,719 --> 00:02:31,959
It's usually not appropriate to fully dimension proofs in the lecture.

34
00:02:31,959 --> 00:02:36,599
So you should look at the book of the online materials to be sure to understand the proofs

35
00:02:36,599 --> 00:02:39,959
or reread these slides.

36
00:02:39,959 --> 00:02:42,479
But I'll try to give all the steps.

37
00:02:42,479 --> 00:02:47,039
So we're trying to prove the cut property, giving any cut the crossing edge of minimum

38
00:02:47,039 --> 00:02:48,399
weight to the MST.

39
00:02:48,399 --> 00:02:52,519
So let's suppose the contradiction.

40
00:02:52,520 --> 00:02:58,800
So suppose that we have a minimum weight crossing edge that's not in the MST.

41
00:02:58,800 --> 00:03:04,120
So in this case, that edge E, suppose is not in the MST.

42
00:03:04,120 --> 00:03:09,560
So it means that one of the other crossing edges has to be in the MST.

43
00:03:09,560 --> 00:03:15,560
Otherwise, the MST wouldn't be connected.

44
00:03:15,560 --> 00:03:20,000
Then if you add E to the MST, you get a cycle.

45
00:03:20,000 --> 00:03:23,680
And some other edge in that cycle has to be a crossing edge.

46
00:03:23,680 --> 00:03:27,599
That's the way to think about it.

47
00:03:27,599 --> 00:03:31,560
Remember, MST is a minimal way to connect the graph.

48
00:03:31,560 --> 00:03:35,680
And if you add an edge to a tree, you get a cycle.

49
00:03:35,680 --> 00:03:39,759
And then there's some other edge that has to be a crossing edge.

50
00:03:39,759 --> 00:03:45,879
But if you remove that edge in add E, then you're going to get a spanning tree.

51
00:03:45,879 --> 00:03:49,319
And that spanning tree is smaller than the one that you had.

52
00:03:49,319 --> 00:03:56,400
So that supposition had to be a contradiction.

53
00:03:56,400 --> 00:04:00,840
So it has to be that the minimum weight crossing edge is in the MST.

54
00:04:00,840 --> 00:04:04,519
So that's the cut property.

55
00:04:04,519 --> 00:04:10,560
So now given that property, we can develop what's called a greedy algorithm,

56
00:04:10,560 --> 00:04:15,560
which is the easiest algorithm we can come up with.

57
00:04:15,560 --> 00:04:21,000
So what we're going to do is start with all edges colored gray.

58
00:04:21,000 --> 00:04:25,879
Find any cut that has no black crossing edges.

59
00:04:25,879 --> 00:04:28,800
The algorithm is going to color some of the edges black.

60
00:04:28,800 --> 00:04:34,279
And color the minimum weight edge of that cut black and just repeat the algorithm.

61
00:04:34,279 --> 00:04:38,439
Finding any cut with no black crossing edges, color the minimum weight edge black,

62
00:04:38,439 --> 00:04:44,959
and keep going until you have V minus 1 edges that are colored black.

63
00:04:44,959 --> 00:04:47,719
And the claim is that that's going to compute an MST.

64
00:04:47,719 --> 00:04:52,639
Let's look at a demo of that just to make sure that we follow what's going on.

65
00:04:52,639 --> 00:04:55,439
So we start with all edges colored gray.

66
00:04:55,439 --> 00:04:57,959
We're supposed to find a cut with no black crossing edges.

67
00:04:57,959 --> 00:04:59,599
And color is min-weight edge black.

68
00:04:59,599 --> 00:05:01,039
Well, that could be any cut.

69
00:05:01,039 --> 00:05:05,039
In this case, we'll take the cut that has three, two, and six on one side.

70
00:05:05,039 --> 00:05:10,919
And one zero, zero one forces five, seven on the other side.

71
00:05:10,919 --> 00:05:12,799
Look at all the crossing edges.

72
00:05:12,800 --> 00:05:17,040
Minimum weight crossing edge is the one from zero to two.

73
00:05:17,040 --> 00:05:21,680
So that's the one that will color black.

74
00:05:21,680 --> 00:05:25,360
So now we have zero two on the MST's color black.

75
00:05:25,360 --> 00:05:28,960
So again, any cut that doesn't have a black crossing edge.

76
00:05:28,960 --> 00:05:34,720
So in this case, let's do the cut that just has five on one side and all the other side.

77
00:05:34,720 --> 00:05:36,960
In this case, there's three crossing edges.

78
00:05:36,960 --> 00:05:38,480
The smallest one is five, seven.

79
00:05:38,480 --> 00:05:40,040
Color that one black.

80
00:05:40,040 --> 00:05:43,640
And again, any cut that has no black crossing edges.

81
00:05:43,640 --> 00:05:45,680
So let's just take six.

82
00:05:45,680 --> 00:05:48,480
The cut that has six on one side and all the others and the other.

83
00:05:48,480 --> 00:05:51,400
Two six is the minimum crossing edge.

84
00:05:51,400 --> 00:05:56,120
So six two and so we put that one on the MST.

85
00:05:56,120 --> 00:05:59,720
As we get more and more black edges, it's going to be harder to find a cut with no black

86
00:05:59,720 --> 00:06:02,560
crossing edges, but we press on.

87
00:06:02,560 --> 00:06:07,920
So now let's do the cut with zero, two, four, and six on one side.

88
00:06:07,920 --> 00:06:11,879
We have a colored white and one three five and seven on the others.

89
00:06:11,879 --> 00:06:15,980
So there's a lot of crossing edges in that cut, but the smallest one is one between zero

90
00:06:15,980 --> 00:06:16,980
and seven.

91
00:06:16,980 --> 00:06:21,360
So that's the one that we color black and add to the MST.

92
00:06:21,360 --> 00:06:23,200
So now we have four edges.

93
00:06:23,200 --> 00:06:26,560
Next cut, one and three on one side.

94
00:06:26,560 --> 00:06:33,319
Smallest edge in that, the smallest crossing edge for that cut is two three.

95
00:06:33,319 --> 00:06:34,319
One more.

96
00:06:34,319 --> 00:06:36,560
Now let's put one and four.

97
00:06:36,560 --> 00:06:41,160
Now almost all the edges left are crossing edges.

98
00:06:41,160 --> 00:06:44,040
So one and four are one side, all the rest are in the other.

99
00:06:44,040 --> 00:06:49,079
And the minimum white crossing edge is the one from one to seven.

100
00:06:49,079 --> 00:06:53,519
Notice in this case, we got the nodes in the tree and one side of the cut and the nodes

101
00:06:53,519 --> 00:06:56,160
not in the tree on the other side of the cut.

102
00:06:56,160 --> 00:06:59,199
One of our algorithms will always have that property.

103
00:06:59,199 --> 00:07:01,800
So now we add one to seven, one and seven to that.

104
00:07:01,800 --> 00:07:09,480
And now the last thing is to the only cut that has no black edges is the one that puts

105
00:07:09,480 --> 00:07:12,759
four on one side and all the rest on the other.

106
00:07:12,759 --> 00:07:18,800
And the minimum white crossing edge for that one is five, four.

107
00:07:18,800 --> 00:07:28,879
So now we've got eight vertices and seven vertices in the seven edges in the MST.

108
00:07:28,879 --> 00:07:31,680
So we've found the MST.

109
00:07:31,680 --> 00:07:37,840
We've got V minus one edges colored black and we've found the MST.

110
00:07:37,840 --> 00:07:41,400
So the greedy algorithm is a very general algorithm.

111
00:07:41,400 --> 00:07:45,280
We're allowed to find any cut at all that has no black crossing edges.

112
00:07:45,280 --> 00:07:49,960
So let's do the correctness proof and then we'll look at some specific instances of the

113
00:07:49,960 --> 00:07:53,639
greedy algorithm.

114
00:07:53,639 --> 00:08:04,439
So first of all, since we took the minimum crossing edge of a cut always to color black,

115
00:08:04,439 --> 00:08:06,719
any black edge is in the MST.

116
00:08:06,719 --> 00:08:07,919
That's the cut property.

117
00:08:07,919 --> 00:08:09,439
Do a cut.

118
00:08:09,439 --> 00:08:10,639
No black crossing edges.

119
00:08:10,639 --> 00:08:11,839
You can color a black.

120
00:08:11,839 --> 00:08:12,839
That's in the MST.

121
00:08:12,839 --> 00:08:17,279
So that's first observation.

122
00:08:17,279 --> 00:08:26,719
Now when we have fewer than V minus one black edges, there has to be a cut that has no

123
00:08:26,719 --> 00:08:28,079
black crossing edges.

124
00:08:28,079 --> 00:08:31,519
That is the algorithm doesn't get stuck.

125
00:08:31,519 --> 00:08:37,159
And so the way to think about that is just take the vertices in one of the connected

126
00:08:37,159 --> 00:08:40,720
components and make that the cut.

127
00:08:40,720 --> 00:08:47,040
Then there's going to be, since that's the connected component, there's going to be no

128
00:08:47,040 --> 00:08:50,879
black edges in the crossing edges for that cut.

129
00:08:50,879 --> 00:08:52,680
So the algorithm doesn't get stuck.

130
00:08:52,680 --> 00:08:58,360
If you don't have an MST yet, there's going to be some cut with no black crossing edges.

131
00:08:58,360 --> 00:08:59,360
And that's it.

132
00:08:59,360 --> 00:09:02,519
The greedy algorithm computes the MST.

133
00:09:02,519 --> 00:09:08,720
Any edge colored black is in the MST and you can always add to the set of black edges

134
00:09:08,720 --> 00:09:10,680
if you don't have V minus one.

135
00:09:10,679 --> 00:09:14,679
Once you have V minus one, you've got V minus one edges that are in the MST.

136
00:09:14,679 --> 00:09:17,479
The MST has V minus one edges.

137
00:09:17,479 --> 00:09:20,399
greedy algorithm computes the MST.

138
00:09:20,399 --> 00:09:27,399
So now what we want to do is implementations of the greedy algorithm or specializations of

139
00:09:27,399 --> 00:09:33,559
it, really, that differ in, first of all, the way that they choose the cut, which cut

140
00:09:33,559 --> 00:09:35,519
are we going to use.

141
00:09:35,519 --> 00:09:41,360
And also the way in which they find the minimum white edge in the cut.

142
00:09:41,360 --> 00:09:53,799
Again, those could both be expensive operations and prohibitively expensive for huge graphs.

143
00:09:53,799 --> 00:09:58,960
What we're going to look at is two classic implementations called cross-gills algorithm and

144
00:09:58,960 --> 00:10:00,639
prims algorithm.

145
00:10:00,639 --> 00:10:05,840
Although in both cases we use modern data structures to make them efficient for huge graphs.

146
00:10:05,840 --> 00:10:10,799
And there's another interesting algorithm called Baruch, because algorithm that kind of combines

147
00:10:10,799 --> 00:10:14,679
the two briefly mentioned.

148
00:10:14,679 --> 00:10:21,720
Now before getting to those, what about removing the two simplifying assumptions?

149
00:10:21,720 --> 00:10:28,279
So what happens if you have a situation where the edge weights are not all distinct?

150
00:10:28,279 --> 00:10:37,519
So in this case, one, two, and two, four both have the same edge weight, also also to

151
00:10:37,519 --> 00:10:39,759
one, three, and three, four.

152
00:10:39,759 --> 00:10:43,879
And so it means there's multiple MSTs.

153
00:10:43,879 --> 00:10:49,279
So in this case, there's two different MSTs.

154
00:10:49,279 --> 00:10:54,159
So the greedy algorithm is still correct, it turns out.

155
00:10:54,159 --> 00:10:59,279
Our correctness proof doesn't quite work, but that can be fixed with a little bit work.

156
00:10:59,279 --> 00:11:02,120
So the fact is it's still correct.

157
00:11:02,120 --> 00:11:06,919
And if the graph is not connected, as I mentioned, what we'll get is what's called a minimum

158
00:11:06,919 --> 00:11:11,639
spanning forest, which is the MST of each component.

159
00:11:11,639 --> 00:11:18,079
Essentially, it's like independently computing the MSTs of the components.

160
00:11:18,080 --> 00:11:27,200
But basically, what the greedy algorithm gives us is an easy way to prove correctness for

161
00:11:27,200 --> 00:11:29,200
specific algorithms.

162
00:11:29,200 --> 00:11:36,280
All we have to show is that they're finding a cut and taking the minimum weight edge from

163
00:11:36,280 --> 00:11:37,800
that cut.

164
00:11:37,800 --> 00:11:42,280
And then we can prove correctness of a more complicated algorithm.

165
00:11:42,279 --> 00:11:48,559
In general, in algorithm design, this is proven to be effective in all kinds of domains,

166
00:11:48,559 --> 00:11:53,839
trying to come up with a general algorithm that you can prove works efficiently, and then

167
00:11:53,839 --> 00:11:57,360
using that to help design specific ones.

168
00:11:57,360 --> 00:12:05,360
The point is, ladies and gentlemen, that greed for lack of a better word is good.

169
00:12:05,360 --> 00:12:07,360
greed is right.

170
00:12:07,360 --> 00:12:09,480
Greed works.

171
00:12:09,480 --> 00:12:16,159
Greed clarifies cuts through and captures the essence of the evolutionary spirit.

172
00:12:16,159 --> 00:12:23,480
Greed, in all of its forms, greed for life, for money, for love, knowledge, has marked

173
00:12:23,480 --> 00:12:27,800
the upward surge of mankind and greed.

174
00:12:27,800 --> 00:12:29,800
You mark my words.

175
00:12:29,799 --> 00:12:34,319
I'm not only saved, tell, dark paper, but that other malfunction corporation called the

176
00:12:34,319 --> 00:12:35,319
USA.

177
00:12:35,319 --> 00:12:45,319
Thank you very much.

178
00:12:45,319 --> 00:12:48,319
Great.

179
00:12:48,319 --> 00:12:51,319
Great.

