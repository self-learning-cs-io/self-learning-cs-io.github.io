---
title: PrincetonAlgorithms P92Part27 05_msd Radix Sort
---

1
00:00:00,000 --> 00:00:08,320
What can also get strings sorted by moving from left to right?

2
00:00:08,320 --> 00:00:13,800
That's called the MSD string sort or most significant digit first string sort.

3
00:00:13,800 --> 00:00:18,039
This is kind of related to what we do with quicksort.

4
00:00:18,039 --> 00:00:22,240
It's maybe viewed as a generalization of quicksort.

5
00:00:22,240 --> 00:00:29,240
So the idea is that we start with the first character to use key index counting on the first

6
00:00:29,239 --> 00:00:37,799
character of the array and that'll partition it into the strings that start with each character.

7
00:00:37,799 --> 00:00:44,759
So if we use the first character, the leftmost character in the string is the first character

8
00:00:44,759 --> 00:00:45,920
in this case.

9
00:00:45,920 --> 00:00:49,599
Then we get all the strings that start with A followed by all the strings that start

10
00:00:49,599 --> 00:00:56,119
with B and so forth and then recursively use the same method for each subfile.

11
00:00:56,119 --> 00:01:03,799
Essentially we have a sub array for each of the characters and that cumulot that we built

12
00:01:03,799 --> 00:01:11,479
with key index counting gives us the sub arrays and actually completely delineates the sub arrays

13
00:01:11,479 --> 00:01:13,560
that we need to sort.

14
00:01:13,560 --> 00:01:19,840
Remember we had built up this array that said that there's six keys less than D and eight

15
00:01:19,840 --> 00:01:21,799
keys less than E and so forth.

16
00:01:21,799 --> 00:01:28,759
So that tells us exactly precisely the boundaries of the sub array that contain the keys that

17
00:01:28,759 --> 00:01:34,759
start with D and then we can just use the same method recursively to sort each of the sub

18
00:01:34,759 --> 00:01:40,200
arrays one for each character.

19
00:01:40,200 --> 00:01:48,840
Now this is a little bit complicated trace but if you look at it more carefully after

20
00:01:48,840 --> 00:01:58,079
the lecture you'll see that it's pretty simple setup for what we need to do.

21
00:01:58,079 --> 00:02:03,439
So here's our input and we sort on the first character.

22
00:02:03,439 --> 00:02:09,000
If we sort on the first character in this example we have lots of S's.

23
00:02:09,000 --> 00:02:13,640
So the subfile for the S's it's already sorted on the first character.

24
00:02:13,640 --> 00:02:16,920
This D is the digit that we're currently working on it.

25
00:02:16,919 --> 00:02:21,319
So then we sort that on it's the rest of the first character.

26
00:02:21,319 --> 00:02:24,839
So it's the second character in all the words that start with S.

27
00:02:24,839 --> 00:02:29,479
And then there's a lot of them that start with E so we move on to the third character for

28
00:02:29,479 --> 00:02:33,560
those and then there's some that start with A and so forth.

29
00:02:33,560 --> 00:02:45,060
So recursively every time that we move on with character we have to keep going until one

30
00:02:45,060 --> 00:02:50,539
thing we have to do is if there's two keys that are equal we have to examine every character

31
00:02:50,539 --> 00:02:58,900
in the keys we never find out that the two keys are equal until the end.

32
00:02:58,900 --> 00:03:04,539
And if we reach the end of a string you can just assume that goes before any character

33
00:03:04,539 --> 00:03:11,099
value and with those two things then you can trace through the recursion to see how

34
00:03:11,099 --> 00:03:13,699
MSD string sort works.

35
00:03:13,699 --> 00:03:17,819
So again in this case it's sorted by the first character.

36
00:03:17,819 --> 00:03:23,019
A and B have only subfiles of size once you don't have to do anything.

37
00:03:23,019 --> 00:03:28,019
So then most of this slide is showing what happens with the keys that start with S.

38
00:03:28,019 --> 00:03:33,459
And then at the end there's the two keys that start with T and they have both H's and

39
00:03:33,459 --> 00:03:36,500
both E's we have to go through the whole thing.

40
00:03:36,500 --> 00:03:41,500
So that's an example of MSD string sort.

41
00:03:41,500 --> 00:03:48,539
Now if strings are variable length like they were in that example we just treat them as

42
00:03:48,539 --> 00:03:55,539
if they had an extra character at the end that's smaller than any character so they'll appear

43
00:03:55,539 --> 00:04:01,180
before they're supposed to appear alphabetically before strings that have the same starting

44
00:04:01,180 --> 00:04:03,740
characters that are longer.

45
00:04:03,740 --> 00:04:12,580
So you could do that by overloading implementing care at to just return minus one if we're

46
00:04:12,580 --> 00:04:16,939
past the character that we're looking at.

47
00:04:16,939 --> 00:04:21,780
So that's an easy part of the implementation.

48
00:04:21,780 --> 00:04:28,540
One thing to point out in the C programming language the representation of strings puts

