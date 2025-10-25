---
title: CS143 P31Week306 04 Recursive Descent Algorithm
---

1
00:00:00,000 --> 00:00:05,120
Welcome back.

2
00:00:05,120 --> 00:00:14,880
In this video, I'm going to outline a general algorithm for recursive descent parsing.

3
00:00:14,880 --> 00:00:19,000
Before I dive into the details of the recursive descent parsing algorithm, let me just define

4
00:00:19,000 --> 00:00:23,519
a couple of small things that we're going to use throughout this video.

5
00:00:23,519 --> 00:00:27,440
Token is going to be a type and we're going to be writing code and so token will be a type

6
00:00:27,440 --> 00:00:29,359
of all the tokens.

7
00:00:29,359 --> 00:00:33,320
And the particular tokens that we'll use in the example are things like into open,

8
00:00:33,320 --> 00:00:35,799
barren, close barren, plus and times.

9
00:00:35,799 --> 00:00:42,560
And so token is a type and these things are instances, values of that type.

10
00:00:42,560 --> 00:00:48,079
And then we're going to need a global variable called next that points to the next token

11
00:00:48,079 --> 00:00:50,039
in the input stream.

12
00:00:50,039 --> 00:00:56,960
And if you recall from the previous video, we used a big arrow to point into the input

13
00:00:56,960 --> 00:01:02,719
to indicate our current position, the global variable next is going to play the same role

14
00:01:02,719 --> 00:01:05,400
in our code.

15
00:01:05,400 --> 00:01:06,480
So let's begin.

16
00:01:06,480 --> 00:01:10,280
The first thing we're going to do is define a number of Boolean functions.

17
00:01:10,280 --> 00:01:16,000
And one function we have to define is one that matches a given token in the input.

18
00:01:16,000 --> 00:01:17,240
So how does this work?

19
00:01:17,240 --> 00:01:23,159
Well, it takes as arguments a token, and this is a type token again.

20
00:01:23,159 --> 00:01:28,000
And then it just checks whether that matches what's currently pointed to in the input stream.

21
00:01:28,000 --> 00:01:31,599
So is TOK equal to the thing pointed by next?

22
00:01:31,599 --> 00:01:36,519
And notice that as a side effect, we increment the next pointer.

23
00:01:36,519 --> 00:01:38,319
And what's returned then is a Boolean.

24
00:01:38,319 --> 00:01:40,519
This is either true or false.

25
00:01:40,519 --> 00:01:45,560
So yes, the token that we passed in matches the input or no, it doesn't.

26
00:01:45,560 --> 00:01:51,319
And again, just to stress this, notice that the next pointer is incremented regardless

27
00:01:51,319 --> 00:01:55,399
of whether the match succeeded or failed.

28
00:01:55,399 --> 00:01:59,079
Now, another thing we need to check for a match of is the nth production of S.

29
00:01:59,079 --> 00:02:05,679
So this is a particular production of a particular non-terminal S.

30
00:02:05,679 --> 00:02:11,039
And we'll denote that by a function that returns a Boolean and it's written as S sub N.

31
00:02:11,039 --> 00:02:17,199
So this is a function that only checks for the success of one production of S.

32
00:02:17,199 --> 00:02:19,240
And I won't write out the code for that now.

33
00:02:19,240 --> 00:02:20,959
We'll see that in a minute.

34
00:02:20,960 --> 00:02:25,400
And then we're going to need another function that tries all the productions of S.

35
00:02:25,400 --> 00:02:30,280
So this one is going to be called just S with no subscript, no subscript.

36
00:02:30,280 --> 00:02:35,680
And so what this one will succeed if any production of S can match the input.

37
00:02:35,680 --> 00:02:39,680
All right, so we're going to have two classes of functions for each non-terminal,

38
00:02:39,680 --> 00:02:43,000
one class that where there's one function per production.

39
00:02:43,000 --> 00:02:46,240
And it checks just whether that production can match the input.

