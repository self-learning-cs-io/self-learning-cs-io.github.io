---
title: PrincetonAlgorithms P3Part12 04_quick Find
---

1
00:00:00,000 --> 00:00:07,360
Now we'll look at our first implementation of an algorithm for solving the

2
00:00:07,360 --> 00:00:13,439
dynamic connectivity problem called QuickFind. This is a so-called eager

3
00:00:13,439 --> 00:00:18,719
algorithm for solving connectivity problem. The data structure that we're

4
00:00:18,719 --> 00:00:24,080
going to use to support the algorithm is simply an integer array indexed by

5
00:00:24,079 --> 00:00:31,079
object. The interpretation is the two objects P and Q are connected if and

6
00:00:31,079 --> 00:00:37,799
only if their entries in the array are the same. So for example, in this example

7
00:00:37,799 --> 00:00:46,439
with our 10 objects, the idea array that describes the situation after seven

8
00:00:46,439 --> 00:00:52,599
connections is illustrated in the middle of the slide so that after that at this

9
00:00:52,600 --> 00:00:58,439
point zero five and six are all in the same connected component because they

10
00:00:58,439 --> 00:01:05,320
have the same array entry zero one two and seven all have entry one and three

11
00:01:05,320 --> 00:01:11,359
four eight nine all have entry eight. So that representation is shows that

12
00:01:11,359 --> 00:01:16,280
they're connected and clearly that's going to support a quick implementation of

13
00:01:16,280 --> 00:01:20,599
the find operation. We just checked the array entries to see if they're equal.

14
00:01:20,599 --> 00:01:28,640
Check if P and Q have the same ID. So six and one have different IDs. One has

15
00:01:28,640 --> 00:01:35,119
ID one six has ID zero they're not in the same connected component. Union is

16
00:01:35,119 --> 00:01:41,199
more difficult in order to merge the components containing two given objects.

17
00:01:41,199 --> 00:01:47,319
We have to change all the entries whose ID is equal to one of them to the other

18
00:01:47,319 --> 00:01:52,639
one and arbitrarily we choose to change the ones that are the same as P to the ones

19
00:01:52,639 --> 00:01:58,719
that are same as Q. So if we're going to union six and one then we have to change

20
00:01:58,719 --> 00:02:05,359
entries zero five and six. Everybody in the same connected component is six from zero

21
00:02:05,359 --> 00:02:11,919
to one. This is as we'll see this is a bit of a problem when we have a huge

22
00:02:11,919 --> 00:02:17,599
number of objects because there's a lot of values that can change. But still it's

23
00:02:17,599 --> 00:02:23,839
easy to implement so that'll be our starting point. So we'll start with a demo of

24
00:02:23,839 --> 00:02:34,039
how this works. So initially we set up the ID array with each entry equal to its

25
00:02:34,039 --> 00:02:39,079
index and so all that says is that all the objects are independent they're in

26
00:02:39,080 --> 00:02:44,480
their own connected component. Now when we get a union operation so say four is

27
00:02:44,480 --> 00:02:52,400
supposed to be union with three then we're going to change all entries whose ID is

28
00:02:52,400 --> 00:02:58,439
equal to the first ID to the second one. So in this case we'll change the connect three

29
00:02:58,439 --> 00:03:05,360
and four means that we need to change the four to a three and we'll continue to do a few

30
00:03:05,360 --> 00:03:10,920
more so you'll get an idea of how it works. So three and eight now. So to connect three

31
00:03:10,920 --> 00:03:15,760
and eight now three and four have to be connected to eight so both of those entries have

32
00:03:15,760 --> 00:03:25,360
to change to eight. Okay so now what about six and five. So again we change the first

33
00:03:25,360 --> 00:03:32,600
one to match the second one so to connect six and five we change the six to a five. What

34
00:03:32,599 --> 00:03:40,719
about nine and four. So now we have to change the connect nine and four we have to change

35
00:03:40,719 --> 00:03:46,319
nine's entry to be the same as four's. So now we have three four eight nine all have

36
00:03:46,319 --> 00:03:53,400
entries eight they're all on the same connected component. Two and one means that we connect

37
00:03:53,400 --> 00:04:00,960
one by changing the two to a one. Eight nine are already connected they have the same

38
00:04:00,960 --> 00:04:09,080
entries in the idea array so that connected query that fine says true they're already connected.

39
00:04:09,080 --> 00:04:16,560
In five and zero have different entries they're not connected so we'd return false in that case

40
00:04:16,560 --> 00:04:30,720
not connected. And then if we want to connect five and zero then as usual we'll connect the

41
00:04:30,720 --> 00:04:40,240
entry corresponding to both five and six to zero. Seven and two union seven and two that's an

42
00:04:40,240 --> 00:04:51,360
easy one. And union six and one it's another three entries that have to get changed all those zeros

43
00:04:51,360 --> 00:05:01,840
have to get changed to once. So that's a quick demo of quick fine now next we'll look at the code for

