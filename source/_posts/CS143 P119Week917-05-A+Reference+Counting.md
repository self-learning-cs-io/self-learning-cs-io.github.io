---
title: CS143 P119Week917 05 A+Reference+Counting
---

1
00:00:00,000 --> 00:00:08,199
In this video, we're going to conclude our discussion about a memory management with the

2
00:00:08,199 --> 00:00:12,919
third and last technique we're going to talk about for garbage collection called reference

3
00:00:12,919 --> 00:00:16,839
counting.

4
00:00:16,839 --> 00:00:20,480
So the basic idea behind reference counting is that rather than waiting for memory to be

5
00:00:20,480 --> 00:00:24,620
completely exhausted, we're going to try to collect an object as soon as there are no more

6
00:00:24,620 --> 00:00:25,620
pointers to it.

7
00:00:25,620 --> 00:00:29,879
So as soon as we discard the last pointer to an object and it becomes unreachable, we

8
00:00:29,879 --> 00:00:32,420
will try to collect it at that point in time.

9
00:00:32,420 --> 00:00:33,740
And how can we do this?

10
00:00:33,740 --> 00:00:38,920
Well, as the name suggests, we're going to count the number of references to each object.

11
00:00:38,920 --> 00:00:43,320
So in each object, we're going to store the number of pointers to that object.

12
00:00:43,320 --> 00:00:51,120
So if I have an object in memory and it has say three pointers to it from other objects

13
00:00:51,120 --> 00:00:56,359
than somewhere in this object that's going to be a dedicated field that contains the

14
00:00:56,359 --> 00:00:57,759
number three.

15
00:00:57,759 --> 00:01:03,479
And if this number ever drops to zero, if we discard these pointers and this number becomes

16
00:01:03,479 --> 00:01:08,879
a zero, then we know that nobody's pointing to this object and it can be free.

17
00:01:08,879 --> 00:01:13,920
And what this means is that every assignment has to manipulate the reference count in order

18
00:01:13,920 --> 00:01:20,000
to maintain an accurate count of the number of pointers pointing to an object.

19
00:01:20,000 --> 00:01:24,400
So allocating a new object returns an object with a reference count of one.

20
00:01:24,400 --> 00:01:26,840
So an object is created by new.

21
00:01:26,840 --> 00:01:28,359
It will already have a reference count of one.

22
00:01:28,359 --> 00:01:32,880
The pointer that is returned is the only reference to the object.

23
00:01:32,880 --> 00:01:37,360
And so we're going to write the reference count of an object X is R, C, of X.

24
00:01:37,360 --> 00:01:41,760
And now when we have an assignment, X gets assigned Y.

25
00:01:41,760 --> 00:01:46,560
We're going to have to update the reference counts of both the object that X points to and

26
00:01:46,560 --> 00:01:50,120
the object that Y points to before the assignment.

27
00:01:50,120 --> 00:01:51,120
So what happens here?

28
00:01:51,120 --> 00:01:54,040
So if Y points to P, so let's draw our objects here.

29
00:01:54,040 --> 00:01:59,360
So Y is a local variable and it points to some object P in memory.

30
00:01:59,360 --> 00:02:04,200
And X is also a local variable and it points to some object O.

31
00:02:04,200 --> 00:02:05,200
Okay.

32
00:02:05,200 --> 00:02:07,640
So now X is getting the value of Y.

33
00:02:07,640 --> 00:02:14,120
And so that's going to move this pointer from where point and before to point to the

34
00:02:14,120 --> 00:02:15,120
same thing as Y.

35
00:02:15,120 --> 00:02:16,120
So what's going to happen?

36
00:02:16,120 --> 00:02:20,840
Well, P's reference count is going to go up by one and O's reference count is going

37
00:02:20,840 --> 00:02:22,400
to go down by one.

38
00:02:22,400 --> 00:02:26,840
And since we decremented O's reference counts as we dropped this pointer to the object

39
00:02:26,840 --> 00:02:31,439
O, we need to do a check to see if reference count has become zero.

40
00:02:31,439 --> 00:02:35,360
And if the reference count has dropped to zero, then we can free the memory for O.

41
00:02:35,360 --> 00:02:40,159
And then in addition to updating the reference counts and checking whether the reference count

42
00:02:40,159 --> 00:02:44,599
of O became zero, we actually need to do the assignment itself.

43
00:02:44,599 --> 00:02:45,599
All right.

44
00:02:45,599 --> 00:02:49,599
So every assignment, I want to stress that every single assignment in the program gets

45
00:02:49,599 --> 00:02:55,519
now translated into these four operations that need to be done to maintain the reference

