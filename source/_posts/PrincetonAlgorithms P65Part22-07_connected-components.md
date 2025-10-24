---
title: PrincetonAlgorithms P65Part22 07_connected Components
---

1
00:00:00,000 --> 00:00:09,040
Next we're going to look at slightly different graph processing applications.

2
00:00:09,040 --> 00:00:16,519
But it's a graph processing algorithm that's useful in many applications as we'll see in

3
00:00:16,519 --> 00:00:17,519
a minute.

4
00:00:17,519 --> 00:00:19,960
Slightly different than depth and breadth or search.

5
00:00:19,960 --> 00:00:22,519
It's called Computing Connective Component.

6
00:00:22,519 --> 00:00:28,519
Now I mentioned this a little bit when we talked about basic definitions.

7
00:00:28,519 --> 00:00:34,079
So the idea is that if there's a path between two vertices, we say they're connected.

8
00:00:34,079 --> 00:00:42,039
And what we want to do is pre-process the graph that is build a data type that can answer

9
00:00:42,039 --> 00:00:48,399
queries of the form is v connected to w in constant time.

10
00:00:48,399 --> 00:00:56,039
Now we want to be able to do that for a huge sparse graph of the type that appears in practice.

11
00:00:56,039 --> 00:01:03,799
So we can't use the, if we could use the adjacency matrix data structure, maybe we can

12
00:01:03,799 --> 00:01:06,480
do that, but we can't.

13
00:01:06,480 --> 00:01:14,079
So we're going to build a class that uses our standard representation that will enable

14
00:01:14,079 --> 00:01:17,159
clients to find connected components.

15
00:01:17,159 --> 00:01:19,319
Really interesting to think about this one.

16
00:01:19,319 --> 00:01:24,759
We're getting the job done that we could get done if we had a huge sparse matrix.

17
00:01:24,760 --> 00:01:30,640
If we have billions of vertices, there's no way we can have billions squared in the matrix.

18
00:01:30,640 --> 00:01:33,400
So we have to find another way to do it.

19
00:01:33,400 --> 00:01:36,040
So here's the data type that we want to implement.

20
00:01:36,040 --> 00:01:38,280
So it's called CC.

21
00:01:38,280 --> 00:01:43,960
And it's going to, the constructor is going to build the data structure that finds a connected

22
00:01:43,960 --> 00:01:52,000
component in the given graph to be able to efficiently answer these connectivity queries.

23
00:01:52,000 --> 00:01:56,319
It'll also be able to count the number of connected components.

24
00:01:56,319 --> 00:02:04,400
And it also assigns a identifier from zero to count minus one that identifies a connected

25
00:02:04,400 --> 00:02:08,039
component that every vertex is in.

26
00:02:08,039 --> 00:02:16,479
So now if you, maybe this sounds a little bit similar to what we did for the union fine

27
00:02:16,479 --> 00:02:18,159
problem.

28
00:02:18,159 --> 00:02:26,079
So union fine problem, we were taking edges and we wanted to have queries that, well,

29
00:02:26,079 --> 00:02:31,079
union is like adding edge to the graph and then find is like, are these two things connected

30
00:02:31,079 --> 00:02:32,079
yet?

31
00:02:32,079 --> 00:02:38,319
Now with union fine, we found that we couldn't quite answer the thing in constant time.

32
00:02:38,319 --> 00:02:43,400
Remember, there's a very slowly growing question, constant and practical terms, but not

33
00:02:43,400 --> 00:02:44,919
really.

34
00:02:44,919 --> 00:02:51,560
So it's less sufficient than the algorithm that we're going to talk about because it doesn't

35
00:02:51,560 --> 00:02:53,560
quite get constant time.

36
00:02:53,560 --> 00:02:58,879
On the other hand, in another way, it's better than the algorithm that we're going to talk

37
00:02:58,879 --> 00:03:02,560
about because you can intermix the unions and fines.

38
00:03:02,560 --> 00:03:07,000
And in this case, because we're working with a graph, it's like we're taking all the unions

39
00:03:07,000 --> 00:03:10,319
and then we're handling fine requests.

40
00:03:10,319 --> 00:03:16,239
So anyway, what we're going to use to implement this is a depth first search approach.

41
00:03:16,239 --> 00:03:17,879
So we'll do the depth first search.

42
00:03:17,879 --> 00:03:24,000
We'll just keep different data than we did than when we were finding paths.

43
00:03:24,000 --> 00:03:34,719
So the algorithm is based on the notion that connection is equivalence relation.

