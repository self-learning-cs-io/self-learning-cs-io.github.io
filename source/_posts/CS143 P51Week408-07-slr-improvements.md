---
title: CS143 P51Week408 07 Slr Improvements
---

1
00:00:00,000 --> 00:00:07,160
In this video, we're going to wrap up our discussion of SLR parsing.

2
00:00:07,160 --> 00:00:16,240
We're going to give the full SLR parsing algorithm and also talk about some important improvements.

3
00:00:16,240 --> 00:00:21,240
The SLR parsing algorithm we discussed in the last video has one major inefficiency.

4
00:00:21,240 --> 00:00:26,120
And that is that most of the work that the Atomitan does when it reads the stack is actually

5
00:00:26,120 --> 00:00:27,120
redundant.

6
00:00:27,120 --> 00:00:29,160
And to see this, think about the stack.

7
00:00:29,160 --> 00:00:30,160
So we have our stack.

8
00:00:30,160 --> 00:00:33,640
This is the bottom over here.

9
00:00:33,640 --> 00:00:36,399
And this is the top of the stack over here.

10
00:00:36,399 --> 00:00:38,000
And what is going on at each step?

11
00:00:38,000 --> 00:00:40,799
But each step, we might shift something onto the stack.

12
00:00:40,799 --> 00:00:46,240
So we might add one symbol or we might pop some symbols and push one symbol onto the

13
00:00:46,240 --> 00:00:47,240
stack.

14
00:00:47,240 --> 00:00:50,320
But basically, there's going to be some small number of symbols that change at the top of

15
00:00:50,320 --> 00:00:51,920
the stack at each step.

16
00:00:51,920 --> 00:00:54,159
But most of the stack stays the same.

17
00:00:54,159 --> 00:00:56,880
And then we rerun the Atomitan on the entire stack.

18
00:00:56,880 --> 00:00:59,120
And so this work is all repeated.

19
00:00:59,120 --> 00:01:03,440
Everything that stayed the same from the previous stack is repeated work.

20
00:01:03,440 --> 00:01:06,920
And then we do a little bit of new work just at the very top of the stack.

21
00:01:06,920 --> 00:01:13,240
And clearly, if we could avoid this, we could make the algorithm run much, much more quickly.

22
00:01:13,240 --> 00:01:17,200
The way to exploit the observation that most of the work of the Atomitan is repeated at

23
00:01:17,200 --> 00:01:22,960
each step is to simply remember the state of the Atomitan on each stack prefix.

24
00:01:22,960 --> 00:01:25,000
So we're going to change the representation of the stack.

25
00:01:25,000 --> 00:01:26,599
We're going to change what goes in the stack.

26
00:01:26,599 --> 00:01:30,359
So before we just had symbols on the stack, but now we're going to have pairs.

27
00:01:30,359 --> 00:01:36,679
Each element of the stack will be a pair of a symbol and a DFA state.

28
00:01:36,679 --> 00:01:38,759
Thus the stack now is going to be a stack of pairs.

29
00:01:38,759 --> 00:01:45,000
And whereas before, our stack would have consisted just of the symbols, sim1 up to simn.

30
00:01:45,000 --> 00:01:49,599
Now we're going to have the same symbols, but each one of them is going to be paired with

31
00:01:49,599 --> 00:01:51,319
a DFA state.

32
00:01:51,319 --> 00:01:56,599
And that DFA state is going to be the result of running the DFA on all the symbols to its

33
00:01:56,599 --> 00:01:57,599
left.

34
00:01:57,599 --> 00:01:59,519
So all the symbols below it in the stack.

35
00:01:59,519 --> 00:02:03,759
So if I think about my stack, and if I draw a little picture of a stack as a line, then

36
00:02:03,759 --> 00:02:10,439
the DFA state here, let's call this state i, will be the result of running the DFA on the

37
00:02:10,439 --> 00:02:13,919
entire stack contents to the left of that point.

38
00:02:13,919 --> 00:02:17,599
And again, if I look at some other point in the stack at the stack state that's stored

39
00:02:17,599 --> 00:02:24,280
there, that would be running the result of running the DFA on the entire stack contents

40
00:02:24,280 --> 00:02:26,680
up to that point.

41
00:02:26,680 --> 00:02:30,280
And one small detail here is that the bottom of the stack, we have to get started.

42
00:02:30,280 --> 00:02:33,879
We need to have the start state stored at the bottom of the stack, and we just store that

43
00:02:33,879 --> 00:02:35,359
with any dummy symbol.

44
00:02:35,359 --> 00:02:40,319
It doesn't matter what symbol we pick.

