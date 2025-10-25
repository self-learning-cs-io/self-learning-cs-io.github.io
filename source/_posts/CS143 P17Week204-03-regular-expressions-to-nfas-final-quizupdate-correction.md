---
title: CS143 P17Week204 03 Regular Expressions To Nfas Final Quizupdate Correction
---

1
00:00:00,000 --> 00:00:05,000
Welcome back.

2
00:00:05,000 --> 00:00:09,200
In this video, we're going to talk about converting regular expressions into non-deterministic

3
00:00:09,200 --> 00:00:15,519
finite automata.

4
00:00:15,519 --> 00:00:20,440
Before we get started, I want to give you an overview of the plan for the next few videos.

5
00:00:20,440 --> 00:00:25,760
We have electrical specification that we want to implement, and the first step is for someone

6
00:00:25,760 --> 00:00:29,960
to write that down as a set of regular expressions.

7
00:00:29,960 --> 00:00:32,799
Now that by itself, of course, is not implementation.

8
00:00:32,799 --> 00:00:34,679
That's just a specification.

9
00:00:34,679 --> 00:00:39,840
So we have to translate that into a program that can actually do electrical analysis.

10
00:00:39,840 --> 00:00:43,240
And this actually happens in several steps.

11
00:00:43,240 --> 00:00:48,840
The first part is to translate those regular expressions into non-deterministic finite

12
00:00:48,840 --> 00:00:53,920
automata that recognize exactly the same thing.

13
00:00:53,920 --> 00:00:58,880
And then those non-deterministic automata are translated into deterministic automata.

14
00:00:58,880 --> 00:01:05,280
And finally, those deterministic automata are implemented as a set of lookup tables and

15
00:01:05,280 --> 00:01:09,079
a little bit of code for traversing those tables.

16
00:01:09,079 --> 00:01:18,000
So in previous videos, we've talked about this piece, and we've also defined these pieces.

17
00:01:18,000 --> 00:01:20,760
And so now we're ready to put the whole thing together.

18
00:01:20,760 --> 00:01:25,680
And in this particular video, we're going to focus on this component right here, the translation

19
00:01:25,680 --> 00:01:32,320
of regular expressions to non-deterministic finite automata.

20
00:01:32,320 --> 00:01:37,680
So the plan is that for each kind of regular expression, we're going to define an equivalent

21
00:01:37,680 --> 00:01:41,320
non-deterministic automaton.

22
00:01:41,320 --> 00:01:45,760
It's a automaton that accepts exactly the same language as the language of the regular

23
00:01:45,760 --> 00:01:46,760
expression.

24
00:01:46,760 --> 00:01:50,280
And here's a little bit of notation that we're going to use.

25
00:01:50,280 --> 00:01:54,080
We'll define these automaton for regular expressions.

26
00:01:54,079 --> 00:01:59,079
And usually what we're going to be doing is needing to modify their start states and

27
00:01:59,079 --> 00:02:00,079
their final states.

28
00:02:00,079 --> 00:02:04,400
So we'll just indicate the start state with the arrow and the final state with a double

29
00:02:04,400 --> 00:02:05,400
circle.

30
00:02:05,400 --> 00:02:08,680
And we won't worry too much about the overall structure of the machine, as long as we have

31
00:02:08,680 --> 00:02:13,079
a handle on the start state and the final state.

32
00:02:13,079 --> 00:02:19,079
I should say that in the machines we'll build here, there will only be one final state.

33
00:02:19,880 --> 00:02:21,040
Okay, so let's begin.

34
00:02:21,040 --> 00:02:27,240
So for the epsilon regular expression, what's a machine that accepts that?

35
00:02:27,240 --> 00:02:29,240
Well this is a very simple machine.

36
00:02:29,240 --> 00:02:33,280
We just have a start state and a final state and an epsilon transition between them.

37
00:02:33,280 --> 00:02:39,680
So this machine accepts exactly the empty string.

38
00:02:39,680 --> 00:02:45,880
Similarly for a single character A, we can define a one transition to state machine that

39
00:02:45,879 --> 00:02:48,079
accepts that one character.

40
00:02:48,079 --> 00:02:52,039
So from the start state, we can move to the final state if and only if we read that

41
00:02:52,039 --> 00:02:53,039
particular character.

42
00:02:53,039 --> 00:02:57,359
Okay, so those are our two simple regular expressions.

43
00:02:57,359 --> 00:03:00,599
And now we have to do the compound regular expressions.

44
00:03:00,599 --> 00:03:04,359
And these are a little more involved.

45
00:03:04,359 --> 00:03:07,879
So let's talk about concatenation first.

46
00:03:07,879 --> 00:03:13,280
And so because we're going to build these machines up from smaller regular expressions

47
00:03:13,280 --> 00:03:14,919
to larger ones.

