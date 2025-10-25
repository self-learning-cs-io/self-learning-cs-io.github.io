---
title: CS143 P102Week815 02 Constant Propagation
---

1
00:00:00,000 --> 00:00:08,919
In this video, we're going to continue our discussion of global data flow analysis by taking

2
00:00:08,919 --> 00:00:16,240
a look at how global constant propagation works in detail.

3
00:00:16,240 --> 00:00:20,920
To begin, let's review what the conditions are to do global constant propagation.

4
00:00:20,920 --> 00:00:25,719
So to replace a use of a variable x by a constant k, we have to know the following property

5
00:00:25,719 --> 00:00:32,000
that on every path to the use of x, the last assignment to the variable x is x equals

6
00:00:32,000 --> 00:00:33,000
the constant k.

7
00:00:33,000 --> 00:00:40,039
And this has to be true again on every path to the use of x.

8
00:00:40,039 --> 00:00:44,599
Now global constant propagation can be performed at any point where this property holds.

9
00:00:44,599 --> 00:00:49,560
What we're going to look at in this video is the case of computing the property for a single

10
00:00:49,560 --> 00:00:53,280
variable x at all program points.

11
00:00:53,280 --> 00:00:56,679
So we're going to focus on one variable x and we're going to compute whether it's a

12
00:00:56,679 --> 00:00:59,120
constant at every program point.

13
00:00:59,120 --> 00:01:03,880
It's easy to extend the algorithm to compute this property for all variables.

14
00:01:03,880 --> 00:01:08,879
One very simple but inefficient way to do that is to just repeat the computation once for

15
00:01:08,879 --> 00:01:15,120
each variable in the method body.

16
00:01:15,120 --> 00:01:20,400
The way we're going to compute the information that we want is to associate one of the following

17
00:01:20,400 --> 00:01:25,320
values with the variable x at every point in the program.

18
00:01:25,320 --> 00:01:29,160
And let's start with the last one here.

19
00:01:29,160 --> 00:01:36,880
We will assign x this special value here which is pronounced top if x is not a constant.

20
00:01:36,880 --> 00:01:41,240
So if we can't figure out whether x is a constant at a particular point in the program,

21
00:01:41,240 --> 00:01:44,400
then we'll just say x is top at that point.

22
00:01:44,400 --> 00:01:48,200
And this is going to be our safe situation.

23
00:01:48,200 --> 00:01:52,640
It's always okay to say we don't know what the value of x is.

24
00:01:52,640 --> 00:01:57,480
And when we say that x has a value top and we say we were essentially saying we don't

25
00:01:57,480 --> 00:02:02,080
know whether x is a constant or not at this point the program x could have any value.

26
00:02:02,080 --> 00:02:07,960
Now another possibility is that we will say that x is some constant c.

27
00:02:07,960 --> 00:02:09,960
So this is a particular constant.

28
00:02:09,960 --> 00:02:14,000
And if we say that x is a constant c at a program point, that means in fact at that program

29
00:02:14,000 --> 00:02:20,639
point we believe or we have proven that x is always that constant.

30
00:02:20,639 --> 00:02:27,199
Now there is a third possibility which is not immediately intuitive perhaps but as we

31
00:02:27,199 --> 00:02:33,240
will see plays a very important role in algorithms for global constant propagation.

32
00:02:33,240 --> 00:02:36,120
In fact in all global data flow analyses.

33
00:02:36,120 --> 00:02:37,840
And that is bottom.

34
00:02:37,840 --> 00:02:38,840
Okay.

35
00:02:38,840 --> 00:02:45,400
So the first value is pronounced bottom intuitively the idea anyway that is kind of the opposite

36
00:02:45,400 --> 00:02:46,400
of top.

37
00:02:46,400 --> 00:02:47,400
All right.

38
00:02:47,400 --> 00:02:52,680
And the interpretation of bottom is going to be that this statement never executes.

39
00:02:52,680 --> 00:02:53,680
All right.

40
00:02:53,680 --> 00:03:00,520
So when we don't know whether a statement is even executed at all, we will say that x

41
00:03:00,520 --> 00:03:06,080
at that point has a value bottom meaning that as far as we know that point in the program

42
00:03:06,080 --> 00:03:07,080
is never reached.

43
00:03:07,080 --> 00:03:11,640
It doesn't matter what the value of x is at that point because that statement never executes.

44
00:03:11,640 --> 00:03:12,640
All right.

45
00:03:12,640 --> 00:03:18,320
So we are going to assign x one of these three kinds of values either bottom, some constant

46
00:03:18,320 --> 00:03:21,600
or top.

47
00:03:21,600 --> 00:03:24,280
Let's begin by working through an example by hand.

48
00:03:24,280 --> 00:03:30,040
And our goal is going to be for every program point to decide whether x could be a constant,

49
00:03:30,040 --> 00:03:34,960
definitely not a constant or whether we think that statement might not ever execute.