46
00:02:55,519 --> 00:02:58,599
counts.

47
00:02:58,599 --> 00:03:02,560
Third trade-offs in reference counting, it has advantages and disadvantages.

48
00:03:02,560 --> 00:03:07,680
One of the big advantages is that it collects garbage incrementally without large pauses

49
00:03:07,680 --> 00:03:08,680
in the execution.

50
00:03:08,680 --> 00:03:14,879
So for applications where large pauses would be problematic, say real-time applications

51
00:03:14,879 --> 00:03:19,560
or interactive applications, reference counting can really help because it minimizes

52
00:03:20,319 --> 00:03:22,360
the length of the longest possible pause.

53
00:03:22,360 --> 00:03:23,360
Okay.

54
00:03:23,360 --> 00:03:26,920
So your program will never go to sleep and it just appeared to stop running for some period

55
00:03:26,920 --> 00:03:29,640
of time because it's off collecting garbage.

56
00:03:29,640 --> 00:03:32,680
It always collects the garbage in small incremental amounts.

57
00:03:32,680 --> 00:03:35,759
And so you never see a long pause.

58
00:03:35,759 --> 00:03:40,480
Reference counting, or at least a basic implementation of reference counting, is also quite easy to implement.

59
00:03:40,480 --> 00:03:45,439
It's very straightforward to go through and modify the code to add reference counts.

60
00:03:45,439 --> 00:03:51,400
And you can easily imagine a code generator that would simply generate different code for

61
00:03:51,400 --> 00:03:55,800
the assignment operation than it normally did if you were adding reference counting to

62
00:03:55,800 --> 00:03:56,800
an implementation.

63
00:03:56,800 --> 00:04:01,359
So really the changes that are needed for a simple implementation of reference counting

64
00:04:01,359 --> 00:04:05,240
to a compiler are not that pervasive.

65
00:04:05,240 --> 00:04:08,479
Now there are some disadvantages to reference counting.

66
00:04:08,479 --> 00:04:14,240
One is that manipulating the reference counts at each assignment is really quite slow.

67
00:04:14,240 --> 00:04:18,800
So if you remember what happens, we have a couple of updates to reference counts.

68
00:04:18,800 --> 00:04:24,079
So we have to update, you know, reference count of two objects to do this.

69
00:04:24,079 --> 00:04:26,000
This is the code to do an assignment.

70
00:04:26,000 --> 00:04:27,840
And then we have an if statement.

71
00:04:27,840 --> 00:04:30,439
And then we actually do the assignment itself.

72
00:04:30,439 --> 00:04:32,280
So there's two reference count updates.

73
00:04:32,280 --> 00:04:34,360
A test to see if a reference count became zero.

74
00:04:34,360 --> 00:04:35,519
And then we actually do the assignment.

75
00:04:35,519 --> 00:04:38,319
So the overhead here is substantial.

76
00:04:38,319 --> 00:04:43,000
You're taking every single assignment in the program and blowing up its cost by at least

77
00:04:43,000 --> 00:04:45,160
four or five times.

78
00:04:45,160 --> 00:04:49,839
And that will have a very noticeable impact on the performance of many programs.

79
00:04:49,839 --> 00:04:52,920
Now it is possible to optimize reference counting.

80
00:04:52,920 --> 00:04:59,639
So for example, if we had two updates to the same object, say within a basic block or even

81
00:04:59,639 --> 00:05:05,480
within a control flow graph, a compiler, a smart optimizing compiler, could frequently combine

82
00:05:05,480 --> 00:05:07,439
those reference count operations together.

83
00:05:07,439 --> 00:05:11,759
So instead of updating the reference count to the object two times, it could just update

84
00:05:11,759 --> 00:05:12,879
it one time.

85
00:05:12,879 --> 00:05:17,040
And similarly, if there were even more reference count updates to the same object, potentially

86
00:05:17,040 --> 00:05:22,959
all of those could be coalesced within some region of the program.

87
00:05:22,959 --> 00:05:26,920
The problem with that is that it becomes very tricky to get that right.

88
00:05:26,920 --> 00:05:36,199
So a simple implementation of reference counting is quite slow, but easy to get right.

89
00:05:36,199 --> 00:05:41,040
A very sophisticated implementation of reference counting or highly optimized implementation

90
00:05:41,040 --> 00:05:42,439
of reference counting.

91
00:05:42,439 --> 00:05:47,360
This somewhat faster still has a noticeable performance impact if you reference counting

92
00:05:47,360 --> 00:05:50,199
all objects, but it is substantially faster.

93
00:05:50,199 --> 00:05:54,680
However, it's quite tricky to get it correct.