44
00:03:34,719 --> 00:03:40,479
So as we call a equivalence relation, it has these three properties.

45
00:03:40,479 --> 00:03:43,159
Every vertex is connected to itself.

46
00:03:43,159 --> 00:03:49,400
If v is connected to w, then w is connected to v. And if v is connected to w and w to x,

47
00:03:49,400 --> 00:03:51,639
then v is connected to x.

48
00:03:51,639 --> 00:03:58,000
And those basic operations underlie the algorithm that we're going to talk about.

49
00:03:58,000 --> 00:04:07,759
So the equivalence relation is a general mathematical concept that implies in graph there in this

50
00:04:07,759 --> 00:04:08,759
case.

51
00:04:08,759 --> 00:04:16,399
And as I already mentioned in the case of graph, it implies that the vertices divide up into

52
00:04:16,399 --> 00:04:21,360
connected components, which are maximal sets of connected vertices.

53
00:04:21,360 --> 00:04:24,959
So our sample graph has three connected components.

54
00:04:24,959 --> 00:04:30,919
And what we'll do is assign identifiers to each one of the components.

55
00:04:30,919 --> 00:04:38,839
And that will, for every vertex, give us an identifier number for that vertex.

56
00:04:38,839 --> 00:04:42,879
And that's the data structure that our depth first search is going to build.

57
00:04:42,879 --> 00:04:49,759
And that immediately gives the constant time implementation of the connectivity query.

58
00:04:49,759 --> 00:04:53,319
Given two vertices, you look up their ID.

59
00:04:53,319 --> 00:04:55,839
If they're equal, they're in the same connected component.

60
00:04:55,839 --> 00:04:58,680
If they're different, they're not.

61
00:04:58,680 --> 00:05:03,360
So that's the data structure that we're going to build.

62
00:05:03,360 --> 00:05:10,519
It's like a union find tree where all the trees are flat.

63
00:05:10,519 --> 00:05:12,639
So that's what I just said.

64
00:05:12,639 --> 00:05:17,360
Given connected components, we can answer queries in constant time.

65
00:05:17,360 --> 00:05:26,879
So here's a big grid graph that we used when we're talking about union find.

66
00:05:26,879 --> 00:05:32,080
And it turns out that this one's got 63 connected components.

67
00:05:32,080 --> 00:05:40,720
And again, when you really think about it, it's kind of amazing that we can do this computation

68
00:05:40,720 --> 00:05:44,040
in linear time, even for huge graphs.

69
00:05:44,040 --> 00:05:48,840
And it's really important to be able to do so for those very huge graphs that we talked

70
00:05:48,840 --> 00:05:52,480
about in so many applications.

71
00:05:52,480 --> 00:05:56,879
If you can process all the edges, you can also find out the connected components and be

72
00:05:56,879 --> 00:06:00,800
set up to answer connectivity queries.

73
00:06:00,800 --> 00:06:05,120
This is a simple algorithm, but really it's ingenious.

74
00:06:05,120 --> 00:06:09,960
OK, so let's look at the implementation.

75
00:06:09,959 --> 00:06:15,039
So our goal is to petition the vertices into connected components.

76
00:06:15,039 --> 00:06:18,959
So we're going to use DFS and marking.

77
00:06:18,959 --> 00:06:24,599
And so what we're going to do is for a general graph, for every unmarked vertex, we're going

78
00:06:24,599 --> 00:06:30,120
to run DFS to find all the vertices that are connected to that one that are going to

79
00:06:30,120 --> 00:06:32,919
be part of the same component.

80
00:06:32,919 --> 00:06:39,479
So we used the marking to help control the DFS, but also to control the connected

81
00:06:39,480 --> 00:06:46,800
components that the vertices that have already been processed and known to be in a given

82
00:06:46,800 --> 00:06:49,360
connected component.

83
00:06:49,360 --> 00:06:56,560
So let's look at a demo to understand how this algorithm works.

84
00:06:56,560 --> 00:07:00,600
So again, we're going to use Depth for Search and their summary of Depth for Search to

85
00:07:00,600 --> 00:07:05,879
visit a vertex, we mark it as visitive, and then recursively visit all the unmarked

86
00:07:05,879 --> 00:07:09,360
vertices that are adjacent.

87
00:07:09,360 --> 00:07:15,280
And so in this case, so we'll start, we're going to visit all the vertices in the graph

88
00:07:15,280 --> 00:07:18,920
in order to identify the connected component.

89
00:07:18,920 --> 00:07:21,639
So we'll start by visiting 0.

