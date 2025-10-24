---
title: PrincetonAlgorithms P36Part18 05_heapsort
---

1
00:00:00,000 --> 00:00:07,440
Next, we're going to look at the use of the binary heap data structure to implement a clever

2
00:00:07,440 --> 00:00:11,919
sorting algorithm known as heap sort.

3
00:00:11,919 --> 00:00:13,759
So here's the basic plan.

4
00:00:13,759 --> 00:00:18,280
What we're going to do is we have our end keys, we'll have them in an array.

5
00:00:18,280 --> 00:00:24,120
We'll view that array as eventually being a max heap.

6
00:00:24,120 --> 00:00:31,440
So what we have to do first is to rearrange the keys in the array to heap order.

7
00:00:31,440 --> 00:00:36,719
So just make it so that every key is larger than its two children.

8
00:00:36,719 --> 00:00:41,600
And for example, the largest of all the keys is at the root.

9
00:00:41,600 --> 00:00:49,520
And then the next phase would be to take that heap ordered array and get it to be a sorted

10
00:00:49,520 --> 00:00:52,040
result in place.

11
00:00:52,039 --> 00:00:57,479
And again, the heap is stored in the array with the first key position one, next two

12
00:00:57,479 --> 00:00:59,240
position two and three and like that.

13
00:00:59,240 --> 00:01:05,079
So the end result would be like that with no keys in the heap, but all the keys in the

14
00:01:05,079 --> 00:01:07,280
array in sorted order.

15
00:01:07,280 --> 00:01:09,519
So it's a little exercise in abstraction.

16
00:01:09,519 --> 00:01:11,000
Part of the array is the heap.

17
00:01:11,000 --> 00:01:15,920
Part of the array is the sorted subarray and eventually we bring it down to the whole thing

18
00:01:15,920 --> 00:01:16,920
being sorted.

19
00:01:17,320 --> 00:01:21,879
It's very little code beyond the basic heap code that we've looked at and I can get this

20
00:01:21,879 --> 00:01:22,879
implemented.

21
00:01:22,879 --> 00:01:25,079
That's called heap sort.

22
00:01:25,079 --> 00:01:31,439
Let's take a demo of how heap sort works in our example.

23
00:01:31,439 --> 00:01:36,120
So the idea is we're going to use a bottom up method.

24
00:01:36,120 --> 00:01:41,879
So all that means is we start with an array in arbitrary order and then we're going to

25
00:01:41,879 --> 00:01:45,719
work from the bottom up to make sure that it's heap ordered.

26
00:01:45,719 --> 00:01:48,840
So all the nodes with no children are heap ordered.

27
00:01:48,840 --> 00:01:49,920
There are only a size one.

28
00:01:49,920 --> 00:01:54,719
The first one we have to worry about is this one here.

29
00:01:54,719 --> 00:01:59,159
The root, we haven't examined yet.

30
00:01:59,159 --> 00:02:04,400
Its children are heap ordered so it's a small heap of size three that may not be heap

31
00:02:04,400 --> 00:02:05,400
ordered.

32
00:02:05,400 --> 00:02:08,439
In this case it's not because one of the children is larger.

33
00:02:08,439 --> 00:02:10,240
So that's where things are going to start.

34
00:02:10,240 --> 00:02:17,000
We have a lot of one node heaps and then we're going to have to perform the sink operation

35
00:02:17,000 --> 00:02:18,760
on this one at node five.

36
00:02:18,760 --> 00:02:21,840
That's in this case just to change it with this parent.

37
00:02:21,840 --> 00:02:27,280
And then proceeding in that way moving bottom up or moving from right to left, the next

38
00:02:27,280 --> 00:02:32,960
thing we do is then we have a three node heap that's heap ordered and we're fine.

39
00:02:32,960 --> 00:02:38,280
Now we'll move over to the T and again that's the root of a three node heap that's heap

40
00:02:38,280 --> 00:02:40,319
ordered except at the root.

41
00:02:40,319 --> 00:02:43,520
We may need to fix it with the sink operation.

42
00:02:43,520 --> 00:02:48,879
In this case nothing is required because it's larger than its children so we have a three

