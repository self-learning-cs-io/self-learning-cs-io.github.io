---
title: CS143 P100Week814 04 Peephole Optimization
---

1
00:00:00,000 --> 00:00:07,960
In this short video, I'm going to say a few words about a variation on local optimization

2
00:00:07,960 --> 00:00:15,839
that applies directly to assembly code called P poll optimization.

3
00:00:15,839 --> 00:00:20,600
The basic idea here is that instead of optimizing an intermediate code, we could do our optimization

4
00:00:20,600 --> 00:00:22,879
directly on assembly code.

5
00:00:22,879 --> 00:00:25,600
And P poll optimization is one such technique.

6
00:00:25,600 --> 00:00:30,720
The P poll stands for a short sequence of usually contiguous instructions.

7
00:00:30,720 --> 00:00:36,920
The idea is that we have our program, we can think of it as a long sequence of instructions,

8
00:00:36,920 --> 00:00:40,640
and our P poll is some window onto this program.

9
00:00:40,640 --> 00:00:44,960
So if we have a P poll of size 4, we can think of ourselves as staring through a small hole

10
00:00:44,960 --> 00:00:49,400
at the program, and all we can see is a short sequence of four instructions, and then we

11
00:00:49,400 --> 00:00:51,400
can optimize that sequence.

12
00:00:51,399 --> 00:00:56,359
And then we can slide the P poll around to optimize different parts of the program.

13
00:00:56,359 --> 00:01:01,519
And what the optimizer will do is it will stare at this short sequence of instructions,

14
00:01:01,519 --> 00:01:07,079
and if it knows a better sequence, it will replace that sequence by the other one, and then

15
00:01:07,079 --> 00:01:12,439
it will repeat this, as I said, applying other transformations to possibly the same or other

16
00:01:12,439 --> 00:01:16,599
parts of the assembly program.

17
00:01:16,599 --> 00:01:19,759
So people optimization are generally written as replacement rules.

18
00:01:19,760 --> 00:01:24,160
So the window of instructions on the left will be some sequence of instructions, and we'll

19
00:01:24,160 --> 00:01:27,960
know some other sequence of instructions that we would prefer on the right.

20
00:01:27,960 --> 00:01:31,719
So if we see this instruction sequence on the left, then we'll replace it by the one

21
00:01:31,719 --> 00:01:33,760
on the right-hand side.

22
00:01:33,760 --> 00:01:41,120
So for example, if I have a move from register B to register A, and then a move back from

23
00:01:41,120 --> 00:01:46,880
register A to register B, well, the second move is useless, and can just be deleted.

24
00:01:46,879 --> 00:01:53,239
And so we can replace this two instruction sequence by a one instruction sequence.

25
00:01:53,239 --> 00:01:57,799
And this will work provided that there's no possible jump target here.

26
00:01:57,799 --> 00:02:02,759
So if there's no possibility that the code would ever jump to this instruction, then that

27
00:02:02,759 --> 00:02:05,239
instruction can be removed.

28
00:02:05,239 --> 00:02:12,000
Another example, if I add I to the register A, and then I subsequently add J to the register

29
00:02:12,000 --> 00:02:17,520
A, I can do a constant folding optimization here, and combine those two additions into

30
00:02:17,520 --> 00:02:24,080
one addition where I add the sum of I plus J to the register A.

31
00:02:24,080 --> 00:02:28,520
So many, but not quite all of the basic block optimizations that we've discussed in the

32
00:02:28,520 --> 00:02:32,599
last video can be cast also as people optimizations.

33
00:02:32,599 --> 00:02:40,039
So for example, if we are adding zero to a register, and then storing another register, well,

34
00:02:40,039 --> 00:02:42,879
that can be replaced by a register move.

35
00:02:42,879 --> 00:02:48,079
If we're moving a value from the same register to itself, so this is like a self assignment,

36
00:02:48,079 --> 00:02:52,919
well, that instruction can just be deleted replaced by the empty sequence of instructions.

37
00:02:52,919 --> 00:02:57,959
And together for those two instructions, those two optimizations, excuse me, would be

38
00:02:57,959 --> 00:03:01,399
able to eliminate adding zero to a register.

39
00:03:01,399 --> 00:03:08,599
So first, this we get translated into a move from A to A, and then the move from A to A

40
00:03:08,599 --> 00:03:10,639
would get deleted.

41
00:03:10,639 --> 00:03:15,039
And as this little example illustrates, just like with local optimizations, people optimizations

42
00:03:15,039 --> 00:03:21,840
have to be applied repeatedly to get the maximum effect.

43
00:03:21,840 --> 00:03:26,560
I hope this simple discussion has illustrated for you that many optimizations can be applied

44
00:03:26,560 --> 00:03:32,639
directly to assembly code, and that there's really nothing magic about optimizing intermediate

45
00:03:32,639 --> 00:03:33,639
code.

46
00:03:33,639 --> 00:03:37,319
So if you have a program written in any language, source language, intermediate language,

47
00:03:37,319 --> 00:03:42,599
assembly language, it makes sense to talk about doing transformations of programs written

48
00:03:42,599 --> 00:03:46,840
in that language to improve the behavior of the program.

49
00:03:46,840 --> 00:03:51,879
And it's also a good time here to mention that program optimization is really a terrible

50
00:03:51,879 --> 00:03:53,479
term.

51
00:03:53,479 --> 00:04:00,680
The compilers do not produce optimal code, and it's purely an accident if a compiler were

52
00:04:00,680 --> 00:04:05,639
to somehow generate the best possible code for a given program.

53
00:04:05,639 --> 00:04:10,159
Basically what compilers do is they have a bunch of transformations that they know will

54
00:04:10,159 --> 00:04:14,479
improve the behavior of the program, and they'll just improve it as much as they can.

55
00:04:14,479 --> 00:04:18,439
So really what program optimization is all about is program improvement.

56
00:04:18,439 --> 00:04:23,839
We're trying to make the program better, but there's no guarantee that we will reach

57
00:04:23,839 --> 00:04:26,759
the best possible code for a given program.

