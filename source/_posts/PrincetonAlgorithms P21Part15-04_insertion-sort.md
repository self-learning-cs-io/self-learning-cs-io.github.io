---
title: PrincetonAlgorithms P21Part15 04_insertion Sort
---

1
00:00:00,000 --> 00:00:05,000
Now we'll look at insertion sort, which is another elementary method.

2
00:00:05,000 --> 00:00:10,000
Interestingly, it has quite different performance characteristics than selection sort.

3
00:00:10,000 --> 00:00:15,000
Let's look at a demo of insertion sort.

4
00:00:15,000 --> 00:00:21,000
For insertion sort, what we're going to do is we'll move on index i from left to right as before.

5
00:00:21,000 --> 00:00:27,000
But now in the i-th iteration, we're going to move ai into position among the elements to its left.

6
00:00:27,000 --> 00:00:32,000
Let's look at how that works on our example with cards.

7
00:00:32,000 --> 00:00:40,000
So now we start by initializing i at the first card.

8
00:00:40,000 --> 00:00:46,000
We take the idea that everything from i to its left is going to be sorted.

9
00:00:46,000 --> 00:00:50,000
And everything from the right we're not going to look at at all.

10
00:00:51,000 --> 00:00:55,000
So everything to the left of i is in ascending order. Everything to the right.

11
00:00:55,000 --> 00:00:57,000
We haven't seen it all yet.

12
00:00:57,000 --> 00:01:01,000
So now when we increment i, well in this case it's already in order.

13
00:01:01,000 --> 00:01:04,000
We don't have anything else to do.

14
00:01:04,000 --> 00:01:08,000
In the third case now when i is at the third entry in the array,

15
00:01:08,000 --> 00:01:14,000
now we start a index j and we move that starting at i to the left.

16
00:01:15,000 --> 00:01:21,000
And what we need to do is just exchange the five with every element to its left that's greater.

17
00:01:21,000 --> 00:01:26,000
So first we exchange it with the 10. It's still not in place so we exchange it with the 7.

18
00:01:26,000 --> 00:01:29,000
Now we get to the beginning array of the array.

19
00:01:29,000 --> 00:01:32,000
And once we've done that or we've hit a smaller element,

20
00:01:32,000 --> 00:01:37,000
then we have everybody to the left of i in order.

21
00:01:37,000 --> 00:01:41,000
So now we increment i again and we come to the 3.

22
00:01:42,000 --> 00:01:47,000
Again we exchange as long as the card immediately to the left is greater.

23
00:01:50,000 --> 00:01:55,000
And once we've done that then we have everything to the left of i in ascending order.

24
00:01:55,000 --> 00:01:58,000
Now in this case we have the 8.

25
00:01:58,000 --> 00:02:03,000
We only have to exchange 1 and now it's got the 7 to its left and everything is in order.

26
00:02:03,000 --> 00:02:07,000
So we've achieved putting it in order with less work in this case.

27
00:02:07,000 --> 00:02:10,000
We don't always have to go all the way back to the beginning.

28
00:02:11,000 --> 00:02:19,000
For exchange it with everybody to its left that's greater until we find on a smaller element and then it's in ascending order.

29
00:02:19,000 --> 00:02:22,000
2 has to go all the way back to the beginning.

30
00:02:27,000 --> 00:02:31,000
But then the very next one, the 9 has to only go back 1 position.

31
00:02:31,000 --> 00:02:35,000
And the 6 has to go about halfway back.

32
00:02:36,000 --> 00:02:41,000
And then we have the entire array sorted.

33
00:02:41,000 --> 00:02:46,000
Again we can look at insertion sort in terms of invariance.

34
00:02:46,000 --> 00:02:52,000
Our pointer still scans from left to right but now the elements of the left of the pointer,

35
00:02:52,000 --> 00:02:57,000
including it, are in order but the elements to the right have not yet been seen at all.

36
00:02:57,000 --> 00:03:02,000
So we have to look at the code that's going to maintain that invariant as the pointer increments.

37
00:03:03,000 --> 00:03:06,000
Move the pointer to the right as incremented again.

38
00:03:06,000 --> 00:03:13,000
Now the invariance broken because the element on the pointer is not in sorted order.

39
00:03:13,000 --> 00:03:20,000
To put it in sorted order we have to move from right to left exchanging it with every larger elements to its left.

40
00:03:20,000 --> 00:03:23,000
And that's what the code at the bottom does.

41
00:03:23,000 --> 00:03:30,000
It starts j at i and decrements j exchanging j with the elements to it.

42
00:03:30,000 --> 00:03:43,000
It's left a of j with the element to its left a of j minus 1 is long as a of j is less than a of j minus 1 or j is bigger than 0.

43
00:03:43,000 --> 00:03:54,000
And that immediately gives this code for insertion sort which is similar to our code for selection sort in just as simple.

44
00:03:54,000 --> 00:04:03,000
It's got two nested four loops, selection sort had two nested four loops, a test to comparison and an exchange inside the four loop.

45
00:04:03,000 --> 00:04:08,000
And that's a fine implementation of an elementary sorting method.

46
00:04:08,000 --> 00:04:12,000
What about the analysis of insertion sort?

47
00:04:12,000 --> 00:04:22,000
It's more complicated. Our proposition says that insertion sort to sort randomly ordered array with distinct keys

