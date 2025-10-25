---
title: CS143 P52Week408 08 Slr Examples Correction
---

1
00:00:00,000 --> 00:00:12,080
In this video, we're going to work through a couple of SLR parsing examples.

2
00:00:12,080 --> 00:00:14,519
So let's do a very simple example.

3
00:00:14,519 --> 00:00:16,280
Let's consider the grammar.

4
00:00:16,280 --> 00:00:24,600
S goes to SA or S goes to B. And what is this grammar too?

5
00:00:24,600 --> 00:00:28,160
It produces strings of A's followed by a B.

6
00:00:28,160 --> 00:00:36,679
So any number of A's followed by a single B.

7
00:00:36,679 --> 00:00:41,719
And notice that the grammar is left recursive and recall that's not a problem for a bottom-up parser.

8
00:00:41,719 --> 00:00:47,480
SLR parsers, LR parsers are perfectly happy with left recursive grammars.

9
00:00:47,480 --> 00:00:53,799
So let's begin by working out what the automaton for this grammar should be, what the parsing

10
00:00:53,799 --> 00:00:58,679
automaton should be, and recall that the first step is to add a new production to the grammar.

11
00:00:58,679 --> 00:01:03,439
We have to add a new start symbol that all it does has one production that goes to the old

12
00:01:03,439 --> 00:01:04,439
start symbol.

13
00:01:04,439 --> 00:01:07,159
And that's again just for technical reasons.

14
00:01:07,159 --> 00:01:13,039
Now the start symbol, sorry, the start state of the NFA of the parsing automaton is this

15
00:01:13,039 --> 00:01:14,039
item.

16
00:01:14,039 --> 00:01:19,959
S prime, our new start symbol, goes to .s, our old start symbol.

17
00:01:19,959 --> 00:01:24,239
And rather than build the NFA and then do the subset of state's construction, let's just

18
00:01:24,239 --> 00:01:29,439
go ahead and work out what items must be in the first state of the DFA.

19
00:01:29,439 --> 00:01:37,039
So I remember that all the epsilon moves in the NFA are due to moves that happen because

20
00:01:37,039 --> 00:01:42,719
we don't see a non-terminal on the stack, but it says he's something to write from that

21
00:01:42,719 --> 00:01:43,719
non-terminal.

22
00:01:43,719 --> 00:01:48,199
So if we have a dot right next to a non-terminal, that means that there's an epsilon move

23
00:01:48,200 --> 00:01:55,480
in the NFA to all the items that have for all the productions, all the first items for

24
00:01:55,480 --> 00:01:57,840
the productions of that non-terminal.

25
00:01:57,840 --> 00:01:58,840
What do I mean by that?

26
00:01:58,840 --> 00:02:04,000
I mean that this state, I mean epsilon production, to s goes to .s, a, so this is the first

27
00:02:04,000 --> 00:02:09,400
item in recognizing this production, the dots all the way at the left, and then it also

28
00:02:09,400 --> 00:02:12,680
be an item for the other production for s, s goes to .b.

29
00:02:12,680 --> 00:02:17,360
All right, so that's the epsilon closure in the NFA of this start item.

30
00:02:17,360 --> 00:02:21,180
So this will be the first state, these three things, these three items would be the first

31
00:02:21,180 --> 00:02:24,740
state of the DFA.

32
00:02:24,740 --> 00:02:28,040
And now we have to consider what would happen on each of the possible transitions for

33
00:02:28,040 --> 00:02:31,280
each of the symbols that we might see on the stack.

34
00:02:31,280 --> 00:02:34,480
So let's think about what happens if we see a b.

35
00:02:34,480 --> 00:02:43,240
So if we see a b on the stack, then the only item that's going to be in that state is

36
00:02:43,240 --> 00:02:45,400
s goes to ., okay?

37
00:02:45,400 --> 00:02:50,520
So it would be fine to see a b, and this would be the only item that was valid for the

38
00:02:50,520 --> 00:02:52,200
stack contents.

39
00:02:52,200 --> 00:02:57,759
Now another possibility is that we'll see an s, okay?

40
00:02:57,759 --> 00:03:00,360
So if we see an s on the stack, what will happen?

41
00:03:00,360 --> 00:03:06,879
Well, we're going to go to a state that has two items.

42
00:03:06,879 --> 00:03:14,199
s prime goes to s dot, so that we've seen s on the stack, and we're ready to reduce

43
00:03:14,199 --> 00:03:16,439
by this production, possibly.

44
00:03:16,439 --> 00:03:21,680
And also s goes to s dot a.

