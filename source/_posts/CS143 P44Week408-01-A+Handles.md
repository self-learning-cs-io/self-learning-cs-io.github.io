---
title: CS143 P44Week408 01 A+Handles
---

1
00:00:00,000 --> 00:00:07,600
In this video, we're going to reduce another important concept in bottom-up parsing, the

2
00:00:07,600 --> 00:00:13,000
notion of a handle.

3
00:00:13,000 --> 00:00:15,640
To review bottom-up parsing uses two kinds of actions.

4
00:00:15,640 --> 00:00:21,039
We have shift moves, which just read one token of input and move the vertical bar one to

5
00:00:21,039 --> 00:00:26,160
the right and reduce moves, which replace the right hand side of a production, immediately

6
00:00:26,160 --> 00:00:30,120
to the left of the vertical bar by a production left hand side.

7
00:00:30,120 --> 00:00:36,600
So in this case, the production must have been a goes to xy.

8
00:00:36,600 --> 00:00:41,519
And also reviewing what we did in the last video, the left string can be implemented by a stack

9
00:00:41,519 --> 00:00:44,719
where the top of the stack is marked by the vertical bar.

10
00:00:44,719 --> 00:00:50,079
So shift pushes a terminal onto the stack and reduce pops, zero or more symbols off the

11
00:00:50,079 --> 00:00:52,679
stack, and that's going to be the right hand side of some production.

12
00:00:52,679 --> 00:00:57,359
And then it's going to push one non-terminal onto the stack, which is the left hand side

13
00:00:57,359 --> 00:01:01,759
of that same production.

14
00:01:01,759 --> 00:01:05,439
And the key question in bottom-up parsing, and one that we haven't addressed at all yet,

15
00:01:05,439 --> 00:01:09,239
is how do we decide when to shift and when to reduce?

16
00:01:09,239 --> 00:01:12,879
So let's take a look at this example grammar.

17
00:01:12,879 --> 00:01:18,920
And let's think about a step of a parse where we've shifted one token onto the stack.

18
00:01:18,920 --> 00:01:24,200
We have int on the stack, and then we have times implicit still to go that we haven't seen yet.

19
00:01:24,200 --> 00:01:29,680
Now at this point, we could decide to reduce by T goes to int, because we have the production,

20
00:01:29,680 --> 00:01:31,840
T goes to int right here.

21
00:01:31,840 --> 00:01:37,040
And so we could then get into this potential state or this particular state where we have T on the

22
00:01:37,040 --> 00:01:40,719
stack, and then the rest of the input that looks like that.

23
00:01:40,719 --> 00:01:43,560
But you can see that this would be a mistake.

24
00:01:43,560 --> 00:01:47,680
There is no production in the grammar that begins T times.

25
00:01:47,680 --> 00:01:51,520
There's no production up here that looks like T times.

26
00:01:51,520 --> 00:01:57,200
And therefore, if we were to make this move, we would get stuck.

27
00:01:57,200 --> 00:02:02,520
We could continue to do reductions to rummage around in the string, but we would never be

28
00:02:02,520 --> 00:02:07,640
able to get back to the start symbol, because there is no way to deal with a substring that

29
00:02:07,640 --> 00:02:12,400
has T times something in it.

30
00:02:12,400 --> 00:02:17,360
So what that shows us is that we don't always want to reduce just because we have the

31
00:02:17,360 --> 00:02:20,360
right hand side of a production on top of the stack.

32
00:02:20,360 --> 00:02:24,860
To repeat that, even if the right hand side of some production is sitting right there

33
00:02:24,860 --> 00:02:28,240
on top of the stack, it might be a mistake to do a reduction.

34
00:02:28,240 --> 00:02:31,880
We might want to wait and do our reduction someplace else.

35
00:02:31,880 --> 00:02:36,600
And the idea about how we decide is that we only want to reduce if the result can still

36
00:02:36,600 --> 00:02:38,360
be reduced to the start symbol.

37
00:02:38,360 --> 00:02:42,440
So let's take a look at a right most derivation.

38
00:02:42,440 --> 00:02:46,920
So beginning with the start symbol, we get to some state after some number of steps.

39
00:02:46,919 --> 00:02:49,399
Remember that means just an arbitrary number of steps.

40
00:02:49,399 --> 00:02:50,919
We get to some state.

41
00:02:50,919 --> 00:02:56,519
X is the right most non-terminal, and then the next step is to replace X by the right hand

42
00:02:56,519 --> 00:02:58,000
side of some production.

43
00:02:58,000 --> 00:03:03,479
And remember, again, with bottom-up parsing, the parser is actually going in this direction.

44
00:03:03,479 --> 00:03:06,279
So this is the reduction direction.

45
00:03:06,279 --> 00:03:11,839
And we talk about the derivation direction, the production direction, because that's

46
00:03:11,839 --> 00:03:14,719
the easiest way to talk about what strings are derived.

47
00:03:14,719 --> 00:03:20,120
We want to begin with the start symbol, but the parser is actually going against the flow

48
00:03:20,120 --> 00:03:21,199
of these arrows.

49
00:03:21,199 --> 00:03:28,120
Anyway, if this is a right most derivation, then we say that alpha beta is a handle of alpha

50
00:03:28,120 --> 00:03:29,599
beta omega.

51
00:03:29,599 --> 00:03:35,639
And that just means that yes, it would be okay in this situation to reduce beta to X.

52
00:03:35,639 --> 00:03:39,879
That we could replace beta by X because it's not a mistake.

53
00:03:39,879 --> 00:03:49,079
We can still, by some sequence of moves, get back to the start symbol by doing more reductions.

54
00:03:49,079 --> 00:03:54,159
So handles formalize the intuition about where it is okay to do a reduction.

55
00:03:54,159 --> 00:03:59,120
A handle is just a reduction that also allows further reductions back to the start symbol.

56
00:03:59,120 --> 00:04:03,319
And we clearly only want to do reduction at reductions in handles.

57
00:04:03,319 --> 00:04:08,000
If we do a reduction at a place that is not a handle, even though it looks like it's

58
00:04:08,000 --> 00:04:12,080
the right hand side or may actually be the right hand side of some production, that

59
00:04:12,080 --> 00:04:14,400
doesn't mean that it's actually a handle.

60
00:04:14,400 --> 00:04:17,319
And if we reduce there, we may get stuck.

61
00:04:17,319 --> 00:04:20,240
So all we said so far is what a handle is.

62
00:04:20,240 --> 00:04:23,079
We've defined a handle.

63
00:04:23,079 --> 00:04:25,800
We haven't said anything about how to find the handles.

64
00:04:25,800 --> 00:04:31,079
And actually, how we find the handles is going to consume much of the rest of our discussion

65
00:04:31,079 --> 00:04:31,680
of parsing.

