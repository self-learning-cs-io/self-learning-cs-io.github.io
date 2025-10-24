---
title: PrincetonAlgorithms P22Part15 05_shellsort
---

1
00:00:00,000 --> 00:00:10,000
Now we'll look at shell sort, which is a bit elementary on the face of it, but it's not at all elementary, as you'll see.

2
00:00:10,000 --> 00:00:24,000
The idea of shell sort is that insertion sort is inefficient because elements really move only one position at a time, even when we kind of know that they have a long way to go.

3
00:00:24,000 --> 00:00:34,000
So the idea behind shell sort is that we'll move entries several positions at a time, and the way we're going to do it is called H sorting the array.

4
00:00:34,000 --> 00:00:50,000
So an H sorted array is H different interleaved sorted sub sequences. So in this case with H equals 4, if you start at L and look at every fourth element, m, p, t, then it's sorted.

5
00:00:50,000 --> 00:01:19,000
So this is 4 interleaved sequences. That's a 4 sorted array. And what we're going to do is implement a sorting method that H sorts for decreasing sequences of values of H. This is one of the oldest sorting methods invented by Shell in 1959. So in this case it starts out with the input example shown, and then a 13 sort, a few of them are going to be in the same way as the first one.

6
00:01:19,000 --> 00:01:36,000
So in the first instance, we'll see a 14 sort, a few items are moved, a 4 sort, a few more are moved, and then finally a 1 sort. And the idea is that each of these sorts can be implemented with only a few exchanges given that the previous ones happen.

7
00:01:36,000 --> 00:02:03,000
The first thing is how do we get an array H sorted? That's actually pretty easy. We just use insertion sort, but instead of going one back every time we come with a new item, we go H back. So for example, when we come to this a in the insertion sort, then it's, we look at the array before that. And there was m and e in the positions 3 back.

8
00:02:03,000 --> 00:02:11,000
So we exchange the a with the larger one to its left, that's m, and then the other larger one to its left, that's e, and then put it into position.

9
00:02:11,000 --> 00:02:23,000
So the code is the same as insertion sort, except that when we go backwards through the array, we skip by H instead of just by 1. That's how we H sort an array.

10
00:02:23,000 --> 00:02:32,000
And the idea is we're going to use insertion sort, because for two reasons, based on our understanding of how insertion sort works.

11
00:02:32,000 --> 00:02:45,000
Well, the first thing is if the increments are big, then the size of the sub arrays that we're sorting are pretty small. So any sorting method, including insertion sort, it's going to work well.

12
00:02:46,000 --> 00:02:57,000
But the other thing is if the increments are small, because we've done previous H sorts for bigger values of H, the array is partially sorted.

13
00:02:57,000 --> 00:03:11,000
And so insertion sort is going to be fast. It wouldn't work to use shell sort as the basis for H sorting, because that always takes a quadratic time no matter what order there is in the array.

14
00:03:11,000 --> 00:03:28,000
So let's look at an example of shell sort with increments 7, 3, and 1. So we start with the sort example, and then seven sorting it just involves doing insertion sort, but just reaching back seven each time.

15
00:03:28,000 --> 00:03:39,000
In this case, the four sub files stretched out at seven, each only have two elements in them. And then we three sort.

16
00:03:39,000 --> 00:03:48,000
Now because it's seven sorted in the three sort, elements are either already in place or are going to go back a few strides.

17
00:03:48,000 --> 00:04:05,000
In this case, it's only the A that goes back two. And then we one sort. And again, because of the fact that it's been seven sorted and three sorted, the arrays in almost in order when it comes time to do the one sort, and most the items only go back one or two positions.

18
00:04:05,000 --> 00:04:18,000
So we have to do a few extra passes to do the higher sorts, but the each element moves only a little bit on each path. And that's how shell sort gains its efficiency.

19
00:04:18,000 --> 00:04:29,000
So actually once you one sort, that's insertion sort. So you're going to always get an assorted result. The only difference is how efficient is that.

20
00:04:30,000 --> 00:04:47,000
Now, the intuition behind shell sort and actually the mathematical fact is that if you've got an array that's each sorted and then you case sorted for another value, K different from H, it's still each sorted.

21
00:04:47,000 --> 00:04:56,000
This is one of those mathematical facts that seems obvious. But then if you try to prove it, maybe it's a little more subtle than you think.

22
00:04:56,000 --> 00:05:08,000
So if you think of all this is trivial and easy, go ahead and try to write down a proof that a G sorted array remains G sorted even after it's H sorted.

23
00:05:08,000 --> 00:05:14,000
But most people will accept that and it's a fact and that's how shell sort gains its efficiency.