43
00:02:48,879 --> 00:02:50,680
node heap.

44
00:02:50,680 --> 00:02:55,080
Then we move one more to the left now we're looking at the R. Again, root of a three node

45
00:02:55,080 --> 00:02:57,560
heap may or may not be heap ordered.

46
00:02:57,560 --> 00:02:59,800
We do have to do the sink operation.

47
00:02:59,800 --> 00:03:03,039
In this case that brings the X up.

48
00:03:03,039 --> 00:03:04,039
Three node heap.

49
00:03:04,039 --> 00:03:05,039
Now we go to two.

50
00:03:05,039 --> 00:03:07,079
So that's the root of a seven node heap.

51
00:03:07,079 --> 00:03:13,359
We know the two three node heaps that are children are heap ordered but we may have to correct

52
00:03:13,359 --> 00:03:17,879
the heap ordering at the root so we do a sink on two.

53
00:03:17,879 --> 00:03:22,719
And that's going to involve exchanging with the T because T is larger than O and exchanging

54
00:03:22,719 --> 00:03:25,719
with the P because P is larger than O.

55
00:03:25,719 --> 00:03:30,560
Now that heap is a seven node heap that's all heap ordered.

56
00:03:30,640 --> 00:03:34,199
Then the last thing is to do the root of the whole thing.

57
00:03:34,199 --> 00:03:37,199
Again now the two subtrees are heap ordered.

58
00:03:37,199 --> 00:03:38,520
That's what we mean by bottom up.

59
00:03:38,520 --> 00:03:44,439
We took care of the heap ordering from the bottom up and so we'll do a sink on the S and

60
00:03:44,439 --> 00:03:47,039
bring it into a heap ordering.

61
00:03:47,039 --> 00:03:53,840
So that's with just a few exchanges we got that whole array heap ordered.

62
00:03:53,840 --> 00:03:59,319
And now what we want to do is take advantage of the heap ordering in the array to do a

63
00:03:59,319 --> 00:04:00,920
sort.

64
00:04:00,920 --> 00:04:03,680
And the concept is very simple.

65
00:04:03,680 --> 00:04:08,520
Right away we have the maximum element in the array right at the root.

66
00:04:08,520 --> 00:04:12,800
We want that to be at the end so that's what we're going to do is just put it at the end.

67
00:04:12,800 --> 00:04:18,920
We exchange the element at the root with the last element, pull it off the heap.

68
00:04:18,920 --> 00:04:20,160
And then that's our example.

69
00:04:20,160 --> 00:04:23,920
We might have violated the heap order condition at the heap right now.

70
00:04:23,920 --> 00:04:28,280
So now we have to do a sink operation on the E.

71
00:04:28,280 --> 00:04:34,280
And so it's larger than both children and the larger the two children is T.

72
00:04:34,280 --> 00:04:36,440
So we promote the T.

73
00:04:36,440 --> 00:04:40,440
And the P is larger the two children and promote that.

74
00:04:40,440 --> 00:04:43,320
And then finally the E comes down to the bottom.

75
00:04:43,320 --> 00:04:47,879
So now that's one step in the sort we got the largest element off.

76
00:04:47,879 --> 00:04:51,480
Now the next largest element in the array is now at the root of the heap.

77
00:04:51,480 --> 00:04:52,959
We're going to do the same thing.

78
00:04:52,959 --> 00:04:57,360
Exchange it with the last element in the heap.

79
00:04:57,360 --> 00:05:02,079
Then now the T is in its final position in the sorted array.

80
00:05:02,079 --> 00:05:03,959
We take it off the heap.

81
00:05:03,959 --> 00:05:09,920
So now we've got a heap with nine elements and two of the elements in the array are already

82
00:05:09,920 --> 00:05:12,199
in their final position.

83
00:05:12,199 --> 00:05:14,040
And now this one's not heap-bordered.

84
00:05:14,040 --> 00:05:17,879
So we have to exchange it with the largest of its two children.

85
00:05:17,879 --> 00:05:21,920
In this case that involves promoting the S and the R.

