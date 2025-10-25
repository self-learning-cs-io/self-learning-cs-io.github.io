---
title: CS143 P46Week408 02 Recognizing Handles
---

1
00:00:00,000 --> 00:00:06,160
Welcome back.

2
00:00:06,160 --> 00:00:10,099
In this video, we're going to talk about the key ideas behind techniques for recognizing

3
00:00:10,099 --> 00:00:16,140
handles.

4
00:00:16,140 --> 00:00:19,660
There is good news and bad news when it comes to recognizing handles.

5
00:00:19,660 --> 00:00:25,060
The bad news is that there is no known efficient algorithms that recognizes handles in general.

6
00:00:25,059 --> 00:00:30,299
So for an arbitrary grammar, we don't have a fast way to find the handles when we're

7
00:00:30,299 --> 00:00:31,779
parsing.

8
00:00:31,779 --> 00:00:36,759
The good news is that there are heuristics for guessing handles and for some context

9
00:00:36,759 --> 00:00:40,820
free grammars, for some fairly large classes of context free grammars, these heuristics

10
00:00:40,820 --> 00:00:46,259
always identify the handles correctly.

11
00:00:46,259 --> 00:00:48,859
We can illustrate the situation with a Venn diagram.

12
00:00:48,859 --> 00:00:53,700
If we start with a set of all context free grammars, then the unambiguous context free grammars

13
00:00:53,700 --> 00:00:55,820
are a subset of those.

14
00:00:55,820 --> 00:00:59,220
And then an even smaller set are what are called the LRK grammars.

15
00:00:59,220 --> 00:01:05,060
And here, just to remind you, L stands for left to right, scan, R stands for rightmost

16
00:01:05,060 --> 00:01:11,140
derivation, and K stands for the number of tokens of look ahead.

17
00:01:11,140 --> 00:01:16,579
Now the LRK grammars are one of the most general deterministic families of deterministic

18
00:01:16,579 --> 00:01:18,820
grammars that we know of.

19
00:01:18,820 --> 00:01:21,260
But those aren't the ones that are actually used in practice.

20
00:01:21,260 --> 00:01:26,780
So the bottom up tools that are practical use what are called the LALRK grammars, which

21
00:01:26,780 --> 00:01:29,180
are a subset of the LRK grammars.

22
00:01:29,180 --> 00:01:33,980
And then what we're going to talk mostly about is a simplification of those called the

23
00:01:33,980 --> 00:01:38,500
simple LR grammars, or the SLRK context free grammars.

24
00:01:38,500 --> 00:01:44,860
And these containment relationships are strict, that is there are grammars that are LALRK,

25
00:01:44,860 --> 00:01:46,820
but not SLRK for every K.

26
00:01:46,819 --> 00:01:57,179
And similarly, there are grammars that are LRK for every K that are not LALRK.

27
00:01:57,179 --> 00:02:00,579
As we've already said, it's not obvious how to detect handles.

28
00:02:00,579 --> 00:02:02,459
So what does the parser know?

29
00:02:02,459 --> 00:02:03,659
Well, it sees the stack.

30
00:02:03,659 --> 00:02:08,259
At each step, it knows the stack that it has already constructed.

31
00:02:08,259 --> 00:02:12,060
And so let's see how much progress we can make just thinking about what information we

32
00:02:12,060 --> 00:02:13,939
can get from the stack.

33
00:02:13,939 --> 00:02:14,939
So here's a definition.

34
00:02:14,939 --> 00:02:18,060
We're going to say that alpha is a viable prefix.

35
00:02:18,060 --> 00:02:25,020
If there is some omega such that alpha bar omega is a configuration, a valid configuration

36
00:02:25,020 --> 00:02:26,659
of a shift-reduced parse.

37
00:02:26,659 --> 00:02:30,979
Now keep in mind that the alpha here, this is the stack.

38
00:02:30,979 --> 00:02:36,740
And the omega here is the rest of the input.

39
00:02:36,740 --> 00:02:37,740
And what does that mean?

40
00:02:37,740 --> 00:02:40,340
That means the parser knows this part, the parser knows alpha.

41
00:02:40,340 --> 00:02:42,659
It doesn't know much of omega.

42
00:02:42,659 --> 00:02:43,659
It can do some look ahead.

43
00:02:43,659 --> 00:02:48,180
It can look at a small prefix of omega, usually just one token.

44
00:02:48,180 --> 00:02:54,099
But it certainly doesn't know the whole thing.

45
00:02:54,099 --> 00:02:56,060
So what does a viable prefix mean?

46
00:02:56,060 --> 00:02:58,659
Well, a viable prefix is a string.

47
00:02:58,659 --> 00:03:01,659
It does not extend past the right end of the handle.

48
00:03:01,659 --> 00:03:06,460
And the reason we call it a viable prefix is because it is a prefix of the handle.

