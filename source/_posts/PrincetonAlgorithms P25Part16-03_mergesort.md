---
title: PrincetonAlgorithms P25Part16 03_mergesort
---

1
00:00:00,000 --> 00:00:08,439
Welcome back. Today we're going to look at merge sort, which is one of two classic sorting

2
00:00:08,439 --> 00:00:14,000
algorithms that are critical components in the world's computational infrastructure.

3
00:00:14,000 --> 00:00:18,160
We have a full scientific understanding of the properties of these algorithms, and they've

4
00:00:18,160 --> 00:00:23,960
been developed as practical system sorts and application sorts that have been heavily

5
00:00:23,960 --> 00:00:29,359
used over the past 50 years. In fact, a quick sort, which we'll consider next time, was

6
00:00:29,359 --> 00:00:35,439
honored as one of the top 10 algorithms of the 20th century in science and engineering.

7
00:00:35,439 --> 00:00:40,960
This lecture we're going to look at merge sort, which is the basic sort in plenty of

8
00:00:40,960 --> 00:00:46,760
different programming systems, including Java. Next time we'll look at quick sort, which

9
00:00:46,760 --> 00:00:55,399
is also used in Java for different applications. All right, so basic merge sort algorithm,

10
00:00:55,399 --> 00:01:00,879
what's it going to look like? The idea is very simple. What we're going to do is divide

11
00:01:00,879 --> 00:01:08,079
an array into two halves, recursively sort each of the halves, and then merge the result.

12
00:01:08,079 --> 00:01:15,640
That's the overview of merge sort. It was actually one of the first non-trivial algorithms

13
00:01:15,640 --> 00:01:23,840
implemented on a computer. John Von Neumann realized the development of the Edback, his

14
00:01:23,840 --> 00:01:28,560
Edback computer, one of the first general purpose computers that was going to need a sorting

15
00:01:28,560 --> 00:01:33,760
method, and he came up with merge sort as widely credited as being the inventor of merge

16
00:01:33,760 --> 00:01:44,040
sort. The idea of merge sort is based on the idea of merging. To understand how merging

17
00:01:44,040 --> 00:01:51,840
works, we'll think about the idea of an abstract in place merge. We've got an array A, and

18
00:01:51,840 --> 00:01:57,920
its first half is sorted, and its second half is sorted. The computation we need to perform

19
00:01:57,920 --> 00:02:05,040
is to replace that with the sorted array where those two sub halves are merged together.

20
00:02:05,040 --> 00:02:15,480
Let's look at a demo. The method that we're going to use is based on taking an auxiliary

21
00:02:15,480 --> 00:02:21,560
array to hold the data. This is one of the easiest ways to implement the merge. The first

22
00:02:21,560 --> 00:02:29,560
thing we do is copy everything over to the auxiliary array. Once that's done, what we'll

23
00:02:29,560 --> 00:02:36,840
want to do is copy back to the original array, but get it in sorted order. In order to do

24
00:02:36,840 --> 00:02:43,759
that, we're going to maintain three indices. I, the current entry on the left half, j,

25
00:02:43,759 --> 00:02:51,480
the current entry on the right half, and k, the current entry in the sorted result.

26
00:02:51,479 --> 00:02:58,479
So the first thing we do is take the smaller of the two entries pointed to by i and j,

27
00:02:58,479 --> 00:03:06,679
and compare those, and take the smallest one, and move that one to be the next item output.

28
00:03:06,679 --> 00:03:12,479
In whichever one is taken, we increment its pointer. Now we compare the minimum again. Again,

29
00:03:12,479 --> 00:03:18,120
the one pointed to do by j is smaller, so we move that one to k, increment that pointer

30
00:03:18,120 --> 00:03:26,120
j, and also increment k. Now there's two e's equal. We always take the first, so the one

31
00:03:26,120 --> 00:03:35,120
in the left array goes to k's position, and now we increment i and k. And again, it's an e

32
00:03:35,120 --> 00:03:41,120
in their equal, but we'll take the first one, so we move that one up, increment i and k.

33
00:03:41,120 --> 00:03:47,800
Now jz is smaller than g. It's the next thing that has to go in the output, so we move that

34
00:03:47,800 --> 00:03:54,160
one up, and increment j and k. Now the one pointed to by i is the g is smaller, so move that

