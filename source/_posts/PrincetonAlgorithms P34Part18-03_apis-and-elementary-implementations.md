---
title: PrincetonAlgorithms P34Part18 03_apis And Elementary Implementations
---

1
00:00:00,000 --> 00:00:07,600
Welcome back. Today we're going to look at priority cues, which is a variant of sorting

2
00:00:07,600 --> 00:00:13,080
that generalizes the idea to provide more flexible data structure that we can use for all sorts

3
00:00:13,080 --> 00:00:20,160
of applications. To get started, we'll look at the API and some elementary implementations.

4
00:00:20,160 --> 00:00:28,500
So, at a week or so ago, we looked at collections in Java and the idea of the elementary data

5
00:00:28,500 --> 00:00:33,939
structures where we insert and delete items and then the data structures differ on the basis

6
00:00:33,939 --> 00:00:39,500
of which item we choose to delete. Now, we looked at the push down stack where we removed the item

7
00:00:39,500 --> 00:00:44,700
that was most recently added and the queue where we removed the item that was least recently added

8
00:00:44,700 --> 00:00:50,340
and then we talked about randomize queue or a bag where we might remove a random or an arbitrary

9
00:00:50,340 --> 00:00:56,340
item. Today, what we're going to talk about is called the priority cue and for that, we insert

10
00:00:56,340 --> 00:01:03,140
items but when it's time to remove, we consider the items to have a total order and we want to remove

11
00:01:03,140 --> 00:01:11,380
the largest or the smallest item. So, this little example, if we insert PQ and E, then when we do

12
00:01:11,380 --> 00:01:18,260
remove max, we want to get the queue out. If later we insert XAMM, then we remove max. The largest

13
00:01:18,260 --> 00:01:27,140
one in there is X, we insert PL and E and then after while we remove max P. So, that's our basic setup.

14
00:01:27,140 --> 00:01:34,820
That's what definition of what a priority queue is. So, the API will look very similar to our stack

15
00:01:34,820 --> 00:01:43,860
or queue API with the difference that we want to have generic items that are comparable. So, the Java

16
00:01:43,939 --> 00:01:53,299
language for that is in the class header, we say that our generic type, key, extends comparable of

17
00:01:53,299 --> 00:01:59,219
key. That just means that our keys must be comparable and we must have a compare to method that

18
00:01:59,219 --> 00:02:07,859
will compare to another key. Otherwise, we have a constructor and actually for some applications,

19
00:02:07,859 --> 00:02:14,659
it's convenient to have a constructor that takes an array of keys as argument. Then, insert,

20
00:02:14,659 --> 00:02:21,219
that's put something in like push in a stack or NQ and a queue, then delete the maximum.

21
00:02:22,340 --> 00:02:29,460
I referred to delete the minimum just to avoid confusion. We have implementation, separate implementation,

22
00:02:29,460 --> 00:02:38,580
usually minPQ where we delete the minimum. Then, test is empty and we also sometimes have

23
00:02:39,060 --> 00:02:46,020
extra method that just gives us the value of the largest key and also size which is useful

24
00:02:46,020 --> 00:02:52,819
sometimes in collections. You might also want it to be iterable but we'll skip that for now.

25
00:02:52,819 --> 00:03:00,579
There's lots and lots of applications of priority queues, even though it emerged as a data structure

26
00:03:00,579 --> 00:03:06,500
relatively late in the game. Now that we see that there are many algorithms that are much easier

27
00:03:06,500 --> 00:03:13,459
to implement when we think about the priority queue abstraction. We have data that we're processing,

28
00:03:13,459 --> 00:03:19,060
we can't process it all at once, we have to save it some of way. Then, what the priority queue

29
00:03:19,060 --> 00:03:25,379
tells us is let's organize it in some way so that we're always taking the best one to process next.

30
00:03:26,099 --> 00:03:32,340
That turns out to be very close to a generic algorithmic design technique that we'll be looking at

31
00:03:32,979 --> 00:03:38,500
in many, many different applications. Today, we're going to talk about event-driven simulation,

32
00:03:38,500 --> 00:03:45,379
which is an interesting idea that is based on priority queues but it's also used in numerical

33
00:03:45,379 --> 00:03:51,939
computation and we'll see in the algorithms for data compression and graph searching that it's