49
00:03:06,460 --> 00:03:12,500
So as long as the parser has viable prefixes on the stack, no parsing error has been detected.

50
00:03:12,500 --> 00:03:16,379
And really, the definition is just giving a name to something.

51
00:03:16,379 --> 00:03:18,379
It's not anything very deep.

52
00:03:18,379 --> 00:03:23,699
The fact that alpha bar omega is viable, that's just saying that we haven't encountered an

53
00:03:23,699 --> 00:03:24,699
error.

54
00:03:24,699 --> 00:03:27,460
That this is some state of a shift-reduced parse.

55
00:03:27,460 --> 00:03:31,460
It hasn't said yet how we're going to identify it or anything like that.

56
00:03:31,460 --> 00:03:38,539
It's just saying that these are the valid states of a shift-reduced parse.

57
00:03:38,539 --> 00:03:41,459
Now the definition is useful in one way.

58
00:03:41,459 --> 00:03:47,419
It brings us to the last important fact, important fact number three about bottom-up parsing.

59
00:03:47,419 --> 00:03:52,500
And that's that for any grammar, the set of viable prefixes is a regular language.

60
00:03:52,500 --> 00:03:55,060
And this is really an amazing fact.

61
00:03:55,060 --> 00:03:59,579
And one that's going to take us a little while to demonstrate.

62
00:03:59,579 --> 00:04:03,019
But this is the key to bottom-up parsing.

63
00:04:03,019 --> 00:04:07,099
At least all the bottom-up parsing tools are based on this fact that the set of viable

64
00:04:07,099 --> 00:04:13,579
prefixes can be recognized by a finite automaton.

65
00:04:13,579 --> 00:04:17,899
So we're going to show how to compute this automaton that accepts the viable prefixes.

66
00:04:17,899 --> 00:04:24,420
But first, we're going to need a number of additional definitions.

67
00:04:24,420 --> 00:04:27,579
The first definition we need is the idea of an item.

68
00:04:27,579 --> 00:04:31,420
Now an item is a production that just has a dot somewhere on the right-hand side.

69
00:04:31,420 --> 00:04:33,139
So here's an example.

70
00:04:33,139 --> 00:04:36,139
Let's take the production T goes to open-paren E closed-paren.

71
00:04:36,139 --> 00:04:40,139
What we're going to do is we're just going to put a dot in every possible position on

72
00:04:40,139 --> 00:04:41,139
the right-hand side.

73
00:04:41,139 --> 00:04:44,099
So we'll have one item where the dot is all the way at the left end.

74
00:04:44,099 --> 00:04:46,899
We'll have one where the dot is all the way at the right end.

75
00:04:46,899 --> 00:04:53,339
And then we'll have items where the dot is between every pair of consecutive symbols.

76
00:04:53,339 --> 00:05:00,339
So in this case, there are four items for the production.

77
00:05:00,339 --> 00:05:02,939
One special case is what do we do with epsilon productions?

78
00:05:02,939 --> 00:05:06,699
Well, for an epsilon production, there are no symbols on the right-hand side.

79
00:05:06,699 --> 00:05:09,860
We'll just say there is one item x goes to dot.

80
00:05:09,860 --> 00:05:19,420
And these items, you'll see them referred to if you look and help pages in the literature as the LR zero items.

81
00:05:19,420 --> 00:05:23,300
Now we're ready to discuss how we recognize viable prefixes.

82
00:05:23,300 --> 00:05:29,699
And the problem is that the stack has only bits and pieces of the right-hand sides of productions.

83
00:05:29,699 --> 00:05:34,860
In general, most of the time, we don't have a complete right-hand side on top of the stack.

84
00:05:34,860 --> 00:05:37,740
Most of the time, we only have a part of a right-hand side.

85
00:05:37,740 --> 00:05:43,459
And it turns out that what is on the stack is actually not just random.

86
00:05:43,459 --> 00:05:47,939
It actually has a very special structure.

87
00:05:47,939 --> 00:05:52,860
And these bits and pieces are always prefixes of right-hand sides of productions.

88
00:05:52,860 --> 00:05:59,539
That is, in any successful parts, what is on the stack, I always has to be a prefix of the right-hand side

89
00:05:59,540 --> 00:06:03,140
on some production or productions.

90
00:06:03,140 --> 00:06:04,780
Let's take a look at an example.

91
00:06:04,780 --> 00:06:07,500
Let's consider the input open-parent into closed-parent.

92
00:06:07,500 --> 00:06:10,939
And here's one of our favorite grammars.

93
00:06:10,939 --> 00:06:20,660
Now, this configuration, where I have open-parent E on the stack, remember that this is our stack.

94
00:06:20,660 --> 00:06:23,939
And we have the closed-parent in the input.

