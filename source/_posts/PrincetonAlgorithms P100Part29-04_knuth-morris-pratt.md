---
title: PrincetonAlgorithms P100Part29 04_knuth Morris Pratt
---

1
00:00:00,000 --> 00:00:08,279
So the algorithm that we're going to look at for solving the substring search problems

2
00:00:08,279 --> 00:00:10,560
called the Canuth Morse Pratt algorithm.

3
00:00:10,560 --> 00:00:15,439
It's got an interesting history that we'll get to at the end.

4
00:00:15,439 --> 00:00:19,440
But I just want to start by saying that this is one of the coolest algorithms that we'll

5
00:00:19,440 --> 00:00:21,800
cover in this course.

6
00:00:21,800 --> 00:00:26,920
And it's not an algorithm that anyone would come up with without a lot of hard work, but

7
00:00:26,920 --> 00:00:32,079
understanding this algorithm really gives somebody an appreciation for what's possible

8
00:00:32,079 --> 00:00:38,079
with careful algorithmic thinking even for such a simple problem as this.

9
00:00:38,079 --> 00:00:40,760
It's a quite ingenious method.

10
00:00:40,760 --> 00:00:43,280
So here's the intuition behind the algorithm.

11
00:00:43,280 --> 00:00:50,680
So say we're looking for the pattern B followed by a bunch of A's and text.

12
00:00:50,680 --> 00:00:55,840
So we're going along and so well we've kind of mismatched right away.

13
00:00:55,840 --> 00:01:03,040
So we'll move over to first position and we'll go BAAA.

14
00:01:03,040 --> 00:01:06,439
And we find a mismatch at the end and the miscase.

15
00:01:06,439 --> 00:01:12,240
So now what the brute force method is going to do is back up to move over one position.

16
00:01:12,240 --> 00:01:16,560
That B doesn't match the A. Back up again, that B doesn't match the A.

17
00:01:16,560 --> 00:01:26,320
And keep going matching the first B against all these A's before getting to the next

18
00:01:26,320 --> 00:01:29,600
character in the text.

19
00:01:29,600 --> 00:01:33,320
So we match five characters and we mismatch on the six.

20
00:01:33,320 --> 00:01:40,879
But the key point is that when we got that mismatch, if all we have is A's and B's, we already

21
00:01:40,879 --> 00:01:46,799
matched BAAA, 4A's and we got a mismatch so it's a B.

22
00:01:46,799 --> 00:01:51,319
So at that point we know what the previous characters in the text are.

23
00:01:51,319 --> 00:01:55,159
And we know that if we move over one position we're going to be trying to match B against

24
00:01:55,159 --> 00:02:00,159
A. So we should be able to take advantage of that knowledge that's the intuition on the

25
00:02:00,159 --> 00:02:02,280
method of the Knuth Morris Pratt.

26
00:02:02,280 --> 00:02:05,560
We don't need to back up the text pointer in this case.

27
00:02:05,560 --> 00:02:10,840
When we get the mismatch we can just keep going.

28
00:02:10,840 --> 00:02:14,560
We don't even have to match the first B. We know it's there.

29
00:02:14,560 --> 00:02:20,560
So we can just keep going in the text pointer and start in the second pattern pointer.

30
00:02:20,560 --> 00:02:25,840
The Knuth Morris Pratt algorithm is a very clever method that manages to always avoid

31
00:02:25,840 --> 00:02:28,920
backup no matter what the pattern is.

32
00:02:28,920 --> 00:02:33,879
So let's take a look at what's involved.

33
00:02:33,879 --> 00:02:40,800
It's based on the idea of building a deterministic finite state machine for string searching.

34
00:02:40,800 --> 00:02:46,480
Now, deterministic finite state machine, if you're not familiar, don't remember, is a very

35
00:02:46,480 --> 00:02:47,880
simple thing.

36
00:02:47,880 --> 00:02:51,080
It's got a finite number of states.

37
00:02:51,080 --> 00:02:52,920
It's always in one of the states.

38
00:02:52,920 --> 00:02:57,240
There's a start state and a halt state.

39
00:02:57,240 --> 00:03:06,560
And from every state there's exactly one transition for each possible character in the alphabet.

40
00:03:06,560 --> 00:03:16,000
So if we're in a state and we're reading a particular character, we move to the state

41
00:03:16,000 --> 00:03:18,599
that is indicated by that character.

42
00:03:18,599 --> 00:03:23,159
So if we're in state 2 and we're reading an A, we move to state 3.

43
00:03:23,159 --> 00:03:26,039
That's what this line in the table says.

44
00:03:26,039 --> 00:03:33,879
If we're in state 2 and we read a, that happens to be the pattern character as A. If we see

45
00:03:33,879 --> 00:03:35,759
an A, we move to state 3.

46
00:03:35,759 --> 00:03:39,879
If we see a B or a C, we go back to state 0.

47
00:03:39,879 --> 00:03:41,639
That's what this machine says.

48
00:03:41,639 --> 00:03:46,399
It says a tabular representation and a graphical representation.

49
00:03:46,399 --> 00:03:51,159
If we get to state 6, then we just say accept.

