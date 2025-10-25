---
title: MIT6100 P24P24SortingAlgorithms
---

1
00:00:00,000 --> 00:00:23,320
So today marks the last lecture on the subject of sorting algorithms, or on the subject of

2
00:00:23,320 --> 00:00:29,080
complexity, and specifically we will be talking about sorting algorithms.

3
00:00:29,079 --> 00:00:33,519
So let's remember where we left off at the end of last lecture.

4
00:00:33,519 --> 00:00:38,960
We tried to look for elements within a list, and this is a really common problem in computer

5
00:00:38,960 --> 00:00:44,879
science, where the list is basically a large data set that you might have gathered on,

6
00:00:44,879 --> 00:00:51,640
I don't know, biology information or physical experimental data, some big file of data,

7
00:00:51,640 --> 00:00:56,280
and one of the most common things you might want to do on such a file is to search for something

8
00:00:56,280 --> 00:01:00,520
within that file. Basically you'll read it in as a list, and you'll search for something

9
00:01:00,520 --> 00:01:06,159
of interest within this list. So we saw two algorithms to search for an element within

10
00:01:06,159 --> 00:01:13,520
a list. The first was just a straight-up linear search. That linear search we did on an unsorted

11
00:01:13,520 --> 00:01:18,560
list, and we also did it on a sorted list. And what we saw was that the worst-case time

12
00:01:18,560 --> 00:01:24,920
complexity for searching for an element within a list using linear search was theta-a-venn.

13
00:01:24,920 --> 00:01:32,200
That's the best that we could do. Now, we saw the binary search algorithm as an alternate

14
00:01:32,200 --> 00:01:36,680
way to search for an element in a list, but the caveat to using the binary search algorithm

15
00:01:36,680 --> 00:01:43,040
was that we had to have a sorted list. We can't use this binary search algorithm on an unsorted

16
00:01:43,040 --> 00:01:49,200
list because it will give us an incorrect answer. So assuming the list is sorted, binary

17
00:01:49,200 --> 00:01:54,719
search does a much faster job at finding the element within a list. It does it in theta

18
00:01:54,719 --> 00:02:02,400
of log n time, which is faster than theta-a-venn. The timing through a code that we did showed

19
00:02:02,400 --> 00:02:07,920
this, counting the number of operations showed this, and then the theory also showed this.

20
00:02:07,920 --> 00:02:15,400
All right. So clearly it is better to use binary search because it's faster, but when does

21
00:02:15,400 --> 00:02:21,680
it make sense to use binary search? So the idea is given some sort of data set, right,

22
00:02:21,680 --> 00:02:28,360
some list of elements, we would have to first sort them in order to do binary search. So the

23
00:02:28,360 --> 00:02:34,520
question then becomes the time that it takes for us to do a sort. Plus the time that it takes

24
00:02:34,520 --> 00:02:40,480
for us to use binary search to look for an element within that list should be less than the time

25
00:02:40,480 --> 00:02:45,480
that it takes for us to do linear search, right? In that case, it makes sense for us to do a sort

26
00:02:45,479 --> 00:02:52,799
of binary search. This implies that the time it takes for us to sort is less than the subtraction,

27
00:02:52,799 --> 00:03:00,759
so theta of n minus theta of log n. So this implies that we can sort a list in less than theta

28
00:03:00,759 --> 00:03:07,120
of n time. That means we can sort a list without even looking at each element in the list. And

29
00:03:07,120 --> 00:03:12,319
that's not possible, right? We have to at least go through each element in the list one at a time

30
00:03:12,319 --> 00:03:17,439
to determine that that list is sorted to begin with, right? So even in the best case scenario,

31
00:03:17,439 --> 00:03:24,239
to sort a list, that's going to be theta of n time. So clearly, this will never be true.

32
00:03:24,239 --> 00:03:31,079
So then the question becomes why do we bother doing binary search in the first place? Well,

33
00:03:31,079 --> 00:03:37,319
that's because oftentimes if you download a data set or you know, you want to do some search

34
00:03:37,319 --> 00:03:43,719
on some list or some data set that you get. Most of the time, you're not going to want to do it

35
00:03:43,719 --> 00:03:50,400
just once. You're going to want to sort that list one time and then do a whole bunch of searches

36
00:03:50,400 --> 00:03:56,319
for a whole bunch of different things within that list. So if we can somehow amortize the cost of

37
00:03:56,319 --> 00:04:05,079
doing one sort over K different searches, as K gets really, really big, it makes sense to do

38
00:04:05,080 --> 00:04:12,480
binary search on the sorted list rather than just to look through using linear search K different times,

39
00:04:12,480 --> 00:04:18,759
right? So then that time to do the sort only once kind of gets absorbed and goes to zero as the number,

40
00:04:18,759 --> 00:04:26,280
the K number of searches goes to some really big number. So clearly, we've shown that if you want to do

41
00:04:26,280 --> 00:04:34,120
many searches on a data set, it makes sense to do the sort only once. All right, so now we're going to look

42
00:04:34,120 --> 00:04:40,120
at a bunch of different sorting algorithms. We're going to start with some really bad ones and then we're going to work our way up to

43
00:04:40,120 --> 00:04:49,120
what is considered one of the best sorting algorithms, the best that we can do. So let's begin by showing a really, really bad sorting algorithm

44
00:04:49,120 --> 00:04:58,120
and there are actually competitions where people can come up with really bad sorting algorithms that kind of sort lists in a really weird way

45
00:04:58,120 --> 00:05:07,120
while being really bad still making forward progress. And this is one of them. So this one is called bogus sort coming from the bogus sort,

46
00:05:07,120 --> 00:05:15,120
also called random sort or monkey sort. So the idea here, and I'm going to use these cards as we look at these different sorting algorithms,

47
00:05:15,120 --> 00:05:27,120
the idea of bogus sort is that we're going to use randomness to help us sort the list. So if we wanted to sort a list or a deck of cards,

48
00:05:27,120 --> 00:05:35,120
for example, the idea of bogus sort is that we're going to take all our cards, we're going to throw them up in the air, we're going to pick them up as they land,

49
00:05:35,120 --> 00:05:42,120
and we're going to check to see if they're sorted. If they are, we're done. If they're not, we're going to repeat the process. We're going to throw them up in the air,

50
00:05:42,120 --> 00:05:52,120
let them fall where they may, and then we're going to check if they're sorted. Okay. So the code would look something like this. It takes in a list L,

51
00:05:52,120 --> 00:06:05,120
and it says, while the list is not sorted, we're going to call this shuffle function from the random library. And the shuffle function just re-shuffles or rearranges the elements in the list at random.

52
00:06:05,120 --> 00:06:18,120
So let me show you how that looks like. So here's the sorted function.

53
00:06:18,120 --> 00:06:36,120
I'm going to run it. So it starts out with this list of obviously elements not in order, and it took about 0.2 seconds to just randomly keep re-shuffling the elements of that list to give me for them to become in sorted order.

54
00:06:36,120 --> 00:06:52,120
So it did about 30,000 shuffles, and if I run it again, it will take a completely different amount of time each time it's run. Right. So now it was really fast, but if I keep running it, you know, one time I ran it last night, it took about 2 seconds. So you can see it's just random.

55
00:06:52,120 --> 00:07:03,120
So what's the complexity of this function? Clearly it's not going to be very good. At best. So in the best case scenario, let's say my input list is already sorted.

56
00:07:03,120 --> 00:07:14,120
So in the best case scenario, the theta would be just theta of n, where n is the length of the list, because we have to look at each element once to make sure that it's in its rightful place.

57
00:07:14,120 --> 00:07:28,120
But in the worst case scenario, the theta complexity of this is unbounded, so infinity. Because at worst case, we're going to be super unlucky, and we're just never going to get the elements in a sorted order.

58
00:07:28,120 --> 00:07:45,120
So in the case, not a very good sorting algorithm. If you go to the Wikipedia page for this, it'll give you a whole bunch of other examples of algorithms similar in this in this spirit of, you know, being bad, but making forward progress towards an answer.

59
00:07:45,120 --> 00:07:57,120
So we're going to look at a different sorting algorithm called bubble sort, and it's one of the most popular sorting algorithms, not because it's good, but because people really like to make fun of it.

60
00:07:57,120 --> 00:08:11,120
So it's best to understand it. So the idea of bubble sort is that we're going to start with a originally un-sorted list, and like I said, I'm going to use this as an example.

61
00:08:11,120 --> 00:08:25,120
And we're going to try to compare consecutive elements, one at a time. And as we do so, we're effectively going to bubble up the largest element towards the end of the list.

62
00:08:25,120 --> 00:08:41,120
So we're going to start our first pass on this clearly un-sorted list, and we're going to compare the first two elements. If the element at index i is smaller than the element at index i minus one, then I'm going to do a swap.

63
00:08:41,120 --> 00:08:51,120
So here they were, so I did a swap. Then I'm going to compare the next set of elements. So these two are already sorted. These two are not, so I'm going to swap them. These two are not.

64
00:08:51,120 --> 00:08:59,120
I'm going to swap them. These two are not. I'm going to swap them. They're not. I'm going to swap them. And these two are not. And I'm going to swap them.

