---
title: PrincetonAlgorithms P106Part210 06_nfa Construction
---

1
00:00:00,000 --> 00:00:08,400
So the final step in our regular expression, pattern matching algorithm, is to construct

2
00:00:08,400 --> 00:00:11,700
a non-deterministic finite automaton.

3
00:00:11,700 --> 00:00:14,700
So how do we go ahead and do that?

4
00:00:14,700 --> 00:00:23,300
And this is an integral part of the algorithm, but we've pretty much got all the pieces,

5
00:00:23,300 --> 00:00:32,100
but really what makes it intricate is that an illustration of what a programming language

6
00:00:32,100 --> 00:00:37,420
has to do when trying to understand your programming, what your program does.

7
00:00:37,420 --> 00:00:44,900
What we need to do is somehow understand what's in the regular expression and then take

8
00:00:44,900 --> 00:00:47,820
that information and use it to build the machine.

9
00:00:47,820 --> 00:00:50,780
Now that's what's parsing, that's called parsing.

10
00:00:50,780 --> 00:00:55,880
And to try to figure out the structure of your program or regular expression and then

11
00:00:55,880 --> 00:00:57,079
do something with it.

12
00:00:57,079 --> 00:01:01,820
And this is a simple example of that, but useful as well.

13
00:01:01,820 --> 00:01:09,540
So the first thing that's clear what to do, so we're going to have one state per character

14
00:01:09,540 --> 00:01:13,099
as we talked about before, so that's easy to set up.

15
00:01:13,099 --> 00:01:21,219
And then the match transition edges, if a state contains character in the alphabet, we

16
00:01:21,219 --> 00:01:23,619
just put in a match transition to the next state.

17
00:01:23,619 --> 00:01:28,379
And actually, that's implicit in our algorithm.

18
00:01:28,379 --> 00:01:30,219
So now what about other things?

19
00:01:30,219 --> 00:01:37,899
Well, if we have for any parenthesis, we'll just put in an epsilon transition to the next

20
00:01:37,899 --> 00:01:39,419
state.

21
00:01:39,419 --> 00:01:42,939
So our machines all have that.

22
00:01:42,939 --> 00:01:50,019
Now closure is the one that has quite a bit of action.

23
00:01:50,019 --> 00:01:55,340
So for every star, let's look at the one that is just a one character closure.

24
00:01:55,340 --> 00:02:00,819
So we have a single character closure, so this is a star.

25
00:02:00,819 --> 00:02:10,539
And what we need is epsilon transitions for the star that allow the machine to go and

26
00:02:10,539 --> 00:02:19,419
pick up, well, there has to be one, an epsilon transition that goes out to the star to

27
00:02:19,419 --> 00:02:22,379
cover the case that we have zero matches.

28
00:02:22,379 --> 00:02:27,899
And then after zero, then we want to go back to have as many matches as we want before

29
00:02:27,899 --> 00:02:30,899
taking the match transition.

30
00:02:30,899 --> 00:02:36,019
We're going to be able to go back and match as many as we want before going out to the

31
00:02:36,019 --> 00:02:37,099
next.

32
00:02:37,099 --> 00:02:45,819
So for the star, we have to add three epsilon transitions.

33
00:02:45,819 --> 00:02:52,699
The ones that goes, if you have a character and I and a star and I plus one, you have to

34
00:02:52,699 --> 00:02:55,060
add these edges going both ways.

35
00:02:55,060 --> 00:03:02,219
And then an edge going out to the next character to get out of the star.

36
00:03:02,219 --> 00:03:09,620
And that works also if there's a closure involving parentheses that the character before

37
00:03:09,620 --> 00:03:16,460
the star is a parenthesis, then we want to add the same kind of mechanism.

38
00:03:16,460 --> 00:03:21,460
From the parentheses, go out and skip the whole thing to cover the zero match case or go

39
00:03:21,460 --> 00:03:26,379
back and match as many times as we need to match and then finally go out.

40
00:03:26,379 --> 00:03:29,340
So this three edges have to be added for each star.

41
00:03:29,340 --> 00:03:33,219
And it's well defined what they are.

42
00:03:33,219 --> 00:03:41,620
And then OR, there's two epsilon transition edges that we have to add.

43
00:03:41,620 --> 00:03:47,620
And that is to allow the machine to skip the first part of the expression and do the second

44
00:03:47,620 --> 00:03:53,460
or to do the first part of the expression and skip this second.

45
00:03:53,460 --> 00:04:01,180
So if we keep track of where the left parenthesis is when we in the OR operator, when we hit

46
00:04:01,180 --> 00:04:06,140
the right parenthesis, we have all the information that we need in order to be able to add those

47
00:04:06,140 --> 00:04:08,379
two edges.

