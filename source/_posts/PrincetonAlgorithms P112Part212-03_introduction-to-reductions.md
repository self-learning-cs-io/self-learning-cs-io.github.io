---
title: PrincetonAlgorithms P112Part212 03_introduction To Reductions
---

1
00:00:00,000 --> 00:00:05,839
Today we're going to talk about reductions.

2
00:00:05,839 --> 00:00:09,160
This is something that we've done several times throughout the course, but we're going

3
00:00:09,160 --> 00:00:13,240
to want to take a little bit more formal look at it because it plays a critical role in

4
00:00:13,240 --> 00:00:19,080
some of the advanced topics that we're going to want to consider next.

5
00:00:19,080 --> 00:00:22,519
Just a quick overview of the next few lectures.

6
00:00:22,519 --> 00:00:27,359
These are advanced topics related to algorithms, and you can take more advanced courses that go

7
00:00:27,359 --> 00:00:29,640
into all of these things in depth.

8
00:00:29,640 --> 00:00:33,679
But it's important to talk about them in the context of the algorithms that we've seen

9
00:00:33,679 --> 00:00:36,920
to put everything into perspective.

10
00:00:36,920 --> 00:00:40,679
So what we're going to talk about in this lecture is called reduction.

11
00:00:40,679 --> 00:00:45,039
And it's a technique that we use to take the good algorithms that we know and use them

12
00:00:45,039 --> 00:00:48,519
effectively to build more complicated algorithms.

13
00:00:48,519 --> 00:00:50,560
And as I said, we've done that before.

14
00:00:50,560 --> 00:00:57,320
But it brings up some interesting ideas that are bigger than any particular algorithm.

15
00:00:57,320 --> 00:01:01,399
And one idea that we've talked about is the idea of a problem solving model.

16
00:01:01,399 --> 00:01:05,560
We saw that we could use shortest paths and max flow to solve problems that didn't seem

17
00:01:05,560 --> 00:01:07,960
to be related at all.

18
00:01:07,960 --> 00:01:12,159
And there's a particularly important problem solving model called linear programming that

19
00:01:12,159 --> 00:01:14,560
we'll talk about in the next lecture.

20
00:01:14,560 --> 00:01:18,039
But then there's a limit, and that brings us to the topic of interactability that we'll

21
00:01:18,039 --> 00:01:20,640
talk about in the last lecture.

22
00:01:20,640 --> 00:01:26,359
So we're shifting gears from individual problems to thinking about problem solving models that

23
00:01:26,359 --> 00:01:31,599
are more general than a particular individual problem.

24
00:01:31,599 --> 00:01:36,439
And also, as part of this, we're moving into problems that are much more difficult to solve

25
00:01:36,439 --> 00:01:40,959
and not just linear and quadratic fast algorithms, but just a different scale.

26
00:01:40,959 --> 00:01:45,000
And we'll talk about that in the next couple of lectures.

27
00:01:45,000 --> 00:01:48,680
And then we're not going to really be talking that much about code for a while.

28
00:01:48,680 --> 00:01:53,200
It's more about the conceptual framework and where the problems that you really want

29
00:01:53,200 --> 00:01:56,680
to work on fit into the big picture.

30
00:01:56,680 --> 00:02:04,079
So our goals are we've looked at some terrific, fantastic, very useful classical algorithms,

31
00:02:04,079 --> 00:02:06,520
but they fit into a larger context.

32
00:02:06,520 --> 00:02:09,080
We're going to encounter new problems.

33
00:02:09,080 --> 00:02:13,599
You want to have all those algorithms in the toolbox, but you also want to understand

34
00:02:13,599 --> 00:02:16,480
where they fit into the big picture.

35
00:02:16,480 --> 00:02:22,759
There's some very interesting, important and essential ideas that have been developed

36
00:02:22,759 --> 00:02:26,079
in great depth over the past several decades.

37
00:02:26,079 --> 00:02:33,199
And it's important for every practitioner to have a good feeling for those ideas and what

38
00:02:33,199 --> 00:02:35,199
they imply.

39
00:02:35,199 --> 00:02:42,280
And really, by thinking about these big ideas, in addition to particular algorithms for particular

40
00:02:42,280 --> 00:02:50,680
problems, most people find that they're inspired to learn much more about algorithms.

41
00:02:50,680 --> 00:02:54,879
So by way of introduction, let's talk about what a reduction is.

42
00:02:54,879 --> 00:02:58,719
So this is just a big bird's eye view.