45
00:03:21,680 --> 00:03:28,240
And now clearly in this state, so actually let's talk about this state down here, the

46
00:03:28,240 --> 00:03:31,120
state here at the bottom, there are no more transitions possible.

47
00:03:31,120 --> 00:03:34,280
There's only one item in the state, and the dots all the way at the right hand side,

48
00:03:34,280 --> 00:03:36,560
so that state is completely done.

49
00:03:36,560 --> 00:03:40,800
And this state, the one over here on the right side, well one of these items is complete,

50
00:03:40,800 --> 00:03:41,879
so that's all the way at the right.

51
00:03:41,879 --> 00:03:48,439
But the other item still has an a, so there could be one more transition out of this state

52
00:03:48,439 --> 00:03:54,439
to the item s goes to s a dot.

53
00:03:54,439 --> 00:03:56,439
All right?

54
00:03:56,439 --> 00:04:01,240
And now if we look at this, we see that for the most part these states are in pretty good

55
00:04:01,240 --> 00:04:02,240
shape.

56
00:04:02,240 --> 00:04:06,319
So these two states, this one down here, and this one over here, they only have a single

57
00:04:06,319 --> 00:04:07,319
item.

58
00:04:07,319 --> 00:04:10,959
And so there's no possibility of a shift-reduced conflict in those states.

59
00:04:10,959 --> 00:04:13,919
There's only one item, there's only one thing to do.

60
00:04:13,919 --> 00:04:18,560
The only possibility here in both of these states is to reduce.

61
00:04:18,560 --> 00:04:22,839
This state, the initial start state, has no reduced moves.

62
00:04:22,839 --> 00:04:25,120
So there's only shift moves here.

63
00:04:25,120 --> 00:04:29,560
So there can't be a shift-reduced conflict because there are no reduced items, no possible

64
00:04:29,560 --> 00:04:33,600
reduced actions, and there's no reduced reduced conflicts for the same reason.

65
00:04:33,600 --> 00:04:37,160
So the only state of interest, really, from the point of view of whether the grammar is

66
00:04:37,160 --> 00:04:40,800
s, l, r, 1 is this middle state.

67
00:04:40,800 --> 00:04:49,240
And here we could either reduce by s prime goes to s dot, or we could shift an a onto the

68
00:04:49,240 --> 00:04:51,480
stack.

69
00:04:51,480 --> 00:04:57,400
And the question is, what is in the follow of s prime?

70
00:04:57,400 --> 00:04:59,280
So what can follow s prime in the grammar?

71
00:04:59,280 --> 00:05:03,160
And if we look back up at our grammar, we'll see that nothing can follow s prime.

72
00:05:03,160 --> 00:05:04,800
s prime is the start symbol.

73
00:05:04,800 --> 00:05:09,439
And so, in fact, the only thing in the follow of s prime is the end of the input.

74
00:05:09,439 --> 00:05:15,920
And so what that tells us is that we'll reduce by s prime goes to s if we're out of input.

75
00:05:15,920 --> 00:05:20,440
And otherwise, if there is an a on the stack, sorry, there's an a in the input, then we'll

76
00:05:20,440 --> 00:05:22,320
shift it onto the stack.

77
00:05:22,320 --> 00:05:25,240
And so this grammar is s, l, r, 1.

78
00:05:25,240 --> 00:05:30,720
There are no shift-reduced or reduced reduced conflicts implied by this parsing atometime.

79
00:05:34,160 --> 00:05:36,840
Let's do another example, slightly more complex.

80
00:05:36,840 --> 00:05:39,680
In fact, let's just extend the previous grammar.

81
00:05:39,680 --> 00:05:44,080
We'll have a production s goes to s, a, s.

82
00:05:44,080 --> 00:05:48,880
Okay, so now we have the non-terminal twice with an a in between, or s can go to b just

83
00:05:48,880 --> 00:05:50,360
like before.

84
00:05:50,360 --> 00:05:53,640
And now let's work out the parsing atometime for this grammar.

85
00:05:53,640 --> 00:06:00,680
And once again, we'll need to add a dummy start symbol to the grammar.

86
00:06:00,680 --> 00:06:05,600
And it will go, its only production will be to generate the old start symbol.

87
00:06:05,600 --> 00:06:12,759
And now let's begin working out what's in the parsing atometime for this particular grammar.

88
00:06:12,759 --> 00:06:16,480
And just like before, we're not going to go through the effort of constructing the

89
00:06:16,480 --> 00:06:17,480
NFA.

