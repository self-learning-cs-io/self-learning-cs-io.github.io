---
title: CS143 P30Week306 03 Recursive Descent Parsing
---

1
00:00:00,000 --> 00:00:12,939
In this video, we're going to talk about our first parsing algorithm, recursive descent parsing.

2
00:00:12,939 --> 00:00:18,059
So recursive descent is what is called a top down parsing algorithm.

3
00:00:18,059 --> 00:00:21,699
And you might suspect that there are also bottom up parsing algorithms and there are indeed

4
00:00:21,699 --> 00:00:24,339
such things and we'll be talking about them later.

5
00:00:24,339 --> 00:00:28,699
But in a top down parsing algorithm, the parse tree is constructed from the top.

6
00:00:28,699 --> 00:00:32,939
So starting with the root node and from left to right.

7
00:00:32,939 --> 00:00:38,340
And so the terminals then will be seen in the order that they appear in the token stream.

8
00:00:38,340 --> 00:00:43,780
So for example, if I have this token stream here, this is a hypothetical parse tree that

9
00:00:43,780 --> 00:00:49,340
I could construct and the numbers here correspond to the order in which the nodes of this parse

10
00:00:49,340 --> 00:00:50,340
tree are constructed.

11
00:00:50,340 --> 00:00:52,100
So we have to begin with the roots.

12
00:00:52,100 --> 00:00:53,939
That's the first thing that happens.

13
00:00:53,939 --> 00:00:59,500
And then if t2 is belongs here in the parse tree, that will be the next thing that happens.

14
00:00:59,500 --> 00:01:04,859
But then if we have a non-terminal in the next position, that will be number three.

15
00:01:04,859 --> 00:01:08,819
And then if that has children, while the leftmost one, because we're going left to right, will

16
00:01:08,819 --> 00:01:10,780
be the fourth thing to be generated.

17
00:01:10,780 --> 00:01:14,180
And then let's say that the two children of number four are both terminals.

18
00:01:14,180 --> 00:01:16,939
So that will be the next two terminals in the input.

19
00:01:16,939 --> 00:01:17,939
And so on.

20
00:01:17,939 --> 00:01:20,939
The next thing will happen is the second child of number three.

21
00:01:20,939 --> 00:01:27,060
And then the last two terminals appearing in left to right order.

22
00:01:27,060 --> 00:01:31,299
So let's consider this grammar for integer expressions.

23
00:01:31,299 --> 00:01:36,259
And let's look at a particular input, a very simple one, just open per end five, close

24
00:01:36,259 --> 00:01:38,539
per end.

25
00:01:38,539 --> 00:01:42,259
And now what we're going to do is we're going to parse this using a recursive descent strategy.

26
00:01:42,259 --> 00:01:45,539
I'm not going to actually show you any pseudo code or anything like that.

27
00:01:45,540 --> 00:01:51,900
I'm just going to walk through how this input string would be parsed by using this grammar

28
00:01:51,900 --> 00:01:54,700
and the recursive descent algorithm.

29
00:01:54,700 --> 00:01:59,340
And the basic idea is that we begin with a non-terminal, we begin with the root node,

30
00:01:59,340 --> 00:02:02,900
and we always try the rules for a non-terminal in order.

31
00:02:02,900 --> 00:02:06,020
So we will begin by starting with egos to t.

32
00:02:06,020 --> 00:02:09,620
And if that doesn't work, we'll try egos to t plus e.

33
00:02:09,620 --> 00:02:12,700
So this is going to be a top-down algorithm beginning at the root.

34
00:02:12,699 --> 00:02:17,579
We're going to work from left to right, we try the productions in order, and when the

35
00:02:17,579 --> 00:02:24,139
productions fail, we may have to do some backtracking in order to try alternative productions.

36
00:02:24,139 --> 00:02:25,379
There are three parts.

37
00:02:25,379 --> 00:02:27,579
There's the grammar that we're using.

38
00:02:27,579 --> 00:02:31,620
There's the parse tree that we're building, and initially that's just the root of the parse

39
00:02:31,620 --> 00:02:32,620
tree e.

40
00:02:32,620 --> 00:02:35,899
And finally, there's the input that we're processing.

41
00:02:35,899 --> 00:02:37,699
And we'll indicate our position in the input.

42
00:02:37,699 --> 00:02:40,939
How much of the input we have read by this big fat red arrow?

43
00:02:40,939 --> 00:02:45,979
And it always points to the next terminal symbol to be red, the next token to be red.

44
00:02:45,979 --> 00:02:50,900
So in this case, we're starting with an open parent.

45
00:02:50,900 --> 00:02:55,060
And also in the grammar, you can see the highlighting here, the brighter red color indicates

46
00:02:55,060 --> 00:02:57,060
which production we're going to try.

47
00:02:57,060 --> 00:03:02,419
So we're going to begin to build our parse tree by trying to production egos to t.

48
00:03:02,419 --> 00:03:03,539
And what does that mean?

49
00:03:03,539 --> 00:03:09,139
Well, that means we make t the child of e, and then we can check whether we're making

