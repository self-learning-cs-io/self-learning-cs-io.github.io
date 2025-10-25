---
title: CS143 P21Week305 02 A+Context+Free+Grammars
---

1
00:00:00,000 --> 00:00:07,560
In this video, we're going to begin our discussion of parsing technology with context-free

2
00:00:07,560 --> 00:00:12,960
grammars.

3
00:00:12,960 --> 00:00:18,120
Now as we know, not all strings of tokens are actually valid programs and the parser has

4
00:00:18,120 --> 00:00:19,600
to tell the difference.

5
00:00:19,600 --> 00:00:23,920
It has to know which strings of tokens are valid and which ones are invalid and give

6
00:00:23,920 --> 00:00:26,440
error messages for the invalid ones.

7
00:00:26,440 --> 00:00:31,400
So we need some way of describing the valid strings of tokens and then some kind of algorithm

8
00:00:31,400 --> 00:00:36,679
for distinguishing the valid and invalid strings of tokens from each other.

9
00:00:36,679 --> 00:00:43,760
Now, we've also discussed that programming languages have a natural recursive structure.

10
00:00:43,760 --> 00:00:50,200
So for example, in cool, an expression can be any one of a very large number of things.

11
00:00:50,200 --> 00:00:54,240
So two of the things it can be are an if expression and a while expression.

12
00:00:54,240 --> 00:00:58,640
So these expressions are themselves recursively composed of other expressions.

13
00:00:58,640 --> 00:01:03,480
So for example, the predicate of an if is a itself an expression as is the then branch

14
00:01:03,480 --> 00:01:10,079
and the else branch and in a while loop, the termination test is an expression and so

15
00:01:10,079 --> 00:01:12,359
is the loop body.

16
00:01:12,359 --> 00:01:20,480
And context-free grammars are a natural notation for describing such recursive structures.

17
00:01:20,480 --> 00:01:22,200
So what is a context-free grammar?

18
00:01:22,200 --> 00:01:28,960
So formally, consists of a set of terminals, t, a set of non-terminals, n, a start symbol

19
00:01:28,960 --> 00:01:35,200
s and s is one of the non-terminals and a set of productions.

20
00:01:35,200 --> 00:01:36,200
And what's a production?

21
00:01:36,200 --> 00:01:44,079
A production is a symbol followed by an arrow followed by a list of symbols.

22
00:01:44,079 --> 00:01:46,960
And these symbols, there are certain rules about them.

23
00:01:46,959 --> 00:01:52,280
So the x thing on the left hand side of the arrow has to be a non-terminal.

24
00:01:52,280 --> 00:01:54,199
That's what it means to be on the left hand side.

25
00:01:54,199 --> 00:01:58,919
So the set of things on the left hand side of productions are exactly the non-terminals.

26
00:01:58,919 --> 00:02:04,919
And then the right hand side, every yi on the right hand side, can be either a non-terminal

27
00:02:04,919 --> 00:02:14,359
or it can be a terminal or it can be the special symbol epsilon.

28
00:02:14,360 --> 00:02:17,640
So let's do a simple example of a context-free grammar.

29
00:02:17,640 --> 00:02:22,960
Strings of balanced parentheses, which we discussed in an earlier video, can be expressed as

30
00:02:22,960 --> 00:02:23,960
follows.

31
00:02:23,960 --> 00:02:26,600
So we have our start symbol.

32
00:02:26,600 --> 00:02:31,680
And one possibility for a string of balanced parentheses is that it consists of an open

33
00:02:31,680 --> 00:02:37,320
parent, another string of balanced parentheses and a closed parent.

34
00:02:37,320 --> 00:02:41,000
And the other possibility for a string of balanced parentheses is that it's empty because

35
00:02:41,000 --> 00:02:44,520
the empty string is also a string of balanced parentheses.

36
00:02:44,520 --> 00:02:47,879
So there are two productions for this grammar.

37
00:02:47,879 --> 00:02:54,319
And just to go over the, to relate this example to the formal definition we gave on the previous

38
00:02:54,319 --> 00:02:57,960
slide, what is our set of non-terminals?

39
00:02:57,960 --> 00:03:07,199
It's just the single non-terminal S. What are our terminal symbols in this context-free

40
00:03:07,199 --> 00:03:08,199
grammar?

41
00:03:08,199 --> 00:03:10,400
It's just open and closed perenn.

