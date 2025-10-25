---
title: CS143 P36Week407 01 B+Predictive+Parsing
---

1
00:00:00,000 --> 00:00:05,000
So here's the left factor grammar now typed out neatly.

2
00:00:05,000 --> 00:00:10,000
And we use this grammar to construct a parsing table.

3
00:00:10,000 --> 00:00:14,000
And let's not worry right now about how we got this table.

4
00:00:14,000 --> 00:00:18,000
I'm not going to give the algorithm right now.

5
00:00:18,000 --> 00:00:21,000
But let's just say that we got it somehow.

6
00:00:21,000 --> 00:00:24,000
And what I'm going to explain is how we use the table.

7
00:00:24,000 --> 00:00:29,000
So one dimension of the table is the current left most non-terminal

8
00:00:29,000 --> 00:00:33,000
in the parse tree. So that's on the rows.

9
00:00:33,000 --> 00:00:37,000
And then the columns represent the next input token.

10
00:00:37,000 --> 00:00:39,000
So the next token in the input stream.

11
00:00:39,000 --> 00:00:43,000
And then the entry is the right hand side of the production to use.

12
00:00:43,000 --> 00:00:46,000
So which production that we should use at that point in the parse.

13
00:00:46,000 --> 00:00:49,000
That's the production that's predicted.

14
00:00:49,000 --> 00:00:51,000
So let's do an example.

15
00:00:51,000 --> 00:00:54,000
So let's look at the e-int entry.

16
00:00:54,000 --> 00:00:56,000
So this entry right here.

17
00:00:56,000 --> 00:00:59,000
And what this says is that when the current non-terminal is e,

18
00:00:59,000 --> 00:01:02,000
meaning the left most non-terminal in the parse tree.

19
00:01:02,000 --> 00:01:03,000
And the next input is in.

20
00:01:03,000 --> 00:01:06,000
The thing that we see coming up in the input is an integer.

21
00:01:06,000 --> 00:01:08,000
Then we should use the production e-goes to tx.

22
00:01:08,000 --> 00:01:16,000
So we should expand e with the children tx.

23
00:01:16,000 --> 00:01:17,000
Let's do another example.

24
00:01:17,000 --> 00:01:21,000
So when the current non-terminal is y,

25
00:01:21,000 --> 00:01:25,000
and the current token, the current input is plus,

26
00:01:25,000 --> 00:01:29,000
then we should use the production y goes to epsilon.

27
00:01:29,000 --> 00:01:32,000
Okay, what that says is it's a little bit different situation.

28
00:01:32,000 --> 00:01:34,000
The previous one, it says look,

29
00:01:34,000 --> 00:01:39,000
when you see a plus in the input and your current left most non-terminal is y,

30
00:01:39,000 --> 00:01:43,000
the only way this parse is going to succeed is if the y doesn't produce anything.

31
00:01:43,000 --> 00:01:47,000
You need to get rid of the y and move on to another non-terminal,

32
00:01:47,000 --> 00:01:50,000
whichever one is left most after you get rid of the y.

33
00:01:51,000 --> 00:01:56,000
If you want to have any hope of parsing this particular string.

34
00:01:56,000 --> 00:02:00,000
And finally, notice that a lot of the entries are blank.

35
00:02:00,000 --> 00:02:02,000
And those are error entries.

36
00:02:02,000 --> 00:02:05,000
So let's take a look at the e-star entry.

37
00:02:05,000 --> 00:02:09,000
That says that if the left most non-terminal is e,

38
00:02:09,000 --> 00:02:13,000
and the next input token is a time symbol of star,

39
00:02:13,000 --> 00:02:16,000
well, then there is no moves that you can make.

40
00:02:16,000 --> 00:02:19,000
There is no production you can use for e.

41
00:02:19,000 --> 00:02:22,000
That's going to successfully parse that input.

42
00:02:22,000 --> 00:02:28,000
And this is the point at which you would raise a parsing error.

43
00:02:28,000 --> 00:02:32,000
In the rest of this video, I'm going to give the algorithm for parsing using a parsing table.

44
00:02:32,000 --> 00:02:36,000
And then in future videos, we'll explain how to construct a parsing table.

45
00:02:36,000 --> 00:02:41,000
So the method for parsing using a parsing table is similar to recursive descent.

46
00:02:41,000 --> 00:02:44,000
Except that for the left most non-terminal s in the tree,

47
00:02:44,000 --> 00:02:46,000
we look at the next input token a.

48
00:02:46,000 --> 00:02:49,000
And then as we just illustrated with the examples,

