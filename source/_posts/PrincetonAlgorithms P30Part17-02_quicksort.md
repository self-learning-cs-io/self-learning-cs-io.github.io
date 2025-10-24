---
title: PrincetonAlgorithms P30Part17 02_quicksort
---

1
00:00:00,000 --> 00:00:07,799
Welcome back. Today we're going to look at quicksort. That was named as one of the most

2
00:00:07,799 --> 00:00:12,800
important algorithms of the 20th century and is widely used for system sorts in many other

3
00:00:12,800 --> 00:00:19,640
applications. Last lecture we looked at mergesort, another classic sorting algorithm that's

4
00:00:19,640 --> 00:00:23,879
used in many systems and today we're going to look at quicksort which is used in many

5
00:00:23,879 --> 00:00:33,079
others. You can even get a quicksort t-shirt nowadays. So what is the quicksort method? It's also

6
00:00:33,079 --> 00:00:38,879
a recursive method but the basic idea behind quicksort is that it does the recursion after it

7
00:00:38,879 --> 00:00:44,679
does the work, whereas mergesort did it before it did the work. So the idea is first randomly

8
00:00:44,679 --> 00:00:49,359
shuffle the array, that's an important step that we'll talk about later. And then partition

9
00:00:49,359 --> 00:00:56,159
the array. So that's to divide it so that for some value j, the entry a of j is in place in the

10
00:00:56,159 --> 00:01:03,799
array. There's no larger entry to the left of j and no smaller entry to the right of j. Once we have

11
00:01:03,799 --> 00:01:08,840
the array partitioned in that way, shown here in the middle, right here we have k in its position

12
00:01:08,840 --> 00:01:13,799
and we have everybody to the left, there's nobody greater than k and everybody to the right there's

13
00:01:13,799 --> 00:01:20,280
nobody less. Once we have it arranged in that way, then we recursively sort the two parts,

14
00:01:20,280 --> 00:01:25,239
sort the left part, sort the right part and then after those two things are done, the whole thing is

15
00:01:25,239 --> 00:01:33,239
sort of, this method was invented in 1961 by Tony Hoar who won the Turing Award in 1980 for this

16
00:01:33,239 --> 00:01:41,560
and other work. So let's look at a demo of how quicksort partitioning works. The idea is to

17
00:01:42,120 --> 00:01:47,079
arbitrarily choose the first element to be the partitioning element. Since we shuffled the array,

18
00:01:47,079 --> 00:01:52,040
that's a random element from the array. And then we're going to maintain an i pointer that moves

19
00:01:52,040 --> 00:01:57,400
from left to right and a j pointer that moves from right to left. Let's look how it works in the demo.

20
00:01:59,879 --> 00:02:06,439
So we start again by picking k as the partitioning element and then our method is to move the i

21
00:02:06,439 --> 00:02:13,079
pointer from left to right as long as what we have is less than the partitioning element and move

22
00:02:13,079 --> 00:02:18,680
the j pointer from right to left as long as it points to an item that's greater than the partitioning

23
00:02:18,680 --> 00:02:24,599
element. So in this example, the i pointer stops right away because it's pointing to an r,

24
00:02:24,599 --> 00:02:31,159
which is bigger than the partitioning element. The j pointer decrements until it gets to the c,

25
00:02:31,159 --> 00:02:36,120
which stops there because that's less than the partitioning element. And so now what's

26
00:02:36,120 --> 00:02:42,680
going to happen is those two elements are out of place, the partitioning elements in between them

27
00:02:42,680 --> 00:02:48,280
and they're in the wrong order. So all we want to do is exchange those and then move on. Now we

28
00:02:48,280 --> 00:02:53,240
increment i as long as it's pointing to an element that's less than the partitioning element.

29
00:02:53,879 --> 00:02:58,920
Stop here at t because that's bigger. And now we decrement j as long as it's pointing to

30
00:02:58,920 --> 00:03:04,920
something that's bigger than the partitioning element. Stop here at i because that's less. Again,

31
00:03:04,919 --> 00:03:11,479
t and i are in the wrong places. If we exchange them will maintain the invariant that everything to

