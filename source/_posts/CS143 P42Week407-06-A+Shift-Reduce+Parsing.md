---
title: CS143 P42Week407 06 A+Shift Reduce+Parsing
---

1
00:00:00,000 --> 00:00:07,919
In this video, we're going to continue our discussion of bottom-up parsing with the main strategy

2
00:00:07,919 --> 00:00:12,359
used by all bottom-up parsers, so-called shift-reduced parsing.

3
00:00:12,359 --> 00:00:19,900
Here's a quick review of the most important thing that we learned last time, that a bottom-up

4
00:00:19,900 --> 00:00:23,600
parser traces a right-most derivation in reverse.

5
00:00:23,600 --> 00:00:28,039
Now, this particular fact has an important consequence.

6
00:00:28,039 --> 00:00:33,799
So let's think about a state of a shift-reduced parser where we have some strings alpha, beta,

7
00:00:33,799 --> 00:00:34,799
and omega.

8
00:00:34,799 --> 00:00:39,960
And let's assume that the next reduction is going to be to replace beta by x.

9
00:00:39,960 --> 00:00:43,879
Okay, so remember we're running productions backwards.

10
00:00:43,879 --> 00:00:48,200
Then I claim that omega has to be a string of terminals.

11
00:00:48,200 --> 00:00:49,200
And why is that?

12
00:00:49,200 --> 00:00:53,759
Well, if you think about it, if this is a right-most derivation in reverse, then when x is

13
00:00:53,759 --> 00:00:58,599
replaced, when we take this, if we look at the forward step instead of the backward steps,

14
00:00:58,599 --> 00:01:02,359
remember the parser is running this way, replacing beta by x.

15
00:01:02,359 --> 00:01:06,560
But if we think about the right-most derivation in the other direction, then x has to be the

16
00:01:06,560 --> 00:01:12,120
right-most non-terminal, which means there are no non-terminals to the right of x.

17
00:01:12,120 --> 00:01:18,439
And so all the characters, all the tokens or whatever it is in this string have to be terminal

18
00:01:18,439 --> 00:01:20,959
symbols.

19
00:01:20,959 --> 00:01:26,119
Now it turns out that those terminal symbols to the right of the right-most non-terminal

20
00:01:26,119 --> 00:01:30,919
are exactly the unexamined input in bottom-up parser implementations.

21
00:01:30,919 --> 00:01:40,159
That is, if I have alpha x omega and x is my right-most non-terminal, then this is the

22
00:01:40,159 --> 00:01:41,519
input that we haven't read yet.

23
00:01:41,519 --> 00:01:43,759
This is unexamined input.

24
00:01:43,759 --> 00:01:50,759
And it's going to be useful to mark where we are in the parse, where our input focus is.

25
00:01:50,760 --> 00:01:52,880
And we are going to do that by using a vertical bar.

26
00:01:52,880 --> 00:01:58,000
So we are going to just drop a vertical bar between the place where we have read everything

27
00:01:58,000 --> 00:01:59,000
to the left.

28
00:01:59,000 --> 00:02:00,400
And we have actually been working on this.

29
00:02:00,400 --> 00:02:03,800
So this stuff to the left here can be terminals and non-terminals.

30
00:02:03,800 --> 00:02:06,240
And the parser is seen all of that stuff.

31
00:02:06,240 --> 00:02:09,280
And the stuff to the right is stuff that the parser hasn't seen yet.

32
00:02:09,280 --> 00:02:13,319
We don't know what's out there, although we do know it's all terminal symbols.

33
00:02:13,319 --> 00:02:20,000
And the vertical bar is just going to mark the dividing line between the two substrings.

34
00:02:20,000 --> 00:02:24,719
To implement bottom-up parsing, it turns out we only need two kinds of actions.

35
00:02:24,719 --> 00:02:27,000
Shift moves and reduce moves.

36
00:02:27,000 --> 00:02:29,439
And we've already talked somewhat about reduce moves.

37
00:02:29,439 --> 00:02:31,560
And so we have introduced shift moves.

38
00:02:31,560 --> 00:02:33,199
So let's do that now.

39
00:02:33,199 --> 00:02:36,759
So a shift move reads one token of input.

40
00:02:36,759 --> 00:02:38,159
And we can explain that.

41
00:02:38,159 --> 00:02:41,800
I represent that by moving the vertical bar one token to the right.

42
00:02:41,800 --> 00:02:46,599
So if our input focus is here and we want to read one more token of input, then we just

43
00:02:46,599 --> 00:02:48,000
move the vertical bar over.