90
00:07:21,639 --> 00:07:25,480
To visit 0, we have to check 6, 2, 1, and 5.

91
00:07:25,480 --> 00:07:28,480
So we start by checking 6.

92
00:07:28,480 --> 00:07:31,520
We mark it as visited.

93
00:07:31,520 --> 00:07:34,800
So that's entry 6 in the array.

94
00:07:34,800 --> 00:07:41,439
And now we're going to keep this other vertex indexed array, which is the ID, the connected

95
00:07:41,439 --> 00:07:43,319
component number.

96
00:07:43,319 --> 00:07:49,439
So all we're saying by putting a 0 in that entry is that 6 and 0 are in the same connected

97
00:07:49,439 --> 00:07:50,920
component.

98
00:07:50,920 --> 00:07:57,240
Every vertex that we encountered during the Depth for Search from 0, we're going to assign

99
00:07:57,240 --> 00:07:59,759
a value of 0.

100
00:07:59,759 --> 00:08:02,879
Okay, so what do we have to do to visit 6?

101
00:08:02,879 --> 00:08:07,839
We have to check 0, and then we have to check 4.

102
00:08:07,839 --> 00:08:11,120
So 4 is unmarked.

103
00:08:11,120 --> 00:08:14,600
So we're going to recurse and visit 4.

104
00:08:14,600 --> 00:08:17,199
To visit 4, we have to check 5.

105
00:08:17,199 --> 00:08:19,199
5 is unmarked.

106
00:08:19,199 --> 00:08:23,480
So we recurse to visit 5.

107
00:08:23,480 --> 00:08:27,199
And to visit 5, we have to check 3, 4, and 0.

108
00:08:27,199 --> 00:08:28,839
3 is unmarked.

109
00:08:28,839 --> 00:08:32,399
This is the same depth for a search that we did before.

110
00:08:32,399 --> 00:08:36,959
Now we're just keeping track of the connected component number, and we're assigning every

111
00:08:36,959 --> 00:08:44,720
vertex that we encounter with the same ID as 0.

112
00:08:44,720 --> 00:08:48,679
Okay, so now we have to visit 3.

113
00:08:48,679 --> 00:08:51,399
To visit 3, we have to check 5 and 4.

114
00:08:51,399 --> 00:08:53,559
5 was marked, nothing to do.

115
00:08:53,559 --> 00:08:56,039
4 was marked, nothing to do.

116
00:08:56,039 --> 00:08:57,960
So we're done with 3.

117
00:08:57,960 --> 00:08:58,879
We're done with 3.

118
00:08:58,879 --> 00:09:01,439
We can continue the depth for Search from 5.

119
00:09:01,440 --> 00:09:03,720
We have to check 4 and 0.

120
00:09:03,720 --> 00:09:09,120
4 was marked, 0 was marked, so we're done.

121
00:09:09,120 --> 00:09:11,880
And now we can continue with the depth for Search from 4.

122
00:09:11,880 --> 00:09:13,720
We have to check 6 and 3.

123
00:09:13,720 --> 00:09:19,120
6 was marked, 3 was marked, and we're done.

124
00:09:19,120 --> 00:09:26,280
And we can now 6 is done, and now we can continue with 0, and we have to check 2.

125
00:09:26,280 --> 00:09:28,720
Check 2, it's not marked.

126
00:09:28,720 --> 00:09:33,519
So we mark it and give it a connected component number of 0.

127
00:09:33,519 --> 00:09:38,920
To visit 2, all we do is check 0, which is marked, so we're done, and then we do the same

128
00:09:38,920 --> 00:09:40,600
thing with 1.

129
00:09:40,600 --> 00:09:48,080
Unmarked, so we visit it, I guess sign it 0, and then visit 1.

130
00:09:48,080 --> 00:09:51,879
To do that, we check 0, which is marked, so we're done with 1.

131
00:09:51,879 --> 00:09:58,120
And then to finish 0, we have to check 5, and that's marked, so we don't have to do

132
00:09:58,120 --> 00:10:00,919
anything, and we're done with 0.

133
00:10:00,919 --> 00:10:05,100
So now we're done with the first connected component, but we're not done with the whole

134
00:10:05,100 --> 00:10:12,440
graph, so what we want to do is go look for, so that's a connected component corresponding

135
00:10:12,440 --> 00:10:13,940
to 0.

136
00:10:13,940 --> 00:10:21,840
Now what we want to do is go look for an unmarked vertex, so we started at 0, we check

