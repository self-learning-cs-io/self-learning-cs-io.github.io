---
title: CS143 P77Week611 02 B+Activations
---

1
00:00:00,000 --> 00:00:05,740
To sum up our discussion of activations, it's obvious I think that the activation tree

2
00:00:05,740 --> 00:00:08,519
depends on the runtime behavior of the program.

3
00:00:08,519 --> 00:00:13,240
So it depends on the runtime values exactly which procedures are called and what the activation

4
00:00:13,240 --> 00:00:15,000
tree turns out to be.

5
00:00:15,000 --> 00:00:19,000
Now this was not illustrated in our examples, but it should be obvious that the activation

6
00:00:19,000 --> 00:00:22,920
tree can be different for different inputs.

7
00:00:22,920 --> 00:00:27,560
And so the programs that I showed you didn't take input and so we didn't have any, every

8
00:00:27,559 --> 00:00:31,719
time you run those programs you'll get the same activation tree, but in general if

9
00:00:31,719 --> 00:00:35,960
a program takes input it will execute differently and may call different procedures and different

10
00:00:35,960 --> 00:00:37,879
orders.

11
00:00:37,879 --> 00:00:43,320
And finally, here's perhaps the first important point from an implementation point of

12
00:00:43,320 --> 00:00:44,320
you.

13
00:00:44,320 --> 00:00:49,640
Since activations are properly nested, we can use a stack to implement or to track the

14
00:00:49,640 --> 00:00:53,679
currently active activations.

15
00:00:53,679 --> 00:00:58,039
So let's see how we can use a stack to track activations.

16
00:00:58,039 --> 00:01:02,880
We'll use one of the examples that we looked at before and what I'm going to do is I'm

17
00:01:02,880 --> 00:01:08,760
going to show the activation tree over here on the left and I'm going to show the stack

18
00:01:08,760 --> 00:01:12,480
of currently executing activations on the right.

19
00:01:12,480 --> 00:01:16,400
So the stack is not going to keep track of the entire activation tree.

20
00:01:16,400 --> 00:01:20,480
It's only going to keep track of the activations that are currently running.

21
00:01:20,480 --> 00:01:27,280
So at each step of the program the stack should contain all of the currently active or currently

22
00:01:27,280 --> 00:01:29,840
running activations.

23
00:01:29,840 --> 00:01:35,240
So the tree we already saw how to build and we begin by executing main so that will be

24
00:01:35,240 --> 00:01:37,320
the root of the tree.

25
00:01:37,320 --> 00:01:42,560
And since the stack is supposed to have all of the currently running activations the stack

26
00:01:42,560 --> 00:01:44,760
will have to have main on it.

27
00:01:44,760 --> 00:01:49,520
So it will begin with just the procedure main.

28
00:01:49,519 --> 00:01:55,519
And now main calls G. So G becomes a child of main.

29
00:01:55,519 --> 00:02:02,519
And over here on the stack we would push G onto the stack.

30
00:02:02,519 --> 00:02:05,280
And then G returns.

31
00:02:05,280 --> 00:02:09,159
And what that means is that the G is no longer running.

32
00:02:09,159 --> 00:02:12,199
And so G would get popped off the stack.

33
00:02:12,199 --> 00:02:20,039
And then the main procedure calls F. And so F would get pushed onto the stack.

34
00:02:20,039 --> 00:02:24,959
And you can see here that after G finishes we can pop it off and we can push on F and

35
00:02:24,959 --> 00:02:30,199
we maintain the invariant that we have a stack of the currently running activations.

36
00:02:30,199 --> 00:02:31,199
All right.

37
00:02:31,199 --> 00:02:35,879
And then F is going to call G. I forgot to complete my tree here.

38
00:02:35,879 --> 00:02:39,039
So main calls F and then F calls G.

39
00:02:40,039 --> 00:02:41,039
All right.

40
00:02:41,039 --> 00:02:48,280
So now the stack at this point is main F and G.

41
00:02:48,280 --> 00:02:54,680
And once G finishes running it will be popped off the stack because it's no longer executing.

42
00:02:54,680 --> 00:02:59,639
And then F will finish and F will also get popped off the stack.

43
00:02:59,639 --> 00:03:04,039
And finally main will finish and main will also be popped off the stack.

44
00:03:04,039 --> 00:03:05,039
And so that's the idea.

45
00:03:05,039 --> 00:03:06,519
So that is how we can use the stack.

46
00:03:06,520 --> 00:03:11,719
So essentially when a procedure is called we'll push an activation for that procedure onto

47
00:03:11,719 --> 00:03:12,719
the stack.

48
00:03:12,719 --> 00:03:16,879
And when the procedure returns we will pop that activation off the stack.

49
00:03:16,879 --> 00:03:23,760
And because activation lifetimes are properly nested this will work out.

50
00:03:23,760 --> 00:03:30,160
So to conclude our discussion of activations let's return to the runtime organization.

51
00:03:30,160 --> 00:03:34,680
As you may recall we have a block of memory that is allocated to the program.

52
00:03:34,680 --> 00:03:40,560
And the first portion of that block is occupied by the code for the program itself.

53
00:03:40,560 --> 00:03:45,240
And now in the rest of that memory that's allocated to the program we're going to have to

54
00:03:45,240 --> 00:03:47,920
store the data that the program needs to execute.

55
00:03:47,920 --> 00:03:52,200
And one of the important structures that goes there is the stack of activations.

56
00:03:52,200 --> 00:03:58,719
So typically this would start after the code area and the stack would grow towards the

57
00:03:58,719 --> 00:04:02,199
other end of the memory space of the program.

58
00:04:02,199 --> 00:04:07,000
And the stack will grow when procedures are called and it will shrink when procedures

59
00:04:07,000 --> 00:04:08,199
return.

60
00:04:08,199 --> 00:04:12,960
And as we'll see there are other things that go in this data area that we are going to

61
00:04:12,960 --> 00:04:15,280
be discussing in the upcoming videos.