49
00:04:28,540 --> 00:04:35,939
an extra character that's zero at the end and no string has a zero character so we actually

50
00:04:35,939 --> 00:04:38,220
enough to do anything at all.

51
00:04:38,220 --> 00:04:50,900
But with that change the code for MSD string sort is also really an extremely simple modification

52
00:04:50,900 --> 00:04:54,540
or extension to key index counting.

53
00:04:54,540 --> 00:05:02,540
So we've got our sort and it takes its input array and then the output buffer and then

54
00:05:02,540 --> 00:05:08,340
we have to take the delimiters of the subfire we're going to sort low and high just like

55
00:05:08,340 --> 00:05:13,140
we've done for other recursive sorts.

56
00:05:13,140 --> 00:05:23,340
We go ahead and we do the key index counting again to take care of we have to take care of

57
00:05:23,339 --> 00:05:29,459
the fact that we have an extra character that the end of string character and also pull

58
00:05:29,459 --> 00:05:34,659
out the deep character of our string just like we did for LSD sort.

59
00:05:34,659 --> 00:05:41,019
And we just go through the whole thing and sort according to the given character and

60
00:05:41,019 --> 00:05:49,459
then what we do next is just do a recursive call for every entry in the counter array where

61
00:05:49,459 --> 00:05:54,500
we just sort the part of the array from count of R to a localist count of R to a localist

62
00:05:54,500 --> 00:06:02,699
count of R plus one really just when line of code for each subarray and then we move to

63
00:06:02,699 --> 00:06:04,299
the right one character.

64
00:06:04,299 --> 00:06:11,299
Again, this is a very little code to get a very useful and powerful sorting method that's

65
00:06:11,299 --> 00:06:14,979
MSD string sorting.

66
00:06:14,980 --> 00:06:22,540
One thing to notice is that with the extra output buffer we can use that even with a

67
00:06:22,540 --> 00:06:24,700
recursive calls but not the counter array.

68
00:06:24,700 --> 00:06:31,980
We have to keep the counter array around so it's got to be local to the recursive procedure

69
00:06:31,980 --> 00:06:36,900
because when we call for the next character we're going to need a new counter array for

70
00:06:36,900 --> 00:06:37,900
that character.

71
00:06:37,899 --> 00:06:45,620
To say the old one to do the next subarray for the calling method that turns out to be

72
00:06:45,620 --> 00:06:50,699
important because there's the potential for big problems with MSD sort when we start

73
00:06:50,699 --> 00:06:53,259
looking at the analysis.

74
00:06:53,259 --> 00:06:59,419
The thing to notice is that if you have a tiny array say an array of size two doesn't

75
00:06:59,419 --> 00:07:05,739
matter how small your array is you need to have a counter array for each potential character

76
00:07:05,740 --> 00:07:09,060
in the alphabet.

77
00:07:09,060 --> 00:07:15,019
So for ASCII just to initialize the counter array to set it to zero just create it it's going

78
00:07:15,019 --> 00:07:23,259
to be a hundred times slower than just sorting the thing or just copying it back.

79
00:07:23,259 --> 00:07:31,460
And if you're using Unicode it's 32,000 times slower and what's worse is it's a recursive

80
00:07:31,459 --> 00:07:36,899
program so there's going to be lots of small subarrays.

81
00:07:36,899 --> 00:07:47,139
Sorry this feature or characteristic of MSD string sort actually reared it's early head

82
00:07:47,139 --> 00:07:54,419
in a lot of applications that we're using it when people switched from ASCII to Unicode

83
00:07:54,420 --> 00:08:02,980
a while back all of a sudden programs that were really efficient sorts all of a sudden

84
00:08:02,980 --> 00:08:09,700
became hundreds of times slower with the switch to Unicode because these bigger arrays in

85
00:08:09,700 --> 00:08:15,420
the recursive procedure of these bigger arrays in the recursive procedure it was a serious

86
00:08:15,420 --> 00:08:22,740
performance problem so you definitely have to watch out for that with MSD string sort.

87
00:08:22,740 --> 00:08:29,860
Now there is a good solution to avoid this danger in the same solution we've used before

88
00:08:29,860 --> 00:08:34,899
if you've got a small subarray in the sort is going to be slower just cut off to insertion

89
00:08:34,899 --> 00:08:35,899
sort.

90
00:08:35,899 --> 00:08:42,539
And the other thing you can do is save some more time is to just have insertion sort

91
00:08:42,539 --> 00:08:47,940
and start at the character that we're currently working on because we know things are equal

92
00:08:47,940 --> 00:08:55,540
to the left and we're just looking for the right and that's easy to implement just by changing

93
00:08:55,540 --> 00:09:02,500
the implementation of the compare function to take into account which character we're at.

94
00:09:02,500 --> 00:09:09,060
Notice it's quicker and it happens we quicker in Java to just pull out the substrings and use

95
00:09:09,060 --> 00:09:16,580
compared to then to go in and get the carers that's just a feature of the implementation.

96
00:09:16,580 --> 00:09:21,060
So switching to cutting off to insertion sort for small subarrays is definitely a good

