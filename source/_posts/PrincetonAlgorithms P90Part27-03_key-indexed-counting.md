---
title: PrincetonAlgorithms P90Part27 03_key Indexed Counting
---

1
00:00:00,000 --> 00:00:09,040
The first string sorting algorithm that we're going to look at is actually the basis for several

2
00:00:09,040 --> 00:00:10,040
more complicated algorithms.

3
00:00:10,040 --> 00:00:17,359
It's called key index counting, and it's very useful in a particular special situation.

4
00:00:17,359 --> 00:00:23,240
But let's take a quick review of where we left off with sorting.

5
00:00:23,240 --> 00:00:28,800
So we considered a number of sorting algorithms starting with insertion sort and then merge

6
00:00:28,800 --> 00:00:31,560
sort, quick sort, and heap sort.

7
00:00:31,560 --> 00:00:39,159
And we got to the point where we could find an algorithm that's heap sort, that guarantees

8
00:00:39,159 --> 00:00:47,880
to sort in items and time proportional to n log n without using any extra space, unfortunately

9
00:00:47,880 --> 00:00:49,560
not stable.

10
00:00:49,560 --> 00:00:58,760
And all these algorithms were useful or are useful for any type of generic key as long

11
00:00:58,760 --> 00:01:03,440
as it implements the compare to operation.

12
00:01:03,440 --> 00:01:11,240
And not only that, we proved that any algorithm that just uses compares has to use number

13
00:01:11,240 --> 00:01:15,680
compare proportional to n log base 2n.

14
00:01:15,680 --> 00:01:25,080
So in a very important sense, merge sort or heap sort for example, or optimal, you can't

15
00:01:25,080 --> 00:01:34,640
use asymptotically fewer compares for either one and with heap sort, you can use less extra

16
00:01:34,640 --> 00:01:35,640
space.

17
00:01:35,640 --> 00:01:39,840
So why do we consider other sorting algorithms?

18
00:01:39,840 --> 00:01:42,439
Here's a lower bound.

19
00:01:42,439 --> 00:01:45,280
Why are we thinking about this?

20
00:01:45,280 --> 00:01:47,359
The question is can we do better?

21
00:01:47,359 --> 00:01:54,600
And obviously we're here because the answer is that we can do better if we don't depend

22
00:01:54,600 --> 00:01:55,600
on compares.

23
00:01:55,600 --> 00:02:00,359
The lower bound, the one assumption made by the lower bound is that we use compares.

24
00:02:00,359 --> 00:02:02,840
But we don't always need to use compares.

25
00:02:02,840 --> 00:02:05,400
And so let's look at an example.

26
00:02:05,400 --> 00:02:09,400
The index counting is a fine example of that.

27
00:02:09,400 --> 00:02:17,520
And it's representative of a fairly common situation in sorting application where it happens

28
00:02:17,520 --> 00:02:23,439
to be that the keys that we're using to sort are small integers.

29
00:02:23,439 --> 00:02:28,960
So in this case, this is supposed to mimic an application where there are students in

30
00:02:28,960 --> 00:02:30,360
their assigned to sections.

31
00:02:30,360 --> 00:02:32,960
There's not too many sections.

32
00:02:32,960 --> 00:02:36,320
And we want to get the thing sorted.

33
00:02:36,320 --> 00:02:42,120
So we want to distribute the students by section.

34
00:02:42,120 --> 00:02:45,439
And so we want to sort according to the section number.

35
00:02:45,439 --> 00:02:48,240
And that's a small integer.

36
00:02:48,240 --> 00:02:54,400
And the implication of knowing that the key is a small integer is that we can use the

37
00:02:54,400 --> 00:02:58,280
key as an array index then.

38
00:02:58,280 --> 00:03:04,560
And by knowing that the key is an array index, we can arrange for a fast sort.

39
00:03:04,560 --> 00:03:08,400
So lots of applications for that.

40
00:03:08,400 --> 00:03:13,000
When you maybe have phone numbers, you can sort by area code.

41
00:03:13,000 --> 00:03:16,280
Or if you have a string, you just want to sort by the first letter you could do it that

42
00:03:16,280 --> 00:03:17,280
way.

43
00:03:17,280 --> 00:03:26,560
And actually that idea leads to an efficient sorting algorithm actually two different ways.

44
00:03:26,560 --> 00:03:33,599
Now don't forget that we're sorting according to a sort key.

45
00:03:33,599 --> 00:03:41,199
But usually we're sorting bigger generic items that have other information associated with