90
00:06:17,480 --> 00:06:18,639
That would be a systematic way to do it.

91
00:06:18,639 --> 00:06:23,000
One way to do it is the way we sketch was just to construct the NFA first and then do

92
00:06:23,000 --> 00:06:25,040
the subset of state's construction.

93
00:06:25,040 --> 00:06:29,319
But this grammar is small enough and simple enough that we can work out directly what is

94
00:06:29,319 --> 00:06:34,680
in what are in the states, what items are in the states of the DFA.

95
00:06:34,680 --> 00:06:40,120
So just like before, because the dot here is immediately next to the s, we know that we

96
00:06:40,120 --> 00:06:44,879
can without consuming any input at all make an epsilon transition in the NFA to the items

97
00:06:44,879 --> 00:06:48,079
that start the productions for s.

98
00:06:48,079 --> 00:06:52,600
So these will be in this also in the DFA state.

99
00:06:52,600 --> 00:06:53,600
And that's it.

100
00:06:53,600 --> 00:06:56,439
We can't add any other productions here.

101
00:06:56,439 --> 00:07:02,240
So s is the only non-terminal and we've added all the first items, initial items for s.

102
00:07:02,240 --> 00:07:07,199
And so that is the complete state.

103
00:07:07,199 --> 00:07:13,360
So just like before, one possibility is that we'll see a b on the stack.

104
00:07:13,360 --> 00:07:18,319
And so that would give us the item s goes to b dot and that's the only item valid for

105
00:07:18,319 --> 00:07:19,800
that state.

106
00:07:19,800 --> 00:07:24,480
Another possibility is that we'll see an s on the stack.

107
00:07:24,480 --> 00:07:31,879
In which case we'll make a transition to the state s prime goes to s dot and s goes to

108
00:07:31,879 --> 00:07:35,120
s dot a s.

109
00:07:35,120 --> 00:07:40,120
We saw that same state before in the other time I taught.

110
00:07:40,120 --> 00:07:44,600
Now we could also see an a.

111
00:07:44,600 --> 00:07:45,600
What state would that take us to?

112
00:07:45,600 --> 00:07:47,560
And this is going to be a little different.

113
00:07:47,560 --> 00:07:53,160
In this state, we could have the item or we'll have the item s a dot s.

114
00:07:53,160 --> 00:07:55,120
But now notice that the dot is right next to s.

115
00:07:55,120 --> 00:08:00,080
So instead of seeing an s on the stack, we could also see something to arrive from s in

116
00:08:00,080 --> 00:08:01,360
the next position on the stack.

117
00:08:01,360 --> 00:08:04,240
So we have to throw in all the productions for s.

118
00:08:04,240 --> 00:08:05,640
There's only two of them.

119
00:08:05,640 --> 00:08:13,320
But that means we could have the item s goes to dot s a s and s goes to dot b.

120
00:08:13,320 --> 00:08:17,240
And then out of this state, now there are a couple of different possible transitions.

121
00:08:17,240 --> 00:08:19,520
We could see an s or we could see a b.

122
00:08:19,519 --> 00:08:25,000
Well, if we see a b, then we wind up in this state over here.

123
00:08:25,000 --> 00:08:28,519
And if we see an s, well, what's going to happen?

124
00:08:28,519 --> 00:08:38,720
If we see an s, then we'll wind up in another new state.

125
00:08:38,720 --> 00:08:47,960
Where we have s goes to s a s dot, we've seen the complete right hand side of that production.

126
00:08:47,960 --> 00:08:54,840
So s goes to s a dot s.

127
00:08:54,840 --> 00:08:56,639
Actually, that dot's in the wrong place.

128
00:08:56,639 --> 00:08:59,560
So let's erase that and let's put it in the right place.

129
00:08:59,560 --> 00:09:06,160
It's right here before the a, not after the a.

130
00:09:06,160 --> 00:09:09,320
And now we have to think about what happens in this state.

131
00:09:09,320 --> 00:09:12,840
So in this state, the only possible input is an a.

132
00:09:12,840 --> 00:09:14,240
And if it's an a, what's going to happen?

133
00:09:14,240 --> 00:09:15,240
What we're going to have?

134
00:09:15,240 --> 00:09:20,200
We're going to have to add the initial productions for s again.

135
00:09:20,200 --> 00:09:24,080
And so that would just take us back to this state.

136
00:09:24,080 --> 00:09:25,560
And let me get the transitions labeled here.

137
00:09:25,560 --> 00:09:30,840
We go to this state on an s and we come back to that state, the bottom state here, from

