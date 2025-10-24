---
title: PrincetonAlgorithms P79Part25 03_shortest Path Properties
---

1
00:00:00,000 --> 00:00:09,560
To put all our algorithms into context and better understand them, what we'll do now is go

2
00:00:09,560 --> 00:00:17,519
through some basic properties of shortest paths in educated, directed graphs.

3
00:00:17,519 --> 00:00:21,080
So what kind of data structures are going to need first of all?

4
00:00:21,080 --> 00:00:26,879
Our goal is to find the shortest path from S to every other vertex.

5
00:00:26,879 --> 00:00:34,320
So the first observation is that there's going to be a shortest path's tree solution.

6
00:00:34,320 --> 00:00:38,879
Well, if no two paths have the same length, that certainly is going to be such a solution.

7
00:00:38,879 --> 00:00:43,640
And there's a number of ways to convince yourself that there's going to be a tree.

8
00:00:43,640 --> 00:00:48,039
If you've got two paths to the same vertex, you can delete the last edge and one of them

9
00:00:48,039 --> 00:00:51,879
and keep going until all this left is a tree, for example.

10
00:00:51,879 --> 00:00:55,320
So what we want to do is compute a tree.

11
00:00:55,320 --> 00:01:02,640
Now we've done that in several algorithms before and a reasonable way to represent the shortest

12
00:01:02,640 --> 00:01:08,519
path's tree is to use two vertex indexed arrays.

13
00:01:08,519 --> 00:01:15,400
The first one is for every vertex, compute the length of the shortest path from S to that

14
00:01:15,400 --> 00:01:16,719
vertex.

15
00:01:16,719 --> 00:01:21,439
So in this case, we have this shortest path's tree and we'll keep the length of the shortest

16
00:01:21,439 --> 00:01:26,519
path from the source 0 to each vertex.

17
00:01:26,519 --> 00:01:34,759
So 0 to the length of that shortest path is 0.26, 027, it's 0.60 and like that.

18
00:01:34,759 --> 00:01:42,879
So because you go from 0 to 2.36 and from 2 to 7.34, you get 0.60 and so forth.

19
00:01:42,879 --> 00:01:48,799
And then the other thing, as we've done before, is use a parent-link representation where

20
00:01:48,799 --> 00:01:54,200
edge 2v is going to be the last edge that takes us to v.

21
00:01:54,200 --> 00:01:59,599
And by following back through that array, we can get the path as we've done several times

22
00:01:59,599 --> 00:02:00,759
before.

23
00:02:00,759 --> 00:02:06,560
If we want the path from 0 to 6, we go to edge 2, 6 and says, well, the last thing we do

24
00:02:06,560 --> 00:02:08,240
is 3 to 6.

25
00:02:08,240 --> 00:02:11,359
Then we go to 3 and say, the way we get to 3 is from 7.

26
00:02:11,359 --> 00:02:12,359
We go to 7.

27
00:02:12,359 --> 00:02:15,000
Say, the way we get to 7 is from 2.

28
00:02:15,000 --> 00:02:17,919
We go to 2 and say, that's the way we get to 0.

29
00:02:17,919 --> 00:02:24,159
If we put all those things on a stack, then we can return them as an interval to the client

30
00:02:24,159 --> 00:02:28,759
and that gives the edges on the shortest path.

31
00:02:28,759 --> 00:02:35,199
So that's the data structures that we're going to use for shortest paths.

32
00:02:35,199 --> 00:02:39,399
This is actually the code that does what I just said.

33
00:02:39,399 --> 00:02:41,239
The client query, give me the distance.

34
00:02:41,240 --> 00:02:49,760
It just returns, uses v to index into the instance array and returns the distance.

35
00:02:49,760 --> 00:02:54,560
And if the client asks for the path, then we make a stack.

36
00:02:54,560 --> 00:02:59,360
And then we use a variable e, which is a directed edge.

37
00:02:59,360 --> 00:03:00,840
And we start at edge 2v.

38
00:03:00,840 --> 00:03:06,160
And as long as it's not null, we push it onto the path.

39
00:03:06,159 --> 00:03:12,800
And then go to the edge 2 entry for the vertex that we came from.

40
00:03:12,800 --> 00:03:18,519
And that gives the vertex that we came from to get to that vertex and keep going until

41
00:03:18,519 --> 00:03:22,439
we run out of vertices, which happens at the source.

42
00:03:22,439 --> 00:03:27,759
And then return the path, and that's an interval that gives the client the path.

