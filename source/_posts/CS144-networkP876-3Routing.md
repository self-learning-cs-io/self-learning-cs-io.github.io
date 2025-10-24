---
title: CS144 NetworkP876 3Routing
---

1
00:00:00,000 --> 00:00:05,200
Continuing on a theme on routing, in this video I'm going to tell you about the

2
00:00:05,200 --> 00:00:10,599
Link State algorithm, in particular Dijkstra's shortest path first algorithm. This

3
00:00:10,599 --> 00:00:14,960
is an example of a Link State protocol where the routers start by flooding to

4
00:00:14,960 --> 00:00:18,660
each other all the information about the topology of the network which links

5
00:00:18,660 --> 00:00:21,940
are there, which links are up, which ones are down, and then from there each

6
00:00:21,940 --> 00:00:26,320
router is going to calculate its shortest path tree from it to every other

7
00:00:26,320 --> 00:00:32,399
router. Dijkstra's shortest path first algorithm is an example of what's more

8
00:00:32,399 --> 00:00:36,759
generally called the Link State algorithm. In Link State algorithms the routers

9
00:00:36,759 --> 00:00:40,039
start by exchanging all of the Link State. In other words they're going to learn

10
00:00:40,039 --> 00:00:44,799
the topology of the network by exchanging with each other the the the state of

11
00:00:44,799 --> 00:00:48,439
the links connected to each router. So a router is going to flood to every other

12
00:00:48,439 --> 00:00:52,320
router the state of the links connected to it so that every router has a full

13
00:00:52,320 --> 00:00:56,299
topology map. And they're going to do this periodically and whenever the

14
00:00:56,299 --> 00:01:01,459
Link State changes so that they get quick updates. And then specific to Dijkstra's

15
00:01:01,459 --> 00:01:04,739
algorithm we're going to run Dijkstra's algorithm. In other words once we've

16
00:01:04,739 --> 00:01:09,340
got that topology map each router is going to independently run Dijkstra's shortest

17
00:01:09,340 --> 00:01:13,099
path first algorithm. If it was a different Link State algorithm then we'd run a

18
00:01:13,099 --> 00:01:17,459
different algorithm but because Dijkstra is so widely used that's the example I'm

19
00:01:17,459 --> 00:01:21,379
going to be using here. So at the end of the day each router finds the minimum

20
00:01:21,379 --> 00:01:26,859
cost spanning tree to reach every other router. Let's work through an example of

21
00:01:26,859 --> 00:01:32,459
Dijkstra's algorithm on this topology here. So this topology has eight routers

22
00:01:32,459 --> 00:01:37,939
connected by links that are annotated with the cost of using those links. And we're

23
00:01:37,939 --> 00:01:43,179
going to go through the example of finding the lowest cost spanning tree from

24
00:01:43,179 --> 00:01:48,340
R8 to every other router. Let me just draw an example of what that might look

25
00:01:48,340 --> 00:01:52,939
like. This won't actually be the the right one but it will give us an example of

26
00:01:52,939 --> 00:01:59,300
how it might how it might look. So it's going to start from here and maybe go

27
00:01:59,300 --> 00:02:02,980
out this way, go out this way, go out this way, go out this way, maybe we're

28
00:02:02,980 --> 00:02:07,460
going to have this one, this one and this one. So that would be a spanning tree. It

29
00:02:07,460 --> 00:02:10,740
happens not to be the lowest cost spanning tree but we're going to calculate

30
00:02:10,740 --> 00:02:16,500
that using Dijkstra's algorithm in a moment. So I'm just going to draw out how

31
00:02:16,500 --> 00:02:20,520
this will evolve. I'm just going to go through the steps and then I'll take you

32
00:02:20,520 --> 00:02:26,139
through a more formal way of calculating it afterwards. So let's start with R8

33
00:02:26,139 --> 00:02:31,900
down in the bottom right hand corner. In the first step of Dijkstra's algorithm,

34
00:02:31,900 --> 00:02:38,900
we're going to add the router that has the lowest cost path back to R8. And so

35
00:02:38,900 --> 00:02:43,580
that's R7 because it has a path of one back to R8. So I'm going to draw that on

36
00:02:43,620 --> 00:02:50,900
here, R7 with a cost of one. Next I'm going to look at the router that will

37
00:02:50,900 --> 00:02:55,580
directly connect to this tree, this little fledgling tree, with the lowest cost

38
00:02:55,580 --> 00:03:00,500
path back to R8. I've got two choices, either R4, which will connect back with a

39
00:03:00,500 --> 00:03:04,860
cost of two or R6 that will connect with a cost of two. So I'm going to just

40
00:03:04,860 --> 00:03:09,980
toss a coin and randomly pick R6, doesn't matter. So it's going to have a cost of

41
00:03:09,979 --> 00:03:15,659
two. Next I'm going to add the next router with the lowest cost path and that's

42
00:03:15,659 --> 00:03:21,899
going to be R4 clearly. And each time I've added a router, I'm not going to

43
00:03:21,899 --> 00:03:26,060
consider adding it again, of course, because I've already added it into this tree

