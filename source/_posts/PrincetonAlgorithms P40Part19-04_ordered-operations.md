---
title: PrincetonAlgorithms P40Part19 04_ordered Operations
---

1
00:00:00,000 --> 00:00:08,599
When keys are comparable and we can put them in order, we saw that we can use binary search

2
00:00:08,599 --> 00:00:11,800
to get an efficient symbol table implementation.

3
00:00:11,800 --> 00:00:15,759
But we can also provide a lot of convenient functionality for the client.

4
00:00:15,759 --> 00:00:18,719
That's what we're going to look at next.

5
00:00:18,719 --> 00:00:26,480
So this is just an example of an application that might try to associate keys with values.

6
00:00:26,480 --> 00:00:32,600
An illustration of all the different operations that a client might want.

7
00:00:32,600 --> 00:00:36,679
So we already looked at the get operation.

8
00:00:36,679 --> 00:00:43,420
So we might want to know what city is associated with the event that happened at time nine

9
00:00:43,420 --> 00:00:45,519
o'clock, thirteen.

10
00:00:45,519 --> 00:00:49,200
And so that should return that value.

11
00:00:49,200 --> 00:00:51,359
But there's plenty of other things that we might want.

12
00:00:51,359 --> 00:00:54,920
Like for example, what's the earliest time?

13
00:00:54,920 --> 00:00:55,920
That's the min.

14
00:00:55,920 --> 00:00:57,679
That's the latest time.

15
00:00:57,679 --> 00:01:00,160
That's the max.

16
00:01:00,160 --> 00:01:06,960
What about being able to iterate between among all the keys between two given times?

17
00:01:06,960 --> 00:01:10,599
That certainly is convenient.

18
00:01:10,599 --> 00:01:15,799
Then there's what's the seventh largest time?

19
00:01:15,799 --> 00:01:20,760
So that's selected like the median or that generalizes min or max.

20
00:01:20,760 --> 00:01:26,480
Each key is the happened second or seventh.

21
00:01:26,480 --> 00:01:31,280
So that's order statistics in our dynamic thing.

22
00:01:31,280 --> 00:01:38,600
What's the closest time thing that happened just before five past nine?

23
00:01:38,600 --> 00:01:42,320
Certainly plenty of clients might want that.

24
00:01:42,320 --> 00:01:45,320
So this one is I've only got ten tickets to sell.

25
00:01:45,320 --> 00:01:48,760
So that's the cutoff point for seven tickets.

26
00:01:48,760 --> 00:01:54,520
That's a cutoff point for anybody after that time doesn't get a ticket.

27
00:01:54,520 --> 00:01:59,719
And this one might be if there's a time cutoff, I'm not going to sell tickets to anyone

28
00:01:59,719 --> 00:02:02,359
that came after that time.

29
00:02:02,359 --> 00:02:06,000
And then the corresponding one is what's the first thing that happened after that time?

30
00:02:06,000 --> 00:02:07,960
That's a call into the radio show.

31
00:02:07,960 --> 00:02:10,159
I'm going to take that caller.

32
00:02:10,159 --> 00:02:13,159
The first call that comes at nine thirty.

33
00:02:13,159 --> 00:02:14,159
And so forth.

34
00:02:14,159 --> 00:02:21,560
Then see how many things happened between nine fifteen and nine twenty five.

35
00:02:21,560 --> 00:02:24,919
And how many calls were there before nine ten twenty five.

36
00:02:24,919 --> 00:02:30,639
So you can see that all of these operations are quite natural when we have the table

37
00:02:30,639 --> 00:02:32,840
in sorted order.

38
00:02:32,840 --> 00:02:36,960
And that's what we have for our binary search implementation.

39
00:02:36,960 --> 00:02:46,480
So we can implement these efficiently and they are convenient and useful for the clients.

40
00:02:46,480 --> 00:02:54,960
So typically for ordered SIMRA tables when keys are comparable will provide a much wider

41
00:02:54,960 --> 00:02:55,960
interface.

42
00:02:55,960 --> 00:02:58,360
It's very useful for many clients.

43
00:02:58,360 --> 00:03:07,320
So we say that we're dealing with keys that are comparable by simply adding this extends

44
00:03:07,320 --> 00:03:10,440
comparable key to our declaration.