43
00:03:27,759 --> 00:03:30,240
So that's the implementation of the two query methods.

44
00:03:30,240 --> 00:03:37,840
So now what we're going to want to talk about for the rest of the lecture is the algorithms

45
00:03:37,840 --> 00:03:40,920
that build these data structures.

46
00:03:40,920 --> 00:03:47,640
Now all of the algorithms that we look at are based on a concept called relaxation, edge

47
00:03:47,640 --> 00:03:49,320
relaxation.

48
00:03:49,320 --> 00:03:53,240
So now we call that our data structures.

49
00:03:53,240 --> 00:03:57,480
So we're going to talk about relaxing an edge from v to w.

50
00:03:57,479 --> 00:04:01,159
And we have an example here from v to w.

51
00:04:01,159 --> 00:04:09,679
And at the point that we're going to relax this edge will have our data structures in process

52
00:04:09,679 --> 00:04:14,000
and this too, we haven't seen all edges.

53
00:04:14,000 --> 00:04:19,399
We haven't seen all paths in the intermediate part of some algorithm.

54
00:04:19,399 --> 00:04:27,000
But we'll try to make sure that this 2v for every vertex is the length of the shortest

55
00:04:27,000 --> 00:04:29,720
known path to that vertex.

56
00:04:29,720 --> 00:04:32,120
And that's going to be the same for w.

57
00:04:32,120 --> 00:04:38,680
So these are all the edges that are in edge 2 that we know paths from s to some vertex.

58
00:04:38,680 --> 00:04:43,920
So this 2v and this 2v will contain a shortest known path.

59
00:04:43,920 --> 00:04:52,560
Now if we, and also edge 2w, edge 2w is the last edge in the shortest known path from s

60
00:04:52,560 --> 00:04:53,560
to w.

61
00:04:53,560 --> 00:04:56,360
And the same way the edge 2v, of course.

62
00:04:56,360 --> 00:05:01,520
Now so to relax along the edge from v to w, essentially that means let's update the

63
00:05:01,520 --> 00:05:05,280
data structures to take that edge to an into account.

64
00:05:05,280 --> 00:05:10,879
And what happens in this case is that the edge gives a better way to get to w.

65
00:05:10,879 --> 00:05:13,319
So that's what relaxing is.

66
00:05:13,319 --> 00:05:18,520
That edge gives us a new shortest path so we want to include it in the data structures.

67
00:05:18,520 --> 00:05:26,280
So since it has a shorter path, we have to update both this 2w and edge 2w.

68
00:05:26,279 --> 00:05:28,959
That is we have a new way to get to w.

69
00:05:28,959 --> 00:05:33,399
So we have to throw away that old edge that came to w.

70
00:05:33,399 --> 00:05:39,879
And we have a new shorter distance instead of 7.2 that came that old way.

71
00:05:39,879 --> 00:05:43,519
We have 4.4 that gets us a new way.

72
00:05:43,519 --> 00:05:47,719
So edge relaxation is a very natural operation.

73
00:05:47,719 --> 00:05:52,039
When we consider a new edge, does it give a new shortest path to that vertex or not?

74
00:05:52,040 --> 00:05:53,840
If it doesn't, we ignore it.

75
00:05:53,840 --> 00:05:58,960
If it does, we update the data structures to include that edge and forget about the old

76
00:05:58,960 --> 00:06:01,840
edge that took us to that vertex.

77
00:06:01,840 --> 00:06:03,800
That's edge relaxation.

78
00:06:03,800 --> 00:06:09,680
And this is easy implementation of edge relaxation in code.

79
00:06:09,680 --> 00:06:15,080
So to relax an edge, we pull out it's from in two vertices in v and w according to our

80
00:06:15,080 --> 00:06:16,800
standard idiom.

81
00:06:16,800 --> 00:06:25,560
And then we just see if the distance to w that was the shortest path before is bigger

82
00:06:25,560 --> 00:06:33,199
than the distance to v plus the weight of the edge that would take us from v to w.

83
00:06:33,199 --> 00:06:35,759
If it's bigger, that means we found a new path.

84
00:06:35,759 --> 00:06:38,280
If it's less than or equal, we ignore it.

85
00:06:38,280 --> 00:06:43,240
And if we found a new path, we have to update the distance to w to be the new distance,

86
00:06:43,240 --> 00:06:45,639
distance to v plus follow vw.

87
00:06:45,639 --> 00:06:51,560
And then we have to update edge to w and throw away the old version and say that our new

88
00:06:51,560 --> 00:06:56,920
edge from v to w is the best path to w as far as we know.

