---
title: PrincetonAlgorithms P66Part22 08_graph Challenges
---

1
00:00:00,000 --> 00:00:09,800
Okay, now that we've discussed breadth-first search and depth-first search and connected

2
00:00:09,800 --> 00:00:16,000
components, three, very useful graph processing algorithm for all sorts of real applications,

3
00:00:16,000 --> 00:00:21,839
now we're going to go back to the idea of the different problems that might arise when

4
00:00:21,839 --> 00:00:29,240
doing graph processing and what are our intuition with this experience on what types of problems

5
00:00:29,239 --> 00:00:33,960
are difficult and what types of problems are easy. It's not that I have any real answers

6
00:00:33,960 --> 00:00:39,719
to that, but we want to keep coming back to this issue so that we can appreciate a great

7
00:00:39,719 --> 00:00:49,799
algorithm when we see it. So here's a challenge or an example of a challenge. So here's a problem

8
00:00:49,799 --> 00:00:58,039
that comes up in plenty of applications. So you want to know if a given graph is by part-type,

9
00:00:59,240 --> 00:01:08,920
so what by part-type means is you can divide the edges into two subsets, divide the vertices into

10
00:01:08,920 --> 00:01:16,439
two subsets, with the property that every edge connects a vertex in one subset to a vertex and

11
00:01:16,439 --> 00:01:24,280
another. So in this case, we can assign zero, three, and four to be red vertices and if we do that,

12
00:01:24,280 --> 00:01:31,159
then every edge connects a red to a white vertex. That's a by-partite graph. And we saw an example

13
00:01:31,159 --> 00:01:36,519
of by-partite graph, the Kevin Bacon graph. We had movies and performers, two different types of

14
00:01:36,519 --> 00:01:44,040
vertices and every edge went from movie to a performer. And in general, another application, so you

15
00:01:44,040 --> 00:01:52,040
want to know is a graph by part-type. So by graph processing challenge, I mean, is how difficult is

16
00:01:52,040 --> 00:01:58,440
this problem? So what do you think, based on our experience? Is this a problem that any programmer could

17
00:01:58,440 --> 00:02:07,480
do? Or maybe you need to be a typical diligent student in this course? Or maybe it's difficult enough

18
00:02:07,480 --> 00:02:14,599
that you ought to pay somebody to do it? Or actually, maybe even an expert couldn't do it and we'll

19
00:02:14,599 --> 00:02:20,120
talk about the precise meaning of that layer on. Or maybe we don't even know how difficult it is.

20
00:02:20,759 --> 00:02:26,840
Or maybe we can show that it's impossible to solve this problem. These are pretty broad categories

21
00:02:26,840 --> 00:02:35,319
and you'd like to think that we could categorize problems in these kinds of categories. So what about

22
00:02:35,319 --> 00:02:42,360
by-partite? We'll do this for a bunch of problems, but what about by-partite? Well, the answer for

23
00:02:42,360 --> 00:02:47,879
that one is that you can use the FS to get this done. I wouldn't think that any program can do it,

24
00:02:47,879 --> 00:02:56,439
ask a friend. But with the FS, you can see in the book a pretty simple DFS-based solution

25
00:02:57,240 --> 00:03:06,680
that to this problem that'll tell you whether graph is by-partite, by labeling vertices in such a way

26
00:03:06,680 --> 00:03:12,599
if it is by-partite that all the edges have the property to go from once it went vertex to another.

27
00:03:12,599 --> 00:03:21,719
So definitely good exercise after this lecture is to try and write a program that tests whether

28
00:03:21,719 --> 00:03:29,560
graphs by-partite or not. Here's another application of this, by the way. That dating graph

29
00:03:30,359 --> 00:03:38,039
for the sexual transmitted diseases. So there's males and females. Is that one going to be by-partite?

30
00:03:38,840 --> 00:03:47,159
I think maybe this one is, but nowadays maybe not in general. Okay, what about this one?

31
00:03:48,439 --> 00:03:59,479
Does a graph contain a cycle or not? So in this case there's a cycle 0 to 5 to 4 to 6 back to 0.

32
00:03:59,479 --> 00:04:08,759
And there's other cycles, 2, 0, 1, 3, 2, 0, 2, 4, 6. Those are all cycles. So how hard is it to find a

33
00:04:08,759 --> 00:04:20,839
cycle in a graph in these categories? Categorizations. Well, that one, it's very simple. This one maybe

34
00:04:20,839 --> 00:04:26,279
any program we could do, maybe. You have to have the graph representation, but you have to use DFS.

35
00:04:27,079 --> 00:04:32,759
Well, you can figure out a way to do it without probably, but anyway, it's really simple with

36
00:04:32,759 --> 00:04:42,119
the FS. You need to hire an expert for finding a cycle. All right, here's a classic graph processing