45
00:03:10,440 --> 00:03:15,040
Same way we did for sorting methods.

46
00:03:15,040 --> 00:03:19,880
So all that means is our implementations can use compared to.

47
00:03:19,880 --> 00:03:26,320
But for the client it means that all of these operations have meaning.

48
00:03:26,319 --> 00:03:28,319
Give me the minimum key.

49
00:03:28,319 --> 00:03:29,319
Give me the largest key.

50
00:03:29,319 --> 00:03:33,560
And then I can get the value associated with that using get.

51
00:03:33,560 --> 00:03:38,120
Give me the largest key less than or equal to this key value or the smallest key greater

52
00:03:38,120 --> 00:03:40,079
than that key value.

53
00:03:40,079 --> 00:03:44,719
Give me the number of keys less than that key.

54
00:03:44,719 --> 00:03:48,120
You can actually implement priority cues this way.

55
00:03:48,120 --> 00:03:49,519
Delete the minimum key.

56
00:03:49,519 --> 00:03:52,199
Delete the largest key.

57
00:03:52,199 --> 00:04:01,359
Now usually we argue against wide interfaces just adding operations to an interface.

58
00:04:01,359 --> 00:04:06,959
But usually our reason for doing so is that we can't guarantee that all the operations can

59
00:04:06,959 --> 00:04:09,039
be performed efficiently.

60
00:04:09,039 --> 00:04:14,560
In this case as we'll see ultimately we have ways to guarantee that all the operations

61
00:04:14,560 --> 00:04:19,039
can be performed efficiently and they're so convenient for clients.

62
00:04:19,039 --> 00:04:21,959
It's certainly worth adding them.

63
00:04:21,959 --> 00:04:26,399
So we have iterate through all the keys and iterate through all the keys in a given range

64
00:04:26,399 --> 00:04:29,599
and count the number of keys in a given range.

65
00:04:29,599 --> 00:04:34,879
All of these operations are very useful for clients and we'll see plenty of examples later

66
00:04:34,879 --> 00:04:37,159
on.

67
00:04:37,159 --> 00:04:42,719
So we have to greatly expand our table what are going to be the cost of all of these things.

68
00:04:42,719 --> 00:04:49,879
And this is a big difference between the binary search implementation where the keys are

69
00:04:49,879 --> 00:04:55,159
kept in order in an array in the sequential search implementation when they're all in

70
00:04:55,159 --> 00:04:57,040
a linked list.

71
00:04:57,040 --> 00:05:01,639
So for example to provide order and iteration you have to get them sorted and that's going

72
00:05:01,639 --> 00:05:04,800
to be a lot of work and take analog and time.

73
00:05:04,800 --> 00:05:12,000
Whereas binary search you just iterate through the things in order.

74
00:05:12,000 --> 00:05:13,959
Give me the seventh key.

75
00:05:13,959 --> 00:05:17,680
We just go and look there they're in order.

76
00:05:17,680 --> 00:05:23,160
In-corporation that's essentially what binary search provides.

77
00:05:23,160 --> 00:05:28,480
That's the basic implementation is providing rank.

78
00:05:28,480 --> 00:05:35,000
Floor and ceiling that's again an outgrowth of the rank operation.

79
00:05:35,000 --> 00:05:37,160
Minimum and maximum.

80
00:05:37,160 --> 00:05:40,480
Well again those are like select they're just right there.

81
00:05:40,480 --> 00:05:43,280
Look at the first or the last.

82
00:05:43,279 --> 00:05:53,079
To insert or delete however takes linear time to maintain the sorted array in dynamic fashion

83
00:05:53,079 --> 00:05:58,399
is going to take linear time you have to go through the whole thing.

84
00:05:58,399 --> 00:06:04,599
And so that's really the key to thinking about ordered symbol tables and symbol tables

85
00:06:04,599 --> 00:06:05,759
in general.

86
00:06:05,759 --> 00:06:09,639
How can we guarantee that all operations are fast.

87
00:06:09,639 --> 00:06:12,039
Primary search is pretty good but that's a major flaw.

88
00:06:12,039 --> 00:06:17,839
I can't maintain a dynamic table efficiently with binary search and that's going to be our

89
00:06:17,839 --> 00:06:19,680
focus in the next lecture.

