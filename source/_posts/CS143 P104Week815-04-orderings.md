---
title: CS143 P104Week815 04 Orderings
---

1
00:00:00,000 --> 00:00:07,160
In the last several videos, we've been talking about doing a kind of abstract computation,

2
00:00:07,160 --> 00:00:11,200
computing with elements like bottom, the constants and top.

3
00:00:11,200 --> 00:00:14,679
And in this video, we're going to start to generalize those ideas a little bit.

4
00:00:14,679 --> 00:00:18,120
And the first thing we're going to talk about, the first step towards that generalization,

5
00:00:18,120 --> 00:00:23,320
is to talk about orderings of those values.

6
00:00:23,320 --> 00:00:25,240
First I'd like to introduce a technical term.

7
00:00:25,239 --> 00:00:29,320
These values that we compute with in program analysis, things like bottom, the constants

8
00:00:29,320 --> 00:00:33,399
and top, these are called abstract values.

9
00:00:33,399 --> 00:00:36,640
And that's to distinguish them from the concrete values.

10
00:00:36,640 --> 00:00:40,320
So the concrete values are the actual runtime values that a program computes with, things

11
00:00:40,320 --> 00:00:45,519
like actual objects and numbers and things like that.

12
00:00:45,519 --> 00:00:51,799
And the abstract values here that the program analysis uses are in general more abstracts.

13
00:00:51,799 --> 00:00:57,320
In particular, abstract values can stand for a set of possible concrete values.

14
00:00:57,320 --> 00:01:01,640
And in the particular set of abstract values, we're using for constant propagation.

15
00:01:01,640 --> 00:01:05,239
There's only only one very abstract value on that's top.

16
00:01:05,239 --> 00:01:08,479
And it stands for any possible runtime value.

17
00:01:08,479 --> 00:01:11,120
So it stands for the entire set of runtime values.

18
00:01:11,120 --> 00:01:16,359
Anyway, it turns out that there's a way to simplify the presentation of the analysis that

19
00:01:16,359 --> 00:01:19,879
we've been discussing by ordering the abstract values.

20
00:01:19,879 --> 00:01:23,959
So what we're going to say is that bottom is less than all the constants and that and all

21
00:01:23,959 --> 00:01:26,679
the constants are less than top.

22
00:01:26,679 --> 00:01:31,280
And so if we draw a picture with the lower values drawn towards the bottom of the picture

23
00:01:31,280 --> 00:01:38,479
and the higher values drawn at the top and the edges between values where there's a relationship,

24
00:01:38,479 --> 00:01:40,719
we get this diagram here.

25
00:01:40,719 --> 00:01:43,399
So you have bottom down here underneath all the other values.

26
00:01:43,399 --> 00:01:45,159
Bottom is less than every constant.

27
00:01:45,159 --> 00:01:49,039
So it knows that all the constants are here on the middle level.

28
00:01:49,040 --> 00:01:52,320
And also knows if the constants are not comparable to each other.

29
00:01:52,320 --> 00:01:55,560
So this ordering is different than the numeric ordering.

30
00:01:55,560 --> 00:01:58,240
So zero is not less than one, for example.

31
00:01:58,240 --> 00:02:02,160
Zero and one are incomparable as are every other pair of constants.

32
00:02:02,160 --> 00:02:06,600
So you have bottom at the bottom, you have all the constants in the middle and they're incomparable.

33
00:02:06,600 --> 00:02:09,560
And then bigger than everything else is top.

34
00:02:09,560 --> 00:02:17,319
Now, with the ordering defined, there's a useful operation we can define on collections of

35
00:02:17,319 --> 00:02:18,319
elements.

36
00:02:18,319 --> 00:02:22,639
And then we can define the least upper bound or love.

37
00:02:22,639 --> 00:02:28,479
And this, what this means is taking the smallest element that is bigger than everything in

38
00:02:28,479 --> 00:02:29,840
the least upper bound.

39
00:02:29,840 --> 00:02:37,079
So for example, if I have the least upper bound of bottom and one, that is equal to one.

40
00:02:37,079 --> 00:02:44,799
If I have the least upper bound of top and bottom, that is equal to top.

41
00:02:44,800 --> 00:02:49,160
And perhaps more interesting one, the least upper bound of one and two.

42
00:02:49,160 --> 00:02:52,800
So two incomparable constants here.

43
00:02:52,800 --> 00:02:57,200
And remember the meaning of the least upper bound is the smallest element in the ordering

44
00:02:57,200 --> 00:03:00,840
that's bigger than everything over which we're taking the least upper bound.

45
00:03:00,840 --> 00:03:03,640
So we just have two things here in our least upper bound.

46
00:03:03,640 --> 00:03:07,760
But the least upper bound of one and two, the smallest thing that's bigger than both

47
00:03:07,760 --> 00:03:13,200
of them or greater than or equal, I should say, to both of them is top.

