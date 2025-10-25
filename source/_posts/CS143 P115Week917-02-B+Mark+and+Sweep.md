---
title: CS143 P115Week917 02 B+Mark+and+Sweep
---

1
00:00:00,000 --> 00:00:06,640
Now, this algorithm is very simple and conceptually, I think it's very clear how it works, but

2
00:00:06,640 --> 00:00:11,120
there are a number of tricky details and this is very typical of automatic memory management

3
00:00:11,120 --> 00:00:12,120
algorithms.

4
00:00:12,120 --> 00:00:16,679
And there's actually a serious problem with the mark phase and this is also typical of

5
00:00:16,679 --> 00:00:18,160
garbage collection algorithms.

6
00:00:18,160 --> 00:00:22,760
Now, notice that we only run this algorithm when we are out of space, okay?

7
00:00:22,760 --> 00:00:27,800
So the whole point is that we're garbage collecting because there's no more system memory

8
00:00:27,800 --> 00:00:29,920
available for allocating new objects.

9
00:00:30,000 --> 00:00:32,800
And yet, we have this to-do list, okay?

10
00:00:32,800 --> 00:00:35,359
And notice that the work list was not bounded in size.

11
00:00:35,359 --> 00:00:38,880
There was no guarantee about how many elements were going to be on the to-do list and

12
00:00:38,880 --> 00:00:44,320
I think it's easy to see that that data structure could actually be fairly large, right?

13
00:00:44,320 --> 00:00:48,680
And so we can't just allocate a fixed amount of space for the to-do list of reserves and

14
00:00:48,680 --> 00:00:50,200
cost into amount of space.

15
00:00:50,200 --> 00:00:54,240
But we need to deal with the fact that we actually don't have any space at all when we get

16
00:00:54,240 --> 00:00:56,400
around to doing a garbage collection.

17
00:00:57,359 --> 00:01:03,359
Now, there is a trick that can be used to maintain the to-do list during the mark phase

18
00:01:03,359 --> 00:01:05,239
without having to use any extra storage.

19
00:01:05,239 --> 00:01:07,679
And that is to do what is called pointer reversal.

20
00:01:07,679 --> 00:01:12,239
So when a pointer is followed, it's going to be reversed to point back to its parent.

21
00:01:12,239 --> 00:01:17,159
And this is going to allow us actually to track what elements or what objects in the

22
00:01:17,159 --> 00:01:20,960
heaps still need to be processed without having to use any extra space.

23
00:01:20,960 --> 00:01:24,960
And let's just, if you don't understand that, I'm going to do an example in just a second.

24
00:01:24,959 --> 00:01:27,000
I want to mention a second problem as well.

25
00:01:27,000 --> 00:01:29,000
That is where is the free list stored?

26
00:01:29,000 --> 00:01:31,239
And this is a little easier to see how that works.

27
00:01:31,239 --> 00:01:36,199
So the free list consists of blocks of memory.

28
00:01:36,199 --> 00:01:40,639
And we just use the space in these blocks to maintain the free list.

29
00:01:40,639 --> 00:01:45,719
So perhaps the first word or something of the block of memory will contain the size of

30
00:01:45,719 --> 00:01:50,439
the block and then the second word will point to the next block in the list, something

31
00:01:50,439 --> 00:01:51,439
like that.

32
00:01:51,439 --> 00:01:54,519
But we can use the space in the blocks themselves to maintain the free list.

33
00:01:54,679 --> 00:01:57,719
So let's come back to this pointer reversal idea.

34
00:01:57,719 --> 00:02:06,119
Let's say that we have some objects and we want to track reachability.

35
00:02:06,119 --> 00:02:14,280
We can't maintain the to do list in a separate data structure.

36
00:02:14,280 --> 00:02:15,599
And so how are we going to do that?

37
00:02:15,599 --> 00:02:16,800
Well, here's the idea.

38
00:02:16,800 --> 00:02:18,800
Let me change colors.

39
00:02:18,800 --> 00:02:19,800
So we're going to come in here.

40
00:02:19,800 --> 00:02:21,120
We're going to mark this first object.

41
00:02:21,120 --> 00:02:23,680
Let's say this is reachable from the root.

42
00:02:23,680 --> 00:02:27,360
And so, now that this is the root or the first object.

43
00:02:27,360 --> 00:02:30,379
And now we're going to follow the pointers in this object.

44
00:02:30,379 --> 00:02:32,180
And let's say that this is one here.

45
00:02:32,180 --> 00:02:34,500
This one here is the first pointer in the object.

46
00:02:34,500 --> 00:02:35,900
So we're going to follow it.

47
00:02:35,900 --> 00:02:41,100
And then we're going to reverse it and we're going to have it point back to the parent.