42
00:03:10,560 --> 00:03:12,719
There are no other symbols.

43
00:03:12,719 --> 00:03:13,719
What's the start symbol?

44
00:03:13,719 --> 00:03:14,719
Well, it's as.

45
00:03:14,719 --> 00:03:15,719
It's the only non-terminal.

46
00:03:15,719 --> 00:03:17,840
So it has to be the start symbol.

47
00:03:17,840 --> 00:03:23,000
But generally, when we give grammars, the first production will name the start symbol.

48
00:03:23,000 --> 00:03:27,360
So rather than name it explicitly, whichever production occurs first, the symbol on the

49
00:03:27,360 --> 00:03:34,480
left-hand side will be the non-terminal for that particular context-free grammar.

50
00:03:34,480 --> 00:03:36,680
And then finally, what are the productions?

51
00:03:36,680 --> 00:03:39,319
Well, we said it could be a set of productions.

52
00:03:39,319 --> 00:03:44,759
And here are the two productions for this particular context-free grammar.

53
00:03:44,759 --> 00:03:49,759
Now, productions can be read as rules.

54
00:03:49,759 --> 00:03:56,400
So let's write down one of our productions from the, from the example grammar.

55
00:03:56,400 --> 00:03:57,400
And what does this mean?

56
00:03:57,400 --> 00:04:02,959
This means wherever we see an S, we can replace it by the string of symbols on the right-hand

57
00:04:02,959 --> 00:04:03,959
side.

58
00:04:03,960 --> 00:04:07,840
So wherever I see an S, I can substitute in.

59
00:04:07,840 --> 00:04:08,920
I can take the S out.

60
00:04:08,920 --> 00:04:09,920
It's as important.

61
00:04:09,920 --> 00:04:12,640
I remove the S that appears on the left side.

62
00:04:12,640 --> 00:04:15,960
And I replace it by the string of symbols on the right-hand side.

63
00:04:15,960 --> 00:04:18,240
So productions can be read as replacement rules.

64
00:04:18,240 --> 00:04:23,400
The right-hand side replaces the left-hand side.

65
00:04:23,400 --> 00:04:26,560
So here's a little more formal description of that process.

66
00:04:26,560 --> 00:04:31,079
We begin with a string that has only the start symbol S. So we always start with just the

67
00:04:31,079 --> 00:04:33,120
start symbol.

68
00:04:33,120 --> 00:04:35,920
And now we look at our string.

69
00:04:35,920 --> 00:04:38,920
Initially, it's just a start symbol, but it changes over time.

70
00:04:38,920 --> 00:04:43,959
And we can replace any non-terminal in the string by the right-hand side of some production

71
00:04:43,959 --> 00:04:44,959
for that non-terminal.

72
00:04:44,959 --> 00:04:50,680
So for example, I can replace the non-terminal X by the right-hand side of some production

73
00:04:50,680 --> 00:04:51,680
for X.

74
00:04:51,680 --> 00:04:54,720
In this case, X goes to Y1 through Yn.

75
00:04:54,720 --> 00:04:59,160
And then we just repeat step two over and over again until there are no non-terminals

76
00:04:59,160 --> 00:05:02,680
left, until the string consists of only terminals.

77
00:05:02,680 --> 00:05:05,959
At that point, we're done.

78
00:05:05,959 --> 00:05:12,600
So to write this out slightly more formally, a single step here consists of a state, which

79
00:05:12,600 --> 00:05:14,280
is a string of symbols.

80
00:05:14,280 --> 00:05:20,519
And these can be terminals and non-terminals.

81
00:05:20,519 --> 00:05:23,639
And somewhere in this string is a non-terminal X.

82
00:05:23,639 --> 00:05:28,160
And there is a production for X in our grammar.

83
00:05:28,160 --> 00:05:30,160
So this is part of the grammar.

84
00:05:30,160 --> 00:05:35,320
This is a production.

85
00:05:35,320 --> 00:05:45,760
And we can use that production to take a step from to a new state where we have replaced

86
00:05:45,760 --> 00:05:52,879
X by the right-hand side of the production.

87
00:05:52,879 --> 00:06:01,480
So this is one step of a context-free derivation.

88
00:06:01,480 --> 00:06:08,319
So now if we want to do multiple steps, we could have a bunch of steps alpha 0 goes to