48
00:03:13,599 --> 00:03:17,959
So the least upper bound then, if you think about it, if you draw our picture again,

49
00:03:17,959 --> 00:03:22,439
so we had bottom and we had top.

50
00:03:22,439 --> 00:03:25,599
And if you pick out some points here, let's say we want to take the least upper bound of

51
00:03:25,599 --> 00:03:29,799
bottom and two, you're just picking the smallest thing that's bigger than both.

52
00:03:29,799 --> 00:03:32,959
Well, that's going to be two itself, similarly two in top.

53
00:03:32,959 --> 00:03:33,679
You will get top.

54
00:03:33,679 --> 00:03:36,879
And if you have anything that's incomparable, then you have to pick something that's bigger

55
00:03:36,879 --> 00:03:37,560
than both of them.

56
00:03:37,560 --> 00:03:42,479
In this case, that will always end up being top for this very simple ordering.

57
00:03:42,799 --> 00:03:47,840
Then given this idea of a least upper bound, it turns out that rules one through four,

58
00:03:47,840 --> 00:03:51,000
all they're doing is computing the least upper bound.

59
00:03:51,000 --> 00:03:58,399
So the in of a statement is just equal to the least upper bound of the out of all the

60
00:03:58,399 --> 00:03:59,679
predecessors.

61
00:03:59,679 --> 00:04:02,439
And that's all that rules one through four was saying.

62
00:04:02,439 --> 00:04:06,159
And if you remember what we had there, we had, we have a bunch of predecessors and

63
00:04:06,159 --> 00:04:08,519
then there's some kind of statement S.

64
00:04:08,560 --> 00:04:15,280
And all we're doing is whatever the information is on these predecessors, we're just taking

65
00:04:15,280 --> 00:04:17,960
the least upper bound over it.

66
00:04:17,960 --> 00:04:25,000
And that is the information on entry to S.

67
00:04:25,000 --> 00:04:30,040
The ordering on abstract values also helps to clarify another important aspect of our analysis

68
00:04:30,040 --> 00:04:32,960
algorithm, which is why it terminates.

69
00:04:32,959 --> 00:04:39,519
So remember that the algorithm's termination condition is to repeatedly apply the rules

70
00:04:39,519 --> 00:04:44,159
until nothing changes, until there's no more inconsistencies in the control flow graph

71
00:04:44,159 --> 00:04:47,039
and there's no information left to update.

72
00:04:47,039 --> 00:04:50,839
Well just because we say we're going to repeat until nothing changes, that doesn't guarantee

73
00:04:50,839 --> 00:04:52,279
that eventually nothing changes.

74
00:04:52,279 --> 00:04:57,199
It could be that that goes on forever, that we always introduce new inconsistencies with

75
00:04:57,199 --> 00:05:02,919
every update and we never actually get to the point where all the information is consistent.

76
00:05:02,920 --> 00:05:07,960
So the ordering actually shows why that can't happen and the algorithm is guaranteed to

77
00:05:07,960 --> 00:05:08,960
terminate.

78
00:05:08,960 --> 00:05:13,240
So remember that every program point except the entry point, the values start as bottom.

79
00:05:13,240 --> 00:05:17,640
So they start at the lowest place in the ordering.

80
00:05:17,640 --> 00:05:22,439
And then if you look carefully at the rules, it's easy to see that the rules can only make

81
00:05:22,439 --> 00:05:24,400
the values increase at a program point.

82
00:05:24,400 --> 00:05:31,280
So bottom can be promoted, can be changed at a given program point up to some constant.

83
00:05:31,279 --> 00:05:36,359
And another update could raise that constant to top.

84
00:05:36,359 --> 00:05:40,759
But of course, once we get to top, there's no greater element and if the rules can only make

85
00:05:40,759 --> 00:05:46,519
the elements increase, then eventually we have to run out of elements that can be increased.

86
00:05:46,519 --> 00:05:53,279
So what that says is that each piece of information we're computing, for every statement, for

87
00:05:53,279 --> 00:05:58,479
every variable and for either in or out, it can change it most twice.

88
00:05:58,480 --> 00:06:01,160
So it can go from bottom to a constant, and from constant to a top.

89
00:06:01,160 --> 00:06:06,240
But after that, it will never be updated again.

90
00:06:06,240 --> 00:06:10,640
And what this means is that the constant propagation algorithm that we've described is actually

91
00:06:10,640 --> 00:06:12,319
linear in program size.

92
00:06:12,319 --> 00:06:17,200
So the number of steps is going to be bounded by the number of C values that we're trying

93
00:06:17,200 --> 00:06:20,920
to compute times two because each one of those could change two times.

94
00:06:20,920 --> 00:06:26,840
And since there's one value for the entry and exit over the in and out of every statement,

95
00:06:26,839 --> 00:06:30,959
the total number of steps that the algorithm could possibly take is the number of program

96
00:06:30,959 --> 00:06:32,279
statements times four.

