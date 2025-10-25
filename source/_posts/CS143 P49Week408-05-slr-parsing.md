---
title: CS143 P49Week408 05 Slr Parsing
---

1
00:00:00,000 --> 00:00:08,160
In this video, we're finally going to give an actual bottom-up parsing algorithm.

2
00:00:08,160 --> 00:00:13,759
In particular, we'll talk about SLR or simple LR parsing, which will build on the ideas of

3
00:00:13,759 --> 00:00:23,440
valid items and viable prefixes that we've been discussing in our recent videos.

4
00:00:23,440 --> 00:00:27,679
The first thing we're going to do is to define a very weak bottom-up parsing algorithm called

5
00:00:27,679 --> 00:00:29,679
LR zero parsing.

6
00:00:29,679 --> 00:00:35,039
The basic idea here is that we're going to assume a stack contains a contents alpha, and

7
00:00:35,039 --> 00:00:41,759
that the next input is token T. That the DFA, this is the DFA that recognizes the viable

8
00:00:41,759 --> 00:00:47,439
prefixes, on input alpha, that is when it reads the stack contents, it terminates in some

9
00:00:47,439 --> 00:00:55,920
state S. There's only going to be two things that this parsing algorithm needs to do.

10
00:00:55,920 --> 00:01:02,480
If the final state of the DFA contains the item x goes to beta dot, what does that say?

11
00:01:02,480 --> 00:01:08,719
That says we've seen the complete right-hand side of x goes to beta on the top of the stack.

12
00:01:08,719 --> 00:01:15,280
Furthermore, everything that's below the stack still says that x goes to beta dot is a valid

13
00:01:15,280 --> 00:01:21,520
or a viable, sorry, is a valid item for this state. I mean, it's okay to reduce by x goes to beta.

14
00:01:21,519 --> 00:01:27,199
So if we see a complete production dot all the way in the right-hand side in the final state

15
00:01:27,199 --> 00:01:33,759
of the DFA, then we're just going to reduce by that production. The other possible move is a shift.

16
00:01:33,759 --> 00:01:41,759
If we wind up in a state where x goes to beta dot T, and then some other stuff is a valid item,

17
00:01:41,759 --> 00:01:46,560
what does that say? That says it would be okay at this point to add a T to the stack,

18
00:01:46,560 --> 00:01:49,680
and if T is our input, well then we should do a shift move.

19
00:01:53,760 --> 00:01:59,040
When does LR0 parsing get into trouble? Well, there are two possible problems it could have.

20
00:01:59,040 --> 00:02:05,359
It might not be able to decide between two possible reduced moves. So if any state of the DFA

21
00:02:05,359 --> 00:02:10,000
has two possible reductions, meaning it's seen two complete productions, and it could reduce by

22
00:02:10,000 --> 00:02:15,439
either one, then there's not enough information to decide which reduction to perform, and the pars

23
00:02:15,439 --> 00:02:21,120
won't be completely deterministic. And this is called a reduced reduced conflict. So again,

24
00:02:21,120 --> 00:02:26,719
this happens if a particular state has two separate items indicating two separate reductions.

25
00:02:27,439 --> 00:02:32,560
The other possibility is that the final state of the DFA after reading the stack contents

26
00:02:32,560 --> 00:02:40,079
might have a item that says to reduce, and another item that says to shift, and this is called a

27
00:02:40,080 --> 00:02:46,720
shift reduced conflict. So in this case, there would only be a conflict in a state where T was the

28
00:02:46,720 --> 00:02:51,200
next item in the input, but in that situation we wouldn't know whether to shift T onto the stack

29
00:02:51,200 --> 00:02:59,680
or to reduce by x goes to beta. Let's take a look at the DFA for recognizing viable

30
00:02:59,680 --> 00:03:04,960
prefixes that we've been using for the last couple of videos, and in fact this particular DFA

31
00:03:05,040 --> 00:03:10,320
does have some conflicts. So let's take a look at this state right here. Here we could either reduce

32
00:03:11,120 --> 00:03:17,200
by egos to T if we were in this state, or if the next input is a plus we could do a shift.

33
00:03:18,000 --> 00:03:23,520
And so in this particular situation, if the next input is plus we could either shift and use

34
00:03:23,520 --> 00:03:30,240
this item, or we could reduce and use that item. So this particular state has a shift reduced conflict.

35
00:03:30,320 --> 00:03:41,520
Now that's not the only conflict in this grammar though. In this state here we have a very