44
00:03:26,060 --> 00:03:31,419
that is evolving in the bottom right hand corner of the slide here. Next I'm

45
00:03:31,419 --> 00:03:36,060
going to add the one with, I've added the ones with up to a cost of two. So is

46
00:03:36,060 --> 00:03:39,659
the one with a cost of three? No, there isn't. Is the one with a cost of four?

47
00:03:39,659 --> 00:03:45,020
Yeah, I've got two candidates here. I've got both R3 and R5, both will connect.

48
00:03:45,020 --> 00:03:52,300
Okay, well, I'll arbitrarily add R5 first. That has a cost of four back to R8,

49
00:03:52,300 --> 00:04:01,500
and then I'll add R3. Do I have one with a cost of five? Yes, I do. I've got R2,

50
00:04:01,580 --> 00:04:12,860
that has a cost of five. That adds, that's a cost of five back to R8. Do I have one with a cost of six?

51
00:04:12,860 --> 00:04:17,420
Well, I've got two that have a cost six, but they're already connected into the tree at a lower

52
00:04:17,420 --> 00:04:22,779
cost. So R3 and R4. So I'm not going to add those. They're already on the tree, but I've also got

53
00:04:22,779 --> 00:04:30,060
R1. I can now add that one in at a cost of six. So that's one, two, three, four, five, six.

54
00:04:30,620 --> 00:04:37,899
I've now added them all, and I'm done. Let's go through those steps. There's basically the same

55
00:04:37,899 --> 00:04:43,660
steps that I just went through adding each of those routers in turn. So first of all, I added

56
00:04:43,660 --> 00:04:50,220
R6 because it has a cost of two, then I added R4 because it has a cost of two, then I added R5 because

57
00:04:50,220 --> 00:04:58,139
it has a cost of four, and then also R3, it has a cost of four, then I added R2, and then finally,

58
00:04:58,139 --> 00:05:03,979
I added R1, and then I'm done. We can think of this more systematically by following through

59
00:05:03,979 --> 00:05:09,899
this table. So I'm going to populate this table as I go, and then I'll show you what it's fully

60
00:05:09,899 --> 00:05:17,259
what it looks like, fully populated afterwards. So this is just going to repeat exactly what the

61
00:05:17,259 --> 00:05:26,699
steps I just did. So I start with at step 0, the candidate set of all those routers that directly

62
00:05:26,939 --> 00:05:33,899
connect to R8. So my shortest path set is going to be the set of routers that are in the shortest path

63
00:05:33,899 --> 00:05:39,259
tree. So I start with R8 and my shortest path set, and the candidate set are those that connect to it

64
00:05:40,219 --> 00:05:48,699
directly to it, directly to the current fledgling subtree. So that's R3, R5, R6, and R7, and I'm going to

65
00:05:48,699 --> 00:05:55,339
pick the one with the lowest cost path back to R8, practically R7, so I'm going to add R7 in first.

66
00:05:55,339 --> 00:06:02,299
So I've chosen R7, and in which case if I've chosen R7, I'm going to add it into my shortest path set.

67
00:06:02,299 --> 00:06:09,259
So my shortest path set is going to become R8 and R7. My candidate set are the set of routers that

68
00:06:09,259 --> 00:06:16,620
directly connect to this subtree. So the ones that directly connect are R3 and R5, still of course,

69
00:06:16,620 --> 00:06:22,219
because I haven't used them yet. R6, because I haven't used that one yet, I've used R7,

70
00:06:22,300 --> 00:06:28,460
so now R4 becomes added to the candidate set. And I will pick from that set the one with the lowest

71
00:06:28,460 --> 00:06:34,940
cost path back to R8. That could either be R4, which has a cost of two, or it can be R6, and I'm just

72
00:06:34,940 --> 00:06:43,260
going to just arbitrarily pick R6. So now my shortest path set is going to be R8. I'm running out of

73
00:06:43,259 --> 00:06:51,259
space here, but that doesn't matter. Add R6. And my candidate set is going to be R3, R5.

74
00:06:52,620 --> 00:06:57,819
I've used R6, so I'll have R4 in it, and because I've added R6, well, I'm adding no more routers in

75
00:06:57,819 --> 00:07:02,699
now to my candidate set, so that's going to stay at the same thing. And so on, eventually I will

76
00:07:02,699 --> 00:07:09,259
fill out the table until the very last one that I will add will be in, I will choose R1 here,

77
00:07:09,259 --> 00:07:14,379
and so at this point I will add one into my shortest path set, and then I'm going to be done.

78
00:07:15,819 --> 00:07:22,139
Okay, I'm going to add one router at each step. I'm going to add the router, that is the lowest cost path,

79
00:07:22,139 --> 00:07:25,819
and because that is its lowest cost path, we know that we're done with that router, there's nothing

80
00:07:25,819 --> 00:07:30,539
else left to do. So it's nice and simple. We'll always run the number of iterations, equals

81
00:07:30,539 --> 00:07:35,339
and the number of routers in the network. So if you fill out this table, you would find that it looks

