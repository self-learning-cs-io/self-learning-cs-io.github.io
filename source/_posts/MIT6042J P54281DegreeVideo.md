---
title: MIT6042J P54281DegreeVideo
---

1
00:00:00,000 --> 00:00:07,100
So now we start on another topic in graph theory, namely the topic of simple graphs.

2
00:00:07,100 --> 00:00:10,560
So last week we were talking about directed graphs where the arrows have a beginning and

3
00:00:10,560 --> 00:00:12,800
end as shown here.

4
00:00:12,800 --> 00:00:14,460
But simple graphs are simpler.

5
00:00:14,460 --> 00:00:18,000
The arrows, the edges don't have direction.

6
00:00:18,000 --> 00:00:23,679
They just correspond to a con-a-mutual connection, which is symmetric.

7
00:00:23,679 --> 00:00:29,719
So there's a picture of a simple graph and the edges are shown without an arrow head.

8
00:00:29,719 --> 00:00:33,560
The whole thing about directed graphs is that it's possible to have an arrow going in each

9
00:00:33,560 --> 00:00:35,839
direction between two vertices.

10
00:00:35,839 --> 00:00:39,000
But when we have undirected edges like this, that doesn't happen.

11
00:00:39,000 --> 00:00:43,960
So there's only one edge between a pair of vertices in a simple graph.

12
00:00:43,960 --> 00:00:50,920
In addition, a directed graph might have a self-loop and edge that starts and ends at the

13
00:00:50,920 --> 00:00:52,079
same vertex.

14
00:00:52,079 --> 00:00:54,679
And those are also disallowed in simple graphs.

15
00:00:54,679 --> 00:00:56,359
Now you could allow those things.

16
00:00:56,359 --> 00:01:01,200
There's a thing called multi-graphs where there are multiple edges between vertices and

17
00:01:01,200 --> 00:01:02,640
there could also be self-loops.

18
00:01:02,640 --> 00:01:03,640
But we don't need those.

19
00:01:03,640 --> 00:01:05,319
Let's not complicate matters.

20
00:01:05,319 --> 00:01:07,439
We're talking about simple graphs.

21
00:01:07,439 --> 00:01:08,439
Okay.

22
00:01:08,439 --> 00:01:13,840
So the formal definition of a simple graph is that it's an object G that has a bunch of parts.

23
00:01:13,840 --> 00:01:21,680
Namely, it has a non-empty set V of vertices, just like directed graphs.

24
00:01:21,680 --> 00:01:24,680
And it has a set of E, a set E of edges.

25
00:01:24,680 --> 00:01:28,480
But the edges now are somewhat different since they don't have beginnings and ends.

26
00:01:28,480 --> 00:01:34,040
And edge just has two endpoints that are in V. And we don't distinguish the endpoints.

27
00:01:34,040 --> 00:01:35,800
So let's just draw a picture.

28
00:01:35,800 --> 00:01:39,280
Here's a case where there are six vertices V shown in blue.

29
00:01:39,280 --> 00:01:41,800
And there are these undirected edges shown in green.

30
00:01:41,800 --> 00:01:47,760
In this case, I see seven edges in E.

31
00:01:47,760 --> 00:01:51,960
There's an example of an edge that goes between two vertices that I've highlighted in yellow

32
00:01:51,960 --> 00:01:52,960
in red.

33
00:01:52,960 --> 00:01:55,719
And we've made that particular edge dark green.

34
00:01:55,719 --> 00:02:01,000
And edge like that can formally be represented as just the set of its endpoints, a set of two

35
00:02:01,000 --> 00:02:03,719
things, red and yellow.

36
00:02:03,719 --> 00:02:09,920
In text, we'll often indicate it as the two vertices connected by a horizontal bar.

37
00:02:09,920 --> 00:02:14,280
But you have to remember that the order in which the red and the yellow occur don't matter

38
00:02:14,280 --> 00:02:17,240
because it's really a set consisting of red and yellow.

39
00:02:17,240 --> 00:02:22,600
When two vertices are connected by an edge, there's said to be adjacent.

40
00:02:22,600 --> 00:02:28,000
And the edge is said to be incident to its endpoints, just a little vocabulary that we use

41
00:02:28,000 --> 00:02:29,800
here.