40
00:02:46,240 --> 00:02:50,719
And then one that combines all the productions for that particular non-terminal

41
00:02:50,719 --> 00:02:55,800
together and checks whether any of them can match the input.

42
00:02:55,800 --> 00:02:58,280
Okay, that's the general plan.

43
00:02:58,280 --> 00:03:01,960
Now let's see how this works for some specific productions.

44
00:03:01,960 --> 00:03:05,800
And we'll just use the same grammar that we used in the last video.

45
00:03:05,800 --> 00:03:09,159
The first production of that grammar is E goes to T.

46
00:03:09,159 --> 00:03:13,319
And now what we want to do is want to write the functions that are needed to decide

47
00:03:13,319 --> 00:03:17,759
whether this production matches some input.

48
00:03:17,759 --> 00:03:20,759
And this one happens to be simplicity itself.

49
00:03:20,759 --> 00:03:22,599
And it's easy to see why.

50
00:03:22,599 --> 00:03:24,959
So first of all, we're writing the function E1.

51
00:03:24,959 --> 00:03:28,840
This is the function that deals with the first production for E and succeeds,

52
00:03:28,840 --> 00:03:33,519
returns true only if this production succeeds in matching some input.

53
00:03:33,519 --> 00:03:35,959
Well, how would this production match any input?

54
00:03:35,959 --> 00:03:40,799
Well, I could only match some input if some production of T matches the input.

55
00:03:40,799 --> 00:03:42,280
And we have a name for that function.

56
00:03:42,280 --> 00:03:47,280
That's the function T, which tries all the different productions for T.

57
00:03:47,280 --> 00:03:53,280
So E1 succeeds, returns true exactly when T succeeds, returns true.

58
00:03:53,280 --> 00:03:57,599
And that's all there is to this first production.

59
00:03:57,599 --> 00:03:59,639
For the second production, we have a little more work to do.

60
00:03:59,639 --> 00:04:04,479
Now E will succeed if T plus E can match some of the input.

61
00:04:04,479 --> 00:04:05,560
And how does that work?

62
00:04:05,560 --> 00:04:08,599
Well, first T has to match some of the inputs.

63
00:04:08,599 --> 00:04:12,360
So some production of T has to match a portion of the input.

64
00:04:12,360 --> 00:04:15,400
And after that, we have to find a plus in the input,

65
00:04:15,400 --> 00:04:17,560
following whatever T matched.

66
00:04:17,560 --> 00:04:24,439
And if plus matches, then some production for E has to match some portion of the input.

67
00:04:24,439 --> 00:04:27,840
And notice the use of the short circuiting double-and here.

68
00:04:27,840 --> 00:04:32,079
So this is actually important, where you're exploiting the semantics of double-and

69
00:04:32,079 --> 00:04:38,199
and C and C plus plus, which evaluates the arguments to the double-and in left to right order.

70
00:04:38,199 --> 00:04:43,319
So first T will execute and notice that T has embedded within it side effects

71
00:04:43,319 --> 00:04:46,519
on the pointer into the input.

72
00:04:46,519 --> 00:04:51,519
So it's incrementing the next pointer and increments it exactly however far T makes it.

73
00:04:51,519 --> 00:04:55,879
So whatever T manages to match, the next pointer will advance that far.

74
00:04:55,879 --> 00:05:00,879
And when this function returns, it's left pointing to the next terminal that T did not match.

75
00:05:00,879 --> 00:05:02,600
And that needs to be a plus.

76
00:05:02,600 --> 00:05:06,120
And the call to term will increment the next pointer again,

77
00:05:06,120 --> 00:05:08,079
which is exactly where E should pick up.

78
00:05:08,079 --> 00:05:12,800
And whatever E can match, it will increment the next pointer just beyond that.

79
00:05:12,800 --> 00:05:18,160
So that the rest of the grammar outside of this particular call can match it.

80
00:05:18,160 --> 00:05:23,000
And then notice that this particular function is called E2 because this is the function

81
00:05:23,000 --> 00:05:26,840
for the second production for E.

