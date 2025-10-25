---
title: CS143 P73Week610 05 B+Self+Type+Checking
---

1
00:00:00,000 --> 00:00:06,360
To wrap up this video, here are a few comments on implementing type checking in the presence

2
00:00:06,360 --> 00:00:08,320
of self-type.

3
00:00:08,320 --> 00:00:12,339
First of all, the extended sub-typing and least upper bound operations can do a lot of

4
00:00:12,339 --> 00:00:13,500
the work.

5
00:00:13,500 --> 00:00:17,960
If you extend sub-typing and least upper bound in the way that we did, then a lot of the

6
00:00:17,960 --> 00:00:21,519
rules don't have to change, and for the most part you don't have to do anything special

7
00:00:21,519 --> 00:00:24,400
for self-type.

8
00:00:24,400 --> 00:00:28,480
Self-type can only be used in a very few places in the language, and it's up to you to check

9
00:00:28,480 --> 00:00:29,839
that it isn't used anywhere else.

10
00:00:29,839 --> 00:00:34,520
Those restrictions have to be followed carefully.

11
00:00:34,520 --> 00:00:39,079
And finally, for the most part, a use of self-type always refers to any sub-type of the current

12
00:00:39,079 --> 00:00:40,079
class.

13
00:00:40,079 --> 00:00:43,399
There is one exception to this in the type checking of dispatch.

14
00:00:43,399 --> 00:00:50,000
In dispatch, there's a method lookup where we look up in some class C, a method F, and

15
00:00:50,000 --> 00:00:57,079
it's possible that that method will have a return type self-type.

16
00:00:57,079 --> 00:01:00,799
This class here, C, may have nothing to do with the current class.

17
00:01:00,799 --> 00:01:03,439
We're dispatching here to a different class.

18
00:01:03,439 --> 00:01:08,799
Whatever our current class is, this particular self-type refers to self-type in that class,

19
00:01:08,799 --> 00:01:12,120
the class in which we're doing the lookup, not whatever class in which we're doing type

20
00:01:12,120 --> 00:01:13,120
checking.

21
00:01:13,120 --> 00:01:17,200
Fortunately, we never need to compare that self-type to any self-type in the current class.

22
00:01:17,200 --> 00:01:21,039
So there's no crosstalk between different kinds of self-type.

23
00:01:21,040 --> 00:01:28,320
And again, this is the only place in the type checking rules where you look at a self-type

24
00:01:28,320 --> 00:01:33,880
that is not one in the current class.

25
00:01:33,880 --> 00:01:37,320
To summarize our discussion of self-type, a self-type is still a research idea.

26
00:01:37,320 --> 00:01:41,640
It adds more expressiveness to the type system, and I think that's easy to see, but you won't

27
00:01:41,640 --> 00:01:44,920
find self-type in mainstream languages.

28
00:01:44,920 --> 00:01:49,200
Self-type by itself, I think, is not so important, except for the project that you're going to

29
00:01:49,200 --> 00:01:50,719
implement.

30
00:01:50,719 --> 00:01:54,359
But rather, the reason for including self-type is to illustrate that type checking can be

31
00:01:54,359 --> 00:01:55,439
quite subtle.

32
00:01:55,439 --> 00:01:57,679
It's not all in plus and in equals in.

33
00:01:57,679 --> 00:02:02,079
There actually are fairly sophisticated things and fairly sophisticated reasoning that

34
00:02:02,079 --> 00:02:05,640
goes on inside of type checking.

35
00:02:05,640 --> 00:02:09,120
In practice, of course, there needs to be a balance between the complexity of the type

36
00:02:09,120 --> 00:02:11,439
system and its expressiveness.

37
00:02:11,439 --> 00:02:16,840
More complex type systems are harder to learn and they're harder to use effectively, but

38
00:02:16,840 --> 00:02:18,840
they also allow you to write more programs.