36
00:03:41,520 --> 00:03:48,320
similar problem. Here we could shift if the next input is a times, or we could reduce by T goes to

37
00:03:48,320 --> 00:03:57,760
int. And so this state also has a shift reduced conflict. It turns out that it's not difficult to

38
00:03:57,759 --> 00:04:04,719
improve on LR0 parsing, and will present one such improvement in this video called SLR or simple

39
00:04:04,719 --> 00:04:11,759
LR parsing. And this is going to improve on LR0 by adding some heuristics that will refine when

40
00:04:11,759 --> 00:04:20,879
we shift and when we reduce so that fewer states have conflicts. The modification to LR0 parsing

41
00:04:20,879 --> 00:04:27,439
that gives us SLR parsing is really quite small. We just add one new condition to the reduction case.

42
00:04:28,079 --> 00:04:35,120
So before, if we saw x goes to beta dot in the final state of our DFA, recall what that means,

43
00:04:35,120 --> 00:04:41,120
that means beta is on the top of the stack and is viable. And so it's fine to reduce. Now

44
00:04:42,159 --> 00:04:48,079
we do have a little bit more information. So notice that the automaton here doesn't take any

45
00:04:48,079 --> 00:04:52,800
advantage of what's coming up in the input. This is based entirely, this decision here,

46
00:04:52,800 --> 00:04:58,800
is based entirely on the stack contents. But it might be that it doesn't make sense to reduce

47
00:04:58,800 --> 00:05:03,280
based on what the next input symbol is. And how can we take advantage of that? Well, if you think

48
00:05:03,280 --> 00:05:10,080
about it, what's going to happen? We have our stack contents and it ends in a beta. And now we're

49
00:05:10,080 --> 00:05:17,519
going to make a move where we're going to replace that by x. Okay? And if the next input symbol is T,

50
00:05:17,519 --> 00:05:22,240
so remember there'd be a vertical bar here and a T following. What does that mean? Well, that means

51
00:05:22,480 --> 00:05:28,720
that x has to come before T in the derivation. Or in other words, T is going to follow x.

52
00:05:28,720 --> 00:05:33,759
And if T can't follow x, if T is a terminal symbol that can't come after the non-terminal x,

53
00:05:33,759 --> 00:05:39,600
then it makes no sense to do this reduction. So we only do the reduction if T is in the

54
00:05:39,600 --> 00:05:44,960
follow of x. We just add that restriction and that is the only change to the parsing algorithm.

55
00:05:47,600 --> 00:05:51,600
So if there are any conflicts under these rules, either shift, reduce, or reduce, reduce,

56
00:05:51,600 --> 00:05:56,480
then the grammar is not an SLR grammar. And just notice that these rules amount to a

57
00:05:56,480 --> 00:06:01,760
heuristic for detecting the handles. So we take into account two pieces of information, the

58
00:06:01,760 --> 00:06:07,760
contents of the stack. That's what the DFA does for us. And it tells us what items are possible

59
00:06:07,760 --> 00:06:12,480
when we get to the top of the stack. And also what's coming up in the input. And we can use that

60
00:06:12,480 --> 00:06:18,080
to refine our reduction decisions. And for those grammars where there are no conflicts, meaning there's

61
00:06:18,079 --> 00:06:25,279
a unique move in every possible state under those rules, then this heuristic is exact, you know,

62
00:06:25,279 --> 00:06:29,839
for those grammars. And we just define those grammars to be the SLR grammars.

63
00:06:31,680 --> 00:06:35,680
Let's consider how things have changed for our running example, the deterministic

64
00:06:35,680 --> 00:06:40,000
automaton for recognizing the viable prefixes of the grammar we've been looking at for several

65
00:06:40,000 --> 00:06:44,799
videos now. Recall that we had shift-reduced conflicts under LR-0 rules in two states.

66
00:06:45,360 --> 00:06:50,720
Let's look at the state first, the upper state. So here we're going to shift if there's a plus

67
00:06:50,720 --> 00:06:55,280
in the input. That's what this item tells us to do. It tells us if there's a plus, then the right

68
00:06:55,280 --> 00:07:00,400
move is to shift. And so now the question is when are we going to reduce? Well, we're only going to

69
00:07:00,400 --> 00:07:06,480
reduce if the input is in the follow-of-e. And what is the follow-of-e? We computed it a long time