42
00:02:29,800 --> 00:02:34,640
Now, a basic concept in graph theory, which is what we're going to make a little bit of

43
00:02:34,640 --> 00:02:38,719
in this video segment, is the idea of the degree of a vertex.

44
00:02:38,719 --> 00:02:42,840
The degree of a vertex is simply the number of incident edges, the number of edges that

45
00:02:42,840 --> 00:02:45,920
touch it, the number of edges for which it's an endpoint.

46
00:02:45,919 --> 00:02:49,359
So let's look at the red vertex.

47
00:02:49,359 --> 00:02:53,560
There are two edges incident to the red vertex, so its degree is two.

48
00:02:53,560 --> 00:02:56,359
Okay, let's look at the yellow vertex.

49
00:02:56,359 --> 00:03:02,039
Here, there are four edges incident to the yellow vertex, so its degree is four.

50
00:03:02,039 --> 00:03:04,319
No surprises yet.

51
00:03:04,319 --> 00:03:11,439
So let's examine some properties of vertex degrees that are motivated by a simple example.

52
00:03:11,439 --> 00:03:17,199
Suppose I asked the question, is it possible to have a graph with vertex degrees of two,

53
00:03:17,199 --> 00:03:18,199
two and one?

54
00:03:18,199 --> 00:03:23,639
So implicitly, it's a three vertex graph, and one vertex has degree two, and other has

55
00:03:23,639 --> 00:03:25,280
degree two and one has degree one.

56
00:03:25,280 --> 00:03:27,439
Well, let's see what it looks like.

57
00:03:27,439 --> 00:03:30,840
If I'm going to have a vertex of degree one, then I know what it looks like.

58
00:03:30,840 --> 00:03:31,840
There's the vertex.

59
00:03:31,840 --> 00:03:32,840
It's got one edge out of it.

60
00:03:32,840 --> 00:03:34,639
It's going to some other vertex.

61
00:03:34,639 --> 00:03:41,000
Now, this other vertex must have degree two, so it's connected to something else, and

62
00:03:41,000 --> 00:03:45,439
something else must be another vertex with degree two, because those are the only possible

63
00:03:45,439 --> 00:03:47,879
spectrum of degrees, one, two, and two.

64
00:03:47,879 --> 00:03:54,039
And that means that this last guy has to have an edge out of it, because it's degree two,

65
00:03:54,039 --> 00:03:56,599
and it can't go back to two, because there aren't any.

66
00:03:56,599 --> 00:03:59,560
There's already an edge between these two, and it can't go back to one, because that has

67
00:03:59,560 --> 00:04:01,560
degree one, so we're stuck.

68
00:04:01,560 --> 00:04:06,639
And by this ad hoc reasoning, we figured out that there can't be a degree three graph

69
00:04:06,639 --> 00:04:09,920
with this spectrum of degrees, two to one.

70
00:04:09,919 --> 00:04:11,559
It's impossible.

71
00:04:11,559 --> 00:04:17,000
Well, we could have reasoned more generally, and there's a very elementary property of degrees

72
00:04:17,000 --> 00:04:20,839
that we're going to actually make something of in a minute, and it's called a handshaking

73
00:04:20,839 --> 00:04:21,839
lemma.

74
00:04:21,839 --> 00:04:27,360
It says that the sum of the degrees, summed over all the vertices, is equal to twice the

75
00:04:27,360 --> 00:04:28,919
number of edges.

76
00:04:28,919 --> 00:04:34,480
There it is written as a formula, twice the number of edges, so that's the cardinality symbol.

77
00:04:34,480 --> 00:04:37,480
Absolute value of a set means the size of the set.

78
00:04:37,480 --> 00:04:38,480
Here is finite.

79
00:04:38,520 --> 00:04:43,040
Twice the number of edges is equal to the sum over all the vertices of the degree of the

80
00:04:43,040 --> 00:04:44,040
vertices.

81
00:04:44,040 --> 00:04:45,520
Why is that true?

82
00:04:45,520 --> 00:04:51,560
Well, if you think about it, and the sum on the right, every edge is counted twice,

83
00:04:51,560 --> 00:04:54,720
once for each vertex that it's the end of.

84
00:04:54,720 --> 00:04:56,520
So we're really just counting.

85
00:04:56,520 --> 00:05:02,560
This is way of summing up over all of the vertices in which each vertex gets numerated