24
00:05:14,000 --> 00:05:25,000
Now, there's another problem is what increment sequence should we use for shell sort? One of the first things you might think of is let's try powers of two.

25
00:05:25,000 --> 00:05:41,000
Actually, that one doesn't work at all very well at all because it winds up not comparing elements in even positions with elements in odd positions until the one sort, which means performance can be bad.

26
00:05:41,000 --> 00:05:47,000
Shell's original idea is to try powers of two minus one. In that works, okay.

27
00:05:47,000 --> 00:06:01,000
Knewt, when he wrote his books in the 60s, proposed the increment sequence 3x plus one, you start with the one 4, 13, 4, 21, 21, 364 like that.

28
00:06:01,000 --> 00:06:14,000
And that's good because it's easy to compute. When we're using in shell sort, of course, we find the largest increment less than our file size and then do the sorts for decreasing values of that increment.

29
00:06:14,000 --> 00:06:22,000
But finding the best increment sequence is a research problem that has confounded people for quite a long time.

30
00:06:22,000 --> 00:06:32,000
Here's an increment sequence that I found after maybe a year's work and it works well, but nobody knows if that's the best one.

31
00:06:32,000 --> 00:06:41,000
So here's the implementation in Java of shell sort for Knus 3x plus one increment sequence.

32
00:06:41,000 --> 00:07:05,000
We just go ahead and compute the increments that are less than n over 3 and then starting at that increment, whatever it is, and say we start at 364, then next time we need an increment, we just divide by 3, 364, integer divide by 3, 364, integer divide by 3 is 121, 40, and so forth.

33
00:07:05,000 --> 00:07:23,000
So this h equals h over 3 gets us to the next increment. And then the implementation is just insertion sort. We just go through starting at h for i. And when we do the insertion, the j loop, we decrement j by h each time.

34
00:07:23,000 --> 00:07:40,000
Otherwise the code is exactly like insertion sort. So just adding this extra loop for h sorting and this extra loop to compute the increments to insertion sort, we get a slightly more complicated piece of code, but it's much, much more efficient.

35
00:07:40,000 --> 00:07:55,000
Here's what it looks like for a bigger array. We start with randomly ordered input, and you can see that it gets more and more in order on each time that we h sort for the decreasing values of h.

36
00:07:55,000 --> 00:08:13,000
Here's an animation. This animation does the whole h sort for each sub array. It gives a little better feeling for what's going on. And now it did the high ones pretty quickly and now it's doing the one sort. And again, it sips through the array pretty quickly.

37
00:08:13,000 --> 00:08:22,000
If it's partially sorted, it doesn't make much difference. Does the higher order sort a little bit faster.

38
00:08:22,000 --> 00:08:34,000
But that's a simple to implement in very efficient sorting algorithm. Now the analysis of shell sort is still open. There's a few things that we can say.

39
00:08:34,000 --> 00:08:44,000
For example, we can say that the number of compares in the worst case is big O of n to the three halves for the three X plus one increments.

40
00:08:44,000 --> 00:09:00,000
But actually in practice, it's much less than that. Problem is nobody knows an accurate model for describing the number of compares taken by shell sort for any interesting increments sequence.

41
00:09:00,000 --> 00:09:17,000
They seem to be with a small value multiple of n times the number of increments used, which is some multiple maybe of n log n. But nobody's been able to find an accurate model that proves that for any interesting increment sequence for shell sort.

42
00:09:18,000 --> 00:09:30,000
So why are we interested in this algorithm? Well, it's a simple idea that leads to substantial performance gains. It's very useful in practice because it's pretty fast, except for very huge arrays.

43
00:09:30,000 --> 00:09:46,000
It's going to beat even the classical sophisticated methods for medium size arrays. And it doesn't take much code. It's often used in embedded systems or in hardware sort type systems because there's so little code involved to implement it.

44
00:09:46,000 --> 00:10:00,000
And it just leads to a lot of interesting questions. This gets to the intellectual challenge of developing algorithms. If you think what we've been studying so far as trivial, go ahead and find a better increment sequence.

45
00:10:00,000 --> 00:10:07,000
Try some technique to discover one and try to say something about the average case performance of shell sort.

46
00:10:07,000 --> 00:10:19,000
People have been trying to do that for 50 years without a whole lot of success. So the lesson is that we can develop good algorithms or good implementations without much code.

47
00:10:19,000 --> 00:10:36,000
But there's some out there that are still waiting discovery. It could be that there's some increment sequence out there that makes shell sort more efficient than any other method, any of the sorting method that we know for practical file size. No one can deny that.

48
00:10:36,000 --> 00:10:42,000
That shell sort our first non-trivial sorting method.