70
00:07:06,480 --> 00:07:12,879
ago. But just to remind you, remember that E here is the original start symbol of the grammar.

71
00:07:12,879 --> 00:07:19,360
So certainly, dollar sign will wind up in the follow-of-e. And the other possibility for the follow-of-e

72
00:07:19,360 --> 00:07:24,480
is a closed-paren because here at this point in the grammar, a closed-paren comes right after E.

73
00:07:25,279 --> 00:07:31,120
And that's the only two possibilities. So what that says now, what that means is that in this

74
00:07:31,120 --> 00:07:39,120
particular state, we are going to reduce, if either we're out of input, or if the next token in

75
00:07:39,120 --> 00:07:44,959
the input is a closed-paren, and we'll shift if the next token in the input is a plus, and in any

76
00:07:44,959 --> 00:07:50,399
other situation, we will report a parsing error. And so there's no longer any shift-reduced conflict

77
00:07:50,399 --> 00:07:56,560
in this state, and there's always a unique move for every possible input. The situation is similarly

78
00:07:56,560 --> 00:08:02,399
similarly improved for the other state. So here we're going to shift if there's a times in the input,

79
00:08:02,399 --> 00:08:07,920
and we're going to reduce if the input is in the follow-of-e. And what is the follow-of-e?

80
00:08:09,519 --> 00:08:16,000
We'll recall, we computed this again, the long time ago, and I just happen to know what it is.

81
00:08:16,000 --> 00:08:19,120
And so I'll just tell you, well, it included everything in the follow-of-e.

82
00:08:21,199 --> 00:08:25,040
So dollar sign and closed-paren are in the follow-of-t, but also

83
00:08:25,759 --> 00:08:30,639
pluses in the follow-of-t because of this usage over here in the grammar, where plus appears

84
00:08:30,639 --> 00:08:36,480
immediately after t. But those are the only things in the follow-of-t. And so now we're going to

85
00:08:36,480 --> 00:08:41,440
reduce only if we're out of input, or if the next input item is a closed-paren or a plus,

86
00:08:41,440 --> 00:08:50,080
and there's also no shift-reduced conflict in this state. And so this grammar is an SLR1 grammar.

87
00:08:53,200 --> 00:08:59,519
Now many grammars are not SLR, to emphasize that SLR is an improvement on the LR0, but it's still

88
00:08:59,519 --> 00:09:06,480
not a really very general class of grammars. All ambiguous grammars, for example, are not SLR.

89
00:09:07,360 --> 00:09:12,559
But we can improve a little bit on the SLR situation. We can make SLR parts even more grammars

90
00:09:12,559 --> 00:09:17,199
by using precedence declarations to tell it how to resolve conflicts.

91
00:09:18,480 --> 00:09:23,039
So let's revert to the most natural and also most ambiguous grammar for plus and times over

92
00:09:23,039 --> 00:09:28,319
the integers. And we've looked at this grammar before. If you build the DFA for this grammar,

93
00:09:28,320 --> 00:09:32,560
if you go through and build the DFA for the viable prefix of this grammar, you will discover

94
00:09:32,560 --> 00:09:39,440
that there is a state that has the following two items in it. One says that if we see E times E,

95
00:09:40,480 --> 00:09:46,160
that we have seen E times E on the stack, and that we can now reduce by E goes to E times E.

96
00:09:46,160 --> 00:09:52,400
The other one will say that if there's a plus coming up in the input, we should shift. And

97
00:09:52,400 --> 00:09:58,240
notice that this is exactly the question of whether times has higher precedence than plus. When you

98
00:09:58,240 --> 00:10:05,759
are in this situation, should you reduce, thereby grouping the two E's together here, grouping the

99
00:10:05,759 --> 00:10:13,680
multiplication operation first, or should you shift the plus, and which case you'll be working on

100
00:10:13,680 --> 00:10:20,560
that first, since it's at the top of the stack. So in this situation, the declaration times as higher

101
00:10:20,560 --> 00:10:26,639
precedence than plus resolves the conflict in favor of the reduction. So we would not do the shift,

102
00:10:26,639 --> 00:10:29,199
and we would wind up with no shift-reduced conflict.

103
00:10:32,319 --> 00:10:37,360
Note that the term precedence declaration is actually quite misleading. These declarations don't

104
00:10:37,360 --> 00:10:42,000
define precedence. They don't do that directly at all. What they really define are conflict