89
00:06:56,920 --> 00:07:00,639
So that's easy code for edge relaxation.

90
00:07:00,639 --> 00:07:08,960
Now we're going to use edge relaxation in a really fundamental way to compute shortest

91
00:07:08,960 --> 00:07:11,360
paths.

92
00:07:11,360 --> 00:07:18,600
But there's one other important idea, which is called optimality conditions.

93
00:07:18,600 --> 00:07:24,080
And this is a way to know that we have shortest paths.

94
00:07:24,080 --> 00:07:26,560
We have computed all the shortest paths.

95
00:07:26,560 --> 00:07:34,960
So the shortest path optimality conditions are embodied in this proposition.

96
00:07:34,959 --> 00:07:38,079
We have an edge weighted diagram.

97
00:07:38,079 --> 00:07:41,319
And we have the distu array.

98
00:07:41,319 --> 00:07:43,000
Let's just talk about the distances.

99
00:07:43,000 --> 00:07:45,799
And the paths go with the distances.

100
00:07:45,799 --> 00:07:54,120
But the key point is that the distu array represents shortest path distances from the given

101
00:07:54,120 --> 00:07:59,120
source s, if and only if these two conditions hold.

102
00:07:59,120 --> 00:08:04,519
So the first thing is if it's the length for every vertex, distu v is the length of

103
00:08:04,519 --> 00:08:07,959
some path from s to the vertex.

104
00:08:07,959 --> 00:08:11,399
And our algorithms will always ensure that.

105
00:08:11,399 --> 00:08:20,519
And then the second thing is for every edge vw, we have this condition that the distu

106
00:08:20,519 --> 00:08:29,199
w that we have stored is less than or equal to distu v plus the weight of the edge from v

107
00:08:29,199 --> 00:08:30,199
to w.

108
00:08:30,199 --> 00:08:33,639
That's the shortest path optimality conditions.

109
00:08:33,639 --> 00:08:40,199
If they're equal, so sometimes they'll be equal, for example, if vw is the last edge on

110
00:08:40,199 --> 00:08:42,120
the shortest path.

111
00:08:42,120 --> 00:08:44,799
And sometimes they'll be greater, but it'll never be smaller.

112
00:08:44,799 --> 00:08:48,759
They'll never be a way to get to w that we haven't found.

113
00:08:48,759 --> 00:08:52,600
That's the shortest path optimality conditions.

114
00:08:52,600 --> 00:08:59,000
And again, just a quick proof, although the best way to understand proofs is to read them

115
00:08:59,000 --> 00:09:05,399
slowly, not listen to them spoken quickly, but I'll quickly outline them.

116
00:09:05,399 --> 00:09:10,480
So here's the necessary suppose that.

117
00:09:10,480 --> 00:09:15,519
So we want to prove that if this is true, then we have shortest path.

118
00:09:15,519 --> 00:09:19,079
So do that, we assume the contrary.

119
00:09:19,079 --> 00:09:25,360
Suppose that the distance to w is bigger than the distance to v plus e dot weight for some

120
00:09:25,360 --> 00:09:26,360
edge.

121
00:09:26,360 --> 00:09:34,159
Then that path is going to give a path to w that's shorter than distance w, because v is

122
00:09:34,159 --> 00:09:36,360
a path on the weight shorter.

123
00:09:36,360 --> 00:09:40,279
And that is a contradiction to the idea that you have shortest path.

124
00:09:40,279 --> 00:09:48,639
So there can't be any such edge where that condition holds.

125
00:09:48,639 --> 00:09:50,679
So that's necessary.

126
00:09:50,679 --> 00:09:58,120
And then sufficient, suppose that we have a shortest path from s to w.

127
00:09:58,120 --> 00:10:05,319
Then we're assuming these conditions all hold.

128
00:10:05,320 --> 00:10:12,280
And for every edge on the path, this has to all hold.

129
00:10:12,280 --> 00:10:16,320
So it starts at the end.

130
00:10:16,320 --> 00:10:21,760
So the distance, the last edge goes from vk minus 1 to vk.

131
00:10:21,760 --> 00:10:27,440
So distance to vk is less than or equal to the distance to vk minus 1 plus the weight

132
00:10:27,440 --> 00:10:29,560
of the kth edge.

133
00:10:29,559 --> 00:10:37,619
And so just continuing down that way, then from the source to the first edge, so source

134
00:10:37,619 --> 00:10:43,679
plus the weight of the first edge is greater than or equal distance to the first vertex after