48
00:04:08,379 --> 00:04:14,939
So those are the edges that we have to put together to build the NFA and the trick is keeping

49
00:04:14,939 --> 00:04:22,579
track of the information of where the previous operators are, particularly since parentheses

50
00:04:22,579 --> 00:04:24,339
can be nested.

51
00:04:24,339 --> 00:04:33,500
But this is not that difficult to do because we have a mechanism for doing that to remember

52
00:04:33,500 --> 00:04:40,219
where the left parenthesis are and the OR, and that's to maintain a push down stack.

53
00:04:40,219 --> 00:04:50,180
And so the algorithm is to push left parenthesis in OR onto the stack.

54
00:04:50,180 --> 00:04:58,100
And then when we hit right parenthesis, then we can pop the corresponding left parenthesis

55
00:04:58,100 --> 00:05:00,459
and maybe the OR.

56
00:05:00,459 --> 00:05:06,300
That gives us all the information that we need to add the epsilon transition edges.

57
00:05:06,300 --> 00:05:09,500
And so the stack takes care of the nesting of the parenthesis.

58
00:05:09,500 --> 00:05:15,860
And when you think about it, this is a very natural mechanism to use, very similar to the

59
00:05:15,860 --> 00:05:21,860
early programs that we wrote using textures algorithm for arithmetic expressions.

60
00:05:21,860 --> 00:05:26,180
So let's look at a demo and you'll see how that works.

61
00:05:26,180 --> 00:05:30,980
So we're going to build the machine corresponding to this regular expression and it's the one

62
00:05:30,980 --> 00:05:33,699
that we've been working with.

63
00:05:33,699 --> 00:05:43,220
So what we do is just go from left to right through the regular expression and take the

64
00:05:43,220 --> 00:05:46,180
appropriate action for each character.

65
00:05:46,180 --> 00:05:53,060
So for left parenthesis, there's always an epsilon transition from left parenthesis to the

66
00:05:53,060 --> 00:05:54,060
next state.

67
00:05:54,060 --> 00:05:58,580
And then the other thing is we remember that left parenthesis on the push down stack.

68
00:05:58,580 --> 00:06:01,620
So we put the index 0 onto the stack.

69
00:06:01,620 --> 00:06:04,060
So now we have another left parenthesis.

70
00:06:04,060 --> 00:06:10,900
Again, we put the epsilon transition on and we push that one onto the stack.

71
00:06:10,899 --> 00:06:19,539
So now if we have an alphabet symbol, what we need to do is add the match transition to

72
00:06:19,539 --> 00:06:20,539
the next state.

73
00:06:20,539 --> 00:06:22,859
And then there's a couple ways to do this.

74
00:06:22,859 --> 00:06:26,979
But one easy way, in this case, is to just look for the star.

75
00:06:26,979 --> 00:06:31,579
And if you see that the next one is a star, then you've got everything you need for the

76
00:06:31,579 --> 00:06:33,620
epsilon transition.

77
00:06:33,620 --> 00:06:38,459
So in this case, the next one is a star.

78
00:06:38,459 --> 00:06:49,419
So we'll add those epsilon transitions from 2 to 3 and from 3 to 2.

79
00:06:49,419 --> 00:06:55,259
And adding epsilon transitions, that's just adding edges to the diagram.

80
00:06:55,259 --> 00:06:59,459
Then we close that just takes us to the next state.

81
00:06:59,459 --> 00:07:02,459
We took care of the other two earlier.

82
00:07:02,459 --> 00:07:06,500
Now we have an alphabet symbol, that's the B. So we just put in the transition to the

83
00:07:06,500 --> 00:07:07,500
next state.

84
00:07:07,500 --> 00:07:12,100
But all we do for an or is put it on the stack.

85
00:07:12,100 --> 00:07:17,860
And now we've got for A, we've got the match transition for C, we have the match transition.

86
00:07:17,860 --> 00:07:23,180
And now we have the first right parenthesis.

87
00:07:23,180 --> 00:07:30,459
So this right parenthesis, so one thing we first thing we do is add an epsilon transition

88
00:07:30,459 --> 00:07:32,459
over to the next state.

89
00:07:32,459 --> 00:07:36,019
But then we go to the push down stack and we pop.

90
00:07:36,019 --> 00:07:41,899
And if the thing at the top of the stack is an or, then that's one thing, piece of information

91
00:07:41,899 --> 00:07:43,459
that we need.

92
00:07:43,459 --> 00:07:49,219
The other piece of information we need is the position of the corresponding left parenthesis.

93
00:07:49,219 --> 00:07:51,579
And that'll be the next thing in the stack.

94
00:07:51,579 --> 00:07:54,139
So we add the transition.

