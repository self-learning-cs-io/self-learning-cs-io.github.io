---
title: CS143 P40Week407 05 A+Bottom Up+Parsing
---

1
00:00:00,000 --> 00:00:13,500
This is the first of what will be a considerable sequence of videos on bottom-up parsing.

2
00:00:13,500 --> 00:00:17,780
The first thing to know is that bottom-up parsing is more general than deterministic top-down

3
00:00:17,780 --> 00:00:18,780
parsing.

4
00:00:18,780 --> 00:00:23,559
So recall, we talked about recursive descent, which is a completely general parsing algorithm

5
00:00:23,559 --> 00:00:26,080
but requires backtracking.

6
00:00:26,079 --> 00:00:30,399
And now we're focused on deterministic techniques, and we talked about LL1 or predictive

7
00:00:30,399 --> 00:00:35,399
parsing last time, and now we're going to shift gears and talk about bottom-up parsing.

8
00:00:35,399 --> 00:00:39,759
And it turns out that even though bottom-up parsing is more general, it's just as efficient,

9
00:00:39,759 --> 00:00:43,159
and it uses all of the ideas that we learned in top-down parsing.

10
00:00:43,159 --> 00:00:48,780
And in fact, bottom-up parsing is the preferred method that's used in most of the parser generator

11
00:00:48,780 --> 00:00:51,560
tools.

12
00:00:51,560 --> 00:00:55,560
So one good thing about bottom-up parsers is they don't need left-factored grammars, so

13
00:00:55,560 --> 00:00:58,920
we can revert to the natural grammar for our example.

14
00:00:58,920 --> 00:01:03,000
And natural here is in quotes because we still have to encode the precedence of plus

15
00:01:03,000 --> 00:01:04,000
and times.

16
00:01:04,000 --> 00:01:07,840
So bottom-up parsers aren't going to deal with ambiguous grammars.

17
00:01:07,840 --> 00:01:14,240
And let's just, as an example, consider how a bottom-up parser would work on the following

18
00:01:14,240 --> 00:01:18,840
typical input string.

19
00:01:18,840 --> 00:01:23,200
So the first things know about bottom-up parsing is that it reduces what we call reduces

20
00:01:23,200 --> 00:01:29,000
a string to the start symbol by inverting productions, by running productions backwards.

21
00:01:29,000 --> 00:01:30,760
So here's an example.

22
00:01:30,760 --> 00:01:37,320
On the left-hand side is the sequence of states of the string, and on the right-hand side

23
00:01:37,320 --> 00:01:39,599
are the productions that were used.

24
00:01:39,599 --> 00:01:44,760
And the thing to observe, let's just look at the very first step, is that we began with

25
00:01:44,760 --> 00:01:45,760
the entire string.

26
00:01:45,760 --> 00:01:50,760
We began with the string of terminals, and we picked some of those terminals, in this

27
00:01:50,760 --> 00:01:56,320
case just one, this particular int right here, and we ran a production backwards.

28
00:01:56,320 --> 00:01:59,600
We replaced the int here by the left side of the production.

29
00:01:59,600 --> 00:02:03,400
We began with, we matched the right side of the production int, and we replaced it by

30
00:02:03,400 --> 00:02:04,400
the left side.

31
00:02:04,400 --> 00:02:07,600
So int went backwards here to T.

32
00:02:07,600 --> 00:02:14,439
And then in the next step, we took int times T, this sub-string of the string that we're

33
00:02:14,439 --> 00:02:18,439
working on, and we replaced it by the left-hand side of this production.

34
00:02:18,439 --> 00:02:21,719
And int times T was replaced by T.

35
00:02:21,719 --> 00:02:27,680
And so on, at each step here, we're matching some portion of the string, and I'm underlining

36
00:02:27,680 --> 00:02:30,759
the portion that's being replaced at each step.

37
00:02:30,759 --> 00:02:35,400
And we're running, and that matches the right-hand side of some production, and then we're replacing

38
00:02:35,400 --> 00:02:37,759
that sub-string by the left-hand side.

39
00:02:37,759 --> 00:02:43,919
And finally, this entire string here is replaced by E. And we wind up at the start symbol.

40
00:02:43,919 --> 00:02:45,599
So we began with an input string.

41
00:02:45,599 --> 00:02:48,319
This is our input string up here.

42
00:02:48,319 --> 00:02:50,560
And we put string of tokens.

43
00:02:50,560 --> 00:02:57,120
And we end with the start symbol down here.

44
00:02:57,120 --> 00:03:01,879
And if you read the moves in this direction, if you start at the bottom and read towards

45
00:03:01,879 --> 00:03:06,879
the top, well, these are just productions.

46
00:03:06,879 --> 00:03:08,959
And in fact, this whole thing is a derivation.

47
00:03:08,959 --> 00:03:12,079
This is just a normal derivation going from bottom to top.

48
00:03:12,079 --> 00:03:15,560
But in this direction, when we run it backwards, beginning with a string towards the start

49
00:03:15,560 --> 00:03:21,560
symbol, we call these reductions.

50
00:03:21,560 --> 00:03:26,080
And I haven't told you exactly how we decided what reductions to do, and you might wonder,

51
00:03:26,080 --> 00:03:30,400
well, how did I know to do this particular sequence of reductions?

52
00:03:30,400 --> 00:03:35,319
Well, here's another interesting property of bottom-up parsing.