32
00:03:11,479 --> 00:03:15,959
the left of i is less than the partitioning element or nothing to the left of i is greater than the

33
00:03:15,959 --> 00:03:20,839
partitioning element and nothing to the right of j is less than the partitioning element. So

34
00:03:20,839 --> 00:03:28,439
exchange them. Increment i as long as it's less, stop at l. Increment j is decrement j as long as

35
00:03:28,439 --> 00:03:35,800
it's greater. Stop at e. Those two elements are out of position so exchange them. Now increment i

36
00:03:36,759 --> 00:03:43,240
stop at the l which is greater than k, decrement j, stop at e which is less than k. And now at this

37
00:03:43,240 --> 00:03:48,840
point the partitioning process is complete because the point is of cross and we've looked at everything in

38
00:03:48,840 --> 00:03:58,360
the array. In fact, j points to the right most element in the left sub files everything that's

39
00:03:58,360 --> 00:04:06,199
not greater than k so we can just exchange j with our partitioning element and now we've achieved

40
00:04:06,199 --> 00:04:13,080
the goal of partitioning the array so that a of j is in its position, nobody to the left is greater,

41
00:04:13,080 --> 00:04:21,800
nobody to the right is less. Now the code for partitioning is straightforward to implement.

42
00:04:22,680 --> 00:04:30,120
Down below shows the state of the array before partitioning during and after partitioning.

43
00:04:30,680 --> 00:04:35,879
So in the end the j pointer is pointing to the partitioning element v which was in position v

44
00:04:35,879 --> 00:04:42,360
in the first place. In the all during the partitioning process the code is maintaining this

45
00:04:42,360 --> 00:04:47,240
invariant where everything to the left of i is less than r, everything to the right of j is

46
00:04:47,240 --> 00:04:55,400
greater than r, and we haven't looked at things in between. So finding increment i as long as it's

47
00:04:55,400 --> 00:04:59,560
less is a simple while loop and then we put a test to make sure we don't run off the right end of

48
00:04:59,560 --> 00:05:05,960
the array and decrement j as long as it's pointing to a bigger element similarly just a while loop where

49
00:05:05,960 --> 00:05:10,920
we put in a test to make sure we don't run off the left end of the array. Then there's a test to

50
00:05:10,920 --> 00:05:18,199
see if the pointer's cross swap the elements at i and j. When we get to the pointers cross we break

51
00:05:18,199 --> 00:05:25,560
out of the loop and exchange the partitioning element into position. So that's a quick implementation

52
00:05:25,560 --> 00:05:35,160
of the quicksort partitioning method. Now quicksort itself then is going to be a recursive program

53
00:05:35,240 --> 00:05:42,840
that uses that partitioning method. The first thing we do is the public sort method that takes the

54
00:05:42,840 --> 00:05:48,680
array of comparable items as its argument is going to do a shuffle and that shuffle is needed to

55
00:05:48,680 --> 00:05:54,040
make sure that we can guarantee that the performance is going to be good. And then it calls the recursive

56
00:05:54,040 --> 00:06:00,840
method that takes this argument the limits of the subarray that's going to be sorted. So then partitioning

57
00:06:00,839 --> 00:06:06,839
simply does the partitioning tells us which element is in position and then recursively sorts the

58
00:06:06,839 --> 00:06:13,879
left part that's loaded j minus 1 and then the right part that's j plus 1 to high. That's a complete

59
00:06:13,879 --> 00:06:22,519
implementation of quicksort. Again as with merge sort studying the recursive trace is instructive

60
00:06:23,239 --> 00:06:30,359
and this one is kind of upside down as compared to merge sort. The first line shows the partitioning

61
00:06:30,360 --> 00:06:39,240
where k is put into position. Then the method calls the sort for the left subfile first and then

62
00:06:39,240 --> 00:06:46,040
that's going to be partition on this e and so forth. Eventually we get down to small subfiles. Actually

63
00:06:46,040 --> 00:06:53,080
our code doesn't do anything at all for subarrays of size one. So we just leave those in gray and then