43
00:02:58,719 --> 00:03:04,280
The idea is that what we would really like to do is if we have a new problem that we

44
00:03:04,280 --> 00:03:11,860
have to solve, we'd like to be able to classify the problem according to the cost that it's

45
00:03:11,860 --> 00:03:14,719
going to take to solve it.

46
00:03:14,719 --> 00:03:19,080
What's the order of growth of an algorithm, a good algorithm, or any algorithm to solve

47
00:03:19,080 --> 00:03:20,080
the problem?

48
00:03:20,320 --> 00:03:26,640
And we've already touched on this a little bit when we talked about sorting algorithms.

49
00:03:26,640 --> 00:03:33,439
Not only did we have a good algorithm for solving sorting, several good algorithms, but we

50
00:03:33,439 --> 00:03:39,560
also developed a lower bound that said that no algorithm can do better.

51
00:03:39,560 --> 00:03:44,520
And so we can think of the sorting problem as classified as being order of growth linear

52
00:03:44,520 --> 00:03:46,840
rhythmic or in log n.

53
00:03:46,840 --> 00:03:53,240
And then we saw plenty of linear time algorithms that we just examine all the data and we can

54
00:03:53,240 --> 00:03:54,240
get it solved.

55
00:03:54,240 --> 00:03:56,800
And we'd like to have more things like this.

56
00:03:56,800 --> 00:04:01,000
Are there algorithms that we need quadratic time to solve and so forth?

57
00:04:01,000 --> 00:04:05,200
So we're going to think more about how difficult are problems to solve.

58
00:04:05,200 --> 00:04:07,439
That's the first idea.

59
00:04:07,439 --> 00:04:12,800
Now there's really frustrating news on this front that we'll be talking about over the

60
00:04:12,800 --> 00:04:14,080
next couple of lectures.

61
00:04:14,080 --> 00:04:19,319
And the frustrating news is there are a large number of practical problems that we'd like

62
00:04:19,319 --> 00:04:23,319
to solve that we don't really know how hard they are to solve.

63
00:04:23,319 --> 00:04:27,560
And that's a profound idea that we'll get to soon.

64
00:04:27,560 --> 00:04:32,680
So what we want to talk about in this lecture is one of the most important tools that we

65
00:04:32,680 --> 00:04:40,960
use to try to classify problems and it's actually been fairly successful in lots of instances.

66
00:04:40,959 --> 00:04:46,439
And so if we know that we could solve some problem efficiently we want to use that knowledge

67
00:04:46,439 --> 00:04:51,279
to figure out what else we could or we could not solve efficiently.

68
00:04:51,279 --> 00:04:53,439
And that's what reduction is all about.

69
00:04:53,439 --> 00:05:00,519
It's just a single tool and maybe kind of gets to this Archimedes quote, give me a lever

70
00:05:00,519 --> 00:05:05,039
long enough and a full criminal in which to place it and I shall move the world.

71
00:05:05,039 --> 00:05:08,599
That's what reduction does for us.

72
00:05:08,600 --> 00:05:12,040
So here's the basic idea.

73
00:05:12,040 --> 00:05:16,879
We say that a problem acts reduces to a problem y.

74
00:05:16,879 --> 00:05:22,160
If you can use a problem that solves y to help solve x.

75
00:05:22,160 --> 00:05:25,280
So what does that mean?

76
00:05:25,280 --> 00:05:30,560
This schematic diagram gives an idea of what we're talking about.

77
00:05:30,560 --> 00:05:38,120
So in the middle we assume that we have a in the middle box there labeled in blue.

78
00:05:38,120 --> 00:05:41,800
We have an algorithm for solving problem y.

79
00:05:41,800 --> 00:05:46,040
And it's not really relevant with that algorithm in since it just knows that if you have any

80
00:05:46,040 --> 00:05:53,040
instance of problem y you can solve it.

81
00:05:53,040 --> 00:05:59,840
And the idea behind reduction is that we take an instance of problem x and we transform it

82
00:05:59,840 --> 00:06:01,959
into an instance of problem y.

83
00:06:01,959 --> 00:06:08,719
Then use the algorithm for y to solve that instance of y and then transform the solution

84
00:06:08,719 --> 00:06:15,799
back to the solution to be the instance of problem x.

85
00:06:15,799 --> 00:06:20,159
So we take that transformation into an instance of problem y, the transformation of the solution

86
00:06:20,159 --> 00:06:22,319
back to a solution to x.