48
00:02:41,100 --> 00:02:43,500
And so now we'll mark this object.

49
00:02:43,500 --> 00:02:45,760
And then we'll follow the pointers in this object.

50
00:02:45,760 --> 00:02:49,600
And as we go down, we'll have this pointer point back.

51
00:02:49,600 --> 00:02:51,840
And then we'll mark this object.

52
00:02:51,840 --> 00:02:53,520
And now we got no pointers in this object.

53
00:02:53,520 --> 00:03:01,600
So we need to go back and process any pointers that weren't covered in the objects that we've already seen.

54
00:03:01,600 --> 00:03:04,320
Okay, and how do we find our way back? Well, that's what the pointer reversal was for.

55
00:03:04,320 --> 00:03:06,920
So we follow the blue arrow back here.

56
00:03:06,920 --> 00:03:09,760
As we come back, we'll restore the original pointer.

57
00:03:09,760 --> 00:03:11,480
So we'll get rid of the reversed pointer.

58
00:03:11,480 --> 00:03:13,320
There are no more pointers in this object either.

59
00:03:13,320 --> 00:03:15,320
So we'll go back one more object.

60
00:03:15,320 --> 00:03:19,040
And now, of course, this pointer will go away and we'll restore the original pointer.

61
00:03:19,040 --> 00:03:19,800
All right.

62
00:03:19,800 --> 00:03:20,600
And now we're in this object.

63
00:03:20,599 --> 00:03:24,159
And we see there was a second pointer that we haven't followed yet.

64
00:03:24,159 --> 00:03:24,680
Okay.

65
00:03:24,680 --> 00:03:27,840
And then we'll follow it and we'll reverse it.

66
00:03:27,840 --> 00:03:30,799
We'll follow the other pointer from that, reversing it.

67
00:03:30,799 --> 00:03:33,240
And then we'll mark these two objects.

68
00:03:33,240 --> 00:03:34,159
When we get down to this object,

69
00:03:34,159 --> 00:03:35,680
we can discover there are no additional pointers.

70
00:03:35,680 --> 00:03:43,519
We're able to use these blue arrows here to work our way back and we'll restore the red arrows as we walk back up through the objects.

71
00:03:43,519 --> 00:03:50,120
So essentially, the pointer reversal does is it helps us maintain the stack for a depth first search of the graph.

72
00:03:50,120 --> 00:03:56,080
So if you're doing a depth first search of a graph and you want to be sure that you cover all the nodes that are reachable,

73
00:03:56,080 --> 00:04:01,280
then you have to be able to do the backtracking and the reverse pointers allow us to do that.

74
00:04:01,280 --> 00:04:04,599
There's one more tiny issue here with the reverse pointers.

75
00:04:04,599 --> 00:04:08,360
So notice that there's a little bit of a problem.

76
00:04:08,360 --> 00:04:13,120
I talk about reversing pointers and let me draw two new objects here.

77
00:04:13,120 --> 00:04:14,280
Just illustrate the point.

78
00:04:14,280 --> 00:04:18,560
Let's say I have a pointer from this object to that object.

79
00:04:18,560 --> 00:04:26,120
So when I cross over to the object that is pointed to, what does it mean to reverse this pointer?

80
00:04:26,120 --> 00:04:29,079
Well, the space for the pointer is actually in this object.

81
00:04:29,079 --> 00:04:35,240
There's no space necessarily for the pointer at all in the object that I'm going to.

82
00:04:35,240 --> 00:04:41,279
And so in fact, what's going to happen, let's say this was part of a chain of objects.

83
00:04:41,279 --> 00:04:43,279
Okay.

84
00:04:43,919 --> 00:04:46,000
And this problem is easily solved.

85
00:04:46,000 --> 00:04:48,639
It is just an off by one problem.

86
00:04:48,639 --> 00:04:53,199
So I have space in this object for a pointer and I can change that pointer.

87
00:04:53,199 --> 00:04:56,279
I don't know if I even have any pointers in this object yet.

88
00:04:56,279 --> 00:04:58,959
I will say this is part of a chain of objects.

89
00:04:58,959 --> 00:04:59,719
Okay.

90
00:04:59,719 --> 00:05:03,279
And that I've walked down this chain to this particular object.

91
00:05:03,279 --> 00:05:06,319
So as I pass over to this third object,

92
00:05:06,319 --> 00:05:09,199
but the pointer that I will reverse is this one.

93
00:05:09,199 --> 00:05:12,959
And I will make it point back to the previous object.

94
00:05:12,959 --> 00:05:13,719
Okay.

95
00:05:13,719 --> 00:05:19,159
And then I'm just going to remember this particular object here.

96
00:05:19,159 --> 00:05:22,000
I'll keep the pointer to this particular object in a register.