46
00:03:41,199 --> 00:03:42,319
them.

47
00:03:42,319 --> 00:03:47,080
If you were just sorting the small integers, you could just count how many ones there are,

48
00:03:47,080 --> 00:03:48,759
how many twos there are, and like that.

49
00:03:48,759 --> 00:03:54,360
And then in one pass, and then if there's three ones, just output three ones and so forth.

50
00:03:54,360 --> 00:04:00,840
But the complication is that we have to carry the associated information along.

51
00:04:00,840 --> 00:04:04,840
So we have to work a bit harder than that.

52
00:04:04,840 --> 00:04:09,440
So here's the code for this method called key index counting.

53
00:04:09,440 --> 00:04:12,440
And let's look at a demo.

54
00:04:12,440 --> 00:04:14,920
So here's the key index counting demo.

55
00:04:14,920 --> 00:04:20,759
Now to make this a little less confusing and not so many numbers, we're going to use lower

56
00:04:20,759 --> 00:04:24,079
case A for zero B for one C for two and like that.

57
00:04:24,079 --> 00:04:30,319
So it's the A minus first letter of the alphabet, whatever you want to think of it.

58
00:04:30,319 --> 00:04:32,959
So and we're only going to look at six.

59
00:04:32,959 --> 00:04:38,319
So we're supposing that we're sorting this array that has six different small integers

60
00:04:38,319 --> 00:04:44,039
and we're using lower case letters to represent the integers so that we can easily distinguish

61
00:04:44,039 --> 00:04:47,079
between the keys and the indices.

62
00:04:47,079 --> 00:04:50,800
And now let's look at the processing for this.

63
00:04:50,800 --> 00:04:56,919
So the first thing that we do is we go through and we count the frequency of occurrence of

64
00:04:56,919 --> 00:04:59,279
each letter.

65
00:04:59,279 --> 00:05:02,719
So the way that we do that is we keep an array.

66
00:05:02,719 --> 00:05:10,240
Now the array actually got to be one bigger than the number of different key keys that

67
00:05:10,240 --> 00:05:13,240
we have and number of different small integers that we have.

68
00:05:13,240 --> 00:05:15,799
So in this case, array of size seven.

69
00:05:15,800 --> 00:05:21,759
And just to make the code a little cleaner, we keep the number of A's in count of one,

70
00:05:21,759 --> 00:05:25,600
the number of B's in count of two and so forth.

71
00:05:25,600 --> 00:05:30,040
And so once we set up, that's what we want to do.

72
00:05:30,040 --> 00:05:34,360
Then it's trivial to go ahead and count the frequencies.

73
00:05:34,360 --> 00:05:40,600
We simply go through for I from zero to N, we go through our input.

74
00:05:41,520 --> 00:05:48,040
When we A of I, when we access a value in our input, it's a small integer.

75
00:05:48,040 --> 00:05:51,720
So it's zero one two three four or five.

76
00:05:51,720 --> 00:05:57,600
And we simply add one to that integer and use it to index into the array.

77
00:05:57,600 --> 00:06:02,280
So when we see an A that's zero, then we're incrementing count of one.

78
00:06:02,280 --> 00:06:07,120
And we see a B that's one, we're incrementing count of two and so forth.

79
00:06:07,120 --> 00:06:14,560
And so in this case, we increment count corresponding to D and then A and C and like that.

80
00:06:14,560 --> 00:06:19,000
So every time we encounter a new key, we simply increment one of these counters.

81
00:06:19,000 --> 00:06:25,680
In one pass through, we get an array that gives us the number of A's B, C's, D's, E's, and F's.

82
00:06:25,680 --> 00:06:32,199
That's the first pass of key index counting count the frequencies of each letter using the key as an index.

83
00:06:33,199 --> 00:06:38,920
Now the next step is called computing cumulates.

84
00:06:38,920 --> 00:06:43,120
And that's a really easy thing as well.

85
00:06:43,120 --> 00:06:56,759
All we do is we go through the count array and simply at each step, we add the current one to the sum computed so far.

86
00:06:57,159 --> 00:07:03,360
So if we look before, we had two A's and three B's.

87
00:07:03,360 --> 00:07:15,599
So that means there's five letters less than C. That's the A's and the B's and there's six letters less than D and eight letters less than E and so forth.

88
00:07:15,599 --> 00:07:20,920
And that's just obtained by, we start with two and three to get five.

