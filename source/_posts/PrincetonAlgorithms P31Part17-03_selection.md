---
title: PrincetonAlgorithms P31Part17 03_selection
---

1
00:00:00,000 --> 00:00:06,360
Now we'll look at a problem that's related to sorting called selection.

2
00:00:06,360 --> 00:00:09,439
It's also well solved by quicksword partitioning.

3
00:00:09,439 --> 00:00:13,200
This is a simpler problem.

4
00:00:13,200 --> 00:00:16,120
We're given an array of n items that are ordered,

5
00:00:16,120 --> 00:00:20,039
and our task is to find the kth largest.

6
00:00:20,039 --> 00:00:22,800
There's lots of important applications for this.

7
00:00:22,800 --> 00:00:25,160
So like if we wanted to find the minimum item,

8
00:00:25,160 --> 00:00:29,160
that's k equals 0, or the maximum item that's k equals n minus 1,

9
00:00:29,160 --> 00:00:32,480
or the median that's k equals n over 2.

10
00:00:32,480 --> 00:00:34,759
And there's many kinds of applications

11
00:00:34,759 --> 00:00:37,519
when people processing data want to find the top k,

12
00:00:37,519 --> 00:00:40,600
or the median, or other order statistics.

13
00:00:40,600 --> 00:00:43,960
So that's what selection is all about.

14
00:00:43,960 --> 00:00:48,280
Now here's an example where we want to use theory as a guide.

15
00:00:48,280 --> 00:00:53,000
What kind of efficiency might we expect in a selection algorithm?

16
00:00:53,000 --> 00:00:56,439
Well, first of all, it's easy to see that we can solve selection

17
00:00:56,439 --> 00:00:57,719
and in-log n time.

18
00:00:57,719 --> 00:00:59,280
How would we do that?

19
00:00:59,280 --> 00:01:02,799
Well, we just sort the array, and then if we want to find the smallest,

20
00:01:02,799 --> 00:01:04,560
you look in the first position or the largest,

21
00:01:04,560 --> 00:01:09,439
you look in the last position, or the median, you look in the middle.

22
00:01:09,439 --> 00:01:13,680
In fact, if k is small, the running time

23
00:01:13,680 --> 00:01:16,799
is going to be proportional to n.

24
00:01:16,799 --> 00:01:18,480
Because if you're looking for the smallest,

25
00:01:18,480 --> 00:01:23,200
you can just go through the array and find the smallest in one pass

26
00:01:23,200 --> 00:01:23,920
through.

27
00:01:23,920 --> 00:01:26,960
Or for two, you find it in two passes through.

28
00:01:26,959 --> 00:01:31,159
And so you can imagine trying to look for a selection algorithm

29
00:01:31,159 --> 00:01:34,280
that takes time proportional to n.

30
00:01:34,280 --> 00:01:38,199
And also, the lower bound is n, because you have to look at everything.

31
00:01:38,199 --> 00:01:39,559
If you don't look at everything, you

32
00:01:39,559 --> 00:01:43,319
might miss the one item that you're looking for.

33
00:01:43,319 --> 00:01:47,239
So from these observations, it's clear

34
00:01:47,239 --> 00:01:53,280
that what we'd like is a selection algorithm that takes linear time.

35
00:01:53,280 --> 00:01:56,199
But at this point, the question is,

36
00:01:56,200 --> 00:01:59,520
is there a linear time algorithm that works for every k?

37
00:01:59,520 --> 00:02:03,760
Or possibly selection is as hard as sorting.

38
00:02:03,760 --> 00:02:08,719
This kind of question plagued a lot of people

39
00:02:08,719 --> 00:02:15,039
in the late 60s, early 70s as these types of problems

40
00:02:15,039 --> 00:02:18,000
emerged for computing applications.

41
00:02:18,000 --> 00:02:22,280
So it's an interesting question to think about, for sure.

42
00:02:22,280 --> 00:02:28,719
Well, in his original paper in 1961,

43
00:02:28,719 --> 00:02:33,879
Hoar gave a solution to the selection problem based on partitioning.

44
00:02:33,879 --> 00:02:38,960
And the idea is just a version of Quicksword in a way.

45
00:02:38,960 --> 00:02:40,920
We're going to do our partitioning so that we

46
00:02:40,920 --> 00:02:43,920
get entry A of J in place in the array.

47
00:02:43,920 --> 00:02:45,759
Nobody to the left is larger.

48
00:02:45,759 --> 00:02:47,879
Nobody to the right is bigger.

49
00:02:47,879 --> 00:02:50,039
But then when we're doing selection,

50
00:02:50,039 --> 00:02:53,679
what we'll do is just go in one sub array or the other,

51
00:02:53,679 --> 00:02:55,679
depending on where J is.

52
00:02:55,679 --> 00:02:57,719
If J is equal to k, we're done.

53
00:02:57,719 --> 00:02:59,959
We found the k to largest.

54
00:02:59,959 --> 00:03:05,120
If k is to the left of J, then we just do the left subfile.

55
00:03:05,120 --> 00:03:08,159
We just set height to j minus 1.

56
00:03:08,159 --> 00:03:12,560
And if k is to the right of J, we just do the right subfile,

57
00:03:12,560 --> 00:03:14,120
set load to j plus 1.

58
00:03:14,120 --> 00:03:16,919
And that's all this code does.

59
00:03:16,919 --> 00:03:19,519
You could do it with a recursive call,