86
00:05:02,560 --> 00:05:07,120
twice, so the sum is twice the number of vertices, and the proof is kind of trivial.

87
00:05:07,120 --> 00:05:08,280
So let's make something of this.

88
00:05:08,280 --> 00:05:11,079
You might wonder why it's called the handshaking lemma.

89
00:05:11,079 --> 00:05:15,319
That will emerge in some problems that we're going to have you to do.

90
00:05:15,319 --> 00:05:21,079
But let's go on and apply the handshaking lemma in an interesting way.

91
00:05:21,079 --> 00:05:25,439
By the way, of course, since 2 plus 2 plus 1 is odd, we could have without that ad hoc

92
00:05:25,439 --> 00:05:32,240
analysis figured out that the sum of the degrees can't be odd, because it's twice something.

93
00:05:32,240 --> 00:05:35,759
All right, so here's the application that's designed to get your attention.

94
00:05:35,759 --> 00:05:39,480
It is an application of graph theory to sex.

95
00:05:39,480 --> 00:05:43,360
And we ask the question, are men more promiscuous than women?

96
00:05:43,360 --> 00:05:48,439
And there have been repeated studies that are cited in the notes that show again and again

97
00:05:48,439 --> 00:05:53,279
that when they survey collections of men and women, they ask them how many sexual partners

98
00:05:53,279 --> 00:05:54,279
they have.

99
00:05:54,279 --> 00:05:59,639
It's consistently the case that the men are assessed to have 30% more, 75% more, sometimes

100
00:05:59,639 --> 00:06:04,439
2.5 times, three times as many partners as the women.

101
00:06:04,439 --> 00:06:06,719
And there's got to be something wacky about this.

102
00:06:06,719 --> 00:06:11,199
We're going to come up with a very elementary graph theoretic argument that says that this

103
00:06:11,199 --> 00:06:14,719
is complete nonsense.

104
00:06:14,719 --> 00:06:19,360
By the way, the most recent study that we could find was one that's mentioned in the notes

105
00:06:19,360 --> 00:06:24,240
in 2007 by the US Department of Health.

106
00:06:24,240 --> 00:06:28,800
And the statistician who collected the data knew that the results were impossible, but

107
00:06:28,800 --> 00:06:33,160
her job was to report the data, not to explain it or interpret it.

108
00:06:33,160 --> 00:06:38,600
And the men reported 30% more partners than the women.

109
00:06:38,600 --> 00:06:41,879
And we're going to show that somebody's lying.

110
00:06:41,879 --> 00:06:42,879
Here's how we're going to do it.

111
00:06:42,879 --> 00:06:49,240
We're going to model the relationships between men and women by having a graph that comes

112
00:06:49,240 --> 00:06:50,240
in two parts.

113
00:06:50,240 --> 00:06:52,800
It's going to be called a so-called bipartite graph.

114
00:06:52,800 --> 00:06:57,439
So there's going to be one set of vertices called M. And another set of vertices called

115
00:06:57,439 --> 00:07:02,279
F, M for men and F for women or females.

116
00:07:02,279 --> 00:07:09,000
And where are going to have edges going between men and women between M's and F's precisely

117
00:07:09,000 --> 00:07:13,160
when they have been involved in a sexual liaison.

118
00:07:13,160 --> 00:07:24,879
So looking back at this graph, this edge from that blue M to that orange F indicates that

119
00:07:24,879 --> 00:07:28,360
they had a sexual liaison.

120
00:07:28,360 --> 00:07:30,079
They were partners.

121
00:07:30,079 --> 00:07:36,399
OK, so this is a simple graph structure that we can use to represent who got together

122
00:07:36,399 --> 00:07:41,879
with whom in any given population of men and women.

123
00:07:41,879 --> 00:07:47,439
Now if you think about the same argument that we use for handshaking, if you sum the

124
00:07:47,439 --> 00:07:53,159
degrees of the men, you're counting each edge exactly once.

125
00:07:53,160 --> 00:07:57,840
And so the sum of the degrees of the men is equal to the number of edges in this graph.

126
00:07:57,840 --> 00:08:04,560
And likewise, if you sum over the females, you're counting each edge once.

127
00:08:04,560 --> 00:08:08,400
And so the sum of the female degrees is also equal to the number of edges.