35
00:03:54,160 --> 00:04:03,640
up, increment i and k. Move the m up, increment i and k. Now the last element in the left

36
00:04:03,640 --> 00:04:10,360
subarray is the one that's going to get moved next. And now that first subarray is exhausted,

37
00:04:10,360 --> 00:04:15,360
so really all we need to do is take the rest of the elements from the right part and move

38
00:04:15,360 --> 00:04:23,080
them back in. Actually, since we copied, we could optimize by avoiding these moves. That's

39
00:04:23,080 --> 00:04:31,480
an abstract in place merge for taking the two sorted sub halves of an array, using an auxiliary

40
00:04:31,480 --> 00:04:36,520
array, move them out, and then put them back in in sorted order. All right, so here's the

41
00:04:36,520 --> 00:04:45,319
code for merging, which is quite straightforward from the demo. We first, in order to

42
00:04:45,319 --> 00:04:54,680
sort an array of comparable, in a simple notation, we pass a link to the auxiliary array in

43
00:04:54,680 --> 00:05:01,279
as well. And we have three arguments, low, mid, and high, so low is the first part of the

44
00:05:01,279 --> 00:05:08,519
array to be sorted, mids the midpoint, that divides the first part from the second, so our

45
00:05:08,519 --> 00:05:15,519
conditions are that from low to mid is sorted and from mid plus one to high is sorted. So the

46
00:05:15,519 --> 00:05:20,159
merge implementation, then the first thing it does is copy everything over to the auxiliary

47
00:05:20,159 --> 00:05:27,959
array. And then that sets up for this for loop that accomplishes the merge. We start our

48
00:05:27,959 --> 00:05:33,079
i pointer at the left part of the left half, the j pointer at the left part of the right

49
00:05:33,079 --> 00:05:38,959
half, that's mid plus one, and we start the k pointer at the beginning low. And for every

50
00:05:38,959 --> 00:05:51,079
value of k, what we're most often doing is comparing whether ox of j is less than ox of i. And if

51
00:05:51,079 --> 00:05:59,000
it is, we move the element at j over an increment j. If it's greater, we move the element i over

52
00:05:59,000 --> 00:06:05,120
an increment i, and then in both cases we're increment a, that increment k and that

53
00:06:05,120 --> 00:06:11,600
implements the merge. If the i pointer is exhausted, then we just move over the next j

54
00:06:11,600 --> 00:06:18,439
element, if the j pointer is exhausted, we move over the next i element. So every time we're

55
00:06:18,439 --> 00:06:25,480
moving a new element into k, and that's the code that implements the abstract in place merge.

56
00:06:25,480 --> 00:06:34,840
Now, with this code, we're also introducing the idea of making assertions just to make it easier

57
00:06:34,840 --> 00:06:42,600
to debug in our code and to have confidence that it's correct. In this case, this insertion

58
00:06:42,600 --> 00:06:52,840
just says we want to be sure that a of load of mid is sorted and that mid plus one to high is sorted

59
00:06:53,239 --> 00:07:00,119
before our code. And then we want to check that the whole thing is sorted after our code. In

60
00:07:00,119 --> 00:07:07,799
generally programmers, Java programmers know that it's a good idea to try to do these assertions.

61
00:07:09,159 --> 00:07:14,039
Not only does it help detect bugs, but it also documents what the code is supposed to do. And

62
00:07:14,039 --> 00:07:19,159
that merge code is a good example of this. If you put it at the beginning of the code, what you

63
00:07:19,160 --> 00:07:25,400
expect in the form of an assertion, which is code itself, and you put it at the end of the code,

64
00:07:25,400 --> 00:07:30,120
what you think it's going to do, again, in the form of an assertion. You're both testing that

65
00:07:30,120 --> 00:07:35,160
these conditions hold and also telling someone reading the code what you're trying to do with it.

66
00:07:36,840 --> 00:07:44,200
So Java is just an assert statement. It takes a Boolean condition. In this case, we're using that

67
00:07:44,199 --> 00:07:51,000
method is sorted that we wrote before. That returns true if the port of the array is sorted and false

68
00:07:51,000 --> 00:07:57,800
if it's not. And what assert will do is it'll throw an exception unless that condition is true.