137
00:10:21,840 --> 00:10:26,600
1, 2, 3, 4, 5, and 6, and they're all marked.

138
00:10:26,600 --> 00:10:33,240
And so the next unmarked vertex that we find in the graph is 7.

139
00:10:33,240 --> 00:10:41,840
So once we return from the depth research for 0, we increment, counter, which is how

140
00:10:41,840 --> 00:10:46,720
many connected components have we seen, and now we're going to assign that number to

141
00:10:46,720 --> 00:10:51,320
everything that's connected to 7 on the depth research from 7.

142
00:10:51,320 --> 00:10:58,800
So what do we do to depth research from 7, we check 8, 8's unmarked, so we go visit it,

143
00:10:58,800 --> 00:11:05,840
so we assign it, connect the component number of 1, same as 7, and mark it, and then go

144
00:11:05,840 --> 00:11:11,000
ahead and recurse to visit 8, we check 7, which is marked, so there's nothing to do, we're

145
00:11:11,000 --> 00:11:15,680
done with 8, and then we're done with 7.

146
00:11:15,680 --> 00:11:20,280
So now we're done with all the vertices that were connected to 7, we increment our

147
00:11:20,360 --> 00:11:26,120
counter of number of components to 2 and look for another vertex.

148
00:11:26,120 --> 00:11:32,240
So now we check 8, which we already know is marked, connected to 7, and so now 9 is unmarked,

149
00:11:32,240 --> 00:11:38,159
so we're going to do a DFS from 9, and everybody connected to 9 is going to get assigned a connected

150
00:11:38,159 --> 00:11:40,159
component number of 2.

151
00:11:40,159 --> 00:11:48,659
So to visit 9, we have to check 11, and that was unmarked, so we visit it, give it a 2,

152
00:11:48,659 --> 00:11:54,419
to visit 11, we have to check 9, which is marked, so nothing to do, and 12, which is unmarked,

153
00:11:54,419 --> 00:11:58,139
so we visit it, and give it a number of 2.

154
00:11:58,139 --> 00:12:02,740
To visit 12, we have to check 11, which was marked, and 9, which is also marked, and

155
00:12:02,740 --> 00:12:10,259
then we're done with 12, and then we're done with 11, and then to finish doing 9, we

156
00:12:10,259 --> 00:12:16,980
have to check 10 and 12, 10 is unmarked, so we mark it and give it a number of 2, to

157
00:12:16,980 --> 00:12:25,100
visit 10, we check 9, which is marked, so we're done, and then finally to finish the DFS,

158
00:12:25,100 --> 00:12:32,060
we check 12 from 9, and that's marked, so we're done with 9, and now we keep looking,

159
00:12:32,060 --> 00:12:41,340
and we find that 10, 11, and 12 are all marked, so we've completed the computation, and

160
00:12:41,340 --> 00:12:46,860
for every vertex, we have a connected component number, and for any given query, we can test

161
00:12:46,860 --> 00:12:52,340
whether they're in the same connected component simply by looking up that number and seeing

162
00:12:52,340 --> 00:12:58,060
if it's equal, that's a demo of connected components computation.

163
00:12:58,060 --> 00:13:05,899
Okay, so here's the code for finding connected components with DFS, which is another

164
00:13:05,899 --> 00:13:12,340
straightforward DFS implementation, just like the other one, it just keeps slightly

165
00:13:12,340 --> 00:13:15,420
different data structures.

166
00:13:15,419 --> 00:13:26,740
So we keep the marked data structure, which is the vertices that we've visited, and then

167
00:13:26,740 --> 00:13:33,860
we keep this vertex indexed array ID, which gives the identifier of the component containing

168
00:13:33,860 --> 00:13:39,379
V, I think we call it CC on the demo, and then account of the number of components that

169
00:13:39,379 --> 00:13:41,539
we've seen.

170
00:13:41,539 --> 00:13:51,539
So the constructor creates the marked array, and it creates this ID array, but now the

171
00:13:51,539 --> 00:13:57,059
constructor does more work than a single call on DFS.

172
00:13:57,059 --> 00:14:01,659
What it does is it goes through, this is the constructor, goes through every vertex in

173
00:14:01,659 --> 00:14:08,699
the array in the graph, and if it's not marked, it does the DFS, and that DFS will mark

174
00:14:08,700 --> 00:14:16,200
a lot of other vertices, but when it's done, all of those are going to get assigned to

175
00:14:16,200 --> 00:14:22,540
value of count, and we're going to increment count, then go and look for another unmarked

