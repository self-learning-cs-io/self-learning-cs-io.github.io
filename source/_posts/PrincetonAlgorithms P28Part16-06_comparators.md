---
title: PrincetonAlgorithms P28Part16 06_comparators
---

1
00:00:00,000 --> 00:00:07,919
Next, we'll take a look at comparators, which is a Java mechanism that helps us sort

2
00:00:07,919 --> 00:00:12,160
the same data on different sort keys, in different orders.

3
00:00:12,160 --> 00:00:14,240
And you're familiar with this.

4
00:00:14,240 --> 00:00:19,800
Your music library, maybe at one point you sort it by the artist's name, in this case,

5
00:00:19,800 --> 00:00:22,400
we're looking at the bees.

6
00:00:22,400 --> 00:00:26,140
But in another situation, you might want to sort it by song names to look through it by

7
00:00:26,140 --> 00:00:27,640
song names.

8
00:00:27,640 --> 00:00:31,400
That's the same data using different sort keys.

9
00:00:31,400 --> 00:00:36,799
How do we arrange to do something as natural as this in our Java sorts?

10
00:00:36,799 --> 00:00:43,399
Now we used before, in order to be able to implement sorts that can sort any type of data,

11
00:00:43,399 --> 00:00:46,480
we used Java's comparable interface.

12
00:00:46,480 --> 00:00:51,560
And the concept is that there's some natural ordering of the data that you'll want to use

13
00:00:51,560 --> 00:00:52,560
most of the time.

14
00:00:52,560 --> 00:00:56,519
That's what the comparable interface is all about.

15
00:00:56,520 --> 00:01:02,120
But there's a different interface called the comparator interface, which is a way to

16
00:01:02,120 --> 00:01:08,240
help us sort using some alternate order or many different orders on the same data.

17
00:01:08,240 --> 00:01:14,560
In the comparator interface, again, just says that it's going to implement a method

18
00:01:14,560 --> 00:01:20,960
compare that compares two different keys of a given type of the generic type.

19
00:01:20,960 --> 00:01:24,320
Again, it has to be a total order.

20
00:01:24,319 --> 00:01:28,159
And this is very familiar, for example, with strings.

21
00:01:28,159 --> 00:01:30,879
There's many different ways that we might want to sort strings.

22
00:01:30,879 --> 00:01:36,959
We might want to use the natural alphabetic order, or we might want to make it case insensitive,

23
00:01:36,959 --> 00:01:41,759
or maybe there's different languages that have different rules of the ordering.

24
00:01:41,759 --> 00:01:46,399
We're sorting strings, but we're implementing a different ordering, various different

25
00:01:46,399 --> 00:01:48,679
orderings on that same data.

26
00:01:48,679 --> 00:01:53,159
That's what the comparator interfaces for.

27
00:01:53,159 --> 00:02:03,479
So the Java system sort will have a different method to implement comparators.

28
00:02:03,479 --> 00:02:08,240
The idea is that you create a comparator object, and then pass that as a second argument

29
00:02:08,240 --> 00:02:10,280
to Java's sort routine.

30
00:02:10,280 --> 00:02:13,319
We can do the same thing for our sorts.

31
00:02:13,319 --> 00:02:18,319
The idea is we want to decouple the definition of the data type from the definition of what

32
00:02:18,319 --> 00:02:21,879
it means to compare two items of that type.

33
00:02:21,879 --> 00:02:26,639
For the natural order, we had to put the definition of compare two within the data type.

34
00:02:26,639 --> 00:02:31,519
With comparators, we can do that outside of the data type, even at some later time.

35
00:02:31,519 --> 00:02:36,319
Strings were defined as part of the Java system, but we can define our own ordering on strings

36
00:02:36,319 --> 00:02:39,879
with a comparator.

37
00:02:39,879 --> 00:02:46,919
So in our sort implementations, we can change them as shown in this example to support comparators.

38
00:02:46,919 --> 00:02:51,680
To support comparators in our sort implementations, we'll pass an array of objects instead

39
00:02:51,680 --> 00:02:57,480
of array of comparable, and then as a second argument, pass a comparator.

40
00:02:57,480 --> 00:03:04,240
Then the less method will take that comparator as an argument, and it's the one that actually

