---
title: PrincetonAlgorithms P24Part15 07_convex Hull
---

1
00:00:00,000 --> 00:00:07,320
Now we'll look at an application of sorting from the field of computational geometry for

2
00:00:07,320 --> 00:00:12,880
an interesting computation.

3
00:00:12,880 --> 00:00:18,320
If you have a set of end points in the plane, there's a geometric object called the convex

4
00:00:18,320 --> 00:00:24,679
hull, which is the smallest polygon that encloses all the points.

5
00:00:24,679 --> 00:00:29,760
There's the convex hull for that set of points.

6
00:00:29,760 --> 00:00:32,679
There's a lot of equivalent definitions of this.

7
00:00:32,679 --> 00:00:36,760
Some of them very mathematical that extend the higher dimensions.

8
00:00:36,760 --> 00:00:41,920
It's the smallest convex set that contain all the points, the smallest area, convex polygon

9
00:00:41,920 --> 00:00:43,320
and closing the points.

10
00:00:43,320 --> 00:00:48,359
It's a convex polygon that encloses the points whose vertices are points in the set and

11
00:00:48,359 --> 00:00:51,920
those are all equivalent definitions.

12
00:00:51,920 --> 00:00:56,480
What we want to do is, given a set of points, we're going to have a program that can give

13
00:00:56,479 --> 00:01:00,239
us the convex hull.

14
00:01:00,239 --> 00:01:05,840
Now what should the output of such a method be?

15
00:01:05,840 --> 00:01:12,920
Well in order to be able to work with the result, it should be a sequence of vertices that

16
00:01:12,920 --> 00:01:16,920
gives us that polygon if we follow it.

17
00:01:16,920 --> 00:01:22,640
If we've got some points that are on the boundary but aren't really vertices, they shouldn't

18
00:01:22,640 --> 00:01:24,640
be included.

19
00:01:24,640 --> 00:01:32,920
This points out examples of how difficult computational geometry can sometimes be because

20
00:01:32,920 --> 00:01:36,599
degenerate cases like this are difficult to deal with in code.

21
00:01:36,599 --> 00:01:40,519
We're not going to spend a lot of time on this in this lecture.

22
00:01:40,519 --> 00:01:47,480
But it's something always to be aware of when trying to apply simple algorithms and situations

23
00:01:47,480 --> 00:01:52,079
like this that turn out to be maybe more sophisticated than we might think.

24
00:01:52,079 --> 00:01:59,079
Oh yeah, got you.

25
00:01:59,079 --> 00:02:08,400
Well, there's actually a way to compute the convex hull just mechanically.

26
00:02:08,400 --> 00:02:12,759
If you put nails around the points and put a rubber band around it, that gives you the

27
00:02:12,759 --> 00:02:14,680
convex hull.

28
00:02:14,680 --> 00:02:18,759
Now we're not going to be able to implement that in a computer program.

29
00:02:18,759 --> 00:02:22,599
But it's surprising how well we can do.

30
00:02:22,599 --> 00:02:26,439
Here's an application where people want to compute the convex hull.

31
00:02:26,439 --> 00:02:31,599
Suppose you have a robot that wants to get from S to T and there's an obstacle that's

32
00:02:31,599 --> 00:02:34,199
defined by some polygon.

33
00:02:34,199 --> 00:02:40,799
You want to be able to go around the obstacle and it turns out that the shortest path,

34
00:02:40,799 --> 00:02:46,599
either it's a straight line from S to T or it's part of the convex hull and it's not

35
00:02:46,599 --> 00:02:49,519
hard to see why that might be true.

36
00:02:49,519 --> 00:02:53,479
On this plenty of other applications where people want to be able to compute the convex

37
00:02:53,479 --> 00:02:55,719
hull.

38
00:02:55,719 --> 00:02:56,719
Here's another application.

39
00:02:56,719 --> 00:03:01,400
If you want to find the pair of points that are the farthest apart in a set of points

40
00:03:01,400 --> 00:03:07,599
in the plane, this is sometimes important in statistical calculations or other applications.

41
00:03:07,599 --> 00:03:08,599
They're on the convex hull.

42
00:03:08,599 --> 00:03:12,599
If you have the convex hull, this computation is easy.

43
00:03:13,239 --> 00:03:17,000
You're left to get to see in the first case and you go right to get to see in the second

44
00:03:17,000 --> 00:03:18,000
case.

45
00:03:18,000 --> 00:03:22,479
We want to do a computation that distinguishes this.

46
00:03:22,479 --> 00:03:26,840
This computation would be pretty easy except for the degeneracies.

47
00:03:26,840 --> 00:03:30,719
What do you want to count it if they're all on the same line?

48
00:03:30,719 --> 00:03:33,439
Or if the slope is in infinity.

49
00:03:33,439 --> 00:03:38,719
You have to just be aware that these situations have to be dealt with.

50
00:03:38,719 --> 00:03:43,359
The code isn't quite as simple as you might come up with in the first instance that you

51
00:03:43,359 --> 00:03:45,360
try.

52
00:03:45,360 --> 00:03:50,719
There's degeneracies to deal with in floating point precision.

53
00:03:50,719 --> 00:03:55,400
People, researchers in computational geometry have worked this out.

54
00:03:55,400 --> 00:04:04,280
Actually, there's not that much code at all in the end involved.

55
00:04:04,280 --> 00:04:06,800
This is a slide that gives the math.

56
00:04:06,800 --> 00:04:08,439
I want to talk through this math.

57
00:04:08,439 --> 00:04:12,840
If you're interested in implementing this, you can come back to this slide.

58
00:04:12,840 --> 00:04:19,680
It's essentially based on the idea of computing the slopes of the lines between A and B,

59
00:04:19,680 --> 00:04:26,800
between A and C, and comparing them to decide whether you're turning counterclockwise or

60
00:04:26,800 --> 00:04:29,319
clockwise.

61
00:04:29,319 --> 00:04:36,080
This is the specific math that gets that implemented.

62
00:04:36,079 --> 00:04:42,599
This is if we implement a point data type for computational geometry, it can have a method

63
00:04:42,599 --> 00:04:54,159
CCW that just with this little math calculation, B-X-A-X times C-D-Y-Y minus B-D-Y, this calculation

64
00:04:54,159 --> 00:05:04,519
here gives you immediately whether it's counterclockwise or collinear, not much code at all.

65
00:05:04,519 --> 00:05:10,599
And that method is the basis for the gram scan.

66
00:05:10,599 --> 00:05:17,000
The gram scan uses a sort where we give two different ways to sort the points.

67
00:05:17,000 --> 00:05:20,120
And it uses a pushdown stack for the hull.

68
00:05:20,120 --> 00:05:27,079
It puts the points on the hull and it goes ahead and for every point, considering them

69
00:05:27,079 --> 00:05:34,479
in the order of the polar sort, it'll compare whether the top two points on the

70
00:05:34,480 --> 00:05:40,319
hull and the new point implement a CCW turn or not.

71
00:05:40,319 --> 00:05:44,680
And if it's not at the CCW turn, it pops it and continues going.

72
00:05:44,680 --> 00:05:50,319
Very little code to implement the convex hull given that you have a sort.

73
00:05:50,319 --> 00:05:54,720
And that's our main point for this lecture.

74
00:05:54,720 --> 00:06:00,200
There's many natural applications of sorting, but also we'll be able to develop new algorithms

75
00:06:00,199 --> 00:06:05,479
that use sorts, that gain efficiency because of the efficiency of sorting.