44
00:02:48,000 --> 00:02:53,199
This signifies that now the parser knows about that next terminal symbol.

45
00:02:53,199 --> 00:02:54,800
And now it can start working on it.

46
00:02:54,800 --> 00:02:58,800
It can do things with it and match against it for the purposes of performing reductions.

47
00:02:58,800 --> 00:03:05,400
Again, the stuff out here to the right of the vertical bar, the parser hasn't seen yet.

48
00:03:05,400 --> 00:03:11,199
And then a reduce move is to apply an inverse production at the right end of the left-hand

49
00:03:11,199 --> 00:03:12,199
string.

50
00:03:12,199 --> 00:03:17,639
So if we have a production, a goes to x, y, and we have x and y here immediately to the

51
00:03:17,639 --> 00:03:19,119
left of the vertical bar.

52
00:03:19,119 --> 00:03:21,439
So this is our focus point.

53
00:03:21,439 --> 00:03:26,239
And x and y, the right-hand side of the production is right there, then we can do a reduction.

54
00:03:26,239 --> 00:03:29,599
We can replace that right-hand side by the left-hand side.

55
00:03:29,599 --> 00:03:34,679
And this is a reduce move.

56
00:03:34,679 --> 00:03:36,719
Here is the example from the last video.

57
00:03:36,719 --> 00:03:39,959
And this is exactly the example just showing the reduce moves.

58
00:03:39,960 --> 00:03:42,719
Now with the vertical bar also shown.

59
00:03:42,719 --> 00:03:47,640
So this shows where the input focus was at the point where each of the reductions was

60
00:03:47,640 --> 00:03:48,640
performed.

61
00:03:48,640 --> 00:03:52,480
And what's missing, of course, now we know is the sequence of shift moves.

62
00:03:52,480 --> 00:03:58,840
So here is the sequence of shift moves and reduce moves that take the initial input string

63
00:03:58,840 --> 00:04:00,960
to the start symbol.

64
00:04:00,960 --> 00:04:04,000
So let's walk through this in more detail.

65
00:04:04,000 --> 00:04:09,760
So we're going to go step by step and we're going to show each shift and each reduce move.

66
00:04:09,759 --> 00:04:17,360
And now in addition to our input string down here, we also have a pointer showing where

67
00:04:17,360 --> 00:04:18,360
the input we are.

68
00:04:18,360 --> 00:04:22,439
So initially we haven't seen any of the input and our input pointer is to the left of

69
00:04:22,439 --> 00:04:23,959
the entire string.

70
00:04:23,959 --> 00:04:27,120
So the first move is to do a shift.

71
00:04:27,120 --> 00:04:30,680
And then we do another shift and then we do another shift.

72
00:04:30,680 --> 00:04:36,319
And now just looking at the example from before, if you look back at that example, you know

73
00:04:36,319 --> 00:04:38,159
the next thing we need to do is a reduce.

74
00:04:38,160 --> 00:04:42,160
And remember, we're only allowed to reduce to the left of the arrow.

75
00:04:42,160 --> 00:04:45,160
So we can only reduce over on this side of the arrow.

76
00:04:45,160 --> 00:04:52,440
So we always have to have read enough of the input before we can perform a reduce move.

77
00:04:52,440 --> 00:04:55,680
And then we perform another reduce move.

78
00:04:55,680 --> 00:04:58,960
And then it turns out the next thing to do is to shift moves.

79
00:04:58,960 --> 00:05:01,360
And we haven't explained yet how we know whether to shift or reduce.

80
00:05:01,360 --> 00:05:02,360
We're going to get there.

81
00:05:02,360 --> 00:05:07,640
I'm just showing that there exists a sequence of shift and reduce moves that succeed in parsing

82
00:05:07,639 --> 00:05:09,199
this example.

83
00:05:09,199 --> 00:05:12,519
Now we've shifted the entire input onto this.

84
00:05:12,519 --> 00:05:15,879
We've shifted over the entire input.

85
00:05:15,879 --> 00:05:18,079
So there's no more input to read.

86
00:05:18,079 --> 00:05:19,800
And now all we can do is reduce moves.

87
00:05:19,800 --> 00:05:25,079
But fortunately there is a sequence of reduce moves from this point that we can perform.

88
00:05:25,079 --> 00:05:31,800
So here we reduce int and then we reduce T plus T.

89
00:05:31,800 --> 00:05:32,800
Oh, forgot.

90
00:05:32,800 --> 00:05:34,079
We first reduce T to E.

91
00:05:34,079 --> 00:05:38,079
And then we reduce T plus E back to the start symbol.