45
00:02:40,319 --> 00:02:44,240
So now we're ready to actually give the details of the parsing algorithm.

46
00:02:44,240 --> 00:02:50,080
And the first step is to define a table, go to, and this maps a state and a symbol to

47
00:02:50,080 --> 00:02:51,320
another state.

48
00:02:51,320 --> 00:02:53,719
And this is just the transition function of the DFA.

49
00:02:53,719 --> 00:03:00,080
This is the graph of the DFA written out as an array.

50
00:03:00,080 --> 00:03:03,520
Our SLR parsing algorithm will have four possible moves.

51
00:03:03,520 --> 00:03:07,320
A shift x move will push a pair on the stack.

52
00:03:07,320 --> 00:03:11,280
x is a DFA state, so that's named in the shift move now.

53
00:03:11,280 --> 00:03:15,800
And then the other element of the pair is the current input.

54
00:03:15,800 --> 00:03:19,159
And then we'll also have reduced moves, which are just as before.

55
00:03:19,159 --> 00:03:23,960
So to recall, a reduced move will pop a number of elements from the stack equal to the

56
00:03:23,960 --> 00:03:28,719
length of the right hand side, and then it will push the left hand side onto the stack.

57
00:03:28,719 --> 00:03:33,479
And then finally, accept and error moves for when we've successfully parsed the input

58
00:03:33,479 --> 00:03:37,080
and for when the parser gets stuck.

59
00:03:37,080 --> 00:03:41,719
The second parsing table is the action table, which tells us which kind of move to make

60
00:03:41,719 --> 00:03:43,760
in every possible state.

61
00:03:43,760 --> 00:03:49,920
The action tables indexed by a state of the automaton and the next input symbol.

62
00:03:49,920 --> 00:03:55,920
And then the possible moves are things like shift, reduce, accept, or error.

63
00:03:55,920 --> 00:04:00,680
So let's consider when we do shifts, if the final state of the automaton at the top of

64
00:04:00,680 --> 00:04:07,400
the stack has an item that says it would be okay to shift an A and go to, that is, from

65
00:04:07,400 --> 00:04:16,360
this state, we could go to state j on input A, then the move in state i on input A will

66
00:04:16,360 --> 00:04:19,360
be to shift a j onto the stack.

67
00:04:19,360 --> 00:04:20,840
And think about what that means for a second.

68
00:04:20,840 --> 00:04:27,000
What that says is that we have a stack and then the next input is A. And then at this

69
00:04:27,000 --> 00:04:29,879
point, it's okay to shift an A onto the stack.

70
00:04:29,879 --> 00:04:35,560
But furthermore, that the state of the automaton at this point is SI.

71
00:04:35,560 --> 00:04:40,040
So the state of the automaton at the top of the stack is SI, the next input is A.

72
00:04:40,040 --> 00:04:43,879
Remember that the go to table is a transition function of the machine.

73
00:04:43,879 --> 00:04:50,040
So if we move the vertical bar over, if we shift that A onto the stack, well now we don't

74
00:04:50,040 --> 00:04:53,319
just put A on the stack, we have to put a pair on the stack.

75
00:04:53,319 --> 00:04:55,600
And the question is what machine state should go there?

76
00:04:55,600 --> 00:05:00,400
Well it's going to be the state that we would reach from state i from state SI on input

77
00:05:00,400 --> 00:05:04,960
A, which the go to table tells us in this case is state sj.

78
00:05:04,960 --> 00:05:11,600
And for that reason, the action when we terminate in state i and the next input is A is to shift

79
00:05:11,600 --> 00:05:16,680
the pair A comma j onto the stack.

80
00:05:16,680 --> 00:05:20,879
The other three moves that go into the action table are things we've already seen.

81
00:05:20,879 --> 00:05:25,320
So if the final state of the automaton at the top of the stack has an item that says that

82
00:05:25,319 --> 00:05:30,959
we can reduce and the follow condition requirement is satisfied, namely that the next input

83
00:05:30,959 --> 00:05:36,159
can follow the left hand side non-terminal of the production.

84
00:05:36,159 --> 00:05:43,159
Then in the entry i, if when we're in state SI and we have input A, we can reduce by the

85
00:05:43,159 --> 00:05:45,560
production x goes to alpha.

86
00:05:45,560 --> 00:05:51,000
And there's one exception here, we're not going to do that reduction if the left hand side

87
00:05:51,000 --> 00:05:55,279
is the special start symbol, the new start symbol that we add to the grammar as prime.

88
00:05:55,279 --> 00:06:01,839
Because in that case, if the item that we're going to reduce by is s prime goes to s dot

