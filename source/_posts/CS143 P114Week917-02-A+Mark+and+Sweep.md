---
title: CS143 P114Week917 02 A+Mark+and+Sweep
---

1
00:00:00,000 --> 00:00:07,759
In this video, we're going to talk about the first of three garbage collection techniques

2
00:00:07,759 --> 00:00:09,359
that we're going to look at in detail.

3
00:00:09,359 --> 00:00:14,960
The first one is Mark and Sweep.

4
00:00:14,960 --> 00:00:20,039
Mark and Sweep works in two phases and it's called not surprisingly Mark and Sweep.

5
00:00:20,039 --> 00:00:23,480
So the Mark phase is going to trace all the reachable objects.

6
00:00:23,480 --> 00:00:26,359
So when memory runs out and we stop to do a garbage collection, the first thing we're

7
00:00:26,359 --> 00:00:29,280
going to do is go and trace out all the reachable objects.

8
00:00:29,280 --> 00:00:33,159
And then the Sweep phase is going to collect all the garbage objects.

9
00:00:33,159 --> 00:00:37,799
And to support this, every object is going to have an extra bit somewhere in it called

10
00:00:37,799 --> 00:00:39,280
the Mark bit.

11
00:00:39,280 --> 00:00:40,600
And this is reserved for memory management.

12
00:00:40,600 --> 00:00:43,840
It's not going to be used by anything except the garbage collector.

13
00:00:43,840 --> 00:00:47,840
And initially, before we start a garbage collection, the Mark bit of every object will always

14
00:00:47,840 --> 00:00:48,840
be zero.

15
00:00:48,840 --> 00:00:52,799
And then it's going to be set to one for the reachable objects in the Mark phase.

16
00:00:52,799 --> 00:00:56,879
So when we mark an object, we mark it with a one and that indicates that the object is

17
00:00:56,879 --> 00:00:58,959
reachable.

18
00:00:58,959 --> 00:01:00,959
So here's the Mark phase.

19
00:01:00,959 --> 00:01:02,920
It's going to be a work list based algorithm.

20
00:01:02,920 --> 00:01:08,319
And so initially, our work list consists of all the roots, so all the initial pointers

21
00:01:08,319 --> 00:01:10,000
held in registers.

22
00:01:10,000 --> 00:01:13,959
And then while the work list, the to do list is not empty, we're going to do the following.

23
00:01:13,959 --> 00:01:17,439
We pick some element v out of the to do list.

24
00:01:17,439 --> 00:01:19,439
We remove it from the to do list.

25
00:01:19,439 --> 00:01:23,079
And then this is the crux of the algorithm.

26
00:01:23,079 --> 00:01:28,359
If the object v is not already marked, then we mark it.

27
00:01:28,359 --> 00:01:30,239
So we say it's Mark bit to one.

28
00:01:30,239 --> 00:01:33,319
And then we find all the pointers inside of it.

29
00:01:33,319 --> 00:01:35,959
And then we add those to our work list.

30
00:01:35,959 --> 00:01:38,799
So everything at v points to gets added to the work list.

31
00:01:38,799 --> 00:01:42,920
Now if v is already marked, well, then we've already processed it and we've already added

32
00:01:42,920 --> 00:01:45,039
all the things it points to to the work list.

33
00:01:45,039 --> 00:01:46,200
And so then we just do nothing.

34
00:01:46,200 --> 00:01:47,439
There's no else branch here.

35
00:01:47,439 --> 00:01:52,560
We just drop it from the to do list.

36
00:01:52,560 --> 00:01:56,480
So once we've completed the mark phase and every reachable object has been marked, then

37
00:01:56,480 --> 00:02:00,120
the sweep phase is going to scan through the heap looking for objects that have Mark bit

38
00:02:00,120 --> 00:02:01,519
zero.

39
00:02:01,519 --> 00:02:04,439
And the sweep phase is just going to march through all of memory.

40
00:02:04,439 --> 00:02:08,719
It's going to start at the bottom of the heap and walk over every object in the heap and

41
00:02:08,719 --> 00:02:10,240
check its mark bit.

42
00:02:10,240 --> 00:02:14,759
And so any of the objects that it finds that have Mark bit zero, they were not visited into

43
00:02:14,759 --> 00:02:17,360
the mark phase and they're clearly not reachable.

44
00:02:17,360 --> 00:02:20,640
So all those objects will be added to a free list.

45
00:02:20,640 --> 00:02:24,680
And as we go through the memory is one other detail that's important.

