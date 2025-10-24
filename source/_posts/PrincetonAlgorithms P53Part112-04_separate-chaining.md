---
title: PrincetonAlgorithms P53Part112 04_separate Chaining
---

1
00:00:00,000 --> 00:00:08,120
Next we'll look at separate chaining, a collision resolution strategy that makes use of elementary

2
00:00:08,120 --> 00:00:10,720
linked lists.

3
00:00:10,720 --> 00:00:16,120
So what are we supposed to do when two different keys hash to the same index?

4
00:00:16,120 --> 00:00:19,839
The birthday problem tells us that we're going to have collisions.

5
00:00:19,839 --> 00:00:23,359
You need a quadratic amount of memory to avoid collisions.

6
00:00:23,359 --> 00:00:27,560
And the load balancing and coupon collector analysis tell us that the collisions are going

7
00:00:27,559 --> 00:00:31,879
to be evenly distributed among the table around the table.

8
00:00:31,879 --> 00:00:36,719
So what we want to do is have an easy way to deal with collisions.

9
00:00:36,719 --> 00:00:39,039
And so the first way we'll look at is called separate chaining.

10
00:00:39,039 --> 00:00:42,799
And it's a very old idea going back to 1953.

11
00:00:42,799 --> 00:00:48,519
And the idea is just to build a linked list for each of the table positions.

12
00:00:48,519 --> 00:00:53,679
So we'll have a table that's smaller than the number of keys that we have.

13
00:00:53,679 --> 00:00:57,759
The hash function will map each key to some integer.

14
00:00:57,759 --> 00:01:00,799
So in this case, we have a table of size 5.

15
00:01:00,799 --> 00:01:03,359
So the hash function will map any key.

16
00:01:03,359 --> 00:01:05,760
In this case, we use single letter keys.

17
00:01:05,760 --> 00:01:09,640
It'll map any key to an integer between 0 and 4.

18
00:01:09,640 --> 00:01:18,599
And then to do an insertion, we'll just keep a linked list at the table position corresponding

19
00:01:18,599 --> 00:01:19,960
to the hash value.

20
00:01:19,960 --> 00:01:22,439
So s hashes to position 2.

21
00:01:22,439 --> 00:01:27,799
It'll be on the linked list that is first linked as that position 2.

22
00:01:27,799 --> 00:01:31,079
And then e goes to 0 and a goes to 0.

23
00:01:31,079 --> 00:01:37,200
And for search, we're going to have to go to, if we're going to look at, is c in this

24
00:01:37,200 --> 00:01:40,239
table, say, we're going to find the hash value for c.

25
00:01:40,239 --> 00:01:43,159
And we'll look down the list to see if we can find c.

26
00:01:43,159 --> 00:01:45,599
So we have to look through the whole list for search.

27
00:01:45,599 --> 00:01:48,879
But you only have to look through one list out of all the lists.

28
00:01:48,879 --> 00:01:55,599
Essentially, if you have M entries in the hash table and M keys, the list you're going

29
00:01:55,599 --> 00:02:00,159
to have to look at is about N over M because they're evenly distributed.

30
00:02:00,159 --> 00:02:08,039
So that's a straightforward and simple scheme for implementing symbol tables with hashing.

31
00:02:08,039 --> 00:02:16,519
Now we could use an iterable bag or some data structure like that and hide the linked list

32
00:02:16,520 --> 00:02:19,360
structure underneath.

33
00:02:19,360 --> 00:02:22,800
And that's a perfectly fine way to proceed in modern programming.

34
00:02:22,800 --> 00:02:27,560
This implementation directly implements the linked list.

35
00:02:27,560 --> 00:02:33,680
Now for a practical situation, we picked some kind of some value of M.

36
00:02:33,680 --> 00:02:41,240
You could make it so that the hash table itself grows once it gets really huge.

37
00:02:41,240 --> 00:02:46,200
And such hybrid methods are easy to implement.

38
00:02:46,199 --> 00:02:49,679
So we won't talk too much about that.

39
00:02:49,679 --> 00:02:56,479
We need to, just in terms of implementation details, our keys and values have to be objects

40
00:02:56,479 --> 00:03:01,839
because we can't have an array of generics.

41
00:03:01,839 --> 00:03:07,319
So since we're making an array of nodes and node would have generics if we used a key

42
00:03:07,319 --> 00:03:09,199
and value.

43
00:03:09,199 --> 00:03:14,239
So we have to make them objects and then when we get things off, we're going to have to

44
00:03:14,239 --> 00:03:15,879
cast.

45
00:03:15,879 --> 00:03:23,000
So this is the get procedure.

46
00:03:23,000 --> 00:03:29,199
So to look for a key in the hash table, we compute the hash value.