128
00:08:08,400 --> 00:08:14,680
In particular, the sum over the degrees of the males is equal to the sum over the degrees

129
00:08:14,680 --> 00:08:16,760
of the females.

130
00:08:16,760 --> 00:08:20,800
Because every time there's a liaison, it involves one male, one female.

131
00:08:20,800 --> 00:08:24,879
All right, now let's just do a little bit of elementary arithmetic.

132
00:08:24,879 --> 00:08:31,040
I'm going to divide both sides of this equality by the size of the male population by the

133
00:08:31,040 --> 00:08:32,600
number of men.

134
00:08:32,600 --> 00:08:35,240
And if I do that, I get this formula.

135
00:08:35,240 --> 00:08:40,159
The left hand side is the number of, is the sum of the degrees of men divided by the

136
00:08:40,159 --> 00:08:42,159
size of the M population.

137
00:08:42,159 --> 00:08:43,519
And here I'm doing a little trick.

138
00:08:43,519 --> 00:08:45,840
Notice that the F's cancel out.

139
00:08:45,840 --> 00:08:51,560
But I've expressed this sum of the female degrees divided by M as the sum of the female

140
00:08:51,560 --> 00:08:58,000
degrees divided by F times this factor F over M, which is the ratio of the populations

141
00:08:58,000 --> 00:08:59,560
of women to men.

142
00:08:59,560 --> 00:09:04,639
Now, the reason I'm doing this is that if you look at this thing on the left, this is the

143
00:09:04,639 --> 00:09:07,240
average degree of the men.

144
00:09:07,240 --> 00:09:11,800
This is the sum of all the degrees divided by the number of men.

145
00:09:11,799 --> 00:09:16,000
So it's the average number of partners that men have.

146
00:09:16,000 --> 00:09:22,199
And likewise, now you can recognize over here that I've got the average number of partners

147
00:09:22,199 --> 00:09:24,839
that each woman has.

148
00:09:24,839 --> 00:09:30,719
And what we've just figured out then is that there's a fixed relationship between the average

149
00:09:30,719 --> 00:09:35,839
number of partners of men, the average degree of the M vertices, and the average degree

150
00:09:35,840 --> 00:09:37,519
of the F vertices.

151
00:09:37,519 --> 00:09:43,519
And these two average degrees, these average numbers of partners, is simply related by the

152
00:09:43,519 --> 00:09:45,960
ratio of the populations.

153
00:09:45,960 --> 00:09:51,680
The average men degree is the female population divided by the M population times the average

154
00:09:51,680 --> 00:09:54,080
degree of the females.

155
00:09:54,080 --> 00:10:03,639
Now, what that tells us is that these wild figures of twice as many and 30 percent more

156
00:10:03,639 --> 00:10:08,199
and so on are completely absurd because we know a lot about the ratio of females to

157
00:10:08,199 --> 00:10:09,199
males in the population.

158
00:10:09,199 --> 00:10:15,039
As a matter of fact, in the U.S. overall, there are slightly more women than men.

159
00:10:15,039 --> 00:10:20,840
There's 1.035 women for each man in the U.S. population.

160
00:10:20,840 --> 00:10:25,919
And that tells us then that if you survey the population of all the men and women in the

161
00:10:25,919 --> 00:10:32,840
country, you would discover that the men looked 3.5 percent more, had 3.5 percent more

162
00:10:32,840 --> 00:10:37,240
partners than women per man.

163
00:10:37,240 --> 00:10:41,759
But this has nothing to do with their behavior or promiscuity or lack of it.

164
00:10:41,759 --> 00:10:48,639
It's simply a reflection of the ratio of the populations.

165
00:10:48,639 --> 00:10:54,440
Which gets us to the question of where do these crazy numbers come from and the answer

166
00:10:54,440 --> 00:10:59,000
seems to be that people are lying.

167
00:10:59,000 --> 00:11:02,759
One explanation would be that men exaggerate their number of partners and women understate

168
00:11:02,759 --> 00:11:03,960
their number of partners.

169
00:11:03,960 --> 00:11:10,960
But the truth is that nobody knows exactly why we get these consistently false numbers,

170
00:11:10,960 --> 00:11:14,879
but we do get them consistently in one survey after another.

171
00:11:14,879 --> 00:11:17,559
You will no longer be fooled by such nonsense.