65
00:08:59,120 --> 00:09:03,120
I'll just do it over because that table got in the way.

66
00:09:03,120 --> 00:09:15,120
So after I finished my first pass, this number, 11, effectively bubbled up from wherever it was towards the end of the list, the place where it belongs basically, right?

67
00:09:15,120 --> 00:09:31,120
It belongs at the end of the list because it's the biggest number. Since I've done at least one swap on that previous run, I'm going to go through again. Because in the process of doing a swap, I might have disarranged something that was already sort of in order.

68
00:09:31,120 --> 00:09:45,120
So now I'm going to start all over again. I'm going to say, are these two in sorted order? They are. Are these two? No, so I swap. Are these two? No, so I swap. Are these two? No, so I swap. I swap. And I swap.

69
00:09:45,120 --> 00:10:06,120
And now after two passes, I have effectively bubbled up the next biggest number. Next time through, I'm going to have to go again because I did one swap last time.

70
00:10:06,159 --> 00:10:15,620
So again, I'm going to compare these two, I need to swap them, these two, I need to swap them, these two, I need to swap them, swap them, swap them. And these are in order and these are in order.

71
00:10:15,620 --> 00:10:30,620
Again, 5 and the 4 needs to swap. 5 and the 1 needs to swap. 5 and the 0 needs to swap. 5 and the 2 needs to swap. These are in order. These are in order. 4 and the 1 needs to swap. These 2 need to swap. These need to swap, ordered, ordered, ordered.

72
00:10:30,620 --> 00:10:32,620
Next, these two need a swap.

73
00:10:32,620 --> 00:10:33,620
These are OK.

74
00:10:33,620 --> 00:10:35,620
These are OK and so on.

75
00:10:35,620 --> 00:10:41,320
And now that I've not, I'm going to do one final check.

76
00:10:41,320 --> 00:10:43,220
These are all in order, right?

77
00:10:43,220 --> 00:10:45,779
So now that I haven't done any more swaps,

78
00:10:45,779 --> 00:10:49,820
I can say that this list is now in sorted order.

79
00:10:49,820 --> 00:10:53,860
So with each pass, I'm bubbling up the biggest element

80
00:10:53,860 --> 00:10:55,379
towards the end of the list.

81
00:10:55,379 --> 00:11:01,980
So at the end of end passes, the top, the last, and elements

82
00:11:01,980 --> 00:11:05,220
will be in sorted order.

83
00:11:05,220 --> 00:11:08,340
So the code looks something like this.

84
00:11:08,340 --> 00:11:13,740
I've got a Boolean flag here that keeps track of whether or not

85
00:11:13,740 --> 00:11:15,539
I have done a swap.

86
00:11:15,539 --> 00:11:19,419
If I've done a swap, then I know I need to go through and double

87
00:11:19,419 --> 00:11:22,700
check that everything is still in order

88
00:11:22,700 --> 00:11:26,020
by comparing index i and i minus 1.

89
00:11:26,020 --> 00:11:31,140
So to do that, we've got a for loop that goes through from 1

90
00:11:31,140 --> 00:11:32,940
all the way up to the end of the list

91
00:11:32,940 --> 00:11:36,300
because I'm going to compare element and index i with i minus 1.

92
00:11:36,300 --> 00:11:39,500
If I started at 0, we'd get an index out of bounds error.

93
00:11:39,500 --> 00:11:41,379
So that's why I start with 1 over there.

94
00:11:41,379 --> 00:11:43,860
And then the inside of the for loop just checks

95
00:11:43,860 --> 00:11:48,300
if the element at, I guess, j, I use j and j and j and j minus 1

96
00:11:48,300 --> 00:11:49,580
are in the right order.

97
00:11:49,580 --> 00:11:50,660
Now, obviously, they are.

98
00:11:50,659 --> 00:11:53,899
But when I first started this demo, they were not.

99
00:11:53,899 --> 00:11:58,100
So as long as this j minus 1 and j are not in order,

100
00:11:58,100 --> 00:11:59,059
do a swap.

101
00:11:59,059 --> 00:12:04,139
So here, I just use this tuple trick here

102
00:12:04,139 --> 00:12:08,500
to do the swap of element j minus 1 and j.

103
00:12:08,500 --> 00:12:13,339
And I also reset the Boolean flag that I did the swap to true.

104
00:12:13,339 --> 00:12:17,699
And this goes through until I don't do any more swaps.

105
00:12:17,700 --> 00:12:22,740
And then the code will not go through the while loop anymore.

106
00:12:22,740 --> 00:12:25,660
So let's print how this actually looks

107
00:12:25,660 --> 00:12:28,900
like when we run it on our list.

108
00:12:28,900 --> 00:12:34,300
So here, I have my original list.

109
00:12:34,300 --> 00:12:39,020
Each set here, delineated by this line break,

110
00:12:39,020 --> 00:12:44,580
represents one loop of my while loop.

111
00:12:44,580 --> 00:12:47,379
So this thing here.

112
00:12:47,379 --> 00:12:49,740
One iteration of my while loop.

113
00:12:49,740 --> 00:12:57,019
And each line within here represents one iteration of my for loop.

114
00:12:57,019 --> 00:13:01,259
So what we can see is that as we're comparing the four

115
00:13:01,259 --> 00:13:04,980
and the eight, the eight bubbles up was step over,

116
00:13:04,980 --> 00:13:08,980
then we compare the eight and the six,

117
00:13:08,980 --> 00:13:12,659
the eight bubbles itself over and so on and so on until it

118
00:13:12,659 --> 00:13:13,700
encounters the 11.

119
00:13:13,700 --> 00:13:17,179
And then the 11 starts to bubble itself up all the way to the end.

120
00:13:17,179 --> 00:13:19,939
So at the end of the first while loop pass,

121
00:13:19,939 --> 00:13:23,459
my 11 is in its rightful spot at the top of the list,

122
00:13:23,459 --> 00:13:25,259
at the end of the list.

123
00:13:25,259 --> 00:13:27,579
Next time through the while loop, I'm effectively

124
00:13:27,579 --> 00:13:29,419
bubbling up the eight to the end.

125
00:13:29,419 --> 00:13:31,939
So over here, next time through the while loop,

126
00:13:31,939 --> 00:13:33,939
the six bubbles to the end, next time

127
00:13:33,939 --> 00:13:36,579
the five bubbles through the end, then the four,

128
00:13:36,579 --> 00:13:39,299
then the two, then the one, and then the zero.

129
00:13:39,299 --> 00:13:40,299
OK.

130
00:13:44,539 --> 00:13:45,779
All right.

131
00:13:45,779 --> 00:13:47,620
So what's the, yeah, question?

132
00:13:47,620 --> 00:13:50,019
There's no other question, because it's

133
00:13:50,019 --> 00:13:52,620
in any way to need the brackets.

134
00:13:52,620 --> 00:13:54,019
Oh, we don't need the brackets.

135
00:13:57,259 --> 00:13:59,139
I mean, you can put them in.

136
00:13:59,139 --> 00:13:59,979
It won't harm.

137
00:13:59,979 --> 00:14:02,219
But if you don't put them, it's OK.

138
00:14:02,219 --> 00:14:06,099
Python knows that it's doing an assignment one by one.

139
00:14:06,099 --> 00:14:09,139
So this one to that one and that one to that one.

140
00:14:09,139 --> 00:14:10,139
OK.

141
00:14:12,740 --> 00:14:12,939
OK.

142
00:14:12,939 --> 00:14:15,860
So let's look at the worst case complexity analysis.

143
00:14:15,860 --> 00:14:20,139
So the easy one we can already know is this inner four loop.

144
00:14:20,139 --> 00:14:22,539
This one goes through from one to the length of the list.

145
00:14:22,539 --> 00:14:25,939
So that's state of length list.

146
00:14:25,939 --> 00:14:27,980
We have another complexity, though,

147
00:14:27,980 --> 00:14:30,100
because in the worst case scenario,

148
00:14:30,100 --> 00:14:33,019
our list is completely backward.

149
00:14:33,019 --> 00:14:38,460
And so this while loop up here will repeat length L times,

150
00:14:38,460 --> 00:14:41,900
because we're going to bubble up every single one of the elements

151
00:14:41,900 --> 00:14:44,220
all the way through to the end of the list.

152
00:14:44,220 --> 00:14:46,620
So the complexity of that while loop

153
00:14:46,620 --> 00:14:48,660
will be theta of length L as well.

154
00:14:48,660 --> 00:14:50,420
Because thinking about the worst case

155
00:14:50,420 --> 00:14:53,180
is when our biggest element is here,

156
00:14:53,180 --> 00:14:56,500
second biggest element is here, and so on.

157
00:14:56,500 --> 00:14:57,820
OK.

158
00:14:57,820 --> 00:14:58,740
All right.

159
00:14:58,740 --> 00:15:00,660
So the worst case complexity of this function

160
00:15:00,660 --> 00:15:03,700
is theta of length L squared, right?

161
00:15:03,700 --> 00:15:06,340
Or theta of N squared, where N is the length of the list,

162
00:15:06,340 --> 00:15:09,420
just to be less verbose.

163
00:15:09,420 --> 00:15:10,740
OK.

