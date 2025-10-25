---
title: CS143 P112Week916 04 Managing Caches
---

1
00:00:00,000 --> 00:00:06,960
In the last few videos, we've talked about managing registers.

2
00:00:06,960 --> 00:00:11,240
In this video, we're going to take a few moments to talk about another very important resource,

3
00:00:11,240 --> 00:00:18,719
the cache, and what compilers can and can't do to manage them.

4
00:00:18,719 --> 00:00:23,679
Modern computer systems have quite elaborate memory hierarchies, and so if we were to start

5
00:00:23,679 --> 00:00:29,960
at the closest level to the processor itself, we would find that on the chip, there are

6
00:00:29,960 --> 00:00:33,679
some number of registers, and these are very fast access.

7
00:00:33,679 --> 00:00:40,640
So typically, they can be accessed in a single cycle, so at the same rate as the clock frequency.

8
00:00:40,640 --> 00:00:45,359
And the problem is that it's very expensive to build such high-performance memory, and

9
00:00:45,359 --> 00:00:48,960
so we don't get to have very much of it, typically.

10
00:00:48,960 --> 00:00:57,520
You might have 256, say, to 8K bytes of registers total available to you on a given processor.

11
00:00:57,520 --> 00:01:02,800
Now, a very significant portion of the die area on a modern processor would be devoted

12
00:01:02,800 --> 00:01:04,600
to the cache.

13
00:01:04,600 --> 00:01:09,000
And the cache is also quite high-performance, but not quite as high-performance as registers,

14
00:01:09,000 --> 00:01:13,159
maybe on average, it would take three cycles to serve as something from the cache, but you

15
00:01:13,159 --> 00:01:19,719
get a lot more of it, and modern processors would have up to a megabyte of cache.

16
00:01:19,719 --> 00:01:24,840
Then much further away from the processor is the main memory, the DRAM.

17
00:01:24,840 --> 00:01:30,640
And this is much more expensive to access in time.

18
00:01:30,640 --> 00:01:36,079
Typical values would be 20 to 100 cycles, and I think it's more towards the 100 end

19
00:01:36,079 --> 00:01:38,800
than the 20 end these days in most processors.

20
00:01:38,800 --> 00:01:40,520
But you get quite a lot of it.

21
00:01:40,520 --> 00:01:47,439
You get between 32 megabytes, that would be a fairly small machine, up to four gigabytes

22
00:01:47,439 --> 00:01:51,400
for a maximally-provisioned processor.

23
00:01:51,400 --> 00:01:57,680
And finally, furthest away is typically disk, and this takes a very, very long time to

24
00:01:57,680 --> 00:02:02,480
get 200 to 1000s or millions of cycles, but you can have enormous amounts of storage

25
00:02:02,480 --> 00:02:05,880
out there, gigabytes to terabytes of storage.

26
00:02:05,880 --> 00:02:11,240
Now, as I said, there are limitations on the size and speed of registers and caches,

27
00:02:11,240 --> 00:02:16,400
and these are limited as much by power, actually, as anything else these days.

28
00:02:17,400 --> 00:02:19,280
And so it's very important.

29
00:02:19,280 --> 00:02:23,400
People would like to have as much register in cache as possible, but there are real constraints

30
00:02:23,400 --> 00:02:29,080
on how big and how fast we can make these relative to the speeds of the processors.

31
00:02:29,080 --> 00:02:33,280
Now unfortunately, the cost of a cache miss is very high, as we saw in the previous slide.

32
00:02:33,280 --> 00:02:37,480
If you could get something in a couple of cycles from the cache, but if it's not in the cache,

33
00:02:37,480 --> 00:02:42,599
then it could take you a couple of orders of magnitude longer to get it out of the main

34
00:02:42,599 --> 00:02:43,599
memory.

35
00:02:43,599 --> 00:02:51,159
And so for this reason, people try to build caches in between the processor and the main

