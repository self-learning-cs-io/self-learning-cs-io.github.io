---
title: CS143 P50Week408 06 Slr Parsing Example
---

1
00:00:00,000 --> 00:00:04,000
Welcome back.

2
00:00:04,000 --> 00:00:10,000
In this video, we're going to do an extended example of SLR parsing.

3
00:00:10,000 --> 00:00:16,000
To review, here's the parsing automaton for the grammar that we've been looking at in the last couple of videos.

4
00:00:16,000 --> 00:00:22,000
And this is just the deterministic version of the 90 deterministic automaton we built last time.

5
00:00:22,000 --> 00:00:26,000
And I've just gone through and numbered all of the states.

6
00:00:26,000 --> 00:00:30,000
So let's take a look at what happens when we parse the input int times int.

7
00:00:30,000 --> 00:00:36,000
And just to review, we've appended $ sign here to the end to indicate where the end of the input occurs.

8
00:00:36,000 --> 00:00:38,000
It's just an end of input marker.

9
00:00:38,000 --> 00:00:42,000
And because this is the beginning of the parse, we haven't seen any input yet.

10
00:00:42,000 --> 00:00:48,000
And so the vertical bar is all the way at the left hand side of the input.

11
00:00:48,000 --> 00:00:51,000
So the machine begins in state one.

12
00:00:51,000 --> 00:00:55,000
And there's nothing on the stack. The vertical bar is all the way at the left again.

13
00:00:55,000 --> 00:00:59,000
And so the stack is empty. So it just terminates in state one.

14
00:00:59,000 --> 00:01:05,000
And these are the possible items that are valid for the initial state of the parser.

15
00:01:05,000 --> 00:01:13,000
So among those items, we see that there are two that tell us that it's okay to shift an integer in this state.

16
00:01:13,000 --> 00:01:15,000
And of course, the first input is an integer.

17
00:01:15,000 --> 00:01:19,000
And so there are no reduced moves. All the other items in here also have their dots all the way at the left hand side.

18
00:01:19,000 --> 00:01:21,000
So there's no possible reduced move in this state.

19
00:01:21,000 --> 00:01:23,000
The only thing we could possibly do is shift.

20
00:01:23,000 --> 00:01:27,000
And it's okay to shift an integer.

21
00:01:27,000 --> 00:01:33,000
So to summarize, on the initial configuration of the parser, the DFA holds in state one.

22
00:01:33,000 --> 00:01:35,000
It never even gets out of state one.

23
00:01:35,000 --> 00:01:39,000
It starts there and ends there without reading any input because the stack is empty.

24
00:01:39,000 --> 00:01:43,000
And the action that that state tells us to do is to shift.

25
00:01:43,000 --> 00:01:45,000
So that leaves us in the following state.

26
00:01:45,000 --> 00:01:55,000
There's an int on the stack. And we have a times it coming up in the input.

27
00:01:55,000 --> 00:01:57,000
So what happens in that situation?

28
00:01:57,000 --> 00:01:59,000
Well, we begin. The atomic time is going to read the stack.

29
00:01:59,000 --> 00:02:03,000
So starting from the bottom of the stack, we're in the start state.

30
00:02:03,000 --> 00:02:05,000
And then we read an int.

31
00:02:05,000 --> 00:02:08,000
There's an int on the stack and we wind up in this state.

32
00:02:08,000 --> 00:02:11,000
And what does this state tell us we can do?

33
00:02:11,000 --> 00:02:15,000
Well, it tells us one possibility is to reduce by T goes to int.

34
00:02:15,000 --> 00:02:21,000
But again, we will only do that if the following input is in the follow of T.

35
00:02:21,000 --> 00:02:25,000
And times, which is the next input item, is not in the follow of T.

36
00:02:25,000 --> 00:02:30,000
So times is not in the follow of T.

37
00:02:30,000 --> 00:02:33,000
And so reducing here is not a possibility.

38
00:02:33,000 --> 00:02:36,000
That leaves only the other item to consider.

39
00:02:36,000 --> 00:02:39,000
And here we see that this item says we can shift a time.

40
00:02:39,000 --> 00:02:44,000
So if times is the next thing in the input, which it is, it's okay to shift.

41
00:02:44,000 --> 00:02:46,000
So the DFA holds in state three.

42
00:02:46,000 --> 00:02:50,000
And because there's a times in the input, the move is to shift.

43
00:02:50,000 --> 00:02:54,000
And that puts us into this configuration where we have int and times on the stack.

44
00:02:54,000 --> 00:02:57,000
Times is at the top of the stack, int is below it.

45
00:02:57,000 --> 00:03:01,000
And we have an int coming up in the input.

46
00:03:01,000 --> 00:03:05,000
So what happens now? Again, the DFA is going to read the entire stack.

47
00:03:06,000 --> 00:03:10,000
So beginning at the bottom of the stack, the first thing it sees is an int, moves to that state.

48
00:03:10,000 --> 00:03:12,000
And then it sees a times.

49
00:03:12,000 --> 00:03:14,000
And so it moves to this state.