164
00:15:10,740 --> 00:15:13,139
Clearly not a great sorting algorithm.

165
00:15:13,139 --> 00:15:15,340
It's pretty inefficient in some of the things it's doing.

166
00:15:15,340 --> 00:15:19,460
I once it's reached sorted some of the stuff up here,

167
00:15:19,460 --> 00:15:21,580
it keeps comparing them through to the end.

168
00:15:21,580 --> 00:15:24,780
So it just always goes through to the length of the list.

169
00:15:24,780 --> 00:15:28,780
We can look at another sorting algorithm

170
00:15:28,780 --> 00:15:32,420
called SelectionSort, which is sort of like bubble sort.

171
00:15:32,420 --> 00:15:36,139
But it does things in a little bit of a smarter way.

172
00:15:36,139 --> 00:15:38,939
So let me start again with an unsorted list.

173
00:15:41,939 --> 00:15:47,819
And let's see how SelectionSort will do this.

174
00:15:47,819 --> 00:15:48,819
OK.

175
00:15:48,819 --> 00:15:51,980
Let's put it there.

176
00:15:51,980 --> 00:15:52,860
OK.

177
00:15:52,860 --> 00:15:58,299
So the idea of SelectionSort is that with each pass,

178
00:15:58,299 --> 00:16:02,059
we're going to decide which one of these elements

179
00:16:02,059 --> 00:16:04,379
belongs at some index.

180
00:16:04,379 --> 00:16:08,259
So with my first pass, I'll decide which element belongs

181
00:16:08,259 --> 00:16:09,779
at index 0.

182
00:16:09,779 --> 00:16:12,700
With my second pass, I'll decide which element belongs

183
00:16:12,700 --> 00:16:15,580
at index 1, with my third which element belongs

184
00:16:15,580 --> 00:16:18,659
at index 2, and so on.

185
00:16:18,659 --> 00:16:21,179
So the way we're going to do that is by saying,

186
00:16:21,179 --> 00:16:22,860
all right, I'm going to take this element.

187
00:16:22,860 --> 00:16:24,100
It's the first one in the list.

188
00:16:24,100 --> 00:16:26,259
It's the one currently at index 0.

189
00:16:26,259 --> 00:16:29,580
And I'm going to compare it with every single element

190
00:16:29,580 --> 00:16:31,779
from the rest of the list.

191
00:16:31,779 --> 00:16:34,980
And as I find an element that's smaller than the one currently

192
00:16:34,980 --> 00:16:36,740
there, I'm going to swap them.

193
00:16:36,740 --> 00:16:38,699
Because I know that smaller one obviously

194
00:16:38,699 --> 00:16:40,459
belongs at index 0.

195
00:16:40,459 --> 00:16:42,059
So I'm going to compare the five with the eight.

196
00:16:42,059 --> 00:16:44,059
I'm going to say, well, the five is smaller than the eight.

197
00:16:44,059 --> 00:16:46,699
So it currently belongs at index 0.

198
00:16:46,699 --> 00:16:48,659
I compare the five with the one.

199
00:16:48,659 --> 00:16:49,659
The one is smaller.

200
00:16:49,659 --> 00:16:52,539
So I'm going to do a swap and say the one belongs here.

201
00:16:52,539 --> 00:16:57,019
Five with the 11, the one belongs here.

202
00:16:57,019 --> 00:16:58,620
One with the six, the one belongs.

203
00:16:58,620 --> 00:17:00,339
One with the two, the one still there.

204
00:17:00,340 --> 00:17:03,060
One with the zero, well, zero smaller than one.

205
00:17:03,060 --> 00:17:04,380
So let me swap it.

206
00:17:04,380 --> 00:17:06,660
Zero with the four, we're done.

207
00:17:06,660 --> 00:17:08,700
So now, at the end of the first pass,

208
00:17:08,700 --> 00:17:11,579
I've decided that the zero is the smallest out of everybody

209
00:17:11,579 --> 00:17:12,180
here.

210
00:17:12,180 --> 00:17:14,860
So it belongs at index 0.

211
00:17:14,860 --> 00:17:19,140
Next time, my second pass, I'm not going to worry about this one.

212
00:17:19,140 --> 00:17:20,380
I know it's already the smallest.

213
00:17:20,380 --> 00:17:24,700
So I'm going to determine which element belongs at index 1.

214
00:17:24,700 --> 00:17:26,539
So the eight is the first one there.

215
00:17:26,539 --> 00:17:27,980
It's the one currently at index 1.

216
00:17:27,980 --> 00:17:30,779
So I'm going to start with it being the one that belongs there.

217
00:17:30,779 --> 00:17:34,299
And I'm going to successively compare it with everybody else.

218
00:17:34,299 --> 00:17:36,819
So the eight with the five, the five clearly

219
00:17:36,819 --> 00:17:38,259
is smaller than the eight.

220
00:17:38,259 --> 00:17:40,180
Five with the 11, the five is smaller.

221
00:17:40,180 --> 00:17:41,779
Five with the six, the five is smaller.

222
00:17:41,779 --> 00:17:45,019
Five with the two needs a swap because the two is smaller.

223
00:17:45,019 --> 00:17:46,059
Two with the one.

224
00:17:46,059 --> 00:17:47,220
Again, we swap.

225
00:17:47,220 --> 00:17:48,620
The one is smaller.

226
00:17:48,620 --> 00:17:51,420
And then one with the four, done.

227
00:17:51,420 --> 00:17:53,140
So at the end of the second pass,

228
00:17:53,140 --> 00:17:56,220
I've decided that the one belongs at the next index.

229
00:17:56,220 --> 00:17:59,620
So now these two elements are in their correct place.

230
00:17:59,620 --> 00:18:01,700
They're in sorted order.

231
00:18:01,700 --> 00:18:04,860
OK, third pass, we're going to decide which element belongs

232
00:18:04,860 --> 00:18:07,420
at the next index, the index 2.

233
00:18:07,420 --> 00:18:09,180
So eight with the 11 is OK.

234
00:18:09,180 --> 00:18:11,220
Eight with the six, we need to swap.

235
00:18:11,220 --> 00:18:13,500
Six with the five, we need to swap.

236
00:18:13,500 --> 00:18:15,500
Five with the two, we need to swap.

237
00:18:15,500 --> 00:18:18,579
Two with the four, everything's OK.

238
00:18:18,579 --> 00:18:19,539
Three passes.

239
00:18:19,539 --> 00:18:21,579
The first three elements are in sorted order.

240
00:18:21,579 --> 00:18:24,940
Now we just need to figure out between these leftovers,

241
00:18:24,940 --> 00:18:28,019
which one belongs at the next level.

242
00:18:28,019 --> 00:18:30,340
So eight with the 11, we do a swap.

243
00:18:30,340 --> 00:18:32,980
Eight with the six, we do the swap.

244
00:18:32,980 --> 00:18:35,059
Six with the five, we bring the five here.

245
00:18:35,059 --> 00:18:36,740
Five with the four, we bring it here.

246
00:18:40,019 --> 00:18:43,380
Again, 11 with the eight, we swap these.

247
00:18:43,380 --> 00:18:44,980
Eight with the six, we swap these.

248
00:18:44,980 --> 00:18:47,420
Six with the five, we swap them.

249
00:18:47,420 --> 00:18:49,779
So as you can see, as I'm making my way

250
00:18:49,779 --> 00:18:52,740
through to figure out which belongs at the next index,

251
00:18:52,740 --> 00:18:57,380
I have fewer elements to decide between which belongs

252
00:18:57,380 --> 00:18:59,259
at the next index.

253
00:18:59,259 --> 00:19:03,500
So here, the 11 needs to swap.

254
00:19:03,500 --> 00:19:05,220
Eight with the six needs to swap.

255
00:19:05,220 --> 00:19:07,099
And then lastly, like that.

256
00:19:09,579 --> 00:19:14,620
So slightly more efficient in that we're not comparing

257
00:19:14,620 --> 00:19:17,859
a bunch of pairs all the time all the way through

258
00:19:17,859 --> 00:19:19,019
to the length of the list.

259
00:19:19,019 --> 00:19:20,940
So the code looks like this.

260
00:19:20,940 --> 00:19:25,220
I've got one for loop that goes through the length of the list.

261
00:19:25,220 --> 00:19:29,460
And one inner for loop that only starts at i

262
00:19:29,460 --> 00:19:31,980
and goes through to the end of the list.

263
00:19:31,980 --> 00:19:34,340
So unlike bubble sort, which started at one

264
00:19:34,340 --> 00:19:36,700
and went through to the end of the list all the time,

265
00:19:36,700 --> 00:19:39,900
here I'm starting at i and going through to the end of the list.

266
00:19:39,900 --> 00:19:44,019
Because in selection sort, with each pass,

267
00:19:44,019 --> 00:19:47,700
I've decided which element belongs at a specific index.

268
00:19:47,700 --> 00:19:50,140
So I no longer need to worry about comparing

269
00:19:50,140 --> 00:19:52,819
that element with everybody else.

270
00:19:52,819 --> 00:19:56,059
So when we were like that, we had decided

271
00:19:56,059 --> 00:19:57,700
these were in sorted order.