36
00:02:51,159 --> 00:02:56,000
memory to hide that latency of the main memory, so most of the data is in the cache.

37
00:02:56,000 --> 00:03:02,680
And typically, it requires more than one level of cache these days to match a fast processor

38
00:03:02,680 --> 00:03:05,840
well with the speed of a very large main memory.

39
00:03:05,840 --> 00:03:10,439
So I'm very common now to have two levels of cache in processors, and some processors

40
00:03:10,439 --> 00:03:13,840
even have three levels of cache.

41
00:03:13,840 --> 00:03:21,560
So the bottom line is that it's very important for high performance to manage these resources

42
00:03:21,560 --> 00:03:27,240
properly, in particular to manage the registers and the cache as well if you want your program

43
00:03:27,240 --> 00:03:30,680
to perform well.

44
00:03:30,680 --> 00:03:35,639
Compilers have become very good at managing registers, and in fact, I think today most people

45
00:03:35,639 --> 00:03:40,719
would agree that for almost all programs, compilers do a better job at managing registers

46
00:03:40,719 --> 00:03:42,279
than programmers can.

47
00:03:42,279 --> 00:03:47,159
And so it's very worthwhile to leave the job of allocating registers or assigning registers

48
00:03:47,159 --> 00:03:48,159
to the compiler.

49
00:03:48,159 --> 00:03:53,479
However, compilers are not good at managing caches.

50
00:03:53,479 --> 00:03:56,959
And while there's a little bit that compilers can do, and that's what we're going to talk

51
00:03:56,959 --> 00:04:03,319
about in the rest of this video, for the most part, if programmers want to get good cache

52
00:04:03,319 --> 00:04:07,719
performance, they have to understand the behavior of the caches on the machine, they have to

53
00:04:07,719 --> 00:04:10,719
understand what their program is doing, they have to understand a little bit about what

54
00:04:10,719 --> 00:04:13,879
the compiler is capable of doing.

55
00:04:13,879 --> 00:04:20,800
And then they still have to write the program in such a way that it's going to be cache friendly.

56
00:04:20,800 --> 00:04:25,680
So I still very much an open question, how much a compiler can do to improve cache performance,

57
00:04:25,680 --> 00:04:31,399
although there are a few things that we've found that compilers can do reliably.

58
00:04:31,399 --> 00:04:36,599
So to see one of those things that compilers can actually do, let's take a look at this

59
00:04:36,599 --> 00:04:38,839
example loop.

60
00:04:38,839 --> 00:04:40,199
So what do we have here?

61
00:04:40,199 --> 00:04:45,799
We have an outer loop on j, an inner loop on i, and then in each iteration of the inner

62
00:04:45,799 --> 00:04:54,039
loop, we're reading from b sub i, some vector b sub i, you know, performing some computation

63
00:04:54,039 --> 00:04:59,719
on that value and storing the result into the i th element of the a vector.

64
00:04:59,720 --> 00:05:05,040
Now as it turns out, this particular program has really, really terrible cache performance,

65
00:05:05,040 --> 00:05:07,000
this is going to behave very badly.

66
00:05:07,000 --> 00:05:10,880
And so let's think about what's going to happen.

67
00:05:10,880 --> 00:05:16,520
So let's imagine our cache, you know, is some block of memory.

68
00:05:16,520 --> 00:05:17,520
Okay.

69
00:05:17,520 --> 00:05:18,680
And so what's going to happen here?

70
00:05:18,680 --> 00:05:21,320
I mean, what's the first iteration going to be?

71
00:05:21,320 --> 00:05:29,000
Well, we're going to, you know, load b sub 1 and store some function of that into a sub 1.

72
00:05:29,000 --> 00:05:33,600
And so what's going to get loaded into the cache is a sub 1 and b sub 1.

73
00:05:33,600 --> 00:05:34,600
All right.

74
00:05:34,600 --> 00:05:37,680
Let's assume they just go into different elements in the exam just for the sake of argument.

