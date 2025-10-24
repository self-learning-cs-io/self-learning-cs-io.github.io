---
title: PrincetonAlgorithms P4Part12 05_quick Union
---

1
00:00:00,000 --> 00:00:06,600
Alright, so quick find is too slow for huge problems.

2
00:00:06,600 --> 00:00:09,560
So how are we going to do better?

3
00:00:09,560 --> 00:00:14,120
Our first attempt is an alternative called quick union.

4
00:00:14,120 --> 00:00:20,640
This is so called lazy approach to algorithm design where we try to avoid doing work until

5
00:00:20,640 --> 00:00:21,719
we have to.

6
00:00:21,719 --> 00:00:28,920
It uses the same data structure, our array ID with size n, but now it has a different

7
00:00:29,000 --> 00:00:31,320
interpretation.

8
00:00:31,320 --> 00:00:40,000
We're going to think of that array as representing a set of trees that's called a forest as depicted

9
00:00:40,000 --> 00:00:41,480
at right.

10
00:00:41,480 --> 00:00:51,000
So each entry in the array is going to contain a reference to its parent in the tree.

11
00:00:51,000 --> 00:00:58,640
So for example, 3's parent is 4, 4's parent is 9, so 3's entry is 4 and 4's entry is

12
00:00:58,719 --> 00:01:01,880
9 in the array.

13
00:01:01,880 --> 00:01:08,239
Now each entry in the array has associated with it a root.

14
00:01:08,239 --> 00:01:11,079
That's the root of its tree.

15
00:01:11,079 --> 00:01:17,599
Elements that are all by themselves in their own connected component point to themselves,

16
00:01:17,599 --> 00:01:22,240
so 1 points to itself, but also 9 points to itself.

17
00:01:22,240 --> 00:01:25,840
It's the root of the tree containing 2, 4 and 3.

18
00:01:25,840 --> 00:01:33,400
So from this data structure, we can associate with each item a root, which is representative

19
00:01:33,400 --> 00:01:37,159
say of its connected component.

20
00:01:37,159 --> 00:01:44,040
So that's a root of 3 is 9 going up that root.

21
00:01:44,040 --> 00:01:50,960
Now once we can calculate these roots, then we can implement the find operation just

22
00:01:51,039 --> 00:01:56,519
by checking whether the two items that we're supposed to check whether connected, whether

23
00:01:56,519 --> 00:01:57,639
they have the same root.

24
00:01:57,639 --> 00:02:02,879
That's equivalent to saying, are they in the same connected component?

25
00:02:02,879 --> 00:02:08,479
So that's some work going to find the roots of each item, but the union operation is

26
00:02:08,479 --> 00:02:16,000
very easy to merge components containing two different items, two items that are in different

27
00:02:16,039 --> 00:02:17,560
components.

28
00:02:17,560 --> 00:02:22,759
All we do is set the ID of P's root to the ID of Q's root.

29
00:02:22,759 --> 00:02:28,439
That's make P's tree point to Q. So in this case, we would change the entry of a 9 to

30
00:02:28,439 --> 00:02:32,879
be 6 to merge 3 and 5.

31
00:02:32,879 --> 00:02:34,800
The components containing 3 and 5.

32
00:02:34,800 --> 00:02:43,240
And with just changing one value in the array, we get the two large components merged together.

33
00:02:43,240 --> 00:02:48,040
That's the quick union algorithm because the union operation only involves changing one

34
00:02:48,040 --> 00:02:50,520
entry in the array.

35
00:02:50,520 --> 00:02:53,360
Find operation requires a little more work.

36
00:02:53,360 --> 00:02:59,200
So let's look at the implementation, a demo of that one in operation first.

37
00:02:59,200 --> 00:03:05,920
So again, we start out the same way, but now the ID array entry really means that every

38
00:03:05,920 --> 00:03:10,080
one of these things is a little tree with one node each.

39
00:03:10,080 --> 00:03:13,440
Every one pointing to itself is the root of its own tree.

40
00:03:13,440 --> 00:03:20,960
So now if we have to put 4 and 3 in the same component, then all we do is we take the root

41
00:03:20,960 --> 00:03:28,280
of the component containing the first item and make that a child of the root of the component

42
00:03:28,280 --> 00:03:29,280
containing second item.

43
00:03:29,280 --> 00:03:33,800
In this case, we just make 4's parent 3.

44
00:03:33,800 --> 00:03:36,960
So now 3 and 8.