86
00:05:21,920 --> 00:05:23,840
Now it's heap-bordered.

87
00:05:23,840 --> 00:05:27,000
So that's the end of two steps in heap sort.

88
00:05:27,000 --> 00:05:28,200
And then we just keep going.

89
00:05:28,200 --> 00:05:33,680
Pulling off the largest element from the heap, exchanging it with the element in the

90
00:05:33,680 --> 00:05:38,280
heap in the largest position in the array, which brings that element into its final position

91
00:05:38,280 --> 00:05:40,120
in the sorted array.

92
00:05:40,120 --> 00:05:45,319
And then adjusting the heap-bordering with the sync operation.

93
00:05:45,319 --> 00:05:47,879
So that E again is going to come down.

94
00:05:47,879 --> 00:05:51,360
And now it only goes down one step in this case.

95
00:05:51,360 --> 00:05:54,079
So now R exchanges with M.

96
00:05:54,079 --> 00:05:55,519
It's in its final position.

97
00:05:55,519 --> 00:06:00,160
And you can see down at the bottom the large elements in the array filling in in their

98
00:06:00,160 --> 00:06:05,560
final position in the left part of the array is representing the heap.

99
00:06:05,560 --> 00:06:10,680
The R goes off the heap, do the sync operation on the M.

100
00:06:10,680 --> 00:06:14,000
And now we have a heap-bordered array.

101
00:06:14,000 --> 00:06:21,720
So now do the P, exchange that with the A. Take it off the heap, do the sync operation on

102
00:06:21,720 --> 00:06:29,519
the A. Now we're going to do the O, exchange that with the E. Take it off the heap, do the

103
00:06:29,519 --> 00:06:34,560
sync operation on E, which involves promoting the larger of its two children until it gets

104
00:06:34,560 --> 00:06:38,839
to the bottom or a place where it's larger than both its children.

105
00:06:38,839 --> 00:06:42,240
So now we have just five elements left.

106
00:06:42,240 --> 00:06:48,519
We'll get the M. Do heap-bordering on the heap of four.

107
00:06:48,519 --> 00:06:51,000
And that only involves one exchange.

108
00:06:51,000 --> 00:06:56,279
Now we get the L. A exchange with the larger of its two children while they're both the

109
00:06:56,279 --> 00:06:57,279
same.

110
00:06:57,279 --> 00:06:59,439
So it goes with the left one.

111
00:06:59,439 --> 00:07:01,439
That's the heap-size three.

112
00:07:01,439 --> 00:07:07,079
Pull off the first E. It's already heap-bordered.

113
00:07:07,079 --> 00:07:13,600
Pull off that E. And now we're left with only one element in the heap.

114
00:07:13,600 --> 00:07:14,920
And it's in the first position.

115
00:07:14,920 --> 00:07:17,279
So there's nothing to do.

116
00:07:17,279 --> 00:07:26,159
So with a series of N, exchange, and then sync operations, we pull the sorted array out

117
00:07:26,159 --> 00:07:29,959
of the heap.

118
00:07:29,959 --> 00:07:34,439
OK, this slide summarizes the code for heap construction.

119
00:07:34,439 --> 00:07:37,680
And as you can see, it's a one-liner.

120
00:07:37,680 --> 00:07:44,879
We go backwards through the heap, starting at N over two, because the rightmost half of

121
00:07:44,879 --> 00:07:47,879
the array is just little heap-size-one.

122
00:07:47,879 --> 00:07:54,959
We just go backwards doing a sync, starting at K. So that's the first piece of code for

123
00:07:54,959 --> 00:07:58,959
heap-ordering an array with arbitrary values.

124
00:07:58,959 --> 00:08:10,219
And then these diagrams summarize the sync calls that we just went through in the demo,

125
00:08:10,219 --> 00:08:13,159
starting at 5, 4, 3, 2, 1.

126
00:08:13,159 --> 00:08:22,519
As you can see, only one, two, 3, 4, 5 exchanges are needed to bring this into heap-bordering.

127
00:08:22,519 --> 00:08:26,279
Then the second pass, again, that's only a two-liner.