82
00:07:35,419 --> 00:07:42,779
like this, and so you can just check that that matches what I did earlier. So if you run this algorithm,

83
00:07:42,779 --> 00:07:47,739
and we'll give you some exercises where you run through and fill out tables like this,

84
00:07:48,379 --> 00:07:52,059
you will see, and after a few times that you've done it, that oh yes, of course it's actually

85
00:07:52,059 --> 00:07:58,219
generating the full lowest cost minimum, the lowest cost spanning tree. So some questions we're

86
00:07:58,219 --> 00:08:02,939
asking about Dykstra's algorithm. First one, how long does the algorithm take to run?

87
00:08:03,579 --> 00:08:09,420
Well, it's a nice simple answer. By the end of the kth iteration, we've added k routers to the graph.

88
00:08:09,980 --> 00:08:15,740
So we have n routers to start with, it will always terminate after exactly n iterations. Nice and easy.

89
00:08:17,660 --> 00:08:24,620
What happens when link costs change, or when the routers or links fail? Nice and easy again,

90
00:08:24,620 --> 00:08:28,860
every time there's a change in the link state, in other words, every time a link goes up or down,

91
00:08:29,180 --> 00:08:32,620
the routers are going to flood that state to every other router in the network.

92
00:08:33,580 --> 00:08:38,779
They then rerun Dykstra's algorithm, calculate the lowest cost spanning tree out to every other

93
00:08:38,779 --> 00:08:44,139
router, and we're back up and going again. In other words, every time there's a change, we recalculate

94
00:08:44,139 --> 00:08:50,139
from scratch, and we move on. So we don't have to worry about the cases like bad news travel slowly,

95
00:08:50,139 --> 00:08:55,420
etc. that we have to worry about with the bellman forward algorithm, because everything is recalculated

96
00:08:55,419 --> 00:09:01,899
from scratch every time there's a change. So let's see how Dykstra's algorithm is used in practice.

97
00:09:02,539 --> 00:09:08,299
Dykstra's algorithm is an example of a link state algorithm. That means that the link state is

98
00:09:08,299 --> 00:09:14,219
known by every router. In other words, it's flooded amongst the routers to make sure that all of the

99
00:09:14,219 --> 00:09:19,419
routers know the entire topology and the state of the links in the network, and then each router

100
00:09:19,419 --> 00:09:24,939
independently calculates the shortest path spanning tree from itself to every other router in the

101
00:09:24,940 --> 00:09:32,220
network. Dykstra's algorithm is the basis of the OSPF for open shortest path first algorithm,

102
00:09:32,220 --> 00:09:36,700
a very widely used routing protocol in the internet, and we're going to see that in our later video.

103
00:09:39,100 --> 00:09:43,260
There's another way of thinking about Dykstra's algorithm that I want to tell you about next.

104
00:09:43,260 --> 00:09:49,820
I first learned about this from Professor Jean-Wolron at Berkeley, and a very nice way to think about

105
00:09:49,900 --> 00:09:57,340
what's going on. So take a look at this example here with a set of routers interconnected by links,

106
00:09:57,340 --> 00:10:03,020
and the red numbers as before represent the cost of each link. And I'm actually going to represent them

107
00:10:03,020 --> 00:10:09,340
by tennis balls, the yellow routers, and a white and a pink ball representing the top and the

108
00:10:09,340 --> 00:10:16,300
bottom A and B. And we're going to calculate the lowest cost spanning tree, and by connecting it

109
00:10:16,299 --> 00:10:22,779
by strings between each ball where the length of the string equals the cost shown in red.

110
00:10:22,779 --> 00:10:27,740
So let's start with them down on the ground like this, and then if we tug and pull them up by A,

111
00:10:28,620 --> 00:10:34,620
each link that goes toward or each string that goes toward is going to be on that lowest cost

112
00:10:34,620 --> 00:10:41,419
spanning tree from A through the network. So eventually we'll end up with something that looks

113
00:10:41,419 --> 00:10:48,139
like this, where A is connected to B through R3 and R5 with a total cost of 9, and all the solid

114
00:10:48,139 --> 00:10:54,620
links here represent the strings that will be tight. All the ones that are dotted, the two in the

115
00:10:54,620 --> 00:11:00,059
bottom left hand corner will be will be slack or loose because they're not on the lowest cost spanning

116
00:11:00,059 --> 00:11:06,059
tree. I'm going to lift them up like this, and this is the same topology as before. So A to R1

117
00:11:06,139 --> 00:11:13,099
goes tight, then A to R2 and 3 and R1 goes tight because they're all on the least cost spanning tree.

118
00:11:13,099 --> 00:11:19,339
Now A4 goes tight and then R5 because they're all on the least cost spanning tree. I lift it up

119
00:11:19,339 --> 00:11:27,179
further and eventually the line A, R3, R5, B will all go tight because they're all on the least cost

120
00:11:27,179 --> 00:11:33,500
spanning tree. And that's the end of the video about Daikstra's algorithm.