49
00:02:49,000 --> 00:02:58,000
we look up in the table the production to use at the entry s comma a.

50
00:02:58,000 --> 00:03:03,000
And instead of using recursive functions to trace out the parse tree,

51
00:03:03,000 --> 00:03:08,000
we're going to have a stack of records that can record the frontier.

52
00:03:08,000 --> 00:03:11,000
And so at any point in the parse tree,

53
00:03:11,000 --> 00:03:14,000
we will have some non-terminals that have yet to be expanded.

54
00:03:14,000 --> 00:03:17,000
Those were always at the frontier, at the current leaves of the parse tree.

55
00:03:17,000 --> 00:03:20,000
And also there are some terminals that we have yet to match against.

56
00:03:20,000 --> 00:03:23,000
And those will all be recorded on a stack.

57
00:03:23,000 --> 00:03:28,000
And the important property of the stack is that the left most pending terminal or non-terminal

58
00:03:28,000 --> 00:03:30,000
is always at the top of the stack.

59
00:03:30,000 --> 00:03:35,000
So the either the terminal we're trying to match or the non-terminal we're trying to expand

60
00:03:35,000 --> 00:03:38,000
will always be on top of our stack.

61
00:03:38,000 --> 00:03:40,000
We'll reject if we reach an error state.

62
00:03:40,000 --> 00:03:44,000
So if we look up one of those empty entries in the table, we will reject the string.

63
00:03:44,000 --> 00:03:48,000
And we'll accept if we reach the end of the input and we have an empty stack,

64
00:03:48,000 --> 00:03:53,000
meaning we have no pending unmatched terminals or unexpanded non-terminals.

65
00:03:55,000 --> 00:03:57,000
So here's the algorithm.

66
00:03:57,000 --> 00:04:03,000
We initialize the stack to just the start symbol s and the special symbol dollar sign.

67
00:04:03,000 --> 00:04:06,000
And dollar sign is not part of the alphabet.

68
00:04:07,000 --> 00:04:11,000
Or you can think of it we extend whatever our alphabet is with a new symbol called dollar sign.

69
00:04:11,000 --> 00:04:16,000
Dollar sign marks the bottom of the stack and you can think of it also is marking the end of input.

70
00:04:16,000 --> 00:04:21,000
So this is just a way of recording where the end of the input is going to be.

71
00:04:21,000 --> 00:04:28,000
Okay, so once we've matched something against s, then whatever is left had better be at the end of the input.

72
00:04:28,000 --> 00:04:31,000
That's what that stack expresses.

73
00:04:31,000 --> 00:04:33,000
And now we're in a loop.

74
00:04:33,000 --> 00:04:40,000
So we're going to repeat the following moves until we can't repeat them anymore until the stack is empty.

75
00:04:40,000 --> 00:04:43,000
Okay, and there's two possible moves.

76
00:04:43,000 --> 00:04:45,000
Let's do the terminals first.

77
00:04:45,000 --> 00:04:47,000
So let's say the top of our stack is a terminal.

78
00:04:47,000 --> 00:04:51,000
So here we're dividing the stack into the top of the stack and the rest of the stack.

79
00:04:51,000 --> 00:04:55,000
So what are we going to do if the top of the stack of the terminal?

80
00:04:55,000 --> 00:04:57,000
Well, we're going to try to match the input.

81
00:04:57,000 --> 00:05:02,000
So we're going to say, well, at the top of the stack, the terminal on top of the stack matches the next thing in the input.

82
00:05:02,000 --> 00:05:05,000
Then we advance the input.

83
00:05:05,000 --> 00:05:07,000
And we pop the stack.

84
00:05:07,000 --> 00:05:12,000
So we have successfully matched the input against the terminal.

85
00:05:12,000 --> 00:05:18,000
And so that terminal is done and we should progress into the stack and match the next thing that hasn't been handled yet.

86
00:05:18,000 --> 00:05:24,000
And if they don't match, if the terminal that we're looking at doesn't match the next thing in the input, well, that's an error.

87
00:05:24,000 --> 00:05:26,000
We don't have any backtracking here.

88
00:05:26,000 --> 00:05:28,000
There's no way to parse the string.

89
00:05:28,000 --> 00:05:29,000
And so we'll raise an error.

90
00:05:29,000 --> 00:05:34,000
Now the second class of moves is deals with the non-terminal.

91
00:05:34,000 --> 00:05:37,000
So let's say that the top of the stack is a non-terminal X.

92
00:05:37,000 --> 00:05:43,000
And remember that the top of the stack will be a non-terminal exactly when that is the leftmost non-terminal.