50
00:03:51,159 --> 00:03:52,159
We found the pattern.

51
00:03:52,159 --> 00:03:56,639
And you can see how that is, the pattern, every, if we match a pattern character, we move

52
00:03:56,639 --> 00:04:01,719
right through this machine until we get to the halt state.

53
00:04:01,719 --> 00:04:08,039
So let's first take a look at exactly how the machine works to make sure everybody follows

54
00:04:08,039 --> 00:04:09,039
that.

55
00:04:09,039 --> 00:04:12,960
And then we'll look at how do we build this machine.

56
00:04:12,960 --> 00:04:18,360
So that's our machine and that's our text up at the top.

57
00:04:18,360 --> 00:04:20,439
So we started state 0.

58
00:04:20,439 --> 00:04:23,759
We're reading an A. What are we supposed to do?

59
00:04:23,759 --> 00:04:28,079
If we're in state 0 and we're reading A, this entry of the table says we're supposed

60
00:04:28,079 --> 00:04:31,519
to go to state 1.

61
00:04:31,519 --> 00:04:36,479
So we go to state 1.

62
00:04:36,479 --> 00:04:38,839
At every step, we consume a text character.

63
00:04:38,839 --> 00:04:40,759
Just read a text character.

64
00:04:40,759 --> 00:04:46,719
Now we're in state 1 and reading an A. In the graphical representation, it says stay

65
00:04:46,719 --> 00:04:48,879
in state 1 or in this representation.

66
00:04:48,879 --> 00:04:53,279
That says if you're in state 1 and you see an A, stay in state 1.

67
00:04:53,279 --> 00:04:56,039
So that's what we'll do.

68
00:04:56,039 --> 00:04:58,919
We'll read the A and stay in state 1.

69
00:04:58,920 --> 00:05:01,759
Now we're in state 1.

70
00:05:01,759 --> 00:05:10,319
So you can say that in state 1, it's reading A. And we're looking for something that's

71
00:05:10,319 --> 00:05:15,360
not A. No matter how many A's you have, you'll read them right here in state 1.

72
00:05:15,360 --> 00:05:19,639
So now we're in state 1 and we're reading a B and it says go to state 2 in that case.

73
00:05:19,639 --> 00:05:22,160
So that's where we'll go and read the B.

74
00:05:22,160 --> 00:05:27,360
Now we're in state 2 and reading an A. So we go to state 3 and read the A.

75
00:05:27,360 --> 00:05:34,080
Now we're in state 3 and we see a C. In state 3, we see a C. We're supposed to go back

76
00:05:34,080 --> 00:05:36,520
to state 0.

77
00:05:36,520 --> 00:05:39,240
That's a mismatch.

78
00:05:39,240 --> 00:05:42,400
Our pattern, the C's not until the end.

79
00:05:42,400 --> 00:05:46,360
So now we have to start the search all over again.

80
00:05:46,360 --> 00:05:50,639
Although in the finite state machine doesn't know that, it's just plotting along according

81
00:05:50,639 --> 00:05:53,560
to the state transitions it's supposed to do.

82
00:05:53,560 --> 00:05:55,920
So we read the C now we're back in state 0.

83
00:05:56,520 --> 00:06:00,600
So now we're in state 0 looking at an A. We moved to 1 and read the A.

84
00:06:00,600 --> 00:06:05,640
And then we see another A. So we stay in 1 and read the A.

85
00:06:05,640 --> 00:06:09,080
And now we see a B and we've got to state 2 and read the B.

86
00:06:09,080 --> 00:06:11,480
And now we've got to state 3 and read the A.

87
00:06:11,480 --> 00:06:15,319
State 3 and read the A. State 4 and read the A.

88
00:06:15,319 --> 00:06:17,240
State 5 and read the C.

89
00:06:17,240 --> 00:06:18,840
And now we're in state 6.

90
00:06:18,840 --> 00:06:22,000
That means we found the pattern.

91
00:06:22,000 --> 00:06:28,040
So that's a simulation of what the deterministic finite state of thought

92
00:06:28,040 --> 00:06:31,560
because corresponding to this pattern would do.

93
00:06:31,560 --> 00:06:37,480
And as we'll see the code for implementing this simulation is quite simple.

94
00:06:37,480 --> 00:06:41,040
That's a demo of DFA simulation.

95
00:06:41,040 --> 00:06:48,279
So let's just take a quick look at what the interpretation of this DFA is.

96
00:06:48,279 --> 00:06:56,839
So what does it mean after we just read the Ith character of the text?

97
00:06:56,839 --> 00:07:02,399
Well the number of the state is the number of characters in the pattern that we've

98
00:07:02,399 --> 00:07:04,639
matched up to the current point.

99
00:07:04,639 --> 00:07:10,639
So that is at state 3 we've matched three characters in the pattern.

100
00:07:10,639 --> 00:07:16,000
And what's happened is that we've matched a prefix of the pattern,

101
00:07:16,000 --> 00:07:18,560
the first three characters of the pattern.

102
00:07:18,560 --> 00:07:21,040
And actually it's the longest prefix of the pattern.