89
00:06:01,839 --> 00:06:05,479
and we're at the end of the input, then we want to accept.

90
00:06:05,479 --> 00:06:09,039
And any other situation is an error.

91
00:06:09,039 --> 00:06:15,319
So in any other situation, if we're in state i and we have the next input is A, well,

92
00:06:15,319 --> 00:06:17,639
we don't know whether to shift, reduce or accept.

93
00:06:17,639 --> 00:06:20,759
And so that is an error state.

94
00:06:20,759 --> 00:06:24,919
Finally, here is the full SLR parsing algorithm.

95
00:06:24,920 --> 00:06:27,960
And I'm just going to walk you through it so that we can see how all of the ideas we've

96
00:06:27,960 --> 00:06:31,439
been discussing and all the various pieces fit together.

97
00:06:31,439 --> 00:06:35,800
Let's let our initial input be called i and we'll just give it a name and this is going

98
00:06:35,800 --> 00:06:38,160
to be treated as an array that we can index.

99
00:06:38,160 --> 00:06:43,000
The index will be called j and initially it's zero, so that we're pointing to the first

100
00:06:43,000 --> 00:06:45,600
token in the input stream.

101
00:06:45,600 --> 00:06:49,200
We'll just assume that the first state of the DFA is called state one.

102
00:06:49,200 --> 00:06:53,680
And that means our initial stack is going to have state one for the state of the automaton

103
00:06:53,680 --> 00:06:59,439
and some other dummy symbol that we don't care about in the first position.

104
00:06:59,439 --> 00:07:03,639
So the stack is just a pair with says that we're in the start state of the DFA.

105
00:07:03,639 --> 00:07:07,439
And now we're going to repeat the following loop until we've either successfully parsed

106
00:07:07,439 --> 00:07:11,399
the input or we've detected an error.

107
00:07:11,399 --> 00:07:13,360
And at each step, what are we going to do?

108
00:07:13,360 --> 00:07:18,040
Well, we're going to look at the next input symbol and we're going to look at the final

109
00:07:18,040 --> 00:07:20,759
state of the automaton on the stack contents.

110
00:07:20,759 --> 00:07:24,360
And that's always the state of the pair that's on the top of the stack.

111
00:07:24,360 --> 00:07:27,519
And we're going to look those two things up in the action table and that's going to tell

112
00:07:27,519 --> 00:07:29,759
us what kind of move to make.

113
00:07:29,759 --> 00:07:31,399
So let's just go through the moves in order.

114
00:07:31,399 --> 00:07:34,159
Let's consider the shift move first.

115
00:07:34,159 --> 00:07:36,839
So what happens?

116
00:07:36,839 --> 00:07:41,839
If it says that we're supposed to shift and going to state k, then what we're going to

117
00:07:41,839 --> 00:07:43,639
do is we're going to shift the input.

118
00:07:43,639 --> 00:07:48,079
That means we're going to take the next input symbol or the current input symbol, excuse

119
00:07:48,079 --> 00:07:49,079
me.

120
00:07:49,079 --> 00:07:52,800
So let's just set on to the stack together with state k of the automaton.

121
00:07:52,800 --> 00:07:58,279
So that pair goes on to the stack and we also bump the input pointer so that we're looking

122
00:07:58,279 --> 00:08:00,519
at the next character of input.

123
00:08:00,519 --> 00:08:03,439
Now let me erase that so you can continue to read it.

124
00:08:03,439 --> 00:08:06,319
Now what about the reduce moves?

125
00:08:06,319 --> 00:08:09,439
So this is one's a little bit interesting.

126
00:08:09,439 --> 00:08:14,560
First thing we're going to do is we're going to pop a number of pairs off the stack that's

127
00:08:14,560 --> 00:08:16,680
equal to the length of the right hand side.

128
00:08:16,680 --> 00:08:22,639
So we pop a number of items off the stack that's equal to the right hand side of the production.

129
00:08:22,639 --> 00:08:24,240
And then what do we push onto the stack?

130
00:08:24,240 --> 00:08:27,720
Well we're going to push the non-terminal on the left hand side onto the stack.

131
00:08:27,720 --> 00:08:31,480
Now the question is what state goes onto the stack?

132
00:08:31,480 --> 00:08:33,080
What DFA state?

133
00:08:33,080 --> 00:08:38,879
Well, now that we've popped the stack, we can look at the new top state of the stack.

134
00:08:38,879 --> 00:08:43,440
So the DFA state was now the top state after we've done the pops.

135
00:08:43,440 --> 00:08:47,920
So tell us what the final state of the DFA was on what is left of the stack.

