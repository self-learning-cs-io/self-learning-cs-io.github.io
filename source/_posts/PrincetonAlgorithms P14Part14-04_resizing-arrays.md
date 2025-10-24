---
title: PrincetonAlgorithms P14Part14 04_resizing Arrays
---

1
00:00:00,000 --> 00:00:08,439
Okay, our basic array implementation of stacks had the defect where we required clients to

2
00:00:08,439 --> 00:00:12,120
provide the maximum capacity of the stack ahead of time.

3
00:00:12,120 --> 00:00:16,960
Now we're going to look at a technique for resolving that problem.

4
00:00:16,960 --> 00:00:20,679
How do we, we do not implement the API?

5
00:00:20,679 --> 00:00:24,120
The API says we should just be able to create a stack and it should be able to grow and

6
00:00:24,120 --> 00:00:25,800
shrink to any size.

7
00:00:25,800 --> 00:00:29,000
So how are we going to grow and shrink the array?

8
00:00:29,000 --> 00:00:34,280
Well, first thing you might think of is when the client pushes the new item onto the stack,

9
00:00:34,280 --> 00:00:37,519
increase the size of the array by one and when it pops decrease the size of the array by

10
00:00:37,519 --> 00:00:38,679
one.

11
00:00:38,679 --> 00:00:43,480
That's easy to code up, but not worth it because it's much too expensive to do that.

12
00:00:43,480 --> 00:00:48,280
The reason is that you have to create a new array size one bigger and copy all the items

13
00:00:48,280 --> 00:00:50,439
to that new array.

14
00:00:50,439 --> 00:00:57,640
So inserting the first N items would take time proportional, if the stack's size N minus

15
00:00:57,640 --> 00:01:01,119
one, it's going to take time in, and minus two time in minus one.

16
00:01:01,119 --> 00:01:06,640
So first N items would take the sum of the first N integers, which we know is about N squared

17
00:01:06,640 --> 00:01:12,439
over two quadratic time to insert N items into a stack.

18
00:01:12,439 --> 00:01:18,400
That kind of performance is unacceptable for large problems as we've seen, as we will

19
00:01:18,400 --> 00:01:20,439
see many times.

20
00:01:20,439 --> 00:01:27,200
So the challenge is to do the resizing, but somehow ensure that it happens infrequently.

21
00:01:27,200 --> 00:01:37,359
So, the well-known technique for doing that, called repeated doubling, is to when the

22
00:01:37,359 --> 00:01:43,680
array fills up, create a new array of twice the size and copy all the items over.

23
00:01:43,680 --> 00:01:47,240
Then we don't create new arrays all that often.

24
00:01:47,240 --> 00:01:51,000
So here's an implementation of that.

25
00:01:51,000 --> 00:01:53,799
We start with an array of size one.

26
00:01:53,799 --> 00:01:59,599
If we have a full stack, which we know by testing N, which is the number of items in the

27
00:01:59,599 --> 00:02:06,560
stack versus the array length, then we just resize the array into one of twice the length

28
00:02:06,560 --> 00:02:08,400
before inserting the item.

29
00:02:08,400 --> 00:02:12,479
And how do we resize to a new capacity?

30
00:02:12,479 --> 00:02:19,719
We create a new array of that capacity and just go ahead and copy our current stack into

31
00:02:19,719 --> 00:02:24,319
that, into the first half of that, and then return it.

32
00:02:24,319 --> 00:02:33,400
And that will reset our instance variable, which is our stack, to this new bigger array.

33
00:02:33,400 --> 00:02:40,400
So the idea and the consequence of this is if you insert N items into an array into a stack

34
00:02:40,400 --> 00:02:47,479
with this array representation, the time will be proportional to N, not N squared.

35
00:02:47,479 --> 00:02:53,599
And the reason is that you only create a new array every time it doubles.

36
00:02:53,599 --> 00:02:59,239
But by the time that it doubles, you've inserted that many items into the stack.

37
00:02:59,239 --> 00:03:08,280
So on average, it's like adding one operation to cost of one to each operation.

38
00:03:08,280 --> 00:03:14,439
So if you just calculate the cost of inserting the first N items, you're going to have instead

39
00:03:14,439 --> 00:03:17,879
of the sum of the integers from one to N, you're going to have the sum of the powers of