48
00:03:14,919 --> 00:03:19,839
We can assume that we've already converted A and B separately into machines.

49
00:03:19,839 --> 00:03:23,639
And so I have a machine for A and I have a machine for B.

50
00:03:23,639 --> 00:03:28,479
And now all I have to do is say how I'm going to paste together these two machines to form

51
00:03:28,479 --> 00:03:34,199
a machine, a compound machine that recognizes the same language as A can catenate with B.

52
00:03:34,199 --> 00:03:36,199
And here's the construction.

53
00:03:36,199 --> 00:03:39,919
The start state for the compound machine will be the start state for A.

54
00:03:39,919 --> 00:03:42,879
So we just keep that start state for A the same.

55
00:03:42,879 --> 00:03:45,240
And then we modify the final state of A.

56
00:03:45,240 --> 00:03:48,240
So we make the final state of A no longer a final state.

57
00:03:48,240 --> 00:03:53,519
And I've done that here by removing the double circle on the final state of A.

58
00:03:53,519 --> 00:03:57,079
And we add an epsilon transition to the start state of B.

59
00:03:57,079 --> 00:04:00,199
Now, if you think about it, that does exactly the right thing.

60
00:04:00,199 --> 00:04:05,800
What that says is that first we recognize some portion of the input that belongs to the

61
00:04:05,800 --> 00:04:06,800
language of A.

62
00:04:06,800 --> 00:04:10,759
And when we get to what would have been the final state of A, we can jump to the start

63
00:04:10,759 --> 00:04:11,960
state of B.

64
00:04:11,960 --> 00:04:16,759
So we can now consume any input and then try to read the rest of the string as part of

65
00:04:16,759 --> 00:04:22,240
the language as a string in the language of B.

66
00:04:22,240 --> 00:04:26,540
And for union, we have a similar way of pasting together the machines, although the structure

67
00:04:26,540 --> 00:04:27,720
is somewhat different.

68
00:04:27,720 --> 00:04:31,319
So here we add a new start state for the compound machine.

69
00:04:31,319 --> 00:04:33,319
And what does A plus B means?

70
00:04:33,319 --> 00:04:37,879
It means either the input is in the language of A or it's in the language of B.

71
00:04:37,879 --> 00:04:40,879
And epsilon transitions are really good for capturing this.

72
00:04:40,879 --> 00:04:44,519
Because we just make a decision right from the start state, is this string going to be

73
00:04:44,519 --> 00:04:49,159
in the language of A or is it going to be in the language of B?

74
00:04:49,159 --> 00:04:55,920
So we make a non-deterministic choice and then we read the string as using the automaton

75
00:04:55,920 --> 00:04:56,920
that we chose.

76
00:04:56,920 --> 00:05:00,959
And if we get to the final state, either those machines, we can make an epsilon transition

77
00:05:00,959 --> 00:05:04,199
to the new final state for the compound machine.

78
00:05:04,199 --> 00:05:08,639
Now remember what the notion is of acceptance for non-deterministic automaton.

79
00:05:08,639 --> 00:05:13,519
They make these guesses, but if there's any guess that works, then we say that it's

80
00:05:13,519 --> 00:05:15,240
in the language of the machine.

81
00:05:15,240 --> 00:05:21,300
So if in fact the string is in the union of A or B, then either choosing A or choosing

82
00:05:21,300 --> 00:05:22,759
B will work.

83
00:05:22,759 --> 00:05:28,959
And so the machine will accept the string.

84
00:05:28,959 --> 00:05:34,479
And finally, the most complicated case for iteration A star, we have the following construction.

85
00:05:34,479 --> 00:05:37,599
So here's the machine for A embedded in here.

86
00:05:37,600 --> 00:05:42,160
We've added a new start state and a new final state.

87
00:05:42,160 --> 00:05:44,560
And now let's talk about how this works.

88
00:05:44,560 --> 00:05:51,320
So one possibility is remember that epsilon is always in the language of A star.

89
00:05:51,320 --> 00:05:53,520
And so we have this transition here.

90
00:05:53,520 --> 00:05:58,160
We can go straight from the start state to the final state and accept the empty string.

91
00:05:58,160 --> 00:06:01,840
And so that just guarantees that the empty string is in the language.

92
00:06:01,840 --> 00:06:02,840
Otherwise what do we do?

93
00:06:02,839 --> 00:06:07,879
So otherwise we can make a transition, an epsilon transition to the start state of A.

94
00:06:07,879 --> 00:06:12,239
And then we can, from the final state of A, if we reach it, we can go back to the start

95
00:06:12,239 --> 00:06:13,959
state of the whole machine.

96
00:06:13,959 --> 00:06:18,039
And we can do this as many times as we like.