50
00:03:34,960 --> 00:03:35,960
Okay.

51
00:03:35,960 --> 00:03:40,920
So execution will begin at the top of this control flow graph.

52
00:03:40,920 --> 00:03:42,480
So this is the entry point.

53
00:03:42,480 --> 00:03:46,480
And before execution begins, we don't know anything about the value of x.

54
00:03:46,480 --> 00:03:52,240
So I'm not making any assumptions about what code came before this basic block.

55
00:03:52,240 --> 00:03:57,760
And so to be safe, I will say that at this point x has some unknown value.

56
00:03:57,760 --> 00:04:00,080
We don't know the value of x is it could be anything.

57
00:04:00,080 --> 00:04:06,600
So x is equal to top is the property that we want entry to the first basic block.

58
00:04:06,600 --> 00:04:12,360
Now, after the assignment x equals three, means indicate there, what point we're talking

59
00:04:12,360 --> 00:04:13,360
about.

60
00:04:13,360 --> 00:04:16,960
So after the assignment x is equal to three, definitely we'll know that x is the constant

61
00:04:16,960 --> 00:04:17,960
three.

62
00:04:17,960 --> 00:04:18,960
All right.

63
00:04:18,960 --> 00:04:21,840
Now there's something here that's worth pointing out, which is that our program points,

64
00:04:21,840 --> 00:04:29,280
the points that we're attaching this knowledge to or these facts to are in between the statements.

65
00:04:29,279 --> 00:04:34,159
So when I say x is equal to three, at this program point, what I mean is that after this

66
00:04:34,159 --> 00:04:36,879
assignment has executed x is equal to three.

67
00:04:36,879 --> 00:04:43,199
But before this predicate of the conditional has executed, I know that x is equal to three.

68
00:04:43,199 --> 00:04:44,199
Okay.

69
00:04:44,199 --> 00:04:46,719
So program points are in between statements.

70
00:04:46,719 --> 00:04:50,599
And there's a program point before and after every statement.

71
00:04:50,599 --> 00:04:51,599
All right.

72
00:04:51,599 --> 00:04:54,239
So the next thing that happens is this conditional branch.

73
00:04:54,239 --> 00:04:58,039
Notice that the branch doesn't update x, doesn't even refer to x.

74
00:04:58,040 --> 00:05:03,480
So after the branch executes, we'll definitely know that x is still equal to three on both

75
00:05:03,480 --> 00:05:04,480
branches.

76
00:05:04,480 --> 00:05:05,480
All right.

77
00:05:05,480 --> 00:05:06,480
Now let's do the right hand branch.

78
00:05:06,480 --> 00:05:09,040
The next thing that happens is an assignment to y.

79
00:05:09,040 --> 00:05:10,360
That will not affect the value of x.

80
00:05:10,360 --> 00:05:15,240
So after the assignment to y, we'll still know that x is equal to three.

81
00:05:15,240 --> 00:05:16,240
All right.

82
00:05:16,240 --> 00:05:18,520
Now let's take a look at the left hand branch.

83
00:05:18,520 --> 00:05:21,400
So the first thing that happens over here is another assignment to y.

84
00:05:21,400 --> 00:05:23,439
Well, that won't affect the value of x.

85
00:05:23,439 --> 00:05:26,879
So after the assignment to y, we'll know that x is still equal to three.

86
00:05:26,879 --> 00:05:28,800
And now comes an assignment to x.

87
00:05:28,800 --> 00:05:29,800
All right.

88
00:05:29,800 --> 00:05:33,560
So after this assignment happens at this program point, we're going to know that the value

89
00:05:33,560 --> 00:05:34,560
of x is different.

90
00:05:34,560 --> 00:05:37,600
We're going to know now that x is equal to four.

91
00:05:37,600 --> 00:05:38,600
All right.

92
00:05:38,600 --> 00:05:41,519
So now after this statement, we know x is equal to four.

93
00:05:41,519 --> 00:05:44,839
And after this statement over here, we know x is equal to three.

94
00:05:44,839 --> 00:05:45,839
All right.

95
00:05:45,839 --> 00:05:50,279
Now what do we know then about what happens before this statement?

96
00:05:50,279 --> 00:05:51,279
Okay.

97
00:05:51,279 --> 00:05:52,759
The a equals two times x.

98
00:05:52,759 --> 00:05:53,759
And I just want to point out here.

99
00:05:53,759 --> 00:05:57,439
I said that there's a program point before and after every statement.

100
00:05:57,439 --> 00:06:03,079
And so this program point here, which is before this assignment to a, is different from

101
00:06:03,079 --> 00:06:08,279
the program points that are after x is equal to four and y is equal to zero.

102
00:06:08,279 --> 00:06:12,719
So intuitively, after x is equal to four, we know that we're still on this path over

103
00:06:12,719 --> 00:06:14,279
here on the left.

104
00:06:14,279 --> 00:06:18,279
And so we know that x is equal to zero.

