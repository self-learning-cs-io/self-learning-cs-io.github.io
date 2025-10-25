---
title: CS143 P120Week917 05 B+Reference+Counting
---

1
00:00:00,000 --> 00:00:04,320
We're now ready to wrap up our discussion of automatic memory management.

2
00:00:04,320 --> 00:00:07,360
And so I just want to make a few high level points here.

3
00:00:07,360 --> 00:00:12,400
First of all, there's no question that automatic memory management is a great thing.

4
00:00:12,400 --> 00:00:18,839
It prevents very serious storage bugs, some of the most difficult bugs in programming.

5
00:00:18,839 --> 00:00:24,920
And when you're writing in a garbage collected language, you really have just a whole class

6
00:00:24,920 --> 00:00:26,760
of things you don't have to worry about.

7
00:00:26,760 --> 00:00:30,240
And so it is certainly a more productive way to program.

8
00:00:30,240 --> 00:00:37,320
So if your problem, if your program is really a good fit for automatic memory management,

9
00:00:37,320 --> 00:00:42,280
then you'd be crazy not to use a system that provided that kind of support.

10
00:00:42,280 --> 00:00:46,960
Now, the disadvantage of a Mank-Mank Management is that it reduces program or control.

11
00:00:46,960 --> 00:00:51,320
So you don't have control anymore over the layout of data and memory.

12
00:00:51,320 --> 00:00:54,680
And you don't have control over when the memory is deallicated.

13
00:00:54,679 --> 00:00:57,920
So you neither have control over where the data is in memory.

14
00:00:57,920 --> 00:01:04,400
And you have only a very limited amount of control over how much memory your program is using.

15
00:01:04,400 --> 00:01:05,400
Okay?

16
00:01:05,400 --> 00:01:11,879
And so if these two things don't matter, if your application is not extremely data intensive,

17
00:01:11,879 --> 00:01:17,560
where the precise layout of data in memory and how much data is residing in memory is important,

18
00:01:17,560 --> 00:01:19,760
then garbage selection will likely work very well.

19
00:01:19,760 --> 00:01:25,320
But there are applications, particularly high end data processing and scientific applications,

20
00:01:25,320 --> 00:01:30,240
which use a lot of data and need to make very, very efficient use of the memory,

21
00:01:30,240 --> 00:01:36,480
where garbage collection actually becomes too inefficient to do a good job.

22
00:01:36,480 --> 00:01:40,560
And people in those domains still use manual memory management.

23
00:01:40,560 --> 00:01:42,200
But there are some other issues.

24
00:01:42,200 --> 00:01:46,400
So in real time applications, the pauses can be problematic.

25
00:01:46,400 --> 00:01:50,400
So if you have a program that needs to meet guaranteed deadlines,

26
00:01:50,400 --> 00:01:53,880
many embedded systems that are interacting with the outside world,

27
00:01:53,880 --> 00:01:57,800
say controlling dangerous machinery and things like that,

28
00:01:57,800 --> 00:02:04,000
they have to have response times that are guaranteed to make sure that nothing terrible happens.

29
00:02:04,000 --> 00:02:11,680
And introducing a automatic memory management system that my pauses for arbitrary amounts of time

30
00:02:11,680 --> 00:02:14,200
makes that a very problematic thing to guarantee.

31
00:02:14,199 --> 00:02:18,519
So you don't always see garbage collection used in real time applications,

32
00:02:18,519 --> 00:02:26,280
although there has been a lot of progress in the last several years on real time garbage collectors.

33
00:02:26,280 --> 00:02:29,879
Another issue that every programmer who uses automatic management,

34
00:02:29,879 --> 00:02:33,319
probably will have to face, is the problem of memory leaks.

35
00:02:33,319 --> 00:02:38,879
So while automatic memory management prevents you from corrupting your memory,

36
00:02:38,879 --> 00:02:43,120
it really doesn't prevent you from hanging on to too much data

37
00:02:43,120 --> 00:02:47,680
and possibly affecting the performance of your program dramatically.

38
00:02:47,680 --> 00:02:50,840
So memory leaks are possible in garbage collected languages,

39
00:02:50,840 --> 00:02:52,799
and I would say they're even likely.