93
00:05:43,000 --> 00:05:50,000
So now what we do is we look at our parsing table under the entry for X and the next input symbol.

94
00:05:50,000 --> 00:05:54,000
And that should give us the right hand side of a production.

95
00:05:54,000 --> 00:06:02,000
And now what we do is we pop X off the stack and we push the children of X in the parse tree onto the stack.

96
00:06:02,000 --> 00:06:04,000
So this is the way we expand X.

97
00:06:04,000 --> 00:06:10,000
So now the leftmost unhandle thing in the parse is going to be Y1 because that's the first child of X.

98
00:06:10,000 --> 00:06:14,000
And then all the other children of X are next and then whatever else is in the stack.

99
00:06:14,000 --> 00:06:24,000
And if there's no entry for the current non-terminal and input in the table, then that's an error and the parsing stops.

100
00:06:27,000 --> 00:06:31,000
So let's work through an example using our parsing table.

101
00:06:31,000 --> 00:06:34,000
And you might want to refer back to the parsing table.

102
00:06:34,000 --> 00:06:37,000
I have not included here because there isn't space for it.

103
00:06:37,000 --> 00:06:44,000
But I'll work through it and you can go back and look at it at some point and convince yourself that I made the right moves.

104
00:06:44,000 --> 00:06:48,000
So initially our stack is E $ sign.

105
00:06:48,000 --> 00:06:51,000
So E was our start symbol and $ is our end of input symbol.

106
00:06:51,000 --> 00:06:56,000
And our input, we're going to try to parse the input in times int. That's what we want to parse.

107
00:06:56,000 --> 00:06:58,000
And then of course we have our new symbol $ sign.

108
00:06:58,000 --> 00:07:00,000
We'll tack that on to the end of the input.

109
00:07:00,000 --> 00:07:06,000
And if all goes well, the dollar sign on the stack will match up against the dollar sign at the end of the input.

110
00:07:06,000 --> 00:07:13,000
Again, dollar sign here is just a way of marking the end of the input and expressing that we need to parse the entire input.

111
00:07:13,000 --> 00:07:24,000
And so now if you look up the E int entry, so the first terminal and the next terminal in the input and the leftmost terminal in our parse,

112
00:07:24,000 --> 00:07:29,000
you will see that what the action we're supposed to take is to use the production egos to tx.

113
00:07:29,000 --> 00:07:34,000
And let me over here at the same time instruct our parse tree.

114
00:07:34,000 --> 00:07:40,000
So initially our stack, again the stack is the frontier of the parse tree.

115
00:07:40,000 --> 00:07:43,000
Initially all we have is the root of the parse tree and that is its own frontier.

116
00:07:43,000 --> 00:07:46,000
It's just one symbol. We haven't processed it yet.

117
00:07:46,000 --> 00:07:49,000
And so E is on the stack.

118
00:07:49,000 --> 00:07:51,000
E is unexpended in the parse tree.

119
00:07:51,000 --> 00:07:54,000
And now we're going to use the production egos to tx.

120
00:07:54,000 --> 00:07:58,000
So we'll have t and x added as children.

121
00:07:58,000 --> 00:08:01,000
What happens next? Well, E is popped off the stack.

122
00:08:01,000 --> 00:08:04,000
t and x are pushed onto the stack.

123
00:08:04,000 --> 00:08:08,000
And now notice the frontier of the parse tree is tx.

124
00:08:08,000 --> 00:08:13,000
So these are the unprocessed leaves either unmatched input or unexpended non-terminals.

125
00:08:13,000 --> 00:08:18,000
And in fact the stack records exactly which one is leftmost.

126
00:08:18,000 --> 00:08:22,000
So t is at the top of the stack. X is below it on the stack.

127
00:08:22,000 --> 00:08:25,000
Okay, well we still haven't consumed any input.

128
00:08:25,000 --> 00:08:30,000
And now if we look at the t int entry, it says to use t goes to int y.

129
00:08:30,000 --> 00:08:34,000
And so now we can expand t by int y.

130
00:08:34,000 --> 00:08:38,000
And now what's going to happen is t is popped off the stack.

131
00:08:38,000 --> 00:08:41,000
Int and y are pushed onto the stack.

132
00:08:41,000 --> 00:08:44,000
And now notice the stack is int yx from top to bottom.

133
00:08:44,000 --> 00:08:49,000
The frontier of the parse tree is int yx.

134
00:08:49,000 --> 00:08:51,000
Okay.

135
00:08:51,000 --> 00:08:54,000
And now we have a case where we have a terminal on top of the stack.

