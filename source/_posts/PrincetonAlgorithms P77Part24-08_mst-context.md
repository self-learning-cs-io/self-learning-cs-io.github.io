---
title: PrincetonAlgorithms P77Part24 08_mst Context
---

1
00:00:00,000 --> 00:00:09,000
So we're going to complete our study of MST algorithms by considering some context, both

2
00:00:09,000 --> 00:00:16,839
as an unsolved problem in theoretical computer science and as a practical problem.

3
00:00:16,839 --> 00:00:22,240
So the unsolved problem in theoretical computer science that has defined researchers for many

4
00:00:22,240 --> 00:00:27,839
decades is, is it possible to find a linear time MST algorithm?

5
00:00:27,839 --> 00:00:34,000
Is there an algorithm that only examines each edge at most once on the average?

6
00:00:34,000 --> 00:00:41,480
Now this doesn't have that much practical consequence since the versions of prim's algorithm

7
00:00:41,480 --> 00:00:47,840
that we've talked about can get the running time down quite low for the sparse graphs,

8
00:00:47,840 --> 00:00:51,280
the huge sparse graphs that we encounter in practice.

9
00:00:51,280 --> 00:00:57,200
But it's still, it's like union find, it's a tantalizing problem.

10
00:00:57,200 --> 00:01:00,160
Unlike union find, it hasn't been resolved yet.

11
00:01:00,160 --> 00:01:05,359
Union find, remember, we couldn't get a linear algorithm but at least target improved that

12
00:01:05,359 --> 00:01:07,400
no such algorithm exists.

13
00:01:07,400 --> 00:01:10,960
For MST, we're not even there yet.

14
00:01:10,960 --> 00:01:13,320
And a lot of people have worked on it.

15
00:01:13,320 --> 00:01:20,879
So just go with this simple model where what you get to do is compare edges, compare weights

16
00:01:20,879 --> 00:01:23,039
on edges.

17
00:01:23,039 --> 00:01:31,039
In 1975, Yao proved that there exists an algorithm that's worst case running time is E log log

18
00:01:31,039 --> 00:01:39,399
V. In 1976, you're an entargent came up with another such algorithm.

19
00:01:39,399 --> 00:01:50,120
And then Fredman and Targent found the E plus V log V algorithm or E log star V for MSTs

20
00:01:50,120 --> 00:01:54,160
in 84.

21
00:01:54,160 --> 00:02:00,240
Here's another one, E log log star V. Now remember log star V is the number times you take

22
00:02:00,240 --> 00:02:01,520
log to get to one.

23
00:02:01,520 --> 00:02:08,439
So it's less than six in the natural universe.

24
00:02:08,439 --> 00:02:12,480
So these are very, very close to linear algorithms.

25
00:02:12,480 --> 00:02:15,120
The names and orange are people who work at Princeton.

26
00:02:15,120 --> 00:02:18,960
So we're trumpeting Princeton a little bit here.

27
00:02:18,960 --> 00:02:28,680
In 1997, Shazel showed that it's close to the inverse ackerman function that even more

28
00:02:28,680 --> 00:02:36,159
slowly growing than log star V. In 2000, I got rid of the log factor.

29
00:02:36,159 --> 00:02:40,960
So very, very close to linear.

30
00:02:40,960 --> 00:02:50,960
But now in 2002, Optimal, well, let's talk about that.

31
00:02:50,960 --> 00:02:56,439
They showed an algorithm that is better not to talk about the theory of that.

32
00:02:56,439 --> 00:03:02,520
And that still the open question is, is there an algorithm whose worst case running time

33
00:03:02,520 --> 00:03:05,600
is guaranteed to be proportional to E?

34
00:03:05,600 --> 00:03:10,520
Or could someone prove that no such algorithm exists?

35
00:03:10,520 --> 00:03:14,560
That's one of the most tantalizing open questions in computer science.

36
00:03:14,560 --> 00:03:21,719
As we get into graph algorithms in more detail, we'll see some other examples of problems