37
00:04:42,119 --> 00:04:53,479
problem that dates back to the 18th century. So it's this town, a Kernexberg in Prussia at the time,

38
00:04:54,439 --> 00:05:01,240
where there's an island. And the river kind of comes in and branches around the island and then

39
00:05:01,240 --> 00:05:09,400
goes out in two branches. And there's a bunch of bridges, five bridges onto the island, two from

40
00:05:09,400 --> 00:05:16,040
the banks, and one across to this third peninsula. And then there's two bridges crossing that way.

41
00:05:16,040 --> 00:05:24,120
So total of seven bridges, one, two, three, four, five, six, seven. And Euler, whose famous

42
00:05:24,120 --> 00:05:30,200
mathematician would go out in Sunday stroll in this place and came up with the idea,

43
00:05:31,800 --> 00:05:41,640
could anyone find a way to go on a Sunday stroll and cross each one of these bridges exactly once?

44
00:05:42,120 --> 00:05:52,039
So that's often talked of as the original graph processing problem.

45
00:05:53,639 --> 00:06:02,519
And so in terms of graphs, is there a cycle that uses every edge exactly once? Given a graph,

46
00:06:02,519 --> 00:06:11,000
is there a cycle that uses every edge exactly once? And actually Euler proved, so to say,

47
00:06:11,079 --> 00:06:17,639
first theorem and graph theory, if it's connected and all the vertices have even degree,

48
00:06:18,120 --> 00:06:23,399
you can always do it. In this case, you can't because there's a vertex with odd degree.

49
00:06:25,000 --> 00:06:32,439
So that's the answer to the existence. Is there a cycle? But suppose you wanted to find the cycle.

50
00:06:33,800 --> 00:06:40,199
So you can go ahead and check the degree of every vertex. We looked at easy code for that to know

51
00:06:40,199 --> 00:06:46,519
that there exists a cycle. But how about finding one that uses every edge exactly once?

52
00:06:47,800 --> 00:06:53,959
So in this case, here's a cycle that uses every edge exactly once. And this graph, every vertex has

53
00:06:53,959 --> 00:07:05,240
even degree. And if you go 0, 1, 2, 3, 4, 2, 0, 6, 4, 5, 0, you get to every edge exactly once.

54
00:07:05,879 --> 00:07:13,079
That's an ordinary cycle. So how about that one? Is that any programmer?

55
00:07:14,759 --> 00:07:22,920
Already have to hire an expert or is it impossible? Well, this one, we haven't listed as a typical

56
00:07:22,920 --> 00:07:29,720
diligent algorithm student could do it. But it's a bit of a challenge. It's an interesting program.

57
00:07:29,720 --> 00:07:36,440
And again, once you get through the bipartite graph one, you can think about this one.

58
00:07:36,440 --> 00:07:43,240
It makes some sense what the algorithm does. But it might take you a few tries to get the code debug,

59
00:07:43,240 --> 00:07:50,920
let's say. Any find code for it in the book site? All right, so that's a Larian cycle.

60
00:07:52,840 --> 00:07:59,160
What about if you want to visit every vertex exactly once? So you don't care about going over all

61
00:07:59,160 --> 00:08:05,000
the edges, you just want to get to all the places. That's called the, in this case, there is a way.

62
00:08:06,280 --> 00:08:17,960
For this graph, 0, 5, 3, 4, 6, 2, 1, 0. So that's a way to get to every vertex exactly once.

63
00:08:17,960 --> 00:08:24,920
This is sometimes called the traveling salesperson problem on graphs. The traveling salesperson has to

64
00:08:24,920 --> 00:08:32,360
get to every city and wants to just go there once without retracing steps. So how about that one?

65
00:08:34,120 --> 00:08:42,120
The every edge is more to visit. Might seem more challenging. And actually, maybe if you have any

66
00:08:42,120 --> 00:08:49,480
experience with this, you realize that this one is interactable. That's called the Hamiltonian

67
00:08:49,480 --> 00:08:56,279
cycle problem. And it's a classical NP-complete problem. We'll be talking about NP-complete problems

68
00:08:56,279 --> 00:09:02,920
in the end of the course. But basically, the idea is that nobody knows an efficient solution to

69
00:09:02,920 --> 00:09:10,039
this problem for large graphs. And it's a frustrating situation that we'll talk about. But you definitely

70
00:09:10,039 --> 00:09:17,080
not going to solve it by just being a diligent algorithm of student in not even hiring an expert.

71
00:09:17,080 --> 00:09:20,280
We'll get it solved, no matter how much the expert charges.

72
00:09:21,720 --> 00:09:28,759
So the intuition on finding a cycle that visits every edge once, yeah, you could do it.