103
00:07:21,040 --> 00:07:29,959
That's also a suffix of the Ith, the Ith plus 1 character of the text from 0 to I.

104
00:07:29,959 --> 00:07:32,839
That's the interpretation of what it is.

105
00:07:32,839 --> 00:07:40,560
So if the DFA is in state 3 after the first six characters of the text,

106
00:07:40,560 --> 00:07:46,240
it's got ABA is the longest prefix of the pattern.

107
00:07:46,240 --> 00:07:51,519
That's also a suffix of the first six characters of the text.

108
00:07:51,519 --> 00:07:56,519
So another prefix of the pattern that looks like it might work is ABABA.

109
00:07:56,519 --> 00:08:02,319
But that's not a suffix of the text ending a character 6.

110
00:08:02,319 --> 00:08:08,439
And so that interpretation is useful to understand what's going on.

111
00:08:08,439 --> 00:08:14,240
So given that we've constructed this DFA,

112
00:08:14,240 --> 00:08:23,879
it's just the state transition table for the DFA is simply a two-dimensional array

113
00:08:23,879 --> 00:08:28,120
that's indexed by the pattern character.

114
00:08:28,120 --> 00:08:33,759
So if you're reading a certain pattern character,

115
00:08:33,759 --> 00:08:37,879
sorry if you're reading a certain text character,

116
00:08:37,879 --> 00:08:46,200
then for each, we reset the pattern pointer to be the entry given in the table

117
00:08:46,200 --> 00:08:49,559
that corresponds to the current one.

118
00:08:49,559 --> 00:08:53,159
So let's go back to the table to be sure about that.

119
00:08:53,159 --> 00:09:00,559
So when we're in a particular state like 2 and we see in A,

120
00:09:00,559 --> 00:09:06,719
so this would be J, we refer to that column

121
00:09:06,719 --> 00:09:12,399
in whatever text character we happen to see, that's how we update J.

122
00:09:12,399 --> 00:09:14,799
So that's what this code does.

123
00:09:14,799 --> 00:09:21,319
And then if we ever get to the final state, we just return i minus m.

124
00:09:21,319 --> 00:09:27,479
This is just like that alternate implementation of the brute force method that we gave.

125
00:09:27,480 --> 00:09:34,279
But the key idea is that notice that i never gets decremented.

126
00:09:34,279 --> 00:09:40,399
All we're doing is incrementing i and changing J.

127
00:09:40,399 --> 00:09:43,759
Either always just referring to the table.

128
00:09:43,759 --> 00:09:47,159
When we have a match, the table automatically increments J.

129
00:09:47,159 --> 00:09:50,440
We have a mismatch that figures out the right state to go to.

130
00:09:50,440 --> 00:09:56,080
So that's a very simple and economical and fast implementation

131
00:09:56,080 --> 00:09:58,879
of substring search.

132
00:09:58,879 --> 00:10:10,759
So the running time is clearly all it does is look up an entry in the table for every text character.

133
00:10:10,759 --> 00:10:13,440
So that's linear time.

134
00:10:13,440 --> 00:10:17,520
The key is how do we build that table that drives the algorithm?

135
00:10:17,520 --> 00:10:19,120
And that's the tricky algorithm.

136
00:10:19,120 --> 00:10:26,040
So warning, this is definitely the trickiest algorithm we've looked at so far.

137
00:10:26,039 --> 00:10:34,360
And key, the importance again of no backup is that since the text pointer never decrements,

138
00:10:34,360 --> 00:10:39,759
you could use an input stream and just replace textify by just read the next character in the

139
00:10:39,759 --> 00:10:40,759
input stream.

140
00:10:40,759 --> 00:10:47,279
And this algorithm is going to work fine no matter how big the input stream is.

141
00:10:47,279 --> 00:10:49,719
It'll just go right through.

142
00:10:49,719 --> 00:10:53,120
It's got no memory of what the text is.

143
00:10:53,120 --> 00:10:59,200
It's got some memory of what the pattern is that's built into the DFA.

144
00:10:59,200 --> 00:11:04,120
So this is the key that you have a pattern.

145
00:11:04,120 --> 00:11:10,039
You can spend some time building this DFA table, and pre-processing.

146
00:11:10,039 --> 00:11:17,680
But then when you get the text, just index into this table for every text character and

147
00:11:17,680 --> 00:11:19,680
you're doing your substring search.

148
00:11:19,679 --> 00:11:25,239
You can make a build a machine that does this no backup.

149
00:11:25,239 --> 00:11:31,919
Okay, so let's take a look at what it means to construct this DFA.

150
00:11:31,919 --> 00:11:34,759
It depends on the pattern.

151
00:11:34,759 --> 00:11:40,439
You start out with one character, one state for each character in the pattern plus an extra

152
00:11:40,439 --> 00:11:41,439
except state.

153
00:11:41,439 --> 00:11:45,240
And let's look at what it means to build a thing.

154
00:11:45,240 --> 00:11:51,759
So the first thing that we do, one state for each character in the pattern, the first