136
00:08:47,920 --> 00:08:52,080
And then now that we're pushing x onto the stack, we want to know what state the DFA would

137
00:08:52,080 --> 00:08:55,360
go into on the transition labeled x.

138
00:08:55,360 --> 00:08:57,560
And so we use the go to table to look that up.

139
00:08:57,560 --> 00:09:02,040
The current top state of the stack on symbol x, where does the DFA go?

140
00:09:02,040 --> 00:09:05,080
That is the state that gets pushed onto the stack.

141
00:09:05,080 --> 00:09:09,080
And then finally, if the move is accept, we halt normally.

142
00:09:09,080 --> 00:09:16,879
And if the move is error, we halt and report an error or execute our error recovery procedure.

143
00:09:16,879 --> 00:09:21,280
One interesting thing about this algorithm is that it uses only the DFA states and the

144
00:09:21,280 --> 00:09:22,280
input.

145
00:09:22,280 --> 00:09:25,920
The stack symbols are not used in any really interesting way.

146
00:09:25,920 --> 00:09:30,960
And so we could actually get rid of the stack symbols and just do parsing with the DFA states

147
00:09:30,960 --> 00:09:32,680
on the stack.

148
00:09:32,680 --> 00:09:35,800
But that of course would mean throwing away the program and we still actually need the

149
00:09:35,799 --> 00:09:38,279
program for the later stages of the compiler.

150
00:09:38,279 --> 00:09:44,120
So in order to type checking and code generation, we still need to keep the symbols around.

151
00:09:44,120 --> 00:09:47,559
Now simple LR parsing is called simple for a reason.

152
00:09:47,559 --> 00:09:50,599
And in fact, in practice, it's a bit too simple.

153
00:09:50,599 --> 00:09:55,839
The widely used bottom up parsing algorithms are based on a more powerful class of grammars,

154
00:09:55,839 --> 00:09:58,279
called the LR grammars.

155
00:09:58,279 --> 00:10:02,679
And the basic difference between the LR grammars and the SLR grammars is that look ahead

156
00:10:02,679 --> 00:10:04,599
is built into the items.

157
00:10:04,600 --> 00:10:06,159
So what does that mean?

158
00:10:06,159 --> 00:10:13,920
Well, a LR1 item is going to be a pair which consists of a item, just like we saw before.

159
00:10:13,920 --> 00:10:17,320
And this means exactly the same thing as before.

160
00:10:17,320 --> 00:10:18,399
And a look ahead.

161
00:10:18,399 --> 00:10:22,399
And in the case of an LR1 item, there's just one token of look ahead.

162
00:10:22,399 --> 00:10:26,399
If it was an LR2 item, there could be two tokens of look ahead in there.

163
00:10:26,399 --> 00:10:32,160
And the meaning of this pair is that if we ever get around to a state where we have seen

164
00:10:32,159 --> 00:10:36,079
all of this production, all the right hand side of this production, then it's going to

165
00:10:36,079 --> 00:10:41,639
be okay to reduce if the look ahead at that point is dollar, if it's the end of the input.

166
00:10:41,639 --> 00:10:46,240
And of course, there could be any other token in there, any other terminal symbol in there

167
00:10:46,240 --> 00:10:47,959
besides dollar.

168
00:10:47,959 --> 00:10:50,839
And this turns out to be more accurate than just using file assets.

169
00:10:50,839 --> 00:10:55,839
Recall that at the point where a reduction decision is made in SLR parsing, we just look

170
00:10:55,839 --> 00:11:01,720
at the entire file set for the symbol on the left hand side of the production.

171
00:11:01,720 --> 00:11:06,920
And this mechanism of encoding the look ahead into the items allows us to track at a finer

172
00:11:06,920 --> 00:11:14,200
granularity, which look ahead are actually possible in particular production sequences.

173
00:11:14,200 --> 00:11:20,399
And if you look at the atomic time for your parser, actually it's not an LR1 atomic time.

174
00:11:20,399 --> 00:11:26,160
It's an LALR1 atomic time, which is something very close to an LR atomic time.

175
00:11:26,160 --> 00:11:31,279
It's a little bit of an optimization over an LR, a pure LR atomic time.

176
00:11:31,279 --> 00:11:37,839
But anyway, it uses exactly the same kinds of items with this pair of a standard LR zero

177
00:11:37,839 --> 00:11:39,399
item and a look ahead.

178
00:11:39,399 --> 00:11:43,959
If you look at that at a time of time, you will see items that look like this and that

179
00:11:43,959 --> 00:11:47,600
will help you in reading the atomic time and figuring out what it is doing.

