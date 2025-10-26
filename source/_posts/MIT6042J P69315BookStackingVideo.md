---
title: MIT6042J P69315BookStackingVideo
---

1
00:00:00,000 --> 00:00:05,879
So now we'll look at a third kind of sum that comes up all the time called harmonic sums,

2
00:00:05,879 --> 00:00:10,720
and we'll begin by examining an example where they come up really directly.

3
00:00:10,720 --> 00:00:12,919
So here's the puzzle.

4
00:00:12,919 --> 00:00:18,080
Suppose that I'm trying to stack a bunch of books on a table, assume all the books are

5
00:00:18,080 --> 00:00:23,679
the same size and weight and uniform, and I'd like to stack them up one on top of the other

6
00:00:23,679 --> 00:00:29,960
in some way, and try to get them as far out past the end of the table as I can manage.

7
00:00:29,960 --> 00:00:32,679
Now notice in this picture it seems kind of paradoxical.

8
00:00:32,679 --> 00:00:38,600
The top book, the back end of the top book is past the edge of the table.

9
00:00:38,600 --> 00:00:40,120
Is it possible to do that?

10
00:00:40,120 --> 00:00:46,240
Is it possible to get the top book, the back of the top book past the edge of the table,

11
00:00:46,240 --> 00:00:50,880
and how far out can you get the further most book to the right?

12
00:00:50,880 --> 00:00:52,880
That's the question we want to ask.

13
00:00:52,880 --> 00:00:58,159
Well, let's go back and do it for the simplest case, which is one book.

14
00:00:58,159 --> 00:01:03,959
So this amount will be a function of how many books we have or interested in the overhang

15
00:01:03,959 --> 00:01:04,959
using end books.

16
00:01:04,959 --> 00:01:11,359
Overhang is the amount past the edge of the table that the right most end of any book can

17
00:01:11,359 --> 00:01:12,359
be.

18
00:01:12,359 --> 00:01:13,359
Okay.

19
00:01:13,359 --> 00:01:14,759
What do you do with one book?

20
00:01:14,759 --> 00:01:18,479
Well, with one book, assuming that the thing is uniform, the center of mass is in the middle.

21
00:01:18,479 --> 00:01:21,199
Let's assume the book is a length one.

22
00:01:21,199 --> 00:01:24,239
So the center of mass of the book is at halfway down the book.

23
00:01:24,239 --> 00:01:29,079
And if that center of mass is not over the table, then you're going to have torque and

24
00:01:29,079 --> 00:01:31,159
the book is going to fall.

25
00:01:31,159 --> 00:01:34,799
So you've got to keep the center of mass supported.

26
00:01:34,799 --> 00:01:38,879
And the way to get the largest overhang is to have the center of mass right at the edge

27
00:01:38,879 --> 00:01:40,679
of the table here.

28
00:01:40,679 --> 00:01:46,239
And in that case, you can get the book to stick out half a book length without falling.

29
00:01:46,239 --> 00:01:51,439
And what that tells us is that the one book overhang is a half.

30
00:01:51,439 --> 00:01:57,200
The first little balance with the furthest end out exactly at the center of mass is on

31
00:01:57,200 --> 00:01:58,280
the edge.

32
00:01:58,280 --> 00:02:01,159
And I get a half a book length for unit overhang.

33
00:02:01,159 --> 00:02:02,159
All right.

34
00:02:02,159 --> 00:02:05,239
Let's proceed recursively or inductively.

35
00:02:05,239 --> 00:02:06,759
Suppose I have end books.

36
00:02:06,759 --> 00:02:08,280
How am I going to get them to balance?

37
00:02:08,280 --> 00:02:13,079
Well, let's assume that I figured out how to get a so-called stable stack of end books,

38
00:02:13,079 --> 00:02:18,079
which if I completely supported it flat on the table, it wouldn't fall over.

39
00:02:18,080 --> 00:02:21,480
And I'm going to show you how to go from end to end plus one, which is how you construct

40
00:02:21,480 --> 00:02:25,360
an arbitrarily large stack of books that won't fall over.

41
00:02:25,360 --> 00:02:30,439
Well, if the stack of completely resting on the table won't fall over, that means that