95
00:07:54,139 --> 00:07:57,979
We pop the or off the stack.

96
00:07:57,979 --> 00:08:00,620
And we pop the one off the stack.

97
00:08:00,620 --> 00:08:04,659
And that gives us the information that we need to put in the epsilon transitions.

98
00:08:04,660 --> 00:08:05,660
And that's state 8.

99
00:08:05,660 --> 00:08:09,220
We put one from the or to 8.

100
00:08:09,220 --> 00:08:12,500
And then we put one from the 1 to the or plus 1.

101
00:08:12,500 --> 00:08:15,580
That's what we need to do.

102
00:08:15,580 --> 00:08:20,580
And look for a star, same way as we did for one character.

103
00:08:20,580 --> 00:08:25,580
Now in this case, we have a no star.

104
00:08:25,580 --> 00:08:29,500
So we just do the find an alphabet symbol.

105
00:08:29,500 --> 00:08:32,100
We add the match transition.

106
00:08:32,100 --> 00:08:34,620
And now we have the right parenthesis.

107
00:08:34,620 --> 00:08:39,620
And so we pop the corresponding left parenthesis.

108
00:08:39,620 --> 00:08:44,059
And it's not an or.

109
00:08:44,059 --> 00:08:50,259
So in this case, there's nothing to do except do the epsilon transition to the except state.

110
00:08:50,259 --> 00:08:56,580
So that's the process for each character in the regular expression as well to find what

111
00:08:56,580 --> 00:08:57,580
we do.

112
00:08:57,580 --> 00:09:03,060
Left parenthesis in or we put onto the stack.

113
00:09:03,060 --> 00:09:06,980
Characters, we do the match transitions and right parenthesis.

114
00:09:06,980 --> 00:09:07,980
We do a pop.

115
00:09:07,980 --> 00:09:14,900
And if it's an or put in the or transition, otherwise we do the look at it, check for the star.

116
00:09:14,900 --> 00:09:22,379
And that's the demo of the construction for non-deterministic, panics data.

117
00:09:22,379 --> 00:09:27,259
So it's actually a remarkably simple process.

118
00:09:27,259 --> 00:09:31,620
We figured out what to do for each character in the regular expression.

119
00:09:31,620 --> 00:09:35,980
And this is the second part of the regular expression pattern matching algorithm, which

120
00:09:35,980 --> 00:09:37,779
is constructing the NSA.

121
00:09:37,779 --> 00:09:42,379
And again, it's remarkably little code.

122
00:09:42,379 --> 00:09:50,620
So it's a routine that builds the epsilon transition.

123
00:09:50,620 --> 00:09:53,299
This is as part of the NSA.

124
00:09:53,299 --> 00:10:03,139
So it's got the regular expression as an instance variable to refer to.

125
00:10:03,139 --> 00:10:11,220
And it's going to build a new diagram with one extra state, the except state, n plus

126
00:10:11,220 --> 00:10:17,060
one if the regular expression has m characters.

127
00:10:17,060 --> 00:10:22,899
So the nm we maintain a stack, which is just integers.

128
00:10:22,899 --> 00:10:28,820
And for every character in a regular expression, we do the processing that we just described.

129
00:10:28,820 --> 00:10:35,740
If it's a left parenthesis or an or, we just put it onto the stack.

130
00:10:35,740 --> 00:10:37,419
And that's it.

131
00:10:37,419 --> 00:10:41,820
If it's a right parenthesis, then we pop.

132
00:10:41,820 --> 00:10:47,860
If that pop is an or, then we put in the two edges to skip the or.

133
00:10:47,860 --> 00:10:53,620
And otherwise, we look ahead and do the closure exactly as described.

134
00:10:53,620 --> 00:10:58,220
And if it's any one of the metal symbols, we just put in an epsilon transition to the next

135
00:10:58,220 --> 00:10:59,220
edge.

136
00:10:59,220 --> 00:11:05,220
And again, remarkably, little code to go ahead and construct the NFA for a given regular

137
00:11:05,220 --> 00:11:07,420
expression.

138
00:11:07,420 --> 00:11:12,060
And so the final step is the analysis that's going to take time and space proportional

139
00:11:12,060 --> 00:11:13,580
to m.

140
00:11:13,580 --> 00:11:21,660
And that's immediate because for every character, we do most of the two stack operations and

141
00:11:21,660 --> 00:11:24,220
add at most three epsilon transitions.

142
00:11:24,220 --> 00:11:26,940
And this is a generous upper bound.

143
00:11:26,940 --> 00:11:31,260
Space proportional to the number of characters in the regular expression.

144
00:11:31,260 --> 00:11:33,660
So that's how we get the NFA constructed.