272
00:19:57,700 --> 00:20:00,620
I only needed to compare these three amongst themselves

273
00:20:00,620 --> 00:20:03,340
to decide which one fit at the next spot.

274
00:20:03,340 --> 00:20:06,620
Everybody else was already sorted.

275
00:20:06,620 --> 00:20:08,860
So what's the complexity analysis of this?

276
00:20:08,860 --> 00:20:11,380
This is going to be feel very similar to diameter

277
00:20:11,380 --> 00:20:13,819
from last lecture, because diameter also

278
00:20:13,819 --> 00:20:16,140
had this funky thing where we started from i

279
00:20:16,140 --> 00:20:19,380
and went through to the length of the list.

280
00:20:19,380 --> 00:20:22,620
Well, it's going to be theta of length L squared again.

281
00:20:22,620 --> 00:20:25,900
So there's two ways to think about this.

282
00:20:25,900 --> 00:20:29,740
The first one is to look at each loop individually.

283
00:20:29,740 --> 00:20:34,140
Clearly, the outer loop goes through theta of length L.

284
00:20:34,140 --> 00:20:35,220
No question about that.

285
00:20:35,220 --> 00:20:37,700
That just goes through range of length L.

286
00:20:37,700 --> 00:20:39,620
The inner loop is a little bit trickier,

287
00:20:39,620 --> 00:20:43,140
because it doesn't always go from some fixed number

288
00:20:43,140 --> 00:20:45,420
to the length of the list.

289
00:20:45,420 --> 00:20:50,340
But what we can think about is on average.

290
00:20:50,340 --> 00:20:52,660
The first time, when we were trying

291
00:20:52,660 --> 00:20:54,100
to figure out the element that belongs

292
00:20:54,100 --> 00:20:58,300
at the first index, or index 0, we went through to the length

293
00:20:58,300 --> 00:20:58,860
of the list.

294
00:20:58,860 --> 00:21:00,740
We had to compare with everybody else.

295
00:21:00,740 --> 00:21:03,900
The next time, we have to compare with lengthless minus 1,

296
00:21:03,900 --> 00:21:05,740
then lengthless minus 2.

297
00:21:05,740 --> 00:21:09,300
And then at the end, we only had one item to compare.

298
00:21:09,300 --> 00:21:12,700
So on average, that inner loop goes through length

299
00:21:12,700 --> 00:21:14,380
L over 2 times.

300
00:21:14,380 --> 00:21:16,380
On average, we have to look through about half

301
00:21:16,380 --> 00:21:23,019
of the elements in the list to do the comparison.

302
00:21:23,019 --> 00:21:28,140
So if the inner loop here on average is theta of length L

303
00:21:28,140 --> 00:21:33,620
is length L over 2, then the theta of length L over 2

304
00:21:33,620 --> 00:21:39,700
is theta of length L. There's just the 0.5 in front of that.

305
00:21:39,700 --> 00:21:41,980
So that's the first way to think about the complexity

306
00:21:41,980 --> 00:21:43,539
and analysis of this.

307
00:21:43,539 --> 00:21:49,539
The other way is to ask yourself, well, what part of this code

308
00:21:49,539 --> 00:21:51,700
is doing the repetitions?

309
00:21:51,700 --> 00:21:53,579
Like if we were to think about what

310
00:21:53,579 --> 00:21:57,860
we're counting in terms of units, which part of this code repeats?

311
00:21:57,860 --> 00:22:01,180
Well, the stuff inside the inner four loop repeats.

312
00:22:01,180 --> 00:22:05,140
So you're going to do a whole bunch of comparisons.

313
00:22:05,140 --> 00:22:09,299
So how many actual comparisons will you do?

314
00:22:09,299 --> 00:22:14,539
Well, the very first time, like from the outer first pass

315
00:22:14,539 --> 00:22:16,059
through to the end of the list, you're

316
00:22:16,059 --> 00:22:19,379
going to do approximately length L comparisons.

317
00:22:19,379 --> 00:22:22,339
The next time, you're going to do length L minus 1 comparisons.

318
00:22:22,339 --> 00:22:24,259
Then length L minus 2 comparisons.

319
00:22:24,259 --> 00:22:27,899
And so on and so on down to only 1 comparison.

320
00:22:27,899 --> 00:22:30,940
So if we do that sum 1 plus 2 plus 3 plus all the way up

321
00:22:30,940 --> 00:22:35,619
to length L, that formula becomes length L times length L

322
00:22:35,619 --> 00:22:36,779
plus 1 over 2.

323
00:22:36,779 --> 00:22:41,019
So that becomes length L squared over 2 plus length L over 2.

324
00:22:41,019 --> 00:22:45,779
And that becomes theta of length L squared.

325
00:22:45,779 --> 00:22:49,779
So just a couple ways to think about the analysis of this.

326
00:22:49,779 --> 00:22:51,740
And this is a pretty common thing you'll see.

327
00:22:51,740 --> 00:22:54,339
But just because we start at I, doesn't mean

328
00:22:54,339 --> 00:22:59,859
that it decreases the complexity of this function dramatically.

329
00:22:59,859 --> 00:23:01,579
It doesn't decrease it by some order.

330
00:23:01,579 --> 00:23:04,019
It just decreases it by half.

331
00:23:04,019 --> 00:23:13,539
So it's still theta of length L. OK.

332
00:23:13,539 --> 00:23:17,539
So we can actually do a little variation on this.

333
00:23:17,539 --> 00:23:21,339
Because you might have noticed it was a little inefficient

334
00:23:21,339 --> 00:23:24,539
to do the swap every time I noticed another element that's

335
00:23:24,539 --> 00:23:26,539
smaller.

336
00:23:26,539 --> 00:23:29,220
I didn't have to do the switch.

337
00:23:29,220 --> 00:23:32,220
All I had to do was kind of just keep track

338
00:23:32,220 --> 00:23:34,980
through a variable of the smallest number

339
00:23:34,980 --> 00:23:36,620
that I have seen so far.

340
00:23:36,620 --> 00:23:39,339
And only do the switch at the end when I've

341
00:23:39,339 --> 00:23:42,299
determined that that's the smallest number.

342
00:23:42,299 --> 00:23:44,900
So the variation, basically, if this is my list, says,

343
00:23:44,900 --> 00:23:47,180
hey, I'm going to look at this element that

344
00:23:47,180 --> 00:23:49,740
belongs in this very first slot.

345
00:23:49,740 --> 00:23:50,940
8 is the first one.

346
00:23:50,940 --> 00:23:53,779
Then I'm going to look through the elements all the way up

347
00:23:53,779 --> 00:23:56,339
to the end of the list and keep track of the smallest one.

348
00:23:56,339 --> 00:23:58,740
The 4, the 1 is currently smallest.

349
00:23:58,740 --> 00:24:01,059
6 is not, 5 is not, 9 is not.

350
00:24:01,059 --> 00:24:03,379
2 is not the 0 smaller than the 1.

351
00:24:03,379 --> 00:24:06,740
So if I see the 0 smallest, then I swap it.

352
00:24:06,740 --> 00:24:09,179
So I only do one swap at the end.

353
00:24:09,179 --> 00:24:10,700
Next time through, I'm going to decide

354
00:24:10,700 --> 00:24:12,339
which element belongs at this index.

355
00:24:12,339 --> 00:24:14,179
The 1 is the smallest I see.

356
00:24:14,179 --> 00:24:16,700
So I do the swap only at the end.

357
00:24:16,700 --> 00:24:18,659
Then I decide which element belongs here.

358
00:24:18,659 --> 00:24:20,700
The 2 is smallest out of everybody left.

359
00:24:20,700 --> 00:24:22,099
The 2 goes there.

360
00:24:22,099 --> 00:24:24,500
So I'm doing all these comparisons,

361
00:24:24,500 --> 00:24:27,980
but I only do the swap at the end.

362
00:24:27,980 --> 00:24:30,740
When I've decided, hey, this is the smallest element,

363
00:24:30,740 --> 00:24:34,259
let me just swap it with the one that's currently there.

364
00:24:34,259 --> 00:24:36,059
So it's just going to go through to the end of that.

365
00:24:40,579 --> 00:24:44,620
So I wrote that variation here.

366
00:24:44,620 --> 00:24:50,819
So this is selection sort just as we saw it.

367
00:24:50,819 --> 00:24:55,339
So we can see here that the first pass with the outer loop,

368
00:24:55,339 --> 00:25:00,180
we have length L comparisons to make,

369
00:25:00,180 --> 00:25:03,420
because we're always comparing these two, right?

370
00:25:03,420 --> 00:25:05,180
Then the one that's currently at this index,

371
00:25:05,180 --> 00:25:08,340
and the next one index over, the one that's currently

372
00:25:08,340 --> 00:25:11,500
at this index, and one index over, and so on.

373
00:25:11,500 --> 00:25:14,700
So the first pass, I've done length L, sorry,

374
00:25:14,700 --> 00:25:16,700
length L comparisons.

375
00:25:16,700 --> 00:25:20,500
The next pass, I've done length L minus 1 comparisons,

376
00:25:20,500 --> 00:25:22,380
because I don't need to look at the 0 anymore.

377
00:25:22,380 --> 00:25:24,380
I already know that's in the right place.