94
00:05:54,680 --> 00:06:00,399
The other problem with reference counting is that it cannot directly collect circular

95
00:06:00,399 --> 00:06:01,399
structures.

96
00:06:01,399 --> 00:06:06,000
So to see this, let's draw a little heap with a circular structure.

97
00:06:06,000 --> 00:06:12,399
And so let's say we have a local variable X and it points to some object in the heap.

98
00:06:12,399 --> 00:06:19,159
And that object has a pointer to another object.

99
00:06:19,159 --> 00:06:23,599
And that object, that second object, then has a pointer back to the first object.

100
00:06:23,599 --> 00:06:29,039
So here X is pointing to say a circularly linked list of length two.

101
00:06:29,039 --> 00:06:31,959
And if we add in the reference counts here, what would those look like?

102
00:06:31,959 --> 00:06:36,639
Well, this object down here, the second object here has only one reference to it.

103
00:06:36,639 --> 00:06:38,719
So his reference count would be one.

104
00:06:38,720 --> 00:06:42,960
And this first object has two pointers to it, one from X and one from the other object.

105
00:06:42,960 --> 00:06:45,040
And so his reference count is two.

106
00:06:45,040 --> 00:06:48,480
OK, so here is our little heap.

107
00:06:48,480 --> 00:06:55,640
And we can see that there's no garbage here because all the objects are reachable from a local

108
00:06:55,640 --> 00:06:57,280
variable or a variable of the program.

109
00:06:57,280 --> 00:07:02,080
Now, if we were to assign a new value to X, let's say that we had the assignment X gets

110
00:07:02,080 --> 00:07:03,080
null.

111
00:07:03,080 --> 00:07:06,120
All right, so this pointer goes away.

112
00:07:06,120 --> 00:07:08,000
Well, what's going to happen?

113
00:07:08,000 --> 00:07:13,240
Well, when we do that assignment, we're going to change the reference count here of this

114
00:07:13,240 --> 00:07:14,240
object.

115
00:07:14,240 --> 00:07:16,120
It's now going to be one.

116
00:07:16,120 --> 00:07:22,079
And if we look at this heap, we now see that these two objects are unreachable.

117
00:07:22,079 --> 00:07:26,439
OK, so these are unreachable.

118
00:07:26,439 --> 00:07:29,079
But notice that their reference counts are not zero.

119
00:07:29,079 --> 00:07:30,319
So we can't collect them.

120
00:07:30,319 --> 00:07:33,920
The garbage collector or the reference counting implementation will check the reference

121
00:07:33,920 --> 00:07:35,920
counts and see, oh, these are one.

122
00:07:35,920 --> 00:07:37,199
And so we can't delete them.

123
00:07:37,199 --> 00:07:43,680
And what you can't see is that the only references to these objects are from other unreachable

124
00:07:43,680 --> 00:07:44,920
objects.

125
00:07:44,920 --> 00:07:51,439
So the bottom line is that reference counting can't collect circular structures.

126
00:07:51,439 --> 00:07:54,080
And there's only really two ways to deal with that.

127
00:07:54,080 --> 00:08:01,200
One is that the programmer remembers whenever a circular structure is going to become unreachable

128
00:08:01,200 --> 00:08:03,439
to somehow break the circularity.

129
00:08:03,439 --> 00:08:08,600
So for example, if before we clobbered the pointer to x here, we remembered to go in and

130
00:08:08,600 --> 00:08:12,480
say, set this pointer here to null.

131
00:08:12,480 --> 00:08:17,720
If we nulled out one of the pointers in this cycle, so that there was no longer a cycle,

132
00:08:17,720 --> 00:08:21,319
then the reference counting would work correctly because then the reference count of this

133
00:08:21,319 --> 00:08:25,079
object would go to zero when this pointer was dropped from x.

134
00:08:25,079 --> 00:08:29,000
And that would cause the reference count of this object to also go to zero after this

135
00:08:29,000 --> 00:08:30,639
object was deleted.

136
00:08:30,639 --> 00:08:31,639
OK.

137
00:08:31,639 --> 00:08:39,399
Now, the other possibility is to back reference counting by some other garbage collection technique

138
00:08:39,399 --> 00:08:40,480
that can collect cycles.

139
00:08:40,480 --> 00:08:45,679
And so in some reference count systems, for example, most of the garbage collection is done

140
00:08:45,679 --> 00:08:47,519
by reference counting.

141
00:08:47,519 --> 00:08:52,000
But every now and again, once in a very great while, you might run a market sweep collector

142
00:08:52,000 --> 00:08:56,120
to go through and clean out any circular but unreachable data structures.