40
00:03:17,879 --> 00:03:25,639
two from one to N. And that'll give a total cost of about three N. So that's array accesses.

41
00:03:25,639 --> 00:03:28,199
So for the copy, there's two array accesses.

42
00:03:28,199 --> 00:03:33,319
So to insert N items, it's about three array accesses.

43
00:03:33,319 --> 00:03:38,919
This plot is another way of looking at it, which is the number of array accesses taken

44
00:03:38,919 --> 00:03:42,120
as you implement push operations.

45
00:03:42,120 --> 00:03:45,960
Every time you hit a power of two, you take that many array accesses.

46
00:03:45,960 --> 00:03:51,960
But in a sense, you've already paid for them by putting those items on the stack.

47
00:03:51,960 --> 00:03:57,120
So that's called amortized analysis, where we consider the total cost averaged over all

48
00:03:57,120 --> 00:03:58,120
operations.

49
00:03:58,120 --> 00:04:06,000
And this is a fine example in useful example of amortized analysis to get efficiency in

50
00:04:06,000 --> 00:04:09,240
the stack implementation.

51
00:04:09,240 --> 00:04:10,560
Now what about the pop?

52
00:04:10,560 --> 00:04:13,439
We have to think about how to shrink the array.

53
00:04:13,439 --> 00:04:17,360
So you might think, well, we doubled it when it was full.

54
00:04:17,360 --> 00:04:19,839
Why don't we cut it in half when it gets to be half full?

55
00:04:19,839 --> 00:04:23,040
We don't want the array to get too empty.

56
00:04:23,040 --> 00:04:29,920
Well, that one doesn't exactly work because of a phenomenon called thrashing.

57
00:04:29,920 --> 00:04:36,680
If the client happens to do push, pop, push, pop, alternating when the array is full,

58
00:04:36,680 --> 00:04:42,280
then it's going to be doubling, having, doubling, having, doubling, having, creating new arrays

59
00:04:42,280 --> 00:04:47,680
on every operation, take time proportion of the end for every operation, and therefore

60
00:04:47,680 --> 00:04:49,199
quadratic time for everything.

61
00:04:49,199 --> 00:04:51,639
So I don't want to do that.

62
00:04:51,639 --> 00:04:57,519
The efficient solution is to wait until the array gets one quarter full before you have

63
00:04:57,519 --> 00:04:58,720
it.

64
00:04:58,720 --> 00:05:00,960
And that's a very easy to implement.

65
00:05:00,960 --> 00:05:03,199
We just test if the array is one quarter full.

66
00:05:03,199 --> 00:05:05,680
If it is, we resize it to half full.

67
00:05:05,680 --> 00:05:08,759
And so then at that point, it's half full.

68
00:05:08,759 --> 00:05:15,000
You can either grow by adding stuff or shrink by subtracting stuff, but there won't be

69
00:05:15,000 --> 00:05:24,040
another resizing array operation until you do this totally full or half again full.

70
00:05:24,040 --> 00:05:29,879
So the invariant of that is that the array is always between 25% and 100% full.

71
00:05:29,879 --> 00:05:35,120
Number one and number two, that every time you resize, you've already paid for it in an

72
00:05:35,120 --> 00:05:40,480
amortized sense by inserting, pushing or popping.

73
00:05:40,480 --> 00:05:48,120
So here's just a, what happens to the array for our small client example.

74
00:05:48,120 --> 00:05:52,920
And you can see at the beginning it doubles from one to two to four, but once it gets to

75
00:05:52,920 --> 00:05:58,159
four, it stays, once it gets to eight, it stays at that size for a while, even though

76
00:05:58,160 --> 00:05:59,960
there's some operations.

77
00:05:59,960 --> 00:06:04,640
And it doesn't shrink back to four until after there's only two items in there and then

78
00:06:04,640 --> 00:06:07,240
it shrinks and so forth.

79
00:06:07,240 --> 00:06:15,320
So array resizing doesn't happen that often, but it's a very effective way of implementing

80
00:06:15,320 --> 00:06:22,000
the stack API with an array where the client does not have to provide this maximum capacity

81
00:06:22,000 --> 00:06:30,720
of the stack, but still we're guaranteed that the amount of memory that we use is always

82
00:06:30,720 --> 00:06:36,639
only a constant multiple of the number of items actually on the stack.