155
00:11:51,759 --> 00:11:57,840
thing we do is deal with the match transitions.

156
00:11:57,840 --> 00:12:03,519
So that's when you're in state J, that means you've already matched J characters in the

157
00:12:03,519 --> 00:12:05,560
pattern.

158
00:12:05,559 --> 00:12:18,799
And if the next character matches, so the character that you have is the character that's

159
00:12:18,799 --> 00:12:25,519
supposed to match, you're going to set about the character J, SS, and J plus first characters.

160
00:12:25,519 --> 00:12:29,079
And you know that you've matched J plus one character.

161
00:12:29,079 --> 00:12:35,439
So all that means is we can put in the match transitions.

162
00:12:35,440 --> 00:12:44,320
So we have A, B, A, B, A, C, and these guys go A, B, A, B, A, C. If you're in state 0 and

163
00:12:44,320 --> 00:12:47,920
you see an A, you go to state 1, if you're in state 1, if you're in state 2, you go to state

164
00:12:47,920 --> 00:12:49,680
2, and so forth.

165
00:12:49,680 --> 00:12:56,120
That's how we get the match transitions to get us all the way through the pattern to the

166
00:12:56,120 --> 00:12:57,760
except state.

167
00:12:57,760 --> 00:13:00,400
So that's the easy part.

168
00:13:00,399 --> 00:13:05,279
And then the hard part is the mismatch transitions.

169
00:13:05,279 --> 00:13:11,639
What are you supposed to do if you come against a text character that does not match the current

170
00:13:11,639 --> 00:13:14,120
text character?

171
00:13:14,120 --> 00:13:22,240
So for example, if you're in state 0, the pattern starts with an A. If you don't see an

172
00:13:22,240 --> 00:13:27,639
A as the first character in the text, if you see a B or a C, then obviously you want to

173
00:13:27,639 --> 00:13:29,360
stay in state 0.

174
00:13:29,360 --> 00:13:34,840
So you can think of state 0 as scanning through the text looking for an A. It's going to stay

175
00:13:34,840 --> 00:13:36,440
in state 0.

176
00:13:36,440 --> 00:13:41,639
As long as it sees a B or C, as soon as it sees an A, it'll go to state 1.

177
00:13:41,639 --> 00:13:43,600
But that completes state 0.

178
00:13:43,600 --> 00:13:48,680
You know what to do if you have an A, you know what to do if you have a B or a C. What

179
00:13:48,680 --> 00:13:51,080
about state 1?

180
00:13:51,080 --> 00:13:57,279
So we know that if you're in state 1, you saw an A in the text, and if you see a B in the

181
00:13:57,279 --> 00:14:00,559
text, what are you supposed to do?

182
00:14:00,559 --> 00:14:03,759
Well, there's two different cases.

183
00:14:03,759 --> 00:14:10,039
If you see a B, you go into state 2.

184
00:14:10,039 --> 00:14:16,519
If you see a C, then that's not going to match the first character A in the pattern.

185
00:14:16,519 --> 00:14:18,919
So you go back to state 0.

186
00:14:18,919 --> 00:14:24,399
But if you see an A, it's just as if you saw an A in state 0.

187
00:14:24,399 --> 00:14:28,159
So you might as well stay in state 1.

188
00:14:28,159 --> 00:14:32,639
So that's how we fill in the DFA for state 1.

189
00:14:32,639 --> 00:14:35,600
If you see a B, you go into state 2, you match.

190
00:14:35,600 --> 00:14:39,919
If you see an A, well that matches the first character, so stay in state 1.

191
00:14:39,919 --> 00:14:43,639
If you see a C, clearly you have to go back to state 0.

192
00:14:43,639 --> 00:14:46,519
Okay, what about the next one?

193
00:14:46,519 --> 00:14:53,399
So if we're in state 2 and we see an A, we know that we go on to state 3.

194
00:14:53,399 --> 00:14:55,559
And what about the mismatch case?

195
00:14:55,559 --> 00:14:57,319
Well, in that case, it's a B or a C.

196
00:14:57,319 --> 00:15:03,799
And again, if you're sitting on a B or a C, you better go back to state 0 to keep looking

197
00:15:03,799 --> 00:15:06,079
for an A.

198
00:15:06,079 --> 00:15:11,600
State 3, well, now it gets to be a little more complicated.

199
00:15:11,600 --> 00:15:14,840
You say 3, C or B, you succeed it.

200
00:15:14,840 --> 00:15:17,679
If you see a C, you go back to state 0.

201
00:15:17,679 --> 00:15:19,199
It's not so bad if you see an A.

202
00:15:19,200 --> 00:15:24,000
It's just like before, that's going to be like the first one.

203
00:15:24,000 --> 00:15:27,640
So it seems like we're going along pretty fine.

204
00:15:27,640 --> 00:15:31,200
And again, if you're in state 4, you see an A, you go to 5.

205
00:15:31,200 --> 00:15:35,759
If you see a B or C, then you better go back and look for an A again.

206
00:15:35,759 --> 00:15:39,440
This one is the one that's a little more complicated.