41
00:03:04,240 --> 00:03:07,640
invokes the method compare of two different keys.

42
00:03:07,640 --> 00:03:11,240
This is a straightforward modification to our sorts.

43
00:03:11,240 --> 00:03:15,640
Then exchange, of course, rather than doing comparable, has to use object.

44
00:03:15,640 --> 00:03:20,159
So with these straightforward changes, add the comparator as argument to the sort and

45
00:03:20,159 --> 00:03:24,520
to the last in make our array to be sort of array of objects.

46
00:03:24,520 --> 00:03:30,439
It's easy to convert any of our implementations to support comparators.

47
00:03:30,439 --> 00:03:35,439
To implement a comparator, you can use this code as a model.

48
00:03:35,439 --> 00:03:38,840
I won't go through it all in detail.

49
00:03:38,840 --> 00:03:45,719
Just to point out that this implements two different comparators as nested classes, say

50
00:03:45,719 --> 00:03:51,639
for this fictional class student, that's got two instance variables name and section.

51
00:03:51,639 --> 00:03:56,840
In the first one called by name, implements a comparator for students, and when you compare

52
00:03:56,840 --> 00:04:02,400
two students by name, it's going to use the string compare to method.

53
00:04:02,400 --> 00:04:08,199
If you're going to implement it, compare two students by section, then it'll return just

54
00:04:08,199 --> 00:04:15,479
the difference of the sections, which is minus if less, 0 if equal, and plus if greater.

55
00:04:15,479 --> 00:04:22,079
And this code is straightforward way to implement comparators that you can use as a model if

56
00:04:22,079 --> 00:04:29,519
you need to be able to sort data on two different keys.

57
00:04:29,519 --> 00:04:35,759
So here's just an example of what happens.

58
00:04:35,759 --> 00:04:42,439
If with those implemented comparators for that class student using the Java system sort,

59
00:04:42,439 --> 00:04:47,800
if you call a raised that sort, with your array of students and you give it this by name

60
00:04:47,800 --> 00:04:53,079
comparator, it'll put them in order, alphabetical order, by the name field.

61
00:04:53,079 --> 00:04:57,800
And if you give it the by section comparator, it'll put them in order by the second field,

62
00:04:57,800 --> 00:05:04,519
very convenient for all kinds of data processing applications.

63
00:05:04,519 --> 00:05:08,680
And we came up with that before when we were talking about using a sort for the gram

64
00:05:08,680 --> 00:05:16,600
scan, we needed to have a comparison for points that orders them by the polar angle they

65
00:05:16,600 --> 00:05:22,560
may make with a given point P. That's what we needed for the gram scan algorithm for the convex

66
00:05:22,560 --> 00:05:24,040
hull.

67
00:05:24,040 --> 00:05:27,759
Points are defined data type for geometric objects.

68
00:05:27,759 --> 00:05:33,759
And so what we need is code that'll compute the polar angle and use that as the basis for

69
00:05:33,759 --> 00:05:35,759
comparison.

70
00:05:35,759 --> 00:05:44,800
There's an easy way to do this based on CCW that is described here in this text.

71
00:05:44,800 --> 00:05:49,839
Most of the time all you need to do is do the CCW of the two points.

72
00:05:49,839 --> 00:05:58,319
But you do have to check whether one of the points is above P and the other one is below.

73
00:05:58,319 --> 00:06:04,360
But otherwise usually it's CCW call in this code, which again I won't go through in detail,

74
00:06:04,360 --> 00:06:08,360
because it's an implementation of a comparator for two D points.

75
00:06:08,360 --> 00:06:13,400
It implements the compare method that takes two points as argument, and with just a little

76
00:06:13,400 --> 00:06:16,840
bit of calculation it's able to do the compare.

77
00:06:16,840 --> 00:06:24,560
So this code is the basis for applying the system sort method or any sort method for the

78
00:06:24,560 --> 00:06:30,319
gram scan for the complex hull that we did at the end of the last lecture.

79
00:06:30,319 --> 00:06:35,599
So that's the basis for the gram scan method for the complex hull that we used at the

80
00:06:35,599 --> 00:06:37,480
last, at the end of the last lecture.