42
00:02:30,439 --> 00:02:37,160
if I have the center of mass of it past the edge of the table, by definition of the center

43
00:02:37,160 --> 00:02:41,520
of mass, there's going to be an equal amount of weight on both sides of the center of mass,

44
00:02:41,520 --> 00:02:45,439
and the thing is going to fall off the edge of the table by the same reasoning as we did

45
00:02:45,439 --> 00:02:46,800
for one book.

46
00:02:46,800 --> 00:02:53,800
So the stable end stack, stable in the sense that it won't fall over of itself if it was

47
00:02:53,800 --> 00:02:55,280
lying completely over the table.

48
00:02:55,280 --> 00:03:00,680
In fact, it won't fall over as long as its center of mass is over the table and to get

49
00:03:00,680 --> 00:03:06,960
the furthest amount to the right, what I'm going to do is put it at the edge of the table.

50
00:03:06,960 --> 00:03:07,960
Okay.

51
00:03:07,960 --> 00:03:14,080
So now I know how to place a stable stack of end books to get the largest overhang out of

52
00:03:14,080 --> 00:03:15,080
it.

53
00:03:15,080 --> 00:03:21,280
But next, well, let's consider n plus 1 books and what do I have to do?

54
00:03:21,280 --> 00:03:22,720
So I'm trying to do the same deal.

55
00:03:22,720 --> 00:03:26,920
Suppose that I have a nice stack of end books and I know how to support it so it won't

56
00:03:26,920 --> 00:03:28,680
tip over.

57
00:03:28,680 --> 00:03:32,080
And I now have n plus 1 books and I want to get out further.

58
00:03:32,080 --> 00:03:33,240
What do I have to do?

59
00:03:33,240 --> 00:03:37,800
Well, by the basic reasoning that we just went through, now the center of mass of the

60
00:03:37,800 --> 00:03:41,280
whole stack of n plus 1 books has to be over the edge of the table.

61
00:03:41,280 --> 00:03:42,960
That's the way I'm going to get out the furthest.

62
00:03:42,960 --> 00:03:47,460
So I know where the center of mass of n plus books are going to be at the edge of the

63
00:03:47,460 --> 00:03:48,460
table.

64
00:03:48,460 --> 00:03:49,460
Okay.

65
00:03:49,460 --> 00:03:52,319
What about the center of mass of the top n books?

66
00:03:52,319 --> 00:03:54,080
Well, I need them to be supported.

67
00:03:54,080 --> 00:03:56,760
I need their center of mass to be supported.

68
00:03:56,760 --> 00:03:57,760
They'll be supported.

69
00:03:57,760 --> 00:04:01,439
Providing their center of mass is over the bottom book somewhere.

70
00:04:01,439 --> 00:04:06,480
And the way to get it out furthest is to have it over the right edge of the bottom book.

71
00:04:06,479 --> 00:04:13,679
So I'm going to put the center of mass of the top n books at the edge of the n plus

72
00:04:13,679 --> 00:04:16,639
first book here.

73
00:04:16,639 --> 00:04:20,879
And that means that the incremental overhang that I get the increase in overhang that I

74
00:04:20,879 --> 00:04:23,319
get by adding one more book.

75
00:04:23,319 --> 00:04:25,480
We can call the delta overhang.

76
00:04:25,480 --> 00:04:30,879
And it's the distance between the center of mass of n plus 1 books and the center of mass

77
00:04:30,879 --> 00:04:34,920
of n books and here and n plus 1 here.

78
00:04:35,640 --> 00:04:37,040
Well, let's see what's going on.

79
00:04:37,040 --> 00:04:42,840
The center of mass of the n books is at some location here and the center of mass of

80
00:04:42,840 --> 00:04:50,040
the bottom book is halfway away, half a book length away from where the n books are

81
00:04:50,040 --> 00:04:52,759
balanced on the edge of the bottom book.

82
00:04:52,759 --> 00:04:55,080
So the center of mass of the n books is here.

83
00:04:55,080 --> 00:04:57,360
The center of mass of the bottom book is there.

84
00:04:57,360 --> 00:05:00,280
The distance between them is 1 half.

