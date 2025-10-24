---
title: PrincetonAlgorithms P47Part111 02_1d Range Search
---

1
00:00:00,000 --> 00:00:05,000
Welcome back.

2
00:00:05,000 --> 00:00:10,400
Today we're going to take a look at a number of interesting applications of symbol tables

3
00:00:10,400 --> 00:00:17,480
in the binary search tree data structure to address problems with processing geometric

4
00:00:17,480 --> 00:00:19,039
data.

5
00:00:19,039 --> 00:00:21,160
So let's take a look at it.

6
00:00:21,160 --> 00:00:26,480
The idea is that we're going to be talking about geometric objects, not simple keys like

7
00:00:26,480 --> 00:00:28,440
strings and numbers.

8
00:00:28,440 --> 00:00:30,839
So here's an example.

9
00:00:30,839 --> 00:00:37,400
So say your geometric objects are points in the plane and you specify a rectangle that's

10
00:00:37,400 --> 00:00:41,760
oriented with the horizontal vertical axes.

11
00:00:41,760 --> 00:00:45,520
And you might want to ask which points are inside the rectangle or how many points are

12
00:00:45,520 --> 00:00:47,520
inside the rectangle.

13
00:00:47,520 --> 00:00:51,240
Or maybe what you're processing is rectangles.

14
00:00:51,240 --> 00:00:56,880
You have a set of rectangles and we want to know which of these rectangles intersect

15
00:00:56,880 --> 00:01:00,400
or how many rectangle intersections are there.

16
00:01:00,400 --> 00:01:05,680
These are interesting problems that have lots and lots of applications from computer-rated

17
00:01:05,680 --> 00:01:15,560
design to games and movies and also in abstractions such as databases and other situations where

18
00:01:15,560 --> 00:01:19,920
you might have multiple keys or multiple dimensions.

19
00:01:19,920 --> 00:01:25,719
And it's a very interesting extension of the ideas that we've looked at for symbol tables

20
00:01:25,799 --> 00:01:29,000
for all sorts of familiar applications.

21
00:01:29,000 --> 00:01:35,439
And surprisingly, binary search trees and associated algorithms that we've looked at are going

22
00:01:35,439 --> 00:01:40,879
to provide very efficient solutions to a number of important problems in this area and really

23
00:01:40,879 --> 00:01:49,280
have enabled new developments and new technology in all of these kinds of applications.

24
00:01:49,280 --> 00:01:53,200
So to get started, we're going to look at a simple problem called one-dimensional range

25
00:01:53,200 --> 00:01:58,280
search and it really forms the basis for what we're going to do.

26
00:01:58,280 --> 00:02:04,960
It's a little bit of an extension of the ordered symbol table API that we gave before and

27
00:02:04,960 --> 00:02:10,240
we're going to have the operations range search and range count.

28
00:02:10,240 --> 00:02:17,199
So one-dimensional just means we have one key so we'll insert a key value pair as before.

29
00:02:17,199 --> 00:02:22,039
And what we want to do is be able to search for a key and the value associated with it.

30
00:02:22,039 --> 00:02:24,039
We're going to be able to delete.

31
00:02:24,039 --> 00:02:27,599
But then we want these operations range search and range count.

32
00:02:27,599 --> 00:02:34,039
So find all the keys that are between two given keys or give how many keys are there between

33
00:02:34,039 --> 00:02:35,639
two given keys.

34
00:02:35,639 --> 00:02:43,280
So for this example at right, we have insert a number of keys and we're just showing them

35
00:02:43,280 --> 00:02:45,359
in sorted order.

36
00:02:45,359 --> 00:02:50,599
But then you might say, well, how many keys are there that are between G and K?

37
00:02:50,639 --> 00:02:53,280
In this case, there's just two.

38
00:02:53,280 --> 00:02:58,879
And then the client might say, well, what are those keys you want to be able to return them?

39
00:02:58,879 --> 00:03:03,000
And this is a very common operation, say in databases.

40
00:03:03,000 --> 00:03:10,359
You want to return how many taxpayers have salaries between 1 million and 10 million.

41
00:03:10,359 --> 00:03:13,000
And then which ones are there and so forth.

42
00:03:13,000 --> 00:03:18,199
So range searching is a very important fundamental operation.

43
00:03:18,199 --> 00:03:25,280
Now in geometric interpretation, we just think of the keys as points on a line.

44
00:03:25,280 --> 00:03:31,039
And so the key values, well, are just specific points on a line.

45
00:03:31,039 --> 00:03:34,719
We might convert the letters to numbers or we might keys might be numbers.

46
00:03:34,719 --> 00:03:40,719
And then what we're looking for is to find or count the points in a given interval in one

47
00:03:40,719 --> 00:03:42,799
dimension.

48
00:03:42,800 --> 00:03:45,560
So how we're going to implement that?

49
00:03:45,560 --> 00:03:51,360
Well, this is a basic problem that is very similar to our symbol table problem.

50
00:03:51,360 --> 00:03:55,760
We might consider keeping the things in an unordered array.

51
00:03:55,760 --> 00:03:57,200
Just put them in an array.

52
00:03:57,200 --> 00:04:02,600
And then while insertion is fast, we just add it to the end of the array.

53
00:04:02,600 --> 00:04:06,439
We might have to use resizing to make the array grow.