46
00:02:24,680 --> 00:02:28,960
Any object that has his Mark bit set is going to have its Mark bit reset to zero.

47
00:02:28,960 --> 00:02:34,240
So that way it's ready for the next garbage collection.

48
00:02:34,240 --> 00:02:37,280
So here's pseudocode for the sweep phase.

49
00:02:37,280 --> 00:02:42,120
And this little function size of p is going to be the size of the block, the size of the

50
00:02:42,120 --> 00:02:45,840
object that starts at pointer p.

51
00:02:45,840 --> 00:02:50,759
And as you'll see, this is actually the reason that we have the size of objects encoded

52
00:02:50,759 --> 00:02:51,759
in the object in cool.

53
00:02:51,759 --> 00:02:56,199
So remember that in the header for cool objects, there is a size field.

54
00:02:56,199 --> 00:02:59,800
That is so the garbage collector as it's walking through memory can figure out how big

55
00:02:59,800 --> 00:03:00,800
the objects are.

56
00:03:00,800 --> 00:03:03,719
Anyway, we start at the bottom of the heap.

57
00:03:03,719 --> 00:03:06,199
And while we haven't reached the top of the heap, we do the following.

58
00:03:06,199 --> 00:03:10,360
We look at where we're pointing and then we'll always be pointing to the beginning of

59
00:03:10,360 --> 00:03:11,360
an object.

60
00:03:11,360 --> 00:03:14,360
So we check to see if the Mark bit of that object is one.

61
00:03:14,360 --> 00:03:17,080
And if it is, well, then it was a reachable object.

62
00:03:17,080 --> 00:03:19,280
So we just reset its Mark bit to zero.

63
00:03:19,280 --> 00:03:24,200
Otherwise if its Mark bit was zero, then we're going to add that block of memory, which

64
00:03:24,200 --> 00:03:27,880
is the size of the object to the free list.

65
00:03:27,880 --> 00:03:33,720
And finally, in either case, we're going to increment p by the size of the object that

66
00:03:33,720 --> 00:03:34,720
it points to.

67
00:03:34,720 --> 00:03:35,720
So we point to the next object.

68
00:03:35,720 --> 00:03:39,520
And we'll just repeat that loop over and over again, resetting the Mark bits of things

69
00:03:39,520 --> 00:03:43,240
that were reached and adding things that were not reached to the free list until we've

70
00:03:43,240 --> 00:03:47,480
touched every object in the heap.

71
00:03:47,480 --> 00:03:48,560
Here's a little example.

72
00:03:48,560 --> 00:03:52,920
So we're starting out here with a heap and we're going to assume there's just one root

73
00:03:52,920 --> 00:03:54,760
for simplicity.

74
00:03:54,760 --> 00:03:56,360
And here are all the objects.

75
00:03:56,360 --> 00:03:58,719
Initially, their Mark bits are zero.

76
00:03:58,719 --> 00:04:01,520
And we do have a free list, initial free list over here.

77
00:04:01,520 --> 00:04:05,560
Notice that there's a little bit of memory that is on the free list.

78
00:04:05,560 --> 00:04:08,160
OK, so after the Mark phase, what has happened?

79
00:04:08,160 --> 00:04:11,040
Well, we've gone through and touched all the reachable objects.

80
00:04:11,039 --> 00:04:12,039
So we started with a.

81
00:04:12,039 --> 00:04:13,639
Of course, we said it's Mark bit to 1.

82
00:04:13,639 --> 00:04:16,279
And then we followed pointers reachable from a.

83
00:04:16,279 --> 00:04:17,959
Set the Mark bit there.

84
00:04:17,959 --> 00:04:20,199
Follow the pointer reachable from c. Set the Mark bit there.

85
00:04:20,199 --> 00:04:23,800
And so we wind up with a, c, and e being marked.

86
00:04:23,800 --> 00:04:26,079
Nothing else is marked.

87
00:04:26,079 --> 00:04:28,079
And now the sweet phase will go through memory.

88
00:04:28,079 --> 00:04:31,639
It's going to reset all the Mark bits to zero.

89
00:04:31,639 --> 00:04:36,439
And as it finds, unreachable objects, in this case, b and d, it's going to add them to

90
00:04:36,439 --> 00:04:37,439
the free list.

91
00:04:37,439 --> 00:04:38,439
We'll wind up with the free list.

92
00:04:38,439 --> 00:04:45,680
We'll wind up being a linked list of blocks of memory that are available for future allocations.