97
00:06:18,039 --> 00:06:22,279
Okay, so there's the iteration of A's around this loop right here.

98
00:06:22,279 --> 00:06:28,239
Right, and when we reach the final state of A, we could also decide to just make a transition

99
00:06:28,239 --> 00:06:29,359
to the final state of the machine.

100
00:06:29,359 --> 00:06:31,599
We conclude that's the last time.

101
00:06:31,600 --> 00:06:40,520
And so this machine recognizes zero or more strings in the language of A.

102
00:06:40,520 --> 00:06:41,720
So now let's do an example.

103
00:06:41,720 --> 00:06:43,240
So here's a regular expression.

104
00:06:43,240 --> 00:06:49,560
And we want to build a equivalent non-deterministic machine that recognizes the same language.

105
00:06:49,560 --> 00:06:56,200
And we're going to follow our construction, which works by induction on the structure of

106
00:06:56,200 --> 00:07:00,000
the regular expression, starting with the simple regular expressions and building up to

107
00:07:00,000 --> 00:07:01,439
the compound ones.

108
00:07:01,439 --> 00:07:02,519
So what do we have here?

109
00:07:02,519 --> 00:07:06,120
So we have a machine for accepting one.

110
00:07:06,120 --> 00:07:09,040
Okay, so we need a machine that accepts one.

111
00:07:09,040 --> 00:07:13,560
And if we call it had two states, and it just, you know, it made a transition between

112
00:07:13,560 --> 00:07:20,000
the two on the number one, similarly a machine for accepting zero.

113
00:07:20,000 --> 00:07:26,879
Okay, and now we need to put them together in a machine that accepts either one or zero.

114
00:07:26,879 --> 00:07:35,759
And the way we did that was we made a choice from a start state for the compound machine.

115
00:07:35,759 --> 00:07:40,719
We can either move to the machine for accepting one or the machine for accepting zero.

116
00:07:40,719 --> 00:07:47,000
And then we have at the end also Epsilon moves back to the final state of the compound

117
00:07:47,000 --> 00:07:48,000
machine.

118
00:07:48,000 --> 00:07:51,920
Okay, and now we need to iterate this.

119
00:07:51,920 --> 00:07:58,280
So we need to be able to accept zero or more of ones or zeros.

120
00:07:58,280 --> 00:08:05,840
And so we're going to take this entire block here and paste it into the pattern that we

121
00:08:05,840 --> 00:08:07,600
had for iteration.

122
00:08:07,600 --> 00:08:08,600
So how do we do that?

123
00:08:08,600 --> 00:08:12,000
Well, we have a new start state and a new final state.

124
00:08:12,000 --> 00:08:17,680
Okay, and there's an Epsilon move from the start state to the new final state to guarantee

125
00:08:17,680 --> 00:08:19,600
that we accept the empty string.

126
00:08:19,600 --> 00:08:24,720
And then we can just iterate this inner machine as many times as we like.

127
00:08:24,720 --> 00:08:26,800
We can make an Epsilon move to the start state.

128
00:08:26,800 --> 00:08:29,960
We can execute the machine once.

129
00:08:29,960 --> 00:08:33,800
And if we decide we want to do it again, well, we can do that.

130
00:08:33,800 --> 00:08:38,800
Okay, go back around for another time or from the final state, we can decide that we've

131
00:08:38,800 --> 00:08:42,879
seen enough and we can just move to the final state of the compound machine.

132
00:08:42,879 --> 00:08:47,040
So this machine then accepts the language one plus zero star.

133
00:08:47,039 --> 00:08:49,199
And now we have a little bit more to do.

134
00:08:49,199 --> 00:08:53,480
We have to accept, we need another machine that accepts just one.

135
00:08:53,480 --> 00:09:00,159
So we build another machine that accepts the digit one.

136
00:09:00,159 --> 00:09:06,480
And now we need to compose the two of these things to concatenate them.

137
00:09:06,480 --> 00:09:07,559
And that was very simple.

138
00:09:07,559 --> 00:09:11,959
We just have an Epsilon move from the final state of the first machine to the start state

139
00:09:11,959 --> 00:09:13,399
of the second machine.

140
00:09:13,399 --> 00:09:16,679
And then these are all the states of the final machine.

141
00:09:16,679 --> 00:09:21,319
We just need to now label our final, final state of the state that we're actually going

142
00:09:21,319 --> 00:09:25,839
to use in the end is the final state of the entire machine, which would be that one, and

143
00:09:25,839 --> 00:09:31,199
the start state, which is this state over here.

144
00:09:31,199 --> 00:09:36,399
And that's the entire construction for the nine term, nisticatamitan or a non deterministic

145
00:09:36,399 --> 00:09:37,399
et al.

146
00:09:37,399 --> 00:09:39,039
And that recognizes this language.