87
00:06:22,319 --> 00:06:28,639
Then that whole thing enclosed in the box in the dotted line is an algorithm for problem

88
00:06:28,639 --> 00:06:29,639
x.

89
00:06:29,919 --> 00:06:30,919
And what's the cost?

90
00:06:30,919 --> 00:06:37,439
The cost of solving problem x is the cost of solving y plus the cost of reduction.

91
00:06:37,439 --> 00:06:42,159
It's like pre-processing and post-processing for problem y.

92
00:06:42,159 --> 00:06:45,039
There might be a number of calls to y in a reduction.

93
00:06:45,039 --> 00:06:49,120
And the pre-processing and post-processing might be expensive.

94
00:06:49,120 --> 00:06:55,919
Again, we've seen some specific examples of this and we'll go over it in a minute.

95
00:06:55,919 --> 00:06:58,800
So here's a really simple example.

96
00:06:58,800 --> 00:07:02,319
Finding the median reduces to sorting.

97
00:07:02,319 --> 00:07:08,120
So in this case problem y is sorting and so we assume that we have a sorting algorithm.

98
00:07:08,120 --> 00:07:12,639
If you need to find a median, then we take the items.

99
00:07:12,639 --> 00:07:14,319
That's the instance of x.

100
00:07:14,319 --> 00:07:17,920
In this case, there's no transformation, just sort them.

101
00:07:17,920 --> 00:07:23,759
And then once they're sorted, they take that sorted solution and just pick them middle

102
00:07:23,759 --> 00:07:25,319
item and return it.

103
00:07:25,319 --> 00:07:29,519
So the transformation solution is also easy.

104
00:07:29,519 --> 00:07:34,920
So the cost of solving finding the median is the cost of sorting, which is n log n plus

105
00:07:34,920 --> 00:07:39,360
the cost of the reduction, which is just constant time.

106
00:07:39,360 --> 00:07:41,360
If you can sort, you can find the median.

107
00:07:41,360 --> 00:07:45,279
So finding the median reduces to sorting.

108
00:07:45,279 --> 00:07:48,719
So here's a second simple example.

109
00:07:48,719 --> 00:07:52,680
Suppose problem x is the element distinctness problem.

110
00:07:52,920 --> 00:07:55,160
So that one is you have a bunch of elements.

111
00:07:55,160 --> 00:07:57,480
You want to know if they're all different.

112
00:07:57,480 --> 00:08:02,959
An easy way to solve that, then we look back in sorting lectures is again just sort.

113
00:08:02,959 --> 00:08:09,079
If we assume that we have a sorting algorithm, then we take that instance of the element

114
00:08:09,079 --> 00:08:11,920
distinctness problem, just all the elements in sort them.

115
00:08:11,920 --> 00:08:17,240
And then after you sort them, then you can just go through any items that are equal or

116
00:08:17,240 --> 00:08:19,319
going to be adjacent to each other.

117
00:08:19,319 --> 00:08:25,480
So simply make a pass through in this post processing phrase and check adjacent pairs

118
00:08:25,480 --> 00:08:29,079
for equality because anything equals going to be right next to one another.

119
00:08:29,079 --> 00:08:32,799
And that gives a solution to the element distinctness problem.

120
00:08:32,799 --> 00:08:39,240
So again, element distinctness reduces to sorting because you can use sorting to solve it.

121
00:08:39,240 --> 00:08:44,000
And in this case, the cost of solving element distinctness is the cost of sorting n log

122
00:08:44,000 --> 00:08:46,159
n plus cost of reduction.

123
00:08:46,159 --> 00:08:48,639
This time you have to make a pass through it.

124
00:08:48,639 --> 00:08:54,080
So this means that we can solve element distinctness and time proportional to n log n.

125
00:08:54,080 --> 00:09:00,600
It could be that you could find an algorithm that doesn't use sorting to solve element distinctness,

126
00:09:00,600 --> 00:09:04,120
but that might be a bit of a challenge.

127
00:09:04,120 --> 00:09:10,799
By reduction, maybe the hard work is done by the sorting and we get an algorithm for this

128
00:09:10,799 --> 00:09:12,519
other problem.

129
00:09:12,519 --> 00:09:13,919
That's the basic idea.

130
00:09:13,919 --> 00:09:19,799
As long as the cost of reduction is not too much, that's the basic idea of being able

131
00:09:19,799 --> 00:09:23,120
to use reduction to design new algorithms.