37
00:03:21,719 --> 00:03:24,680
for which we know pretty good algorithms.

38
00:03:24,680 --> 00:03:28,480
But we'd like to know whether there are better algorithms or not.

39
00:03:28,480 --> 00:03:32,439
And MST is a fine example of that.

40
00:03:32,439 --> 00:03:35,840
That's the orange means Princeton.

41
00:03:35,840 --> 00:03:41,640
There is a randomized linear time algorithm that was discovered in 1995, but that's not

42
00:03:41,640 --> 00:03:47,680
the same as solving it worst case in linear time.

43
00:03:47,680 --> 00:03:49,480
So that's one context.

44
00:03:49,480 --> 00:03:54,759
MST is an important problem that's still being studied by theoretical computer scientists

45
00:03:54,759 --> 00:03:59,000
and we still don't know the best algorithm.

46
00:03:59,000 --> 00:04:05,879
There's another one, so-called Euclidean MST.

47
00:04:05,879 --> 00:04:10,919
And this one is what's appropriate in some practical situations.

48
00:04:10,919 --> 00:04:17,680
So now you have points in the plane and the graph is an implicit dense graph.

49
00:04:17,680 --> 00:04:24,040
That is, we take as an edge in the graph the distance between each point and every other

50
00:04:24,040 --> 00:04:25,040
point.

51
00:04:25,040 --> 00:04:29,800
So if there's n points, there's n squared edges because every point's connected to every

52
00:04:29,800 --> 00:04:31,120
other point.

53
00:04:31,120 --> 00:04:38,240
And what we want is in that graph, we want to find the subset of edges that connects all

54
00:04:38,240 --> 00:04:39,560
the points that's minimal.

55
00:04:39,560 --> 00:04:41,600
That's actually in a lot of practical problems.

56
00:04:41,600 --> 00:04:44,080
That's what you want.

57
00:04:44,080 --> 00:04:51,280
So as it stands, the algorithms that we've talked about are not useful for this because

58
00:04:51,279 --> 00:04:54,599
they're going to take quadratic time because E's quadratic.

59
00:04:54,599 --> 00:04:57,599
That's how many edges there are in the graph.

60
00:04:57,599 --> 00:05:02,359
So you could just go ahead and build the graph with the n squared over two distances and

61
00:05:02,359 --> 00:05:08,799
run prims algorithm, but that's not very satisfying for a huge number of points.

62
00:05:08,799 --> 00:05:18,319
It's actually not too difficult to exploit the geometry of the situation and get it done

63
00:05:18,319 --> 00:05:22,680
in time proportional to n log n.

64
00:05:22,680 --> 00:05:30,399
What is typically done is to build a subgraph where each point is connected to certain number

65
00:05:30,399 --> 00:05:33,040
of points that are close to it.

66
00:05:33,040 --> 00:05:40,360
There's a particular graph called the Verona diagram or the Deloni triangulation that does

67
00:05:40,360 --> 00:05:41,360
that.

68
00:05:41,360 --> 00:05:51,240
And proof number one that that graph has a linear number of edges, not quadratic.

69
00:05:51,240 --> 00:05:56,639
And it's also the MST is a subgraph of the Deloni triangulation.

70
00:05:56,639 --> 00:06:02,600
So you can get it done in linear rhythmic time for Euclidean MST.

71
00:06:02,600 --> 00:06:12,720
There's a problem related, but still very interesting in many practical applications.

72
00:06:12,720 --> 00:06:20,480
Here's another application in several many scientific studies.

73
00:06:20,480 --> 00:06:23,720
There's the idea of clustering.

74
00:06:23,720 --> 00:06:29,480
And so what we want to do is we have a set of objects and they're related by a distance

75
00:06:29,480 --> 00:06:33,439
function that specifies how close they are.

76
00:06:33,439 --> 00:06:40,720
And what we want to do is divide the objects into a given number K of coherent groups so

77
00:06:40,720 --> 00:06:44,160
that objects in different clusters are far apart.