75
00:05:37,680 --> 00:05:40,920
Let's say they land in the first two elements in the cache.

76
00:05:40,920 --> 00:05:49,759
And then we're going to do the second iteration of this and we'll load b sub 2 and write it

77
00:05:49,759 --> 00:05:51,600
into a sub 2.

78
00:05:51,600 --> 00:05:58,560
And so a sub 2 and b sub 2 will be loaded into the cache.

79
00:05:58,560 --> 00:05:59,560
All right.

80
00:05:59,560 --> 00:06:00,560
And so on.

81
00:06:00,560 --> 00:06:05,920
And this will repeat over and over again, loading one element of a and one element of b.

82
00:06:05,920 --> 00:06:11,040
The important thing to notice is that all of these references to a and b are misses.

83
00:06:11,040 --> 00:06:12,040
Okay.

84
00:06:12,040 --> 00:06:18,480
Every single one of these is a cache miss because on each iteration of the loop we refer to

85
00:06:18,480 --> 00:06:19,480
new elements.

86
00:06:19,480 --> 00:06:20,480
Okay.

87
00:06:20,480 --> 00:06:24,399
So we're not referring to the same elements as we were on the previous one.

88
00:06:24,399 --> 00:06:30,359
So now let's ignore for the moment the fact that there may be multiple elements in the

89
00:06:30,359 --> 00:06:31,759
same cache line.

90
00:06:31,759 --> 00:06:32,759
Okay.

91
00:06:32,759 --> 00:06:39,799
So some of you probably are aware already that when we fetch data from memory, we don't

92
00:06:39,799 --> 00:06:41,359
just fetch the one word.

93
00:06:41,359 --> 00:06:42,359
Okay.

94
00:06:42,359 --> 00:06:47,759
So typically when we refer to b sub 1 for example, you know, if b sub 1 is stored here, we'll

95
00:06:47,759 --> 00:06:51,639
fetch an entire cache line which will be some block of memory.

96
00:06:51,639 --> 00:06:54,599
And that may well have other elements of b in it.

97
00:06:54,599 --> 00:06:58,079
So we might get a couple other elements of b into the cache at the same time.

98
00:06:58,079 --> 00:07:01,599
But the important thing here is that on every iteration of the loop, we're referring to

99
00:07:01,599 --> 00:07:02,599
fresh data.

100
00:07:02,599 --> 00:07:03,599
Okay.

101
00:07:03,599 --> 00:07:09,399
And if these data values are large enough if they take up an entire cache line, then each

102
00:07:09,399 --> 00:07:15,879
iteration of the loop is going to be a cache miss for both elements and we won't get

103
00:07:15,879 --> 00:07:23,480
any benefit of the cache and this loop will run at the rate of the main memory and not

104
00:07:23,480 --> 00:07:24,959
at the rate of the cache.

105
00:07:24,959 --> 00:07:29,040
Now the other thing that's important here is that this loop bound here is very large and

106
00:07:29,040 --> 00:07:33,839
I picked it to be very large to suggest that it's much larger than the size of the cache.

107
00:07:33,839 --> 00:07:36,560
So as we get towards the end of the loop, what's going to happen is we will have filled

108
00:07:36,560 --> 00:07:37,560
up the whole cache.

109
00:07:37,560 --> 00:07:42,480
So this whole cache will be filled with values from a and b and then it's going to start

110
00:07:42,480 --> 00:07:44,480
to be a clobbering values that are already in the cache.

111
00:07:44,480 --> 00:07:49,840
And if this loop, if the size of these vectors is a twice the size of the cache, by the

112
00:07:49,840 --> 00:07:56,920
time we come around and complete the entire execution of the inner loop, what's in the

113
00:07:56,920 --> 00:08:01,600
cache is the second half of the a and b arrays, not the first half of the a and b arrays.