176
00:14:22,540 --> 00:14:23,540
vertex.

177
00:14:23,540 --> 00:14:29,500
Anything that wasn't marked by that first DFS, DFS, we'll do a DFS from that one, and

178
00:14:29,500 --> 00:14:36,020
mark all its vertices with the next value for the ID.

179
00:14:36,019 --> 00:14:44,179
So now let's look at the implementation of DFS, it's recursive array, just like the

180
00:14:44,179 --> 00:14:56,220
one that we did for pathfinding, except all that we do, when we mark a vertex, we also

181
00:14:56,220 --> 00:15:01,899
simply set its ID to the current component name.

182
00:15:01,899 --> 00:15:07,720
So all the vertices that are discovered in the same call of DFS have the same ID, and

183
00:15:07,720 --> 00:15:15,579
to visit a vertex, you go through all its adjacent vertices, and any that are not marked,

184
00:15:15,579 --> 00:15:18,220
you give a recursive DFS call.

185
00:15:18,220 --> 00:15:26,419
Again, this code is amazingly compact and elegant, when we're going through the demo step-by-step,

186
00:15:26,419 --> 00:15:33,979
maybe you could see that the underlying computation is actually kind of complex, but recursion

187
00:15:33,979 --> 00:15:43,500
and the graph processing API that we set up provides compact and easy to understand implementation.

188
00:15:43,500 --> 00:15:52,819
So that's using DFS to find connected components, and then to return the ID of a given vertex,

189
00:15:52,820 --> 00:15:57,260
you just look it up in the array, and to return the number of components just return

190
00:15:57,260 --> 00:16:03,220
count, and then you can build up the needed connectivity API from those.

191
00:16:03,220 --> 00:16:07,540
So that's depth-first search to find connected components.

192
00:16:07,540 --> 00:16:14,420
We'll just talk briefly about two applications, and from scientific applications.

193
00:16:14,420 --> 00:16:21,540
So here's an application of sexually transmitted diseases at a high school, and simply the

194
00:16:21,539 --> 00:16:32,879
vertices are people, blue or men and pink or women, and you have an edge between if there

195
00:16:32,879 --> 00:16:40,120
was a contact, and so it's obvious that you're going to be interested in the connected

196
00:16:40,120 --> 00:16:46,980
components of this graph to be able to properly study sexually transmitted diseases.

197
00:16:46,980 --> 00:16:54,779
These individuals had no contact with these, which everyone has a disease, maybe it won't

198
00:16:54,779 --> 00:16:58,980
spread, or if you add a new edge, then you may be have a problem.

199
00:16:58,980 --> 00:17:04,059
That's just one example of studying a spread of disease.

200
00:17:04,059 --> 00:17:15,059
Here's another example that we use for the similar to the flood fill example.

201
00:17:15,059 --> 00:17:21,700
This is processing data from a scientific experiment.

202
00:17:21,700 --> 00:17:29,299
In this case, this image comes from a photograph, and the white things are particles that are

203
00:17:29,299 --> 00:17:36,299
moving, and all yet is an image where it's a grayscale image.

204
00:17:36,299 --> 00:17:42,339
And so what we'll do to do this processing is we want to identify the movement of these

205
00:17:42,339 --> 00:17:44,779
particles over the time.

206
00:17:44,779 --> 00:17:50,019
And the way we do it is build a grid graph, like the one for the flood fill application,

207
00:17:50,019 --> 00:17:57,740
and do an edge connecting two vertices if they're different to their grayscale values

208
00:17:57,740 --> 00:18:01,299
greater than or less than some threshold.

209
00:18:01,299 --> 00:18:09,259
And so then if you do that and then find the connected components, then you can identify

210
00:18:09,259 --> 00:18:14,579
blobs which correspond to real particles in this simulation.

211
00:18:14,579 --> 00:18:19,900
And they do that every frame in a movie, then you can track movie particles every time.

212
00:18:19,900 --> 00:18:23,619
So these are maybe fairly high resolution images.

213
00:18:23,619 --> 00:18:25,740
These are grass with lots and lots of edges.

214
00:18:25,740 --> 00:18:32,500
You need to be able to do this computation quickly in order to do this scientific experiment.

215
00:18:32,500 --> 00:18:36,740
And we use this as an example in our first year programming course.

216
00:18:36,740 --> 00:18:42,779
But it's based on computing connected components using depth first search.

217
00:18:42,779 --> 00:18:46,339
So that's our third example of a graph processing algorithm.