40
00:02:52,799 --> 00:02:57,240
I'd say that the fact that you're not as aware or not as forced to be as aware

41
00:02:57,240 --> 00:03:01,840
of how the memory is being used makes it easier to have memory leaks.

42
00:03:01,840 --> 00:03:06,240
And the kind of memory leak that you will have in say a Java program

43
00:03:06,240 --> 00:03:13,280
is that you'll have some variable say x that points to some data structure

44
00:03:13,280 --> 00:03:15,439
and this data structure is gigantic.

45
00:03:15,439 --> 00:03:20,080
So let's say that this is the abstract syntax tree in a compiler.

46
00:03:20,080 --> 00:03:21,120
All right.

47
00:03:21,120 --> 00:03:27,600
Now there may come a point in the computation where you don't need the abstract syntax tree anymore.

48
00:03:27,600 --> 00:03:31,439
So let's say that we have converted to an intermediate language

49
00:03:31,439 --> 00:03:35,360
and from the abstract syntax tree and now all of our processing

50
00:03:35,360 --> 00:03:39,440
for the rest of the compilation is going to be on the intermediate language representation

51
00:03:39,440 --> 00:03:40,560
and generating code from that.

52
00:03:40,560 --> 00:03:43,480
And we never go back and look at the abstract syntax tree again.

53
00:03:43,480 --> 00:03:48,080
Well, the compiler, I mean, excuse me, the garbage collector doesn't know

54
00:03:48,080 --> 00:03:50,880
that you're not going to use the abstract syntax tree again in the future.

55
00:03:50,880 --> 00:03:54,720
And if you have a variable that's pointing to this gigantic data structure,

56
00:03:54,720 --> 00:04:00,000
and if you're not using it, it's going to hang around and it's going to be using up memory.

57
00:04:00,000 --> 00:04:02,880
And so the right thing to do is when you reach a point in the program,

58
00:04:02,879 --> 00:04:07,680
we are not going to use this data structure anymore, is to assign x to null value.

59
00:04:07,680 --> 00:04:11,120
You want to assign x to null at that point.

60
00:04:11,120 --> 00:04:14,079
I mean, essentially dropping this pointer to the data structure.

61
00:04:14,079 --> 00:04:16,560
And now the garbage collector, whatever form it is,

62
00:04:16,560 --> 00:04:18,800
mark and sweep, stop and copy, reference counting,

63
00:04:18,800 --> 00:04:23,120
will be able to see that this is no longer reachable and will collect that big structure.

64
00:04:23,120 --> 00:04:29,199
And this is very, very common in production Java programs to have these kinds of memory leaks,

65
00:04:29,199 --> 00:04:34,800
where you just have pointers that you forgot about to data that you're no longer going to use.

66
00:04:38,319 --> 00:04:40,159
So as I hope I have conveyed in the last few lectures,

67
00:04:40,159 --> 00:04:42,079
garbage collection is a very important technique.

68
00:04:42,079 --> 00:04:46,719
Every programmer should be aware of its benefits and costs.

69
00:04:46,719 --> 00:04:51,039
And it's also a very interesting aspect of programming language implementation.

70
00:04:51,759 --> 00:04:55,759
There are much more advanced garbage collection algorithms than we've discussed in these lectures.

71
00:04:56,480 --> 00:05:00,240
Primary dimensions along which people have thought about improving garbage collection,

72
00:05:00,240 --> 00:05:01,839
or is making garbage collection concurrent.

73
00:05:02,639 --> 00:05:07,039
And that means allowing the program to continue to run while the collection is happening.

74
00:05:07,039 --> 00:05:11,599
So the collector is working in the background actively while the program is running.

75
00:05:12,480 --> 00:05:18,240
Another thing that's very common actually in production collectors is to have what's called a

76
00:05:18,240 --> 00:05:24,240
generational collector. And the basic idea here is that we don't want to keep

77
00:05:24,960 --> 00:05:29,920
going over looking at objects that are very long lived on every collection.

78
00:05:29,920 --> 00:05:34,639
So collections happen very frequently and there will be some objects that just live for a very

79
00:05:34,639 --> 00:05:39,759
long time, the big data structures that hang around for most of the program. And once we've seen them...

