---
title: CS143 P35Week407 01 A+Predictive+Parsing
---

1
00:00:00,000 --> 00:00:08,320
In this video, we're going to continue our discussion of top down parsing algorithms with

2
00:00:08,320 --> 00:00:15,080
another strategy called predictive parsing.

3
00:00:15,080 --> 00:00:17,960
So predictive parsing is a lot like recursive descent.

4
00:00:17,960 --> 00:00:20,039
It's still a top down parser.

5
00:00:20,039 --> 00:00:23,280
But the parser is able to predict which production to use.

6
00:00:23,280 --> 00:00:24,280
And it's never wrong.

7
00:00:24,280 --> 00:00:29,839
The parser is always able to guess correctly which production will yield to a,

8
00:00:29,839 --> 00:00:36,119
will lead to a successful parse if any production will lead to a successful parse.

9
00:00:36,119 --> 00:00:37,799
And it does this in two ways.

10
00:00:37,799 --> 00:00:39,679
First of all, it looks at the next few tokens.

11
00:00:39,679 --> 00:00:45,000
So it uses look ahead to try to figure out which production should be used,

12
00:00:45,000 --> 00:00:47,960
so based on what's coming up in the input stream.

13
00:00:47,960 --> 00:00:50,159
But also it restricts the grammars.

14
00:00:50,159 --> 00:00:57,159
So this is only works for a restricted form of grammars.

15
00:00:57,159 --> 00:01:00,799
And the advantage is that there's no backtracking involved.

16
00:01:00,799 --> 00:01:03,319
And so the parser is completely deterministic.

17
00:01:03,319 --> 00:01:06,920
It will never try alternatives.

18
00:01:06,920 --> 00:01:12,120
Now predictive parsers accept what are called the LLK grammars.

19
00:01:12,120 --> 00:01:15,039
And this is a really cryptic name.

20
00:01:15,039 --> 00:01:16,599
So let me explain it.

21
00:01:16,599 --> 00:01:21,000
The first L stands for left to right scan.

22
00:01:21,000 --> 00:01:24,239
So that means we're starting at the left end of the input and reading left to right.

23
00:01:24,239 --> 00:01:25,920
And in fact that's what we always do.

24
00:01:25,920 --> 00:01:31,399
So all the techniques that we looked at look at will have an L in the first position.

25
00:01:31,399 --> 00:01:35,000
The second L stands for a leftmost derivation.

26
00:01:35,000 --> 00:01:38,039
So we are constructing a leftmost derivation.

27
00:01:38,039 --> 00:01:43,759
That means we're always working on the leftmost non-terminal in the parse tree.

28
00:01:43,759 --> 00:01:52,640
And K here stands for K tokens of look ahead.

29
00:01:52,640 --> 00:01:59,200
And in practice while the theory is developed for arbitrary K in practice K is always equal

30
00:01:59,200 --> 00:02:00,200
to 1.

31
00:02:00,200 --> 00:02:06,719
And so in fact we'll only discuss the case K equals to 1 in these videos.

32
00:02:06,719 --> 00:02:11,479
To review in recursive descent parsing at each step there may be many choices of production

33
00:02:11,479 --> 00:02:12,479
to use.

34
00:02:12,479 --> 00:02:17,319
And so we need to use backtracking to undo band choices.

35
00:02:17,319 --> 00:02:23,239
In an LL1 parser at every step there's only going to be one choice of productions of possible

36
00:02:23,239 --> 00:02:24,919
production to use.

37
00:02:24,919 --> 00:02:26,239
And what does that mean?

38
00:02:26,239 --> 00:02:31,879
Well it means that if I have an input string, if I have a configuration of the parser where

39
00:02:31,879 --> 00:02:41,479
I have some terminal symbols omega and a non-terminal A, possibly now followed by some other stuff,

40
00:02:41,479 --> 00:02:43,159
there could be terminals and non-terminals.

41
00:02:43,159 --> 00:02:47,079
But again A here is the leftmost non-terminal.

42
00:02:47,080 --> 00:02:58,960
And the next input is a token T. Well then there is exactly one production A goes to alpha

43
00:02:58,960 --> 00:03:07,080
on input T. There's only one possible production that we can use.

44
00:03:07,080 --> 00:03:11,320
Any other production is guaranteed to be incorrect.

45
00:03:11,319 --> 00:03:16,000
Now it can be that even A goes to alpha won't succeed.

46
00:03:16,000 --> 00:03:20,599
It could be that we will be in a situation where there's no production we could use.

47
00:03:20,599 --> 00:03:25,759
But in an LL1 parser there will always be at most one that we could use.

48
00:03:25,759 --> 00:03:34,639
So in this case we would choose to rewrite the string to omega alpha later.

49
00:03:34,639 --> 00:03:38,039
Let's take a look at our favorite grammar, the one we've been using for the last couple

50
00:03:38,039 --> 00:03:39,539
of videos.

51
00:03:39,539 --> 00:03:44,539
We can see an issue here with using this grammar for a predictive parser.

52
00:03:44,539 --> 00:03:49,099
Take a look at the first two productions for T. They both begin with int.

53
00:03:49,099 --> 00:03:54,699
And so if I tell you that the next terminal in the input stream as we're parsing along is

54
00:03:54,699 --> 00:04:00,099
an integer, that doesn't really help you in trying to distinguish between these two

55
00:04:00,099 --> 00:04:03,500
productions and deciding which one to use.

