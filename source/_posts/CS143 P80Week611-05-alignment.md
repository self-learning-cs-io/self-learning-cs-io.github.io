---
title: CS143 P80Week611 05 Alignment
---

1
00:00:00,000 --> 00:00:09,419
In this brief video, we're going to talk about alignment, a very low level but very important

2
00:00:09,419 --> 00:00:15,919
detail of machine architecture that every compiler writer needs to be aware of.

3
00:00:15,919 --> 00:00:22,640
First, let's review a few properties of contemporary machines.

4
00:00:22,640 --> 00:00:29,560
Currently, most modern machines are either 32 or 64-bit, meaning they're either 32 or

5
00:00:29,559 --> 00:00:31,959
64-bits in a word.

6
00:00:31,959 --> 00:00:36,359
And the word is actually subdivided into smaller units.

7
00:00:36,359 --> 00:00:42,060
We will say that there are 8 bits in a byte and then 4 or 8 bytes in a word, depending

8
00:00:42,060 --> 00:00:45,759
on whether it's a 32 or 64-bit machine.

9
00:00:45,759 --> 00:00:52,280
Another important property is that machines can be either byte or word addressable, meaning

10
00:00:52,280 --> 00:00:58,000
that in the native language of the machine, in machine code, it may be possible to either

11
00:00:58,000 --> 00:01:04,000
name only entire words or it may be possible to reference memory at the granularity of

12
00:01:04,000 --> 00:01:07,640
individual bytes.

13
00:01:07,640 --> 00:01:12,280
We say that data is word aligned if it begins at a word boundary.

14
00:01:12,280 --> 00:01:17,920
So if we think about the data in memory or the organization of the memory and it's laid

15
00:01:17,920 --> 00:01:27,560
out into bytes, and let's say that this is a 32-bit machine so that 4 bytes make a

16
00:01:27,560 --> 00:01:33,439
word and one word begins here and the next word begins here, then if data is allocated

17
00:01:33,439 --> 00:01:41,040
on a word boundary, say in these 4 bytes, then that would be a word aligned piece of data.

18
00:01:41,040 --> 00:01:44,900
If a piece of data begins in the middle of the word, so let's say, for example, that it

19
00:01:44,900 --> 00:01:49,879
begins here, we have some data that's allocated here, this data is not word aligned because

20
00:01:49,879 --> 00:01:53,159
it doesn't begin on a word boundary.

21
00:01:53,159 --> 00:02:00,119
And the important property or the important issue is that most machines have some alignment

22
00:02:00,119 --> 00:02:04,599
restrictions and these restrictions come in one of two forms.

23
00:02:04,599 --> 00:02:09,840
So on some machines, if the data is not properly aligned, meaning that you try to reference

24
00:02:09,840 --> 00:02:16,960
data that isn't aligned the way the machine requires, then the machine may just fail to

25
00:02:16,960 --> 00:02:18,159
execute that instruction.

26
00:02:18,159 --> 00:02:24,520
Your program may hang or even the machine may hang, but the important thing is that the

27
00:02:24,520 --> 00:02:26,439
program will not execute correctly.

28
00:02:26,439 --> 00:02:32,240
So there's a incorrect to not have the data aligned properly.

29
00:02:32,240 --> 00:02:38,560
Now there are other machines that will actually allow you to put the data anywhere you like,

30
00:02:38,560 --> 00:02:40,120
but add a significant cost.

31
00:02:40,120 --> 00:02:46,040
So it may be that accessing data that is aligned on word boundaries is cheaper than accessing

32
00:02:46,039 --> 00:02:50,159
data that's on non-word boundaries.

33
00:02:50,159 --> 00:02:54,359
And these performance penalties are often dramatic.

34
00:02:54,359 --> 00:03:05,359
So it can easily be 10 times slower to access misaligned data than to access data that has

35
00:03:05,359 --> 00:03:10,359
the alignment favored by that particular machine.

36
00:03:10,359 --> 00:03:15,159
So let's take a look at an example where data alignment issues tend to come up.