207
00:15:39,440 --> 00:15:44,120
If you're in state 5 and you see a B, you go back to state 4.

208
00:15:44,120 --> 00:15:48,120
And that's a little more work to figure out why that's the case.

209
00:15:48,120 --> 00:15:52,000
And that last case is kind of the essence of the algorithm.

210
00:15:52,000 --> 00:15:58,560
So we'll look at a systematic way to be able to figure out what you do on a mismatch in

211
00:15:58,560 --> 00:15:59,560
each case.

212
00:15:59,560 --> 00:16:05,840
In this case, you only needed that one state the otherwise it was elementary reasoning.

213
00:16:05,840 --> 00:16:09,200
So that's a full DFA for Knuth-Morris Pratt.

214
00:16:09,200 --> 00:16:13,799
A demo was at least thinking about how it's going to be constructed.

215
00:16:14,039 --> 00:16:18,240
OK, let's look a little more carefully and systematically at the construction process

216
00:16:18,240 --> 00:16:21,719
for the Knuth-Morris Pratt DFA.

217
00:16:21,719 --> 00:16:25,279
So the start is clear.

218
00:16:25,279 --> 00:16:35,639
We're going to go through the pattern and for systematically fill in the match transitions.

219
00:16:35,639 --> 00:16:39,679
If we're in state 0 and we see an A, we want to go to state 1.

220
00:16:39,679 --> 00:16:43,679
We see a B, we're going to go to state 2.

221
00:16:43,679 --> 00:16:50,519
So we look at the pattern character and then whatever that one is, we want to go to the

222
00:16:50,519 --> 00:16:52,879
next state.

223
00:16:52,879 --> 00:16:58,239
So we can fill in at least that much automatically.

224
00:16:58,239 --> 00:17:02,879
Now the real key is the mismatch transition.

225
00:17:02,879 --> 00:17:08,000
So here's the idea of the mismatch transition.

226
00:17:08,000 --> 00:17:16,720
So if you're in state j and you get a mismatch, the next character in the text does not match

227
00:17:16,720 --> 00:17:20,680
the j-character in the pattern.

228
00:17:20,680 --> 00:17:27,759
So as pointed out at the beginning is motivation for Knuth-Morris Pratt, you know a lot about

229
00:17:27,759 --> 00:17:29,880
the text at that point.

230
00:17:29,880 --> 00:17:35,440
You know that the last j minus 1 characters of the text are, if you lock up the first

231
00:17:35,440 --> 00:17:39,559
character of the pattern, it's from 1 to j minus 1.

232
00:17:39,559 --> 00:17:45,680
So in this case, and then it's followed by the text character that you're looking at.

233
00:17:45,680 --> 00:17:53,480
So one thing that you could do, so what you want to do, so you know that, and what you

234
00:17:53,480 --> 00:18:02,720
could do is simulate the DFA that you have built on that part of the pattern and then take

235
00:18:02,720 --> 00:18:06,640
the transition for the character that you just find.

236
00:18:06,640 --> 00:18:08,160
So let's look at this.

237
00:18:08,160 --> 00:18:15,480
So let's run this machine if we had seen it on the text to BABA.

238
00:18:15,480 --> 00:18:16,920
That's what we want to do.

239
00:18:16,920 --> 00:18:22,819
We want to put the machine in the state as if we had backed up, but we don't want to

240
00:18:22,819 --> 00:18:23,819
back up.

241
00:18:23,819 --> 00:18:32,120
So if we see a B, we stay in zero, if we see a A, we go to 1, then we see a B.

242
00:18:32,119 --> 00:18:38,319
We go to 2, and if we see an A, we go to 3.

243
00:18:38,319 --> 00:18:43,679
So now we're in state 3.

244
00:18:43,679 --> 00:18:55,839
And if we had a mismatch, then for the fifth character, what we do on a mismatch here,

245
00:18:55,839 --> 00:18:59,679
we have to look at what happens if we get an A or if we get a B.

246
00:18:59,680 --> 00:19:05,279
If we run it on BABA and we get an A, then we should go back to 1.

247
00:19:05,279 --> 00:19:11,320
So what that says is if we had a mismatch and we saw an A and five, we would need to

248
00:19:11,320 --> 00:19:18,519
be in state 1 because if we had had run the thing on the characters that we know, BABA,

249
00:19:18,519 --> 00:19:20,799
we would wind up in state 1.

250
00:19:20,799 --> 00:19:30,680
And similarly, if we got the mismatch on a B, again, if we did BABA, we'd be in state

251
00:19:30,680 --> 00:19:31,680
3.

252
00:19:31,680 --> 00:19:36,599
And we're in state 3 and we saw a B, we'd go to 4.

253
00:19:36,599 --> 00:19:42,279
So again, to summarize, if we're in state 5 and we see a C, we know that's a match,

254
00:19:42,279 --> 00:19:43,799
we go to 6.

255
00:19:43,799 --> 00:19:52,119
If we see an A, we know that the previous five characters in the text were BABAA.

256
00:19:52,119 --> 00:19:57,519
So we can just simulate the machine, BABAA, we're in state 1.