34
00:03:51,939 --> 00:03:59,299
useful in many other applications in computer science and in scientific computing. It generalizes

35
00:03:59,299 --> 00:04:07,539
the stack in the queue and gives us a data structure that we can use to effectively design algorithms

36
00:04:07,539 --> 00:04:17,459
of all sorts. So here's just a particular client that will help explain the idea. So our

37
00:04:17,459 --> 00:04:27,539
challenge is let's say this is on the web, we have billions of transactions in where they're

38
00:04:27,539 --> 00:04:34,819
streaming through our data warehouse or our processor in some way and just a very, very huge number

39
00:04:34,819 --> 00:04:40,339
of transactions. In fact, we couldn't possibly hope to even store them all. There's trillions of them

40
00:04:40,339 --> 00:04:47,699
there coming through as fast as possible. But we're interested in the biggest ones. So maybe it's

41
00:04:47,699 --> 00:04:52,980
the biggest amount of dollars at the biggest cost or whatever it might happen to be.

42
00:04:54,500 --> 00:05:01,620
And so we can pick some number that we can store. We'd like to store the thousand biggest ones. So

43
00:05:01,620 --> 00:05:07,379
you can imagine a credit card company looking for fraud. It's going to care about keeping track of

44
00:05:07,379 --> 00:05:14,500
the largest transactions. So maybe we can store millions or thousands of them. So that's our

45
00:05:14,500 --> 00:05:20,100
parameter and that's the number we can afford to store. But the total number of items we couldn't

46
00:05:20,100 --> 00:05:27,620
possibly afford to store them. So and this is just some test data where we've got all these

47
00:05:27,620 --> 00:05:33,620
transactions. And so we're going to be able to take in data like this and again in unbounded

48
00:05:33,620 --> 00:05:45,220
stream of data. But let's say we want to keep track of the top five values using the third column

49
00:05:45,220 --> 00:05:52,660
as the value. So we're going to look at a client program called top M that takes a command line

50
00:05:52,660 --> 00:05:57,700
argument. How many in this case it's going to say five. And then it's going to take the minimum.

51
00:05:58,980 --> 00:06:04,980
And it'll be generic. So we have a transaction type that holds this information including

52
00:06:05,700 --> 00:06:12,340
natural order where it's ordered by dollars that last column. So we'll build a new priority queue,

53
00:06:12,340 --> 00:06:18,500
min priority queue where we have the capability to delete the minimum. Then we read from standard input.

54
00:06:18,500 --> 00:06:23,300
We read a line, build a transaction from the information on that line,

55
00:06:24,259 --> 00:06:30,579
in that fill in the fields. And then we put that transaction on the priority queue.

56
00:06:31,379 --> 00:06:37,779
Now if the priority queue has more than M items because we inserted that one,

57
00:06:37,779 --> 00:06:43,540
then we want to delete the smallest one there. And that way we're keeping track of the largest M.

58
00:06:44,340 --> 00:06:51,540
Whenever we get a new one, then we throw away the smallest one that's there. So even with this huge

59
00:06:51,540 --> 00:06:57,300
stream of items coming through, we're only keeping track of the M largest item. And that's a

60
00:06:57,300 --> 00:07:05,460
fine canonical client for priority queue. Now how are we going to implement or solve this problem?

61
00:07:05,460 --> 00:07:10,900
Well, you can think of lots of ways to go ahead and solve this problem of finding the largest M items

62
00:07:10,899 --> 00:07:18,339
in the stream of M items. So for example, you could sort them and then just look at the M at the end.

63
00:07:19,219 --> 00:07:24,259
But by setting up the problem, I already kind of ruled that one out because we don't have

64
00:07:24,259 --> 00:07:32,899
the space to sort them all, the storm all. So sort is out of the question. We'll look at a couple

65
00:07:32,899 --> 00:07:40,419
of elementary priority queue implementations that are straightforward. Keep the items like we would

66
00:07:40,420 --> 00:07:45,939
in the stack and then when we need to find the smallest or the largest, look at them all. But that's

67
00:07:45,939 --> 00:07:51,460
going to be too slow. M is large and N is huge and M times N is going to be too slow.

68
00:07:54,340 --> 00:07:59,939
What we'll look at is a very simple and practical implementation using a data structure called the