89
00:07:20,920 --> 00:07:34,080
So we have one to get six and with that one passed through the count array, then we can find out, for example, there's six keys less than D and eight keys less than E.

90
00:07:34,080 --> 00:07:39,680
In those cumulates, tell us where the D's go in the output.

91
00:07:39,680 --> 00:07:46,240
There's six keys less than D and eight keys less than E. So the D's have to go in A6 and A7.

92
00:07:46,240 --> 00:07:53,600
This is an array of indices that is going to tell us how to distribute the keys in the output.

93
00:07:53,600 --> 00:08:02,040
So that's the next step is access the cumulates using the key as an index to move items.

94
00:08:02,040 --> 00:08:08,639
So let's take a look at, so now remember when we see an A, we're just going to count that at zero.

95
00:08:08,639 --> 00:08:14,639
So we're going to go to count zero and that'll access this entry in the counter array.

96
00:08:14,639 --> 00:08:25,279
So we go through the whole array to be sorted and we move each key exactly to where it has to go and we'll do that one at a time now.

97
00:08:25,279 --> 00:08:37,600
So when I is zero, we're looking at the D. The count array corresponding to D has six, so it says just put D in there and increment that means if you get another D, it's going to go into seven.

98
00:08:37,600 --> 00:08:41,360
And these things the way we pre-computed them, we're not going to run into one another.

99
00:08:41,360 --> 00:08:50,440
So now A, we go, that goes in zero and we increment the counter array corresponding to A. Next thing is C.

100
00:08:50,440 --> 00:09:03,080
And so that's going to says to put it in five and then increment the counter array corresponding to C and F, it says put it in nine.

101
00:09:03,080 --> 00:09:06,759
Next is B, we put in two.

102
00:09:06,759 --> 00:09:09,200
Sorry, another F, we put in 10.

103
00:09:09,200 --> 00:09:11,279
Next is B that we put in two.

104
00:09:11,279 --> 00:09:21,720
So you can see the keys from the input are getting distributed in the output according to the counts and the cumulus that we pre-computed.

105
00:09:21,720 --> 00:09:26,199
So now we get the other D which goes into seven.

106
00:09:26,199 --> 00:09:33,079
We get the another B which goes into three and then increment the four to move where the next one goes.

107
00:09:33,080 --> 00:09:42,080
F goes into 11, the last B goes into four, the E goes into eight and the second A goes into one.

108
00:09:42,080 --> 00:09:51,120
So that's moved the items again simply by using the key as index into the counter array.

109
00:09:51,120 --> 00:10:00,160
And then the last step is to just copy the sorted array back into the original input.

110
00:10:00,159 --> 00:10:04,319
So that's a demo of key index counting.

111
00:10:04,319 --> 00:10:06,719
Quick summary of key index counting.

112
00:10:06,719 --> 00:10:13,439
We make one pass through V array to count frequencies of each letter using the keys and index.

113
00:10:13,439 --> 00:10:23,039
Then we go through that counter array to compute cumulus just by adding each new one into the running sum.

114
00:10:23,039 --> 00:10:35,799
Then we use those cumulus and access that using key as index to actually move items over and get them in sorted order and then move back into the original array.

115
00:10:35,799 --> 00:10:38,159
What's the running time of this algorithm?

116
00:10:38,159 --> 00:10:50,480
Well, the analysis is actually quite simple because it's just a couple of loops through the array to be sorted and through the count array.

117
00:10:50,480 --> 00:11:00,840
The key fact to note that it takes time proportional to n plus r and space proportional to n plus r.

118
00:11:00,840 --> 00:11:05,960
Now r, remember as our radix, that's a number of different character values.

119
00:11:05,960 --> 00:11:10,720
So for asking maybe that's 256.

120
00:11:10,720 --> 00:11:16,360
And for genomic data, maybe it's four.

121
00:11:16,360 --> 00:11:19,759
And in, we're assuming we're sorting huge files.

122
00:11:19,759 --> 00:11:27,799
So really this is linear time in many, many practical situations.

123
00:11:27,799 --> 00:11:30,240
There's also the question of is it stable?

124
00:11:30,240 --> 00:11:40,919
Yeah, it's actually stable because when we do the move, we move things with equal keys in the order that we see and we keep them in the order that we see them.

125
00:11:40,919 --> 00:11:43,279
That's just the way the method works.

126
00:11:43,279 --> 00:11:57,120
So we have for this special situation, we have a linear time stable sorting method which beats the n log n bound and is useful in many practical situations.

