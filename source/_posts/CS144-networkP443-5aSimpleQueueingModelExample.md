---
title: CS144 NetworkP443 5aSimpleQueueingModelExample
---

1
00:00:00,000 --> 00:00:03,000
The video included a quick worked example.

2
00:00:03,000 --> 00:00:09,000
In case you found the example hard to follow, in this short video I'm going to explain the same example in more detail

3
00:00:09,000 --> 00:00:12,000
and ask a few more questions about that same example.

4
00:00:12,000 --> 00:00:14,000
Here's the question.

5
00:00:14,000 --> 00:00:21,000
At the start of every second, a train of 100 bits arrived to a queue at rate 1000 bits per second.

6
00:00:21,000 --> 00:00:24,000
The departure rate from the queue is 500 bits per second.

7
00:00:24,000 --> 00:00:29,000
The queue is served bit by bit and you can assume the buffer size is infinite.

8
00:00:29,000 --> 00:00:32,000
What is the average queue occupancy?

9
00:00:32,000 --> 00:00:37,000
The cumulative arrival and departure processes will look like this.

10
00:00:37,000 --> 00:00:41,000
First, look at the cumulative arrivals A of T shown in red.

11
00:00:41,000 --> 00:00:47,000
In the first one-tenth of a second, 100 bits will arrive at rate 1000 bits per second.

12
00:00:47,000 --> 00:00:50,000
There are no more arrivals until one second.

13
00:00:50,000 --> 00:00:53,000
Then, a new 100 bits arrive.

14
00:00:53,000 --> 00:00:57,000
Now let's look at the departure process D of T shown in green.

15
00:00:58,000 --> 00:01:04,000
As soon as the first train of bits starts to arrive at rate 1000 bits per second, bits will start departing.

16
00:01:04,000 --> 00:01:08,000
Because the question says they are served bit by bit.

17
00:01:08,000 --> 00:01:14,000
If we had to wait for a whole packet of arrivals, then the departure process would not start increasing yet.

18
00:01:14,000 --> 00:01:23,000
The bits take 0.2 seconds to depart because they departed 500 bits per second, which is half the rate at which new bits arrive.

19
00:01:23,000 --> 00:01:28,000
The queue therefore builds up with a peak after 0.1 of a second.

20
00:01:28,000 --> 00:01:36,000
To answer the question, let's look at the occupancy of the queue Q of T as a function of time.

21
00:01:36,000 --> 00:01:41,000
The queue occupancy is the vertical distance between A of T and D of T.

22
00:01:41,000 --> 00:01:48,000
It's simply the number of bits that have arrived up until this point minus those that have departed.

23
00:01:48,000 --> 00:01:55,000
During the first 0.1 seconds, the queue builds up as new bits arrive to a peak of 50 bits.

24
00:01:55,000 --> 00:02:00,000
During the first 0.2 seconds, the average occupancy is 25 bits.

25
00:02:00,000 --> 00:02:06,000
Then, the queue drains from 0.1 second to 0.2 seconds until it is empty and all bits have departed.

26
00:02:06,000 --> 00:02:11,000
The queue is empty for 0.8 seconds and then the same process repeats.

27
00:02:11,000 --> 00:02:14,000
We can immediately calculate the time average occupancy of the queue.

28
00:02:14,000 --> 00:02:22,000
It spends 0.2 of a second with an average occupancy of 25 bits and then 0.8 of a second with an occupancy of 0.

29
00:02:22,000 --> 00:02:31,000
The time average is therefore 5 bits. We've answered question A.

30
00:02:31,000 --> 00:02:37,000
The second question is, what is the average delay of a bit in the queue?

31
00:02:37,000 --> 00:02:42,000
Let's look at the evolution of A of T and D of T again.

32
00:02:42,000 --> 00:02:48,000
The delay seen by a bit arriving at time T is D of T, little D of T.

33
00:02:48,000 --> 00:02:51,000
The horizontal distance between the two lines.

34
00:02:51,000 --> 00:02:56,000
The first bit arriving at time 0 experiences no delay.

35
00:02:56,000 --> 00:03:02,000
Whereas a bit arriving at 0.1 of a second experiences a delay of 0.1 seconds.

36
00:03:03,000 --> 00:03:13,000
Notice that no more bits arrive after 0.1 seconds, so it makes no sense to consider the delay of a bit arriving between 0.1 of a second and 1.0 seconds.

37
00:03:13,000 --> 00:03:20,000
We're essentially conditioning the probability on a bit arriving, which only happens in the first point 1 of every second.

38
00:03:20,000 --> 00:03:29,000
Therefore, the average delay seen by a bit arriving to the queue is simply 0.05 seconds.

39
00:03:29,000 --> 00:03:37,000
Question C. Staying with the same queue, the third question is, if the trains of 100 bits arrived at random intervals,

40
00:03:37,000 --> 00:03:46,000
one train per second on average, would the average queue occupancy be the same, lower or higher than in part A?

41
00:03:46,000 --> 00:03:50,000
The time average occupancy will be higher.

42
00:03:50,000 --> 00:03:58,000
When two trains arrived deterministically in part A, they never overlap, and so there were never bits from two trains in the queue at the same time.

43
00:03:59,000 --> 00:04:09,000
But if they arrived randomly, we might have bits from two or more trains in the queue at the same time, pushing up the occupancy and hence the average occupancy.

44
00:04:09,000 --> 00:04:14,000
This might be surprising, so let's look at an example to see why this is true.

45
00:04:14,000 --> 00:04:16,000
Consider two cases.

46
00:04:16,000 --> 00:04:25,000
Case 1 is like part A. We assume the trains arrive randomly, but no two trains ever overlap, just like in part A, they never overlap.

47
00:04:26,000 --> 00:04:30,000
The average queue occupancy would be the same as before, which was five bits.

48
00:04:33,000 --> 00:04:40,000
As soon as two trains overlap, even once the average will increase, to see why you consider the example here.

49
00:04:40,000 --> 00:04:46,000
The red line shows the queue occupancy of one train, which we assume arrives at time zero.

50
00:04:46,000 --> 00:04:54,000
Let's say the second train arrives at time zero point one second, just when the queue has 50 bits in it, still from the first train.

51
00:04:54,000 --> 00:05:02,000
The queue will keep growing, because bits are arriving twice as fast as they are leaving, the queue won't drain until point four seconds.

52
00:05:03,000 --> 00:05:12,000
If this happened every two seconds, the arrival rate would be the same as before, but the time average queue occupancy would now be as follows.

53
00:05:13,000 --> 00:05:20,000
For point four of a second, the time average occupancy is 50 bits. Then, for 1.6 seconds, it's empty.

54
00:05:21,000 --> 00:05:28,000
To get the time average, we divide by two seconds. The time average occupancy is 10 bits, which is double what it was before.

55
00:05:29,000 --> 00:05:41,000
Why is that? It's because the queue only drains at 500 bits per second, and so not only does it fill twice as much as before, it also takes twice as long to drain.

56
00:05:41,000 --> 00:05:46,000
The triangle showing when the queue is non-empty has four times the area as before.

57
00:05:50,000 --> 00:06:00,000
The fourth part of the question is, if the departing bits from the queue are fed into a second identical queue with the same departure rate, what is the average occupancy of the second queue?

58
00:06:02,000 --> 00:06:13,000
The second queue will have bits arrive at 500 bits per second, and the bits will depart at 500 bits per second. In other words, it will never accumulate bits and will always be empty.