48
00:04:22,000 --> 00:04:30,000
it'll use about one quarter n squared compares and about the same number one quarter n squared exchanges on the average.

49
00:04:30,000 --> 00:04:36,000
This is more complicated to prove. It depends on the array being randomly ordered.

50
00:04:36,000 --> 00:04:44,000
And again, you can get a feeling for where the proposition comes from by looking at this n by n trace.

51
00:04:44,000 --> 00:04:54,000
Again, the black elements are the ones that we compare and actually there are also the exchanges on the red one is the one that's finally put into place.

52
00:04:54,000 --> 00:05:04,000
And you can see that for a larger array that's randomly ordered, the element that we put into place is going to go about halfway back on the average.

53
00:05:04,000 --> 00:05:14,000
So that means about half of the elements below the diagonal are going to be black on the average. There's n squared over two below the diagonal half of that is n squared over four.

54
00:05:14,000 --> 00:05:21,000
The analysis, exact analysis is not much more detailed than that.

55
00:05:21,000 --> 00:05:29,000
This is a bigger trace that shows again about half the elements below the diagonal are involved in the sort.

56
00:05:30,000 --> 00:05:42,000
Let's look at any animation since n squared over four versus n squared over two insertion sorts are going to be about twice as fast as selection sort.

57
00:05:42,000 --> 00:05:50,000
So we can do about twice as many items in the trace in the same amount of time.

58
00:05:50,000 --> 00:05:57,000
It grabs an element brings it back into position every time.

59
00:05:57,000 --> 00:06:01,000
So that's an animation for randomly ordered items.

60
00:06:01,000 --> 00:06:07,000
Now insertion sort does depend on the initial order of the data.

61
00:06:07,000 --> 00:06:13,000
Let's look at the best case and the worst case, which are certainly outliers.

62
00:06:13,000 --> 00:06:23,000
If the array happens to be already sorted, all insertion sort does is really validate that each element has got a smaller elements to its left.

63
00:06:23,000 --> 00:06:29,000
So it does no exchanges. It gets the sorting job done with just n minus one compares.

64
00:06:29,000 --> 00:06:38,000
On the other hand, if the array is in descending order and it's no duplicates, then every element goes all the way back.

65
00:06:38,000 --> 00:06:44,000
It makes n squared over two compares and n squared over two exchanges.

66
00:06:44,000 --> 00:06:50,000
So in the first case, it's much, much faster than selection sort linear and set a quadratic.

67
00:06:50,000 --> 00:06:59,000
In the second case, it's slower than a selection sort because it uses about the same number of compares, but it uses many more exchanges.

68
00:06:59,000 --> 00:07:03,000
So let's see that in the animation.

69
00:07:03,000 --> 00:07:07,000
So this is when the items come in and reverse order.

70
00:07:07,000 --> 00:07:16,000
Now every time it gets a new item, it has to exchange it all the way back to the beginning.

71
00:07:16,000 --> 00:07:23,000
The name kind of dynamic characteristic is selection sort except for every step, it's not just comparing.

72
00:07:23,000 --> 00:07:29,000
It's also exchanging, which makes it even slower in practice.

73
00:07:29,000 --> 00:07:35,000
So this is a bad case that we wouldn't like to see in a practical application.

74
00:07:35,000 --> 00:07:42,000
But there's also a good case that actually we take advantage of in plenty of practical applications.

75
00:07:42,000 --> 00:07:46,000
So what we do when the array is partially sorted.

76
00:07:46,000 --> 00:07:51,000
To talk about this in a quantitative way, we define what's called an inversion.

77
00:07:51,000 --> 00:07:56,000
An inversion is just a pair of keys that are out of order in the array.

78
00:07:56,000 --> 00:08:06,000
So this array has six inversions, T and R are out of order because R should go before T, T and P are out of order, and so forth.

79
00:08:06,000 --> 00:08:09,000
So we define six inversions.

80
00:08:09,000 --> 00:08:19,000
And we define an array to be partially sorted if its number of inversions is linear, if it's less than some constant times n.

81
00:08:19,000 --> 00:08:23,000
And partially sorted arrays appear often in practice.

82
00:08:23,000 --> 00:08:35,000
For example, if you have a large array with just a few that's sorted except for just a few unsorted elements appended at the end, it's going to be partially sorted.

83
00:08:35,000 --> 00:08:40,000
Or in other cases, if you only have a few entries out of place, the array is going to be partially sorted.

84
00:08:40,000 --> 00:08:44,000
These types of things arise often in practical applications.

85
00:08:44,000 --> 00:08:52,000
And what's interesting about insertion sort is that it runs in linear time for partially sorted arrays.

86
00:08:52,000 --> 00:09:01,000
And the proof is the number of comparisons in the number of exchanges is equal to the number of exchanges equal to the number of inversions.

87
00:09:01,000 --> 00:09:06,000
And then there's an extra compare for every element except the first.

88
00:09:06,000 --> 00:09:08,000
So let's look at how that looks in the animation.

89
00:09:08,000 --> 00:09:11,000
Here's a partially sorted array.

90
00:09:11,000 --> 00:09:15,000
And you can see that insertion sort quickly gets the job done.

91
00:09:15,000 --> 00:09:20,000
We're going to take advantage of this a little bit later in this lecture.

92
00:09:20,000 --> 00:09:24,000
That's insertion sort, our second elementary sorting method.

