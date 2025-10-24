---
title: PrincetonAlgorithms P39Part19 03_elementary Implementations
---

1
00:00:00,000 --> 00:00:06,000
Next we'll look at some elementary symbol table implementations.

2
00:00:06,000 --> 00:00:10,000
These are so simple that we won't go into much detail, but still it's worth

3
00:00:10,000 --> 00:00:14,000
while to take a look at them to set the stage for the more advanced implementations.

4
00:00:14,000 --> 00:00:17,000
We'll consider it next.

5
00:00:17,000 --> 00:00:21,000
Well, one thing we could do is maintain a linked list.

6
00:00:21,000 --> 00:00:25,000
We could keep it in order or keep it unordered. This version keeps it unordered.

7
00:00:25,000 --> 00:00:30,000
So we're going to have nodes in the linked list that have key value pairs.

8
00:00:30,000 --> 00:00:35,000
They have every key in the symbol table and the value associated with that key.

9
00:00:35,000 --> 00:00:43,000
For search we have to, since it's unordered, scan through the whole list to find a match a key that's there.

10
00:00:43,000 --> 00:00:53,000
For insert, we would also have to scan through all keys to find the place to update a value if it's a value that's already there.

11
00:00:53,000 --> 00:00:57,000
And if there's no match, we could add it to the front.

12
00:00:57,000 --> 00:01:02,000
So here's our simple client for traces.

13
00:01:02,000 --> 00:01:07,000
So if we associate s was zero, we just add it.

14
00:01:07,000 --> 00:01:11,000
That's our one node linked list that's got that information.

15
00:01:11,000 --> 00:01:18,000
Associate e with one that's not there. So we just add it to the beginning of the list a with two are with three.

16
00:01:18,000 --> 00:01:22,000
We see with four, h with five and so forth.

17
00:01:22,000 --> 00:01:28,000
So now when we associate e with six, we have to search through the list to see if there's an e.

18
00:01:28,000 --> 00:01:32,000
In this case, there is and then we update just update that value.

19
00:01:32,000 --> 00:01:35,000
That's the associative array abstraction.

20
00:01:35,000 --> 00:01:42,000
It's possible to implement symbol tables that allow multiple values with the same key and so forth.

21
00:01:42,000 --> 00:01:46,000
And that leads to different types of clients, different types of implementations.

22
00:01:46,000 --> 00:01:52,000
We're going to stick to this associative array abstraction and node duplicate keys in the symbol table.

23
00:01:52,000 --> 00:01:58,000
Because it both simplifies implementations and leads to simpler client code.

24
00:01:58,000 --> 00:02:02,000
Okay, x7 is a new value.

25
00:02:02,000 --> 00:02:06,000
We found a in there and update the value eight.

26
00:02:06,000 --> 00:02:17,000
And then m9 p 10 l 11 are all out there and they go at the beginning and then the last one changes the value at e again 12.

27
00:02:17,000 --> 00:02:29,000
So this is a simple implementing. This is a simple example of linked list processing slight modification of our stack and queue code.

28
00:02:29,000 --> 00:02:39,000
And we will skip the details and just note that what's the cost of implementing this?

29
00:02:39,000 --> 00:02:49,000
Well, if there's been, if there are n things on the symbol table, you have to for both search and insert look all the way through.

30
00:02:49,000 --> 00:02:56,000
And if everything's random, then an average unit have to look halfway through for a successful search.

31
00:02:56,000 --> 00:03:03,000
And it's while you still have to insert another issue is for many clients.

32
00:03:03,000 --> 00:03:09,000
If the keys are ordered, it's nice to be able to iterate through the symbol table in order.

33
00:03:09,000 --> 00:03:12,000
And this one by definition doesn't provide that.

34
00:03:12,000 --> 00:03:19,000
And this one just uses equals. So the keys don't have to be comparable for this.

35
00:03:19,000 --> 00:03:22,000
It just uses equals.

36
00:03:22,000 --> 00:03:31,000
So our challenge is to look for methods that give us more efficient implementations, these search and insert operations.

37
00:03:31,000 --> 00:03:35,000
And we've already looked at an algorithm that can do this.

38
00:03:35,000 --> 00:03:38,000
And that's binary search.