136
00:08:54,000 --> 00:08:57,000
And so now we're going to try to match it against the first terminal in the input.

137
00:08:57,000 --> 00:09:01,000
And indeed they match. And so what happens is int is popped off the stack.

138
00:09:01,000 --> 00:09:04,000
And the terminal, sorry the input pointer advances in the input.

139
00:09:04,000 --> 00:09:08,000
And here I've recorded that by just discarding the portion of the input that we've processed.

140
00:09:08,000 --> 00:09:10,000
So now we have times in int left to go.

141
00:09:10,000 --> 00:09:13,000
And the int has been removed from the stack.

142
00:09:13,000 --> 00:09:16,000
And so now what's on top of the stack is y.

143
00:09:16,000 --> 00:09:20,000
Y is indeed the leftmost unprocessed thing on the frontier.

144
00:09:20,000 --> 00:09:25,000
And the table says that for non-terminal y,

145
00:09:25,000 --> 00:09:32,000
on input times we should use production y goes to times t.

146
00:09:32,000 --> 00:09:35,000
So let's put that in here.

147
00:09:35,000 --> 00:09:39,000
And now what's going to happen, y is going to be popped off the stack.

148
00:09:39,000 --> 00:09:41,000
Times t is going to be pushed onto the stack.

149
00:09:41,000 --> 00:09:51,000
And now notice our stack is times tx and the frontier, the unprocessed frontier of the parse tree is times tx.

150
00:09:51,000 --> 00:09:54,000
So now we have a terminal on top of the stack.

151
00:09:54,000 --> 00:09:56,000
It matches the next terminal in the input.

152
00:09:56,000 --> 00:10:00,000
So we pop the terminal off the stack. We advance the input pointer.

153
00:10:00,000 --> 00:10:03,000
Now we have t is our leftmost non-terminal.

154
00:10:03,000 --> 00:10:06,000
Int is the next thing in the input stream.

155
00:10:06,000 --> 00:10:18,000
And the table says, well in this situation we should use the production t goes to int y.

156
00:10:18,000 --> 00:10:21,000
What does that mean? That means t gets popped off the stack.

157
00:10:21,000 --> 00:10:23,000
Int and y get pushed onto the stack.

158
00:10:23,000 --> 00:10:31,000
Notice that the stack is in yx and the unprocessed frontier of the parse tree from left to right is int yx.

159
00:10:31,000 --> 00:10:33,000
Once again, we have a terminal on top of the stack.

160
00:10:33,000 --> 00:10:36,000
We match it against the next terminal in the input stream.

161
00:10:36,000 --> 00:10:38,000
They match.

162
00:10:38,000 --> 00:10:40,000
And now we have consumed all the input.

163
00:10:40,000 --> 00:10:43,000
Dollar sign is the only thing left to go in the input.

164
00:10:43,000 --> 00:10:45,000
But our stack is not empty.

165
00:10:45,000 --> 00:10:48,000
So at this point, what does that mean?

166
00:10:48,000 --> 00:10:55,000
Well, if the stack is not empty and we're out of input, then everything that's left on the stack had better generate the empty string.

167
00:10:55,000 --> 00:10:58,000
So we better be using only epsilon productions from here on out.

168
00:10:58,000 --> 00:11:05,000
And indeed, the table says that when y is our next non-terminal and dollar sign,

169
00:11:05,000 --> 00:11:10,000
we're at the end of the input, we should use the production y goes to epsilon.

170
00:11:10,000 --> 00:11:14,000
So y goes to epsilon. That means y just gets popped off the stack.

171
00:11:14,000 --> 00:11:17,000
Epsilon gets pushed on the stack. Epsilon is the empty string.

172
00:11:17,000 --> 00:11:19,000
So nothing gets pushed on the stack.

173
00:11:19,000 --> 00:11:21,000
And now we're down to x.

174
00:11:21,000 --> 00:11:28,000
And in the situation where x is the next non-terminal, dollar sign is where at the end of the input.

175
00:11:28,000 --> 00:11:31,000
So dollar sign is our next symbol.

176
00:11:31,000 --> 00:11:37,000
Then the table also says to use production x goes to epsilon.

177
00:11:37,000 --> 00:11:43,000
And then what happens? Well, x gets popped off the stack and nothing gets pushed on because the production was x goes to the empty string.

178
00:11:43,000 --> 00:11:48,000
And now we see we have dollar sign on top of the stack, dollar sign in the input.

179
00:11:48,000 --> 00:11:50,000
And so we have emptied the stack.

180
00:11:50,000 --> 00:11:56,000
We have reached the end of the input. And so we accept that is a successful parse.