378
00:25:24,380 --> 00:25:27,500
Then after that, I do length L minus 2 comparisons,

379
00:25:27,500 --> 00:25:29,259
then length L minus 3 comparisons.

380
00:25:29,259 --> 00:25:32,619
So you can see, as we're making progress

381
00:25:32,619 --> 00:25:36,019
through our outer loop, we have fewer and fewer comparisons

382
00:25:36,019 --> 00:25:36,740
to do.

383
00:25:36,740 --> 00:25:39,819
So you might think that this is much better,

384
00:25:39,819 --> 00:25:43,579
but the theta complexity analysis says it's not.

385
00:25:43,579 --> 00:25:45,660
So that's the original selection sort,

386
00:25:45,660 --> 00:25:48,460
and the variation on selection sort.

387
00:25:50,940 --> 00:25:55,299
Looks a little more complicated, but it's not doing a swap.

388
00:25:55,299 --> 00:25:59,140
So it's only doing a swap down here, as you can see.

389
00:25:59,140 --> 00:26:02,740
It's doing it after it finishes this inner for loop.

390
00:26:02,740 --> 00:26:07,020
And all this inner for loop is doing is checking,

391
00:26:07,020 --> 00:26:09,220
is doing the comparisons, and keeping

392
00:26:09,220 --> 00:26:12,940
track of the smallest number it sees in this variable

393
00:26:12,940 --> 00:26:14,820
called smallest.

394
00:26:14,820 --> 00:26:18,020
And the index associated with that smallest variable

395
00:26:18,020 --> 00:26:19,300
in smallest j.

396
00:26:21,660 --> 00:26:24,420
Now, if we look at the analysis for this,

397
00:26:24,420 --> 00:26:28,380
well, we still have an outer for loop that goes through length L.

398
00:26:28,380 --> 00:26:32,980
We still have an inner for loop that goes from I to length L.

399
00:26:32,980 --> 00:26:36,460
All it's doing is eliminating this line here.

400
00:26:36,460 --> 00:26:39,420
It does it only once at the end, but it's still

401
00:26:39,420 --> 00:26:41,260
doing all these comparisons.

402
00:26:41,260 --> 00:26:44,060
It still has to look through all of these elements,

403
00:26:44,060 --> 00:26:46,500
one pair by pair, to do the comparison.

404
00:26:46,500 --> 00:26:49,220
So actually, this slight speed up

405
00:26:49,220 --> 00:26:52,940
doesn't have a big impact on my theta complexity.

406
00:26:52,940 --> 00:26:55,860
It's still going to be theta of length L squared.

407
00:26:59,180 --> 00:27:04,220
Any questions so far on these sorting algorithms?

408
00:27:10,460 --> 00:27:14,700
So clearly, we're not really doing a very good job

409
00:27:14,700 --> 00:27:21,180
about thinking of a unique way to do the sorting, right?

410
00:27:21,180 --> 00:27:24,100
Because all of these different variations

411
00:27:24,100 --> 00:27:26,820
where we're doing slight speed ups here and there

412
00:27:26,819 --> 00:27:29,259
aren't doing a drastic enough job

413
00:27:29,259 --> 00:27:33,139
to bring us a whole complexity class lower.

414
00:27:33,139 --> 00:27:37,139
So we have to think about the problem in a completely different way.

415
00:27:37,139 --> 00:27:41,619
So the iterative approach is not working out for us,

416
00:27:41,619 --> 00:27:45,299
where we basically have a loop that does something

417
00:27:45,299 --> 00:27:48,019
and another loop that does some sort of comparison.

418
00:27:48,019 --> 00:27:53,819
That's not going to get us a whole complexity class speed up.

419
00:27:53,819 --> 00:27:55,579
So instead, what we're going to do

420
00:27:55,579 --> 00:28:01,299
is approach the problem from sort of inspired

421
00:28:01,299 --> 00:28:04,819
by section search or binary search.

422
00:28:04,819 --> 00:28:08,700
In bi-section search, we weren't looking at each element

423
00:28:08,700 --> 00:28:09,659
one at a time.

424
00:28:09,659 --> 00:28:14,779
We were taking our list and dividing it in half.

425
00:28:14,779 --> 00:28:17,700
So we can try to do a similar approach here,

426
00:28:17,700 --> 00:28:20,419
and that's what this merge sort algorithm does.

427
00:28:20,419 --> 00:28:23,220
It's going to take an original list,

428
00:28:23,220 --> 00:28:28,420
and it's going to divide this list in half with each step.

429
00:28:28,420 --> 00:28:31,460
And it's going to do this recursively.

430
00:28:31,460 --> 00:28:33,220
It's going to be a dividing conquer algorithm.

431
00:28:33,220 --> 00:28:36,620
So it's going to recursively divide this list in half each step.

432
00:28:36,620 --> 00:28:42,539
And then it's going to merge sorted lists in a really smart way,

433
00:28:42,539 --> 00:28:46,299
such that it'll give us the speed up that we're interested in.

434
00:28:46,299 --> 00:28:49,180
So let me explain to you how we're going to merge it.

435
00:28:49,180 --> 00:28:54,860
And then we'll see how we can write up this whole algorithm.

436
00:28:54,860 --> 00:28:59,980
So let's say that we have, let's do this.

437
00:28:59,980 --> 00:29:09,140
Let's say that we've done some sort of division of lists.

438
00:29:09,140 --> 00:29:11,340
And let's say that we've written this algorithm,

439
00:29:11,340 --> 00:29:14,500
and it works really nicely in such a way

440
00:29:14,500 --> 00:29:21,539
that it gives us two sorted lists.

441
00:29:21,539 --> 00:29:26,539
So if somehow my algorithm, where I had one full list

442
00:29:26,539 --> 00:29:30,859
of all of these eight elements here divided itself,

443
00:29:30,859 --> 00:29:35,099
and when it came back together, it gave me two sublists

444
00:29:35,099 --> 00:29:37,099
that themselves are sorted.

445
00:29:37,099 --> 00:29:41,819
So this is a sorted list, and this is a sorted list by itself.

446
00:29:41,819 --> 00:29:47,700
Then there's this really smart and merge step that we can do.

447
00:29:47,700 --> 00:29:51,579
So we can recognize that if this list is sorted by itself,

448
00:29:51,579 --> 00:29:56,179
and this list is sorted by itself, to determine the element

449
00:29:56,179 --> 00:29:58,899
that is the smallest between both of these lists,

450
00:29:58,899 --> 00:30:02,539
all we have to do is look at the first element of each list,

451
00:30:02,539 --> 00:30:03,939
each sublist, right?

452
00:30:03,939 --> 00:30:05,579
This is the smallest out of these guys.

453
00:30:05,579 --> 00:30:06,859
This is the smallest out of these guys.

454
00:30:06,859 --> 00:30:08,819
So if I just compare the zero and the four,

455
00:30:08,819 --> 00:30:13,859
I know the zero will be smallest out of everything.

456
00:30:13,859 --> 00:30:16,419
Then I'm left with this list.

457
00:30:16,419 --> 00:30:17,179
It's still sorted.

458
00:30:17,179 --> 00:30:18,819
This list is still sorted.

459
00:30:18,819 --> 00:30:21,700
I look at the first element of each of these lists.

460
00:30:21,700 --> 00:30:23,179
Which one of these is the smallest?

461
00:30:23,179 --> 00:30:25,259
Well, the one is smaller than the four.

462
00:30:25,259 --> 00:30:28,659
So I'm going to take this one and say this one comes next.

463
00:30:28,659 --> 00:30:31,379
So we're using the property that these two lists themselves

464
00:30:31,379 --> 00:30:32,419
are sorted.

465
00:30:32,419 --> 00:30:36,339
So all I need to do is compare the first element of each list.

466
00:30:36,339 --> 00:30:37,859
Then I compare the two and the four.

467
00:30:37,859 --> 00:30:39,819
I say the two is smaller than the four.

468
00:30:39,819 --> 00:30:41,939
The six and the four, the four goes next.

469
00:30:41,939 --> 00:30:45,539
The six and the five, the five goes here, six and the eight.

470
00:30:45,539 --> 00:30:47,779
Six goes here, eight and the 11.

471
00:30:47,779 --> 00:30:51,219
Well, they're already in sorted order, so we're done.

472
00:30:51,219 --> 00:30:55,099
So that really smart merge step touched every element

473
00:30:55,099 --> 00:30:59,619
only once to bring it into my master sorted list.

474
00:30:59,619 --> 00:31:01,579
I didn't have to do multiple passes.

475
00:31:01,579 --> 00:31:05,459
I just had to look at the first element of each list.

476
00:31:05,460 --> 00:31:09,420
So if we can somehow get to this point

477
00:31:09,420 --> 00:31:12,380
where we have these two sublists that are sorted,

478
00:31:12,380 --> 00:31:14,740
I can just do a little merge by looking

479
00:31:14,740 --> 00:31:17,940
at the first element in each of these sorted lists.

480
00:31:17,940 --> 00:31:21,460
And that basically gives me a theta of n complexity

481
00:31:21,460 --> 00:31:24,620
to do the merge from two smaller sorted lists

