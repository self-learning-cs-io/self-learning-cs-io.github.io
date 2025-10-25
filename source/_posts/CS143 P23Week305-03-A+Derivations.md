---
title: CS143 P23Week305 03 A+Derivations
---

1
00:00:00,000 --> 00:00:14,080
In this video, we're going to continue our discussion of parsing with the idea of a derivation.

2
00:00:14,080 --> 00:00:16,480
So a derivation is a sequence of productions.

3
00:00:16,480 --> 00:00:22,120
So beginning with the start symbol, we can apply productions one at a time in sequence and

4
00:00:22,120 --> 00:00:24,560
that produces a derivation.

5
00:00:24,560 --> 00:00:29,960
And a derivation can be drawn in a different way instead of as a linear sequence of replacement

6
00:00:29,960 --> 00:00:32,200
sequence, we can draw it as a tree.

7
00:00:32,200 --> 00:00:37,679
So for example, if I have a non-terminal x that appears in a derivation, then when I

8
00:00:37,679 --> 00:00:45,859
replace x, I can represent that by making the children of x the left hand side of the

9
00:00:45,859 --> 00:00:48,320
rule that I use to replace x.

10
00:00:48,320 --> 00:00:56,159
So when I apply the production x goes to y1 to yn, I add the y1 to yn as children of x

11
00:00:56,159 --> 00:00:59,920
in the tree that I'm building up.

12
00:00:59,920 --> 00:01:01,440
Let's do an example.

13
00:01:01,440 --> 00:01:05,000
Here's our simple grammar of arithmetic expressions.

14
00:01:05,000 --> 00:01:09,320
And let's consider this particular string, id times id plus id.

15
00:01:09,320 --> 00:01:13,439
So what we're going to do now is we're going to parse this string and we're going to show

16
00:01:13,439 --> 00:01:23,040
how to produce a derivation for the string and also at the same time build a tree.

17
00:01:23,040 --> 00:01:24,040
And here it is.

18
00:01:24,040 --> 00:01:29,880
Here there is a derivation beginning at e and ending in the string that we're interested

19
00:01:29,880 --> 00:01:33,640
in with one production applied each step along the way.

20
00:01:33,640 --> 00:01:36,000
And here is the corresponding tree.

21
00:01:36,000 --> 00:01:40,800
And this is called a parse tree.

22
00:01:40,800 --> 00:01:48,120
This is a parse tree of this expression or of this input string.

23
00:01:48,120 --> 00:01:50,680
So let's walk through this derivation in detail.

24
00:01:50,680 --> 00:01:54,760
On the right side in red, we're going to have the tree that we're building up.

25
00:01:54,760 --> 00:01:59,040
And on the left side in blue, we're going to have the steps in the derivation that we've

26
00:01:59,040 --> 00:02:00,280
taken so far.

27
00:02:00,280 --> 00:02:05,040
So initially our derivation consists of just the start symbol e and our tree consists

28
00:02:05,040 --> 00:02:09,319
of just the root which is also the start symbol.

29
00:02:09,319 --> 00:02:14,240
So the first step is that we have a production e goes to e plus e.

30
00:02:14,240 --> 00:02:19,319
And what that means is over in the tree we take the root of the tree and we give it three

31
00:02:19,319 --> 00:02:24,639
children e plus and e.

32
00:02:24,639 --> 00:02:29,799
So now we replace the first e by e times e.

33
00:02:29,799 --> 00:02:32,919
We use the production e goes to e times e.

34
00:02:32,919 --> 00:02:37,919
And that means we take the first e in the tree and we give it the three children e times

35
00:02:37,919 --> 00:02:41,359
and e.

36
00:02:41,359 --> 00:02:47,240
Continuing along, we take the first e here and that remains in this expression and we replace

37
00:02:47,240 --> 00:02:55,680
it by id which means we make id a child of the leftmost e in the tree that we're building.

38
00:02:55,680 --> 00:03:00,560
And then we replace the second e by id using the production e goes to id and finally we do

39
00:03:00,560 --> 00:03:05,520
the same thing with the third e and now we have completed our parse tree.

40
00:03:05,520 --> 00:03:10,560
So here again from the start symbol to the string we were interested in parsing and in the

41
00:03:10,560 --> 00:03:14,640
process we built up this parse tree of the expression.

42
00:03:15,639 --> 00:03:19,639
Now there are a lot of interesting things to say about parse trees.

43
00:03:19,639 --> 00:03:24,759
So first of all, parse trees have terminals at the leaves and non terminals at the interior

44
00:03:24,759 --> 00:03:25,759
nodes.

45
00:03:25,759 --> 00:03:30,839
And furthermore, an in order traversal of the leaves is the original input.

46
00:03:30,839 --> 00:03:34,279
So let's back up and look at our example and confirm all of this.

47
00:03:34,279 --> 00:03:38,079
If we look at the leaves we can see that they're all terminals.

48
00:03:38,079 --> 00:03:40,079
Okay.

49
00:03:40,800 --> 00:03:43,280
And the interior nodes are all non terminals.

50
00:03:43,280 --> 00:03:45,320
In this case, we only have one non terminal in our language.