257
00:19:57,519 --> 00:20:04,559
And if we get a mismatch that's a B, then that's the DFAB5, then we know that the previous

258
00:20:04,559 --> 00:20:11,159
five characters in the text were BABAB and that would put us in state 4.

259
00:20:11,160 --> 00:20:18,440
So that's the simulation of BABA, puts us in state 3, if we get an A, we go to 1.

260
00:20:18,440 --> 00:20:22,040
So that means that from 5, we're back to 1.

261
00:20:22,040 --> 00:20:23,960
And if we get a B, we go to 4.

262
00:20:23,960 --> 00:20:29,400
So that's how one way to calculate the mismatch transitions.

263
00:20:29,400 --> 00:20:35,080
And as we noted in the simulation, this is the only non-trivial one for this example.

264
00:20:35,079 --> 00:20:45,000
Now there's a little problem with that is that it seems to require J steps to do the simulation.

265
00:20:45,000 --> 00:20:51,039
In order to figure out these mismatch transitions, I had to go all the way through the pattern

266
00:20:51,039 --> 00:20:56,839
shifted over 1 to figure out the state 3.

267
00:20:56,839 --> 00:20:59,159
So that seems to be a bit of a problem.

268
00:20:59,160 --> 00:21:04,759
But actually it's no problem at all because we can run this simulation one character at

269
00:21:04,759 --> 00:21:08,880
time as we're building the machine.

270
00:21:08,880 --> 00:21:16,480
All we need to do is keep track of the state that we would be at if we had run the DFA on

271
00:21:16,480 --> 00:21:19,680
the pattern starting at position 1.

272
00:21:19,680 --> 00:21:23,920
Once we get going, it's pretty easy.

273
00:21:23,920 --> 00:21:33,960
But just let's illustrate it by saying, okay, we maintained the state X, which is where

274
00:21:33,960 --> 00:21:38,039
we would be if we had run the machine on the pattern shifted over 1.

275
00:21:38,039 --> 00:21:46,920
Now when we come to do our mismatches to figure out where the mismatch transitions from 5 are,

276
00:21:46,920 --> 00:21:53,640
all we do is look at if we were to get an A, it would be as if we were in state X and got an A.

277
00:21:53,640 --> 00:21:55,759
So that's 1.

278
00:21:55,759 --> 00:22:01,720
And if we were to get a B, it would be as if we were in state X and got a B in that state 4.

279
00:22:01,720 --> 00:22:08,800
So what we need to do is to compute the mismatch transitions is keep track of state X and

280
00:22:08,799 --> 00:22:19,839
that is where would the thing be if we had run it starting at the pattern 1 position shifted over.

281
00:22:19,839 --> 00:22:21,440
And we want to update that.

282
00:22:21,440 --> 00:22:29,839
So when we're moving to the next state, if we had a match on C, state X gets updated to where it would have gone

283
00:22:29,839 --> 00:22:30,919
if it got a C.

284
00:22:30,920 --> 00:22:40,400
Because for the next character, when we move J over for the match on C, we'll want to have X updated.

285
00:22:40,400 --> 00:22:47,720
So that's the key is keeping track of the state where the machine would be if we had backed up or

286
00:22:47,720 --> 00:22:51,640
if we had run it on the pattern shifted over 1.

287
00:22:51,640 --> 00:23:02,120
So let's take a look at a demo that does the full construction for the KMP DFA.

288
00:23:02,120 --> 00:23:08,600
So here goes, again, one state for every character plus and accept.

289
00:23:08,600 --> 00:23:10,240
Match transitions are easy.

290
00:23:10,240 --> 00:23:12,160
We build those.

291
00:23:12,160 --> 00:23:20,320
And we're going to start at position 0 and the mismatch transitions are easy.

292
00:23:20,319 --> 00:23:33,960
So now when we move over X, and when we're in position 1 of the pattern, X is where we would be if we started out without that character, which would be the empty string.

293
00:23:33,960 --> 00:23:44,599
So we start out with just filling in 0s for state 0 and we can do that without any further reasoning.

294
00:23:44,599 --> 00:23:47,359
But now we've got X initialized.

295
00:23:47,359 --> 00:23:55,839
So now what we need to do is fill in the mismatch transitions for state 1.

296
00:23:55,839 --> 00:23:58,879
So what are they there?

297
00:23:58,879 --> 00:24:06,599
What would happen if we found those characters in, and we were in state X?

298
00:24:06,599 --> 00:24:09,359
If we found an A, we'd go to state 1.

299
00:24:09,359 --> 00:24:12,519
If we found a C, we'd go to state 0.

300
00:24:12,519 --> 00:24:23,079
And maybe you notice that's just taking the entries corresponding to the entries we need from X's column and putting it in J's column.

301
00:24:23,079 --> 00:24:24,639
That's all it is.

302
00:24:24,639 --> 00:24:32,160
And then we need to update X, which is where it would be if we matched a B.

303
00:24:32,160 --> 00:24:36,599
So we'll stay in X's stay in state 0.

304
00:24:36,599 --> 00:24:40,079
So now let's look at state 2.