69
00:07:58,839 --> 00:08:03,560
Now the thing about assertions in Java is that you can enable or disable them at runtime.

70
00:08:04,439 --> 00:08:10,039
And that's really important because it means that you can put them into your code to check

71
00:08:10,040 --> 00:08:17,879
while developing, but it doesn't incur any extra costs at all in production code. So by default,

72
00:08:17,879 --> 00:08:25,879
assertions are disabled. Something goes wrong. Somebody analyzing the situation can enable insertions.

73
00:08:26,439 --> 00:08:34,600
And they often will help find out what the problem is. So the best practice is to use insertions

74
00:08:34,680 --> 00:08:41,000
just as we did in that example with merge and to assume that they're not going to be there in

75
00:08:41,000 --> 00:08:45,800
production code. So you shouldn't use them for things like checking if the input is the way you like it.

76
00:08:48,040 --> 00:08:54,040
All right, so with that merge implementation, then the sort implementation is a quite simple

77
00:08:54,040 --> 00:09:01,800
recursive procedure shown here. So we use the merge procedure we just showed. And then our sort

78
00:09:01,799 --> 00:09:08,839
procedure is recursive. So checks that we have something to do first. And it computes the value

79
00:09:08,839 --> 00:09:16,279
of the midpoint, the same way as we did for binary search, sort the first half, sort the second half,

80
00:09:16,279 --> 00:09:24,679
and then merge them together. And then the actual sort is takes just the one argument of the array,

81
00:09:25,479 --> 00:09:34,359
creates the auxiliary array and then uses that. Now it's important to not create the auxiliary array

82
00:09:34,359 --> 00:09:42,759
in the recursive routine because that could lead to extensive cost of extra array creation.

83
00:09:43,479 --> 00:09:49,159
You'll sometimes see merge sort performing poorly because of that bug. Otherwise,

84
00:09:50,120 --> 00:09:56,839
this is a very straightforward implementation. And it's actually a prototype for algorithm design

85
00:09:56,839 --> 00:10:02,120
that we'll see come up again again. It's called dividing conquer. Solve a problem by dividing

86
00:10:02,120 --> 00:10:07,399
in a two halves, solving the two halves, and then putting the solutions together to get an appropriate answer.

87
00:10:11,399 --> 00:10:16,839
Here's a trace of what merge sort does. And if you haven't studied a recursive program before,

88
00:10:17,560 --> 00:10:26,360
it's worthwhile studying this thing in some detail. This gives exactly what happens during

89
00:10:26,360 --> 00:10:31,639
each of the calls to merge. We start out with a big problem to solve, but we divide it in half,

90
00:10:31,639 --> 00:10:35,639
then we divide that one in half, and then we divide that one in half. And the very first thing

91
00:10:35,639 --> 00:10:41,400
that we actually do is just compare and exchange if necessary the first two elements. And then we

92
00:10:41,480 --> 00:10:47,319
do the same thing for the next two elements, then merge those two together to get the first four done.

93
00:10:47,959 --> 00:10:52,360
Then we do the same thing for the next four in the array. So now we have two sorted sub-raises

94
00:10:52,360 --> 00:10:57,480
in size four. We merge those together to get one of size eight. And then we do the same thing on

95
00:10:57,480 --> 00:11:02,519
the right. And eventually we have two eighths that we merge together to get the final result.

96
00:11:03,159 --> 00:11:09,879
Very instructive to study this trace to really understand what this recursive algorithm is doing.

97
00:11:11,399 --> 00:11:16,199
So now we can animate, and again merge sorts more efficient so we can do more and more items.

98
00:11:18,199 --> 00:11:22,919
You can see it's got the first half sorted. Now it's working on the second half.

99
00:11:24,039 --> 00:11:27,720
And then once it gets the second half sorted, then it's going to go ahead and merge them right

100
00:11:27,720 --> 00:11:35,879
together to get the sorted result. And it's got a little extra dynamics in the animation because

101
00:11:35,879 --> 00:11:41,000
of the auxiliary array. Let's look at it when it's in reverse order.

102
00:11:43,639 --> 00:11:47,159
Again, it gets the first half done. Now it's working on the second half.

103
00:11:49,399 --> 00:11:53,240
Once it gets the second half done, then it goes ahead and merges together the whole thing.