128
00:08:26,279 --> 00:08:30,599
We exchange the first element with the one at the end and then decrement the size of

129
00:08:30,599 --> 00:08:34,879
the heap and then do sync operations.

130
00:08:34,879 --> 00:08:43,039
And these diagrams summarize the sync operations that we showed in the demo.

131
00:08:43,039 --> 00:08:49,559
On an ever smaller heap, we continue just performing sync operations at the root until we get

132
00:08:49,559 --> 00:08:52,079
a completely sorted array.

133
00:08:52,080 --> 00:08:58,680
So given the sync implementation, we had one liner for the first pass and a three-liner

134
00:08:58,680 --> 00:09:01,000
for the second pass.

135
00:09:01,000 --> 00:09:07,440
So that gives a complete implementation of heap-sort with the code that we've given so

136
00:09:07,440 --> 00:09:08,440
far.

137
00:09:08,440 --> 00:09:09,440
So far.

138
00:09:09,440 --> 00:09:12,680
There's one little detail.

139
00:09:12,680 --> 00:09:18,360
When you're sorting an array, of course, position zero comes into account.

140
00:09:18,360 --> 00:09:24,879
And we've been building our heaps from position one, but we can take care of that in the less

141
00:09:24,879 --> 00:09:31,759
and exchange methods by just decarming the indices in those methods to have it work as

142
00:09:31,759 --> 00:09:34,080
if the array were zero through n.

143
00:09:34,080 --> 00:09:36,600
And that's a little implementation detail.

144
00:09:36,600 --> 00:09:45,279
But otherwise, this is a fine sort of implementation that actually is very little code.

145
00:09:45,279 --> 00:09:52,639
And it's got a place in the theory of algorithms that I'll talk about in just a second.

146
00:09:52,639 --> 00:10:00,039
This is just another trace without the data structures shown to just show in our standard

147
00:10:00,039 --> 00:10:04,919
way the elements in black and red are the ones that are touched in the elements in gray or

148
00:10:04,919 --> 00:10:07,439
the ones that are not touched at all.

149
00:10:07,439 --> 00:10:13,759
And to just show that this thing gets the sort done with touching relatively few elements.

150
00:10:13,759 --> 00:10:15,519
That's a trace.

151
00:10:15,519 --> 00:10:17,559
Let's look at an animation.

152
00:10:17,559 --> 00:10:20,600
Animation of heaps sort is interesting to watch.

153
00:10:20,600 --> 00:10:24,759
So the construction of the heap happens in a blink.

154
00:10:24,759 --> 00:10:30,559
And now it's pulling off the largest elements moving from right to left.

155
00:10:30,559 --> 00:10:36,519
So again, a very efficient way to get a sorting job done.

156
00:10:36,519 --> 00:10:39,519
So what about the mathematical analysis?

157
00:10:39,519 --> 00:10:44,879
Well, mathematical analysis for the heap sort part is pretty easy.

158
00:10:44,879 --> 00:10:47,919
In times, we're doing a sync operation.

159
00:10:47,919 --> 00:10:51,759
And the size of the heap is the most log n, so it's n log n.

160
00:10:51,759 --> 00:10:57,399
The construction actually, it turns out, although it's a little more complicated to prove,

161
00:10:57,399 --> 00:11:01,759
that it always uses just a linear number of comparison exchanges.

162
00:11:01,759 --> 00:11:03,639
And that's an interesting result in itself.

163
00:11:03,639 --> 00:11:08,159
You can build a heap from n values in linear time.

164
00:11:08,159 --> 00:11:12,799
And then in n log n more time, you can sort from that heap.

165
00:11:12,799 --> 00:11:18,959
And that's significant because it's the first sorting algorithm that we've seen that is

166
00:11:18,959 --> 00:11:27,120
both in place and manages to get the sorting job done with guaranteed n log n compares.

167
00:11:27,120 --> 00:11:28,199
Merge sort doesn't do that.

168
00:11:28,199 --> 00:11:30,319
It takes linear extra space.

169
00:11:30,319 --> 00:11:31,959
Quick sort doesn't do that.