47
00:03:29,199 --> 00:03:36,079
Our hash function is pull out the system hash code, make it positive by ending off the

48
00:03:36,079 --> 00:03:41,719
sign bit, and then mod with M to get a number between 0 and M minus 1.

49
00:03:41,719 --> 00:03:44,879
So we picked that number i.

50
00:03:44,879 --> 00:03:50,159
And then we just go to that list and this is the standard code for traversing a linked

51
00:03:50,159 --> 00:03:51,960
list.

52
00:03:51,960 --> 00:03:56,680
Start at the first node as long as it's not null, go x equals x dot next.

53
00:03:56,680 --> 00:04:01,840
And if you find a key that's equal to the key you're looking for, return the value and

54
00:04:01,840 --> 00:04:07,159
we have to cast it to value because of the generic or a creation problem in Java.

55
00:04:07,159 --> 00:04:09,400
Otherwise return null.

56
00:04:09,400 --> 00:04:15,240
So that's not much code and it's trivial code at that for doing an efficient symbol table

57
00:04:15,240 --> 00:04:17,959
search using hashing.

58
00:04:17,959 --> 00:04:27,079
And insertion is not much more difficult if you do the same thing and if you find a node

59
00:04:27,079 --> 00:04:33,519
with the key equal to the key on the linked list, you reset the value and return.

60
00:04:33,519 --> 00:04:37,879
Otherwise you make a new node and put it at the beginning of the linked list with this

61
00:04:37,879 --> 00:04:38,879
standard code.

62
00:04:38,879 --> 00:04:45,319
I replace STFI with a new node that links to the old STFI.

63
00:04:45,319 --> 00:04:52,040
So again, very little code to implement search and insert using hashing and that's why it's

64
00:04:52,040 --> 00:04:53,879
so popular.

65
00:04:53,879 --> 00:04:56,319
And what about the analysis?

66
00:04:56,319 --> 00:05:04,399
Well, again, this the standard probabilistic analysis of the balls and bins problem tells

67
00:05:04,399 --> 00:05:08,359
us a lot of information of what goes on.

68
00:05:08,359 --> 00:05:17,479
And again, if the uniform hashing assumption holds the probability that the number of keys

69
00:05:17,479 --> 00:05:23,759
within a list is within a constant factor of n over m is extremely close to 1.

70
00:05:23,759 --> 00:05:29,639
So it means that we've divided the search cost which would be n if we have a sequential

71
00:05:29,639 --> 00:05:34,519
search by a factor of m in many applications.

72
00:05:34,519 --> 00:05:40,479
Even setting m equals to 100 or 1000 is going to be very effective and that's why so many

73
00:05:40,479 --> 00:05:44,120
systems programmers use that.

74
00:05:44,120 --> 00:05:49,279
So number of probes for search and insert is proportional to n over m.

75
00:05:49,279 --> 00:05:57,599
Now typically what a programmer would do is try to figure on making m about equal to

76
00:05:57,600 --> 00:06:00,840
the number of keys divided by 5 say.

77
00:06:00,840 --> 00:06:07,040
So you can't make m too large, you have too much space and you'll have empty chains or

78
00:06:07,040 --> 00:06:08,040
short chains.

79
00:06:08,040 --> 00:06:12,120
And if you make m too small then the too long you have to search through them all.

80
00:06:12,120 --> 00:06:20,160
So let's say n over 5 and then you get constant time searches and not much extra space.

81
00:06:20,160 --> 00:06:24,760
You have extra space for the links to implement the linked list but the rest of the table is

82
00:06:24,760 --> 00:06:26,800
not much extra space.

83
00:06:26,800 --> 00:06:28,840
And those are typical parameters.

84
00:06:28,840 --> 00:06:33,319
If you want a full service symbol table which is going to grow from small to huge and then

85
00:06:33,319 --> 00:06:39,879
back down to small again then you'd want to use array resizing to make sure that m is

86
00:06:39,879 --> 00:06:46,199
always within a constant factor of n but we'll leave that detail out for now.

87
00:06:46,199 --> 00:06:52,600
So that brings us to this summary where red black trees we were happy with log base 2

88
00:06:52,600 --> 00:06:55,080
of n for search and insert.

89
00:06:55,080 --> 00:06:59,280
With separate chaining you can really get it down to a constant number of operations for

90
00:06:59,280 --> 00:07:00,720
search and insert.

91
00:07:00,720 --> 00:07:08,000
So hashing is going to be preferred for short keys where the hash functions easy to compute

92
00:07:08,000 --> 00:07:13,560
and where we don't need ordered iteration or any of the ordered symbol table operations

93
00:07:13,560 --> 00:07:18,080
because it has really fast access to the symbol table.

94
00:07:18,079 --> 00:07:21,560
That's our first collision resolution method hashing with separate chaining.

