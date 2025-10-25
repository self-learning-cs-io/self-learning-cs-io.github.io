---
title: CS143 P14Week204 01 Lexical Specification
---

1
00:00:00,000 --> 00:00:05,400
Welcome back.

2
00:00:05,400 --> 00:00:09,339
In this video, we're going to talk about how regular expressions are used to construct

3
00:00:09,339 --> 00:00:19,359
a full lexical specification of a programming language.

4
00:00:19,359 --> 00:00:23,679
Before we get started, I want to quickly summarize notation for regular expressions.

5
00:00:23,679 --> 00:00:28,359
One of the short hands we talked about last time is A plus, which means a sequence of at least

6
00:00:28,359 --> 00:00:32,079
1A or the language AA star.

7
00:00:32,079 --> 00:00:40,519
Sometimes you'll see a vertical bar used instead of union, so A plus B can also be written

8
00:00:40,519 --> 00:00:42,600
A vertical bar B.

9
00:00:42,600 --> 00:00:48,039
An optional A is an abbreviation for the regular expression A plus epsilon.

10
00:00:48,039 --> 00:00:53,000
Then we have character ranges, which allows us to do a big union of a bunch of characters

11
00:00:53,000 --> 00:00:54,480
in order.

12
00:00:54,479 --> 00:01:01,619
One more that's used is actually fairly important, but we didn't discuss last time is the complement

13
00:01:01,619 --> 00:01:02,619
of a character range.

14
00:01:02,619 --> 00:01:11,920
This expression here means any character except the character's A through Z.

15
00:01:11,920 --> 00:01:15,679
In the last lecture, we talked about a specification for the following predicate.

16
00:01:15,679 --> 00:01:21,879
Given a spring S, is it in the language that's the function L of a regular expression?

17
00:01:22,599 --> 00:01:27,479
We defined a language of regular expressions, and we talked about their semantics in terms

18
00:01:27,479 --> 00:01:30,599
of sets of strings.

19
00:01:30,599 --> 00:01:36,399
For any given regular expression, we could reason out by hand whether a given string was

20
00:01:36,399 --> 00:01:37,679
in that language or not.

21
00:01:37,679 --> 00:01:40,959
This turns out not to be enough for what we want to do.

22
00:01:40,959 --> 00:01:42,599
Just to review, what is it we want to do?

23
00:01:42,599 --> 00:01:47,000
We're given an input, which is a bunch of characters.

24
00:01:47,000 --> 00:01:51,680
A string of characters.

25
00:01:51,680 --> 00:01:54,560
It can be much longer than just seven characters.

26
00:01:54,560 --> 00:01:56,879
What we actually want to do is to partition this string.

27
00:01:56,879 --> 00:02:02,000
We want to drop lines in this string to divide it up into the words of the language.

28
00:02:02,000 --> 00:02:08,520
Of course, each one of these words ought to be in the language of some regular expression.

29
00:02:08,520 --> 00:02:13,680
Just having a definition of a yes-no answer is not quite the same thing as having a method

30
00:02:13,680 --> 00:02:18,120
for partitioning a string into its constituent parts.

31
00:02:18,120 --> 00:02:23,000
We're going to have to adapt regular expressions to this problem.

32
00:02:23,000 --> 00:02:28,800
That will require some small extensions, and that's what this video is all about.

33
00:02:28,800 --> 00:02:29,960
Let's talk about how to do this.

34
00:02:29,960 --> 00:02:35,319
The first thing we're going to do when we want to design the lexical specification of a

35
00:02:35,319 --> 00:02:40,200
language is we have to write a regular expression for the lex seams of each of the token classes.

36
00:02:40,439 --> 00:02:42,280
We talked about how to do this last time.

37
00:02:42,280 --> 00:02:46,560
For the numbers, we might use digit plus as our regular expression.

38
00:02:46,560 --> 00:02:50,639
We might have a category of keywords, which is just a list of all the keywords in the

39
00:02:50,639 --> 00:02:52,119
language.

40
00:02:52,119 --> 00:02:56,159
We have some category, perhaps, of identifiers.

41
00:02:56,159 --> 00:03:00,319
There's the database we talked about last time, sequences of letters or digits that begin

42
00:03:00,319 --> 00:03:02,359
with a letter.

43
00:03:02,359 --> 00:03:07,519
We'll have a bunch of punctuation, things like open-parenes, closed-parenes, etc.

44
00:03:07,520 --> 00:03:15,840
We write down a whole set of regular expressions, one for each syntactic category in the language.

45
00:03:15,840 --> 00:03:19,120
That's the starting point for our lexical specification.

46
00:03:19,120 --> 00:03:23,600
As the second step, what we're going to do is we're going to construct a gigantic

47
00:03:23,600 --> 00:03:27,400
regular expression, which just matches all the lex seams for all the tokens.