138
00:09:30,840 --> 00:09:34,000
the top state on an a.

139
00:09:34,000 --> 00:09:40,720
And I think if we have many mistakes, that is the complete transition system and all the

140
00:09:40,720 --> 00:09:42,879
states for this VFA.

141
00:09:42,879 --> 00:09:47,200
Now the question is, is this is this parsing a time of time?

142
00:09:47,200 --> 00:09:51,960
Is this is this the parsing a time of time of a SLR1 grammar?

143
00:09:51,960 --> 00:09:55,960
And in order to answer that question, we have to look for possible reduce, reduce, and shift

144
00:09:55,960 --> 00:09:57,559
reduce conflicts.

145
00:09:57,559 --> 00:10:01,960
Well a quick scan of all the states here will show you or convince you that there are not

146
00:10:01,960 --> 00:10:05,639
any states where there are two possible reduced moves.

147
00:10:05,639 --> 00:10:11,240
So there can't be any reduced reduced conflicts in this in this time of time.

148
00:10:11,240 --> 00:10:16,639
We can ignore states that only have a single item or states that have no possible reduced

149
00:10:16,639 --> 00:10:23,720
moves at all because those are states in which there cannot be a shift reduce conflict.

150
00:10:23,720 --> 00:10:28,000
And that means we can ignore these two states, the two states over here at the extreme left.

151
00:10:28,000 --> 00:10:31,039
So now we're left with these three states to think about.

152
00:10:31,039 --> 00:10:34,399
All right, so we look at this state last time.

153
00:10:34,399 --> 00:10:44,600
As before, the follow of S prime is just equal to the dollar sign.

154
00:10:44,600 --> 00:10:50,039
And so there's no shift reduced conflict in this state because in input A, we can only

155
00:10:50,039 --> 00:10:54,840
shift, we can't reduce by S prime goes to S. All right, now we're down looking at these

156
00:10:54,840 --> 00:10:58,240
two states.

157
00:10:58,240 --> 00:11:00,919
And let's just consider this bottom state first.

158
00:11:00,919 --> 00:11:04,199
All right, so what does this state say to do?

159
00:11:04,200 --> 00:11:11,720
Now this state says that, well, first of all, observe that the only transitions out of

160
00:11:11,720 --> 00:11:16,120
this state are on B and S and there are no reduced moves in this state at all.

161
00:11:16,120 --> 00:11:19,759
So there's no possibility of a shift reduced conflict in this state either.

162
00:11:19,759 --> 00:11:22,160
That leaves us with just this state to think about.

163
00:11:22,160 --> 00:11:25,120
All right, so now this state does have a reduced move.

164
00:11:25,120 --> 00:11:28,240
The first item here is a reduction.

165
00:11:28,240 --> 00:11:34,360
And that says that we should reduce by S goes to S, A, S if whatever comes next is in

166
00:11:34,360 --> 00:11:41,560
the follow of S. So we're going to need to know what is in the follow of S.

167
00:11:41,560 --> 00:11:45,360
Well from S prime goes to S, we know that anything in the follow of S prime is in the follow

168
00:11:45,360 --> 00:11:51,279
of S. So clearly dollar is in the follow of S. And then from this part of the grammar

169
00:11:51,279 --> 00:11:56,639
here, we can see that A is in the follow of S.

170
00:11:56,639 --> 00:12:01,480
And then from this occurrence here of S, we know that since it occurs at the far right

171
00:12:01,480 --> 00:12:05,759
hand side of the production, that anything in the follow of the right hand side, the left

172
00:12:05,759 --> 00:12:08,919
hand side, non-termals, also going to be in the follow of S. Well in this case they're

173
00:12:08,919 --> 00:12:09,919
the same.

174
00:12:09,919 --> 00:12:14,159
It just says that the follow of S is a subset of the follow of S, which is trivially always

175
00:12:14,159 --> 00:12:16,319
true and so it doesn't add anything new.

176
00:12:16,319 --> 00:12:21,679
And so we wind up with just the follow of S being these two things, dollar sign and A.

177
00:12:21,679 --> 00:12:25,879
But that poses a problem because this says that if we see an A in the input, we should

178
00:12:25,879 --> 00:12:28,120
reduce.

179
00:12:28,120 --> 00:12:32,039
And this move here says that if we see an A in the input, we should shift.

180
00:12:32,039 --> 00:12:37,960
And so this state does have a shift-reduced conflict.

181
00:12:37,960 --> 00:12:41,439
All right.

182
00:12:41,440 --> 00:12:44,440
So this grammar is not SLR1.