54
00:04:06,439 --> 00:04:12,400
But this is unattractive because for large numbers of keys, in order to count the keys that

55
00:04:12,400 --> 00:04:16,879
fall within a given range, you have to go through all the keys and test whether they're

56
00:04:16,879 --> 00:04:18,959
in the range or not.

57
00:04:18,959 --> 00:04:20,480
And to return them the same way.

58
00:04:20,480 --> 00:04:25,519
So take linear time for large number of keys.

59
00:04:25,519 --> 00:04:35,480
If you keep the things in order, like in a binary search situation, then to insert in order

60
00:04:35,480 --> 00:04:40,120
to keep it in order in an array, you might need to move the larger ones over one position

61
00:04:40,120 --> 00:04:45,480
and so forth, or elementary implementation of binary search when we did symbol tables,

62
00:04:45,480 --> 00:04:46,560
not did this.

63
00:04:46,560 --> 00:04:52,439
So the insertion time might be linear, but then you can use binary search to look for the

64
00:04:52,439 --> 00:04:57,120
two end points that's only going to take time proportional to log n.

65
00:04:57,120 --> 00:05:03,040
And then from that, you could figure out how many keys there are or return them all between

66
00:05:03,040 --> 00:05:07,639
the index, the lowest one, and the range, index, the highest one, and the range.

67
00:05:07,639 --> 00:05:15,319
So those elementary implementations are not acceptable for large numbers of keys because

68
00:05:15,319 --> 00:05:18,240
they have the linear time operations.

69
00:05:18,240 --> 00:05:26,599
So what we really want is to have time proportional to log n for insert and for counting.

70
00:05:26,599 --> 00:05:31,360
For range search, of course, we have to touch every key that we return, so the running

71
00:05:31,360 --> 00:05:36,199
time is going to be proportional to the number of keys that match.

72
00:05:36,199 --> 00:05:43,800
But anyway, those are reasonable goals and they're easy to achieve.

73
00:05:43,800 --> 00:05:52,800
So for example, what about one dimensional range counting?

74
00:05:52,800 --> 00:05:58,959
Well, what we're going to do is just keep the keys in a binary search tree.

75
00:05:58,959 --> 00:06:04,680
We looked at the implementation of the rank function for binary search trees where for every

76
00:06:04,680 --> 00:06:10,680
key we can compute how many keys are there that are strictly less than that key.

77
00:06:10,680 --> 00:06:15,560
So in this case, the rank of E is 2 and H is 3 and so forth.

78
00:06:15,560 --> 00:06:21,399
So in a binary search tree, those rank numbers go in increasing order as we do in an order

79
00:06:21,399 --> 00:06:22,759
traversal.

80
00:06:22,759 --> 00:06:28,800
And that's easy to compute, either keep that rank tree as a field or keep a field which

81
00:06:28,800 --> 00:06:35,079
has the size of the tree and it's easy to compute the rank from that.

82
00:06:35,079 --> 00:06:39,520
So how many keys between say E and S?

83
00:06:39,520 --> 00:06:52,600
Well, 1, 2, 3, 4, 5, it's actually just the difference between the ranks plus 1 if the

84
00:06:52,600 --> 00:06:59,600
high entry in the range query is in the table and not plus 1 if we're.

85
00:06:59,600 --> 00:07:05,600
So there's the same number of keys between E and S as there are between E and T, 5,

86
00:07:05,600 --> 00:07:07,600
between F and T there's only 4.

87
00:07:07,600 --> 00:07:18,800
So that's a really 1D range count is a very easy computation to perform in log time with

88
00:07:18,800 --> 00:07:21,879
the binary search tree.

89
00:07:21,879 --> 00:07:28,600
And a number of nodes examine when we do a search is the length of the search path to

90
00:07:28,600 --> 00:07:35,240
low plus the length search path to high to find their ranks and that's going to be time

91
00:07:35,240 --> 00:07:38,480
proportional to log N.

92
00:07:38,480 --> 00:07:47,279
So in range search, well, we just do a recursive search and to find all the keys between low

93
00:07:47,279 --> 00:07:51,000
and high, you look in the left sub tree.

94
00:07:51,000 --> 00:07:56,120
If any of them could fall in the range, you look at the current node and you look in the

95
00:07:56,120 --> 00:07:59,920
right sub tree if any of them could fall in the range.

96
00:07:59,920 --> 00:08:04,079
And it's easy to tell whether any of them could fall in the range by just checking whether

97
00:08:04,079 --> 00:08:08,279
the range overlaps the root or not.

98
00:08:08,279 --> 00:08:15,160
So if we're looking for all the keys between F and T, then we have to look in both subtrees

99
00:08:15,160 --> 00:08:17,040
of the root S.

100
00:08:17,040 --> 00:08:21,720
So we don't have to look at the left sub tree of E because all of those are less than

101
00:08:21,720 --> 00:08:27,160
E and therefore are less than F. So we don't have to look there.

102
00:08:27,160 --> 00:08:33,759
But otherwise, it's a simple modification of recursive tree search to find all the keys.

103
00:08:33,759 --> 00:08:38,000
And it's easy to see that the running time of that is going to be proportional to the

104
00:08:38,000 --> 00:08:44,920
number of keys return plus log N. So that's one dimensional range search using binary search

105
00:08:44,919 --> 00:08:45,559
trees.