69
00:07:59,939 --> 00:08:07,300
binary heap that gets the job done and time proportional to N log M in only M space. And that's

70
00:08:07,300 --> 00:08:13,220
pretty close to the best that we could do in theory and is very important and useful practical

71
00:08:13,939 --> 00:08:24,019
implementation and data structure. All right, so here's just an overview of two elementary

72
00:08:24,019 --> 00:08:31,540
implementations for priority queues using the example operations that I gave before.

73
00:08:32,180 --> 00:08:39,620
So you can imagine keeping the items say in a linked list or in a doubling array and just keeping

74
00:08:39,620 --> 00:08:46,420
just unordered just as we would in the stack, just keeping them the way that they come in. We put

75
00:08:46,420 --> 00:08:51,700
a new item at the end of the array and remove it from the end of the array or you could do it in a

76
00:08:51,700 --> 00:08:57,860
linked list. And then when it's time to find the, remove the maximum, you have to scan through

77
00:08:57,860 --> 00:09:06,340
everything to find the maximum. So that's one way you could implement this with a linked list

78
00:09:06,340 --> 00:09:12,019
or with a resizing array. Or you might decide, well, let's try to keep things in order.

79
00:09:13,060 --> 00:09:19,060
And then that might involve some work. We have to, it's like insertions or you have to find the

80
00:09:19,060 --> 00:09:24,340
place to put the new item and then put it in the right place. And again, you could do this with

81
00:09:24,980 --> 00:09:30,420
a linked list or with a resizing array, but then with array, you'd have to move all the larger ones

82
00:09:30,420 --> 00:09:35,700
over one position to fit the new item in. When we insert e and then it's supposed to keep them in

83
00:09:35,700 --> 00:09:42,980
order, we have to move over L, MP, MP to get the e in and so forth. But the advantage of that

84
00:09:42,980 --> 00:09:50,019
might be that removing the maximum is easy. We just take away the one at the end to remove the queue.

85
00:09:50,019 --> 00:09:55,699
We know it's at the end to remove the max at this point. That's x. It's right at the end on P

86
00:09:55,699 --> 00:10:04,019
and it's right at the end. So you can imagine the implementations of priority queues using these two

87
00:10:04,019 --> 00:10:13,059
basic strategies. Not much code involved. This is an unordered array implementation of priority queues.

88
00:10:13,859 --> 00:10:20,500
And it's quite straightforward. We didn't put in the, this is the cheat version where we

89
00:10:21,299 --> 00:10:27,699
require the client to provide a capacity, but we could easily change this to a resizing array.

90
00:10:28,979 --> 00:10:39,299
So insert just puts it at the end. And since it's unordered, delete maximum has to go through

91
00:10:39,379 --> 00:10:46,019
the entire array to try to find the maximum. When it finds it, it exchanges it with one at the end

92
00:10:46,899 --> 00:10:52,819
and then removes it the same way that we would in a stack. It'll use less in exchange just like we

93
00:10:52,819 --> 00:10:59,219
would in sorting methods. So that's a fine implementation if the priority queue is going to be tiny

94
00:10:59,220 --> 00:11:11,700
all the time. So without even implementing it, you can understand this table that if we use an

95
00:11:11,700 --> 00:11:17,139
unordered array implementation, we can get insertion done in constant time, but we have to look at

96
00:11:17,139 --> 00:11:23,379
everything to delete the maximum or even find the maximum. If we keep it in order, we can find the

97
00:11:23,379 --> 00:11:30,980
maximum or deleted in constant time, but it takes us linear time to insert. And since as with

98
00:11:30,980 --> 00:11:37,379
stacking queue operations, these insert and deletes might be intermixed in arbitrary ways,

99
00:11:38,100 --> 00:11:44,580
and there might be huge numbers of them. Neither one of these is very attractive because they're

100
00:11:44,580 --> 00:11:52,580
going to take n times the number of operations. Whereas what we can hope for and what we actually

101
00:11:52,580 --> 00:12:03,379
will achieve is to get log in time for all operations, time proportional to log in for all operations.

102
00:12:04,180 --> 00:12:10,020
With a clever data structure and interesting implementation, we can actually achieve that goal.

103
00:12:11,460 --> 00:12:15,620
That's the basic API and some elementary implementations for priority queues.