82
00:05:26,840 --> 00:05:32,560
Well, we have one more thing to deal with for E and that is the function E itself.

83
00:05:32,560 --> 00:05:36,480
We need to write the function that will match any alternative for E.

84
00:05:36,480 --> 00:05:40,639
And since there's only these two productions, it just has to match one of these two productions.

85
00:05:40,639 --> 00:05:43,599
And that this is where the backtracking is dealt with.

86
00:05:43,599 --> 00:05:50,120
Now, the only bit of state that we have to worry about in the backtracking is this next pointer.

87
00:05:50,120 --> 00:05:55,039
So that needs to be restored if we ever have to undo our decisions.

88
00:05:55,039 --> 00:05:59,680
And so the way we accomplish that is we just have a local variable to this function called save

89
00:05:59,680 --> 00:06:02,839
that records the position of the next pointer before we do anything.

90
00:06:02,839 --> 00:06:08,079
So before we try to match any input, we just remember where the next pointer started

91
00:06:08,079 --> 00:06:10,599
when this function was called.

92
00:06:11,320 --> 00:06:20,040
And now to do the alternative matching, we first try E1 and we see if it succeeds.

93
00:06:20,040 --> 00:06:24,800
And if it doesn't succeed, actually, let's do the succeeds case first.

94
00:06:24,800 --> 00:06:32,480
If this succeeds, if this returns true, then the semantics of double OR here

95
00:06:32,480 --> 00:06:34,080
means we don't evaluate E2.

96
00:06:34,080 --> 00:06:35,760
So this will not be evaluated.

97
00:06:35,760 --> 00:06:40,120
The second component here will not be evaluated if E1 returns true.

98
00:06:40,160 --> 00:06:43,360
It'll short-circuit because it knows that it's going to be true no matter what.

99
00:06:43,360 --> 00:06:45,560
And it'll just stop there.

100
00:06:45,560 --> 00:06:49,759
And notice that whatever side effects E1 has on the next pointer will be retained.

101
00:06:49,759 --> 00:06:54,519
And we'll remember, and when we return true, the next pointer will be left pointing

102
00:06:54,519 --> 00:06:56,720
to the next piece of unconsumed input.

103
00:06:56,720 --> 00:06:59,240
Now, let's consider what happens if E1 returns false.

104
00:06:59,240 --> 00:07:05,040
Well, if E1 returns false, well, the only way this OR can be true is if the second component is true.

105
00:07:05,040 --> 00:07:06,280
And what's the first thing we do?

106
00:07:06,279 --> 00:07:12,199
The first thing we do is restore the next pointer before we try E2.

107
00:07:12,199 --> 00:07:14,719
And if E2 returns true, then the whole thing returns true.

108
00:07:14,719 --> 00:07:19,639
And the E function succeeds if the E function fails,

109
00:07:19,639 --> 00:07:23,279
well, then we're out of alternatives for E, and the failure is going to be returned

110
00:07:23,279 --> 00:07:26,799
to the next higher level production in our derivation.

111
00:07:26,799 --> 00:07:30,479
And it will have to backtrack and try another alternative.

112
00:07:31,480 --> 00:07:36,400
Now, finally, what about this particular statement next equals save here?

113
00:07:36,400 --> 00:07:39,400
Well, this is not strictly needed.

114
00:07:39,400 --> 00:07:44,600
Notice that here we save the next pointer in the save variable,

115
00:07:44,600 --> 00:07:48,240
and then the first thing, then the very first thing we do is we copy it back over to next again.

116
00:07:48,240 --> 00:07:51,640
This is just for uniformity to make all the productions look the same.

117
00:07:51,640 --> 00:07:55,920
But since this is the very first production, we actually don't need this assignment statement

118
00:07:55,920 --> 00:07:57,920
if we don't want to have it.

119
00:08:01,200 --> 00:08:04,720
So let's turn our attention to the non-terminal T.

120
00:08:04,720 --> 00:08:05,720
There are three productions.