105
00:10:42,000 --> 00:10:47,919
resolution. They say make this move instead of that move. It happens that in this particular case,

106
00:10:47,919 --> 00:10:54,319
because we're dealing with a natural grammar, a simple grammar for plus and times, that the conflict

107
00:10:54,320 --> 00:11:00,879
resolution has exactly the effect of enforcing the precedence declaration that we want. But in

108
00:11:00,879 --> 00:11:05,920
more complicated grammars, where there are more interactions between the various pieces of the grammar,

109
00:11:06,800 --> 00:11:11,280
these declarations might not do what you expect in terms of enforcing precedence.

110
00:11:11,280 --> 00:11:16,560
Fortunately, you can always print out the automaton. The tools provide usually a way for you to

111
00:11:16,560 --> 00:11:23,600
inspect the parsing of automaton. And then you can see exactly how the conflicts are being resolved,

112
00:11:23,600 --> 00:11:28,879
and whether those are the resolutions that you had intended. And I recommend when you're building

113
00:11:28,879 --> 00:11:33,840
parsers, especially if it's a fairly complex parser, that you do examine the parsing of automaton,

114
00:11:33,840 --> 00:11:41,279
to make sure that it's doing what you expect. So now we're ready to give the algorithm for SLR

115
00:11:41,279 --> 00:11:46,480
parsing. So M is our automaton, our parsing automaton that recognizes viable prefixes.

116
00:11:47,600 --> 00:11:52,320
The initial configuration is going to be with the vertical bar all the way to the left, so the stack

117
00:11:52,320 --> 00:11:57,680
is empty. This is our full input, and we append $indicate the end of the input. And now we're going

118
00:11:57,680 --> 00:12:04,320
to repeat until the configuration has just the start symbol on the stack and $ in the input,

119
00:12:04,320 --> 00:12:11,360
meaning all the input is gone, and we reduce the entire input to the start symbol. So an intermediate

120
00:12:11,360 --> 00:12:17,280
configuration will be written as alpha omega, where alpha is the contents of the stack, and omega is

121
00:12:17,279 --> 00:12:22,079
the remaining input. And what we're going to do is we're going to run M, run the machine on the

122
00:12:22,079 --> 00:12:29,279
current stack alpha. And if M rejects alpha, if M says that alpha is not a viable prefix, then we're

123
00:12:29,279 --> 00:12:35,919
going to report a parsing error. We're going to stop right there. Now if M accepts alpha, and it accepts

124
00:12:35,919 --> 00:12:40,399
it in a state, if it ends in a state with items I, then we're going to look at the next input,

125
00:12:40,399 --> 00:12:48,879
call that A, and what are we going to do? We're going to shift if there is an item in I that says,

126
00:12:48,879 --> 00:12:54,480
it would be okay to see the terminal A next. So that's just our shift move, and then we're going

127
00:12:54,480 --> 00:13:03,199
to reduce if there's a reduction item in the set of valid items, and the next input can follow

128
00:13:03,199 --> 00:13:07,519
the non-terminal on the left-hand side. So these are just the two rules that we discussed before,

129
00:13:07,519 --> 00:13:13,600
and then we'll report a parsing error if neither of these applies. Okay? Now one interesting thing

130
00:13:13,600 --> 00:13:18,399
about this algorithm, if you read it carefully and you think about it for a while, you'll realize

131
00:13:18,399 --> 00:13:26,799
that this step is actually not needed, that we don't need to check here for whether M accepts the

132
00:13:26,799 --> 00:13:33,439
stack or not. Because this step down here, where we report a parsing error, if neither of these

133
00:13:33,440 --> 00:13:39,360
steps applies, this already implies that we will never form an invalid stack, that our stacks will

134
00:13:39,360 --> 00:13:45,520
always be viable. The parsing errors will be called at this line, and we won't pollute the stack

135
00:13:45,520 --> 00:13:51,920
with symbols that can't possibly result in viable prefixes. So in fact, this error check here

136
00:13:51,920 --> 00:13:59,440
is not needed, M is always going to accept the stack. Now if there are any conflicts in the last step,

137
00:13:59,440 --> 00:14:04,640
meaning it's not clear whether to shift or reduce in some state for some input symbol,

138
00:14:04,640 --> 00:14:11,200
then the grammar is not SLRK. And K again is the amount of look ahead and practice we just use one

139
00:14:11,200 --> 00:14:24,320
token of look ahead. So typically just looking at the next token in the input stream.