89
00:06:08,319 --> 00:06:10,600
alpha 1, goes to alpha 2.

90
00:06:10,600 --> 00:06:12,240
And these are strings now.

91
00:06:12,240 --> 00:06:13,959
These alphas are all strings.

92
00:06:13,959 --> 00:06:18,759
And as we go along, we eventually get to some string alpha n.

93
00:06:18,759 --> 00:06:25,000
And then we say that alpha 0 rewrites in 0 or more steps to alpha n.

94
00:06:25,000 --> 00:06:32,480
So this means in 0 greater than or equal to 0 steps.

95
00:06:32,480 --> 00:06:37,319
So this is just a shorthand for saying there is some sequence of individual productions.

96
00:06:37,319 --> 00:06:42,319
Individual rules being applied to a string that gets us from the string alpha 0 to the

97
00:06:42,319 --> 00:06:43,319
string alpha n.

98
00:06:43,319 --> 00:06:46,159
And remember that in general, we start with just the start symbol.

99
00:06:46,160 --> 00:06:50,680
And so we have a whole bunch of sequence of steps like this that get us from the start

100
00:06:50,680 --> 00:06:56,000
symbol to some other string.

101
00:06:56,000 --> 00:07:00,080
So finally, we can define the language of a context-free grammar.

102
00:07:00,080 --> 00:07:05,360
So let G be a context-free grammar and has a start symbol S. So then the language of the

103
00:07:05,360 --> 00:07:12,160
context-free grammar is going to be the string of symbols alpha 1 through alpha n such that

104
00:07:12,160 --> 00:07:21,600
for all i, alpha i is an element of the terminals of G. So T here is a set of terminals of G.

105
00:07:21,600 --> 00:07:31,720
And the start symbol S goes in 0 or more steps to alpha 1, sorry, a1 to a n.

106
00:07:31,720 --> 00:07:32,720
And so what is this saying?

107
00:07:32,720 --> 00:07:37,360
This is just saying that all the strings of terminals that I can derive beginning with

108
00:07:37,360 --> 00:07:45,000
just the start symbol, those are the strings in the language.

109
00:07:45,000 --> 00:07:49,040
So the name terminal comes from the fact that once terminals are included in the string,

110
00:07:49,040 --> 00:07:50,759
there's no rule for replacing them.

111
00:07:50,759 --> 00:07:55,960
That is, once a terminal is generated, it's a permanent feature of the string.

112
00:07:55,960 --> 00:07:59,639
And in applications to programming languages and context-free grammar, the terminals ought

113
00:07:59,639 --> 00:08:05,639
to be the tokens of the language that we are modeling with our context-free grammar.

114
00:08:08,199 --> 00:08:12,080
With that in mind, let's write a context-free grammar for a fragment of cool.

115
00:08:12,080 --> 00:08:18,920
So cool expressions, we talked about these earlier, but one possibility for a cool expression

116
00:08:18,920 --> 00:08:23,600
is that it's an if statement or an if expression.

117
00:08:23,600 --> 00:08:33,680
And recall that cool if statements have three parts.

118
00:08:33,679 --> 00:08:38,159
And they end with the keyword fee, which is a little bit unusual.

119
00:08:38,159 --> 00:08:44,799
And so looking at this particular rule, we can see some conventions that are pre-standard

120
00:08:44,799 --> 00:08:45,879
and that we'll use.

121
00:08:45,879 --> 00:08:48,919
So the non-terminals are in all caps.

122
00:08:48,919 --> 00:08:51,799
So in this case, it's just one non-termal, but you always write that in caps.

123
00:08:51,799 --> 00:08:57,000
And then the terminal symbols are in lower case.

124
00:08:57,000 --> 00:09:12,240
And another possibility is that it could be a while expression.

125
00:09:12,240 --> 00:09:19,240
And finally, a last possibility is that it could be an identifier ID.

126
00:09:19,240 --> 00:09:22,320
And there are actually many, many more possibilities.

127
00:09:22,320 --> 00:09:25,639
There are lots of other cases for expressions.

128
00:09:25,639 --> 00:09:30,279
So let me show you one bit of notation to make things look a little bit nicer.

129
00:09:30,279 --> 00:09:35,639
So we have many productions for the same non-terminal.

130
00:09:35,639 --> 00:09:37,960
We usually group those together in the grammar.

131
00:09:37,960 --> 00:09:41,279
And we only write the non-terminal on the right-hand side once.