83
00:06:36,639 --> 00:06:47,040
So the analysis now says that the average running time per operation for whatever the sequence

84
00:06:47,040 --> 00:06:51,959
of operations is, the average running time is going to be proportional to a constant

85
00:06:51,959 --> 00:06:53,959
system.

86
00:06:53,959 --> 00:06:59,719
Now there is a worst case that is at the point when the stack doubles, it takes time proportional

87
00:06:59,719 --> 00:07:08,719
to end, so it's not quite as good performance as we might like, but it's what we, the advantage

88
00:07:08,719 --> 00:07:14,259
that we get is very fast pushes and pops, just access array and increment it and very

89
00:07:14,259 --> 00:07:20,000
efficient for most operations and for many, many clients that's an effective trade off

90
00:07:20,000 --> 00:07:22,600
to make.

91
00:07:22,600 --> 00:07:24,120
So what about memory usage?

92
00:07:24,120 --> 00:07:31,160
Well this is the analysis of memory usage for stacks and it's actually less memory than

93
00:07:31,160 --> 00:07:33,160
for strings.

94
00:07:33,160 --> 00:07:42,360
The amount used is between 8n and 32n depending on how full the array is and just a quick

95
00:07:42,360 --> 00:07:47,920
analysis of the amount of space that arrays take in Java.

96
00:07:47,920 --> 00:07:53,600
So again, this analysis is just for the stack itself, not for the strings, which the client

97
00:07:53,600 --> 00:07:56,520
owns.

98
00:07:56,520 --> 00:08:02,480
So what are the trade offs between using a resizing array versus a linked list?

99
00:08:02,480 --> 00:08:07,840
Those are two different implementations of the same API and the client can use them interchangeably

100
00:08:07,840 --> 00:08:10,120
which one is better.

101
00:08:10,120 --> 00:08:15,920
In many situations we're going to have multiple implementations of APIs and depending on

102
00:08:15,920 --> 00:08:20,480
properties of the client program, we're going to have to choose which one is the better

103
00:08:20,480 --> 00:08:22,120
one to use.

104
00:08:22,120 --> 00:08:27,759
So for linked lists, every operation takes constant time in the worst case.

105
00:08:27,759 --> 00:08:33,720
That's a guarantee, but we have to use a little extra time and space to deal with the links.

106
00:08:33,720 --> 00:08:36,920
So it's going to be slower.

107
00:08:36,920 --> 00:08:43,600
Resizing array implementation, we have a good amortized time, so total average over the

108
00:08:43,680 --> 00:08:46,320
whole process is good.

109
00:08:46,320 --> 00:08:52,879
We have less wasted space and probably faster implementation of each operation.

110
00:08:52,879 --> 00:08:56,639
And so for some clients, maybe that makes a difference.

111
00:08:56,639 --> 00:09:01,120
Perhaps you wouldn't want to use a resizing array implementation at the moment that your

112
00:09:01,120 --> 00:09:02,800
plane's coming in for a landing.

113
00:09:02,800 --> 00:09:07,240
You wouldn't want it to all of a sudden not implement some operation quickly.

114
00:09:07,240 --> 00:09:11,639
If you need that kind of order, maybe in an internet switch where packets are coming

115
00:09:11,639 --> 00:09:13,560
through at a great rate, you wouldn't want to do that.

116
00:09:13,559 --> 00:09:17,719
You wouldn't want to be in a situation where you're missing some data because something

117
00:09:17,719 --> 00:09:20,079
got slow all of a sudden.

118
00:09:20,079 --> 00:09:21,879
So that's a trade off that the client can make.

119
00:09:21,879 --> 00:09:26,959
If I want that guarantee, if I want to be sure that every operation is going to be fast,

120
00:09:26,959 --> 00:09:29,199
I'll use a linked list.

121
00:09:29,199 --> 00:09:33,359
And if I don't need that guarantee, if I'm just care about the total amount of time,

122
00:09:33,359 --> 00:09:38,559
I'll probably use the resizing array because the total will be much less because individual

123
00:09:38,559 --> 00:09:40,879
operations are fast.

124
00:09:40,879 --> 00:09:46,720
So even with these simple data structures, we have really important trade-offs that actually

125
00:09:46,720 --> 00:09:50,120
make a difference in lots of practical situations.