104
00:11:54,120 --> 00:11:58,200
It's just as fast and reverse sorted as in arbitrary order.

105
00:11:58,200 --> 00:12:07,160
So you can run merge sort on huge problems. It's a very efficient algorithm.

106
00:12:07,160 --> 00:12:16,520
And so for example, what this table shows, if you were to try to use insertion sort for a huge file,

107
00:12:16,520 --> 00:12:21,800
say a file of a billion elements on your PC, it'd take a few centuries to finish.

108
00:12:22,279 --> 00:12:29,639
Even on a supercomputer, if you're using insertion sort nowadays, it may be take a week or more.

109
00:12:30,199 --> 00:12:34,519
But if you have a good algorithm like merge sort and you're trying to do a billion items,

110
00:12:34,519 --> 00:12:41,959
you can do it in just less than half an hour on your PC. And a supercomputer can do it in an

111
00:12:41,959 --> 00:12:48,599
instant. And smaller problems only take an instant even on your PC. So you can spend a lot of money

112
00:12:49,240 --> 00:12:55,879
or a lot of time or you can use a good algorithm. And that's one of our main themes in this course.

113
00:12:56,680 --> 00:13:03,159
A good algorithm is much more effective than spending one of your time wasting one of your time

114
00:13:03,159 --> 00:13:11,960
using a bad one. So let's look at the analysis of merge sort. That's a bit of math but very

115
00:13:11,960 --> 00:13:20,200
instructive because this really shows the power of the divide and conquer method,

116
00:13:21,000 --> 00:13:27,560
and allow us to take a problem that was taking us quadratic time with methods like insertion

117
00:13:27,560 --> 00:13:34,680
and selection sort and get it done in n log n time with merge sort. So that's the proposition.

118
00:13:34,680 --> 00:13:41,080
Merge sort uses that most n log n compares and 6a n log n array accesses to sort any array of size n.

119
00:13:42,200 --> 00:13:51,160
And the way to prove this proposition is to from examining the code to write down what's

120
00:13:51,160 --> 00:13:57,800
called recurrence relation. And all that is it's a mathematical reflection of what's going on in

121
00:13:57,800 --> 00:14:06,200
the code. If we're sorting n items then let's see a van denote the number of compares that we need

122
00:14:06,200 --> 00:14:12,120
to sort the n items. In order to get that done we're sorting the left half and the right half.

123
00:14:13,400 --> 00:14:20,840
And there's notation ceiling of n over 2 and floor of n over 2. That's the n over 2 round up and

124
00:14:20,840 --> 00:14:26,920
over 2 round down. Now that's the size of the two sub arrays. And we're going to call the same routine

125
00:14:26,920 --> 00:14:31,160
for that size. So the number of compares you need for that is c of n over 2.

126
00:14:32,120 --> 00:14:36,919
ceiling of n over 2 for the left and c of floor of n over 2 for the right. And then for the merge

127
00:14:36,919 --> 00:14:45,319
we need at least at most n compares. If neither one exhaust we need exactly n compares.

128
00:14:45,799 --> 00:14:50,679
And so in that's true as long as n's bigger than one if there's only one thing we're not doing

129
00:14:50,679 --> 00:14:57,639
any compares at all. So this is a mathematical formula that we derive by examining the code.

130
00:14:58,600 --> 00:15:05,319
But it completely describes mathematically what we an upper bound on the number of compares

131
00:15:05,319 --> 00:15:10,840
that are going to be needed. And similarly for the number of array accesses if you count up the

132
00:15:10,840 --> 00:15:17,799
number of times you're accessing an array for a merge it could be at most 6 n. So these are

133
00:15:17,799 --> 00:15:23,720
mathematical formulas and there's techniques for solving them and we won't go into that. This is

134
00:15:23,720 --> 00:15:32,680
not a course in discrete mathematics. But what we can do is show how to solve the recurrence when

135
00:15:32,680 --> 00:15:38,120
n is a power of 2. And then it turns out that it holds for all n which we can prove by induction

136
00:15:38,120 --> 00:15:47,320
from the recurrence. So if you have this recurrence which is similar to the ones that we're talking

137
00:15:47,320 --> 00:15:54,040
about it's exactly the same one n is a power of 2. Let's let's look at this one. If d of n is