60
00:03:19,520 --> 00:03:23,240
but this just does it by resetting the values of the parameters.

61
00:03:23,240 --> 00:03:24,920
Do one partition.

62
00:03:24,920 --> 00:03:27,800
Then check whether your k-th element is

63
00:03:27,800 --> 00:03:30,520
going to be in the left part or the right part.

64
00:03:30,520 --> 00:03:32,960
Reset lower, high, accordingly.

65
00:03:32,960 --> 00:03:36,160
If it's equal, then you found it and you return it.

66
00:03:36,160 --> 00:03:42,480
And you keep going until you get to a point where you have only one element.

67
00:03:42,480 --> 00:03:48,320
That's the Quicksword-like implementation

68
00:03:48,319 --> 00:03:49,680
solving the selection problem.

69
00:03:49,680 --> 00:03:54,359
Notice again that it depends on the random shuffle at the beginning.

70
00:03:54,359 --> 00:03:57,799
That's going to be important for performance.

71
00:03:57,799 --> 00:04:01,239
All right, so there needs to be a mathematical analysis

72
00:04:01,239 --> 00:04:06,840
to characterize the running time of this program.

73
00:04:06,840 --> 00:04:10,519
And the fact is that Quicks select this method

74
00:04:10,519 --> 00:04:13,639
takes linear time on the average.

75
00:04:13,639 --> 00:04:15,199
We won't give the full proof.

76
00:04:15,199 --> 00:04:17,480
It's actually quite a bit more complicated

77
00:04:17,480 --> 00:04:19,920
than the one just done for Quicksword.

78
00:04:19,920 --> 00:04:23,480
But intuitively, we can see kind of what happens.

79
00:04:23,480 --> 00:04:28,480
Each partitioning step maybe splits the array approximately in half.

80
00:04:28,480 --> 00:04:31,920
So that means you'd have, if it did exactly in half,

81
00:04:31,920 --> 00:04:36,080
you'd have n plus over 2 plus n over 4 and so forth,

82
00:04:36,080 --> 00:04:39,920
which adds up to about 2n compare, so linear cost.

83
00:04:39,920 --> 00:04:46,600
If you do that, it actually doesn't cut it in half exactly each time only on average.

84
00:04:46,600 --> 00:04:50,800
So you need a fuller analysis like the one we did for Quicksword.

85
00:04:50,800 --> 00:04:55,640
And the bottom line of that analysis gives the number of comparisons required

86
00:04:55,640 --> 00:05:00,520
as a function of n and of k in terms of this formula here.

87
00:05:00,520 --> 00:05:06,360
And if you plug in k equals n over 2, you get the result

88
00:05:06,360 --> 00:05:09,840
that the number of compares required to find the median.

89
00:05:09,840 --> 00:05:16,439
And that's the highest value this formula can take is 2 plus 2 natural log of 2.

90
00:05:16,439 --> 00:05:22,480
So linear time to find the kth largest for any value of k.

91
00:05:22,480 --> 00:05:27,680
Now again, this is a method that's linear time on the average.

92
00:05:27,680 --> 00:05:31,000
It's actually going to be quadratic in the worst case.

93
00:05:31,000 --> 00:05:34,360
But again, the chance that will happen with a random shuffle

94
00:05:34,360 --> 00:05:37,639
is less than the chance that we'll be struck by lightning.

95
00:05:37,639 --> 00:05:41,439
It's a probabilistic guaranteed fast algorithm.

96
00:05:41,439 --> 00:05:44,560
Now, from a theoretical standpoint,

97
00:05:44,560 --> 00:05:46,800
that's a little unsatisfied.

98
00:05:46,800 --> 00:05:52,000
And in 1973, there's a famous paper that

99
00:05:52,000 --> 00:05:56,199
found a compare-based selection algorithm that guarantees

100
00:05:56,199 --> 00:05:58,920
to solve the problem in linear time.

101
00:05:58,920 --> 00:06:02,639
This was a real landmark in the theory of algorithms.

102
00:06:02,639 --> 00:06:06,240
Because for a long time, it was not known.

103
00:06:06,240 --> 00:06:09,199
We knew we could have the average case be linear time.

104
00:06:09,199 --> 00:06:10,959
But could we find a worst case?

105
00:06:10,959 --> 00:06:14,000
And this paper found such a construction.

106
00:06:14,000 --> 00:06:18,800
Now, in practice, this construction is rather high.

107
00:06:18,800 --> 00:06:21,360
So the method's not really used in practice.

108
00:06:21,360 --> 00:06:28,199
And so there is still the goal of a fast guaranteed linear time selection

109
00:06:28,199 --> 00:06:34,279
algorithm that maybe somebody in this class will invent someday.

110
00:06:34,279 --> 00:06:37,639
This is another example where we use theory as a guide.

111
00:06:37,639 --> 00:06:42,319
It's still worthwhile to look for a practical linear time worst case

112
00:06:42,319 --> 00:06:42,819
algorithm.

113
00:06:42,819 --> 00:06:45,519
Maybe somebody in this class will invent that.

114
00:06:45,519 --> 00:06:48,439
But until something like that is discovered,

115
00:06:48,439 --> 00:06:52,639
use the quick select based on quicksort partitioning.

116
00:06:52,639 --> 00:06:57,519
And you can get linear time selection when you don't need a full sort.

117
00:06:57,519 --> 00:07:00,439
That's selection, a simple problem like sorting that

118
00:07:00,439 --> 00:07:02,759
is well solved with quicksort partitioning.