78
00:06:44,160 --> 00:06:46,840
So we want to see how things cluster together.

79
00:06:46,840 --> 00:06:55,520
And here's a really old example of an application of this where there was an outbreak of cholera

80
00:06:55,519 --> 00:06:59,479
deaths in London in the 1850s.

81
00:06:59,479 --> 00:07:07,479
And if you plot where all the deaths happen, the scientific study could find that they

82
00:07:07,479 --> 00:07:13,799
were clustered around certain places and actually they were able to identify well pumps with

83
00:07:13,799 --> 00:07:19,759
that we're leading to the cholera just by doing this clustering study.

84
00:07:19,759 --> 00:07:21,359
And that's a very special case.

85
00:07:21,360 --> 00:07:29,120
There's many, many other applications where clustering is an important process, an important

86
00:07:29,120 --> 00:07:31,360
thing to be able to compute.

87
00:07:31,360 --> 00:07:38,520
So like mobile networks for web search, there's an idea of a distance between documents

88
00:07:38,520 --> 00:07:42,040
and you want to categorize them in clusters.

89
00:07:42,040 --> 00:07:46,360
There's all the objects that have been discovered in the sky.

90
00:07:46,360 --> 00:07:54,439
You want to cluster them together in a reasonable way and all kinds of processing having to

91
00:07:54,439 --> 00:08:00,360
do with huge databases, trying to get information that seems close together to be close together

92
00:08:00,360 --> 00:08:04,240
into a relatively small number of clusters.

93
00:08:04,240 --> 00:08:16,000
So there's an approach called single link clustering where you talk about the single link,

94
00:08:16,000 --> 00:08:22,079
the distance between two clusters, equaling the distance between the two closest objects

95
00:08:22,079 --> 00:08:24,120
one in each cluster.

96
00:08:24,120 --> 00:08:31,279
And so so-called single link clustering is given a integer k, find the k clustering that

97
00:08:31,279 --> 00:08:37,080
maximizes the distance between the two closest clusters.

98
00:08:37,080 --> 00:08:41,639
So that's a well-defined computational problem.

99
00:08:41,799 --> 00:08:47,600
There's a very well-known algorithm in the science literature for this problem, single link

100
00:08:47,600 --> 00:08:49,399
clustering.

101
00:08:49,399 --> 00:08:55,600
Form the V clusters, find the closest pair of objects such that each object is in a different

102
00:08:55,600 --> 00:09:01,399
cluster and merge the two clusters and repeat until they're exactly k clusters.

103
00:09:01,399 --> 00:09:05,159
You'll find this algorithm in the scientific literature.

104
00:09:05,159 --> 00:09:08,319
What's amazing is that this is Kruskel's algorithm.

105
00:09:08,320 --> 00:09:15,600
So you can stop when you found the k connected components so that the, or another thing you

106
00:09:15,600 --> 00:09:18,960
do is just run Prims algorithm.

107
00:09:18,960 --> 00:09:26,200
And then after you've run Prims algorithm, get rid of the largest edges until you're left

108
00:09:26,200 --> 00:09:28,840
with k clusters.

109
00:09:28,840 --> 00:09:36,680
So all the efficient algorithms that we've talked about are going to apply for single link

110
00:09:36,679 --> 00:09:43,239
clustering and actually scientists who also know some computer science now are able

111
00:09:43,239 --> 00:09:51,759
to handle huge problems that would not be possible without efficient algorithms.

112
00:09:51,759 --> 00:10:02,839
This is just one example where cancer study where experiments are connecting genes with

113
00:10:02,840 --> 00:10:08,840
the way they're expressed in different parts of the body and trying to cluster together

114
00:10:08,840 --> 00:10:12,040
tumors in similar tissues.

115
00:10:12,040 --> 00:10:18,399
And again, such experimental results can result in huge amounts of data and MST algorithms

116
00:10:18,399 --> 00:10:22,960
are playing a role in scientific research of this type.

117
00:10:22,960 --> 00:10:25,519
That's our context for minimal spanning trees.