114
00:08:01,600 --> 00:08:05,280
And so then when we go back around and execute another iteration of the outer loop, now

115
00:08:05,280 --> 00:08:11,720
what's in the cache is also going to be not the data that we're referencing.

116
00:08:11,720 --> 00:08:16,160
So when we come back around and begin the execution of the inner loop the second time and

117
00:08:16,160 --> 00:08:22,840
we refer to a sub 1 and b sub 1 and a sub 2 and b sub 2, what's in the cache is the values

118
00:08:22,840 --> 00:08:26,520
from the high numbered elements of the a and b vectors, not the low numbered elements.

119
00:08:26,520 --> 00:08:28,960
And so these references are all misses again.

120
00:08:28,960 --> 00:08:33,240
And so the basic problem with this loop, a loop that's structured like this, is that almost

121
00:08:33,240 --> 00:08:40,120
every memory reference and if the data values are big enough, again, that they fill an

122
00:08:40,120 --> 00:08:46,639
entire cache line, then it will be every single memory reference is a cache mess.

123
00:08:46,639 --> 00:08:51,039
Now instead let's consider the alternative structure for the same program.

124
00:08:51,039 --> 00:08:57,080
Here I've put the i loop at the outer as the outer loop and the j loop as the inner loop.

125
00:08:57,080 --> 00:09:05,919
And here what we do is we load b sub i and we write a sub i and then we repeat that computation

126
00:09:05,919 --> 00:09:08,840
10 times on the same data values.

127
00:09:08,840 --> 00:09:10,960
And so here we'll get excellent cache performance.

128
00:09:10,960 --> 00:09:16,000
We'll have a miss on the first reference, but then the subsequent nine references, the

129
00:09:16,000 --> 00:09:22,040
data will be in the cache, will completely exhaust our computation on those particular

130
00:09:22,040 --> 00:09:24,639
a and b values.

131
00:09:24,639 --> 00:09:29,320
And then we'll go on to the next a and b values.

132
00:09:29,320 --> 00:09:32,960
We'll finish the inner loop and go on to the outer and do one more iteration of the outer

133
00:09:32,960 --> 00:09:33,960
loop.

134
00:09:33,960 --> 00:09:37,280
And so the advantage of this structure is that it brings the data into the cache and then

135
00:09:37,279 --> 00:09:42,519
it uses that data as much as possible before going on to the next data, rather than doing

136
00:09:42,519 --> 00:09:48,120
a little bit on every data item and then going back, you know, in one pass and then going

137
00:09:48,120 --> 00:09:51,600
back and sweeping over all the items, the items again and doing another little bit.

138
00:09:51,600 --> 00:09:55,159
All right, so this particular structure where we've exchanged the order of the outer loops,

139
00:09:55,159 --> 00:09:58,600
sorry, the exchange the order of the inner and outer loops, it computes exactly the same

140
00:09:58,600 --> 00:10:04,079
thing, but it has much better cache behavior and it will probably run more than 10 times

141
00:10:04,079 --> 00:10:05,079
faster.

142
00:10:05,080 --> 00:10:10,280
Now, compilers can perform this simple loop interchange optimizations.

143
00:10:10,280 --> 00:10:13,560
This particular kind of optimization is called loop interchange, because you're just switching

144
00:10:13,560 --> 00:10:14,879
the order of loops.

145
00:10:14,879 --> 00:10:18,920
In this particular case, it's very easy to see if that's legal and a compiler could actually

146
00:10:18,920 --> 00:10:20,480
figure it out.

147
00:10:20,480 --> 00:10:25,840
Not many compilers actually implement this optimization because in general, it's not easy to decide

148
00:10:25,840 --> 00:10:28,440
whether you can reverse the orders of the loops.

149
00:10:28,440 --> 00:10:32,640
And so usually a programmer would have to figure out that they wanted to do this in order

150
00:10:32,639 --> 00:10:34,639
to improve the performance of the program.

