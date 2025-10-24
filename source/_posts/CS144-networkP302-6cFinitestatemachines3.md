---
title: CS144 NetworkP302 6cFinitestatemachines3
---

1
00:00:00,000 --> 00:00:02,800
The answer to the first question is,

2
00:00:02,800 --> 00:00:04,639
thin wait one.

3
00:00:04,639 --> 00:00:06,120
Let's walk through why.

4
00:00:06,120 --> 00:00:08,560
We start in the closed state,

5
00:00:08,560 --> 00:00:11,519
then the user program calls listen.

6
00:00:11,519 --> 00:00:13,880
We transition to the listen state,

7
00:00:13,880 --> 00:00:16,240
then the socket receives a sin,

8
00:00:16,240 --> 00:00:19,359
and we transition to the sin receive state.

9
00:00:19,359 --> 00:00:21,600
While in the sin receive state,

10
00:00:21,600 --> 00:00:23,640
the user program calls close,

11
00:00:23,640 --> 00:00:25,760
so we traverse the edge with close-in event,

12
00:00:25,760 --> 00:00:29,760
and close as an event to the thin wait one state.

