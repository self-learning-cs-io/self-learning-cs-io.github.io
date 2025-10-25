---
title: CS143 P106Week815 05 B+Liveness+Analysis
---

1
00:00:00,000 --> 00:00:05,719
To wrap up and summarize our discussion of the global analysis of control flow graphs, we've

2
00:00:05,719 --> 00:00:10,080
talked about two kinds of analysis in the past several videos.

3
00:00:10,080 --> 00:00:15,200
Constant propagation is what is called a four words analysis because information is pushed

4
00:00:15,200 --> 00:00:17,039
from the inputs to the outputs.

5
00:00:17,039 --> 00:00:21,960
So if you think about a control flow graph, what happens in control flow analysis is that

6
00:00:21,960 --> 00:00:23,320
information flows in this direction.

7
00:00:23,320 --> 00:00:26,120
It flows in the same direction as computation.

8
00:00:26,120 --> 00:00:31,339
If I have a constant up here, x is the sine of constant down here and x is used later

9
00:00:31,339 --> 00:00:35,120
on, then that constant will flow forward to the uses.

10
00:00:35,120 --> 00:00:38,960
So information flows in the same direction as computation.

11
00:00:38,960 --> 00:00:42,159
Liveness on the other hand is a backwards analysis.

12
00:00:42,159 --> 00:00:45,079
Information is pushed from outputs back towards inputs.

13
00:00:45,079 --> 00:00:50,120
So here, in this example, let me change colors.

14
00:00:50,120 --> 00:00:55,960
Here we see that x is live before this statement and that liveness gets propagated in

15
00:00:55,960 --> 00:00:56,960
the other direction.

16
00:00:56,960 --> 00:01:03,359
It gets propagated against the control, against the flow of execution, backwards towards the

17
00:01:03,359 --> 00:01:07,200
beginning of the program.

18
00:01:07,200 --> 00:01:10,960
So there are many other kinds of global flow analysis in the literature.

19
00:01:10,960 --> 00:01:15,640
The constant propagation analysis and the liveness analysis are two of the most important.

20
00:01:15,640 --> 00:01:19,000
There's a number of others that are also very important and many, many more that people

21
00:01:19,000 --> 00:01:20,760
have investigated.

22
00:01:20,760 --> 00:01:24,200
Almost all of these analyses can be classified as either forward or backward.

23
00:01:24,200 --> 00:01:29,000
There are some analyses and some important ones that are neither forward nor backward.

24
00:01:29,000 --> 00:01:32,079
Then information is basically pushed in both directions.

25
00:01:32,079 --> 00:01:36,799
And the other thing is that almost all the analyses in the literature that do global flow analysis

26
00:01:36,799 --> 00:01:42,520
anyway, also follow this methodology of local rules that relate information between adjacent

27
00:01:42,520 --> 00:01:43,840
program points.

28
00:01:43,840 --> 00:01:46,560
So that's really the local rules part that's important.

29
00:01:46,560 --> 00:01:51,000
So we break down the complicated problem of analyzing an entire control flow graph into

30
00:01:51,000 --> 00:01:55,959
a collection of rules that only do propagate information very, very locally.