95
00:06:23,939 --> 00:06:27,900
This is actually a state or a valid state of a shift-reduce parse.

96
00:06:27,899 --> 00:06:32,339
And you can see here that open-parent E is a prefix of the production.

97
00:06:32,339 --> 00:06:35,259
T goes to open-parent E closed-parent.

98
00:06:35,259 --> 00:06:41,539
And after we shift the remaining closed-parent onto the stack, then we'll have the complete right-hand side.

99
00:06:41,539 --> 00:06:43,699
It will be ready to reduce.

100
00:06:43,699 --> 00:06:45,219
So this is where the items come in.

101
00:06:45,219 --> 00:06:50,979
The item T goes to open-parent E dot closed-parent.

102
00:06:50,979 --> 00:06:54,099
This describes this state of affairs.

103
00:06:54,100 --> 00:06:58,340
It says that so far we have seen open-parent E of this production.

104
00:06:58,340 --> 00:07:01,700
And we're hoping in the future to see the closed-parent.

105
00:07:01,700 --> 00:07:07,220
So another way of thinking about it is that this item records the fact that we're working on this production.

106
00:07:07,220 --> 00:07:08,860
And that so far we've seen this much.

107
00:07:08,860 --> 00:07:12,900
Everything to the left of the dot is what we've already seen and is what is on the stack.

108
00:07:12,900 --> 00:07:18,100
And what is to the right of the dot is what we're waiting to see before we could possibly reduce.

109
00:07:18,100 --> 00:07:19,260
And we may or may not see that.

110
00:07:19,260 --> 00:07:21,580
Remember the parser doesn't know the input.

111
00:07:21,579 --> 00:07:25,180
In this case, of course, it's the very next symbol.

112
00:07:25,180 --> 00:07:26,979
And so we can see it in the look ahead.

113
00:07:26,979 --> 00:07:31,899
But at this point in time, the parser doesn't know for sure what's coming up.

114
00:07:31,899 --> 00:07:38,379
And if this dot were further to the left, there might be many, many more symbols that we had to go before we could perform the reduction.

115
00:07:38,379 --> 00:07:42,419
So anyway, what's to the left of that records what we've already seen.

116
00:07:42,419 --> 00:07:51,099
And what is to the right of the dot says what we're waiting to see on the stack before we can perform a reduction.

117
00:07:51,100 --> 00:07:53,540
And now we can talk about the structure of the stack.

118
00:07:53,540 --> 00:07:57,100
So as we said, it's not just arbitrary collections of symbols.

119
00:07:57,100 --> 00:07:59,939
In fact, it has this very particular structure.

120
00:07:59,939 --> 00:08:04,500
So the stack is actually a stack of prefixes of right hand sides.

121
00:08:04,500 --> 00:08:12,420
So the stack always has this organization where there's a bunch of prefixes stacked up, literally stacked up on the stack.

122
00:08:12,420 --> 00:08:18,900
And what's going to happen is that the Ith prefix, if we were to pick a prefix out of this stack of prefixes,

123
00:08:18,899 --> 00:08:24,939
well, that must be the prefix of some production, okay, the right hand side of some production.

124
00:08:24,939 --> 00:08:33,740
And what that means is that that prefix that Ith prefix on the stack will eventually reduce to the left hand side of that production.

125
00:08:33,740 --> 00:08:37,699
So it'll eventually reduce to XI in this case.

126
00:08:37,699 --> 00:08:45,779
And then that XI has to be part of the missing suffix of the prefix that is below it on the stack.

127
00:08:45,779 --> 00:08:53,299
So if I look at the previous prefix, the one that's right below prefix, sub-I on the stack, then when I perform this reduction,

128
00:08:53,299 --> 00:09:00,819
that XI needs to extend that prefix to be closer to a complete right hand side of that particular production.

129
00:09:00,819 --> 00:09:11,539
Okay, so in particular, there's going to be some production that is going to already have a portion of its right hand side on the stack.

130
00:09:11,539 --> 00:09:15,899
So prefix of by minus one and XI is going to extend that prefix.

131
00:09:15,899 --> 00:09:21,939
And then there's going to be some more stuff possibly that are waiting to see even after the XI is put there.

132
00:09:21,939 --> 00:09:32,139
And recursively, all the prefixes above prefix K eventually have to reduce to the missing part of the right hand side of prefix K,

133
00:09:32,139 --> 00:09:34,579
the alpha K that goes on the right hand side.

134
00:09:34,580 --> 00:09:37,340
So I say, I have this image, you have a stack of prefixes.

135
00:09:37,340 --> 00:09:40,379
We're always working on the top most prefix on the stack.

136
00:09:40,379 --> 00:09:44,860
So we'll always be working here at the right end, shifting and reducing.

137
00:09:44,860 --> 00:09:49,820
But every time we perform a reduction, that has to extend the prefix immediately below it on the stack.