39
00:03:38,000 --> 00:03:52,000
So for binary search, the, what we're going to do is use an ordered array and actually use parallel arrays, one for the keys and one for the values.

40
00:03:52,000 --> 00:04:11,000
And the idea is to keep the array of keys in sorted order and then find the index associated with the key that we're searching for using binary search and then use that index to get the value associated with that key that's stored in a parallel array.

41
00:04:11,000 --> 00:04:16,000
We looked at the binary search algorithm earlier in the course.

42
00:04:16,000 --> 00:04:30,000
And so for example, if we're doing this, if these are the keys in our symbol table and we're doing a search for the index where P is stored, we look at the middle, P is bigger than L.

43
00:04:30,000 --> 00:04:39,000
So we look to the right. Look in the middle of the right half, P is less than R. So we look to the left and continue until we find P.

44
00:04:39,000 --> 00:04:48,000
When we find P, we return its index and we use that index to get us the value that we need.

45
00:04:48,000 --> 00:04:56,000
Or another way to look at this is it implements the function, how many keys are there that are less than K.

46
00:04:56,000 --> 00:05:14,000
So for example, for Q, that's unsuccessful search and you can figure out from the last index when you don't find your element that you're seeking, you can figure out the return value, which is the number of keys that are less than it.

47
00:05:14,000 --> 00:05:20,000
So that's a trace of implementing binary search to find the rank of a key in ordered array.

48
00:05:20,000 --> 00:05:32,000
And again, for successful, you can use that rank to return the value. And if it's unsuccessful, you can use that rank to figure out where to insert the new key.

49
00:05:33,000 --> 00:05:43,000
All right, so this is the code for the get operation in this rank, which is binary search.

50
00:05:43,000 --> 00:05:51,000
So this is precisely the binary search code that we looked at before. So let's look at the get.

51
00:05:52,000 --> 00:06:03,000
So if the whole table is empty, we return null. Otherwise, we call rank and that gives us the number of keys less than the current key.

52
00:06:03,000 --> 00:06:13,000
And so that is where we look to check to see if that key is there. If it's there, then we return the value with the same index and parallel array.

53
00:06:14,000 --> 00:06:20,000
If it's not there, then we return null saying the key's not there.

54
00:06:20,000 --> 00:06:40,000
Now the problem with binary searches, well, not necessarily the problem, but the situation is that when it's time to insert a new element, we have to move everything larger over one position, just like an insertion sort.

55
00:06:40,000 --> 00:07:02,000
So if the table has A, E, R, and S, and we have to insert the value C, then we have to move the E, R, and S over one position to put the C, and then put the value associated with C, do the same thing in the Valser array, move all the values associated with those keys over one position, and put the associated value in.

56
00:07:02,000 --> 00:07:17,000
So if we have a trace of what would happen for our trace, and again, every insertion involves making a new position by moving all the larger keys over one position, do the same thing in the Valser array.

57
00:07:17,000 --> 00:07:31,000
If it's changing the value associated with a key that's already there, then it's just a matter of finding where the key is and changing the value at that index.

58
00:07:31,000 --> 00:07:50,000
So those from that trace, it's pretty easy to see what's involved for the code, and we'll skip that code, and just take a look at the comparison between this elementary implementation for symbol tables with the sequential search and an unordered list.

59
00:07:50,000 --> 00:07:59,000
So one thing is we're using a different key interface. We're taking advantage of the fact that the keys are comparable to give us an efficient search.

60
00:07:59,000 --> 00:08:08,000
We can do search in worst case, in average case, in time proportional to log in. That's what binary search provides for us.

61
00:08:08,000 --> 00:08:21,000
And this is a fine data structure for symbol tables where there's relatively static where the values don't change much, and most of the operations are search.

62
00:08:21,000 --> 00:08:35,000
It's hard to beat binary search. On the other hand, in a dynamic situation where there are a lot of inserts, this method is going to be problematic because the cost of insert is linear, so proportional to n over 2.

63
00:08:35,000 --> 00:08:47,000
If you have a huge number of operations in everyone who's proportional to the symbol table size, then you're just not going to be able to support huge numbers of keys.

64
00:08:47,000 --> 00:08:58,000
What we want is efficient implementations of both search and insert. Those are elementary implementations, and next we'll look at more advanced ones.