48
00:03:27,400 --> 00:03:33,640
This is just the union of all the regular expressions that we wrote down on the previous slide.

49
00:03:33,639 --> 00:03:38,000
We just take the union of all those regular expressions, and that forms the lexical

50
00:03:38,000 --> 00:03:39,719
specification of the language.

51
00:03:39,719 --> 00:03:41,159
We'll just write this out.

52
00:03:41,159 --> 00:03:46,519
We don't really care what these regular expressions are, but they're just some set R1, R2, and

53
00:03:46,519 --> 00:03:54,319
so on, and the whole thing we're going to call R.

54
00:03:54,319 --> 00:04:01,359
Here's the heart of how we actually use this lexical specification to perform lexical analysis.

55
00:04:01,360 --> 00:04:02,720
Let's consider an input.

56
00:04:02,720 --> 00:04:06,400
The input is string x1 up to xn.

57
00:04:06,400 --> 00:04:12,800
Now for every prefix of that input, we're going to check whether it's in the language of

58
00:04:12,800 --> 00:04:13,800
the regular expression.

59
00:04:13,800 --> 00:04:16,160
We're going to look at some prefix string with the first character, and we're going to

60
00:04:16,160 --> 00:04:21,879
ask ourselves, is it in the language of that big regular expression?

61
00:04:21,879 --> 00:04:28,800
If it is in the language, well, then we know in particular that prefix is in the language

62
00:04:28,800 --> 00:04:34,120
of one of the constituent regular expressions, because remember that R is equal to the sum

63
00:04:34,120 --> 00:04:39,240
of all the different token classes of our language.

64
00:04:39,240 --> 00:04:47,560
We know that this prefix x1 through xi is in the language of sum Rj.

65
00:04:47,560 --> 00:04:52,720
That's a word in our language, which is one of the token classes that we're interested

66
00:04:52,720 --> 00:04:53,720
in.

67
00:04:53,720 --> 00:05:00,800
If we simply delete that prefix from the input, and then we go back to 3, and we repeat.

68
00:05:00,800 --> 00:05:06,240
In this way, we keep biting off the prefixes of the input, and we'll do this until the

69
00:05:06,240 --> 00:05:13,360
string is empty, and then we have electrically analyzed the entire program.

70
00:05:13,360 --> 00:05:18,760
This algorithm has a couple of ambiguities, or a couple of things that are under specified.

71
00:05:18,760 --> 00:05:20,040
Those are actually interesting.

72
00:05:20,040 --> 00:05:23,160
Let's take a moment and talk about those.

73
00:05:23,160 --> 00:05:27,720
The first question is, how much input is actually used?

74
00:05:27,720 --> 00:05:30,360
Let's consider the following situation.

75
00:05:30,360 --> 00:05:37,080
Let's say that we have the x1 through xi is in the language of our electrical specification.

76
00:05:37,080 --> 00:05:40,560
Let's say there's a different prefix.

77
00:05:40,560 --> 00:05:46,480
That's also in the language of our electrical specification, and of course, here i is not

78
00:05:46,480 --> 00:05:48,280
equal to j.

79
00:05:48,280 --> 00:05:50,240
What does that look like?

80
00:05:50,240 --> 00:05:52,800
Well, it would look like the following kind of situation.

81
00:05:52,800 --> 00:06:00,560
We would have our input string, and we have two different prefixes of the input that are

82
00:06:00,560 --> 00:06:02,040
both valid token classes.

83
00:06:02,040 --> 00:06:06,120
The question is, which one of these do we want?

84
00:06:06,120 --> 00:06:11,480
Just to be concrete here, to give a concrete example, let's consider what happens when a

85
00:06:11,480 --> 00:06:16,120
double equals is at the beginning of the input.

86
00:06:16,120 --> 00:06:21,120
If we've chopped off a bunch of other input, perhaps we have this substring or this prefix

87
00:06:21,120 --> 00:06:23,160
of the input that we're looking at.

88
00:06:23,160 --> 00:06:27,720
The question is, should this be regarded as a single equals, which would be an assignment

89
00:06:27,720 --> 00:06:32,720
operator in most languages, or would it be regarded as a double equals, which in some languages

90
00:06:32,720 --> 00:06:36,000
is a comparison operator?

91
00:06:36,000 --> 00:06:38,560
This is an example we've looked at before and discussed.

92
00:06:38,560 --> 00:06:41,519
There's actually a well-defined answer to this question.

93
00:06:41,519 --> 00:06:45,919
It is that we should always take the longer one, and this has a name.

94
00:06:45,919 --> 00:06:51,120
It's called the maximal munch.

95
00:06:51,120 --> 00:06:56,919
So the rule is that when faced with a choice of two different prefixes of the input, either

