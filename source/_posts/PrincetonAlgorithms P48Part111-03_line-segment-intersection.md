---
title: PrincetonAlgorithms P48Part111 03_line Segment Intersection
---

1
00:00:00,000 --> 00:00:08,439
So now let's look at a basic geometric data processing problem of determining intersections

2
00:00:08,439 --> 00:00:11,339
among a set of line segments.

3
00:00:11,339 --> 00:00:16,679
So it's called the orthogonal line segment intersection search where the line segments

4
00:00:16,679 --> 00:00:20,359
are constrained to be either horizontal or vertical.

5
00:00:20,359 --> 00:00:25,679
And so suppose we have a large number of such line segments and what we want to do is

6
00:00:25,679 --> 00:00:29,600
be able to find all places where they intersect.

7
00:00:29,600 --> 00:00:34,840
And as we'll see this extends to practical problem in a number of situations.

8
00:00:34,840 --> 00:00:39,079
So in this case there's four places where these lines intersect.

9
00:00:39,079 --> 00:00:45,120
So how are we going to be able to determine these intersections efficiently?

10
00:00:45,120 --> 00:00:52,200
Now the natural algorithm or the naive brute force algorithm is quadratic in time.

11
00:00:52,200 --> 00:00:57,040
So that is for every line segment you check whether it intersects with every other line

12
00:00:57,040 --> 00:00:58,640
segment.

13
00:00:58,640 --> 00:01:04,599
And again as we know such an algorithm is not going to be practical for huge numbers

14
00:01:04,599 --> 00:01:07,200
of line segments.

15
00:01:07,200 --> 00:01:17,760
So just to simplify our code in these slides, it's often the case for geometric data processing.

16
00:01:17,760 --> 00:01:24,680
We have to worry about degeneracies where lots of things have the same x or y coordinate.

17
00:01:24,680 --> 00:01:29,000
Just to simplify the code and to get at the main principles of the algorithms, we're

18
00:01:29,000 --> 00:01:34,280
going to assume that all the coordinates that we have are distinct, that we've pre-processed

19
00:01:34,280 --> 00:01:40,280
in some way to remove the ones that not touch without intersecting.

20
00:01:40,280 --> 00:01:45,600
So the method that we're going to look at is a so-called sweep line algorithm.

21
00:01:45,599 --> 00:01:52,599
The idea is to think of a vertical line that sweeps from left to right through the data

22
00:01:52,599 --> 00:02:01,439
and to consider it as every time it hits some line segment as an event where we have to

23
00:02:01,439 --> 00:02:02,719
do something.

24
00:02:02,719 --> 00:02:08,919
So sweeping from left to right means we consider each x coordinate as an event.

25
00:02:08,919 --> 00:02:17,039
So first thing is if we hit a horizontal line segment, we're going to hit the left endpoint

26
00:02:17,039 --> 00:02:18,039
first.

27
00:02:18,039 --> 00:02:25,479
And so what we'll do when we hit the left endpoint is insert the y coordinate of that line

28
00:02:25,479 --> 00:02:28,159
into a binary search tree.

29
00:02:28,159 --> 00:02:32,359
So we're going to keep track of y coordinates in a binary search tree.

30
00:02:32,359 --> 00:02:35,359
So that's what's happening over in the right there.

31
00:02:35,360 --> 00:02:40,120
So now again, sweep from left to right, what's the next smallest x coordinate?

32
00:02:40,120 --> 00:02:44,720
In this case, it's the line number one there and we'll remember it's y coordinate in a

33
00:02:44,720 --> 00:02:46,960
binary search tree.

34
00:02:46,960 --> 00:02:50,680
And then two in three.

35
00:02:50,680 --> 00:02:55,440
So that's one kind of event that can happen as we sweep from left to right.

36
00:02:55,440 --> 00:03:00,840
Another kind of event is that we hit the right endpoint of a horizontal line segment.

37
00:03:00,840 --> 00:03:04,560
In this case, we hit the right endpoint of line segment two.

38
00:03:04,560 --> 00:03:10,439
So at that point, the right endpoint of a horizontal line segment, we just remove it because

39
00:03:10,439 --> 00:03:13,000
we've processed that line completely.

40
00:03:13,000 --> 00:03:16,280
In this case, we didn't find any intersections.

41
00:03:16,280 --> 00:03:22,319
So left endpoint, insert the y coordinate into a BST, right endpoint, remove that y coordinate

42
00:03:22,319 --> 00:03:23,960
from the BST.

43
00:03:23,960 --> 00:03:32,280
So the BST contains the y coordinates of all the horizontal lines that currently might

44
00:03:32,280 --> 00:03:34,520
involve an intersection.

45
00:03:34,520 --> 00:03:39,480
And then the third kind of event is what happens when we hit a vertical line segment.

46
00:03:39,480 --> 00:03:46,780
Well, in that case, all we want need to do is just do a range search for the interval of

47
00:03:46,780 --> 00:03:48,920
y endpoints.

48
00:03:48,920 --> 00:03:56,320
So any point that's inside that interval is going to represent a horizontal line segment that

49
00:03:56,320 --> 00:03:58,280
is an intersection.

50
00:03:58,280 --> 00:04:03,360
That's the basic idea behind the sweep line algorithm to find intersections in sets of

51
00:04:03,360 --> 00:04:06,760
horizontal and vertical lines.

52
00:04:06,760 --> 00:04:11,040
And it's actually a very simple algorithm.

53
00:04:11,040 --> 00:04:17,400
And it's very easy to see that the running time is going to be proportional to N log N plus

54
00:04:17,400 --> 00:04:25,560
the number of intersections returned, where there's N horizontal and vertical line segments.

55
00:04:25,560 --> 00:04:27,720
And it's in a couple of ways to implement it.

56
00:04:27,720 --> 00:04:31,319
One thing is you could sort, according to the x coordinates, or you could just put them

57
00:04:31,319 --> 00:04:34,000
all on a priority queue.

58
00:04:34,000 --> 00:04:42,360
And then, so that's going to take N log N for every one of the lines to process them all,

59
00:04:42,360 --> 00:04:46,719
either end to build a priority queue and then log N to take the smallest off each time or

60
00:04:46,719 --> 00:04:49,439
N log N for the sort.

61
00:04:49,439 --> 00:04:56,439
And then putting the y coordinates into a binary search tree is again N log N. And same

62
00:04:56,439 --> 00:04:57,439
for deleting.

63
00:04:57,439 --> 00:05:00,160
Each point has to be inserted deleted.

64
00:05:00,160 --> 00:05:06,519
There could be as many N in the tree for each one, so it's a total of N log N.

65
00:05:06,519 --> 00:05:13,800
And then the range search in the binary tree for each one of the range searches might take

66
00:05:13,800 --> 00:05:20,519
log N, might be as many as N. And then there's plus the number of points returned.

67
00:05:20,519 --> 00:05:28,000
So that's a quick sketch of the proof of this proposition.

68
00:05:28,000 --> 00:05:36,839
And with that 1D range search implementation, we get an efficient N log N 2D orthogonal

69
00:05:36,839 --> 00:05:39,359
line segment intersection algorithm.

