---
title: PrincetonAlgorithms P26Part16 04_bottom Up Mergesort
---

1
00:00:00,000 --> 00:00:05,500
Next, we're going to look at a bottom-up version of merge sort.

2
00:00:05,500 --> 00:00:10,380
While merge sort is easy to understand as a recursive program, this bottom-up version

3
00:00:10,380 --> 00:00:16,179
that has no recursion is also quite simple to understand and to code up.

4
00:00:16,179 --> 00:00:22,820
The basic idea is to think of the array as being a little at the beginning set of little

5
00:00:22,820 --> 00:00:25,620
sorted subarrays of size one.

6
00:00:25,620 --> 00:00:30,980
And then what this method will do is go through and merge those little subarrays of size

7
00:00:30,980 --> 00:00:34,840
one together in pairs to get subarrays of size two.

8
00:00:34,840 --> 00:00:39,960
Then the whole array consists of sorted subarrays of size two.

9
00:00:39,960 --> 00:00:44,480
Then we make another pass through to get size four and then size eight and so forth.

10
00:00:44,480 --> 00:00:49,640
So as you can see in this example, we start out by merging the first two subarrays of

11
00:00:49,640 --> 00:00:56,060
size one to make a array of size two EM that's sorted and then do the same thing for the

12
00:00:56,060 --> 00:01:02,539
next two elements and the next two and so forth until eventually instead of 16 individual

13
00:01:02,539 --> 00:01:07,500
elements, we have eight sorted subarrays of size two.

14
00:01:07,500 --> 00:01:12,240
Then in another pass through, we can take the EM and the GR and merge them together to make

15
00:01:12,240 --> 00:01:18,500
EGMR and EES and the OR merge those together to make EORS and so forth.

16
00:01:18,500 --> 00:01:22,140
Then we have four subarrays of size four.

17
00:01:22,140 --> 00:01:27,620
One more pass makes two subarrays of size eight and then the last pass is just a sorted

18
00:01:27,620 --> 00:01:29,019
array.

19
00:01:29,019 --> 00:01:33,980
The bottom line in this is a sequence of passes through the whole array and there's no

20
00:01:33,980 --> 00:01:36,500
recursion needed at all.

21
00:01:36,500 --> 00:01:40,379
It's extremely easy to code up as you can see from this code.

22
00:01:40,379 --> 00:01:46,939
We use the same merge code as before and we take a nested for loop.

23
00:01:46,939 --> 00:01:53,140
The first one is the size of the subarray and this loop gets executed only log n times

24
00:01:53,140 --> 00:01:58,859
because each time we double the size of the subarray until we get to n.

25
00:01:58,859 --> 00:02:06,099
Then we pass through picking out from load a low plus size minus one and then the next

26
00:02:06,099 --> 00:02:12,419
part is low plus size plus size minus one until we run to the end of the array we might

27
00:02:12,419 --> 00:02:17,500
not have a full subarray of size sz.

28
00:02:17,500 --> 00:02:22,219
That is a fully complete industrial strength code for sorting.

29
00:02:22,219 --> 00:02:29,419
The only down size as with regular merge sort is that it uses extra space proportional

30
00:02:29,419 --> 00:02:34,060
to the size of the array but otherwise it's a fine method for merging that's bottom up

31
00:02:34,060 --> 00:02:38,579
merge sort.

32
00:02:38,580 --> 00:02:42,660
If you look at this visual trace you can see how it works.

33
00:02:42,660 --> 00:02:48,860
The thing is totally un-sorted then it gets sorted until the subarrays the size 4, then

34
00:02:48,860 --> 00:02:51,060
8, 16 and 32.

35
00:02:51,060 --> 00:02:56,500
Now in this case the second subarray to be sorted is smaller but the merger team doesn't

36
00:02:56,500 --> 00:02:58,420
really care about that so much.

37
00:02:58,420 --> 00:03:03,500
You can merge things that are not equal in size and then we get a final sorted array.

38
00:03:03,500 --> 00:03:09,639
The size bottom up merge sort gets the job done in log n passes each pass using about

39
00:03:09,639 --> 00:03:13,139
n compares for a total cost of about n log n.