96
00:06:56,919 --> 00:07:00,799
of which would be a valid token, we should always choose the longer one.

97
00:07:00,799 --> 00:07:06,639
The reason for this is that's just the way humans themselves read things.

98
00:07:06,639 --> 00:07:09,759
When we see a double equals, we don't see two different equal operators.

99
00:07:09,759 --> 00:07:11,240
We see a double equals.

100
00:07:11,240 --> 00:07:19,160
If I look at this sentence that I wrote up here, when we look at HOW, we don't see three

101
00:07:19,160 --> 00:07:20,480
letters.

102
00:07:20,480 --> 00:07:23,800
We gather that all together in one long token.

103
00:07:23,800 --> 00:07:27,120
We go as far as we can until we see a separator.

104
00:07:27,120 --> 00:07:31,720
Because this is the way humans work, we make the tools work the same way.

105
00:07:31,720 --> 00:07:38,720
This, normally, or almost always, does the right thing.

106
00:07:38,720 --> 00:07:44,240
Second question is which token should be used if more than one token matches.

107
00:07:44,240 --> 00:07:45,560
What do I mean by that?

108
00:07:45,560 --> 00:07:48,840
Again, we have our prefix of the input.

109
00:07:48,840 --> 00:07:52,400
It's in the language of our lexical specification.

110
00:07:52,400 --> 00:07:58,800
Just remember that the lexical specification itself is made up as the union of a bunch

111
00:07:58,800 --> 00:08:03,240
of regular expressions for token classes.

112
00:08:03,240 --> 00:08:10,360
Since this prefix is in the language of the lexical specification, that means that, again,

113
00:08:10,360 --> 00:08:15,840
it must be in the language of some particular token class, Rj.

114
00:08:15,840 --> 00:08:21,280
Nothing says that it isn't also in the language of a completely different token class.

115
00:08:21,280 --> 00:08:25,759
Meaning that this same string could be interpreted as one of two different tokens.

116
00:08:25,759 --> 00:08:29,879
The question is if this happens, which one should we pick?

117
00:08:29,879 --> 00:08:38,120
For example, just to make this concrete, we could have a lexical specification for keywords,

118
00:08:38,120 --> 00:08:51,159
which would be things like if, and else, and so on, and also for identifiers.

119
00:08:51,159 --> 00:09:07,039
An identifier was a letter followed by a letter or a digit repeated.

120
00:09:07,039 --> 00:09:13,039
If you look at these two specifications, you'll see that the string IF is both of them.

121
00:09:13,039 --> 00:09:19,039
IF is in the language of keywords.

122
00:09:19,039 --> 00:09:24,719
It's also in the language of the identifiers.

123
00:09:24,719 --> 00:09:27,360
So should we treat if, as a keyword, an identifier?

124
00:09:27,360 --> 00:09:32,399
Now, the normal rule in most languages is that if it's a keyword, then it's always a

125
00:09:32,399 --> 00:09:38,639
keyword, and the identifiers actually don't include the keywords.

126
00:09:38,639 --> 00:09:43,120
But actually, it's a real pain to write out the identifiers in such a way that you explicitly

127
00:09:43,120 --> 00:09:44,439
exclude the keywords.

128
00:09:44,440 --> 00:09:49,520
This is a much more natural definition than ever in here for the identifiers.

129
00:09:49,520 --> 00:09:57,240
The way this gets resolved is by a priority ordering, and typically, the rule is to choose

130
00:09:57,240 --> 00:10:04,600
the one listed first.

131
00:10:04,600 --> 00:10:09,760
So when there is a choice, when there is more than one token class, which a string might

132
00:10:09,760 --> 00:10:14,000
be long, the one that is listed first is given higher priority.

133
00:10:14,000 --> 00:10:20,799
So in our file, defining our electrical specification, we would put the keywords before the identifiers,

134
00:10:20,799 --> 00:10:25,360
just as we have done here.

135
00:10:25,360 --> 00:10:29,240
The final question is what to do if no rule matches?

136
00:10:29,240 --> 00:10:40,080
What if I have a prefix of the input that is not in the language of my electrical specification?

137
00:10:40,080 --> 00:10:41,519
Now this can actually arise.

138
00:10:41,519 --> 00:10:45,120
Currently, there are lots and lots of strings that are not going to be in the language of

139
00:10:45,120 --> 00:10:49,279
the electrical specification of most languages.

140
00:10:49,279 --> 00:10:51,799
And the question is how to handle that situation.

141
00:10:51,799 --> 00:10:55,439
So it's very important for compilers to do good error handling.

142
00:10:55,439 --> 00:10:57,279
They can't simply crash.

143
00:10:57,279 --> 00:11:01,279
You need to be able to give the user the programmer feedback about where the error is and what