44
00:05:01,840 --> 00:05:09,519
implementing that. Okay with this concrete demo in mind then moving to coding up this algorithm

45
00:05:09,519 --> 00:05:17,079
is pretty straightforward. Although it's an interesting programming exercise that a lot of us would

46
00:05:17,079 --> 00:05:26,319
get wrong the first time. So let's start with the constructor. Well we have a private integer array

47
00:05:26,319 --> 00:05:31,719
that's our idea array that's the data structure that's going to support this implementation. The

48
00:05:31,719 --> 00:05:38,879
constructor has to create the array and then go through and set the value corresponding to each

49
00:05:38,879 --> 00:05:48,480
index i to i. That's straightforward. The find operation or connected operation that's the easy one.

50
00:05:48,480 --> 00:05:57,120
This is the quick find algorithm. So it simply takes its two arguments p and q and checks whether their

51
00:05:57,120 --> 00:06:02,879
ID entries are equal and returns that value. If they're equal it returns true. If they're not equal it

52
00:06:02,879 --> 00:06:12,719
returns false. The more complicated operation implement is union and there we find first the ID

53
00:06:12,719 --> 00:06:18,639
corresponding with the first argument and then the ID corresponding to the second argument and then we

54
00:06:18,639 --> 00:06:26,719
go through the whole array and looking for the entries whose IDs are equal to the idea of the first

55
00:06:26,720 --> 00:06:33,520
argument and set those to the idea of the second argument. That's a pretty straightforward implementation. I

56
00:06:33,520 --> 00:06:40,480
mentioned that a lot of us would get us wrong. The mistake we might make is to put ID of p here rather than

57
00:06:40,480 --> 00:06:50,080
first picking out that value. You can think about the implications of that that's an insidious bug. So that's a

58
00:06:50,079 --> 00:06:56,959
fine implementation of quick find. Now the next thing is to decide how effective or efficient that algorithm is

59
00:06:56,959 --> 00:07:04,479
going to be. We'll talk in some detail about how to do that but for this it's sufficient to just think

60
00:07:04,479 --> 00:07:14,079
about the number of times the code has to access the array. As we saw when doing the implementation both the initial

61
00:07:14,079 --> 00:07:23,439
lies and the union operations involve a for loop that go through the entire array. So they have to touch in a constant

62
00:07:23,439 --> 00:07:28,879
proportional to n times they have to touch an array entry. Find operation is quick it just has to

63
00:07:28,879 --> 00:07:38,079
constant number of times check array entries. And this is problematic because the union operation is too

64
00:07:38,079 --> 00:07:49,039
expensive. In particular if you just have n union commands on n objects which is not unreasonable either

65
00:07:49,039 --> 00:07:56,799
they're either connected or not then that'll take quadratic time n squared time. And one of the themes that

66
00:07:56,799 --> 00:08:04,000
we'll go through over and over in this course is that quadratic time is much too slow and we can't accept

67
00:08:04,000 --> 00:08:13,279
quadratic time algorithms for large problems. The reason is they don't scale as computers get faster and

68
00:08:13,279 --> 00:08:23,920
bigger quadratic algorithms actually get slower. And let's just talk roughly about what I mean by that. A very rough

69
00:08:23,920 --> 00:08:30,800
standard say for now is that people have computers that can run billions of operations per second and they have

70
00:08:30,800 --> 00:08:38,639
billions of entries in main memory. So that means that you could touch everything in the main memory in

71
00:08:38,639 --> 00:08:47,519
about a second. That's kind of an amazing fact that this rough standard is really health for 50 or 60

72
00:08:47,519 --> 00:08:54,399
years. The computers get bigger but they get faster. So to touch everything in the memory it's going to

73
00:08:54,399 --> 00:08:59,919
take a few seconds. And that was true when computers only had a few thousand words of memory and it's true

74
00:08:59,919 --> 00:09:09,519
now that they have billions or more. So let's accept that as what computers are like. Now that that means is that

75
00:09:10,159 --> 00:09:19,919
with that huge memory we can address huge problems. So we could have billions of objects and hope to do

76
00:09:19,919 --> 00:09:25,919
billions of union commands on them. But the problem with that quick find algorithm is that that would

77
00:09:25,919 --> 00:09:34,639
take 10 to the 18th operations or say array accesses or touching memory. And if you do the math that works out to

78
00:09:34,639 --> 00:09:46,159
30 some years of computer time. Obviously not practical to address such a problem on today's computer. And the reason is

79
00:09:46,159 --> 00:09:54,559
and the problem is that quadratic algorithms don't scale with technology. You might have a new computer that's 10

80
00:09:54,559 --> 00:10:03,679
times as fast. But you can address a problem that's 10 times as big. And with the quadratic algorithm when you do that it's going to be 10

81
00:10:03,679 --> 00:10:12,479
times as slow. That's the kind of situation we're going to try to avoid by developing more efficient algorithms for solving problems like this.