56
00:04:03,500 --> 00:04:11,020
So in fact with only one token of look ahead I can't choose between these two productions.

57
00:04:11,020 --> 00:04:12,819
And that isn't the only problem actually.

58
00:04:12,819 --> 00:04:18,800
So we have the problem with T but the same problem exists with E. We can see that here both

59
00:04:18,800 --> 00:04:24,980
productions for E begin with the non terminal T. And it isn't really clear what we're

60
00:04:24,980 --> 00:04:28,819
to make of that because T again is a non terminal, not a terminal.

61
00:04:28,819 --> 00:04:30,779
So how would we even do the prediction?

62
00:04:30,779 --> 00:04:35,939
But the fact that they begin with the same thing suggests that it's not going to be easy

63
00:04:35,939 --> 00:04:42,179
for us to predict which production to use based on only a single token of look ahead.

64
00:04:42,179 --> 00:04:45,299
So what we need to do here is we need to change the grammar.

65
00:04:45,299 --> 00:04:50,500
This grammar is actually unacceptable for predictive parsing or at least for LL1 parsing.

66
00:04:50,500 --> 00:04:56,939
And we need to do something that's called left factoring the grammar.

67
00:04:56,939 --> 00:05:02,980
So the idea behind left factoring is to eliminate the common prefixes of multiple productions

68
00:05:02,980 --> 00:05:04,980
for one non terminal.

69
00:05:04,980 --> 00:05:06,459
So that's a mouthful.

70
00:05:06,459 --> 00:05:07,459
Let's do an example.

71
00:05:07,459 --> 00:05:12,259
Let's begin with the productions for E. And we can see again that E that both productions

72
00:05:12,259 --> 00:05:15,139
for E begin with the same prefix.

73
00:05:15,139 --> 00:05:20,259
What we're going to do is just factor out that common prefix into a single production.

74
00:05:20,259 --> 00:05:26,379
So we're going to have one production where E goes to T. And then we're going to have

75
00:05:26,379 --> 00:05:27,579
multiple suffixes.

76
00:05:27,579 --> 00:05:31,219
So let's introduce a new non terminal X that will handle the rest.

77
00:05:31,219 --> 00:05:32,980
So here we have E goes to TX.

78
00:05:32,980 --> 00:05:36,420
So it says that everything that E produces begins with T and that's consistent with these

79
00:05:36,420 --> 00:05:37,740
two productions.

80
00:05:37,740 --> 00:05:43,300
And now we have to write another production for X that handles the rest.

81
00:05:43,300 --> 00:05:44,300
And what would that be?

82
00:05:44,300 --> 00:05:46,860
Well, one possibility is that we're in this production.

83
00:05:46,860 --> 00:05:49,860
We need to have a plus E. And then in this production there's nothing.

84
00:05:49,860 --> 00:05:51,339
So that's easy to handle.

85
00:05:51,339 --> 00:05:56,139
We write one possibility for X as it goes to plus E and the other possibility is that

86
00:05:56,139 --> 00:05:57,819
it goes to Epsilon.

87
00:05:57,819 --> 00:06:00,659
And now you can see the general idea.

88
00:06:00,659 --> 00:06:02,419
We factor out the common prefix.

89
00:06:02,419 --> 00:06:05,219
We have one production that deals with the prefix.

90
00:06:05,219 --> 00:06:12,779
And then we introduce a new non terminal for the different suffixes.

91
00:06:12,779 --> 00:06:17,419
And then we just have multiple productions, one for each possible suffix.

92
00:06:17,419 --> 00:06:18,899
And you can see what this is going to do.

93
00:06:18,899 --> 00:06:23,939
This is effectively going to delay the decision about which production we're using.

94
00:06:23,939 --> 00:06:29,620
So instead of having to decide immediately which production we're going to use for E.

95
00:06:29,620 --> 00:06:34,500
Here in this grammar, we wait until we've already seen the T, whatever is derived from the

96
00:06:34,500 --> 00:06:41,500
T. And then we have to decide whether the rest of the production is a plus E or the empty

97
00:06:41,500 --> 00:06:42,500
string.

98
00:06:42,500 --> 00:06:46,540
Let's do the other set of productions.

99
00:06:46,540 --> 00:06:53,379
So we have T goes to and now the common prefix is int that we want to eliminate.

100
00:06:53,379 --> 00:06:57,219
So we're going to have just one production that begins with int.

101
00:06:57,219 --> 00:07:02,779
And then we'll have a new non terminal to stand for the various possible suffixes.

102
00:07:02,779 --> 00:07:05,939
And now here we also have another production that doesn't have anything to do with int.

103
00:07:05,939 --> 00:07:07,379
And so we just leave that one alone.

104
00:07:07,379 --> 00:07:09,620
That production just stays here.

105
00:07:09,620 --> 00:07:13,379
Because it already begins with something different, we won't have any trouble predicting

106
00:07:13,379 --> 00:07:16,459
between these two possible productions.

107
00:07:16,459 --> 00:07:18,300
These two possible productions.

108
00:07:18,300 --> 00:07:22,139
And now we have to write the productions for Y.

109
00:07:22,139 --> 00:07:27,979
And again, we just take the suffixes of the productions that we left factored and write

110
00:07:27,979 --> 00:07:29,180
them down as alternatives.

111
00:07:29,180 --> 00:07:36,379
So one is empty and the other one is times T. So we wind up with times T or Epsilon.