170
00:11:31,959 --> 00:11:38,000
It takes quadratic time in the worst case, even though we make that unlikely by

171
00:11:38,000 --> 00:11:43,320
random shuffling, it still takes quadratic time in the worst case.

172
00:11:43,320 --> 00:11:45,440
But heap sort does both.

173
00:11:45,440 --> 00:11:50,480
Now, there's more complicated versions of merge sorting quicksort that can do this in theory.

174
00:11:50,480 --> 00:11:54,519
But heap sort is a pretty simple algorithm that gets both done.

175
00:11:54,519 --> 00:11:58,639
So on a job interview, somebody asks you what's in the in place sorting algorithm that's

176
00:11:58,639 --> 00:12:00,039
guaranteed n log n.

177
00:12:00,039 --> 00:12:03,240
Your answer's going to be heap sort.

178
00:12:03,240 --> 00:12:08,960
Now in practice, heap sort's actually not used that much for a couple of reasons.

179
00:12:08,960 --> 00:12:12,680
And they might ask you these on your job interview too.

180
00:12:12,680 --> 00:12:16,480
First thing is the inner loop is longer than quicksort.

181
00:12:16,480 --> 00:12:20,320
So like merge sort, there's more things to do in the inner loop.

182
00:12:20,320 --> 00:12:24,399
There's that compare of the two children bigger and then compare.

183
00:12:24,399 --> 00:12:27,600
So there's two compares that get done n log n times.

184
00:12:27,600 --> 00:12:31,600
And then there's some that array index arithmetic.

185
00:12:31,600 --> 00:12:38,080
The other thing which is probably more significant on modern machines is that the references to

186
00:12:38,080 --> 00:12:41,840
memory are all over the place when it's a huge array.

187
00:12:41,840 --> 00:12:47,800
So it's not a good algorithm for a situation where there's caching, which is almost everywhere

188
00:12:47,800 --> 00:12:49,080
nowadays.

189
00:12:49,080 --> 00:12:51,320
It doesn't have local memory reference.

190
00:12:51,320 --> 00:12:52,320
Like quicksort does.

191
00:12:52,320 --> 00:12:57,080
It's always referring to something that's nearby, something else that it just referred to.

192
00:12:57,080 --> 00:13:01,759
So if a big block of things comes into memory, there's no more extra cost.

193
00:13:01,759 --> 00:13:06,400
Whereas heap sort is going to look far away from the current place as it goes down the tree.

194
00:13:06,400 --> 00:13:09,639
And that makes it slower in a lot of situations.

195
00:13:09,639 --> 00:13:11,400
The other thing is it's not stable.

196
00:13:11,400 --> 00:13:16,040
Sometimes people choose to use merge sort in practice because of the stability, but heap

197
00:13:16,040 --> 00:13:24,240
sort's not stable for the usual reason that it does long distance exchanges that might

198
00:13:24,240 --> 00:13:29,120
bring items that have equal keys back out of order.

199
00:13:29,120 --> 00:13:37,000
So that's our full summary of sorting algorithms to completes our treatment of sorting algorithms

200
00:13:37,000 --> 00:13:39,000
with heap sort.

201
00:13:39,000 --> 00:13:43,759
And this is just adding the heap sort line to the table.

202
00:13:43,759 --> 00:13:44,759
It's in place.

203
00:13:44,759 --> 00:13:48,600
We don't use any auxiliary array.

204
00:13:48,600 --> 00:13:52,159
It's not stable, but it's worst case guaranteed time.

205
00:13:52,159 --> 00:13:56,240
It's proportionally in log in as well as the average in the best.

206
00:13:56,240 --> 00:14:01,759
This is not a trivial result, but it's also the case.

207
00:14:01,759 --> 00:14:07,439
So it's in log in guarantee in place, but it's not stable.

208
00:14:07,439 --> 00:14:14,519
And we still have the hope that someday somebody will develop a simple in place stable worst case

209
00:14:14,519 --> 00:14:18,799
in log in algorithm, but we're not quite there yet.

210
00:14:18,799 --> 00:14:23,039
And that completes our treatment of sorting algorithms with the heap sort algorithm.