144
00:11:01,279 --> 00:11:02,840
kind of error it is.

145
00:11:02,840 --> 00:11:04,600
So we do need to handle this gracefully.

146
00:11:04,600 --> 00:11:09,840
And the best solution for electrical analysis is to not do this.

147
00:11:09,840 --> 00:11:13,720
So don't let this ever happen.

148
00:11:13,720 --> 00:11:19,680
So what we want to do instead is to write a category of error strings.

149
00:11:19,680 --> 00:11:32,759
So all the strings not in the electrical specification of the language.

150
00:11:32,759 --> 00:11:34,759
So we write out a regular expression.

151
00:11:34,759 --> 00:11:37,800
Again, this is another regular expression here.

152
00:11:37,799 --> 00:11:43,120
For all the possible error strings, all the possible erroneous strings that it could occur

153
00:11:43,120 --> 00:11:46,399
as invalid electrical input.

154
00:11:46,399 --> 00:11:49,279
And then we put it last.

155
00:11:49,279 --> 00:11:56,479
Put it last in priority so that it will match after everything else matches.

156
00:11:56,479 --> 00:12:02,039
And the reason for putting it last is that this actually allows us to be a little bit sloppy

157
00:12:02,039 --> 00:12:04,479
in how we define the error strings.

158
00:12:04,480 --> 00:12:07,759
It can actually overlap with earlier regular expressions.

159
00:12:07,759 --> 00:12:11,159
We can include things in the error strings that are in fact not errors.

160
00:12:11,159 --> 00:12:16,080
But if we put it last in priority, then it will only match if no earlier regular expression

161
00:12:16,080 --> 00:12:17,080
matched.

162
00:12:17,080 --> 00:12:19,080
So in fact, it will only catch the error strings.

163
00:12:19,080 --> 00:12:22,720
And then the action that will take when we match the error string will be to print an error

164
00:12:22,720 --> 00:12:30,399
message and give the nice feedback like where it is in the file and such.

165
00:12:30,399 --> 00:12:34,840
To wrap up this video, regular expressions are very nice and concise notation for string

166
00:12:34,840 --> 00:12:36,000
patterns.

167
00:12:36,000 --> 00:12:40,199
But to use them in electrical analysis requires a couple of small extensions.

168
00:12:40,199 --> 00:12:43,319
So in particular, there's a couple of ambiguities we have to resolve.

169
00:12:43,319 --> 00:12:50,720
We want our matches to be as long as possible.

170
00:12:50,720 --> 00:12:55,159
So we take as much input at a time as we can.

171
00:12:55,159 --> 00:13:04,399
And we also want to choose the highest priority match.

172
00:13:04,399 --> 00:13:06,360
So the regular expressions are given a priority.

173
00:13:06,360 --> 00:13:08,319
The different token classes have priorities.

174
00:13:08,319 --> 00:13:14,000
And when there's a tie, when the same prefix of the input could match more than one, we pick

175
00:13:14,000 --> 00:13:15,839
the one that has the highest priority.

176
00:13:15,839 --> 00:13:19,319
Typically, this is done just by listing them in order in a file.

177
00:13:19,319 --> 00:13:23,039
And the ones listed first have higher priority over the ones listed later.

178
00:13:23,039 --> 00:13:26,079
I just want to warn you that when you go to write lexical specifications, when you go

179
00:13:26,079 --> 00:13:32,079
to actually implement lexar for a language, the interaction of these two rules that we take

180
00:13:32,079 --> 00:13:37,639
longest possible matches and we break ties in favor of the highest priority rules, that

181
00:13:37,639 --> 00:13:40,319
these lead to some tricky situations.

182
00:13:40,319 --> 00:13:44,879
And it's not always obvious that you're getting exactly what you want.

183
00:13:44,879 --> 00:13:49,799
You have to think carefully about the ordering of the rules and exactly how you write the

184
00:13:49,799 --> 00:13:52,559
rules so that you get the behavior that you desire.

185
00:13:52,559 --> 00:13:58,199
And finally, to handle errors, we typically write out a catch all regular expression that

186
00:13:58,199 --> 00:14:02,959
soaks up all the possible erroneous strings and give it the lowest priority.

187
00:14:02,959 --> 00:14:09,959
So they don't only triggers if no valid token class matches some piece of the input.

188
00:14:09,959 --> 00:14:14,279
And finally, we haven't discussed these yet, but they're very good algorithms known for

189
00:14:14,279 --> 00:14:15,799
implementing all of this.

190
00:14:15,799 --> 00:14:19,639
And in fact, we'll be able to do it in only a single pass over the input.

191
00:14:19,639 --> 00:14:24,759
And with very few operations per character, just a simple table look up.

192
00:14:24,759 --> 00:14:27,240
And this will be the subject of our future videos.