85
00:05:00,279 --> 00:05:06,519
I need the table to be at the balance point between the n books and the 1 book.

86
00:05:06,519 --> 00:05:09,559
That's where the center of mass of the n plus 1 books will be.

87
00:05:09,559 --> 00:05:11,079
So I need to calculate a amount.

88
00:05:11,079 --> 00:05:13,119
That's going to be the increase in overhang.

89
00:05:13,119 --> 00:05:15,159
So let's abstract it a little bit.

90
00:05:15,159 --> 00:05:20,519
The delta overhang is the distance from the n book to the n plus 1 book centers of mass.

91
00:05:20,519 --> 00:05:24,799
And if we think of this as a balancing diagram, there's the n books or at least there's

92
00:05:24,799 --> 00:05:26,519
the center of mass of the n books.

93
00:05:26,519 --> 00:05:28,279
There's the center of mass of the 1 book.

94
00:05:28,279 --> 00:05:31,000
There's distance 1 half apart, which we said.

95
00:05:31,000 --> 00:05:33,519
And they have to balance at the edge of the table.

96
00:05:33,519 --> 00:05:36,799
So think of the edge of the table as the pivot point.

97
00:05:36,799 --> 00:05:37,799
And it's there.

98
00:05:37,799 --> 00:05:40,399
And I need to calculate where is that pivot point?

99
00:05:40,399 --> 00:05:47,000
How do I get this fulcrum, or this balance beam to balance with weight n here and weight

100
00:05:47,000 --> 00:05:50,560
one there when there are total length apart as a half?

101
00:05:50,560 --> 00:05:52,240
What's this distance?

102
00:05:52,240 --> 00:05:54,759
That distance is the delta that I'm trying to calculate.

103
00:05:54,759 --> 00:06:02,959
Now you just know from physics that the balance point is going to be the distance of half divided

104
00:06:02,959 --> 00:06:07,399
by the sum of n and n plus 1.

105
00:06:07,399 --> 00:06:12,079
I need the n times this amount to equal 1 times that amount.

106
00:06:12,079 --> 00:06:18,199
And if you check that out, it means that delta is a half over n plus 1, or simplifying

107
00:06:18,199 --> 00:06:20,639
1 over twice n plus 1.

108
00:06:20,639 --> 00:06:25,439
You should stare at that diagram a little bit and remember your elementary physics to realize

109
00:06:25,439 --> 00:06:28,919
the reasoning behind the formula for delta.

110
00:06:28,919 --> 00:06:29,919
OK.

111
00:06:29,919 --> 00:06:31,319
Well, now I'm done.

112
00:06:31,319 --> 00:06:34,839
Because basically I've just figured out that the increase is this delta overhang.

113
00:06:34,839 --> 00:06:35,919
And now I know what it is.

114
00:06:35,919 --> 00:06:39,079
It's 1 over twice n plus 1.

115
00:06:39,079 --> 00:06:44,680
And so what I can conclude is that the overhang of n books be 1 is a half.

116
00:06:44,680 --> 00:06:49,680
And bn plus 1 is bn plus 1 over twice n plus 1.

117
00:06:49,680 --> 00:06:54,280
So this is a recursive definition of bn, but it's easy to see how it unwinds.

118
00:06:54,280 --> 00:07:07,360
It means that bn is a half plus 1 1 1 half of 1 plus 1 1 1 plus 1 1 half of 3 plus 1 and

119
00:07:07,360 --> 00:07:08,360
so on.

120
00:07:08,360 --> 00:07:16,079
If I factor out the half, bn is 1 1 plus 1 1 plus 1 1 plus 1 3rd out through 1 over n.

121
00:07:16,079 --> 00:07:17,079
OK.

122
00:07:17,079 --> 00:07:18,879
That sum is the harmonic sum.

123
00:07:18,879 --> 00:07:24,040
The sum 1 plus 1 half up through 1 over n is called hn or the harmonic sum.

124
00:07:24,040 --> 00:07:28,759
And what we've figured out or really the harmonic number is the value of that sum.

125
00:07:28,759 --> 00:07:35,879
And b, what we figured out is that bn, the amount that I can get n books out past the edge

126
00:07:35,879 --> 00:07:39,000
of the table, is hn over 2.