138
00:15:54,040 --> 00:16:01,240
2 d of n over 2 plus n with d of 1 equals 0 then d of n equals n log n. And we'll look at three

139
00:16:01,240 --> 00:16:07,960
proofs of that just assuming that n is a power of 2. If n is a power of 2 then n over 2 is also a

140
00:16:07,960 --> 00:16:15,560
power of 2 so the recurrence makes sense. So this is just a graphical representation. If we want to

141
00:16:15,559 --> 00:16:24,679
compute d of n we want to compute d of n over 2 twice. So that's 2. And then the extra cost for

142
00:16:24,679 --> 00:16:33,319
the merge is n. But if we're going to do this twice then we have 2 n over 2. We have 2 n over 2.

143
00:16:34,119 --> 00:16:40,839
And then for each one of these we have divided into n over 4s and each one of those 4 n over 4s

144
00:16:40,840 --> 00:16:47,639
has an extra cost for the merge of n over 4. Well 2 over 2 is n, 4 over 4 is n. And we keep going

145
00:16:47,639 --> 00:16:53,800
down doing that till we get down to d of 2. And we always for the extra cost of the merge we have n.

146
00:16:54,519 --> 00:16:59,879
And how many stages do we have here? Well it's the number of times you divide n by 2 to get

147
00:16:59,879 --> 00:17:06,039
down to 2. That's exactly the log base 2 of n. So the grand total of all the costs for the merge

148
00:17:06,200 --> 00:17:13,399
which is where the compares are is log n times n and log n. It's kind of a graphical proof or

149
00:17:13,399 --> 00:17:20,599
proof by picture that recurrence has that solution. Here's a little bit more mathematical one.

150
00:17:21,879 --> 00:17:28,759
We write the recurrence down and then we divide both sides by n.

151
00:17:29,079 --> 00:17:39,799
So then it says d of n over n equals d of n over 2 over n over 2 plus 1. So it's dividing by n.

152
00:17:40,440 --> 00:17:47,400
So now this is a recurrence that telescopes. The first term on the right hand side is exactly the

153
00:17:47,400 --> 00:17:53,559
same as the left hand side. So we can apply the same formula. And all it does is divides by 2

154
00:17:53,559 --> 00:17:59,639
again and then throws out another one. And we keep doing that until we get down to d of 1 which is

155
00:17:59,639 --> 00:18:07,240
0. And when we've done that we've thrown out log n ones. So we get d of n over n equals log n or d

156
00:18:07,240 --> 00:18:16,919
of n equals n log n. That's another proof by expansion. Or using either one of those techniques you

157
00:18:16,920 --> 00:18:26,360
could just get the idea that d of n is close to n log n. Or you can write a program to

158
00:18:26,360 --> 00:18:35,000
expand the recurrence and find that. And then once we have the idea that d of n equals n log n

159
00:18:35,000 --> 00:18:43,080
we can plug back into the original formula with the inductive hypothesis that d of n equals n log

160
00:18:43,720 --> 00:18:50,679
we want to show that d of 2n equals 2n log 2n. Using the recurrence d of 2n equals 2d of n plus

161
00:18:50,679 --> 00:18:59,000
throughout the 2n. Plugging in n log n we get the desired result. You use this same idea on our

162
00:18:59,000 --> 00:19:06,359
initial recurrences for compares and array accesses to show that the running the number of compares

163
00:19:06,359 --> 00:19:12,919
and array accesses proportional to n log n for merge sort. So that's the running time. Merge sort

164
00:19:12,919 --> 00:19:20,439
is fast. The other thing that we usually want to know is memory. And one of merge sort's characteristics

165
00:19:20,439 --> 00:19:27,000
is that in practical applications it uses extra space proportional to n. That is we need that

166
00:19:27,000 --> 00:19:33,639
extra auxiliary array for the last merge. We took two sorted sub arrays and we talked about an

167
00:19:33,640 --> 00:19:39,080
abstract in place merge but we didn't have an actual in place merge. We were using an extra sub

168
00:19:39,080 --> 00:19:47,880
array. So in place is important. A lot of times we're sorting everything we have. We want to

169
00:19:47,880 --> 00:19:54,280
fill up the memory with stuff to sort and then sort it. In search and selection and shell sort