73
00:09:28,759 --> 00:09:35,879
Find a cycle that visits every vertex once, probably not. That's the kind of challenge that we face

74
00:09:36,440 --> 00:09:42,840
when addressing applications of graph processing. Here's another example.

75
00:09:43,800 --> 00:09:50,040
The problem is given two graphs, you want to know, are they identical except for the way that we

76
00:09:50,040 --> 00:09:58,200
name the vertex? So here's an example of these two graphs don't look all that identical at all.

77
00:09:59,639 --> 00:10:06,680
But if you take zero here and rename it four and one and rename it three and like that,

78
00:10:07,159 --> 00:10:17,799
then you'll see that they are the same graph. They represent the same connection.

79
00:10:18,839 --> 00:10:25,959
In so many applications where maybe the vertex names are that arbitrary or you just want to know,

80
00:10:27,399 --> 00:10:33,079
really the interest is in the structure of the connections. You might want to know it's just the

81
00:10:33,080 --> 00:10:38,200
way that I name the vertex makes the graph different. If I have two classes that have two different

82
00:10:38,200 --> 00:10:43,080
kinds of interactions, is it the same interactions that's independent of the people or scientific

83
00:10:43,080 --> 00:10:49,240
experiment, studying property of the universe or whatever you might want to know? Is that connection

84
00:10:49,240 --> 00:10:56,200
structure the same or not? That's called the graph isomorphism problem. How difficult do you think

85
00:10:56,200 --> 00:11:09,400
that one is? So you could try all possible ways of renaming the vertices, but there's really a lot

86
00:11:09,400 --> 00:11:17,560
of ways, in factorial ways, way too many to try for a huge graph. Is there a efficient way to do it?

87
00:11:19,000 --> 00:11:25,320
Or is it intractable like the Hamiltonian path problem where it's in this category that nobody

88
00:11:25,320 --> 00:11:31,320
knows an efficient algorithm for, but there could be one. Actually for graph isomorphism,

89
00:11:31,879 --> 00:11:38,040
that's one that has stumped mathematicians and computer scientists for many years. Nobody knows

90
00:11:38,040 --> 00:11:44,440
even how to classify this problem. We don't know if it's easy or if it's in a class of problems that

91
00:11:45,400 --> 00:11:51,160
we don't know how to solve, but there could be a solution. We can't show that it's impossible or

92
00:11:51,240 --> 00:11:57,480
guaranteed to be difficult. Nobody knows how to classify this problem. Again pointing out that

93
00:11:58,279 --> 00:12:04,679
even for a relatively simple problem to state, the state of our knowledge and understanding the

94
00:12:04,679 --> 00:12:13,719
properties of algorithms to solve such problems is incomplete for sure. So one last one,

95
00:12:14,600 --> 00:12:20,600
here's a graph processing challenge. So this graph when it's laid out it's got two edges that

96
00:12:20,600 --> 00:12:25,800
cross between three and four and zero and five. And in general if you have a graph that you got,

97
00:12:26,519 --> 00:12:32,040
so they say the social networking graph of a small class, you want to study that graph and look

98
00:12:32,040 --> 00:12:36,519
at it, you want to draw it on the plane and maybe you don't want to try to do it without having

99
00:12:36,519 --> 00:12:43,560
edges cross. So in this case there is a way to place the vertices in the plane so that when you

100
00:12:44,439 --> 00:12:52,439
draw the edges no two of them cross. So how difficult is that problem? You even is it possible to do or not?

101
00:12:54,119 --> 00:13:02,679
So that's a classic problem in graph processing that came up from the first time that people were

102
00:13:02,679 --> 00:13:09,799
representing graphs and computers. And the answer to this one is also interesting to contemplate.

103
00:13:09,959 --> 00:13:19,719
There's a linear time algorithm known for this based on DFS. So that means running times could run it on huge graphs.

104
00:13:19,719 --> 00:13:26,839
You could know whether or not you could lay it out in the plane. It was discovered by Tarjan in the 1970s.

105
00:13:26,839 --> 00:13:36,439
And you have that name come up again in graph processing. Based on DFS, but if you really want to get this done,

106
00:13:36,440 --> 00:13:44,120
you need to hire an expert because that is quite a complex algorithm and probably beyond what a

107
00:13:44,120 --> 00:13:55,080
diligent algorithm student or a professor might accomplish. So that's kind of another point on this

108
00:13:55,640 --> 00:14:04,280
range of difficulty of graph processing problems. So there's no question that graph processing is

109
00:14:04,279 --> 00:14:12,600
challenging. And this introductory lecture gave us numerous useful graph processing algorithms,

110
00:14:13,240 --> 00:14:19,480
but still leaves us with the feeling that there's plenty more to know and we'll cover some more in

111
00:14:19,480 --> 00:14:21,000
later lectures.