482
00:31:24,620 --> 00:31:28,100
into one big sorted list.

483
00:31:28,100 --> 00:31:30,340
So here's the idea of this merge sorted algorithm.

484
00:31:30,340 --> 00:31:33,539
We're going to take an original big unsorted list

485
00:31:33,539 --> 00:31:36,259
containing n elements.

486
00:31:36,259 --> 00:31:37,379
It's unsorted.

487
00:31:37,379 --> 00:31:39,500
We're going to divide it in half.

488
00:31:39,500 --> 00:31:42,420
Of course, these two halves, there's no order to them,

489
00:31:42,420 --> 00:31:45,139
so they are potentially very unsorted.

490
00:31:45,139 --> 00:31:46,740
We're going to take each one of those halves

491
00:31:46,740 --> 00:31:50,619
and divide them as well in half, more unsorted sublists.

492
00:31:50,619 --> 00:31:54,500
Now I've got four unsorted sublists of smaller lengths.

493
00:31:54,500 --> 00:31:57,420
Then I'm going to keep dividing them in half.

494
00:31:57,420 --> 00:32:01,180
I have now maybe just two elements in each of these unsorted

495
00:32:01,180 --> 00:32:02,019
lists.

496
00:32:02,019 --> 00:32:03,860
There's no guarantee that they're sorted.

497
00:32:03,860 --> 00:32:05,860
And then I divided in half once more

498
00:32:05,860 --> 00:32:11,100
to have a list with one element in each,

499
00:32:11,100 --> 00:32:12,100
a list with one element.

500
00:32:12,100 --> 00:32:13,700
Maybe some of these will be empty.

501
00:32:16,340 --> 00:32:18,340
So then if I can get to this point

502
00:32:18,340 --> 00:32:21,900
where I just have lists containing one element in each list,

503
00:32:21,900 --> 00:32:24,259
those lists themselves are sorted, right?

504
00:32:24,259 --> 00:32:27,100
An element with just a one in it, a list with just a one in it,

505
00:32:27,100 --> 00:32:29,660
is sorted.

506
00:32:29,660 --> 00:32:32,380
So then I can begin a merge step, which says,

507
00:32:32,380 --> 00:32:36,620
hey, these two here, that were originally unsorted,

508
00:32:36,620 --> 00:32:39,540
let's just merge the pairs back up.

509
00:32:39,540 --> 00:32:44,180
And we'll do that smart merge way.

510
00:32:44,180 --> 00:32:47,620
So these two will merge back in to give me

511
00:32:47,620 --> 00:32:52,460
all of these eight sorted lists of length two.

512
00:32:52,460 --> 00:32:55,580
And then we're going to merge these pairs back up,

513
00:32:55,580 --> 00:32:59,420
again using that smart merge way

514
00:32:59,420 --> 00:33:03,380
to give me four sorted lists.

515
00:33:03,380 --> 00:33:07,140
And then we're going to merge these pairs of sorted lists

516
00:33:07,140 --> 00:33:09,860
to give me bigger sorted lists.

517
00:33:09,860 --> 00:33:12,500
And finally, we're going to merge these two sorted lists

518
00:33:12,500 --> 00:33:16,940
to give me my final master sorted list.

519
00:33:16,940 --> 00:33:22,100
So let's do the process of doing the sort.

520
00:33:22,100 --> 00:33:23,660
Step out of time.

521
00:33:23,660 --> 00:33:30,500
So we're going to take our original list, like this.

522
00:33:30,500 --> 00:33:34,100
I'm actually going to try to do this.

523
00:33:34,100 --> 00:33:36,300
I'm going to need some room to move them down.

524
00:33:36,300 --> 00:33:39,540
So this is my original unsorted list.

525
00:33:39,540 --> 00:33:41,420
Yeah, let's put this here.

526
00:33:41,420 --> 00:33:44,300
Something like that.

527
00:33:44,300 --> 00:33:46,140
So what's the process going to be?

528
00:33:46,140 --> 00:33:50,100
Step one is to divide them in half.

529
00:33:50,099 --> 00:33:54,539
Step two, divide each of these in half.

530
00:33:54,539 --> 00:33:57,619
Step three, divide each of them in half.

531
00:33:57,619 --> 00:34:01,779
So now I've got a bunch of lists with only one element in it.

532
00:34:01,779 --> 00:34:04,059
Now I need to merge them back up.

533
00:34:04,059 --> 00:34:07,179
So merging these two together to give me a list with two

534
00:34:07,179 --> 00:34:09,779
elements says I'm just going to compare them.

535
00:34:09,779 --> 00:34:11,299
The one that's smaller goes first.

536
00:34:11,299 --> 00:34:13,779
The one that's bigger goes second.

537
00:34:13,779 --> 00:34:15,860
Again, these ones compare them.

538
00:34:15,860 --> 00:34:17,139
The one that's smaller goes first.

539
00:34:17,139 --> 00:34:18,980
The one that's bigger goes second.

540
00:34:18,980 --> 00:34:21,340
Again, compare them.

541
00:34:21,340 --> 00:34:23,059
Again, compare them.

542
00:34:23,059 --> 00:34:27,619
So now I've done one merge where I have four lists that

543
00:34:27,619 --> 00:34:31,099
are sorted by themselves.

544
00:34:31,099 --> 00:34:33,860
So now I'm going to merge these two together and these two

545
00:34:33,860 --> 00:34:35,980
together.

546
00:34:35,980 --> 00:34:38,500
So I'm only looking at the first element of each.

547
00:34:38,500 --> 00:34:40,019
So I compare the zero and the two.

548
00:34:40,019 --> 00:34:43,380
And I know the zero is smaller than the two.

549
00:34:43,380 --> 00:34:46,340
Then the two and the eight, the two is smaller.

550
00:34:46,340 --> 00:34:49,100
Then the eight and the 11 and then the 11.

551
00:34:49,100 --> 00:34:53,420
So now this list is now sorted by itself.

552
00:34:53,420 --> 00:34:54,500
Same process here.

553
00:34:54,500 --> 00:34:56,980
Compare only the first element of each list.

554
00:34:56,980 --> 00:34:58,460
The one comes first.

555
00:34:58,460 --> 00:35:00,300
Then the four comes next.

556
00:35:00,300 --> 00:35:02,100
Then the five comes next.

557
00:35:02,100 --> 00:35:04,380
And then the six.

558
00:35:04,380 --> 00:35:08,100
So now I've reached the exact same spot I was at when I was

559
00:35:08,100 --> 00:35:09,620
talking about the merge step, right?

560
00:35:09,620 --> 00:35:13,220
When I showed you that we could get to that spot.

561
00:35:13,220 --> 00:35:16,180
So I've got these two lists that are themselves sorted

562
00:35:16,179 --> 00:35:16,679
to merge.

563
00:35:16,679 --> 00:35:19,299
So all I need to do is look at the first element in each list.

564
00:35:19,299 --> 00:35:21,579
So there's my zero goes first.

565
00:35:21,579 --> 00:35:23,659
One compared with the two, the one goes next.

566
00:35:23,659 --> 00:35:25,859
Two compared with the four, the two goes next.

567
00:35:25,859 --> 00:35:28,019
Four compared with the eight, the four goes next.

568
00:35:28,019 --> 00:35:30,179
Five compared with the eight, the five goes next.

569
00:35:30,179 --> 00:35:32,859
Six compared with the eight, the six goes next.

570
00:35:32,859 --> 00:35:35,619
And I've removed all the elements in this list.

571
00:35:35,619 --> 00:35:38,099
So I know I just need to grab whatever's left in here

572
00:35:38,099 --> 00:35:40,339
and whatever order it's there because everything's already

573
00:35:40,339 --> 00:35:42,419
sorted.

574
00:35:42,419 --> 00:35:43,779
OK.

575
00:35:43,780 --> 00:35:47,740
So that's the entire merge sort algorithm.

576
00:35:47,740 --> 00:35:50,500
Now if I do this demo, this is actually

577
00:35:50,500 --> 00:35:53,700
going to show you the exact steps that the recursive algorithm

578
00:35:53,700 --> 00:35:54,740
is doing.

579
00:35:54,740 --> 00:35:56,820
And it's not going to be sort of in the same order

580
00:35:56,820 --> 00:35:57,580
that I showed you.

581
00:35:57,580 --> 00:36:02,100
It's not going to be dividing this in half and then dividing

582
00:36:02,100 --> 00:36:03,660
in half and so on.

583
00:36:03,660 --> 00:36:07,060
Because when we're doing the recursion,

584
00:36:07,060 --> 00:36:12,540
first we're going to figure out how to sort a left sublist.

585
00:36:12,539 --> 00:36:15,259
So if I have my original unsorted list here,

586
00:36:15,259 --> 00:36:18,980
we're going to figure out how to sort a left sublist first.

587
00:36:18,980 --> 00:36:21,980
That's a recursive step that we haven't reached the base

588
00:36:21,980 --> 00:36:22,980
case for yet.

589
00:36:22,980 --> 00:36:24,619
We still have to sort this list.

590
00:36:24,619 --> 00:36:29,179
So we're going to try to sort the left sublist of this one.

591
00:36:29,179 --> 00:36:31,420
And then we're going to try to sort the left sublist of this one.