37
00:03:15,159 --> 00:03:19,960
One of the most common situations where we have to worry about alignment is in the allocation

38
00:03:19,960 --> 00:03:22,139
of strings.

39
00:03:22,139 --> 00:03:28,159
So let's say we have this string, the string hello, and that we want to put it in memory.

40
00:03:28,159 --> 00:03:33,919
So let me draw our memory as a linear sequence of bytes.

41
00:03:33,919 --> 00:03:38,479
Okay, so I'm going to mark out some bytes here.

42
00:03:38,479 --> 00:03:42,560
Now let's assume this is a 32-bit machine.

43
00:03:42,560 --> 00:03:46,960
So let me make the word boundaries a little bit heavier boundaries.

44
00:03:46,960 --> 00:03:49,560
So one, two, three, four.

45
00:03:49,560 --> 00:03:52,159
Two, three, four.

46
00:03:52,159 --> 00:03:55,080
Okay, so there are the word boundaries.

47
00:03:55,080 --> 00:04:00,599
Now let's say that we're trying to have aligned data, a word aligned data, and so we'll allocate

48
00:04:00,599 --> 00:04:02,240
the string beginning on a word boundary.

49
00:04:02,240 --> 00:04:08,560
So the H character will go in the first byte, then E, then L, then L, then L.

50
00:04:08,560 --> 00:04:13,920
And now we may have a terminating null depending on how strings are implemented.

51
00:04:13,920 --> 00:04:16,199
But let's assume that we do.

52
00:04:16,199 --> 00:04:20,280
And this is a fine placement of a string.

53
00:04:20,280 --> 00:04:27,120
The string begins on a word boundary, and that will satisfy presumably any alignment restrictions

54
00:04:27,120 --> 00:04:28,279
of the machine.

55
00:04:28,279 --> 00:04:32,439
And now the question is, where does the next data item go?

56
00:04:32,439 --> 00:04:37,560
So we could begin the next data item right in the next available byte.

57
00:04:37,560 --> 00:04:42,480
And that would be good if we were very concerned about not wasting memory.

58
00:04:42,480 --> 00:04:45,560
But notice that that data item will then not be word aligned.

59
00:04:45,560 --> 00:04:51,759
And we may either run to correctness or performance problems if the machine has restrictions

60
00:04:51,759 --> 00:04:52,920
on alignment.

61
00:04:52,920 --> 00:04:58,079
So the simple solution here is to simply skip to the next word boundary and allocate the

62
00:04:58,079 --> 00:05:06,160
next data item, whatever it is, on the next word beginning at the next word boundary.

63
00:05:06,160 --> 00:05:12,480
And what happens to these two bytes here, while these bytes are just junk, they're not

64
00:05:12,480 --> 00:05:13,480
used at all.

65
00:05:13,480 --> 00:05:15,240
They're never referenced by the program.

66
00:05:15,240 --> 00:05:19,080
It doesn't matter what their value is because the program should never refer to them.

67
00:05:19,080 --> 00:05:21,400
It's just unused memory.

68
00:05:21,400 --> 00:05:26,680
And note that if we didn't have the terminating zero, then there would be the terminating

69
00:05:26,680 --> 00:05:33,320
null character there, then there would be three unused bytes after the string.

70
00:05:33,319 --> 00:05:37,879
So to summarize, this is the general strategy for dealing with alignment when you have alignment

71
00:05:37,879 --> 00:05:39,240
restrictions.

72
00:05:39,240 --> 00:05:44,319
Data begins on the boundaries, typically word boundaries that are required.

73
00:05:44,319 --> 00:05:50,399
And if the particular data that you're allocating has a non integral length, meaning that it

74
00:05:50,399 --> 00:05:55,719
doesn't end directly on the next required boundary, then you just skip over whatever bytes are

75
00:05:55,719 --> 00:06:00,480
in between to get the data, the next data item that's going to be allocated on the correct

76
00:06:00,480 --> 00:06:01,480
boundary.