132
00:09:41,279 --> 00:09:43,600
And then we write explicit alternative.

133
00:09:43,600 --> 00:09:49,159
So this is actually completely the same as writing out expert arrow two more times.

134
00:09:49,159 --> 00:09:53,399
But here, this is just a way of grouping these three productions together and saying that

135
00:09:53,399 --> 00:09:59,639
expr is the non-terminal for all three right-hand sides.

136
00:09:59,639 --> 00:10:03,639
Let's take a look at some of the strings in the language of this context free grammar.

137
00:10:03,639 --> 00:10:06,159
So a valid cool expression is just a single identifier.

138
00:10:06,159 --> 00:10:10,159
And that's easy to see because expr is our start symbol.

139
00:10:10,159 --> 00:10:11,840
I'll call it expert.

140
00:10:11,840 --> 00:10:12,840
And there's a production.

141
00:10:12,840 --> 00:10:14,039
It just says it goes to ID.

142
00:10:14,039 --> 00:10:16,679
So I can take the start symbol directly to a string of terminals.

143
00:10:16,679 --> 00:10:21,319
A single variable name is a valid cool expression.

144
00:10:21,320 --> 00:10:27,400
Another example is an if expression where each of the sub-expressions is just a variable

145
00:10:27,400 --> 00:10:28,400
name.

146
00:10:28,400 --> 00:10:32,640
So this is perfectly fine, structure for a cool expression.

147
00:10:32,640 --> 00:10:35,600
Similarly, I can do the same thing with a wild expression.

148
00:10:35,600 --> 00:10:41,000
I can take the structure of a wild and then replace each of the sub-expressions just with

149
00:10:41,000 --> 00:10:42,160
a single variable name.

150
00:10:42,160 --> 00:10:48,080
And that would be a syntactically valid cool wild loop.

151
00:10:48,080 --> 00:10:49,960
There are more complicated expressions.

152
00:10:49,960 --> 00:10:54,560
So for example, here we have a wild loop as the predicate of an if expression, not something

153
00:10:54,560 --> 00:10:58,879
that you might normally think of writing, but perfectly well-formed syntactically.

154
00:10:58,879 --> 00:11:04,879
Similarly, I could have an if statement or an if expression as the predicate of an inside

155
00:11:04,879 --> 00:11:06,519
of an if expression.

156
00:11:06,519 --> 00:11:12,160
So nested if expressions like this one are also syntactically valid.

157
00:11:12,160 --> 00:11:16,080
Let's do another grammar.

158
00:11:16,080 --> 00:11:19,000
This time for simple arithmetic expressions.

159
00:11:19,000 --> 00:11:24,000
So we'll have our start symbol and only non-terminal for this grammar be called e.

160
00:11:24,000 --> 00:11:25,080
And what are the possibilities?

161
00:11:25,080 --> 00:11:29,080
Well, e could be the sum of expressions.

162
00:11:29,080 --> 00:11:32,080
Or, and remember, this is an alternative notation for e-arrows.

163
00:11:32,080 --> 00:11:36,679
It's just a way of saying I'm going to use the same non-terminal for another production.

164
00:11:36,679 --> 00:11:42,399
We could have the sum of two expressions or we could have the multiplication of two expressions.

165
00:11:42,399 --> 00:11:47,159
And then we could have expressions that appear inside of parentheses, so parenthesized expressions.

166
00:11:47,159 --> 00:11:52,919
And just to keep things simple, we could just have as our base only base case simple identifiers,

167
00:11:52,919 --> 00:11:54,519
so variable names.

168
00:11:54,519 --> 00:12:01,919
And here's a small grammar over plus and times, it's the and parentheses and variable names.

169
00:12:01,919 --> 00:12:04,719
So let's look at a few elements of this language.

170
00:12:04,719 --> 00:12:11,079
So for example, a single variable name is a perfectly good element of the language.

171
00:12:11,080 --> 00:12:20,560
ID plus ID is also in this language, as is ID plus ID times ID.

172
00:12:20,560 --> 00:12:28,480
If we could also use perenns to group things, so we could say ID plus ID close perenn times ID,

173
00:12:28,480 --> 00:12:33,200
that's also something that you can generate using these rules and so on and so forth.

174
00:12:33,200 --> 00:12:35,759
There are many, many more strengths in this language.