64
00:06:53,079 --> 00:07:01,560
it does the right subfile and so forth. Again studying this trace like this gives a good feeling for

65
00:07:01,560 --> 00:07:10,759
exactly what's going on in the recursive program. Let's look at any animation of quicksort and operation.

66
00:07:12,519 --> 00:07:17,079
There's the partition now it's working on the left now it's partitioning the right now it's

67
00:07:17,079 --> 00:07:23,079
working on the left part of the right now it's partitioning what's left knowing the left part of

68
00:07:23,079 --> 00:07:29,079
that and working from left to right but dividing each subarray in half as it goes.

69
00:07:31,159 --> 00:07:37,240
So let's look consider some of the details and implementation of partitioning with quicksort.

70
00:07:37,240 --> 00:07:43,959
So first thing is the partition is in place you could use an extra array and the partitioning

71
00:07:43,959 --> 00:07:49,079
code would be a little bit easier but one of the big advantages of quicksort over merge sort is

72
00:07:49,079 --> 00:07:56,680
that it doesn't take any extra space it gets the sort done in place. Now you have to be a little

73
00:07:56,680 --> 00:08:01,399
bit careful with terminating the loop. When we give you working code it's not hard to see why it

74
00:08:01,399 --> 00:08:07,560
works and you might go through the exercise of trying to implement quicksort without looking at

75
00:08:07,560 --> 00:08:13,959
our code and you'll find the testing when the pointers cross can be a little bit tricky particularly

76
00:08:13,959 --> 00:08:22,840
in the presence of duplicate keys. Also staying in bounds actually in our implementation the test

77
00:08:22,840 --> 00:08:28,759
of the j pointer running off the left end is redundant. Why is it redundant? Well the partition

78
00:08:28,759 --> 00:08:34,120
element sitting there and it'll stop when it hits the partitioning element but the other test is

79
00:08:34,120 --> 00:08:43,080
not in our implementation. And the key thing one key thing is that the way that also be randomly

80
00:08:43,080 --> 00:08:49,480
ordered actually some implementations of quicksort on the wild don't have this property and they

81
00:08:49,480 --> 00:08:54,840
suffer a little bit in performance. That random shuffle at the beginning is important and needed

82
00:08:54,840 --> 00:09:00,759
for guaranteeing performance. And the other thing I haven't I've referred to but not talked about in

83
00:09:00,759 --> 00:09:07,879
detail is the presence of equal keys. You might think it would be better to handle equal keys in

84
00:09:07,879 --> 00:09:13,319
some special way and we'll talk about that in a second. But this general purpose implementation

85
00:09:13,319 --> 00:09:18,759
stops the pointers on keys equal to the partitioning items key and we'll take a look at why that's

86
00:09:18,759 --> 00:09:26,279
important in a minute. So now let's look at the running time estimates about why we care about

87
00:09:26,279 --> 00:09:31,480
quicksort versus merge sort. This is extending the shuffle it's more likely that this lecture

88
00:09:31,480 --> 00:09:36,039
will land because of a lightning strike or your computer will be struck by a lightning bolt.

89
00:09:36,039 --> 00:09:43,079
So we can discount that. The average case which is extremely likely for any practical application

90
00:09:43,079 --> 00:09:50,679
is going to be about 1.39 n log n. So that's more compares than merge sort uses but quicksort is

91
00:09:50,679 --> 00:09:55,639
much faster because it doesn't do much corresponding to each compare. It just does the compare and

92
00:09:55,639 --> 00:10:01,480
increment a pointer whereas merge sort has to move the items into and out of the auxiliary array

93
00:10:01,480 --> 00:10:09,000
which is more expensive. So the random shuffle is a key for good performance in quicksort. It gives

94
00:10:09,000 --> 00:10:15,319
us the guarantee that the worst case is not going to happen. And also it allows us to develop a

95
00:10:15,319 --> 00:10:20,840
math model that we can go ahead and validate with experimentation. You run quicksort and you count

96
00:10:20,840 --> 00:10:26,680
compares if you did the random shuffle it'll be about 1.39 n log n compares and it's running time