53
00:03:35,319 --> 00:03:40,360
So if you read the productions backwards, they trace a right-most derivation.

54
00:03:40,360 --> 00:03:44,840
So if we begin here with E, so we're going to remember, the parser is actually going in

55
00:03:44,920 --> 00:03:46,120
this direction.

56
00:03:46,120 --> 00:03:49,439
So this is the direction of parsing here.

57
00:03:49,439 --> 00:03:52,960
But now we're going to look at the steps the parser took in reverse, and we're going to

58
00:03:52,960 --> 00:03:56,280
see that it was, in fact, a right-most derivation.

59
00:03:56,280 --> 00:04:00,120
So here E went to T plus E. Well, E was the only non-terminal.

60
00:04:00,120 --> 00:04:02,199
But then E here is the one that's expanded.

61
00:04:02,199 --> 00:04:04,240
It's the right-most non-terminal.

62
00:04:04,240 --> 00:04:05,759
And then this T is expanded.

63
00:04:05,759 --> 00:04:08,159
It's also the right-most non-terminal to get int.

64
00:04:08,159 --> 00:04:10,280
And now this T is the right-most non-terminal.

65
00:04:10,280 --> 00:04:12,800
It's expanded to get int times T.

66
00:04:12,800 --> 00:04:15,280
And then this is the only and right-most non-terminal.

67
00:04:15,280 --> 00:04:19,920
And so we wind up with the whole input string int times int plus int.

68
00:04:19,920 --> 00:04:26,560
And this leads us to the first important fact about bottom-up parsing, which is that a

69
00:04:26,560 --> 00:04:32,000
bottom-up parser traces a right-most derivation in reverse.

70
00:04:32,000 --> 00:04:38,240
So if you're having trouble with bottom-up parsing, it's always helpful to go back to this

71
00:04:38,240 --> 00:04:39,240
basic fact.

72
00:04:39,240 --> 00:04:42,840
So bottom-up parser traces a right-most derivation.

73
00:04:42,840 --> 00:04:49,840
But it does so in reverse by using reductions instead of productions.

74
00:04:49,840 --> 00:04:53,040
So here's the series of reductions, again, shown on the left.

75
00:04:53,040 --> 00:04:58,360
And here is the parse tree that is constructed from those reductions.

76
00:04:58,360 --> 00:05:02,879
And this is actually, I think, a very helpful picture if we animate it to see the sequence

77
00:05:02,879 --> 00:05:06,040
of steps and to see what a bottom-up parser is really doing.

78
00:05:06,040 --> 00:05:09,200
So here we begin with the input string over here.

79
00:05:09,200 --> 00:05:12,000
And we show the same input string here.

80
00:05:12,000 --> 00:05:15,920
And now we're going to just walk through the sequence of steps that the bottom-up parser

81
00:05:15,920 --> 00:05:21,080
takes, a series of reductions, and show how it builds an entire parse tree.

82
00:05:21,080 --> 00:05:25,040
And the basic idea is that at each step we're performing a reduction.

83
00:05:25,040 --> 00:05:31,040
And remember, when we do a reduction, we replace the children of the right-hand side of some

84
00:05:31,040 --> 00:05:33,120
production by its left-hand side.

85
00:05:33,120 --> 00:05:37,600
And just like when we were doing top-down parsing, we would make the right-hand side, the children

86
00:05:37,600 --> 00:05:40,160
of the left-hand side, well, we'll do the same thing here.

87
00:05:40,160 --> 00:05:44,600
So here's the child in the input, and then we make T its parent.

88
00:05:44,600 --> 00:05:46,840
And now you can see what's going to happen.

89
00:05:46,840 --> 00:05:53,680
A top-down parser begins with the start symbol and produces the tree incrementally by expanding

90
00:05:53,680 --> 00:05:59,800
some non-terminal at the frontier, at a current leaf of the partially constructed parse

91
00:05:59,800 --> 00:06:00,920
tree.

92
00:06:00,920 --> 00:06:05,720
The bottom-up parser is going to begin with all the leaves of the eventual parse tree, the

93
00:06:05,720 --> 00:06:10,520
entire input, and it's going to build little trees on top of those.

94
00:06:10,520 --> 00:06:15,240
And it's going to be pasting together all of the subtrees that is put together so far

95
00:06:15,240 --> 00:06:16,640
to build the complete tree.

96
00:06:16,640 --> 00:06:20,240
Let's walk a few more steps and see how that happens.

97
00:06:20,240 --> 00:06:27,319
So in the next step, we go from int times T to T, and so int times, and the subtree rooted

98
00:06:27,319 --> 00:06:31,439
at the other T, become children of this non-terminal T.

99
00:06:31,439 --> 00:06:35,759
And you can see we've taken these three subtrees here and pasted them together into a larger

100
00:06:35,759 --> 00:06:36,759
tree.

101
00:06:36,759 --> 00:06:41,159
So as we go through the parse, bigger and bigger portions of the original input are going

102
00:06:41,159 --> 00:06:45,560
to be pasted together into larger and larger trees.

103
00:06:45,560 --> 00:06:52,759
And the next reduction takes the int at the far end of the input and reduces it to T,

104
00:06:52,759 --> 00:06:57,939
and that gets reduced to E, and then at the very end, the three remaining subtrees are

105
00:06:57,939 --> 00:07:03,699
all pasted together into one parse tree for the whole thing with the start symbol as the

106
00:07:03,699 --> 00:07:04,039
root.