97
00:05:22,000 --> 00:05:25,959
So I'll keep the last pointer I traversed in a register,

98
00:05:25,959 --> 00:05:29,560
a pointer to the last object that I came from in a register.

99
00:05:29,560 --> 00:05:32,000
And then when I go on to another object,

100
00:05:32,000 --> 00:05:37,319
I will use the pointer that I'm traversing in the current object to point back

101
00:05:37,319 --> 00:05:39,199
to the parent of the previous object.

102
00:05:39,199 --> 00:05:43,079
Okay. So I just a little off by one problem and I need one register here

103
00:05:43,079 --> 00:05:46,199
to hold on to the previous object that I visited.

104
00:05:46,199 --> 00:05:51,319
And then I can reverse pointers back up to the parents and grandparents.

105
00:05:54,319 --> 00:05:54,519
All right.

106
00:05:54,519 --> 00:05:56,600
I summarize the discussion of Mark and Sweep.

107
00:05:56,600 --> 00:06:00,000
Space for a new object is going to be allocated from the free list.

108
00:06:00,000 --> 00:06:01,920
We'll type over there.

109
00:06:01,920 --> 00:06:03,639
And we're always going to pick a block.

110
00:06:03,639 --> 00:06:07,079
We always have to pick a block from the free list that is large enough

111
00:06:07,079 --> 00:06:09,120
to hold the object they were allocating.

112
00:06:09,120 --> 00:06:14,399
And an area of the size that we need is going to be allocated from that block.

113
00:06:14,399 --> 00:06:16,519
And then the left over is going to put back on the free list.

114
00:06:16,519 --> 00:06:20,240
So let's say that the free list has a block and say it has 100 bytes.

115
00:06:20,240 --> 00:06:23,839
And then we need an object that has 50 bytes in it.

116
00:06:23,839 --> 00:06:26,599
So what will happen is this block will get split up.

117
00:06:26,599 --> 00:06:29,680
We'll use this first half, the first 50 for the object.

118
00:06:29,680 --> 00:06:35,000
And then this other part with the left over will get put back onto the free list.

119
00:06:35,000 --> 00:06:39,639
And the result of that kind of strategy where we have to find blocks that are big enough.

120
00:06:39,639 --> 00:06:43,839
But then we might not use the entire block is that Mark and Sweep can fragment the memory.

121
00:06:43,839 --> 00:06:48,360
We might wind up with lots of little bits of leftover memory.

122
00:06:48,360 --> 00:06:51,000
Maybe nothing big enough to actually hold an object.

123
00:06:51,000 --> 00:06:54,560
And these blocks, these little tiny blocks might be scattered all over the place.

124
00:06:54,560 --> 00:07:00,920
So it's important actually for Mark and Sweep to also merge blocks whenever possible.

125
00:07:00,920 --> 00:07:04,600
So it's a merge free blocks when possible.

126
00:07:04,600 --> 00:07:09,480
So basically when the Sweep phase is working on the free list,

127
00:07:09,480 --> 00:07:13,240
it needs to recognize when it has two adjacent blocks of memory.

128
00:07:13,240 --> 00:07:16,000
That they're immediately adjacent to each other in memory.

129
00:07:16,000 --> 00:07:21,840
So if I have two blocks that are contiguous, what I really want to do is to merge them into one big block.

130
00:07:21,840 --> 00:07:23,680
And just have one entry in the free list.

131
00:07:23,680 --> 00:07:26,400
That's the counteract the fragmentation of memory.

132
00:07:26,400 --> 00:07:34,439
Now one big advantage and perhaps the biggest advantage of Mark and Sweep is that objects are not moved during garbage collection.

133
00:07:34,439 --> 00:07:36,959
And that means I don't have to update the pointer to objects.

134
00:07:36,959 --> 00:07:41,120
Objects to stay put, they don't move as part of garbage collection.

135
00:07:41,120 --> 00:07:46,560
And what this means is that it's actually possible to adapt Mark and Sweep for languages like CNC++.

136
00:07:46,560 --> 00:07:51,079
So in CNC++ pointers are exposed to the programmer.

137
00:07:51,079 --> 00:07:55,159
So the programmers can manipulate pointers and test pointers.

138
00:07:55,159 --> 00:08:01,800
So you can't move objects in CNC++ because the pointer is part of their semantics.

139
00:08:01,800 --> 00:08:04,520
The pointer address, I should say, is part of their semantics.

140
00:08:04,520 --> 00:08:14,439
But it is actually possible and people actually have done it to build a conservative or variations of a Mark and Sweep garbage collection for CNC++.

141
00:08:14,439 --> 00:08:17,199
Precisely because the objects don't move.