50
00:03:09,139 --> 00:03:10,139
progress.

51
00:03:10,979 --> 00:03:16,099
So observe that as long as we're generating non-terminals, we don't really know whether

52
00:03:16,099 --> 00:03:18,979
we're on the right track or not.

53
00:03:18,979 --> 00:03:23,739
We have no way to check whether the non-terminals that we're generating are going to produce

54
00:03:23,739 --> 00:03:25,339
the input string.

55
00:03:25,339 --> 00:03:30,419
But once we generate a terminal symbol, then we can compare that with the next input

56
00:03:30,419 --> 00:03:33,019
token to see if they're the same.

57
00:03:33,019 --> 00:03:35,259
And in this case, unfortunately, they're not.

58
00:03:35,259 --> 00:03:40,099
So the int that we generated here doesn't match the open parent and the input.

59
00:03:40,099 --> 00:03:46,019
And so clearly, this parsing strategy or this parse tree that we're building isn't going

60
00:03:46,019 --> 00:03:47,019
to work out.

61
00:03:47,019 --> 00:03:49,739
So what we're going to have to do is we're going to have to backtrack.

62
00:03:49,739 --> 00:03:53,939
That means we're going to undo one or more of our decisions.

63
00:03:53,939 --> 00:03:57,180
We're going to go back to our last decision point and see if there's another alternative

64
00:03:57,180 --> 00:03:58,180
to try.

65
00:03:58,180 --> 00:03:59,859
So what was the last decision we made?

66
00:03:59,859 --> 00:04:02,459
Well, we decided to use t goes to int.

67
00:04:02,460 --> 00:04:07,500
So we can undo that and then we can try the next production for t.

68
00:04:07,500 --> 00:04:10,180
And that happens to be t goes to int times t.

69
00:04:10,180 --> 00:04:13,740
So we'll expand t using that production.

70
00:04:13,740 --> 00:04:18,819
And now once again, we've generated a terminal in the leftmost position.

71
00:04:18,819 --> 00:04:21,220
And so now we're able to compare that with the input.

72
00:04:21,220 --> 00:04:26,660
And once again, unfortunately, the int token does not match the open parent.

73
00:04:26,660 --> 00:04:27,939
So we have to backtrack again.

74
00:04:27,939 --> 00:04:30,900
So we undo that decision.

75
00:04:30,899 --> 00:04:34,659
This takes us back to a trying alternative for t.

76
00:04:34,659 --> 00:04:36,859
There's one more possibility.

77
00:04:36,859 --> 00:04:39,500
And that's a t goes to open parent e closed parent.

78
00:04:39,500 --> 00:04:43,659
So we expand t using that production.

79
00:04:43,659 --> 00:04:51,299
And now we can compare the token open parent with this open parent with the open parent

80
00:04:51,299 --> 00:04:53,699
and the input and they match.

81
00:04:53,699 --> 00:04:55,099
And so that's good.

82
00:04:55,099 --> 00:04:58,060
That means that where we might be on the right track.

83
00:04:58,060 --> 00:05:04,180
And since they match, anything that we do in the future is going to have to match the

84
00:05:04,180 --> 00:05:05,339
different input.

85
00:05:05,339 --> 00:05:08,100
And so we'll advance the input pointer.

86
00:05:08,100 --> 00:05:10,500
So now what are we going to work on next?

87
00:05:10,500 --> 00:05:14,100
Well, we have to expand this non-terminal e.

88
00:05:14,100 --> 00:05:15,620
And we're going to do the same thing we did before.

89
00:05:15,620 --> 00:05:19,579
We're just going to start with the first production.

90
00:05:19,579 --> 00:05:22,420
So we have e goes to t.

91
00:05:22,420 --> 00:05:24,180
And then we have to work on t.

92
00:05:24,180 --> 00:05:26,420
So we're going to pick the first production for t.

93
00:05:26,420 --> 00:05:27,620
And we have t goes to int.

94
00:05:27,620 --> 00:05:32,340
And now we can compare it is int matching int in the input.

95
00:05:32,340 --> 00:05:33,340
And indeed it does.

96
00:05:33,340 --> 00:05:36,540
And so we advance the input pointer again.

97
00:05:36,540 --> 00:05:37,540
And now we're here.

98
00:05:37,540 --> 00:05:38,540
And what's left?

99
00:05:38,540 --> 00:05:40,300
Well, we've progressed to this point.

100
00:05:40,300 --> 00:05:42,620
We're looking at that open parent.

101
00:05:42,620 --> 00:05:44,220
And that also matches.

102
00:05:44,220 --> 00:05:45,540
So that matches the input.

103
00:05:45,540 --> 00:05:49,259
And now we've matched everything in the parse tree.

104
00:05:49,259 --> 00:05:51,939
And our input pointer is at the end of the string.

105
00:05:51,939 --> 00:05:55,139
And so this is actually a successful parse

106
00:05:55,139 --> 00:06:00,019
of the input string.

107
00:06:00,019 --> 00:06:02,019
And so that means that we accept.

108
00:06:02,019 --> 00:06:04,620
And the parser terminates successfully.