305
00:24:40,079 --> 00:24:46,319
So we need to fill in what would happen if we got a B and what would happen if we got a C.

306
00:24:46,319 --> 00:24:50,759
Well, it's what would happen if we were in state X and we got a B or a C.

307
00:24:50,759 --> 00:24:55,559
So all we do is move those 2 zeros over the column 2.

308
00:24:55,559 --> 00:25:03,799
And then don't forget we have to update X and X goes where the machine would go if we saw an A, that transition from 2 to 3.

309
00:25:03,799 --> 00:25:07,960
So we just move X to state 1.

310
00:25:07,960 --> 00:25:10,880
So now we have X in state 1 and we're doing position 3.

311
00:25:10,880 --> 00:25:16,039
And now you can see how really simple the algorithm is once it gets going.

312
00:25:16,039 --> 00:25:21,880
So now the mismatched transitions are A and C.

313
00:25:21,880 --> 00:25:25,079
And that's what we have to fill in for column 3.

314
00:25:25,079 --> 00:25:28,960
But those mismatched transitions were already computed.

315
00:25:28,960 --> 00:25:31,720
That's where X would go.

316
00:25:31,720 --> 00:25:34,519
If that's where it would go if we happened to be in state 1.

317
00:25:34,519 --> 00:25:38,720
So we moved the 1 and 0 from column 1 over to column 3.

318
00:25:38,720 --> 00:25:41,440
And again, we update X.

319
00:25:41,440 --> 00:25:48,359
And when we see a B, X goes to state 2.

320
00:25:48,359 --> 00:25:55,279
And again, you can check what is X supposed to be.

321
00:25:55,279 --> 00:26:03,960
It's supposed to be where you would be if you started the machine on the pattern with the first letter cut off.

322
00:26:03,960 --> 00:26:07,960
So it's supposed to be where would you wind up if you got BAB.

323
00:26:07,960 --> 00:26:11,160
BAB, and that's a check.

324
00:26:11,160 --> 00:26:14,960
All right, so now straight forward state 4, we have to fill in B and C.

325
00:26:14,960 --> 00:26:19,559
We go to X's column and copy over B and C from X's column.

326
00:26:19,559 --> 00:26:21,360
Then we update X.

327
00:26:21,360 --> 00:26:25,240
That's if you see an A, you go to state 3.

328
00:26:25,240 --> 00:26:27,120
Now we're ready for state 5.

329
00:26:27,120 --> 00:26:29,440
We've got X all computed.

330
00:26:29,440 --> 00:26:33,400
And we need to do A and B, and we get those from X.

331
00:26:33,400 --> 00:26:35,200
If it's an A, it's a 1.

332
00:26:35,200 --> 00:26:36,519
And if it's a B, it's a 4.

333
00:26:36,519 --> 00:26:38,840
It's just moved them over.

334
00:26:38,840 --> 00:26:44,519
And then when we do the C, and get the accept, there's no mismatch.

335
00:26:44,519 --> 00:26:48,400
That's the, we do update X to get ready.

336
00:26:48,400 --> 00:26:52,680
But when we get the state 6, we're done.

337
00:26:52,680 --> 00:27:01,680
And again, it's just as a double check, X is where you'd be if you saw BAB.

338
00:27:01,680 --> 00:27:07,080
That's the construction of the Knuth-Morse Pratt, DFA.

339
00:27:07,080 --> 00:27:14,840
Efficient algorithm, really ingenious, and turns out simple to implement.

340
00:27:14,840 --> 00:27:23,560
Implementation for the DFA construction for Knuth-Morse Pratt requires remarkably little code.

341
00:27:23,560 --> 00:27:28,240
So it just goes through what we did in the demo.

342
00:27:28,240 --> 00:27:37,279
So we've got X. And for every entry of the DFA in X's column that corresponds to everyone

343
00:27:37,279 --> 00:27:41,759
except for the match, we just copy X's column to J's column.

344
00:27:41,759 --> 00:27:44,839
In fact, we just copy them all.

345
00:27:44,839 --> 00:27:51,720
And then overwrite the one corresponding to the match case to J plus 1.

346
00:27:51,720 --> 00:27:56,880
So the entry in the column that corresponds to the pattern character, that's where do we

347
00:27:56,880 --> 00:27:59,440
go if we match that's J plus 1.

348
00:27:59,440 --> 00:28:01,840
All the rest of them are copied from X.

349
00:28:01,840 --> 00:28:06,320
One for looped a copy from X, then set the match case.

350
00:28:06,320 --> 00:28:10,720
And then the only other thing to do is to update X.

351
00:28:10,720 --> 00:28:11,880
And how do you update X?

352
00:28:11,880 --> 00:28:17,360
You take them to the machine to where it would go if it were in state X.

353
00:28:17,360 --> 00:28:22,720
And it got the current pattern character.

354
00:28:22,720 --> 00:28:30,079
So that's the DFA construction amazingly little code.

355
00:28:30,079 --> 00:28:41,600
So the only flaw in this code is that it does take time proportional to R times M,

356
00:28:41,600 --> 00:28:47,519
where R is the radix and M is the length of the pattern.