50
00:03:14,000 --> 00:03:18,000
And now, in this particular state, what are the possibilities?

51
00:03:18,000 --> 00:03:23,000
Well, we can see, first of all, that there are no reduced moves.

52
00:03:23,000 --> 00:03:27,000
There are no items with the dot all the way at the right end.

53
00:03:27,000 --> 00:03:29,000
So the only possibility is a shift.

54
00:03:29,000 --> 00:03:34,000
And we could shift if the upcoming input is an open parent, which it's not.

55
00:03:34,000 --> 00:03:41,000
More usefully, we could shift if the upcoming input is an int, which is exactly what we see.

56
00:03:41,000 --> 00:03:46,000
So the DFA terminates in state 11 and the move in that state is to shift.

57
00:03:46,000 --> 00:03:50,000
And that puts us into this state where we have int times int on the stack.

58
00:03:50,000 --> 00:03:55,000
And we are out of input. We are at the end of the input.

59
00:03:55,000 --> 00:03:58,000
So let's see what happens on the stack int times int.

60
00:03:58,000 --> 00:04:03,000
The time of time reads it int times int.

61
00:04:03,000 --> 00:04:06,000
It winds up back in state three.

62
00:04:06,000 --> 00:04:12,000
And state three tells us that we can shift if the next input item is a times, which it is not.

63
00:04:12,000 --> 00:04:18,000
Or we can reduce if whatever is in next input is in the follow of T.

64
00:04:18,000 --> 00:04:22,000
And in fact, dollar is in the follow of T.

65
00:04:22,000 --> 00:04:25,000
So the end of the input can come after a T on the stack.

66
00:04:25,000 --> 00:04:31,000
And that means it's fine to reduce by T goes to int.

67
00:04:31,000 --> 00:04:38,000
So once we do that, once we do the reduction, T goes to int, we wind up in the state int times T.

68
00:04:38,000 --> 00:04:42,000
That's our stack contents and of course we're still at the end of the input.

69
00:04:42,000 --> 00:04:47,000
So once again, the DFA is going to read the entire stack contents from the bottom to the top.

70
00:04:47,000 --> 00:04:51,000
First it reads the int at the bottom of the stack, then it sees the times.

71
00:04:51,000 --> 00:04:57,000
And then finally it reads the T at the top of the stack and it winds up in a new state, state four.

72
00:04:57,000 --> 00:05:05,000
And the interesting thing about this particular step is that the DFA took a different path through the state graph than it did the previous time.

73
00:05:05,000 --> 00:05:08,000
And that's because the stack contents changed.

74
00:05:08,000 --> 00:05:10,000
We didn't just add stuff to the stack.

75
00:05:10,000 --> 00:05:12,000
And so we didn't extend the previous path.

76
00:05:12,000 --> 00:05:16,000
We actually replaced some symbols or a symbol on the stack with a new symbol.

77
00:05:16,000 --> 00:05:20,000
In this case, the non-terminal T. And I caused the DFA to take a different path.

78
00:05:20,000 --> 00:05:24,000
Now what does this item in state four tell us to do?

79
00:05:24,000 --> 00:05:31,000
Well, it says that we can reduce by T goes to int times T if whatever follows in the input is in the follow of T.

80
00:05:31,000 --> 00:05:34,000
And once again, dollar is in the follow of T.

81
00:05:34,000 --> 00:05:36,000
And so we'll do that reduction.

82
00:05:36,000 --> 00:05:40,000
And now we're left with the stack contents just consisting of T.

83
00:05:40,000 --> 00:05:42,000
And of course we're still at the end of the input.

84
00:05:42,000 --> 00:05:44,000
And let's see what happens now.

85
00:05:44,000 --> 00:05:48,000
So now of course the contents of the stack has changed even more radically.

86
00:05:48,000 --> 00:05:51,000
And so the DFA just goes off in a completely different direction.

87
00:05:51,000 --> 00:05:54,000
And so the DFA reads T winds up in this state.

88
00:05:54,000 --> 00:05:57,000
And this state says we can either shift a plus if there's a plus in the input.

89
00:05:57,000 --> 00:06:00,000
And again, there's no more input.

90
00:06:00,000 --> 00:06:07,000
Or we can reduce by e goes to T if dollar if the end of the input is in the follow of E, which it is.

91
00:06:07,000 --> 00:06:10,000
And so the reduction will be the one that we do.

92
00:06:10,000 --> 00:06:15,000
And now we have this stack contents consisting only of E.

93
00:06:15,000 --> 00:06:17,000
Let's see what happens in that situation.

94
00:06:17,000 --> 00:06:19,000
To this state, state two.

95
00:06:19,000 --> 00:06:23,000
And we only have one item as prime goes to E dot.

96
00:06:23,000 --> 00:06:25,000
And so this is a reduced move.

97
00:06:25,000 --> 00:06:29,000
And again, dollar is in the follow of S prime because that is the start symbol.

98
00:06:29,000 --> 00:06:32,000
And since that is the start symbol, we accept at this point.

99
00:06:32,000 --> 00:06:40,000
So once we get to that item is our reduced move, we know that the input has been successfully parsed.