51
00:03:45,320 --> 00:03:50,960
All the interior nodes are e and the leaves are the terminals of the string.

52
00:03:50,960 --> 00:03:56,560
And then we can see that if we do an in order traversal of the leaves we get exactly this

53
00:03:56,560 --> 00:04:00,720
input string that we started with.

54
00:04:00,720 --> 00:04:05,760
Furthermore, the parse tree shows the association of the operations and the input string does not.

55
00:04:05,759 --> 00:04:09,819
So you may notice here that the way this parse tree is constructed the times binds more

56
00:04:09,819 --> 00:04:17,039
tightly than the plus because the times is a sub tree of the tree containing plus.

57
00:04:17,039 --> 00:04:21,240
And so this means that we would do the e times e first before we would add e.

58
00:04:21,240 --> 00:04:26,639
And so you may have wondered, well, how did I know to pick this parse tree?

59
00:04:26,639 --> 00:04:29,839
Because actually if you think about it there's another derivation.

60
00:04:29,839 --> 00:04:34,599
Actually there are several derivations that will give me a different parse tree where the

61
00:04:35,320 --> 00:04:39,760
times is towards the root and the plus is nested inside the times.

62
00:04:39,760 --> 00:04:42,800
So let's not worry about that for right now.

63
00:04:42,800 --> 00:04:47,120
And let's just say that somehow we knew that this was the parse tree we wanted and I gave

64
00:04:47,120 --> 00:04:51,720
you a derivation that produces that parse tree.

65
00:04:51,720 --> 00:04:55,680
Continuing on, the previous derivation I showed you is actually a very special derivation.

66
00:04:55,680 --> 00:05:01,360
It's what's called a leftmost derivation where at each step we replace the leftmost non terminal

67
00:05:01,360 --> 00:05:04,480
in our string of terminals and non terminals.

68
00:05:04,480 --> 00:05:09,000
And there's a natural and equivalent notion of a rightmost derivation and here it is.

69
00:05:09,000 --> 00:05:13,280
Here is a rightmost derivation for the same string.

70
00:05:13,280 --> 00:05:16,759
Again, beginning with the start symbol, ending with the string we're interested in.

71
00:05:16,759 --> 00:05:20,600
And notice that at each step we're replacing the rightmost non terminal.

72
00:05:20,600 --> 00:05:24,400
So here we replace the only non terminal e and we get e plus e.

73
00:05:24,400 --> 00:05:30,000
And then in the second step we replace the second non terminal e with id and so on for

74
00:05:30,000 --> 00:05:32,200
the rest of the string.

75
00:05:32,199 --> 00:05:36,399
So let's just illustrate this entirely with our little picture here of the tree and the

76
00:05:36,399 --> 00:05:37,399
derivation simultaneously.

77
00:05:37,399 --> 00:05:39,199
So once again over here is our tree.

78
00:05:39,199 --> 00:05:44,079
This is the root of the start symbol e and in blue is our derivation.

79
00:05:44,079 --> 00:05:46,319
So we begin by replacing e by e plus e.

80
00:05:46,319 --> 00:05:47,519
That's the only non terminal.

81
00:05:47,519 --> 00:05:49,240
So it's the rightmost one.

82
00:05:49,240 --> 00:05:55,120
And then working from the right side of the tree we replace the right e by id and then

83
00:05:55,120 --> 00:05:58,599
the left hand e gets replaced by e times e.

84
00:05:58,600 --> 00:06:03,700
And now the rightmost e that's replaced by id and finally the only e that remains

85
00:06:03,700 --> 00:06:08,920
and is also replaced by id.

86
00:06:08,920 --> 00:06:13,280
I want to point out that the rightmost and leftmost derivations I showed you have exactly

87
00:06:13,280 --> 00:06:15,640
the same parse tree.

88
00:06:15,640 --> 00:06:17,840
And this is not an accident.

89
00:06:17,840 --> 00:06:22,400
Every parse tree has a rightmost and a leftmost derivation.

90
00:06:22,400 --> 00:06:25,160
It's just about the order in which the branches are added.

91
00:06:25,160 --> 00:06:32,920
So for example, if I have the first production e goes to e plus e, now I have a choice on

92
00:06:32,920 --> 00:06:33,920
how to build my tree.

93
00:06:33,920 --> 00:06:39,160
I can either work on this subtree or I can work on that subtree.

94
00:06:39,160 --> 00:06:42,720
And if I build this one first that will be a rightmost derivation.

95
00:06:42,720 --> 00:06:45,920
If I continued to always work on the rightmost non terminal of course.

96
00:06:45,920 --> 00:06:50,120
And if I work on this one first I can use that to do a leftmost derivation.

97
00:06:50,120 --> 00:06:54,720
Now it's important also to realize that there are many derivations besides rightmost and

98
00:06:54,720 --> 00:06:55,720
leftmost.

99
00:06:55,720 --> 00:07:01,280
I could choose non terminals in some random order to do my replacements.

100
00:07:01,280 --> 00:07:05,360
But the rightmost and leftmost ones are the ones that we're most concerned with.

