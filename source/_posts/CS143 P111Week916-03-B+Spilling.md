---
title: CS143 P111Week916 03 B+Spilling
---

1
00:00:00,000 --> 00:00:07,379
To summarize this video, Redistra allocation is one of the most important jobs that a compiler

2
00:00:07,379 --> 00:00:08,380
performs.

3
00:00:08,380 --> 00:00:13,880
It's really these days a must have and any kind of reasonable production compiler.

4
00:00:13,880 --> 00:00:18,719
The reason you need it is because intermediate code just generally uses too many temporaries.

5
00:00:18,719 --> 00:00:22,679
We're allowed to be a little bit sloppy with intermediate code precisely because we have

6
00:00:22,679 --> 00:00:24,960
good redistral allocation algorithms.

7
00:00:24,960 --> 00:00:29,000
The other reason is that redistures are just a very important resource and making good

8
00:00:29,000 --> 00:00:35,000
user registers, having some procedure for making efficient user registers leads to

9
00:00:35,000 --> 00:00:38,799
much, much better code in the end, much more efficient code.

10
00:00:38,799 --> 00:00:44,200
Now the redistral allocation algorithm I have described here is really targeted at risk

11
00:00:44,200 --> 00:00:45,200
machines.

12
00:00:45,200 --> 00:00:51,640
So for a risk machine, a reduced instruction set computer, kind of machine, you can pretty

13
00:00:51,640 --> 00:00:55,560
much take the redistral allocation algorithm I have described and for many of those machines,

14
00:00:55,560 --> 00:00:57,560
it would work out of the box.

15
00:00:57,560 --> 00:01:04,200
Risk machines, which stands for complex instruction set computers, often have restrictions on how

16
00:01:04,200 --> 00:01:05,920
the registers can be used.

17
00:01:05,920 --> 00:01:09,280
Certain operations can only work with certain registers.

18
00:01:09,280 --> 00:01:13,359
You may have redistures of different sizes that can only hold certain values.

19
00:01:13,359 --> 00:01:17,840
And so it becomes more complicated to do register allocation for such machines.

20
00:01:17,840 --> 00:01:22,719
What people have done is to adapt the graph coloring procedure that I've described here.

21
00:01:22,719 --> 00:01:26,280
So the basic idea is exactly the same.

22
00:01:26,280 --> 00:01:30,239
And you would recognize those algorithms as being primarily the graph coloring algorithms

23
00:01:30,239 --> 00:01:31,439
that we discussed.

24
00:01:31,439 --> 00:01:38,039
There are just additional steps in those algorithms and places where the particular constraints

25
00:01:38,039 --> 00:01:40,439
on what registers can be used have to be observed.