170
00:19:54,280 --> 00:20:00,200
in place then we use much extra memory. Of a merge sort you can only sort really half of what

171
00:20:00,200 --> 00:20:07,000
you can fit in memory because you need that auxiliary array for the other half. If you want again

172
00:20:07,000 --> 00:20:11,960
if you think that the things we're studying are easy think about the idea of actually doing an

173
00:20:11,960 --> 00:20:18,519
in place merge. People have come up with methods for getting this done so it's theoretically possible

174
00:20:18,519 --> 00:20:24,200
but the methods are generally too complex to be useful in practice and they're not used

175
00:20:24,200 --> 00:20:29,799
but there could be out there some easy way to do an in place merge. That's another great algorithm

176
00:20:29,799 --> 00:20:35,799
waiting to be discovered. Now there's a number of practical improvements that we can use to make

177
00:20:35,799 --> 00:20:41,879
merge sort even more efficient than the simple one that we've looked at. We'll take a look at those

178
00:20:41,879 --> 00:20:49,319
because there are examples of techniques that we can use for other algorithms. First thing is that

179
00:20:49,319 --> 00:20:55,720
merge sort is too complicated to use for tiny arrays. So say the sub arrays are only of size 2

180
00:20:56,519 --> 00:21:02,519
or 3 or 4. There's too much overhead with the recursive calls and so forth to get that done

181
00:21:02,519 --> 00:21:10,440
efficiently and what's worse is the recursive nature of the sort definitely means that there's

182
00:21:10,440 --> 00:21:16,519
going to be lots of sub arrays to be sorted. So one improvement that we can make is to use insertion

183
00:21:16,519 --> 00:21:22,360
sort and just cut off and use insertion sort which is simple and efficient for small sub arrays.

184
00:21:22,359 --> 00:21:27,719
So that's adding this one line of code to merge sort. We'll make it quite a bit faster, maybe 20%

185
00:21:27,719 --> 00:21:34,279
faster. A second improvement that we can make that'll improve the performance for cases when

186
00:21:35,000 --> 00:21:41,879
the array is partly sorted. This should just stop if it's already sorted and that's going to happen

187
00:21:41,879 --> 00:21:46,599
in the case where the biggest element in the first half is less than or equal to small side

188
00:21:46,599 --> 00:21:53,079
in the second half. That means it's done. So that's easy. We just put a test in the recursive merge

189
00:21:53,079 --> 00:21:59,559
sort for that to this one line of code to check whether we're done. Now that way, for example, if you

190
00:21:59,559 --> 00:22:07,000
were to call merge sort for an array that's already in order, it would just do this test every time

191
00:22:07,639 --> 00:22:13,799
and it would be done in linear time. That's pretty helpful although not totally helpful but there's

192
00:22:13,799 --> 00:22:21,079
a lot of situations where that's helpful. The other thing that's possible to do in it's a little

193
00:22:21,079 --> 00:22:29,639
mind bending so the recommended only for experts is to save a little bit of time. You don't really

194
00:22:29,639 --> 00:22:36,839
have to copy over into the auxiliary array. You can kind of switch the role of the input in the

195
00:22:36,839 --> 00:22:43,639
auxiliary array every time you make a recursive call. You still need that array but you can set

196
00:22:43,640 --> 00:22:53,000
up the code in this way which to sort an array put the result in the other one to merge an array

197
00:22:53,000 --> 00:22:59,800
put the result back in the first one. So it's a recursive argument switchery to get the job done

198
00:22:59,800 --> 00:23:05,080
and it's effective. It means you don't have to actually move items and that saves a little bit of time.

199
00:23:05,079 --> 00:23:14,359
So here's a visualization of what the practical merge sort might look like and this is with

200
00:23:15,079 --> 00:23:24,599
big cut off to small sub files. So you get a visual feeling of how this sort gets the job done.

201
00:23:25,240 --> 00:23:30,279
That's the first little chunk and then the next little chunk and then merges us together and

202
00:23:30,279 --> 00:23:36,839
so forth and so on. A good visual representation of how merge sort gets its job done.

203
00:23:37,720 --> 00:23:46,200
That's the basic merge sort algorithm that we're going to look at different versions of the next.