121
00:08:05,720 --> 00:08:11,800
The first one is that T goes to int, and that's a simple one to write.

122
00:08:11,800 --> 00:08:14,439
We just have to match the terminal int.

123
00:08:14,439 --> 00:08:17,080
So the next thing in the input has to be an integer.

124
00:08:17,080 --> 00:08:20,920
And if it is, then T1 succeeds.

125
00:08:20,920 --> 00:08:23,800
T2 is slightly more complex.

126
00:08:23,800 --> 00:08:27,720
That's the production int times T, T goes to int times T.

127
00:08:27,720 --> 00:08:36,040
So we have to match an int in the input followed by a times followed by something that matches any production of T.

128
00:08:36,040 --> 00:08:42,040
The third production is T goes to open-paren E close-paren.

129
00:08:42,040 --> 00:08:48,759
So what has to happen, we have to match an open-paren first, and then something that matches one of the productions of E's,

130
00:08:48,759 --> 00:08:52,399
we call the function E there, and then finally a close-paren.

131
00:08:52,399 --> 00:08:57,560
And then putting all three of these together in the function T, that tries all three alternatives,

132
00:08:57,559 --> 00:09:01,239
we just have exactly the same structure we had for E.

133
00:09:01,239 --> 00:09:08,439
So we save the current input pointer, and then we try the alternatives T1, T2, and T3 in order.

134
00:09:08,439 --> 00:09:12,959
And at each step, we restore the input pointer before we try the next alternative.

135
00:09:19,199 --> 00:09:24,000
To start the parser up, we have to initialize the next pointer to point to the first token in the input stream.

136
00:09:24,000 --> 00:09:28,960
And we have to invoke the function that matches anything driveable from the start symbol.

137
00:09:28,960 --> 00:09:31,919
So in this case, that's just the function E.

138
00:09:34,159 --> 00:09:37,840
And recursive descent parsers are really easy to implement by hand.

139
00:09:37,840 --> 00:09:44,840
In fact, people often do implement them by hand in just following the discipline that I showed on the previous slides.

140
00:09:48,120 --> 00:09:50,759
To wrap up this video, let's work through a complete example.

141
00:09:50,759 --> 00:09:56,919
So here's our grammar, and here is all the code for the recursive descent parser for this grammar.

142
00:09:56,919 --> 00:09:59,559
And here is the input that we'll be looking at.

143
00:09:59,559 --> 00:10:08,720
And we're going to just mark the next pointer pointing to the initial token of the input.

144
00:10:08,720 --> 00:10:12,439
And I'll also draw the parse tree that we're constructing at the same time.

145
00:10:12,439 --> 00:10:14,519
So we begin by invoking the start symbol.

146
00:10:14,519 --> 00:10:19,279
So we're going to be trying to derive something from E.

147
00:10:19,319 --> 00:10:22,199
And the first thing we'll do is we'll try the first production.

148
00:10:22,199 --> 00:10:24,039
So we'll try E1.

149
00:10:24,039 --> 00:10:25,199
And what is E1 do?

150
00:10:25,199 --> 00:10:27,600
E1 is going to try T.

151
00:10:27,600 --> 00:10:29,399
It's going to try to derive something from T.

152
00:10:29,399 --> 00:10:32,600
So our possible parse tree looks like this.

153
00:10:33,679 --> 00:10:35,639
And so we invoke T.

154
00:10:35,639 --> 00:10:40,879
And what is T going to do is going to try all three productions for T in order.

155
00:10:40,879 --> 00:10:42,240
And so it's going to call T1.

156
00:10:42,240 --> 00:10:45,959
And we'll see that T1 is going to fail because it's going to try an int.

157
00:10:45,959 --> 00:10:48,519
And I won't put it in the parse tree since it isn't going to work.

158
00:10:48,519 --> 00:10:51,159
But the int is not going to match the open parent.

159
00:10:51,159 --> 00:10:54,720
So that's going to return false, which will cause us to backtrack.