357
00:28:47,519 --> 00:28:50,879
And as we'll see, this way is to get around this.

358
00:28:50,879 --> 00:28:59,720
But for relatively small alphabets, this is no problem because the search is so efficient

359
00:28:59,720 --> 00:29:04,000
this way in the construction as well.

360
00:29:04,000 --> 00:29:11,000
But if you're doing this for unicode, for a long pattern, maybe that's too much memory

361
00:29:11,000 --> 00:29:16,440
to devote to the DFA representation.

362
00:29:16,440 --> 00:29:23,240
So the bottom line is in this file is immediately from examining the code,

363
00:29:23,240 --> 00:29:28,840
is that the sub-string, KMP sub-string search is linear time.

364
00:29:28,840 --> 00:29:35,640
It only access most each character in the pattern, each character in the text once.

365
00:29:35,640 --> 00:29:37,400
Quite remarkable.

366
00:29:37,400 --> 00:29:42,680
Each pattern character, you access once when you're making the DFA,

367
00:29:42,680 --> 00:29:49,560
and each text character is access once when you're simulating a DFA, and that's in the worst case.

368
00:29:49,560 --> 00:29:58,039
Now, the space, again, is proportional to RM because we have all those mismatches.

369
00:29:58,039 --> 00:30:07,480
It is possible to develop a version of Knuth-Morris Pratt that constructs the automaton

370
00:30:07,480 --> 00:30:13,240
in time and space proportional to M. It's actually a non-deterministic automaton because

371
00:30:13,240 --> 00:30:21,039
it's either a match or all mismatches and mismatch might evolve multiple hops.

372
00:30:21,039 --> 00:30:27,559
So if you're interested, you can read about that version of KMP.

373
00:30:27,559 --> 00:30:34,519
But it's sufficiently more complicated that you should be prepared to study it carefully

374
00:30:34,519 --> 00:30:37,440
to really understand it.

375
00:30:38,400 --> 00:30:42,720
This algorithm is really interesting because of its history.

376
00:30:42,720 --> 00:30:48,720
It was actually independently discovered by two theoreticians in a hacker.

377
00:30:48,720 --> 00:30:56,160
So there's Knuth, who's one of the fathers of computer science, who read a paper

378
00:30:56,160 --> 00:31:02,640
that was a very, by Steve Cook, a very esoteric theoretical result,

379
00:31:02,720 --> 00:31:10,000
that he realized implied that it should be possible to solve the substring search problem

380
00:31:10,000 --> 00:31:12,000
in linear time.

381
00:31:12,000 --> 00:31:18,240
The theorem really didn't give any way to solve it, but it indicated that it should be possible

382
00:31:18,240 --> 00:31:20,240
to solve it in linear time.

383
00:31:20,240 --> 00:31:23,840
So Knuth worked on it and figured out a way.

384
00:31:23,840 --> 00:31:29,920
And then Pratt, who was a student of Knuth's Stanford at the time, figured out a way to

385
00:31:30,880 --> 00:31:36,240
take care of this mismatch independent of the alphabet size.

386
00:31:36,240 --> 00:31:43,680
And in the meantime, across the Bay of Berkeley, Jim Morris was busy writing a text editor.

387
00:31:43,680 --> 00:31:50,560
In those days, people were using typewriters and other people were realizing that computers

388
00:31:50,560 --> 00:31:52,560
would be really good at editing text.

389
00:31:52,560 --> 00:31:59,440
And so many people would work on text editing and formatting systems.

390
00:32:00,240 --> 00:32:01,680
It was kind of a badge of honor.

391
00:32:01,680 --> 00:32:08,640
And those times, Morris actually worked for the computer center at Berkeley and wanted to have a

392
00:32:09,680 --> 00:32:12,799
really bulletproof text editor that everyone could use.

393
00:32:12,799 --> 00:32:15,759
And one of the things he wanted to do was avoid backup.

394
00:32:16,559 --> 00:32:22,080
Because backup was just really inconvenient and involved a lot of code and just something

395
00:32:22,080 --> 00:32:23,680
that he didn't want to have.

396
00:32:23,759 --> 00:32:26,400
He basically came up with the same algorithm.

397
00:32:27,519 --> 00:32:32,000
And the community was kind of small at that time.

398
00:32:32,880 --> 00:32:34,640
And theory meets practice.

399
00:32:34,640 --> 00:32:38,720
And that's where this paper came from 1977.

400
00:32:39,840 --> 00:32:44,400
Morris then went on to get his PhD and to work at the Arts Park.

401
00:32:44,400 --> 00:32:51,519
And unfortunately, later on, another system's program came and took a look at Morris's code

402
00:32:51,519 --> 00:32:55,279
and couldn't understand it and put the brute force algorithm back in.

403
00:32:55,279 --> 00:33:01,920
But not part of the story is maybe a less successful example of theory meeting practice.

404
00:33:02,480 --> 00:33:04,400
That's the Knuth Morris Pratt algorithm.

405
00:33:04,400 --> 00:33:07,440
One of the most ingenious algorithms that we'll see.

