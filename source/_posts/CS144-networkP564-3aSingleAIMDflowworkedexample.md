---
title: CS144 NetworkP564 3aSingleAIMDflowworkedexample
---

1
00:00:00,000 --> 00:00:06,320
In this video, I will provide a worked example for a single flow with AIMD congestion control.

2
00:00:06,320 --> 00:00:12,640
Alice is streaming a high-definition video at 10 megabits per second from a remote server in San Francisco.

3
00:00:12,640 --> 00:00:21,039
All packets are 250 bytes long. She measures the ping time to the server, and the minimum time she measures is 5 milliseconds.

4
00:00:21,039 --> 00:00:29,000
Once the AIMD window reaches steady state, for the rest of the video, the sawtooth oscillates between constant minimum and maximum values.

5
00:00:29,000 --> 00:00:34,000
The buffer is perfectly sized, so that it is just big enough to never go empty.

6
00:00:34,000 --> 00:00:39,000
Part 1. What is the smallest value of the AIMD window in bytes?

7
00:00:39,000 --> 00:00:45,000
Well, the minimum ping time of 5 milliseconds is when the buffer is empty, but the bottleneck link is full.

8
00:00:45,000 --> 00:00:50,000
At 10 megabits per second, there's therefore 50,000 bits in the pipe.

9
00:00:50,000 --> 00:00:58,000
This means the minimum or trough of the AIMD sawtooth is 50,000 bits or 626250 bytes.

10
00:00:58,000 --> 00:01:02,000
So therefore the answer is 6,250 bytes.

11
00:01:02,000 --> 00:01:09,000
Part 2. What is the largest value of the AIMD window in bytes?

12
00:01:09,000 --> 00:01:16,000
When the buffer and bottleneck link are both full, the RTT is doubled from 5 milliseconds to 10 milliseconds.

13
00:01:16,000 --> 00:01:21,000
At 10 megabits per second, this corresponds to 100,000 bits.

14
00:01:21,000 --> 00:01:26,000
50,000 bits are in flight, and 50,000 bits are in the buffer.

15
00:01:26,000 --> 00:01:35,000
Therefore, the maximum or peak of the AIMD sawtooth is 100,000 bits or 12,500 bytes.

16
00:01:35,000 --> 00:01:40,000
Part 3. How big is the packet buffer in the router in bytes?

17
00:01:40,000 --> 00:01:49,000
Well, we already decided in question 2 that when it's full, the buffer holds 1 minimum RTT or 50,000 bits.

18
00:01:50,000 --> 00:01:57,000
Part 4. After a packet is dropped, how long does it take for the window to reach its maximum value again?

19
00:01:57,000 --> 00:02:04,000
Packets are 2,000 bits long, and so the window will increase by 2,000 bits every RTT.

20
00:02:04,000 --> 00:02:11,000
Therefore, it takes 25 RTTs to increase the RTT by 50,000 bits and fill the buffer.

21
00:02:11,000 --> 00:02:18,000
The average RTT is 7.5 milliseconds, therefore it will take 187.5 milliseconds.

22
00:02:23,000 --> 00:02:31,000
Part 5. If Alice now tries to watch the same video from a server in Australia with RTT 250 milliseconds,

23
00:02:31,000 --> 00:02:37,000
how big should the router buffer be in bytes if the network still runs at 10 megabits per second?

24
00:02:37,000 --> 00:02:48,000
Well, the minimum RTT is 250 milliseconds, so the buffer needs to be at least 250 milliseconds times 10 megabits per second equals 2.5 times 10 to the 6 bits.

25
00:02:48,000 --> 00:02:56,000
Because we express storage in powers of 2, the answer is 2.4 megabits or 298 kilobytes.

26
00:02:57,000 --> 00:03:09,000
Part 6. When the server is in Australia, after a packet is dropped, how long does it take for the window to reach its maximum value again in seconds?

27
00:03:09,000 --> 00:03:14,000
As before, the window increases by 2,000 bits every round.

28
00:03:14,000 --> 00:03:24,000
The fill the buffer will take 2.5 times 10 to the 6, divided by 2 times 10 to the 3 equals 1,250 rounds.

29
00:03:25,000 --> 00:03:36,000
The average RTT is 375 milliseconds, so the time to reach the maximum again is 468.75 seconds or almost 8 minutes.

30
00:03:37,000 --> 00:03:44,000
The answer might surprise you. It takes a long time for the AIMD flow to recover from a single packet drop.

31
00:03:44,000 --> 00:03:51,000
This would be a real problem in practice, which motivates us to look for better and quicker ways for TCP to recover from drop packets.