135
00:10:43,679 --> 00:10:45,079
the source.

136
00:10:45,079 --> 00:10:47,119
And all those conditions have to hold.

137
00:10:47,119 --> 00:10:56,119
And then what we can do is just add up all those weights and simplify it.

138
00:10:56,120 --> 00:11:05,879
And then that shows that the distance to w is equal to the length of the shortest path.

139
00:11:05,879 --> 00:11:10,279
And so it's got to be the weight of the shortest path because it's the weight of some path

140
00:11:10,279 --> 00:11:11,279
and it's got that weight.

141
00:11:11,279 --> 00:11:14,200
It's got to be the weight of the shortest path.

142
00:11:14,200 --> 00:11:17,759
So if those conditions hold, we have shortest path.

143
00:11:17,759 --> 00:11:24,519
So the point of this proof, it's a slightly complicated proof, but it's not too bad.

144
00:11:24,519 --> 00:11:32,659
It's quite natural is that all we have to know to check that we have computed shortest

145
00:11:32,659 --> 00:11:36,039
paths is that these optimality conditions hold.

146
00:11:36,039 --> 00:11:42,600
To prove that an algorithm can put shortest paths, we just have to prove that it ends up

147
00:11:42,600 --> 00:11:45,039
with the optimality conditions in force.

148
00:11:45,039 --> 00:11:46,600
And that's what we'll be doing.

149
00:11:46,600 --> 00:11:52,559
And the optimality condition really is just saying there's no edge there that we missed.

150
00:11:53,559 --> 00:12:03,559
OK, so with that idea, in fact, there's a very simple, easy to state generic algorithm

151
00:12:03,559 --> 00:12:06,559
that is going to compute shortest paths.

152
00:12:06,559 --> 00:12:08,559
And it's very simple.

153
00:12:08,559 --> 00:12:14,559
We start with the distance to the source being zero on the distance to every other vertex infinity.

154
00:12:14,559 --> 00:12:21,559
And all we do is repeat until the optimality conditions are satisfied, relax any edge.

155
00:12:21,559 --> 00:12:26,559
Just go ahead and relax edges until the optimality conditions are satisfied.

156
00:12:26,559 --> 00:12:30,559
So that's a very general algorithm.

157
00:12:30,559 --> 00:12:37,559
We don't say how to decide which edge to relax or how to know the optimality conditions are satisfied.

158
00:12:37,559 --> 00:12:43,559
But still, it's quite an amazingly simple generic algorithm.

159
00:12:43,559 --> 00:12:48,559
So how do we know, how can we show that it computes the SPT?

160
00:12:48,559 --> 00:12:50,559
Well, it's pretty simple.

161
00:12:50,559 --> 00:12:57,559
Throughout the algorithm, we're making sure that, because the way that we do relax edges,

162
00:12:57,559 --> 00:13:02,559
the distance to V is the length of a simple path from S to V.

163
00:13:02,559 --> 00:13:05,559
And the edge to V is the last edge on that path.

164
00:13:05,559 --> 00:13:11,559
That's what relaxation does for any vertex that we touch.

165
00:13:12,559 --> 00:13:19,559
And not only that, every relaxation that succeeds decreases the distances.

166
00:13:19,559 --> 00:13:24,559
And we've assumed that there's a way to get to every vertex.

167
00:13:24,559 --> 00:13:31,559
And there's only a finite number of paths, so it can decrease at most a finite number of times.

168
00:13:31,559 --> 00:13:38,559
So the algorithm's going to terminate as simple as that.

169
00:13:38,559 --> 00:13:49,559
Again, this is a little bit of a mind-blowing concept, but we'll leave that for more careful study.

170
00:13:49,559 --> 00:13:54,559
And just for now, realize that all we have to do is relax along edges.

171
00:13:54,559 --> 00:14:03,559
And what we're going to do now is look at different ways of figuring out how to choose which edge to relax.

172
00:14:03,559 --> 00:14:11,559
The first algorithm that we'll look at is a classic algorithm known as Dijkstra's algorithm, one of the most famous of all algorithms.

173
00:14:11,559 --> 00:14:16,559
And that is effective when the weights are non-negative.

174
00:14:16,559 --> 00:14:23,559
Then we'll look at an algorithm that works even with negative weights as long as there aren't any directed cycles.

175
00:14:23,559 --> 00:14:38,559
Then we'll look at an even older algorithm than Dijkstra's the Bellman Ford algorithm that can solve the shortest path problem in graphs with negative weights as long as there's no negative cycles.