45
00:03:36,960 --> 00:03:42,640
So again, we take the first item and make it a child of the root of the tree containing

46
00:03:42,640 --> 00:03:43,640
the second item.

47
00:03:43,640 --> 00:03:49,120
So now 3, 4 and 8 are in the same component.

48
00:03:49,120 --> 00:03:53,880
6 and 5, 6 goes below 5.

49
00:03:53,880 --> 00:03:56,000
9 and 4.

50
00:03:56,000 --> 00:04:04,000
So now 4 is the root of the tree containing 4 is 8 and the root of the tree containing

51
00:04:04,000 --> 00:04:10,840
9 is 9 and so we make 9 a child of 8.

52
00:04:10,840 --> 00:04:15,960
2 and 1, that's an easy one.

53
00:04:15,960 --> 00:04:20,839
Now if we get our 8 and 9 connected, we just check that they have the same root and they

54
00:04:20,839 --> 00:04:24,800
both have the same root 8 and so they're connected.

55
00:04:24,800 --> 00:04:34,000
5 and 4, 4 as a root is 8, 5 root is 5, they're different, they're not connected.

56
00:04:34,000 --> 00:04:41,439
5 and 0, 5 goes to be a child of 0.

57
00:04:41,439 --> 00:04:49,680
7 and 2, 7 goes to be a child of 2's root, which is 1.

58
00:04:49,680 --> 00:04:54,160
6 and 1, 6's root is 0.

59
00:04:54,160 --> 00:05:00,120
As its own root, so 0 becomes a child of 1.

60
00:05:00,120 --> 00:05:05,600
Each one of these union operations just involves changing one entry in the array.

61
00:05:05,600 --> 00:05:10,960
And finally, 7 and 3.

62
00:05:10,960 --> 00:05:17,960
So 7's root is 1, 3's root is 8, 1 becomes a child of 8.

63
00:05:18,799 --> 00:05:25,159
OK, and now we have one connected component with all the items together.

64
00:05:25,159 --> 00:05:30,199
All right, so now let's look at the code for implementing quick union.

65
00:05:30,199 --> 00:05:34,759
The constructor is the same as the other one.

66
00:05:34,759 --> 00:05:40,599
We create the array and then set each element to be its own root.

67
00:05:40,599 --> 00:05:46,639
Now we have a private method that implements this process of finding the root by chasing

68
00:05:46,639 --> 00:05:51,959
parent pointers until we get to the point where i is equal to i d of i.

69
00:05:51,959 --> 00:05:58,719
And if it's not equal, we just move i up one level in the tree, set i equals i d of i in return it.

70
00:05:58,719 --> 00:06:05,079
So starting at any node, you just follow i d equals i d of i until they're equal and then you're at a root.

71
00:06:05,079 --> 00:06:12,199
And that's a private method that we can use to implement the find operation or the connected operation.

72
00:06:12,199 --> 00:06:17,039
You just find the root of p and the root of q and if you check if they're equal.

73
00:06:17,039 --> 00:06:25,680
And then the union operation is simply find the two roots and then set the i d of the first one to be the second one.

74
00:06:25,680 --> 00:06:31,079
Actually, less code than for quick find.

75
00:06:31,079 --> 00:06:32,399
No for loops.

76
00:06:32,399 --> 00:06:35,919
There's this one while loop that we have to worry about a little bit.

77
00:06:35,920 --> 00:06:46,000
But that's a quick and elegant implementation of code to solve the dynamic kind of activity problem called quick union.

78
00:06:46,000 --> 00:06:53,400
So now we're going to have to look at can this code be effective for large problems?

79
00:06:53,400 --> 00:07:00,800
Well, unfortunately, quick union is faster, but it's also too slow.

80
00:07:00,800 --> 00:07:05,639
And it's a little different kind of too slow than for quick find.

81
00:07:05,639 --> 00:07:10,240
There's times when it could be fast, but there's also times when it could be too slow.

82
00:07:10,240 --> 00:07:20,759
And the defect for quick union is that the trees can get too tall, which would mean that the find operation would be too expensive.

83
00:07:20,759 --> 00:07:27,360
You could wind up with a long skinny tree of each object just pointing to a next.

84
00:07:27,360 --> 00:07:33,680
And then to do a find operation for object at the bottom would involve going all the way through the tree,

85
00:07:33,680 --> 00:07:40,600
costing, involving in array accesses just to do the find operation.

86
00:07:40,600 --> 00:07:43,400
And that's going to be too slow if you have a lot of operations.