97
00:09:21,060 --> 00:09:25,020
idea for MSD string sort.

98
00:09:25,020 --> 00:09:28,940
And so what about the performance of this method?

99
00:09:28,940 --> 00:09:36,620
Well the key characteristic of MSD string sort is it examines just the characters that it

100
00:09:36,620 --> 00:09:40,900
needs to examine in order to get the key sorted.

101
00:09:40,900 --> 00:09:45,900
So that means that its performance is going to be really dependent on the data.

102
00:09:45,899 --> 00:09:52,139
Now in the worst case for the algorithm it has to examine all the data.

103
00:09:52,139 --> 00:09:56,179
In this case all the characters in all the strings.

104
00:09:56,179 --> 00:10:00,340
And that's for example when they're all equal.

105
00:10:00,340 --> 00:10:03,259
It's going to look at all the characters.

106
00:10:03,259 --> 00:10:08,459
If you have some duplicate keys it might have to examine all the characters in those duplicate

107
00:10:08,459 --> 00:10:15,620
keys but there's plenty of other strings that it doesn't examine all the characters.

108
00:10:15,620 --> 00:10:23,899
So depending on the end of the keys or random in some way or they're approximated by random

109
00:10:23,899 --> 00:10:28,740
keys, then it's not going to examine very many characters at all.

110
00:10:28,740 --> 00:10:36,379
Actually and this is a typical case say for account numbers or some situation library

111
00:10:36,379 --> 00:10:39,659
call numbers or some situation like that.

112
00:10:39,659 --> 00:10:46,299
In a case like that MSD string sort will examine only a small fraction of the data,

113
00:10:46,299 --> 00:10:49,379
a small constant fraction of the data.

114
00:10:49,379 --> 00:10:51,659
And it's so it's going to be sublinear.

115
00:10:51,659 --> 00:10:59,899
Now it's also possible that sorts that do comparisons can be sublinear but MSD string sort

116
00:10:59,899 --> 00:11:05,659
is good in that it really only examines the characters that need to be examined in order

117
00:11:05,659 --> 00:11:08,059
to get the sort done.

118
00:11:08,059 --> 00:11:12,739
So this gives us another line on the table.

119
00:11:12,739 --> 00:11:21,419
And the key here is that if the data is approximated by random log base R, then it's going to be

120
00:11:21,419 --> 00:11:25,099
pretty well approximated by a constant in the real world.

121
00:11:25,099 --> 00:11:29,099
So this is going to be a fast method.

122
00:11:29,099 --> 00:11:37,500
The one danger is that you have to worry about using too much extra space with those

123
00:11:37,500 --> 00:11:39,500
big counter rays.

124
00:11:39,500 --> 00:11:46,299
But that's an important and useful practical sorting method.

125
00:11:46,299 --> 00:11:54,419
So now let's look at MSD string sort versus quick sort for strings.

126
00:11:54,419 --> 00:11:55,899
They are similar in many ways.

127
00:11:55,899 --> 00:12:00,539
They're both recursive methods that partition a file up.

128
00:12:00,539 --> 00:12:08,980
So one of the problems with MSD string sort is that it tends to when it's doing the counting,

129
00:12:08,980 --> 00:12:11,779
it's kind of making random accesses to memory.

130
00:12:11,779 --> 00:12:15,459
When it particularly when it's distributing the keys out.

131
00:12:15,459 --> 00:12:23,139
So on modern systems that have caches, not everything is in a fastest memory at the same

132
00:12:23,139 --> 00:12:28,579
time in programs that move from one piece of data to another right next are going to be

133
00:12:28,579 --> 00:12:30,099
much more efficient.

134
00:12:30,100 --> 00:12:34,540
And quick sorts like that, an MSD string sort is not.

135
00:12:34,540 --> 00:12:39,540
Another disadvantage of MSD string sort is that there's actually quite a few instructions

136
00:12:39,540 --> 00:12:45,740
in the interloop with the indexing and the counting and the plus and the accumulating

137
00:12:45,740 --> 00:12:47,019
and so forth.

138
00:12:47,019 --> 00:12:55,379
Whereas quick sort remember is fast because it has only a few instructions in the interloop.

139
00:12:55,379 --> 00:12:59,460
And MSD string sort uses extra space.

140
00:12:59,460 --> 00:13:03,899
Whereas quick sort, there's two things.

141
00:13:03,899 --> 00:13:09,340
One is it's not linear in these applications where MSD string sort is.

142
00:13:09,340 --> 00:13:14,899
And kind of the reason that it's not linear is that if you've got keys that have a lot

143
00:13:14,899 --> 00:13:21,779
of the same characters at the beginning, when it's doing the compares, it has to rescan

144
00:13:21,779 --> 00:13:25,179
or recompare lots of those characters.

145
00:13:25,179 --> 00:13:30,859
So what we're going to look at next is try to get this, achieve this goal of combining

146
00:13:30,859 --> 00:13:33,500
the advantages of these two sorting algorithms.