97
00:10:27,399 --> 00:10:32,680
will be proportional to n log n and it'll be a fast sort and that's what people do and that's why

98
00:10:32,680 --> 00:10:39,399
people use it. Now there are some things that you have to watch out for with quicksort because

99
00:10:39,399 --> 00:10:46,120
the implementation is a bit fragile and it's easy to make mistakes and you'll find textbook

100
00:10:46,120 --> 00:10:53,159
implementations or implementations out on the web that wind up running in quadratic time in

101
00:10:53,159 --> 00:10:59,399
certain situations. You have to be a little bit careful of that and even if everything is

102
00:10:59,399 --> 00:11:05,480
randomized if there's lots of duplicates in the implementations not done quite right the quicksort

103
00:11:05,480 --> 00:11:13,879
might take quadratic time. So let's summarize the properties of quicksort. It's in place. It doesn't

104
00:11:13,879 --> 00:11:26,759
use any extra space. The depth of recursion so that's again dependent on the random shuffling

105
00:11:26,759 --> 00:11:32,919
is going to be log rhythmic. You can limit the depth of recursion by always doing the smaller sub-ray

106
00:11:32,919 --> 00:11:37,159
before the larger sub-ray but that's not really necessary nowadays as long as you've done the

107
00:11:38,120 --> 00:11:45,159
random shuffle. Oh and by the way quicksort is not stable because partitioning does one of

108
00:11:45,159 --> 00:11:53,159
those long range exchanges that might put a key with equal value over a key another key with the

109
00:11:53,159 --> 00:12:01,720
same value. So it's a little more work to make quicksort and stable and maybe using extra space.

110
00:12:01,720 --> 00:12:09,639
So what about in actually in practice this is our fastest sorting algorithm and there's a few

111
00:12:09,639 --> 00:12:16,360
ways to make it even faster and we looked at some similar things with merge sort and it's definitely

112
00:12:16,360 --> 00:12:24,120
worthwhile taking implementing for quicksort. First thing is small sub-arrays. Even quicksort has

113
00:12:24,120 --> 00:12:30,519
more overhead than you want for a tiny array like one of size two or three or four so can implement it

114
00:12:30,519 --> 00:12:38,679
to cut off to insertion sort for smaller arrays and the exact number that uses not too critical

115
00:12:38,679 --> 00:12:46,439
can anywhere between 10 and 20 will improve the running time by maybe 20%. Also you could just not

116
00:12:46,439 --> 00:12:52,439
do anything for smaller arrays and then do the insertion sort in one pass at the end. So that's a

117
00:12:52,439 --> 00:12:59,480
first improvement. Second improvement is to try to estimate the partitioning element to be near the

118
00:12:59,480 --> 00:13:06,200
middle rather than just arbitrarily using the first element which on average will be at the middle.

119
00:13:06,200 --> 00:13:11,240
So one thing that we can do is sample the items and then take a median of the sample.

120
00:13:12,680 --> 00:13:19,560
And that's actually not worth the cost for large samples usually but for three it's

121
00:13:19,560 --> 00:13:26,120
worthwhile. Slightly reduces the number of compares. Increases the number of exchanges paradoxically

122
00:13:26,120 --> 00:13:33,320
because more exchanges are required when the partitioning is right in the middle. So that'll also

123
00:13:33,320 --> 00:13:44,200
improve the running time by maybe 10%. So this is a summary of the optimized quicksort with cut off

124
00:13:44,200 --> 00:13:51,639
the small sub-files and median of three partitioning. So partition usually happens pretty close to the

125
00:13:51,639 --> 00:13:59,000
middle when you do that sample in median of three and then small sub-files can just be left

126
00:13:59,000 --> 00:14:05,480
unsorted to be picked up with insertion sort right at the end. So this gives a feeling for the

127
00:14:05,480 --> 00:14:11,559
number of items that have to be touched during quicksort in kind of an explanation for how it gets

128
00:14:11,559 --> 00:14:18,519
the sort done so quickly. That's a summary of quicksort our best sorting algorithm that we've seen

129
00:14:18,519 --> 00:14:20,600
today.