592
00:36:31,420 --> 00:36:35,179
So we're going to do something that feels really similar

593
00:36:35,179 --> 00:36:38,300
to the Fibonacci sequence.

594
00:36:38,300 --> 00:36:39,539
Yes, Fibonacci.

595
00:36:39,539 --> 00:36:42,139
Fibonacci of n is Fibonacci of n minus 1.

596
00:36:42,139 --> 00:36:44,779
Plus Fibonacci of n minus 2.

597
00:36:44,779 --> 00:36:46,819
In that particular case, when we were

598
00:36:46,819 --> 00:36:50,259
trying to find Fibonacci of 6 or something like that,

599
00:36:50,259 --> 00:36:54,259
we were going and exploring the left side

600
00:36:54,259 --> 00:36:57,779
until we reached a base case.

601
00:36:57,779 --> 00:36:59,699
And only once we reached a base case

602
00:36:59,699 --> 00:37:02,699
could we pop up and do the other half.

603
00:37:02,699 --> 00:37:05,699
And so this algorithm is going to feel very similar to that.

604
00:37:05,699 --> 00:37:07,619
So here's our my original list.

605
00:37:07,619 --> 00:37:09,659
I'm splitting the left hand side to try

606
00:37:09,659 --> 00:37:15,299
to figure out how to merge all the way to the left lists.

607
00:37:15,299 --> 00:37:16,940
So the 8 and the 4 will be compared,

608
00:37:16,940 --> 00:37:19,219
and the 4 goes before the 8.

609
00:37:19,219 --> 00:37:23,739
And then I'm going to merge the 1 and the 6 by themselves.

610
00:37:23,739 --> 00:37:26,299
Those are already sorted, as we know.

611
00:37:26,299 --> 00:37:28,779
Then we're going to merge the 4 and the 8 back

612
00:37:28,779 --> 00:37:31,420
with the 1 and the 6 using that merge step.

613
00:37:31,420 --> 00:37:35,579
And then we're going to do the same thing to that right hand side,

614
00:37:35,579 --> 00:37:36,980
one at a time.

615
00:37:36,980 --> 00:37:42,019
We'll do another example where we go step by step through.

616
00:37:42,019 --> 00:37:44,699
And now we've got our two 4 elements together.

617
00:37:44,699 --> 00:37:46,619
So now we're just doing our final merge step

618
00:37:46,619 --> 00:37:52,940
where we decide which one belongs next.

619
00:37:52,940 --> 00:37:56,420
So let's look at the merge code.

620
00:37:56,420 --> 00:37:58,420
And this is not yet.

621
00:37:58,420 --> 00:37:59,179
So sorry.

622
00:37:59,179 --> 00:38:01,500
Let's look at the merge step once more.

623
00:38:01,500 --> 00:38:04,820
So if I have two lists that I'm trying to merge,

624
00:38:04,820 --> 00:38:08,059
the idea was that you look at the first element of each.

625
00:38:08,059 --> 00:38:11,460
So first, the 1 and the 2 compared means the 1 is smaller.

626
00:38:11,460 --> 00:38:13,420
So it goes into my result.

627
00:38:13,420 --> 00:38:15,140
The 5 and the 2 gets compared.

628
00:38:15,140 --> 00:38:16,580
The 2 is smaller.

629
00:38:16,580 --> 00:38:18,780
So the 2 goes into the result.

630
00:38:18,780 --> 00:38:20,580
The 5 and the 3 gets compared.

631
00:38:20,580 --> 00:38:21,660
The 3 is smaller.

632
00:38:21,660 --> 00:38:23,500
So the 3 goes in the result.

633
00:38:23,500 --> 00:38:24,700
And so on and so on.

634
00:38:24,700 --> 00:38:26,820
So we keep doing this process where we just

635
00:38:26,820 --> 00:38:29,220
keep looking at the first element.

636
00:38:29,220 --> 00:38:33,740
Until we have one of the lists become empty.

637
00:38:33,739 --> 00:38:35,019
So this is my left sublist.

638
00:38:35,019 --> 00:38:36,939
This is my right sublist.

639
00:38:36,939 --> 00:38:38,979
When one of these lists becomes empty,

640
00:38:38,979 --> 00:38:42,779
I no longer need to compare 18 with nothing.

641
00:38:42,779 --> 00:38:45,139
All I need to do is grab all these elements

642
00:38:45,139 --> 00:38:48,939
and stick them through at the end.

643
00:38:48,939 --> 00:38:52,139
So let's look at the code for just the merge step.

644
00:38:52,139 --> 00:38:55,339
We don't need to look at the code for the full algorithm yet.

645
00:38:55,339 --> 00:38:59,659
But the merge step code is just the part that takes us

646
00:38:59,659 --> 00:39:04,819
from two sorted lists into one bigger sorted list.

647
00:39:04,819 --> 00:39:09,779
So it does that step in one.

648
00:39:09,779 --> 00:39:12,460
This is where the main event happens.

649
00:39:12,460 --> 00:39:15,420
So this is just going to use indices

650
00:39:15,420 --> 00:39:19,699
to compare which element we need to grab next.

651
00:39:19,699 --> 00:39:26,059
So if I have something like this, like that,

652
00:39:26,059 --> 00:39:29,339
then I'm not actually going to make a copy of a list

653
00:39:30,059 --> 00:39:33,059
or do any sort of funky stuff with list copying

654
00:39:33,059 --> 00:39:35,220
because that'll increase the complexity.

655
00:39:35,220 --> 00:39:39,860
But we are going to do that trick where we use an integer index

656
00:39:39,860 --> 00:39:45,140
to decide which element we're going to grab next.

657
00:39:45,140 --> 00:39:47,620
So that's what this i and j is for.

658
00:39:47,620 --> 00:39:53,340
We've got i is going to be the index from my left sublist.

659
00:39:53,340 --> 00:39:57,140
And j will be the index for my right sublist.

660
00:39:57,139 --> 00:39:59,420
And all it does is it says while I still

661
00:39:59,420 --> 00:40:01,779
have elements in both of these lists,

662
00:40:01,779 --> 00:40:05,059
just take the pointer and say which one of the elements

663
00:40:05,059 --> 00:40:07,699
at these two pointers i and j are smaller.

664
00:40:07,699 --> 00:40:09,259
So if the zero is smaller, I'm going

665
00:40:09,259 --> 00:40:12,940
to create a new list here that's going to have the zero in it.

666
00:40:12,940 --> 00:40:15,980
I'm not actually taking this element and moving it here.

667
00:40:15,980 --> 00:40:19,659
All I will do next is say the pointer that tells me which element

668
00:40:19,659 --> 00:40:22,460
I should be looking at next moves over one.

669
00:40:22,460 --> 00:40:24,819
So this list remains unchanged.

670
00:40:24,820 --> 00:40:27,539
Then I'm going to compare the two with the one that one

671
00:40:27,539 --> 00:40:28,059
comes next.

672
00:40:28,059 --> 00:40:31,019
So I'm going to take the one and put it in my list here.

673
00:40:31,019 --> 00:40:34,460
And this pointer moves here to the next element.

674
00:40:34,460 --> 00:40:37,460
So now while this list stays as is,

675
00:40:37,460 --> 00:40:39,660
I'm looking at the element at this pointer

676
00:40:39,660 --> 00:40:41,620
and comparing it with the element at this pointer.

677
00:40:41,620 --> 00:40:45,059
So then the two comes next and this pointer increments by one.

678
00:40:48,300 --> 00:40:49,500
So that's what that code does.

679
00:40:49,500 --> 00:40:53,019
These two while loops just deal with the case

680
00:40:53,019 --> 00:40:57,820
when we have one list that has finished inserting its elements.

681
00:40:57,820 --> 00:41:00,860
So like in this particular case here, when my right sublist

682
00:41:00,860 --> 00:41:03,139
became empty, we've already put on all the elements

683
00:41:03,139 --> 00:41:05,420
in it into our master list.

684
00:41:05,420 --> 00:41:08,460
Then all we need to do is take everything that's left over

685
00:41:08,460 --> 00:41:10,619
and copy them into my master list.

686
00:41:10,619 --> 00:41:13,659
And that's what these two while loops are doing.

687
00:41:16,659 --> 00:41:18,940
So the complexity of this merge store,

688
00:41:18,940 --> 00:41:22,940
so that's just what it's doing.

689
00:41:23,099 --> 00:41:25,579
So it's just doing one pass.

690
00:41:25,579 --> 00:41:27,179
It's not doing multiple passes.

691
00:41:27,179 --> 00:41:29,380
So we just look at each element once.

692
00:41:29,380 --> 00:41:32,980
So the complexity of this merge sort, not the sort,

693
00:41:32,980 --> 00:41:37,260
just the merge step is theta of length of the list.

694
00:41:37,260 --> 00:41:41,460
Because we're just looking at all of these elements once.

695
00:41:41,460 --> 00:41:44,139
Now what about the actual algorithm?

696
00:41:44,139 --> 00:41:48,619
So here I've got the merge function down here.

697
00:41:48,619 --> 00:41:50,980
It's going to take a left list and a right list.