138
00:09:49,820 --> 00:09:53,620
And when a bunch of prefixes have been removed from the stack through reductions,

139
00:09:53,620 --> 00:09:59,620
then we get to work on the prefixes that are lower in the stack.

140
00:09:59,620 --> 00:10:02,900
So let's illustrate this idea with an example.

141
00:10:02,899 --> 00:10:05,139
So here is another input string.

142
00:10:05,139 --> 00:10:10,899
We're going to use the same grammar that you can rewind if you want to see the grammar again.

143
00:10:10,899 --> 00:10:18,100
But let's consider this state where we have open pern in star on the stack.

144
00:10:18,100 --> 00:10:23,740
And we have int closed pern remaining in the input.

145
00:10:23,740 --> 00:10:27,059
And so what items would record?

146
00:10:27,059 --> 00:10:30,860
What is the stack structure here and how do the items record it?

147
00:10:30,860 --> 00:10:33,139
Well, let's start here at the bottom.

148
00:10:33,139 --> 00:10:35,019
It's actually work from the bottom up.

149
00:10:35,019 --> 00:10:38,060
So we have int star at the top of our stack.

150
00:10:38,060 --> 00:10:43,340
So this is the right hand side that we're currently working on.

151
00:10:43,340 --> 00:10:45,659
And that would be a prefix of this production.

152
00:10:45,659 --> 00:10:49,460
T goes to int star T.

153
00:10:49,460 --> 00:10:56,500
So what this says is that we're looking, we've seen in star so far and we're weighing

154
00:10:56,500 --> 00:10:57,500
the CTN.

155
00:10:57,500 --> 00:11:00,940
So we're going to see the items, but I'm just showing the productions that this is eventually

156
00:11:00,940 --> 00:11:02,460
going to use.

157
00:11:02,460 --> 00:11:07,179
Now the one that's below it here, the prefix that's below it on the stack is right here in

158
00:11:07,179 --> 00:11:09,299
between the open pern and the int.

159
00:11:09,299 --> 00:11:11,340
This one's an interesting case.

160
00:11:11,340 --> 00:11:12,539
It's actually epsilon.

161
00:11:12,539 --> 00:11:15,220
So there's nothing there now on the stack.

162
00:11:15,220 --> 00:11:24,580
But eventually once the int star has reduced to T, then that T is going to reduce to E.

163
00:11:24,580 --> 00:11:26,659
And currently, of course, there's not a T there at all.

164
00:11:26,659 --> 00:11:28,379
So we've only seen epsilon.

165
00:11:28,379 --> 00:11:33,219
We've seen none of the prefix of this production on the stack.

166
00:11:33,219 --> 00:11:39,779
And then for the last production, the one deepest in the stack, we're currently, we've

167
00:11:39,779 --> 00:11:45,139
currently seen an open pern and we think we're working on this production.

168
00:11:45,139 --> 00:11:48,379
T goes to open pern E, close pern.

169
00:11:48,379 --> 00:11:55,100
So when this E is produced, that will extend this right hand side.

170
00:11:55,100 --> 00:11:59,259
And now we can record all of this with the stack of items.

171
00:11:59,259 --> 00:12:05,340
T goes to open pern dot E, E goes to dot T, and T goes to int star dot T.

172
00:12:05,340 --> 00:12:08,820
And it just records what we said on the previous slide.

173
00:12:08,820 --> 00:12:12,779
That so far we've seen the open pern of this production.

174
00:12:12,779 --> 00:12:15,899
We've seen nothing out of the right hand side of this production.

175
00:12:15,899 --> 00:12:19,460
And we've seen int star so far of this production.

176
00:12:19,460 --> 00:12:24,340
And just notice how the left hand side of each of these productions is going to eventually

177
00:12:24,340 --> 00:12:31,259
become part of the right hand side of the right hand side of the production we're working

178
00:12:31,259 --> 00:12:33,340
on just below it in the stack.

179
00:12:33,340 --> 00:12:40,180
So when we've reduced this int star T to T, that will extend to this production.

180
00:12:40,180 --> 00:12:46,860
And when that reduces to E, that will extend this production.

181
00:12:46,860 --> 00:12:51,460
To summarize this video, we can say a little more precisely how we go about recognizing

182
00:12:51,460 --> 00:12:53,100
viable prefixes.

183
00:12:53,100 --> 00:12:57,460
The crux of the problem is going to be to recognize a sequence of partial right hand sides

184
00:12:57,460 --> 00:13:02,340
of productions where each of those partial right hand sides can eventually reduce to part

185
00:13:02,340 --> 00:13:04,740
of the missing suffix of its predecessor.

186
00:13:04,740 --> 00:13:10,220
Next time, in the next video, we're going to actually give the algorithm for implementing

187
00:13:10,220 --> 00:13:10,779
this idea.