160
00:10:54,720 --> 00:11:01,199
It'll reset the input pointer to the beginning of the string.

161
00:11:01,199 --> 00:11:03,360
And then it'll try T2.

162
00:11:03,360 --> 00:11:07,559
And T2 is also going to ask, well, is the input pointer equal to an int?

163
00:11:07,559 --> 00:11:12,480
And we call it the term function here always increments the input pointer.

164
00:11:12,480 --> 00:11:17,439
So in fact, this pointer is going to move over one token.

165
00:11:17,440 --> 00:11:22,280
But this is going to return false because int doesn't match open parent.

166
00:11:22,280 --> 00:11:23,200
So we'll come back here.

167
00:11:23,200 --> 00:11:26,520
The input pointer will be restored back to the beginning of the string.

168
00:11:26,520 --> 00:11:28,480
And then it's going to try the alternative T3.

169
00:11:28,480 --> 00:11:31,480
Now when we finally get to T3, something good is going to happen.

170
00:11:31,480 --> 00:11:36,560
The first thing it's going to do is going to ask, is the first thing an input an open parent.

171
00:11:36,560 --> 00:11:38,760
And in fact, it is.

172
00:11:38,760 --> 00:11:43,880
And so the input pointer will advance to point to the int.

173
00:11:43,879 --> 00:11:47,639
And then it's going to try to match something to arrival from E.

174
00:11:47,639 --> 00:11:51,080
So now we have our first recursive call D.

175
00:11:51,080 --> 00:11:52,519
We're back here at E.

176
00:11:52,519 --> 00:11:57,200
And it's going to try E1 first and then E2.

177
00:11:57,200 --> 00:11:58,960
And so it calls E1.

178
00:11:58,960 --> 00:12:05,159
And E1 will only match something if it can match T.

179
00:12:05,159 --> 00:12:08,120
So this is, we're down here inside of E now.

180
00:12:08,120 --> 00:12:12,039
And then we're going to call T.

181
00:12:12,039 --> 00:12:18,000
And what's T going to do, well, is going to try all three productions for T in order.

182
00:12:18,000 --> 00:12:22,199
The first one of which happens to be the single token int.

183
00:12:22,199 --> 00:12:23,240
And that is going to match.

184
00:12:23,240 --> 00:12:26,000
It's going to call term int.

185
00:12:26,000 --> 00:12:27,439
T1 is calling term int.

186
00:12:27,439 --> 00:12:31,959
And that matches the next token in the input stream.

187
00:12:31,959 --> 00:12:33,039
So we're happy about that.

188
00:12:33,039 --> 00:12:35,679
The input pointer advances again.

189
00:12:35,679 --> 00:12:41,240
And now we return through all these levels of calls, T1 succeeds.

190
00:12:41,240 --> 00:12:44,560
Which means that T succeeds.

191
00:12:44,560 --> 00:12:48,560
Which means that E succeeds.

192
00:12:48,560 --> 00:12:51,680
And now we're back here in the production for T3.

193
00:12:51,680 --> 00:12:56,799
And we're going to ask, well, is the next thing that we see in the input a closed print?

194
00:12:56,799 --> 00:12:58,399
And indeed, it is.

195
00:12:58,399 --> 00:13:01,879
And so a closed print will be recorded.

196
00:13:01,879 --> 00:13:04,200
And now T3 will succeed.

197
00:13:04,200 --> 00:13:07,840
Which means that T succeeds, this T succeeds.

198
00:13:07,840 --> 00:13:10,639
And finally, we return to the root call E.

199
00:13:10,639 --> 00:13:14,199
And that returns true, which means that the parse succeeded.

200
00:13:14,199 --> 00:13:17,159
That plus the fact that we are now at the end of the input.

201
00:13:17,159 --> 00:13:19,439
There's no more input to consume.

202
00:13:19,439 --> 00:13:22,519
And we've returned from the start symbol with true.

203
00:13:22,519 --> 00:13:25,199
And so we have successfully parsed the input string.

