---
title: CS144 NetworkP312 6dFinitestatemachines4
---

1
00:00:00,000 --> 00:00:03,000
The answer to the second question is closed.

2
00:00:03,000 --> 00:00:09,000
We start in the closed state, and the user program calls connect, and we transition to the sin-sense state.

3
00:00:09,000 --> 00:00:13,000
While in the sin-sense state, the user program calls close.

4
00:00:13,000 --> 00:00:18,000
So there's an edge from sin-sense on the close event, back to the closed state.

5
00:00:21,000 --> 00:00:25,000
So now our sockets are in the established state. They're exchanging data.

6
00:00:25,000 --> 00:00:31,000
The six dates in blue boxes are how TCP tears down a connection, or how it closes it.

7
00:00:31,000 --> 00:00:37,000
It's sometimes useful to talk about tearing down a connection, because the word close means something in terms of system calls.

8
00:00:37,000 --> 00:00:42,000
A connection exists after one side closes it, as we'll see.

9
00:00:42,000 --> 00:00:48,000
There's symmetry between how TCP sets up a connection, and how it tears it down.

10
00:00:48,000 --> 00:00:55,000
Where connection establishment uses synchronization or sin packets, connection tear down uses finish or thin packets.

11
00:00:55,000 --> 00:01:03,000
If one of the sides of the connection calls close, it's versus along the right edge on the left to the thin, weight one state.

12
00:01:03,000 --> 00:01:07,000
This causes it to send a thin packet to the other side of the connection.

13
00:01:07,000 --> 00:01:11,000
This is called the active closer, because it starts the operation.

14
00:01:11,000 --> 00:01:17,000
The other side receives the thin, and takes the blue edge on the right to the closed weight state.

15
00:01:17,000 --> 00:01:24,000
It remains in this state until the program inside calls close, at which point it sends a thin.

16
00:01:24,000 --> 00:01:26,000
Here's where it gets a little complicated.

17
00:01:26,000 --> 00:01:29,000
A TCP connection is bidirectional.

18
00:01:29,000 --> 00:01:34,000
The active closer has closed its direction of the connection, so it can't write any more data.

19
00:01:34,000 --> 00:01:38,000
But it could be the passive closer has more data to send.

20
00:01:38,000 --> 00:01:43,000
So the passive closer can continue to send data, which the active closer receives and acknowledges.

21
00:01:43,000 --> 00:01:46,000
Or it could close its side of the connection too.

22
00:01:46,000 --> 00:01:54,000
Or it could even have decided to close the connection at the same time, such that we have two thin packets crossing each other in the network.

23
00:01:54,000 --> 00:02:01,000
From the thin weight one state, where the active closer is, there are three possible outcomes.

24
00:02:01,000 --> 00:02:06,000
First, the passive closer might acknowledge the thin, but not send a thin.

25
00:02:06,000 --> 00:02:11,000
In this case, the passive closer is in the close weight state, and can continue to send data.

26
00:02:12,000 --> 00:02:17,000
This is the lower most edge, where the active closer enters the thin weight two state.

27
00:02:17,000 --> 00:02:22,000
Second, the passive closer might close its side too.

28
00:02:22,000 --> 00:02:25,000
Acknowledging the thin and sending a thin of its own.

29
00:02:25,000 --> 00:02:29,000
This is the middle edge to the time weight state.

30
00:02:29,000 --> 00:02:36,000
Finally, it could be that both sides actively close at almost the same time and send fins to each other.

31
00:02:36,000 --> 00:02:39,000
In this case, both are in the thin weight one state.

32
00:02:39,000 --> 00:02:44,000
Each one will see a fin from the other side that doesn't act its own fin.

33
00:02:44,000 --> 00:02:53,000
In this case, we transition to the closing state, and when our fin is acknowledged, we transition to the time weight state just as with the middle edge.

34
00:02:53,000 --> 00:03:00,000
TCP transitions from thin weight two to time weight when we receive a fin from the other side.

35
00:03:00,000 --> 00:03:06,000
It then stays in the time weight for a period of time until it can safely transition to close.

36
00:03:06,000 --> 00:03:13,000
The final blue edge from last act to close occurs when the passive closer's fin is acknowledged.

37
00:03:20,000 --> 00:03:23,000
Now, on one hand, that's a lot of detail.

38
00:03:23,000 --> 00:03:26,000
There are 12 states covering lots of cases.

39
00:03:26,000 --> 00:03:34,000
But I hope you can see how this finite state machine makes what was previously a few colloquial descriptions and gives them detail and precision.

40
00:03:35,000 --> 00:03:40,000
Trying to implement a properly interoperating TCP based on the descriptions would be really hard.

41
00:03:40,000 --> 00:03:47,000
This diagram precisely specifies how TCP behaves, and so it's tremendously useful.

