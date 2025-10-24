---
title: CS144 NetworkP503 10aDelayGuaranteesExample
---

1
00:00:00,000 --> 00:00:06,799
Let's look at a worked example for delay guarantees.

2
00:00:06,799 --> 00:00:13,359
Two end hosts are separated by three routers and four 250 km lengths running at 100 megabits

3
00:00:13,359 --> 00:00:14,519
per second.

4
00:00:14,519 --> 00:00:19,800
The end hosts want to send a flow of 1,500 bytes packets to each other at 15 megabits per

5
00:00:19,800 --> 00:00:23,600
second, but they don't want their packets to take more than 10 milliseconds to go from

6
00:00:23,600 --> 00:00:25,160
end to end.

7
00:00:25,160 --> 00:00:29,920
If each router serves the flow at 15 megabits per second, how long will packets be

8
00:00:29,920 --> 00:00:32,719
delayed in each router?

9
00:00:32,719 --> 00:00:37,300
We can assume a propagation speed of 2 x 10 to the 8 m per second, and that the queuing

10
00:00:37,300 --> 00:00:41,840
delay is evenly distributed among the routers.

11
00:00:41,840 --> 00:00:47,600
From the question, we know that a third of the queuing delay will be in each of the routers.

12
00:00:47,600 --> 00:00:51,040
So first, we need to figure out what the queuing delay is.

13
00:00:51,040 --> 00:00:56,079
The queuing delay will be the total delay, which is 10 milliseconds, minus the fixed delay,

14
00:00:56,079 --> 00:01:00,560
which is the sum of the packetization delay and the propagation delay.

15
00:01:00,560 --> 00:01:05,599
So let's first calculate the packetization delay, which is the time to transmit a 1,500

16
00:01:05,599 --> 00:01:10,439
byte packet onto each of the four links along the path.

17
00:01:10,439 --> 00:01:16,959
For each link, the packetization delay is 1,500 bytes, times 8 bits per byte, divided

18
00:01:16,959 --> 00:01:21,239
by 100 megabits per second or 10 to the power of 8.

19
00:01:21,239 --> 00:01:27,000
This gives us a total packetization delay of .48 milliseconds.

20
00:01:27,000 --> 00:01:31,719
Now let's calculate the propagation delay, which is the time taken for 1 bit to reverse

21
00:01:31,719 --> 00:01:34,280
all four links.

22
00:01:34,280 --> 00:01:41,359
The time for each link is 250 kilometres, times 1000 m per kilometre, divided by the speed

23
00:01:41,359 --> 00:01:43,479
of propagation.

24
00:01:43,479 --> 00:01:47,000
The total time will be 5 milliseconds across all four links.

25
00:01:47,000 --> 00:01:52,280
So our total fixed delay is therefore 5.48 milliseconds.

26
00:01:52,280 --> 00:02:00,120
This means the queuing delay is 10 minus 5.48 equals 4.52 milliseconds, which we are told

27
00:02:00,120 --> 00:02:02,719
is divided equally among the three routers.

28
00:02:02,719 --> 00:02:08,920
Therefore, the queuing delay in each router can be no more than 1.507 milliseconds.

29
00:02:08,920 --> 00:02:16,439
The answer is therefore 1.507 milliseconds of delay per router.

30
00:02:16,439 --> 00:02:22,560
We could go on and calculate the amount of buffering needed in each router to hold 1.507 milliseconds

31
00:02:22,560 --> 00:02:24,039
of data.

32
00:02:24,039 --> 00:02:30,960
Given that the queue is being served at 15 megabits per second, this corresponds to 1.507 milliseconds,

33
00:02:30,960 --> 00:02:37,039
times 15 megabits per second, which is 22,605 bits.

34
00:02:37,039 --> 00:02:43,280
In practice, we'd round this up to at least two packets, which is 24,000 bits per router.