698
00:41:50,980 --> 00:41:53,019
And it's going to do that step that we just did

699
00:41:53,019 --> 00:41:55,659
where you look at the smallest element in each.

700
00:41:55,659 --> 00:41:56,659
What about the rest of it?

701
00:41:56,659 --> 00:42:00,179
Well, the rest of it is just recursion.

702
00:42:00,179 --> 00:42:02,579
My base case is when I have a list that's empty

703
00:42:02,579 --> 00:42:04,740
or a list with one element in it.

704
00:42:04,740 --> 00:42:06,380
Then I just grab that list.

705
00:42:06,380 --> 00:42:08,260
That's my merge.

706
00:42:11,260 --> 00:42:13,579
And else what we're going to do is we're

707
00:42:13,579 --> 00:42:16,780
going to do the step where we divide the list in half.

708
00:42:16,780 --> 00:42:19,980
So we're doing integer division from the length of the list

709
00:42:19,980 --> 00:42:23,780
because we don't want the middle to be 7.5, for example.

710
00:42:23,780 --> 00:42:26,500
So we're going to grab some integer index.

711
00:42:26,500 --> 00:42:29,940
And then we're going to say I'm going to, again,

712
00:42:29,940 --> 00:42:31,940
there's a lot of faith involved in recursion.

713
00:42:31,940 --> 00:42:34,780
I'm going to say the left sublist.

714
00:42:34,780 --> 00:42:40,019
So this one here, if my algorithm somehow works correctly,

715
00:42:40,019 --> 00:42:42,300
will now be a sorted list.

716
00:42:43,220 --> 00:42:48,460
And then my right over here, right equals this thing here,

717
00:42:48,460 --> 00:42:50,820
will also somehow be a sorted list.

718
00:42:50,820 --> 00:42:53,620
So this is me putting faith in my algorithm

719
00:42:53,620 --> 00:42:56,060
that I can get a sorted list, right?

720
00:42:56,060 --> 00:42:58,260
From the index 0 all the way up to the midpoint

721
00:42:58,260 --> 00:43:01,100
and the midpoint all the way up to the end of the list.

722
00:43:01,100 --> 00:43:04,460
So if somehow I can get a left sublist that's sorted by itself

723
00:43:04,460 --> 00:43:06,860
and a right sublist that's sorted by itself,

724
00:43:06,860 --> 00:43:09,300
all I need to do to get this sorted list

725
00:43:09,300 --> 00:43:10,300
is to merge them.

726
00:43:10,300 --> 00:43:13,300
So that's what the merge function is to.

727
00:43:13,300 --> 00:43:18,300
Okay, so let's step through.

728
00:43:18,300 --> 00:43:21,300
So I've got my original list here.

729
00:43:21,300 --> 00:43:24,300
And this is where we're going to be thinking about

730
00:43:24,300 --> 00:43:27,300
how we kind of step through Fibonacci.

731
00:43:27,300 --> 00:43:29,300
Here's my original list.

732
00:43:29,300 --> 00:43:34,300
The first step is to figure out the left part.

733
00:43:34,300 --> 00:43:36,300
So we're going to do this here.

734
00:43:36,300 --> 00:43:39,300
I need to figure out the left part.

735
00:43:39,300 --> 00:43:41,300
So we're going to divide it in half.

736
00:43:41,300 --> 00:43:45,300
And it says I need to figure out the sorted version of 8 4 1 6.

737
00:43:45,300 --> 00:43:47,300
But it's not my base case.

738
00:43:47,300 --> 00:43:50,300
So I need to figure out the sorted version of the left part of that.

739
00:43:50,300 --> 00:43:51,300
The 8 4.

740
00:43:51,300 --> 00:43:53,300
Again, it's not my base case.

741
00:43:53,300 --> 00:43:55,300
So I need to figure out the sorted version of the left,

742
00:43:55,300 --> 00:43:56,300
just the 8.

743
00:43:56,300 --> 00:43:58,300
It's single by itself.

744
00:43:58,300 --> 00:44:00,300
So that's just going to be the 8.

745
00:44:00,300 --> 00:44:02,300
Then we can figure out the right half of it.

746
00:44:02,300 --> 00:44:05,300
It's 4 by itself and we merge them.

747
00:44:05,300 --> 00:44:08,300
Then we can figure out the right half of this one here.

748
00:44:08,300 --> 00:44:09,300
8 4 1 6.

749
00:44:09,300 --> 00:44:13,300
So we need to figure out what's the sorted version of 1 6.

750
00:44:13,300 --> 00:44:15,300
Well, as humans, we know it's already sorted.

751
00:44:15,300 --> 00:44:17,300
But the algorithm goes through.

752
00:44:17,300 --> 00:44:18,300
Looks at the left side.

753
00:44:18,300 --> 00:44:19,300
Looks at the right side.

754
00:44:19,300 --> 00:44:20,300
Merges them up.

755
00:44:20,300 --> 00:44:24,300
Now we merge the 4 8 1 6 according to the Lume merge step

756
00:44:24,300 --> 00:44:26,300
to give us 1 4 6 8.

757
00:44:26,300 --> 00:44:32,300
And at this point, we've finished just the left half of 8 4 1 6 5 9 2 0.

758
00:44:32,300 --> 00:44:34,300
And now we need to do the right half.

759
00:44:34,300 --> 00:44:41,300
So we do the whole process all over again by taking that 5 9 2 0 looking only at the left piece.

760
00:44:41,300 --> 00:44:43,300
Then the left piece of that.

761
00:44:43,300 --> 00:44:47,300
Then the right piece of that base case merging them back up.

762
00:44:47,300 --> 00:44:49,300
The right step.

763
00:44:49,300 --> 00:44:51,300
The left part of that right step.

764
00:44:51,300 --> 00:44:55,300
The right part of that right step merging them back up.

765
00:44:55,300 --> 00:44:58,300
So then we do the merge step of 5 9 and 0 2.

766
00:44:58,300 --> 00:45:01,300
And then the merge step of these two lists.

767
00:45:01,300 --> 00:45:04,300
1 4 6 8 and 0 2 5 9.

768
00:45:04,300 --> 00:45:09,300
So you can see it has a similar feel to exploring one side of the branch first,

769
00:45:09,300 --> 00:45:11,300
just like with Fibonacci for the exact same reason.

770
00:45:11,300 --> 00:45:14,300
Because we've got a function called that's recursive.

771
00:45:14,300 --> 00:45:18,300
We can't complete it until we've explored all the way down to the bottom.

772
00:45:18,300 --> 00:45:24,300
So the overall complexity of this is going to be the merge step itself is theta of n.

773
00:45:24,300 --> 00:45:26,300
Like we just talked about.

774
00:45:26,300 --> 00:45:28,300
But how many levels do we have?

775
00:45:28,300 --> 00:45:35,300
That is how many times do we take our original list and subdivide it until we get to our base case?

776
00:45:35,300 --> 00:45:41,300
And the number of times is according to this function very much like when we did by section search.

777
00:45:41,300 --> 00:45:44,300
We're going to take an original n elements in my list.

778
00:45:44,300 --> 00:45:50,300
And I'm going to keep dividing this n elements by 2 in a bunch of sub lists i times.

779
00:45:50,300 --> 00:45:56,300
So i times is how many times we're going to subdivide this list until we get to a base case.

780
00:45:56,300 --> 00:46:01,300
So what is i in terms of n? Well i is equal to log of n.

781
00:46:01,300 --> 00:46:05,300
So at each merge step.

782
00:46:05,300 --> 00:46:08,300
Sorry. So at each sub level, I've got a merge step.

783
00:46:08,300 --> 00:46:16,300
So I've got theta of log of n levels multiplied by theta of n for my merge step.

784
00:46:16,300 --> 00:46:24,300
So the overall complexity of this function is theta of n log n, where n is the length of the list.

785
00:46:24,300 --> 00:46:31,300
Okay. So it turns out that theta of n log n is actually the fastest we can have a sort b.

786
00:46:31,300 --> 00:46:35,300
You cannot do a sorting algorithm that's faster than that.

787
00:46:35,300 --> 00:46:38,300
You can do little tricks here and there based on your data.

788
00:46:38,300 --> 00:46:46,300
Maybe you don't divide the list exactly in half. Maybe you divide it and you find some sort of pivot point that's a little bit smarter about the data.

789
00:46:46,300 --> 00:46:56,300
But in general, the complexity of this function of the sorting algorithm is always going to be the fastest it's going to be as theta of n log n.

790
00:46:56,300 --> 00:46:57,300
Okay.

791
00:46:57,300 --> 00:46:59,300
All right.

792
00:46:59,300 --> 00:47:06,300
We've seen a bunch of different algorithms here to help us design programs.

793
00:47:06,300 --> 00:47:11,300
So the reason why we do this complexity analysis is to guide the design of a program.

794
00:47:11,300 --> 00:47:19,300
So if you already have a bunch of nested for loops in the program that you're trying to consider writing, you'll already know it's going to be pretty inefficient and slow.

795
00:47:19,300 --> 00:47:23,300
So you might want to rethink the design to begin.

796
00:47:23,300 --> 00:47:24,300
Okay.

797
00:47:24,300 --> 00:47:25,300
All right.

